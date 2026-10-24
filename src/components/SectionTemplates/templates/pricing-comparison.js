export default {
  id: 'pricing-comparison',
  name: 'Pricing Comparison Table',
  version: '1.0.0',
  category: 'pricing',
  tags: ['pricing', 'comparison', 'table', 'plans', 'features', 'matrix', 'saas', 'light'],
  created: '2026-10-24',
  updated: '2026-10-24',
  seoTitle: 'Pricing Comparison Table Template — Free Plan Matrix HTML',
  seoDescription: 'Free pricing comparison table: three plans side by side with a highlighted plan, grouped feature rows and buttons. Edit online, export HTML, React or Vue.',
  description: 'A plan comparison matrix: a header row with three plans (name, price, note and a button, with one plan highlighted and badged), then feature rows grouped under sub-headings with ticks, dashes or short limits in each cell. It is built as an accessible table role, keeps the feature names in a sticky first column and scrolls sideways on narrow screens.',
  bestFor: ['SaaS and software pricing pages', 'Membership, hosting and subscription plans', 'Any product with tiers that differ by features and limits'],

  groups: [
    { id: 'header', label: 'Heading', toggle: 'showHeader' },
    { id: 'plans', label: 'Plans' },
    { id: 'rows', label: 'Feature rows' },
    { id: 'footer', label: 'Note under the table' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Compare plans' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Find the plan that *fits your team*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Every plan includes the full editor and unlimited exports. Upgrade when you need more people, space or support.' },
    { key: 'featureHeading', group: 'header', label: 'First column heading', type: 'text', value: 'Features' },
    { key: 'note', group: 'footer', label: 'Note (optional)', type: 'text', value: 'Prices are per month, billed yearly. Cancel any time.' },
  ],
  lists: [
    {
      key: 'plans', group: 'plans', label: 'Plans', itemLabel: 'Plan', titleKey: 'name', min: 3, max: 3,
      fields: [
        { key: 'name', label: 'Plan name', type: 'text', value: 'Plan' },
        { key: 'badge', label: 'Badge (highlights the plan)', type: 'text', value: '' },
        { key: 'price', label: 'Price', type: 'text', value: '$0' },
        { key: 'per', label: 'Price note (optional)', type: 'text', value: '/month' },
        { key: 'cta', label: 'Button text', type: 'text', value: 'Get started' },
        { key: 'url', label: 'Button link', type: 'url', value: '#get-started' },
      ],
      value: [
        { name: 'Starter', badge: '', price: '$0', per: 'free forever', cta: 'Start free', url: '#get-started' },
        { name: 'Pro', badge: 'Most popular', price: '$19', per: '/month', cta: 'Start Pro trial', url: '#get-started' },
        { name: 'Business', badge: '', price: '$49', per: '/month', cta: 'Talk to sales', url: '#contact' },
      ],
    },
    {
      key: 'rows', group: 'rows', label: 'Feature rows', itemLabel: 'Row', titleKey: 'label', min: 1, max: 30,
      fields: [
        { key: 'group', label: 'Group heading (fill this to make the row a heading)', type: 'text', value: '' },
        { key: 'label', label: 'Feature', type: 'text', value: 'Feature' },
        { key: 'p1', label: 'Plan 1', type: 'text', value: '✓', hint: 'A tick (✓), a dash (—) or a short limit such as “10 GB”.' },
        { key: 'p2', label: 'Plan 2', type: 'text', value: '✓' },
        { key: 'p3', label: 'Plan 3', type: 'text', value: '✓' },
      ],
      value: [
        { group: 'Core', label: '', p1: '', p2: '', p3: '' },
        { group: '', label: 'Projects', p1: '3', p2: 'Unlimited', p3: 'Unlimited' },
        { group: '', label: 'Team members', p1: '1', p2: '10', p3: 'Unlimited' },
        { group: '', label: 'Storage', p1: '1 GB', p2: '100 GB', p3: '1 TB' },
        { group: 'Features', label: '', p1: '', p2: '', p3: '' },
        { group: '', label: 'Custom domain', p1: '—', p2: '✓', p3: '✓' },
        { group: '', label: 'Analytics', p1: 'Basic', p2: 'Advanced', p3: 'Advanced + export' },
        { group: '', label: 'API access', p1: '—', p2: '✓', p3: '✓' },
        { group: '', label: 'Single sign-on (SSO)', p1: '—', p2: '—', p3: '✓' },
        { group: 'Support', label: '', p1: '', p2: '', p3: '' },
        { group: '', label: 'Email support', p1: '✓', p2: '✓', p3: '✓' },
        { group: '', label: 'Priority support', p1: '—', p2: '✓', p3: '✓' },
        { group: '', label: 'Dedicated manager', p1: '—', p2: '—', p3: '✓' },
      ],
    },
  ],
  toggles: [{ key: 'showHeader', label: 'Heading', value: true }],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f6f7fb', text: '#0f172a', muted: '#64748b', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head" data-show="showHeader">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="pc-scroll" data-anim="media" tabindex="0" role="region" aria-label="Plan comparison table">
    <div class="pc-table" role="table">
      <div class="pc-head" role="row">
        <div class="pc-corner" role="columnheader" data-edit="featureHeading"></div>
        <ul class="pc-plans" data-list="plans">
          <li class="pc-plan" role="columnheader" data-set="data-badge:badge">
            <span class="pc-badge" data-show-if="badge" data-edit="badge"></span>
            <span class="pc-name" data-edit="name"></span>
            <span class="pc-price"><strong data-edit="price"></strong><span class="pc-per" data-show-if="per" data-edit="per"></span></span>
            <a class="st-btn pc-btn" data-href="url" data-show-if="cta"><span data-edit="cta"></span></a>
          </li>
        </ul>
      </div>
      <ul class="pc-body" data-list="rows">
        <li class="pc-row" role="row" data-set="data-group:group">
          <span class="pc-group" role="rowheader" data-show-if="group" data-edit="group"></span>
          <span class="pc-feature" role="rowheader" data-hide-if="group" data-edit="label"></span>
          <span class="pc-cell" role="cell" data-hide-if="group" data-edit="p1"></span>
          <span class="pc-cell" role="cell" data-hide-if="group" data-edit="p2"></span>
          <span class="pc-cell" role="cell" data-hide-if="group" data-edit="p3"></span>
        </li>
      </ul>
    </div>
  </div>
  <p class="st-form-note pc-note" data-show-if="note" data-edit="note"></p>
</div>`,
  css: `.st-pricing-comparison{padding:clamp(56px,7cqi,104px) 0}
.pc-scroll{overflow-x:auto;border-radius:calc(var(--st-radius) * 1.2px);border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);background:var(--st-bg)}
.pc-scroll:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 55%,transparent);outline-offset:3px}
.pc-table{min-width:720px}
.pc-head,.pc-row{display:grid;grid-template-columns:minmax(200px,1.3fr) 3fr;align-items:stretch}
.pc-plans,.pc-row-cells{list-style:none;display:grid;grid-template-columns:repeat(3,1fr)}
.pc-corner{display:flex;align-items:flex-end;padding:22px 24px;font-weight:700;color:var(--st-muted);font-size:14px;letter-spacing:.04em;text-transform:uppercase;position:sticky;left:0;background:var(--st-bg)}
.pc-plan{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;padding:30px 18px 24px;text-align:center;border-left:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.pc-plan[data-badge]:not([data-badge=""]){background:color-mix(in srgb,var(--st-brand) 7%,var(--st-bg));box-shadow:inset 0 3px 0 var(--st-brand)}
.pc-badge{position:absolute;top:-1px;left:50%;transform:translateX(-50%);padding:4px 12px;border-radius:0 0 10px 10px;background:var(--st-brand);color:var(--st-btn-text);font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap}
.pc-name{font:800 20px/1.2 var(--st-font-heading);letter-spacing:-.02em}
.pc-price{display:flex;align-items:baseline;gap:6px}
.pc-price strong{font:800 32px/1 var(--st-font-heading);letter-spacing:-.03em}
.pc-per{color:var(--st-muted);font-size:14px}
.pc-btn{margin-top:6px;min-height:44px;padding:0 20px;font-size:15px}
.pc-body{list-style:none}
.pc-row{border-top:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.pc-row .pc-feature{padding:15px 24px;font-weight:600;font-size:15.5px;position:sticky;left:0;background:var(--st-bg)}
.pc-row{grid-template-columns:minmax(200px,1.3fr) repeat(3,minmax(0,1fr))}
.pc-head{grid-template-columns:minmax(200px,1.3fr) 3fr}
.pc-cell{display:flex;align-items:center;justify-content:center;padding:15px 12px;color:var(--st-muted);font-size:15.5px;text-align:center;border-left:1px solid color-mix(in srgb,var(--st-text) 6%,transparent)}
.pc-row:hover .pc-cell,.pc-row:hover .pc-feature{background:color-mix(in srgb,var(--st-text) 3%,var(--st-bg))}
.pc-row[data-group]:not([data-group=""]){display:block;background:var(--st-surface)}
.pc-group{display:block;padding:13px 24px;font:800 13px/1 var(--st-font-body);letter-spacing:.07em;text-transform:uppercase;color:var(--st-brand)}
.pc-note{margin-top:16px;text-align:center}
.pc-note:empty{display:none}`,
};
