const canvasBoidsFlocking = {
  id: 'canvas-boids-flocking',
  title: 'Canvas Boids Flocking Simulation',
  lastmod: '2026-08-24',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="bf-wrap">
  <canvas id="bfCanvas" class="bf-canvas"></canvas>
  <div class="bf-panel">
    <span class="bf-tag">separation · alignment · cohesion</span>
    <p>Move your cursor into the flock — it acts as a predator the boids scatter from.</p>
    <div class="bf-row">
      <label>Boids <span id="bfCountVal">120</span></label>
      <input type="range" id="bfCount" min="30" max="240" value="120" step="10" />
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#060a12;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.bf-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;width:min(780px,96vw)}
.bf-canvas{width:100%;aspect-ratio:16/9;background:#060a12;border-radius:18px;border:1px solid rgba(255,255,255,.08);display:block;cursor:none}
.bf-panel{width:100%;display:flex;flex-wrap:wrap;align-items:center;gap:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 18px}
.bf-tag{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#67e8f9;background:rgba(103,232,249,.1);border:1px solid rgba(103,232,249,.3);padding:4px 10px;border-radius:99px}
.bf-panel p{font-size:12.5px;color:#93a0b8;flex:1 1 220px}
.bf-row{display:flex;align-items:center;gap:8px;font-size:12px;color:#c4cbdc}
.bf-row input{accent-color:#22d3ee}`,

  js: `const canvas = document.getElementById('bfCanvas');
const ctx = canvas.getContext('2d');
const countSlider = document.getElementById('bfCount');
const countVal = document.getElementById('bfCountVal');
let width, height, dpr;
let boids = [];
let pointer = { x: -9999, y: -9999, active: false };

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
canvas.addEventListener('mousemove', e => { pointer = { ...pointerPos(e), active: true }; });
canvas.addEventListener('mouseleave', () => { pointer.active = false; });
canvas.addEventListener('touchmove', e => { pointer = { ...pointerPos(e), active: true }; }, { passive: true });
canvas.addEventListener('touchend', () => { pointer.active = false; });

function makeBoid() {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * 1.5,
    vy: Math.sin(angle) * 1.5
  };
}

function seedBoids(n) {
  boids = [];
  for (let i = 0; i < n; i++) boids.push(makeBoid());
}

const PERCEPTION = 55;
const MAX_SPEED = 3.2;
const MAX_FORCE = 0.08;

function limit(vx, vy, max) {
  const mag = Math.hypot(vx, vy);
  if (mag > max) return [(vx / mag) * max, (vy / mag) * max];
  return [vx, vy];
}

// The three classic Reynolds boid rules, each computed from only nearby
// flockmates within PERCEPTION radius — no global coordination, no leader.
// Emergent flocking behavior comes purely from these local rules applied
// identically to every boid, every frame.
function flock(boid, neighbors) {
  let sepX = 0, sepY = 0;
  let aliX = 0, aliY = 0;
  let cohX = 0, cohY = 0;
  let count = 0;

  for (const other of neighbors) {
    if (other === boid) continue;
    const dx = boid.x - other.x, dy = boid.y - other.y;
    const d = Math.hypot(dx, dy);
    if (d > 0 && d < PERCEPTION) {
      // Separation: steer away, weighted more strongly the closer the neighbor is.
      sepX += dx / d / d;
      sepY += dy / d / d;
      // Alignment: match average heading.
      aliX += other.vx;
      aliY += other.vy;
      // Cohesion: steer toward average position.
      cohX += other.x;
      cohY += other.y;
      count++;
    }
  }

  let ax = 0, ay = 0;
  if (count > 0) {
    aliX /= count; aliY /= count;
    cohX = cohX / count - boid.x;
    cohY = cohY / count - boid.y;

    const [sx, sy] = limit(sepX * 40, sepY * 40, MAX_FORCE * 60);
    const [alx, aly] = limit(aliX, aliY, MAX_FORCE * 20);
    const [cx2, cy2] = limit(cohX, cohY, MAX_FORCE * 20);

    ax = sx * 1.6 + alx * 1.0 + cx2 * 0.9;
    ay = sy * 1.6 + aly * 1.0 + cy2 * 0.9;
  }

  if (pointer.active) {
    const dx = boid.x - pointer.x, dy = boid.y - pointer.y;
    const d = Math.hypot(dx, dy);
    if (d < 120 && d > 0) {
      ax += (dx / d) * 0.6;
      ay += (dy / d) * 0.6;
    }
  }

  return [ax, ay];
}

function step() {
  // Simple spatial pass: with boid counts in this demo's range, an O(n^2)
  // neighbor scan is fast enough to stay real-time without a grid/quadtree.
  for (const b of boids) {
    const [ax, ay] = flock(b, boids);
    b.vx += ax;
    b.vy += ay;
    const [lvx, lvy] = limit(b.vx, b.vy, MAX_SPEED);
    b.vx = lvx; b.vy = lvy;
    b.x += b.vx;
    b.y += b.vy;

    if (b.x < -10) b.x = width + 10;
    if (b.x > width + 10) b.x = -10;
    if (b.y < -10) b.y = height + 10;
    if (b.y > height + 10) b.y = -10;
  }
}

function draw() {
  ctx.fillStyle = 'rgba(6,10,18,0.28)';
  ctx.fillRect(0, 0, width, height);

  for (const b of boids) {
    const angle = Math.atan2(b.vy, b.vx);
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(angle);
    const speedT = Math.hypot(b.vx, b.vy) / MAX_SPEED;
    ctx.fillStyle = 'hsla(' + (188 + speedT * 40) + ',85%,65%,0.95)';
    ctx.beginPath();
    ctx.moveTo(7, 0);
    ctx.lineTo(-6, 4);
    ctx.lineTo(-6, -4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  if (pointer.active) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(248,113,113,0.5)';
    ctx.lineWidth = 1.5;
    ctx.arc(pointer.x, pointer.y, 120, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function tick() {
  step();
  draw();
  requestAnimationFrame(tick);
}

countSlider.addEventListener('input', () => {
  const n = parseInt(countSlider.value, 10);
  countVal.textContent = String(n);
  if (n > boids.length) {
    while (boids.length < n) boids.push(makeBoid());
  } else {
    boids.length = n;
  }
});

function init() {
  resize();
  seedBoids(parseInt(countSlider.value, 10));
  requestAnimationFrame(tick);
}
window.addEventListener('resize', resize);
init();`,

  seo: {
    title: 'Canvas Boids Flocking Simulation — Free Emergent Behavior Snippet',
    description: `A real-time flocking simulation with separation, alignment, and cohesion rules applied to every boid independently — emergent group behavior with no leader, rendered on a 2D canvas with a cursor predator. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Canvas Boids Flocking Simulation — Craig Reynolds' Three Rules From Scratch`,
      description: `Boids, introduced by Craig Reynolds in 1986, remains one of the clearest demonstrations that complex, convincing group behavior doesn't require central coordination — just three simple local rules, applied identically and independently to every individual. This snippet implements all three from scratch on canvas, with a cursor predator layered on top.

**Three rules, computed per-boid from local neighbors only**

Every frame, \`flock()\` looks only at neighbors within a fixed \`PERCEPTION\` radius (55px) and computes three separate steering vectors: **separation** (steer away from nearby neighbors, weighted more strongly the closer they are, via a \`1/d\` falloff), **alignment** (steer toward the average heading of nearby neighbors), and **cohesion** (steer toward the average position of nearby neighbors). No boid has any awareness of the flock as a whole — it only ever sees whoever happens to be within its own perception radius, exactly like Reynolds' original model.

**Weighted force blending, not equal votes**

The three steering vectors aren't averaged equally — separation is weighted roughly 1.6x, alignment 1.0x, and cohesion 0.9x before being summed into a single acceleration. This weighting is what keeps the flock cohesive (birds stay in a visible group) while still preventing them from colliding (separation dominates at close range) — tuning these weights is the single biggest lever over how "flocky" versus "swarmy" versus "scattered" the simulation looks.

**Force and speed limiting keep motion boid-like**

Both the individual steering vectors and the boid's final velocity are passed through \`limit()\`, which caps a vector's magnitude while preserving its direction. Without this, cohesion or alignment forces from a dense cluster could produce a huge instantaneous acceleration; capping keeps every boid's turning and speed changes gradual and readable rather than jittery.

**A cursor predator layered on top of the three core rules**

The pointer contributes a fourth, independent force: any boid within 120px of the pointer steers directly away from it. This isn't part of classical Reynolds boids, but composes naturally with the existing acceleration-summing structure — it's just one more vector added before the final speed clamp.

**Naive O(n²) neighbor search, by design**

Every boid scans every other boid to find its neighbors each frame. That's quadratic in boid count, but for the few hundred boids this demo supports it's comfortably fast at 60fps — a spatial grid or quadtree would only be worth the added complexity at boid counts in the thousands.

Compare with [canvas particle text formation](/ui-snippets/canvas-particle-text-formation/) for a different flavor of large-particle-count canvas motion built around a target shape instead of emergent local rules.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `120 boids spawn and immediately begin flocking.` },
      { title: 'Observe emergent grouping', text: `Boids align, cluster, and avoid collisions with no leader.` },
      { title: 'Move the cursor into the flock', text: `Nearby boids scatter away from the pointer as a predator.` },
      { title: 'Move the cursor out', text: `The flock re-coalesces into cohesive groups.` },
      { title: 'Adjust the Boids slider', text: `Add or remove boids live; the flock rebalances instantly.` },
      { title: 'Resize the window', text: `The simulation bounds adapt to the new canvas size.` },
    ] },
    features: [
      { title: 'Classic three-rule boids', text: `Separation, alignment, and cohesion, each computed independently.` },
      { title: 'Local perception only', text: `Every boid reacts only to neighbors within a fixed radius.` },
      { title: 'Weighted force blending', text: `Separation, alignment, and cohesion combined with tuned weights.` },
      { title: 'Force and speed limiting', text: `Caps steering and velocity for smooth, readable motion.` },
      { title: 'Cursor predator', text: `The pointer repels nearby boids as a fourth steering force.` },
      { title: 'Live boid-count control', text: `Add or remove boids on the fly via a slider.` },
      { title: 'Edge wraparound', text: `Boids leaving one edge reappear on the opposite side.` },
      { title: 'Speed-tinted rendering', text: `Boid color hue shifts subtly with current speed.` },
    ],
    useCases: [
      { title: 'AI/simulation teaching demos', text: `A canonical, readable emergent-behavior reference.` },
      { title: 'Data/nature-themed landing pages', text: `An organic, living ambient background.` },
      { title: 'Interactive portfolio pieces', text: `Demonstrate algorithmic and simulation skill.` },
      { title: 'Science/biology product pages', text: `A schooling-fish or flocking-bird visual metaphor.` },
      { title: 'Loading/idle screens', text: `A living, reactive scene while content loads.` },
      { title: 'Game dev prototyping', text: `A starting point for NPC swarm or crowd behavior.` },
      { icon: 'CODE', title: 'Related: Canvas Noise Texture Background', desc: 'See the [Canvas Noise Texture Background](/ui-snippets/canvas-noise-texture-bg/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Cursor-Follow Underline Draw', desc: 'See the [Cursor-Follow Underline Draw](/ui-snippets/link-underline-cursor-draw/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What are boids and who invented the algorithm?', a: `Boids is a 1986 artificial-life program by Craig Reynolds that simulates flocking behavior — birds, fish schools, herds — using three simple local steering rules applied to every individual: separation (avoid crowding neighbors), alignment (match neighbors' average heading), and cohesion (move toward neighbors' average position). No individual boid is aware of the group as a whole; the convincing group behavior emerges purely from many individuals following the same local rules.` },
      { q: 'Why does the flock look cohesive instead of colliding constantly?', a: `The three steering forces are summed with different weights before being applied — separation is weighted more heavily than alignment or cohesion. That weighting means avoidance dominates at close range (preventing collisions) while cohesion and alignment still pull the group together at slightly longer range, producing a flock that stays visually grouped without individuals overlapping.` },
      { q: 'Does each boid know about the entire flock, or just nearby boids?', a: `Only nearby boids. Every frame, flock() checks the distance from a boid to every other boid and only includes ones within the fixed PERCEPTION radius (55px) in its separation/alignment/cohesion calculations. This locality is the whole point of the algorithm — realistic group behavior emerges from purely local awareness, with no boid ever consulting global flock state.` },
      { q: 'How does the cursor predator effect work?', a: `It is an independent fourth steering force added on top of the three core boid rules: any boid within 120px of the pointer gets an acceleration pointing directly away from the pointer, scaled by a fixed strength. Because it is just one more vector summed into the boid's total acceleration before the final speed-limiting step, it composes naturally with the existing flocking behavior rather than overriding it.` },
      { q: 'Will this simulation slow down with a lot more boids?', a: `Each frame currently does an O(n^2) neighbor scan — every boid checks the distance to every other boid — which is fast enough for the few hundred boids this demo supports but would start to degrade into the thousands. At that scale, you'd want to bucket boids into a spatial grid or quadtree first and only check distances against boids in nearby cells, which is the standard optimization for larger flocks.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why applying only three simple local rules — separation, alignment, cohesion — independently to every boid produces convincing group-level flocking with no central coordinator, and how the relative weighting of those three forces changes the character of the simulation. It's a great snippet to extend with an assistant — ask for a spatial-grid neighbor lookup to support thousands of boids, obstacle avoidance (steering around fixed shapes), or multiple predator/prey species with different rule weights interacting in the same scene.`,
      prompt: `Build a real-time "boids flocking simulation" in plain HTML, CSS, and JavaScript using only the Canvas 2D API and Craig Reynolds' classic three-rule boids algorithm — no simulation or physics library.

Requirements:
- A population of boid objects, each with position and velocity, rendered as small triangles rotated to face their current heading direction, moving continuously via a requestAnimationFrame loop, wrapping around canvas edges when they leave.
- Implement three independent local steering rules, computed every frame for every boid based ONLY on other boids within a fixed perception radius (e.g. 55px) — no boid should have any awareness of boids outside that radius or of the flock as a whole:
  1. Separation: steer away from nearby boids, weighted more strongly for closer ones (inverse-distance falloff).
  2. Alignment: steer toward the average velocity/heading of nearby boids.
  3. Cohesion: steer toward the average position (center of mass) of nearby boids.
- Sum these three steering vectors with different relative weights (separation weighted highest, then alignment, then cohesion) into one acceleration vector per boid, clamping both the individual force vectors and the boid's final velocity to maximum magnitudes so motion stays smooth rather than jittery or explosive.
- Track the pointer (mouse and touch) and add a fourth steering force: any boid within a fixed radius of the pointer (e.g. 120px) steers directly away from it, acting as a predator the flock scatters from.
- Expose a live slider to add or remove boids from the simulation on the fly (supporting roughly 30 to 240 boids), and handle window resize by updating the simulation bounds. Use a straightforward O(n^2) neighbor search (every boid checks every other boid) since the supported boid count is small enough for that to stay real-time.`,
    },
  },
};

export default canvasBoidsFlocking;
