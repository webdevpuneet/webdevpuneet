const canvasGravityParticles = {
  id: 'canvas-gravity-particles',
  title: 'Canvas Gravity Particle Orbits',
  lastmod: '2026-08-24',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="gv-wrap">
  <canvas id="gvCanvas" class="gv-canvas"></canvas>
  <div class="gv-panel">
    <span class="gv-tag">n-body gravity · orbital mechanics</span>
    <p>Click anywhere to place a new gravity well. Particles orbit whichever well pulls hardest.</p>
    <button class="gv-btn" id="gvReset">Reset</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#050510;color:#e6e6f5;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.gv-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;width:min(780px,96vw)}
.gv-canvas{width:100%;aspect-ratio:16/9;background:#050510;border-radius:18px;border:1px solid rgba(255,255,255,.08);display:block;cursor:crosshair}
.gv-panel{width:100%;display:flex;flex-wrap:wrap;align-items:center;gap:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 18px}
.gv-tag{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#c4b5fd;background:rgba(196,181,253,.1);border:1px solid rgba(196,181,253,.3);padding:4px 10px;border-radius:99px}
.gv-panel p{font-size:12.5px;color:#9a9ac0;flex:1 1 220px}
.gv-btn{background:#1e1b3a;border:1px solid rgba(196,181,253,.3);color:#c4b5fd;font-size:12.5px;font-weight:600;padding:8px 14px;border-radius:9px;cursor:pointer}
.gv-btn:hover{background:#2a2452}`,

  js: `const canvas = document.getElementById('gvCanvas');
const ctx = canvas.getContext('2d');
const resetBtn = document.getElementById('gvReset');
let width, height, dpr;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

const G = 260; // gravitational constant, tuned for this scale, not real-world units
let wells = [];
let particles = [];
const PARTICLE_COUNT = 260;
const COLORS = ['#a78bfa', '#f472b6', '#60a5fa', '#34d399', '#fbbf24'];

function seedWells() {
  wells = [
    { x: width * 0.5, y: height * 0.5, mass: 3600 }
  ];
}

function seedParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * Math.min(width, height) * 0.42;
    const x = width / 2 + Math.cos(angle) * dist;
    const y = height / 2 + Math.sin(angle) * dist;
    // Give each particle an initial velocity roughly perpendicular to its
    // radius vector, scaled for a rough circular-orbit speed. It won't be a
    // perfect orbit (that requires exact tuning), which is part of the fun --
    // particles drift into looser spirals, tight slingshots, or captures.
    const orbitalSpeed = Math.sqrt(G * 3600 / dist) * (0.75 + Math.random() * 0.5);
    const perp = angle + Math.PI / 2;
    particles.push({
      x, y,
      vx: Math.cos(perp) * orbitalSpeed,
      vy: Math.sin(perp) * orbitalSpeed,
      trail: [],
      color: COLORS[i % COLORS.length]
    });
  }
}

function pointerPos(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}
canvas.addEventListener('click', e => {
  const pos = pointerPos(e);
  wells.push({ x: pos.x, y: pos.y, mass: 1400 + Math.random() * 1200 });
  if (wells.length > 5) wells.shift();
});

function step() {
  for (const p of particles) {
    let ax = 0, ay = 0;
    for (const w of wells) {
      const dx = w.x - p.x, dy = w.y - p.y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq) || 1;
      // Softened gravity: adding a small constant to distSq prevents the
      // force from spiking toward infinity when a particle passes very
      // close to a well, which would otherwise fling it out at absurd speed.
      const force = (G * w.mass) / (distSq + 400);
      ax += (dx / dist) * force;
      ay += (dy / dist) * force;
    }
    p.vx += ax * 0.016;
    p.vy += ay * 0.016;
    p.x += p.vx * 0.016;
    p.y += p.vy * 0.016;

    p.trail.push({ x: p.x, y: p.y });
    if (p.trail.length > 14) p.trail.shift();

    if (p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 30;
      p.x = width / 2 + Math.cos(angle) * dist;
      p.y = height / 2 + Math.sin(angle) * dist;
      p.vx = 0; p.vy = 0;
      p.trail = [];
    }
  }
}

function draw() {
  ctx.fillStyle = 'rgba(5,5,16,0.22)';
  ctx.fillRect(0, 0, width, height);

  for (const w of wells) {
    const grad = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, 26);
    grad.addColorStop(0, 'rgba(255,255,255,0.9)');
    grad.addColorStop(0.4, 'rgba(196,181,253,0.5)');
    grad.addColorStop(1, 'rgba(196,181,253,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(w.x, w.y, 26, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const p of particles) {
    ctx.beginPath();
    for (let i = 0; i < p.trail.length; i++) {
      const t = p.trail[i];
      ctx.strokeStyle = p.color;
      ctx.globalAlpha = (i / p.trail.length) * 0.5;
      if (i === 0) ctx.moveTo(t.x, t.y); else ctx.lineTo(t.x, t.y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function tick() {
  step();
  draw();
  requestAnimationFrame(tick);
}

function reset() {
  seedWells();
  seedParticles();
}
resetBtn.addEventListener('click', reset);
window.addEventListener('resize', () => { resize(); reset(); });

resize();
reset();
requestAnimationFrame(tick);`,

  seo: {
    title: 'Canvas Gravity Particle Orbits — Free N-Body Simulation Snippet',
    description: `Hundreds of particles orbit user-placed gravity wells under an inverse-square attraction force, with softened gravity to prevent slingshot blowups — real orbital-mechanics math on a 2D canvas. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Gravity Particle Orbits — Inverse-Square Attraction From Scratch',
      description: `This snippet simulates hundreds of particles under real gravitational attraction toward one or more user-placed mass points, using the same inverse-square force law that governs actual orbital mechanics — implemented directly against the Canvas 2D API with no physics engine.

**Newton's law of gravitation, applied per particle per well**

Every frame, \`step()\` computes, for each particle and each gravity well, a force magnitude of \`(G * mass) / distance^2\` directed along the vector between them — literally Newton's inverse-square law, just with a \`G\` constant tuned for this canvas's scale rather than real-world units. When multiple wells exist, their forces on a given particle are summed before being applied, so particles genuinely respond to the combined pull of every well simultaneously, not just the nearest one.

**Softened gravity prevents infinite-force blowups**

A raw inverse-square force approaches infinity as distance approaches zero, which would fling any particle that strays too close to a well out at absurd, simulation-breaking speed. \`step()\` adds a small constant (\`400\`) to the squared distance before dividing, a standard N-body simulation technique called *force softening* — it caps the maximum force at close range while leaving the force essentially unchanged at normal distances, keeping the simulation numerically stable without a special-case collision check.

**Approximate initial orbital velocity, not a solved orbit**

When particles are seeded, each is given a velocity roughly perpendicular to its radius vector from the central well, scaled using the standard circular-orbit-speed formula \`sqrt(G * mass / distance)\` — but randomized rather than exact. That's deliberate: an exact circular orbit would be visually static and repetitive, while the randomized approximation produces a genuine mix of elliptical orbits, slow spirals, and the occasional slingshot escape, which is far more visually interesting and still grounded in real orbital-speed math.

**A second well changes everything, non-destructively**

Clicking anywhere adds a new gravity well (capped at 5 total, oldest dropped first) with a randomized mass. Because the force-summing loop in \`step()\` already iterates over every well for every particle, adding a well requires no other code changes — existing particles immediately begin responding to the new combined field, visibly reorganizing their orbits or slingshotting between multiple wells.

Compare with [canvas boids flocking simulation](/ui-snippets/canvas-boids-flocking/) for a different from-scratch canvas simulation built on local rules instead of a global force field.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `260 particles orbit a central gravity well immediately.` },
      { title: 'Click anywhere on the canvas', text: `A new gravity well is placed there with a randomized mass.` },
      { title: 'Watch orbits reorganize', text: `Particles respond to the combined pull of every active well.` },
      { title: 'Add up to 5 wells', text: `Older wells are dropped once the cap is reached.` },
      { title: 'Watch close passes', text: `Particles near a well curve sharply without ever flinging to infinity.` },
      { title: 'Click Reset', text: `Restores a single central well and re-seeds all particles.` },
    ] },
    features: [
      { title: 'Real inverse-square gravity', text: `Force computed as G*mass/distance^2 per particle, per well.` },
      { title: 'Multi-well summation', text: `Particles respond to the combined pull of all active wells.` },
      { title: 'Force softening', text: `A distance-squared offset prevents infinite-force blowups.` },
      { title: 'Approximate orbital seeding', text: `Initial velocities use the real circular-orbit-speed formula.` },
      { title: 'Click-to-place wells', text: `Add gravity sources anywhere, capped at 5 active at once.` },
      { title: 'Glowing well rendering', text: `Radial gradients mark each gravity source visually.` },
      { title: 'Trailing particle paths', text: `Short ring-buffer trails show recent orbital motion.` },
      { title: 'Off-screen recycling', text: `Particles that escape are reseeded near the center.` },
    ],
    useCases: [
      { title: 'Orbital mechanics teaching demo', text: 'Show students how inverse-square gravity bends paths: click to place wells and watch hundreds of particles settle into orbits using the real circular-orbit-speed formula in `orbitalSpeed`.' },
      { title: 'Space and science landing backgrounds', text: 'Use the swirling field as an ambient hero backdrop for astronomy, research or space-tech sites. The softened force keeps particles from slingshotting off screen, so the scene stays alive.' },
      { title: 'Portfolio piece for canvas skills', text: 'Prove you can write simulation code without an engine: the per-particle force sum over every well is only a few lines, easy to walk through in an interview.' },
      { title: 'Hero that visitors reshape', text: 'Let visitors click to add gravity wells and rearrange the scene themselves, turning a decorative hero into a toy that invites exploration and keeps people on the page.' },
      { title: 'Multi-body force demonstrations', text: 'Illustrate how several masses add up by placing two or three wells and watching particles follow the combined pull, a clear visual for the vector sum in physics lessons.' },
      { title: 'Screensavers and idle states', text: 'Run the orbiting field as a screensaver-style idle screen for kiosks, dashboards or loading states. It animates continuously, so it fills waiting time with something physically grounded.' },
      { icon: 'CODE', title: 'Related: Canvas Rope Physics', desc: 'See the [Canvas Rope Physics](/ui-snippets/canvas-rope-physics/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Proximity Glow Button', desc: 'See the [Proximity Glow Button](/ui-snippets/proximity-glow-button/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the gravity here based on a real physics formula?', a: `Yes — the force each well applies to each particle is computed as G times the well's mass divided by the squared distance between them, which is Newton's law of universal gravitation. The G constant is tuned for this canvas's arbitrary scale rather than real-world SI units, but the underlying inverse-square relationship is the genuine physics formula, not an approximation or a fake visual effect.` },
      { q: `Why doesn't a particle passing very close to a well get flung out at infinite speed?`, a: `Because the force calculation adds a small constant (400) to the squared distance before dividing, a technique called force softening. Without it, distance approaching zero would make the force approach infinity, launching that particle at an unrealistic and simulation-breaking speed; the softening constant caps the maximum force at close range while barely affecting the force at normal simulation distances.` },
      { q: `How does adding a second gravity well change the existing particles' behavior?`, a: `Every particle's acceleration each frame is the SUM of the forces from every active well, not just the nearest one. Since that summing loop already exists for a single well, adding a new one requires no special-case code — every particle immediately starts factoring the new well's pull into its combined acceleration, which is what causes visible orbit reshaping, slingshots, and captures between multiple wells.` },
      { q: 'Are the particle orbits mathematically exact circular or elliptical orbits?', a: `Not exactly — initial velocities are computed using the real circular-orbit-speed formula (square root of G times mass divided by distance) but deliberately randomized around that value rather than set precisely. That randomization intentionally produces a varied mix of elliptical orbits, slow inward or outward spirals, and occasional escapes, which reads as far more dynamic and interesting than a set of perfectly repeating circular orbits would.` },
      { q: 'What happens to a particle that gets flung off the visible canvas?', a: `step() checks each particle's position against a margin outside the canvas bounds; once a particle crosses that margin, it's immediately reset to a random position near the center with zero velocity and an empty trail, effectively recycling it back into the simulation instead of letting the total particle count silently shrink over time.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the inverse-square force law needs "softening" (the small constant added to squared distance) to stay numerically stable near a gravity well, and how summing forces from multiple wells per particle is enough to make the whole simulation respond correctly to newly added wells with no other code changes. It's a great snippet to extend with an assistant — ask for two wells that themselves orbit each other (true two-body dynamics) while particles orbit both, particle-particle gravity (full N-body, at a performance cost), or a "slingshot trail" visualization that highlights particles whose speed crosses a threshold near closest approach.`,
      prompt: `Build an interactive "gravity particle orbit" simulation in plain HTML, CSS, and JavaScript using only the Canvas 2D API and a hand-rolled inverse-square gravity calculation — no physics engine.

Requirements:
- A canvas seeded with several hundred small particles orbiting a single central "gravity well" point, each particle given an initial velocity roughly perpendicular to its radius vector from the well, scaled using the real circular-orbit-speed formula (square root of G times well-mass divided by distance) but randomized around that value so orbits vary between tight spirals, loose ellipses, and occasional escapes rather than all being identical circles.
- Every simulation frame, for every particle, sum the gravitational force contributed by every active well using Newton's inverse-square law: force magnitude = (G * well mass) / (squared distance + a small softening constant), directed along the vector from the particle to the well. The softening constant is required — without it, a particle passing very close to a well would experience near-infinite force and be flung out at an unrealistic speed; adding a small constant to the squared distance before dividing caps the force at close range.
- Integrate that summed force into each particle's velocity and position every frame (simple explicit Euler integration is fine), and render each particle with a short fading trail (its last ~14 positions) plus a small dot at its current position.
- Let the user click anywhere on the canvas to place a new gravity well with a randomized mass there, capped at a maximum number of simultaneous wells (e.g. 5, dropping the oldest when the cap is exceeded) — existing particles should immediately begin responding to the new well's pull alongside any existing wells, since the force calculation already sums over all active wells.
- Render each gravity well as a glowing radial-gradient circle. Recycle any particle that drifts far enough off-canvas back to a random position near the center with zero velocity, rather than letting escaped particles accumulate or the particle count shrink.
- Include a Reset button that restores a single central well and re-seeds all particles, and scale for devicePixelRatio so rendering stays crisp on high-DPI screens.`,
    },
  },
};

export default canvasGravityParticles;
