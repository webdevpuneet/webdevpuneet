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
import { formatHtml } from './format.js';
import { WEBSITE_TEMPLATES, websiteTemplateById } from './starters.js';
import { DEFAULT_THEME, DEFAULT_MOTION, BASE_CSS, esc, gsapCdn, THEME_PRESETS, THEME_COLORS, scaleCss, scaleOf, scaleLengths, SPACE_UNITS } from './meta.js';
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

/* ── Per-section style overrides ──────────────────────────────────────────────────
   A section on a page may override the page theme for itself only:
     style: { scheme, colors: { bg, text, brand }, top, bottom, bg: { id, file, w, h }, overlay }
   scheme   'page' (default) | 'surface' | 'inverted' | 'brand' | 'custom' (colors)
   top / bottom  % of the section's own vertical padding (100 = as designed)
   bg       an uploaded background image (resolved with imageSrc(uid, '@bg'))
   overlay  % of the section background colour laid over that image, so text stays readable
   It renders as an inline style on the <section>: colour tokens as --st-* variables (the
   section's CSS already reads them), padding-top / -bottom, and the background image. */
export const SECTION_SCHEMES = [
  { id: 'page', label: 'Page' }, { id: 'surface', label: 'Soft' }, { id: 'inverted', label: 'Inverted' },
  { id: 'brand', label: 'Brand' }, { id: 'custom', label: 'Custom' },
];
export const SECTION_SPACING = [['0', 'None'], ['50', 'S'], ['100', 'Default'], ['150', 'L'], ['200', 'XL']];
export const SECTION_OVERLAYS = [['0', 'None'], ['30', 'Light'], ['55', 'Medium'], ['80', 'Strong']];
export const BG_KEY = '@bg'; // imageSrc key of a section's background image

const HEX = /^#[0-9a-f]{6}$/i;
const PCT = new Set(SECTION_SPACING.map(([v]) => v));

/** A saved style made safe, or undefined when it changes nothing */
export function cleanSectionStyle(st) {
  if (!st || typeof st !== 'object') return undefined;
  const out = {};
  if (SECTION_SCHEMES.some(x => x.id === st.scheme) && st.scheme !== 'page') out.scheme = st.scheme;
  if (out.scheme === 'custom') out.colors = Object.fromEntries(['bg', 'text', 'brand'].map(k => [k, HEX.test(st.colors?.[k] || '') ? st.colors[k] : null]).filter(([, v]) => v));
  for (const k of ['top', 'bottom']) if (PCT.has(String(st[k])) && String(st[k]) !== '100') out[k] = String(st[k]);
  if (st.bg?.id && st.bg?.file) out.bg = { id: String(st.bg.id), file: String(st.bg.file), w: +st.bg.w || 0, h: +st.bg.h || 0 };
  if (out.bg && SECTION_OVERLAYS.some(([v]) => v === String(st.overlay))) out.overlay = String(st.overlay);
  return Object.keys(out).length ? out : undefined;
}

/** Split a CSS value on top-level spaces ("clamp(52px,4cqi + 22px,68px) 0" → 2 parts) */
function cssTokens(v) {
  const out = []; let depth = 0, cur = '';
  for (const ch of v.trim()) {
    if (ch === '(') depth++; else if (ch === ')') depth--;
    if (ch === ' ' && depth === 0) { if (cur) out.push(cur); cur = ''; } else cur += ch;
  }
  if (cur) out.push(cur);
  return out;
}

/** The section's own vertical padding { top, bottom } from its root rule, or null (navbars,
    full-height heroes) */
export function sectionPadding(t) {
  const rule = (t?.css || '').match(new RegExp(`\\.st-${t?.id}\\{([^}]*)\\}`));
  const v = rule?.[1].match(/(?:^|;)padding:([^;]+)/)?.[1];
  if (!v) return null;
  const p = cssTokens(v);
  return { top: p[0], bottom: p[2] ?? p[0] };
}

