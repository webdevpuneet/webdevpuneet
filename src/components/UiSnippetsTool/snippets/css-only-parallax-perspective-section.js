const cssOnlyParallaxPerspectiveSection = {
  id: 'css-only-parallax-perspective-section',
  title: 'CSS-Only Parallax Perspective Section',
  lastmod: '2026-09-05',
  category: 'scroll',
  cdnUrls: [],
  html: `<div class="pp-container" id="ppContainer">
  <section class="pp-group">
    <div class="parallax-bg pp-bg-a"></div>
    <div class="pp-foreground">
      <span class="pp-eyebrow">Scene One</span>
      <h2>Pure CSS Depth</h2>
      <p>Scroll inside this box — no scroll-linked JavaScript at all.</p>
    </div>
    <span class="pp-scrollcue">Scroll ↓</span>
  </section>

  <section class="pp-group">
    <div class="parallax-bg pp-bg-b"></div>
    <div class="pp-foreground">
      <span class="pp-eyebrow">Scene Two</span>
      <h2>Perspective &amp; TranslateZ</h2>
      <p>The background layer sits behind the scroll plane and scales to compensate.</p>
    </div>
  </section>

  <section class="pp-group">
    <div class="parallax-bg pp-bg-c"></div>
    <div class="pp-foreground">
      <span class="pp-eyebrow">Scene Three</span>
      <h2>Zero Scroll Listeners</h2>
      <p>The browser's own 3D rendering handles the depth illusion.</p>
    </div>
  </section>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;margin:0}
.pp-container{
  height:70vh;min-height:420px;overflow-y:scroll;overflow-x:hidden;
  perspective:1px;perspective-origin:0 0;
  background:#0b0d14;
  scroll-snap-type:y mandatory;
  scrollbar-width:thin;scrollbar-color:#4338ca #0b0d14;
}
.pp-container::-webkit-scrollbar{width:8px}
.pp-container::-webkit-scrollbar-track{background:#0b0d14}
.pp-container::-webkit-scrollbar-thumb{background:#4338ca;border-radius:99px}
.pp-group{
  position:relative;height:70vh;min-height:340px;
  display:flex;align-items:center;justify-content:center;
  transform-style:preserve-3d;
  scroll-snap-align:start;
}
.parallax-bg{
  position:absolute;inset:0;
  transform:translateZ(-1px) scale(2);
  background-size:cover;background-position:center;
}
.pp-bg-a{background:radial-gradient(circle at 30% 30%,#4338ca,#0b0d14 70%)}
.pp-bg-b{background:radial-gradient(circle at 70% 40%,#be185d,#0b0d14 70%)}
.pp-bg-c{background:radial-gradient(circle at 40% 60%,#0e7490,#0b0d14 70%)}
.pp-foreground{
  position:relative;z-index:1;
  text-align:center;color:#fff;padding:28px 32px;max-width:420px;
  background:rgba(11,13,20,.4);border:1px solid rgba(255,255,255,.08);
  border-radius:18px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
  box-shadow:0 24px 60px -20px rgba(0,0,0,.6);
}
.pp-eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#c7cbe0;background:rgba(255,255,255,.08);padding:4px 12px;border-radius:99px;margin-bottom:14px}
.pp-foreground h2{font-size:clamp(22px,4vw,34px);font-weight:800;margin:0 0 10px;letter-spacing:-.02em}
.pp-foreground p{font-size:14px;color:#dfe1ee;margin:0;line-height:1.6}
.pp-scrollcue{
  position:absolute;bottom:18px;left:50%;z-index:1;
  transform:translateX(-50%);font-size:11px;font-weight:600;letter-spacing:.1em;
  text-transform:uppercase;color:rgba(255,255,255,.55);
  animation:pp-bounce 1.8s ease-in-out infinite;
}
@keyframes pp-bounce{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,6px)}}`,

  js: `// This snippet is intentionally CSS-only for the parallax effect itself --
// the perspective + translateZ + scale technique on .parallax-bg layers
// produces the depth illusion purely through the browser's native 3D
// rendering as the .pp-container scrolls. No scroll event listeners or
// rAF loops are needed to drive the effect.
//
// This script only logs a confirmation so the snippet still has a JS
// entry point available; it performs no visual work.
console.log('CSS-only parallax perspective section: no scroll JS required.');`,

  seo: {
    title: 'CSS-Only Parallax Perspective Section — Free HTML CSS JS Snippet',
    description: `A scroll parallax effect built entirely with CSS perspective, translateZ, and scale — zero scroll-linked JavaScript required. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'CSS-Only Parallax Perspective Section — Depth Effect With Zero Scroll JavaScript',
      description: `Most scroll parallax effects rely on a JavaScript scroll listener recalculating transforms on every frame. This snippet achieves the same layered depth illusion using only CSS — the perspective, transform-style: preserve-3d, and translateZ() combination — so scrolling produces a parallax effect the browser's own 3D rendering engine computes natively, with no scroll event listener at all.

**Perspective on the scroll container**

The trick starts on .pp-container, the scrollable element itself: perspective: 1px combined with overflow-y: scroll puts the whole scrolling context into a shallow 3D space. Because the perspective value is so small (1px instead of a more typical few hundred), any element pushed backward in Z-space appears to move dramatically less relative to scroll than an element at the natural Z position — that's the entire depth illusion, computed by the browser's rendering engine as a side effect of 3D perspective math, not by JavaScript recalculating positions.

**Pushing the background layer back and compensating its scale**

Each .parallax-bg layer is given transform: translateZ(-1px) scale(2). Moving an element 1px backward in Z-space at a 1px perspective effectively halves its apparent size, so multiplying its scale by 2 compensates and restores it to filling its container visually — while its actual scroll displacement (governed by the perspective math) is now dramatically slower than the normal-flow foreground content in front of it.

**transform-style: preserve-3d ties it together**

Each .pp-group section sets transform-style: preserve-3d, which is required for the perspective set on the ancestor .pp-container to actually apply 3D positioning to the .parallax-bg child instead of flattening it into the 2D plane. Without this, translateZ would have no visible effect.

**Genuinely zero scroll-linked JavaScript**

The JS file in this snippet does no visual work at all — there is no scroll listener, no requestAnimationFrame loop, and no per-frame style recalculation. The entire parallax effect is a byproduct of how the browser paints elements positioned in 3D space relative to a perspective origin as the page scrolls, which is both simpler to reason about and immune to the scroll-jank concerns that JS-driven parallax needs careful rAF throttling to avoid.`,
    },
    features: [
      'Parallax depth effect achieved with zero scroll event listeners or JavaScript',
      'Uses only perspective, transform-style: preserve-3d, translateZ, and scale',
      'Three independently styled background scenes demonstrating the same technique',
      'Immune to scroll-jank since there is no per-frame JS recalculation at all',
      'Self-contained scrollable demo container for an isolated live preview',
      'Frosted-glass foreground content cards readable over any background gradient',
      'Fully responsive — background scale compensation keeps layers filling their section',
      'Technique portable to any scrollable container, not just full-page scroll',
    ],
    useCases: [
      { icon: '📣', title: 'Marketing storytelling pages', desc: 'Create depth-rich section breaks with no scroll listeners, using `perspective`, `translateZ` and scale to separate layers.' },
      { icon: '📚', title: 'CSS 3D transform tutorials', desc: 'Provide a canonical CSS 3D transform example showing how `transform-style: preserve-3d` with a perspective container produces parallax naturally.' },
      { icon: '⚡', title: 'Performance-sensitive sites', desc: 'Offer a parallax option for teams that cannot afford scroll-jank, since no per-frame JavaScript recalculation takes place.' },
      { icon: '🧱', title: 'CMS and static site templates', desc: 'Add a parallax section to templates without any script dependencies, with three differently styled background scenes showing the technique.' },
    ],
    faqs: [
      { q: 'How does this create parallax without any scroll event listener?', a: 'The scrollable container has a shallow CSS perspective (1px). Background layers are pushed backward in 3D space with translateZ(-1px) and their scale compensated to fill the viewport again. Because of how CSS 3D perspective projection works, an element positioned further back in Z-space visually displaces less per pixel of scroll than normal-flow content in front of it — the browser computes this automatically as part of rendering, with no JavaScript involved.' },
      { q: 'Why does the background need scale(2) after translateZ(-1px)?', a: 'Moving an element backward in a 1px perspective space roughly halves how large it appears, since it is now twice as "far" from the viewer in perspective terms. Scaling it up by 2 compensates for that shrinkage so it still visually fills its container, while its slowed scroll displacement (the actual parallax effect) is unaffected by the scale.' },
      { q: 'Can I use a background image instead of a gradient?', a: 'Yes — replace the gradient in a .parallax-bg rule with a background-image, keep background-size: cover and background-position: center, and the same translateZ/scale technique will apply the parallax effect to it identically.' },
    ],
  },
};

export default cssOnlyParallaxPerspectiveSection;
