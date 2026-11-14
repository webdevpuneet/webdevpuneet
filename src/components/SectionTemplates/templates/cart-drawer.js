import { ICONS } from './icons.js';
import { CART_ROW_CSS, demoAttr, ROW_LABELS_ATTR, rowLabelFields, shippingFields } from './cart-parts.js';

const svg = (name, cls = '') => `<svg ${cls ? `class="${cls}" ` : ''}viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name][1]}</svg>`;
const X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';

export default {
  id: 'cart-drawer',
  name: 'Cart Drawer (Mini Cart)',
  version: '1.0.0',
  category: 'effects',
  overlay: true, // floating: takes no space in the page; the Website Builder labels it "Floating" in the section list
  tags: ['cart', 'mini-cart', 'drawer', 'ecommerce', 'shop', 'checkout', 'free-shipping', 'slide-in', 'floating', 'light'],
  created: '2026-11-14',
  updated: '2026-11-14',
  seoTitle: 'Cart Drawer Template — Free Slide-In Mini Cart HTML & JS',
  seoDescription: 'Free slide-in cart drawer: items with quantity steppers, subtotal, a free-shipping progress bar and checkout button. Works with the shop sections. Export HTML.',
  description: 'The mini cart that slides in from the side when a shopper adds a product or taps the cart icon. It lists the items with photos, options and quantity steppers, shows a free-shipping progress bar and the subtotal, and offers Checkout, View cart and Continue shopping. It reads the shared cart, saved in the visitor\'s browser, so it works with the Product Detail, Product Grid and Wishlist sections and the ecommerce mega menus. It takes no space in the page.',
  bestFor: ['Online stores built from these sections', 'Shops that want a quick cart without leaving the page', 'Order-by-message and payment-link shops'],
  behaviors: ['cartcore', 'cartdrawer'],
  previewMinHeight: 700,

  groups: [
    { id: 'head', label: 'Heading' },
    { id: 'empty', label: 'Empty cart' },
    { id: 'foot', label: 'Totals & buttons' },
    { id: 'shipping', label: 'Free shipping bar', toggle: 'showFree' },
    { id: 'look', label: 'Position' },
    { id: 'labels', label: 'Labels (screen readers)' },
  ],
  fields: [
    { key: 'title', group: 'head', label: 'Title', type: 'text', value: 'Your cart' },
    { key: 'emptyTitle', group: 'empty', label: 'Empty cart title', type: 'text', value: 'Your cart is empty' },
    { key: 'emptyText', group: 'empty', label: 'Empty cart text', type: 'text', value: 'Add something you love and it will appear here.' },
    { key: 'continueText', group: 'empty', label: 'Continue shopping text', type: 'text', value: 'Continue shopping' },
    { key: 'continueUrl', group: 'empty', label: 'Continue shopping link', type: 'url', value: '/shop/' },
    { key: 'subtotalLabel', group: 'foot', label: 'Subtotal label', type: 'text', value: 'Subtotal' },
    { key: 'note', group: 'foot', label: 'Note under the subtotal', type: 'text', value: 'Shipping and taxes are calculated at checkout.' },
    { key: 'checkoutText', group: 'foot', label: 'Checkout button text', type: 'text', value: 'Checkout' },
    { key: 'checkoutUrl', group: 'foot', label: 'Checkout page link', type: 'url', value: '/checkout/' },
    { key: 'viewCartText', group: 'foot', label: 'View cart link text (optional)', type: 'text', value: 'View cart' },
    { key: 'cartUrl', group: 'foot', label: 'Cart page link', type: 'url', value: '/cart/' },
    ...shippingFields('shipping'),
    { key: 'freeMore', group: 'shipping', label: 'Message while below the amount', type: 'text', value: 'You are {amount} away from free shipping', hint: '{amount} becomes the amount still needed.' },
    { key: 'freeDone', group: 'shipping', label: 'Message when reached', type: 'text', value: 'You have free shipping!' },
    { key: 'position', group: 'look', label: 'Slides in from', type: 'choice', options: [['right', 'The right'], ['left', 'The left']], value: 'right' },
    { key: 'closeLabel', group: 'labels', label: 'Close button label', type: 'text', value: 'Close cart' },
    { key: 'openLabel', group: 'labels', label: 'Open button label (Website Builder preview)', type: 'text', value: 'Open cart' },
    ...rowLabelFields('labels'),
  ],
  toggles: [
    { key: 'showFree', label: 'Free-shipping bar', value: true },
    { key: 'showNote', label: 'Note under the subtotal', value: true },
    { key: 'showViewCart', label: 'View cart link', value: true },
  ],
  theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f3f6fa', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="cd" data-cd data-set="data-pos:position;data-free-over:freeOver;data-ship-flat:shipFlat;data-free-more:freeMore;data-free-done:freeDone" ${demoAttr()}>
  <button type="button" class="cd-fab" data-cd-fab data-set="aria-label:openLabel">${svg('shopping-cart')}<span class="cd-fab-n" data-cd-fab-n></span></button>
  <div class="cd-backdrop" data-cd-close></div>
  <aside class="cd-panel" role="dialog" aria-modal="true" tabindex="-1" data-set="aria-label:title">
    <header class="cd-head">
      <h2 class="cd-title" data-edit="title"></h2>
      <button type="button" class="cd-close" data-cd-close data-set="aria-label:closeLabel">${X}</button>
    </header>
    <div class="wc-free" data-cd-free data-show="showFree" hidden><span data-cd-free-text></span><span class="wc-bar"><i data-cd-free-bar></i></span></div>
    <ul class="wc-list cd-items" data-cd-items ${ROW_LABELS_ATTR}></ul>
    <div class="wc-empty cd-empty" data-cd-empty hidden>
      <p class="cd-empty-title" data-edit="emptyTitle"></p>
      <p data-edit="emptyText"></p>
      <a class="st-btn" data-href="continueUrl"><span data-edit="continueText"></span></a>
    </div>
    <footer class="cd-foot" data-cd-foot>
      <div class="wc-sum-row is-total"><span data-edit="subtotalLabel"></span><strong data-cd-subtotal></strong></div>
      <p class="cd-note" data-show="showNote" data-edit="note"></p>
      <a class="st-btn cd-checkout" data-href="checkoutUrl"><span data-edit="checkoutText"></span></a>
      <a class="cd-view" data-show="showViewCart" data-show-if="viewCartText" data-href="cartUrl"><span data-edit="viewCartText"></span></a>
    </footer>
  </aside>
</div>`,
  css: `.st-cart-drawer{overflow:visible;container-type:normal;height:0;min-height:0;padding:0;background:transparent}
.st-cart-drawer:has(.cd.is-preview){height:auto;min-height:700px;padding:clamp(16px,2vw,24px) var(--st-pad);background:color-mix(in srgb,var(--st-text) 8%,var(--st-bg))}
${CART_ROW_CSS}
.cd-fab{display:none;position:fixed;left:20px;bottom:88px;z-index:2147482050;place-items:center;width:54px;height:54px;padding:0;border:3px solid #fff;border-radius:50%;background:var(--st-brand);color:var(--st-btn-text);box-shadow:0 10px 26px rgba(15,23,42,.3);cursor:pointer}
.cd-fab svg{width:24px;height:24px}
.cd-fab-n{position:absolute;top:-6px;right:-6px;min-width:20px;height:20px;padding:0 5px;border-radius:99px;background:#0f172a;color:#fff;font:700 11.5px/20px var(--st-font-body);text-align:center}
.cd-fab-n:empty{display:none}
.cd.is-btn .cd-fab{display:grid}
.cd-backdrop{position:fixed;inset:0;z-index:2147482100;background:rgba(15,23,42,.5);opacity:0;visibility:hidden;transition:opacity .3s ease,visibility 0s linear .3s}
.cd-panel{position:fixed;top:0;bottom:0;right:0;z-index:2147482101;display:flex;flex-direction:column;gap:0;width:min(420px,100vw);background:var(--st-bg);color:var(--st-text);font-family:var(--st-font-body);font-size:16px;line-height:1.5;box-shadow:-24px 0 60px -30px rgba(15,23,42,.55);transform:translateX(105%);visibility:hidden;outline:none;transition:transform .35s cubic-bezier(.2,.8,.2,1),visibility 0s linear .35s}
.cd[data-pos=left] .cd-panel{right:auto;left:0;transform:translateX(-105%);box-shadow:24px 0 60px -30px rgba(15,23,42,.55)}
.cd.is-open .cd-backdrop{opacity:1;visibility:visible;transition-delay:0s}
.cd.is-open .cd-panel{transform:none;visibility:visible;transition-delay:0s}
.cd-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:20px 22px 14px}
.cd-title{font-size:22px}
.cd-close{display:grid;place-items:center;width:40px;height:40px;padding:0;border:0;border-radius:50%;background:color-mix(in srgb,var(--st-text) 7%,transparent);color:var(--st-text);cursor:pointer}
.cd-close svg{width:20px;height:20px}
.cd-close:hover{background:color-mix(in srgb,var(--st-text) 13%,transparent)}
.cd-close:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:2px}
.cd .wc-free{margin:0 22px 6px}
.cd-items{flex:1 1 auto;min-height:0;overflow:auto;padding:0 22px}
.cd-items[hidden]{display:none}
.cd-empty{flex:1 1 auto;justify-content:center;padding:28px 22px}
.cd-empty-title{color:var(--st-text);font:800 20px/1.2 var(--st-font-heading)}
.cd-foot{display:flex;flex-direction:column;gap:12px;padding:16px 22px 22px;border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);background:var(--st-bg)}
.cd-foot[hidden]{display:none}
.cd-note{color:var(--st-muted);font-size:13.5px}
.cd-checkout{width:100%}
.cd-view{align-self:center;color:var(--st-text);font-weight:600;font-size:15px;text-decoration:underline;text-underline-offset:3px}
.cd-view:hover{color:var(--st-brand)}
.cd.is-preview .cd-fab,.cd.is-preview .cd-backdrop{display:none}
.cd.is-preview .cd-panel{position:relative;inset:auto;transform:none;visibility:visible;margin:0 auto;width:min(420px,100%);height:auto;max-height:none;border-radius:calc(var(--st-radius) * 1.2px);overflow:hidden}
@media (prefers-reduced-motion:reduce){.cd-panel,.cd-backdrop{transition:none}}`,
};
