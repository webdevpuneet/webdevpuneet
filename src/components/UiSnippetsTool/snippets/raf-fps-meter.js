const rafFpsMeter = {
  id: 'raf-fps-meter',
  title: 'requestAnimationFrame FPS Meter & Easing Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo-wrap">
  <div class="meter-panel">
    <div class="meter-stat">
      <span class="meter-value" id="fps-value">0</span>
      <span class="meter-label">FPS (rolling avg)</span>
    </div>
    <div class="meter-stat">
      <span class="meter-value" id="frame-time-value">0.0</span>
      <span class="meter-label">ms / frame</span>
    </div>
    <canvas id="fps-graph" width="280" height="60"></canvas>
  </div>

  <div class="stage">
    <div class="stage-track" id="stage-track">
      <div class="ball" id="ball"></div>
    </div>
  </div>

  <div class="controls">
    <div class="control-group">
      <label>Easing function</label>
      <div class="easing-row">
        <button class="easing-btn active" data-fn="linear">linear</button>
        <button class="easing-btn" data-fn="easeInOutQuad">easeInOutQuad</button>
        <button class="easing-btn" data-fn="easeOutBounce">easeOutBounce</button>
        <button class="easing-btn" data-fn="cubicBezier">cubic-bezier(.17,.67,.35,1.3)</button>
      </div>
    </div>
    <div class="control-group">
      <label for="duration-slider">Bounce duration <span id="duration-label">1400ms</span></label>
      <input type="range" id="duration-slider" min="500" max="3000" step="100" value="1400">
    </div>
    <div class="control-group">
      <label for="load-slider">Artificial main-thread load <span id="load-label">0</span></label>
      <input type="range" id="load-slider" min="0" max="8" step="1" value="0">
    </div>
    <button class="btn" id="btn-toggle">Pause</button>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; }

.demo-wrap { max-width: 640px; margin: 0 auto; padding: 32px 20px 48px; display: flex; flex-direction: column; gap: 18px; }

