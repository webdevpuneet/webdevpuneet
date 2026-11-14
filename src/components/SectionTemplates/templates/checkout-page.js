import { CART_ROW_CSS, PAGE_CSS, demoAttr, ROW_LABELS_ATTR, rowLabelFields, shippingFields } from './cart-parts.js';

const FIELD = (name, label, type, extra = '') => `<label class="ck-field"><span data-edit="${label}"></span><input name="${name}" type="${type}" ${extra}></label>`;

export default {
  id: 'checkout-page',
  name: 'Checkout Page',
  version: '1.0.0',
  category: 'checkout',
  tags: ['checkout', 'ecommerce', 'shop', 'order', 'shipping', 'payment-link', 'whatsapp', 'order-by-message', 'form', 'light'],
  created: '2026-11-14',
  updated: '2026-11-14',
  seoTitle: 'Checkout Page Template — Free Order Form & Payment Link HTML',
  seoDescription: 'Free checkout page: contact, shipping address, shipping method and payment choice with an order summary. Sends the order by form, WhatsApp or a payment link.',
  description: 'A clean one-page checkout. The shopper gives contact details and a shipping address, picks a shipping method and a payment option, and sees the order summary beside the form. When they press Place order the page sends the order to your form service (Formspree and similar), opens WhatsApp with the order text or goes to your payment link (Stripe, PayPal, Razorpay), then shows the confirmation page. There are no card fields: payment is handled by the service you choose.',
  bestFor: ['Small shops without a payment backend', 'Bakeries, local shops and services taking orders by message', 'Stores that use Stripe, PayPal or Razorpay payment links'],
  behaviors: ['cartcore', 'checkout'],
  previewMinHeight: 0,

  groups: [
    { id: 'head', label: 'Heading' },
    { id: 'contact', label: 'Contact & address' },
    { id: 'delivery', label: 'Shipping methods' },
    { id: 'pay', label: 'Payment options' },
    { id: 'send', label: 'How the order is sent' },
    { id: 'summary', label: 'Order summary & button' },
    { id: 'shipping', label: 'Free-shipping rule' },
    { id: 'labels', label: 'Labels (screen readers)' },
  ],
  fields: [
    { key: 'eyebrow', group: 'head', label: 'Eyebrow (optional)', type: 'text', value: 'Secure checkout' },
    { key: 'heading', group: 'head', label: 'Heading', type: 'text', value: 'Checkout' },
    { key: 'contactTitle', group: 'contact', label: 'Contact title', type: 'text', value: 'Contact' },
    { key: 'emailLabel', group: 'contact', label: 'Email label', type: 'text', value: 'Email' },
    { key: 'phoneLabel', group: 'contact', label: 'Phone label (optional field)', type: 'text', value: 'Phone (optional)' },
    { key: 'addressTitle', group: 'contact', label: 'Address title', type: 'text', value: 'Shipping address' },
    { key: 'nameLabel', group: 'contact', label: 'Full name label', type: 'text', value: 'Full name' },
    { key: 'addressLabel', group: 'contact', label: 'Address label', type: 'text', value: 'Address' },
    { key: 'cityLabel', group: 'contact', label: 'City label', type: 'text', value: 'City' },
    { key: 'postcodeLabel', group: 'contact', label: 'Postcode label', type: 'text', value: 'Postcode' },
    { key: 'countryLabel', group: 'contact', label: 'Country label', type: 'text', value: 'Country' },
    { key: 'noteLabel', group: 'contact', label: 'Order note label', type: 'text', value: 'Order note (optional)' },
    { key: 'shippingTitle', group: 'delivery', label: 'Shipping title', type: 'text', value: 'Shipping method' },
    { key: 'paymentTitle', group: 'pay', label: 'Payment title', type: 'text', value: 'Payment' },
    { key: 'submitMode', group: 'send', label: 'When the order is placed', type: 'choice', options: [['form', 'Send it to a form service (Formspree, Basin…)'], ['whatsapp', 'Open WhatsApp with the order'], ['link', 'Go to a payment link (Stripe, PayPal, Razorpay…)']], value: 'form' },
    { key: 'formAction', group: 'send', label: 'Form URL (for "form service")', type: 'url', value: 'https://formspree.io/f/your-form-id', hint: 'The order is posted as JSON with the items, totals and contact details.' },
    { key: 'whatsapp', group: 'send', label: 'WhatsApp number (for "WhatsApp")', type: 'text', value: '15551234567', hint: 'Digits only, with the country code and no +.' },
    { key: 'paymentUrl', group: 'send', label: 'Payment link (for "payment link")', type: 'url', value: 'https://buy.stripe.com/your-link', hint: 'The order is saved here first, then the shopper goes to this page to pay.' },
    { key: 'thankYouUrl', group: 'send', label: 'Confirmation page link', type: 'url', value: '/thank-you/' },
    { key: 'orderPrefix', group: 'send', label: 'Order number prefix', type: 'text', value: 'WD' },
    { key: 'errorText', group: 'send', label: 'Message when sending fails', type: 'text', value: 'Sorry, the order could not be sent. Please try again or contact us.' },
    { key: 'previewText', group: 'send', label: 'Message in the editor preview', type: 'text', value: 'Preview only: no order is sent from the editor.' },
    { key: 'summaryTitle', group: 'summary', label: 'Summary title', type: 'text', value: 'Order summary' },
    { key: 'subtotalLabel', group: 'summary', label: 'Subtotal label', type: 'text', value: 'Subtotal' },
    { key: 'discountLabel', group: 'summary', label: 'Discount label', type: 'text', value: 'Discount' },
    { key: 'shippingLabel', group: 'summary', label: 'Shipping label', type: 'text', value: 'Shipping' },
    { key: 'freeText', group: 'summary', label: 'Text when shipping is free', type: 'text', value: 'Free' },
    { key: 'totalLabel', group: 'summary', label: 'Total label', type: 'text', value: 'Total' },
    { key: 'placeText', group: 'summary', label: 'Place order button text', type: 'text', value: 'Place order' },
    { key: 'termsText', group: 'summary', label: 'Terms text (optional, adds a required checkbox)', type: 'text', value: 'I agree to the terms and the returns policy.' },
    { key: 'emptyText', group: 'summary', label: 'Text when the cart is empty', type: 'text', value: 'Your cart is empty, so there is nothing to check out yet.' },
    { key: 'emptyLinkText', group: 'summary', label: 'Empty cart link text', type: 'text', value: 'Back to the shop' },
    { key: 'emptyLinkUrl', group: 'summary', label: 'Empty cart link', type: 'url', value: '/shop/' },
    ...shippingFields('shipping').filter(f => f.key === 'freeOver').map(f => ({ ...f, label: 'Free shipping over (number, optional)', hint: 'Applies to the first shipping method (your standard delivery). The other methods keep their own cost. Leave empty for no free-shipping rule.' })),
    ...rowLabelFields('labels'),
  ],
  lists: [
    {
      key: 'methods', group: 'delivery', label: 'Shipping methods', itemLabel: 'Method', titleKey: 'label', min: 1, max: 4,
      fields: [
        { key: 'label', label: 'Name', type: 'text', value: 'Standard' },
        { key: 'note', label: 'Note (optional)', type: 'text', value: '' },
        { key: 'cost', label: 'Cost (number, 0 = free)', type: 'text', value: '0' },
      ],
      value: [
        { label: 'Standard delivery', note: '3–5 working days', cost: '9' },
        { label: 'Express delivery', note: 'Next working day', cost: '19' },
        { label: 'Collect in store', note: 'Ready in 2 hours', cost: '0' },
      ],
    },
    {
      key: 'payments', group: 'pay', label: 'Payment options', itemLabel: 'Option', titleKey: 'label', min: 1, max: 4,
      fields: [
        { key: 'label', label: 'Name', type: 'text', value: 'Pay online' },
        { key: 'note', label: 'Note (optional)', type: 'text', value: '' },
      ],
      value: [
        { label: 'Pay online', note: 'Card, wallet or bank, on the next page' },
        { label: 'Pay on delivery', note: 'Cash or card to the courier' },
      ],
    },
  ],
  toggles: [],
  theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f3f6fa', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap ck" data-ck data-set="data-mode:submitMode;data-action:formAction;data-whatsapp:whatsapp;data-pay-url:paymentUrl;data-done:thankYouUrl;data-free-over:freeOver;data-ship-flat:shipFlat;data-error:errorText;data-prefix:orderPrefix;data-preview:previewText;data-free-text:freeText" ${demoAttr()}>
  <header class="st-head st-head--left ck-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-edit="heading"></h2>
  </header>
  <div class="cx-grid">
    <form class="ck-form" data-ck-form method="post">
      <fieldset class="cx-card ck-set">
        <legend class="cx-title" data-edit="contactTitle"></legend>
        <div class="ck-row">
          ${FIELD('email', 'emailLabel', 'email', 'required autocomplete="email"')}
          ${FIELD('phone', 'phoneLabel', 'tel', 'autocomplete="tel"')}
        </div>
      </fieldset>
      <fieldset class="cx-card ck-set">
        <legend class="cx-title" data-edit="addressTitle"></legend>
        ${FIELD('name', 'nameLabel', 'text', 'required autocomplete="name"')}
        ${FIELD('address', 'addressLabel', 'text', 'required autocomplete="street-address"')}
        <div class="ck-row ck-row-3">
          ${FIELD('city', 'cityLabel', 'text', 'required autocomplete="address-level2"')}
          ${FIELD('postcode', 'postcodeLabel', 'text', 'required autocomplete="postal-code"')}
          ${FIELD('country', 'countryLabel', 'text', 'required autocomplete="country-name"')}
        </div>
      </fieldset>
      <fieldset class="cx-card ck-set">
        <legend class="cx-title" data-edit="shippingTitle"></legend>
        <ul class="ck-options" data-list="methods">
          <li><label class="ck-opt"><input type="radio" name="shipping" data-set="value:label;data-cost:cost"><span class="ck-opt-main"><strong data-edit="label"></strong><small data-edit="note"></small></span><span class="ck-opt-price" data-ck-cost></span></label></li>
        </ul>
      </fieldset>
      <fieldset class="cx-card ck-set">
        <legend class="cx-title" data-edit="paymentTitle"></legend>
        <ul class="ck-options" data-list="payments">
          <li><label class="ck-opt"><input type="radio" name="payment" data-set="value:label"><span class="ck-opt-main"><strong data-edit="label"></strong><small data-edit="note"></small></span></label></li>
        </ul>
        ${FIELD('note', 'noteLabel', 'text', 'autocomplete="off"')}
      </fieldset>
      <input class="ck-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
      <label class="ck-terms" data-show-if="termsText"><input type="checkbox" name="terms" required><span data-edit="termsText"></span></label>
      <p class="cx-msg is-bad" data-ck-error role="alert"></p>
      <button type="submit" class="st-btn ck-place" data-ck-place><span data-edit="placeText"></span></button>
    </form>
    <aside class="cx-card cx-sticky ck-summary">
      <h3 class="cx-title" data-edit="summaryTitle"></h3>
      <ul class="wc-list ck-items" data-ck-items ${ROW_LABELS_ATTR}></ul>
      <div class="wc-empty" data-ck-empty hidden><p data-edit="emptyText"></p><a class="st-btn st-btn--ghost" data-href="emptyLinkUrl"><span data-edit="emptyLinkText"></span></a></div>
      <div class="wc-sum" data-ck-sum>
        <div class="wc-sum-row"><span data-edit="subtotalLabel"></span><strong data-ck-subtotal></strong></div>
        <div class="wc-sum-row" data-ck-discount-row hidden><span data-edit="discountLabel"></span><strong data-ck-discount></strong></div>
        <div class="wc-sum-row"><span data-edit="shippingLabel"></span><strong data-ck-shipping></strong></div>
        <div class="wc-sum-row is-total"><span data-edit="totalLabel"></span><strong data-ck-total></strong></div>
      </div>
      <p class="cx-preview-note" data-ck-preview hidden></p>
    </aside>
  </div>
</div>`,
  css: `.st-checkout-page{padding:clamp(40px,5cqi,80px) 0}
.ck-head{margin-bottom:clamp(24px,3cqi,40px)}
${CART_ROW_CSS}
${PAGE_CSS}
.ck-form{display:flex;flex-direction:column;gap:18px;min-width:0}
.ck-set{display:flex;flex-direction:column;gap:14px;margin:0;min-width:0}
.ck-set .cx-title{float:left;width:100%;margin:0 0 2px;padding:0}
.ck-set .cx-title + *{clear:both}
.ck-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.ck-row-3{grid-template-columns:1.2fr .8fr 1fr}
.ck-field{display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:600}
.ck-field input{width:100%;height:48px;padding:0 14px;border:1px solid color-mix(in srgb,var(--st-text) 16%,transparent);border-radius:calc(var(--st-radius) * .7px);background:var(--st-bg);color:var(--st-text);font:400 16px/1 var(--st-font-body);outline:none;transition:border-color .2s ease,box-shadow .2s ease}
.ck-field input:focus{border-color:var(--st-brand);box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 16%,transparent)}
.ck-options{list-style:none;display:flex;flex-direction:column;gap:10px}
.ck-opt{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1.5px solid color-mix(in srgb,var(--st-text) 14%,transparent);border-radius:calc(var(--st-radius) * .8px);background:var(--st-bg);cursor:pointer;transition:border-color .2s ease,background .2s ease}
.ck-opt:hover{border-color:color-mix(in srgb,var(--st-text) 35%,transparent)}
.ck-opt:has(input:checked){border-color:var(--st-brand);background:color-mix(in srgb,var(--st-brand) 7%,var(--st-bg))}
.ck-opt:has(input:focus-visible){outline:3px solid color-mix(in srgb,var(--st-brand) 45%,transparent);outline-offset:2px}
.ck-opt input{width:18px;height:18px;flex:none;accent-color:var(--st-brand)}
.ck-opt-main{display:flex;flex-direction:column;flex:1;min-width:0}
.ck-opt-main strong{font-size:15.5px}
.ck-opt-main small{color:var(--st-muted);font-size:13.5px}
.ck-opt-main small:empty{display:none}
.ck-opt-price{font-weight:700;font-size:15px}
.ck-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
.ck-terms{display:flex;align-items:flex-start;gap:10px;font-size:14.5px;color:var(--st-muted)}
.ck-terms input{margin-top:3px;width:17px;height:17px;accent-color:var(--st-brand)}
.ck-place{width:100%;min-height:56px;font-size:17px}
.ck-place[aria-busy="true"]{opacity:.7;cursor:progress}
.ck-summary{display:flex;flex-direction:column;gap:14px}
.ck-summary .cx-title{margin:0}
.ck-items{max-height:360px;overflow:auto}
.ck-items[hidden],.wc-sum[hidden]{display:none}
.wc-sum-row[hidden]{display:none}
@container st (max-width:620px){.ck-row,.ck-row-3{grid-template-columns:minmax(0,1fr)}}`,
};
