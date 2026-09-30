const horizontalBarChart = {
  id: 'horizontal-bar-chart',
  title: 'Horizontal Bar Chart',
  lastmod: '2026-06-23',
  category: 'charts',
  html: `<div class="hbc-card">
  <div class="hbc-head">
    <h3>Top countries by users</h3>
    <div class="hbc-sort">
      <button type="button" id="hbcSort" class="hbc-btn">Sort: High → Low</button>
    </div>
  </div>
  <div class="hbc-rows" id="hbcRows"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.hbc-card{background:#fff;border-radius:16px;padding:22px;width:100%;max-width:460px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.hbc-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.hbc-head h3{font-size:16px;font-weight:800;color:#0f172a}
.hbc-btn{background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;padding:6px 11px;font-size:12px;font-weight:700;color:#475569;cursor:pointer;font-family:inherit;transition:background .15s}
.hbc-btn:hover{background:#e2e8f0}

.hbc-rows{display:flex;flex-direction:column;gap:13px}
.hbc-row{display:grid;grid-template-columns:96px 1fr auto;align-items:center;gap:11px}
.hbc-label{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:600;color:#334155;white-space:nowrap}
.hbc-flag{font-size:16px}
.hbc-track{height:22px;background:#f1f5f9;border-radius:7px;overflow:hidden}
.hbc-fill{height:100%;border-radius:7px;width:0;transition:width .7s cubic-bezier(.22,1,.36,1)}
.hbc-val{font-size:13px;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums;min-width:46px;text-align:right}`,

  js: `var DATA = [
  { label: 'United States', flag: '🇺🇸', value: 8420, color: '#6366f1' },
  { label: 'India',         flag: '🇮🇳', value: 6310, color: '#22c55e' },
  { label: 'Germany',       flag: '🇩🇪', value: 3120, color: '#f59e0b' },
  { label: 'Brazil',        flag: '🇧🇷', value: 2740, color: '#ec4899' },
  { label: 'Japan',         flag: '🇯🇵', value: 1980, color: '#0ea5e9' },
  { label: 'Canada',        flag: '🇨🇦', value: 1450, color: '#14b8a6' },
];

var rows = document.getElementById('hbcRows');
var sortBtn = document.getElementById('hbcSort');
var desc = true;

function render() {
  var list = DATA.slice().sort(function (a, b) { return desc ? b.value - a.value : a.value - b.value; });
  var max = Math.max.apply(null, DATA.map(function (d) { return d.value; }));
  rows.innerHTML = list.map(function (d) {
    return '<div class="hbc-row">' +
      '<span class="hbc-label"><span class="hbc-flag">' + d.flag + '</span>' + d.label + '</span>' +
      '<div class="hbc-track"><div class="hbc-fill" style="background:' + d.color + '" data-w="' + (d.value / max * 100) + '"></div></div>' +
      '<span class="hbc-val">' + d.value.toLocaleString() + '</span>' +
    '</div>';
  }).join('');
  // Animate widths on the next frame so the transition runs from 0.
  requestAnimationFrame(function () {
    rows.querySelectorAll('.hbc-fill').forEach(function (el) { el.style.width = el.dataset.w + '%'; });
  });
}

sortBtn.addEventListener('click', function () {
  desc = !desc;
  sortBtn.textContent = 'Sort: ' + (desc ? 'High → Low' : 'Low → High');
  render();
});

render();`,

  seo: {
    title: 'Horizontal Bar Chart — HTML CSS JS Ranking Bars',
    description: `A horizontal bar chart for ranked data — animated fills scaled to the max, a sort toggle, and value labels. No library. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Horizontal Bar Chart — Animated Ranking Bars Scaled to the Maximum Value',
      description: `When you're comparing a list of named items — countries, products, referrers, team members — a horizontal bar chart reads far better than a vertical one: the labels sit on a tidy left column where they're easy to read, and the bars extend rightward in a natural ranking. This snippet builds that chart in plain HTML, CSS, and vanilla JavaScript, with animated fills, a sort toggle, and no charting library.

**A CSS-grid row, not an SVG**

Each row is a three-column CSS grid: a fixed-width label column, a flexible track that holds the bar, and a right-aligned value. Building bars as plain \`div\`s with a percentage \`width\` (rather than SVG rects) means the bars inherit \`border-radius\`, transitions, and gradients for free, wrap responsively, and need zero coordinate math. The track is a light rounded rail; the fill is a coloured bar clipped to it with \`overflow: hidden\`, so rounded corners stay crisp at any width.

**Scaled to the maximum, animated from zero**

Every bar's width is its value as a percentage of the largest value in the dataset, so the longest bar fills the track and the rest are proportional — the standard way to scale a bar chart for visual comparison. The fills start at \`width: 0\` and animate to their target on the next animation frame; deferring the width assignment to \`requestAnimationFrame\` is the key trick that lets the CSS \`transition\` run, because setting the final width in the same tick the element is created would skip the animation entirely.

**A sort toggle that re-ranks**

A single button flips the sort between high-to-low and low-to-high, re-rendering the rows in the new order with the fills re-animating. Sorting works on a copy of the data (\`DATA.slice()\`) so the original order is preserved, and the max-value scaling stays consistent regardless of sort direction, so a bar represents the same width whether it's at the top or bottom of the list.

**Labels that carry context**

Each label pairs an emoji flag (or any icon) with the name, and a tabular-figures value sits at the end of the row so the numbers align vertically into a clean column — \`font-variant-numeric: tabular-nums\` keeps digits the same width so values don't jitter as they change. This three-part row (icon + name, bar, value) is the canonical "ranking list" layout you see in analytics dashboards everywhere.

**Data-driven and drop-in**

The whole chart renders from a \`DATA\` array of \`{ label, flag, value, color }\`. Swap in your own ranked figures and the bars, scaling, sort, and values all follow. Because it's pure HTML/CSS/JS with no dependencies, it drops into any dashboard or report, and it's a clear reference for the percentage-of-max scaling and the requestAnimationFrame animation trick that apply to any bar visualisation.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A ranked horizontal bar chart renders with six rows that animate their fills from zero.` },
      { title: 'Toggle the sort', text: `Click the Sort button to flip between high-to-low and low-to-high; the rows re-rank and re-animate.` },
      { title: 'Swap in your data', text: `Replace the DATA array with your own { label, flag, value, color } items — scaling is automatic.` },
      { title: 'Adjust the label column', text: `Change the grid-template-columns label width if your names are longer or shorter.` },
      { title: 'Restyle the bars', text: `Edit the fill colours, track colour, bar height, or border-radius to match your design.` },
      { title: 'Wire to an API', text: `Fetch your figures, map them into the DATA shape, and call render() to draw the live chart.` },
    ] },
    features: [
      { title: 'CSS-grid rows', text: `Each row is a label / track / value grid, so labels align and bars wrap responsively with no SVG.` },
      { title: 'Percentage-of-max scaling', text: `Bar widths are each value as a share of the dataset's maximum, the standard bar-chart scaling.` },
      { title: 'Animate-from-zero fills', text: `Widths are applied on the next animation frame so the CSS transition runs from 0 every render.` },
      { title: 'Sort toggle', text: `One button re-ranks the rows high-to-low or low-to-high and re-animates the fills.` },
      { title: 'Non-destructive sort', text: `Sorting works on a copy of the data, so the original order is preserved.` },
      { title: 'Tabular value column', text: `Values use tabular-nums so digits align into a clean right-hand column.` },
      { title: 'Icon + label pairing', text: `Each label pairs an emoji/icon with the name — the canonical ranking-list layout.` },
      { title: 'Data-driven & no library', text: `Renders entirely from a DATA array in plain HTML/CSS/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Top-N analytics rankings', text: `Show top countries, pages, or referrers — pair with a [pie chart](/ui-snippets/pie-chart/) for the share breakdown.` },
      { title: 'Leaderboards and standings', text: `Rank users or teams by score alongside a [leaderboard table](/ui-snippets/leaderboard-table/) for detailed rows.` },
      { title: 'Product and category comparison', text: `Compare sales or usage across products next to a [bar chart](/ui-snippets/bar-chart/) for time trends.` },
      { title: 'Survey and poll tallies', text: `Display answer counts as ranked bars, complementing a [poll widget](/ui-snippets/poll-widget/).` },
      { title: 'Resource and budget breakdowns', text: `Rank spend or usage by category on an admin dashboard.` },
      { title: 'Learning bar-chart scaling', text: `A reference for percentage-of-max scaling and the requestAnimationFrame fill animation.` },
      { icon: 'CODE', title: 'Related: Real-Time Streaming Metric Chart with Pause/Resume', desc: 'See the [Real-Time Streaming Metric Chart with Pause/Resume](/ui-snippets/real-time-metric-stream-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the bar widths scaled?', a: `Each bar's width is its value divided by the largest value in the dataset, times 100 — so the biggest item fills the track and every other bar is proportional to it. This percentage-of-max approach is the standard way to scale a bar chart for visual comparison, and it keeps bars consistent regardless of sort order because the max is computed from the full dataset, not the sorted slice.` },
      { q: 'Why do the bars animate only when applied on the next frame?', a: `A CSS transition only runs when a property changes between two rendered states. If you set the final width in the same tick the element is created, the browser never paints the 0 state, so there's nothing to animate from. Deferring the width assignment to requestAnimationFrame lets the element paint at width:0 first, then transition to its target — which is what produces the grow-in effect.` },
      { q: 'How does the sort toggle work without losing the data order?', a: `The button flips a desc boolean and calls render(), which sorts a copy of DATA (via DATA.slice()) rather than the original array. That keeps your source order intact for any other use while displaying the rows in the chosen direction. The max-value scaling is unaffected by sorting, so each bar's width stays the same wherever it lands.` },
      { q: 'How do I change or add rows?', a: `Edit the DATA array — each entry is { label, flag, value, color }. Add, remove, or change entries and the rows, scaling, sort, and values all follow on the next render(). Swap the emoji flag for any icon or leave it out. For real data, fetch your figures, map them into that shape, and call render().` },
      { q: 'How do I use this bar chart in React, Vue, or Angular?', a: `In React, hold the data and sort direction in useState and render the rows from .map(), setting widths in a useEffect so they animate after mount; in Vue, use v-for with a ref and onMounted; in Angular, use *ngFor with ngAfterViewInit. The scaling math and markup are framework-agnostic — only the state and the deferred width-set move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the animation timing by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the fill widths are set inside a requestAnimationFrame callback instead of directly in the template string, or how the percentage-of-max scaling stays consistent regardless of which sort order is active. The same assistant is useful for optimizing it — ask whether rebuilding the entire rows innerHTML on every sort toggle is wasteful compared to just reordering existing DOM nodes with a FLIP animation. It's just as handy for extending the chart: ask it to animate row reordering itself (not just fill widths) when the sort changes, add a search box that filters rows by label, or support negative values with bars extending left from a center zero line. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a horizontal ranking bar chart in plain HTML, CSS, and JavaScript using CSS Grid rows (not SVG, not canvas, no charting library).

Requirements:
- A data array of objects each with a label, an icon or flag emoji, a numeric value, and a color.
- Render each row as a three-column CSS grid: a fixed-width label column (icon plus name), a flexible track column containing the bar itself, and a right-aligned value column using tabular-nums formatting so digits align vertically down the column.
- Compute every bar's width as a percentage of the single largest value across the entire dataset (not just the currently visible sorted subset), so bar proportions stay meaningful regardless of sort order.
- Set every bar's width to 0 at creation, then apply the real target width percentage inside a requestAnimationFrame callback (not synchronously), so a CSS transition on width actually plays a grow-in animation from zero on every render.
- Add a single sort toggle button that flips between descending and ascending order, re-sorting a copy of the original data array (so the source array itself is never mutated) and re-rendering with the fills animating again from zero.
- Give the bar track rounded corners with overflow hidden so the colored fill inside always renders with matching rounded corners regardless of its width.`,
    },
  },
};

export default horizontalBarChart;
