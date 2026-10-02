const cursorTrailParticleBrush = {
  id: 'cursor-trail-particle-brush',
  title: 'Cursor Particle Brush Trail',
  lastmod: '2026-08-23',
  category: 'animations',
  cdnUrls: [],
  html: `<section class="ctp-wrap">
  <span class="ctp-tag">canvas 2d · lingering brush stroke</span>
  <h1>Paint with your cursor</h1>
  <p>Move over the canvas \\u2014 particles linger and slowly fade like a brush stroke, instead of vanishing instantly behind the cursor.</p>

  <div class="ctp-stage">
    <canvas class="ctp-canvas" id="ctpCanvas"></canvas>
  </div>

  <button type="button" class="ctp-clear" id="ctpClear">Clear canvas</button>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#150e28,#050308 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.ctp-wrap{width:100%;max-width:680px;text-align:center}
.ctp-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7dd3fc;background:rgba(125,211,252,.1);border:1px solid rgba(125,211,252,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.ctp-wrap h1{font-size:clamp(26px,5.5vw,36px);font-weight:800;letter-spacing:-.02em}
.ctp-wrap p{font-size:13.5px;color:#a9b0c9;margin-top:8px;line-height:1.6}

.ctp-stage{margin:22px 0 16px;border-radius:16px;overflow:hidden;border:1px solid rgba(125,211,252,.2);background:#050710}
.ctp-canvas{display:block;width:100%;height:340px;cursor:crosshair;touch-action:none}

.ctp-clear{padding:11px 22px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#e8e2f5;font:700 13px system-ui;cursor:pointer}
.ctp-clear:hover{background:rgba(255,255,255,.11)}`,

  js: `var canvas = document.getElementById('ctpCanvas');
var ctx = canvas.getContext('2d');
var clearBtn = document.getElementById('ctpClear');

var DPR = Math.min(2, window.devicePixelRatio || 1);
var W = 0, H = 0;

function resize() {
  var rect = canvas.getBoundingClientRect();
  W = rect.width; H = rect.height;
  canvas.width = W * DPR;
  canvas.height = H * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
window.addEventListener('resize', resize);
resize();

var HUES = [200, 260, 320, 20, 160];
var hueIndex = 0;

// Each particle is a persistent object with its own remaining life, unlike a
// typical instantaneous mouse trail that erases the previous frame entirely.
// Particles accumulate on a long-lived array and are painted with decreasing
// opacity every frame until their life reaches zero \\u2014 a lingering brush
// stroke rather than a disappearing pointer trail.
var particles = [];
var MAX_LIFE = 90; // frames \\u2014 roughly 1.5s at 60fps, a long linger
var last = null;

function spawn(x, y) {
  var hue = HUES[hueIndex % HUES.length];
  var n = 3;
  for (var i = 0; i < n; i++) {
    particles.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      r: 3 + Math.random() * 4,
      hue: hue + (Math.random() - 0.5) * 20,
      life: MAX_LIFE,
      maxLife: MAX_LIFE,
    });
  }
}

function pointFromEvent(e) {
  var rect = canvas.getBoundingClientRect();
  var t = e.touches ? e.touches[0] : e;
  return { x: t.clientX - rect.left, y: t.clientY - rect.top };
}

function paintTo(x, y) {
  if (last) {
    // Interpolate along the segment from the last point so a fast swipe still
    // paints a continuous stroke instead of sparse, disconnected dots.
    var dist = Math.hypot(x - last.x, y - last.y);
    var steps = Math.max(1, Math.floor(dist / 4));
    for (var s = 0; s < steps; s++) {
      var t = s / steps;
      spawn(last.x + (x - last.x) * t, last.y + (y - last.y) * t);
    }
  } else {
    spawn(x, y);
  }
  last = { x: x, y: y };
  hueIndex++;
}

function frame() {
  // Slow, additive fade: each frame paints over the existing pixels with a
  // very low-alpha clear instead of a full clearRect, so old particles fade
  // gradually rather than disappearing the instant the next frame draws.
  ctx.fillStyle = 'rgba(5,7,16,0.06)';
  ctx.fillRect(0, 0, W, H);

  for (var i = particles.length - 1; i >= 0; i--) {
    var p = particles[i];
    p.life -= 1;
    if (p.life <= 0) { particles.splice(i, 1); continue; }
    var alpha = p.life / p.maxLife;
    ctx.beginPath();
    ctx.fillStyle = 'hsla(' + p.hue + ', 90%, 65%, ' + (alpha * 0.85) + ')';
    ctx.arc(p.x, p.y, p.r * (0.5 + alpha * 0.5), 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(frame);
}

var pointerDown = false;
canvas.addEventListener('mousedown', function (e) { pointerDown = true; last = null; paintTo(pointFromEvent(e).x, pointFromEvent(e).y); });
canvas.addEventListener('mousemove', function (e) {
  var p = pointFromEvent(e);
  // Paint continuously on hover (matching a "brush that follows the cursor"),
  // and still respond to an active mouse-down drag identically.
  paintTo(p.x, p.y);
});
window.addEventListener('mouseup', function () { pointerDown = false; last = null; });
canvas.addEventListener('mouseleave', function () { last = null; });

canvas.addEventListener('touchstart', function (e) { e.preventDefault(); last = null; var p = pointFromEvent(e); paintTo(p.x, p.y); }, { passive: false });
canvas.addEventListener('touchmove', function (e) { e.preventDefault(); var p = pointFromEvent(e); paintTo(p.x, p.y); }, { passive: false });
canvas.addEventListener('touchend', function () { last = null; });

clearBtn.addEventListener('click', function () {
  particles = [];
  last = null;
  ctx.clearRect(0, 0, W, H);
});

requestAnimationFrame(frame);`,

  seo: {
    title: 'Cursor Particle Brush Trail — Free Canvas Lingering Trail Snippet',
    description: `Moving the cursor over a canvas paints particles that persist and slowly fade over roughly 1.5 seconds, like a lingering brush stroke rather than an instant mouse trail. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Cursor Particle Brush Trail — A Stroke That Lingers, Not a Trail That Vanishes',
      description: `Most cursor-trail effects erase the previous frame completely and redraw, so the "trail" only ever spans the last few pixels behind the pointer. This snippet does the opposite on purpose: every particle it spawns has its own life counter and keeps rendering, fading gradually, for about 1.5 seconds — moving the cursor slowly leaves a visible, lingering stroke behind it, closer to a paintbrush than a comet tail.

**Persistent particles with individual life, not a cleared-and-redrawn trail**

Each particle pushed into the \`particles\` array carries its own \`life\`/\`maxLife\` pair. Every animation frame decrements every particle's \`life\` and removes it only once that reaches zero — particles from several frames ago are still being drawn (at lower opacity) alongside particles spawned this frame. That's the entire difference from a typical trail effect, where old points are gone the instant the next frame paints.

**A near-transparent fill instead of clearRect**

Rather than \`ctx.clearRect()\`, every frame paints \`ctx.fillRect()\` with a background color at a very low alpha (\`rgba(5,7,16,0.06)\`) over the whole canvas. Because that fill only partially obscures what's underneath, particles already on the canvas darken and fade gradually across many frames instead of disappearing in one step — the canvas equivalent of watercolor drying rather than a whiteboard eraser.

**Interpolating between mouse positions**

A fast swipe can jump many pixels between two consecutive \`mousemove\` events, which would otherwise paint sparse, disconnected dots. \`paintTo()\` measures the distance from the last painted point and spawns particles at evenly interpolated positions along that segment (roughly every 4px), so even a quick motion leaves a continuous stroke rather than a dashed line.

**Opacity and radius both track remaining life**

Each particle's \`alpha\` is simply \`life / maxLife\`, applied to its \`hsla\` fill color, and its radius shrinks slightly as life drains (\`r * (0.5 + alpha * 0.5)\`) — combining a fade with a subtle shrink is what makes a lingering particle read as dissipating paint rather than a static dot that abruptly blinks out.

**Customizing it**

Change \`MAX_LIFE\` for a shorter or longer-lingering stroke, adjust the background fill's alpha for a faster or slower fade, swap the \`HUES\` array for a different palette, or spawn more particles per point for a denser brush. Pair it with [canvas audio frequency bars](/ui-snippets/canvas-audio-bars/) as another real-time canvas rendering reference, or [hover image trail](/ui-snippets/hover-image-trail/) for an image-based cursor trail instead.`,
    },
    howToUse: { type: 'steps', items: [
      { title: `Paste HTML, CSS, and JS`, text: `An empty dark canvas renders with a Clear canvas button.` },
      { title: `Move the cursor over the canvas`, text: `Colorful particles paint along the path and linger.` },
      { title: `Move slowly vs. quickly`, text: `Slow motion leaves a dense stroke; fast motion a lighter one.` },
      { title: `Wait without moving`, text: `The existing stroke keeps fading gradually on its own.` },
      { title: `Click Clear canvas`, text: `Instantly removes every particle and resets the canvas.` },
      { title: `Tune the linger`, text: `Change MAX_LIFE and the background fill's alpha.` },
    ] },
    features: [
      { title: `Lingering particle life`, text: `Each particle fades over ~1.5s, not the next frame.` },
      { title: `Low-alpha fill, not clearRect`, text: `A translucent overlay ages old strokes gradually.` },
      { title: `Segment interpolation`, text: `Fast swipes still paint a continuous stroke.` },
      { title: `Life-driven opacity and radius`, text: `Particles fade and shrink together as they age.` },
      { title: `Touch and mouse painting`, text: `Identical brush behavior on both input types.` },
      { title: `Hover-continuous painting`, text: `No click required; the brush follows the cursor.` },
      { title: `One-tap clear`, text: `Resets both the particle list and the canvas pixels.` },
      { title: `DPR-aware canvas`, text: `Sized for crisp rendering on high-density displays.` },
    ],
    useCases: [
      { title: 'Playful landing sections', text: 'Reward pointer movement with particles that linger for about 1.5 seconds, like a brush stroke rather than a momentary trail.' },
      { title: 'Creative coding demos', text: 'Provide a canvas particle-system reference, where each particle carries its own life and fades in both opacity and radius as it ages.' },
      { title: 'Portfolio backgrounds', text: 'Pair with a [hover image trail](/ui-snippets/hover-image-trail/) for a portfolio that responds to the cursor in two different ways.' },
      { title: 'Kids\' drawing toys', text: 'Give a lightweight paint-like canvas to young users, with segment interpolation keeping fast swipes continuous instead of dotted.' },
      { title: 'Low-alpha fade technique', text: 'Learn why a translucent overlay, instead of `clearRect`, lets older strokes age gradually while new ones draw on top.' },
      { icon: 'CODE', title: 'Related: FLIP Technique List Reorder Animation', desc: 'See the [FLIP Technique List Reorder Animation](/ui-snippets/flip-list-reorder-animation/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `How do the particles linger instead of disappearing instantly?`, a: `Each particle object carries its own life and maxLife values. Every animation frame decrements every particle's life and only removes it from the array once life reaches zero — meaning particles spawned several frames ago are still drawn, just at progressively lower opacity, alongside particles spawned in the current frame. A typical instantaneous trail instead clears everything from the previous frame before drawing the new one, so nothing survives past a single frame.` },
      { q: `Why fillRect with a low-alpha color instead of clearRect?`, a: `clearRect wipes the canvas to fully transparent in one step, which would erase every particle immediately regardless of its own life value. Filling the whole canvas with a background color at a very low alpha each frame only partially obscures whatever was drawn underneath, so previously-painted particles darken and fade across many frames rather than vanishing the instant the next frame renders — this is what produces the "brush stroke drying" look instead of an instant wipe.` },
      { q: `How does it avoid painting disconnected dots during a fast swipe?`, a: `paintTo() measures the straight-line distance between the current pointer position and the last painted position, then spawns particles at several evenly-interpolated points along that segment (roughly one every 4px) instead of only at the two endpoints. Without this, a fast mouse movement that jumps many pixels between two mousemove events would leave visible gaps in the stroke.` },
      { q: `What makes a particle look like it's dissipating rather than just disappearing?`, a: `Each particle's opacity is computed directly from its remaining life (life / maxLife) and applied to its hsla fill color, while its drawn radius also shrinks slightly as life drains. Combining a fade with a subtle shrink — rather than only fading, or only shrinking — is what reads as dissipating paint instead of a static dot abruptly blinking out at the end of its life.` },
      { q: `How do I use this particle brush trail in React, Vue, or Angular?`, a: `Keep the particles array, the last-point reference, and the animation frame id in refs (not state), since they mutate every frame and should never trigger a re-render. Set up the canvas, resize listener, and requestAnimationFrame loop inside a mount effect, attach the pointer/touch listeners to the canvas ref, and cancel the animation frame and remove listeners in the effect's cleanup function.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the fade-persistence trick from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why filling the canvas each frame with a very low-alpha rectangle produces a gradually fading trail while clearRect would erase everything instantly, and how giving each particle its own life counter — rather than relying purely on the canvas fade — lets opacity and radius be computed precisely per particle instead of only approximated by how many frames of low-alpha overlay have accumulated on top of it. The same assistant can help you optimize it, for instance asking whether capping the maximum number of live particles would prevent a performance cliff if someone waves the cursor around continuously for a long time. It's also useful for extending the effect: ask it to vary particle size or hue based on cursor speed (faster movement producing smaller, more numerous particles), add a bloom-style glow using shadowBlur, or let the brush color cycle through a full rainbow over a longer stroke instead of a five-hue palette. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "cursor particle brush trail" in plain HTML, CSS, and JavaScript using the Canvas 2D API, where the trail lingers and slowly fades over roughly one to two seconds — distinct from a typical instantaneous mouse trail that disappears within a frame or two.

Requirements:
- A canvas sized to its container's actual pixel dimensions (accounting for devicePixelRatio for crisp rendering), redrawn every requestAnimationFrame tick via a single continuous render loop, not redrawn only on pointer events.
- Maintain a persistent array of particle objects, each with a position, a radius, a color, and a life value (plus the life value it started with). On every animation frame, decrement every particle's life and remove it from the array only once its life reaches zero — do not clear and fully redraw the particle set each frame.
- Instead of clearing the canvas with clearRect each frame, fill the entire canvas with a background-colored rectangle at a very low alpha (e.g. around 0.05-0.08). This must be the mechanism that makes older particles gradually darken and fade across many frames rather than disappearing instantly, since a full clearRect would erase everything immediately regardless of individual particle life.
- On pointer/touch movement over the canvas, spawn a small number of new particles at the current position with some random jitter in position, size, and hue. When the distance between the current point and the previous point exceeds a few pixels, interpolate and spawn particles along several evenly-spaced points between them (not just at the two endpoints) so a fast swipe still paints a continuous stroke instead of sparse disconnected dots.
- Each particle's rendered opacity and radius must both be derived from its current life divided by its starting life (not from the low-alpha canvas fill alone), so particles visibly shrink slightly as they fade rather than staying full-size until they vanish.
- Support both mouse (continuous painting on mousemove, no click required) and touch (touchstart/touchmove) input identically, with touch-action: none on the canvas so touch painting doesn't scroll the page, and provide a "Clear canvas" button that empties the particle array and clears the canvas pixels immediately.`,
    },
  },
};

export default cursorTrailParticleBrush;
