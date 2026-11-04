// Pointed (Islamic) arch, stretched to the panel: the gold frame is this shape, the panel the same shape inset
const ARCH = `url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='M0 100 V34 C0 18 22 8 50 0 C78 8 100 18 100 34 V100 Z'/></svg>")}")`;
// A fanous (lantern) on a chain with a flickering flame inside
const fanous = side => `<div class="rm-fanous rm-${side}" aria-hidden="true" data-anim="sway"><i class="rm-chain"></i><i class="rm-cap"></i><i class="rm-glass"><b data-anim="flicker"></b></i><i class="rm-base"></i></div>`;

export default {
  id: 'ramadan-eid',
  name: 'Ramadan & Eid',
  version: '1.0.0',
  category: 'holidays',
  tags: ['ramadan', 'eid-mubarak', 'eid-al-fitr', 'ramadan-kareem', 'iftar', 'crescent', 'lantern', 'greeting'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Ramadan & Eid Post Template — Free Ramadan Kareem Greeting',
  seoDescription: 'Free Ramadan and Eid Mubarak post template: a gold crescent, twinkling stars, swaying lanterns, a pointed arch, an Arabic greeting and an iftar-times chip.',
  description: 'A Ramadan Kareem or Eid Mubarak greeting on a deep teal night: a gold crescent moon and twinkling stars, two fanous lanterns with flickering flames swaying on chains, a tall pointed arch framed in gold, an editable Arabic greeting, the headline, a message, an optional iftar-times or offer chip, your handle and logo.',
  bestFor: ['Ramadan Kareem greetings from brands and offices', 'Eid Mubarak (al-Fitr or al-Adha) with the greeting changed', 'Iftar menus, Ramadan hours and Eid offers'],
  fonts: { heading: 'g:Amiri|47|e', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Night (top)', value: '#06242c' },
    { key: 'bg2', label: 'Night (bottom)', value: '#0e3d44' },
    { key: 'card', label: 'Arch panel', value: '#0a3038' },
    { key: 'text', label: 'Text', value: '#f6efdc' },
    { key: 'accent', label: 'Gold', value: '#e5b85c' },
    { key: 'btnText', label: 'Chip text', value: '#06242c' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Ramadan 2027' },
    { key: 'arabic', label: 'Arabic greeting (optional)', type: 'text', value: 'رمضان كريم' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Ramadan *Kareem*' },
    { key: 'message', label: 'Message', type: 'textarea', value: 'May this month bring peace to your heart, light to your home and blessings to everyone you love.' },
    { key: 'info', label: 'Chip (optional)', type: 'text', value: 'Iftar menu · daily from sunset' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="rm">
  <div class="rm-stars" aria-hidden="true"><i data-anim="twinkle">&#10022;</i><i data-anim="twinkle">&#10022;</i><i data-anim="twinkle">&#10022;</i><i data-anim="twinkle">&#10022;</i><i data-anim="twinkle">&#10022;</i><i data-anim="twinkle">&#10022;</i></div>
  ${fanous('l')}${fanous('r')}
  <div class="rm-arch" data-fit-box>
    <div class="rm-moon" aria-hidden="true" data-anim="pop"></div>
    <span class="rm-label" data-edit="label"></span>
    <p class="rm-arabic" data-edit="arabic" dir="rtl"></p>
    <h2 class="rm-title" data-edit="title" data-fit></h2>
    <p class="rm-message" data-edit="message" data-fit></p>
    <span class="rm-info" data-edit="info"></span>
  </div>
  <div class="rm-foot"><div class="rm-logo" data-image="logo" data-image-fit="contain"></div><span class="rm-handle" data-edit="handle"></span></div>
</div>`,
  css: `.rm{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:calc(var(--u)*3);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(ellipse at 50% 18%,color-mix(in srgb,var(--accent) 18%,transparent),transparent 52%),linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%);overflow:hidden}
.rm>*:not(.rm-stars):not(.rm-fanous){position:relative}
.rm-stars i{position:absolute;font-style:normal;color:var(--accent)}
.rm-stars i:nth-child(1){left:8%;top:20%;font-size:calc(var(--u)*3)}.rm-stars i:nth-child(2){right:9%;top:30%;font-size:calc(var(--u)*4)}.rm-stars i:nth-child(3){left:5%;top:52%;font-size:calc(var(--u)*2.2)}.rm-stars i:nth-child(4){right:5%;top:62%;font-size:calc(var(--u)*2.8)}.rm-stars i:nth-child(5){left:30%;top:4%;font-size:calc(var(--u)*2)}.rm-stars i:nth-child(6){right:30%;top:7%;font-size:calc(var(--u)*2.6)}
.rm-fanous{position:absolute;top:0;display:flex;flex-direction:column;align-items:center;width:calc(var(--u)*10)}
.rm-l{left:calc(var(--u)*3)}.rm-r{right:calc(var(--u)*3)}
.rm-chain{display:block;width:calc(var(--u)*.4);height:calc(var(--safe-top,0px) + var(--u)*10);background:repeating-linear-gradient(180deg,var(--accent) 0 calc(var(--u)*1),transparent calc(var(--u)*1) calc(var(--u)*1.4))}
.rm-r .rm-chain{height:calc(var(--safe-top,0px) + var(--u)*17)}
.rm-cap{display:block;width:calc(var(--u)*7);height:calc(var(--u)*4);background:var(--accent);clip-path:polygon(50% 0,100% 100%,0 100%)}
.rm-glass{position:relative;display:block;width:calc(var(--u)*8);height:calc(var(--u)*10);background:radial-gradient(ellipse at 50% 60%,rgba(255,214,140,.95),rgba(229,184,92,.55) 45%,rgba(120,80,20,.6));clip-path:polygon(15% 0,85% 0,100% 30%,100% 70%,85% 100%,15% 100%,0 70%,0 30%);box-shadow:0 0 calc(var(--u)*6) rgba(255,200,110,.6)}
.rm-glass::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 30%,color-mix(in srgb,var(--accent) 90%,#000) 30% 33%,transparent 33% 67%,color-mix(in srgb,var(--accent) 90%,#000) 67% 70%,transparent 70%)}
.rm-glass b{position:absolute;left:calc(50% - var(--u)*1.1);bottom:calc(var(--u)*2.4);width:calc(var(--u)*2.2);height:calc(var(--u)*4);border-radius:50% 50% 50% 50%/62% 62% 38% 38%;background:radial-gradient(ellipse at 50% 72%,#fff 0 25%,#ffd36b 55%,#ff9a2e 100%)}
.rm-base{display:block;width:calc(var(--u)*6);height:calc(var(--u)*2.4);background:var(--accent);clip-path:polygon(0 0,100% 0,75% 100%,25% 100%)}
.rm-arch{flex:1;min-height:0;width:82%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2);padding:calc(var(--u)*12) calc(var(--u)*5) calc(var(--u)*5);background:var(--accent);-webkit-mask:${ARCH} center/100% 100% no-repeat;mask:${ARCH} center/100% 100% no-repeat}
.rm-arch::before{content:'';position:absolute;inset:calc(var(--u)*.8);background:linear-gradient(180deg,color-mix(in srgb,var(--card) 92%,var(--accent)),var(--card));-webkit-mask:${ARCH} center/100% 100% no-repeat;mask:${ARCH} center/100% 100% no-repeat}
.rm-arch>*{position:relative}
.rm-moon{flex:none;width:calc(var(--u)*11);height:calc(var(--u)*11);border-radius:50%;box-shadow:inset calc(var(--u)*-3.4) calc(var(--u)*-1.6) 0 0 var(--accent);rotate:-20deg;filter:drop-shadow(0 0 calc(var(--u)*2.4) color-mix(in srgb,var(--accent) 70%,transparent));margin-bottom:calc(var(--u)*1)}
.rm-label{font-size:calc(var(--u)*2.7);font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--accent);padding-left:.3em}
.rm-arabic{font-family:var(--font-heading);font-size:calc(var(--u)*8);line-height:1.3;font-weight:700;color:var(--accent)}
.rm-title{font-family:var(--font-heading);font-size:calc(var(--u)*10);line-height:1.05;font-weight:700;color:var(--text)}
.rm-title .hl{color:var(--accent)}
.rm-message{font-size:calc(var(--u)*3.3);line-height:1.5;color:var(--text);opacity:.88;max-width:92%}
.rm .rm-info{white-space:nowrap}
.rm-info{font-size:calc(var(--u)*3);font-weight:800;color:var(--btnText);background:var(--accent);padding:calc(var(--u)*1.6) calc(var(--u)*4);border-radius:99px}
.rm-info:empty{display:none}
.rm-foot{display:flex;align-items:center;gap:calc(var(--u)*1.8);font-size:calc(var(--u)*3);font-weight:700;color:var(--accent)}
.rm-logo{width:calc(var(--u)*12);height:calc(var(--u)*6)}
.is-square .rm-arch{width:72%;padding-top:calc(var(--u)*10);gap:calc(var(--u)*1.4)}
.is-square .rm-moon{width:calc(var(--u)*10);height:calc(var(--u)*10)}
.is-square .rm-arabic{font-size:calc(var(--u)*6.2)}
.is-square .rm-title{font-size:calc(var(--u)*8)}
.is-square .rm-message{font-size:calc(var(--u)*2.9)}
.is-story .rm-arch{width:88%;padding-top:calc(var(--u)*14)}
.is-story .rm-arabic{font-size:calc(var(--u)*9)}
.is-story .rm-title{font-size:calc(var(--u)*10.5)}
.is-story .rm-message{font-size:calc(var(--u)*3.6)}
.is-landscape .rm-arch{width:46%;padding-top:calc(var(--u)*13);gap:calc(var(--u)*1.4)}
.is-landscape .rm-moon{width:calc(var(--u)*9);height:calc(var(--u)*9)}
.is-landscape .rm-arabic{font-size:calc(var(--u)*6)}
.is-landscape .rm-title{font-size:calc(var(--u)*7.6)}
.is-landscape .rm-message{font-size:calc(var(--u)*2.8)}
.is-landscape .rm-fanous{width:calc(var(--u)*12)}
.is-landscape .rm-l{left:calc(var(--u)*16)}.is-landscape .rm-r{right:calc(var(--u)*16)}`,
};
