const weekViewScheduler = {
  id: 'week-view-scheduler',
  title: 'Week View Scheduler',
  lastmod: '2026-07-23',
  category: 'dashboards',
  html: `<div class="sched">
  <div class="sched-head">
    <h2>This week</h2>
    <p class="sched-hint">Drag events to reschedule · snaps to 30 min</p>
  </div>

  <div class="cal" id="cal">
    <!-- Day headers -->
    <div class="corner"></div>
    <div class="day-head">Mon <span>14</span></div>
    <div class="day-head">Tue <span>15</span></div>
    <div class="day-head today">Wed <span>16</span></div>
    <div class="day-head">Thu <span>17</span></div>
    <div class="day-head">Fri <span>18</span></div>

    <!-- Time gutter -->
    <div class="gutter" id="gutter"></div>

    <!-- 5 day columns; events are injected by JS -->
    <div class="day-col" data-day="0"></div>
    <div class="day-col" data-day="1"></div>
    <div class="day-col today-col" data-day="2"><div class="now-line" id="now-line"><span></span></div></div>
    <div class="day-col" data-day="3"></div>
    <div class="day-col" data-day="4"></div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; padding: 24px 16px; }

.sched { max-width: 680px; margin: 0 auto; }
.sched-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 8px; }
.sched-head h2 { color: #f1f5f9; font-size: 18px; }
.sched-hint { font-size: 11.5px; color: #64748b; }

/* ————— Calendar frame —————
   One grid: 48px gutter + 5 equal day columns.
   Row 1 = day headers; row 2 = the scrollable-height time area. */
.cal {
  display: grid;
  grid-template-columns: 48px repeat(5, 1fr);
  background: #111a2e; border: 1px solid #283548;
  border-radius: 14px; overflow: hidden;
  --hour-h: 44px;      /* one hour of vertical space */
  --start-hour: 8;     /* day begins at 08:00 */
}

.corner { border-bottom: 1px solid #283548; }
.day-head {
  padding: 10px 8px; text-align: center;
  font-size: 11.5px; font-weight: 700; color: #94a3b8;
  border-bottom: 1px solid #283548; border-left: 1px solid #1c2940;
}
.day-head span { display: block; font-size: 15px; color: #e2e8f0; margin-top: 2px; }
.day-head.today span {
  background: #6366f1; color: #fff;
  width: 26px; height: 26px; line-height: 26px;
  border-radius: 50%; margin: 2px auto 0;
}

/* time gutter */
.gutter { position: relative; height: calc(var(--hour-h) * 10); }
.gutter .tick {
  position: absolute; right: 8px; transform: translateY(-50%);
  font-size: 10px; color: #4a5a76; font-variant-numeric: tabular-nums;
}

/* day columns */
.day-col {
  position: relative;
  height: calc(var(--hour-h) * 10);
  border-left: 1px solid #1c2940;
  /* hour lines drawn with a repeating gradient — zero extra elements */
  background: repeating-linear-gradient(
    to bottom,
    transparent 0 calc(var(--hour-h) - 1px),
    #1c2940 calc(var(--hour-h) - 1px) var(--hour-h)
  );
}
.day-col.today-col { background-color: rgba(99,102,241,0.045); }

/* ————— Events ————— */
.event {
  position: absolute; left: 4px; right: 4px;
  border-radius: 8px; padding: 5px 8px;
  font-size: 10.5px; line-height: 1.35;
  cursor: grab; user-select: none;
  border-left: 3px solid;
  overflow: hidden;
  transition: box-shadow 0.15s, filter 0.15s;
  touch-action: none;
}
.event:active { cursor: grabbing; }
.event.dragging {
  box-shadow: 0 10px 28px rgba(0,0,0,0.5);
  filter: brightness(1.15);
  z-index: 10;
}
.event b { display: block; font-size: 11px; margin-bottom: 1px; }
.event .ev-time { opacity: 0.75; }

.ev-indigo { background: rgba(99,102,241,0.22);  border-color: #818cf8; color: #c7d2fe; }
.ev-emerald{ background: rgba(52,211,153,0.18);  border-color: #34d399; color: #a7f3d0; }
.ev-amber  { background: rgba(245,158,11,0.18);  border-color: #f59e0b; color: #fde68a; }
.ev-pink   { background: rgba(244,114,182,0.18); border-color: #f472b6; color: #fbcfe8; }

/* ————— Now line ————— */
.now-line {
  position: absolute; left: 0; right: 0; z-index: 5;
  height: 2px; background: #f43f5e; pointer-events: none;
}
.now-line span {
  position: absolute; left: -4px; top: 50%; transform: translateY(-50%);
  width: 8px; height: 8px; border-radius: 50%; background: #f43f5e;
}

@media (max-width: 560px) {
  .cal { grid-template-columns: 40px repeat(5, 1fr); font-size: 90%; }
  .event { padding: 3px 5px; }
}`,

  js: `const cal = document.getElementById('cal');
const HOUR_H = 44;        // must match --hour-h
const START = 8;          // must match --start-hour
const END = 18;
const SNAP = 0.5;         // 30-minute snapping

/* Events: day 0–4, start/dur in fractional hours. */
let EVENTS = [
  { id: 1, title: 'Design sync',   day: 0, start: 9,    dur: 1,   color: 'indigo' },
  { id: 2, title: 'Sprint plan',   day: 1, start: 10,   dur: 1.5, color: 'emerald' },
  { id: 3, title: '1:1 with Sam',  day: 2, start: 9.5,  dur: 0.5, color: 'pink' },
  { id: 4, title: 'Deep work',     day: 2, start: 13,   dur: 2.5, color: 'indigo' },
  { id: 5, title: 'Ship review',   day: 3, start: 11,   dur: 1,   color: 'amber' },
  { id: 6, title: 'Retro',         day: 4, start: 15,   dur: 1,   color: 'emerald' },
];

const cols = [...cal.querySelectorAll('.day-col')];

/* — Time gutter labels — */
const gutter = document.getElementById('gutter');
for (let h = START + 1; h <= END - 1; h++) {
  const t = document.createElement('span');
  t.className = 'tick';
  t.style.top = (h - START) * HOUR_H + 'px';
  t.textContent = (h % 12 || 12) + (h < 12 ? 'am' : 'pm');
  gutter.appendChild(t);
}

function fmt(hFrac) {
  const h = Math.floor(hFrac), m = Math.round((hFrac - h) * 60);
  return (h % 12 || 12) + ':' + String(m).padStart(2, '0') + (h < 12 ? 'am' : 'pm');
}

/* — Render all events (position = pure function of data) — */
function render() {
  cal.querySelectorAll('.event').forEach(el => el.remove());
  EVENTS.forEach(ev => {
    const el = document.createElement('div');
    el.className = 'event ev-' + ev.color;
    el.dataset.id = ev.id;
    el.style.top = (ev.start - START) * HOUR_H + 'px';
    el.style.height = ev.dur * HOUR_H - 3 + 'px';
    el.innerHTML = '<b>' + ev.title + '</b><span class="ev-time">' +
      fmt(ev.start) + ' – ' + fmt(ev.start + ev.dur) + '</span>';
    cols[ev.day].appendChild(el);
  });
}
render();

/* — Drag to reschedule: pointer events + grid math — */
let drag = null;

cal.addEventListener('pointerdown', e => {
  const el = e.target.closest('.event');
  if (!el) return;
  const ev = EVENTS.find(x => x.id === +el.dataset.id);
  drag = { el, ev, offsetY: e.clientY - el.getBoundingClientRect().top };
  el.classList.add('dragging');
  el.setPointerCapture(e.pointerId);
});

cal.addEventListener('pointermove', e => {
  if (!drag) return;
  const { el, ev, offsetY } = drag;

  // Which day column is the pointer over?
  const colIdx = cols.findIndex(c => {
    const r = c.getBoundingClientRect();
    return e.clientX >= r.left && e.clientX < r.right;
  });
  if (colIdx >= 0 && colIdx !== ev.day) {
    ev.day = colIdx;
    cols[colIdx].appendChild(el);   // move live between columns
  }

  // Vertical: pointer → fractional hour, snapped, clamped to the day.
  const colTop = cols[ev.day].getBoundingClientRect().top;
  let h = START + (e.clientY - colTop - offsetY) / HOUR_H;
  h = Math.round(h / SNAP) * SNAP;
  h = Math.max(START, Math.min(h, END - ev.dur));
  if (h !== ev.start) {
    ev.start = h;
    el.style.top = (h - START) * HOUR_H + 'px';
    el.querySelector('.ev-time').textContent = fmt(h) + ' – ' + fmt(h + ev.dur);
  }
});

cal.addEventListener('pointerup', () => {
  if (!drag) return;
  drag.el.classList.remove('dragging');
  // Persist point: EVENTS already holds the new day/start.
  drag = null;
});

/* — Current-time line (demo pins it at 11:20 if outside hours) — */
function positionNow() {
  const now = new Date();
  let h = now.getHours() + now.getMinutes() / 60;
  if (h < START || h > END) h = 11.33;
  document.getElementById('now-line').style.top = (h - START) * HOUR_H + 'px';
}
positionNow();
setInterval(positionNow, 60000);`,

  seo: {
    title: 'Week View Scheduler Calendar — HTML CSS JS Snippet',
    description: 'Calendar week grid with positioned events, drag-to-reschedule across days, 30-min snapping and a live now-line. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Week View Scheduler — Time-Grid Math, Absolutely Positioned Events, Cross-Day Pointer Dragging & 30-Minute Snapping',
      description: `"React week calendar" and "scheduler UI" are perennial high-volume searches because the component looks intimidating — yet the entire mechanism is one coordinate transform applied in both directions. This snippet builds a Google-Calendar-style week view in vanilla HTML, CSS, and JavaScript: a time-gutter grid over five day columns, events absolutely positioned from plain \`{ day, start, dur }\` data, drag-to-reschedule that moves events across days and snaps to 30 minutes, live time labels during the drag, and a red now-line. Reading it demystifies every calendar library you will ever use.

**The frame: one grid, hour lines for free**

The calendar is a single CSS Grid — \`48px repeat(5, 1fr)\` — whose first row holds day headers and second row holds the time area: a gutter plus five \`position: relative\` day columns, each \`calc(var(--hour-h) * 10)\` tall for a 10-hour day. Two custom properties (\`--hour-h: 44px\`, \`--start-hour: 8\`) define the whole coordinate system, mirrored by \`HOUR_H\`/\`START\` constants in JS. The horizontal hour lines cost zero elements: a \`repeating-linear-gradient\` on each column paints a 1px line every \`--hour-h\` pixels — the same trick as lined-paper CSS, and it stays in sync with the row height by construction. Gutter labels are positioned spans at \`(hour − START) × HOUR_H\`, translated −50% to centre on their line.

**Events as data, position as a pure function**

Events live in an array of \`{ id, title, day, start, dur, color }\` with times as *fractional hours* (9.5 = 9:30) — the representation that makes all math trivial. \`render()\` maps each event to an absolutely positioned block inside its day column: \`top = (start − START) × HOUR_H\`, \`height = dur × HOUR_H\`. That linear transform *is* the entire layout engine of every calendar you've used. Blocks are colour-coded with the tinted-translucent-plus-accent-left-border recipe, show title and a live time range, and clip overflow for short events. Because position is a pure function of data, re-rendering after any data change is always correct — there is no positional state to desync.

**Dragging: the inverse transform, plus column hit-testing**

Rescheduling inverts the same math. On \`pointerdown\` over an event, the handler records the grab offset within the block (so the block doesn't jump to align its top with the cursor) and captures the pointer — the capture is what lets a drag continue smoothly even when the pointer crosses column borders or leaves the calendar momentarily. On \`pointermove\`, two independent resolutions happen: horizontally, the pointer is hit-tested against each column's \`getBoundingClientRect()\` to find the day, and crossing into a new column immediately re-parents the block (a live preview of the day change); vertically, pointer-y converts back to fractional hours — \`START + (clientY − colTop − offsetY) / HOUR_H\` — then snaps via \`Math.round(h / SNAP) × SNAP\` and clamps so events can't escape the day (\`END − dur\` as the ceiling). The event's *data* is updated during the drag and the block restyled from it, so the time label in the block updates live — and \`pointerup\` has nothing left to compute: the array already holds the new schedule, which is exactly where a \`PATCH /events/:id\` call belongs.

**The now-line and honest scope**

A red 2px line with a dot marks the current time in today's column, positioned by the same transform from \`new Date()\` and refreshed every minute (the demo pins it mid-morning outside working hours so it's always visible). Deliberately out of scope — and flagged as the extension points they are: overlapping-event side-by-side packing (a column-assignment pass over sorted events), drag-to-create (pointer-down on empty column space), and resize handles (same vertical math applied to \`dur\`). The 30-minute \`SNAP\` constant, day range, and hour span are all single-value edits.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Drag events around the week',
          text: 'Grab any event block: it lifts with a shadow, and as you drag vertically it snaps to 30-minute increments with the time label in the block updating live. Drag horizontally across day columns and the event hops between days the moment the pointer crosses a border. Events clamp to the 8am–6pm day — try pushing Deep Work past 6pm and it stops at the last slot that fits its duration.',
        },
        {
          title: 'Feed it your events',
          text: 'The EVENTS array is the entire input: { id, title, day (0–4), start, dur, color } with times as fractional hours — convert real dates with d.getHours() + d.getMinutes()/60 and day from getDay(). After any change, call render(). The persist point is marked in pointerup: the array already holds the new day/start, so send PATCH /events/:id with those two fields there.',
        },
        {
          title: 'Change the visible hours and snap',
          text: 'Three constants govern the grid: START/END (with --start-hour and the ×10 column height in CSS — keep them in sync, or derive the CSS custom properties from JS on load), HOUR_H matching --hour-h, and SNAP (0.5 = 30min; 0.25 for 15-minute precision). For a 7-day week, add two day-col divs and headers and widen repeat(5,…) to repeat(7,…) — the JS discovers columns, so nothing else changes.',
        },
        {
          title: 'Add drag-to-create',
          text: 'On pointerdown over empty column space (e.target.closest(".day-col") but not .event), create a new event at the snapped pointer hour with dur: SNAP, then let pointermove grow its dur using the same inverse transform applied to height instead of top. Open your event-details form on pointerup. This reuses every function already in the file.',
        },
        {
          title: 'Handle overlapping events',
          text: 'When two events share time, pack them side by side: for each day, sort events by start, greedily assign each to the first "lane" whose last event ended before this one starts, then set left/width per lane (left: laneIndex/laneCount*100%, width: 100%/laneCount). Run it inside render() per column — it is ~15 lines and turns the demo into a production-complete day layout. Google Calendar\'s algorithm is exactly this.',
        },
        {
          title: 'Export and compose',
          text: 'Click JSX for React — events in state, blocks rendered from the array with style props from the transform, drag handlers updating state (see FAQ). Compose with the [Calendar Widget](/ui-snippets/calendar-widget) for month-view navigation, [Time Slot Picker](/ui-snippets/time-slot-picker) and [Availability Scheduler](/ui-snippets/availability-scheduler) for booking flows, and the [Schedule Table](/ui-snippets/schedule-table) for a read-only variant.',
        },
      ],
    },
    features: [
      'Complete week-view coordinate system from two constants: top = (start − START) × HOUR_H both ways',
      'Events as plain { day, start, dur } data with fractional hours — position is a pure render function',
      'Hour lines painted by repeating-linear-gradient — zero elements, always in sync with --hour-h',
      'Pointer-captured dragging that survives crossing columns; day changes re-parent the block live',
      'Configurable 30-minute snapping and clamping so events cannot escape the visible day',
      'Live time label inside the block updates during the drag from the same data',
      'Red now-line with dot, positioned by the same transform and refreshed every minute',
      'Today column highlight, tinted event colourways with accent borders, mobile-compacting media query',
    ],
    useCases: [
      {
        icon: 'FLOW',
        title: 'Scheduling features inside SaaS products',
        desc: 'Booking systems, shift planners, resource allocators, and CRM activity views all need "show blocks on a week and let users move them" — and reaching for FullCalendar (150KB+) for that single view is the common overweight choice. This snippet is the whole mechanism: swap the columns\' meaning (staff members instead of days makes it a rota planner; rooms makes it resource booking), keep the transform, and wire pointerup to your PATCH. The clamp and snap constants become your business rules.',
      },
      {
        icon: 'APP',
        title: 'Calendar clones and personal planners',
        desc: 'The Google-Calendar interaction set users expect — drag to move with live time feedback, snap to slots, today highlighted, a now-line — is exactly what\'s implemented here, so a personal planner or team calendar starts from feature parity on the week view. Add the overlap-packing pass from the how-to and drag-to-create, and the remaining work is data plumbing (recurring events, timezones) rather than UI. Pair with the [Calendar Widget](/ui-snippets/calendar-widget) mini-month for navigation.',
      },
      {
        icon: 'LEARN',
        title: 'Learning the coordinate-transform pattern behind all schedulers',
        desc: 'Every calendar library reduces to the linear transform this snippet states in one line each direction: data-hours to pixels for rendering, pixels back to data-hours (then snap, then clamp) for interaction. Seeing it bare — with pointer capture for cross-column drags and the grab-offset correction — is the fastest route to debugging or extending any scheduler you inherit. The same forward/inverse-transform pattern powers the [Video Trimmer]-style timeline scrubbers and Gantt charts ([Gantt Table](/ui-snippets/gantt-table)).',
      },
      {
        icon: 'CHART',
        title: 'Ops and logistics boards: shifts, deliveries, machine time',
        desc: 'Operations planning is scheduling with different nouns: columns as drivers, bays, or machines; blocks as deliveries, jobs, or maintenance windows. The cross-column drag is the core dispatch action ("move this job to machine 3"), snapping encodes slot granularity, and the clamp encodes operating hours. The colour-coding recipe maps to job status, and the now-line gives shift leads the at-a-glance "what should be running" reference that static tables lack.',
      },
      {
        icon: 'FORM',
        title: 'Interview panels, classroom timetables, and studio bookings',
        desc: 'Multi-slot coordination — interviewers × candidates, rooms × classes, studios × sessions — lives naturally in this grid. Because events are plain data with a colour key, double-booking detection is an array scan you can run on every drag (flag red when two events in one column overlap), and the pointermove handler is the place to reject illegal drops by simply not committing the data change. The 30-minute snap matches how humans actually book time.',
      },
      {
        icon: 'CODE',
        title: 'A pre-library prototype that survives to production',
        desc: 'Teams often prototype scheduling with a library, then fight it on customisation. Inverting that — shipping this 100-line view first — establishes the interactions and data shape (id/day/start/dur is also FullCalendar\'s essential shape) before committing. The honest upgrade triggers, marked in the how-to: recurring events, multi-week virtualised scrolling, and timezone-aware all-day rows are where a library earns its size; a single week of draggable blocks is not.',
      },
    ],
    faqs: [
      {
        q: 'How does the pixel↔time math actually work, and why fractional hours?',
        a: 'One linear transform, applied forward for rendering and inverted for interaction. Forward: an event starting at hour h paints at top = (h − START) × HOUR_H, with height = dur × HOUR_H — with START = 8 and HOUR_H = 44, the 9:30 one-on-one sits at (9.5 − 8) × 44 = 66px. Inverse: a pointer at clientY converts to h = START + (clientY − columnTop − grabOffset) / HOUR_H, after which Math.round(h / 0.5) × 0.5 snaps to half-hours and a clamp to [START, END − dur] keeps the block inside the day. Fractional hours are what keep both directions one-liners: 9:30 as 9.5 means no minutes-handling anywhere except the fmt() display function, durations add without carrying, and snapping is a single rounding expression. The grabOffset subtraction is the detail that makes dragging feel right — it preserves where within the block you grabbed, so the block moves with your hand instead of jumping its top edge to the cursor.',
      },
      {
        q: 'Why pointer events with setPointerCapture instead of HTML5 drag & drop here?',
        a: 'Because scheduling needs continuous positional feedback, which is the opposite of what native DnD provides. HTML5 drag & drop is built around discrete drop targets: you get a browser-rendered ghost image you cannot restyle mid-drag, no reliable per-pixel coordinates on some platforms, and no way to live-update the block\'s time label or snap position during the gesture. Pointer events give raw coordinates every frame, so the block itself moves, snaps, relabels, and re-parents across columns in real time — and setPointerCapture routes all subsequent moves to the captured element even when the pointer is over a different column, another event, or briefly outside the calendar, which is precisely the cross-column case this UI lives on. touch-action: none on the blocks completes the setup by stopping mobile browsers from hijacking the gesture for scrolling. The rule of thumb across this library: native DnD for discrete-slot reordering (the [Dashboard Widget Grid] case), pointer events for continuous spatial manipulation like this.',
      },
      {
        q: 'How do I handle two events that overlap in time?',
        a: 'With the lane-packing algorithm every major calendar uses, run per column at render time. Sort the column\'s events by start; walk them maintaining a list of lanes, each remembering when its last event ends; place each event into the first lane whose last end ≤ this start (they don\'t collide), or open a new lane if none fits. The number of lanes any event\'s time range intersects determines its width: with laneCount concurrent lanes, set left: (laneIndex / laneCount) × 100% and width: calc(100%/laneCount − 8px), keeping the 4px side insets. This greedy interval-partitioning is ~15 lines, provably uses the minimum lanes, and handles the classic Google-Calendar visual (two meetings side by side, a third overlapping both squeezing to thirds). Run it inside render() so dragging into a collision re-packs live — and if your domain forbids overlaps entirely (rooms, machines), skip packing and instead reject the drop in pointermove by not committing the data change when a scan finds a collision.',
      },
      {
        q: 'What changes in React or Angular, and does Tailwind cover the styling?',
        a: 'React: events become state, blocks render from the array with style={{ top: (ev.start-START)*HOUR_H, height: ev.dur*HOUR_H }} and key={ev.id}, and the drag handlers update state instead of the DOM — but throttle the pointermove commits: update a ref during the gesture and flush to state only when the snapped value actually changes (this snippet\'s if (h !== ev.start) guard is that throttle, and it matters more in React where each commit re-renders). Re-parenting across columns falls out of render automatically since each column filters events by day — no appendChild needed, which is the main structural simplification. Angular mirrors it with a signal array, @for per column filtered by day, and handlers via host listeners; run pointermove outside the zone if profiling shows change-detection pressure. Tailwind: the frame is grid grid-cols-[48px_repeat(5,1fr)] bg-slate-900 border border-slate-700 rounded-xl overflow-hidden; day columns relative border-l border-slate-800 with the hour-line repeating gradient as an arbitrary value or a config utility; events are absolute inset-x-1 rounded-lg border-l-[3px] p-1.5 text-[10.5px] cursor-grab touch-none with per-colour classes like bg-indigo-500/20 border-indigo-400 text-indigo-200 and a data-[dragging]:shadow-2xl data-[dragging]:brightness-115 data-[dragging]:z-10 lift.',
      },
    ],
    aiPrompt: {
      paragraph: `This snippet is deliberately a chassis, and an AI assistant is the right tool for bolting on the parts your product needs — but start by proving the chassis to yourself: paste it into Claude and ask it to walk one drag gesture end-to-end (pointerdown offset capture, the column hit-test, the inverse transform, snap, clamp, data commit), then ask what breaks without setPointerCapture and without the grabOffset — both answers are felt immediately if you try them. Then request the three canonical extensions in order of value: the lane-packing pass for overlapping events (ask for the greedy interval-partitioning inside render() so collisions re-pack live during drags), drag-to-create on empty column space reusing the existing transform, and bottom-edge resize handles that apply the same vertical math to dur. For real data, hand it your event API's shape and ask for the mapping to fractional day/start/dur including timezone normalisation — the one scheduling problem the UI layer genuinely cannot absorb — and the debounced PATCH at the marked persist point. If you're on React, ask for the state-driven port with the snapped-value throttle preserved; that guard is the difference between smooth and janky.`,
      prompt: `Build a Google-Calendar-style week view scheduler in plain HTML, CSS, and JavaScript — a time grid with draggable, snapping event blocks. No libraries.

Requirements:
- One CSS Grid frame (48px time gutter + five equal day columns) with a day-header row where today's date sits in an accent circle; define the coordinate system with two custom properties (--hour-h: 44px, --start-hour: 8) mirrored by JS constants, columns 10 hours tall for an 8am–6pm day.
- Paint hour lines with a repeating-linear-gradient on the columns (zero extra elements, inherently synced to --hour-h), and generate gutter time labels (9am…5pm) positioned at (hour − START) × HOUR_H with a −50% translate.
- Events are plain data — { id, title, day 0–4, start, dur, color } with times as FRACTIONAL hours (9.5 = 9:30) — rendered by a pure function into absolutely positioned blocks: top = (start − START) × HOUR_H, height = dur × HOUR_H, styled as tinted translucent cards with accent left borders, a bold title, and a live time-range line; include six varied demo events, one 30 minutes, one 2.5 hours.
- Implement drag-to-reschedule with pointer events and setPointerCapture (comment why native drag & drop is wrong for continuous positional feedback): record the grab offset within the block so it never jumps to the cursor; hit-test the pointer against column rects each move and re-parent the block the moment it crosses into a new day; convert pointer-y back to hours with the inverse transform, snap via Math.round(h / 0.5) × 0.5, clamp to [START, END − dur], and update the block's position AND its time label live from the mutated data — pointerup then only cleans up, with a comment marking it as the PATCH persist point since the data already holds the new schedule.
- Add touch-action: none on blocks, a dragging lift state (shadow, brightness, z-index), a red now-line with a dot in today's column positioned by the same transform and refreshed each minute (pin it mid-morning when outside working hours so the demo always shows it), and a subtle tint on today's column.
- Comment the two marked extension points: greedy lane-packing for overlapping events and drag-to-create on empty column space.`,
    },
  },
};

export default weekViewScheduler;
