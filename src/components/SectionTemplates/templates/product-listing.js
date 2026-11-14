import { IMG } from './meta.js';
import { ICONS } from './icons.js';

const plain = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const CURRENCY = { '$': 'USD', '£': 'GBP', '€': 'EUR', '₹': 'INR' };
const parsePrice = v => {
  const m = String(v || '').replace(/\s/g, '').match(/^([$£€₹])?([\d.,]+)$/);
  if (!m) return null;
  const n = parseFloat(m[2].replace(/,/g, ''));
  return Number.isFinite(n) ? { price: n.toFixed(2), currency: CURRENCY[m[1]] || 'USD' } : null;
};
const ico = (name, size = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${size}>${ICONS[name][1]}</svg>`;

const P = (name, category, price, oldPrice, colours, rating, reviews, date, stock, badge, image, alt) => ({ image, imageAlt: alt, name, category, price, oldPrice, colours, badge, rating, reviews, date, stock, button: 'Add to cart', url: '#product' });

export default {
  id: 'product-listing',
  name: 'Product Listing with Filters',
  version: '1.0.0',
  category: 'listings',
  tags: ['product', 'shop', 'store', 'ecommerce', 'filters', 'search', 'sort', 'catalogue', 'collection', 'listing', 'light'],
  created: '2026-11-14',
  updated: '2026-11-14',
  seoTitle: 'Product Listing Template — Free Shop Page With Filters',
  seoDescription: 'Free shop page: product cards with search, category, price, colour, rating, in-stock and sale filters, sorting and load more. Edit online, export HTML or React.',
  description: 'A complete shop or collection page. A search box, a sort menu and a filter panel (category, price range, colour, rating, in stock only, on sale) narrow a grid of product cards instantly, with a live result count, a friendly no-results state and a Load more button. On phones the filters slide up as a panel. Filters are written to the page address, so a filtered view can be shared or bookmarked. Each card has a wishlist heart and an Add to cart button that fills the built-in cart.',
  bestFor: ['Online store catalogue and collection pages', 'Shops with a few dozen products', 'Marketplaces and merchandise stores'],
  behaviors: ['cartcore', 'plist'],
  previewMinHeight: 0,
  schema: state => {
    const items = (state.lists?.products || []).filter(p => plain(p.name));
    if (!items.length) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: items.map((p, i) => {
        const pr = parsePrice(p.price);
        const rating = parseFloat(p.rating), count = parseInt(String(p.reviews || '').replace(/[^\d]/g, ''), 10);
        return {
          '@type': 'ListItem', position: i + 1,
          item: {
            '@type': 'Product', name: plain(p.name),
            ...(plain(p.category) && { category: plain(p.category) }),
            ...(/^https?:/.test(p.image || '') && { image: p.image }),
            ...(pr && { offers: { '@type': 'Offer', price: pr.price, priceCurrency: pr.currency, availability: p.stock === 'out' ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock', ...(/^https?:/.test(p.url || '') && { url: p.url }) } }),
            ...(rating > 0 && count > 0 && { aggregateRating: { '@type': 'AggregateRating', ratingValue: String(rating), reviewCount: String(count) } }),
          },
        };
      }),
    };
  },

  groups: [
    { id: 'head', label: 'Heading' },
    { id: 'items', label: 'Products' },
    { id: 'page', label: 'Page size & counts' },
    { id: 'filters', label: 'Filter labels' },
    { id: 'sort', label: 'Sort labels' },
    { id: 'empty', label: 'No results' },
    { id: 'labels', label: 'Labels (screen readers)' },
  ],
  fields: [
    { key: 'eyebrow', group: 'head', label: 'Eyebrow (optional)', type: 'text', value: 'Shop' },
    { key: 'heading', group: 'head', label: 'Heading', type: 'text', value: 'All *products*' },
    { key: 'lead', group: 'head', label: 'Intro (optional)', type: 'text', value: 'Headphones, speakers and home pieces, designed to last.' },
    { key: 'pageSize', group: 'page', label: 'Products shown at first (number)', type: 'text', value: '8', hint: 'Load more shows this many more each time.' },
    { key: 'countText', group: 'page', label: 'Result count text', type: 'text', value: 'Showing {shown} of {total} products', hint: '{shown} and {total} are filled in.' },
    { key: 'moreText', group: 'page', label: 'Load more button text', type: 'text', value: 'Load more' },
    { key: 'searchPlaceholder', group: 'filters', label: 'Search placeholder', type: 'text', value: 'Search products' },
    { key: 'filtersLabel', group: 'filters', label: 'Filters button text', type: 'text', value: 'Filters' },
    { key: 'categoryLabel', group: 'filters', label: 'Category title', type: 'text', value: 'Category' },
    { key: 'allText', group: 'filters', label: '"All" text', type: 'text', value: 'All products' },
    { key: 'priceLabel', group: 'filters', label: 'Price title', type: 'text', value: 'Price' },
    { key: 'minLabel', group: 'filters', label: 'Minimum price label', type: 'text', value: 'Min' },
    { key: 'maxLabel', group: 'filters', label: 'Maximum price label', type: 'text', value: 'Max' },
    { key: 'colourLabel', group: 'filters', label: 'Colour title', type: 'text', value: 'Colour' },
    { key: 'ratingLabel', group: 'filters', label: 'Rating title', type: 'text', value: 'Rating' },
    { key: 'ratingAny', group: 'filters', label: 'Any rating text', type: 'text', value: 'Any rating' },
    { key: 'ratingOver', group: 'filters', label: 'Rating and up text', type: 'text', value: '{n} stars and up' },
    { key: 'inStockLabel', group: 'filters', label: 'In stock label', type: 'text', value: 'In stock only' },
    { key: 'onSaleLabel', group: 'filters', label: 'On sale label', type: 'text', value: 'On sale' },
    { key: 'clearText', group: 'filters', label: 'Clear filters text', type: 'text', value: 'Clear all filters' },
    { key: 'sortLabel', group: 'sort', label: 'Sort title', type: 'text', value: 'Sort by' },
    { key: 'sortFeatured', group: 'sort', label: 'Featured', type: 'text', value: 'Featured' },
    { key: 'sortPriceAsc', group: 'sort', label: 'Price, low to high', type: 'text', value: 'Price: low to high' },
    { key: 'sortPriceDesc', group: 'sort', label: 'Price, high to low', type: 'text', value: 'Price: high to low' },
    { key: 'sortNewest', group: 'sort', label: 'Newest', type: 'text', value: 'Newest' },
    { key: 'sortRated', group: 'sort', label: 'Best rated', type: 'text', value: 'Best rated' },
    { key: 'emptyTitle', group: 'empty', label: 'Title', type: 'text', value: 'No products match' },
    { key: 'emptyText', group: 'empty', label: 'Text', type: 'text', value: 'Try removing a filter or searching for something else.' },
    { key: 'outText', group: 'empty', label: 'Out-of-stock badge text', type: 'text', value: 'Sold out' },
    { key: 'wishLabel', group: 'labels', label: 'Wishlist heart label', type: 'text', value: 'Save to wishlist' },
    { key: 'closeLabel', group: 'labels', label: 'Close filters label', type: 'text', value: 'Close filters' },
  ],
  lists: [{
    key: 'products', group: 'items', label: 'Products', itemLabel: 'Product', titleKey: 'name', min: 1, max: 48,
    fields: [
      { key: 'image', label: 'Product image', type: 'image', value: '', hint: 'A portrait image, about 800×1000 px (4:5).', upload: { name: 'product', maxW: 1000 } },
      { key: 'imageAlt', label: 'Image alt text', type: 'text', value: '' },
      { key: 'name', label: 'Name', type: 'text', value: 'Product name' },
      { key: 'category', label: 'Category', type: 'text', value: 'Category', hint: 'Products with the same category are grouped in the Category filter.' },
      { key: 'price', label: 'Price', type: 'text', value: '$49', hint: 'A symbol and a number, such as $49 or £35.50.' },
      { key: 'oldPrice', label: 'Old price (optional)', type: 'text', value: '', hint: 'A product with an old price counts as "on sale".' },
      { key: 'colours', label: 'Colours (comma separated, optional)', type: 'text', value: '' },
      { key: 'badge', label: 'Badge (optional)', type: 'text', value: '' },
      { key: 'rating', label: 'Rating out of 5 (optional)', type: 'text', value: '' },
      { key: 'reviews', label: 'Number of reviews (optional)', type: 'text', value: '' },
      { key: 'date', label: 'Date added (YYYY-MM-DD, for "Newest")', type: 'text', value: '2026-11-01' },
      { key: 'stock', label: 'Availability', type: 'choice', options: [['in', 'In stock'], ['out', 'Sold out']], value: 'in' },
      { key: 'button', label: 'Button text', type: 'text', value: 'Add to cart' },
      { key: 'url', label: 'Product page link', type: 'url', value: '#' },
    ],
    value: [
      P('Sona One headphones', 'Audio', '$199', '$249', 'Midnight, Sand, Forest', '4.8', '1,240', '2026-10-20', 'in', '-20%', IMG('product-headphones.png'), 'Sona One headphones in midnight blue'),
      P('Sona One headphones, Sand', 'Audio', '$219', '', 'Sand', '4.7', '312', '2026-11-08', 'in', 'New', IMG('product-headphones-coral.png'), 'Sona One headphones in sand'),
      P('Sona One headphones, Forest', 'Audio', '$219', '', 'Forest', '4.6', '198', '2026-09-15', 'out', '', IMG('product-headphones-forest.png'), 'Sona One headphones in forest green'),
      P('Sona Buds earbuds', 'Audio', '$89', '', 'White, Black', '4.7', '386', '2026-11-02', 'in', 'New', IMG('product-earbuds.png'), 'Sona Buds earbuds in their white charging case'),
      P('Sona Pocket speaker', 'Audio', '$129', '', 'Black', '4.6', '512', '2026-08-30', 'in', '', IMG('product-speaker.png'), 'Sona Pocket portable speaker'),
      P('Sona Neckband', 'Audio', '$47', '$59', 'Black, Grey', '4.5', '178', '2026-07-12', 'in', '-20%', IMG('product-stand.png'), 'Sona Neckband earphones'),
      P('Linen sofa', 'Living', '$1,290', '', 'Oat, Charcoal', '4.9', '84', '2026-10-05', 'in', '', IMG('room-1.jpg'), 'A linen sofa in a bright living room'),
      P('Arc floor lamp', 'Lighting', '$149', '', 'Brass, Black', '4.4', '65', '2026-09-28', 'in', '', IMG('room-2.jpg'), 'An arc floor lamp beside a sofa'),
      P('Wool rug', 'Living', '$320', '$399', 'Sand, Grey', '4.6', '47', '2026-06-18', 'in', 'Sale', IMG('room-3.jpg'), 'A wool rug in a calm bedroom'),
      P('Oak shelf', 'Storage', '$210', '', 'Oak', '4.5', '39', '2026-05-22', 'out', '', IMG('room-4.jpg'), 'An oak shelf with books and plants'),
      P('Ceramic table lamp', 'Lighting', '$79', '', 'Sand, White', '4.3', '28', '2026-10-30', 'in', 'New', IMG('room-2.jpg'), 'A ceramic table lamp'),
      P('Cotton throw', 'Living', '$59', '$75', 'Oat, Grey', '3.8', '91', '2026-04-10', 'in', 'Sale', IMG('room-3.jpg'), 'A cotton throw on a bed'),
    ],
  }],
  toggles: [
    { key: 'showSearch', label: 'Search box', value: true },
    { key: 'showSort', label: 'Sort menu', value: true },
    { key: 'showFilters', label: 'Filter panel', value: true },
    { key: 'showWishlist', label: 'Wishlist heart on each card', value: true },
    { key: 'useCart', label: 'Built-in cart (Add to cart fills the cart)', value: true },
  ],
  theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f5f8fb', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap pl" data-pl data-set="data-per:pageSize;data-count:countText;data-all:allText;data-rating-any:ratingAny;data-rating-over:ratingOver;data-out:outText;data-clear:clearText">
  <header class="st-head st-head--left pl-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-show-if="lead" data-edit="lead"></p>
  </header>
  <div class="pl-bar">
    <label class="pl-search" data-show="showSearch">${ico('search')}<input type="search" data-pl-search autocomplete="off" data-set="placeholder:searchPlaceholder;aria-label:searchPlaceholder"></label>
    <button type="button" class="pl-filter-btn" data-pl-open data-show="showFilters">${ico('settings')}<span data-edit="filtersLabel"></span><span class="pl-badge-n" data-pl-active></span></button>
    <p class="pl-count" data-pl-count role="status" aria-live="polite"></p>
    <label class="pl-sort" data-show="showSort"><span data-edit="sortLabel"></span>
      <select data-pl-sort>
        <option value="featured" data-edit="sortFeatured"></option>
        <option value="price-asc" data-edit="sortPriceAsc"></option>
        <option value="price-desc" data-edit="sortPriceDesc"></option>
        <option value="newest" data-edit="sortNewest"></option>
        <option value="rating" data-edit="sortRated"></option>
      </select>
    </label>
  </div>
  <div class="pl-layout">
    <aside class="pl-filters" data-pl-filters data-show="showFilters" data-set="aria-label:filtersLabel">
      <div class="pl-fhead"><strong data-edit="filtersLabel"></strong><button type="button" class="pl-close" data-pl-close data-set="aria-label:closeLabel">&times;</button></div>
      <fieldset class="pl-fgroup"><legend data-edit="categoryLabel"></legend><div class="pl-cats" data-pl-cats></div></fieldset>
      <fieldset class="pl-fgroup"><legend data-edit="priceLabel"></legend>
        <div class="pl-price"><label><span data-edit="minLabel"></span><input type="number" min="0" inputmode="numeric" data-pl-min></label><label><span data-edit="maxLabel"></span><input type="number" min="0" inputmode="numeric" data-pl-max></label></div>
      </fieldset>
      <fieldset class="pl-fgroup" data-pl-colour-group><legend data-edit="colourLabel"></legend><div class="pl-colours" data-pl-colours></div></fieldset>
      <fieldset class="pl-fgroup"><legend data-edit="ratingLabel"></legend><select class="pl-select" data-pl-rating></select></fieldset>
      <label class="pl-check"><input type="checkbox" data-pl-instock><span data-edit="inStockLabel"></span></label>
      <label class="pl-check"><input type="checkbox" data-pl-sale><span data-edit="onSaleLabel"></span></label>
      <button type="button" class="pl-clear" data-pl-clear data-edit="clearText"></button>
    </aside>
    <div class="pl-results">
      <ul class="pl-grid" data-list="products">
        <li class="pl-card" data-anim="item" data-cart-card data-set="data-cat:category;data-colours:colours;data-rating:rating;data-date:date;data-stock:stock">
          <button type="button" class="pl-heart" data-wish-toggle aria-pressed="false" data-show="showWishlist" data-set="aria-label:wishLabel">${ico('heart')}</button>
          <a class="pl-media" data-href="url" tabindex="-1" aria-hidden="true">
            <img class="pl-img" data-image="image" data-cart-image alt="" width="800" height="1000" loading="lazy">
            <span class="pl-flag" data-show-if="badge" data-edit="badge"></span>
            <span class="pl-out" data-pl-out></span>
          </a>
          <div class="pl-body">
            <p class="pl-cat" data-edit="category"></p>
            <h3 class="pl-name" data-cart-name><a data-href="url"><span data-edit="name"></span></a></h3>
            <p class="pl-rating" data-show-if="rating"><span aria-hidden="true">★</span> <span data-edit="rating"></span><span class="pl-reviews" data-show-if="reviews">(<span data-edit="reviews"></span>)</span></p>
            <p class="pl-priceline"><strong class="pl-now" data-cart-price data-edit="price"></strong><s class="pl-old" data-show-if="oldPrice" data-edit="oldPrice"></s></p>
            <a class="st-btn pl-add" data-cart-add data-cart-added="Added to cart" data-href="url" data-show-if="button"><span data-edit="button"></span></a>
          </div>
        </li>
      </ul>
      <div class="pl-empty" data-pl-empty hidden>
        <h3 data-edit="emptyTitle"></h3>
        <p data-edit="emptyText"></p>
        <button type="button" class="st-btn st-btn--ghost" data-pl-clear2><span data-edit="clearText"></span></button>
      </div>
      <div class="pl-morewrap"><button type="button" class="st-btn st-btn--ghost pl-more" data-pl-more><span data-edit="moreText"></span></button></div>
    </div>
  </div>
  <div class="pl-backdrop" data-pl-backdrop hidden></div>
  <i hidden data-cart-flag data-show="useCart"></i>
</div>`,
  css: `.st-product-listing{padding:clamp(40px,5cqi,80px) 0}
.pl-head{margin-bottom:clamp(20px,3cqi,36px)}
.pl-bar{display:flex;align-items:center;flex-wrap:wrap;gap:12px 16px;margin-bottom:22px;padding-bottom:18px;border-bottom:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.pl-search{position:relative;display:flex;align-items:center;flex:1 1 240px;max-width:420px}
.pl-search svg{position:absolute;left:14px;width:19px;height:19px;color:var(--st-muted);pointer-events:none}
.pl-search input{width:100%;height:46px;padding:0 16px 0 42px;border:1px solid color-mix(in srgb,var(--st-text) 16%,transparent);border-radius:999px;background:var(--st-surface);color:var(--st-text);font:400 15.5px/1 var(--st-font-body);outline:none;transition:border-color .2s ease,box-shadow .2s ease}
.pl-search input:focus,.pl-select:focus,.pl-sort select:focus,.pl-price input:focus{border-color:var(--st-brand);box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 16%,transparent);outline:none}
.pl-filter-btn{display:none;align-items:center;gap:8px;min-height:46px;padding:0 18px;border:1.5px solid color-mix(in srgb,var(--st-text) 20%,transparent);border-radius:999px;background:none;color:var(--st-text);font:700 15px/1 var(--st-font-body);cursor:pointer}
.pl-filter-btn svg{width:18px;height:18px}
.pl-badge-n{min-width:20px;height:20px;padding:0 6px;border-radius:99px;background:var(--st-brand);color:var(--st-btn-text);font:700 12px/20px var(--st-font-body);text-align:center}
.pl-badge-n:empty{display:none}
.pl-count{margin-left:auto;color:var(--st-muted);font-size:14.5px}
.pl-sort{display:flex;align-items:center;gap:10px;font-size:14.5px;font-weight:600;color:var(--st-muted)}
.pl-sort select,.pl-select{height:44px;padding:0 34px 0 14px;border:1px solid color-mix(in srgb,var(--st-text) 16%,transparent);border-radius:calc(var(--st-radius) * .7px);background:var(--st-bg);color:var(--st-text);font:600 15px/1 var(--st-font-body);cursor:pointer}
.pl-layout{display:grid;grid-template-columns:250px minmax(0,1fr);gap:clamp(24px,3.5cqi,48px);align-items:start}
.pl-layout:not(:has(.pl-filters)){grid-template-columns:minmax(0,1fr)}
.pl-filters{position:sticky;top:20px;display:flex;flex-direction:column;gap:22px}
.pl-fhead{display:none;align-items:center;justify-content:space-between;font-size:18px}
.pl-close{width:40px;height:40px;border:0;border-radius:50%;background:color-mix(in srgb,var(--st-text) 8%,transparent);color:var(--st-text);font-size:24px;line-height:1;cursor:pointer}
.pl-fgroup{border:0;display:flex;flex-direction:column;gap:10px;min-width:0}
.pl-fgroup legend{padding:0;margin-bottom:10px;font:800 13px/1.2 var(--st-font-body);letter-spacing:.09em;text-transform:uppercase;color:var(--st-muted)}
.pl-cats{display:flex;flex-direction:column;gap:2px}
.pl-cat-opt{display:flex;align-items:center;gap:10px;padding:7px 8px;margin:0 -8px;border-radius:calc(var(--st-radius) * .5px);cursor:pointer;font-size:15.5px}
.pl-cat-opt:hover{background:color-mix(in srgb,var(--st-text) 6%,transparent)}
.pl-cat-opt input,.pl-check input{width:17px;height:17px;accent-color:var(--st-brand)}
.pl-cat-opt span:last-child{margin-left:auto;color:var(--st-muted);font-size:13.5px}
.pl-price{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pl-price label{display:flex;flex-direction:column;gap:4px;font-size:13px;font-weight:600;color:var(--st-muted)}
.pl-price input{width:100%;height:42px;padding:0 10px;border:1px solid color-mix(in srgb,var(--st-text) 16%,transparent);border-radius:calc(var(--st-radius) * .6px);background:var(--st-bg);color:var(--st-text);font:600 15px/1 var(--st-font-body)}
.pl-colours{display:flex;flex-wrap:wrap;gap:8px}
.pl-chip{display:inline-flex;align-items:center;gap:7px;min-height:36px;padding:0 12px 0 8px;border:1.5px solid color-mix(in srgb,var(--st-text) 16%,transparent);border-radius:999px;background:var(--st-bg);color:var(--st-text);font:600 13.5px/1 var(--st-font-body);cursor:pointer;transition:border-color .2s ease,background .2s ease}
.pl-chip[aria-pressed="true"]{border-color:var(--st-brand);background:color-mix(in srgb,var(--st-brand) 10%,var(--st-bg))}
.pl-chip i{width:16px;height:16px;border-radius:50%;background:var(--c,#cbd5e1);box-shadow:inset 0 0 0 1px rgba(15,23,42,.2)}
.pl-check{display:flex;align-items:center;gap:10px;font-size:15.5px;cursor:pointer}
.pl-clear{align-self:flex-start;border:0;background:none;padding:0;color:var(--st-brand);font:700 14.5px/1.2 var(--st-font-body);text-decoration:underline;cursor:pointer}
.pl-chip:focus-visible,.pl-clear:focus-visible,.pl-filter-btn:focus-visible,.pl-heart:focus-visible,.pl-cat-opt:has(input:focus-visible){outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:2px}
.pl-grid{list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(14px,1.8cqi,24px)}
.pl-card{position:relative;display:flex;flex-direction:column;overflow:hidden;border-radius:calc(var(--st-radius) * 1.1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 6%,transparent);transition:transform .3s ease,box-shadow .3s ease}
.pl-card[hidden]{display:none}
.pl-card:hover{transform:translateY(-4px);box-shadow:0 24px 44px -28px color-mix(in srgb,var(--st-text) 55%,transparent)}
.pl-media{position:relative;display:block;aspect-ratio:4/5;overflow:hidden;background:color-mix(in srgb,var(--st-brand) 8%,var(--st-surface))}
.pl-img{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.pl-card:hover .pl-img{transform:scale(1.05)}
.pl-flag{position:absolute;top:12px;left:12px;padding:5px 11px;border-radius:999px;background:var(--st-text);color:var(--st-bg);font:800 12px/1 var(--st-font-body);letter-spacing:.03em}
.pl-out{position:absolute;left:0;right:0;bottom:0;display:none;padding:8px;background:rgba(15,23,42,.78);color:#fff;font:700 13px/1.3 var(--st-font-body);text-align:center}
.pl-card[data-stock="out"] .pl-out{display:block}
.pl-card[data-stock="out"] .pl-img{filter:grayscale(.7);opacity:.75}
.pl-card[data-stock="out"] .pl-add{opacity:.45;pointer-events:none}
.pl-heart{position:absolute;top:10px;right:10px;z-index:2;display:grid;place-items:center;width:38px;height:38px;padding:0;border:0;border-radius:50%;background:color-mix(in srgb,var(--st-bg) 92%,transparent);color:var(--st-text);box-shadow:0 4px 14px rgba(15,23,42,.18);cursor:pointer;transition:color .2s ease,transform .15s ease}
.pl-heart svg{width:19px;height:19px}
.pl-heart:hover{transform:scale(1.08)}
.pl-heart[aria-pressed="true"]{color:#e11d48}
.pl-heart[aria-pressed="true"] svg{fill:currentColor}
.pl-body{display:flex;flex-direction:column;gap:5px;padding:14px 16px 16px;flex:1}
.pl-cat{color:var(--st-muted);font-size:12.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase}
.pl-name{font-size:16.5px;line-height:1.3;letter-spacing:-.01em}
.pl-name a{color:inherit;text-decoration:none}
.pl-name a:hover{color:var(--st-brand)}
.pl-rating{display:flex;align-items:center;gap:5px;color:#b45309;font-size:13.5px;font-weight:700}
.pl-reviews{color:var(--st-muted);font-weight:500}
.pl-priceline{display:flex;align-items:baseline;gap:8px;margin-top:auto;padding-top:6px}
.pl-now{font:800 19px/1 var(--st-font-heading);letter-spacing:-.02em}
.pl-old{color:var(--st-muted);font-size:14px}
.pl-old:empty{display:none}
.pl-add{margin-top:8px;min-height:42px;padding:0 16px;font-size:14.5px}
.pl-empty{display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:40px 0;color:var(--st-muted)}
.pl-empty[hidden]{display:none}
.pl-empty h3{color:var(--st-text)}
.pl-morewrap{display:flex;justify-content:center;margin-top:28px}
.pl-more[hidden],.pl-morewrap[hidden]{display:none}
.pl-backdrop{position:fixed;inset:0;z-index:2147482100;background:rgba(15,23,42,.5)}
.pl-backdrop[hidden]{display:none}
@media (prefers-reduced-motion:reduce){.pl-card,.pl-img{transition:none}}
@container st (max-width:1000px){.pl-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@container st (max-width:860px){
.pl-layout{grid-template-columns:minmax(0,1fr)}
.pl-filter-btn{display:inline-flex}
.pl-count{order:5;flex-basis:100%;margin-left:0}
.pl-filters{position:fixed;left:0;right:0;bottom:0;z-index:2147482101;max-height:86vh;overflow:auto;padding:20px 22px 28px;border-radius:calc(var(--st-radius) * 1.4px) calc(var(--st-radius) * 1.4px) 0 0;background:var(--st-bg);box-shadow:0 -24px 60px -24px rgba(15,23,42,.5);transform:translateY(105%);visibility:hidden;transition:transform .3s ease,visibility 0s linear .3s}
.pl-filters.is-open{transform:none;visibility:visible;transition-delay:0s}
.pl-fhead{display:flex}
}
@container st (max-width:520px){.pl-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.pl-body{padding:12px}.pl-sort span{display:none}}`,
};
