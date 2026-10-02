const workoutIntervalTimer = {
  id: 'workout-interval-timer',
  title: 'Workout Interval Timer',
  lastmod: '2026-08-22',
  category: 'tools',
  cdnUrls: [],
  html: `<div class="wint-card">
  <div class="wint-config" id="wintConfig">
    <div class="wint-field">
      <label>Work (sec)</label>
      <input type="number" id="wintWork" value="20" min="5" max="180">
    </div>
    <div class="wint-field">
      <label>Rest (sec)</label>
      <input type="number" id="wintRest" value="10" min="5" max="120">
    </div>
    <div class="wint-field">
      <label>Rounds</label>
      <input type="number" id="wintRounds" value="8" min="1" max="30">
    </div>
  </div>

  <div class="wint-ring-wrap" id="wintRingWrap">
    <svg class="wint-ring" viewBox="0 0 200 200">
      <circle class="wint-ring-track" cx="100" cy="100" r="86"></circle>
      <circle class="wint-ring-fill" id="wintRingFill" cx="100" cy="100" r="86"></circle>
    </svg>
    <div class="wint-center">
      <span class="wint-phase" id="wintPhase">READY</span>
      <span class="wint-clock" id="wintClock">20</span>
      <span class="wint-round" id="wintRound">Round 1 of 8</span>
    </div>
  </div>

  <div class="wint-controls">
    <button type="button" class="wint-btn primary" id="wintStart">Start</button>
    <button type="button" class="wint-btn" id="wintReset">Reset</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a12;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.wint-card{background:#131320;border:1px solid #262640;border-radius:20px;padding:24px;width:100%;max-width:360px;box-shadow:0 26px 65px rgba(0,0,0,.55);text-align:center}

.wint-config{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:22px}
.wint-field label{display:block;font-size:9.5px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.04em;margin-bottom:5px}
.wint-field input{width:100%;background:#1a1a2c;border:1px solid #2a2a44;border-radius:8px;color:#e5e7eb;font-size:14px;font-weight:700;text-align:center;padding:7px 4px;font-family:inherit}
.wint-field input:focus{outline:none;border-color:#818cf8}

.wint-ring-wrap{position:relative;width:220px;height:220px;margin:0 auto}
.wint-ring{width:220px;height:220px;transform:rotate(-90deg)}
.wint-ring-track{fill:none;stroke:#1c1c30;stroke-width:10}
.wint-ring-fill{fill:none;stroke:#f97316;stroke-width:10;stroke-linecap:round;stroke-dasharray:540;stroke-dashoffset:0;transition:stroke-dashoffset 1s linear,stroke .3s}
.wint-ring-fill.rest{stroke:#38bdf8}
.wint-ring-fill.done{stroke:#34d399}

.wint-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
.wint-phase{font-size:12px;font-weight:800;letter-spacing:.1em;color:#f97316;transition:transform .25s,color .3s}
.wint-phase.rest{color:#38bdf8}
.wint-phase.pulse{transform:scale(1.18)}
.wint-clock{font-size:52px;font-weight:800;color:#f5f5f7;font-variant-numeric:tabular-nums;line-height:1}
.wint-round{font-size:11.5px;color:#6b7280;margin-top:4px}

.wint-controls{display:flex;gap:10px;margin-top:22px}
.wint-btn{flex:1;background:#1c1c30;border:1px solid #2a2a44;color:#cbd2e0;font-size:13px;font-weight:700;padding:11px;border-radius:11px;cursor:pointer;transition:background .12s}
.wint-btn:hover{background:#252540}
.wint-btn.primary{background:#f97316;border-color:#f97316;color:#1a0e02}
.wint-btn.primary:hover{background:#fb923c}
.wint-btn.primary.running{background:#ef4444;border-color:#ef4444;color:#2b0505}`,

  js: `var CIRC = 540.35;
var state = {
  running: false,
  phase: 'ready',
  round: 1,
  timeLeft: 0,
  timerId: null,
};

var workInput = document.getElementById('wintWork');
var restInput = document.getElementById('wintRest');
var roundsInput = document.getElementById('wintRounds');
var ringFill = document.getElementById('wintRingFill');
var phaseEl = document.getElementById('wintPhase');
var clockEl = document.getElementById('wintClock');
var roundEl = document.getElementById('wintRound');
var startBtn = document.getElementById('wintStart');

function cfg() {
  return {
    work: parseInt(workInput.value, 10) || 20,
    rest: parseInt(restInput.value, 10) || 10,
    rounds: parseInt(roundsInput.value, 10) || 8,
  };
}

function pulse() {
  phaseEl.classList.add('pulse');
  setTimeout(function () { phaseEl.classList.remove('pulse'); }, 250);
}

function paint() {
  var c = cfg();
  var duration = state.phase === 'work' ? c.work : c.rest;
  var pct = duration > 0 ? state.timeLeft / duration : 0;
  ringFill.style.strokeDashoffset = (CIRC * (1 - pct)).toFixed(2);
  ringFill.classList.toggle('rest', state.phase === 'rest');
  ringFill.classList.toggle('done', state.phase === 'done');
  phaseEl.classList.toggle('rest', state.phase === 'rest');
  phaseEl.textContent = state.phase === 'work' ? 'WORK' : state.phase === 'rest' ? 'REST' : state.phase === 'done' ? 'DONE' : 'READY';
  clockEl.textContent = state.phase === 'done' ? '\\u2713' : state.timeLeft;
  roundEl.textContent = state.phase === 'done' ? 'Workout complete' : 'Round ' + state.round + ' of ' + c.rounds;
}

function tick() {
  var c = cfg();
  state.timeLeft -= 1;
  if (state.timeLeft < 0) {
    if (state.phase === 'work') {
      state.phase = 'rest';
      state.timeLeft = c.rest - 1;
      pulse();
    } else {
      if (state.round >= c.rounds) {
        finish();
        return;
      }
      state.round += 1;
      state.phase = 'work';
      state.timeLeft = c.work - 1;
      pulse();
    }
  }
  paint();
}

function finish() {
  clearInterval(state.timerId);
  state.running = false;
  state.phase = 'done';
  startBtn.textContent = 'Start';
  startBtn.classList.remove('running');
  toggleConfig(false);
  paint();
}

function toggleConfig(enabled) {
  [workInput, restInput, roundsInput].forEach(function (el) { el.disabled = !enabled; });
}

startBtn.addEventListener('click', function () {
  if (state.running) {
    clearInterval(state.timerId);
    state.running = false;
    startBtn.textContent = 'Resume';
    startBtn.classList.remove('running');
    return;
  }
  var c = cfg();
  if (state.phase === 'ready' || state.phase === 'done') {
    state.round = 1;
    state.phase = 'work';
    state.timeLeft = c.work;
    toggleConfig(false);
  }
  state.running = true;
  startBtn.textContent = 'Pause';
  startBtn.classList.add('running');
  paint();
  state.timerId = setInterval(tick, 1000);
});

document.getElementById('wintReset').addEventListener('click', function () {
  clearInterval(state.timerId);
  state.running = false;
  state.phase = 'ready';
  state.round = 1;
  state.timeLeft = cfg().work;
  startBtn.textContent = 'Start';
  startBtn.classList.remove('running');
  toggleConfig(true);
  ringFill.style.strokeDashoffset = '0';
  ringFill.classList.remove('rest', 'done');
  phaseEl.classList.remove('rest');
  phaseEl.textContent = 'READY';
  clockEl.textContent = cfg().work;
  roundEl.textContent = 'Round 1 of ' + cfg().rounds;
});

[workInput, roundsInput].forEach(function (el) {
  el.addEventListener('input', function () {
    if (state.phase === 'ready') {
      clockEl.textContent = cfg().work;
      roundEl.textContent = 'Round 1 of ' + cfg().rounds;
    }
  });
});`,

  seo: {
    title: 'Workout Interval Timer — Free HTML CSS JS Snippet',
    description: `A Tabata-style work/rest interval timer with a configurable round count, a color-coded progress ring, and a scale-pulse cue at every phase change. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Workout Interval Timer — Configurable Work/Rest Rounds With a Phase-Coded Ring',
      description: `Interval training lives or dies on the timer: work and rest phases need to be unmistakable at a glance, transitions need a cue you can catch out of the corner of your eye mid-exercise, and the round count needs to be right there so you know how much is left. This snippet builds a Tabata-style interval timer in plain HTML, CSS, and vanilla JavaScript, with configurable work duration, rest duration, and round count. Pair it with a [water intake tracker](/ui-snippets/water-intake-tracker/) or [sleep cycle chart](/ui-snippets/sleep-cycle-chart/) in a broader fitness dashboard, or compare it with [pomodoro timer](/ui-snippets/pomodoro-timer/) and [countdown timer](/ui-snippets/countdown-timer/) for related countdown patterns.

**A small state machine, not scattered flags**

The timer's entire behavior lives in one \`state\` object — \`phase\` (ready/work/rest/done), the current \`round\`, and \`timeLeft\` — updated by a single \`tick()\` function that runs every second. When \`timeLeft\` runs out, \`tick()\` decides the next phase: work rolls into rest, rest either advances to the next round's work phase or, on the final round, calls \`finish()\`. Centralizing this logic in one function is what makes the timer's behavior predictable and easy to extend (adding a warm-up phase, for instance, is one more branch).

**A ring that changes color with the phase**

The same SVG stroke-dashoffset technique used in a progress ring drives the countdown visually, but here the ring's *color* changes with the phase — orange during work, blue during rest, green when the workout completes — so you can tell which phase you're in from peripheral vision without reading the phase label. The ring resets to full and counts back down to empty on every new phase, rather than continuing to drain across the whole workout.

**A pulse cue at every transition**

At the exact moment a phase changes — work to rest, rest to the next round, or completion — the phase label briefly scales up and back down via a CSS class toggle (\`pulse()\`, removed after 250ms with \`setTimeout\`). This is the audio-free equivalent of a haptic buzz: a sharp, brief visual jolt exactly when your attention should shift, which matters far more mid-workout than a color that merely changes gradually.

**Pause and resume, not just start**

Clicking the primary button while running pauses the countdown in place (clearing the interval without resetting \`timeLeft\`) and relabels itself "Resume"; clicking again picks up exactly where it left off. The config inputs (work/rest/round duration) lock as soon as a workout starts, preventing an accidental mid-workout edit from desyncing the ring's percentage math, and unlock again on Reset.

**Extending it**

Add a short countdown "warm-up" phase before round 1, a distinct color for the final round to build urgency, or swap the visual pulse for the Web Vibration API's \`navigator.vibrate()\` on supporting mobile browsers for a real haptic cue alongside the visual one.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Set work, rest, and rounds', text: `Adjust the three number inputs before starting — they lock once the timer is running.` },
      { title: 'Click Start', text: `The ring fills orange and counts down the first work interval.` },
      { title: 'Watch the phase change', text: `At zero, the label pulses, the ring turns blue, and rest begins counting down.` },
      { title: 'Follow the rounds', text: `Work and rest alternate automatically until the configured round count is reached.` },
      { title: 'Pause and resume', text: `Click the primary button mid-countdown to pause in place; click again to resume.` },
      { title: 'Finish or reset', text: `The ring turns green with a checkmark on completion, or click Reset any time to start over.` },
    ] },
    features: [
      { title: 'Single state machine', text: `One state object and one tick() function drive every phase transition predictably.` },
      { title: 'Phase-colored ring', text: `The progress ring changes color by phase — orange work, blue rest, green done.` },
      { title: 'Scale-pulse transition cue', text: `A brief scale animation on the phase label marks every transition without audio.` },
      { title: 'Pause and resume', text: `Pausing preserves the exact time remaining; resuming continues from that point.` },
      { title: 'Locked config while running', text: `Work/rest/round inputs disable during a run so the ring math can never desync.` },
      { title: 'Configurable rounds', text: `Work duration, rest duration, and round count are all plain number inputs.` },
      { title: 'Per-phase ring reset', text: `The ring fills and drains fresh each phase instead of draining across the whole workout.` },
      { title: 'Clear completion state', text: `A checkmark and "Workout complete" message replace the countdown when finished.` },
    ],
    useCases: [
      { title: 'HIIT and Tabata workouts', text: 'Run classic 20 seconds on and 10 seconds off intervals, with a configurable round count and the round shown prominently.' },
      { title: 'Circuit training apps', text: 'Adapt the phases to cue exercise stations, with orange work and blue rest colours that are unmistakable at a glance.' },
      { title: 'Fitness dashboard widgets', text: 'Combine with a [water intake tracker](/ui-snippets/water-intake-tracker/) and a [sleep cycle chart](/ui-snippets/sleep-cycle-chart/) for a complete health screen.' },
      { title: 'Work-sprint timers', text: 'Reuse the work and rest ring for focus sprints next to a [Pomodoro timer](/ui-snippets/pomodoro-timer/), or time laps with a [stopwatch](/ui-snippets/stopwatch/).' },
      { title: 'Countdown state machine reference', text: 'Study one state object and one `tick()` function driving every phase, with a brief scale pulse cueing each transition.' },
    ],
    faqs: [
      { q: 'How does the timer decide when to switch phases?', a: `tick() runs every second, decrementing timeLeft. When timeLeft drops below zero, a single block of logic decides the next phase: if the current phase was "work," it switches to "rest" with the configured rest duration; if it was "rest," it either advances to the next round's work phase or, if the last round just finished resting, calls finish(). This keeps all transition logic in one place instead of scattered across separate timers.` },
      { q: 'Why does the ring change color instead of just the text label?', a: `During an actual workout you're rarely looking directly at the timer — you catch it in peripheral vision between reps. A phase-appropriate ring color (orange for work, blue for rest, green for done) is readable at a glance without focusing on or reading the text label, which is the whole point of a color-coded cue: it works even when you can't spare full attention.` },
      { q: 'What happens if I pause mid-countdown?', a: `Pausing calls clearInterval() on the running timer but does not touch timeLeft, phase, or round — so the countdown is frozen exactly where it was. The button relabels itself "Resume," and clicking it again starts a new setInterval that continues decrementing from the preserved timeLeft, rather than restarting the current phase from its full duration.` },
      { q: 'Why do the config inputs disable while the timer is running?', a: `The ring's fill percentage is calculated as timeLeft divided by the current phase's configured duration (work or rest). If you changed the work duration mid-countdown, that denominator would suddenly not match the timeLeft value that was already counting down, producing a ring that jumps or shows an inaccurate percentage. Locking the inputs during a run prevents that mismatch; Reset re-enables them.` },
      { q: 'How would I add a real haptic vibration cue?', a: `Inside pulse() (or wherever a phase transition is triggered), call navigator.vibrate(200) — or a short pattern array like [100, 50, 100] — guarded by a check for navigator.vibrate existing, since the Vibration API is only supported on some mobile browsers and requires a user gesture in the page's history. Keep the visual scale-pulse as the primary cue since vibration support and permissions are inconsistent across browsers.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to design the phase state machine by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how one state object and a single tick() function drive every work/rest/round transition, and why the ring's fill percentage is calculated against the current phase's own duration rather than the workout's total elapsed time. The same assistant can help you optimize it — ask whether setInterval(tick, 1000) can drift over a long workout compared to computing elapsed time from Date.now(), and how you'd correct for that drift. It's also useful for extending the timer: ask it to add a short warm-up countdown before round 1, a distinct "final round" visual treatment, an audio beep option, or persistence so a workout resumes correctly if the page is accidentally refreshed mid-session. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a Tabata-style "workout interval timer" in plain HTML, CSS, and JavaScript — no frameworks, no audio, no libraries.

Requirements:
- Provide three configurable number inputs (work duration in seconds, rest duration in seconds, and number of rounds) that are editable before a workout starts and become disabled once the timer is running, so the countdown math can never desync from a mid-run edit.
- Drive the entire timer from one central state object (current phase — ready/work/rest/done, current round number, and time remaining in the current phase) updated by a single per-second tick function that decides all phase transitions in one place: work rolls into rest, rest either advances to the next round's work phase or finishes the workout if the round count is reached.
- Render a large countdown number and an SVG circular progress ring whose fill drains over the course of the CURRENT phase only (resetting to full at the start of every new phase, not draining across the whole workout), and whose stroke color changes distinctly between the work phase and the rest phase (plus a third distinct color/state for workout-complete).
- At the exact moment each phase transition happens (work-to-rest, rest-to-next-round, and completion), trigger a brief, audio-free "pulse" visual cue — e.g. the phase label or ring scaling up and back down quickly — so a transition is noticeable even out of the corner of your eye, without relying on sound.
- Support pausing mid-countdown (freezing the current time-remaining exactly where it is, not resetting the phase) and resuming from that exact paused point, plus a full reset back to the initial ready state that also re-enables the configuration inputs.
- Show the current round out of the total configured rounds at all times, and show a clear, distinct completed state (not just "0" on the clock) once every round is finished.`,
    },
  },
};

export default workoutIntervalTimer;
