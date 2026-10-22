export default {
  id: 'class-timetable',
  name: 'Class Timetable',
  version: '1.0.0',
  category: 'listings',
  anchor: 'timetable',
  tags: ['timetable', 'schedule', 'classes', 'gym', 'fitness', 'school', 'table', 'dark'],
  created: '2026-10-22',
  updated: '2026-10-22',
  seoTitle: 'Class Timetable Section Template — Free HTML Schedule Table',
  seoDescription: 'Free class timetable section: a schedule table with day, time, class, coach and level that turns into cards on phones. For gyms, studios, schools; export HTML.',
  description: 'A weekly schedule for classes, sessions or events. Rows show the day, time, class name, coach or teacher and a level badge in an accessible table on larger screens; on phones each row becomes a labelled card. A note and a booking button sit underneath. Column headings are editable, so it works for gyms, yoga studios, dance and music schools, courses and conferences.',
  bestFor: ['Gyms, yoga and fitness studios', 'Dance, music and language schools', 'Courses, workshops and event agendas'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'columns', label: 'Column headings' },
    { id: 'items', label: 'Classes' },
    { id: 'footer', label: 'Note & button' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'This week' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Find a class that *fits your week*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Every class is coached and scaled to your level. Book a spot in the app or at the front desk.' },
    { key: 'colDay', group: 'columns', label: 'Day column', type: 'text', value: 'Day' },
    { key: 'colTime', group: 'columns', label: 'Time column', type: 'text', value: 'Time' },
    { key: 'colName', group: 'columns', label: 'Class column', type: 'text', value: 'Class' },
    { key: 'colCoach', group: 'columns', label: 'Coach column', type: 'text', value: 'Coach' },
    { key: 'colLevel', group: 'columns', label: 'Level column', type: 'text', value: 'Level' },
    { key: 'note', group: 'footer', label: 'Note (optional)', type: 'textarea', value: 'Arrive 10 minutes early for your first class. Timetable changes are posted in the app.' },
    { key: 'cta', group: 'footer', label: 'Button text (optional)', type: 'text', value: 'Book a free class' },
    { key: 'ctaUrl', group: 'footer', label: 'Button link', type: 'url', value: '#contact' },
  ],
  lists: [{
    key: 'classes', group: 'items', label: 'Classes', itemLabel: 'Class', titleKey: 'name', min: 1, max: 40,
    fields: [
      { key: 'day', label: 'Day', type: 'text', value: 'Monday' },
      { key: 'time', label: 'Time', type: 'text', value: '07:00 – 07:45' },
      { key: 'name', label: 'Class', type: 'text', value: 'A class' },
      { key: 'coach', label: 'Coach (optional)', type: 'text', value: '' },
      { key: 'level', label: 'Level (optional)', type: 'text', value: 'All levels' },
    ],
    value: [
      { day: 'Monday', time: '06:30 – 07:15', name: 'HIIT Express', coach: 'Zara Ahmed', level: 'All levels' },
      { day: 'Monday', time: '18:30 – 19:30', name: 'Strength Foundations', coach: 'Marcus Webb', level: 'Beginner' },
      { day: 'Tuesday', time: '07:00 – 07:45', name: 'Mobility & Core', coach: 'Lena Fischer', level: 'All levels' },
      { day: 'Wednesday', time: '18:00 – 19:00', name: 'Barbell Club', coach: 'Marcus Webb', level: 'Advanced' },
      { day: 'Thursday', time: '12:15 – 12:45', name: 'Lunch Burn', coach: 'Ben Carter', level: 'All levels' },
      { day: 'Saturday', time: '09:00 – 10:00', name: 'Outdoor Bootcamp', coach: 'Zara Ahmed', level: 'Intermediate' },
    ],
  }],
  theme: { brand: '#a3e635', brandText: '#0a0a0a', bg: '#0a0a0a', surface: '#161616', text: '#fafafa', muted: '#a3a3a3', radius: '10' },
  fonts: { heading: 'oswald', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="tt-box" data-anim="media">
    <table class="tt">
      <thead>
        <tr><th scope="col" data-edit="colDay"></th><th scope="col" data-edit="colTime"></th><th scope="col" data-edit="colName"></th><th scope="col" data-edit="colCoach"></th><th scope="col" data-edit="colLevel"></th></tr>
      </thead>
      <tbody data-list="classes">
        <tr class="tt-row">
          <td class="tt-day" data-set="data-label:colDay" data-edit="day"></td>
          <td class="tt-time" data-set="data-label:colTime" data-edit="time"></td>
          <th class="tt-name" scope="row" data-set="data-label:colName" data-edit="name"></th>
          <td class="tt-coach" data-set="data-label:colCoach" data-edit="coach"></td>
          <td class="tt-level-cell" data-set="data-label:colLevel"><span class="tt-level" data-show-if="level" data-edit="level"></span></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="tt-foot" data-anim="item">
    <p class="tt-note" data-edit="note"></p>
    <a class="st-btn" data-href="ctaUrl" data-show-if="cta"><span data-edit="cta"></span></a>
  </div>
</div>`,
  css: `.st-class-timetable{padding:clamp(64px,8cqi,112px) 0}
.tt-box{max-width:1080px;margin:0 auto;overflow:hidden;border-radius:calc(var(--st-radius) * 1.4px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.tt{width:100%;border-collapse:collapse;font-size:15.5px}
.tt th,.tt td{padding:16px 20px;text-align:left;vertical-align:middle}
.tt thead th{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--st-muted);border-bottom:1px solid color-mix(in srgb,var(--st-text) 12%,transparent)}
.tt tbody tr+tr{border-top:1px solid color-mix(in srgb,var(--st-text) 7%,transparent)}
.tt tbody tr:hover{background:color-mix(in srgb,var(--st-brand) 6%,transparent)}
.tt-day{font-weight:700}
.tt-time{font-variant-numeric:tabular-nums;color:var(--st-muted);white-space:nowrap}
.tt-name{font:600 17px/1.3 var(--st-font-heading);letter-spacing:.01em}
.tt-coach{color:var(--st-muted)}
.tt-level{display:inline-block;padding:4px 10px;border-radius:999px;background:color-mix(in srgb,var(--st-brand) 16%,transparent);color:var(--st-brand);font-size:12.5px;font-weight:700;white-space:nowrap}
.tt-foot{display:flex;flex-direction:column;align-items:center;gap:18px;margin-top:clamp(32px,4cqi,52px);text-align:center}
.tt-note{color:var(--st-muted);font-size:14px;max-width:44em}
@container st (max-width:720px){
.tt-box{background:none;border:0;border-radius:0}
.tt thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.tt,.tt tbody{display:block}
.tt tbody{display:grid;gap:12px}
.tt tbody tr{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;padding:16px 18px;border:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)!important;border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-surface)}
.tt th,.tt td{display:contents}
.tt tbody [data-label]::before{content:attr(data-label);font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--st-muted);align-self:center}
}`,
};
