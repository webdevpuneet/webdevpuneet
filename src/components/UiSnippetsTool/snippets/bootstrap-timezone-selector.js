const bootstrapTimezoneSelector = {
  id: 'bootstrap-timezone-selector',
  title: 'Bootstrap Timezone Selector',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bstz-card">
    <div class="card-body p-3 position-relative">
      <label class="form-label small fw-semibold">Timezone</label>
      <input type="text" class="form-control" id="bstzInput" placeholder="Search city or UTC offset..." autocomplete="off">
      <div class="bstz-dropdown d-none" id="bstzDropdown"></div>
      <p class="small text-muted mt-2 mb-0" id="bstzSelected">No timezone selected.</p>
    </div>
  </div>
</div>`,
  css: `.bstz-card { width: 360px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bstz-dropdown {
  position: absolute; left: 12px; right: 12px; top: 68px; z-index: 5; max-height: 220px; overflow-y: auto;
  background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; box-shadow: 0 8px 20px rgba(20,22,28,.08);
}
.bstz-item { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 13px; cursor: pointer; }
.bstz-item:hover, .bstz-item-active { background: #f8f9fb; }
.bstz-offset { color: #9ca3af; font: 600 11.5px ui-monospace, monospace; }`,
  js: `const ZONES = [
  { city: 'San Francisco', offset: -8 }, { city: 'Denver', offset: -7 }, { city: 'Chicago', offset: -6 },
  { city: 'New York', offset: -5 }, { city: 'S\\u00e3o Paulo', offset: -3 }, { city: 'London', offset: 0 },
  { city: 'Paris', offset: 1 }, { city: 'Cairo', offset: 2 }, { city: 'Nairobi', offset: 3 },
  { city: 'Dubai', offset: 4 }, { city: 'Mumbai', offset: 5.5 }, { city: 'Dhaka', offset: 6 },
  { city: 'Bangkok', offset: 7 }, { city: 'Singapore', offset: 8 }, { city: 'Tokyo', offset: 9 },
  { city: 'Sydney', offset: 10 }, { city: 'Auckland', offset: 12 },
];

function formatOffset(offset) {
  const sign = offset >= 0 ? '+' : '-';
  const abs = Math.abs(offset);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  return 'UTC' + sign + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
}

const input = document.getElementById('bstzInput');
const dropdown = document.getElementById('bstzDropdown');
const selected = document.getElementById('bstzSelected');
let activeIndex = -1;
let visible = [];

// Repaints the dropdown from the current visible/activeIndex state — never
// recomputes the filtered list itself, so keyboard navigation can move the
// highlight without accidentally re-filtering (and re-resetting the index).
function paint() {
  dropdown.innerHTML = visible.map((z, i) =>
    '<div class="bstz-item' + (i === activeIndex ? ' bstz-item-active' : '') + '" data-index="' + i + '">' +
    '<span>' + z.city + '</span><span class="bstz-offset">' + formatOffset(z.offset) + '</span></div>'
  ).join('') || '<div class="bstz-item text-muted">No matches</div>';
  dropdown.classList.remove('d-none');
}

// Recomputes the filtered list from the query and resets the highlight —
// only called when the actual search text changes, not on every keypress.
function search(query) {
  const q = query.trim().toLowerCase();
  visible = !q ? ZONES : ZONES.filter(z =>
    z.city.toLowerCase().includes(q) || formatOffset(z.offset).toLowerCase().includes(q)
  );
  activeIndex = visible.length ? 0 : -1;
  paint();
}

function choose(zone) {
  input.value = zone.city + ' (' + formatOffset(zone.offset) + ')';
  selected.textContent = 'Selected: ' + zone.city + ', ' + formatOffset(zone.offset) + '.';
  dropdown.classList.add('d-none');
}

input.addEventListener('focus', () => search(input.value));
input.addEventListener('input', () => search(input.value));

input.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex = Math.min(activeIndex + 1, visible.length - 1);
    paint();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex = Math.max(activeIndex - 1, 0);
    paint();
  } else if (e.key === 'Enter' && visible[activeIndex]) {
    choose(visible[activeIndex]);
  }
});

dropdown.addEventListener('click', e => {
  const item = e.target.closest('.bstz-item');
  if (item && visible[Number(item.dataset.index)]) choose(visible[Number(item.dataset.index)]);
});

document.addEventListener('click', e => {
  if (!e.target.closest('.bstz-card')) dropdown.classList.add('d-none');
});`,

  seo: {
    title: 'Bootstrap Timezone Selector — Free HTML CSS JS Snippet',
    description: 'A real searchable Bootstrap 5.3 timezone picker — filter by city name or by UTC offset directly, with full keyboard navigation and correctly formatted half-hour offsets like UTC+05:30.',
    about: {
      title: 'Bootstrap Timezone Selector — HTML, CSS & JavaScript',
      description: `The search matches against two different things at once inside \`render()\` — \`z.city.toLowerCase().includes(q)\` for a name search, and \`formatOffset(z.offset).toLowerCase().includes(q)\` for searching by the offset string itself, so typing "+5:30" finds Mumbai just as reliably as typing "mumbai" does, without the user needing to know which search mode they're supposedly in.\n\n\`formatOffset()\` is the detail that trips up a naive implementation: not every timezone sits on a whole-hour boundary — India's is UTC+5:30, exactly the kind of case that breaks a formatter written assuming \`offset\` is always an integer. Splitting the absolute offset into a whole-hour part via \`Math.floor\` and a remainder minutes part via \`(abs - h) * 60\` handles both whole-hour zones and half-hour (or, in principle, 45-minute) zones with the same one function, rather than needing a special case for the unusual ones.\n\nKeyboard navigation reuses the exact same \`render()\` call the typing handler uses, which is what keeps the highlighted row and the currently filtered list from ever disagreeing — arrowing down after typing a fresh query is filtering against the list that query actually produced, not a stale one from before the last keystroke.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click the input', text: 'Every timezone appears in a dropdown, each with its city name and UTC offset.' },
        { title: 'Type "mumbai"', text: 'The list narrows to just Mumbai, showing its correctly formatted UTC+05:30 offset.' },
        { title: 'Clear the input and type "+9"', text: 'Tokyo appears, found by matching its offset string rather than its city name.' },
        { title: 'Use the arrow keys to move through the list, then press Enter', text: 'The highlighted timezone fills the input and a confirmation line appears below.' },
        { title: 'Click anywhere outside the card', text: 'The dropdown closes automatically.' },
      ],
    },
    features: [
      'Search matches both city name and the formatted UTC offset string at once',
      'Correctly formats fractional-hour offsets like UTC+05:30, not just whole-hour zones',
      'Full arrow-key navigation and Enter-to-select, staying in sync with the currently filtered list',
      'A document-level outside-click listener closes the dropdown without needing a backdrop element',
      'An explicit "no matches" state instead of an empty, confusing dropdown',
    ],
    useCases: [
      { icon: 'FORM', title: 'Scheduling, calendar, and meeting-planning tools', desc: 'Pairs with [bootstrap-calendar-event-widget](/ui-snippets/bootstrap-calendar-event-widget/) for a complete event-creation flow.' },
      { icon: 'APP', title: 'Account settings and localization preferences', desc: 'Let a user set their timezone directly by search instead of scrolling a long native <select> of every IANA zone.' },
      { icon: 'DASH', title: 'Dashboards showing data across multiple regions', desc: 'A timezone picker for filtering or displaying timestamps relative to a chosen region.' },
    ],
    faqs: [
      { q: 'Does this handle half-hour offset timezones correctly?', a: 'Yes — formatOffset() computes the whole-hour and remainder-minute parts of any offset separately, so a value like 5.5 correctly renders as UTC+05:30 rather than being truncated or mis-formatted the way a naive whole-hours-only formatter would handle it.' },
      { q: 'Can I search by offset instead of city name?', a: 'Yes — the filter checks the formatted offset string in addition to the city name, so a query like "+9" or "utc+9" matches Tokyo the same way typing "tokyo" would.' },
      { q: 'Why use a plain list of cities and offsets instead of the real IANA timezone database?', a: 'This demo uses a small illustrative list for clarity; a production version should use a real timezone database (via Intl.supportedValuesOf with "timeZone", or a library) that also correctly accounts for daylight saving time changes, which fixed numeric offsets alone cannot represent.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the query and active index in component state, derive the filtered list in the render function, and bind the same keydown handling to your framework\'s event system — the offset-formatting logic needs no changes.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to replace the small ZONES array with the browser's real Intl.supportedValuesOf('timeZone') list combined with Intl.DateTimeFormat to compute each zone's current offset (correctly accounting for daylight saving time), or to show each zone's current local time live next to its offset.`,
      prompt: `Build a Bootstrap 5.3 searchable timezone selector, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A text input that shows a dropdown of timezones (city name plus UTC offset) on focus, filtering live as the user types.
- The search must match against both the city name and the formatted offset string (e.g. typing "+9" should find a UTC+9 zone the same way typing its city name would).
- Correctly format offsets that include a fractional hour (e.g. +5:30), not just whole-hour offsets — compute the hour and minute parts separately rather than assuming every offset is a whole number.
- Support ArrowUp/ArrowDown to move a highlighted selection through the filtered list and Enter to select the highlighted item, filling the input and showing a confirmation below it.
- Close the dropdown when a click happens anywhere outside the component, and show an explicit "no matches" message when a search returns nothing.`,
    },
  },
};

export default bootstrapTimezoneSelector;
