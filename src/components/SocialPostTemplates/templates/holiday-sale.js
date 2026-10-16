export default {
  id: 'holiday-sale',
  name: 'Black Friday Sale',
  version: '1.0.0',
  category: 'promo',
  tags: ['black-friday', 'cyber-monday', 'holiday', 'sale', 'dark'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Black Friday Sale Post Template — Free Instagram & X Post',
  seoDescription: 'Free Black Friday and Cyber Monday sale post template with bold condensed type, discount, sale dates and promo code. Download all post sizes or copy the HTML.',
  description: 'A black-and-neon Black Friday post with huge condensed type, the discount, sale dates and a promo code. Retitle it for Cyber Monday or any holiday sale.',
  bestFor: ['Black Friday and Cyber Monday (Nov 27–30, 2026)', 'Holiday and end-of-year sales', 'Small Business Saturday promos'],
  fonts: { heading: 'bebas', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#000000' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Accent', value: '#facc15' },
  ],
  fields: [
    { key: 'line1', label: 'Line 1', type: 'text', value: 'Black' },
    { key: 'line2', label: 'Line 2', type: 'text', value: 'Friday' },
    { key: 'deal', label: 'Deal', type: 'text', value: 'Up to 60% off' },
    { key: 'dates', label: 'Dates', type: 'text', value: 'Nov 27 – Nov 30' },
    { key: 'code', label: 'Code', type: 'text', value: 'Use code BF60' },
  ],
  html: `<div class="bf">
  <div class="bf-body" data-fit-box>
    <span class="bf-l1" data-edit="line1"></span>
    <span class="bf-l2" data-edit="line2"></span>
    <span class="bf-deal" data-edit="deal" data-fit></span>
  </div>
  <div class="bf-foot"><span data-edit="dates"></span><span class="bf-code" data-edit="code"></span></div>
</div>`,
  css: `.bf{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) var(--pad) var(--pb);background:linear-gradient(transparent 0 calc(100% - calc(var(--u)*1.6)),var(--accent) 0),var(--bg)}
.bf-body{flex:1;display:flex;flex-direction:column;justify-content:center}
.bf-l1,.bf-l2{font-family:var(--font-heading);font-size:calc(var(--u)*30);line-height:.84;letter-spacing:.01em;text-transform:uppercase}
.bf-l1{color:transparent;-webkit-text-stroke:calc(var(--u)*.4) var(--text)}
.bf-l2{color:var(--accent)}
.bf-deal{margin-top:calc(var(--u)*4);font-family:var(--font-heading);font-size:calc(var(--u)*11);line-height:1;letter-spacing:.02em;text-transform:uppercase}
.bf-foot{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3);font-size:calc(var(--u)*3.4);font-weight:700;text-transform:uppercase;letter-spacing:.1em}
.bf-code{color:var(--bg);background:var(--accent);padding:calc(var(--u)*1.6) calc(var(--u)*3);border-radius:calc(var(--u)*1)}
.is-landscape .bf-l1,.is-landscape .bf-l2{font-size:calc(var(--u)*24)}`,
};
