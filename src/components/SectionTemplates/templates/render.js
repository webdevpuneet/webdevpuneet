/* State -> HTML/CSS for section templates. Plain string code (no DOM), so the editor,
   the server-rendered template pages (code for crawlers) and scripts/capture-section-
   previews.mjs all build exactly the same markup.

   Bindings in a section's html (see TEMPLATES-ROADMAP.html):
     data-edit="key"   empty element, filled with the field's rich text
     data-href="key"   <a> gets href from a link field
     data-image="key"  <img> gets src (and alt from `${key}Alt`) from an image field
     data-bg="key"     element gets a background-image from an image field
     data-show="key"   element is removed when that toggle is off
     data-show-if="key" element is removed when that field is empty (optional buttons)
     data-optional     on data-image / data-bg: removed instead of a placeholder when empty */

import { DEFAULT_THEME, BASE_CSS, richText, esc, safeUrl, MOTION_PRESETS, DEFAULT_MOTION, GSAP_CDN } from './meta.js';
import { resolveFont, googleCssUrl } from '../../../lib/fonts.js';

/* Neutral placeholder for an empty image slot (keeps the layout's shape) */
export const PLACEHOLDER_IMG = `data:image/svg+xml;base64,${typeof btoa === 'function'
  ? btoa('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#e2e8f0"/><path d="M470 520l110-140 90 110 60-70 100 100z" fill="#cbd5e1"/><circle cx="520" cy="330" r="40" fill="#cbd5e1"/></svg>')
  : Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#e2e8f0"/><path d="M470 520l110-140 90 110 60-70 100 100z" fill="#cbd5e1"/><circle cx="520" cy="330" r="40" fill="#cbd5e1"/></svg>').toString('base64')}`;

const VOID = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'source']);

/* Removes the element whose opening tag starts at `start` (nesting-aware for same-name tags) */
function removeElementAt(html, start) {
  const open = /^<([a-z0-9]+)\b[^>]*>/i.exec(html.slice(start));
  if (!open) return html;
  const tag = open[1].toLowerCase();
  const afterOpen = start + open[0].length;
  if (VOID.has(tag) || open[0].endsWith('/>')) return html.slice(0, start) + html.slice(afterOpen);
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
  re.lastIndex = afterOpen;
  let depth = 1, m;
  while ((m = re.exec(html))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return html.slice(0, start) + html.slice(re.lastIndex);
  }
  return html.slice(0, start);
}

/* Removes every element whose opening tag matches `test(attrs)` */
function removeWhere(html, attrRe, test) {
  let out = html;
  for (let guard = 0; guard < 200; guard++) {
    const re = new RegExp(`<[a-z0-9]+\\b[^>]*${attrRe.source}[^>]*>`, 'gi');
    let m, found = -1;
    while ((m = re.exec(out))) { if (test(m[0])) { found = m.index; break; } }
    if (found < 0) break;
    out = removeElementAt(out, found);
  }
  return out;
}

const attr = (tag, name) => (new RegExp(`\\b${name}="([^"]*)"`).exec(tag) || [])[1];

/** Full theme for a section (template defaults + the user's overrides) */
export const themeOf = (t, state) => ({ ...DEFAULT_THEME, ...(t.theme || {}), ...(state?.theme || {}) });
export const fontsOf = (t, state) => ({ heading: 'inter', body: 'inter', ...(t.fonts || {}), ...(state?.fonts || {}) });

const stack = id => { const f = resolveFont(id); return f.family ? `"${f.family}", ${f.fallback}` : f.stack; };

/** CSS custom properties for the theme and fonts, as one `.st{…}` rule */
export function themeCss(t, state) {
  const th = themeOf(t, state), fo = fontsOf(t, state);
  const num = (v, d) => (Number.isFinite(parseFloat(v)) ? parseFloat(v) : d);
  return `.st{--st-brand:${th.brand};--st-btn-text:${th.brandText};--st-bg:${th.bg};--st-surface:${th.surface};--st-text:${th.text};--st-muted:${th.muted};--st-radius:${num(th.radius, 14)};--st-max:${num(th.maxWidth, 1200)};--st-font-heading:${stack(fo.heading)};--st-font-body:${stack(fo.body)}}`;
}

/** Google Fonts stylesheet URL for the section's fonts (null when none are Google fonts) */
export function googleFontsUrl(t, state) {
  const fo = fontsOf(t, state);
  const list = [...new Set([fo.heading, fo.body])].map(resolveFont).filter(f => f.family && (f.kind === 'builtin' || f.kind === 'google'));
  return list.length ? googleCssUrl(list) : null;
}
/** Uploaded (c:) font ids the section uses */
export const customFontIds = (t, state) => [...new Set(Object.values(fontsOf(t, state)))].filter(id => String(id).startsWith('c:'));

/**
 * Section inner HTML with every binding filled.
 * @param imageSrc  (key, field) => url | ''   where uploaded images come from (blob:, data: or images/…)
 * @param clean     strip the data-* binding attributes (exports)
 * @param edit      keep data-edit markers for click-to-edit (editor preview)
 */
