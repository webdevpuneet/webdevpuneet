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
  const lay = state.layout || {};
  root.className = `spt is-${sz.id}${sz.shape ? ` is-${sz.shape}` : ''}${lay.vpos ? ` v-${lay.vpos}` : ''}`;
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
  // Bars driven by a number field (0-100): sets --bar, e.g. the Big Stat chart width.
  // An empty or invalid value hides the bar.
  root.querySelectorAll('[data-bar]').forEach(el => {
    const n = parseFloat(String(state.fields[el.dataset.bar] ?? '').replace(/[^\d.]/g, ''));
    const ok = Number.isFinite(n);
    el.style.setProperty('--bar', ok ? `${Math.max(0, Math.min(100, n))}%` : '0%');
    el.parentElement?.toggleAttribute('hidden', !ok);
  });
  applyTextAlign(root, lay.align || '');
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

/* Layout option "text alignment": moves only text elements ([data-edit]) that sit in a
   vertical stack (parent is a column flex box or a block), so images, photo frames and
   footer rows keep their layout. Call after mountTemplate; '' restores the template's own. */
const ALIGN_SELF = { left: 'flex-start', center: 'center', right: 'flex-end' };
export function applyTextAlign(root, align) {
  root.querySelectorAll('[data-edit]').forEach(el => {
    el.style.removeProperty('text-align');
    el.style.removeProperty('align-self');
    if (!align) return;
    const parent = el.parentElement;
    if (!parent) return;
    const ps = getComputedStyle(parent);
    // Small boxes (date badges, discount circles, option cards) and grids (chips) keep their own alignment
    if (ps.display.includes('grid') || parent.clientWidth < root.clientWidth * 0.5) return;
    const isFlex = ps.display.includes('flex');
    const column = isFlex && ps.flexDirection.startsWith('column');
    if (isFlex && !column) return; // in a row (footer, chips): leave it
    el.style.setProperty('text-align', align, 'important');
    if (column) el.style.setProperty('align-self', ALIGN_SELF[align], 'important');
  });
}

/* ── Animated export (Reels / Stories / feed video) ──────────────────────────────
   Text and images animate in one after another ("rise", "fade" or "pop"), then the
   design holds. Pass 1 renders each frame with the same SVG rasterizer as the PNG
   export (frames after the animation settles reuse one image); pass 2 plays the
   frames at an exact frame rate into MediaRecorder: MP4 where the browser can record
   it (Chrome), otherwise WebM. */
const ease = p => 1 - (1 - p) ** 3;

/* The animation itself, shared by the video export and the live Play preview so what you see
   when you press Play is what the video shows. */
// What animates in, in reading order: text and photo slots that are actually shown
const animItems = root => [...root.querySelectorAll('[data-edit], [data-image]')].filter(el => el.getClientRects().length && (el.dataset.image ? el.classList.contains('has-img') || !el.hasAttribute('data-optional') : el.textContent.trim()));
function animTiming(count) {
  const stagger = Math.min(0.14, 1.6 / Math.max(1, count));
  const dur = 0.65, lead = 0.2;
  return { stagger, dur, lead, settle: lead + stagger * Math.max(0, count - 1) + dur };
}
/* What an animated element starts from, captured before the first frame. `transform` is its own inline
   style (put back at the end); `css` is the transform it already has from the template's CSS (a centring
   translateX(-50%), a tilt), which the animation must keep: setting an inline transform replaces it. */
