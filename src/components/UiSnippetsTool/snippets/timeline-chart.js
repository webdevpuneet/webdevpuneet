const timelineChart = {
  id: 'timeline-chart',
  title: 'Timeline Chart',
  lastmod: '2026-07-18',
  category: 'charts',
  html: `<div class="tc-card">
  <h3>Project schedule</h3>
  <div class="tc-scale" id="tcScale"></div>
  <div class="tc-rows" id="tcRows"></div>
  <div class="tc-tip" id="tcTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;padding:30px 18px}

.tc-card{position:relative;background:#1e293b;border:1px solid #334155;border-radius:16px;padding:18px;width:100%;max-width:520px}
.tc-card h3{font-size:15px;font-weight:800;color:#f1f5f9;margin-bottom:14px}

.tc-scale{position:relative;height:18px;margin-left:96px;border-bottom:1px solid #334155}
.tc-mark{position:absolute;top:0;font-size:10px;color:#64748b;transform:translateX(-50%)}
.tc-mark::after{content:'';position:absolute;left:50%;top:14px;width:1px;height:6px;background:#334155}

.tc-rows{display:flex;flex-direction:column;gap:9px;margin-top:10px}
.tc-row{display:grid;grid-template-columns:96px 1fr;align-items:center;gap:0}
.tc-label{font-size:12px;font-weight:600;color:#cbd5e1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:8px}
.tc-track{position:relative;height:22px}
.tc-grid{position:absolute;top:0;bottom:0;width:1px;background:rgba(51,65,85,.5)}
.tc-bar{position:absolute;top:3px;height:16px;border-radius:5px;cursor:pointer;transform:scaleX(0);transform-origin:left;transition:transform .55s cubic-bezier(.22,1,.36,1),filter .12s;display:flex;align-items:center;padding:0 7px;overflow:hidden}
.tc-bar:hover{filter:brightness(1.18)}
.tc-bar span{font-size:10px;font-weight:700;color:#fff;white-space:nowrap;opacity:.95}
.tc-today{position:absolute;top:-2px;bottom:0;width:2px;background:#ef4444;z-index:2}
.tc-today::after{content:'Today';position:absolute;top:-2px;left:4px;font-size:9px;font-weight:700;color:#ef4444}

.tc-tip{position:absolute;transform:translate(-50%,-100%);background:#0b1120;border:1px solid #334155;border-radius:8px;padding:6px 10px;font-size:11.5px;color:#f1f5f9;pointer-events:none;white-space:nowrap;z-index:5}`,

  js: `// Days are integer offsets from day 0. Range shown: 0..28.
var TASKS = [
  { name:'Research', start:0, end:5, color:'#6366f1' },
  { name:'Design', start:4, end:12, color:'#22d3ee' },
  { name:'Build', start:10, end:22, color:'#f59e0b' },
  { name:'QA', start:19, end:26, color:'#34d399' },
  { name:'Launch', start:25, end:28, color:'#f472b6' }
];
var MIN = 0, MAX = 28, TODAY = 16;
var rows = document.getElementById('tcRows');
var scale = document.getElementById('tcScale');
var tip = document.getElementById('tcTip');
var card = document.querySelector('.tc-card');

function pct(day) { return (day - MIN) / (MAX - MIN) * 100; }

// scale marks every 7 days
for (var d = MIN; d <= MAX; d += 7) {
  var m = document.createElement('div'); m.className = 'tc-mark'; m.style.left = pct(d) + '%'; m.textContent = 'Day ' + d; scale.appendChild(m);
}

TASKS.forEach(function (t) {
  var row = document.createElement('div'); row.className = 'tc-row';
  row.innerHTML = '<div class="tc-label" title="' + t.name + '">' + t.name + '</div><div class="tc-track"></div>';
  var track = row.querySelector('.tc-track');
  // gridlines
  for (var g = MIN; g <= MAX; g += 7) { var gl = document.createElement('div'); gl.className = 'tc-grid'; gl.style.left = pct(g) + '%'; track.appendChild(gl); }
  // today marker
  var today = document.createElement('div'); today.className = 'tc-today'; today.style.left = pct(TODAY) + '%'; track.appendChild(today);
  // bar
  var bar = document.createElement('div'); bar.className = 'tc-bar';
  bar.style.left = pct(t.start) + '%';
  bar.style.width = (pct(t.end) - pct(t.start)) + '%';
  bar.style.background = t.color;
  bar.innerHTML = '<span>' + (t.end - t.start) + 'd</span>';
  bar.addEventListener('mouseenter', function (e) { showTip(e, t.name + ' · Day ' + t.start + '–' + t.end); });
  bar.addEventListener('mousemove', moveTip);
  bar.addEventListener('mouseleave', function () { tip.hidden = true; });
  track.appendChild(bar);
  rows.appendChild(row);
  requestAnimationFrame(function () { requestAnimationFrame(function () { bar.style.transform = 'scaleX(1)'; }); });
});

function showTip(e, text) { tip.textContent = text; tip.hidden = false; moveTip(e); }
function moveTip(e) { var r = card.getBoundingClientRect(); tip.style.left = (e.clientX - r.left) + 'px'; tip.style.top = (e.clientY - r.top - 10) + 'px'; }`,

  seo: {
    title: 'Timeline Chart — Horizontal Schedule / Gantt Bars',
    description: `A timeline chart placing tasks on a horizontal time axis with duration bars, gridlines, a today marker and tooltips. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Timeline Chart — Task Bars on a Horizontal Time Axis',
      description: `A timeline chart places events or tasks along a shared horizontal time axis, each as a bar spanning its start to end — the visual behind project schedules, roadmaps, and Gantt views. This snippet builds a clean, lightweight timeline with a time scale, per-row duration bars, gridlines, a "today" marker, and tooltips, in plain HTML, CSS, and vanilla JavaScript with no SVG or library.

**One scale, many rows**

Every task is a grid row: a fixed label column and a track. Within the track, the bar's \`left\` and \`width\` are percentages derived from the task's start and end mapped onto the chart's time range — \`(day - min) / (max - min)\`. Because every row shares that same \`pct()\` mapping, all bars line up under one time axis, so you can read overlaps and dependencies vertically at a glance. The scale across the top marks the range at regular intervals.

**A today line across the chart**

A red vertical marker at the current point cuts across every row, instantly showing what's in progress, done, or upcoming relative to now — the single most useful annotation on a schedule. It's positioned with the same percentage mapping as the bars, so it always stays aligned as the range changes.

**Duration at a glance**

Each bar shows its length in days and is coloured per task, and faint gridlines behind the bars give reference points for reading start and end without a precise axis. A brightness lift and a tooltip on hover reveal the exact start–end range, so the chart stays uncluttered while detail is one hover away.

**Animated reveal**

Bars grow from their start edge (a \`scaleX\` transition from 0, anchored left) on load, which animates the schedule into place and reinforces the left-to-right reading of time. The transform-origin at the left means each bar appears to "draw" from its start date.

**Data-driven and portable**

Tasks are \`{ name, start, end, color }\` over an integer day range, so swapping in real dates (convert to day offsets) or adding rows is a data edit; the scale, gridlines, today marker, and bars all derive from the range. With no dependencies, it's a compact reference for the timeline/Gantt pattern when a full project-management library is overkill.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A project timeline renders with task bars and a today marker.` },
      { title: 'Use your data', text: `Edit TASKS ({ name, start, end, color }) and the MIN/MAX range.` },
      { title: 'Set today', text: `Change TODAY to position the red current-time line.` },
      { title: 'Hover a bar', text: `A tooltip shows the task and its start–end range.` },
      { title: 'Read overlaps', text: `Bars share one axis, so concurrency reads vertically.` },
      { title: 'Use real dates', text: `Convert dates to day offsets from your range start.` },
    ] },
    features: [
      { title: 'Shared time axis', text: `All bars map onto one range so rows align.` },
      { title: 'Duration bars', text: `Left and width come from start/end percentages.` },
      { title: 'Today marker', text: `A red line across all rows shows the current point.` },
      { title: 'Gridlines + scale', text: `Reference marks for reading start and end.` },
      { title: 'Per-bar labels', text: `Each bar shows its length in days.` },
      { title: 'Animated reveal', text: `Bars draw from their start edge on load.` },
      { title: 'Hover tooltips', text: `Exact range on demand keeps it uncluttered.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no Gantt dependency.` },
    ],
    useCases: [
      { title: 'Lightweight project schedules', text: 'Plan phases as bars on one shared time axis, a quick alternative to a full [gantt table](/ui-snippets/gantt-table/) when you only need to see overlaps and the red today line.' },
      { title: 'Product roadmaps', text: 'Lay out initiatives over a half-year beside a [product roadmap](/ui-snippets/product-roadmap/) view, with each bar\'s position and width derived from start and end percentages.' },
      { title: 'Marketing campaign planning', text: 'Show overlapping campaigns across channels so planners can spot crowded weeks. Gridlines and a scale make start and end dates easy to read without hovering.' },
      { title: 'Release milestones', text: 'Track the run-up to a launch with duration bars for build, testing and rollout, and a today marker showing how far along the team really is.' },
      { title: 'Learning date-to-position mapping', text: 'Use it to understand how dates map to percentages along an axis, the same idea behind every schedule view, calendar strip and time-based visualisation.' },
    ],
    faqs: [
      { q: 'How are bars positioned on the time axis?', a: `Each task's start and end are mapped to percentages across the chart's time range with (value − min) / (max − min). The bar's left is the start percentage and its width is the end minus start percentage. Because every row uses the same mapping, all bars align under one shared axis, which is what lets you read overlaps and sequencing vertically.` },
      { q: 'Can I use real dates instead of day numbers?', a: `Yes. Convert each date to a numeric offset — for example milliseconds via Date.getTime(), or days since your range start — and set MIN and MAX to the range bounds in the same units. The percentage mapping works on any numeric scale, so dates, weeks, or hours all work; just format the axis marks to match.` },
      { q: 'What does the today marker show?', a: `It is a vertical line drawn across every row at the current point in the range, using the same percentage mapping as the bars. It instantly communicates progress — tasks left of the line are in the past, the bar it crosses is in progress, and tasks to the right are upcoming. Update its value to move it as time passes.` },
      { q: 'How is this different from a Gantt chart?', a: `It is essentially a lightweight Gantt: tasks as bars on a shared time axis. A full Gantt typically adds dependencies (arrows between tasks), drag-to-reschedule, and resource rows. This snippet focuses on the core read-only visualization — duration bars, a scale, gridlines, and a today marker — which covers most roadmap and schedule needs without a heavy library.` },
      { q: 'How do I use this timeline chart in React, Vue, or Angular?', a: `Map your tasks to rows and compute each bar's left and width from start/end percentages as inline styles. Render the scale marks and today line from the same mapping. Trigger the draw-on animation with a mounted effect or a class toggled after render, and track hover state for the tooltip. Tailwind users apply the grid and positioning with utilities.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to explain why pct(day) is the single function every bar, gridline, and the today marker all call — and what would visually break across the chart if just one row's bar computed its position a different way. It's also worth an optimization pass: with a double nested requestAnimationFrame used purely to trigger the scaleX grow-in transition after the browser paints, ask whether that's the minimal reliable pattern or whether it could be simplified. For extending the chart, ask for draggable bars that let a user reschedule a task and see the connector lines update live, a way to show task dependencies as arrows between bars, or a zoom control that changes the MIN/MAX day range without breaking the gridline spacing. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a horizontal timeline/Gantt-style chart in plain HTML, CSS, and JavaScript — no SVG, no charting library, positioned entirely with percentages.

Requirements:
- A single percentage-mapping function that converts any day number in the chart's range to a horizontal percentage position, and use that exact same function for every bar's position, every scale tick mark, every row's gridlines, and the "today" marker — there must be only one place in the code that does this math.
- Render a top scale with tick marks and labels at a fixed interval (such as every 7 days) across the configured min/max day range.
- Each task is a row with a fixed-width label column and a track; within the track, compute each task bar's left position and width purely from its start and end day mapped through the shared percentage function.
- Draw a vertical "today" line that spans every row at the current day's mapped position, visually distinguished (e.g. a different color) from the per-row gridlines.
- Animate each bar growing in from its left edge using a CSS transform: scaleX transition with transform-origin set to the left, staggered per row with an increasing animation delay, triggered after the bars are inserted into the DOM (using a double requestAnimationFrame so the browser has painted the starting state first).
- Add a hover tooltip on each bar showing its task name and its exact start-to-end day range, positioned near the cursor using the pointer event's coordinates relative to the chart container, and hide it on mouseleave.`,
    },
  },
};

export default timelineChart;
