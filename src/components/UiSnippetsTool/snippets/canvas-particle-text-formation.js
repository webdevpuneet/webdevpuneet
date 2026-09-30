const canvasParticleTextFormation = {
  id: 'canvas-particle-text-formation',
  title: 'Canvas Particle Text Formation',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="pt-wrap">
  <canvas id="ptCanvas" class="pt-canvas"></canvas>
  <div class="pt-bar">
    <button class="pt-btn is-active" data-word="HELLO">HELLO</button>
    <button class="pt-btn" data-word="CANVAS">CANVAS</button>
    <button class="pt-btn" data-word="SCATTER">SCATTER</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#08090e;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.pt-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;width:min(720px,96vw)}
.pt-canvas{width:100%;aspect-ratio:16/8;background:radial-gradient(120% 100% at 50% 0%,#141826,#08090e 70%);border-radius:18px;border:1px solid rgba(255,255,255,.08);display:block}
.pt-bar{display:flex;gap:8px}
.pt-btn{padding:8px 18px;border-radius:99px;border:1px solid rgba(255,255,255,.14);background:#141826;color:#9aa3c0;font:600 12px system-ui;letter-spacing:.04em;cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.pt-btn:hover{color:#fff}
.pt-btn.is-active{background:#38bdf8;color:#052033;border-color:#38bdf8}`,

  js: `const canvas = document.getElementById('ptCanvas');
const ctx = canvas.getContext('2d');
const buttons = document.querySelectorAll('.pt-btn');
let particles = [];
let width, height, dpr;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// Renders text to an offscreen canvas, then samples its opaque pixels on a
// grid to produce the (x,y) targets particles will animate toward.
function sampleTextPoints(word) {
  const off = document.createElement('canvas');
  off.width = width;
  off.height = height;
  const octx = off.getContext('2d');
  octx.fillStyle = '#fff';
  const fontSize = Math.min(width / (word.length * 0.62), height * 0.55);
  octx.font = '800 ' + fontSize + 'px system-ui, -apple-system, sans-serif';
  octx.textAlign = 'center';
  octx.textBaseline = 'middle';
  octx.fillText(word, width / 2, height / 2);

  const img = octx.getImageData(0, 0, width, height).data;
  const gap = 4;
  const points = [];
  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      const alpha = img[(y * width + x) * 4 + 3];
      if (alpha > 128) points.push({ x, y });
    }
  }
  return points;
}

function formWord(word) {
  const points = sampleTextPoints(word);
  // Reuse existing particles where possible so the transition feels continuous
  // rather than destroying and recreating the whole set.
  const count = points.length;
  while (particles.length < count) {
    particles.push({ x: Math.random() * width, y: Math.random() * height, vx: 0, vy: 0 });
  }
  particles.length = count;
  particles.forEach((p, i) => {
    p.tx = points[i].x;
    p.ty = points[i].y;
  });
}

function scatter() {
  particles.forEach(p => {
    p.tx = Math.random() * width;
    p.ty = Math.random() * height;
  });
}

function tick() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#38bdf8';
  for (const p of particles) {
    const dx = p.tx - p.x;
    const dy = p.ty - p.y;
    p.vx = (p.vx + dx * 0.02) * 0.85;
    p.vy = (p.vy + dy * 0.02) * 0.85;
    p.x += p.vx;
    p.y += p.vy;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(tick);
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    if (btn.dataset.word === 'SCATTER') scatter();
    else formWord(btn.dataset.word);
  });
});

resize();
formWord('HELLO');
tick();

window.addEventListener('resize', () => {
  resize();
  const active = document.querySelector('.pt-btn.is-active');
  if (active && active.dataset.word !== 'SCATTER') formWord(active.dataset.word);
});`,

  seo: {
    title: 'Canvas Particle Text Formation — Free Particles-Into-Text Snippet',
    description: `Scattered particles that animate into forming a word, sampled from offscreen-rendered text on a Canvas 2D grid. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Particle Text Formation — Particles That Assemble Into Words',
      description: `The particle text formation snippet scatters hundreds of small dots randomly across a canvas, then animates them into position so they collectively form a word — a technique built entirely on the Canvas 2D API, with no external particle or physics library. It works by rendering text you can't see and sampling where its pixels are.

**Text becomes a set of coordinates**

\`sampleTextPoints(word)\` draws the target word onto a hidden offscreen canvas at a large, bold font size, then reads its pixel data with \`getImageData\`. Any pixel with alpha above a threshold is "inside" a letter, and its \`(x, y)\` position (sampled on a grid spaced a few pixels apart, not every single pixel, for performance) becomes one particle's target. This is how arbitrary text — any word, any font the browser has — turns into a list of coordinates without hand-plotting a single point.

**Particles ease toward their targets, not jump**

Each particle stores a current position and a target (\`tx, ty\`). Every frame, \`tick()\` computes the delta to the target and nudges the particle's velocity toward it (\`p.vx = (p.vx + dx * 0.02) * 0.85\`), then applies that velocity to position — a simple spring-like approach that produces an organic ease-in, ease-out settle rather than particles snapping or moving in a straight line at constant speed.

**Reusing particles across words**

When you switch words, \`formWord\` doesn't destroy and recreate every particle — it grows or shrinks the existing array to match the new point count and reassigns each surviving particle's target. That's what makes switching between words (or into "Scatter") look like the same particle swarm reorganizing itself, rather than one shape disappearing and a new one popping in.

**A scatter state, not just formation**

The "Scatter" button reassigns every particle's target to a random canvas position instead of a sampled text point, using the identical spring-follow motion — so the same animation loop handles both assembling into text and dissolving back into chaos.

**Customizing it**

Adjust the sampling \`gap\` for particle density, the spring stiffness (\`0.02\`) and damping (\`0.85\`) for snappier or looser motion, particle color, or swap the font for a script/serif face. Pair it with [text particles](/ui-snippets/text-particles/), or contrast it with [matrix rain](/ui-snippets/matrix-rain/) and [starfield](/ui-snippets/starfield/) for other canvas-driven text and particle effects.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A canvas and word buttons render; particles form HELLO.` },
      { title: 'Click another word', text: `Particles reorganize from the current shape into the new one.` },
      { title: 'Click Scatter', text: `Particles dissolve back into a random scatter.` },
      { title: 'Resize the window', text: `The canvas and sample points recalculate at the new size.` },
      { title: 'Edit the word buttons', text: `Add a data-word button; the same handler forms it.` },
      { title: 'Tune the motion', text: `Adjust the spring and damping constants in tick().` },
    ] },
    features: [
      { title: 'Offscreen text sampling', text: `Reads rendered text pixels to build target points.` },
      { title: 'Spring-follow motion', text: `Particles ease toward targets, not snap instantly.` },
      { title: 'Particle reuse', text: `Existing particles retarget instead of respawning.` },
      { title: 'Scatter state', text: `Same loop handles both formation and dissolution.` },
      { title: 'No external libraries', text: `Pure Canvas 2D API, zero CDN dependencies.` },
      { title: 'DPR-aware canvas', text: `Sharp rendering on high-density displays.` },
      { title: 'Resize-safe', text: `Recomputes sample points at the new canvas size.` },
      { title: 'Any word, any font', text: `Works with whatever text and font you render.` },
    ],
    useCases: [
      { title: 'Hero intros', text: `An assembling-text alternative to [text particles](/ui-snippets/text-particles/).` },
      { title: 'Brand reveals', text: `Form a logo word before a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) grid.` },
      { title: 'Loading screens', text: `Particles assemble into a brand name while content loads.` },
      { title: 'Landing page heroes', text: `Pair with [starfield](/ui-snippets/starfield/) for a layered space theme.` },
      { title: 'Event/launch pages', text: `Countdown or reveal copy assembling from chaos.` },
      { title: 'Interactive art pieces', text: `Cycle through several words as an ambient background.` },
      { icon: 'CODE', title: 'Related: Canvas Wave Background', desc: 'See the [Canvas Wave Background](/ui-snippets/canvas-wave-background/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Text Scatter Assemble', desc: 'See the [Text Scatter Assemble](/ui-snippets/text-scatter-assemble/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the canvas know where to put each particle?', a: `It renders the target word onto a separate, invisible offscreen canvas at a large font size, then reads that canvas's pixel data with getImageData. Any pixel with high enough alpha is considered part of a letter, and its coordinates (sampled on a spaced grid rather than every pixel) become the target position for one particle.` },
      { q: 'Why do particles ease in instead of jumping straight to position?', a: `Each particle's velocity is nudged toward its target every frame by a fraction of the remaining distance, then damped, which is a simple spring approximation. That produces a natural accelerate-then-settle motion instead of linear or instant movement, and it's cheap to compute since it's just a couple of multiplications per particle per frame.` },
      { q: 'Why does switching words look continuous instead of resetting?', a: `Switching words reuses the existing particle array and only reassigns each particle's target coordinates (growing or trimming the array to match the new point count). Since particles keep their current position and velocity, they visibly travel from the old word's shape to the new one instead of the whole set vanishing and respawning.` },
      { q: 'Will this handle a lot of particles smoothly?', a: `The sampling grid spacing (gap) directly controls particle count — a smaller gap samples more points and produces a denser, more detailed text shape but costs more per-frame work. For longer words or lower-powered devices, increase the gap value to trade density for frame rate.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move the canvas setup, sampling, and animation loop into a mount effect that runs once the canvas ref exists, and cancel the requestAnimationFrame loop in the cleanup function. Re-run sampleTextPoints/formWord whenever the target word prop or state changes, guarding against calling it before the canvas has a nonzero size.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how rendering text to an offscreen canvas and reading its pixel alpha values turns arbitrary words into a set of particle target coordinates, and why the spring-follow velocity update produces smoother motion than directly interpolating position. It's also useful for extending — ask for particles colored by their position in the word, a version that cycles automatically through a list of words on a timer, or a mouse-repulsion effect so hovering scatters nearby particles before they re-settle. Use the conversation to understand the sampling and motion technique well enough to apply it to other shapes, like a logo silhouette instead of text.`,
      prompt: `Build a "particle text formation" effect in plain HTML, CSS, and JavaScript using only the Canvas 2D API — no external libraries or CDNs.

Requirements:
- A visible canvas element and a set of buttons for different target words (plus a "scatter" option), with device-pixel-ratio-aware canvas sizing so it renders sharp on high-density displays.
- Implement text-to-points sampling: render the target word onto a separate offscreen canvas at a large bold font size, read its pixel data with getImageData, and collect the coordinates of pixels above an alpha threshold on a spaced sampling grid (not every single pixel, for performance) as the particle target positions.
- Maintain a persistent array of particle objects with current position, velocity, and target position. When the target word changes, grow or shrink the existing particle array to match the new point count and reassign each particle's target — do not destroy and recreate the whole particle set on every word change.
- Animate particles toward their targets using a spring-like velocity update each frame (nudge velocity toward the delta to target, then damp it, then apply velocity to position) so motion eases in and settles rather than moving in a straight line at constant speed or snapping instantly.
- Implement a "scatter" mode that reassigns every particle's target to a random canvas position, using the same follow motion, so scattering and forming text share one animation loop.
- Handle window resize by recalculating canvas dimensions and re-sampling the currently active word's target points.`,
    },
  },
};

export default canvasParticleTextFormation;
