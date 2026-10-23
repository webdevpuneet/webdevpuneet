/* Multi-page sites for the Website Builder (roadmap Phase 5).

   Site shape:
     { kind: 'site', version, name, url, favicon, theme, fonts, motion, autoNav,
       header: [section], footer: [section],
       pages: [{ id, name, slug, title, description, inNav, hideHeader, hideFooter, sections: [section] }] }
   A section is the same { uid, tpl, anchor, state } a single page uses (page.js), and
   uids are unique across the whole site, so uploads keyed page:<uid>:… keep working.

   Every page shares the site's theme, fonts and motion, and the shared header (navbar,
   announcement bar) and footer, unless the page hides them. The first page is the home
   page (index.html); the others export as <slug>.html, which works on any host and when
   opened straight from disk.

   The page engine is reused as is: pageView() turns one page of the site into an ordinary
   page (header + the page's sections + footer) for editing, renderView() adds the
   automatic navbar links for previews and exports, and applyPageView() writes an edited
   view back into the site. */

import { sectionTemplateById, listItem } from './index.js';
import { newUid, emptyPage, restorePage, pageFromStarter, starterSections, newPageSection, pageCss, pageScript, pageCdn, pageBaseCss, pageDocumentHtml } from './page.js';
import { websiteTemplateById } from './starters.js';

export const SITE_VERSION = 2; // 2: the home page is in the menu by default
export const isSite = v => !!v && v.kind === 'site';

/** A URL-safe page file name ('' when empty); "index" is reserved for the home page */
export const cleanSlug = v => String(v || '').toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48);

/** A slug for `name` that no other page uses */
export function uniqueSlug(name, pages = [], exceptId = null) {
  const base = cleanSlug(name) || 'page';
  const used = new Set(pages.filter(p => p.id !== exceptId).map(p => p.slug));
  used.add('index');
  let s = base, n = 2;
  while (used.has(s)) s = `${base}-${n++}`;
  return s;
}

