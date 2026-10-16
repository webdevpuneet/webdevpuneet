export default {
  id: 'discount-badge',
  name: 'Discount Badge',
  version: '1.0.0',
  category: 'promo',
  tags: ['sale', 'discount', 'coupon', 'badge'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Discount Sale Post Template — Free % Off Instagram Post',
  seoDescription: 'Free discount post template with a big percent-off badge, offer line, promo code chip and end date. Edit text and colours, then download PNG sizes or copy HTML.',
  description: 'A punchy sale post built around a big circular "% off" badge, an offer headline, a dashed promo-code chip and an end date.',
  bestFor: ['Flash sales and coupon codes', 'Seasonal and holiday offers', 'Course or subscription discounts'],
  fonts: { heading: 'poppins', body: 'poppins' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fdf2f8' },
    { key: 'text', label: 'Text', value: '#500724' },
    { key: 'accent', label: 'Accent', value: '#db2777' },
  ],
  fields: [
    { key: 'percent', label: 'Discount', type: 'text', value: '50%' },
    { key: 'off', label: 'Badge word', type: 'text', value: 'OFF' },
    { key: 'title', label: 'Offer', type: 'textarea', value: 'Everything in the store, *this weekend only*' },
    { key: 'code', label: 'Promo code', type: 'text', value: 'Code: SAVE50' },
    { key: 'ends', label: 'End date', type: 'text', value: 'Ends Sunday at midnight' },
  ],
  html: `<div class="db">
  <div class="db-badge"><span class="db-pct" data-edit="percent"></span><span class="db-off" data-edit="off"></span></div>
  <div class="db-copy" data-fit-box>
    <h2 class="db-title" data-edit="title" data-fit></h2>
    <span class="db-code" data-edit="code"></span>
    <span class="db-ends" data-edit="ends"></span>
  </div>
</div>`,
  css: `.db{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*6);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 50% 30%,color-mix(in srgb,var(--accent) 16%,transparent),transparent 60%),var(--bg);text-align:center}
.db-badge{flex:none;width:calc(var(--u)*48);height:calc(var(--u)*48);border-radius:50%;background:var(--accent);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 0 0 calc(var(--u)*2) var(--bg),0 0 0 calc(var(--u)*2.8) var(--accent);transform:rotate(-8deg)}
.db-pct{font-family:var(--font-heading);font-size:calc(var(--u)*17);font-weight:900;line-height:.9;letter-spacing:-.04em}
.db-off{font-family:var(--font-heading);font-size:calc(var(--u)*7);font-weight:800;letter-spacing:.2em}
.db-copy{display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*3);flex:0 1 auto;width:100%}
.db-title{font-family:var(--font-heading);font-size:calc(var(--u)*7);line-height:1.12;font-weight:800;letter-spacing:-.02em;max-width:92%}
.db-code{font-size:calc(var(--u)*3.6);font-weight:700;padding:calc(var(--u)*1.8) calc(var(--u)*4);border:calc(var(--u)*.45) dashed var(--accent);border-radius:calc(var(--u)*1.6);color:var(--accent);background:#fff}
.db-ends{font-size:calc(var(--u)*3);opacity:.75}
.is-landscape .db{flex-direction:row;text-align:left}
.is-landscape .db-copy{align-items:flex-start;flex:1}
.is-landscape .db-badge{width:calc(var(--u)*56);height:calc(var(--u)*56)}`,
};
