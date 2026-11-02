export default {
  id: 'save-the-date',
  name: 'Save the Date',
  version: '1.0.0',
  category: 'events',
  tags: ['save-the-date', 'event', 'invitation', 'date', 'elegant', 'wedding', 'light'],
  created: '2026-11-02',
  updated: '2026-11-02',
  seoTitle: 'Save the Date Post Template — Free Event Announcement',
  seoDescription: 'Free save the date post template with an elegant double frame: a huge date, the event name, time and place, and an invitation-to-follow note. Download any size.',
  description: 'An elegant save-the-date card in a double gold frame: a "save the date" label, the event name, a very large date and year, time and place details, an "invitation to follow" note and your handle.',
  bestFor: ['Conferences, galas and launch parties', 'Weddings and milestone celebrations', 'Early date announcements before tickets open'],
  fonts: { heading: 'playfair', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Background', value: '#f8f2e6' },
    { key: 'text', label: 'Text', value: '#2a2118' },
    { key: 'accent', label: 'Gold', value: '#a9772b' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'Save the date' },
    { key: 'title', label: 'Event name', type: 'textarea', value: 'The *Autumn* Design Gala' },
    { key: 'date', label: 'Date', type: 'text', value: '14 March' },
    { key: 'year', label: 'Year', type: 'text', value: '2027' },
    { key: 'details', label: 'Time and place', type: 'textarea', value: '7 pm · The Glasshouse, Lisbon' },
    { key: 'note', label: 'Note', type: 'text', value: 'Formal invitation to follow' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="sd">
  <div class="sd-frame" aria-hidden="true" data-anim="settle"></div>
  <span class="sd-label" data-edit="label"></span>
  <h2 class="sd-title" data-edit="title" data-fit></h2>
  <div class="sd-when">
    <span class="sd-rule" aria-hidden="true" data-anim="draw-x" data-origin="50% 50%" data-at="1.0"></span>
    <b class="sd-date" data-edit="date"></b>
    <span class="sd-year" data-edit="year"></span>
    <span class="sd-rule" aria-hidden="true" data-anim="draw-x" data-origin="50% 50%" data-at="1.5"></span>
  </div>
  <p class="sd-details" data-edit="details"></p>
  <div class="sd-foot"><span class="sd-note" data-edit="note"></span><span class="sd-handle" data-edit="handle"></span></div>
</div>`,
  css: `.sd{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:calc(var(--u)*3.4);padding:calc(var(--pt) + var(--u)*5) calc(var(--pad) + var(--u)*3) calc(var(--pb) + var(--u)*5);background:var(--bg);text-align:center}
.sd-frame{position:absolute;inset:calc(var(--u)*3.4);border:calc(var(--u)*.45) solid var(--accent);box-shadow:inset 0 0 0 calc(var(--u)*1.1) var(--bg),inset 0 0 0 calc(var(--u)*1.5) color-mix(in srgb,var(--accent) 55%,transparent);pointer-events:none}
.sd>*:not(.sd-frame){position:relative}
.sd-label{font-size:calc(var(--u)*3);font-weight:700;text-transform:uppercase;letter-spacing:.42em;color:var(--accent);padding-left:.42em}
.sd-title{text-wrap:balance;font-family:var(--font-heading);font-size:calc(var(--u)*8.2);line-height:1.1;font-weight:600;font-style:italic}
.sd-when{display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*1.4);width:100%}
.sd-rule{width:calc(var(--u)*18);height:calc(var(--u)*.4);background:var(--accent);opacity:.8}
.sd-date{font-family:var(--font-heading);font-size:calc(var(--u)*17);line-height:1;font-weight:700;letter-spacing:-.02em;margin-top:calc(var(--u)*1.6)}
.sd-year{font-size:calc(var(--u)*4.6);font-weight:700;letter-spacing:.4em;color:var(--accent);padding-left:.4em;margin-bottom:calc(var(--u)*1.6)}
.sd-details{font-size:calc(var(--u)*3.6);line-height:1.5;font-weight:500;opacity:.85}
.sd-foot{position:absolute!important;left:0;right:0;bottom:calc(var(--pb) + var(--u)*1);display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*.8);font-size:calc(var(--u)*2.8)}
.sd-note{font-style:italic;opacity:.7}
.sd-handle{font-weight:800;color:var(--accent);letter-spacing:.06em}
.is-landscape .sd-date{font-size:calc(var(--u)*13)}
.is-landscape .sd-title{font-size:calc(var(--u)*6.6)}
.is-landscape .sd{gap:calc(var(--u)*2.4)}
.is-square .sd{gap:calc(var(--u)*2.4)}
.is-square .sd-title{font-size:calc(var(--u)*6.6)}
.is-square .sd-date{font-size:calc(var(--u)*13)}
.is-square .sd-year{font-size:calc(var(--u)*4)}
.is-square .sd-details{font-size:calc(var(--u)*3.2)}`,
};
