const apexchartsGanttRangeBarTimeline = {
  id: 'apexcharts-gantt-range-bar-timeline',
  title: 'ApexCharts Gantt Timeline with Range Bars',
  lastmod: '2026-09-25',
  category: 'charts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/apexcharts@7.6.0/dist/apexcharts.min.js',
  ],
  html: `<div class="agt-wrap">
  <div class="agt-card">
    <div class="agt-head">
      <div>
        <div class="agt-title">Website Relaunch — Q4 Plan</div>
        <div class="agt-sub">Bars are coloured by owner team · the dashed line is today</div>
      </div>
      <button class="agt-btn" id="agtSlip" type="button">Slip design by 1 week</button>
    </div>
    <div id="agtChart"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.agt-wrap{width:100%;max-width:900px}
.agt-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px 18px 8px;box-shadow:0 1px 8px rgba(15,23,42,.06)}
.agt-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap}
.agt-title{font-size:15px;font-weight:700;color:#0f172a}
.agt-sub{font-size:12px;color:#64748b;margin-top:3px}
.agt-btn{border:1px solid #cbd5e1;background:#fff;border-radius:9px;padding:7px 12px;font:600 12px system-ui;color:#0f172a;cursor:pointer}
.agt-btn:hover{border-color:#6366f1;color:#4f46e5}`,

  js: `function d(s) { return new Date(s + 'T00:00:00Z').getTime(); }
var WEEK = 7 * 86400000;
var TEAM_COLORS = { Research: '#8b5cf6', Design: '#ec4899', Engineering: '#0ea5e9', Marketing: '#f59e0b' };

// Each task: a row label (x), a [start, end] range (y) and an owner team.
// Tasks with dependsOn start no earlier than their dependency ends.
var TASKS = [
  { x: 'User interviews',      start: d('2026-10-01'), end: d('2026-10-14'), team: 'Research' },
  { x: 'Information arch.',    start: d('2026-10-12'), end: d('2026-10-23'), team: 'Research', dependsOn: 'User interviews' },
  { x: 'Visual design',        start: d('2026-10-19'), end: d('2026-11-06'), team: 'Design', dependsOn: 'Information arch.' },
  { x: 'Design system tokens', start: d('2026-10-26'), end: d('2026-11-09'), team: 'Design' },
  { x: 'Frontend build',       start: d('2026-11-02'), end: d('2026-11-27'), team: 'Engineering', dependsOn: 'Visual design' },
  { x: 'CMS migration',        start: d('2026-11-09'), end: d('2026-11-30'), team: 'Engineering' },
  { x: 'QA & accessibility',   start: d('2026-11-23'), end: d('2026-12-07'), team: 'Engineering', dependsOn: 'Frontend build' },
  { x: 'Launch campaign',      start: d('2026-12-01'), end: d('2026-12-14'), team: 'Marketing', dependsOn: 'QA & accessibility' },
];

// Push dependants forward so none starts before its dependency ends,
// keeping each task's duration. Tasks are listed in dependency order.
function resolve() {
  var byName = {};
  TASKS.forEach(function (t) {
    if (t.dependsOn && byName[t.dependsOn] && t.start < byName[t.dependsOn].end) {
      var len = t.end - t.start;
      t.start = byName[t.dependsOn].end;
      t.end = t.start + len;
    }
    byName[t.x] = t;
  });
}

function series() {
  return [{
    data: TASKS.map(function (t) {
      return { x: t.x, y: [t.start, t.end], fillColor: TEAM_COLORS[t.team], meta: t.team };
    }),
  }];
}

var TODAY = d('2026-11-04');
var fmt = function (ts) { return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }); };

resolve();
var chart = new ApexCharts(document.getElementById('agtChart'), {
  chart: { type: 'rangeBar', height: 360, toolbar: { show: false }, fontFamily: 'system-ui, sans-serif' },
  series: series(),
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '58%',
      borderRadius: 5,
      rangeBarGroupRows: false,
    },
  },
  xaxis: { type: 'datetime', labels: { datetimeUTC: true, format: 'dd MMM' } },
  yaxis: { labels: { style: { fontSize: '12px', colors: '#334155' } } },
  grid: { borderColor: '#eef2f7', xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
  dataLabels: {
    enabled: true,
    style: { fontSize: '11px', fontWeight: 600 },
    formatter: function (val) {
      var days = Math.round((val[1] - val[0]) / 86400000);
      return days + 'd';
    },
  },
  annotations: {
    xaxis: [{
      x: TODAY,
      borderColor: '#ef4444',
      strokeDashArray: 4,
      label: { text: 'Today', orientation: 'horizontal', style: { background: '#ef4444', color: '#fff', fontSize: '11px' } },
    }],
  },
  tooltip: {
    custom: function (o) {
      var p = o.w.config.series[o.seriesIndex].data[o.dataPointIndex];
      return '<div style="padding:8px 10px;font:12px system-ui">' +
        '<b>' + p.x + '</b><br>' + p.meta + '<br>' + fmt(p.y[0]) + ' → ' + fmt(p.y[1]) + '</div>';
    },
  },
  legend: { show: false },
});

chart.render();

document.getElementById('agtSlip').addEventListener('click', function () {
  var t = TASKS.find(function (x) { return x.x === 'Visual design'; });
  t.start += WEEK;
  t.end += WEEK;
  resolve();
  chart.updateSeries(series());
});`,

  seo: {
    title: 'ApexCharts Gantt Timeline with Range Bars — Free Project Plan Snippet',
    description: `A project Gantt chart built with the ApexCharts rangeBar series: team-coloured task bars, duration labels, a dashed "today" marker, tooltips with dates, and dependencies that push later tasks when one slips. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ApexCharts Gantt Chart — Range Bars, a Today Line and Simple Dependencies',
      description: `A Gantt chart answers two questions at once: what happens when, and what happens if something runs late. ApexCharts doesn't ship a dedicated Gantt type, but its \`rangeBar\` series with \`horizontal: true\` is exactly a list of rows with a start and end on a time axis.

**Each point is a row with a range**

Every task becomes one data point: \`x\` is the row label, \`y\` is a \`[start, end]\` pair of timestamps. \`fillColor\` sets each bar's colour individually, so bars are coloured by owner team without splitting the data into one series per team (which would break row ordering).

**Durations and dates without clutter**

The data label formatter receives the \`[start, end]\` range and prints the duration in days inside each bar. Exact dates live in a \`custom\` tooltip, which reads the full data point — including the extra \`meta\` field holding the team name.

**A today marker**

An x-axis annotation draws a dashed red line at the current date with a label. This is often the most-used part of a real project chart: everything left of it should be finished.

**Dependencies, kept deliberately simple**

Tasks can declare \`dependsOn\`. The \`resolve()\` function walks the tasks in order and moves any dependant whose start falls before its dependency's end, preserving its duration. "Slip design by 1 week" moves Visual design and re-resolves, so Frontend build, QA and the launch campaign cascade forward. This is a teaching-sized scheduler: it assumes tasks are listed in dependency order and it does not draw dependency arrows.

**Dates in UTC**

Dates are created with an explicit UTC midnight and the axis uses \`datetimeUTC: true\`, so bars don't shift by a day for viewers in other time zones.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load ApexCharts', text: `Include apexcharts.min.js from the CDN.` },
      { title: 'Paste the snippet', text: `Eight tasks render as horizontal bars on a date axis.` },
      { title: 'Hover a bar', text: `The tooltip shows task, team and exact dates.` },
      { title: 'Slip a task', text: `Click the button; dependent tasks move forward automatically.` },
      { title: 'Edit the plan', text: `Change TASKS: label, start, end, team and optional dependsOn.` },
      { title: 'Move the today line', text: `Set TODAY to the current date, for example Date.now().` },
    ] },
    features: [
      { title: 'Horizontal range bars', text: `rangeBar series with [start, end] timestamps.` },
      { title: 'Per-task colours', text: `fillColor on each point keeps row order intact.` },
      { title: 'Duration labels', text: `Days computed inside the data label formatter.` },
      { title: 'Today annotation', text: `A dashed x-axis marker with a label.` },
      { title: 'Custom tooltip', text: `Reads extra fields like team from the data point.` },
      { title: 'Cascading dependencies', text: `Slipping one task pushes the tasks that depend on it.` },
      { title: 'UTC-safe dates', text: `No off-by-one shifts across viewer time zones.` },
      { title: 'Clean grid', text: `Vertical date lines only, no horizontal clutter.` },
    ],
    useCases: [
      { title: 'Project and roadmap planning', text: 'Lay out a quarter\'s work as rows of range bars. The dashed today line shows at a glance what should already be finished.' },
      { title: 'Agency client timelines', text: 'Share phases and ownership with clients, using team colours so each bar\'s owner is clear without a legend lookup.' },
      { title: 'Release trains', text: 'Plan build, test and rollout windows for each team. Dependencies push later tasks when one runs late, showing how a delay ripples through the schedule.' },
      { title: 'Event planning tracks', text: 'Run venue, marketing and logistics as parallel tracks, with duration labels computed in the data label formatter so every bar states how many days it spans.' },
      { title: 'Resource and workload views', text: 'Swap tasks for people to show assignments across weeks, using the same `rangeBar` structure with `horizontal: true` and team-coloured points.' },
      { icon: 'CODE', title: 'Related: Gantt Chart Table', desc: 'A table-based alternative: [Gantt Chart Table](/ui-snippets/gantt-table/).' },
      { icon: 'CODE', title: 'Related: FullCalendar Resource Timeline', desc: 'For bookable rooms and staff see [FullCalendar Resource Timeline](/ui-snippets/fullcalendar-resource-timeline/).' },
    ],
    faqs: [
      { q: 'Does ApexCharts have a Gantt chart?', a: `Not as a named type, but a rangeBar series with plotOptions.bar.horizontal set to true renders one bar per row between a start and end value on a datetime axis, which is a Gantt chart.` },
      { q: 'How do I colour Gantt bars by category?', a: `Set fillColor on each data point. Using one series per category also works, but it can change how rows are grouped and ordered, so per-point colours are simpler for a task list.` },
      { q: 'How do I add a today line?', a: `Add an entry to annotations.xaxis with x set to the current timestamp, a borderColor and strokeDashArray for a dashed line, and a label.` },
      { q: 'How do dependencies work here?', a: `Each task may name the task it depends on. resolve() walks tasks in order and, if a dependant starts before its dependency ends, moves it to start at that end while keeping its duration. For complex plans with arrows and critical paths, use a dedicated Gantt library.` },
      { q: 'Why are dates built in UTC?', a: `new Date('2026-10-01') parses as UTC, but other formats parse as local time. Mixing them, or formatting in local time, can shift bars by a day for some viewers. Using explicit UTC dates and datetimeUTC on the axis keeps every viewer on the same calendar day.` },
    ],
    aiPrompt: {
      paragraph: `Share this snippet with an AI assistant like Claude and ask it to explain how the rangeBar series becomes a Gantt chart and how resolve() cascades a delay. Then ask for improvements: drawing dependency arrows with an SVG overlay, marking the critical path, grouping rows under team headings, or dragging a bar to reschedule it. Ask where the simple ordered-dependency approach would break down in a real plan.`,
      prompt: `Build a project Gantt chart with the ApexCharts rangeBar series (loaded from a CDN) in plain HTML, CSS and JavaScript.

Requirements:
- Define eight tasks with a label, UTC start and end dates, an owner team, and an optional dependency on an earlier task.
- Render horizontal range bars on a UTC datetime axis, one row per task, coloured per task by team using per-point fill colours.
- Show each task's duration in days as a label inside its bar and a custom tooltip with task name, team and formatted start and end dates.
- Draw a dashed "Today" vertical annotation line.
- Implement a resolve step that moves any task starting before its dependency ends, keeping its duration.
- Add a button that delays one task by a week, re-runs resolve and updates the chart so dependent tasks cascade forward.`,
    },
  },
};

export default apexchartsGanttRangeBarTimeline;
