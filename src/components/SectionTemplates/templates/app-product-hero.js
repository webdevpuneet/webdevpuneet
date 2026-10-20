import { IMG } from './meta.js';

export default {
  id: 'app-product-hero',
  name: 'App Product Hero',
  version: '1.0.0',
  category: 'hero',
  tags: ['hero', 'mobile-app', 'app-store', 'phone-mockup', 'fintech', 'startup', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Mobile App Hero Section Template — Free App Landing Hero',
  seoDescription: 'Free mobile app hero section template with App Store and Google Play buttons, rating, phone mockup and floating cards. Edit online, export HTML, React or Vue.',
  description: 'A mobile app landing hero: a headline and supporting text, App Store and Google Play download buttons, a star rating line, and a phone screenshot with two floating highlight cards, on a soft gradient background.',
  bestFor: ['Mobile app landing pages', 'Fintech, health and productivity apps', 'App launch and pre-registration pages'],

  groups: [
    { id: 'main', label: 'Headline & text' },
    { id: 'stores', label: 'Download buttons' },
    { id: 'rating', label: 'Rating line', toggle: 'showRating' },
    { id: 'media', label: 'Phone screenshot' },
    { id: 'cards', label: 'Floating cards', toggle: 'showCards' },
  ],
  fields: [
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'iPhone & Android' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'textarea', value: 'Your money, *finally organised*' },
    { key: 'lead', group: 'main', label: 'Supporting text', type: 'textarea', value: 'Track spending, split bills and grow your savings automatically. Acme Wallet turns money admin into a two-minute habit.' },
    { key: 'iosLabel', group: 'stores', label: 'App Store button text', type: 'text', value: 'Download on the App Store' },
    { key: 'iosUrl', group: 'stores', label: 'App Store link', type: 'url', value: 'https://apps.apple.com/app/id000000000' },
    { key: 'androidLabel', group: 'stores', label: 'Google Play button text', type: 'text', value: 'Get it on Google Play' },
    { key: 'androidUrl', group: 'stores', label: 'Google Play link', type: 'url', value: 'https://play.google.com/store/apps/details?id=com.yourapp' },
    { key: 'rating', group: 'rating', label: 'Rating text', type: 'text', value: '★★★★★ 4.8 from 12,000+ reviews' },
    { key: 'image', group: 'media', label: 'Phone screenshot', type: 'image', value: IMG('hero-phone.png'), hint: 'A phone screenshot or mockup with a transparent background works best (about 720×1440 px).', upload: { name: 'phone', maxW: 900, mime: 'image/png' } },
    { key: 'imageAlt', group: 'media', label: 'Screenshot alt text', type: 'text', value: 'Acme Wallet app home screen' },
    { key: 'card1Title', group: 'cards', label: 'Card 1 title', type: 'text', value: '+$420 saved' },
    { key: 'card1Text', group: 'cards', label: 'Card 1 text', type: 'text', value: 'this month' },
    { key: 'card2Title', group: 'cards', label: 'Card 2 title', type: 'text', value: 'Bills split' },
    { key: 'card2Text', group: 'cards', label: 'Card 2 text', type: 'text', value: 'in 3 taps' },
  ],
  toggles: [
    { key: 'showRating', label: 'Rating line', value: true },
    { key: 'showCards', label: 'Floating cards', value: true },
  ],
  theme: { brand: '#7c3aed', brandText: '#ffffff', bg: '#faf8ff', surface: '#ede9fe', text: '#1e1033', muted: '#5b5370', radius: '14' },
  fonts: { heading: 'poppins', body: 'inter' },

  html: `<div class="ap st-wrap">
  <div class="ap-copy">
    <span class="st-eyebrow" data-anim="item" data-edit="eyebrow"></span>
    <h1 class="ap-title" data-anim="item" data-edit="headline"></h1>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
    <div class="ap-stores" data-anim="item">
      <a class="ap-store" data-href="iosUrl"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2 1-4 2.5-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-4M14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4"/></svg><span data-edit="iosLabel"></span></a>
      <a class="ap-store" data-href="androidUrl"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M3.6 2.3 13.4 12l-9.8 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1m11 10.9 2.4 2.4-11.2 6.4 8.8-8.8m3.5-3.5 2.7 1.5c.8.5.8 1.2 0 1.7l-2.8 1.6-2.6-2.5 2.7-2.3M5.8 2l11.2 6.4-2.4 2.4L5.8 2Z"/></svg><span data-edit="androidLabel"></span></a>
    </div>
    <p class="ap-rating" data-anim="item" data-show="showRating" data-edit="rating"></p>
  </div>
  <div class="ap-media" data-anim="media">
    <div class="ap-blob" aria-hidden="true"></div>
    <img class="ap-phone" data-image="image" alt="" width="720" height="1440">
    <div class="ap-card ap-card1" data-show="showCards"><strong data-edit="card1Title"></strong><span data-edit="card1Text"></span></div>
    <div class="ap-card ap-card2" data-show="showCards"><strong data-edit="card2Title"></strong><span data-edit="card2Text"></span></div>
  </div>
</div>`,
  css: `.st-app-product-hero{padding:clamp(56px,7cqi,104px) 0;background:radial-gradient(70% 80% at 85% 40%,color-mix(in srgb,var(--st-brand) 14%,transparent),transparent 70%),var(--st-bg)}
.ap{display:grid;grid-template-columns:1.1fr .9fr;align-items:center;gap:clamp(32px,5cqi,72px)}
.ap-copy{display:flex;flex-direction:column;align-items:flex-start;gap:20px}
.ap-title{font-size:clamp(38px,4.8cqi + 10px,68px)}
.ap-stores{display:flex;flex-wrap:wrap;gap:12px;margin-top:6px}
.ap-store{display:inline-flex;align-items:center;gap:10px;min-height:54px;padding:0 20px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-text);color:var(--st-bg);font-weight:700;font-size:15px;text-decoration:none;transition:transform .15s ease}
.ap-store:hover{transform:translateY(-1px)}
.ap-store:focus-visible{outline:3px solid var(--st-brand);outline-offset:3px}
.ap-rating{font-size:14.5px;color:var(--st-muted)}
.ap-media{position:relative;display:flex;justify-content:center}
.ap-blob{position:absolute;width:78%;aspect-ratio:1;top:12%;border-radius:42% 58% 55% 45%/48% 42% 58% 52%;background:linear-gradient(135deg,var(--st-brand),color-mix(in srgb,var(--st-brand) 40%,#ec4899));opacity:.9}
.ap-phone{position:relative;width:min(300px,62cqi);filter:drop-shadow(0 30px 40px color-mix(in srgb,var(--st-text) 30%,transparent))}
.ap-card{position:absolute;display:flex;flex-direction:column;padding:12px 16px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-bg);box-shadow:0 18px 40px -12px color-mix(in srgb,var(--st-text) 30%,transparent);font-size:13px;color:var(--st-muted)}
.ap-card strong{font-family:var(--st-font-heading);font-size:18px;color:var(--st-text)}
.ap-card1{left:2%;top:26%}
.ap-card2{right:0;bottom:18%}
@container st (max-width:820px){.ap{grid-template-columns:1fr}.ap-copy{align-items:center;text-align:center}.ap-stores{justify-content:center}.ap-card1{left:4%}.ap-card2{right:4%}}`,
};
