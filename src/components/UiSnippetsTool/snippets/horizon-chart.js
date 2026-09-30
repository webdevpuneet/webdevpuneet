const horizonChart = {
  id: 'horizon-chart',
  title: 'Horizon Chart',
  category: 'charts',
  html: `<div class="app">
  <div class="card">
    <div class="card-header">
      <h3>Server CPU Load — 6 Hosts, 1 Week</h3>
      <p class="sub">Each band folds the value range into overlapping color layers, so six full time series fit in the space of six thin sparklines.</p>
    </div>
    <div class="chart-wrap" id="chartWrap"></div>
    <div class="hz-legend">
      <span class="hz-legend-label">Low</span>
      <div class="hz-legend-strip" id="legendStrip"></div>
      <span class="hz-legend-label">High</span>
    </div>
  </div>
</div>`,
  css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #f8fafc; font-family: system-ui, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
.app { width: 100%; max-width: 640px; }
.card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; box-shadow: 0 12px 30px rgba(30,41,59,0.06); }
.card-header { margin-bottom: 12px; }
h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
.sub { font-size: 12px; color: #94a3b8; margin-top: 3px; line-height: 1.5; }
.chart-wrap { display: flex; flex-direction: column; gap: 1px; border-top: 1px solid #f1f5f9; }
.hz-row { display: flex; align-items: center; gap: 10px; }
.hz-row-label { width: 54px; flex-shrink: 0; font-size: 11px; font-weight: 700; color: #475569; text-align: right; }
.hz-row-band { flex: 1; display: block; overflow: visible; border-bottom: 1px solid #f1f5f9; }
.hz-legend { display: flex; align-items: center; gap: 8px; justify-content: center; margin-top: 16px; }
.hz-legend-label { font-size: 10px; color: #94a3b8; font-weight: 700; }
.hz-legend-strip { width: 140px; height: 10px; border-radius: 4px; }`,
  js: `const NS = 'http://www.w3.org/2000/svg';
const wrap = document.getElementById('chartWrap');
const legendStrip = document.getElementById('legendStrip');

const HOSTS = ['web-01', 'web-02', 'db-primary', 'db-replica', 'cache-01', 'worker-03'];
const BANDS = 4; // how many color layers each row folds the range into
const POINTS = 168; // hourly samples across 1 week
const W = 560, ROW_H = 34;

// Color ramp from cool (low) to hot (high), one hue per fold band.
const RAMP = ['#c7d2fe', '#93c5fd', '#fca5a5', '#f87171', '#b91c1c'];

function el(tag, attrs) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

// Generate a plausible CPU-load-like series: a daily cycle plus a slow drift
// plus noise, clamped to 0-100.
function genSeries(seed) {
  const out = [];
  let level = 20 + seed * 6;
  for (let i = 0; i < POINTS; i++) {
    const hourOfDay = i % 24;
    const dailyCycle = Math.sin((hourOfDay - 8) / 24 * Math.PI * 2) * 22 + 22;
    level += (Math.random() - 0.5) * 4;
    level = Math.max(2, Math.min(60, level));
    const spike = Math.random() < 0.02 ? 25 + Math.random() * 30 : 0;
    out.push(Math.max(0, Math.min(100, level + dailyCycle * 0.5 + spike)));
  }
  return out;
}

function buildLegend() {
  legendStrip.style.background = \`linear-gradient(90deg, \${RAMP.join(',')})\`;
}

function drawRow(values, bandHeight) {
  const svg = el('svg', { class: 'hz-row-band', viewBox: \`0 0 \${W} \${ROW_H}\`, preserveAspectRatio: 'none' });
  const maxVal = 100;
  const bandValue = maxVal / BANDS; // value range folded into each band
  const stepX = W / (values.length - 1);

  // For each band, redraw the full line but shifted up by (band * bandHeight),
  // clipped to the row's height. Where the raw value exceeds a lower band's
  // ceiling, that band's area still fills fully (since it's clipped), and
  // the next band's overlaid layer shows the "overflow" portion on top —
  // this folding is exactly what makes a horizon chart compact: N bands of
  // color communicate what would otherwise take N times the vertical space.
  for (let b = 0; b < BANDS; b++) {
    const clipId = 'clip-' + Math.random().toString(36).slice(2, 9);
    const clipPath = el('clipPath', { id: clipId });
    clipPath.appendChild(el('rect', { x: 0, y: 0, width: W, height: ROW_H }));
    svg.appendChild(clipPath);

    const bandFloor = b * bandValue;
    const points = values.map((v, i) => {
      const x = i * stepX;
      const shifted = Math.max(0, v - bandFloor); // how far above this band's floor
      const y = ROW_H - (shifted / bandValue) * ROW_H;
      return \`\${x.toFixed(1)},\${Math.max(-ROW_H, y).toFixed(1)}\`;
    });

    const areaPath = \`M 0,\${ROW_H} L \${points.join(' L ')} L \${W},\${ROW_H} Z\`;
    const path = el('path', {
      d: areaPath,
      fill: RAMP[b],
      'fill-opacity': (0.85 - b * 0.05).toFixed(2),
      'clip-path': \`url(#\${clipId})\`,
    });
    svg.appendChild(path);
  }

  return svg;
}

function draw() {
  wrap.innerHTML = '';
  buildLegend();
  HOSTS.forEach((host, i) => {
    const series = genSeries(i);
    const row = document.createElement('div');
    row.className = 'hz-row';
    const label = document.createElement('div');
    label.className = 'hz-row-label';
    label.textContent = host;
    row.appendChild(label);
    const svg = drawRow(series, ROW_H / BANDS);
    const title = document.createElementNS(NS, 'title');
    const peak = Math.round(Math.max(...series));
    const avg = Math.round(series.reduce((a, b) => a + b, 0) / series.length);
    title.textContent = \`\${host}: avg \${avg}%, peak \${peak}%\`;
    svg.insertBefore(title, svg.firstChild);
    row.appendChild(svg);
    wrap.appendChild(row);
  });
}

draw();`,
  seo: {
    title: 'Horizon Chart — Free HTML CSS JS Snippet',
    description: 'A compact horizon chart that folds each time series into overlapping color bands using SVG clip-paths, fitting many dense series into minimal vertical space. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Horizon Chart — Folded Color-Band Time Series in Minimal Vertical Space',
      description: `A horizon chart is a space-efficient technique for displaying many dense time series at once by "folding" each series' value range into a small number of overlapping color bands, instead of giving every series its own full-height area chart. The result looks unusual at first — thin colored stripes rather than familiar peaks and valleys — but it lets six, twelve, or dozens of series stack in the vertical space that a handful of ordinary [Area Charts](/ui-snippets/area-chart/) would need, which is exactly why monitoring dashboards (server metrics, sensor arrays, financial time series) use the technique when screen space is scarce and dozens of series must be compared at a glance.

**The folding technique, concretely**

For a row with \`BANDS = 4\` color bands and a value range of 0-100, the value range is divided into four equal slices (0-25, 25-50, 50-75, 75-100). Rather than compressing the whole 0-100 range into the row's height (which would make small values invisible), each band redraws the *entire* series as its own area, but shifted so that band's floor value sits at the row's bottom — \`shifted = Math.max(0, v - bandFloor)\`. A value of 60 therefore appears as "full height" in band 0 (0-25, clipped since it exceeds the band), still substantial in band 1 (25-50, also clipped), and correctly partial in band 2 (50-75) — every band below the value's actual band renders as a full, clipped block of its own color, and the topmost relevant band shows the "remainder." Layering these clipped bands with decreasing opacity per band is what produces the characteristic banded-color read: deeper/more saturated color visible through more layers signals a higher value.

**Why SVG clip-paths do the heavy lifting**

Each band is drawn as a full-height area path that would otherwise overflow the row (since a shifted value can go far above the row's actual pixel height), then constrained with \`clip-path: url(#clipId)\` referencing a \`<clipPath>\` containing a simple rect matching the row's exact bounds. This is what turns an oversized, overflowing shape into a correctly-cropped band — without the clip-path, higher bands would draw far outside the intended row and overlap neighboring rows.

**Reading a horizon chart**

Once the eye adjusts, the technique reads quickly: a row that stays a light, single color the whole width was consistently low; a row that frequently shows the darkest red band was frequently near its maximum; a sudden burst of dark color in an otherwise light row is a spike. The legend strip beneath the chart shows the same color ramp used per band, from the coolest (lowest) to the hottest (highest) fold.

**Synthesizing realistic per-host CPU data**

\`genSeries(seed)\` is not pure random noise — it layers a slow random-walk "level," a daily sinusoidal cycle (higher during work hours, matching real server load patterns), and occasional random spikes, clamped to a 0-100 range, so each of the six simulated hosts in the demo produces a visually distinct but plausible week of hourly CPU-load data.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read color depth as magnitude', text: 'A row showing only the lightest band color stayed low the whole period; darker, more saturated color means the value climbed into higher bands.' },
        { title: 'Compare rows at a glance', text: 'Because each row is compressed to a single thin strip, scanning down the list of hosts quickly reveals which ones ran consistently hot versus consistently light.' },
        { title: 'Hover a row for exact numbers', text: 'Each row carries a native tooltip reporting that host\'s average and peak value across the full period.' },
        { title: 'Adjust the number of fold bands', text: 'Change the BANDS constant — more bands give finer color gradation per row at the cost of more subtle distinctions between adjacent bands.' },
        { title: 'Swap in real time-series data', text: 'Replace genSeries() with your own array of numeric values per row; drawRow() works with any array of the same length across rows.' },
        { title: 'Recolor the ramp', text: 'Edit the RAMP array to any ordered low-to-high color sequence — sequential ramps read best since each band must be visually orderable.' },
      ],
    },
    features: [
      'Folds each full-range time series into overlapping color bands via SVG clip-paths, not a naive height-scaled area chart',
      'Fits six dense hourly time series (168 points each) into a fraction of the vertical space six full area charts would need',
      'Realistic synthesized per-host CPU data: random-walk level, daily sinusoidal cycle, and occasional spikes, not flat noise',
      'Configurable BANDS constant controls fold count and color granularity per row',
      'Sequential color ramp legend shown once beneath the whole chart, shared by every row',
      'Native SVG tooltips report each row\'s average and peak value on hover',
      'Decreasing per-band opacity reinforces which layer is "on top" at any given point',
      'Pure hand-written SVG paths and clip-paths — no charting library',
    ],
    useCases: [
      { icon: 'DASH', title: 'Infrastructure and server monitoring dashboards', desc: 'The canonical use case — compare CPU, memory, or request-rate load across dozens of hosts in the space a handful of line charts would otherwise need.' },
      { icon: 'CHART', title: 'Financial time-series comparison', desc: 'Stack many securities\' price or volatility series compactly, a well-known application of horizon charts in trading dashboards.' },
      { icon: 'DATA', title: 'Sensor and IoT fleet visualization', desc: 'Compare readings (temperature, battery level, signal strength) across a large fleet of devices in one scrollable, compact view.' },
      { icon: 'LEARN', title: 'Teaching SVG clip-path techniques', desc: 'A concrete, practical example of using clip-path to constrain an intentionally-oversized shape, alongside the [Area Chart](/ui-snippets/area-chart/) and [Streamgraph Chart](/ui-snippets/streamgraph-chart/) for comparing area-based chart techniques.' },
      { icon: 'CODE', title: 'Reference for dense small-multiple charting', desc: 'The row-per-series, folded-band pattern generalizes to any dashboard needing to compare many series\' magnitude trends without needing to see their exact numeric shape.' },
    ],
    faqs: [
      { q: 'How does folding actually compress the chart vertically?', a: 'Instead of scaling a value\'s full 0-100 range down to fit the row\'s pixel height (which would make low values nearly invisible), the value range is divided into several equal bands. Each band redraws the entire series shifted so that band\'s floor value sits at the bottom, then clips the result to the row\'s bounds. A high value fills every band below its own fully and shows a partial remainder in its own band, so several bands of color stacked visually communicate the value that a single, tiny-scale line could not show clearly in the same space.' },
      { q: 'Why are SVG clip-paths necessary here?', a: 'Each band\'s shifted area path is drawn at full, potentially oversized height — a value of 90 in the top band could draw far above the row\'s actual pixel bounds. The clip-path (a <clipPath> containing a rect matching the row\'s exact width and height) crops that oversized shape down to exactly the intended row, which is what keeps every band visually confined to its own row instead of overlapping neighboring rows.' },
      { q: 'How is the demo data generated?', a: 'genSeries(seed) combines three signals: a slowly random-walking baseline level, a daily sinusoidal cycle peaking during simulated work hours, and small-probability random spikes, all clamped to a 0-100 range — producing plausible, visually distinct per-host CPU load data across a simulated week of hourly samples.' },
      { q: 'How do I change how many color bands each row folds into?', a: 'Edit the BANDS constant in the JS panel. More bands give finer-grained color distinctions per unit of value but make adjacent bands more subtly different in opacity; fewer bands are bolder but coarser.' },
      { q: 'Can I use this with real monitoring or financial data?', a: 'Yes — replace genSeries() with your own function or static array returning one numeric value per time step for each row. drawRow() only requires an array of numbers and works identically regardless of how that data was produced.' },
      { q: 'Why use a horizon chart instead of just a small line chart per row?', a: 'A thin line chart at a small fixed height loses most of its readability once compressed — you can barely tell peaks from noise. A horizon chart deliberately trades exact shape for a color-coded magnitude read, which stays legible even at a very small row height, making it the better choice specifically when you need to fit many series into limited vertical space.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the shifted-and-clipped area path in drawRow() produces the folded color-band effect, and why the clip-path is essential rather than optional for keeping each band confined to its row. It's also a good candidate for extension — ask it to add a mirrored negative-value band style (horizon charts conventionally use a second color ramp below zero for series that can go negative), add a synchronized crosshair that highlights the same time index across every row on hover, or make the row order sortable by average or peak value.`,
      prompt: `Build a horizon chart in plain HTML, CSS, and JavaScript using inline SVG created with createElementNS — no charting library, no canvas.

Requirements:
- Render several rows, one per named series (e.g. "web-01", "db-primary"), each a single thin horizontal strip (e.g. 30-40px tall) rather than a full-height area chart.
- For each row, divide the series' known value range (e.g. 0-100) into a configurable number of equal-sized "fold bands" (e.g. 4). For each band, draw the row's ENTIRE value series as its own filled area path, shifted vertically so that band's floor value sits at the bottom of the row, then constrain that (intentionally oversized) shape to the row's exact pixel bounds using an SVG clip-path referencing a clipPath element with a rect matching the row's width and height.
- Give each band a distinct color from an ordered low-to-high color ramp, with later (higher-value) bands drawn on top of earlier ones and with a slightly different opacity per band so the layered folding is visually legible.
- Include a data-generation function that produces a realistic multi-day or multi-week hourly time series per row — combine a slowly-drifting baseline, a repeating daily cycle, and occasional randomized spikes, clamped to the known value range, rather than pure uniform random noise.
- Label each row with its series name to the left of its band strip.
- Add a native tooltip (or equivalent) on each row reporting that series' average and peak value across the full period.
- Render a single shared legend strip beneath the whole chart showing the low-to-high color ramp used by every row's bands.`,
    },
  },
};

export default horizonChart;
