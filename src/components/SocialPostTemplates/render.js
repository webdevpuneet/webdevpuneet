/* Rendering core for social post templates: mounts a template into a shadow root,
   fits text, and exports it as an image or a standalone HTML file.

   Image export: the template DOM is serialised into an SVG <foreignObject> together
   with its CSS and base64-embedded fonts, drawn onto a canvas, then saved. An SVG used
   as an image can't reach the page's fonts or any external file, which is why fonts
   are inlined and uploads are kept as data URLs. */

import { BASE_CSS, sizeById, richText } from './templates/index.js';
import { canvasToBlob } from '../OgImageGenerator/utils';
import { resolveFont, fontStack as anyFontStack, ensureFont, googleCssUrl, customFontFaceCss } from '../../lib/fonts';

// Built-in, any Google Font ('g:…') or an uploaded font ('c:…'): see src/lib/fonts.js
export const fontById = resolveFont;
export const fontStack = anyFontStack;

export function defaultState(t) {
  return {
    size: t.defaultSize || 'portrait',
    fields: Object.fromEntries(t.fields.filter(f => f.type !== 'image').map(f => [f.key, f.value || ''])),
    images: {},
    vars: Object.fromEntries(t.vars.map(v => [v.key, v.value])),
    fonts: { ...t.fonts },
  };
}

/* Carousel tokens in any text field: {n} slide number, {nn} two-digit, {total} slide count */
export function fillTokens(text, state) {
  const n = state.slideNo || 1, total = state.slideTotal || 1;
  return String(text ?? '').replace(/\{nn\}/g, String(n).padStart(2, '0')).replace(/\{n\}/g, String(n)).replace(/\{total\}/g, String(total));
}

/* Photo crop: scales each photo to cover its frame times its zoom, then positions it.
   Uses the photo's real size (stored at upload) and the frame's laid-out size, so it is
   called after fitText (text fitting can change a frame's height). */
export function layoutImages(root, state) {
  root.querySelectorAll('[data-image]').forEach(el => {
    const key = el.dataset.image;
    const pos = state.imagePos?.[key];
    const dims = state.imageDims?.[key];
    if (!el.classList.contains('has-img') || el.dataset.imageFit === 'contain' || (!pos && !dims)) {
      el.style.backgroundSize = '';
      el.style.backgroundPosition = '';
      return;
    }
    const zoom = Math.max(1, pos?.zoom || 1);
    const bw = el.clientWidth, bh = el.clientHeight;
    if (dims && bw && bh) {
      const k = Math.max(bw / dims.w, bh / dims.h) * zoom;
      el.style.backgroundSize = `${(dims.w * k).toFixed(1)}px ${(dims.h * k).toFixed(1)}px`;
    }
    el.style.backgroundPosition = `${pos?.x ?? 50}% ${pos?.y ?? 50}%`;
  });
}

const usedFonts = (t, state) => [...new Set([state.fonts.heading, state.fonts.body, ...(t.extraFonts || [])])];
// Fonts served by Google (built-in picks and any 'g:' font); uploaded fonts are inlined instead
const googleFamilies = (t, state) => usedFonts(t, state).map(fontById).filter(f => f.family && f.kind !== 'custom');
const uploadedFontCss = (t, state) => {
  const css = customFontFaceCss(usedFonts(t, state));
  return css ? `${css}\n\n` : '';
};

/** Loads every web font the design uses (Google and uploaded). */
export function loadFonts(t, state) {
  return Promise.all(usedFonts(t, state).map(ensureFont)).then(() => (typeof document !== 'undefined' ? document.fonts.ready : null));
}

function rootVars(state) {
  const z = sizeById(state.size);
  const v = {
    width: `${z.w}px`,
    height: `${z.h}px`,
    '--u': `${Math.min(z.w, z.h) / 100}px`,
    '--safe-top': `${z.safeTop || 0}px`,
    '--safe-bottom': `${z.safeBottom || 0}px`,
    '--font-heading': fontStack(state.fonts.heading),
    '--font-body': fontStack(state.fonts.body),
  };
  Object.entries(state.vars).forEach(([k, val]) => { v[`--${k}`] = val; });
  return v;
}

// Editor-only affordances; never part of the export (export uses its own <style>)
const EDITOR_CSS = `
.spt [contenteditable]{cursor:text}
.spt [contenteditable]:hover{outline:calc(var(--u)*.35) dashed rgba(99,102,241,.75);outline-offset:calc(var(--u)*.8)}
.spt [contenteditable]:focus{outline:calc(var(--u)*.35) solid #6366f1;outline-offset:calc(var(--u)*.8)}
.spt [data-image].spt-pick{cursor:pointer}
.spt [data-image].has-img.spt-pick{cursor:grab}
.spt [data-image].has-img.spt-pick:active{cursor:grabbing}
.spt [data-image].spt-pick:hover{outline:calc(var(--u)*.35) dashed rgba(99,102,241,.75);outline-offset:calc(-1*var(--u)*.35)}`;

