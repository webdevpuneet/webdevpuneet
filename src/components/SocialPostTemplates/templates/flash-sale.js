export default {
  id: 'flash-sale',
  name: 'Flash Sale Countdown',
  version: '1.0.0',
  category: 'promo',
  tags: ['flash sale', 'countdown', 'timer', 'limited time', 'discount', 'promo code', 'urgency', 'dark'],
  created: '2026-11-19',
  updated: '2026-11-19',
  seoTitle: 'Flash Sale Post Template — Countdown Timer and Code',
  seoDescription: 'Free flash sale post template with a lightning bolt, a big discount, a ticking stopwatch, hours-minutes-seconds timer tiles and a promo code. Edit and export.',
  description: 'An electric short-deal post: a slanted Flash Sale headline, a lightning bolt that flashes, a giant discount that counts up, an "ends in" timer with hours, minutes and seconds tiles that count down, a ticking stopwatch, a promo code and a note line, with speed lines racing behind.',
  bestFor: ['24-hour and same-day sales', 'Weekend or lunch-hour deals with a hard end time', 'Last-chance reminders for a running sale'],
  fonts: { heading: 'bebas', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#140c33' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Bolt and discount', value: '#ffe14a' },
    { key: 'pop', label: 'Accent 2', value: '#ff2e88' },
  ],
  fields: [
    { key: 'kicker', label: 'Top label', type: 'text', value: 'Today only' },
    { key: 'title', label: 'Headline', type: 'text', value: 'Flash *sale*' },
    { key: 'off', label: 'Discount', type: 'text', value: '50%' },
    { key: 'offSub', label: 'Discount line', type: 'textarea', value: 'OFF\nEVERYTHING' },
    { key: 'ends', label: 'Timer label', type: 'text', value: 'Ends in' },
    { key: 'hh', label: 'Hours', type: 'text', value: '05' },
    { key: 'mm', label: 'Minutes', type: 'text', value: '17' },
    { key: 'ss', label: 'Seconds', type: 'text', value: '42' },
    { key: 'code', label: 'Promo code', type: 'text', value: 'FLASH50' },
    { key: 'note', label: 'Note', type: 'text', value: 'Free shipping on every order · Tonight 11:59 PM' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="fs">
  <div class="fs-speed" aria-hidden="true" data-anim="scroll-bg"></div>
  <i class="fs-bolt" aria-hidden="true" data-anim="zap"></i>
  <div class="fs-top">
    <span class="fs-kicker-wrap" data-anim="shake"><span class="fs-kicker" data-edit="kicker"></span></span>
    <span class="spt-brand fs-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="fs-handle" data-edit="handle"></span></span>
  </div>
  <div class="fs-title-box" data-fit-box><h2 class="fs-title" data-edit="title" data-fit></h2></div>
  <div class="fs-offer">
    <span class="fs-off" data-edit="off" data-anim="count"></span>
    <span class="fs-offsub" data-edit="offSub"></span>
  </div>
  <div class="fs-timer" data-anim="shake">
    <div class="fs-watch" aria-hidden="true"><i class="fs-crown"></i><i class="fs-hand" data-anim="tock"></i><i class="fs-pin"></i></div>
    <div class="fs-clock">
      <span class="fs-ends" data-edit="ends"></span>
      <div class="fs-tiles">
        <span class="fs-tile"><b data-edit="hh"></b><small>HRS</small></span><i class="fs-colon" aria-hidden="true" data-anim="blink">:</i>
        <span class="fs-tile"><b data-edit="mm" data-anim="countdown"></b><small>MIN</small></span><i class="fs-colon" aria-hidden="true" data-anim="blink">:</i>
        <span class="fs-tile"><b data-edit="ss" data-anim="countdown"></b><small>SEC</small></span>
      </div>
    </div>
  </div>
  <div class="fs-foot">
    <span class="fs-code"><small>CODE</small><b data-edit="code" data-anim="pulse"></b></span>
    <span class="fs-note" data-edit="note"></span>
  </div>
</div>`,
  css: `.fs{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 80% 38%,color-mix(in srgb,var(--pop) 42%,transparent),transparent 42%),radial-gradient(circle at 0 100%,color-mix(in srgb,var(--accent) 16%,transparent),transparent 40%),var(--bg);color:var(--text);overflow:hidden}
.fs-speed{position:absolute;inset:-10%;pointer-events:none;opacity:.5;background:repeating-linear-gradient(-62deg,transparent 0 calc(var(--u)*5),color-mix(in srgb,var(--text) 9%,transparent) calc(var(--u)*5) calc(var(--u)*5.3),transparent calc(var(--u)*5.3) calc(var(--u)*11),color-mix(in srgb,var(--accent) 14%,transparent) calc(var(--u)*11) calc(var(--u)*11.6))}
.fs-bolt{position:absolute;right:calc(var(--pad)*.6);top:calc(var(--pt) + var(--u)*14);width:calc(var(--u)*34);height:calc(var(--u)*52);background:linear-gradient(160deg,#fff7c2,var(--accent) 45%,color-mix(in srgb,var(--accent) 70%,var(--pop)));clip-path:polygon(58% 0,8% 56%,42% 56%,24% 100%,92% 38%,56% 38%,78% 0);filter:drop-shadow(0 0 calc(var(--u)*3) color-mix(in srgb,var(--accent) 70%,transparent));opacity:.95}
.fs-top{position:relative;display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3)}
.fs-kicker{display:inline-block;padding:calc(var(--u)*1.2) calc(var(--u)*3);background:var(--pop);color:#fff;font-size:calc(var(--u)*3.2);font-weight:900;letter-spacing:.14em;text-transform:uppercase;transform:skewX(-10deg)}
.fs-brand{flex:none}
.spt .fs-handle{white-space:nowrap;overflow-wrap:normal;font-size:calc(var(--u)*3.1);font-weight:800}
.fs-title-box{position:relative;flex:none;max-height:calc(var(--u)*30);display:flex}
.fs-title{font-family:var(--font-heading);font-size:calc(var(--u)*20);line-height:1.3;font-weight:400;letter-spacing:.01em;text-transform:uppercase;transform:skewX(-9deg);text-shadow:calc(var(--u)*.8) calc(var(--u)*.8) 0 var(--pop)}
.fs-title .hl{color:var(--accent)}
.fs-offer{position:relative;flex:1;min-height:0;display:flex;align-items:center;gap:calc(var(--u)*3)}
.fs-off{font-family:var(--font-heading);font-size:calc(var(--u)*31);line-height:1;color:var(--accent);letter-spacing:-.01em;text-shadow:0 0 calc(var(--u)*4) color-mix(in srgb,var(--accent) 45%,transparent)}
.fs-offsub{font-family:var(--font-heading);font-size:calc(var(--u)*8);line-height:1.05;letter-spacing:.04em}
.fs-timer{position:relative;display:flex;align-items:center;gap:calc(var(--u)*3.4);padding:calc(var(--u)*2.6) calc(var(--u)*3.4);border-radius:calc(var(--u)*3);background:color-mix(in srgb,var(--bg) 70%,#000);border:calc(var(--u)*.4) solid color-mix(in srgb,var(--accent) 55%,transparent);box-shadow:0 0 calc(var(--u)*4) color-mix(in srgb,var(--pop) 35%,transparent)}
.fs-watch{position:relative;flex:none;width:calc(var(--u)*12);height:calc(var(--u)*12);margin-top:calc(var(--u)*1.4);border-radius:50%;border:calc(var(--u)*1) solid var(--accent);background:radial-gradient(circle,color-mix(in srgb,var(--accent) 12%,transparent),transparent 70%)}
.fs-crown{position:absolute;left:50%;top:calc(var(--u)*-3);width:calc(var(--u)*3.4);height:calc(var(--u)*2);margin-left:calc(var(--u)*-1.7);border-radius:calc(var(--u)*.6);background:var(--accent)}
.fs-hand{position:absolute;left:50%;bottom:50%;width:calc(var(--u)*.8);height:38%;margin-left:calc(var(--u)*-.4);border-radius:99px;background:var(--pop);transform-origin:50% 100%}
.fs-pin{position:absolute;left:50%;top:50%;width:calc(var(--u)*1.8);height:calc(var(--u)*1.8);margin:calc(var(--u)*-.9) 0 0 calc(var(--u)*-.9);border-radius:50%;background:var(--text)}
.fs-clock{flex:1;min-width:0;display:flex;flex-direction:column;gap:calc(var(--u)*1)}
.fs-ends{font-size:calc(var(--u)*2.8);font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
.fs-tiles{display:flex;align-items:flex-start;gap:calc(var(--u)*1.2)}
.fs-tile{display:flex;flex-direction:column;align-items:center;min-width:calc(var(--u)*13);padding:calc(var(--u)*.8) calc(var(--u)*1.4) calc(var(--u)*1);border-radius:calc(var(--u)*1.6);background:var(--text);color:var(--bg)}
.fs-tile b{font-family:var(--font-heading);font-size:calc(var(--u)*9);line-height:1.05;font-weight:400;font-variant-numeric:tabular-nums}
.fs-tile small{font-size:calc(var(--u)*1.9);font-weight:800;letter-spacing:.14em;opacity:.65}
.fs-colon{font-style:normal;font-family:var(--font-heading);font-size:calc(var(--u)*8);line-height:1.3;color:var(--accent)}
.fs-foot{position:relative;display:flex;align-items:center;gap:calc(var(--u)*3)}
.fs-code{flex:none;display:inline-flex;align-items:center;gap:calc(var(--u)*1.6);padding:calc(var(--u)*1.4) calc(var(--u)*2.6);border:calc(var(--u)*.4) dashed var(--accent);border-radius:calc(var(--u)*1.6)}
.fs-code small{font-size:calc(var(--u)*2.2);font-weight:800;letter-spacing:.14em;opacity:.7}
.fs-code b{font-size:calc(var(--u)*4);font-weight:900;letter-spacing:.08em;color:var(--accent)}
.fs-note{flex:1;min-width:0;font-size:calc(var(--u)*2.9);font-weight:600;line-height:1.35;color:color-mix(in srgb,var(--text) 78%,transparent)}
.is-square .fs{gap:calc(var(--u)*2.2)}
.is-square .fs-title{font-size:calc(var(--u)*14)}
.is-square .fs-title-box{max-height:calc(var(--u)*21)}
.is-square .fs-off{font-size:calc(var(--u)*19)}
.is-square .fs-offsub{font-size:calc(var(--u)*6.4)}
.is-square .fs-bolt{width:calc(var(--u)*26);height:calc(var(--u)*40);top:calc(var(--pt) + var(--u)*10)}
.is-square .fs-tile{min-width:calc(var(--u)*11)}
.is-square .fs-tile b{font-size:calc(var(--u)*7)}
.is-square .fs-watch{width:calc(var(--u)*10);height:calc(var(--u)*10)}
.is-square .fs-timer{padding:calc(var(--u)*2) calc(var(--u)*3)}
.is-story .fs-bolt{top:calc(var(--pt) + var(--u)*22);height:calc(var(--u)*60);width:calc(var(--u)*40)}
.is-story .fs-off{font-size:calc(var(--u)*30)}
.is-landscape .fs{display:grid;grid-template-columns:1.1fr 1fr;grid-template-rows:auto auto 1fr auto;column-gap:calc(var(--u)*6);row-gap:calc(var(--u)*2.4)}
.is-landscape .fs-top{grid-column:1/3}
.is-landscape .fs-title-box{grid-column:1;grid-row:2}
.is-landscape .fs-title{font-size:calc(var(--u)*16)}
.is-landscape .fs-offer{grid-column:1;grid-row:3}
.is-landscape .fs-off{font-size:calc(var(--u)*30)}
.is-landscape .fs-offsub{font-size:calc(var(--u)*7)}
.is-landscape .fs-timer{grid-column:2;grid-row:2/4;align-self:center;flex-direction:column;align-items:flex-start}
.is-landscape .fs-watch{position:absolute;right:calc(var(--u)*3.4);top:calc(var(--u)*2.6)}
.is-landscape .fs-foot{grid-column:1/3;grid-row:4}
.is-landscape .fs-bolt{left:47%;right:auto;top:18%;width:calc(var(--u)*30);height:calc(var(--u)*46);opacity:.55}
.is-linkedin .fs-title{font-size:calc(var(--u)*13)}
.is-linkedin .fs-off{font-size:calc(var(--u)*24)}
.is-linkedin .fs-tile b{font-size:calc(var(--u)*7)}
.is-linkedin .fs-tile{min-width:calc(var(--u)*11)}`,
};