.meter-panel {
  background: #1e293b; border: 1px solid #334155; border-radius: 14px;
  padding: 16px 18px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
}
.meter-stat { display: flex; flex-direction: column; align-items: center; min-width: 80px; }
.meter-value { font-size: 30px; font-weight: 800; color: #86efac; font-variant-numeric: tabular-nums; line-height: 1; }
.meter-label { font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 4px; }
#fps-graph { flex: 1; min-width: 200px; background: #0f172a; border-radius: 8px; border: 1px solid #334155; }

.stage { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 20px; }
.stage-track { position: relative; height: 140px; }
.ball {
  position: absolute; left: 10px; top: 0;
  width: 36px; height: 36px; border-radius: 50%;
  background: radial-gradient(circle at 32% 32%, #a5b4fc, #6366f1);
  box-shadow: 0 6px 18px rgba(99,102,241,0.5);
}

.controls { background: #1e293b; border: 1px solid #334155; border-radius: 14px; padding: 16px 18px; display: flex; flex-direction: column; gap: 14px; }
.control-group { display: flex; flex-direction: column; gap: 8px; }
.control-group label { font-size: 12px; font-weight: 600; color: #94a3b8; display: flex; justify-content: space-between; }
.control-group input[type="range"] { accent-color: #6366f1; }

.easing-row { display: flex; gap: 8px; flex-wrap: wrap; }
.easing-btn {
  background: #0f172a; color: #94a3b8; border: 1px solid #334155; border-radius: 8px;
  padding: 7px 11px; font-size: 11px; font-weight: 600; cursor: pointer; font-family: 'SFMono-Regular', Consolas, monospace;
  transition: all 0.15s;
}
.easing-btn:hover { border-color: #6366f1; color: #c7d2fe; }
.easing-btn.active { background: #6366f1; border-color: #6366f1; color: #fff; }

.btn {
  padding: 10px 14px; font-size: 13px; font-weight: 600; border-radius: 8px; cursor: pointer;
  font-family: inherit; border: none; background: #6366f1; color: #fff; transition: background 0.15s;
}
.btn:hover { background: #4f46e5; }`,

  js: `const fpsValueEl = document.getElementById('fps-value');
const frameTimeEl = document.getElementById('frame-time-value');
const canvas = document.getElementById('fps-graph');
const ctx = canvas.getContext('2d');
const ball = document.getElementById('ball');
const stageTrack = document.getElementById('stage-track');
const durationSlider = document.getElementById('duration-slider');
const durationLabel = document.getElementById('duration-label');
const loadSlider = document.getElementById('load-slider');
const loadLabel = document.getElementById('load-label');
const easingBtns = document.querySelectorAll('.easing-btn');
const btnToggle = document.getElementById('btn-toggle');

// --- Easing functions (all take t in [0,1], return eased progress in [0,1]) ---
const EASINGS = {
  linear: t => t,
  easeInOutQuad: t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  easeOutBounce: t => {
    const n1 = 7.5625, d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
  // Custom JS cubic-bezier approximation via Newton-Raphson-free sampling
  cubicBezier: t => cubicBezierEase(0.17, 0.67, 0.35, 1.3, t),
};

function cubicBezierEase(x1, y1, x2, y2, t) {
  // Approximate cubic bezier easing by treating t as the parametric progress
  // (good enough for visualization; not a full x-solve like native CSS bezier)
  const u = 1 - t;
  return 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t;
}

let currentEasing = 'linear';
let running = true;

// --- Bounce animation driven by requestAnimationFrame ---
let bounceStart = null;
function animateBounce(now) {
  if (!bounceStart) bounceStart = now;
  const duration = Number(durationSlider.value);
  const elapsed = (now - bounceStart) % (duration * 2);
  const half = duration;
  let t, forward;
  if (elapsed < half) { t = elapsed / half; forward = true; }
  else { t = (elapsed - half) / half; forward = false; }

  const eased = EASINGS[currentEasing](t);
  const progress = forward ? eased : 1 - eased;
  const trackWidth = stageTrack.clientWidth - 46;
  ball.style.left = (10 + progress * trackWidth) + 'px';
  ball.style.top = (Math.sin(progress * Math.PI) * -40) + 'px';
}

// --- Artificial main-thread load simulation ---
function burnCpu(level) {
  if (level === 0) return;
  const iterations = level * 40000;
  let x = 0;
  for (let i = 0; i < iterations; i++) x += Math.sqrt(i);
}

// --- FPS measurement loop ---
let lastTime = performance.now();
let frameSamples = [];
const MAX_SAMPLES = 30;
const graphHistory = [];
const MAX_GRAPH_POINTS = 60;

function loop(now) {
  if (!running) return;

  const delta = now - lastTime;
  lastTime = now;

  if (delta > 0) {
    frameSamples.push(delta);
    if (frameSamples.length > MAX_SAMPLES) frameSamples.shift();
    const avgDelta = frameSamples.reduce((a, b) => a + b, 0) / frameSamples.length;
    const fps = 1000 / avgDelta;

    fpsValueEl.textContent = Math.round(fps);
    frameTimeEl.textContent = avgDelta.toFixed(1);
    fpsValueEl.style.color = fps >= 50 ? '#86efac' : fps >= 30 ? '#fbbf24' : '#f87171';

    graphHistory.push(fps);
    if (graphHistory.length > MAX_GRAPH_POINTS) graphHistory.shift();
    drawGraph();
  }

  animateBounce(now);
  burnCpu(Number(loadSlider.value));

  requestAnimationFrame(loop);
}

function drawGraph() {
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = '#334155';
  ctx.beginPath();
  ctx.moveTo(0, h - (60 / 60) * h);
  ctx.lineTo(w, h - (60 / 60) * h);
  ctx.stroke();

  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  graphHistory.forEach((fps, i) => {
    const x = (i / (MAX_GRAPH_POINTS - 1)) * w;
    const y = h - Math.min(fps, 60) / 60 * h;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

easingBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    easingBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentEasing = btn.dataset.fn;
    bounceStart = null;
  });
});

durationSlider.addEventListener('input', () => {
  durationLabel.textContent = durationSlider.value + 'ms';
  bounceStart = null;
});

loadSlider.addEventListener('input', () => {
  loadLabel.textContent = loadSlider.value;
});

btnToggle.addEventListener('click', () => {
  running = !running;
  btnToggle.textContent = running ? 'Pause' : 'Resume';
  if (running) { lastTime = performance.now(); requestAnimationFrame(loop); }
});

requestAnimationFrame(loop);`,

  seo: {
    title: 'requestAnimationFrame FPS Meter & Easing Visualizer',
    description: 'Live requestAnimationFrame FPS meter with real frame-delta timing and an easing-function visualizer. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'requestAnimationFrame FPS Measurement and Easing Function Visualization Explained',
      description: `Smooth animation on the web is a function of two independent things: how consistently the browser can paint new frames (frame rate), and how the value being animated changes over time (the easing curve). This snippet builds a real, working instrument for both — a genuine \`requestAnimationFrame\`-based FPS meter that measures actual frame-to-frame timing, paired with a bouncing ball whose motion is driven by selectable easing functions, so you can watch how easing shapes perceived motion while simultaneously monitoring whether the browser is actually hitting your target frame rate.

**How requestAnimationFrame timing actually works**

\`requestAnimationFrame(callback)\` schedules \`callback\` to run once, right before the browser's next repaint, and passes it a single argument: a high-resolution timestamp (in milliseconds, from the same clock as \`performance.now()\`) representing when that frame's paint cycle began. Critically, the browser does not guarantee a fixed interval between calls — it targets the display's refresh rate (typically 60Hz, but 90/120/144Hz on modern displays and variable-refresh setups), and it will skip frames entirely if the main thread is busy. This demo's \`loop(now)\` function captures that timestamp, computes \`delta = now - lastTime\` — the actual milliseconds elapsed since the previous frame — and that delta, not any fixed assumption, is the raw signal every FPS meter must be built from.

**From frame delta to a stable FPS number**

A single frame's instantaneous FPS (\`1000 / delta\`) is far too noisy to display directly — one slightly delayed frame would make the number jump wildly. This demo keeps a rolling window of the last 30 frame deltas in the \`frameSamples\` array, averages them, and only then converts to FPS: \`1000 / avgDelta\`. This rolling-average technique is the same smoothing approach used by real browser DevTools performance panels and game engine debug overlays, and it's what makes the displayed number in this demo (and the \`<canvas>\`-drawn history graph beneath it) readable rather than flickering unusably between frames.

**Using artificial load to see FPS actually drop**

To make the meter's purpose concrete, this demo includes a "main-thread load" slider that runs a deliberately wasteful synchronous loop (\`burnCpu()\`, summing square roots for N iterations) inside the animation loop itself. Because \`requestAnimationFrame\` callbacks run on the main thread and block the next paint until they return, adding CPU work here directly delays subsequent frames — dragging the slider up is the fastest way to watch the FPS number and graph genuinely degrade from 60 toward 30 or lower in real time, demonstrating exactly why long synchronous JavaScript tasks are the primary cause of janky animation in real applications.

**Easing functions: shaping progress, not position**

An easing function is a pure mathematical mapping from linear time progress \`t\` (0 to 1) to eased progress (also typically 0 to 1, though bounce/back easings can briefly exceed that range). This demo implements four: \`linear\` (\`t => t\`, constant velocity — the "obviously not human-designed" baseline), \`easeInOutQuad\` (a quadratic curve that starts and ends slow, speeds up through the middle — the standard curve for most UI micro-interactions), \`easeOutBounce\` (a piecewise function simulating physical bounce decay, useful for playful confirmation animations), and a JS approximation of a \`cubic-bezier(.17,.67,.35,1.3)\` curve — the same control-point model CSS's \`cubic-bezier()\` timing function uses, here approximated by directly weighting the bezier control points against \`t\` rather than solving the parametric x(t) inversion a true bezier requires, which keeps the math approachable while still visibly demonstrating an overshoot curve.

**Why frame timing and easing choice are linked in practice**

An aggressive bounce or overshoot easing amplifies the visual cost of dropped frames — a linear animation missing a frame is barely perceptible, but a bounce animation missing frames near its peak velocity reads as an obvious stutter. This is precisely why this demo puts the FPS meter and the easing selector in the same view: understanding animation performance requires seeing both signals together, exactly as a developer profiling real jank in a production animation would.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch the FPS number and graph', text: 'The large green number is a 30-frame rolling average FPS computed from real requestAnimationFrame timestamp deltas, and the canvas beneath it plots the last 60 samples as a line graph with a reference line at 60fps, so you can see stability, not just a single instantaneous number.' },
        { title: 'Switch easing functions', text: 'Click linear, easeInOutQuad, easeOutBounce, or the cubic-bezier button to change which EASINGS function drives the ball\'s horizontal progress calculation in animateBounce(). Compare how the same bounce duration feels dramatically different depending purely on the eased-progress curve.' },
        { title: 'Adjust the bounce duration', text: 'The duration slider sets the half-cycle duration in milliseconds used inside animateBounce() — the ball travels forward across this duration, then reverses using the same easing for the return trip, so a full round trip takes 2x the slider value.' },
        { title: 'Crank up the artificial load slider', text: 'Drag "Artificial main-thread load" above 0 to make burnCpu() run a wasteful synchronous loop inside every animation frame. Watch the FPS number and graph genuinely drop as this loop delays the next requestAnimationFrame callback — this is a live demonstration of main-thread blocking causing dropped frames, not a simulated number.' },
        { title: 'Pause and resume the loop', text: 'Click Pause to stop calling requestAnimationFrame entirely (running = false short-circuits the loop function), freezing both the FPS meter and the ball. Click Resume to reset lastTime to the current timestamp before restarting, avoiding one artificially huge delta from the paused gap.' },
        { title: 'Export and adapt the FPS meter', text: 'Click JSX or Vue to export. The rolling-average FPS pattern (loop, frameSamples array, avgDelta calculation) is directly reusable as a standalone performance overlay in any project — wrap the loop() function in a React useEffect with a cleanup that cancels the animation frame on unmount.' },
      ],
    },
    features: [
      'Real requestAnimationFrame(now) loop reading the browser-provided high-resolution timestamp each frame',
      'Rolling 30-frame average smooths raw per-frame delta into a stable, readable FPS number',
      'Canvas-drawn 60-sample history graph with a 60fps reference line for visual stability tracking',
      'burnCpu() artificial main-thread load slider demonstrates real, measurable frame drops from blocking JS',
      'Four selectable easing functions: linear, easeInOutQuad, piecewise easeOutBounce, and a cubic-bezier approximation',
      'Ball position computed each frame from eased progress, not CSS transitions — pure JS-driven motion',
      'FPS number color-codes green/amber/red at 50fps and 30fps thresholds for at-a-glance health reading',
      'Pause/Resume correctly resets lastTime on resume to avoid one artificially inflated delta sample',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching how requestAnimationFrame timestamps and delta timing work', desc: 'Many developers use requestAnimationFrame without ever reading the timestamp argument it provides. This demo makes the now - lastTime delta calculation the visible core of the FPS number, showing concretely why frame timing must be measured from real timestamps rather than assumed to be a fixed 16.67ms (60fps) interval.' },
      { icon: 'APP', title: 'Diagnosing why an animation feels janky in a real app', desc: 'Drag the artificial load slider to reproduce, in isolation, the exact class of problem that causes production animation jank — expensive synchronous work running on the main thread during an animation loop. Developers can use the same rolling-average FPS pattern as a lightweight debug overlay dropped into a real app to catch regressions before they ship.' },
      { icon: 'DESIGN', title: 'Choosing the right easing curve for a specific interaction', desc: 'Comparing linear, easeInOutQuad, and easeOutBounce side by side on the same duration and distance makes it obvious which curve suits a given interaction — linear rarely looks intentional in UI, easeInOutQuad suits most transitions and reveals, and bounce suits playful confirmation or celebratory moments, informing easing choices in the [Web Animations API Playground](/ui-snippets/web-animations-api-playground) or any CSS transition-timing-function.' },
      { icon: 'CODE', title: 'Building a reusable performance-monitoring overlay', desc: 'The FPS-measurement half of this snippet (the loop, frameSamples rolling window, and canvas graph) is directly extractable as a standalone dev-mode performance HUD, similar to stats.js, for any canvas-heavy, animation-heavy, or WebGL application where visually confirming real frame health during development matters.' },
      { icon: 'FLOW', title: 'Prototyping physically-motivated motion for game-like interfaces', desc: 'The easeOutBounce implementation is a piecewise physical bounce-decay approximation useful well beyond this demo — drag-and-drop card snap-back, notification toasts settling into place, or game UI elements landing after a throw gesture all benefit from the same bounce math, adaptable by changing which property (position, scale, opacity) the eased progress value drives.' },
      { icon: 'CODE', title: 'Related: Week View Scheduler', desc: 'See the [Week View Scheduler](/ui-snippets/week-view-scheduler/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is my FPS number jumping around wildly without averaging?', a: 'A single frame\'s instantaneous FPS (1000 / delta for that one frame) is extremely noisy — one frame delayed by even a few milliseconds by garbage collection, layout, or a background tab throttle produces a wildly different momentary number. This demo averages the last 30 frame deltas before converting to FPS, which is why the displayed number and graph are smooth and readable; always average several samples before displaying a live FPS metric in your own tools.' },
      { q: 'Why does the artificial load slider actually reduce FPS instead of just being cosmetic?', a: 'The burnCpu() function runs a real, synchronous, CPU-bound loop (summing square roots for tens of thousands of iterations) directly inside the requestAnimationFrame callback. Because JavaScript is single-threaded and the browser cannot paint the next frame until the current callback returns, this loop directly delays every subsequent frame by however long it takes to execute — the FPS drop you see is a genuine measurement of main-thread blocking, not a simulated or faked value.' },
      { q: 'What is the difference between the easing functions used here and CSS easing keywords?', a: 'The CSS keywords ease, ease-in, ease-in-out, and linear are themselves predefined cubic-bezier() curves under the hood. This demo\'s linear and easeInOutQuad are hand-written JS equivalents of similar shapes, while its cubicBezier function approximates an actual four-control-point bezier curve (matching the same x1,y1,x2,y2 parameter model CSS cubic-bezier() takes) by directly weighting progress against the y-control-points, which is simpler than a true bezier x(t) solve but visually demonstrates the same overshoot behavior.' },
      { q: 'Does requestAnimationFrame always fire at 60 times per second?', a: 'No — requestAnimationFrame targets the display\'s actual refresh rate, which can be 60Hz, 90Hz, 120Hz, or 144Hz on modern hardware, and it is throttled or entirely paused when a tab is backgrounded or a device is in low-power mode. This is exactly why frame timing must be measured from the timestamp argument passed to your callback rather than assumed — this demo\'s FPS number will genuinely read higher than 60 on a 120Hz+ display with light load, which is correct, real behavior.' },
      { q: 'Should I use requestAnimationFrame or CSS animations for a bouncing UI element?', a: 'For simple, non-interactive motion, a CSS animation (or the [Web Animations API](/ui-snippets/web-animations-api-playground)) is usually preferable since it can run on the compositor thread and is less likely to be blocked by main-thread JavaScript. Reach for a hand-rolled requestAnimationFrame loop, as this demo does, when you need per-frame custom easing math, need to read live position for hit-testing or physics, or specifically want to visualize and measure frame timing yourself as part of a debugging or educational tool.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain step by step how frameSamples and avgDelta turn a single noisy frame timestamp into the smooth FPS number on screen — understanding that rolling-average pattern is broadly reusable any time you need to measure real-time performance in the browser. You could also ask it to add a fifth easing function of your choosing (perhaps an elastic or back-out curve) following the same t-in-t-out signature as the existing EASINGS object, or to replace the burnCpu() artificial load simulation with a more realistic one (like forcing synchronous layout thrashing via repeated element.offsetHeight reads) to compare which kinds of main-thread work hurt frame rate the most. It's also a good target for a code-quality pass — ask whether the cubicBezier approximation should be replaced with a proper Newton-Raphson x(t) solve to match real CSS cubic-bezier() behavior more precisely.`,
      prompt: `Build a live requestAnimationFrame FPS meter combined with a selectable easing-function visualizer in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A requestAnimationFrame-driven loop that reads the timestamp argument passed to its callback each frame, computes the delta versus the previous frame's timestamp, and maintains a rolling window (e.g. the last 30 samples) that gets averaged into a displayed FPS number and a ms-per-frame number, both using real measured timing rather than any hardcoded assumption.
- A small canvas-based line graph plotting recent FPS history (roughly the last 60 samples) with a reference line at 60fps, redrawn every frame from the same rolling data used for the numeric readout.
- A ball or box that bounces back and forth across a track, with its position each frame computed from an eased progress value (0 to 1) rather than a CSS transition, so the position calculation is visible and controllable in JavaScript.
- At least three distinct, hand-written JavaScript easing functions (for example linear, an ease-in-out quadratic, and a piecewise bounce-decay function) selectable via buttons, all sharing the same t-in-progress-out function signature so swapping them is a one-line change in the animation loop.
- A slider that introduces deliberate, measurable main-thread load (a real synchronous CPU-bound loop, not a fake delay) inside the animation loop, so increasing it visibly and genuinely degrades the displayed FPS rather than just being decorative.
- A Pause/Resume control that fully stops calling requestAnimationFrame when paused, and correctly resets the delta-timing baseline on resume so the first frame after resuming doesn't register a huge artificial delta.
- Color-code the FPS readout (e.g. green above 50fps, amber above 30fps, red below) so frame-rate health is readable at a glance without reading the exact number.`,
    },
  },
};

export default rafFpsMeter;
