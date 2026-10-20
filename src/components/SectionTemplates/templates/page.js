/* Whole pages for the Website Builder (/website-builder/): an ordered list of sections
   sharing ONE theme, font pair and motion setting.

   Page shape:
     { name, theme, fonts, motion, sections: [{ uid, tpl, state }] }
   Each section's own theme / fonts / motion are ignored on a page: the page's win, so any
   mix of sections looks like one website.

   The page document includes every template's CSS once, every behaviour script once,
   one GSAP include with the union of plugins, one motion runtime (it already animates
   every .st on the page) and all sections' structured data. */

import { sectionTemplateById, defaultSectionState, restoreSectionState, listItem } from './index.js';
import { WEBSITE_TEMPLATES, websiteTemplateById } from './starters.js';
import { DEFAULT_THEME, DEFAULT_MOTION, BASE_CSS, esc, gsapCdn, THEME_PRESETS, THEME_COLORS } from './meta.js';
import { BEHAVIORS } from './behaviors.js';
import { themeCss, googleFontsUrl, fillHtml, motionScript, motionPlugins, schemaTag } from './render.js';

export const newUid = () => `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** A new, empty page */
export const emptyPage = (name = 'Untitled page') => ({ name, theme: { ...DEFAULT_THEME }, fonts: { heading: 'jakarta', body: 'inter' }, motion: { ...DEFAULT_MOTION }, sections: [] });

/* Section anchors: an optional id per section so navbar links like #pricing scroll to it.
   New sections get a default from their category (unique on the page). */
const ANCHOR_FOR = { features: 'features', pricing: 'pricing', testimonials: 'customers', faq: 'faq', contact: 'contact', blog: 'blog', team: 'team', stats: 'results', cta: 'get-started' };
/** A URL-safe anchor id ('' when empty) */
export const cleanAnchor = v => String(v || '').toLowerCase().trim().replace(/[^a-z0-9-_]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
/** The default anchor for a template on a page ('' for navbars, heroes and footers) */
export function defaultAnchor(tplId, sections = []) {
  const t = sectionTemplateById(tplId);
  const base = t?.anchor ?? ANCHOR_FOR[t?.category]; // a template can set its own (or '' for none)
  if (!base) return '';
  const used = new Set(sections.map(s => s.anchor).filter(Boolean));
  let a = base, n = 2;
  while (used.has(a)) a = `${base}-${n++}`;
  return a;
}

/** A section instance for a page (default content of its template) */
export function newPageSection(tplId, sections = []) {
  const t = sectionTemplateById(tplId);
  return t ? { uid: newUid(), tpl: tplId, anchor: defaultAnchor(tplId, sections), state: defaultSectionState(t) } : null;
}

/* Starter pages = the website templates (templates/starters.js): each is a stack of
   sections with a theme, fonts and real content for its industry. */
export const STARTERS = WEBSITE_TEMPLATES;

/** Apply a template's content overrides ({ fields, lists, toggles }) to a section state */
function withOverrides(t, state, o = {}) {
  const next = { ...state, fields: { ...state.fields, ...(o.fields || {}) }, toggles: { ...state.toggles, ...(o.toggles || {}) }, lists: { ...state.lists } };
  for (const [key, items] of Object.entries(o.lists || {})) {
    const l = (t.lists || []).find(x => x.key === key);
    if (l && Array.isArray(items)) next.lists[key] = items.map((v, i) => listItem(l, v, `o${i}`));
  }
  return next;
}

/** A new page built from a website template */
export function pageFromStarter(starterId) {
  const st = websiteTemplateById(starterId);
  if (!st) return emptyPage();
  const page = emptyPage(st.name);
  const preset = st.preset && THEME_PRESETS.find(p => p.id === st.preset);
  if (preset) page.theme = { ...page.theme, ...Object.fromEntries(THEME_COLORS.map(c => [c.key, preset[c.key]])) };
  if (st.theme) page.theme = { ...page.theme, ...st.theme };
  page.fonts = { ...page.fonts, ...(st.fonts || {}) };
  for (const [id, o] of st.sections) {
    const sec = newPageSection(id, page.sections);
    if (!sec) continue;
    sec.state = withOverrides(sectionTemplateById(id), sec.state, o);
    page.sections.push(sec);
  }
  return page;
}

/** A saved page brought up to date: unknown templates dropped, each state restored */
export function restorePage(saved) {
  const base = emptyPage();
  const p = saved || {};
  return {
    name: String(p.name || base.name),
    theme: { ...base.theme, ...(p.theme || {}) },
    fonts: { ...base.fonts, ...(p.fonts || {}) },
    motion: { ...base.motion, ...(p.motion || {}) },
    sections: (Array.isArray(p.sections) ? p.sections : [])
      .map(s => { const t = sectionTemplateById(s?.tpl); return t ? { uid: s.uid || newUid(), tpl: t.id, anchor: cleanAnchor(s.anchor), state: restoreSectionState(t, s.state) } : null; })
      .filter(Boolean),
  };
}

/** The state a section renders with on the page (page theme, fonts and motion win) */
export const sectionOnPage = (page, s) => ({ ...s.state, theme: page.theme, fonts: page.fonts, motion: page.motion });

const pageTemplates = page => page.sections.map(s => sectionTemplateById(s.tpl)).filter(Boolean);
const THEME_HOLDER = { theme: {}, fonts: {} };

/** CSS for the whole page: theme tokens and base once, each template's CSS once */
export function pageCss(page, { fontFaces = '' } = {}) {
  const seen = new Set();
  const parts = [fontFaces, themeCss(THEME_HOLDER, { theme: page.theme, fonts: page.fonts }), BASE_CSS];
  for (const t of pageTemplates(page)) if (!seen.has(t.id)) { seen.add(t.id); parts.push(`/* ${t.name} */\n${t.css}`); }
  return parts.filter(Boolean).join('\n');
}

/** Every section's markup, in order. imageSrc(uid, key) resolves uploaded images. */
export function pageMarkup(page, { imageSrc, clean = true } = {}) {
  return page.sections.map(s => {
    const t = sectionTemplateById(s.tpl);
    if (!t) return '';
    const src = imageSrc ? k => imageSrc(s.uid, k) : undefined;
    const id = cleanAnchor(s.anchor);
    return `<section${id ? ` id="${id}"` : ''} class="st st-${t.id}" data-uid="${esc(s.uid)}">\n${fillHtml(t, sectionOnPage(page, s), { imageSrc: src, clean })}\n</section>`;
  }).join('\n');
}

/** Scripts for the page: each behaviour once, then the motion runtime once */
export function pageScript(page, { motion = true } = {}) {
  const names = [...new Set(pageTemplates(page).flatMap(t => t.behaviors || []))];
  const behaviors = names.map(n => BEHAVIORS[n]?.js).filter(Boolean).join('\n');
  const anim = motion && page.sections.length ? motionScript({ motion: page.motion }) : '';
  return [behaviors && !motion ? 'window.ST_STILL = true;' : '', behaviors, anim].filter(Boolean).join('\n');
}

/** GSAP CDN URLs the page needs ([] when it has no scripts) */
export function pageCdn(page, { motion = true } = {}) {
  const names = [...new Set(pageTemplates(page).flatMap(t => t.behaviors || []))];
  const plugins = [...names.flatMap(n => BEHAVIORS[n]?.plugins || []), ...(motion ? motionPlugins({ motion: page.motion }) : [])];
  return pageScript(page, { motion }) ? gsapCdn([...new Set(plugins)]) : [];
}

/** All sections' JSON-LD (FAQPage, BlogPosting lists …) */
export const pageSchema = page => page.sections.map(s => { const t = sectionTemplateById(s.tpl); return t ? schemaTag(t, sectionOnPage(page, s)) : ''; }).join('');

/**
 * The complete page as one HTML document.
 * @param imageSrc  (uid, key) => url   uploaded images (data URLs, images/… or blob: in the preview)
 * @param clean     strip editor bindings (exports)
 * @param motion    include the entrance animation runtime
 */
export function pageDocumentHtml(page, { imageSrc, clean = true, fontFaces = '', extraHead = '', motion = true, description = '' } = {}) {
  const gf = googleFontsUrl(THEME_HOLDER, { fonts: page.fonts });
  const js = pageScript(page, { motion });
  const libs = js ? pageCdn(page, { motion }).map(u => `<script src="${u}"></script>`).join('\n') : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.name || 'My website')}</title>
${description ? `<meta name="description" content="${esc(description)}">\n` : ''}<!-- Built with the free Website Builder · https://webdevpuneet.com/website-builder/ -->
${gf ? `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="${gf}" rel="stylesheet">\n` : ''}${clean ? pageSchema(page) : ''}<style>
body{margin:0;background:${page.theme?.bg || '#fff'}}
html{scroll-behavior:smooth}section[id]{scroll-margin-top:84px}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
${pageCss(page, { fontFaces })}
</style>${extraHead}
</head>
<body>
${pageMarkup(page, { imageSrc, clean })}
${js ? `${libs}\n<script>\n${js}\n</script>\n` : ''}</body>
</html>
`;
}
