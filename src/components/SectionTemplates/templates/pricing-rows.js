import { BILLING_HTML, BILLING_CSS, billingFields } from './behaviors.js';

export default {
  id: 'pricing-rows',
  name: 'Pricing List Rows',
  version: '1.0.0',
  category: 'pricing',
  tags: ['pricing', 'list', 'rows', 'packages', 'agency', 'services', 'billing-toggle', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Pricing List Section — Free Horizontal Plan Rows Template',
  seoDescription: 'Free pricing list section: plans as horizontal rows with highlight chips, price and button, a featured row and a monthly/yearly switch. Export HTML or React.',
  description: 'Plans and packages as horizontal rows instead of cards: each row shows the plan name and description, a few highlight chips, the price and a button, with one featured row picked out by a badge. A left-aligned heading sits beside the monthly/yearly switch. Rows stack neatly on phones.',
  bestFor: ['Agency and freelance service packages', 'Products with many tiers or add-ons', 'Usage-based plans that need room for detail'],
  behaviors: ['billing'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'billing', label: 'Monthly / yearly switch', toggle: 'showBilling' },
    { id: 'items', label: 'Plan rows' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Packages' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Choose the package that *fits your launch*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Every package includes strategy, design and development by the same small senior team.' },
    ...billingFields(),
  ],
  lists: [{
    key: 'plans', group: 'items', label: 'Plan rows', itemLabel: 'Row', titleKey: 'name', min: 1, max: 6,
    fields: [
      { key: 'badge', label: 'Highlight badge (optional)', type: 'text', value: '', hint: 'Any text here (e.g. "Best value") highlights this row.' },
      { key: 'name', label: 'Plan name', type: 'text', value: 'New package' },
      { key: 'desc', label: 'Short description', type: 'textarea', value: 'What is included.' },
      { key: 'chips', label: 'Highlights (shown as chips)', type: 'lines', value: 'First highlight\nSecond highlight' },
      { key: 'monthly', label: 'Monthly price', type: 'text', value: '$990' },
      { key: 'yearly', label: 'Yearly price (per month)', type: 'text', value: '$790' },
      { key: 'priceNote', label: 'Price note (optional)', type: 'text', value: '', hint: 'Replaces the /month suffix, e.g. "one-off" or "per project".' },
      { key: 'cta', label: 'Button text', type: 'text', value: 'Choose' },
      { key: 'ctaUrl', label: 'Button link', type: 'url', value: 'https://yoursite.com/contact' },
    ],
    value: [
      { name: 'Launch', desc: 'A focused landing page to validate your idea.', chips: 'One-page site\nCopywriting\n2 revision rounds', monthly: '$1,900', yearly: '$1,900', priceNote: 'one-off', cta: 'Book a call' },
      { badge: 'Best value', name: 'Growth', desc: 'A full marketing site with a CMS your team can edit.', chips: 'Up to 8 pages\nCMS setup\nSEO foundations\nAnalytics', monthly: '$4,800', yearly: '$4,800', priceNote: 'one-off', cta: 'Book a call' },
      { name: 'Care plan', desc: 'Ongoing updates, new pages and monthly reports.', chips: '8 hours a month\nHosting and backups\nMonthly report', monthly: '$690', yearly: '$550', cta: 'Start care plan' },
    ],
  }],
  toggles: [{ key: 'showBilling', label: 'Monthly / yearly switch', value: true }],
  theme: { brand: '#e11d48', brandText: '#ffffff', bg: '#ffffff', surface: '#fbf7f8', text: '#18181b', muted: '#52525b', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <div class="pl-top">
    <header class="st-head st-head--left pl-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead" data-anim="item" data-edit="lead"></p>
    </header>
    ${BILLING_HTML}
  </div>
  <div class="pl-rows" data-list="plans">
    <article class="pl-row" data-anim="item">
      <div class="pl-info">
        <h3 class="pl-name"><span data-edit="name"></span><span class="pl-badge" data-show-if="badge" data-edit="badge"></span></h3>
        <p class="pl-desc" data-edit="desc"></p>
      </div>
      <ul class="pl-chips" data-show-if="chips" data-lines="chips"></ul>
      <p class="pl-price">
        <span class="st-pm"><b class="pl-amt" data-edit="monthly"></b><span class="pl-per" data-hide-if="priceNote" data-edit="perMonth"></span><span class="pl-per" data-show-if="priceNote" data-edit="priceNote"></span></span>
        <span class="st-py"><b class="pl-amt" data-edit="yearly"></b><span class="pl-per" data-hide-if="priceNote" data-edit="perYear"></span><span class="pl-per" data-show-if="priceNote" data-edit="priceNote"></span></span>
      </p>
      <a class="st-btn" data-href="ctaUrl"><span data-edit="cta"></span></a>
    </article>
  </div>
</div>`,
  css: `.st-pricing-rows{padding:clamp(64px,8cqi,112px) 0}
${BILLING_CSS}
.pl-top{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:24px;margin-bottom:clamp(32px,4cqi,52px)}
.pl-head{margin:0;max-width:40em}
.pl-rows{display:flex;flex-direction:column;gap:14px}
.pl-row{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1.5fr) 130px 168px;align-items:center;gap:clamp(16px,2.4cqi,32px);padding:clamp(20px,2.4cqi,28px) clamp(20px,2.6cqi,32px);border-radius:calc(var(--st-radius) * 1.1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent);transition:border-color .2s ease,transform .2s ease}
.pl-row:hover{border-color:color-mix(in srgb,var(--st-brand) 40%,transparent)}
.pl-row:has(.pl-badge){background:var(--st-bg);border:2px solid var(--st-brand);box-shadow:0 24px 50px -30px color-mix(in srgb,var(--st-brand) 60%,transparent)}
.pl-name{display:flex;align-items:center;flex-wrap:wrap;gap:10px;font-size:20px}
.pl-badge{padding:4px 10px;border-radius:999px;background:var(--st-brand);color:var(--st-btn-text);font:800 11.5px/1.2 var(--st-font-body);letter-spacing:.03em}
.pl-desc{color:var(--st-muted);font-size:15px;margin-top:4px}
.pl-chips{list-style:none;display:flex;flex-wrap:wrap;gap:8px}
.pl-chips li{padding:6px 12px;border-radius:999px;background:color-mix(in srgb,var(--st-brand) 9%,transparent);color:color-mix(in srgb,var(--st-brand) 70%,var(--st-text));font-size:13.5px;font-weight:600}
.pl-price{text-align:right}
.pl-price .st-pm,.pl-price .st-py{justify-content:flex-end;flex-direction:column;align-items:flex-end;gap:2px}
.pl-amt{font:800 30px/1.1 var(--st-font-heading);letter-spacing:-.02em}
.pl-per{color:var(--st-muted);font-size:13.5px}
.pl-row .st-btn{width:100%;padding:0 16px}
.pl-row:not(:has(.pl-badge)) .st-btn{background:transparent;color:var(--st-text);border-color:color-mix(in srgb,var(--st-text) 22%,transparent)}
.pl-row:not(:has(.pl-badge)) .st-btn:hover{box-shadow:none;border-color:var(--st-text)}
@container st (max-width:980px){.pl-row{grid-template-columns:1fr auto}.pl-chips{grid-column:1/-1;order:3}.pl-price{grid-column:2;grid-row:1}.pl-row .st-btn{grid-column:1/-1;order:4}}
@container st (max-width:560px){.pl-row{grid-template-columns:1fr}.pl-price{grid-column:auto;grid-row:auto;text-align:left}.pl-price .st-pm,.pl-price .st-py{align-items:flex-start}}`,
};
