'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import InViewImg from '@/components/InViewImg';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// The lightweight index + categories, not UiSnippetsTool/snippets (which bundles every snippet's source).
import { VISIBLE_SNIPPET_INDEX as SNIPPETS } from '@/lib/snippet-index';
import { CATEGORIES } from '@/components/UiSnippetsTool/categories';
import { SNIPPET_COUNT } from '@/lib/snippet-count';
import { publishedTags, tagsForSnippetId, TAG_BY_ID } from '@/lib/snippet-tags';
import useFilterPanel from '@/lib/use-filter-panel';
import { useBookmarks, toggleBookmark, BOOKMARKED_HREF } from '@/lib/snippet-bookmarks';
import { PremiumBadge } from '@/components/PremiumGate';
import { isPremiumGameSnippet } from '@/lib/premium';
import s from './styles.module.css';
import g from '../WebsiteBuilder/TemplateGallery.module.css';

const PER_PAGE = 12; // 3 rows of 4

// Same localStorage keys the Sidebar's own Library tab reads/writes (see
// src/components/Sidebar/index.js) for the category and tag, so the two chip
// UIs show the same selection. Search is NOT shared: the sidebar's search box
// and this page's search box filter independently. The sidebar never remounts on
// a client-side navigation (it lives in the root layout, outside the page
// content), so a plain localStorage write alone wouldn't reach it while
// already on screen — a custom event on `window` is what makes the sidebar
// react live, in the same tab, the instant either side changes.
const LIB_CATEGORY_KEY = 'uis_sidebar_category';
const LIB_TAG_KEY = 'uis_sidebar_tag';
const SYNC_EVENT = 'uis-filters-changed';

// Tags big enough to have their own page, largest first — the same set the
// /ui-snippets/tag/ routes are generated from, so a chip never links to a 404.
const TAG_LINKS = publishedTags(SNIPPETS);

