import { esc } from './meta.js';

/* Back to Top Button: a floating button that appears after the visitor has scrolled down a set number of pixels
   and scrolls the page smoothly back to the top when clicked. The section takes no space in the layout (the button is
   position:fixed). Settings: trigger distance, icon style, corner (bottom right or left), size, colours, how it appears
   (fade, slide or zoom), scroll speed, shape (circle, square, rounded or a custom radius), show on mobile, on or off.
   In the editors a mock page with the button already visible is shown. `finalize` (render.js fillHtml) writes the
   settings and the chosen icon; the `backtop` behaviour (behaviors.js) shows the button and scrolls. */

const pick = (v, allowed, d) => (allowed.includes(String(v)) ? String(v) : d);
const num = (v, d, min, max) => { const n = parseFloat(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : d; };
const hex = v => (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(v || '').trim()) ? String(v).trim() : '');

const ICONS = {
  arrow: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  chevron: '<path d="m6 15 6-6 6 6"/>',
  double: '<path d="m6 17 6-6 6 6M6 11l6-6 6 6"/>',
  caret: '<path d="m7 15 5-6 5 6z" fill="currentColor"/>',
  rocket: '<path d="M12 3c3 2 5 5 5 9l-2 3H9l-2-3c0-4 2-7 5-9z"/><circle cx="12" cy="10" r="1.500"/><path d="M9 15l-2 4M15 15l2 4M12 17v4"/>',
};
const svg = d => `<svg class="btt-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;

export default {
  id: 'back-to-top',
  name: 'Back to Top Button',
  version: '1.0.0',
  category: 'effects',
  tags: ['back-to-top', 'scroll-to-top', 'floating-button', 'sticky', 'scroll', 'button', 'utility', 'light'],
  created: '2026-10-30',
  updated: '2026-10-30',
  seoTitle: 'Back to Top Button: Free Floating Scroll-to-Top HTML & JS',
  seoDescription: 'Free floating back to top button that appears after you scroll. Set the trigger distance, icon, position, size, colours, shape, animation and scroll speed.',
  description: 'A floating scroll-to-top button that appears after the visitor has scrolled down a distance you choose and glides back to the top of the page when clicked. Choose the trigger distance, the arrow icon, the corner (bottom right or left), the size, colours, shape (circle, square, rounded or a custom corner radius), how it appears (fade, slide or zoom), how fast it scrolls, and whether it shows on mobile. It takes no space in your layout and works with a keyboard.',
  bestFor: ['Long landing pages, blogs and documentation', 'Any website with pages taller than a few screens', 'Shops and listings where visitors scroll far down'],
  behaviors: ['backtop'],
  previewMinHeight: 0,
  /* Writes the settings and the chosen icon (called by fillHtml); the script removes the demo page on real pages */
  finalize: (html, state) => {
    const f = state.fields || {};
    const toggles = state.toggles || {};
    const shape = pick(f.shape, ['circle', 'rounded', 'square', 'custom'], 'circle');
    const size = num(f.size, 52, 32, 96);
    const radius = shape === 'circle' ? '50%' : shape === 'square' ? '0' : shape === 'rounded' ? '14px' : `${num(f.radius, 20, 0, 60)}px`;
    const vars = [
      ['--btt-size', `${size}px`], ['--btt-off', `${num(f.offset, 24, 8, 120)}px`], ['--btt-radius', radius],
      ['--btt-speed', `${num(f.speed, 0.8, 0, 4)}s`],
    ];
    const bg = hex(f.bg), fg = hex(f.fg);
    if (bg) vars.push(['--btt-bg', bg]);
    if (fg) vars.push(['--btt-fg', fg]);
    const attrs = [
      ['data-enabled', toggles.enabled === false ? 'off' : 'on'],
      ['data-distance', num(f.distance, 400, 0, 5000)],
      ['data-pos', pick(f.position, ['right', 'left'], 'right')],
      ['data-appear', pick(f.appear, ['fade', 'slide', 'zoom'], 'fade')],
      ['data-speed', num(f.speed, 0.8, 0, 4)],
      ['data-mobile', toggles.showMobile === false ? 'off' : 'on'],
      ['data-shadow', toggles.shadow === false ? 'off' : 'on'],
      ['style', vars.map(([k, v]) => `${k}:${v}`).join(';')],
    ].map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
    return html.replace('<div class="btt" data-btt>', () => `<div class="btt" data-btt${attrs}>`)
      .replace('<span class="btt-ico"></span>', () => svg(ICONS[pick(f.icon, Object.keys(ICONS), 'arrow')]));
  },

  groups: [
    { id: 'when', label: 'When it appears' },
    { id: 'look', label: 'Look' },
    { id: 'motion', label: 'Animation & speed' },
  ],
  fields: [
    { key: 'distance', group: 'when', label: 'Show after scrolling (px)', type: 'text', value: '400', hint: 'The button appears once the page has scrolled this many pixels from the top. 0 shows it straight away; allowed 0 to 5000.' },
    { key: 'position', group: 'look', label: 'Position', type: 'choice', options: [['right', 'Bottom right'], ['left', 'Bottom left']], value: 'right' },
    { key: 'offset', group: 'look', label: 'Distance from the edges (px)', type: 'text', value: '24' },
    { key: 'icon', group: 'look', label: 'Icon style', type: 'choice', options: [['arrow', 'Arrow up'], ['chevron', 'Chevron'], ['double', 'Double chevron'], ['caret', 'Triangle'], ['rocket', 'Rocket']], value: 'arrow' },
    { key: 'size', group: 'look', label: 'Size (px)', type: 'text', value: '52', hint: 'Width and height of the button. Between 32 and 96.' },
    { key: 'shape', group: 'look', label: 'Shape', type: 'choice', options: [['circle', 'Circle'], ['rounded', 'Rounded square'], ['square', 'Square'], ['custom', 'Custom corner radius']], value: 'circle' },
    { key: 'radius', group: 'look', label: 'Custom corner radius (px)', type: 'text', value: '20', hint: 'Used when the shape is Custom.' },
    { key: 'bg', group: 'look', label: 'Background colour (hex, optional)', type: 'text', value: '', hint: 'A hex colour such as #4f46e5. Leave empty to use the theme brand colour.' },
    { key: 'fg', group: 'look', label: 'Icon colour (hex, optional)', type: 'text', value: '', hint: 'A hex colour such as #ffffff. Leave empty to use the theme button text colour.' },
    { key: 'appear', group: 'motion', label: 'How it appears', type: 'choice', options: [['fade', 'Fade in'], ['slide', 'Slide up'], ['zoom', 'Zoom in']], value: 'fade' },
    { key: 'speed', group: 'motion', label: 'Scroll duration (seconds)', type: 'text', value: '0.8', hint: 'How long the scroll back to the top takes. 0 jumps instantly; allowed up to 4. People who prefer reduced motion always get an instant jump.' },
    { key: 'label', group: 'motion', label: 'Button label (screen readers)', type: 'text', value: 'Back to top' },
  ],
  lists: [],
  toggles: [
    { key: 'enabled', label: 'Button on', value: true },
    { key: 'showMobile', label: 'Show on phones and tablets', value: true },
    { key: 'shadow', label: 'Shadow', value: true },
  ],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f4f4f8', text: '#0f172a', muted: '#64748b', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="btt" data-btt>
  <div class="btt-demo" aria-hidden="true">
    <span class="btt-bar btt-bar--lg"></span><span class="btt-bar"></span><span class="btt-bar btt-bar--md"></span><span class="btt-bar"></span><span class="btt-bar btt-bar--sm"></span>
    <span class="btt-note">The button appears here once the page has scrolled</span>
  </div><!--/btt-demo-->
  <button type="button" class="btt-btn" data-set="aria-label:label;title:label"><span class="btt-ico"></span></button>
</div>`,
  css: `.st-back-to-top{overflow:visible;container-type:normal;height:0;min-height:0;padding:0;background:transparent}
.st-back-to-top:has(.btt.is-preview){height:auto;padding:clamp(20px,3vw,40px) var(--st-pad);background:color-mix(in srgb,var(--st-text) 6%,var(--st-bg))}
.btt{--btt-size:52px;--btt-off:24px;--btt-radius:50%;--btt-speed:.8s;--btt-bg:var(--st-brand);--btt-fg:var(--st-btn-text)}
.btt-btn{position:fixed;bottom:var(--btt-off);z-index:2147482500;display:grid;place-items:center;width:var(--btt-size);height:var(--btt-size);padding:0;border:0;border-radius:var(--btt-radius);background:var(--btt-bg);color:var(--btt-fg);cursor:pointer;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .3s ease,transform .3s ease,visibility 0s .3s,box-shadow .2s ease,background .2s ease}
.btt[data-pos=right] .btt-btn{right:var(--btt-off)}
.btt[data-pos=left] .btt-btn{left:var(--btt-off)}
.btt[data-appear=slide] .btt-btn{transform:translateY(28px)}
.btt[data-appear=zoom] .btt-btn{transform:scale(.5)}
.btt[data-shadow=on] .btt-btn{box-shadow:0 12px 28px -8px rgba(15,23,42,.45)}
.btt.is-visible .btt-btn{opacity:1;visibility:visible;pointer-events:auto;transform:none;transition:opacity .3s ease,transform .3s ease,visibility 0s,box-shadow .2s ease,background .2s ease}
.btt.is-visible .btt-btn:hover{transform:translateY(-3px)}
.btt.is-visible .btt-btn:active{transform:translateY(0) scale(.96)}
.btt-btn:focus-visible{outline:3px solid color-mix(in srgb,var(--btt-bg) 55%,#fff);outline-offset:3px}
.btt-svg{width:calc(var(--btt-size) * .46);height:calc(var(--btt-size) * .46)}
@media (max-width:899px){.btt[data-mobile=off] .btt-btn{display:none}}
.btt[data-enabled=off] .btt-btn{display:none}
.btt-demo{display:none}
.btt.is-preview .btt-demo{position:relative;display:flex;flex-direction:column;gap:14px;min-height:320px;padding:34px 30px;border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-bg);box-shadow:0 20px 50px -24px color-mix(in srgb,var(--st-text) 40%,transparent)}
.btt-bar{display:block;height:14px;width:100%;border-radius:7px;background:color-mix(in srgb,var(--st-text) 12%,transparent)}
.btt-bar--lg{height:22px;width:62%;background:color-mix(in srgb,var(--st-text) 22%,transparent)}
.btt-bar--md{width:84%}.btt-bar--sm{width:46%}
.btt-note{margin-top:auto;font-size:13px;color:var(--st-muted)}
.btt.is-preview .btt-btn{position:absolute;right:calc(var(--st-pad) + 18px);bottom:calc(clamp(20px,3vw,40px) + 18px);opacity:1;visibility:visible;pointer-events:auto;transform:none}
.btt.is-preview[data-pos=left] .btt-btn{right:auto;left:calc(var(--st-pad) + 18px)}
@media (prefers-reduced-motion:reduce){.btt-btn{transition:none}}
@media print{.btt{display:none}}`,
};
