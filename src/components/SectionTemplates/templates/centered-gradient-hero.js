import { IMG } from './meta.js';

export default {
  id: 'centered-gradient-hero',
  name: 'Centred Gradient Hero',
  version: '1.0.0',
  category: 'hero',
  tags: ['hero', 'centered', 'gradient', 'dark', 'saas', 'landing-page', 'screenshot'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Centered Hero Section Template — Free Gradient Hero HTML',
  seoDescription: 'Free centred hero section with a glowing gradient background, eyebrow, big headline, two buttons and a wide product image. Edit online; export HTML, React, Vue.',
  description: 'A centred, dark landing page hero with soft glowing gradients drawn in CSS: a small eyebrow, a large headline, supporting text, two buttons, a reassurance note and an optional wide product screenshot that rises from the bottom of the section.',
  bestFor: ['Product launches and SaaS homepages', 'AI and developer tool landing pages', 'Dark-themed, high-impact first screens'],

  groups: [
    { id: 'main', label: 'Headline & text' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'media', label: 'Product image', toggle: 'showImage' },
  ],
  fields: [
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'Now in public beta' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'textarea', value: 'The fastest way to *turn ideas into products*' },
    { key: 'lead', group: 'main', label: 'Supporting text', type: 'textarea', value: 'Design, build and launch in one place. Acme handles the boring parts so your team can focus on the work that matters.' },
    { key: 'cta1', group: 'buttons', label: 'Primary button', type: 'text', value: 'Get started free' },
    { key: 'cta1Url', group: 'buttons', label: 'Primary button link', type: 'url', value: 'https://yoursite.com/signup' },
    { key: 'cta2', group: 'buttons', label: 'Secondary button (optional)', type: 'text', value: 'See how it works' },
    { key: 'cta2Url', group: 'buttons', label: 'Secondary button link', type: 'url', value: 'https://yoursite.com/tour' },
    { key: 'note', group: 'buttons', label: 'Note under buttons (optional)', type: 'text', value: 'Free forever for small teams · Set up in 2 minutes' },
    { key: 'image', group: 'media', label: 'Product image', type: 'image', value: IMG('hero-dashboard.png'), hint: 'A wide screenshot works best (about 1200×820 px).', upload: { name: 'screenshot', maxW: 1800, mime: 'image/png' } },
    { key: 'imageAlt', group: 'media', label: 'Image alt text', type: 'text', value: 'Acme app dashboard' },
  ],
  toggles: [{ key: 'showImage', label: 'Product image', value: true }],
  theme: { brand: '#818cf8', brandText: '#0b1020', bg: '#0b1020', surface: '#161c33', text: '#f1f5f9', muted: '#a5b0c8', radius: '12' },
  fonts: { heading: 'space', body: 'inter' },

  html: `<div class="cg-glow" aria-hidden="true"></div>
<div class="cg st-wrap">
  <span class="st-eyebrow cg-eyebrow" data-anim="item" data-edit="eyebrow"></span>
  <h1 class="cg-title" data-anim="item" data-anim-text data-edit="headline"></h1>
  <p class="st-lead cg-lead" data-anim="item" data-edit="lead"></p>
  <div class="st-btns cg-btns" data-anim="item">
    <a class="st-btn" data-href="cta1Url"><span data-edit="cta1"></span></a>
    <a class="st-btn st-btn--ghost" data-href="cta2Url" data-show-if="cta2"><span data-edit="cta2"></span></a>
  </div>
  <p class="cg-note" data-anim="item" data-edit="note"></p>
  <div class="cg-media" data-anim="media" data-show="showImage"><img data-image="image" alt="" width="1200" height="820"></div>
</div>`,
  css: `.st-centered-gradient-hero{padding:clamp(64px,9cqi,128px) 0 0}
.cg-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(60% 50% at 50% 0%,color-mix(in srgb,var(--st-brand) 45%,transparent),transparent 70%),radial-gradient(40% 40% at 15% 30%,color-mix(in srgb,#ec4899 30%,transparent),transparent 70%),radial-gradient(40% 40% at 85% 35%,color-mix(in srgb,#22d3ee 25%,transparent),transparent 70%)}
.cg{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;gap:22px}
.cg-eyebrow{padding:6px 14px;border:1px solid color-mix(in srgb,var(--st-brand) 45%,transparent);border-radius:999px;background:color-mix(in srgb,var(--st-brand) 12%,transparent)}
.cg-title{max-width:15em;font-size:clamp(40px,5.4cqi + 10px,76px)}
.cg-lead{max-width:36em}
.cg-btns{justify-content:center}
.cg-note{font-size:14px;color:var(--st-muted)}
.cg-media{width:100%;max-width:1040px;margin-top:clamp(24px,4cqi,48px);padding:10px 10px 0;border-radius:calc(var(--st-radius) * 1.6px) calc(var(--st-radius) * 1.6px) 0 0;background:color-mix(in srgb,var(--st-surface) 85%,transparent);border:1px solid color-mix(in srgb,var(--st-text) 14%,transparent);border-bottom:0;box-shadow:0 -20px 80px -20px color-mix(in srgb,var(--st-brand) 45%,transparent)}
.cg-media img{width:100%;border-radius:calc(var(--st-radius) * 1px) calc(var(--st-radius) * 1px) 0 0}
.st-centered-gradient-hero:not(:has(.cg-media)) .cg{padding-bottom:clamp(64px,9cqi,128px)}`,
};
