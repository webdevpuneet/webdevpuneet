import { IMG } from './meta.js';

export default {
  id: 'cta-split-image',
  name: 'Split CTA With Image',
  version: '1.0.0',
  category: 'cta',
  tags: ['cta', 'call-to-action', 'app', 'download', 'split', 'image', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'CTA Section With Image — Free App Download Call to Action',
  seoDescription: 'Free split CTA section: a dark card with heading, checklist and buttons beside a phone or product image rising from the edge. Animated; export HTML or React.',
  description: 'A dark call-to-action card split in two: on the left an eyebrow, heading, short checklist and two buttons; on the right a product image (a phone screen by default) rising from the bottom edge of the card. Great for app downloads and product sign-ups.',
  bestFor: ['Mobile app download prompts', 'Product sign-up at the end of a page', 'Promoting a new feature or release'],
  behaviors: ['magnetic'],

  groups: [
    { id: 'main', label: 'Heading & text' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'media', label: 'Image' },
  ],
  fields: [
    { key: 'eyebrow', group: 'main', label: 'Eyebrow (optional)', type: 'text', value: 'Get the app' },
    { key: 'heading', group: 'main', label: 'Heading', type: 'textarea', value: 'Your budget, *in your pocket*' },
    { key: 'points', group: 'main', label: 'Checklist (optional)', type: 'lines', value: 'Smart spending insights every week\nBank-level security and Face ID\nFree on iPhone and Android' },
    { key: 'cta1', group: 'buttons', label: 'Primary button', type: 'text', value: 'Download for iPhone' },
    { key: 'cta1Url', group: 'buttons', label: 'Primary button link', type: 'url', value: 'https://apps.apple.com/' },
    { key: 'cta2', group: 'buttons', label: 'Secondary button (optional)', type: 'text', value: 'Get it on Android' },
    { key: 'cta2Url', group: 'buttons', label: 'Secondary button link', type: 'url', value: 'https://play.google.com/' },
    { key: 'image', group: 'media', label: 'Image', type: 'image', value: IMG('hero-phone.png'), hint: 'A phone screen or product shot with a transparent background works best.', upload: { name: 'cta', maxW: 900, mime: 'image/png' } },
    { key: 'imageAlt', group: 'media', label: 'Image alt text', type: 'text', value: 'The app’s spending dashboard on a phone' },
  ],
  toggles: [],
  theme: { brand: '#a3e635', brandText: '#0b1a05', bg: '#ffffff', surface: '#10151f', text: '#0f172a', muted: '#475569', radius: '24' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <div class="cs">
    <div class="cs-copy">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2 cs-title" data-anim="item" data-anim-text data-edit="heading"></h2>
      <ul class="st-checks cs-list" data-anim="item" data-show-if="points" data-lines="points"></ul>
      <div class="st-btns" data-anim="item">
        <a class="st-btn" data-magnetic data-href="cta1Url"><span data-edit="cta1"></span></a>
        <a class="st-btn st-btn--ghost" data-magnetic data-href="cta2Url" data-show-if="cta2"><span data-edit="cta2"></span></a>
      </div>
    </div>
    <div class="cs-media" data-anim="media"><img data-image="image" alt="" width="720" height="1440" loading="lazy"></div>
  </div>
</div>`,
  css: `.st-cta-split-image{padding:clamp(48px,7cqi,96px) 0}
.cs{position:relative;overflow:hidden;display:grid;grid-template-columns:1.15fr .85fr;align-items:center;gap:clamp(24px,4cqi,56px);padding:clamp(36px,5cqi,72px) clamp(28px,5cqi,72px) 0;border-radius:calc(var(--st-radius) * 1px);background:radial-gradient(600px circle at 85% 20%,color-mix(in srgb,var(--st-brand) 22%,transparent),transparent 60%),var(--st-surface);color:#f1f5f9}
.cs-copy{display:flex;flex-direction:column;align-items:flex-start;gap:20px;padding-bottom:clamp(36px,5cqi,72px)}
.cs .cs-title{color:#fff;font-size:clamp(30px,3cqi + 14px,50px)}
.cs-list li{color:#cbd5e1}
.cs .st-btn--ghost{color:#fff;border-color:rgba(255,255,255,.3)}
.cs .st-btn--ghost:hover{border-color:#fff}
.cs-media{align-self:end;display:flex;justify-content:center}
.cs-media img{width:min(320px,100%);margin-bottom:-18%;filter:drop-shadow(0 30px 50px rgba(0,0,0,.45))}
@container st (max-width:760px){.cs{grid-template-columns:1fr}.cs-media img{width:min(260px,70%)}}`,
};
