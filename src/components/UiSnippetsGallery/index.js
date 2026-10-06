'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// The lightweight index + categories, not UiSnippetsTool/snippets (which bundles every snippet's source).
import { VISIBLE_SNIPPET_INDEX as SNIPPETS } from '@/lib/snippet-index';
import { CATEGORIES } from '@/components/UiSnippetsTool/categories';
import { SNIPPET_COUNT } from '@/lib/snippet-count';
import { publishedTags, tagsForSnippetId, TAG_BY_ID } from '@/lib/snippet-tags';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import s from './styles.module.css';

const PER_PAGE = 9;

// Same localStorage keys the Sidebar's own Library tab reads/writes (see
// src/components/Sidebar/index.js) — using identical keys is what makes the
// two independent search/category/tag states (this gallery page's and the
// persistent sidebar's) actually the same shared state instead of two
// separate ones that happen to look similar. The sidebar never remounts on
// a client-side navigation (it lives in the root layout, outside the page
// content), so a plain localStorage write alone wouldn't reach it while
// already on screen — a custom event on `window` is what makes the sidebar
// react live, in the same tab, the instant either side changes.
const LIB_QUERY_KEY = 'uis_sidebar_query';
const LIB_CATEGORY_KEY = 'uis_sidebar_category';
const LIB_TAG_KEY = 'uis_sidebar_tag';
const SYNC_EVENT = 'uis-filters-changed';

function syncSearchToSidebar(value) {
  try {
    if (value) localStorage.setItem(LIB_QUERY_KEY, value);
    else localStorage.removeItem(LIB_QUERY_KEY);
  } catch {}
  window.dispatchEvent(new Event(SYNC_EVENT));
}

// Tags big enough to have their own page, largest first — the same set the
// /ui-snippets/tag/ routes are generated from, so a chip never links to a 404.
const TAG_LINKS = publishedTags(SNIPPETS);

