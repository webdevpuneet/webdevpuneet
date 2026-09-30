const arcDiagramChart = {
  id: 'arc-diagram-chart',
  title: 'Arc Diagram Chart',
  category: 'charts',
  html: `<div class="app">
  <div class="card">
    <div class="card-header">
      <h3>Team Collaboration Network</h3>
      <p class="sub">Nodes sit on one line ordered by department. Arcs above connect people who worked together; arc height and thickness scale with shared project count.</p>
    </div>
    <div class="chart-wrap">
      <svg id="arc" viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
  </div>
</div>`,
  css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #f8fafc; font-family: system-ui, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
.app { width: 100%; max-width: 680px; }
.card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; box-shadow: 0 12px 30px rgba(30,41,59,0.06); }
.card-header { margin-bottom: 6px; }
h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
.sub { font-size: 12px; color: #94a3b8; margin-top: 3px; line-height: 1.5; }
#arc { width: 100%; display: block; overflow: visible; }
.arc-baseline { stroke: #e2e8f0; stroke-width: 1; }
.arc-node { stroke: #fff; stroke-width: 1.5; cursor: pointer; transition: r 0.12s; }
.arc-node:hover { r: 7; }
.arc-label { font-size: 10px; font-weight: 700; fill: #475569; text-anchor: middle; }
.arc-path { fill: none; transition: opacity 0.15s, stroke-width 0.15s; cursor: pointer; }
.arc-path.dim { opacity: 0.08; }
.arc-path.active { opacity: 1 !important; }`,
  js: `const svg = document.getElementById('arc');
const NS = 'http://www.w3.org/2000/svg';

const NODES = [
  { id: 'amy',   label: 'Amy',   dept: 'Design' },
  { id: 'ben',   label: 'Ben',   dept: 'Design' },
  { id: 'cara',  label: 'Cara',  dept: 'Design' },
  { id: 'dev',   label: 'Dev',   dept: 'Eng' },
  { id: 'ella',  label: 'Ella',  dept: 'Eng' },
  { id: 'finn',  label: 'Finn',  dept: 'Eng' },
  { id: 'gia',   label: 'Gia',   dept: 'Eng' },
  { id: 'hugo',  label: 'Hugo',  dept: 'Product' },
  { id: 'iris',  label: 'Iris',  dept: 'Product' },
  { id: 'jae',   label: 'Jae',   dept: 'Sales' },
  { id: 'kim',   label: 'Kim',   dept: 'Sales' },
  { id: 'liam',  label: 'Liam',  dept: 'Sales' },
];

const EDGES = [
  ['amy', 'ben', 4], ['amy', 'cara', 2], ['ben', 'cara', 5],
  ['amy', 'dev', 3], ['cara', 'hugo', 4], ['ben', 'iris', 1],
  ['dev', 'ella', 6], ['dev', 'finn', 2], ['ella', 'finn', 5],
  ['ella', 'gia', 3], ['finn', 'gia', 4], ['dev', 'hugo', 2],
  ['gia', 'hugo', 3], ['hugo', 'iris', 5], ['iris', 'jae', 2],
  ['hugo', 'jae', 1], ['jae', 'kim', 6], ['jae', 'liam', 3],
  ['kim', 'liam', 4], ['amy', 'finn', 1], ['iris', 'kim', 2],
];

const DEPT_COLOR = { Design: '#f472b6', Eng: '#6366f1', Product: '#22d3ee', Sales: '#f59e0b' };

function el(tag, attrs) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

const W = 640, H = 320;
const PAD_X = 40;
const BASELINE_Y = H - 40;
const innerW = W - PAD_X * 2;

const positions = {};
NODES.forEach((n, i) => {
  positions[n.id] = PAD_X + (i / (NODES.length - 1)) * innerW;
});

const maxWeight = Math.max(...EDGES.map(e => e[2]));

function arcPathD(x1, x2, y) {
  const span = Math.abs(x2 - x1);
  const midX = (x1 + x2) / 2;
  // Arc height scales with the span between nodes so distant connections
  // read as taller, more prominent arcs than adjacent ones.
  const height = Math.min(180, span * 0.75 + 20);
  const topY = y - height;
  return \`M \${x1},\${y} Q \${midX},\${topY} \${x2},\${y}\`;
}

function draw() {
  svg.innerHTML = '';

  svg.appendChild(el('line', { class: 'arc-baseline', x1: PAD_X, y1: BASELINE_Y, x2: W - PAD_X, y2: BASELINE_Y }));

  const arcEls = [];
  EDGES.forEach(([a, b, weight]) => {
    const x1 = positions[a], x2 = positions[b];
    const d = arcPathD(Math.min(x1, x2), Math.max(x1, x2), BASELINE_Y);
    const strokeW = 1 + (weight / maxWeight) * 5;
    const path = el('path', {
      class: 'arc-path',
      d,
      stroke: DEPT_COLOR[NODES.find(n => n.id === a).dept],
      'stroke-width': strokeW.toFixed(1),
      'stroke-opacity': 0.55,
      'data-a': a,
      'data-b': b,
    });
    const title = el('title', {});
    const nameA = NODES.find(n => n.id === a).label, nameB = NODES.find(n => n.id === b).label;
    title.textContent = \`\${nameA} \\u2194 \${nameB}: \${weight} shared project\${weight === 1 ? '' : 's'}\`;
    path.appendChild(title);
    svg.appendChild(path);
    arcEls.push(path);
  });

  NODES.forEach(n => {
    const x = positions[n.id];
    const circle = el('circle', { class: 'arc-node', cx: x, cy: BASELINE_Y, r: 5, fill: DEPT_COLOR[n.dept] });
    circle.addEventListener('mouseenter', () => highlight(n.id));
    circle.addEventListener('mouseleave', clearHighlight);
    svg.appendChild(circle);

    const label = el('text', { class: 'arc-label', x, y: BASELINE_Y + 20 });
    label.textContent = n.label;
    svg.appendChild(label);
  });

  function highlight(nodeId) {
    arcEls.forEach(p => {
      const connected = p.getAttribute('data-a') === nodeId || p.getAttribute('data-b') === nodeId;
      p.classList.toggle('dim', !connected);
      p.classList.toggle('active', connected);
    });
  }
  function clearHighlight() {
    arcEls.forEach(p => { p.classList.remove('dim'); p.classList.remove('active'); });
  }
}

draw();`,
  seo: {
    title: 'Arc Diagram Chart — Free HTML CSS JS Snippet',
    description: 'A hand-drawn SVG arc diagram plotting network connections as curved arcs above a single line of nodes, with hover-to-highlight and weighted arc thickness. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Arc Diagram Chart — Network Connections as Curved Arcs Over a Single Node Line',
      description: `An arc diagram is a network-visualization technique that lays every node on a single line — ordered however is most meaningful, here grouped by department — and draws each connection as a curved arc rising above the line instead of a tangled node-and-edge layout scattered across two dimensions. It trades the free-form spatial layout of a [Force-Directed Graph](/ui-snippets/three-network-graph/) or a [Chord Diagram](/ui-snippets/chord-diagram-chart/) for something that never has crossing-node ambiguity and reads cleanly left to right, which is exactly why it's the preferred technique when node order itself carries meaning (departments, chronological sequence, alphabetical listing) and the network is too dense for a force layout to stay readable.

**A one-dimensional node layout is the whole idea**

\`positions[n.id]\` places every node at a fixed, evenly-spaced x-coordinate along one shared baseline, computed once from each node's index in the \`NODES\` array — there is no y-axis freedom for nodes at all, unlike almost every other network diagram. Because the ordering is meaningful (department groupings here), nodes for the same team cluster together on the line, which in turn tends to make within-department arcs naturally shorter and cross-department arcs naturally longer and taller.

**Arc height as a byproduct of span, not a separate encoding**

\`arcPathD(x1, x2, y)\` draws each connection as a single quadratic Bézier curve (\`Q\` command) whose control point sits directly above the arc's horizontal midpoint, at a height proportional to the distance between the two endpoints (\`height = Math.min(180, span * 0.75 + 20)\`). This is deliberate, not incidental: because farther-apart nodes automatically get taller arcs, the diagram visually separates short "local" connections (low, tight arcs between adjacent nodes) from long "bridging" connections (tall arcs spanning most of the width) purely from the node ordering, with zero additional data encoding required.

**Arc thickness and color as two more encodings**

Stroke width is scaled by each edge's weight (\`1 + (weight / maxWeight) * 5\`) so heavily-collaborating pairs draw a visibly thicker arc than occasional collaborators, while stroke color is inherited from the *source* node's department color, giving a quick visual sense of which department's connections dominate a given region of the diagram without needing to trace every individual arc back to a legend.

**Hover-to-isolate interaction**

Hovering any node calls \`highlight(nodeId)\`, which toggles a \`.dim\` class (heavily reduced opacity) onto every arc that does *not* touch the hovered node, and an \`.active\` class (full opacity) onto every arc that does. This single loop over a flat array of stored path elements is enough to instantly isolate one node's entire connection set out of a visually dense tangle of overlapping arcs — the interaction that makes arc diagrams practically usable once edge count grows past a handful.

**Why this scales better than a matrix past a certain density**

Unlike a node-link force layout, an arc diagram never has edges crossing *behind* nodes or ambiguous overlaps between unrelated connections — every arc's two endpoints are unambiguously identifiable by which two points on the baseline it touches, even when dozens of arcs of varying height overlap visually.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read node position as grouping', text: 'Nodes are ordered along the baseline by department, so nearby nodes on the line tend to belong to the same team.' },
        { title: 'Read arc height as connection distance', text: 'A tall arc connects two nodes far apart on the line (often across departments); a low, tight arc connects adjacent nodes.' },
        { title: 'Read arc thickness as connection strength', text: 'Thicker arcs represent pairs who share more projects; thin arcs represent occasional collaborators.' },
        { title: 'Hover a node to isolate its connections', text: 'Every arc not touching the hovered node fades out, so you can trace one person\'s full collaboration set instantly.' },
        { title: 'Hover an arc for exact details', text: 'A native tooltip reports both names and the exact shared-project count for that specific connection.' },
        { title: 'Swap in real network data', text: 'Replace NODES and EDGES with your own node list (with a grouping field) and [source, target, weight] edge triples — the layout and arc math work unchanged.' },
      ],
    },
    features: [
      'All nodes placed on a single evenly-spaced baseline, ordered by a meaningful grouping (department)',
      'Arc height computed automatically from node span — distant connections read as taller arcs with zero extra encoding',
      'Arc stroke width scales with edge weight, so connection strength is visually legible at a glance',
      'Arc color inherited from the source node\'s group color for quick regional pattern recognition',
      'Hover-to-isolate interaction dims every unrelated arc, making dense overlapping networks practically readable',
      'Native SVG tooltips report both endpoint names and exact edge weight per arc',
      'Zero crossing-node ambiguity — every arc\'s endpoints are always unambiguous, unlike a free-form force layout',
      'Pure hand-written SVG quadratic Bézier paths — no charting or graph layout library',
    ],
    useCases: [
      { icon: 'DATA', title: 'Organizational and social network analysis', desc: 'Visualize who collaborates with whom across teams, departments, or projects without the visual clutter of a force-directed layout.' },
      { icon: 'CHART', title: 'Ordered-sequence relationship data', desc: 'Any dataset where node order itself carries meaning — chronological events, alphabetical entities, ranked items — benefits from the one-dimensional arc layout.' },
      { icon: 'DASH', title: 'Dense network dashboards', desc: 'When a network has too many edges for a force-directed graph to stay untangled, an arc diagram keeps every connection legible via the hover-isolate interaction.' },
      { icon: 'LEARN', title: 'Teaching quadratic Bézier curve construction', desc: 'A concrete, practical companion to the [Chord Diagram Chart](/ui-snippets/chord-diagram-chart/) for comparing different network-visualization layout strategies.' },
      { icon: 'CODE', title: 'Reference for weighted-edge SVG rendering', desc: 'The span-proportional arc height and weight-proportional stroke width patterns are directly reusable for any custom network or relationship visualization.' },
      { icon: 'CODE', title: 'Related: Horizon Chart', desc: 'See the [Horizon Chart](/ui-snippets/horizon-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is arc height determined?', a: 'arcPathD() computes each arc\'s peak height as proportional to the horizontal distance (span) between its two endpoint nodes, capped at a maximum. Because node order is meaningful, this means arcs between far-apart nodes (often across different groups) automatically render taller than arcs between adjacent nodes, with no separate height value needed in the data.' },
      { q: 'What determines an arc\'s thickness and color?', a: 'Thickness is scaled from each edge\'s weight value relative to the maximum weight in the dataset — stronger connections draw thicker strokes. Color is inherited from the source node\'s group/department color, so arcs visually cluster by which group they originate from.' },
      { q: 'How does hovering a node work?', a: 'Every arc element is stored with its two endpoint IDs as data attributes. Hovering a node calls highlight(nodeId), which loops over every stored arc and toggles a dim class (very low opacity) on arcs not touching that node and an active class (full opacity) on arcs that do — isolating one node\'s full connection set instantly.' },
      { q: 'Why lay nodes out on one line instead of a free-form 2D layout?', a: 'A one-dimensional layout removes any ambiguity about which two nodes an arc connects (unlike a force-directed graph where edges can cross behind other nodes), and lets a meaningful ordering (department, chronology, rank) do useful visual work by grouping related nodes close together on the line.' },
      { q: 'How do I plug in my own network data?', a: 'Replace NODES with your own array of { id, label, dept } objects (dept can be any grouping field used for color and position ordering) and EDGES with [sourceId, targetId, weight] triples. Both the layout math and arc drawing logic work unchanged as long as every edge references valid node IDs.' },
      { q: 'How does this compare to a chord diagram for the same data?', a: 'A chord diagram arranges nodes around a circle and draws ribbons through the interior, which emphasizes total flow volume per node. An arc diagram arranges nodes on a line and draws arcs above it, which better preserves a meaningful linear ordering and scales more gracefully to longer node lists that would crowd a circular layout.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how arcPathD() derives each arc's height from the span between its two endpoints using a single quadratic Bézier control point, and why placing every node on one ordered line eliminates the edge-crossing ambiguity a force-directed layout can have. It's also a good candidate for extension — ask it to add draggable node reordering that recomputes every arc's path live, add a search/filter box that highlights all arcs touching any node matching a typed name, or add directional arrowheads if the underlying relationships are one-directional rather than mutual.`,
      prompt: `Build an arc diagram network chart in plain HTML, CSS, and JavaScript using inline SVG created with createElementNS — no charting or graph-layout library.

Requirements:
- Define a node list where each node has an id, a display label, and a group/category field (e.g. department), and a separate edge list of [sourceId, targetId, weight] triples representing weighted connections between nodes.
- Position every node along a single shared horizontal baseline, evenly spaced in the order they appear in the node list (so grouping the list by category clusters same-category nodes together on the line) — do not give nodes any independent vertical or free-form 2D position.
- Draw each edge as a single quadratic Bézier curve arcing above the baseline, where the curve's peak height is computed proportional to the horizontal distance between its two endpoint nodes (capped at a reasonable maximum), so that connections between distant nodes automatically read as taller arcs than connections between adjacent nodes with no separate height value in the data.
- Scale each arc's stroke width proportional to its weight relative to the maximum weight in the dataset, and color each arc based on its source node's group/category color.
- Draw a small circle node at each node's position on the baseline, filled with that node's group color, with a text label beneath it.
- Implement hover-to-isolate: hovering a node must visually dim every arc that does not connect to it (very reduced opacity) and keep every arc that does connect to it at full opacity, so a dense set of overlapping arcs can be resolved into one node's specific connections on demand.
- Add a native tooltip (or equivalent) on each arc reporting both endpoint node names and the exact edge weight.`,
    },
  },
};

export default arcDiagramChart;
