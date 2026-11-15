/* Shop the Look: one lookbook photo with tappable hotspots. Each hotspot opens a small product card (photo, name, price,
   Add to cart) that fills the same cart as the rest of the shop (cartcore). The hotspots are placed with two numbers (percent
   from the left and from the top) and positioned by the "lookhot" behaviour; on a phone they open on tap, with a mouse on hover. */
import { IMG } from './meta.js';

export default {
  id: 'shop-the-look',
  name: 'Shop the Look',
  version: '1.0.0',
  category: 'listings',
  tags: ['shop the look', 'lookbook', 'hotspots', 'fashion', 'outfit', 'product tags', 'ecommerce', 'interactive', 'light'],
  created: '2026-11-15',
  updated: '2026-11-15',
  seoTitle: 'Shop the Look Section — Free Lookbook With Hotspots HTML',
  seoDescription: 'Free shop-the-look section: a lookbook photo with tappable product hotspots that open a card with price and Add to cart. Works with the built-in cart. Export HTML.',
  description: 'A lookbook photo that sells. Dots sit on the garments in the picture; tap or hover one and a small card opens with the product photo, name, price and an Add to cart button that fills the same cart as the rest of your shop. Place each dot by typing how far it is from the left and the top of the photo, add up to six products, and write the heading and text beside it. Works for fashion, furniture, interiors and any outfit or set that is sold piece by piece.',
  bestFor: ['Fashion and accessories shops', 'Furniture and interior stores showing a styled room', 'Lookbooks and seasonal campaigns'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'media', label: 'Photo' },
    { id: 'items', label: 'Hotspots (products)' },
    { id: 'cta', label: 'Button' },
    { id: 'labels', label: 'Labels (screen readers)' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'The lookbook' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Shop the *weekend look*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'Tap a dot to see the piece, its price and add it to your bag. Everything in the photo is in stock now.' },
    { key: 'image', group: 'media', label: 'Lookbook photo', type: 'image', value: IMG('fashion-look.jpg'), upload: { name: 'look', maxW: 1400 }, hint: 'A portrait photo (4 by 5) works best. The dots are placed on top of it.' },
    { key: 'imageAlt', group: 'media', label: 'Photo description (alt text)', type: 'text', value: 'A man in a denim jacket and white t-shirt standing by a grey hillside' },
    { key: 'ctaLabel', group: 'cta', label: 'Button text (optional)', type: 'text', value: 'Shop the collection' },
    { key: 'ctaUrl', group: 'cta', label: 'Button link', type: 'url', value: '#shop' },
    { key: 'dotLabel', group: 'labels', label: 'Hotspot button label', type: 'text', value: 'Show product details' },
  ],
  lists: [
    {
      key: 'spots', group: 'items', label: 'Hotspots', itemLabel: 'Hotspot', titleKey: 'name', min: 1, max: 6,
      fields: [
        { key: 'x', label: 'From the left (0–100)', type: 'text', value: '50', hint: 'Percent of the photo width, for example 30.' },
        { key: 'y', label: 'From the top (0–100)', type: 'text', value: '50', hint: 'Percent of the photo height, for example 40.' },
        { key: 'image', label: 'Product photo', type: 'image', value: '', upload: { name: 'spot', maxW: 400 } },
        { key: 'imageAlt', label: 'Product photo description', type: 'text', value: '' },
        { key: 'name', label: 'Product name', type: 'text', value: 'Product' },
        { key: 'price', label: 'Price', type: 'text', value: '$49', hint: 'A symbol and a number, such as $49 or £35.50.' },
        { key: 'button', label: 'Button text', type: 'text', value: 'Add to bag' },
        { key: 'url', label: 'Product link', type: 'url', value: '#' },
      ],
      value: [
        { x: '47', y: '34', image: IMG('fashion-trucker.jpg'), imageAlt: 'A washed denim trucker jacket', name: 'Washed trucker jacket', price: '$110', button: 'Add to bag', url: '#' },
        { x: '52', y: '66', image: IMG('fashion-white-tee.jpg'), imageAlt: 'A white cotton t-shirt on a hanger', name: 'Heavy cotton tee', price: '$28', button: 'Add to bag', url: '#' },
      ],
    },
  ],
  toggles: [{ key: 'useCart', label: 'Built-in cart (Add to bag fills the cart)', value: true }],
  theme: { brand: '#1a1a1a', brandText: '#ffffff', bg: '#f7f3ec', surface: '#efe9df', text: '#1a1a1a', muted: '#5f5a52', radius: '12' },
  fonts: { heading: 'playfair', body: 'dmsans' },
  behaviors: ['cartcore', 'lookhot'],

  html: `<div class="st-wrap stl" data-lookhot>
  <div class="stl-media" data-anim="media">
    <img class="stl-img" data-image="image" alt="" width="1000" height="1250">
    <ul class="stl-spots" data-list="spots">
      <li class="stl-spot" data-cart-card data-set="data-x:x;data-y:y">
        <button type="button" class="stl-dot" aria-expanded="false" data-set="aria-label:dotLabel"><span class="stl-plus" aria-hidden="true"></span></button>
        <div class="stl-pop" role="group">
          <img class="stl-thumb" data-image="image" data-cart-image alt="" width="64" height="80" loading="lazy">
          <div class="stl-info">
            <strong class="stl-name" data-cart-name><span data-edit="name"></span></strong>
            <span class="stl-price" data-cart-price data-edit="price"></span>
            <a class="st-btn stl-add" data-cart-add data-cart-added="Added to bag" data-href="url"><span data-edit="button"></span></a>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="stl-copy">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="stl-lead" data-anim="item" data-edit="lead"></p>
    <div class="st-btns" data-anim="item">
      <a class="st-btn" data-show-if="ctaLabel" data-href="ctaUrl"><span data-edit="ctaLabel"></span></a>
    </div>
  </div>
  <i hidden data-cart-flag data-show="useCart"></i>
</div>`,
  css: `.st-shop-the-look{padding:clamp(64px,8cqi,112px) 0}
.stl{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1fr);gap:clamp(28px,5cqi,80px);align-items:center}
.stl-media{position:relative;max-width:520px;width:100%;justify-self:center}
.stl-img{display:block;width:100%;aspect-ratio:4 / 5;object-fit:cover;border-radius:calc(var(--st-radius) * 1.5px);background:var(--st-surface)}
.stl-spots{list-style:none;margin:0;padding:0}
.stl-spot{position:absolute;left:50%;top:50%;width:0;height:0;z-index:2}
.stl-spot.is-open{z-index:5}
.stl-dot{position:absolute;left:-15px;top:-15px;width:30px;height:30px;border-radius:50%;border:0;background:#fff;color:#1a1a1a;cursor:pointer;display:grid;place-items:center;box-shadow:0 4px 14px rgba(0,0,0,.35)}
.stl-dot::after{content:"";position:absolute;inset:-6px;border-radius:50%;border:2px solid #fff;opacity:.7;animation:stl-pulse 2.2s ease-out infinite}
.stl-plus{position:relative;width:12px;height:12px}
.stl-plus::before,.stl-plus::after{content:"";position:absolute;background:currentColor;border-radius:2px;transition:transform .2s}
.stl-plus::before{left:5px;top:0;width:2px;height:12px}
.stl-plus::after{left:0;top:5px;width:12px;height:2px}
.stl-spot.is-open .stl-plus{transform:rotate(45deg)}
.stl-dot:focus-visible{outline:3px solid var(--st-brand);outline-offset:3px}
@keyframes stl-pulse{0%{transform:scale(.85);opacity:.8}100%{transform:scale(1.5);opacity:0}}
.stl-pop{position:absolute;left:22px;top:-28px;width:min(250px,60vw);display:flex;gap:12px;align-items:center;padding:10px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-bg);color:var(--st-text);box-shadow:0 18px 40px -14px rgba(0,0,0,.45);opacity:0;visibility:hidden;transform:translateY(6px);transition:opacity .18s,transform .18s,visibility .18s}
.stl-spot.flip-x .stl-pop{left:auto;right:22px}
.stl-spot.flip-y .stl-pop{top:auto;bottom:-28px}
.stl-spot.is-open .stl-pop{opacity:1;visibility:visible;transform:none}
@media (hover:hover){.stl-spot:hover .stl-pop{opacity:1;visibility:visible;transform:none}.stl-spot:hover{z-index:5}}
.stl-thumb{width:56px;height:70px;object-fit:cover;border-radius:calc(var(--st-radius) * .5px);background:var(--st-surface);flex:none}
.stl-info{display:flex;flex-direction:column;align-items:flex-start;gap:3px;min-width:0}
.stl-name{font:700 14.5px/1.3 var(--st-font-heading)}
.stl-price{color:var(--st-muted);font-size:14px}
.stl-add{margin-top:4px;padding:7px 14px;font-size:13px}
.stl-copy{display:flex;flex-direction:column;align-items:flex-start;gap:clamp(12px,1.6cqi,18px)}
.stl-copy .st-h2{text-align:left}
.stl-lead{color:var(--st-muted);font-size:clamp(16px,1.5cqi,18px);line-height:1.7;max-width:46ch}
@media (prefers-reduced-motion:reduce){.stl-dot::after{animation:none}.stl-pop{transition:none}}
@container st (max-width:820px){.stl{grid-template-columns:1fr}.stl-media{max-width:440px}}`,
};