/** Mounts (or updates) a template in a shadow root and returns its .spt root element. */
export function mountTemplate(shadow, t, state, { editable = false } = {}) {
  let root = shadow.querySelector('.spt');
  if (!root || root.dataset.tpl !== t.id || root.dataset.editable !== String(editable)) {
    shadow.innerHTML = `<style>${BASE_CSS}${t.css}${editable ? EDITOR_CSS : ''}</style><div class="spt" data-tpl="${t.id}" data-editable="${editable}">${t.html}</div>`;
    root = shadow.querySelector('.spt');
    if (editable) {
      root.querySelectorAll('[data-edit]').forEach(el => {
        // plaintext-only keeps pasted formatting out; older browsers throw and get 'true'
        try { el.contentEditable = 'plaintext-only'; } catch { el.contentEditable = 'true'; }
        el.spellcheck = false;
      });
      root.querySelectorAll('[data-image]').forEach(el => el.classList.add('spt-pick'));
    }
  }
  // A size with a `shape` also gets that shape's class, so it reuses those layout rules
  const sz = sizeById(state.size);
  root.className = `spt is-${sz.id}${sz.shape ? ` is-${sz.shape}` : ''}`;
  root.setAttribute('style', Object.entries(rootVars(state)).map(([k, v]) => `${k}:${v}`).join(';'));
  const active = shadow.activeElement;
  root.querySelectorAll('[data-edit]').forEach(el => {
    if (el === active) return; // don't fight the caret while the user types in place
    el.innerHTML = richText(fillTokens(state.fields[el.dataset.edit] ?? '', state));
  });
  root.querySelectorAll('[data-image]').forEach(el => {
    const src = state.images[el.dataset.image];
    if (src) { el.style.backgroundImage = `url("${src}")`; el.classList.add('has-img'); }
    else { el.style.backgroundImage = ''; el.classList.remove('has-img'); }
  });
  return root;
}

/* Shrinks every [data-fit] element together until its [data-fit-box] stops
   overflowing, keeping the template's type hierarchy. */
export function fitText(root) {
  const els = [...root.querySelectorAll('[data-fit]')];
  if (!els.length) return;
  els.forEach(el => { el.style.fontSize = ''; });
  const boxes = [...new Set(els.map(el => el.closest('[data-fit-box]') || root))];
  const over = () => boxes.some(b => b.scrollHeight > b.clientHeight + 1) || els.some(el => el.scrollWidth > el.clientWidth + 1);
  if (!over()) return;
  const base = els.map(el => parseFloat(getComputedStyle(el).fontSize) || 16);
  let k = 1;
  for (let i = 0; i < 45 && over(); i++) {
    k *= 0.95;
    els.forEach((el, j) => { el.style.fontSize = `${Math.max(9, base[j] * k).toFixed(1)}px`; });
  }
}

/* ── Fonts for export ───────────────────────────────────────────────────────── */
const dataUrlCache = new Map();
function toDataUrl(url) {
  if (!dataUrlCache.has(url)) {
    dataUrlCache.set(url, fetch(url).then(r => r.blob()).then(b => new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result);
      fr.onerror = rej;
      fr.readAsDataURL(b);
    })));
  }
  return dataUrlCache.get(url);
}
const fontCssCache = new Map();
function embeddedFontCss(ids) {
  return Promise.all(ids.map(id => {
    const f = fontById(id);
    if (f.kind === 'custom') return customFontFaceCss([id]); // already a data URL
    if (!f.family) return '';
    if (!fontCssCache.has(id)) {
      fontCssCache.set(id, (async () => {
        try {
          const css = await (await fetch(googleCssUrl([f], 'block'))).text();
          // Latin subsets only: enough for English and most European text, and far smaller
          const all = [...css.matchAll(/\/\*\s*([\w-]+|\[\d+\])\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)];
          const latin = all.filter(m => m[1] === 'latin' || m[1] === 'latin-ext');
          // Fonts without a Latin subset (e.g. Japanese or Thai families) keep every subset
          const blocks = (latin.length ? latin : all).map(m => m[2]);
          if (!blocks.length) blocks.push(...(css.match(/@font-face\s*\{[^}]*\}/g) || []));
          const out = await Promise.all(blocks.map(async b => {
            const u = /url\(([^)]+)\)/.exec(b);
            if (!u) return '';
            return b.replace(u[0], `url(${await toDataUrl(u[1].replace(/['"]/g, ''))})`);
          }));
          return out.join('\n');
        } catch { return ''; } // offline: the export falls back to system fonts
      })());
    }
    return fontCssCache.get(id);
  })).then(parts => parts.join('\n'));
}

