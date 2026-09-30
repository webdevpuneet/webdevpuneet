const waterfallChart = {
  id: 'waterfall-chart',
  title: 'Waterfall Chart',
  lastmod: '2026-06-17',
  category: 'charts',
  html: `<div class="wf-card">
  <div class="wf-head">
    <div>
      <h2 class="wf-title">Revenue bridge</h2>
      <div class="wf-sub">Q2 → Q3 · thousands</div>
    </div>
    <button class="wf-replay" onclick="replay()">↻ Replay</button>
  </div>

  <div class="wf-plot"><div class="wf-chart" id="wfChart"></div></div>

  <div class="wf-legend">
    <span><i class="wf-k total"></i>Total</span>
    <span><i class="wf-k inc"></i>Increase</span>
    <span><i class="wf-k dec"></i>Decrease</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.wf-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;width:100%;max-width:460px;box-shadow:0 14px 44px rgba(15,23,42,.07)}
.wf-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:18px}
.wf-title{font-size:17px;font-weight:800;color:#1e293b}
.wf-sub{font-size:12px;color:#94a3b8;font-weight:600;margin-top:2px}
.wf-replay{background:#f1f5f9;border:none;border-radius:9px;padding:7px 12px;font-size:12px;font-weight:700;color:#475569;cursor:pointer;font-family:inherit;transition:background .15s}
.wf-replay:hover{background:#e2e8f0}

.wf-plot{padding:22px 4px 28px}
.wf-chart{position:relative;height:200px}

.wf-bar{position:absolute;border-radius:5px 5px 3px 3px;transform-origin:bottom;animation:wf-grow .6s cubic-bezier(.4,0,.2,1) both}
.wf-bar.total{background:#6366f1}
.wf-bar.inc{background:#22c55e}
.wf-bar.dec{background:#f87171}
@keyframes wf-grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
.wf-amt{position:absolute;bottom:calc(100% + 4px);left:0;right:0;text-align:center;font-size:10px;font-weight:800;color:#475569;white-space:nowrap}
.wf-bar.total .wf-amt{color:#4f46e5}
.wf-bar.inc .wf-amt{color:#16a34a}
.wf-bar.dec .wf-amt{color:#dc2626}

.wf-xlabel{position:absolute;bottom:-24px;text-align:center;font-size:10px;font-weight:600;color:#94a3b8;line-height:1.2}
.wf-conn{position:absolute;height:0;border-top:2px dotted #cbd5e1}

.wf-legend{display:flex;gap:16px;justify-content:center;margin-top:14px;padding-top:14px;border-top:1px solid #f1f5f9}
.wf-legend span{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:#64748b}
.wf-k{width:11px;height:11px;border-radius:3px}
.wf-k.total{background:#6366f1}.wf-k.inc{background:#22c55e}.wf-k.dec{background:#f87171}`,

  js: `var DATA = [
  { label: 'Opening', type: 'total', value: 1200 },
  { label: 'New sales', type: 'step', value: 800 },
  { label: 'Upsells', type: 'step', value: 450 },
  { label: 'Refunds', type: 'step', value: -300 },
  { label: 'Op. costs', type: 'step', value: -620 },
  { label: 'Net', type: 'total', value: null }
];
var H = 200;

function build() {
  var chart = document.getElementById('wfChart');
  var cum = 0, items = [], maxLevel = 0;
  DATA.forEach(function (d) {
    var start, end;
    if (d.type === 'total') { start = 0; end = (d.value == null ? cum : d.value); cum = end; }
    else { start = cum; end = cum + d.value; cum = end; }
    items.push({ label: d.label, type: d.type, start: start, end: end, value: d.value });
    maxLevel = Math.max(maxLevel, start, end);
  });

  var scale = H / (maxLevel * 1.12);
  var N = items.length, colW = 100 / N, barW = colW * 0.5;
  var html = '';

  items.forEach(function (it, i) {
    var lo = Math.min(it.start, it.end), hi = Math.max(it.start, it.end);
    var bottom = lo * scale, height = Math.max(2, (hi - lo) * scale);
    var left = i * colW + (colW - barW) / 2;
    var cls = it.type === 'total' ? 'total' : (it.value >= 0 ? 'inc' : 'dec');
    var amt = it.type === 'total' ? it.end : (it.value >= 0 ? '+' : '−') + Math.abs(it.value);
    html += '<div class="wf-bar ' + cls + '" style="left:' + left + '%;width:' + barW + '%;bottom:' + bottom + 'px;height:' + height + 'px;animation-delay:' + (i * 0.09) + 's">' +
      '<span class="wf-amt">' + (typeof amt === 'number' ? amt.toLocaleString() : amt) + '</span></div>';
    html += '<div class="wf-xlabel" style="left:' + (i * colW) + '%;width:' + colW + '%">' + it.label + '</div>';
    if (i < items.length - 1) {
      var y = it.end * scale;
      var x1 = i * colW + colW / 2, x2 = (i + 1) * colW + colW / 2;
      html += '<div class="wf-conn" style="left:' + x1 + '%;width:' + (x2 - x1) + '%;bottom:' + y + 'px"></div>';
    }
  });
  chart.innerHTML = html;
}

function replay() { build(); }

build();`,

  seo: {
    title: 'Waterfall Chart — Bridge Chart HTML CSS JS Snippet',
    description: `Financial waterfall (bridge) chart with floating increase/decrease bars, total columns, dotted connectors & a staggered grow-in. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Waterfall Chart — Floating Increase/Decrease Bars, Running Totals & Dotted Connectors`,
      description: `A waterfall (or bridge) chart shows how a starting value becomes an ending value through a sequence of positive and negative changes — revenue bridges, budget variance, profit breakdowns, headcount changes. Each step "floats" at the running total left by the previous step, so the eye walks down (or up) the cascade. This snippet builds one in plain HTML, CSS, and vanilla JavaScript from a simple data array: floating increase/decrease bars, full-height total columns, dotted connectors, value labels, and a staggered grow-in animation.

**Running-total math**

\`build\` walks the data, tracking a \`cum\` running total. A \`total\` row (opening/closing) draws a full bar from zero to its value; a \`step\` row floats from the current total to the new total (\`cum + value\`), then updates \`cum\`. It records each bar's \`start\` and \`end\` levels and the overall \`maxLevel\` for scaling. The closing total can be left as \`null\` to auto-compute the net from the accumulated steps — so the "Net" bar always reflects the real sum.

**Floating bars positioned by value**

Each bar is absolutely positioned: its \`bottom\` is the lower of its start/end levels times a scale factor, and its \`height\` is the difference. Increase steps are green and sit above the previous total; decrease steps are red and hang below it; totals are full-height blue columns from the baseline. The scale is derived from \`maxLevel\` with headroom so the tallest bar never touches the top. Bar x-positions and widths use percentages, so the chart is responsive without any resize code.

**Dotted connectors**

Between consecutive bars, a dotted horizontal line is drawn at the end level of the left bar — which is exactly the start level of the next — visually linking each step to where the next one begins. These connectors are what make a waterfall readable as a continuous bridge rather than a set of disconnected bars.

**Staggered grow-in**

Bars animate up from the baseline with a \`wf-grow\` keyframe using \`transform: scaleY\` and \`transform-origin: bottom\`, with a per-bar \`animation-delay\` so the cascade builds left to right. Using a transform (not height) keeps the animation on the compositor and means it exports cleanly to utility frameworks. A replay button rebuilds the chart to replay the animation.

**Data-driven and value-labelled**

The whole chart regenerates from the \`DATA\` array, and each bar shows its signed value (\`+800\`, \`−300\`, or a total formatted with \`toLocaleString\`). Swap the array for your real figures and the bridge redraws. Pair this with a [bar chart](/ui-snippets/bar-chart/) for categories, a [funnel chart](/ui-snippets/funnel-chart/) for conversion drop-off, or a [metric card grid](/ui-snippets/metric-card-grid/) for headline numbers.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A "Revenue bridge" card appears and the bars grow up from the baseline left to right, forming the waterfall.` },
      { title: 'Read the bridge', text: `Blue totals anchor the start and net; green bars step up for increases and red bars step down for decreases between them.` },
      { title: 'Follow the connectors', text: `Dotted lines link the top of each bar to the start of the next, showing the running total carrying across.` },
      { title: 'Check the values', text: `Each bar is labelled with its signed change (+800, −300) or its total, formatted with thousands separators.` },
      { title: 'Replay the animation', text: `Click "↻ Replay" to rebuild and re-run the staggered grow-in.` },
      { title: 'Plug in your data', text: `Edit the \`DATA\` array — use \`type:'total'\` for anchors (value \`null\` auto-computes the net) and \`type:'step'\` with signed values for changes.` },
    ] },
    features: [
      { title: 'Running-total engine', text: `\`build\` tracks a cumulative total so each step floats at the previous level, and a null closing total auto-computes the net.` },
      { title: 'Value-positioned floating bars', text: `Bars are placed by \`bottom\` and \`height\` from their start/end levels — increases sit above, decreases hang below the running total.` },
      { title: 'Dotted step connectors', text: `A connector at each bar's end level links it to the next bar's start, making the cascade read as one continuous bridge.` },
      { title: 'Auto-scaled height', text: `The scale derives from the max level with headroom, so the tallest bar never clips and small steps stay visible.` },
      { title: 'Transform grow-in', text: `Bars rise via \`scaleY\` from a bottom origin with staggered \`animation-delay\`, a compositor-smooth cascade that exports cleanly.` },
      { title: 'Responsive percentages', text: `Bar x-positions and widths use percentages, so the chart fluidly fills its container with no resize handling.` },
      { title: 'Signed value labels', text: `Each bar shows \`+\`/\`−\` changes or a \`toLocaleString\` total, colour-matched to increase/decrease/total.` },
      { title: 'Data-driven + replay', text: `The chart regenerates from one \`DATA\` array; a replay button rebuilds it to re-run the animation.` },
    ],
    useCases: [
      { title: 'Revenue and profit bridges', text: `Show how opening revenue becomes closing revenue through sales, upsells, refunds, and costs. Pair with a [metric card grid](/ui-snippets/metric-card-grid/).` },
      { title: 'Budget variance analysis', text: `Walk from budget to actual through over/under line items, with red and green making variance obvious.` },
      { title: 'Headcount and inventory changes', text: `Bridge starting to ending counts through hires/attrition or stock in/out flows.` },
      { title: 'Cohort and churn breakdowns', text: `Start MRR → new → expansion → churn → end MRR; complements a [funnel chart](/ui-snippets/funnel-chart/) for the conversion side.` },
      { title: 'Cost and pricing breakdowns', text: `Show how a base price builds to a final price through fees, discounts, and taxes.` },
      { title: 'Finance dashboards and reports', text: `A bridge chart in any analytics view; combine with a [bar chart](/ui-snippets/bar-chart/) and [line chart widget](/ui-snippets/line-chart-widget/).` },
    ],
    faqs: [
      { q: 'How do I plug in my own numbers?', a: `Edit the \`DATA\` array: each entry is \`{ label, type, value }\`. Use \`type:'total'\` for anchor columns (set \`value:null\` on the final one to auto-compute the net from the steps) and \`type:'step'\` with a positive or negative \`value\` for each change. \`build\` handles cumulative positioning, scaling, connectors, and labels automatically.` },
      { q: 'How do I handle a running total that goes negative?', a: `The current scale assumes non-negative levels. To support negatives, compute both the min and max level across all bars, map zero to a baseline inside the plot, and position bars relative to that zero line (so decreases below zero hang beneath it). Draw a horizontal zero axis for reference, as financial waterfalls do.` },
      { q: 'Why animate scaleY instead of the bar height?', a: `\`transform: scaleY\` with a bottom origin runs on the GPU and, importantly for this site's framework exports, Tailwind's \`transition\`/\`animate\` utilities handle transforms cleanly while raw \`height\` animation does not convert reliably. The bar's final height is set inline; the keyframe just scales it up from the baseline.` },
      { q: 'How do I make the waterfall accessible?', a: `The bars are decorative, so provide the data as text: each bar is labelled with its value, and you should add an \`aria-label\` per bar summarising it ("Refunds: −300, running total 2,150"). Offer an off-screen data table of label/change/running-total for screen-reader users, and give the chart container a \`role="img"\` with a descriptive label.` },
      { q: 'How do I use this waterfall chart in React, Vue, or Angular?', a: `In React, compute the bars with \`useMemo\` from your data array (running total, start/end, scale) and render them as positioned \`<div>\`s with inline styles — no manual DOM building. In Vue, use a \`computed\` that returns the bar models and \`v-for\`. In Angular, compute in the component and \`*ngFor\`. The scaleY keyframe and connector CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to walk through how build() tracks the running cum total across the DATA array to decide each bar's start and end level, and specifically how a null value on the final "total" row lets it auto-compute the net from the accumulated steps instead of you hardcoding it. It's worth pressure-testing the current scale logic too — ask what would need to change if a running total ever dipped negative, since the code as written assumes every level stays at or above zero. For extending the chart, ask for a variant that supports negative running totals with a proper zero baseline, animated re-ordering when you drag a step to a new position, or a way to export the rendered bars as an accessible data table alongside the visual for screen-reader users. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a financial waterfall (bridge) chart in plain HTML, CSS, and JavaScript — floating bars that show how a starting value becomes an ending value through a sequence of increases and decreases — no SVG, no charting library.

Requirements:
- Accept a data array where each entry is typed either "total" (an anchor column, drawn full-height from zero) or "step" (a signed change that floats between the previous running total and the new one); allow the final total entry's value to be null so its value auto-computes as the accumulated net of all the steps.
- Walk the data array once, tracking a running cumulative total, and for every entry record its start level, end level, and the overall maximum level seen, which becomes the basis for the chart's vertical scale (with some headroom so the tallest bar doesn't touch the top).
- Position every bar absolutely using percentages for both horizontal placement (evenly divided columns) and vertical placement (bottom offset and height derived from the lower and higher of its start/end levels times the computed scale) — no bar's geometry should be hardcoded in pixels.
- Color-code bars into three categories: total columns in one color, positive steps in a second color, and negative steps in a third, and label each bar with its total value or its signed change (with a leading plus or minus sign).
- Draw a dotted horizontal connector between each pair of adjacent bars at the exact level where one bar's end matches the next bar's start, so the sequence reads as one continuous bridge rather than disconnected columns.
- Animate every bar growing in from the baseline using a CSS transform: scaleY transition with the transform-origin set to the bottom, staggered per bar with an increasing delay, and provide a replay control that rebuilds the chart to re-trigger the animation.`,
    },
  },
};

export default waterfallChart;
