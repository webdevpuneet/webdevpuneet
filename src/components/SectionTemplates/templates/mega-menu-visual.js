import { BRAND_HTML, BURGER_HTML, STICKY_FLAGS_HTML, brandFields } from './parts.js';
import { TOPBAR_HTML, ACTIONS_HTML, CHEVRON, svgIcon, storeGroups, storeFields, storeToggles, tilePanelFields, DEMO_TILE_ITEMS, megaSchema, MEGA_CSS } from './mega-parts.js';

/* The store icons with a search icon in front (this header has no search field, just an icon link) */
const ACTIONS = ACTIONS_HTML.replace('<div class="mm-actions">', `<div class="mm-actions">
      <a class="mm-act" data-href="searchUrl" data-set="aria-label:searchLabel">${svgIcon('search')}</a>`);

const TILE = n => `<a class="mt-tile" data-show-if="tile${n}Label" data-href="tile${n}Url">
            <img class="mt-img" data-image="tile${n}Image" data-optional alt="" loading="lazy">
            <span class="mt-label" data-edit="tile${n}Label"></span>
          </a>`;

export default {
  id: 'mega-menu-visual',
  name: 'Ecommerce Mega Menu — Image Tiles',
  version: '1.0.0',
  category: 'navbar',
  tags: ['navbar', 'mega-menu', 'ecommerce', 'store', 'shop', 'header', 'image-tiles', 'fashion', 'editorial', 'light'],
  created: '2026-11-14',
  updated: '2026-11-14',
  seoTitle: 'Image Mega Menu Template — Free Visual Store Navigation HTML',
  seoDescription: 'Free visual mega menu for online stores: a centred header whose dropdown panels show large category photo tiles with a view-all link. Edit online, export HTML.',
  description: 'An editorial store header for shops that sell with pictures. The logo sits on the left, the categories in the centre and the search, account, wishlist and cart icons on the right. Hover or click a category and a panel of up to four large photo tiles drops down, each with its own label and link, plus a heading and a view-all link. On phones the panels become tap-to-open accordions inside the burger menu.',
  bestFor: ['Fashion, home and lifestyle stores', 'Brands with strong product photography', 'Stores with a small number of big categories'],
  behaviors: ['menu', 'mega'],
  previewMinHeight: 620,
  schema: megaSchema('items'),

  groups: [
    ...storeGroups(),
    { id: 'items', label: 'Menu items' },
  ],
  fields: [
    ...brandFields(),
    ...storeFields().filter(f => f.key !== 'searchPlaceholder'),
  ],
  lists: [{
    key: 'items', group: 'items', label: 'Menu items', itemLabel: 'Menu item', titleKey: 'label', min: 1, max: 6,
    fields: tilePanelFields(),
    value: DEMO_TILE_ITEMS,
  }],
  toggles: storeToggles(),
  theme: { brand: '#b45309', brandText: '#ffffff', bg: '#faf7f2', surface: '#ece5d8', text: '#1c1917', muted: '#57534e', radius: '10' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `${TOPBAR_HTML}
<header class="st-wrap mm-main mt-main">
  ${BRAND_HTML}
  <nav class="mm-nav" data-menu data-mega data-set="aria-label:navLabel">
    <ul class="mm-items" data-list="items">
      <li class="mm-item" data-menu-item>
        <a class="mm-link" data-hide-if="tile1Label" data-href="url"><span data-edit="label"></span></a>
        <button type="button" class="mm-link mm-trigger" data-show-if="tile1Label" aria-expanded="false"><span data-edit="label"></span>${CHEVRON}</button>
        <div class="mm-panel" data-show-if="tile1Label">
          <div class="st-wrap mt-in">
            <div class="mt-head">
              <h3 class="mt-title" data-edit="panelTitle"></h3>
              <a class="mt-all" data-show-if="allLabel" data-href="allUrl"><span data-edit="allLabel"></span> <span aria-hidden="true">→</span></a>
            </div>
            <div class="mt-grid">
          ${TILE(1)}
          ${TILE(2)}
          ${TILE(3)}
          ${TILE(4)}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </nav>
  ${ACTIONS}
  ${BURGER_HTML}
</header>
${STICKY_FLAGS_HTML}`,
  css: `.st-mega-menu-visual{--mm-h:76px;overflow:visible;border-bottom:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
${MEGA_CSS}
.st-wrap.mt-main{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:24px}
.mt-main .mm-actions{justify-self:end}
.mt-main .mm-link{font-size:15px;letter-spacing:.02em;text-transform:uppercase;font-weight:700}
.mt-in{padding-top:30px;padding-bottom:38px}
.mt-head{display:flex;align-items:baseline;justify-content:space-between;gap:16px;margin-bottom:20px}
.mt-title{font:800 clamp(22px,1.4cqi + 14px,30px)/1.15 var(--st-font-heading);letter-spacing:-.025em}
.mt-title:empty{display:none}
.mt-all{margin-left:auto;color:var(--st-text);font-weight:700;font-size:15px;text-decoration:none;border-bottom:2px solid var(--st-brand);padding-bottom:1px}
.mt-all:hover{color:var(--st-brand)}
.mt-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.mt-tile{position:relative;display:block;aspect-ratio:4/5;border-radius:calc(var(--st-radius) * 1.2px);overflow:hidden;isolation:isolate;color:#fff;text-decoration:none;background:var(--st-surface)}
.mt-img{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
.mt-tile::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,transparent 45%,rgba(10,10,12,.72))}
.mt-tile:hover .mt-img{transform:scale(1.06)}
.mt-tile:focus-visible{outline:3px solid var(--st-brand);outline-offset:3px}
.mt-label{position:absolute;left:16px;right:16px;bottom:14px;font:800 18px/1.2 var(--st-font-heading);letter-spacing:-.01em}
@media (prefers-reduced-motion:reduce){.mt-img{transition:none}}
@container st (max-width:860px){
.st-wrap.mt-main{display:flex}
.mt-main .mm-link{font-size:17px}
.mt-in{padding:6px 0 10px}
.mt-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}`,
};
