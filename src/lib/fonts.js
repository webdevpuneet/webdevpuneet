/* Font registry shared by Social Post Templates and the Brand Kit.

   A font id is one of:
     'inter', 'poppins', …         the built-in picks (OgImageGenerator FONTS)
     'g:<Family>|<weights>|<cat>'  any Google Font, e.g. 'g:Archivo Black|4|s'
                                   (weights in hundreds, cat s/e/d/h/m), so the id alone
                                   is enough to build a Google Fonts URL
     'c:<id>'                      a font the user uploaded; the file lives in this
                                   browser's IndexedDB and is registered with FontFace

   resolveFont(id) always returns { id, label, family?, weights, fallback, stack?, kind }. */

import { FONTS, ensureFont as ensureBuiltin } from '../components/OgImageGenerator/engine';

const FALLBACK = { s: 'sans-serif', e: 'serif', d: 'sans-serif', h: 'cursive', m: 'monospace' };
export const FONT_CATEGORIES = [
  { id: 's', label: 'Sans' },
  { id: 'e', label: 'Serif' },
  { id: 'd', label: 'Display' },
  { id: 'h', label: 'Handwriting' },
  { id: 'm', label: 'Mono' },
];
export const BUILTIN_FONTS = FONTS;
const BUILTIN = new Map(FONTS.map(f => [f.id, { ...f, kind: 'builtin' }]));
const BUILTIN_BY_FAMILY = new Map(FONTS.filter(f => f.family).map(f => [f.family, f.id]));
export const CUSTOM_FONT_EXT = ['woff2', 'woff', 'ttf', 'otf'];
export const CUSTOM_FONT_MAX = 3 * 1024 * 1024; // 3 MB per file
const FORMAT = { woff2: 'woff2', woff: 'woff', ttf: 'truetype', otf: 'opentype' };
const MIME = { woff2: 'font/woff2', woff: 'font/woff', ttf: 'font/ttf', otf: 'font/otf' };
const CHANGE = 'wdp-fonts-change';

/* ── Google Fonts ─────────────────────────────────────────────────────────────── */
/** Catalog row [family, cat, weights] -> font id (built-in id when it is one of ours) */
export function googleFontId([family, cat, weights]) {
  return BUILTIN_BY_FAMILY.get(family) || `g:${family}|${weights}|${cat}`;
}

let catalogP = null;
/** Every Google Fonts family, most popular first (public/data/google-fonts.json) */
export function loadGoogleCatalog() {
  if (!catalogP) {
    catalogP = fetch('/data/google-fonts.json').then(r => (r.ok ? r.json() : [])).catch(() => { catalogP = null; return []; });
  }
  return catalogP;
}

export const googleCssUrl = (fonts, display = 'swap') =>
  `https://fonts.googleapis.com/css2?${fonts.map(f => `family=${f.family.replace(/ /g, '+')}:wght@${f.weights.join(';')}`).join('&')}&display=${display}`;

/* ── Custom (uploaded) fonts ──────────────────────────────────────────────────── */
const custom = new Map(); // id -> { id, name, family, ext, size, dataUrl }

