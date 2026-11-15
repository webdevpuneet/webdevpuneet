/* Class Timetable: a weekly schedule for studios. Day tabs (Mon to Sun, today highlighted and chosen first), filter chips by class
   type, and rows with the time, class name, teacher, duration, level, spots left and a Book button. The "timetable" behaviour
   builds the tabs and chips from the data, sorts each day by time and shows one day at a time. Without JavaScript every class
   shows in the order typed, each with its day. */

const DAYS = [['Mon', 'Monday'], ['Tue', 'Tuesday'], ['Wed', 'Wednesday'], ['Thu', 'Thursday'], ['Fri', 'Friday'], ['Sat', 'Saturday'], ['Sun', 'Sunday']];
const C = (day, time, name, type, teacher, duration, level, spots) => ({ day, time, name, type, teacher, duration, level, spots, button: 'Book', url: '#book' });

export default {
  id: 'class-timetable',
  name: 'Class Timetable',
  version: '1.0.0',
  category: 'listings',
  tags: ['timetable', 'schedule', 'classes', 'yoga', 'fitness', 'studio', 'booking', 'weekly', 'filter', 'light'],
  created: '2026-11-15',
  updated: '2026-11-15',
  seoTitle: 'Class Timetable Section — Free Weekly Schedule HTML',
  seoDescription: 'Free weekly class timetable: day tabs that open on today, class type filters, and rows with time, teacher, level, spots left and a Book button per class.',
  description: 'A weekly schedule people can actually use. Day tabs run from Monday to Sunday with today marked and opened first, filter chips are built from your class types, and every class is a row with the time, name, teacher, duration, level, spots left and a Book button. Each day is sorted by time automatically, so you can type the classes in any order. Made for yoga, Pilates and dance studios, gyms, swimming schools and any business that runs a weekly timetable.',
  bestFor: ['Yoga, Pilates and dance studios', 'Gyms, boxing clubs and swim schools', 'Community centres and after-school clubs'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Classes' },
    { id: 'labels', label: 'Labels' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Weekly timetable' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Find *your class*' },
    { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: 'Pick a day, or filter by the kind of class you like. All levels are welcome, and your first class is free.' },
    { key: 'allTypes', group: 'labels', label: 'Label of the “all classes” chip', type: 'text', value: 'All classes' },
    { key: 'typeLabel', group: 'labels', label: 'Class types label (screen readers)', type: 'text', value: 'Class types' },
    { key: 'dayLabel', group: 'labels', label: 'Days label (screen readers)', type: 'text', value: 'Days of the week' },
    { key: 'todayLabel', group: 'labels', label: 'Text marking today', type: 'text', value: 'Today' },
    { key: 'emptyText', group: 'labels', label: 'Text when no class matches', type: 'text', value: 'No classes on this day for that class type. Try another day or choose all classes.' },
  ],
  lists: [
    {
      key: 'classes', group: 'items', label: 'Classes', itemLabel: 'Class', titleKey: 'name', min: 1, max: 60,
      fields: [
        { key: 'day', label: 'Day', type: 'choice', options: DAYS, value: 'Mon' },
        { key: 'time', label: 'Start time', type: 'text', value: '09:00', hint: 'Like 07:30 or 6:15 pm. Each day is sorted by this.' },
        { key: 'name', label: 'Class name', type: 'text', value: 'Class' },
        { key: 'type', label: 'Class type (used by the filter chips)', type: 'text', value: 'Yoga' },
        { key: 'teacher', label: 'Teacher (optional)', type: 'text', value: '' },
        { key: 'duration', label: 'Length (optional)', type: 'text', value: '60 min' },
        { key: 'level', label: 'Level (optional)', type: 'text', value: 'All levels' },
        { key: 'spots', label: 'Spots left (optional)', type: 'text', value: '', hint: 'For example “4 spots left” or “Full”. Only write what is true.' },
        { key: 'button', label: 'Button text', type: 'text', value: 'Book' },
        { key: 'url', label: 'Booking link', type: 'url', value: '#book' },
      ],
      value: [
        C('Mon', '07:00', 'Sunrise vinyasa', 'Vinyasa', 'Maya', '60 min', 'All levels', '6 spots left'),
        C('Mon', '12:15', 'Lunchtime stretch', 'Gentle', 'Sam', '45 min', 'All levels', ''),
        C('Mon', '18:30', 'Reformer pilates', 'Pilates', 'Ines', '55 min', 'Beginner', 'Full'),
        C('Tue', '09:30', 'Hatha basics', 'Hatha', 'Maya', '75 min', 'Beginner', '4 spots left'),
        C('Tue', '19:00', 'Evening meditation', 'Meditation', 'Sam', '45 min', 'All levels', ''),
        C('Wed', '07:00', 'Power vinyasa', 'Vinyasa', 'Leo', '60 min', 'Intermediate', ''),
      ],
    },
  ],
  toggles: [],
  theme: { brand: '#4a6b5a', brandText: '#ffffff', bg: '#fbf9f4', surface: '#eef2ec', text: '#1f2f27', muted: '#586a60', radius: '16' },
  fonts: { heading: 'lora', body: 'dmsans' },
  behaviors: ['timetable'],

  html: `<div class="st-wrap tt" data-tt data-set="data-all:allTypes;data-type-label:typeLabel;data-day-label:dayLabel;data-today:todayLabel;data-empty:emptyText">
  <header class="st-head tt-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-show-if="lead" data-edit="lead"></p>
  </header>
  <div class="tt-days" data-tt-days role="group"></div>
  <div class="tt-types" data-tt-types role="group"></div>
  <ul class="tt-list" data-list="classes">
    <li class="tt-row" data-anim="item" data-set="data-day:day;data-type:type;data-time:time">
      <div class="tt-when"><strong class="tt-time" data-edit="time"></strong><span class="tt-day" data-edit="day"></span><span class="tt-dur" data-show-if="duration" data-edit="duration"></span></div>
      <div class="tt-main">
        <h3 class="tt-name" data-edit="name"></h3>
        <p class="tt-who"><span data-show-if="teacher">with <span data-edit="teacher"></span></span></p>
        <p class="tt-meta"><span class="tt-chip" data-show-if="type" data-edit="type"></span><span class="tt-chip" data-show-if="level" data-edit="level"></span></p>
      </div>
      <div class="tt-side">
        <span class="tt-spots" data-show-if="spots" data-edit="spots"></span>
        <a class="st-btn tt-book" data-show-if="button" data-href="url"><span data-edit="button"></span></a>
      </div>
    </li>
  </ul>
  <p class="tt-empty" data-tt-empty hidden></p>
</div>`,
  css: `.st-class-timetable{padding:clamp(64px,8cqi,112px) 0}
.tt-head{margin-bottom:clamp(20px,3cqi,36px)}
.tt-days,.tt-types{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:14px}
.tt-days[hidden],.tt-types[hidden],.tt-empty[hidden]{display:none}
.tt-daybtn,.tt-typebtn{border:1.5px solid color-mix(in srgb,var(--st-text) 16%,transparent);background:transparent;color:var(--st-text);border-radius:99px;padding:9px 16px;font:600 14px/1 var(--st-font-body);cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.tt-daybtn{min-width:62px;display:inline-flex;flex-direction:column;align-items:center;gap:3px;border-radius:calc(var(--st-radius) * 1px);padding:10px 14px}
.tt-daybtn small{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;opacity:.75}
.tt-typebtn{padding:7px 14px;font-size:13px}
.tt-daybtn:hover,.tt-typebtn:hover{border-color:var(--st-brand)}
.tt-daybtn[aria-pressed="true"],.tt-typebtn[aria-pressed="true"]{background:var(--st-brand);border-color:var(--st-brand);color:var(--st-btn-text)}
.tt-daybtn:focus-visible,.tt-typebtn:focus-visible{outline:3px solid var(--st-brand);outline-offset:2px}
.tt-types{margin-bottom:clamp(20px,2.6cqi,32px)}
.tt-list{list-style:none;margin:0 auto;padding:0;display:flex;flex-direction:column;gap:10px;max-width:900px}
.tt-row{display:grid;grid-template-columns:110px minmax(0,1fr) auto;gap:6px clamp(14px,2cqi,26px);align-items:center;padding:clamp(14px,1.8cqi,22px);border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.tt-row[hidden]{display:none}
.tt-when{display:flex;flex-direction:column;gap:2px}
.tt-time{font:700 22px/1.1 var(--st-font-heading)}
.tt-day{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--st-brand)}
.tt-dur{font-size:13px;color:var(--st-muted)}
.tt-main{display:flex;flex-direction:column;gap:3px;min-width:0}
.tt-name{font-size:18px}
.tt-who{color:var(--st-muted);font-size:14.5px;min-height:1em}
.tt-meta{display:flex;flex-wrap:wrap;gap:6px;margin-top:3px}
.tt-chip{padding:3px 10px;border-radius:99px;background:color-mix(in srgb,var(--st-text) 7%,transparent);color:var(--st-muted);font-size:12.5px;font-weight:600}
.tt-side{display:flex;flex-direction:column;align-items:flex-end;gap:8px}
.tt-spots{font-size:13px;font-weight:700;color:var(--st-brand)}
.tt-book{padding:9px 20px;font-size:14px}
.tt-empty{text-align:center;color:var(--st-muted);padding:24px 0}
.tt[data-ready] .tt-day{display:none}
.tt-days:empty,.tt-types:empty{display:none}
@container st (max-width:640px){.tt-row{grid-template-columns:minmax(0,1fr) auto}.tt-when{grid-column:1 / -1;flex-direction:row;align-items:baseline;gap:10px}.tt-main{grid-column:1}.tt-side{grid-column:2;grid-row:2}}`,
};
