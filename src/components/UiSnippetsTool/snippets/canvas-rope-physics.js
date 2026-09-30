const canvasRopePhysics = {
  id: 'canvas-rope-physics',
  title: 'Canvas Rope Physics',
  lastmod: '2026-08-24',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="rp-wrap">
  <canvas id="rpCanvas" class="rp-canvas"></canvas>
  <div class="rp-panel">
    <span class="rp-tag">verlet integration</span>
    <p>Drag any point along the rope. Release to let it swing.</p>
    <div class="rp-row">
      <label>Stiffness <span id="rpStiffVal">6</span></label>
      <input type="range" id="rpStiff" min="1" max="16" value="6" step="1" />
    </div>
    <button class="rp-reset" id="rpReset">Reset rope</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e14;color:#e8ecf4;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.rp-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;width:min(760px,96vw)}
.rp-canvas{width:100%;aspect-ratio:16/10;background:radial-gradient(circle at 50% 20%,#141a26,#0b0e14 70%);border-radius:18px;border:1px solid rgba(255,255,255,.08);display:block;touch-action:none;cursor:grab}
.rp-panel{width:100%;display:flex;flex-wrap:wrap;align-items:center;gap:14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 18px}
.rp-tag{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#93c5fd;background:rgba(147,197,253,.1);border:1px solid rgba(147,197,253,.3);padding:4px 10px;border-radius:99px}
.rp-panel p{font-size:12.5px;color:#9aa3b8;flex:1 1 220px}
.rp-row{display:flex;align-items:center;gap:8px;font-size:12px;color:#c4cbdc}
.rp-row input{accent-color:#60a5fa}
.rp-reset{background:#1e293b;border:1px solid rgba(255,255,255,.12);color:#e8ecf4;font-size:12.5px;font-weight:600;padding:8px 14px;border-radius:9px;cursor:pointer}
.rp-reset:hover{background:#27364d}`,

  js: `const canvas = document.getElementById('rpCanvas');
const ctx = canvas.getContext('2d');
const stiffSlider = document.getElementById('rpStiff');
const stiffVal = document.getElementById('rpStiffVal');
const resetBtn = document.getElementById('rpReset');

let width, height, dpr;
let points = [];
let sticks = [];
const SEGMENTS = 22;
const GRAVITY = 0.4;
const FRICTION = 0.992;
let iterations = parseInt(stiffSlider.value, 10);

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// Each point stores current position AND previous position. Verlet
// integration derives velocity implicitly from (current - previous),
// so we never store velocity explicitly.
function buildRope() {
  points = [];
  sticks = [];
  const startX = width * 0.18;
  const endX = width * 0.82;
  const y = height * 0.25;
  const segLen = (endX - startX) / SEGMENTS;
  for (let i = 0; i <= SEGMENTS; i++) {
    const x = startX + i * segLen;
    points.push({ x, y, px: x, py: y, pinned: i === 0 || i === SEGMENTS, index: i });
  }
  for (let i = 0; i < SEGMENTS; i++) {
    sticks.push({ a: points[i], b: points[i + 1], length: segLen });
  }
}

function updatePoints() {
  for (const p of points) {
    if (p.pinned || p.dragging) continue;
    const vx = (p.x - p.px) * FRICTION;
    const vy = (p.y - p.py) * FRICTION;
    p.px = p.x;
    p.py = p.y;
    p.x += vx;
    p.y += vy + GRAVITY;
  }
}

// Constraint solving: each stick is treated as a rigid distance constraint.
// Running this correction pass multiple times per frame ("iterations")
// is what makes the rope feel stiff instead of stretchy elastic.
function satisfyConstraints() {
  for (let iter = 0; iter < iterations; iter++) {
    for (const s of sticks) {
      const dx = s.b.x - s.a.x;
      const dy = s.b.y - s.a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
      const diff = (dist - s.length) / dist;
      const offX = dx * 0.5 * diff;
      const offY = dy * 0.5 * diff;
      if (!s.a.pinned && !s.a.dragging) { s.a.x += offX; s.a.y += offY; }
      if (!s.b.pinned && !s.b.dragging) { s.b.x -= offX; s.b.y -= offY; }
    }
    for (const p of points) {
      if (p.y > height - 4 && !p.pinned) { p.y = height - 4; }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(96,165,250,0.9)';
  ctx.shadowColor = 'rgba(96,165,250,0.5)';
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
  ctx.stroke();
  ctx.shadowBlur = 0;

  for (const p of points) {
    ctx.beginPath();
    ctx.fillStyle = p.pinned ? '#f87171' : (p.dragging ? '#fbbf24' : '#93c5fd');
    ctx.arc(p.x, p.y, p.pinned ? 6 : 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function tick() {
  updatePoints();
  satisfyConstraints();
  draw();
  requestAnimationFrame(tick);
}

function pointerPos(e) {
  const rect = canvas.getBoundingClientRect();
  const t = e.touches ? e.touches[0] : e;
  return { x: t.clientX - rect.left, y: t.clientY - rect.top };
}

let draggedPoint = null;
function nearestPoint(pos) {
  let best = null, bestDist = 26;
  for (const p of points) {
    const d = Math.hypot(p.x - pos.x, p.y - pos.y);
    if (d < bestDist) { bestDist = d; best = p; }
  }
  return best;
}

function onDown(e) {
  const pos = pointerPos(e);
  const p = nearestPoint(pos);
  if (p && !p.pinned) {
    draggedPoint = p;
    p.dragging = true;
    canvas.style.cursor = 'grabbing';
  }
  e.preventDefault();
}
function onMove(e) {
  if (!draggedPoint) return;
  const pos = pointerPos(e);
  draggedPoint.x = pos.x;
  draggedPoint.y = pos.y;
  draggedPoint.px = pos.x;
  draggedPoint.py = pos.y;
  e.preventDefault();
}
function onUp() {
  if (draggedPoint) draggedPoint.dragging = false;
  draggedPoint = null;
  canvas.style.cursor = 'grab';
}

canvas.addEventListener('mousedown', onDown);
window.addEventListener('mousemove', onMove);
window.addEventListener('mouseup', onUp);
canvas.addEventListener('touchstart', onDown, { passive: false });
canvas.addEventListener('touchmove', onMove, { passive: false });
canvas.addEventListener('touchend', onUp);

stiffSlider.addEventListener('input', () => {
  iterations = parseInt(stiffSlider.value, 10);
  stiffVal.textContent = String(iterations);
});
resetBtn.addEventListener('click', buildRope);

function init() {
  resize();
  buildRope();
  requestAnimationFrame(tick);
}
window.addEventListener('resize', () => { resize(); buildRope(); });
init();`,

  seo: {
    title: 'Canvas Rope Physics — Free Verlet Integration Drag Toy Snippet',
    description: `A draggable rope simulated with Verlet integration and iterative distance-constraint solving on a 2D canvas — pinned ends, real sag, and swing, no physics library. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Rope Physics — A Verlet Rope With No Physics Library',
      description: `This snippet simulates a hanging, draggable rope entirely with the Canvas 2D API and a from-scratch implementation of Verlet integration — the same class of technique used in cloth and rope simulations in games, minus any external physics engine.

**Position-based dynamics instead of force-based velocity**

Each rope point stores its current position and its *previous* position, not an explicit velocity. Every frame, \`updatePoints()\` computes an implicit velocity as \`(x - px)\`, applies friction to it, and projects the point forward by that amount plus gravity. This is Verlet integration: it's numerically stable and trivially easy to constrain, which is exactly why it's the standard technique for rope, cloth, and soft-body demos rather than a spring-force model.

**Stiffness comes from iteration count, not a spring constant**

Every stick between two adjacent points is a rigid-distance constraint: \`satisfyConstraints()\` measures the current distance between its two points, compares it to the stick's rest length, and nudges both points toward the correct separation. Running that correction pass multiple times per frame — controlled by the Stiffness slider, which maps directly to iteration count — is what makes the rope feel taut rather than stretchy. Few iterations produce a soft, elastic-feeling rope; many iterations converge closer to a rigid rope, all using the exact same constraint code.

**Pinned points versus free points**

The first and last points are flagged \`pinned\` and are skipped in both the integration and constraint-correction steps, anchoring the rope's ends in place while every interior point is free to swing under gravity and be pulled taut by its neighbors.

**Dragging without breaking the simulation**

While a point is being dragged, it's flagged \`dragging\` and both its position and previous position are set to the pointer position every move event — this is what prevents the rope from "flinging" the point once you release it, since with matching previous/current positions its implicit velocity is zero at release.

Pair this with [canvas fireworks physics](/ui-snippets/canvas-fireworks-physics/) or [canvas metaball blobs](/ui-snippets/canvas-metaball-blobs/) for other from-scratch canvas physics demos.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A rope renders, pinned at both ends, sagging under gravity.` },
      { title: 'Drag any point', text: `Click or touch near a rope segment and drag it around.` },
      { title: 'Release', text: `The point swings freely, pulled taut by its neighboring constraints.` },
      { title: 'Adjust stiffness', text: `The slider changes constraint-solving iterations per frame.` },
      { title: 'Low stiffness', text: `The rope feels soft and elastic, stretching visibly.` },
      { title: 'High stiffness', text: `The rope feels closer to rigid, holding its length tightly.` },
      { title: 'Reset', text: `The Reset rope button rebuilds the simulation from scratch.` },
    ] },
    features: [
      { title: 'Verlet integration', text: `Position-based physics with no explicit velocity storage.` },
      { title: 'Iterative constraint solving', text: `Stick distance constraints resolved multiple times per frame.` },
      { title: 'Adjustable stiffness', text: `A slider controls iteration count live.` },
      { title: 'Pinned endpoints', text: `Both rope ends stay fixed while the middle swings freely.` },
      { title: 'Drag-and-release', text: `Grab any segment; release for natural swing-back.` },
      { title: 'Floor collision', text: `Points are clamped above the canvas bottom edge.` },
      { title: 'Touch support', text: `Full touchstart/move/end handling alongside mouse.` },
      { title: 'DPR-aware rendering', text: `Crisp glowing rope on high-density screens.` },
    ],
    useCases: [
      { title: 'Physics/game dev demos', text: `A compact reference for Verlet-based rope simulation.` },
      { title: 'Interactive hero sections', text: `A playful draggable element above the fold.` },
      { title: 'Educational tools', text: `Teach constraint-based simulation visually.` },
      { title: 'Loading/idle screens', text: `A tactile distraction while content loads.` },
      { title: 'Portfolio pieces', text: `Demonstrate from-scratch canvas physics skill.` },
      { title: 'Creative agency sites', text: `Pair with [canvas fireworks physics](/ui-snippets/canvas-fireworks-physics/) for a physics-forward page.` },
      { icon: 'CODE', title: 'Related: Corner Peel Hover Reveal Card', desc: 'See the [Corner Peel Hover Reveal Card](/ui-snippets/corner-peel-card-hover/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Vanilla SVG Icon Morph (No Library)', desc: 'See the [Vanilla SVG Icon Morph (No Library)](/ui-snippets/vanilla-svg-path-morph-icons/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is Verlet integration and why use it here?', a: `Verlet integration derives velocity implicitly from the difference between a point's current and previous position, rather than storing velocity as its own variable. It is numerically stable and makes distance constraints trivial to apply directly to position, which is why it is the standard technique behind most rope and cloth simulations rather than a force-and-velocity spring model.` },
      { q: 'How does the stiffness slider actually change the physics?', a: `It changes how many times per frame the distance-constraint correction pass runs over every stick in the rope. Each pass nudges connected points toward the correct rest length; running it once produces a soft, stretchy rope, while running it many times converges the rope's segments closer to their exact rest length, reading as stiffer and more rope-like.` },
      { q: 'Why do the rope endpoints never move?', a: `The first and last points are flagged pinned and are explicitly skipped in both the position-update step and the constraint-correction step. Every other point in the rope is fully free to move, so gravity and dragging only ever affect the interior of the rope, exactly like a rope hung between two fixed hooks.` },
      { q: `Why doesn't the dragged point fling away when I release it?`, a: `While dragging, both the point's current position and its previous position are set to the pointer's position on every move event. Since Verlet's implicit velocity is the difference between those two values, keeping them equal means the point has zero velocity at the moment of release, so it starts swinging from rest instead of inheriting a large flick velocity.` },
      { q: 'Can I use this for cloth instead of a single rope?', a: `Yes — the underlying technique is the same. Extend the points array into a 2D grid instead of a line, add horizontal, vertical, and optionally diagonal stick constraints between neighboring grid points, and pin whichever row or points you want fixed. The integration and constraint-solving functions need no changes; only the topology of points and sticks differs between a rope and a cloth.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why Verlet integration stores previous position instead of velocity, and how that choice makes the iterative constraint solver in satisfyConstraints() so simple compared to a force-based spring model. It's a great snippet to extend with an assistant — ask for a version with wind (a sideways force applied per frame), multiple independent ropes connected at a shared pin, or a cloth grid built from the same points/sticks pattern generalized to two dimensions. You can also ask it to explain the floor-collision clamp and how you'd replace it with collision against an arbitrary shape.`,
      prompt: `Build a "rope physics" toy in plain HTML, CSS, and JavaScript using only the Canvas 2D API and hand-rolled Verlet integration — no physics or animation library.

Requirements:
- A rope made of a fixed number of connected points (e.g. 22 segments), rendered as a smooth glowing line with small circles at each joint. The first and last points are pinned in fixed positions; every other point is free.
- Each point stores its current x/y position and its previous x/y position instead of an explicit velocity. Each frame, derive an implicit velocity as (current - previous), apply a friction multiplier just under 1, then advance the point's position by that damped velocity plus a constant downward gravity value.
- Model each connection between adjacent points as a rigid distance ("stick") constraint with a fixed rest length. Implement an iterative constraint-solving pass that, for every stick, measures the current distance between its two points, compares it to the rest length, and moves both points proportionally toward the correct separation (skipping pinned or actively-dragged points). Run this pass multiple times per frame — expose the iteration count as a "stiffness" slider so the user can see the rope go from stretchy/elastic at low iteration counts to taut/rigid at high counts.
- Support dragging: on pointer down, find the nearest rope point within a small radius (excluding pinned points) and mark it as dragging; on pointer move, set both its current AND previous position to the pointer position (so it has zero implicit velocity and doesn't fling on release); on release, clear the dragging flag so gravity and constraints take back over.
- Clamp any point's y position so it can't fall through the bottom of the canvas.
- Support both mouse and touch input, handle window resize by rebuilding the rope, and scale for devicePixelRatio so rendering stays crisp on high-DPI screens.`,
    },
  },
};

export default canvasRopePhysics;
