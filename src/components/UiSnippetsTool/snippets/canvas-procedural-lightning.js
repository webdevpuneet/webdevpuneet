const canvasProceduralLightning = {
  id: 'canvas-procedural-lightning',
  title: 'Canvas Procedural Lightning',
  lastmod: '2026-08-24',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="lt-wrap">
  <canvas id="ltCanvas" class="lt-canvas"></canvas>
  <div class="lt-panel">
    <span class="lt-tag">recursive midpoint displacement</span>
    <p>Click anywhere to strike a bolt from the top of the sky to that point.</p>
    <div class="lt-row">
      <label>Jaggedness <span id="ltJagVal">0.5</span></label>
      <input type="range" id="ltJag" min="10" max="90" value="50" step="5" />
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#050508;color:#eef1fb;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.lt-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;width:min(780px,96vw)}
.lt-canvas{width:100%;aspect-ratio:16/9;background:#050508;border-radius:18px;border:1px solid rgba(255,255,255,.08);display:block;cursor:crosshair}
.lt-panel{width:100%;display:flex;flex-wrap:wrap;align-items:center;gap:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 18px}
.lt-tag{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#c7d2fe;background:rgba(199,210,254,.1);border:1px solid rgba(199,210,254,.3);padding:4px 10px;border-radius:99px}
.lt-panel p{font-size:12.5px;color:#9098b8;flex:1 1 220px}
.lt-row{display:flex;align-items:center;gap:8px;font-size:12px;color:#c4cbdc}
.lt-row input{accent-color:#818cf8}`,

  js: `const canvas = document.getElementById('ltCanvas');
const ctx = canvas.getContext('2d');
const jagSlider = document.getElementById('ltJag');
const jagVal = document.getElementById('ltJagVal');
let width, height, dpr;
let bolts = [];

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// Recursive midpoint displacement: start with a straight line from A to B.
// Find the midpoint, displace it perpendicular to the line by a random
// amount, then recurse on each half with a smaller displacement range.
// This is the same technique used to generate fractal terrain profiles and
// coastlines -- applied here to a bolt of lightning instead of a landscape.
function displace(x1, y1, x2, y2, depth, maxOffset, points) {
  if (depth <= 0) {
    points.push({ x: x2, y: y2 });
    return;
  }
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  // Perpendicular unit vector
  const nx = -dy / len, ny = dx / len;
  const offset = (Math.random() * 2 - 1) * maxOffset;
  const px = mx + nx * offset;
  const py = my + ny * offset;

  displace(x1, y1, px, py, depth - 1, maxOffset * 0.55, points);
  displace(px, py, x2, y2, depth - 1, maxOffset * 0.55, points);
}

function buildBolt(x1, y1, x2, y2, jag) {
  const points = [{ x: x1, y: y1 }];
  displace(x1, y1, x2, y2, 6, jag, points);

  const segments = points.map((p, i) => {
    const prev = i === 0 ? { x: x1, y: y1 } : points[i - 1];
    return { x1: prev.x, y1: prev.y, x2: p.x, y2: p.y };
  });

  const branches = [];
  for (let i = 2; i < segments.length - 2; i++) {
    if (Math.random() < 0.22) {
      const seg = segments[i];
      const angle = Math.atan2(seg.y2 - seg.y1, seg.x2 - seg.x1) + (Math.random() - 0.5) * 1.4;
      const branchLen = 40 + Math.random() * 80;
      const bx = seg.x2 + Math.cos(angle) * branchLen;
      const by = seg.y2 + Math.sin(angle) * branchLen;
      const branchPoints = [{ x: seg.x2, y: seg.y2 }];
      displace(seg.x2, seg.y2, bx, by, 3, jag * 0.5, branchPoints);
      branches.push(branchPoints);
    }
  }

  return { segments: points, start: { x: x1, y: y1 }, branches, life: 1 };
}

function strike(x, y) {
  const jag = parseInt(jagSlider.value, 10);
  const startX = x + (Math.random() - 0.5) * width * 0.3;
  bolts.push(buildBolt(startX, -10, x, y, jag));
  if (bolts.length > 4) bolts.shift();
  flash = 1;
}

let flash = 0;

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  strike(e.clientX - rect.left, e.clientY - rect.top);
});
jagSlider.addEventListener('input', () => {
  jagVal.textContent = (parseInt(jagSlider.value, 10) / 100).toFixed(2);
});

function strokePath(start, points, color, width_, blur) {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  for (const p of points) ctx.lineTo(p.x, p.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width_;
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function draw() {
  ctx.fillStyle = flash > 0.02 ? 'rgba(230,235,255,' + (flash * 0.12) + ')' : 'rgba(5,5,8,0.3)';
  ctx.fillRect(0, 0, width, height);
  flash *= 0.85;

  for (let i = bolts.length - 1; i >= 0; i--) {
    const b = bolts[i];
    const alpha = b.life;
    strokePath(b.start, b.segments, 'rgba(199,210,254,' + (0.15 * alpha) + ')', 7, 22);
    strokePath(b.start, b.segments, 'rgba(255,255,255,' + alpha + ')', 2, 10);
    for (const branch of b.branches) {
      strokePath(branch[0], branch.slice(1), 'rgba(199,210,254,' + (0.7 * alpha) + ')', 1.3, 8);
    }
    ctx.shadowBlur = 0;
    b.life -= 0.045;
    if (b.life <= 0) bolts.splice(i, 1);
  }
}

function tick() {
  draw();
  requestAnimationFrame(tick);
}

resize();
window.addEventListener('resize', resize);
requestAnimationFrame(tick);
setTimeout(() => strike(width * 0.5, height * 0.7), 400);`,

  seo: {
    title: 'Canvas Procedural Lightning — Free Midpoint Displacement Snippet',
    description: `Click to strike jagged, branching lightning bolts generated with recursive midpoint displacement — the same fractal technique used for terrain and coastlines — rendered with layered glow on a 2D canvas. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Procedural Lightning — Fractal Midpoint Displacement, Not Random Points',
      description: `A convincing lightning bolt isn't a jagged line drawn from random points — it's a fractal, where the same jaggedness pattern repeats at every zoom level. This snippet builds bolts using recursive midpoint displacement, the classic technique also used to generate fractal terrain heightmaps and coastlines.

**Displace the midpoint, then recurse on both halves**

\`displace()\` takes a straight line from point A to B, finds its exact midpoint, nudges that midpoint sideways (perpendicular to the A-B direction) by a random amount, then recursively calls itself on the two new sub-segments — A-to-midpoint and midpoint-to-B — each with a smaller maximum displacement (\`maxOffset * 0.55\`). Because every recursive level operates on a shorter segment with a proportionally smaller displacement budget, the result has large kinks at the coarse level and progressively finer, subtler kinks nested inside them — exactly the self-similar roughness real lightning (and coastlines, and mountain ridgelines) actually has.

**Perpendicular displacement, not free-form randomness**

The midpoint is only ever nudged along the perpendicular to its segment (\`nx = -dy/len, ny = dx/len\`), never along the segment's own direction. That constraint is what keeps the bolt visually progressing from source to target — a lightning bolt with points randomly jittered in *every* direction would double back on itself and look like scribble, not electricity.

**Branches spawn off the main bolt's segments, not independently**

After the main bolt's point list is built, \`buildBolt()\` walks its interior segments and, with a fixed probability per segment, spawns a short secondary bolt starting from that segment's endpoint at a randomly offset angle — itself built with the same \`displace()\` function at a smaller depth and displacement range. Reusing the identical fractal-generation function for branches (just with different parameters) is what keeps branches visually consistent with the main bolt instead of looking like a different effect grafted on.

**Two-layer stroke for the glow**

Each bolt is stroked twice: once wide, low-opacity, and heavily blurred (\`shadowBlur: 22\`) for the outer glow, and once narrow, high-opacity, and lightly blurred for the bright core — the same "wide soft layer under a narrow bright layer" trick used for neon and energy effects generally.

**A screen-flash pass sells the strike**

On every new strike, a \`flash\` value spikes to 1 and decays exponentially; while positive, the frame-clearing fill uses a bright, near-white color instead of the usual translucent dark wash, producing a brief whole-canvas flash that reads as the strike illuminating the sky, just like real lightning.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A demo bolt strikes automatically shortly after load.` },
      { title: 'Click anywhere on the canvas', text: `A new jagged, branching bolt strikes from the sky to that point.` },
      { title: 'Watch the flash', text: `The whole canvas briefly brightens on each new strike.` },
      { title: 'Watch bolts fade', text: `Each bolt's opacity decays over roughly 20 frames.` },
      { title: 'Adjust Jaggedness', text: `Higher values produce wilder, more chaotic bolt paths.` },
      { title: 'Strike repeatedly', text: `Up to 4 bolts can be visible and fading at once.` },
    ] },
    features: [
      { title: 'Recursive midpoint displacement', text: `The same fractal technique used for terrain/coastline generation.` },
      { title: 'Self-similar jaggedness', text: `Coarse kinks nest finer kinks at every recursion level.` },
      { title: 'Perpendicular-only displacement', text: `Keeps bolts progressing toward their target, never scribbling.` },
      { title: 'Fractal branch spawning', text: `Branches reuse the same displacement function at smaller scale.` },
      { title: 'Two-layer glow rendering', text: `A soft blurred outer stroke plus a bright narrow core.` },
      { title: 'Screen-flash on strike', text: `A brief bright fill sells the illumination of a real strike.` },
      { title: 'Click-to-strike interaction', text: `Bolts target wherever the user clicks.` },
      { title: 'DPR-aware rendering', text: `Crisp bolt linework on high-density displays.` },
    ],
    useCases: [
      { title: 'Weather/storm-themed landing pages', text: `An interactive, physically-inspired storm effect.` },
      { title: 'Gaming/entertainment sites', text: `A high-energy interactive hero background.` },
      { title: 'Educational/graphics teaching demos', text: `A compact, readable fractal-generation reference.` },
      { title: 'Music/event pages', text: `Reinforce an intense, electric visual mood.` },
      { title: 'Product launch pages', text: `A dramatic click-triggered attention effect.` },
      { title: 'Portfolio pieces', text: `Demonstrate procedural/fractal generation skill.` },
      { icon: 'CODE', title: 'Related: Coin Flip', desc: 'See the [Coin Flip](/ui-snippets/coin-flip/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Typewriter Glitch Gradient Reveal', desc: 'See the [Typewriter Glitch Gradient Reveal](/ui-snippets/typewriter-glitch-gradient-reveal/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is midpoint displacement, and why use it instead of random points?', a: `Midpoint displacement is a fractal-generation technique: take a straight segment, displace its midpoint perpendicular to the segment by a random amount, then recurse on each half with a smaller displacement budget. Because each recursion level operates at a smaller scale with proportionally smaller displacement, the result is self-similar roughness — large kinks with progressively finer kinks nested inside them — which looks like real lightning, terrain, or coastlines, rather than the scribbly path a fully random set of points would produce.` },
      { q: 'Why does the midpoint only move perpendicular to the segment, not in any direction?', a: `Restricting displacement to the perpendicular direction (computed as the segment's direction vector rotated 90 degrees) guarantees the bolt keeps making net progress from its start point toward its target, since no displacement ever pushes a point backward along the segment's own direction. Removing that constraint would let points jitter freely and the bolt would double back on itself, reading as scribble rather than a directed strike.` },
      { q: 'How do the branch bolts stay visually consistent with the main bolt?', a: `Branches are generated by calling the exact same displace() function used for the main bolt, just starting from a point partway along the main bolt, at a randomly offset angle, with a smaller recursion depth and displacement range. Reusing the identical fractal-generation logic (rather than a separate, simpler branch-drawing routine) is what makes branches look like they belong to the same lightning, not a different visual effect layered on top.` },
      { q: 'What causes the whole canvas to briefly flash white on a new strike?', a: `Each new strike sets a flash variable to 1, which decays exponentially (multiplied by 0.85) every frame. While flash is above a small threshold, the per-frame background fill uses a bright, near-white color scaled by the current flash value instead of the usual translucent dark wash used for the trailing-fade effect, producing a brief brightening of the entire canvas that reads as the strike illuminating the surrounding sky.` },
      { q: 'Can I make the bolt always strike from a fixed point, like a cloud position, instead of a random one?', a: `Yes — strike() currently randomizes the bolt's starting x-position with a spread proportional to canvas width; replace that randomized startX with a fixed value (or a value derived from a visible "cloud" element's position) to always originate bolts from the same point, while leaving the recursive displace() and branch logic completely unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why recursive midpoint displacement with a shrinking displacement budget per level produces self-similar, fractal-looking jaggedness, and why constraining displacement to the perpendicular direction is essential for the bolt to read as directed rather than scribbled. It's a great snippet to extend with an assistant — ask for a version with multiple simultaneous strikes across the sky, a version that strikes a specific DOM element's position (e.g. hitting a button on click for a "power surge" effect), or a slower-motion strike where the bolt animates growing from source to target instead of appearing instantly.`,
      prompt: `Build an interactive "procedural lightning" effect in plain HTML, CSS, and JavaScript using only the Canvas 2D API and a hand-rolled recursive midpoint-displacement algorithm — no external library.

Requirements:
- A recursive function that takes a straight line segment (two endpoints) and a maximum displacement amount, computes the segment's exact midpoint, displaces that midpoint perpendicular to the segment's direction by a random amount within the displacement budget, then recursively calls itself on the two resulting sub-segments (start-to-midpoint and midpoint-to-end) with a smaller displacement budget (e.g. multiplied by ~0.55) and one less recursion depth. Collect the resulting displaced points into an ordered array forming the jagged bolt path.
- On click anywhere on the canvas, generate a new bolt from a point near the top of the canvas (randomized horizontally) down to the clicked point using that recursive displacement function, and add it to an active-bolts list (capping the list at a small number, dropping the oldest when exceeded).
- After generating the main bolt's point list, walk its interior segments and, with a fixed probability per segment, spawn a short secondary "branch" bolt starting at that segment's endpoint, at a randomly offset angle, generated using the SAME recursive displacement function at a smaller recursion depth and displacement range — branches should look visually consistent with the main bolt, not drawn with different logic.
- Render each bolt with a two-layer glow: first stroke it wide, low-opacity, and heavily blurred (via shadowBlur) for a soft outer glow, then stroke it again narrow, high-opacity, and lightly blurred for a bright core, with branches rendered similarly but thinner and more transparent than the main bolt.
- Fade each bolt's opacity out over roughly 15-25 frames after it strikes, removing it from the active list once fully faded, using a semi-transparent full-canvas fill each frame (rather than clearRect) so trails/afterimages linger briefly.
- On every new strike, trigger a brief whole-canvas "flash": for a few frames immediately after a strike, use a bright near-white fill (decaying exponentially back to the normal translucent dark fill) instead of the normal per-frame background fill, simulating the strike illuminating the surrounding sky.
- Expose a "Jaggedness" slider controlling the initial displacement budget passed into the recursive function. Handle window resize and scale for devicePixelRatio so bolts render crisply on high-DPI screens.`,
    },
  },
};

export default canvasProceduralLightning;
