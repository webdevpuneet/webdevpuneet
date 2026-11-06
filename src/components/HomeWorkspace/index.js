'use client';

/* "Your workspace" on the home page, above the hero. A visitor with nothing saved yet sees one slim row (a welcome and
   their Patreon status); once something is saved the full card appears.
   One card with: every tool with how many things are saved in it, a strip of the newest
   saved items, each with a picture of what was made, and the visitor's brand kit, favourites, bookmarks and Patreon status. Everything is read from this
   browser's own storage (the same sources as the sidebar's projects: lib/design-store, uiSnippetsDb, localStorage);
   nothing is sent anywhere. */

import { useEffect, useMemo, useState } from 'react';
import { useProjects, TYPES } from '@/components/Sidebar/MyProjects';
import { dbGetAll as dbGetAllCustomSnippets, dbSetThumb } from '@/lib/uiSnippetsDb';
import { useBookmarks, BOOKMARKED_HREF } from '@/lib/snippet-bookmarks';
import { SNIPPET_SEARCH_INDEX } from '@/lib/snippet-search-index';
import { loadKit, kitIsSet } from '@/components/BrandKit';
import { useAdFree } from '@/lib/use-ad-free';
import { PremiumUnlockDialog } from '@/components/PremiumGate';
import { PATREON_PRICE } from '@/lib/premium';
import { readActivity } from '@/lib/activity-log';
import ActivityHeatmap from './ActivityHeatmap';
import st from './styles.module.css';

const TOOLS = [
  { type: 'website', label: 'Website Builder', sub: 'Websites', href: '/website-builder/', icon: '/icons/website-builder.svg' },
  { type: 'section', label: 'Website Sections', sub: 'Section designs', href: '/website-section-templates/', icon: '/icons/website-section-templates.svg' },
  { type: 'email', label: 'Email Templates', sub: 'Email designs', href: '/email-templates/', icon: '/icons/email-templates.svg' },
  { type: 'social', label: 'Social Posts', sub: 'Post designs', href: '/social-post-templates/', icon: '/icons/social-post-templates.svg' },
  { type: 'code', label: 'My Code', sub: 'Snippets', href: '/ui-snippets/mycode/', icon: '/icons/my-code.svg' },
  { type: 'prompt', label: 'AI Prompts', sub: 'Saved prompts', href: '/ai-prompt-studio/', icon: '/icons/ai-prompt-studio.svg' },
];
const SNIPPET_TITLE = new Map(SNIPPET_SEARCH_INDEX.map(sn => [sn.id, sn.title]));
/* Favourite templates (the heart on each gallery card), per library: where the list is kept, the card picture and the page */
const FAVS = [
  { key: 'wb_tpl_favourites', kind: 'Website', tint: '#0ea5e9', img: id => `/images/website-templates/thumb/${id}.jpg`, href: id => `/website-builder/templates/${id}/` },
  { key: 'tpl_fav_email', kind: 'Email', tint: '#f59e0b', img: id => `/images/email-templates/previews/${id}.png`, href: id => `/email-templates/${id}/` },
  { key: 'tpl_fav_social', kind: 'Post', tint: '#ec4899', img: id => `/images/social-post-templates/previews/${id}.png`, href: id => `/social-post-templates/${id}/` },
  { key: 'tpl_fav_section', kind: 'Section', tint: '#10b981', img: id => `/images/section-templates/previews/${id}.png`, href: id => `/website-section-templates/${id}/` },
];
const prettyId = id => String(id).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const PAGE = 6; // cards per full-width row; Next shows the following six
const HALF = 3; // cards in a half-width row; the saved rows are paired two to a line
const SIZE_OF = { code: HALF, website: HALF, section: HALF, email: HALF, social: HALF };
const RECENT_MAX = 50; // Recently edited pages through at most this many

/* The saved-design rows under Recently edited, one per kind, in this order (AI prompts get no row of their own; My Code comes first, right after Bookmarked snippets) */
const KIND_ROWS = [
  { type: 'code', title: 'My Code snippets' },
  { type: 'website', title: 'Saved websites' },
  { type: 'section', title: 'Saved website sections' },
  { type: 'email', title: 'Saved emails' },
  { type: 'social', title: 'Saved social posts' },
];

/* "‹ 1–6 of 14 ›" for a row with more than one page */
function Pager({ page, total, onPage, size = PAGE }) {
  if (total <= size) return null;
  const last = Math.ceil(total / size) - 1;
  return (
    <span className={st.pager}>
      <button type="button" className={st.pagerBtn} onClick={() => onPage(page - 1)} disabled={page === 0} aria-label="Previous six">‹</button>
      <span>{page * size + 1}–{Math.min(total, (page + 1) * size)} of {total}</span>
      <button type="button" className={st.pagerBtn} onClick={() => onPage(page + 1)} disabled={page >= last} aria-label="Next six">Next ›</button>
    </span>
  );
}

