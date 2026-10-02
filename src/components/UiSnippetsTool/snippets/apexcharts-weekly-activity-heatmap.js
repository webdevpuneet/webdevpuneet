const apexchartsWeeklyActivityHeatmap = {
  id: 'apexcharts-weekly-activity-heatmap',
  title: 'ApexCharts Weekly Activity Heatmap (Day × Hour)',
  lastmod: '2026-09-25',
  category: 'charts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/apexcharts@7.6.0/dist/apexcharts.min.js',
  ],
  html: `<div class="ahm-wrap">
  <div class="ahm-card">
    <div class="ahm-head">
      <div>
        <div class="ahm-title">When do customers message support?</div>
        <div class="ahm-sub">Average conversations started per hour, last 8 weeks</div>
      </div>
      <label class="ahm-tz">Time zone
        <select id="ahmShift">
          <option value="0">UTC</option>
          <option value="-5">New York (UTC−5)</option>
          <option value="1">Berlin (UTC+1)</option>
          <option value="5.5">Mumbai (UTC+5:30)</option>
        </select>
      </label>
    </div>
    <div id="ahmChart"></div>
    <div class="ahm-peak" id="ahmPeak"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ahm-wrap{width:100%;max-width:880px}
.ahm-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px 18px 14px;box-shadow:0 1px 8px rgba(15,23,42,.06)}
.ahm-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap}
.ahm-title{font-size:15px;font-weight:700;color:#0f172a}
.ahm-sub{font-size:12px;color:#64748b;margin-top:3px}
.ahm-tz{font-size:12px;color:#475569;font-weight:600;display:flex;align-items:center;gap:8px}
.ahm-tz select{font:500 12px system-ui;padding:6px 8px;border:1px solid #cbd5e1;border-radius:8px;background:#fff;color:#0f172a}
.ahm-peak{font-size:12.5px;color:#334155;padding:4px 6px 0}
.ahm-peak b{color:#0f172a}`,

  js: `var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Base data is stored in UTC: BASE[day][hour]. A realistic shape: busy
// weekday office hours, a lunch dip, quieter weekends.
var seed = 11;
function rand() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
var BASE = DAYS.map(function (d, di) {
  var weekend = di >= 5;
  var row = [];
  for (var h = 0; h < 24; h++) {
    var office = Math.exp(-Math.pow((h - 14) / 4.2, 2));
    var lunch = h === 12 ? 0.8 : 1;
    var v = (weekend ? 9 : 26) * office * lunch + 1.5 + rand() * 3;
    row.push(Math.round(v));
  }
  return row;
});

// Shifting to another zone moves every value by N hours, which can push
// it into the previous or next DAY. Work on a flat 168-hour week and wrap.
function shifted(offsetHours) {
  var flat = [];
  BASE.forEach(function (row) { flat = flat.concat(row); });
  var shift = Math.round(offsetHours);
  var out = DAYS.map(function () { return new Array(24).fill(0); });
  for (var i = 0; i < 168; i++) {
    var j = ((i + shift) % 168 + 168) % 168;
    out[Math.floor(j / 24)][j % 24] = flat[i];
  }
  return out;
}

function toSeries(grid) {
  // ApexCharts heatmaps draw series bottom-to-top, so reverse the days to
  // put Monday at the top where people expect it.
  return DAYS.map(function (d, di) {
    return {
      name: d,
      data: grid[di].map(function (v, h) { return { x: (h < 10 ? '0' : '') + h + ':00', y: v }; }),
    };
  }).reverse();
}

var peakEl = document.getElementById('ahmPeak');
function describePeak(grid) {
  var best = { v: -1 };
  grid.forEach(function (row, d) { row.forEach(function (v, h) { if (v > best.v) best = { v: v, d: d, h: h }; }); });
  peakEl.innerHTML = 'Busiest hour: <b>' + DAYS[best.d] + ' ' + best.h + ':00</b> with about <b>' + best.v + '</b> conversations.';
}

var chart = new ApexCharts(document.getElementById('ahmChart'), {
  chart: { type: 'heatmap', height: 300, toolbar: { show: false }, fontFamily: 'system-ui, sans-serif' },
  series: toSeries(BASE),
  dataLabels: { enabled: false },
  stroke: { width: 2, colors: ['#fff'] },
  plotOptions: {
    heatmap: {
      radius: 3,
      enableShades: false,
      // Explicit colour bands instead of automatic shading: a fixed legend
      // means the same colour always means the same load, across zones.
      colorScale: {
        ranges: [
          { from: 0,  to: 5,   color: '#e0f2fe', name: 'Quiet (0–5)' },
          { from: 6,  to: 12,  color: '#7dd3fc', name: 'Steady (6–12)' },
          { from: 13, to: 20,  color: '#0284c7', name: 'Busy (13–20)' },
          { from: 21, to: 999, color: '#0c4a6e', name: 'Peak (21+)' },
        ],
      },
    },
  },
  xaxis: {
    labels: {
      rotate: 0,
      formatter: function (v) { return v && v.slice(0, 2) % 3 === 0 ? v.slice(0, 2) : ''; },
    },
    axisTicks: { show: false },
    tooltip: { enabled: false },
  },
  legend: { position: 'bottom', markers: { shape: 'square' } },
  tooltip: {
    y: {
      // The series name is the day; add the hour from the hovered point.
      formatter: function (v, o) {
        var pt = o.w.config.series[o.seriesIndex].data[o.dataPointIndex];
        return pt.x + ' · ' + v + ' conversations';
      },
    },
  },
});

chart.render();
describePeak(BASE);

document.getElementById('ahmShift').addEventListener('change', function (e) {
  var grid = shifted(Number(e.target.value));
  chart.updateSeries(toSeries(grid));
  describePeak(grid);
});`,

  seo: {
    title: 'ApexCharts Weekly Activity Heatmap (Day × Hour) — Free Snippet',
    description: `A 7×24 day-by-hour heatmap built with ApexCharts: fixed colour bands with a legend, Monday at the top, a busiest-hour summary and a time-zone switch that correctly wraps hours across days. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ApexCharts Day × Hour Heatmap — Finding the Busy Hours in a Week',
      description: `A week of hourly counts is 168 numbers. As a table it is unreadable; as a day-by-hour heatmap the pattern jumps out immediately: the weekday afternoon block, the lunch dip, the quiet weekend. This layout is used for support staffing, posting schedules, server load and store footfall.

**Series are rows, points are columns**

In an ApexCharts heatmap each series is one row and each \`{ x, y }\` point is a cell. The snippet builds seven series (days), each with 24 points (hours). ApexCharts stacks series from the bottom up, so the array is reversed to put Monday on top.

**Fixed colour ranges instead of shades**

By default heatmap cells are shaded relative to the data. That makes colours mean different things after the data changes. Here \`enableShades: false\` and \`colorScale.ranges\` define four named bands with fixed boundaries. The legend lists them, and "Busy" means 13–20 conversations no matter which time zone you view.

**Time zones cross midnight**

Converting from UTC to another zone is not a per-row operation. Moving New York five hours back pushes Monday 02:00 UTC into Sunday evening. The snippet flattens the week to 168 hours, shifts every index with wrap-around (\`((i + shift) % 168 + 168) % 168\`), and rebuilds the grid. Half-hour zones are rounded to the nearest hour, which is noted as a limitation you may need to handle.

**A text summary**

The busiest day and hour are computed from the same grid and written under the chart, so the key insight is available without reading colours.

**Readable axis labels**

Only every third hour is labelled on the x-axis, keeping labels horizontal without collisions.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load ApexCharts', text: `Include apexcharts.min.js from the CDN.` },
      { title: 'Paste the snippet', text: `A 7-day by 24-hour grid renders with a four-band legend.` },
      { title: 'Hover cells', text: `The tooltip shows the day, hour and count.` },
      { title: 'Change time zone', text: `The grid shifts, wrapping hours into the previous or next day.` },
      { title: 'Read the summary', text: `The busiest hour is stated in text below the chart.` },
      { title: 'Load real data', text: `Fill BASE[day][hour] with your own UTC counts.` },
    ] },
    features: [
      { title: '7×24 heatmap grid', text: `Days as series, hours as points.` },
      { title: 'Monday-first ordering', text: `Series reversed to counter bottom-up stacking.` },
      { title: 'Fixed colour bands', text: `Named ranges with a stable meaning and a legend.` },
      { title: 'Correct time-zone shifting', text: `A flat 168-hour week wraps across day boundaries.` },
      { title: 'Busiest-hour summary', text: `Key insight stated in text.` },
      { title: 'Uncluttered axis', text: `Every third hour labelled, no rotated text.` },
      { title: 'Deterministic sample data', text: `Seeded values render identically on each load.` },
      { title: 'Cell gaps and rounding', text: `White strokes and small radius separate cells.` },
    ],
    useCases: [
      { title: 'Support staffing schedules', text: 'Schedule agents for the hours that actually bring tickets. The weekday-afternoon block and the lunch dip jump out of 168 numbers immediately.' },
      { title: 'Social posting schedules', text: 'Find when an audience is most engaged and plan posts around the busiest hours, with the busiest-hour summary stating the answer directly.' },
      { title: 'Infrastructure load planning', text: 'Spot recurring weekly traffic peaks for capacity planning. Fixed colour bands keep their meaning stable, so a dark cell always represents the same load.' },
      { title: 'Retail footfall analysis', text: 'See visits by weekday and hour, and switch time zone to compare stores. The 168-hour week wraps correctly across day boundaries.' },
      { title: 'Personal productivity tracking', text: 'Visualise when you commit code or do focused work. Monday sits at the top, with the series reversed to counter ApexCharts\' bottom-up stacking.' },
      { icon: 'CODE', title: 'Related: ECharts Calendar Heatmap', desc: 'For a year-long daily view see [ECharts Calendar Heatmap](/ui-snippets/echarts-calendar-heatmap/).' },
      { icon: 'CODE', title: 'Related: Activity Heatmap', desc: 'A dependency-free take in [Activity Heatmap](/ui-snippets/activity-heatmap/).' },
    ],
    faqs: [
      { q: 'How is data structured for an ApexCharts heatmap?', a: `An array of series, one per row. Each series has a name and a data array of { x, y } points, where x is the column label and y the value. Seven series with 24 points each gives a day-by-hour grid.` },
      { q: 'Why are the days reversed?', a: `ApexCharts draws heatmap series from the bottom of the chart upward. Reversing the array puts the first day, Monday, at the top.` },
      { q: 'How do I use fixed colour ranges?', a: `Set plotOptions.heatmap.enableShades to false and define plotOptions.heatmap.colorScale.ranges as objects with from, to, color and name. The names appear in the legend.` },
      { q: 'How do I convert the heatmap to another time zone?', a: `Store data in UTC, flatten the week into 168 hourly values, shift each index by the zone offset with modular wrap-around, and rebuild the 7×24 grid. Shifting row by row is wrong, because hours near midnight belong to the neighbouring day.` },
      { q: 'What about half-hour time zones like India?', a: `With hourly buckets a 30-minute offset can't be represented exactly, so this snippet rounds it. For exact results, bucket raw timestamps by local hour after converting them, instead of shifting pre-aggregated hours.` },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI assistant such as Claude and ask it to explain the 168-hour wrap-around and why shifting each day's row independently would be wrong. Useful extensions to ask for: bucketing raw event timestamps into the grid, handling daylight saving changes, a toggle between count and percent-of-week, or clicking a cell to list the underlying events. Ask it to review whether the colour bands suit your real distribution.`,
      prompt: `Build a day-by-hour activity heatmap with ApexCharts (loaded from a CDN) in plain HTML, CSS and JavaScript.

Requirements:
- Store a week of hourly counts in UTC as a 7×24 grid with a realistic weekday office-hours pattern, a lunch dip and quieter weekends, using a seeded random generator.
- Render seven series (Monday to Sunday) with 24 hourly points each, with Monday at the top.
- Use four fixed, named colour ranges instead of automatic shading, shown in a bottom legend.
- Label only every third hour on the x-axis and show counts in the tooltip.
- Add a time-zone select (UTC, UTC−5, UTC+1, UTC+5:30) that shifts the data correctly across day boundaries by treating the week as 168 continuous hours with wrap-around.
- Show the busiest day and hour as a text summary under the chart and update it when the zone changes.`,
    },
  },
};

export default apexchartsWeeklyActivityHeatmap;
