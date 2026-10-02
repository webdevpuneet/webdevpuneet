const apexchartsDonutLiveCenterTotal = {
  id: 'apexcharts-donut-live-center-total',
  title: 'ApexCharts Donut Chart with Live Center Total',
  lastmod: '2026-09-25',
  category: 'charts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/apexcharts@7.6.0/dist/apexcharts.min.js',
  ],
  html: `<div class="adn-wrap">
  <div class="adn-card">
    <div class="adn-title">Monthly Budget</div>
    <div class="adn-sub">Click a category to include or exclude it — the centre total follows</div>
    <div class="adn-body">
      <div id="adnChart"></div>
      <ul class="adn-legend" id="adnLegend" aria-label="Budget categories"></ul>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#fdf4ff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.adn-wrap{width:100%;max-width:640px}
.adn-card{background:#fff;border:1px solid #f0e4f5;border-radius:18px;padding:22px;box-shadow:0 10px 30px rgba(112,26,117,.08)}
.adn-title{font-size:16px;font-weight:700;color:#1e1b2e}
.adn-sub{font-size:12px;color:#6b6480;margin-top:3px}
.adn-body{display:flex;align-items:center;gap:10px;margin-top:8px}
#adnChart{flex:0 0 300px}
.adn-legend{list-style:none;flex:1;display:flex;flex-direction:column;gap:6px;min-width:0}
.adn-legend button{width:100%;display:flex;align-items:center;gap:10px;border:1px solid transparent;background:#faf7fc;border-radius:10px;padding:8px 10px;font:500 13px system-ui;color:#1e1b2e;cursor:pointer;text-align:left}
.adn-legend button:hover{border-color:#e9d5ff}
.adn-legend button:focus-visible{outline:2px solid #a855f7;outline-offset:1px}
.adn-legend button[aria-pressed="false"]{opacity:.45}
.adn-legend button[aria-pressed="false"] .adn-name{text-decoration:line-through}
.adn-sw{width:12px;height:12px;border-radius:4px;flex:0 0 auto}
.adn-name{flex:1}
.adn-amt{font-weight:700;font-variant-numeric:tabular-nums}
@media (max-width:560px){.adn-body{flex-direction:column}#adnChart{flex-basis:auto}}`,

  js: `var CATS = [
  { name: 'Housing',   value: 1650, color: '#a855f7' },
  { name: 'Food',      value: 620,  color: '#ec4899' },
  { name: 'Transport', value: 280,  color: '#f97316' },
  { name: 'Utilities', value: 210,  color: '#eab308' },
  { name: 'Fun',       value: 340,  color: '#14b8a6' },
  { name: 'Savings',   value: 900,  color: '#3b82f6' },
];
var money = function (v) { return '$' + Math.round(v).toLocaleString('en-US'); };

var chart = new ApexCharts(document.getElementById('adnChart'), {
  chart: {
    type: 'donut',
    height: 300,
    fontFamily: 'system-ui, sans-serif',
    events: {
      // Clicking a slice toggles it too, just like the custom legend.
      dataPointSelection: function (e, ctx, cfg) { toggle(cfg.dataPointIndex); },
    },
  },
  series: CATS.map(function (c) { return c.value; }),
  labels: CATS.map(function (c) { return c.name; }),
  colors: CATS.map(function (c) { return c.color; }),
  legend: { show: false },
  dataLabels: { enabled: false },
  stroke: { width: 3, colors: ['#fff'] },
  states: { active: { filter: { type: 'none' } } },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        size: '68%',
        labels: {
          show: true,
          name: { fontSize: '13px', color: '#6b6480', offsetY: -4 },
          value: { fontSize: '26px', fontWeight: 800, color: '#1e1b2e', offsetY: 6, formatter: function (v) { return money(Number(v)); } },
          // total.formatter runs on every redraw, so after a category is
          // hidden it sums only the series that are still visible.
          total: {
            show: true,
            showAlways: false,
            label: 'Total',
            color: '#6b6480',
            formatter: function (w) {
              return money(w.globals.seriesTotals.reduce(function (a, b) { return a + b; }, 0));
            },
          },
        },
      },
    },
  },
  tooltip: { y: { formatter: function (v) { return money(v); } } },
});

var legend = document.getElementById('adnLegend');
CATS.forEach(function (c, i) {
  var li = document.createElement('li');
  li.innerHTML = '<button type="button" aria-pressed="true"><span class="adn-sw" style="background:' + c.color + '"></span>' +
    '<span class="adn-name">' + c.name + '</span><span class="adn-amt">' + money(c.value) + '</span></button>';
  li.querySelector('button').addEventListener('click', function () { toggle(i); });
  legend.appendChild(li);
});

function toggle(i) {
  // toggleSeries hides or shows a pie/donut slice by its label. Refuse to
  // hide the last visible slice: that would leave an empty ring and $0.
  var btn = legend.children[i].querySelector('button');
  var visible = legend.querySelectorAll('button[aria-pressed="true"]').length;
  if (btn.getAttribute('aria-pressed') === 'true' && visible === 1) return;
  chart.toggleSeries(CATS[i].name);
  btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
}

chart.render();`,

  seo: {
    title: 'ApexCharts Donut Chart with Live Center Total — Free Snippet',
    description: `An ApexCharts donut chart with a custom accessible legend: toggling a category (in the legend or by clicking its slice) hides it and the centre total re-sums only the visible slices. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ApexCharts Donut Chart — A Centre Total That Updates When You Filter',
      description: `A donut chart's centre is prime space, and the most useful thing to put there is usually the total. The interesting part is keeping that total honest: when someone hides "Housing" to see how the rest of the budget splits, the centre should show the sum of what is still visible, not the original grand total.

**The total formatter runs on every redraw**

\`plotOptions.pie.donut.labels.total\` shows a label in the hole when nothing is hovered. Its \`formatter\` receives the chart context \`w\` and reads \`w.globals.seriesTotals\`, which only includes slices that are currently shown. Because ApexCharts re-runs the formatter after every toggle, the centre stays correct without any manual bookkeeping.

**A custom legend made of real buttons**

The built-in legend is hidden and replaced with a list of \`<button>\` elements that show each category's amount. Each button carries \`aria-pressed\`, is keyboard focusable, and uses both opacity and strike-through for the hidden state, so the state is not conveyed by colour alone.

**Slices and legend share one toggle**

Clicking a slice fires \`events.dataPointSelection\`, which calls the same \`toggle()\` as the legend buttons. \`chart.toggleSeries(name)\` hides or shows a slice by its label. The default click effects (\`expandOnClick\` and the active-state filter) are disabled so a click only means "toggle".

**Guarding the last slice**

If every slice were hidden, the donut would be empty and the total would read $0. \`toggle()\` refuses to hide the last visible category.

**Hover still works**

Hovering a slice temporarily replaces the total with that category's name and amount, then the total returns.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load ApexCharts', text: `Include apexcharts.min.js from the CDN.` },
      { title: 'Paste the snippet', text: `A budget donut renders with a custom legend beside it.` },
      { title: 'Toggle a category', text: `Click its legend row or its slice; the centre total updates.` },
      { title: 'Hover a slice', text: `The centre shows that category and amount while hovered.` },
      { title: 'Use your data', text: `Edit CATS with names, values and colours.` },
    ] },
    features: [
      { title: 'Live centre total', text: `Sums only visible slices via seriesTotals.` },
      { title: 'Accessible custom legend', text: `Buttons with aria-pressed and amounts.` },
      { title: 'Slice-click toggling', text: `dataPointSelection shares the legend's toggle.` },
      { title: 'Non-colour hidden state', text: `Opacity plus strike-through.` },
      { title: 'Last-slice guard', text: `Prevents an empty ring and a $0 total.` },
      { title: 'Clean click behaviour', text: `Expand and active filters disabled.` },
      { title: 'Currency formatting', text: `Consistent in centre, tooltip and legend.` },
      { title: 'Responsive layout', text: `Legend moves below the chart on small screens.` },
    ],
    useCases: [
      { title: 'Personal finance budgets', text: 'Show where the month\'s money goes, then hide Housing to see how the rest splits. The centre total re-sums only the visible slices, so the number always matches the ring.' },
      { title: 'Cloud cost dashboards', text: 'Break spend down by service and exclude a one-off cost to see the underlying trend. Toggle from the legend or by clicking a slice, and both stay in sync.' },
      { title: 'Traffic source reports', text: 'Compare channels with a filtered total, hiding paid traffic to see what organic and direct deliver on their own.' },
      { title: 'Survey answer shares', text: 'Let readers toggle categories off to focus on the responses that matter. Hidden slices fade and strike through, so the state never depends on colour alone.' },
      { title: 'Storage usage breakdowns', text: 'Show file types adding up to used space, with the centre total updating live as categories are hidden. The custom legend uses `aria-pressed` buttons for keyboard and screen reader access.' },
      { icon: 'CODE', title: 'Related: Donut Chart (vanilla)', desc: 'Build it without a library in [Donut Chart](/ui-snippets/donut-chart/).' },
      { icon: 'CODE', title: 'Related: ApexCharts Radial Bar Goal Rings', desc: 'For progress against targets see [ApexCharts Radial Bar Goal Rings](/ui-snippets/apexcharts-radialbar-goal-rings/).' },
    ],
    faqs: [
      { q: 'How do I show a total in the middle of an ApexCharts donut?', a: `Enable plotOptions.pie.donut.labels.show and labels.total.show, then give total a label and formatter. The formatter receives the chart context; sum w.globals.seriesTotals to get the total of visible slices.` },
      { q: 'Why does the total change when I hide a slice?', a: `ApexCharts calls the total formatter again after every redraw, and seriesTotals excludes hidden slices. That makes the centre a filtered total rather than a fixed grand total.` },
      { q: 'How do I hide a donut slice programmatically?', a: `Call chart.toggleSeries with the slice's label, or hideSeries and showSeries for explicit control. For pie and donut charts the label identifies the slice.` },
      { q: 'Why replace the built-in legend?', a: `A custom legend can show amounts, be made of real buttons with aria-pressed, and match your design. It also lets you add rules such as preventing the last slice from being hidden.` },
      { q: 'How do I stop slices from popping out on click?', a: `Set plotOptions.pie.expandOnClick to false, and set states.active.filter.type to 'none' to remove the darkening effect on the selected slice.` },
    ],
    aiPrompt: {
      paragraph: `Paste the snippet into an AI assistant like Claude and ask why seriesTotals gives a filtered total and how the custom legend and slice clicks share one toggle function. Ask it to add a percentage-of-visible column to the legend, a "reset" button, or a comparison ring showing last month. It can also review the legend for screen reader announcements when a category is hidden.`,
      prompt: `Build a budget donut chart with ApexCharts (loaded from a CDN) in plain HTML, CSS and JavaScript.

Requirements:
- Six categories with names, amounts and colours.
- A donut with a large hollow and a centre label that shows the total of the currently visible slices when idle, and the hovered category and amount on hover, formatted as currency.
- Hide the built-in legend and build an accessible legend of buttons showing colour, name and amount, with aria-pressed reflecting visibility and a strike-through for hidden categories.
- Toggling a category from the legend or by clicking its slice hides or shows that slice and updates the centre total.
- Prevent hiding the last visible category.
- Disable slice expansion on click and stack the legend under the chart on narrow screens.`,
    },
  },
};

export default apexchartsDonutLiveCenterTotal;
