/* Markup, fields and CSS shared by the ecommerce mega menu sections (mega-menu-columns,
   mega-menu-visual, mega-menu-departments). The interaction (hover / click / keyboard open,
   one panel at a time, Esc, tabs) is BEHAVIORS.mega in behaviors.js; the burger and the
   sticky header come from BEHAVIORS.menu. */
import { ICONS } from './icons.js';
import { IMG } from './meta.js';
import { BRAND_CSS, NAV_CSS } from './parts.js';

const svg = (name, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${ICONS[name][1]}</svg>`;
export const svgIcon = svg;
export const CHEVRON =`<svg class="mm-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;

/* Thin bar above the header: a message on the left, small links on the right */
export const TOPBAR_HTML = `<div class="mm-top" data-show="showTopBar">
  <div class="st-wrap mm-top-in">
    <p data-edit="topText"></p>
    <ul class="mm-top-links" data-show-if="topLinks" data-links="topLinks"></ul>
  </div>
</div>`;

/* Search form (GET, field name q) */
export const SEARCH_HTML = `<form class="mm-search" role="search" method="get" data-set="action:searchUrl">
      <input type="search" name="q" autocomplete="off" data-set="placeholder:searchPlaceholder;aria-label:searchPlaceholder">
      <button type="submit" data-set="aria-label:searchLabel">${svg('search')}</button>
    </form>`;

/* Account, wishlist and cart icon links (cart count badge) */
export const ACTIONS_HTML = `<div class="mm-actions">
      <a class="mm-act" data-href="accountUrl" data-set="aria-label:accountLabel">${svg('user-round')}</a>
      <a class="mm-act" data-show="showWishlist" data-href="wishlistUrl" data-set="aria-label:wishlistLabel">${svg('heart')}<span class="mm-badge" data-wish-count hidden></span></a>
      <a class="mm-act" data-cart-open data-href="cartUrl" data-set="aria-label:cartLabel">${svg('shopping-cart')}<span class="mm-badge" data-cart-count data-show-if="cartCount" data-edit="cartCount"></span></a>
    </div>`;

/* One link column of a panel (title + "Label | URL" lines); n = 1..3 */
export const colHtml = n => `<div class="mm-col"${n > 1 ? ` data-show-if="col${n}Links"` : ''}>
          <h3 class="mm-col-title" data-edit="col${n}Title"></h3>
          <ul data-links="col${n}Links"></ul>
        </div>`;

/* Featured card at the end of a panel */
export const PROMO_HTML = `<a class="mm-promo" data-show-if="promoTitle" data-href="promoUrl">
        <img class="mm-promo-img" data-image="promoImage" data-optional alt="" loading="lazy">
        <span class="mm-promo-body">
          <span class="mm-promo-tag" data-show-if="promoTag" data-edit="promoTag"></span>
          <strong class="mm-promo-title" data-edit="promoTitle"></strong>
          <span class="mm-promo-text" data-show-if="promoText" data-edit="promoText"></span>
          <span class="mm-promo-link" data-show-if="promoLink"><span data-edit="promoLink"></span> <span aria-hidden="true">→</span></span>
        </span>
      </a>`;

/* ── Fields ────────────────────────────────────────────────────────────────── */
export const storeGroups = () => [
  { id: 'brand', label: 'Logo' },
  { id: 'topbar', label: 'Top bar', toggle: 'showTopBar' },
  { id: 'header', label: 'Search & icons' },
];

export const storeFields = () => [
  { key: 'topText', group: 'topbar', label: 'Message', type: 'text', value: 'Free delivery on orders over $50 · 30-day returns' },
  { key: 'topLinks', group: 'topbar', label: 'Small links (optional)', type: 'links', value: 'Help centre | /help/\nTrack order | /orders/\nStores | /stores/' },
  { key: 'searchUrl', group: 'header', label: 'Search page (form action)', type: 'url', value: '/search/', hint: 'The form sends the visitor to this page with ?q=their words.' },
  { key: 'searchPlaceholder', group: 'header', label: 'Search placeholder', type: 'text', value: 'Search for products' },
  { key: 'searchLabel', group: 'header', label: 'Search button label (screen readers)', type: 'text', value: 'Search' },
  { key: 'accountUrl', group: 'header', label: 'Account link', type: 'url', value: '/account/' },
  { key: 'accountLabel', group: 'header', label: 'Account label (screen readers)', type: 'text', value: 'My account' },
  { key: 'wishlistUrl', group: 'header', label: 'Wishlist link', type: 'url', value: '/wishlist/' },
  { key: 'wishlistLabel', group: 'header', label: 'Wishlist label (screen readers)', type: 'text', value: 'Wishlist' },
  { key: 'cartUrl', group: 'header', label: 'Cart link', type: 'url', value: '/cart/' },
  { key: 'cartLabel', group: 'header', label: 'Cart label (screen readers)', type: 'text', value: 'Shopping cart' },
  { key: 'cartCount', group: 'header', label: 'Cart count badge (optional)', type: 'text', value: '2', hint: 'A sample number. When the page also has the cart sections, the badge shows the real count and hides when the cart is empty.' },
  { key: 'menuLabel', group: 'header', label: 'Menu button label (screen readers)', type: 'text', value: 'Open menu' },
  { key: 'navLabel', group: 'header', label: 'Navigation label (screen readers)', type: 'text', value: 'Shop' },
];

export const storeToggles = () => [
  { key: 'showTopBar', label: 'Top bar', value: true },
  { key: 'showWishlist', label: 'Wishlist icon', value: true },
  { key: 'sticky', label: 'Sticky header', value: true },
  { key: 'hideOnScroll', label: 'Hide on scroll down', value: false },
];

/* Fields of one menu item with a link-column panel (also the department tabs) */
export const columnPanelFields = ({ icon = false, plain = true } = {}) => [
  { key: 'label', label: 'Menu text', type: 'text', value: 'Shop' },
  { key: 'url', label: plain ? 'Link (used when the item has no panel)' : 'View-all link', type: 'url', value: '/shop/' },
  ...(icon ? [{ key: 'icon', label: 'Icon', type: 'icon', value: 'house' }] : []),
  { key: 'col1Title', label: 'Column 1 title', type: 'text', value: 'Living' },
  { key: 'col1Links', label: plain ? 'Column 1 links (leave empty for a plain link without a panel)' : 'Column 1 links', type: 'links', value: 'Sofas | /shop/sofas/\nTables | /shop/tables/\nLighting | /shop/lighting/' },
  { key: 'col2Title', label: 'Column 2 title', type: 'text', value: '' },
  { key: 'col2Links', label: 'Column 2 links (optional)', type: 'links', value: '' },
  { key: 'col3Title', label: 'Column 3 title', type: 'text', value: '' },
  { key: 'col3Links', label: 'Column 3 links (optional)', type: 'links', value: '' },
  { key: 'promoImage', label: 'Featured card image (optional)', type: 'image', value: '', hint: 'About 640×800 px. Leave the card title empty to hide the card.', upload: { name: 'promo', maxW: 900 } },
  { key: 'promoTag', label: 'Featured card tag (optional)', type: 'text', value: '' },
  { key: 'promoTitle', label: 'Featured card title', type: 'text', value: '' },
  { key: 'promoText', label: 'Featured card text (optional)', type: 'text', value: '' },
  { key: 'promoLink', label: 'Featured card link text (optional)', type: 'text', value: 'Shop now' },
  { key: 'promoUrl', label: 'Featured card link', type: 'url', value: '/shop/' },
];

/* Fields of one menu item whose panel is a row of image tiles (up to 4) */
export const tilePanelFields = () => [
  { key: 'label', label: 'Menu text', type: 'text', value: 'Living' },
  { key: 'url', label: 'Link (used when the item has no panel)', type: 'url', value: '/shop/' },
  { key: 'panelTitle', label: 'Panel heading (optional)', type: 'text', value: '' },
  { key: 'allLabel', label: '"View all" text (optional)', type: 'text', value: 'View all' },
  { key: 'allUrl', label: '"View all" link', type: 'url', value: '/shop/' },
  ...[1, 2, 3, 4].flatMap(n => [
    { key: `tile${n}Image`, label: `Tile ${n} image`, type: 'image', value: '', hint: 'About 640×800 px.', upload: { name: `tile${n}`, maxW: 800 } },
    { key: `tile${n}Label`, label: `Tile ${n} label (empty = no tile; tile 1 empty = plain link)`, type: 'text', value: '' },
    { key: `tile${n}Url`, label: `Tile ${n} link`, type: 'url', value: '/shop/' },
  ]),
];

/* ── Demo content (a home and audio shop) ──────────────────────────────────── */
export const DEMO_COLUMN_ITEMS = [
  {
    label: 'Shop', url: '/shop/',
    col1Title: 'Living', col1Links: 'Sofas & armchairs | /shop/sofas/\nTables & desks | /shop/tables/\nLighting | /shop/lighting/\nRugs & textiles | /shop/rugs/\nStorage | /shop/storage/',
    col2Title: 'Kitchen & dining', col2Links: 'Cookware | /shop/cookware/\nTableware | /shop/tableware/\nCoffee & tea | /shop/coffee-tea/\nGlassware | /shop/glassware/\nLinen | /shop/linen/',
    col3Title: 'Tech & audio', col3Links: 'Headphones | /shop/headphones/\nEarbuds | /shop/earbuds/\nSpeakers | /shop/speakers/\nStands & mounts | /shop/stands/\nSmart home | /shop/smart-home/',
    promoImage: IMG('product-headphones.png'), promoTag: 'New in', promoTitle: 'The Quiet Collection', promoText: 'Noise-cancelling headphones in three finishes.', promoLink: 'Shop the range', promoUrl: '/shop/headphones/',
  },
  {
    label: 'Gifts', url: '/gifts/',
    col1Title: 'By price', col1Links: 'Under $25 | /gifts/under-25/\nUnder $50 | /gifts/under-50/\nUnder $100 | /gifts/under-100/\nLuxury | /gifts/luxury/',
    col2Title: 'By person', col2Links: 'For her | /gifts/her/\nFor him | /gifts/him/\nFor kids | /gifts/kids/\nFor hosts | /gifts/hosts/',
    col3Title: 'Occasions', col3Links: 'Birthday | /gifts/birthday/\nHousewarming | /gifts/housewarming/\nWedding | /gifts/wedding/\nThank you | /gifts/thank-you/',
    promoImage: IMG('room-2.jpg'), promoTag: 'Gift cards', promoTitle: 'Send a gift in seconds', promoText: 'Digital cards from $10, delivered by email.', promoLink: 'Choose a card', promoUrl: '/gift-cards/',
  },
  { label: 'New in', url: '/new/', col1Links: '' },
  { label: 'Sale', url: '/sale/', col1Links: '' },
  { label: 'Journal', url: '/blog/', col1Links: '' },
];

export const DEMO_TILE_ITEMS = [
  {
    label: 'Living', url: '/shop/living/', panelTitle: 'Shop the living room', allLabel: 'View all living', allUrl: '/shop/living/',
    tile1Image: IMG('room-1.jpg'), tile1Label: 'Sofas', tile1Url: '/shop/sofas/',
    tile2Image: IMG('room-2.jpg'), tile2Label: 'Lighting', tile2Url: '/shop/lighting/',
    tile3Image: IMG('room-3.jpg'), tile3Label: 'Rugs', tile3Url: '/shop/rugs/',
    tile4Image: IMG('room-4.jpg'), tile4Label: 'Storage', tile4Url: '/shop/storage/',
  },
  {
    label: 'Audio', url: '/shop/audio/', panelTitle: 'Sound, made simple', allLabel: 'View all audio', allUrl: '/shop/audio/',
    tile1Image: IMG('product-headphones.png'), tile1Label: 'Headphones', tile1Url: '/shop/headphones/',
    tile2Image: IMG('product-earbuds.png'), tile2Label: 'Earbuds', tile2Url: '/shop/earbuds/',
    tile3Image: IMG('product-speaker.png'), tile3Label: 'Speakers', tile3Url: '/shop/speakers/',
    tile4Image: IMG('product-stand.png'), tile4Label: 'Stands', tile4Url: '/shop/stands/',
  },
  { label: 'Gifts', url: '/gifts/', tile1Label: '' },
  { label: 'Sale', url: '/sale/', tile1Label: '' },
];

/* ── Structured data: the main menu as SiteNavigationElement items ─────────── */
const plain = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
export const megaSchema = listKey => state => {
  const items = (state.lists?.[listKey] || []).filter(it => plain(it.label));
  return items.length ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'SiteNavigationElement',
      position: i + 1,
      name: plain(it.label),
      ...(/^https?:/.test(it.url || '') && { url: it.url }),
    })),
  } : null;
};