function fontsDb() {
  return new Promise((res, rej) => {
    const req = indexedDB.open('wdp-fonts', 1);
    req.onupgradeneeded = () => req.result.createObjectStore('fonts', { keyPath: 'id' });
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
async function dbRun(mode, fn) {
  const db = await fontsDb();
  return new Promise((res, rej) => {
    const tx = db.transaction('fonts', mode);
    const out = fn(tx.objectStore('fonts'));
    tx.oncomplete = () => res(out?.result);
    tx.onerror = () => rej(tx.error);
  });
}
const blobToDataUrl = blob => new Promise((res, rej) => {
  const fr = new FileReader();
  fr.onload = () => res(fr.result);
  fr.onerror = rej;
  fr.readAsDataURL(blob);
});

async function register(rec) {
  const dataUrl = await blobToDataUrl(rec.blob.type ? rec.blob : new Blob([rec.blob], { type: MIME[rec.ext] }));
  const face = new FontFace(rec.family, `url(${dataUrl})`, { weight: '100 900', display: 'block' });
  await face.load(); // throws for files that aren't valid fonts
  document.fonts.add(face);
  custom.set(rec.id, { id: rec.id, name: rec.name, family: rec.family, ext: rec.ext, size: rec.size, dataUrl });
}

let customP = null;
/** Registers every uploaded font in this browser (once); resolves when they can be drawn */
export function loadCustomFonts() {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') return Promise.resolve();
  if (!customP) {
    customP = (async () => {
      try {
        const all = await dbRun('readonly', st => st.getAll());
        for (const rec of all || []) { try { await register(rec); } catch { /* unreadable file: skip */ } }
      } catch { /* storage blocked */ }
      window.dispatchEvent(new Event(CHANGE));
    })();
  }
  return customP;
}

export const customFonts = () => [...custom.values()];

const niceName = file => file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')
  .replace(/\b(webfont|regular|variable|vf)\b/gi, '').replace(/[^\w &'.]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40) || 'Custom font';

/** Validates, stores and registers an uploaded font file. Returns its font id. */
export async function addCustomFont(file) {
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (!CUSTOM_FONT_EXT.includes(ext)) throw new Error('Use a .woff2, .woff, .ttf or .otf font file.');
  if (file.size > CUSTOM_FONT_MAX) throw new Error(`That font is ${(file.size / 1048576).toFixed(1)} MB. The limit is 3 MB; a .woff2 version is usually much smaller.`);
  await loadCustomFonts();
  let name = niceName(file.name);
  const taken = new Set(customFonts().map(f => f.family));
  for (let i = 2; taken.has(name); i++) name = `${niceName(file.name)} ${i}`;
  const id = `c:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const rec = { id, name, family: name, ext, size: file.size, blob: new Blob([await file.arrayBuffer()], { type: MIME[ext] }) };
  try { await register(rec); } catch { throw new Error('That file couldn’t be read as a font.'); }
  try { await dbRun('readwrite', st => st.put(rec)); } catch { /* storage blocked: works until reload */ }
  window.dispatchEvent(new Event(CHANGE));
  return id;
}

export async function removeCustomFont(id) {
  custom.delete(id);
  try { await dbRun('readwrite', st => st.delete(id)); } catch { /* blocked */ }
  window.dispatchEvent(new Event(CHANGE));
}

/** @font-face rules for uploaded fonts, with the file inlined (for exports) */
export function customFontFaceCss(ids) {
  return ids.map(id => custom.get(id)).filter(Boolean)
    .map(f => `/* ${f.name} (your uploaded font, ${f.ext}) */\n@font-face{font-family:"${f.family}";src:url(${f.dataUrl}) format("${FORMAT[f.ext]}");font-weight:100 900;font-display:swap}`)
    .join('\n');
}

/** Re-render when uploaded fonts are added, removed or finish loading */
export function onFontsChange(fn) {
  window.addEventListener(CHANGE, fn);
  return () => window.removeEventListener(CHANGE, fn);
}

/* ── Resolving and loading any id ─────────────────────────────────────────────── */
export function resolveFont(id) {
  if (BUILTIN.has(id)) return BUILTIN.get(id);
  if (typeof id === 'string' && id.startsWith('g:')) {
    const [family, weights = '4', cat = 's'] = id.slice(2).split('|');
    return { id, label: family, family, weights: [...weights].map(d => Number(d) * 100), fallback: FALLBACK[cat] || 'sans-serif', cat, kind: 'google' };
  }
  if (typeof id === 'string' && id.startsWith('c:')) {
    const f = custom.get(id);
    return f
      ? { id, label: f.name, family: f.family, weights: [400, 700], fallback: 'sans-serif', kind: 'custom' }
      // Not loaded yet, or uploaded in another browser: draw with Arial meanwhile
      : { id, label: 'Uploaded font (not on this device)', stack: 'Arial, Helvetica, sans-serif', weights: [400, 700], kind: 'missing' };
  }
  return BUILTIN.get('inter') || { ...FONTS[0], kind: 'builtin' };
}

export const fontStack = id => { const f = resolveFont(id); return f.family ? `"${f.family}", ${f.fallback}` : f.stack; };
export const fontLabel = id => resolveFont(id).label;

const googleLoads = new Map();
function ensureGoogle(f) {
  if (googleLoads.has(f.id)) return googleLoads.get(f.id);
  const p = new Promise(resolve => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = googleCssUrl([f]);
    link.onload = () => Promise.all(f.weights.map(w => document.fonts.load(`${w} 40px "${f.family}"`))).catch(() => {}).then(resolve);
    link.onerror = () => resolve(); // offline or blocked: the fallback draws instead
    document.head.appendChild(link);
  });
  googleLoads.set(f.id, p);
  return p;
}

/** Loads any font id so it can be drawn */
export function ensureFont(id) {
  if (typeof document === 'undefined') return Promise.resolve();
  if (BUILTIN.has(id)) return ensureBuiltin(id);
  if (String(id).startsWith('c:')) return loadCustomFonts();
  const f = resolveFont(id);
  return f.kind === 'google' ? ensureGoogle(f) : Promise.resolve();
}

/* Picker previews: a tiny subset (just the family name's letters) under a private alias,
   so it never clashes with the full font a design loads */
const previewLoads = new Map();
export function previewFamily(family) {
  return `wdpp ${family}`;
}
export function loadPreview(family) {
  if (typeof document === 'undefined' || previewLoads.has(family)) return previewLoads.get(family) || Promise.resolve();
  const p = (async () => {
    try {
      const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}&text=${encodeURIComponent(family)}`)).text();
      const u = /url\(([^)]+)\)/.exec(css);
      if (!u) return;
      const face = new FontFace(previewFamily(family), `url(${u[1].replace(/['"]/g, '')})`);
      await face.load();
      document.fonts.add(face);
    } catch { /* offline: the list shows the name in the UI font */ }
  })();
  previewLoads.set(family, p);
  return p;
}

/* Recently picked fonts (this browser) */
const RECENT_KEY = 'wdp-fonts-recent';
export function recentFonts() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]').filter(id => typeof id === 'string'); } catch { return []; }
}
export function rememberFont(id) {
  if (BUILTIN.has(id)) return;
  try { localStorage.setItem(RECENT_KEY, JSON.stringify([id, ...recentFonts().filter(x => x !== id)].slice(0, 8))); } catch { /* blocked */ }
}
