import { ACC_ITEM_HTML, ACC_CSS, faqFields, faqSchema } from './parts.js';

export default {
  id: 'faq-accordion',
  name: 'FAQ Accordion',
  version: '1.0.0',
  category: 'faq',
  tags: ['faq', 'accordion', 'questions', 'details-summary', 'schema', 'saas', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'FAQ Section Template — Free Animated Accordion HTML & CSS',
  seoDescription: 'Free FAQ accordion section: questions open smoothly with GSAP, one at a time, built on native details/summary with FAQPage schema. Export HTML, React or Vue.',
  description: 'A centred FAQ section: heading and intro, then a single column of questions that expand smoothly to show their answers, one at a time, with a rotating plus/minus icon. A contact line underneath catches anyone whose question isn’t answered.',
  bestFor: ['SaaS and product landing pages', 'Pricing pages that need to handle objections', 'Support and help-centre pages'],
  behaviors: ['accordion'],
  schema: faqSchema('faqs'),

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Questions' },
    { id: 'contact', label: 'Contact line', toggle: 'showContact' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'FAQ' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Questions? *We’ve got answers*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Everything you need to know about plans, billing and getting started.' },
    { key: 'contactText', group: 'contact', label: 'Text', type: 'text', value: 'Still have a question?' },
    { key: 'contactLink', group: 'contact', label: 'Link text', type: 'text', value: 'Talk to our team' },
    { key: 'contactUrl', group: 'contact', label: 'Link', type: 'url', value: 'mailto:hello@webdevpuneet.com' },
  ],
  lists: [{
    key: 'faqs', group: 'items', label: 'Questions', itemLabel: 'Question', titleKey: 'q', min: 1, max: 15,
    fields: faqFields(),
    value: [
      { q: 'Is there a free plan?', a: 'Yes. The Starter plan is free forever for up to three people, with no credit card required. Upgrade any time when your team grows.' },
      { q: 'Can I change plans later?', a: 'Of course. Upgrade or downgrade from your billing settings at any time. Changes apply immediately and we prorate the difference.' },
      { q: 'How does the free trial work?', a: 'Paid plans include a 14-day free trial with every feature unlocked. If you don’t add a payment method, your workspace simply moves to the free plan.' },
      { q: 'Can I import from another tool?', a: 'Yes. One-click importers bring in projects, tasks and comments from the most popular tools, and a CSV import covers everything else.' },
      { q: 'Is my data secure?', a: 'Your data is encrypted in transit and at rest, backed up daily and hosted in SOC 2 certified data centres. Business plans add SSO and audit logs.' },
      { q: 'Do you offer discounts for non-profits?', a: 'Yes. Registered non-profits and schools get 50% off any paid plan. Contact us with proof of status to apply.' },
    ],
  }],
  toggles: [{ key: 'showContact', label: 'Contact line', value: true }],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f6f7fb', text: '#0f172a', muted: '#475569', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="fq-list" data-accordion="single first" data-list="faqs">
    ${ACC_ITEM_HTML}
  </div>
  <p class="fq-contact" data-anim="item" data-show="showContact"><span data-edit="contactText"></span> <a data-href="contactUrl"><span data-edit="contactLink"></span> <span aria-hidden="true">→</span></a></p>
</div>`,
  css: `.st-faq-accordion{padding:clamp(64px,8cqi,112px) 0}
${ACC_CSS}
.fq-list{max-width:820px;margin:0 auto;border-top:1px solid color-mix(in srgb,var(--st-text) 11%,transparent)}
.fq-contact{max-width:820px;margin:clamp(32px,4cqi,48px) auto 0;padding:20px 24px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);text-align:center;color:var(--st-muted)}
.fq-contact a{color:var(--st-brand);font-weight:700;text-decoration:none}
.fq-contact a:hover{text-decoration:underline}`,
};
