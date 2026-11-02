export default {
  id: 'valentines-day',
  name: 'Valentine\'s Day',
  version: '1.0.0',
  category: 'holidays',
  tags: ['valentines-day', 'love', 'romantic', 'offer', 'february', 'script', 'rose'],
  created: '2026-11-02',
  updated: '2026-11-02',
  seoTitle: 'Valentine\'s Day Post Template — Free Instagram & Offer',
  seoDescription: 'Free Valentine\'s Day post template: a deep rose gradient, a flowing script headline, a loving message and an optional offer chip. Edit online, export any size.',
  description: 'A romantic Valentine\'s Day card on a deep rose gradient with floating hearts: a "with love" label, a flowing script headline, a short message, an optional offer chip and your handle.',
  bestFor: ['Valentine\'s Day greetings from a brand', 'Date-night and gift offers for 14 February', 'Florists, restaurants, salons and jewellery shops'],
  fonts: { heading: 'g:Great Vibes|4|h', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Gradient start', value: '#4c0519' },
    { key: 'bg2', label: 'Gradient end', value: '#be123c' },
    { key: 'text', label: 'Text', value: '#fff1f2' },
    { key: 'accent', label: 'Accent', value: '#fda4af' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'With love' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Happy *Valentine\'s* Day' },
    { key: 'message', label: 'Message', type: 'textarea', value: 'To everyone who makes ordinary days feel a little more special. Thank you for being part of ours.' },
    { key: 'offer', label: 'Offer (optional)', type: 'text', value: 'Dinner for two · 20% off on 14 Feb' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="vd">
  <div class="vd-hearts" aria-hidden="true"><i data-anim="float">&#9829;</i><i data-anim="float">&#9829;</i><i data-anim="float">&#9829;</i><i data-anim="float">&#9829;</i><i data-anim="float">&#9829;</i></div>
  <span class="vd-label" data-edit="label"></span>
  <div class="vd-body" data-fit-box>
    <h2 class="vd-title" data-edit="title" data-fit></h2>
    <p class="vd-message" data-edit="message" data-fit></p>
    <span class="vd-offer" data-edit="offer" data-anim="pulse"></span>
  </div>
  <span class="vd-handle" data-edit="handle"></span>
</div>`,
  css: `.vd{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:calc(var(--u)*4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 50% 0%,color-mix(in srgb,var(--accent) 30%,transparent),transparent 55%),linear-gradient(165deg,var(--bg) 0%,var(--bg2) 100%);overflow:hidden}
.vd-hearts i{position:absolute;font-style:normal;color:var(--accent);opacity:.2}
.vd-hearts i:nth-child(1){left:6%;top:9%;font-size:calc(var(--u)*14);rotate:-14deg}
.vd-hearts i:nth-child(2){right:7%;top:20%;font-size:calc(var(--u)*8);rotate:12deg;opacity:.3}
.vd-hearts i:nth-child(3){left:10%;bottom:20%;font-size:calc(var(--u)*9);rotate:10deg;opacity:.28}
.vd-hearts i:nth-child(4){right:6%;bottom:9%;font-size:calc(var(--u)*17);rotate:-10deg}
.vd-hearts i:nth-child(5){left:46%;top:3%;font-size:calc(var(--u)*5);opacity:.35}
.vd>*:not(.vd-hearts){position:relative}
.vd-label{font-size:calc(var(--u)*3);font-weight:700;text-transform:uppercase;letter-spacing:.38em;color:var(--accent);padding-left:.38em}
.vd-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*4.4)}
.vd-title{font-family:var(--font-heading);font-size:calc(var(--u)*17);line-height:1;font-weight:400;text-shadow:0 calc(var(--u)*.8) calc(var(--u)*3.4) rgba(0,0,0,.28)}
.vd-title .hl{color:var(--accent)}
.vd-message{font-size:calc(var(--u)*3.8);line-height:1.5;opacity:.9;max-width:86%}
.vd-offer{font-size:calc(var(--u)*3.3);font-weight:800;color:#4c0519;background:var(--accent);padding:calc(var(--u)*2) calc(var(--u)*4.4);border-radius:99px}
.vd-offer:empty{display:none}
.vd-handle{font-size:calc(var(--u)*3.2);font-weight:800;color:var(--accent);letter-spacing:.06em}
.is-landscape .vd-title{font-size:calc(var(--u)*13)}
.is-landscape .vd-message{max-width:64%}`,
};
