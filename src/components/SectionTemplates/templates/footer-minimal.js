import { BRAND_HTML, BRAND_CSS, brandFields, SOCIAL_HTML, SOCIAL_CSS, socialFields, DEMO_SOCIALS } from './parts.js';

export default {
  id: 'footer-minimal',
  name: 'Minimal Footer',
  version: '1.0.0',
  category: 'footer',
  tags: ['footer', 'minimal', 'simple', 'one-row', 'social-icons', 'landing-page', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Minimal Footer Template — Free Simple One-Row Footer HTML',
  seoDescription: 'Free minimal footer: logo, a row of links and social icons on one line, with the copyright below, centred on phones. Clean and responsive; export HTML or React.',
  description: 'A small, tidy footer for landing pages and simple sites: logo on the left, a single row of links in the middle and social icons on the right, with a thin divider and the copyright line underneath. On phones everything stacks and centres.',
  bestFor: ['Landing pages and single-page sites', 'Personal sites and portfolios', 'Apps with only a few pages'],

  groups: [
    { id: 'brand', label: 'Logo' },
    { id: 'links', label: 'Links' },
    { id: 'social', label: 'Social links', toggle: 'showSocials' },
    { id: 'bottom', label: 'Copyright' },
  ],
  fields: [
    ...brandFields(),
    { key: 'links', group: 'links', label: 'Links', type: 'links', value: 'Features | #features\nPricing | #pricing\nFAQ | #faq\nContact | /contact/\nPrivacy | /privacy/' },
    { key: 'copyright', group: 'bottom', label: 'Copyright', type: 'text', value: '© 2026 Acme. Made with care in Lisbon.' },
  ],
  lists: [
    { key: 'socials', group: 'social', label: 'Social links', itemLabel: 'Social link', titleKey: 'label', min: 1, max: 6, fields: socialFields(), value: DEMO_SOCIALS.slice(0, 3) },
  ],
  toggles: [{ key: 'showSocials', label: 'Social links', value: true }],
  theme: { brand: '#0d9488', brandText: '#ffffff', bg: '#ffffff', surface: '#f6fbfa', text: '#0f172a', muted: '#64748b', radius: '12' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<footer class="st-wrap fm">
  <div class="fm-row" data-anim="item">
    ${BRAND_HTML}
    <nav aria-label="Footer"><ul class="fm-links" data-links="links"></ul></nav>
    <div data-show="showSocials">${SOCIAL_HTML}</div>
  </div>
  <p class="fm-copy" data-edit="copyright"></p>
</footer>`,
  css: `.st-footer-minimal{padding:36px 0 28px;border-top:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
${BRAND_CSS}
${SOCIAL_CSS}
.fm .st-brand-mark{font-size:19px}
.fm .st-brand-icon{width:30px;height:30px}
.fm-row{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px 32px;padding-bottom:24px;border-bottom:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.fm-links{list-style:none;display:flex;flex-wrap:wrap;gap:8px 26px}
.fm-links a{color:var(--st-muted);font-size:15px;font-weight:500;text-decoration:none}
.fm-links a:hover{color:var(--st-brand)}
.fm .st-social{width:36px;height:36px;background:none}
.fm .st-social:hover{background:color-mix(in srgb,var(--st-brand) 12%,transparent);color:var(--st-brand)}
.fm-copy{padding-top:20px;color:var(--st-muted);font-size:14px;text-align:center}
@container st (max-width:760px){.fm-row{flex-direction:column;text-align:center}.fm-links{justify-content:center}.fm .st-socials{justify-content:center}}`,
};
