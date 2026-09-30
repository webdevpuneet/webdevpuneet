const slaCountdownBadge = {
  id: 'sla-countdown-badge',
  title: 'SLA Countdown Badge',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<section class="scb-wrap">
  <span class="scb-tag">support · sla response deadline</span>
  <h1>Ticket #4821</h1>
  <p class="scb-subject">"Checkout button unresponsive on mobile Safari"</p>

  <div class="scb-card">
    <div class="scb-badge-row">
      <span class="scb-badge" id="scbBadge">
        <span class="scb-dot"></span>
        <span id="scbTimeLabel">--:--:--</span>
      </span>
      <span class="scb-band-label" id="scbBandLabel">On track</span>
    </div>

    <div class="scb-track">
      <div class="scb-track-fill" id="scbTrackFill"></div>
    </div>

    <div class="scb-meta">
      <div><span>Priority</span><strong>P1 — Urgent</strong></div>
      <div><span>SLA target</span><strong id="scbDeadlineLabel">30 min response</strong></div>
      <div><span>Assigned</span><strong>Maya R.</strong></div>
    </div>
  </div>

  <div class="scb-controls">
    <button class="scb-btn" id="scbResetBtn">Reset to 25 min left</button>
    <button class="scb-btn" id="scbAmberBtn">Jump to amber band</button>
    <button class="scb-btn" id="scbOverdueBtn">Simulate overdue</button>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#12161f,#05070b 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.scb-wrap{width:100%;max-width:440px;text-align:center}
.scb-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7dd3fc;background:rgba(125,211,252,.1);border:1px solid rgba(125,211,252,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.scb-wrap h1{font-size:clamp(22px,6vw,28px);font-weight:800;letter-spacing:-.02em}
.scb-subject{font-size:13.5px;color:#8fa3b8;margin-top:6px;font-style:italic}
.scb-card{margin-top:20px;border-radius:16px;border:1px solid rgba(125,211,252,.16);background:#0c1017;padding:20px;text-align:left}
.scb-badge-row{display:flex;align-items:center;justify-content:space-between}
.scb-badge{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:99px;background:rgba(74,222,128,.14);border:1px solid rgba(74,222,128,.35);color:#86efac;font-weight:700;font-size:15px;font-variant-numeric:tabular-nums;transition:background .25s,border-color .25s,color .25s}
.scb-badge.amber{background:rgba(251,191,36,.14);border-color:rgba(251,191,36,.35);color:#fcd34d}
.scb-badge.red{background:rgba(248,113,113,.14);border-color:rgba(248,113,113,.35);color:#fca5a5}
.scb-badge.overdue{background:rgba(239,68,68,.22);border-color:rgba(239,68,68,.55);color:#fecaca;animation:scbPulse 1.4s ease-in-out infinite}
.scb-dot{width:8px;height:8px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor}
@keyframes scbPulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.35)}50%{box-shadow:0 0 0 8px rgba(239,68,68,0)}}
.scb-band-label{font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#6a8296}
.scb-track{margin-top:16px;height:8px;border-radius:99px;background:rgba(255,255,255,.07);overflow:hidden}
.scb-track-fill{height:100%;width:0%;border-radius:99px;background:linear-gradient(90deg,#4ade80,#22c55e);transition:width .4s ease,background .4s ease}
.scb-track-fill.amber{background:linear-gradient(90deg,#fbbf24,#f59e0b)}
.scb-track-fill.red,.scb-track-fill.overdue{background:linear-gradient(90deg,#f87171,#ef4444)}
.scb-meta{display:flex;justify-content:space-between;gap:10px;margin-top:18px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08)}
.scb-meta div{display:flex;flex-direction:column;gap:3px}
.scb-meta span{font-size:10px;text-transform:uppercase;letter-spacing:.05em;color:#5f7688}
.scb-meta strong{font-size:12.5px;color:#dcecf5}
.scb-controls{display:flex;gap:8px;margin-top:16px;flex-wrap:wrap;justify-content:center}
.scb-btn{padding:9px 13px;border-radius:9px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#c9dbe6;font:600 12px system-ui;cursor:pointer;transition:background .15s}
.scb-btn:hover{background:rgba(255,255,255,.1)}`,

  js: `var badge = document.getElementById("scbBadge");
var timeLabel = document.getElementById("scbTimeLabel");
var bandLabel = document.getElementById("scbBandLabel");
var trackFill = document.getElementById("scbTrackFill");
var resetBtn = document.getElementById("scbResetBtn");
var amberBtn = document.getElementById("scbAmberBtn");
var overdueBtn = document.getElementById("scbOverdueBtn");

var TOTAL_MS = 30 * 60 * 1000; // 30-minute SLA window
var deadline = Date.now() + 25 * 60 * 1000; // starts with 25 min remaining
var timer = null;

function formatDuration(ms) {
  var sign = ms < 0 ? "-" : "";
  var abs = Math.abs(ms);
  var totalSeconds = Math.floor(abs / 1000);
  var hours = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds % 3600) / 60);
  var seconds = totalSeconds % 60;
  var pad = function (n) { return n < 10 ? "0" + n : String(n); };
  if (hours > 0) return sign + hours + ":" + pad(minutes) + ":" + pad(seconds);
  return sign + pad(minutes) + ":" + pad(seconds);
}

function classify(remainingMs) {
  var pctElapsed = 1 - remainingMs / TOTAL_MS;
  if (remainingMs <= 0) return "overdue";
  if (pctElapsed >= 0.8) return "red";
  if (pctElapsed >= 0.5) return "amber";
  return "green";
}

function render() {
  var remainingMs = deadline - Date.now();
  var band = classify(remainingMs);

  timeLabel.textContent = formatDuration(remainingMs);

  badge.classList.remove("amber", "red", "overdue");
  trackFill.classList.remove("amber", "red", "overdue");

  if (band === "overdue") {
    badge.classList.add("overdue");
    trackFill.classList.add("overdue");
    trackFill.style.width = "100%";
    bandLabel.textContent = "Overdue — breach";
  } else {
    if (band === "amber") { badge.classList.add("amber"); trackFill.classList.add("amber"); }
    if (band === "red") { badge.classList.add("red"); trackFill.classList.add("red"); }

    var pctElapsed = Math.min(1, Math.max(0, 1 - remainingMs / TOTAL_MS));
    trackFill.style.width = (pctElapsed * 100) + "%";

    bandLabel.textContent = band === "green" ? "On track" : band === "amber" ? "At risk" : "Critical";
  }
}

function tick() {
  render();
}

function startTimer() {
  if (timer) clearInterval(timer);
  timer = setInterval(tick, 1000);
  render();
}

resetBtn.addEventListener("click", function () {
  deadline = Date.now() + 25 * 60 * 1000;
  startTimer();
});

amberBtn.addEventListener("click", function () {
  // Land squarely in the amber band: 50-80% elapsed of a 30 min window.
  deadline = Date.now() + 9 * 60 * 1000; // 9 min left of 30 => 70% elapsed
  startTimer();
});

overdueBtn.addEventListener("click", function () {
  deadline = Date.now() - 3 * 60 * 1000; // already 3 minutes past deadline
  startTimer();
});

startTimer();`,

  seo: {
    title: 'SLA Countdown Badge — Free Support Ticket Response-Time Countdown',
    description: `A support-ticket SLA badge that counts down to a response deadline with green/amber/red urgency bands and a distinct pulsing overdue state that keeps counting into negative time. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'SLA Countdown Badge — Live Urgency Bands That Shift as the Deadline Approaches',
      description: `Support and incident tools live or die on whether an SLA deadline is visible at a glance, and this badge is built for exactly that: a live countdown to a response-time deadline that changes color as urgency increases, then keeps running into negative time with a distinct, unmistakable style once the deadline has passed. It's the pattern behind the small red timer chip on every serious ticketing and on-call tool.

**A single deadline drives everything**

The whole widget is a function of one \`deadline\` timestamp and a \`TOTAL_MS\` SLA window (30 minutes here, matching a P1 response target). \`render()\`, called every second, computes \`remainingMs = deadline - Date.now()\` and derives everything else from it — the formatted countdown text, the progress bar's fill percentage, and which urgency band applies. There's no separate state to keep in sync; moving the deadline is the only thing any control needs to do.

**Three bands, one classify function**

\`classify()\` turns elapsed-time percentage into a band name: green below 50% elapsed, amber from 50-80%, red above 80%, and overdue once \`remainingMs\` crosses zero. Because the bands are computed from a continuous percentage rather than hardcoded time thresholds, the same logic scales correctly whether the SLA window is 30 minutes or 4 hours — swap \`TOTAL_MS\` and the color transitions still land at the right relative points.

**Overdue is a different state, not just "more red"**

Crossing zero doesn't just turn the badge a darker shade of red — \`formatDuration()\` keeps formatting negative durations with a leading minus sign, so the badge visibly counts *up* past the deadline (\`-03:12\`, \`-03:13\`...), and a distinct \`overdue\` CSS class adds a pulsing glow animation that the red band alone doesn't have. That distinction matters operationally: "12 minutes overdue and climbing" is a different signal than "12 minutes left and red," and the UI should never blur the two.

**A progress bar that mirrors the badge**

The horizontal track fill shares the exact same band classes and color logic as the badge text, so a manager scanning a row of these badges can read urgency from the bar's color and length alone, without needing to read the digits. Pair this with an [on-call schedule rotation](/ui-snippets/on-call-schedule-rotation/) to show who owns the response, or a [status dashboard](/ui-snippets/status-dashboard/) for a fleet of tickets at once.

**Customizing it**

Change \`TOTAL_MS\` per priority tier (P1 vs P3 have very different SLA windows), wire the deadline to a real ticket-creation timestamp plus an SLA policy lookup, or add a browser notification when a badge crosses into the red band.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A green "On track" badge counts down from 25 minutes.` },
      { title: 'Watch it tick', text: `The badge, band label, and progress bar update every second.` },
      { title: 'Click "Jump to amber band"', text: `Sets the deadline so the badge lands at 70% elapsed.` },
      { title: 'Click "Simulate overdue"', text: `The badge crosses zero and counts up in negative time.` },
      { title: 'Observe the overdue pulse', text: `A distinct animated style marks a breached SLA.` },
      { title: 'Click "Reset"', text: `Returns to a fresh 25-minutes-remaining state.` },
    ] },
    features: [
      { title: 'Single deadline drives all state', text: `No duplicated timers or state to keep in sync.` },
      { title: 'Percentage-based band logic', text: `classify() scales correctly to any SLA window length.` },
      { title: 'Three urgency bands', text: `Green, amber, and red thresholds at 50% and 80% elapsed.` },
      { title: 'Distinct overdue state', text: `A pulsing style, not just "more red," once the deadline passes.` },
      { title: 'Negative-time countdown', text: `formatDuration() keeps counting up past zero with a minus sign.` },
      { title: 'Matching progress bar', text: `The track fill mirrors the badge's band color and percentage.` },
      { title: 'Tabular-nums formatting', text: `Digits don't jitter in width as the countdown ticks.` },
      { title: 'Simulation controls', text: `Buttons jump straight to amber or overdue for demoing states.` },
    ],
    useCases: [
      { title: 'Support ticket queues', text: `Show response-time urgency at a glance per ticket.` },
      { title: 'Incident management tools', text: `Pair with an [on-call schedule rotation](/ui-snippets/on-call-schedule-rotation/).` },
      { title: 'SLA compliance dashboards', text: `Combine with a [status dashboard](/ui-snippets/status-dashboard/) for a fleet view.` },
      { title: 'Customer success platforms', text: `Track first-response deadlines across accounts.` },
      { title: 'DevOps alerting UIs', text: `Show time-to-acknowledge for a triggered alert.` },
      { title: 'Internal helpdesk tools', text: `Give agents a live sense of which tickets need attention now.` },
    ],
    faqs: [
      { q: "How does the badge decide which color band to show?", a: `classify() computes what percentage of the total SLA window has elapsed (1 minus the fraction of time remaining) and compares it against two thresholds: 50% elapsed moves it to amber, 80% elapsed moves it to red, and crossing the deadline entirely (zero or negative time remaining) moves it to a distinct overdue state. Because this is percentage-based rather than fixed time thresholds, the same logic works correctly for any SLA window length.` },
      { q: "What happens once a ticket passes its SLA deadline?", a: `The badge doesn't just turn a darker red — it switches to a dedicated overdue state with its own pulsing glow animation, and the countdown timer itself keeps running past zero, showing the elapsed overdue time with a leading minus sign (e.g. -03:12) rather than freezing at 00:00 or disappearing. That distinction matters because "overdue and still climbing" is a meaningfully different signal from merely "critical."` },
      { q: "Why does the progress bar matter alongside the countdown text?", a: `The bar uses the exact same band classification and color logic as the badge, filling from 0% to 100% as the SLA window elapses. That lets someone scanning a list of many tickets read relative urgency from bar length and color alone, without needing to parse each countdown's exact digits — useful for a dashboard showing dozens of tickets at once.` },
      { q: "How would I wire this to a real ticket's actual deadline?", a: `Replace the deadline variable with a real timestamp computed from the ticket's creation time plus its SLA policy duration (e.g. createdAt + priorityToSlaMs[ticket.priority]), and set TOTAL_MS to that same policy duration so the band percentages remain meaningful. The render loop, band classification, and formatting logic all work unchanged as long as deadline and TOTAL_MS reflect the real values.` },
      { q: "How do I use this in React, Vue, or Angular?", a: `Store the deadline and TOTAL_MS as props or component state, and run the render() calculation inside a setInterval started in a mount effect, updating a small piece of local state (remainingMs and band) each tick rather than touching the DOM directly. Clear the interval in your cleanup function so it doesn't keep running after the component unmounts, and derive the badge's CSS classes from the current band value.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the urgency bands are computed from an elapsed-time percentage rather than fixed minute thresholds, and how that choice makes the same classify() function correctly handle a 30-minute P1 SLA and a 4-hour P3 SLA without any code changes. It's a good prompt for reasoning about the overdue state specifically — ask why formatDuration() is written to keep formatting negative durations rather than clamping at zero, and what real operational difference that distinction communicates to a support agent. For extensions, ask it to add a browser Notification (check this library's notification-permission-prompt snippet for the pattern) that fires the moment a badge crosses into the red band, a compact variant for showing many badges in a table row, or a tooltip breaking down exactly when the ticket was created and when its SLA target falls. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "SLA Countdown Badge" in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A badge showing a live countdown timer (formatted as MM:SS or H:MM:SS) to a fixed deadline timestamp, alongside a band label (e.g. "On track" / "At risk" / "Critical" / "Overdue — breach") and a horizontal progress bar that fills as the SLA window elapses.
- Drive the entire widget from a single deadline timestamp and a total SLA window duration constant. On a recurring one-second interval, compute the remaining milliseconds (deadline minus current time) and derive the countdown text, the progress bar's fill percentage, and the current urgency band from that single value — do not maintain separate state for the timer, the bar, and the band label that could drift out of sync.
- Classify the urgency band by the percentage of the SLA window that has elapsed, not by fixed time thresholds: green below roughly 50% elapsed, amber from 50% to 80% elapsed, red above 80% elapsed, and a distinct "overdue" band once remaining time reaches zero or goes negative — with color/style transitions on the badge and the progress bar matching each band.
- CRITICAL: once the deadline passes, the badge must NOT freeze at zero or simply stay a static red — it should switch to a visually distinct overdue style (e.g. a pulsing glow animation) and the countdown must keep running into negative time, displaying the overdue duration with a leading minus sign so it's clear the ticket is a specific amount of time past its deadline and still counting.
- Include a couple of demo/simulation buttons that jump the deadline to specific states (e.g. "jump to amber band," "simulate overdue") purely by adjusting the deadline value, so all the resulting visual changes flow through the same single render function used by the live countdown.`,
    },
  },
};

export default slaCountdownBadge;
