const sparklineChart = {
  id: 'sparkline-chart',
  title: 'Sparkline Chart',
  category: 'charts',
  html: `<div class="wrap">

  <div class="cards-grid">

    <div class="metric-card">
      <div class="metric-head">
        <div class="metric-info">
          <div class="metric-label">Revenue</div>
          <div class="metric-value">$48,295</div>
          <div class="metric-change up">↑ 12.4%</div>
        </div>
        <canvas class="sparkline" id="sp-revenue" width="100" height="40"></canvas>
      </div>
    </div>

    <div class="metric-card">
      <div class="metric-head">
        <div class="metric-info">
          <div class="metric-label">Active users</div>
          <div class="metric-value">1,847</div>
          <div class="metric-change up">↑ 8.1%</div>
        </div>
        <canvas class="sparkline" id="sp-users" width="100" height="40"></canvas>
      </div>
    </div>

    <div class="metric-card">
      <div class="metric-head">
        <div class="metric-info">
          <div class="metric-label">Bounce rate</div>
          <div class="metric-value">34.2%</div>
          <div class="metric-change down">↓ 3.2%</div>
        </div>
        <canvas class="sparkline" id="sp-bounce" width="100" height="40"></canvas>
      </div>
    </div>

    <div class="metric-card">
      <div class="metric-head">
        <div class="metric-info">
          <div class="metric-label">Conversion</div>
          <div class="metric-value">5.8%</div>
          <div class="metric-change up">↑ 0.6%</div>
        </div>
        <canvas class="sparkline" id="sp-conv" width="100" height="40"></canvas>
      </div>
    </div>

  </div>

</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 28px 20px; }

.wrap { width: 100%; max-width: 560px; }

.cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

.metric-card { background: #fff; border-radius: 14px; padding: 16px; border: 1px solid #e2e8f0; box-shadow: 0 1px 6px rgba(0,0,0,0.05); }

.metric-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }

.metric-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 3px; }
.metric-value { font-size: 22px; font-weight: 800; color: #0f172a; line-height: 1; margin-bottom: 4px; }
.metric-change { font-size: 11px; font-weight: 700; }
.metric-change.up   { color: #16a34a; }
.metric-change.down { color: #dc2626; }

.sparkline { flex-shrink: 0; }`,
  js: `const DATA = {
  revenue: [28,32,27,35,30,38,34,42,38,45,41,48],
  users:   [1200,1150,1300,1250,1400,1350,1500,1480,1600,1720,1800,1847],
  bounce:  [42,40,43,41,38,40,37,38,36,35,34,34],
  conv:    [4.8,5.1,4.9,5.3,5.0,5.4,5.2,5.6,5.5,5.7,5.9,5.8],
};

const COLORS = {
  revenue: { line: '#6366f1', fill: 'rgba(99,102,241,0.12)' },
  users:   { line: '#10b981', fill: 'rgba(16,185,129,0.12)' },
  bounce:  { line: '#ef4444', fill: 'rgba(239,68,68,0.12)' },
  conv:    { line: '#f59e0b', fill: 'rgba(245,158,11,0.12)' },
};

function drawSparkline(canvasId, dataKey) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  const data   = DATA[dataKey];
  const color  = COLORS[dataKey];
  const w = canvas.width, h = canvas.height;
  const pad = 4;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const xStep = (w - pad*2) / (data.length - 1);
  const yScale = (h - pad*2) / range;

  const pts = data.map((v, i) => ({
    x: pad + i * xStep,
    y: h - pad - (v - min) * yScale,
  }));

  ctx.clearRect(0, 0, w, h);

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, color.fill);
  grad.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const mx = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(mx, pts[i-1].y, mx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.lineTo(pts[pts.length-1].x, h);
  ctx.lineTo(pts[0].x, h);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const mx = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(mx, pts[i-1].y, mx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.strokeStyle = color.line;
  ctx.lineWidth = 1.8;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // End dot
  const last = pts[pts.length-1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 3, 0, Math.PI*2);
  ctx.fillStyle = color.line;
  ctx.fill();
}

drawSparkline('sp-revenue', 'revenue');
drawSparkline('sp-users',   'users');
drawSparkline('sp-bounce',  'bounce');
drawSparkline('sp-conv',    'conv');`,
  seo: {
    title: 'Sparkline Chart — Free HTML CSS JS Canvas Snippet',
    description: 'Smooth bezier sparklines with gradient fill and end dots across four metric cards — no chart library. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Sparkline Chart — Canvas Bezier Curve, Gradient Fill, End Dot & Normalised Coordinates',
      description: `A full chart needs axes, gridlines, a legend, and room to breathe. A sparkline needs none of that — just enough ink to answer "is this going up or down?" in the time it takes an eye to pass over a number. Edward Tufte coined the term for exactly this kind of "intense, simple, word-sized graphic," and it's now the default companion to any KPI on a dashboard: a revenue figure means little until a tiny rising line beside it says *and it's been climbing all month*. This snippet draws four such metric cards directly to \`<canvas>\` — smooth curves instead of jagged polylines, a soft gradient fill beneath the line, a dot marking the latest value, and a coordinate system that adapts itself to whatever numbers you hand it.\n\n**Mapping arbitrary numbers onto a fixed-size canvas**\n\nRevenue might range from 27 to 48; active users from 1,150 to 1,847. Both need to fill the same 100×40 canvas without the chart author hand-tuning a scale for each metric. The fix is normalisation: \`(value - min) / range\` converts any number in the dataset into a position between 0 and 1 — purely *where it sits relative to the dataset's own minimum and maximum* — and multiplying that fraction by the canvas's available height converts it into pixels. The final twist, \`canvasHeight - padding - scaledValue\`, flips the result, because canvas coordinates grow *downward* from the top-left corner while every chart convention on Earth expects "higher value" to mean "higher on the screen."\n\n**Smooth curves from a single line of geometry**\n\n\`ctx.lineTo\` would connect the data points with sharp, jagged corners — technically accurate, visually noisy. Instead, each segment uses \`ctx.bezierCurveTo\` with control points placed at the horizontal midpoint between consecutive points: \`const mx = (prev.x + next.x) / 2\`. Anchoring both control points to that shared midpoint — one paired with the previous point's height, one with the next's — produces a curve that eases smoothly out of one point and into the next, with no separate smoothing pass or external charting math required. It's the same "let geometry do the work" instinct behind the gliding indicator in the [Scroll-Spy Navigation](/ui-snippets/scroll-spy-nav) snippet.\n\n**A gradient that fades the story toward the baseline**\n\nThe filled area beneath each line uses \`createLinearGradient\` running from an opaque tint at the top to fully transparent at the bottom — drawn by tracing the curve, dropping straight down to the canvas floor, and closing the path back to the start before calling \`ctx.fill()\`. The fade keeps the eye anchored on the *line*, which carries the actual information, while the colour wash beneath it adds just enough visual weight to read as "area under a trend" rather than a bare line floating in space.\n\n**Why canvas, not SVG, for a wall of small charts**\n\nA dashboard might show twenty or fifty of these at once. Each SVG sparkline would be its own subtree of DOM nodes for the browser to parse, lay out, and keep in memory; a canvas sparkline is a handful of draw calls into a single bitmap that simply *is* what it looks like — no nodes, no reflow, trivially cheap to redraw on a live data tick. For a handful of hero charts, SVG's crispness and CSS-styleability often win; for a grid of glanceable trend lines like the [Stats Card](/ui-snippets/stats-card) or [Line Chart Widget](/ui-snippets/line-chart-widget) might use, canvas is the pragmatic choice.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'View the four metric cards with their sparklines', text: 'Each card shows a label, value, percentage change, and a mini sparkline chart. The last data point has an endpoint dot. Green for growth metrics, red for bounce rate (where lower is better).' },
      { title: 'Replace the DATA arrays with your own metrics', text: 'Update the DATA object: each key is a canvas ID suffix (sp-X), the value is an array of numbers. Use the last 7, 14, or 30 days of data. The sparkline automatically normalises to fit any range.' },
      { title: 'Change sparkline colours', text: 'Update COLORS: each key needs a line colour (hex) and fill colour (rgba with low opacity). Match the colour to the metric\'s semantic meaning — green for growth, red for declining metrics, blue for neutral.' },
      { title: 'Add more metric cards', text: 'Duplicate a .metric-card div and add matching entries to DATA and COLORS. Call drawSparkline("sp-newkey", "newkey") at the bottom. The 2-column grid automatically accommodates more cards.' },
      { title: 'Animate the sparkline on load', text: 'For an animated draw effect, modify drawSparkline to draw progressively: use requestAnimationFrame and draw only the first N points per frame, incrementing N until all points are drawn. This creates a left-to-right reveal animation.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component using useRef for canvases and useEffect for drawing, or "Tailwind" for a React + Tailwind CSS version.' },
    ]},
    features: ['Canvas 2D bezier curves: midpoint control points for smooth lines','Coordinate normalisation: (value-min)/range maps any data to canvas dimensions','Y-axis inversion: h - padding - scaledValue (Canvas Y increases downward)','Linear gradient fill: opaque top → transparent bottom via createLinearGradient','End-point dot: ctx.arc on last data point marks current value','4 metric cards: revenue/users/bounce/conversion with colour-matched sparklines','padding variable prevents clipping at canvas edges','No external library — pure Canvas 2D API'],
    useCases: [
      { icon: 'CHART', title: 'Dashboard KPI metric cards with trend indicators', desc: 'The classic sparkline use case — a number with a tiny trend chart. Revenue, active users, conversion rate, error count, latency — any metric that changes over time benefits from a sparkline showing the trend shape at a glance without reading the full chart.' },
      { icon: 'APP', title: 'Analytics overview and real-time metric monitoring', desc: 'Real-time dashboards show live metrics updating every second. Canvas sparklines redraw efficiently — call drawSparkline() with the updated data array and the canvas clears and redraws instantly without any DOM overhead.' },
      { icon: 'DESIGN', title: 'Inline trend indicators in table cells and lists', desc: 'Data tables with a sparkline column show the trend history for each row. Stock tickers, server health monitors, and sales team leaderboards use inline sparklines in table cells. Canvas sparklines are efficient enough to render 50+ simultaneously.' },
      { icon: 'FLOW', title: 'Performance monitoring and uptime dashboards', desc: 'Site reliability and DevOps dashboards show response time, error rate, and throughput sparklines per service. The gradient fill communicates the trend severity — flat green for stable, rising red for degrading.' },
      { icon: 'LEARN', title: 'Study Canvas 2D bezier curve smoothing and coordinate normalisation', desc: 'The sparkline demonstrates the midpoint bezier curve technique for smooth chart lines without a smoothing algorithm. The coordinate normalisation formula works for any chart type — bar charts, area charts, and line charts all use the same (value - min) / range × pixelRange calculation.' },
      { icon: 'CODE', title: 'Lightweight alternative to Chart.js for simple sparklines', desc: 'Chart.js adds 60KB+ for sparklines this snippet renders in 40 lines of Canvas code. For dashboards with 10-20 sparklines, the zero-dependency Canvas approach eliminates library overhead entirely while providing identical visual output.' },
    ],
    faqs: [
      { q: 'How are data values mapped to canvas pixel coordinates?', a: 'Two calculations: X = padding + (index / (dataLength - 1)) × availableWidth. Y = canvasHeight - padding - ((value - min) / range) × availableHeight. The X formula distributes points evenly across the canvas width. The Y formula: (value - min) / range normalises the value to 0-to-1, then multiplying by availableHeight scales to pixels. Subtracting from canvasHeight - padding inverts the Y axis (canvas Y increases downward, but charts conventionally show higher values higher up).' },
      { q: 'How do the bezier control points create smooth curves?', a: 'For each pair of adjacent points (prev, next), the midpoint mx = (prev.x + next.x) / 2 is computed. bezierCurveTo uses (mx, prev.y) as the first control point and (mx, next.y) as the second. The first control point extends horizontally from the previous point, and the second extends horizontally to the next point. This creates a smooth curve that transitions horizontally between each data point.' },
      { q: 'How do I make the sparkline update in real time?', a: 'Call drawSparkline(canvasId, dataKey) whenever the data updates. In the DATA object, push new values and shift old ones to maintain a fixed length: DATA.revenue.push(newValue); DATA.revenue.shift(). Then redraw: drawSparkline("sp-revenue", "revenue"). For a 1-second update: setInterval(() => { fetchMetric().then(v => { DATA.revenue.push(v); DATA.revenue.shift(); drawSparkline("sp-revenue", "revenue"); }); }, 1000).' },
      { q: 'How do I use sparklines in a React component?', a: 'Click "JSX" to download. Use useRef(null) for each canvas element: const revenueRef = useRef(null). The drawSparkline function takes the canvas element directly instead of looking up by ID. Call it in useEffect: useEffect(() => { drawSparkline(revenueRef.current, "revenue", data.revenue, COLORS.revenue); }, [data]). When data changes, the useEffect dependency fires and the sparkline redraws automatically.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the coordinate normalization or the bezier smoothing on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why drawSparkline computes (value - min) / range before scaling to pixels, and why the y coordinate then gets subtracted from canvasHeight rather than used directly. The same assistant can help optimize it, for instance checking whether recomputing the same min/max and gradient on every single redraw call matters if a dashboard redraws 20 sparklines on every live data tick, or whether caching those values per dataset would help. It is just as useful for extending the sparklines: ask it to animate the line drawing in progressively left-to-right on first load, add a hover tooltip showing the exact value at the nearest point using mouse position mapped back through the same coordinate math, or make the fill gradient's opacity reflect whether the trend is up or down. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a grid of metric cards with canvas "sparkline" mini-charts in plain HTML, CSS, and JavaScript using only the Canvas 2D API — no charting library.

Requirements:
- Several metric cards, each showing a label, a large current value, a colored percentage-change indicator, and a small fixed-size canvas element for its trend line.
- A single reusable draw function that takes a canvas element and an array of numeric data points, computes the dataset's own minimum and maximum, and maps every value to a canvas y-coordinate using linear normalization: (value - min) / (max - min || 1), scaled to the canvas's available height after subtracting padding, and inverted by subtracting from canvas height so higher values appear higher on screen (since canvas y grows downward).
- X coordinates must be evenly distributed across the canvas width based on each point's index in the array, independent of the y-coordinate math.
- Connect the points with smooth curves, not straight line segments: for each pair of consecutive points, use a bezier curve whose two control points are both anchored at the horizontal midpoint between the two points, so the curve eases naturally in and out of every point with no separate smoothing algorithm.
- Beneath the line, fill the area down to the canvas floor with a vertical linear gradient that is opaque near the line and fully transparent by the bottom, so the trend has visual weight without competing with the line itself.
- Draw a small filled circle at the last data point to mark the current/latest value, and give each metric card's sparkline its own distinct line and fill color tied to whether the metric is generally good-when-up or good-when-down (e.g. green for rising revenue, red for a rising bounce rate).
- The draw function must work unmodified for datasets of very different scales (e.g. one series ranging 27 to 48, another ranging 1150 to 1847) without any per-metric manual scale configuration.`,
    },
  },
};

export default sparklineChart;
