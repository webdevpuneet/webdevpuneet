const reconnectBackoffVisualizer = {
  id: 'reconnect-backoff-visualizer',
  title: 'Reconnect Backoff Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="rbv-wrap">
  <div class="rbv-card">
    <div class="rbv-header">
      <div class="rbv-status">
        <span class="rbv-dot" id="rbv-dot"></span>
        <span class="rbv-status-text" id="rbv-status-text">Connected</span>
      </div>
      <button class="rbv-btn" id="rbv-disconnect-btn">Simulate Disconnect</button>
    </div>

    <div class="rbv-controls">
      <label class="rbv-control-label" for="rbv-succeed-at">Succeed on attempt</label>
      <select id="rbv-succeed-at" class="rbv-select">
        <option value="0">Random chance</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3" selected>3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>

    <div class="rbv-current" id="rbv-current" hidden>
      <div class="rbv-current-row">
        <span class="rbv-current-label">Attempt <span id="rbv-attempt-num">1</span></span>
        <span class="rbv-current-delay" id="rbv-delay-label">waiting 1.00s</span>
      </div>
      <div class="rbv-progress-track">
        <div class="rbv-progress-fill" id="rbv-progress-fill"></div>
      </div>
      <div class="rbv-formula" id="rbv-formula">base 1000ms &times; 2^0 + jitter 0-300ms</div>
    </div>

    <div class="rbv-timeline-label">Attempt log</div>
    <div class="rbv-timeline" id="rbv-timeline">
      <div class="rbv-empty" id="rbv-empty">No attempts yet. Click "Simulate Disconnect" to start.</div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 28px; }

.rbv-wrap { width: 100%; max-width: 420px; }
.rbv-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