// Browse panel — real, crawlable <a href> links to every category page and every
// tag page (not a JS filter). The active category/tag sorts first in its column so
// it's visible in the collapsed strip; hovering reveals both columns in full as an
// overlay. Shared by the gallery pages and the snippet page (above Related Snippets).
// `highlightAll`: mark "All categories" / "All tags" current when nothing is active
// (gallery behaviour); the snippet page turns it off — it isn't an "all" view.
export function BrowsePanel({ activeCategory = 'all', activeTag = null, highlightAll = true }) {
  return (
    <div className={s.browseWrap}>
      <div className={s.browseCols}>
        <div className={s.browseCol}>
          <span className={s.browseColLabel}>Categories</span>
          <div className={s.browseChips}>
            {CATEGORIES.filter(cat => !cat.devOnly)
              .slice()
              .sort((a, b) => (a.id === activeCategory ? -1 : b.id === activeCategory ? 1 : 0))
              .map(cat => {
                const current = !activeTag && activeCategory === cat.id && (cat.id !== 'all' || highlightAll);
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
  const [search, setSearch] = useState(() => {
    const fromUrl = searchParams.get('q');
    if (fromUrl) return fromUrl;
    try { return localStorage.getItem(LIB_QUERY_KEY) || ''; } catch { return ''; }
  });
  const [category, setCategory] = useState(initialCategory);
  // How many pages are loaded, minus one: "Load more" appends the next page
  // below the current cards. Seeded from ?page=N (1-based) so an old paged link
  // or the crawlable Load-more href opens with pages 1..N already loaded.
  const [page, setPage] = useState(() => Math.max(0, (parseInt(searchParams.get('page'), 10) || 1) - 1));
  const [sortOrder, setSortOrder] = useState('newest');
  const gridRef = useRef(null);

  // Reflect the active page (?page=N, omitted on page 1) and/or search query
  // (?q=..., omitted when empty) in the URL — both real query params, not
  // just local state, so pagination on a search's page 2+ keeps the search
  // term instead of losing it (the pagination links below are real <a href>
  // navigations, so whatever isn't in the URL doesn't survive a click).
  function syncToUrl({ page: p, q } = {}) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
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

  // Live search sync FROM the sidebar: typing in the sidebar's own search box
  // doesn't navigate or remount this component, so this listens for the same
  // sync event to pick up that change without a reload — the mirror image of
  // syncSearchToSidebar below, which pushes this page's own typing outward.
  useEffect(() => {
    function onSync() {
      try {
        const saved = localStorage.getItem(LIB_QUERY_KEY) || '';
        setSearch(current => (current === saved ? current : saved));
      } catch {}
    }
    window.addEventListener(SYNC_EVENT, onSync);
    return () => window.removeEventListener(SYNC_EVENT, onSync);
  }, []);

  // On a tag page the tag is the filter — the category chips below stay as
  // navigation to the category pages rather than narrowing the tag further.
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = SNIPPETS.filter(sn => {
      const matchTag = !initialTag || tagsForSnippetId(sn.id).includes(initialTag);
      const matchCat = initialTag || category === 'all' || sn.category === category;
      const matchSearch = !q || sn.title.toLowerCase().includes(q) || sn.category.toLowerCase().includes(q);
      return matchTag && matchCat && matchSearch;
    });
    return sortOrder === 'newest' ? [...list].reverse() : list;
  }, [search, category, sortOrder, initialTag]);

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
    syncSearchToSidebar(value);
  }

  return (
    <div className={s.wrap}>
      <div className={s.layout}>
      <div className={s.main}>
      {/* Leaderboard ad (max 90px) above the search box */}
      <PlaygroundTopAd className={s.topAd} />
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
              <button className={s.clearBtn} onClick={() => { setSearch(''); setPage(0); syncToUrl({ page: 0, q: '' }); syncSearchToSidebar(''); }} aria-label="Clear search">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
          <button
            className={s.gallerySortBtn}
            onClick={() => setSortOrder(o => {
              const next = o === 'newest' ? 'oldest' : 'newest';
              try { localStorage.setItem('uis_sort', next); } catch {}
              return next;
            })}
            title={sortOrder === 'newest' ? 'Newest first — click for oldest first' : 'Oldest first — click for newest first'}
            aria-label={sortOrder === 'newest' ? 'Sort: newest first' : 'Sort: oldest first'}
          >
            {sortOrder === 'newest'
              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="20" x2="12" y2="4"/><polyline points="5 11 12 4 19 11"/><line x1="7" y1="20" x2="17" y2="20"/></svg>
              : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="4" x2="12" y2="20"/><polyline points="5 13 12 20 19 13"/><line x1="7" y1="4" x2="17" y2="4"/></svg>
            }
          </button>
        </div>

        <BrowsePanel activeCategory={category} activeTag={initialTag} />
      </div>

      {filtered.length === 0 ? (
        <div className={s.empty}>
          {search
            ? <>No snippets match &ldquo;{search}&rdquo;</>
            : activeTag
              ? <>No snippets tagged {activeTag.label} yet — check back soon.</>
              : <>No snippets in this category yet — check back soon.</>}
        </div>
      ) : (
        <>
          <div className={s.grid} ref={gridRef}>
            {shown.map((sn) => (
              <article key={sn.id} className={s.card}>
                <div className={s.previewWrap}>
                  <img className={s.preview} src={`/images/ui-snippets/previews/${sn.id}.png`} alt="" loading="lazy" />
                </div>
                <div className={s.cardBody}>
                  <h3 className={s.cardTitle}>
                    <a
                      href={`/ui-snippets/${sn.id}/`}
                      className={s.cardLink}
                    >
                      {sn.title}
                    </a>
                  </h3>
                  <span className={s.catBadge}>{sn.category}</span>
                </div>
              </article>
            ))}
          </div>

          <LoadMore
            shown={shown.length}
            total={filtered.length}
            onLoadMore={loadMore}
            href={pageHref(page + 1)}
          />
        </>
      )}
      </div>
      </div>
    </div>
  );
}
