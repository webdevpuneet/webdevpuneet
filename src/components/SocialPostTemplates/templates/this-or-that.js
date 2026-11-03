export default {
  id: 'this-or-that',
  name: 'This or That',
  version: '1.0.0',
  category: 'engagement',
  tags: ['this-or-that', 'poll', 'vote', 'question', 'engagement', 'split', 'colourful'],
  created: '2026-11-02',
  updated: '2026-11-02',
  seoTitle: 'This or That Post Template — Free Instagram Poll Post',
  seoDescription: 'Free this-or-that post template with a bold diagonal split: your question, two big options and a "vote in the comments" line. Edit online, export every size.',
  description: 'A diagonal split-screen vote: a question chip, two big options in contrasting colours with A and B badges, a circular "OR" in the middle, a vote prompt and your handle.',
  bestFor: ['Comment-driving this-or-that questions', 'Audience polls and product choices', 'Fun community and team debates'],
  fonts: { heading: 'poppins', body: 'inter' },
  vars: [
    { key: 'colorA', label: 'Option A colour', value: '#4f46e5' },
    { key: 'colorB', label: 'Option B colour', value: '#e11d48' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'OR badge', value: '#facc15' },
    { key: 'btn', label: 'Button', value: '#000000' },
    { key: 'btnText', label: 'Button text', value: '#ffffff' },
  ],
  fields: [
    { key: 'question', label: 'Question', type: 'text', value: 'Your coding setup?' },
    { key: 'optionA', label: 'Option A', type: 'textarea', value: 'Dark mode' },
    { key: 'optionB', label: 'Option B', type: 'textarea', value: 'Light mode' },
    { key: 'cta', label: 'Vote prompt', type: 'text', value: 'Comment A or B' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="tt">
  <div class="tt-top" aria-hidden="true"></div>
  <span class="tt-q" data-edit="question"></span>
  <div class="tt-opt tt-a" data-anim="slide-t" data-at="0.3"><b aria-hidden="true" data-anim="pop" data-at="0.9">A</b><h2 data-edit="optionA" data-fit></h2></div>
  <div class="tt-or" aria-hidden="true" data-anim="pop" data-at="1.1">OR</div>
  <div class="tt-opt tt-b" data-anim="slide-b" data-at="0.3"><b aria-hidden="true" data-anim="pop" data-at="1.2">B</b><h2 data-edit="optionB" data-fit></h2></div>
  <div class="tt-foot"><span class="tt-cta" data-edit="cta"></span><span class="tt-handle" data-edit="handle"></span></div>
</div>`,
  css: `.tt{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) var(--pad) var(--pb);background:var(--colorB);color:var(--text)}
.tt-top{position:absolute;inset:0;background:var(--colorA);clip-path:polygon(0 0,100% 0,100% 40%,0 60%)}
.tt>*:not(.tt-top){position:relative}
.tt-q{align-self:center;font-size:calc(var(--u)*3.2);font-weight:800;text-transform:uppercase;letter-spacing:.14em;background:rgba(0,0,0,.28);padding:calc(var(--u)*1.4) calc(var(--u)*3.4);border-radius:99px}
.tt-opt{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2);text-align:center;min-height:0}
.tt-a{padding-bottom:calc(var(--u)*5)}
.tt-b{padding-top:calc(var(--u)*5)}
.tt-opt b{width:calc(var(--u)*7.4);height:calc(var(--u)*7.4);border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff;font-family:var(--font-heading);font-size:calc(var(--u)*3.8);font-weight:800}
.tt-a b{color:var(--colorA)}
.tt-b b{color:var(--colorB)}
.tt-opt h2{font-family:var(--font-heading);font-size:calc(var(--u)*13);line-height:1;font-weight:800;letter-spacing:-.03em;text-shadow:0 calc(var(--u)*.6) calc(var(--u)*2) rgba(0,0,0,.22)}
.tt-or{position:absolute!important;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-8deg);width:calc(var(--u)*12);height:calc(var(--u)*12);border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--accent);color:#1a1405;font-family:var(--font-heading);font-size:calc(var(--u)*4.6);font-weight:900;box-shadow:0 calc(var(--u)*1) calc(var(--u)*4) rgba(0,0,0,.35);z-index:2}
.tt-foot{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3);font-size:calc(var(--u)*3.2);font-weight:800}
.tt-cta{color:var(--btnText);background:color-mix(in srgb,var(--btn) 28%,transparent);padding:calc(var(--u)*1.2) calc(var(--u)*3);border-radius:99px}
.tt-handle{flex:none}
.is-landscape .tt-top{clip-path:polygon(0 0,52% 0,48% 100%,0 100%)}
.is-landscape .tt{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr auto;column-gap:calc(var(--u)*4)}
.is-landscape .tt-q{grid-column:1/3;grid-row:1}
.is-landscape .tt-a{grid-column:1;grid-row:2;padding:0}
.is-landscape .tt-b{grid-column:2;grid-row:2;padding:0}
.is-landscape .tt-foot{grid-column:1/3;grid-row:3}
.is-landscape .tt-opt h2{font-size:calc(var(--u)*9)}
.is-landscape .tt-q{justify-self:center}`,
};
