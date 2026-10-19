export default {
  id: 'halloween-sale',
  name: 'Halloween Sale',
  version: '1.0.0',
  category: 'holidays',
  tags: ['halloween', 'october', 'sale', 'spooky', 'dark'],
  created: '2026-10-18',
  updated: '2026-10-18',
  seoTitle: 'Halloween Sale Post Template — Free Instagram & X Post',
  seoDescription: 'Free Halloween sale post template with a glowing moon, bats, a spooky headline, deal, dates and promo code. Edit online, then download every size or copy HTML.',
  description: 'A spooky Halloween promo: a glowing orange moon with bat silhouettes, a dripping-style headline, the deal, sale dates and a promo code on a midnight-purple sky.',
  bestFor: ['Halloween sales and flash deals (Oct 31, 2026)', 'Spooky-season product drops', 'Costume, candy and party promotions'],
  fonts: { heading: 'g:Creepster|4|d', body: 'inter' },
  layouts: { vpos: false }, // the moon fills the top: keep the text where the design puts it
  vars: [
    { key: 'bg', label: 'Sky', value: '#1a0b2e' },
    { key: 'bg2', label: 'Horizon', value: '#4c1d95' },
    { key: 'text', label: 'Text', value: '#fff7ed' },
    { key: 'accent', label: 'Moon & accent', value: '#fb923c' },
  ],
  fields: [
    { key: 'kicker', label: 'Kicker', type: 'text', value: 'Happy Halloween' },
    { key: 'title', label: 'Headline', type: 'textarea', value: 'Spooky\n*Sale*' },
    { key: 'deal', label: 'Deal', type: 'text', value: '31% off everything' },
    { key: 'dates', label: 'Dates', type: 'text', value: 'Oct 29 – Oct 31' },
    { key: 'code', label: 'Code', type: 'text', value: 'Code: BOO31' },
  ],
  html: `<div class="hw">
  <i class="hw-moon"></i>
  <i class="hw-bat b1"></i><i class="hw-bat b2"></i><i class="hw-bat b3"></i>
  <i class="hw-hill"></i>
  <div class="hw-body" data-fit-box>
    <span class="hw-kicker" data-edit="kicker"></span>
    <h2 class="hw-title" data-edit="title" data-fit></h2>
    <span class="hw-deal" data-edit="deal"></span>
  </div>
  <div class="hw-foot"><span data-edit="dates"></span><span class="hw-code" data-edit="code"></span></div>
</div>`,
  css: `.hw{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;padding:var(--pt) var(--pad) var(--pb);background:linear-gradient(180deg,var(--bg) 0%,var(--bg) 45%,var(--bg2) 100%);text-align:center;overflow:hidden}
.hw-moon{position:absolute;top:8%;right:9%;width:calc(var(--u)*30);height:calc(var(--u)*30);border-radius:50%;background:radial-gradient(circle at 38% 36%,color-mix(in srgb,var(--accent) 35%,#fff) 0%,var(--accent) 55%,color-mix(in srgb,var(--accent) 70%,#7c2d12) 100%);box-shadow:0 0 calc(var(--u)*14) color-mix(in srgb,var(--accent) 55%,transparent)}
.hw-bat{position:absolute;width:calc(var(--u)*11);height:calc(var(--u)*5);background:#0b0414;clip-path:polygon(0 30%,14% 18%,24% 36%,36% 20%,44% 40%,50% 26%,56% 40%,64% 20%,76% 36%,86% 18%,100% 30%,82% 62%,66% 52%,56% 78%,50% 64%,44% 78%,34% 52%,18% 62%)}
.b1{top:14%;left:12%;transform:rotate(-8deg)}
.b2{top:24%;left:30%;width:calc(var(--u)*7);height:calc(var(--u)*3.2);transform:rotate(10deg)}
.b3{top:33%;right:12%;width:calc(var(--u)*8);height:calc(var(--u)*3.6);transform:rotate(-14deg)}
.hw-hill{position:absolute;left:-10%;right:-10%;bottom:-6%;height:24%;border-radius:50% 50% 0 0;background:#0b0414;opacity:.75}
.hw-body{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*2.4);width:100%;padding-top:calc(var(--u)*14)}
.hw-kicker{font-size:calc(var(--u)*3.6);font-weight:800;text-transform:uppercase;letter-spacing:.24em;color:var(--accent)}
.hw-title{font-family:var(--font-heading);font-size:calc(var(--u)*20);line-height:.9;font-weight:400;letter-spacing:.02em;text-shadow:0 calc(var(--u)*.8) 0 #0b0414}
.hw-deal{font-size:calc(var(--u)*5.4);font-weight:800;text-transform:uppercase;letter-spacing:.04em}
.hw-foot{position:relative;display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3);width:100%;font-size:calc(var(--u)*3.4);font-weight:700;text-transform:uppercase;letter-spacing:.1em}
.hw-code{color:#1a0b2e;background:var(--accent);padding:calc(var(--u)*1.6) calc(var(--u)*3);border-radius:calc(var(--u)*1)}
.is-landscape .hw-moon{width:calc(var(--u)*24);height:calc(var(--u)*24);top:10%;right:6%}
.is-landscape .hw-body{padding-top:0;align-items:flex-start;text-align:left;max-width:64%;align-self:flex-start}
.is-landscape .hw-title{font-size:calc(var(--u)*17)}
.is-story .hw-body{padding-top:calc(var(--u)*24)}`,
};
