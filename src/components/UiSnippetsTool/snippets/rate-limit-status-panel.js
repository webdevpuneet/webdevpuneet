const rateLimitStatusPanel = {
  id: 'rate-limit-status-panel',
  title: 'Rate Limit Status Panel',
  lastmod: '2026-08-22',
  category: 'dashboards',
  html: `<div class="rlp-card">
  <div class="rlp-top">
    <div class="rlp-ring-wrap">
      <svg class="rlp-ring" viewBox="0 0 120 120">
        <circle class="rlp-ring-bg" cx="60" cy="60" r="52"/>
        <circle class="rlp-ring-fg" id="rlpRingFg" cx="60" cy="60" r="52"/>
      </svg>
      <div class="rlp-ring-label">
        <span class="rlp-ring-num" id="rlpRemaining">640</span>
        <span class="rlp-ring-sub">left</span>
      </div>
    </div>

    <div class="rlp-info">
      <h3>API rate limit</h3>
      <p><span id="rlpUsed">360</span> / <span id="rlpTotal">1,000</span> requests used</p>
      <div class="rlp-reset">Resets in <b id="rlpCountdown">14:59</b></div>
    </div>
  </div>

  <button type="button" class="rlp-simulate" id="rlpSimulate">Simulate request burst</button>

  <div class="rlp-recent">
    <div class="rlp-recent-head">Recent requests</div>
    <div class="rlp-recent-list" id="rlpRecentList">
      <div class="rlp-empty" id="rlpEmpty">No requests yet.</div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d15;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.rlp-card{background:#0f1420;border:1px solid #1e2536;border-radius:16px;padding:20px;width:100%;max-width:420px;box-shadow:0 20px 50px rgba(0,0,0,.5)}

.rlp-top{display:flex;align-items:center;gap:18px;margin-bottom:16px}
.rlp-ring-wrap{position:relative;width:96px;height:96px;flex-shrink:0}
.rlp-ring{width:100%;height:100%;transform:rotate(-90deg)}
.rlp-ring-bg{fill:none;stroke:#1a2130;stroke-width:10}
.rlp-ring-fg{fill:none;stroke:#818cf8;stroke-width:10;stroke-linecap:round;stroke-dasharray:326.7;stroke-dashoffset:326.7;transition:stroke-dashoffset .5s cubic-bezier(.4,0,.2,1),stroke .3s}
.rlp-ring-fg.warn{stroke:#fbbf24}
.rlp-ring-fg.over{stroke:#f87171}
.rlp-ring-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.rlp-ring-num{font-size:22px;font-weight:800;color:#f1f5f9;font-variant-numeric:tabular-nums}
.rlp-ring-sub{font-size:10px;color:#5b6884;text-transform:uppercase;letter-spacing:.05em}

.rlp-info h3{font-size:14.5px;font-weight:800;color:#f1f5f9;margin-bottom:5px}
.rlp-info p{font-size:12.5px;color:#8a94ab;margin-bottom:7px;font-variant-numeric:tabular-nums}
.rlp-reset{font-size:11.5px;color:#6b7690}
.rlp-reset b{color:#a5b4fc;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-weight:700}

.rlp-simulate{width:100%;background:#1a2130;border:1px solid #262f45;color:#c7d2fe;border-radius:9px;padding:10px;font-size:12.5px;font-weight:700;cursor:pointer;transition:background .15s;margin-bottom:18px}
.rlp-simulate:hover{background:#212a3f}

.rlp-recent{border-top:1px solid #1a2130;padding-top:14px}
.rlp-recent-head{font-size:11px;font-weight:700;color:#8a94ab;text-transform:uppercase;letter-spacing:.04em;margin-bottom:9px}
.rlp-recent-list{display:flex;flex-direction:column;gap:6px;max-height:150px;overflow-y:auto}
.rlp-empty{font-size:12px;color:#4b5675;padding:6px 0}
.rlp-entry{display:flex;align-items:center;justify-content:space-between;gap:10px;background:#111726;border:1px solid #1a2130;border-radius:8px;padding:7px 10px;font-size:11.5px}
.rlp-entry-path{color:#cbd5e1;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rlp-entry-time{color:#5b6884;flex-shrink:0;font-variant-numeric:tabular-nums}`,

  js: `var LIMIT = 1000;
var CIRCUMFERENCE = 326.7;
var used = 360;
var resetSeconds = 899;

var els = {
  ringFg: document.getElementById('rlpRingFg'),
  remaining: document.getElementById('rlpRemaining'),
  used: document.getElementById('rlpUsed'),
  total: document.getElementById('rlpTotal'),
  countdown: document.getElementById('rlpCountdown'),
  recentList: document.getElementById('rlpRecentList'),
  empty: document.getElementById('rlpEmpty'),
};

var ENDPOINTS = ['/v1/chat/completions', '/v1/embeddings', '/v1/models', '/v1/files', '/v1/moderations'];

els.total.textContent = LIMIT.toLocaleString();

function tier(pct) {
  if (pct >= 95) return 'over';
  if (pct >= 75) return 'warn';
  return 'ok';
}

function render() {
  var remaining = Math.max(0, LIMIT - used);
  var pct = Math.min(100, (used / LIMIT) * 100);
  var t = tier(pct);

  els.remaining.textContent = remaining.toLocaleString();
  els.used.textContent = used.toLocaleString();

  var offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
  els.ringFg.style.strokeDashoffset = offset;
  els.ringFg.className = 'rlp-ring-fg' + (t === 'ok' ? '' : ' ' + t);
}

function formatCountdown(sec) {
  var m = Math.floor(sec / 60);
  var s = sec % 60;
  return m + ':' + String(s).padStart(2, '0');
}

function tickCountdown() {
  resetSeconds = resetSeconds > 0 ? resetSeconds - 1 : 900;
  if (resetSeconds === 900) { used = 0; render(); }
  els.countdown.textContent = formatCountdown(resetSeconds);
}

function timeLabel() {
  var d = new Date();
  var h = d.getHours() % 12 || 12;
  var m = String(d.getMinutes()).padStart(2, '0');
  var s = String(d.getSeconds()).padStart(2, '0');
  return h + ':' + m + ':' + s;
}

function addEntry(path) {
  if (els.empty) { els.empty.remove(); }
  var entry = document.createElement('div');
  entry.className = 'rlp-entry';
  entry.innerHTML = '<span class="rlp-entry-path">' + path + '</span><span class="rlp-entry-time">' + timeLabel() + '</span>';
  els.recentList.insertBefore(entry, els.recentList.firstChild);
  var entries = els.recentList.querySelectorAll('.rlp-entry');
  if (entries.length > 5) entries[entries.length - 1].remove();
}

document.getElementById('rlpSimulate').addEventListener('click', function () {
  var burst = 15 + Math.floor(Math.random() * 40);
  used = Math.min(LIMIT, used + burst);
  render();
  addEntry(ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)]);
});

render();
els.countdown.textContent = formatCountdown(resetSeconds);
setInterval(tickCountdown, 1000);`,

  seo: {
    title: 'Rate Limit Status Panel — Free API Quota Dashboard Snippet',
    description: `A developer dashboard panel showing API rate-limit usage as a ring, a live reset countdown, and a log of recent requests. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Rate Limit Status Panel — Usage Ring, Reset Countdown, and Recent Request Log',
      description: `Every API product needs to show developers exactly where they stand against their rate limit — not after they get a 429, but continuously, so they can pace their own requests. This snippet builds that panel in plain HTML, CSS, and vanilla JavaScript: a circular usage ring, a live countdown to the next reset, a "simulate request burst" button, and a scrolling log of recent calls.

**An SVG ring driven by stroke-dashoffset**

The ring is a single SVG circle whose \`stroke-dasharray\` is fixed to its circumference and whose \`stroke-dashoffset\` is animated to reveal a proportional arc — the standard technique for a CSS/SVG progress ring with no canvas or chart library. The ring's color shifts from indigo to amber to red at the same 75%/95% thresholds used elsewhere in this snippet, so the ring, the request count, and the "requests used" text can never visually disagree.

**A countdown that actually resets state**

The reset countdown runs on a real one-second \`setInterval\`, and when it reaches zero, it wraps back to a fresh window (900 seconds here, standing in for a 15-minute rate-limit window) *and* zeroes the used-request count, mirroring how token-bucket and fixed-window rate limiters actually behave — the panel doesn't just show a countdown for show, it demonstrates the limit genuinely resetting.

**Request burst simulation, not a slider**

Like a real API workload, usage doesn't arrive smoothly — it comes in bursts (batch jobs, retries, background sync). The "Simulate request burst" button adds a randomized cluster of requests per click rather than one at a time, which is closer to how a developer would actually watch their limit climb, and each click also logs one representative endpoint call to the recent-requests list.

**Where this fits in a developer product**

Pair it with a [webhook event tester](/ui-snippets/webhook-event-tester/) so developers can both test their integration and watch their quota simultaneously, or place it next to an [AI token usage meter](/ui-snippets/ai-token-usage-meter/) — the rate limit panel tracks request *frequency* within a short window while the token meter tracks *volume* across a billing period, two related but distinct constraints on an AI API.

**Customizing it**

Replace the simulated burst with real request counts read from your API client's response headers (most APIs return \`X-RateLimit-Remaining\` and \`X-RateLimit-Reset\`), adjust the window length and limit to match your actual API, or add a second ring for a longer-period limit alongside this short-window one.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A rate limit panel renders with a usage ring at 360/1,000 requests and a live countdown.` },
      { title: 'Watch the countdown', text: `It ticks down every second and wraps to a fresh window when it reaches zero, resetting usage.` },
      { title: 'Click Simulate request burst', text: `A randomized cluster of requests adds to the used count and the ring fills accordingly.` },
      { title: 'Watch the ring color shift', text: `Past 75% usage the ring turns amber; past 95% it turns red.` },
      { title: 'Check the recent requests log', text: `Each simulated burst logs one representative endpoint call with a timestamp.` },
      { title: 'Wire up real data', text: `Read actual rate-limit headers from your API responses to drive used and resetSeconds.` },
    ] },
    features: [
      { title: 'SVG progress ring', text: `stroke-dashoffset animates a proportional arc with no canvas or chart library.` },
      { title: 'Threshold-based ring color', text: `Indigo, amber, and red states share the same tier logic as the usage text.` },
      { title: 'Live one-second countdown', text: `A real interval ticks down to the next rate-limit window reset.` },
      { title: 'Genuine window reset', text: `Reaching zero wraps the countdown and zeroes usage, mirroring real rate limiters.` },
      { title: 'Burst-style simulation', text: `Requests arrive in randomized clusters, not one at a time, matching real workloads.` },
      { title: 'Recent request log', text: `Logs a representative endpoint call per simulated burst, most recent first.` },
      { title: 'Capped, scrollable log', text: `Older entries drop off once the log exceeds a handful of items.` },
      { title: 'No dependencies', text: `Pure HTML, CSS, and vanilla JavaScript.` },
    ],
    useCases: [
      { title: 'API developer dashboards', text: `Show quota status alongside a [webhook event tester](/ui-snippets/webhook-event-tester/).` },
      { title: 'AI API consoles', text: `Pair with an [AI token usage meter](/ui-snippets/ai-token-usage-meter/) for frequency vs. volume limits.` },
      { title: 'CLI and SDK companion dashboards', text: `Give developers visibility into throttling risk before it happens.` },
      { title: 'Multi-tenant platform admin panels', text: `Show per-customer rate limit consumption for support triage.` },
      { title: 'Integration testing tools', text: `Watch quota consumption while running test suites against a live API.` },
      { title: 'Billing and plan-tier pages', text: `Show current rate limits next to an [AI model comparison table](/ui-snippets/ai-model-comparison-table/) for upgrade context.` },
    ],
    faqs: [
      { q: 'How does the SVG ring fill proportionally without a charting library?', a: `The ring circle has a fixed stroke-dasharray equal to its own circumference, which splits its stroke into one dash covering the whole circle and one gap of zero length. Animating stroke-dashoffset shifts where that dash starts, visually revealing an arc proportional to whatever percentage you set — a well-known CSS/SVG technique that needs no dependencies.` },
      { q: 'Why does the countdown actually reset the used-request count to zero?', a: `Real API rate limiters work on fixed or rolling windows — once the window closes, your quota genuinely refills. Making the countdown wrap and zero the used count when it reaches zero demonstrates that real behavior, rather than just running a countdown for decoration disconnected from the usage ring.` },
      { q: 'Why does the demo simulate request bursts instead of one request per click?', a: `Real API usage rarely arrives one call at a time — it comes in clusters from batch jobs, retries, or background syncs. Adding a randomized cluster per click gives a more realistic sense of how quickly a rate limit can be consumed than a steady one-by-one increment would.` },
      { q: 'How do I connect this to my real API\\u2019s rate limit headers?', a: `Most REST APIs return headers like X-RateLimit-Remaining, X-RateLimit-Limit, and X-RateLimit-Reset (a Unix timestamp) with every response. Read those headers after each real request, compute used as limit minus remaining, compute resetSeconds as the reset timestamp minus the current time, and call render() to update the ring and countdown.` },
      { q: 'How do I use this rate limit panel in React, Vue, or Angular?', a: `Track used and resetSeconds as component state, derive the tier and ring offset with a computed value, and drive the countdown with a setInterval inside a mount effect (cleaned up on unmount). Update the state directly from your API client's response headers instead of the simulated burst handler.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the SVG ring math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how setting stroke-dasharray to the circle's own circumference and then animating stroke-dashoffset produces a proportional filling arc, and why the countdown timer both resets to a fresh window and zeroes the used-request count when it reaches zero rather than just looping the display. The same assistant can help optimize it — ask whether the countdown should sync against a real server-provided reset timestamp instead of a local setInterval to avoid client clock drift. It's also useful for extending the panel: ask it to add a second concentric ring for a longer-period limit, read real X-RateLimit-* response headers instead of the simulated burst, or add a warning toast when usage crosses the critical threshold. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "rate limit status panel" developer dashboard widget in plain HTML, CSS, and JavaScript with no framework, chart library, or canvas.

Requirements:
- A circular progress ring built from a single SVG circle element using the stroke-dasharray/stroke-dashoffset technique (not a chart library or canvas) to show requests-used as a percentage of a fixed limit, with the remaining request count displayed as text in the center of the ring.
- Next to the ring, show the used/total request counts as text and a live countdown timer (formatted as minutes:seconds) showing time remaining until the rate limit window resets, updating every second via a real interval.
- When the countdown reaches zero, it must wrap around to a fresh full window duration AND reset the used-request count back to zero, mirroring how real fixed-window rate limiters behave — not just loop the timer display disconnected from the usage state.
- The ring's stroke color must shift through at least three tiers (e.g. a calm accent color, amber, red) based on usage percentage, using the same threshold logic that could also color a text label, so they can never disagree.
- A "Simulate request burst" button that adds a randomized cluster of several requests at once to the used count (not one request per click, to mimic how real API traffic arrives in bursts) and logs one representative API endpoint path with a timestamp to a recent-requests list, inserting new entries at the top and capping the list to a handful of visible entries.
- Use a dark, developer-console-style theme with system-ui font for labels and monospace font for endpoint paths, timestamps, and the countdown value.`,
    },
  },
};

export default rateLimitStatusPanel;
