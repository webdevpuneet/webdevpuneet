const dumbbellChart = {
  id: 'dumbbell-chart',
  title: 'Dumbbell Chart',
  lastmod: '2026-07-18',
  category: 'charts',
  html: `<div class="db-card">
  <div class="db-head">
    <h3>2020 vs 2024</h3>
    <div class="db-legend">
      <span><i class="db-sw" style="background:#94a3b8"></i>2020</span>
      <span><i class="db-sw" style="background:#6366f1"></i>2024</span>
    </div>
  </div>
  <div class="db-rows" id="dbRows"></div>
  <div class="db-axis"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;padding:30px 18px}

.db-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:18px;width:100%;max-width:460px}
.db-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.db-head h3{font-size:15px;font-weight:800;color:#f1f5f9}
.db-legend{display:flex;gap:14px;font-size:11.5px;font-weight:600;color:#cbd5e1}
.db-legend span{display:flex;align-items:center;gap:5px}
.db-sw{width:10px;height:10px;border-radius:50%}

.db-rows{display:flex;flex-direction:column;gap:15px}
.db-row{display:grid;grid-template-columns:74px 1fr;align-items:center;gap:12px}
.db-name{font-size:12px;font-weight:600;color:#cbd5e1;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.db-track{position:relative;height:16px}
.db-bar{position:absolute;top:50%;height:3px;border-radius:2px;background:#475569;transform:translateY(-50%);left:0;width:0;transition:left .7s cubic-bezier(.22,1,.36,1),width .7s cubic-bezier(.22,1,.36,1)}
.db-dot{position:absolute;top:50%;width:14px;height:14px;border-radius:50%;border:2px solid #1e293b;transform:translate(-50%,-50%) scale(0);transition:left .7s cubic-bezier(.22,1,.36,1),transform .3s .25s,filter .12s;cursor:pointer}
.db-dot:hover{filter:brightness(1.3)}
.db-dot.a{background:#94a3b8;z-index:2}
.db-dot.b{background:#6366f1;z-index:3}

.db-axis{display:flex;justify-content:space-between;margin:14px 0 0 86px;font-size:10.5px;color:#64748b;font-variant-numeric:tabular-nums}`,

  js: `var DATA = [
  { name: 'Engineering', a: 32, b: 78 },
  { name: 'Design',      a: 48, b: 64 },
  { name: 'Sales',       a: 70, b: 55 },
  { name: 'Support',     a: 24, b: 61 },
  { name: 'Marketing',   a: 40, b: 88 }
];
var MAX = 100;
var rows = document.getElementById('dbRows');

function pos(v) { return (v / MAX) * 100; }

DATA.forEach(function (d) {
  var lo = Math.min(d.a, d.b), hi = Math.max(d.a, d.b);
  var row = document.createElement('div');
  row.className = 'db-row';
  row.innerHTML =
    '<div class="db-name" title="' + d.name + '">' + d.name + '</div>' +
    '<div class="db-track">' +
      '<div class="db-bar"></div>' +
      '<div class="db-dot a" title="2020: ' + d.a + '"></div>' +
      '<div class="db-dot b" title="2024: ' + d.b + '"></div>' +
    '</div>';
  rows.appendChild(row);

  var bar = row.querySelector('.db-bar');
  var dotA = row.querySelector('.db-dot.a');
  var dotB = row.querySelector('.db-dot.b');

  // The connector bar spans between the two values; dots sit at each.
  requestAnimationFrame(function () { requestAnimationFrame(function () {
    bar.style.left = pos(lo) + '%';
    bar.style.width = (pos(hi) - pos(lo)) + '%';
    dotA.style.left = pos(d.a) + '%';
    dotB.style.left = pos(d.b) + '%';
    dotA.style.transform = 'translate(-50%,-50%) scale(1)';
    dotB.style.transform = 'translate(-50%,-50%) scale(1)';
  }); });
});`,

  seo: {
    title: 'Dumbbell Chart — Free Before After Comparison JS Snippet',
    description: `A dumbbell chart comparing two values per category with connected dots and an animated draw-on. Copy-paste or export to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Dumbbell Chart — Two-Point Before / After Comparison',
      description: `A dumbbell chart (also called a DNA or connected-dot plot) compares two values for each category — before and after, two years, two groups — by placing a dot for each on a shared axis and joining them with a line. The length and direction of the connector make the change between the two points obvious at a glance, which is exactly what a side-by-side pair of bars hides. This snippet builds one in plain HTML, CSS, and vanilla JavaScript, no SVG and no charting library.

**Two dots and a connector from three numbers**

Each row is a CSS grid of a label and a track. Inside the track sit a thin connector \`.db-bar\` and two \`.db-dot\`s. The dots are absolutely positioned at \`value / max * 100%\`, and the connector is positioned at the *lower* of the two values with a width equal to the gap between them — \`left: pos(lo)\`, \`width: pos(hi) - pos(lo)\`. That single calculation draws the bar exactly between the points regardless of which value is larger.

**Encoding the change, not just the values**

The reason to choose a dumbbell over grouped bars is that the eye reads the *distance and direction* between the two dots as the change itself. A wide gap means a big shift; the side the higher dot sits on tells you whether it grew or shrank. With grouped bars you'd have to mentally subtract two heights for every category — here the connector does that subtraction visually.

**Animated draw-on with the double-rAF trick**

On load the connector grows and the dots scale in from zero. Because elements start at their initial state, the code waits two \`requestAnimationFrame\`s before setting the final positions, guaranteeing the browser has committed the starting styles so the CSS \`transition\` actually runs instead of snapping. The dots use a slightly delayed scale so they pop in after the bar settles.

**Layering and hit targets**

The two dots overlap when values are close, so \`z-index\` keeps the "after" dot (b) above the "before" dot (a), and each carries a native \`title\` tooltip with its exact value. A \`:hover\` brightness bump gives feedback without extra JavaScript.

**Data-driven and easy to extend**

The chart derives entirely from a \`{ name, a, b }\` array and a \`MAX\` for the axis, so adding categories or swapping the two series is an edit to data. Re-label the legend and axis to fit your comparison — survey waves, A/B test arms, regional figures — and the rendering logic stays identical.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dumbbell chart renders with a legend and a value axis.` },
      { title: 'Watch the draw-on', text: `Connectors grow and dots scale in from zero on load.` },
      { title: 'Read the gaps', text: `The distance between paired dots shows the change per category.` },
      { title: 'Hover a dot', text: `A tooltip shows the exact value and the dot brightens.` },
      { title: 'Edit the data', text: `Change the { name, a, b } array to plot your own pairs.` },
      { title: 'Relabel for your case', text: `Update the legend and axis for years, groups, or test arms.` },
    ] },
    features: [
      { title: 'Two-point comparison', text: `A dot per series with a connector showing the gap.` },
      { title: 'Direction-aware bar', text: `Connector spans from the lower to the higher value automatically.` },
      { title: 'Animated draw-on', text: `Double-rAF guarantees the transition runs, not snaps.` },
      { title: 'Overlap handling', text: `z-index keeps the after dot above the before dot.` },
      { title: 'Native tooltips', text: `Each dot shows its exact value on hover.` },
      { title: 'CSS-only positioning', text: `Percent-based layout, no SVG or canvas.` },
      { title: 'Data-driven', text: `Built from a { name, a, b } array and one MAX.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS — no charting library.` },
    ],
    useCases: [
      { title: 'Before / after metrics', text: `Show change over time more clearly than a [grouped bar chart](/ui-snippets/grouped-bar-chart/).` },
      { title: 'Survey wave comparison', text: `Plot two periods next to a [rating breakdown](/ui-snippets/rating-breakdown/).` },
      { title: 'A/B test results', text: `Compare arms beside a [bullet chart](/ui-snippets/bullet-chart/) of targets.` },
      { title: 'Ranking shifts', text: `Pair with a [bump chart](/ui-snippets/bump-chart/) for rank-over-time.` },
      { title: 'Regional figures', text: `Contrast two markets alongside a [slope chart](/ui-snippets/slope-chart/).` },
      { title: 'Learning chart design', text: `A reference for connected-dot comparison plots.` },
      { icon: 'CODE', title: 'Related: Polar Area Chart', desc: 'See the [Polar Area Chart](/ui-snippets/polar-area-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'When should I use a dumbbell chart instead of grouped bars?', a: `Use it when the story is the change between two values per category. A dumbbell encodes that change as the distance and direction between two dots, so the eye reads it directly. Grouped bars force the viewer to compare two heights and subtract them mentally for every category, which is slower and easy to misjudge.` },
      { q: 'How is the connecting line positioned between the dots?', a: `The connector is set with left: pos(lo) and width: pos(hi) - pos(lo), where lo and hi are the smaller and larger of the two values. Computing the span from the min and max means the bar always reaches exactly from one dot to the other, no matter which value is higher.` },
      { q: 'Why does it use two requestAnimationFrame calls?', a: `Elements start at their initial CSS state, and a transition only runs if the browser has committed that starting state before the new values are applied. Waiting two animation frames guarantees the start styles are painted first, so setting the final left and width animates smoothly instead of jumping straight to the end.` },
      { q: 'What happens when the two values are nearly equal?', a: `The dots overlap, so z-index keeps the after dot (b) layered above the before dot (a) and the connector shrinks to a short stub. Each dot still carries its own title tooltip, so you can hover to read both exact values even when they sit on top of each other.` },
      { q: 'How do I use this dumbbell chart in React, Vue, or Angular?', a: `Map your data array to rows in the template and compute each dot's left and the connector's left/width as percentages of the max. Trigger the draw-on by setting the final positions in a mount effect (useEffect, onMounted, ngAfterViewInit). In Tailwind, position the dots and bar with inline percentage styles and use utilities for colors and spacing.` },
    ],
    aiPrompt: {
      paragraph: `Instead of working out the positioning formula in your head, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the connector bar's left and width are derived from Math.min and Math.max of the two values rather than always from a to b, and why the code waits for two nested requestAnimationFrame calls before setting the final left/width/scale values on the bar and dots. The same assistant can help optimize it, for instance checking whether rebuilding every row's innerHTML from scratch on each data update is necessary or whether only the bar and dot positions need to change for a live-updating dashboard. It's also useful for extending the chart: ask it to add a third comparison point per row (three dots instead of two), sort rows by the size of the gap to surface the biggest movers first, or add a text label showing the numeric delta next to each connector. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a dumbbell (connected dot) comparison chart in plain HTML, CSS, and JavaScript with no SVG and no charting library.

Requirements:
- Render one row per category from a data array of objects each containing a name and two numeric values, using a CSS grid layout with a label column and a track column.
- Inside each row's track, create one thin connector element and two circular dot elements, all absolutely positioned as percentages of a shared maximum value, not pixels, so the layout is responsive to any container width.
- Compute the connector's position and width from the smaller and larger of the two values (not simply the first and second value in that order), so the bar always spans correctly regardless of which of the two values happens to be greater for a given row.
- On load, animate every row's connector growing from zero width and both dots scaling in from zero, but only after two nested requestAnimationFrame calls have elapsed following the initial DOM insertion, so the browser has committed the starting (invisible/zero-width) state before the CSS transition to the final state begins.
- Give the two dots different colors and use z-index to guarantee the second value's dot always renders above the first value's dot when they overlap or are very close together, and give each dot a native title attribute showing its exact value on hover.
- Include a legend identifying which color represents which of the two compared periods or groups, and a shared numeric axis below the rows showing evenly spaced value labels from 0 to the maximum.`,
    },
  },
};

export default dumbbellChart;