export function fillHtml(t, state, { imageSrc, clean = false } = {}) {
  const f = state.fields || {}, on = state.toggles || {};
  const fieldOf = key => t.fields.find(x => x.key === key);
  const src = key => {
    const own = imageSrc ? imageSrc(key, fieldOf(key)) : '';
    return own || String(f[key] ?? '').trim();
  };
  let html = t.html;

  // Toggles: drop switched-off parts (and empty optional images)
  html = removeWhere(html, /data-show="/, tag => on[attr(tag, 'data-show')] === false);
  html = removeWhere(html, /data-show-if="/, tag => !String(f[attr(tag, 'data-show-if')] ?? '').trim());
  html = removeWhere(html, /data-optional/, tag => {
    const key = attr(tag, 'data-image') || attr(tag, 'data-bg');
    return key ? !src(key) : false;
  });

  // Text
  html = html.replace(/<([a-z0-9]+)\b([^>]*\bdata-edit="([^"]+)"[^>]*)>\s*<\/\1>/gi,
    (m, tag, attrs, key) => `<${tag}${attrs}>${richText(f[key] ?? '')}</${tag}>`);
  // Links
  html = html.replace(/<a\b([^>]*\bdata-href="([^"]+)"[^>]*)>/gi,
    (m, attrs, key) => `<a${attrs.replace(/\s+href="[^"]*"/, '')} href="${esc(safeUrl(f[key]))}">`);
  // Images
  html = html.replace(/<img\b([^>]*\bdata-image="([^"]+)"[^>]*)>/gi, (m, attrs, key) => {
    const url = src(key);
    const alt = f[`${key}Alt`] ?? attr(m, 'alt') ?? '';
    const rest = attrs.replace(/\s+(src|alt)="[^"]*"/g, '');
    return `<img${rest} src="${esc(url ? safeUrl(url) : PLACEHOLDER_IMG)}" alt="${esc(alt)}">`;
  });
  // Background images
  html = html.replace(/<([a-z0-9]+)\b([^>]*\bdata-bg="([^"]+)"[^>]*)>/gi, (m, tag, attrs, key) => {
    const url = src(key);
    const css = `background-image:url('${(url ? safeUrl(url) : PLACEHOLDER_IMG).replace(/'/g, '%27')}')`;
    const styled = /\sstyle="/.test(attrs) ? attrs.replace(/\sstyle="([^"]*)"/, (s, v) => ` style="${v};${css}"`) : `${attrs} style="${css}"`;
    return `<${tag}${styled}>`;
  });

  if (clean) html = html.replace(/\s+data-(edit|href|image|bg|show-if|show|optional)(="[^"]*")?/g, '');
  return html.trim();
}

/* ── Motion (GSAP + ScrollTrigger) ──────────────────────────────────────────── */
export const motionOf = state => ({ ...DEFAULT_MOTION, ...(state?.motion || {}) });

/** The animation script for a section's [data-anim] elements ('' when motion is off).
    Content is visible without it: the hidden "from" state is only applied by GSAP. */
export function motionScript(state) {
  const m = motionOf(state);
  const p = MOTION_PRESETS.find(x => x.id === m.preset);
  if (!p || !p.item) return '';
  const sp = Math.max(0.4, Math.min(2, parseFloat(m.speed) || 1));
  const item = JSON.stringify({ ...p.item, stagger: +(0.09 * sp).toFixed(3), clearProps: 'transform,opacity' });
  const media = JSON.stringify({ ...p.media, duration: +(1.1 * sp).toFixed(2), clearProps: 'transform,opacity' });
  return `(function () {
  if (!window.gsap) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.st').forEach(function (section) {
    var items = section.querySelectorAll('[data-anim="item"]');
    var media = section.querySelectorAll('[data-anim="media"]');
    var tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: ${(0.8 * sp).toFixed(2)} },
      scrollTrigger: window.ScrollTrigger ? { trigger: section, start: 'top 80%', once: true } : undefined
    });
    if (items.length) tl.from(items, ${item});
    if (media.length) tl.from(media, ${media}, items.length ? '<0.15' : 0);
  });
})();`;
}
/** <script> tags for the motion runtime ('' when motion is off) */
export function motionTags(state) {
  const js = motionScript(state);
  if (!js) return '';
  const libs = GSAP_CDN.map(u => `<script src="${u}"></script>`).join('\n');
  return `${libs}\n<script>\n${js}\n</script>\n`;
}

/** The whole section element (what goes in a page) */
export const sectionMarkup = (t, state, opts) => `<section class="st st-${t.id}">\n${fillHtml(t, state, opts)}\n</section>`;

/** Every CSS rule the section needs: theme tokens, base styles, the section's own CSS */
export const sectionCss = (t, state, { fontFaces = '' } = {}) => [fontFaces, themeCss(t, state), BASE_CSS, t.css].filter(Boolean).join('\n');

/**
 * A complete standalone HTML document.
 * @param fontFaces  @font-face CSS for uploaded fonts (browser only; lib/fonts customFontFaceCss)
 * @param extraHead  extra tags for the head (the editor preview adds its helpers)
 * @param motion     include the GSAP animation runtime (off for static screenshots)
 */
export function documentHtml(t, state, { imageSrc, clean = true, fontFaces = '', extraHead = '', title, motion = true } = {}) {
  const gf = googleFontsUrl(t, state);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title || t.name)}</title>
<!-- ${t.name} v${t.version} · https://webdevpuneet.com/website-section-templates/${t.id}/ -->
${gf ? `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="${gf}" rel="stylesheet">\n` : ''}<style>
body{margin:0}
${sectionCss(t, state, { fontFaces })}
</style>${extraHead}
</head>
<body>
${sectionMarkup(t, state, { imageSrc, clean })}
${motion ? motionTags(state) : ''}</body>
</html>
`;
}

/** { title, html, css, js } for lib/snippet-exporters.js (React, Vue, Tailwind) */
export function snippetParts(t, state, { imageSrc, fontFaces = '' } = {}) {
  const gf = googleFontsUrl(t, state);
  return {
    id: t.id,
    title: t.name.replace(/[^\w ]/g, ''),
    html: sectionMarkup(t, state, { imageSrc, clean: true }),
    css: `${gf ? `@import url('${gf}');\n` : ''}${sectionCss(t, state, { fontFaces })}`,
    js: motionScript(state),
    cdnUrls: motionScript(state) ? [...GSAP_CDN] : [],
  };
}
