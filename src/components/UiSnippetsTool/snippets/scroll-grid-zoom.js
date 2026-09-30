const scrollGridZoom = {
  id: 'scroll-grid-zoom',
  title: 'Scroll Grid Zoom',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="sgz-top"><p>Scroll ↓</p></section>
<section class="sgz-stage" id="sgzStage">
  <div class="sgz-grid" id="sgzGrid">
    <div class="sgz-tile" style="--tc1:#312e81;--tc2:#1e1b4b"><span>🌊</span></div>
    <div class="sgz-tile" style="--tc1:#5b21b6;--tc2:#312e81"><span>🌌</span></div>
    <div class="sgz-tile" style="--tc1:#134e4a;--tc2:#0f2f2c"><span>🌿</span></div>
    <div class="sgz-tile" style="--tc1:#7c2d12;--tc2:#431407"><span>🏜️</span></div>
    <div class="sgz-tile sgz-center" id="sgzCenter" style="--tc1:#6366f1;--tc2:#0ea5e9">
      <span>🗻</span>
      <div class="sgz-center-copy" id="sgzCopy"><h2>The main event</h2><p>The middle tile grows to own the viewport.</p></div>
    </div>
    <div class="sgz-tile" style="--tc1:#831843;--tc2:#4c0519"><span>🌸</span></div>
    <div class="sgz-tile" style="--tc1:#1e3a8a;--tc2:#172554"><span>🧊</span></div>
    <div class="sgz-tile" style="--tc1:#3f3f46;--tc2:#18181b"><span>⛰️</span></div>
    <div class="sgz-tile" style="--tc1:#14532d;--tc2:#052e16"><span>🌲</span></div>
  </div>
</section>
<section class="sgz-bottom"><p>Scroll up and the tile shrinks back into its grid cell.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.sgz-top,.sgz-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.sgz-stage{position:relative;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#07080d}
.sgz-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;width:min(720px,90vw)}
.sgz-tile{position:relative;aspect-ratio:4/3;border-radius:16px;background:linear-gradient(150deg,var(--tc1),var(--tc2));border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:40px;will-change:transform,opacity}
.sgz-center{z-index:2}
.sgz-center-copy{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:9%;gap:6px;text-align:center;opacity:0}
.sgz-center-copy h2{font-size:clamp(15px,2.6vw,26px);font-weight:800;letter-spacing:-.01em}
.sgz-center-copy p{font-size:clamp(10px,1.5vw,14px);color:rgba(255,255,255,.75)}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var tiles = gsap.utils.toArray('.sgz-tile');
var center = document.getElementById('sgzCenter');

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#sgzStage',
    start: 'top top',
    end: '+=200%',
    scrub: 0.4,
    pin: true
  }
});

// Outer tiles fly away from the center along their own grid direction.
tiles.forEach(function (tile, i) {
  if (tile === center) return;
  var col = (i % 3) - 1;   // -1, 0, 1
  var row = Math.floor(i / 3) - 1;
  tl.to(tile, {
    x: col * window.innerWidth * 0.85,
    y: row * window.innerHeight * 0.85,
    rotation: col * 6,
    opacity: 0.15,
    ease: 'none'
  }, 0);
});

// The center tile scales until it covers the viewport. Scale factor is
// measured from its real rendered size, so it works at any width.
var rect = center.getBoundingClientRect();
var factor = Math.max(window.innerWidth / rect.width, window.innerHeight / rect.height) * 1.05;

