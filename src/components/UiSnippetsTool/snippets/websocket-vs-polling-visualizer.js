const websocketVsPollingVisualizer = {
  id: 'websocket-vs-polling-visualizer',
  title: 'WebSocket vs Polling Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="wrap">
  <div class="panels">
    <div class="panel">
      <div class="panel-head">
        <span class="panel-title">Polling</span>
        <span class="panel-tag">request every 2s</span>
      </div>
      <div class="lane" id="poll-lane">
        <div class="node client">Client</div>
        <div class="track" id="poll-track"></div>
        <div class="node server">Server</div>
      </div>
      <div class="panel-stats">
        <div class="pstat"><span class="pstat-label">Round trips</span><span class="pstat-val" id="poll-trips">0</span></div>
        <div class="pstat"><span class="pstat-label">Wasted (empty)</span><span class="pstat-val bad" id="poll-wasted">0</span></div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head">
        <span class="panel-title">WebSocket</span>
        <span class="panel-tag" id="ws-tag">connecting&hellip;</span>
      </div>
      <div class="lane" id="ws-lane">
        <div class="node client">Client</div>
        <div class="track" id="ws-track"></div>
        <div class="node server">Server</div>
      </div>
      <div class="panel-stats">
        <div class="pstat"><span class="pstat-label">Pushes</span><span class="pstat-val ok" id="ws-pushes">0</span></div>
        <div class="pstat"><span class="pstat-label">Wasted</span><span class="pstat-val ok" id="ws-wasted">0</span></div>
      </div>
    </div>
  </div>
  <button class="btn btn-primary" id="btn-event" type="button" disabled>Simulate new event on server</button>
  <div class="log-panel">
    <div class="log-title">Timeline</div>
    <div class="log-list" id="log-list"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 620px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; }

