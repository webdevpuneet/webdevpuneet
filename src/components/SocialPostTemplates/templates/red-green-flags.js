export default {
  id: 'red-green-flags',
  name: 'Red Flag / Green Flag',
  version: '1.0.0',
  category: 'engagement',
  tags: ['red-flag', 'green-flag', 'dos-and-donts', 'comparison', 'relatable', 'engagement', 'freelance', 'hiring', 'light'],
  created: '2026-11-16',
  updated: '2026-11-16',
  seoTitle: 'Red Flag Green Flag Post Template — Free Instagram Maker',
  seoDescription: 'Free red flag green flag post template: two waving flags, a red list and a green list of up to four items each, plus a "what\'s yours?" prompt. Edit online.',
  description: 'A two-sided relatable post: a headline, a red card with a waving red flag and up to four red flags, a green card with a waving green flag and up to four green flags, and a "what would you add?" prompt. Empty rows disappear.',
  bestFor: ['Client, hiring and workplace red flags', 'Product, service and habit do and don\'t lists', 'Relatable posts that earn comments and saves'],
  fonts: { heading: 'g:Rubik|48|m', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fbf7ee' },
    { key: 'text', label: 'Text', value: '#22201a' },
    { key: 'accent', label: 'Red', value: '#e5383b' },
    { key: 'pop', label: 'Green', value: '#1f9d55' },
  ],
  fields: [
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Freelance client *flags*' },
    { key: 'redlabel', label: 'Red label', type: 'text', value: 'Red flags' },
    { key: 'r1', label: 'Red 1', type: 'text', value: '"Can you start yesterday?"' },
    { key: 'r2', label: 'Red 2', type: 'text', value: '"We\'ll pay in exposure"' },
    { key: 'r3', label: 'Red 3', type: 'text', value: '"Just one tiny change" (x40)' },
    { key: 'r4', label: 'Red 4 (optional)', type: 'text', value: 'No contract, only vibes' },
    { key: 'greenlabel', label: 'Green label', type: 'text', value: 'Green flags' },
    { key: 'g1', label: 'Green 1', type: 'text', value: 'Clear brief and budget' },
    { key: 'g2', label: 'Green 2', type: 'text', value: 'Pays the deposit fast' },
    { key: 'g3', label: 'Green 3', type: 'text', value: 'Trusts your expertise' },
    { key: 'g4', label: 'Green 4 (optional)', type: 'text', value: 'Gives feedback in one round' },
    { key: 'cta', label: 'Prompt', type: 'text', value: 'What would you add? Comment below' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="rg">
  <h2 class="rg-title" data-edit="title" data-fit></h2>
  <div class="rg-cols" data-fit-box>
    <div class="rg-col rg-red">
      <div class="rg-top"><i class="rg-flag" aria-hidden="true" data-anim="sway" data-origin="0% 100%"></i><span class="rg-lab" data-edit="redlabel"></span></div>
      <div class="rg-list">
        <p data-anim="slide-l" data-at="0.4"><span data-edit="r1"></span></p>
        <p data-anim="slide-l" data-at="0.7"><span data-edit="r2"></span></p>
        <p data-anim="slide-l" data-at="1"><span data-edit="r3"></span></p>
        <p data-anim="slide-l" data-at="1.3"><span data-edit="r4"></span></p>
      </div>
    </div>
    <div class="rg-col rg-green">
      <div class="rg-top"><i class="rg-flag" aria-hidden="true" data-anim="sway" data-origin="0% 100%"></i><span class="rg-lab" data-edit="greenlabel"></span></div>
      <div class="rg-list">
        <p data-anim="slide-r" data-at="0.5"><span data-edit="g1"></span></p>
        <p data-anim="slide-r" data-at="0.8"><span data-edit="g2"></span></p>
        <p data-anim="slide-r" data-at="1.1"><span data-edit="g3"></span></p>
        <p data-anim="slide-r" data-at="1.4"><span data-edit="g4"></span></p>
      </div>
    </div>
  </div>
  <div class="rg-foot"><span class="rg-cta" data-edit="cta"></span><span class="spt-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="rg-handle" data-edit="handle"></span></span></div>
</div>`,
  css: `.rg{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3.4);padding:var(--pt) var(--pad) var(--pb);background:var(--bg)}
.rg-title{flex:none;font-family:var(--font-heading);font-size:calc(var(--u)*9.4);line-height:1.2;padding-bottom:calc(var(--u)*1.2);font-weight:800;letter-spacing:-.025em;text-align:center}
.rg-title .hl{background:linear-gradient(90deg,var(--accent),var(--pop));-webkit-background-clip:text;background-clip:text;color:transparent}
.rg-cols{flex:1;min-height:0;display:flex;gap:calc(var(--u)*2.4)}
.rg-col{flex:1;min-width:0;display:flex;flex-direction:column;gap:calc(var(--u)*2.4);padding:calc(var(--u)*3) calc(var(--u)*2.6);border-radius:calc(var(--u)*3);border:calc(var(--u)*.6) solid;background:#fff}
.rg-red{border-color:var(--accent);box-shadow:calc(var(--u)*1) calc(var(--u)*1) 0 var(--accent)}
.rg-green{border-color:var(--pop);box-shadow:calc(var(--u)*1) calc(var(--u)*1) 0 var(--pop)}
.rg-top{flex:none;display:flex;align-items:flex-end;gap:calc(var(--u)*2)}
.rg-flag{position:relative;display:block;flex:none;width:calc(var(--u)*7);height:calc(var(--u)*7);margin-left:calc(var(--u)*1.4);border-left:calc(var(--u)*.8) solid var(--text)}
.rg-flag::after{content:"";position:absolute;left:0;top:0;width:calc(var(--u)*6);height:calc(var(--u)*4.2);background:currentColor;clip-path:polygon(0 0,100% 0,78% 50%,100% 100%,0 100%)}
.rg-red .rg-flag{color:var(--accent)}.rg-green .rg-flag{color:var(--pop)}
.rg-lab{font-family:var(--font-heading);font-size:calc(var(--u)*4.4);font-weight:800;text-transform:uppercase;letter-spacing:.04em;line-height:1.3}
.rg-red .rg-lab{color:var(--accent)}.rg-green .rg-lab{color:var(--pop)}
.rg-list{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:space-evenly;gap:calc(var(--u)*1.6)}
.rg-list p{display:flex;gap:calc(var(--u)*1.6);font-size:calc(var(--u)*3.3);line-height:1.3;font-weight:700}
.rg-list p::before{flex:none;font-weight:800}
.rg-red .rg-list p::before{content:"✕";color:var(--accent)}
.rg-green .rg-list p::before{content:"✓";color:var(--pop)}
.rg-list p:has(> span:empty){display:none}
.rg-foot{flex:none;display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3);font-size:calc(var(--u)*3.2);font-weight:700}
.rg-cta{opacity:.75}
.rg-handle{flex:none;white-space:nowrap}
.is-square .rg{gap:calc(var(--u)*2.4)}
.is-square .rg-title{font-size:calc(var(--u)*7.6)}
.is-square .rg-col{padding:calc(var(--u)*2.2) calc(var(--u)*2.2);gap:calc(var(--u)*1.6)}
.is-square .rg-list p{font-size:calc(var(--u)*2.8)}
.is-landscape .rg{gap:calc(var(--u)*2)}
.is-landscape .rg-title{font-size:calc(var(--u)*6)}
.is-landscape .rg-col{padding:calc(var(--u)*1.8) calc(var(--u)*2.2);gap:calc(var(--u)*1.2)}
.is-landscape .rg-list p{font-size:calc(var(--u)*2.7)}
.is-landscape .rg-lab{font-size:calc(var(--u)*3.4)}
.is-story .rg{gap:calc(var(--u)*5)}
.is-story .rg-title{font-size:calc(var(--u)*10.4)}
.is-story .rg-list p{font-size:calc(var(--u)*3.3)}
.is-story .rg-lab{font-size:calc(var(--u)*4.2)}`,
};
