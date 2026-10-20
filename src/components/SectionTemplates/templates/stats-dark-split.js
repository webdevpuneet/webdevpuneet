import { LOGO_HTML, LOGO_CSS, logoFields, DEMO_LOGOS } from './parts.js';

export default {
  id: 'stats-dark-split',
  name: 'Stats With Logos (Dark)',
  version: '1.0.0',
  category: 'stats',
  tags: ['stats', 'counter', 'logos', 'dark', 'split', 'metrics', 'social-proof'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Stats and Logos Section — Free Dark Metrics Template HTML',
  seoDescription: 'Free dark stats section: heading and button beside four counting stat cards with icons, plus a row of customer logos. GSAP count-up on scroll; export HTML.',
  description: 'A dark “results” section: on the left a heading, short text and a button; on the right four stat cards with icons whose numbers count up as they scroll into view; underneath, a row of customer logos. It packs proof, scale and credibility into one block.',
  bestFor: ['Enterprise and B2B landing pages', 'Investor, impact or about pages', 'Product pages that need hard numbers'],
  behaviors: ['counter'],

  groups: [
    { id: 'main', label: 'Heading & button' },
    { id: 'items', label: 'Stats' },
    { id: 'logos', label: 'Logos', toggle: 'showLogos' },
  ],
  fields: [
    { key: 'eyebrow', group: 'main', label: 'Eyebrow (optional)', type: 'text', value: 'Results' },
    { key: 'heading', group: 'main', label: 'Heading', type: 'textarea', value: 'Numbers our customers *actually see*' },
    { key: 'lead', group: 'main', label: 'Supporting text (optional)', type: 'textarea', value: 'Teams switch for the speed and stay for the results. These are averages across customers in their first year.' },
    { key: 'cta', group: 'main', label: 'Button text (optional)', type: 'text', value: 'Read customer stories' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://yoursite.com/customers' },
    { key: 'logosTitle', group: 'logos', label: 'Line above the logos (optional)', type: 'text', value: 'Powering teams at' },
  ],
  lists: [
    {
      key: 'stats', group: 'items', label: 'Stats', itemLabel: 'Stat', titleKey: 'value', min: 1, max: 4,
      fields: [
        { key: 'icon', label: 'Icon', type: 'icon', value: 'trending-up' },
        { key: 'value', label: 'Number', type: 'text', value: '50%', hint: 'Prefixes and suffixes are kept while it counts: $2.5M, 12,000+, 99.9%.' },
        { key: 'label', label: 'Label', type: 'text', value: 'What it measures' },
      ],
      value: [
        { icon: 'gauge', value: '3.4×', label: 'faster release cycles' },
        { icon: 'clock', value: '11 hrs', label: 'saved per person, per month' },
        { icon: 'wallet', value: '$2.5M', label: 'average yearly savings' },
        { icon: 'thumbs-up', value: '96%', label: 'would recommend us' },
      ],
    },
    {
      key: 'logos', group: 'logos', label: 'Logos', itemLabel: 'Logo', titleKey: 'name', min: 1, max: 8,
      fields: logoFields(),
      value: DEMO_LOGOS.slice(0, 6),
    },
  ],
  toggles: [{ key: 'showLogos', label: 'Logos', value: true }],
  theme: { brand: '#22d3ee', brandText: '#06222a', bg: '#0a0f1c', surface: '#111827', text: '#f1f5f9', muted: '#94a3b8', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <div class="sd">
    <div class="sd-copy">
      <header class="st-head st-head--left sd-head">
        <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
        <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
        <p class="st-lead" data-anim="item" data-edit="lead"></p>
      </header>
      <div class="st-btns" data-anim="item" data-show-if="cta"><a class="st-btn" data-href="ctaUrl"><span data-edit="cta"></span></a></div>
    </div>
    <ul class="sd-grid" data-list="stats">
      <li class="sd-card" data-anim="item">
        <span class="st-icon" data-icon="icon"></span>
        <p class="sd-value" data-count data-edit="value"></p>
        <p class="sd-label" data-edit="label"></p>
      </li>
    </ul>
  </div>
  <div class="sd-logos" data-anim="item" data-show="showLogos">
    <p class="sd-logos-title" data-edit="logosTitle"></p>
    <ul class="sd-logo-row" data-list="logos">
      ${LOGO_HTML}
    </ul>
  </div>
</div>`,
  css: `.st-stats-dark-split{padding:clamp(64px,8cqi,112px) 0}
.st-stats-dark-split::before{content:"";position:absolute;right:-10%;top:-20%;width:60%;height:80%;background:radial-gradient(closest-side,color-mix(in srgb,var(--st-brand) 18%,transparent),transparent);pointer-events:none}
${LOGO_CSS}
.sd{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);align-items:center;gap:clamp(36px,5cqi,80px)}
.sd-copy{display:flex;flex-direction:column;align-items:flex-start;gap:28px}
.sd-head{margin:0}
.sd-grid{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:clamp(12px,1.6cqi,18px);margin:0}
.sd-card{display:flex;flex-direction:column;gap:6px;padding:clamp(20px,2.4cqi,28px);border-radius:calc(var(--st-radius) * 1px);background:linear-gradient(160deg,var(--st-surface),color-mix(in srgb,var(--st-surface) 70%,var(--st-bg)));border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
.sd-card .st-icon{width:42px;height:42px;margin-bottom:10px;background:color-mix(in srgb,var(--st-brand) 16%,transparent)}
.sd-card .st-icon svg{width:21px;height:21px}
.sd-value{order:1;margin:0;font:800 clamp(32px,2.6cqi + 14px,46px)/1.05 var(--st-font-heading);letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:var(--st-text)}
.sd-label{order:2;color:var(--st-muted);font-size:15px}
.sd-card .st-icon{order:0}
.sd-logos{position:relative;margin-top:clamp(48px,6cqi,80px);padding-top:clamp(28px,3cqi,40px);border-top:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);text-align:center}
.sd-logos-title{color:var(--st-muted);font-size:14px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:22px}
.sd-logos-title:empty{display:none}
.sd-logo-row{list-style:none;display:flex;flex-wrap:wrap;justify-content:center;gap:24px clamp(32px,4.5cqi,64px)}
.st-stats-dark-split .st-logo-img{filter:grayscale(1) brightness(2.2)}
@container st (max-width:860px){.sd{grid-template-columns:1fr}}
@container st (max-width:420px){.sd-grid{grid-template-columns:1fr}}`,
};
