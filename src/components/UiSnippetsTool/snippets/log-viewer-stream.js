const logViewerStream = {
  id: 'log-viewer-stream',
  title: 'Live Log Viewer',
  lastmod: '2026-08-15',
  category: 'dashboards',
  html: `<div class="lv-wrap">
  <div class="lv-bar">
    <div class="lv-title">
      <span class="lv-dot" id="lvDot"></span>
      <strong>checkout-api</strong>
      <span class="lv-env">production</span>
    </div>
    <div class="lv-actions">
      <button class="lv-btn" id="lvPause">Pause</button>
      <button class="lv-btn" id="lvClear">Clear</button>
    </div>
  </div>

  <div class="lv-filters">
    <input class="lv-search" id="lvSearch" type="text" placeholder="Filter messages…" spellcheck="false" autocomplete="off">
    <div class="lv-levels" id="lvLevels">
      <button class="lv-lvl on" data-level="debug">debug</button>
      <button class="lv-lvl on" data-level="info">info</button>
      <button class="lv-lvl on" data-level="warn">warn</button>
      <button class="lv-lvl on" data-level="error">error</button>
    </div>
  </div>

  <div class="lv-console" id="lvConsole">
    <div class="lv-lines" id="lvLines"></div>
  </div>

  <button class="lv-jump" id="lvJump" hidden>New logs ↓</button>

  <div class="lv-foot">
    <span id="lvCount">0 lines</span>
    <span id="lvState">streaming</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#0f172a;padding:26px 16px;color:#e2e8f0}

.lv-wrap{max-width:720px;margin:0 auto;background:#1e293b;border:1px solid #334155;border-radius:14px;overflow:hidden;position:relative}

.lv-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 15px;border-bottom:1px solid #334155}
.lv-title{display:flex;align-items:center;gap:8px;font-size:13px;min-width:0}
.lv-dot{width:8px;height:8px;border-radius:50%;background:#10b981;flex-shrink:0;box-shadow:0 0 0 0 rgba(16,185,129,.6);animation:lvPulse 2s infinite}
.lv-dot.off{background:#64748b;animation:none;box-shadow:none}
@keyframes lvPulse{70%{box-shadow:0 0 0 7px rgba(16,185,129,0)}100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}}
.lv-env{font-size:10.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#94a3b8;background:#0f172a;padding:3px 7px;border-radius:5px}

.lv-actions{display:flex;gap:7px}
.lv-btn{background:#334155;color:#cbd5e1;border:none;border-radius:7px;padding:6px 11px;font-size:11.5px;font-weight:700;cursor:pointer;font-family:inherit}
.lv-btn:hover{background:#475569}
.lv-btn.on{background:#6366f1;color:#fff}

.lv-filters{display:flex;gap:9px;padding:11px 15px;border-bottom:1px solid #334155;flex-wrap:wrap}
.lv-search{
  flex:1;min-width:150px;padding:7px 11px;border-radius:8px;border:1.5px solid #334155;
  background:#0f172a;color:#e2e8f0;font-size:12.5px;font-family:inherit;
}
.lv-search:focus{outline:none;border-color:#6366f1}
.lv-levels{display:flex;gap:5px}
.lv-lvl{
  background:#0f172a;border:1px solid #334155;color:#64748b;border-radius:6px;
  padding:6px 9px;font-size:11px;font-weight:700;cursor:pointer;font-family:ui-monospace,Menlo,monospace;
}
.lv-lvl.on[data-level=debug]{color:#94a3b8;border-color:#475569}
.lv-lvl.on[data-level=info]{color:#38bdf8;border-color:rgba(56,189,248,.45)}
.lv-lvl.on[data-level=warn]{color:#fbbf24;border-color:rgba(251,191,36,.45)}
.lv-lvl.on[data-level=error]{color:#fb7185;border-color:rgba(244,63,94,.45)}

.lv-console{height:270px;overflow-y:auto;background:#0b1120;padding:9px 0;scroll-behavior:auto}
.lv-lines{display:flex;flex-direction:column}

.lv-line{
  display:flex;gap:9px;padding:3px 15px;font-family:ui-monospace,Menlo,Consolas,monospace;
  font-size:12px;line-height:1.55;border-left:2px solid transparent;
}
.lv-line:hover{background:#131c30}
.lv-time{color:#475569;flex-shrink:0}
.lv-level{font-weight:700;flex-shrink:0;width:44px}
.lv-msg{color:#cbd5e1;min-width:0;word-break:break-word}
.lv-msg mark{background:rgba(99,102,241,.35);color:#e0e7ff;border-radius:2px}

.lv-line.debug .lv-level{color:#64748b}
.lv-line.info  .lv-level{color:#38bdf8}
.lv-line.warn  .lv-level{color:#fbbf24}
.lv-line.warn{border-left-color:rgba(251,191,36,.5);background:rgba(251,191,36,.05)}
.lv-line.error .lv-level{color:#fb7185}
.lv-line.error{border-left-color:#f43f5e;background:rgba(244,63,94,.07)}

.lv-empty{padding:26px 15px;text-align:center;color:#475569;font-size:12.5px}

.lv-jump{
  position:absolute;left:50%;transform:translateX(-50%);bottom:52px;
  background:#6366f1;color:#fff;border:none;border-radius:999px;padding:7px 15px;
  font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;
  box-shadow:0 6px 18px rgba(0,0,0,.45);
}

.lv-foot{
  display:flex;justify-content:space-between;padding:9px 15px;border-top:1px solid #334155;
  font-size:11.5px;color:#64748b;font-family:ui-monospace,Menlo,monospace;
}`,

  js: `var MAX_LINES = 400;          // ring-buffer ceiling so memory stays flat
var STICK_PX = 40;            // how close to the bottom still counts as "following"

var SAMPLES = [
  ['info',  'GET /api/cart 200 in 42ms'],
  ['info',  'GET /api/user/me 200 in 18ms'],
  ['debug', 'cache hit key=cart:u_8812 ttl=280s'],
  ['info',  'POST /api/cart/items 201 in 96ms'],
  ['debug', 'pool acquire conn=7 idle=3 waiting=0'],
  ['warn',  'slow query 1284ms table=order_items'],
  ['info',  'POST /api/checkout/session 200 in 210ms'],
  ['error', 'payment gateway timeout after 5000ms order=A-40921'],
  ['info',  'retry scheduled attempt=2 backoff=800ms'],
  ['debug', 'feature flag checkout_v3 evaluated=true'],
  ['warn',  'rate limit 80% consumed client=web-storefront'],
  ['info',  'GET /api/orders 200 in 61ms'],
  ['error', 'unhandled rejection in worker: ECONNRESET'],
  ['debug', 'gc pause 12ms heap=214MB'],
];

var consoleEl = document.getElementById('lvConsole');
var linesEl = document.getElementById('lvLines');
var searchEl = document.getElementById('lvSearch');
var jumpBtn = document.getElementById('lvJump');
var countEl = document.getElementById('lvCount');
var stateEl = document.getElementById('lvState');
var dot = document.getElementById('lvDot');
var pauseBtn = document.getElementById('lvPause');

var logs = [];
var paused = false;
var following = true;      // is the viewport pinned to the bottom?
var levels = { debug: true, info: true, warn: true, error: true };
var seq = 1;
var timer = null;

function stamp(d) {
  function p(n) { return (n < 10 ? '0' : '') + n; }
  return p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
}

function escapeHtml(s) {
  return s.replace(/[&<>]/g, function (c) {
    return c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;';
  });
}

// Escape first, then inject <mark> — never the other way round, or a log line
// containing markup would be able to inject nodes into the viewer.
function highlight(text, term) {
  var safe = escapeHtml(text);
  if (!term) return safe;
  var i = safe.toLowerCase().indexOf(term.toLowerCase());
  if (i === -1) return safe;
  return safe.slice(0, i) + '<mark>' + safe.slice(i, i + term.length) + '</mark>' + safe.slice(i + term.length);
}

function visible() {
  var term = searchEl.value.trim().toLowerCase();
  return logs.filter(function (l) {
    if (!levels[l.level]) return false;
    if (term && l.msg.toLowerCase().indexOf(term) === -1) return false;
    return true;
  });
}

function render() {
  var term = searchEl.value.trim();
  var rows = visible();

  if (!rows.length) {
    linesEl.innerHTML = '<div class="lv-empty">No lines match the current filters.</div>';
  } else {
    // One string build then one innerHTML write — far cheaper than appending
    // hundreds of nodes individually while the stream is running.
    var html = '';
    for (var i = 0; i < rows.length; i++) {
      var l = rows[i];
      html += '<div class="lv-line ' + l.level + '">' +
                '<span class="lv-time">' + l.time + '</span>' +
                '<span class="lv-level">' + l.level + '</span>' +
                '<span class="lv-msg">' + highlight(l.msg, term) + '</span>' +
              '</div>';
    }
    linesEl.innerHTML = html;
  }

  countEl.textContent = rows.length + ' of ' + logs.length + ' lines';
  if (following) scrollToEnd();
}

function scrollToEnd() {
  consoleEl.scrollTop = consoleEl.scrollHeight;
  jumpBtn.hidden = true;
}

function push() {
  var s = SAMPLES[Math.floor(Math.random() * SAMPLES.length)];
  logs.push({ id: seq++, level: s[0], msg: s[1], time: stamp(new Date()) });
  if (logs.length > MAX_LINES) logs.shift();   // drop the oldest, keep memory flat
  render();
  if (!following) jumpBtn.hidden = false;
}

function schedule() {
  clearTimeout(timer);
  if (paused) return;
  // Irregular gaps read as a real service; a fixed interval reads as a demo.
  timer = setTimeout(function () { push(); schedule(); }, 500 + Math.random() * 1100);
}

function setPaused(next) {
  paused = next;
  pauseBtn.textContent = paused ? 'Resume' : 'Pause';
  pauseBtn.classList.toggle('on', paused);
  dot.classList.toggle('off', paused);
  stateEl.textContent = paused ? 'paused' : 'streaming';
  schedule();
}

// Auto-follow is derived from scroll position, never toggled by a checkbox:
// scrolling up detaches, scrolling back to the bottom re-attaches.
consoleEl.addEventListener('scroll', function () {
  var distance = consoleEl.scrollHeight - consoleEl.scrollTop - consoleEl.clientHeight;
  following = distance <= STICK_PX;
  if (following) jumpBtn.hidden = true;
}, { passive: true });

jumpBtn.addEventListener('click', function () {
  following = true;
  scrollToEnd();
});

pauseBtn.addEventListener('click', function () { setPaused(!paused); });

document.getElementById('lvClear').addEventListener('click', function () {
  logs = [];
  following = true;
  render();
});

document.getElementById('lvLevels').addEventListener('click', function (e) {
  var btn = e.target.closest('.lv-lvl');
  if (!btn) return;
  var lvl = btn.dataset.level;
  levels[lvl] = !levels[lvl];
  btn.classList.toggle('on', levels[lvl]);
  render();
});

searchEl.addEventListener('input', render);

// Seed with back-dated lines — pushing 12 in a loop would stamp them all with
// the same second and make the console look generated rather than tailed.
(function seed() {
  var now = Date.now();
  for (var i = 11; i >= 0; i--) {
    var s = SAMPLES[Math.floor(Math.random() * SAMPLES.length)];
    logs.push({
      id: seq++,
      level: s[0],
      msg: s[1],
      time: stamp(new Date(now - (i * 4200) - Math.floor(Math.random() * 3000))),
    });
  }
  render();
})();

setPaused(false);`,

  seo: {
    title: 'Live Log Viewer — Free HTML CSS JS Snippet',
    description: 'Streaming log console with level filters, search highlighting, scroll-anchored autoscroll and a ring buffer. Pure vanilla JS, no dependencies.',
    about: {
      title: 'Live Log Viewer — Scroll-Anchored Autoscroll, Level Filtering & a Bounded Ring Buffer',
      description: `A log viewer is deceptively hard to get right, and the difficulty is never the rendering. It is that the component has to guess whether the reader wants to follow the stream or read something further up — and every implementation that gets this wrong becomes unusable at exactly the moment it matters, when something is going wrong and lines are arriving fast.

**Auto-follow derived from scroll position, not a toggle**

The rule here is the one every good terminal uses: if the viewport is within 40 pixels of the bottom, the viewer is following and new lines scroll into view. Scroll up by more than that and following stops immediately, so the line you are reading stays put no matter how much arrives underneath. Scroll back to the bottom and following resumes on its own. There is no checkbox, because a checkbox makes the reader manage state that their scroll position already expresses unambiguously. When new lines arrive while detached, a "New logs" pill appears rather than yanking the view.

**A ring buffer so memory stays flat**

Streams do not end, so an append-only viewer grows without limit until the tab dies. \`logs\` is capped at 400 entries and \`shift()\` drops the oldest as new ones arrive, which bounds both the array and the DOM. This is the single most important line in a long-lived log component, and the one most often missing from hand-rolled versions that were only ever tested for a minute.

**One string build per frame, not one node append per line**

Rendering rebuilds the visible list as a single HTML string and assigns it once. Appending elements individually forces layout work per line and gets visibly slow when a burst arrives or a filter changes. Building a string and writing it once is both simpler and dramatically faster at this scale, and it makes filtering — which changes which lines exist rather than adding to them — the same code path as streaming.

**Escaping before highlighting, in that order**

Search matches are wrapped in \`<mark>\`, which means the renderer writes HTML. The escape runs first, over the raw message, and the \`<mark>\` tags are inserted into the already-escaped string afterwards. Doing it the other way round — highlighting then escaping — would escape your own markup, and skipping the escape entirely would let any log line containing angle brackets inject nodes into the page. Log messages routinely contain user-supplied data, so this ordering is a security property, not a formatting detail.

**Filters that compose**

Level toggles and the text search are applied together in one \`visible()\` filter, and the footer reports "N of M lines" so it is always clear that a quiet console means an active filter rather than a dead stream. Level chips carry their own colour when active, so the filter row doubles as the legend for the lines below it.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch the stream', text: 'Lines arrive at irregular intervals with a level, timestamp and message, and the pulsing green dot in the header indicates a live connection. Warnings and errors carry a coloured left border so they are findable while scrolling.' },
        { title: 'Scroll up to detach', text: 'Scrolling more than 40px from the bottom stops auto-follow instantly, so the line you are reading stays under your cursor while new lines continue to accumulate below.' },
        { title: 'Use the New logs pill to catch up', text: 'While detached, arriving lines surface a pill at the bottom of the console. Clicking it re-attaches and jumps to the newest line; scrolling back down manually does the same thing.' },
        { title: 'Filter by level', text: 'The four level chips toggle independently and are coloured to match the lines they control, so the filter row is also the legend. Turning off debug and info is the fastest way to see only what went wrong.' },
        { title: 'Search within messages', text: 'Typing filters to matching lines and highlights the matched substring inside each one. The footer shows "N of M lines" so a filtered view is never mistaken for a stalled stream.' },
        { title: 'Pause or clear', text: 'Pause stops the stream and greys the status dot while keeping everything already received. Clear empties the buffer and re-attaches to the bottom.' },
      ],
    },
    features: [
      'Auto-follow derived from scroll position with a 40px stick threshold — no follow checkbox to manage',
      '"New logs" pill surfaced only while detached, instead of yanking the viewport mid-read',
      'Ring buffer capped at 400 lines so a long-running stream keeps memory and DOM size flat',
      'Single string build and one innerHTML write per render rather than per-line node appends',
      'HTML escaped before search highlighting is injected, so log content can never inject nodes',
      'Level toggles and text search composed in one filter, with an "N of M lines" footer',
      'Level chips coloured to match their lines, doubling as the legend',
      'Irregular arrival intervals so the stream reads like a real service rather than a metronome',
      'Pause, resume and clear controls with a pulsing live-status indicator',
    ],
    useCases: [
      { icon: 'DASH', title: 'Deployment and build log output', desc: 'The natural home for this component — CI output, deploy logs and job runners all stream and all need the follow/detach behaviour. Pair it with a [status page](/ui-snippets/uptime-status-page/) so the log sits next to the service health it explains.' },
      { icon: 'FLOW', title: 'Live tail views in an observability tool', desc: 'Level filters and substring search cover the great majority of what people do with a tail before reaching for a query language, and the bounded buffer means the view can be left open all day without degrading.' },
      { icon: 'CODE', title: 'Reference for scroll-anchored streaming UIs', desc: 'The same follow-versus-detach problem appears in chat transcripts, comment threads and AI response streams. The threshold-based approach here transfers directly and is the reason well-behaved chat apps do not scroll away from you mid-read.' },
      { icon: 'APP', title: 'Developer tooling and local dashboards', desc: 'Debug consoles inside admin panels, webhook inspectors and background-worker monitors all need this shape, and none of them justify a dependency for it.' },
      { icon: 'LEARN', title: 'Teaching safe dynamic HTML', desc: 'The escape-then-highlight ordering is a compact, concrete example of why the sequence of those two operations is a security decision rather than a stylistic one.' },
      { icon: 'FORM', title: 'Support and diagnostics panels shown to end users', desc: 'When customers need to see what a long-running import or sync is doing, a filtered, pausable log is far more reassuring than a spinner, and the level filter lets you hide debug noise by default.' },
      { icon: 'CODE', title: 'Related: Podcast Episode Chapters', desc: 'See the [Podcast Episode Chapters](/ui-snippets/podcast-episode-chapters/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the viewer know whether to keep scrolling?', a: 'It measures the distance from the bottom on every scroll event — scrollHeight minus scrollTop minus clientHeight — and treats anything within 40 pixels as "following". That single derived boolean drives everything: new lines only scroll into view while it is true, and the New logs pill only appears while it is false. Scrolling back to the bottom re-attaches automatically.' },
      { q: 'Why cap the buffer at 400 lines?', a: 'Because a stream has no end. Without a cap, both the array and the DOM grow until the tab becomes unresponsive — a bug that never shows up in a short test and always shows up in production. shift() drops the oldest line as each new one arrives, keeping memory and render cost flat regardless of how long the viewer is left open. Raise MAX_LINES if you need more scrollback.' },
      { q: 'Is the search highlighting safe against log content containing HTML?', a: 'Yes, because of the ordering. The message is HTML-escaped first, and the <mark> tags are inserted into the already-escaped string afterwards. If you highlighted first you would escape your own markup; if you skipped escaping, a log line containing a script tag would execute. Log messages frequently contain user input, so this ordering matters.' },
      { q: 'How do I connect it to a real log source?', a: 'Replace the push() timer with your transport and call push() with real records. For Server-Sent Events, new EventSource(url).onmessage pushes each parsed payload; for WebSockets, do the same in onmessage. Nothing else changes — the buffer, filtering, follow behaviour and rendering are all independent of where the lines came from.' },
      { q: 'Why rebuild the whole list instead of appending one line?', a: 'Because filtering and streaming then share one code path. Appending is only cheaper when nothing is filtered, and it forces a full rebuild anyway the moment a level toggle or search term changes. At a few hundred lines, one string build plus one innerHTML write is fast enough that the simpler model wins; for tens of thousands of lines you would move to windowed rendering.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the log array in a ref rather than state and batch renders, since a high-frequency stream calling setState per line will re-render far more often than the screen repaints. Keep the derived following boolean in a ref too, read scroll geometry from a ref to the console element, and perform the scroll-to-bottom in a layout effect after the new lines have been committed.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to replace the simulated timer with a real EventSource connection, including reconnect-with-backoff and a visible connection state on the status dot — that turns the demo into something you could actually point at a service. Other natural extensions: add windowed rendering so the buffer can hold tens of thousands of lines while only the visible slice is in the DOM; add structured-log support that parses JSON messages and lets you filter on a field rather than a substring; add a "copy visible lines" action that respects the current filters; or add timestamp-range selection so a user can pin the view to the minute an incident started.`,
      prompt: `Build a live streaming log viewer in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- A fixed-height scrollable console that receives new log lines on an irregular timer, each with a level (debug/info/warn/error), a timestamp and a message.
- Implement auto-follow derived from scroll position, NOT a checkbox: measure scrollHeight - scrollTop - clientHeight on scroll and treat anything within about 40px of the bottom as "following". While following, new lines scroll into view; once the user scrolls up, the viewport must not move even as lines arrive.
- While detached, show a floating "New logs" pill that re-attaches and jumps to the bottom when clicked. Scrolling back to the bottom must re-attach automatically and hide the pill.
- Cap the log buffer with a ring buffer (shift the oldest past a maximum such as 400 lines) so memory and DOM size stay flat for a stream that never ends.
- Render by building one HTML string for the visible lines and assigning it once, rather than appending nodes per line — so streaming and filtering use the same code path.
- Provide four independent level toggle chips, coloured to match the lines they control so the filter row doubles as a legend, plus a text search that filters messages and highlights the matched substring with <mark>.
- IMPORTANT: HTML-escape the message FIRST, then insert the <mark> tags into the escaped string. Never highlight before escaping, and never skip escaping — log messages routinely contain user-supplied data.
- Show a footer reading "N of M lines" so a filtered view is never mistaken for a stalled stream, plus Pause/Resume and Clear controls and a pulsing live-status dot that greys out when paused.
- Style it as a dark terminal panel with monospace lines, coloured level labels, and a coloured left border plus tinted background on warn and error rows.`,
    },
  },
};

export default logViewerStream;
