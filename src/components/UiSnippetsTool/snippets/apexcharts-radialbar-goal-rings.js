const apexchartsRadialbarGoalRings = {
  id: 'apexcharts-radialbar-goal-rings',
  title: 'ApexCharts Radial Bar Goal Rings',
  lastmod: '2026-09-25',
  category: 'charts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/apexcharts@7.6.0/dist/apexcharts.min.js',
  ],
  html: `<div class="arg-wrap">
  <div class="arg-card">
    <div class="arg-title">Weekly Goals</div>
    <div class="arg-sub">Each ring is progress toward its own target</div>
    <div class="arg-body">
      <div id="argChart"></div>
      <ul class="arg-list" id="argList"></ul>
    </div>
    <button class="arg-btn" id="argLog" type="button">Log a workout</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b1020;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.arg-wrap{width:100%;max-width:560px}
.arg-card{background:#131a2e;border:1px solid #1f2a44;border-radius:20px;padding:22px;color:#e2e8f0}
.arg-title{font-size:16px;font-weight:700}
.arg-sub{font-size:12px;color:#8b98b8;margin-top:3px}
.arg-body{display:flex;align-items:center;gap:8px;margin-top:6px}
#argChart{flex:0 0 270px}
.arg-list{list-style:none;display:flex;flex-direction:column;gap:12px;flex:1;min-width:0}
.arg-list li{display:flex;align-items:center;gap:10px;font-size:13px}
.arg-dot{width:10px;height:10px;border-radius:50%;flex:0 0 auto}
.arg-name{flex:1;color:#c7d0e6}
.arg-val{font-weight:700;font-variant-numeric:tabular-nums}
.arg-val small{color:#8b98b8;font-weight:500}
.arg-btn{margin-top:14px;width:100%;border:0;border-radius:12px;padding:11px;font:700 13px system-ui;background:#22c55e;color:#052e16;cursor:pointer}
.arg-btn:hover{filter:brightness(1.08)}
.arg-btn:focus-visible{outline:2px solid #86efac;outline-offset:2px}
@media (max-width:520px){.arg-body{flex-direction:column}#argChart{flex-basis:auto}}`,

  js: `var GOALS = [
  { name: 'Move',     unit: 'kcal', value: 1840, target: 2500, color: '#f43f5e' },
  { name: 'Exercise', unit: 'min',  value: 96,   target: 150,  color: '#22c55e' },
  { name: 'Stand',    unit: 'hrs',  value: 58,   target: 84,   color: '#38bdf8' },
];

// Radial bars take PERCENTAGES (0-100). The real values and targets stay in
// GOALS; only the ratio is handed to the chart. Values over target are
// capped at 100 so a ring never draws past a full circle.
function percents() {
  return GOALS.map(function (g) { return Math.min(100, Math.round((g.value / g.target) * 100)); });
}

function renderList() {
  document.getElementById('argList').innerHTML = GOALS.map(function (g) {
    return '<li><span class="arg-dot" style="background:' + g.color + '"></span>' +
      '<span class="arg-name">' + g.name + '</span>' +
      '<span class="arg-val">' + g.value.toLocaleString('en-US') + ' <small>/ ' + g.target.toLocaleString('en-US') + ' ' + g.unit + '</small></span></li>';
  }).join('');
}

var chart = new ApexCharts(document.getElementById('argChart'), {
  chart: { type: 'radialBar', height: 290, fontFamily: 'system-ui, sans-serif', animations: { speed: 700 } },
  series: percents(),
  labels: GOALS.map(function (g) { return g.name; }),
  colors: GOALS.map(function (g) { return g.color; }),
  plotOptions: {
    radialBar: {
      startAngle: 0,
      endAngle: 360,
      hollow: { size: '34%' },
      // The unfilled part of each ring. A dim version of the ring's own
      // colour reads better on dark backgrounds than a flat grey.
      track: { background: '#1f2a44', margin: 7, strokeWidth: '100%' },
      dataLabels: {
        name: { fontSize: '13px', color: '#8b98b8', offsetY: -6 },
        value: { fontSize: '22px', fontWeight: 800, color: '#f8fafc', offsetY: 4, formatter: function (v) { return v + '%'; } },
        // The centre shows an overall average until a ring is hovered.
        total: {
          show: true,
          label: 'Overall',
          color: '#8b98b8',
          formatter: function (w) {
            var s = w.globals.series;
            return Math.round(s.reduce(function (a, b) { return a + b; }, 0) / s.length) + '%';
          },
        },
      },
    },
  },
  stroke: { lineCap: 'round' },
  legend: { show: false },
});

chart.render();
renderList();

document.getElementById('argLog').addEventListener('click', function () {
  GOALS[0].value += 320;
  GOALS[1].value += 30;
  GOALS[2].value += 4;
  renderList();
  chart.updateSeries(percents());
});`,

  seo: {
    title: 'ApexCharts Radial Bar Goal Rings — Free Activity Rings Snippet',
    description: `Concentric activity-style goal rings built with the ApexCharts radialBar chart: each ring tracks its own target, the centre shows an overall average, and a button animates progress. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ApexCharts Radial Bar Goal Rings — Several Targets, One Compact Chart',
      description: `Goal rings are a good fit when a handful of targets matter equally and each has a different unit: calories, minutes and hours can't share an axis, but "how far along am I" can. ApexCharts' \`radialBar\` chart draws one concentric ring per series value, which maps directly onto that idea.

**The chart only ever sees percentages**

A radial bar value is a percentage from 0 to 100. The snippet keeps real values and targets in a \`GOALS\` array and derives percentages with \`percents()\`. That separation matters: the side list shows "1,840 / 2,500 kcal" from the real data, and the chart shows the ratio, so neither has to be reverse-engineered from the other. Values are capped at 100 so an exceeded goal draws a full ring rather than a broken one.

**Full circles and rounded ends**

\`startAngle: 0\` and \`endAngle: 360\` turn the default gauge into full rings. \`stroke.lineCap: 'round'\` rounds the ends of each progress arc, and \`track\` styles the unfilled remainder of each ring.

**A meaningful centre label**

\`dataLabels.total\` shows an "Overall" average when nothing is hovered, computed from \`w.globals.series\` in its formatter. Hovering a ring swaps the centre to that ring's name and percentage.

**Animated updates**

"Log a workout" changes the underlying values and calls \`updateSeries(percents())\`. ApexCharts animates each ring from its old angle to its new one.

**Accessibility**

Rings alone are hard to read for people who can't distinguish the colours, so every value is also listed in text beside the chart with a matching colour dot.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load ApexCharts', text: `Include apexcharts.min.js from the CDN.` },
      { title: 'Paste the snippet', text: `Three concentric rings render next to a text list of the same values.` },
      { title: 'Hover a ring', text: `The centre label switches from the overall average to that ring.` },
      { title: 'Log progress', text: `Click the button; the rings animate to their new percentages.` },
      { title: 'Define your goals', text: `Edit the GOALS array: name, unit, current value, target and colour.` },
    ] },
    features: [
      { title: 'Concentric goal rings', text: `One radialBar ring per goal, drawn as a full circle.` },
      { title: 'Values kept separate from ratios', text: `Real units in data, percentages in the chart.` },
      { title: 'Over-target capping', text: `Exceeded goals draw a complete ring, never more.` },
      { title: 'Overall centre label', text: `A total formatter averages all rings when idle.` },
      { title: 'Rounded progress ends', text: `stroke.lineCap: 'round' for an activity-ring look.` },
      { title: 'Animated updates', text: `updateSeries animates each ring to its new angle.` },
      { title: 'Text equivalent', text: `A list repeats every value for readers who can't rely on colour.` },
      { title: 'Dark theme styling', text: `Tracks and labels tuned for a dark card.` },
    ],
    useCases: [
      { title: 'Fitness and health apps', text: 'Show move, exercise and stand goals as concentric rings, each tracking its own target in its own unit and all readable at a glance.' },
      { title: 'Sales quotas', text: 'Track per-rep or per-region progress against quota. Over-target goals draw a complete ring and never more, so the chart stays honest.' },
      { title: 'Project health', text: 'Show budget used, tasks done and time elapsed together. Percentages live in the chart while real units stay in the data, so labels can show both.' },
      { title: 'Learning platform progress', text: 'Display course, quiz and practice completion as rings, with the centre label averaging all of them into one overall figure while idle.' },
      { title: 'Habit and savings dashboards', text: 'Use rings for goals with different units, such as calories, minutes and money, which cannot share an axis but can share a percentage.' },
      { icon: 'CODE', title: 'Related: Activity Rings (vanilla SVG)', desc: 'See how the same idea is built without a library in [Activity Rings](/ui-snippets/activity-rings/).' },
      { icon: 'CODE', title: 'Related: ApexCharts Sparkline KPI Cards', desc: 'Show trends next to goals with [ApexCharts Sparkline KPI Cards](/ui-snippets/apexcharts-sparkline-kpi-cards/).' },
    ],
    faqs: [
      { q: 'What values does an ApexCharts radialBar expect?', a: `Percentages between 0 and 100, one per ring. Convert real values yourself, for example Math.round(value / target * 100), and keep the originals in your own data for labels and tooltips.` },
      { q: 'How do I make full-circle rings instead of a gauge?', a: `Set plotOptions.radialBar.startAngle to 0 and endAngle to 360. For a semicircle gauge use -90 and 90 instead.` },
      { q: 'How do I show a total in the middle?', a: `Enable plotOptions.radialBar.dataLabels.total with show: true, a label, and a formatter. The formatter receives the chart context w; w.globals.series holds the current percentages you can average or sum.` },
      { q: 'What happens when a goal is exceeded?', a: `A value above 100 would draw past a full circle, so the snippet caps each percentage at 100. The real value is still shown in the text list, so the overachievement is not lost.` },
      { q: 'How do I animate progress changes?', a: `Call chart.updateSeries with the new array of percentages. ApexCharts animates each ring from its previous value; chart.animations.speed controls the duration.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into Claude or another AI assistant and ask it to explain why the chart receives percentages while the list shows real values, and how the total formatter reads the current series. It can help you add a celebratory state when a ring reaches 100%, weekly history as small rings per day, or a light theme variant. Ask whether capping at 100% hides useful information and how you might show overachievement instead, such as a second lap ring.`,
      prompt: `Build concentric goal progress rings with the ApexCharts radialBar chart (loaded from a CDN) in plain HTML, CSS and JavaScript on a dark card.

Requirements:
- Keep three goals in a data array, each with a name, unit, current value, target and colour.
- Convert each goal to a percentage of its target, capped at 100, and pass only percentages to the chart.
- Draw full-circle rings with rounded line caps, a dim track behind each ring and a hollow centre.
- Show an "Overall" average in the centre when idle, and the hovered ring's name and percentage on hover.
- List every goal beside the chart as text with a colour dot, current value, target and unit.
- Add a "Log a workout" button that increases the values and animates the rings with updateSeries.
- Stack the chart and list vertically on narrow screens.`,
    },
  },
};

export default apexchartsRadialbarGoalRings;
