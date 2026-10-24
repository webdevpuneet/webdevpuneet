import { IMG } from './meta.js';

export default {
  id: 'before-after-slider',
  name: 'Before & After Slider',
  version: '1.0.0',
  category: 'gallery',
  tags: ['before-after', 'comparison', 'slider', 'transformation', 'results', 'gallery', 'light'],
  created: '2026-10-24',
  updated: '2026-10-24',
  seoTitle: 'Before and After Slider Template — Free Image Compare HTML',
  seoDescription: 'Free before and after section: drag a divider to compare two photos, with labels, captions and keyboard control. Edit it online and export HTML, React or Vue.',
  description: 'A results section built around a draggable divider: two photos sit on top of each other and the visitor slides the handle to reveal the before or the after, with Before and After labels in the corners and a caption underneath. It works with the mouse, touch and the arrow keys, and shows a fixed 50% split when JavaScript is off.',
  bestFor: ['Salons, clinics and cleaning companies showing results', 'Renovation, landscaping and interior design projects', 'Fitness, photo retouching and product improvements'],
  behaviors: ['compare'],

  groups: [
    { id: 'header', label: 'Heading', toggle: 'showHeader' },
    { id: 'items', label: 'Comparisons' },
    { id: 'labels', label: 'Labels' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Real results' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'See the *difference* for yourself' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Drag the handle to compare each project before and after we finished.' },
    { key: 'beforeLabel', group: 'labels', label: 'Before label', type: 'text', value: 'Before' },
    { key: 'afterLabel', group: 'labels', label: 'After label', type: 'text', value: 'After' },
    { key: 'sliderLabel', group: 'labels', label: 'Slider label (screen readers)', type: 'text', value: 'Drag to compare before and after' },
  ],
  lists: [{
    key: 'pairs', group: 'items', label: 'Comparisons', itemLabel: 'Comparison', titleKey: 'title', min: 1, max: 4,
    fields: [
      { key: 'before', label: 'Before photo', type: 'image', value: '', hint: 'Use the same size and framing as the after photo (about 1200×800 px).', upload: { name: 'before', maxW: 1400 } },
      { key: 'beforeAlt', label: 'Before alt text', type: 'text', value: '' },
      { key: 'after', label: 'After photo', type: 'image', value: '', hint: 'Same size and framing as the before photo.', upload: { name: 'after', maxW: 1400 } },
      { key: 'afterAlt', label: 'After alt text', type: 'text', value: '' },
      { key: 'title', label: 'Title', type: 'text', value: 'Project title' },
      { key: 'caption', label: 'Caption (optional)', type: 'text', value: '' },
    ],
    value: [
      { before: IMG('room-2.jpg'), beforeAlt: 'The guest room before the refresh, with green walls', after: IMG('room-4.jpg'), afterAlt: 'The same room after the refresh, in warm rose tones', title: 'Guest room refresh', caption: 'New colours, new lighting, finished in two days.' },
      { before: IMG('tpl-restaurant.jpg'), beforeAlt: 'The dining table before restyling', after: IMG('wed-dinner.jpg'), afterAlt: 'The same table after restyling, set with candles', title: 'Dining room restyle', caption: 'Candlelight and a longer table for events.' },
    ],
  }],
  toggles: [{ key: 'showHeader', label: 'Heading', value: true }],
  theme: { brand: '#7c3aed', brandText: '#ffffff', bg: '#ffffff', surface: '#f5f3ff', text: '#0f172a', muted: '#64748b', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head" data-show="showHeader">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <ul class="ba-grid" data-list="pairs">
    <li class="ba-item" data-anim="item">
      <div class="ba-compare" data-compare>
        <img class="ba-img ba-after" data-image="after" alt="" width="1200" height="800" loading="lazy">
        <img class="ba-img ba-before" data-image="before" alt="" width="1200" height="800" loading="lazy">
        <span class="ba-tag ba-tag-before" data-edit="beforeLabel"></span>
        <span class="ba-tag ba-tag-after" data-edit="afterLabel"></span>
        <span class="ba-handle" aria-hidden="true"><span class="ba-knob"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 7-5 5 5 5M15 7l5 5-5 5"/></svg></span></span>
        <input class="ba-range" type="range" min="0" max="100" value="50" data-set="aria-label:sliderLabel">
      </div>
      <h3 class="ba-title" data-edit="title"></h3>
      <p class="ba-cap" data-show-if="caption" data-edit="caption"></p>
    </li>
  </ul>
</div>`,
  css: `.st-before-after-slider{padding:clamp(56px,7cqi,104px) 0}
.ba-grid{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(24px,3cqi,40px)}
.ba-item{display:flex;flex-direction:column;gap:8px}
.ba-compare{--pos:50%;position:relative;overflow:hidden;aspect-ratio:3/2;margin-bottom:8px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);box-shadow:0 30px 60px -36px color-mix(in srgb,var(--st-text) 55%,transparent);touch-action:pan-y;user-select:none}
.ba-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none}
.ba-before{clip-path:inset(0 calc(100% - var(--pos)) 0 0)}
.ba-tag{position:absolute;top:14px;padding:5px 12px;border-radius:999px;background:rgba(10,12,20,.62);color:#fff;font:700 12.5px/1 var(--st-font-body);letter-spacing:.04em;text-transform:uppercase;backdrop-filter:blur(4px);pointer-events:none}
.ba-tag-before{left:14px}
.ba-tag-after{right:14px}
.ba-handle{position:absolute;top:0;bottom:0;left:var(--pos);width:3px;margin-left:-1.5px;background:#fff;box-shadow:0 0 0 1px rgba(10,12,20,.12);pointer-events:none}
.ba-knob{position:absolute;top:50%;left:50%;display:grid;place-items:center;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:#fff;color:var(--st-brand);box-shadow:0 8px 22px -6px rgba(10,12,20,.5)}
.ba-range{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:ew-resize;-webkit-appearance:none;appearance:none}
.ba-compare:has(.ba-range:focus-visible){outline:3px solid var(--st-brand);outline-offset:3px}
.ba-compare.is-static .ba-range{display:none}
.ba-compare.is-static .ba-handle{pointer-events:auto;cursor:ew-resize;touch-action:none}
.ba-compare.is-static .ba-handle::before{content:"";position:absolute;top:0;bottom:0;left:-18px;right:-18px}
.ba-title{font-size:19px;line-height:1.3;letter-spacing:-.015em}
.ba-cap{color:var(--st-muted);font-size:15.5px}`,
};