function animBase(el) {
  const own = el.style.transform;
  const computed = own || getComputedStyle(el).transform;
  return { el, transform: own, css: computed && computed !== 'none' ? computed : '', opacity: el.style.opacity, transition: el.style.transition };
}
/* `base` = [animBase(el), ...] */
function applyAnimFrame(base, time, style, u, { stagger, dur, lead }) {
  base.forEach((b, i) => {
    const it = b.el;
    const p = ease(Math.max(0, Math.min(1, (time - lead - i * stagger) / dur)));
    it.style.transition = 'none';
    it.style.opacity = String(p);
    const base0 = b.css ? `${b.css} ` : '';
    it.style.transform = style === 'fade' ? b.transform
      : style === 'pop' ? `${base0}scale(${(0.82 + 0.18 * p).toFixed(4)})`
      : `${base0}translateY(${((1 - p) * 5 * u).toFixed(2)}px)`;
  });
}
const restoreAnim = base => base.forEach(b => { b.el.style.transform = b.transform; b.el.style.opacity = b.opacity; b.el.style.transition = b.transition; });

/* Theme motion. A template marks any element with data-anim="<motion>" and it moves the way that
   thing would: a flame flickers, a heart beats, a tick is stamped, a number counts up. Optional
   data-at (start, seconds), data-dur and data-origin tune a motion. Everything is a pure function of
   the time, so the live Play preview and the video export show the same thing.
   Motions use the individual CSS properties (translate, rotate, scale) wherever they can, so they
   neither replace a template's own transform nor fight the slot reveal that text and photos get.
   Reveals (play once, in reading order): pop, tick, stamp, draw-x, draw-y, wipe-r, wipe-u, slide-l,
   slide-r, slide-t, slide-b, settle, count, countdown, type.
   Loops: pulse, breathe, wobble, sway, bob, nudge-x, nudge-y, twinkle, blink, spin, fly, burst, fall,
   scroll-bg, flicker, float, drift. */
const clamp01 = x => Math.max(0, Math.min(1, x));
const easeOut = p => 1 - (1 - p) ** 3;
const easeOutBack = p => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * (p - 1) ** 3 + c1 * (p - 1) ** 2; };
const wrapRange = (v, lo, hi) => lo + ((((v - lo) % (hi - lo)) + (hi - lo)) % (hi - lo));
const SAVED_PROPS = ['transform', 'transformOrigin', 'translate', 'rotate', 'scale', 'opacity', 'clipPath', 'backgroundPosition', 'display'];

function parseNumber(str) {
  const m = /(\d[\d,]*(?:\.\d+)?)/.exec(str);
  if (!m) return null;
  const raw = m[1];
  return { start: m.index, end: m.index + raw.length, value: parseFloat(raw.replace(/,/g, '')), decimals: raw.includes('.') ? raw.split('.')[1].length : 0, commas: raw.includes(',') };
}
function formatNumber(v, decimals, commas) {
  const [whole, frac] = v.toFixed(decimals).split('.');
  return (commas ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : whole) + (frac ? `.${frac}` : '');
}

function ambientItems(root) {
  const boxes = new Map(); // fit boxes clip their children (overflow hidden); a moving part that grows or swings must not be cut
  const seen = {}; // `rank`: the n-th visible element of its kind (ticks pop in one after another)
  const items = [...root.querySelectorAll('[data-anim]')].map((el, index) => {
    const kind = el.dataset.anim;
    for (let n = el.parentElement; n && n !== root; n = n.parentElement) if (n.hasAttribute('data-fit-box') && !boxes.has(n)) boxes.set(n, n.style.overflow);
    const visible = el.getClientRects().length > 0;
    const rank = visible ? (seen[kind] = (seen[kind] ?? -1) + 1) : 0;
    const cs = getComputedStyle(el);
    const saved = {};
    SAVED_PROPS.forEach(k => { saved[k] = el.style[k]; });
    if (cs.display === 'inline') el.style.display = 'inline-block'; // transforms don't apply to plain inline text
    if (el.dataset.origin) el.style.transformOrigin = el.dataset.origin;
    const nodes = [];
    if (kind === 'count' || kind === 'countdown' || kind === 'type') {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push({ node: n, text: n.nodeValue });
    }
    const num = (kind === 'count' || kind === 'countdown') ? (() => { const hit = nodes.find(n => /\d/.test(n.text)); return hit ? { hit, ...parseNumber(hit.text) } : null; })() : null;
    return {
      el, kind, rank, index, saved, nodes, num,
      slot: el.hasAttribute('data-edit') || el.hasAttribute('data-image'),
      at: el.dataset.at !== undefined ? parseFloat(el.dataset.at) : null,
      dur: el.dataset.dur !== undefined ? parseFloat(el.dataset.dur) : null,
      top: el.offsetTop, left: el.offsetLeft, W: root.offsetWidth, H: root.offsetHeight,
      baseOpacity: parseFloat(cs.opacity) || 1,
      chars: nodes.reduce((n, x) => n + x.text.length, 0),
    };
  });
  boxes.forEach((_, n) => { n.style.overflow = 'visible'; });
  items.boxes = boxes;
  return items;
}

