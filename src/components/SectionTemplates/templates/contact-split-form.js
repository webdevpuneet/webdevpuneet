import { CONTACT_FORM_HTML, FORM_CSS, contactFormFields } from './parts.js';

export default {
  id: 'contact-split-form',
  name: 'Contact Form With Details',
  version: '1.0.0',
  category: 'contact',
  tags: ['contact', 'form', 'formspree', 'email', 'phone', 'split', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Contact Form Section Template — Free HTML Contact Us Block',
  seoDescription: 'Free contact section: ways to reach you beside a working contact form that sends to Formspree or any endpoint, with animated success and error messages.',
  description: 'A complete “Contact us” section: on the left a heading, short text and a list of ways to reach you (email, phone, office, chat), each with an icon and link; on the right a contact form card. The form sends in the background to Formspree, Basin or your own endpoint and shows an animated thank-you message.',
  bestFor: ['Contact pages for businesses and agencies', 'SaaS sales and support enquiries', 'Freelancer and consultant websites'],
  behaviors: ['form'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Contact details' },
    { id: 'form', label: 'Form' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Contact' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Let’s talk about *your project*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'Tell us a little about what you need and we’ll get back to you with ideas, a timeline and a quote.' },
    ...contactFormFields(),
  ],
  lists: [{
    key: 'methods', group: 'items', label: 'Contact details', itemLabel: 'Detail', titleKey: 'label', min: 1, max: 6,
    fields: [
      { key: 'icon', label: 'Icon', type: 'icon', value: 'mail' },
      { key: 'label', label: 'Label', type: 'text', value: 'Email' },
      { key: 'value', label: 'Value', type: 'text', value: 'hello@webdevpuneet.com' },
      { key: 'url', label: 'Link (optional)', type: 'url', value: '', hint: 'mailto:, tel: or a map / chat link.' },
    ],
    value: [
      { icon: 'mail', label: 'Email us', value: 'hello@northstar.studio', url: 'mailto:hello@northstar.studio' },
      { icon: 'phone', label: 'Call us', value: '+44 20 7946 0958', url: 'tel:+442079460958' },
      { icon: 'map-pin', label: 'Visit us', value: '12 Clerkenwell Road, London', url: 'https://www.openstreetmap.org/search?query=Clerkenwell%20Road%20London' },
      { icon: 'clock', label: 'Office hours', value: 'Mon–Fri, 9am–6pm GMT', url: '' },
    ],
  }],
  toggles: [],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#f8f9fc', surface: '#ffffff', text: '#0f172a', muted: '#64748b', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap cs2">
  <div class="cs2-info">
    <header class="st-head st-head--left cs2-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead" data-anim="item" data-edit="lead"></p>
    </header>
    <ul class="cs2-methods" data-list="methods">
      <li class="cs2-method" data-anim="item">
        <span class="st-icon" data-icon="icon"></span>
        <div><p class="cs2-label" data-edit="label"></p><a class="cs2-value" data-href="url" data-show-if="url"><span data-edit="value"></span></a><p class="cs2-value" data-hide-if="url" data-edit="value"></p></div>
      </li>
    </ul>
  </div>
  <div class="cs2-card" data-anim="media">
    ${CONTACT_FORM_HTML}
  </div>
</div>`,
  css: `.st-contact-split-form{padding:clamp(64px,8cqi,112px) 0}
${FORM_CSS}
.cs2{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);align-items:start;gap:clamp(36px,5cqi,80px)}
.cs2-info{display:flex;flex-direction:column;gap:32px}
.cs2-head{margin:0}
.cs2-methods{list-style:none;display:flex;flex-direction:column;gap:20px}
.cs2-method{display:flex;align-items:center;gap:16px}
.cs2-label{color:var(--st-muted);font-size:14px}
.cs2-value{display:block;color:var(--st-text);font-weight:700;font-size:16.5px;text-decoration:none}
a.cs2-value:hover{color:var(--st-brand)}
.cs2-card{padding:clamp(24px,3.4cqi,40px);border-radius:calc(var(--st-radius) * 1.3px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 7%,transparent);box-shadow:0 30px 70px -40px color-mix(in srgb,var(--st-brand) 45%,transparent)}
@container st (max-width:860px){.cs2{grid-template-columns:1fr}}`,
};
