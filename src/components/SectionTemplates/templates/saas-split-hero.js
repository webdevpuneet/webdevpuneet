import { IMG } from './meta.js';

export default {
  id: 'saas-split-hero',
  name: 'SaaS Split Hero',
  version: '1.0.0',
  category: 'hero',
  tags: ['hero', 'saas', 'split', 'screenshot', 'startup', 'landing-page', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'SaaS Hero Section Template — Free HTML & CSS Split Hero',
  seoDescription: 'Free SaaS hero section: announcement badge, headline, two buttons, social proof and a framed product screenshot. Edit it online, then export HTML, React or Vue.',
  description: 'A two-column SaaS landing page hero: an announcement badge linking to news, a bold headline with a highlighted phrase, supporting text, primary and secondary buttons, a social-proof line and a product screenshot in a glowing frame. It stacks on narrow screens.',
  bestFor: ['SaaS and startup landing pages', 'Product launch and waitlist pages', 'Software homepages with a dashboard screenshot'],

  groups: [
    { id: 'badge', label: 'Announcement badge', toggle: 'showBadge' },
    { id: 'main', label: 'Headline & text' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'proof', label: 'Social proof', toggle: 'showProof' },
    { id: 'media', label: 'Screenshot' },
  ],
  fields: [
    { key: 'badge', group: 'badge', label: 'Badge text', type: 'text', value: 'New: Automations are here →' },
    { key: 'badgeUrl', group: 'badge', label: 'Badge link', type: 'url', value: 'https://webdevpuneet.com/changelog' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'textarea', value: 'Plan, ship and report *without the chaos*' },
    { key: 'lead', group: 'main', label: 'Supporting text', type: 'textarea', value: 'Acme brings your roadmap, tasks and reports into one calm workspace, so your team spends less time updating tools and more time building.' },
    { key: 'cta1', group: 'buttons', label: 'Primary button', type: 'text', value: 'Start free trial' },
    { key: 'cta1Url', group: 'buttons', label: 'Primary button link', type: 'url', value: 'https://webdevpuneet.com/signup' },
    { key: 'cta2', group: 'buttons', label: 'Secondary button (optional)', type: 'text', value: 'Book a demo' },
    { key: 'cta2Url', group: 'buttons', label: 'Secondary button link', type: 'url', value: 'https://webdevpuneet.com/demo' },
    { key: 'proof', group: 'proof', label: 'Social proof', type: 'text', value: '★★★★★ Loved by 2,000+ teams · No credit card required' },
    { key: 'image', group: 'media', label: 'Screenshot', type: 'image', value: IMG('hero-dashboard.png'), hint: 'A product screenshot works best (about 1200×820 px). Upload one or paste a URL.', upload: { name: 'screenshot', maxW: 1600, mime: 'image/png' } },
    { key: 'imageAlt', group: 'media', label: 'Screenshot alt text', type: 'text', value: 'Acme dashboard showing project progress charts' },
  ],
  toggles: [
    { key: 'showBadge', label: 'Announcement badge', value: true },
    { key: 'showProof', label: 'Social proof', value: true },
  ],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#eef0fb', text: '#0f172a', muted: '#475569', radius: '12' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="sh st-wrap">
  <div class="sh-copy">
    <a class="st-pill sh-badge" data-anim="item" data-href="badgeUrl" data-show="showBadge"><span data-edit="badge"></span></a>
    <h1 class="sh-title" data-anim="item" data-anim-text data-edit="headline"></h1>
    <p class="st-lead sh-lead" data-anim="item" data-edit="lead"></p>
    <div class="st-btns" data-anim="item">
      <a class="st-btn" data-href="cta1Url"><span data-edit="cta1"></span></a>
      <a class="st-btn st-btn--ghost" data-href="cta2Url" data-show-if="cta2"><span data-edit="cta2"></span></a>
    </div>
    <p class="sh-proof" data-anim="item" data-show="showProof" data-edit="proof"></p>
  </div>
  <div class="sh-media" data-anim="media">
    <div class="sh-frame"><img data-image="image" alt="" width="1200" height="820"></div>
  </div>
</div>`,
  css: `.st-saas-split-hero{padding:clamp(56px,8cqi,112px) 0}
.sh{display:grid;grid-template-columns:1fr 1.1fr;align-items:center;gap:clamp(32px,5cqi,72px)}
.sh-copy{display:flex;flex-direction:column;align-items:flex-start;gap:22px}
.sh-badge{text-decoration:none}
.sh-title{font-size:clamp(38px,4.6cqi + 12px,64px)}
.sh-lead{max-width:34em}
.sh-proof{font-size:14.5px;color:var(--st-muted)}
.sh-media{position:relative}
.sh-media::before{content:"";position:absolute;inset:8% -6% -8% 8%;background:radial-gradient(closest-side,color-mix(in srgb,var(--st-brand) 35%,transparent),transparent);filter:blur(30px)}
.sh-frame{position:relative;padding:10px;border-radius:calc(var(--st-radius) * 1.6px);background:color-mix(in srgb,var(--st-surface) 80%,var(--st-bg));border:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);box-shadow:0 30px 80px -30px color-mix(in srgb,var(--st-text) 35%,transparent)}
.sh-frame img{width:100%;border-radius:calc(var(--st-radius) * 1px)}
@container st (max-width:820px){.sh{grid-template-columns:1fr}.sh-copy{align-items:center;text-align:center}.sh-copy .st-btns{justify-content:center}}`,
};
