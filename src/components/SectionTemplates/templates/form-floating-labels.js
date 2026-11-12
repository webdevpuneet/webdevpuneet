import { FK_CSS, formTop, formBottom, fFloat, fFloatArea, fCheck, lbl, tailFields, headFields, headHtml, HEAD_GROUP } from './forms-shared.js';

export default {
  id: 'form-floating-labels',
  name: 'Floating Label Form',
  version: '1.0.0',
  category: 'forms',
  tags: ['floating-label', 'contact', 'form', 'lead', 'modern', 'split', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Floating Label Form Section — Free HTML & CSS Template',
  seoDescription: 'Free floating label form section: labels glide up as you type, with a promise list beside it. Pure CSS labels, Formspree support, export HTML, React or Vue.',
  description: 'A modern lead or contact form where each label sits inside its box and glides up when the field is focused or filled, built with CSS only. On the left a heading and a short list of promises, on the right the form card with name, email, company, phone and a message, an optional consent box, and the same working Formspree-style posting with success and error messages as every other form in this category.',
  bestFor: ['Lead forms on landing pages', 'Agency, studio and SaaS contact sections', 'Modern, minimal websites'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'promises', label: 'Promises' }, { id: 'form', label: 'Form' }],
  fields: [
    ...headFields({ eyebrow: 'Get in touch', heading: 'Let’s build something *great* together', lead: 'Share a few details and we’ll come back with ideas, a timeline and a clear price.' }),
    { key: 'promises', group: 'promises', label: 'Promises (one per line)', type: 'lines', value: 'Reply within one working day\nNo sales pressure, ever\nFree 30-minute discovery call\nFixed, transparent pricing' },
    lbl('nameLabel', 'Name label', 'Full name'),
    lbl('emailLabel', 'Email label', 'Work email'),
    lbl('companyLabel', 'Company label (empty to remove)', 'Company'),
    lbl('phoneLabel', 'Phone label (empty to remove)', 'Phone number'),
    lbl('messageLabel', 'Message label', 'Tell us about your project'),
    lbl('consentText', 'Consent text (empty to remove the box)', 'Send me occasional news and offers (you can unsubscribe at any time).'),
    ...tailFields({ sends: 'name, email, company, phone, message, updates', submit: 'Send my request', note: 'Your details are only used to reply to this request.', successTitle: 'Request sent, thank you!', successText: 'We’ll be in touch within one working day.' }),
  ],
  lists: [],
  toggles: [],
  theme: { brand: '#0d9488', brandText: '#ffffff', bg: '#ffffff', surface: '#f2f8f7', text: '#0f172a', muted: '#5b6b7b', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap ff">
  <div class="ff-info">
    ${headHtml({ left: true, cls: 'ff-head' })}
    <ul class="st-checks ff-promises" data-anim="item" data-lines="promises"></ul>
  </div>
  <div class="fk-card ff-card" data-anim="media">
    ${formTop()}
        <div class="fk-two">
          ${fFloat('name', 'nameLabel', { required: true, auto: 'name' })}
          ${fFloat('email', 'emailLabel', { type: 'email', required: true, auto: 'email' })}
        </div>
        <div class="fk-two">
          <div data-show-if="companyLabel">${fFloat('company', 'companyLabel', { auto: 'organization' })}</div>
          <div data-show-if="phoneLabel">${fFloat('phone', 'phoneLabel', { type: 'tel', auto: 'tel' })}</div>
        </div>
        ${fFloatArea('message', 'messageLabel', { rows: 5, required: true })}
        ${fCheck('updates', 'consentText', { optional: true })}
${formBottom()}
  </div>
</div>`,
  css: `.st-form-floating-labels{padding:clamp(64px,8cqi,112px) 0}
${FK_CSS}
.ff{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);align-items:center;gap:clamp(36px,5cqi,80px)}
.ff-info{display:flex;flex-direction:column;gap:28px}
.ff-head{margin:0}
.ff-promises{margin:0}
@container st (max-width:860px){.ff{grid-template-columns:1fr}}`,
};
