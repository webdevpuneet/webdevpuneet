export default {
  id: 'giveaway-time',
  name: 'Giveaway Time',
  version: '1.0.0',
  category: 'promo',
  tags: ['giveaway', 'contest', 'playful', 'bold', 'prize', 'photo', 'light'],
  created: '2026-11-13',
  updated: '2026-11-13',
  seoTitle: 'Giveaway Time Instagram Post Template — Bold Prize Photo',
  seoDescription: 'Giveaway Time Instagram post template: giant lime headline, tilted prize photo card, Join now sticker and three entry pills. Customise it free and export a PNG.',
  description: 'A loud, playful giveaway post: a giant two-line "Giveaway Time!" headline on electric lime, a tilted prize photo card with a spinning "Join now" sticker, three quick entry chips and the deadline.',
  bestFor: ['Quick, high-energy Instagram giveaways', 'Product giveaways with a prize photo', 'Youth, gaming, fashion and food brands'],
  fonts: { heading: 'bebas', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#c8ff3a' },
    { key: 'text', label: 'Text', value: '#0b0b14' },
    { key: 'accent', label: 'Pink', value: '#ff3d8b' },
    { key: 'pop', label: 'Blue', value: '#3b4bff' },
  ],
  fields: [
    { key: 'line1', label: 'Headline line 1', type: 'text', value: 'Giveaway' },
    { key: 'line2', label: 'Headline line 2', type: 'text', value: 'Time!' },
    { key: 'sticker', label: 'Sticker', type: 'text', value: 'Join now' },
    { key: 'photo', label: 'Prize photo', type: 'image', ph: 'product' },
    { key: 'chip1', label: 'Step 1', type: 'text', value: 'Follow @yourbrand' },
    { key: 'chip2', label: 'Step 2', type: 'text', value: 'Like + save' },
    { key: 'chip3', label: 'Step 3', type: 'text', value: 'Tag 2 friends' },
    { key: 'deadline', label: 'Deadline', type: 'text', value: 'Ends Sunday · 8 PM' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="gt">
  <div class="gt-bg" aria-hidden="true" data-anim="scroll-bg"></div>
  <div class="gt-head">
    <h2 class="gt-l1" data-edit="line1" data-fit></h2>
    <div class="gt-row2">
      <h2 class="gt-l2" data-edit="line2" data-fit></h2>
      <span class="gt-sticker" data-edit="sticker" data-anim="wobble"></span>
    </div>
  </div>
  <div class="gt-card" data-anim="bob"><div class="gt-photo" data-image="photo" data-ph="product"></div></div>
  <div class="gt-chips">
    <span class="gt-chip" data-edit="chip1" data-anim="pop" data-at="1.0"></span>
    <span class="gt-chip" data-edit="chip2" data-anim="pop" data-at="1.3"></span>
    <span class="gt-chip" data-edit="chip3" data-anim="pop" data-at="1.6"></span>
  </div>
  <div class="gt-foot">
    <span class="gt-deadline" data-edit="deadline" data-anim="pulse"></span>
    <span class="spt-brand gt-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="gt-handle" data-edit="handle"></span></span>
  </div>
</div>`,
  css: `.gt{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*2.6);padding:var(--pt) var(--pad) var(--pb);background:var(--bg);overflow:hidden}
.gt-bg{position:absolute;inset:-20%;pointer-events:none;opacity:.5;background:radial-gradient(circle,color-mix(in srgb,var(--text) 22%,transparent) 0 calc(var(--u)*.55),transparent calc(var(--u)*.7)) 0 0/calc(var(--u)*3.2) calc(var(--u)*3.2)}
.gt-head{position:relative;display:flex;flex-direction:column;gap:calc(var(--u)*0)}
.gt-l1,.gt-l2{font-family:var(--font-heading);font-weight:400;text-transform:uppercase;line-height:1.18;letter-spacing:.005em;white-space:nowrap}
.gt-l1{font-size:calc(var(--u)*16);color:var(--text)}
.gt-row2{display:flex;align-items:center;gap:calc(var(--u)*4)}
.gt-l2{font-size:calc(var(--u)*16);color:var(--accent);text-shadow:calc(var(--u)*.8) calc(var(--u)*.8) 0 var(--text);-webkit-text-stroke:calc(var(--u)*.35) var(--text)}
.gt-sticker{flex:none;display:flex;align-items:center;justify-content:center;width:calc(var(--u)*17);height:calc(var(--u)*17);margin-left:auto;border-radius:50%;background:var(--pop);color:#fff;font-family:var(--font-heading);font-size:calc(var(--u)*4.6);line-height:.95;text-transform:uppercase;text-align:center;padding:calc(var(--u)*2);border:calc(var(--u)*.7) dashed rgba(255,255,255,.85);box-shadow:calc(var(--u)*.8) calc(var(--u)*.8) 0 var(--text);rotate:-10deg}
.gt-card{position:relative;flex:1;min-height:0;display:flex;rotate:-2.4deg}
.gt-photo{flex:1;border-radius:calc(var(--u)*3.4);border:calc(var(--u)*1) solid var(--text);box-shadow:calc(var(--u)*1.4) calc(var(--u)*1.4) 0 var(--text)}
.gt-chips{position:relative;display:flex;flex-wrap:wrap;gap:calc(var(--u)*1.6)}
.gt-chip{padding:calc(var(--u)*1.3) calc(var(--u)*2.8);border-radius:99px;background:var(--text);color:var(--bg);font-size:calc(var(--u)*3);font-weight:800;white-space:nowrap}
.gt-foot{position:relative;display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3)}
.gt-deadline{font-family:var(--font-heading);font-size:calc(var(--u)*6);text-transform:uppercase;letter-spacing:.03em;color:var(--text)}
.gt-handle{font-size:calc(var(--u)*3.2);font-weight:800;color:var(--text)}
.is-square .gt{gap:calc(var(--u)*2)}
.is-square .gt-l1,.is-square .gt-l2{font-size:calc(var(--u)*13.5)}
.is-square .gt-sticker{width:calc(var(--u)*14);height:calc(var(--u)*14);font-size:calc(var(--u)*3.8)}
.is-square .gt-chip{font-size:calc(var(--u)*2.8)}
.is-landscape .gt{display:grid;grid-template-columns:1.05fr .95fr;grid-template-rows:auto 1fr auto auto;column-gap:calc(var(--u)*6);row-gap:calc(var(--u)*2.4)}
.is-landscape .gt-head{grid-column:1;grid-row:1}
.is-landscape .gt-card{grid-column:2;grid-row:1/4;align-self:stretch}
.is-landscape .gt-chips{grid-column:1;grid-row:2;align-self:center}
.is-landscape .gt-foot{grid-column:1;grid-row:3}
.is-landscape .gt-l1,.is-landscape .gt-l2{font-size:calc(var(--u)*17)}
.is-landscape .gt-sticker{width:calc(var(--u)*13);height:calc(var(--u)*13);font-size:calc(var(--u)*3.6)}
.is-landscape .gt-chip{font-size:calc(var(--u)*3.2)}`,
};
