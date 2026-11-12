import { FK_CSS, formTop, formBottom, fText, fSelect, fArea, fCheck, lbl, area, tailFields, headFields, headHtml, HEAD_GROUP } from './forms-shared.js';

export default {
  id: 'form-contact-centered',
  name: 'Centered Contact Form',
  version: '1.0.0',
  category: 'forms',
  tags: ['contact', 'form', 'formspree', 'select', 'character-counter', 'consent', 'centered', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Centered Contact Form Section — Free HTML Form Template',
  seoDescription: 'Free contact form section: centered heading, name, email, phone, topic menu, message with a live counter and consent box. Works with Formspree. Export HTML.',
  description: 'A clean centered contact form in a soft card: name and email side by side, an optional phone number, a topic menu, a message box with a live character counter and a consent checkbox. The form posts to Formspree, Basin, Getform or your own server with a success message, an error message and a hidden spam trap, and it still works as a normal form without JavaScript. Every label, the topics and all messages are editable.',
  bestFor: ['Contact pages for businesses, agencies and studios', 'Support and sales enquiries sorted by topic', 'Freelancer and consultant websites'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'form', label: 'Form' }, { id: 'topics', label: 'Topics' }],
  fields: [
    ...headFields({ eyebrow: 'Contact', heading: 'Send us a *message*', lead: 'Tell us what you need and the right person will reply within one business day.' }),
    lbl('nameLabel', 'Name label', 'Your name'),
    lbl('emailLabel', 'Email label', 'Email'),
    lbl('phoneLabel', 'Phone label (empty to remove the field)', 'Phone (optional)'),
    lbl('topicLabel', 'Topic label (empty to remove the menu)', 'What is this about?'),
    lbl('messageLabel', 'Message label', 'Your message'),
    lbl('consentText', 'Consent text (empty to remove the box)', 'I agree to be contacted about my enquiry.'),
    ...tailFields({ sends: 'name, email, phone, topic, message, consent', submit: 'Send message', note: 'We never share your details and reply within one business day.', successTitle: 'Thanks, message sent!', successText: 'We have your message and will reply by email within one business day.' }),
  ],
  lists: [{
    key: 'topics', group: 'topics', label: 'Topics', itemLabel: 'Topic', titleKey: 'name', min: 1, max: 10,
    fields: [{ key: 'name', label: 'Topic', type: 'text', value: 'General question' }],
    value: [{ name: 'General question' }, { name: 'Sales and pricing' }, { name: 'Support' }, { name: 'Partnerships' }, { name: 'Press' }],
  }],
  toggles: [],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f6f7fb', text: '#0f172a', muted: '#64748b', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap fc">
  ${headHtml()}
  <div class="fk-card fc-card" data-anim="media">
    ${formTop()}
        <div class="fk-two">
          ${fText('name', 'nameLabel', { required: true, auto: 'name' })}
          ${fText('email', 'emailLabel', { type: 'email', required: true, auto: 'email' })}
        </div>
        <div class="fk-two">
          ${fText('phone', 'phoneLabel', { type: 'tel', auto: 'tel', optional: true })}
          ${fSelect('topic', 'topicLabel', 'topics', { optional: true })}
        </div>
        ${fArea('message', 'messageLabel', { rows: 5, required: true, max: 600, counter: true })}
        ${fCheck('consent', 'consentText', { required: true, optional: true })}
${formBottom()}
  </div>
</div>`,
  css: `.st-form-contact-centered{padding:clamp(64px,8cqi,112px) 0}
${FK_CSS}
.fc{max-width:760px;margin:0 auto}
.fc-card{margin-top:4px}`,
};
