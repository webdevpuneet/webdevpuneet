const availabilityScheduler = {
  id: 'availability-scheduler',
  title: 'Availability Scheduler',
  lastmod: '2026-06-22',
  category: 'forms',
  html: `<div class="avs-card">
  <div class="avs-head">
    <div>
      <h3>Set your weekly availability</h3>
      <p>Click or drag across the grid to mark when you're free.</p>
    </div>
    <button type="button" class="avs-clear" id="avsClear">Clear all</button>
  </div>

  <div class="avs-grid-wrap">
    <div class="avs-grid" id="avsGrid"></div>
  </div>

  <div class="avs-foot">
    <span class="avs-legend"><i class="avs-swatch on"></i> Available <i class="avs-swatch off"></i> Unavailable</span>
    <span class="avs-total"><b id="avsHours">0</b> hrs / week</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.avs-card{background:#fff;border-radius:16px;padding:20px;width:100%;max-width:520px;box-shadow:0 18px 44px rgba(15,23,42,.1)}
.avs-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:16px}
.avs-head h3{font-size:15.5px;font-weight:800;color:#0f172a}
.avs-head p{font-size:12px;color:#94a3b8;margin-top:2px}
.avs-clear{border:1.5px solid #e2e8f0;background:#fff;border-radius:8px;padding:7px 12px;font-size:12px;font-weight:700;color:#475569;cursor:pointer;flex-shrink:0;transition:border-color .15s,color .15s}
.avs-clear:hover{border-color:#fca5a5;color:#dc2626}

.avs-grid-wrap{overflow-x:auto;padding-bottom:4px}
.avs-grid{display:grid;grid-template-columns:auto repeat(9,1fr);gap:3px;min-width:420px;user-select:none}
.avs-corner{}
.avs-hcol{font-size:10px;font-weight:700;color:#94a3b8;text-align:center;padding-bottom:4px}
.avs-day{font-size:11.5px;font-weight:700;color:#475569;display:flex;align-items:center;padding-right:8px}
.avs-cell{aspect-ratio:1;border-radius:5px;background:#f1f5f9;cursor:pointer;transition:background .1s,transform .1s}
.avs-cell:hover{transform:scale(1.08)}
.avs-cell.on{background:#6366f1}
.avs-cell.on:hover{background:#4f46e5}

.avs-foot{display:flex;align-items:center;justify-content:space-between;margin-top:16px;padding-top:14px;border-top:1px solid #f1f5f9}
.avs-legend{display:flex;align-items:center;gap:6px;font-size:11.5px;color:#94a3b8;font-weight:600}
.avs-swatch{width:12px;height:12px;border-radius:3px;display:inline-block}
.avs-swatch.on{background:#6366f1}
.avs-swatch.off{background:#f1f5f9}
.avs-swatch.off{margin-left:6px}
.avs-total{font-size:13px;color:#475569;font-weight:600}
.avs-total b{font-size:16px;font-weight:800;color:#0f172a}`,

  js: `var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var START_HOUR = 9;          // 9am
var SLOTS = 9;               // 9am–6pm, one cell per hour
var grid = document.getElementById('avsGrid');
var selected = {};           // key "day-slot" -> true
var painting = false;
var paintValue = true;       // true = turn on, false = turn off

function hourLabel(i) {
  var h = START_HOUR + i;
  var period = h < 12 ? 'a' : 'p';
  var h12 = h % 12 === 0 ? 12 : h % 12;
  return h12 + period;
}

function build() {
  var html = '<div class="avs-corner"></div>';
  for (var s = 0; s < SLOTS; s++) html += '<div class="avs-hcol">' + hourLabel(s) + '</div>';
  DAYS.forEach(function (day, d) {
    html += '<div class="avs-day">' + day + '</div>';
    for (var s = 0; s < SLOTS; s++) {
      html += '<div class="avs-cell" data-key="' + d + '-' + s + '"></div>';
    }
  });
  grid.innerHTML = html;
}

function setCell(key, on) {
  if (on) selected[key] = true; else delete selected[key];
  var el = grid.querySelector('[data-key="' + key + '"]');
  if (el) el.classList.toggle('on', on);
}

function updateTotal() {
  document.getElementById('avsHours').textContent = Object.keys(selected).length;
}

grid.addEventListener('mousedown', function (e) {
  var cell = e.target.closest('.avs-cell');
  if (!cell) return;
  e.preventDefault();
  painting = true;
  paintValue = !selected[cell.dataset.key];   // toggle based on first cell
  setCell(cell.dataset.key, paintValue);
  updateTotal();
});
grid.addEventListener('mouseover', function (e) {
  if (!painting) return;
  var cell = e.target.closest('.avs-cell');
  if (cell) { setCell(cell.dataset.key, paintValue); updateTotal(); }
});
document.addEventListener('mouseup', function () { painting = false; });

document.getElementById('avsClear').addEventListener('click', function () {
  selected = {};
  grid.querySelectorAll('.avs-cell.on').forEach(function (c) { c.classList.remove('on'); });
  updateTotal();
});

build();
updateTotal();`,

  seo: {
    title: 'Availability Scheduler — Weekly Time Grid HTML CSS',
    description: `A weekly availability grid you paint by click-dragging to mark free time slots per day, with a live hours total. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Availability Scheduler — Drag-to-Paint Weekly Time-Slot Grid',
      description: `Asking someone "when are you free?" with a text box gets you vague, error-prone answers. A visual availability grid — days across one axis, hours across the other, paint the cells you're free — gets you precise, structured data in seconds. This snippet builds that weekly scheduler in plain HTML, CSS, and vanilla JavaScript, with the click-and-drag painting interaction that makes selecting a whole block of time effortless instead of a dozen individual clicks.

**Drag-to-paint, the interaction that makes it fast**

The core of a good availability picker is being able to drag across a range of cells rather than click each one. On \`mousedown\`, the grid records whether you're painting cells *on* or *off* based on the first cell you touch (\`paintValue = !selected[key]\`), so dragging from an empty cell fills, and dragging from a filled cell clears. As the cursor moves over more cells (\`mouseover\` while \`painting\` is true), each one gets set to that same value — so a single drag from Monday-9am to Monday-5pm marks the whole workday available in one gesture. A document-level \`mouseup\` ends the paint, so releasing anywhere stops it cleanly.

**A grid built from data**

The whole grid is generated from three values: a \`DAYS\` array, a \`START_HOUR\`, and a \`SLOTS\` count (9am–6pm, one cell per hour by default). \`build()\` lays it out as a CSS grid with a day-label column plus one hour-header row, and each cell carries a \`data-key\` of \`"day-slot"\`. Change the days, the start hour, or the number of slots and the entire grid — labels included — regenerates. Want 30-minute granularity? Double \`SLOTS\` and adjust the label function.

**Selection stored as a simple set**

Selected cells live in a plain \`selected\` object keyed by \`"day-slot"\`, which doubles as the data you'd submit: its keys *are* the chosen slots, and \`Object.keys(selected).length\` is the live hours total shown in the footer. There's no parallel array to keep in sync with the DOM — \`setCell()\` updates both the data and the cell's class together, so the count and the visuals never drift. Serializing this for a backend is trivial (covered in the FAQs).

**Honest, scannable feedback**

A legend explains the two states, and the running "hrs / week" total updates on every change so the user always knows how much availability they've committed to. The clear-all button resets both the data and the grid in one pass. Hover scales each cell slightly so the paint target is obvious, and selected cells use a solid indigo that reads clearly against the empty light-gray slots.

**Touch and accessibility notes**

The drag interaction is pointer-based, so it's most natural on desktop; on touch, tapping individual cells still works, and the FAQs cover adding full touch-drag with \`touchmove\` and \`elementFromPoint\`. For keyboard and screen-reader support you'd make each cell a real toggle button with \`aria-pressed\` — the data model doesn't change, only the input layer. The grid scrolls horizontally inside its wrapper so it stays usable on narrow screens without breaking the layout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A weekly grid renders with days as rows and hours (9a–6p) as columns, all cells empty.` },
      { title: 'Click a cell', text: `Click any cell to mark that day-and-hour available — it fills indigo and the weekly hours total updates.` },
      { title: 'Drag to paint a block', text: `Press and drag across cells to mark a whole range at once — dragging from an empty cell fills, from a filled cell clears.` },
      { title: 'Watch the total', text: `The "hrs / week" counter in the footer reflects exactly how many slots are selected at all times.` },
      { title: 'Clear and restart', text: `Click "Clear all" to reset the entire grid and the total in one action.` },
      { title: 'Customize the grid', text: `Edit DAYS, START_HOUR, and SLOTS to change the days, time range, or granularity — the grid and labels regenerate.` },
    ] },
    features: [
      { title: 'Click-and-drag paint selection', text: `Drag across cells to mark a whole time block in one gesture, with fill-or-clear decided by the first cell touched.` },
      { title: 'Data-driven grid', text: `Days, start hour, and slot count generate the entire grid and labels — change them for any schedule or granularity.` },
      { title: 'Live weekly hours total', text: `The footer counter equals Object.keys(selected).length, updating on every change with no separate tally to maintain.` },
      { title: 'Selection doubles as submit data', text: `The selected set's keys are the chosen day-slots, trivial to serialize and send to a backend.` },
      { title: 'Synced data and visuals', text: `setCell() updates the data object and the cell class together, so the count and grid never drift apart.` },
      { title: 'Clear-all reset', text: `One button empties the selection and the grid in a single pass.` },
      { title: 'Clear two-state legend', text: `A legend and solid indigo selected cells make available vs unavailable obvious at a glance.` },
      { title: 'Horizontal scroll on mobile', text: `The grid scrolls inside its wrapper so it stays usable on narrow screens without layout breakage.` },
    ],
    useCases: [
      { title: 'Booking and consultation availability', text: `Let providers set the hours they take appointments — pair with a [time slot picker](/ui-snippets/time-slot-picker/) for clients to book within them.` },
      { title: 'Meeting and interview scheduling', text: `Collect everyone's free blocks to find overlap, pairing with a [timezone converter](/ui-snippets/timezone-converter/) for distributed teams.` },
      { title: 'Shift and staff rostering', text: `Have employees paint their available shifts for the week as structured input to a scheduling system.` },
      { title: 'Tutor and coaching platforms', text: `Set recurring weekly availability that students book against.` },
      { title: 'Volunteer and event sign-ups', text: `Let participants indicate which time blocks they can cover across a week.` },
      { title: 'Learning drag-selection patterns', text: `A reference for paint-on-drag grids and set-based selection — compare with an [activity heatmap](/ui-snippets/activity-heatmap/) for a read-only grid.` },
      { icon: 'CODE', title: 'Related: Notion-Style Block Editor', desc: 'See the [Notion-Style Block Editor](/ui-snippets/block-editor/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I save the selected availability to a backend?', a: `The selected object's keys are already your data — each "day-slot" key (e.g. "0-3" = Monday, 4th slot) represents one available block. Serialize Object.keys(selected) directly, or map them to start/end times using START_HOUR and the slot index, and POST that array. On load, populate selected from saved data and call setCell() for each to restore the grid.` },
      { q: 'How do I add 30-minute or 15-minute slots?', a: `Increase SLOTS (double it for 30-minute granularity, quadruple for 15) and update the hourLabel function to compute the time from the slot index accordingly. The grid, painting, and total all derive from SLOTS, so no other code changes — just the label math and the column count.` },
      { q: 'How do I make it work with touch dragging on mobile?', a: `The mouse-based paint works for taps but not touch-drag. Add touchstart/touchmove listeners that read e.touches[0].clientX/Y, call document.elementFromPoint() to find the cell under the finger, and apply setCell() with the paint value — mirroring the mouseover logic. Add touch-action: none to the grid so the page doesn't scroll mid-paint.` },
      { q: 'How do I make the grid keyboard accessible?', a: `Render each cell as a <button> with aria-pressed reflecting its on/off state and a descriptive aria-label ("Monday 9am"), so it's focusable and toggleable with Enter/Space and announced correctly. The selected data model stays identical; only the cell element and its event wiring change.` },
      { q: 'How do I use this availability scheduler in React, Vue, or Angular?', a: `In React, hold the selected set in useState (a Set or object) and toggle on cell events, deriving the total from its size; in Vue, use reactive() with a computed total; in Angular, use a component Set field with a getter. The paint-on-drag logic uses a "painting" flag and a captured paintValue that port directly to each framework's pointer events.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the mousedown/mouseover/mouseup chain by eye, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why paintValue is captured once on mousedown from the first cell touched rather than recomputed on every cell during the drag, or why the mouseup listener is bound to document instead of the grid element itself. The same assistant can help optimize it — ask whether querying grid.querySelector on every single setCell call is wasteful compared to caching cell references in an array once at build time, especially for a much larger grid. It's also a good extension partner: ask it to add real touch-drag support using touchmove and elementFromPoint, make each cell a proper button with aria-pressed for keyboard accessibility, or add a "copy Monday's pattern to every weekday" shortcut. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "click-and-drag weekly availability grid" in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- Generate the entire grid from three data values: an array of day names, a starting hour, and a number of hourly slots — both the CSS grid cells and their hour/day labels must regenerate correctly if those values change, with no hardcoded HTML for individual cells.
- Each cell must carry a data attribute encoding its day and slot index, and store selection state in a single plain JavaScript object keyed by that same "day-slot" string, not in a separate array that has to be kept in sync with the DOM.
- Implement drag-to-paint: on mousedown over a cell, determine whether this drag will be turning cells on or off based on whether that first cell was already selected, then apply that same on/off value to every subsequent cell the mouse passes over (via a mouseover listener) while the mouse button is held down.
- The "mouse button released" listener must be attached to the document, not the grid, so releasing the mouse anywhere on the page (even outside the grid) correctly ends the drag.
- A live counter derived directly from the size of the selection object (not a separately maintained counter variable) must update after every cell change to show total selected hours.
- A "clear all" button must reset both the selection data and every cell's visual state in one action, and the grid must scroll horizontally inside a wrapper on narrow viewports rather than squeezing cells unreadably small.`,
    },
  },
};

export default availabilityScheduler;
