const canvasFluidCursorTrail = {
  id: 'canvas-fluid-cursor-trail',
  title: 'Canvas Fluid Cursor Trail',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="fc-wrap">
  <canvas id="fcCanvas" class="fc-canvas"></canvas>
  <p class="fc-hint">Move your cursor across the panel.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#050609;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.fc-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:min(720px,96vw)}
.fc-canvas{width:100%;aspect-ratio:16/9;background:#05060a;border-radius:20px;border:1px solid rgba(255,255,255,.08);display:block;cursor:none}
.fc-hint{color:#6b7284;font-size:12px;letter-spacing:.04em}`,

  js: `const canvas = document.getElementById('fcCanvas');
const ctx = canvas.getContext('2d');
let width, height, dpr;
let blobs = [];
let pointer = { x: 0, y: 0, active: false };
let lastPointer = { x: 0, y: 0 };

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
  pointer = { ...pointerPos(e), active: true };
});
canvas.addEventListener('mouseleave', () => { pointer.active = false; });
canvas.addEventListener('touchmove', e => {
  pointer = { ...pointerPos(e), active: true };
}, { passive: true });

function spawnBlob() {
  const vx = pointer.x - lastPointer.x;
  const vy = pointer.y - lastPointer.y;
  const speed = Math.min(Math.hypot(vx, vy), 40);
  blobs.push({
    x: pointer.x,
    y: pointer.y,
    vx: vx * 0.15,
    vy: vy * 0.15,
    r: 10 + speed * 0.6,
    stretch: 1 + speed * 0.03,
    angle: Math.atan2(vy, vx),
    life: 1,
    hue: 200 + (speed * 3) % 120
  });
  lastPointer = { x: pointer.x, y: pointer.y };
}

function tick() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(5,6,10,0.14)';
  ctx.fillRect(0, 0, width, height);

  if (pointer.active) spawnBlob();

  ctx.globalCompositeOperation = 'lighter';
  blobs.forEach(b => {
    b.x += b.vx;
    b.y += b.vy;
    b.vx *= 0.94;
    b.vy *= 0.94;
    b.life -= 0.02;

    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.angle);
    ctx.scale(b.stretch, 1);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, b.r);
    grad.addColorStop(0, 'hsla(' + b.hue + ',90%,70%,' + (0.5 * b.life) + ')');
    grad.addColorStop(1, 'hsla(' + b.hue + ',90%,60%,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, b.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  blobs = blobs.filter(b => b.life > 0);
  ctx.globalCompositeOperation = 'source-over';
  requestAnimationFrame(tick);
}

resize();
window.addEventListener('resize', resize);
tick();`,

  seo: {
    title: 'Canvas Fluid Cursor Trail — Free Soft Blended Trail Snippet',
    description: `A soft, glowing trail of stretched, blended blobs that follows the cursor, built with layered Canvas 2D gradients — a lightweight fluid-style approximation. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Fluid Cursor Trail — A Lightweight, Glowing Cursor Trail',
      description: `The fluid cursor trail snippet follows your cursor with a soft, glowing streak of blended blobs that stretch along your movement direction and fade out behind you. It's worth being upfront about what this is and isn't: it's a tasteful *approximation* of a fluid look, built from layered radial gradients, velocity-based stretching, and additive blending on the Canvas 2D API — not a real Navier-Stokes fluid simulation, and it doesn't need to be one to look good.

**Velocity, not just position, drives the shape**

Every pointer move, \`spawnBlob()\` compares the current pointer position to the last recorded one to get a velocity vector. That velocity feeds three things at once: the blob's own drift (\`vx * 0.15\`), its stretch factor (faster movement elongates the blob along the direction of travel via \`ctx.rotate\` + \`ctx.scale\`), and its hue, so quick flicks read visually differently from slow, deliberate movement.

**Additive blending is what makes it glow**

Each blob is drawn with \`ctx.globalCompositeOperation = 'lighter'\`, which adds color values where blobs overlap instead of simply layering opaque shapes on top of each other. Where several fresh, bright blobs overlap near the cursor, colors blow out toward white-hot; where they're sparse and faded, they stay a soft, dim glow — that additive overlap is most of what sells the "fluid" read, along with the radial gradient giving each blob a soft falloff instead of a hard edge.

**The trail fades via a translucent overlay, not per-blob alpha alone**

Instead of clearing the canvas every frame, \`tick()\` paints a low-opacity dark rectangle over the whole canvas (\`rgba(5,6,10,0.14)\`) before drawing new blobs. That partial-opacity wash is what leaves old blobs visibly lingering and dimming across several frames — a cheap way to get a persistent trail without storing and re-rendering a history array of past frames.

**Individually aging, independently moving blobs**

Each blob is a plain object with its own position, velocity (with damping via \`*= 0.94\`), lifespan, size, and hue, pushed into a \`blobs\` array and filtered out once its \`life\` reaches zero. There's no shared physics grid or pressure field — this is closer to a lightweight particle system tuned to look fluid-ish than a genuine fluid solver, and that honesty is intentional: it stays fast and dependency-free.

**Customizing it**

Adjust the fade rectangle's opacity for a longer or shorter trail, tune the hue formula for a different palette, or change \`globalCompositeOperation\` to \`'screen'\` or \`'overlay'\` for a different blend character. Pair it with [particle network](/ui-snippets/particle-network/) or [starfield](/ui-snippets/starfield/) for other ambient canvas backgrounds, or [canvas ripple click effect](/ui-snippets/canvas-ripple-click-effect/) for a click-driven companion interaction.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A canvas panel and hint text render.` },
      { title: 'Move the cursor over the panel', text: `A glowing, stretched blob trail follows it.` },
      { title: 'Move quickly', text: `Blobs stretch and shift hue with higher velocity.` },
      { title: 'Hold still', text: `The trail fades out and stops growing.` },
      { title: 'Leave the panel', text: `New blobs stop spawning until the cursor re-enters.` },
      { title: 'Resize the window', text: `The canvas adapts to the new panel size.` },
    ] },
    features: [
      { title: 'Velocity-based stretch', text: `Faster movement elongates each blob.` },
      { title: 'Additive blending', text: `Overlapping blobs glow brighter, not just stack.` },
      { title: 'Trail fade via overlay wash', text: `A translucent rect ages old frames cheaply.` },
      { title: 'Hue tied to speed', text: `Color shifts subtly with movement velocity.` },
      { title: 'Independent blob aging', text: `Each blob has its own lifespan and damping.` },
      { title: 'Touch-friendly', text: `Responds to touchmove as well as mousemove.` },
      { title: 'No external library', text: `Pure Canvas 2D API, honest about not being a real fluid sim.` },
      { title: 'DPR-aware rendering', text: `Crisp on high-density displays.` },
    ],
    useCases: [
      { title: 'Hero backgrounds', text: `An ambient layer alongside [starfield](/ui-snippets/starfield/).` },
      { title: 'Interactive portfolios', text: `Pair with [particle network](/ui-snippets/particle-network/) sections.` },
      { title: 'Creative agency sites', text: `A glowing cursor accent over hero copy.` },
      { title: 'Music/event pages', text: `Reinforce an energetic, motion-forward mood.` },
      { title: 'Landing page panels', text: `Combine with [canvas ripple click effect](/ui-snippets/canvas-ripple-click-effect/) for click + move feedback.` },
      { title: 'Loading/idle screens', text: `An ambient effect while content loads.` },
      { icon: 'CODE', title: 'Related: Canvas Procedural Lightning', desc: 'See the [Canvas Procedural Lightning](/ui-snippets/canvas-procedural-lightning/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Number to Word Morph Counter', desc: 'See the [Number to Word Morph Counter](/ui-snippets/number-word-morph-counter/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is this a real fluid simulation?', a: `No, and it's not trying to be. A genuine fluid simulation solves the Navier-Stokes equations across a velocity field, which is significantly more expensive to compute. This snippet approximates a fluid look using layered, velocity-stretched radial gradients and additive blending — a lightweight visual trick that looks fluid-ish without the underlying physics.` },
      { q: 'What makes the trail look like it glows?', a: `Two things together: ctx.globalCompositeOperation = 'lighter' adds overlapping colors rather than layering opaque shapes, so dense clusters of blobs near the cursor blow out brighter; and each blob is drawn as a radial gradient fading to transparent, giving it a soft, glowing edge instead of a hard circle outline.` },
      { q: 'How does the trail fade out over time without tracking a history array?', a: `Instead of clearing the canvas each frame, tick() paints a low-opacity dark rectangle over the entire canvas before drawing new blobs. That partial wash slightly dims everything already there on every frame, so older blobs visibly fade over several frames — a much cheaper approach than storing and re-rendering a growing history of past positions.` },
      { q: 'Why does the trail look different when I move fast versus slow?', a: `Blob size, stretch factor, and hue are all derived from the pointer's velocity between frames. Faster movement produces larger, more elongated blobs with a shifted hue, while slow, deliberate movement produces smaller, rounder, more static-colored blobs — that's what gives fast flicks and slow drags visually distinct trails.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move the canvas setup, pointer listeners, and animation loop into a mount effect scoped to a canvas ref, and cancel the requestAnimationFrame loop plus remove event listeners in the cleanup function. Keep the blobs array and pointer state outside of component re-renders (in refs) so the animation loop doesn't get recreated on every render.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why additive blending (globalCompositeOperation: 'lighter') combined with a translucent fade-overlay produces a convincing glowing trail without any real fluid physics, and how the velocity-based stretch and hue calculations connect cursor speed to the trail's visual character. It's also a good snippet to extend with an assistant — ask for a version with multiple color palettes, a toggle between additive and normal blending to compare the effect, or a lightweight approximation of viscosity by smoothing the velocity used for stretching. Being upfront that this isn't a true fluid simulation is a good prompt starting point if you want the assistant to suggest a real WebGL-based fluid shader instead for a more physically accurate (and more expensive) alternative.`,
      prompt: `Build a "fluid cursor trail" effect in plain HTML, CSS, and JavaScript using only the Canvas 2D API — no external libraries, no WebGL, and no real fluid-dynamics solver. This should be a lightweight visual approximation of a fluid trail, not a Navier-Stokes simulation, and the code/comments should be honest about that distinction.

Requirements:
- A canvas panel that tracks mouse and touch movement within its bounds and spawns a stream of "blob" particles at the pointer's position as it moves, each carrying its own position, velocity, size, rotation/stretch, lifespan, and color.
- Derive each new blob's stretch factor and size from the pointer's recent velocity (distance moved since the last frame) so fast movement produces larger, more elongated blobs and slow movement produces smaller, rounder ones — apply the stretch via canvas rotate/scale transforms aligned to the direction of movement, not by drawing a pre-stretched sprite.
- Render each blob as a soft radial gradient that fades to transparent at its edge (not a hard-edged circle), and draw all blobs using an additive blend mode (globalCompositeOperation: 'lighter') so overlapping blobs visually brighten where they intersect.
- Implement the trail fade-out by painting a low-opacity, dark, full-canvas rectangle over the scene at the start of each animation frame (before drawing new blobs) rather than fully clearing the canvas or manually tracking per-blob alpha decay across a stored history array.
- Age out blobs by decrementing an internal lifespan value each frame and removing them from the active array once it reaches zero, and dampen each blob's own velocity over time so it drifts to a stop rather than sliding indefinitely.
- Support both mouse and touch input, and stop spawning new blobs when the pointer leaves the canvas.`,
    },
  },
};

export default canvasFluidCursorTrail;
