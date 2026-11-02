export default {
  id: 'mistakes-to-avoid',
  name: 'Mistakes to Avoid',
  version: '1.0.0',
  category: 'how-to',
  tags: ['mistakes', 'dont', 'warning', 'tips', 'education', 'advice', 'dark'],
  created: '2026-11-02',
  updated: '2026-11-02',
  seoTitle: 'Mistakes to Avoid Post Template — Free Do & Don\'t Maker',
  seoDescription: 'Free mistakes-to-avoid post template with hazard-tape styling: up to four crossed-out mistakes, each with a "do this instead" fix. Edit online and export.',
  description: 'A warning-style post with a hazard-tape stripe: a headline, up to four mistake cards each showing the wrong way and a "do this instead" fix, and your handle.',
  bestFor: ['Common-mistakes and myths-in-your-field posts', 'Do and don\'t advice for beginners', 'Expert tips that show a better way'],
  fonts: { heading: 'montserrat', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#15110b' },
    { key: 'card', label: 'Card', value: '#241d12' },
    { key: 'text', label: 'Text', value: '#fff8e7' },
    { key: 'accent', label: 'Warning colour', value: '#facc15' },
    { key: 'good', label: 'Fix colour', value: '#4ade80' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Stop doing this' },
    { key: 'title', label: 'Headline', type: 'textarea', value: '3 mistakes that *quietly* kill your landing page' },
    { key: 'm1', label: 'Mistake 1', type: 'text', value: 'Five different buttons' },
    { key: 'f1', label: 'Fix 1', type: 'text', value: 'One clear action per page' },
    { key: 'm2', label: 'Mistake 2', type: 'text', value: 'A vague headline' },
    { key: 'f2', label: 'Fix 2', type: 'text', value: 'Say who it is for and the result' },
    { key: 'm3', label: 'Mistake 3', type: 'text', value: 'No proof anywhere' },
    { key: 'f3', label: 'Fix 3', type: 'text', value: 'Add a real customer quote' },
    { key: 'm4', label: 'Mistake 4 (optional)', type: 'text', value: '' },
    { key: 'f4', label: 'Fix 4', type: 'text', value: '' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="mt">
  <div class="mt-tape" aria-hidden="true" data-anim="scroll-bg"></div>
  <div class="mt-head">
    <span class="mt-label" data-edit="label"></span>
    <h2 class="mt-title" data-edit="title" data-fit></h2>
  </div>
  <div class="mt-list" data-fit-box>
    <div class="mt-card"><i aria-hidden="true" data-anim="stamp">&#10005;</i><div><p class="mt-bad" data-edit="m1"></p><p class="mt-fix" data-edit="f1"></p></div></div>
    <div class="mt-card"><i aria-hidden="true" data-anim="stamp">&#10005;</i><div><p class="mt-bad" data-edit="m2"></p><p class="mt-fix" data-edit="f2"></p></div></div>
    <div class="mt-card"><i aria-hidden="true" data-anim="stamp">&#10005;</i><div><p class="mt-bad" data-edit="m3"></p><p class="mt-fix" data-edit="f3"></p></div></div>
    <div class="mt-card"><i aria-hidden="true" data-anim="stamp">&#10005;</i><div><p class="mt-bad" data-edit="m4"></p><p class="mt-fix" data-edit="f4"></p></div></div>
  </div>
  <div class="mt-foot"><span class="mt-handle" data-edit="handle"></span></div>
</div>`,
  css: `.mt{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*4);padding:var(--pt) var(--pad) var(--pb);background:var(--bg)}
.mt-tape{position:absolute;left:0;right:0;top:0;height:calc(var(--u)*2.6);background:repeating-linear-gradient(-45deg,var(--accent) 0,var(--accent) calc(var(--u)*2.6),var(--bg) calc(var(--u)*2.6),var(--bg) calc(var(--u)*5.2))}
.mt-head{display:flex;flex-direction:column;gap:calc(var(--u)*2);margin-top:calc(var(--u)*2.4)}
.mt-label{align-self:flex-start;font-size:calc(var(--u)*2.8);font-weight:900;text-transform:uppercase;letter-spacing:.18em;background:var(--accent);color:#1a1405;padding:calc(var(--u)*1.1) calc(var(--u)*2.6);border-radius:calc(var(--u)*1);transform:rotate(-2deg)}
.mt-title{font-family:var(--font-heading);font-size:calc(var(--u)*8.6);line-height:1.06;font-weight:800;letter-spacing:-.025em}
.mt-list{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*2.8)}
.mt-card{display:flex;align-items:center;gap:calc(var(--u)*3.4);padding:calc(var(--u)*3) calc(var(--u)*3.6);border-radius:calc(var(--u)*3);background:var(--card);border-left:calc(var(--u)*1) solid #ef4444}
.mt-card:has(.mt-bad:empty){display:none}
.mt-card i{flex:none;width:calc(var(--u)*7);height:calc(var(--u)*7);border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:calc(var(--u)*3.4);font-weight:900;background:#ef4444;color:#fff}
.mt-card>div{display:flex;flex-direction:column;gap:calc(var(--u)*.9);min-width:0}
.mt-bad{font-size:calc(var(--u)*3.8);font-weight:800;line-height:1.15;text-decoration:line-through;text-decoration-thickness:calc(var(--u)*.4);text-decoration-color:#ef4444;opacity:.9}
.mt-fix{font-size:calc(var(--u)*3.2);font-weight:700;line-height:1.25;color:var(--good)}
.mt-fix:not(:empty)::before{content:'\\2192  ';font-weight:900}
.mt-foot{display:flex;justify-content:flex-end}
.mt-handle{font-size:calc(var(--u)*3.2);font-weight:800;color:var(--accent)}
.is-landscape .mt-title{font-size:calc(var(--u)*6.6)}
.is-landscape .mt-list{display:grid;grid-template-columns:1fr 1fr;align-content:center;gap:calc(var(--u)*2.6)}
.is-landscape .mt-bad{font-size:calc(var(--u)*3.2)}
.is-landscape .mt-fix{font-size:calc(var(--u)*2.8)}
.is-square .mt{gap:calc(var(--u)*3)}
.is-square .mt-title{font-size:calc(var(--u)*6.2)}
.is-square .mt-list{gap:calc(var(--u)*2.2)}
.is-square .mt-card{padding:calc(var(--u)*2.2) calc(var(--u)*3.2);gap:calc(var(--u)*3)}
.is-square .mt-card i{width:calc(var(--u)*6);height:calc(var(--u)*6);font-size:calc(var(--u)*3)}
.is-square .mt-bad{font-size:calc(var(--u)*3.3)}
.is-square .mt-fix{font-size:calc(var(--u)*2.8)}`,
};
