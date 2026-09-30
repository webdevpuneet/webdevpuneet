const paperJsVectorBlob = {
  id: 'paper-js-vector-blob',
  title: 'Paper.js Vector Blob',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.17/paper-full.min.js',
  ],
  html: `<div class="pb-wrap">
  <canvas id="pbCanvas" class="pb-canvas" resize></canvas>
  <p class="pb-hint">Move your cursor near the blob — it stretches toward it.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0c14;color:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden}
.pb-wrap{display:flex;flex-direction:column;align-items:center;gap:14px}
.pb-canvas{width:min(90vw,480px);height:min(60vh,360px);border-radius:24px;background:radial-gradient(circle at 30% 25%,#161c34,#0a0c14);border:1px solid #1e2440}
.pb-hint{font-size:12px;color:#6d7291}`,

  js: `paper.setup(document.getElementById('pbCanvas'));

const center = paper.view.center;
const POINTS = 10;
const BASE_RADIUS = 90;

// Build the blob from POINTS points arranged on a circle, each carrying its
// own random phase so the wobble never looks perfectly symmetric.
const points = [];
for (let i = 0; i < POINTS; i++) {
  const angle = (i / POINTS) * Math.PI * 2;
  points.push({
    angle,
    phase: Math.random() * Math.PI * 2,
    speed: 0.6 + Math.random() * 0.6,
  });
}

const path = new paper.Path({
  fillColor: {
    gradient: {
      stops: ['#818cf8', '#38bdf8', '#34d399'],
      radial: true,
    },
    origin: center,
    destination: center.add([BASE_RADIUS, 0]),
  },
  closed: true,
});

let mouse = center.clone();
let targetMouse = center.clone();

paper.view.onMouseMove = (event) => {
  targetMouse = event.point;
};

paper.view.onFrame = (event) => {
  // Ease the tracked mouse position so the pull toward the cursor feels
  // smooth rather than snapping every frame.
  mouse = mouse.add(targetMouse.subtract(mouse).multiply(0.08));

  path.segments = [];
  for (const p of points) {
    const wobble = Math.sin(event.time * p.speed + p.phase) * 10;
    let radius = BASE_RADIUS + wobble;

    const pointPos = center.add(
      new paper.Point({ angle: p.angle * 180 / Math.PI, length: radius })
    );

    // Mouse-reactive distortion: points closer to the cursor get pulled
    // outward toward it, proportional to proximity.
    const toMouse = mouse.subtract(pointPos);
    const dist = toMouse.length;
    const pull = Math.max(0, 1 - dist / 220) * 40;
    const distorted = pointPos.add(toMouse.normalize(pull || 0));

    path.add(distorted);
  }
  path.smooth({ type: 'continuous' });
};`,

  seo: {
    title: 'Paper.js Vector Blob — Free Mouse-Reactive Organic Shape Snippet',
    description: `An organic blob built from a Paper.js path that wobbles continuously and distorts toward the cursor, using onFrame and smooth continuous curves. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Paper.js Vector Blob — A Wobbling, Cursor-Reactive Organic Shape',
      description: `[Paper.js](http://paperjs.org) is a vector graphics scripting engine for the browser — it gives you a scene graph of \`Path\`, \`Point\`, and \`Segment\` objects with real vector math (\`.add\`, \`.subtract\`, \`.normalize\`, \`.length\`) instead of raw canvas pixel pushing. This snippet uses that to build an organic blob: ten points arranged on a circle, each with an independent sine-wave wobble, smoothed into a continuous curve and redrawn every frame via \`paper.view.onFrame\` — with the whole shape leaning toward the cursor as it moves nearby.

**Points, not a fixed path**

Rather than drawing one static \`Path\` and animating its transform, this snippet rebuilds the path's \`segments\` from scratch every frame. Ten anchor points sit on a circle at even angular intervals, each carrying its own random \`phase\` and \`speed\` so \`Math.sin(time * speed + phase)\` produces a wobble that's never in sync across points — that desynchronization is what makes the blob read as organic rather than a pulsing circle.

**Continuous smoothing turns points into curves**

After the ten distorted points are added, \`path.smooth({ type: 'continuous' })\` converts the straight-line polygon between them into a smooth, C1-continuous curve — Paper.js computes handle positions automatically so there's no visible corner even where a point moves sharply between frames. This single call is what turns "ten dots on a circle" into a fluid blob shape.

**Mouse reactivity via vector subtraction**

Each frame, every point's position is compared to an eased \`mouse\` position (itself lerped toward the real cursor with \`.add(...).multiply(0.08)\` for smoothing) using \`mouse.subtract(pointPos)\` to get a direction-and-distance vector. Points within 220px of the cursor get pushed outward along that vector, scaled by proximity — \`Math.max(0, 1 - dist / 220) * 40\` — so the blob stretches toward wherever the cursor lingers and relaxes back when it moves away.

**Where this fits**

For a mouse-reactive cursor trail rather than a shape distortion, see [quickto cursor](/ui-snippets/quickto-cursor/); for a CSS-only organic shape without vector math, see [liquid blob](/ui-snippets/liquid-blob/). Paper.js is the right tool specifically when you need real per-point vector operations rather than a CSS filter or SVG morph.

**Customizing it**

Change \`POINTS\` for a smoother (more points) or more angular (fewer points) blob, adjust \`BASE_RADIUS\` and wobble amplitude, or swap the gradient fill for a flat color. Increase the \`220\`/\`40\` proximity constants for a more dramatic, longer-reaching cursor pull.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the paper.js CDN', text: `Include paper-full.min.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A canvas renders with a gradient-filled blob.` },
      { title: 'Watch it idle', text: `The blob wobbles continuously via per-point sine waves.` },
      { title: 'Move your cursor near it', text: `Nearby points stretch outward toward the cursor.` },
      { title: 'Move away', text: `The blob relaxes back to its base wobble.` },
      { title: 'Tune the shape', text: `Adjust POINTS, BASE_RADIUS, and pull constants.` },
    ] },
    features: [
      { title: 'Vector point math', text: `Paper.js Point operations, not raw canvas pixels.` },
      { title: 'Per-point wobble', text: `Independent phase/speed avoid synchronized pulsing.` },
      { title: 'Continuous smoothing', text: `path.smooth() turns points into a fluid curve.` },
      { title: 'Cursor-reactive distortion', text: `Nearby points pull toward the mouse.` },
      { title: 'Eased mouse tracking', text: `Lerped position avoids snapping on fast moves.` },
      { title: 'Radial gradient fill', text: `Three-stop gradient anchored to canvas center.` },
      { title: 'Frame-driven rebuild', text: `onFrame recalculates segments every tick.` },
      { title: 'Responsive canvas', text: `resize attribute keeps it sized to its container.` },
    ],
    useCases: [
      { title: 'Hero background shapes', text: `An organic focal point behind hero copy.` },
      { title: 'Loading/idle states', text: `A living shape instead of a static spinner.` },
      { title: 'Brand moments', text: `A distinctive mouse-reactive mark on landing pages.` },
      { title: 'Cursor-reactive comparisons', text: `Pair with [quickto cursor](/ui-snippets/quickto-cursor/).` },
      { title: 'CSS blob alternative', text: `Compare with [liquid blob](/ui-snippets/liquid-blob/) for a non-canvas option.` },
      { title: 'Creative coding demos', text: `A compact example of Paper.js vector scripting.` },
    ],
    faqs: [
      { q: "Why rebuild the path's segments every frame instead of animating a transform?", a: `The blob's shape itself changes — points wobble at independent rates and distort toward the cursor — not just its position or scale, so a single CSS-style transform can't express it. Rebuilding segments from ten freshly calculated points each frame, then re-smoothing, is how Paper.js redraws a genuinely different outline every tick rather than moving a fixed shape around.` },
      { q: 'What does path.smooth({ type: "continuous" }) actually do?', a: `It takes the current straight-line segments (the raw points just added) and computes Bezier handle positions for each one so the resulting curve passes through all the points with continuous (no visible corner) curvature — similar to a Catmull-Rom-style spline. Without calling it, connecting the ten points directly would produce a jagged, faceted polygon instead of a smooth organic outline.` },
      { q: 'How does the blob know to stretch toward the cursor?', a: `On every frame, each point's position is subtracted from an eased mouse position to get a vector pointing from that point toward the cursor, and its length gives the distance. Points within 220 pixels get moved along that vector by an amount that shrinks linearly with distance (closer points move more), which is why only the part of the blob nearest the cursor visibly stretches rather than the whole shape shifting.` },
      { q: 'Why lerp the tracked mouse position instead of using the raw cursor position directly?', a: `mouse.add(targetMouse.subtract(mouse).multiply(0.08)) moves the tracked position only 8% of the way toward the real cursor each frame, so fast mouse movements produce a smooth trailing pull rather than the blob snapping instantly to match cursor position. That's the same easing technique used for smooth-following cursors and camera-follow effects generally.` },
      { q: 'Why does each point use a random phase and speed instead of one shared wobble?', a: `If all ten points used the same sine wave, the whole blob would pulse in and out uniformly like a breathing circle rather than looking organic. Giving each point its own random phase offset and slightly different speed means they reach their wobble peaks and troughs at different times, producing the uneven, fluid motion that reads as an organic shape rather than a synchronized pulse.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace through Paper.js's Point and Path APIs from the documentation alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how ten points with independent sine-wave phases get smoothed into a continuous organic outline via path.smooth(), and how the vector subtraction between each point and the eased mouse position produces distance-proportional distortion toward the cursor. The same assistant can help you extend it — asking how to add a second, larger blob layered behind the first for more depth, or how to make the wobble amplitude respond to scroll position instead of staying constant. It's also useful for comparing approaches: ask it to explain the tradeoffs between this canvas/Paper.js technique and an SVG path-morphing or CSS border-radius animation approach like the liquid blob snippet for achieving a similar organic shape. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a wobbling, mouse-reactive organic blob shape using Paper.js (load paper-full.min.js from a CDN, no build step), rendered on a canvas.

Requirements:
- Set up Paper.js against a canvas element and construct a single closed vector Path representing the blob, filled with a radial gradient rather than a flat color.
- Generate the blob from a fixed number of anchor points (at least 8) arranged at even angles around a circle, where each point carries its own randomly assigned phase offset and speed multiplier so their motion is not synchronized.
- On every frame (using the library's own frame-update callback, not a manual requestAnimationFrame loop), recompute each anchor point's radius using a sine wave driven by elapsed time, that point's individual phase and speed, and a base radius — then clear and rebuild the path's points from these newly computed positions.
- After rebuilding the points each frame, call the path's built-in smoothing method with continuous-curve smoothing so the outline reads as a fluid organic shape rather than a faceted polygon connecting straight lines between the points.
- Track the mouse/pointer position via the library's own view-level mouse-move event, and ease the tracked position toward the real cursor position gradually each frame (a simple lerp) rather than using the raw position directly, so the follow feels smooth rather than snapping.
- Before finalizing each point's position within the frame update, compute a vector from that point to the eased mouse position; if the point is within roughly 200-250 pixels of the mouse, offset the point outward along that vector by an amount that increases the closer the point is to the mouse, so the blob visibly stretches toward the cursor rather than the whole shape translating.`,
    },
  },
};

export default paperJsVectorBlob;
