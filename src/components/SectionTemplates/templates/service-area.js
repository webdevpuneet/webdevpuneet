/* Service Area Checker: a visitor types their postcode and sees at once whether the business covers it and how soon it can arrive.
   The covered areas are a list of codes (for example "M1", "M20"), shown as chips beside the checker. In "UK postcode" mode the first
   part of the postcode is matched exactly (M20 4BT -> M20); in "starts with" mode a ZIP or postal code that begins with a listed
   code matches. The "areacheck" behaviour does the lookup in the browser, so nothing is sent anywhere. */

const A = (code, name, eta) => ({ code, name, eta });

export default {
  id: 'service-area',
  name: 'Service Area Checker',
  version: '1.0.0',
  category: 'contact',
  tags: ['service area', 'postcode checker', 'coverage', 'plumber', 'trades', 'local business', 'delivery area', 'zip code', 'interactive', 'light'],
  created: '2026-11-15',
  updated: '2026-11-15',
  seoTitle: 'Service Area Checker — Free Postcode Coverage Section HTML',
  seoDescription: 'Free service area checker section: visitors type a postcode and see if you cover them and how fast you can arrive. Runs in the browser. Edit and export HTML.',
  description: 'The question every local customer asks: do you cover my area? A visitor types a postcode and gets an answer at once, with the area name and how soon you can be there, and a Book button when they are covered. Beside the checker, the areas you cover are listed as chips, each with its code. Works with UK postcodes (matched on their first part) or with ZIP and other postal codes that start with a code you list. It runs entirely in the browser, so nothing is sent anywhere. Made for plumbers, electricians, cleaners, delivery services and any business with a local patch.',
  bestFor: ['Plumbers, electricians and other trades', 'Cleaners, locksmiths and mobile services', 'Local delivery, florists and takeaways'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'form', label: 'Checker' },
    { id: 'texts', label: 'Messages' },
    { id: 'items', label: 'Areas covered' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Where we work' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Do we cover *your area?*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'Type your postcode to find out if we cover you, and how soon we can usually arrive.' },
    { key: 'inputLabel', group: 'form', label: 'Field label', type: 'text', value: 'Your postcode' },
    { key: 'placeholder', group: 'form', label: 'Placeholder', type: 'text', value: 'For example M20 4BT' },
    { key: 'button', group: 'form', label: 'Button text', type: 'text', value: 'Check my area' },
    { key: 'matchMode', group: 'form', label: 'How codes are matched', type: 'choice', options: [['uk', 'UK postcode (the first part, such as M20)'], ['prefix', 'Starts with (ZIP codes and other formats)']], value: 'uk' },
    { key: 'yesText', group: 'texts', label: 'Message when covered', type: 'text', value: 'Good news: we cover {p} ({area}). We can usually be with you within {eta}.', hint: '{p} is the postcode, {area} the area name and {eta} the arrival time.' },
    { key: 'noText', group: 'texts', label: 'Message when not covered', type: 'text', value: 'Sorry, {p} is outside our usual area. Call us anyway, as we may still be able to help.' },
    { key: 'badText', group: 'texts', label: 'Message for an incomplete postcode', type: 'text', value: 'Please enter your full postcode, for example M20 4BT.' },
    { key: 'ctaLabel', group: 'texts', label: 'Button shown when covered (optional)', type: 'text', value: 'Book a visit' },
    { key: 'ctaUrl', group: 'texts', label: 'Button link', type: 'url', value: '#book' },
    { key: 'listTitle', group: 'items', label: 'Title above the areas', type: 'text', value: 'Areas we cover' },
    { key: 'note', group: 'items', label: 'Small print (optional)', type: 'text', value: 'Emergency call-outs outside these areas may take longer.' },
  ],
  lists: [
    {
      key: 'areas', group: 'items', label: 'Areas', itemLabel: 'Area', titleKey: 'name', min: 1, max: 40,
      fields: [
        { key: 'code', label: 'Code', type: 'text', value: 'M1', hint: 'The first part of a UK postcode, such as M20, or the start of a ZIP code.' },
        { key: 'name', label: 'Area name', type: 'text', value: 'City centre' },
        { key: 'eta', label: 'Usual arrival time', type: 'text', value: '45 minutes' },
      ],
      value: [
        A('M1', 'City centre', '30 minutes'), A('M2', 'Spinningfields', '30 minutes'), A('M14', 'Fallowfield', '45 minutes'),
        A('M20', 'Didsbury', '45 minutes'), A('M21', 'Chorlton', '45 minutes'), A('M33', 'Sale', '60 minutes'),
      ],
    },
  ],
  toggles: [],
  theme: { brand: '#0b6bcb', brandText: '#ffffff', bg: '#ffffff', surface: '#f1f6fb', text: '#0f1d2e', muted: '#52657d', radius: '14' },
  fonts: { heading: 'space', body: 'inter' },
  behaviors: ['areacheck'],

  html: `<div class="st-wrap sa" data-area data-set="data-mode:matchMode;data-yes:yesText;data-no:noText;data-bad:badText">
  <div class="sa-copy">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="sa-lead" data-anim="item" data-show-if="lead" data-edit="lead"></p>
    <form class="sa-form" data-anim="item" novalidate>
      <label class="sa-field"><span class="sa-label" data-edit="inputLabel"></span>
        <span class="sa-row"><input class="sa-input" type="text" autocomplete="postal-code" autocapitalize="characters" spellcheck="false" data-set="placeholder:placeholder"><button class="st-btn sa-btn" type="submit"><span data-edit="button"></span></button></span>
      </label>
    </form>
    <p class="sa-result" aria-live="polite" hidden></p>
    <a class="st-btn sa-cta" data-show-if="ctaLabel" data-href="ctaUrl" hidden><span data-edit="ctaLabel"></span></a>
  </div>
  <div class="sa-panel" data-anim="media">
    <h3 class="sa-ptitle" data-edit="listTitle"></h3>
    <ul class="sa-areas" data-list="areas">
      <li class="sa-chip" data-set="data-code:code;data-eta:eta"><strong data-edit="code"></strong><span data-edit="name"></span></li>
    </ul>
    <p class="sa-note" data-show-if="note" data-edit="note"></p>
  </div>
</div>`,
  css: `.st-service-area{padding:clamp(64px,8cqi,112px) 0}
.sa{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:clamp(24px,4.4cqi,68px);align-items:center}
.sa-copy{display:flex;flex-direction:column;align-items:flex-start;gap:clamp(12px,1.6cqi,18px)}
.sa-copy .st-h2{text-align:left}
.sa-lead{color:var(--st-muted);font-size:clamp(16px,1.5cqi,18px);line-height:1.65;max-width:50ch}
.sa-form{width:100%;max-width:520px}
.sa-field{display:flex;flex-direction:column;gap:8px}
.sa-label{font:700 14px/1.3 var(--st-font-body)}
.sa-row{display:flex;gap:8px}
.sa-input{flex:1;min-width:0;height:50px;padding:0 16px;border-radius:calc(var(--st-radius) * 1px);border:1.5px solid color-mix(in srgb,var(--st-text) 18%,transparent);background:var(--st-bg);color:var(--st-text);font:600 17px/1 var(--st-font-body);letter-spacing:.04em;text-transform:uppercase}
.sa-input::placeholder{text-transform:none;letter-spacing:0;font-weight:500;color:var(--st-muted)}
.sa-input:focus{outline:none;border-color:var(--st-brand);box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 18%,transparent)}
.sa-btn{height:50px;padding:0 22px;flex:none}
.sa-result{max-width:520px;padding:14px 18px;border-radius:calc(var(--st-radius) * 1px);font-weight:600;line-height:1.5;border:1.5px solid transparent}
.sa-result[hidden],.sa-cta[hidden]{display:none}
.sa-result.is-yes{background:color-mix(in srgb,#16a34a 12%,var(--st-bg));border-color:color-mix(in srgb,#16a34a 45%,transparent);color:color-mix(in srgb,#16a34a 55%,var(--st-text))}
.sa-result.is-no{background:color-mix(in srgb,#d97706 12%,var(--st-bg));border-color:color-mix(in srgb,#d97706 45%,transparent);color:color-mix(in srgb,#d97706 50%,var(--st-text))}
.sa-result.is-bad{background:color-mix(in srgb,#dc2626 10%,var(--st-bg));border-color:color-mix(in srgb,#dc2626 40%,transparent);color:color-mix(in srgb,#dc2626 55%,var(--st-text))}
.sa-panel{padding:clamp(20px,2.6cqi,34px);border-radius:calc(var(--st-radius) * 1.5px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.sa-ptitle{font-size:18px;margin-bottom:14px}
.sa-areas{list-style:none;display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0}
.sa-chip{display:inline-flex;align-items:baseline;gap:8px;padding:8px 14px;border-radius:99px;background:var(--st-bg);border:1.5px solid color-mix(in srgb,var(--st-text) 12%,transparent);font-size:14px;transition:border-color .2s,background .2s,box-shadow .2s}
.sa-chip strong{font:700 14px/1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--st-brand)}
.sa-chip span{color:var(--st-muted);font-weight:500}
.sa-chip.is-match{border-color:#16a34a;background:color-mix(in srgb,#16a34a 12%,var(--st-bg));box-shadow:0 0 0 3px color-mix(in srgb,#16a34a 22%,transparent)}
.sa-note{margin-top:14px;font-size:13px;color:var(--st-muted)}
@container st (max-width:820px){.sa{grid-template-columns:1fr}}`,
};
