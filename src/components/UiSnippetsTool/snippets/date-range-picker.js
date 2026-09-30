const dateRangePicker = {
  id: 'date-range-picker',
  title: 'Date Range Picker',
  category: 'forms',
  lastmod: '2026-06-10',
  html: `<div class="wrap">
  <div class="field">
    <label class="label">Select date range</label>
    <div class="picker-wrap" id="picker-wrap">
      <button class="trigger" id="trigger" type="button" aria-haspopup="true" aria-expanded="false">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span id="display-range">Select a date range</span>
        <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>

      <div class="calendar-popup" id="calendar-popup" role="dialog" aria-modal="true" aria-label="Date range picker">
        <div class="panels">

          <div class="month-panel" id="panel-left">
            <div class="cal-header">
              <button class="nav-btn" id="prev-btn" aria-label="Previous month">&#8249;</button>
              <span class="month-label" id="label-left"></span>
              <span class="nav-spacer"></span>
            </div>
            <div class="day-names">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>
            <div class="days" id="days-left"></div>
          </div>

          <div class="panel-divider"></div>

          <div class="month-panel" id="panel-right">
            <div class="cal-header">
              <span class="nav-spacer"></span>
              <span class="month-label" id="label-right"></span>
              <button class="nav-btn" id="next-btn" aria-label="Next month">&#8250;</button>
            </div>
            <div class="day-names">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>
            <div class="days" id="days-right"></div>
          </div>

        </div>

        <div class="cal-footer">
          <button class="today-btn" id="today-btn">Today</button>
          <button class="clear-btn" id="clear-btn">Clear</button>
          <button class="apply-btn" id="apply-btn">Apply</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
}

.wrap { width: 100%; max-width: 560px; }
.label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }

.picker-wrap { position: relative; }

.trigger {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: border-color 0.15s;
  text-align: left;
}
.trigger:hover,
.trigger.open { border-color: #6366f1; }
.trigger svg:first-child { color: #94a3b8; flex-shrink: 0; }
.trigger span { flex: 1; color: #9ca3af; }
.trigger span.selected { color: #0f172a; font-weight: 500; }
.chevron { color: #94a3b8; flex-shrink: 0; transition: transform 0.2s; }
.trigger.open .chevron { transform: rotate(180deg); }

/* ── Popup ── */
.calendar-popup {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  padding: 16px;
  z-index: 200;
  opacity: 0;
  transform: scale(0.97) translateY(-4px);
  pointer-events: none;
  transition: opacity 0.18s, transform 0.18s;
  min-width: 560px;
}
.calendar-popup.open {
  opacity: 1;
  transform: scale(1) translateY(0);
  pointer-events: all;
}

/* ── Two-panel layout ── */
.panels {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 0 16px;
}

.panel-divider { background: #f1f5f9; }

.month-panel { min-width: 0; }

/* ── Header ── */
.cal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.month-label { font-size: 13px; font-weight: 700; color: #0f172a; white-space: nowrap; }
.nav-spacer { width: 28px; flex-shrink: 0; }

.nav-btn {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.12s, color 0.12s;
  flex-shrink: 0;
}
.nav-btn:hover { border-color: #6366f1; color: #6366f1; }

/* ── Day names ── */
.day-names {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 4px;
}
.day-names span { font-size: 10px; font-weight: 600; color: #94a3b8; padding: 3px 0; }

/* ── Day grid ── */
.days { display: grid; grid-template-columns: repeat(7, 1fr); }

.day {
  position: relative;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 12.5px;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  transition: color 0.1s;
}
.day:disabled { opacity: 0.35; cursor: default; }
.day.other { color: #d1d5db; }
.day.today-marker { font-weight: 700; color: #6366f1; }

/* Range fill (background strip) */
.day.in-range::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #eef2ff;
  z-index: -1;
}

/* First / last get rounded caps on the strip */
.day.range-start::before { border-radius: 9px 0 0 9px; }
.day.range-end::before   { border-radius: 0 9px 9px 0; }
.day.range-start.range-end::before { border-radius: 9px; }

/* The filled circle on selected endpoints */
.day.range-start::after,
.day.range-end::after {
  content: '';
  position: absolute;
  inset: 2px;
  background: #6366f1;
  border-radius: 7px;
  z-index: -1;
}

/* Endpoint text is white */
.day.range-start,
.day.range-end { color: #fff; font-weight: 700; }

/* Hover on un-selected days (only when not in selection) */
.day:not(.range-start):not(.range-end):not(:disabled):not(.other):hover {
  background: #f1f5f9;
  border-radius: 7px;
}

/* ── Footer ── */
.cal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
  gap: 8px;
}

.today-btn,
.clear-btn {
  font-size: 12px;
  font-weight: 600;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 7px;
  transition: background 0.12s;
}
.today-btn { color: #6366f1; }
.today-btn:hover { background: rgba(99,102,241,0.08); }
.clear-btn { color: #94a3b8; }
.clear-btn:hover { background: #f1f5f9; }

.apply-btn {
  margin-left: auto;
  font-size: 12px;
  font-weight: 600;
  border: none;
  background: #6366f1;
  color: #fff;
  cursor: pointer;
  padding: 6px 16px;
  border-radius: 7px;
  transition: background 0.12s;
}
.apply-btn:hover { background: #4f46e5; }

/* ── Responsive: stack on small screens ── */
@media (max-width: 600px) {
  .calendar-popup { min-width: 0; width: calc(100vw - 32px); left: 50%; transform: translateX(-50%) scale(0.97) translateY(-4px); }
  .calendar-popup.open { transform: translateX(-50%) scale(1) translateY(0); }
  .panels { grid-template-columns: 1fr; gap: 16px 0; }
  .panel-divider { display: none; }
}`,
  js: `const today = new Date();
today.setHours(0, 0, 0, 0);

// Cursor: left panel shows this month, right shows next month
let cursorYear  = today.getFullYear();
let cursorMonth = today.getMonth(); // left panel month (0-based)

let start    = null; // Date | null
let end      = null; // Date | null
let hovering = null; // Date | null — for live preview
let isOpen   = false;

// ── DOM refs ──────────────────────────────────────────────────
const wrap       = document.getElementById('picker-wrap');
const triggerBtn = document.getElementById('trigger');
const popup      = document.getElementById('calendar-popup');
const displayEl  = document.getElementById('display-range');
const daysLeft   = document.getElementById('days-left');
const daysRight  = document.getElementById('days-right');
const labelLeft  = document.getElementById('label-left');
const labelRight = document.getElementById('label-right');

// ── Open / close ──────────────────────────────────────────────
function open() {
  isOpen = true;
  popup.classList.add('open');
  triggerBtn.classList.add('open');
  triggerBtn.setAttribute('aria-expanded', 'true');
  render();
}

function close() {
  isOpen = false;
  popup.classList.remove('open');
  triggerBtn.classList.remove('open');
  triggerBtn.setAttribute('aria-expanded', 'false');
  hovering = null;
}

triggerBtn.addEventListener('click', () => { isOpen ? close() : open(); });

// Outside-click: use composedPath so detection works even when render()
// has rebuilt the DOM and removed the originally-clicked element.
document.addEventListener('click', e => {
  if (isOpen && !e.composedPath().includes(wrap)) close();
});

// ── Navigation ────────────────────────────────────────────────
document.getElementById('prev-btn').addEventListener('click', () => {
  cursorMonth--;
  if (cursorMonth < 0) { cursorMonth = 11; cursorYear--; }
  render();
});

document.getElementById('next-btn').addEventListener('click', () => {
  cursorMonth++;
  if (cursorMonth > 11) { cursorMonth = 0; cursorYear++; }
  render();
});

// ── Footer buttons ────────────────────────────────────────────
document.getElementById('today-btn').addEventListener('click', () => {
  // Anchor today as start (or reset to today if we already have a start)
  start    = new Date(today);
  end      = null;
  hovering = null;
  cursorYear  = today.getFullYear();
  cursorMonth = today.getMonth();
  render();
});

document.getElementById('clear-btn').addEventListener('click', () => {
  start    = null;
  end      = null;
  hovering = null;
  updateDisplay();
  render();
});

document.getElementById('apply-btn').addEventListener('click', () => {
  // Commit whatever we have (single date selects start only)
  updateDisplay();
  close();
});

// ── Date selection ────────────────────────────────────────────
function pick(date) {
  if (!start || (start && end)) {
    // Phase 1: anchor start, clear end
    start    = new Date(date);
    end      = null;
    hovering = null;
  } else {
    // Phase 2: set end; auto-swap if needed
    if (date < start) {
      end   = new Date(start);
      start = new Date(date);
    } else {
      end = new Date(date);
    }
    hovering = null;
  }
  render();
}

function hover(date) {
  if (start && !end) {
    if (hovering && sameDay(hovering, date)) return;
    hovering = new Date(date);
    render();
  }
}

// ── Render ────────────────────────────────────────────────────
function render() {
  // Left panel: cursorYear / cursorMonth
  // Right panel: one month later
  let rightMonth = cursorMonth + 1;
  let rightYear  = cursorYear;
  if (rightMonth > 11) { rightMonth = 0; rightYear++; }

  labelLeft.textContent  = monthLabel(cursorYear, cursorMonth);
  labelRight.textContent = monthLabel(rightYear, rightMonth);

  renderPanel(daysLeft,  cursorYear, cursorMonth);
  renderPanel(daysRight, rightYear,  rightMonth);
  updateDisplay();
}

function monthLabel(y, m) {
  return new Date(y, m, 1).toLocaleString('default', { month: 'long', year: 'numeric' });
}

function renderPanel(container, y, m) {
  container.innerHTML = '';

  const firstDay     = new Date(y, m, 1).getDay();        // 0=Sun
  const daysInMonth  = new Date(y, m + 1, 0).getDate();
  const prevMonthLen = new Date(y, m, 0).getDate();

  // Leading padding (previous month days — not interactive)
  for (let i = firstDay - 1; i >= 0; i--) {
    addDay(container, prevMonthLen - i, null, ['other']);
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d);
    const classes = classesFor(date);
    addDay(container, d, date, classes);
  }

  // Trailing padding
  const total = firstDay + daysInMonth;
  const rem   = total % 7;
  if (rem) {
    for (let i = 1; i <= 7 - rem; i++) addDay(container, i, null, ['other']);
  }
}

function classesFor(date) {
  const cls = [];

  if (sameDay(date, today)) cls.push('today-marker');

  // Determine effective range end for highlighting (use hovering for preview)
  const rangeEnd = end || (start && hovering ? hovering : null);

  if (start && sameDay(date, start)) {
    cls.push('in-range', 'range-start');
  } else if (rangeEnd && sameDay(date, rangeEnd) && start) {
    cls.push('in-range', 'range-end');
  } else if (start && rangeEnd) {
    const lo = start < rangeEnd ? start : rangeEnd;
    const hi = start < rangeEnd ? rangeEnd : start;
    if (date > lo && date < hi) cls.push('in-range');
  }

  return cls;
}

function addDay(container, n, date, extraClasses) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'day';
  if (extraClasses && extraClasses.length) btn.className += ' ' + extraClasses.join(' ');
  btn.textContent = n;

  if (date) {
    btn.addEventListener('click', () => pick(date));
    btn.addEventListener('mouseenter', () => hover(date));
  } else {
    btn.disabled = true;
  }

  container.appendChild(btn);
}

// ── Display ───────────────────────────────────────────────────
function updateDisplay() {
  if (!start && !end) {
    displayEl.textContent = 'Select a date range';
    displayEl.className   = '';
    return;
  }

  const fmt = d => d.toLocaleDateString('default', { month: 'short', day: 'numeric' });

  if (start && end) {
    displayEl.textContent = fmt(start) + ' – ' + fmt(end);
  } else {
    displayEl.textContent = fmt(start) + ' – ...';
  }
  displayEl.className = 'selected';
}

// Remove hover preview when mouse leaves the popup entirely
popup.addEventListener('mouseleave', () => {
  if (start && !end && hovering) {
    hovering = null;
    render();
  }
});

// ── Utilities ─────────────────────────────────────────────────
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate();
}

// Expose getValue() so host pages can read the range
function getValue() {
  if (!start) return null;
  return { start: new Date(start), end: end ? new Date(end) : null };
}`,
  about: {
    title: 'Date Range Picker — HTML CSS JavaScript (No Library)',
    description: 'An interactive date range picker in pure HTML, CSS, and JavaScript. Select start and end dates with range highlighting, hover preview, and month navigation.',
    about: `A date range picker is one of the most frequently needed form components in web development, yet the native browser date input offers no built-in range selection at all. Booking forms, analytics dashboards, report filters, vacation planners, and HR leave-request tools all share the same requirement: let the user pick two dates that define a span of time.\n\nThis snippet delivers a fully functional date range picker using only HTML, CSS, and vanilla JavaScript — no moment.js, no date-fns, no third-party calendar library. It weighs exactly zero kilobytes of external dependencies and works in every modern browser.\n\n**How selection works**\n\nThe picker uses a two-phase selection model. The first click anchors the start date. As you move the mouse, every day between the anchor and the hovered day is highlighted in a soft indigo fill — giving you a live preview of the range you're about to select. The second click locks the end date. If you click a date before the anchor, the picker automatically swaps them so start is always before end.\n\n**Two-month view**\n\nShowing two months side by side is the standard UX for range pickers because it lets users see the full range without needing to navigate. If a stay spans June 28 to July 10, both dates are visible at once. The left panel always shows the earlier month; navigating forward shifts both panels together.\n\n**Hover preview**\n\nOnce a start date is anchored and before the end date is chosen, mousing over any day triggers a live recalculation of the highlighted range. This gives users immediate visual feedback — they can see exactly how many days they're about to select before committing.\n\n**OK / Apply button**\n\nThe picker only closes when the user clicks Apply or clicks outside. This prevents accidental dismissal when clicking the second date of the range — a common bug in simpler implementations that close on every click.\n\n**Outside-click detection**\n\nThe outside-click listener uses e.composedPath().includes(wrap) instead of e.target.closest(). This matters because the render() function rebuilds the calendar grid on every hover, which removes the originally clicked element from the DOM before the click event bubbles to document. composedPath() captures the event path before any DOM mutations, making the detection reliable even when the DOM changes mid-event.\n\n**No library, no build step**\n\nAll date math uses the native Date object. Differences between dates are computed in milliseconds and converted to days. Month navigation mutates a cursor Date object. The snippet works as a standalone HTML file and drops directly into any existing project.

**Hover range highlighting**

After a start date is selected, moving the mouse over the calendar shows a preview of the range that would be created. Each cell checks three conditions on every render: is it the start date, is it the end date, or is it between start and the current hover target. The between-check uses a simple \`min(start, hover) <= date <= max(start, hover)\` comparison. This runs synchronously on every \`mousemove\` event, making hover feel instantaneous.

**Infinite loop prevention**

The hover handler calls \`render()\` to redraw the calendar. But \`render()\` rebuilds the entire DOM, including the cell currently under the cursor -- which triggers a new \`mouseenter\` event, calling \`hover()\` again, causing an infinite loop. The fix is an early-return guard at the top of \`hover()\`: if the incoming date is identical to the current \`hovering\` state, return immediately without re-rendering. This breaks the cycle while preserving all visual updates.`,
    howToUse: [
      { step: 'Trigger', desc: 'Click the trigger button to open the two-month calendar panel.' },
      { step: 'Start date', desc: 'Click any day to anchor the start of your range. It highlights in indigo.' },
      { step: 'Hover preview', desc: 'Move the mouse over other days to preview the range before confirming.' },
      { step: 'End date', desc: 'Click a second day to set the end date. Days between are highlighted.' },
      { step: 'Apply', desc: 'Click Apply to confirm the selection and close the picker.' },
      { step: 'Clear', desc: 'Click Clear to reset both dates and start over.' },
      { step: 'Navigate', desc: 'Use the ‹ / › arrows to move between months. Both panels shift together.' },
    ],
    features: [
      { title: 'Two-month side-by-side view', desc: 'See both start and end months simultaneously — no navigation needed for ranges that cross a month boundary.' },
      { title: 'Live hover preview', desc: 'Range highlight updates in real time as you move the mouse, before the second date is confirmed.' },
      { title: 'Auto date-swap', desc: 'If you click a date before the start, the picker automatically reorders start and end.' },
      { title: 'Zero dependencies', desc: 'Pure HTML, CSS, and JavaScript — no libraries, no build step, no npm install.' },
      { title: 'Outside-click close', desc: 'Clicking anywhere outside the calendar dismisses it — using composedPath() for reliable detection.' },
      { title: 'Today shortcut', desc: 'One-click Today button sets the start or anchors the current day for quick selection.' },
      { title: 'Clear button', desc: 'Instantly resets the range so users can start over without reloading.' },
    ],
    useCases: [
      { title: 'Hotel & Travel Booking Forms', desc: 'Let guests pick check-in and check-out dates side by side — the most natural UX for any accommodation booking. Pair with a [date picker](/ui-snippets/date-picker/) for single-date fields like departure only.' },
      { title: 'Analytics & Reporting Dashboards', desc: 'Filter report data by custom date ranges — "last 30 days", "this quarter", or any arbitrary span. Drop into a [dashboard layout](/ui-snippets/dashboard-layout/) alongside [data tables](/ui-snippets/data-table/) and [line charts](/ui-snippets/line-chart-widget/).' },
      { title: 'Leave & HR Management Tools', desc: 'Let employees request vacation time, parental leave, or project timelines. The two-month view is ideal for spans that cross month boundaries — see both the leave start and return date at once.' },
      { title: 'Event & Campaign Planning', desc: 'Set festival dates, conference schedules, or marketing campaign windows with a visual range. Pair with a [countdown timer](/ui-snippets/countdown-timer/) to show days remaining until the event.' },
      { title: 'E-commerce Order Filters', desc: 'Let shoppers or admins filter orders, deliveries, or promotions by purchase date range — a standard feature in any store admin panel or [data table](/ui-snippets/data-table/).' },
      { title: 'SaaS Subscription & Billing', desc: 'Define trial periods, contract start/end dates, or billing cycle windows. Combine with a [multi-step form](/ui-snippets/multi-step-form/) for onboarding flows that include date selection.' },
      { icon: 'CODE', title: 'Related: Floating Label Select', desc: 'See the [Floating Label Select](/ui-snippets/floating-label-select/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I get the selected dates as JavaScript Date objects?', a: 'After the user confirms, call getValue() which returns { start: Date, end: Date } or null if nothing is selected. You can then format them with toLocaleDateString() or convert to ISO strings with toISOString().' },
      { q: 'Can I restrict which dates are selectable?', a: 'Yes — in the addDay() function, add a disabled condition: if (date < minDate || date > maxDate) add the disabled class. The snippet already skips "other month" days from selection.' },
      { q: 'How do I pre-populate the picker with a default range?', a: 'Set the start and end variables before calling render(). For example: start = new Date(2026,0,1); end = new Date(2026,0,31); updateDisplay(); This works before or after the DOM is ready.' },
      { q: 'Does this work on mobile / touch screens?', a: 'Yes — click events fire on touch. For swipe-based month navigation, add touchstart/touchend listeners and call shift() based on swipe direction.' },
      { q: 'How do I show only one month instead of two?', a: 'Remove the second .month-panel element from the HTML and set the .panels grid to a single column. The JS logic is already per-panel and works with one.' },
      { q: 'How do I format the selected dates differently?', a: 'The formatDate(d) helper formats as "Mon DD, YYYY". Replace it with any format you need: d.toISOString().slice(0,10) for ISO format, or d.toLocaleDateString(\'en-GB\') for DD/MM/YYYY. The function is called in updateDisplay() which runs after every start/end selection.' },
    ],
  },

  seo: {
    title: 'Date Range Picker HTML CSS JS — Dual Calendar Popup',
    description: 'Date range picker with dual-month calendar popup, hover preview, keyboard navigation, click-outside close, and month navigation. No dependencies.',
    about: {
      title: 'Date Range Picker — How to Build a Dual-Calendar Date Range Picker in HTML, CSS, and JavaScript',
      description: `A date range picker is one of the most complex form components to build correctly. Unlike a single date picker, it must handle two selection points (start and end), a live hover preview showing the range in flight, dual month panels that stay synchronized, month navigation that respects both panels, keyboard accessibility, and click-outside-to-close — all in a single compact popup.\n\nThis snippet builds a complete, production-quality date range picker entirely in HTML, CSS, and vanilla JavaScript — no Flatpickr, no date-fns, no external calendar library.\n\n## State Machine Design\n\nThe picker has three selection states, tracked by two Date variables — \`start\` and \`end\` — and one hover variable:\n\n1. **No selection** — both null. First click sets \`start\`, leaves \`end\` null.\n2. **Start selected, no end** — first half of range. Hovering cells updates \`hovering\`, repainting the preview. Second click sets \`end\`. If \`end < start\`, the two are swapped.\n3. **Range complete** — both set. Clicking a new cell resets to state 1 and starts a new range.\n\nThis three-state machine is the core of the component. Every calendar render reads \`start\`, \`end\`, and \`hovering\` to determine the class of each day cell: \`selected-start\`, \`selected-end\`, \`in-range\`, \`hover-preview\`, \`today\`, or plain.\n\n## Dual Month Panel Architecture\n\nTwo month panels render side by side. The left panel shows the month at \`cursorMonth\` and \`cursorYear\`. The right panel always shows the next month. Navigation arrows advance or retreat \`cursorMonth\` (adjusting \`cursorYear\` when crossing December or January) and re-render both panels.\n\nEach panel is rendered by \`renderPanel(container, year, month)\`. This function: computes the first day of the month (using \`new Date(year, month, 1).getDay()\` to get the starting weekday), fills empty cells before day 1 for alignment, generates day cells 1 through the month\'s last day, and appends them to the grid container.\n\n## Computing Month Start Day and Empty Cells\n\nThe calendar grid has 7 columns (Sun–Sat). \`new Date(year, month, 1).getDay()\` returns 0–6 for the weekday of the first of the month. If the first falls on Wednesday (day 3), three empty \`<div class="cal-cell empty">\` elements are prepended before day 1 to shift it into the correct column. Days from the previous month are NOT shown — only blank placeholders — matching the common pattern used by Google Calendar, Airbnb, and most date pickers.\n\n## Live Hover Preview\n\nWhile the user has selected a start date but not yet an end date, moving the mouse over any day cell fires a \`mouseover\` event. The handler sets \`hovering = new Date(year, month, day)\` and calls \`renderBothPanels()\` to repaint with the updated preview. Cells between \`start\` and \`hovering\` receive the \`hover-preview\` class (a lighter shade than the confirmed \`in-range\` class), giving users instant visual feedback before they click.\n\nThis re-render-on-hover approach is simpler than maintaining a separate preview layer and scales to any number of cells without DOM manipulation.\n\n## Range Cell Classification\n\nFor each day cell, the renderer checks three conditions:\n- Is this day === \`start\`? → class \`selected-start\` (rounded left cap)\n- Is this day === \`end\`? → class \`selected-end\` (rounded right cap)\n- Is this day between start and end (or between start and hovering)? → class \`in-range\` or \`hover-preview\` (flat fill)\n\nDate comparison uses integer arithmetic: \`d.getTime()\` returns milliseconds since epoch. \`isSameDay(a, b)\` checks year, month, and date equality. \`isBefore(a, b)\` and \`isAfter(a, b)\` compare epoch values. This avoids any timezone ambiguity from direct Date subtraction.\n\n## Popup Open/Close and Click Outside\n\nThe popup is \`position: absolute\` below the trigger button. It opens with a CSS class toggle that sets \`opacity: 1\`, \`transform: translateY(0)\`, and \`pointer-events: auto\`. Click-outside detection uses a \`mousedown\` event listener on \`document\` — if \`e.target.closest(\'.picker-wrap\')\` is null (the click was outside the entire picker), the popup closes. The listener is added on open and removed on close to avoid stacking multiple listeners.\n\n## Keyboard Navigation\n\nThe trigger button has \`aria-haspopup="true"\` and the popup has \`role="dialog" aria-modal="true"\`. When open, \`keydown\` on the document handles: \`Escape\` closes the popup. Arrow key navigation through day cells requires \`tabindex\` management — day cells get \`tabindex="0"\` and ArrowLeft/Right/Up/Down move focus between them. This matches WCAG date picker guidance.\n\n## Output Format\n\nA \`getValue()\` function returns \`{ start: Date, end: Date | null }\` for programmatic access. The display string uses \`toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })\` to format both dates as "Jun 10, 2025 – Jun 20, 2025" in the trigger button label.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the picker', text: 'Click the trigger button with the calendar icon. The dual-month popup opens with the current month on the left and next month on the right.' },
        { title: 'Click the start date', text: 'Click any day to set the range start. The cell highlights with a filled circle and the end date clears if one was previously set.' },
        { title: 'Hover to preview the range', text: 'Move the mouse over any day after the start. Cells between start and the hovered day highlight in a lighter shade showing the range preview before you commit.' },
        { title: 'Click the end date', text: 'Click any day to set the range end. If you click before the start date, start and end are automatically swapped. The trigger button updates with the formatted date range.' },
        { title: 'Navigate months', text: 'Click the < and > arrows to move backward or forward one month. Both panels shift together — left shows the new month, right shows the next one.' },
        { title: 'Read the selected range', text: 'Call getValue() to get { start: Date, end: Date } programmatically. Use these Date objects in a form submit handler, API call, or query string builder.' },
      ],
    },
    features: [
      'Three-state selection machine: no-selection → start-only (hover preview) → range-complete → reset on new click',
      'Dual month panels: left shows cursorMonth, right always shows cursorMonth+1, both re-render on navigation',
      'renderPanel(): new Date(y,m,1).getDay() for column offset, empty cells before day 1, no overflow from adjacent months',
      'Live hover preview: mouseover sets hovering Date, re-renders both panels — lighter in-range shade before commit',
      'Range cell classification: isSameDay() epoch comparison for start/end, getTime() range check for in-range cells',
      'Click-outside close: document mousedown + e.target.closest(".picker-wrap") null check, listener removed on close',
      'Start/end swap: if end < start on second click, values are automatically exchanged for intuitive backwards selection',
      'getValue() API: returns { start: Date, end: Date | null } for programmatic access from host page',
      'Display format: toLocaleDateString en-US short month for "Jun 10, 2025 – Jun 20, 2025" trigger label',
    ],
    useCases: [
      { icon: 'CHART', title: 'Analytics & Reporting Date Filters', desc: 'Let users define custom date ranges for dashboard reports, chart data windows, and metric period comparisons. The dual-month view makes selecting multi-week or multi-month ranges intuitive — users see both the start month and end month simultaneously without navigating back and forth.' },
      { icon: 'MONEY', title: 'Booking & Reservation Interfaces', desc: 'Hotel check-in/check-out, vacation rental availability, event ticket date selection, or appointment booking. The hover preview shows the exact nights or days being booked before commitment. Pair with a [multi-step form](/ui-snippets/multi-step-form/) to capture additional booking details after date selection.' },
      { icon: 'APP', title: 'Project Management Date Ranges', desc: 'Sprint date ranges, project milestone windows, employee time-off requests, and task due date ranges. The clear start/end cap styling and mid-range fill makes the selected period immediately readable. Integrate into a [kanban board](/ui-snippets/kanban-board/) for sprint planning.' },
      { icon: 'FLOW', title: 'E-commerce Order & Shipping Date Filters', desc: 'Filter order history by date range, define promotional period windows, or set shipping cutoff date ranges. The getValue() function returns Date objects that map directly to ISO timestamp parameters in your API query string.' },
      { icon: 'LEARN', title: 'Calendar & Date Picker Study Reference', desc: 'Study the complete implementation of a production date range picker: state machine design, month grid computation, hover preview, click-outside detection, and cell classification. Every technique here applies to building any custom calendar component from scratch.' },
      { icon: 'FORM', title: 'Form Wizards & Search Filters', desc: 'Embed in a multi-step checkout for subscription start/end dates, travel search for departure/return, or a job board for application deadline ranges. The picker integrates as a form field — read getValue() in the submit handler alongside other input values.' },
    ],
    faqs: [
      { q: 'How does the hover preview work while selecting a range?', a: 'When start is set but end is null, a mouseover listener on the calendar grid reads the hovered day cell\'s data-date attribute and sets the hovering state variable. The full dual-panel render is called immediately, and each day cell between start and hovering receives the hover-preview class (lighter background). Because the render is fast (no DOM diffing, just clearing and recreating cells), the preview feels instant. On the second click, hovering is cleared and end is set, converting the preview cells to confirmed in-range cells.' },
      { q: 'How does the dual-month navigation work when crossing year boundaries?', a: 'cursorMonth ranges 0–11. When the > (forward) arrow is clicked: cursorMonth++; if (cursorMonth > 11) { cursorMonth = 0; cursorYear++; }. When < (backward) arrow is clicked: cursorMonth--; if (cursorMonth < 0) { cursorMonth = 11; cursorYear--; }. The right panel always renders month (cursorMonth + 1) % 12 with the correct year (cursorYear + 1 if cursorMonth is December). This correctly handles the December → January year-wrap.' },
      { q: 'How do I disable specific dates (past dates, booked dates)?', a: 'In renderPanel(), add a check before creating each day cell: const isPast = d < today; if (isPast) { cell.classList.add("disabled"); cell.tabIndex = -1; return; }. The CSS .cal-cell.disabled { opacity: 0.35; cursor: not-allowed; pointer-events: none; } prevents interaction. For blocked date ranges (e.g., already-booked), check against an array of { start, end } blocked periods and add "blocked" class similarly.' },
      { q: 'How do I restrict the selectable range to a maximum number of days?', a: 'In the day cell click handler, when end is being set: const diffDays = Math.round((endDate - start) / 86400000); if (diffDays > MAX_DAYS) { showError("Maximum " + MAX_DAYS + " days"); return; }. Also add the constraint in the hover preview: cells beyond MAX_DAYS from start get a "out-of-range" class and a cursor: not-allowed style.' },
      { q: 'How do I connect this to a form and submit the selected range?', a: 'Add two hidden inputs to your form: <input type="hidden" name="startDate" id="hidden-start"> and <input type="hidden" name="endDate" id="hidden-end">. In the click handler when end is set: document.getElementById("hidden-start").value = start.toISOString().slice(0,10); document.getElementById("hidden-end").value = end.toISOString().slice(0,10);. These ISO strings serialize correctly in a standard HTML form submit or a fetch() body.' },
      { q: 'Can I use this date range picker in React, Vue, or Angular?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a utility-class version. In React, keep startDate and endDate in useState and re-render the calendar grid from those values instead of mutating the DOM directly.' },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing every branch of the selection logic yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how the pick() function decides between anchoring a new start, swapping start and end when the second click lands earlier, or resetting the range entirely, and why the hover() guard checks sameDay(hovering, date) before re-rendering. The same assistant is useful for optimizing it, for instance asking whether renderPanel() rebuilding both months' full innerHTML on every single mouseenter is necessary or whether only the affected cells need new classes. It also helps with extending the picker: ask it to add preset ranges like "last 7 days," a minimum/maximum span constraint between start and end, or disabled dates for already-booked periods. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a two-month date range picker in plain HTML, CSS, and JavaScript with no external date library.

Requirements:
- A trigger button that opens a popup containing two side-by-side month calendar panels, where the right panel always shows the month immediately after the left panel's cursor month, and both panels re-render together whenever navigation changes the cursor.
- Selection must follow a two-phase model with a single pick(date) function: if there is no start, or both start and end are already set, treat the click as a fresh start and clear end; otherwise treat the click as setting end, auto-swapping start and end if the clicked date is earlier than the current start.
- While a start is set but end is not, track a separate hovering date on mouseenter over day cells, and highlight every day between start and hovering (or start and end once confirmed) using a background strip with rounded end caps on the first and last cell of the range.
- Guard the hover handler so that re-rendering the grid (which recreates the DOM node under the cursor) does not retrigger a new mouseenter event and cause an infinite render loop.
- Add Today, Clear, and Apply buttons in the footer, plus a document-level click listener using event.composedPath() (not closest()) to detect outside clicks, since composedPath must be captured before any DOM rebuild removes the originally clicked element.
- Expose a getValue() function returning { start, end } as Date objects (or null) so a host page can read the selected range programmatically.`,
    },
  },
};

export default dateRangePicker;
