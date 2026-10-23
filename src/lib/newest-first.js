/* Template galleries list the newest templates first. Newest = latest `created` date, and
   among templates created the same day, the one added later to its registry list. So a new
   template only needs to be added at the END of its list (and carry a `created` date). */
export function newestFirst(list) {
  return list
    .map((t, i) => [t, i])
    .sort((a, b) => String(b[0].created || '').localeCompare(String(a[0].created || '')) || b[1] - a[1])
    .map(([t]) => t);
}
