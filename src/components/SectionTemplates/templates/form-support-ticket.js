import { FK_CSS, formTop, formBottom, fText, fSelect, fArea, fDrop, lbl, tailFields, headFields, headHtml, HEAD_GROUP } from './forms-shared.js';

export default {
  id: 'form-support-ticket',
  name: 'Support Ticket Form',
  version: '1.0.0',
  category: 'forms',
  tags: ['support', 'help-desk', 'ticket', 'priority', 'conditional-fields', 'file-upload', 'form', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Support Ticket Form Section — Free Help Desk HTML Form',
  seoDescription: 'Free support request form: topic menu, an order number that shows only when needed, priority switch, description counter and file upload. Formspree ready.',
  description: 'A help-desk form: pick a topic, and a field for an order number appears only when the topic needs it; choose a priority with a segmented control, describe the problem in a box with a character counter and drop in a screenshot. The topic, priority and file area are editable, and the request posts to Formspree, Basin, Getform or your own server.',
  bestFor: ['Customer support and help centre pages', 'Bug reports and feature requests', 'Order, billing and account enquiries'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'labels', label: 'Labels' }, { id: 'lists', label: 'Topics & priorities' }, { id: 'form', label: 'Form' }],
  fields: [
    ...headFields({ eyebrow: 'Support', heading: 'How can we *help*?', lead: 'Send us the details and the right person will pick it up. Most requests are answered in a few hours.' }),
    lbl('emailLabel', 'Email label', 'Your email', 'labels'),
    lbl('topicLabel', 'Topic label', 'Topic', 'labels'),
    lbl('orderLabel', 'Order number label (shown for "Order or billing")', 'Order number', 'labels'),
    lbl('priorityLegend', 'Priority heading (empty to remove)', 'Priority', 'labels'),
    lbl('subjectLabel', 'Subject label', 'Subject', 'labels'),
    lbl('descLabel', 'Description label', 'What is happening?', 'labels'),
    lbl('dropTitle', 'File area title', 'Add a screenshot or file', 'labels'),
    lbl('dropHint', 'File area hint (optional)', 'PNG, JPG or PDF, up to 10 MB', 'labels'),
    ...tailFields({ sends: 'email, topic, order number, priority, subject, description, attachment (file)', submit: 'Send request', note: 'You will receive a reference number by email.', successTitle: 'Request sent', successText: 'Thanks. We have your request and will reply to your email shortly.' }),
  ],
  lists: [
    { key: 'topics', group: 'lists', label: 'Topics', itemLabel: 'Topic', titleKey: 'name', min: 1, max: 10, fields: [{ key: 'name', label: 'Topic', type: 'text', value: 'Technical problem' }], value: [{ name: 'Technical problem' }, { name: 'Order or billing' }, { name: 'Account and login' }, { name: 'Feature request' }, { name: 'Something else' }] },
    { key: 'priorities', group: 'lists', label: 'Priorities', itemLabel: 'Priority', titleKey: 'name', min: 2, max: 4, fields: [{ key: 'name', label: 'Priority', type: 'text', value: 'Normal' }], value: [{ name: 'Low' }, { name: 'Normal' }, { name: 'Urgent' }] },
  ],
  toggles: [],
  theme: { brand: '#0284c7', brandText: '#ffffff', bg: '#f4f9fd', surface: '#ffffff', text: '#0c1f33', muted: '#587089', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap sp">
  ${headHtml()}
  <div class="fk-card sp-card" data-anim="media">
    ${formTop('enctype="multipart/form-data"')}
        ${fText('email', 'emailLabel', { type: 'email', required: true, auto: 'email' })}
        <div class="fk-two">
          ${fSelect('topic', 'topicLabel', 'topics', { required: true })}
          <div data-fk-when="topic=Order or billing" hidden>${fText('order', 'orderLabel', { mode: 'numeric', extra: 'required' })}</div>
        </div>
        <fieldset class="fk-group" data-show-if="priorityLegend"><legend class="fk-legend" data-edit="priorityLegend"></legend><div class="fk-seg" data-list="priorities"><label><input type="radio" name="priority" data-set="value:name"><span data-edit="name"></span></label></div></fieldset>
        ${fText('subject', 'subjectLabel', { required: true })}
        ${fArea('description', 'descLabel', { rows: 5, required: true, max: 1000, counter: true })}
        ${fDrop('attachment', 'dropTitle', 'dropHint', { accept: '.png,.jpg,.jpeg,.pdf' })}
${formBottom()}
  </div>
</div>`,
  css: `.st-form-support-ticket{padding:clamp(64px,8cqi,112px) 0}
${FK_CSS}
.sp{max-width:720px;margin:0 auto}
.sp-card .st-form-fields{gap:20px}
.sp-card [data-fk-when][hidden]{display:none}`,
};
