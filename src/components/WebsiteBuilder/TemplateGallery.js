'use client';

/* /website-builder/: the landing page. Your pages first (start from scratch, continue, My pages), then the template
   library: a search box (Ctrl/⌘ K), a filter panel (industry, what the site includes, one page or several, free or
   Patreon, your favourites), a sort menu, the active filters as removable chips with a result count, and cards with
   Preview (the live demo) and Customize (the editor) side by side. Favourites and "Recently viewed" are kept in this
   browser only. Every template card is in the server-rendered HTML (the filters only hide cards). */

import { useEffect, useMemo, useRef, useState } from 'react';
import { LoadMore } from '@/components/UiSnippetsGallery';
import useFilterPanel from '@/lib/use-filter-panel';
import s from '../SocialPostTemplates/styles.module.css';
import x from '../SectionTemplates/styles.module.css';
import g from './TemplateGallery.module.css';
import StartCards, { EDITOR } from './StartCards';
import InViewImg from '@/components/InViewImg';
import { panHandlers } from '@/components/HomeTemplatesCarousel';
import hs from '@/components/HomeTemplatesCarousel/styles.module.css';
import GalleryTopAd from '@/components/GalleryTopAd';
import { PremiumBadge } from '@/components/PremiumGate';
import { isPremiumTemplate } from '@/lib/premium';

const PAGE = 8; // two rows of four
// The live demos are uploaded to the real site only (they are not part of the build), so the link is absolute and works from localhost too
const DEMOS = 'https://webdevpuneet.com/demos/website-templates/';
const FAV_KEY = 'wb_tpl_favourites';
const RECENT_KEY = 'wb_tpl_recent';
const RECENT_MAX = 6;

/* What a site includes: section categories a buyer looks for (the counts come from the templates themselves) */
export const INCLUDES = [
  ['pricing', 'Pricing'], ['testimonials', 'Testimonials'], ['team', 'Team'], ['gallery', 'Gallery'], ['blog', 'Blog'],
  ['faq', 'FAQ'], ['contact', 'Contact form'], ['listings', 'Listings & products'], ['timeline', 'Timeline'], ['scroll', 'Scroll effects'],
];
const SORTS = [['new', 'Newest'], ['az', 'Name A–Z'], ['sections', 'Most sections'], ['pages', 'Most pages']];

const readList = key => { try { const v = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(v) ? v : []; } catch { return []; } };
const writeList = (key, v) => { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage blocked */ } };
const toggleIn = (arr, v) => (arr.includes(v) ? arr.filter(a => a !== v) : [...arr, v]);

const HEART = on => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7.2-4.35-9.55-8.42C.66 9.47 1.43 5.75 4.55 4.2 7.02 2.97 9.46 3.76 12 6.32c2.54-2.56 4.98-3.35 7.45-2.12 3.12 1.55 3.89 5.27 2.1 8.38C19.2 16.65 12 21 12 21Z" /></svg>
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

