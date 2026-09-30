const timePicker = {
  id: 'time-picker',
  title: 'Time Picker',
  lastmod: '2026-06-10',
  category: 'forms',
  html: `<div class="wrap">
  <div class="field">
    <label class="label">Select time</label>
    <div class="picker-wrap" id="picker-wrap">
      <button class="trigger" id="trigger" type="button" aria-haspopup="true" aria-expanded="false">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span id="display-time">Select a time</span>
        <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>

      <div class="panel" id="panel" role="dialog" aria-modal="true" aria-label="Time picker">
        <div class="columns">
          <div class="col">
            <div class="col-label">Hour</div>
            <div class="scroll-list" id="hour-list"></div>
          </div>
          <div class="col-divider">:</div>
          <div class="col">
            <div class="col-label">Min</div>
            <div class="scroll-list" id="minute-list"></div>
          </div>
          <div class="col ampm-col">
            <div class="col-label">AM/PM</div>
            <div class="ampm-toggle" id="ampm-toggle">
              <button class="ampm-btn" id="btn-am">AM</button>
              <button class="ampm-btn" id="btn-pm">PM</button>
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <button class="now-btn" id="btn-now">Now</button>
          <button class="ok-btn" id="btn-ok">OK</button>
          <button class="clear-btn" id="btn-clear">Clear</button>
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

.panel { position: absolute; top: calc(100% + 6px); left: 0; width: 270px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); padding: 14px 14px 10px; z-index: 100; opacity: 0; transform: translateY(-6px); pointer-events: none; transition: opacity 0.18s, transform 0.18s; }
.panel.open { opacity: 1; transform: translateY(0); pointer-events: all; }

.columns { display: flex; align-items: flex-start; gap: 6px; }

.col { display: flex; flex-direction: column; align-items: center; flex: 1; }
.col-label { font-size: 10px; font-weight: 700; color: #94a3b8; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px; }

.col-divider { font-size: 20px; font-weight: 700; color: #cbd5e1; align-self: center; padding-top: 22px; flex: 0; }

.scroll-list { width: 100%; max-height: 168px; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 9px; scrollbar-width: thin; scrollbar-color: #e2e8f0 transparent; }
.scroll-list::-webkit-scrollbar { width: 4px; }
.scroll-list::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }

.time-item { display: flex; align-items: center; justify-content: center; height: 36px; font-size: 14px; color: #374151; cursor: pointer; transition: background 0.1s, color 0.1s; border-radius: 0; }
.time-item:hover:not(.selected) { background: #f1f5f9; }
.time-item.selected { background: #6366f1; color: #fff; font-weight: 700; }

.ampm-col { min-width: 52px; flex: 0 0 52px; }
.ampm-toggle { display: flex; flex-direction: column; gap: 6px; width: 100%; border: 1px solid #e2e8f0; border-radius: 9px; overflow: hidden; }
.ampm-btn { padding: 10px 0; font-size: 13px; font-weight: 600; border: none; background: transparent; color: #64748b; cursor: pointer; transition: background 0.12s, color 0.12s; width: 100%; }
.ampm-btn:hover:not(.active) { background: #f1f5f9; }
.ampm-btn.active { background: #6366f1; color: #fff; }

.panel-footer { display: flex; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 1px solid #f1f5f9; }
.now-btn, .clear-btn, .ok-btn { font-size: 12px; font-weight: 600; border: none; background: transparent; cursor: pointer; padding: 4px 8px; border-radius: 6px; transition: background 0.12s; }
.now-btn { color: #6366f1; }
.now-btn:hover { background: rgba(99,102,241,0.08); }
.clear-btn { color: #94a3b8; }
.clear-btn:hover { background: #f1f5f9; }
.ok-btn { background: #6366f1; color: #fff; padding: 4px 14px; }
.ok-btn:hover { background: #4f46e5; }

.helper { font-size: 12px; color: #94a3b8; margin-top: 6px; }`,
  js: `let selectedHour = null;
let selectedMinute = null;
let ampm = 'AM';
let isOpen = false;

const HOURS = [1,2,3,4,5,6,7,8,9,10,11,12];
const MINUTES = [0,5,10,15,20,25,30,35,40,45,50,55];

function toggle() {
  isOpen = !isOpen;
  document.getElementById('panel').classList.toggle('open', isOpen);
  document.getElementById('trigger').classList.toggle('open', isOpen);
  document.getElementById('trigger').setAttribute('aria-expanded', isOpen);
  if (isOpen) render();
}

function selectHour(h) {
  selectedHour = h;
  render();
  updateDisplay();
}

function selectMinute(m) {
  selectedMinute = m;
  render();
  updateDisplay();
}

function setAmPm(val) {
  ampm = val;
  document.getElementById('btn-am').classList.toggle('active', ampm === 'AM');
  document.getElementById('btn-pm').classList.toggle('active', ampm === 'PM');
  updateDisplay();
}

function render() {
  const hourList = document.getElementById('hour-list');
  hourList.innerHTML = '';
  HOURS.forEach(h => {
    const el = document.createElement('div');
    el.className = 'time-item' + (selectedHour === h ? ' selected' : '');
    el.textContent = h;
    el.onclick = () => selectHour(h);
    hourList.appendChild(el);
  });

  const minList = document.getElementById('minute-list');
  minList.innerHTML = '';
  MINUTES.forEach(m => {
    const el = document.createElement('div');
    el.className = 'time-item' + (selectedMinute === m ? ' selected' : '');
    el.textContent = String(m).padStart(2, '0');
    el.onclick = () => selectMinute(m);
    minList.appendChild(el);
  });

  const selHourEl = hourList.querySelector('.selected');
  if (selHourEl) selHourEl.scrollIntoView({ block: 'nearest' });
  const selMinEl = minList.querySelector('.selected');
  if (selMinEl) selMinEl.scrollIntoView({ block: 'nearest' });

  document.getElementById('btn-am').classList.toggle('active', ampm === 'AM');
  document.getElementById('btn-pm').classList.toggle('active', ampm === 'PM');
}

function updateDisplay() {
  const span = document.getElementById('display-time');
  if (selectedHour === null || selectedMinute === null) {
    span.textContent = 'Select a time';
    span.className = '';
    document.getElementById('helper').textContent = '';
    return;
  }
  const minStr = String(selectedMinute).padStart(2, '0');
  span.textContent = selectedHour + ':' + minStr + ' ' + ampm;
  span.className = 'selected';
  document.getElementById('helper').textContent = '24h: ' + getValue();
}

function setNow() {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes();
  ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  selectedHour = h;
  selectedMinute = Math.round(m / 5) * 5 % 60;
  render();
  updateDisplay();
}

function clearTime() {
  selectedHour = null;
  selectedMinute = null;
  ampm = 'AM';
  render();
  updateDisplay();
}

function getValue() {
  if (selectedHour === null || selectedMinute === null) return '';
  let h24 = selectedHour % 12;
  if (ampm === 'PM') h24 += 12;
  return String(h24).padStart(2, '0') + ':' + String(selectedMinute).padStart(2, '0');
}

document.getElementById('trigger').addEventListener('click', toggle);
document.getElementById('btn-am').addEventListener('click', () => setAmPm('AM'));
document.getElementById('btn-pm').addEventListener('click', () => setAmPm('PM'));
document.getElementById('btn-now').addEventListener('click', setNow);
document.getElementById('btn-ok').addEventListener('click', () => { if (isOpen) toggle(); });
document.getElementById('btn-clear').addEventListener('click', clearTime);

document.addEventListener('click', e => {
  if (!isOpen) return;
  const wrap = document.getElementById('picker-wrap');
  if (!e.composedPath().includes(wrap)) toggle();
});

render();`,
  seo: {
    title: 'Time Picker — Free HTML CSS JS Dropdown Snippet',
    description: 'Time input with scrollable hour and minute columns, AM/PM toggle and Now button — no library. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Time Picker — Custom Time Input Dropdown, Scroll Columns, AM/PM Toggle & 24h Output in Vanilla JS',
      description: `The native HTML \`<input type="time">\` is one of the most inconsistently implemented form controls across browsers. On desktop Chrome it renders as a compact spinner with up/down arrows that are hard to click precisely; on iOS Safari it hijacks the full screen with a drum-roll picker that cannot be styled; on Firefox it presents a plain text field where users must type time manually; on Samsung Internet it opens yet another entirely different UI. None of these native controls can be styled to match your design system, none expose clean events that fire only when selection is complete, and none support features like a "Now" shortcut or automatic 5-minute rounding. Every time you reach for \`<input type="time">\` in a production form, you are accepting unpredictable UI across your user base. This custom time picker replaces the native control entirely: a styled trigger button that shows the selected time, a panel with two scrollable columns for hours and minutes, a segmented AM/PM toggle, a Now shortcut, an OK button, a Clear button, and a 24-hour format helper — all in plain HTML, CSS, and vanilla JavaScript with zero dependencies and zero npm packages.

**Data model: HOURS and MINUTES arrays**

The picker is driven by two simple arrays at the top of the script: \`HOURS = [1,2,3,4,5,6,7,8,9,10,11,12]\` and \`MINUTES = [0,5,10,15,20,25,30,35,40,45,50,55]\`. This array-based model is the key architectural decision. It means the step size, the range, and the number of items are all controlled by editing one line — swap \`MINUTES\` to \`[0,15,30,45]\` for quarterly steps or \`Array.from({length:60},(_,i)=>i)\` for every-minute granularity without touching any rendering code. State is tracked in three variables: \`selectedHour\` (null or 1-12), \`selectedMinute\` (null or 0-55), and \`ampm\` (string "AM" or "PM"). Null values mean "nothing selected yet" and cause the trigger to show its placeholder text.

**How the scroll columns work**

The \`render()\` function is the single source of truth for both columns. It clears each container with \`innerHTML = ''\`, then maps over \`HOURS\` and \`MINUTES\` using \`document.createElement\` to build each \`div.time-item\`. The selected item gets the \`.selected\` class which applies the indigo background and white text. Each item gets a click listener that calls \`selectHour(h)\` or \`selectMinute(m)\`. After rebuilding, \`scrollIntoView({ block: 'nearest' })\` is called on the selected element so it scrolls into view without snapping the whole page. The 5-minute increment grid for minutes is a deliberate UX choice — Google Calendar, Apple Calendar, and Outlook all default to 15 or 30-minute grids; 5-minute steps give more precision while still keeping the list at 12 items instead of 60.

**AM/PM toggle design and state**

The AM/PM selector uses two \`<button>\` elements inside a flex column container with \`overflow: hidden\` and a shared border — a classic segmented-control pattern that renders as a single compound widget. The active button gets the \`.active\` class (indigo background, white text); the inactive button stays transparent. \`setAmPm(val)\` updates the \`ampm\` state variable, toggles the class on both buttons, and calls \`updateDisplay()\` to refresh the trigger label and the 24h helper text simultaneously. Because AM/PM is independent of hour and minute selection, changing it never triggers a full \`render()\` — only a display update — keeping the interaction snappy.

**The Now button and time rounding**

\`setNow()\` reads \`new Date()\` to get the current local time. The raw minute from \`now.getMinutes()\` is rounded to the nearest 5-minute mark with \`Math.round(m / 5) * 5 % 60\` — so 2:47 PM becomes 2:45 PM and 2:48 PM becomes 2:50 PM. The 24h hour is converted to 12h format with \`h % 12 || 12\`, which correctly maps hour 0 (midnight) to 12, hour 13 to 1, and so on. AM/PM is determined by \`h >= 12\` before the modulo conversion. After setting all three state variables, \`render()\` and \`updateDisplay()\` are called to rebuild the columns and show the time in the trigger.

**24h getValue() output for APIs and forms**

The \`getValue()\` function converts the 12h picker state back to a 24-hour "HH:MM" string for use in APIs, forms, and backend date libraries. It starts with \`selectedHour % 12\` which yields 0 for the 12 o'clock position (both 12 AM and 12 PM), then adds 12 if \`ampm === 'PM'\`, producing the correct 24h hour in all edge cases. Both the hour and minute are zero-padded with \`padStart(2,'0')\` to guarantee the "HH:MM" format that \`<input type="hidden">\` fields, ISO 8601 timestamps, REST APIs, and backend time parsers expect. The 24h string also appears in the helper text below the trigger (prefixed with "24h:") so users can verify the value without opening the picker again.

**Opening animation and robust click-outside close**

The dropdown panel uses \`opacity: 0\` and \`transform: translateY(-6px)\` in its closed state. Adding the \`.open\` class transitions to \`opacity: 1\` and \`translateY(0)\`, creating a smooth downward reveal that takes 180ms — fast enough to feel instant but slow enough to feel polished. The transition is driven entirely by CSS so there is no JavaScript \`requestAnimationFrame\` loop and no layout thrashing. The click-outside close uses \`e.composedPath().includes(wrap)\` rather than \`e.target.closest()\`. This is important because the scroll column's \`render()\` rebuilds the DOM on every selection — if a clicked item is removed from the DOM before the event bubbles to \`document\`, \`e.target.closest()\` returns \`null\` and the picker closes unexpectedly. \`composedPath()\` captures the original event path at dispatch time, before any DOM mutation, so outside-click detection is reliable even after re-renders.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click the trigger button to open the time panel', text: 'The panel slides down with a smooth opacity and translateY animation. Two scrollable columns appear — Hours (1-12) and Minutes (00-55 in 5-minute steps) — alongside the AM/PM toggle.' },
      { title: 'Scroll the hour column and click your desired hour', text: 'Click any hour from 1 to 12. The selected item is immediately highlighted in indigo. The column scrolls to keep your selection visible if it was off-screen.' },
      { title: 'Scroll the minute column and click your desired minute', text: 'Click any minute value (00, 05, 10 ... 55). Once both hour and minute are selected, the trigger button label updates to show the formatted time, for example "2:30 PM".' },
      { title: 'Toggle AM or PM using the segmented button', text: 'Click AM or PM in the right column. The active segment fills with the accent colour. The trigger label and the 24h helper text below it update instantly to reflect the change.' },
      { title: 'Use the Now button to jump to the current time', text: 'Click "Now" at the bottom of the panel. The picker reads the current system time, rounds the minutes to the nearest 5-minute mark, sets AM/PM automatically, and highlights the correct row in both columns.' },
      { title: 'Read the selected value with getValue() or use the hidden input pattern', text: 'Call getValue() to receive the time as a "HH:MM" 24-hour string (e.g. "14:30"). To wire it to a form, add a hidden input and set its value in updateDisplay() with document.getElementById("time-value").value = getValue(). Click "Clear" to reset the picker to its empty state.' },
    ]},
    features: [
      'Scrollable hour column (1-12) with click selection and .selected accent highlight',
      'Scrollable minute column (00-55, 5-minute steps) — matches Google Calendar and Outlook conventions',
      'AM/PM segmented toggle button: active segment fills with indigo accent background',
      'Now button: reads system time, rounds to nearest 5 minutes, sets AM/PM automatically',
      'Clear button: resets hour, minute, and AM/PM state and restores placeholder display',
      '24h getValue() output: converts 12h display state to zero-padded HH:MM string for APIs and backends',
      'Smooth open/close animation: opacity + translateY transition, no JS animation loop',
      'Click-outside close: document listener + e.target.closest() — efficient and compatible with nested interactives',
    ],
    useCases: [
      { icon: 'FORM', title: 'Appointment scheduling and booking time selection', desc: 'Replace native time inputs in booking flows, clinic scheduling forms, and restaurant reservation systems where time precision matters. Pair with the [date picker](/ui-snippets/date-picker) to let users select both date and time in a single consistent UI. The 5-minute step grid prevents nonsensical times like 2:47 PM, the Now button fills in the current time with one click, and the 24h helper text lets users instantly verify their selection maps to the correct afternoon or morning slot.' },
      { icon: 'APP', title: 'Calendar event creation and editing panels', desc: 'Embed inside an event creation [modal](/ui-snippets/modal) to let users set start and end times with a familiar column-picker UX. Render two pickers side by side and compare their getValue() outputs on OK to enforce "end must be after start" validation. The 24h output string can be concatenated directly with an ISO date string to produce a full datetime for Google Calendar API, Outlook API, or iCal DTSTART/DTEND fields.' },
      { icon: 'FLOW', title: 'Workflow automation and scheduled task configuration', desc: 'Embed in automation builders, no-code cron-job schedulers, and notification setup panels where users configure exactly when a recurring task should fire. The getValue() 24h string maps directly to the hour and minute fields of a Unix cron expression without any parsing. Pair with a [segmented control](/ui-snippets/segmented-control) for day-of-week selection to build a complete recurring schedule UI.' },
      { icon: 'DESIGN', title: 'Design system form component library reference implementation', desc: 'Use this snippet as a clean reference when building a time picker for your component library. The segmented AM/PM toggle, scrollable column pattern, array-driven data model, and trigger-button disclosure pattern all follow the same conventions as Material UI\'s TimePicker, shadcn/ui\'s time-picker, and Radix UI\'s Select — making the migration to a framework component straightforward while letting you ship the vanilla version immediately alongside your other [UI snippets](/ui-snippets).' },
      { icon: 'LEARN', title: 'Learn 12h/24h conversion and time rounding in JavaScript', desc: 'The \`setNow()\` and \`getValue()\` functions teach two time-handling patterns that every frontend developer needs: converting 12h to 24h format using \`h % 12 + (ampm === "PM" ? 12 : 0)\` (including the midnight/noon edge case), and rounding a raw minute to a discrete grid with \`Math.round(m / 5) * 5 % 60\`. These same patterns appear in [countdown timers](/ui-snippets/countdown-timer), calendar widgets, time-ago formatters, and any scheduling logic you will encounter in production apps.' },
      { icon: 'CODE', title: 'Cross-browser consistent time input with full CSS control', desc: 'The native \`<input type="time">\` renders as a drum wheel on iOS Safari, a plain text field on Firefox, a custom spinner on Chrome, and something else entirely on Samsung Internet — none of them styleable to match your design system. This custom picker renders pixel-identically in every browser, inherits your CSS custom properties, and can be themed to match any [form component](/ui-snippets) in your UI library. Swap the indigo \`#6366f1\` accent to your brand color and the whole component updates without touching the JS.' },
    ],
    faqs: [
      { q: 'How do I get the selected time value to use in a form submission?', a: 'Call getValue() which returns the time as a 24-hour "HH:MM" string (e.g. "14:30"), or an empty string if no time is selected. To include it in a standard HTML form POST, add a hidden input: <input type="hidden" name="appointment_time" id="time-value">. Then inside updateDisplay(), add a single line: document.getElementById("time-value").value = getValue(). On every selection change the hidden field stays in sync. The HH:MM format is accepted directly by Python (datetime.strptime(val, "%H:%M")), PHP (DateTime::createFromFormat("H:i", $val)), Ruby (Time.strptime(val, "%H:%M")), and Node.js (new Date("1970-01-01T" + getValue() + ":00Z")).' },
      { q: 'How do I change the minute step from 5 minutes to 15 or 30 minutes?', a: 'Edit the MINUTES constant at the top of the script. For 15-minute steps use const MINUTES = [0,15,30,45]. For 30-minute steps use const MINUTES = [0,30]. For every-minute granularity use const MINUTES = Array.from({length:60},(_,i)=>i). The render() function iterates over the MINUTES array to build the column, so any array of integers 0-59 works without any other code change. For long lists like 60 items, add scroll-snap-type: y mandatory on .scroll-list and scroll-snap-align: center on .time-item to give a mobile drum-picker feel. Also update setNow() to round to your step size: for 15-min steps change 5 to 15 in Math.round(m / 15) * 15 % 60.' },
      { q: 'How do I use this time picker with a 24-hour clock instead of AM/PM?', a: 'Four changes are required. First, replace HOURS with Array.from({length:24},(_,i)=>i) to list hours 0-23. Second, hide the AM/PM column with .ampm-col { display: none }. Third, update selectHour(h) to store selectedHour = h without any 12h logic. Fourth, simplify getValue() to return String(selectedHour).padStart(2,"0") + ":" + String(selectedMinute).padStart(2,"0") without AM/PM conversion. Finally, update the trigger label format in updateDisplay() to use String(selectedHour).padStart(2,"0") + ":" + minStr. setNow() already uses getHours() which is 24h, so only remove the ampm line and the h % 12 || 12 conversion.' },
      { q: 'How do I pre-populate the picker with a specific time on page load?', a: 'Call selectHour(), the internal state setters, and updateDisplay() after the script initialises. For example, to pre-select 9:00 AM: selectedHour = 9; selectedMinute = 0; ampm = "AM"; updateDisplay(). If you have a "HH:MM" string from a server (e.g. "14:30"), parse it first: const [hh, mm] = "14:30".split(":").map(Number); ampm = hh >= 12 ? "PM" : "AM"; selectedHour = hh % 12 || 12; selectedMinute = mm; updateDisplay(). Call render() as well if the panel might be opened invalid, so the correct items are highlighted when it first shows.' },
    ],
    aiPrompt: {
      paragraph: `Have an AI coding assistant like Claude walk through why the click-outside handler checks e.composedPath().includes(wrap) instead of the more common e.target.closest(wrap) — it's a subtle bug fix tied to render() rebuilding the DOM on every selection, and worth understanding before you copy the pattern elsewhere. It's also worth asking whether rebuilding both scroll-list columns from scratch on every single click is wasteful compared to just updating the .selected class on the two affected elements. For extending the picker, ask for keyboard arrow-key navigation within the open scroll columns, a way to disable specific times (like a booking system's blocked slots), or a compact inline variant that skips the dropdown and shows the columns directly in the page flow. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a custom time picker dropdown in plain HTML, CSS, and JavaScript that replaces the native input type="time" entirely — no native time input, no library.

Requirements:
- A trigger button showing the currently selected time (or a placeholder) that opens a panel containing two independently scrollable columns — one listing hours 1 through 12, one listing minutes in 5-minute increments from 00 to 55 — plus a segmented AM/PM toggle.
- Render both scroll columns from two plain arrays of numbers (not hardcoded markup), so changing the minute step to 15 or 30 minutes is a one-line array edit with no other code changes.
- Clicking an item in either column must update the selection, rebuild that column's highlighted state, and scroll the selected item into view with scrollIntoView using the "nearest" block option so it doesn't jump the whole page.
- Provide a "Now" button that reads the real current time, rounds the minutes to the nearest step in the MINUTES array, derives the correct AM/PM, and updates both columns and the toggle in one call.
- Expose a function that converts the picker's 12-hour internal state (hour, minute, AM/PM) into a zero-padded 24-hour "HH:MM" string suitable for forms and APIs, correctly mapping 12 AM to hour 00 and 12 PM to hour 12.
- Close the dropdown on Escape and on any click outside it, using the event's composed path (not a simple closest() check) so that a click on an option that gets removed from the DOM during a re-render still correctly registers as "inside" the picker before it closes.`,
    },
  },
};

export default timePicker;

