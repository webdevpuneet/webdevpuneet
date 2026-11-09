'use client';

/* The template library used by the Email, Social Post and Website Section galleries (the Website Builder has its own,
   with Preview + Customize buttons for its live demos, in WebsiteBuilder/TemplateGallery.js; both share
   WebsiteBuilder/TemplateGallery.module.css so they look the same).

   A search box (Ctrl/⌘ K), a filter panel built from `facets` (any of within a facet, all of across facets) with a
   count beside every option, Favourites, a sort menu, the active filters as removable chips with a result count, and
   the gallery's own cards with two small buttons on top: a heart (favourite) and a large-preview button. The large
   preview steps through the filtered results with the arrow keys, for quick side-by-side comparison. Favourites and
   "Recently viewed" are kept in this browser only.

   items      the templates, in their default (newest first) order
   facets     [{ key, label, options: [{ id, label, test(item) }] }]
   nameOf, searchOf(item) -> text, hrefOf(item), previewOf(item) -> image URL or null
   renderCard(item) -> the gallery's own card (a link)
   storageKey 'email' | 'social' | 'section' (favourites and recent are kept apart per library)
   leadCard   shown first while nothing is filtered (e.g. "Create a custom section")
   savedStrip (q) => the My designs strip, shown above the results
   hashFacet  a facet whose option can be picked from the address (#events) */

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { LoadMore } from '@/components/UiSnippetsGallery';
import useFilterPanel from '@/lib/use-filter-panel';
import s from '../SocialPostTemplates/styles.module.css';
import g from '../WebsiteBuilder/TemplateGallery.module.css';

const SORTS = [['new', 'Newest'], ['az', 'Name A–Z']];
const RECENT_MAX = 6;
const readList = key => { try { const v = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(v) ? v : []; } catch { return []; } };
const writeList = (key, v) => { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage blocked */ } };
const toggleIn = (arr, v) => (arr.includes(v) ? arr.filter(a => a !== v) : [...arr, v]);

const HEART = on => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7.2-4.35-9.55-8.42C.66 9.47 1.43 5.75 4.55 4.2 7.02 2.97 9.46 3.76 12 6.32c2.54-2.56 4.98-3.35 7.45-2.12 3.12 1.55 3.89 5.27 2.1 8.38C19.2 16.65 12 21 12 21Z" /></svg>
);
const EXPAND = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
);

function Check({ checked, onChange, label, count }) {
  return (
    <label className={g.check}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={g.checkLabel}>{label}</span>
      {count != null && <span className={g.checkCount}>{count}</span>}
    </label>
  );
}

