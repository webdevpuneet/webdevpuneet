import { FORM_CSS } from './parts.js';

export default {
  id: 'booking-form',
  name: 'Booking Request Form',
  version: '1.0.0',
  category: 'contact',
  tags: ['booking', 'appointment', 'reservation', 'form', 'contact', 'schedule', 'opening-hours', 'light'],
  created: '2026-10-24',
  updated: '2026-10-24',
  seoTitle: 'Booking Form Section Template — Free Appointment HTML',
  seoDescription: 'Free booking section: an appointment request form with service, date and time choices, opening hours and Formspree support. Export HTML, React or Vue.',
  description: 'An appointment request section: on the left a heading, opening hours and a short list of what to expect; on the right a form card with name, email, phone, a service menu, a date picker, time slots and a notes box. Services and time slots are editable lists, the form sends to Formspree or any endpoint, and the date picker blocks past days.',
  bestFor: ['Salons, clinics, dentists and therapists', 'Restaurants and venues taking table or visit requests', 'Coaches, consultants and tutors booking calls'],
  behaviors: ['form', 'booking'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'hours', label: 'Opening hours' },
    { id: 'choices', label: 'Services & times' },
    { id: 'form', label: 'Form' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Book online' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Request *your appointment*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'Choose a service, a day and a time that suits you. We confirm every request by email or text within a few hours.' },
    { key: 'hoursHeading', group: 'hours', label: 'Opening hours heading (optional)', type: 'text', value: 'Opening hours' },
    { key: 'expectHeading', group: 'hours', label: 'What-to-expect heading (optional)', type: 'text', value: 'What to expect' },
    { key: 'expect', group: 'hours', label: 'What to expect (one per line)', type: 'textarea', value: 'A short consultation before we start\nTransparent prices, agreed up front\nFree cancellation up to 24 hours before' },
    { key: 'formAction', group: 'form', label: 'Form URL (action)', type: 'url', value: 'https://formspree.io/f/your-form-id', hint: 'Paste your form endpoint from Formspree, Basin, Getform or your own server. Fields sent: name, email, phone, service, date, time, notes.' },
    { key: 'nameLabel', group: 'form', label: 'Name label', type: 'text', value: 'Your name' },
    { key: 'emailLabel', group: 'form', label: 'Email label', type: 'text', value: 'Email' },
    { key: 'phoneLabel', group: 'form', label: 'Phone label (optional)', type: 'text', value: 'Phone' },
    { key: 'serviceLabel', group: 'form', label: 'Service label', type: 'text', value: 'Service' },
    { key: 'dateLabel', group: 'form', label: 'Date label', type: 'text', value: 'Preferred day' },
    { key: 'timeLabel', group: 'form', label: 'Time label', type: 'text', value: 'Preferred time' },
    { key: 'notesLabel', group: 'form', label: 'Notes label', type: 'text', value: 'Anything we should know?' },
    { key: 'submit', group: 'form', label: 'Button text', type: 'text', value: 'Request appointment' },
    { key: 'note', group: 'form', label: 'Note under the button (optional)', type: 'text', value: 'This is a request, not a confirmed booking. We will reply to confirm.' },
    { key: 'successTitle', group: 'form', label: 'Success title', type: 'text', value: 'Request received' },
    { key: 'successText', group: 'form', label: 'Success text', type: 'text', value: 'Thank you. We will confirm your appointment by email shortly.' },
    { key: 'errorText', group: 'form', label: 'Error text', type: 'text', value: 'Sorry, something went wrong. Please try again or call us directly.' },
  ],
  lists: [
    {
      key: 'hours', group: 'hours', label: 'Opening hours', itemLabel: 'Day', titleKey: 'day', min: 1, max: 7,
      fields: [
        { key: 'day', label: 'Day', type: 'text', value: 'Monday – Friday' },
        { key: 'time', label: 'Hours', type: 'text', value: '9:00 am – 6:00 pm' },
      ],
      value: [
        { day: 'Monday – Friday', time: '9:00 am – 6:00 pm' },
        { day: 'Saturday', time: '10:00 am – 4:00 pm' },
        { day: 'Sunday', time: 'Closed' },
      ],
    },
    {
      key: 'services', group: 'choices', label: 'Services', itemLabel: 'Service', titleKey: 'name', min: 1, max: 12,
      fields: [{ key: 'name', label: 'Service name', type: 'text', value: 'Service' }],
      value: [{ name: 'First consultation' }, { name: 'Cut and style' }, { name: 'Colour' }, { name: 'Treatment' }],
    },
    {
      key: 'times', group: 'choices', label: 'Time slots', itemLabel: 'Time', titleKey: 'name', min: 1, max: 16,
      fields: [{ key: 'name', label: 'Time', type: 'text', value: '10:00 am' }],
      value: [{ name: 'Morning (9 am – 12 pm)' }, { name: 'Lunchtime (12 pm – 2 pm)' }, { name: 'Afternoon (2 pm – 5 pm)' }, { name: 'Evening (after 5 pm)' }],
    },
  ],
  toggles: [],
  theme: { brand: '#0f766e', brandText: '#ffffff', bg: '#ffffff', surface: '#f1f7f6', text: '#0f172a', muted: '#64748b', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap bk">
  <div class="bk-info">
    <header class="st-head st-head--left bk-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead" data-anim="item" data-edit="lead"></p>
    </header>
    <div class="bk-block" data-anim="item">
      <h3 class="bk-sub" data-show-if="hoursHeading" data-edit="hoursHeading"></h3>
      <dl class="bk-hours" data-list="hours">
        <div class="bk-row"><dt data-edit="day"></dt><dd data-edit="time"></dd></div>
      </dl>
    </div>
    <div class="bk-block" data-anim="item">
      <h3 class="bk-sub" data-show-if="expectHeading" data-edit="expectHeading"></h3>
      <ul class="st-checks" data-lines="expect"></ul>
    </div>
  </div>
  <div class="bk-card" data-anim="media">
    <form class="st-form" method="post" data-form data-set="action:formAction">
      <div class="st-form-fields" data-form-fields>
        <div class="st-form-row">
          <label class="st-field"><span data-edit="nameLabel"></span><input name="name" type="text" required autocomplete="name"></label>
          <label class="st-field"><span data-edit="emailLabel"></span><input name="email" type="email" required autocomplete="email"></label>
        </div>
        <label class="st-field" data-show-if="phoneLabel"><span data-edit="phoneLabel"></span><input name="phone" type="tel" autocomplete="tel"></label>
        <label class="st-field"><span data-edit="serviceLabel"></span><select name="service" required data-list="services"><option data-set="value:name" data-edit="name"></option></select></label>
        <div class="st-form-row">
          <label class="st-field"><span data-edit="dateLabel"></span><input name="date" type="date" required data-booking-date></label>
          <label class="st-field"><span data-edit="timeLabel"></span><select name="time" required data-list="times"><option data-set="value:name" data-edit="name"></option></select></label>
        </div>
        <label class="st-field"><span data-edit="notesLabel"></span><textarea name="notes" rows="3"></textarea></label>
        <input class="st-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="st-btn st-form-btn" type="submit"><span data-edit="submit"></span></button>
        <p class="st-form-note" data-edit="note"></p>
        <p class="st-form-error" data-form-error hidden role="alert" data-edit="errorText"></p>
      </div>
      <div class="st-form-success" data-form-success hidden tabindex="-1" role="status">
        <span class="st-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>
        <h3 data-edit="successTitle"></h3>
        <p data-edit="successText"></p>
      </div>
    </form>
  </div>
</div>`,
  css: `.st-booking-form{padding:clamp(64px,8cqi,112px) 0}
${FORM_CSS}
.st-field select{width:100%;padding:13px 44px 13px 15px;-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 16px center;background-size:16px;cursor:pointer;border-radius:calc(var(--st-radius) * .8px);border:1px solid color-mix(in srgb,var(--st-text) 16%,transparent);background-color:var(--st-bg);color:var(--st-text);font:400 16px/1.5 var(--st-font-body);outline:none;transition:border-color .2s ease,box-shadow .2s ease}
.st-field select:focus,.st-field input[type="date"]:focus{border-color:var(--st-brand);box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 18%,transparent)}
.st-field input[type="date"]{min-height:51px}
.bk{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);align-items:start;gap:clamp(36px,5cqi,80px)}
.bk-info{display:flex;flex-direction:column;gap:30px}
.bk-head{margin:0}
.bk-sub{margin-bottom:12px;font-size:17px;letter-spacing:-.01em}
.bk-hours{display:flex;flex-direction:column;border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.bk-row{display:flex;justify-content:space-between;gap:16px;padding:11px 0;border-bottom:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);font-size:15.5px}
.bk-row dt{font-weight:600}
.bk-row dd{color:var(--st-muted);font-variant-numeric:tabular-nums}
.bk-card{padding:clamp(24px,3.4cqi,40px);border-radius:calc(var(--st-radius) * 1.3px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 7%,transparent);box-shadow:0 30px 70px -40px color-mix(in srgb,var(--st-text) 45%,transparent)}
@container st (max-width:860px){.bk{grid-template-columns:1fr}}`,
};