export const newPageId = () => `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** A new page for the site (not added yet) */
export function newSitePage(site, name = 'New page', sections = []) {
  return { id: newPageId(), name, slug: uniqueSlug(name, site?.pages || []), title: '', description: '', inNav: true, hideHeader: false, hideFooter: false, sections };
}

/** A new page from a layout in PAGE_LAYOUTS (not added yet) */
export function pageFromLayout(site, layoutId, name) {
  const layout = PAGE_LAYOUTS.find(l => l.id === layoutId) || PAGE_LAYOUTS[0];
  const sections = [];
  for (const tpl of layout.sections) { const s = newPageSection(tpl, sections); if (s) sections.push(s); }
  return newSitePage(site, name || (layout.id === 'blank' ? 'New page' : layout.name), sections);
}

/** The site with a page added (after `afterId`, or at the end); its slug is made unique */
export function addSitePage(site, page, afterId = null) {
  const p = { ...page, slug: uniqueSlug(page.slug || page.name, site.pages) };
  const i = afterId ? site.pages.findIndex(x => x.id === afterId) : -1;
  const pages = [...site.pages];
  pages.splice(i < 0 ? pages.length : i + 1, 0, p);
  return { ...site, pages };
}

/** The site with one page's settings changed ({ name, slug, title, description, inNav,
    hideHeader, hideFooter }); the slug stays unique and the home page stays "index" */
export function updateSitePage(site, pageId, patch) {
  return {
    ...site,
    pages: site.pages.map((p, i) => {
      if (p.id !== pageId) return p;
      const next = { ...p, ...patch };
      next.slug = i === 0 ? 'index' : uniqueSlug(cleanSlug(next.slug) || next.name, site.pages, p.id);
      return next;
    }),
  };
}

/** The site without a page (the last page can't be removed) */
export const removeSitePage = (site, pageId) => (site.pages.length > 1 ? { ...site, pages: site.pages.filter(p => p.id !== pageId) } : site);

/** The site with its pages in a new order; whichever page comes first becomes the home page */
export function reorderSitePages(site, ids) {
  const byId = new Map(site.pages.map(p => [p.id, p]));
  const pages = ids.map(id => byId.get(id)).filter(Boolean);
  if (pages.length !== site.pages.length) return site;
  const fixed = [];
  for (const [i, p] of pages.entries()) fixed.push({ ...p, slug: i === 0 ? 'index' : uniqueSlug(p.slug === 'index' ? p.name : p.slug, fixed) });
  return { ...site, pages: fixed };
}

const isHeaderSection = s => sectionTemplateById(s.tpl)?.category === 'navbar';
const isFooterSection = s => sectionTemplateById(s.tpl)?.category === 'footer';

/** A one-page site from a single page: leading navbars become the shared header and
    trailing footers the shared footer; everything else is the home page. */
export function siteFromPage(page) {
  const p = page?.sections ? page : emptyPage();
  const secs = [...p.sections];
  const header = [], footer = [];
  while (secs.length && isHeaderSection(secs[0])) header.push(secs.shift());
  while (secs.length && isFooterSection(secs[secs.length - 1])) footer.unshift(secs.pop());
  return {
    kind: 'site', version: SITE_VERSION, name: p.name || 'My website', url: '', favicon: cleanFavicon(null),
    theme: p.theme, fonts: p.fonts, motion: p.motion, autoNav: true,
    header, footer,
    pages: [{ id: newPageId(), name: 'Home', slug: 'index', title: '', description: '', inNav: true, hideHeader: false, hideFooter: false, sections: secs }],
  };
}

export const emptySite = (name = 'Untitled website') => siteFromPage(emptyPage(name));

/* ── Website templates as one-page or multi-page sites ─────────────────────────────
   Every website template opens either way:
   - one page: exactly the template (in-page #anchor links), as a one-page site;
   - multi-page: the template's hand-written `pages` (plus its `multiLinks` map, e.g.
     '#features' → 'menu.html'), or, for templates without them, its sections split by
     category onto their own pages (SPLIT_PAGES). Either way, links to an #anchor that now
     lives on another page are pointed at that page (fixSiteLinks). */

/** Categories that move to their own page when a template is split automatically */
const SPLIT_PAGES = { pricing: 'Pricing', team: 'About', blog: 'Blog', faq: 'FAQ', contact: 'Contact' };

/** The brand name in the site's navbar (logo text), for page titles */
const brandOf = site => site.header.map(s => s.state?.fields?.logoText).find(Boolean) || site.name;

/** Rewrite every link value in a section (url fields, "Label | url" link lists, and the same
    inside list items) with fn(url) → url */
function mapSectionLinks(s, fn) {
  const t = sectionTemplateById(s.tpl);
  if (!t) return s;
  const one = (fd, v) => {
    if (typeof v !== 'string' || !v) return v;
    if (fd.type === 'url') return fn(v.trim());
    if (fd.type === 'links') return v.split('\n').map(line => { const i = line.lastIndexOf('|'); return i < 0 ? line : `${line.slice(0, i + 1)} ${fn(line.slice(i + 1).trim())}`; }).join('\n');
    return v;
  };
  const fields = { ...s.state.fields };
  for (const fd of t.fields) if (fd.key in fields) fields[fd.key] = one(fd, fields[fd.key]);
  const lists = { ...s.state.lists };
  for (const l of t.lists || []) if (Array.isArray(lists[l.key])) lists[l.key] = lists[l.key].map(it => { const n = { ...it }; for (const fd of l.fields) if (fd.key in n) n[fd.key] = one(fd, n[fd.key]); return n; });
  return { ...s, state: { ...s.state, fields, lists } };
}

/** Apply fn(url, pageFileOfThisSection | null) to every section of the site */
function mapSiteLinks(site, fn) {
  return {
    ...site,
    header: site.header.map(s => mapSectionLinks(s, u => fn(u, null))),
    footer: site.footer.map(s => mapSectionLinks(s, u => fn(u, null))),
    pages: site.pages.map(p => ({ ...p, sections: p.sections.map(s => mapSectionLinks(s, u => fn(u, pageFile(site, p)))) })),
  };
}

/** Point #anchor links at the page that now holds that anchor ("#pricing" → "pricing.html#pricing").
    Links in the shared header/footer always get the page; page links only when the anchor
    is on another page. "#contact" with no contact section anywhere goes to a contact page. */
export function fixSiteLinks(site) {
  const where = new Map();
  for (const p of site.pages) for (const s of p.sections) if (s.anchor && !where.has(s.anchor)) where.set(s.anchor, pageFile(site, p));
  const shared = new Set([...site.header, ...site.footer].map(s => s.anchor).filter(Boolean));
  const bySlug = slug => site.pages.find(p => p.slug === slug);
  return mapSiteLinks(site, (u, file) => {
    const m = u.match(/^#([\w-]+)$/);
    if (!m || shared.has(m[1])) return u;
    const target = where.get(m[1]);
    if (target) return target === file ? u : `${target}#${m[1]}`;
    const pg = bySlug(m[1]);
    return pg ? pageFile(site, pg) : u;
  });
}

