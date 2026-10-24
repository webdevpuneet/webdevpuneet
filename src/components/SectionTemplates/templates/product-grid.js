import { IMG } from './meta.js';

const plain = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const CURRENCY = { '$': 'USD', '£': 'GBP', '€': 'EUR', '₹': 'INR' };
const parsePrice = v => {
  const m = String(v || '').replace(/\s/g, '').match(/^([$£€₹])?([\d.,]+)$/);
  if (!m) return null;
  const n = parseFloat(m[2].replace(/,/g, ''));
  return Number.isFinite(n) ? { price: n.toFixed(2), currency: CURRENCY[m[1]] || 'USD' } : null;
};

export default {
  id: 'product-grid',
  name: 'Product Grid',
  version: '1.0.0',
  category: 'listings',
  tags: ['product', 'shop', 'store', 'ecommerce', 'catalogue', 'grid', 'price', 'sale', 'light'],
  created: '2026-10-24',
  updated: '2026-10-24',
  seoTitle: 'Product Grid Template — Free E-commerce Catalogue HTML',
  seoDescription: 'Free product grid section: cards with image, badge, price, old price, rating and buy button, plus Product data. Edit online, export HTML, React or Vue.',
  description: 'A shop-window section: a heading with a view-all link, then product cards with a 4:5 image, an optional badge such as New or -20%, the name, a short line, the price with an optional crossed-out old price, a star rating and a buy or view button. Cards lift on hover, the grid goes from four columns to one, and every product is described to search engines with Product structured data.',
  bestFor: ['Online stores and product landing pages', 'Merchandise, prints and book shelves on any website', 'Featured, best-seller and new-arrival rows'],
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
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: plain(p.name),
            ...(plain(p.text) && { description: plain(p.text) }),
            ...(/^https?:/.test(p.image || '') && { image: p.image }),
            ...(pr && { offers: { '@type': 'Offer', price: pr.price, priceCurrency: pr.currency, availability: 'https://schema.org/InStock', ...(/^https?:/.test(p.url || '') && { url: p.url }) } }),
            ...(rating > 0 && count > 0 && { aggregateRating: { '@type': 'AggregateRating', ratingValue: String(rating), reviewCount: String(count) } }),
          },
        };
      }),
    };
  },

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Products' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Shop' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Best sellers *this season*' },
    { key: 'allLink', group: 'header', label: 'View-all link text (optional)', type: 'text', value: 'Shop everything' },
    { key: 'allUrl', group: 'header', label: 'View-all link', type: 'url', value: '/shop/' },
  ],
  lists: [{
    key: 'products', group: 'items', label: 'Products', itemLabel: 'Product', titleKey: 'name', min: 1, max: 12,
    fields: [
      { key: 'image', label: 'Product image', type: 'image', value: '', hint: 'A portrait image, about 800×1000 px (4:5), on a plain background.', upload: { name: 'product', maxW: 1000 } },
      { key: 'imageAlt', label: 'Image alt text', type: 'text', value: '' },
      { key: 'badge', label: 'Badge (optional)', type: 'text', value: '' },
      { key: 'name', label: 'Name', type: 'text', value: 'Product name' },
      { key: 'text', label: 'Short description (optional)', type: 'text', value: '' },
      { key: 'price', label: 'Price', type: 'text', value: '$49', hint: 'A symbol and a number, such as $49, £35.50 or €1,200, so search engines can read it.' },
      { key: 'oldPrice', label: 'Old price (optional)', type: 'text', value: '' },
      { key: 'rating', label: 'Rating out of 5 (optional)', type: 'text', value: '' },
      { key: 'reviews', label: 'Number of reviews (optional)', type: 'text', value: '' },
      { key: 'button', label: 'Button text', type: 'text', value: 'Add to cart' },
      { key: 'url', label: 'Product or checkout link', type: 'url', value: '#' },
    ],
    value: [
      { image: IMG('product-headphones.png'), imageAlt: 'Sona One wireless headphones in black and blue', badge: 'Best seller', name: 'Sona One headphones', text: 'Noise cancelling, 40-hour battery', price: '$199', oldPrice: '$249', rating: '4.8', reviews: '1,204', button: 'Add to cart', url: '#' },
      { image: IMG('product-earbuds.png'), imageAlt: 'Sona Buds earbuds in their white charging case', badge: 'New', name: 'Sona Buds', text: 'Pocket-sized, 28 hours with the case', price: '$89', oldPrice: '', rating: '4.7', reviews: '386', button: 'Add to cart', url: '#' },
      { image: IMG('product-speaker.png'), imageAlt: 'Sona Pocket portable speaker', badge: '', name: 'Sona Pocket speaker', text: 'Waterproof, loud and light', price: '$129', oldPrice: '', rating: '4.6', reviews: '512', button: 'Add to cart', url: '#' },
      { image: IMG('product-stand.png'), imageAlt: 'Sona Neckband earphones', badge: '-20%', name: 'Sona Neckband', text: 'Comfortable all-day earphones', price: '$47', oldPrice: '$59', rating: '4.5', reviews: '178', button: 'Add to cart', url: '#' },
    ],
  }],
  toggles: [],
  theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#ffffff', surface: '#f5f8fb', text: '#0f172a', muted: '#64748b', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <div class="pg-top">
    <header class="st-head st-head--left pg-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    </header>
    <a class="pg-all" data-anim="item" data-href="allUrl" data-show-if="allLink"><span data-edit="allLink"></span> <span aria-hidden="true">→</span></a>
  </div>
  <ul class="pg-grid" data-list="products">
    <li class="pg-card" data-anim="item">
      <a class="pg-media" data-href="url" tabindex="-1" aria-hidden="true">
        <img class="pg-img" data-image="image" alt="" width="800" height="1000" loading="lazy">
        <span class="pg-badge" data-show-if="badge" data-edit="badge"></span>
      </a>
      <div class="pg-body">
        <h3 class="pg-name"><a data-href="url"><span data-edit="name"></span></a></h3>
        <p class="pg-text" data-show-if="text" data-edit="text"></p>
        <p class="pg-rating" data-show-if="rating"><span aria-hidden="true">★</span> <span data-edit="rating"></span><span class="pg-reviews" data-show-if="reviews">(<span data-edit="reviews"></span>)</span></p>
        <p class="pg-price"><strong data-edit="price"></strong><s class="pg-old" data-show-if="oldPrice" data-edit="oldPrice"></s></p>
        <a class="st-btn pg-btn" data-href="url" data-show-if="button"><span data-edit="button"></span></a>
      </div>
    </li>
  </ul>
