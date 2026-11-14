import { IMG } from './meta.js';
import { ICONS } from './icons.js';

const ico = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name][1]}</svg>`;
const CHEV_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
const CHEV_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';

export default {
  id: 'product-strip',
  name: 'You Might Also Like (Product Strip)',
  version: '1.0.0',
  category: 'listings',
  tags: ['product', 'related-products', 'cross-sell', 'upsell', 'also-bought', 'carousel', 'ecommerce', 'shop', 'recommendations', 'light'],
  created: '2026-11-14',
  updated: '2026-11-14',
  seoTitle: 'Related Products Strip Template — You Might Also Like HTML',
  seoDescription: 'Free "you might also like" strip: a swipeable row of product cards with prices, wishlist hearts and Add to cart, for product pages and the cart. Export HTML.',
  description: 'A swipeable row of recommended products for the bottom of a product page, the cart or an order confirmation. Use it as "You might also like", "Customers also bought" or "Complete the look": just change the heading. Cards show a photo, name, price with a crossed-out old price, rating and an Add to cart button, with an optional wishlist heart, and the row scrolls with arrows, touch swipe or the keyboard. It uses the built-in cart.',
  bestFor: ['Under the product on a product page', 'Cross-sell and upsell on cart and order pages', 'Home pages with "best sellers" or "new arrivals" rows'],
  behaviors: ['cartcore', 'pstrip'],
  previewMinHeight: 0,

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Products' },
    { id: 'labels', label: 'Labels (screen readers)' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Recommended' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'text', value: 'You might also *like*', hint: 'Try "Customers also bought", "Complete the look" or "Recently viewed".' },
    { key: 'allLink', group: 'header', label: 'View-all link text (optional)', type: 'text', value: 'Shop all' },
    { key: 'allUrl', group: 'header', label: 'View-all link', type: 'url', value: '/shop/' },
    { key: 'prevLabel', group: 'labels', label: 'Previous button label', type: 'text', value: 'Previous products' },
    { key: 'nextLabel', group: 'labels', label: 'Next button label', type: 'text', value: 'Next products' },
    { key: 'wishLabel', group: 'labels', label: 'Wishlist heart label', type: 'text', value: 'Save to wishlist' },
    { key: 'regionLabel', group: 'labels', label: 'Row label', type: 'text', value: 'Recommended products' },
  ],
  lists: [{
    key: 'products', group: 'items', label: 'Products', itemLabel: 'Product', titleKey: 'name', min: 2, max: 16,
    fields: [
      { key: 'image', label: 'Product image', type: 'image', value: '', hint: 'A portrait image, about 800×1000 px (4:5).', upload: { name: 'product', maxW: 1000 } },
      { key: 'imageAlt', label: 'Image alt text', type: 'text', value: '' },
      { key: 'badge', label: 'Badge (optional)', type: 'text', value: '' },
      { key: 'name', label: 'Name', type: 'text', value: 'Product name' },
      { key: 'price', label: 'Price', type: 'text', value: '$49' },
      { key: 'oldPrice', label: 'Old price (optional)', type: 'text', value: '' },
      { key: 'rating', label: 'Rating out of 5 (optional)', type: 'text', value: '' },
      { key: 'button', label: 'Button text', type: 'text', value: 'Add to cart' },
      { key: 'url', label: 'Product page link', type: 'url', value: '#' },
    ],
    value: [
      { image: IMG('product-earbuds.png'), imageAlt: 'Sona Buds earbuds in their white charging case', badge: 'New', name: 'Sona Buds earbuds', price: '$89', oldPrice: '', rating: '4.7', button: 'Add to cart', url: '#product' },
      { image: IMG('product-speaker.png'), imageAlt: 'Sona Pocket portable speaker', badge: '', name: 'Sona Pocket speaker', price: '$129', oldPrice: '', rating: '4.6', button: 'Add to cart', url: '#product' },
      { image: IMG('product-stand.png'), imageAlt: 'Sona Neckband earphones', badge: '-20%', name: 'Sona Neckband', price: '$47', oldPrice: '$59', rating: '4.5', button: 'Add to cart', url: '#product' },
      { image: IMG('product-headphones-coral.png'), imageAlt: 'Sona One headphones in sand', badge: '', name: 'Sona One headphones, Sand', price: '$219', oldPrice: '', rating: '4.7', button: 'Add to cart', url: '#product' },
      { image: IMG('product-headphones-forest.png'), imageAlt: 'Sona One headphones in forest green', badge: '', name: 'Sona One headphones, Forest', price: '$219', oldPrice: '', rating: '4.6', button: 'Add to cart', url: '#product' },
      { image: IMG('product-headphones.png'), imageAlt: 'Sona One headphones in midnight blue', badge: '-20%', name: 'Sona One headphones', price: '$199', oldPrice: '$249', rating: '4.8', button: 'Add to cart', url: '#product' },
    ],
  }],
  toggles: [
    { key: 'showWishlist', label: 'Wishlist heart on each card', value: true },
    { key: 'showRating', label: 'Star rating', value: true },
    { key: 'useCart', label: 'Built-in cart (Add to cart fills the cart)', value: true },
  ],
  theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f5f8fb', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap ps" data-ps>
  <div class="ps-top">
    <header class="st-head st-head--left ps-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2 ps-h2" data-anim="item" data-edit="heading"></h2>
    </header>
    <div class="ps-tools">
      <a class="ps-all" data-show-if="allLink" data-href="allUrl"><span data-edit="allLink"></span> <span aria-hidden="true">→</span></a>
      <button type="button" class="ps-nav" data-ps-prev data-set="aria-label:prevLabel">${CHEV_L}</button>
      <button type="button" class="ps-nav" data-ps-next data-set="aria-label:nextLabel">${CHEV_R}</button>
    </div>
  </div>
  <div class="ps-region" role="region" tabindex="0" data-ps-track data-set="aria-label:regionLabel">
    <ul class="ps-track" data-list="products">
      <li class="ps-card" data-cart-card>
        <button type="button" class="ps-heart" data-wish-toggle aria-pressed="false" data-show="showWishlist" data-set="aria-label:wishLabel">${ico('heart')}</button>
        <a class="ps-media" data-href="url" tabindex="-1" aria-hidden="true">
          <img class="ps-img" data-image="image" data-cart-image alt="" width="800" height="1000" loading="lazy" draggable="false">
          <span class="ps-flag" data-show-if="badge" data-edit="badge"></span>
        </a>
        <div class="ps-body">
          <h3 class="ps-name" data-cart-name><a data-href="url"><span data-edit="name"></span></a></h3>
          <p class="ps-rating" data-show="showRating" data-show-if="rating"><span aria-hidden="true">★</span> <span data-edit="rating"></span></p>
          <p class="ps-priceline"><strong class="ps-now" data-cart-price data-edit="price"></strong><s class="ps-old" data-show-if="oldPrice" data-edit="oldPrice"></s></p>
          <a class="st-btn ps-add" data-cart-add data-cart-added="Added to cart" data-href="url" data-show-if="button"><span data-edit="button"></span></a>
        </div>
      </li>
    </ul>
  </div>
  <i hidden data-cart-flag data-show="useCart"></i>
</div>`,
  css: `.st-product-strip{padding:clamp(40px,5cqi,88px) 0}
.ps-top{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:clamp(20px,2.6cqi,32px)}
.ps-head{margin:0}
.ps-h2{font-size:clamp(26px,2cqi + 14px,40px)}
.ps-tools{display:flex;align-items:center;gap:10px}
.ps-all{margin-right:8px;color:var(--st-brand);font-weight:700;text-decoration:none;white-space:nowrap}
.ps-all:hover{text-decoration:underline}
.ps-nav{display:grid;place-items:center;width:44px;height:44px;padding:0;border:1.5px solid color-mix(in srgb,var(--st-text) 20%,transparent);border-radius:50%;background:var(--st-bg);color:var(--st-text);cursor:pointer;transition:background .2s ease,border-color .2s ease,opacity .2s ease}
.ps-nav svg{width:20px;height:20px}
.ps-nav:hover:not(:disabled){border-color:var(--st-text);background:color-mix(in srgb,var(--st-text) 6%,var(--st-bg))}
.ps-nav:disabled{opacity:.35;cursor:default}
.ps-nav:focus-visible,.ps-region:focus-visible,.ps-heart:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:3px}
.ps-region{overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch;margin:0 calc(var(--st-pad) * -1);padding:6px var(--st-pad) 18px;scroll-padding:0 var(--st-pad)}
.ps-region::-webkit-scrollbar{display:none}
.ps-track{list-style:none;display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 3 * 22px) / 4);gap:22px}
.ps-card{position:relative;display:flex;flex-direction:column;overflow:hidden;scroll-snap-align:start;border-radius:calc(var(--st-radius) * 1.1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 6%,transparent);transition:transform .3s ease,box-shadow .3s ease}
.ps-card:hover{transform:translateY(-4px);box-shadow:0 24px 44px -28px color-mix(in srgb,var(--st-text) 55%,transparent)}
.ps-media{position:relative;display:block;aspect-ratio:4/5;overflow:hidden;background:color-mix(in srgb,var(--st-brand) 8%,var(--st-surface))}
.ps-img{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.ps-card:hover .ps-img{transform:scale(1.05)}
.ps-flag{position:absolute;top:12px;left:12px;padding:5px 11px;border-radius:999px;background:var(--st-text);color:var(--st-bg);font:800 12px/1 var(--st-font-body);letter-spacing:.03em}
.ps-heart{position:absolute;top:10px;right:10px;z-index:2;display:grid;place-items:center;width:38px;height:38px;padding:0;border:0;border-radius:50%;background:color-mix(in srgb,var(--st-bg) 92%,transparent);color:var(--st-text);box-shadow:0 4px 14px rgba(15,23,42,.18);cursor:pointer;transition:color .2s ease,transform .15s ease}
.ps-heart svg{width:19px;height:19px}
.ps-heart:hover{transform:scale(1.08)}
.ps-heart[aria-pressed="true"]{color:#e11d48}
.ps-heart[aria-pressed="true"] svg{fill:currentColor}
.ps-body{display:flex;flex-direction:column;gap:5px;padding:14px 16px 16px;flex:1}
.ps-name{font-size:16.5px;line-height:1.3;letter-spacing:-.01em}
.ps-name a{color:inherit;text-decoration:none}
.ps-name a:hover{color:var(--st-brand)}
.ps-rating{display:flex;align-items:center;gap:5px;color:#b45309;font-size:13.5px;font-weight:700}
.ps-priceline{display:flex;align-items:baseline;gap:8px;margin-top:auto;padding-top:6px}
.ps-now{font:800 19px/1 var(--st-font-heading);letter-spacing:-.02em}
.ps-old{color:var(--st-muted);font-size:14px}
.ps-old:empty{display:none}
.ps-add{margin-top:8px;min-height:42px;padding:0 16px;font-size:14.5px}
@media (prefers-reduced-motion:reduce){.ps-card,.ps-img,.ps-nav{transition:none}}
@container st (max-width:1000px){.ps-track{grid-auto-columns:calc((100% - 2 * 18px) / 3);gap:18px}}
@container st (max-width:720px){.ps-track{grid-auto-columns:calc((100% - 14px) / 2.2);gap:14px}.ps-body{padding:12px}}
@container st (max-width:420px){.ps-track{grid-auto-columns:72%}}`,
};
