/* Template galleries list the newest templates first. Newest = latest `created` date, and
   among templates created the same day, the one added later to its registry list. So a new
   template only needs to be added at the END of its list (and carry a `created` date). */
export function newestFirst(list) {
  return list
    .map((t, i) => [t, i])
    .sort((a, b) => String(b[0].created || '').localeCompare(String(a[0].created || '')) || b[1] - a[1])
    .map(([t]) => t);
}

/* UI snippets: "newest" means freshest. The most recently updated snippet (latest `lastmod`) comes first, and among
   snippets updated on the same day the one added later to the library comes first. `list` is in library order (oldest
   first). Rows from snippet-index.js / snippet-search-index.js carry a precomputed rank `r` (0 = freshest), so browser code
   does not need every snippet's lastmod; full snippet objects are ranked from their own `lastmod`. */
export function freshestFirst(list) {
  if (list.length && list[0].r !== undefined) return [...list].sort((a, b) => a.r - b.r);
  return list
    .map((t, i) => [t, i])
    .sort((a, b) => String(b[0].lastmod || '').localeCompare(String(a[0].lastmod || '')) || b[1] - a[1])
    .map(([t]) => t);
}
