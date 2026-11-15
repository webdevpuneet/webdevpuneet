/* Gallery filters in the address bar (?category=a,b&q=...), shared by the template galleries (email, social, website
   section and website templates). The URL is read once after mount (so the server-rendered page stays the same for
   everyone) and then kept in step with replaceState: no navigation, no re-render, and back/refresh/shared links keep
   the filters. The snippet gallery does the same through the router (UiSnippetsGallery). */

export const slugOf = text => String(text).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/* The comma-separated list in ?name=a,b as an array ([] when absent) */
export function readList(name) {
  try { return (new URLSearchParams(window.location.search).get(name) || '').split(',').map(v => v.trim()).filter(Boolean); } catch { return []; }
}

export function readText(name) {
  try { return new URLSearchParams(window.location.search).get(name) || ''; } catch { return ''; }
}

/* Sets (or removes, for an empty value) several params at once and leaves the path and #hash alone.
   values: { name: string | string[] } */
export function writeParams(values) {
  try {
    const u = new URL(window.location.href);
    for (const [name, v] of Object.entries(values)) {
      const text = Array.isArray(v) ? v.join(',') : String(v || '');
      if (text) u.searchParams.set(name, text); else u.searchParams.delete(name);
    }
    const next = u.pathname + u.search + u.hash;
    if (next !== window.location.pathname + window.location.search + window.location.hash) window.history.replaceState(window.history.state, '', next);
  } catch { /* the URL stays as it is */ }
}
