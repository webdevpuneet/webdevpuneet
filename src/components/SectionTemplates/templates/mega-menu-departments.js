import { BRAND_HTML, BURGER_HTML, STICKY_FLAGS_HTML, brandFields } from './parts.js';
import { TOPBAR_HTML, SEARCH_HTML, ACTIONS_HTML, CHEVRON, colHtml, PROMO_HTML, storeGroups, storeFields, storeToggles, columnPanelFields, DEMO_DEPARTMENTS, megaSchema, MEGA_CSS } from './mega-parts.js';

const CHEV_RIGHT = '<svg class="mc-tab-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';

export default {
  id: 'mega-menu-departments',
  name: 'Ecommerce Mega Menu — Department Sidebar',
  version: '1.0.0',
  category: 'navbar',
  tags: ['navbar', 'mega-menu', 'ecommerce', 'store', 'departments', 'categories', 'sidebar', 'marketplace', 'header', 'light'],
  created: '2026-11-14',
  updated: '2026-11-14',
  seoTitle: 'Department Mega Menu Template — Free Store Menu HTML',
  seoDescription: 'Free department mega menu for big shops: an All categories button opens a panel with a category list on the left and its links and a featured card on the right.',
  description: 'The big-catalogue pattern used by marketplaces and department stores. Under the search header, an All categories button opens one large panel: a vertical list of departments with icons on the left, and on the right the sub-category columns and a featured card of whichever department you point at. Quick links such as Deals and Gift cards sit beside the button. On phones the departments turn into chips above the active panel.',
  bestFor: ['Marketplaces and department stores', 'Shops with dozens of categories', 'Electronics, grocery and home-improvement catalogues'],
  behaviors: ['menu', 'mega'],
  previewMinHeight: 620,
  schema: megaSchema('categories'),

  groups: [
    ...storeGroups(),
    { id: 'items', label: 'Departments' },
    { id: 'nav', label: 'Button & quick links' },
  ],
  fields: [
    ...brandFields(),
    ...storeFields(),
    { key: 'allLabel', group: 'nav', label: 'Button text', type: 'text', value: 'All categories' },
    { key: 'quick', group: 'nav', label: 'Quick links (optional)', type: 'links', value: 'Deals | /deals/\nNew in | /new/\nGift cards | /gift-cards/\nHelp | /help/' },
  ],
  lists: [{
    key: 'categories', group: 'items', label: 'Departments', itemLabel: 'Department', titleKey: 'label', min: 1, max: 8,
    fields: columnPanelFields({ icon: true, plain: false }),
    value: DEMO_DEPARTMENTS,
  }],
  toggles: storeToggles(),
  theme: { brand: '#2563eb', brandText: '#ffffff', bg: '#ffffff', surface: '#eef2fb', text: '#0f172a', muted: '#475569', radius: '12' },
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
    <nav class="mm-nav mc-nav" data-menu data-mega data-set="aria-label:navLabel">
      <div class="mm-item mc-all" data-menu-item>
        <button type="button" class="mm-link mm-trigger mc-all-btn" aria-expanded="false"><span class="mc-bars" aria-hidden="true"><i></i><i></i><i></i></span><span data-edit="allLabel"></span>${CHEVRON}</button>
        <div class="mm-panel">
          <div class="st-wrap mc-in" data-mega-tabs>
            <ul class="mc-rail" data-list="categories">
              <li><button type="button" class="mc-tab"><span class="mc-tab-icon" data-icon="icon"></span><span class="mc-tab-label" data-edit="label"></span>${CHEV_RIGHT}</button></li>
            </ul>
            <div class="mc-panes" data-list="categories">
              <div class="mc-pane">
                <div class="mc-pane-head">
                  <h3 class="mc-pane-title" data-edit="label"></h3>
                  <a class="mc-all-link" data-href="url">View all <span aria-hidden="true">→</span></a>
                </div>
                <div class="mc-pane-body">
                  <div class="mm-cols">
                    ${colHtml(1)}
                    ${colHtml(2)}
                    ${colHtml(3)}
                  </div>
                  ${PROMO_HTML}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="mc-quick" data-menu-item data-show-if="quick" data-links="quick"></ul>
    </nav>
  </div>
</div>
${STICKY_FLAGS_HTML}`,
  css: `.st-mega-menu-departments{overflow:visible;border-bottom:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
${MEGA_CSS}
.mm-navbar{border-top:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
.mc-nav{display:flex;align-items:center;gap:6px;min-height:58px}
.mc-all-btn{min-height:44px;padding:0 20px 0 16px;border-radius:calc(var(--st-radius) * .8px);background:var(--st-brand);color:var(--st-btn-text);font-weight:700}
.mc-all-btn::after{display:none}
.mc-all-btn::before{content:"";position:absolute;left:0;right:0;bottom:-10px;height:10px}
.mc-all-btn:hover,.mm-item.is-open>.mc-all-btn{color:var(--st-btn-text);filter:brightness(1.1)}
.mc-bars i{display:block;width:16px;height:2px;margin:3px 0;border-radius:2px;background:currentColor}
.mc-quick{list-style:none;display:flex;align-items:center;gap:2px;margin-left:10px}
.mc-quick a{display:inline-flex;align-items:center;min-height:44px;padding:0 14px;border-radius:calc(var(--st-radius) * .7px);color:var(--st-muted);font-weight:600;font-size:15px;text-decoration:none;transition:color .2s ease,background .2s ease}
.mc-quick a:hover{color:var(--st-brand);background:color-mix(in srgb,var(--st-brand) 9%,transparent)}
.mc-in{display:grid;grid-template-columns:minmax(220px,280px) minmax(0,1fr);gap:0;padding-top:0;padding-bottom:0}
.mc-rail{list-style:none;padding:22px 22px 22px 0;border-right:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);display:flex;flex-direction:column;gap:2px}
.mc-tab{display:flex;align-items:center;gap:12px;width:100%;padding:12px 14px;border:0;border-radius:calc(var(--st-radius) * .8px);background:none;color:var(--st-text);font:600 15.5px/1.2 var(--st-font-body);text-align:left;cursor:pointer;transition:background .15s ease,color .15s ease}
.mc-tab:hover,.mc-tab[aria-current="true"]{background:color-mix(in srgb,var(--st-brand) 10%,transparent);color:var(--st-brand)}
.mc-tab-icon{display:grid;place-items:center;width:34px;height:34px;flex:none;border-radius:10px;background:color-mix(in srgb,var(--st-brand) 12%,transparent);color:var(--st-brand)}
.mc-tab-icon svg{width:19px;height:19px}
.mc-tab-label{flex:1}
.mc-tab-chev{width:16px;height:16px;flex:none;opacity:.5}
.mc-panes{padding:26px 0 30px clamp(24px,4cqi,48px)}
.mc-pane{display:none}
.mc-pane.is-active,.st:not(.has-mega) .mc-pane:first-child{display:block}
.mc-pane-head{display:flex;align-items:baseline;justify-content:space-between;gap:16px;margin-bottom:18px}
.mc-pane-title{font:800 clamp(20px,1.2cqi + 14px,26px)/1.2 var(--st-font-heading);letter-spacing:-.02em}
.mc-all-link{color:var(--st-brand);font-weight:700;font-size:15px;text-decoration:none}
.mc-all-link:hover{text-decoration:underline}
.mc-pane-body{display:grid;grid-template-columns:minmax(0,1fr) minmax(240px,.55fr);gap:clamp(20px,3cqi,44px)}
.mc-pane .mm-cols{grid-template-columns:repeat(auto-fit,minmax(125px,1fr));gap:22px}
.mc-pane-body:not(:has(.mm-promo)){grid-template-columns:minmax(0,1fr)}
.mc-pane .mm-promo{min-height:240px}
@container st (max-width:860px){
.mc-nav{display:block;min-height:0}
.mc-all-btn{justify-content:flex-start;gap:12px;min-height:56px;padding:0;border-radius:0;background:none;color:var(--st-text);font-weight:600}
.mc-all-btn .mm-chev{margin-left:auto}
.mc-all-btn::before{display:none}
.mc-all-btn:hover,.mm-item.is-open>.mc-all-btn{color:var(--st-brand);filter:none}
.mc-quick{flex-direction:column;align-items:stretch;gap:0;margin:0}
.mc-quick a{min-height:54px;padding:0;border-radius:0;border-bottom:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);color:var(--st-text);font-size:17px}
.mc-in{display:block}
.mc-rail{flex-direction:row;flex-wrap:wrap;gap:8px;padding:6px 0 14px;border:0}
.mc-tab{width:auto;padding:8px 12px;border:1px solid color-mix(in srgb,var(--st-text) 14%,transparent);border-radius:999px;font-size:15px}
.mc-tab[aria-current="true"]{border-color:var(--st-brand)}
.mc-tab-icon{width:24px;height:24px;border-radius:50%}
.mc-tab-icon svg{width:14px;height:14px}
.mc-tab-chev{display:none}
.mc-panes{padding:0 0 8px}
.mc-pane-body{display:block}
.mc-pane .mm-promo{margin-top:18px}
}`,
};
