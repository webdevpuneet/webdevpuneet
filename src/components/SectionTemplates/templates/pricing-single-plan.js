import { BILLING_HTML, BILLING_CSS, billingFields } from './behaviors.js';

export default {
  id: 'pricing-single-plan',
  name: 'Single Plan Pricing',
  version: '1.0.0',
  category: 'pricing',
  tags: ['pricing', 'single-plan', 'one-price', 'guarantee', 'indie', 'course', 'billing-toggle', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Single Plan Pricing Section — Free One-Price Template HTML',
  seoDescription: 'Free single-plan pricing section: an everything-included checklist beside one price card with a billing switch, button and guarantee. Export HTML or React.',
  description: 'Pricing for products with one plan: on the left a heading, intro and a two-column "everything included" checklist; on the right a price card with the plan name, a monthly/yearly switch, the price, a button and a money-back guarantee line. Simple pricing, presented with confidence.',
  bestFor: ['Indie products and tools with one plan', 'Online courses, memberships and communities', 'Lifetime-deal and one-price launches'],
  behaviors: ['billing'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'included', label: 'What’s included' },
    { id: 'card', label: 'Price card' },
    { id: 'billing', label: 'Monthly / yearly switch', toggle: 'showBilling' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'One simple plan' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Everything you need, *one fair price*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'No tiers to compare and no features held back. Get the whole product, every update and real support.' },
    { key: 'includedTitle', group: 'included', label: 'List title (optional)', type: 'text', value: 'Everything included' },
    { key: 'included', group: 'included', label: 'Included items', type: 'lines', value: 'Unlimited projects\nAll templates and themes\nCustom domain\nAnalytics dashboard\nTeam sharing\nExport to HTML and PDF\nPriority email support\nAll future updates' },
    { key: 'plan', group: 'card', label: 'Plan name', type: 'text', value: 'Pro' },
    { key: 'planNote', group: 'card', label: 'Line under the plan name (optional)', type: 'text', value: 'For individuals and small teams' },
    { key: 'monthly', group: 'card', label: 'Monthly price', type: 'text', value: '$12' },
    { key: 'yearly', group: 'card', label: 'Yearly price (per month)', type: 'text', value: '$9' },
    { key: 'cta', group: 'card', label: 'Button text', type: 'text', value: 'Get instant access' },
    { key: 'ctaUrl', group: 'card', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/checkout' },
    { key: 'guarantee', group: 'card', label: 'Guarantee line (optional)', type: 'text', value: '30-day money-back guarantee. Cancel any time.' },
    ...billingFields(),
  ],
  toggles: [{ key: 'showBilling', label: 'Monthly / yearly switch', value: true }],
  theme: { brand: '#0d9488', brandText: '#ffffff', bg: '#f6fbfa', surface: '#ffffff', text: '#0f172a', muted: '#475569', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap ps">
  <div class="ps-copy">
    <header class="st-head st-head--left ps-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead" data-anim="item" data-edit="lead"></p>
    </header>
    <div class="ps-included" data-anim="item" data-show-if="included">
      <h3 class="ps-inc-title" data-edit="includedTitle"></h3>
      <ul class="st-checks ps-list" data-lines="included"></ul>
    </div>
  </div>
  <div class="ps-card" data-anim="media">
    <h3 class="ps-plan" data-edit="plan"></h3>
    <p class="ps-plan-note" data-edit="planNote"></p>
    ${BILLING_HTML}
    <p class="ps-price">
      <span class="st-pm"><b class="ps-amt" data-edit="monthly"></b><span class="ps-per" data-edit="perMonth"></span></span>
      <span class="st-py"><b class="ps-amt" data-edit="yearly"></b><span class="ps-per" data-edit="perYear"></span></span>
    </p>
    <a class="st-btn" data-href="ctaUrl"><span data-edit="cta"></span></a>
    <p class="ps-guarantee" data-show-if="guarantee"><span class="ps-shield" aria-hidden="true"></span><span data-edit="guarantee"></span></p>
  </div>
</div>`,
  css: `.st-pricing-single-plan{padding:clamp(64px,8cqi,112px) 0}
${BILLING_CSS}
.ps{display:grid;grid-template-columns:1.2fr 1fr;align-items:center;gap:clamp(36px,5cqi,80px)}
.ps-copy{display:flex;flex-direction:column;gap:32px}
.ps-head{margin-bottom:0}
.ps-inc-title{font-size:15px;font-family:var(--st-font-body);font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--st-muted);margin-bottom:16px}
.ps-list{display:grid;grid-template-columns:1fr 1fr;gap:12px 24px}
.ps-card{position:relative;display:flex;flex-direction:column;align-items:center;gap:14px;padding:clamp(28px,3.4cqi,44px);text-align:center;border-radius:calc(var(--st-radius) * 1.3px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent);box-shadow:0 40px 80px -40px color-mix(in srgb,var(--st-brand) 45%,transparent),0 0 0 6px color-mix(in srgb,var(--st-brand) 7%,transparent)}
.ps-plan{font-size:24px}
.ps-plan-note{color:var(--st-muted);font-size:15px;margin-top:-8px}
.ps-card .st-billing{margin:6px 0}
.ps-price{min-height:72px;display:flex;align-items:center;justify-content:center}
.ps-amt{font:800 clamp(52px,4cqi + 22px,68px)/1 var(--st-font-heading);letter-spacing:-.04em}
.ps-per{color:var(--st-muted);font-size:15px}
.ps-card .st-btn{width:100%;min-height:56px;font-size:17px}
.ps-guarantee{display:flex;align-items:center;justify-content:center;gap:8px;color:var(--st-muted);font-size:14px}
.ps-shield{width:16px;height:16px;flex:none;background:var(--st-brand);-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'/%3E%3Cpath d='m9 12 2 2 4-4'/%3E%3C/svg%3E") center/contain no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'/%3E%3Cpath d='m9 12 2 2 4-4'/%3E%3C/svg%3E") center/contain no-repeat}
@container st (max-width:860px){.ps{grid-template-columns:1fr}}
@container st (max-width:520px){.ps-list{grid-template-columns:1fr}}`,
};
