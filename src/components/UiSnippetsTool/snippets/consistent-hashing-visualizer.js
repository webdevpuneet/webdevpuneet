const consistentHashingVisualizer = {
  id: 'consistent-hashing-visualizer',
  title: 'Consistent Hashing Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="wrap">
  <div class="toolbar">
    <label class="switch-label">
      <input type="checkbox" id="mode-toggle" />
      <span>Naive mod-N hashing</span>
    </label>
    <div class="toolbar-btns">
      <button class="btn" id="btn-add" type="button">Add Server</button>
      <button class="btn" id="btn-remove" type="button">Remove Server</button>
    </div>
  </div>
  <div class="ring-panel">
    <svg id="ring-svg" viewBox="0 0 300 300">
      <circle class="ring" cx="150" cy="150" r="118"></circle>
      <g id="lines-layer"></g>
      <g id="keys-layer"></g>
      <g id="servers-layer"></g>
    </svg>
  </div>
  <div class="legend" id="legend"></div>
  <div class="stats-row">
    <div class="stat"><span class="stat-label">Mode</span><span class="stat-val" id="stat-mode">Consistent</span></div>
    <div class="stat"><span class="stat-label">Active servers</span><span class="stat-val" id="stat-servers">4</span></div>
    <div class="stat"><span class="stat-label">Keys reassigned last change</span><span class="stat-val" id="stat-changed">0</span></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; }

.toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px; }
.switch-label { display: flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; color: #374151; cursor: pointer; }
.switch-label input { accent-color: #6366f1; width: 15px; height: 15px; }

.toolbar-btns { display: flex; gap: 8px; }
.btn { font-size: 12.5px; font-weight: 600; padding: 8px 12px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: #fff; color: #374151; cursor: pointer; transition: all 0.15s; }
.btn:hover { border-color: #cbd5e1; background: #f8fafc; }
.btn:disabled { opacity: 0.45; cursor: not-allowed; }

.ring-panel { display: flex; justify-content: center; }
#ring-svg { width: 100%; max-width: 300px; height: auto; overflow: visible; }

.ring { fill: none; stroke: #e2e8f0; stroke-width: 2; }

.key-dot { r: 4.5; stroke: #fff; stroke-width: 1.5; transition: fill 0.3s ease, transform 0.3s ease; transform-box: fill-box; transform-origin: center; }
.key-dot.flash { transform: scale(2); }

.key-line { stroke-width: 1.6; opacity: 0.55; transition: x2 0.35s ease, y2 0.35s ease, stroke 0.35s ease, opacity 0.3s ease, stroke-width 0.3s ease; }
.key-line.flash { opacity: 1; stroke-width: 3; }

.server-node { transition: opacity 0.25s ease, transform 0.25s ease; transform-box: fill-box; transform-origin: center; }
.server-node.entering { opacity: 0; transform: scale(0.3); }
.server-node.shown { opacity: 1; transform: scale(1); }
.server-node rect { stroke: #fff; stroke-width: 2; }
.server-node text { font-size: 8px; font-weight: 800; fill: #fff; text-anchor: middle; dominant-baseline: middle; pointer-events: none; }

.legend { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; justify-content: center; }
.legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; color: #475569; }
.legend-swatch { width: 10px; height: 10px; border-radius: 3px; }

.stats-row { display: flex; gap: 14px; margin-top: 14px; padding-top: 14px; border-top: 1px solid #f1f5f9; flex-wrap: wrap; }
.stat { display: flex; flex-direction: column; gap: 2px; }
.stat-label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
.stat-val { font-size: 14px; font-weight: 800; color: #0f172a; }`,
  js: `const RING_CX = 150, RING_CY = 150, RING_R = 118;
const SERVER_POOL = ['server-a', 'server-b', 'server-c', 'server-d', 'server-e', 'server-f'];
const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4', '#a855f7'];
const KEY_NAMES = ['user:101', 'user:207', 'user:318', 'user:42', 'user:555', 'user:689', 'user:73', 'user:824', 'user:915', 'session:12'];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

function posFor(angleDeg) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: RING_CX + RING_R * Math.cos(rad), y: RING_CY + RING_R * Math.sin(rad) };
}

const servers = SERVER_POOL.map(name => ({ name: name, angle: hashString('node:' + name), color: COLORS[SERVER_POOL.indexOf(name)] }));
const keys = KEY_NAMES.map(name => ({ name: name, angle: hashString(name) }));

let activeOrder = ['server-a', 'server-b', 'server-c', 'server-d'];
let inactivePool = ['server-e', 'server-f'];
let naiveMode = false;
let currentAssignment = {};

function activeServers() {
  return servers.filter(s => activeOrder.includes(s.name)).sort((a, b) => a.angle - b.angle);
}

function computeAssignment() {
  const active = activeServers();
  const map = {};
  keys.forEach(k => {
    if (naiveMode) {
      const idx = k.angle % active.length;
      map[k.name] = active[idx].name;
    } else {
      let owner = active.find(s => s.angle >= k.angle);
      if (!owner) owner = active[0];
      map[k.name] = owner.name;
    }
  });
  return map;
}

const linesLayer = document.getElementById('lines-layer');
const keysLayer = document.getElementById('keys-layer');
const serversLayer = document.getElementById('servers-layer');
const legend = document.getElementById('legend');

function serverColor(name) {
  const s = servers.find(s => s.name === name);
  return s ? s.color : '#94a3b8';
}

function buildStaticKeyElements() {
  keys.forEach(k => {
    const pos = posFor(k.angle);
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('class', 'key-dot');
    dot.setAttribute('cx', pos.x);
    dot.setAttribute('cy', pos.y);
    dot.setAttribute('r', 4.5);
    dot.dataset.key = k.name;
    keysLayer.appendChild(dot);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('class', 'key-line');
    line.setAttribute('x1', pos.x);
    line.setAttribute('y1', pos.y);
    line.setAttribute('x2', pos.x);
    line.setAttribute('y2', pos.y);
    line.dataset.key = k.name;
    linesLayer.appendChild(line);
  });
}
buildStaticKeyElements();

function renderServers() {
  const active = activeServers();
  const activeNames = active.map(s => s.name);
  Array.from(serversLayer.children).forEach(el => {
    if (!activeNames.includes(el.dataset.server)) {
      el.classList.remove('shown');
      el.classList.add('entering');
      setTimeout(() => el.remove(), 260);
    }
  });
  active.forEach(s => {
    let g = serversLayer.querySelector('[data-server="' + s.name + '"]');
    const pos = posFor(s.angle);
    if (!g) {
      g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'server-node entering');
      g.dataset.server = s.name;
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', pos.x - 11);
      rect.setAttribute('y', pos.y - 11);
      rect.setAttribute('width', 22);
      rect.setAttribute('height', 22);
      rect.setAttribute('rx', 5);
      rect.setAttribute('fill', s.color);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', pos.x);
      text.setAttribute('y', pos.y + 1);
      text.textContent = s.name.slice(-1).toUpperCase();
      g.appendChild(rect);
      g.appendChild(text);
      serversLayer.appendChild(g);
      requestAnimationFrame(() => { g.classList.remove('entering'); g.classList.add('shown'); });
    }
  });
}

function renderLegend() {
  legend.innerHTML = '';
  activeServers().forEach(s => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = '<span class="legend-swatch" style="background:' + s.color + '"></span>' + s.name;
    legend.appendChild(item);
  });
}

function applyAssignment(changedNames) {
  keys.forEach(k => {
    const ownerName = currentAssignment[k.name];
    const ownerServer = servers.find(s => s.name === ownerName);
    const ownerPos = posFor(ownerServer.angle);
    const line = linesLayer.querySelector('[data-key="' + k.name + '"]');
    const dot = keysLayer.querySelector('[data-key="' + k.name + '"]');
    line.setAttribute('x2', ownerPos.x);
    line.setAttribute('y2', ownerPos.y);
    line.setAttribute('stroke', ownerServer.color);
    dot.setAttribute('fill', ownerServer.color);
    if (changedNames.includes(k.name)) {
      line.classList.add('flash');
      dot.classList.add('flash');
      setTimeout(() => { line.classList.remove('flash'); dot.classList.remove('flash'); }, 500);
    }
  });
}

function recompute() {
  const next = computeAssignment();
  const changed = keys.map(k => k.name).filter(name => currentAssignment[name] !== next[name]);
  currentAssignment = next;
  renderServers();
  renderLegend();
  applyAssignment(changed);
  document.getElementById('stat-servers').textContent = String(activeOrder.length);
  document.getElementById('stat-changed').textContent = String(changed.length);
  document.getElementById('stat-mode').textContent = naiveMode ? 'Naive mod-N' : 'Consistent';
  document.getElementById('btn-remove').disabled = activeOrder.length <= 2;
  document.getElementById('btn-add').disabled = inactivePool.length === 0;
}

document.getElementById('btn-add').addEventListener('click', () => {
  if (inactivePool.length === 0) return;
  const name = inactivePool.shift();
  activeOrder.push(name);
  recompute();
});

document.getElementById('btn-remove').addEventListener('click', () => {
  if (activeOrder.length <= 2) return;
  const name = activeOrder.pop();
  inactivePool.unshift(name);
  recompute();
});

document.getElementById('mode-toggle').addEventListener('change', e => {
  naiveMode = e.target.checked;
  recompute();
});

recompute();`,
  seo: {
    title: 'Consistent Hashing Visualizer — Free HTML CSS JS Snippet',
    description: 'Ring-based hashing reassigns only nearby keys on scaling; toggle naive mod-N to see almost every key remap instead. React & Vue ready.',
    about: {
      title: 'Consistent Hashing Visualizer — Animated Hash Ring, Minimal-Reassignment Scaling & Naive Mod-N Comparison in Vanilla JS',
      description: `Consistent hashing is one of the most-referenced but least-visualized concepts in distributed systems interviews, usually summarized as "adding a node only remaps a small fraction of keys" without ever showing why. This snippet implements both consistent hashing and its naive alternative side by side, with a literal toggle between them, so the difference is something you click and watch rather than something you memorize as a bullet point.

**The ring: real trigonometry, not a static image**

Both servers and keys are positioned on a circle using \`posFor(angleDeg)\`, which converts a 0-359 degree value into screen coordinates with \`x = cx + r * cos(angle)\` and \`y = cy + r * sin(angle)\`, offset by -90 degrees so 0 degrees sits at the top of the circle and increasing angle moves clockwise. Every server and key gets its angle from \`hashString(name) % 360\`, a small deterministic hash (a running \`h = h * 31 + charCode\` accumulator, the same multiply-and-add shape as Java's \`String.hashCode\`) applied to its name string. Because the hash is deterministic, the same server or key name always lands at the same point on the ring across every render, which is exactly the property real consistent hashing depends on.

**Consistent hashing: owner is "next server clockwise"**

\`computeAssignment()\` in consistent mode does exactly one thing per key: it walks the currently active servers, sorted by angle, and finds the first one whose angle is greater than or equal to the key's angle — that server owns the key. If no server has a larger angle (the key is past the last server going clockwise), ownership wraps around to the server with the smallest angle, which is what makes the ring a ring instead of a line. This lookup is the entire algorithm; there is no separate rebalancing step, no explicit "move this key" logic — ownership is simply a function of where servers currently sit on the circle.

**Why only nearby keys move when a server is added or removed**

The critical property becomes visible in \`recompute()\`: it snapshots the previous key-to-server assignment map, recomputes a fresh one after a server is added or removed, and diffs the two, animating (a color flash plus a brief scale pulse) only the keys whose owner actually changed. When a new server is inserted at some angle X, it can only ever "steal" keys that fall between X and the previous owner going counter-clockwise from X — every key elsewhere on the ring still finds the same next-clockwise server it always did, because nothing about the ring changed at their position. Removing a server works the same way in reverse: only the keys that server owned get reassigned, to its clockwise neighbor, and every other key's nearest-clockwise-server lookup is completely unaffected. Click Add Server or Remove Server with the demo running and watch most key-to-server lines stay exactly where they are — only a small cluster near the changed node flashes and reroutes.

**Naive mod-N: why almost everything moves**

Toggling "Naive mod-N hashing" switches \`computeAssignment()\` to a completely different rule: \`owner = activeServers[hash(key) % N]\`, where \`N\` is simply how many servers are currently active. This is the modulo-based sharding scheme many systems reach for instinctively — and its flaw is arithmetic, not incidental. Changing \`N\` by adding or removing one server changes the divisor in every single key's \`hash % N\` computation, and because the modulo operation has no relationship to the previous mapping, the vast majority of keys land on a completely different index than before, even though only one server was added or removed. With the naive toggle on, clicking Add Server or Remove Server causes nearly every line on the ring to flash and swing to a new server simultaneously — this snippet doesn't just claim that happens, the exact same diff-and-animate logic used for consistent hashing proves it happens, because it is measuring real reassignment counts from real modulo arithmetic, not a scripted animation.

**Why this matters for caches and databases**

A cache or database shard that uses naive mod-N hashing effectively invalidates almost its entire cache (or forces almost every key to migrate) every time capacity is scaled up or down — exactly when a system is under the most load and can least afford it. Consistent hashing keeps that migration proportional to the size of the change instead of the size of the whole cluster, which is why it underlies real systems like Amazon DynamoDB, Apache Cassandra, and most CDN and cache-sharding layers. The "Keys reassigned last change" stat in this snippet is the same number a real capacity-planning engineer cares about when deciding whether scaling an event will cause a stampede of cache misses.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Look at the ring with 4 active servers and 10 keys', text: 'Each key is a small dot connected by a colored line to the square server node that owns it — the line color matches its owning server\'s color in the legend below.' },
      { title: 'Click Add Server with consistent hashing active (default)', text: 'A new square node fades in at its hashed position on the ring. Watch closely: only the handful of keys between the new node and its counter-clockwise neighbor flash and reroute — every other line stays exactly where it was.' },
      { title: 'Click Remove Server a couple of times', text: 'Only the keys owned by the removed server flash and re-route to its clockwise neighbor. The rest of the ring, including lines untouched by the change, stays completely still.' },
      { title: 'Check the "Naive mod-N hashing" box', text: 'The Mode stat switches to "Naive mod-N" and assignments recompute using hash(key) % serverCount instead of the ring-walk rule.' },
      { title: 'Click Add Server or Remove Server again with naive mode on', text: 'This time nearly every line on the ring flashes at once and swings to a different server — the "Keys reassigned last change" counter jumps close to the total key count instead of staying small.' },
      { title: 'Toggle back to consistent hashing and repeat an add/remove', text: 'Compare the reassignment counters directly: consistent hashing\'s number stays small and proportional to the change; naive mod-N\'s number stays close to the full key count every time.' },
    ]},
    features: [
      'Real trigonometric ring layout: x = cx + r*cos(angle), y = cy + r*sin(angle) for both server and key positions',
      'Deterministic string hash (running multiply-add accumulator) maps every server and key name to a stable 0-359 degree angle',
      'Consistent hashing owner lookup is a single "next server clockwise, wrap at 360" rule with no separate rebalancing step',
      'Naive mode swaps in real hash(key) % activeServerCount modulo assignment for a literal, not simulated, side-by-side comparison',
      'Before/after assignment diffing drives the animation — only keys whose owner actually changed get the flash-and-reroute effect',
      'Add/Remove Server buttons pull from a fixed six-server pool so repeated demos stay deterministic and comparable',
      'Live "Keys reassigned last change" counter turns the core claim into a comparable number, not just a visual impression',
      'Zero dependencies, zero canvas or charting library — plain SVG line, rect, and circle elements with CSS transitions',
    ],
    useCases: [
      { icon: 'LEARN', title: 'System design interview preparation for caching and sharding questions', desc: 'Consistent hashing is one of the most frequently asked system design topics for roles touching caching, databases, or CDNs. Toggling between the two modes and watching real reassignment counts builds the concrete intuition needed to explain "why" during an interview, not just recite the term. Pairs well with the [token bucket rate limiter visualizer](/ui-snippets/token-bucket-rate-limiter-visualizer) for a broader distributed-systems demo set.' },
      { icon: 'DASH', title: 'Capacity planning and scaling-impact dashboards', desc: 'Adapt the assignment-diff logic into an internal tool that estimates real cache-miss or shard-migration impact before a capacity change ships, replacing the simulated servers and keys with actual node and shard identifiers from your infrastructure.' },
      { icon: 'CODE', title: 'Reference implementation before writing a real hash ring', desc: 'The next-clockwise-server lookup and the wrap-around edge case are the two things people most often get wrong implementing consistent hashing from scratch; this snippet\'s computeAssignment() function is a minimal, readable reference for both.' },
      { icon: 'DESIGN', title: 'Teaching material for a distributed systems or backend course', desc: 'Embed as a live, clickable demo in course material or a technical blog post on distributed caching, letting readers trigger their own add/remove events and naive-mode toggles instead of reading a single static ring diagram.' },
      { icon: 'APP', title: 'Explaining a scaling incident retroactively', desc: 'If a past capacity change caused a cache-miss stampede, reproducing the old hashing scheme (naive mode) against the new one (consistent mode) in this visualizer is a fast, concrete way to show a team exactly why the migration was so disruptive and how switching schemes would prevent a repeat.' },
      { icon: 'CODE', title: 'Related: Deployment Pipeline Stage Tracker', desc: 'See the [Deployment Pipeline Stage Tracker](/ui-snippets/deployment-pipeline-stage-tracker/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Can I use this consistent hashing visualizer in React, Vue, or Angular?', a: 'Yes. The hash function, ring math, and computeAssignment() are all pure functions with no DOM references, so they move directly into a utility module. There is no animation loop or interval to clean up here — every animation is a CSS transition triggered by attribute changes, so React can drive it by storing servers/keys/assignment in state and re-rendering SVG elements declaratively (add a key={name} to each line/dot so React reuses the same DOM node and the CSS transition still fires). In Vue, keep the same state in a reactive ref and use :key bindings for the same reason. In Angular, use *ngFor with trackBy on the server/key name so existing SVG elements are reused rather than destroyed and recreated, which is what makes the position and color transitions animate instead of snapping.' },
      { q: 'Why does adding one server only move a few keys in consistent hashing but nearly all keys in naive mod-N?', a: 'In consistent hashing, ownership is "the next server clockwise from a key\'s position" — inserting a new server only changes that answer for keys that fall between the new server and whatever server used to be next-clockwise from that spot; every other key\'s next-clockwise server is unchanged because nothing about the ring changed at their location. In naive mod-N hashing, ownership is hash(key) % serverCount, and changing serverCount changes the divisor for every single key\'s modulo calculation simultaneously, so nearly every key lands on a different index purely from the arithmetic, regardless of where it was before.' },
      { q: 'What is the actual hash function used, and is it good enough for production?', a: 'This snippet uses a simple deterministic string hash (h = h * 31 + charCode for each character, mod 360) purely to get a stable, readable 0-359 angle for demo purposes. Production consistent-hashing implementations use a proper hash function like MD5, MurmurHash, or SHA-1 over a much larger keyspace (commonly 2^32 or 2^64 positions) and typically place multiple "virtual node" points per physical server around the ring to smooth out uneven key distribution, both of which are reasonable next steps if you extend this snippet toward production use.' },
      { q: 'What happens when a key\'s angle is greater than every active server\'s angle?', a: 'The ring wraps around: computeAssignment() falls back to the server with the smallest angle when no server has an angle greater than or equal to the key\'s angle, which correctly models a circle rather than a line with a dead end at 359 degrees. This wrap-around case is exactly the part of consistent hashing that is easiest to get wrong in a from-scratch implementation.' },
      { q: 'Why does the demo use a fixed pool of six server names instead of letting me name my own servers?', a: 'Using a fixed pool (server-a through server-f) with pre-hashed, fixed ring angles keeps every demo run deterministic and directly comparable — clicking Add Server and Remove Server always produces the same before/after ring layout, which makes it possible to trust the reassignment counts you see rather than wondering if a random hash placement happened to be unusually lucky or unlucky.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's JavaScript to an AI assistant like Claude and ask it to trace exactly which keys get reassigned when a specific server is removed, using the actual angles computed by hashString(), to build real intuition for the "only the neighboring arc moves" property. Worthwhile extensions to ask for: virtual nodes (hashing each server to several ring positions to smooth out uneven key distribution), a manual "click anywhere on the ring to add a key at that exact hash" mode, or a running chart of reassignment count over many consecutive add/remove events comparing the two algorithms cumulatively.`,
      prompt: `Build an animated consistent hashing visualizer in plain HTML, CSS, and JavaScript, no libraries or frameworks.

Requirements:
- Render a circular hash ring in SVG using real trigonometry (x = cx + r*cos(angle), y = cy + r*sin(angle)) with a handful of server nodes and several key markers, all positioned by feeding their name strings through a small deterministic hash function that maps to a 0-359 degree angle.
- Implement consistent hashing assignment as "each key belongs to the next server clockwise from its position on the ring, wrapping around to the first server if none is found," and draw a colored line from each key to its currently assigned server.
- Add "Add Server" and "Remove Server" controls that add or remove a server from a fixed pool, then recompute assignments and animate (brief highlight plus a reroute of its connecting line) only the keys whose assigned server actually changed as a result — every unaffected key's line must visibly stay exactly where it was.
- Add a toggle for "naive mod-N hashing" that swaps the assignment rule to hash(key) % currentServerCount, so the exact same add/remove-server action can be replayed under the naive rule and cause nearly all keys to flash and reroute simultaneously, in direct visual contrast to the minimal reassignment under consistent hashing.
- Track and display a live count of how many keys were reassigned by the most recent add/remove action, so the contrast between the two algorithms is a comparable number and not just a visual impression.
- Use a fixed, deterministic pool of server names (not random generation) so repeated demo runs produce the same ring layout and are directly comparable to each other.`,
    },
  },
};

export default consistentHashingVisualizer;
