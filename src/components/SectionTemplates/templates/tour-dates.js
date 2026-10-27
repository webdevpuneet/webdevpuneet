/* Tour dates: one row per show. Schema: MusicEvent-style Event items for every row that has an ISO date. */
const text = s => String(s ?? '').replace(/\*/g, '').trim();

export default {
  id: 'tour-dates',
  name: 'Tour Dates & Tickets',
  version: '1.0.0',
  category: 'music',
  anchor: 'tour',
  tags: ['music', 'tour', 'dates', 'tickets', 'concerts', 'gigs', 'events', 'schedule', 'dark'],
  created: '2026-10-27',
  updated: '2026-10-27',
  seoTitle: 'Tour Dates & Tickets Section — Free Concert List HTML',
  seoDescription: 'Free tour dates section: a list of shows with date, city, venue, ticket status and ticket button, plus Event structured data for search. Export the HTML.',
  description: 'A tour page in one section. Each show is a row with a big date, the city and venue, a status (Tickets, Few left, Sold out, Free) and a ticket button. Sold-out shows are dimmed, rows lift on hover, and on phones each row stacks neatly. Add an ISO date to a show and the section also writes Event structured data, so search engines can show your concerts.',
  bestFor: ['Bands, DJs and solo artists on tour', 'Festivals, club nights and residencies', 'Orchestras, choirs and theatre companies'],

  schema: state => {
    const rows = (state.lists?.shows || []).filter(r => /^\d{4}-\d{2}-\d{2}/.test(String(r.iso || '').trim()) && text(r.venue));
    return rows.length ? {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: rows.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'MusicEvent',
          name: [text(state.fields?.artist), text(r.venue)].filter(Boolean).join(' at '),
          startDate: String(r.iso).trim(),
          eventStatus: /cancel/i.test(r.status || '') ? 'https://schema.org/EventCancelled' : 'https://schema.org/EventScheduled',
          location: { '@type': 'Place', name: text(r.venue), address: text(r.city) },
          ...(/^https?:/.test(r.url || '') && { url: r.url }),
          ...(text(state.fields?.artist) && { performer: { '@type': 'MusicGroup', name: text(state.fields.artist) } }),
        },
      })),
    } : null;
  },

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Shows' },
    { id: 'footer', label: 'Note & button' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'On tour' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'See us *live*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'The Static Hearts tour: eleven shows across Europe this winter. Tickets go fast, so grab yours early.' },
    { key: 'artist', group: 'header', label: 'Artist name (for search engines)', type: 'text', value: 'Velvet Static', hint: 'Used in the Event structured data, not shown on the page.' },
    { key: 'note', group: 'footer', label: 'Note (optional)', type: 'textarea', value: 'Doors open one hour before the show. Under-16s must be with an adult. Not seeing your city? Ask us to play there.' },
    { key: 'cta', group: 'footer', label: 'Button text (optional)', type: 'text', value: 'Request a show in your city' },
    { key: 'ctaUrl', group: 'footer', label: 'Button link', type: 'url', value: '#contact' },
  ],
  lists: [{
    key: 'shows', group: 'items', label: 'Shows', itemLabel: 'Show', titleKey: 'city', min: 1, max: 30,
    fields: [
      { key: 'month', label: 'Month', type: 'text', value: 'NOV' },
      { key: 'day', label: 'Day', type: 'text', value: '14' },
      { key: 'city', label: 'City', type: 'text', value: 'Lisbon, PT' },
      { key: 'venue', label: 'Venue', type: 'text', value: 'LX Factory' },
      { key: 'status', label: 'Status', type: 'text', value: 'Tickets', hint: 'Tickets, Few left, Sold out or Free. “Sold out” turns the button off.' },
      { key: 'button', label: 'Button text', type: 'text', value: 'Get tickets' },
      { key: 'url', label: 'Ticket link', type: 'url', value: '#' },
      { key: 'iso', label: 'Date for search engines (optional)', type: 'text', value: '', hint: 'Year-month-day, for example 2026-11-14 or 2026-11-14T20:00. Adds Event structured data.' },
    ],
    value: [
      { month: 'NOV', day: '14', city: 'Lisbon, PT', venue: 'LX Factory', status: 'Sold out', button: 'Sold out', url: '#', iso: '2026-11-14T21:00' },
      { month: 'NOV', day: '16', city: 'Madrid, ES', venue: 'Sala Mon', status: 'Few left', button: 'Get tickets', url: '#', iso: '2026-11-16T21:00' },
      { month: 'NOV', day: '19', city: 'Barcelona, ES', venue: 'Razzmatazz 2', status: 'Tickets', button: 'Get tickets', url: '#', iso: '2026-11-19T20:30' },
      { month: 'NOV', day: '22', city: 'Paris, FR', venue: 'La Maroquinerie', status: 'Tickets', button: 'Get tickets', url: '#', iso: '2026-11-22T20:00' },
      { month: 'NOV', day: '27', city: 'Berlin, DE', venue: 'Lido', status: 'Tickets', button: 'Get tickets', url: '#', iso: '2026-11-27T20:00' },
      { month: 'DEC', day: '03', city: 'London, UK', venue: 'Electric Ballroom', status: 'Free', button: 'RSVP free', url: '#', iso: '2026-12-03T19:30' },
    ],
  }],
  theme: { brand: '#22d3ee', brandText: '#04121a', bg: '#07090f', surface: '#111522', text: '#f4f7fb', muted: '#a3adc2', radius: '14' },
  fonts: { heading: 'space', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <ul class="td-list" data-list="shows">
    <li class="td-row" data-anim="item" data-set="data-status:status">
      <div class="td-date" aria-hidden="false"><span class="td-month" data-edit="month"></span><strong class="td-day" data-edit="day"></strong></div>
      <div class="td-where"><strong class="td-city" data-edit="city"></strong><span class="td-venue" data-edit="venue"></span></div>
      <span class="td-status" data-set="data-status:status" data-edit="status"></span>
      <a class="td-btn" data-href="url"><span data-edit="button"></span></a>
    </li>
  </ul>
  <div class="td-foot">
    <p class="td-note" data-show-if="note" data-edit="note"></p>
    <a class="st-btn st-btn--ghost td-cta" data-href="ctaUrl" data-show-if="cta"><span data-edit="cta"></span></a>
  </div>
</div>`,
  css: `.st-tour-dates{padding:clamp(56px,7cqi,104px) 0}
.td-list{list-style:none;display:flex;flex-direction:column;border-top:1px solid color-mix(in srgb,var(--st-text) 12%,transparent)}
.td-row{display:grid;grid-template-columns:92px minmax(0,1fr) auto auto;align-items:center;gap:clamp(14px,2.4cqi,32px);padding:clamp(16px,2cqi,24px) clamp(4px,1cqi,16px);border-bottom:1px solid color-mix(in srgb,var(--st-text) 12%,transparent);transition:background .25s ease,padding .25s ease}
.td-row:hover{background:color-mix(in srgb,var(--st-brand) 7%,transparent)}
.td-date{display:flex;flex-direction:column;align-items:center;line-height:1;gap:4px;padding:10px 0;border-radius:calc(var(--st-radius) * .8px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.td-month{font-size:12px;font-weight:800;letter-spacing:.14em;color:var(--st-brand)}
.td-day{font:700 34px/1 var(--st-font-heading)}
.td-where{display:flex;flex-direction:column;gap:3px;min-width:0}
.td-city{font:700 clamp(19px,.9cqi + 14px,26px)/1.2 var(--st-font-heading)}
.td-venue{color:var(--st-muted);font-size:15.5px}
.td-status{font-size:12.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 12px;border-radius:999px;color:var(--st-muted);border:1px solid color-mix(in srgb,var(--st-text) 18%,transparent);white-space:nowrap}
.td-status[data-status="Few left"]{color:#fbbf24;border-color:color-mix(in srgb,#fbbf24 55%,transparent)}
.td-status[data-status="Free"]{color:#4ade80;border-color:color-mix(in srgb,#4ade80 55%,transparent)}
.td-status[data-status="Sold out"]{color:#f87171;border-color:color-mix(in srgb,#f87171 50%,transparent)}
.td-btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 22px;border-radius:999px;background:var(--st-brand);color:var(--st-btn-text);font-weight:700;font-size:15px;text-decoration:none;white-space:nowrap;transition:transform .2s ease,box-shadow .2s ease}
.td-btn:hover,.td-btn:focus-visible{transform:translateY(-2px);box-shadow:0 10px 24px -10px var(--st-brand);outline:none}
.td-row[data-status="Sold out"] .td-where,.td-row[data-status="Sold out"] .td-date{opacity:.55}
.td-row[data-status="Sold out"] .td-btn{background:transparent;color:var(--st-muted);border:1px solid color-mix(in srgb,var(--st-text) 20%,transparent);pointer-events:none}
.td-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px 32px;margin-top:clamp(20px,2.6cqi,32px)}
.td-note{color:var(--st-muted);font-size:15px;max-width:44em}
@container st (max-width:720px){.td-row{grid-template-columns:76px minmax(0,1fr);grid-template-areas:"date where" "status btn"}.td-date{grid-area:date}.td-where{grid-area:where}.td-status{grid-area:status;justify-self:start}.td-btn{grid-area:btn;justify-self:end}}`,
};
