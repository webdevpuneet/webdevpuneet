'use client';

/* "Your workspace" on the home page, above the hero. A visitor with nothing saved yet sees one slim row (a welcome and
   their Patreon status); once something is saved the full card appears.
   One card with: where to pick up again, every tool with how many things are saved in it, the latest activity across
   all tools, and the visitor's brand kit, favourites, bookmarks and Patreon status. Everything is read from this
   browser's own storage (the same sources as the sidebar's projects: lib/design-store, uiSnippetsDb, localStorage);
   nothing is sent anywhere. */

import { useEffect, useMemo, useState } from 'react';
import { useProjects, TYPES } from '@/components/Sidebar/MyProjects';
import { dbGetAll as dbGetAllCustomSnippets } from '@/lib/uiSnippetsDb';
import { useBookmarks, BOOKMARKED_HREF } from '@/lib/snippet-bookmarks';
import { loadKit, kitIsSet } from '@/components/BrandKit';
import { useAdFree } from '@/lib/use-ad-free';
import { PremiumUnlockDialog } from '@/components/PremiumGate';
import { PATREON_PRICE } from '@/lib/premium';
import st from './styles.module.css';

const TOOLS = [
  { type: 'website', label: 'Website Builder', sub: 'Websites', href: '/website-builder/', icon: '/icons/website-builder.svg' },
  { type: 'section', label: 'Website Sections', sub: 'Section designs', href: '/website-section-templates/', icon: '/icons/website-section-templates.svg' },
  { type: 'email', label: 'Email Templates', sub: 'Email designs', href: '/email-templates/', icon: '/icons/email-templates.svg' },
  { type: 'social', label: 'Social Posts', sub: 'Post designs', href: '/social-post-templates/', icon: '/icons/social-post-templates.svg' },
  { type: 'code', label: 'My Code', sub: 'Snippets', href: '/ui-snippets/mycode/', icon: '/icons/my-code.svg' },
  { type: 'prompt', label: 'AI Prompts', sub: 'Saved prompts', href: '/ai-prompt-studio/', icon: '/icons/ai-prompt-studio.svg' },
];
const FAV_KEYS = ['wb_tpl_favourites', 'tpl_fav_email', 'tpl_fav_social', 'tpl_fav_section'];

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

export default function HomeWorkspace() {
  const projects = useProjects();
  const bookmarks = useBookmarks();
  const adFree = useAdFree();
  const [snippets, setSnippets] = useState(null);
  const [extra, setExtra] = useState({ favs: 0, kit: false });
  const [unlockOpen, setUnlockOpen] = useState(false);

  useEffect(() => {
    let live = true;
    const load = () => dbGetAllCustomSnippets().then(all => { if (live) setSnippets(all || []); }).catch(() => { if (live) setSnippets([]); });
    load();
    window.addEventListener('uis-custom-snippets-changed', load);
    let favs = 0;
    for (const k of FAV_KEYS) { try { const v = JSON.parse(localStorage.getItem(k) || '[]'); if (Array.isArray(v)) favs += v.length; } catch { /* ignore */ } }
    setExtra({ favs, kit: kitIsSet(loadKit()) });
    return () => { live = false; window.removeEventListener('uis-custom-snippets-changed', load); };
  }, []);

  // Everything saved, newest first (My Code snippets in the same shape as the other projects)
  const all = useMemo(() => {
    const code = (snippets || []).map(sn => ({
      key: `code:${sn.id}`, type: 'code', name: sn.name || 'Untitled', sub: (sn.tags || []).join(', '),
      updated: sn.updatedAt || sn.createdAt || '', href: `/ui-snippets/mycode/?id=${sn.id}`,
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
  const countOf = type => all.filter(i => i.type === type && i.id !== 'draft').length;
  const lastOf = type => all.find(i => i.type === type);
  const recent = all.slice(0, 6);

  return (
    <section className={st.wrap} aria-labelledby="ws-title">
      <div className={st.head}>
        <div>
          <p className={st.eyebrow}>Your workspace</p>
          <h2 id="ws-title" className={st.title}>Welcome back</h2>
          <p className={st.sub}>{all.length} {all.length === 1 ? 'thing' : 'things'} saved in this browser · last edit {ago(latest.updated)}</p>
        </div>
        {patreonPill}
      </div>

      <div className={st.grid}>
        {/* Pick up where you left off */}
        <a className={st.resume} href={latest.href}>
          <span className={st.resumeLabel}>Pick up where you left off</span>
          <span className={st.resumeName}>{latest.name}</span>
          <span className={st.resumeMeta}>
            <b style={{ color: TYPES[latest.type]?.tint }}>{TYPES[latest.type]?.label}</b>{latest.sub ? ` · ${latest.sub}` : ''} · {ago(latest.updated)}
          </span>
          <span className={st.resumeGo}>Continue →</span>
        </a>

        {/* Every tool with its saved count */}
        <div className={st.tools}>
          {TOOLS.map(tl => {
            const n = countOf(tl.type);
            const last = lastOf(tl.type);
            return (
              <a key={tl.type} className={`${st.tool} ${n ? '' : st.toolEmpty}`} href={last && n ? last.href : tl.href} title={last ? `Last: ${last.name}` : `Open ${tl.label}`}>
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

        {/* Latest activity across all tools */}
        <div className={st.activity}>
          <p className={st.activityTitle}>Recent activity</p>
          <ol className={st.activityList}>
            {recent.map(i => (
              <li key={i.key}>
                <a href={i.href} className={st.activityItem}>
                  <span className={st.dot} style={{ background: TYPES[i.type]?.tint }} aria-hidden="true" />
                  <span className={st.activityName}>{i.name}</span>
                  <span className={st.activityWhen}>{ago(i.updated)}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className={st.chips}>
        <span className={`${st.chip} ${extra.kit ? st.chipOn : ''}`}>{extra.kit ? '✓ Brand kit set' : 'No brand kit yet'}</span>
        <span className={st.chip}>♥ {extra.favs} favourite template{extra.favs === 1 ? '' : 's'}</span>
        <a className={st.chip} href={BOOKMARKED_HREF}>🔖 {bookmarks.length} bookmarked snippet{bookmarks.length === 1 ? '' : 's'}</a>
        <span className={st.chipNote}>Saved only in this browser. Use Backup in each tool to keep a copy.</span>
      </div>

      <PremiumUnlockDialog open={unlockOpen} onClose={() => setUnlockOpen(false)} />
    </section>
  );
}
