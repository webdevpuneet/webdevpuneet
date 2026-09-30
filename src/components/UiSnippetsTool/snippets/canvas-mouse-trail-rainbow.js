const canvasMouseTrailRainbow = {
  id: 'canvas-mouse-trail-rainbow',
  title: 'Canvas Rainbow Mouse Trail',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="rt-wrap">
  <canvas id="rtCanvas" class="rt-canvas"></canvas>
  <p class="rt-hint">Move your cursor across the panel — the trail cycles through hues.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a10;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.rt-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:min(720px,96vw)}
.rt-canvas{width:100%;aspect-ratio:16/9;background:#0a0a10;border-radius:18px;border:1px solid rgba(255,255,255,.08);display:block;cursor:none}
.rt-hint{color:#6b7284;font-size:12px;letter-spacing:.04em}`,

  js: `const canvas = document.getElementById('rtCanvas');
const ctx = canvas.getContext('2d');
let width, height, dpr;
let particles = [];
let hue = 0;
let pointer = null;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function pointerPos(e) {
  const rect = canvas.getBoundingClientRect();
  const t = e.touches ? e.touches[0] : e;
  return { x: t.clientX - rect.left, y: t.clientY - rect.top };
}

canvas.addEventListener('mousemove', e => {
  pointer = pointerPos(e);
  spawn(pointer.x, pointer.y);
});
canvas.addEventListener('touchmove', e => {
  pointer = pointerPos(e);
  spawn(pointer.x, pointer.y);
}, { passive: true });
canvas.addEventListener('mouseleave', () => { pointer = null; });

// Every mouse move adds a handful of small particles at the cursor, each
// carrying the current global hue so the trail visibly cycles through colors
// as time (and cursor position history) advances.
function spawn(x, y) {
  hue = (hue + 2.5) % 360;
  for (let i = 0; i < 2; i++) {
    particles.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 1.4,
      vy: (Math.random() - 0.5) * 1.4 - 0.3,
      r: 2 + Math.random() * 3,
      life: 1,
      hue
    });
  }
}

function tick() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.01;
    p.life -= 0.025;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * Math.max(p.life, 0), 0, Math.PI * 2);
    ctx.fillStyle = 'hsla(' + p.hue + ',95%,65%,' + Math.max(p.life, 0) + ')';
    ctx.fill();
  });

  particles = particles.filter(p => p.life > 0);

  if (pointer) {
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'hsla(' + hue + ',95%,75%,0.9)';
    ctx.fill();
  }

  requestAnimationFrame(tick);
}

resize();
window.addEventListener('resize', resize);
tick();`,

  seo: {
    title: 'Canvas Rainbow Mouse Trail — Free Hue-Cycling Cursor Snippet',
    description: `A trail of small particles following the cursor, each colored along a continuously cycling hue, fading out over a short lifespan on Canvas 2D. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Rainbow Mouse Trail — A Cursor Trail That Cycles Through Hue',
      description: `The rainbow mouse trail snippet leaves a stream of small, glowing particles behind your cursor, each one colored a little further along the color wheel than the last — so a slow, looping cursor movement paints a visible rainbow across the panel over a few seconds. It's built entirely with the Canvas 2D API and a single incrementing hue counter, no gradient or color library needed.

**A single global hue counter, advanced on every move**

Rather than picking a random or fixed color, one shared \`hue\` variable increments by a small amount (\`2.5\`) every time \`spawn()\` runs, wrapping around at 360 with the modulo operator. Every particle spawned in that call captures the *current* value of \`hue\` at creation time, so particles created moments apart carry visibly different, but adjacent, hues — that continuity across time is what makes the trail read as a smooth rainbow gradient rather than random flickering colors.

**HSL makes hue-cycling trivial**

Colors are expressed as \`hsla(hue, 95%, 65%, alpha)\` instead of RGB or hex. Because hue in HSL is a single 0-360 value representing position on the color wheel, cycling through the entire spectrum is just incrementing one number — RGB would require interpolating three channels in a coordinated way to achieve the same effect.

**Short-lived particles, not a persistent line**

Each particle has its own \`life\` value that decays every frame, shrinking its radius and fading its alpha in step (\`Math.max(p.life, 0)\` used for both) until it's removed. Because the canvas is fully cleared and redrawn each frame rather than using a fade-overlay trick, only currently-alive particles are visible — the trail's length is a direct function of the particle lifespan and how fast you're moving, not a fixed-length line of points.

**Small random jitter and drift**

Each spawned particle gets a slightly randomized starting offset and initial velocity, plus a small constant gravity-like pull (\`p.vy += 0.01\`), so the trail has a soft, organic scatter rather than particles stacking in a perfectly straight line behind the cursor.

**Customizing it**

Change the hue increment for a faster or slower color cycle, adjust particle lifespan for a longer or shorter trail, or swap the gravity pull for an upward drift. Pair it with [canvas fluid cursor trail](/ui-snippets/canvas-fluid-cursor-trail/) for a different trail texture, or [particle network](/ui-snippets/particle-network/) and [starfield](/ui-snippets/starfield/) for other ambient canvas backgrounds.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A canvas panel and hint text render.` },
      { title: 'Move the cursor over the panel', text: `Small particles spawn, cycling through hue.` },
      { title: 'Move slowly in a loop', text: `You can trace a visible rainbow across the panel.` },
      { title: 'Hold still', text: `The existing trail fades out and no new particles spawn.` },
      { title: 'Leave the panel', text: `The cursor dot disappears and spawning stops.` },
      { title: 'Resize the window', text: `The canvas adapts to the new panel size.` },
    ] },
    features: [
      { title: 'Continuous hue cycling', text: `A single incrementing counter drives every particle's color.` },
      { title: 'HSL-based color', text: `Cycling the spectrum is one number, not three channels.` },
      { title: 'Per-particle lifespan', text: `Radius and alpha fade together as life decays.` },
      { title: 'Organic jitter', text: `Randomized offsets and velocity avoid a rigid line.` },
      { title: 'Light gravity drift', text: `A small constant pull gives particles gentle motion.` },
      { title: 'Touch support', text: `Responds to touchmove as well as mousemove.` },
      { title: 'No external library', text: `Pure Canvas 2D API, zero dependencies.` },
      { title: 'DPR-aware canvas', text: `Crisp particles on high-density displays.` },
    ],
    useCases: [
      { title: 'Playful hero sections', text: `A colorful alternative to [canvas fluid cursor trail](/ui-snippets/canvas-fluid-cursor-trail/).` },
      { title: 'Kids/creative tools', text: `Add a delightful trail to a drawing or paint app.` },
      { title: 'Portfolio/art sites', text: `Pair with [particle network](/ui-snippets/particle-network/) as an ambient layer.` },
      { title: 'Event/festival pages', text: `Reinforce a vibrant, celebratory tone.` },
      { title: 'Interactive game menus', text: `Complement a [tic tac toe game](/ui-snippets/tic-tac-toe-game/) or similar casual game screen.` },
      { title: 'Cursor customization demos', text: `Show off a custom cursor treatment.` },
      { icon: 'CODE', title: 'Related: Canvas Water Ripple Simulation', desc: 'See the [Canvas Water Ripple Simulation](/ui-snippets/canvas-water-ripple-simulation/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: SVG Mask Sweep Text Reveal', desc: 'See the [SVG Mask Sweep Text Reveal](/ui-snippets/svg-mask-sweep-text-reveal/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the trail cycle through colors smoothly?', a: `A single shared hue variable increments by a small fixed amount every time the spawn function runs, wrapping at 360 using the modulo operator. Every particle created in that call captures whatever the hue variable currently is, so particles spawned moments apart get adjacent hues, producing a smooth, continuous gradient across the trail rather than randomly assigned colors.` },
      { q: 'Why use HSL colors instead of RGB or hex?', a: `In HSL, hue is a single value from 0 to 360 representing a position on the color wheel, so cycling through every color is just incrementing one number. Achieving the same continuous rainbow sweep in RGB would require coordinating three separate channel values through a color wheel conversion, which is unnecessary complexity when HSL does it natively.` },
      { q: 'Why does the trail have a limited length instead of stretching forever?', a: `Each particle carries its own life value that decays a fixed amount every frame, and both its radius and opacity are derived from that same decaying value. Once life reaches zero the particle is filtered out of the array. Because the canvas is fully cleared and redrawn each frame, only currently-alive particles are visible, so trail length is governed by lifespan and cursor speed, not a fixed-length point buffer.` },
      { q: 'Why do particles scatter a little instead of following the cursor in a perfect line?', a: `Each particle is spawned with a small randomized position offset and a randomized initial velocity, plus a constant small downward pull applied every frame. That combination gives the trail a soft, organic scatter and drift rather than particles stacking in a rigid single-file line directly behind the pointer.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move the canvas setup, pointer listeners, and animation loop into a mount effect scoped to a canvas ref, keeping the particles array and hue counter in refs rather than component state so they persist without triggering re-renders. Cancel the requestAnimationFrame loop and remove event listeners in the cleanup function.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why a single incrementing hue variable captured per-particle at spawn time produces a smooth color gradient across the trail, and why HSL color makes that cycling trivial compared to RGB. It's also a good snippet to extend — ask for a version where hue increments based on cursor speed instead of a fixed per-move amount, a toggle between hue-cycling and a fixed color palette, or combining the particle motion with the stretch/blend technique from a fluid-style trail for a hybrid look. Use the conversation to build a solid mental model of HSL-based color cycling so you can apply it elsewhere.`,
      prompt: `Build a "rainbow mouse trail" effect in plain HTML, CSS, and JavaScript using only the Canvas 2D API — no external libraries or CDNs.

Requirements:
- A canvas panel that tracks mouse and touch movement within its bounds and spawns a small number of particles at the pointer position on every move event.
- Maintain a single shared hue value (0 to 360) that increments by a small fixed amount every time particles are spawned, wrapping around with the modulo operator once it exceeds 360. Each particle must capture the current hue value at the moment it's created and keep it for its whole lifetime, so particles spawned at different times end up with different, but adjacent, hues.
- Use HSL (hsla()) color strings for particles so the color cycling is expressed as a single changing hue number rather than manipulating RGB channels directly.
- Give each particle its own randomized starting offset and initial velocity (small jitter) plus a slight constant downward drift applied every frame, so the trail looks organically scattered rather than a perfectly straight line of points following the cursor.
- Give each particle a lifespan that decays every frame, and derive both its rendered radius and its opacity from that same decaying lifespan value so it shrinks and fades together, removing it from the active particle list once its life reaches zero.
- Fully clear and redraw the canvas each animation frame (do not use a persistent fade-overlay trick) so trail length is naturally governed by particle lifespan and cursor movement speed.
- Stop spawning new particles when the pointer leaves the canvas, and make the canvas device-pixel-ratio aware with correct resize handling.`,
    },
  },
};

export default canvasMouseTrailRainbow;
