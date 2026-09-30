const bootstrapCalendarEventWidget = {
  id: 'bootstrap-calendar-event-widget',
  title: 'Bootstrap Calendar Event Widget',
  lastmod: '2026-09-10',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5">
  <div class="card bcal-card mx-auto">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <button class="btn btn-sm btn-outline-secondary" id="bcalPrev">&laquo; Prev</button>
        <h5 class="fw-bold mb-0" id="bcalMonthLabel">Month Year</h5>
        <button class="btn btn-sm btn-outline-secondary" id="bcalNext">Next &raquo;</button>
      </div>

      <div class="row row-cols-7 g-1 text-center small text-muted fw-semibold mb-1">
        <div class="col">Sun</div><div class="col">Mon</div><div class="col">Tue</div><div class="col">Wed</div><div class="col">Thu</div><div class="col">Fri</div><div class="col">Sat</div>
      </div>
      <div class="row row-cols-7 g-1" id="bcalGrid"></div>

      <hr>
      <h6 class="fw-bold mb-2" id="bcalEventsLabel">Select a date</h6>
      <ul class="list-group list-group-flush" id="bcalEventsList"></ul>
    </div>
  </div>
</div>`,
  css: `.bcal-card { max-width: 480px; border: 1px solid #eceef1; border-radius: 14px; }
.bcal-day { aspect-ratio: 1 / 1; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; font-size: 0.85rem; position: relative; border: 1px solid transparent; }
.bcal-day:hover { background: #f1f3f5; }
.bcal-day.bcal-muted { color: #ced4da; cursor: default; }
.bcal-day.bcal-muted:hover { background: transparent; }
.bcal-day.bcal-selected { background: #212529; color: #fff; }
.bcal-day.bcal-today { border-color: #212529; }
.bcal-dot { width: 5px; height: 5px; border-radius: 50%; background: #d9480f; position: absolute; bottom: 4px; }
.bcal-day.bcal-selected .bcal-dot { background: #fff; }`,
  js: `const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// key format: 'YYYY-M-D'
const EVENTS = {};
function addEvent(y, m, d, text) {
  const key = y + '-' + m + '-' + d;
  if (!EVENTS[key]) EVENTS[key] = [];
  EVENTS[key].push(text);
}

const today = new Date();
let viewYear = today.getFullYear();
let viewMonth = today.getMonth();
let selectedKey = null;

// Seed a few sample events relative to the current month so the widget always has something to show.
addEvent(viewYear, viewMonth, today.getDate(), 'Team standup — 9:00 AM');
addEvent(viewYear, viewMonth, today.getDate(), 'Design review — 2:00 PM');
addEvent(viewYear, viewMonth, Math.min(28, today.getDate() + 3), 'Client call');
addEvent(viewYear, viewMonth, Math.max(1, today.getDate() - 4), 'Sprint planning');

const monthLabel = document.getElementById('bcalMonthLabel');
const grid = document.getElementById('bcalGrid');
const eventsLabel = document.getElementById('bcalEventsLabel');
const eventsList = document.getElementById('bcalEventsList');

function renderEventsFor(y, m, d) {
  const key = y + '-' + m + '-' + d;
  eventsLabel.textContent = MONTH_NAMES[m] + ' ' + d + ', ' + y;
  eventsList.innerHTML = '';
  const items = EVENTS[key] || [];
  if (items.length === 0) {
    eventsList.innerHTML = '<li class="list-group-item text-muted small">No events for this day.</li>';
    return;
  }
  items.forEach(text => {
    const li = document.createElement('li');
    li.className = 'list-group-item small';
    li.textContent = text;
    eventsList.appendChild(li);
  });
}

function render() {
  monthLabel.textContent = MONTH_NAMES[viewMonth] + ' ' + viewYear;
  grid.innerHTML = '';

  const firstDayOffset = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const totalCells = Math.ceil((firstDayOffset + daysInMonth) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    const cellNum = i - firstDayOffset + 1;
    const col = document.createElement('div');
    col.className = 'col';
    const day = document.createElement('div');
    day.className = 'bcal-day';

    let cellDate, cellMonth, cellYear, inMonth;
    if (cellNum < 1) {
      cellDate = daysInPrevMonth + cellNum;
      cellMonth = viewMonth - 1;
      cellYear = viewYear;
      inMonth = false;
    } else if (cellNum > daysInMonth) {
      cellDate = cellNum - daysInMonth;
      cellMonth = viewMonth + 1;
      cellYear = viewYear;
      inMonth = false;
    } else {
      cellDate = cellNum;
      cellMonth = viewMonth;
      cellYear = viewYear;
      inMonth = true;
    }

    const normMonth = ((cellMonth % 12) + 12) % 12;
    const normYear = cellYear + Math.floor(cellMonth / 12) - (cellMonth < 0 ? 1 : 0);

    day.textContent = cellDate;

    if (!inMonth) {
      day.classList.add('bcal-muted');
    } else {
      const isToday = normYear === today.getFullYear() && normMonth === today.getMonth() && cellDate === today.getDate();
      if (isToday) day.classList.add('bcal-today');

      const key = normYear + '-' + normMonth + '-' + cellDate;
      if (EVENTS[key] && EVENTS[key].length) {
        const dot = document.createElement('span');
        dot.className = 'bcal-dot';
        day.appendChild(dot);
      }
      if (key === selectedKey) day.classList.add('bcal-selected');

      day.addEventListener('click', () => {
        selectedKey = key;
        render();
        renderEventsFor(normYear, normMonth, cellDate);
      });
    }

    col.appendChild(day);
    grid.appendChild(col);
  }
}

document.getElementById('bcalPrev').addEventListener('click', () => {
  viewMonth -= 1;
  if (viewMonth < 0) { viewMonth = 11; viewYear -= 1; }
  render();
});

document.getElementById('bcalNext').addEventListener('click', () => {
  viewMonth += 1;
  if (viewMonth > 11) { viewMonth = 0; viewYear += 1; }
  render();
});

selectedKey = viewYear + '-' + viewMonth + '-' + today.getDate();
render();
renderEventsFor(viewYear, viewMonth, today.getDate());`,
  seo: {
    title: 'Bootstrap Calendar Event Widget — Free Snippet',
    description: 'A real month-grid calendar built from JS Date math with correct day offsets, Prev/Next nav, event dots, and a click-to-reveal day list. Export to React & Vue.',
    about: {
      title: 'Bootstrap Calendar Event Widget — HTML, CSS & JavaScript',
      description: `Building a correct month grid is mostly a date-math problem, and this snippet solves it the same way a real calendar library would: by asking JavaScript's own \`Date\` object for the answers instead of hardcoding a 7x5 layout. \`new Date(viewYear, viewMonth, 1).getDay()\` gives the weekday the month starts on (its offset into the first week), and \`new Date(viewYear, viewMonth + 1, 0).getDate()\` — the zero-th day of next month — gives the exact number of days in the current month, correctly handling 28, 29, 30, and 31-day months (including leap-year February) with no lookup table.\n\nThe grid is built from a single \`render()\` function that computes \`totalCells\` as the offset plus the days in month, rounded up to the next multiple of 7 with \`Math.ceil(... / 7) * 7\`, guaranteeing a clean rectangular grid every month regardless of how many weeks it spans. For each cell index, a small piece of arithmetic decides whether it falls before the 1st (rendered as a muted trailing day from the previous month, using \`daysInPrevMonth\`), after the last day (a muted leading day from next month), or inside the current month — and normalizes month/year rollover with \`((cellMonth % 12) + 12) % 12\` so that December of one year correctly wraps to January of the next without producing a negative month index, which is the kind of off-by-one that breaks naive calendar implementations at year boundaries.\n\nEvents are stored in a plain \`EVENTS\` object keyed by a \`"YYYY-M-D"\` string built via \`addEvent()\`, deliberately not a Date object, since Date equality by reference makes objects a poor map key. Any in-month day whose key has entries gets a small orange \`.bcal-dot\` appended as a child element — a real DOM node, not a background-image trick — so it survives the grid being rebuilt on every render. Clicking a day sets \`selectedKey\`, re-runs \`render()\` so the selection highlight (\`.bcal-selected\`) repaints correctly, and calls \`renderEventsFor()\` to populate a Bootstrap \`list-group-flush\` beneath the grid with that day's events, or a muted "No events for this day" message when the list is empty.\n\nPrev/Next navigation simply decrements or increments \`viewMonth\` and lets the same normalization logic used for date math roll \`viewYear\` when \`viewMonth\` goes below 0 or above 11, then calls \`render()\` again — the entire grid, including which cells are muted and which carry event dots, is recomputed from scratch on every navigation rather than incrementally patched, which keeps the logic simple and correct at the cost of a full re-render (cheap for a 42-cell grid).\n\nBecause \`render()\` and \`renderEventsFor()\` never hold state outside two plain variables (\`viewYear\`, \`viewMonth\`) and a selection key, the whole widget maps cleanly onto React \`useState\`, Vue \`ref\`s, or Angular component properties, with the render function becoming a derived JSX/template expression instead of imperative \`innerHTML\` writes.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A full month grid for the current month appears, correctly aligned so the 1st falls under its real weekday, with today\'s date outlined and a couple of days showing a small orange event dot.' },
        { title: 'Click a date with a dot', text: 'The events list below the calendar updates to show that day\'s specific events, and the clicked date is highlighted dark.' },
        { title: 'Click a date without a dot', text: 'The events list updates to show "No events for this day" instead of leaving the previous selection\'s events visible.' },
        { title: 'Click Next', text: 'The grid regenerates for the following month, correctly recalculating which weekday the 1st falls on and how many days the new month has.' },
        { title: 'Click Prev repeatedly past January', text: 'The year label decrements and the month wraps to December, proving the month/year rollover math handles year boundaries correctly.' },
      ],
    },
    features: [
      'Month grid generated entirely from JS Date math, no hardcoded day-of-week or days-in-month tables',
      'Correctly handles 28/29/30/31-day months including leap-year February',
      'Leading and trailing days from adjacent months shown muted, rounding the grid to full weeks',
      'Prev/Next buttons regenerate the entire grid with correct month/year rollover at year boundaries',
      'Events keyed by a plain YYYY-M-D string rather than Date object identity for reliable lookups',
      'Real DOM dot indicators on dates with events, rebuilt correctly on every re-render',
      'Clicking a date reveals that day\'s events in a Bootstrap list-group-flush below the grid',
      'Today\'s date visually outlined independent of whether it is currently selected',
    ],
    useCases: [
      { icon: 'DASHBOARD', title: 'Team scheduling dashboards', desc: 'Drop this next to an [admin dashboard sidebar](/ui-snippets/bootstrap-admin-dashboard-sidebar/) as a compact team calendar widget.' },
      { icon: 'DASHBOARD', title: 'Scheduling across time zones', desc: 'Pair with [bootstrap-timezone-selector](/ui-snippets/bootstrap-timezone-selector/) so an event\'s time is clear to attendees in a different region.' },
      { icon: 'APP', title: 'Booking and appointment apps', desc: 'Use the date-click-to-reveal pattern as the base for a slot picker, similar in interaction spirit to a [table row selection](/ui-snippets/bootstrap-table-row-selection/) list.' },
      { icon: 'LEARN', title: 'Learning calendar date math', desc: 'A clear, dependency-free reference for computing day offsets, days-in-month, and month/year rollover with the native Date object.' },
      { icon: 'FLOW', title: 'Project and sprint planning views', desc: 'Pair with a [kanban board](/ui-snippets/bootstrap-kanban-board-cards/) to show sprint milestones on a calendar alongside the task board.' },
      { icon: 'CHAT', title: 'Content and editorial calendars', desc: 'Repurpose the event dots to mark scheduled posts, useful next to a [blog post card grid](/ui-snippets/bootstrap-blog-post-card-grid/) for a publishing dashboard.' },
    ],
    faqs: [
      { q: 'How does the calendar know how many days are in each month?', a: 'It asks new Date(viewYear, viewMonth + 1, 0).getDate() — day zero of next month, which JavaScript resolves to the last day of the current month — so 28, 29, 30, and 31-day months, including leap years, are all handled correctly with no manual lookup table.' },
      { q: 'What happens when I click Prev in January?', a: 'viewMonth is decremented to -1, which the code detects and corrects by setting viewMonth to 11 (December) and decrementing viewYear by one, so navigation correctly crosses the year boundary backward.' },
      { q: 'Why are events keyed by a string instead of a Date object?', a: 'Two different Date objects representing the same calendar day are not === equal in JavaScript, which makes Date a poor object key; a plain "year-month-day" string like "2026-8-15" is stable and reliable to look up in the EVENTS object.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — store viewYear/viewMonth/selectedKey in useState or a ref, compute the grid cells in a useMemo or computed property using the same Date-based offset and days-in-month formulas, and render event dots conditionally in JSX/template syntax instead of appending DOM nodes manually.' },
      { q: 'Does this work with Tailwind instead of Bootstrap classes?', a: 'Yes — the card, row-cols-7, and list-group classes are purely presentational; the date math, event storage, and click handling are independent of styling and keep working if you swap in Tailwind utility classes on the same structure.' },
      { q: 'How do I add real events instead of the sample ones?', a: 'Call addEvent(year, month, day, "Event text") for each event before render() runs — month is zero-indexed (0 for January) to match JavaScript\'s Date convention, which is a common source of off-by-one bugs if forgotten.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to add a "Today" button that jumps the grid back to the current month, or to support multi-day events that render a dot on every day they span. It's also worth asking it to add keyboard arrow-key navigation between dates for accessibility.`,
      prompt: `Build a Bootstrap 5.3 calendar event widget using the real Bootstrap CDN (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A real month grid computed from JavaScript Date math: correctly determine the weekday the 1st of the month falls on and the number of days in the month (handling all month lengths and leap years), and pad the grid with muted leading/trailing days from adjacent months so it always fills complete weeks.
- Prev and Next buttons that regenerate the entire grid for the adjacent month, correctly rolling the year over at the December/January boundary in both directions.
- Some dates should carry a small dot indicator marking they have events, using a data structure keyed by year-month-day rather than Date object identity.
- Clicking a date highlights it as selected and reveals that specific day's events in a list below the calendar, or a "no events" message if it has none.
- Today's date must be visually distinguished (e.g. an outline) independent of whether it is the currently selected date.`,
    },
  },
};

export default bootstrapCalendarEventWidget;