// Browse panel — real, crawlable <a href> links to every category page and every
// tag page (not a JS filter). The active category/tag sorts first in its column so
// it's visible in the collapsed strip; hovering reveals both columns in full as an
// overlay. Shared by the gallery pages and the snippet page (above Related Snippets).
// `highlightAll`: mark "All categories" / "All tags" current when nothing is active
// (gallery behaviour); the snippet page turns it off — it isn't an "all" view.
// "Bookmarked" is not a category page: in the gallery (`onBookmarked` given) it is a chip that filters the grid
// on the client; elsewhere it is a link to the gallery that opens on that view once.
export function BrowsePanel({ activeCategory = 'all', activeTag = null, highlightAll = true, bookmarkedActive = false, onBookmarked }) {
  const bookmarkCount = useBookmarks().length;
  const bookmarkLabel = `Bookmarked${bookmarkCount ? ` (${bookmarkCount})` : ''}`;
  return (
    <div className={s.browseWrap}>
      <div className={s.browseCols}>
        <div className={s.browseCol}>
          <span className={s.browseColLabel}>Categories</span>
          <div className={s.browseChips}>
            {onBookmarked
              ? <button type="button" className={s.browseChip} style={{ cursor: 'pointer' }} aria-pressed={bookmarkedActive} aria-current={bookmarkedActive ? 'true' : undefined} onClick={onBookmarked}>{bookmarkLabel}</button>
              : <a href={BOOKMARKED_HREF} className={s.browseChip}>{bookmarkLabel}</a>}
            {CATEGORIES.filter(cat => !cat.devOnly)
              .slice()
              .sort((a, b) => (a.id === activeCategory ? -1 : b.id === activeCategory ? 1 : 0))
              .map(cat => {
                const current = !activeTag && !bookmarkedActive && activeCategory === cat.id && (cat.id !== 'all' || highlightAll);
                return (
                  <a
                    key={cat.id}
                    href={cat.id === 'all' ? '/ui-snippets/' : `/ui-snippets/${cat.id}/`}
                    className={s.browseChip}
                    aria-current={current ? 'true' : undefined}
                  >
                    {cat.label}
                  </a>
                );
              })}
          </div>
        </div>
        <div className={s.browseCol}>
          <span className={s.browseColLabel}>Tags</span>
          <div className={s.browseChips}>
            <a
              href="/ui-snippets/"
              className={s.browseChip}
              aria-current={!activeTag && highlightAll ? 'true' : undefined}
            >
              All tags
            </a>
            {TAG_LINKS.slice()
              .sort((a, b) => (a.id === activeTag ? -1 : b.id === activeTag ? 1 : 0))
              .map(tag => (
                <a
                  key={tag.id}
                  href={`/ui-snippets/tag/${tag.id}/`}
                  className={s.browseChip}
                  aria-current={tag.id === activeTag ? 'true' : undefined}
                >
                  {tag.label}
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Check({ checked, onChange, label, count }) {
  return (
    <label className={g.check}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={g.checkLabel}>{label}</span>
      {count != null && <span className={g.checkCount}>{count}</span>}
    </label>
  );
}
const TAGS_SHOWN = 12; // the biggest tags first; "Show all" lists the rest

// "Load more" under a snippet grid: each click appends the next page below the
// cards already shown (nothing is replaced). With `href` it renders a real link
// to that page (?page=N, which loads pages 1..N) so crawlers can still reach
// older snippets; a plain click is intercepted and loads in place instead.
export function LoadMore({ shown, total, onLoadMore, href }) {
  if (shown >= total) return null;
  const label = (
    <>
      Load more
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
    </>
  );
  function onClick(e) {
    // Let the browser handle new-tab / new-window clicks on the link.
    if (href && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1)) return;
    e.preventDefault();
    onLoadMore();
  }
  const pct = Math.min(100, Math.round((shown / total) * 100));
  return (
    <div className={s.more}>
      {href
        ? <a className={s.moreBtn} href={href} onClick={onClick}>{label}</a>
        : <button type="button" className={s.moreBtn} onClick={onClick}>{label}</button>}
      <div className={s.moreMeta}>
        <div className={s.moreBar} aria-hidden="true">
          <div className={s.moreBarFill} style={{ width: `${pct}%` }} />
        </div>
        <span>Showing {shown.toLocaleString('en-US')} of {total.toLocaleString('en-US')}</span>
      </div>
    </div>
  );
}

export default function UiSnippetsGallery({ initialCategory = 'all', initialTag = null }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Read the initial search query from the URL first (?q=...), so a search
  // survives a refresh or a shared link the same way ?page=N already does —
  // falling back to whatever the sidebar last had saved, so arriving here
  // from a plain (query-less) link still picks up an in-progress sidebar
  // search instead of starting blank.
  const [search, setSearch] = useState(() => searchParams.get('q') || '');
  const [category, setCategory] = useState(initialCategory);
  // How many pages are loaded, minus one: "Load more" appends the next page
  // below the current cards. Seeded from ?page=N (1-based) so an old paged link
  // or the crawlable Load-more href opens with pages 1..N already loaded.
  const [page, setPage] = useState(() => Math.max(0, (parseInt(searchParams.get('page'), 10) || 1) - 1));
  const [sortOrder, setSortOrder] = useState('newest');
  // The main gallery (/ui-snippets/) is a filterable library: categories and tags as checkboxes with counts, active
  // filters as chips, Ctrl/⌘ K for search. Category and tag pages keep their plain layout (they are their own filter).
  const isMain = !initialTag && initialCategory === 'all';
  const [cats, setCats] = useState([]);
  const [tagSel, setTagSel] = useState([]);
  const { open: panelOpen, auto: panelAuto, toggle: togglePanel, close: closePanel } = useFilterPanel();
  const [allTags, setAllTags] = useState(false);
  const [mac, setMac] = useState(false);
  const searchRef = useRef(null);
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || ''));
  }, []);
  useEffect(() => {
    if (!isMain) return undefined;
    const onKey = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMain]);
  const gridRef = useRef(null);
  // Bookmarked view: /ui-snippets/?filter=bookmarked (the URL is the source of truth, so it survives a refresh and a
  // shared link). Without ?filter the gallery shows every snippet. Only on the plain gallery: a category or tag page
  // is its own filter.
  const bookmarks = useBookmarks();
  const canBookmarkView = !initialTag && initialCategory === 'all';
  const bookmarkedOn = canBookmarkView && searchParams.get('filter') === 'bookmarked';

  // Reflect the active page (?page=N, omitted on page 1) and/or search query
  // (?q=..., omitted when empty) in the URL — both real query params, not
  // just local state, so pagination on a search's page 2+ keeps the search
  // term instead of losing it (the pagination links below are real <a href>
  // navigations, so whatever isn't in the URL doesn't survive a click).
  function syncToUrl({ page: p, q, filter } = {}) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (filter !== undefined) {
      if (filter) params.set('filter', filter);
      else params.delete('filter');
    }
    if (p !== undefined) {
      if (p <= 0) params.delete('page');
      else params.set('page', String(p + 1));
    }
    if (q !== undefined) {
      if (!q) params.delete('q');
      else params.set('q', q);
    }
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }

  // Real crawlable href for a page index — mirrors syncToUrl's ?page=N scheme
  // (page 1 stays clean) so pagination links are followable by search engines.
  // Cloning searchParams means whatever ?q=... is already in the URL (kept in
  // sync by syncToUrl as the user types) rides along automatically.
  function pageHref(p) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (p <= 0) params.delete('page');
    else params.set('page', String(p + 1));
    const qs = params.toString();
    return `${pathname}${qs ? `?${qs}` : ''}`;
  }

  // Restore sort preference after mount
  useEffect(() => {
    try { const saved = localStorage.getItem('uis_sort'); if (saved) setSortOrder(saved); } catch {}
  }, []);

  // This page's category/tag come from the route (real <a href> navigation,
  // not client filter state — see the browse chips below), so the URL is
  // already the source of truth the moment this component renders. Writing
  // that same category/tag into the sidebar's own saved filter keeps its
  // independent chip UI showing the same selection, and the sync event is
  // what makes it update live — the sidebar lives in the root layout and
  // never remounts on this kind of navigation, so it wouldn't otherwise
  // notice a plain localStorage write while already on screen.
  useEffect(() => {
    try {
      if (initialTag) {
        localStorage.setItem(LIB_TAG_KEY, initialTag);
        localStorage.removeItem(LIB_CATEGORY_KEY);
      } else {
        localStorage.setItem(LIB_CATEGORY_KEY, initialCategory);
        localStorage.removeItem(LIB_TAG_KEY);
      }
    } catch {}
    window.dispatchEvent(new Event(SYNC_EVENT));
  }, [initialCategory, initialTag]);

  // On a tag page the tag is the filter — the category chips below stay as
  // navigation to the category pages rather than narrowing the tag further.
  // `skip` leaves one facet out, so the count beside each of its options shows what picking it would give
  const q = search.trim().toLowerCase();
  const passes = (sn, skip) => {
    if (initialTag && !tagsForSnippetId(sn.id).includes(initialTag)) return false;
    if (!initialTag && category !== 'all' && sn.category !== category) return false;
    if (q && !sn.title.toLowerCase().includes(q) && !sn.category.toLowerCase().includes(q)) return false;
    if (bookmarkedOn && !bookmarks.includes(sn.id)) return false;
    if (isMain && skip !== 'cat' && cats.length && !cats.includes(sn.category)) return false;
    if (isMain && skip !== 'tag' && tagSel.length && !tagSel.some(t => tagsForSnippetId(sn.id).includes(t))) return false;
    return true;
  };
  const filtered = useMemo(() => {
    const list = SNIPPETS.filter(sn => passes(sn));
    if (sortOrder === 'az') return [...list].sort((a, b) => a.title.localeCompare(b.title));
    return sortOrder === 'newest' ? [...list].reverse() : list;
  }, [q, category, sortOrder, initialTag, bookmarkedOn, bookmarks, cats, tagSel]); // eslint-disable-line react-hooks/exhaustive-deps
  const catOptions = useMemo(() => (isMain ? CATEGORIES.filter(c => c.id !== 'all' && !c.devOnly).map(c => ({ ...c, n: SNIPPETS.filter(sn => sn.category === c.id && passes(sn, 'cat')).length })) : []),
    [isMain, q, bookmarkedOn, bookmarks, tagSel]); // eslint-disable-line react-hooks/exhaustive-deps
  const tagOptions = useMemo(() => (isMain ? TAG_LINKS.map(t => ({ ...t, n: SNIPPETS.filter(sn => tagsForSnippetId(sn.id).includes(t.id) && passes(sn, 'tag')).length })) : []),
    [isMain, q, bookmarkedOn, bookmarks, cats]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeTag = initialTag ? TAG_BY_ID.get(initialTag) : null;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown = filtered.slice(0, (page + 1) * PER_PAGE);

  // Keep the loaded count in range if the filtered set shrinks (e.g. sort/search change)
  useEffect(() => {
    if (page > totalPages - 1) setPage(totalPages - 1);
  }, [totalPages, page]);

  // Appends the next page. The URL is left alone: a query string would unmount
  // the IndexOnly ad/SEO content below the grid mid-scroll.
  function loadMore() {
    setPage(p => Math.min(p + 1, totalPages - 1));
  }

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);
    setPage(0);
    syncToUrl({ page: 0, q: value });
  }

  const toggleBookmarkedView = () => { setPage(0); syncToUrl({ page: 0, filter: bookmarkedOn ? '' : 'bookmarked' }); };
  const setSort = v => { setSortOrder(v); try { localStorage.setItem('uis_sort', v); } catch {} };

  const results = filtered.length === 0 ? (
    <div className={s.empty}>
      {search
        ? <>No snippets match &ldquo;{search}&rdquo;</>
        : bookmarkedOn
          ? <>No bookmarked snippets yet — click the bookmark icon on any snippet to save it here.</>
          : activeTag
          ? <>No snippets tagged {activeTag.label} yet — check back soon.</>
          : cats.length || tagSel.length
          ? <>No snippets match these filters.</>
          : <>No snippets in this category yet — check back soon.</>}
    </div>
  ) : (
    <>
      <div className={s.grid} ref={gridRef}>
        {shown.map((sn) => (
          <article key={sn.id} className={s.card}>
            <div className={s.previewWrap}>
              <InViewImg className={s.preview} src={`/images/ui-snippets/previews/${sn.id}.png`} alt="" />
              {isPremiumGameSnippet(sn) && <PremiumBadge corner kind="game" />}
              <button
                type="button"
                aria-pressed={bookmarks.includes(sn.id)}
                aria-label={bookmarks.includes(sn.id) ? `Remove bookmark: ${sn.title}` : `Bookmark: ${sn.title}`}
                title={bookmarks.includes(sn.id) ? 'Remove from bookmarks' : 'Add to bookmarks'}
                onClick={() => toggleBookmark(sn.id)}
                className={`${s.bookmarkBtn} ${bookmarks.includes(sn.id) ? s.bookmarkOn : ''}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill={bookmarks.includes(sn.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
              </button>
            </div>
            <div className={s.cardBody}>
              <h3 className={s.cardTitle}>
                <a href={`/ui-snippets/${sn.id}/`} className={s.cardLink}>{sn.title}</a>
              </h3>
              <span className={s.catBadge}>{sn.category}</span>
            </div>
          </article>
        ))}
      </div>
      <LoadMore shown={shown.length} total={filtered.length} onLoadMore={loadMore} href={pageHref(page + 1)} />
    </>
  );

  // ── Main gallery: the filterable library ──
  if (isMain) {
    const chips = [
      ...cats.map(id => ({ key: `c:${id}`, label: CATEGORIES.find(c => c.id === id)?.label || id, clear: () => setCats(v => v.filter(x => x !== id)) })),
      ...tagSel.map(id => ({ key: `t:${id}`, label: TAG_BY_ID.get(id)?.label || id, clear: () => setTagSel(v => v.filter(x => x !== id)) })),
      ...(bookmarkedOn ? [{ key: 'bm', label: 'Bookmarked', clear: toggleBookmarkedView }] : []),
    ];
    const clearAll = () => { setCats([]); setTagSel([]); if (bookmarkedOn) toggleBookmarkedView(); };
    const tagsList = allTags ? tagOptions : tagOptions.slice(0, TAGS_SHOWN);
    return (
      <div className={s.wrap}>
        <div className={s.layout}>
          <div className={s.main}>
            <div className={g.toolbar}>
              <div className={g.searchBox}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
                <input ref={searchRef} type="search" value={search} onChange={handleSearch} placeholder={`Search ${SNIPPET_COUNT} snippets`} aria-label="Search UI snippets" />
                <kbd className={g.kbd} aria-hidden="true">{mac ? '⌘ K' : 'Ctrl K'}</kbd>
              </div>
              <button type="button" className={`${g.toolBtn} ${panelOpen ? g.toolBtnOn : ''}`} onClick={togglePanel} aria-expanded={panelOpen} aria-controls="uis-filters">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="17" x2="20" y2="17" /><circle cx="9" cy="7" r="2.4" fill="var(--surface)" /><circle cx="15" cy="17" r="2.4" fill="var(--surface)" /></svg>
                Filters{chips.length > 0 && <span className={g.toolCount}>{chips.length}</span>}
              </button>
              <label className={g.sortWrap}>
                <select className={g.sort} value={sortOrder} onChange={ev => setSort(ev.target.value)} aria-label="Sort snippets">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="az">Name A–Z</option>
                </select>
              </label>
            </div>

            <div className={g.chipsRow}>
              <div className={g.chips}>
                {chips.map(c => <button key={c.key} type="button" className={g.chip} onClick={c.clear} aria-label={`Remove filter: ${c.label}`}>{c.label} <span aria-hidden="true">×</span></button>)}
                {chips.length > 0 && <button type="button" className={g.clearAll} onClick={clearAll}>Clear all</button>}
              </div>
              <span className={g.resultCount}>{filtered.length.toLocaleString('en-US')} {filtered.length === 1 ? 'result' : 'results'}</span>
            </div>

            <div className={`${g.layout} ${panelOpen ? '' : g.layoutClosed}`}>
              {panelOpen && (
                <aside id="uis-filters" className={`${g.panel} ${panelAuto ? g.panelAuto : ''}`} aria-label="Filter snippets">
                  <fieldset className={g.group}>
                    <legend>Yours</legend>
                    <Check checked={bookmarkedOn} onChange={toggleBookmarkedView} label="Bookmarked" count={bookmarks.length} />
                  </fieldset>
                  <fieldset className={g.group}>
                    <legend>Category</legend>
                    {catOptions.map(c => (c.n || cats.includes(c.id)
                      ? <Check key={c.id} checked={cats.includes(c.id)} onChange={() => { setPage(0); setCats(v => (v.includes(c.id) ? v.filter(x => x !== c.id) : [...v, c.id])); }} label={c.label} count={c.n} />
                      : null))}
                  </fieldset>
                  <fieldset className={g.group}>
                    <legend>Tags</legend>
                    {tagsList.map(t => (t.n || tagSel.includes(t.id)
                      ? <Check key={t.id} checked={tagSel.includes(t.id)} onChange={() => { setPage(0); setTagSel(v => (v.includes(t.id) ? v.filter(x => x !== t.id) : [...v, t.id])); }} label={t.label} count={t.n} />
                      : null))}
                    {tagOptions.length > TAGS_SHOWN && (
                      <button type="button" className={g.linkBtn} style={{ alignSelf: 'flex-start', margin: '4px 6px 0', fontSize: 12 }} onClick={() => setAllTags(v => !v)}>
                        {allTags ? 'Show fewer tags' : `Show all ${tagOptions.length} tags`}
                      </button>
                    )}
                  </fieldset>
                  <button type="button" className={g.panelDone} onClick={closePanel}>Show {filtered.length.toLocaleString('en-US')} {filtered.length === 1 ? 'result' : 'results'}</button>
                </aside>
              )}
              <div className={g.results}>{results}</div>
            </div>

            {/* Every category and tag page is linked from the tables in the SEO section below (app/ui-snippets/page.js) */}
          </div>
        </div>
      </div>
    );
  }

  // ── Category and tag pages: the plain layout ──
  return (
    <div className={s.wrap}>
      <div className={s.layout}>
      <div className={s.main}>
      {/* Page title: the category or tag being browsed, with how many snippets it holds */}
      <h2 className={s.pageTitle}>
        {activeTag ? activeTag.label : (CATEGORIES.find(c => c.id === category)?.label || 'All')}
        {' '}snippets
        <span className={s.pageTitleCount}>{filtered.length.toLocaleString('en-US')}</span>
      </h2>
      <div className={s.controls}>
        <div className={s.searchRow}>
          <div className={s.searchWrap}>
            <svg className={s.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className={s.searchInput}
              type="text"
              placeholder={`Search ${SNIPPET_COUNT} snippets…`}
              value={search}
              onChange={handleSearch}
            />
            {search && (
              <button className={s.clearBtn} onClick={() => { setSearch(''); setPage(0); syncToUrl({ page: 0, q: '' }); }} aria-label="Clear search">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
          <button
            className={s.gallerySortBtn}
            onClick={() => setSort(sortOrder === 'newest' ? 'oldest' : 'newest')}
            title={sortOrder === 'newest' ? 'Newest first — click for oldest first' : 'Oldest first — click for newest first'}
            aria-label={sortOrder === 'newest' ? 'Sort: newest first' : 'Sort: oldest first'}
          >
            {sortOrder === 'newest'
              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="20" x2="12" y2="4"/><polyline points="5 11 12 4 19 11"/><line x1="7" y1="20" x2="17" y2="20"/></svg>
              : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="4" x2="12" y2="20"/><polyline points="5 13 12 20 19 13"/><line x1="7" y1="4" x2="17" y2="4"/></svg>
            }
          </button>
        </div>
      </div>

      {results}
      </div>
      </div>
    </div>
  );
}
