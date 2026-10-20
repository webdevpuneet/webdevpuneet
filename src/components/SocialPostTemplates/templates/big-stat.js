export default {
  id: 'big-stat',
  name: 'Big Stat',
  version: '1.0.0',
  category: 'quotes',
  tags: ['statistic', 'data', 'number', 'infographic', 'linkedin', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Statistic Post Template — Free Big Number Social Media Post',
  seoDescription: 'Free statistic post template: one giant number, what it means, a mini bar chart and a source line. Ideal for LinkedIn and Instagram. Edit online, export PNG.',
  description: 'A data post built around one striking statistic: a giant number in the accent colour, a sentence explaining it, a small bar chart that visualises the share, a context line, the source and your handle.',
  bestFor: ['Industry statistics and research findings', 'Report and survey highlights', 'LinkedIn thought-leadership posts'],
  fonts: { heading: 'space', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#0b1220' },
    { key: 'text', label: 'Text', value: '#f8fafc' },
    { key: 'accent', label: 'Accent', value: '#22d3ee' },
  ],
  fields: [
    { key: 'eyebrow', label: 'Small label', type: 'text', value: 'By the numbers' },
    { key: 'stat', label: 'Statistic', type: 'text', value: '70%' },
    { key: 'statLabel', label: 'What it means', type: 'textarea', value: 'of online shopping carts are *abandoned* before checkout.' },
    { key: 'percent', label: 'Bar fill (0–100, optional)', type: 'text', value: '70' },
    { key: 'context', label: 'Context line', type: 'textarea', value: 'A simple reminder email can win a share of those sales back.' },
    { key: 'source', label: 'Source', type: 'text', value: 'Source: Baymard Institute, cart abandonment research' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="bs">
  <span class="bs-eyebrow" data-edit="eyebrow"></span>
  <div class="bs-main" data-fit-box>
    <span class="bs-stat" data-edit="stat"></span>
    <p class="bs-label" data-edit="statLabel" data-fit></p>
  </div>
  <div class="bs-bar" aria-hidden="true"><div class="bs-fill" data-bar="percent"></div></div>
  <p class="bs-context" data-edit="context"></p>
  <div class="bs-foot"><span data-edit="source"></span><span class="bs-handle" data-edit="handle"></span></div>
</div>`,
  css: `.bs{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3.4);padding:var(--pt) var(--pad) var(--pb);background:linear-gradient(color-mix(in srgb,var(--text) 5%,transparent) 1px,transparent 1px) 0 0/100% calc(var(--u)*8),radial-gradient(circle at 0% 0%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 50%),var(--bg)}
.bs-eyebrow{font-size:calc(var(--u)*3.2);font-weight:700;text-transform:uppercase;letter-spacing:.18em;color:var(--accent)}
.bs-main{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*2)}
.bs-stat{font-family:var(--font-heading);font-size:calc(var(--u)*34);line-height:.9;font-weight:700;letter-spacing:-.04em;color:var(--accent);text-shadow:0 0 calc(var(--u)*8) color-mix(in srgb,var(--accent) 45%,transparent)}
.bs-label{font-family:var(--font-heading);font-size:calc(var(--u)*6.6);line-height:1.15;font-weight:700;max-width:92%}
.bs-bar{height:calc(var(--u)*3);border-radius:99px;background:color-mix(in srgb,var(--text) 12%,transparent);overflow:hidden}
.bs-fill{height:100%;width:var(--bar,70%);border-radius:99px;background:linear-gradient(90deg,color-mix(in srgb,var(--accent) 60%,transparent),var(--accent))}
.bs-context{font-size:calc(var(--u)*3.6);line-height:1.4;opacity:.75;max-width:90%}
.bs-foot{display:flex;justify-content:space-between;gap:calc(var(--u)*3);font-size:calc(var(--u)*2.7);opacity:.6;padding-top:calc(var(--u)*2.4);border-top:1px solid color-mix(in srgb,var(--text) 15%,transparent)}
.bs-handle{font-weight:700;flex:none;opacity:1;color:var(--accent)}
.is-landscape .bs-stat{font-size:calc(var(--u)*30)}
.is-landscape .bs-label{font-size:calc(var(--u)*6)}`,
};
