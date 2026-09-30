const countdownTimer = {
  id: 'countdown-timer',
  title: 'Countdown Timer',
  category: 'loaders',
  html: `<div class="wrap">
  <div class="timer-card">
    <div class="ring-wrap">
      <svg class="ring-svg" viewBox="0 0 120 120">
        <circle class="ring-bg"   cx="60" cy="60" r="52"/>
        <circle class="ring-fill" cx="60" cy="60" r="52" id="ring"/>
      </svg>
      <div class="ring-inner">
        <div class="time-num" id="time-num">25:00</div>
        <div class="time-lbl" id="time-lbl">Focus</div>
      </div>
    </div>

    <div class="mode-tabs">
      <button class="mode active" onclick="setMode('focus',25)" id="btn-focus">Focus</button>
      <button class="mode" onclick="setMode('break',5)"  id="btn-break">Short break</button>
      <button class="mode" onclick="setMode('long',15)"  id="btn-long">Long break</button>
    </div>

    <div class="controls">
      <button class="ctrl-btn" id="main-btn" onclick="toggle()">Start</button>
      <button class="ctrl-btn secondary" onclick="reset()">Reset</button>
    </div>

    <div class="session-row">
      Session <strong id="session-num">1</strong> of 4
      <div class="dots" id="dots">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 320px; }
.timer-card { background: #fff; border-radius: 24px; padding: 32px 24px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; gap: 24px; }

.ring-wrap { position: relative; width: 160px; height: 160px; }
.ring-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.ring-bg   { fill: none; stroke: #f1f5f9; stroke-width: 8; }
.ring-fill { fill: none; stroke: #6366f1; stroke-width: 8; stroke-linecap: round;
  stroke-dasharray: 327; stroke-dashoffset: 0; transition: stroke-dashoffset 0.5s linear, stroke 0.3s; }
.ring-inner { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; }
.time-num { font-size: 32px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; line-height: 1; }
.time-lbl { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; }

.mode-tabs { display: flex; gap: 4px; background: #f1f5f9; border-radius: 10px; padding: 3px; }
.mode { background: transparent; border: none; font-size: 12px; font-weight: 600; color: #64748b; padding: 6px 12px; border-radius: 8px; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
.mode.active { background: #fff; color: #6366f1; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }

.controls { display: flex; gap: 10px; width: 100%; }
.ctrl-btn { flex: 1; padding: 12px; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.15s; }
.ctrl-btn:not(.secondary) { background: #6366f1; color: #fff; }
.ctrl-btn:not(.secondary):hover { background: #4f46e5; }
.ctrl-btn.secondary { background: #f1f5f9; color: #475569; }
.ctrl-btn.secondary:hover { background: #e2e8f0; }

.session-row { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #94a3b8; }
.dots { display: flex; gap: 5px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #e2e8f0; transition: background 0.3s; }
.dot.done { background: #6366f1; }`,
  js: `const C = 2 * Math.PI * 52; // circumference
const modes = { focus:25, break:5, long:15 };
let currentMode = 'focus';
let totalSecs = 25 * 60;
let remaining = totalSecs;
let running = false;
let session = 1;
let ticker = null;

function setMode(mode, mins) {
  clearInterval(ticker);
  running = false;
  currentMode = mode;
  totalSecs = mins * 60;
  remaining = totalSecs;
  document.querySelectorAll('.mode').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-' + mode).classList.add('active');
  document.getElementById('time-lbl').textContent = mode === 'focus' ? 'Focus' : mode === 'break' ? 'Short break' : 'Long break';
  document.getElementById('main-btn').textContent = 'Start';
  document.getElementById('ring').style.stroke = mode === 'focus' ? '#6366f1' : mode === 'break' ? '#10b981' : '#0ea5e9';
  render();
}

function toggle() {
  if (running) {
    clearInterval(ticker);
    running = false;
    document.getElementById('main-btn').textContent = 'Resume';
  } else {
    running = true;
    document.getElementById('main-btn').textContent = 'Pause';
    ticker = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(ticker);
        running = false;
        document.getElementById('main-btn').textContent = 'Start';
        if (currentMode === 'focus') {
          session = Math.min(4, session + 1);
          document.getElementById('session-num').textContent = session;
          updateDots();
        }
        return;
      }
      remaining--;
      render();
    }, 1000);
  }
}

function reset() {
  clearInterval(ticker);
  running = false;
  remaining = totalSecs;
  document.getElementById('main-btn').textContent = 'Start';
  render();
}

function render() {
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  document.getElementById('time-num').textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  const pct = remaining / totalSecs;
  document.getElementById('ring').style.strokeDashoffset = C * (1 - pct);
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('done', i < session - 1));
}

render();`,
  seo: {
    title: 'Countdown Timer — Free HTML CSS JS Pomodoro Snippet',
    description: 'Pomodoro timer with SVG ring countdown, focus/break mode tabs and session dot tracker. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Countdown Timer — SVG Ring Progress, Pomodoro Modes, Session Dots & Pause/Resume',
      description: `A countdown timer with a circular progress ring is one of the most visually engaging loading and progress components you can build without a library. This snippet implements a complete Pomodoro-style countdown timer: an SVG stroke-dashoffset ring that drains as time passes, three mode tabs (Focus 25min, Short break 5min, Long break 15min), Start/Pause/Resume/Reset controls, a session counter with dot indicators, and a colour change per mode — all in plain HTML, CSS, and vanilla JavaScript.\n\n**How the SVG ring countdown works**\n\nThe ring uses the stroke-dashoffset technique. The circle has a circumference C = 2 × π × radius = 2 × π × 52 ≈ 327px. stroke-dasharray: 327 makes the stroke one continuous dash equal to the full circumference. stroke-dashoffset controls how much of the dash is hidden — setting it to 327 hides the full ring (empty), 0 shows the full ring (complete). As time passes: dashoffset = C × (1 - remaining/total). The CSS transition: stroke-dashoffset 0.5s linear smooths the movement each second.\n\n**The Pomodoro mode tabs**\n\nThree tabs switch between Focus (25 min, indigo ring), Short break (5 min, green ring), and Long break (15 min, cyan ring). Switching a mode resets the timer, updates the stroke colour via ring.style.stroke, and updates the centre label. The mode button active state uses the same pill tab pattern as the [calendar widget](/ui-snippets/calendar-widget/).\n\n**Start/Pause/Resume logic**\n\nA setInterval fires every 1000ms when running. The toggle() function checks the running boolean: if running, it clears the interval, sets running = false, and changes the button to "Resume". If not running, it starts the interval and changes the button to "Pause". The Reset button clears the interval and restores remaining to totalSecs.\n\n**Session dot tracker**\n\nFour dot indicators track completed focus sessions. Each completed focus session (when the ring reaches 0 in Focus mode) fills one dot with the accent colour and increments the session counter. After 4 sessions, the counter stops at 4 — a visual cue to take a long break.\n\n**Tabular number digits**\n\nThe time display uses font-variant-numeric: tabular-nums — a CSS OpenType feature that makes all digits the same width, preventing the display from shifting width as the time counts down.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click Start to begin the countdown', text: 'The SVG ring starts draining and the timer counts down. Click Pause to pause mid-session. Click Resume to continue. The button label changes to reflect the current state.' },
      { title: 'Switch between Focus and break modes', text: 'Click Focus (25 min), Short break (5 min), or Long break (15 min) to switch modes. The ring colour changes: indigo for Focus, green for Short break, cyan for Long break. Switching resets the timer.' },
      { title: 'Change the timer durations', text: 'In the JS panel, update the modes object: { focus: N, break: N, long: N } where N is the duration in minutes. Change the onclick values in the HTML mode buttons to match the new durations.' },
      { title: 'Customize ring colours', text: 'In the JS setMode() function, update the ring.style.stroke values per mode. In the CSS, update .ring-fill stroke and .ctrl-btn background to change the default accent colour.' },
      { title: 'Add a sound notification on timer end', text: 'Inside the ticker interval, when remaining <= 0, add: const audio = new Audio("bell.mp3"); audio.play(). Or use the Web Audio API to generate a tone: const ctx = new AudioContext(); const osc = ctx.createOscillator(); osc.connect(ctx.destination); osc.start(); setTimeout(() => osc.stop(), 400).' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component using useState for remaining, useEffect for the interval with cleanup, or "Tailwind" for a Tailwind version.' },
    ]},
    features: ['SVG stroke-dashoffset ring: C=2πr, dashoffset=C*(1-remaining/total), drains as time passes','Ring colour per mode: indigo (focus), green (short break), cyan (long break)','Start/Pause/Resume: running boolean + clearInterval/setInterval toggle pattern','Reset: clears interval, restores remaining to totalSecs, resets button label','Session dot tracker: 4 dots fill as focus sessions complete','font-variant-numeric:tabular-nums — stable digit width prevents layout shift','CSS transition: stroke-dashoffset 0.5s linear — smooth per-second ring update','Three Pomodoro mode tabs: Focus/Short break/Long break with shared setMode()'],
    useCases: [
      { icon: 'FLOW', title: 'Pomodoro technique productivity timer for focus sessions', desc: 'The Pomodoro technique (25-minute focus, 5-minute break cycles) is one of the most researched time management methods. This timer implements the complete cycle: 4 focus sessions tracked by dot indicators, with short breaks between and a long break after all 4 sessions — see also the task-list [Pomodoro widget](/ui-snippets/pomodoro-timer/).' },
      { icon: 'DESIGN', title: 'Meeting and presentation countdown timers', desc: 'Set the focus duration to your meeting length (30 min, 60 min). The visual ring gives presenters and participants a clear sense of remaining time without checking a phone. Use the short break mode for Q&A periods.' },
      { icon: 'APP', title: 'Exam, quiz, and timed challenge interfaces', desc: 'Wire the timer to a quiz or exam UI. When remaining reaches 0, auto-submit the form. The ring provides a visual urgency cue as time expires without requiring the user to read a number. The ring colour can shift to red as time runs low: if (remaining < 60) ring.style.stroke = "#ef4444".' },
      { icon: 'CODE', title: 'Browser extension new tab page timer widget', desc: 'Export the HTML and deploy as a browser new tab override page or a Chrome extension popup. The timer persists in memory while the tab is open. Add localStorage state save on every tick() to persist across tab navigations.' },
      { icon: 'LEARN', title: 'Study stroke-dashoffset mathematics and setInterval timing', desc: 'The ring countdown demonstrates the SVG stroke-dasharray/dashoffset technique for showing progress percentages on a circular path. The setInterval pattern shows how to implement a precise 1-second countdown with pause/resume control using a single boolean flag.' },
      { icon: 'STAR', title: 'Cooking timer, workout interval, and meditation apps', desc: 'The three-mode tab system adapts to workout intervals (Work/Rest/Cooldown), cooking timers (Prep/Cook/Rest), or meditation — pair it with the guided [breathing animation](/ui-snippets/breathing-animation/) for the breathe/hold/release phases. Change the mode labels and durations to match the domain.' },
      { icon: 'CODE', title: 'Related: Audio Buffering Visualizer', desc: 'See the [Audio Buffering Visualizer](/ui-snippets/loader-audio-buffering-visualizer/) for a related loaders pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Stage Progress Fill Checklist', desc: 'See the [Stage Progress Fill Checklist](/ui-snippets/stage-progress-fill-checklist/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the SVG ring drain as the timer counts down?', a: 'The ring uses stroke-dasharray: 327 (the full circumference, computed as 2×π×52) and stroke-dashoffset. When dashoffset = 0, the full ring is visible. When dashoffset = 327, the ring is completely hidden. The formula dashoffset = C × (1 - remaining/total) maps the remaining time fraction to the dashoffset: at full time remaining (remaining/total = 1), dashoffset = 0 (full ring). At time expired (remaining/total = 0), dashoffset = C (empty ring). CSS transition: stroke-dashoffset 0.5s linear smooths the change each second.' },
      { q: 'How do I add a sound notification when the timer reaches zero?', a: 'In the setInterval callback, when remaining <= 0, use the Web Audio API: const ctx = new (window.AudioContext || window.webkitAudioContext)(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.frequency.value = 440; gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8); osc.start(); osc.stop(ctx.currentTime + 0.8). This creates a 440Hz tone that fades out over 0.8 seconds without any audio file.' },
      { q: 'How do I make the ring turn red when time is running low?', a: 'Inside the ticker setInterval, after decrementing remaining, add a colour warning: if (remaining <= 60 && currentMode === "focus") { document.getElementById("ring").style.stroke = "#ef4444"; } else if (remaining <= 0) { document.getElementById("ring").style.stroke = ""; }. The CSS transition on the stroke property (add transition: stroke 0.3s to .ring-fill) will animate the colour change smoothly.' },
      { q: 'How do I use this countdown timer in React?', a: 'Click "JSX" to download. Manage remaining, running, currentMode, and session in useState. Run the interval in useEffect: useEffect(() => { if (!running) return; const id = setInterval(() => setRemaining(r => r - 1), 1000); return () => clearInterval(id); }, [running]). Use useEffect to check if remaining reaches 0: useEffect(() => { if (remaining <= 0) { setRunning(false); if (currentMode === "focus") setSession(s => Math.min(4, s+1)); } }, [remaining]).' },
    ],
    aiPrompt: {
      paragraph: `You don't have to derive the stroke-dashoffset formula yourself to trust why the ring drains smoothly. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the circle's circumference, the dasharray, and the per-second dashoffset calculation combine to visually represent remaining time as a fraction of a full circle, and why toggle only ever needs one boolean flag to manage start, pause, and resume instead of three separate states. The same assistant can help optimize it — for instance asking whether driving the countdown from setInterval risks drift over a long session compared to computing elapsed time from a stored start timestamp on each tick. It's also useful for extending the timer: ask it to add a real audio chime using the Web Audio API when a session ends, turn the ring red during the final minute of a focus session, or persist the running session and remaining time to sessionStorage so a reload doesn't lose progress. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a Pomodoro-style countdown timer in plain HTML, CSS, and JavaScript with an SVG circular progress ring — no timer library, no frameworks.

Requirements:
- An SVG circle used as a progress ring, where stroke-dasharray is set to the circle's exact circumference (2 times pi times the radius) so the entire stroke forms one continuous dash equal to the ring's full length.
- Every second, recompute stroke-dashoffset as the circumference multiplied by one minus the fraction of time remaining, so the ring visually drains from a complete circle to nothing as the countdown proceeds, with a short CSS transition on that property so the motion isn't a hard jump.
- Three selectable modes (e.g. Focus, Short Break, Long Break), each with its own duration in minutes and its own accent color applied to the ring's stroke, where switching modes stops any running countdown, resets the remaining time to the new mode's duration, and updates the active-tab styling.
- A single boolean flag tracking whether the timer is currently running, used to drive one toggle function that starts a one-second interval when not running (changing the button label to a pause state) and clears that interval when running (changing the button label to a resume state) — do not use three separate states for start/pause/resume.
- A reset control that stops any active interval and restores the remaining time to the current mode's full duration without changing modes.
- A row of session-indicator dots that fill in one at a time specifically when a Focus-mode countdown reaches zero (not when a break ends), up to a maximum of four, with an accompanying session counter.
- Display the remaining time as minutes and seconds, zero-padded to two digits each, using a monospace/tabular numeral style so the digit width never shifts as the numbers change.`,
    },
  },
};

export default countdownTimer;
