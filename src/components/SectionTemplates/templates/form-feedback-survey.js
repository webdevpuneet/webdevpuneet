import { FK_CSS, formTop, formBottom, fText, fArea, fStars, fScale, fChips, fCheck, lbl, tailFields, headFields, headHtml, HEAD_GROUP } from './forms-shared.js';

export default {
  id: 'form-feedback-survey',
  name: 'Feedback Survey Form',
  version: '1.0.0',
  category: 'forms',
  tags: ['feedback', 'survey', 'rating', 'stars', 'nps', 'form', 'review', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Feedback Survey Form Section — Star Rating & NPS Scale',
  seoDescription: 'Free feedback form section: five-star rating, 0 to 10 recommend scale, topic pills and a comment box with a counter. Pure HTML and CSS, works with Formspree.',
  description: 'A short customer feedback survey: a five-star rating, a 0–10 “how likely are you to recommend us” scale (net promoter score), pill buttons for what went well, and a comment box with a live character counter, plus an optional email for a follow-up. The stars and the scale are plain radio buttons styled with CSS, so they work with keyboards and screen readers, and the answers post to Formspree, Basin, Getform or your own server.',
  bestFor: ['Customer satisfaction and NPS surveys', 'Post-purchase, post-event and post-support feedback', 'Product and website feedback pages'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'labels', label: 'Questions' }, { id: 'lists', label: 'Topic chips' }, { id: 'form', label: 'Form' }],
  fields: [
    ...headFields({ eyebrow: 'Your feedback', heading: 'How did we *do*?', lead: 'It takes under a minute and helps us get better.' }),
    lbl('ratingLegend', 'Star rating question', 'How was your experience?', 'labels'),
    lbl('npsLegend', 'Recommend question (empty to remove)', 'How likely are you to recommend us to a friend?', 'labels'),
    lbl('npsLow', 'Low end label', 'Not likely', 'labels'),
    lbl('npsHigh', 'High end label', 'Very likely', 'labels'),
    lbl('chipsLegend', 'Chips question (empty to remove)', 'What went well?', 'labels'),
    lbl('commentLabel', 'Comment label', 'Anything you would like to add?', 'labels'),
    lbl('emailLabel', 'Email label (empty to remove)', 'Email (only if you would like a reply)', 'labels'),
    lbl('consentText', 'Consent text (empty to remove the box)', 'You may quote my feedback on your website.', 'labels'),
    ...tailFields({ sends: 'rating, recommend (0-10), topics, comment, email, quote', submit: 'Send feedback', note: '', successTitle: 'Thank you!', successText: 'Your feedback has been sent. We read every response.' }),
  ],
  lists: [{
    key: 'topics', group: 'lists', label: 'Topic chips', itemLabel: 'Topic', titleKey: 'name', min: 1, max: 12,
    fields: [{ key: 'name', label: 'Topic', type: 'text', value: 'Friendly service' }],
    value: [{ name: 'Friendly service' }, { name: 'Quality' }, { name: 'Speed' }, { name: 'Value for money' }, { name: 'Easy to use' }, { name: 'Support' }],
  }],
  toggles: [],
  theme: { brand: '#e11d48', brandText: '#ffffff', bg: '#ffffff', surface: '#fff6f7', text: '#2b1218', muted: '#7d5d65', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap fs">
  ${headHtml()}
  <div class="fk-card fs-card" data-anim="media">
    ${formTop()}
        ${fStars('rating', 'ratingLegend', { required: true })}
        <div data-show-if="npsLegend">${fScale('recommend', 'npsLegend', 'npsLow', 'npsHigh')}</div>
        ${fChips('topics', 'chipsLegend', 'topics', { optional: true })}
        ${fArea('comment', 'commentLabel', { rows: 4, max: 500, counter: true })}
        ${fText('email', 'emailLabel', { type: 'email', auto: 'email', optional: true })}
        ${fCheck('quote', 'consentText', { optional: true })}
${formBottom()}
  </div>
</div>`,
  css: `.st-form-feedback-survey{padding:clamp(64px,8cqi,112px) 0}
${FK_CSS}
.fs{max-width:720px;margin:0 auto}
.fs-card .st-form-fields{gap:24px}
.fs .fk-stars svg{width:38px;height:38px}`,
};
