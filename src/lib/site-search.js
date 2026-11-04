/* Site-wide content search for the sidebar: UI snippets and the four template libraries (website, section, email and
   social post templates), built from the small generated index files (names and categories only, no code) and loaded
   on the first search. Every word of the query must appear in the name, the category or the library name. */

const LIBS = [
  { key: 'section', lib: 'Section templates', base: '/website-section-templates/' },
  { key: 'email', lib: 'Email templates', base: '/email-templates/' },
  { key: 'social', lib: 'Social posts', base: '/social-post-templates/' },
];

export async function loadContentIndex() {
  const [snip, nav, sites] = await Promise.all([
    import('@/lib/snippet-search-index'),
    import('@/data/template-nav.json'),
    import('@/data/website-templates-nav.json'),
  ]);
  const navData = nav.default || nav;
  const out = (snip.SNIPPET_SEARCH_INDEX || []).map(sn => ({ lib: 'UI snippets', name: sn.title, cat: sn.category.replace(/-/g, ' '), href: `/ui-snippets/${sn.id}/`, thumb: `/images/ui-snippets/previews/${sn.id}.png` }));
  for (const w of sites.default || sites) out.push({ lib: 'Website templates', name: w.name, cat: w.industry, href: `/website-builder/templates/${w.id}/`, thumb: `/images/website-templates/thumb/${w.id}.jpg` });
  for (const { key, lib, base } of LIBS) {
    for (const c of navData[key]?.categories || []) for (const it of c.items) out.push({ lib, name: it.name, cat: c.label, href: `${base}${it.id}/` });
  }
  return out.map(t => ({ ...t, hay: `${t.name} ${t.cat} ${t.lib}`.toLowerCase(), lname: t.name.toLowerCase() }));
}

export const CONTENT_GROUPS = ['Website templates', 'Section templates', 'Email templates', 'Social posts', 'UI snippets'];
/* Icon (a /icons file) and the page that lists the whole library, for each group's heading */
export const GROUP_META = {
  'Website templates': { icon: '/icons/website-builder.svg', all: '/website-builder/' },
  'Section templates': { icon: '/icons/website-section-templates.svg', all: '/website-section-templates/' },
  'Email templates': { icon: '/icons/email-templates.svg', all: '/email-templates/' },
  'Social posts': { icon: '/icons/social-post-templates.svg', all: '/social-post-templates/' },
  'UI snippets': { icon: '/icons/ui-snippets.svg', all: '/ui-snippets/' },
};

/* Matches grouped by library, best name matches first: [{ lib, items, total }] */
export function searchContent(index, query, perGroup = 5) {
  if (!index) return [];
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const q = words.join(' ');
  const by = new Map();
  for (const t of index) {
    if (!words.every(w => t.hay.includes(w))) continue;
    const score = t.lname.startsWith(q) ? 3 : t.lname.includes(q) ? 2 : 1;
    if (!by.has(t.lib)) by.set(t.lib, []);
    by.get(t.lib).push({ t, score });
  }
  return CONTENT_GROUPS.filter(g => by.has(g)).map(g => {
    const list = by.get(g).sort((a, b) => b.score - a.score);
    return { lib: g, total: list.length, items: list.slice(0, perGroup).map(x => x.t) };
  });
}
