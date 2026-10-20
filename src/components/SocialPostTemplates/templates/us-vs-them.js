export default {
  id: 'us-vs-them',
  name: 'Us vs Them Comparison',
  version: '1.0.0',
  category: 'promo',
  tags: ['comparison', 'versus', 'competitor', 'features', 'checklist', 'saas', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Comparison Post Template — Free "Us vs Them" Social Post',
  seoDescription: 'Free comparison post template for Instagram and LinkedIn: "others" with crosses next to your brand with ticks, four rows each. Edit online and export PNG.',
  description: 'A side-by-side "us vs them" comparison: a headline, a muted "Others" column with four cross-marked drawbacks and a highlighted column for your brand with four tick-marked benefits, plus a short call to action and your handle.',
  bestFor: ['Showing why customers switch to you', '"Old way vs new way" posts', 'Before-you-buy comparison content'],
  fonts: { heading: 'jakarta', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#f1f5f9' },
    { key: 'card', label: 'Card', value: '#ffffff' },
    { key: 'text', label: 'Text', value: '#0f172a' },
    { key: 'accent', label: 'Accent', value: '#2563eb' },
  ],
  fields: [
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Why teams switch to *Acme*' },
    { key: 'themLabel', label: 'Left column label', type: 'text', value: 'Other tools' },
    { key: 'them1', label: 'Left point 1', type: 'text', value: 'Per-seat pricing' },
    { key: 'them2', label: 'Left point 2', type: 'text', value: 'Weeks to set up' },
    { key: 'them3', label: 'Left point 3', type: 'text', value: 'Email-only support' },
    { key: 'them4', label: 'Left point 4', type: 'text', value: 'Reports cost extra' },
    { key: 'usLabel', label: 'Right column label', type: 'text', value: 'Acme' },
    { key: 'us1', label: 'Right point 1', type: 'text', value: 'One flat price' },
    { key: 'us2', label: 'Right point 2', type: 'text', value: 'Live in 10 minutes' },
    { key: 'us3', label: 'Right point 3', type: 'text', value: 'Real humans, 24/7' },
    { key: 'us4', label: 'Right point 4', type: 'text', value: 'Reports included' },
    { key: 'cta', label: 'Call to action', type: 'text', value: 'Try it free for 14 days · link in bio' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="vs">
  <h2 class="vs-title" data-edit="title"></h2>
  <div class="vs-cols">
    <div class="vs-col vs-them">
      <span class="vs-head" data-edit="themLabel"></span>
      <p><i aria-hidden="true">&#10005;</i><span data-edit="them1"></span></p>
      <p><i aria-hidden="true">&#10005;</i><span data-edit="them2"></span></p>
      <p><i aria-hidden="true">&#10005;</i><span data-edit="them3"></span></p>
      <p><i aria-hidden="true">&#10005;</i><span data-edit="them4"></span></p>
    </div>
    <div class="vs-badge" aria-hidden="true">VS</div>
    <div class="vs-col vs-us">
      <span class="vs-head" data-edit="usLabel"></span>
      <p><i aria-hidden="true">&#10003;</i><span data-edit="us1"></span></p>
      <p><i aria-hidden="true">&#10003;</i><span data-edit="us2"></span></p>
      <p><i aria-hidden="true">&#10003;</i><span data-edit="us3"></span></p>
      <p><i aria-hidden="true">&#10003;</i><span data-edit="us4"></span></p>
    </div>
  </div>
  <div class="vs-foot"><span class="vs-cta" data-edit="cta"></span><span class="vs-handle" data-edit="handle"></span></div>
</div>`,
  css: `.vs{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*5);padding:var(--pt) var(--pad) var(--pb);background:var(--bg)}
.vs-title{font-family:var(--font-heading);font-size:calc(var(--u)*9);line-height:1.04;font-weight:800;letter-spacing:-.025em;text-align:center}
.vs-cols{flex:1;position:relative;display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--u)*9);min-height:0}
.vs-col{display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*2.6);padding:calc(var(--u)*5) calc(var(--u)*3.4);border-radius:calc(var(--u)*4)}
.vs-them{background:color-mix(in srgb,var(--text) 6%,var(--bg));color:color-mix(in srgb,var(--text) 60%,var(--bg))}
.vs-us{background:var(--card);box-shadow:0 0 0 calc(var(--u)*.6) var(--accent),0 calc(var(--u)*2) calc(var(--u)*8) color-mix(in srgb,var(--accent) 25%,transparent)}
.vs-head{font-family:var(--font-heading);font-size:calc(var(--u)*4.4);font-weight:800;margin-bottom:calc(var(--u)*1)}
.vs-us .vs-head{color:var(--accent)}
.vs-col p{display:flex;align-items:center;gap:calc(var(--u)*2);font-size:calc(var(--u)*3.4);line-height:1.25;font-weight:600}
.vs-col p:has(> span:empty){display:none}
.vs-col i{flex:none;width:calc(var(--u)*5.4);height:calc(var(--u)*5.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:calc(var(--u)*2.8);font-weight:800}
.vs-them i{background:color-mix(in srgb,#ef4444 18%,transparent);color:#dc2626}
.vs-us i{background:var(--accent);color:#fff}
.vs-us p{color:var(--text)}
.vs-badge{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:calc(var(--u)*10);height:calc(var(--u)*10);border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--text);color:var(--bg);font-family:var(--font-heading);font-size:calc(var(--u)*3.6);font-weight:800;z-index:1;box-shadow:0 0 0 calc(var(--u)*1) var(--bg)}
.vs-foot{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3);font-size:calc(var(--u)*3.2);font-weight:700}
.vs-handle{color:var(--accent);flex:none}
.is-story .vs-cols{grid-template-columns:1fr;grid-template-rows:1fr 1fr;gap:calc(var(--u)*9)}
.is-landscape .vs-title{font-size:calc(var(--u)*7.6)}`,
};
