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
     data-hide-if="key" element is removed when that field is NOT empty (e.g. a default
                       price suffix that a plan's own note replaces)
     data-optional     on data-image / data-bg: removed instead of a placeholder when empty
     data-icon="key"   empty element, filled with the icon's inline SVG (templates/icons.js)
     data-lines="key"  empty <ul>/<ol>, one <li> per non-empty line of the field
     data-links="key"  empty <ul>/<ol>, one <li><a> per line written "Label | URL"
     data-set="attr:key;attr:key"  sets attributes from fields (e.g. a form's action, an
                       input's name and placeholder); href/src/action go through safeUrl
     data-list="key"   repeatable items: the element's first child is the item template,
                       rendered once per item in state.lists[key]; bindings inside it read
                       the item's own fields
     data-anim-text    a heading the GSAP SplitText text effect animates (motion.text) */

import { DEFAULT_THEME, BASE_CSS, richText, esc, safeUrl, MOTION_PRESETS, DEFAULT_MOTION, TEXT_EFFECTS, gsapCdn } from './meta.js';
import { iconSvg } from './icons.js';
import { behaviorPlugins, behaviorScript } from './behaviors.js';
import { resolveFont, googleCssUrl } from '../../../lib/fonts.js';

/* Neutral placeholder for an empty image slot (keeps the layout's shape) */
export const PLACEHOLDER_IMG = `data:image/svg+xml;base64,${typeof btoa === 'function'
  ? btoa('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#e2e8f0"/><path d="M470 520l110-140 90 110 60-70 100 100z" fill="#cbd5e1"/><circle cx="520" cy="330" r="40" fill="#cbd5e1"/></svg>')
  : Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#e2e8f0"/><path d="M470 520l110-140 90 110 60-70 100 100z" fill="#cbd5e1"/><circle cx="520" cy="330" r="40" fill="#cbd5e1"/></svg>').toString('base64')}`;

const VOID = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'source']);

/* Where the element whose opening tag starts at `start` ends (nesting-aware for same-name
   tags): { openEnd, closeStart, end } */
function elementBounds(html, start) {
  const open = /^<([a-z0-9]+)\b[^>]*>/i.exec(html.slice(start));
  if (!open) return null;
  const tag = open[1].toLowerCase();
  const openEnd = start + open[0].length;
  if (VOID.has(tag) || open[0].endsWith('/>')) return { openEnd, closeStart: openEnd, end: openEnd };
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
  re.lastIndex = openEnd;
  let depth = 1, m;
  while ((m = re.exec(html))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return { openEnd, closeStart: m.index, end: re.lastIndex };
  }
  return { openEnd, closeStart: html.length, end: html.length };
}

