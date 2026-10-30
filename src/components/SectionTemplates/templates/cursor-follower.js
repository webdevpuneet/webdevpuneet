import { esc } from './meta.js';

/* Cursor Follower: a circle that follows the mouse across the whole page and uses a CSS blend mode
   (difference, exclusion and others) to invert or recolour whatever text and images are under it.
   The section takes no space in the layout. On a real page the circle is moved to <body> and drawn with
   position:fixed so it works over the entire page; it moves with transforms only, eases towards the
   pointer in a requestAnimationFrame loop that stops when it has caught up, and is not created on touch
   screens. In the editors a demo stage (large text and an image) is shown instead, and the circle follows the
   mouse over that stage only. `finalize` (render.js fillHtml) writes the settings; on a real page the script
   removes the demo stage; the `cursor` behaviour (behaviors.js) does the work. */

const pick = (v, allowed, d) => (allowed.includes(String(v)) ? String(v) : d);
const num = (v, d, min, max) => { const n = parseFloat(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : d; };
const BLENDS = ['difference', 'exclusion', 'multiply', 'screen', 'overlay', 'soft-light', 'hard-light', 'color-dodge', 'normal'];
const SPEEDS = { instant: 1, snappy: 0.35, smooth: 0.18, floaty: 0.08 };
const hex = (v, d) => (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(v || '').trim()) ? String(v).trim() : d);

