const bootstrapDateRangePicker = {
  id: 'bootstrap-date-range-picker',
  title: 'Bootstrap Date Range Picker',
  lastmod: '2026-09-10',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsdr-card">
    <div class="card-body p-4">
      <h5 class="fw-bold mb-3">Select a date range</h5>

      <div class="row g-2 mb-3">
        <div class="col-6">
          <label class="form-label small text-muted mb-1">Start date</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi"></i>From</span>
            <input type="date" class="form-control" id="bsdrStart">
          </div>
        </div>
        <div class="col-6">
          <label class="form-label small text-muted mb-1">End date</label>
          <div class="input-group">
            <span class="input-group-text">To</span>
            <input type="date" class="form-control" id="bsdrEnd">
          </div>
        </div>
      </div>

      <div class="d-flex gap-2 flex-wrap mb-3">
        <button type="button" class="btn btn-outline-secondary btn-sm" id="bsdrToday">Today</button>
        <button type="button" class="btn btn-outline-secondary btn-sm" id="bsdrLast7">Last 7 Days</button>
        <button type="button" class="btn btn-outline-secondary btn-sm" id="bsdrThisMonth">This Month</button>
      </div>

      <div id="bsdrError" class="alert alert-danger py-2 small d-none" role="alert">End date cannot be before the start date.</div>
      <p class="small text-muted mb-0" id="bsdrSummary">Pick a start and end date, or use a quick-select button above.</p>
    </div>
  </div>
</div>`,
  css: `.bsdr-card { width: 460px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsdr-card .input-group-text { min-width: 64px; }`,
  js: `const startInput = document.getElementById('bsdrStart');
const endInput = document.getElementById('bsdrEnd');
const errorBox = document.getElementById('bsdrError');
const summary = document.getElementById('bsdrSummary');

function toISO(date) {
  return date.toISOString().slice(0, 10);
}

function msPerDay() {
  return 24 * 60 * 60 * 1000;
}

// Parsing "YYYY-MM-DD" as UTC avoids the off-by-one-day bug that shows up
// when new Date('2026-09-10') is compared against local-timezone dates.
function parseISO(value) {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function evaluate() {
  const startVal = startInput.value;
  const endVal = endInput.value;

  if (!startVal || !endVal) {
    errorBox.classList.add('d-none');
    summary.textContent = 'Pick a start and end date, or use a quick-select button above.';
    return;
  }

  const start = parseISO(startVal);
  const end = parseISO(endVal);

  if (end < start) {
    errorBox.classList.remove('d-none');
    summary.textContent = '';
    return;
  }

  errorBox.classList.add('d-none');
  const days = Math.round((end - start) / msPerDay()) + 1;
  summary.textContent = days + (days === 1 ? ' day selected' : ' days selected');
}

startInput.addEventListener('input', evaluate);
endInput.addEventListener('input', evaluate);

document.getElementById('bsdrToday').addEventListener('click', () => {
  const now = new Date();
  const iso = toISO(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));
  startInput.value = iso;
  endInput.value = iso;
  evaluate();
});

document.getElementById('bsdrLast7').addEventListener('click', () => {
  const now = new Date();
  const end = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const start = new Date(end.getTime() - 6 * msPerDay());
  startInput.value = toISO(start);
  endInput.value = toISO(end);
  evaluate();
});

document.getElementById('bsdrThisMonth').addEventListener('click', () => {
  const now = new Date();
  const start = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
  const end = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 0));
  startInput.value = toISO(start);
  endInput.value = toISO(end);
  evaluate();
});`,

  seo: {
    title: 'Bootstrap Date Range Picker — Free HTML CSS JS Snippet',
    description: `A real Bootstrap 5.3 input-group date range picker with quick-select presets, UTC-safe day-count math, and inline validation. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Bootstrap Date Range Picker — HTML, CSS & JavaScript',
      description: `A date range picker is more than two \`type="date"\` inputs sitting next to each other — the moment you add quick presets and a computed day count, you run into a surprisingly common bug: comparing dates parsed with \`new Date('2026-09-10')\` against dates built with \`Date.UTC()\` silently shifts by a day depending on the browser's local timezone. This snippet sidesteps that entirely with a small \`parseISO()\` helper that manually splits the \`YYYY-MM-DD\` string and rebuilds it with \`Date.UTC(y, m - 1, d)\`, so every comparison in \`evaluate()\` happens in a single consistent timezone regardless of where the browser is running.\n\nThe markup itself is two real Bootstrap \`input-group\` blocks, each pairing an \`input-group-text\` label with a native \`type="date"\` field inside a \`.bsdr-card\` styled with Bootstrap's own card component plus a handful of additive CSS rules (fixed width, a light border, a minimum label width) — no custom widget is built from scratch. Below the inputs sits a row of \`btn btn-outline-secondary btn-sm\` preset buttons: Today, Last 7 Days, and This Month. Each one computes a UTC start and end date and writes ISO strings directly into the two date inputs' \`.value\` properties, then calls the same \`evaluate()\` function the manual inputs use, so presets and typed input share one validation path instead of duplicating logic.\n\n\`evaluate()\` runs on every \`input\` event from either field. It first handles the case where either field is empty by resetting to the neutral helper text. Once both dates are present, it compares the parsed UTC values: if the end date falls before the start date, an \`alert alert-danger\` box is revealed (via toggling the \`d-none\` class) and the summary text is cleared, so the two messages never show at once. When the range is valid, the day count is computed as \`Math.round((end - start) / msPerDay()) + 1\` — the \`+ 1\` is the inclusive-range fix that a lot of naive implementations miss, since a range from the 1st to the 1st is one day, not zero, and a range from the 1st to the 3rd is three days, not two.\n\nThe This Month preset is a good example of correct calendar-month-end handling: it builds the end date as \`Date.UTC(year, month + 1, 0)\`, which JavaScript resolves to the last day of the current month regardless of whether that month has 28, 30, or 31 days, avoiding a hardcoded day count that would break for February.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Two empty date fields and three preset buttons appear inside a bordered card, with helper text below.' },
        { title: 'Click "Last 7 Days"', text: 'Both date fields fill in instantly and the summary line updates to read "7 days selected".' },
        { title: 'Click "This Month"', text: 'The start field jumps to the 1st of the current month and the end field jumps to the correct last day of that month.' },
        { title: 'Manually set an end date before the start date', text: 'A red alert box appears immediately: "End date cannot be before the start date," and the day-count text disappears.' },
        { title: 'Fix the end date', text: 'The alert vanishes as soon as the range becomes valid again, and the "N days selected" label recalculates on every keystroke.' },
      ],
    },
    features: [
      'Two real Bootstrap input-group fields using native type="date" inputs',
      'Three quick-select preset buttons: Today, Last 7 Days, This Month',
      'UTC-based date parsing that avoids timezone off-by-one-day bugs',
      'Inclusive day-count calculation (start to end counts both endpoints)',
      'Calendar-aware month-end calculation for the This Month preset',
      'Live inline validation with a Bootstrap alert-danger box',
      'Shared evaluate() logic used by both manual typing and preset buttons',
      'Helper text resets to a neutral prompt when either field is empty',
    ],
    useCases: [
      { icon: 'FORM', title: 'Booking and reservation forms', desc: `Check-in/check-out date selection for hotel, rental, or event booking flows, similar in spirit to the date logic used alongside a [cookie consent banner](/ui-snippets/bootstrap-cookie-consent-offcanvas/) on a booking site.` },
      { icon: 'FILTER', title: 'Analytics dashboard filters', desc: `Pair this with a [filter sidebar](/ui-snippets/bootstrap-filter-sidebar-offcanvas/) to let users scope a report or chart to a custom date window.` },
      { icon: 'FORM', title: 'Expense and invoice reporting', desc: 'Let finance users pull transactions or invoices within a specific start-to-end window, with the day count confirming the range size before running a report.' },
      { icon: 'LEARN', title: 'Learning UTC-safe date handling', desc: 'A concrete example of why parsing dates as UTC prevents the timezone off-by-one bug that trips up many date range implementations.' },
      { icon: 'APP', title: 'HR and leave-request tools', desc: `Combine with a [stepper wizard form](/ui-snippets/bootstrap-stepper-wizard-form/) so an employee picks their leave range in one step of a multi-step request.` },
    ],
    faqs: [
      { q: 'Why does the snippet parse dates manually instead of using new Date(string)?', a: `Calling new Date('2026-09-10') interprets the string in the browser's local timezone, which can silently shift the date backward by a day in timezones behind UTC. The parseISO() helper splits the string and rebuilds it with Date.UTC(), keeping every comparison in one consistent timezone.` },
      { q: 'Why is the day count end minus start plus one, not just the difference?', a: 'A range that starts and ends on the same date represents one day, not zero, and both endpoints should be counted as included days. Subtracting the millisecond difference alone would undercount every range by one day.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — move the date state into useState (React) or a ref/reactive value (Vue onMounted, Angular ngAfterViewInit), replace direct DOM writes to startInput.value with state updates, and keep evaluate() as a pure function called from an onChange handler bound to each date input.', },
      { q: 'Does this validate that the dates are real calendar dates?', a: 'Native type="date" inputs already restrict entry to valid calendar dates via the browser\'s built-in date picker UI, so this snippet only needs to validate the relationship between the two chosen dates, not their individual validity.' },
      { q: 'How would I export this to Tailwind CSS?', a: 'Replace the Bootstrap input-group, card, and btn-outline-secondary classes with Tailwind utility equivalents (flex, border, rounded-lg, px-3 py-1.5) and keep the JavaScript logic in evaluate() completely unchanged, since none of the date math depends on Bootstrap.' },
      { q: 'What happens if only one date field is filled in?', a: 'evaluate() detects the missing value and resets the alert to hidden and the summary text to the neutral prompt, so no half-finished error state or stale day count is ever shown while the user is still picking dates.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to add a "Last 30 Days" or "Last Quarter" preset, or to disable end dates before the currently selected start date directly on the input's min attribute so an invalid range can't be picked in the first place. It's also worth asking it to persist the last-used range to localStorage.`,
      prompt: `Build a Bootstrap 5.3 date range picker using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- Two real Bootstrap input-group fields, each with a label span and a native type="date" input, for start and end date.
- Three quick-select buttons (Today, Last 7 Days, This Month) that programmatically set both date fields using UTC-based date math to avoid timezone bugs.
- Live validation on every input event from either field: if the end date is before the start date, show a Bootstrap alert-danger box and hide any day-count summary.
- When the range is valid, compute and display an inclusive day count ("N days selected") that counts both the start and end date.
- The This Month preset must correctly compute the last day of the current calendar month regardless of month length.`,
    },
  },
};

export default bootstrapDateRangePicker;
