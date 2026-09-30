const pageVisibilityIndicator = {
  id: 'page-visibility-indicator',
  title: 'Page Visibility API Indicator',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<section class="pvi-wrap">
  <span class="pvi-tag">page visibility api · document.visibilitystate</span>
  <h1>Tab visibility</h1>
  <p>Switch to another tab, minimize the window, or come back — this reads the real <code>document.visibilityState</code>.</p>

  <div class="pvi-card">
    <div class="pvi-dot" id="pviDot"></div>
    <div>
      <div class="pvi-state" id="pviState">visible</div>
      <div class="pvi-sub" id="pviSub">This tab is currently in the foreground.</div>
    </div>
  </div>

  <div class="pvi-stats">
    <div class="pvi-stat"><span id="pviVisibleTime">0s</span><small>time visible</small></div>
    <div class="pvi-stat"><span id="pviHiddenTime">0s</span><small>time hidden</small></div>
    <div class="pvi-stat"><span id="pviSwitches">0</span><small>state changes</small></div>
  </div>

  <div class="pvi-log-head">Change log</div>
  <ul class="pvi-log" id="pviLog"></ul>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0e1c16,#050b08 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.pvi-wrap{width:100%;max-width:560px}
.pvi-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#6ee7b7;background:rgba(110,231,183,.1);border:1px solid rgba(110,231,183,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.pvi-wrap h1{font-size:clamp(26px,5.5vw,36px);font-weight:800;letter-spacing:-.03em}
.pvi-wrap>p{font-size:13.5px;color:#9cc2ab;margin-top:8px;line-height:1.6;max-width:440px}
.pvi-card{display:flex;align-items:center;gap:14px;margin:22px 0 16px;padding:18px 20px;border-radius:14px;background:#0a1610;border:1px solid rgba(110,231,183,.25)}
.pvi-dot{width:16px;height:16px;border-radius:50%;background:#34d399;box-shadow:0 0 0 6px rgba(52,211,153,.18);flex-shrink:0;transition:background .2s,box-shadow .2s}
.pvi-dot.hidden{background:#f87171;box-shadow:0 0 0 6px rgba(248,113,113,.18)}
.pvi-state{font-size:18px;font-weight:800;text-transform:capitalize}
.pvi-sub{font-size:12.5px;color:#83a893;margin-top:2px}
.pvi-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px}
.pvi-stat{background:#0a1610;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:12px 8px;text-align:center}
.pvi-stat span{display:block;font-size:17px;font-weight:800;color:#6ee7b7}
.pvi-stat small{font-size:10.5px;color:#6f8b7a;text-transform:uppercase;letter-spacing:.05em}
.pvi-log-head{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6f8b7a;margin-bottom:8px}
.pvi-log{list-style:none;max-height:180px;overflow-y:auto;border:1px solid rgba(255,255,255,.08);border-radius:10px;background:#0a1610}
.pvi-log li{padding:9px 14px;font-size:12.5px;border-bottom:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between;gap:10px;color:#cfe6da}
.pvi-log li:last-child{border-bottom:none}
.pvi-log li span{color:#5c7869;font-size:11px;flex-shrink:0}
.pvi-log:empty::after{content:'No changes logged yet.';display:block;padding:16px;font-size:12.5px;color:#5c7869;text-align:center}`,

  js: `var dot = document.getElementById('pviDot');
var stateEl = document.getElementById('pviState');
var subEl = document.getElementById('pviSub');
var visibleTimeEl = document.getElementById('pviVisibleTime');
var hiddenTimeEl = document.getElementById('pviHiddenTime');
var switchesEl = document.getElementById('pviSwitches');
var logEl = document.getElementById('pviLog');

var switches = 0;
var visibleMs = 0;
var hiddenMs = 0;
var lastChangeAt = Date.now();

function fmt(ms) {
  var s = Math.floor(ms / 1000);
  if (s < 60) return s + 's';
  var m = Math.floor(s / 60);
  return m + 'm ' + (s % 60) + 's';
}

function addLogEntry(state) {
  var li = document.createElement('li');
  var time = new Date().toLocaleTimeString();
  li.innerHTML = '<span>' + time + '</span><span>' + (state === 'visible' ? 'Became visible' : 'Became hidden') + '</span>';
  logEl.insertBefore(li, logEl.firstChild);
  while (logEl.children.length > 25) logEl.removeChild(logEl.lastChild);
}

function render() {
  var state = document.visibilityState;
  var isVisible = state === 'visible';
  dot.classList.toggle('hidden', !isVisible);
  stateEl.textContent = state;
  subEl.textContent = isVisible
    ? 'This tab is currently in the foreground.'
    : 'This tab is hidden — switched away, minimized, or covered.';
  switchesEl.textContent = String(switches);
}

function accumulate() {
  var now = Date.now();
  var delta = now - lastChangeAt;
  if (document.visibilityState === 'visible') {
    hiddenMs += delta;
  } else {
    visibleMs += delta;
  }
  lastChangeAt = now;
  visibleTimeEl.textContent = fmt(visibleMs);
  hiddenTimeEl.textContent = fmt(hiddenMs);
}

// This is the actual pattern real apps use: pause polling, video playback,
// animation loops, or analytics pings while document.visibilityState is
// 'hidden', and resume when it flips back to 'visible'. The visibilitychange
// event is the browser telling you the tab genuinely left/entered the
// foreground — far more reliable than blur/focus, which also fire for
// in-page focus changes that have nothing to do with tab visibility.
function onVisibilityChange() {
  switches += 1;
  accumulate();
  render();
  addLogEntry(document.visibilityState);
}

if (typeof document.hidden !== 'undefined') {
  document.addEventListener('visibilitychange', onVisibilityChange);
} else {
  // Extremely old browsers lack the Page Visibility API entirely. Fall back
  // to a manual "assume always visible" mode so the indicator still renders
  // something coherent rather than silently doing nothing.
  subEl.textContent = 'Page Visibility API unsupported in this browser — showing a static "always visible" fallback.';
}

// Keep the running visible-time counter ticking while on screen.
setInterval(function () {
  if (document.visibilityState === 'visible') {
    var now = Date.now();
    visibleTimeEl.textContent = fmt(visibleMs + (now - lastChangeAt));
  }
}, 1000);

render();
lastChangeAt = Date.now();`,

  seo: {
    title: 'Page Visibility API Indicator — Free visibilitychange Demo',
    description: `A live indicator using the real document.visibilityState and visibilitychange event to show whether the tab is visible or hidden, with a running change log and time-tracking. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Page Visibility API Indicator — Real Tab Visibility, Logged Live',
      description: `This snippet reads the browser's actual Page Visibility API — \`document.visibilityState\` and the \`visibilitychange\` event — to show, in real time, whether the current tab is in the foreground or has been switched away from, minimized, or covered. It's the exact mechanism behind why a video pauses when you switch tabs or a dashboard stops polling in the background.

**Why not blur/focus?**

It's tempting to reach for \`window\` \`blur\`/\`focus\` events instead, but those fire for reasons that have nothing to do with tab visibility — clicking into a browser extension popup, opening dev tools, or focus moving to another window on some platforms can all fire \`blur\` while the tab is still fully visible on screen. \`document.visibilityState\` is more precise: it reports \`'visible'\`, \`'hidden'\`, and (on some platforms) \`'prerender'\`, driven by whether the tab's content is actually being rendered to the user, and \`visibilitychange\` fires exactly when that changes — including tab switches, window minimizing, and screen locking.

**What real apps do with this**

Video players pause playback and mute audio processing when hidden; dashboards and live feeds stop polling APIs to save bandwidth and battery; games pause their update loop; analytics tools log accurate "time on page" instead of counting background time. This snippet demonstrates the pattern directly: it accumulates separate visible-time and hidden-time counters using \`Date.now()\` deltas measured between \`visibilitychange\` events, so the numbers are a real elapsed-time record, not an estimate.

**A live, capped change log**

Every transition appends a timestamped entry to a log capped at 25 rows (oldest entries are trimmed), so you can watch a session's visibility history accumulate — useful for demonstrating to teammates exactly when and how often a page loses focus during a real usage session.

**Handling unsupported browsers**

The Page Visibility API has been standard for well over a decade, so unsupported browsers are effectively nonexistent today — but the snippet still checks \`typeof document.hidden !== 'undefined'\` before wiring the listener, and falls back to a clearly labeled static "always visible" message rather than silently doing nothing if the check ever fails. Pair this with a [screen wake lock toggle](/ui-snippets/screen-wake-lock-toggle/) to build a full "pause when backgrounded" media control, or a [network information badge](/ui-snippets/network-information-badge/) for a broader environment-awareness dashboard.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The indicator renders showing "visible".` },
      { title: 'Switch to another tab', text: `The dot turns red and state flips to "hidden".` },
      { title: 'Come back', text: `State flips back; the change log records both events.` },
      { title: 'Watch the counters', text: `Visible-time and hidden-time accumulate from real deltas.` },
      { title: 'Minimize the window', text: `Same hidden state, confirming it's not just a tab check.` },
      { title: 'Wire it to real work', text: `Gate polling/video/animation on document.visibilityState.` },
    ] },
    features: [
      { title: 'Real visibilityState reads', text: `Not a guess — the browser's own value.` },
      { title: 'visibilitychange listener', text: `Fires on every genuine foreground/background switch.` },
      { title: 'Accurate time accounting', text: `Date.now() deltas, not polling estimates.` },
      { title: 'Capped live change log', text: `Timestamped entries, trimmed at 25 rows.` },
      { title: 'Switch counter', text: `Tallies total visibility transitions.` },
      { title: 'Unsupported-browser fallback', text: `Static labeled message if the API is missing.` },
      { title: 'No blur/focus false positives', text: `Avoids the common in-page-focus pitfall.` },
      { title: 'Zero dependencies', text: `Plain DOM APIs only.` },
    ],
    useCases: [
      { title: 'Video/audio players', text: `Pause playback when the tab is hidden.` },
      { title: 'Live dashboards', text: `Pause polling; pair with [uptime status page](/ui-snippets/uptime-status-page/).` },
      { title: 'Analytics accuracy', text: `Track true time-on-page, excluding background time.` },
      { title: 'Games', text: `Pause the update loop when backgrounded.` },
      { title: 'Battery-conscious apps', text: `Reduce timers/animations while hidden.` },
      { title: 'Presence indicators', text: `Combine with [live visitor counter](/ui-snippets/live-visitor-counter/).` },
      { icon: 'CODE', title: 'Related: Unit Converter', desc: 'See the [Unit Converter](/ui-snippets/unit-converter/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What counts as "hidden" under the Page Visibility API?', a: `document.visibilityState reports "hidden" when the tab is switched away from, the browser window is minimized, or on some platforms when the screen is locked — essentially any time the page's content is not being rendered to the user. It reports "visible" only when the tab is actually on screen and in the foreground.` },
      { q: 'Why use visibilitychange instead of window blur/focus?', a: `blur and focus fire for reasons unrelated to tab visibility, like clicking into a browser extension popup or opening developer tools, which can trigger a false "hidden" reading while the tab is still fully visible. document.visibilityState and visibilitychange are purpose-built for this exact question and don't have those false positives.` },
      { q: 'How are the visible-time and hidden-time counters calculated?', a: `Each time visibilitychange fires, the code takes Date.now() and computes the elapsed milliseconds since the last change, adding that delta to whichever counter (visible or hidden) matches the state that just ended. This is a real accumulated elapsed-time measurement, not a polling-based estimate, so it stays accurate regardless of how long each state lasts.` },
      { q: 'What should I actually do when the page becomes hidden?', a: `Common patterns: pause video/audio playback and disconnect visualizer loops, stop or slow down polling intervals for live data, pause requestAnimationFrame-driven animations or games, and skip sending analytics "heartbeat" pings. Resume all of it in the visible branch of the same visibilitychange handler.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Register the visibilitychange listener in a mount effect and remove it on unmount. Store visibilityState, the time counters, and the log entries in component state (or a ref for the raw timers to avoid re-render overhead), updating state from inside the handler exactly as the vanilla version updates the DOM directly.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why document.visibilityState and the visibilitychange event are the correct tool for detecting tab backgrounding, versus window blur/focus events which can produce false positives from in-page focus changes. It's also useful for reasoning about the time-accounting logic — ask it to walk through why the visible/hidden millisecond counters are computed from Date.now() deltas between change events rather than from a running setInterval poll, and what drift or inaccuracy the polling approach would introduce. For extensions, ask it to add a "pause video" or "pause polling" callback hook that fires alongside the existing log entries, or to persist the change log to localStorage across page reloads. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "page visibility indicator" in plain HTML, CSS, and JavaScript using the real browser Page Visibility API — no libraries.

Requirements:
- A status card showing document.visibilityState ("visible" or "hidden") with a colored dot (green for visible, red for hidden) and a short explanatory sentence, updated by listening for the visibilitychange event on document — not window blur/focus.
- Three running stats: total time visible, total time hidden, and a count of total visibility state changes during the session. Compute the time totals from real Date.now() millisecond deltas measured between successive visibilitychange events (and a live-updating current-visible-time tick via setInterval while visible), not from polling estimates.
- A capped, timestamped change log (newest entry first, capped around 25 rows) that records every visibilitychange transition with a human-readable time and whether the tab became visible or hidden.
- Feature-detect the API by checking typeof document.hidden !== 'undefined' before wiring the listener; if unsupported, show a clearly labeled fallback message stating the API is unavailable and the indicator is showing a static "always visible" state, rather than silently doing nothing.
- Explain in a code comment why visibilitychange is preferred over blur/focus for this purpose (avoiding false positives from in-page focus shifts like opening dev tools or an extension popup).`,
    },
  },
};

export default pageVisibilityIndicator;
