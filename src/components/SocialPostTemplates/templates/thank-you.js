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
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="ty">
  <div class="ty-dots" aria-hidden="true"><i data-anim="drift"></i><i data-anim="drift"></i><i data-anim="drift"></i><i data-anim="drift"></i><i data-anim="drift"></i><i data-anim="drift"></i><i data-anim="drift"></i><i data-anim="drift"></i></div>
  <span class="ty-label" data-edit="label"></span>
  <div class="ty-body" data-fit-box>
    <h2 class="ty-title" data-edit="title" data-fit></h2>
    <p class="ty-message" data-edit="message" data-fit></p>
  </div>
  <div class="ty-foot"><span class="ty-sign" data-edit="signoff"></span><span class="spt-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="ty-handle" data-edit="handle"></span></span></div>
</div>`,
  css: `.ty{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*4);padding:var(--pt) var(--pad) var(--pb);background:linear-gradient(160deg,var(--bg) 0%,var(--bg2) 100%);overflow:hidden}
.ty-dots{position:absolute;inset:0;opacity:.75}
.ty-dots i{position:absolute;display:block;border-radius:50%}
.ty-dots i:nth-child(1){left:12%;top:18%;width:calc(var(--u)*2.2);height:calc(var(--u)*2.2);margin:calc(var(--u)*-1.1);background:var(--accent)}
.ty-dots i:nth-child(2){left:86%;top:10%;width:calc(var(--u)*2.8);height:calc(var(--u)*2.8);margin:calc(var(--u)*-1.4);background:#f59e0b}
.ty-dots i:nth-child(3){left:63%;top:11%;width:calc(var(--u)*1.8);height:calc(var(--u)*1.8);margin:calc(var(--u)*-0.9);background:#ec4899}
.ty-dots i:nth-child(4){left:92%;top:46%;width:calc(var(--u)*2);height:calc(var(--u)*2);margin:calc(var(--u)*-1);background:var(--accent)}
.ty-dots i:nth-child(5){left:95%;top:72%;width:calc(var(--u)*2.4);height:calc(var(--u)*2.4);margin:calc(var(--u)*-1.2);background:#f59e0b}
.ty-dots i:nth-child(6){left:24%;top:84%;width:calc(var(--u)*2.6);height:calc(var(--u)*2.6);margin:calc(var(--u)*-1.3);background:#ec4899}
.ty-dots i:nth-child(7){left:80%;top:88%;width:calc(var(--u)*3.2);height:calc(var(--u)*3.2);margin:calc(var(--u)*-1.6);background:var(--accent)}
.ty-dots i:nth-child(8){left:54%;top:8%;width:calc(var(--u)*1.6);height:calc(var(--u)*1.6);margin:calc(var(--u)*-0.8);background:#f59e0b}
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
