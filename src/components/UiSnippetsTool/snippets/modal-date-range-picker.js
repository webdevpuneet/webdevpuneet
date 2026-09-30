const modalDateRangePicker = {
  id: 'modal-date-range-picker',
  title: 'Booking Date Range Picker Modal',
  lastmod: '2026-08-31',
  category: 'modals',
  cdnUrls: [],
  html: `<div class="drm-page"><button type="button" class="drm-open" id="drmOpen">Select dates</button></div>

<div class="drm-backdrop" id="drmBackdrop"></div>
<div class="drm-modal" id="drmModal" role="dialog" aria-modal="true" aria-labelledby="drmTitle">
  <button type="button" class="drm-close" id="drmClose" aria-label="Close">&#10005;</button>
  <h3 id="drmTitle">Select your dates</h3>

  <div class="drm-calendars">
    <div class="drm-cal">
      <div class="drm-cal-head">
        <button type="button" class="drm-nav" id="drmPrev" aria-label="Previous month">&#8249;</button>
        <span id="drmLabelLeft"></span>
        <span class="drm-nav-spacer"></span>
      </div>
      <div class="drm-weekdays"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>
      <div class="drm-grid" id="drmGridLeft"></div>
    </div>
    <div class="drm-cal">
      <div class="drm-cal-head">
        <span class="drm-nav-spacer"></span>
        <span id="drmLabelRight"></span>
        <button type="button" class="drm-nav" id="drmNext" aria-label="Next month">&#8250;</button>
      </div>
      <div class="drm-weekdays"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>
      <div class="drm-grid" id="drmGridRight"></div>
    </div>
  </div>

  <div class="drm-footer">
    <span class="drm-summary" id="drmSummary">Select a check-in date</span>
    <button type="button" class="drm-confirm" id="drmConfirm" disabled>Confirm dates</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh}
.drm-page{min-height:100vh;display:flex;align-items:center;justify-content:center}
.drm-open{background:#0f172a;color:#fff;border:none;border-radius:11px;padding:12px 22px;font-size:14.5px;font-weight:700;cursor:pointer;font-family:inherit}

.drm-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.5);opacity:0;pointer-events:none;transition:opacity .2s;z-index:90}
.drm-backdrop.show{opacity:1;pointer-events:all}

.drm-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-46%) scale(.97);opacity:0;pointer-events:none;
  width:min(560px,94vw);max-height:88vh;overflow-y:auto;background:#fff;border-radius:18px;padding:26px 24px 22px;z-index:91;
  transition:opacity .2s,transform .2s;box-shadow:0 30px 70px rgba(0,0,0,.3)}
.drm-modal.show{opacity:1;transform:translate(-50%,-50%) scale(1);pointer-events:all}
.drm-close{position:absolute;top:14px;right:14px;width:28px;height:28px;border-radius:50%;border:none;background:#f1f5f9;color:#64748b;cursor:pointer;font-size:12px}
#drmTitle{font-size:18px;font-weight:800;color:#0f172a;margin-bottom:18px}

.drm-calendars{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-bottom:18px}
.drm-cal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.drm-cal-head span:not(.drm-nav-spacer){font-size:13px;font-weight:800;color:#1e293b}
.drm-nav-spacer{width:26px}
.drm-nav{width:26px;height:26px;border-radius:7px;border:1px solid #e2e8f0;background:#fff;color:#334155;cursor:pointer;font-size:14px;font-family:inherit}
.drm-nav:hover{background:#f8fafc}

.drm-weekdays{display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:4px}
.drm-weekdays span{text-align:center;font-size:10px;font-weight:700;color:#94a3b8}

.drm-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}
.drm-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:12px;color:#334155;cursor:pointer;border-radius:8px;border:none;background:none;font-family:inherit;position:relative}
.drm-day:hover:not(.drm-day-disabled):not(.drm-day-empty){background:#f1f5f9}
.drm-day-empty{cursor:default}
.drm-day-disabled{color:#cbd5e1;cursor:not-allowed}
.drm-day-start,.drm-day-end{background:#6366f1;color:#fff;font-weight:700}
.drm-day-in-range{background:#e0e2fc;border-radius:0}
.drm-day-start{border-radius:8px 0 0 8px}
.drm-day-end{border-radius:0 8px 8px 0}
.drm-day-start.drm-day-end{border-radius:8px}

.drm-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:16px;border-top:1px solid #f1f5f9}
.drm-summary{font-size:12.5px;color:#64748b}
.drm-summary b{color:#1e293b}
.drm-confirm{background:#6366f1;color:#fff;border:none;border-radius:9px;padding:10px 22px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.drm-confirm:hover:not(:disabled){background:#4f46e5}
.drm-confirm:disabled{background:#c7cff5;cursor:not-allowed}

@media(max-width:560px){.drm-calendars{grid-template-columns:1fr}}`,

  js: `// Two side-by-side month calendars share one range-selection state machine:
// the first click sets the start date, the second click (if after start) sets
// the end date, and a third click starts a brand new range. Hovering while a
// start date is chosen previews the in-between days before the range is final.
var MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

var today = new Date();
today.setHours(0, 0, 0, 0);
var leftMonth = new Date(today.getFullYear(), today.getMonth(), 1);

var backdrop = document.getElementById('drmBackdrop');
var modal = document.getElementById('drmModal');
var openBtn = document.getElementById('drmOpen');
var closeBtn = document.getElementById('drmClose');
var prevBtn = document.getElementById('drmPrev');
var nextBtn = document.getElementById('drmNext');
var labelLeft = document.getElementById('drmLabelLeft');
var labelRight = document.getElementById('drmLabelRight');
var gridLeft = document.getElementById('drmGridLeft');
var gridRight = document.getElementById('drmGridRight');
var summaryEl = document.getElementById('drmSummary');
var confirmBtn = document.getElementById('drmConfirm');

var rangeStart = null;
var rangeEnd = null;
var hoverDate = null;

function openModal() { backdrop.classList.add('show'); modal.classList.add('show'); }
function closeModal() { backdrop.classList.remove('show'); modal.classList.remove('show'); }

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatShort(date) {
  return MONTH_NAMES[date.getMonth()].slice(0, 3) + ' ' + date.getDate();
}

// Day buttons persist across hovers -- only their highlight classes change --
// so the exact element under the cursor is never destroyed mid-click. Only a
// month change (or initial load) actually rebuilds the button elements.
var dayButtons = [];

function buildMonthGrid(container, monthDate) {
  container.innerHTML = '';
  var year = monthDate.getFullYear();
  var month = monthDate.getMonth();
  var firstWeekday = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();

  for (var i = 0; i < firstWeekday; i++) {
    var empty = document.createElement('span');
    empty.className = 'drm-day drm-day-empty';
    container.appendChild(empty);
  }

  for (var d = 1; d <= daysInMonth; d++) {
    var date = new Date(year, month, d);
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'drm-day';
    btn.textContent = String(d);

    var isPast = date < today;
    if (isPast) {
      btn.classList.add('drm-day-disabled');
      btn.disabled = true;
    } else {
      btn.addEventListener('click', function (clickedDate) {
        return function () { selectDate(clickedDate); };
      }(date));
      btn.addEventListener('mouseenter', function (hovered) {
        return function () {
          if (rangeStart && !rangeEnd) { hoverDate = hovered; applyHighlights(); }
        };
      }(date));
      dayButtons.push({ date: date, el: btn });
    }
    container.appendChild(btn);
  }
}

// Re-paints start/end/in-range classes on the existing buttons without
// touching the DOM structure -- safe to call on every hover.
function applyHighlights() {
  var previewEnd = rangeEnd || hoverDate;
  dayButtons.forEach(function (entry) {
    var date = entry.date;
    var btn = entry.el;
    btn.classList.remove('drm-day-start', 'drm-day-end', 'drm-day-in-range');
    if (sameDay(date, rangeStart)) btn.classList.add('drm-day-start');
    if (sameDay(date, rangeEnd)) btn.classList.add('drm-day-end');
    if (rangeStart && previewEnd && date > rangeStart && date < previewEnd) {
      btn.classList.add('drm-day-in-range');
    }
  });
}

function selectDate(date) {
  if (!rangeStart || (rangeStart && rangeEnd)) {
    rangeStart = date;
    rangeEnd = null;
    hoverDate = null;
  } else if (date < rangeStart) {
    rangeStart = date;
  } else {
    rangeEnd = date;
  }
  updateSummary();
  applyHighlights();
}

function updateSummary() {
  if (!rangeStart) {
    summaryEl.textContent = 'Select a check-in date';
    confirmBtn.disabled = true;
  } else if (!rangeEnd) {
    summaryEl.innerHTML = '<b>' + formatShort(rangeStart) + '</b> \\u2192 select a check-out date';
    confirmBtn.disabled = true;
  } else {
    var nights = Math.round((rangeEnd - rangeStart) / 86400000);
    summaryEl.innerHTML = '<b>' + formatShort(rangeStart) + '</b> \\u2192 <b>' + formatShort(rangeEnd) + '</b> &middot; ' + nights + ' night' + (nights === 1 ? '' : 's');
    confirmBtn.disabled = false;
  }
}

function renderCalendars() {
  dayButtons = [];
  var rightMonth = new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1, 1);
  labelLeft.textContent = MONTH_NAMES[leftMonth.getMonth()] + ' ' + leftMonth.getFullYear();
  labelRight.textContent = MONTH_NAMES[rightMonth.getMonth()] + ' ' + rightMonth.getFullYear();
  buildMonthGrid(gridLeft, leftMonth);
  buildMonthGrid(gridRight, rightMonth);
  applyHighlights();
}

prevBtn.addEventListener('click', function () {
  leftMonth = new Date(leftMonth.getFullYear(), leftMonth.getMonth() - 1, 1);
  renderCalendars();
});
nextBtn.addEventListener('click', function () {
  leftMonth = new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1, 1);
  renderCalendars();
});

confirmBtn.addEventListener('click', function () {
  if (!rangeStart || !rangeEnd) return;
  closeModal();
});

renderCalendars();
updateSummary();`,

  seo: {
    title: 'Booking Date Range Picker Modal — Free HTML CSS JS Snippet',
    description: 'A two-month calendar modal for picking a check-in and check-out date range, with live hover-preview highlighting and a computed nights summary. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Date Range Picker Modal — Two-Month Calendar with Hover Preview and a Real Nights Count',
      description: `Booking flows need more than a single date field — they need a start and an end, with the days in between visually obvious before the second click even happens. This modal renders two adjacent month calendars sharing one range-selection state machine, previewing the in-between days on hover and computing a real nights count once both dates are picked.

**A three-step click cycle, not just two independent date fields**

\`selectDate(date)\` implements the standard range-picker cycle: if there's no \`rangeStart\` yet, or if a complete range already exists, the clicked date becomes a fresh \`rangeStart\` and any previous range clears. Otherwise, if the clicked date is before the existing \`rangeStart\`, it replaces the start (handling a visitor who picked a check-in, then changed their mind to an earlier date). Otherwise it becomes \`rangeEnd\`. This single function is the entire range logic — there's no separate "am I picking start or end" flag to keep in sync with it.

**Hover preview reuses the exact same in-range check as the final range**

While \`rangeStart\` is set but \`rangeEnd\` isn't, moving the mouse over a day sets \`hoverDate\` and re-renders. \`buildMonthGrid()\` computes \`previewEnd = rangeEnd || hoverDate\` once, then applies the identical \`date > rangeStart && date < previewEnd\` check whether \`previewEnd\` came from a confirmed end date or a live hover — so the preview highlighting a visitor sees before their second click is pixel-for-pixel the same styling the confirmed range will show afterward, not a separate lighter-weight preview state.

**Past dates are genuinely disabled, not just styled to look that way**

Every day before \`today\` gets both the \`.drm-day-disabled\` class and a real \`disabled\` attribute on the \`<button>\` — no click handler is even attached to a disabled day, so a booking cannot start or end in the past no matter how a visitor interacts with the calendar, not merely a visual style discouraging it.

**Closures capture each day's own date correctly**

Both the click and \`mouseenter\` handlers are bound via an immediately-invoked function that takes \`date\` as a parameter and returns the real handler — the same pattern needed anywhere event listeners are created inside a loop, since without it every handler would close over the loop's final date value instead of its own day.

**The nights count is real arithmetic, not a lookup table**

\`Math.round((rangeEnd - rangeStart) / 86400000)\` converts the millisecond difference between two \`Date\` objects into whole days by dividing by the number of milliseconds in a day — correct for any pair of dates regardless of the month or months they span, including a range that crosses a month boundary between the two visible calendars.

**Customizing it**

Add a maximum-range limit (e.g. a 30-night cap for a booking product) by adding a check inside \`selectDate()\`'s \`else\` branch that rejects an end date too far from \`rangeStart\`. Restyle \`.drm-day-in-range\` to your brand's accent color, and adjust the \`today\` cutoff logic if you need a minimum lead time (e.g. bookings must start at least 2 days out) instead of allowing "today" itself.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the date picker', text: 'Click "Select dates" to open the two-month calendar modal.' },
        { title: 'Click a start date', text: 'The clicked day highlights and the summary asks for a check-out date.' },
        { title: 'Hover before your second click', text: 'The days between your start date and the hovered day preview-highlight live.' },
        { title: 'Click an end date', text: 'The range locks in, the summary shows a real computed nights count, and Confirm enables.' },
        { title: 'Navigate months', text: 'Use the arrow buttons to move both calendars forward or back one month together.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Two adjacent month calendars sharing one range-selection state machine',
      'Three-click cycle: pick start, pick end, click again to start a fresh range',
      'Live hover preview highlights in-between days before the end date is confirmed',
      'Hover preview and confirmed range share the exact same highlighting logic',
      'Past dates are genuinely disabled with no click handler attached, not just styled',
      'Real millisecond-based nights calculation, correct across any month boundary',
      'Confirm button disables until a complete start-and-end range is selected',
      'Closures correctly capture each calendar day\'s own date for click and hover handlers',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Hotel, rental, and travel booking flows', desc: 'Let a guest pick check-in and check-out dates with a real nights count before proceeding to payment.' },
      { icon: 'FLOW', title: 'Equipment and venue rental platforms', desc: 'Pair with a [pricing calculator](/ui-snippets/pricing-usage-tier-breakdown/) that multiplies the selected nights by a nightly rate.' },
      { icon: 'FORM', title: 'Project and reporting date-range filters', desc: 'Reuse the same two-month range picker for filtering analytics or reports by a custom date window.' },
      { icon: 'LEARN', title: 'Learn range-selection state machine patterns', desc: 'Study how one selectDate() function handles the full start-then-end-then-reset click cycle without extra mode flags.' },
      { icon: 'DESIGN', title: 'Event and appointment scheduling tools', desc: 'Adapt the calendar grid for multi-day event scheduling with the same hover-preview technique.' },
      { icon: 'CODE', title: 'Related: Date Range Picker', desc: 'See the [Date Range Picker](/ui-snippets/date-range-picker/) for an inline, non-modal version of this same range-selection pattern.' },
    ],
    faqs: [
      { q: 'What happens if I click a date before my already-selected start date?', a: 'selectDate() checks if the clicked date is earlier than the current rangeStart, and if so, replaces rangeStart with it rather than treating it as an invalid click — this handles a visitor who picked a check-in date and then decided on an even earlier one, without forcing them to restart the whole selection.' },
      { q: 'How does the hover preview know which days to highlight?', a: 'buildMonthGrid() computes previewEnd as rangeEnd if it exists, otherwise hoverDate, then applies the same date > rangeStart && date < previewEnd check either way. Because both the live hover and the confirmed range flow through this identical check, the preview highlighting looks and behaves exactly like the final confirmed range, just before the second click has happened.' },
      { q: 'Can a visitor select a date in the past?', a: 'No — every calendar day before today gets both a disabled CSS class and a real disabled attribute on its button element, so no click event listener is even attached to it. This is enforced at the DOM level, not just visually discouraged with styling.' },
      { q: 'How is the nights count calculated?', a: 'Math.round((rangeEnd - rangeStart) / 86400000) subtracts the two Date objects (which produces a millisecond difference) and divides by 86,400,000 — the number of milliseconds in a day — to get a whole number of nights. This works correctly for any two dates, including a range that spans across the month boundary between the two visible calendars.' },
      { q: 'What happens if I click a third date after already having a complete range?', a: 'selectDate() checks rangeStart && rangeEnd as a combined condition alongside "no rangeStart yet," and if a complete range already exists, the newly clicked date starts an entirely fresh range — clearing both the old start and end — rather than trying to extend or replace just one side of the existing range.' },
      { q: 'Do the two calendars always show consecutive months?', a: 'Yes — leftMonth is the only tracked month state, and rightMonth is always computed as one month after it inside renderCalendars(). The prev/next arrow buttons move leftMonth by one month and re-render both calendars together, so they can never fall out of consecutive alignment.' },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the range-selection state machine by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how selectDate()'s three-branch logic (fresh start, replace start, set end) covers every click scenario without a separate "current mode" flag, and why buildMonthGrid() computes previewEnd as rangeEnd || hoverDate so the hover preview and the confirmed range share identical highlighting logic. The same assistant can help you extend it — ask it to add a maximum stay length (e.g. reject an end date more than 30 nights after the start), disable specific already-booked dates by checking them against a blocked-dates array passed into buildMonthGrid(), or add a minimum-lead-time rule so bookings cannot start today or tomorrow. It's also useful for an accessibility pass: ask whether the day buttons need aria-selected and aria-disabled attributes, and whether the whole calendar grid should be arrow-key navigable in addition to mouse interaction. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a date-range picker modal in plain HTML, CSS, and vanilla JavaScript showing two adjacent month calendars for selecting a check-in and check-out date — no date-picker library.

Requirements:
- A trigger button that opens a modal (backdrop plus centered dialog with a fade/scale transition), closable via a close button, backdrop click, and the Escape key.
- Two side-by-side month calendar grids inside the modal, always showing two consecutive months, each with its own weekday header row and a 7-column day grid including correctly positioned leading blank cells for the first week. Provide previous/next month navigation arrows that move both calendars together by one month.
- Implement range selection as a single function handling three cases from one click: if no start date is selected yet (or a complete range already exists), the clicked date becomes a new start date and clears any previous range; if a start date exists and the clicked date is earlier than it, the clicked date replaces the start date; otherwise the clicked date becomes the end date, completing the range.
- While a start date is selected but no end date yet, hovering over any later date must live-preview-highlight every day strictly between the start and the hovered date, using the exact same "in range" visual style and highlighting logic that a confirmed range would use — not a separate, different-looking preview state.
- Disable every date earlier than today at the DOM level (a real disabled button attribute, no click or hover handler attached), not merely a visual style.
- Display a summary line that updates through three phases: prompting for a start date, prompting for an end date once a start is chosen (showing the chosen start date), and finally showing both dates plus a real computed number of nights between them once the range is complete.
- A "Confirm dates" button must stay disabled until a complete start-and-end range is selected.
- Ensure click and hover handlers created inside the day-generation loop correctly capture each individual day's own date value, not a shared loop variable.`,
    },
  },
};

export default modalDateRangePicker;
