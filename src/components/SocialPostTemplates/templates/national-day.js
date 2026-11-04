// The flag is one piece of SVG cloth (flag-cloth.js): the stripes bend with a ripple that runs from the pole to the tip,
// shaded by the wave (data-anim="flag" redraws it in the live preview and the video). The colours come from the settings.
import { flagMarkup } from '../flag-cloth.js';

export default {
  id: 'national-day',
  name: 'National Day',
  version: '1.0.0',
  category: 'holidays',
  tags: ['independence-day', 'republic-day', 'national-day', 'flag', 'patriotic', 'celebration', 'fireworks', 'any-country'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'National Day Post Template — Free Waving Flag, Any Country',
  seoDescription: 'Free independence and national day post template: a waving three-stripe flag in your country\'s colours, an optional emblem, fireworks and a warm greeting.',
  description: 'A national day or independence day greeting for any country: a three-stripe flag in your country\'s colours that waves from a pole with a gold finial, an optional wheel emblem (or your own uploaded emblem), fireworks in the flag colours, the occasion, a headline, a message, your handle and logo.',
  bestFor: ['Independence and republic days (India, Germany, Hungary, Bulgaria…)', 'National days for any country with a striped flag', 'Brand greetings and national-day sales'],
  fonts: { heading: 'g:Fraunces|79|e', body: 'dmsans' },
  vars: [
    { key: 'stripe1', label: 'Flag stripe 1 (top)', value: '#ff9933' },
    { key: 'stripe2', label: 'Flag stripe 2 (middle)', value: '#ffffff' },
    { key: 'stripe3', label: 'Flag stripe 3 (bottom)', value: '#138808' },
    { key: 'emblem', label: 'Wheel emblem (set it to stripe 2 to hide it)', value: '#000080' },
    { key: 'bg', label: 'Sky', value: '#0d1b3d' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Highlight', value: '#ffb347' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Republic Day · 26 January' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Happy *Republic Day*' },
    { key: 'message', label: 'Message', type: 'textarea', value: 'Proud of where we come from, and excited for everything we will build together.' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
    { key: 'emblemImg', label: 'Flag emblem image (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="nd">
  <div class="nd-fx" aria-hidden="true"><i data-anim="burst"></i><i data-anim="burst"></i><i data-anim="burst"></i><i data-anim="burst"></i></div>
  <span class="nd-label" data-edit="label"></span>
  <div class="nd-flagwrap" aria-hidden="true">
    <div class="nd-pole"><b></b></div>
    <div class="nd-flag" data-anim="flag">${flagMarkup()}<div class="nd-emblem" data-image="emblemImg" data-image-fit="contain"></div></div>
  </div>
  <div class="nd-body" data-fit-box>
    <h2 class="nd-title" data-edit="title" data-fit></h2>
    <p class="nd-message" data-edit="message" data-fit></p>
  </div>
  <div class="nd-foot"><div class="nd-logo" data-image="logo" data-image-fit="contain"></div><span class="nd-handle" data-edit="handle"></span></div>
</div>`,
  css: `.nd{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:calc(var(--u)*3.4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(ellipse at 50% 36%,color-mix(in srgb,var(--accent) 18%,transparent),transparent 58%),linear-gradient(180deg,var(--bg) 0%,color-mix(in srgb,var(--bg) 70%,#2a3c74) 100%);overflow:hidden}
.nd>*:not(.nd-fx){position:relative}
.nd-fx i{position:absolute;width:calc(var(--u)*24);height:calc(var(--u)*24);border-radius:50%;-webkit-mask:radial-gradient(circle,transparent 0 16%,#000 17% 50%,transparent 51%);mask:radial-gradient(circle,transparent 0 16%,#000 17% 50%,transparent 51%);opacity:.7}
.nd-fx i:nth-child(1){left:2%;top:calc(var(--safe-top,0px) + var(--u)*6);background:repeating-conic-gradient(var(--stripe1) 0 3deg,transparent 3deg 14deg)}
.nd-fx i:nth-child(2){right:4%;top:calc(var(--safe-top,0px) + var(--u)*2);width:calc(var(--u)*18);height:calc(var(--u)*18);background:repeating-conic-gradient(var(--stripe2) 0 3deg,transparent 3deg 14deg)}
.nd-fx i:nth-child(3){right:10%;top:calc(var(--safe-top,0px) + var(--u)*40);width:calc(var(--u)*14);height:calc(var(--u)*14);background:repeating-conic-gradient(var(--stripe3) 0 3deg,transparent 3deg 14deg)}
.nd-fx i:nth-child(4){left:8%;top:calc(var(--safe-top,0px) + var(--u)*46);width:calc(var(--u)*12);height:calc(var(--u)*12);background:repeating-conic-gradient(var(--accent) 0 3deg,transparent 3deg 14deg)}
.nd-label{font-size:calc(var(--u)*3);font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:var(--accent);padding-left:.24em}
.nd-flagwrap{display:flex;align-items:flex-start;margin-top:calc(var(--u)*2)}
.nd-pole{position:relative;width:calc(var(--u)*1.6);height:calc(var(--u)*50);border-radius:99px;background:linear-gradient(90deg,#8c8c96,#f2f2f5 45%,#a1a1aa)}
.nd-pole b{position:absolute;left:50%;top:calc(var(--u)*-3.4);width:calc(var(--u)*3.8);height:calc(var(--u)*3.8);margin-left:calc(var(--u)*-1.9);border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff3c4,#d4a017 60%,#8a6508)}
.nd-flag{--fw:calc(var(--u)*57);position:relative;width:var(--fw);margin-top:calc(var(--fw)*-.0526 + var(--u));filter:drop-shadow(0 calc(var(--u)*1.4) calc(var(--u)*2.4) rgba(0,0,0,.35))}
.nd-cloth{display:block;width:100%;height:auto;overflow:visible}
.nd-s1{fill:var(--stripe1)}.nd-s2{fill:var(--stripe2)}.nd-s3{fill:var(--stripe3)}
.nd-wheel{stroke:var(--emblem);fill:var(--emblem);stroke-linecap:round;stroke-width:3.6}
.nd-wheel circle:first-child{fill:none}
.nd-emblem{position:absolute;left:50%;top:50%;width:calc(var(--u)*16);height:calc(var(--u)*16);margin:calc(var(--u)*-8) 0 0 calc(var(--u)*-8)}
.nd-flag:has(.nd-emblem.has-img) .nd-wheel{display:none}
.nd-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2.6)}
.nd-title{font-family:var(--font-heading);font-size:calc(var(--u)*12);line-height:1.02;font-weight:700;letter-spacing:-.015em}
.nd-title .hl{color:var(--accent)}
.nd-message{font-size:calc(var(--u)*3.6);line-height:1.5;opacity:.9;max-width:86%}
.nd-foot{display:flex;align-items:center;gap:calc(var(--u)*1.8);font-size:calc(var(--u)*3);font-weight:700;color:var(--accent)}
.nd-logo{width:calc(var(--u)*12);height:calc(var(--u)*6)}
.is-square .nd{gap:calc(var(--u)*2.4)}
.is-square .nd-pole{height:calc(var(--u)*44)}
.is-square .nd-flag{--fw:calc(var(--u)*48)}
.is-square .nd-title{font-size:calc(var(--u)*9.4)}
.is-story .nd-pole{height:calc(var(--u)*46)}
.is-story .nd-title{font-size:calc(var(--u)*11)}
.is-story .nd-message{font-size:calc(var(--u)*3.8)}
.is-story .nd-flag{--fw:calc(var(--u)*60)}
.is-landscape .nd{display:grid;grid-template-columns:auto 1fr;grid-template-rows:1fr auto auto auto 1fr;column-gap:calc(var(--u)*7);row-gap:calc(var(--u)*2.4);align-items:center;text-align:left}
.is-landscape .nd-label{grid-column:2;grid-row:2;justify-self:start;padding-left:0}
.is-landscape .nd-flagwrap{grid-column:1;grid-row:1 / span 5;margin:0}
.is-landscape .nd-body{grid-column:2;grid-row:3;align-items:flex-start;flex:none}
.is-landscape .nd-foot{grid-column:2;grid-row:4;justify-self:start}
.is-landscape .nd-pole{height:calc(var(--u)*62)}
.is-landscape .nd-flag{--fw:calc(var(--u)*66)}
.is-landscape .nd-message{max-width:100%}
.is-landscape .nd-title{font-size:calc(var(--u)*10)}`,
};
