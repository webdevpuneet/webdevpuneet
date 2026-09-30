const liveMatchScoreboard = {
  id: 'live-match-scoreboard',
  title: 'Live Match Scoreboard',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="lms-card">
  <div class="lms-status">
    <span class="lms-live-dot"></span>
    <span>LIVE — 2nd Set</span>
  </div>

  <div class="lms-board">
    <div class="lms-team">
      <span class="lms-team-name">Ridgeview Hawks</span>
      <span class="lms-score" id="lmsScoreA">14</span>
    </div>
    <div class="lms-mid">
      <span class="lms-clock" id="lmsClock">18:42</span>
      <span class="lms-sep">SET 2</span>
    </div>
    <div class="lms-team lms-team-b">
      <span class="lms-score" id="lmsScoreB">11</span>
      <span class="lms-team-name">Northfield Otters</span>
    </div>
  </div>

  <div class="lms-sets" id="lmsSets"></div>

  <div class="lms-controls">
    <button type="button" class="lms-btn" id="lmsAddA">+1 Hawks</button>
    <button type="button" class="lms-btn lms-btn-b" id="lmsAddB">+1 Otters</button>
    <button type="button" class="lms-btn lms-btn-ghost" id="lmsAuto">Auto-play</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0f1a;color:#eef1f7;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 16px}

.lms-card{background:#111a2b;border:1px solid #22304a;border-radius:18px;padding:22px;width:100%;max-width:440px}

.lms-status{display:flex;align-items:center;gap:7px;font-size:11.5px;font-weight:800;color:#f87171;letter-spacing:.05em;text-transform:uppercase;margin-bottom:18px}
.lms-live-dot{width:7px;height:7px;border-radius:50%;background:#ef4444;animation:lmsPulse 1.4s ease-in-out infinite}
@keyframes lmsPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}

.lms-board{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:14px;margin-bottom:16px}
.lms-team{display:flex;flex-direction:column;gap:6px}
.lms-team-b{align-items:flex-end;text-align:right}
.lms-team-name{font-size:12.5px;font-weight:700;color:#9aa5bd}
.lms-score{font-size:44px;font-weight:900;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums;transition:transform .18s ease}
.lms-score.lms-flash{animation:lmsFlash .5s ease}
@keyframes lmsFlash{0%{color:#4ade80;transform:scale(1.18)}100%{color:#eef1f7;transform:scale(1)}}

.lms-mid{display:flex;flex-direction:column;align-items:center;gap:4px}
.lms-clock{font-size:15px;font-weight:800;font-variant-numeric:tabular-nums;color:#eef1f7;background:#1a2438;border-radius:8px;padding:5px 10px}
.lms-sep{font-size:9.5px;font-weight:800;color:#5c6a89;letter-spacing:.08em}

.lms-sets{display:flex;justify-content:center;gap:6px;margin-bottom:18px}
.lms-set-pill{font-size:10.5px;font-weight:700;color:#5c6a89;background:#161f33;border:1px solid #22304a;border-radius:999px;padding:4px 9px}
.lms-set-pill.lms-set-a{color:#4ade80;border-color:#245139}
.lms-set-pill.lms-set-b{color:#60a5fa;border-color:#233c66}

.lms-controls{display:flex;gap:8px}
.lms-btn{flex:1;background:#1e3a8a;color:#fff;border:none;border-radius:10px;padding:11px;font-size:12.5px;font-weight:700;cursor:pointer;transition:opacity .15s}
.lms-btn:hover{opacity:.85}
.lms-btn-b{background:#0369a1}
.lms-btn-ghost{background:transparent;border:1px solid #22304a;color:#9aa5bd}
.lms-btn-ghost.lms-active{background:#1a2438;color:#eef1f7;border-color:#3b4a6b}`,

  js: `var scoreA = 14;
var scoreB = 11;
var setsWon = ['A', 'B', 'A']; // completed sets so far, most recent last
var clockSeconds = 18 * 60 + 42;

var scoreAEl = document.getElementById('lmsScoreA');
var scoreBEl = document.getElementById('lmsScoreB');
var clockEl = document.getElementById('lmsClock');
var setsEl = document.getElementById('lmsSets');

function renderSets() {
  setsEl.innerHTML = setsWon.map(function (winner, i) {
    var cls = winner === 'A' ? 'lms-set-a' : 'lms-set-b';
    var label = winner === 'A' ? 'Hawks' : 'Otters';
    return '<span class="lms-set-pill ' + cls + '">Set ' + (i + 1) + ' \\u00b7 ' + label + '</span>';
  }).join('');
}

function renderClock() {
  var m = Math.floor(clockSeconds / 60);
  var s = clockSeconds % 60;
  clockEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
}

function flash(el) {
  el.classList.remove('lms-flash');
  // Force a reflow so the animation restarts even if it fires again quickly.
  void el.offsetWidth;
  el.classList.add('lms-flash');
}

function addPoint(team) {
  if (team === 'A') { scoreA++; scoreAEl.textContent = scoreA; flash(scoreAEl); }
  else { scoreB++; scoreBEl.textContent = scoreB; flash(scoreBEl); }
}

document.getElementById('lmsAddA').addEventListener('click', function () { addPoint('A'); });
document.getElementById('lmsAddB').addEventListener('click', function () { addPoint('B'); });

var autoTimer = null;
var clockTimer = null;
var autoBtn = document.getElementById('lmsAuto');

function startAuto() {
  autoTimer = setInterval(function () {
    addPoint(Math.random() < 0.5 ? 'A' : 'B');
  }, 1800);
  clockTimer = setInterval(function () {
    clockSeconds++;
    renderClock();
  }, 1000);
  autoBtn.textContent = 'Stop auto-play';
  autoBtn.classList.add('lms-active');
}

function stopAuto() {
  clearInterval(autoTimer);
  clearInterval(clockTimer);
  autoBtn.textContent = 'Auto-play';
  autoBtn.classList.remove('lms-active');
}

autoBtn.addEventListener('click', function () {
  if (autoTimer) stopAuto(); else startAuto();
});

renderSets();
renderClock();`,

  seo: {
    title: 'Live Match Scoreboard — Free Sports Scoreboard HTML CSS JS',
    description: `A live sports scoreboard with two teams, a match clock, set history pills, and a flash-highlight animation on score changes. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Live Match Scoreboard — Two Teams, a Clock, and a Flash on Every Score Change',
      description: `A good live scoreboard needs to answer three questions at a glance — who's ahead, how far into the match are we, and did something just happen — without the viewer having to stare and compare numbers. This snippet builds that in plain HTML, CSS, and vanilla JavaScript: two team scores, a running match clock, a row of completed-set history pills, and a genuine flash animation the instant either score changes.

**A flash that restarts even on rapid updates**

The signature detail is \`flash()\`: it removes the \`.lms-flash\` class, forces a synchronous reflow with \`void el.offsetWidth\`, and *then* re-adds the class. That reflow-forcing line matters — without it, if a score updates again while the previous flash animation is still finishing, simply re-adding a class that's already present does nothing, because the browser has no new state change to animate from. Forcing a reflow in between guarantees the flash restarts cleanly every single time, even during a burst of rapid scoring.

**Tabular numbers keep the layout stable**

Both the score and the clock use \`font-variant-numeric: tabular-nums\`, so digits don't shift the surrounding layout as they change width (a "1" next to an "11" would otherwise nudge things around) — small, but it's the difference between a scoreboard that feels solid and one that visibly jitters on every update.

**Two independent timers, cleanly started and stopped**

Auto-play runs two separate \`setInterval\` timers — one incrementing a random team's score every 1.8s, one advancing the match clock every second — started together and both cleared together by \`stopAuto()\`. Keeping them as two separate intervals (rather than one interval doing both jobs) means the scoring cadence and the clock cadence can be tuned independently, which matches how a real match actually behaves: the clock runs continuously while scoring is sporadic.

**Set history as a simple derived row**

\`setsWon\` is just an ordered array of \`'A'\`/\`'B'\` characters, and \`renderSets()\` maps it straight to a row of colored pills — a lightweight way to show match history (who won set 1, set 2, and so on) without a heavier stats table.

**Manual and automatic controls coexist**

The "+1 Hawks" / "+1 Otters" buttons and the auto-play toggle both call the same \`addPoint()\` function, so manual scoring during a live event and a demo/simulated auto-play mode share identical logic — there's no separate code path to keep in sync.

**Customizing it**

Replace the auto-play random scoring with a real WebSocket or polling feed calling \`addPoint()\` on genuine score events, add a period/quarter indicator instead of sets for other sports, or extend \`setsWon\` with actual set scores. Pair it with a [tournament match bracket](/ui-snippets/match-bracket-tree/) for the full event, or a [live vote bar race](/ui-snippets/live-vote-bar-race/) for a different kind of live-updating comparison.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A scoreboard renders mid-match with two team scores, a clock, and set history pills.` },
      { title: 'Click "+1 Hawks" or "+1 Otters"', text: `That team's score increments with a brief green flash-highlight.` },
      { title: 'Click "Auto-play"', text: `Scores update randomly every 1.8s and the clock advances every second.` },
      { title: 'Click "Stop auto-play"', text: `Both timers clear immediately.` },
      { title: 'Score rapidly', text: `Notice the flash animation restarts cleanly even on back-to-back updates.` },
      { title: 'Connect a real feed', text: `Call addPoint('A') or addPoint('B') from your live-scoring WebSocket or API poll.` },
    ] },
    features: [
      { title: 'Restart-safe flash animation', text: `A forced reflow ensures the highlight restarts even on rapid, back-to-back score changes.` },
      { title: 'Tabular-number stability', text: `Scores and the clock never jitter the layout as digit widths change.` },
      { title: 'Independent clock and scoring timers', text: `Two separate intervals let match time and scoring cadence be tuned independently.` },
      { title: 'Live status indicator', text: `A pulsing dot and "LIVE" label signal the match is in progress.` },
      { title: 'Set history pills', text: `A simple derived row shows which team won each completed set.` },
      { title: 'Shared scoring logic', text: `Manual buttons and auto-play both call the same addPoint() function.` },
      { title: 'Clean start/stop toggle', text: `Auto-play cleanly clears both intervals with no leaked timers.` },
      { title: 'Sport-agnostic structure', text: `Swap sets for periods, innings, or quarters with minimal changes.` },
    ],
    useCases: [
      { title: 'Sports league and event sites', text: `A live scoreboard widget for volleyball, tennis, or similar set-based sports.` },
      { title: 'Esports match overlays', text: `Adapt for round-based competitive games with a match clock.` },
      { title: 'School and community league scoring', text: `A simple manual-entry scoreboard for local games.` },
      { title: 'Sports betting and stats dashboards', text: `Pair with a [tournament match bracket](/ui-snippets/match-bracket-tree/) for full-event context.` },
      { title: 'Live event broadcast graphics', text: `A lower-third-style scoreboard driven by a real scoring feed.` },
      { title: 'Learning restart-safe CSS animations', text: `A reference for the forced-reflow flash technique — compare with [confetti button](/ui-snippets/confetti-button/) for other feedback animations.` },
      { icon: 'CODE', title: 'Related: Page Visibility API Indicator', desc: 'See the [Page Visibility API Indicator](/ui-snippets/page-visibility-indicator/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the flash animation force a reflow before restarting?', a: `If a score updates again while the previous flash animation is still playing, simply removing and immediately re-adding the same CSS class does nothing visually, because the browser batches the class changes and never sees the class actually leave and return. Reading el.offsetWidth between the remove and the re-add forces the browser to synchronously recalculate layout at that point, which flushes the class removal before the class is re-added — guaranteeing the animation restarts cleanly every time, even during a fast scoring streak.` },
      { q: 'Why are the clock and scoring driven by two separate intervals?', a: `A real match's clock runs continuously and predictably (once per second) while scoring happens sporadically and at a different rhythm, so using two independent setInterval calls lets each cadence be tuned without affecting the other. It also means the clock keeps ticking accurately even while, in a real integration, score updates might arrive irregularly from a WebSocket rather than on a fixed timer.` },
      { q: 'How do I connect this scoreboard to a real live-scoring feed?', a: `Replace the auto-play interval\\'s random selection with your WebSocket message handler or polling logic, calling addPoint(\\'A\\') or addPoint(\\'B\\') whenever a real point is scored for that team — addPoint() already handles incrementing the score, updating the DOM, and triggering the flash animation, so no other changes are needed. Drive clockSeconds from your feed\\'s authoritative match time in the same way, calling renderClock() after updating it.` },
      { q: 'Why use tabular-nums on the score and clock?', a: `Most fonts render digits at different widths (a "1" is narrower than a "4"), so without tabular-nums a score changing from 9 to 10, or a clock ticking from 19:59 to 20:00, would cause the surrounding layout to visibly shift as the digit count or digit widths change. Tabular-nums forces every digit to the same fixed width, keeping the scoreboard\\'s layout perfectly stable through every update.` },
      { q: 'How do I use this scoreboard in React, Vue, or Angular?', a: `Hold scoreA, scoreB, clockSeconds, and setsWon in component state, and trigger the flash animation with a short-lived state flag toggled on and off (or by keying the score element with a changing key prop in React to force a remount) rather than manually manipulating classList — frameworks generally handle "restart an animation on repeated state changes" via key-based remounting instead of the manual reflow trick this vanilla version uses.` },
    ],
    aiPrompt: {
      paragraph: `Rather than debugging a flash animation that silently fails to restart, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why forcing a reflow with void el.offsetWidth between removing and re-adding the flash class is necessary for the highlight to restart on rapid, consecutive score changes. The same assistant can help optimize it — for example asking whether the clock and scoring intervals should be replaced with a single requestAnimationFrame-based loop for tighter timing accuracy, or how to handle the auto-play timers correctly if the browser tab is backgrounded and setInterval gets throttled. It's also useful for extending the scoreboard: ask it to add a possession/serve indicator, a period or quarter structure instead of sets, or a subtle sound effect on score changes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "live match scoreboard" for a two-team sports match in plain HTML, CSS, and JavaScript with no library.

Requirements:
- Two team score displays and a match clock, all using tabular number formatting so digit width changes never shift the surrounding layout, plus a row of pills showing which team won each previously completed set/period.
- A live status indicator (for example a pulsing animated dot plus a "LIVE" label) always visible while the match is in progress.
- A single function that increments a given team's score, updates its displayed number, and triggers a brief flash-highlight animation on that score element — the flash must be implemented so that it reliably restarts even if the same team scores again while the previous flash animation is still playing, which requires explicitly forcing a synchronous browser reflow between removing and re-adding the animation class rather than simply toggling the class.
- Manual "+1" buttons for each team that call this shared scoring function, plus a separate auto-play toggle that starts two independent timers when activated — one that randomly increments either team's score every couple of seconds, and one that advances the match clock display once per second — both of which must be fully and cleanly stopped (no leaked timers) when auto-play is toggled off.
- The match clock must be formatted as minutes:seconds and increment correctly, including rolling over seconds into minutes.
- The set-history pills must be generated from a simple ordered array of which team won each set, rendered as colored badges distinguishing the two teams.`,
    },
  },
};

export default liveMatchScoreboard;
