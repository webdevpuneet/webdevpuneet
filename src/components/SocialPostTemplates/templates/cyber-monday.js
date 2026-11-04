export default {
  id: 'cyber-monday',
  name: 'Cyber Monday',
  version: '1.0.0',
  category: 'promo',
  tags: ['cyber-monday', 'sale', 'discount', 'promo-code', 'terminal', 'neon', 'tech', 'saas', 'dark'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Cyber Monday Post Template — Free Neon Terminal Sale Post',
  seoDescription: 'Free Cyber Monday post template: a neon terminal window that types your command, a glowing discount that counts up, a promo code and a deadline on a retro grid.',
  description: 'A Cyber Monday sale post styled as a neon command-line window over a scrolling retro grid: a typed command, a huge glowing discount that counts up from zero, the offer line, a promo code with a blinking cursor and the deadline.',
  bestFor: ['SaaS, apps and digital product deals', 'Tech stores and gadget sales', 'Courses, templates and online tools'],
  fonts: { heading: 'g:JetBrains Mono|48|m', body: 'space' },
  vars: [
    { key: 'bg', label: 'Background', value: '#05060f' },
    { key: 'text', label: 'Text', value: '#e0f2fe' },
    { key: 'accent', label: 'Neon (cyan)', value: '#22d3ee' },
    { key: 'accent2', label: 'Neon (pink)', value: '#f472b6' },
    { key: 'btn', label: 'Code box', value: '#22d3ee' },
    { key: 'btnText', label: 'Code text', value: '#05060f' },
  ],
  fields: [
    { key: 'command', label: 'Command line', type: 'text', value: '$ run cyber-monday --deal' },
    { key: 'label', label: 'Headline', type: 'textarea', value: 'Cyber\nMonday' },
    { key: 'discount', label: 'Discount', type: 'text', value: '40% OFF' },
    { key: 'offer', label: 'Offer', type: 'textarea', value: 'Every plan, every template. *Today only.*' },
    { key: 'code', label: 'Promo code', type: 'text', value: 'CYBER40' },
    { key: 'deadline', label: 'Deadline', type: 'text', value: 'Ends Mon 30 Nov · 23:59 PT' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="cm">
  <div class="cm-grid" aria-hidden="true" data-anim="scroll-y"></div>
  <div class="cm-sun" aria-hidden="true" data-anim="breathe"></div>
  <h2 class="cm-title" data-edit="label" data-fit></h2>
  <div class="cm-win" data-fit-box>
    <div class="cm-bar" aria-hidden="true"><i></i><i></i><i></i><span>deals.sh</span></div>
    <p class="cm-cmd" data-edit="command" data-anim="type" data-at="0.6"></p>
    <p class="cm-disc" data-edit="discount" data-anim="count" data-fit></p>
    <p class="cm-offer" data-edit="offer" data-fit></p>
    <div class="cm-coderow"><span class="cm-code" data-edit="code"></span><b class="cm-cursor" aria-hidden="true" data-anim="blink"></b></div>
  </div>
  <div class="cm-foot"><span class="cm-dead" data-edit="deadline"></span><div class="cm-brand"><div class="cm-logo" data-image="logo" data-image-fit="contain"></div><span class="cm-handle" data-edit="handle"></span></div></div>
</div>`,
  css: `.cm{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*4.4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(ellipse at 50% 30%,color-mix(in srgb,var(--accent2) 26%,transparent),transparent 62%),var(--bg);overflow:hidden}
.cm>*:not(.cm-grid):not(.cm-sun){position:relative}
.cm-grid{position:absolute;left:-40%;right:-40%;bottom:0;height:70%;background-image:linear-gradient(color-mix(in srgb,var(--accent) 80%,transparent) 3px,transparent 3px),linear-gradient(90deg,color-mix(in srgb,var(--accent) 80%,transparent) 3px,transparent 3px);background-size:calc(var(--u)*10) calc(var(--u)*10);transform:perspective(calc(var(--u)*140)) rotateX(64deg);transform-origin:50% 100%;-webkit-mask:linear-gradient(transparent 5%,#000 60%);mask:linear-gradient(transparent 5%,#000 60%);opacity:.7}
.cm-sun{position:absolute;left:50%;top:8%;width:calc(var(--u)*70);height:calc(var(--u)*70);margin-left:calc(var(--u)*-35);border-radius:50%;background:repeating-linear-gradient(180deg,transparent 0 calc(var(--u)*3.6),var(--bg) calc(var(--u)*3.6) calc(var(--u)*4.6)),linear-gradient(180deg,#facc15,var(--accent2) 55%,color-mix(in srgb,var(--accent2) 40%,#7c3aed));opacity:.4;-webkit-mask:linear-gradient(#000 50%,transparent 85%);mask:linear-gradient(#000 50%,transparent 85%)}
.cm-title{font-family:var(--font-heading);font-size:calc(var(--u)*14.5);line-height:.92;font-weight:800;letter-spacing:-.02em;text-transform:uppercase;color:transparent;-webkit-text-stroke:calc(var(--u)*.45) var(--accent);text-shadow:0 0 calc(var(--u)*3) color-mix(in srgb,var(--accent) 60%,transparent)}
.cm-win{display:flex;flex-direction:column;align-items:flex-start;gap:calc(var(--u)*2.4);padding:calc(var(--u)*5);padding-top:calc(var(--u)*10);border:2px solid color-mix(in srgb,var(--accent) 70%,transparent);border-radius:calc(var(--u)*2.4);background:color-mix(in srgb,var(--bg) 85%,transparent);box-shadow:0 0 calc(var(--u)*5) color-mix(in srgb,var(--accent) 35%,transparent),inset 0 0 calc(var(--u)*6) color-mix(in srgb,var(--accent) 10%,transparent);overflow:hidden}
.cm-bar{position:absolute;left:0;right:0;top:0;display:flex;align-items:center;gap:calc(var(--u)*1.4);height:calc(var(--u)*6.4);padding:0 calc(var(--u)*3);border-bottom:2px solid color-mix(in srgb,var(--accent) 40%,transparent);font-family:var(--font-heading);font-size:calc(var(--u)*2.4);color:color-mix(in srgb,var(--text) 60%,transparent)}
.cm-bar i{width:calc(var(--u)*1.8);height:calc(var(--u)*1.8);border-radius:50%;background:var(--accent2)}
.cm-bar i:nth-child(2){background:#facc15}.cm-bar i:nth-child(3){background:#4ade80}
.cm-bar span{margin-left:auto}
.cm-cmd{font-family:var(--font-heading);font-size:calc(var(--u)*3.3);color:var(--accent)}
.cm .cm-disc{white-space:nowrap}
.cm-disc{font-family:var(--font-heading);font-size:calc(var(--u)*16);line-height:1;font-weight:800;letter-spacing:-.03em;white-space:nowrap;color:var(--text);text-shadow:calc(var(--u)*-.5) 0 var(--accent2),calc(var(--u)*.5) 0 var(--accent),0 0 calc(var(--u)*4) color-mix(in srgb,var(--accent) 70%,transparent)}
.cm-offer{font-size:calc(var(--u)*4);line-height:1.4;font-weight:500}
.cm-offer .hl{color:var(--accent)}
.cm-coderow{display:flex;align-items:center;gap:calc(var(--u)*1)}
.cm-code{font-family:var(--font-heading);font-size:calc(var(--u)*4.4);font-weight:800;letter-spacing:.14em;color:var(--btnText);background:var(--btn);padding:calc(var(--u)*1.4) calc(var(--u)*3.2);border-radius:calc(var(--u)*1)}
.cm-cursor{display:block;width:calc(var(--u)*2.2);height:calc(var(--u)*5.6);background:var(--accent)}
.cm-foot{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3);font-size:calc(var(--u)*3);font-weight:600}
.cm-dead{color:var(--accent)}
.cm-brand{display:flex;align-items:center;gap:calc(var(--u)*1.6)}
.cm-logo{width:calc(var(--u)*12);height:calc(var(--u)*6);background-position:right center}
.cm-handle{color:color-mix(in srgb,var(--text) 75%,transparent)}
.is-square .cm{gap:calc(var(--u)*3)}
.is-square .cm-title{font-size:calc(var(--u)*10)}
.is-square .cm-disc{font-size:calc(var(--u)*12.5)}
.is-square .cm-win{gap:calc(var(--u)*1.8);padding-top:calc(var(--u)*9)}
.is-landscape .cm{gap:calc(var(--u)*3.4)}
.is-landscape .cm-title{white-space:normal;font-size:calc(var(--u)*10)}
.is-landscape .cm-disc{font-size:calc(var(--u)*12)}
.is-landscape .cm-win{gap:calc(var(--u)*1.8);padding:calc(var(--u)*4) calc(var(--u)*5);padding-top:calc(var(--u)*9)}
.is-landscape .cm-offer{font-size:calc(var(--u)*3.4)}
.is-story .cm{gap:calc(var(--u)*6)}
.is-story .cm-title{font-size:calc(var(--u)*17)}
.is-story .cm-disc{font-size:calc(var(--u)*17)}
.is-story .cm-win{padding:calc(var(--u)*6);padding-top:calc(var(--u)*11);gap:calc(var(--u)*3.2)}`,
};