/* ── CSS ───────────────────────────────────────────────────────────────────── */
export const MEGA_CSS = `${NAV_CSS}
.mm-top{background:var(--st-text);color:var(--st-bg);font-size:13.5px}
.mm-top-in{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:38px}
.mm-top-links{list-style:none;display:flex;gap:20px}
.mm-top a{color:inherit;opacity:.82;text-decoration:none}
.mm-top a:hover{opacity:1;text-decoration:underline}
.mm-main{display:flex;align-items:center;gap:clamp(16px,2.6cqi,36px);min-height:74px}
.mm-search{position:relative;flex:1;max-width:560px;margin:0 auto}
.mm-search input{width:100%;height:46px;padding:0 54px 0 20px;border-radius:999px;border:1px solid color-mix(in srgb,var(--st-text) 16%,transparent);background:color-mix(in srgb,var(--st-text) 4%,transparent);color:var(--st-text);font:400 15.5px/1 var(--st-font-body);outline:none;transition:border-color .2s ease,box-shadow .2s ease,background .2s ease}
.mm-search input::placeholder{color:var(--st-muted)}
.mm-search input:focus{border-color:var(--st-brand);background:var(--st-bg);box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 16%,transparent)}
.mm-search button{position:absolute;right:4px;top:4px;display:grid;place-items:center;width:38px;height:38px;border:0;border-radius:50%;background:var(--st-brand);color:var(--st-btn-text);cursor:pointer}
.mm-search button svg{width:18px;height:18px}
.mm-actions{display:flex;align-items:center;gap:2px;flex:none}
.mm-act{position:relative;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;color:var(--st-text);text-decoration:none;transition:background .2s ease,color .2s ease}
.mm-act:hover{background:color-mix(in srgb,var(--st-text) 8%,transparent);color:var(--st-brand)}
.mm-act svg{width:22px;height:22px}
.mm-badge{position:absolute;top:2px;right:0;min-width:18px;height:18px;padding:0 5px;border-radius:99px;background:var(--st-brand);color:var(--st-btn-text);font:700 11px/18px var(--st-font-body);text-align:center}
.mm-nav{position:static}
.mm-items{list-style:none;display:flex;align-items:center;gap:2px}
.mm-item{position:static}
.mm-link{position:relative;display:inline-flex;align-items:center;gap:6px;min-height:var(--mm-h,52px);padding:0 16px;border:0;background:none;color:var(--st-text);font:600 15.5px/1 var(--st-font-body);text-decoration:none;white-space:nowrap;cursor:pointer;transition:color .2s ease}
.mm-link::after{content:"";position:absolute;left:16px;right:16px;bottom:0;height:3px;border-radius:3px 3px 0 0;background:var(--st-brand);transform:scaleX(0);transition:transform .25s ease}
.mm-link:hover,.mm-item.is-open>.mm-link{color:var(--st-brand)}
.mm-link:hover::after,.mm-item.is-open>.mm-link::after{transform:scaleX(1)}
.mm-link:focus-visible,.mc-tab:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 45%,transparent);outline-offset:-3px;border-radius:8px}
.mm-chev{width:16px;height:16px;flex:none;transition:transform .25s ease}
.mm-item.is-open>.mm-link .mm-chev{transform:rotate(180deg)}
.mm-panel{position:absolute;left:0;right:0;top:100%;z-index:5;background:var(--st-bg);border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);box-shadow:0 34px 60px -34px rgba(15,23,42,.4);visibility:hidden;opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity .22s ease,transform .22s ease,visibility 0s linear .22s}
.mm-item.is-open>.mm-panel,.st:not(.has-mega) .mm-item:hover>.mm-panel,.st:not(.has-mega) .mm-item:focus-within>.mm-panel{visibility:visible;opacity:1;transform:none;pointer-events:auto;transition-delay:0s}
.mm-panel-in{display:grid;grid-template-columns:minmax(0,1fr) minmax(250px,.8fr);gap:clamp(24px,4cqi,56px);padding-top:32px;padding-bottom:36px}
.mm-panel-in:not(:has(.mm-promo)){grid-template-columns:minmax(0,1fr)}
.mm-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:28px}
.mm-col-title{margin-bottom:12px;font:700 12.5px/1.2 var(--st-font-body);letter-spacing:.09em;text-transform:uppercase;color:var(--st-muted)}
.mm-col ul{list-style:none;display:flex;flex-direction:column;gap:2px}
.mm-col a{display:block;padding:6px 0;color:var(--st-text);font-size:15.5px;text-decoration:none;transition:color .15s ease,transform .15s ease}
.mm-col a:hover{color:var(--st-brand);transform:translateX(3px)}
.mm-promo{position:relative;display:flex;flex-direction:column;justify-content:flex-end;min-height:270px;border-radius:calc(var(--st-radius) * 1.3px);overflow:hidden;isolation:isolate;color:#fff;text-decoration:none;background:var(--st-surface)}
.mm-promo-img{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
.mm-promo::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,transparent 12%,rgba(8,10,20,.84))}
.mm-promo:hover .mm-promo-img{transform:scale(1.05)}
.mm-promo-body{display:flex;flex-direction:column;align-items:flex-start;gap:6px;padding:22px}
.mm-promo-tag{padding:3px 10px;border-radius:99px;background:var(--st-brand);color:var(--st-btn-text);font:700 11.5px/1.5 var(--st-font-body);letter-spacing:.05em;text-transform:uppercase}
.mm-promo-title{font:800 22px/1.2 var(--st-font-heading);letter-spacing:-.02em}
.mm-promo-text{font-size:14.5px;line-height:1.5;opacity:.9}
.mm-promo-link{margin-top:4px;font-weight:700;font-size:14.5px;border-bottom:2px solid currentColor}
@media (prefers-reduced-motion:reduce){.mm-panel,.mm-link::after,.mm-chev,.mm-promo-img{transition:none}}
@container st (max-width:860px){
.st-wrap.mm-main{flex-wrap:wrap;gap:10px 8px;min-height:64px;padding-top:10px;padding-bottom:10px}
.mm-main .st-burger{display:inline-block;order:3}
.mm-actions{margin-left:auto;order:2}
.mm-search{order:5;flex:1 1 100%;max-width:none;margin:0}
.mm-nav{position:absolute;left:0;right:0;top:100%;z-index:6;max-height:72vh;overflow:auto;padding:6px var(--st-pad) 22px;background:var(--st-bg);border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);box-shadow:0 30px 50px -30px rgba(15,23,42,.4)}
.has-menu:not(.menu-open) .mm-nav{display:none}
.mm-items{flex-direction:column;align-items:stretch;gap:0}
.mm-link{width:100%;justify-content:space-between;min-height:56px;padding:0;border-bottom:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);font-size:17px}
.mm-link::after{display:none}
.mm-panel,.mm-item.is-open>.mm-panel,.st:not(.has-mega) .mm-panel{position:static;display:none;visibility:visible;opacity:1;transform:none;pointer-events:auto;border:0;box-shadow:none;background:none}
.mm-item.is-open>.mm-panel,.st:not(.has-mega) .mm-panel{display:block}
.mm-panel-in{display:block;padding:14px 0 10px}
.mm-panel-in .st-wrap{padding:0}
.mm-cols{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.mm-promo{margin-top:18px;min-height:210px}
.st:not(.has-menu) .mm-nav{position:static;max-height:none;box-shadow:none}
.st:not(.has-menu) .st-burger{display:none}
}
@container st (max-width:520px){.mm-cols{grid-template-columns:1fr}.mm-top-links{display:none}.mm-top-in{justify-content:center;text-align:center}}`;