/** The automatic multi-page split of a template's home page (sections of SPLIT_PAGES
    categories move to their own pages, in the order they first appear) */
function splitSite(site) {
  const home = site.pages[0];
  const groups = new Map();
  const keep = [];
  for (const s of home.sections) {
    const name = SPLIT_PAGES[sectionTemplateById(s.tpl)?.category];
    if (name) { if (!groups.has(name)) groups.set(name, []); groups.get(name).push(s); } else keep.push(s);
  }
  if (!groups.size || !keep.length) return site;
  let out = { ...site, pages: [{ ...home, sections: keep }] };
  const brand = brandOf(site);
  for (const [name, sections] of groups) out = addSitePage(out, { ...newSitePage(out, name, sections), title: `${name} | ${brand}` });
  return out;
}

/**
 * A site from a website template.
 * @param multi  false: the template as one page; true: its multi-page version
 */
export function siteFromStarter(starterId, { multi = false } = {}) {
  let site = siteFromPage(pageFromStarter(starterId));
  const st = websiteTemplateById(starterId);
  if (st?.homeTitle || st?.homeDescription) site.pages[0] = { ...site.pages[0], title: st.homeTitle || '', description: st.homeDescription || '' };
  if (!multi || !st) return site;
  if (st.pages?.length) {
    for (const p of st.pages) site = addSitePage(site, { ...newSitePage(site, p.name, starterSections(p.sections)), slug: p.slug || '', title: p.title || '', description: p.description || '' });
    const map = st.multiLinks || {};
    site = mapSiteLinks(site, u => map[u] ?? u);
  } else {
    site = splitSite(site);
  }
  return fixSiteLinks(site);
}

/** The pages a template's multi-page version has: [{ name, file, n }] (one entry = no
    multi-page version) */
export function starterPageList(starterId) {
  const site = siteFromStarter(starterId, { multi: true });
  return site.pages.map(p => ({ name: p.name, file: pageFile(site, p), n: p.sections.length }));
}

/* restorePage() already validates sections; borrow it for each part of the site */
const restoreSections = list => restorePage({ sections: Array.isArray(list) ? list : [] }).sections;

/** A saved site (or an old single page) brought up to date */
export function restoreSite(saved) {
  if (!isSite(saved)) return siteFromPage(restorePage(saved));
  const base = restorePage({ name: saved.name, theme: saved.theme, fonts: saved.fonts, motion: saved.motion });
  const pages = [];
  const seenUid = new Set();
  const dedupe = list => list.map(s => { if (seenUid.has(s.uid)) s = { ...s, uid: newUid() }; seenUid.add(s.uid); return s; });
  const header = dedupe(restoreSections(saved.header));
  const footer = dedupe(restoreSections(saved.footer));
  for (const [i, p] of (Array.isArray(saved.pages) ? saved.pages : []).entries()) {
    if (!p || typeof p !== 'object') continue;
    const name = String(p.name || (i === 0 ? 'Home' : 'Page')).slice(0, 80);
    const page = {
      id: typeof p.id === 'string' && p.id && !pages.some(x => x.id === p.id) ? p.id : newPageId(),
      name,
      slug: '',
      title: String(p.title || '').slice(0, 120),
      description: String(p.description || '').slice(0, 320),
      inNav: p.inNav !== false || (i === 0 && !(saved.version >= 2)), // v1 kept the home page out of the menu
      hideHeader: !!p.hideHeader,
      hideFooter: !!p.hideFooter,
      sections: dedupe(restoreSections(p.sections)),
    };
    page.slug = pages.length === 0 ? 'index' : uniqueSlug(cleanSlug(p.slug) || name, pages);
    pages.push(page);
  }
  if (!pages.length) pages.push({ ...newSitePage(null, 'Home'), slug: 'index' });
  return {
    kind: 'site', version: SITE_VERSION,
    name: base.name, url: cleanBaseUrl(saved.url), favicon: cleanFavicon(saved.favicon),
    theme: base.theme, fonts: base.fonts, motion: base.motion,
    autoNav: saved.autoNav !== false,
    header, footer, pages,
  };
}

