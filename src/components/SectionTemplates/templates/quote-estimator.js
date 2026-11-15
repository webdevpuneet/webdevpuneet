/* Price Estimator: visitors pick a service and the size of their vehicle and see an estimated price and how long it takes, with a Book
   button. Each service has three prices (small, medium, large vehicles); each vehicle choice maps to one of the three. The
   "estimator" behaviour does the lookup in the browser (no server). The first service and vehicle are selected, so an estimate
   shows at once. It is an estimate, and the note under it says so. */

const V = (name, note, size) => ({ name, note, size });
const S = (name, priceS, priceM, priceL, duration) => ({ name, priceS, priceM, priceL, duration });

export default {
  id: 'quote-estimator',
  name: 'Price Estimator',
  version: '1.0.0',
  category: 'listings',
  tags: ['price estimator', 'quote', 'calculator', 'garage', 'car repair', 'services', 'booking', 'interactive', 'light'],
  created: '2026-11-15',
  updated: '2026-11-15',
  seoTitle: 'Price Estimator Section — Free Service Quote Calculator HTML',
  seoDescription: 'Free price estimator section: visitors pick a service and vehicle size and see an estimated price and time with a Book button. No server needed. Edit and export HTML.',
  description: 'An instant price check for businesses that charge by size or type. Visitors pick what they need (an MOT, a service, new brake pads) and the size of their vehicle, and the estimate and the time it takes appear straight away, with a note that the final price is confirmed after inspection and a Book button. Every service has three prices, for small, medium and large vehicles, and every vehicle choice maps to one of them. Everything runs in the browser, so there is nothing to host. Made for garages, but it works for any service priced by size.',
  bestFor: ['Garages, MOT and tyre centres', 'Car washes, valeting and detailing', 'Removals, cleaning and other services priced by size'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'services', label: 'Services and prices' },
    { id: 'vehicles', label: 'Vehicle choices' },
    { id: 'result', label: 'Estimate box' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Price check' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Know the price *before you book*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'Choose the job and your vehicle for an instant estimate. No sign-up, and no pushy phone calls.' },
    { key: 'serviceLabel', group: 'result', label: 'Services question', type: 'text', value: '1. What do you need?' },
    { key: 'vehicleLabel', group: 'result', label: 'Vehicle question', type: 'text', value: '2. What do you drive?' },
    { key: 'resultTitle', group: 'result', label: 'Estimate title', type: 'text', value: 'Your estimate' },
    { key: 'fromText', group: 'result', label: 'Word before the price', type: 'text', value: 'From' },
    { key: 'timePrefix', group: 'result', label: 'Text before the time', type: 'text', value: 'Takes about' },
    { key: 'note', group: 'result', label: 'Note under the estimate', type: 'text', value: 'This is an estimate. We confirm the exact price after a free inspection, and never start work without your say-so.' },
    { key: 'cta', group: 'result', label: 'Button text', type: 'text', value: 'Book this service' },
    { key: 'ctaUrl', group: 'result', label: 'Button link', type: 'url', value: '#book' },
  ],
  lists: [
    {
      key: 'services', group: 'services', label: 'Services', itemLabel: 'Service', titleKey: 'name', min: 1, max: 10,
      fields: [
        { key: 'name', label: 'Service', type: 'text', value: 'Service' },
        { key: 'priceS', label: 'Price, small vehicle', type: 'text', value: '£60', hint: 'Typed as you want it shown, such as £60 or $75.' },
        { key: 'priceM', label: 'Price, medium vehicle', type: 'text', value: '£70' },
        { key: 'priceL', label: 'Price, large vehicle', type: 'text', value: '£85' },
        { key: 'duration', label: 'How long it takes', type: 'text', value: '1 hour' },
      ],
      value: [
        S('MOT test', '£54.85', '£54.85', '£54.85', '45 minutes'),
        S('Full service', '£149', '£179', '£219', '3 hours'),
        S('Brake pads and discs', '£189', '£239', '£299', '2 hours'),
        S('Diagnostics check', '£45', '£45', '£55', '1 hour'),
      ],
    },
    {
      key: 'vehicles', group: 'vehicles', label: 'Vehicle choices', itemLabel: 'Vehicle', titleKey: 'name', min: 1, max: 6,
      fields: [
        { key: 'name', label: 'Name', type: 'text', value: 'Small car' },
        { key: 'note', label: 'Examples (optional)', type: 'text', value: 'Fiesta, Polo, Corsa' },
        { key: 'size', label: 'Price band', type: 'choice', options: [['s', 'Small price'], ['m', 'Medium price'], ['l', 'Large price']], value: 's' },
      ],
      value: [
        V('Small car', 'Fiesta, Polo, Corsa', 's'),
        V('Family car', 'Golf, Focus, Qashqai', 'm'),
        V('Large car or van', 'Transit, X5, Sprinter', 'l'),
      ],
    },
  ],
  toggles: [],
  theme: { brand: '#d9261c', brandText: '#ffffff', bg: '#ffffff', surface: '#f4f5f7', text: '#14171c', muted: '#556070', radius: '12' },
  fonts: { heading: 'space', body: 'inter' },
  behaviors: ['estimator'],

  html: `<div class="st-wrap qe" data-qe data-set="data-from:fromText;data-time:timePrefix">
  <header class="st-head qe-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-show-if="lead" data-edit="lead"></p>
  </header>
  <div class="qe-card" data-anim="item">
    <div class="qe-pick">
      <fieldset class="qe-group">
        <legend data-edit="serviceLabel"></legend>
        <div class="qe-options" data-list="services">
          <label class="qe-opt" data-set="data-s:priceS;data-m:priceM;data-l:priceL;data-time:duration"><input type="radio" name="qe-service"><span data-edit="name"></span></label>
        </div>
      </fieldset>
      <fieldset class="qe-group">
        <legend data-edit="vehicleLabel"></legend>
        <div class="qe-options" data-list="vehicles">
          <label class="qe-opt qe-opt--car" data-set="data-size:size"><input type="radio" name="qe-vehicle"><span><strong data-edit="name"></strong><small data-show-if="note" data-edit="note"></small></span></label>
        </div>
      </fieldset>
    </div>
    <div class="qe-result" aria-live="polite">
      <p class="qe-rtitle" data-edit="resultTitle"></p>
      <p class="qe-price"><span class="qe-from"></span> <strong class="qe-amount">&mdash;</strong></p>
      <p class="qe-time"></p>
      <p class="qe-note" data-show-if="note" data-edit="note"></p>
      <a class="st-btn qe-cta" data-show-if="cta" data-href="ctaUrl"><span data-edit="cta"></span></a>
    </div>
  </div>
</div>`,
  css: `.st-quote-estimator{padding:clamp(64px,8cqi,112px) 0}
.qe-head{margin-bottom:clamp(22px,3cqi,40px)}
.qe-card{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:clamp(18px,2.4cqi,34px);max-width:1000px;margin:0 auto;padding:clamp(18px,2.4cqi,32px);border-radius:calc(var(--st-radius) * 1.6px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.qe-pick{display:flex;flex-direction:column;gap:clamp(16px,2cqi,24px);min-width:0}
.qe-group{border:0;margin:0;padding:0;min-width:0}
.qe-group legend{font:700 15px/1.3 var(--st-font-heading);margin-bottom:10px;padding:0}
.qe-options{display:flex;flex-wrap:wrap;gap:8px}
.qe-opt{position:relative;display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-bg);border:1.5px solid color-mix(in srgb,var(--st-text) 14%,transparent);cursor:pointer;font:600 14.5px/1.3 var(--st-font-body);transition:border-color .2s,background .2s,box-shadow .2s}
.qe-opt:hover{border-color:var(--st-brand)}
.qe-opt input{position:absolute;opacity:0;inset:0;width:100%;height:100%;margin:0;cursor:pointer}
.qe-opt.is-on{border-color:var(--st-brand);background:color-mix(in srgb,var(--st-brand) 9%,var(--st-bg));box-shadow:0 0 0 3px color-mix(in srgb,var(--st-brand) 18%,transparent)}
.qe-opt:focus-within{outline:3px solid var(--st-brand);outline-offset:2px}
.qe-opt--car span{display:flex;flex-direction:column;gap:1px}
.qe-opt--car small{font-weight:500;color:var(--st-muted);font-size:12.5px}
.qe-result{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:8px;padding:clamp(18px,2.2cqi,28px);border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-text);color:var(--st-bg)}
.qe-rtitle{font:700 13px/1 var(--st-font-body);letter-spacing:.08em;text-transform:uppercase;opacity:.7}
.qe-price{display:flex;align-items:baseline;gap:8px}
.qe-from{font-size:14px;opacity:.75}
.qe-amount{font:700 clamp(34px,4.2cqi,48px)/1 var(--st-font-heading);color:var(--st-brand)}
.qe-time{font-size:15px;opacity:.85}
.qe-note{font-size:13px;line-height:1.5;opacity:.7}
.qe-result .qe-cta{margin-top:6px}
@container st (max-width:760px){.qe-card{grid-template-columns:1fr}}`,
};