function ago(iso) {
  const t = new Date(iso).getTime();
  if (!t) return '';
  const min = Math.round((Date.now() - t) / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} hour${h === 1 ? '' : 's'} ago`;
  const d = Math.round(h / 24);
  if (d < 14) return `${d} day${d === 1 ? '' : 's'} ago`;
  return new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

/* The picture on a Recent card. A snippet from My Code is drawn live from its own HTML and CSS in a small sandboxed frame
   (no scripts run, nothing can be clicked); everything else uses its thumbnail or template preview, and falls back to a
   tinted tile with the type's icon when there is no image or it fails to load. */
/* The picture on a Recently edited card: the design's own saved thumbnail (a data: URL kept with it when it was saved, the way a
   social post does), else the template's preview, else a tinted tile with the type's icon. A snippet from My Code is drawn live
   from its own HTML and CSS in a small sandboxed frame (no scripts run, nothing can be clicked). */
function CardPicture({ item }) {
  const [broken, setBroken] = useState(false);
  if (item.type === 'code' && !item.cover && (item.html || item.css)) {
    const doc = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#fff;font-family:system-ui,sans-serif}${item.css}</style>${item.html}`;
    return <iframe className={st.cardFrame} title="" srcDoc={doc} sandbox="" loading="lazy" tabIndex={-1} aria-hidden="true" />;
  }
  if (item.cover && !broken) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={st.cardImg} src={item.cover} alt="" loading="lazy" onError={() => setBroken(true)} />;
  }
  return <span className={st.cardIcon} aria-hidden="true">{TYPES[item.type]?.icon}</span>;
}

/* Designs saved before thumbnails existed have none. Draw one for each, once, in the background (the editor's own code is loaded
   only then) and keep it with the design, so the next visit shows it straight away. A design that cannot be drawn is not retried. */
const THUMB_MAKERS = {
  email: () => import('@/components/EmailTemplates').then(m => m.emailThumb),
  section: () => import('@/components/SectionTemplates').then(m => m.sectionThumb),
  website: () => import('@/components/WebsiteBuilder/saved-thumb').then(m => d => m.siteThumb(d.state)),
  code: () => import('@/lib/uiSnippetsDb').then(m => m.snippetThumb),
};
const thumbTried = new Set();
function useMissingThumbs(items) {
  useEffect(() => {
    const todo = items.filter(i => THUMB_MAKERS[i.type] && !i.thumb && i.design && i.setThumb && i.id !== 'draft' && !thumbTried.has(i.key));
    if (!todo.length) return undefined;
    let live = true;
    (async () => {
      for (const i of todo) {
        if (!live) return;
        thumbTried.add(i.key);
        try {
          const make = await THUMB_MAKERS[i.type]();
          const thumb = await make(i.design);
          if (thumb && live) await i.setThumb(thumb);
        } catch { /* keep the template preview */ }
      }
    })();
    return () => { live = false; };
  }, [items]);
}

/* One saved-design card (Recently edited and the per-kind rows) */
const savedCard = i => (
  <li key={i.key} className={st.stripItem}>
    <a href={i.href} className={st.card} title={i.name}>
      <span className={st.cardPic} style={{ '--tint': TYPES[i.type]?.tint }}>
        <CardPicture item={i} />
      </span>
      <span className={st.cardName}>{i.name}</span>
      <span className={st.cardMeta}><b style={{ color: TYPES[i.type]?.tint }}>{TYPES[i.type]?.label}</b> · {ago(i.updated)}</span>
    </a>
  </li>
);

