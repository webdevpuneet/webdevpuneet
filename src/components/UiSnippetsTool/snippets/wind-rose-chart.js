const windRoseChart = {
  id: 'wind-rose-chart',
  title: 'Wind Rose Chart',
  category: 'charts',
  html: `<div class="app">
  <div class="card">
    <div class="card-header">
      <h3>Wind Speed & Direction — 30-Day Sample</h3>
      <p class="sub">Each spoke is a compass direction. Segment length is frequency; segment color is speed band.</p>
    </div>
    <div class="chart-wrap">
      <svg id="rose" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
    <div class="legend" id="legend"></div>
  </div>
</div>`,
  css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #f8fafc; font-family: system-ui, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
.app { width: 100%; max-width: 520px; }
.card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; box-shadow: 0 12px 30px rgba(30,41,59,0.06); }
.card-header { margin-bottom: 6px; }
h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
.sub { font-size: 12px; color: #94a3b8; margin-top: 3px; }
#rose { width: 100%; display: block; overflow: visible; }
.rose-ring { fill: none; stroke: #eef2f7; stroke-width: 1; }
.rose-ring-label { font-size: 9px; fill: #94a3b8; }
.rose-dir-label { font-size: 11px; font-weight: 700; fill: #64748b; text-anchor: middle; dominant-baseline: middle; }
.rose-spoke { stroke: #eef2f7; stroke-width: 1; }
.rose-seg { stroke: #fff; stroke-width: 1; cursor: pointer; transition: opacity 0.15s; }
.rose-seg:hover { opacity: 0.75; }
.legend { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 14px; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: #475569; }
.legend-swatch { width: 11px; height: 11px; border-radius: 3px; flex-shrink: 0; }`,
  js: `const svg = document.getElementById('rose');
const legendEl = document.getElementById('legend');
const NS = 'http://www.w3.org/2000/svg';

const DIRECTIONS = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
const SPEED_BANDS = [
  { label: '0-5 kt',  color: '#c7d2fe' },
  { label: '5-10 kt', color: '#a5b4fc' },
  { label: '10-15 kt',color: '#818cf8' },
  { label: '15-20 kt',color: '#6366f1' },
  { label: '20+ kt',  color: '#4338ca' },
];

// Synthesize a plausible dataset: a prevailing westerly wind with realistic
// spread, so the rose shows a clear dominant lobe rather than uniform noise.
function genData() {
  const data = DIRECTIONS.map(() => SPEED_BANDS.map(() => 0));
  const prevailingIdx = 12; // W
  const totalObservations = 720; // 30 days * 24 hourly readings
  for (let i = 0; i < totalObservations; i++) {
    // Direction: wrapped-normal-ish around the prevailing direction
    let dirIdx = Math.round(prevailingIdx + gaussian() * 2.6);
    dirIdx = ((dirIdx % DIRECTIONS.length) + DIRECTIONS.length) % DIRECTIONS.length;
    // Speed: gamma-ish positive skew, higher near the prevailing direction
    const distFromPrevail = Math.min(Math.abs(dirIdx - prevailingIdx), DIRECTIONS.length - Math.abs(dirIdx - prevailingIdx));
    const speedBase = 12 - distFromPrevail * 0.9 + gaussian() * 5;
    const speed = Math.max(0.5, speedBase);
    const bandIdx = Math.min(SPEED_BANDS.length - 1, Math.floor(speed / 5));
    data[dirIdx][bandIdx]++;
  }
  return data;
}

function gaussian() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function el(tag, attrs) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

const CX = 240, CY = 240;
const R_MAX = 175, R_MIN = 26;

function polar(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function wedgePath(cx, cy, rInner, rOuter, startDeg, endDeg) {
  const pad = 1.2; // small gap between adjacent spokes
  const a0 = startDeg + pad, a1 = endDeg - pad;
  const [x1, y1] = polar(cx, cy, rOuter, a0);
  const [x2, y2] = polar(cx, cy, rOuter, a1);
  const [x3, y3] = polar(cx, cy, rInner, a1);
  const [x4, y4] = polar(cx, cy, rInner, a0);
  const largeArc = (a1 - a0) > 180 ? 1 : 0;
  return \`M \${x1},\${y1} A \${rOuter},\${rOuter} 0 \${largeArc} 1 \${x2},\${y2} L \${x3},\${y3} A \${rInner},\${rInner} 0 \${largeArc} 0 \${x4},\${y4} Z\`;
}

function draw() {
  svg.innerHTML = '';
  const data = genData();
  const rowTotals = data.map(row => row.reduce((a, b) => a + b, 0));
  const maxTotal = Math.max(...rowTotals);
  const ringSteps = 4;

  // Concentric frequency rings
  for (let i = 1; i <= ringSteps; i++) {
    const r = R_MIN + ((R_MAX - R_MIN) / ringSteps) * i;
    svg.appendChild(el('circle', { class: 'rose-ring', cx: CX, cy: CY, r }));
    const val = Math.round((maxTotal / ringSteps) * i);
    const label = el('text', { class: 'rose-ring-label', x: CX + 4, y: CY - r - 2 });
    label.textContent = val;
    svg.appendChild(label);
  }

  const angleStep = 360 / DIRECTIONS.length;

  // Radial spokes + direction labels
  DIRECTIONS.forEach((dir, i) => {
    const angle = i * angleStep;
    const [x, y] = polar(CX, CY, R_MAX + 6, angle);
    svg.appendChild(el('line', { class: 'rose-spoke', x1: CX, y1: CY, x2: polar(CX, CY, R_MAX, angle)[0], y2: polar(CX, CY, R_MAX, angle)[1] }));
    const label = el('text', { class: 'rose-dir-label', x, y });
    label.textContent = dir;
    svg.appendChild(label);
  });

  // Stacked wedges per direction, one segment per speed band
  DIRECTIONS.forEach((dir, i) => {
    const startAngle = i * angleStep - angleStep / 2;
    const endAngle = i * angleStep + angleStep / 2;
    let rCursor = R_MIN;
    data[i].forEach((count, bandIdx) => {
      if (count === 0) return;
      const segLen = (count / maxTotal) * (R_MAX - R_MIN);
      const rOuter = rCursor + segLen;
      const path = el('path', {
        class: 'rose-seg',
        d: wedgePath(CX, CY, rCursor, rOuter, startAngle, endAngle),
        fill: SPEED_BANDS[bandIdx].color,
      });
      const title = el('title', {});
      title.textContent = \`\${dir}, \${SPEED_BANDS[bandIdx].label}: \${count} readings\`;
      path.appendChild(title);
      svg.appendChild(path);
      rCursor = rOuter;
    });
  });

  legendEl.innerHTML = '';
  SPEED_BANDS.forEach(band => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = \`<span class="legend-swatch" style="background:\${band.color}"></span>\${band.label}\`;
    legendEl.appendChild(item);
  });
}

draw();`,
  seo: {
    title: 'Wind Rose Chart — Free HTML CSS JS Snippet',
    description: 'A hand-drawn SVG wind rose plotting direction frequency as stacked radial wedges colored by speed band, built from raw observation data with no charting library. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Wind Rose Chart — Stacked Radial Wedges by Compass Direction & Speed Band',
      description: `A wind rose is a specialized polar chart used in meteorology to show two things about wind at once: how often it blows from each compass direction, and how fast it typically blows from that direction. Sixteen spokes radiate from the center, one per compass point (N, NNE, NE, and so on), and each spoke's length encodes how frequently wind was observed from that direction — while the spoke itself is subdivided into colored segments representing how much of that frequency fell into each speed band, from calm to strong. This snippet renders one entirely from raw synthesized observation data with hand-written SVG, no charting library, and is structurally distinct from a plain [Polar Area Chart](/ui-snippets/polar-area-chart/) because every wedge is itself a *stacked* bar in polar space rather than a single flat radius.

**Why this differs from a polar area chart**

A standard polar area chart maps one value to each spoke's length. A wind rose maps a whole *distribution* to each spoke — the direction's total frequency is split across speed bands and stacked outward from the center, so the chart simultaneously answers "how often does wind come from the northwest" and "when it does, how strong is it usually." \`wedgePath()\` draws each stacked segment as its own annular wedge, with \`rCursor\` tracked per-direction so each band's inner radius picks up exactly where the previous band's outer radius left off — the polar-coordinate equivalent of a stacked bar chart's running total.

**Synthesizing directionally realistic sample data**

\`genData()\` does not pick random values independently per direction; it simulates 720 individual hourly wind observations (30 days), each with a direction drawn from a wrapped Gaussian centered on a "prevailing" westerly direction and a speed that is systematically higher near that same prevailing direction and lower further from it. This produces a dataset with the kind of directional skew and speed correlation real wind-rose data actually has — a single dominant lobe with realistic spread — rather than sixteen independent random numbers that would never resemble genuine meteorological data.

**Wedge geometry with an inner radius hole**

Every segment is built as a proper polar annular wedge via \`wedgePath(cx, cy, rInner, rOuter, startDeg, endDeg)\`, which draws an SVG arc path along the outer radius, a straight line down to the inner radius, and a second arc back along the inner radius to close the shape. A small fixed \`R_MIN\` inner radius keeps every spoke's innermost segment from starting at a single point at the center, matching how printed wind roses always leave a small open hub in the middle rather than converging every wedge to a point.

**A small angular gap for spoke separation**

Each wedge is inset by a small \`pad\` value in degrees on both edges before the arc is drawn, so adjacent direction wedges never touch — a small but important detail, since without it, sixteen abutting wedges of similar color read as one continuous ring rather than sixteen distinct directional slices.

**Concentric frequency rings as the radial scale**

Faint concentric circles behind the wedges, each labeled with the frequency value it represents, give the radial axis a readable scale — computed by dividing the maximum observed direction total into four even rings, exactly analogous to horizontal gridlines on a standard bar chart's value axis, just wrapped into a circle.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read spoke length as frequency', text: 'A longer spoke in a given compass direction means wind was observed from that direction more often.' },
        { title: 'Read segment color as speed band', text: 'Each stacked segment within a spoke is colored by how fast the wind was blowing during those observations — check the legend below the chart.' },
        { title: 'Find the prevailing direction', text: 'The longest overall spoke (here, roughly west) shows the dominant wind direction across the sample period.' },
        { title: 'Hover any segment for exact counts', text: 'A native SVG tooltip reports the direction, speed band, and observation count for that specific wedge segment.' },
        { title: 'Swap in real observation data', text: 'Replace genData() with your own array of [direction][speedBand] observation counts, keeping the same 16-direction x 5-band shape.' },
        { title: 'Adjust the speed bands', text: 'Edit the SPEED_BANDS array to change the number, labels, or color of speed categories — the chart rebuilds around whatever bands you define.' },
      ],
    },
    features: [
      'Sixteen-direction compass rose with stacked, color-coded speed-band segments per spoke',
      'Realistic synthesized dataset: 720 simulated hourly observations with correlated direction and speed, not independent random noise',
      'Polar annular wedge geometry (wedgePath) with a proper inner-radius hub, matching real meteorological wind roses',
      'Small angular padding between adjacent wedges keeps direction slices visually distinct',
      'Concentric labeled frequency rings provide a readable radial scale, computed from the actual data maximum',
      'Native SVG tooltips report exact direction, speed band, and observation count per segment on hover',
      'Color-coded legend for every speed band rendered separately from the chart itself',
      'No charting library — pure hand-written SVG path and arc geometry',
    ],
    useCases: [
      { icon: 'CHART', title: 'Meteorological and climate dashboards', desc: 'The canonical use case — visualize prevailing wind direction and speed distribution for a weather station, airport, or sailing forecast site.' },
      { icon: 'DATA', title: 'Environmental and renewable-energy reporting', desc: 'Wind farm siting and turbine-orientation reports commonly use wind roses to justify placement decisions based on prevailing conditions.' },
      { icon: 'DASH', title: 'Any direction-plus-magnitude dataset', desc: 'The same stacked-polar-wedge technique generalizes to any data with a directional/categorical axis and a secondary magnitude breakdown, not only wind.' },
      { icon: 'LEARN', title: 'Teaching stacked polar geometry', desc: 'A concrete, non-trivial companion to the [Radial Bar Chart](/ui-snippets/radial-bar-chart/) and [Polar Area Chart](/ui-snippets/polar-area-chart/) for comparing single-value versus stacked polar encodings.' },
      { icon: 'CODE', title: 'Reference for from-scratch polar chart geometry', desc: 'The polar()/wedgePath() coordinate math is small, dependency-free, and reusable for any custom radial visualization needing precise arc and wedge control.' },
    ],
    faqs: [
      { q: 'How is a wind rose different from a standard polar area chart?', a: 'A polar area chart maps one value to each spoke\'s length. A wind rose maps a full distribution to each spoke: the direction\'s total frequency is split into speed bands and drawn as stacked annular wedges outward from the center, so each spoke shows both how often and how strongly wind blew from that direction.' },
      { q: 'How is the sample data generated?', a: 'genData() simulates 720 individual hourly wind observations. Each observation\'s direction is drawn from a wrapped Gaussian distribution centered on a prevailing westerly direction, and its speed is generated with a base value that decreases with angular distance from that prevailing direction plus Gaussian noise — producing directionally realistic, correlated sample data instead of independent random values per direction.' },
      { q: 'What does the inner radius (R_MIN) represent?', a: 'It is a fixed minimum radius that every spoke\'s wedges start from, leaving a small open hub at the chart\'s center instead of every wedge converging to a single point — matching the visual convention of printed meteorological wind roses.' },
      { q: 'How do I plug in real wind observation data?', a: 'Replace the genData() function with your own logic that returns a 2D array shaped [direction][speedBand], where each entry is the observation count for that direction and speed band combination — the same shape genData() already produces, so no other code needs to change.' },
      { q: 'Can I change the number of compass directions or speed bands?', a: 'Yes — edit the DIRECTIONS array (commonly 8, 16, or 32 directions in real wind roses) and the SPEED_BANDS array (label and color per band). Both wedgePath() and the ring/spoke drawing logic use these arrays\' lengths directly rather than hardcoded counts.' },
      { q: 'Why is there a small gap between adjacent wedges?', a: 'The pad value in wedgePath() insets each wedge\'s start and end angle by a small amount before drawing the arc, so neighboring direction wedges never touch. Without this gap, wedges of similar color at adjacent directions would visually blur into one continuous ring instead of reading as sixteen distinct directional slices.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how wedgePath() draws a stacked annular segment using two SVG arc commands and a connecting line, and how rCursor tracks the running stacked radius per direction the same way a stacked bar chart tracks a running stacked height. It's also a good candidate for extension — ask it to add a toggle between a "frequency" view (current) and a "calm percentage" center annotation, animate the wedges growing outward from the center on load, or add a direction-filter feature that dims every spoke except the one hovered or clicked.`,
      prompt: `Build a wind rose chart in plain HTML, CSS, and JavaScript using inline SVG created with createElementNS — no charting library, no canvas.

Requirements:
- Represent wind observation data as counts broken down by 16 compass directions (N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW) and a small number of speed bands (e.g. five bands from calm to strong).
- Include a data-generation function that simulates several hundred individual wind observations, each with a randomly drawn direction correlated around one "prevailing" direction (not uniform random) and a speed that is systematically higher near that prevailing direction, so the resulting dataset has a realistic dominant directional lobe.
- For each of the 16 directions, draw a radial spoke as a stack of annular polar wedges — one wedge per speed band present in that direction — where each wedge's inner radius equals the previous band's outer radius (a running stacked radius per direction, analogous to a stacked bar chart's running stacked height), and the outer radius is proportional to that band's observation count relative to the busiest direction's total.
- Give every wedge a small inner-radius floor so wedges start from a small open hub at the center rather than converging to a single point, and leave a small angular gap between adjacent direction wedges so they never visually merge.
- Draw labeled concentric circles behind the wedges representing evenly-spaced frequency values, computed from the actual maximum direction total in the dataset, to serve as a readable radial scale.
- Label each of the 16 spokes with its compass direction abbreviation just outside the outermost ring.
- Add a native tooltip (or equivalent) on each wedge segment reporting its direction, speed band, and observation count.
- Render a separate color-coded legend below the chart mapping each speed band to its wedge color.`,
    },
  },
};

export default windRoseChart;
