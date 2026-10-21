import { BILLING_HTML, BILLING_CSS, billingFields } from './behaviors.js';

export default {
  id: 'pricing-dark-glow',
  name: 'Dark Glow Pricing',
  version: '1.0.0',
  category: 'pricing',
  tags: ['pricing', 'dark', 'gradient', 'glow', 'ai', 'billing-toggle', 'cards'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Dark Pricing Section Template — Free Glowing Pricing Cards',
  seoDescription: 'Free dark pricing section: glowing gradient border on the featured plan, up to four tiers and a GSAP-animated monthly/yearly switch. Export HTML, React or Vue.',
  description: 'A dark pricing section for modern AI and developer products: plan cards on a deep background, the featured plan wrapped in a glowing gradient border with a soft halo, and a monthly/yearly switch that slides between options. Holds up to four plans and reflows on smaller screens.',
  bestFor: ['AI tools and developer platforms', 'Dark-themed SaaS websites', 'Products with up to four tiers including Enterprise'],
  behaviors: ['billing'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'billing', label: 'Monthly / yearly switch', toggle: 'showBilling' },
    { id: 'items', label: 'Plans' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Plans' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Pick a plan, *start building today*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Generous free tier. Pay as you scale. Cancel any time.' },
    ...billingFields(),
  ],
  lists: [{
    key: 'plans', group: 'items', label: 'Plans', itemLabel: 'Plan', titleKey: 'name', min: 1, max: 4,
    fields: [
      { key: 'badge', label: 'Highlight badge (optional)', type: 'text', value: '', hint: 'Any text here (e.g. "Recommended") gives this plan the glowing border.' },
      { key: 'icon', label: 'Icon', type: 'icon', value: 'sparkles' },
      { key: 'name', label: 'Plan name', type: 'text', value: 'New plan' },
      { key: 'desc', label: 'Short description', type: 'textarea', value: 'Who this plan is for.' },
      { key: 'monthly', label: 'Monthly price', type: 'text', value: '$29' },
      { key: 'yearly', label: 'Yearly price (per month)', type: 'text', value: '$23' },
      { key: 'priceNote', label: 'Price note (optional)', type: 'text', value: '', hint: 'Replaces the /month suffix, e.g. "free forever" or "tailored to your team".' },
      { key: 'cta', label: 'Button text', type: 'text', value: 'Get started' },
      { key: 'ctaUrl', label: 'Button link', type: 'url', value: 'https://webdevpuneet.com/signup' },
      { key: 'features', label: 'Features', type: 'lines', value: 'First feature\nSecond feature' },
    ],
    value: [
      { icon: 'zap', name: 'Hobby', desc: 'Explore and prototype.', monthly: '$0', yearly: '$0', priceNote: 'free forever', cta: 'Start free', features: '1,000 AI credits a month\n2 projects\nCommunity support' },
      { badge: 'Recommended', icon: 'rocket', name: 'Pro', desc: 'For professionals shipping to production.', monthly: '$29', yearly: '$23', cta: 'Upgrade to Pro', features: '50,000 AI credits a month\nUnlimited projects\nCustom domains\nAPI access and webhooks\nPriority support' },
      { icon: 'building-2', name: 'Enterprise', desc: 'Security, scale and support for organisations.', monthly: 'Custom', yearly: 'Custom', priceNote: 'tailored to your team', cta: 'Talk to sales', ctaUrl: 'https://webdevpuneet.com/contact', features: 'Volume pricing\nSSO, SCIM and audit logs\nPrivate deployment options\n99.99% uptime SLA' },
    ],
  }],
  toggles: [{ key: 'showBilling', label: 'Monthly / yearly switch', value: true }],
  theme: { brand: '#8b5cf6', brandText: '#ffffff', bg: '#09090f', surface: '#13131c', text: '#f5f5fa', muted: '#9d9db3', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
    ${BILLING_HTML}
  </header>
  <div class="pd-grid" data-list="plans">
    <article class="pd-card" data-anim="item">
      <div class="pd-inner">
        <div class="pd-top"><span class="st-icon" data-icon="icon"></span><span class="pd-badge" data-show-if="badge" data-edit="badge"></span></div>
        <h3 class="pd-name" data-edit="name"></h3>
        <p class="pd-desc" data-edit="desc"></p>
        <p class="pd-price">
          <span class="st-pm"><b class="pd-amt" data-edit="monthly"></b><span class="pd-per" data-hide-if="priceNote" data-edit="perMonth"></span><span class="pd-per" data-show-if="priceNote" data-edit="priceNote"></span></span>
          <span class="st-py"><b class="pd-amt" data-edit="yearly"></b><span class="pd-per" data-hide-if="priceNote" data-edit="perYear"></span><span class="pd-per" data-show-if="priceNote" data-edit="priceNote"></span></span>
        </p>
        <a class="st-btn" data-href="ctaUrl"><span data-edit="cta"></span></a>
        <ul class="st-checks pd-list" data-show-if="features" data-lines="features"></ul>
      </div>
    </article>
  </div>
</div>`,
  css: `.st-pricing-dark-glow{padding:clamp(64px,8cqi,112px) 0}
.st-pricing-dark-glow::before{content:"";position:absolute;left:50%;top:38%;width:min(900px,90%);height:60%;transform:translateX(-50%);background:radial-gradient(closest-side,color-mix(in srgb,var(--st-brand) 30%,transparent),transparent);filter:blur(20px);pointer-events:none}
.st-pricing-dark-glow .st-billing{margin-top:10px;background:color-mix(in srgb,var(--st-text) 6%,transparent)}
${BILLING_CSS}
.pd-grid{position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:clamp(14px,1.8cqi,22px);align-items:stretch}
.pd-card{position:relative;padding:1px;border-radius:calc(var(--st-radius) * 1px + 1px);background:color-mix(in srgb,var(--st-text) 12%,transparent)}
.pd-card:has(.pd-badge){background:linear-gradient(140deg,var(--st-brand),color-mix(in srgb,var(--st-brand) 30%,#22d3ee) 50%,color-mix(in srgb,var(--st-brand) 60%,#f472b6));box-shadow:0 0 0 1px color-mix(in srgb,var(--st-brand) 30%,transparent),0 30px 80px -20px color-mix(in srgb,var(--st-brand) 60%,transparent)}
.pd-inner{height:100%;display:flex;flex-direction:column;gap:14px;padding:clamp(24px,2.6cqi,32px);border-radius:calc(var(--st-radius) * 1px);background:linear-gradient(180deg,var(--st-surface),color-mix(in srgb,var(--st-surface) 70%,var(--st-bg)))}
.pd-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.pd-card .st-icon{width:44px;height:44px;background:color-mix(in srgb,var(--st-brand) 20%,transparent)}
.pd-badge{padding:5px 12px;border-radius:999px;background:color-mix(in srgb,var(--st-brand) 22%,transparent);color:color-mix(in srgb,var(--st-brand) 45%,#fff);font-size:12px;font-weight:800;letter-spacing:.03em}
.pd-name{font-size:20px}
.pd-desc{color:var(--st-muted);font-size:15px;min-height:3.2em}
.pd-price{min-height:86px;display:flex;align-items:flex-end}
.pd-amt{font:800 clamp(38px,3cqi + 16px,48px)/1 var(--st-font-heading);letter-spacing:-.03em}
.pd-per{color:var(--st-muted);font-size:14px}
.pd-card .st-btn{width:100%;margin-top:4px}
.pd-card:not(:has(.pd-badge)) .st-btn{background:color-mix(in srgb,var(--st-text) 8%,transparent);border-color:color-mix(in srgb,var(--st-text) 14%,transparent);color:var(--st-text)}
.pd-card:not(:has(.pd-badge)) .st-btn:hover{box-shadow:none;border-color:color-mix(in srgb,var(--st-text) 40%,transparent)}
.pd-list{margin-top:8px;padding-top:18px;border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);color:color-mix(in srgb,var(--st-text) 88%,var(--st-muted))}
@container st (max-width:600px){.pd-grid{grid-template-columns:1fr}}`,
};