export default function HomeWorkspace() {
  const projects = useProjects();
  const bookmarks = useBookmarks();
  const adFree = useAdFree();
  const [snippets, setSnippets] = useState(null);
  const [extra, setExtra] = useState({ favs: [], kit: false });
  const [activity, setActivity] = useState({});
  const [pages, setPages] = useState({}); // the page shown in each kind's row
  const [recentPage, setRecentPage] = useState(0);
  const [unlockOpen, setUnlockOpen] = useState(false);

  useEffect(() => {
    let live = true;
    const load = () => dbGetAllCustomSnippets().then(all => { if (live) setSnippets(all || []); }).catch(() => { if (live) setSnippets([]); });
    load();
    window.addEventListener('uis-custom-snippets-changed', load);
    // Each library adds new favourites at the end, so each list is read newest first
    const favs = [];
    for (const f of FAVS) {
      try { const v = JSON.parse(localStorage.getItem(f.key) || '[]'); if (Array.isArray(v)) [...v].reverse().forEach(id => { if (typeof id === 'string') favs.push({ ...f, id }); }); } catch { /* ignore */ }
    }
    setExtra({ favs, kit: kitIsSet(loadKit()) });
    setActivity(readActivity());
    return () => { live = false; window.removeEventListener('uis-custom-snippets-changed', load); };
  }, []);

  // Everything saved, newest first (My Code snippets in the same shape as the other projects)
  const all = useMemo(() => {
    const code = (snippets || []).map(sn => ({
      key: `code:${sn.id}`, type: 'code', name: sn.name || 'Untitled', sub: (sn.tags || []).join(', '),
      updated: sn.updatedAt || sn.createdAt || '', created: sn.createdAt || '', href: `/ui-snippets/mycode/?id=${sn.id}`,
      html: sn.html || '', css: sn.css || '', thumb: sn.thumb || null, cover: sn.thumb || null,
      design: sn, setThumb: thumb => dbSetThumb(sn.id, thumb),
    }));
    return [...code, ...projects].sort((a, b) => new Date(b.updated) - new Date(a.updated));
  }, [snippets, projects]);

  // Recently edited: the 50 newest of any kind, six at a time
  const recentAll = useMemo(() => all.slice(0, RECENT_MAX), [all]);
  const recentPageNow = Math.min(recentPage, Math.max(0, Math.ceil(recentAll.length / PAGE) - 1));
  const recentItems = useMemo(() => recentAll.slice(recentPageNow * PAGE, recentPageNow * PAGE + PAGE), [recentAll, recentPageNow]);
  // One row per kind of saved thing, newest first, six at a time (Next shows the following six)
  const kindRows = useMemo(() => KIND_ROWS.map(k => {
    const items = all.filter(i => i.type === k.type);
    const size = SIZE_OF[k.type] || PAGE; // a row that shares its line gets fewer cards
    const page = Math.min(pages[k.type] || 0, Math.max(0, Math.ceil(items.length / size) - 1));
    return { ...k, items, size, page, shown: items.slice(page * size, page * size + size) };
  }).filter(k => k.items.length), [all, pages]);
  const codeRow = kindRows.find(k => k.type === 'code');
  const websiteRow = kindRows.find(k => k.type === 'website');
  const sectionRow = kindRows.find(k => k.type === 'section');
  const emailRow = kindRows.find(k => k.type === 'email');
  const socialRow = kindRows.find(k => k.type === 'social');
  // One saved-kind row: a title with its count and pager, then its cards (full width: six across; half: three)
  const kindRowBase = (k, cls) => k && (
    <div key={k.type} className={cls}>
      <p className={st.activityTitle}>{k.title} <span className={st.rowCount}>{k.items.length}</span><Pager page={k.page} total={k.items.length} size={k.size} onPage={p => setPages(o => ({ ...o, [k.type]: p }))} /></p>
      <ul className={st.stripList}>{k.shown.map(savedCard)}</ul>
    </div>
  );
  const kindRowHalf = k => kindRowBase(k, `${st.strip} ${st.stripHalf}`);
  // Thumbnails for whatever is on screen in any row
  const onScreen = useMemo(() => [...new Map([...recentItems, ...kindRows.flatMap(k => k.shown)].map(i => [i.key, i])).values()], [recentItems, kindRows]);
  useMissingThumbs(onScreen);

  if (snippets === null) return null; // still reading this browser's storage
  const patreonPill = adFree
    ? <span className={`${st.patreon} ${st.patreonOn}`} title="The Patreon passcode is active in this browser">♥ Patreon supporter · no ads · premium exports on</span>
    : <button type="button" className={st.patreon} onClick={() => setUnlockOpen(true)} title={`Support the site on Patreon (${PATREON_PRICE}): no ads and premium exports`}>♡ Not a Patreon supporter yet · Sign in</button>;

  // Nothing saved yet: just the greeting and the Patreon status, one slim row
  if (!all.length) {
    return (
      <section className={`${st.wrap} ${st.wrapSlim}`} aria-labelledby="ws-title">
        <div className={st.head}>
          <div>
            <p className={st.eyebrow}>Your workspace</p>
            <h2 id="ws-title" className={st.title}>Welcome</h2>
          </div>
          {patreonPill}
        </div>
        <PremiumUnlockDialog open={unlockOpen} onClose={() => setUnlockOpen(false)} />
      </section>
    );
  }
  const latest = all[0];
  const countOf = type => all.filter(i => i.type === type && i.id !== 'draft').length;
  const strip = recentItems;

  return (
    <section className={st.wrap} aria-labelledby="ws-title">
      <div className={st.head}>
        <div>
          <p className={st.eyebrow}>Your workspace</p>
          <h2 id="ws-title" className={st.title}>Welcome back</h2>
          <p className={st.sub}>{all.length} {all.length === 1 ? 'thing' : 'things'} saved in this browser · last edit {ago(latest.updated)} · Use Backup in each tool to keep a copy</p>
        </div>
        {patreonPill}
      </div>

      {/* One row: the tools and brand kit on the left, a year of saves (one square per day) on the right */}
      <div className={st.topRow}>
        {/* Every tool with its saved count, two across */}
        <div className={st.tools}>
          {TOOLS.map(tl => {
            const n = countOf(tl.type);
            return (
              <a key={tl.type} className={`${st.tool} ${n ? '' : st.toolEmpty}`} href={tl.href} title={`Open ${tl.label}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tl.icon} alt="" width={22} height={22} className={st.toolIcon} />
                <span className={st.toolText}>
                  <span className={st.toolName}>{tl.label}</span>
                  <span className={st.toolSub}>{n ? `${n} ${tl.sub.toLowerCase()}` : 'Nothing saved yet'}</span>
                </span>
                {n > 0 && <span className={st.toolCount}>{n}</span>}
              </a>
            );
          })}
        </div>

        {/* Brand kit, favourites and bookmarks, stacked between the tools and the heatmap */}
        <div className={st.side}>
          <span className={`${st.sideItem} ${extra.kit ? st.chipOn : ''}`}>{extra.kit ? '✓ Brand kit set' : 'No brand kit yet'}</span>
          <span className={st.sideItem}>♥ {extra.favs.length} favourite template{extra.favs.length === 1 ? '' : 's'}</span>
          <a className={`${st.sideItem} ${st.sideLink}`} href={BOOKMARKED_HREF}>🔖 {bookmarks.length} bookmarked snippet{bookmarks.length === 1 ? '' : 's'}</a>
        </div>

        {/* A year of saves, one square per day */}
        <ActivityHeatmap items={all} log={activity} />
      </div>

      {/* The newest things saved, of any kind, above the per-kind rows, each with a picture of what was made */}
      {strip.length > 0 && <div className={st.strip}>
        <p className={st.activityTitle}>Recently edited <Pager page={recentPageNow} total={recentAll.length} onPage={setRecentPage} /></p>
        <ul className={st.stripList}>{strip.map(savedCard)}</ul>
      </div>}

      {/* Bookmarked snippets and My Code snippets, side by side in one row */}
      {(bookmarks.length > 0 || codeRow) && <div className={st.stripPair}>
        {/* Bookmarked library snippets (newest bookmark first), with their gallery preview images */}
        {bookmarks.length > 0 && <div className={`${st.strip} ${st.stripHalf}`}>
          <p className={st.activityTitle}>Bookmarked snippets{bookmarks.length > HALF ? <> · <a href={BOOKMARKED_HREF} className={st.stripMore}>see all {bookmarks.length}</a></> : null}</p>
          <ul className={st.stripList}>
            {bookmarks.slice(0, HALF).map(id => ({ id, title: SNIPPET_TITLE.get(id) || id.replace(/-/g, ' ') })).map(v => (
              <li key={v.id} className={st.stripItem}>
                <a href={`/ui-snippets/${v.id}/`} className={st.card} title={v.title}>
                  <span className={st.cardPic} style={{ '--tint': TYPES.code?.tint }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={`${st.cardImg} ${st.cardImgContain}`} src={`/images/ui-snippets/previews/${v.id}.png`} alt="" loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />
                  </span>
                  <span className={st.cardName}>{v.title}</span>
                  <span className={st.cardMeta}><b style={{ color: TYPES.code?.tint }}>UI snippet</b> · bookmarked</span>
                </a>
              </li>
            ))}
          </ul>
        </div>}
        {kindRowHalf(codeRow)}
      </div>}

      {/* Then a row for each kind of saved thing: websites beside website sections, emails beside social posts */}
      {(websiteRow || sectionRow) && <div className={st.stripPair}>{kindRowHalf(websiteRow)}{kindRowHalf(sectionRow)}</div>}
      {(emailRow || socialRow) && <div className={st.stripPair}>{kindRowHalf(emailRow)}{kindRowHalf(socialRow)}</div>}


      <PremiumUnlockDialog open={unlockOpen} onClose={() => setUnlockOpen(false)} />
    </section>
  );
}
