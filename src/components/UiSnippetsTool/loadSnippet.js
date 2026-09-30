// Loads ONE library snippet's full object (html/css/js/cdnUrls/seo) on demand.
//
// Browser code must never import ./snippets.js — it bundles all ~2,000
// snippets' source into a single ~33 MB chunk that every page downloaded.
// The template-literal import below makes webpack emit each file in
// ./snippets/ as its own small lazy chunk, so a page fetches only the snippet
// it shows. File names are the snippet ids (checked when a snippet is added).
//
// Lists, titles and categories come from @/lib/snippet-index instead.

const pending = new Map();   // id -> Promise<snippet | null>
const loaded = new Map();    // id -> snippet (resolved)

export function loadSnippet(id) {
  if (!id) return Promise.resolve(null);
  if (loaded.has(id)) return Promise.resolve(loaded.get(id));
  if (!pending.has(id)) {
    const p = import(`./snippets/${id}.js`)
      .then(mod => {
        const sn = mod.default || null;
        if (sn) loaded.set(id, sn);
        return sn;
      })
      .catch(() => null)
      .finally(() => pending.delete(id));   // a failed load can be retried
    pending.set(id, p);
  }
  return pending.get(id);
}

/** The snippet if it has already been loaded, else undefined (synchronous). */
export function getLoadedSnippet(id) {
  return loaded.get(id);
}