export { BRAND_CSS };

export const DEMO_DEPARTMENTS = [
  {
    label: 'Living room', url: '/shop/living/', icon: 'house',
    col1Title: 'Seating', col1Links: 'Sofas | /shop/sofas/\nArmchairs | /shop/armchairs/\nFootstools | /shop/footstools/\nBenches | /shop/benches/',
    col2Title: 'Tables & storage', col2Links: 'Coffee tables | /shop/coffee-tables/\nSide tables | /shop/side-tables/\nTV units | /shop/tv-units/\nShelving | /shop/shelving/',
    col3Title: 'Decor', col3Links: 'Rugs | /shop/rugs/\nCushions | /shop/cushions/\nWall art | /shop/wall-art/\nMirrors | /shop/mirrors/',
    promoImage: IMG('room-1.jpg'), promoTag: 'Sofa season', promoTitle: 'Up to 25% off sofas', promoText: 'Free assembly on every sofa order.', promoLink: 'Shop sofas', promoUrl: '/shop/sofas/',
  },
  {
    label: 'Kitchen & dining', url: '/shop/kitchen/', icon: 'coffee',
    col1Title: 'Cook', col1Links: 'Pans & pots | /shop/pans/\nKnives | /shop/knives/\nBakeware | /shop/bakeware/\nGadgets | /shop/gadgets/',
    col2Title: 'Dine', col2Links: 'Plates & bowls | /shop/plates/\nGlassware | /shop/glassware/\nCutlery | /shop/cutlery/\nLinen | /shop/linen/',
    col3Title: 'Coffee & tea', col3Links: 'Coffee machines | /shop/coffee-machines/\nGrinders | /shop/grinders/\nTeapots | /shop/teapots/\nMugs | /shop/mugs/',
    promoImage: IMG('room-3.jpg'), promoTag: 'Editor pick', promoTitle: 'The breakfast edit', promoText: 'Everything for a slower morning.', promoLink: 'Browse the edit', promoUrl: '/edits/breakfast/',
  },
  {
    label: 'Audio & tech', url: '/shop/audio/', icon: 'headphones',
    col1Title: 'Listen', col1Links: 'Headphones | /shop/headphones/\nEarbuds | /shop/earbuds/\nSpeakers | /shop/speakers/\nTurntables | /shop/turntables/',
    col2Title: 'Smart home', col2Links: 'Hubs | /shop/hubs/\nSmart lighting | /shop/smart-lighting/\nPlugs | /shop/plugs/\nCameras | /shop/cameras/',
    col3Title: 'Accessories', col3Links: 'Stands | /shop/stands/\nCables | /shop/cables/\nCases | /shop/cases/\nChargers | /shop/chargers/',
    promoImage: IMG('product-speaker.png'), promoTag: 'New in', promoTitle: 'Sound, everywhere', promoText: 'A speaker that fills any room.', promoLink: 'Shop speakers', promoUrl: '/shop/speakers/',
  },
  {
    label: 'Lighting', url: '/shop/lighting/', icon: 'lightbulb',
    col1Title: 'Lamps', col1Links: 'Table lamps | /shop/table-lamps/\nFloor lamps | /shop/floor-lamps/\nDesk lamps | /shop/desk-lamps/\nPendants | /shop/pendants/',
    col2Title: 'Bulbs', col2Links: 'Smart bulbs | /shop/smart-bulbs/\nFilament | /shop/filament/\nLED strips | /shop/led-strips/',
    col3Title: 'By room', col3Links: 'Bedroom | /shop/lighting/bedroom/\nOffice | /shop/lighting/office/\nOutdoor | /shop/lighting/outdoor/',
    promoImage: IMG('room-2.jpg'), promoTag: 'Trending', promoTitle: 'Warm light, all evening', promoText: 'Dimmable lamps that set the mood.', promoLink: 'See the lamps', promoUrl: '/shop/table-lamps/',
  },
  {
    label: 'Gifts', url: '/gifts/', icon: 'gift',
    col1Title: 'By price', col1Links: 'Under $25 | /gifts/under-25/\nUnder $50 | /gifts/under-50/\nUnder $100 | /gifts/under-100/',
    col2Title: 'For', col2Links: 'Her | /gifts/her/\nHim | /gifts/him/\nKids | /gifts/kids/\nHosts | /gifts/hosts/',
    col3Title: 'Occasions', col3Links: 'Birthday | /gifts/birthday/\nHousewarming | /gifts/housewarming/\nThank you | /gifts/thank-you/',
    promoImage: IMG('room-4.jpg'), promoTag: 'Gift guide', promoTitle: 'Gifts they will keep', promoText: 'Hand-picked ideas for every budget.', promoLink: 'Open the guide', promoUrl: '/gifts/',
  },
];
