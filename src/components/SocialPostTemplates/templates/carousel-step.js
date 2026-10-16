export default {
  id: 'carousel-step',
  name: 'Carousel Step Slide',
  version: '1.0.0',
  category: 'carousel',
  tags: ['carousel', 'step', 'numbered', 'tutorial', 'light'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Carousel Step Slide Template — Free Numbered Tutorial Slide',
  seoDescription: 'Free numbered carousel slide template with a big outlined step number, title, explanation and progress dots. Build a tutorial carousel or copy the HTML.',
  description: 'A middle carousel slide with a large outlined step number, the step title, a short explanation and progress dots, so every slide in a series matches.',
  bestFor: ['Step-by-step tutorial carousels', 'Numbered list posts', 'Process and framework explainers'],
  fonts: { heading: 'poppins', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#faf5ff' },
    { key: 'text', label: 'Text', value: '#2e1065' },
    { key: 'accent', label: 'Accent', value: '#7c3aed' },
  ],
  fields: [
    { key: 'number', label: 'Step number', type: 'text', value: '02' },
    { key: 'title', label: 'Step title', type: 'textarea', value: 'Use *clamp()* for fluid type' },
    { key: 'body', label: 'Explanation', type: 'textarea', value: 'font-size: clamp(1rem, 2.5vw, 2rem) scales smoothly between a minimum and maximum, with no media queries.' },
    { key: 'progress', label: 'Progress', type: 'text', value: '2 / 7' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="st">
  <span class="st-num" data-edit="number"></span>
  <div class="st-body" data-fit-box>
    <h2 class="st-title" data-edit="title" data-fit></h2>
    <p class="st-text" data-edit="body" data-fit></p>
  </div>
  <div class="st-foot"><span data-edit="handle"></span><span class="st-prog" data-edit="progress"></span></div>
</div>`,
  css: `.st{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) var(--pad) var(--pb);background:var(--bg);border-left:calc(var(--u)*2) solid var(--accent)}
.st-num{font-family:var(--font-heading);font-size:calc(var(--u)*30);font-weight:900;line-height:.9;color:transparent;-webkit-text-stroke:calc(var(--u)*.5) var(--accent);letter-spacing:-.04em}
.st-body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*4)}
.st-title{font-family:var(--font-heading);font-size:calc(var(--u)*8.6);line-height:1.08;font-weight:800;letter-spacing:-.025em}
.st-text{font-size:calc(var(--u)*4);line-height:1.55;opacity:.82}
.st-foot{display:flex;justify-content:space-between;align-items:center;font-size:calc(var(--u)*3.1);font-weight:700}
.st-prog{color:var(--accent)}
.is-landscape .st-num{font-size:calc(var(--u)*22)}`,
};
