import { FK_CSS, formTop, formBottom, fText, fArea, fCheck, lbl, tailFields, headFields, headHtml, HEAD_GROUP } from './forms-shared.js';
import { IMG } from './meta.js';

export default {
  id: 'form-donation',
  name: 'Donation Form',
  version: '1.0.0',
  category: 'forms',
  tags: ['donation', 'nonprofit', 'charity', 'amount', 'monthly', 'form', 'fundraising', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Donation Form Section — Free Amount Chips & Monthly Toggle',
  seoDescription: 'Free donation form: one-time or monthly switch, amount buttons with impact notes, custom amount and donor details. Collects gifts and works with any endpoint.',
  description: 'A fundraising form for charities and causes: a one-time / monthly switch, a row of amount buttons that each say what the gift does, a custom amount field (choosing one clears the other), donor name and email, an optional note and a “cover the fees” checkbox. It collects the donor’s choices and posts them to Formspree, Basin, Getform or your own server. It does not process payments itself: connect your payment link or follow up with an invoice.',
  bestFor: ['Charities, churches and community groups', 'Crowdfunding and campaign pages', 'Creators and open-source projects asking for support'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'media', label: 'Photo' }, { id: 'labels', label: 'Labels' }, { id: 'lists', label: 'Amounts' }, { id: 'form', label: 'Form' }],
  fields: [
    ...headFields({ eyebrow: 'Give', heading: 'Every gift *changes a life*', lead: 'Choose an amount. One hundred percent of your donation goes to the programme you support.' }),
    { key: 'image', group: 'media', label: 'Photo (optional)', type: 'image', value: IMG('hero-portrait.jpg'), hint: 'About 1000×1200 px.', upload: { name: 'donate', maxW: 1100 } },
    { key: 'imageAlt', group: 'media', label: 'Photo alt text', type: 'text', value: 'A smiling volunteer' },
    lbl('onceLabel', 'One-time label', 'One time', 'labels'),
    lbl('monthlyLabel', 'Monthly label', 'Monthly', 'labels'),
    lbl('amountLegend', 'Amount heading', 'Choose an amount', 'labels'),
    lbl('otherLabel', 'Custom amount label', 'Or enter your own amount', 'labels'),
    lbl('otherPlaceholder', 'Custom amount placeholder', '$ 0', 'labels'),
    lbl('nameLabel', 'Name label', 'Your name', 'labels'),
    lbl('emailLabel', 'Email label', 'Email (for your receipt)', 'labels'),
    lbl('noteLabel', 'Note label (empty to remove)', 'Dedicate your gift or leave a message (optional)', 'labels'),
    lbl('feesText', 'Fees checkbox text (empty to remove)', 'I’d like to cover the processing fees so more of my gift goes to the cause.', 'labels'),
    ...tailFields({ sends: 'frequency, amount, custom amount, name, email, note, cover fees', submit: 'Donate', note: 'Secure and tax-deductible where applicable. You can cancel a monthly gift at any time.', successTitle: 'Thank you for your gift!', successText: 'Your donation details were received. A receipt will be sent to your email.' }),
  ],
  lists: [{
    key: 'amounts', group: 'lists', label: 'Amounts', itemLabel: 'Amount', titleKey: 'name', min: 2, max: 8,
    fields: [{ key: 'name', label: 'Amount', type: 'text', value: '$25' }, { key: 'desc', label: 'What it does (optional)', type: 'text', value: '' }],
    value: [{ name: '$10', desc: 'A week of school meals' }, { name: '$25', desc: 'School supplies for a child' }, { name: '$50', desc: 'A month of clean water' }, { name: '$100', desc: 'A family health check' }],
  }],
  toggles: [],
  theme: { brand: '#16a34a', brandText: '#ffffff', bg: '#f6fbf7', surface: '#ffffff', text: '#10281a', muted: '#55705f', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap dn">
  <div class="dn-media" data-anim="media" data-show-if="image"><img class="dn-photo" data-image="image" data-optional alt="" loading="lazy"></div>
  <div class="dn-main">
    ${headHtml({ left: true, cls: 'dn-head' })}
    <div class="fk-card dn-card" data-anim="media">
    ${formTop()}
        <div class="fk-seg" role="radiogroup"><label><input type="radio" name="frequency" value="once" checked><span data-edit="onceLabel"></span></label><label><input type="radio" name="frequency" value="monthly"><span data-edit="monthlyLabel"></span></label></div>
        <div data-fk-amounts>
          <fieldset class="fk-group"><legend class="fk-legend" data-edit="amountLegend"></legend><div class="fk-options" data-list="amounts"><label class="fk-opt"><input type="radio" name="amount" data-set="value:name"><span class="fk-opt-body"><span class="fk-opt-title" data-edit="name"></span><span class="fk-opt-desc" data-show-if="desc" data-edit="desc"></span></span></label></div></fieldset>
          <label class="st-field dn-other"><span data-edit="otherLabel"></span><input name="custom_amount" type="number" inputmode="decimal" min="1" step="any" data-fk-other data-set="placeholder:otherPlaceholder"></label>
        </div>
        <div class="fk-two">
          ${fText('name', 'nameLabel', { required: true, auto: 'name' })}
          ${fText('email', 'emailLabel', { type: 'email', required: true, auto: 'email' })}
        </div>
        ${fArea('note', 'noteLabel', { rows: 2, optional: true })}
        ${fCheck('cover_fees', 'feesText', { optional: true })}
${formBottom({ btnClass: 'dn-btn' })}
    </div>
  </div>
</div>`,
  css: `.st-form-donation{padding:clamp(64px,8cqi,112px) 0}
${FK_CSS}
.dn{display:grid;grid-template-columns:minmax(0,.7fr) minmax(0,1.3fr);align-items:stretch;gap:clamp(30px,4cqi,64px)}
.dn-media{min-height:340px}
.dn-photo{width:100%;height:100%;object-fit:cover;border-radius:calc(var(--st-radius) * 1.5px)}
.dn-main{display:flex;flex-direction:column;gap:26px;min-width:0}
.dn-head{margin:0}
.dn-card .st-form-fields{gap:20px}
.dn-card [data-fk-amounts]{display:flex;flex-direction:column;gap:16px}
.dn-card .fk-options{grid-template-columns:repeat(auto-fit,minmax(118px,1fr))}
.dn-card .fk-opt-body{padding:12px 14px}
.dn-other{max-width:260px}
.dn-btn{align-self:stretch}
@container st (max-width:860px){.dn{grid-template-columns:1fr}.dn-media{min-height:240px;max-height:300px}}`,
};
