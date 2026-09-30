const gaugeChart = {
  id: 'gauge-chart',
  title: 'Gauge Chart',
  category: 'charts',
  lastmod: '2026-06-10',
  html: `<div class="wrap">
  <div class="dashboard-title">System Monitor</div>

  <div class="gauges-grid" id="gauges-grid">

    <!-- Gauge 1: CPU -->
    <div class="gauge-card" id="card-cpu">
      <div class="gauge-label">CPU Usage</div>
      <div class="gauge-wrap">
        <svg class="gauge-svg" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <!-- Background track -->
          <path class="gauge-track" d="M 20 100 A 80 80 0 0 1 180 100" />
          <!-- Color zone bg: low (green) -->
          <path class="zone-low"  d="M 20 100 A 80 80 0 0 1 73 34"   />
          <!-- Color zone bg: mid (amber) -->
          <path class="zone-mid"  d="M 73 34  A 80 80 0 0 1 127 34"  />
          <!-- Color zone bg: high (red) -->
          <path class="zone-high" d="M 127 34 A 80 80 0 0 1 180 100" />
          <!-- Progress arc -->
          <path class="gauge-fill" id="fill-cpu" d="M 20 100 A 80 80 0 0 1 180 100" />
          <!-- Zone tick marks -->
          <line class="tick" x1="73"  y1="34"  x2="66"  y2="27"  />
          <line class="tick" x1="127" y1="34"  x2="134" y2="27"  />
          <!-- Needle group — rotates around center (100,100) -->
          <g class="needle-group" id="needle-cpu" style="transform-origin:100px 100px; transform:rotate(-90deg)">
            <line class="needle" x1="100" y1="100" x2="100" y2="28" />
            <circle class="needle-hub" cx="100" cy="100" r="6" />
          </g>
          <!-- Value text -->
          <text class="gauge-value" id="val-cpu" x="100" y="88" text-anchor="middle">73%</text>
          <text class="gauge-metric" x="100" y="113" text-anchor="middle">CPU Usage</text>
        </svg>
      </div>
      <div class="gauge-zone-labels">
        <span class="zone-lbl low">Low</span>
        <span class="zone-lbl mid">Medium</span>
        <span class="zone-lbl high">High</span>
      </div>
      <div class="gauge-btns" id="btns-cpu">
        <button class="gbtn" data-gauge="cpu" data-val="18">18%</button>
        <button class="gbtn active" data-gauge="cpu" data-val="73">73%</button>
        <button class="gbtn" data-gauge="cpu" data-val="91">91%</button>
      </div>
    </div>

    <!-- Gauge 2: Memory -->
    <div class="gauge-card" id="card-memory">
      <div class="gauge-label">Memory Usage</div>
      <div class="gauge-wrap">
        <svg class="gauge-svg" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <path class="gauge-track" d="M 20 100 A 80 80 0 0 1 180 100" />
          <path class="zone-low"  d="M 20 100 A 80 80 0 0 1 73 34"   />
          <path class="zone-mid"  d="M 73 34  A 80 80 0 0 1 127 34"  />
          <path class="zone-high" d="M 127 34 A 80 80 0 0 1 180 100" />
          <path class="gauge-fill" id="fill-memory" d="M 20 100 A 80 80 0 0 1 180 100" />
          <line class="tick" x1="73"  y1="34"  x2="66"  y2="27"  />
          <line class="tick" x1="127" y1="34"  x2="134" y2="27"  />
          <g class="needle-group" id="needle-memory" style="transform-origin:100px 100px; transform:rotate(-90deg)">
            <line class="needle" x1="100" y1="100" x2="100" y2="28" />
            <circle class="needle-hub" cx="100" cy="100" r="6" />
          </g>
          <text class="gauge-value" id="val-memory" x="100" y="88" text-anchor="middle">48%</text>
          <text class="gauge-metric" x="100" y="113" text-anchor="middle">Memory</text>
        </svg>
      </div>
      <div class="gauge-zone-labels">
        <span class="zone-lbl low">Low</span>
        <span class="zone-lbl mid">Medium</span>
        <span class="zone-lbl high">High</span>
      </div>
      <div class="gauge-btns" id="btns-memory">
        <button class="gbtn" data-gauge="memory" data-val="22">22%</button>
        <button class="gbtn active" data-gauge="memory" data-val="48">48%</button>
        <button class="gbtn" data-gauge="memory" data-val="87">87%</button>
      </div>
    </div>

    <!-- Gauge 3: Disk -->
    <div class="gauge-card" id="card-disk">
      <div class="gauge-label">Disk Usage</div>
      <div class="gauge-wrap">
        <svg class="gauge-svg" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <path class="gauge-track" d="M 20 100 A 80 80 0 0 1 180 100" />
          <path class="zone-low"  d="M 20 100 A 80 80 0 0 1 73 34"   />
          <path class="zone-mid"  d="M 73 34  A 80 80 0 0 1 127 34"  />
          <path class="zone-high" d="M 127 34 A 80 80 0 0 1 180 100" />
          <path class="gauge-fill" id="fill-disk" d="M 20 100 A 80 80 0 0 1 180 100" />
          <line class="tick" x1="73"  y1="34"  x2="66"  y2="27"  />
          <line class="tick" x1="127" y1="34"  x2="134" y2="27"  />
          <g class="needle-group" id="needle-disk" style="transform-origin:100px 100px; transform:rotate(-90deg)">
            <line class="needle" x1="100" y1="100" x2="100" y2="28" />
            <circle class="needle-hub" cx="100" cy="100" r="6" />
          </g>
          <text class="gauge-value" id="val-disk" x="100" y="88" text-anchor="middle">61%</text>
          <text class="gauge-metric" x="100" y="113" text-anchor="middle">Disk</text>
        </svg>
      </div>
      <div class="gauge-zone-labels">
        <span class="zone-lbl low">Low</span>
        <span class="zone-lbl mid">Medium</span>
        <span class="zone-lbl high">High</span>
      </div>
      <div class="gauge-btns" id="btns-disk">
        <button class="gbtn" data-gauge="disk" data-val="25">25%</button>
        <button class="gbtn active" data-gauge="disk" data-val="61">61%</button>
        <button class="gbtn" data-gauge="disk" data-val="94">94%</button>
      </div>
    </div>

  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 860px; }

.dashboard-title { font-size: 18px; font-weight: 700; color: #f1f5f9; margin-bottom: 24px; letter-spacing: -0.3px; }

.gauges-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 600px) { .gauges-grid { grid-template-columns: 1fr; } }

/* Card */
.gauge-card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 20px 16px 16px; display: flex; flex-direction: column; align-items: center; }

.gauge-label { font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }

.gauge-wrap { width: 100%; }
.gauge-svg { width: 100%; height: auto; overflow: visible; }

/* Background track */
.gauge-track { fill: none; stroke: #1e3a5f; stroke-width: 14; stroke-linecap: round; }

/* Zone hint arcs (very subtle, behind fill) */
.zone-low  { fill: none; stroke: #14532d; stroke-width: 14; stroke-linecap: butt; opacity: 0.5; }
.zone-mid  { fill: none; stroke: #78350f; stroke-width: 14; stroke-linecap: butt; opacity: 0.5; }
.zone-high { fill: none; stroke: #7f1d1d; stroke-width: 14; stroke-linecap: butt; opacity: 0.5; }

/* Tick marks at zone boundaries */
.tick { stroke: #475569; stroke-width: 1.5; stroke-linecap: round; }

/* Progress fill arc */
.gauge-fill { fill: none; stroke-width: 14; stroke-linecap: round; transition: stroke-dashoffset 0.85s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.4s ease; }

/* Needle */
.needle-group { transition: transform 0.85s cubic-bezier(0.4, 0, 0.2, 1); }
.needle { stroke: #f1f5f9; stroke-width: 2.5; stroke-linecap: round; }
.needle-hub { fill: #f1f5f9; }

/* Center value */
.gauge-value  { font-size: 20px; font-weight: 800; fill: #f1f5f9; font-family: system-ui, sans-serif; }
.gauge-metric { font-size: 9px; fill: #64748b; font-weight: 500; font-family: system-ui, sans-serif; text-transform: uppercase; letter-spacing: 0.6px; }

/* Zone labels row */
.gauge-zone-labels { display: flex; justify-content: space-between; width: 100%; padding: 0 2px; margin-top: 4px; }
.zone-lbl { font-size: 10px; font-weight: 600; }
.zone-lbl.low  { color: #4ade80; }
.zone-lbl.mid  { color: #fbbf24; }
.zone-lbl.high { color: #f87171; }

/* Preset buttons */
.gauge-btns { display: flex; gap: 6px; margin-top: 14px; }
.gbtn { flex: 1; padding: 5px 0; border: 1px solid #334155; border-radius: 8px; background: transparent; color: #94a3b8; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.18s; }
.gbtn:hover { border-color: #64748b; color: #e2e8f0; background: #263348; }
.gbtn.active { background: #263348; border-color: #6366f1; color: #a5b4fc; }`,

  js: `/* ───────────────────────────────────────────────
   SVG Gauge Chart — pure math, no libraries
   Arc span: 180° (semicircle)
   Center: (100, 100)   Radius: 80
   Start angle: -180° (left)  End angle: 0° (right)
   Needle: CSS transform rotate on SVG group
   Fill: stroke-dasharray / stroke-dashoffset
─────────────────────────────────────────────── */

const CX = 100, CY = 100, R = 80;
const ARC_CIRCUMFERENCE = Math.PI * R; // half-circle arc length ≈ 251.3

/* Compute the SVG arc path for a given percentage (0–1) */
function describeArc(pct) {
  // Start = left end (-180°), end = right end (0°)
  // At pct=0 → start point only; pct=1 → full semicircle
  const startAngle = Math.PI;     // 180° in radians (left side)
  const endAngle   = startAngle - (Math.PI * Math.min(pct, 0.9999));
  const x1 = CX + R * Math.cos(startAngle);
  const y1 = CY + R * Math.sin(startAngle);
  const x2 = CX + R * Math.cos(endAngle);
  const y2 = CY + R * Math.sin(endAngle);
  const largeArc = pct > 0.5 ? 1 : 0;
  return \`M \${x1.toFixed(2)} \${y1.toFixed(2)} A \${R} \${R} 0 \${largeArc} 1 \${x2.toFixed(2)} \${y2.toFixed(2)}\`;
}

/* Color from value percentage */
function getColor(pct) {
  if (pct < 0.33) return '#22c55e';   // green
  if (pct < 0.66) return '#f59e0b';   // amber
  return '#ef4444';                    // red
}

/* Needle rotation: 0% → -90°, 50% → 0°, 100% → +90°
   (gauge spans -90° on left to +90° on right)         */
function needleAngle(pct) {
  return -90 + pct * 180;
}

/* Gauge state */
const GAUGES = {
  cpu:    { value: 73 },
  memory: { value: 48 },
  disk:   { value: 61 },
};

/* Animated counter for the center value text */
function animateCounter(el, from, to, duration) {
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    el.textContent = Math.round(from + (to - from) * ease) + '%';
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* Render a single gauge to its target value */
function updateGauge(id, newValue, animate) {
  const pct  = newValue / 100;
  const color = getColor(pct);
  const angle = needleAngle(pct);

  const fillEl   = document.getElementById('fill-' + id);
  const needleEl = document.getElementById('needle-' + id);
  const valEl    = document.getElementById('val-' + id);

  /* Arc path — use stroke-dasharray technique on full semicircle:
     total arc = ARC_CIRCUMFERENCE
     dasharray  = pct * ARC_CIRCUMFERENCE, rest is gap
     dashoffset = 0 (we always draw from the start)              */
  fillEl.setAttribute('d', describeArc(1)); // full semicircle path
  const dash = pct * ARC_CIRCUMFERENCE;
  fillEl.style.strokeDasharray  = \`\${dash.toFixed(2)} \${(ARC_CIRCUMFERENCE - dash + 1).toFixed(2)}\`;
  fillEl.style.strokeDashoffset = '0';
  fillEl.style.stroke = color;

  /* Needle hub color */
  needleEl.querySelector('.needle-hub').style.fill = color;

  /* Rotate needle group */
  needleEl.style.transform = \`rotate(\${angle}deg)\`;

  /* Animate value counter */
  const prevVal = GAUGES[id].value;
  GAUGES[id].value = newValue;
  if (animate) {
    animateCounter(valEl, prevVal, newValue, 850);
  } else {
    valEl.textContent = newValue + '%';
  }
}

/* Initial render (no animation) */
function initGauges() {
  Object.keys(GAUGES).forEach(id => {
    const pct  = GAUGES[id].value / 100;
    const fillEl = document.getElementById('fill-' + id);

    // Pre-set dasharray without transition so initial render is instant
    fillEl.style.transition = 'none';
    document.getElementById('needle-' + id).style.transition = 'none';

    updateGauge(id, GAUGES[id].value, false);

    // Re-enable transitions after first paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fillEl.style.transition = '';
        document.getElementById('needle-' + id).style.transition = '';
      });
    });
  });
}

/* Wire up preset buttons */
document.querySelectorAll('.gbtn').forEach(btn => {
  btn.addEventListener('click', function() {
    const id  = this.dataset.gauge;
    const val = parseInt(this.dataset.val, 10);

    // Update active state for this gauge's buttons
    document.querySelectorAll(\`.gbtn[data-gauge="\${id}"]\`).forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    updateGauge(id, val, true);
  });
});

initGauges();`,

  about: {
    title: 'Gauge Chart — SVG Speedometer HTML CSS JavaScript',
    description: 'An animated SVG gauge chart in HTML, CSS, and JavaScript. Animated needle, color-coded zones, arc animation, and a multi-gauge dashboard grid — no dependencies.',
    about: `Gauge charts — also called speedometer charts or dial charts — are the go-to visualization for metrics that have a clear range and a meaningful threshold. CPU usage, battery level, performance scores, health metrics, server load, and customer satisfaction all communicate better as a gauge than as a number alone. The arc and needle give instant visual context: is this good or bad? Am I in the red zone?\n\nThis snippet builds a full-featured SVG gauge chart using only HTML, CSS, and vanilla JavaScript. No Chart.js, no D3.js, no SVG libraries. Pure arc math and CSS transitions.\n\n**SVG arc rendering**\n\nThe gauge is a semicircle — a 180° arc drawn with an SVG path element. The arc is computed using the SVG arc command: M (start point) A (rx ry rotation large-arc-flag sweep-flag) (end point). For a semicircle with radius R centered at (cx, cy): start = (cx - R, cy), end = (cx + R, cy), large-arc-flag = 1.\n\nThe filled progress arc is a second path on top of the background track, with a stroke-dasharray equal to the arc\'s circumference and a stroke-dashoffset that decreases as the value increases. This is the standard SVG "progress arc" technique.\n\n**Animated needle**\n\nThe needle is a thin SVG line from the center point, rotated by a CSS transform. 0% maps to -90° (pointing left), 50% to 0° (pointing up), 100% to +90° (pointing right). CSS transition: transform 0.8s ease on the needle group element produces smooth animated rotation.\n\n**Color zones**\n\nThree color zones: green for 0–33%, amber for 33–66%, red/orange for 66–100%. The arc fill color is determined by the current value percentage. Zone divider marks on the arc\'s edge visually separate the regions.\n\n**Multi-gauge dashboard**\n\nThree gauges are arranged in a row — CPU Usage, Memory Usage, Disk Usage — each with its own value and label. This demonstrates how the component composes into a dashboard widget pattern. Each gauge is an independent SVG instance.\n\n**Animated updates**\n\nClicking a gauge or adjusting the slider updates the value. The needle rotates smoothly and the arc fill animates via stroke-dashoffset transition. The center value counter also animates — counting up or down — using a simple requestAnimationFrame loop.

**stroke-dashoffset arc animation**

The gauge arc is an SVG \`<path>\` drawn as a circular arc using the \`d\` attribute with \`A\` (arc) commands. The arc length corresponds to the current value: at 0% the arc is invisible; at 100% it spans the full semicircle. Rather than animating \`stroke-dashoffset\` (which requires knowing the path length), the snippet recalculates the arc \`d\` attribute directly on each animation frame, keeping the math explicit and debuggable.

**Color zone thresholds**

The needle and arc color change at configurable thresholds: green below 40%, yellow 40-70%, red above 70%. These are checked on every draw call. The color transition is instantaneous (no CSS transition needed) because the canvas/SVG is fully redrawn each frame. To customize zones, change the threshold percentages and corresponding hex colors in the \`getColor(value)\` function.`,
    howToUse: [
      { step: 'View the dashboard', desc: 'Three gauges render automatically — CPU, Memory, and Disk — each with a starting value.' },
      { step: 'Animate the needle', desc: 'Click the preset buttons (Low / Medium / High) below each gauge to update its value.' },
      { step: 'Watch the arc', desc: 'The progress arc fills and the center counter counts up or down with a smooth CSS transition.' },
      { step: 'Read the color zones', desc: 'Green = low/safe, amber = medium/caution, red = high/danger — instant visual status.' },
      { step: 'Use live data', desc: 'Call updateGauge(id, value) on an interval to feed real-time API metrics into each gauge.' },
      { step: 'Customize', desc: 'Edit the GAUGES array with your own metric names, starting values, and color zone thresholds.' },
    ],
    features: [
      { title: 'Animated needle', desc: 'Smooth CSS rotation transition from the current to the new value.' },
      { title: 'Arc fill animation', desc: 'SVG stroke-dashoffset technique animates the progress arc fill.' },
      { title: 'Color-coded zones', desc: 'Green / amber / red coloring based on value percentage.' },
      { title: 'Animated value counter', desc: 'The center number counts up or down when the value changes.' },
      { title: 'Multi-gauge grid', desc: 'Three gauges in a dashboard row — composable for any metric set.' },
      { title: 'Zero dependencies', desc: 'Pure SVG math and CSS transitions — no libraries.' },
    ],
    useCases: [
      { title: 'Server & Infrastructure Monitoring', desc: 'CPU, memory, disk, and network bandwidth gauges in a single view — the classic DevOps monitoring UI pattern (Datadog, Grafana). Pair with a [line chart widget](/ui-snippets/line-chart-widget/) for historical trends and a [stats card](/ui-snippets/stats-card/) for current peak values. Embed inside a [dashboard layout](/ui-snippets/dashboard-layout/) for a complete admin panel.' },
      { title: 'Web Performance Scores', desc: 'Display Lighthouse performance scores, Core Web Vitals ratings, SEO scores, or test coverage percentages in an immediately readable "how good is this?" format. The color zones (green/amber/red) align with standard pass/warn/fail thresholds.' },
      { title: 'Health & Fitness Tracking Apps', desc: 'Heart rate zones, VO2 max, hydration percentage, calories burned, or sleep quality as an animated dial. The arc animation is especially satisfying for fitness metrics that update in real time from a wearable API.' },
      { title: 'Customer Satisfaction & NPS Tracking', desc: 'A gauge from 0–100 NPS score with color zones for detractors (0–49), passives (50–69), and promoters (70–100). More intuitive than a raw number. Pair with a [donut chart](/ui-snippets/donut-chart/) for category breakdown.' },
      { title: 'Sales Quota & Goal Tracking', desc: 'Show percentage of monthly quota reached as a speedometer — red means behind, green means on track or exceeded. Sales reps check this at a glance. Combine with a [bar chart](/ui-snippets/bar-chart/) for weekly deal pipeline.' },
      { title: 'IoT Device & Sensor Dashboards', desc: 'Temperature, pressure, battery level, signal strength, or tank fill-level from sensor APIs. Feed live WebSocket data into updateGauge() and the needle responds in real time — no page refresh needed.' },
      { icon: 'CODE', title: 'Related: Population Pyramid', desc: 'See the [Population Pyramid](/ui-snippets/pyramid-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I change the arc span (e.g., 270° instead of 180°)?', a: 'Change the START_ANGLE and END_ANGLE constants. Recompute the arc endpoint coordinates using cos(angle) and sin(angle). The stroke-dasharray circumference also changes: circumference = radius * arcAngleInRadians.' },
      { q: 'How do I add custom color zones?', a: 'Replace the getColor() function with your own thresholds: if (pct < 0.5) return "#22c55e"; if (pct < 0.8) return "#f59e0b"; return "#ef4444";' },
      { q: 'How do I feed live data (e.g., from an API)?', a: 'Call updateGauge(gaugeId, newValue, true) on an interval: setInterval(async () => { const res = await fetch("/api/metrics"); const { cpu } = await res.json(); updateGauge("cpu", cpu, true); }, 5000);' },
      { q: 'How do I make the gauge a full circle instead of a semicircle?', a: 'Change the arc span to 360° - 1° (to avoid the arc closing on itself). Adjust START_ANGLE to -90° (top) and END_ANGLE to 269°. The needle rotation range becomes 0°–360°.' },
      { q: 'How do I update a gauge in real time from an API?', a: 'Call setInterval(() => fetch(\'/api/metric\').then(r => r.json()).then(d => { gauge.value = d.value; drawAll(); }), 5000) to poll every 5 seconds. For live push data, use a WebSocket: ws.onmessage = e => { gauge.value = JSON.parse(e.data).value; drawAll(); }. The drawAll() function redraws all gauges instantly on each update.' },
    ],
  },

  seo: {
    title: 'Gauge Chart HTML CSS JS — Animated SVG Speedometer',
    description: 'SVG gauge chart with animated needle, stroke-dasharray arc fill, color zones, and rAF counter. Three-gauge system monitor dashboard. No dependencies.',
    about: {
      title: 'Gauge Chart — Animated SVG Speedometer with Needle, Color Zones, and requestAnimationFrame Counter',
      description: `The gauge chart — also called a speedometer chart, dial chart, or tachometer — is one of the most effective data visualizations for threshold-based metrics. Unlike a raw number or a progress bar, a gauge communicates context instantly: is this reading in the safe zone, the caution zone, or the danger zone? The semicircle arc, rotating needle, and color bands mimic real-world instruments that every user already understands from car dashboards, appliances, and wearable devices.\n\nThis snippet builds a three-gauge system monitor dashboard (CPU Usage, Memory Usage, Disk Usage) entirely in SVG, CSS, and vanilla JavaScript — no Chart.js, no D3.js, no Canvas, no external dependencies. Understanding how it works requires three distinct areas: SVG arc geometry, the stroke-dasharray fill technique, and CSS transform-based needle animation.\n\n## SVG Arc Geometry and the Path A Command\n\nEvery gauge is a semicircle rendered with an SVG \`<path>\` element using the arc command: \`M x1 y1 A rx ry x-rotation large-arc-flag sweep-flag x2 y2\`. The specific path \`d="M 20 100 A 80 80 0 0 1 180 100"\` breaks down as: start point (20, 100) — the left end of the semicircle, which is center-x (100) minus radius (80); end point (180, 100) — center-x plus radius; radii 80 80 for a circle; x-rotation 0; large-arc-flag 0 for the shorter arc; sweep-flag 1 for clockwise direction. Together this draws the upper semicircle from left to right across the viewBox.\n\nThe SVG viewBox is set to "0 0 200 120" — 200 units wide, 120 tall. Center is at (100, 100) with 20px padding on each side and 20px of space below center for the flat base. The gauge arc spans the full width from x=20 to x=180.\n\n## Color Zone Arcs\n\nRather than computing zone boundaries mathematically at render time, the snippet uses three pre-drawn arc path elements as a permanent background layer. \`.zone-low\` covers the left third (0–33%), \`.zone-mid\` the center third, and \`.zone-high\` the right third. Each is a separate \`<path>\` with a distinct stroke color (dark green, amber, dark red) and opacity 0.5, sitting behind the progress fill arc and providing a constant visual reference for threshold zones. Tick mark \`<line>\` elements at the two zone boundaries angle outward from the arc edge to give precise visual dividers.\n\n## The stroke-dasharray Fill Technique\n\nThe progress fill is the same full semicircle path, but uses \`stroke-dasharray\` to reveal only the filled portion. The total arc length of a semicircle with radius 80 is π × 80 ≈ 251.3 pixels — stored as \`ARC_CIRCUMFERENCE = Math.PI * R\`.\n\nTo show a gauge at 73%, the code sets: \`stroke-dasharray: "183.9 68.4"\` — a 183.9px dash (73% × 251.3) followed by a 68.4px gap. The CSS transition \`transition: stroke-dashoffset 0.85s cubic-bezier(0.4, 0, 0.2, 1)\` on \`.gauge-fill\` animates the fill change. The cubic-bezier produces a Material Design ease-out: fast initial movement, gentle deceleration. This is the same technique used by every SVG progress ring and circular chart on the web, generalized here to a semicircle.\n\n## The Needle: CSS Transform Rotation Without a JS Tween\n\nThe needle is an SVG \`<g>\` group element containing a \`<line>\` from center (100,100) to top (100,28) and a \`<circle>\` hub. The group has \`style="transform-origin:100px 100px"\` inline — pinning rotation to the SVG center point. The CSS class \`.needle-group\` declares the same transition as the fill arc. When JavaScript sets \`needleEl.style.transform = \\\`rotate(\${angle}deg)\\\`\`, the browser handles the smooth rotation entirely via CSS — no JavaScript animation loop for the needle movement itself.\n\n\`needleAngle(pct)\` maps 0–100% to −90°–+90°: \`−90 + pct × 180\`. At 0% the needle points left (−90°). At 50% it points straight up (0°). At 100% it points right (+90°), covering the full 180° span of the semicircle.\n\n## The Double-rAF Initialization Pattern\n\nOn page load, gauges should appear at their starting values instantly — no animation from 0%. The \`initGauges()\` function uses a specific three-step pattern: (1) set \`fillEl.style.transition = 'none'\` and \`needleEl.style.transition = 'none'\` to disable transitions; (2) call \`updateGauge()\` to render the starting state; (3) restore transitions inside \`requestAnimationFrame(() => requestAnimationFrame(() => { fillEl.style.transition = ''; }))\`.\n\nA single requestAnimationFrame is insufficient — the browser may batch style computations and apply the transition before the initial paint completes. Two nested rAF calls guarantee the restore happens after at least one committed paint frame. This double-rAF pattern is the standard solution for "set initial value without triggering the enter animation" and appears in production component libraries including React Transition Group.\n\n## requestAnimationFrame Counter Animation\n\nThe center value \`<text>\` element shows the numeric percentage. When a gauge updates, \`animateCounter(el, from, to, duration)\` counts from the old value to the new value over 850ms using quadratic ease-in-out: \`t < 0.5 ? 2t² : −1 + (4−2t)t\`. This easing mirrors the needle and arc CSS transitions, making the number, arc, and needle feel synchronized.\n\nEach call creates its own closure over \`from\`, \`to\`, and \`start\` (from \`performance.now()\`). Multiple counters can run simultaneously without conflict. The loop calls \`requestAnimationFrame(step)\` until \`t >= 1\`, then stops — no cleanup needed.\n\n## Multi-Gauge Composition and DOM Conventions\n\nThe three gauges follow a consistent id convention: \`fill-{id}\`, \`needle-{id}\`, and \`val-{id}\`. The \`updateGauge(id, value, animate)\` function locates elements via \`document.getElementById('fill-' + id)\`. Adding a fourth gauge requires only: a new HTML gauge-card with matching ids, and a new entry in the \`GAUGES\` object. The grid uses CSS Grid \`repeat(3, 1fr)\` with a \`max-width: 600px\` responsive single-column fallback via a \`@media\` query.\n\n## Connecting to Live Data\n\nReplace the preset buttons with: \`setInterval(async () => { const { cpu, memory, disk } = await fetch('/api/metrics').then(r => r.json()); updateGauge('cpu', cpu, true); updateGauge('memory', memory, true); updateGauge('disk', disk, true); }, 5000)\`. For WebSocket push: \`ws.onmessage = e => { const d = JSON.parse(e.data); updateGauge(d.id, d.value, true); }\`. The animation system handles rapid updates — calling \`updateGauge\` mid-animation simply updates the target, restarting from the current visual position.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the dashboard', text: 'Three gauges render instantly at their starting values — CPU at 73%, Memory at 48%, Disk at 61%. No loading animation because the double-rAF init pattern sets values before transitions are enabled.' },
        { title: 'Click a preset button', text: 'Click Low, Medium, or High beneath any gauge. The needle rotates, the arc fill animates, and the center counter counts up or down — all three synchronized via the same cubic-bezier easing.' },
        { title: 'Read the color zones', text: 'The arc background shows three bands: green (0–33%), amber (33–66%), red (66–100%). The fill arc and needle hub color update automatically via getColor(pct) based on the new value.' },
        { title: 'Call updateGauge() from your code', text: 'Call updateGauge(\'cpu\', 91, true) from anywhere to update a gauge programmatically. The second argument is the new percentage (0–100). The third enables animation.' },
        { title: 'Feed live API data', text: 'Wrap updateGauge() in a setInterval with a fetch call to your metrics endpoint. The animation handles any update frequency — multiple rapid updates restart from the current visual position.' },
        { title: 'Add or customize gauges', text: 'Copy a gauge-card HTML block, assign matching ids (fill-X, needle-X, val-X), add an entry to the GAUGES object, and update the grid-template-columns count. No core functions need changing.' },
      ],
    },
    features: [
      'SVG arc path: M 20 100 A 80 80 0 0 1 180 100 — semicircle, center (100,100), radius 80, 180° span',
      'stroke-dasharray fill: dash = pct × ARC_CIRCUMFERENCE (π×R) reveals exactly the right arc length',
      'CSS needle rotation: transform:rotate(Xdeg) on SVG group, transform-origin:100px 100px — zero JS tween',
      'Three zone arcs: zone-low/mid/high path elements as permanent background, opacity 0.5',
      'Color threshold: getColor(pct) returns green/amber/red hex — applied to fill stroke and needle hub',
      'requestAnimationFrame counter: quadratic ease-in-out, performance.now() timing, multiple counters concurrent',
      'Double-rAF init: disable transitions → render → restore after 2 rAF frames — no cold-start animation',
      'Three-gauge CSS Grid dashboard: repeat(3,1fr) with max-width 600px responsive single-column fallback',
      'Zero dependencies: pure SVG path math, CSS transitions, vanilla JS — no Chart.js, D3, or canvas',
    ],
    useCases: [
      { icon: 'CHART', title: 'Server & Infrastructure Monitoring', desc: 'CPU, memory, disk, and network I/O gauges in one dashboard view — the classic DevOps pattern used by Datadog, Grafana, and Prometheus UIs. Call updateGauge() on a polling interval to show live server metrics. Pair with a [line chart widget](/ui-snippets/line-chart-widget/) for historical trend data alongside the real-time dial.' },
      { icon: 'STAR', title: 'Lighthouse & Performance Scores', desc: 'Display Lighthouse performance, accessibility, and SEO scores as animated dials. The 0–100 range and green/amber/red zones align with Lighthouse\'s own pass/warn/fail thresholds. Embed in a CI pipeline results page to make build quality immediately scannable.' },
      { icon: 'APP', title: 'Health & Fitness Tracking', desc: 'Heart rate zones, VO2 max percentage, hydration level, or sleep quality as animated dials. The arc animation is especially satisfying for fitness metrics that update from a wearable API. Combine with an [activity heatmap](/ui-snippets/activity-heatmap/) for daily-level history alongside the current reading.' },
      { icon: 'PEOPLE', title: 'NPS & Customer Satisfaction', desc: 'Display Net Promoter Score (0–100) with color zones for detractors (red), passives (amber), and promoters (green). More intuitive than a raw number in a stat card. Pair with a [bar chart](/ui-snippets/bar-chart/) to show NPS trend over the last 12 months alongside the current dial.' },
      { icon: 'MONEY', title: 'Sales Quota & Goal Tracking', desc: 'Percentage of monthly revenue quota reached. Red means behind target, green means on track. Sales reps check at a glance during their morning standup without needing to parse a table of numbers. Add a count-up number beneath the gauge for absolute deal value alongside the percentage.' },
      { icon: 'GLOBAL', title: 'IoT Sensor & Device Dashboards', desc: 'Temperature, pressure, battery level, signal strength, or tank fill-level from hardware sensor APIs. Feed live WebSocket data into updateGauge() for real-time needle movement. The double-rAF init means the gauge snaps to the current reading on load without an unwanted animation from zero.' },
    ],
    faqs: [
      { q: 'How does the stroke-dasharray arc fill technique work?', a: 'The gauge-fill path is drawn as the full semicircle. ARC_CIRCUMFERENCE = Math.PI * R (≈251.3px for radius 80) is the total stroke length of that path. Setting stroke-dasharray to "183.9 68.4" creates a dash of 183.9px (73% × 251.3) followed by a 68.4px gap. SVG draws that dash along the path, so 73% of the arc is stroked and the rest is invisible. CSS transition: stroke-dashoffset animates the change smoothly when you update the dasharray values.' },
      { q: 'How does the needle rotate without a JavaScript animation library?', a: 'The needle group has transform-origin: 100px 100px (the SVG center) set inline, and CSS transition: transform 0.85s cubic-bezier(0.4,0,0.2,1) in the stylesheet. JavaScript just sets needleEl.style.transform = `rotate(${angle}deg)`. The browser handles the smooth interpolation entirely via CSS — no requestAnimationFrame loop, no JS tween, no animation library needed.' },
      { q: 'How do I change the arc span to 270° instead of 180°?', a: 'Change ARC_CIRCUMFERENCE to 1.5 * Math.PI * R. Update the hardcoded path d values for the background track and color zone arcs to span 270°. In describeArc(), change the startAngle from Math.PI to 2.356 (135°) and the full sweep from Math.PI to 4.712 (270°). Also update needleAngle() — for 270° span: -135 + pct * 270 — and set transform-origin to the new SVG center.' },
      { q: 'Why does the initial render use two nested requestAnimationFrame calls?', a: 'One rAF fires before the browser paints but after style computation. If transitions are restored after one rAF, the browser may still apply the transition to the just-set value and animate from 0%. Two nested rAF calls guarantee the first paint has completed and the browser has committed the no-transition state to screen before transitions are restored. This is the standard fix for "set initial state without triggering entry animation."' },
      { q: 'How do I feed live WebSocket data into the gauges?', a: 'const ws = new WebSocket(\'wss://your-api/metrics\'); ws.onmessage = e => { const { id, value } = JSON.parse(e.data); updateGauge(id, value, true); }; The id must match a key in the GAUGES object (\'cpu\', \'memory\', \'disk\'). The animation system handles rapid updates — calling updateGauge while an animation is running restarts the counter from its current displayed value, preventing any jump.' },
      { q: 'Can I use this gauge chart in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular, or Tailwind export buttons on this page. In React, pass the gauge value as a prop and compute the needle rotation and arc dashoffset from it during render — the CSS transition animates the change automatically, no imperative animation code needed.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to derive the arc trigonometry from scratch to trust it. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how describeArc computes the start and end points from the percentage using cosine and sine, and why the double-nested requestAnimationFrame in initGauges is necessary to avoid an unwanted animate-from-zero effect on first paint. The same assistant can help optimize it — ask whether the needleAngle and getColor functions could be unified into one config object per gauge instead of three separate parallel functions, and whether the quadratic ease-in-out counter animation is redundant given the CSS transition already handles the needle and arc. It's also useful for extending the chart: ask it to change the arc span from a semicircle to 270 degrees, wire updateGauge to a live WebSocket feed with reconnect handling, or add a fourth gauge for network throughput that reuses all the existing math unchanged. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an animated SVG gauge chart (speedometer) in plain HTML, CSS, and JavaScript using arc trigonometry and the stroke-dasharray technique — no charting library, no canvas.

Requirements:
- A semicircular SVG path drawn with the arc command, spanning exactly 180 degrees between a fixed center point and radius, representing the gauge's background track, with a matching full-length progress arc path layered on top of it.
- A function that converts a percentage value into an SVG arc path string (or dasharray value) using cosine and sine to compute the arc's endpoint coordinates from the center, radius, and the angle corresponding to that percentage — not a hardcoded set of preset paths.
- Reveal only the correct fraction of the progress arc using the stroke-dasharray technique: compute the arc's total circumference once (pi times radius for a semicircle), then set the dash length to the target percentage times that circumference and the gap to the remainder.
- A separate needle element (a line plus a circular hub) grouped so it rotates around the gauge's exact center point via a CSS transform, with its rotation angle computed as a linear mapping from the value percentage to a rotation range spanning the full arc (for example negative 90 degrees at 0 percent to positive 90 degrees at 100 percent).
- Both the arc fill and the needle rotation must use CSS transitions (not a JavaScript animation loop) so the browser interpolates the visual change smoothly whenever the underlying value updates.
- On initial page load, gauges must appear immediately at their starting values with no animation playing in from zero — implement this by temporarily disabling the relevant CSS transitions, setting the initial values, and then re-enabling the transitions only after the browser has had a chance to paint that initial state (using nested requestAnimationFrame calls, not a single one).
- Color the arc and needle hub based on the current value using at least three threshold bands (e.g. safe, caution, danger), and animate the numeric center label by counting up or down between the previous and new value over a fixed duration using an eased requestAnimationFrame loop.
- Support at least three independently updatable gauges on the same page sharing one update function, driven by an id-based naming convention so adding a new gauge requires no changes to the core update logic.`,
    },
  },
};

export default gaugeChart;
