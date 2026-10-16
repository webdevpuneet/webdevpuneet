export default {
  id: 'carousel-save',
  name: 'Carousel Final Slide',
  version: '1.0.0',
  category: 'carousel',
  tags: ['carousel', 'cta', 'follow', 'save', 'bright'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Carousel Final Slide Template — Free Follow & Save CTA Slide',
  seoDescription: 'Free carousel final slide template that asks people to like, comment, save and follow, with your logo and handle. Download all post sizes or copy the HTML code.',
  description: 'The closing slide of a carousel: "Found this useful?", four action chips (like, comment, save, share), a follow line, your handle and logo.',
  bestFor: ['Last slide of any carousel', 'Growing followers and saves', 'Ending tutorials with a call to action'],
  fonts: { heading: 'poppins', body: 'poppins' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fef08a' },
    { key: 'text', label: 'Text', value: '#1c1917' },
    { key: 'accent', label: 'Accent', value: '#9a3412' },
  ],
  fields: [
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Found this *useful?*' },
    { key: 'a1', label: 'Action 1', type: 'text', value: '♥ Like' },
    { key: 'a2', label: 'Action 2', type: 'text', value: '✎ Comment' },
    { key: 'a3', label: 'Action 3', type: 'text', value: '⚑ Save' },
    { key: 'a4', label: 'Action 4', type: 'text', value: '↗ Share' },
    { key: 'follow', label: 'Follow line', type: 'text', value: 'Follow for a new tip every day' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo or photo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="cs">
  <div class="cs-body" data-fit-box>
    <h2 class="cs-title" data-edit="title" data-fit></h2>
    <div class="cs-acts"><span data-edit="a1"></span><span data-edit="a2"></span><span data-edit="a3"></span><span data-edit="a4"></span></div>
  </div>
  <div class="cs-foot"><div class="cs-logo" data-image="logo" data-image-fit="contain"></div><div><p class="cs-follow" data-edit="follow"></p><span class="cs-handle" data-edit="handle"></span></div></div>
</div>`,
  css: `.cs{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) var(--pad) var(--pb);background:var(--bg)}
.cs-body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*6)}
.cs-title{font-family:var(--font-heading);font-size:calc(var(--u)*13);line-height:1;font-weight:800;letter-spacing:-.035em}
.cs-acts{display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--u)*2)}
.cs-acts span{font-size:calc(var(--u)*4);font-weight:700;padding:calc(var(--u)*3) calc(var(--u)*3.4);border-radius:calc(var(--u)*2.4);background:rgba(255,255,255,.6);border:calc(var(--u)*.35) solid var(--text)}
.cs-foot{display:flex;align-items:center;gap:calc(var(--u)*3);padding-top:calc(var(--u)*4);border-top:calc(var(--u)*.4) solid var(--text)}
.cs-logo{width:calc(var(--u)*11);height:calc(var(--u)*11);flex:none}
.cs-follow{font-size:calc(var(--u)*3.4);font-weight:600}
.cs-handle{font-size:calc(var(--u)*3.4);font-weight:800;color:var(--accent)}
.is-landscape .cs-acts{grid-template-columns:repeat(4,1fr)}`,
};
