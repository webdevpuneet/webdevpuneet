import { IMG, esc } from './meta.js';

const pick = (v, allowed, d) => (allowed.includes(String(v)) ? String(v) : d);

export default {
  id: 'scroll-ring',
  name: '3D Scroll Carousel',
  version: '1.2.0',
  category: 'scroll',
  anchor: 'showcase',
  tags: ['scroll', '3d carousel', 'coverflow', 'cylinder carousel', 'rotating cards', 'pinned', 'showcase', 'gsap', 'dark'],
  created: '2026-10-27',
  updated: '2026-10-27',
  seoTitle: '3D Scroll Carousel Section — Free GSAP Coverflow Template',
  seoDescription: 'Free 3D carousel section with four styles (ring, coverflow, stack, arc), mouse tilt, reflections and a glowing centre card. GSAP ScrollTrigger; export HTML.',
  description: 'A scroll-driven 3D carousel, also called a coverflow or cylinder carousel, in four styles: Cylinder ring, Coverflow, Tilted stack and Arc. On larger screens the section pins and the glowing cards move in perspective as visitors scroll; on phones and tablets visitors drag or swipe it: the centre card faces forward while the others curve away, dim and blur. On mouse devices the front card tilts toward the pointer and its image shifts for depth, and cards can have a soft reflection and a glowing floor. Arrows, dots, clicking a side card and the keyboard also move the carousel. Details can show on the cards or in a caption with a button below the carousel, with a progress bar. Without JavaScript and with reduced motion it is a swipeable row of the same cards.',
  bestFor: ['Product, app screen and website showcases', 'Portfolio and case study highlights', 'Collections, destinations or services to browse'],
  behaviors: ['ring'],
  finalize: (html, state) => {
    const f = state.fields || {};
    const attrs = [
      ['data-style', pick(f.style, ['ring', 'coverflow', 'stack', 'arc'], 'ring')],
      ['data-tilt', pick(f.tilt, ['on', 'off'], 'on')],
      ['data-reflect', pick(f.reflect, ['on', 'off'], 'on')],
      ['data-details', pick(f.details, ['cards', 'below'], 'cards')],
      ['data-cta', String(f.ctaLabel || 'View details')],
    ].map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
    return html.replace('<div class="rg-row"', () => `<div class="rg-row"${attrs}`);
  },

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'look', label: 'Style & effects' },
    { id: 'items', label: 'Cards' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Product tour' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Every screen, *one scroll away*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Keep scrolling and the carousel turns. Click any card to bring it to the front.' },

    { key: 'style', group: 'look', label: 'Style', type: 'choice', options: [['ring', 'Cylinder ring (cards on a circle)'], ['coverflow', 'Coverflow (flat row, angled sides)'], ['stack', 'Tilted stack (cards behind each other)'], ['arc', 'Arc (a shallow curve)']], value: 'ring' },
    { key: 'tilt', group: 'look', label: 'Mouse tilt and depth', type: 'choice', options: [['on', 'On: the front card tilts toward the mouse'], ['off', 'Off']], value: 'on', hint: 'Only on devices with a mouse. Touch screens and reduced motion skip it.' },
    { key: 'details', group: 'look', label: 'Card details', type: 'choice', options: [['cards', 'On the cards'], ['below', 'Below the carousel (image-only cards, with a caption and button)']], value: 'cards', hint: 'Below: the front card’s tag, title, text and a button show under the carousel and change with it.' },
    { key: 'ctaLabel', group: 'look', label: 'Caption button text', type: 'text', value: 'View details', hint: 'Used when the details are shown below the carousel.' },
    { key: 'reflect', group: 'look', label: 'Reflection and glowing floor', type: 'choice', options: [['on', 'On'], ['off', 'Off']], value: 'on', hint: 'The reflection shows in Chrome, Edge and Safari; Firefox shows the glowing floor only.' },
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
.rg-row{display:flex;gap:clamp(16px,2cqi,28px);overflow-x:auto;scroll-snap-type:x mandatory;--rg-in:max(var(--st-pad),calc((100% - var(--st-max) * 1px) / 2 + var(--st-pad)));padding:18px var(--rg-in) 28px;scroll-padding-inline:var(--rg-in);scrollbar-width:none}
.rg-row::-webkit-scrollbar{display:none}
.rg-card{flex:none;width:clamp(240px,72cqi,320px);scroll-snap-align:start;display:flex;flex-direction:column;overflow:hidden;color:inherit;text-decoration:none;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-brand) 35%,transparent);box-shadow:0 0 32px -6px color-mix(in srgb,var(--st-brand) 45%,transparent)}
.rg-img{width:100%;aspect-ratio:4/3;object-fit:cover;background:color-mix(in srgb,var(--st-text) 8%,transparent);-webkit-user-drag:none;user-select:none}
.rg-body{display:flex;flex-direction:column;gap:6px;padding:16px 18px 20px}
.rg-tag{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--st-brand)}
.rg-title{font:700 clamp(18px,.7cqi + 14px,21px)/1.25 var(--st-font-heading)}
.rg-text{color:var(--st-muted);font-size:15px;line-height:1.5}
.rg-card:focus-visible{outline:3px solid var(--st-brand);outline-offset:4px}
.st-scroll-ring.is-ring .rg-img{aspect-ratio:3/2}
.st-scroll-ring.is-ring .rg-row{position:relative;display:block;overflow:visible;scroll-snap-type:none;padding:0;height:clamp(330px,64cqi,420px);perspective:1500px;perspective-origin:50% 40%;touch-action:pan-y;cursor:grab}
.st-scroll-ring.is-ring .rg-row.is-drag{cursor:grabbing}
.st-scroll-ring.is-ring .rg-card{position:absolute;left:50%;top:50%;width:clamp(210px,62cqi,320px);will-change:transform,opacity;backface-visibility:hidden;transition:box-shadow .4s}
.st-scroll-ring.is-ring .rg-card.is-active{border-color:var(--st-brand);box-shadow:0 0 0 1px var(--st-brand),0 0 70px -4px color-mix(in srgb,var(--st-brand) 65%,transparent)}
.st-scroll-ring.is-pin{padding-block:clamp(24px,4vh,56px);min-height:calc(100vh - var(--rg-head,0px));box-sizing:border-box;display:flex;flex-direction:column;justify-content:center}
.st-scroll-ring.is-pin .rg-head{margin-bottom:clamp(8px,2vh,28px);gap:8px}
.st-scroll-ring.is-pin .rg-row{height:clamp(300px,calc(100vh - var(--rg-head,0px) - 420px),540px)}
.st-scroll-ring.is-pin .rg-card{width:clamp(220px,calc((100vh - var(--rg-head,0px) - 420px) * .85),340px)}
.st-scroll-ring.is-ring .rg-row::after{content:"";position:absolute;left:50%;bottom:-4px;width:min(820px,84%);height:90px;transform:translateX(-50%);background:radial-gradient(ellipse at 50% 50%,color-mix(in srgb,var(--st-brand) 50%,transparent),transparent 70%);filter:blur(16px);pointer-events:none;z-index:0}
.st-scroll-ring.rg-reflect .rg-card{-webkit-box-reflect:below 4px linear-gradient(transparent 80%,rgba(255,255,255,.16))}
.st-scroll-ring.rg-reflect .rg-nav{margin-top:clamp(36px,6vh,56px)}
.st-scroll-ring.rg-below .rg-body{display:none}
.st-scroll-ring.rg-below .rg-img{aspect-ratio:16/10}
.st-scroll-ring.rg-below .rg-row{height:clamp(240px,48cqi,340px)}
.st-scroll-ring.rg-below.is-pin .rg-row{height:clamp(220px,calc(100vh - var(--rg-head,0px) - 600px),420px)}
.st-scroll-ring.rg-below.is-pin .rg-card{width:clamp(200px,calc((100vh - var(--rg-head,0px) - 600px) * 1.5),400px)}
.rg-cap{position:relative;z-index:200;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;max-width:34em;margin:clamp(24px,5vh,44px) auto 0;padding:0 24px}
.st-scroll-ring.rg-below .rg-cap{margin-top:clamp(4px,1.5vh,14px)}
.st-scroll-ring.rg-below.rg-reflect .rg-cap{margin-top:clamp(10px,2.5vh,24px)}
.rg-cap-tag{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--st-brand)}
.rg-cap-title{font:700 clamp(22px,1.2cqi + 15px,30px)/1.2 var(--st-font-heading)}
.rg-cap-text{color:var(--st-muted);font-size:16px;line-height:1.5}
.rg-cap-btn{margin-top:8px;display:inline-flex;align-items:center;padding:10px 22px;border-radius:999px;background:var(--st-brand);color:var(--st-brandText);font-weight:700;font-size:15px;text-decoration:none}
.rg-cap-btn:focus-visible{outline:3px solid var(--st-text);outline-offset:3px}
.rg-nav{position:relative;z-index:200;display:flex;align-items:center;justify-content:center;gap:14px;margin-top:clamp(16px,2.5cqi,28px)}
.rg-arrow{width:44px;height:44px;border-radius:50%;border:1px solid color-mix(in srgb,var(--st-brand) 55%,transparent);background:transparent;color:var(--st-text);font-size:18px;line-height:1;cursor:pointer;transition:background .2s,color .2s}
.rg-arrow:hover{background:var(--st-brand);color:var(--st-brandText)}
.rg-arrow:focus-visible,.rg-dot:focus-visible{outline:3px solid var(--st-brand);outline-offset:3px}
.rg-dots{display:flex;gap:8px}
.rg-dot{width:10px;height:10px;padding:0;border-radius:50%;border:0;background:color-mix(in srgb,var(--st-text) 28%,transparent);cursor:pointer;transition:background .2s,transform .2s}
.rg-dot[aria-current="true"]{background:var(--st-brand);transform:scale(1.35)}
.rg-progress{position:relative;z-index:200;width:min(180px,40%);height:3px;margin:14px auto 0;border-radius:3px;overflow:hidden;background:color-mix(in srgb,var(--st-text) 16%,transparent)}
.rg-progress i{display:block;height:100%;transform-origin:0 50%;background:var(--st-brand)}`,
};
