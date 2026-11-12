import { FK_CSS, formTop, formClose, submitHtml, fText, fSelect, fArea, fCheck, fOptions, lbl, tailFields, headFields, headHtml, HEAD_GROUP } from './forms-shared.js';

export default {
  id: 'form-multi-step',
  name: 'Multi-Step Form',
  version: '1.0.0',
  category: 'forms',
  tags: ['multi-step', 'wizard', 'progress', 'validation', 'form', 'project', 'onboarding', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Multi-Step Form Section — Free HTML Wizard With Progress Bar',
  seoDescription: 'Free multi-step form: three steps with a progress bar, per-step validation, option cards and a review screen before sending. Works with Formspree. Export HTML.',
  description: 'A three-step form wizard: about you, your project and a review screen. A progress bar shows where you are, each step is checked before you can continue (with the browser’s own error messages), Enter moves to the next step, and the last step lists every answer so people can check them before sending. The answers post to Formspree, Basin, Getform or your own server, and without JavaScript all steps simply show one after another.',
  bestFor: ['Project and quote requests that need several details', 'Onboarding and sign-up flows', 'Long forms that feel shorter when split into steps'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'steps', label: 'Step 1: About you' }, { id: 'project', label: 'Step 2: Your project' }, { id: 'review', label: 'Step 3: Review' }, { id: 'lists', label: 'Choices' }, { id: 'form', label: 'Form' }],
  fields: [
    ...headFields({ eyebrow: 'Start a project', heading: 'Tell us about *your project*', lead: 'Three short steps. It takes about two minutes and you can review everything before you send it.' }),
    lbl('step1', 'Progress label 1', 'About you', 'steps'),
    lbl('step2', 'Progress label 2', 'Your project', 'steps'),
    lbl('step3', 'Progress label 3', 'Review', 'steps'),
    lbl('nameLabel', 'Name label', 'Your name', 'steps'),
    lbl('emailLabel', 'Email label', 'Email', 'steps'),
    lbl('companyLabel', 'Company label (empty to remove)', 'Company or organisation', 'steps'),
    lbl('typeLegend', 'Project type heading', 'What do you need?', 'project'),
    lbl('budgetLabel', 'Budget label', 'Budget', 'project'),
    lbl('detailsLabel', 'Details label', 'Anything else we should know?', 'project'),
    lbl('reviewText', 'Review step text', 'Please check your answers. You can go back to change anything.', 'review'),
    lbl('consentText', 'Consent text (empty to remove the box)', 'I agree to be contacted about this project.', 'review'),
    lbl('next', 'Next button text', 'Continue', 'form'),
    lbl('back', 'Back button text', 'Back', 'form'),
    ...tailFields({ sends: 'name, email, company, type, budget, details', submit: 'Send my project', note: 'You can still change your answers before sending.', successTitle: 'Project received!', successText: 'Thank you. We will review it and reply within two working days.' }),
  ],
  lists: [
    {
      key: 'types', group: 'lists', label: 'Project types', itemLabel: 'Type', titleKey: 'name', min: 2, max: 8,
      fields: [{ key: 'name', label: 'Name', type: 'text', value: 'Website' }, { key: 'desc', label: 'Short description (optional)', type: 'text', value: '' }],
      value: [{ name: 'Website', desc: 'A new site or a redesign' }, { name: 'Web app', desc: 'Dashboards, portals, tools' }, { name: 'Branding', desc: 'Logo and visual identity' }, { name: 'Something else', desc: 'Tell us in the details' }],
    },
    {
      key: 'budgets', group: 'lists', label: 'Budgets', itemLabel: 'Budget', titleKey: 'name', min: 1, max: 8,
      fields: [{ key: 'name', label: 'Budget', type: 'text', value: 'Under $5k' }],
      value: [{ name: 'Under $5k' }, { name: '$5k – $15k' }, { name: '$15k – $40k' }, { name: '$40k +' }, { name: 'Not sure yet' }],
    },
  ],
  toggles: [],
  theme: { brand: '#7c3aed', brandText: '#ffffff', bg: '#ffffff', surface: '#f7f5ff', text: '#1e1b4b', muted: '#625f86', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap ms">
  ${headHtml()}
  <div class="fk-card ms-card" data-anim="media">
    ${formTop('data-fk-wizard')}
        <ol class="fk-progress" data-fk-progress>
          <li><i></i><span data-edit="step1"></span></li>
          <li><i></i><span data-edit="step2"></span></li>
          <li><i></i><span data-edit="step3"></span></li>
        </ol>
        <div class="fk-panel" data-fk-step>
          ${fText('name', 'nameLabel', { required: true, auto: 'name' })}
          ${fText('email', 'emailLabel', { type: 'email', required: true, auto: 'email' })}
          ${fText('company', 'companyLabel', { auto: 'organization', optional: true })}
          <div class="fk-nav"><button class="st-btn st-form-btn" type="button" data-fk-next><span data-edit="next"></span></button></div>
        </div>
        <div class="fk-panel" data-fk-step>
          ${fOptions('type', 'typeLegend', 'types', { required: true })}
          ${fSelect('budget', 'budgetLabel', 'budgets', { required: true })}
          ${fArea('details', 'detailsLabel', { rows: 4 })}
          <div class="fk-nav"><button class="fk-back" type="button" data-fk-prev><span data-edit="back"></span></button><button class="st-btn st-form-btn" type="button" data-fk-next><span data-edit="next"></span></button></div>
        </div>
        <div class="fk-panel" data-fk-step>
          <p class="fk-hint" data-edit="reviewText"></p>
          <dl class="fk-summary" data-fk-summary></dl>
          ${fCheck('consent', 'consentText', { required: true, optional: true })}
          <div class="fk-nav"><button class="fk-back" type="button" data-fk-prev><span data-edit="back"></span></button>
          ${submitHtml()}</div>
        </div>
${formClose()}
  </div>
</div>`,
  css: `.st-form-multi-step{padding:clamp(64px,8cqi,112px) 0}
${FK_CSS}
.ms{max-width:720px;margin:0 auto}
.ms-card .st-form-fields{gap:22px}
.ms-card .fk-nav{flex-wrap:wrap}
.ms-card .fk-nav .st-form-note{flex-basis:100%}
.fk-panel.is-active{animation:fkIn .35s ease}
@keyframes fkIn{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.fk-panel.is-active{animation:none}}`,
};
