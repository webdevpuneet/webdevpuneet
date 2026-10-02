const skillsAssessmentRadar = {
  id: 'skills-assessment-radar',
  title: 'Skills Assessment Radar Chart',
  lastmod: '2026-08-22',
  category: 'charts',
  cdnUrls: [],
  html: `<div class="sar-card">
  <div class="sar-head">
    <h2>Skills assessment</h2>
    <p class="sar-sub">Alex Morgan &middot; Senior Frontend Engineer candidate</p>
  </div>
  <div class="sar-chart-wrap">
    <svg class="sar-svg" id="sarSvg" viewBox="0 0 320 320"></svg>
  </div>
  <ul class="sar-legend" id="sarLegend">
    <li><span class="sar-dot" style="background:#6d5efc"></span>Candidate score</li>
    <li><span class="sar-dot sar-dot--outline"></span>Role benchmark</li>
  </ul>
</div>`,

  css: `*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#0c0e15;color:#e7e9f2;padding:40px 16px;display:flex;justify-content:center;min-height:100vh;align-items:center}
.sar-card{width:100%;max-width:460px;background:#12141f;border:1px solid #23273a;border-radius:18px;padding:26px}
.sar-head h2{margin:0 0 4px;font-size:19px}
.sar-sub{margin:0 0 10px;color:#9aa0b8;font-size:13px}
.sar-chart-wrap{display:flex;justify-content:center}
.sar-svg{width:100%;max-width:320px;height:auto}
.sar-axis-line{stroke:#23273a;stroke-width:1}
.sar-grid-ring{fill:none;stroke:#1c2032;stroke-width:1}
.sar-benchmark{fill:rgba(34,211,238,.08);stroke:#22d3ee;stroke-width:1.5;stroke-dasharray:4 3}
.sar-score{fill:rgba(109,94,252,.28);stroke:#6d5efc;stroke-width:2}
.sar-point{fill:#6d5efc;stroke:#0c0e15;stroke-width:2}
.sar-label{fill:#c7cade;font-size:11px;font-family:system-ui,sans-serif;text-anchor:middle}
.sar-legend{list-style:none;display:flex;gap:18px;justify-content:center;padding:14px 0 0;margin:0;border-top:1px solid #20232f}
.sar-legend li{display:flex;align-items:center;gap:6px;font-size:12px;color:#9aa0b8}
.sar-dot{width:9px;height:9px;border-radius:50%;display:inline-block}
.sar-dot--outline{background:transparent;border:1.5px dashed #22d3ee}`,

  js: `const axes = [
  { label: 'Communication', score: 4, benchmark: 3.5 },
  { label: 'Technical', score: 4.7, benchmark: 4 },
  { label: 'Leadership', score: 3, benchmark: 3.2 },
  { label: 'Problem Solving', score: 4.5, benchmark: 3.8 },
  { label: 'Collaboration', score: 4.2, benchmark: 3.6 },
  { label: 'Adaptability', score: 3.6, benchmark: 3.4 },
];
const maxValue = 5;
const axisCount = axes.length;
const size = 320;
const center = size / 2;
const maxRadius = 110;
const svg = document.getElementById('sarSvg');
const svgNs = 'http://www.w3.org/2000/svg';

// angle for axis i, starting straight up and going clockwise
function angleFor(index) {
  return index * (2 * Math.PI / axisCount) - Math.PI / 2;
}

// convert a value on a given axis into an absolute {x, y} point
function pointFor(index, value) {
  const angle = angleFor(index);
  const r = (value / maxValue) * maxRadius;
  return {
    x: center + r * Math.cos(angle),
    y: center + r * Math.sin(angle),
  };
}

function pointsAttr(values) {
  return values.map((v, i) => {
    const p = pointFor(i, v);
    return p.x.toFixed(2) + ',' + p.y.toFixed(2);
  }).join(' ');
}

function makeEl(tag, attrs) {
  const el = document.createElementNS(svgNs, tag);
  Object.keys(attrs).forEach((k) => el.setAttribute(k, attrs[k]));
  return el;
}

// background grid rings at 20/40/60/80/100% of maxRadius
[0.2, 0.4, 0.6, 0.8, 1].forEach((frac) => {
  const ringPoints = axes.map((_, i) => {
    const p = pointFor(i, maxValue * frac);
    return p.x.toFixed(2) + ',' + p.y.toFixed(2);
  }).join(' ');
  svg.appendChild(makeEl('polygon', { class: 'sar-grid-ring', points: ringPoints }));
});

// spokes from center to each axis's max point, plus axis labels
axes.forEach((axis, i) => {
  const outer = pointFor(i, maxValue);
  svg.appendChild(makeEl('line', {
    class: 'sar-axis-line', x1: center, y1: center, x2: outer.x.toFixed(2), y2: outer.y.toFixed(2),
  }));
  const labelPoint = pointFor(i, maxValue + 0.55);
  const label = makeEl('text', {
    class: 'sar-label', x: labelPoint.x.toFixed(2), y: labelPoint.y.toFixed(2),
  });
  label.textContent = axis.label;
  svg.appendChild(label);
});

// benchmark polygon (dashed) drawn first, score polygon (solid) drawn on top
svg.appendChild(makeEl('polygon', {
  class: 'sar-benchmark', points: pointsAttr(axes.map((a) => a.benchmark)),
}));
svg.appendChild(makeEl('polygon', {
  class: 'sar-score', points: pointsAttr(axes.map((a) => a.score)),
}));

// a small dot marker at each score vertex
axes.forEach((axis, i) => {
  const p = pointFor(i, axis.score);
  svg.appendChild(makeEl('circle', {
    class: 'sar-point', cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: 3.5,
  }));
});`,

  seo: {
    title: 'Skills Assessment Radar Chart — Free SVG Spider Chart UI',
    description: `A pure SVG radar/spider chart plotting candidate skill levels across multiple axes with real trigonometric point placement, a benchmark overlay, legend, and axis labels. No charting library.`,
    about: {
      title: 'Skills Assessment Radar Chart — Trig-Plotted SVG Spider Chart',
      description: `The skills assessment radar chart plots several skill dimensions — communication, technical, leadership, and more — as a polygon on a spoke grid, so a reviewer can read strengths and gaps at a glance. This snippet computes every point with real trigonometry and draws it as raw SVG, no charting library involved.

**The actual angle formula**

For \`axisCount\` axes, axis \`i\`'s angle is \`i * (2 * Math.PI / axisCount) - Math.PI / 2\`. The \`2 * Math.PI / axisCount\` term divides the full circle evenly between axes; subtracting \`Math.PI / 2\` rotates the whole chart so axis 0 points straight up instead of straight right — matching how radar charts are conventionally drawn.

**Value to point, honestly**

\`pointFor(index, value)\` turns a score into a radius with \`(value / maxValue) * maxRadius\`, then projects it along that axis's angle with \`center + r * Math.cos(angle)\` for x and \`center + r * Math.sin(angle)\` for y — the standard polar-to-Cartesian conversion. A score of 0 collapses to the center; a perfect score reaches \`maxRadius\` exactly.

**Two polygons, one grid**

Both the dashed benchmark polygon and the solid score polygon reuse the same \`pointFor\`/\`pointsAttr\` functions, just with different value arrays — so they're guaranteed to sit on the same axes and scale, making them directly comparable. The background grid rings are drawn the same way at 20/40/60/80/100% of \`maxRadius\`, confirming the geometry is consistent at every level.

**A closed polygon, always**

Because SVG's \`<polygon>\` element automatically connects its last point back to its first, and every axis contributes exactly one point in a fixed order, the shape is guaranteed closed with no separate "closing point" to remember or get wrong.

**Everything generated, nothing hardcoded**

Grid rings, spokes, axis labels, both polygons, and the score dot markers are all built from the same \`axes\` array in a loop — add a seventh skill axis and the whole chart, including its labels and angles, adapts automatically.

**Customizing it**

Change \`axisCount\` by adding or removing entries in \`axes\`, adjust \`maxValue\`/\`maxRadius\` for a different scale, or add a second candidate's polygon for direct comparison. Pair it with [circular progress](/ui-snippets/circular-progress/) for single-metric summaries, or a [quiz result breakdown](/ui-snippets/quiz-result-breakdown/) for assessment scoring elsewhere in a hiring flow.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `An empty SVG and legend render.` },
      { title: 'The script runs on load', text: `Grid rings, spokes, labels, and polygons are generated.` },
      { title: 'Compare the two polygons', text: `Solid candidate score vs. dashed role benchmark.` },
      { title: 'Edit the axes array', text: `Change labels, scores, or benchmark values.` },
      { title: 'Add or remove an axis', text: `The angle math adapts to any axisCount automatically.` },
      { title: 'Change maxValue or maxRadius', text: `Rescale the whole chart from two variables.` },
    ] },
    features: [
      { title: 'Real polar-to-Cartesian math', text: `angle and radius computed from actual trig, not fixed coordinates.` },
      { title: 'Even axis distribution', text: `2*PI/axisCount spaces any number of axes evenly.` },
      { title: 'Guaranteed closed polygon', text: `SVG polygon auto-closes; every axis contributes one point.` },
      { title: 'Benchmark overlay', text: `A second polygon on the same axes for direct comparison.` },
      { title: 'Generated grid rings', text: `Five concentric rings at even value fractions.` },
      { title: 'Auto-placed axis labels', text: `Text positioned just beyond each axis's max point.` },
      { title: 'Score point markers', text: `Dots mark each vertex of the score polygon.` },
      { title: 'Zero dependencies', text: `Pure SVG built with vanilla JavaScript.` },
    ],
    useCases: [
      { title: 'Hiring assessments', text: 'Plot a candidate\'s communication, technical and leadership scores as a polygon, then follow it with a [quiz result breakdown](/ui-snippets/quiz-result-breakdown/) for the detail behind each axis.' },
      { title: 'Performance reviews', text: 'Plot competencies against a role benchmark. The second polygon on the same axes makes gaps and strengths visible at a glance.' },
      { title: 'Candidate scorecards', text: 'Show a profile on each card in a [candidate pipeline kanban](/ui-snippets/candidate-pipeline-kanban/), so reviewers compare shapes instead of reading lists of scores.' },
      { title: 'Game character stats', text: 'Reuse the chart for attribute comparisons between characters or classes, with any number of axes spaced evenly using `2π / axisCount`.' },
      { title: 'Learning SVG polar maths', text: 'See how every point is computed with real trigonometry (`pointFor`) instead of hard-coded coordinates, with no charting library in the bundle.' },
      { icon: 'CODE', title: 'Related: Waffle Chart', desc: 'See the [Waffle Chart](/ui-snippets/waffle-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the axis angles calculated so they space evenly around the circle?', a: `Axis i's angle is i * (2 * Math.PI / axisCount) - Math.PI / 2. The term 2 * Math.PI / axisCount is the full circle (2*PI radians) divided evenly by however many axes exist, so each axis is offset from the last by exactly that fraction of a full turn regardless of whether there are 5, 6, or 8 axes. Subtracting Math.PI / 2 rotates the whole layout by a quarter turn so axis 0 points straight up rather than straight right.` },
      { q: 'How is a skill score turned into an actual pixel position?', a: `pointFor first computes a radius as (value / maxValue) * maxRadius — a value of 0 gives radius 0 (the center) and a value equal to maxValue gives radius maxRadius (the outer edge). That radius is then projected along the axis's angle using the standard polar-to-Cartesian formulas: x = center + r * cos(angle), y = center + r * sin(angle). This is the same math used to plot any point at a given distance and direction from an origin.` },
      { q: 'How do you know the polygon is actually closed correctly?', a: `SVG's polygon element automatically draws a closing segment from its last listed point back to its first — there's no need to repeat the first point at the end of the points string. Since pointsAttr generates exactly one point per axis in a fixed order (via Array.map over the axes array), and every axis's point sits on its own angle computed from the same formula, the resulting shape is always a valid, fully closed polygon with no gaps or self-intersections from mismatched ordering.` },
      { q: 'How would I add a third overlaid polygon for a second candidate?', a: `Add a second scores array (or a scores field per candidate) and call pointsAttr on it the same way the benchmark and score polygons are built, then append a new polygon element with its own CSS class for distinct styling (color, dash pattern). Because pointFor and pointsAttr only depend on the axes array's length and order, any number of overlaid polygons stay aligned to the same axes automatically.` },
      { q: 'How do I use this radar chart in React, Vue, or Angular?', a: `Keep the axes data as component state or a prop, and either render the SVG children (polygon, line, text, circle elements) declaratively from that array using your framework's templating, or run the same imperative DOM-building functions inside a mount/update effect against an SVG ref. The trigonometry functions (angleFor, pointFor) are plain JavaScript and need no changes either way.` },
    ],
    aiPrompt: {
      paragraph: `Radar charts are one of the few UI patterns where getting the math wrong produces a subtly broken-looking shape rather than an obvious error, so it's worth pasting this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and asking it to verify the angle formula (index * (2*Math.PI/axisCount) - Math.PI/2) actually distributes any number of axes evenly around a full circle, and to walk through why polar-to-Cartesian conversion (center + r*cos(angle), center + r*sin(angle)) is the correct way to place each axis's value point. The same assistant is useful for extending the chart correctly — ask it how to add a second overlaid polygon for a candidate-vs-benchmark or before-vs-after comparison while keeping both polygons aligned to identical axis angles, how to animate the polygon growing in from the center on load, or how to make the SVG chart accessible to screen readers via a companion data table.`,
      prompt: `Build a "skills assessment radar chart" as pure SVG generated with vanilla JavaScript — no charting library, no canvas.

Requirements:
- A data array of 5 or 6 skill axes, each with a label, a score, and a benchmark value on a 0-5 scale.
- Compute each axis's angle using real trigonometry: angle = index * (2 * Math.PI / axisCount) - Math.PI / 2, so any number of axes distributes evenly around a full circle starting from straight up.
- Convert a value on a given axis to an absolute SVG point using standard polar-to-Cartesian conversion: radius = (value / maxValue) * maxRadius, then x = centerX + radius * Math.cos(angle) and y = centerY + radius * Math.sin(angle).
- Generate, entirely from the axes array (nothing hardcoded per-axis): concentric background grid rings at several value fractions (e.g. 20/40/60/80/100%), a spoke line from center to each axis's maximum point, a text label positioned just beyond each axis's outer point, a benchmark polygon (dashed stroke) built from each axis's benchmark value, a score polygon (solid fill+stroke) built from each axis's score value, and small circle markers at each score polygon vertex.
- The polygon points must form a genuinely valid closed shape — rely on SVG's polygon element auto-closing from last point to first, with exactly one point generated per axis in consistent order; verify by reasoning through what happens with both 5 and 6 axes.
- Include a legend distinguishing the score polygon from the benchmark polygon.
- Keep it in a dark theme, and make sure the JavaScript only references classnames/ids that exist in the HTML you write.`,
    },
  },
};

export default skillsAssessmentRadar;
