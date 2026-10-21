import { BRAND_HTML, BURGER_HTML, STICKY_FLAGS_HTML, NAV_CSS, brandFields, navLinkFields, navToggles, DEMO_LINKS } from './parts.js';

export default {
  id: 'navbar-simple',
  name: 'Simple Sticky Navbar',
  version: '1.0.0',
  category: 'navbar',
  tags: ['navbar', 'header', 'navigation', 'sticky', 'mobile-menu', 'hamburger', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Responsive Navbar Template — Free Sticky Header HTML & CSS',
  seoDescription: 'Free responsive navbar: logo, links, log in and a CTA, sticky with a blur, plus an accessible animated mobile menu with Esc and focus trap. Export the code.',
  description: 'A clean, responsive site header: logo on the left, navigation links, a log-in link and a call-to-action button. It sticks to the top with a frosted blur and a shadow once you scroll, and on small screens the links fold into an accessible hamburger menu that animates open with GSAP.',
  bestFor: ['SaaS and startup websites', 'Any multi-page marketing site', 'Landing pages that need a persistent CTA'],
  behaviors: ['menu'],
  previewMinHeight: 560,

  groups: [
    { id: 'brand', label: 'Logo' },
    { id: 'items', label: 'Links' },
    { id: 'actions', label: 'Buttons' },
  ],
  fields: [
    ...brandFields(),
    { key: 'login', group: 'actions', label: 'Secondary link (optional)', type: 'text', value: 'Log in' },
    { key: 'loginUrl', group: 'actions', label: 'Secondary link URL', type: 'url', value: 'https://webdevpuneet.com/login' },
    { key: 'cta', group: 'actions', label: 'Button text', type: 'text', value: 'Start free trial' },
    { key: 'ctaUrl', group: 'actions', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/signup' },
    { key: 'menuLabel', group: 'actions', label: 'Menu button label (screen readers)', type: 'text', value: 'Open menu' },
    { key: 'navLabel', group: 'actions', label: 'Navigation label (screen readers)', type: 'text', value: 'Main' },
  ],
  lists: [{
    key: 'links', group: 'items', label: 'Links', itemLabel: 'Link', titleKey: 'label', min: 1, max: 8,
    fields: navLinkFields(),
    value: DEMO_LINKS,
  }],
  toggles: navToggles(),
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f6f7fb', text: '#0f172a', muted: '#475569', radius: '12' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<header class="st-wrap nb">
  ${BRAND_HTML}
  <nav class="nb-nav" data-menu data-set="aria-label:navLabel">
    <ul class="nb-links" data-list="links">
      <li data-menu-item><a class="nb-link" data-href="url"><span data-edit="label"></span></a></li>
    </ul>
    <div class="nb-actions" data-menu-item>
      <a class="nb-login" data-href="loginUrl" data-show-if="login"><span data-edit="login"></span></a>
      <a class="st-btn nb-cta" data-href="ctaUrl"><span data-edit="cta"></span></a>
    </div>
  </nav>
  ${BURGER_HTML}
</header>
${STICKY_FLAGS_HTML}`,
  css: `.st-navbar-simple{overflow:visible;background:color-mix(in srgb,var(--st-bg) 88%,transparent);-webkit-backdrop-filter:saturate(1.6) blur(14px);backdrop-filter:saturate(1.6) blur(14px);border-bottom:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
${NAV_CSS}
.nb{position:relative;display:flex;align-items:center;gap:clamp(20px,3cqi,40px);min-height:72px}
.nb-nav{flex:1;display:flex;align-items:center;justify-content:space-between;gap:24px}
.nb-links{list-style:none;display:flex;align-items:center;gap:4px;margin:0 auto}
.nb-link{display:block;padding:8px 14px;border-radius:calc(var(--st-radius) * .7px);color:var(--st-muted);font-weight:600;font-size:15.5px;text-decoration:none;transition:color .2s ease,background .2s ease}
.nb-link:hover{color:var(--st-text);background:color-mix(in srgb,var(--st-text) 6%,transparent)}
.nb-actions{display:flex;align-items:center;gap:18px}
.nb-login{color:var(--st-text);font-weight:600;font-size:15.5px;text-decoration:none}
.nb-login:hover{color:var(--st-brand)}
.nb .nb-cta{min-height:44px;padding:0 20px;font-size:15px}
@container st (max-width:900px){
.nb .st-burger{display:inline-block;margin-left:auto}
.nb-nav{position:absolute;left:var(--st-pad);right:var(--st-pad);top:calc(100% + 8px);flex-direction:column;align-items:stretch;gap:8px;padding:10px;border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-bg);border:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);box-shadow:0 24px 60px -24px rgba(15,23,42,.35)}
.nb-links{flex-direction:column;align-items:stretch;gap:2px;margin:0}
.nb-link{padding:12px 14px;font-size:16.5px;color:var(--st-text)}
.nb-actions{flex-direction:column;align-items:stretch;gap:10px;padding:12px 4px 4px;border-top:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.nb-login{padding:8px 10px}
.nb .nb-cta{width:100%;min-height:48px}
.has-menu:not(.menu-open) .nb-nav{display:none}
.st:not(.has-menu) .nb{flex-wrap:wrap;padding-top:12px;padding-bottom:12px}
.st:not(.has-menu) .nb-nav{position:static;flex-basis:100%;box-shadow:none}
.st:not(.has-menu) .st-burger{display:none}
}`,
};
