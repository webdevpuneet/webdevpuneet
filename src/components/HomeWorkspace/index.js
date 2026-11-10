'use client';

/* "Your workspace" on the home page, above the hero. A visitor with nothing saved yet sees one slim row (a welcome and
   their Patreon status); once something is saved the full card appears: "Pick up where you left off" (the item edited
   last, with a picture of it) and a "Recently edited" strip of the newest items, each with a picture of what was made.
   Everything is read from this browser's own storage (the same sources as the sidebar's projects: lib/design-store,
   uiSnippetsDb); nothing is sent anywhere. */

import { useEffect, useMemo, useState } from 'react';
import { useProjects, TYPES } from '@/components/Sidebar/MyProjects';
import { dbGetAll as dbGetAllCustomSnippets, dbSetThumb } from '@/lib/uiSnippetsDb';
import { useAdFree } from '@/lib/use-ad-free';
import { PremiumUnlockDialog } from '@/components/PremiumGate';
import { PATREON_PRICE } from '@/lib/premium';
import st from './styles.module.css';

const PAGE = 6; // cards per full-width row; Next shows the following six
const RECENT_MAX = 50; // Recently edited pages through at most this many

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
  const adFree = useAdFree();
  const [snippets, setSnippets] = useState(null);
  const [unlockOpen, setUnlockOpen] = useState(false);

  useEffect(() => {
    let live = true;
    const load = () => dbGetAllCustomSnippets().then(all => { if (live) setSnippets(all || []); }).catch(() => { if (live) setSnippets([]); });
    load();
    window.addEventListener('uis-custom-snippets-changed', load);
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

      {/* "Pick up where you left off" and "Recently edited" were removed from the home page (2026-11-10).
          The helpers for them (CardPicture, savedCard, Pager, useMissingThumbs) are kept below in case they come back. */}
      <PremiumUnlockDialog open={unlockOpen} onClose={() => setUnlockOpen(false)} />
    </section>
  );
}
