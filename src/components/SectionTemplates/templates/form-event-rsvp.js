import { FK_CSS, formTop, formBottom, fText, fArea, fStepper, fOptions, fChips, fCheck, lbl, tailFields, headFields, headHtml, HEAD_GROUP } from './forms-shared.js';
import { IMG } from './meta.js';

export default {
  id: 'form-event-rsvp',
  name: 'Event RSVP Form',
  version: '1.0.0',
  category: 'forms',
  tags: ['rsvp', 'event', 'registration', 'tickets', 'stepper', 'form', 'wedding', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Event RSVP Form Section — Free Registration Form Template',
  seoDescription: 'Free event RSVP form: event details beside a registration form with guest counter, ticket cards, dietary pills and a message. Works with Formspree. Export HTML.',
  description: 'An event registration or RSVP section: a photo and the key facts (date, time, place, price) on the left, a registration form on the right with name, email, a plus/minus guest counter, ticket option cards, dietary needs as pill buttons and a message. Works for conferences, workshops, weddings and parties, and posts to Formspree, Basin, Getform or your own server.',
  bestFor: ['Conferences, workshops and meetups', 'Weddings, parties and private events', 'Open days and launches'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'media', label: 'Photo' }, { id: 'facts', label: 'Event facts' }, { id: 'labels', label: 'Labels' }, { id: 'lists', label: 'Choices' }, { id: 'form', label: 'Form' }],
  fields: [
    ...headFields({ eyebrow: 'You’re invited', heading: 'Reserve your *seat*', lead: 'Join us for a day of talks, workshops and good company. Places are limited, so register early.' }),
    { key: 'image', group: 'media', label: 'Photo', type: 'image', value: IMG('tpl-event.jpg'), hint: 'About 1200×900 px.', upload: { name: 'event', maxW: 1200 } },
    { key: 'imageAlt', group: 'media', label: 'Photo alt text', type: 'text', value: 'People talking at an event' },
    lbl('nameLabel', 'Name label', 'Your name', 'labels'),
    lbl('emailLabel', 'Email label', 'Email', 'labels'),
    lbl('guestsLabel', 'Guests label (empty to remove)', 'Number of guests', 'labels'),
    lbl('ticketLegend', 'Ticket heading (empty to remove)', 'Ticket type', 'labels'),
    lbl('dietLegend', 'Dietary heading (empty to remove)', 'Dietary needs', 'labels'),
    lbl('noteLabel', 'Message label (empty to remove)', 'Anything we should know?', 'labels'),
    lbl('consentText', 'Consent text (empty to remove the box)', 'I agree that my details are used to organise this event.', 'labels'),
    ...tailFields({ sends: 'name, email, guests, ticket, dietary needs, message', submit: 'Confirm my place', note: 'You’ll get a confirmation email with all the details.', successTitle: 'You’re registered!', successText: 'We’ve saved your place. A confirmation is on its way to your inbox.' }),
  ],
  lists: [
    { key: 'facts', group: 'facts', label: 'Event facts', itemLabel: 'Fact', titleKey: 'label', min: 0, max: 6, fields: [{ key: 'label', label: 'Label', type: 'text', value: 'Date' }, { key: 'value', label: 'Value', type: 'text', value: 'Saturday, 14 March' }], value: [{ label: 'Date', value: 'Saturday, 14 March 2027' }, { label: 'Time', value: '10:00 am – 5:00 pm' }, { label: 'Place', value: 'The Glasshouse, 12 Mill Lane' }, { label: 'Price', value: 'From $45, lunch included' }] },
    { key: 'tickets', group: 'lists', label: 'Ticket types', itemLabel: 'Ticket', titleKey: 'name', min: 1, max: 5, fields: [{ key: 'name', label: 'Name', type: 'text', value: 'Standard' }, { key: 'desc', label: 'Description (optional)', type: 'text', value: '' }], value: [{ name: 'Standard', desc: '$45 · all talks and lunch' }, { name: 'Workshop pass', desc: '$85 · plus two hands-on workshops' }, { name: 'Student', desc: '$20 · with a valid student card' }] },
    { key: 'diets', group: 'lists', label: 'Dietary needs', itemLabel: 'Option', titleKey: 'name', min: 1, max: 10, fields: [{ key: 'name', label: 'Option', type: 'text', value: 'Vegetarian' }], value: [{ name: 'Vegetarian' }, { name: 'Vegan' }, { name: 'Gluten free' }, { name: 'Nut allergy' }, { name: 'Halal' }, { name: 'Kosher' }] },
  ],
  toggles: [],
  theme: { brand: '#db2777', brandText: '#ffffff', bg: '#ffffff', surface: '#fff5f9', text: '#2a1021', muted: '#7d5a6e', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap er">
  <div class="er-info">
    ${headHtml({ left: true, cls: 'er-head' })}
    <img class="er-photo" data-anim="media" data-image="image" data-optional alt="" loading="lazy">
    <dl class="er-facts" data-anim="item" data-list="facts"><div class="er-row"><dt data-edit="label"></dt><dd data-edit="value"></dd></div></dl>
  </div>
  <div class="fk-card er-card" data-anim="media">
    ${formTop()}
        <div class="fk-two">
          ${fText('name', 'nameLabel', { required: true, auto: 'name' })}
          ${fText('email', 'emailLabel', { type: 'email', required: true, auto: 'email' })}
        </div>
        <div data-show-if="guestsLabel">${fStepper('guests', 'guestsLabel', { min: 1, max: 10, value: 1 })}</div>
        ${fOptions('ticket', 'ticketLegend', 'tickets', { required: true, look: 'stack', optional: true })}
        ${fChips('diet', 'dietLegend', 'diets', { optional: true })}
        ${fArea('message', 'noteLabel', { rows: 3, optional: true })}
        ${fCheck('consent', 'consentText', { required: true, optional: true })}
${formBottom()}
  </div>
</div>`,
  css: `.st-form-event-rsvp{padding:clamp(64px,8cqi,112px) 0}
${FK_CSS}
.er{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);align-items:start;gap:clamp(36px,5cqi,80px)}
.er-info{display:flex;flex-direction:column;gap:26px}
.er-head{margin:0}
.er-photo{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:calc(var(--st-radius) * 1.3px)}
.er-facts{display:flex;flex-direction:column;margin:0;border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.er-row{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-bottom:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);font-size:15.5px}
.er-row dt{color:var(--st-muted)}.er-row dd{font-weight:700;text-align:right}
.er-card .st-form-fields{gap:20px}
@container st (max-width:860px){.er{grid-template-columns:1fr}}`,
};
