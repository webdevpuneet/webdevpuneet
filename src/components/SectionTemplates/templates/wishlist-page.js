import { ICONS } from './icons.js';
import { esc } from './meta.js';
import { PAGE_CSS, DEMO_CART } from './cart-parts.js';

const demoItems = () => `data-demo="${esc(JSON.stringify(DEMO_CART))}"`;
const HEART = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS['heart'][1]}</svg>`;

export default {
  id: 'wishlist-page',
  name: 'Wishlist Page',
  version: '1.0.0',
  category: 'checkout',
  tags: ['wishlist', 'saved-items', 'favourites', 'ecommerce', 'shop', 'add-to-cart', 'light'],
  created: '2026-11-14',
  updated: '2026-11-14',
  seoTitle: 'Wishlist Page Template — Free Saved Items Page HTML & JS',
  seoDescription: 'Free wishlist page: saved products as cards with Add to cart and Remove buttons and an Add all to cart action. Works with the product sections. Export HTML.',
  description: 'A wishlist page for the products a shopper saved with the heart button. Each saved product is a card with its photo, name and price, an Add to cart button and a Remove link, with an Add all to cart action at the top. The wishlist is kept in the visitor\'s browser, so no account is needed, and the heart on the Product Detail, Product Grid and mega menu stays in sync with it.',
  bestFor: ['Online stores with a heart button on products', 'Gift lists and "save for later" shopping', 'Shops without customer accounts'],
  behaviors: ['cartcore', 'wishlist'],
  previewMinHeight: 0,

  groups: [
    { id: 'head', label: 'Heading' },
    { id: 'card', label: 'Cards' },
    { id: 'empty', label: 'Empty wishlist' },
  ],
  fields: [
    { key: 'eyebrow', group: 'head', label: 'Eyebrow (optional)', type: 'text', value: 'Saved for later' },
    { key: 'heading', group: 'head', label: 'Heading', type: 'text', value: 'Your wishlist' },
    { key: 'addAllText', group: 'head', label: 'Add all button text (optional)', type: 'text', value: 'Add all to cart' },
    { key: 'addText', group: 'card', label: 'Add to cart text', type: 'text', value: 'Add to cart' },
    { key: 'removeText', group: 'card', label: 'Remove text', type: 'text', value: 'Remove' },
    { key: 'addedText', group: 'card', label: 'Message after adding', type: 'text', value: 'Added to cart' },
    { key: 'cartUrl', group: 'card', label: 'Cart page link (when there is no cart drawer)', type: 'url', value: '/cart/' },
    { key: 'emptyTitle', group: 'empty', label: 'Title', type: 'text', value: 'Your wishlist is empty' },
    { key: 'emptyText', group: 'empty', label: 'Text', type: 'text', value: 'Tap the heart on any product to save it here.' },
    { key: 'shopText', group: 'empty', label: 'Button text', type: 'text', value: 'Browse the shop' },
    { key: 'shopUrl', group: 'empty', label: 'Button link', type: 'url', value: '/shop/' },
  ],
  toggles: [],
  theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f3f6fa', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap wl" data-wl data-set="data-add:addText;data-remove:removeText;data-added:addedText;data-cart-url:cartUrl" ${demoItems()}>
  <div class="wl-top">
    <header class="st-head st-head--left wl-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-edit="heading"></h2>
    </header>
    <button type="button" class="st-btn st-btn--ghost wl-all" data-wl-all data-show-if="addAllText"><span data-edit="addAllText"></span></button>
  </div>
  <ul class="wl-grid" data-wl-list></ul>
  <div class="wc-empty wl-empty" data-wl-empty hidden>
    <span class="wl-heart" aria-hidden="true">${HEART}</span>
    <h3 data-edit="emptyTitle"></h3>
    <p data-edit="emptyText"></p>
    <a class="st-btn" data-href="shopUrl"><span data-edit="shopText"></span></a>
  </div>
</div>`,
  css: `.st-wishlist-page{padding:clamp(40px,5cqi,80px) 0}
${PAGE_CSS}
.wc-empty{display:flex;flex-direction:column;align-items:flex-start;gap:14px;padding:28px 0;color:var(--st-muted)}
.wc-empty[hidden]{display:none}
.wc-empty h3{color:var(--st-text)}
.wl-top{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:clamp(24px,3cqi,40px)}
.wl-head{margin:0}
.wl-grid{list-style:none;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(16px,2cqi,28px)}
.wl-grid[hidden]{display:none}
.wl-card{display:flex;flex-direction:column;overflow:hidden;border-radius:calc(var(--st-radius) * 1.1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 6%,transparent)}
.wl-media{display:block;aspect-ratio:4/5;background:color-mix(in srgb,var(--st-brand) 8%,var(--st-surface))}
.wl-img{width:100%;height:100%;object-fit:cover}
.wl-body{display:flex;flex-direction:column;gap:6px;padding:14px 16px 16px;flex:1}
.wl-name{font:700 16.5px/1.3 var(--st-font-heading);letter-spacing:-.01em}
.wl-name a{color:inherit;text-decoration:none}
.wl-name a:hover{color:var(--st-brand)}
.wl-price{font:800 18px/1 var(--st-font-heading);margin-top:auto;padding-top:6px}
.wl-add{margin-top:8px;min-height:42px;padding:0 16px;font-size:14.5px}
.wl-remove{align-self:flex-start;border:0;background:none;padding:2px 0;color:var(--st-muted);font:600 13.5px/1.2 var(--st-font-body);text-decoration:underline;cursor:pointer}
.wl-remove:hover{color:#dc2626}
.wl-add:focus-visible,.wl-remove:focus-visible,.wl-all:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:2px}
.wl-heart{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:color-mix(in srgb,#e11d48 11%,transparent);color:#e11d48}
.wl-heart svg{width:26px;height:26px}
@container st (max-width:1000px){.wl-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@container st (max-width:720px){.wl-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@container st (max-width:420px){.wl-grid{grid-template-columns:minmax(0,1fr)}}`,
};