.panels { display: flex; gap: 14px; margin-bottom: 14px; }
.panel { flex: 1; background: #f8fafc; border: 1px solid #eef2f7; border-radius: 12px; padding: 12px; }
.panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.panel-title { font-size: 12.5px; font-weight: 700; color: #374151; }
.panel-tag { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; }
.panel-tag.live { color: #16a34a; }

.lane { display: flex; align-items: center; gap: 6px; }
.node { flex-shrink: 0; font-size: 10.5px; font-weight: 700; padding: 6px 8px; border-radius: 7px; background: #e2e8f0; color: #475569; }
.track { position: relative; flex: 1; height: 44px; border-top: 2px dashed #e2e8f0; border-bottom: 2px dashed #e2e8f0; overflow: hidden; }

.packet { position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%; margin-top: -6px; transform: translateX(0); }
.packet.req { background: #6366f1; left: 0; }
.packet.res-empty { background: #cbd5e1; left: 0; }
.packet.res-data { background: #22c55e; left: 0; }
.packet.push { background: #22c55e; left: 0; box-shadow: 0 0 0 4px rgba(34,197,94,0.25); }

@keyframes travelRight { from { left: 0%; opacity: 1; } to { left: calc(100% - 12px); opacity: 1; } }
@keyframes travelLeft { from { left: calc(100% - 12px); opacity: 1; } to { left: 0%; opacity: 1; } }
@keyframes fadePop { 0% { opacity: 0; transform: translateY(-6px) scale(0.6); } 20% { opacity: 1; transform: translateY(-6px) scale(1); } 100% { opacity: 0; transform: translateY(-6px) scale(1); } }

.handshake-line { position: absolute; top: 50%; left: 0; height: 2px; width: 0; background: #22c55e; margin-top: -1px; transition: width 0.6s ease; }
.handshake-line.done { width: 100%; }

.panel-stats { display: flex; gap: 10px; margin-top: 10px; }
.pstat { flex: 1; background: #fff; border: 1px solid #eef2f7; border-radius: 8px; padding: 7px; text-align: center; }
.pstat-label { display: block; font-size: 9.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; }
.pstat-val { font-size: 15px; font-weight: 800; color: #0f172a; }
.pstat-val.bad { color: #ef4444; }
.pstat-val.ok { color: #16a34a; }

.btn { width: 100%; font-size: 13px; font-weight: 600; padding: 10px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: #fff; color: #374151; cursor: pointer; transition: all 0.15s; }
.btn-primary { background: #6366f1; border-color: #6366f1; color: #fff; }
.btn-primary:hover:not(:disabled) { background: #4f46e5; border-color: #4f46e5; }
.btn:disabled { opacity: 0.45; cursor: not-allowed; }

.log-panel { margin-top: 14px; padding-top: 14px; border-top: 1px solid #f1f5f9; }
.log-title { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
.log-list { display: flex; flex-direction: column-reverse; gap: 4px; max-height: 130px; overflow-y: auto; }
.log-item { font-size: 11.5px; padding: 5px 9px; border-radius: 6px; font-family: ui-monospace, monospace; background: #f8fafc; color: #475569; animation: slideIn 0.18s ease; }
.log-item.ok { color: #15803d; background: #ecfdf5; }
.log-item.bad { color: #b91c1c; background: #fef2f2; }
@keyframes slideIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`,
  js: `const POLL_INTERVAL = 2000;
let pollTrips = 0;
let pollWasted = 0;
let wsPushes = 0;
let wsWasted = 0;
let startTime = performance.now();
let pollTimer = null;
let wsConnected = false;

const pollTrack = document.getElementById('poll-track');
const wsTrack = document.getElementById('ws-track');

function elapsed() { return ((performance.now() - startTime) / 1000).toFixed(1); }

function log(text, kind) {
  const list = document.getElementById('log-list');
  const el = document.createElement('div');
  el.className = 'log-item' + (kind ? ' ' + kind : '');
  el.textContent = '[' + elapsed() + 's] ' + text;
  list.appendChild(el);
  while (list.children.length > 40) list.removeChild(list.firstChild);
}

function spawnPacket(track, cls, direction, onArrive) {
  const el = document.createElement('div');
  el.className = 'packet ' + cls;
  track.appendChild(el);
  requestAnimationFrame(() => {
    el.style.animation = (direction === 'right' ? 'travelRight' : 'travelLeft') + ' 0.7s linear forwards';
  });
  setTimeout(() => {
    if (onArrive) onArrive();
    el.remove();
  }, 720);
}

function runPollCycle() {
  const hasNewData = Math.random() < 0.28;
  pollTrips++;
  document.getElementById('poll-trips').textContent = String(pollTrips);
  spawnPacket(pollTrack, 'req', 'right', () => {
    spawnPacket(pollTrack, hasNewData ? 'res-data' : 'res-empty', 'left', () => {
      if (hasNewData) {
        log('Polling: request returned new data', 'ok');
      } else {
        pollWasted++;
        document.getElementById('poll-wasted').textContent = String(pollWasted);
        log('Polling: request returned nothing \\u2014 wasted round trip', 'bad');
      }
    });
  });
}

function startPolling() {
  runPollCycle();
  pollTimer = setInterval(runPollCycle, POLL_INTERVAL);
}

function connectWebSocket() {
  const line = document.createElement('div');
  line.className = 'handshake-line';
  wsTrack.appendChild(line);
  requestAnimationFrame(() => line.classList.add('done'));
  log('WebSocket: one-time handshake started', 'ok');
  setTimeout(() => {
    wsConnected = true;
    document.getElementById('ws-tag').textContent = 'connected, idle';
    document.getElementById('ws-tag').classList.add('live');
    document.getElementById('btn-event').disabled = false;
    log('WebSocket: connection open \\u2014 no more round trips needed', 'ok');
  }, 650);
}

function simulateServerEvent() {
  if (!wsConnected) return;
  wsPushes++;
  document.getElementById('ws-pushes').textContent = String(wsPushes);
  spawnPacket(wsTrack, 'push', 'left', () => {
    log('WebSocket: server pushed a message instantly, zero round trip', 'ok');
  });
}

document.getElementById('btn-event').addEventListener('click', simulateServerEvent);

startPolling();
connectWebSocket();
log('Simulation started \\u2014 polling fires every 2s regardless of new data, WebSocket connects once');`,
  seo: {
    title: 'WebSocket vs Polling Visualizer — Free HTML CSS JS Snippet',
    description: 'Side-by-side animation shows polling\'s wasted round trips against a WebSocket\'s instant, zero-latency server push. Exports to React & Vue.',
    about: {
      title: 'WebSocket vs Polling Visualizer — Animated Round-Trip Timer vs Persistent Push Connection in Vanilla JS',
      description: `"WebSockets are more efficient than polling" is a sentence almost every frontend developer has repeated without necessarily having watched the two approaches run side by side long enough to see why. This snippet runs both simultaneously, on the same clock, so the difference in wasted round trips and delivery latency is something you count rather than something you take on faith.

**Polling: a real fixed-interval loop, not a one-off animation**

The left panel runs \`startPolling()\`, which fires an initial \`runPollCycle()\` immediately and then repeats it every \`POLL_INTERVAL\` (2000ms) using a genuine \`setInterval\` — this is not a scripted five-step animation, it keeps running for as long as the page is open, exactly like a real polling client would. Each cycle spawns a request packet that animates from the Client node to the Server node over 700ms using a CSS keyframe animation (\`travelRight\`), and the moment it "arrives," a response packet animates back (\`travelLeft\`). Whether that response carries new data is decided by \`Math.random() < 0.28\` — a roughly 28% chance per poll — which mimics the real-world situation of polling for updates that do not arrive on every single check.

**Why most polling round trips are wasted, made countable**

Every completed poll cycle increments the Round Trips counter unconditionally, but only the cycles where \`hasNewData\` was false increment the separate Wasted counter, rendered in the response packet as a dim grey dot instead of a green one. Over any reasonably long run, the Wasted count climbs steadily even while nothing meaningful is happening on the server — because the fixed-interval loop has no way to know whether new data exists without asking, so it has to ask on a timer regardless. This is the concrete, countable version of the standard "polling wastes bandwidth and server load on empty checks" claim: watch the Wasted number and the Round Trips number converge toward the same value during a quiet period, meaning nearly every request in that stretch accomplished nothing.

**WebSocket: one handshake, animated once, never repeated**

The right panel's \`connectWebSocket()\` runs exactly once on load. It animates a single green line growing across the client-server track over 600ms — representing the one-time HTTP Upgrade handshake that turns a normal HTTP connection into a persistent WebSocket connection — and then sets \`wsConnected = true\`. After that, no more connection-establishing work happens for the rest of the session; the panel tag switches to "connected, idle" and stays that way until an event fires. There is no interval running in the WebSocket panel at all, which is the structural point: a persistent connection means the client is not periodically doing anything just to check in.

**Server push: latency measured against polling's worst case, not its best**

Clicking "Simulate new event on server" calls \`simulateServerEvent()\`, which spawns a single green \`push\` packet that travels directly from Server to Client over 700ms with no preceding request packet — the server-initiated push has no round trip to complete, only a one-way delivery. Compare this to polling's worst case: if new data becomes available the instant after a poll just checked and found nothing, that update sits undelivered for up to the full 2000ms interval before the next poll happens to catch it. The WebSocket push in this snippet always delivers within one packet's travel time regardless of when the underlying event occurred, because there is no polling clock gating when the client finds out.

**Reading the two Wasted counters together**

The WebSocket panel's Wasted stat stays at zero for the entire simulation, and it is not decorative — there is genuinely no code path in \`simulateServerEvent()\` or \`connectWebSocket()\` that can produce an empty round trip, because the architecture has no round trips at all after the initial handshake. Placed next to polling's climbing Wasted counter over the same simulated time period, the two numbers make the efficiency argument concrete: polling pays a fixed cost on a timer whether or not it has anything to report, while a WebSocket pays a one-time connection cost and then only moves data when there is actually data to move.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch both panels start at the same moment', text: 'Polling begins firing a request-response cycle every 2 seconds immediately; the WebSocket panel animates a single green handshake line growing across its track.' },
      { title: 'Watch the polling packets travel back and forth', text: 'An indigo request dot travels client-to-server, then a response dot travels back — grey if it carried nothing new, green if it happened to carry data, roughly 28% of the time.' },
      { title: 'Watch the WebSocket panel settle into "connected, idle"', text: 'Once the handshake animation finishes, the tag turns green and the Simulate button becomes enabled — no further packets travel until you trigger one.' },
      { title: 'Click "Simulate new event on server" a few times', text: 'Each click sends a single green packet directly from Server to Client with no preceding request — there is no round trip, just a one-way push that arrives in one packet\'s travel time.' },
      { title: 'Compare the Round Trips and Wasted counters on the polling side', text: 'Over a quiet stretch with no real updates, most or all polling cycles land in the Wasted column even though the Round Trips counter keeps climbing on its fixed 2-second timer regardless.' },
      { title: 'Compare both panels\' Wasted stats side by side', text: 'Polling\'s Wasted count keeps rising over time; WebSocket\'s Wasted count stays at zero for the entire simulation, because a push only ever happens when you explicitly trigger a real event.' },
    ]},
    features: [
      'Polling runs a genuine setInterval loop firing every 2 seconds for as long as the page stays open, not a scripted one-off animation',
      'Each poll cycle randomly decides (28% chance) whether it carries new data, mimicking real-world polling for infrequent updates',
      'Distinct grey vs green response packet colors make empty polls visually distinguishable from useful ones at a glance',
      'WebSocket handshake animates exactly once on load, then the connection sits idle with zero further connection-establishing work',
      'Server-initiated push has no preceding request packet at all — a true one-way delivery, not a disguised round trip',
      'Running Wasted counters on both panels turn the efficiency argument into two directly comparable numbers over the same time period',
      'Timestamped shared timeline log narrates every request, response, handshake, and push event as it happens on either side',
      'Zero dependencies — pure CSS keyframe animations for packet travel, setInterval and setTimeout for real timing, no charting library',
    ],
    useCases: [
      { icon: 'APP', title: 'Explaining real-time architecture choices to a team', desc: 'Use this before a design discussion about whether a feature needs WebSockets, Server-Sent Events, or plain polling — watching wasted round trips accumulate live is far more persuasive than a bullet-point comparison table. Pairs well with the [token bucket rate limiter visualizer](/ui-snippets/token-bucket-rate-limiter-visualizer) for a broader networking concepts demo set.' },
      { icon: 'LEARN', title: 'Teaching networking fundamentals and real-time web concepts', desc: 'A frequently asked interview and coursework topic — this visualizer turns "WebSockets avoid the overhead of repeated HTTP requests" from a memorized line into something a student can watch happen and count for themselves.' },
      { icon: 'CODE', title: 'Reference for choosing between polling and push in a real feature', desc: 'The random 28% new-data rate is a stand-in for asking "how often does this data actually change" — use the same mental model to estimate whether your own feature\'s update frequency justifies the added complexity of a persistent connection.' },
      { icon: 'DASH', title: 'Dashboard widget for illustrating live update delivery methods', desc: 'Adapt the dual-lane packet animation as a status widget in an internal engineering dashboard, swapping the simulated timers for real metrics pulled from your actual polling endpoints and WebSocket connection counts.' },
      { icon: 'DESIGN', title: 'Interactive demo for a networking or systems course', desc: 'Embed as a live, clickable companion to a lecture on real-time web communication, letting students trigger their own server events and watch delivery latency compared directly against a running polling loop instead of reading a static sequence diagram.' },
    ],
    faqs: [
      { q: 'Can I use this WebSocket vs polling visualizer in React, Vue, or Angular?', a: 'Yes, with careful cleanup. The polling loop\'s setInterval must be started in a lifecycle hook and cleared on unmount: in React, start it in a useEffect and return a cleanup function calling clearInterval; in Vue, start it in onMounted and clear it in onUnmounted; in Angular, start it in ngOnInit and clear it in ngOnDestroy. The WebSocket panel\'s one-time handshake setTimeout should also be tracked and cleared the same way in case the component unmounts mid-handshake. Because packet travel is driven by CSS keyframe animations rather than a JS animation loop, there is no requestAnimationFrame loop to cancel — only the setInterval and any pending setTimeout calls need cleanup.' },
      { q: 'Why does polling waste round trips even when the interval is short?', a: 'A polling client has no way to know whether new data exists without asking, so it has to ask on a fixed schedule regardless of whether anything actually changed since the last check. In this snippet, roughly 72% of poll cycles find nothing new, and each of those still costs a full request-response round trip, network overhead, and server processing — the Wasted counter tracks exactly that fraction directly, and it climbs regardless of how short you make the interval, only the total round trip count changes.' },
      { q: 'Does a WebSocket really have zero latency, or is that simplified?', a: 'A real WebSocket push still takes some network time to arrive — it is not literally instantaneous — but it has no round trip to complete and no polling interval gating when the client finds out, so its latency is bounded by network transit time alone, typically milliseconds. This snippet\'s 700ms push animation represents that one-way transit visually; the meaningful contrast is not "zero versus nonzero" but "bounded only by network speed" versus "bounded by up to a full polling interval," which can be seconds.' },
      { q: 'When is polling actually the better choice over a WebSocket?', a: 'Polling is simpler to implement, works through any standard HTTP infrastructure without special server support, and is perfectly reasonable when updates are infrequent, some delay is acceptable, or the number of concurrent clients is small enough that the wasted-request overhead does not matter. A persistent WebSocket connection has its own cost — the server must hold open a connection per client — which does not scale for free either; this snippet demonstrates the request-efficiency trade-off, not a blanket claim that WebSockets are free.' },
      { q: 'Why does the WebSocket panel show a Wasted stat if it is always zero?', a: 'Keeping a Wasted counter on both panels, even though the WebSocket one never increments, makes the comparison symmetric and lets the zero speak for itself directly next to polling\'s climbing number, rather than asking the reader to notice an absence. It is the same stat measured the same way on both sides of the same simulated time period.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's JavaScript to an AI assistant like Claude and ask it to explain exactly why the WebSocket panel's Wasted counter can never increment given the current code paths, or to estimate how the Wasted-versus-Round-Trips ratio would change if the random new-data chance were raised or lowered. Worth asking for as extensions: Server-Sent Events as a third comparison lane, an adjustable polling interval slider to watch the wasted-trip rate change live, or a running bandwidth-estimate stat that multiplies round trips by an assumed payload size for both approaches.`,
      prompt: `Build a side-by-side animated comparison of polling versus WebSocket updates in plain HTML, CSS, and JavaScript, no libraries or frameworks.

Requirements:
- A "Polling" panel with a Client node and a Server node connected by a track. Run a real setInterval loop (e.g. every 2 seconds) that animates a request packet traveling client-to-server and then a response packet traveling back, for as long as the page stays open, not a fixed one-time sequence.
- Make the response packet's outcome random on each cycle (e.g. roughly a quarter of the time it carries genuinely new data, rendered in a distinct color; the rest of the time it is empty, rendered as a dimmer/grey packet), to model realistic polling for infrequent updates.
- A "WebSocket" panel with the same Client/Server node layout, where a one-time handshake animation plays once on load (a line or pulse growing across the track), after which the connection is marked open and no further connection-establishing animation ever repeats.
- A "Simulate new event on server" button that, once the WebSocket is connected, sends a single packet animating directly from Server to Client with no preceding request packet, representing a true one-way push with no round trip.
- Track and display, for both panels independently, a running count of total round trips (polling side) or pushes (WebSocket side), and a separate running count of "wasted" round trips that carried no new data, so the two approaches can be compared as concrete numbers over the same simulated time period, not just visually.
- Use CSS keyframe animations for packet travel along each track, and real setInterval/setTimeout timing (not a manually stepped fake clock) so the comparison reflects genuine elapsed time.`,
    },
  },
};

export default websocketVsPollingVisualizer;
