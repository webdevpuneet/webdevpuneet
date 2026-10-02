const canvasFractalTree = {
  id: 'canvas-fractal-tree',
  title: 'Canvas Fractal Tree Generator',
  lastmod: '2026-08-24',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="ft-wrap">
  <canvas id="ftCanvas" class="ft-canvas"></canvas>
  <div class="ft-panel">
    <span class="ft-tag">recursive branching · L-system-like</span>
    <div class="ft-row">
      <label>Depth <span id="ftDepthVal">10</span></label>
      <input type="range" id="ftDepth" min="4" max="13" value="10" step="1" />
    </div>
    <div class="ft-row">
      <label>Branch angle <span id="ftAngleVal">26°</span></label>
      <input type="range" id="ftAngle" min="10" max="55" value="26" step="1" />
    </div>
    <p class="ft-hint">Move the cursor left/right to sway the tree like wind.</p>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0f0a;color:#e6f2e6;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ft-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;width:min(760px,96vw)}
.ft-canvas{width:100%;aspect-ratio:4/3;background:linear-gradient(#0a1a12,#06110a);border-radius:16px;border:1px solid rgba(255,255,255,.08);display:block}
.ft-panel{width:100%;display:flex;flex-wrap:wrap;align-items:center;gap:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 18px}
.ft-tag{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#86efac;background:rgba(134,239,172,.1);border:1px solid rgba(134,239,172,.3);padding:4px 10px;border-radius:99px}
.ft-row{display:flex;align-items:center;gap:8px;font-size:12px;color:#c4dcc4}
.ft-row input{accent-color:#4ade80}
.ft-hint{font-size:12px;color:#7fa688;flex:1 1 200px}`,

  js: `const canvas = document.getElementById('ftCanvas');
const ctx = canvas.getContext('2d');
const depthSlider = document.getElementById('ftDepth');
const angleSlider = document.getElementById('ftAngle');
const depthVal = document.getElementById('ftDepthVal');
const angleVal = document.getElementById('ftAngleVal');

let width, height, dpr;
let sway = 0;
let targetSway = 0;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const nx = (e.clientX - rect.left) / rect.width; // 0..1
  targetSway = (nx - 0.5) * 0.5; // radians of extra lean
});
canvas.addEventListener('mouseleave', () => { targetSway = 0; });
canvas.addEventListener('touchmove', e => {
  const rect = canvas.getBoundingClientRect();
  const t = e.touches[0];
  const nx = (t.clientX - rect.left) / rect.width;
  targetSway = (nx - 0.5) * 0.5;
}, { passive: true });

// Recursive branch drawing: each call draws one segment, then recurses
// twice (left/right children) with reduced length and depth. The branch
// angle spread and length-shrink factor are the only two parameters that
// separate a bushy tree from a sparse one -- everything else is recursion.
function branch(x, y, len, angle, depth, maxDepth, spreadRad) {
  if (depth <= 0 || len < 2) return;

  const windFactor = (maxDepth - depth) / maxDepth; // outer branches sway more
  const a = angle + sway * windFactor * 1.4;
  const x2 = x + Math.cos(a) * len;
  const y2 = y + Math.sin(a) * len;

  const t = depth / maxDepth;
  ctx.lineWidth = Math.max(1, t * 9);
  const green = 140 + (1 - t) * 90;
  ctx.strokeStyle = depth > maxDepth - 2
    ? 'rgba(120,80,50,0.95)'
    : 'hsla(' + (100 + (1 - t) * 40) + ',55%,' + (30 + t * 20) + '%,0.95)';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  if (depth <= 2) {
    ctx.beginPath();
    ctx.fillStyle = 'hsla(' + (95 + Math.random() * 40) + ',65%,55%,0.85)';
    ctx.arc(x2, y2, 3 + Math.random() * 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  const shrink = 0.72 + Math.random() * 0.06;
  branch(x2, y2, len * shrink, a - spreadRad * (0.8 + Math.random() * 0.4), depth - 1, maxDepth, spreadRad);
  branch(x2, y2, len * shrink, a + spreadRad * (0.8 + Math.random() * 0.4), depth - 1, maxDepth, spreadRad);
}

function render() {
  ctx.clearRect(0, 0, width, height);
  const depth = parseInt(depthSlider.value, 10);
  const spreadDeg = parseInt(angleSlider.value, 10);
  depthVal.textContent = String(depth);
  angleVal.textContent = spreadDeg + '\\u00b0';
  const spreadRad = (spreadDeg * Math.PI) / 180;
  const startLen = height * 0.24;
  branch(width / 2, height - 6, startLen, -Math.PI / 2, depth, depth, spreadRad);
}

let lastSeed = 0;
function tick() {
  sway += (targetSway - sway) * 0.06;
  render();
  requestAnimationFrame(tick);
}

depthSlider.addEventListener('input', render);
angleSlider.addEventListener('input', render);
window.addEventListener('resize', () => { resize(); render(); });

resize();
requestAnimationFrame(tick);`,

  seo: {
    title: 'Canvas Fractal Tree Generator — Free Recursive Branching Snippet',
    description: `A recursive fractal tree drawn branch by branch with plain trigonometry, swaying toward the cursor like wind, with live depth and branch-angle controls. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Fractal Tree Generator — Recursion as the Entire Algorithm',
      description: `A fractal tree is one of the clearest illustrations of recursion producing organic complexity: one function, \`branch()\`, calls itself twice per invocation, and the tree's entire branching structure falls out of how those calls compound.

**One function draws a segment, then recurses twice**

Every call to \`branch()\` draws exactly one line segment from a starting point at a given angle and length, then calls itself twice more — once angled left by \`spreadRad\`, once angled right — each with a shrunken length and one less depth remaining. There's no tree data structure built up in memory; the recursive call stack *is* the tree structure, and the canvas drawing happens as a side effect of walking it.

**Two knobs control the whole shape: depth and spread angle**

\`maxDepth\` (via the Depth slider) controls how many branch generations occur before recursion bottoms out — small values produce a stick with a few forks, large values produce a dense, twiggy canopy. \`spreadRad\` (via Branch angle) controls how far each child branch diverges from its parent's direction — narrow angles produce a tall, columnar tree; wide angles produce a broad, sprawling one. Every branch in the whole tree obeys the same two parameters, which is why such a small amount of code produces such varied results.

**Randomized shrink and spread avoid mechanical symmetry**

If every branch shrank by exactly the same factor and split at exactly the same angle, the tree would look like a rigid, obviously-generated diagram. Small per-branch randomization on both the length-shrink factor and the spread angle (\`0.8 + Math.random() * 0.4\`) breaks that symmetry just enough to read as organic rather than mathematical, without changing the underlying recursive structure at all.

**Depth-based rendering, not a separate pass**

Line width, color (green fading toward brown near the trunk, leaf dots at the outermost depth), and wind sensitivity are all derived directly from the current \`depth\` value relative to \`maxDepth\` inside the same recursive call — there's no second traversal to add color or leaves after the fact.

**Wind as an angle offset proportional to distance from the trunk**

Cursor position sets a \`targetSway\` value, smoothly eased into \`sway\` each frame. Every branch's angle is nudged by \`sway * windFactor\`, where \`windFactor\` grows for branches further from the trunk — so outer twigs visibly sway more than the thick trunk, exactly like a real tree in wind, using the same depth value already available in the recursive call.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A recursive fractal tree renders from the base upward.` },
      { title: 'Move the cursor left/right', text: `The tree leans and sways like it's caught in wind.` },
      { title: 'Adjust Depth', text: `More generations of branches produce a denser canopy.` },
      { title: 'Adjust Branch angle', text: `Wider angles produce a broader, more sprawling shape.` },
      { title: 'Watch the outer twigs', text: `They sway more than the trunk, proportional to their depth.` },
      { title: 'Resize the window', text: `The tree re-renders from its base to fit the new canvas.` },
    ] },
    features: [
      { title: 'Pure recursive drawing', text: `One function, two recursive calls, no tree data structure.` },
      { title: 'Depth-driven styling', text: `Color, width, and leaf dots derived from recursion depth.` },
      { title: 'Live depth control', text: `A slider changes how many branch generations render.` },
      { title: 'Live spread-angle control', text: `A slider changes the branching angle for every branch.` },
      { title: 'Organic randomization', text: `Per-branch shrink/angle jitter avoids mechanical symmetry.` },
      { title: 'Cursor-driven wind sway', text: `Outer branches sway more than the trunk, proportional to depth.` },
      { title: 'Leaf accents', text: `Small dots render at the outermost branch tips.` },
      { title: 'DPR-aware rendering', text: `Crisp branch linework on high-density displays.` },
    ],
    useCases: [
      { title: 'Recursion teaching', text: 'Show recursion in action with one `branch()` function calling itself twice, producing the whole tree without any stored data structure.' },
      { title: 'Eco and nature brand pages', text: 'Add an organic, growing visual that sways toward the cursor like wind, with leaf dots at the tips.' },
      { title: 'Generative art backgrounds', text: 'Create a unique tree shape from the depth and spread settings, adjusting the branching angle for every branch with one slider.' },
      { title: 'Progress and growth visuals', text: 'Animate the depth increasing over time to suggest growth, with colour and line width derived from recursion depth.' },
      { title: 'Computer science coursework', text: 'Illustrate recursion with an immediate visual result, as a live depth control changes how many branch generations render.' },
      { icon: 'CODE', title: 'Related: Canvas Procedural Lightning', desc: 'See the [Canvas Procedural Lightning](/ui-snippets/canvas-procedural-lightning/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Number to Word Morph Counter', desc: 'See the [Number to Word Morph Counter](/ui-snippets/number-word-morph-counter/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does one recursive function produce an entire tree?', a: `branch() draws a single line segment, then calls itself exactly twice with a reduced length, one less depth, and an angle offset left or right by the spread angle. Because each of those two calls does the same thing again, the recursive call stack expands into every branch of the tree; there's no explicit tree data structure being built anywhere, the recursion itself is the branching structure.` },
      { q: 'What determines when the recursion stops?', a: `Two guard conditions at the top of branch(): depth <= 0 (the branch has used up its allotted number of generations, set by the Depth slider) or len < 2 (the branch has shrunk small enough that drawing it further would be visually meaningless). Either condition returns immediately without recursing further, which is what keeps a tree with a large depth value from recursing infinitely.` },
      { q: 'Why does the tree look organic instead of perfectly symmetric?', a: `Each recursive call applies a small random jitter to both the length-shrink factor and the spread angle of its two children, rather than using fixed values everywhere. That small per-branch randomization is applied identically at every level of recursion, so the irregularity compounds naturally across generations without needing any special-case logic.` },
      { q: 'How does the wind-sway effect know which branches are "outer" versus "inner"?', a: `It reuses the same depth value already passed through the recursion. windFactor is computed as (maxDepth - depth) / maxDepth, which is 0 near the trunk (where depth is close to maxDepth) and approaches 1 near the outermost twigs (where depth is close to 0). Multiplying the cursor-driven sway value by that factor means outer branches lean noticeably more than the trunk, with zero extra bookkeeping beyond the recursion depth that was already tracked.` },
      { q: 'Can I turn this into an animated growing tree instead of a static render?', a: `Yes — instead of rendering at a fixed Depth value from the slider, drive an incrementing depth variable up from 0 over time (e.g. incrementing roughly once per second inside the animation loop, capped at the slider's max) and re-render on each increment. Since render() always draws the full tree fresh from the trunk outward, incrementing depth over time naturally produces a growth animation with no other code changes.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why a single recursive function with two self-calls is sufficient to produce the entire tree structure with no explicit data structure, and how the depth parameter doubles as both the recursion's stopping condition and the input to the wind-sway and color calculations. It's a great snippet to extend with an assistant — ask for an animated growth sequence (depth incrementing over time), a version using an L-system string-rewriting approach instead of direct recursion for more varied branching rules, or seasonal color palettes (blossoms in spring, bare branches in winter) swapped based on a parameter.`,
      prompt: `Build a "recursive fractal tree" generator in plain HTML, CSS, and JavaScript using only the Canvas 2D API — no external library, pure recursion and trigonometry.

Requirements:
- A single recursive function that draws one branch as a line segment from a given start point, at a given angle and length, then recursively calls itself exactly twice for the two child branches — one angled left by a "spread" angle, one angled right — each with a reduced length (shrunk by a randomized factor per call, e.g. 0.72 plus a small random jitter) and one less remaining "depth." Recursion stops when depth reaches 0 or the branch length drops below a small threshold (e.g. 2px).
- Expose a live "Depth" slider (roughly 4-13) controlling how many branch generations occur, and a live "Branch angle" slider (roughly 10-55 degrees) controlling how far child branches diverge from their parent's direction — re-render the full tree from scratch whenever either changes.
- Derive per-branch visual styling directly from the current recursion depth relative to the max depth in the same recursive call (no separate pass): line width should taper from thick near the trunk to thin near the tips, color should shift from a brownish trunk tone near the base to greener tones toward the tips, and small leaf-like dots should render at the outermost 1-2 depth levels.
- Add a small random angle/length jitter to every recursive call (not just a uniform fixed shrink and spread) so the tree reads as organic rather than perfectly symmetric.
- Track cursor (and touch) horizontal position across the canvas, mapping it to a "target sway" angle offset, smoothly eased toward each frame. Apply that sway to every branch's angle in the recursive draw, scaled by how far that branch is from the trunk (using the same depth value already available in the recursion) so outer branches visibly sway more than the trunk, simulating wind.
- Handle window resize by recalculating canvas dimensions and re-rendering the tree from its base, and scale for devicePixelRatio so branches render crisply on high-DPI screens.`,
    },
  },
};

export default canvasFractalTree;