.rbv-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.rbv-status { display: flex; align-items: center; gap: 8px; }
.rbv-dot { width: 10px; height: 10px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 4px rgba(34,197,94,0.15); transition: background 0.2s, box-shadow 0.2s; flex-shrink: 0; }
.rbv-dot.disconnected { background: #ef4444; box-shadow: 0 0 0 4px rgba(239,68,68,0.15); }
.rbv-dot.reconnecting { background: #f59e0b; box-shadow: 0 0 0 4px rgba(245,158,11,0.15); animation: rbv-pulse 1s ease-in-out infinite; }
@keyframes rbv-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }

.rbv-status-text { font-size: 14px; font-weight: 700; color: #0f172a; }

.rbv-btn { font-size: 12.5px; font-weight: 600; color: #fff; background: #6366f1; border: none; border-radius: 8px; padding: 8px 14px; cursor: pointer; transition: background 0.15s; white-space: nowrap; }
.rbv-btn:hover:not(:disabled) { background: #4f46e5; }
.rbv-btn:disabled { background: #cbd5e1; cursor: not-allowed; }

.rbv-controls { display: flex; align-items: center; justify-content: space-between; gap: 10px; background: #f8fafc; border: 1px solid #eef1f8; border-radius: 10px; padding: 8px 12px; margin-bottom: 14px; }
.rbv-control-label { font-size: 12px; font-weight: 600; color: #64748b; }
.rbv-select { font-size: 12.5px; font-weight: 600; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 6px; padding: 4px 8px; background: #fff; }

.rbv-current { background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 12px 14px; margin-bottom: 16px; }
.rbv-current-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.rbv-current-label { font-size: 12.5px; font-weight: 700; color: #92400e; }
.rbv-current-delay { font-size: 12px; font-weight: 600; color: #b45309; font-variant-numeric: tabular-nums; }

.rbv-progress-track { height: 6px; border-radius: 4px; background: #fde68a; overflow: hidden; }
.rbv-progress-fill { height: 100%; width: 0%; background: linear-gradient(90deg, #f59e0b, #fb923c); border-radius: 4px; }

.rbv-formula { font-size: 10.5px; color: #b45309; margin-top: 6px; font-family: ui-monospace, Consolas, monospace; }

.rbv-timeline-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
.rbv-timeline { display: flex; flex-direction: column; gap: 6px; max-height: 220px; overflow-y: auto; }
.rbv-empty { font-size: 12.5px; color: #94a3b8; padding: 10px 2px; }

.rbv-entry { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px; background: #f8fafc; border: 1px solid #eef1f8; font-size: 12px; animation: rbv-entry-in 0.25s ease; }
@keyframes rbv-entry-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

.rbv-entry-badge { flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; color: #fff; }
.rbv-entry-badge.fail { background: #ef4444; }
.rbv-entry-badge.ok { background: #22c55e; }

.rbv-entry-text { flex: 1; color: #374151; }
.rbv-entry-text b { color: #0f172a; }
.rbv-entry-time { color: #94a3b8; font-variant-numeric: tabular-nums; flex-shrink: 0; }`,
  js: `const dot = document.getElementById('rbv-dot');
const statusText = document.getElementById('rbv-status-text');
const disconnectBtn = document.getElementById('rbv-disconnect-btn');
const succeedSelect = document.getElementById('rbv-succeed-at');
const currentPanel = document.getElementById('rbv-current');
const attemptNumEl = document.getElementById('rbv-attempt-num');
const delayLabel = document.getElementById('rbv-delay-label');
const progressFill = document.getElementById('rbv-progress-fill');
const formulaEl = document.getElementById('rbv-formula');
const timeline = document.getElementById('rbv-timeline');
const emptyMsg = document.getElementById('rbv-empty');

// ---- Backoff configuration ----
// Each failed attempt roughly doubles the wait, capped at MAX_DELAY, with a
// random jitter component added on top so simultaneous clients never retry
// in perfect lockstep with each other.
const BASE_DELAY = 1000;   // 1s
const MAX_DELAY = 16000;   // cap growth at 16s
const MULTIPLIER = 2;
const JITTER_MAX = 300;    // ms of random jitter added to every wait

let running = false;
let rafId = null;

function computeDelay(attemptIndex) {
  const raw = BASE_DELAY * Math.pow(MULTIPLIER, attemptIndex);
  const capped = Math.min(raw, MAX_DELAY);
  const jitter = Math.random() * JITTER_MAX;
  return { total: capped + jitter, capped, jitter };
}

function setStatus(mode) {
  dot.className = 'rbv-dot' + (mode === 'disconnected' ? ' disconnected' : mode === 'reconnecting' ? ' reconnecting' : '');
  statusText.textContent = mode === 'connected' ? 'Connected' : mode === 'disconnected' ? 'Disconnected' : 'Reconnecting…';
}

function addEntry(attemptIndex, delayInfo, outcome) {
  emptyMsg.style.display = 'none';
  const row = document.createElement('div');
  row.className = 'rbv-entry';
  const badge = document.createElement('div');
  badge.className = 'rbv-entry-badge ' + (outcome === 'ok' ? 'ok' : 'fail');
  badge.textContent = outcome === 'ok' ? '✓' : '✕';
  const text = document.createElement('div');
  text.className = 'rbv-entry-text';
  text.innerHTML = '<b>Attempt ' + (attemptIndex + 1) + '</b> waited ' + (delayInfo.total / 1000).toFixed(2) + 's (base ' + (delayInfo.capped / 1000).toFixed(2) + 's + jitter ' + Math.round(delayInfo.jitter) + 'ms) → ' + (outcome === 'ok' ? 'connected' : 'failed');
  const time = document.createElement('div');
  time.className = 'rbv-entry-time';
  const now = new Date();
  time.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
  row.appendChild(badge);
  row.appendChild(text);
  row.appendChild(time);
  timeline.insertBefore(row, timeline.firstChild);
}

function animateWait(durationMs) {
  return new Promise(resolve => {
    const start = performance.now();
    function frame(now) {
      const elapsed = now - start;
      const pct = Math.min(1, elapsed / durationMs);
      progressFill.style.width = (pct * 100) + '%';
      const remaining = Math.max(0, durationMs - elapsed);
      delayLabel.textContent = 'waiting ' + (remaining / 1000).toFixed(2) + 's';
      if (pct < 1 && running) {
        rafId = requestAnimationFrame(frame);
      } else {
        resolve();
      }
    }
    rafId = requestAnimationFrame(frame);
  });
}

function decideOutcome(attemptIndex) {
  const target = parseInt(succeedSelect.value, 10);
  if (target > 0) {
    return (attemptIndex + 1) >= target ? 'ok' : 'fail';
  }
  // Random mode: chance of success grows with each attempt, simulating a
  // server that is gradually recovering.
  const chance = Math.min(0.15 + attemptIndex * 0.18, 0.9);
  return Math.random() < chance ? 'ok' : 'fail';
}

async function runBackoffSequence() {
  running = true;
  let attempt = 0;
  currentPanel.hidden = false;

  while (running) {
    const delayInfo = computeDelay(attempt);
    attemptNumEl.textContent = String(attempt + 1);
    progressFill.style.width = '0%';
    formulaEl.textContent = 'base ' + BASE_DELAY + 'ms × ' + MULTIPLIER + '^' + attempt + ' (capped ' + MAX_DELAY + 'ms) + jitter 0-' + JITTER_MAX + 'ms = ' + Math.round(delayInfo.total) + 'ms';
    setStatus('reconnecting');

    await animateWait(delayInfo.total);
    if (!running) break;

    delayLabel.textContent = 'attempting…';
    await new Promise(r => setTimeout(r, 350)); // brief "connection attempt pulse"
    if (!running) break;

    const outcome = decideOutcome(attempt);
    addEntry(attempt, delayInfo, outcome);

    if (outcome === 'ok') {
      running = false;
      currentPanel.hidden = true;
      setStatus('connected');
      disconnectBtn.disabled = false;
      return;
    }

    attempt++;
  }
}

function simulateDisconnect() {
  if (running) return;
  disconnectBtn.disabled = true;
  setStatus('disconnected');
  timeline.innerHTML = '';
  timeline.appendChild(emptyMsg);
  emptyMsg.style.display = '';
  setTimeout(() => {
    if (dot.classList.contains('disconnected')) runBackoffSequence();
  }, 500);
}

disconnectBtn.addEventListener('click', simulateDisconnect);

setStatus('connected');`,
  seo: {
    title: 'Reconnect Backoff Visualizer — Free JS Snippet',
    description: 'Animated exponential backoff with jitter for reconnect logic, showing doubling wait times and randomized jitter per attempt. Exports to React & Vue.',
    about: {
      title: 'Reconnect Backoff Visualizer — Exponential Backoff With Jitter for WebSocket and API Reconnection, Animated',
      description: `When a WebSocket drops or an API call fails, the obvious naive fix is to retry every second on a fixed timer. That works fine for one client. It falls apart the moment a server goes down and every one of its thousands of connected clients starts hammering it at the exact same fixed interval the instant it comes back up, often taking it straight back down again — a pattern with a real name, the "thundering herd" problem. This snippet visualizes the standard production fix: exponential backoff with jitter, the same strategy used by AWS SDKs, gRPC clients, and every serious WebSocket reconnection library. A status indicator, a "Simulate Disconnect" trigger, and an animated per-attempt timeline make the otherwise-invisible retry math visible in real time.

**Why fixed-interval retry is actively harmful**

A server that is struggling — overloaded, restarting, or behind a saturated network link — needs load to *decrease* while it recovers, not to receive a constant, unrelenting stream of retry requests from every disconnected client at once. Fixed-interval retrying does the opposite: it applies steady, undiminished pressure exactly while the system is least able to absorb it. Worse, if many clients disconnected at roughly the same moment (a deploy, a network blip, a load balancer restart), fixed intervals mean they will all retry in near-perfect sync forever, since nothing in the algorithm ever spreads them apart.

**The exponential part: computeDelay()**

\`computeDelay(attemptIndex)\` computes \`BASE_DELAY * MULTIPLIER ** attemptIndex\`, clamped to \`MAX_DELAY\` with \`Math.min\`. With \`BASE_DELAY = 1000\` and \`MULTIPLIER = 2\`, the capped wait sequence is 1s, 2s, 4s, 8s, 16s, 16s, 16s… — each failure roughly doubles how long the client waits before trying again, so a genuinely down server sees retry pressure fall off rapidly instead of staying constant. The \`MAX_DELAY\` cap exists so the wait does not grow unbounded forever; without it, a client that has been retrying for an hour would end up waiting increasingly absurd amounts of time between attempts, which is just as unhelpful as retrying too often.

**The jitter part: why 0-300ms of randomness matters more than the doubling**

On top of the exponential base, \`computeDelay()\` adds \`Math.random() * JITTER_MAX\` milliseconds. This is the detail that actually solves the thundering herd problem — exponential backoff alone does not. If ten thousand clients disconnect from the same outage at the same second, pure exponential backoff (no jitter) means all ten thousand retry at exactly 1s, then all retry again at exactly 3s, then all at exactly 7s, forever perfectly synchronized. Adding a random jitter component spreads each client's retry moment across a window instead of a single instant, so the server sees a smoothed trickle of reconnection attempts rather than repeated synchronized spikes. The visualizer's log deliberately prints the jitter contribution on every line (e.g. "jitter 47ms") so this normally-invisible randomness is visibly proven, not just claimed — running the simulation twice never produces identical wait times.

**Animating the wait without blocking the UI**

Each attempt's countdown is driven by \`animateWait()\`, an \`async\` function wrapping a \`requestAnimationFrame\` loop that computes elapsed time against \`performance.now()\` and resolves its promise once the duration has passed. The main sequence function, \`runBackoffSequence()\`, is itself \`async\` and simply \`await\`s each wait, then a short simulated "connection attempt pulse" delay, then decides the outcome — reading as a clean, linear sequence of steps despite being entirely non-blocking and interruptible at any point via the \`running\` flag.

**Deciding success: random chance vs. a deterministic test control**

\`decideOutcome()\` supports two modes tied to the "Succeed on attempt" dropdown. In deterministic mode, a specific attempt number is chosen up front and the sequence succeeds exactly on or after that attempt — essential for demos, screenshots, and tests where a random outcome would be unreproducible. In random mode, the success chance is deliberately *not* fixed: it grows with each attempt (\`0.15 + attemptIndex * 0.18\`, capped at 90%), simulating a server that is gradually recovering rather than one that is either permanently broken or fixed on a coin flip — a small touch that makes the random mode feel like a real outage curve rather than arbitrary noise.

**Why the status dot has three states, not two**

The connection indicator cycles through three distinct visual states rather than a simple connected/disconnected toggle: solid green (connected), solid red (disconnected, no attempt in flight), and pulsing amber (reconnecting, actively counting down or attempting). That middle "reconnecting" state matters because a user watching a real app benefits from knowing a retry is actively in progress versus the app having simply given up — the pulsing amber animation (a CSS \`opacity\` keyframe) is the one piece of motion that runs continuously for the whole backoff sequence, independent of the per-attempt progress bar underneath it.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch the status indicator start green ("Connected")', text: 'The dot is solid green with a soft glow, matching a healthy, idle connection state.' },
      { title: 'Click "Simulate Disconnect"', text: 'The dot turns solid red, the status flips to "Disconnected", and after a brief pause the first reconnection attempt begins automatically.' },
      { title: 'Watch attempt 1 count down', text: 'The dot pulses amber ("Reconnecting"), a progress bar fills over roughly 1 second plus a small random jitter, and the formula line beneath it shows the exact base delay, multiplier, and jitter contribution being used.' },
      { title: 'Watch each subsequent attempt roughly double its wait', text: 'Attempt 2 waits close to 2 seconds, attempt 3 close to 4, and so on up to the 16-second cap — each with a different random jitter amount, so no two attempts wait an identical number of milliseconds even at the same exponential step.' },
      { title: 'See each attempt logged with its exact wait time', text: 'Every attempt appends a row to the log below showing a red cross for failure or green check for success, the precise wait duration, and the jitter contribution in milliseconds.' },
      { title: 'Set "Succeed on attempt" to force a deterministic outcome', text: 'Choose a specific attempt number from the dropdown to make the sequence always succeed on that attempt, or leave it on "Random chance" to see a probability that grows with each retry, simulating a gradually recovering server.' },
    ]},
    features: [
      'Real exponential backoff formula: base delay x multiplier^attempt, clamped to a maximum with Math.min',
      'Visible random jitter (0-300ms) added to every wait, logged per attempt so runs are never identical',
      'Three-state status indicator: solid green connected, solid red disconnected, pulsing amber reconnecting',
      'Non-blocking async/await sequence built on a requestAnimationFrame-driven countdown, not setTimeout chains',
      'Deterministic "succeed on attempt N" test control alongside a probability-growing random failure mode',
      'Per-attempt animated progress bar with a live formula readout showing the exact numbers used',
      'Scrollable attempt log with pass/fail badges, computed wait time, and jitter contribution per row',
      'Interruptible sequence driven by a single running flag, cleanly stopping the animation loop on success',
    ],
    useCases: [
      { icon: 'APP', title: 'WebSocket and real-time app reconnection logic', desc: 'The primary use case: visualize and tune the exact reconnect strategy behind chat apps, live dashboards, and collaborative tools before shipping it, pairing naturally with a [status pill](/ui-snippets/status-pill) or [uptime status page](/ui-snippets/uptime-status-page) showing the resulting connection health.' },
      { icon: 'CODE', title: 'API client retry logic for flaky network requests', desc: 'Demonstrates the same backoff math used inside HTTP client retry wrappers and SDKs — useful as a reference before implementing retry logic in a fetch wrapper, GraphQL client, or background sync worker.' },
      { icon: 'LEARN', title: 'Teaching exponential backoff and the thundering herd problem', desc: 'A concrete, animated way to explain why naive fixed-interval retrying overloads a recovering server and why jitter specifically (not just exponential growth alone) prevents synchronized retry spikes across many clients.' },
      { icon: 'DASH', title: 'Ops and reliability dashboards', desc: 'Embed as a live diagnostic panel showing a service\'s actual reconnect behavior during an incident, alongside other [dashboard](/ui-snippets) widgets tracking uptime and latency.' },
      { icon: 'DESIGN', title: 'Onboarding and system-status UI patterns', desc: 'Shows a clear, honest pattern for communicating "we are trying to reconnect" to end users instead of a silent spinner or a scary permanent error state.' },
      { icon: 'GAME', title: 'Multiplayer game and voice-chat reconnect UX', desc: 'The same backoff-with-jitter approach applies directly to reconnecting a dropped multiplayer session or voice channel without flooding matchmaking or signaling servers.' },
    ],
    faqs: [
      { q: 'Why is jitter necessary if exponential backoff already spreads out retries over time?', a: 'Exponential backoff alone spreads out how long a single client waits, but it does nothing to desynchronize many clients that disconnected at the same moment — without jitter, every client retries at exactly the same doubled intervals in perfect lockstep, recreating synchronized load spikes at 1s, 2s, 4s, 8s after the outage for the entire fleet simultaneously. Adding a randomized jitter component to each wait spreads those retries across a window instead of a single instant, which is what actually prevents the thundering herd, not the exponential growth by itself.' },
      { q: 'Why cap the delay at MAX_DELAY instead of letting it keep doubling forever?', a: 'Uncapped exponential growth means a client that has been failing for a while ends up waiting minutes or hours between attempts, which is just as bad as retrying too aggressively — the user experience becomes "it will reconnect eventually, maybe," with no predictable upper bound. Capping at a reasonable ceiling like 16 or 30 seconds keeps the maximum wait bounded and predictable while still getting the benefit of rapidly decreasing retry pressure during the first several attempts.' },
      { q: 'How do I connect this visualization to a real WebSocket or fetch retry loop?', a: 'Replace the simulated 350ms "connection attempt pulse" and the decideOutcome() function with an actual new WebSocket(url) call (or fetch()), listening for its open/error events instead of rolling dice. On error, call computeDelay(attempt), await a real setTimeout for that duration, increment attempt, and retry; on open, reset attempt to 0 and stop the loop. The animateWait() countdown and the timeline logging can stay exactly as they are, since they only visualize the delay, not the network call itself.' },
      { q: 'Can I use this reconnect visualizer in React, Vue, or Angular?', a: 'Yes. Move attempt, running, and the delay numbers into component state (React useState, Vue ref, or an Angular signal), and start the async runBackoffSequence() loop from a useEffect/onMounted/ngAfterViewInit triggered by the disconnect action. Because the sequence uses requestAnimationFrame and setTimeout internally, make sure the running flag is flipped to false in the component\'s cleanup/unmount function so a lingering countdown does not keep calling setState (or writing to a ref) after the component has already unmounted.' },
      { q: 'Why does the random-mode success chance increase with each attempt instead of staying fixed?', a: 'A fixed success probability per attempt would make the simulation feel like arbitrary noise rather than a real outage. Real recovering services tend to come back gradually as load balancers reroute traffic and instances restart, so modeling the success chance as growing with each attempt (0.15 plus 0.18 per attempt, capped at 90%) produces a more realistic-feeling curve where early attempts are likely to fail and later attempts are increasingly likely to succeed, without ever guaranteeing an exact outcome the way the deterministic dropdown does.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JS into an AI assistant like Claude and ask it to walk through exactly how computeDelay() combines the exponential term with the jitter term, and why the async/await structure in runBackoffSequence() is preferable to a chain of nested setTimeout callbacks for this kind of sequential animation. It's also worth asking whether the growing random-mode success curve models a realistic recovering server or whether a different distribution (like a fixed probability per attempt) would be more honest. Good extensions to request: a "decorrelated jitter" variant (the AWS-recommended formula that uses the previous delay as an input, not just the attempt count), a live chart plotting wait time against attempt number across a run, or wiring the sequence to a real WebSocket connection instead of a simulated outcome.`,
      prompt: `Build an animated exponential-backoff-with-jitter reconnection visualizer in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A connection status indicator with three distinct visual states (connected, disconnected, reconnecting) and a "Simulate Disconnect" button that starts a reconnection sequence.
- Implement a real computeDelay(attemptIndex) function: base delay multiplied by a fixed multiplier raised to the attempt index, clamped to a maximum delay with Math.min, plus a separate random jitter component (e.g. Math.random() times a jitter cap) added on top — the jitter amount must visibly differ between runs and be displayed to the user, not just applied silently.
- Animate each attempt's wait period with a progress bar driven by requestAnimationFrame and performance.now(), not a plain CSS transition, and show a live countdown of remaining time.
- After each wait, show a brief "attempting connection" pulse, then resolve the attempt as either a failure (red, continue the backoff sequence to the next attempt) or a success (green, flip status to Connected, stop the sequence).
- Support two outcome modes: a deterministic "succeed on attempt N" test control for reproducible demos, and a random mode where success probability grows with each attempt to simulate a gradually recovering server.
- Log every attempt to a visible timeline showing the attempt number, the exact computed wait time, the jitter contribution in milliseconds, and whether it failed or succeeded.
- Structure the sequence using async/await around the animation and timeout logic rather than nested setTimeout callbacks, with a single boolean flag that can interrupt the loop cleanly on success.`,
    },
  },
};

export default reconnectBackoffVisualizer;
