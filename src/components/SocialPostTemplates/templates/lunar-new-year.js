// A silk lantern on a cord with a tassel; it swings from the top of its cord
const lantern = side => `<div class="ln-lantern ln-${side}" aria-hidden="true" data-anim="sway"><i class="ln-cord"></i><i class="ln-body"></i><i class="ln-tassel"></i></div>`;

export default {
  id: 'lunar-new-year',
  name: 'Lunar New Year',
  version: '1.0.0',
  category: 'holidays',
  tags: ['lunar-new-year', 'chinese-new-year', 'spring-festival', 'tet', 'seollal', 'year-of-the-goat', 'lantern', 'red-envelope'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Lunar New Year Post Template — Free Chinese New Year Post',
  seoDescription: 'Free Lunar New Year post template: swaying red lanterns, gold fireworks, a 福 fortune charm, a Chinese greeting and a red-envelope offer. For 6 Feb 2027.',
  description: 'A Lunar New Year greeting in red and gold: two silk lanterns swaying from the top corners, gold fireworks bursting behind them, a diamond-shaped 福 (fortune) charm, an editable Chinese greeting, the headline, a short wish, an optional red-envelope offer chip, a scalloped gold border and your handle and logo.',
  bestFor: ['Chinese New Year / Spring Festival greetings', 'Tết (Vietnam) and Seollal (Korea) with the greeting changed', 'Red-envelope sales and festive menus'],
  fonts: { heading: 'playfair', body: 'dmsans' },
  extraFonts: ['g:Noto Serif SC|79|e'],
  vars: [
    { key: 'bg', label: 'Red (top)', value: '#8f0d14' },
    { key: 'bg2', label: 'Red (bottom)', value: '#c8161d' },
    { key: 'text', label: 'Text', value: '#fff3dc' },
    { key: 'accent', label: 'Gold', value: '#f5c451' },
    { key: 'btn', label: 'Offer chip', value: '#f5c451' },
    { key: 'btnText', label: 'Offer text', value: '#7a0a10' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Year of the Goat · 2027' },
    { key: 'char', label: 'Charm character', type: 'text', value: '福' },
    { key: 'chinese', label: 'Chinese greeting (optional)', type: 'text', value: '新年快乐' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Happy Lunar *New Year*' },
    { key: 'message', label: 'Message', type: 'textarea', value: 'Wishing you good health, good fortune and a home full of laughter in the year ahead.' },
    { key: 'offer', label: 'Offer (optional)', type: 'text', value: 'Red envelope deal · 8% off everything' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="ln">
  <div class="ln-fx" aria-hidden="true"><i data-anim="burst"></i><i data-anim="burst"></i><i data-anim="burst"></i></div>
  ${lantern('l')}${lantern('r')}
  <span class="ln-label" data-edit="label"></span>
  <div class="ln-body-main" data-fit-box>
    <div class="ln-charm" data-anim="pop"><span data-edit="char"></span></div>
    <p class="ln-cn" data-edit="chinese"></p>
    <h2 class="ln-title" data-edit="title" data-fit></h2>
    <p class="ln-message" data-edit="message" data-fit></p>
    <span class="ln-offer" data-edit="offer"></span>
  </div>
  <div class="ln-foot"><div class="ln-logo" data-image="logo" data-image-fit="contain"></div><span class="ln-handle" data-edit="handle"></span></div>
  <div class="ln-waves" aria-hidden="true"></div>
</div>`,
  css: `.ln{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:calc(var(--u)*3);padding:var(--pt) var(--pad) calc(var(--pb) + var(--u)*6);background:radial-gradient(circle at 50% 40%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 55%),linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%);overflow:hidden}
.ln>*:not(.ln-fx):not(.ln-lantern):not(.ln-waves){position:relative}
.ln-fx i{position:absolute;width:calc(var(--u)*26);height:calc(var(--u)*26);border-radius:50%;background:repeating-conic-gradient(var(--accent) 0 3deg,transparent 3deg 15deg);-webkit-mask:radial-gradient(circle,transparent 0 18%,#000 19% 50%,transparent 51%);mask:radial-gradient(circle,transparent 0 18%,#000 19% 50%,transparent 51%);opacity:.55}
.ln-fx i:nth-child(1){left:18%;top:calc(var(--safe-top,0px) + var(--u)*12)}
.ln-fx i:nth-child(2){right:20%;top:calc(var(--safe-top,0px) + var(--u)*14);width:calc(var(--u)*18);height:calc(var(--u)*18)}
.ln-fx i:nth-child(3){left:6%;top:calc(var(--safe-top,0px) + var(--u)*40);width:calc(var(--u)*14);height:calc(var(--u)*14)}
.ln-lantern{position:absolute;top:0;display:flex;flex-direction:column;align-items:center;width:calc(var(--u)*15)}
.ln-l{left:calc(var(--u)*1.5)}
.ln-r{right:calc(var(--u)*1.5)}
.ln-cord{display:block;width:calc(var(--u)*.5);height:calc(var(--safe-top,0px) + var(--u)*8);background:var(--accent)}
.ln-r .ln-cord{height:calc(var(--safe-top,0px) + var(--u)*14)}
.ln-body{position:relative;display:block;width:calc(var(--u)*15);height:calc(var(--u)*13);border-radius:50%;background:repeating-linear-gradient(90deg,transparent 0 calc(var(--u)*2.2),rgba(0,0,0,.14) calc(var(--u)*2.2) calc(var(--u)*2.5)),radial-gradient(ellipse at 50% 45%,#ff6a3d 0,#e0201f 45%,#9e0d12 100%);box-shadow:0 0 calc(var(--u)*6) rgba(255,120,60,.55)}
.ln-body::before,.ln-body::after{content:'';position:absolute;left:24%;right:24%;height:calc(var(--u)*1.8);border-radius:calc(var(--u)*.5);background:var(--accent)}
.ln-body::before{top:calc(var(--u)*-.8)}.ln-body::after{bottom:calc(var(--u)*-.8)}
.ln-tassel{display:block;width:calc(var(--u)*2.4);height:calc(var(--u)*7);margin-top:calc(var(--u)*.8);background:repeating-linear-gradient(90deg,var(--accent) 0 calc(var(--u)*.35),transparent calc(var(--u)*.35) calc(var(--u)*.6));border-top:calc(var(--u)*1.2) solid var(--accent);border-radius:0 0 calc(var(--u)*1) calc(var(--u)*1)}
.ln-label{max-width:68%;font-size:calc(var(--u)*2.9);font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--accent);padding-left:.28em}
.ln-body-main{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2.6)}
.ln-charm{flex:none;display:flex;align-items:center;justify-content:center;width:calc(var(--u)*20);height:calc(var(--u)*20);margin:calc(var(--u)*4) 0 calc(var(--u)*3);background:radial-gradient(circle,#e3262a,#b3121a);border:calc(var(--u)*.7) solid var(--accent);box-shadow:inset 0 0 0 calc(var(--u)*1.2) #c8161d,inset 0 0 0 calc(var(--u)*1.5) var(--accent),0 calc(var(--u)*1.4) calc(var(--u)*4) rgba(0,0,0,.35);transform:rotate(45deg)}
.ln-charm span{display:block;transform:rotate(-45deg);font-family:'Noto Serif SC',var(--font-heading);font-size:calc(var(--u)*13);line-height:1;font-weight:900;color:var(--accent)}
.ln-cn{font-family:'Noto Serif SC',var(--font-heading);font-size:calc(var(--u)*6);font-weight:700;letter-spacing:.2em;padding-left:.2em;color:var(--accent);line-height:1.2}
.ln-title{font-family:var(--font-heading);font-size:calc(var(--u)*11.5);line-height:1.02;font-weight:700;letter-spacing:-.01em;text-shadow:0 calc(var(--u)*.6) calc(var(--u)*2.4) rgba(0,0,0,.3)}
.ln-title .hl{color:var(--accent)}
.ln-message{font-size:calc(var(--u)*3.5);line-height:1.5;opacity:.92;max-width:84%}
.ln-offer{font-size:calc(var(--u)*3.2);font-weight:800;color:var(--btnText);background:var(--btn);padding:calc(var(--u)*1.8) calc(var(--u)*4.4);border-radius:calc(var(--u)*1.2)}
.ln-offer:empty{display:none}
.ln-foot{display:flex;align-items:center;gap:calc(var(--u)*1.8);font-size:calc(var(--u)*3);font-weight:700;color:var(--accent)}
.ln-logo{width:calc(var(--u)*12);height:calc(var(--u)*6)}
.ln-waves{position:absolute;left:0;right:0;bottom:0;height:calc(var(--u)*7);background:radial-gradient(circle at 50% 100%,transparent 0 calc(var(--u)*2.2),var(--accent) calc(var(--u)*2.2) calc(var(--u)*2.8),transparent calc(var(--u)*2.8) calc(var(--u)*3.8),var(--accent) calc(var(--u)*3.8) calc(var(--u)*4.4),transparent calc(var(--u)*4.4)) 0 0/calc(var(--u)*9) calc(var(--u)*5) repeat-x;opacity:.75}
.is-square .ln-charm{width:calc(var(--u)*15);height:calc(var(--u)*15);margin:calc(var(--u)*2) 0}
.is-square .ln-charm span{font-size:calc(var(--u)*10)}
.is-square .ln-title{font-size:calc(var(--u)*9.4)}
.is-square .ln-cn{font-size:calc(var(--u)*5)}
.is-square .ln-body-main{gap:calc(var(--u)*2)}
.is-story .ln-charm{width:calc(var(--u)*19);height:calc(var(--u)*19)}
.is-story .ln-charm span{font-size:calc(var(--u)*12.5)}
.is-story .ln-title{font-size:calc(var(--u)*11)}
.is-landscape .ln-body-main{display:grid;grid-template-columns:auto 1fr;grid-template-rows:repeat(4,auto);align-content:center;column-gap:calc(var(--u)*7);row-gap:calc(var(--u)*1.6);text-align:left;width:76%}
.is-landscape .ln-charm{grid-row:1 / span 4;margin:0 calc(var(--u)*3)}
.is-landscape .ln-body-main>*:not(.ln-charm){justify-self:start}
.is-landscape .ln-title{font-size:calc(var(--u)*9.4)}
.is-landscape .ln-cn{font-size:calc(var(--u)*5);padding-left:0}
.is-landscape .ln-message{max-width:100%}
.is-landscape .ln-lantern{width:calc(var(--u)*12)}
.is-landscape .ln-body{width:calc(var(--u)*12);height:calc(var(--u)*10.4)}`,
};
