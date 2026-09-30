const barChart = {
  id: 'bar-chart',
  title: 'Bar Chart',
  category: 'charts',
  lastmod: '2026-06-10',
  html: `<div class="wrap">
  <div class="card">

    <!-- Header -->
    <div class="card-header">
      <div class="header-left">
        <div class="chart-title">Weekly Visitors</div>
        <div class="chart-total" id="chart-total">0</div>
      </div>
      <div class="header-right">
        <span class="change-badge" id="change-badge">+12%</span>
        <div class="toggle-group">
          <button class="tog-btn active" data-week="this">This Week</button>
          <button class="tog-btn" data-week="last">Last Week</button>
        </div>
      </div>
    </div>

    <!-- Chart area -->
    <div class="chart-wrap">
      <svg class="chart-svg" id="chart-svg" viewBox="0 0 540 240" preserveAspectRatio="xMidYMid meet">
        <!-- Grid lines and Y-axis labels inserted by JS -->
        <g id="grid-group"></g>
        <!-- Bars inserted by JS -->
        <g id="bars-group"></g>
        <!-- X-axis labels inserted by JS -->
        <g id="xlabels-group"></g>
      </svg>
      <!-- Floating tooltip -->
      <div class="bar-tooltip" id="bar-tooltip">
        <div class="tt-label" id="tt-label"></div>
        <div class="tt-value" id="tt-value"></div>
      </div>
    </div>

  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.wrap { width: 100%; max-width: 580px; }

.card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.07);
  border: 1px solid #e2e8f0;
}

/* Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}
.chart-title {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}
.chart-total {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin-top: 4px;
  line-height: 1;
}
.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.change-badge {
  display: inline-block;
  background: #dcfce7;
  color: #16a34a;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
}

/* Toggle */
.toggle-group {
  display: flex;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}
.tog-btn {
  background: transparent;
  border: none;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
  white-space: nowrap;
}
.tog-btn.active {
  background: #fff;
  color: #0f172a;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.tog-btn:not(.active):hover {
  color: #475569;
}

/* Chart */
.chart-wrap {
  position: relative;
  width: 100%;
}
.chart-svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

/* SVG bar elements — transition on height/y for animation */
.bar-rect {
  fill: #6366f1;
  rx: 4;
  transition: y 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
              height 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
}
.bar-rect:hover {
  fill: #818cf8;
}

/* Grid lines */
.grid-line {
  stroke: #e2e8f0;
  stroke-width: 1;
  stroke-dasharray: 4 3;
}
.grid-label {
  fill: #94a3b8;
  font-size: 11px;
  font-family: system-ui, sans-serif;
  dominant-baseline: middle;
  text-anchor: end;
}
.x-label {
  fill: #64748b;
  font-size: 11px;
  font-family: system-ui, sans-serif;
  text-anchor: middle;
  dominant-baseline: hanging;
}

/* Tooltip */
.bar-tooltip {
  position: absolute;
  background: #1e293b;
  color: #fff;
  border-radius: 8px;
  padding: 6px 10px;
  pointer-events: none;
  white-space: nowrap;
  transform: translate(-50%, -110%);
  display: none;
  z-index: 10;
}
.bar-tooltip::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px 5px 0;
  border-style: solid;
  border-color: #1e293b transparent transparent;
}
.tt-label {
  font-size: 10px;
  color: #94a3b8;
  margin-bottom: 1px;
}
.tt-value {
  font-size: 14px;
  font-weight: 700;
}`,

  js: `// ─── Dataset definitions ───────────────────────────────────────────
const DATASETS = {
  this: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [62, 48, 75, 90, 83, 57, 44],
    total: '6,842',
    change: '+12%',
    changeUp: true,
  },
  last: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [54, 42, 68, 79, 71, 50, 47],
    total: '6,109',
    change: '+4%',
    changeUp: true,
  },
};

// ─── Chart constants ────────────────────────────────────────────────
const SVG_W      = 540;
const SVG_H      = 240;
const PAD_LEFT   = 38;   // room for y-axis labels
const PAD_RIGHT  = 12;
const PAD_TOP    = 12;
const PAD_BOTTOM = 28;   // room for x-axis labels
const CHART_W    = SVG_W - PAD_LEFT - PAD_RIGHT;
const CHART_H    = SVG_H - PAD_TOP  - PAD_BOTTOM;
const BAR_GAP    = 10;
const Y_MAX      = 100;
const Y_STEPS    = [0, 25, 50, 75, 100];
const BAR_RADIUS = 4;

// ─── DOM refs ───────────────────────────────────────────────────────
const svgEl      = document.getElementById('chart-svg');
const gridGroup  = document.getElementById('grid-group');
const barsGroup  = document.getElementById('bars-group');
const xlabGroup  = document.getElementById('xlabels-group');
const tooltip    = document.getElementById('bar-tooltip');
const ttLabel    = document.getElementById('tt-label');
const ttValue    = document.getElementById('tt-value');
const totalEl    = document.getElementById('chart-total');
const badgeEl    = document.getElementById('change-badge');

// ─── Build static grid (once) ───────────────────────────────────────
function buildGrid() {
  Y_STEPS.forEach(step => {
    const y = PAD_TOP + CHART_H - (step / Y_MAX) * CHART_H;

    // Grid line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('class', 'grid-line');
    line.setAttribute('x1', PAD_LEFT);
    line.setAttribute('y1', y);
    line.setAttribute('x2', SVG_W - PAD_RIGHT);
    line.setAttribute('y2', y);
    gridGroup.appendChild(line);

    // Y-axis label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('class', 'grid-label');
    text.setAttribute('x', PAD_LEFT - 6);
    text.setAttribute('y', y);
    text.textContent = step;
    gridGroup.appendChild(text);
  });
}

// ─── Render bars for a dataset ──────────────────────────────────────
let currentBars = []; // cache bar rects for re-animation

function renderBars(dataset) {
  // Clear previous bars and x-labels
  barsGroup.innerHTML = '';
  xlabGroup.innerHTML = '';
  currentBars = [];

  const n = dataset.labels.length;
  const barW = (CHART_W - BAR_GAP * (n + 1)) / n;
  const baselineY = PAD_TOP + CHART_H;

  dataset.labels.forEach((label, i) => {
    const value   = dataset.values[i];
    const targetH = (value / Y_MAX) * CHART_H;
    const targetY = baselineY - targetH;
    const x       = PAD_LEFT + BAR_GAP + i * (barW + BAR_GAP);
    const centerX = x + barW / 2;

    // Bar rect — start collapsed (height 0, y at baseline)
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('class', 'bar-rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', baselineY);          // start at baseline
    rect.setAttribute('width', barW);
    rect.setAttribute('height', 0);             // start collapsed
    rect.setAttribute('rx', BAR_RADIUS);
    rect.setAttribute('ry', BAR_RADIUS);
    barsGroup.appendChild(rect);
    currentBars.push({ rect, targetY, targetH, label, value, centerX });

    // X-axis label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('class', 'x-label');
    text.setAttribute('x', centerX);
    text.setAttribute('y', baselineY + 6);
    text.textContent = label;
    xlabGroup.appendChild(text);

    // Hover tooltip
    rect.addEventListener('mouseenter', (e) => showTooltip(e, label, value, centerX, targetY));
    rect.addEventListener('mouseleave', hideTooltip);
    rect.addEventListener('mousemove',  (e) => moveTooltip(e, centerX, targetY));
  });

  // Animate bars to target on next frame
  requestAnimationFrame(() => {
    currentBars.forEach(({ rect, targetY, targetH }) => {
      rect.setAttribute('y', targetY);
      rect.setAttribute('height', targetH);
    });
  });
}

// ─── Tooltip helpers ────────────────────────────────────────────────
function getBarTooltipPos(centerX, targetY) {
  const wrapRect = svgEl.parentElement.getBoundingClientRect();
  const svgRect  = svgEl.getBoundingClientRect();
  // Map SVG coords to rendered pixel coords
  const scaleX   = svgRect.width  / SVG_W;
  const scaleY   = svgRect.height / SVG_H;
  const left     = svgRect.left - wrapRect.left + centerX * scaleX;
  const top      = svgRect.top  - wrapRect.top  + targetY * scaleY;
  return { left, top };
}

function showTooltip(e, label, value, centerX, targetY) {
  ttLabel.textContent = label;
  ttValue.textContent = value.toLocaleString() + ' visitors';
  tooltip.style.display = 'block';
  const { left, top } = getBarTooltipPos(centerX, targetY);
  tooltip.style.left = left + 'px';
  tooltip.style.top  = top  + 'px';
}

function moveTooltip(e, centerX, targetY) {
  const { left, top } = getBarTooltipPos(centerX, targetY);
  tooltip.style.left = left + 'px';
  tooltip.style.top  = top  + 'px';
}

function hideTooltip() {
  tooltip.style.display = 'none';
}

// ─── Update header ───────────────────────────────────────────────────
function updateHeader(dataset) {
  totalEl.textContent = dataset.total;
  badgeEl.textContent = dataset.change;
  badgeEl.style.background = dataset.changeUp ? '#dcfce7' : '#fee2e2';
  badgeEl.style.color      = dataset.changeUp ? '#16a34a' : '#dc2626';
}

// ─── Dataset toggle ──────────────────────────────────────────────────
document.querySelectorAll('.tog-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tog-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const key     = btn.dataset.week;
    const dataset = DATASETS[key];
    updateHeader(dataset);
    renderBars(dataset);
  });
});

// ─── Init ────────────────────────────────────────────────────────────
buildGrid();
updateHeader(DATASETS.this);
renderBars(DATASETS.this);`,

  about: {
    title: 'Animated Bar Chart — SVG HTML CSS JavaScript (No Library)',
    description: 'An animated SVG bar chart in pure HTML, CSS, and JavaScript. Hover tooltips, dataset toggle, animated bar growth — no Chart.js, no D3.js, zero dependencies.',
    about: `Bar charts are the workhorse of data visualization. Whether you\'re showing sales by month, user signups by day, or revenue by product, the bar chart communicates magnitude and comparison more clearly than almost any other chart type. Yet most developers reach for Chart.js, D3.js, or Recharts to render one — adding hundreds of kilobytes of dependency for what is ultimately a handful of rectangles.\n\nThis snippet builds a production-quality animated bar chart using SVG elements and vanilla JavaScript. No charting library. No canvas. Just SVG rect elements, CSS transitions, and a bit of math.\n\n**SVG bar rendering**\n\nEach bar is an SVG rect element. The y attribute and height are computed from the data value and the chart\'s coordinate system: a value of 80 out of 100 means the rect starts at 20% from the top and is 80% of the chart height tall. SVG coordinate systems run top-to-bottom, so bars "grow from the bottom" by inverting the y calculation: y = chartHeight - barHeight.\n\n**Load animation**\n\nOn page load, bars animate from height 0 to their target height using a CSS transition. This is achieved by briefly setting height to 0 and y to chartHeight, then in a requestAnimationFrame callback setting the real values. CSS transition: height 0.6s ease, y 0.6s ease on the rect elements handles the rest.\n\n**Y-axis and grid lines**\n\nFive horizontal grid lines divide the chart area. Each line is an SVG line element with a dashed stroke. The corresponding y-axis labels (0, 25, 50, 75, 100) are SVG text elements positioned to the left. This gives the chart professional context without a library.\n\n**Hover tooltip**\n\nMoving the mouse over a bar shows a tooltip div positioned above the bar. The tooltip position is calculated from the bar\'s SVG bounding box (getBoundingClientRect()) relative to the chart container. The tooltip shows the day label and value.\n\n**Dataset toggle**\n\nTwo buttons above the chart switch between "This Week" and "Last Week" datasets. Clicking re-renders the bars with a fresh animation — all bars reset to 0 and grow again. The total and percentage change in the header update accordingly.\n\n**No library, just rectangles**\n\nSVG math for a bar chart is straightforward: bar width = (chartWidth - padding) / numBars, bar height = value / maxValue * chartHeight. That's the core calculation. Everything else is styling.

**SVG viewBox and responsiveness**

The chart uses \`viewBox="0 0 540 240"\` with \`preserveAspectRatio="xMidYMid meet"\`. This means the SVG scales to fill any container while keeping proportions. Bar widths and gaps are expressed as percentages of the 540-unit coordinate space -- not pixels -- so the chart looks identical at 300px wide or 900px wide. No ResizeObserver needed.

**Dataset toggle and re-animation**

The snippet stores two datasets (This Week and Last Week) as objects with matching day labels. Clicking a toggle button swaps the active dataset and re-renders all bars from height 0, retriggering the grow-in animation. The Y-axis scale recalculates to the new dataset's maximum, so both datasets are always shown at their natural scale.`,

    howToUse: [
      { step: 'View', desc: 'The chart renders and animates on load — bars grow from the bottom up.' },
      { step: 'Hover', desc: 'Move your mouse over any bar to see the day and value in a tooltip.' },
      { step: 'Toggle dataset', desc: 'Click "This Week" or "Last Week" to switch data and re-animate the bars.' },
      { step: 'Customize data', desc: 'Replace the DATASETS object with your own labels and values.' },
      { step: 'Adjust colors', desc: 'Edit the fill: #6366f1 value in the .bar-rect CSS rule to match your brand color.' },
    ],
    features: [
      { title: 'Animated bar growth', desc: 'Bars grow from 0 to value on load and on dataset switch — smooth CSS transition.' },
      { title: 'Hover tooltips', desc: 'Label and value shown on bar hover, positioned above the hovered bar.' },
      { title: 'Dataset toggle', desc: 'Switch between two datasets with a re-animation — useful for period comparisons.' },
      { title: 'Y-axis grid lines', desc: 'Dashed horizontal grid lines with axis labels give the chart professional context.' },
      { title: 'SVG-based', desc: 'Crisp at any screen density — vector rendering scales perfectly on retina displays.' },
      { title: 'Zero dependencies', desc: 'No Chart.js, no D3.js — just SVG rect elements and CSS transitions.' },
    ],
    useCases: [
      { title: 'Analytics & Metrics Dashboards', desc: 'Weekly or monthly metric bars are the cornerstone of any analytics dashboard. Pair with a [donut chart](/ui-snippets/donut-chart/) for category breakdowns, a [line chart widget](/ui-snippets/line-chart-widget/) for trend lines, and a [stats card](/ui-snippets/stats-card/) for headline numbers — all in a [dashboard layout](/ui-snippets/dashboard-layout/).' },
      { title: 'Sales & Revenue Reports', desc: 'Daily, weekly, or monthly revenue bars with a period-over-period toggle — "this week vs last week", "this month vs last month". Color each bar by performance zone (below/at/above target) for instant insight.' },
      { title: 'Site Traffic & Growth Statistics', desc: 'Page views, signups, API calls, or downloads by day — embed in an admin sidebar alongside a [sparkline chart](/ui-snippets/sparkline-chart/) for micro-trends. Lightweight SVG means it doesn\'t slow your dashboard.' },
      { title: 'Fitness & Habit Tracking Apps', desc: 'Show workout reps, minutes of exercise, water intake, or habit streaks by day of the week. The animation on load makes data feel alive. Pair with a [gauge chart](/ui-snippets/gauge-chart/) for weekly goal progress.' },
      { title: 'Survey & Poll Results Display', desc: 'Show response counts per answer option, category, or demographic group. Use a horizontal variant for long label text. Combine with a [poll widget](/ui-snippets/poll-widget/) for the full collect-then-display flow.' },
      { title: 'A/B Test & Experiment Results', desc: 'Compare conversion rates, click-through rates, or engagement metrics between variants. The dataset toggle button is perfect for before/after or control/variant comparisons.' },
      { icon: 'CODE', title: 'Related: Cohort Retention Heatmap', desc: 'See the [Cohort Retention Heatmap](/ui-snippets/cohort-retention-heatmap/) for a related charts pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Parallel Coordinates Chart', desc: 'See the [Parallel Coordinates Chart](/ui-snippets/parallel-coordinates-chart/) for a related charts pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Ridgeline Plot Chart', desc: 'See the [Ridgeline Plot Chart](/ui-snippets/ridgeline-plot-chart/) for a related charts pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Wind Rose Chart', desc: 'See the [Wind Rose Chart](/ui-snippets/wind-rose-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I add more bars (e.g., 12 months instead of 7 days)?', a: 'Update the DATASETS object with 12 labels and values. Increase the chart width or reduce the BAR_GAP constant. The bar width is calculated automatically from the number of data points.' },
      { q: 'How do I make a horizontal bar chart?', a: 'Swap the x/y and width/height attributes on each rect. Bars run left to right; the value determines width, not height. Move axis labels to the left.' },
      { q: 'How do I color each bar differently?', a: 'Pass a colors array in the dataset. In the render loop, set rect.setAttribute("fill", data.colors[i]) instead of the global BAR_COLOR.' },
      { q: 'How do I add a baseline (zero line) for negative values?', a: 'Calculate a baseline y position at value=0. For positive values, bars grow upward from baseline; for negative values, bars grow downward. Adjust the y and height calculation: y = baseline - (value > 0 ? barH : 0); height = Math.abs(barH).' },
      { q: 'How do I make the chart responsive (resize with the container)?', a: 'The SVG already has viewBox and preserveAspectRatio attributes, so it scales automatically. For bar labels that stay readable, also listen to ResizeObserver on the chart container and recompute bar widths and font sizes by re-calling the render function with the new container width.' },
    ],
  },

  seo: {
    title: 'Bar Chart HTML CSS JS — Animated SVG Bar Chart',
    description: 'Animated SVG bar chart with dynamic scale, rAF entry animation, hover tooltip, dataset switching, and grid lines. Weekly visitor dashboard. No dependencies.',
    about: {
      title: 'Bar Chart — How to Build an Animated SVG Bar Chart with Dynamic Scale and Hover Tooltips in JavaScript',
      description: `Bar charts are the default visualization for comparing discrete values across categories — daily website visitors, weekly sales by region, monthly signups by plan. A well-built bar chart in vanilla JavaScript requires solving four distinct problems: computing a dynamic Y-axis scale from the data, drawing SVG rectangles with correct coordinates, animating bar growth on load and dataset change, and showing a hover tooltip with the exact value.\n\nThis snippet builds a complete bar chart dashboard card in SVG, CSS, and vanilla JavaScript — no Chart.js, no D3.js, no canvas. It shows weekly visitor data with This Week / Last Week toggle buttons, animated bars, a value tooltip on hover, and a total count-up animation in the card header.\n\n## SVG Coordinate System and Layout Constants\n\nThe SVG viewBox is set to "0 0 540 240". The chart area is inset by padding constants: PAD_LEFT=38 (room for Y-axis labels), PAD_RIGHT=12, PAD_TOP=12, PAD_BOTTOM=28 (room for X-axis labels). The usable chart area is therefore 540-38-12=490px wide and 240-12-28=200px tall.\n\nBar width is computed as: \`BAR_W = (chartWidth - (barCount - 1) * BAR_GAP) / barCount\` — dividing available width by 7 bars minus the 6 gaps between them. This ensures bars always fill the chart width regardless of the number of data points.\n\n## Dynamic Y-Axis Scale\n\nThe Y axis scale is computed from the data on every dataset switch. \`maxVal = Math.max(...values)\` finds the tallest bar. The scale is then rounded up to a "nice" number: the function finds the next multiple of a step size (10, 20, 25, 50, 100, etc.) above the max value to produce clean grid line positions. Five horizontal grid lines are drawn at 20%, 40%, 60%, 80%, and 100% of the scale max — each labeled with its Y value on the left axis.\n\nConverting a data value to a Y coordinate: \`y = PAD_TOP + chartHeight * (1 - value / scaleMax)\`. SVG Y coordinates increase downward, so a value of 100% maps to PAD_TOP (top of chart area) and 0% maps to PAD_TOP + chartHeight (bottom).\n\n## Bar Rendering with SVG rect Elements\n\nEach bar is an SVG \`<rect>\` element. The x position: \`PAD_LEFT + i * (BAR_W + BAR_GAP)\`. The full-height y position and height are computed from the data value. For animation, bars start at height=0 and y at the bottom, then transition to their target height.\n\nThe bars use \`rx="4"\` for rounded top corners. An interactive \`<rect class="bar-hit">\` of full chart height and same x position sits invisibly on top of each bar to capture hover events — this gives a wider hover target than the bar itself, especially for short bars.\n\n## requestAnimationFrame Entry Animation\n\nWhen bars render (on load or dataset switch), they start at height 0 and animate to their target height using \`requestAnimationFrame\`. An ease-out cubic function maps the animation progress \`t\` to a smooth deceleration: \`1 - Math.pow(1 - t, 3)\`. Each bar animates simultaneously. The animation duration is 600ms.\n\nFor dataset switching, the old bars fade out (CSS opacity transition) while new bars enter with the rAF animation. This creates a smooth transition between This Week and Last Week data.\n\n## Hover Tooltip\n\nThe tooltip is a \`<g>\` element containing a rounded \`<rect>\` background and two \`<text>\` elements — the day label and the value. It is positioned above the hovered bar using the bar\'s x center and y position minus an offset. Mouse events fire on the invisible hit-area rects.\n\nThe tooltip uses \`pointer-events: none\` so it does not interfere with mouseover/mouseout on bars below it. The \`transform: translate(x, y)\` positions it, and \`visibility: hidden / visible\` shows/hides it without layout shift.\n\n## Header Count-Up and Change Badge\n\nThe card header shows the total visitor count (sum of all bars) animated with a count-up using \`requestAnimationFrame\`. On dataset switch, the count animates from the previous total to the new total over 600ms using a quadratic ease-out. The change badge (+12%, +4%) updates immediately and color-codes green for positive change and red for negative via conditional class assignment.\n\n## Dataset Toggle Buttons\n\nThe This Week / Last Week toggle uses a \`.active\` class on the clicked button. Clicking a button: removes \`.active\` from all toggles, adds it to the clicked one, reads the dataset from the DATASETS object by key, calls \`updateHeader(dataset)\` and \`renderBars(dataset)\`. The active button has accent color border and text; inactive buttons have muted styling.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the chart', text: 'Seven bars represent Mon–Sun visitor counts for the current week. The Y axis scales dynamically to the highest value with five labeled grid lines.' },
        { title: 'Switch datasets', text: 'Click "Last Week" to see the previous week\'s data. Bars animate out and new bars grow in. The total count and change badge in the header update.' },
        { title: 'Hover for exact values', text: 'Hover any bar (or the area above it) to see a tooltip with the exact day and visitor count.' },
        { title: 'Replace the data', text: 'Edit the DATASETS object at the top of the JS. Each dataset has labels (day names), values (counts), total (formatted string), change (+12%), and changeUp (boolean for color).' },
        { title: 'Add more datasets', text: 'Add more keys to DATASETS and create corresponding toggle buttons with matching data-week attributes. The renderBars() and updateHeader() functions read the dataset by key automatically.' },
        { title: 'Connect to an API', text: 'Replace the static DATASETS object with an async fetch: const data = await fetch(\'/api/stats/weekly\').then(r => r.json()); then pass the response to renderBars() and updateHeader(). The rest stays unchanged.' },
      ],
    },
    features: [
      'SVG viewBox 540×240, PAD_LEFT 38px for Y axis labels, PAD_BOTTOM 28px for X axis labels',
      'Dynamic Y-axis scale: Math.max() + round-to-nice-step, 5 horizontal grid lines at 20% intervals',
      'Bar x/y/height: computed from PAD_LEFT + i*(BAR_W+BAR_GAP) and chartHeight*(1-value/max)',
      'rAF entry animation: ease-out cubic 1-Math.pow(1-t,3) over 600ms — bars grow from bottom',
      'Invisible hit-rect: full-height <rect class="bar-hit"> for hover detection on short bars',
      'SVG tooltip: rounded-rect background + two text elements, positioned above bar, pointer-events:none',
      'Header count-up: rAF quadratic ease from previous total to new total on dataset switch',
      'Dataset toggle: DATASETS object keyed by id, .active class swap, same renderBars() and updateHeader() for all datasets',
    ],
    useCases: [
      { icon: 'CHART', title: 'Website & App Analytics Dashboard', desc: 'Daily or weekly visitor counts, page views, signups, or conversions as a bar chart dashboard card. The dataset toggle lets users switch between this week and last week for quick comparison. Pair with a [line chart widget](/ui-snippets/line-chart-widget/) for the longer-term trend and a [stats card](/ui-snippets/stats-card/) for headline numbers.' },
      { icon: 'MONEY', title: 'Sales & Revenue Reporting', desc: 'Daily revenue, deals closed, or quota attainment per day of the week. The dynamic Y scale handles any value range. The change badge instantly communicates week-over-week growth or decline in green or red — no calculation needed from the viewer.' },
      { icon: 'APP', title: 'SaaS Product Metrics & KPI Cards', desc: 'Embed bar chart cards in a product dashboard for API calls per day, feature usage events, error rates, or subscription activations. Each metric gets its own chart card with its own DATASETS object. Lay multiple cards in a CSS Grid using a [dashboard layout](/ui-snippets/dashboard-layout/).' },
      { icon: 'LEARN', title: 'Data Visualization Learning & SVG Study', desc: 'Study how to build a complete bar chart from first principles: dynamic scale computation, SVG coordinate system, rAF animation, event delegation for tooltips. Every technique generalizes to other chart types — histograms, stacked bars, grouped bars — once you understand the SVG rectangle coordinate math.' },
      { icon: 'GLOBAL', title: 'Content Performance & Publishing Metrics', desc: 'Posts published per day, article views per day of week, or social shares by day. Content teams use weekly bar charts to spot which days drive the most traffic and schedule new publications accordingly. Pair with an [activity heatmap](/ui-snippets/activity-heatmap/) for year-level daily volume.' },
      { icon: 'FLOW', title: 'Operations & Fulfillment Tracking', desc: 'Orders processed, shipments dispatched, or support tickets resolved per day. Operations teams check these daily to spot bottlenecks — days with unusually low counts might indicate staffing gaps or system outages. The hover tooltip gives the exact value without reading an axis.' },
    ],
    faqs: [
      { q: 'How does the dynamic Y-axis scale compute "nice" grid lines?', a: 'The code finds Math.max(...values) to get the tallest bar. It then computes a step size from the magnitude of the max value (e.g., max=90 → step=10, max=450 → step=50). The scale max is rounded up to the next multiple of step above the max value. Five grid lines are drawn at 20%, 40%, 60%, 80%, and 100% of that scale max, labeled with their Y values. This ensures grid lines always fall on round numbers regardless of the data range.' },
      { q: 'How does the requestAnimationFrame bar animation work?', a: 'On renderBars(), all bars start at height=0 and y=chartBottom. A timestamp from performance.now() is captured. On each rAF frame, t = (now - start) / DURATION gives progress 0–1. The easing function 1 - Math.pow(1-t, 3) applies ease-out cubic, making bars accelerate quickly and decelerate near their target. Each bar\'s rect.setAttribute("height", targetHeight * ease) and rect.setAttribute("y", targetY + targetHeight * (1 - ease)) updates the bar simultaneously. The loop continues until t >= 1.' },
      { q: 'How do I add more than two datasets (e.g., a rolling last-30-days view)?', a: 'Add more keys to the DATASETS object: DATASETS.month = { labels: [...30 labels], values: [...30 values], total: "...", change: "...", changeUp: true }. Add a button: <button class="tog-btn" data-week="month">Last 30 Days</button>. The existing toggle event listener reads data-week and looks up DATASETS[key], so no JS changes are needed. The bar width recalculates automatically from the values.length.' },
      { q: 'How do I fetch live data from an API and update the chart?', a: 'Replace the DATASETS object with an async init function: async function init() { const res = await fetch(\'/api/stats\'); const json = await res.json(); Object.assign(DATASETS, json); buildGrid(); updateHeader(DATASETS.this); renderBars(DATASETS.this); } init(); Your API should return an object matching the DATASETS shape: { this: { labels, values, total, change, changeUp }, last: { ... } }.' },
      { q: 'How does the invisible hit-rect improve tooltip usability?', a: 'A standard bar rect captures hover events only over the colored rectangle. For short bars (a day with very few visitors), the hover target might be only 5–10px tall — nearly impossible to hit accurately. The invisible hit-rect is the same width as the bar but spans the full chart height, creating a tall column hover area. This means hovering anywhere in the column above the bar also triggers the tooltip, matching the behavior of professional chart libraries.' },
      { q: 'Can I use this bar chart in React, Vue, or Angular?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a utility-class version. In React, render the SVG bars from a map() over your data array and trigger the grow animation by toggling a class in useEffect after mount.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the coordinate math and animation timing here by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how renderBars converts a data value into the rect's y and height attributes using the PAD_TOP/CHART_H constants, or why the bars are set to height 0 first and then animated to their target inside a requestAnimationFrame callback rather than immediately. The same assistant can help optimize it — asking whether rebuilding barsGroup.innerHTML on every dataset switch is wasteful compared to updating existing rect attributes in place, or whether the tooltip's getBoundingClientRect calls on every mousemove could be cached. It's also useful for extending the chart: ask it to add a third dataset, stacked or grouped bars, or a live-updating feed that calls renderBars on an interval. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an animated SVG bar chart dashboard card in plain HTML, CSS, and JavaScript using only SVG rect/line/text elements and requestAnimationFrame — no Chart.js, no D3.js, no canvas.

Requirements:
- An SVG with a fixed internal viewBox (e.g. 0 0 540 240) and padding constants reserved on each side for Y-axis labels (left) and X-axis labels (bottom), so all coordinate math derives from those constants rather than magic numbers.
- Draw a fixed number of horizontal dashed grid lines at even value steps (e.g. 0/25/50/75/100), each paired with a Y-axis text label positioned to the left of the chart area.
- Render one SVG rect per data point, with x computed from the bar's index, gap, and computed bar width so bars always fill the chart width regardless of how many data points there are, and y/height computed by mapping the data value against a fixed maximum onto the chart's pixel height (remembering SVG y grows downward, so full value maps to the top).
- On initial render and on every dataset switch, bars must start collapsed at height 0 sitting on the baseline, then animate to their target height and y inside a requestAnimationFrame (or transitioned) step so bars visibly grow upward from the bottom.
- Attach mouseenter, mousemove, and mouseleave listeners to each bar that show/move/hide a floating tooltip div positioned above the hovered bar, converting the bar's SVG-space coordinates into on-screen pixel coordinates using the SVG element's actual rendered bounding box (not the raw viewBox units).
- Provide at least two named datasets and a toggle control that swaps the active dataset, re-renders the bars with the grow animation, and updates a header total and a color-coded (green/red) percent-change badge to match the newly selected dataset.`,
    },
  },
};

export default barChart;
