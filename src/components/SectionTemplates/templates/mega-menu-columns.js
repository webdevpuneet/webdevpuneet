import { BRAND_HTML, BURGER_HTML, STICKY_FLAGS_HTML, brandFields } from './parts.js';
import { TOPBAR_HTML, SEARCH_HTML, ACTIONS_HTML, CHEVRON, colHtml, PROMO_HTML, storeGroups, storeFields, storeToggles, columnPanelFields, DEMO_COLUMN_ITEMS, megaSchema, MEGA_CSS } from './mega-parts.js';

export default {
  id: 'mega-menu-columns',
  name: 'Ecommerce Mega Menu — Link Columns',
  version: '1.0.0',
  category: 'navbar',
  tags: ['navbar', 'mega-menu', 'ecommerce', 'store', 'shop', 'header', 'search', 'cart', 'dropdown', 'light'],
  created: '2026-11-14',
  updated: '2026-11-14',
  seoTitle: 'Ecommerce Mega Menu Template — Free Store Header HTML & CSS',
  seoDescription: 'Free ecommerce mega menu: a store header with search, account and cart icons, and dropdown panels of link columns plus a featured card. Export HTML or React.',
  description: 'The classic online-store header: a thin top bar, then the logo, a search field and account, wishlist and cart icons, with the shop categories underneath. Hover or click a category and a full-width mega menu drops down with up to three columns of links and a featured card with an image. Plain links such as Sale work too. On phones everything collapses into a burger menu with tap-to-open category accordions.',
  bestFor: ['Online stores with many categories', 'Home, fashion, electronics and gift shops', 'Marketplaces and catalogue sites'],
  behaviors: ['menu', 'mega'],
  previewMinHeight: 600,
  schema: megaSchema('items'),

  groups: [
    ...storeGroups(),
    { id: 'items', label: 'Menu items' },
  ],
  fields: [
    ...brandFields(),
    ...storeFields(),
  ],
  lists: [{
    key: 'items', group: 'items', label: 'Menu items', itemLabel: 'Menu item', titleKey: 'label', min: 1, max: 6,
    fields: columnPanelFields(),
    value: DEMO_COLUMN_ITEMS,
  }],
  toggles: storeToggles(),
  theme: { brand: '#0f766e', brandText: '#ffffff', bg: '#ffffff', surface: '#f1f5f4', text: '#0f172a', muted: '#475569', radius: '12' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `${TOPBAR_HTML}
<header class="st-wrap mm-main">
  ${BRAND_HTML}
  ${SEARCH_HTML}
  ${ACTIONS_HTML}
  ${BURGER_HTML}
</header>
<div class="mm-navbar">
  <div class="st-wrap">
    <nav class="mm-nav" data-menu data-mega data-set="aria-label:navLabel">
      <ul class="mm-items" data-list="items">
        <li class="mm-item" data-menu-item>
          <a class="mm-link" data-hide-if="col1Links" data-href="url"><span data-edit="label"></span></a>
          <button type="button" class="mm-link mm-trigger" data-show-if="col1Links" aria-expanded="false"><span data-edit="label"></span>${CHEVRON}</button>
          <div class="mm-panel" data-show-if="col1Links">
            <div class="st-wrap mm-panel-in">
              <div class="mm-cols">
                ${colHtml(1)}
                ${colHtml(2)}
                ${colHtml(3)}
              </div>
              ${PROMO_HTML}
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</div>
${STICKY_FLAGS_HTML}`,
  css: `.st-mega-menu-columns{overflow:visible;border-bottom:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
${MEGA_CSS}
.mm-navbar{border-top:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
@container st (max-width:860px){.mm-navbar{border-top:0}.mm-navbar .st-wrap{padding:0}}`,
};