/* ── Favicon ─────────────────────────────────────────────────────────────────────
   favicon: { mode: 'auto' | 'image' | 'none', letter, image }
   auto   a rounded square in the brand colour with a letter (default: the site name's first),
          as favicon.svg (SVG favicons work in every current browser)
   image  the person's own icon, resized in the browser to a 180×180 PNG and kept in the site
          as a data URL (favicon.png, also the apple-touch-icon)
   none   no favicon tags */
export const FAVICON_MODES = [['auto', 'Letter'], ['image', 'Your image'], ['none', 'None']];
const FAVICON_PNG = /^data:image\/png;base64,[A-Za-z0-9+/=]+$/;
export function cleanFavicon(f) {
  const mode = FAVICON_MODES.some(([v]) => v === f?.mode) ? f.mode : 'auto';
  const image = typeof f?.image === 'string' && f.image.length < 200000 && FAVICON_PNG.test(f.image) ? f.image : '';
  return { mode: mode === 'image' && !image ? 'auto' : mode, letter: String(f?.letter || '').replace(/[<>&"']/g, '').trim().slice(0, 2), image };
}
const faviconLetter = site => (site.favicon?.letter || String(site.name || 'W').trim()[0] || 'W').toUpperCase();
/** The automatic favicon: the letter on a rounded square in the theme's brand colour */
export function faviconSvg(site) {
  const t = site.theme || {};
  const bg = /^#[0-9a-f]{3,8}$/i.test(t.brand || '') ? t.brand : '#4f46e5';
  const fg = /^#[0-9a-f]{3,8}$/i.test(t.brandText || '') ? t.brandText : '#ffffff';
  const l = faviconLetter(site);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${bg}"/><text x="32" y="33" text-anchor="middle" dominant-baseline="central" font-family="Segoe UI,Helvetica,Arial,sans-serif" font-size="${l.length > 1 ? 28 : 38}" font-weight="700" fill="${fg}">${l}</text></svg>`;
}
/** <link> tags for the favicon. files: link favicon.svg / favicon.png next to the page
    (exports); otherwise inline data URLs (single documents, previews). */
export function faviconTags(site, { files = false, prefix = '' } = {}) {
  const f = cleanFavicon(site.favicon);
  if (f.mode === 'none') return '';
  if (f.mode === 'image') {
    const href = files ? `${prefix}favicon.png` : f.image;
    return `<link rel="icon" type="image/png" href="${href}">\n<link rel="apple-touch-icon" href="${href}">\n`;
  }
  const href = files ? `${prefix}favicon.svg` : `data:image/svg+xml,${encodeURIComponent(faviconSvg(site))}`;
  return `<link rel="icon" type="image/svg+xml" href="${href}">\n`;
}
/** The favicon file for exports ([] for none): { path, content, base64? } */
export function faviconFiles(site) {
  const f = cleanFavicon(site.favicon);
  if (f.mode === 'none') return [];
  if (f.mode === 'image') return [{ path: 'favicon.png', content: f.image.split(',')[1], base64: true }];
  return [{ path: 'favicon.svg', content: `${faviconSvg(site)}\n` }];
}

/** The site's public address for canonical links and sitemap.xml ('' when unset) */
export function cleanBaseUrl(v) {
  const s = String(v || '').trim();
  if (!/^https?:\/\/[^\s"<>]+$/i.test(s)) return '';
  return s.replace(/\/+$/, '') + '/';
}

export const pageById = (site, id) => site.pages.find(p => p.id === id) || site.pages[0];
export const isHomePage = (site, page) => site.pages[0]?.id === page?.id;

/** The file a page exports to */
export const pageFile = (site, page) => (isHomePage(site, page) ? 'index.html' : `${page.slug}.html`);

/** The <title> of a page */
export const pageTitle = (site, page) => page.title || (isHomePage(site, page) ? site.name : `${page.name} | ${site.name}`);

/** One page of the site as an ordinary page (what the builder edits) */
export function pageView(site, pageId) {
  const page = pageById(site, pageId);
  return {
    name: site.name, theme: site.theme, fonts: site.fonts, motion: site.motion,
    sections: [...(page.hideHeader ? [] : site.header), ...page.sections, ...(page.hideFooter ? [] : site.footer)],
  };
}

/** Write an edited view back: theme, fonts and motion go to the site; sections that belong
    to the shared header / footer stay there (edits to them change every page, and they
    always render at the top / bottom); every other section belongs to this page. A NEW
    section joins the header only if it is a navbar with nothing but header sections above
    it, and the footer only if it is a footer with nothing but footer sections below it, so
    "+ Add section" at the end of the list lands on the page, above the shared footer. */
export function applyPageView(site, pageId, view) {
  const page = pageById(site, pageId);
  const headerIds = new Set(site.header.map(s => s.uid));
  const footerIds = new Set(site.footer.map(s => s.uid));
  const pageIds = new Set(page.sections.map(s => s.uid));
  const secs = view.sections;
  const header = [], footer = [], middle = [];
  secs.forEach((s, i) => {
    const isNew = !headerIds.has(s.uid) && !footerIds.has(s.uid) && !pageIds.has(s.uid);
    if (!page.hideHeader && (headerIds.has(s.uid) || (isNew && isHeaderSection(s) && secs.slice(0, i).every(o => header.includes(o))))) header.push(s);
    else if (!page.hideFooter && (footerIds.has(s.uid) || (isNew && isFooterSection(s) && secs.slice(i + 1).every(o => footerIds.has(o.uid) || isFooterSection(o))))) footer.push(s);
    else middle.push(s);
  });
  return {
    ...site,
    name: view.name ?? site.name,
    theme: view.theme, fonts: view.fonts, motion: view.motion,
    header: page.hideHeader ? site.header : header,
    footer: page.hideFooter ? site.footer : footer,
    pages: site.pages.map(p => (p.id === page.id ? { ...p, sections: middle } : p)),
  };
}

/* Ready-made inner pages: the sections a typical page of that kind needs, with their
   template's default content (edited like any other section). */
export const PAGE_LAYOUTS = [
  { id: 'blank',    name: 'Blank page', sections: [] },
  { id: 'about',    name: 'About',      sections: ['features-split-image', 'stats-counters', 'team-grid', 'cta-strip'] },
  { id: 'services', name: 'Services',   sections: ['features-icon-grid', 'features-steps', 'testimonials-grid', 'cta-gradient-banner'] },
  { id: 'pricing',  name: 'Pricing',    sections: ['pricing-three-tier', 'logo-cloud', 'faq-accordion', 'cta-strip'] },
  { id: 'contact',  name: 'Contact',    sections: ['contact-split-form', 'contact-map'] },
  { id: 'blog',     name: 'Blog',       sections: ['blog-featured', 'blog-cards', 'cta-newsletter'] },
  { id: 'faq',      name: 'FAQ',        sections: ['faq-accordion', 'contact-cards'] },
  { id: 'team',     name: 'Team',       sections: ['team-grid', 'team-hiring'] },
];

/** Links for the navbar: every page shown in the menu */
export const navLinks = site => site.pages.filter(p => p.inNav).map(p => ({ label: p.name, url: pageFile(site, p) }));

/** Automatic navigation applies when autoNav is on and the site has more than one page */
export const usesAutoNav = site => site.autoNav !== false && site.pages.length > 1;

/** A header section with its links replaced by the site's pages (and its logo linking home) */
function withNav(site, s) {
  const t = sectionTemplateById(s.tpl);
  const list = t?.category === 'navbar' && (t.lists || []).find(l => l.key === 'links' && (l.fields || []).some(f => f.key === 'url'));
  if (!list) return s;
  const links = navLinks(site).slice(0, list.max || 8);
  const state = { ...s.state, lists: { ...s.state.lists } };
  if (links.length) state.lists.links = links.map((v, i) => listItem(list, v, `nav${i}`));
  if ((t.fields || []).some(f => f.key === 'logoUrl')) state.fields = { ...state.fields, logoUrl: 'index.html' };
  return { ...s, state };
}

/** pageView() plus the automatic navbar links: what previews and exports render */
export function renderView(site, pageId) {
  const view = pageView(site, pageId);
  if (!usesAutoNav(site)) return view;
  const headerIds = new Set(site.header.map(s => s.uid));
  return { ...view, sections: view.sections.map(s => (headerIds.has(s.uid) ? withNav(site, s) : s)) };
}

/** Every section on the site as one page (for the shared CSS and script) */
const allSections = site => ({ ...pageView(site, site.pages[0].id), sections: [...site.header, ...site.pages.flatMap(p => p.sections), ...site.footer] });

/** styles.css: theme tokens, base and every template used anywhere on the site, once */
export const siteCss = (site, { fontFaces = '' } = {}) => `${pageBaseCss(site)}\n${pageCss(allSections(site), { fontFaces })}`;

/** script.js: every behaviour used on the site and the motion runtime, once ('' when none) */
export const siteScript = site => pageScript(allSections(site));

/** GSAP URLs every page loads (the union, so script.js finds its plugins on any page) */
export const siteCdn = site => pageCdn(allSections(site));

/** One page of the site as an HTML document. With `shared` it links styles.css and
    script.js (the static-site export); without, everything is inline (previews). */
export function siteDocumentHtml(site, pageId, { imageSrc, clean = true, fontFaces = '', extraHead = '', motion = true, shared = false } = {}) {
  const page = pageById(site, pageId);
  const view = renderView(site, page.id);
  const opts = { imageSrc, clean, fontFaces, extraHead: `${clean ? faviconTags(site, { files: shared }) : ''}${extraHead}`, motion, activeFile: usesAutoNav(site) ? pageFile(site, page) : '', title: pageTitle(site, page), description: page.description, canonical: cleanBaseUrl(site.url) ? `${cleanBaseUrl(site.url)}${isHomePage(site, page) ? '' : pageFile(site, page)}` : '' };
  if (!shared) return pageDocumentHtml(view, opts);
  const js = siteScript(site);
  return pageDocumentHtml(view, { ...opts, stylesheet: 'styles.css', script: js ? 'script.js' : '', cdnUrls: js ? siteCdn(site) : [] });
}

/** sitemap.xml for the site ('' without a site URL) */
/* A page's path in the static export ('' for the home page). Other exports pass their own
   (the Next.js export uses folders: 'about/'). */
const staticPath = (site, p) => (isHomePage(site, p) ? '' : pageFile(site, p));

export function siteSitemap(site, { lastmod = new Date().toISOString().slice(0, 10), pathOf = staticPath } = {}) {
  const base = cleanBaseUrl(site.url);
  if (!base) return '';
  const urls = site.pages.map(p => `  <url>\n    <loc>${base}${pathOf(site, p)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

/**
 * Every text file of the static-site export: one HTML file per page, styles.css,
 * script.js (when the site has scripts), llms.txt, and sitemap.xml + robots.txt when the
 * site URL is set. Images are the caller's job (imageSrc points at assets/…).
 * @returns [{ path, content }]
 */
/** llms.txt (llmstxt.org): the site's name, what it is and every page with its description,
    so AI assistants can read the site. Links are absolute when the site address is set. */
export function siteLlms(site, { pathOf = staticPath } = {}) {
  const base = cleanBaseUrl(site.url);
  const home = site.pages[0];
  const clean = v => String(v || '').replace(/[\r\n]+/g, ' ').trim();
  const lines = [`# ${clean(site.name) || 'Website'}`, ''];
  if (clean(home?.description)) lines.push(`> ${clean(home.description)}`, '');
  lines.push('## Pages', '');
  for (const p of site.pages) {
    const path = pathOf(site, p);
    const url = base ? `${base}${path}` : (path || (pathOf === staticPath ? 'index.html' : '/'));
    lines.push(`- [${clean(p.name) || 'Page'}](${url})${clean(p.description) ? `: ${clean(p.description)}` : ''}`);
  }
  return `${lines.join('\n')}\n`;
}

/** The search and AI files for a site: sitemap.xml + robots.txt (when the site address is set)
    and llms.txt (always). Used by every website export, one page or many. */
export function siteExtraFiles(site, { pathOf = staticPath } = {}) {
  const files = [];
  const sitemap = siteSitemap(site, { pathOf });
  if (sitemap) {
    files.push({ path: 'sitemap.xml', content: sitemap });
    files.push({ path: 'robots.txt', content: `User-agent: *\nAllow: /\n\nSitemap: ${cleanBaseUrl(site.url)}sitemap.xml\n` });
  }
  files.push({ path: 'llms.txt', content: siteLlms(site, { pathOf }) });
  return files;
}

export function siteFiles(site, { imageSrc, fontFaces = '' } = {}) {
  const files = site.pages.map(p => ({ path: pageFile(site, p), content: siteDocumentHtml(site, p.id, { imageSrc, fontFaces, shared: true }) }));
  files.push({ path: 'styles.css', content: siteCss(site, { fontFaces }) + '\n' });
  const js = siteScript(site);
  if (js) files.push({ path: 'script.js', content: js + '\n' });
  files.push(...faviconFiles(site));
  files.push(...siteExtraFiles(site));
  return files;
}
