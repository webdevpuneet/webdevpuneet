export default {
  id: 'myth-vs-fact',
  name: 'Myth vs Fact',
  version: '1.0.0',
  category: 'quotes',
  tags: ['myth', 'fact', 'education', 'comparison', 'engagement', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Myth vs Fact Post Template — Free Educational Social Post',
  seoDescription: 'Free myth vs fact post template for Instagram and LinkedIn: a crossed-out myth, the fact that corrects it, and a source line. Edit online and download PNG.',
  description: 'An educational post that busts a common myth: a topic label, the myth in a red panel with a cross mark, the fact in a green panel with a check mark, a source line and your handle.',
  bestFor: ['Myth-busting posts for health, finance and tech', 'Educational carousels and series', 'Clearing up product misconceptions'],
  fonts: { heading: 'jakarta', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#f8fafc' },
    { key: 'text', label: 'Text', value: '#0f172a' },
    { key: 'myth', label: 'Myth colour', value: '#dc2626' },
    { key: 'accent', label: 'Fact colour', value: '#16a34a' },
  ],
  fields: [
    { key: 'topic', label: 'Topic', type: 'text', value: 'Email marketing' },
    { key: 'heading', label: 'Heading', type: 'text', value: 'Myth vs Fact' },
    { key: 'mythLabel', label: 'Myth label', type: 'text', value: 'Myth' },
    { key: 'myth', label: 'Myth', type: 'textarea', value: 'Nobody reads email anymore.' },
    { key: 'factLabel', label: 'Fact label', type: 'text', value: 'Fact' },
    { key: 'fact', label: 'Fact', type: 'textarea', value: 'Email still returns more per dollar than *almost any other channel*, and welcome emails are among the most-opened messages people get.' },
    { key: 'source', label: 'Source', type: 'text', value: 'Source: add your study or report here' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="mf">
  <div class="mf-top">
    <span class="mf-topic" data-edit="topic"></span>
    <h2 class="mf-title" data-edit="heading"></h2>
  </div>
  <div class="mf-panels">
    <div class="mf-panel mf-myth" data-fit-box>
      <span class="mf-label"><i aria-hidden="true">&#10005;</i><span data-edit="mythLabel"></span></span>
      <p class="mf-text" data-edit="myth" data-fit></p>
    </div>
    <div class="mf-panel mf-fact" data-fit-box>
      <span class="mf-label"><i aria-hidden="true">&#10003;</i><span data-edit="factLabel"></span></span>
      <p class="mf-text" data-edit="fact" data-fit></p>
    </div>
  </div>
  <div class="mf-foot"><span data-edit="source"></span><span class="mf-handle" data-edit="handle"></span></div>
</div>`,
  css: `.mf{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*4);padding:var(--pt) var(--pad) var(--pb);background:var(--bg)}
.mf-top{display:flex;flex-direction:column;gap:calc(var(--u)*1.4)}
.mf-topic{align-self:flex-start;padding:calc(var(--u)*1) calc(var(--u)*2.8);border-radius:99px;background:color-mix(in srgb,var(--text) 8%,transparent);font-size:calc(var(--u)*2.8);font-weight:700;text-transform:uppercase;letter-spacing:.12em}
.mf-title{font-family:var(--font-heading);font-size:calc(var(--u)*9);line-height:1;font-weight:800;letter-spacing:-.025em}
.mf-panels{flex:1;display:grid;grid-template-rows:auto 1fr;gap:calc(var(--u)*3.4);min-height:0}
.mf-panel{display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*2);padding:calc(var(--u)*5);border-radius:calc(var(--u)*4);border-left:calc(var(--u)*1.6) solid}
.mf-myth{background:color-mix(in srgb,var(--myth) 9%,var(--bg));border-color:var(--myth)}
.mf-fact{background:color-mix(in srgb,var(--accent) 10%,var(--bg));border-color:var(--accent)}
.mf-label{display:flex;align-items:center;gap:calc(var(--u)*2);font-family:var(--font-heading);font-size:calc(var(--u)*3.6);font-weight:800;text-transform:uppercase;letter-spacing:.12em}
.mf-label i{flex:none;width:calc(var(--u)*6.4);height:calc(var(--u)*6.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:calc(var(--u)*3.4);color:#fff}
.mf-myth .mf-label{color:var(--myth)}.mf-myth .mf-label i{background:var(--myth)}
.mf-fact .mf-label{color:var(--accent)}.mf-fact .mf-label i{background:var(--accent)}
.mf-text{font-family:var(--font-heading);font-size:calc(var(--u)*5.6);line-height:1.22;font-weight:700;letter-spacing:-.01em}
.mf-myth .mf-text{text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--myth) 70%,transparent);text-decoration-thickness:.08em;opacity:.8}
.mf-foot{display:flex;justify-content:space-between;gap:calc(var(--u)*3);font-size:calc(var(--u)*2.8);opacity:.7}
.mf-handle{font-weight:700;flex:none}
.is-landscape .mf-panels{grid-template-rows:1fr;grid-template-columns:1fr 1.3fr}
.is-landscape .mf-text{font-size:calc(var(--u)*5)}
.is-story .mf-panels{grid-template-rows:1fr 1.4fr}`,
};
