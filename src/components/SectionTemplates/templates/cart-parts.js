/* Shared by the cart and checkout sections (cart-drawer, cart-page, checkout-page, order-confirmation).
   The cart itself is BEHAVIORS.cartcore (behaviors.js): window.WDPCart, saved in localStorage. Rows are built in
   JavaScript from the cart, so the markup here is only the styles and the demo items shown in the editors. */
import { IMG, esc } from './meta.js';

/* Items shown while editing (and in the builder when the cart is empty), so every section looks finished */
export const DEMO_CART = [
  { name: 'Sona One wireless headphones', priceText: '$199', image: IMG('product-headphones.png'), colour: 'Midnight', size: '', qty: 1 },
  { name: 'Sona Buds earbuds', priceText: '$89', image: IMG('product-earbuds.png'), colour: '', size: '', qty: 2 },
  { name: 'Sona Pocket speaker', priceText: '$129', image: IMG('product-speaker.png'), colour: '', size: '', qty: 1 },
];
export const demoAttr = () => `data-demo="${esc(JSON.stringify(DEMO_CART))}"`;

/* Screen-reader labels of a cart row, written onto the list element (read by WDPCart.row) */
export const ROW_LABELS_ATTR = 'data-set="data-l-remove:removeLabel;data-l-minus:minusLabel;data-l-plus:plusLabel;data-l-qty:qtyLabel"';
export const rowLabelFields = (group = 'labels') => [
  { key: 'removeLabel', group, label: 'Remove button label', type: 'text', value: 'Remove' },
  { key: 'minusLabel', group, label: 'Minus button label', type: 'text', value: 'Decrease quantity' },
  { key: 'plusLabel', group, label: 'Plus button label', type: 'text', value: 'Increase quantity' },
  { key: 'qtyLabel', group, label: 'Quantity label', type: 'text', value: 'Quantity' },
];

/* Money helpers for the "Subtotal / Shipping" lines: free shipping above a threshold */
export const shippingFields = (group = 'shipping') => [
  { key: 'freeOver', group, label: 'Free shipping over (number, optional)', type: 'text', value: '150', hint: 'Such as 150. Leave empty to turn the free-shipping bar off.' },
  { key: 'shipFlat', group, label: 'Shipping cost below that (number)', type: 'text', value: '9', hint: 'A flat rate, such as 9. Use 0 for free shipping on everything.' },
];

export const CART_ROW_CSS = `.wc-list{list-style:none;display:flex;flex-direction:column}
.wc-row{display:grid;grid-template-columns:72px minmax(0,1fr) auto;gap:6px 14px;align-items:start;padding:16px 0;border-bottom:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.wc-img,.wc-img-ph{width:72px;height:90px;border-radius:calc(var(--st-radius) * .6px);object-fit:cover;background:var(--st-surface)}
.wc-info{display:flex;flex-direction:column;gap:3px;min-width:0}
.wc-name{font:700 15.5px/1.35 var(--st-font-heading);letter-spacing:-.01em}
.wc-var{color:var(--st-muted);font-size:13.5px}
.wc-price{color:var(--st-muted);font-size:14px}
.wc-side{display:flex;flex-direction:column;align-items:flex-end;gap:8px}
.wc-line{font:800 16px/1 var(--st-font-heading)}
.wc-qty{display:inline-flex;align-items:center;border:1.5px solid color-mix(in srgb,var(--st-text) 18%,transparent);border-radius:calc(var(--st-radius) * .6px);overflow:hidden}
.wc-qty button{width:32px;height:32px;border:0;background:none;color:var(--st-text);font:600 17px/1 var(--st-font-body);cursor:pointer}
.wc-qty button:hover{background:color-mix(in srgb,var(--st-text) 8%,transparent)}
.wc-n{min-width:26px;text-align:center;font:700 14.5px/1 var(--st-font-body)}
.wc-fixed-qty{color:var(--st-muted);font-size:13.5px}
.wc-remove{border:0;background:none;padding:2px 0;color:var(--st-muted);font:600 13px/1.2 var(--st-font-body);text-decoration:underline;cursor:pointer}
.wc-remove:hover{color:#dc2626}
.wc-qty button:focus-visible,.wc-remove:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:2px}
.wc-sum{display:flex;flex-direction:column;gap:10px}
.wc-sum-row{display:flex;justify-content:space-between;gap:16px;font-size:15.5px}
.wc-sum-row span:first-child{color:var(--st-muted)}
.wc-sum-row strong{font-weight:700}
.wc-sum-row.is-total{padding-top:12px;margin-top:2px;border-top:1px solid color-mix(in srgb,var(--st-text) 14%,transparent);font-size:18px}
.wc-sum-row.is-total span:first-child{color:var(--st-text);font-weight:700}
.wc-sum-row.is-total strong{font:800 22px/1 var(--st-font-heading)}
.wc-free{display:flex;flex-direction:column;gap:8px;padding:12px 14px;border-radius:calc(var(--st-radius) * .8px);background:color-mix(in srgb,var(--st-brand) 9%,transparent);font-size:14px;font-weight:600}
.wc-free[hidden]{display:none}
.wc-bar{height:6px;border-radius:99px;background:color-mix(in srgb,var(--st-text) 12%,transparent);overflow:hidden}
.wc-bar i{display:block;height:100%;width:0;border-radius:99px;background:var(--st-brand);transition:width .4s ease}
.wc-empty{display:flex;flex-direction:column;align-items:flex-start;gap:14px;padding:28px 0;color:var(--st-muted)}
.wc-empty[hidden]{display:none}
@media (prefers-reduced-motion:reduce){.wc-bar i{transition:none}}`;

/* Layout shared by the cart, checkout, confirmation, orders and wishlist pages */
export const PAGE_CSS = `.cx-grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(300px,1fr);gap:clamp(28px,4cqi,64px);align-items:start}
.cx-card{padding:clamp(20px,2.6cqi,30px);border-radius:calc(var(--st-radius) * 1.3px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 7%,transparent)}
.cx-sticky{position:sticky;top:24px}
.cx-title{font-size:20px;margin-bottom:16px}
.cx-note{color:var(--st-muted);font-size:13.5px;line-height:1.5}
.cx-link{color:var(--st-text);font-weight:600;text-decoration:underline;text-underline-offset:3px}
.cx-link:hover{color:var(--st-brand)}
.cx-back{display:inline-flex;align-items:center;gap:6px;margin-top:18px;color:var(--st-text);font-weight:600;text-decoration:none}
.cx-back:hover{color:var(--st-brand)}
.cx-msg{padding:9px 12px;border-radius:calc(var(--st-radius) * .6px);font-size:14.5px;font-weight:600}
.cx-msg:empty{display:none}
.cx-msg.is-ok{background:color-mix(in srgb,#16a34a 12%,transparent);color:#15803d}
.cx-msg.is-bad{background:#fef2f2;color:#b91c1c}
.cx-preview-note{padding:8px 12px;border-radius:calc(var(--st-radius) * .6px);background:color-mix(in srgb,var(--st-brand) 10%,transparent);color:var(--st-text);font-size:13.5px;font-weight:600}
@container st (max-width:900px){.cx-grid{grid-template-columns:minmax(0,1fr)}.cx-sticky{position:static}}
@container st (max-width:520px){.wc-row{grid-template-columns:60px minmax(0,1fr);}.wc-img,.wc-img-ph{width:60px;height:76px}.wc-side{grid-column:2;flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:wrap}}`;
