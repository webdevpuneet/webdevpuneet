// Five drawn stars (clip-path, so they look the same in every font); each pops in after the one before
const STARS = Array.from({ length: 5 }, () => '<i data-anim="pop"></i>').join('');

export default {
  id: 'five-star-review',
  name: '5-Star Review',
  version: '1.0.0',
  category: 'social-proof',
  tags: ['5-star-review', 'rating', 'google-reviews', 'trustpilot', 'customer-review', 'social-proof', 'stars', 'yellow'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: '5-Star Review Post Template — Free Google Review Graphic',
  seoDescription: 'Free 5-star review post template: five big stars that pop in, your rating counting up, the review in a speech bubble and the reviewer with a verified tick.',
  description: 'A rating-first review post on a golden sunburst: five big drawn stars that pop in one after another, your average rating counting up with the number of reviews and the platform, then the customer\'s words in a speech bubble with their name, an optional photo and a "verified buyer" tick, plus your handle and logo.',
  bestFor: ['Sharing Google, Trustpilot, Amazon or Etsy reviews', 'Local businesses asking for more reviews', 'Restaurants, salons, trades, shops and apps'],
  fonts: { heading: 'g:Archivo Black|4|s', body: 'jakarta' },
  vars: [
    { key: 'bg', label: 'Background', value: '#ffcf3f' },
    { key: 'card', label: 'Bubble', value: '#ffffff' },
    { key: 'text', label: 'Text', value: '#1f1300' },
    { key: 'accent', label: 'Stars', value: '#ffb000' },
    { key: 'btn', label: 'Tick and platform', value: '#1f1300' },
    { key: 'btnText', label: 'Platform text', value: '#ffcf3f' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'What our customers say' },
    { key: 'rating', label: 'Rating', type: 'text', value: '4.9' },
    { key: 'count', label: 'Reviews line', type: 'text', value: 'from 1,284 Google reviews' },
    { key: 'quote', label: 'Review', type: 'textarea', value: 'Booked on a Friday, fixed by Saturday morning. Friendly, *spotless* and cheaper than the quote. Five stars without a second thought.' },
    { key: 'name', label: 'Reviewer name', type: 'text', value: 'Priya S.' },
    { key: 'meta', label: 'Reviewer detail', type: 'text', value: 'Verified customer · Leeds' },
    { key: 'platform', label: 'Platform (optional)', type: 'text', value: 'Google Reviews' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'photo', label: 'Reviewer photo (optional)', type: 'image' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="fs">
  <div class="fs-rays" aria-hidden="true" data-anim="spin"></div>
  <span class="fs-label" data-edit="label"></span>
  <div class="fs-stars" aria-hidden="true">${STARS}</div>
  <div class="fs-score"><p class="fs-rating" data-edit="rating" data-anim="count" data-at="1.6"></p><div class="fs-of"><p class="fs-count" data-edit="count"></p><span class="fs-platform" data-edit="platform"></span></div></div>
  <div class="fs-bubble" data-fit-box>
    <p class="fs-quote" data-edit="quote" data-fit></p>
    <div class="fs-who"><div class="fs-photo" data-image="photo" data-ph="portrait" data-optional></div><div><p class="fs-name"><span data-edit="name"></span><b class="fs-tick" aria-hidden="true">&#10003;</b></p><p class="fs-meta" data-edit="meta"></p></div></div>
  </div>
  <div class="fs-foot"><div class="fs-logo" data-image="logo" data-image-fit="contain"></div><span class="fs-handle" data-edit="handle"></span></div>
</div>`,
  css: `.fs{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*3.2);padding:var(--pt) var(--pad) var(--pb);background:var(--bg);color:var(--text);overflow:hidden}
.fs>*:not(.fs-rays){position:relative}
.fs-rays{position:absolute;left:50%;top:26%;width:calc(var(--u)*240);height:calc(var(--u)*240);margin:calc(var(--u)*-120) 0 0 calc(var(--u)*-120);border-radius:50%;background:repeating-conic-gradient(color-mix(in srgb,#fff 32%,transparent) 0 7.5deg,transparent 7.5deg 15deg);-webkit-mask:radial-gradient(circle,#000 0 20%,transparent 60%);mask:radial-gradient(circle,#000 0 20%,transparent 60%)}
.fs-label{font-size:calc(var(--u)*3);font-weight:800;letter-spacing:.2em;text-transform:uppercase}
.fs-stars{display:flex;gap:calc(var(--u)*1.6);filter:drop-shadow(0 calc(var(--u)*.9) 0 color-mix(in srgb,var(--text) 85%,transparent))}
.fs-stars i{display:block;width:calc(var(--u)*14);height:calc(var(--u)*14);background:linear-gradient(160deg,#fff3b0,var(--accent) 45%,color-mix(in srgb,var(--accent) 70%,#c2410c));clip-path:polygon(50% 2%,61.8% 36%,98% 36.5%,69% 58%,79.5% 93%,50% 72%,20.5% 93%,31% 58%,2% 36.5%,38.2% 36%)}
.fs-stars i:nth-child(3){width:calc(var(--u)*16);height:calc(var(--u)*16);margin-top:calc(var(--u)*-1.6)}
.fs-score{display:flex;align-items:center;gap:calc(var(--u)*3)}
.fs-rating{font-family:var(--font-heading);font-size:calc(var(--u)*17);line-height:.9;letter-spacing:-.03em}
.fs .fs-rating{white-space:nowrap}
.fs-of{display:flex;flex-direction:column;align-items:flex-start;gap:calc(var(--u)*1.2)}
.fs-count{font-size:calc(var(--u)*3.4);font-weight:700;line-height:1.2;max-width:calc(var(--u)*34)}
.fs-platform{font-size:calc(var(--u)*2.7);font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--btnText);background:var(--btn);padding:calc(var(--u)*1) calc(var(--u)*2.4);border-radius:99px}
.fs-platform:empty{display:none}
.fs-bubble{flex:1;min-height:0;width:100%;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*3.4);padding:calc(var(--u)*5.4) calc(var(--u)*6);background:var(--card);border-radius:calc(var(--u)*4);box-shadow:0 calc(var(--u)*1.2) 0 color-mix(in srgb,var(--text) 85%,transparent);overflow:visible!important}
.fs-bubble::before{content:'';position:absolute;left:calc(var(--u)*10);top:calc(var(--u)*-3.4);width:calc(var(--u)*7);height:calc(var(--u)*4);background:var(--card);clip-path:polygon(0 100%,30% 0,100% 100%)}
.fs-quote{font-size:calc(var(--u)*4.6);line-height:1.42;font-weight:600}
.fs-quote .hl{color:inherit;background:linear-gradient(transparent 58%,color-mix(in srgb,var(--accent) 65%,transparent) 58%)}
.fs-who{display:flex;align-items:center;gap:calc(var(--u)*2.4)}
.fs-photo{width:calc(var(--u)*11);height:calc(var(--u)*11);border-radius:50%;flex:none}
.fs-name{display:flex;align-items:center;gap:calc(var(--u)*1.2);font-size:calc(var(--u)*3.6);font-weight:800}
.fs-tick{display:inline-flex;align-items:center;justify-content:center;width:calc(var(--u)*3.6);height:calc(var(--u)*3.6);border-radius:50%;background:var(--btn);color:var(--card);font-size:calc(var(--u)*2.2)}
.fs-meta{font-size:calc(var(--u)*2.9);opacity:.7;margin-top:calc(var(--u)*.4)}
.fs-foot{display:flex;align-items:center;gap:calc(var(--u)*1.8);font-size:calc(var(--u)*3);font-weight:800}
.fs-logo{width:calc(var(--u)*12);height:calc(var(--u)*6)}
.is-square .fs{gap:calc(var(--u)*2.4)}
.is-square .fs-stars i{width:calc(var(--u)*10.5);height:calc(var(--u)*10.5)}
.is-square .fs-stars i:nth-child(3){width:calc(var(--u)*12);height:calc(var(--u)*12)}
.is-square .fs-rating{font-size:calc(var(--u)*12)}
.is-square .fs-quote{font-size:calc(var(--u)*3.8)}
.is-square .fs-bubble{padding:calc(var(--u)*4) calc(var(--u)*5);gap:calc(var(--u)*2.4)}
.is-story .fs-stars i{width:calc(var(--u)*15);height:calc(var(--u)*15)}
.is-story .fs-stars i:nth-child(3){width:calc(var(--u)*17);height:calc(var(--u)*17)}
.is-story .fs-quote{font-size:calc(var(--u)*5)}
.is-landscape .fs{display:grid;grid-template-columns:auto 1fr;grid-template-rows:1fr auto auto auto 1fr;column-gap:calc(var(--u)*6);row-gap:calc(var(--u)*2.6);align-items:center}
.is-landscape .fs-label{grid-column:1;grid-row:2;justify-self:center}
.is-landscape .fs-stars{grid-column:1;grid-row:3}
.is-landscape .fs-score{grid-column:1;grid-row:4;justify-self:center}
.is-landscape .fs-bubble{grid-column:2;grid-row:1 / span 5;align-self:center;flex:none;max-height:100%;padding:calc(var(--u)*6) calc(var(--u)*6.4)}
.is-landscape .fs-foot{position:absolute;left:var(--pad);bottom:calc(var(--pad) * .6)}
.is-landscape .fs-stars i{width:calc(var(--u)*10);height:calc(var(--u)*10)}
.is-landscape .fs-stars i:nth-child(3){width:calc(var(--u)*11.5);height:calc(var(--u)*11.5)}
.is-landscape .fs-rating{font-size:calc(var(--u)*13)}
.is-landscape .fs-quote{font-size:calc(var(--u)*4)}
.is-landscape .fs-bubble::before{left:calc(var(--u)*-3.4);top:calc(var(--u)*12);width:calc(var(--u)*4);height:calc(var(--u)*7);clip-path:polygon(100% 0,0 40%,100% 100%)}
.is-landscape .fs-rays{left:22%;top:50%}`,
};
