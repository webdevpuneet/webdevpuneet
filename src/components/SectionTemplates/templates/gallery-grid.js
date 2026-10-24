import { IMG } from './meta.js';

export default {
  id: 'gallery-grid',
  name: 'Filterable Image Gallery',
  version: '1.0.0',
  category: 'gallery',
  tags: ['gallery', 'images', 'photos', 'portfolio', 'grid', 'filter', 'lightbox', 'light'],
  created: '2026-10-24',
  updated: '2026-10-24',
  seoTitle: 'Image Gallery Section Template — Free Filter & Lightbox HTML',
  seoDescription: 'Free image gallery section: a responsive photo grid with filter buttons and a keyboard-friendly lightbox. Edit it online and export HTML, React or Vue.',
  description: 'A responsive photo gallery: a heading, optional filter buttons built from each photo’s tag, and a grid of uniform thumbnails that zoom gently on hover with a caption sliding up. Clicking a photo opens a full-screen viewer with next and previous buttons, a caption and a counter; Escape closes it and the arrow keys move between photos.',
  bestFor: ['Photographer and portfolio galleries', 'Hotel, restaurant and venue photo pages', 'Project, event and team photo walls'],
  behaviors: ['gallery'],

  groups: [
    { id: 'header', label: 'Heading', toggle: 'showHeader' },
    { id: 'items', label: 'Photos' },
    { id: 'filters', label: 'Filters', toggle: 'showFilters' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Gallery' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'A look *around the place*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Rooms, spaces and evenings from the past year. Pick a category or tap any photo to see it larger.' },
    { key: 'allLabel', group: 'filters', label: 'Label of the “show all” button', type: 'text', value: 'All' },
  ],
  lists: [{
    key: 'images', group: 'items', label: 'Photos', itemLabel: 'Photo', titleKey: 'title', min: 2, max: 24,
    fields: [
      { key: 'image', label: 'Photo', type: 'image', value: '', hint: 'About 1200×900 px. It is cropped to a 4:3 tile in the grid and shown in full in the viewer.', upload: { name: 'gallery', maxW: 1600 } },
      { key: 'imageAlt', label: 'Alt text', type: 'text', value: '', hint: 'Describe the photo for screen readers and search engines.' },
      { key: 'tag', label: 'Category (used by the filters)', type: 'text', value: 'Photos' },
      { key: 'title', label: 'Caption title', type: 'text', value: 'Photo title' },
      { key: 'text', label: 'Caption text (optional)', type: 'text', value: '' },
    ],
    value: [
      { image: IMG('room-1.jpg'), imageAlt: 'A bright double room with tall windows and a lamp', tag: 'Rooms', title: 'Garden room', text: 'Morning light and a quiet view' },
      { image: IMG('wed-dinner.jpg'), imageAlt: 'A long dinner table set with candles', tag: 'Events', title: 'Dinner by candlelight', text: 'Long tables for up to 60 guests' },
      { image: IMG('tpl-hotel.jpg'), imageAlt: 'The hotel building at dusk beside a swimming pool', tag: 'Places', title: 'Poolside at dusk', text: 'Open until ten every evening' },
      { image: IMG('room-2.jpg'), imageAlt: 'A calm green room with a bed and a floor lamp', tag: 'Rooms', title: 'Sea room', text: 'Soft greens and a deep bath' },
      { image: IMG('wed-party.jpg'), imageAlt: 'String lights over a dance floor at night', tag: 'Events', title: 'Evening lights', text: 'Dancing under the stars' },
      { image: IMG('tpl-nature.jpg'), imageAlt: 'Green hills at sunrise', tag: 'Places', title: 'Hills at sunrise', text: 'A ten-minute walk from the door' },
      { image: IMG('room-3.jpg'), imageAlt: 'A dark suite with gold details and a lit lamp', tag: 'Rooms', title: 'Night suite', text: 'Our largest room, with a terrace' },
      { image: IMG('tpl-event.jpg'), imageAlt: 'A stage lit by spotlights in front of an audience', tag: 'Events', title: 'The main stage', text: 'Talks, concerts and screenings' },
      { image: IMG('tpl-salon.jpg'), imageAlt: 'A row of chairs in front of three arched mirrors', tag: 'Places', title: 'The studio', text: 'Light, mirrors and plenty of plants' },
    ],
  }],
  toggles: [
    { key: 'showHeader', label: 'Heading', value: true },
    { key: 'showFilters', label: 'Filter buttons', value: true },
    { key: 'showCaptions', label: 'Captions on hover', value: true },
  ],
  theme: { brand: '#0d9488', brandText: '#ffffff', bg: '#ffffff', surface: '#f1f5f9', text: '#0f172a', muted: '#64748b', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head" data-show="showHeader">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="gg-filters" data-gallery-filters data-show="showFilters" data-set="data-all:allLabel" role="group" aria-label="Filter photos" hidden></div>
  <ul class="gg-grid" data-gallery data-list="images">
    <li class="gg-item" data-anim="item" data-set="data-tag:tag">
      <img class="gg-img" data-image="image" alt="" width="1200" height="900" loading="lazy">
      <p class="gg-cap" data-show="showCaptions"><strong class="gg-title" data-edit="title"></strong><span class="gg-text" data-show-if="text" data-edit="text"></span></p>
    </li>
  </ul>
</div>`,
  css: `.st-gallery-grid{padding:clamp(56px,7cqi,104px) 0}
.gg-filters{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:clamp(24px,3cqi,36px)}
.gg-filters:empty{display:none}
.gg-chip{min-height:40px;padding:0 18px;border:1px solid color-mix(in srgb,var(--st-text) 14%,transparent);border-radius:999px;background:transparent;color:var(--st-text);font:600 14.5px/1 var(--st-font-body);cursor:pointer;transition:background .2s ease,color .2s ease,border-color .2s ease}
.gg-chip:hover{border-color:var(--st-brand);color:var(--st-brand)}
.gg-chip[aria-pressed="true"]{background:var(--st-brand);border-color:var(--st-brand);color:var(--st-btn-text)}
.gg-chip:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 45%,transparent);outline-offset:2px}
.gg-grid{list-style:none;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:clamp(12px,1.6cqi,20px)}
.gg-item{position:relative;overflow:hidden;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);aspect-ratio:4/3}
.gg-item[hidden]{display:none}
.gg-item[role="button"]{cursor:zoom-in}
.gg-item:focus-visible{outline:3px solid var(--st-brand);outline-offset:3px}
.gg-img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.8,.2,1)}
.gg-item:hover .gg-img{transform:scale(1.07)}
.gg-cap{position:absolute;inset:auto 0 0;display:flex;flex-direction:column;gap:2px;padding:44px 16px 14px;color:#fff;background:linear-gradient(to top,rgba(10,12,20,.78),transparent);opacity:0;transform:translateY(8px);transition:opacity .3s ease,transform .3s ease}
.gg-item:hover .gg-cap,.gg-item:focus-visible .gg-cap{opacity:1;transform:none}
.gg-title{font-size:16px;line-height:1.3}
.gg-text{font-size:13.5px;opacity:.85}
@media (hover:none){.gg-cap{opacity:1;transform:none}}
.stg-lb{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:clamp(16px,4vw,48px);background:rgba(8,10,16,.92);animation:stg-fade .2s ease}
.stg-lb[hidden]{display:none}
.stg-lb-fig{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:min(1100px,100%);max-height:100%;margin:0}
.stg-lb-img{display:block;max-width:100%;max-height:calc(var(--lb-h,100vh) - 150px);border-radius:10px;object-fit:contain;background:#111}
.stg-lb-cap{color:#e5e7eb;font:500 15px/1.5 system-ui,sans-serif;text-align:center}
.stg-lb-cap:empty{display:none}
.stg-lb-close,.stg-lb-nav{position:absolute;display:grid;place-items:center;width:48px;height:48px;border:0;border-radius:50%;background:rgba(255,255,255,.12);color:#fff;font:400 30px/1 system-ui,sans-serif;cursor:pointer;transition:background .2s ease}
.stg-lb-close svg,.stg-lb-nav svg{display:block;width:22px;height:22px;pointer-events:none}
.stg-lb-close:hover,.stg-lb-nav:hover{background:rgba(255,255,255,.24)}
.stg-lb-close:focus-visible,.stg-lb-nav:focus-visible{outline:3px solid #fff;outline-offset:2px}
.stg-lb-close{top:16px;right:16px}
.stg-lb-prev{left:16px;top:50%;margin-top:-24px}
.stg-lb-next{right:16px;top:50%;margin-top:-24px}
.stg-lb.is-single .stg-lb-nav{display:none}
.stg-lb-count{position:absolute;bottom:14px;left:0;right:0;margin:0;color:#9ca3af;font:500 13px/1 system-ui,sans-serif;text-align:center}
html.stg-open{overflow:hidden}
@keyframes stg-fade{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.stg-lb{animation:none}.gg-img,.gg-cap{transition:none}}
@container st (max-width:520px){.gg-grid{grid-template-columns:1fr 1fr}.gg-cap{display:none}}`,
};