/* Removes the element whose opening tag starts at `start` */
function removeElementAt(html, start) {
  const b = elementBounds(html, start);
  return b ? html.slice(0, start) + html.slice(b.end) : html;
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
  const lists = state.lists || {};
  let html = t.html;

  // Toggles first, so switched-off lists are not rendered at all
  html = removeWhere(html, /data-show="/, tag => (state.toggles || {})[attr(tag, 'data-show')] === false);

  // Repeatable lists: the first child element is the item template
  const listRe = /<[a-z0-9]+\b[^>]*\bdata-list="([^"]+)"[^>]*>/gi;
  for (let m, from = 0; (listRe.lastIndex = from, m = listRe.exec(html));) {
    const key = m[1];
    const b = elementBounds(html, m.index);
    const inner = html.slice(b.openEnd, b.closeStart);
    const first = inner.search(/<[a-z]/i);
    const ib = first < 0 ? null : elementBounds(inner, first);
    const itemTpl = ib ? inner.slice(first, ib.end) : '';
    const items = Array.isArray(lists[key]) ? lists[key] : [];
    // An item reads its own fields first, then the section's (e.g. a shared price suffix)
    const rendered = items.map(it => fillFragment(itemTpl, { ...(state.fields || {}), ...it }, {
      src: k => (imageSrc ? imageSrc(`${key}.${it._id}.${k}`) : '') || String(it[k] ?? '').trim(),
    })
      // Mark item bindings as done, so the section-level pass never refills an empty one
      .replace(/\sdata-(edit|href|image|bg|icon|lines|links|set|show-if|hide-if|optional)(?==|[\s>])/g, ' data-i-$1')
      // Editor preview: the item's root says which item it is (click-to-edit)
      .replace(/^(\s*<[a-z0-9]+)/i, clean ? '$1' : `$1 data-item="${esc(key)}.${esc(it._id)}"`)).join('\n');
    const open = html.slice(m.index, b.openEnd).replace(/\sdata-list="/, ' data-list-done="');
    html = html.slice(0, m.index) + open + (rendered ? `\n${rendered}\n` : '') + html.slice(b.closeStart);
    from = m.index + open.length;
  }

  const f = state.fields || {};
  const fieldOf = key => t.fields.find(x => x.key === key);
  html = fillFragment(html, f, {
    src: key => (imageSrc ? imageSrc(key, fieldOf(key)) : '') || String(f[key] ?? '').trim(),
  });

  if (clean) html = html.replace(/\s+data-(i-)?(edit|href|image|bg|icon|lines|links|set|show-if|hide-if|show|optional|list-done|item)(="[^"]*")?/g, '');
  else html = html.replace(/\sdata-list-done="/g, ' data-list="');
  return html.trim();
}

/* Fills every binding in a piece of HTML from one set of values (the section's fields, or
   one list item's fields). `src(key)` gives an image field's URL (upload or typed). */
function fillFragment(html, f, { src }) {
  html = removeWhere(html, /data-show-if="/, tag => !String(f[attr(tag, 'data-show-if')] ?? '').trim());
  html = removeWhere(html, /data-hide-if="/, tag => !!String(f[attr(tag, 'data-hide-if')] ?? '').trim());
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
  // Attributes: data-set="attr:key;attr:key" (URL attributes go through safeUrl)
  html = html.replace(/<([a-z0-9]+)\b([^>]*\bdata-set="([^"]+)"[^>]*)>/gi, (m, tag, attrs, spec) => {
    let out = attrs;
    for (const pair of spec.split(';')) {
      const [name, key] = pair.split(':').map(x => x.trim());
      if (!/^[a-z][a-z0-9-]*$/i.test(name || '') || !key || /^on/i.test(name)) continue;
      const raw = String(f[key] ?? '');
      const val = /^(href|src|action|formaction)$/i.test(name) ? safeUrl(raw) : raw;
      out = out.replace(new RegExp(`\\s${name}="[^"]*"`, 'i'), '') + ` ${name}="${esc(val)}"`;
    }
    return `<${tag}${out}>`;
  });
  // Icons
  html = html.replace(/<([a-z0-9]+)\b([^>]*\bdata-icon="([^"]+)"[^>]*)>\s*<\/\1>/gi,
    (m, tag, attrs, key) => `<${tag}${attrs}>${iconSvg(f[key])}</${tag}>`);
  // Bullet lines
  html = html.replace(/<(ul|ol)\b([^>]*\bdata-lines="([^"]+)"[^>]*)>\s*<\/\1>/gi, (m, tag, attrs, key) => {
    const lines = String(f[key] ?? '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    return `<${tag}${attrs}>${lines.map(l => `<li>${richText(l)}</li>`).join('')}</${tag}>`;
  });
  // Link lists: one "Label | URL" per line (URL optional)
  html = html.replace(/<(ul|ol)\b([^>]*\bdata-links="([^"]+)"[^>]*)>\s*<\/\1>/gi, (m, tag, attrs, key) => {
    const items = String(f[key] ?? '').split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => {
      const at = l.lastIndexOf('|');
      return at < 0 ? [l, '#'] : [l.slice(0, at).trim(), l.slice(at + 1).trim() || '#'];
    });
    return `<${tag}${attrs}>${items.map(([label, url]) => `<li><a href="${esc(safeUrl(url))}">${richText(label)}</a></li>`).join('')}</${tag}>`;
  });
  return html;
}

/* ── Motion (GSAP + ScrollTrigger) ──────────────────────────────────────────── */
export const motionOf = state => ({ ...DEFAULT_MOTION, ...(state?.motion || {}) });

/** The animation script for a section's [data-anim] elements ('' when motion is off).
    Content is visible without it: the hidden "from" state is only applied by GSAP. */
const textEffectOf = m => {
  const e = TEXT_EFFECTS.find(x => x.id === m.text);
  return e && e.split ? e : null;
};

/** GSAP plugins the section's motion needs (ScrollTrigger is always loaded) */
export function motionPlugins(state) {
  const m = motionOf(state);
  const p = MOTION_PRESETS.find(x => x.id === m.preset);
  if (!p || !p.item) return [];
  return textEffectOf(m) ? ['SplitText'] : [];
}
/** CDN script URLs for the motion runtime ([] when motion is off) */
export const motionCdn = state => (motionScript(state) ? gsapCdn(motionPlugins(state)) : []);