tl.to(center, { scale: factor, borderRadius: 4, ease: 'none' }, 0)
  .to('#sgzCopy', { opacity: 1, ease: 'none', duration: 0.25 }, 0.7);`,

  seo: {
    title: 'Scroll Grid Zoom — Free GSAP Tile Expand Snippet',
    description: `A 3×3 grid where the center tile scales to fill the viewport while neighbors fly outward, pinned and scrubbed with ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Grid Zoom — Expand the Center Tile to Fullscreen on Scroll',
      description: `The scroll grid zoom starts as an ordinary 3×3 image grid, then — as you scroll — the center tile grows until it owns the entire viewport while its eight neighbors accelerate outward and fade, as if the camera dove into the middle cell. It's a cinematic way to promote one item out of a collection. This snippet builds it with GSAP ScrollTrigger (from a CDN), a measured scale factor, and per-tile direction math.

**Neighbors fly along their own grid direction**

Each outer tile computes a direction vector from its grid index: \`col = (i % 3) − 1\` and \`row = floor(i / 3) − 1\` yield −1/0/+1 offsets that point directly away from the center cell. The corner tiles travel diagonally, edge tiles straight out — multiplied by ~85% of the viewport so everything clears the screen. Deriving direction from index means the scatter pattern is symmetric automatically, with no per-tile configuration.

**The zoom factor is measured, not hardcoded**

Instead of guessing "scale: 3.4", the script measures the center tile's rendered size with \`getBoundingClientRect()\` and computes \`max(vw/w, vh/h) × 1.05\` — the exact scale at which the tile covers the viewport in both dimensions, with 5% overshoot to hide edge slivers. Because the grid is fluid (\`min(720px, 90vw)\`), a hardcoded factor would under- or over-shoot at different screen widths; measuring makes the effect resolution-independent.

**Scale beats width/height animation here**

The center tile grows via \`transform: scale()\`, not by animating its width and height. Transforms run on the compositor without reflowing the grid — animating the box size would relayout all nine tiles every frame and shift the grid as the middle cell grew. The visual cost of scaling (its contents grow too) is actually desirable: the tile's emoji becomes the hero image of the fullscreen view.

**Everything shares timeline position 0**

The eight fly-outs and the center zoom all start at position 0 on one scrubbed timeline, so the dive reads as a single camera move rather than a sequence. The caption is the only late element — it fades in at 70% of the timeline, once the tile has effectively become a fullscreen hero, turning the end state into a legitimate section header.

**Fading, not removing, the neighbors**

Outer tiles land at \`opacity: 0.15\` rather than 0. During the scrub-back they're already faintly visible mid-viewport, which makes the reverse animation read as tiles returning rather than materializing from nothing. A touch of rotation (\`col × 6°\`) adds spin to the exits so the scatter feels thrown, not slid.

**The center stays above the traffic**

\`z-index: 2\` on the center tile keeps neighbors passing *behind* it as they exit, preserving the illusion that the camera moves toward the middle cell instead of tiles crossing over the hero.

**Customizing it**

Swap emoji tiles for \`<img>\` or \`background-image\` cells, tune the exit distance, or zoom a different cell by changing which tile gets measured. Pair it with a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/) for a single-image cousin, [scroll image mask](/ui-snippets/scroll-image-mask/) for a clip-path take, or a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) to rebuild a grid in the next section.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A 3×3 tile grid renders with a marked center cell.` },
      { title: 'Scroll into the stage', text: `Neighbors fly outward as the center starts growing.` },
      { title: 'Reach fullscreen', text: `The tile covers the viewport and its caption fades in.` },
      { title: 'Scroll back up', text: `The tile shrinks into its cell; neighbors return.` },
      { title: 'Swap in images', text: `Replace the emoji tiles with img or background cells.` },
    ] },
    features: [
      { title: 'Index-derived scatter', text: `Each tile exits along its own grid direction.` },
      { title: 'Measured zoom', text: `Scale factor computed from rendered size.` },
      { title: 'Compositor scaling', text: `transform: scale avoids nine-tile reflow.` },
      { title: 'Single camera move', text: `Zoom and exits share timeline position 0.` },
      { title: 'Late caption', text: `Copy fades in once the tile is fullscreen.` },
      { title: 'Soft exits', text: `Neighbors fade to 15%, not to nothing.` },
      { title: 'Layered hero', text: `z-index keeps traffic behind the center.` },
      { title: 'Reversible dive', text: `Scrub back to reassemble the grid.` },
    ],
    useCases: [
      { title: 'Portfolio highlights', text: `Dive into a featured project from the grid; browse the rest with a [photo gallery](/ui-snippets/photo-gallery/).` },
      { title: 'Product heroes', text: `Promote one product to fullscreen, then continue with [sticky scroll features](/ui-snippets/scroll-sticky-features/).` },
      { title: 'Travel and editorial', text: `Zoom into a destination tile inside a [scroll pin story](/ui-snippets/scroll-pin-story/).` },
      { title: 'Category landings', text: `Enter a category cinematically; a [scroll gallery pin](/ui-snippets/scroll-gallery-pin/) can carry the detail.` },
      { title: 'Campaign reveals', text: `Make the announcement the center cell, echoing a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/).` },
      { title: 'App screenshots', text: `Expand the key screen from a feature grid like [scroll reveal grid](/ui-snippets/scroll-reveal-grid/).` },
      { icon: 'CODE', title: 'Related: Scroll-Scrubbed GLB Motion Trail', desc: 'See the [Scroll-Scrubbed GLB Motion Trail](/ui-snippets/scroll-glb-motion-trail-scrub/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Scroll-Linked Audio Waveform Scrub', desc: 'See the [Scroll-Linked Audio Waveform Scrub](/ui-snippets/scroll-linked-audio-scrub/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do the outer tiles know which way to fly?', a: `Direction comes from each tile's grid index: col = (i % 3) − 1 and row = floor(i / 3) − 1 produce −1/0/+1 vectors pointing straight away from the center cell. Corners travel diagonally and edges straight out, multiplied by ~85% of the viewport so they fully clear the screen. No per-tile configuration is needed.` },
      { q: 'How does the center tile know how much to scale?', a: `The script measures the tile's rendered size with getBoundingClientRect, then computes max(innerWidth/width, innerHeight/height) × 1.05 — the exact factor at which it covers the viewport both ways, with 5% overshoot to hide edge slivers. Because the grid is fluid, a hardcoded scale would misfire at other screen widths.` },
      { q: 'Why scale the tile instead of animating its width and height?', a: `Scaling is a transform, so it composites on the GPU without touching layout. Animating the box's width/height would reflow the entire 3×3 grid every frame and physically shift the other cells while they're mid-exit. The side effect of scale — the tile's contents grow too — is exactly what a zoom should look like.` },
      { q: 'Can I zoom a different tile, like a corner?', a: `Yes — point the center variable at any tile and skip it in the exit loop; the measured scale factor still works. For a corner tile, add x/y compensation in the same tween (moving its center toward the viewport center as it scales), since scaling alone expands around the tile's own position, not the screen's middle.` },
      { q: 'How do I use this scroll grid zoom in React, Vue, or Angular?', a: `Render tiles from an array and build the timeline in a mount effect (useEffect, onMounted, or ngAfterViewInit) within gsap.context, reverting on cleanup so the pin unregisters. Measure the center ref after layout (the effect runs post-render, so getBoundingClientRect is safe), and re-create the trigger on resize if your grid is fluid. The grid maps to Tailwind's grid utilities directly.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reverse-engineer the direction and scale math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how col and row are derived from a tile's flat array index using modulo and floor division, and why the center tile's scale factor is measured with getBoundingClientRect at runtime instead of hardcoded. The same assistant can help optimize it — asking whether the measured scale factor needs to be recalculated on window resize since it's only computed once at load, or whether animating scale on the center tile is meaningfully cheaper than animating its width and height directly. It's also useful for extending the effect: ask it to make the zoomed tile a clickable link to a detail page, support zooming into whichever tile the user clicks rather than a fixed center cell, or add a subtle parallax to the emoji/image inside each tile as it flies outward. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll grid zoom" effect in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A CSS grid of nine tiles (3 columns by 3 rows), with one specific tile marked as the center/hero tile containing extra caption content that starts invisible.
- For every tile except the center one, derive a direction vector purely from its position in the flat array: column offset as (index modulo 3) minus 1, and row offset as floor(index / 3) minus 1, producing values of -1, 0, or 1 that point away from the center in every direction with no manual per-tile configuration.
- Animate each outer tile's x and y by that direction vector multiplied by a large fraction of the viewport width/height (so it fully clears the screen), add a small rotation scaled by the column offset, and fade it down to a low but nonzero opacity (not fully to 0) so it stays faintly visible for the reverse animation.
- For the center tile, measure its actual rendered width and height with getBoundingClientRect, then compute a scale factor as the larger of (viewport width / tile width) and (viewport height / tile height), with a small overshoot multiplier (like 1.05) to hide edge slivers — do not hardcode a scale number.
- Animate the center tile's scale (a transform), not its width/height, up to that measured factor, and fade its caption content in later in the timeline (e.g. at 70% progress) once it visually fills the viewport.
- Every outer-tile exit tween and the center zoom tween must start at the same timeline position (0) so the whole sequence reads as one continuous camera move, all wired to a single pinned, scrubbed ScrollTrigger that reverses cleanly on scroll-up.
- Give the center tile a higher z-index than the others so exiting neighbor tiles visually pass behind it rather than in front.`,
    },
  },
};

export default scrollGridZoom;
