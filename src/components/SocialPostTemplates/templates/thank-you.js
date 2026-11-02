export default {
  id: 'thank-you',
  name: 'Thank You',
  version: '1.0.0',
  category: 'announcements',
  tags: ['thank-you', 'gratitude', 'customers', 'milestone', 'appreciation', 'warm', 'confetti'],
  created: '2026-11-02',
  updated: '2026-11-02',
  seoTitle: 'Thank You Post Template — Free Customer Appreciation',
  seoDescription: 'Free thank you post template for customers and followers: a confetti background, a huge headline, a heartfelt message and a sign-off. Edit online and export.',
  description: 'A warm thank-you card with a confetti background: a "from all of us" label, a huge headline, a heartfelt message, a sign-off and your handle.',
  bestFor: ['Thanking customers and followers after a milestone', 'Customer appreciation and end-of-year posts', 'Small-business gratitude after a launch or sale'],
  fonts: { heading: 'poppins', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fff4e6' },
    { key: 'bg2', label: 'Gradient end', value: '#ffd9b3' },
    { key: 'text', label: 'Text', value: '#3b1d0e' },
    { key: 'accent', label: 'Accent', value: '#e0501c' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'From all of us' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Thank you, *10,000* times over' },
    { key: 'message', label: 'Message', type: 'textarea', value: 'A year ago this was a one-person project. Today it is a community, and every order, review and kind message got us here.' },
    { key: 'signoff', label: 'Sign-off', type: 'text', value: 'With love, the Acme team' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="ty">
  <div class="ty-dots" aria-hidden="true"></div>
  <span class="ty-label" data-edit="label"></span>
  <div class="ty-body" data-fit-box>
    <h2 class="ty-title" data-edit="title" data-fit></h2>
    <p class="ty-message" data-edit="message" data-fit></p>
  </div>
  <div class="ty-foot"><span class="ty-sign" data-edit="signoff"></span><span class="ty-handle" data-edit="handle"></span></div>
</div>`,
  css: `.ty{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*4);padding:var(--pt) var(--pad) var(--pb);background:linear-gradient(160deg,var(--bg) 0%,var(--bg2) 100%);overflow:hidden}
.ty-dots{position:absolute;inset:0;background-image:radial-gradient(circle at 12% 18%,var(--accent) 0 calc(var(--u)*1.1),transparent calc(var(--u)*1.2)),radial-gradient(circle at 86% 10%,#f59e0b 0 calc(var(--u)*1.4),transparent calc(var(--u)*1.5)),radial-gradient(circle at 63% 11%,#ec4899 0 calc(var(--u)*.9),transparent calc(var(--u)*1)),radial-gradient(circle at 92% 46%,var(--accent) 0 calc(var(--u)*1),transparent calc(var(--u)*1.1)),radial-gradient(circle at 95% 72%,#f59e0b 0 calc(var(--u)*1.2),transparent calc(var(--u)*1.3)),radial-gradient(circle at 24% 84%,#ec4899 0 calc(var(--u)*1.3),transparent calc(var(--u)*1.4)),radial-gradient(circle at 80% 88%,var(--accent) 0 calc(var(--u)*1.6),transparent calc(var(--u)*1.7)),radial-gradient(circle at 54% 8%,#f59e0b 0 calc(var(--u)*.8),transparent calc(var(--u)*.9));opacity:.75}
.ty>*:not(.ty-dots){position:relative}
.ty-label{align-self:flex-start;font-size:calc(var(--u)*3);font-weight:800;text-transform:uppercase;letter-spacing:.2em;color:var(--accent);background:color-mix(in srgb,var(--accent) 13%,#fff);padding:calc(var(--u)*1.3) calc(var(--u)*3.4);border-radius:99px}
.ty-body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*4.4)}
.ty-title{font-family:var(--font-heading);font-size:calc(var(--u)*13);line-height:1;font-weight:800;letter-spacing:-.035em}
.ty-title .hl{color:var(--accent)}
.ty-message{font-size:calc(var(--u)*3.9);line-height:1.5;opacity:.85;max-width:92%}
.ty-foot{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3)}
.ty-sign{font-family:var(--font-heading);font-size:calc(var(--u)*3.6);font-weight:700;font-style:italic}
.ty-handle{flex:none;font-size:calc(var(--u)*3.2);font-weight:800;color:var(--accent)}
.is-landscape .ty-title{font-size:calc(var(--u)*10)}
.is-landscape .ty-message{max-width:70%}`,
};