function applyAmbient(items, time, u = 10) {
  items.forEach(a => {
    const st = a.el.style, ph = a.index * 2.1, r = a.rank, t = time;
    const when = (defAt, perRank, defDur) => clamp01((t - (a.at ?? (defAt + r * perRank))) / (a.dur ?? defDur));
    const opacity = v => { if (!a.slot) st.opacity = String(+v.toFixed(3)); };
    switch (a.kind) {
      // ---- reveals
      case 'tick': case 'pop': { // pops in with a little overshoot
        st.scale = String(+Math.max(0, easeOutBack(when(0.9, 0.32, 0.5))).toFixed(3));
        break;
      }
      case 'stamp': { // lands like a rubber stamp: big, then pressed down
        const p = easeOut(when(0.7, 0.35, 0.45));
        st.scale = String(+(1 + (1 - p) * 0.9).toFixed(3)); st.rotate = `${((1 - p) * -14).toFixed(2)}deg`; opacity(clamp01(p * 4));
        break;
      }
      case 'draw-x': { st.transformOrigin = a.el.dataset.origin || '0 50%'; st.scale = `${easeOut(when(0.5, 0.3, 0.6)).toFixed(3)} 1`; break; }
      case 'draw-y': { st.transformOrigin = a.el.dataset.origin || '50% 0'; st.scale = `1 ${easeOut(when(0.5, 0.3, 0.6)).toFixed(3)}`; break; }
      case 'wipe-r': { st.clipPath = `inset(0 ${((1 - easeOut(when(0.6, 0.3, 1.1))) * 100).toFixed(2)}% 0 0)`; break; }
      case 'wipe-u': { st.clipPath = `inset(${((1 - easeOut(when(0.6, 0.3, 1.1))) * 100).toFixed(2)}% 0 0 0)`; break; }
      case 'slide-l': case 'slide-r': case 'slide-t': case 'slide-b': {
        const d = (1 - easeOut(when(0.5, 0.3, 0.7))) * 34 * u;
        st.translate = a.kind === 'slide-l' ? `${-d}px 0` : a.kind === 'slide-r' ? `${d}px 0` : a.kind === 'slide-t' ? `0 ${-d}px` : `0 ${d}px`;
        break;
      }
      case 'settle': { const p = easeOut(when(0.2, 0, 0.9)); st.scale = String(+(0.93 + 0.07 * p).toFixed(4)); opacity(p); break; }
      case 'count': case 'countdown': {
        if (!a.num) break;
        const p = easeOut(when(a.kind === 'count' ? 0.5 : 0.4, 0, a.kind === 'count' ? 1.4 : 1.8));
        const from = a.kind === 'count' ? 0 : a.num.value + Math.max(3, Math.round(a.num.value * 0.25));
        const v = from + (a.num.value - from) * p;
        const { hit, start, end, decimals, commas } = a.num;
        hit.node.nodeValue = hit.text.slice(0, start) + formatNumber(v, decimals, commas) + hit.text.slice(end);
        break;
      }
      case 'type': { // text types itself out, character by character (stars fill, code is written)
        let left = Math.round(a.chars * easeOut(clamp01((t - (a.at ?? 0.4)) / (a.dur ?? Math.min(2.6, 0.4 + a.chars * 0.035)))));
        a.nodes.forEach(n => { const k = Math.max(0, Math.min(n.text.length, left)); n.node.nodeValue = n.text.slice(0, k) + n.text.slice(k).replace(/[^\n]/g, '\u00a0'); left -= n.text.length; });
        break;
      }
      // ---- loops
      case 'pulse': { st.scale = String(+(1 + 0.05 * Math.sin(t * 4.4 + ph)).toFixed(4)); break; }
      case 'breathe': { opacity(a.baseOpacity * (0.8 + 0.2 * Math.sin(t * 1.1 + ph))); break; }
      case 'wobble': { // a wiggle every few seconds, like a sticker asking to be tapped
        const tau = (t + ph) % 2.8;
        st.rotate = tau < 0.8 ? `${(8 * Math.sin(tau * 30) * (1 - tau / 0.8)).toFixed(2)}deg` : '0deg';
        st.scale = tau < 0.8 ? String(+(1 + 0.05 * Math.sin(tau * Math.PI / 0.8)).toFixed(3)) : '1';
        break;
      }
      case 'sway': { st.transformOrigin = a.el.dataset.origin || '50% 0'; st.rotate = `${(7 * Math.sin(t * 1.5 + ph)).toFixed(2)}deg`; break; }
      case 'bob': { st.translate = `0 ${(1.5 * u * Math.sin(t * 1.6 + ph)).toFixed(2)}px`; break; }
      case 'nudge-x': { st.translate = `${(1.8 * u * Math.abs(Math.sin(t * 3.2 + ph))).toFixed(2)}px 0`; break; }
      case 'nudge-y': { st.translate = `0 ${(-1.8 * u * Math.abs(Math.sin(t * 3.2 + ph))).toFixed(2)}px`; break; }
      case 'twinkle': { const q = 0.5 + 0.5 * Math.sin(t * 2.6 + ph * 1.7); opacity(0.25 + 0.75 * q * q); st.scale = String(+(0.7 + 0.5 * q).toFixed(3)); break; }
      case 'blink': { opacity(Math.sin(t * 5 + ph) > 0 ? 1 : 0.15); break; }
      case 'spin': { st.rotate = `${(t * 40 + ph * 30).toFixed(1)}deg`; break; }
      case 'fly': { // a bat: flaps while drifting across the sky and wrapping round
        const x = wrapRange(a.left + t * 7 * u + ph * 25 * u, -16 * u, a.W + 16 * u) - a.left;
        st.translate = `${x.toFixed(1)}px ${(2 * u * Math.sin(t * 2 + ph)).toFixed(1)}px`;
        st.scale = `1 ${(0.65 + 0.35 * Math.abs(Math.sin(t * 13 + ph))).toFixed(3)}`;
        break;
      }
      case 'burst': { // a firework: grows from a spark and fades, again and again
        const cyc = ((t + ph * 0.7) % 2.4) / 2.4;
        st.scale = String(+(0.15 + easeOut(cyc)).toFixed(3)); opacity(a.baseOpacity * (1 - cyc) ** 1.1);
        break;
      }
      case 'fall': { // snow, leaves, confetti: falls, sways and turns, then comes back in at the top
        const speed = (7 + (r % 3) * 2) * u;
        const y = wrapRange(a.top + t * speed + ph * 30 * u, -12 * u, a.H + 12 * u) - a.top;
        st.translate = `${(2 * u * Math.sin(t * 0.9 + ph)).toFixed(1)}px ${y.toFixed(1)}px`;
        st.rotate = `${(t * 45 + ph * 50).toFixed(1)}deg`;
        break;
      }
      case 'scroll-bg': { st.backgroundPosition = `${(t * 9 * u).toFixed(1)}px 0`; break; }
      case 'flicker': { // a flame: grows and narrows, sways from its base, dims a little
        const s = 1 + 0.08 * Math.sin(t * 9 + ph / 2.1 * 1.7) + 0.05 * Math.sin(t * 17 + ph / 2.1 * 3.1) + 0.03 * Math.sin(t * 29 + ph / 2.1 * 0.7);
        const rot = 3.2 * Math.sin(t * 6.5 + ph / 2.1 * 2.3) + 1.4 * Math.sin(t * 15 + ph / 2.1);
        st.transformOrigin = '50% 100%';
        st.transform = `rotate(${rot.toFixed(2)}deg) scale(${(1 - (s - 1) * 0.7).toFixed(3)}, ${s.toFixed(3)})`;
        opacity(0.9 + 0.1 * Math.sin(t * 13 + ph / 2.1 * 2));
        break;
      }
      case 'float': { // a heart: drifts and beats (% of its own size, so big ones travel further)
        const hp = ph / 2.1 * 1.9;
        const beat = Math.max(0, Math.sin(t * 3.4 + hp)) ** 3;
        const y = 11 * Math.sin(t * 1.25 + hp) + 4 * Math.sin(t * 2.6 + hp * 1.7);
        const x = 5 * Math.sin(t * 0.9 + hp * 1.3);
        st.transform = `translate(${x.toFixed(2)}%, ${y.toFixed(2)}%) scale(${(1 + 0.14 * beat).toFixed(3)})`;
        opacity(Math.min(1, a.baseOpacity * (0.9 + 0.55 * beat)));
        break;
      }
      case 'drift': { // a confetti dot: wanders slowly, swells and fades a little
        const x = (1.6 * Math.sin(t * 0.8 + ph) + 0.6 * Math.sin(t * 1.9 + ph * 1.4)) * u;
        const y = (2.8 * Math.sin(t * 0.7 + ph * 1.2) + 1.0 * Math.sin(t * 1.7 + ph)) * u;
        st.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(1 + 0.18 * Math.sin(t * 1.4 + ph)).toFixed(3)})`;
        opacity(0.8 + 0.2 * Math.sin(t * 1.1 + ph));
        break;
      }
      default: break;
    }
  });
}
const restoreAmbient = items => {
  items.forEach(a => {
    SAVED_PROPS.forEach(k => { a.el.style[k] = a.saved[k]; });
    a.nodes.forEach(n => { n.node.nodeValue = n.text; });
  });
  items.boxes?.forEach((overflow, n) => { n.style.overflow = overflow; });
};

/* Play the animation on the live preview (a shadow root's .spt element). Returns stop().
   `u` = 1% of the shorter side of the post, in the post's own pixels. A post with moving
   decoration (flames) plays for `seconds`, like the video; any other stops after the reveal. */
export function playPreviewAnimation(root, { style = 'rise', u = 10, seconds = 6, onDone } = {}) {
  const items = animItems(root);
  const base = items.map(animBase);
  const amb = ambientItems(root);
  const timing = animTiming(items.length);
  const hold = 0.9; // the finished design stays visible for a moment
  const length = amb.length ? Math.max(seconds, timing.settle + hold) : timing.settle + hold;
  const t0 = performance.now();
  let raf = 0, stopped = false;
  const finish = () => { if (stopped) return; stopped = true; cancelAnimationFrame(raf); restoreAnim(base); restoreAmbient(amb); onDone?.(); };
  const tick = now => {
    if (stopped) return;
    const time = (now - t0) / 1000;
    applyAnimFrame(base, Math.min(time, timing.settle), style, u, timing);
    applyAmbient(amb, time, u);
    if (time >= length) finish(); else raf = requestAnimationFrame(tick);
  };
  applyAnimFrame(base, 0, style, u, timing);
  applyAmbient(amb, 0, u);
  raf = requestAnimationFrame(tick);
  return finish;
}
const VIDEO_TYPES = ['video/mp4;codecs=avc1.42E01E', 'video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];
export function videoSupport() {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined' || !HTMLCanvasElement.prototype.captureStream) return null;
  const type = VIDEO_TYPES.find(tp => MediaRecorder.isTypeSupported(tp));
  return type ? { type, ext: type.startsWith('video/mp4') ? 'mp4' : 'webm' } : null;
}

export async function renderVideo(t, state, { seconds = 6, fps = 30, style = 'rise', onProgress, signal } = {}) {
  const support = videoSupport();
  if (!support) throw new Error('This browser can’t record video. Try Chrome or Edge.');
  await loadFonts(t, state);
  const z = sizeById(state.size);
  const u = Math.min(z.w, z.h) / 100;
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:-30000px;top:0;pointer-events:none;';
  document.body.appendChild(host);
  const frames = []; // JPEG blobs
  try {
    const root = mountTemplate(host.attachShadow({ mode: 'open' }), t, state);
    fitText(root);
    layoutImages(root, state);
    const fontCss = await embeddedFontCss(usedFonts(t, state));
    const items = animItems(root);
    const base = items.map(animBase);
    const amb = ambientItems(root);
    const timing = animTiming(items.length);
    const total = Math.round(seconds * fps);
    const settleFrames = Math.min(total, Math.ceil(timing.settle * fps) + 1);
    // Moving decoration (flames) means every frame differs, so the whole length is rendered
    const animFrames = amb.length ? total : settleFrames;
    const toJpeg = canvas => new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.92));
    for (let f = 0; f < animFrames; f++) {
      if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError');
      if (f >= settleFrames && f % 2 === 1) { // after the reveal, flames move at half the frame rate (looks natural, halves the work)
        frames.push(frames[frames.length - 1]);
        onProgress?.({ phase: 'render', done: f + 1, total: animFrames });
        continue;
      }
      applyAnimFrame(base, f / fps, style, u, timing);
      applyAmbient(amb, f / fps, u);
      frames.push(await toJpeg(await rasterize(root, t, z, fontCss)));
      onProgress?.({ phase: 'render', done: f + 1, total: animFrames });
    }
    restoreAnim(base);
    restoreAmbient(amb);
    while (frames.length < total) frames.push(frames[frames.length - 1]); // the settled design holds
  } finally {
    host.remove();
  }

  // Pass 2: play the frames into the recorder at an exact frame rate
  const canvas = document.createElement('canvas');
  canvas.width = z.w; canvas.height = z.h;
  const ctx = canvas.getContext('2d');
  const first = await createImageBitmap(frames[0]);
  ctx.drawImage(first, 0, 0);
  // captureStream(0) + requestFrame(): every drawn frame is pushed to the recorder explicitly.
  // With captureStream(fps) Chrome only emits a frame when it repaints, and an off-screen
  // canvas (or a background tab) may never repaint, so the video froze on the first frame.
  const stream = canvas.captureStream(0);
  const track = stream.getVideoTracks()[0];
  const push = () => { if (track?.requestFrame) track.requestFrame(); };
  push();
  const rec = new MediaRecorder(stream, { mimeType: support.type, videoBitsPerSecond: 10_000_000 });
  const chunks = [];
  rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
  const stopped = new Promise(res => { rec.onstop = res; });
  rec.start();
  const t0 = performance.now();
  let last = null, lastBitmap = first;
  for (let f = 0; f < frames.length; f++) {
    if (signal?.aborted) { rec.stop(); stream.getTracks().forEach(tr => tr.stop()); throw new DOMException('Cancelled', 'AbortError'); }
    if (frames[f] !== last) { lastBitmap = await createImageBitmap(frames[f]); last = frames[f]; }
    ctx.drawImage(lastBitmap, 0, 0);
    push();
    onProgress?.({ phase: 'record', done: f + 1, total: frames.length });
    const wait = t0 + ((f + 1) * 1000) / fps - performance.now();
    if (wait > 0) await new Promise(r => setTimeout(r, wait));
  }
  rec.stop();
  await stopped;
  stream.getTracks().forEach(tr => tr.stop());
  return { blob: new Blob(chunks, { type: support.type.split(';')[0] }), ext: support.ext };
}
