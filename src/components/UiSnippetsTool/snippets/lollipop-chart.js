const lollipopChart = {
  id: 'lollipop-chart',
  title: 'Lollipop Chart',
  lastmod: '2026-07-18',
  category: 'charts',
  html: `<div class="lp-card">
  <div class="lp-head"><h3>Feature requests</h3><button type="button" class="lp-sort" id="lpSort">Sort: votes ↓</button></div>
  <div class="lp-rows" id="lpRows"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;padding:32px 18px}

.lp-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:18px;width:100%;max-width:440px}
.lp-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.lp-head h3{font-size:15px;font-weight:800;color:#f1f5f9}
.lp-sort{background:#0f172a;border:1px solid #334155;color:#cbd5e1;border-radius:8px;padding:5px 10px;font-size:11.5px;font-weight:700;cursor:pointer;font-family:inherit}
.lp-sort:hover{border-color:#6366f1;color:#a5b4fc}

.lp-rows{display:flex;flex-direction:column;gap:13px}
.lp-row{display:grid;grid-template-columns:96px 1fr 34px;align-items:center;gap:10px}
.lp-name{font-size:12.5px;font-weight:600;color:#cbd5e1;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lp-track{position:relative;height:18px}
.lp-stem{position:absolute;left:0;top:50%;height:2px;background:#475569;transform:translateY(-50%);width:0;transition:width .6s cubic-bezier(.22,1,.36,1)}
.lp-dot{position:absolute;top:50%;width:14px;height:14px;border-radius:50%;border:2px solid #1e293b;transform:translate(-50%,-50%) scale(0);transition:left .6s cubic-bezier(.22,1,.36,1),transform .3s .2s,filter .12s;cursor:pointer}
.lp-dot:hover{filter:brightness(1.25)}
.lp-val{font-size:12px;font-weight:800;color:#e2e8f0;text-align:left;font-variant-numeric:tabular-nums}`,

  js: `var DATA = [
  { name:'Dark mode', value:312, color:'#6366f1' },
  { name:'API access', value:198, color:'#22d3ee' },
  { name:'Mobile app', value:264, color:'#f59e0b' },
  { name:'SSO login', value:142, color:'#34d399' },
  { name:'Webhooks', value:176, color:'#f472b6' },
  { name:'Exports', value:88, color:'#a855f7' }
];
var rows = document.getElementById('lpRows');
var desc = true;

function render() {
  var sorted = DATA.slice().sort(function (a, b) { return desc ? b.value - a.value : a.value - b.value; });
  var max = Math.max.apply(null, DATA.map(function (d) { return d.value; }));
  rows.innerHTML = '';
  sorted.forEach(function (d) {
    var row = document.createElement('div');
    row.className = 'lp-row';
    row.innerHTML = '<div class="lp-name" title="' + d.name + '">' + d.name + '</div>' +
      '<div class="lp-track"><div class="lp-stem"></div><div class="lp-dot" style="background:' + d.color + '"></div></div>' +
      '<div class="lp-val">' + d.value + '</div>';
    var stem = row.querySelector('.lp-stem'), dot = row.querySelector('.lp-dot');
    dot.title = d.name + ': ' + d.value + ' votes';
    rows.appendChild(row);
    var pct = d.value / max * 100;
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      stem.style.width = pct + '%';
      dot.style.left = pct + '%';
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
    }); });
  });
}

document.getElementById('lpSort').addEventListener('click', function () {
  desc = !desc;
  this.textContent = 'Sort: votes ' + (desc ? '↓' : '↑');
  render();
});
render();`,

  seo: {
    title: 'Lollipop Chart — Stem-and-Dot Bar Alternative',
    description: `A lollipop chart: a cleaner bar-chart alternative with thin stems and value dots, animated and sortable. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Lollipop Chart — Animated, Sortable Stem-and-Dot Chart',
      description: `A lollipop chart is a lighter alternative to a bar chart: instead of a heavy filled bar, each value is a thin stem ending in a dot. With less ink per item it reads cleanly when you have many categories — feature votes, survey results, rankings. This snippet builds a horizontal lollipop chart with animated stems, sorting, and tooltips, in plain HTML, CSS, and vanilla JavaScript.

**Stem and dot from one value**

Each row is a CSS grid of three columns: the label, the track, and the value. Inside the track, a thin \`.lp-stem\` grows from the left to a width proportional to the value, and a \`.lp-dot\` is positioned at that same percentage — so the stem's end and the dot always coincide. Driving both from one percentage (\`value / max\`) keeps them locked together and makes the chart responsive with no pixel math.

**Why lollipops over bars**

When a bar chart has many categories, the solid bars create a dense block of colour that's tiring to scan and exaggerates small differences. Lollipops keep the same positional encoding — length still means value — while reducing visual weight to a line and a point, so a long list stays airy and the dots give a precise read of where each value lands. It's the same data, less ink.

**Animated draw-on**

On render the stems grow and the dots pop in (a scale transition with a slight delay) from zero, which animates the chart into place and draws the eye along each value. Re-rendering on sort replays the animation, reinforcing the reordering.

**Sortable**

A toggle re-sorts the rows ascending or descending by value, re-rendering with the animation so the change is easy to follow. Sorting a ranking chart is the most common interaction, and here it's a one-line comparator flip over a copy of the data (the source order is preserved).

**Tooltips and data-driven setup**

Each dot carries a native \`title\` with its label and value for an instant tooltip, and the whole chart derives from a \`{ name, value, color }\` array — add or change items by editing data. With no SVG and no library, it's a compact, readable reference for the lollipop-chart pattern when a bar chart feels too heavy.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A lollipop chart renders with animated stems and dots.` },
      { title: 'Use your data', text: `Edit DATA — each item is { name, value, color }.` },
      { title: 'Sort', text: `Click the sort toggle to reorder ascending or descending.` },
      { title: 'Hover a dot', text: `A native tooltip shows the label and value.` },
      { title: 'Read the values', text: `Dot position along the track encodes each value.` },
      { title: 'Restyle', text: `Change dot size, stem color, or row spacing.` },
    ] },
    features: [
      { title: 'Stem-and-dot', text: `A thin line and a point replace a heavy bar.` },
      { title: 'Locked geometry', text: `Stem end and dot share one percentage position.` },
      { title: 'Less ink', text: `Stays airy and scannable with many categories.` },
      { title: 'Draw-on animation', text: `Stems grow and dots pop in from zero.` },
      { title: 'Sortable', text: `Toggle ascending/descending with replayed animation.` },
      { title: 'Native tooltips', text: `Each dot has a title with label and value.` },
      { title: 'Responsive', text: `Percentage widths — no coordinate math.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no chart dependency.` },
    ],
    useCases: [
      { title: 'Feature request voting', text: 'Rank requests in a [poll widget](/ui-snippets/poll-widget/) style list where stems and dots keep many options scannable, with a sort control to reorder them.' },
      { title: 'Survey results with many options', text: 'Show responses cleanly when a bar chart would feel heavy. With less ink per item, twenty categories stay airy and readable.' },
      { title: 'Rankings and top lists', text: 'Offer a lighter take than a [horizontal bar chart](/ui-snippets/horizontal-bar-chart/), with stems that grow and dots that pop in from zero.' },
      { title: 'Category comparisons', text: 'Compare values across many labels, where the dot gives a precise read and the thin stem guides the eye along each row.' },
      { title: 'KPI snapshots', text: 'Place precise dot readings next to a [metric card grid](/ui-snippets/metric-card-grid/), since the stem end and the dot share one percentage position.' },
      { icon: 'CODE', title: 'Related: Sankey Diagram', desc: 'See the [Sankey Diagram](/ui-snippets/sankey-diagram/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'When should I use a lollipop chart instead of bars?', a: `When you have many categories and the solid mass of a bar chart becomes hard to scan or visually overstates differences. A lollipop keeps the same length-equals-value encoding but reduces each item to a line and a dot, so a long list stays light and the dots give a precise endpoint to compare. For a few large values, a bar chart is often fine; for many items, lollipops read better.` },
      { q: 'How do the stem and dot stay aligned?', a: `Both are positioned from one number: value divided by the maximum, as a percentage. The stem's width is that percentage and the dot's left offset is the same percentage, so the dot always sits exactly at the end of the stem. Because it is a percentage of the track, everything scales fluidly when the container resizes.` },
      { q: 'How does sorting work?', a: `The sort toggle flips a descending flag and re-renders. Rendering sorts a copy of the data with a comparator (descending or ascending by value), so the original order is preserved and you can always toggle back. The draw-on animation replays on each sort, which makes the reordering easy to follow visually.` },
      { q: 'Can I show value labels instead of tooltips?', a: `Yes — the value already renders in the third grid column, so each row shows its number. The dot's native title adds an on-hover tooltip on top. If you prefer a label that floats next to the dot, you can position a small text element at the same percentage as the dot using the same value/max calculation.` },
      { q: 'How do I use this lollipop chart in React, Vue, or Angular?', a: `Map your data to rows and set the stem width and dot offset from value/max as inline styles. Hold the sort direction in state and sort a copy in render; trigger the draw-on animation with a mounted effect or a class toggled after render. Tailwind users apply the grid and positioning with utilities; the value/max math stays in a small helper.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to trace the double requestAnimationFrame call by guessing. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why render() wraps the stem-width and dot-position assignment in two nested requestAnimationFrame calls instead of one, and how that relates to the stem and dot both being driven from the same value-over-max percentage. The same assistant can help optimize it, for instance asking whether rebuilding rows.innerHTML from scratch on every sort toggle could be replaced with reordering existing DOM nodes via a FLIP animation for a smoother re-sort with many rows. It is also useful for extending the chart: ask it to add a secondary comparison lollipop per row for before/after values, support clicking a dot to filter or drill into that category, or add keyboard-navigable focus states to the dots for accessibility. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a sortable "lollipop chart" in plain HTML, CSS, and JavaScript with no SVG and no charting library.

Requirements:
- Accept an array of category objects, each with a name, a numeric value, and a color, and render one row per category as a CSS grid with three columns: a right-aligned truncated label, a track area, and a left-aligned value.
- Inside each row's track, render a thin horizontal stem element and a circular dot element, both positioned using the exact same percentage (that category's value divided by the maximum value across all categories) — the stem's width and the dot's left offset must be driven from one shared calculation so they always end at the same point.
- On every render, the stem must start at zero width and the dot must start scaled to zero, then animate to their final width/position/scale using a CSS transition, triggered via a nested double requestAnimationFrame so the browser reliably commits the zero-state before the transition to the final state begins.
- A sort toggle button must flip between descending and ascending order by value, re-rendering all rows from a sorted copy of the original data (never mutating the source array), and replaying the draw-on animation each time it is clicked.
- Each dot must expose its category name and value through a native title attribute so hovering it shows a tooltip with no custom tooltip markup required.
- The chart must remain fully responsive by using percentage-based widths and positions for the stem and dot, with no fixed pixel coordinate math anywhere in the row layout.`,
    },
  },
};

export default lollipopChart;