const lum = hex => { const n = parseInt(hex.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const textOn = hex => (HEX.test(hex) && lum(hex) > 0.4 ? '#0f172a' : '#ffffff');

/** CSS declarations for a section's style override ('' when it has none) */
export function sectionStyleCss(page, s, imageSrc) {
  const st = s.style;
  if (!st) return '';
  const th = { ...DEFAULT_THEME, ...(page.theme || {}) };
  const out = [];
  const vars = o => Object.entries(o).forEach(([k, v]) => out.push(`--st-${k}:${v}`));
  const mix = (a, pct, b) => `color-mix(in srgb,${a} ${pct}%,${b})`;
  if (st.scheme === 'surface') vars({ bg: th.surface, surface: th.bg });
  else if (st.scheme === 'inverted') vars({ bg: th.text, text: th.bg, surface: mix(th.bg, 8, th.text), muted: mix(th.bg, 70, th.text) });
  else if (st.scheme === 'brand') vars({ bg: th.brand, text: th.brandText, muted: mix(th.brandText, 80, th.brand), surface: mix(th.brandText, 12, th.brand), brand: th.brandText, 'btn-text': th.brand });
  else if (st.scheme === 'custom') {
    const bg = st.colors?.bg || th.bg, text = st.colors?.text || textOn(bg), brand = st.colors?.brand || th.brand;
    vars({ bg, text, surface: mix(text, 6, bg), muted: mix(text, 72, bg), brand, 'btn-text': textOn(brand) });
  }
  const pad = (st.top || st.bottom) && sectionPadding(sectionTemplateById(s.tpl));
  if (pad) {
    const k = scaleOf(page.theme?.spaceScale);
    for (const side of ['top', 'bottom']) if (st[side]) out.push(`padding-${side}:${st[side] === '0' ? '0' : scaleLengths(pad[side], k * Number(st[side]) / 100, SPACE_UNITS)}`);
  }
  // Only image sources the builder produces: preview blob:, embedded data:image, the ZIP's assets/…
  const raw = st.bg && imageSrc ? String(imageSrc(s.uid, BG_KEY) || '') : '';
  const src = /^(blob:|data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,|https?:\/\/|\/|assets\/|images\/)/i.test(raw) ? raw.replace(/["()\\\s]/g, c => encodeURIComponent(c)) : '';
  if (src) {
    const o = Number(st.overlay || 0);
    const veil = o ? `linear-gradient(${mix('var(--st-bg)', o, 'transparent')},${mix('var(--st-bg)', o, 'transparent')}),` : '';
    out.push(`background-image:${veil}url("${src}")`, 'background-size:cover', 'background-position:center');
  }
  return out.join(';');
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

/** Sections from a template's [templateId, overrides] list (unknown ids skipped) */
export function starterSections(list = []) {
  const out = [];
  for (const [id, o] of list) {
    const sec = newPageSection(id, out);
    if (!sec) continue;
    sec.state = withOverrides(sectionTemplateById(id), sec.state, o);
    out.push(sec);
  }
  return out;
}

/** A new page built from a website template (its home page; site.js adds the other pages) */
export function pageFromStarter(starterId) {
  const st = websiteTemplateById(starterId);
  if (!st) return emptyPage();
  const page = emptyPage(st.name);
  const preset = st.preset && THEME_PRESETS.find(p => p.id === st.preset);
  if (preset) page.theme = { ...page.theme, ...Object.fromEntries(THEME_COLORS.map(c => [c.key, preset[c.key]])) };
  if (st.theme) page.theme = { ...page.theme, ...st.theme };
  page.fonts = { ...page.fonts, ...(st.fonts || {}) };
  page.sections = starterSections(st.sections);
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
      .map(s => {
        const t = sectionTemplateById(s?.tpl);
        if (!t) return null;
        const style = cleanSectionStyle(s.style);
        return { uid: s.uid || newUid(), tpl: t.id, anchor: cleanAnchor(s.anchor), state: restoreSectionState(t, s.state), ...(style ? { style } : {}) };
      })
      .filter(Boolean),
  };
}

/** The state a section renders with on the page (page theme, fonts and motion win) */
export const sectionOnPage = (page, s) => ({ ...s.state, theme: page.theme, fonts: page.fonts, motion: page.motion });

const pageTemplates = page => page.sections.map(s => sectionTemplateById(s.tpl)).filter(Boolean);
const THEME_HOLDER = { theme: {}, fonts: {} };

/** CSS for the whole page: theme tokens and base once, each template's CSS once (sizes
    scaled by the page theme's Sizes settings) */
export function pageCss(page, { fontFaces = '' } = {}) {
  const seen = new Set();
  const parts = [fontFaces, themeCss(THEME_HOLDER, { theme: page.theme, fonts: page.fonts }), scaleCss(BASE_CSS, page.theme)];
  for (const t of pageTemplates(page)) if (!seen.has(t.id)) { seen.add(t.id); parts.push(`/* ${t.name} */\n${scaleCss(t.css, page.theme)}`); }
  return parts.filter(Boolean).join('\n');
}

/** Every section's markup, in order. imageSrc(uid, key) resolves uploaded images. */
export function pageMarkup(page, { imageSrc, clean = true } = {}) {
  return page.sections.map(s => {
    const t = sectionTemplateById(s.tpl);
    if (!t) return '';
    const src = imageSrc ? k => imageSrc(s.uid, k) : undefined;
    const id = cleanAnchor(s.anchor);
    const css = sectionStyleCss(page, s, imageSrc);
    return `<section${id ? ` id="${id}"` : ''} class="st st-${t.id}"${css ? ` style="${esc(css)}"` : ''} data-uid="${esc(s.uid)}">\n${fillHtml(t, sectionOnPage(page, s), { imageSrc: src, clean })}\n</section>`;
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

/** Document-level CSS every page needs before the section CSS */
export const pageBaseCss = page => `body{margin:0;background:${page.theme?.bg || '#fff'}}
html{scroll-behavior:smooth}section[id]{scroll-margin-top:84px}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}`;

/**
 * The complete page as one HTML document.
 * @param imageSrc  (uid, key) => url   uploaded images (data URLs, images/… or blob: in the preview)
 * @param clean     strip editor bindings (exports)
 * @param motion    include the entrance animation runtime
 * Multi-page sites (site.js) also pass:
 * @param title       the <title> (default: page.name)
 * @param canonical   absolute URL for <link rel="canonical">
 * @param stylesheet  href of a shared stylesheet, used instead of an inline <style>
 * @param script      src of a shared script, used instead of an inline <script>
 * @param cdnUrls     GSAP URLs to load (default: what this page needs)
 */
export function pageDocumentHtml(page, { imageSrc, clean = true, fontFaces = '', extraHead = '', motion = true, description = '', title, canonical = '', stylesheet = '', script = '', cdnUrls } = {}) {
  const gf = googleFontsUrl(THEME_HOLDER, { fonts: page.fonts });
  const js = script ? '' : pageScript(page, { motion });
  const cdn = cdnUrls || (js ? pageCdn(page, { motion }) : []);
  const libs = cdn.map(u => `<script src="${u}"></script>`).join('\n');
  const scripts = script ? `${libs ? `${libs}\n` : ''}<script src="${esc(script)}"></script>\n` : js ? `${libs}\n<script>\n${js}\n</script>\n` : '';
  const styles = stylesheet ? `<link rel="stylesheet" href="${esc(stylesheet)}">` : `<style>\n${pageBaseCss(page)}\n${pageCss(page, { fontFaces })}\n</style>`;
  const doc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title || page.name || 'My website')}</title>
${description ? `<meta name="description" content="${esc(description)}">\n` : ''}${canonical ? `<link rel="canonical" href="${esc(canonical)}">\n` : ''}<!-- Built with the free Website Builder · https://webdevpuneet.com/website-builder/ -->
${gf ? `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="${gf}" rel="stylesheet">\n` : ''}${clean ? pageSchema(page) : ''}${styles}${extraHead}
</head>
<body>
${pageMarkup(page, { imageSrc, clean })}
${scripts}</body>
</html>
`;
  // Exports are indented like hand-written HTML (the builder preview isn't, it's never read)
  return clean ? formatHtml(doc) : doc;
}
