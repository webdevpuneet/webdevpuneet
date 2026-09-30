const pomodoroTimer = {
  id: 'pomodoro-timer',
  title: 'Pomodoro Timer',
  category: 'tools',
  html: `<div class="wrap">
  <div class="card">
    <div class="modes">
      <button class="mode-btn active" onclick="setMode(this,'focus')">Focus</button>
      <button class="mode-btn" onclick="setMode(this,'short')">Short Break</button>
      <button class="mode-btn" onclick="setMode(this,'long')">Long Break</button>
    </div>
    <div class="dial">
      <svg class="ring" viewBox="0 0 240 240">
        <circle class="ring-bg" cx="120" cy="120" r="108"/>
        <circle class="ring-fg" id="ring" cx="120" cy="120" r="108"/>
      </svg>
      <div class="dial-center">
        <div class="time" id="time">25:00</div>
        <div class="phase" id="phase">Time to focus</div>
      </div>
    </div>
    <div class="controls">
      <button class="ctrl-btn reset" onclick="reset()" title="Reset">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
      </button>
      <button class="ctrl-btn main" id="startBtn" onclick="toggle()">Start</button>
      <button class="ctrl-btn skip" onclick="skip()" title="Skip">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
      </button>
    </div>
    <div class="stats">
      <div class="stat"><span class="stat-num" id="doneCount">0</span><span class="stat-label">Sessions</span></div>
      <div class="stat"><span class="stat-num" id="roundCount">1<span class="of">/4</span></span><span class="stat-label">Round</span></div>
      <div class="stat"><span class="stat-num" id="focusMin">0</span><span class="stat-label">Focus min</span></div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #1a1625; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; transition: background 0.6s; }
body.focus { background: #2d1b3d; }
body.short { background: #163d2e; }
body.long { background: #15324d; }
.wrap { width: 100%; max-width: 380px; }
.card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 28px; padding: 26px; backdrop-filter: blur(20px); }
.modes { display: flex; gap: 4px; background: rgba(0,0,0,0.2); border-radius: 14px; padding: 4px; margin-bottom: 28px; }
.mode-btn { flex: 1; padding: 10px 4px; border: none; background: none; border-radius: 10px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.2s; white-space: nowrap; }
.mode-btn.active { background: rgba(255,255,255,0.12); color: #fff; }
.dial { position: relative; width: 240px; height: 240px; margin: 0 auto 28px; }
.ring { width: 100%; height: 100%; transform: rotate(-90deg); }
.ring-bg { fill: none; stroke: rgba(255,255,255,0.07); stroke-width: 10; }
.ring-fg { fill: none; stroke: #c084fc; stroke-width: 10; stroke-linecap: round; stroke-dasharray: 678.58; stroke-dashoffset: 0; transition: stroke-dashoffset 1s linear, stroke 0.5s; }
.dial-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.time { font-size: 56px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; letter-spacing: -1px; }
.phase { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 4px; }
.controls { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 26px; }
.ctrl-btn { cursor: pointer; transition: all 0.15s; }
.ctrl-btn.main { background: #fff; color: #2d1b3d; border: none; padding: 14px 44px; border-radius: 16px; font-size: 16px; font-weight: 800; letter-spacing: 0.5px; }
.ctrl-btn.main:hover { transform: scale(1.04); }
.ctrl-btn.main.running { background: rgba(255,255,255,0.15); color: #fff; }
.ctrl-btn.reset, .ctrl-btn.skip { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); display: flex; align-items: center; justify-content: center; }
.ctrl-btn.reset:hover, .ctrl-btn.skip:hover { background: rgba(255,255,255,0.12); color: #fff; }
.stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; }
.stat { display: flex; flex-direction: column; align-items: center; gap: 3px; }
.stat-num { font-size: 22px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; }
.of { font-size: 13px; color: rgba(255,255,255,0.4); }
.stat-label { font-size: 11px; color: rgba(255,255,255,0.4); }`,
  js: `var DURATIONS = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };
var COLORS = { focus: '#c084fc', short: '#4ade80', long: '#60a5fa' };
var PHASES = { focus: 'Time to focus', short: 'Take a short break', long: 'Take a long break' };
var CIRC = 678.58;

var mode = 'focus';
var remaining = DURATIONS.focus;
var running = false;
var timer = null;
var sessions = 0;
var round = 1;
var focusMinutes = 0;

document.body.classList.add('focus');

function render() {
  var m = Math.floor(remaining / 60);
  var s = remaining % 60;
  document.getElementById('time').textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  var pct = remaining / DURATIONS[mode];
  document.getElementById('ring').style.strokeDashoffset = CIRC * (1 - pct);
}

function tick() {
  if (remaining > 0) {
    remaining--;
    if (mode === 'focus' && remaining % 60 === 0) { /* whole minute elapsed handled on complete */ }
    render();
  } else {
    complete();
  }
}

function complete() {
  clearInterval(timer);
  running = false;
  if (mode === 'focus') {
    sessions++;
    focusMinutes += DURATIONS.focus / 60;
    document.getElementById('doneCount').textContent = sessions;
    document.getElementById('focusMin').textContent = focusMinutes;
    var next = (sessions % 4 === 0) ? 'long' : 'short';
    if (sessions % 4 === 0) { round++; }
    switchMode(next);
  } else {
    switchMode('focus');
  }
  document.getElementById('roundCount').innerHTML = round + '<span class="of">/4</span>';
  updateStartBtn();
}

function toggle() {
  running = !running;
  if (running) { timer = setInterval(tick, 1000); }
  else { clearInterval(timer); }
  updateStartBtn();
}

function updateStartBtn() {
  var btn = document.getElementById('startBtn');
  btn.textContent = running ? 'Pause' : 'Start';
  btn.classList.toggle('running', running);
}

function reset() {
  clearInterval(timer);
  running = false;
  remaining = DURATIONS[mode];
  render();
  updateStartBtn();
}

function skip() {
  remaining = 0;
  complete();
}

function switchMode(m) {
  mode = m;
  remaining = DURATIONS[m];
  document.querySelectorAll('.mode-btn').forEach(function(b, i) {
    b.classList.toggle('active', ['focus', 'short', 'long'][i] === m);
  });
  document.getElementById('phase').textContent = PHASES[m];
  document.getElementById('ring').style.stroke = COLORS[m];
  document.body.className = m;
  render();
}

function setMode(btn, m) {
  clearInterval(timer);
  running = false;
  switchMode(m);
  updateStartBtn();
}

render();`,
  seo: {
    title: 'Pomodoro Timer — Free HTML CSS JS Snippet',
    description: 'Pomodoro focus timer with circular SVG progress ring, focus/break modes, auto-cycling rounds, and session stats. Exports to React, Vue & Angular.',
    about: {
      title: 'Pomodoro Timer — Circular SVG Ring, Auto-Cycling Focus & Break Modes',
      description: `The Pomodoro Technique breaks work into focused 25-minute intervals separated by short breaks, with a longer break after every fourth session. This snippet implements a complete, polished Pomodoro timer with a circular SVG progress ring, three modes (Focus, Short Break, Long Break), automatic cycling between focus and breaks, a session counter, a round tracker, accumulated focus minutes, and an ambient background colour that shifts with the active mode.\n\n**The circular SVG progress ring**\n\nThe ring is two stacked SVG circles. The background circle is a faint track; the foreground circle is the animated progress indicator. The technique relies on stroke-dasharray and stroke-dashoffset: the dasharray equals the circle\'s circumference (2πr ≈ 678.58 for r=108), and the dashoffset is animated from 0 to the full circumference to "drain" the ring as time elapses. The SVG is rotated −90° so the ring starts depleting from the top, and stroke-linecap: round gives the progress end a soft cap.\n\n**The countdown engine**\n\nA setInterval fires every second, decrementing the remaining seconds and calling render(), which formats MM:SS with padStart and updates the ring offset proportionally (remaining ÷ total duration). When remaining hits zero, complete() runs. Storing remaining as a plain seconds integer — rather than wall-clock timestamps — keeps the logic simple, though for background-tab accuracy you would reconcile against Date.now() on each tick.\n\n**Auto-cycling and the Pomodoro rules**\n\ncomplete() encodes the classic Pomodoro flow: after a focus session it increments the session count and accumulated focus minutes, then switches to a short break — unless it was the 4th session, in which case it switches to a long break and advances the round. After any break it returns to focus mode. This automatic mode-switching is what distinguishes a true Pomodoro timer from a plain countdown.\n\n**Mode theming**\n\nEach mode has its own ring colour and a body background class. switchMode() updates the active mode button, the phase label, the ring stroke colour, and the body class, which drives a 0.6-second background transition. The colour shift gives an ambient, glanceable signal of whether you should be working or resting without reading any text.\n\n**Controls**\n\nThe Start button toggles to Pause while running and visually de-emphasises. Reset returns the current mode to its full duration. Skip jumps straight to completion, advancing to the next phase — useful when you finish early or want to move on.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Start a focus session', text: 'Click Start to begin the 25-minute focus countdown. The ring drains as time passes and the button switches to Pause.' },
      { title: 'Take breaks automatically', text: 'When a focus session ends, the timer switches to a short break on its own. After four focus sessions it switches to a long break and advances the round counter.' },
      { title: 'Switch modes manually', text: 'Use the Focus, Short Break, and Long Break tabs to jump to any mode. The background colour shifts to match, giving an ambient cue.' },
      { title: 'Pause, reset, or skip', text: 'Pause stops the countdown without losing your place. Reset restores the current mode to full time. Skip jumps to the end and advances to the next phase.' },
      { title: 'Track your progress', text: 'The stats row shows completed sessions, the current round out of four, and total focus minutes accumulated for the day.' },
      { title: 'Export for your framework', text: 'Click "JSX" for a React component using useEffect for the interval and useState for the timer state. Click "Vue" for a Vue 3 SFC with onMounted/onUnmounted cleanup.' },
    ]},
    features: ['Circular SVG ring using stroke-dasharray/dashoffset for smooth progress','Three modes: 25-min Focus, 5-min Short Break, 15-min Long Break','Auto-cycling: focus → short break, with a long break every 4th session','Round tracker and accumulated focus-minute counter','Ambient body background colour that transitions with the active mode','Per-mode ring colour theming','Start/Pause toggle plus Reset and Skip controls','MM:SS display with tabular-nums to prevent digit jitter'],
    useCases: [
      { icon: 'APP', title: 'Productivity and focus web app core timer', desc: 'Make the Pomodoro timer the centrepiece of a focus app. Persist sessions, rounds, and focus minutes to localStorage or a backend so daily and weekly streaks survive refreshes. Add a task label above the timer so each Pomodoro is tied to what the user is working on.' },
      { icon: 'FLOW', title: 'Study and exam-prep companion tool', desc: 'Students use Pomodoro to manage study fatigue. Pair the timer with a subject picker and log focus minutes per subject. After each long break, prompt a quick review or flashcard round to reinforce spaced repetition during the rest period.' },
      { icon: 'CODE', title: 'Add notifications, sound, and tab-title countdown', desc: 'Request Notification permission and fire a browser notification on each phase change. Play a soft chime with the Web Audio API at completion. Update document.title with the remaining time so users tracking the timer in a background tab can glance at the tab bar.' },
      { icon: 'CHART', title: 'Team focus dashboard and async coworking', desc: 'In a remote team tool, broadcast each member\'s current mode (focusing or on break) so colleagues know who is heads-down. Aggregate daily focus minutes into a team productivity chart while keeping individual session data private to each user.' },
      { icon: 'LEARN', title: 'Study SVG ring progress and interval timers', desc: 'The snippet is a clean reference for animated [SVG progress rings](/ui-snippets/svg-progress-ring/), setInterval-based [countdowns](/ui-snippets/countdown-timer/), and state machines that cycle between phases. The dasharray/dashoffset technique applies to loading spinners, score gauges, and any radial progress indicator.' },
      { icon: 'DESIGN', title: 'Meditation, breathing, or workout interval timer', desc: 'Re-theme the modes for other interval workflows: meditation with work/rest cycles, HIIT workouts with exercise/rest intervals, or [breathing exercises](/ui-snippets/breathing-animation/). Change the durations, labels, and colours; the auto-cycling engine and ring visualisation work unchanged.' },
      { icon: 'CODE', title: 'Related: Version History Timeline', desc: 'See the [Version History Timeline](/ui-snippets/version-history-timeline/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the Pomodoro Technique and how does this timer implement it?', a: 'The Pomodoro Technique, created by Francesco Cirillo, breaks work into 25-minute focused intervals (Pomodoros) separated by 5-minute short breaks, with a longer 15-30 minute break after every four Pomodoros. This timer encodes that flow exactly: completing a focus session automatically starts a short break, and every fourth completion triggers a long break and advances the round counter. You can also switch modes manually at any time.' },
      { q: 'Does the timer keep accurate time in a background tab?', a: 'Browsers throttle setInterval in inactive tabs, so a pure per-second counter can drift behind in the background. For accuracy, store the target end time as Date.now() + remaining * 1000 when starting, and on each tick compute remaining = Math.round((endTime - Date.now()) / 1000) instead of simply decrementing. This reconciles against the real clock so the timer stays correct even after the tab was backgrounded.' },
      { q: 'How do I add a sound or notification when a session ends?', a: 'In the complete() function, play a sound with the Web Audio API or an Audio element: new Audio("/chime.mp3").play(). For desktop notifications, first request permission with Notification.requestPermission() on a user gesture, then fire new Notification("Break time!", { body: "Focus session complete" }) when a phase ends. Combine both so users get an audible and visual cue even when the tab is not focused. Browsers block autoplay audio until the user has interacted with the page, so trigger the first sound from the Start button click to unlock the audio context for later automatic plays.' },
      { q: 'Why does the background colour change with each mode?', a: 'Each mode adds a class to the document body (focus, short, or long), and the body has a 0.6-second background transition. Focus mode is a deep purple, short break a calm green, and long break a restful blue. This ambient colour shift gives a glanceable, peripheral signal of whether you should be working or resting — you can tell your current state from across the room without reading the timer. Colour-coding states this way reduces the cognitive load of context-switching between work and rest.' },
      { q: 'How do I build this in React?', a: 'Store mode, remaining, running, sessions, and round in useState. Run the countdown in a useEffect that sets an interval when running is true and clears it on cleanup: useEffect(() => { if (!running) return; const id = setInterval(() => setRemaining(r => r - 1), 1000); return () => clearInterval(id); }, [running]). Watch remaining for zero in another effect to trigger the auto-cycle. Compute the ring dashoffset from remaining / duration.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the ring math or the auto-cycle rules by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the stroke-dasharray value of 678.58 relates to the circle's radius of 108, and how complete decides between switching to a short break versus a long break based on the sessions count modulo 4. The same assistant can help optimize it, for example checking whether the plain per-second setInterval counter drifts when the browser throttles a backgrounded tab, and how to reconcile it against Date.now() instead. It's also useful for extending the effect: ask it to persist sessions, rounds, and focus minutes to localStorage so they survive a refresh, add a browser notification and chime when a phase completes, or make the three durations user-configurable instead of hardcoded. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a Pomodoro focus timer in plain HTML, CSS, and vanilla JavaScript using an SVG circular progress ring — no libraries, no canvas.

Requirements:
- Three switchable modes (Focus, Short Break, Long Break), each with its own fixed duration in seconds, its own accent color, and its own phase label, selectable via tab buttons.
- A circular progress ring built from two stacked SVG circles: a faint background track circle and a foreground progress circle whose stroke-dasharray is set to its own circumference (2 times pi times its radius) and whose stroke-dashoffset animates from 0 up to that same circumference as time elapses, so the ring visually drains; rotate the SVG -90 degrees so the drain starts from the top.
- A setInterval-driven countdown that decrements a plain integer of remaining seconds once per second, formats it as MM:SS with zero-padding, and updates the ring's stroke-dashoffset proportionally to remaining divided by the current mode's total duration.
- When the countdown reaches zero, automatically advance the flow: completing a focus session increments a session counter and an accumulated focus-minutes counter, then switches to a short break, except that every 4th completed focus session must switch to a long break instead and advance a round counter.
- Completing any break must always switch back to focus mode automatically, with no user action required.
- Start/Pause, Reset (return the current mode to its full duration), and Skip (jump straight to completion and advance to the next phase) controls, plus an ambient body background color that transitions smoothly whenever the active mode changes.`,
    },
  },
};

export default pomodoroTimer;
