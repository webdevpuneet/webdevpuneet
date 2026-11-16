export default {
  id: 'tier-list',
  name: 'Tier List Post',
  version: '1.0.0',
  category: 'engagement',
  tags: ['tier-list', 'ranking', 'rank', 'opinion', 'engagement', 'viral', 'comments', 'dark'],
  created: '2026-11-16',
  updated: '2026-11-16',
  seoTitle: 'Tier List Post Template — Free S to D Ranking Graphic Maker',
  seoDescription: 'Free tier list post template: coloured S, A, B, C and D rows you fill with your own picks, a bold headline and a "disagree?" line. Edit online, download.',
  description: 'A ranking post built like a game tier list: a bold headline, five coloured rows (S, A, B, C and an optional D) with your picks beside each letter, and a "disagree? tell me why" line. Empty rows disappear.',
  bestFor: ['Ranking tools, products, apps or frameworks', 'Opinion posts that start a comment thread', 'Gaming, tech, food and fitness picks'],
  fonts: { heading: 'g:Bowlby One|48|m', body: 'jakarta' },
  vars: [
    { key: 'bg', label: 'Background', value: '#14161f' },
    { key: 'text', label: 'Text', value: '#f4f4f8' },
    { key: 'accent', label: 'Accent', value: '#ff6b81' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'My honest ranking' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Code editors *tier list*' },
    { key: 's', label: 'S tier picks', type: 'text', value: 'VS Code, Cursor' },
    { key: 'a', label: 'A tier picks', type: 'text', value: 'WebStorm, Zed' },
    { key: 'b', label: 'B tier picks', type: 'text', value: 'Sublime Text, Atom' },
    { key: 'c', label: 'C tier picks', type: 'text', value: 'Notepad++, Brackets' },
    { key: 'd', label: 'D tier picks (optional)', type: 'text', value: 'Notepad' },
    { key: 'cta', label: 'Prompt', type: 'text', value: 'Disagree? Tell me where yours goes ↓' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="tl">
  <div class="tl-head">
    <span class="tl-label" data-edit="label"></span>
    <h2 class="tl-title" data-edit="title" data-fit></h2>
  </div>
  <div class="tl-rows" data-fit-box>
    <div class="tl-row tl-s" data-anim="slide-r" data-at="0.3"><b>S</b><span data-edit="s"></span></div>
    <div class="tl-row tl-a" data-anim="slide-r" data-at="0.6"><b>A</b><span data-edit="a"></span></div>
    <div class="tl-row tl-b" data-anim="slide-r" data-at="0.9"><b>B</b><span data-edit="b"></span></div>
    <div class="tl-row tl-c" data-anim="slide-r" data-at="1.2"><b>C</b><span data-edit="c"></span></div>
    <div class="tl-row tl-d" data-anim="slide-r" data-at="1.5"><b>D</b><span data-edit="d"></span></div>
  </div>
  <div class="tl-foot"><span class="tl-cta" data-edit="cta" data-anim="nudge-x"></span><span class="spt-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="tl-handle" data-edit="handle"></span></span></div>
</div>`,
  css: `.tl{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3.4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 90% 0%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 55%),var(--bg)}
.tl-head{flex:none;display:flex;flex-direction:column;gap:calc(var(--u)*1.6)}
.tl-label{align-self:flex-start;font-size:calc(var(--u)*2.8);font-weight:800;text-transform:uppercase;letter-spacing:.16em;color:var(--accent)}
.tl-title{font-family:var(--font-heading);font-size:calc(var(--u)*9);line-height:1.2;padding-bottom:calc(var(--u)*2);font-weight:400;letter-spacing:-.01em}
.tl-title .hl{color:var(--accent)}
.tl-rows{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*1.4)}
.tl-row{display:flex;align-items:stretch;flex:1 1 0;min-height:0;max-height:calc(var(--u)*15);border-radius:calc(var(--u)*1.6);overflow:hidden;background:color-mix(in srgb,var(--text) 9%,transparent)}
.tl-row b{flex:none;display:flex;align-items:center;justify-content:center;width:calc(var(--u)*14);font-family:var(--font-heading);font-size:calc(var(--u)*7.6);font-weight:400;color:#14161f;line-height:1.3}
.tl-row span{flex:1;display:flex;align-items:center;padding:calc(var(--u)*2.2) calc(var(--u)*3.4);font-size:calc(var(--u)*3.8);font-weight:800;line-height:1.25}
.tl-row:has(> span:empty){display:none}
.tl-s b{background:#ff5f6d}.tl-a b{background:#ffa94d}.tl-b b{background:#ffe066}.tl-c b{background:#8ce99a}.tl-d b{background:#74c0fc}
.tl-foot{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3);font-size:calc(var(--u)*3.2);font-weight:700}
.tl-cta{color:var(--accent)}
.tl-handle{flex:none;white-space:nowrap;opacity:.8}
.is-landscape .tl{gap:calc(var(--u)*2.2)}
.is-landscape .tl-title{font-size:calc(var(--u)*6.4)}
.is-landscape .tl-row b{width:calc(var(--u)*9);font-size:calc(var(--u)*5)}
.is-landscape .tl-row span{padding:calc(var(--u)*1) calc(var(--u)*2.6);font-size:calc(var(--u)*3)}
.is-story .tl{gap:calc(var(--u)*5)}
.is-story .tl-title{font-size:calc(var(--u)*11)}
.is-story .tl-row{max-height:calc(var(--u)*22)}
.is-story .tl-row b{width:calc(var(--u)*20);font-size:calc(var(--u)*11)}
.is-story .tl-row span{font-size:calc(var(--u)*5.4)}`,
};
