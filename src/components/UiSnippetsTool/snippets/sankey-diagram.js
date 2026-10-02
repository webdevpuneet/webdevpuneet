const sankeyDiagram = {
  id: 'sankey-diagram',
  title: 'Sankey Diagram',
  lastmod: '2026-06-23',
  category: 'charts',
  html: `<div class="sk-card">
  <div class="sk-head"><h3>Traffic → conversion flow</h3></div>
  <svg class="sk-svg" id="skSvg" viewBox="0 0 460 280" role="img" aria-label="Sankey diagram"></svg>
  <div class="sk-tip" id="skTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.sk-card{position:relative;background:#fff;border-radius:16px;padding:22px;width:100%;max-width:520px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.sk-head h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:14px}
.sk-svg{width:100%;height:auto;display:block;overflow:visible}
.sk-link{fill-opacity:.32;transition:fill-opacity .15s;cursor:pointer}
.sk-link:hover{fill-opacity:.6}
.sk-node{rx:2}
.sk-nlabel{font-size:11px;font-weight:700;fill:#334155}

.sk-tip{position:absolute;pointer-events:none;background:#0f172a;color:#fff;font-size:12px;font-weight:700;padding:6px 10px;border-radius:8px;transform:translate(-50%,-130%);white-space:nowrap;z-index:5}
.sk-tip[hidden]{display:none}`,

  js: `// Two-column flow. Nodes have a column (0 = source, 1 = target) and a colour.
var NODES = {
  organic: { col: 0, name: 'Organic', color: '#6366f1' },
  paid:    { col: 0, name: 'Paid', color: '#f59e0b' },
  social:  { col: 0, name: 'Social', color: '#ec4899' },
  signup:  { col: 1, name: 'Signed up', color: '#22c55e' },
  bounce:  { col: 1, name: 'Bounced', color: '#94a3b8' },
};
var LINKS = [
  { from: 'organic', to: 'signup', value: 520 },
  { from: 'organic', to: 'bounce', value: 280 },
  { from: 'paid',    to: 'signup', value: 240 },
  { from: 'paid',    to: 'bounce', value: 360 },
  { from: 'social',  to: 'signup', value: 120 },
  { from: 'social',  to: 'bounce', value: 200 },
];

var svg = document.getElementById('skSvg');
var tip = document.getElementById('skTip');
var card = document.querySelector('.sk-card');
var SVGNS = 'http://www.w3.org/2000/svg';
var W = 460, H = 280, PAD = 8, NW = 14, GAP = 8;

function el(n, a) { var e = document.createElementNS(SVGNS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }

function render() {
  svg.innerHTML = '';
  var cols = { 0: [], 1: [] };
  Object.keys(NODES).forEach(function (id) { cols[NODES[id].col].push(id); });
  // Node height = sum of its links' values, scaled so a column fills the height.
  var totals = {};
  Object.keys(NODES).forEach(function (id) {
    totals[id] = LINKS.filter(function (l) { return l.from === id || l.to === id; })
      .reduce(function (s, l) { return s + l.value; }, 0);
  });
  var pos = {};
  [0, 1].forEach(function (c) {
    var ids = cols[c];
    var sum = ids.reduce(function (s, id) { return s + totals[id]; }, 0);
    var avail = H - PAD * 2 - GAP * (ids.length - 1);
    var y = PAD;
    var x = c === 0 ? PAD : W - PAD - NW;
    ids.forEach(function (id) {
      var h = (totals[id] / sum) * avail;
      pos[id] = { x: x, y: y, h: h, top: y, bottom: y, inTop: y };  // cursors for stacking links
      y += h + GAP;
    });
  });
  // Draw links as filled bezier ribbons, stacking on each node edge.
  LINKS.forEach(function (l) {
    var s = pos[l.from], t = pos[l.to];
    var sum = totals; // node totals to scale ribbon thickness
    var th0 = (l.value / sum[l.from]) * s.h;
    var th1 = (l.value / sum[l.to]) * t.h;
    var y0 = s.bottom; s.bottom += th0;
    var y1 = t.inTop; t.inTop += th1;
    var x0 = s.x + NW, x1 = t.x;
    var mx = (x0 + x1) / 2;
    var d = 'M' + x0 + ',' + y0 +
      ' C' + mx + ',' + y0 + ' ' + mx + ',' + y1 + ' ' + x1 + ',' + y1 +
      ' L' + x1 + ',' + (y1 + th1) +
      ' C' + mx + ',' + (y1 + th1) + ' ' + mx + ',' + (y0 + th0) + ' ' + x0 + ',' + (y0 + th0) + ' Z';
    var path = el('path', { class: 'sk-link', fill: NODES[l.from].color, d: d });
    path.dataset.label = NODES[l.from].name + ' → ' + NODES[l.to].name; path.dataset.value = l.value;
    svg.appendChild(path);
  });
  // Draw nodes + labels on top.
  Object.keys(pos).forEach(function (id) {
    var p = pos[id], node = NODES[id];
    svg.appendChild(el('rect', { class: 'sk-node', x: p.x, y: p.y, width: NW, height: p.h, fill: node.color }));
    var label = el('text', { class: 'sk-nlabel', x: node.col === 0 ? p.x + NW + 6 : p.x - 6, y: p.y + p.h / 2 + 4 });
    label.setAttribute('text-anchor', node.col === 0 ? 'start' : 'end');
    label.textContent = node.name;
    svg.appendChild(label);
  });
}

svg.addEventListener('mousemove', function (e) {
  var link = e.target.closest('.sk-link');
  if (!link) { tip.hidden = true; return; }
  var r = card.getBoundingClientRect();
  tip.innerHTML = link.dataset.label + ': <b>' + Number(link.dataset.value).toLocaleString() + '</b>';
  tip.style.left = (e.clientX - r.left) + 'px';
  tip.style.top = (e.clientY - r.top) + 'px';
  tip.hidden = false;
});
svg.addEventListener('mouseleave', function () { tip.hidden = true; });

render();`,

  seo: {
    title: 'Sankey Diagram — HTML CSS JS Flow Diagram (No Lib)',
    description: `A Sankey flow diagram with proportional bezier ribbons between node columns, sized by value. No library. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Sankey Diagram — Proportional Bezier Flow Ribbons Between Node Columns',
      description: `A Sankey diagram visualises *flow* — how a quantity splits and moves from one set of categories to another, with ribbon widths proportional to the amount flowing. It's the chart for "where does the traffic go?", "how does the budget split?", or "how does energy move through the system?". This snippet builds a two-column Sankey in plain HTML, CSS, SVG, and vanilla JavaScript, with value-sized nodes, proportional bezier ribbons, and hover tooltips — no charting library.

**Nodes sized by throughput**

Each node's height encodes how much flows through it. The snippet sums every link touching a node to get its total, then within each column scales the nodes so they stack to fill the available height (minus gaps). So a source that sends more, or a target that receives more, is taller — the node heights themselves carry information before you even look at the ribbons.

**Ribbons that conserve flow**

The heart of a Sankey is that ribbon thickness is proportional to value, and the widths *add up*: the ribbons leaving a node exactly fill its right edge, and those entering a node exactly fill its left edge. The snippet achieves this with stacking cursors — each node tracks how far down its edge has been used, so successive ribbons stack without overlap or gap. This flow-conservation is what makes a Sankey readable: you can see that "Paid" sends most of its volume to "Bounced," because that ribbon is visibly thicker.

**Smooth bezier connectors**

Each ribbon is a filled SVG path with two cubic bezier curves — top and bottom edges that ease from the source's right edge to the target's left edge using a midpoint control, then close into a band. The S-curve is the signature Sankey look and keeps crossing ribbons legible. Ribbons are tinted by their source node and semi-transparent so overlaps read clearly and a hovered ribbon brightens.

**Nodes and labels on top**

After the ribbons, the node rectangles and their labels are drawn on top, with labels placed outside each column (left of the right column, right of the left column) so they never sit over the flows. Hovering any ribbon shows its source → target and value at the cursor via \`getBoundingClientRect\`.

**Data-driven and drop-in**

The diagram is defined by a \`NODES\` map (each with a column and colour) and a \`LINKS\` list of \`{ from, to, value }\`. Swap in your own flows — channels to outcomes, sources to categories, budget to departments — and it sizes the nodes and ribbons automatically. It's a compact, dependency-free reference for the flow-conservation layout and bezier-ribbon drawing that define Sankey diagrams.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A Sankey diagram renders showing traffic sources flowing into signed-up vs. bounced.` },
      { title: 'Read the ribbons', text: `Thicker ribbons mean more flow; node heights show total throughput.` },
      { title: 'Hover a ribbon', text: `See its source → target and exact value in a tooltip.` },
      { title: 'Swap in your data', text: `Edit the NODES map (column + colour) and the LINKS list ({ from, to, value }).` },
      { title: 'Model your flow', text: `Use it for channels→outcomes, budget→departments, or any source→target volumes.` },
      { title: 'Wire to an API', text: `Map your flow data into NODES/LINKS and call render().` },
    ] },
    features: [
      { title: 'Flow-proportional ribbons', text: `Ribbon thickness encodes value, so bigger flows are visibly thicker.` },
      { title: 'Conserved flow', text: `Ribbons stack to exactly fill each node's edges via stacking cursors — no overlap or gap.` },
      { title: 'Throughput-sized nodes', text: `Each node's height is the sum of its links, scaled to fill its column.` },
      { title: 'Bezier S-curve connectors', text: `Each ribbon is a filled path with two cubic beziers — the signature Sankey look.` },
      { title: 'Source-tinted, translucent', text: `Ribbons take their source colour and are semi-transparent so overlaps read clearly.` },
      { title: 'Outside labels', text: `Node labels sit outside each column so they never cover the flows.` },
      { title: 'Hover tooltips', text: `Hovering a ribbon shows its source → target and value.` },
      { title: 'Data-driven & no library', text: `Defined by NODES + LINKS in plain HTML/CSS/SVG/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Conversion and funnel flow', text: 'Show how channels split into outcomes, with ribbon width proportional to value, and compare with a plain [funnel chart](/ui-snippets/funnel-chart/) when stage order matters most.' },
      { title: 'Budget and spend allocation', text: 'Visualise money flowing from sources through departments to line items, where ribbons stack to exactly fill each node\'s edges.' },
      { title: 'User journey and routing', text: 'Map where visitors go from entry pages to exits, with node heights set to the total of their links so busy pages stand out.' },
      { title: 'Energy and resource flow', text: 'Use it for the classic Sankey case of inputs becoming outputs and losses, drawn with smooth S-curve ribbons built from two cubic beziers.' },
      { title: 'Survey path analysis', text: 'Show how respondents flow between answers across questions, then summarise composition with a [treemap](/ui-snippets/treemap/) or a [waterfall chart](/ui-snippets/waterfall-chart/).' },
      { icon: 'CODE', title: 'Related: UV Index Meter', desc: 'See the [UV Index Meter](/ui-snippets/uv-index-meter/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What does a Sankey diagram show that other charts cannot?', a: `It shows flow — how a quantity moves and splits from one set of categories to another, with ribbon widths proportional to the amount. Where a bar or pie shows magnitudes or shares at one stage, a Sankey shows the relationships between two (or more) stages: which source feeds which target, and how much. It answers "where does it go?" rather than "how big is it?".` },
      { q: 'How do the ribbons stay proportional and aligned?', a: `Each ribbon's thickness at a node is value/nodeTotal × nodeHeight. Each node keeps a stacking cursor tracking how much of its edge has been used; successive ribbons start where the previous one ended, so they pack the node's edge exactly with no overlap or gap. This flow-conservation — outgoing ribbons fill the right edge, incoming fill the left — is what makes the diagram readable.` },
      { q: 'How are the curved ribbons drawn?', a: `Each ribbon is a closed SVG path made of two cubic bezier curves: the top edge eases from the source's right edge to the target's left edge using a horizontal midpoint as the control point, then a line down the target edge, then the bottom edge curves back, then close. The mirrored beziers create the smooth S-shaped band that's the signature Sankey look and keeps crossing flows legible.` },
      { q: 'Can it handle more than two columns?', a: `This snippet implements the common two-column (source → target) case, which covers most flow questions. Extending to multiple columns means assigning each node a column index, laying out columns left to right, and drawing links between adjacent (or any) columns with the same stacking-cursor and bezier logic. The ribbon-drawing and flow-conservation code generalises; the layout just gains more columns.` },
      { q: 'How do I use this Sankey in React, Vue, or Angular?', a: `In React, hold NODES/LINKS in state or constants, compute the layout in useMemo, and render rects/paths from .map() (or run render() in a useEffect with a ref); in Vue, use a computed layout with v-for; in Angular, a getter with *ngFor. The node-sizing, stacking, and bezier math are framework-agnostic — only the rendering and tooltip state move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to trace the stacking-cursor logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the bottom and inTop cursors stored per node prevent successive ribbons from overlapping or leaving gaps along a node's edge, and why each ribbon path is built from two mirrored cubic bezier curves rather than straight diagonal lines. The same assistant can help you optimize it — ask whether recalculating every node's total by filtering the entire LINKS array once per node (an O(nodes times links) pass) would become a bottleneck with a much larger dataset, and how you would precompute those totals in a single pass instead. It's also useful for extending the diagram: ask it to generalize the fixed two-column layout to support three or more sequential stages, add click-to-filter so clicking a node highlights only its connected ribbons, or animate the ribbons growing in on load instead of appearing instantly. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a two-column Sankey flow diagram in plain HTML, CSS, and JavaScript using inline SVG created with createElementNS — no charting library, no canvas.

Requirements:
- Take a nodes object where each node has a column index (0 for the source side, 1 for the target side) and a color, plus a links array of objects each with a from node id, a to node id, and a numeric value.
- For every node, compute its total throughput by summing the value of every link that touches it (whether as a source or a target), then within each column scale the nodes proportionally so their heights (plus fixed gaps between them) exactly fill the available vertical space.
- Draw each link as a single filled, closed SVG path built from two cubic bezier curves: one curve tracing the top edge from the source node's right edge to the target node's left edge using a horizontal midpoint as the control point, and a mirrored curve tracing the bottom edge back, so the ribbon reads as a smooth S-curve rather than a straight diagonal band.
- Give every node a running "stacking cursor" that tracks how much of its edge has already been consumed by previously drawn ribbons, so that multiple ribbons leaving or entering the same node stack flush against each other with no visual overlap and no gap, and the ribbon thicknesses sum to exactly the node's full height.
- Color each ribbon using its source node's color at a low fill opacity so overlapping ribbons remain visually distinguishable, and increase that opacity on hover.
- Draw the node rectangles and their text labels after all the ribbons (so they render on top), positioning each label outside its column (to the right of left-column nodes, to the left of right-column nodes) so labels never sit on top of a flowing ribbon, and implement a mousemove-driven tooltip that reports the hovered ribbon's source name, target name, and exact numeric value.`,
    },
  },
};

export default sankeyDiagram;
