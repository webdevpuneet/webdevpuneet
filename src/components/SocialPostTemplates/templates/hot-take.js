export default {
  id: 'hot-take',
  name: 'Hot Take',
  version: '1.0.0',
  category: 'engagement',
  tags: ['hot-take', 'opinion', 'debate', 'controversial', 'engagement', 'bold', 'gradient'],
  created: '2026-11-02',
  updated: '2026-11-02',
  seoTitle: 'Hot Take Post Template — Free Opinion Post for Instagram',
  seoDescription: 'Free hot take post template: a tilted sticker, one huge opinion on a fiery gradient and agree or disagree chips that start the debate. Export every size.',
  description: 'A fiery opinion card: a tilted "hot take" sticker, one huge uppercase statement on a red-to-orange gradient, a short follow-up question with agree and disagree chips and your handle.',
  bestFor: ['Opinion posts that start a debate', 'Industry predictions and unpopular opinions', 'Founder and creator personal-brand content'],
  fonts: { heading: 'bebas', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Gradient start', value: '#ff5a1f' },
    { key: 'bg2', label: 'Gradient end', value: '#be123c' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Highlight', value: '#fde047' },
  ],
  fields: [
    { key: 'label', label: 'Sticker', type: 'text', value: 'Hot take' },
    { key: 'title', label: 'Statement', type: 'textarea', value: 'Most landing pages need *fewer* sections, not more' },
    { key: 'question', label: 'Question', type: 'text', value: 'Agree or disagree?' },
    { key: 'agree', label: 'Chip 1', type: 'text', value: 'Agree' },
    { key: 'disagree', label: 'Chip 2', type: 'text', value: 'Disagree' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="ht">
  <div class="ht-glow" aria-hidden="true"></div>
  <span class="ht-sticker" data-edit="label"></span>
  <div class="ht-body" data-fit-box>
    <h2 class="ht-title" data-edit="title" data-fit></h2>
  </div>
  <div class="ht-foot">
    <div class="ht-ask"><span class="ht-q" data-edit="question"></span><span class="ht-chips"><b data-edit="agree"></b><b data-edit="disagree"></b></span></div>
    <span class="ht-handle" data-edit="handle"></span>
  </div>
</div>`,
  css: `.ht{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*4);padding:var(--pt) var(--pad) var(--pb);background:linear-gradient(155deg,var(--bg) 0%,var(--bg2) 100%);overflow:hidden}
.ht-glow{position:absolute;left:-20%;right:-20%;bottom:-28%;height:70%;background:radial-gradient(ellipse at 50% 100%,color-mix(in srgb,var(--accent) 65%,transparent),transparent 65%);opacity:.7}
.ht>*:not(.ht-glow){position:relative}
.ht-sticker{align-self:flex-start;transform:rotate(-4deg);background:#111;color:var(--accent);font-family:var(--font-heading);font-size:calc(var(--u)*6.4);letter-spacing:.08em;text-transform:uppercase;padding:calc(var(--u)*1.2) calc(var(--u)*4);border-radius:calc(var(--u)*1.6);box-shadow:calc(var(--u)*.8) calc(var(--u)*.8) 0 rgba(0,0,0,.35)}
.ht-sticker::before{content:'\\1F525  '}
.ht-body{flex:1;display:flex;flex-direction:column;justify-content:center}
.ht-title{font-family:var(--font-heading);font-size:calc(var(--u)*17);line-height:.94;font-weight:400;letter-spacing:.005em;text-transform:uppercase;text-shadow:0 calc(var(--u)*.8) calc(var(--u)*3) rgba(0,0,0,.25)}
.ht-title .hl{color:var(--accent)}
.ht-foot{display:flex;justify-content:space-between;align-items:flex-end;gap:calc(var(--u)*3)}
.ht-ask{display:flex;flex-direction:column;gap:calc(var(--u)*1.8)}
.ht-q{font-size:calc(var(--u)*3.8);font-weight:800}
.ht-chips{display:flex;gap:calc(var(--u)*2)}
.ht-chips b{font-size:calc(var(--u)*3);font-weight:800;padding:calc(var(--u)*1.2) calc(var(--u)*3.4);border-radius:99px;background:rgba(0,0,0,.24);border:calc(var(--u)*.35) solid rgba(255,255,255,.75)}
.ht-chips b:empty{display:none}
.ht-handle{flex:none;font-size:calc(var(--u)*3.2);font-weight:800}
.is-landscape .ht-title{font-size:calc(var(--u)*13)}`,
};
