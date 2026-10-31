/* Per-section style overrides, shared by the Website Builder (a page section's `style`) and the
   Website Sections editor (a section's `state.style`, with the background photo in
   `state.uploads['@bg']`). Everything is rendered from here, so both editors and every export agree.

     style: {
       scheme, colors: { bg, text, brand }, grad: { from, to, angle },
       top, bottom, bg: { id, file, w, h }, overlay,
       hide, type: { weight, caps, track }, css
     }
   scheme   'page' (default) | 'surface' | 'inverted' | 'brand' | 'custom' (colors) | 'gradient' (grad)
   top / bottom  % of the section's own vertical padding (100 = as designed)
   bg       an uploaded background image (resolved with the image source for BG_KEY)
   overlay  % of the section background colour laid over that image, so text stays readable
   hide     'phone' | 'desktop': the section is not shown at that size
   type     weight of headings, 'upper' | 'normal' small labels, 'tight' | 'wide' letter spacing
   css      the person's own CSS for this section (nested inside the section, so it can't leak)

   Colours, spacing and the background are an inline style on the <section> (colour tokens are
   the --st-* variables every section already reads). Hiding, typography and own CSS are rules
   (sectionRules) added to the page's stylesheet, scoped to the section. */
import { DEFAULT_THEME, scaleOf, scaleLengths, SPACE_UNITS } from './meta.js';

export const SECTION_SCHEMES = [
  { id: 'page', label: 'Page' }, { id: 'surface', label: 'Soft' }, { id: 'inverted', label: 'Inverted' },
  { id: 'brand', label: 'Brand' }, { id: 'custom', label: 'Custom' }, { id: 'gradient', label: 'Gradient' },
];
export const SECTION_SPACING = [['0', 'None'], ['50', 'S'], ['100', 'Default'], ['150', 'L'], ['200', 'XL']];
export const SECTION_OVERLAYS = [['0', 'None'], ['30', 'Light'], ['55', 'Medium'], ['80', 'Strong']];
export const GRADIENT_ANGLES = [['180', 'Down'], ['90', 'Right'], ['135', 'Diagonal'], ['0', 'Up']];
export const SECTION_HIDE = [['', 'Always show'], ['phone', 'Hide on phones'], ['desktop', 'Hide on larger screens']];
export const TYPE_WEIGHTS = [['', 'Default'], ['500', 'Medium'], ['700', 'Bold'], ['800', 'Extra bold'], ['900', 'Black']];
export const TYPE_CAPS = [['', 'Default'], ['upper', 'Capitals'], ['normal', 'Normal']];
export const TYPE_TRACKS = [['', 'Default'], ['tight', 'Tight'], ['wide', 'Wide']];
export const CSS_MAX = 4000;
export const BG_KEY = '@bg'; // imageSrc key of a section's background image

const HEX = /^#[0-9a-f]{6}$/i;
const PCT = new Set(SECTION_SPACING.map(([v]) => v));
const has = (list, v) => list.some(([k]) => k && k === v);

