const ROWS = [1, 2, 3, 4];
// String lights along a sagging wire: [left %, top %] for each bulb, and its colour
const BULBS = [[4, 2.6, '#facc15'], [16, 6.2, '#f87171'], [28, 8.8, '#4ade80'], [40, 10.3, '#60a5fa'], [52, 10.6, '#facc15'], [64, 9.6, '#f87171'], [76, 7.4, '#4ade80'], [88, 4.2, '#60a5fa']];

export default {
  id: 'holiday-hours',
  name: 'Holiday Hours',
  version: '1.0.0',
  category: 'announcements',
  tags: ['holiday-hours', 'opening-hours', 'closed', 'christmas-hours', 'small-business', 'store-hours', 'notice'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Holiday Hours Post Template — Free "We\'re Closed" Sign Post',
  seoDescription: 'Free holiday hours post template: a hanging shop sign with your dates and opening times, a "back on" stamp and string lights. For Christmas, Eid or any break.',
  description: 'A holiday opening-hours notice styled as an enamel shop sign hanging from a nail on two strings, swinging gently under a line of twinkling string lights: a headline, up to four dates with their hours set like a menu with dotted leaders, a red "back on" stamp, an optional note and your handle and logo.',
  bestFor: ['Christmas and New Year opening hours', 'Closures for Eid, Diwali, Lunar New Year or national holidays', 'Restaurants, shops, salons, clinics and offices'],
  fonts: { heading: 'g:Fraunces|79|e', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Wall', value: '#1d2b3a' },
    { key: 'card', label: 'Sign', value: '#fbf6ea' },
    { key: 'text', label: 'Sign text', value: '#22303e' },
    { key: 'accent', label: 'Stamp and highlights', value: '#c8302c' },
    { key: 'btn', label: 'Wall text', value: '#f3e7cf' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Holiday hours' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'We\'re taking a *little break*' },
    ...ROWS.flatMap((n, i) => [
      { key: `day${n}`, label: `Date ${n}`, type: 'text', value: ['Wed 24 Dec', 'Thu 25 – Fri 26 Dec', 'Wed 31 Dec', 'Thu 1 – Sat 3 Jan'][i] },
      { key: `hours${n}`, label: `Hours ${n}`, type: 'text', value: ['9:00 – 14:00', 'Closed', '9:00 – 16:00', 'Closed'][i] },
    ]),
    { key: 'back', label: 'Stamp', type: 'textarea', value: 'Back on\nMon 4 Jan' },
    { key: 'note', label: 'Note (optional)', type: 'text', value: 'Online orders keep shipping from 2 Jan' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="hh">
  <div class="hh-lights" aria-hidden="true"><div class="hh-wire"></div>${BULBS.map(([x, y, c]) => `<i style="left:${x}%;top:${y}%;--bulb:${c}" data-anim="twinkle"></i>`).join('')}</div>
  <div class="hh-hang" data-anim="sway" data-origin="50% 0">
    <div class="hh-nail" aria-hidden="true"></div>
    <div class="hh-strings" aria-hidden="true"></div>
    <div class="hh-sign" data-fit-box>
      <span class="hh-label" data-edit="label"></span>
      <h2 class="hh-title" data-edit="title" data-fit></h2>
      <div class="hh-rows">${ROWS.map(n => `<p class="hh-row"><span data-edit="day${n}"></span><i aria-hidden="true"></i><b data-edit="hours${n}"></b></p>`).join('')}</div>
    </div>
    <div class="hh-stamp" data-anim="stamp" data-at="1.6"><span data-edit="back"></span></div>
  </div>
  <p class="hh-note" data-edit="note"></p>
  <div class="hh-foot"><div class="hh-logo" data-image="logo" data-image-fit="contain"></div><span class="hh-handle" data-edit="handle"></span></div>
</div>`,
  css: `.hh{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*3);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(ellipse at 50% 40%,color-mix(in srgb,#facc15 10%,transparent),transparent 60%),repeating-linear-gradient(90deg,transparent 0 calc(var(--u)*7.6),rgba(255,255,255,.025) calc(var(--u)*7.6) calc(var(--u)*7.8)),var(--bg);overflow:hidden}
.hh>*:not(.hh-lights){position:relative}
.hh-lights{position:absolute;left:0;right:0;top:calc(var(--safe-top,0px) + var(--u)*1);height:calc(var(--u)*16)}
.hh-wire{position:absolute;left:-6%;right:-6%;top:-40%;height:115%;border-bottom:calc(var(--u)*.35) solid rgba(0,0,0,.55);border-radius:0 0 50% 50%}
.hh-lights i{position:absolute;width:calc(var(--u)*2.4);height:calc(var(--u)*3.6);margin-left:calc(var(--u)*-1.2);border-radius:50% 50% 50% 50%/40% 40% 60% 60%;background:radial-gradient(circle at 40% 35%,#fff 0 18%,var(--bulb) 45%);box-shadow:0 0 calc(var(--u)*3) calc(var(--u)*.8) color-mix(in srgb,var(--bulb) 70%,transparent)}
.hh-lights i::before{content:'';position:absolute;left:30%;top:calc(var(--u)*-1);width:40%;height:calc(var(--u)*1.2);border-radius:calc(var(--u)*.3);background:#3f3f46}
.hh-hang{flex:1;min-height:0;width:84%;display:flex;flex-direction:column;align-items:center;padding-top:calc(var(--u)*7)}
.hh-nail{position:absolute;top:calc(var(--u)*5);left:calc(50% - var(--u)*1.4);width:calc(var(--u)*2.8);height:calc(var(--u)*2.8);border-radius:50%;background:radial-gradient(circle at 35% 35%,#e5e7eb,#52525b);box-shadow:0 calc(var(--u)*.4) calc(var(--u)*.8) rgba(0,0,0,.5);z-index:2}
.hh-strings{position:absolute;top:calc(var(--u)*6.4);left:22%;right:22%;height:calc(var(--u)*7);border-top:0;background:linear-gradient(to bottom right,transparent calc(50% - 1.5px),#d6c7a6 calc(50% - 1.5px) calc(50% + 1.5px),transparent calc(50% + 1.5px)) left/50% 100% no-repeat,linear-gradient(to bottom left,transparent calc(50% - 1.5px),#d6c7a6 calc(50% - 1.5px) calc(50% + 1.5px),transparent calc(50% + 1.5px)) right/50% 100% no-repeat}
.hh-sign{position:relative;flex:1;min-height:0;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2.6);margin-top:calc(var(--u)*6);padding:calc(var(--u)*6) calc(var(--u)*6.4);text-align:center;color:var(--text);background:var(--card);border-radius:calc(var(--u)*3);box-shadow:inset 0 0 0 calc(var(--u)*1.2) var(--card),inset 0 0 0 calc(var(--u)*1.5) color-mix(in srgb,var(--text) 35%,transparent),0 calc(var(--u)*3) calc(var(--u)*6) rgba(0,0,0,.45)}
.hh-sign::before,.hh-sign::after{content:'';position:absolute;top:calc(var(--u)*-1);width:calc(var(--u)*2);height:calc(var(--u)*2);border-radius:50%;background:#a1a1aa;box-shadow:inset 0 0 0 calc(var(--u)*.5) #52525b}
.hh-sign::before{left:24%}.hh-sign::after{right:24%}
.hh-label{font-size:calc(var(--u)*2.9);font-weight:800;letter-spacing:.32em;text-transform:uppercase;color:var(--accent);padding-left:.32em}
.hh-title{font-family:var(--font-heading);font-size:calc(var(--u)*8.4);line-height:1.04;font-weight:700;letter-spacing:-.015em}
.hh-title .hl{color:var(--accent);font-style:italic}
.hh-rows{width:100%;display:flex;flex-direction:column;gap:calc(var(--u)*1.6);margin-top:calc(var(--u)*1)}
.hh-row{display:flex;align-items:baseline;gap:calc(var(--u)*1.6);font-size:calc(var(--u)*3.6);line-height:1.3}
.hh-row:has(span:empty){display:none}
.hh-row span{font-weight:600;text-align:left}
.hh-row i{flex:1;border-bottom:calc(var(--u)*.35) dotted color-mix(in srgb,var(--text) 45%,transparent);transform:translateY(calc(var(--u)*-.6))}
.hh .hh-row b{white-space:nowrap}
.hh-row b{font-weight:800;white-space:nowrap}
.hh-stamp{position:absolute;right:calc(var(--u)*-6);top:calc(var(--u)*7);display:flex;align-items:center;justify-content:center;text-align:center;width:calc(var(--u)*22);height:calc(var(--u)*22);border-radius:50%;border:calc(var(--u)*.7) solid var(--accent);box-shadow:inset 0 0 0 calc(var(--u)*1) var(--card),inset 0 0 0 calc(var(--u)*1.35) var(--accent);color:var(--accent);background:var(--card);font-family:var(--font-heading);font-size:calc(var(--u)*3.2);line-height:1.15;font-weight:800;text-transform:uppercase;letter-spacing:.02em;transform:rotate(12deg);padding:calc(var(--u)*2.2)}
.hh-note{font-size:calc(var(--u)*3.2);line-height:1.4;color:var(--btn);text-align:center;margin-top:calc(var(--u)*2)}
.hh-foot{display:flex;align-items:center;gap:calc(var(--u)*1.8);font-size:calc(var(--u)*3);font-weight:700;color:var(--btn)}
.hh-logo{width:calc(var(--u)*12);height:calc(var(--u)*6)}
.is-square .hh-hang{width:76%;padding-top:calc(var(--u)*6)}
.is-square .hh-sign{gap:calc(var(--u)*1.8);padding:calc(var(--u)*4.4) calc(var(--u)*5.6);margin-top:calc(var(--u)*5)}
.is-square .hh-title{font-size:calc(var(--u)*6.6)}
.is-square .hh-row{font-size:calc(var(--u)*3.1)}
.is-square .hh-rows{gap:calc(var(--u)*1)}
.is-square .hh-stamp{width:calc(var(--u)*18);height:calc(var(--u)*18);font-size:calc(var(--u)*2.6);top:calc(var(--u)*5)}
.is-story .hh-hang{padding-top:calc(var(--u)*9)}
.is-story .hh-title{font-size:calc(var(--u)*9.4)}
.is-story .hh-row{font-size:calc(var(--u)*4)}
.is-landscape .hh-hang{width:60%;padding-top:calc(var(--u)*6)}
.is-landscape .hh-sign{gap:calc(var(--u)*1.6);padding:calc(var(--u)*4) calc(var(--u)*6);margin-top:calc(var(--u)*5)}
.is-landscape .hh-title{font-size:calc(var(--u)*6.4)}
.is-landscape .hh-row{font-size:calc(var(--u)*3)}
.is-landscape .hh-rows{gap:calc(var(--u)*.8)}
.is-landscape .hh-stamp{width:calc(var(--u)*19);height:calc(var(--u)*19);font-size:calc(var(--u)*2.8);right:calc(var(--u)*-10);top:calc(var(--u)*4)}
.is-landscape .hh{gap:calc(var(--u)*1.6)}`,
};
