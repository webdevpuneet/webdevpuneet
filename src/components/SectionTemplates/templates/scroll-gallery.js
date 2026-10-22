import { IMG } from './meta.js';

export default {
  id: 'scroll-gallery',
  name: 'Horizontal Scroll Gallery',
  version: '1.0.0',
  category: 'scroll',
  anchor: 'work',
  tags: ['scroll', 'horizontal scroll', 'gallery', 'pinned', 'portfolio', 'gsap', 'dark'],
  created: '2026-10-22',
  updated: '2026-10-22',
  seoTitle: 'Horizontal Scroll Gallery Section — Free GSAP Template',
  seoDescription: 'Free horizontal scroll section: the gallery pins and its cards slide sideways as you scroll down, built with GSAP ScrollTrigger. Swipe on phones; export HTML.',
  description: 'A gallery that turns vertical scrolling into horizontal movement. On larger screens the section pins and a row of tall image cards slides sideways as visitors scroll down, then the page carries on. Each card has a photo, a tag, a title and a line of text, and links anywhere. On phones and without JavaScript it is a swipeable row with scroll snapping.',
  bestFor: ['Portfolio and case study showcases', 'Product collections and lookbooks', 'Destinations, rooms or menus to browse'],
  behaviors: ['hscroll'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Cards' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Selected work' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Scroll through *our latest projects*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Brands, products and campaigns we shipped this year. Keep scrolling and the gallery moves sideways.' },
  ],
  lists: [{
    key: 'cards', group: 'items', label: 'Cards', itemLabel: 'Card', titleKey: 'title', min: 2, max: 12,
    fields: [
      { key: 'image', label: 'Image', type: 'image', value: '', hint: 'A tall image works best (about 900×1100 px).', upload: { name: 'gallery', maxW: 1100 } },
      { key: 'imageAlt', label: 'Image alt text', type: 'text', value: '' },
      { key: 'tag', label: 'Tag (optional)', type: 'text', value: 'Project' },
      { key: 'title', label: 'Title', type: 'text', value: 'A new project' },
      { key: 'text', label: 'Text (optional)', type: 'textarea', value: 'A line about this project.' },
      { key: 'url', label: 'Link', type: 'url', value: '#' },
    ],
    value: [
      { image: IMG('blog-1.jpg'), tag: 'Brand identity', title: 'Northwind rebrand', text: 'A calmer identity for a logistics company going global.', url: '#' },
      { image: IMG('blog-2.jpg'), tag: 'Website', title: 'Lumen Health', text: 'A patient-first website that doubled online bookings.', url: '#' },
      { image: IMG('blog-3.jpg'), tag: 'Product', title: 'Fieldnote app', text: 'A notes app that turns meetings into next steps.', url: '#' },
      { image: IMG('blog-4.jpg'), tag: 'Campaign', title: 'Sunday Roast', text: 'A launch campaign for a coffee roaster’s first café.', url: '#' },
      { image: IMG('blog-5.jpg'), tag: 'E-commerce', title: 'Atlas Outdoors', text: 'A storefront that loads in under a second.', url: '#' },
      { image: IMG('blog-6.jpg'), tag: 'Motion', title: 'Kite launch film', text: 'A 40-second product film for a fintech launch.', url: '#' },
    ],
  }],
  theme: { brand: '#f472b6', brandText: '#1a0b14', bg: '#0c0a10', surface: '#17141d', text: '#f5f3f7', muted: '#a39fae', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap hs-head">
  <div class="hs-titles">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
  </div>
  <p class="st-lead hs-lead" data-anim="item" data-edit="lead"></p>
</div>
<div class="hs-row" data-hscroll data-list="cards">
  <a class="hs-card" data-href="url">
    <img class="hs-img" data-image="image" alt="" width="900" height="1100" loading="lazy">
    <span class="hs-tag" data-edit="tag"></span>
    <span class="hs-title" data-edit="title"></span>
    <span class="hs-text" data-edit="text"></span>
  </a>
</div>`,
  css: `.st-scroll-gallery{padding:clamp(64px,8cqi,112px) 0}
.hs-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px 48px;margin-bottom:clamp(28px,4cqi,48px)}
.hs-titles{display:flex;flex-direction:column;gap:12px;max-width:40em}
.hs-lead{max-width:28em}
.hs-row{display:flex;gap:clamp(16px,2cqi,28px);overflow-x:auto;scroll-snap-type:x mandatory;--hs-in:max(var(--st-pad),calc((100% - var(--st-max) * 1px) / 2 + var(--st-pad)));padding:4px var(--hs-in) 18px;scroll-padding-inline:var(--hs-in);scrollbar-width:thin}
.st-scroll-gallery.is-hscroll .hs-row{overflow:visible;scroll-snap-type:none}
.hs-card{flex:none;width:clamp(240px,28cqi,380px);scroll-snap-align:start;display:flex;flex-direction:column;gap:6px;color:inherit;text-decoration:none}
.hs-img{width:100%;aspect-ratio:4/5;object-fit:cover;margin-bottom:10px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);transition:transform .5s cubic-bezier(.2,.7,.2,1)}
.hs-card:hover .hs-img{transform:translateY(-6px)}
.hs-card:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:6px;border-radius:calc(var(--st-radius) * 1px)}
.hs-tag{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--st-brand)}
.hs-title{font:700 clamp(19px,.8cqi + 14px,22px)/1.25 var(--st-font-heading)}
.hs-text{color:var(--st-muted);font-size:15px;line-height:1.5}
@container st (max-width:720px){.hs-head{flex-direction:column;align-items:flex-start}}`,
};
