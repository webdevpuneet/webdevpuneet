import { ACC_ITEM_HTML, ACC_CSS, faqFields, faqSchema } from './parts.js';

export default {
  id: 'faq-split',
  name: 'Split FAQ With Contact Card',
  version: '1.0.0',
  category: 'faq',
  tags: ['faq', 'accordion', 'split', 'sticky', 'contact', 'support', 'schema', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'FAQ Section With Contact Card — Free Two-Column Template',
  seoDescription: 'Free two-column FAQ section: a sticky heading and support contact card beside an animated accordion, with FAQPage schema in the export. Export HTML or React.',
  description: 'A two-column FAQ: on the left a heading, intro and a support card with an icon, a short message and a contact button, which stays in view while you scroll; on the right an accordion of questions that open smoothly. Several answers can be open at once.',
  bestFor: ['Help and support pages', 'Product pages with many questions', 'Service businesses that want enquiries'],
  behaviors: ['accordion'],
  schema: faqSchema('faqs'),

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'contact', label: 'Contact card', toggle: 'showCard' },
    { id: 'items', label: 'Questions' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Support' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Frequently asked *questions*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Quick answers to the questions we hear most. Can’t find yours? We reply within a few hours.' },
    { key: 'cardIcon', group: 'contact', label: 'Icon', type: 'icon', value: 'message-circle' },
    { key: 'cardTitle', group: 'contact', label: 'Title', type: 'text', value: 'Still need help?' },
    { key: 'cardText', group: 'contact', label: 'Text', type: 'textarea', value: 'Chat with a real person on our support team, Monday to Friday.' },
    { key: 'cardCta', group: 'contact', label: 'Button text', type: 'text', value: 'Contact support' },
    { key: 'cardUrl', group: 'contact', label: 'Button link', type: 'url', value: 'https://yoursite.com/support' },
  ],
  lists: [{
    key: 'faqs', group: 'items', label: 'Questions', itemLabel: 'Question', titleKey: 'q', min: 1, max: 15,
    fields: faqFields(),
    value: [
      { q: 'How long does delivery take?', a: 'Orders ship within one business day. Standard delivery takes 2–4 days and express delivery arrives the next working day.' },
      { q: 'What is your returns policy?', a: 'Return anything within 30 days for a full refund. Returns are free: print the label from your account and drop the parcel at any collection point.' },
      { q: 'Do you ship internationally?', a: 'Yes, to over 40 countries. Duties and taxes are calculated at checkout, so there are no surprise fees on delivery.' },
      { q: 'How do I track my order?', a: 'You’ll get a tracking link by email as soon as your order ships. You can also follow it from the Orders page in your account.' },
      { q: 'Can I change or cancel my order?', a: 'You can change or cancel an order within one hour of placing it from your account. After that, contact support and we’ll do our best.' },
      { q: 'Which payment methods do you accept?', a: 'All major cards, Apple Pay, Google Pay and PayPal. Payments are processed securely and we never store your card details.' },
    ],
  }],
  toggles: [{ key: 'showCard', label: 'Contact card', value: true }],
  theme: { brand: '#0f766e', brandText: '#ffffff', bg: '#ffffff', surface: '#f0f7f6', text: '#0f172a', muted: '#475569', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap fs2">
  <div class="fs2-side">
    <header class="st-head st-head--left fs2-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead" data-anim="item" data-edit="lead"></p>
    </header>
    <div class="fs2-card" data-anim="item" data-show="showCard">
      <span class="st-icon" data-icon="cardIcon"></span>
      <h3 class="fs2-card-title" data-edit="cardTitle"></h3>
      <p class="fs2-card-text" data-edit="cardText"></p>
      <a class="st-btn" data-href="cardUrl"><span data-edit="cardCta"></span></a>
    </div>
  </div>
  <div class="fs2-list" data-accordion data-list="faqs">
    ${ACC_ITEM_HTML}
  </div>
</div>`,
  css: `.st-faq-split{padding:clamp(64px,8cqi,112px) 0}
${ACC_CSS}
.fs2{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(36px,6cqi,96px);align-items:start}
.fs2-side{position:sticky;top:24px;display:flex;flex-direction:column;gap:28px}
.fs2-head{margin:0}
.fs2-card{display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:clamp(22px,2.6cqi,30px);border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface)}
.fs2-card .st-icon{margin-bottom:6px}
.fs2-card-title{font-size:19px}
.fs2-card-text{color:var(--st-muted);font-size:15.5px;margin-bottom:6px}
.fs2-list{border-top:1px solid color-mix(in srgb,var(--st-text) 11%,transparent)}
@container st (max-width:860px){.fs2{grid-template-columns:1fr}.fs2-side{position:static}.fs2-card{order:2}}`,
};
