const canvasRippleClickEffect = {
  id: 'canvas-ripple-click-effect',
  title: 'Canvas Ripple Click Effect',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="rp-wrap">
  <canvas id="rpCanvas" class="rp-canvas"></canvas>
  <p class="rp-hint">Click anywhere in the panel.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.rp-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:min(720px,96vw)}
.rp-canvas{width:100%;aspect-ratio:16/9;background:radial-gradient(120% 100% at 50% 0%,#111726,#07080d 70%);border-radius:18px;border:1px solid rgba(255,255,255,.08);display:block;cursor:pointer}
.rp-hint{color:#6b7284;font-size:12px;letter-spacing:.04em}`,

  js: `const canvas = document.getElementById('rpCanvas');
const ctx = canvas.getContext('2d');
let width, height, dpr;
let ripples = [];

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function clickPos(e) {
  const rect = canvas.getBoundingClientRect();
  const t = e.touches ? e.changedTouches[0] : e;
  return { x: t.clientX - rect.left, y: t.clientY - rect.top };
}

function spawnRipple(x, y) {
  const maxRadius = Math.hypot(width, height) * 0.45;
  const hue = 190 + Math.random() * 100;
  // Each click adds three concentric rings with a slight delay between them,
  // each an independent object animating its own radius and fade.
  for (let i = 0; i < 3; i++) {
    ripples.push({
      x, y,
      radius: 0,
      maxRadius,
      delay: i * 8,
      age: 0,
      hue,
      lineWidth: 3 - i * 0.6
    });
  }
}

canvas.addEventListener('click', e => {
  const p = clickPos(e);
  spawnRipple(p.x, p.y);
});
canvas.addEventListener('touchstart', e => {
  const p = clickPos(e);
  spawnRipple(p.x, p.y);
}, { passive: true });

function tick() {
  ctx.clearRect(0, 0, width, height);

  ripples.forEach(r => {
    r.age++;
    if (r.age < r.delay) return;
    const t = (r.age - r.delay) / 55;
    r.radius = r.maxRadius * Math.min(t, 1);
    const alpha = Math.max(0, 1 - t);
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'hsla(' + r.hue + ',85%,65%,' + alpha + ')';
    ctx.lineWidth = r.lineWidth;
    ctx.stroke();
  });

  ripples = ripples.filter(r => r.age < r.delay || r.radius < r.maxRadius);
  requestAnimationFrame(tick);
}

resize();
window.addEventListener('resize', resize);
tick();`,

  seo: {
    title: 'Canvas Ripple Click Effect — Free Expanding Ring Snippet',
    description: `Click anywhere and an expanding, fading ripple of concentric rings spawns at the point, with multiple ripples animating independently on Canvas 2D. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Ripple Click Effect — Expanding Rings on Every Click',
      description: `The canvas ripple click effect snippet spawns an expanding, fading ring at every click point on a canvas — click multiple times in quick succession and each ripple grows and fades entirely on its own, overlapping the others freely. It's built from a plain array of ripple objects animated on the Canvas 2D API, with no physics or graphics library involved.

**Each click adds independent state, not a single shared effect**

\`spawnRipple(x, y)\` doesn't animate anything itself — it pushes plain objects describing a ripple's position, growth target, and age into a \`ripples\` array. The actual animation loop, \`tick()\`, iterates that array every frame and advances each ripple by its own \`age\`, completely independent of any other ripple in the array. That's what lets you click five times rapidly and see five rings at different stages of expansion simultaneously, instead of one ripple restarting on every click.

**Three rings per click, gently offset**

Rather than a single ring, each click actually queues three ripple objects with a staggered \`delay\` (\`i * 8\` frames) and a slightly different \`lineWidth\`. Because the delay is checked before a ripple starts advancing its radius (\`if (r.age < r.delay) return\`), the three rings from one click trail each other outward like real concentric waves instead of drawing as one flat ring.

**Radius and opacity are driven by the same progress value**

Each ripple computes a single \`t\` value — its progress from 0 to 1 based on age — and derives both its current \`radius\` (growing toward \`maxRadius\`) and its stroke \`alpha\` (fading toward 0) from that same \`t\`. Tying both to one progress value keeps the ring's growth and its fade perfectly synchronized: it's always fully faded out exactly as it reaches full size, never lingering as a large but invisible ring wasting array space.

**Cleanup keeps the array small**

The \`filter\` at the end of \`tick()\` drops any ripple that has both finished its delay and reached full radius, so the \`ripples\` array never grows unbounded even under rapid clicking — old, fully-expanded ripples are removed rather than kept around and skipped every frame.

**Customizing it**

Change the ring count per click, the stagger delay, \`maxRadius\`, or the hue formula for a different palette per click (try varying hue by click position instead of randomly). Pair it with [canvas fluid cursor trail](/ui-snippets/canvas-fluid-cursor-trail/) for a combined move-and-click canvas interaction, or [canvas confetti burst](/ui-snippets/canvas-confetti-burst/) for another click-triggered canvas effect.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A canvas panel and hint text render.` },
      { title: 'Click anywhere in the panel', text: `Three staggered rings expand and fade from that point.` },
      { title: 'Click rapidly in different spots', text: `Multiple ripples animate independently, overlapping freely.` },
      { title: 'Tap on a touch device', text: `Touchstart spawns the same ripple effect.` },
      { title: 'Resize the window', text: `The canvas and ripple max radius adapt.` },
      { title: 'Tune ring count or timing', text: `Edit the loop in spawnRipple and the progress math in tick.` },
    ] },
    features: [
      { title: 'Independent ripple objects', text: `Each click's rings animate on their own timeline.` },
      { title: 'Concurrent ripples', text: `Rapid clicks overlap without interrupting each other.` },
      { title: 'Staggered concentric rings', text: `Three rings per click trail each other outward.` },
      { title: 'Synchronized growth and fade', text: `One progress value drives radius and opacity together.` },
      { title: 'Self-cleaning array', text: `Finished ripples are filtered out each frame.` },
      { title: 'Touch support', text: `Responds to touchstart as well as click.` },
      { title: 'No external library', text: `Pure Canvas 2D API, zero dependencies.` },
      { title: 'DPR-aware canvas', text: `Crisp rings on high-density displays.` },
    ],
    useCases: [
      { title: 'Click feedback layers', text: 'Pair with a [canvas confetti burst](/ui-snippets/canvas-confetti-burst/) to give clicks both rings and celebration, with three concentric rings trailing each other outward.' },
      { title: 'Interactive backgrounds', text: 'Combine with a [canvas fluid cursor trail](/ui-snippets/canvas-fluid-cursor-trail/) so a page responds to hovering and clicking in different ways.' },
      { title: 'Game hit feedback', text: 'Reuse the pattern in a [whack-a-mole game](/ui-snippets/whack-a-mole-game/) for hit feedback, where each ripple object keeps its own separate timeline.' },
      { title: 'Location markers', text: 'Mark a selected point on a map or picker with an expanding ring, where one progress value drives radius and opacity together.' },
      { title: 'Ambient landing sections', text: 'Invite exploration on ambient landing sections with satisfying rapid-click ripples that overlap freely without ever interrupting one another.' },
      { icon: 'CODE', title: 'Related: Coin Flip', desc: 'See the [Coin Flip](/ui-snippets/coin-flip/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Typewriter Glitch Gradient Reveal', desc: 'See the [Typewriter Glitch Gradient Reveal](/ui-snippets/typewriter-glitch-gradient-reveal/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do multiple ripples animate independently at once?', a: `Every click pushes new plain objects into a shared ripples array, each tracking its own position, age, and radius. The animation loop iterates that array every frame and advances each object using only its own state, so ripples from different clicks never interfere with or reset each other — they simply coexist in the same array.` },
      { q: 'Why does one click produce three rings instead of one?', a: `spawnRipple pushes three ripple objects per click, each with a staggered delay value (multiples of 8 frames) and a slightly different line width. Because each ripple waits until its own age passes its delay before it starts expanding, the three rings visibly trail each other outward, reading as concentric waves rather than a single flat ring.` },
      { q: 'How does the ring fade out exactly as it finishes expanding?', a: `Both the radius and the stroke opacity are derived from the same progress value t, computed from the ripple's age divided by its total animation duration. Since radius grows toward maxRadius and alpha fades toward 0 using that identical t, the ring is always fully transparent right as it reaches full size, rather than fading independently of its growth.` },
      { q: 'Does the ripples array grow forever if I click a lot?', a: `No. At the end of every tick(), the array is filtered to drop any ripple that has both passed its stagger delay and reached full radius. Only ripples still mid-delay or still expanding are kept, so rapid clicking doesn't accumulate stale, fully-faded ripple objects indefinitely.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move the canvas setup, click/touch listeners, and animation loop into a mount effect scoped to a canvas ref, keeping the ripples array in a ref (not component state) so it isn't reset on re-render. Cancel the requestAnimationFrame loop and remove the event listeners in the effect's cleanup function.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how storing ripples as independent objects in an array, each with its own age, lets multiple clicks animate concurrently without interrupting each other, and why deriving both radius and opacity from a single shared progress value keeps a ring's growth and fade in sync. It's also useful for extending the effect — ask for ripple color that depends on click position instead of randomness, a version that also responds to a keyboard action for accessibility, or combining it with the fluid cursor trail snippet for a richer canvas background. Use the conversation to understand the object-array animation pattern well enough to reuse it for other click- or event-driven canvas effects.`,
      prompt: `Build a "ripple click effect" in plain HTML, CSS, and JavaScript using only the Canvas 2D API — no external libraries or CDNs.

Requirements:
- A canvas panel that listens for click (and touchstart) events and, on each one, spawns an expanding ring animation centered at the click coordinates (converted correctly from page/client coordinates to canvas-local coordinates).
- Represent each ripple as a plain object in an array (position, current radius, max radius, age, and any per-ripple visual properties), and drive the animation loop by iterating that array every frame — do not use a single shared animation state that only supports one ripple at a time.
- Each click must spawn multiple concentric rings (e.g. three) with a staggered start delay between them so they visibly trail each other outward as they expand, rather than drawing as a single flat ring.
- Compute each ripple's current radius and stroke opacity from the same underlying progress/age value so growth and fade-out stay synchronized — the ring should be fully faded out right as it reaches its maximum radius, not before or long after.
- Support multiple ripples animating concurrently and independently: rapid clicks in different (or the same) locations must all animate to completion without resetting or interrupting each other.
- Remove completed ripples from the tracked array each frame (once they've both passed their stagger delay and reached full radius) so the array does not grow unbounded under repeated clicking.
- Make the canvas device-pixel-ratio aware so rings render sharp on high-density displays, and handle window resize by recalculating canvas dimensions.`,
    },
  },
};

export default canvasRippleClickEffect;
