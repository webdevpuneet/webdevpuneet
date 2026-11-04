// The wall of 24 small doors behind the card (decoration). Opened doors show a star that twinkles.
const OPEN = new Set([3, 6, 11, 14, 19, 22]);
const DOORS = Array.from({ length: 24 }, (_, i) => i + 1)
  .map(n => `<i class="${OPEN.has(n) ? 'ac-open' : ''}">${OPEN.has(n) ? '<b data-anim="twinkle">&#9733;</b>' : n}</i>`).join('');

export default {
  id: 'advent-calendar',
  name: 'Advent Calendar Deal',
  version: '1.0.0',
  category: 'promo',
  tags: ['advent-calendar', '12-days-of-christmas', 'daily-deal', 'december', 'christmas', 'promo-code', 'series'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Advent Calendar Post Template — Free Daily Deal Graphic',
  seoDescription: 'Free advent calendar post template for 24 (or 12) days of deals: a wall of little doors, today\'s door as a red and gold card, the day number, deal and code.',
  description: 'A daily-deal post for an advent calendar or "12 days of Christmas" campaign: a pine-green wall of 24 numbered doors, today\'s door in front as a red card with a gold frame and bow, the day number ticking up to today, the deal, a code line and a reminder that a new door opens tomorrow.',
  bestFor: ['24 days of deals from 1 to 24 December', '"12 days of Christmas" product drops', 'Daily giveaways, tips or recipes in December'],
  fonts: { heading: 'playfair', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Wall', value: '#123d2b' },
    { key: 'card', label: 'Door', value: '#b4182d' },
    { key: 'text', label: 'Text', value: '#fff7ea' },
    { key: 'accent', label: 'Gold', value: '#f2c66d' },
    { key: 'btn', label: 'Code chip', value: '#f2c66d' },
    { key: 'btnText', label: 'Code text', value: '#3d0a12' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Advent calendar · 24 days of deals' },
    { key: 'dayLabel', label: 'Day word', type: 'text', value: 'Day' },
    { key: 'day', label: 'Day number', type: 'text', value: '7' },
    { key: 'deal', label: 'Today\'s deal', type: 'textarea', value: '*20% off* every candle' },
    { key: 'code', label: 'Code or detail', type: 'text', value: 'Today only · code DAY7' },
    { key: 'note', label: 'Note', type: 'text', value: 'A new door opens every morning until 24 December' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="ac">
  <div class="ac-wall" aria-hidden="true">${DOORS}</div>
  <div class="ac-snow" aria-hidden="true"><i data-anim="fall"></i><i data-anim="fall"></i><i data-anim="fall"></i><i data-anim="fall"></i><i data-anim="fall"></i><i data-anim="fall"></i><i data-anim="fall"></i></div>
  <span class="ac-label" data-edit="label"></span>
  <div class="ac-door" data-fit-box>
    <div class="ac-bow" aria-hidden="true"><i></i><i></i><b></b></div>
    <p class="ac-day"><span class="ac-dayword" data-edit="dayLabel"></span><span class="ac-num" data-edit="day" data-anim="count"></span></p>
    <h2 class="ac-deal" data-edit="deal" data-fit></h2>
    <span class="ac-code" data-edit="code"></span>
  </div>
  <p class="ac-note" data-edit="note"></p>
  <div class="ac-foot"><div class="ac-logo" data-image="logo" data-image-fit="contain"></div><span class="ac-handle" data-edit="handle"></span></div>
</div>`,
  css: `.ac{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:calc(var(--u)*3.4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(ellipse at 50% 45%,color-mix(in srgb,var(--accent) 16%,transparent),transparent 60%),var(--bg);overflow:hidden}
.ac>*:not(.ac-wall):not(.ac-snow){position:relative}
.ac-wall{position:absolute;inset:calc(var(--u)*-2);display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:1fr;gap:calc(var(--u)*2);padding:calc(var(--u)*2);opacity:.38}
.ac-wall i{display:flex;align-items:flex-start;justify-content:flex-start;padding:calc(var(--u)*1.4);border:2px solid color-mix(in srgb,var(--accent) 55%,transparent);border-radius:calc(var(--u)*1.4);font-family:var(--font-heading);font-style:normal;font-size:calc(var(--u)*4.6);font-weight:700;color:var(--accent)}
.ac-wall i.ac-open{align-items:center;justify-content:center;background:color-mix(in srgb,var(--accent) 22%,transparent)}
.ac-wall b{font-size:calc(var(--u)*6);color:var(--accent)}
.ac-snow i{position:absolute;width:calc(var(--u)*1.4);height:calc(var(--u)*1.4);border-radius:50%;background:#fff;opacity:.75}
.ac-snow i:nth-child(1){left:8%;top:6%}.ac-snow i:nth-child(2){left:28%;top:30%;width:calc(var(--u)*1)}.ac-snow i:nth-child(3){left:52%;top:12%}.ac-snow i:nth-child(4){left:74%;top:44%;width:calc(var(--u)*1.8);height:calc(var(--u)*1.8)}.ac-snow i:nth-child(5){left:90%;top:20%}.ac-snow i:nth-child(6){left:16%;top:64%;width:calc(var(--u)*1)}.ac-snow i:nth-child(7){left:64%;top:78%}
.ac-label{font-size:calc(var(--u)*2.9);font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);background:color-mix(in srgb,var(--bg) 80%,transparent);padding:calc(var(--u)*1) calc(var(--u)*2.4);border-radius:99px}
.ac-door{flex:1;min-height:0;width:86%;margin-top:calc(var(--u)*2.4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2.6);padding:calc(var(--u)*11) calc(var(--u)*6) calc(var(--u)*6);background:radial-gradient(circle at 50% 18%,color-mix(in srgb,#fff 14%,var(--card)),var(--card) 62%,color-mix(in srgb,var(--card) 70%,#000));border-radius:calc(var(--u)*3);box-shadow:inset 0 0 0 calc(var(--u)*1) var(--card),inset 0 0 0 calc(var(--u)*1.5) var(--accent),inset 0 0 0 calc(var(--u)*2.4) var(--card),inset 0 0 0 calc(var(--u)*2.7) color-mix(in srgb,var(--accent) 70%,transparent),0 calc(var(--u)*2.4) calc(var(--u)*6) rgba(0,0,0,.45);overflow:visible!important}
.ac-bow{position:absolute;left:50%;top:calc(var(--u)*-4.4);width:calc(var(--u)*22);height:calc(var(--u)*9);margin-left:calc(var(--u)*-11)}
.ac-bow i{position:absolute;top:0;width:calc(var(--u)*10);height:calc(var(--u)*8);border:calc(var(--u)*1.6) solid var(--accent);border-radius:50% 50% 50% 50%/60% 60% 40% 40%}
.ac-bow i:nth-child(1){left:0;rotate:-18deg}.ac-bow i:nth-child(2){right:0;rotate:18deg}
.ac-bow b{position:absolute;left:50%;top:calc(var(--u)*2.2);width:calc(var(--u)*4.4);height:calc(var(--u)*4.4);margin-left:calc(var(--u)*-2.2);border-radius:calc(var(--u)*1);background:var(--accent)}
.ac-day{display:flex;flex-direction:column;align-items:center;line-height:.9;color:var(--accent)}
.ac-dayword{font-size:calc(var(--u)*3.6);font-weight:700;letter-spacing:.4em;text-transform:uppercase;padding-left:.4em}
.ac-num{font-family:var(--font-heading);font-size:calc(var(--u)*30);font-weight:800;line-height:1;text-shadow:0 calc(var(--u)*.6) 0 color-mix(in srgb,var(--card) 50%,#000)}
.ac-deal{font-family:var(--font-heading);font-size:calc(var(--u)*8);line-height:1.08;font-weight:700;color:var(--text)}
.ac-deal .hl{color:var(--accent);font-style:italic}
.ac-code{font-size:calc(var(--u)*3.3);font-weight:800;letter-spacing:.04em;color:var(--btnText);background:var(--btn);padding:calc(var(--u)*1.6) calc(var(--u)*4);border-radius:99px}
.ac-note{font-size:calc(var(--u)*3.1);line-height:1.4;color:var(--text);max-width:86%;background:color-mix(in srgb,var(--bg) 82%,transparent);padding:calc(var(--u)*1) calc(var(--u)*2.6);border-radius:calc(var(--u)*2)}
.ac-foot{display:flex;align-items:center;gap:calc(var(--u)*1.8);font-size:calc(var(--u)*3);font-weight:700;color:var(--accent);background:color-mix(in srgb,var(--bg) 82%,transparent);padding:calc(var(--u)*.8) calc(var(--u)*2.4);border-radius:99px}
.ac-logo{width:calc(var(--u)*12);height:calc(var(--u)*6)}
.is-square .ac-num{font-size:calc(var(--u)*20)}
.is-square .ac-deal{font-size:calc(var(--u)*6.4)}
.is-square .ac-door{padding:calc(var(--u)*7) calc(var(--u)*5) calc(var(--u)*4);gap:calc(var(--u)*1.8)}
.is-square .ac{gap:calc(var(--u)*2.6)}
.is-story .ac-wall{grid-template-columns:repeat(4,1fr)}
.is-story .ac-num{font-size:calc(var(--u)*26)}
.is-story .ac-deal{font-size:calc(var(--u)*9)}
.is-landscape .ac-wall{grid-template-columns:repeat(8,1fr)}
.is-landscape .ac-door{width:62%;padding:calc(var(--u)*7) calc(var(--u)*5) calc(var(--u)*4);gap:calc(var(--u)*1.6)}
.is-landscape .ac-num{font-size:calc(var(--u)*18)}
.is-landscape .ac-deal{font-size:calc(var(--u)*6.4)}
.is-landscape .ac{gap:calc(var(--u)*2.4)}`,
};
