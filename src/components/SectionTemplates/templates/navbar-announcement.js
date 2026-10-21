import { BRAND_HTML, BURGER_HTML, STICKY_FLAGS_HTML, NAV_CSS, brandFields, navLinkFields, navToggles, DEMO_LINKS } from './parts.js';

export default {
  id: 'navbar-announcement',
  name: 'Navbar With Announcement Bar',
  version: '1.0.0',
  category: 'navbar',
  tags: ['navbar', 'header', 'announcement-bar', 'banner', 'dismissible', 'mobile-menu', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Navbar With Announcement Bar — Free Header Template HTML',
  seoDescription: 'Free header with a dismissible announcement bar above a responsive navbar with logo, links, sign-in and CTA, plus an animated mobile menu. Export HTML or React.',
  description: 'A two-part site header: a slim announcement bar on top for news, launches or offers, with a link and a close button that collapses it smoothly; underneath, a navbar with the logo and links on the left and sign-in plus a CTA on the right. On phones the links fold into an animated menu.',
  bestFor: ['Announcing launches, sales and events', 'E-commerce and promotions', 'SaaS sites with a changelog or webinar to promote'],
  behaviors: ['menu'],
  previewMinHeight: 600,

  groups: [
    { id: 'bar', label: 'Announcement bar', toggle: 'showBar' },
    { id: 'brand', label: 'Logo' },
    { id: 'items', label: 'Links' },
    { id: 'actions', label: 'Buttons' },
  ],
  fields: [
    { key: 'barText', group: 'bar', label: 'Announcement', type: 'text', value: '🎉 Spring sale: 30% off all yearly plans until 31 May.' },
    { key: 'barLink', group: 'bar', label: 'Link text (optional)', type: 'text', value: 'See plans' },
    { key: 'barUrl', group: 'bar', label: 'Link', type: 'url', value: 'https://webdevpuneet.com/pricing' },
    { key: 'closeLabel', group: 'bar', label: 'Close button label (screen readers)', type: 'text', value: 'Dismiss announcement' },
    ...brandFields(),
    { key: 'login', group: 'actions', label: 'Secondary link (optional)', type: 'text', value: 'Sign in' },
    { key: 'loginUrl', group: 'actions', label: 'Secondary link URL', type: 'url', value: 'https://webdevpuneet.com/login' },
    { key: 'cta', group: 'actions', label: 'Button text', type: 'text', value: 'Shop now' },
    { key: 'ctaUrl', group: 'actions', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/shop' },
    { key: 'menuLabel', group: 'actions', label: 'Menu button label (screen readers)', type: 'text', value: 'Open menu' },
    { key: 'navLabel', group: 'actions', label: 'Navigation label (screen readers)', type: 'text', value: 'Main' },
  ],
  lists: [{
    key: 'links', group: 'items', label: 'Links', itemLabel: 'Link', titleKey: 'label', min: 1, max: 7,
    fields: navLinkFields(),
    value: [{ label: 'New in', url: '/new/' }, { label: 'Women', url: '/women/' }, { label: 'Men', url: '/men/' }, { label: 'Accessories', url: '/accessories/' }, { label: 'Journal', url: '/journal/' }],
  }],
  toggles: [{ key: 'showBar', label: 'Announcement bar', value: true }, ...navToggles()],
  theme: { brand: '#be185d', brandText: '#ffffff', bg: '#fffbf7', surface: '#1f1a17', text: '#1f1a17', muted: '#5c534d', radius: '10' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="na-bar" data-show="showBar" data-dismissable>
  <p class="st-wrap na-bar-in"><span data-edit="barText"></span> <a class="na-bar-link" data-href="barUrl" data-show-if="barLink"><span data-edit="barLink"></span> <span aria-hidden="true">→</span></a></p>
  <button type="button" class="na-close" data-dismiss data-set="aria-label:closeLabel"><span aria-hidden="true">×</span></button>
</div>
<header class="st-wrap na">
  <div class="na-left">
    ${BRAND_HTML}
    <nav class="na-nav" data-menu data-set="aria-label:navLabel">
      <ul class="na-links" data-list="links">
        <li data-menu-item><a class="na-link" data-href="url"><span data-edit="label"></span></a></li>
      </ul>
      <div class="na-actions na-actions--menu" data-menu-item>
        <a class="na-login" data-href="loginUrl" data-show-if="login"><span data-edit="login"></span></a>
        <a class="st-btn" data-href="ctaUrl"><span data-edit="cta"></span></a>
      </div>
    </nav>
  </div>
  <div class="na-actions na-actions--bar">
    <a class="na-login" data-href="loginUrl" data-show-if="login"><span data-edit="login"></span></a>
    <a class="st-btn" data-href="ctaUrl"><span data-edit="cta"></span></a>
  </div>
  ${BURGER_HTML}
</header>
${STICKY_FLAGS_HTML}`,
  css: `.st-navbar-announcement{overflow:visible;background:var(--st-bg);border-bottom:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
${NAV_CSS}
.na-bar{position:relative;overflow:hidden;background:var(--st-surface);color:#fff}
.na-bar-in{padding-top:10px;padding-bottom:10px;padding-right:56px;text-align:center;font-size:14.5px;font-weight:500}
.na-bar-link{color:#fff;font-weight:800;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}
.na-close{position:absolute;right:max(8px,calc(var(--st-pad) - 12px));top:50%;transform:translateY(-50%);display:grid;place-items:center;width:34px;height:34px;border:0;border-radius:8px;background:none;color:#fff;font-size:22px;line-height:1;cursor:pointer;opacity:.8}
.na-close:hover{opacity:1;background:rgba(255,255,255,.12)}
.na{position:relative;display:flex;align-items:center;gap:24px;min-height:70px}
.na-left{flex:1;display:flex;align-items:center;gap:clamp(20px,3cqi,40px);min-width:0}
.na-nav{display:flex;align-items:center}
.na-links{list-style:none;display:flex;gap:2px}
.na-link{display:block;padding:8px 12px;color:var(--st-text);font-weight:600;font-size:15px;text-decoration:none;border-radius:calc(var(--st-radius) * 1px)}
.na-link:hover{color:var(--st-brand)}
.na-actions{display:flex;align-items:center;gap:16px}
.na-actions--menu{display:none}
.na-login{color:var(--st-text);font-weight:600;font-size:15px;text-decoration:none}
.na-login:hover{color:var(--st-brand)}
.na .st-btn{min-height:42px;padding:0 20px;font-size:15px}
@container st (max-width:900px){
.na .st-burger{display:inline-block}
.na-actions--bar{display:none}
.na-nav{position:absolute;left:var(--st-pad);right:var(--st-pad);top:calc(100% + 8px);flex-direction:column;align-items:stretch;gap:8px;padding:10px;border-radius:calc(var(--st-radius) * 1.4px);background:var(--st-bg);border:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);box-shadow:0 24px 60px -24px rgba(31,26,23,.4)}
.na-links{flex-direction:column}
.na-link{padding:12px 14px;font-size:16.5px}
.na-actions--menu{display:flex;flex-direction:column;align-items:stretch;gap:10px;padding:12px 4px 4px;border-top:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
.na-actions--menu .na-login{padding:8px 10px}
.na-actions--menu .st-btn{width:100%;min-height:48px}
.has-menu:not(.menu-open) .na-nav{display:none}
.st:not(.has-menu) .na-left{flex-wrap:wrap;padding:10px 0}
.st:not(.has-menu) .na-nav{position:static;flex-basis:100%;box-shadow:none}
.st:not(.has-menu) .st-burger{display:none}
.na-bar-in{font-size:13.5px;text-align:left}
}`,
};
