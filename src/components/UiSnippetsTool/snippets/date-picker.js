const datePicker = {
  id: 'date-picker',
  title: 'Date Picker',
  category: 'forms',
  html: `<div class="wrap">
  <div class="field">
    <label class="label">Select date</label>
    <div class="picker-wrap" id="picker-wrap">
      <button class="trigger" id="trigger" onclick="toggle()" type="button" aria-haspopup="true" aria-expanded="false">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span id="display-date">Select a date</span>
        <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>

      <div class="calendar" id="calendar" role="dialog" aria-modal="true" aria-label="Date picker">
        <div class="cal-header">
          <button class="nav-btn" onclick="shift(-1)" aria-label="Previous month">‹</button>
          <span class="month-label" id="month-label"></span>
          <button class="nav-btn" onclick="shift(1)" aria-label="Next month">›</button>
        </div>
        <div class="day-names">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div class="days" id="days"></div>
        <div class="cal-footer">
          <button class="today-btn" onclick="selectToday()">Today</button>
          <button class="clear-btn" onclick="clearDate()">Clear</button>
        </div>
      </div>
    </div>
    <div class="helper" id="helper"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px; }

.wrap { width: 100%; max-width: 280px; }
.label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }

.picker-wrap { position: relative; }

.trigger { width: 100%; display: flex; align-items: center; gap: 8px; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; font-size: 14px; color: #374151; cursor: pointer; transition: border-color 0.15s; text-align: left; }
.trigger:hover, .trigger.open { border-color: #6366f1; }
.trigger svg:first-child { color: #94a3b8; flex-shrink: 0; }
.trigger span { flex: 1; color: #9ca3af; }
.trigger span.selected { color: #0f172a; font-weight: 500; }
.chevron { color: #94a3b8; flex-shrink: 0; transition: transform 0.2s; }
.trigger.open .chevron { transform: rotate(180deg); }

.calendar { position: absolute; top: calc(100% + 6px); left: 0; width: 280px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); padding: 14px; z-index: 100; opacity: 0; transform: scale(0.97) translateY(-4px); pointer-events: none; transition: opacity 0.18s, transform 0.18s; }
.calendar.open { opacity: 1; transform: scale(1) translateY(0); pointer-events: all; }

.cal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.month-label { font-size: 14px; font-weight: 700; color: #0f172a; }
.nav-btn { width: 28px; height: 28px; border-radius: 7px; border: 1px solid #e2e8f0; background: #fff; color: #64748b; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.12s; }
.nav-btn:hover { border-color: #6366f1; color: #6366f1; }

.day-names { display: grid; grid-template-columns: repeat(7,1fr); text-align: center; margin-bottom: 6px; }
.day-names span { font-size: 10px; font-weight: 600; color: #94a3b8; padding: 3px 0; }

.days { display: grid; grid-template-columns: repeat(7,1fr); gap: 2px; }
.day { height: 32px; border-radius: 7px; border: none; background: transparent; font-size: 13px; color: #374151; cursor: pointer; transition: background 0.1s, color 0.1s; display: flex; align-items: center; justify-content: center; }
.day:hover:not(:disabled):not(.selected) { background: #f1f5f9; }
.day.other { color: #d1d5db; }
.day.today { font-weight: 700; color: #6366f1; }
.day.selected { background: #6366f1; color: #fff; font-weight: 700; }
.day:disabled { opacity: 0.4; cursor: not-allowed; }

.cal-footer { display: flex; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 1px solid #f1f5f9; }
.today-btn, .clear-btn { font-size: 12px; font-weight: 600; border: none; background: transparent; cursor: pointer; padding: 4px 8px; border-radius: 6px; transition: background 0.12s; }
.today-btn { color: #6366f1; }
.today-btn:hover { background: rgba(99,102,241,0.08); }
.clear-btn { color: #94a3b8; }
.clear-btn:hover { background: #f1f5f9; }

.helper { font-size: 12px; color: #94a3b8; margin-top: 6px; }`,
  js: `const today = new Date();
let cur = new Date(today.getFullYear(), today.getMonth(), 1);
let selected = null;
let isOpen = false;

function toggle() {
  isOpen = !isOpen;
  document.getElementById('calendar').classList.toggle('open', isOpen);
  document.getElementById('trigger').classList.toggle('open', isOpen);
  document.getElementById('trigger').setAttribute('aria-expanded', isOpen);
  if (isOpen) render();
}

function shift(dir) { cur.setMonth(cur.getMonth() + dir); render(); }

function render() {
  const y = cur.getFullYear(), m = cur.getMonth();
  document.getElementById('month-label').textContent =
    cur.toLocaleString('default', { month: 'long', year: 'numeric' });

  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevDays = new Date(y, m, 0).getDate();
  const grid = document.getElementById('days');
  grid.innerHTML = '';

  for (let i = firstDay - 1; i >= 0; i--) addDay(grid, prevDays - i, true);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d);
    const isToday = sameDay(date, today);
    const isSel = selected && sameDay(date, selected);
    addDay(grid, d, false, isToday, isSel, date);
  }
  const rem = (firstDay + daysInMonth) % 7;
  if (rem) for (let i = 1; i <= 7 - rem; i++) addDay(grid, i, true);
}

function addDay(grid, n, other, isToday, isSel, date) {
  const btn = document.createElement('button');
  btn.className = 'day' + (other?' other':'') + (isToday?' today':'') + (isSel?' selected':'');
  btn.textContent = n;
  if (date) btn.onclick = () => pick(date);
  grid.appendChild(btn);
}

function pick(date) {
  selected = date;
  const span = document.getElementById('display-date');
  span.textContent = date.toLocaleDateString('default', { weekday:'short', year:'numeric', month:'short', day:'numeric' });
  span.className = 'selected';
  document.getElementById('helper').textContent = 'Selected: ' + date.toLocaleDateString();
  toggle();
}

function selectToday() { cur = new Date(today.getFullYear(), today.getMonth(), 1); pick(new Date(today)); }
function clearDate() {
  selected = null;
  const span = document.getElementById('display-date');
  span.textContent = 'Select a date'; span.className = '';
  document.getElementById('helper').textContent = '';
}

function sameDay(a, b) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }

document.addEventListener('click', e => {
  if (isOpen && !e.target.closest('#picker-wrap')) toggle();
});`,
  seo: {
    title: 'Date Picker — Free HTML CSS JS Calendar Snippet',
    description: 'Calendar dropdown with month navigation, today highlight, selected state and Today/Clear actions. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Date Picker — Custom Calendar Dropdown, Month Navigation, Today Highlight & Click-Outside Close',
      description: `A date picker is one of the most commonly needed but hardest-to-build form components. The native HTML date input looks wildly different across browsers and operating systems, cannot be styled to match your design system, and lacks features like Today/Clear shortcuts. This snippet provides a complete custom date picker: a styled trigger button that shows the selected date, a calendar dropdown with month navigation, today highlighting, selected date state, and Today/Clear footer buttons — all in plain HTML, CSS, and vanilla JavaScript. For a start/end range use the [date range picker](/ui-snippets/date-range-picker/); for time-of-day, the [time picker](/ui-snippets/time-picker/).

**The calendar grid generation**

The render() function generates the calendar grid the same way as the [Calendar Widget](/ui-snippets/calendar-widget/) snippet: compute firstDay (the weekday the month starts on), daysInMonth, and prevDays (for padding). The grid uses CSS grid with repeat(7,1fr) columns. Each cell is a button element — keyboard-accessible by default. The .today class highlights today's date without filling the cell; .selected applies the filled accent background.

**The dropdown animation**

The calendar panel uses opacity: 0 + transform: scale(0.97) translateY(-4px) in the closed state. Adding .open switches to opacity: 1 + scale(1) + translateY(0). CSS transition: opacity 0.18s, transform 0.18s creates the smooth pop-in effect. The transform-origin defaults to top left, which matches the trigger button position.

**Click-outside close**

A document click listener checks e.target.closest('#picker-wrap'). If the click was outside the picker wrapper, toggle() is called to close the calendar. The listener is attached once to the document and fires for all clicks — efficient for pages with multiple date pickers.

**Selected date display**

When a date is selected, pick(date) calls date.toLocaleDateString() with a format showing weekday, month, day, and year ("Mon, Jun 2, 2026"). The trigger span text updates and the .selected class changes its colour from placeholder grey to dark text. The helper text below the trigger confirms the selection.

**Accessibility**

The trigger button has aria-haspopup="true" and aria-expanded toggling with open state. The calendar panel has role="dialog" and aria-modal="true". All day cells are button elements so they are keyboard-focusable. Arrow key navigation between days can be added by handling keydown on the grid and moving focus to adjacent cells.

**Connecting to form submission**

To include the date in a form POST, add a hidden input: hiddenInput.value = selected ? selected.toISOString().split('T')[0] : ''. Update this in pick() alongside the display. The YYYY-MM-DD ISO format is the standard for backend date handling.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click the date trigger button to open the calendar', text: 'The calendar slides open below the trigger with a scale+opacity animation. Click ‹ and › to navigate months. Click any day to select it and close the calendar.' },
      { title: 'Use the Today and Clear footer buttons', text: 'Click "Today" to navigate to the current month and select today\'s date. Click "Clear" to deselect the current date and reset the trigger to placeholder state.' },
      { title: 'Get the selected date in JavaScript', text: 'Read the selected variable directly: if (selected) { const iso = selected.toISOString().split("T")[0]; }. Add a hidden input and update its value in pick() to include the date in a standard HTML form submission.' },
      { title: 'Set minimum and maximum dates', text: 'In addDay(), add a disabled condition: const isPast = date < minDate; btn.disabled = isPast. Add the .other class to past dates for a dimmed appearance. This prevents users from selecting dates outside your allowed range.' },
      { title: 'Change the date display format', text: 'Update the toLocaleDateString() format in pick(): date.toLocaleDateString("en-GB") for DD/MM/YYYY, or date.toLocaleDateString("default",{month:"long",day:"numeric",year:"numeric"}) for "June 2, 2026".' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component with useState for selected and cur dates, or "Tailwind" for a React + Tailwind CSS version.' },
    ]},
    features: ['Calendar grid: firstDay padding, daysInMonth cells, trailing padding — repeat(7,1fr)','Today highlight: .today class with accent colour text, no background fill','Selected state: .selected with filled accent background and white text','Scale+opacity dropdown animation: scale(0.97)→1 + opacity 0→1 on .open','Click-outside close: document listener + e.target.closest() check','Today shortcut: navigates to current month and selects today in one click','Clear button: resets selected state and trigger display text','Accessible: aria-haspopup, aria-expanded, role=dialog on calendar panel'],
    useCases: [
      { icon: 'FORM', title: 'Booking and reservation date selection forms', desc: 'Replace native date inputs in booking flows, appointment scheduling, and reservation systems. Set a minimum date of today to prevent selecting past dates. The Today button is especially useful for same-day bookings.' },
      { icon: 'APP', title: 'Project management task deadline pickers', desc: 'Use in task creation forms where users set due dates. The month navigation makes it easy to set deadlines weeks ahead. The clear button lets users remove a deadline without deleting the task.' },
      { icon: 'FLOW', title: 'Date range start and end date selection', desc: 'Adapt two date pickers side by side for check-in/check-out or start/end date selection. Enforce constraints between them: the end date picker sets minDate to the selected start date so end cannot be before start.' },
      { icon: 'DESIGN', title: 'Filter and search interface date constraints', desc: 'Use in dashboard filter panels for date-range filtering of data. The compact calendar fits naturally inside a filter sidebar or popover. Connect the selected date to an API call that fetches records for the chosen date.' },
      { icon: 'LEARN', title: 'Study JavaScript Date arithmetic for calendar generation', desc: 'The render() function teaches how to use new Date(year, month, 0).getDate() for the last day of the previous month, new Date(year, month+1, 0).getDate() for daysInMonth, and getDay() for the starting weekday — the three calculations needed for any calendar grid.' },
      { icon: 'CODE', title: 'Replace native date inputs for consistent cross-browser styling', desc: 'The native <input type="date"> renders differently on Chrome (calendar icon), Firefox (dropdown), iOS Safari (spinner wheel), and Edge. This custom date picker provides identical appearance and behaviour across all browsers with full CSS control.' },
      { icon: 'CODE', title: 'Related: Floating Label Select', desc: 'See the [Floating Label Select](/ui-snippets/floating-label-select/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I disable past dates to prevent selecting dates before today?', a: 'In the addDay() function, add a disabled check: const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate()); btn.disabled = isPast; if (isPast) btn.classList.add("other"). This greys out past dates and makes them unclickable. For a range restriction, replace today with your minDate and maxDate constants: btn.disabled = date < minDate || date > maxDate.' },
      { q: 'How do I wire the selected date to an HTML form submission?', a: 'Add a hidden input inside the form: <input type="hidden" name="date" id="date-value">. In the pick() function, add: document.getElementById("date-value").value = date.toISOString().split("T")[0]. This gives the date in YYYY-MM-DD ISO format which works with all server-side date parsers. For a date range form, use two hidden inputs — date-start and date-end — and update each from its respective date picker.' },
      { q: 'How do I create a date range picker with start and end dates?', a: 'Add two .picker-wrap divs side by side in a flex row. Each has its own calendar and selected variable. In the second picker, set minDate = firstSelected to prevent the end date being before the start date. Add range highlighting: after selecting start, in render() add a .in-range class to days between start and the currently hovered day. Use CSS background on .in-range to highlight the range area.' },
      { q: 'How do I use this date picker in React?', a: 'Click "JSX" to download. Manage selected (Date|null) and cur (Date — first of displayed month) with useState. Compute the calendar grid with useMemo([cur]). Handle day clicks with setSelected(date) and toggle the calendar with useState(false). For keyboard accessibility, add onKeyDown to the grid to handle ArrowLeft/ArrowRight/ArrowUp/ArrowDown for navigating days and Enter to select.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out the grid math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how firstDay, daysInMonth, and prevDays combine inside render() to fill the leading and trailing padding cells correctly for every month length, including February in leap years. The same assistant can help you optimize it, for example checking whether rebuilding the entire days grid with innerHTML on every shift() call is wasteful compared to patching only the changed cells. It is just as useful for extending the picker: ask it to add a minDate/maxDate range restriction, keyboard arrow-key navigation between day buttons, or a small preset-range dropdown like "next 7 days". Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a custom date picker in plain HTML, CSS, and JavaScript with no external date library and no native input type="date" — just a trigger button and a popover calendar built from scratch.

Requirements:
- A trigger button showing a placeholder or the selected date, toggling an absolutely-positioned calendar panel with a scale plus opacity transition (not display none/block, so the transition actually plays).
- Compute the calendar grid purely from the native Date object: use getDay() on the first of the month to find the starting weekday, new Date(year, month + 1, 0).getDate() for the number of days in the month, and new Date(year, month, 0).getDate() for the previous month's length used only to number the leading padding cells.
- Render every day cell as a real button element (not a div with a click handler) so it is keyboard-focusable by default, and give today's cell and the selected cell distinct CSS classes rather than inline styles.
- Include Previous/Next month navigation that mutates a single cursor Date and re-renders the grid, plus Today and Clear footer buttons.
- Close the calendar when a day is clicked and also when the user clicks anywhere outside the picker, using a single document-level click listener with closest() to detect outside clicks.
- Format the selected date for display with toLocaleDateString and also expose it in ISO YYYY-MM-DD form so it could be written into a hidden form input.`,
    },
  },
};

export default datePicker;
