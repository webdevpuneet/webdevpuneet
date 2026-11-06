// Dhanteras (Dhantrayodashi), the first day of Diwali: the day to buy gold, silver and new utensils. A brass kalash
// heaped with gold coins, two diyas, gold coins drifting down and a festive offer chip.
//
// The date updates itself: DHANTERAS_DATES lists the date for each year (Dhantrayodashi, usually two days before
// Lakshmi Puja), and the label and the SEO title use the next one still to come, so after Dhanteras 2026 the template
// says 2027 without anyone editing it. Check a panchang before adding a new year to the list.
export const DHANTERAS_DATES = {
  2026: [11, 6], // Friday 6 November 2026
  2027: [10, 27],
  2028: [10, 15],
  2029: [11, 3],
  2030: [10, 24],
};
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** The next Dhanteras that has not passed yet (the day itself still counts), as { year, date } */
export function nextDhanteras(now = new Date()) {
  const years = Object.keys(DHANTERAS_DATES).map(Number).sort((a, b) => a - b);
  for (const y of years) {
    const [m, d] = DHANTERAS_DATES[y];
    if (new Date(y, m - 1, d, 23, 59, 59) >= now) return { year: y, date: new Date(y, m - 1, d) };
  }
  const y = years[years.length - 1];
  const [m, d] = DHANTERAS_DATES[y];
  return { year: y, date: new Date(y, m - 1, d) };
}
const NEXT = nextDhanteras();
const DATE_LABEL = `${DAYS[NEXT.date.getDay()]} ${NEXT.date.getDate()} ${MONTHS[NEXT.date.getMonth()]} ${NEXT.year}`;

// Gold coins that drift down behind the text (data-anim="fall"), each starting at its own height
const RAIN = Array.from({ length: 9 }, () => '<i data-anim="fall"><b>₹</b></i>').join('');

