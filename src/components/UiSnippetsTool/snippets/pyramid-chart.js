const pyramidChart = {
  id: 'pyramid-chart',
  title: 'Population Pyramid',
  lastmod: '2026-07-18',
  category: 'charts',
  html: `<div class="py-card">
  <div class="py-head"><h3>Users by age</h3><div class="py-legend"><span class="py-l py-l-a">Male</span><span class="py-l py-l-b">Female</span></div></div>
  <div class="py-axis"><span>← count</span><span>count →</span></div>
  <div class="py-rows" id="pyRows"></div>
  <div class="py-tip" id="pyTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;padding:32px 18px}

.py-card{position:relative;background:#1e293b;border:1px solid #334155;border-radius:16px;padding:18px;width:100%;max-width:440px}
.py-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
.py-head h3{font-size:15px;font-weight:800;color:#f1f5f9}
.py-legend{display:flex;gap:12px}
.py-l{font-size:11.5px;font-weight:700;display:flex;align-items:center;gap:5px}
.py-l::before{content:'';width:10px;height:10px;border-radius:3px}
.py-l-a{color:#818cf8}.py-l-a::before{background:#6366f1}
.py-l-b{color:#f0abfc}.py-l-b::before{background:#d946ef}

.py-axis{display:flex;justify-content:space-between;font-size:10px;color:#64748b;padding:0 70px;margin-bottom:6px}
.py-rows{display:flex;flex-direction:column;gap:6px}
.py-row{display:grid;grid-template-columns:1fr 56px 1fr;align-items:center;gap:6px}
.py-side{display:flex;height:20px}
.py-left{justify-content:flex-end}
.py-bar{height:100%;border-radius:4px;transition:width .6s cubic-bezier(.22,1,.36,1);cursor:pointer}
.py-bar:hover{filter:brightness(1.2)}
.py-a{background:#6366f1}.py-b{background:#d946ef}
.py-age{text-align:center;font-size:11px;font-weight:700;color:#94a3b8}

.py-tip{position:absolute;transform:translate(-50%,-100%);background:#0b1120;border:1px solid #334155;border-radius:8px;padding:6px 10px;font-size:11.5px;color:#f1f5f9;pointer-events:none;white-space:nowrap;z-index:5}`,

  js: `var DATA = [
  { age:'65+', a:4, b:6 },
  { age:'55-64', a:9, b:11 },
  { age:'45-54', a:14, b:15 },
  { age:'35-44', a:22, b:20 },
  { age:'25-34', a:28, b:26 },
  { age:'18-24', a:18, b:21 }
];
var rows = document.getElementById('pyRows');
var tip = document.getElementById('pyTip');
var card = document.querySelector('.py-card');
var max = 0;
DATA.forEach(function (d) { max = Math.max(max, d.a, d.b); });

DATA.forEach(function (d) {
  var row = document.createElement('div');
  row.className = 'py-row';
  row.innerHTML =
    '<div class="py-side py-left"><div class="py-bar py-a" style="width:0%"></div></div>' +
    '<div class="py-age">' + d.age + '</div>' +
    '<div class="py-side"><div class="py-bar py-b" style="width:0%"></div></div>';
  var left = row.querySelector('.py-a'), right = row.querySelector('.py-b');
  left.addEventListener('mouseenter', function (e) { showTip(e, d.age + ' · Male: ' + d.a + '%'); });
  right.addEventListener('mouseenter', function (e) { showTip(e, d.age + ' · Female: ' + d.b + '%'); });
  [left, right].forEach(function (b) { b.addEventListener('mousemove', moveTip); b.addEventListener('mouseleave', function () { tip.hidden = true; }); });
  rows.appendChild(row);
  requestAnimationFrame(function () { requestAnimationFrame(function () {
    left.style.width = (d.a / max * 100) + '%';
    right.style.width = (d.b / max * 100) + '%';
  }); });
});

function showTip(e, text) { tip.textContent = text; tip.hidden = false; moveTip(e); }
function moveTip(e) { var r = card.getBoundingClientRect(); tip.style.left = (e.clientX - r.left) + 'px'; tip.style.top = (e.clientY - r.top - 10) + 'px'; }`,

  seo: {
    title: 'Population Pyramid — Back-to-Back Bar Chart',
    description: `A population pyramid: a back-to-back bar chart comparing two groups across categories, mirrored around a center axis. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Population Pyramid — Mirrored Back-to-Back Bars Around a Center Axis',
      description: `A population pyramid is a back-to-back bar chart: two groups (classically male and female by age) grow outward from a shared centre axis, so you compare their distributions side by side. It's the right chart for any two-cohort comparison across ordered categories — age bands, before/after, two segments. This snippet builds one in pure HTML and CSS, with animated mirrored bars and tooltips, in plain HTML, CSS, and vanilla JavaScript.

**A three-column grid per row**

Each age band is a CSS grid row of three columns: left bars, the centre age label, and right bars. The left side aligns its bar to the **right** edge (\`justify-content: flex-end\`) so it grows leftward toward the centre, and the right side grows rightward — producing the mirrored, spine-aligned look without any negative positioning or transforms. The centre label column keeps both sides anchored to a consistent axis.

**Shared scale, fair comparison**

Both groups share one maximum (the largest value across either side), so a bar of a given length means the same count on the left and the right. This shared scale is essential — mirroring two differently-scaled axes would make the comparison misleading. Bar widths are simple percentages of that max, so the chart is responsive with no pixel math.

**Animated outward growth**

Bars start at zero width and animate outward from the spine on load via a CSS transition triggered next frame, which makes the pyramid "open up" and naturally draws the eye from the centre out — fitting the chart's symmetry. A brightness lift on hover gives per-bar feedback.

**Tooltips and legend**

Hovering either side shows a tooltip with the category, group, and value, following the cursor; a two-swatch legend names the groups. Because the two sides use distinct colours and a clear axis, the chart stays readable even with many bands.

**Data-driven and dependency-free**

Data is an array of \`{ category, a, b }\`, so changing the bands or values is a data edit and everything else follows. With no SVG and no library, it's a clean, lightweight reference for the population-pyramid / back-to-back bar pattern, useful well beyond demographics.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A population pyramid renders with two groups across age bands.` },
      { title: 'Use your data', text: `Edit DATA — each row is { age, a, b } for the two groups.` },
      { title: 'Watch it open', text: `Bars animate outward from the center axis on load.` },
      { title: 'Hover a bar', text: `A tooltip shows the band, group, and value.` },
      { title: 'Relabel the groups', text: `Change the legend and colors for any two cohorts.` },
      { title: 'Reorder bands', text: `List categories top-to-bottom in the order you want.` },
    ] },
    features: [
      { title: 'Back-to-back bars', text: `Two groups mirror outward from a shared center.` },
      { title: 'Grid spine alignment', text: `A three-column grid keeps both sides on one axis.` },
      { title: 'Shared scale', text: `One max for both sides so lengths are comparable.` },
      { title: 'Percentage widths', text: `Responsive bars with no coordinate math.` },
      { title: 'Outward animation', text: `Bars grow from the spine on load.` },
      { title: 'Hover tooltips', text: `Cursor-following tip with band, group, and value.` },
      { title: 'Two-color legend', text: `Clear group encoding for either side.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no chart dependency.` },
    ],
    useCases: [
      { title: 'Population and demographics', text: 'Show age and gender distributions side by side in an analytics dashboard. Both sides use one maximum, so bar lengths are directly comparable.' },
      { title: 'Before and after comparisons', text: 'Compare two states across the same categories, such as last year and this year, by mirroring them around a centre axis instead of using two charts.' },
      { title: 'User segment comparison', text: 'Compare two segments, for example free and paid users, across the same metrics. A three-column grid keeps both sides aligned to a single spine.' },
      { title: 'Survey responses by group', text: 'Compare how two groups answered each question, with percentage widths making the bars responsive without any coordinate maths.' },
      { title: 'Win and loss by category', text: 'Mirror two outcomes across buckets, such as deals won versus lost by region, and use a plain [bar chart](/ui-snippets/bar-chart/) when you only have one series.' },
      { icon: 'CODE', title: 'Related: Stacked Area Chart', desc: 'See the [Stacked Area Chart](/ui-snippets/stacked-area-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the bars mirrored around the center?', a: `Each row is a three-column CSS grid: left bars, the center label, and right bars. The left column right-aligns its bar so it grows toward the center, and the right column left-aligns so it grows away — both meeting at the label column. This produces the spine-aligned, mirrored look using normal layout, with no negative margins or transforms.` },
      { q: 'Why must both sides share one scale?', a: `So that equal bar lengths mean equal values on both sides. If each side scaled to its own maximum, a left bar and a right bar of the same length could represent very different counts, making the comparison misleading. The snippet takes the maximum across both groups and sizes every bar as a percentage of it, keeping the two halves honest.` },
      { q: 'Can I use it for non-demographic data?', a: `Absolutely. A population pyramid is just a back-to-back bar chart, so any two-group comparison across ordered categories works: before vs after, two segments, two products, win vs loss by stage. Rename the legend, recolor the two sides, and provide your categories — the layout and scaling are unchanged.` },
      { q: 'How do I change the order of the bands?', a: `The bands render top-to-bottom in the order of the DATA array, so reorder the array to reorder the rows. Population pyramids conventionally put the oldest band at the top and youngest at the bottom, but you can use any ordered sequence that suits your categories.` },
      { q: 'How do I use this pyramid in React, Vue, or Angular?', a: `Map DATA to grid rows in JSX/templates and set each bar's width from value/max as an inline style. Trigger the outward animation with a mounted effect or a class toggled after render, and track hover state for the tooltip. Tailwind users apply the grid, alignment, and widths with utilities; the shared-scale calculation stays in a small helper.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to puzzle out the mirrored grid alignment on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the three-column grid combined with justify-content flex-end on the left side produces the spine-aligned mirror effect without any transforms or negative margins, and why both sides must be scaled against one shared max instead of their own maximums. The same assistant can help you optimize it — for instance checking whether recomputing max and re-animating every bar is wasteful when only one row's data changes, or whether the tooltip's mousemove listener needs throttling for very tall pyramids with dozens of rows. It is also useful for extending the chart: ask it to add a third comparison group, sortable rows by total, a brush to filter the visible age range, or CSV import for the DATA array. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a population pyramid (back-to-back bar chart) in plain HTML, CSS, and JavaScript using only CSS grid — no SVG, no canvas, no charting library.

Requirements:
- Each category row is a CSS grid with three columns: a left bar column, a centered category label column, and a right bar column.
- The left column must right-align its bar (so it grows toward the center) and the right column must left-align its bar (so it grows away from the center), both meeting at the shared label column, using only justify-content — no negative margins or transform-based positioning.
- Compute a single shared maximum across both groups' values (not a separate maximum per side), and size every bar's width as a percentage of that one shared maximum so bar lengths are directly comparable between the two sides.
- On load, bars must start at 0% width and animate outward to their final percentage via a CSS width transition triggered on the next animation frame (not immediately, so the transition actually plays).
- Add a two-swatch legend labeling the two groups with matching colors, and a hover tooltip that follows the cursor and shows the category name, the group name, and the exact value when hovering either bar.
- Keep the whole thing data-driven from a single array of objects (one per category, with a value for each of the two groups) so adding or reordering categories requires no changes to the rendering logic.`,
    },
  },
};

export default pyramidChart;
