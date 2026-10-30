import { IMG, esc } from './meta.js';

/* Scroll Zoom Images (Ken Burns): a hero image and a row of featured images that slowly zoom in or out as the
   visitor scrolls past them, driven by GSAP ScrollTrigger (scrub). Settings: zoom intensity, direction (in or
   out), which images are affected (hero, featured or both), where in the scroll the effect starts and ends, how
   smooth it feels, and an optional slow sideways drift.
   `finalize` (render.js fillHtml) writes the settings onto the root; the `kenburns` behaviour (behaviors.js) builds
   one ScrollTrigger per image. Without GSAP, with reduced motion or in static renders the images simply stay put. */

const pick = (v, allowed, d) => (allowed.includes(String(v)) ? String(v) : d);
const num = (v, d, min, max) => { const n = parseFloat(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : d; };

export default {
  id: 'scroll-zoom',
  name: 'Scroll Zoom Images (Ken Burns)',
  version: '1.0.0',
  category: 'scroll',
  anchor: 'zoom',
  tags: ['scroll', 'ken-burns', 'zoom', 'parallax', 'hero', 'images', 'gsap', 'scrolltrigger', 'dark'],
  created: '2026-10-30',
  updated: '2026-10-30',
  seoTitle: 'Ken Burns Scroll Zoom Hero: Free GSAP Image Template',
  seoDescription: 'Free Ken Burns scroll zoom section: hero and featured images zoom in or out as you scroll, with GSAP ScrollTrigger. Set intensity, direction and scroll range.',
  description: 'A hero and a row of featured images that slowly zoom in or out as the visitor scrolls past them, the classic Ken Burns effect tied to scrolling. Choose how strong the zoom is, whether it zooms in or out, which images it affects (the hero, the featured images or both), where in the scroll it starts and ends, how smooth it feels and whether the image drifts sideways a little. Built with GSAP ScrollTrigger and no extra library.',
  bestFor: ['Photography, travel and hospitality websites', 'Landing pages with a large hero image', 'Portfolios and case studies with featured images'],
  behaviors: ['kenburns'],
  previewMinHeight: 0,
  /* Writes the effect settings onto the root (called by fillHtml) */
  finalize: (html, state) => {
    const f = state.fields || {};
    const toggles = state.toggles || {};
    const attrs = [
      ['data-zoom', num(f.zoom, 30, 5, 100)],
      ['data-dir', pick(f.direction, ['in', 'out'], 'in')],
      ['data-affect', pick(f.affect, ['both', 'hero', 'featured'], 'both')],
      ['data-start', num(f.rangeStart, 100, 0, 150)],
      ['data-end', num(f.rangeEnd, 0, -50, 100)],
      ['data-smooth', num(f.smooth, 0.6, 0, 3)],
      ['data-drift', toggles.drift === false ? 'off' : 'on'],
    ].map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
    return html.replace('<div class="kb" data-kb>', () => `<div class="kb" data-kb${attrs}>`);
  },

  groups: [
    { id: 'effect', label: 'Zoom effect' },
    { id: 'hero', label: 'Hero text & image' },
    { id: 'featured', label: 'Featured images', toggle: 'showFeatured' },
    { id: 'items', label: 'Featured image list' },
  ],
  fields: [
    { key: 'zoom', group: 'effect', label: 'Zoom intensity (%)', type: 'text', value: '30', hint: 'How much bigger the image gets: 30 means up to 130% of its size. Between 5 and 100. Subtle effects look best around 15 to 35.' },
    { key: 'direction', group: 'effect', label: 'Direction', type: 'choice', options: [['in', 'Zoom in while scrolling down'], ['out', 'Zoom out while scrolling down']], value: 'in' },
    { key: 'affect', group: 'effect', label: 'Images affected', type: 'choice', options: [['both', 'Hero and featured images'], ['hero', 'Hero image only'], ['featured', 'Featured images only']], value: 'both', hint: 'Choose which kind of image gets the effect.' },
    { key: 'rangeStart', group: 'effect', label: 'Starts when the image top reaches (% of screen height)', type: 'text', value: '100', hint: '100 starts as soon as the image enters from the bottom of the screen, 50 waits until it reaches the middle. Hero images that are already on screen start at the top of the page.' },
    { key: 'rangeEnd', group: 'effect', label: 'Ends when the image bottom reaches (% of screen height)', type: 'text', value: '0', hint: '0 ends when the image leaves at the top of the screen, 50 ends at the middle. A shorter range makes a faster zoom.' },
    { key: 'smooth', group: 'effect', label: 'Smoothness (seconds)', type: 'text', value: '0.6', hint: 'How long the zoom takes to catch up with the scroll. 0 follows the scroll exactly; around 0.6 feels fluid.' },

    { key: 'eyebrow', group: 'hero', label: 'Eyebrow (optional)', type: 'text', value: 'Lake Como · Italy' },
    { key: 'heading', group: 'hero', label: 'Heading', type: 'textarea', value: 'Slow down and *look closer*' },
    { key: 'lead', group: 'hero', label: 'Intro text (optional)', type: 'textarea', value: 'Scroll and watch the landscape drift towards you. Every image on this page moves a little as you pass it.' },
    { key: 'cta', group: 'hero', label: 'Button text (optional)', type: 'text', value: 'Plan your trip' },
    { key: 'ctaUrl', group: 'hero', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/trips' },
    { key: 'heroImage', group: 'hero', label: 'Hero image', type: 'image', value: IMG('tpl-nature.jpg'), hint: 'A wide image, at least 1920×1080 px. It is cropped to fill the hero.', upload: { name: 'zoom-hero', maxW: 2200 } },
    { key: 'heroAlt', group: 'hero', label: 'Hero image alt text', type: 'text', value: 'Mountains above a calm lake at sunrise' },

    { key: 'featuredHeading', group: 'featured', label: 'Featured heading', type: 'text', value: 'Three places worth the journey' },
    { key: 'featuredLead', group: 'featured', label: 'Featured intro (optional)', type: 'text', value: 'Each photo zooms gently as it passes through the screen.' },
  ],
  lists: [{
    key: 'images', group: 'items', label: 'Featured images', itemLabel: 'Image', titleKey: 'title', min: 1, max: 6,
    fields: [
      { key: 'image', label: 'Image', type: 'image', value: '', hint: 'About 1200×900 px.', upload: { name: 'zoom-image', maxW: 1400 } },
      { key: 'imageAlt', label: 'Alt text', type: 'text', value: '' },
      { key: 'title', label: 'Title', type: 'text', value: 'Place name' },
      { key: 'caption', label: 'Caption (optional)', type: 'text', value: '' },
    ],
    value: [
      { image: IMG('tpl-hotel.jpg'), imageAlt: 'A quiet hotel terrace above the water', title: 'The terrace', caption: 'Breakfast above the lake' },
      { image: IMG('hero-landscape.jpg'), imageAlt: 'Green hills at sunrise', title: 'The hills', caption: 'A two-hour walk at dawn' },
      { image: IMG('tpl-restaurant.jpg'), imageAlt: 'A restaurant table set for dinner', title: 'The table', caption: 'Dinner with the local menu' },
    ],
  }],
  toggles: [
    { key: 'showFeatured', label: 'Featured images', value: true },
    { key: 'drift', label: 'Slow sideways drift', value: true },
  ],
  theme: { brand: '#f59e0b', brandText: '#1a1205', bg: '#0b0f14', surface: '#141a22', text: '#f4f5f7', muted: '#a8b0bc', radius: '18' },
  fonts: { heading: 'space', body: 'inter' },

  html: `<div class="kb" data-kb>
  <header class="kb-hero">
    <div class="kb-frame kb-frame--hero">
      <img class="kb-img" data-kb-img="hero" data-image="heroImage" alt="" width="1920" height="1080" loading="eager">
    </div>
    <div class="kb-shade" aria-hidden="true"></div>
    <div class="st-wrap kb-hero-text">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="kb-h1" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead kb-lead" data-anim="item" data-edit="lead"></p>
      <div class="st-btns kb-btns" data-anim="item">
        <a class="st-btn" data-href="ctaUrl" data-show-if="cta"><span data-edit="cta"></span></a>
      </div>
    </div>
  </header>
  <section class="st-wrap kb-featured" data-show="showFeatured">
    <header class="st-head">
      <h2 class="st-h2" data-anim="item" data-edit="featuredHeading"></h2>
      <p class="st-lead" data-anim="item" data-edit="featuredLead"></p>
    </header>
    <ul class="kb-grid" data-list="images">
      <li class="kb-card" data-anim="item">
        <div class="kb-frame kb-frame--card">
          <img class="kb-img" data-kb-img="featured" data-image="image" alt="" width="1200" height="900" loading="lazy">
        </div>
        <h3 class="kb-title" data-edit="title"></h3>
        <p class="kb-cap" data-edit="caption"></p>
      </li>
    </ul>
  </section>
</div>`,
  css: `.st-scroll-zoom{padding:0}
.kb-hero{position:relative;display:flex;align-items:flex-end;min-height:clamp(520px,64cqi,760px);overflow:hidden}
.kb-frame{position:relative;overflow:hidden;background:var(--st-surface)}
.kb-frame--hero{position:absolute;inset:0}
.kb-img{display:block;width:100%;height:100%;object-fit:cover;transform-origin:50% 50%;will-change:transform}
.kb-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,9,13,.15) 0%,rgba(6,9,13,.35) 45%,rgba(6,9,13,.82) 100%)}
.kb-hero-text{position:relative;z-index:1;padding-top:clamp(120px,16cqi,200px);padding-bottom:clamp(40px,6cqi,80px)}
.kb-h1{max-width:13em;font-size:clamp(38px,5.4cqi + 8px,78px);color:#fff}
.kb-lead{max-width:34em;margin-top:16px;color:rgba(255,255,255,.82)}
.kb-btns{margin-top:26px}
.kb-featured{padding-top:clamp(56px,7cqi,104px);padding-bottom:clamp(64px,8cqi,112px)}
.kb-grid{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.4cqi,32px);margin:0;padding:0}
.kb-frame--card{aspect-ratio:4/5;border-radius:calc(var(--st-radius) * 1px);margin-bottom:16px}
.kb-title{font-size:20px;letter-spacing:-.01em}
.kb-cap{margin-top:4px;color:var(--st-muted);font-size:15px}
.kb-cap:empty{display:none}
.kb:not([data-kb-ready]) .kb-img{transform:none}
@container st (max-width:820px){.kb-grid{grid-template-columns:1fr 1fr}}
@container st (max-width:520px){.kb-grid{grid-template-columns:1fr}.kb-frame--card{aspect-ratio:4/3}}`,
};
