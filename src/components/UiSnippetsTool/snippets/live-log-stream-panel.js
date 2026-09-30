const liveLogStreamPanel = {
  id: 'live-log-stream-panel',
  title: 'Live Log Stream Panel',
  lastmod: '2026-08-08',
  category: 'dashboards',
  html: `<div class="wrap">
  <div class="log-panel">
    <div class="log-header">
      <div class="log-header-left">
        <span class="live-dot"></span>
        <span class="log-title">app-server-01</span>
      </div>
      <div class="filter-chips">
        <button class="chip chip-info active" data-level="info">INFO</button>
        <button class="chip chip-warn active" data-level="warn">WARN</button>
        <button class="chip chip-error active" data-level="error">ERROR</button>
      </div>
    </div>
    <div class="log-body" id="log-body">
      <div class="log-end-cursor" id="log-cursor"><span class="cursor-block"></span></div>
    </div>
    <button class="jump-btn" id="jump-btn">Jump to latest ↓</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #eef1f6; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 620px; }
.log-panel { background: #0d1117; border-radius: 14px; overflow: hidden; box-shadow: 0 20px 55px rgba(15,23,42,0.28); border: 1px solid rgba(255,255,255,0.06); position: relative; }

.log-header { display: flex; align-items: center; justify-content: space-between; padding: 11px 14px; background: #161b22; border-bottom: 1px solid rgba(255,255,255,0.06); }
.log-header-left { display: flex; align-items: center; gap: 8px; }
.live-dot { width: 8px; height: 8px; border-radius: 50%; background: #3fb950; box-shadow: 0 0 0 0 rgba(63,185,80,0.6); animation: livePulse 1.8s infinite; }
@keyframes livePulse { 0% { box-shadow: 0 0 0 0 rgba(63,185,80,0.55); } 70% { box-shadow: 0 0 0 6px rgba(63,185,80,0); } 100% { box-shadow: 0 0 0 0 rgba(63,185,80,0); } }
.log-title { font-family: ui-monospace, 'SF Mono', monospace; font-size: 12px; color: #8b949e; }

.filter-chips { display: flex; gap: 6px; }
.chip { font-family: ui-monospace, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.04em; padding: 4px 9px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.12); background: transparent; color: #6e7681; cursor: pointer; transition: background 0.15s, color 0.15s, opacity 0.15s; opacity: 0.55; }
.chip.active { opacity: 1; }
.chip-info.active { color: #58a6ff; border-color: rgba(88,166,255,0.4); background: rgba(88,166,255,0.08); }
.chip-warn.active { color: #d29922; border-color: rgba(210,153,34,0.4); background: rgba(210,153,34,0.08); }
.chip-error.active { color: #f85149; border-color: rgba(248,81,73,0.4); background: rgba(248,81,73,0.08); }

.log-body { height: 300px; overflow-y: auto; padding: 12px 14px; font-family: ui-monospace, 'SF Mono', monospace; font-size: 12.5px; line-height: 1.75; scroll-behavior: auto; }
.log-body::-webkit-scrollbar { width: 8px; }
.log-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 8px; }

.log-line { display: flex; gap: 8px; white-space: pre-wrap; word-break: break-word; opacity: 0; animation: lineIn 0.25s ease forwards; }
@keyframes lineIn { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }
.log-line.hidden-level { display: none; }
.log-time { color: #4b5563; flex-shrink: 0; }
.log-level { flex-shrink: 0; font-weight: 700; width: 44px; }
.log-line.info .log-level { color: #58a6ff; }
.log-line.warn .log-level { color: #d29922; }
.log-line.error .log-level { color: #f85149; }
.log-msg { color: #c9d1d9; }
.log-line.error .log-msg { color: #ffb4ae; }

.log-line.error.flash { animation: lineIn 0.25s ease forwards, errFlash 0.9s ease; }
@keyframes errFlash { 0% { background-color: rgba(248,81,73,0.28); } 100% { background-color: transparent; } }

.log-end-cursor { display: flex; align-items: center; height: 18px; margin-top: 2px; }
.cursor-block { width: 7px; height: 14px; background: #3fb950; animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }

.jump-btn { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%) translateY(8px); font-size: 11.5px; font-weight: 700; font-family: system-ui, sans-serif; padding: 7px 14px; border-radius: 999px; border: none; background: #238636; color: #fff; cursor: pointer; opacity: 0; pointer-events: none; transition: opacity 0.2s, transform 0.2s; box-shadow: 0 6px 18px rgba(35,134,54,0.4); }
.jump-btn.visible { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: all; }`,
  js: `var LOG_SCRIPT = [
  { level: 'info', msg: 'Server listening on port 4000' },
  { level: 'info', msg: 'Connected to database pool (12 clients)' },
  { level: 'info', msg: 'GET /api/health 200 3ms' },
  { level: 'info', msg: 'GET /api/users 200 41ms' },
  { level: 'warn', msg: 'Slow query detected: SELECT * FROM orders (612ms)' },
  { level: 'info', msg: 'POST /api/orders 201 88ms' },
  { level: 'warn', msg: 'Memory usage at 78% of allocated heap' },
  { level: 'error', msg: 'Unhandled rejection: connect ETIMEDOUT 10.0.4.2:5432' },
  { level: 'info', msg: 'Reconnected to database after 2 retries' },
  { level: 'info', msg: 'GET /api/products 200 19ms' },
  { level: 'warn', msg: 'Rate limit approaching for client 84.19.22.101' },
  { level: 'error', msg: 'Failed to send webhook: 502 Bad Gateway (attempt 1/3)' },
  { level: 'info', msg: 'Webhook retry succeeded on attempt 2' },
  { level: 'info', msg: 'Cache invalidated for key products:featured' },
  { level: 'error', msg: 'Uncaught TypeError: Cannot read properties of undefined' },
  { level: 'info', msg: 'GET /api/orders/8842 200 12ms' },
  { level: 'warn', msg: 'Deprecated endpoint /v1/legacy called by client v2.3.0' },
  { level: 'info', msg: 'Scheduled job "cleanup-sessions" completed in 340ms' },
  { level: 'info', msg: 'GET /api/health 200 2ms' },
  { level: 'warn', msg: 'Disk usage at 81% on volume /data' }
];

var logBody = document.getElementById('log-body');
var logCursor = document.getElementById('log-cursor');
var jumpBtn = document.getElementById('jump-btn');
var chips = document.querySelectorAll('.chip');

var activeLevels = { info: true, warn: true, error: true };
var scriptIndex = 0;
var userScrolledUp = false;
var SCROLL_THRESHOLD = 24;

function isAtBottom() {
  return logBody.scrollTop + logBody.clientHeight >= logBody.scrollHeight - SCROLL_THRESHOLD;
}

logBody.addEventListener('scroll', function () {
  if (isAtBottom()) {
    userScrolledUp = false;
    jumpBtn.classList.remove('visible');
  } else {
    userScrolledUp = true;
    jumpBtn.classList.add('visible');
  }
});

jumpBtn.addEventListener('click', function () {
  logBody.scrollTop = logBody.scrollHeight;
  userScrolledUp = false;
  jumpBtn.classList.remove('visible');
});

function formatClock(d) {
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + ':' + String(d.getSeconds()).padStart(2, '0');
}

function appendLine(entry) {
  var wasAtBottom = isAtBottom();

  var line = document.createElement('div');
  line.className = 'log-line ' + entry.level;
  if (!activeLevels[entry.level]) line.classList.add('hidden-level');
  if (entry.level === 'error') line.classList.add('flash');

  var time = document.createElement('span');
  time.className = 'log-time';
  time.textContent = formatClock(new Date());

  var levelTag = document.createElement('span');
  levelTag.className = 'log-level';
  levelTag.textContent = entry.level.toUpperCase();

  var msg = document.createElement('span');
  msg.className = 'log-msg';
  msg.textContent = entry.msg;

  line.appendChild(time);
  line.appendChild(levelTag);
  line.appendChild(msg);

  logBody.insertBefore(line, logCursor);

  if (wasAtBottom && !userScrolledUp) {
    logBody.scrollTop = logBody.scrollHeight;
  } else {
    jumpBtn.classList.add('visible');
  }
}

function streamNext() {
  var entry = LOG_SCRIPT[scriptIndex % LOG_SCRIPT.length];
  appendLine(entry);
  scriptIndex++;
  var delay = 500 + Math.random() * 1100;
  setTimeout(streamNext, delay);
}

chips.forEach(function (chip) {
  chip.addEventListener('click', function () {
    var level = chip.getAttribute('data-level');
    activeLevels[level] = !activeLevels[level];
    chip.classList.toggle('active', activeLevels[level]);
    document.querySelectorAll('.log-line.' + level).forEach(function (line) {
      line.classList.toggle('hidden-level', !activeLevels[level]);
    });
  });
});

for (var i = 0; i < 4; i++) {
  appendLine(LOG_SCRIPT[i]);
  scriptIndex++;
}
setTimeout(streamNext, 900);`,
  seo: {
    title: 'Live Log Stream Panel — Free HTML CSS JS Snippet',
    description: 'Console log feed with severity color-coding, pause-on-scroll auto-scroll and filter chips, built around scrollTop bottom detection. Exports to React & Vue.',
    about: {
      title: 'Live Log Stream Panel — Auto-Scrolling Terminal Log Feed with Severity Filters in Vanilla JS',
      description: `Any tool that streams data in real time — a server log viewer, a CI build console, a chat feed, a live sports ticker — runs into the exact same UX problem: should the view auto-scroll to show new content, or respect that the user has deliberately scrolled up to read something older? Auto-scrolling unconditionally is hostile, because it yanks the view away from whatever the user was reading the instant a new line arrives. Never auto-scrolling is equally bad, because the user has to manually scroll down constantly just to keep up. This snippet implements the standard, correct solution — pause auto-scroll the moment the user scrolls away from the bottom, and resume it only when they explicitly ask to — on top of a simulated log feed with severity color-coding and live filter toggles.

**Detecting "at the bottom" with scrollTop math**

The entire auto-scroll-pause mechanism rests on one function, \`isAtBottom()\`, which checks whether \`logBody.scrollTop + logBody.clientHeight >= logBody.scrollHeight - SCROLL_THRESHOLD\`. \`scrollTop\` is how far the content has been scrolled down from the top, \`clientHeight\` is the visible height of the scrollable box, and \`scrollHeight\` is the total height of all the content including what is currently off-screen. Adding \`scrollTop\` and \`clientHeight\` together gives the pixel position of the bottom edge of the visible viewport within the full content; if that position is close enough to \`scrollHeight\` (the very end of the content), the user is effectively at the bottom. The \`SCROLL_THRESHOLD\` constant (24px) exists because exact pixel equality is unreliable — sub-pixel rendering and rounding in different browsers means \`scrollTop + clientHeight\` almost never equals \`scrollHeight\` exactly even when the user is visibly at the bottom, so a small tolerance window is required.

**Checking bottom state before appending, not after**

Every time a new log line is about to be added, \`appendLine()\` calls \`isAtBottom()\` and stores the result in \`wasAtBottom\` before inserting the new DOM node. This ordering matters: checking after insertion would always report "not at bottom" for a viewer who was at the bottom a moment ago, because the newly taller \`scrollHeight\` has already pushed the current \`scrollTop\` away from the new true bottom. Capturing the scroll state immediately before the DOM mutation is what correctly answers "was the user watching the live edge right before this line arrived" — the only question that determines whether to auto-scroll.

**The manual-scroll flag and the Jump to Latest button**

A separate \`scroll\` event listener on the log container continuously re-evaluates \`isAtBottom()\` independent of new lines arriving, and sets a \`userScrolledUp\` boolean flag accordingly. That flag is the tie-breaker \`appendLine()\` checks alongside \`wasAtBottom\`: even if the container happens to measure as "at bottom" for a stray render, an explicit history-reading gesture from the user takes priority. Whenever the container is not at the bottom, a floating "Jump to latest" pill fades into view; clicking it sets \`logBody.scrollTop = logBody.scrollHeight\`, clears \`userScrolledUp\`, and hides the button again — a single, obvious way back to live-tailing after reading backlog.

**Filtering without breaking the stream**

The INFO/WARN/ERROR chips do not remove log lines from the DOM or stop new ones from arriving — they toggle a \`.hidden-level\` class via CSS \`display: none\` on matching \`.log-line\` elements. This is deliberate: the streaming \`setTimeout\` loop in \`streamNext()\` keeps running and keeps appending every scripted line regardless of filter state, so toggling a filter mid-stream never causes lines to be lost or the timer to desync — it only changes what is currently rendered. Newly arriving lines respect the current filter state immediately because \`appendLine()\` checks \`activeLevels[entry.level]\` and applies \`.hidden-level\` at creation time, so a filtered-out severity never even flashes into view before disappearing.

**Severity styling and the ERROR flash**

Each line's level string doubles as both a CSS class (\`.log-line.info\`, \`.warn\`, \`.error\`) driving its text color, and a lookup key into the \`activeLevels\` filter object — one string, two responsibilities, no duplicated mapping tables. ERROR lines additionally receive a \`.flash\` class that layers a second \`@keyframes\` animation fading a red background tint out over 900ms, purely to draw the eye to the highest-severity events the instant they appear, the same way real observability tools like Datadog or Sentry pulse-highlight new critical alerts.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch new log lines stream in automatically', text: 'Lines arrive every half-second to just over a second, each fading and sliding in slightly, color-coded blue for INFO, amber for WARN, and red for ERROR.' },
      { title: 'Notice ERROR lines flash red when they land', text: 'A brief red background pulse fades out over about a second on any new ERROR line, drawing your eye to it immediately without needing to read the text first.' },
      { title: 'Scroll up to read earlier log history', text: 'As soon as you scroll away from the bottom, incoming lines stop yanking your view back down — they keep arriving silently at the bottom while you read undisturbed further up.' },
      { title: 'Watch the "Jump to latest" button appear', text: 'A green pill fades in at the bottom of the panel the moment you are not viewing the newest line, giving you an obvious way back to the live edge.' },
      { title: 'Click "Jump to latest" to resume auto-scroll', text: 'The panel snaps to the bottom, the button disappears, and auto-scroll resumes immediately for every subsequent incoming line.' },
      { title: 'Toggle the INFO, WARN, or ERROR filter chips', text: 'Click a chip to hide or show that severity — matching lines already in the panel disappear or reappear instantly, and the log keeps streaming new lines in the background the whole time.' },
    ]},
    features: [
      'Bottom-detection via scrollTop + clientHeight >= scrollHeight - threshold, the standard live-feed auto-scroll pattern',
      'Bottom state captured immediately before each DOM insertion so auto-scroll decisions are never one line stale',
      'Independent scroll listener maintains a userScrolledUp flag so a manual scroll always overrides auto-scroll',
      '"Jump to latest" button appears only when needed and resets both scroll position and the manual-scroll flag',
      'Severity filter chips hide/show existing lines via a CSS class, without pausing or desyncing the incoming stream',
      'ERROR lines get a one-time red flash animation layered on top of the normal line-entrance animation',
      'Blinking block cursor at the stream tail mimics a live terminal prompt, styled with a step-end CSS animation',
      'Scripted log array with randomized inter-line delay simulates a realistic, non-uniform live feed cadence',
    ],
    useCases: [
      { icon: 'APP', title: 'Server, application, or CI/CD build log viewers', desc: 'Wire appendLine() to a real WebSocket or Server-Sent Events connection from your backend log shipper or CI runner, keeping the exact same auto-scroll-pause and filter-chip behavior for a production-grade streaming console.' },
      { icon: 'APP', title: 'Live monitoring and observability dashboards', desc: 'Pair with [status-dashboard](/ui-snippets/status-dashboard) or [dashboard-widget-grid](/ui-snippets/dashboard-widget-grid) as the incident-feed panel of an internal ops dashboard, where engineers need to read older errors without losing the live tail.' },
      { icon: 'LEARN', title: 'Teaching the scrollTop/clientHeight/scrollHeight relationship', desc: 'A focused, real-world example of the three scroll-geometry properties every infinite-scroll, chat feed, or live-updating list needs to reason about correctly — a foundational browser API pattern worth understanding deeply.' },
      { icon: 'APP', title: 'Support chat, activity feed, or notification center streams', desc: 'The same pause-on-scroll-up pattern applies directly to chat message lists and activity feeds; adapt the severity color-coding into read/unread or message-type styling instead.' },
      { icon: 'CODE', title: 'Reference implementation distinct from static terminal chrome', desc: 'Where [terminal-window](/ui-snippets/terminal-window) demonstrates a scripted command replay inside styled terminal chrome, this panel focuses purely on the live-feed mechanics — auto-scroll, filtering, and severity handling — for anyone building an actual streaming console rather than a static terminal mockup.' },
      { icon: 'CODE', title: 'Related: Page Visibility API Indicator', desc: 'See the [Page Visibility API Indicator](/ui-snippets/page-visibility-indicator/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to a real backend log stream instead of the scripted array?', a: 'Replace the streamNext() setTimeout loop with a WebSocket onmessage handler (or an EventSource onmessage for Server-Sent Events) that calls appendLine({ level, msg }) for each incoming real log entry, using the level your backend reports (info/warn/error). Everything else — the bottom-detection, the Jump to Latest button, and the filter chips — works identically because they operate purely on the DOM and scroll state, with no dependency on where the log entry originated.' },
      { q: 'Why is there a SCROLL_THRESHOLD instead of checking for an exact scroll position match?', a: 'Browsers do not guarantee that scrollTop + clientHeight equals scrollHeight exactly even when a user is visually at the very bottom of a scrollable element, due to sub-pixel layout rounding that varies by browser and zoom level. A small tolerance (24px here) treats "close enough to the bottom" as "at the bottom," which matches what a real user perceives and avoids auto-scroll flickering on/off near the boundary.' },
      { q: 'Does toggling a filter chip stop or lose any incoming log lines?', a: 'No. Filter chips only add or remove a hidden-level CSS class (display: none) on matching lines already in the DOM — the underlying streamNext() timer and LOG_SCRIPT index keep advancing regardless of filter state, so no lines are ever skipped or dropped, they are just visually hidden until you toggle the filter back on.' },
      { q: 'Can I use this live log panel in React, Vue, or Angular?', a: 'Yes. Keep the log entries themselves in component state (an array you append to) so the framework handles rendering, but keep userScrolledUp and the scroll-position bookkeeping in a ref (React useRef, Vue ref outside reactivity, or a plain Angular class field) since they are imperative scroll-tracking values, not render data. Attach the scroll listener and start the streaming timer inside useEffect / onMounted / ngAfterViewInit, and make sure to remove the scroll listener and clear the pending setTimeout in the cleanup function (React effect cleanup, onUnmounted, or ngOnDestroy) so the simulated stream does not keep running after the component unmounts.' },
      { q: 'How is this different from the terminal-window snippet already in this library?', a: 'terminal-window renders static, pre-scripted terminal chrome (the traffic-light dots, title bar, and a fixed command-and-output replay) with no scrolling behavior to manage. This panel is purpose-built around the mechanics of an actually-streaming feed: detecting whether the user is at the bottom, pausing auto-scroll on manual scroll-up, surfacing a Jump to Latest control, and letting severity filters hide or show lines without interrupting the stream — concerns terminal-window does not address at all.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to explain precisely why isAtBottom() is checked before inserting a new line rather than after — it is a one-line-timing detail that is easy to get backwards and silently break auto-scroll. From there, ask for a search box that filters lines by text content in addition to severity, a "pause stream" button that stops new lines from arriving at all (versus just not auto-scrolling to them), or a way to persist unread-while-scrolled-up line counts on the Jump to Latest button.`,
      prompt: `Build a live streaming log console panel in plain HTML, CSS, and JavaScript that simulates a real-time server log feed — no backend, no frameworks.

Requirements:
- A dark terminal-style panel with a scrollable log body that new lines are appended to over time via a scripted array and setTimeout (standing in for a real WebSocket/SSE connection), with randomized delay between lines so it doesn't feel mechanically uniform.
- Each log line must be color-coded by severity: INFO in a neutral/blue tone, WARN in amber, ERROR in red, with ERROR lines getting a brief one-time flash/pulse background animation the moment they appear.
- Implement auto-scroll-to-newest that PAUSES the instant the user manually scrolls up to read older lines, using the standard scrollTop + clientHeight >= scrollHeight - threshold check performed right before each new line is appended (not after, and not only on a scroll event).
- When auto-scroll is paused, show a "Jump to latest" button that, when clicked, scrolls to the bottom and immediately resumes auto-scrolling for all subsequent new lines.
- Add filter toggle chips for INFO, WARN, and ERROR that hide or show matching lines already in the log via a CSS class, without stopping, slowing, or desyncing the background stream of new incoming lines.
- Include a blinking block-style cursor element pinned at the very end of the log to suggest where the next line will land, animated with a CSS step-end blink.`,
    },
  },
};

export default liveLogStreamPanel;
