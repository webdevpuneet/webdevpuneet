import { CART_ROW_CSS, PAGE_CSS, demoAttr, ROW_LABELS_ATTR, rowLabelFields, shippingFields } from './cart-parts.js';

export default {
  id: 'cart-page',
  name: 'Cart Page',
  version: '1.0.0',
  category: 'checkout',
  tags: ['cart', 'shopping-cart', 'ecommerce', 'shop', 'promo-code', 'shipping', 'order-summary', 'checkout', 'light'],
  created: '2026-11-14',
  updated: '2026-11-14',
  seoTitle: 'Shopping Cart Page Template — Free Ecommerce Cart HTML & JS',
  seoDescription: 'Free cart page: items with photos and quantity steppers, a promo code box, a free-shipping bar and an order summary with a checkout button. Export HTML.',
  description: 'The full shopping cart page. The shopper\'s items sit on the left with photos, options, quantity steppers and Remove links, above a free-shipping progress bar. On the right a sticky order summary shows the subtotal, a promo code that you define, the shipping cost and the total, with a Checkout button. It reads the shared cart saved in the visitor\'s browser, so it works with the Product Detail, Product Grid and Cart Drawer sections.',
  bestFor: ['Online stores built from these sections', 'Order-by-message and payment-link shops', 'Prototypes of a shop cart before a platform is chosen'],
  behaviors: ['cartcore', 'cartpage'],
  previewMinHeight: 0,

  groups: [
    { id: 'head', label: 'Heading' },
    { id: 'empty', label: 'Empty cart' },
    { id: 'summary', label: 'Order summary' },
    { id: 'promo', label: 'Promo code', toggle: 'showPromo' },
    { id: 'shipping', label: 'Shipping & free-shipping bar' },
    { id: 'labels', label: 'Labels (screen readers)' },
  ],
  fields: [
    { key: 'eyebrow', group: 'head', label: 'Eyebrow (optional)', type: 'text', value: 'Shopping cart' },
    { key: 'heading', group: 'head', label: 'Heading', type: 'text', value: 'Your cart' },
    { key: 'emptyTitle', group: 'empty', label: 'Empty cart title', type: 'text', value: 'Your cart is empty' },
    { key: 'emptyText', group: 'empty', label: 'Empty cart text', type: 'text', value: 'Browse the shop and add something you love.' },
    { key: 'continueText', group: 'empty', label: 'Continue shopping text', type: 'text', value: 'Continue shopping' },
    { key: 'continueUrl', group: 'empty', label: 'Continue shopping link', type: 'url', value: '/shop/' },
    { key: 'summaryTitle', group: 'summary', label: 'Summary title', type: 'text', value: 'Order summary' },
    { key: 'subtotalLabel', group: 'summary', label: 'Subtotal label', type: 'text', value: 'Subtotal' },
    { key: 'discountLabel', group: 'summary', label: 'Discount label', type: 'text', value: 'Discount' },
    { key: 'shippingLabel', group: 'summary', label: 'Shipping label', type: 'text', value: 'Shipping' },
    { key: 'freeText', group: 'summary', label: 'Text when shipping is free', type: 'text', value: 'Free' },
    { key: 'totalLabel', group: 'summary', label: 'Total label', type: 'text', value: 'Total' },
    { key: 'checkoutText', group: 'summary', label: 'Checkout button text', type: 'text', value: 'Go to checkout' },
    { key: 'checkoutUrl', group: 'summary', label: 'Checkout page link', type: 'url', value: '/checkout/' },
    { key: 'note', group: 'summary', label: 'Note under the button (optional)', type: 'text', value: 'Taxes are calculated at checkout. Secure payment, 30-day returns.' },
    { key: 'promoLabel', group: 'promo', label: 'Promo code label', type: 'text', value: 'Promo code' },
    { key: 'promoButton', group: 'promo', label: 'Apply button text', type: 'text', value: 'Apply' },
    { key: 'promoCodes', group: 'promo', label: 'Valid codes ("CODE | percent off", one per line)', type: 'textarea', value: 'WELCOME10 | 10\nSAVE20 | 20', hint: 'The discount is applied on this page and shown in the order. A visitor can read the codes in the page source, so your shop must check them again when it takes the order.' },
    { key: 'promoOk', group: 'promo', label: 'Message when a code works', type: 'text', value: 'Code {code} applied.' },
    { key: 'promoBad', group: 'promo', label: 'Message for a wrong code', type: 'text', value: 'That code is not valid.' },
    { key: 'promoRemove', group: 'promo', label: 'Remove code text', type: 'text', value: 'Remove' },
    ...shippingFields('shipping'),
    { key: 'freeMore', group: 'shipping', label: 'Free-shipping message while below the amount', type: 'text', value: 'You are {amount} away from free shipping', hint: '{amount} becomes the amount still needed.' },
    { key: 'freeDone', group: 'shipping', label: 'Free-shipping message when reached', type: 'text', value: 'You have free shipping!' },
    ...rowLabelFields('labels'),
  ],
  toggles: [
    { key: 'showPromo', label: 'Promo code box', value: true },
    { key: 'showFree', label: 'Free-shipping bar', value: true },
  ],
  theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f3f6fa', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap cp" data-cp data-set="data-promos:promoCodes;data-free-over:freeOver;data-ship-flat:shipFlat;data-free-more:freeMore;data-free-done:freeDone;data-promo-ok:promoOk;data-promo-bad:promoBad;data-free-text:freeText" ${demoAttr()}>
  <header class="st-head st-head--left cp-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-edit="heading"></h2>
  </header>
  <div class="cx-grid">
    <div class="cp-main">
      <div class="wc-free" data-cp-free data-show="showFree" hidden><span data-cp-free-text></span><span class="wc-bar"><i data-cp-free-bar></i></span></div>
      <ul class="wc-list" data-cp-items ${ROW_LABELS_ATTR}></ul>
      <div class="wc-empty" data-cp-empty hidden>
        <h3 data-edit="emptyTitle"></h3>
        <p data-edit="emptyText"></p>
        <a class="st-btn" data-href="continueUrl"><span data-edit="continueText"></span></a>
      </div>
      <a class="cx-back" data-cp-back data-href="continueUrl"><span aria-hidden="true">←</span> <span data-edit="continueText"></span></a>
    </div>
    <aside class="cx-card cx-sticky cp-summary" data-cp-summary>
      <h3 class="cx-title" data-edit="summaryTitle"></h3>
      <form class="cp-promo" data-cp-promo data-show="showPromo" novalidate>
        <label class="cp-promo-label" for="cp-code" data-edit="promoLabel"></label>
        <div class="cp-promo-row"><input id="cp-code" name="code" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false"><button type="submit" class="st-btn st-btn--ghost cp-apply"><span data-edit="promoButton"></span></button></div>
        <p class="cx-msg" data-cp-promo-msg role="status"></p>
      </form>
      <div class="wc-sum">
        <div class="wc-sum-row"><span data-edit="subtotalLabel"></span><strong data-cp-subtotal></strong></div>
        <div class="wc-sum-row" data-cp-discount-row hidden><span><span data-edit="discountLabel"></span> <button type="button" class="wc-remove" data-cp-promo-remove data-edit="promoRemove"></button></span><strong data-cp-discount></strong></div>
        <div class="wc-sum-row"><span data-edit="shippingLabel"></span><strong data-cp-shipping></strong></div>
        <div class="wc-sum-row is-total"><span data-edit="totalLabel"></span><strong data-cp-total></strong></div>
      </div>
      <a class="st-btn cp-checkout" data-cp-checkout data-href="checkoutUrl"><span data-edit="checkoutText"></span></a>
      <p class="cx-note" data-show-if="note" data-edit="note"></p>
    </aside>
  </div>
</div>`,
  css: `.st-cart-page{padding:clamp(40px,5cqi,80px) 0}
.cp-head{margin-bottom:clamp(24px,3cqi,40px)}
${CART_ROW_CSS}
${PAGE_CSS}
.cp-main{display:flex;flex-direction:column;gap:18px}
.cp-main .wc-list{border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.cp-main .wc-list[hidden]{display:none}
.cp-summary{display:flex;flex-direction:column;gap:16px}
.cp-summary .cx-title{margin:0}
.cp-promo{display:flex;flex-direction:column;gap:8px}
.cp-promo[hidden]{display:none}
.cp-promo-label{font-size:14px;font-weight:600}
.cp-promo-row{display:flex;gap:8px}
.cp-promo-row input{flex:1;min-width:0;height:46px;padding:0 14px;border:1px solid color-mix(in srgb,var(--st-text) 18%,transparent);border-radius:calc(var(--st-radius) * .7px);background:var(--st-bg);color:var(--st-text);font:600 15px/1 var(--st-font-body);letter-spacing:.04em;text-transform:uppercase;outline:none}
.cp-promo-row input:focus{border-color:var(--st-brand);box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 16%,transparent)}
.cp-apply{min-height:46px;padding:0 18px;font-size:15px}
.cp-checkout{width:100%}
.cp-checkout[aria-disabled="true"]{opacity:.5;pointer-events:none}
.wc-sum-row[hidden]{display:none}`,
};