const isSafari = () => typeof navigator !== 'undefined' && /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);

async function rasterize(root, t, z, fontCss) {
  const wrap = document.createElement('div');
  const style = document.createElement('style');
  style.textContent = fontCss + BASE_CSS + t.css;
  wrap.appendChild(style);
  const clone = root.cloneNode(true);
  clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
  clone.querySelectorAll('.spt-pick').forEach(el => el.classList.remove('spt-pick'));
  wrap.appendChild(clone);
  const xhtml = new XMLSerializer().serializeToString(wrap);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${z.w}" height="${z.h}" viewBox="0 0 ${z.w} ${z.h}"><foreignObject x="0" y="0" width="${z.w}" height="${z.h}">${xhtml}</foreignObject></svg>`;
  const img = new Image();
  img.width = z.w;
  img.height = z.h;
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await img.decode();
  const canvas = document.createElement('canvas');
  canvas.width = z.w;
  canvas.height = z.h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, z.w, z.h);
  if (isSafari()) {
    // Safari can paint an SVG image before its embedded fonts/images decode: draw again
    await new Promise(r => setTimeout(r, 180));
    ctx.clearRect(0, 0, z.w, z.h);
    ctx.drawImage(img, 0, 0, z.w, z.h);
  }
  return canvas;
}

/** Renders the design at its real pixel size and returns an image Blob. */
export async function renderImage(t, state, { format = 'png', quality = 0.92 } = {}) {
  await loadFonts(t, state);
  const z = sizeById(state.size);
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:-30000px;top:0;pointer-events:none;';
  document.body.appendChild(host);
  try {
    const root = mountTemplate(host.attachShadow({ mode: 'open' }), t, state);
    fitText(root);
    layoutImages(root, state);
    const fontCss = await embeddedFontCss(usedFonts(t, state));
    const canvas = await rasterize(root, t, z, fontCss);
    return await canvasToBlob(canvas, format, quality);
  } finally {
    host.remove();
  }
}


/** HTML + CSS for a My Code snippet (fonts via @import, since My Code loads CDN
    URLs ending in .css as stylesheets and anything else as a script). */
export function snippetParts(t, state, { includeImages = true } = {}) {
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:-30000px;top:0;pointer-events:none;';
  document.body.appendChild(host);
  try {
    const root = mountTemplate(host.attachShadow({ mode: 'open' }), t, state);
    fitText(root);
    layoutImages(root, state);
    const clone = root.cloneNode(true);
    if (!includeImages) {
      clone.querySelectorAll('[data-image]').forEach(el => { el.style.backgroundImage = ''; el.classList.remove('has-img'); });
    }
    const z = sizeById(state.size);
    const families = googleFamilies(t, state);
    const html = `<!-- ${t.name} v${t.version} · ${z.label} ${z.w}×${z.h} · https://webdevpuneet.com/social-post-templates/${t.id}/ -->\n${clone.outerHTML.replace(/></g, '>\n<')}\n`;
    const css = `${families.length ? `@import url('${googleCssUrl(families)}');\n\n` : ''}${uploadedFontCss(t, state)}/* The post is ${z.w}×${z.h}px: the preview pane scrolls if it is narrower */\nbody{margin:0;padding:24px;min-height:100vh;display:grid;place-items:center;background:#e5e7eb;box-sizing:border-box}\n${BASE_CSS.trim()}\n\n${t.css}\n`;
    return { html, css };
  } finally {
    host.remove();
  }
}

/** A single self-contained HTML file of the design (Google Fonts linked, CSS inline). */
export function standaloneHtml(t, state, { includeImages = true } = {}) {
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:-30000px;top:0;pointer-events:none;';
  document.body.appendChild(host);
  try {
    const root = mountTemplate(host.attachShadow({ mode: 'open' }), t, state);
    fitText(root);
    layoutImages(root, state);
    const clone = root.cloneNode(true);
    if (!includeImages) {
      clone.querySelectorAll('[data-image]').forEach(el => { el.style.backgroundImage = ''; el.classList.remove('has-img'); });
    }
    const z = sizeById(state.size);
    const families = googleFamilies(t, state);
    const fontLink = families.length
      ? `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="${googleCssUrl(families)}">\n`
      : '';
    const body = clone.outerHTML.replace(/></g, '>\n<');
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t.name} — ${z.w}×${z.h}</title>
<!-- ${t.name} v${t.version} · ${z.label} ${z.w}×${z.h} · https://webdevpuneet.com/social-post-templates/${t.id}/ -->
${fontLink}<style>
${uploadedFontCss(t, state)}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#e5e7eb}
${BASE_CSS.trim()}
${t.css}
</style>
</head>
<body>
${body}
</body>
</html>
`;
  } finally {
    host.remove();
  }
}
