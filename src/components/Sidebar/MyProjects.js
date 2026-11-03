'use client';

/* "My Projects" tab of the left sidebar: a log of what this visitor has built, newest first, grouped by
   day, where one click carries on. Everything is read from this browser's own storage (IndexedDB):
   - My Code snippets (lib/uiSnippetsDb)
   - saved websites (Website Builder), website sections, emails and social posts ("My designs" of each tool)
   - the website being built right now (the Website Builder's autosave), until it is saved */

import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css';
import { makeDesignStore } from '@/lib/design-store';
import { dbDelete as dbDeleteCustomSnippet } from '@/lib/uiSnippetsDb';

const enc = encodeURIComponent;
const SOURCES = [
  { type: 'website', db: 'wdp-website-pages', href: d => `/website-builder/editor/?page=${enc(d.id)}` },
  { type: 'section', db: 'wdp-section-designs', href: d => `/website-section-templates/${d.tpl}/?design=${enc(d.id)}` },
  { type: 'email', db: 'wdp-email-designs', href: d => `/email-templates/${d.tpl}/?design=${enc(d.id)}` },
  { type: 'social', db: 'wdp-spt-designs', href: d => `/social-post-templates/${d.tpl}/?design=${enc(d.id)}` },
];
export const TYPES = {
  code: { label: 'Code', plural: 'Code', tint: '#6366f1', icon: '</>' },
  website: { label: 'Website', plural: 'Websites', tint: '#0ea5e9', icon: 'W' },
  section: { label: 'Section', plural: 'Sections', tint: '#10b981', icon: 'S' },
  email: { label: 'Email', plural: 'Emails', tint: '#f59e0b', icon: '@' },
  social: { label: 'Post', plural: 'Posts', tint: '#ec4899', icon: 'P' },
};
const WEBSITE_DB = 'wdp-website-pages';
const WEBSITE_DRAFT = 'page';

let stores = null;
const getStores = () => {
  if (!stores) stores = SOURCES.map(src => ({ ...src, store: makeDesignStore(src.db) }));
  return stores;
};

