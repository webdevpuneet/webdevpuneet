import { IMG, esc } from './meta.js';

/* Scroll Zoom Image Stack (Ken Burns): several images stacked one on top of the other in a pinned stage. As the visitor
   scrolls, the image on top zooms (in or out, with a slow sideways drift) and fades away to uncover the next one, which
   zooms in turn, until the last image is reached. GSAP ScrollTrigger pins the stage and scrubs one timeline, so the
   effect follows the scroll exactly and plays backwards when scrolling up.
   Settings: zoom intensity, direction (in or out), which images zoom (all layers while they are on top, or only as they leave),
   how much scrolling each image gets (the scroll range), smoothness, drift, counter. Each image has its own title and caption.
   Without GSAP, with reduced motion, or in a plain static render, the images are an ordinary column and nothing is hidden.
   `finalize` (render.js fillHtml) writes the settings onto the root; the `kenburns` behaviour (behaviors.js) builds the timeline. */

const pick = (v, allowed, d) => (allowed.includes(String(v)) ? String(v) : d);
const num = (v, d, min, max) => { const n = parseFloat(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : d; };

export default {
  id: 'scroll-zoom',
  name: 'Scroll Zoom Image Stack (Ken Burns)',
  version: '2.0.0',
  category: 'scroll',
  anchor: 'zoom',
  tags: ['scroll', 'ken-burns', 'zoom', 'image-stack', 'pinned', 'layers', 'gsap', 'scrolltrigger', 'dark'],
  created: '2026-10-30',
  updated: '2026-10-30',
  seoTitle: 'Scroll Zoom Image Stack: Ken Burns Layers With GSAP',
  seoDescription: 'Free scroll zoom section: images stacked on top of each other, the top one zooms and fades on scroll to reveal the next. GSAP ScrollTrigger. Export the code.',
  description: 'A pinned stack of images, one layered over the other. As the visitor scrolls, the image on top zooms in (or out) with a slow Ken Burns drift and fades away to uncover the next image, and so on down the stack. Choose the zoom intensity, the direction, whether every layer zooms or only the one leaving, how much scrolling each image gets, how smooth it feels, and give every image its own title and caption. Built with GSAP ScrollTrigger and no extra library; without it the images become a simple column.',
  bestFor: ['Photography, travel and hospitality websites', 'Product launches and case studies told in a few images', 'Portfolios and landing pages that want a cinematic scroll'],
  behaviors: ['kenburns'],
  previewMinHeight: 0,
  /* Writes the effect settings onto the root (called by fillHtml) */
  finalize: (html, state) => {
    const f = state.fields || {};
    const toggles = state.toggles || {};
    const attrs = [
      ['data-zoom', num(f.zoom, 30, 5, 100)],
      ['data-dir', pick(f.direction, ['in', 'out'], 'in')],
      ['data-affect', pick(f.affect, ['all', 'exit'], 'all')],
      ['data-per', num(f.perImage, 100, 30, 400)],
      ['data-smooth', num(f.smooth, 0.6, 0, 3)],
      ['data-drift', toggles.drift === false ? 'off' : 'on'],
    ].map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
    return html.replace('<div class="zs" data-zs>', () => `<div class="zs" data-zs${attrs}>`);
  },

  groups: [
    { id: 'header', label: 'Heading', toggle: 'showHeading' },
    { id: 'effect', label: 'Zoom effect' },
    { id: 'items', label: 'Image stack' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Lake Como · Italy' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Slow down and *look closer*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Keep scrolling. Each photograph drifts towards you and fades to reveal the next, one place at a time.' },

    { key: 'zoom', group: 'effect', label: 'Zoom intensity (%)', type: 'text', value: '30', hint: 'How much bigger an image gets: 30 means up to 130% of its size. Between 5 and 100. Subtle effects look best around 15 to 35.' },
    { key: 'direction', group: 'effect', label: 'Direction', type: 'choice', options: [['in', 'Zoom in (the top image grows towards you)'], ['out', 'Zoom out (images start close and settle back)']], value: 'in' },
    { key: 'affect', group: 'effect', label: 'Images affected', type: 'choice', options: [['all', 'Every image zooms while it is on top'], ['exit', 'Each image holds still and zooms only as it leaves']], value: 'all', hint: 'With "only as it leaves", the picture stays calm and then zooms and fades to reveal the next one.' },
    { key: 'perImage', group: 'effect', label: 'Scroll range per image (% of screen height)', type: 'text', value: '100', hint: 'How far the visitor scrolls for each image: 100 is one screen height per image, 60 is faster, 200 is slower. Between 30 and 400.' },
    { key: 'smooth', group: 'effect', label: 'Smoothness (seconds)', type: 'text', value: '0.6', hint: 'How long the zoom takes to catch up with the scroll. 0 follows the scroll exactly; around 0.6 feels fluid.' },
  ],
  lists: [{
    key: 'images', group: 'items', label: 'Images (the first one is on top)', itemLabel: 'Image', titleKey: 'title', min: 2, max: 8,
    fields: [
      { key: 'image', label: 'Image', type: 'image', value: '', hint: 'A wide image, at least 1600×900 px. It is cropped to fill the stage.', upload: { name: 'zoom-image', maxW: 2000 } },
      { key: 'imageAlt', label: 'Alt text', type: 'text', value: '' },
      { key: 'title', label: 'Title', type: 'text', value: 'Image title' },
      { key: 'caption', label: 'Caption (optional)', type: 'text', value: '' },
    ],
    value: [
      { image: IMG('tpl-nature.jpg'), imageAlt: 'Mountains above a calm lake at sunrise', title: 'First light', caption: 'The lake at six in the morning' },
      { image: IMG('tpl-hotel.jpg'), imageAlt: 'A quiet hotel terrace above the water', title: 'The terrace', caption: 'Breakfast above the water' },
      { image: IMG('hero-landscape.jpg'), imageAlt: 'Green hills at sunrise', title: 'The hills', caption: 'A two-hour walk at dawn' },
      { image: IMG('tpl-restaurant.jpg'), imageAlt: 'A restaurant table set for dinner', title: 'The table', caption: 'Dinner with the local menu' },
    ],
  }],
  toggles: [
    { key: 'showHeading', label: 'Heading', value: true },
    { key: 'drift', label: 'Slow sideways drift', value: true },
    { key: 'showCounter', label: 'Counter and progress bar', value: true },
  ],
  theme: { brand: '#f59e0b', brandText: '#1a1205', bg: '#0b0f14', surface: '#141a22', text: '#f4f5f7', muted: '#a8b0bc', radius: '18' },
  fonts: { heading: 'space', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head" data-show="showHeading">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="zs" data-zs>
    <ul class="zs-list" data-list="images">
      <li class="zs-layer">
        <img class="zs-img" data-image="image" alt="" width="1600" height="900" loading="lazy">
        <div class="zs-cap">
          <h3 class="zs-title" data-edit="title"></h3>
          <p class="zs-text" data-edit="caption"></p>
        </div>
      </li>
    </ul>
    <div class="zs-ui" data-show="showCounter" aria-hidden="true"><span class="zs-count">01</span><span class="zs-bar"><i></i></span></div>
  </div>
</div>`,
  css: `.st-scroll-zoom{padding:clamp(56px,7cqi,104px) 0}
.zs{position:relative}
.zs-list{list-style:none;display:grid;gap:clamp(16px,2.4cqi,28px);margin:0;padding:0}
.zs-layer{position:relative;overflow:hidden;aspect-ratio:16/9;border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-surface)}
.zs-img{display:block;width:100%;height:100%;object-fit:cover;transform-origin:50% 50%;will-change:transform}
.zs-cap{position:absolute;left:0;right:0;bottom:0;padding:clamp(40px,8cqi,96px) clamp(18px,3cqi,40px) clamp(18px,3cqi,36px);background:linear-gradient(to top,rgba(6,9,13,.78),rgba(6,9,13,0));color:#fff;pointer-events:none}
.zs-title{font-size:clamp(22px,2.6cqi + 8px,40px);color:#fff;letter-spacing:-.02em}
.zs-text{margin-top:6px;color:rgba(255,255,255,.82);font-size:clamp(14px,1cqi + 10px,18px)}
.zs-text:empty{display:none}
.zs-ui{display:none}
.zs.is-zs .zs-list{display:block;position:relative;height:clamp(420px,calc(100vh - 170px),760px);gap:0}
.zs.is-zs .zs-layer{position:absolute;inset:0;aspect-ratio:auto}
.zs.is-zs .zs-ui{position:absolute;right:clamp(16px,3cqi,32px);bottom:clamp(16px,3cqi,32px);z-index:60;display:flex;align-items:center;gap:12px;color:#fff;font:700 13px/1 var(--st-font-heading);letter-spacing:.08em}
.zs-bar{display:block;width:clamp(60px,10cqi,120px);height:3px;border-radius:2px;background:rgba(255,255,255,.3);overflow:hidden}
.zs-bar i{display:block;width:100%;height:100%;background:#fff;transform:scaleX(0);transform-origin:0 50%}
@container st (max-width:560px){.zs.is-zs .zs-list{height:clamp(380px,calc(100vh - 150px),620px)}.zs-layer{aspect-ratio:4/3}}`,
};
