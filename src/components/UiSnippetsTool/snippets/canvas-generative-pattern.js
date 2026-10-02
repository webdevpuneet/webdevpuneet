const canvasGenerativePattern = {
  id: 'canvas-generative-pattern',
  title: 'Canvas Generative Truchet Pattern',
  lastmod: '2026-08-24',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="gp-wrap">
  <canvas id="gpCanvas" class="gp-canvas"></canvas>
  <div class="gp-panel">
    <span class="gp-tag">truchet tiles · generative art</span>
    <div class="gp-row">
      <label>Tile size <span id="gpSizeVal">36</span></label>
      <input type="range" id="gpSize" min="16" max="72" value="36" step="2" />
    </div>
    <div class="gp-row">
      <label>Palette</label>
      <select id="gpPalette">
        <option value="sunset">Sunset</option>
        <option value="ocean">Ocean</option>
        <option value="mono">Mono</option>
      </select>
    </div>
    <button class="gp-btn" id="gpRegen">Regenerate</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0a10;color:#eee;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.gp-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;width:min(760px,96vw)}
.gp-canvas{width:100%;aspect-ratio:16/9;background:#0b0a10;border-radius:16px;border:1px solid rgba(255,255,255,.08);display:block}
.gp-panel{width:100%;display:flex;flex-wrap:wrap;align-items:center;gap:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 18px}
.gp-tag{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#fca5a5;background:rgba(252,165,165,.1);border:1px solid rgba(252,165,165,.3);padding:4px 10px;border-radius:99px}
.gp-row{display:flex;align-items:center;gap:8px;font-size:12px;color:#c9c4d0}
.gp-row input,.gp-row select{accent-color:#fb7185}
.gp-row select{background:#1a1720;color:#eee;border:1px solid rgba(255,255,255,.14);border-radius:6px;padding:4px 8px;font-size:12px}
.gp-btn{margin-left:auto;background:#2a141a;border:1px solid rgba(252,165,165,.3);color:#fca5a5;font-size:12.5px;font-weight:600;padding:8px 14px;border-radius:9px;cursor:pointer}
.gp-btn:hover{background:#3a1a22}`,

  js: `const canvas = document.getElementById('gpCanvas');
const ctx = canvas.getContext('2d');
const sizeSlider = document.getElementById('gpSize');
const sizeVal = document.getElementById('gpSizeVal');
const paletteSel = document.getElementById('gpPalette');
const regenBtn = document.getElementById('gpRegen');

let width, height, dpr;

const PALETTES = {
  sunset: ['#fb7185', '#f97316', '#fbbf24', '#7c2d12'],
  ocean: ['#22d3ee', '#0ea5e9', '#6366f1', '#0f172a'],
  mono: ['#e5e7eb', '#9ca3af', '#4b5563', '#111827']
};

let seed = Math.random();
function rand() {
  // Simple mulberry32 PRNG so a given seed always reproduces the same tiling.
  seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  render();
}

// Each Truchet tile is a square divided by a quarter-circle arc from one
// corner pair to the other; picking the arc orientation randomly per tile
// (0 or 1) is the entire trick behind the emergent maze-like pattern —
// there is no global path-planning, only a per-cell coin flip.
function drawTile(x, y, size, variant, colors) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, size, size);

  const r = size / 2;
  ctx.strokeStyle = colors[1];
  ctx.lineWidth = Math.max(2, size * 0.09);
  ctx.lineCap = 'round';

  if (variant === 0) {
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI / 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(size, size, r, Math.PI, Math.PI * 1.5); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.arc(size, 0, r, Math.PI / 2, Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, size, r, Math.PI * 1.5, Math.PI * 2); ctx.stroke();
  }
  ctx.restore();
}

function render() {
  const size = parseInt(sizeSlider.value, 10);
  sizeVal.textContent = String(size);
  const palette = PALETTES[paletteSel.value];
  const cols = Math.ceil(width / size) + 1;
  const rows = Math.ceil(height / size) + 1;

  ctx.clearRect(0, 0, width, height);
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const variant = rand() < 0.5 ? 0 : 1;
      const bg = [palette[3], palette[2]][((gx + gy) % 2)];
      const line = palette[rand() < 0.5 ? 0 : 1];
      drawTile(gx * size, gy * size, size, variant, [bg, line]);
    }
  }
}

function regenerate() {
  seed = (Math.random() * 4294967296) >>> 0;
  seedSnapshot = seed;
  render();
}

sizeSlider.addEventListener('input', () => { seed = seedSnapshot; render(); });
let seedSnapshot = seed;
regenBtn.addEventListener('click', regenerate);
paletteSel.addEventListener('change', () => { seed = seedSnapshot; render(); });
window.addEventListener('resize', () => { resize(); });

seedSnapshot = seed;
resize();`,

  seo: {
    title: 'Canvas Generative Truchet Pattern — Free Procedural Tile Art Snippet',
    description: `An infinite maze-like pattern generated from a grid of Truchet tiles — square cells with a randomly oriented quarter-circle arc — rendered on a 2D canvas with a seeded PRNG for reproducible results. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Generative Truchet Pattern — Complexity From One Coin Flip Per Tile',
      description: `Truchet tiles are one of the oldest tricks in generative art: take a simple square tile with an asymmetric decoration, place it in a grid with a random rotation per cell, and the *emergent* large-scale pattern looks far more complex than the simple per-tile rule that produced it. This snippet implements the classic quarter-circle-arc variant from scratch on canvas.

**Two tile variants, chosen independently per cell**

Each square cell is filled with one of exactly two possible tiles: a quarter-circle arc connecting the top-left and bottom-right corner pair, or the same arc mirrored to connect the top-right and bottom-left pair instead. \`drawTile()\` draws whichever variant it's told to; \`render()\` picks the variant for every single grid cell independently with a coin flip. There is no path-planning, no maze-solving algorithm, and no lookahead between neighboring cells — the maze-like continuity you see emerging across many tiles is a byproduct of how frequently adjacent arcs happen to line up, not something explicitly constructed.

**A seeded PRNG for reproducible regeneration**

Rather than relying on \`Math.random()\` directly (which can't be replayed), the pattern uses a small hand-rolled \`mulberry32\`-style generator seeded from a single 32-bit integer. Because every call to \`rand()\` is a deterministic function of the current internal seed state, re-running \`render()\` with the same starting seed reproduces an identical tiling — which is what lets the tile-size and palette controls re-render the *same* pattern at a new scale/color instead of generating an unrelated new layout every time you touch a slider, while the Regenerate button explicitly reseeds for a genuinely new layout.

**Checkerboard background alternation for depth**

Background fill color alternates by \`(gx + gy) % 2\` — a simple checkerboard parity check — layered underneath the arcs, which are drawn with a random pick from the remaining palette colors. That combination is what keeps the pattern from reading as flat: two independent random processes (arc orientation and arc/background color selection) overlaid on the grid.

For other from-scratch generative canvas art, see [canvas noise terrain generator](/ui-snippets/canvas-noise-terrain/), which uses continuous Perlin noise instead of discrete tile rules.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A grid of randomly oriented Truchet tiles renders immediately.` },
      { title: 'Adjust Tile size', text: `Re-renders the same seed at coarser or finer granularity.` },
      { title: 'Change Palette', text: `Switch between Sunset, Ocean, and Mono color sets.` },
      { title: 'Click Regenerate', text: `Reseeds the PRNG for an entirely new tile layout.` },
      { title: 'Observe emergent paths', text: `Maze-like continuous lines appear with no explicit path logic.` },
      { title: 'Resize the window', text: `The grid recalculates to fill the new canvas size.` },
    ] },
    features: [
      { title: 'Classic Truchet tiling', text: `Two quarter-circle-arc variants chosen per cell.` },
      { title: 'Seeded PRNG', text: `A mulberry32-style generator for reproducible patterns.` },
      { title: 'Reproducible re-renders', text: `Palette/size changes replay the same seed at new settings.` },
      { title: 'True regenerate', text: `A dedicated button reseeds for a genuinely new layout.` },
      { title: 'Three built-in palettes', text: `Sunset, Ocean, and Mono color sets.` },
      { title: 'Checkerboard depth layer', text: `Alternating background parity underneath the arcs.` },
      { title: 'No path-planning logic', text: `Emergent maze look from independent per-tile randomness.` },
      { title: 'DPR-aware rendering', text: `Crisp tile arcs on high-density displays.` },
    ],
    useCases: [
      { title: 'Generative art backgrounds', text: 'Give every page a unique tiled maze-like pattern, built from two quarter-circle arc variants chosen at random for each cell.' },
      { title: 'Print and design product pages', text: 'Demonstrate procedural pattern making on a design product page, with a seeded mulberry32-style generator making every design exactly reproducible.' },
      { title: 'Textile and wallpaper previews', text: 'Preview repeating tile designs at different sizes and palettes while the same seed replays at the new settings.' },
      { title: 'Emergent complexity teaching', text: 'Show how a simple tile plus a random rotation per cell produces patterns that look far more complicated than their rules.' },
      { title: 'Idle and loading screens', text: 'Fill waiting moments with a visually rich pattern, using the Regenerate button to reseed and produce a genuinely new layout.' },
      { icon: 'CODE', title: 'Related: Canvas Rope Physics', desc: 'See the [Canvas Rope Physics](/ui-snippets/canvas-rope-physics/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Proximity Glow Button', desc: 'See the [Proximity Glow Button](/ui-snippets/proximity-glow-button/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is a Truchet tile?', a: `A Truchet tile is a simple square tile with an asymmetric internal decoration — here, a quarter-circle arc connecting one pair of adjacent corners. When many such tiles are placed in a grid with randomly chosen orientations, the arcs from neighboring tiles frequently connect, producing continuous, maze-like curved paths across the whole grid despite each tile being decided completely independently.` },
      { q: 'Is there any actual maze-solving or path-planning happening?', a: `No. Every tile's arc orientation is chosen with an independent coin flip in render(), with zero awareness of its neighbors' choices. The maze-like continuous paths you perceive across the pattern are a purely visual, emergent byproduct of how often adjacent arcs happen to align — this is the entire point of Truchet tiling as a technique: complexity from simple, uncoordinated local rules.` },
      { q: 'Why use a custom seeded PRNG instead of Math.random()?', a: `Math.random() cannot be replayed — you can't ask it to reproduce the exact same sequence of values later. The hand-rolled mulberry32-style generator here is seeded from one integer, and every call deterministically advances from that seed, so re-running the render function with the same starting seed always reproduces the exact same tile layout, which is what lets the Tile size and Palette controls re-render the current pattern rather than jumping to an unrelated new one.` },
      { q: 'Why do the Tile size and Palette controls not generate a new pattern, but Regenerate does?', a: `Changing size or palette resets the PRNG to the last snapshotted seed before re-rendering, replaying the identical sequence of random choices at the new tile size or color set. Regenerate instead assigns a brand-new random seed value before rendering, which is the only control that actually produces a different tile layout.` },
      { q: 'Can I make the tiles connect to form an actual solvable maze with one guaranteed path?', a: `Yes, but it requires a different generation approach — a real maze algorithm (recursive backtracker, Prim's, or Kruskal's) that tracks visited cells and explicitly avoids creating cycles, then maps its wall/passage decisions onto tile orientations. The random-coin-flip approach here optimizes for a visually rich, unsolvable-maze aesthetic rather than a single guaranteed path between two points.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why picking each tile's arc orientation completely independently (no lookahead, no shared state between neighbors) is enough to produce a convincing maze-like pattern, and why the seeded PRNG is what allows the Tile size and Palette controls to re-render the same layout instead of generating a new one on every interaction. It's a great snippet to extend with an assistant — ask for additional tile variants (straight lines, diagonals, or a mix of arc and straight tiles chosen per cell), an animated version where tiles flip orientation on a staggered timer, or a real solvable-maze mode using a recursive-backtracker algorithm instead of independent coin flips.`,
      prompt: `Build a "generative Truchet tile pattern" in plain HTML, CSS, and JavaScript using only the Canvas 2D API and a hand-rolled seeded pseudo-random number generator — no external generative-art or noise library.

Requirements:
- Implement a small seeded PRNG (e.g. a mulberry32-style integer-hash generator) that produces a deterministic, replayable sequence of pseudo-random floats from a given 32-bit integer seed — not Math.random() directly, since it must be exactly reproducible when re-run with the same seed.
- Draw a grid of square tiles filling the canvas. Each tile is one of exactly two visual variants: a quarter-circle arc connecting the top-left/bottom-right corner pair, or the mirrored arc connecting the top-right/bottom-left corner pair — choose which variant to draw for each grid cell independently via a coin-flip from the seeded PRNG, with no coordination or lookahead between neighboring cells (the maze-like continuity should be a pure emergent side effect of independent random choices, not explicitly constructed).
- Fill each tile's background with a color chosen by alternating a simple checkerboard parity check on the cell's grid coordinates, and stroke each tile's arc with a color independently randomly chosen from a small palette, drawn on top of the background.
- Provide at least 2-3 selectable color palettes (arrays of hex colors) via a dropdown, and a tile-size slider. Changing the tile size or palette should reset the PRNG to the currently active seed and re-render the SAME tile layout at the new size/colors (i.e. these controls replay, not regenerate).
- Provide a separate "Regenerate" button that picks a brand-new random seed and re-renders, producing a genuinely different tile layout.
- Handle window resize by recalculating how many grid columns/rows are needed to fill the new canvas dimensions and re-rendering, and scale for devicePixelRatio so arcs render crisply on high-DPI displays.`,
    },
  },
};

export default canvasGenerativePattern;