export default {
  id: 'cursor-follower',
  name: 'Cursor Follower (Blend Mode Circle)',
  version: '1.0.0',
  category: 'effects',
  tags: ['cursor', 'cursor-follower', 'mix-blend-mode', 'invert', 'mouse', 'effect', 'difference', 'gsap-free', 'dark'],
  created: '2026-10-30',
  updated: '2026-10-30',
  seoTitle: 'Cursor Follower Effect: Blend Mode Circle HTML, CSS & JS',
  seoDescription: 'Free circular cursor follower that inverts the page under it with mix-blend-mode. Set size, colour, blend mode, smoothness and border. Plain HTML, CSS and JS.',
  description: 'A circle that follows the mouse across the whole page and inverts or recolours the text and images under it with a CSS blend mode. Choose its size (about 50 to 100 pixels or any size you like), colour, blend mode (difference, exclusion, multiply and more), how smoothly it follows, and an optional border thickness and style. It can grow over links and buttons, switches off on touch screens and uses transforms only, so it stays smooth.',
  bestFor: ['Portfolio, agency and studio websites', 'Landing pages that want a bold, playful hover effect', 'Typography-heavy pages where inverted text looks striking'],
  behaviors: ['cursor'],
  previewMinHeight: 0,
  /* Writes the settings onto the root and removes the demo stage from exports (called by fillHtml) */
  finalize: (html, state) => {
    const f = state.fields || {};
    const toggles = state.toggles || {};
    const attrs = [
      ['data-enabled', toggles.enabled === false ? 'off' : 'on'],
      ['data-size', num(f.size, 80, 20, 240)],
      ['data-color', hex(f.color, '#ffffff')],
      ['data-blend', pick(f.blend, BLENDS, 'difference')],
      ['data-speed', SPEEDS[pick(f.smooth, Object.keys(SPEEDS), 'smooth')]],
      ['data-border', num(f.borderWidth, 0, 0, 12)],
      ['data-border-style', pick(f.borderStyle, ['solid', 'dashed', 'dotted', 'double'], 'solid')],
      ['data-fill', toggles.fill === false ? 'off' : 'on'],
      ['data-grow', toggles.grow === false ? 'off' : 'on'],
      ['data-hide', toggles.hideCursor === true ? 'on' : 'off'],
    ].map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
    return html.replace('<div class="cf" data-cf>', () => `<div class="cf" data-cf${attrs}>`);
  },

  groups: [
    { id: 'look', label: 'Circle' },
    { id: 'border', label: 'Border (optional)' },
    { id: 'motion', label: 'Movement' },
  ],
  fields: [
    { key: 'size', group: 'look', label: 'Circle size (px)', type: 'text', value: '80', hint: 'Diameter in pixels. 50 to 100 suits most pages; allowed 20 to 240.' },
    { key: 'color', group: 'look', label: 'Circle colour (hex)', type: 'text', value: '#ffffff', hint: 'A hex colour such as #ffffff. With the Difference blend mode, white inverts what is under the circle; other colours shift it.' },
    { key: 'blend', group: 'look', label: 'Blend mode', type: 'choice', options: [['difference', 'Difference (inverts colours)'], ['exclusion', 'Exclusion (softer inversion)'], ['multiply', 'Multiply (darkens)'], ['screen', 'Screen (lightens)'], ['overlay', 'Overlay'], ['soft-light', 'Soft light'], ['hard-light', 'Hard light'], ['color-dodge', 'Color dodge'], ['normal', 'Normal (no blending)']], value: 'difference' },
    { key: 'borderWidth', group: 'border', label: 'Border thickness (px)', type: 'text', value: '0', hint: '0 for no border. With the fill switched off, a border of at least 2 px is used so the ring stays visible.' },
    { key: 'borderStyle', group: 'border', label: 'Border style', type: 'choice', options: [['solid', 'Solid'], ['dashed', 'Dashed'], ['dotted', 'Dotted'], ['double', 'Double']], value: 'solid' },
    { key: 'smooth', group: 'motion', label: 'Animation smoothness', type: 'choice', options: [['instant', 'Instant (sticks to the cursor)'], ['snappy', 'Snappy'], ['smooth', 'Smooth'], ['floaty', 'Floaty (trails behind)']], value: 'smooth', hint: 'How closely the circle follows the pointer. Floaty trails behind with a soft ease.' },
  ],
  lists: [],
  toggles: [
    { key: 'enabled', label: 'Cursor effect on', value: true },
    { key: 'fill', label: 'Filled circle (off = ring only)', value: true },
    { key: 'grow', label: 'Grow over links and buttons', value: true },
    { key: 'hideCursor', label: 'Hide the normal cursor', value: false },
  ],
  theme: { brand: '#ffffff', brandText: '#0b0b0f', bg: '#0b0b0f', surface: '#17171f', text: '#f4f4f6', muted: '#a1a1ad', radius: '18' },
  fonts: { heading: 'space', body: 'inter' },

  html: `<div class="cf" data-cf>
  <div class="cf-stage" aria-hidden="true">
    <p class="cf-word">Cur<b>sors</b></p>
    <p class="cf-sub">Move your mouse over this box</p>
    <div class="cf-art"></div>
    <p class="cf-word cf-word--2">in <b>motion</b></p>
  </div><!--/cf-stage-->
  <span class="cf-dot" aria-hidden="true"></span>
</div>`,
  css: `.st-cursor-follower{overflow:visible;container-type:normal;height:0;min-height:0;padding:0;background:transparent}
.st-cursor-follower:has(.cf.is-preview){height:auto;padding:clamp(20px,3vw,40px) var(--st-pad);background:var(--st-bg)}
.cf-stage{display:none}
.cf.is-preview .cf-stage{position:relative;isolation:isolate;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;overflow:hidden;min-height:clamp(340px,40cqi,480px);border-radius:calc(var(--st-radius) * 1.2px);background:linear-gradient(135deg,#1f1b3a,#3b1d5a 55%,#0f2a4a);color:#f4f4f6;cursor:none}
.cf-word{margin:0;font:900 clamp(56px,11cqi,128px)/.95 var(--st-font-heading);letter-spacing:-.04em;text-transform:lowercase;color:#f4f4f6}
.cf-word b{font-weight:900;background:linear-gradient(90deg,#f472b6,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent}
.cf-word--2{color:rgba(244,244,246,.9)}
.cf-sub{margin:0;font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:rgba(244,244,246,.7)}
.cf-art{width:min(280px,60%);height:70px;border-radius:999px;background:linear-gradient(90deg,#22d3ee,#f59e0b,#f472b6)}
.cf-dot{position:absolute;left:0;top:0;z-index:5;display:none;box-sizing:border-box;border-radius:50%;pointer-events:none;will-change:transform}
.cf.is-preview .cf-dot{display:block}
@media (hover:none){.cf:not(.is-preview) .cf-dot{display:none}}
@media print{.cf-dot{display:none}}`,
};
