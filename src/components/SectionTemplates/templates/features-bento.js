import { IMG } from './meta.js';

export default {
  id: 'features-bento',
  name: 'Bento Grid Features',
  version: '1.0.0',
  category: 'features',
  tags: ['features', 'bento', 'grid', 'dark', 'cards', 'saas', 'ai'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Bento Grid Section Template — Free HTML & CSS Features',
  seoDescription: 'Free bento grid features section: a dark mosaic of mixed-size cards with icons, text and an optional image each. Responsive, GSAP animated; export HTML, React.',
  description: 'A modern bento box grid on a dark background: cards of different sizes arranged in a tidy mosaic, each with an icon, title and text, and any card can carry a screenshot. Popular with AI and developer products; the grid reflows to two columns and then one.',
  bestFor: ['AI, developer and SaaS product pages', 'Showing many features without a long list', 'Apple-style product highlight sections'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Bento cards' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Why teams switch' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Built for the way *modern teams* work' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: '' },
  ],
  lists: [{
    key: 'cards', group: 'items', label: 'Bento cards', itemLabel: 'Card', titleKey: 'title', min: 1, max: 10,
    fields: [
      { key: 'icon', label: 'Icon', type: 'icon', value: 'sparkles' },
      { key: 'title', label: 'Title', type: 'text', value: 'New card' },
      { key: 'text', label: 'Text', type: 'textarea', value: 'A short line about this feature.' },
      { key: 'image', label: 'Image (optional)', type: 'image', value: '', hint: 'Leave empty for a text-only card. Wide cards suit screenshots best.', upload: { name: 'bento', maxW: 1400, mime: 'image/png' } },
      { key: 'imageAlt', label: 'Image alt text', type: 'text', value: '' },
    ],
    value: [
      { icon: 'workflow', title: 'Visual automations', text: 'Drag triggers and actions onto a canvas. No code, no scripts, no waiting on engineering.', image: IMG('feature-automation.png'), imageAlt: 'Workflow builder with connected trigger and action nodes' },
      { icon: 'bot', title: 'AI assistant', text: 'Summarise threads, draft updates and triage new requests automatically.' },
      { icon: 'gauge', title: 'Instant search', text: 'Find any task, doc or comment in milliseconds.' },
      { icon: 'lock', title: 'Enterprise security', text: 'SSO, SCIM and granular roles on every workspace.' },
      { icon: 'globe', title: 'Works everywhere', text: 'Web, desktop and mobile apps that stay in sync offline.' },
    ],
  }],
  toggles: [],
  theme: { brand: '#a78bfa', brandText: '#0b0b14', bg: '#0b0b14', surface: '#15151f', text: '#f4f4f8', muted: '#a1a1b5', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="fb-grid" data-list="cards">
    <article class="fb-card" data-anim="item">
      <div class="fb-copy">
        <span class="st-icon" data-icon="icon"></span>
        <h3 class="fb-title" data-edit="title"></h3>
        <p class="fb-text" data-edit="text"></p>
      </div>
      <div class="fb-media" data-show-if="image"><img data-image="image" data-optional alt="" loading="lazy"></div>
    </article>
  </div>
</div>`,
  css: `.st-features-bento{padding:clamp(64px,8cqi,112px) 0}
.st-features-bento::before{content:"";position:absolute;inset:-20% 10% auto;height:60%;background:radial-gradient(closest-side,color-mix(in srgb,var(--st-brand) 22%,transparent),transparent);pointer-events:none}
.fb-grid{position:relative;display:grid;grid-template-columns:repeat(6,1fr);gap:clamp(12px,1.6cqi,18px)}
.fb-card{grid-column:span 2;display:flex;flex-direction:column;gap:20px;overflow:hidden;padding:clamp(22px,2.4cqi,30px);border-radius:calc(var(--st-radius) * 1px);background:linear-gradient(160deg,color-mix(in srgb,var(--st-surface) 100%,var(--st-brand) 0%),color-mix(in srgb,var(--st-surface) 82%,var(--st-brand)));border:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.fb-card:nth-child(5n+1){grid-column:span 4}
.fb-card:nth-child(5n+4),.fb-card:nth-child(5n+5){grid-column:span 3}
.fb-card:nth-child(5n+1):has(.fb-media){grid-row:span 2}
.fb-copy{display:flex;flex-direction:column;align-items:flex-start;gap:10px}
.fb-card .st-icon{background:color-mix(in srgb,var(--st-brand) 18%,transparent);margin-bottom:4px}
.fb-title{font-size:19px;letter-spacing:-.01em}
.fb-text{color:var(--st-muted);font-size:15.5px;max-width:34em}
.fb-media{margin-top:auto;margin-right:calc(clamp(22px,2.4cqi,30px) * -1);margin-bottom:calc(clamp(22px,2.4cqi,30px) * -1)}
.fb-media img{width:100%;border-top-left-radius:calc(var(--st-radius) * .8px);border:1px solid color-mix(in srgb,var(--st-text) 12%,transparent);border-right:0;border-bottom:0}
@container st (max-width:900px){.fb-grid{grid-template-columns:repeat(2,1fr)}.fb-card,.fb-card:nth-child(n){grid-column:span 1;grid-row:auto}.fb-card:nth-child(5n+1){grid-column:1/-1}}
@container st (max-width:560px){.fb-grid{grid-template-columns:1fr}.fb-card:nth-child(n){grid-column:auto}}`,
};
