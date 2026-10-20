import { LOGO_HTML, LOGO_CSS, logoFields, DEMO_LOGOS } from './parts.js';

export default {
  id: 'logo-cloud',
  name: 'Scrolling Logo Cloud',
  version: '1.0.0',
  category: 'stats',
  tags: ['logos', 'logo-cloud', 'trusted-by', 'marquee', 'customers', 'social-proof', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Logo Cloud Section Template — Free Scrolling Logo Strip',
  seoDescription: 'Free logo cloud section: a "trusted by" line over customer logos scrolling endlessly with faded edges and hover pause, animated with GSAP. Upload your logos.',
  description: 'A slim “Trusted by” strip: a short line of text above a row of customer logos that scrolls endlessly with soft fades at both edges and pauses on hover. Logos are grey until hovered. Upload real logos, or use the built-in icon-and-name marks until you have them.',
  bestFor: ['Directly under a hero section', 'Showing customers, partners or press', 'Integrations and “works with” lists'],
  behaviors: ['marquee'],

  groups: [
    { id: 'header', label: 'Text' },
    { id: 'items', label: 'Logos' },
  ],
  fields: [
    { key: 'heading', group: 'header', label: 'Line above the logos', type: 'text', value: 'Trusted by *2,000+ teams* at fast-growing companies' },
  ],
  lists: [{
    key: 'logos', group: 'items', label: 'Logos', itemLabel: 'Logo', titleKey: 'name', min: 3, max: 16,
    fields: logoFields(),
    value: DEMO_LOGOS,
  }],
  toggles: [],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f6f7fb', text: '#0f172a', muted: '#64748b', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <p class="lc-title" data-anim="item" data-edit="heading"></p>
</div>
<div class="lc-row" data-anim="item" role="region" aria-label="Customer logos" tabindex="0">
  <ul class="lc-track" data-marquee data-speed="45" data-list="logos">
    ${LOGO_HTML}
  </ul>
</div>`,
  css: `.st-logo-cloud{padding:clamp(40px,5cqi,64px) 0}
${LOGO_CSS}
.lc-title{text-align:center;color:var(--st-muted);font-size:15px;font-weight:600;margin-bottom:28px}
.lc-title .hl{font-weight:800}
.lc-row{overflow-x:auto;scrollbar-width:none;-webkit-mask:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.lc-row::-webkit-scrollbar{display:none}
.lc-row.is-looping{overflow:hidden}
.lc-row:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 45%,transparent);outline-offset:-3px}
.lc-track{list-style:none;display:flex;align-items:center;gap:clamp(40px,5cqi,72px);padding-right:clamp(40px,5cqi,72px);width:max-content}
.lc-row:not(.is-looping) .lc-track{padding-left:var(--st-pad)}`,
};
