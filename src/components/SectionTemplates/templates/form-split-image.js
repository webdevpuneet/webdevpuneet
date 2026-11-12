import { FK_CSS, formTop, formBottom, fFloat, fCheck, fChips, lbl, tailFields, headFields, HEAD_GROUP } from './forms-shared.js';
import { IMG } from './meta.js';

export default {
  id: 'form-split-image',
  name: 'Form With Image',
  version: '1.0.0',
  category: 'forms',
  tags: ['signup', 'lead', 'image', 'split', 'floating-label', 'form', 'newsletter', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Form With Image Section — Free Split Sign-Up Form HTML',
  seoDescription: 'Free split-screen form section: a full-height photo with a quote beside a floating-label sign-up form with interest pills and consent. Works with Formspree.',
  description: 'A split-screen sign-up or lead form: on one side a full-height photo with an overlaid quote, on the other a floating-label form with name, email, interest chips and a consent box. The image can sit on the left or right, and the form posts to Formspree, Basin, Getform or your own server with success and error messages.',
  bestFor: ['Course, workshop and webinar sign-ups', 'Lead capture with a brand photo', 'Registration pages that need a human touch'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'media', label: 'Photo & quote' }, { id: 'labels', label: 'Labels' }, { id: 'lists', label: 'Interests' }, { id: 'form', label: 'Form' }],
  fields: [
    ...headFields({ eyebrow: 'Join us', heading: 'Start learning *this week*', lead: 'Pick the topics you care about and we will tailor the first lessons to you.' }),
    { key: 'image', group: 'media', label: 'Photo', type: 'image', value: IMG('hero-landscape.jpg'), hint: 'About 1000×1300 px, portrait or square works best.', upload: { name: 'split', maxW: 1200 } },
    { key: 'imageAlt', group: 'media', label: 'Photo alt text', type: 'text', value: 'A bright workspace with a laptop' },
    lbl('quote', 'Quote on the photo (empty to remove)', '“I learned more in two weeks than in a whole semester.”', 'media'),
    lbl('quoteBy', 'Quote author (optional)', 'Maya, student', 'media'),
    { key: 'imageSide', group: 'media', label: 'Photo side', type: 'choice', options: [['left', 'Left'], ['right', 'Right']], value: 'left' },
    lbl('nameLabel', 'Name label', 'Full name', 'labels'),
    lbl('emailLabel', 'Email label', 'Email address', 'labels'),
    lbl('chipsLegend', 'Interests heading (empty to remove)', 'What are you interested in?', 'labels'),
    lbl('consentText', 'Consent text (empty to remove the box)', 'I agree to the terms and to receive emails about my course.', 'labels'),
    ...tailFields({ sends: 'name, email, interests, consent', submit: 'Create my free account', note: 'No credit card needed.', successTitle: 'Welcome aboard!', successText: 'Check your inbox for a link to start your first lesson.' }),
  ],
  lists: [{
    key: 'interests', group: 'lists', label: 'Interests', itemLabel: 'Interest', titleKey: 'name', min: 1, max: 12,
    fields: [{ key: 'name', label: 'Interest', type: 'text', value: 'Design' }],
    value: [{ name: 'Design' }, { name: 'Coding' }, { name: 'Marketing' }, { name: 'Data' }, { name: 'Writing' }, { name: 'Business' }],
  }],
  toggles: [],
  theme: { brand: '#0ea5e9', brandText: '#ffffff', bg: '#ffffff', surface: '#f4f9fd', text: '#0b2236', muted: '#56718a', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap fi" data-set="data-side:imageSide">
  <figure class="fi-media" data-anim="media">
    <img class="fi-img" data-image="image" alt="" loading="lazy">
    <figcaption class="fi-quote" data-show-if="quote"><p data-edit="quote"></p><span data-show-if="quoteBy" data-edit="quoteBy"></span></figcaption>
  </figure>
  <div class="fi-main">
    <header class="st-head st-head--left fi-head">
      <p class="st-eyebrow" data-anim="item" data-show-if="eyebrow" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead" data-anim="item" data-show-if="lead" data-edit="lead"></p>
    </header>
    <div data-anim="item">
    ${formTop()}
        ${fFloat('name', 'nameLabel', { required: true, auto: 'name' })}
        ${fFloat('email', 'emailLabel', { type: 'email', required: true, auto: 'email' })}
        ${fChips('interests', 'chipsLegend', 'interests', { optional: true })}
        ${fCheck('consent', 'consentText', { required: true, optional: true })}
${formBottom()}
    </div>
  </div>
</div>`,
  css: `.st-form-split-image{padding:clamp(48px,6cqi,96px) 0}
${FK_CSS}
.fi{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0;border-radius:calc(var(--st-radius) * 1.6px);overflow:hidden;background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent);box-shadow:0 40px 90px -50px color-mix(in srgb,var(--st-text) 55%,transparent)}
.fi[data-side="right"] .fi-media{order:2}
.fi-media{position:relative;margin:0;min-height:520px}
.fi-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fi-quote{position:absolute;left:0;right:0;bottom:0;padding:70px 32px 32px;background:linear-gradient(to top,rgba(5,15,28,.72),transparent);color:#fff}
.fi-quote p{font:700 clamp(18px,2.4cqi,24px)/1.35 var(--st-font-heading)}
.fi-quote span{display:block;margin-top:8px;font-size:14px;opacity:.85}
.fi-main{display:flex;flex-direction:column;justify-content:center;gap:24px;padding:clamp(28px,4.5cqi,60px)}
.fi-head{margin:0}
.fi .st-form-fields{gap:16px}
@container st (max-width:820px){.fi{grid-template-columns:1fr}.fi[data-side="right"] .fi-media{order:0}.fi-media{min-height:260px}}`,
};