</div>`,
  css: `.st-product-grid{padding:clamp(56px,7cqi,104px) 0}
.pg-top{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:clamp(24px,3cqi,40px)}
.pg-head{margin:0}
.pg-all{color:var(--st-brand);font-weight:700;text-decoration:none;white-space:nowrap}
.pg-all:hover{text-decoration:underline}
.pg-grid{list-style:none;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(16px,2cqi,28px)}
.pg-card{display:flex;flex-direction:column;overflow:hidden;border-radius:calc(var(--st-radius) * 1.1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 6%,transparent);transition:transform .3s ease,box-shadow .3s ease}
.pg-card:hover{transform:translateY(-4px);box-shadow:0 24px 44px -28px color-mix(in srgb,var(--st-text) 55%,transparent)}
.pg-media{position:relative;display:block;aspect-ratio:4/5;overflow:hidden;background:color-mix(in srgb,var(--st-brand) 8%,var(--st-surface))}
.pg-img{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.pg-card:hover .pg-img{transform:scale(1.05)}
.pg-badge{position:absolute;top:12px;left:12px;padding:5px 11px;border-radius:999px;background:var(--st-text);color:var(--st-bg);font:800 12px/1 var(--st-font-body);letter-spacing:.03em}
.pg-body{display:flex;flex-direction:column;gap:6px;padding:16px 18px 18px;flex:1}
.pg-name{font-size:17px;line-height:1.3;letter-spacing:-.01em}
.pg-name a{color:inherit;text-decoration:none}
.pg-name a:hover{color:var(--st-brand)}
.pg-text{color:var(--st-muted);font-size:14.5px;line-height:1.45}
.pg-rating{display:flex;align-items:center;gap:5px;color:#b45309;font-size:13.5px;font-weight:700}
.pg-reviews{color:var(--st-muted);font-weight:500}
.pg-price{display:flex;align-items:baseline;gap:8px;margin-top:auto;padding-top:6px}
.pg-price strong{font:800 20px/1 var(--st-font-heading);letter-spacing:-.02em}
.pg-old{color:var(--st-muted);font-size:14.5px}
.pg-old:empty{display:none}
.pg-btn{margin-top:8px;min-height:42px;padding:0 16px;font-size:14.5px}
@container st (max-width:1000px){.pg-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@container st (max-width:720px){.pg-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@container st (max-width:420px){.pg-grid{grid-template-columns:1fr}}`,
};
