// Nine candles: the shamash (helper candle) comes first in the markup so it lights first, and CSS
// order puts it in the middle. Each flame pops in (lit) and then flickers.
const candle = (cls = '') => `<span class="hk-candle${cls}"><span class="hk-lit" data-anim="pop"><b data-anim="flicker"></b></span><i></i></span>`;
const CANDLES = [candle(' hk-shamash'), ...Array.from({ length: 8 }, () => candle())].join('');

export default {
  id: 'hanukkah',
  name: 'Hanukkah',
  version: '1.0.0',
  category: 'holidays',
  tags: ['hanukkah', 'chanukah', 'festival-of-lights', 'menorah', 'jewish', 'greeting', 'december', 'blue'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Hanukkah Post Template — Free Menorah Greeting for Instagram',
  seoDescription: 'Free Hanukkah post template: a menorah whose candles light one by one, shamash first, a Hebrew and English greeting and an optional eight-nights offer.',
  description: 'A Hanukkah greeting on a deep night-blue sky: a silver menorah whose nine candles light one after another (the shamash first, in the middle), "Happy Hanukkah" with an editable Hebrew line, a warm message, an optional offer chip, your handle and logo.',
  bestFor: ['Hanukkah greetings from brands, schools and communities', '"Eight nights, eight deals" campaigns', 'Stories and WhatsApp Status during the eight nights'],
  fonts: { heading: 'g:Frank Ruhl Libre|57|e', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Sky (top)', value: '#071a45' },
    { key: 'bg2', label: 'Sky (bottom)', value: '#1d3f91' },
    { key: 'text', label: 'Text', value: '#f2f6ff' },
    { key: 'accent', label: 'Silver', value: '#c9d8f5' },
    { key: 'btn', label: 'Offer chip', value: '#f6c453' },
    { key: 'btnText', label: 'Offer text', value: '#0b1e4a' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Festival of lights · 8 nights' },
    { key: 'hebrew', label: 'Hebrew greeting (optional)', type: 'text', value: 'חג חנוכה שמח' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Happy *Hanukkah*' },
    { key: 'message', label: 'Message', type: 'textarea', value: 'May every candle you light add a little more warmth to your home, from the first night to the eighth.' },
    { key: 'offer', label: 'Offer (optional)', type: 'text', value: '8 nights · 8 deals · starts 4 Dec' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="hk">
  <div class="hk-stars" aria-hidden="true"><i data-anim="twinkle">&#10022;</i><i data-anim="twinkle">&#10022;</i><i data-anim="twinkle">&#10022;</i><i data-anim="twinkle">&#10022;</i><i data-anim="twinkle">&#10022;</i></div>
  <span class="hk-label" data-edit="label"></span>
  <div class="hk-menorah" aria-hidden="true">
    <div class="hk-row">${CANDLES}</div>
    <div class="hk-bar"></div><div class="hk-stem"></div><div class="hk-base"></div>
  </div>
  <div class="hk-body" data-fit-box>
    <p class="hk-hebrew" data-edit="hebrew" dir="rtl"></p>
    <h2 class="hk-title" data-edit="title" data-fit></h2>
    <p class="hk-message" data-edit="message" data-fit></p>
    <span class="hk-offer" data-edit="offer"></span>
  </div>
  <div class="hk-foot"><div class="hk-logo" data-image="logo" data-image-fit="contain"></div><span class="hk-handle" data-edit="handle"></span></div>
</div>`,
  css: `.hk{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:calc(var(--u)*3.2);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(ellipse at 50% 30%,rgba(255,214,120,.16),transparent 50%),linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%);overflow:hidden}
.hk>*:not(.hk-stars){position:relative}
.hk-stars i{position:absolute;font-style:normal;color:var(--accent);opacity:.6}
.hk-stars i:nth-child(1){left:9%;top:9%;font-size:calc(var(--u)*4)}
.hk-stars i:nth-child(2){right:11%;top:13%;font-size:calc(var(--u)*3)}
.hk-stars i:nth-child(3){left:16%;top:38%;font-size:calc(var(--u)*2.4)}
.hk-stars i:nth-child(4){right:8%;top:44%;font-size:calc(var(--u)*4.4)}
.hk-stars i:nth-child(5){left:50%;top:4%;font-size:calc(var(--u)*2.2)}
.hk-label{font-size:calc(var(--u)*2.9);font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--accent);padding-left:.3em}
.hk-menorah{display:flex;flex-direction:column;align-items:center;width:calc(var(--u)*72)}
.hk-row{display:flex;align-items:flex-end;justify-content:space-between;width:100%;height:calc(var(--u)*19)}
.hk-candle{position:relative;display:flex;flex-direction:column;align-items:center;width:calc(var(--u)*3)}
.hk-candle i{display:block;width:100%;height:calc(var(--u)*9.5);border-radius:calc(var(--u)*.5) calc(var(--u)*.5) 0 0;background:repeating-linear-gradient(160deg,#ffffff 0 calc(var(--u)*1.1),#9ec1ff calc(var(--u)*1.1) calc(var(--u)*2.2))}
.hk-shamash{order:5;margin-bottom:calc(var(--u)*4.4)}
.hk-shamash::after{content:'';position:absolute;left:calc(50% - var(--u)*1.1);bottom:calc(var(--u)*-4.4);width:calc(var(--u)*2.2);height:calc(var(--u)*4.4);background:linear-gradient(90deg,#7f93c4,#f4f7ff 45%,var(--accent))}
.hk-candle:nth-child(n+2):nth-child(-n+5){order:1}
.hk-candle:nth-child(n+6){order:6}
.hk-shamash i{height:calc(var(--u)*10.5)}
.hk-lit{display:block;position:relative;width:calc(var(--u)*3);height:calc(var(--u)*5.4);transform-origin:50% 100%}
.hk-lit b{position:absolute;left:calc(50% - var(--u)*1.2);bottom:calc(var(--u)*.2);width:calc(var(--u)*2.4);height:calc(var(--u)*4.8);border-radius:50% 50% 50% 50%/62% 62% 38% 38%;background:radial-gradient(ellipse at 50% 72%,#fff9e0 0 24%,#ffd66b 48%,#ff9a2e 100%);box-shadow:0 0 calc(var(--u)*3) calc(var(--u)*1.2) rgba(255,200,90,.55)}
.hk-bar{width:100%;height:calc(var(--u)*1.6);border-radius:99px;background:linear-gradient(180deg,#f4f7ff,var(--accent) 60%,#7f93c4)}
.hk-stem{width:calc(var(--u)*2.2);height:calc(var(--u)*5);background:linear-gradient(90deg,#7f93c4,#f4f7ff 45%,var(--accent))}
.hk-base{width:calc(var(--u)*22);height:calc(var(--u)*2.6);border-radius:calc(var(--u)*2.6) calc(var(--u)*2.6) calc(var(--u)*.6) calc(var(--u)*.6);background:linear-gradient(180deg,#f4f7ff,var(--accent) 60%,#7f93c4)}
.hk-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2.6)}
.hk-hebrew{font-family:var(--font-heading);font-size:calc(var(--u)*6);font-weight:700;line-height:1.2;color:var(--btn)}
.hk-title{font-family:var(--font-heading);font-size:calc(var(--u)*12);line-height:1;font-weight:700;letter-spacing:-.01em}
.hk-title .hl{color:var(--btn)}
.hk-message{font-size:calc(var(--u)*3.6);line-height:1.5;opacity:.9;max-width:86%}
.hk-offer{font-size:calc(var(--u)*3.2);font-weight:800;color:var(--btnText);background:var(--btn);padding:calc(var(--u)*1.8) calc(var(--u)*4.4);border-radius:99px}
.hk-offer:empty{display:none}
.hk-foot{display:flex;align-items:center;gap:calc(var(--u)*1.8);font-size:calc(var(--u)*3.1);font-weight:700;color:var(--accent);letter-spacing:.04em}
.hk-logo{width:calc(var(--u)*12);height:calc(var(--u)*6)}
.is-square .hk{gap:calc(var(--u)*2.4)}
.is-square .hk-menorah{width:calc(var(--u)*58)}
.is-square .hk-row{height:calc(var(--u)*15)}
.is-square .hk-candle i{height:calc(var(--u)*7)}
.is-square .hk-shamash i{height:calc(var(--u)*8)}
.is-square .hk-stem{height:calc(var(--u)*3)}
.is-square .hk-title{font-size:calc(var(--u)*9.5)}
.is-square .hk-hebrew{font-size:calc(var(--u)*5)}
.is-square .hk-message{font-size:calc(var(--u)*3.2)}
.is-story .hk-menorah{width:calc(var(--u)*84)}
.is-story .hk-row{height:calc(var(--u)*22)}
.is-story .hk-candle i{height:calc(var(--u)*12)}
.is-story .hk-shamash i{height:calc(var(--u)*13)}
.is-landscape .hk{flex-direction:row;flex-wrap:wrap;justify-content:center;align-content:center;column-gap:calc(var(--u)*7)}
.is-landscape .hk-label{width:100%}
.is-landscape .hk-menorah{width:calc(var(--u)*62)}
.is-landscape .hk-body{flex:0 1 52%;align-items:flex-start;text-align:left}
.is-landscape .hk-title{font-size:calc(var(--u)*11)}
.is-landscape .hk-message{max-width:100%;font-size:calc(var(--u)*3.2)}
.is-landscape .hk-foot{width:100%;justify-content:center}`,
};
