import { IMG } from './meta.js';

export default {
  id: 'features-alternating',
  name: 'Alternating Feature Rows',
  version: '1.0.0',
  category: 'features',
  tags: ['features', 'zig-zag', 'alternating', 'image', 'checklist', 'saas', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Alternating Features Section — Free Zig-Zag Layout Template',
  seoDescription: 'Free zig-zag features section: image and text rows that alternate sides, each with a label, heading, bullet list and link. Responsive; export HTML, React, Vue.',
  description: 'A zig-zag feature section: a centred heading, then rows that alternate image-left and image-right. Each row has a small label, a heading, a paragraph, a checklist of benefits, an optional link and its own image. Add as many rows as you need; they stack on phones.',
  bestFor: ['Product tours with one screenshot per feature', 'Long-form landing pages and feature pages', 'Service pages that explain a process'],

  groups: [
    { id: 'header', label: 'Heading', toggle: 'showHeader' },
    { id: 'items', label: 'Feature rows' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'How it helps' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'From messy backlog to *shipped*, in one place' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: '' },
  ],
  lists: [{
    key: 'rows', group: 'items', label: 'Feature rows', itemLabel: 'Row', titleKey: 'title', min: 1, max: 8,
    fields: [
      { key: 'label', label: 'Label (optional)', type: 'text', value: 'Feature' },
      { key: 'title', label: 'Heading', type: 'textarea', value: 'A new feature' },
      { key: 'text', label: 'Text', type: 'textarea', value: 'Explain the benefit in two or three sentences.' },
      { key: 'bullets', label: 'Bullet points (optional)', type: 'lines', value: 'First benefit\nSecond benefit' },
      { key: 'link', label: 'Link text (optional)', type: 'text', value: '' },
      { key: 'url', label: 'Link', type: 'url', value: '' },
      { key: 'image', label: 'Image', type: 'image', value: IMG('feature-analytics.png'), hint: 'About 1200×900 px works best.', upload: { name: 'row', maxW: 1600, mime: 'image/png' } },
      { key: 'imageAlt', label: 'Image alt text', type: 'text', value: '' },
    ],
    value: [
      { label: 'Plan', title: 'Boards that keep *everyone aligned*', text: 'Turn ideas into scoped work with boards, owners and due dates your whole team can see.', bullets: 'Drag-and-drop kanban and list views\nOwners, estimates and due dates\nTemplates for sprints and launches', link: 'Explore planning', url: 'https://webdevpuneet.com/planning', image: IMG('feature-collab.png'), imageAlt: 'Kanban board with tasks in three columns' },
      { label: 'Automate', title: 'Let the busywork *run itself*', text: 'Build automations visually: when something changes, the right people are told and the next step starts.', bullets: 'Triggers for status, dates and fields\nSlack, email and webhook actions\nRun history for every rule', link: 'See automations', url: 'https://webdevpuneet.com/automations', image: IMG('feature-automation.png'), imageAlt: 'Workflow canvas with connected automation steps' },
      { label: 'Report', title: 'Progress reports that *write themselves*', text: 'Live dashboards and weekly summaries built from the work itself, ready to share with stakeholders.', bullets: 'Velocity, burndown and workload charts\nScheduled reports by email\nShare links with view-only access', link: '', url: '', image: IMG('feature-analytics.png'), imageAlt: 'Analytics dashboard with a rising line chart' },
    ],
  }],
  toggles: [{ key: 'showHeader', label: 'Heading', value: true }],
  theme: { brand: '#16a34a', brandText: '#ffffff', bg: '#ffffff', surface: '#f1f8f3', text: '#0f172a', muted: '#475569', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head" data-show="showHeader">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="fa-rows" data-list="rows">
    <div class="fa-row">
      <div class="fa-copy" data-anim="item">
        <span class="st-pill fa-label" data-show-if="label" data-edit="label"></span>
        <h3 class="fa-title" data-edit="title"></h3>
        <p class="fa-text" data-edit="text"></p>
        <ul class="fa-bullets" data-show-if="bullets" data-lines="bullets"></ul>
        <a class="fa-link" data-href="url" data-show-if="link"><span data-edit="link"></span> <span aria-hidden="true">→</span></a>
      </div>
      <div class="fa-media" data-anim="media"><img data-image="image" alt="" width="1200" height="900" loading="lazy"></div>
    </div>
  </div>
</div>`,
  css: `.st-features-alternating{padding:clamp(64px,8cqi,112px) 0}
.fa-rows{display:flex;flex-direction:column;gap:clamp(56px,8cqi,112px)}
.fa-row{display:grid;grid-template-columns:1fr 1.1fr;align-items:center;gap:clamp(32px,5cqi,80px)}
.fa-row:nth-child(even) .fa-media{order:-1}
.fa-copy{display:flex;flex-direction:column;align-items:flex-start;gap:16px}
.fa-title{font-size:clamp(26px,1.8cqi + 14px,36px)}
.fa-text{color:var(--st-muted)}
.fa-bullets{list-style:none;display:flex;flex-direction:column;gap:10px;margin-top:4px}
.fa-bullets li{position:relative;padding-left:32px;font-weight:500}
.fa-bullets li::before{content:"";position:absolute;left:0;top:.2em;width:20px;height:20px;border-radius:50%;background:color-mix(in srgb,var(--st-brand) 14%,transparent)}
.fa-bullets li::after{content:"";position:absolute;left:5px;top:calc(.2em + 5px);width:10px;height:10px;background:var(--st-brand);-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E") center/contain no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E") center/contain no-repeat}
.fa-link{color:var(--st-brand);font-weight:700;text-decoration:none}
.fa-link:hover{text-decoration:underline}
.fa-media{padding:clamp(14px,2cqi,28px);border-radius:calc(var(--st-radius) * 1.5px);background:var(--st-surface)}
.fa-media img{width:100%;border-radius:calc(var(--st-radius) * .9px);box-shadow:0 24px 60px -30px color-mix(in srgb,var(--st-text) 45%,transparent)}
@container st (max-width:860px){.fa-row{grid-template-columns:1fr}.fa-row .fa-media,.fa-row:nth-child(even) .fa-media{order:-1}}`,
};
