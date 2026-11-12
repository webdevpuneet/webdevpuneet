import { FK_CSS, formTop, formBottom, fText, fSelect, fArea, fDrop, fCheck, lbl, tailFields, headFields, headHtml, HEAD_GROUP } from './forms-shared.js';

export default {
  id: 'form-job-application',
  name: 'Job Application Form',
  version: '1.0.0',
  category: 'forms',
  tags: ['job', 'application', 'careers', 'resume', 'file-upload', 'form', 'hiring', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Job Application Form Section — Free HTML With Resume Upload',
  seoDescription: 'Free job application form: role facts beside a form with resume drop area, portfolio link, cover letter and consent. Pure HTML and CSS, Formspree support.',
  description: 'A careers form for one open role: on the left the job title, a short summary and key facts (location, type, salary), on the right the application with name, email, phone, a portfolio or LinkedIn link, a resume drop area that shows the chosen file name, a cover letter with a character counter, a “how did you hear about us” menu and a consent box. It posts files and text to Formspree, Basin, Getform or your own server.',
  bestFor: ['Careers and “join our team” pages', 'Single job postings', 'Volunteer, internship and freelancer applications'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'facts', label: 'Role facts' }, { id: 'labels', label: 'Labels' }, { id: 'lists', label: 'Sources' }, { id: 'form', label: 'Form' }],
  fields: [
    ...headFields({ eyebrow: 'Now hiring', heading: 'Senior *product designer*', lead: 'Help us design tools that thousands of small teams use every day. Fully remote, with a team that ships.' }),
    lbl('nameLabel', 'Name label', 'Full name', 'labels'),
    lbl('emailLabel', 'Email label', 'Email', 'labels'),
    lbl('phoneLabel', 'Phone label (empty to remove)', 'Phone (optional)', 'labels'),
    lbl('linkLabel', 'Link label (empty to remove)', 'Portfolio or LinkedIn', 'labels'),
    lbl('dropTitle', 'Resume area title', 'Drop your resume here or browse', 'labels'),
    lbl('dropHint', 'Resume area hint (optional)', 'PDF or Word, up to 5 MB', 'labels'),
    lbl('coverLabel', 'Cover letter label', 'Why do you want to join us?', 'labels'),
    lbl('sourceLabel', 'Source label (empty to remove)', 'How did you hear about us?', 'labels'),
    lbl('consentText', 'Consent text (empty to remove the box)', 'I agree that my data is stored for this application only.', 'labels'),
    ...tailFields({ sends: 'name, email, phone, link, resume (file), cover letter, source', submit: 'Submit application', note: 'We reply to every application within five working days.', successTitle: 'Application received', successText: 'Thank you for applying. We will be in touch within five working days.' }),
  ],
  lists: [{
    key: 'facts', group: 'facts', label: 'Role facts', itemLabel: 'Fact', titleKey: 'label', min: 0, max: 8,
    fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Location' }, { key: 'value', label: 'Value', type: 'text', value: 'Remote' }],
    value: [{ label: 'Location', value: 'Remote, Europe time zones' }, { label: 'Type', value: 'Full-time' }, { label: 'Salary', value: '€70,000 – €90,000' }, { label: 'Starts', value: 'As soon as possible' }],
  }, {
    key: 'sources', group: 'lists', label: 'Sources', itemLabel: 'Source', titleKey: 'name', min: 1, max: 10,
    fields: [{ key: 'name', label: 'Source', type: 'text', value: 'LinkedIn' }],
    value: [{ name: 'LinkedIn' }, { name: 'A friend or colleague' }, { name: 'Our website' }, { name: 'Social media' }, { name: 'Other' }],
  }],
  toggles: [],
  theme: { brand: '#2563eb', brandText: '#ffffff', bg: '#f5f8ff', surface: '#ffffff', text: '#0f1b3d', muted: '#5a6b8c', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap ja">
  <div class="ja-info">
    ${headHtml({ left: true, cls: 'ja-head' })}
    <dl class="ja-facts" data-anim="item" data-list="facts"><div class="ja-row"><dt data-edit="label"></dt><dd data-edit="value"></dd></div></dl>
  </div>
  <div class="fk-card ja-card" data-anim="media">
    ${formTop('enctype="multipart/form-data"')}
        <div class="fk-two">
          ${fText('name', 'nameLabel', { required: true, auto: 'name' })}
          ${fText('email', 'emailLabel', { type: 'email', required: true, auto: 'email' })}
        </div>
        <div class="fk-two">
          ${fText('phone', 'phoneLabel', { type: 'tel', auto: 'tel', optional: true })}
          ${fText('link', 'linkLabel', { type: 'url', auto: 'url', optional: true })}
        </div>
        ${fDrop('resume', 'dropTitle', 'dropHint', { accept: '.pdf,.doc,.docx', required: true })}
        ${fArea('cover', 'coverLabel', { rows: 5, max: 1200, counter: true })}
        ${fSelect('source', 'sourceLabel', 'sources', { optional: true })}
        ${fCheck('consent', 'consentText', { required: true, optional: true })}
${formBottom()}
  </div>
</div>`,
  css: `.st-form-job-application{padding:clamp(64px,8cqi,112px) 0}
${FK_CSS}
.ja{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:start;gap:clamp(36px,5cqi,80px)}
.ja-info{display:flex;flex-direction:column;gap:28px}
.ja-head{margin:0}
.ja-facts{display:flex;flex-direction:column;margin:0;border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.ja-row{display:flex;justify-content:space-between;gap:16px;padding:13px 0;border-bottom:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);font-size:15.5px}
.ja-row dt{color:var(--st-muted)}.ja-row dd{font-weight:700;text-align:right}
@container st (max-width:860px){.ja{grid-template-columns:1fr}}`,
};
