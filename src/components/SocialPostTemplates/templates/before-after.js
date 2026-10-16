export default {
  id: 'before-after',
  name: 'Before & After',
  version: '1.0.0',
  category: 'social-proof',
  tags: ['before-after', 'comparison', 'photo', 'results', 'dark'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Before and After Post Template — Free Comparison Social Post',
  seoDescription: 'Free before and after post template with two photo panels, labels and a results headline. Upload both photos, download every post size or copy the HTML.',
  description: 'A dark comparison post with two photo panels labelled "Before" and "After" (stacked on tall posts, side by side on wide ones) and a results headline.',
  bestFor: ['Redesigns and website makeovers', 'Fitness, renovation and cleaning results', 'Photo editing and retouching'],
  fonts: { heading: 'inter', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#18181b' },
    { key: 'text', label: 'Text', value: '#fafafa' },
    { key: 'accent', label: 'Accent', value: '#22c55e' },
  ],
  fields: [
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Same content. *3× the signups.*' },
    { key: 'before', label: 'Before photo', type: 'image' },
    { key: 'after', label: 'After photo', type: 'image' },
    { key: 'labelBefore', label: 'Before label', type: 'text', value: 'Before' },
    { key: 'labelAfter', label: 'After label', type: 'text', value: 'After' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="ba">
  <div class="ba-head" data-fit-box><h2 class="ba-title" data-edit="title" data-fit></h2></div>
  <div class="ba-grid">
    <div class="ba-pane ba-b" data-image="before"><span data-edit="labelBefore"></span></div>
    <div class="ba-pane ba-a" data-image="after"><span data-edit="labelAfter"></span></div>
  </div>
  <span class="ba-handle" data-edit="handle"></span>
</div>`,
  css: `.ba{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*4);padding:var(--pt) var(--pad) var(--pb);background:var(--bg)}
.ba-head{flex:none;max-height:28%}
.ba-title{font-family:var(--font-heading);font-size:calc(var(--u)*7.4);line-height:1.08;font-weight:800;letter-spacing:-.025em}
.ba-grid{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--u)*2)}
.is-story .ba-grid,.is-portrait .ba-grid{grid-template-columns:1fr;grid-template-rows:1fr 1fr}
.ba-pane{position:relative;border-radius:calc(var(--u)*2.4)}
.ba-b:not(.has-img){filter:grayscale(1) brightness(.8)}
.ba-pane span{position:absolute;left:calc(var(--u)*2.4);top:calc(var(--u)*2.4);font-size:calc(var(--u)*3);font-weight:800;text-transform:uppercase;letter-spacing:.14em;padding:calc(var(--u)*1.2) calc(var(--u)*2.6);border-radius:99px;background:rgba(0,0,0,.6);color:#fff}
.ba-a span{background:var(--accent);color:#052e16}
.ba-handle{font-size:calc(var(--u)*3);font-weight:700;opacity:.8}`,
};
