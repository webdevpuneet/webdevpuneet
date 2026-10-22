/* Shared definitions for website section templates. Plain JS (no React) so build scripts
   (sitemap, preview capture) can import the registry.

   Every section reads the same theme tokens (CSS custom properties --st-*), so any mix
   of sections looks like one website; that is what the page builder will stack later.
   Sections size themselves with container queries on the .st root (container "st"),
   so they respond to their own width in the editor, the builder and a user's site. */

export const SECTION_CATEGORIES = [
  { id: 'hero',         label: 'Hero',            blurb: 'Above-the-fold hero sections with a headline, supporting text, call-to-action buttons and an image, screenshot or background photo.' },
  { id: 'navbar',       label: 'Navbar',          blurb: 'Responsive navigation bars with a logo, links and a call-to-action button.' },
  { id: 'features',     label: 'Features',        blurb: 'Feature grids, alternating image-and-text rows and benefit lists.' },
  { id: 'pricing',      label: 'Pricing',         blurb: 'Pricing tables and plan cards with highlighted plans and feature lists.' },
  { id: 'testimonials', label: 'Testimonials',    blurb: 'Customer quotes, review walls and case-study highlights.' },
  { id: 'faq',          label: 'FAQ',             blurb: 'Frequently asked question sections with expandable answers.' },
  { id: 'cta',          label: 'Call to action',  blurb: 'Closing call-to-action banners and sign-up blocks.' },
  { id: 'stats',        label: 'Stats & logos',   blurb: 'Social-proof numbers and customer logo strips.' },
  { id: 'team',         label: 'Team',            blurb: 'Team grids with photos, names and roles.' },
  { id: 'contact',      label: 'Contact',         blurb: 'Contact sections with details, maps and forms.' },
  { id: 'blog',         label: 'Blog',            blurb: 'Blog and article grids with cover images.' },
  { id: 'footer',       label: 'Footer',          blurb: 'Website footers with link columns, newsletter sign-up and social links.' },
];
export const sectionCategoryById = id => SECTION_CATEGORIES.find(c => c.id === id);

/* Theme tokens. Colours are hex; radius and maxWidth are px numbers as strings; the
   three scales are percentages as strings (see "Size scales" below). */
export const DEFAULT_THEME = {
  brand: '#4f46e5',     // buttons, links, accents
  brandText: '#ffffff', // text on brand-coloured buttons
  bg: '#ffffff',        // section background
  surface: '#f4f4f8',   // cards, panels, image frames
  text: '#0f172a',      // headings and body text
  muted: '#475569',     // secondary text
  radius: '14',         // corner radius in px
  maxWidth: '1200',     // content width in px
  textScale: '100',     // font sizes, % of the template's own
  spaceScale: '100',    // padding and margins, %
  gapScale: '100',      // gaps between items, %
};
export const THEME_KEYS = Object.keys(DEFAULT_THEME);

/* ── Size scales ──────────────────────────────────────────────────────────────────
   Sections write their sizes as plain px / cqi values in their own CSS, so the Sizes
   controls rewrite that CSS: every length in a font-size (and the size part of a font
   shorthand) is multiplied by textScale, padding/margin by spaceScale and gap by
   gapScale. Scaling every length in a value scales clamp(), min(), max() and calc()
   correctly because they are linear. Percentages are left alone (aspect-ratio tricks),
   and em in font sizes too (it already follows the parent). At 100% the CSS is returned
   untouched, so exports only change when someone moves a slider. */
export const SCALE_CONTROLS = [
  { key: 'textScale',  label: 'Text size',         hint: 'Headings, body text and buttons' },
  { key: 'spaceScale', label: 'Padding & margins', hint: 'Space around and inside sections' },
  { key: 'gapScale',   label: 'Gaps',              hint: 'Space between cards, columns and items' },
];
export const SCALE_MIN = 60;
export const SCALE_MAX = 160;
export const SCALE_STEP = 5;

export const scaleOf = v => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? Math.min(SCALE_MAX, Math.max(SCALE_MIN, n)) / 100 : 1;
};
const round = n => String(Math.round(n * 100) / 100);
export const scaleLengths = (value, k, units) =>
  value.replace(new RegExp(`(-?\\d*\\.?\\d+)(${units})\\b`, 'g'), (_, n, u) => round(parseFloat(n) * k) + u);

