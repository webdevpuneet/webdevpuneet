import { BILLING_HTML, BILLING_CSS, billingFields } from './behaviors.js';

export default {
  id: 'pricing-three-tier',
  name: 'Three-Tier Pricing',
  version: '1.0.0',
  category: 'pricing',
  tags: ['pricing', 'plans', 'billing-toggle', 'saas', 'cards', 'most-popular', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Pricing Section Template — Free 3-Tier Pricing Table HTML',
  seoDescription: 'Free pricing section with three plan cards, a "Most popular" badge, feature lists and a monthly/yearly toggle animated by GSAP Flip. Export HTML, React or Vue.',
  description: 'The classic SaaS pricing table: three plan cards side by side with the middle one highlighted as "Most popular", each with a name, short description, price, button and feature checklist. A monthly/yearly switch above the cards swaps every price, with the toggle sliding across and the new prices rolling in.',
  bestFor: ['SaaS and subscription pricing pages', 'Freemium products with Free, Pro and Team plans', 'Courses, memberships and service packages'],
  behaviors: ['billing'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'billing', label: 'Monthly / yearly switch', toggle: 'showBilling' },
    { id: 'items', label: 'Plans' },
    { id: 'footer', label: 'Note under the plans' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Pricing' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Simple pricing that *grows with you*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Start free, upgrade when your team is ready. Every plan includes unlimited projects and our core features.' },
    ...billingFields(),
    { key: 'note', group: 'footer', label: 'Note (optional)', type: 'text', value: 'All paid plans include a 14-day free trial. Prices in USD, taxes may apply.' },
  ],
  lists: [{
    key: 'plans', group: 'items', label: 'Plans', itemLabel: 'Plan', titleKey: 'name', min: 1, max: 4,
    fields: [
      { key: 'badge', label: 'Highlight badge (optional)', type: 'text', value: '', hint: 'Any text here (e.g. "Most popular") highlights this plan.' },
      { key: 'name', label: 'Plan name', type: 'text', value: 'New plan' },
      { key: 'desc', label: 'Short description', type: 'textarea', value: 'Who this plan is for.' },
      { key: 'monthly', label: 'Monthly price', type: 'text', value: '$19' },
      { key: 'yearly', label: 'Yearly price (per month)', type: 'text', value: '$15' },
      { key: 'priceNote', label: 'Price note (optional)', type: 'text', value: '', hint: 'Replaces the /month suffix, e.g. "free forever" or "tailored to your team".' },
      { key: 'cta', label: 'Button text', type: 'text', value: 'Get started' },
      { key: 'ctaUrl', label: 'Button link', type: 'url', value: 'https://yoursite.com/signup' },
      { key: 'features', label: 'Features', type: 'lines', value: 'First feature\nSecond feature\nThird feature' },
    ],
    value: [
      { name: 'Starter', desc: 'For individuals and small side projects.', monthly: '$0', yearly: '$0', priceNote: 'free forever', cta: 'Start for free', features: 'Up to 3 members\n5 active projects\nBoards and lists\nCommunity support' },
      { badge: 'Most popular', name: 'Pro', desc: 'For growing teams that ship every week.', monthly: '$24', yearly: '$19', cta: 'Start free trial', features: 'Unlimited members\nUnlimited projects\nAutomations and reports\nIntegrations with Slack and GitHub\nPriority email support' },
      { name: 'Business', desc: 'For larger teams that need control.', monthly: '$49', yearly: '$39', cta: 'Contact sales', ctaUrl: 'https://yoursite.com/contact', features: 'Everything in Pro\nSSO and SCIM\nAdvanced permissions\nAudit log\nDedicated success manager' },
    ],
  }],
  toggles: [{ key: 'showBilling', label: 'Monthly / yearly switch', value: true }],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f6f7fb', text: '#0f172a', muted: '#475569', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
    ${BILLING_HTML}
  </header>
  <div class="p3-grid" data-list="plans">
    <article class="p3-card" data-anim="item">
      <span class="p3-badge" data-show-if="badge" data-edit="badge"></span>
      <h3 class="p3-name" data-edit="name"></h3>
      <p class="p3-desc" data-edit="desc"></p>
      <p class="p3-price">
        <span class="st-pm"><b class="p3-amt" data-edit="monthly"></b><span class="p3-per" data-hide-if="priceNote" data-edit="perMonth"></span><span class="p3-per" data-show-if="priceNote" data-edit="priceNote"></span></span>
        <span class="st-py"><b class="p3-amt" data-edit="yearly"></b><span class="p3-per" data-hide-if="priceNote" data-edit="perYear"></span><span class="p3-per" data-show-if="priceNote" data-edit="priceNote"></span></span>
      </p>
      <a class="st-btn p3-btn" data-href="ctaUrl"><span data-edit="cta"></span></a>
      <ul class="st-checks p3-list" data-show-if="features" data-lines="features"></ul>
    </article>
  </div>
  <p class="p3-note" data-anim="item" data-edit="note"></p>
</div>`,
  css: `.st-pricing-three-tier{padding:clamp(64px,8cqi,112px) 0}
.st-pricing-three-tier .st-billing{margin-top:10px}
${BILLING_CSS}
.p3-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:clamp(16px,2cqi,24px);align-items:stretch}
.p3-card{position:relative;display:flex;flex-direction:column;gap:14px;padding:clamp(26px,2.6cqi,34px);border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.p3-card:has(.p3-badge){background:var(--st-bg);border:2px solid var(--st-brand);box-shadow:0 30px 60px -30px color-mix(in srgb,var(--st-brand) 55%,transparent)}
.p3-badge{position:absolute;top:0;left:50%;transform:translate(-50%,-50%);padding:6px 14px;border-radius:999px;background:var(--st-brand);color:var(--st-btn-text);font-size:12.5px;font-weight:800;letter-spacing:.02em;white-space:nowrap}
.p3-name{font-size:21px;letter-spacing:-.01em}
.p3-desc{color:var(--st-muted);font-size:15.5px;min-height:3.2em}
.p3-price{min-height:64px;display:flex;align-items:flex-end;margin:6px 0 4px}
.p3-amt{font:800 clamp(40px,3cqi + 18px,52px)/1 var(--st-font-heading);letter-spacing:-.03em}
.p3-per{color:var(--st-muted);font-size:14.5px}
.p3-card .st-btn{width:100%}
.p3-card:not(:has(.p3-badge)) .st-btn{background:transparent;color:var(--st-text);border-color:color-mix(in srgb,var(--st-text) 22%,transparent)}
.p3-card:not(:has(.p3-badge)) .st-btn:hover{box-shadow:none;border-color:var(--st-text)}
.p3-list{margin-top:10px;padding-top:20px;border-top:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
.p3-note{margin-top:clamp(28px,3cqi,40px);text-align:center;color:var(--st-muted);font-size:14.5px}
@container st (max-width:640px){.p3-grid{grid-template-columns:1fr}.p3-card:has(.p3-badge){margin-top:8px}}`,
};
