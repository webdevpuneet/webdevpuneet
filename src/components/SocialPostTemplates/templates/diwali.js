export default {
  id: 'diwali',
  name: 'Diwali',
  version: '1.0.0',
  category: 'holidays',
  tags: ['diwali', 'deepavali', 'festival-of-lights', 'india', 'greeting', 'offer', 'diya', 'gold'],
  created: '2026-11-02',
  updated: '2026-11-02',
  seoTitle: 'Diwali Post Template — Free Festival of Lights Greeting',
  seoDescription: 'Free Diwali post template: a glowing diya row, a gold rangoli ring, "Happy Diwali" in English and Hindi, and an optional festive offer chip. Edit and export.',
  description: 'A Diwali greeting on a night-sky gradient: a gold rangoli ring behind the headline, a row of glowing diyas along the bottom, "Happy Diwali" with an editable Hindi line, a warm message, an optional festive offer chip and your handle.',
  bestFor: ['Diwali greetings from shops, brands and offices', 'Festive sale and gift offers around Dhanteras and Lakshmi Puja', 'WhatsApp Status and Instagram Stories in the Story size'],
  fonts: { heading: 'playfair', body: 'g:Hind|467|s' },
  vars: [
    { key: 'bg', label: 'Sky (top)', value: '#1a0b3b' },
    { key: 'bg2', label: 'Sky (bottom)', value: '#6d1b43' },
    { key: 'text', label: 'Text', value: '#fff6dc' },
    { key: 'accent', label: 'Gold', value: '#fbbf24' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Festival of lights' },
    { key: 'hindi', label: 'Hindi greeting (optional)', type: 'text', value: 'शुभ दीपावली' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Happy *Diwali*' },
    { key: 'message', label: 'Message', type: 'textarea', value: 'May the lamps you light bring joy, health and prosperity to your home and everyone you love.' },
    { key: 'offer', label: 'Offer (optional)', type: 'text', value: 'Festive offer · Up to 30% off' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="dw">
  <div class="dw-ring" aria-hidden="true"></div>
  <span class="dw-label" data-edit="label"></span>
  <div class="dw-body" data-fit-box>
    <p class="dw-hindi" data-edit="hindi"></p>
    <h2 class="dw-title" data-edit="title" data-fit></h2>
    <p class="dw-message" data-edit="message" data-fit></p>
    <span class="dw-offer" data-edit="offer"></span>
  </div>
  <div class="dw-lamps" aria-hidden="true"><i><b data-anim="flicker"></b></i><i><b data-anim="flicker"></b></i><i><b data-anim="flicker"></b></i><i><b data-anim="flicker"></b></i><i><b data-anim="flicker"></b></i></div>
  <span class="dw-handle" data-edit="handle"></span>
</div>`,
  css: `.dw{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:calc(var(--u)*3.4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(ellipse at 50% 100%,color-mix(in srgb,var(--accent) 38%,transparent),transparent 58%),linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%);overflow:hidden}
.dw>*:not(.dw-ring){position:relative}
.dw-ring{position:absolute;left:50%;top:41%;width:calc(var(--u)*108);height:calc(var(--u)*108);transform:translate(-50%,-50%);border-radius:50%;opacity:.5;background:repeating-conic-gradient(from 0deg,color-mix(in srgb,var(--accent) 34%,transparent) 0 4.5deg,transparent 4.5deg 9deg);-webkit-mask:radial-gradient(circle,transparent 0 31%,#000 31.5% 34.5%,transparent 35% 39%,#000 39.5% 40.4%,transparent 41% 100%);mask:radial-gradient(circle,transparent 0 31%,#000 31.5% 34.5%,transparent 35% 39%,#000 39.5% 40.4%,transparent 41% 100%)}
.dw-label{font-size:calc(var(--u)*2.9);font-weight:600;text-transform:uppercase;letter-spacing:.34em;color:var(--accent);padding-left:.34em}
.dw-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2.8)}
.dw-hindi{font-size:calc(var(--u)*6.4);font-weight:700;line-height:1.2;color:var(--accent)}
.dw-title{font-family:var(--font-heading);font-size:calc(var(--u)*15);line-height:1;font-weight:700;letter-spacing:-.015em;text-shadow:0 calc(var(--u)*.8) calc(var(--u)*3.6) rgba(0,0,0,.35)}
.dw-title .hl{color:var(--accent)}
.dw-message{font-size:calc(var(--u)*3.6);line-height:1.5;opacity:.92;max-width:84%}
.dw-offer{font-size:calc(var(--u)*3.2);font-weight:700;color:#2a0f00;background:linear-gradient(90deg,#fbbf24,#fcd34d);padding:calc(var(--u)*1.9) calc(var(--u)*4.4);border-radius:99px;box-shadow:0 0 calc(var(--u)*4) color-mix(in srgb,var(--accent) 55%,transparent)}
.dw-offer:empty{display:none}
.dw-lamps{display:flex;align-items:flex-end;justify-content:center;gap:calc(var(--u)*5.6);height:calc(var(--u)*11)}
.dw-lamps i{position:relative;display:block;width:calc(var(--u)*9);height:calc(var(--u)*4.2);border-radius:0 0 calc(var(--u)*9) calc(var(--u)*9)/0 0 calc(var(--u)*4.2) calc(var(--u)*4.2);background:linear-gradient(180deg,#f59e0b,#b45309)}
.dw-lamps b{position:absolute;left:calc(50% - var(--u)*1.4);bottom:calc(var(--u)*3.6);width:calc(var(--u)*2.8);height:calc(var(--u)*5.6);transform-origin:50% 100%;border-radius:50% 50% 50% 50%/62% 62% 38% 38%;background:radial-gradient(ellipse at 50% 72%,#fff7d6 0 24%,#fcd34d 46%,#f97316 100%);box-shadow:0 0 calc(var(--u)*3.4) calc(var(--u)*1.2) rgba(251,191,36,.55)}
.dw-lamps i:nth-child(odd){transform:translateY(calc(var(--u)*1.4))}
.dw-lamps i:nth-child(3){transform:scale(1.18)}
.dw-handle{font-size:calc(var(--u)*3.2);font-weight:700;color:var(--accent);letter-spacing:.06em}
.is-square .dw{gap:calc(var(--u)*2.4)}
.is-square .dw-title{font-size:calc(var(--u)*12.4)}
.is-square .dw-hindi{font-size:calc(var(--u)*5.4)}
.is-square .dw-message{font-size:calc(var(--u)*3.2)}
.is-square .dw-lamps{height:calc(var(--u)*9)}
.is-landscape .dw-title{font-size:calc(var(--u)*11)}
.is-landscape .dw-hindi{font-size:calc(var(--u)*5)}
.is-landscape .dw-message{max-width:64%;font-size:calc(var(--u)*3)}
.is-landscape .dw-ring{top:46%}
.is-landscape .dw-lamps{height:calc(var(--u)*8)}`,
};
