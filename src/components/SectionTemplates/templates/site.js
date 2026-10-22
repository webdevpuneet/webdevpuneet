/* Multi-page sites for the Website Builder (roadmap Phase 5).

   Site shape:
     { kind: 'site', version, name, url, theme, fonts, motion, autoNav,
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
import { newUid, emptyPage, restorePage, pageFromStarter, newPageSection, pageCss, pageScript, pageCdn, pageBaseCss, pageDocumentHtml } from './page.js';

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
    kind: 'site', version: SITE_VERSION, name: p.name || 'My website', url: '',
    theme: p.theme, fonts: p.fonts, motion: p.motion, autoNav: true,
    header, footer,
    pages: [{ id: newPageId(), name: 'Home', slug: 'index', title: '', description: '', inNav: true, hideHeader: false, hideFooter: false, sections: secs }],
  };
}

export const emptySite = (name = 'Untitled website') => siteFromPage(emptyPage(name));

/** A site from a website template (a one-page site until templates ship extra pages) */
export const siteFromStarter = starterId => siteFromPage(pageFromStarter(starterId));

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
    name: base.name, url: cleanBaseUrl(saved.url),
    theme: base.theme, fonts: base.fonts, motion: base.motion,
    autoNav: saved.autoNav !== false,
    header, footer, pages,
  };
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
  const opts = { imageSrc, clean, fontFaces, extraHead, motion, title: pageTitle(site, page), description: page.description, canonical: cleanBaseUrl(site.url) ? `${cleanBaseUrl(site.url)}${isHomePage(site, page) ? '' : pageFile(site, page)}` : '' };
  if (!shared) return pageDocumentHtml(view, opts);
  const js = siteScript(site);
  return pageDocumentHtml(view, { ...opts, stylesheet: 'styles.css', script: js ? 'script.js' : '', cdnUrls: js ? siteCdn(site) : [] });
}

/** sitemap.xml for the site ('' without a site URL) */
export function siteSitemap(site, { lastmod = new Date().toISOString().slice(0, 10) } = {}) {
  const base = cleanBaseUrl(site.url);
  if (!base) return '';
  const urls = site.pages.map(p => `  <url>\n    <loc>${base}${isHomePage(site, p) ? '' : pageFile(site, p)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

/**
 * Every text file of the static-site export: one HTML file per page, styles.css,
 * script.js (when the site has scripts), and sitemap.xml + robots.txt when the site URL
 * is set. Images are the caller's job (imageSrc points at assets/…).
 * @returns [{ path, content }]
 */
export function siteFiles(site, { imageSrc, fontFaces = '' } = {}) {
  const files = site.pages.map(p => ({ path: pageFile(site, p), content: siteDocumentHtml(site, p.id, { imageSrc, fontFaces, shared: true }) }));
  files.push({ path: 'styles.css', content: siteCss(site, { fontFaces }) + '\n' });
  const js = siteScript(site);
  if (js) files.push({ path: 'script.js', content: js + '\n' });
  const sitemap = siteSitemap(site);
  if (sitemap) {
    files.push({ path: 'sitemap.xml', content: sitemap });
    files.push({ path: 'robots.txt', content: `User-agent: *\nAllow: /\n\nSitemap: ${cleanBaseUrl(site.url)}sitemap.xml\n` });
  }
  return files;
}
