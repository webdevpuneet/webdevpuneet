const stopwatch = {
  id: 'stopwatch',
  title: 'Stopwatch',
  category: 'tools',
  html: `<div class="wrap">
  <div class="card">
    <div class="display">
      <span class="main-time" id="display">00:00.00</span>
    </div>
    <div class="controls">
      <button class="btn lap" id="lapBtn" onclick="lap()" disabled>Lap</button>
      <button class="btn start" id="startBtn" onclick="toggle()">Start</button>
      <button class="btn reset" id="resetBtn" onclick="reset()" disabled>Reset</button>
    </div>
    <div class="laps-head" id="lapsHead" style="display:none">
      <span>Lap</span><span>Lap Time</span><span>Total</span>
    </div>
    <div class="laps" id="laps"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0b0f1a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.wrap { width: 100%; max-width: 380px; }
.card { background: #131826; border: 1px solid #1e2433; border-radius: 24px; padding: 32px 26px; }
.display { display: flex; justify-content: center; margin-bottom: 30px; padding: 12px 0; }
.main-time { font-size: 52px; font-weight: 300; color: #f8fafc; font-variant-numeric: tabular-nums; letter-spacing: 1px; font-family: 'SF Mono', 'Roboto Mono', ui-monospace, monospace; }
.controls { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 24px; }
.btn { flex: 1; padding: 16px 0; border: none; border-radius: 16px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.15s; }
.btn.start { background: #22c55e; color: #052e16; }
.btn.start:hover { background: #16a34a; }
.btn.start.running { background: #ef4444; color: #450a0a; }
.btn.start.running:hover { background: #dc2626; }
.btn.lap, .btn.reset { background: #1e2433; color: #94a3b8; }
.btn.lap:hover:not(:disabled), .btn.reset:hover:not(:disabled) { background: #2a3142; color: #e2e8f0; }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }
.laps-head { display: grid; grid-template-columns: 50px 1fr 1fr; gap: 8px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; padding: 0 8px 10px; border-bottom: 1px solid #1e2433; }
.laps-head span:nth-child(2), .laps-head span:nth-child(3) { text-align: right; }
.laps { max-height: 220px; overflow-y: auto; }
.lap-row { display: grid; grid-template-columns: 50px 1fr 1fr; gap: 8px; padding: 13px 8px; border-bottom: 1px solid #161b29; font-size: 14px; font-variant-numeric: tabular-nums; animation: slideIn 0.25s ease; }
.lap-num { color: #94a3b8; font-weight: 600; }
.lap-time, .lap-total { text-align: right; color: #cbd5e1; }
.lap-row.best .lap-time { color: #22c55e; }
.lap-row.worst .lap-time { color: #ef4444; }
.lap-tag { font-size: 9px; font-weight: 700; padding: 1px 5px; border-radius: 4px; margin-left: 6px; vertical-align: middle; }
.lap-row.best .lap-tag { background: rgba(34,197,94,0.15); color: #22c55e; }
.lap-row.worst .lap-tag { background: rgba(239,68,68,0.15); color: #ef4444; }
@keyframes slideIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }`,
  js: `var startTime = 0;
var elapsed = 0;
var running = false;
var raf = null;
var laps = [];
var lastLapTime = 0;

function format(ms) {
  var totalCs = Math.floor(ms / 10);
  var cs = totalCs % 100;
  var totalS = Math.floor(totalCs / 100);
  var s = totalS % 60;
  var m = Math.floor(totalS / 60);
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0') + '.' + String(cs).padStart(2, '0');
}

function update() {
  var now = elapsed + (running ? performance.now() - startTime : 0);
  document.getElementById('display').textContent = format(now);
  if (running) raf = requestAnimationFrame(update);
}

function toggle() {
  running = !running;
  var btn = document.getElementById('startBtn');
  if (running) {
    startTime = performance.now();
    raf = requestAnimationFrame(update);
    btn.textContent = 'Stop';
    btn.classList.add('running');
    document.getElementById('lapBtn').disabled = false;
    document.getElementById('resetBtn').disabled = true;
  } else {
    elapsed += performance.now() - startTime;
    cancelAnimationFrame(raf);
    btn.textContent = 'Start';
    btn.classList.remove('running');
    document.getElementById('lapBtn').disabled = true;
    document.getElementById('resetBtn').disabled = false;
  }
}

function lap() {
  var now = elapsed + (performance.now() - startTime);
  var lapTime = now - lastLapTime;
  lastLapTime = now;
  laps.push({ lapTime: lapTime, total: now });
  renderLaps();
}

function renderLaps() {
  document.getElementById('lapsHead').style.display = laps.length ? 'grid' : 'none';
  var container = document.getElementById('laps');
  var times = laps.map(function(l) { return l.lapTime; });
  var best = Math.min.apply(null, times);
  var worst = Math.max.apply(null, times);
  container.innerHTML = laps.map(function(l, i) {
    var cls = '';
    var tag = '';
    if (laps.length > 1 && l.lapTime === best) { cls = 'best'; tag = '<span class="lap-tag">BEST</span>'; }
    else if (laps.length > 1 && l.lapTime === worst) { cls = 'worst'; tag = '<span class="lap-tag">SLOW</span>'; }
    return '<div class="lap-row ' + cls + '"><span class="lap-num">' + String(i + 1).padStart(2, '0') + '</span><span class="lap-time">' + format(l.lapTime) + tag + '</span><span class="lap-total">' + format(l.total) + '</span></div>';
  }).reverse().join('');
}

function reset() {
  cancelAnimationFrame(raf);
  running = false;
  elapsed = 0;
  lastLapTime = 0;
  laps = [];
  document.getElementById('display').textContent = '00:00.00';
  document.getElementById('startBtn').textContent = 'Start';
  document.getElementById('startBtn').classList.remove('running');
  document.getElementById('lapBtn').disabled = true;
  document.getElementById('resetBtn').disabled = true;
  renderLaps();
}`,
  seo: {
    title: 'Stopwatch with Laps — Free HTML CSS JS Snippet',
    description: 'Precision stopwatch with centisecond display, lap times, best/slowest lap highlighting, and requestAnimationFrame timing. Exports to React, Vue & Angular.',
    about: {
      title: 'Stopwatch — Centisecond Precision, Lap Splits & Best/Slowest Highlighting',
      description: `A stopwatch is a deceptively simple component that exposes a lot of subtle timing engineering when built correctly. This snippet provides a precise stopwatch with a centisecond (hundredths-of-a-second) display, Start/Stop/Reset controls, lap recording, and automatic highlighting of the fastest and slowest laps — mirroring the behaviour of the iOS stopwatch.\n\n**Accurate timing with performance.now()**\n\nThe stopwatch measures elapsed time using performance.now(), a high-resolution monotonic clock that is immune to system clock changes and far more precise than Date.now(). Rather than incrementing a counter each frame (which would accumulate drift), it stores the start timestamp and computes elapsed = accumulated + (performance.now() − startTime) on every frame. This means the displayed time is always derived from the real clock, so it stays accurate no matter how irregular the frame timing is.\n\n**requestAnimationFrame instead of setInterval**\n\nThe display updates via requestAnimationFrame rather than a setInterval. This syncs updates to the browser\'s paint cycle (typically 60fps), giving a smooth centisecond readout without the visual tearing or wasted renders of a fixed-interval timer. When stopped, the animation frame loop is cancelled so no work happens in the background.\n\n**The pause/resume accumulator**\n\nStopping the watch adds the current run\'s duration into an elapsed accumulator and cancels the frame loop. Starting again records a fresh startTime and resumes. Because the total is always elapsed + current-run, pausing and resuming any number of times never loses or double-counts time — a classic bug in naive stopwatch implementations that reset startTime without accumulating.\n\n**Lap splits and total time**\n\nEach lap records two values: the lap time (the split since the previous lap) and the cumulative total. lastLapTime tracks the running total at the last lap so the next split is just now − lastLapTime. Laps render newest-first, matching standard stopwatch convention.\n\n**Best and slowest lap highlighting**\n\nOnce there are at least two laps, the renderer computes the minimum and maximum lap times and tags them green (BEST) and red (SLOW). This gives instant performance feedback for interval training, lap racing, or any repeated-timing task. New laps animate in with a subtle slide.\n\n**Time formatting**\n\nThe format function converts milliseconds to MM:SS.CC by extracting centiseconds, seconds, and minutes with modulo arithmetic and padding each to two digits. A monospace font and tabular-nums keep every digit the same width so the rapidly changing centiseconds never shift the layout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Start the stopwatch', text: 'Click Start to begin timing. The display updates smoothly in hundredths of a second and the button turns red, reading Stop.' },
      { title: 'Record laps', text: 'While running, click Lap to record a split. Each lap shows its own time and the cumulative total. The list grows newest-first.' },
      { title: 'Stop and resume', text: 'Click Stop to pause. Click Start again to resume from exactly where you left off — paused time is never lost or double-counted.' },
      { title: 'See best and slowest laps', text: 'Once you have two or more laps, the fastest is tagged BEST in green and the slowest is tagged SLOW in red.' },
      { title: 'Reset', text: 'When stopped, click Reset to clear the time and all laps back to zero. Reset is disabled while running to prevent accidental data loss.' },
      { title: 'Export for your framework', text: 'Click "JSX" for a React component using useRef for timing values and requestAnimationFrame. Click "Vue" for a Vue 3 SFC with the same high-resolution timing.' },
    ]},
    features: ['High-resolution timing via performance.now() — immune to clock changes','requestAnimationFrame display loop synced to the paint cycle','Pause/resume accumulator that never loses or double-counts time','Centisecond (MM:SS.CC) display with monospace tabular-nums','Lap splits with per-lap time and cumulative total','Automatic best (green) and slowest (red) lap highlighting','Newest-first lap list with slide-in animation','Context-aware button states (Lap while running, Reset while stopped)'],
    useCases: [
      { icon: 'APP', title: 'Sports and interval-training timing app', desc: 'Use as the timing core of a running, swimming, or cycling app — pair it with a [Pomodoro-style interval timer](/ui-snippets/pomodoro-timer/) for structured work/rest sets. The lap splits map directly to track laps or interval reps, and the best/slowest highlighting gives athletes instant feedback on pacing consistency. Persist sessions to review split history over time.' },
      { icon: 'CHART', title: 'Productivity and time-tracking utility', desc: 'Freelancers and consultants can time tasks for billing. Each lap becomes a sub-task split, and the cumulative total feeds an invoice. Add a label field per lap to annotate what each split represents before exporting the times to a timesheet.' },
      { icon: 'FLOW', title: 'Lab, cooking, or process timing tool', desc: 'Any repeated-process timing benefits from laps: science experiments, cooking steps, manufacturing cycle times. The accurate performance.now() timing and split recording make it suitable for processes where precision matters more than a kitchen timer provides.' },
      { icon: 'CODE', title: 'Extend with keyboard shortcuts and export', desc: 'Bind the spacebar to start/stop and the L key to lap for hands-free operation — document the bindings with a [keyboard shortcuts](/ui-snippets/keyboard-shortcuts/) panel. Add an export button that serialises the laps array to CSV or JSON. Persist running state to localStorage so an accidental refresh does not lose an in-progress timing session.' },
      { icon: 'LEARN', title: 'Study precise timing and the rAF render loop', desc: 'This snippet is the canonical example of doing timing correctly in the browser: monotonic clocks, accumulator-based pause/resume, and requestAnimationFrame rendering — contrast it with the countdown approach in the [countdown timer](/ui-snippets/countdown-timer/). Understanding why performance.now() beats Date.now() and why you accumulate rather than increment prevents an entire class of timer bugs.' },
      { icon: 'DESIGN', title: 'Game or quiz timer with lap-based scoring', desc: 'Use the lap mechanism to time rounds in a game or questions in a timed quiz. The best/slowest highlighting becomes per-round scoring feedback. The smooth centisecond display adds tension and polish that a once-per-second counter lacks.' },
    ],
    faqs: [
      { q: 'Why use performance.now() instead of Date.now() or setInterval?', a: 'performance.now() is a monotonic high-resolution clock: it always moves forward, is unaffected by the user changing their system clock or NTP adjustments, and offers sub-millisecond precision. Date.now() can jump backward if the clock is corrected, corrupting elapsed time. setInterval is also unreliable for timing because browsers throttle and delay it — accumulated drift can reach seconds over a long run. Deriving elapsed time from performance.now() on each frame keeps the display exact.' },
      { q: 'How does pause and resume avoid losing time?', a: 'The total elapsed time is always computed as a stored accumulator plus the current run: elapsed + (performance.now() − startTime). When you stop, the current run\'s duration is folded into the accumulator and the start timestamp is discarded. When you start again, a fresh startTime is recorded. Because the accumulator preserves all previous runs, you can pause and resume any number of times without losing or double-counting a single millisecond.' },
      { q: 'How are the best and slowest laps determined?', a: 'After each lap, the renderer collects all lap times into an array and finds the minimum and maximum with Math.min and Math.max. The lap matching the minimum gets the BEST tag and green styling; the maximum gets SLOW and red. The highlighting only appears once there are at least two laps, since a single lap cannot be compared. If multiple laps tie for fastest, the first match is highlighted. This per-lap comparison is exactly how the native iOS stopwatch flags your quickest and slowest splits, giving instant pacing feedback during interval training or lap racing.' },
      { q: 'How do I add keyboard shortcuts to the stopwatch?', a: 'Bind keys with a document keydown listener for hands-free control: map the spacebar to toggle() for start/stop, the L key to lap(), and the R key to reset(). Call e.preventDefault() on space so the page does not scroll. Because the timing runs on performance.now() and requestAnimationFrame independently of input, keyboard control adds no timing overhead — the shortcuts simply call the same functions the buttons do, keeping a single source of truth for each action.' },
      { q: 'How do I build this in React?', a: 'Keep timing values (startTime, elapsed, raf id) in useRef so updating them does not trigger re-renders. Store the displayed time string and laps array in useState. Run the update loop with requestAnimationFrame inside the toggle handler, reading the refs and calling setDisplay(format(now)). Clean up with cancelAnimationFrame on stop and in a useEffect cleanup. This separation keeps timing precise while React only re-renders the visible output.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the timing math on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why elapsed is computed as an accumulator plus performance.now() minus startTime rather than incrementing a counter every frame, and how that avoids the drift a naive setInterval-based stopwatch would accumulate over a long run. The same assistant can help optimize it — for instance whether recalculating best and worst lap times with Math.min.apply and Math.max.apply over the full laps array on every single lap becomes wasteful with hundreds of laps, or whether rebuilding the entire laps list's innerHTML on each lap could be replaced with appending just the new row. It's also useful for extending the stopwatch: ask it to add keyboard shortcuts for start, stop, and lap, persist an in-progress session to localStorage so a refresh doesn't lose it, or export the recorded laps as CSV. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a precision "stopwatch with laps" in plain HTML, CSS, and JavaScript using performance.now() and requestAnimationFrame — no Date.now(), no setInterval for the timing loop.

Requirements:
- Maintain the elapsed time as the sum of an accumulator variable (time from all previous completed runs) plus, while running, the difference between performance.now() and the timestamp recorded when the current run started — never reset that accumulator when pausing, and never let a paused/resumed cycle lose or double-count time.
- Drive the visible time display from a requestAnimationFrame loop (not setInterval), formatting milliseconds into MM:SS.CC (minutes, seconds, centiseconds) using Math.floor and modulo arithmetic, zero-padded and rendered in a monospace font with tabular numeric spacing so digits don't shift the layout as they change.
- A Start/Stop toggle button that starts the animation frame loop and enables the Lap button when running, and on stop folds the current run's duration into the accumulator, cancels the animation frame, and enables the Reset button (which must stay disabled while running).
- A Lap function that records both the split time since the previous lap and the cumulative total time at the moment of the tap, storing each lap as an object, and renders the full lap list newest-first.
- After there are at least two recorded laps, automatically compute and visually tag the single fastest lap (e.g. green, labeled BEST) and the single slowest lap (e.g. red, labeled SLOW) by comparing all recorded lap times, recalculating this tagging every time a new lap is added.
- A Reset function, enabled only while stopped, that zeroes the accumulator, clears all recorded laps, and restores the display and buttons to their initial state.`,
    },
  },
};

export default stopwatch;
