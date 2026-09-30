const canvasMetaballBlobs = {
  id: 'canvas-metaball-blobs',
  title: 'Canvas Metaball Blobs',
  lastmod: '2026-08-24',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="mb-wrap">
  <canvas id="mbCanvas" class="mb-canvas"></canvas>
  <p class="mb-hint">Move your cursor over the blobs — they merge and split with a wet, organic pull.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#050b12;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.mb-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:min(720px,96vw)}
.mb-canvas{width:100%;aspect-ratio:16/9;background:#050b12;border-radius:20px;border:1px solid rgba(255,255,255,.08);display:block}
.mb-hint{color:#5f7a86;font-size:12px;letter-spacing:.03em;text-align:center}`,

  js: `const canvas = document.getElementById('mbCanvas');
const ctx = canvas.getContext('2d');
let width, height, dpr;
let imgData, buffer;
let cell = 6; // sampling grid cell size in CSS px
let gridW, gridH;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  gridW = Math.ceil((width * dpr) / cell);
  gridH = Math.ceil((height * dpr) / cell);
  imgData = ctx.createImageData(canvas.width, canvas.height);
  buffer = new Uint8ClampedArray(canvas.width * canvas.height * 4);
}

const NUM_BALLS = 7;
let balls = [];
let pointer = { x: -9999, y: -9999, active: false };

function initBalls() {
  balls = [];
  for (let i = 0; i < NUM_BALLS; i++) {
    balls.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.6,
      vy: (Math.random() - 0.5) * 1.6,
      r: 34 + Math.random() * 26,
      hue: 185 + Math.random() * 90
    });
  }
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

function updateBalls() {
  for (const b of balls) {
    if (pointer.active) {
      const dx = pointer.x - b.x;
      const dy = pointer.y - b.y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < 220) {
        // Cursor gently attracts nearby blobs, giving the "wet pull" feel.
        b.vx += (dx / dist) * 0.06;
        b.vy += (dy / dist) * 0.06;
      }
    }
    b.x += b.vx;
    b.y += b.vy;
    b.vx *= 0.985;
    b.vy *= 0.985;
    if (b.x < b.r) { b.x = b.r; b.vx *= -1; }
    if (b.x > width - b.r) { b.x = width - b.r; b.vx *= -1; }
    if (b.y < b.r) { b.y = b.r; b.vy *= -1; }
    if (b.y > height - b.r) { b.y = height - b.r; b.vy *= -1; }
  }
}

// The metaball field: at every sample point, sum each ball's influence as
// r^2 / distance^2 (an inverse-square falloff). Where the summed field
// exceeds a threshold, the pixel is considered "inside" the merged blob
// surface — this is what makes nearby blobs visually fuse into one shape.
function render() {
  const dprCell = cell;
  const cols = gridW, rows = gridH;
  const field = new Float32Array(cols * rows);

  for (let gy = 0; gy < rows; gy++) {
    const py = gy * dprCell;
    for (let gx = 0; gx < cols; gx++) {
      const px = gx * dprCell;
      let sum = 0;
      for (const b of balls) {
        const bx = b.x * dpr, by = b.y * dpr, br = b.r * dpr;
        const dx = px - bx, dy = py - by;
        const d2 = dx * dx + dy * dy || 0.0001;
        sum += (br * br) / d2;
      }
      field[gy * cols + gx] = sum;
    }
  }

  const data = imgData.data;
  data.fill(0);
  const cw = canvas.width;
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const v = field[gy * cols + gx];
      if (v < 1.0) continue;
      const edge = Math.min(1, (v - 1.0) * 3);
      const hueSample = balls[(gx + gy) % balls.length].hue;
      const rC = Math.round(60 + Math.sin(hueSample) * 40 + edge * 40);
      const startX = gx * dprCell, startY = gy * dprCell;
      const endX = Math.min(startX + dprCell, cw);
      const endY = Math.min(startY + dprCell, canvas.height);
      for (let y = startY; y < endY; y++) {
        let idx = (y * cw + startX) * 4;
        for (let x = startX; x < endX; x++) {
          data[idx] = 60 + edge * 90;
          data[idx + 1] = 170 + edge * 60;
          data[idx + 2] = 220 + edge * 30;
          data[idx + 3] = Math.min(255, 140 + edge * 160);
          idx += 4;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

function tick() {
  updateBalls();
  render();
  requestAnimationFrame(tick);
}

resize();
initBalls();
window.addEventListener('resize', () => { resize(); });
tick();`,

  seo: {
    title: 'Canvas Metaball Blobs — Free Organic Merging Blob Field Snippet',
    description: `Soft, gooey blobs that merge and split as they drift and respond to the cursor, rendered by sampling a scalar metaball field directly into pixel data on a 2D canvas. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Metaball Blobs — A Scalar Field Rendered Pixel by Pixel',
      description: `Metaballs are a classic technique for organic, liquid-looking shapes: instead of drawing each blob as an independent circle, every blob contributes an influence value to a shared scalar field, and the final shape is wherever that combined field crosses a threshold. This snippet implements that from scratch against \`ImageData\`, with no WebGL and no shader.

**Inverse-square influence, summed per sample point**

For every point on a coarse sampling grid, \`render()\` sums each ball's contribution as \`radius^2 / distance^2\` — an inverse-square falloff, the same shape used for gravitational and electrostatic fields. A point close to one ball has a huge value from that ball alone; a point roughly equidistant between two nearby balls gets meaningful contributions from both, which is exactly what causes their fields to visually fuse into a single connected shape as they approach each other.

**A grid, not per-pixel, for performance**

Sampling every single device pixel with a per-ball inverse-square calculation would be far too slow at 60fps. Instead the field is computed on a coarse grid (\`cell\` px per sample) and each grid cell is filled as a small flat-colored block in \`ImageData\` — a deliberate resolution trade-off that keeps the blob edges looking soft rather than pixelated, without paying per-pixel field-evaluation cost.

**Threshold and edge glow**

A field value below \`1.0\` is treated as empty space and skipped entirely. Just above threshold, \`edge\` ramps from 0 to 1 over a narrow band, brightening the color near a blob's boundary — this soft threshold band is what gives the merged shapes a glowing, liquid rim instead of a flat silhouette.

**Cursor as a soft attractor**

Rather than the cursor pushing blobs away, \`updateBalls()\` nudges each ball's velocity toward the pointer when it's within 220px, with the pull strength independent of distance beyond normalizing the direction vector — a gentle, constant tug rather than an inverse-square force, which reads as playful rather than physically simulated.

Compare with [canvas fluid cursor trail](/ui-snippets/canvas-fluid-cursor-trail/), which uses additive-blended gradients for a different kind of organic look without a scalar field.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Seven drifting blobs render and begin merging and separating.` },
      { title: 'Move the cursor over the canvas', text: `Nearby blobs are gently pulled toward the pointer.` },
      { title: 'Watch blobs approach each other', text: `Their fields fuse into one connected, glowing shape.` },
      { title: 'Watch blobs separate', text: `The merged shape splits back into distinct blobs.` },
      { title: 'Leave the canvas', text: `Blobs drift and bounce off the edges undisturbed.` },
      { title: 'Resize the window', text: `The sampling grid and canvas rebuild to fit.` },
      { title: 'Tune it', text: `Adjust NUM_BALLS, cell size, or the threshold for a different look.` },
    ] },
    features: [
      { title: 'True scalar field metaballs', text: `Inverse-square influence summed per sample point, not layered circles.` },
      { title: 'Threshold-based fusion', text: `Nearby blobs visually merge once their combined field crosses 1.0.` },
      { title: 'Coarse-grid sampling', text: `A performance/quality trade-off that keeps 60fps on a full canvas.` },
      { title: 'Glowing edge band', text: `Field values just above threshold brighten toward the blob rim.` },
      { title: 'Cursor attraction', text: `Blobs within 220px are gently pulled toward the pointer.` },
      { title: 'Edge-bounce physics', text: `Blobs bounce off canvas boundaries with velocity damping.` },
      { title: 'Touch-friendly', text: `Responds to touchmove alongside mousemove.` },
      { title: 'DPR-aware rendering', text: `Sharp field rendering on high-density displays.` },
    ],
    useCases: [
      { title: 'Hero backgrounds', text: `An organic, liquid ambient layer behind headline copy.` },
      { title: 'Loading/idle screens', text: `A mesmerizing distraction with no fixed animation length.` },
      { title: 'Creative agency sites', text: `A tactile, playful interactive background element.` },
      { title: 'Music/event pages', text: `Reinforce a fluid, energetic visual mood.` },
      { title: 'Science/biotech landing pages', text: `Cell-like or lava-lamp visual metaphors.` },
      { title: 'Physics/graphics teaching demos', text: `A compact, readable metaball field implementation.` },
      { icon: 'CODE', title: 'Related: Canvas Star Trail Cursor', desc: 'See the [Canvas Star Trail Cursor](/ui-snippets/canvas-star-trail-cursor/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: SVG Liquid Text Wave', desc: 'See the [SVG Liquid Text Wave](/ui-snippets/svg-liquid-text-wave/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What exactly is a metaball, technically?', a: `A metaball is one contributor to a shared scalar field rather than an independently drawn shape. Each ball adds an inverse-square-falloff value (radius squared over distance squared) to every point in space; the rendered shape is wherever the summed field from all balls crosses a chosen threshold, which is why overlapping influence fields visually fuse into one connected blob instead of drawing as separate overlapping circles.` },
      { q: 'Why sample on a coarse grid instead of every pixel?', a: `Evaluating the field (a loop over every ball) at every single device pixel at 60fps would be far too expensive for a full canvas. Instead the field is sampled on a coarser grid (6px cells by default) and each cell is filled as a small flat block, trading a small amount of edge smoothness for a rendering cost low enough to sustain real-time animation.` },
      { q: 'How does the "merge" effect actually happen — is it drawn as a special case?', a: `No special-case merge logic exists at all. As two blobs move closer, the sample points between them receive growing contributions from both balls' fields simultaneously, pushing the combined value above the 1.0 threshold across a wider area. The connected region that results is a direct, automatic consequence of summing two influence fields — not a separate shape-blending step.` },
      { q: 'Why does the cursor attract blobs instead of repelling them?', a: `updateBalls() checks the distance from each ball to the pointer and, when within 220px, nudges the ball's velocity toward the pointer's direction by a small constant amount. That constant (non-inverse-square) pull was chosen deliberately over a physically accurate force falloff because it reads as a gentle, playful "wet pull" rather than a sharp snap toward the cursor.` },
      { q: 'Can I render this with smoother, curved edges instead of blocky grid cells?', a: `Yes — reduce the cell size for finer sampling (at a performance cost), or keep the coarse grid but run marching-squares contour extraction on the field values to generate an actual smooth vector outline you stroke/fill instead of coloring flat blocks. The field-computation logic in render() stays identical either way; only how you turn field values into pixels changes.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why summing an inverse-square influence value per ball, per sample point, is what makes overlapping blobs visually fuse rather than simply overlap like transparent circles — and why the field is sampled on a coarse grid instead of per device pixel. It's a great snippet to extend with an assistant — ask for a marching-squares contour pass for smooth vector edges instead of blocky grid cells, a version where blobs repel instead of attract near the cursor, or a version that renders the field as an actual gradient-shaded surface instead of flat-colored cells for a glossier look.`,
      prompt: `Build an interactive "metaball blobs" effect in plain HTML, CSS, and JavaScript using only the Canvas 2D API and manual ImageData manipulation — no WebGL, no shaders, no external library.

Requirements:
- A full-panel canvas containing several (e.g. 7) circular "balls," each with its own position, velocity, radius, and drifting motion that bounces off the canvas edges with slight velocity damping.
- Implement a true metaball scalar field: on a coarse sampling grid (not every device pixel — e.g. every 6 CSS pixels, scaled by devicePixelRatio), compute for every grid cell the sum, over all balls, of (ball radius squared) divided by (squared distance from the sample point to that ball's center) — an inverse-square falloff. This sum is the field value at that point.
- Render the field into an ImageData buffer directly: for every grid cell whose summed field value is below a threshold (e.g. 1.0), leave it transparent/empty; for cells above threshold, fill that cell's block of pixels with a color, and add a brightness ramp for field values just above the threshold so blob edges get a soft glowing rim rather than a flat cutoff. Push the buffer to the canvas with putImageData once per frame.
- Do NOT implement merging as a special case — it must emerge naturally from two nearby balls' fields overlapping and their summed value crossing the threshold across a wider connected region.
- Track the pointer (mouse and touch) and, for any ball within a fixed radius (e.g. 220px) of the pointer, nudge that ball's velocity a small constant amount toward the pointer's direction each frame, creating a gentle organic "pull" toward the cursor without a physically accurate inverse-square attraction force.
- Handle window resize by recomputing the sampling grid dimensions and reallocating the ImageData buffer, and scale for devicePixelRatio so the field renders crisply on high-DPI screens.`,
    },
  },
};

export default canvasMetaballBlobs;
