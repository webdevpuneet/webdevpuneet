const scrollTileAssemble = {
  id: 'scroll-tile-assemble',
  title: 'Scroll Tile Assemble',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="sta-top"><p>Scroll ↓</p></section>
<section class="sta-stage" id="staStage">
  <div class="sta-board">
    <div class="sta-mosaic" id="staMosaic"></div>
    <div class="sta-copy" id="staCopy"><h2>Pieces into place</h2><p>Twelve scattered tiles assemble into one panel.</p></div>
  </div>
</section>
<section class="sta-bottom"><p>Scroll up to shatter the panel back apart.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.sta-top,.sta-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.sta-stage{position:relative;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(75% 65% at 50% 45%,#10152e,#07080d)}
.sta-board{position:relative}
.sta-mosaic{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(3,1fr);gap:6px;width:min(640px,90vw);aspect-ratio:16/9}
.sta-tile{border-radius:10px;will-change:transform,opacity;
  /* one shared gradient, sliced per-tile via background-position */
  background-image:linear-gradient(125deg,#4338ca,#7c3aed 35%,#0ea5e9 70%,#22d3ee);
  background-size:400% 300%}
.sta-copy{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;opacity:0;pointer-events:none}
.sta-copy h2{font-size:clamp(26px,5.2vw,52px);font-weight:800;letter-spacing:-.02em;text-shadow:0 4px 30px rgba(0,0,0,.5)}
.sta-copy p{color:rgba(255,255,255,.85);font-size:15px;text-shadow:0 2px 14px rgba(0,0,0,.5)}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var COLS = 4, ROWS = 3;
var mosaic = document.getElementById('staMosaic');

// Build tiles; each shows its own slice of the shared gradient so the
// assembled grid reads as one continuous image.
var tiles = [];
for (var r = 0; r < ROWS; r++) {
  for (var c = 0; c < COLS; c++) {
    var tile = document.createElement('div');
    tile.className = 'sta-tile';
    tile.style.backgroundPosition =
      (c * 100 / (COLS - 1)) + '% ' + (r * 100 / (ROWS - 1)) + '%';
    mosaic.appendChild(tile);
    tiles.push(tile);
  }
}

// Deterministic pseudo-random scatter: same layout on every load,
// no Math.random flicker between visits.
function rand(seed) { return (Math.sin(seed * 127.1) * 43758.55) % 1; }
tiles.forEach(function (tile, i) {
  gsap.set(tile, {
    x: rand(i + 1) * 600 - 300,
    y: rand(i + 31) * 500 - 250,
    rotation: rand(i + 61) * 140 - 70,
    scale: 0.55,
    opacity: 0
  });
});

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#staStage',
    start: 'top top',
    end: '+=180%',
    scrub: 0.4,
    pin: true
  }
});

tl.to(tiles, {
  x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
  ease: 'none',
  stagger: { each: 0.06, from: 'random' }
}, 0)
  .to('#staCopy', { opacity: 1, ease: 'none', duration: 0.25 }, 0.85);`,

  seo: {
    title: 'Scroll Tile Assemble — Free GSAP Mosaic Snippet',
    description: `Twelve scattered tiles fly into a seamless 4×3 mosaic as you scroll — seeded scatter, shared-gradient slices, random-order stagger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Tile Assemble — Scattered Pieces Fly Into One Panel on Scroll',
      description: `The scroll tile assemble starts with twelve tiles thrown across the viewport — rotated, shrunken, half-faded — and as you scroll, each piece flies home into a 4×3 grid that fuses into one continuous panel, with a headline settling on top. Scroll up and the panel shatters apart again. This snippet builds it with GSAP ScrollTrigger (from a CDN), a seeded scatter, and a background-position slicing trick that makes separate tiles read as a single image.

**One gradient, sliced across twelve tiles**

Every tile shares the same \`background-image\` gradient at \`background-size: 400% 300%\` — four columns by three rows of the tile's own size. Each tile then shows its slice via \`background-position: (c/(COLS−1))% (r/(ROWS−1))%\`, the CSS percentage-positioning formula that maps a grid cell to its window onto the oversized background. When the tiles land, edges align perfectly and the grid reads as one unbroken picture. Swap the gradient for a \`url()\` image and you have a photo mosaic with zero markup changes.

**The scatter is seeded, not random**

Start positions come from \`sin(seed × 127.1) × 43758.55 % 1\` — the classic shader-style hash — fed by each tile's index. It looks random but is fully deterministic: the scatter is identical on every load and every scrub-back, so users who scroll up see the exact shatter they came from. \`Math.random()\` would re-scatter on refresh and, worse, if setup ever re-ran, tiles would visibly jump.

**GSAP animates from where they are to where they belong**

The tiles are laid out by CSS grid in their *final* positions; \`gsap.set\` then displaces them with transforms (x, y, rotation, scale). The scrubbed tween simply returns everything to zero — meaning the grid layout is the single source of truth for the assembled state, and the browser handles all responsive sizing. No target coordinates are ever computed in JS.

**A random-order stagger sells "pieces arriving"**

\`stagger: { each: 0.06, from: 'random' }\` offsets each tile's start so pieces stream in from all directions in shuffled order rather than row-by-row — the difference between an assembling mosaic and a sorting animation. Because the offsets live inside one tween, the whole assembly still reads as a single gesture under the scrub.

**The copy waits for a surface to land on**

The headline fades in at 85% of the timeline, once enough tiles have fused to act as its backdrop. Text-shadows keep it legible over the gradient seams during the final moments of assembly.

**Pinned, scrubbed, compositor-only**

The stage pins for \`+=180%\` with \`scrub: 0.4\`; every animated property is a transform or opacity, so twelve simultaneously moving layers stay cheap, and \`will-change: transform\` promotes them before the first frame.

**Why displacement transforms beat animating grid position**

An alternative approach would animate each tile's actual grid-column/row from a scattered layout to the final one, but CSS grid placement isn't tweenable and would require manual absolute positioning with computed pixel targets per tile. Using gsap.set to displace tiles with transforms while CSS grid handles the real, responsive layout means the assembled state needs zero JavaScript-computed coordinates — resize the viewport and the "home" positions recompute for free, while the scatter offsets (in fixed pixels) stay proportionally sensible relative to the grid's own responsive sizing.

**Customizing it**

Change \`COLS\`/\`ROWS\` (slicing and scatter adapt automatically), widen the scatter range for a more explosive start, or point the shared background at a product screenshot. Related effects: the inverse [scroll grid zoom](/ui-snippets/scroll-grid-zoom/), staggered entrances in [scroll reveal grid](/ui-snippets/scroll-reveal-grid/), slat-based [scroll blinds reveal](/ui-snippets/scroll-blinds-reveal/), and a [masonry grid](/ui-snippets/masonry-grid/) for static layouts.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Tiles generate, slice the gradient, and scatter.` },
      { title: 'Scroll into the stage', text: `Pieces start flying home in shuffled order.` },
      { title: 'Complete the assembly', text: `Edges fuse and the headline settles on top.` },
      { title: 'Scroll back up', text: `The panel shatters along the same paths.` },
      { title: 'Use a real image', text: `Swap the gradient for url() — slicing is unchanged.` },
    ] },
    features: [
      { title: 'Shared-image slicing', text: `background-position windows one gradient.` },
      { title: 'Seeded scatter', text: `Deterministic hash, identical every load.` },
      { title: 'Grid as truth', text: `Tweens return transforms to zero.` },
      { title: 'Shuffled stagger', text: `Pieces arrive in random order.` },
      { title: 'Late headline', text: `Copy lands once the surface exists.` },
      { title: 'Count-agnostic build', text: `COLS and ROWS drive everything.` },
      { title: 'Compositor-only', text: `Transforms and opacity, no layout.` },
      { title: 'Reversible shatter', text: `Scrolling up explodes the mosaic.` },
    ],
    useCases: [
      { title: 'Brand reveals', text: 'Assemble a logo or key visual from twelve scattered tiles, using background-position windows onto one shared gradient so the seams vanish.' },
      { title: 'Product screenshots', text: 'Piece a dashboard together, then tour it with [scroll sticky features](/ui-snippets/scroll-sticky-features/), with deterministic seeded scatter so every load looks identical.' },
      { title: 'Team and gallery walls', text: 'Fly portraits into a wall, then browse them in a [photo gallery](/ui-snippets/photo-gallery/), with tiles arriving in a shuffled order.' },
      { title: 'Coming together stories', text: 'Use the metaphor for mergers or partnerships, followed by a [scroll pin story](/ui-snippets/scroll-pin-story/) to explain the journey.' },
      { title: 'Openers and puzzle campaigns', text: 'Assemble a portfolio hero before a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/), or add a [confetti button](/ui-snippets/confetti-button/) to reward a completed puzzle.' },
      { icon: 'CODE', title: 'Related: Three.js Scroll Möbius Strip Ride', desc: 'See the [Three.js Scroll Möbius Strip Ride](/ui-snippets/three-scroll-mobius-ride/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do twelve tiles look like one continuous image?', a: `Every tile paints the same background at background-size: 400% 300% — a canvas 4×3 tiles big — and offsets its window with the percentage form of background-position, (c/(COLS−1))% (r/(ROWS−1))%. Each tile therefore displays exactly its cell of the shared picture, so when transforms return to zero the seams align into one unbroken panel.` },
      { q: 'Why is the scatter seeded instead of using Math.random?', a: `Start offsets come from a deterministic hash — sin(seed × 127.1) × 43758.55 % 1 — keyed by tile index. The layout looks random but is identical on every load and scrub, so reversing shows the exact shatter you arrived from, and re-running setup (hot reload, framework strict mode) can never make tiles jump to new positions.` },
      { q: 'How does the animation know each tile’s final position?', a: `It doesn't need to: CSS grid lays the tiles out in their assembled positions, and gsap.set displaces them with transforms. The scrubbed tween just animates x, y, rotation, and scale back to zero, so the grid remains the single source of truth and responsive resizing works automatically — no coordinates are computed in JavaScript.` },
      { q: 'Can I assemble a real photo or screenshot instead of a gradient?', a: `Yes — change the tiles' background-image to url(your-image.jpg); background-size and the per-tile positions already do the slicing. Pick an image at the mosaic's aspect ratio (16/9 here) so nothing distorts, and consider a subtle gap: 0 to hide seams entirely once assembled.` },
      { q: 'Why use grid layout for the final state instead of computing pixel positions?', a: `CSS grid placement can't be tweened directly, so animating "real" grid positions would need manual absolute coordinates recomputed on every resize. Letting grid handle the assembled layout while GSAP only displaces tiles with transforms means resizing the viewport instantly gives correct home positions with no JavaScript involved — only the scatter's starting offsets are fixed pixel values, and those stay visually proportional at common viewport widths.` },
      { q: 'How do I use this tile assemble in React, Vue, or Angular?', a: `Render the tiles from a COLS×ROWS array with their backgroundPosition computed inline, then run the seeded set() and timeline in a mount effect — useEffect, onMounted, or ngAfterViewInit — inside gsap.context scoped to the mosaic ref, reverting on cleanup so the pin unregisters. The deterministic seed makes double-invoked effects safe. Grid and sizing translate straight to Tailwind utilities.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to trace the background-position slicing formula or the pseudo-random seed function by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the sin-based rand function produces a deterministic scatter, and why gsap.set displaces tiles with transforms instead of computing scattered grid positions directly. The same assistant can help optimize it — checking whether twelve simultaneously-tweened tiles with a random stagger stays cheap at higher tile counts, or whether the shared gradient slicing approach still holds up once a real photo is swapped in at a different aspect ratio. It is just as useful for extending the effect: ask it to support a non-uniform grid, add a sound or haptic cue as each tile lands, or let the user drag a tile out of place before it snaps back on release. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll tile assemble" mosaic effect in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- Generate a COLS by ROWS grid of tile elements in CSS grid, where every tile shares the exact same background-image (a gradient or photo) sized at COLS*100% by ROWS*100%, and each tile's background-position is set individually to (column / (COLS-1)) percent by (row / (ROWS-1)) percent, so that when all tiles sit in their grid cells the shared background reads as one continuous, seamless image.
- Before any animation runs, use gsap.set to displace every tile away from its grid position with a scattered x, y, rotation, and reduced scale, plus zero opacity — but the scatter offsets must come from a deterministic seeded formula (not Math.random), so the same scatter layout appears identically on every page load and every scroll reversal.
- Register a single GSAP timeline on a ScrollTrigger with pin: true and scrub, and inside it tween all tiles' x, y, rotation, scale, and opacity back to their natural (zero-offset) values using a stagger with from: random, so tiles fly into place in a shuffled, not row-by-row, order.
- Do not calculate the tiles' assembled pixel coordinates in JavaScript — the assembled positions must come entirely from the CSS grid layout, with GSAP only responsible for animating the transform offset away from and back to that layout.
- Add a heading/caption element that fades in only after most of the tiles have landed (near the end of the timeline), so it appears to sit on top of a completed surface.
- The whole sequence must reverse cleanly on scroll-up, shattering the assembled image back into its seeded scatter.`,
    },
  },
};

export default scrollTileAssemble;
