export default {
  id: 'carousel-cover',
  name: 'Carousel Cover Slide',
  version: '1.0.0',
  category: 'carousel',
  tags: ['carousel', 'cover', 'swipe', 'gradient', 'bold'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Carousel Cover Slide Template — Free Instagram & LinkedIn',
  seoDescription: 'Free carousel cover slide template with a bold hook headline, slide counter and swipe arrow for Instagram and LinkedIn. Download PNG sizes or copy HTML.',
  description: 'The first slide of a carousel: a bold hook headline on a vivid gradient, a slide counter, your handle and a "Swipe" arrow that invites the next tap.',
  bestFor: ['Instagram and LinkedIn carousel covers', 'Listicles ("7 tools I use daily")', 'Mini-guides and tutorials'],
  fonts: { heading: 'poppins', body: 'poppins' },
  vars: [
    { key: 'bg', label: 'Gradient start', value: '#312e81' },
    { key: 'bg2', label: 'Gradient end', value: '#7c3aed' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Accent', value: '#fde047' },
  ],
  fields: [
    { key: 'kicker', label: 'Kicker', type: 'text', value: 'Save this ✨' },
    { key: 'title', label: 'Hook', type: 'textarea', value: '7 CSS tricks I wish I knew *sooner*' },
    { key: 'count', label: 'Slide counter', type: 'text', value: '1/7' },
    { key: 'swipe', label: 'Swipe text', type: 'text', value: 'Swipe →' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="cc">
  <div class="cc-top"><span class="cc-kicker" data-edit="kicker"></span><span class="cc-count" data-edit="count"></span></div>
  <div class="cc-body" data-fit-box><h2 class="cc-title" data-edit="title" data-fit></h2></div>
  <div class="cc-foot"><span data-edit="handle"></span><span class="cc-swipe" data-edit="swipe"></span></div>
</div>`,
  css: `.cc{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) var(--pad) var(--pb);background:linear-gradient(145deg,var(--bg),var(--bg2))}
.cc::after{content:'';position:absolute;right:calc(var(--u)*-18);top:calc(var(--u)*-18);width:calc(var(--u)*60);height:calc(var(--u)*60);border-radius:50%;background:color-mix(in srgb,var(--accent) 22%,transparent)}
.cc-top,.cc-body,.cc-foot{position:relative;z-index:1}
.cc-top{display:flex;justify-content:space-between;align-items:center;font-size:calc(var(--u)*3.2);font-weight:700}
.cc-count{padding:calc(var(--u)*1) calc(var(--u)*2.6);border-radius:99px;background:rgba(255,255,255,.16)}
.cc-body{flex:1;display:flex;align-items:center}
.cc-title{font-family:var(--font-heading);font-size:calc(var(--u)*12);line-height:1.02;font-weight:800;letter-spacing:-.035em}
.cc-foot{display:flex;justify-content:space-between;align-items:center;font-size:calc(var(--u)*3.2);font-weight:700}
.cc-swipe{color:var(--bg);background:var(--accent);padding:calc(var(--u)*1.8) calc(var(--u)*4);border-radius:99px;font-weight:800}`,
};