export default function TemplateGallery({ templates, industries }) {
  const [q, setQ] = useState('');
  const [inds, setInds] = useState([]); // industries (any of)
  const [incs, setIncs] = useState([]); // includes (all of)
  const [pages, setPages] = useState(''); // '' | 'one' | 'multi'
  const [access, setAccess] = useState(''); // '' | 'free' | 'patreon'
  const [favOnly, setFavOnly] = useState(false);
  const [sort, setSort] = useState('new');
  const { open: panelOpen, auto: panelAuto, toggle: togglePanel, close: closePanel } = useFilterPanel();
  const [favs, setFavs] = useState([]);
  const [recent, setRecent] = useState([]);
  const [shownCount, setShownCount] = useState(PAGE);
  const [mac, setMac] = useState(false); // the shortcut hint says Ctrl K, or ⌘ K on a Mac
  const searchRef = useRef(null);

  // Favourites and recently viewed live in this browser; the filter panel starts closed on phones
  useEffect(() => {
    setFavs(readList(FAV_KEY));
    setRecent(readList(RECENT_KEY));
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || ''));
  }, []);
  // Ctrl/⌘ K jumps to the search box
  useEffect(() => {
    const onKey = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => { setShownCount(PAGE); }, [q, inds, incs, pages, access, favOnly, sort]);

  const toggleFav = id => setFavs(f => { const n = toggleIn(f, id); writeList(FAV_KEY, n); return n; });
  const remember = id => { const n = [id, ...readList(RECENT_KEY).filter(r => r !== id)].slice(0, RECENT_MAX); writeList(RECENT_KEY, n); };

  // Every filter except one, so the counts beside that filter's options show what picking them would give
  const matches = (t, skip) => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length && !words.every(w => `${t.name} ${t.industry} ${t.blurb}`.toLowerCase().includes(w))) return false;
    if (skip !== 'ind' && inds.length && !inds.includes(t.industry)) return false;
    if (skip !== 'inc' && incs.length && !incs.every(i => t.inc.includes(i))) return false;
    if (skip !== 'pages' && pages && (pages === 'multi') !== (t.p > 1)) return false;
    if (skip !== 'access' && access && (access === 'patreon') !== isPremiumTemplate(t.id)) return false;
    if (skip !== 'fav' && favOnly && !favs.includes(t.id)) return false;
    return true;
  };
  const list = useMemo(() => {
    const out = templates.filter(t => matches(t));
    if (sort === 'az') out.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'sections') out.sort((a, b) => b.n - a.n);
    else if (sort === 'pages') out.sort((a, b) => b.p - a.p);
    return out;
  }, [templates, q, inds, incs, pages, access, favOnly, favs, sort]); // eslint-disable-line react-hooks/exhaustive-deps
  const countFor = (skip, test) => templates.filter(t => matches(t, skip) && test(t)).length;

  // The active filters, as chips
  const chips = [
    ...inds.map(i => ({ key: `ind:${i}`, label: i, clear: () => setInds(v => v.filter(a => a !== i)) })),
    ...incs.map(i => ({ key: `inc:${i}`, label: INCLUDES.find(([id]) => id === i)?.[1] || i, clear: () => setIncs(v => v.filter(a => a !== i)) })),
    ...(pages ? [{ key: 'pages', label: pages === 'multi' ? 'Several pages' : 'One page', clear: () => setPages('') }] : []),
    ...(access ? [{ key: 'access', label: access === 'patreon' ? 'Patreon' : 'Free', clear: () => setAccess('') }] : []),
    ...(favOnly ? [{ key: 'fav', label: 'Favourites', clear: () => setFavOnly(false) }] : []),
  ];
  const clearAll = () => { setInds([]); setIncs([]); setPages(''); setAccess(''); setFavOnly(false); };
  const filtering = chips.length > 0 || !!q.trim();
  const withCreate = !filtering && sort === 'new';
  const byId = Object.fromEntries(templates.map(t => [t.id, t]));
  const recentShown = recent.map(id => byId[id]).filter(Boolean);

  return (
    <div className={`${s.galleryPage} ${s.galleryFull}`}>
      {/* Fully responsive ad, no height limit (gallery pages only) */}
      <GalleryTopAd />
      <header className={s.galleryHead}>
        <h1 className={s.galleryH1}>Free Website Builder &amp; Templates</h1>
        <p className={s.galleryLead}>
          Pick one of {templates.length} complete website templates with real content, or start from scratch. Edit everything in the browser,
          set your colours and fonts, preview desktop, tablet and mobile, then export clean HTML you can host anywhere. No sign-up.
        </p>
      </header>
      <div className={s.gallery}>
        <StartCards />

        <div className={s.sectionHead}>
          <h2>All Templates</h2>
          <span>{templates.length}</span>
          <a href="/website-section-templates/" className={g.sectionsLink}>Single sections →</a>
        </div>

        {/* Search, filters button and sort */}
        <div className={g.toolbar}>
          <div className={g.searchBox}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
            <input ref={searchRef} type="search" value={q} onChange={ev => setQ(ev.target.value)} placeholder="Search templates, industries or styles" aria-label="Search website templates" />
            <kbd className={g.kbd} aria-hidden="true">{mac ? '⌘ K' : 'Ctrl K'}</kbd>
          </div>
          <button type="button" className={`${g.toolBtn} ${panelOpen ? g.toolBtnOn : ''}`} onClick={togglePanel} aria-expanded={panelOpen} aria-controls="tpl-filters">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="17" x2="20" y2="17" /><circle cx="9" cy="7" r="2.4" fill="var(--surface)" /><circle cx="15" cy="17" r="2.4" fill="var(--surface)" /></svg>
            Filters{chips.length > 0 && <span className={g.toolCount}>{chips.length}</span>}
          </button>
          <label className={g.sortWrap}>
            <select className={g.sort} value={sort} onChange={ev => setSort(ev.target.value)} aria-label="Sort templates">
              {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
        </div>

        {/* Active filters and the result count */}
        <div className={g.chipsRow}>
          <div className={g.chips}>
            {chips.map(c => (
              <button key={c.key} type="button" className={g.chip} onClick={c.clear} aria-label={`Remove filter: ${c.label}`}>{c.label} <span aria-hidden="true">×</span></button>
            ))}
            {chips.length > 0 && <button type="button" className={g.clearAll} onClick={clearAll}>Clear all</button>}
          </div>
          <span className={g.resultCount}>{list.length} {list.length === 1 ? 'result' : 'results'}</span>
        </div>

        <div className={`${g.layout} ${panelOpen ? '' : g.layoutClosed}`}>
          {panelOpen && (
            <aside id="tpl-filters" className={`${g.panel} ${panelAuto ? g.panelAuto : ''}`} aria-label="Filter templates">
              <fieldset className={g.group}>
                <legend>Industry</legend>
                <Check checked={inds.length === 0} onChange={() => setInds([])} label="All industries" count={countFor('ind', () => true)} />
                {industries.map(i => {
                  const n = countFor('ind', t => t.industry === i);
                  return <Check key={i} checked={inds.includes(i)} onChange={() => setInds(v => toggleIn(v, i))} label={i} count={n} />;
                })}
              </fieldset>
              <fieldset className={g.group}>
                <legend>Includes</legend>
                {INCLUDES.map(([id, label]) => (
                  <Check key={id} checked={incs.includes(id)} onChange={() => setIncs(v => toggleIn(v, id))} label={label} count={countFor('inc', t => t.inc.includes(id) && incs.filter(i => i !== id).every(i => t.inc.includes(i)))} />
                ))}
              </fieldset>
              <fieldset className={g.group}>
                <legend>Pages</legend>
                <Check checked={pages === 'one'} onChange={() => setPages(v => (v === 'one' ? '' : 'one'))} label="One page" count={countFor('pages', t => t.p <= 1)} />
                <Check checked={pages === 'multi'} onChange={() => setPages(v => (v === 'multi' ? '' : 'multi'))} label="Several pages" count={countFor('pages', t => t.p > 1)} />
              </fieldset>
              <fieldset className={g.group}>
                <legend>Yours</legend>
                <Check checked={favOnly} onChange={() => setFavOnly(v => !v)} label="Favourites" count={favs.filter(id => byId[id]).length} />
              </fieldset>
              <button type="button" className={g.panelDone} onClick={closePanel}>Show {list.length} {list.length === 1 ? 'result' : 'results'}</button>
            </aside>
          )}

          <div className={g.results}>
            {list.length === 0 && !withCreate
              ? <div className={s.empty}>No website templates match these filters. <button type="button" className={g.linkBtn} onClick={() => { clearAll(); setQ(''); }}>Clear the filters</button> or <a href={`${EDITOR}?starter=blank`}>start from scratch</a>.</div>
              : (
                <div className={g.grid}>
                  {withCreate && (
                    <a className={`${s.card} ${x.createCard}`} href={`${EDITOR}?starter=blank`} title="Start an empty website and add sections one by one">
                      <div className={`${s.cardPreview} ${x.createPreview}`}>
                        <span className={x.createMockSite} aria-hidden="true"><i /><i /><i /><i /></span>
                        <span className={x.createPlus} aria-hidden="true">+</span>
                      </div>
                      <div className={s.cardBody}>
                        <span className={s.cardCat}>Start from scratch</span>
                        <h3 className={s.cardTitle}>Create a new website</h3>
                        <span className={s.cardMeta}>An empty page: add a navbar, sections and a footer your way</span>
                      </div>
                    </a>
                  )}
                  {list.slice(0, shownCount - (withCreate ? 1 : 0)).map(t => {
                    const fav = favs.includes(t.id);
                    const page = `/website-builder/templates/${t.id}/`;
                    return (
                      <div key={t.id} className={`${s.card} ${g.card}`}>
                        {/* The whole top of the card opens the template page; the preview scrolls top to bottom while hovered */}
                        <a className={g.cardLink} href={page} title={t.blurb} onClick={() => remember(t.id)} {...panHandlers}>
                          <div className={`${s.cardPreview} ${g.preview}`}>
                            {isPremiumTemplate(t.id) && <PremiumBadge corner />}
                            <InViewImg className={`${s.cardImg} ${hs.scrollImg}`} src={`/images/website-templates/full/${t.id}.jpg`} alt={`${t.name} template preview`} />
                            <span className={g.pagesTag}>{t.p > 1 ? `${t.p} pages` : 'One page'}</span>
                          </div>
                          <div className={s.cardBody}>
                            <span className={s.cardCat}>{t.industry}</span>
                            <h3 className={s.cardTitle}>{t.name}</h3>
                            <span className={s.cardMeta}>{t.n} sections · Export HTML</span>
                          </div>
                        </a>
                        {/* Small tools on the card: favourite and live preview (new tab) */}
                        <div className={g.libTools}>
                          <button type="button" className={`${g.heart} ${g.libTool} ${fav ? g.heartOn : ''}`} onClick={() => toggleFav(t.id)} aria-pressed={fav} aria-label={fav ? `Remove ${t.name} from favourites` : `Add ${t.name} to favourites`} title={fav ? 'In your favourites' : 'Add to favourites'}>{HEART(fav)}</button>
                          <a className={`${g.heart} ${g.libTool}`} href={t.demo ? `${DEMOS}${t.id}/one-page/` : page} target={t.demo ? '_blank' : undefined} rel={t.demo ? 'noopener' : undefined} onClick={() => remember(t.id)} aria-label={`Live preview of ${t.name}`} title="Live preview">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            <LoadMore shown={Math.min(shownCount - (withCreate ? 1 : 0), list.length)} total={list.length} onLoadMore={() => setShownCount(n => n + PAGE)} />

            {recentShown.length > 0 && (
              <div className={g.recent}>
                <span className={g.recentLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>
                  Recently viewed
                </span>
                {recentShown.map(t => <a key={t.id} className={g.recentChip} href={`/website-builder/templates/${t.id}/`}>{t.name}</a>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