/* Large preview of one template; ← / → step through the current results */
function PreviewModal({ items, index, onIndex, onClose, nameOf, hrefOf, previewOf, onOpen }) {
  const t = items[index];
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onIndex((index + 1) % items.length);
      else if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, items.length, onIndex, onClose]);
  if (!t || typeof document === 'undefined') return null;
  return createPortal(
    <div className={g.modalBack} onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={g.modal} role="dialog" aria-modal="true" aria-label={`Preview: ${nameOf(t)}`}>
        <div className={g.modalHead}>
          <strong>{nameOf(t)}</strong>
          <span className={g.modalPos}>{index + 1} / {items.length}</span>
          <button type="button" className={g.modalClose} onClick={onClose} aria-label="Close the preview">×</button>
        </div>
        <div className={g.modalBody}>
          <button type="button" className={`${g.modalNav} ${g.modalPrev}`} onClick={() => onIndex((index - 1 + items.length) % items.length)} aria-label="Previous template">‹</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={g.modalImg} src={previewOf(t)} alt={`${nameOf(t)} preview`} />
          <button type="button" className={`${g.modalNav} ${g.modalNext}`} onClick={() => onIndex((index + 1) % items.length)} aria-label="Next template">›</button>
        </div>
        <div className={g.modalFoot}>
          <span className={g.modalHint}>Use ← and → to compare</span>
          <a className={g.customizeBtn} href={hrefOf(t)} onClick={() => onOpen(t)}>Customize →</a>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function TemplateLibrary({
  items, facets, nameOf, searchOf, hrefOf, previewOf, renderCard, storageKey, gridClass = '',
  leadCard = null, savedStrip = null, title = 'All Templates', searchPlaceholder = 'Search templates', hashFacet = null, pageSize = 8, // two rows of four
}) {
  const favKey = `tpl_fav_${storageKey}`;
  const recentKey = `tpl_recent_${storageKey}`;
  const [q, setQ] = useState('');
  const [sel, setSel] = useState({}); // facet key -> [option ids]
  const [favOnly, setFavOnly] = useState(false);
  const [sort, setSort] = useState('new');
  const { open: panelOpen, auto: panelAuto, toggle: togglePanel, close: closePanel } = useFilterPanel();
  const [favs, setFavs] = useState([]);
  const [recent, setRecent] = useState([]);
  const [shownCount, setShownCount] = useState(pageSize);
  const [peek, setPeek] = useState(-1); // index into the results shown in the large preview
  const [mac, setMac] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    setFavs(readList(favKey));
    setRecent(readList(recentKey));
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || ''));
  }, [favKey, recentKey]);
  // #events in the address picks that option of the hash facet
  useEffect(() => {
    if (!hashFacet) return undefined;
    const f = facets.find(x => x.key === hashFacet);
    const pick = () => { const h = window.location.hash.slice(1); if (f?.options.some(o => o.id === h)) setSel(v => ({ ...v, [hashFacet]: [h] })); };
    pick();
    window.addEventListener('hashchange', pick);
    return () => window.removeEventListener('hashchange', pick);
  }, [hashFacet]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const onKey = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => { setShownCount(pageSize); }, [q, sel, favOnly, sort, pageSize]);

  const toggleFav = id => setFavs(f => { const n = toggleIn(f, id); writeList(favKey, n); return n; });
  const remember = t => { const n = [t.id, ...readList(recentKey).filter(r => r !== t.id)].slice(0, RECENT_MAX); writeList(recentKey, n); };

  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (t, skip) => {
    if (words.length && !words.every(w => searchOf(t).toLowerCase().includes(w))) return false;
    for (const f of facets) {
      if (f.key === skip) continue;
      const on = sel[f.key] || [];
      if (on.length && !f.options.some(o => on.includes(o.id) && o.test(t))) return false;
    }
    if (skip !== 'fav' && favOnly && !favs.includes(t.id)) return false;
    return true;
  };
  const list = useMemo(() => {
    const out = items.filter(t => matches(t));
    if (sort === 'az') out.sort((a, b) => nameOf(a).localeCompare(nameOf(b)));
    return out;
  }, [items, q, sel, favOnly, favs, sort]); // eslint-disable-line react-hooks/exhaustive-deps
  const countFor = (key, test) => items.filter(t => matches(t, key) && test(t)).length;

  const chips = [
    ...facets.flatMap(f => (sel[f.key] || []).map(id => ({ key: `${f.key}:${id}`, label: f.options.find(o => o.id === id)?.label || id, clear: () => setSel(v => ({ ...v, [f.key]: (v[f.key] || []).filter(a => a !== id) })) }))),
    ...(favOnly ? [{ key: 'fav', label: 'Favourites', clear: () => setFavOnly(false) }] : []),
  ];
  const clearAll = () => { setSel({}); setFavOnly(false); };
  const filtering = chips.length > 0 || words.length > 0;
  const lead = leadCard && !filtering && sort === 'new' ? leadCard : null;
  const shown = list.slice(0, shownCount - (lead ? 1 : 0));
  const byId = Object.fromEntries(items.map(t => [t.id, t]));
  const recentShown = recent.map(id => byId[id]).filter(Boolean);
  const peekList = shown.filter(t => previewOf(t));

  return (
    <div className={s.gallery} data-spt-gallery>
      <div className={g.toolbar}>
        <div className={g.searchBox}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
          <input ref={searchRef} type="search" value={q} onChange={ev => setQ(ev.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
          <kbd className={g.kbd} aria-hidden="true">{mac ? '⌘ K' : 'Ctrl K'}</kbd>
        </div>
        <button type="button" className={`${g.toolBtn} ${panelOpen ? g.toolBtnOn : ''}`} onClick={togglePanel} aria-expanded={panelOpen} aria-controls={`lib-filters-${storageKey}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="17" x2="20" y2="17" /><circle cx="9" cy="7" r="2.4" fill="var(--surface)" /><circle cx="15" cy="17" r="2.4" fill="var(--surface)" /></svg>
          Filters{chips.length > 0 && <span className={g.toolCount}>{chips.length}</span>}
        </button>
        <label className={g.sortWrap}>
          <select className={g.sort} value={sort} onChange={ev => setSort(ev.target.value)} aria-label="Sort templates">
            {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
      </div>

      {savedStrip && savedStrip(q)}

      <div className={s.sectionHead}>
        <h2>{title}</h2>
        <span>{items.length}</span>
      </div>
      <div className={g.chipsRow}>
        <div className={g.chips}>
          {chips.map(c => <button key={c.key} type="button" className={g.chip} onClick={c.clear} aria-label={`Remove filter: ${c.label}`}>{c.label} <span aria-hidden="true">×</span></button>)}
          {chips.length > 0 && <button type="button" className={g.clearAll} onClick={clearAll}>Clear all</button>}
        </div>
        <span className={g.resultCount}>{list.length} {list.length === 1 ? 'result' : 'results'}</span>
      </div>

      <div className={`${g.layout} ${panelOpen ? '' : g.layoutClosed}`}>
        {panelOpen && (
          <aside id={`lib-filters-${storageKey}`} className={`${g.panel} ${panelAuto ? g.panelAuto : ''}`} aria-label="Filter templates">
            {facets.map(f => (
              <fieldset key={f.key} className={g.group}>
                <legend>{f.label}</legend>
                {f.options.map(o => {
                  const n = countFor(f.key, o.test);
                  const on = (sel[f.key] || []).includes(o.id);
                  return n || on ? <Check key={o.id} checked={on} onChange={() => setSel(v => ({ ...v, [f.key]: toggleIn(v[f.key] || [], o.id) }))} label={o.label} count={n} /> : null;
                })}
              </fieldset>
            ))}
            <fieldset className={g.group}>
              <legend>Yours</legend>
              <Check checked={favOnly} onChange={() => setFavOnly(v => !v)} label="Favourites" count={favs.filter(id => byId[id]).length} />
            </fieldset>
            <button type="button" className={g.panelDone} onClick={closePanel}>Show {list.length} {list.length === 1 ? 'result' : 'results'}</button>
          </aside>
        )}

        <div className={g.results}>
          {list.length === 0 && !lead
            ? <div className={s.empty}>No templates match these filters. <button type="button" className={g.linkBtn} onClick={() => { clearAll(); setQ(''); }}>Clear the filters</button></div>
            : (
              <div className={`${g.grid} ${gridClass}`}>
                {lead}
                {shown.map(t => {
                  const fav = favs.includes(t.id);
                  const img = previewOf(t);
                  return (
                    <div key={t.id} className={g.libCard} onClickCapture={e => { if (e.target.closest('a')) remember(t); }}>
                      {renderCard(t)}
                      <div className={g.libTools}>
                        <button type="button" className={`${g.heart} ${g.libTool} ${fav ? g.heartOn : ''}`} onClick={() => toggleFav(t.id)} aria-pressed={fav} aria-label={fav ? `Remove ${nameOf(t)} from favourites` : `Add ${nameOf(t)} to favourites`} title={fav ? 'In your favourites' : 'Add to favourites'}>{HEART(fav)}</button>
                        {img && <button type="button" className={`${g.heart} ${g.libTool}`} onClick={() => setPeek(peekList.indexOf(t))} aria-label={`Large preview of ${nameOf(t)}`} title="Large preview (compare with ← →)">{EXPAND}</button>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          <LoadMore shown={Math.min(shownCount - (lead ? 1 : 0), list.length)} total={list.length} onLoadMore={() => setShownCount(n => n + pageSize)} />

          {recentShown.length > 0 && (
            <div className={g.recent}>
              <span className={g.recentLabel}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>
                Recently viewed
              </span>
              {recentShown.map(t => <a key={t.id} className={g.recentChip} href={hrefOf(t)}>{nameOf(t)}</a>)}
            </div>
          )}
        </div>
      </div>

      {peek >= 0 && (
        <PreviewModal items={peekList} index={peek} onIndex={setPeek} onClose={() => setPeek(-1)} nameOf={nameOf} hrefOf={hrefOf} previewOf={previewOf} onOpen={remember} />
      )}
    </div>
  );
}