const TEXT_UNITS = 'px|rem|cqi|cqw|vw|vmin';
export const SPACE_UNITS = 'px|rem|em|cqi|cqw|vw|vmin';
const SPACING_PROP = /^(padding|margin)(-(top|right|bottom|left|inline|block)(-(start|end))?)?$/;
const GAP_PROP = /^(gap|row-gap|column-gap|grid-gap|grid-row-gap|grid-column-gap)$/;

/** CSS with its sizes scaled by the theme's textScale / spaceScale / gapScale */
export function scaleCss(css, theme = {}) {
  const text = scaleOf(theme.textScale), space = scaleOf(theme.spaceScale), gap = scaleOf(theme.gapScale);
  if (!css || (text === 1 && space === 1 && gap === 1)) return css;
  return css.replace(/([{;]\s*)([a-z-]+)(\s*:\s*)([^;{}]+)/g, (all, pre, prop, colon, value) => {
    let v = value;
    if (prop === 'font-size' && text !== 1) v = scaleLengths(value, text, TEXT_UNITS);
    else if (prop === 'font' && text !== 1) {
      // font: 800 clamp(…)/1 var(--st-font-heading) — the size comes before the "/"
      const slash = value.indexOf('/');
      v = slash < 0 ? scaleLengths(value, text, TEXT_UNITS) : scaleLengths(value.slice(0, slash), text, TEXT_UNITS) + value.slice(slash);
    } else if (SPACING_PROP.test(prop) && space !== 1) v = scaleLengths(value, space, SPACE_UNITS);
    else if (GAP_PROP.test(prop) && gap !== 1) v = scaleLengths(value, gap, SPACE_UNITS);
    return v === value ? all : pre + prop + colon + v;
  });
}
export const THEME_COLORS = [
  { key: 'brand', label: 'Brand / buttons' },
  { key: 'brandText', label: 'Button text' },
  { key: 'bg', label: 'Background' },
  { key: 'surface', label: 'Cards & panels' },
  { key: 'text', label: 'Text' },
  { key: 'muted', label: 'Muted text' },
];

/* One-click looks. Each sets every colour token. */
export const THEME_PRESETS = [
  { id: 'indigo',   label: 'Indigo',   brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f4f4f8', text: '#0f172a', muted: '#475569' },
  { id: 'midnight', label: 'Midnight', brand: '#818cf8', brandText: '#0b1020', bg: '#0b1020', surface: '#161c33', text: '#f1f5f9', muted: '#94a3b8' },
  { id: 'emerald',  label: 'Emerald',  brand: '#047857', brandText: '#ffffff', bg: '#f6fbf8', surface: '#e7f3ed', text: '#0b2a1f', muted: '#4b6358' },
  { id: 'sunset',   label: 'Sunset',   brand: '#ea580c', brandText: '#ffffff', bg: '#fffaf5', surface: '#fdeee2', text: '#2a1608', muted: '#7a5a45' },
  { id: 'rose',     label: 'Rose',     brand: '#e11d48', brandText: '#ffffff', bg: '#fff7f9', surface: '#fde8ee', text: '#2b0b14', muted: '#7d4d5a' },
  { id: 'ocean',    label: 'Ocean',    brand: '#38bdf8', brandText: '#04131f', bg: '#04131f', surface: '#0c2234', text: '#e0f2fe', muted: '#93b4c9' },
  { id: 'mono',     label: 'Mono',     brand: '#111111', brandText: '#ffffff', bg: '#ffffff', surface: '#f2f2f2', text: '#111111', muted: '#555555' },
  { id: 'sand',     label: 'Sand',     brand: '#a16207', brandText: '#ffffff', bg: '#fbf8f1', surface: '#f1eadb', text: '#2a2110', muted: '#6f6450' },
];

/* ── Motion (GSAP) ────────────────────────────────────────────────────────────────
   Animation is part of every section. Sections mark what moves:
     data-anim="item"   copy elements, revealed one after another (staggered)
     data-anim="media"  the main image / visual, revealed with its own effect
   The runtime (render.js motionScript) uses GSAP + ScrollTrigger from cdnjs, only sets
   the hidden "from" state once JavaScript runs (so content is always visible without
   JS), plays once when the section scrolls into view, and does nothing for people who
   prefer reduced motion. The page builder will reuse the same markers and runtime. */
export const GSAP_VERSION = '3.15.0';
const GSAP_BASE = `https://cdnjs.cloudflare.com/ajax/libs/gsap/${GSAP_VERSION}/`;
/* Every GSAP plugin is free since 3.13 and on cdnjs. Sections and effects list the
   plugins they need; exports load only those (core + ScrollTrigger always). Names are
   the cdnjs file names without .min.js. */
export const GSAP_PLUGINS = [
  'ScrollTrigger', 'ScrollSmoother', 'ScrollToPlugin', 'Observer',
  'SplitText', 'TextPlugin', 'ScrambleTextPlugin',
  'Flip', 'Draggable', 'InertiaPlugin',
  'DrawSVGPlugin', 'MorphSVGPlugin', 'MotionPathPlugin',
  'CustomEase', 'CustomBounce', 'CustomWiggle', 'EasePack',
  'Physics2DPlugin', 'PhysicsPropsPlugin',
];
/** CDN URLs for GSAP core + ScrollTrigger + the given plugins, in a safe load order */
export function gsapCdn(plugins = []) {
  const need = new Set(['ScrollTrigger', ...plugins]);
  if (need.has('CustomBounce') || need.has('CustomWiggle')) need.add('CustomEase');
  if (need.has('ScrollSmoother')) need.add('ScrollTrigger');
  return ['gsap', ...GSAP_PLUGINS.filter(p => need.has(p))].map(f => `${GSAP_BASE}${f}.min.js`);
}
export const GSAP_CDN = gsapCdn();
export const MOTION_PRESETS = [
  { id: 'none',    label: 'None' },
  { id: 'fade-up', label: 'Fade up',  item: { y: 28, opacity: 0 },            media: { y: 40, opacity: 0 } },
  { id: 'fade',    label: 'Fade',     item: { opacity: 0 },                   media: { opacity: 0 } },
  { id: 'slide',   label: 'Slide in', item: { x: -36, opacity: 0 },           media: { x: 48, opacity: 0 } },
  { id: 'zoom',    label: 'Zoom',     item: { y: 16, opacity: 0 },            media: { scale: 0.9, opacity: 0 } },
];
export const MOTION_SPEEDS = [['0.7', 'Fast'], ['1', 'Normal'], ['1.4', 'Slow']];
/* Headline text effects (GSAP SplitText) for elements marked data-anim-text.
   split: SplitText type · part: which pieces animate · mask: clip pieces so they rise into view */
export const TEXT_EFFECTS = [
  { id: 'none',  label: 'None' },
  { id: 'rise',  label: 'Words rise',  split: 'words',       part: 'words', mask: 'words', from: { yPercent: 110 },                          stagger: 0.06, duration: 0.8 },
  { id: 'lines', label: 'Line reveal', split: 'lines',       part: 'lines', mask: 'lines', from: { yPercent: 105 },                          stagger: 0.12, duration: 0.9 },
  { id: 'chars', label: 'Letters',     split: 'words,chars', part: 'chars',               from: { opacity: 0, y: 14, rotate: 6 },           stagger: 0.016, duration: 0.5 },
  { id: 'blur',  label: 'Blur in',     split: 'words',       part: 'words',               from: { opacity: 0, y: 10, filter: 'blur(10px)' }, stagger: 0.05, duration: 0.8 },
];
// smooth / parallax are page settings (Website Builder): ScrollSmoother and background parallax
export const DEFAULT_MOTION = { preset: 'fade-up', speed: '1', text: 'rise', smooth: false, parallax: false };

/* Images that ship with the templates (hosted on the site, so exports work anywhere) */
export const IMG = name => `https://webdevpuneet.com/images/section-templates/${name}`;

/* Escaping and links (shared with the email templates' safety rules) */
export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export function safeUrl(u) {
  const v = String(u ?? '').trim();
  if (!v) return '#';
  if (/^(https?:|mailto:|tel:|#|\/)/i.test(v)) return v.replace(/"/g, '%22');
  if (/^(blob:|data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,)/i.test(v)) return v;
  if (/^images\/[\w.-]+$/.test(v)) return v; // uploaded images next to the page in the ZIP
  if (/^[\w-]+\.html(#[\w-]*)?$/i.test(v)) return v; // another page of a multi-page site (about.html#team)
  if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(v)) return `https://${v.replace(/"/g, '%22')}`;
  return '#';
}

/* Rich text: escaped, *words* become accent highlights, and <b> <strong> <i> <em> <u> <br>
   are allowed back in (unclosed ones are closed), so typed HTML can't break the page. */
function balanceInline(html) {
  const stack = [];
  const out = html.replace(/<(\/?)(b|strong|i|em|u|span)( class="hl")?>/g, (m, slash, tag) => {
    if (!slash) { stack.push(tag); return m; }
    const at = stack.lastIndexOf(tag);
    if (at === -1) return '';
    return stack.splice(at).reverse().map(x => `</${x}>`).join('');
  });
  return out + stack.reverse().map(x => `</${x}>`).join('');
}
export function richText(s) {
  let out = esc(s);
  out = out.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
  out = out.replace(/&lt;(\/?)(b|strong|i|em|u)&gt;/gi, (m, slash, tag) => `<${slash}${tag.toLowerCase()}>`);
  out = out.replace(/\*([^*\n]+)\*/g, '<span class="hl">$1</span>');
  out = out.replace(/\r?\n/g, '<br>');
  return balanceInline(out);
}

/* Base CSS for every section: tokens, container, typography and shared buttons.
   Element rules use :where() (zero specificity) so a section's own classes always win.
   Section CSS adds its own layout with class names prefixed by its short code. */
export const BASE_CSS = `.st{--st-pad:clamp(20px,5cqi,56px);container:st/inline-size;position:relative;overflow:hidden;background:var(--st-bg);color:var(--st-text);font-family:var(--st-font-body);font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}
:where(.st) *,:where(.st) *::before,:where(.st) *::after{box-sizing:border-box;margin:0;padding:0}
:where(.st img){display:block;max-width:100%;height:auto}
:where(.st a){color:inherit}
:where(.st h1,.st h2,.st h3){font-family:var(--st-font-heading);line-height:1.08;letter-spacing:-.025em;font-weight:800;color:var(--st-text)}
.st .hl{color:var(--st-brand)}
.st [data-edit]:empty,.st [data-i-edit]:empty{display:none}
.st-wrap{width:100%;max-width:calc(var(--st-max) * 1px);margin:0 auto;padding-left:var(--st-pad);padding-right:var(--st-pad)}
.st-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--st-brand)}
.st-pill{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:color-mix(in srgb,var(--st-brand) 12%,transparent);color:var(--st-brand);font-size:13.5px;font-weight:700}
.st-btns{display:flex;flex-wrap:wrap;gap:12px}
.st-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:50px;padding:0 26px;border-radius:calc(var(--st-radius) * 1px);border:2px solid var(--st-brand);background:var(--st-brand);color:var(--st-btn-text);font:700 16px/1 var(--st-font-body);text-decoration:none;transition:transform .15s ease,box-shadow .15s ease,background .15s ease}
.st-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px color-mix(in srgb,var(--st-brand) 35%,transparent)}
.st-btn:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 45%,transparent);outline-offset:3px}
.st-btn--ghost{background:transparent;color:var(--st-text);border-color:color-mix(in srgb,var(--st-text) 22%,transparent)}
.st-btn--ghost:hover{box-shadow:none;border-color:var(--st-text)}
.st-lead{font-size:clamp(17px,1.2cqi + 12px,20px);line-height:1.65;color:var(--st-muted)}
.st-head{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:46em;margin:0 auto clamp(36px,5cqi,64px);text-align:center}
.st-head--left{align-items:flex-start;margin-left:0;text-align:left}
.st-h2{font-size:clamp(30px,2.6cqi + 16px,48px)}
.st-icon{display:inline-grid;place-items:center;flex:none;width:48px;height:48px;border-radius:calc(var(--st-radius) * .85px);background:color-mix(in srgb,var(--st-brand) 12%,transparent);color:var(--st-brand)}
.st-icon svg{width:24px;height:24px}
.st-icon:empty{display:none}
.st-checks{list-style:none;display:flex;flex-direction:column;gap:11px}
.st-checks li{position:relative;padding-left:30px;font-size:15.5px;line-height:1.5}
.st-checks li::before{content:"";position:absolute;left:0;top:.12em;width:20px;height:20px;border-radius:50%;background:color-mix(in srgb,var(--st-brand) 15%,transparent)}
.st-checks li::after{content:"";position:absolute;left:5px;top:calc(.12em + 5px);width:10px;height:10px;background:var(--st-brand);-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E") center/contain no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E") center/contain no-repeat}
@media (prefers-reduced-motion:reduce){.st *{transition:none!important;animation:none!important}}`;
