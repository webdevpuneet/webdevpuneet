const trafficLightFsmVisualizer = {
  id: 'traffic-light-fsm-visualizer',
  title: 'Traffic Light FSM Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="fsm-wrap">
  <div class="fsm-diagram">
    <svg id="fsm-svg" viewBox="0 0 420 320" aria-hidden="true">
      <defs>
        <marker id="fsm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#94a3b8"></path>
        </marker>
        <marker id="fsm-arrow-active" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#6366f1"></path>
        </marker>
      </defs>
      <g id="fsm-edges"></g>
      <g id="fsm-nodes"></g>
    </svg>
  </div>

  <div class="fsm-side">
    <div class="fsm-light-box">
      <div class="signal-head" id="signal-head">
        <div class="lamp red" id="lamp-red"></div>
        <div class="lamp yellow" id="lamp-yellow"></div>
        <div class="lamp green" id="lamp-green"></div>
      </div>
      <div class="walk-sign" id="walk-sign">
        <span id="walk-icon">✋</span>
      </div>
      <div class="state-label" id="state-label">RED</div>
    </div>

    <div class="fsm-controls">
      <button class="fsm-btn primary" id="btn-next" type="button">Next transition</button>
      <button class="fsm-btn" id="btn-auto" type="button" aria-pressed="false">Auto-play</button>
    </div>

    <div class="fsm-log" id="fsm-log" aria-live="polite">Event: <b>init</b> — entered state <b>RED</b></div>
  </div>

  <div class="fsm-table-wrap">
    <table class="fsm-table">
      <thead>
        <tr><th>Current state</th><th>Event</th><th>Next state</th></tr>
      </thead>
      <tbody id="fsm-table-body"></tbody>
    </table>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #0f172a; padding: 28px; }

.fsm-wrap { max-width: 920px; margin: 0 auto; display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; }
.fsm-diagram { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px; grid-row: span 1; }
#fsm-svg { width: 100%; height: auto; display: block; }

.fsm-node-circle { fill: #fff; stroke: #cbd5e1; stroke-width: 2; transition: stroke 0.25s, fill 0.25s; }
.fsm-node-circle.active { stroke: #6366f1; stroke-width: 3; fill: #eef2ff; }
.fsm-node-text { font: 600 12px system-ui, sans-serif; fill: #334155; text-anchor: middle; dominant-baseline: middle; pointer-events: none; }
.fsm-node-text.active { fill: #4338ca; }

.fsm-edge-path { fill: none; stroke: #cbd5e1; stroke-width: 1.6; marker-end: url(#fsm-arrow); transition: stroke 0.25s, stroke-width 0.25s; }
.fsm-edge-path.active { stroke: #6366f1; stroke-width: 2.6; marker-end: url(#fsm-arrow-active); }
.fsm-edge-label { font: 600 9px system-ui, sans-serif; fill: #94a3b8; text-anchor: middle; }
.fsm-edge-label.active { fill: #6366f1; }

.fsm-side { display: flex; flex-direction: column; gap: 14px; }
.fsm-light-box { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; }

.signal-head { background: #1e293b; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px; box-shadow: inset 0 2px 6px rgba(0,0,0,0.35); }
.lamp { width: 34px; height: 34px; border-radius: 50%; background: #334155; opacity: 0.35; transition: opacity 0.3s, box-shadow 0.3s, background 0.3s; }
.lamp.red { background: #ef4444; }
.lamp.yellow { background: #f59e0b; }
.lamp.green { background: #22c55e; }
.lamp.on { opacity: 1; box-shadow: 0 0 18px 4px currentColor; }
.lamp.red.on { box-shadow: 0 0 20px 6px rgba(239,68,68,0.75); }
.lamp.yellow.on { box-shadow: 0 0 20px 6px rgba(245,158,11,0.75); }
.lamp.green.on { box-shadow: 0 0 20px 6px rgba(34,197,94,0.75); }

.walk-sign { width: 60px; height: 46px; border-radius: 8px; background: #0f172a; display: flex; align-items: center; justify-content: center; font-size: 22px; transition: background 0.3s; }
#walk-icon { transition: transform 0.2s, opacity 0.2s; }
.walk-sign.walk { background: #14532d; }
.walk-sign.dontwalk { background: #7f1d1d; }

.state-label { font-size: 13px; font-weight: 800; letter-spacing: 0.08em; color: #6366f1; background: #eef2ff; padding: 4px 12px; border-radius: 999px; }

.fsm-controls { display: flex; gap: 8px; }
.fsm-btn { flex: 1; padding: 10px 12px; border-radius: 10px; border: 1.5px solid #e2e8f0; background: #fff; color: #334155; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s, border-color 0.15s, color 0.15s; }
.fsm-btn:hover { border-color: #c7d2fe; }
.fsm-btn.primary { background: #6366f1; color: #fff; border-color: #6366f1; }
.fsm-btn.primary:hover { background: #4f46e5; }
.fsm-btn[aria-pressed="true"] { background: #ecfdf5; border-color: #34d399; color: #047857; }

.fsm-log { font-size: 12px; color: #64748b; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; min-height: 36px; }
.fsm-log b { color: #0f172a; }

.fsm-table-wrap { grid-column: 1 / -1; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 6px; overflow-x: auto; }
.fsm-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
.fsm-table th { text-align: left; padding: 10px 12px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 10px; border-bottom: 1px solid #f1f5f9; }
.fsm-table td { padding: 9px 12px; border-bottom: 1px solid #f8fafc; color: #334155; }
.fsm-table tr.active-row td { background: #eef2ff; color: #4338ca; font-weight: 600; }

@media (max-width: 720px) { .fsm-wrap { grid-template-columns: 1fr; } }`,
  js: `// ---- The state machine definition ----
// This is the whole point of the demo: one plain object keyed by current
// state, where each entry lists the valid transitions out of that state as
// { event, next }. Any "traffic light controller" in the real world -
// firmware, a game NPC, a checkout flow - can be modeled the exact same way.
const STATES = ['RED', 'RED_YELLOW', 'GREEN', 'YELLOW', 'WALK', 'DONT_WALK'];

const TRANSITIONS = {
  RED:         [{ event: 'timer_expired', next: 'RED_YELLOW' }],
  RED_YELLOW:  [{ event: 'timer_expired', next: 'GREEN' }],
  GREEN:       [{ event: 'timer_expired', next: 'YELLOW' }],
  YELLOW:      [{ event: 'timer_expired', next: 'WALK' }],
  WALK:        [{ event: 'timer_expired', next: 'DONT_WALK' }],
  DONT_WALK:   [{ event: 'timer_expired', next: 'RED' }],
};

// Node layout on the SVG canvas (id -> x, y)
const LAYOUT = {
  RED:        { x: 90,  y: 60 },
  RED_YELLOW: { x: 290, y: 60 },
  GREEN:      { x: 350, y: 180 },
  YELLOW:     { x: 220, y: 260 },
  WALK:       { x: 90,  y: 260 },
  DONT_WALK:  { x: 40,  y: 160 },
};

let current = 'RED';
let autoTimer = null;
const AUTO_INTERVAL = 1400;

function nextOf(state) {
  return TRANSITIONS[state][0];
}

function buildDiagram() {
  const nodesG = document.getElementById('fsm-nodes');
  const edgesG = document.getElementById('fsm-edges');
  nodesG.innerHTML = '';
  edgesG.innerHTML = '';

  // Draw edges first so nodes sit visually on top
  STATES.forEach(s => {
    const { next } = nextOf(s);
    const a = LAYOUT[s], b = LAYOUT[next];
    const dx = b.x - a.x, dy = b.y - a.y;
    const dist = Math.hypot(dx, dy) || 1;
    const r = 30;
    const startX = a.x + (dx / dist) * r;
    const startY = a.y + (dy / dist) * r;
    const endX = b.x - (dx / dist) * (r + 8);
    const endY = b.y - (dy / dist) * (r + 8);
    const midX = (startX + endX) / 2 + (dy / dist) * 22;
    const midY = (startY + endY) / 2 - (dx / dist) * 22;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M' + startX + ',' + startY + ' Q' + midX + ',' + midY + ' ' + endX + ',' + endY);
    path.setAttribute('class', 'fsm-edge-path');
    path.dataset.from = s;
    edgesG.appendChild(path);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', midX);
    label.setAttribute('y', midY - 4);
    label.setAttribute('class', 'fsm-edge-label');
    label.dataset.from = s;
    label.textContent = 'timer';
    edgesG.appendChild(label);
  });

  STATES.forEach(s => {
    const { x, y } = LAYOUT[s];
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 30);
    circle.setAttribute('class', 'fsm-node-circle');
    circle.dataset.state = s;

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('class', 'fsm-node-text');
    text.dataset.state = s;
    text.textContent = s.replace('_', ' ');

    g.appendChild(circle);
    g.appendChild(text);
    nodesG.appendChild(g);
  });
}

function buildTable() {
  const body = document.getElementById('fsm-table-body');
  body.innerHTML = '';
  STATES.forEach(s => {
    const { event, next } = nextOf(s);
    const tr = document.createElement('tr');
    tr.dataset.state = s;
    tr.innerHTML = '<td>' + s.replace('_', ' ') + '</td><td>' + event + '</td><td>' + next.replace('_', ' ') + '</td>';
    body.appendChild(tr);
  });
}

function paint() {
  document.querySelectorAll('.fsm-node-circle').forEach(el => {
    el.classList.toggle('active', el.dataset.state === current);
  });
  document.querySelectorAll('.fsm-node-text').forEach(el => {
    el.classList.toggle('active', el.dataset.state === current);
  });
  document.querySelectorAll('.fsm-edge-path').forEach(el => {
    el.classList.toggle('active', el.dataset.from === current);
  });
  document.querySelectorAll('.fsm-edge-label').forEach(el => {
    el.classList.toggle('active', el.dataset.from === current);
  });
  document.querySelectorAll('.fsm-table-body tr, #fsm-table-body tr').forEach(el => {
    el.classList.toggle('active-row', el.dataset.state === current);
  });

  const lamps = { red: 'lamp-red', yellow: 'lamp-yellow', green: 'lamp-green' };
  Object.values(lamps).forEach(id => document.getElementById(id).classList.remove('on'));
  const walkSign = document.getElementById('walk-sign');
  const walkIcon = document.getElementById('walk-icon');
  walkSign.classList.remove('walk', 'dontwalk');

  if (current === 'RED') {
    document.getElementById('lamp-red').classList.add('on');
  } else if (current === 'RED_YELLOW') {
    document.getElementById('lamp-red').classList.add('on');
    document.getElementById('lamp-yellow').classList.add('on');
  } else if (current === 'GREEN') {
    document.getElementById('lamp-green').classList.add('on');
  } else if (current === 'YELLOW') {
    document.getElementById('lamp-yellow').classList.add('on');
  } else if (current === 'WALK') {
    document.getElementById('lamp-red').classList.add('on');
    walkSign.classList.add('walk');
    walkIcon.textContent = '🚶';
  } else if (current === 'DONT_WALK') {
    document.getElementById('lamp-red').classList.add('on');
    walkSign.classList.add('dontwalk');
    walkIcon.textContent = '✋';
  }

  document.getElementById('state-label').textContent = current.replace('_', ' ');
}

function step() {
  const { event, next } = nextOf(current);
  const from = current;
  current = next;
  paint();
  document.getElementById('fsm-log').innerHTML =
    'Event: <b>' + event + '</b> — ' + from.replace('_', ' ') + ' \\u2192 <b>' + next.replace('_', ' ') + '</b>';
}

function setAuto(on) {
  const btn = document.getElementById('btn-auto');
  btn.setAttribute('aria-pressed', String(on));
  btn.textContent = on ? 'Auto-play: on' : 'Auto-play';
  if (on) {
    autoTimer = setInterval(step, AUTO_INTERVAL);
  } else if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
}

document.getElementById('btn-next').addEventListener('click', step);
document.getElementById('btn-auto').addEventListener('click', () => {
  setAuto(!autoTimer);
});

buildDiagram();
buildTable();
paint();`,
  seo: {
    title: 'Traffic Light FSM Visualizer — Free JS State Machine Snippet',
    description: 'Live finite-state-machine diagram driving a real traffic light UI, with a transition table. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Traffic Light Finite State Machine Visualizer — Diagram, Transition Table & Working Signal in Vanilla JS',
      description: `A **finite state machine** (FSM) is one of the oldest and most reusable ideas in software: a system has a fixed set of named states, it is only ever in exactly one of them at a time, and it moves between states through well-defined events. This snippet makes that abstract idea concrete by pairing a live node-and-arrow diagram with an actual working traffic light, so the diagram and the UI move in perfect lockstep — click "Next transition" and watch the same change happen in the graph, the physical-looking signal head, and a plain-English transition table at the same time.

**The data model is the whole lesson**

Everything is driven by one object: \`TRANSITIONS\`, keyed by current state name, where each entry is an array of \`{ event, next }\` pairs describing which events are valid from that state and which state they lead to. \`RED\` only accepts \`timer_expired\` and only ever goes to \`RED_YELLOW\`. There is no giant if/else chain and no scattered boolean flags like \`isRed\`, \`wasYellow\`, \`pedestrianTurn\` — a single lookup table is both the documentation and the executable logic. This is exactly the shape you would use for an order-status pipeline (\`PENDING → PAID → SHIPPED → DELIVERED\`), a multi-step signup wizard, a media player's play/pause/buffer states, or a game character's idle/walk/attack states. Once you see the pattern here you can lift the \`TRANSITIONS\` object structure directly into any of those problems.

**Six states, not three**

Most "traffic light" demos stop at red/yellow/green, but a real intersection controller has more nuance: this one adds a \`RED_YELLOW\` transitional state (used in many countries to warn drivers the green is coming) and a full pedestrian cycle (\`WALK\` / \`DONT_WALK\`) that shares the red phase. Modeling six states instead of three is what makes the FSM pattern legible — with only three states it is tempting to just cycle an array index, but six states with asymmetric behavior (the walk sign only changes during the red phase) forces you to actually use the event/transition lookup rather than a shortcut.

**Drawing the diagram procedurally with SVG**

The graph is not hand-drawn markup — \`buildDiagram()\` reads a \`LAYOUT\` object mapping each state name to an (x, y) coordinate, then generates SVG \`<circle>\`, \`<text>\`, and curved \`<path>\` elements with \`document.createElementNS\`. Edge curves use a quadratic Bezier whose control point is offset perpendicular to the straight line between two nodes (\`midX/midY\` nudged along the normal direction \`(dy/dist, -dx/dist)\`), which is what keeps the arrows visually separated instead of overlapping straight lines. Arrowheads are SVG \`<marker>\` elements referenced by \`marker-end\`, so the arrow head recolors automatically when the \`active\` class swaps the path's stroke color — no separate arrowhead element to keep in sync.

**Highlighting active state and the just-taken transition**

Every state transition calls a single \`paint()\` function that toggles an \`.active\` class based on a simple dataset comparison (\`el.dataset.state === current\`), applied identically to the SVG nodes, the SVG edges, and the transition table rows. Because all three views read from the exact same \`current\` variable and the exact same class-toggle logic, the diagram, the table, and the signal light can never visually disagree with each other — there is only one source of truth.

**Driving a real signal head from the same state**

The physical-looking signal — three lamp \`<div>\`s with a glow effect from \`box-shadow\`, plus a separate pedestrian sign — is just another consumer of \`current\`. \`paint()\` maps each of the six state names to which lamps get the \`.on\` class and what the walk sign shows, meaning the visual traffic light is not simulated independently; it is a direct rendering of the same FSM state that drives the diagram. This is the same separation you would use in production: one authoritative state variable, and any number of "view" functions that render from it.

**Manual stepping and timed auto-play**

\`step()\` looks up the single valid transition for the current state, updates \`current\`, calls \`paint()\`, and logs the event that fired. \`setAuto()\` wraps that same \`step()\` call in a \`setInterval\`, so auto-play is not a separate code path — it is the identical transition function fired on a timer instead of a click. Toggling auto-play off calls \`clearInterval\` and nulls the timer reference, which matters when porting this into a component framework: that timer must be torn down on unmount or it keeps firing against a detached DOM.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Look at the diagram and the signal together', text: 'Six circular nodes are connected by curved arrows in a loop. The currently active node glows indigo, and the real traffic-light graphic below shows the matching lamp lit or the walk sign showing.' },
      { title: 'Click "Next transition"', text: 'The active node moves to the next state in the diagram, the arrow you just followed briefly highlights, the signal lamps swap, and a log line appears describing the event that fired, e.g. "timer_expired — RED → RED YELLOW".' },
      { title: 'Watch the transition table update', text: 'The row matching the current state is highlighted in the table below the diagram, showing exactly which event and next-state pair the state machine just used — the same data driving the graph.' },
      { title: 'Toggle Auto-play', text: 'Click "Auto-play" to have the machine step itself every 1.4 seconds. The button turns green and shows "Auto-play: on" while it runs; click again to stop it mid-cycle.' },
      { title: 'Follow a full cycle', text: 'Let it run through all six states — red, red+yellow, green, yellow, walk, don\'t walk — and back to red, noticing the pedestrian phase only appears during the red-light portion of the cycle.' },
      { title: 'Read the code as a template', text: 'Open the JS tab and look at the TRANSITIONS object — that lookup table is the reusable pattern; everything else (SVG diagram, lamps, table) is just a renderer for whatever state that object says is current.' },
    ]},
    features: [
      'Single TRANSITIONS lookup object (state -> [{event, next}]) as the sole source of truth for logic',
      'Procedurally generated SVG diagram: nodes and curved Bezier-offset edges built from a plain layout object',
      'Arrowheads via SVG <marker> elements that recolor automatically when the edge path\'s active class toggles',
      'Six-state model including a RED_YELLOW transitional phase and a full WALK/DONT_WALK pedestrian cycle',
      'One paint() function synchronizes the diagram, the signal lamps, and the transition table from one variable',
      'Manual "Next transition" stepping and a timer-driven Auto-play mode sharing the identical step() function',
      'Live event log announcing "event — fromState -> toState" on every transition, marked aria-live for screen readers',
      'Zero dependencies: hand-rolled SVG generation with document.createElementNS, no diagramming library',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching finite state machines to junior developers', desc: 'Use this as a live whiteboard: point at the TRANSITIONS object and the highlighted diagram node simultaneously to show that "the code" and "the diagram" are the same information in two forms — a clearer way to introduce FSMs than a static slide.' },
      { icon: 'CODE', title: 'Reference pattern for order-status and workflow pipelines', desc: 'Copy the TRANSITIONS-object shape directly for a checkout flow (CART → PAYMENT → CONFIRMED → SHIPPED) or an approval workflow (DRAFT → REVIEW → APPROVED → PUBLISHED), swapping in your own state names and event labels without touching the rendering logic.' },
      { icon: 'DESIGN', title: 'Product and engineering handoff diagrams', desc: 'Drop this into a design-system or documentation site so product managers can click through a feature\'s state transitions themselves instead of reading a static diagram exported from a whiteboard tool.' },
      { icon: 'APP', title: 'Onboarding a multi-step signup or wizard flow', desc: 'Model wizard steps as states and required-field-complete as the event, then reuse the same active-node highlighting pattern to show users a live progress map, similar in spirit to a [progress wizard](/ui-snippets/progress-wizard).' },
      { icon: 'GAME', title: 'Game character or enemy AI behavior diagrams', desc: 'Idle/patrol/chase/attack is a textbook FSM — this snippet\'s TRANSITIONS table maps directly onto a game AI behavior graph for debugging or design documentation.' },
      { icon: 'LEARN', title: 'Interview and computer-science coursework demos', desc: 'A compact, dependency-free way to demonstrate FSM concepts (states, alphabet/events, transition function) for a data structures course or a technical interview whiteboard session.' },
    ],
    faqs: [
      { q: 'How do I add a new state or change the transition order?', a: 'Add the state name to the STATES array, add its position to the LAYOUT object (x, y coordinates on the 420x320 SVG canvas), and add an entry to TRANSITIONS mapping it to the event and next state you want. No other code needs to change — buildDiagram(), buildTable(), and paint() all iterate over STATES and TRANSITIONS generically.' },
      { q: 'Can a state have more than one possible next state (branching)?', a: 'Yes conceptually — TRANSITIONS[state] is already an array, this demo just uses one entry per state for a simple deterministic cycle. To support branching, extend TRANSITIONS[state] with multiple {event, next} objects, render one arrow per entry in buildDiagram(), and add buttons or condition checks in step() that pick which transition to fire based on the actual event that occurred, not just nextOf(state)[0].' },
      { q: 'Why use one paint() function instead of updating each view separately in step()?', a: 'Keeping a single paint() function that reads the current variable and re-renders every view (diagram, lamps, table) guarantees they can never drift out of sync. If step() manually updated the diagram in one place and the lamps in another, a future edit to one path but not the other would silently break the visual link between them — a classic bug class this pattern avoids entirely.' },
      { q: 'Can I use this traffic light state machine in React, Vue, or Angular?', a: 'Yes. Keep TRANSITIONS and LAYOUT as plain constants outside the component. In React, hold current in useState and call your paint-equivalent as a render derived from that state rather than direct DOM classList toggles; run setAuto\'s setInterval inside a useEffect and return a cleanup function that calls clearInterval. In Vue, use a ref for current inside onMounted/onUnmounted with the same interval cleanup; in Angular, start the interval in ngAfterViewInit and clear it in ngOnDestroy so the timer does not keep firing against a destroyed component.' },
      { q: 'Does the diagram support more complex layouts or many-state machines?', a: 'The LAYOUT object accepts any coordinate pair per state, so you can lay out ten or twenty states in a grid or circle by computing coordinates programmatically (e.g. placing N states evenly around a circle with trigonometry) instead of hand-picking each x/y. The Bezier edge-curving logic in buildDiagram() works for any two coordinates, so it scales past six states without modification.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JS into an AI assistant like Claude and ask it to walk through why the perpendicular-offset math in buildDiagram() (the dy/dist, -dx/dist terms) is what curves the edges instead of drawing straight overlapping lines — it is a small but genuinely useful piece of vector math worth understanding once. From there, good extensions to ask for: support branching transitions with multiple events per state and buttons to choose which one fires, animate the arrowhead traveling along the path during a transition instead of just recoloring it, or auto-generate the LAYOUT coordinates in a circle for an arbitrary number of states so the diagram scales past six nodes without manual positioning.`,
      prompt: `Build a finite-state-machine visualizer in plain HTML, CSS, and JavaScript that shows a live diagram driving a real traffic light UI, no libraries.

Requirements:
- Define the state machine as one plain JavaScript object keyed by current-state name, where each value is an array of {event, next} transition objects — this object must be the single source of truth, not a separate switch statement.
- Model at least five or six states for a realistic light cycle (e.g. red, red+yellow, green, yellow, and a pedestrian walk/don\'t-walk phase), not just three.
- Procedurally generate an SVG diagram from a layout object mapping each state name to x/y coordinates: circular nodes with labels, and curved arrows (quadratic Bezier, offset perpendicular to the straight line between nodes) connecting each state to its next state, using SVG marker elements for arrowheads.
- Render an actual traffic-light graphic (three lamp elements plus a pedestrian sign) whose lit lamp and sign are derived from the exact same "current state" variable that drives the diagram, so they can never visually disagree.
- Provide a manual "Next transition" button that advances one step, and a toggleable auto-play mode that calls the identical step function on a setInterval, cleanly clearable when toggled off.
- Highlight the active diagram node and the just-taken transition arrow distinctly from inactive ones, and show a small transition table listing every state, its event, and its next state, with the current row highlighted.
- Log each transition in a small readable line like "event — fromState -> toState" so the mechanism is legible without reading the console.`,
    },
  },
};

export default trafficLightFsmVisualizer;
