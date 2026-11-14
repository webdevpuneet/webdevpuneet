import { IMG, esc } from './meta.js';
import { CART_ROW_CSS, PAGE_CSS, ROW_LABELS_ATTR, rowLabelFields, DEMO_CART } from './cart-parts.js';

/* Orders shown while editing (the live page shows the orders saved by the Checkout Page in this browser) */
const DEMO_ORDERS = [
  { id: 'WD-48213', date: '2026-10-28', status: 'Delivered', email: 'sam@example.com', cur: '$', subtotal: 296, discount: 0, shipping: 0, total: 296, method: 'Standard delivery', payment: 'Pay online', address: 'Sam Rivera, 14 Elm Street, Leeds LS1 4AB, United Kingdom', items: [DEMO_CART[0], { ...DEMO_CART[1], qty: 1 }] },
  { id: 'WD-47102', date: '2026-09-12', status: 'Delivered', email: 'sam@example.com', cur: '$', subtotal: 129, discount: 12.9, shipping: 9, total: 125.1, method: 'Standard delivery', payment: 'Pay on delivery', address: 'Sam Rivera, 14 Elm Street, Leeds LS1 4AB, United Kingdom', items: [{ ...DEMO_CART[2], image: IMG('product-speaker.png') }] },
];
const demoOrders = () => `data-demo-orders="${esc(JSON.stringify(DEMO_ORDERS))}"`;

