const connectionPoolMonitorTile = {
  id: 'connection-pool-monitor-tile',
  title: 'Database Connection Pool Monitor Tile',
  lastmod: '2026-08-27',
  category: 'dashboards',
  html: `<div class="demo">
  <div class="pool-tile">
    <div class="pool-head">
      <span class="pool-title">Primary DB Pool</span>
      <span class="pool-badge" id="poolBadge">Healthy</span>
    </div>

    <div class="pool-bar-wrap">
      <div class="pool-bar" id="poolBar" role="img" aria-label="Connection pool usage"></div>
    </div>

    <div class="pool-stats">
      <div class="stat"><span class="dot active"></span><span id="statActive">12</span> active</div>
      <div class="stat"><span class="dot idle"></span><span id="statIdle">8</span> idle</div>
      <div class="stat"><span class="dot waiting"></span><span id="statWaiting">0</span> waiting</div>
    </div>

    <div class="pool-foot">
      <span id="poolCapacityText">20 / 20 max connections</span>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.pool-tile { width: 320px; max-width: 100%; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 14px; }

.pool-head { display: flex; align-items: center; justify-content: space-between; }
.pool-title { font-size: 13px; font-weight: 700; color: #111827; font-family: ui-monospace, monospace; }
.pool-badge { font-size: 10.5px; font-weight: 800; padding: 4px 10px; border-radius: 999px; background: #dcfce7; color: #15803d; transition: background 0.2s, color 0.2s; }
.pool-badge.warn { background: #fef3c7; color: #92400e; }
.pool-badge.crit { background: #fee2e2; color: #b91c1c; }

.pool-bar-wrap { height: 14px; background: #f1f5f9; border-radius: 999px; overflow: hidden; display: flex; }
.pool-bar { display: flex; width: 100%; height: 100%; }
.seg { height: 100%; transition: width 0.3s ease; }
.seg.active { background: #6366f1; }
.seg.idle { background: #a5b4fc; }
.seg.waiting { background: #f87171; }

.pool-stats { display: flex; gap: 16px; }
.stat { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #334155; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.active { background: #6366f1; }
.dot.idle { background: #a5b4fc; }
.dot.waiting { background: #f87171; }

.pool-foot { font-size: 11px; color: #94a3b8; font-weight: 600; }`,
  js: `const poolBar = document.getElementById('poolBar');
const poolBadge = document.getElementById('poolBadge');
const statActive = document.getElementById('statActive');
const statIdle = document.getElementById('statIdle');
const statWaiting = document.getElementById('statWaiting');
const capacityText = document.getElementById('poolCapacityText');

const MAX_CONNECTIONS = 20;
let active = 12;
let idle = 8;
let waiting = 0;

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function render() {
  const total = active + idle;
  const usedPct = (active / MAX_CONNECTIONS) * 100;
  const idlePct = (idle / MAX_CONNECTIONS) * 100;
  const waitingPct = waiting > 0 ? Math.min(15, waiting * 3) : 0; // visual indicator strip, not a real fraction of the pool

  poolBar.innerHTML = \`
    <div class="seg active" style="width:\${usedPct}%"></div>
    <div class="seg idle" style="width:\${idlePct}%"></div>
    \${waiting > 0 ? \`<div class="seg waiting" style="width:\${waitingPct}%"></div>\` : ''}
  \`;

  statActive.textContent = active;
  statIdle.textContent = idle;
  statWaiting.textContent = waiting;
  capacityText.textContent = \`\${total} / \${MAX_CONNECTIONS} max connections\`;
  poolBar.setAttribute('aria-label', \`Connection pool: \${active} active, \${idle} idle, \${waiting} waiting, out of \${MAX_CONNECTIONS} max\`);

  // Health thresholds: waiting connections are the clearest sign of real
  // saturation (the pool is fully exhausted and requests are queuing);
  // near-full utilization with zero waiters is a softer warning sign.
  poolBadge.classList.remove('warn', 'crit');
  if (waiting > 0) {
    poolBadge.textContent = 'Saturated';
    poolBadge.classList.add('crit');
  } else if (total / MAX_CONNECTIONS >= 0.85) {
    poolBadge.textContent = 'Near limit';
    poolBadge.classList.add('warn');
  } else {
    poolBadge.textContent = 'Healthy';
  }
}

// Simulates realistic pool churn: connections open, go idle, close, and
// occasionally the pool saturates and requests start queueing.
function tick() {
  const roll = Math.random();

  if (roll < 0.35 && active + idle < MAX_CONNECTIONS) {
    active += 1; // a new query checks out a connection
  } else if (roll < 0.55 && active > 0) {
    active -= 1;
    idle += 1; // a query finishes, connection returns to idle
  } else if (roll < 0.7 && idle > 0) {
    idle -= 1; // an idle connection is reaped after being unused
  } else if (roll < 0.8 && active + idle >= MAX_CONNECTIONS) {
    waiting += 1; // pool is full — a new request has to queue
  } else if (waiting > 0 && roll < 0.9) {
    waiting -= 1;
    if (active + idle < MAX_CONNECTIONS) active += 1; // a waiter gets a freed connection
  }

  active = clamp(active, 0, MAX_CONNECTIONS);
  idle = clamp(idle, 0, MAX_CONNECTIONS - active);
  waiting = clamp(waiting, 0, 99);

  render();
  setTimeout(tick, 900 + Math.random() * 700);
}

render();
setTimeout(tick, 900 + Math.random() * 700);`,
  seo: {
    title: 'Database Connection Pool Monitor Tile — Live Active/Idle/Waiting Breakdown',
    description: 'A dashboard tile visualizing a database connection pool\'s live active, idle, and waiting connection counts as a segmented bar, with health status derived from real saturation logic.',
    about: {
      title: 'Connection Pool Monitor Tile — Health Status Derived From Real Signals',
      description: `A connection pool's health isn't just "how full is it" — a pool sitting at 90% utilization with zero queued requests is fine; a pool with even one *waiting* request is actively causing latency for whoever is stuck behind it. This tile models that distinction directly: its health badge is computed from **which specific condition** is currently true, not from a single blended percentage.

**Three distinct connection states, each visually and numerically tracked**

The pool's connections are modeled as three separate counts — \`active\` (currently executing a query), \`idle\` (checked out but not currently in use, sitting ready), and \`waiting\` (a request that wants a connection but the pool is fully exhausted). The segmented bar renders one colored segment per state, sized proportionally to \`MAX_CONNECTIONS\`, so a glance at the bar's composition tells you not just how full the pool is, but *what kind* of full it is.

**Health status logic checks waiting first, since it's the sharper signal**

\`render()\`'s badge logic checks \`waiting > 0\` before anything else — any waiting request at all immediately marks the pool "Saturated" (critical), because a nonzero wait queue means real requests are being actively delayed right now. Only if there's no queueing at all does the logic fall back to a softer check: whether total connections (active + idle) are at or above 85% of capacity, which is a "getting close" warning rather than an active problem. This ordering matters — checking utilization percentage first could mask a genuinely saturated-with-queued-requests pool that happens to still have a spare idle connection or two.

**Simulated churn models realistic pool behavior, not just a random walk**

\`tick()\` doesn't just nudge numbers up and down randomly — it models specific *events* a real pool experiences: a new query checking out a connection (\`active\` increases within capacity), a finished query returning its connection to idle, an unused idle connection being reaped, the pool filling up and a new request having to queue, and a queued request finally getting a freed connection. Each event has its own probability band and its own precondition (e.g. a connection can only be reaped if \`idle > 0\`), so the simulated numbers move in ways that resemble genuine pool dynamics rather than an unconstrained random walk that could, for instance, show waiting connections increasing while the pool has open capacity.

**Clamping keeps every simulated value physically sensible**

After every tick, \`active\`, \`idle\`, and \`waiting\` are all explicitly clamped — \`idle\` specifically clamped to \`MAX_CONNECTIONS - active\`, not just \`0\` to \`MAX_CONNECTIONS\` independently — so \`active + idle\` can never exceed the pool's real maximum capacity even if several probabilistic branches happened to push the numbers in the same direction in a short span.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch the tile update live', text: 'Active, idle, and waiting counts change every ~1 second, simulating realistic connection pool churn.' },
        { title: 'Watch the badge change under saturation', text: 'When waiting connections appear, the badge immediately switches to "Saturated" — the clearest real signal of pool exhaustion.' },
        { title: 'Adjust MAX_CONNECTIONS', text: 'Change the pool\'s total capacity constant to model a differently-sized connection pool.' },
        { title: 'Adjust the health thresholds', text: 'Change the 0.85 utilization threshold for the "Near limit" warning state to match your own alerting philosophy.' },
        { title: 'Replace the simulation with real metrics', text: 'Swap the tick() function\'s probabilistic state changes for periodic polling of your actual database driver\'s pool statistics endpoint.' },
      ],
    },
    features: [
      'Three distinct connection states (active, idle, waiting) tracked and visualized separately, not blended into one percentage',
      'Health badge logic checks for actual saturation (waiting > 0) before falling back to a softer utilization warning',
      'Simulated pool churn models specific realistic events, not an unconstrained random walk',
      'Values explicitly clamped so active + idle can never exceed the pool\'s real maximum capacity',
      'Segmented bar visualizes proportional composition of the pool at a glance',
      'role="img" with a dynamically updated aria-label summarizing exact counts for screen readers',
      'Self-contained simulation with realistic randomized timing between updates',
      'Clear, swappable boundary between the simulation logic and the rendering logic for easy real-data integration',
    ],
    useCases: [
      { icon: 'OPS', title: 'Database Operations Dashboards', desc: 'Monitor a production database connection pool\'s health at a glance on an internal ops dashboard.' },
      { icon: 'BACKEND', title: 'Backend Service Health Panels', desc: 'Apply the same active/idle/waiting pattern to any pooled resource — HTTP connections, worker threads, etc.' },
      { icon: 'DEVOPS', title: 'Incident Triage Views', desc: 'Quickly spot which service\'s connection pool is actually saturated versus merely running warm.' },
      { icon: 'CAPACITY', title: 'Capacity Planning Reviews', desc: 'Reference implementation for visualizing pooled-resource utilization broken into meaningful states.' },
      { icon: 'CODE', title: 'Related: Dependency Graph Viewer', desc: 'See the [Dependency Graph Viewer](/ui-snippets/dependency-graph-viewer/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the badge check for waiting connections before checking utilization percentage?', a: 'A nonzero waiting count means real requests are actively queued and being delayed right now — the sharpest possible signal of genuine saturation. Utilization percentage alone can be misleading (a pool at 90% with zero waiters is fine), so waiting connections are checked first and immediately mark the pool critical regardless of the utilization number.' },
      { q: 'Are active + idle guaranteed to never exceed the pool\'s maximum?', a: 'Yes — after every simulated tick, idle is explicitly clamped to MAX_CONNECTIONS - active (not just an independent 0-to-max clamp), which enforces that the two counts together can never exceed the pool\'s real total capacity, even if multiple state changes happened to push in the same direction within one tick.' },
      { q: 'How is the simulated pool behavior kept realistic rather than just random noise?', a: 'tick() models specific named events — a connection checkout, a connection returning to idle, an idle connection being reaped, the pool filling and a request queueing, and a queued request being served — each with its own probability and precondition, rather than nudging the three numbers independently with no relationship between them.' },
      { q: 'How would I connect this to a real database connection pool?', a: 'Replace the tick() function\'s probabilistic state changes with periodic polling of your actual pool\'s real statistics — most database drivers and connection pool libraries (e.g. node-postgres\'s Pool, HikariCP) expose current active/idle/waiting counts directly, which you\'d feed into the same render() function.' },
      { q: 'What does the "waiting" segment\'s width in the bar actually represent?', a: 'It\'s a visual indicator strip scaled from the waiting count (capped at a reasonable maximum width) rather than a literal fraction of pool capacity, since waiting requests aren\'t occupying pool slots the way active/idle connections are — its purpose is to make any nonzero waiting count immediately visible in the bar, not to represent an exact proportion.' },
      { q: 'Can I adjust how aggressive the "Near limit" warning is?', a: 'Yes — change the 0.85 threshold (85% utilization) in the badge logic to whatever fraction matches your own operational alerting philosophy for when a pool nearing capacity deserves a warning versus staying "Healthy".' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why checking for actively waiting connections before checking overall utilization percentage produces a more operationally useful health signal, and to discuss what other pool metrics (like average wait time or connection churn rate) might improve on this simple three-state model. It's also worth asking for a version that plots a short rolling history of the active/idle/waiting counts as a small sparkline strip beneath the current snapshot, or one that fires a visible alert animation the moment the pool first transitions into a saturated state.`,
      prompt: `Build a database connection pool monitoring dashboard tile in HTML, CSS and vanilla JavaScript with a realistic simulated live data feed — no external libraries.

Requirements:
- Track three distinct connection pool states as separate numeric counts: active (in use), idle (available), and waiting (requests queued because the pool is fully exhausted), all bounded by a defined maximum pool capacity.
- Render the current state as a segmented horizontal bar where each segment's width is proportional to its count relative to the maximum capacity, using a distinct color per state.
- Compute a health status badge from real conditions, not a single blended percentage: any nonzero waiting count must immediately produce a "critical/saturated" status regardless of overall utilization; only when there are zero waiting connections should a near-capacity utilization percentage (e.g. 85% or higher) produce a softer "warning" status; otherwise show a "healthy" status.
- Simulate realistic pool churn on an interval using a small set of distinct, named probabilistic events (e.g. a connection being checked out, a connection finishing and going idle, an idle connection being reaped, the pool filling and a request queueing, a queued request being served) rather than adjusting the three counts with unconstrained random noise.
- After every simulated update, ensure the active and idle counts together can never exceed the pool's maximum capacity, and that no count goes negative.
- Give the visualization an appropriate ARIA role and a dynamically updated descriptive label summarizing the exact current counts for screen reader users.`,
    },
  },
};

export default connectionPoolMonitorTile;
