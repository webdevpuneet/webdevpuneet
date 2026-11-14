import { ICONS } from './icons.js';
import { CART_ROW_CSS, PAGE_CSS, demoAttr, ROW_LABELS_ATTR } from './cart-parts.js';

const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS['circle-check'][1]}</svg>`;

export default {
  id: 'order-confirmation',
  name: 'Order Confirmation (Thank You)',
  version: '1.0.0',
  category: 'checkout',
  tags: ['order-confirmation', 'thank-you', 'ecommerce', 'shop', 'receipt', 'order-summary', 'next-steps', 'light'],
  created: '2026-11-14',
  updated: '2026-11-14',
  seoTitle: 'Order Confirmation Template — Free Thank You Page HTML',
  seoDescription: 'Free order confirmation page: a thank-you message, order number, items, totals, shipping details and what happens next. Reads the checkout order. Export HTML.',
  description: 'The page shoppers land on after checkout. A big check mark and a thank-you message, the order number, the items they bought with photos, the totals, the shipping address, method and payment choice, and a "what happens next" list. It reads the order saved by the Checkout Page, so every shopper sees their own order, and it offers links to keep shopping and to view their orders.',
  bestFor: ['The page after a checkout or payment link', 'Order-by-message shops', 'Reassuring shoppers and cutting "did it work?" emails'],
  behaviors: ['cartcore', 'orderconf'],
  previewMinHeight: 0,

  groups: [
    { id: 'head', label: 'Thank-you message' },
    { id: 'labels', label: 'Order details' },
    { id: 'next', label: 'What happens next', toggle: 'showNext' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'none', label: 'When there is no order' },
    { id: 'sr', label: 'Labels (screen readers)' },
  ],
  fields: [
    { key: 'title', group: 'head', label: 'Title', type: 'text', value: 'Thank you, {name}!', hint: '{name} becomes the shopper\'s first name. Shown with the real name on the live page only.' },
    { key: 'subtitle', group: 'head', label: 'Message', type: 'textarea', value: 'We have received your order {order}. We will contact you at {email} about delivery.', hint: '{order} and {email} are filled in on the live page.' },
    { key: 'itemsTitle', group: 'labels', label: 'Items title', type: 'text', value: 'Your items' },
    { key: 'subtotalLabel', group: 'labels', label: 'Subtotal label', type: 'text', value: 'Subtotal' },
    { key: 'discountLabel', group: 'labels', label: 'Discount label', type: 'text', value: 'Discount' },
    { key: 'shippingLabel', group: 'labels', label: 'Shipping label', type: 'text', value: 'Shipping' },
    { key: 'freeText', group: 'labels', label: 'Text when shipping is free', type: 'text', value: 'Free' },
    { key: 'totalLabel', group: 'labels', label: 'Total label', type: 'text', value: 'Total' },
    { key: 'detailsTitle', group: 'labels', label: 'Details title', type: 'text', value: 'Order details' },
    { key: 'orderLabel', group: 'labels', label: 'Order number label', type: 'text', value: 'Order number' },
    { key: 'dateLabel', group: 'labels', label: 'Date label', type: 'text', value: 'Date' },
    { key: 'emailLabel', group: 'labels', label: 'Email label', type: 'text', value: 'Email' },
    { key: 'addressLabel', group: 'labels', label: 'Shipping address label', type: 'text', value: 'Shipping to' },
    { key: 'methodLabel', group: 'labels', label: 'Shipping method label', type: 'text', value: 'Delivery' },
    { key: 'paymentLabel', group: 'labels', label: 'Payment label', type: 'text', value: 'Payment' },
    { key: 'nextTitle', group: 'next', label: 'Title', type: 'text', value: 'What happens next' },
    { key: 'continueText', group: 'buttons', label: 'Continue shopping text', type: 'text', value: 'Continue shopping' },
    { key: 'continueUrl', group: 'buttons', label: 'Continue shopping link', type: 'url', value: '/shop/' },
    { key: 'ordersText', group: 'buttons', label: 'View orders text (optional)', type: 'text', value: 'View my orders' },
    { key: 'ordersUrl', group: 'buttons', label: 'Orders page link', type: 'url', value: '/orders/' },
    { key: 'noneTitle', group: 'none', label: 'Title', type: 'text', value: 'No recent order found' },
    { key: 'noneText', group: 'none', label: 'Text', type: 'text', value: 'If you just placed an order, check your email. Otherwise start shopping below.' },
    { key: 'removeLabel', group: 'sr', label: 'Remove label (unused here)', type: 'text', value: 'Remove' },
    { key: 'minusLabel', group: 'sr', label: 'Minus label (unused here)', type: 'text', value: 'Decrease quantity' },
    { key: 'plusLabel', group: 'sr', label: 'Plus label (unused here)', type: 'text', value: 'Increase quantity' },
    { key: 'qtyLabel', group: 'sr', label: 'Quantity word', type: 'text', value: 'Qty' },
  ],
  lists: [{
    key: 'steps', group: 'next', label: 'Steps', itemLabel: 'Step', titleKey: 'title', min: 1, max: 5,
    fields: [
      { key: 'title', label: 'Title', type: 'text', value: 'Step' },
      { key: 'text', label: 'Text', type: 'text', value: 'What happens at this step.' },
    ],
    value: [
      { title: 'We check your order', text: 'You will get a message from us within one working day to confirm the details.' },
      { title: 'We pack and ship it', text: 'Orders placed before 3 pm leave the same working day.' },
      { title: 'It arrives', text: 'Standard delivery takes 3 to 5 working days. Questions? Just reply to our message.' },
    ],
  }],
  toggles: [{ key: 'showNext', label: 'What happens next', value: true }],
  theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f3f6fa', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap oc" data-oc data-set="data-free-text:freeText" ${demoAttr()}>
  <div class="oc-none" data-oc-none hidden>
    <h2 class="st-h2" data-edit="noneTitle"></h2>
    <p class="st-lead" data-edit="noneText"></p>
    <a class="st-btn" data-href="continueUrl"><span data-edit="continueText"></span></a>
  </div>
  <div data-oc-main>
    <header class="oc-hero">
      <span class="st-icon oc-check" aria-hidden="true">${CHECK}</span>
      <h2 class="st-h2" data-anim="item" data-oc-fill data-edit="title"></h2>
      <p class="st-lead oc-sub" data-anim="item" data-oc-fill data-edit="subtitle"></p>
    </header>
    <div class="cx-grid">
      <div class="cx-card">
        <h3 class="cx-title" data-edit="itemsTitle"></h3>
        <ul class="wc-list" data-oc-items ${ROW_LABELS_ATTR}></ul>
        <div class="wc-sum oc-sum">
          <div class="wc-sum-row"><span data-edit="subtotalLabel"></span><strong data-oc-subtotal></strong></div>
          <div class="wc-sum-row" data-oc-discount-row hidden><span data-edit="discountLabel"></span><strong data-oc-discount></strong></div>
          <div class="wc-sum-row"><span data-edit="shippingLabel"></span><strong data-oc-shipping></strong></div>
          <div class="wc-sum-row is-total"><span data-edit="totalLabel"></span><strong data-oc-total></strong></div>
        </div>
      </div>
      <aside class="cx-card oc-details">
        <h3 class="cx-title" data-edit="detailsTitle"></h3>
        <dl class="oc-dl">
          <div><dt data-edit="orderLabel"></dt><dd data-oc-id></dd></div>
          <div><dt data-edit="dateLabel"></dt><dd data-oc-date></dd></div>
          <div><dt data-edit="emailLabel"></dt><dd data-oc-email></dd></div>
          <div><dt data-edit="addressLabel"></dt><dd data-oc-address></dd></div>
          <div><dt data-edit="methodLabel"></dt><dd data-oc-method></dd></div>
          <div><dt data-edit="paymentLabel"></dt><dd data-oc-payment></dd></div>
        </dl>
      </aside>
    </div>
    <section class="oc-next" data-show="showNext">
      <h3 class="cx-title" data-edit="nextTitle"></h3>
      <ol class="oc-steps" data-list="steps">
        <li class="oc-step"><span class="oc-step-n" aria-hidden="true"></span><div><strong data-edit="title"></strong><p data-edit="text"></p></div></li>
      </ol>
    </section>
    <div class="st-btns oc-btns">
      <a class="st-btn" data-href="continueUrl"><span data-edit="continueText"></span></a>
      <a class="st-btn st-btn--ghost" data-show-if="ordersText" data-href="ordersUrl"><span data-edit="ordersText"></span></a>
    </div>
  </div>
</div>`,
  css: `.st-order-confirmation{padding:clamp(40px,5cqi,80px) 0}
${CART_ROW_CSS}
${PAGE_CSS}
.oc-hero{display:flex;flex-direction:column;align-items:center;gap:14px;margin:0 auto clamp(28px,4cqi,48px);max-width:40em;text-align:center}
.oc-check{width:72px;height:72px;border-radius:50%;background:color-mix(in srgb,#16a34a 14%,transparent);color:#16a34a}
.oc-check svg{width:38px;height:38px}
.oc-sub{max-width:34em}
.oc-none{display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center;max-width:36em;margin:0 auto}
.oc-none[hidden],[data-oc-main][hidden]{display:none}
.oc-sum{margin-top:18px}
.oc-dl{display:flex;flex-direction:column;gap:14px}
.oc-dl dt{color:var(--st-muted);font-size:13.5px;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
.oc-dl dd{font-weight:600;word-break:break-word}
.oc-dl dd:empty::before{content:"—";color:var(--st-muted)}
.oc-next{margin-top:clamp(32px,4cqi,56px)}
.oc-steps{list-style:none;counter-reset:s;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px}
.oc-step{display:flex;gap:14px;align-items:flex-start;counter-increment:s}
.oc-step-n{display:grid;place-items:center;flex:none;width:36px;height:36px;border-radius:50%;background:var(--st-brand);color:var(--st-btn-text);font:800 15px/1 var(--st-font-heading)}
.oc-step-n::before{content:counter(s)}
.oc-step p{color:var(--st-muted);font-size:15px;margin-top:2px}
.oc-btns{justify-content:center;margin-top:clamp(28px,4cqi,48px)}
.wc-sum-row[hidden]{display:none}`,
};
