const streakTracker = {
  id: 'streak-tracker',
  title: 'Streak Tracker',
  lastmod: '2026-06-17',
  category: 'dashboards',
  html: `<div class="st-card">
  <div class="st-hero">
    <div class="st-flame" id="stFlame">🔥</div>
    <div class="st-count"><span id="stStreak">12</span> day streak</div>
    <div class="st-sub">Keep it going — check in every day</div>
  </div>

  <div class="st-week">
    <div class="st-day done"><span class="st-dot"></span><em>M</em></div>
    <div class="st-day done"><span class="st-dot"></span><em>T</em></div>
    <div class="st-day done"><span class="st-dot"></span><em>W</em></div>
    <div class="st-day today"><span class="st-dot"></span><em>T</em></div>
    <div class="st-day"><span class="st-dot"></span><em>F</em></div>
    <div class="st-day"><span class="st-dot"></span><em>S</em></div>
    <div class="st-day"><span class="st-dot"></span><em>S</em></div>
  </div>

  <div class="st-stats">
    <div class="st-stat"><span id="stBest">21</span><small>Best streak</small></div>
    <div class="st-stat"><span id="stTotal">148</span><small>Total days</small></div>
  </div>

  <button class="st-btn" id="stBtn" onclick="checkIn()">Check in today</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.st-card{background:linear-gradient(165deg,#1e293b,#0f172a);border:1px solid #334155;border-radius:20px;padding:26px;width:100%;max-width:330px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.4)}

.st-hero{margin-bottom:22px}
.st-flame{font-size:56px;line-height:1;filter:drop-shadow(0 6px 14px rgba(249,115,22,.5))}
.st-flame.pop{animation:st-pop .5s cubic-bezier(.2,1.6,.4,1)}
@keyframes st-pop{0%{transform:scale(1)}40%{transform:scale(1.35) rotate(-6deg)}100%{transform:scale(1)}}
.st-count{font-size:24px;font-weight:800;color:#fff;margin-top:8px}
.st-count span{color:#fb923c}
.st-sub{font-size:12px;color:#94a3b8;margin-top:4px}

.st-week{display:flex;justify-content:space-between;gap:6px;margin-bottom:22px}
.st-day{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px}
.st-dot{width:30px;height:30px;border-radius:50%;background:rgba(148,163,184,.15);border:2px solid transparent;display:flex;align-items:center;justify-content:center;transition:all .2s}
.st-day em{font-size:11px;font-weight:700;color:#64748b;font-style:normal}
.st-day.done .st-dot{background:linear-gradient(160deg,#fb923c,#ea580c);box-shadow:0 4px 10px rgba(234,88,12,.4)}
.st-day.done .st-dot::after{content:'🔥';font-size:14px}
.st-day.done em{color:#fb923c}
.st-day.today .st-dot{border-color:#fb923c;background:rgba(251,146,60,.12);animation:st-pulse 1.8s ease-out infinite}
@keyframes st-pulse{0%{box-shadow:0 0 0 0 rgba(251,146,60,.5)}70%{box-shadow:0 0 0 9px rgba(251,146,60,0)}100%{box-shadow:0 0 0 0 rgba(251,146,60,0)}}
.st-day.today em{color:#fbbf24}

.st-stats{display:flex;gap:12px;margin-bottom:20px}
.st-stat{flex:1;background:rgba(148,163,184,.08);border:1px solid rgba(148,163,184,.12);border-radius:12px;padding:12px}
.st-stat span{display:block;font-size:20px;font-weight:800;color:#f1f5f9;font-variant-numeric:tabular-nums}
.st-stat small{font-size:11px;color:#94a3b8;font-weight:600}

.st-btn{width:100%;padding:13px;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;border:none;border-radius:13px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;transition:filter .15s,transform .1s}
.st-btn:hover:not(:disabled){filter:brightness(1.08)}
.st-btn:active:not(:disabled){transform:scale(.98)}
.st-btn:disabled{background:rgba(148,163,184,.2);color:#94a3b8;cursor:default}`,

  js: `var streak = 12, best = 21, total = 148, checked = false;

function checkIn() {
  if (checked) return;
  checked = true;

  var today = document.querySelector('.st-day.today');
  if (today) { today.classList.remove('today'); today.classList.add('done'); }

  streak++; total++;
  document.getElementById('stStreak').textContent = streak;
  document.getElementById('stTotal').textContent = total;
  if (streak > best) { best = streak; document.getElementById('stBest').textContent = best; }

  var flame = document.getElementById('stFlame');
  flame.classList.remove('pop');
  void flame.offsetWidth;
  flame.classList.add('pop');

  var btn = document.getElementById('stBtn');
  btn.disabled = true;
  btn.textContent = 'Checked in today ✓';
}`,

  seo: {
    title: 'Streak Tracker — Habit Streak HTML CSS JS Snippet',
    description: `Gamified streak tracker with an animated flame counter, a 7-day check-in row, best/total stats & a daily check-in. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Streak Tracker — Flame Counter, 7-Day Check-In Row & One-Tap Daily Check-In`,
      description: `Streaks are one of the most powerful engagement mechanics in apps — Duolingo, Snapchat, and fitness trackers all use them because the fear of breaking a run keeps people coming back daily. A streak tracker shows the current run, a visual week of check-ins, and a single action to extend it. This snippet implements that in plain HTML, CSS, and vanilla JavaScript: an animated flame counter, a seven-day dot row with completed/today/upcoming states, best and total stats, and a check-in button that extends the streak with a satisfying flame pop.

**The week row: three day states**

The seven dots represent the current week. Completed days (\`.done\`) show a filled orange gradient with a tiny flame and a coloured label; today (\`.today\`) is an outlined dot with a continuous pulsing ring drawing attention to the action; upcoming days stay muted. This instantly communicates "you've done Mon–Wed, today is Thursday, here's the rest of the week" — the at-a-glance progress that makes streaks motivating.

**One-tap check-in**

\`checkIn\` is guarded so it only fires once: it converts today's dot from the pulsing \`today\` state to a completed \`done\` flame, increments the streak and total counters, updates the best streak if the new run exceeds it, and disables the button to "Checked in today ✓". A \`checked\` flag prevents double check-ins, mirroring how real streak apps lock the action until the next day.

**Flame celebration**

The moment you check in, the big flame plays a spring \`st-pop\` keyframe — scaling up with a slight rotation and settling back via a \`cubic-bezier\` overshoot. It is re-triggered with the remove-class / force-reflow / add-class pattern so it fires on every check-in. That little reward is the dopamine hit that reinforces the habit. The today dot's pulse is a pure-CSS \`box-shadow\` animation, so it costs nothing and never drifts.

**Stats that frame the streak**

Best streak and total days sit below the week, giving context — a personal record to beat and a sense of long-term commitment. The current streak is the hero number beside the flame, in the accent colour.

Everything is driven by a few variables (\`streak\`, \`best\`, \`total\`, \`checked\`), so wiring it to real data is just seeding those from your backend and persisting the check-in. In production you would also reset the streak to zero if a day was missed (compare last-check-in date to today). Pair this with a [profile completion meter](/ui-snippets/profile-completion/) for onboarding, an [activity heatmap](/ui-snippets/activity-heatmap/) for long-term history, or a [stats card](/ui-snippets/stats-card/) for other metrics.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A streak card appears with a flame, "12 day streak", a week row (Mon–Wed completed, Thursday pulsing), best/total stats, and a check-in button.` },
      { title: 'Read the week', text: `Completed days show filled flame dots, today pulses with an outlined ring, and upcoming days stay muted.` },
      { title: 'Check in', text: `Click "Check in today" — today's dot fills with a flame, the streak ticks to 13, total updates, and the big flame pops.` },
      { title: 'See the button lock', text: `The button disables to "Checked in today ✓" so you cannot check in twice in one day.` },
      { title: 'Watch best update', text: `If your new streak beats the record, the "Best streak" stat updates to match.` },
      { title: 'Wire real data', text: `Seed \`streak\`, \`best\`, and \`total\` from your backend and persist the check-in date; reset the streak if a day is missed.` },
    ] },
    features: [
      { title: 'Three-state week row', text: `Dots render as completed (flame gradient), today (pulsing outline), or upcoming (muted) — instant at-a-glance progress.` },
      { title: 'Guarded one-tap check-in', text: `A \`checked\` flag makes \`checkIn\` fire once, converting today to done and locking the button, like real streak apps.` },
      { title: 'Spring flame pop', text: `Checking in replays a \`cubic-bezier\` scale+rotate keyframe on the flame via a forced-reflow restart — the reward moment.` },
      { title: 'Pure-CSS today pulse', text: `The current day's attention ring is a looping \`box-shadow\` keyframe — zero JS cost and perfectly steady.` },
      { title: 'Live streak + total', text: `Check-in increments the streak and total counters together and updates the hero number beside the flame.` },
      { title: 'Best-streak record', text: `The best stat updates automatically whenever the current streak surpasses it — a target to beat.` },
      { title: 'Variable-driven state', text: `\`streak\`, \`best\`, \`total\`, and \`checked\` hold all state, so seeding from a backend is a few assignments.` },
      { title: 'Premium dark styling', text: `A gradient card with a glowing flame and orange accents gives the streak the rewarding, game-like feel it needs.` },
    ],
    useCases: [
      { title: 'Habit and learning apps', text: `Daily check-ins for language, fitness, or study apps. Pair with a [profile completion meter](/ui-snippets/profile-completion/) during onboarding.` },
      { title: 'Engagement and retention', text: `Reward daily logins or actions in any product; combine with an [activity heatmap](/ui-snippets/activity-heatmap/) for the full history.` },
      { title: 'Fitness and wellness', text: `Workout, meditation, or water-intake streaks where the flame and week row drive consistency.` },
      { title: 'Productivity and journaling', text: `Daily writing, todo, or focus-session streaks; sits well in a [dashboard layout](/ui-snippets/dashboard-layout/).` },
      { title: 'Gamified communities', text: `Forum or community daily-visit streaks alongside a [leaderboard table](/ui-snippets/leaderboard-table/) for competition.` },
      { title: 'Finance and savings', text: `No-spend or daily-saving streaks, reframing a habit goal with the same motivating mechanic.` },
    ],
    faqs: [
      { q: 'How do I persist the streak and reset it on a missed day?', a: `Store the streak, best, total, and the last check-in date (server-side or in \`localStorage\`). On load, compare today to the last check-in: if it is the next day, allow check-in; if more than one day has passed, reset the streak to 0 before rendering. Save the new values after each check-in. This date logic is what makes a streak real rather than a counter.` },
      { q: 'How do I show a longer history than one week?', a: `Render more dots (a 30-day grid) or switch to an [activity heatmap](/ui-snippets/activity-heatmap/) for a calendar view. Keep the seven-day row as the focused "this week" widget and link to the fuller history — most apps show both: a compact current week and an expandable full calendar.` },
      { q: 'How do I prevent check-ins from another timezone gaming the streak?', a: `Always validate check-ins server-side against the user's stored timezone (or UTC day boundaries), not the client clock, since device time can be changed. The client UI is optimistic, but the authoritative streak count and the "already checked in today" rule must be enforced on the server.` },
      { q: 'Is the streak tracker accessible?', a: `Make the check-in a real \`<button>\` (it is) so it is keyboard-operable, and announce the new streak via an \`aria-live="polite"\` region after check-in. Give each day dot an \`aria-label\` ("Monday: completed", "Thursday: today") since the state is conveyed by colour and a flame glyph; ensure the disabled state is communicated, not just styled.` },
      { q: 'How do I use this streak tracker in React, Vue, or Angular?', a: `In React, hold \`streak\`, \`best\`, \`total\`, and \`checkedToday\` in \`useState\`, render the week from a days array, and trigger the flame pop by toggling a class/key on check-in. In Vue, use \`ref\`s and \`:class\` bindings with a method. In Angular, track state on the component and bind \`[class.done]\`/\`[disabled]\`. The pop/pulse keyframes port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the celebration-animation restart trick by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why checkIn removes the pop class, reads flame.offsetWidth, then re-adds it, and why the today dot's pulsing ring is implemented as a looping box-shadow keyframe instead of a JavaScript-driven animation. The same assistant can help optimize it — for instance whether the checked boolean guard is sufficient to prevent double check-ins across page reloads, or whether the best-streak comparison should be computed once from stored history rather than incrementally. It's also useful for extending the tracker: ask it to reset the streak to zero when a day is missed by comparing stored dates, expand the seven-dot week into a full 30-day activity grid, or add a milestone celebration (confetti, a badge) at streak values like 7, 30, or 100. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a gamified "daily streak tracker" card in plain HTML, CSS, and JavaScript using a guarded state variable and a CSS animation-restart trick — no animation library, no framework.

Requirements:
- A hero section showing a large flame emoji/icon and the current streak count in days, with the flame having a permanent drop-shadow glow.
- A row of exactly seven day indicators representing the current week, each supporting three distinct visual states via CSS classes only: a completed state (filled gradient circle with a small flame glyph and a colored day-letter label), a "today" state (an outlined circle with a continuously looping pulsing ring built from a box-shadow keyframe animation, not a JavaScript-driven loop), and a default muted upcoming state.
- Two stat tiles below the week row showing the best-ever streak and the total lifetime check-in count.
- A single check-in function, guarded by a boolean flag so it can only execute once per session/day, that: converts today's day indicator from the "today" pulsing state to the "completed" filled state, increments both the current streak and the total count, updates the best-streak stat only if the new streak value exceeds the previous best, and disables the check-in button while changing its label to confirm the action was recorded.
- On every successful check-in, replay a spring-style "pop" keyframe animation (scale up with a slight rotation, then settle back to normal) on the hero flame element, using the standard remove-class, force-reflow via reading offsetWidth, then re-add-class technique so the animation restarts reliably even if it was already played before.
- Keep all mutable numbers (current streak, best streak, total days, and the checked-today flag) in a small number of plain variables so wiring the widget to a real backend is a matter of seeding those variables and persisting the check-in date.`,
    },
  },
};

export default streakTracker;
