const canvasWaterRippleSimulation = {
  id: 'canvas-water-ripple-simulation',
  title: 'Canvas Water Ripple Simulation',
  lastmod: '2026-08-24',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="wr-wrap">
  <canvas id="wrCanvas" class="wr-canvas"></canvas>
  <p class="wr-hint">Click, drag, or touch the surface to disturb the water — real wave-equation propagation, not a decorative loop.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#04080c;color:#dbe9f2;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.wr-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:min(720px,96vw)}
.wr-canvas{width:100%;aspect-ratio:16/9;background:#04141c;border-radius:20px;border:1px solid rgba(255,255,255,.08);display:block;touch-action:none;cursor:crosshair}
.wr-hint{color:#5c7c8c;font-size:12px;letter-spacing:.03em;text-align:center}`,

  js: `const canvas = document.getElementById('wrCanvas');
const ctx = canvas.getContext('2d');
let width, height, dpr;

// Grid-based 2D wave equation simulation. Two height fields ("current"
// and "previous") are stepped forward with a discrete Laplacian: each
// cell's next height is pulled toward the average of its neighbors, with
// damping to bleed off energy over time -- the standard finite-difference
// approach to simulating a physical wave surface.
let cols, rows;
let cellSize = 5;
let current, previous;
let imgData, pixels;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  cols = Math.ceil((width * dpr) / cellSize);
  rows = Math.ceil((height * dpr) / cellSize);
  current = new Float32Array(cols * rows);
  previous = new Float32Array(cols * rows);
  imgData = ctx.createImageData(canvas.width, canvas.height);
  pixels = imgData.data;
}

const DAMPING = 0.986;

function idx(x, y) { return y * cols + x; }

function stepWave() {
  for (let y = 1; y < rows - 1; y++) {
    for (let x = 1; x < cols - 1; x++) {
      const i = idx(x, y);
      const neighborSum =
        previous[idx(x - 1, y)] +
        previous[idx(x + 1, y)] +
        previous[idx(x, y - 1)] +
        previous[idx(x, y + 1)];
      // Discrete wave equation: new height = (avg of neighbors * 2) - own
      // previous-previous height, damped. We reuse "current" as the frame
      // being written and "previous" as the frame just displayed to avoid
      // allocating a third buffer.
      current[i] = (neighborSum / 2 - current[i]) * DAMPING;
    }
  }
  const tmp = previous;
  previous = current;
  current = tmp;
}

function disturb(px, py, strength) {
  const gx = Math.floor((px * dpr) / cellSize);
  const gy = Math.floor((py * dpr) / cellSize);
  const radius = 2;
  for (let oy = -radius; oy <= radius; oy++) {
    for (let ox = -radius; ox <= radius; ox++) {
      const x = gx + ox, y = gy + oy;
      if (x > 0 && x < cols - 1 && y > 0 && y < rows - 1) {
        const falloff = 1 - Math.hypot(ox, oy) / (radius + 1);
        if (falloff > 0) previous[idx(x, y)] += strength * falloff;
      }
    }
  }
}

// Render the height field as shaded "water": the height gradient between
// neighboring cells is treated as a surface normal, and used to bend a
// light/dark value like refracted light -- this is what makes flat ripples
// look like they have real depth and caustics instead of a flat color map.
function render() {
  const cw = canvas.width;
  for (let y = 1; y < rows - 1; y++) {
    for (let x = 1; x < cols - 1; x++) {
      const h = previous[idx(x, y)];
      const hL = previous[idx(x - 1, y)];
      const hR = previous[idx(x + 1, y)];
      const hU = previous[idx(x, y - 1)];
      const hD = previous[idx(x, y + 1)];
      const gradX = (hR - hL) * 6;
      const gradY = (hD - hU) * 6;
      const shade = Math.max(-1, Math.min(1, gradX + gradY * 0.6));

      const baseR = 10, baseG = 60, baseB = 92;
      const r = clamp8(baseR + shade * 90 + h * 40);
      const g = clamp8(baseG + shade * 130 + h * 60);
      const b = clamp8(baseB + shade * 160 + h * 80 + 30);

      const startX = x * cellSize, startY = y * cellSize;
      const endX = Math.min(startX + cellSize, cw);
      const endY = Math.min(startY + cellSize, canvas.height);
      for (let yy = startY; yy < endY; yy++) {
        let p = (yy * cw + startX) * 4;
        for (let xx = startX; xx < endX; xx++) {
          pixels[p] = r; pixels[p + 1] = g; pixels[p + 2] = b; pixels[p + 3] = 255;
          p += 4;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
}
function clamp8(v) { return v < 0 ? 0 : v > 255 ? 255 : v | 0; }

function pointerPos(e) {
  const rect = canvas.getBoundingClientRect();
  const t = e.touches ? e.touches[0] : e;
  return { x: t.clientX - rect.left, y: t.clientY - rect.top };
}

let dragging = false;
let lastPos = null;
canvas.addEventListener('mousedown', e => { dragging = true; const p = pointerPos(e); disturb(p.x, p.y, 3.2); lastPos = p; });
window.addEventListener('mousemove', e => {
  if (!dragging) return;
  const p = pointerPos(e);
  disturb(p.x, p.y, 1.6);
  lastPos = p;
});
window.addEventListener('mouseup', () => { dragging = false; });
canvas.addEventListener('touchstart', e => { const p = pointerPos(e); disturb(p.x, p.y, 3.2); e.preventDefault(); }, { passive: false });
canvas.addEventListener('touchmove', e => { const p = pointerPos(e); disturb(p.x, p.y, 1.6); e.preventDefault(); }, { passive: false });

let dropTimer = 0;
function tick() {
  dropTimer++;
  if (dropTimer > 130) {
    dropTimer = 0;
    disturb(Math.random() * width, Math.random() * height, 2.4 + Math.random() * 1.5);
  }
  stepWave();
  render();
  requestAnimationFrame(tick);
}

resize();
disturb(width * 0.5, height * 0.5, 3);
window.addEventListener('resize', resize);
requestAnimationFrame(tick);`,

  seo: {
    title: 'Canvas Water Ripple Simulation — Free Wave-Equation Physics Snippet',
    description: `A real 2D wave-equation simulation stepped forward on a height-field grid every frame, rendered as shaded, refracted water using surface-normal shading — click or drag to disturb it. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Water Ripple Simulation — A Real Finite-Difference Wave Equation',
      description: `Most "ripple" web effects are an expanding circle with fading opacity — a fake that looks fine for one ripple but can't handle interference between multiple overlapping ripples. This snippet instead simulates an actual discretized wave equation on a height-field grid, so overlapping ripples genuinely interfere, reflect, and combine the way real water does.

**Two height buffers, stepped with a discrete Laplacian**

The water surface is represented as two \`Float32Array\` grids — \`current\` and \`previous\` — one cell per small block of the canvas. Every frame, \`stepWave()\` computes each interior cell's new height from the average of its four neighbors in the previous frame, combined with the cell's own prior value and a damping factor. This is the standard finite-difference discretization of the 2D wave equation (\`∂²h/∂t² = c²∇²h\`), the same family of numerical method used in real fluid and acoustic simulations — just simplified to keep it fast enough for real-time canvas rendering.

**Damping bleeds off energy so ripples settle**

Without damping, a disturbed wave equation grid oscillates forever, accumulating numerical noise. Multiplying every cell's new value by a \`DAMPING\` constant just under 1 each step causes ripples to visibly lose energy and flatten out over time — exactly like real water settling back to stillness after a splash, rather than an animation that has to be manually faded or timed out.

**Disturbances are radius-falloff nudges to the height field**

Clicking, dragging, or touching the canvas calls \`disturb()\`, which adds a positive value to a small neighborhood of grid cells around the pointer, weighted by distance from center — a soft "poke" rather than a hard single-cell spike. Because this nudge feeds directly into the same simulation grid the wave equation steps forward, every disturbance genuinely propagates outward and interacts with any other disturbances already rippling across the surface.

**Rendering treats the height gradient as a light-bending surface**

Rather than mapping height directly to a color, \`render()\` computes the local height gradient between each cell and its horizontal/vertical neighbors and uses that gradient to brighten or darken the base water color — approximating how a real water surface refracts light depending on its local slope. That gradient-based shading, not the raw height value, is what makes the ripples look like they have real depth and caustic-like glints instead of a flat contour map.

Compare with [canvas fluid cursor trail](/ui-snippets/canvas-fluid-cursor-trail/), which fakes an organic look with blended gradients rather than solving an actual PDE on a grid.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A still water surface renders with a gentle initial ripple.` },
      { title: 'Click or touch the surface', text: `A disturbance is injected and propagates outward as real waves.` },
      { title: 'Drag across the surface', text: `A continuous trail of overlapping ripples spreads and interferes.` },
      { title: 'Watch multiple ripples meet', text: `Overlapping waves genuinely combine, not just visually overlap.` },
      { title: 'Wait and observe', text: `Damping settles the surface back to stillness over a few seconds.` },
      { title: 'Occasional auto-drops', text: `A random ambient disturbance fires periodically if left alone.` },
    ] },
    features: [
      { title: 'Real finite-difference wave equation', text: `A genuine discretized PDE solver, not a decorative animation.` },
      { title: 'True wave interference', text: `Overlapping ripples physically combine on the shared height grid.` },
      { title: 'Energy-damped settling', text: `Ripples naturally flatten out instead of oscillating forever.` },
      { title: 'Gradient-based refraction shading', text: `Surface slope drives brightness for a real sense of depth.` },
      { title: 'Radius-falloff disturbances', text: `Soft, weighted pokes rather than single-pixel spikes.` },
      { title: 'Drag-to-ripple interaction', text: `Continuous dragging creates a trailing wake of waves.` },
      { title: 'Ambient auto-drops', text: `Periodic random disturbances keep the surface alive when idle.` },
      { title: 'ImageData rasterization', text: `Direct pixel-buffer rendering for full shading control.` },
    ],
    useCases: [
      { title: 'Physics/simulation teaching demos', text: `A compact, readable finite-difference wave-equation reference.` },
      { title: 'Water/ocean/marine brand pages', text: `A physically real interactive water surface.` },
      { title: 'Portfolio pieces', text: `Demonstrate numerical simulation and canvas skill.` },
      { title: 'Relaxation/wellness apps', text: `A calming, tactile ripple-response interaction.` },
      { title: 'Interactive hero sections', text: `A tactile, physics-grounded background element.` },
      { title: 'Game dev prototyping', text: `A starting point for water-surface rendering techniques.` },
      { icon: 'CODE', title: 'Related: CSS Loader Gallery', desc: 'See the [CSS Loader Gallery](/ui-snippets/css-loader-gallery/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Variable Font Weight Breathe', desc: 'See the [Variable Font Weight Breathe](/ui-snippets/variable-font-weight-breathe/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from a typical CSS/canvas "ripple" effect?', a: `A typical ripple effect draws an expanding, fading circle per click — it looks fine in isolation but has no real physical model, so multiple overlapping ripples just draw on top of each other rather than genuinely interacting. This snippet instead solves a discretized 2D wave equation on a height-field grid every frame, so multiple disturbances physically add together, interfere, and propagate exactly like real overlapping water waves.` },
      { q: 'What is the actual math behind the wave simulation?', a: `Every interior grid cell's new height is computed as roughly the average of its four immediate neighbors' previous heights, combined with the cell's own prior value, then scaled by a damping factor just under 1. This is a standard finite-difference discretization of the wave equation (∂²h/∂t² proportional to the Laplacian of height) — the same family of numerical technique used in real fluid, acoustic, and seismic simulations, simplified enough to run at 60fps in plain JavaScript.` },
      { q: 'Why do the ripples eventually stop and settle instead of oscillating forever?', a: `Every simulation step multiplies each cell's new value by a DAMPING constant just under 1 (0.986). Applied every frame across the whole grid, that small per-step energy loss compounds until the surface flattens back toward zero, which is what makes the water visibly settle to stillness after a disturbance rather than oscillating indefinitely — matching how energy dissipates in a real water surface through friction and viscosity.` },
      { q: 'How does the rendering create a sense of depth from a flat height grid?', a: `Instead of mapping each cell\\'s raw height to a color, render() computes the difference in height between each cell and its horizontal and vertical neighbors — an approximation of the local surface slope — and uses that gradient to brighten or darken the base water color. Sloped regions (the sides of a ripple) render lighter or darker than flat regions, approximating how a real water surface refracts and reflects light differently depending on its local angle, which is what gives the simulation a sense of physical depth rather than looking like a flat contour map.` },
      { q: 'Would this approach work for a larger or more detailed water surface?', a: `The grid resolution (cellSize) directly trades detail for performance, since the simulation and render cost both scale with the number of grid cells. For a larger or higher-resolution surface, you would either increase cellSize\\'s divisor for a bigger grid (at a performance cost you would need to test), move the simulation step into a Web Worker or WebGL shader to parallelize it, or reduce simulation resolution while still rendering at a higher visual resolution via interpolation between grid cells.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the discrete Laplacian in stepWave() approximates the real wave equation, why damping is necessary for the simulation to look physically plausible rather than oscillating forever, and how the gradient-based shading in render() turns raw height values into a convincing sense of light and depth. It's a great snippet to extend with an assistant — ask for reflective "walls" at the canvas edges instead of open boundaries, a version with a fixed obstacle in the middle of the pool that waves bounce off of, or moving the simulation step into a WebGL fragment shader for much higher resolution at the same frame rate.`,
      prompt: `Build an interactive "water ripple simulation" in plain HTML, CSS, and JavaScript using only the Canvas 2D API, manual ImageData rendering, and a hand-rolled discretized 2D wave equation — no physics or fluid-simulation library.

Requirements:
- Represent the water surface as two same-sized Float32Array grids ("current" and "previous" height fields), one value per grid cell, where the grid is coarser than actual device pixels (e.g. a 4-6px cell size scaled by devicePixelRatio) for performance.
- Implement a wave-equation simulation step that runs every animation frame: for every interior grid cell, compute a new height as approximately the average of its four immediate neighbors' previous heights combined with the cell's own prior value, then multiply the result by a damping constant just under 1 (e.g. 0.986) so energy dissipates over time and the surface naturally settles back toward flat rather than oscillating forever. Swap the two buffers (or otherwise rotate frame history) each step rather than allocating new arrays.
- Implement a disturb(x, y, strength) function that adds a positive value to a small neighborhood of grid cells around a given canvas position, weighted by distance from the center (a soft radius falloff, not a single-cell spike), directly into the height field the simulation reads from.
- Wire disturb() to mousedown/mousemove-while-dragging and touchstart/touchmove events so clicking, dragging, and touching the canvas injects ripples that propagate outward and interfere with any other ripples already active on the shared grid. Also fire an occasional random ambient disturbance (e.g. roughly every 2 seconds) when the surface would otherwise sit idle.
- Render the height field every frame by computing, for each grid cell, the height difference to its horizontal and vertical neighbors (an approximate surface gradient/slope), and use that gradient — not the raw height value — to brighten or darken a base water color before writing the result into an ImageData buffer as a block of pixels per cell, simulating how a real water surface refracts light depending on local slope. Push the buffer to the canvas with putImageData once per frame.
- Handle window resize by reallocating the grid and ImageData buffer at the new dimensions, and support both mouse and touch input throughout.`,
    },
  },
};

export default canvasWaterRippleSimulation;
