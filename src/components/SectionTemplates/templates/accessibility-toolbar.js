import { esc } from './meta.js';

/* Accessibility Toolbar: a floating button that opens a panel of visitor-controlled display
   options (bigger text, line height, text alignment, readable font, contrast, grayscale,
   hide images, pause animations, highlight links, reading mask), like the "Ally" or
   "UserWay" widgets. The section takes no space in the layout (height 0): the button and
   the panel are position:fixed. In the editors it shows the panel inline as a card so its
   labels can be edited by clicking; the options only do something on the real page.
   `finalize` (render.js fillHtml) writes the position and memory settings onto the root; the
   `a11y` behaviour (behaviors.js) opens and closes the panel and applies the options. */

const pick = (v, allowed, d) => (allowed.includes(String(v)) ? String(v) : d);

const I = {
  text: '<path d="M4 7V5h10v2M9 5v12M6 17h6"/><path d="M15 12h6M18 12v6"/>',
  line: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 8l2-2 2 2M3 16l2 2 2-2"/>',
  align: '<path d="M4 6h16M4 12h10M4 18h14"/>',
  font: '<path d="M4 19 10 5l6 14M6.5 14h7"/><path d="M17 11h4M19 11v8"/>',
  contrast: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>',
  gray: '<path d="M12 3s6 6.2 6 10.5A6 6 0 0 1 6 13.500C6 9.200 12 3 12 3z"/><path d="M12 3v16.500" />',
  images: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.500"/><path d="m21 16-5-5-9 8M3 3l18 18"/>',
  motion: '<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>',
  links: '<path d="M10 14a4.500 4.500 0 0 0 6.400 0l3-3a4.500 4.500 0 0 0-6.400-6.400l-1 1"/><path d="M14 10a4.500 4.500 0 0 0-6.400 0l-3 3a4.500 4.500 0 0 0 6.400 6.400l1-1"/>',
  mask: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 15h18"/>',
};
const svg = d => `<svg class="a11y-ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;
const tile = (feature, toggle, label) =>
  `<button type="button" class="a11y-tile" data-feature="${feature}" data-show="${toggle}" aria-pressed="false">${svg(I[feature === 'lineheight' ? 'line' : feature])}<span class="a11y-lab" data-edit="${label}"></span><span class="a11y-pips" aria-hidden="true"></span></button>`;

export default {
  id: 'accessibility-toolbar',
  name: 'Accessibility Toolbar Widget',
  version: '1.0.0',
  category: 'accessibility',
  tags: ['accessibility', 'a11y', 'toolbar', 'widget', 'floating', 'high-contrast', 'bigger-text', 'reading-mask', 'ally', 'wcag', 'light'],
  created: '2026-10-30',
  updated: '2026-10-30',
  seoTitle: 'Accessibility Toolbar Widget: Free HTML, CSS & JS Code',
  seoDescription: 'Free accessibility widget with bigger text, contrast, grayscale, readable font, hide images, pause animations, link highlight and reading mask. Export the code.',
  description: 'A floating accessibility button that opens a panel of display options visitors can switch on for themselves: bigger text, line height, text alignment, a readable font, contrast, grayscale, hide images, pause animations, highlight links and a reading mask. It takes no space in your layout, remembers each visitor\'s choices on their device and works with a keyboard.',
  bestFor: ['Business, school and public-sector websites', 'Landing pages that want a visible accessibility option', 'Any site that wants visitors to adjust text and contrast'],
  behaviors: ['a11y'],
  previewMinHeight: 640,
  /* Called by fillHtml with the section's markup: writes the root settings */
  finalize: (html, state) => {
    const f = state.fields || {};
    const toggles = state.toggles || {};
    const attrs = [
      ['data-pos', pick(f.position, ['right', 'left'], 'right')],
      ['data-remember', toggles.remember === false ? 'off' : 'on'],
    ].map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
    return html.replace('<div class="a11y" data-a11y>', () => `<div class="a11y" data-a11y${attrs}>`);
  },

  groups: [
    { id: 'place', label: 'Position & memory' },
    { id: 'text', label: 'Panel text' },
    { id: 'labels', label: 'Option names' },
    { id: 'features', label: 'Options to show' },
  ],
  fields: [
    { key: 'position', group: 'place', label: 'Button position', type: 'choice', options: [['right', 'Bottom right'], ['left', 'Bottom left']], value: 'right', hint: 'Where the floating button and panel sit on the screen.' },

    { key: 'buttonLabel', group: 'text', label: 'Button label (screen readers)', type: 'text', value: 'Open accessibility tools' },
    { key: 'panelTitle', group: 'text', label: 'Panel title', type: 'text', value: 'Accessibility' },
    { key: 'resetLabel', group: 'text', label: 'Reset button label', type: 'text', value: 'Reset all settings' },
    { key: 'closeLabel', group: 'text', label: 'Close button label', type: 'text', value: 'Close accessibility tools' },
    { key: 'groupText', group: 'text', label: 'Heading: text options', type: 'text', value: 'Text' },
    { key: 'groupVisual', group: 'text', label: 'Heading: visual options', type: 'text', value: 'Visual' },
    { key: 'groupOrient', group: 'text', label: 'Heading: orientation options', type: 'text', value: 'Orientation' },
    { key: 'note', group: 'text', label: 'Note at the bottom (optional)', type: 'text', value: 'Your choices are saved on this device only.' },

    { key: 'labelText', group: 'labels', label: 'Bigger text', type: 'text', value: 'Bigger text' },
    { key: 'labelLine', group: 'labels', label: 'Line height', type: 'text', value: 'Line height' },
    { key: 'labelAlign', group: 'labels', label: 'Text align', type: 'text', value: 'Text align' },
    { key: 'labelFont', group: 'labels', label: 'Readable font', type: 'text', value: 'Readable font' },
    { key: 'labelContrast', group: 'labels', label: 'Contrast', type: 'text', value: 'Contrast' },
    { key: 'labelGray', group: 'labels', label: 'Grayscale', type: 'text', value: 'Grayscale' },
    { key: 'labelImages', group: 'labels', label: 'Hide images', type: 'text', value: 'Hide images' },
    { key: 'labelMotion', group: 'labels', label: 'Pause animations', type: 'text', value: 'Pause animations' },
    { key: 'labelLinks', group: 'labels', label: 'Highlight links', type: 'text', value: 'Highlight links' },
    { key: 'labelMask', group: 'labels', label: 'Reading mask', type: 'text', value: 'Reading mask' },
  ],
  toggles: [
    { key: 'remember', label: 'Remember each visitor\'s choices', value: true },
    { key: 'showText', label: 'Bigger text', value: true },
    { key: 'showLine', label: 'Line height', value: true },
    { key: 'showAlign', label: 'Text align', value: true },
    { key: 'showFont', label: 'Readable font', value: true },
    { key: 'showContrast', label: 'Contrast', value: true },
    { key: 'showGray', label: 'Grayscale', value: true },
    { key: 'showImages', label: 'Hide images', value: true },
    { key: 'showMotion', label: 'Pause animations', value: true },
    { key: 'showLinks', label: 'Highlight links', value: true },
    { key: 'showMask', label: 'Reading mask', value: true },
  ],
  theme: { brand: '#2f41d6', brandText: '#ffffff', bg: '#ffffff', surface: '#f1f3fb', text: '#0f172a', muted: '#475569', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="a11y" data-a11y>
  <button type="button" class="a11y-fab" aria-expanded="false" data-a11y-open data-set="aria-label:buttonLabel">
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="7.500" r="1.200" fill="currentColor"/><path d="M7 10.500l5 1 5-1M12 11.500v3.500M9.500 19l2.500-4 2.500 4"/></svg>
  </button>
  <div class="a11y-panel" role="dialog" tabindex="-1" data-set="aria-label:panelTitle" hidden>
    <div class="a11y-head">
      <h2 class="a11y-title" data-edit="panelTitle"></h2>
      <button type="button" class="a11y-icon" data-a11y-reset data-set="aria-label:resetLabel;title:resetLabel"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.700L3 8"/><path d="M3 3v5h5"/></svg></button>
      <button type="button" class="a11y-icon" data-a11y-close data-set="aria-label:closeLabel;title:closeLabel"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.400" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    </div>
    <div class="a11y-body">
      <div class="a11y-sec">
        <h3 class="a11y-h" data-edit="groupText"></h3>
        <div class="a11y-grid">
          ${tile('text', 'showText', 'labelText')}
          ${tile('lineheight', 'showLine', 'labelLine')}
          ${tile('align', 'showAlign', 'labelAlign')}
          ${tile('font', 'showFont', 'labelFont')}
        </div>
      </div>
      <div class="a11y-sec">
        <h3 class="a11y-h" data-edit="groupVisual"></h3>
        <div class="a11y-grid">
          ${tile('contrast', 'showContrast', 'labelContrast')}
          ${tile('gray', 'showGray', 'labelGray')}
          ${tile('images', 'showImages', 'labelImages')}
          ${tile('motion', 'showMotion', 'labelMotion')}
        </div>
      </div>
      <div class="a11y-sec">
        <h3 class="a11y-h" data-edit="groupOrient"></h3>
        <div class="a11y-grid">
          ${tile('links', 'showLinks', 'labelLinks')}
          ${tile('mask', 'showMask', 'labelMask')}
        </div>
      </div>
      <p class="a11y-note" data-edit="note"></p>
    </div>
  </div>
</div>`,
  css: `.st-accessibility-toolbar{overflow:visible;container-type:normal;height:0;min-height:0;background:transparent}
.st-accessibility-toolbar:has(.a11y.is-preview){height:auto;padding:clamp(24px,4vw,48px) var(--st-pad);background:color-mix(in srgb,var(--st-text) 8%,var(--st-bg))}
.a11y{--a11y-w:380px}
.a11y-fab{position:fixed;bottom:20px;z-index:2147483000;display:grid;place-items:center;width:58px;height:58px;padding:0;border:3px solid #fff;border-radius:50%;background:var(--st-brand);color:var(--st-btn-text);cursor:pointer;box-shadow:0 10px 28px -6px rgba(15,23,42,.5);transition:transform .2s ease,box-shadow .2s ease}
.a11y[data-pos=right] .a11y-fab{right:20px}
.a11y[data-pos=left] .a11y-fab{left:20px}
.a11y-fab:hover{transform:scale(1.06)}
.a11y-fab:focus-visible,.a11y-tile:focus-visible,.a11y-icon:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 60%,#fff);outline-offset:3px}
.a11y.is-open .a11y-fab{box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 30%,transparent),0 10px 28px -6px rgba(15,23,42,.5)}
.a11y-panel{position:fixed;bottom:92px;z-index:2147483001;display:flex;flex-direction:column;width:min(var(--a11y-w),calc(100vw - 24px));max-height:calc(100vh - 116px);max-height:calc(100dvh - 116px);overflow:hidden;border-radius:calc(var(--st-radius) * 1.3px);background:var(--st-bg);color:var(--st-text);font-family:var(--st-font-body);font-size:15px;line-height:1.4;box-shadow:0 30px 70px -18px rgba(15,23,42,.55),0 0 0 1px color-mix(in srgb,var(--st-text) 8%,transparent);opacity:0;transform:translateY(12px) scale(.98);transition:opacity .2s ease,transform .2s ease}
.a11y-panel[hidden]{display:none}
.a11y[data-pos=right] .a11y-panel{right:20px}
.a11y[data-pos=left] .a11y-panel{left:20px}
.a11y.is-open .a11y-panel{opacity:1;transform:none}
.a11y-head{display:flex;align-items:center;gap:6px;padding:13px 18px;background:linear-gradient(135deg,var(--st-brand),color-mix(in srgb,var(--st-brand) 70%,#000));color:var(--st-btn-text)}
.a11y-title{flex:1;margin:0;font-family:var(--st-font-heading);font-size:21px;font-weight:800;letter-spacing:-.01em;color:inherit}
.a11y-icon{display:grid;place-items:center;width:34px;height:34px;padding:0;border:0;border-radius:50%;background:rgba(255,255,255,.16);color:inherit;cursor:pointer;transition:background .15s ease}
.a11y-icon:hover{background:rgba(255,255,255,.3)}
.a11y-body{overflow-y:auto;padding:12px 14px 14px;background:var(--st-surface);overscroll-behavior:contain}
.a11y-sec{margin-bottom:10px;padding:12px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-bg)}
.a11y-sec:not(:has(.a11y-tile)){display:none}
.a11y-h{margin:0 0 8px;font-size:14px;font-weight:700;color:var(--st-text)}
.a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.a11y-tile{position:relative;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;gap:8px;min-height:70px;padding:10px 12px;border:2px solid transparent;border-radius:calc(var(--st-radius) * .75px);background:var(--st-surface);color:var(--st-text);font:600 14px/1.25 var(--st-font-body);text-align:left;cursor:pointer;transition:background .15s ease,border-color .15s ease,color .15s ease}
.a11y-tile:hover{border-color:color-mix(in srgb,var(--st-brand) 35%,transparent)}
.a11y-tile[aria-pressed=true]{border-color:var(--st-brand);background:color-mix(in srgb,var(--st-brand) 12%,var(--st-bg));color:var(--st-brand)}
.a11y-ic{flex:none}
.a11y-lab{display:block}
.a11y-pips{display:flex;gap:4px;min-height:6px}
.a11y-pip{width:16px;height:5px;border-radius:3px;background:color-mix(in srgb,var(--st-text) 18%,transparent)}
.a11y-pip.on{background:var(--st-brand)}
.a11y-note{margin:4px 2px 0;font-size:12.5px;color:var(--st-muted);text-align:center}
.a11y-note:empty{display:none}
.a11y.is-preview .a11y-fab{display:none}
.a11y.is-preview .a11y-panel{position:relative;inset:auto;margin:0 auto;opacity:1;transform:none;max-height:none}
.a11y-mask{position:fixed;left:0;right:0;z-index:2147482000;background:rgba(0,0,0,.78);pointer-events:none}
@media (max-width:480px){.a11y-grid{gap:8px}.a11y-tile{min-height:76px;padding:10px}}
@media (prefers-reduced-motion:reduce){.a11y-fab,.a11y-panel{transition:none}}
@media print{.a11y,.a11y-mask{display:none}}`,
};