/** The person's own CSS made safe to nest inside a section ('' when nothing usable) */
export function cleanOwnCss(v) {
  const css = String(v || '').replace(/\r/g, '').trim().slice(0, CSS_MAX);
  if (!css || /<|@import|@charset|expression\s*\(|javascript:|behavior\s*:|-moz-binding/i.test(css)) return '';
  // Balanced braces, or the rest of the page's CSS would be swallowed
  let depth = 0;
  for (const ch of css) { if (ch === '{') depth++; else if (ch === '}' && --depth < 0) return ''; }
  return depth === 0 ? css : '';
}

/** A saved style made safe, or undefined when it changes nothing.
    keepOverlay: the Website Sections editor keeps its background photo in state.uploads, so the
    overlay is allowed without a bg in the style itself. */
export function cleanSectionStyle(st, { keepOverlay = false } = {}) {
  if (!st || typeof st !== 'object') return undefined;
  const out = {};
  if (SECTION_SCHEMES.some(x => x.id === st.scheme) && st.scheme !== 'page') out.scheme = st.scheme;
  if (out.scheme === 'custom') out.colors = Object.fromEntries(['bg', 'text', 'brand'].map(k => [k, HEX.test(st.colors?.[k] || '') ? st.colors[k] : null]).filter(([, v]) => v));
  if (out.scheme === 'gradient') {
    const a = Number(st.grad?.angle);
    if (HEX.test(st.grad?.from || '') && HEX.test(st.grad?.to || '')) out.grad = { from: st.grad.from, to: st.grad.to, angle: Number.isFinite(a) ? ((Math.round(a) % 360) + 360) % 360 : 135 };
    else delete out.scheme;
  }
  for (const k of ['top', 'bottom']) if (PCT.has(String(st[k])) && String(st[k]) !== '100') out[k] = String(st[k]);
  if (st.bg?.id && st.bg?.file) out.bg = { id: String(st.bg.id), file: String(st.bg.file), w: +st.bg.w || 0, h: +st.bg.h || 0 };
  if ((out.bg || keepOverlay) && SECTION_OVERLAYS.some(([v]) => v === String(st.overlay)) && String(st.overlay) !== '0') out.overlay = String(st.overlay);
  if (has(SECTION_HIDE, st.hide)) out.hide = st.hide;
  const type = {};
  if (has(TYPE_WEIGHTS, String(st.type?.weight))) type.weight = String(st.type.weight);
  if (has(TYPE_CAPS, st.type?.caps)) type.caps = st.type.caps;
  if (has(TYPE_TRACKS, st.type?.track)) type.track = st.type.track;
  if (Object.keys(type).length) out.type = type;
  const css = cleanOwnCss(st.css);
  if (css) out.css = css;
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
const mid = (a, b) => `#${[16, 8, 0].map(s => Math.round((((parseInt(a.slice(1), 16) >> s) & 255) + ((parseInt(b.slice(1), 16) >> s) & 255)) / 2).toString(16).padStart(2, '0')).join('')}`;

/**
 * CSS declarations for a section's style ('' when it has none).
 * @param theme   the theme the section sits in (the page's, or the section's own)
 * @param t       the section template (for its own padding)
 * @param st      the style
 * @param imageSrc  key => url of the uploaded background image
 */
export function sectionStyleCss(theme, t, st, imageSrc) {
  if (!st) return '';
  const th = { ...DEFAULT_THEME, ...(theme || {}) };
  const out = [];
  const vars = o => Object.entries(o).forEach(([k, v]) => out.push(`--st-${k}:${v}`));
  const mix = (a, pct, b) => `color-mix(in srgb,${a} ${pct}%,${b})`;
  if (st.scheme === 'surface') vars({ bg: th.surface, surface: th.bg });
  else if (st.scheme === 'inverted') vars({ bg: th.text, text: th.bg, surface: mix(th.bg, 8, th.text), muted: mix(th.bg, 70, th.text) });
  else if (st.scheme === 'brand') vars({ bg: th.brand, text: th.brandText, muted: mix(th.brandText, 80, th.brand), surface: mix(th.brandText, 12, th.brand), brand: th.brandText, 'btn-text': th.brand });
  else if (st.scheme === 'custom') {
    const bg = st.colors?.bg || th.bg, text = st.colors?.text || textOn(bg), brand = st.colors?.brand || th.brand;
    vars({ bg, text, surface: mix(text, 6, bg), muted: mix(text, 72, bg), brand, 'btn-text': textOn(brand) });
  } else if (st.scheme === 'gradient' && st.grad) {
    // Text and buttons follow the gradient's middle colour, so they stay readable on both ends
    const { from, to, angle } = st.grad;
    const text = textOn(mid(from, to));
    vars({ bg: from, text, surface: mix(text, 10, from), muted: mix(text, 74, from), brand: text, 'btn-text': text === '#ffffff' ? from : to });
    out.push(`background-image:linear-gradient(${angle}deg,${from},${to})`);
  }
  const pad = (st.top || st.bottom) && sectionPadding(t);
  if (pad) {
    const k = scaleOf(th.spaceScale);
    for (const side of ['top', 'bottom']) if (st[side]) out.push(`padding-${side}:${st[side] === '0' ? '0' : scaleLengths(pad[side], k * Number(st[side]) / 100, SPACE_UNITS)}`);
  }
  // Only image sources the editors produce: preview blob:, embedded data:image, the ZIP's assets/…
  const raw = st.bg && imageSrc ? String(imageSrc(BG_KEY) || '') : '';
  const src = /^(blob:|data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,|https?:\/\/|\/|assets\/|images\/)/i.test(raw) ? raw.replace(/["()\\\s]/g, c => encodeURIComponent(c)) : '';
  if (src) {
    const o = Number(st.overlay || 0);
    const veil = o ? `linear-gradient(${mix('var(--st-bg)', o, 'transparent')},${mix('var(--st-bg)', o, 'transparent')}),` : '';
    out.push(`background-image:${veil}url("${src}")`, 'background-size:cover', 'background-position:center');
  }
  return out.join(';');
}

/** Extra class names for the <section> (' st-hide-phone', or '') */
export const sectionStyleClass = st => (st?.hide ? ` st-hide-${st.hide}` : '');

/** Page CSS for hiding sections by screen size (only added when a section uses it) */
export const HIDE_CSS = `@media (max-width:640px){.st-hide-phone{display:none!important}}
@media (min-width:641px){.st-hide-desktop{display:none!important}}`;

/** Rules for a section's typography and its own CSS, scoped by `sel` ('' when it has none).
    Own CSS is nested in the selector, so it only reaches inside that section. */
export function sectionRules(st, sel) {
  if (!st) return '';
  const out = [];
  const ty = st.type || {};
  const heads = `${sel} :is(h1,h2,h3,h4,.st-h1,.st-h2)`;
  if (ty.weight) out.push(`${heads}{font-weight:${ty.weight}}`);
  if (ty.track) out.push(`${heads}{letter-spacing:${ty.track === 'tight' ? '-.03em' : '.04em'}}`);
  if (ty.caps === 'upper') out.push(`${sel} :is(.st-eyebrow,.st-tag,[class$="-eyebrow"],[class$="-kicker"]){text-transform:uppercase;letter-spacing:.14em}`);
  else if (ty.caps === 'normal') out.push(`${sel} :is(.st-eyebrow,.st-tag,[class$="-eyebrow"],[class$="-kicker"]){text-transform:none;letter-spacing:0}`);
  if (st.css) out.push(`${sel}{\n${st.css}\n}`);
  return out.join('\n');
}
