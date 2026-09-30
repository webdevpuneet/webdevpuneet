import { VISIBLE_SNIPPETS } from '@/components/UiSnippetsTool/snippets';

// Newest-first, matching the gallery's default sort order.
const NEWEST_FIRST_SNIPPETS = [...VISIBLE_SNIPPETS].reverse();

// Ranked once on the server (not shipped as client JS) so the related-snippet
// links land in the raw HTML a crawler fetches, the same reasoning that keeps
// the Source Code block server-rendered rather than client-only.
//
// Related = same category, full stop — no tag matching. The current snippet
// is included (same as browsing the category in the sidebar or gallery) so
// the grid can show it in place rather than treat it as a special case.
// `limit` caps the payload sent to the client — nobody pages through hundreds
// of related snippets, so there is no reason to ship metadata for all of them.
export function getRelatedSnippets(category, limit = 60) {
  const pool = NEWEST_FIRST_SNIPPETS.filter(sn => sn.category === category);
  return {
    items: pool.slice(0, limit).map(sn => ({ id: sn.id, title: sn.title })),
    total: pool.length,
  };
}

// Where the current snippet sits within its own category (same order as
// getRelatedSnippets' pool, i.e. the gallery's default newest-first order),
// plus its immediate neighbors — lets a caller render "6 of 61 in Buttons"
// and Prev/Next links that step through the category one snippet at a time,
// independent of the (unrelated) related-list pagination.
export function getCategoryNav(category, currentId) {
  const list = NEWEST_FIRST_SNIPPETS.filter(sn => sn.category === category);
  const idx = list.findIndex(sn => sn.id === currentId);
  return {
    position: idx + 1,
    total: list.length,
    prev: idx > 0 ? { id: list[idx - 1].id, title: list[idx - 1].title } : null,
    next: idx >= 0 && idx < list.length - 1 ? { id: list[idx + 1].id, title: list[idx + 1].title } : null,
  };
}

// Newest snippets across the whole library, for the home page's "Latest UI
// Snippets" strip. Server-side, plain data - see HomeSnippetsCarousel.
export function getLatestSnippets(limit = 60) {
  return {
    items: NEWEST_FIRST_SNIPPETS.slice(0, limit).map(sn => ({ id: sn.id, title: sn.title })),
    total: NEWEST_FIRST_SNIPPETS.length,
  };
}