export default {
  id: 'order-history',
  name: 'Order History (My Orders)',
  version: '1.0.0',
  category: 'checkout',
  tags: ['orders', 'order-history', 'purchases', 'my-orders', 'reorder', 'ecommerce', 'shop', 'account', 'light'],
  created: '2026-11-14',
  updated: '2026-11-14',
  seoTitle: 'Order History Template — Free My Orders Page HTML & JS',
  seoDescription: 'Free order history page: past purchases with order number, date, status, items, totals and an Order again button. Reads orders saved by checkout. Export HTML.',
  description: 'A "My orders" page for past purchases. Each order is a card with the order number, date, status and total, a row of product photos, and a details view with every item, the totals, the delivery address and the payment choice. An Order again button puts the same items back in the cart, and an optional Track order link points to your tracking page. Orders come from the Checkout Page and are saved in the shopper\'s browser, so no account is needed.',
  bestFor: ['Small shops without customer accounts', 'Repeat purchases and reorders', 'A simple "where is my order" page'],
  behaviors: ['cartcore', 'orders'],
  previewMinHeight: 0,

  groups: [
    { id: 'head', label: 'Heading' },
    { id: 'card', label: 'Order cards' },
    { id: 'empty', label: 'No orders yet' },
    { id: 'labels', label: 'Labels (screen readers)' },
  ],
  fields: [
    { key: 'eyebrow', group: 'head', label: 'Eyebrow (optional)', type: 'text', value: 'My account' },
    { key: 'heading', group: 'head', label: 'Heading', type: 'text', value: 'Your orders' },
    { key: 'note', group: 'head', label: 'Note (optional)', type: 'text', value: 'Orders placed on this device are listed here.' },
    { key: 'statusText', group: 'card', label: 'Status of a new order', type: 'text', value: 'Order received', hint: 'Orders are saved when they are placed, so this is the status shown until your own system changes it.' },
    { key: 'itemsText', group: 'card', label: 'Item count text', type: 'text', value: '{n} items' },
    { key: 'detailsText', group: 'card', label: 'Details link text', type: 'text', value: 'View details' },
    { key: 'orderLabel', group: 'card', label: 'Order label', type: 'text', value: 'Order' },
    { key: 'dateLabel', group: 'card', label: 'Date label', type: 'text', value: 'Date' },
    { key: 'subtotalLabel', group: 'card', label: 'Subtotal label', type: 'text', value: 'Subtotal' },
    { key: 'discountLabel', group: 'card', label: 'Discount label', type: 'text', value: 'Discount' },
    { key: 'shippingLabel', group: 'card', label: 'Shipping label', type: 'text', value: 'Shipping' },
    { key: 'freeText', group: 'card', label: 'Text when shipping was free', type: 'text', value: 'Free' },
    { key: 'totalLabel', group: 'card', label: 'Total label', type: 'text', value: 'Total' },
    { key: 'shipToLabel', group: 'card', label: 'Delivery address label', type: 'text', value: 'Delivered to' },
    { key: 'reorderText', group: 'card', label: 'Order again button text', type: 'text', value: 'Order again' },
    { key: 'cartUrl', group: 'card', label: 'Cart page link (when there is no cart drawer)', type: 'url', value: '/cart/' },
    { key: 'trackText', group: 'card', label: 'Track order text (optional)', type: 'text', value: 'Track order' },
    { key: 'trackUrl', group: 'card', label: 'Tracking page link', type: 'url', value: '/track-order/', hint: 'The order number is added as ?order=…' },
    { key: 'emptyTitle', group: 'empty', label: 'Title', type: 'text', value: 'No orders yet' },
    { key: 'emptyText', group: 'empty', label: 'Text', type: 'text', value: 'When you place an order on this device it will appear here.' },
    { key: 'shopText', group: 'empty', label: 'Button text', type: 'text', value: 'Start shopping' },
    { key: 'shopUrl', group: 'empty', label: 'Button link', type: 'url', value: '/shop/' },
    ...rowLabelFields('labels'),
  ],
  toggles: [],
  theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f3f6fa', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap oh" data-oh data-set="data-status:statusText;data-items:itemsText;data-details:detailsText;data-order:orderLabel;data-date:dateLabel;data-sub:subtotalLabel;data-disc:discountLabel;data-ship:shippingLabel;data-free-text:freeText;data-total:totalLabel;data-shipto:shipToLabel;data-reorder:reorderText;data-cart-url:cartUrl;data-track:trackText;data-track-url:trackUrl" ${demoOrders()}>
  <header class="st-head st-head--left oh-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-edit="heading"></h2>
    <p class="st-lead" data-show-if="note" data-edit="note"></p>
  </header>
  <ul class="oh-list" data-oh-list ${ROW_LABELS_ATTR}></ul>
  <div class="wc-empty oh-empty" data-oh-empty hidden>
    <h3 data-edit="emptyTitle"></h3>
    <p data-edit="emptyText"></p>
    <a class="st-btn" data-href="shopUrl"><span data-edit="shopText"></span></a>
  </div>
</div>`,
  css: `.st-order-history{padding:clamp(40px,5cqi,80px) 0}
.oh-head{margin-bottom:clamp(24px,3cqi,40px)}
${CART_ROW_CSS}
${PAGE_CSS}
.oh-list{list-style:none;display:flex;flex-direction:column;gap:18px}
.oh-list[hidden]{display:none}
.oh-card{display:flex;flex-direction:column;gap:16px}
.oh-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 24px}
.oh-meta{display:flex;flex-wrap:wrap;gap:6px 28px}
.oh-meta div{display:flex;flex-direction:column}
.oh-meta dt{color:var(--st-muted);font-size:12.5px;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
.oh-meta dd{font-weight:700}
.oh-status{padding:4px 12px;border-radius:99px;background:color-mix(in srgb,var(--st-brand) 12%,transparent);color:var(--st-brand);font:700 13px/1.5 var(--st-font-body)}
.oh-status.is-done{background:color-mix(in srgb,#16a34a 14%,transparent);color:#15803d}
.oh-thumbs{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.oh-thumb{width:56px;height:70px;border-radius:calc(var(--st-radius) * .5px);object-fit:cover;background:var(--st-bg)}
.oh-count{color:var(--st-muted);font-size:14px;margin-left:6px}
.oh-details summary{cursor:pointer;font-weight:700;list-style:none;display:inline-flex;align-items:center;gap:6px}
.oh-details summary::-webkit-details-marker{display:none}
.oh-details summary::after{content:"+";display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:color-mix(in srgb,var(--st-brand) 12%,transparent);color:var(--st-brand);font-weight:800}
.oh-details[open] summary::after{content:"−"}
.oh-details summary:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:3px;border-radius:6px}
.oh-body{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(240px,1fr);gap:clamp(20px,3cqi,40px);margin-top:10px}
.oh-ship{font-size:14.5px;color:var(--st-muted);line-height:1.6}
.oh-ship strong{display:block;color:var(--st-text);margin-bottom:2px}
.oh-actions{display:flex;flex-wrap:wrap;gap:10px}
.oh-actions .st-btn{min-height:44px;padding:0 20px;font-size:15px}
.wc-sum-row[hidden]{display:none}
@container st (max-width:760px){.oh-body{grid-template-columns:minmax(0,1fr)}}`,
};
