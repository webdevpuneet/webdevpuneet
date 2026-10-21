import { IMG } from './meta.js';

export default {
  id: 'features-split-image',
  name: 'Split Features With Image',
  version: '1.0.0',
  category: 'features',
  tags: ['features', 'split', 'screenshot', 'checklist', 'saas', 'product', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Feature Section With Image — Free Split Layout Template',
  seoDescription: 'Free split feature section: a heading, a list of icon features and a button beside a framed product screenshot. Responsive and animated; export HTML or React.',
  description: 'A two-column feature section: an eyebrow, heading and intro above a short list of icon-led features and a button on one side, a framed product screenshot on the other. Ideal for explaining one product area in depth, and it stacks on narrow screens.',
  bestFor: ['Explaining one product area in depth', 'Feature pages under a main landing page', 'Product tours with a screenshot per topic'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Feature list' },
    { id: 'button', label: 'Button', toggle: 'showButton' },
    { id: 'media', label: 'Image' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Reporting' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'See every project *at a glance*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Dashboards that build themselves from the work your team is already doing, so status meetings get shorter.' },
    { key: 'cta', group: 'button', label: 'Button text', type: 'text', value: 'Explore reporting' },
    { key: 'ctaUrl', group: 'button', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/reporting' },
    { key: 'image', group: 'media', label: 'Image', type: 'image', value: IMG('feature-analytics.png'), hint: 'A screenshot or illustration, about 1200×900 px.', upload: { name: 'feature', maxW: 1600, mime: 'image/png' } },
    { key: 'imageAlt', group: 'media', label: 'Image alt text', type: 'text', value: 'Analytics dashboard with a rising line chart and four KPI tiles' },
  ],
  lists: [{
    key: 'points', group: 'items', label: 'Features', itemLabel: 'Feature', titleKey: 'title', min: 1, max: 6,
    fields: [
      { key: 'icon', label: 'Icon', type: 'icon', value: 'circle-check' },
      { key: 'title', label: 'Title', type: 'text', value: 'New feature' },
      { key: 'text', label: 'Text', type: 'textarea', value: 'One sentence about what it does.' },
    ],
    value: [
      { icon: 'trending-up', title: 'Live progress', text: 'Charts update as tasks move, with no spreadsheets to keep in sync.' },
      { icon: 'target', title: 'Goals that track themselves', text: 'Link goals to projects and watch them fill in automatically.' },
      { icon: 'file-text', title: 'One-click updates', text: 'Share a polished weekly report with stakeholders in seconds.' },
    ],
  }],
  toggles: [{ key: 'showButton', label: 'Button', value: true }],
  theme: { brand: '#0ea5e9', brandText: '#ffffff', bg: '#ffffff', surface: '#f0f7fb', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap fs">
  <div class="fs-copy">
    <header class="st-head st-head--left fs-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead" data-anim="item" data-edit="lead"></p>
    </header>
    <ul class="fs-list" data-list="points">
      <li class="fs-point" data-anim="item">
        <span class="st-icon" data-icon="icon"></span>
        <div><h3 class="fs-title" data-edit="title"></h3><p class="fs-text" data-edit="text"></p></div>
      </li>
    </ul>
    <div class="st-btns" data-anim="item" data-show="showButton"><a class="st-btn" data-href="ctaUrl"><span data-edit="cta"></span></a></div>
  </div>
  <div class="fs-media" data-anim="media">
    <div class="fs-frame"><img data-image="image" alt="" width="1200" height="900" loading="lazy"></div>
  </div>
</div>`,
  css: `.st-features-split-image{padding:clamp(64px,8cqi,112px) 0}
.fs{display:grid;grid-template-columns:1fr 1.15fr;align-items:center;gap:clamp(36px,5cqi,80px)}
.fs-copy{display:flex;flex-direction:column;align-items:flex-start;gap:28px}
.fs-head{margin-bottom:0}
.fs-list{list-style:none;display:flex;flex-direction:column;gap:20px}
.fs-point{display:flex;gap:16px;align-items:flex-start}
.fs-point .st-icon{width:42px;height:42px}
.fs-point .st-icon svg{width:21px;height:21px}
.fs-title{font-size:18px;letter-spacing:-.01em;margin-bottom:2px}
.fs-text{color:var(--st-muted);font-size:16px}
.fs-media{position:relative}
.fs-media::before{content:"";position:absolute;inset:10% 6% -6% -6%;border-radius:calc(var(--st-radius) * 2px);background:color-mix(in srgb,var(--st-brand) 14%,var(--st-surface))}
.fs-frame{position:relative;padding:10px;border-radius:calc(var(--st-radius) * 1.5px);background:var(--st-bg);border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);box-shadow:0 30px 70px -34px color-mix(in srgb,var(--st-text) 40%,transparent)}
.fs-frame img{width:100%;border-radius:calc(var(--st-radius) * 1px)}
@container st (max-width:860px){.fs{grid-template-columns:1fr}.fs-media{order:-1}.fs-media::before{inset:8% -3% -4% 3%}}`,
};