export default {
  id: 'dhanteras',
  name: 'Dhanteras',
  version: '1.0.0',
  category: 'holidays',
  tags: ['dhanteras', 'dhantrayodashi', 'diwali', 'gold', 'jewellery', 'india', 'offer', 'kalash'],
  created: '2026-11-06',
  updated: '2026-11-06',
  seoTitle: `Dhanteras ${NEXT.year} Post Template — Free Gold Coin Greeting`,
  seoDescription: `Free Dhanteras ${NEXT.year} post template: a brass kalash heaped with gold coins, glowing diyas, falling coins and an offer chip for jewellery and festive sales.`,
  description: `A Dhanteras greeting for ${DATE_LABEL}: a brass kalash heaped with gold coins between two glowing diyas, gold coins drifting down a deep maroon sky, "Shubh Dhanteras" in Hindi and English, a warm message, an optional offer chip for gold, silver or festive sales, your handle and logo. The date updates to the next Dhanteras by itself.`,
  bestFor: ['Jewellers and gold, silver and coin sellers', 'Electronics, utensil and home stores running Dhanteras offers', 'Brands and offices sending festive greetings before Diwali'],
  fonts: { heading: 'g:Cinzel|79|e', body: 'g:Hind|467|s' },
  vars: [
    { key: 'bg', label: 'Sky (top)', value: '#2b0716' },
    { key: 'bg2', label: 'Sky (bottom)', value: '#6e1a1f' },
    { key: 'text', label: 'Text', value: '#fff4dc' },
    { key: 'accent', label: 'Gold', value: '#f5c542' },
    { key: 'btn', label: 'Offer chip', value: '#f5c542' },
    { key: 'btnText', label: 'Offer chip text', value: '#3a1500' },
  ],
  fields: [
    { key: 'label', label: 'Label (date)', type: 'text', value: `Dhanteras · ${DATE_LABEL}` },
    { key: 'hindi', label: 'Hindi greeting (optional)', type: 'text', value: 'शुभ धनतेरस' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Happy *Dhanteras*' },
    { key: 'message', label: 'Message', type: 'textarea', value: 'May this Dhanteras fill your home with health, wealth and golden new beginnings.' },
    { key: 'offer', label: 'Offer (optional)', type: 'text', value: 'Gold & silver · 0% making charges today' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="dt">
  <div class="dt-rain" aria-hidden="true">${RAIN}</div>
  <span class="dt-label" data-edit="label"></span>
  <div class="dt-body" data-fit-box>
    <p class="dt-hindi" data-edit="hindi"></p>
    <h2 class="dt-title" data-edit="title" data-fit></h2>
    <p class="dt-message" data-edit="message" data-fit></p>
    <span class="dt-offer" data-edit="offer"></span>
  </div>
  <div class="dt-scene" aria-hidden="true">
    <span class="dt-diya"><b data-anim="flicker"></b></span>
    <div class="dt-kalash">
      <span class="dt-glow" data-anim="breathe"></span>
      <span class="dt-leaves"><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <span class="dt-foot"></span>
      <span class="dt-pot"><em></em></span>
      <span class="dt-neck"></span>
      <span class="dt-rim"></span>
      <span class="dt-pile"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <span class="dt-spark" data-anim="twinkle"></span><span class="dt-spark" data-anim="twinkle"></span><span class="dt-spark" data-anim="twinkle"></span>
    </div>
    <span class="dt-diya"><b data-anim="flicker"></b></span>
  </div>
  <span class="spt-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="dt-handle" data-edit="handle"></span></span>
</div>`,
  css: `.dt{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:calc(var(--u)*3);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(ellipse at 50% 88%,color-mix(in srgb,var(--accent) 34%,transparent),transparent 55%),linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%);overflow:hidden}
.dt>*:not(.dt-rain){position:relative}
.dt-rain{position:absolute;inset:0;pointer-events:none}
.dt-rain i{position:absolute;display:grid;place-items:center;width:calc(var(--u)*5.2);height:calc(var(--u)*5.2);border-radius:50%;opacity:.85;background:radial-gradient(circle at 35% 30%,#fff6cf 0 14%,var(--accent) 46%,#b8800e 100%);box-shadow:inset 0 0 0 calc(var(--u)*.45) rgba(122,74,6,.45),0 0 calc(var(--u)*2.4) color-mix(in srgb,var(--accent) 45%,transparent)}
.dt-rain b{font:700 calc(var(--u)*2.7)/1 var(--font-body);color:#7a4a06}
.dt-rain i:nth-child(1){left:5%;top:9%}.dt-rain i:nth-child(2){left:88%;top:5%}.dt-rain i:nth-child(3){left:11%;top:34%;transform:scale(.7)}
.dt-rain i:nth-child(4){left:84%;top:28%;transform:scale(.8)}.dt-rain i:nth-child(5){left:3%;top:58%;transform:scale(.6)}.dt-rain i:nth-child(6){left:91%;top:52%;transform:scale(.7)}
.dt-rain i:nth-child(7){left:14%;top:76%;transform:scale(.55)}.dt-rain i:nth-child(8){left:80%;top:72%;transform:scale(.6)}.dt-rain i:nth-child(9){left:94%;top:86%;transform:scale(.5)}
.dt-label{font-size:calc(var(--u)*2.8);font-weight:600;text-transform:uppercase;letter-spacing:.26em;color:var(--accent);padding-left:.26em}
.dt-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2.4)}
.dt-hindi{font-size:calc(var(--u)*6);font-weight:700;line-height:1.2;color:var(--accent)}
.dt-hindi:empty{display:none}
.dt-title{font-family:var(--font-heading);font-size:calc(var(--u)*11.5);line-height:1.04;font-weight:700;letter-spacing:.01em;text-shadow:0 calc(var(--u)*.8) calc(var(--u)*3.4) rgba(0,0,0,.4)}
.dt-title .hl{color:var(--accent)}
.dt-message{font-size:calc(var(--u)*3.5);line-height:1.5;opacity:.92;max-width:86%}
.dt-offer{font-size:calc(var(--u)*3.1);font-weight:700;color:var(--btnText);background:linear-gradient(90deg,var(--btn),color-mix(in srgb,var(--btn) 68%,#fff));padding:calc(var(--u)*1.8) calc(var(--u)*4.2);border-radius:99px;box-shadow:0 0 calc(var(--u)*4) color-mix(in srgb,var(--accent) 50%,transparent)}
.dt-offer:empty{display:none}
.dt-scene{display:flex;align-items:flex-end;justify-content:center;gap:calc(var(--u)*7)}
.dt-kalash{position:relative;width:calc(var(--u)*30);height:calc(var(--u)*40)}
.dt-glow{position:absolute;left:50%;top:46%;width:calc(var(--u)*46);height:calc(var(--u)*34);margin:calc(var(--u)*-17) 0 0 calc(var(--u)*-23);border-radius:50%;background:radial-gradient(closest-side,color-mix(in srgb,var(--accent) 42%,transparent),transparent)}
/* foot, round belly, neck and a flared lip, all polished brass lit from the upper left */
.dt-foot{position:absolute;left:50%;bottom:0;width:calc(var(--u)*15);height:calc(var(--u)*3);margin-left:calc(var(--u)*-7.5);border-radius:40% 40% 50% 50%/30% 30% 70% 70%;background:linear-gradient(90deg,#7a4a06,#d79a1d 35%,#f7d36a 48%,#b97c10 70%,#6f4206)}
.dt-pot{position:absolute;left:0;bottom:calc(var(--u)*2.2);width:100%;height:calc(var(--u)*20);border-radius:50% 50% 47% 47%/56% 56% 44% 44%;background:radial-gradient(ellipse at 32% 30%,#fff3c4 0 6%,#f7cf55 20%,#d6981a 48%,#9a6209 78%,#5f3905 100%);box-shadow:inset calc(var(--u)*-1.6) calc(var(--u)*-1.4) calc(var(--u)*3) rgba(60,30,0,.45),0 calc(var(--u)*1.6) calc(var(--u)*3) rgba(0,0,0,.38)}
.dt-pot::after{content:'';position:absolute;left:14%;top:16%;width:22%;height:46%;border-radius:50%;background:linear-gradient(160deg,rgba(255,255,255,.55),rgba(255,255,255,0));transform:rotate(18deg);filter:blur(calc(var(--u)*.4))}
.dt-pot em{position:absolute;left:5%;right:5%;top:30%;height:calc(var(--u)*3.4);border-radius:99px;background:radial-gradient(circle,#ffe9a8 0 20%,transparent 24%) 0 50%/calc(var(--u)*3) 100% repeat-x,linear-gradient(180deg,#a3201d,#6a0f12);box-shadow:0 calc(var(--u)*-.5) 0 #f7d36a,0 calc(var(--u)*.5) 0 #f7d36a}
.dt-neck{position:absolute;left:50%;bottom:calc(var(--u)*20.6);width:calc(var(--u)*12.5);height:calc(var(--u)*3.6);margin-left:calc(var(--u)*-6.25);background:linear-gradient(90deg,#7a4a06,#d4951a 30%,#f7d36a 46%,#c0820f 72%,#6f4206)}
.dt-rim{position:absolute;left:50%;bottom:calc(var(--u)*23.4);width:calc(var(--u)*20);height:calc(var(--u)*3.6);margin-left:calc(var(--u)*-10);border-radius:50%;background:radial-gradient(ellipse at 50% 30%,#5f3905 0 34%,#c88a14 36%,#f7d36a 58%,#b97c10 80%,#7a4a06 100%);box-shadow:0 calc(var(--u)*.6) 0 #8a5a06}
/* mango leaves fanning out behind the coins, as on a festival kalash */
.dt-leaves{position:absolute;left:50%;bottom:calc(var(--u)*27);width:0;height:0}
.dt-leaves i{position:absolute;left:calc(var(--u)*-2.1);bottom:0;width:calc(var(--u)*4.2);height:calc(var(--u)*13);border-radius:50% 50% 50% 50%/80% 80% 20% 20%;background:linear-gradient(90deg,#14532d,#22a04b 48%,#15803d 52%,#0f3d22);transform-origin:50% 100%}
.dt-leaves i:nth-child(1){transform:rotate(-78deg)}.dt-leaves i:nth-child(2){transform:rotate(-46deg)}.dt-leaves i:nth-child(3){transform:rotate(-14deg)}.dt-leaves i:nth-child(4){transform:rotate(18deg)}.dt-leaves i:nth-child(5){transform:rotate(50deg)}.dt-leaves i:nth-child(6){transform:rotate(80deg)}
.dt-pile{position:absolute;left:50%;bottom:calc(var(--u)*24.6);width:calc(var(--u)*26);height:calc(var(--u)*13);margin-left:calc(var(--u)*-13)}
/* the first four lie flat in the mouth of the pot; the last three stand up facing you, stamped with ₹ */
.dt-pile i{position:absolute;display:grid;place-items:center;border-radius:50%}
.dt-pile i:nth-child(-n+4){width:calc(var(--u)*8);height:calc(var(--u)*2.8);bottom:0;background:radial-gradient(ellipse at 40% 35%,#fff6cf 0 14%,#f5c542 46%,#b8800e 100%);box-shadow:0 calc(var(--u)*.4) 0 #8a5a06}
.dt-pile i:nth-child(1){left:4%}.dt-pile i:nth-child(2){left:27%;bottom:calc(var(--u)*.8)}.dt-pile i:nth-child(3){left:50%;bottom:calc(var(--u)*.6)}.dt-pile i:nth-child(4){left:70%}
.dt-pile i:nth-child(n+5){width:calc(var(--u)*8.6);height:calc(var(--u)*8.6);background:radial-gradient(circle at 36% 30%,#fff6cf 0 12%,#f5c542 44%,#c48a12 78%,#8a5a06 100%);box-shadow:inset 0 0 0 calc(var(--u)*.55) #d69e1c,inset 0 0 0 calc(var(--u)*.95) #fff1b8,0 calc(var(--u)*.7) calc(var(--u)*1.4) rgba(0,0,0,.35)}
.dt-pile i:nth-child(n+5)::after{content:'₹';font:700 calc(var(--u)*4.4)/1 var(--font-body);color:#8a5a06;text-shadow:0 calc(var(--u)*.15) 0 #fff1b8}
.dt-pile i:nth-child(5){left:14%;bottom:calc(var(--u)*1.2);transform:rotate(-16deg)}
.dt-pile i:nth-child(6){left:56%;bottom:calc(var(--u)*1.4);transform:rotate(14deg)}
.dt-pile i:nth-child(7){left:34%;bottom:calc(var(--u)*3.4);transform:rotate(-3deg) scale(1.08);z-index:1}
.dt-spark{position:absolute;width:calc(var(--u)*2.6);height:calc(var(--u)*2.6);background:#fff6cf;clip-path:polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%);filter:drop-shadow(0 0 calc(var(--u)*.8) #ffe28a)}
.dt-spark:nth-of-type(1){left:4%;top:18%}.dt-spark:nth-of-type(2){right:2%;top:30%}.dt-spark:nth-of-type(3){left:46%;top:-6%}
.dt-diya{position:relative;display:block;width:calc(var(--u)*10);height:calc(var(--u)*4.6);margin-bottom:calc(var(--u)*.6);border-radius:0 0 calc(var(--u)*10) calc(var(--u)*10)/0 0 calc(var(--u)*4.6) calc(var(--u)*4.6);background:linear-gradient(180deg,#f59e0b,#9a3412)}
.dt-diya b{position:absolute;left:calc(50% - var(--u)*1.5);bottom:calc(var(--u)*3.9);width:calc(var(--u)*3);height:calc(var(--u)*6);transform-origin:50% 100%;border-radius:50% 50% 50% 50%/62% 62% 38% 38%;background:radial-gradient(ellipse at 50% 72%,#fff7d6 0 24%,#fcd34d 46%,#f97316 100%);box-shadow:0 0 calc(var(--u)*3.6) calc(var(--u)*1.2) rgba(251,191,36,.55)}
.dt-handle{font-size:calc(var(--u)*3.1);font-weight:700;color:var(--accent);letter-spacing:.06em}
.is-square .dt{gap:calc(var(--u)*2.2)}
.is-square .dt-title{font-size:calc(var(--u)*9.4)}
.is-square .dt-hindi{font-size:calc(var(--u)*5)}
.is-square .dt-message{font-size:calc(var(--u)*3.1)}
.is-square .dt-kalash{transform:scale(.78);transform-origin:50% 100%;margin:calc(var(--u)*-6) calc(var(--u)*-3) 0}
.is-story .dt{gap:calc(var(--u)*3.6)}
.is-story .dt-hindi{font-size:calc(var(--u)*7)}
.is-story .dt-title{font-size:calc(var(--u)*13)}
.is-story .dt-message{font-size:calc(var(--u)*4)}
.is-story .dt-offer{font-size:calc(var(--u)*3.5)}
.is-story .dt-handle{font-size:calc(var(--u)*3.5)}
.is-story .dt-scene{gap:calc(var(--u)*8)}
.is-story .dt-kalash{transform:scale(1.15);transform-origin:50% 100%;margin-top:calc(var(--u)*4)}
.is-story .dt-diya{transform:scale(1.2);transform-origin:50% 100%}
.is-landscape .dt{display:grid;grid-template-columns:auto 1fr;grid-template-rows:1fr auto auto auto 1fr;column-gap:calc(var(--u)*7);row-gap:calc(var(--u)*2.2);align-items:center;text-align:left}
.is-landscape .dt-label{grid-column:2;grid-row:2;justify-self:start;padding-left:0}
.is-landscape .dt-body{grid-column:2;grid-row:3;align-items:flex-start;flex:none}
.is-landscape .spt-brand{grid-column:2;grid-row:4;justify-self:start}
.is-landscape .dt-scene{grid-column:1;grid-row:1 / span 5;align-self:center}
.is-landscape .dt-title{font-size:calc(var(--u)*9.6)}
.is-landscape .dt-hindi{font-size:calc(var(--u)*5)}
.is-landscape .dt-message{max-width:100%;font-size:calc(var(--u)*3.1)}
.is-landscape .dt-kalash{transform:scale(1.15);transform-origin:50% 100%;margin-top:calc(var(--u)*5)}`,
};
