export default {
  id: 'black-friday',
  name: 'Black Friday Sale',
  version: '1.0.0',
  category: 'promo',
  tags: ['black-friday', 'sale', 'discount', 'promo-code', 'price-tag', 'caution-tape', 'retail', 'ecommerce', 'dark'],
  created: '2026-11-16',
  updated: '2026-11-16',
  seoTitle: 'Black Friday Post Template — Free Price Tag Sale Graphic',
  seoDescription: 'Free Black Friday sale post template: a giant stacked headline, a swinging yellow price tag with the discount, caution-tape bands, promo code and deadline.',
  description: 'A Black Friday sale post on pure black: a giant stacked headline, rolling yellow caution tape, a swinging price tag that holds the discount (it counts up), the offer line, a promo code box and the sale dates.',
  bestFor: ['Online shops and retail Black Friday sales', 'Fashion, electronics and home brands', 'Courses, templates and software deals'],
  fonts: { heading: 'g:Anton|48|m', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#0a0a0a' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Tape & tag', value: '#ffd60a' },
    { key: 'btn', label: 'Code box', value: '#ffd60a' },
    { key: 'btnText', label: 'Code text', value: '#0a0a0a' },
  ],
  fields: [
    { key: 'label', label: 'Headline', type: 'textarea', value: 'Black\nFriday' },
    { key: 'kicker', label: 'Top strip', type: 'text', value: 'Biggest sale of the year' },
    { key: 'discount', label: 'Discount', type: 'text', value: '60% OFF' },
    { key: 'tagnote', label: 'Tag small line', type: 'text', value: 'Up to' },
    { key: 'offer', label: 'Offer', type: 'textarea', value: 'Every product. No exclusions. *While stock lasts.*' },
    { key: 'code', label: 'Promo code', type: 'text', value: 'BLACK60' },
    { key: 'dates', label: 'Dates', type: 'text', value: 'Fri 27 Nov · 00:00–23:59' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="bf">
  <div class="bf-tape bf-tape-a" aria-hidden="true" data-anim="scroll-bg"></div>
  <div class="bf-tape bf-tape-b" aria-hidden="true" data-anim="scroll-bg"></div>
  <p class="bf-kicker" data-edit="kicker"></p>
  <div class="bf-main">
    <h2 class="bf-title" data-edit="label" data-fit></h2>
    <div class="bf-tagwrap" data-anim="sway">
      <i class="bf-string" aria-hidden="true"></i>
      <div class="bf-tag"><span class="bf-hole" aria-hidden="true"></span><span class="bf-up" data-edit="tagnote"></span><span class="bf-disc" data-edit="discount" data-anim="count" data-fit></span></div>
    </div>
  </div>
  <p class="bf-offer" data-edit="offer"></p>
  <div class="bf-codewrap"><span class="bf-codelabel">Use code</span><span class="bf-code" data-edit="code" data-anim="pulse"></span></div>
  <div class="bf-foot"><span class="bf-dates" data-edit="dates"></span><span class="spt-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="bf-handle" data-edit="handle"></span></span></div>
</div>`,
  css: `.bf{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*2.8);padding:var(--pt) var(--pad) var(--pb);background:var(--bg);overflow:hidden}
.bf>*:not(.bf-tape){position:relative;z-index:1}
.bf-tape{position:absolute;left:-10%;right:-10%;height:calc(var(--u)*6);background:repeating-linear-gradient(-45deg,var(--accent) 0 calc(var(--u)*3),#0a0a0a calc(var(--u)*3) calc(var(--u)*6));background-size:calc(var(--u)*8.5) calc(var(--u)*8.5)}
.bf-tape-a{top:calc(var(--u)*4);transform:rotate(-2deg)}
.bf-tape-b{bottom:calc(var(--u)*4);transform:rotate(1.6deg)}
.bf-kicker{align-self:flex-start;padding:calc(var(--u)*.8) calc(var(--u)*2.4);background:var(--accent);color:#0a0a0a;font-family:var(--font-heading);font-size:calc(var(--u)*3);letter-spacing:.14em;text-transform:uppercase;margin-top:calc(var(--u)*6)}
.bf-main{flex:none;display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3)}
.bf-title{flex:1;min-width:0;font-family:var(--font-heading);font-size:calc(var(--u)*18);line-height:1.1;padding:calc(var(--u)*1.8) 0 calc(var(--u)*4);font-weight:400;text-transform:uppercase;letter-spacing:.01em}
.bf-title::first-line{color:var(--text)}
.bf-title{color:var(--accent)}
.bf-tagwrap{flex:none;display:flex;flex-direction:column;align-items:center;transform-origin:50% 0}
.bf-string{display:block;width:calc(var(--u)*.6);height:calc(var(--u)*5);background:#9ca3af}
.bf-tag{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*.6);width:calc(var(--u)*30);padding:calc(var(--u)*6) calc(var(--u)*2) calc(var(--u)*3);background:var(--accent);color:#0a0a0a;clip-path:polygon(18% 0,82% 0,100% 16%,100% 100%,0 100%,0 16%);box-shadow:0 0 calc(var(--u)*6) color-mix(in srgb,var(--accent) 40%,transparent)}
.bf-hole{position:absolute;top:calc(var(--u)*2.4);left:50%;width:calc(var(--u)*3);height:calc(var(--u)*3);margin-left:calc(var(--u)*-1.5);border-radius:50%;background:var(--bg)}
.bf-up{font-family:var(--font-heading);font-size:calc(var(--u)*3.4);letter-spacing:.12em;text-transform:uppercase}
.bf-disc{display:block;max-width:100%;font-family:var(--font-heading);font-size:calc(var(--u)*8.4);line-height:1.3;white-space:nowrap;text-align:center}
.bf-offer{font-size:calc(var(--u)*4);line-height:1.4;font-weight:600;max-width:90%}
.bf-offer .hl{color:var(--accent)}
.bf-codewrap{display:flex;align-items:center;gap:calc(var(--u)*2.4)}
.bf-codelabel{font-size:calc(var(--u)*3);font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.7}
.bf-code{font-family:var(--font-heading);font-size:calc(var(--u)*5.4);letter-spacing:.16em;padding:calc(var(--u)*1.2) calc(var(--u)*3.6);background:var(--btn);color:var(--btnText);border:calc(var(--u)*.6) dashed #0a0a0a;outline:calc(var(--u)*.6) solid var(--btn)}
.bf-foot{display:flex;justify-content:space-between;align-items:center;gap:calc(var(--u)*3);font-size:calc(var(--u)*3);font-weight:700;margin-bottom:calc(var(--u)*8)}
.bf-dates{color:var(--accent)}
.bf-handle{opacity:.8}
.is-square .bf{gap:calc(var(--u)*2.2)}
.is-square .bf-kicker{margin-top:calc(var(--u)*8)}
.is-square .bf-foot{margin-bottom:calc(var(--u)*9)}
.is-square .bf-title{font-size:calc(var(--u)*16)}
.is-square .bf-tag{width:calc(var(--u)*26);padding-top:calc(var(--u)*6)}
.is-square .bf-disc{font-size:calc(var(--u)*8)}
.is-landscape .bf{gap:calc(var(--u)*2.2)}
.is-landscape .bf-tape{height:calc(var(--u)*4)}
.is-landscape .bf-kicker{margin-top:calc(var(--u)*3);font-size:calc(var(--u)*2.4)}
.is-landscape .bf-title{font-size:calc(var(--u)*13)}
.is-landscape .bf-tag{width:calc(var(--u)*21);padding:calc(var(--u)*5) calc(var(--u)*1.4) calc(var(--u)*3)}
.is-landscape .bf-disc{font-size:calc(var(--u)*6.2)}
.is-landscape .bf-string{height:calc(var(--u)*2)}
.is-landscape .bf-offer{font-size:calc(var(--u)*3)}
.is-landscape .bf-code{font-size:calc(var(--u)*4)}
.is-landscape .bf-foot{margin-bottom:calc(var(--u)*5)}
.is-story .bf{gap:calc(var(--u)*5)}
.is-story .bf-kicker{margin-top:calc(var(--u)*14)}
.is-story .bf-foot{margin-bottom:calc(var(--u)*16)}
.is-story .bf-main{flex-direction:column;align-items:flex-start;gap:calc(var(--u)*2)}
.is-story .bf-title{font-size:calc(var(--u)*26)}
.is-story .bf-tagwrap{align-self:flex-end}`,
};
