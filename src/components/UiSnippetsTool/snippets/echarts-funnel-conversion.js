const echartsFunnelConversion = {
  id: 'echarts-funnel-conversion',
  title: 'ECharts Funnel Conversion Chart',
  lastmod: '2026-09-19',
  category: 'charts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/echarts@6.0.0/dist/echarts.min.js',
  ],
  html: `<div class="efn-wrap">
  <div class="efn-card">
    <div class="efn-title">Checkout Funnel</div>
    <div class="efn-sub">Percentages are relative to the stage above, not the top of the funnel</div>
    <div class="efn-chart" id="efnChart"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.efn-wrap{width:100%;max-width:520px}
.efn-card{background:#fff;border-radius:16px;padding:22px;box-shadow:0 1px 8px rgba(0,0,0,.07);border:1px solid #e2e8f0}
.efn-title{font-size:13px;font-weight:700;color:#0f172a}
.efn-sub{font-size:11.5px;color:#94a3b8;margin-top:3px;margin-bottom:6px}
.efn-chart{width:100%;height:340px}`,

  js: `var el = document.getElementById('efnChart');
var chart = echarts.init(el);

var stages = [
  { name: 'Viewed Product', value: 10000 },
  { name: 'Added to Cart', value: 4200 },
  { name: 'Started Checkout', value: 2600 },
  { name: 'Entered Payment', value: 1900 },
  { name: 'Completed Order', value: 1450 },
];

// Precompute each stage's conversion relative to the PREVIOUS stage, not the
// top of the funnel -- the number that actually tells you where the biggest
// relative leak is.
var withRates = stages.map(function (s, i) {
  var rate = i === 0 ? 100 : Math.round((s.value / stages[i - 1].value) * 100);
  return { name: s.name, value: s.value, rate: rate };
});

var COLORS = ['#6366f1', '#7c7ff2', '#93a5f5', '#a9caf5', '#c8e0ee'];

var option = {
  tooltip: {
    trigger: 'item',
    backgroundColor: '#0f172a',
    borderWidth: 0,
    textStyle: { color: '#fff', fontSize: 12 },
    formatter: function (p) {
      var d = withRates[p.dataIndex];
      return '<b>' + d.name + '</b><br/>' + d.value.toLocaleString('en-US') + ' users<br/>' + d.rate + '% of previous stage';
    },
  },
  series: [{
    type: 'funnel',
    left: '6%',
    right: '6%',
    top: 10,
    bottom: 10,
    width: '88%',
    min: 0,
    max: stages[0].value,
    minSize: '18%',
    maxSize: '100%',
    sort: 'none',
    gap: 3,
    label: {
      position: 'inside',
      color: '#fff',
      fontSize: 12,
      fontWeight: 700,
      formatter: function (p) {
        var d = withRates[p.dataIndex];
        return d.name + '\\n' + d.value.toLocaleString('en-US') + ' (' + d.rate + '%)';
      },
    },
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 2,
    },
    data: stages.map(function (s, i) { return { name: s.name, value: s.value, itemStyle: { color: COLORS[i] } }; }),
  }],
};

chart.setOption(option);

var ro = new ResizeObserver(function () { chart.resize(); });
ro.observe(el);`,

  seo: {
    title: 'ECharts Funnel Conversion Chart — Free Stage-by-Stage Snippet',
    description: `A checkout conversion funnel built with Apache ECharts, showing user counts and stage-to-stage percentages — not just percent-of-total. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ECharts Funnel Conversion Chart — Stage-to-Stage Rates, Not Percent-of-Total',
      description: `Most funnel charts show each stage as a percentage of the very top — which tells you the chart looks good overall but hides exactly where users are leaking out fastest. This snippet computes and displays each stage's conversion *relative to the stage directly above it*, which is the number a growth or product team actually needs to find the weakest step.

**sort: 'none' is a deliberate override**

ECharts' funnel series defaults to sorting data by value, largest first — sensible for a generic funnel, wrong here. The stages are already in their real, sequential order (viewed, added to cart, checkout, payment, completed), and re-sorting by size would scramble that sequence into something that no longer represents an actual user journey. \`sort: 'none'\` keeps the array order as the funnel's visual order.

**The rate is computed once, outside the chart option**

Before building \`option\`, a small \`.map\` pass walks the stages array and computes each one's \`rate\` against \`stages[i - 1].value\` (100% for the first stage, since there's no prior one). That precomputed \`withRates\` array is what both the segment labels and the tooltip formatter read from — the chart itself never does percentage math, it only renders values it's handed.

**Labels carry both the count and the rate**

Each segment's inline label combines the raw count and the stage-over-stage percentage on two lines (\`'\\n'\` inside the formatter's returned string) — useful because a raw count alone doesn't show *where* the funnel is leaking, and a percentage alone doesn't show *how many people* that represents.

**minSize keeps the bottom segment visible**

With five stages spanning 10,000 down to 1,450, a funnel sized purely by proportion would shrink the final segment to a sliver too thin to read its label. \`minSize: '18%'\` floors every segment's width so the smallest stage stays legible, at the cost of the shape being only approximately proportional at the tail — a fair trade for a chart people need to actually read.

**Reusing it**

Replace the five checkout stages with any sequential process — onboarding steps, application review stages, a sales pipeline — and the stage-over-stage rate computation, labels, and tooltip keep working unchanged since they only depend on the stages array being in real sequence order.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the ECharts CDN', text: `Load echarts.min.js before the snippet's JS runs.` },
      { title: 'Paste HTML, CSS, and JS', text: `A five-stage checkout funnel renders top to bottom.` },
      { title: 'Read each segment label', text: `It shows the raw count and the rate from the prior stage.` },
      { title: 'Hover a segment', text: `The tooltip repeats the count and stage-over-stage rate.` },
      { title: 'Find the biggest leak', text: `The lowest per-stage percentage is the weakest step.` },
      { title: 'Compare to percent-of-total', text: `Notice how different that view would look versus stage-over-stage.` },
    ] },
    features: [
      { title: 'Stage-over-stage rates', text: `Percentages relative to the previous step, not the top.` },
      { title: 'Sequential order preserved', text: `sort: none keeps the real process order intact.` },
      { title: 'Dual-line segment labels', text: `Count and rate shown together inside each segment.` },
      { title: 'Readable tail segment', text: `minSize keeps the smallest stage from vanishing.` },
      { title: 'Precomputed rate array', text: `Percentage math lives outside the chart option.` },
      { title: 'Consistent color ramp', text: `A single-hue gradient across all five stages.` },
      { title: 'Custom tooltip formatter', text: `Repeats count and rate on hover for confirmation.` },
      { title: 'Responsive canvas', text: `ResizeObserver keeps the funnel sized to its container.` },
    ],
    useCases: [
      { title: 'E-commerce checkout analysis', text: 'Find the exact step where carts are abandoned. Each stage shows its count and its rate relative to the previous step, not just to the top of the funnel.' },
      { title: 'Onboarding flow reviews', text: 'Apply the same stage-over-stage maths to signup, activation and first-action steps to see exactly where new users stall.' },
      { title: 'Sales pipeline dashboards', text: 'Show lead to opportunity to closed-won, using `sort: \'none\'` so the real process order is preserved instead of being re-sorted by size.' },
      { title: 'Hiring pipeline tracking', text: 'Track applied, screened, interviewed and offered stages, with `minSize` stopping the smallest stage at the bottom from vanishing.' },
      { title: 'Growth team reporting', text: 'Report both the conversion rate between steps and the absolute counts together, with a count and rate shown on two lines inside every segment.' },
      { icon: 'CODE', title: 'Related: ECharts Sankey User Flow Diagram', desc: 'See the [ECharts Sankey User Flow Diagram](/ui-snippets/echarts-sankey-user-flow/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why show percentage relative to the previous stage instead of the total?', a: `Percent-of-total tells you a stage's size compared to the very top of the funnel, which can look deceptively stable even while a specific step is leaking badly. Percent-of-previous-stage isolates exactly how much each individual transition loses, which is the number a team needs to identify which specific step to fix first.` },
      { q: 'Why is sort set to none on the funnel series?', a: `ECharts' funnel chart defaults to sorting segments by value from largest to smallest, which is appropriate when the categories have no inherent order. Here the stages represent a real sequential process (viewed, added to cart, checkout, payment, completed), so sorting by size would scramble that sequence — sort: 'none' preserves the array's given order as the funnel's visual order.` },
      { q: 'How is the smallest segment kept readable?', a: `The series sets minSize: '18%', which floors every segment's rendered width at 18% of the funnel's total width regardless of its actual proportional value. Without it, a segment representing 1,450 out of a 10,000-value scale would render as a sliver too narrow to hold its label — the trade-off is that segment widths become only approximately proportional near the bottom.` },
      { q: 'How do I use my own funnel stages?', a: `Replace the stages array with your own ordered { name, value } objects — the stage-over-stage rate calculation, the dual-line labels, and the tooltip all derive from that array's order and values automatically, as long as the stages remain listed in their real sequential order (largest expected value first is not required, only real order).` },
      { q: 'How do I use this funnel chart in React, Vue, or Angular?', a: `Compute the withRates array from your stage data (with useMemo in React, a computed property in Vue) before passing it into the chart option, initialize the chart once against a container ref, and call setOption whenever the stage data changes. Dispose the instance on unmount and keep the ResizeObserver pattern for responsive sizing.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out funnel percentage math from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the stage-over-stage rate is precomputed outside the chart option and why that's a more actionable metric than percent-of-total for finding the weakest step in a process. The same assistant can help optimize it — ask whether minSize: '18%' distorts the visual proportionality too much for a funnel with a very long tail, and whether there's a cleaner way to encode both count and rate in the label without a manual newline character. It's also useful for extending the effect: ask it to add a comparison funnel for a previous time period rendered side by side, a click handler that drills into the users who dropped off at a specific stage, or a horizontal orientation instead of vertical. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a funnel conversion chart for a sequential process (such as an e-commerce checkout) using Apache ECharts (load echarts from a CDN, no other library), in plain HTML, CSS, and JavaScript.

Requirements:
- Model the funnel as an ordered list of stages, each with a name and a numeric count of users who reached that stage, listed in their real sequential order from first to last (not sorted by value).
- Before building the chart, precompute each stage's conversion rate relative to the immediately preceding stage (not relative to the very first stage) — the first stage should show 100%, and every later stage's rate should be its count divided by the previous stage's count.
- Configure the funnel chart to preserve the given sequential order rather than automatically re-sorting segments by size, and set a minimum segment size so that even the smallest stage near the bottom of the funnel remains wide enough to hold a readable label instead of shrinking to an unreadable sliver.
- Show each segment's raw user count and its precomputed stage-over-stage percentage together as a two-line label rendered inside that segment.
- Show a tooltip on hover that repeats the stage name, raw count, and stage-over-stage percentage.
- Use a color ramp across the segments (for example a single hue getting progressively lighter from top to bottom) so the stages are visually distinguishable while still reading as one continuous funnel.
- Keep the chart instance responsive to its container being resized by calling the chart's resize method whenever the container's size changes.`,
    },
  },
};

export default echartsFunnelConversion;
