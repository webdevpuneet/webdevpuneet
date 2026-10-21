import { BRAND_HTML, BURGER_HTML, STICKY_FLAGS_HTML, NAV_CSS, brandFields, navLinkFields, navToggles, DEMO_LINKS } from './parts.js';

export default {
  id: 'navbar-floating',
  name: 'Floating Pill Navbar',
  version: '1.0.0',
  category: 'navbar',
  tags: ['navbar', 'header', 'floating', 'pill', 'glass', 'fullscreen-menu', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Floating Navbar Template — Free Glass Pill Header HTML & CSS',
  seoDescription: 'Free floating pill navbar: a dark glass header hovering over the page, with a full-screen mobile menu whose links stagger in with GSAP. Export HTML or React.',
  description: 'A modern floating header: a dark, frosted-glass pill that hovers a little below the top of the page, with the logo, centred links and a bright CTA. On small screens the hamburger opens a full-screen menu with large links that stagger in, the style made popular by AI and design-tool websites.',
  bestFor: ['AI, design and developer product sites', 'Portfolios and agency websites', 'Dark or image-heavy hero sections'],
  behaviors: ['menu'],
  previewMinHeight: 640,

  groups: [
    { id: 'brand', label: 'Logo' },
    { id: 'items', label: 'Links' },
    { id: 'actions', label: 'Button' },
  ],
  fields: [
    ...brandFields(),
    { key: 'cta', group: 'actions', label: 'Button text', type: 'text', value: 'Get started' },
    { key: 'ctaUrl', group: 'actions', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/signup' },
    { key: 'menuLabel', group: 'actions', label: 'Menu button label (screen readers)', type: 'text', value: 'Open menu' },
    { key: 'navLabel', group: 'actions', label: 'Navigation label (screen readers)', type: 'text', value: 'Main' },
  ],
  lists: [{
    key: 'links', group: 'items', label: 'Links', itemLabel: 'Link', titleKey: 'label', min: 1, max: 6,
    fields: navLinkFields(),
    value: DEMO_LINKS.slice(0, 4),
  }],
  toggles: navToggles(),
  theme: { brand: '#c4b5fd', brandText: '#1e1033', bg: '#ffffff', surface: '#16131f', text: '#f5f3ff', muted: '#b9b3cc', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="nf">
    ${BRAND_HTML}
    <nav class="nf-nav" data-menu data-set="aria-label:navLabel">
      <ul class="nf-links" data-list="links">
        <li data-menu-item><a class="nf-link" data-href="url"><span data-edit="label"></span></a></li>
      </ul>
      <a class="st-btn nf-cta" data-menu-item data-href="ctaUrl"><span data-edit="cta"></span></a>
    </nav>
    ${BURGER_HTML}
  </header>
</div>
${STICKY_FLAGS_HTML}`,
  css: `.st-navbar-floating{overflow:visible;background:transparent;padding:14px 0}
${NAV_CSS}
.nf{position:relative;display:flex;align-items:center;gap:24px;max-width:1040px;margin:0 auto;padding:8px 8px 8px 18px;border-radius:999px;background:color-mix(in srgb,var(--st-surface) 82%,transparent);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border:1px solid color-mix(in srgb,var(--st-text) 12%,transparent);box-shadow:0 20px 50px -24px rgba(0,0,0,.6)}
.nf .st-brand{color:var(--st-text)}
.nf .st-brand-mark{font-size:19px}
.nf .st-brand-icon{width:30px;height:30px}
.nf-nav{flex:1;display:flex;align-items:center;justify-content:space-between;gap:16px}
.nf-links{list-style:none;display:flex;gap:2px;margin:0 auto}
.nf-link{display:block;padding:9px 16px;border-radius:999px;color:var(--st-muted);font-weight:600;font-size:15px;text-decoration:none;transition:color .2s ease,background .2s ease}
.nf-link:hover{color:var(--st-text);background:color-mix(in srgb,var(--st-text) 9%,transparent)}
.nf .nf-cta{min-height:44px;padding:0 22px;border-radius:999px;font-size:15px}
.nf .st-burger{color:var(--st-text);background:color-mix(in srgb,var(--st-text) 10%,transparent);border-radius:999px}
@container st (max-width:860px){
.nf .st-burger{display:inline-block;margin-left:auto;position:relative;z-index:2}
.nf .st-brand{position:relative;z-index:2}
.nf-nav{position:fixed;inset:0;z-index:1;flex-direction:column;justify-content:center;align-items:flex-start;gap:28px;padding:96px var(--st-pad) 48px;background:color-mix(in srgb,var(--st-surface) 97%,transparent);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}
.nf-links{flex-direction:column;align-items:flex-start;gap:6px;margin:0}
.nf-link{padding:6px 0;font:800 clamp(30px,8cqi,44px)/1.15 var(--st-font-heading);letter-spacing:-.03em;color:var(--st-text);background:none!important}
.nf-link:hover{color:var(--st-brand)}
.nf .nf-cta{min-height:54px;padding:0 30px;font-size:17px}
.has-menu:not(.menu-open) .nf-nav{display:none}
.menu-open .nf{-webkit-backdrop-filter:none;backdrop-filter:none;background:var(--st-surface)}
.st:not(.has-menu) .nf{flex-wrap:wrap;border-radius:calc(var(--st-radius) * 1.4px)}
.st:not(.has-menu) .nf-nav{position:static;flex-basis:100%;padding:8px;background:none}
.st:not(.has-menu) .nf-link{font-size:18px}
.st:not(.has-menu) .st-burger{display:none}
}`,
};
