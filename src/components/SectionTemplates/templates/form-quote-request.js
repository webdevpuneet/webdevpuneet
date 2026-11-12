import { FK_CSS, formTop, formBottom, fText, fSelect, fArea, fChips, fOptions, fDrop, fCheck, lbl, tailFields, headFields, headHtml, HEAD_GROUP } from './forms-shared.js';

export default {
  id: 'form-quote-request',
  name: 'Quote Request Form',
  version: '1.0.0',
  category: 'forms',
  tags: ['quote', 'estimate', 'form', 'chips', 'budget', 'file-upload', 'project', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Quote Request Form Section — Free HTML Estimate Form',
  seoDescription: 'Free quote request form: service pills, budget cards, timeline menu, brief upload and contact details, with a what-happens-next list. Works with Formspree.',
  description: 'A project quote form for service businesses: pick the services you need from pill buttons, choose a budget from option cards, set a timeline, describe the project and attach a brief with a drag-and-drop file area. Beside it, a short list explains what happens next. Services, budgets and timelines are editable lists, and the answers post to Formspree, Basin, Getform or your own server.',
  bestFor: ['Agencies, studios and freelancers taking project enquiries', 'Builders, designers and installers asking for estimates', 'Any business that needs a few details before it can quote'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'next', label: 'What happens next' }, { id: 'labels', label: 'Labels' }, { id: 'lists', label: 'Choices' }, { id: 'form', label: 'Form' }],
  fields: [
    ...headFields({ eyebrow: 'Free quote', heading: 'Get a *clear quote* in two days', lead: 'Tell us what you need. We’ll reply with a fixed price, a timeline and the next step.' }),
    lbl('nextHeading', 'List heading (optional)', 'What happens next', 'next'),
    { key: 'next', group: 'next', label: 'Steps (one per line)', type: 'lines', value: 'We read your brief within one working day\nA short call to confirm the details\nYour fixed-price quote in two working days' },
    lbl('servicesLegend', 'Services heading', 'What do you need?', 'labels'),
    lbl('budgetLegend', 'Budget heading', 'Budget', 'labels'),
    lbl('timelineLabel', 'Timeline label', 'When do you want to start?', 'labels'),
    lbl('detailsLabel', 'Details label', 'Describe your project', 'labels'),
    lbl('dropTitle', 'File area title', 'Drop a brief here or browse', 'labels'),
    lbl('dropHint', 'File area hint (optional)', 'PDF, Word or an image, up to 10 MB', 'labels'),
    lbl('nameLabel', 'Name label', 'Your name', 'labels'),
    lbl('emailLabel', 'Email label', 'Email', 'labels'),
    lbl('phoneLabel', 'Phone label (empty to remove)', 'Phone (optional)', 'labels'),
    lbl('consentText', 'Consent text (empty to remove the box)', 'I agree to be contacted about this quote.', 'labels'),
    ...tailFields({ sends: 'services, budget, timeline, details, brief (file), name, email, phone', submit: 'Request my quote', note: 'No obligation. We never share your details.', successTitle: 'Quote request received', successText: 'Thank you. You will hear from us within one working day.' }),
  ],
  lists: [
    { key: 'services', group: 'lists', label: 'Services', itemLabel: 'Service', titleKey: 'name', min: 2, max: 14, fields: [{ key: 'name', label: 'Service', type: 'text', value: 'Design' }], value: [{ name: 'Design' }, { name: 'Development' }, { name: 'Branding' }, { name: 'Copywriting' }, { name: 'SEO' }, { name: 'Maintenance' }] },
    { key: 'budgets', group: 'lists', label: 'Budgets', itemLabel: 'Budget', titleKey: 'name', min: 2, max: 6, fields: [{ key: 'name', label: 'Budget', type: 'text', value: '$5k – $10k' }, { key: 'desc', label: 'Short note (optional)', type: 'text', value: '' }], value: [{ name: '$2k – $5k', desc: 'Small project' }, { name: '$5k – $15k', desc: 'Most projects' }, { name: '$15k +', desc: 'Larger work' }] },
    { key: 'timelines', group: 'lists', label: 'Timelines', itemLabel: 'Timeline', titleKey: 'name', min: 1, max: 8, fields: [{ key: 'name', label: 'Timeline', type: 'text', value: 'As soon as possible' }], value: [{ name: 'As soon as possible' }, { name: 'Within a month' }, { name: 'In 2–3 months' }, { name: 'Just exploring' }] },
  ],
  toggles: [],
  theme: { brand: '#ea580c', brandText: '#ffffff', bg: '#fffaf5', surface: '#ffffff', text: '#2a1a10', muted: '#7a6a5c', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap qr">
  <div class="qr-info">
    ${headHtml({ left: true, cls: 'qr-head' })}
    <div class="qr-next" data-anim="item" data-show-if="next">
      <h3 class="qr-sub" data-show-if="nextHeading" data-edit="nextHeading"></h3>
      <ol class="st-steps-list qr-steps" data-lines="next"></ol>
    </div>
  </div>
  <div class="fk-card qr-card" data-anim="media">
    ${formTop('enctype="multipart/form-data"')}
        ${fChips('services', 'servicesLegend', 'services')}
        ${fOptions('budget', 'budgetLegend', 'budgets', { required: true })}
        ${fSelect('timeline', 'timelineLabel', 'timelines')}
        ${fArea('details', 'detailsLabel', { rows: 4, required: true })}
        ${fDrop('brief', 'dropTitle', 'dropHint', { accept: '.pdf,.doc,.docx,.png,.jpg,.jpeg' })}
        <div class="fk-two">
          ${fText('name', 'nameLabel', { required: true, auto: 'name' })}
          ${fText('email', 'emailLabel', { type: 'email', required: true, auto: 'email' })}
        </div>
        ${fText('phone', 'phoneLabel', { type: 'tel', auto: 'tel', optional: true })}
        ${fCheck('consent', 'consentText', { required: true, optional: true })}
${formBottom()}
  </div>
</div>`,
  css: `.st-form-quote-request{padding:clamp(64px,8cqi,112px) 0}
${FK_CSS}
.qr{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:start;gap:clamp(36px,5cqi,80px)}
.qr-info{display:flex;flex-direction:column;gap:30px}
.qr-head{margin:0}
.qr-sub{margin-bottom:14px;font-size:17px;letter-spacing:-.01em}
.qr-steps{list-style:none;counter-reset:qr;display:flex;flex-direction:column;gap:14px;padding:0}
.qr-steps li{counter-increment:qr;display:flex;gap:14px;align-items:flex-start;font-size:15.5px;line-height:1.5}
.qr-steps li::before{content:counter(qr);flex:none;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--st-brand);color:var(--st-brandText);font-weight:700;font-size:14px}
.qr-card .st-form-fields{gap:20px}
@container st (max-width:860px){.qr{grid-template-columns:1fr}}`,
};
