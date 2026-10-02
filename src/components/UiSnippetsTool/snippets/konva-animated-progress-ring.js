const konvaAnimatedProgressRing = {
  id: 'konva-animated-progress-ring',
  title: 'Konva Animated Progress Ring',
  lastmod: '2026-09-17',
  category: 'loaders',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/konva@9.3.16/konva.min.js'],
  html: `<div class="kpr-stage">
  <div class="kpr-head">
    <span class="kpr-tag">Konva · Animation loop</span>
    <h2>Animated Progress Ring</h2>
    <p>A canvas arc animated frame-by-frame with Konva.Animation, not CSS.</p>
  </div>
  <div id="kprContainer" class="kpr-container"></div>
  <div class="kpr-controls">
    <button class="kpr-btn" data-target="35">35%</button>
    <button class="kpr-btn" data-target="68">68%</button>
    <button class="kpr-btn" data-target="92">92%</button>
    <button class="kpr-btn" data-target="100">100%</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 100% at 50% 0%,#161d38,#080a14);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.kpr-stage{width:min(400px,94vw);display:flex;flex-direction:column;align-items:center;gap:18px}
.kpr-head{text-align:center}
.kpr-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#34d399;background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.3);padding:5px 12px;border-radius:99px;margin-bottom:12px}
.kpr-head h2{font-size:clamp(22px,5vw,30px);font-weight:800;letter-spacing:-.02em}
.kpr-head p{font-size:13px;color:#8e97b8;margin-top:7px}

.kpr-container{width:220px;height:220px;border-radius:50%;background:radial-gradient(circle at 50% 40%,#151a34,#0a0d1c)}
.kpr-controls{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.kpr-btn{padding:8px 16px;border-radius:99px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#c3cbe8;font:600 12.5px system-ui;cursor:pointer;transition:background .18s,border-color .18s,color .18s}
.kpr-btn:hover{background:rgba(255,255,255,.09);color:#fff;border-color:#34d399}`,

  js: `var SIZE = 220;
var RADIUS = 84;
var STROKE = 14;

var stage = new Konva.Stage({ container: 'kprContainer', width: SIZE, height: SIZE });
var layer = new Konva.Layer();
stage.add(layer);

var center = { x: SIZE / 2, y: SIZE / 2 };

var track = new Konva.Circle({
  x: center.x,
  y: center.y,
  radius: RADIUS,
  stroke: 'rgba(255,255,255,0.08)',
  strokeWidth: STROKE
});
layer.add(track);

// A custom sceneFunc gives full control over how the arc is drawn each
// frame: Konva calls this function with a 2D context and expects normal
// canvas drawing calls, then handles stroking/caching around it.
var progressArc = new Konva.Shape({
  sceneFunc: function (ctx, shape) {
    var angle = (shape.getAttr('progressAngle') || 0);
    ctx.beginPath();
    ctx.arc(center.x, center.y, RADIUS, -Math.PI / 2, -Math.PI / 2 + angle, false);
    ctx.strokeShape(shape);
  },
  stroke: '#34d399',
  strokeWidth: STROKE,
  lineCap: 'round'
});
progressArc.setAttr('progressAngle', 0);
layer.add(progressArc);

var label = new Konva.Text({
  text: '0%',
  fontSize: 30,
  fontStyle: '700',
  fontFamily: 'system-ui, sans-serif',
  fill: '#fff',
  width: SIZE,
  align: 'center',
  y: center.y - 18
});
layer.add(label);

layer.draw();

var currentPercent = 0;
var targetPercent = 0;
var anim = null;

function animateTo(target) {
  targetPercent = target;
  if (anim) anim.stop();

  // Konva.Animation runs a callback on every animation frame via
  // requestAnimationFrame internally, receiving a frame object with
  // timing info (frame.time, frame.timeDiff) for frame-rate-independent motion.
  var speed = 0.05; // percent per millisecond-scaled step, applied via timeDiff
  anim = new Konva.Animation(function (frame) {
    var diff = targetPercent - currentPercent;
    if (Math.abs(diff) < 0.15) {
      currentPercent = targetPercent;
      anim.stop();
    } else {
      currentPercent += diff * Math.min(1, (frame.timeDiff / 1000) * 4);
    }
    var angle = (currentPercent / 100) * Math.PI * 2;
    progressArc.setAttr('progressAngle', angle);
    label.text(Math.round(currentPercent) + '%');
  }, layer);

  anim.start();
}

document.querySelectorAll('.kpr-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    animateTo(parseFloat(btn.dataset.target));
  });
});

animateTo(68);`,

  seo: {
    title: 'Konva Animated Progress Ring — Canvas Arc Loader Snippet',
    description: 'A circular progress ring drawn with a custom Konva.Shape sceneFunc and animated frame-by-frame with a real Konva.Animation render loop, not CSS transitions. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Konva Animated Progress Ring — A Real Render Loop, Not CSS',
      description: `Most progress rings on the web are CSS: a \`conic-gradient\` or a stroke-dashoffset trick on an SVG circle, eased with \`transition\`. Those work, but they hand control of the animation entirely to the browser's CSS engine — you can't easily read the current value mid-animation, ease it non-linearly based on live state, or drive it from anything other than a start/end pair. This snippet instead draws the ring with Konva on a \`<canvas>\` and drives it with an actual per-frame JavaScript loop, \`Konva.Animation\`.

## Drawing an arc with a custom sceneFunc

Konva ships a \`Konva.Arc\` shape, but this snippet uses the more general \`Konva.Shape\` with a custom \`sceneFunc\` to make the underlying mechanism explicit:

\`ctx.arc(center.x, center.y, RADIUS, -Math.PI / 2, -Math.PI / 2 + angle, false);\`
\`ctx.strokeShape(shape);\`

\`sceneFunc\` receives the raw 2D canvas context and the shape instance, and Konva calls it on every redraw. \`ctx.arc\` starts at \`-Math.PI / 2\` (12 o'clock, since canvas angle 0 is 3 o'clock and increases clockwise) and sweeps to \`-Math.PI/2 + angle\`, where \`angle\` is stored as a custom attribute on the shape (\`shape.getAttr('progressAngle')\`) rather than hardcoded — the arc redraws itself correctly however that attribute changes. \`ctx.strokeShape(shape)\` hands the path off to Konva's own stroke/fill pipeline (respecting \`stroke\`, \`strokeWidth\`, \`lineCap\` set on the shape) instead of calling \`ctx.stroke()\` directly, so the shape still participates in Konva's caching and hit-detection systems.

## The animation loop

\`Konva.Animation\` is Konva's wrapper around \`requestAnimationFrame\`: you give it a function and a layer, and it calls your function once per frame with a \`frame\` object carrying \`frame.time\` (elapsed ms since the animation started) and \`frame.timeDiff\` (ms since the previous frame), then automatically redraws the layer after your callback returns.

\`currentPercent += diff * Math.min(1, (frame.timeDiff / 1000) * 4);\`

Rather than linearly stepping toward the target by a fixed amount per frame (which would run at different speeds on different refresh rates), the step size is scaled by \`frame.timeDiff\`, making the animation's real-world duration consistent whether the browser is running at 60fps or 120fps. The \`diff * factor\` formula is an **ease-out**: the step size shrinks as \`currentPercent\` approaches \`targetPercent\`, so the ring decelerates into its final value rather than stopping abruptly — once the remaining difference drops under \`0.15\`, the loop snaps to the exact target and calls \`anim.stop()\`.

## Restarting mid-animation

Each call to \`animateTo()\` stops any animation already in progress (\`if (anim) anim.stop()\`) before starting a new one from the *current* value of \`currentPercent\` — not from wherever the target buttons think the ring should be. That's why clicking a new percentage button while the ring is still moving smoothly redirects it rather than jumping or restarting from zero.

## The label updates from the same loop

\`label.text(Math.round(currentPercent) + '%')\` is set inside the same animation callback as the arc angle, so the numeric label and the visual sweep are always perfectly in sync — there's a single source of truth (\`currentPercent\`) driving both.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Konva CDN', text: 'Include konva.min.js from the CDN panel — it attaches a global Konva object.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A ring animates in to 68% on load.' },
      { title: 'Click a percentage button', text: 'The ring eases toward the new target from wherever it currently is.' },
      { title: 'Read the live label', text: 'The center percentage updates every frame from the same value driving the arc.' },
      { title: 'Adjust the easing feel', text: 'Change the 4 multiplier in the timeDiff calculation for a faster or slower settle.' },
      { title: 'Reuse for other metrics', text: 'Call animateTo(n) from anywhere — a fetch callback, a form handler, a timer.' },
    ] },
    features: [
      { title: 'Custom sceneFunc arc', text: 'A Konva.Shape draws the arc directly with canvas ctx.arc, not a prebuilt Arc node.' },
      { title: 'Real Konva.Animation loop', text: 'A requestAnimationFrame-backed callback drives the arc every frame.' },
      { title: 'Frame-rate-independent easing', text: 'Step size scales by frame.timeDiff so speed is consistent across refresh rates.' },
      { title: 'Ease-out settle', text: 'The step shrinks as the value approaches target, then snaps at a small threshold.' },
      { title: 'Live, redirectable target', text: 'Clicking a new target mid-animation eases from the current value, not zero.' },
      { title: 'Synced center label', text: 'The percentage text reads from the same variable driving the arc angle.' },
      { title: 'Custom shape attribute', text: 'progressAngle is stored on the shape itself and read back inside sceneFunc.' },
      { title: 'Clean track + arc layering', text: 'A static full-circle track sits beneath the animated progress arc.' },
    ],
    useCases: [
      { title: 'Upload and processing progress', text: 'Show precise, JavaScript-driven progress for file operations, drawing the arc directly with canvas `ctx.arc` inside a custom `Konva.Shape`.' },
      { title: 'Dashboard KPI rings', text: 'Display goal completion or utilisation rings that animate to new targets, with step size scaled by `frame.timeDiff` for consistent speed.' },
      { title: 'Canvas animation loop teaching', text: 'Use it as a concrete reference for `Konva.Animation`, a `requestAnimationFrame` loop you can start, stop and tune.' },
      { title: 'Onboarding step progress', text: 'Show how far through a flow a user is, with the step shrinking as the value nears target and snapping at a small threshold.' },
      { title: 'Gamified XP meters', text: 'Fill experience or completion rings in a game or course that visibly ease toward their targets instead of jumping straight there.' },
    ],
    faqs: [
      { q: 'Why use a custom sceneFunc instead of Konva.Arc?', a: 'Konva.Arc works too, but a custom sceneFunc makes the drawing mechanism explicit and gives full control over exactly how the angle attribute maps to the canvas arc call \\u2014 useful when you want non-standard behavior later, like a gapped or dashed progress arc.' },
      { q: 'What do frame.time and frame.timeDiff give you?', a: 'Konva.Animation calls its callback with a frame object every animation frame. frame.time is elapsed milliseconds since the animation started; frame.timeDiff is milliseconds since the previous frame. Scaling the per-frame step by timeDiff keeps the animation\\u2019s real-world speed consistent regardless of the display\\u2019s refresh rate.' },
      { q: 'Why does the ring decelerate instead of moving at a constant speed?', a: 'The step formula is diff * factor, where diff is the remaining distance to the target. As the ring gets closer, diff shrinks, so the step shrinks too \\u2014 a simple ease-out. A small threshold (0.15) then snaps the last fraction of a percent to the exact target and stops the loop.' },
      { q: 'What happens if I click a new target while it\\u2019s still animating?', a: 'animateTo() stops the existing Konva.Animation and starts a new one, but currentPercent is a variable outside the animation closure, so the new animation continues from wherever the ring currently is rather than resetting to zero or jumping.' },
      { q: 'Why store the angle as a custom shape attribute instead of a plain JS variable?', a: 'setAttr/getAttr ties the value to the Konva node itself, which keeps sceneFunc self-contained \\u2014 it reads everything it needs from the shape it\\u2019s drawing, rather than depending on an external closure variable, which matters more once you have multiple progress rings on the same page.' },
      { q: 'How would I animate the stroke color along with the percentage, like green to red?', a: 'Inside the animation callback, interpolate an RGB color based on currentPercent / 100 (e.g. lerp between two color arrays) and set progressArc.stroke(interpolatedColor) each frame alongside the angle update.' },
    ],
    aiPrompt: {
      paragraph: `The core mechanism worth understanding here is the animation loop's easing, not the arc drawing. Paste the code into an AI assistant like Claude and ask it to explain exactly how frame.timeDiff makes the ring's animation speed independent of the browser's refresh rate, and why the step formula diff * Math.min(1, (frame.timeDiff/1000)*4) produces a decelerating ease rather than constant-speed motion. Then ask what would happen if targetPercent were changed mid-flight without stopping the previous Konva.Animation first \\u2014 a good way to surface why anim.stop() before starting a new one matters. To extend it: interpolate the stroke color based on progress (e.g. amber below 50%, green above), add a pulsing glow effect when the ring hits 100%, support multiple independent rings on one page by removing the closure-based globals, or swap the linear ease-out for a proper cubic easing function.`,
      prompt: `Build an animated circular progress ring using Konva.js (v9, from a CDN) in plain HTML, CSS, and JavaScript.

Requirements:
- A Konva.Stage and Layer sized to fit a ring with a static background track circle (a Konva.Circle with just a stroke, no fill) and a progress arc drawn as a Konva.Shape with a custom sceneFunc that calls ctx.arc(centerX, centerY, radius, -Math.PI/2, -Math.PI/2 + angle, false) followed by ctx.strokeShape(shape), where angle is read from a custom shape attribute (via getAttr/setAttr) rather than a hardcoded value.
- A centered Konva.Text label showing the current percentage, positioned in the middle of the ring.
- Animate the arc using a real Konva.Animation (NOT a CSS transition and not a plain setInterval) whose callback receives a frame object and uses frame.timeDiff to scale the per-frame step, so the animation speed is consistent across different display refresh rates.
- The animation should ease out: the step size should shrink as the current value approaches the target (e.g. step = (target - current) * some rate-limited factor), snapping to the exact target once the remaining difference is very small, then stopping the Konva.Animation.
- Keep the current percentage in a variable outside the animation closure so that starting a new animateTo(target) call while a previous one is still running continues smoothly from the current value instead of jumping.
- Provide 4 buttons for different target percentages (e.g. 35%, 68%, 92%, 100%) that each call animateTo with their value, always stopping any in-flight animation first.
- Update the center label text every frame from the same value driving the arc, so they never desync.
- Style it as a dark circular panel with a colored progress stroke and rounded line caps.`,
    },
  },
};

export default konvaAnimatedProgressRing;
