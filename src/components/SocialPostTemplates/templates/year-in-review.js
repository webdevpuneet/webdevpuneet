// Starburst behind the year (a 16-point star as an inline SVG mask, so it recolours with the accent)
const STAR = `url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon points='50,0 57,28 79,10 68,36 98,32 74,50 98,68 68,64 79,90 57,72 50,100 43,72 21,90 32,64 2,68 26,50 2,32 32,36 21,10 43,28'/></svg>")}")`;

export default {
  id: 'year-in-review',
  name: 'Year in Review',
  version: '1.0.0',
  category: 'announcements',
  tags: ['year-in-review', 'wrapped', 'recap', 'stats', 'milestone', 'thank-you', 'december', 'colourful'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Year in Review Post Template — Free "Wrapped" Stats Graphic',
  seoDescription: 'Free year in review post template in a bold "wrapped" style: a giant outlined year, three colour stat tiles that count up as they slide in and a thank-you line.',
  description: 'A bold "wrapped"-style year-in-review post: a giant outlined year with a spinning starburst, a headline, three colour-block stat tiles (one wide, two side by side) whose numbers count up as they slide in from different sides, a thank-you line, your handle and logo.',
  bestFor: ['End-of-year recaps for brands, shops and creators', 'SaaS and app "your year in numbers" posts', 'Nonprofit impact and annual report highlights'],
  fonts: { heading: 'g:Archivo Black|4|s', body: 'space' },
  vars: [
    { key: 'bg', label: 'Background', value: '#1b1035' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Tile 1 / year', value: '#c8ff3d' },
    { key: 'accent2', label: 'Tile 2', value: '#ff5ca8' },
    { key: 'accent3', label: 'Tile 3', value: '#ffb020' },
    { key: 'btnText', label: 'Tile text', value: '#1b1035' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Year in review' },
    { key: 'year', label: 'Year', type: 'text', value: '2026' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Our year in *numbers*' },
    { key: 'stat1', label: 'Stat 1 number', type: 'text', value: '12,480' },
    { key: 'stat1Label', label: 'Stat 1 label', type: 'text', value: 'orders packed by hand' },
    { key: 'stat2', label: 'Stat 2 number', type: 'text', value: '38' },
    { key: 'stat2Label', label: 'Stat 2 label', type: 'text', value: 'countries shipped to' },
    { key: 'stat3', label: 'Stat 3 number', type: 'text', value: '4.9★' },
    { key: 'stat3Label', label: 'Stat 3 label', type: 'text', value: 'average review' },
    { key: 'thanks', label: 'Thank-you line', type: 'text', value: 'Thank you for being part of it.' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="yr">
  <div class="yr-star" aria-hidden="true" data-anim="spin"></div>
  <div class="yr-head">
    <span class="yr-label" data-edit="label"></span>
    <p class="yr-year" data-edit="year" data-fit></p>
    <h2 class="yr-title" data-edit="title"></h2>
  </div>
  <div class="yr-tiles" data-fit-box>
    <div class="yr-tile yr-t1" data-anim="slide-l"><p class="yr-num" data-edit="stat1" data-anim="count"></p><p class="yr-cap" data-edit="stat1Label"></p></div>
    <div class="yr-tile yr-t2" data-anim="slide-b"><p class="yr-num" data-edit="stat2" data-anim="count"></p><p class="yr-cap" data-edit="stat2Label"></p></div>
    <div class="yr-tile yr-t3" data-anim="slide-r"><p class="yr-num" data-edit="stat3" data-anim="count"></p><p class="yr-cap" data-edit="stat3Label"></p></div>
  </div>
  <div class="yr-foot"><p class="yr-thanks" data-edit="thanks"></p><div class="yr-brand"><div class="yr-logo" data-image="logo" data-image-fit="contain"></div><span class="yr-handle" data-edit="handle"></span></div></div>
</div>`,
  css: `.yr{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3.6);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 85% 8%,color-mix(in srgb,var(--accent2) 30%,transparent),transparent 40%),radial-gradient(circle at 0% 100%,color-mix(in srgb,var(--accent) 16%,transparent),transparent 45%),var(--bg);overflow:hidden}
.yr>*:not(.yr-star){position:relative}
.yr-star{position:absolute;right:calc(var(--u)*-20);top:calc(var(--safe-top,0px) + var(--u)*-14);width:calc(var(--u)*52);height:calc(var(--u)*52);background:var(--accent2);opacity:.9;-webkit-mask:${STAR} center/contain no-repeat;mask:${STAR} center/contain no-repeat}
.yr-head{display:flex;flex-direction:column;align-items:flex-start;gap:calc(var(--u)*1.6)}
.yr-label{font-size:calc(var(--u)*2.8);font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:var(--btnText);background:var(--accent);padding:calc(var(--u)*1) calc(var(--u)*2.4);border-radius:99px}
.yr .yr-year,.yr .yr-num{white-space:nowrap}
.yr-year{font-family:var(--font-heading);font-size:calc(var(--u)*26);line-height:.86;letter-spacing:-.04em;color:transparent;-webkit-text-stroke:calc(var(--u)*.5) var(--accent);white-space:nowrap;margin-left:calc(var(--u)*-1)}
.yr-title{font-family:var(--font-heading);font-size:calc(var(--u)*8.4);line-height:1;letter-spacing:-.02em;color:var(--text)}
.yr-title .hl{color:var(--accent)}
.yr-tiles{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:calc(var(--u)*2.6)}
.yr-tile{display:flex;flex-direction:column;justify-content:flex-end;gap:calc(var(--u)*.6);padding:calc(var(--u)*3.6) calc(var(--u)*4);border-radius:calc(var(--u)*3.4);color:var(--btnText);min-height:0;overflow:hidden}
.yr-t1{grid-column:1 / -1;background:var(--accent)}
.yr-t2{background:var(--accent2);border-radius:calc(var(--u)*3.4) calc(var(--u)*3.4) calc(var(--u)*3.4) calc(var(--u)*12)}
.yr-t3{background:var(--accent3)}
.yr-num{font-family:var(--font-heading);font-size:calc(var(--u)*12);line-height:.95;letter-spacing:-.03em;white-space:nowrap}
.yr-t2 .yr-num,.yr-t3 .yr-num{font-size:calc(var(--u)*9)}
.yr-cap{font-size:calc(var(--u)*3.3);font-weight:700;line-height:1.25}
.yr-foot{display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3)}
.yr-thanks{font-size:calc(var(--u)*3.4);font-weight:700;color:var(--text)}
.yr-brand{display:flex;align-items:center;gap:calc(var(--u)*1.6);flex:none}
.yr-logo{width:calc(var(--u)*12);height:calc(var(--u)*6);background-position:right center}
.yr-handle{font-size:calc(var(--u)*3);font-weight:700;color:var(--accent)}
.is-square .yr{gap:calc(var(--u)*2.6)}
.is-square .yr-year{font-size:calc(var(--u)*22)}
.is-square .yr-title{font-size:calc(var(--u)*6.6)}
.is-square .yr-num{font-size:calc(var(--u)*10)}
.is-square .yr-t2 .yr-num,.is-square .yr-t3 .yr-num{font-size:calc(var(--u)*8)}
.is-square .yr-tile{padding:calc(var(--u)*2.6) calc(var(--u)*3.4)}
.is-story .yr-year{font-size:calc(var(--u)*27)}
.is-story .yr-title{font-size:calc(var(--u)*9.4)}
.is-story .yr-num{font-size:calc(var(--u)*12.5)}
.is-story .yr-t2 .yr-num,.is-story .yr-t3 .yr-num{font-size:calc(var(--u)*9.5)}
.is-landscape .yr{display:grid;grid-template-columns:44% 1fr;grid-template-rows:1fr auto;column-gap:calc(var(--u)*5);row-gap:calc(var(--u)*3)}
.is-landscape .yr-head{grid-column:1;grid-row:1;justify-content:center}
.is-landscape .yr-tiles{grid-column:2;grid-row:1}
.is-landscape .yr-foot{grid-column:1 / -1;grid-row:2}
.is-landscape .yr-year{font-size:calc(var(--u)*22)}
.is-landscape .yr-title{font-size:calc(var(--u)*7)}
.is-landscape .yr-num{font-size:calc(var(--u)*10)}
.is-landscape .yr-t2 .yr-num,.is-landscape .yr-t3 .yr-num{font-size:calc(var(--u)*8)}
.is-landscape .yr-tile{padding:calc(var(--u)*2.6) calc(var(--u)*3.4)}
.is-landscape .yr-star{right:auto;left:calc(var(--u)*-22);top:calc(var(--u)*-22);bottom:auto}`,
};
