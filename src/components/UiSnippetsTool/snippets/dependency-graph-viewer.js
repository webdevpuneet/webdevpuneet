const dependencyGraphViewer = {
  id: 'dependency-graph-viewer',
  title: 'Dependency Graph Viewer',
  lastmod: '2026-08-08',
  category: 'dashboards',
  html: `<div class="wrap">
  <div class="toolbar">
    <div class="toolbar-title">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="12" r="3"/><path d="M6 9v6M9 7l6 3M9 17l6-3"/></svg>
      <span>Service Dependencies</span>
    </div>
    <div class="toolbar-hint" id="hint">Hover or click a node to trace its connections</div>
  </div>
  <div class="graph-stage">
    <svg id="graph-svg" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid meet"></svg>
    <div class="panel" id="panel">
      <div class="panel-empty" id="panel-empty">No node selected</div>
      <div class="panel-body" id="panel-body" style="display:none">
        <div class="panel-name" id="panel-name"></div>
        <div class="panel-row"><span class="panel-label">Depends on</span><span class="panel-count" id="panel-deps"></span></div>
        <div class="panel-row"><span class="panel-label">Depended on by</span><span class="panel-count" id="panel-dependents"></span></div>
      </div>
    </div>
  </div>
  <div class="legend">
    <span class="legend-item"><i class="dot dot-core"></i>core</span>
    <span class="legend-item"><i class="dot dot-service"></i>service</span>
    <span class="legend-item"><i class="dot dot-lib"></i>library</span>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 680px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }

.toolbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid #f1f5f9; }
.toolbar-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #0f172a; }
.toolbar-title svg { color: #6366f1; }
.toolbar-hint { font-size: 12px; color: #94a3b8; }

.graph-stage { position: relative; background: radial-gradient(circle at 30% 20%, #fafbff, #f4f5fb); }
#graph-svg { width: 100%; height: 400px; display: block; cursor: grab; }

.edge { stroke: #cbd5e1; stroke-width: 1.4; transition: stroke 0.2s, stroke-width 0.2s, opacity 0.25s; }
.edge.edge-active { stroke: #6366f1; stroke-width: 2.2; }
.edge.edge-dim { opacity: 0.12; }

.node-label { font-size: 10px; font-weight: 600; fill: #334155; pointer-events: none; user-select: none; transition: opacity 0.25s, fill 0.2s; }
.node-label.dim { opacity: 0.25; }

.node-circle { stroke: #fff; stroke-width: 2; cursor: pointer; transition: opacity 0.25s, filter 0.2s, r 0.15s; }
.node-circle.dim { opacity: 0.2; }
.node-circle.active { filter: drop-shadow(0 0 6px rgba(99,102,241,0.6)); }

.panel { position: absolute; top: 12px; right: 12px; width: 180px; background: rgba(255,255,255,0.92); backdrop-filter: blur(6px); border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; box-shadow: 0 4px 16px rgba(15,23,42,0.08); }
.panel-empty { font-size: 12px; color: #94a3b8; }
.panel-name { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 8px; word-break: break-word; }
.panel-row { display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: #64748b; padding: 3px 0; }
.panel-count { font-weight: 700; color: #6366f1; background: #eef2ff; border-radius: 6px; padding: 1px 7px; }

.legend { display: flex; gap: 16px; padding: 10px 18px; border-top: 1px solid #f1f5f9; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #64748b; }
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.dot-core { background: #6366f1; }
.dot-service { background: #22c55e; }
.dot-lib { background: #f59e0b; }`,
  js: `const NODES = [
  { id: 'gateway', label: 'API Gateway', group: 'core' },
  { id: 'auth', label: 'Auth Service', group: 'service' },
  { id: 'users', label: 'Users Service', group: 'service' },
  { id: 'orders', label: 'Orders Service', group: 'service' },
  { id: 'billing', label: 'Billing Service', group: 'service' },
  { id: 'notify', label: 'Notifier', group: 'service' },
  { id: 'db', label: 'Postgres', group: 'core' },
  { id: 'cache', label: 'Redis Cache', group: 'core' },
  { id: 'queue', label: 'Message Queue', group: 'core' },
  { id: 'http', label: 'http-client', group: 'lib' },
  { id: 'logger', label: 'log-utils', group: 'lib' },
  { id: 'validator', label: 'schema-validate', group: 'lib' },
];

const EDGES = [
  ['gateway', 'auth'], ['gateway', 'users'], ['gateway', 'orders'],
  ['orders', 'billing'], ['orders', 'notify'], ['orders', 'db'],
  ['billing', 'queue'], ['billing', 'db'], ['notify', 'queue'],
  ['auth', 'users'], ['auth', 'cache'], ['users', 'db'],
  ['users', 'cache'], ['orders', 'http'], ['billing', 'http'],
  ['auth', 'logger'], ['orders', 'logger'], ['gateway', 'validator'],
  ['orders', 'validator'],
];

const W = 640, H = 400;
const REPULSION = 2600;
const SPRING_K = 0.02;
const REST_LENGTH = 90;
const DAMPING = 0.86;
const CENTER_PULL = 0.0025;

const nodeMap = {};
NODES.forEach((n, i) => {
  const angle = (i / NODES.length) * Math.PI * 2;
  nodeMap[n.id] = Object.assign({}, n, {
    x: W / 2 + Math.cos(angle) * 140 + (Math.random() - 0.5) * 30,
    y: H / 2 + Math.sin(angle) * 140 + (Math.random() - 0.5) * 30,
    vx: 0, vy: 0,
  });
});

const svg = document.getElementById('graph-svg');
const edgeEls = [];
const nodeEls = [];

EDGES.forEach(([a, b]) => {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('class', 'edge');
  svg.appendChild(line);
  edgeEls.push({ a, b, el: line });
});

NODES.forEach(n => {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('class', 'node-circle');
  circle.setAttribute('r', n.group === 'core' ? 12 : n.group === 'service' ? 9 : 7);
  circle.setAttribute('fill', n.group === 'core' ? '#6366f1' : n.group === 'service' ? '#22c55e' : '#f59e0b');
  circle.dataset.id = n.id;
  svg.appendChild(circle);

  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  label.setAttribute('class', 'node-label');
  label.setAttribute('text-anchor', 'middle');
  label.textContent = n.label;
  svg.appendChild(label);

  nodeEls.push({ id: n.id, circle, label });
  circle.addEventListener('mouseenter', () => select(n.id));
  circle.addEventListener('click', () => select(n.id, true));
});

let selectedId = null;
let pinnedId = null;

function neighborsOf(id) {
  const deps = new Set();
  const dependents = new Set();
  EDGES.forEach(([a, b]) => {
    if (a === id) deps.add(b);
    if (b === id) dependents.add(a);
  });
  return { deps, dependents };
}

function select(id, pin) {
  if (pin) pinnedId = (pinnedId === id) ? null : id;
  selectedId = pinnedId || id;
  applyHighlight();
}

function clearHover() {
  if (!pinnedId) {
    selectedId = null;
    applyHighlight();
  }
}
svg.addEventListener('mouseleave', clearHover);

function applyHighlight() {
  const panelEmpty = document.getElementById('panel-empty');
  const panelBody = document.getElementById('panel-body');
  const hint = document.getElementById('hint');

  if (!selectedId) {
    edgeEls.forEach(e => { e.el.classList.remove('edge-active', 'edge-dim'); });
    nodeEls.forEach(n => { n.circle.classList.remove('active', 'dim'); n.label.classList.remove('dim'); });
    panelEmpty.style.display = 'block';
    panelBody.style.display = 'none';
    hint.textContent = 'Hover or click a node to trace its connections';
    return;
  }

  const { deps, dependents } = neighborsOf(selectedId);
  const connected = new Set([selectedId, ...deps, ...dependents]);

  edgeEls.forEach(e => {
    const touches = e.a === selectedId || e.b === selectedId;
    e.el.classList.toggle('edge-active', touches);
    e.el.classList.toggle('edge-dim', !touches);
  });
  nodeEls.forEach(n => {
    const on = connected.has(n.id);
    n.circle.classList.toggle('active', n.id === selectedId);
    n.circle.classList.toggle('dim', !on);
    n.label.classList.toggle('dim', !on);
  });

  const node = nodeMap[selectedId];
  panelEmpty.style.display = 'none';
  panelBody.style.display = 'block';
  document.getElementById('panel-name').textContent = node.label;
  document.getElementById('panel-deps').textContent = deps.size;
  document.getElementById('panel-dependents').textContent = dependents.size;
  hint.textContent = pinnedId ? 'Click the node again to unpin' : node.label;
}

function tick() {
  const ids = Object.keys(nodeMap);

  for (let i = 0; i < ids.length; i++) {
    const a = nodeMap[ids[i]];
    for (let j = i + 1; j < ids.length; j++) {
      const b = nodeMap[ids[j]];
      let dx = a.x - b.x, dy = a.y - b.y;
      let distSq = dx * dx + dy * dy;
      if (distSq < 1) distSq = 1;
      const dist = Math.sqrt(distSq);
      const force = REPULSION / distSq;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      a.vx += fx; a.vy += fy;
      b.vx -= fx; b.vy -= fy;
    }
  }

  EDGES.forEach(([aId, bId]) => {
    const a = nodeMap[aId], b = nodeMap[bId];
    const dx = b.x - a.x, dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const stretch = dist - REST_LENGTH;
    const force = SPRING_K * stretch;
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;
    a.vx += fx; a.vy += fy;
    b.vx -= fx; b.vy -= fy;
  });

  ids.forEach(id => {
    const n = nodeMap[id];
    n.vx += (W / 2 - n.x) * CENTER_PULL;
    n.vy += (H / 2 - n.y) * CENTER_PULL;
    n.vx *= DAMPING;
    n.vy *= DAMPING;
    n.x += n.vx;
    n.y += n.vy;
    n.x = Math.max(24, Math.min(W - 24, n.x));
    n.y = Math.max(24, Math.min(H - 24, n.y));
  });

  edgeEls.forEach(e => {
    const a = nodeMap[e.a], b = nodeMap[e.b];
    e.el.setAttribute('x1', a.x); e.el.setAttribute('y1', a.y);
    e.el.setAttribute('x2', b.x); e.el.setAttribute('y2', b.y);
  });
  nodeEls.forEach(n => {
    const p = nodeMap[n.id];
    n.circle.setAttribute('cx', p.x); n.circle.setAttribute('cy', p.y);
    n.label.setAttribute('x', p.x); n.label.setAttribute('y', p.y - 16);
  });

  requestAnimationFrame(tick);
}

tick();`,
  seo: {
    title: 'Dependency Graph Viewer — Free HTML CSS JS Snippet',
    description: 'Animated force-directed node graph with hand-written repulsion and spring physics, hover-to-trace highlighting. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Dependency Graph Viewer — Hand-Written Force Simulation, Repulsion, Springs & Damping in Vanilla JS',
      description: `Dependency graphs, service maps, and package trees are usually rendered with heavyweight libraries like D3-force, Cytoscape, or vis-network — multi-hundred-kilobyte dependencies for what is, at its core, two simple physics rules applied every animation frame. This snippet builds a force-directed graph layout from scratch: no physics engine, no charting library, just a \`requestAnimationFrame\` loop that nudges node positions based on repulsion and spring forces until the layout settles into something readable. It renders a set of services (API Gateway, Auth, Orders, Billing, a Postgres core, a Redis cache, a couple of shared libraries) as SVG circles connected by lines, and lets you hover or click any node to trace exactly what it depends on and what depends on it.

**The two forces: repulsion and springs**

Every pair of nodes repels each other, the same way charged particles push apart in a simplified Coulomb's-law model. For each pair, the code computes the distance between them and applies a force proportional to \`REPULSION / distSq\` along the line connecting them — closer nodes push apart harder, distant nodes barely notice each other. This is what keeps nodes from all collapsing into a single point. Independently, every *edge* in the dependency list acts like a spring: the code measures the current distance between the two connected nodes, subtracts a \`REST_LENGTH\` (90px) to get the stretch amount, and applies a force proportional to that stretch times a spring constant \`SPRING_K\`. Stretched-too-far edges pull their nodes together; compressed edges push them apart. Nodes with no edge between them never feel a spring force at all — only the constant repulsion. The interplay of these two forces is the entire layout algorithm: repulsion pushes everything apart, springs pull connected things back together, and the graph naturally organizes into clusters where tightly-connected services sit close and unrelated nodes drift to the edges.

**Why damping is non-negotiable**

Without friction, a spring-and-repulsion system oscillates forever — every force calculation adds velocity, and with nothing removing energy from the system, nodes would swing past their equilibrium position, get pulled back, overshoot again, and never settle. Real springs lose energy to heat and air resistance; this simulation fakes that by multiplying every node's velocity by a \`DAMPING\` constant (0.86) at the end of every frame, after forces are applied but before the position update. Each frame throws away about 14% of the node's speed. Early on, when forces are large and nodes are moving fast, damping barely dents the motion and the layout unfolds quickly. As the layout approaches equilibrium and forces shrink, the same proportional damping increasingly dominates, so velocities decay toward zero and the graph visibly stops jittering rather than vibrating indefinitely. A small constant center-pull force (\`CENTER_PULL\`) is also applied toward the canvas midpoint on every node, which keeps loosely-connected corner nodes from drifting off toward infinity since repulsion alone has no bound.

**Integration: velocity, then position, every frame**

The \`tick()\` function runs once per animation frame. It first zeroes nothing — velocities persist between frames — and accumulates every repulsion and spring force into each node's \`vx\`/\`vy\`. Only after all forces for the frame are summed does it apply damping and then update \`x\`/\`y\` by adding the (now-damped) velocity. This order matters: computing all forces before touching any position means the physics for this frame is based on a single consistent snapshot of the graph, not a partially-updated one where some pairs used old positions and others used new ones (a subtle bug that produces asymmetric, jittery layouts if forces are applied node-by-node instead of batched).

**SVG for rendering, not canvas**

Nodes are individual \`<circle>\` and \`<text>\` SVG elements rather than a single \`<canvas>\` bitmap. This trade-off costs a little performance at very large node counts, but it means each node is a real DOM element that can receive its own \`mouseenter\` and \`click\` listeners directly, and CSS classes like \`.dim\` and \`.edge-active\` can be toggled with ordinary \`classList\` calls and animate via CSS transitions instead of manual redraw logic. For the dozen-to-few-dozen node counts typical of a service map or package tree, this is both simpler to read and cheaper to maintain than a canvas hit-testing layer.

**Hover-to-trace highlighting**

Selecting a node (via hover, or click to pin) computes its direct \`deps\` (outgoing edges) and \`dependents\` (incoming edges) by scanning the edge list. Every edge touching the selected node gets an \`.edge-active\` class; every other edge gets \`.edge-dim\`, which CSS fades to 12% opacity. The same happens for node circles and labels not in the connected set. This is purely a CSS-class-toggle operation layered on top of the physics loop — the simulation keeps running underneath regardless of what is currently highlighted, so hovering never interrupts or resets the layout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch the graph settle into a layout', text: 'On load, twelve nodes start in a rough circle and immediately begin repelling each other while their dependency edges pull connected nodes together. Within a second or two the jitter visibly damps out and the layout stabilizes.' },
      { title: 'Hover any node to trace its connections', text: 'Moving the mouse over a node dims every unrelated node and edge, leaving only the hovered node, its direct dependencies, and its dependents at full opacity — with the active edges turned indigo.' },
      { title: 'Click a node to pin the highlight', text: 'Clicking locks the highlight so you can move the mouse to the side panel or elsewhere without losing the trace. Click the same node again to unpin and return to the neutral view.' },
      { title: 'Read the side panel counts', text: 'The panel in the top-right shows the selected node\'s exact name plus a live count of how many services it depends on and how many depend on it, updating instantly on hover or click.' },
      { title: 'Drag never breaks the simulation', text: 'Because the layout is recomputed every frame from live x/y state rather than a one-time calculation, resizing the container or leaving the tab and returning never leaves the graph in a broken or frozen state.' },
    ]},
    features: [
      'Hand-written force simulation: pairwise inverse-square repulsion plus Hooke\'s-law spring edges, no physics library',
      'Velocity/damping integration every requestAnimationFrame tick — 0.86 damping factor prevents infinite oscillation',
      'Weak center-pull force keeps loosely-connected nodes from drifting off-canvas',
      'SVG circles and lines rendered as real DOM nodes with per-node mouseenter/click listeners',
      'Hover-to-highlight: direct dependencies and dependents stay bright, everything else dims to 12% opacity',
      'Click-to-pin selection so the trace survives moving the mouse away from the node',
      'Live side panel showing dependency counts for the selected node',
      'Three-tier color legend (core / service / library) mapped to node fill color and radius',
    ],
    useCases: [
      { icon: 'DASH', title: 'Microservice architecture dashboards', desc: 'Visualize which services call which in a platform engineering dashboard, so an on-call engineer can hover a failing service and instantly see every downstream dependent that might be affected. Pair with a [kanban board](/ui-snippets/kanban-board/) for tracking the incident response tasks that follow.' },
      { icon: 'CODE', title: 'Package and module dependency explorers', desc: 'Render an npm/pip/cargo dependency tree as an interactive graph instead of a flat nested list — useful for spotting circular dependencies or an overly-central "god module" that everything routes through, similar in spirit to a [tree menu](/ui-snippets/tree-menu/) but showing many-to-many relationships instead of strict hierarchy.' },
      { icon: 'LEARN', title: 'Teaching force-directed layout algorithms', desc: 'A compact, readable reference for how libraries like D3-force actually work under the hood — repulsion, springs, damping and integration in under 150 lines, useful alongside the [network graph](/ui-snippets/three-network-graph/) and [particle network](/ui-snippets/particle-network/) snippets for comparing 2D and 3D approaches.' },
      { icon: 'DESIGN', title: 'Infrastructure and org relationship mapping', desc: 'Swap the node data for infrastructure components (load balancers, databases, queues) or organizational reporting lines to get a self-arranging relationship diagram without manually positioning a single node.' },
      { icon: 'APP', title: 'Data lineage and pipeline visualization', desc: 'Model upstream and downstream data pipeline stages as nodes and edges so analysts can trace which dashboards or reports break if a given source table changes.' },
      { icon: 'CODE', title: 'Related: Goal Progress Ring', desc: 'See the [Goal Progress Ring](/ui-snippets/goal-progress-ring/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the graph keep moving slightly even after it looks settled?', a: 'Damping (0.86 per frame) reduces velocity multiplicatively, not to exactly zero, so technically the simulation approaches rest asymptotically rather than stopping outright. In practice velocities drop below a visually perceptible threshold within a second or two. If you want it to fully halt and stop consuming CPU, add a check in tick() that sums the total velocity magnitude across all nodes and calls cancelAnimationFrame instead of requesting the next frame once that sum drops below a small threshold like 0.05.' },
      { q: 'How do I add or remove nodes and edges?', a: 'Edit the NODES array (each entry needs an id, label, and group of core/service/lib) and the EDGES array (pairs of ids). The DOM elements, force calculations, and highlight logic all derive from these two arrays automatically — no other code needs to change. New nodes start positioned around a circle and the simulation settles them into place within the first second.' },
      { q: 'Will this stay smooth with hundreds of nodes?', a: 'The repulsion step is O(n^2) since every node pairs with every other node each frame, so it stays comfortably smooth up to roughly 100-150 nodes on typical hardware. Past that, either reduce the update frequency (skip every other frame), switch to a spatial partitioning approach like a quadtree (the technique D3-force and Barnes-Hut simulations use), or fall back to a canvas renderer instead of individual SVG DOM elements.' },
      { q: 'Can I use this dependency graph in React, Vue, or Angular?', a: 'Yes. In React, move the tick() requestAnimationFrame loop into a useEffect with an empty dependency array, store the animation frame id in a ref, and call cancelAnimationFrame(ref.current) in the cleanup function so the loop stops on unmount. In Vue, start the loop in onMounted and cancel it in onUnmounted. In Angular, start it in ngAfterViewInit and cancel it in ngOnDestroy. In every framework, the node/edge DOM elements can stay as directly-manipulated SVG refs rather than being re-rendered through the framework\'s virtual DOM each frame, since the position updates need to run at 60fps outside the framework\'s normal render cycle.' },
      { q: 'How do I make specific nodes stay fixed instead of drifting?', a: 'Add a fixed: true flag to a node in NODES, then in tick(), skip the velocity/position update block for any node where nodeMap[id].fixed is true (still let it participate in repulsion and spring forces affecting other nodes, just do not move it). This is the same "pinned node" pattern D3-force calls fx/fy.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JS into an AI assistant like Claude and ask it to walk through exactly why forces are accumulated into vx/vy for every node before any position is updated, rather than updating each node's position as soon as its forces are computed — it's a subtle but important ordering bug to understand before you modify the simulation. It's also worth asking the assistant to explain the physical intuition behind why REPULSION and SPRING_K need to be tuned together, since changing one without the other can either collapse the graph into a tight ball or blow it apart. For extending the snippet, ask for drag-to-reposition support with mouse events pinning a node while dragged, a toggle between this hand-rolled simulation and a canvas-based renderer for larger graphs, or a directional arrowhead on each edge to show dependency direction rather than an undirected line.`,
      prompt: `Build an interactive force-directed dependency graph in plain HTML, CSS, and JavaScript, rendered as SVG — no D3, no physics library, no external dependencies.

Requirements:
- A small dataset of named nodes (with a group/category field) and an edge list of directed id pairs representing dependencies.
- A hand-written force simulation running inside a requestAnimationFrame loop: every node pair repels each other with a force inversely proportional to the square of the distance between them (like Coulomb's law), and every edge acts as a spring pulling its two nodes toward a fixed rest length using Hooke's law (force proportional to how far the current distance is from the rest length).
- Accumulate all forces for a frame into each node's velocity BEFORE updating any node's position, so the physics for that frame is based on one consistent snapshot rather than partially-updated positions.
- Apply a damping multiplier (roughly 0.85-0.9) to every node's velocity each frame, and explain in a comment why the simulation would oscillate forever without it.
- Add a small constant pull-toward-center force so nodes with few or no connections do not drift off the visible canvas.
- Render nodes as SVG circles with text labels and edges as SVG lines, updating their x/y/x1/y1/x2/y2 attributes every frame from the simulation state.
- Hovering a node should highlight it plus its direct dependencies and dependents (full opacity, edges colored) while dimming every unrelated node and edge; clicking a node should pin that highlight until clicked again.
- A small side panel showing the currently selected node's name and a live count of its outgoing and incoming connections.`,
    },
  },
};

export default dependencyGraphViewer;
