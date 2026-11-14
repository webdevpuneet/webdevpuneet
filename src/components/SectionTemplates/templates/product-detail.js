import { IMG } from './meta.js';
import { ICONS } from './icons.js';
import { ACC_ITEM_HTML, ACC_CSS, faqFields } from './parts.js';

const plain = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const CURRENCY = { '$': 'USD', '£': 'GBP', '€': 'EUR', '₹': 'INR' };
const parsePrice = v => {
  const m = String(v || '').replace(/\s/g, '').match(/^([$£€₹])?([\d.,]+)$/);
  if (!m) return null;
  const n = parseFloat(m[2].replace(/,/g, ''));
  return Number.isFinite(n) ? { price: n.toFixed(2), currency: CURRENCY[m[1]] || 'USD' } : null;
};
const svg = (name, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${ICONS[name][1]}</svg>`;
const CHEV_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
const CHEV_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';

export default {
  id: 'product-detail',
  name: 'Product Detail Page',
  version: '1.0.0',
  category: 'listings',
  tags: ['product', 'product-page', 'shop', 'store', 'ecommerce', 'gallery', 'zoom', 'variants', 'add-to-cart', 'sticky', 'light'],
  created: '2026-11-14',
  updated: '2026-11-14',
  seoTitle: 'Product Detail Page Template — Free Ecommerce HTML & CSS',
  seoDescription: 'Free product page section: zoomable gallery, colour and size options, quantity, add to cart, trust badges and details, with Product data. Export HTML or React.',
  description: 'A complete product page in one section. On the left a gallery with a thumbnail strip, arrows, swipe on phones and a zoom that follows the mouse. On the right the buy box: name, star rating, price with a crossed-out old price, colour swatches that switch the photo, size buttons with sold-out sizes struck through, a quantity stepper, Add to cart, Buy now and a wishlist heart, then trust badges and details accordions. On phones a sticky Add to cart bar appears when the main button scrolls away.',
  bestFor: ['Online stores and one-product landing pages', 'Shops built on Shopify, Stripe, Gumroad or WooCommerce links', 'Product launches and merchandise pages'],
  behaviors: ['cartcore', 'accordion', 'product'],
  previewMinHeight: 0,
  schema: state => {
    const f = state.fields || {};
    const name = plain(f.name);
    if (!name) return null;
    const pr = parsePrice(f.price);
    const imgs = (state.lists?.images || []).map(i => i.image).filter(u => /^https?:/.test(u || ''));
    const rating = parseFloat(f.rating), count = parseInt(String(f.reviews || '').replace(/[^\d]/g, ''), 10);
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name,
      ...(plain(f.description) && { description: plain(f.description) }),
      ...(imgs.length && { image: imgs }),
      ...(pr && { offers: { '@type': 'Offer', price: pr.price, priceCurrency: pr.currency, availability: 'https://schema.org/InStock', ...(/^https?:/.test(f.addUrl || '') && { url: f.addUrl }) } }),
      ...(rating > 0 && count > 0 && { aggregateRating: { '@type': 'AggregateRating', ratingValue: String(rating), reviewCount: String(count) } }),
    };
  },

  groups: [
    { id: 'main', label: 'Product' },
    { id: 'price', label: 'Price & rating' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'colours', label: 'Colours', toggle: 'showColours' },
    { id: 'sizes', label: 'Sizes', toggle: 'showSizes' },
    { id: 'buy', label: 'Buttons & notes' },
    { id: 'trust', label: 'Trust badges', toggle: 'showTrust' },
    { id: 'details', label: 'Details' },
    { id: 'labels', label: 'Labels (screen readers)' },
  ],
  fields: [
    { key: 'eyebrow', group: 'main', label: 'Category (optional)', type: 'text', value: 'Headphones' },
    { key: 'name', group: 'main', label: 'Product name', type: 'text', value: 'Sona One wireless headphones' },
    { key: 'description', group: 'main', label: 'Short description', type: 'textarea', value: 'Adaptive noise cancelling, a 40-hour battery and a fold-flat design that fits in a coat pocket. Tuned to sound as good on a train as it does at home.' },
    { key: 'price', group: 'price', label: 'Price', type: 'text', value: '$199', hint: 'A symbol and a number, such as $49, £35.50 or €1,200, so search engines can read it.' },
    { key: 'oldPrice', group: 'price', label: 'Old price (optional)', type: 'text', value: '$249' },
    { key: 'saveText', group: 'price', label: 'Savings text (optional)', type: 'text', value: 'Save $50' },
    { key: 'badge', group: 'price', label: 'Badge on the photo (optional)', type: 'text', value: '-20%' },
    { key: 'rating', group: 'price', label: 'Rating out of 5 (optional)', type: 'text', value: '4.8', hint: 'Fills the stars. Shown with the review count; also written as AggregateRating data.' },
    { key: 'reviews', group: 'price', label: 'Review count text (optional)', type: 'text', value: '1,240 reviews' },
    { key: 'reviewsUrl', group: 'price', label: 'Reviews link', type: 'url', value: '#reviews' },
    { key: 'colourLabel', group: 'colours', label: 'Colour label', type: 'text', value: 'Colour' },
    { key: 'sizeLabel', group: 'sizes', label: 'Size label', type: 'text', value: 'Size' },
    { key: 'sizeGuide', group: 'sizes', label: 'Size guide link text (optional)', type: 'text', value: 'Size guide' },
    { key: 'sizeGuideUrl', group: 'sizes', label: 'Size guide link', type: 'url', value: '#size-guide' },
    { key: 'sizeError', group: 'sizes', label: 'Message when no size is chosen', type: 'text', value: 'Please choose a size first.' },
    { key: 'soldOutText', group: 'sizes', label: 'Sold-out text (screen readers)', type: 'text', value: 'sold out' },
    { key: 'addText', group: 'buy', label: 'Add to cart text', type: 'text', value: 'Add to cart' },
    { key: 'cartUrl', group: 'buy', label: 'Cart page link', type: 'url', value: '/cart/', hint: 'Used by the View cart link when the page has no cart drawer.' },
    { key: 'viewCartText', group: 'buy', label: 'View cart link text', type: 'text', value: 'View cart' },
    { key: 'addUrl', group: 'buy', label: 'Add to cart link (when the built-in cart is off)', type: 'url', value: '#', hint: 'Your own checkout or cart link. The chosen colour, size and quantity are added to it as ?colour=…&size=…&qty=…. A "#" link shows a confirmation instead (preview). Ignored while the built-in cart is on.' },
    { key: 'addedText', group: 'buy', label: 'Confirmation text (for a "#" link)', type: 'text', value: 'Added to cart' },
    { key: 'buyText', group: 'buy', label: 'Buy now text (optional)', type: 'text', value: 'Buy now' },
    { key: 'buyUrl', group: 'buy', label: 'Buy now link', type: 'url', value: '/checkout/', hint: 'With the built-in cart on, Buy now adds the product and goes to this page (your checkout page).' },
    { key: 'stock', group: 'buy', label: 'Stock note (optional)', type: 'text', value: 'In stock, ships today', hint: 'Only write what is true, such as "Only 3 left" when it is real.' },
    { key: 'delivery', group: 'buy', label: 'Delivery note (optional)', type: 'text', value: 'Free delivery in 2–4 working days' },
    { key: 'quantityLabel', group: 'labels', label: 'Quantity label', type: 'text', value: 'Quantity' },
    { key: 'minusLabel', group: 'labels', label: 'Minus button label', type: 'text', value: 'Decrease quantity' },
    { key: 'plusLabel', group: 'labels', label: 'Plus button label', type: 'text', value: 'Increase quantity' },
    { key: 'wishlistLabel', group: 'labels', label: 'Wishlist button label', type: 'text', value: 'Add to wishlist' },
    { key: 'galleryLabel', group: 'labels', label: 'Gallery label', type: 'text', value: 'Product photos' },
    { key: 'prevLabel', group: 'labels', label: 'Previous photo label', type: 'text', value: 'Previous photo' },
    { key: 'nextLabel', group: 'labels', label: 'Next photo label', type: 'text', value: 'Next photo' },
  ],
  lists: [
    {
      key: 'images', group: 'gallery', label: 'Gallery photos', itemLabel: 'Photo', titleKey: 'imageAlt', min: 1, max: 8,
      fields: [
        { key: 'image', label: 'Photo', type: 'image', value: '', hint: 'A portrait photo, about 1000×1250 px (4:5).', upload: { name: 'product', maxW: 1400 } },
        { key: 'imageAlt', label: 'Photo description (alt text)', type: 'text', value: 'The product' },
        { key: 'colour', label: 'Colour shown (optional)', type: 'text', value: '', hint: 'The name of a colour below. Choosing that colour shows this photo.' },
      ],
      value: [
        { image: IMG('product-headphones.png'), imageAlt: 'Sona One headphones in midnight blue', colour: 'Midnight' },
        { image: IMG('product-headphones-coral.png'), imageAlt: 'Sona One headphones in sand', colour: 'Sand' },
        { image: IMG('product-headphones-forest.png'), imageAlt: 'Sona One headphones in forest green', colour: 'Forest' },
      ],
    },
    {
      key: 'colours', group: 'colours', label: 'Colours', itemLabel: 'Colour', titleKey: 'name', min: 1, max: 8,
      fields: [
        { key: 'name', label: 'Colour name', type: 'text', value: 'Midnight' },
        { key: 'swatch', label: 'Swatch colour (hex)', type: 'text', value: '#1e293b', hint: 'Such as #1e293b.' },
      ],
      value: [{ name: 'Midnight', swatch: '#1e293b' }, { name: 'Sand', swatch: '#d99a5b' }, { name: 'Forest', swatch: '#3f9d6e' }],
    },
    {
      key: 'sizes', group: 'sizes', label: 'Sizes', itemLabel: 'Size', titleKey: 'label', min: 1, max: 10,
      fields: [
        { key: 'label', label: 'Size', type: 'text', value: 'M' },
        { key: 'status', label: 'Availability', type: 'choice', options: [['', 'In stock'], ['out', 'Sold out']], value: '' },
      ],
      value: [{ label: 'S', status: '' }, { label: 'M', status: '' }, { label: 'L', status: '' }, { label: 'XL', status: 'out' }],
    },
    {
      key: 'trust', group: 'trust', label: 'Trust badges', itemLabel: 'Badge', titleKey: 'text', min: 1, max: 4,
      fields: [
        { key: 'icon', label: 'Icon', type: 'icon', value: 'shield-check' },
        { key: 'text', label: 'Text', type: 'text', value: 'Secure checkout' },
      ],
      value: [{ icon: 'shield-check', text: '2-year warranty' }, { icon: 'refresh-cw', text: '30-day free returns' }, { icon: 'truck', text: 'Free shipping over $50' }],
    },
    {
      key: 'details', group: 'details', label: 'Details (accordion)', itemLabel: 'Section', titleKey: 'q', min: 1, max: 8,
      fields: faqFields().map(fd => fd.key === 'q' ? { ...fd, label: 'Title', value: 'Details' } : { ...fd, label: 'Text', value: 'Write the details here.' }),
      value: [
        { q: 'Description', a: 'Sona One pairs 40 mm drivers with adaptive noise cancelling that listens to your surroundings every second. Soft memory-foam ear cushions and a 250 g frame keep it comfortable through a long flight.' },
        { q: 'What is in the box', a: 'Headphones, a hard travel case, a USB-C charging cable, a 3.5 mm audio cable and a quick-start guide.' },
        { q: 'Shipping and returns', a: 'Orders placed before 3 pm ship the same working day. Not right for you? Send it back within 30 days for a full refund.' },
      ],
    },
  ],
  toggles: [
    { key: 'showColours', label: 'Colours', value: true },
    { key: 'showSizes', label: 'Sizes', value: false },
    { key: 'showWishlist', label: 'Wishlist heart', value: true },
    { key: 'showTrust', label: 'Trust badges', value: true },
    { key: 'showSticky', label: 'Sticky Add to cart bar on phones', value: true },
    { key: 'useCart', label: 'Built-in cart (cart drawer, cart page, checkout)', value: true },
  ],
  theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f3f6fa', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  /* Swatch colours become a CSS variable (only valid hex), and the star fill follows the rating */
  finalize: (html, state) => {
    const rate = Math.max(0, Math.min(5, parseFloat(state.fields?.rating) || 0));
    return html
      .replace(/\sdata-swatch="([^"]*)"/g, (m, v) => (/^#[0-9a-f]{3,8}$/i.test(v) ? ` data-swatch="${v}" style="--pd-sw:${v}"` : ''))
      .replace(/\sdata-pd-stars(="")?/g, ` style="--pd-rate:${(rate / 5 * 100).toFixed(1)}%"`);
  },

  html: `<div class="st-wrap pd" data-pd data-set="data-added:addedText">
  <div class="pd-gallery">
    <ul class="pd-thumbs" data-list="images">
      <li><button type="button" class="pd-thumb" data-set="aria-label:imageAlt"><img class="pd-thumb-img" data-image="image" alt="" width="96" height="120" loading="lazy" aria-hidden="true"></button></li>
    </ul>
    <div class="pd-stage" tabindex="0" role="group" aria-roledescription="carousel" data-set="aria-label:galleryLabel">
      <ul class="pd-slides" data-list="images">
        <li class="pd-slide" data-set="data-colour:colour"><img class="pd-img" data-image="image" alt="" width="1000" height="1250" loading="lazy"></li>
      </ul>
      <span class="pd-badge" data-show-if="badge" data-edit="badge"></span>
      <button type="button" class="pd-nav pd-prev" data-set="aria-label:prevLabel">${CHEV_L}</button>
      <button type="button" class="pd-nav pd-next" data-set="aria-label:nextLabel">${CHEV_R}</button>
      <p class="pd-count" aria-live="polite"></p>
    </div>
  </div>
  <div class="pd-buy">
    <p class="st-eyebrow" data-edit="eyebrow"></p>
    <h2 class="pd-name" data-edit="name"></h2>
    <p class="pd-rating" data-show-if="rating">
      <span class="pd-stars" data-pd-stars role="img" aria-label="Rated out of 5"></span>
      <a class="pd-rating-link" data-href="reviewsUrl"><span data-edit="rating"></span><span class="pd-reviews" data-show-if="reviews"> · <span data-edit="reviews"></span></span></a>
    </p>
    <p class="pd-price"><strong class="pd-now" data-edit="price"></strong><s class="pd-old" data-show-if="oldPrice" data-edit="oldPrice"></s><span class="pd-save" data-show-if="saveText" data-edit="saveText"></span></p>
    <p class="pd-desc" data-show-if="description" data-edit="description"></p>
    <div class="pd-opt" data-show="showColours">
      <p class="pd-opt-label"><span data-edit="colourLabel"></span>: <strong data-pd-colour></strong></p>
      <ul class="pd-colours" role="radiogroup" data-set="aria-label:colourLabel" data-list="colours">
        <li><button type="button" class="pd-colour" role="radio" aria-checked="false" data-set="aria-label:name;data-name:name"><span class="pd-sw" data-set="data-swatch:swatch"></span></button></li>
      </ul>
    </div>
    <div class="pd-opt" data-show="showSizes">
      <p class="pd-opt-label"><span data-edit="sizeLabel"></span>: <strong data-pd-size></strong><a class="pd-guide" data-show-if="sizeGuide" data-href="sizeGuideUrl"><span data-edit="sizeGuide"></span></a></p>
      <ul class="pd-sizes" role="radiogroup" data-set="aria-label:sizeLabel" data-list="sizes">
        <li><button type="button" class="pd-size" role="radio" aria-checked="false" data-set="data-status:status;data-soldout:soldOutText"><span data-edit="label"></span></button></li>
      </ul>
      <p class="pd-error" data-pd-error role="alert" hidden data-edit="sizeError"></p>
    </div>
    <div class="pd-actions">
      <div class="pd-qty" role="group" data-set="aria-label:quantityLabel">
        <button type="button" class="pd-qty-btn" data-pd-minus data-set="aria-label:minusLabel">−</button>
        <input class="pd-qty-input" type="text" inputmode="numeric" value="1" data-pd-qty data-set="aria-label:quantityLabel">
        <button type="button" class="pd-qty-btn" data-pd-plus data-set="aria-label:plusLabel">+</button>
      </div>
      <a class="st-btn pd-add" data-pd-add data-href="addUrl"><span data-edit="addText"></span></a>
      <button type="button" class="pd-wish" aria-pressed="false" data-show="showWishlist" data-set="aria-label:wishlistLabel">${svg('heart')}</button>
    </div>
    <a class="st-btn st-btn--ghost pd-buynow" data-pd-buy data-show-if="buyText" data-href="buyUrl"><span data-edit="buyText"></span></a>
    <p class="pd-status" data-pd-status role="status"></p>
    <a class="pd-viewcart" data-pd-viewcart data-href="cartUrl" data-show-if="viewCartText" hidden><span data-edit="viewCartText"></span> <span aria-hidden="true">→</span></a>
    <ul class="pd-notes">
      <li data-show-if="stock"><span class="pd-note-dot" aria-hidden="true"></span><span data-edit="stock"></span></li>
      <li data-show-if="delivery">${svg('truck')}<span data-edit="delivery"></span></li>
    </ul>
    <ul class="pd-trust" data-show="showTrust" data-list="trust">
      <li><span class="pd-trust-icon" data-icon="icon"></span><span data-edit="text"></span></li>
    </ul>
    <div class="pd-details" data-accordion="single first" data-list="details">
      ${ACC_ITEM_HTML}
    </div>
  </div>
</div>
<i hidden data-cart-flag data-show="useCart"></i>
<div class="pd-sticky" data-show="showSticky" aria-hidden="true">
  <span class="pd-sticky-info"><strong data-edit="name"></strong><span data-edit="price"></span></span>
  <button type="button" class="st-btn pd-sticky-btn" data-pd-sticky-add tabindex="-1"><span data-edit="addText"></span></button>
</div>`,
  css: `.st-product-detail{overflow:visible;padding:clamp(36px,5cqi,80px) 0 0}
.pd{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:clamp(28px,4.5cqi,72px);align-items:start;padding-bottom:clamp(36px,5cqi,80px)}
.pd-gallery{position:sticky;top:24px;display:grid;grid-template-columns:84px minmax(0,1fr);gap:14px;align-items:start}
.pd-thumbs{list-style:none;display:flex;flex-direction:column;gap:10px}
.pd-thumb{display:block;width:100%;aspect-ratio:4/5;padding:0;border:2px solid transparent;border-radius:calc(var(--st-radius) * .7px);overflow:hidden;background:var(--st-surface);cursor:pointer;opacity:.72;transition:opacity .2s ease,border-color .2s ease}
.pd-thumb:hover{opacity:1}
.pd-thumb[aria-current="true"]{border-color:var(--st-brand);opacity:1}
.pd-thumb:focus-visible,.pd-stage:focus-visible,.pd-colour:focus-visible,.pd-size:focus-visible,.pd-qty-btn:focus-visible,.pd-wish:focus-visible,.pd-nav:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:2px}
.pd-thumb-img{width:100%;height:100%;object-fit:cover}
.pd-stage{position:relative;aspect-ratio:4/5;border-radius:calc(var(--st-radius) * 1.3px);overflow:hidden;background:var(--st-surface);touch-action:pan-y;outline:none}
.pd-slides{list-style:none;position:absolute;inset:0}
.pd-slide{position:absolute;inset:0;overflow:hidden;opacity:0;visibility:hidden;transition:opacity .35s ease,visibility 0s linear .35s}
.pd-slide.is-active,.pd:not(.pd-js) .pd-slide:first-child{opacity:1;visibility:visible;transition-delay:0s}
.pd-img{width:100%;height:100%;object-fit:cover;transform-origin:var(--zx,50%) var(--zy,50%);transition:transform .25s ease}
@media (hover:hover) and (pointer:fine){.pd-slide.is-active:hover .pd-img{transform:scale(1.9);cursor:zoom-in}}
.pd-badge{position:absolute;top:14px;left:14px;z-index:2;padding:6px 12px;border-radius:999px;background:var(--st-text);color:var(--st-bg);font:800 13px/1 var(--st-font-body);letter-spacing:.03em}
.pd-nav{position:absolute;top:50%;z-index:2;display:grid;place-items:center;width:42px;height:42px;margin-top:-21px;padding:0;border:0;border-radius:50%;background:color-mix(in srgb,var(--st-bg) 90%,transparent);color:var(--st-text);box-shadow:0 6px 18px rgba(15,23,42,.2);cursor:pointer;opacity:0;transition:opacity .2s ease}
.pd-nav svg{width:20px;height:20px}
.pd-prev{left:12px}.pd-next{right:12px}
.pd-stage:hover .pd-nav,.pd-stage:focus-within .pd-nav{opacity:1}
.pd-count{position:absolute;right:14px;bottom:12px;z-index:2;padding:2px 11px;border-radius:99px;background:rgba(15,23,42,.62);color:#fff;font:600 12.5px/1.7 var(--st-font-body)}
.pd.is-single .pd-nav,.pd.is-single .pd-count,.pd.is-single .pd-thumbs{display:none}
.pd.is-single .pd-gallery{grid-template-columns:minmax(0,1fr)}
.pd-buy{display:flex;flex-direction:column;align-items:flex-start;gap:16px;min-width:0}
.pd-name{font-size:clamp(28px,2cqi + 16px,42px);line-height:1.1}
.pd-rating{display:flex;align-items:center;gap:10px;font-size:14.5px;font-weight:700}
.pd-stars{position:relative;display:inline-block;font-size:17px;line-height:1;letter-spacing:2px;color:color-mix(in srgb,var(--st-text) 18%,transparent)}
.pd-stars::before{content:"★★★★★"}
.pd-stars::after{content:"★★★★★";position:absolute;left:0;top:0;width:var(--pd-rate,100%);overflow:hidden;white-space:nowrap;color:#f59e0b}
.pd-rating-link{color:var(--st-text);text-decoration:none}
.pd-rating-link:hover{text-decoration:underline}
.pd-reviews{color:var(--st-muted);font-weight:500}
.pd-price{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 12px}
.pd-now{font:800 clamp(28px,1.6cqi + 18px,36px)/1 var(--st-font-heading);letter-spacing:-.03em}
.pd-old{color:var(--st-muted);font-size:18px}
.pd-save{padding:3px 10px;border-radius:99px;background:color-mix(in srgb,#16a34a 14%,transparent);color:#15803d;font:700 13.5px/1.5 var(--st-font-body)}
.pd-desc{color:var(--st-muted);font-size:16.5px;line-height:1.7}
.pd-opt{width:100%;display:flex;flex-direction:column;gap:10px}
.pd-opt-label{font-size:14.5px;font-weight:600;color:var(--st-muted)}
.pd-opt-label strong{color:var(--st-text)}
.pd-guide{margin-left:14px;color:var(--st-brand);font-weight:600;text-decoration:none}
.pd-guide:hover{text-decoration:underline}
.pd-colours,.pd-sizes{list-style:none;display:flex;flex-wrap:wrap;gap:10px}
.pd-colour{display:grid;place-items:center;width:42px;height:42px;padding:0;border:2px solid transparent;border-radius:50%;background:none;cursor:pointer;transition:border-color .2s ease,transform .15s ease}
.pd-colour:hover{transform:scale(1.06)}
.pd-colour[aria-checked="true"]{border-color:var(--st-brand)}
.pd-sw{display:block;width:30px;height:30px;border-radius:50%;background:var(--pd-sw,#ccd3dd);box-shadow:inset 0 0 0 1px rgba(15,23,42,.18)}
.pd-size{min-width:52px;min-height:44px;padding:0 14px;border:1.5px solid color-mix(in srgb,var(--st-text) 20%,transparent);border-radius:calc(var(--st-radius) * .7px);background:var(--st-bg);color:var(--st-text);font:700 15px/1 var(--st-font-body);cursor:pointer;transition:border-color .2s ease,background .2s ease,color .2s ease}
.pd-size:hover{border-color:var(--st-text)}
.pd-size[aria-checked="true"]{border-color:var(--st-brand);background:var(--st-brand);color:var(--st-btn-text)}
.pd-size.is-out{color:color-mix(in srgb,var(--st-text) 38%,transparent);text-decoration:line-through;cursor:not-allowed;background:var(--st-surface)}
.pd-size.is-out:hover{border-color:color-mix(in srgb,var(--st-text) 20%,transparent)}
.pd-error{padding:9px 12px;border-radius:calc(var(--st-radius) * .6px);background:#fef2f2;color:#b91c1c;font-size:14.5px;font-weight:600}
.pd-error[hidden]{display:none}
.pd-actions{display:flex;align-items:stretch;gap:10px;width:100%}
.pd-qty{display:inline-flex;align-items:center;flex:none;border:1.5px solid color-mix(in srgb,var(--st-text) 20%,transparent);border-radius:calc(var(--st-radius) * .8px);overflow:hidden}
.pd-qty-btn{width:42px;min-height:50px;border:0;background:none;color:var(--st-text);font:600 20px/1 var(--st-font-body);cursor:pointer}
.pd-qty-btn:hover{background:color-mix(in srgb,var(--st-text) 7%,transparent)}
.pd-qty-input{width:42px;min-height:50px;border:0;background:none;color:var(--st-text);font:700 16px/1 var(--st-font-body);text-align:center;outline:none}
.pd-add{flex:1;min-width:0}
.pd-wish{display:grid;place-items:center;flex:none;width:52px;padding:0;border:1.5px solid color-mix(in srgb,var(--st-text) 20%,transparent);border-radius:calc(var(--st-radius) * .8px);background:none;color:var(--st-text);cursor:pointer;transition:color .2s ease,border-color .2s ease}
.pd-wish svg{width:22px;height:22px}
.pd-wish:hover{border-color:var(--st-text)}
.pd-wish[aria-pressed="true"]{color:#e11d48;border-color:#e11d48}
.pd-wish[aria-pressed="true"] svg{fill:currentColor}
.pd-buynow{width:100%}
.pd-status{width:100%;padding:9px 12px;border-radius:calc(var(--st-radius) * .6px);background:color-mix(in srgb,#16a34a 12%,transparent);color:#15803d;font-size:14.5px;font-weight:600}
.pd-status:empty{display:none}
.pd-viewcart{color:var(--st-brand);font-weight:700;text-decoration:none}
.pd-viewcart:hover{text-decoration:underline}
.pd-viewcart[hidden]{display:none}
.pd-notes{list-style:none;display:flex;flex-direction:column;gap:8px;font-size:14.5px;color:var(--st-muted)}
.pd-notes li{display:flex;align-items:center;gap:10px}
.pd-notes svg{width:19px;height:19px;flex:none;color:var(--st-brand)}
.pd-note-dot{width:9px;height:9px;margin:0 5px;border-radius:50%;background:#16a34a;box-shadow:0 0 0 4px color-mix(in srgb,#16a34a 18%,transparent)}
.pd-trust{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;width:100%;padding:16px 0;border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);border-bottom:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.pd-trust li{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;line-height:1.35}
.pd-trust-icon{display:grid;place-items:center;flex:none;width:36px;height:36px;border-radius:calc(var(--st-radius) * .6px);background:color-mix(in srgb,var(--st-brand) 11%,transparent);color:var(--st-brand)}
.pd-trust-icon svg{width:19px;height:19px}
.pd-details{width:100%}
${ACC_CSS}
.pd-sticky{position:sticky;bottom:0;z-index:30;display:none;align-items:center;justify-content:space-between;gap:12px;padding:10px var(--st-pad);background:color-mix(in srgb,var(--st-bg) 94%,transparent);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-top:1px solid color-mix(in srgb,var(--st-text) 12%,transparent);box-shadow:0 -10px 30px -18px rgba(15,23,42,.35);transform:translateY(110%);transition:transform .3s ease}
.pd-sticky.is-on{transform:none}
.pd-sticky-info{display:flex;flex-direction:column;min-width:0;font-size:14px;line-height:1.3}
.pd-sticky-info strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700}
.pd-sticky-info span{color:var(--st-muted);font-weight:700}
.pd-sticky-btn{flex:none;min-height:46px;padding:0 22px;font-size:15px}
@media (prefers-reduced-motion:reduce){.pd-slide,.pd-img,.pd-sticky,.pd-nav{transition:none}}
@container st (max-width:900px){.pd{grid-template-columns:minmax(0,1fr)}.pd-gallery{position:static}}
@container st (max-width:620px){
.pd-gallery{grid-template-columns:minmax(0,1fr)}
.pd-thumbs{order:2;flex-direction:row;overflow-x:auto;padding-bottom:4px}
.pd-thumbs li{flex:0 0 66px}
.pd-nav{opacity:1}
.pd-actions{flex-wrap:wrap}
.pd-add{flex:1 1 100%;order:3}
.pd-qty{order:1}.pd-wish{order:2;margin-left:auto;min-height:52px}
.pd-sticky{display:flex}
}`,
};