/** The animation script for a section's [data-anim] elements ('' when motion is off).
    Content is visible without it: the hidden "from" state is only applied by GSAP. */
export function motionScript(state) {
  const m = motionOf(state);
  const p = MOTION_PRESETS.find(x => x.id === m.preset);
  if (!p || !p.item) return '';
  const sp = Math.max(0.4, Math.min(2, parseFloat(m.speed) || 1));
  const item = JSON.stringify({ ...p.item, stagger: +(0.09 * sp).toFixed(3), clearProps: 'transform,opacity' });
  const media = JSON.stringify({ ...p.media, duration: +(1.1 * sp).toFixed(2), clearProps: 'transform,opacity' });
  const te = textEffectOf(m);
  const text = te ? JSON.stringify({ split: te.split, part: te.part, mask: te.mask || false, vars: { ...te.from, stagger: +(te.stagger * sp).toFixed(3), duration: +(te.duration * sp).toFixed(2) } }) : 'null';
  return `(function () {
  if (!window.gsap) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  var TEXT = window.SplitText ? ${text} : null;
  if (TEXT) gsap.registerPlugin(SplitText);
  function run() {
    document.querySelectorAll('.st').forEach(function (section) {
      var heads = TEXT ? section.querySelectorAll('[data-anim-text]') : [];
      var items = section.querySelectorAll(heads.length ? '[data-anim="item"]:not([data-anim-text])' : '[data-anim="item"]');
      var media = section.querySelectorAll('[data-anim="media"]');
      var tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: ${(0.8 * sp).toFixed(2)} },
        scrollTrigger: window.ScrollTrigger ? { trigger: section, start: 'top 80%', once: true } : undefined
      });
      Array.prototype.forEach.call(heads, function (el, i) {
        var opts = { type: TEXT.split };
        if (TEXT.mask) opts.mask = TEXT.mask;
        var parts = SplitText.create(el, opts)[TEXT.part];
        tl.from(parts, Object.assign({}, TEXT.vars), i ? '<0.1' : 0);
      });
      if (items.length) tl.from(items, ${item}, heads.length ? '<0.2' : 0);
      if (media.length) tl.from(media, ${media}, items.length || heads.length ? '<0.15' : 0);
    });
  }
  // Split text only after the fonts load, so lines break where they finally will
  if (TEXT && document.fonts && document.fonts.ready) document.fonts.ready.then(run); else run();
})();`;
}
/** Every script a section runs: its behaviours (always) and the motion runtime (when on) */
export function sectionScript(t, state, { motion = true } = {}) {
  const behaviors = behaviorScript(t);
  // Static renders: behaviours skip autonomous animation (counters, marquees)
  return [behaviors && !motion ? 'window.ST_STILL = true;' : '', behaviors, motion ? motionScript(state) : ''].filter(Boolean).join('\n');
}
/** CDN URLs those scripts need ([] when there are none) */
export function sectionCdn(t, state, { motion = true } = {}) {
  const anim = motion && motionScript(state);
  const plugins = [...behaviorPlugins(t), ...(anim ? motionPlugins(state) : [])];
  return anim || behaviorScript(t) ? gsapCdn(plugins) : [];
}
/** <script> tags for a section's GSAP libraries, behaviours and motion ('' when none) */
export function sectionScriptTags(t, state, opts) {
  const js = sectionScript(t, state, opts);
  if (!js) return '';
  const libs = sectionCdn(t, state, opts).map(u => `<script src="${u}"></script>`).join('\n');
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
/** Structured data a section provides for search engines (template `schema(state)`), as a
    <script type="application/ld+json"> tag ('' when none) */
export function schemaTag(t, state) {
  const data = typeof t.schema === 'function' ? t.schema(state) : null;
  return data ? `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>\n` : '';
}

export function documentHtml(t, state, { imageSrc, clean = true, fontFaces = '', extraHead = '', title, motion = true } = {}) {
  const gf = googleFontsUrl(t, state);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title || t.name)}</title>
<!-- ${t.name} v${t.version} · https://webdevpuneet.com/website-section-templates/${t.id}/ -->
${gf ? `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="${gf}" rel="stylesheet">\n` : ''}${clean ? schemaTag(t, state) : ''}<style>
body{margin:0}
${sectionCss(t, state, { fontFaces })}
</style>${extraHead}
</head>
<body>
${sectionMarkup(t, state, { imageSrc, clean })}
${sectionScriptTags(t, state, { motion })}</body>
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
    js: sectionScript(t, state),
    cdnUrls: sectionCdn(t, state),
  };
}
