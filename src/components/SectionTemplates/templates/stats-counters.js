export default {
  id: 'stats-counters',
  name: 'Animated Stats Counters',
  version: '1.0.0',
  category: 'stats',
  tags: ['stats', 'numbers', 'counter', 'count-up', 'metrics', 'social-proof', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Stats Section Template — Free Animated Number Counters HTML',
  seoDescription: 'Free stats section: big numbers that count up when scrolled into view, with labels and notes, keeping prefixes like $ and suffixes like + or %. Export the code.',
  description: 'A row of key numbers that count up from zero as the section scrolls into view, under a centred heading. Each stat has a big value (prefixes, suffixes, commas and decimals all supported), a label and an optional short note, separated by thin dividers.',
  bestFor: ['Company and product milestones', 'Social proof under a hero', 'Impact, results and “by the numbers” pages'],
  behaviors: ['counter'],

  groups: [
    { id: 'header', label: 'Heading', toggle: 'showHeader' },
    { id: 'items', label: 'Stats' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'By the numbers' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Trusted by teams who *ship every day*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: '' },
  ],
  lists: [{
    key: 'stats', group: 'items', label: 'Stats', itemLabel: 'Stat', titleKey: 'value', min: 1, max: 6,
    fields: [
      { key: 'value', label: 'Number', type: 'text', value: '100+', hint: 'Prefixes and suffixes are kept while it counts: $2.5M, 12,000+, 99.9%, 4.9/5.' },
      { key: 'label', label: 'Label', type: 'text', value: 'What it measures' },
      { key: 'note', label: 'Note (optional)', type: 'text', value: '' },
    ],
    value: [
      { value: '12,000+', label: 'Teams', note: 'in 90 countries' },
      { value: '4.2M', label: 'Tasks shipped', note: 'and counting' },
      { value: '99.99%', label: 'Uptime', note: 'over the last 12 months' },
      { value: '4.9/5', label: 'Average rating', note: 'from 2,300+ reviews' },
    ],
  }],
  toggles: [{ key: 'showHeader', label: 'Heading', value: true }],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f6f7fb', text: '#0f172a', muted: '#64748b', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head" data-show="showHeader">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <dl class="sc-grid" data-list="stats">
    <div class="sc-stat" data-anim="item">
      <dt class="sc-label" data-edit="label"></dt>
      <dd class="sc-value" data-count data-edit="value"></dd>
      <dd class="sc-note" data-edit="note"></dd>
    </div>
  </dl>
</div>`,
  css: `.st-stats-counters{padding:clamp(56px,7cqi,96px) 0}
.sc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 7%,transparent);overflow:hidden}
.sc-stat{display:flex;flex-direction:column;align-items:center;gap:6px;padding:clamp(28px,3.4cqi,44px) 20px;text-align:center}
.sc-stat + .sc-stat{border-left:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.sc-value{order:-1;margin:0;font:800 clamp(38px,3.4cqi + 16px,58px)/1 var(--st-font-heading);letter-spacing:-.035em;font-variant-numeric:tabular-nums;background:linear-gradient(135deg,var(--st-text),var(--st-brand));-webkit-background-clip:text;background-clip:text;color:transparent}
.sc-label{font-weight:700;font-size:16.5px}
.sc-note{margin:0;color:var(--st-muted);font-size:14.5px}
.sc-note:empty{display:none}
@container st (max-width:720px){.sc-grid{grid-template-columns:1fr 1fr}.sc-stat + .sc-stat{border-left:0}.sc-stat:nth-child(even){border-left:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}.sc-stat:nth-child(n+3){border-top:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}}`,
};
