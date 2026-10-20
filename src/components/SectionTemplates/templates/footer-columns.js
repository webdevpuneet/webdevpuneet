import { BRAND_HTML, BRAND_CSS, brandFields, SOCIAL_HTML, SOCIAL_CSS, socialFields, DEMO_SOCIALS, columnFields, DEMO_COLUMNS } from './parts.js';

export default {
  id: 'footer-columns',
  name: 'Multi-Column Footer',
  version: '1.0.0',
  category: 'footer',
  tags: ['footer', 'columns', 'links', 'social-icons', 'back-to-top', 'saas', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Footer Template — Free Multi-Column Website Footer HTML',
  seoDescription: 'Free multi-column footer: logo, tagline and social icons beside link columns, with a copyright line, legal links and a smooth back-to-top button. Export HTML.',
  description: 'The classic website footer: your logo, a one-line description and social icons on the left, up to five columns of links on the right, and a bottom bar with the copyright, legal links and a back-to-top button that scrolls smoothly with GSAP.',
  bestFor: ['SaaS and product websites', 'Company and agency sites with many pages', 'Any site that needs sitemap-style links'],
  behaviors: ['totop'],

  groups: [
    { id: 'brand', label: 'Logo & tagline' },
    { id: 'social', label: 'Social links', toggle: 'showSocials' },
    { id: 'items', label: 'Link columns' },
    { id: 'bottom', label: 'Bottom bar' },
  ],
  fields: [
    ...brandFields(),
    { key: 'tagline', group: 'brand', label: 'Tagline (optional)', type: 'textarea', value: 'The calm workspace for planning, building and shipping great products.' },
    { key: 'copyright', group: 'bottom', label: 'Copyright', type: 'text', value: '© 2026 Acme Inc. All rights reserved.' },
    { key: 'legal', group: 'bottom', label: 'Legal links (optional)', type: 'links', value: 'Privacy | /privacy/\nTerms | /terms/\nCookies | /cookies/' },
    { key: 'totop', group: 'bottom', label: 'Back-to-top text (optional)', type: 'text', value: 'Back to top' },
  ],
  lists: [
    { key: 'socials', group: 'social', label: 'Social links', itemLabel: 'Social link', titleKey: 'label', min: 1, max: 8, fields: socialFields(), value: DEMO_SOCIALS },
    { key: 'columns', group: 'items', label: 'Link columns', itemLabel: 'Column', titleKey: 'title', min: 1, max: 5, fields: columnFields(), value: DEMO_COLUMNS },
  ],
  toggles: [{ key: 'showSocials', label: 'Social links', value: true }],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#f8f9fc', surface: '#ffffff', text: '#0f172a', muted: '#64748b', radius: '12' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<footer class="st-wrap fo">
  <div class="fo-top">
    <div class="fo-brand" data-anim="item">
      ${BRAND_HTML}
      <p class="fo-tagline" data-edit="tagline"></p>
      <div data-show="showSocials">${SOCIAL_HTML}</div>
    </div>
    <div class="fo-cols" data-list="columns">
      <nav class="fo-col" data-anim="item" data-set="aria-label:title">
        <h2 class="fo-col-title" data-edit="title"></h2>
        <ul class="fo-links" data-links="links"></ul>
      </nav>
    </div>
  </div>
  <div class="fo-bottom">
    <p class="fo-copy" data-edit="copyright"></p>
    <ul class="fo-legal" data-show-if="legal" data-links="legal"></ul>
    <a class="fo-totop" href="#" data-totop data-show-if="totop"><span data-edit="totop"></span> <span aria-hidden="true">↑</span></a>
  </div>
</footer>`,
  css: `.st-footer-columns{padding:clamp(56px,7cqi,88px) 0 28px;border-top:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
${BRAND_CSS}
${SOCIAL_CSS}
.fo-top{display:grid;grid-template-columns:minmax(220px,1.1fr) 2fr;gap:clamp(36px,5cqi,80px)}
.fo-brand{display:flex;flex-direction:column;align-items:flex-start;gap:18px}
.fo-tagline{color:var(--st-muted);font-size:15.5px;max-width:24em}
.fo-tagline:empty{display:none}
.fo-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:28px}
.fo-col-title{font:700 14px/1.2 var(--st-font-body);letter-spacing:.06em;text-transform:uppercase;color:var(--st-text);margin-bottom:16px}
.fo-links{list-style:none;display:flex;flex-direction:column;gap:11px}
.fo-links a,.fo-legal a{color:var(--st-muted);font-size:15px;text-decoration:none;transition:color .2s ease}
.fo-links a:hover,.fo-legal a:hover{color:var(--st-brand)}
.fo-bottom{display:flex;align-items:center;flex-wrap:wrap;gap:12px 28px;margin-top:clamp(40px,5cqi,64px);padding-top:24px;border-top:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.fo-copy{color:var(--st-muted);font-size:14px;margin-right:auto}
.fo-legal{list-style:none;display:flex;flex-wrap:wrap;gap:8px 22px}
.fo-legal a{font-size:14px}
.fo-totop{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;background:color-mix(in srgb,var(--st-text) 6%,transparent);color:var(--st-text);font-size:14px;font-weight:600;text-decoration:none}
.fo-totop:hover{background:var(--st-brand);color:var(--st-btn-text)}
@container st (max-width:820px){.fo-top{grid-template-columns:1fr}}
@container st (max-width:520px){.fo-cols{grid-template-columns:1fr 1fr}.fo-copy{margin-right:0;flex-basis:100%}}`,
};
