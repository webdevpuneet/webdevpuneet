export default {
  id: 'tip-of-the-day',
  name: 'Tip of the Day',
  version: '1.0.0',
  category: 'quotes',
  tags: ['tip', 'education', 'numbered', 'light'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Tip of the Day Post Template — Free Instagram & Facebook',
  seoDescription: 'Free tip of the day social post template with a big tip number, headline, short explanation and logo. Download every post size, or copy the HTML code.',
  description: 'A soft gradient card with a "Tip of the day" label, a large tip number, a headline, a short explanation and your logo and handle.',
  bestFor: ['Daily or weekly tip series', 'Educational accounts and coaches', 'Product how-to tips'],
  fonts: { heading: 'jakarta', body: 'jakarta' },
  vars: [
    { key: 'bg', label: 'Background', value: '#eef2ff' },
    { key: 'bg2', label: 'Gradient end', value: '#c7d2fe' },
    { key: 'text', label: 'Text', value: '#1e1b4b' },
    { key: 'accent', label: 'Accent', value: '#4f46e5' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Tip of the day' },
    { key: 'number', label: 'Tip number', type: 'text', value: '#27' },
    { key: 'title', label: 'Tip', type: 'textarea', value: 'Use *gap* instead of margins in flexbox layouts' },
    { key: 'detail', label: 'Explanation', type: 'textarea', value: 'It spaces items evenly, never collapses, and you can delete half your spacing utilities.' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="t">
  <div class="t-top"><span class="t-label" data-edit="label"></span><span class="t-num" data-edit="number"></span></div>
  <div class="t-body" data-fit-box>
    <h2 class="t-title" data-edit="title" data-fit></h2>
    <p class="t-detail" data-edit="detail" data-fit></p>
  </div>
  <div class="t-foot"><div class="t-logo" data-image="logo" data-image-fit="contain"></div><span class="t-handle" data-edit="handle"></span></div>
</div>`,
  css: `.t{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) var(--pad) var(--pb);background:linear-gradient(160deg,var(--bg) 0%,var(--bg2) 100%)}
.t-top{display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3)}
.t-label{font-size:calc(var(--u)*3);font-weight:800;text-transform:uppercase;letter-spacing:.14em;color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,#fff);padding:calc(var(--u)*1.4) calc(var(--u)*3);border-radius:99px}
.t-num{font-size:calc(var(--u)*13);font-weight:800;line-height:1;color:color-mix(in srgb,var(--accent) 30%,transparent)}
.t-body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*4)}
.t-title{font-family:var(--font-heading);font-size:calc(var(--u)*8.2);line-height:1.12;font-weight:800;letter-spacing:-.02em}
.t-detail{font-size:calc(var(--u)*3.8);line-height:1.5;opacity:.82}
.t-foot{display:flex;align-items:center;gap:calc(var(--u)*2.5)}
.t-logo{width:calc(var(--u)*7);height:calc(var(--u)*7)}
.t-handle{font-size:calc(var(--u)*3.2);font-weight:700}
.is-landscape .t-title{font-size:calc(var(--u)*7.4)}`,
};
