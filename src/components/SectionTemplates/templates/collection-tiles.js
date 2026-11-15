/* Collection Tiles: shop-by-category picture tiles. Each tile is a tall photo with the collection name, a short line and an
   arrow, linking to a shop view. The photo zooms slowly on hover (not for visitors who prefer reduced motion). */
import { IMG } from './meta.js';

export default {
  id: 'collection-tiles',
  name: 'Collection Tiles',
  version: '1.0.0',
  category: 'listings',
  tags: ['collections', 'categories', 'shop by category', 'tiles', 'fashion', 'ecommerce', 'image cards', 'light'],
  created: '2026-11-15',
  updated: '2026-11-15',
  seoTitle: 'Collection Tiles Section — Free Shop by Category HTML',
  seoDescription: 'Free shop-by-category section: tall photo tiles with a collection name, short text and arrow that zoom on hover. Two to six tiles. Edit online and export HTML.',
  description: 'The tile row that sends shoppers into the right part of your shop. Each tile is a tall photograph with the collection name over a soft gradient, a short line such as “48 pieces” and an arrow, and the whole tile is one link. Choose two to six tiles, change the photos and labels, and the grid adapts from four across on a desktop to two on a phone. The photo zooms gently on hover and stays still for visitors who prefer reduced motion.',
  bestFor: ['Fashion, homeware and gift shops', 'Home pages that lead into collections', 'Category landing pages'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Tiles' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Collections' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Shop by *collection*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: '' },
  ],
  lists: [
    {
      key: 'tiles', group: 'items', label: 'Tiles', itemLabel: 'Tile', titleKey: 'title', min: 2, max: 6,
      fields: [
        { key: 'image', label: 'Photo', type: 'image', value: '', hint: 'A portrait photo, about 800×1000 px (4:5).', upload: { name: 'tile', maxW: 1000 } },
        { key: 'imageAlt', label: 'Photo description (alt text)', type: 'text', value: '' },
        { key: 'title', label: 'Name', type: 'text', value: 'Collection' },
        { key: 'text', label: 'Short line (optional)', type: 'text', value: '' },
        { key: 'url', label: 'Link', type: 'url', value: '#' },
      ],
      value: [
        { image: IMG('fashion-cardigan.jpg'), imageAlt: 'A woman in a cream wrap cardigan', title: 'Women', text: '120 pieces', url: '#' },
        { image: IMG('fashion-hoodie.jpg'), imageAlt: 'A man in a mustard hoodie', title: 'Men', text: '86 pieces', url: '#' },
        { image: IMG('fashion-loafers.jpg'), imageAlt: 'Blue and red leather loafers', title: 'Shoes', text: '44 pairs', url: '#' },
        { image: IMG('fashion-flatlay.jpg'), imageAlt: 'A flat lay of a bag, belt, scarf and sunglasses', title: 'Accessories', text: '58 pieces', url: '#' },
      ],
    },
  ],
  toggles: [],
  theme: { brand: '#1a1a1a', brandText: '#ffffff', bg: '#f7f3ec', surface: '#efe9df', text: '#1a1a1a', muted: '#5f5a52', radius: '12' },
  fonts: { heading: 'playfair', body: 'dmsans' },

  html: `<div class="st-wrap ct">
  <header class="st-head ct-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-show-if="lead" data-edit="lead"></p>
  </header>
  <ul class="ct-grid" data-list="tiles">
    <li class="ct-item" data-anim="item">
      <a class="ct-tile" data-href="url">
        <img class="ct-img" data-image="image" alt="" width="800" height="1000" loading="lazy">
        <span class="ct-label">
          <strong class="ct-title" data-edit="title"></strong>
          <span class="ct-text" data-show-if="text" data-edit="text"></span>
        </span>
        <span class="ct-arrow" aria-hidden="true">&rarr;</span>
      </a>
    </li>
  </ul>
</div>`,
  css: `.st-collection-tiles{padding:clamp(56px,7cqi,104px) 0}
.ct-head{margin-bottom:clamp(24px,3.4cqi,44px)}
.ct-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:clamp(12px,1.6cqi,22px)}
.ct-tile{position:relative;display:block;aspect-ratio:4 / 5;overflow:hidden;border-radius:calc(var(--st-radius) * 1.4px);background:var(--st-surface);color:#fff;text-decoration:none}
.ct-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.ct-tile::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.62),rgba(0,0,0,0) 55%)}
.ct-tile:hover .ct-img,.ct-tile:focus-visible .ct-img{transform:scale(1.07)}
.ct-label{position:absolute;left:clamp(14px,1.8cqi,22px);right:56px;bottom:clamp(14px,1.8cqi,22px);z-index:1;display:flex;flex-direction:column;gap:2px}
.ct-title{font:700 clamp(20px,2.2cqi,26px)/1.15 var(--st-font-heading)}
.ct-text{font-size:14px;opacity:.88}
.ct-arrow{position:absolute;right:clamp(14px,1.8cqi,22px);bottom:clamp(14px,1.8cqi,22px);z-index:1;width:36px;height:36px;border-radius:50%;background:#fff;color:#1a1a1a;display:grid;place-items:center;font-size:17px;transition:transform .25s}
.ct-tile:hover .ct-arrow{transform:translateX(4px)}
.ct-tile:focus-visible{outline:3px solid var(--st-brand);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.ct-img,.ct-arrow{transition:none}.ct-tile:hover .ct-img{transform:none}}
@container st (max-width:560px){.ct-grid{grid-template-columns:repeat(2,1fr)}}`,
};
