const dnsPropagationCheckerWidget = {
  id: 'dns-propagation-checker-widget',
  title: 'DNS Propagation Checker Widget',
  category: 'dashboards',
  html: `<div class="demo">
  <div class="tile">
    <div class="tile-head">
      <div>
        <h3>DNS propagation</h3>
        <p class="record-line"><span class="record-type">A</span> app.example.com <span class="arrow">&rarr;</span> 203.0.113.42</p>
      </div>
      <button class="recheck-btn" id="recheckBtn">Recheck</button>
    </div>

    <div class="progress-row">
      <div class="progress-bar"><div class="progress-fill" id="progressFill"></div></div>
      <span class="progress-text" id="progressText">0 / 8 resolvers</span>
    </div>

    <ul class="resolver-list" id="resolverList"></ul>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.tile { width: 400px; max-width: 100%; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 22px; display: flex; flex-direction: column; gap: 14px; }

.tile-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.tile-head h3 { font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
.record-line { font-size: 11.5px; color: #64748b; font-family: ui-monospace, 'SF Mono', monospace; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.record-type { background: #eef2ff; color: #4f46e5; font-weight: 800; padding: 1px 6px; border-radius: 5px; font-size: 10.5px; }
.arrow { color: #cbd5e1; }

.recheck-btn { border: 1px solid #e2e8f0; background: #fff; color: #4f46e5; font-size: 11.5px; font-weight: 700; padding: 7px 13px; border-radius: 8px; cursor: pointer; flex-shrink: 0; transition: background 0.12s, opacity 0.15s; }
.recheck-btn:hover:not(:disabled) { background: #f8fafc; }
.recheck-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.progress-row { display: flex; align-items: center; gap: 10px; }
.progress-bar { flex: 1; height: 7px; border-radius: 999px; background: #f1f5f9; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #6366f1, #8b5cf6); transition: width 0.4s ease; }
.progress-fill.complete { background: linear-gradient(90deg, #16a34a, #22c55e); }
.progress-text { font-size: 11px; font-weight: 700; color: #94a3b8; white-space: nowrap; font-variant-numeric: tabular-nums; }

.resolver-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.resolver-row { display: flex; align-items: center; gap: 10px; padding: 9px 11px; border-radius: 10px; background: #f8fafc; opacity: 0; transform: translateY(4px); transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s; }
.resolver-row.shown { opacity: 1; transform: translateY(0); }
.resolver-row.propagated { background: #f0fdf4; }

.resolver-dot { width: 8px; height: 8px; border-radius: 50%; background: #cbd5e1; flex-shrink: 0; }
.resolver-row.pending .resolver-dot { background: #f59e0b; animation: pulse 1s ease-in-out infinite; }
.resolver-row.propagated .resolver-dot { background: #16a34a; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

.resolver-name { flex: 1; font-size: 12.5px; font-weight: 700; color: #0f172a; }
.resolver-loc { font-size: 11px; color: #94a3b8; }
.resolver-status { font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; padding: 3px 8px; border-radius: 6px; flex-shrink: 0; }
.resolver-row.pending .resolver-status { background: #fffbeb; color: #b45309; }
.resolver-row.propagated .resolver-status { background: #dcfce7; color: #15803d; }`,
  js: `var RESOLVERS = [
  { name: 'Google', loc: 'Iowa, US', ip: '8.8.8.8', delay: 600 },
  { name: 'Cloudflare', loc: 'San Jose, US', ip: '1.1.1.1', delay: 850 },
  { name: 'Quad9', loc: 'Zurich, CH', ip: '9.9.9.9', delay: 1400 },
  { name: 'OpenDNS', loc: 'London, UK', ip: '208.67.222.222', delay: 1750 },
  { name: 'NTT', loc: 'Tokyo, JP', ip: '129.250.35.250', delay: 2300 },
  { name: 'Comodo', loc: 'Sydney, AU', ip: '8.26.56.26', delay: 2900 },
  { name: 'DNS.WATCH', loc: 'Frankfurt, DE', ip: '84.200.69.80', delay: 3500 },
  { name: 'Level3', loc: 'S\\u00e3o Paulo, BR', ip: '209.244.0.3', delay: 4100 },
];

var listEl = document.getElementById('resolverList');
var fillEl = document.getElementById('progressFill');
var textEl = document.getElementById('progressText');
var recheckBtn = document.getElementById('recheckBtn');
var timers = [];

function buildRows() {
  listEl.innerHTML = RESOLVERS.map(function (r, i) {
    return '<li class="resolver-row pending" data-i="' + i + '">' +
      '<span class="resolver-dot"></span>' +
      '<span class="resolver-name">' + r.name + '</span>' +
      '<span class="resolver-loc">' + r.loc + '</span>' +
      '<span class="resolver-status">Checking</span>' +
    '</li>';
  }).join('');
  requestAnimationFrame(function () {
    listEl.querySelectorAll('.resolver-row').forEach(function (row) { row.classList.add('shown'); });
  });
}

function updateProgress(done, total) {
  var pct = (done / total) * 100;
  fillEl.style.width = pct + '%';
  fillEl.classList.toggle('complete', done === total);
  textEl.textContent = done + ' / ' + total + ' resolvers' + (done === total ? ' \\u2014 fully propagated' : '');
}

function runCheck() {
  timers.forEach(clearTimeout);
  timers = [];
  recheckBtn.disabled = true;
  recheckBtn.textContent = 'Checking\\u2026';
  buildRows();
  updateProgress(0, RESOLVERS.length);
  var doneCount = 0;

  RESOLVERS.forEach(function (r, i) {
    var t = setTimeout(function () {
      var row = listEl.querySelector('.resolver-row[data-i="' + i + '"]');
      if (!row) return;
      row.classList.remove('pending');
      row.classList.add('propagated');
      row.querySelector('.resolver-status').textContent = 'Resolved';
      doneCount++;
      updateProgress(doneCount, RESOLVERS.length);
      if (doneCount === RESOLVERS.length) {
        recheckBtn.disabled = false;
        recheckBtn.textContent = 'Recheck';
      }
    }, r.delay);
    timers.push(t);
  });
}

recheckBtn.addEventListener('click', runCheck);
runCheck();`,
  seo: {
    title: 'DNS Propagation Checker Widget — Free HTML CSS JS Snippet',
    description: 'A dashboard widget checking a DNS record across global resolvers, with a live progress bar, staggered per-resolver results, and pulsing pending indicators. Exports to React, Vue & Tailwind.',
    about: {
      title: 'DNS Propagation Checker Widget — Staggered Resolver Checks & Live Progress Bar',
      description: `After changing a DNS record, the honest answer to "is it live yet" is "it depends which resolver you ask" — propagation isn't instantaneous or uniform, it trickles out across the world's DNS resolvers over minutes to hours depending on TTLs and caching. This widget models that reality directly: instead of a single pass/fail check, it queries a list of named global resolvers one at a time with staggered, realistic delays, letting each one settle into a "resolved" state independently while an overall progress bar tracks how much of the world has caught up.

**Staggered delays that mimic real geographic variance**

Each resolver object carries its own \`delay\` value in \`RESOLVERS\`, deliberately spread from 600ms (Google's well-connected Iowa infrastructure) to 4100ms (a resolver on the other side of the world) rather than resolving all eight simultaneously. \`runCheck()\` schedules one \`setTimeout\` per resolver at its own delay, so the list visibly fills in from nearest/fastest to farthest/slowest — the same pattern a real propagation check exhibits, where nearby resolvers with recently-refreshed caches often update well before ones on a different continent.

**A pulsing dot signals "still checking," not silence**

Rows in the \`pending\` state get a \`resolver-dot\` with a \`pulse\` keyframe animation (opacity oscillating via \`animation: pulse 1s ease-in-out infinite\`), giving each unresolved row a subtle heartbeat that communicates "this is actively being checked" rather than looking stalled or broken while its timer counts down. Once a resolver's timer fires, the dot switches to solid green and the pulse animation implicitly stops (since \`.propagated\` no longer carries the pending class that triggers it).

**Progress text and bar color both shift at full completion**

\`updateProgress()\` writes a \`"X / Y resolvers"\` count that, only once \`done === total\`, appends \`" — fully propagated"\` and swaps the bar's gradient from indigo-purple to green via a \`.complete\` class — a single extra piece of state (full completion) gets its own distinct visual treatment rather than the bar simply reaching 100% width in the same color it always was, making the "done" moment more noticeable at a glance.

**Recheck cancels in-flight timers before restarting**

Clicking \`#recheckBtn\` calls \`timers.forEach(clearTimeout)\` before scheduling a fresh batch — without this, clicking recheck mid-check would leave the previous run's timers still pending, potentially firing state updates against rows that \`buildRows()\` had already replaced, or double-counting \`doneCount\` from two overlapping runs. The button also disables itself for the duration of a check, since a real DNS lookup service would reasonably rate-limit or simply be unable to serve overlapping check requests from the same client.

**Row entrance uses a fade-and-rise reveal, not an instant list swap**

\`buildRows()\` inserts all rows with \`opacity: 0\` and adds the \`.shown\` class inside a \`requestAnimationFrame\` callback, the same two-step technique used elsewhere in this library to guarantee the initial hidden state actually paints before the transition to visible begins — otherwise the browser could coalesce both style writes and skip the fade-in entirely.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch resolvers resolve one at a time', text: 'Each resolver row switches from a pulsing "Checking" state to a solid green "Resolved" state at its own staggered delay, simulating real-world propagation timing.' },
        { title: 'Watch the progress bar and text', text: 'The bar fills and the count updates as each resolver completes, turning green with a "fully propagated" label once all resolvers are done.' },
        { title: 'Click "Recheck"', text: 'Cancels any in-flight timers, rebuilds the resolver list, and reruns the staggered check from the start — the button disables itself for the duration.' },
        { title: 'Replace the record being checked', text: 'Update the record type, hostname, and target value shown in the header .record-line.' },
        { title: 'Replace RESOLVERS with real lookups', text: 'Swap the setTimeout-based simulation for real DNS-over-HTTPS queries (for example via Cloudflare\'s or Google\'s DoH endpoints) against each named resolver, updating each row when its real response returns.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a Tailwind CSS version.' },
      ],
    },
    features: [
      'Eight named global DNS resolvers checked with individually staggered, realistic delays rather than all at once',
      'Pulsing dot animation clearly signals a resolver is still pending versus already resolved',
      'Live progress bar and count update as each resolver independently completes',
      'Bar and text switch to a distinct green "fully propagated" treatment only once every resolver is done',
      'Recheck button cancels in-flight timers before restarting to avoid overlapping or double-counted runs',
      'Recheck button disables itself for the duration of a check to prevent concurrent requests',
      'Resolver rows fade and rise into view using a two-step requestAnimationFrame reveal',
      'Structured to swap the simulated delays for real DNS-over-HTTPS lookups with minimal changes',
    ],
    useCases: [
      { icon: 'OPS', title: 'DevOps and infrastructure dashboards', desc: 'Give an engineer who just changed a DNS record a live view of how far propagation has reached instead of manually running dig or nslookup against a list of resolvers.' },
      { icon: 'FLOW', title: 'Domain registrar and DNS management tools', desc: 'Surface this after a customer updates a record in a registrar\'s control panel, replacing a static "changes may take up to 48 hours" disclaimer with a live check.' },
      { icon: 'ALERT', title: 'Migration and cutover status pages', desc: 'Pair with an [SSL Certificate Expiry Monitor](/ui-snippets/ssl-certificate-expiry-monitor/) style widget during a domain or hosting migration to track both DNS and certificate readiness at once.' },
      { icon: 'DASH', title: 'CDN and DNS provider status tools', desc: 'CDN providers that let customers point custom domains at their edge network can use this pattern to confirm a customer\'s CNAME or A record has propagated before enabling traffic.' },
      { icon: 'CODE', title: 'Learn staggered-timer simulation patterns', desc: 'A clean example of simulating variable-latency parallel operations with individually staggered setTimeout calls and proper cleanup on retry, useful for any "check multiple sources" UI.' },
    ],
    faqs: [
      { q: 'Are these real DNS lookups against real resolvers?', a: 'No — RESOLVERS is a static demo array and each resolver "resolves" after a fixed setTimeout delay rather than performing a real network lookup. For production use, replace the timers with real DNS-over-HTTPS queries (Cloudflare\'s or Google\'s DoH endpoints, for example) issued to each named resolver and update each row when its actual response arrives.' },
      { q: 'Why do resolvers complete at different times instead of all at once?', a: 'Each resolver object in RESOLVERS carries its own delay value, deliberately varied to mimic how real DNS propagation is uneven across the world — a nearby, well-connected resolver typically shows an updated record before a resolver on another continent with a different cache refresh schedule.' },
      { q: 'What happens if I click Recheck while a check is already in progress?', a: 'The button is disabled for the duration of a check, so this cannot happen through the UI. Internally, runCheck() also clears every previously scheduled timer via timers.forEach(clearTimeout) before starting a new batch, which prevents a stale in-flight run from firing state updates after a fresh check has already rebuilt the resolver list.' },
      { q: 'How does the pulsing dot animation work?', a: 'Rows with the pending class include a resolver-dot element with a CSS animation: pulse 1s ease-in-out infinite rule that oscillates its opacity. Once a resolver\'s timer fires, the row loses the pending class and gains propagated, which switches the dot to a solid green fill with no animation, visually distinguishing "still checking" from "confirmed resolved."' },
      { q: 'Why does the progress bar change color only once fully complete?', a: 'updateProgress() only adds the .complete class — which swaps the bar\'s gradient from indigo-purple to green — once the done count equals the total resolver count. Reserving the fully-complete color exclusively for the fully-complete state makes that specific moment stand out more clearly than if the bar simply approached 100% in its normal color.' },
      { q: 'How do I add or remove resolvers?', a: 'Add or remove objects in the RESOLVERS array, each with a name, loc, ip, and delay. The row-building, progress-counting, and staggered-timer logic all iterate over this array directly, so no other code changes are needed to change the resolver count.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why runCheck() clears all previously scheduled timers before starting a new batch, and what visible bug would appear if that cleanup line were removed and a user clicked recheck mid-check. The same assistant can help optimize it — for instance asking how to replace the setTimeout-based simulation with real DNS-over-HTTPS fetch calls to public resolver APIs while preserving the same staggered-reveal UI. It's also useful for extending the widget: ask it to add a per-resolver "copy resolved IP" button, support checking multiple record types (A, CNAME, MX, TXT) in tabs, or add a subtle warning state for resolvers that time out entirely. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "DNS propagation checker" dashboard widget in HTML, CSS, and vanilla JavaScript — no framework, no real network calls (simulate with timers).

Requirements:
- Show the DNS record being checked (type, hostname, target value) in the widget header, and a "Recheck" button.
- Maintain a list of at least six named DNS resolvers (each with a name, location, and IP), and render one row per resolver showing a status dot, its name, its location, and a status label starting as "Checking."
- Each resolver row must transition from a pending state to a resolved state at its own individually staggered delay (not all resolvers completing simultaneously) — the pending state's status dot must have a pulsing CSS animation, and the resolved state must switch it to a solid, differently colored dot with updated status text.
- Maintain an overall progress bar and a "X / Y resolvers" text counter that update as each individual resolver completes; once every resolver has completed, both the bar and the counter text must switch to a distinct "fully propagated" visual treatment not used at any earlier point.
- The Recheck button must disable itself while a check is running, and clicking it (after a check finishes) must cancel every previously scheduled timer from the prior run before rebuilding the resolver list and starting a completely fresh staggered check — explain in a comment why failing to cancel old timers before starting a new run could cause incorrect state updates.
- Newly built resolver rows should fade and rise into view rather than appearing instantly.`,
    },
  },
};

export default dnsPropagationCheckerWidget;