const pretty = tpl => String(tpl || '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const siteHasContent = st => !!(st && ((st.pages || []).some(p => (p.sections || []).length) || (st.sections || []).length));

/* Every saved design of the four tools, plus the website being built. Refreshes when anything is saved
   or deleted, and when the visitor comes back to the tab. */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const load = useCallback(async () => {
    try {
      const lists = await Promise.all(getStores().map(async src => {
        const all = await src.store.listDesigns();
        return all.map(d => ({
          key: `${src.type}:${d.id}`, type: src.type, id: d.id, name: d.name || 'Untitled', sub: src.type === 'website' ? '' : pretty(d.tpl),
          updated: d.updated, thumb: d.thumb || null, href: src.href(d), remove: () => src.store.deleteDesign(d.id),
        }));
      }));
      const items = lists.flat();
      // the website in progress (autosave), unless the same website is already saved
      const web = getStores().find(x => x.db === WEBSITE_DB);
      const drafts = await web.store.listAutosaves?.().catch(() => []) || [];
      const draft = drafts.find(r => r.tpl === WEBSITE_DRAFT);
      if (draft && siteHasContent(draft.state)) {
        const name = draft.state.name || 'My website';
        if (!items.some(i => i.type === 'website' && i.name === name)) {
          items.push({ key: 'website:draft', type: 'website', id: 'draft', name, sub: 'In progress', updated: draft.updated, thumb: null, href: '/website-builder/editor/', remove: () => web.store.clearAutosave(WEBSITE_DRAFT) });
        }
      }
      setProjects(items);
    } catch { /* storage blocked: nothing to show */ }
  }, []);
  useEffect(() => {
    load();
    const offs = getStores().map(src => src.store.onDesignsChange(load));
    const onVisible = () => { if (document.visibilityState === 'visible') load(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { offs.forEach(off => off()); document.removeEventListener('visibilitychange', onVisible); };
  }, [load]);
  return projects;
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
  return new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: new Date(t).getFullYear() === new Date().getFullYear() ? undefined : 'numeric' });
}
function dayGroup(iso) {
  const t = new Date(iso);
  const startOf = d => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diff = Math.round((startOf(new Date()) - startOf(t)) / 86400000);
  if (diff <= 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return 'Earlier this week';
  if (diff < 31) return 'Earlier this month';
  return 'Older';
}

const SORT_ICON_NEW = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="20" x2="12" y2="4"/><polyline points="5 11 12 4 19 11"/><line x1="7" y1="20" x2="17" y2="20"/></svg>;
const SORT_ICON_OLD = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="4" x2="12" y2="20"/><polyline points="5 13 12 20 19 13"/><line x1="7" y1="4" x2="17" y2="4"/></svg>;

export default function MyProjectsTab({ snippets, projects }) {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('all');
  const [order, setOrder] = useState('newest');
  const [confirmKey, setConfirmKey] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [here, setHere] = useState('');

  // the address of the open page, to mark the project that is open now (follows pushState and back/forward)
  useEffect(() => {
    const read = () => { try { setHere(window.location.pathname + window.location.search); } catch { setHere(''); } };
    read();
    const origPush = window.history.pushState;
    const origReplace = window.history.replaceState;
    const patched = orig => function () { const ret = orig.apply(this, arguments); setTimeout(read, 0); return ret; };
    window.history.pushState = patched(origPush);
    window.history.replaceState = patched(origReplace);
    window.addEventListener('popstate', read);
    return () => { window.history.pushState = origPush; window.history.replaceState = origReplace; window.removeEventListener('popstate', read); };
  }, []);

  const all = useMemo(() => {
    const code = snippets.map(sn => ({
      key: `code:${sn.id}`, type: 'code', id: sn.id, name: sn.name || 'Untitled', sub: (sn.tags || []).join(', '),
      updated: sn.updatedAt || sn.createdAt || '', thumb: null, href: `/ui-snippets/mycode/?id=${sn.id}`, remove: () => dbDeleteCustomSnippet(sn.id),
    }));
    return [...code, ...projects].sort((a, b) => new Date(b.updated) - new Date(a.updated));
  }, [snippets, projects]);

  const counts = useMemo(() => {
    const c = {};
    all.forEach(i => { c[i.type] = (c[i.type] || 0) + 1; });
    return c;
  }, [all]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = all.filter(i => (kind === 'all' || i.type === kind) && (!q || `${i.name} ${i.sub}`.toLowerCase().includes(q)));
    if (order === 'oldest') list = [...list].reverse();
    return list;
  }, [all, query, kind, order]);

  // grouped by day, in the order shown
  const groups = useMemo(() => {
    const out = [];
    shown.forEach(i => {
      const g = dayGroup(i.updated);
      const last = out[out.length - 1];
      if (last && last.label === g) last.items.push(i); else out.push({ label: g, items: [i] });
    });
    return out;
  }, [shown]);

  const isOpen = item => (item.type === 'website' && item.id === 'draft')
    ? here.startsWith('/website-builder/editor') && !here.includes('page=')
    : here === item.href || here === item.href.replace(/\/\?/, '?');

  async function confirmDelete(item) {
    setDeleting(true);
    try { await item.remove(); } catch { /* keep the list as it is */ }
    setDeleting(false);
    setConfirmKey(null);
  }

  const latest = all[0];
  const kinds = Object.keys(TYPES).filter(k => counts[k] > 0);

  return (
    <>
      <div className={styles.libSearchWrap}>
        <div className={styles.libSearchBox}>
          <svg className={styles.libSearchIcon} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" className={styles.libSearchInput} placeholder="Search my projects..." value={query} onChange={e => setQuery(e.target.value)} aria-label="Search my projects" />
        </div>
        <button
          className={styles.sortBtn}
          onClick={() => setOrder(o => (o === 'newest' ? 'oldest' : 'newest'))}
          title={order === 'newest' ? 'Newest first — click for oldest first' : 'Oldest first — click for newest first'}
          aria-label={order === 'newest' ? 'Sort: newest first' : 'Sort: oldest first'}
        >{order === 'newest' ? SORT_ICON_NEW : SORT_ICON_OLD}</button>
      </div>

      {kinds.length > 1 && (
        <div className={styles.projChips} role="tablist" aria-label="Filter by type">
          <button type="button" className={`${styles.projChip} ${kind === 'all' ? styles.projChipOn : ''}`} onClick={() => setKind('all')}>All {all.length}</button>
          {kinds.map(k => (
            <button key={k} type="button" className={`${styles.projChip} ${kind === k ? styles.projChipOn : ''}`} onClick={() => setKind(k)}>{TYPES[k].plural} {counts[k]}</button>
          ))}
        </div>
      )}

      <div className={styles.snippetList} aria-label="My projects">
        {latest && !query && kind === 'all' && (
          <a href={latest.href} className={styles.projResume}>
            <span className={styles.projResumeLabel}>Pick up where you left off</span>
            <span className={styles.projResumeName}>{latest.name}</span>
            <span className={styles.projResumeMeta}>{TYPES[latest.type].label}{latest.sub ? ` · ${latest.sub}` : ''} · {ago(latest.updated)} →</span>
          </a>
        )}

        {all.length === 0 && (
          <div className={styles.noResults}>
            Nothing here yet. Anything you save in the Website Builder, Website Sections, Email Templates, Social Posts or My Code shows up here, newest first, so you can carry on where you stopped.
          </div>
        )}
        {all.length > 0 && shown.length === 0 && <div className={styles.noResults}>No results</div>}

        {groups.map(g => (
          <div key={g.label} className={styles.projGroup}>
            <div className={styles.projGroupLabel}>{g.label}</div>
            {g.items.map(item => (
              confirmKey === item.key ? (
                <div key={item.key} className={styles.snippetItem} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text2)' }}>Delete &ldquo;{item.name}&rdquo;?</span>
                  <span style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <button type="button" onClick={() => setConfirmKey(null)} disabled={deleting} style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, border: '1px solid var(--border2)', background: 'none', color: 'var(--text2)', cursor: 'pointer' }}>Cancel</button>
                    <button type="button" onClick={() => confirmDelete(item)} disabled={deleting} style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, border: 'none', background: '#dc2626', color: '#fff', cursor: 'pointer' }}>{deleting ? '...' : 'Delete'}</button>
                  </span>
                </div>
              ) : (
                <div key={item.key} className={styles.myCodeRow}>
                  <a href={item.href} className={`${styles.snippetItem} ${isOpen(item) ? styles.snippetItemActive : ''}`} style={{ flex: 1, minWidth: 0 }} title={`Open ${item.name}`}>
                    {item.thumb
                      ? <img className={styles.projThumb} src={item.thumb} alt="" loading="lazy" />
                      : <span className={styles.projThumb} style={{ background: `${TYPES[item.type].tint}1f`, color: TYPES[item.type].tint }} aria-hidden="true">{TYPES[item.type].icon}</span>}
                    <span className={styles.myCodeText}>
                      <span className={styles.snippetTitle}>{item.name}</span>
                      <span className={styles.projMeta}>
                        <b style={{ color: TYPES[item.type].tint }}>{TYPES[item.type].label}</b>
                        {item.sub ? ` · ${item.sub}` : ''} · {isOpen(item) ? 'open now' : ago(item.updated)}
                      </span>
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setConfirmKey(item.key)}
                    aria-label={`Delete "${item.name}"`}
                    title="Delete"
                    className={styles.myCodeDeleteBtn}
                    style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', borderRadius: 6 }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.background = 'var(--surface2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.background = 'none'; }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
