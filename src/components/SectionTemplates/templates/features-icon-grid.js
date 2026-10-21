export default {
  id: 'features-icon-grid',
  name: 'Icon Grid Features',
  version: '1.0.0',
  category: 'features',
  tags: ['features', 'icons', 'grid', 'cards', 'saas', 'landing-page', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Features Section Template — Free Icon Grid in HTML & CSS',
  seoDescription: 'Free features section template: a centred heading and a responsive grid of icon cards with titles, text and links. Pick from 60 icons; export HTML, React, Vue.',
  description: 'The classic features section: an eyebrow, a centred heading and intro, then a responsive grid of cards, each with an icon, a short title, a sentence of detail and an optional link. Add, remove and reorder cards; the grid reflows from three columns to one.',
  bestFor: ['SaaS and product feature overviews', 'Service and agency capability lists', 'Benefits sections on any landing page'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Feature cards' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Features' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Everything your team needs to *ship faster*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'One workspace for planning, building and reporting, with the integrations and controls growing teams rely on.' },
  ],
  lists: [{
    key: 'features', group: 'items', label: 'Feature cards', itemLabel: 'Card', titleKey: 'title', min: 1, max: 12,
    fields: [
      { key: 'icon', label: 'Icon', type: 'icon', value: 'sparkles' },
      { key: 'title', label: 'Title', type: 'text', value: 'New feature' },
      { key: 'text', label: 'Text', type: 'textarea', value: 'Describe what it does and why it matters in a sentence or two.' },
      { key: 'link', label: 'Link text (optional)', type: 'text', value: '' },
      { key: 'url', label: 'Link', type: 'url', value: '' },
    ],
    value: [
      { icon: 'zap', title: 'Lightning fast', text: 'Pages load in under a second and every action feels instant, even with thousands of tasks.' },
      { icon: 'workflow', title: 'Automations', text: 'Move cards, assign owners and send updates automatically when work changes state.' },
      { icon: 'chart-column', title: 'Live reports', text: 'Progress, velocity and workload charts update in real time, ready to share with stakeholders.' },
      { icon: 'puzzle', title: '100+ integrations', text: 'Connect GitHub, Slack, Figma and the rest of your stack in a couple of clicks.', link: 'See integrations', url: 'https://webdevpuneet.com/integrations' },
      { icon: 'shield-check', title: 'Secure by default', text: 'SSO, audit logs and encryption at rest and in transit on every plan.' },
      { icon: 'headphones', title: 'Human support', text: 'Real people answer within hours, with onboarding help for every new team.' },
    ],
  }],
  toggles: [],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f5f6fb', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="fg-grid" data-list="features">
    <article class="fg-card" data-anim="item">
      <span class="st-icon" data-icon="icon"></span>
      <h3 class="fg-title" data-edit="title"></h3>
      <p class="fg-text" data-edit="text"></p>
      <a class="fg-link" data-href="url" data-show-if="link"><span data-edit="link"></span> <span aria-hidden="true">→</span></a>
    </article>
  </div>
</div>`,
  css: `.st-features-icon-grid{padding:clamp(64px,8cqi,112px) 0}
.fg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2cqi,24px)}
.fg-card{display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:clamp(22px,2.4cqi,30px);border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 7%,transparent);transition:transform .2s ease,box-shadow .2s ease}
.fg-card:hover{transform:translateY(-3px);box-shadow:0 18px 40px -24px color-mix(in srgb,var(--st-text) 40%,transparent)}
.fg-card .st-icon{margin-bottom:6px}
.fg-title{font-size:19px;letter-spacing:-.01em}
.fg-text{color:var(--st-muted);font-size:16px}
.fg-link{margin-top:auto;padding-top:4px;color:var(--st-brand);font-weight:700;font-size:15px;text-decoration:none}
.fg-link:hover{text-decoration:underline}
@container st (max-width:960px){.fg-grid{grid-template-columns:repeat(2,1fr)}}
@container st (max-width:600px){.fg-grid{grid-template-columns:1fr}}`,
};
