/* Template galleries list the freshest templates first. Freshest = the later of a template's `updated` and `created`
   dates, so both a brand-new template and an edited one rise to the top. Among templates with the same date, the one
   added later to its registry list comes first. So a new template only needs to be added at the END of its list with a
   `created` date, and when you change an existing template, bump its `updated` date to today. */
export const freshDate = t => { const c = String(t.created || ''), u = String(t.updated || ''); return u > c ? u : c; };
export function newestFirst(list) {
  return list
    .map((t, i) => [t, i])
    .sort((a, b) => freshDate(b[0]).localeCompare(freshDate(a[0])) || b[1] - a[1])
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
