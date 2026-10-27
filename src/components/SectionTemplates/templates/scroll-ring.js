import { IMG } from './meta.js';

export default {
  id: 'scroll-ring',
  name: '3D Scroll Carousel',
  version: '1.0.0',
  category: 'scroll',
  anchor: 'showcase',
  tags: ['scroll', '3d carousel', 'coverflow', 'cylinder carousel', 'rotating cards', 'pinned', 'showcase', 'gsap', 'dark'],
  created: '2026-10-27',
  updated: '2026-10-27',
  seoTitle: '3D Scroll Carousel Section — Free GSAP Coverflow Template',
  seoDescription: 'Free 3D carousel section: cards sit on a ring and rotate in perspective as you scroll, with a glowing centre card. Built with GSAP ScrollTrigger; export HTML.',
  description: 'A scroll-driven 3D carousel, also called a coverflow or cylinder carousel. On larger screens the section pins and a ring of glowing cards rotates in perspective as visitors scroll: the centre card faces forward while the side cards curve away, dim and blur. Arrows, dots, clicking a side card and the keyboard also move the ring. On phones, without JavaScript and with reduced motion it is a swipeable row of the same cards.',
  bestFor: ['Product, app screen and website showcases', 'Portfolio and case study highlights', 'Collections, destinations or services to browse'],
  behaviors: ['ring'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Cards' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Product tour' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Every screen, *one scroll away*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Keep scrolling and the carousel turns. Click any card to bring it to the front.' },
  ],
  lists: [{
    key: 'cards', group: 'items', label: 'Cards', itemLabel: 'Card', titleKey: 'title', min: 3, max: 8,
    fields: [
      { key: 'image', label: 'Image', type: 'image', value: '', hint: 'A landscape or screenshot image works best (about 1200×900 px).', upload: { name: 'ring', maxW: 1200 } },
      { key: 'imageAlt', label: 'Image alt text', type: 'text', value: '' },
      { key: 'tag', label: 'Tag (optional)', type: 'text', value: 'Feature' },
      { key: 'title', label: 'Title', type: 'text', value: 'A new card' },
      { key: 'text', label: 'Text (optional)', type: 'textarea', value: 'A line about this card.' },
      { key: 'url', label: 'Link', type: 'url', value: '#' },
    ],
    value: [
      { image: IMG('hero-dashboard.png'), imageAlt: 'Project dashboard', tag: 'Plan', title: 'A dashboard for the whole team', text: 'Roadmaps, sprints and owners in one clear view.', url: '#' },
      { image: IMG('feature-collab.png'), imageAlt: 'Comments on a task', tag: 'Collaborate', title: 'Feedback where the work lives', text: 'Comment, mention and decide in the thread.', url: '#' },
      { image: IMG('feature-automation.png'), imageAlt: 'Automation rules', tag: 'Automate', title: 'Rules that do the busywork', text: 'Move tasks and post updates automatically.', url: '#' },
      { image: IMG('feature-analytics.png'), imageAlt: 'Progress charts', tag: 'Report', title: 'Progress you can share', text: 'Live charts replace the status spreadsheet.', url: '#' },
      { image: IMG('blog-3.jpg'), imageAlt: 'Mobile app', tag: 'Mobile', title: 'Everything in your pocket', text: 'The full workspace on iOS and Android.', url: '#' },
    ],
  }],
  theme: { brand: '#ff5cd6', brandText: '#2a0b3a', bg: '#14041c', surface: '#2a0b3a', text: '#fbeefe', muted: '#cfaedb', radius: '22' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap rg-head">
  <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
  <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
  <p class="st-lead" data-anim="item" data-edit="lead"></p>
</div>
<div class="rg-row" data-ring data-list="cards" role="region" aria-roledescription="carousel" aria-label="Featured cards">
  <a class="rg-card" data-href="url">
    <img class="rg-img" data-image="image" alt="" width="1200" height="900" loading="lazy">
    <span class="rg-body">
      <span class="rg-tag" data-edit="tag"></span>
      <span class="rg-title" data-edit="title"></span>
      <span class="rg-text" data-edit="text"></span>
    </span>
  </a>
</div>`,
  css: `.st-scroll-ring{padding:clamp(64px,8cqi,112px) 0;overflow:hidden;background:radial-gradient(ellipse 70% 55% at 50% 72%,color-mix(in srgb,var(--st-brand) 20%,var(--st-bg)),var(--st-bg) 72%)}
.rg-head{display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;margin-bottom:clamp(28px,4cqi,52px)}
.rg-head .st-lead{max-width:34em}
.rg-row{display:flex;gap:clamp(16px,2cqi,28px);overflow-x:auto;scroll-snap-type:x mandatory;--rg-in:max(var(--st-pad),calc((100% - var(--st-max) * 1px) / 2 + var(--st-pad)));padding:18px var(--rg-in) 28px;scroll-padding-inline:var(--rg-in);scrollbar-width:thin}
.rg-card{flex:none;width:clamp(240px,72cqi,320px);scroll-snap-align:start;display:flex;flex-direction:column;overflow:hidden;color:inherit;text-decoration:none;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-brand) 35%,transparent);box-shadow:0 0 32px -6px color-mix(in srgb,var(--st-brand) 45%,transparent)}
.rg-img{width:100%;aspect-ratio:4/3;object-fit:cover;background:color-mix(in srgb,var(--st-text) 8%,transparent)}
.rg-body{display:flex;flex-direction:column;gap:6px;padding:16px 18px 20px}
.rg-tag{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--st-brand)}
.rg-title{font:700 clamp(18px,.7cqi + 14px,21px)/1.25 var(--st-font-heading)}
.rg-text{color:var(--st-muted);font-size:15px;line-height:1.5}
.rg-card:focus-visible{outline:3px solid var(--st-brand);outline-offset:4px}
.st-scroll-ring.is-ring .rg-row{position:relative;display:block;overflow:visible;scroll-snap-type:none;padding:0;height:clamp(380px,58vh,540px);perspective:1500px;perspective-origin:50% 40%}
.st-scroll-ring.is-ring .rg-card{position:absolute;left:50%;top:50%;width:clamp(260px,26cqi,340px);will-change:transform,opacity;backface-visibility:hidden;transition:box-shadow .4s}
.st-scroll-ring.is-ring .rg-card.is-active{border-color:var(--st-brand);box-shadow:0 0 0 1px var(--st-brand),0 0 70px -4px color-mix(in srgb,var(--st-brand) 65%,transparent)}
.rg-nav{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:clamp(16px,2.5cqi,28px)}
.rg-arrow{width:44px;height:44px;border-radius:50%;border:1px solid color-mix(in srgb,var(--st-brand) 55%,transparent);background:transparent;color:var(--st-text);font-size:18px;line-height:1;cursor:pointer;transition:background .2s,color .2s}
.rg-arrow:hover{background:var(--st-brand);color:var(--st-brandText)}
.rg-arrow:focus-visible,.rg-dot:focus-visible{outline:3px solid var(--st-brand);outline-offset:3px}
.rg-dots{display:flex;gap:8px}
.rg-dot{width:10px;height:10px;padding:0;border-radius:50%;border:0;background:color-mix(in srgb,var(--st-text) 28%,transparent);cursor:pointer;transition:background .2s,transform .2s}
.rg-dot[aria-current="true"]{background:var(--st-brand);transform:scale(1.35)}`,
};
