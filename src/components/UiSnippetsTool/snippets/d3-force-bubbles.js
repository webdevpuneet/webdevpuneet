const d3ForceBubbles = {
  id: 'd3-force-bubbles',
  title: 'D3 Force Bubble Chart',
  lastmod: '2026-08-02',
  category: 'charts',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js'],
  html: `<div class="dfb-card">
  <div class="dfb-top">
    <div>
      <span class="dfb-tag">d3 · force simulation</span>
      <h2>Traffic by source</h2>
    </div>
    <div class="dfb-modes" id="dfbModes">
      <button class="dfb-chip is-on" data-mode="cluster">Cluster</button>
      <button class="dfb-chip" data-mode="pack">Pack</button>
    </div>
  </div>

  <svg id="dfbSvg" class="dfb-svg"></svg>

  <div class="dfb-legend" id="dfbLegend"></div>
  <p class="dfb-note">Drag any bubble — the simulation reheats and everything else settles around it.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#080b18;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.dfb-card{width:min(640px,95vw);background:#0f1428;border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:22px;box-shadow:0 30px 70px -34px rgba(0,0,0,.95)}

.dfb-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-wrap:wrap}
.dfb-tag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fbbf24;background:rgba(251,191,36,.11);border:1px solid rgba(251,191,36,.28);padding:4px 10px;border-radius:99px;margin-bottom:9px}
.dfb-top h2{font-size:19px;font-weight:800;letter-spacing:-.02em}
.dfb-modes{display:flex;gap:5px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:11px;padding:4px}
.dfb-chip{padding:7px 14px;border:none;border-radius:8px;background:transparent;color:#8f9ab8;font:600 12.5px system-ui;cursor:pointer;transition:background .16s,color .16s}
.dfb-chip.is-on{background:rgba(251,191,36,.16);color:#fde68a}

.dfb-svg{width:100%;height:340px;display:block;margin-top:12px;cursor:grab}
.dfb-svg:active{cursor:grabbing}
.dfb-node circle{stroke:rgba(255,255,255,.22);stroke-width:1.2;transition:stroke .18s,stroke-width .18s}
.dfb-node:hover circle{stroke:#fff;stroke-width:2.4}
.dfb-node text{fill:#fff;font:700 10.5px system-ui;text-anchor:middle;pointer-events:none;paint-order:stroke;stroke:rgba(8,11,24,.65);stroke-width:3px}
.dfb-node .dfb-val{font-size:9px;font-weight:600;opacity:.72}

.dfb-legend{display:flex;gap:14px;flex-wrap:wrap;margin-top:6px}
.dfb-legend div{display:flex;align-items:center;gap:6px;font-size:11.5px;color:#98a2c0}
.dfb-legend i{width:9px;height:9px;border-radius:50%}
.dfb-note{font-size:12.5px;color:#6f7898;margin-top:12px;line-height:1.6}`,

  js: `var DATA = [
  { name: 'Organic', value: 4820, group: 'Earned' },
  { name: 'Direct', value: 3110, group: 'Earned' },
  { name: 'Referral', value: 1240, group: 'Earned' },
  { name: 'Newsletter', value: 1980, group: 'Owned' },
  { name: 'In-app', value: 1420, group: 'Owned' },
  { name: 'Docs', value: 860, group: 'Owned' },
  { name: 'Paid search', value: 2640, group: 'Paid' },
  { name: 'Social ads', value: 1730, group: 'Paid' },
  { name: 'Sponsorships', value: 640, group: 'Paid' }
];

var GROUPS = ['Earned', 'Owned', 'Paid'];
var COLOR = { Earned: '#22d3ee', Owned: '#a78bfa', Paid: '#fbbf24' };

var svg = d3.select('#dfbSvg');
var width = svg.node().clientWidth;
var height = svg.node().clientHeight;
var mode = 'cluster';

// Area, not radius, must be proportional to value — scaleSqrt is what enforces
// that. A linear radius scale makes a 2x value look 4x bigger.
var r = d3.scaleSqrt()
  .domain([0, d3.max(DATA, function (d) { return d.value; })])
  .range([0, 46]);

var nodes = DATA.map(function (d) {
  return Object.assign({}, d, { r: r(d.value), x: width / 2, y: height / 2 });
});

function groupX(g) {
  var i = GROUPS.indexOf(g);
  return (width / (GROUPS.length + 1)) * (i + 1);
}

var node = svg.selectAll('g.dfb-node')
  .data(nodes)
  .join('g')
  .attr('class', 'dfb-node');

node.append('circle')
  .attr('r', function (d) { return d.r; })
  .attr('fill', function (d) { return COLOR[d.group]; })
  .attr('fill-opacity', 0.82);

node.append('text')
  .attr('dy', '-0.1em')
  .text(function (d) { return d.r > 24 ? d.name : ''; });

node.append('text')
  .attr('class', 'dfb-val')
  .attr('dy', '1.15em')
  .text(function (d) { return d.r > 24 ? (d.value / 1000).toFixed(1) + 'k' : ''; });

node.append('title').text(function (d) { return d.name + ' — ' + d.value.toLocaleString(); });

var sim = d3.forceSimulation(nodes)
  .force('x', d3.forceX(width / 2).strength(0.06))
  .force('y', d3.forceY(height / 2).strength(0.12))
  // iterations raises collision accuracy — at 1 large bubbles visibly overlap.
  .force('collide', d3.forceCollide(function (d) { return d.r + 2; }).iterations(3))
  .on('tick', function () {
    node.attr('transform', function (d) {
      d.x = Math.max(d.r, Math.min(width - d.r, d.x));
      d.y = Math.max(d.r, Math.min(height - d.r, d.y));
      return 'translate(' + d.x + ',' + d.y + ')';
    });
  });

function applyMode() {
  sim.force('x', d3.forceX(function (d) {
    return mode === 'cluster' ? groupX(d.group) : width / 2;
  }).strength(mode === 'cluster' ? 0.16 : 0.06));
  // alpha is the simulation's energy — without reheating, a settled layout
  // ignores the new force entirely because alpha has already decayed to zero.
  sim.alpha(0.9).restart();
}

node.call(d3.drag()
  .on('start', function (event, d) {
    if (!event.active) sim.alphaTarget(0.3).restart();
    d.fx = d.x; d.fy = d.y;
  })
  .on('drag', function (event, d) { d.fx = event.x; d.fy = event.y; })
  .on('end', function (event, d) {
    if (!event.active) sim.alphaTarget(0);
    d.fx = null; d.fy = null;
  }));

d3.select('#dfbLegend').selectAll('div')
  .data(GROUPS)
  .join('div')
  .html(function (g) { return '<i style="background:' + COLOR[g] + '"></i>' + g; });

document.getElementById('dfbModes').addEventListener('click', function (e) {
  var chip = e.target.closest('.dfb-chip');
  if (!chip) return;
  document.querySelectorAll('.dfb-chip').forEach(function (c) { c.classList.remove('is-on'); });
  chip.classList.add('is-on');
  mode = chip.dataset.mode;
  applyMode();
});

applyMode();`,

  seo: {
    title: 'D3 Force Bubble Chart — Draggable Clustered Bubbles',
    description: 'A D3 force simulation packing value-scaled bubbles into clusters, with collision resolution and drag reheating. Exports to React, Vue & Tailwind.',
    about: {
      title: 'D3 Force Bubble Chart — Simulations, Alpha, and Honest Circle Sizing',
      description: `A force simulation is not a chart type — it is a tiny physics engine. You describe forces you want acting on a set of nodes, and D3 iteratively nudges them until the whole system reaches equilibrium. That makes it the right tool whenever a layout has no single correct answer, only constraints: bubbles that must not overlap, cluster near their category, and stay inside the frame.

## The scale that keeps the chart honest

This line is the difference between a truthful chart and a misleading one:

\`var r = d3.scaleSqrt().domain([0, max]).range([0, 46]);\`

Humans read a circle's **area**, not its radius. If radius were mapped linearly, a value twice as large would produce a circle with four times the area — visually claiming a 4× difference where the data says 2×. Taking the square root makes area proportional to value, which is exactly why \`scaleSqrt\` exists in D3 and why it should be the default choice for any circle-sized encoding.

## Forces, and why there are three

\`.force('x', d3.forceX(...).strength(...))\` — pulls each node toward a target x. In cluster mode that target is derived from the node's category, so groups separate horizontally; in pack mode every node targets the center and the groups merge.

\`.force('y', d3.forceY(height / 2).strength(0.12))\` — a gentle vertical pull toward the middle. Its strength is deliberately higher than the x force in pack mode so the arrangement stays wide and shallow rather than becoming a tall column.

\`.force('collide', d3.forceCollide(d => d.r + 2).iterations(3))\` — the force doing the actual packing. \`iterations\` is worth knowing about: collision resolution is approximate, and at the default of 1 large bubbles visibly overlap because one pass is not enough to satisfy every constraint. Raising it to 3 costs a little per tick and produces clean separation. The \`+ 2\` is the visual gutter between circles.

## Alpha: the concept that trips everyone up

A D3 simulation has an internal **alpha** value — its energy. It starts near 1 and decays each tick until it drops below a threshold, at which point the simulation stops. That is what makes a layout settle instead of jittering forever.

It is also why changing a force appears to do nothing:

\`sim.alpha(0.9).restart();\`

If the simulation has already cooled, adding a new force has no effect — there is no energy left to move anything. Reheating with \`alpha()\` and calling \`restart()\` gives it the budget to rearrange. Nearly every "my D3 force layout is not responding to my update" question has this as its answer.

Dragging uses a different mechanism on purpose:

\`sim.alphaTarget(0.3).restart()\` on drag start, \`sim.alphaTarget(0)\` on end.

\`alphaTarget\` sets the value alpha *decays toward*. Setting it to 0.3 keeps the simulation permanently warm for as long as the drag lasts, so other bubbles keep reacting continuously. Returning it to 0 lets everything cool and settle again. Using \`alpha()\` here instead would give one burst of energy that fades mid-drag.

## fx and fy pin a node

During a drag the node gets \`d.fx\` and \`d.fy\` — fixed positions that override the simulation entirely for that node. It follows the pointer exactly while every other bubble negotiates around it. Setting them back to \`null\` on release returns the node to the simulation's control, which is what makes it drift into a resting position rather than freezing where it was dropped.

## Clamping inside the tick

The tick handler clamps each node's position to the frame before writing the transform:

\`d.x = Math.max(d.r, Math.min(width - d.r, d.x));\`

Doing this in the tick rather than adding a boundary force is simpler and absolute — no bubble can ever escape, even momentarily during a fast drag.

## Selections and joins

\`svg.selectAll('g.dfb-node').data(nodes).join('g')\` uses the modern \`join()\` API rather than the older enter/exit dance. Each node is a \`<g>\` containing a circle and two text labels, so one \`translate\` on the group moves everything together — cheaper and simpler than positioning three elements individually every tick.

Labels are only rendered when the bubble is large enough to hold them (\`d.r > 24\`), and use \`paint-order: stroke\` with a dark stroke so text stays readable over any fill color. A \`<title>\` child gives every bubble a native tooltip with its exact value, which also makes the chart usable with a screen reader.

## Reusing it

Replace \`DATA\`, \`GROUPS\`, and \`COLOR\`; everything else derives. For hierarchical data where bubbles nest inside parents, D3's \`pack()\` layout is a better fit than a force simulation. Compare with a [bubble chart](/ui-snippets/bubble-chart/) for the positioned variant, or a [treemap](/ui-snippets/treemap/) when exact area comparison matters more than grouping.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the D3 CDN', text: 'Include d3 v7 from the CDN panel — global d3.' },
      { title: 'Paste HTML, CSS, and JS', text: 'Bubbles drop in and settle into three category clusters.' },
      { title: 'Switch to Pack', text: 'The x force retargets to center and the simulation reheats to rearrange.' },
      { title: 'Drag a bubble', text: 'It pins to your pointer while the rest renegotiate around it.' },
      { title: 'Hover for exact values', text: 'Native SVG titles show the unrounded number.' },
      { title: 'Swap in your data', text: 'Replace DATA, GROUPS and COLOR — scales and legend derive from them.' },
    ] },
    features: [
      { title: 'Area-proportional sizing', text: 'scaleSqrt so a 2x value looks 2x, not 4x.' },
      { title: 'Three cooperating forces', text: 'Positional x, y, and collision packing in one simulation.' },
      { title: 'Accurate collisions', text: 'iterations: 3 stops large bubbles overlapping.' },
      { title: 'Correct reheating', text: 'alpha().restart() so force changes actually take effect.' },
      { title: 'Drag-warm simulation', text: 'alphaTarget keeps neighbours reacting for the whole drag.' },
      { title: 'Pinned nodes', text: 'fx and fy override the simulation, then release cleanly.' },
      { title: 'Hard frame clamping', text: 'Positions clamped in the tick so nothing escapes.' },
      { title: 'Grouped node rendering', text: 'One transform per g moves circle and both labels together.' },
    ],
    useCases: [
      { title: 'Traffic and attribution', text: 'Channel mix where grouping matters as much as size.' },
      { title: 'Portfolio and budget splits', text: 'Allocation across categories at a glance.' },
      { title: 'Skill and tag clouds', text: 'A data-driven cousin of a [tag cloud](/ui-snippets/tag-cloud/).' },
      { title: 'Survey and poll results', text: 'Response volume clustered by theme.' },
      { title: 'Dashboard overviews', text: 'A visual counterpoint to a [bubble chart](/ui-snippets/bubble-chart/).' },
      { title: 'Learning d3-force', text: 'A reference for alpha, forces, and drag behavior.' },
      { icon: 'CODE', title: 'Related: Lollipop Chart', desc: 'See the [Lollipop Chart](/ui-snippets/lollipop-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use scaleSqrt instead of scaleLinear for the radius?', a: 'People compare circles by area, not radius. Mapping value linearly to radius means a value twice as large draws a circle with four times the area, visually overstating the difference. Taking the square root makes area proportional to value, which is why scaleSqrt exists and why it should be the default for any circle-sized encoding.' },
      { q: 'Why does changing a force sometimes do nothing?', a: 'Because the simulation has already cooled. D3 keeps an internal alpha value that decays each tick until the simulation stops, which is what lets a layout settle. Once alpha reaches zero there is no energy left to move nodes, so a new force has no visible effect. Calling sim.alpha(0.9).restart() reheats it so the layout can rearrange.' },
      { q: 'What is the difference between alpha and alphaTarget?', a: 'alpha sets the current energy, which then decays — a single burst. alphaTarget sets the value alpha decays toward, so setting it to 0.3 keeps the simulation permanently warm for as long as a drag lasts, letting other bubbles react continuously. Resetting it to 0 on drag end lets the layout cool and settle again.' },
      { q: 'What do fx and fy do during a drag?', a: 'They pin a node to a fixed position, overriding the simulation for that node only, so it follows the pointer exactly while every other bubble negotiates around it. Setting them back to null on release hands the node back to the simulation, which is why it drifts into a resting position rather than freezing where it was dropped.' },
      { q: 'Why raise forceCollide iterations above the default?', a: 'Collision resolution is approximate and runs a fixed number of relaxation passes per tick. At the default of 1, large circles visibly overlap because one pass cannot satisfy every constraint at once. Three iterations costs slightly more per tick and produces clean separation, which matters most when bubble sizes vary a lot.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Let the framework render the SVG container and let D3 own the node subtree, or render nodes from state and use D3 only for the simulation math. Create the simulation in a mount effect and call sim.stop() in cleanup, or it keeps ticking against detached nodes. Keep the nodes array in a ref since d3-force mutates x, y, vx and vy in place on every tick.' },
    ],
    aiPrompt: {
      paragraph: `Force simulations have one concept that explains most of the confusion around them, and it is worth having named explicitly. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to explain what alpha is, how it decays, and why sim.alpha(0.9).restart() is required after changing a force — then remove that call and watch the mode toggle silently do nothing. Ask it to contrast alpha with alphaTarget and explain why the drag handler uses the latter. Then ask why the radius uses d3.scaleSqrt rather than scaleLinear, and have it work through the numbers for a value twice as large to show the 4x area distortion a linear scale would introduce. For optimization, ask what forceCollide's iterations parameter actually does per tick and how you would tune it for a hundred bubbles rather than nine. To extend it: have it animate radius changes when the data updates, add a category filter that removes nodes and reheats, replace the cluster force with forceCenter per group, or add keyboard-accessible focus for each bubble. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a draggable force-directed bubble chart with D3 v7 (from a CDN, global d3) in plain HTML, CSS, and JavaScript.

Requirements:
- Size bubbles with d3.scaleSqrt, NOT scaleLinear, and explain why in a comment: people compare circles by area, so mapping value linearly to radius makes a 2x value appear 4x larger. The square root makes area proportional to value.
- Build a d3.forceSimulation with three forces: a forceX whose target depends on the current mode, a forceY pulling toward vertical center with a slightly higher strength so the layout stays wide rather than becoming a tall column, and a forceCollide sized to each node radius plus a small gutter. Set the collide force's iterations to 3 and explain that collision resolution is approximate — at the default of 1 large bubbles visibly overlap because one relaxation pass cannot satisfy every constraint.
- Provide two layout modes: "cluster" where the forceX target is derived from each node's category so groups separate horizontally, and "pack" where every node targets the center so groups merge. When switching modes you MUST call sim.alpha(0.9).restart() and explain why: alpha is the simulation's energy and decays to zero as the layout settles, so a cooled simulation ignores a newly applied force entirely — this is the single most common D3 force confusion.
- Implement dragging with d3.drag, setting d.fx and d.fy to pin the node to the pointer and clearing them to null on release. On drag start call sim.alphaTarget(0.3).restart() and on end sim.alphaTarget(0) — explain that alphaTarget sets the value alpha decays TOWARD, so it keeps the simulation warm for the whole drag, whereas alpha() would give a single burst that fades mid-gesture.
- In the tick handler, clamp each node's x and y to within the SVG bounds accounting for its radius before writing the transform, so bubbles can never escape the frame even during a fast drag.
- Render each node as a single <g> containing a circle and two text labels, so one translate per tick moves everything together rather than positioning three elements separately. Only render labels when the bubble is large enough to contain them, and use paint-order: stroke with a dark stroke so text stays readable over any fill.
- Add a native SVG <title> child to each node giving the exact value, so hovering shows an unrounded tooltip and screen readers can access the data.
- Use the modern selection.data(...).join(...) API rather than the older enter/exit pattern, derive the legend from the group list, and style it as a dark dashboard card.`,
    },
  },
};

export default d3ForceBubbles;
