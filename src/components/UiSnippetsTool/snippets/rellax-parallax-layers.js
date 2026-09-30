const rellaxParallaxLayers = {
  id: 'rellax-parallax-layers',
  title: 'Rellax Parallax Layers',
  lastmod: '2026-08-21',
  category: 'scroll',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/rellax/1.12.1/rellax.min.js',
  ],
  html: `<div class="rlx-hero">
  <div class="rlx-layer rlx-back" data-rellax-speed="-8"></div>
  <div class="rlx-layer rlx-mid" data-rellax-speed="-4">
    <div class="rlx-blob rlx-blob-a"></div>
    <div class="rlx-blob rlx-blob-b"></div>
  </div>
  <div class="rlx-layer rlx-front" data-rellax-speed="2">
    <h1>Depth, from a single attribute</h1>
    <p>Every layer here moves at its own <code>data-rellax-speed</code> as you scroll — Rellax reads the attribute and does the rest.</p>
  </div>
</div>
<div class="rlx-spacer"></div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#120a1f;color:#f3ecff}
.rlx-hero{position:relative;height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center}
.rlx-layer{position:absolute;inset:0}
.rlx-back{background:radial-gradient(ellipse at 50% 30%,#3b1a63 0%,#120a1f 70%)}
.rlx-mid{pointer-events:none}
.rlx-blob{position:absolute;border-radius:50%;filter:blur(50px);opacity:.55}
.rlx-blob-a{width:340px;height:340px;background:#7c3aed;top:12%;left:8%}
.rlx-blob-b{width:280px;height:280px;background:#db2777;bottom:8%;right:10%}
.rlx-front{position:relative;z-index:5;text-align:center;max-width:560px;padding:0 24px}
.rlx-front h1{font-size:clamp(30px,6vw,56px);letter-spacing:-.02em;margin-bottom:16px}
.rlx-front p{color:#c8b8ec;font-size:16px;line-height:1.7}
code{background:rgba(219,39,119,.16);color:#f0abfc;padding:2px 6px;border-radius:5px;font-size:.9em;font-family:ui-monospace,Consolas,monospace}
.rlx-spacer{height:60vh;background:linear-gradient(#120a1f,#0a0614);display:flex;align-items:center;justify-content:center;color:#6b5b8f;font-size:14px}`,

  js: `// Rellax scans the DOM for every element carrying data-rellax-speed and
// moves it at a rate proportional to that value on each scroll frame —
// negative values drift slower (feel farther away), positive values move
// faster than the natural scroll (feel closer to the viewer).
const rellax = new Rellax('.rlx-layer', {
  speed: -2,       // default speed for elements without their own data-rellax-speed
  center: false,
  round: true,      // round pixel values for crisper rendering
  vertical: true,
  horizontal: false,
});

// Rellax caches element positions on init; if the layout changes (fonts
// loading, images resizing) call refresh() to recalculate offsets.
window.addEventListener('load', () => rellax.refresh());`,

  seo: {
    title: 'Rellax Parallax Layers — Free data-rellax-speed Parallax Hero Snippet',
    description: `A layered parallax hero where every element's depth is set with a single data-rellax-speed attribute, powered by the lightweight Rellax.js library. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Rellax Parallax Layers — Depth Through data-rellax-speed Attributes',
      description: `Rellax is a dependency-free parallax library built around one idea: instead of writing scroll-math for every layer by hand, you tag elements with \`data-rellax-speed\` and let the library translate them proportionally as the page scrolls. This snippet builds a three-layer hero — a gradient backdrop, a pair of blurred color blobs, and an anchored content layer — where the entire depth effect is expressed through three attribute values.

**Speed as depth**

Each \`.rlx-layer\` carries a \`data-rellax-speed\` value: \`-8\` on the back gradient, \`-4\` on the mid blob layer, and \`2\` on the front content. Rellax interprets negative speeds as moving slower than natural scroll (so the element appears to lag behind and read as farther away) and positive speeds as moving faster than natural scroll (so the element appears to rush ahead and read as closer to the viewer). This mirrors the same depth logic used in [Parallax Hero Section](/ui-snippets/parallax-hero/), but where that snippet computes per-layer factors from mouse position in hand-written JavaScript, Rellax computes them from scroll position automatically once you call \`new Rellax(...)\`.

**One constructor call, many layers**

\`new Rellax('.rlx-layer', { speed: -2, center: false, round: true })\` is the entire JavaScript integration — Rellax queries every matching element, reads its own \`data-rellax-speed\` (falling back to the \`speed\` option when absent), and attaches a single shared scroll listener that updates all of them together. Adding a fourth layer means adding a new element with its own \`data-rellax-speed\` attribute — no changes to the JS at all.

**round: true and performance**

Rellax uses \`transform: translate3d\` under the hood so layer movement is GPU-composited, and the \`round: true\` option rounds computed pixel offsets to whole numbers, which avoids sub-pixel blurring on layers with sharp edges or text. Because there's a single scroll listener shared across every tagged element rather than one listener per layer, the library stays cheap even with many layers on a busy page.

**Rellax versus a custom parallax script**

Compared to hand-rolling parallax with lerp smoothing (as in [Parallax Hero Section](/ui-snippets/parallax-hero/)), Rellax trades fine-grained control (easing curves, mouse-driven input, device tilt) for simplicity — it's scroll-only, attribute-driven, and requires no per-project math. It's the right tool when you want several elements drifting at different rates purely from scroll position and don't need mouse interactivity.

**Customizing it**

Adjust each layer's \`data-rellax-speed\` to taste (Rellax typically expects values roughly between -10 and 10), add more blobs or shapes as additional layers, or call \`rellax.refresh()\` after dynamic content changes so offset calculations stay accurate. Pair this hero with [Hero Section](/ui-snippets/hero-section/) copy patterns or a [Gradient Progress](/ui-snippets/gradient-progress/) indicator below the fold.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Rellax CDN script', text: `Include rellax.min.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A three-layer hero with a gradient, blobs, and content renders.` },
      { title: 'Scroll down slowly', text: `The back layer drifts slower, the front content drifts slightly faster.` },
      { title: 'Compare layer speeds', text: `Notice the blobs and headline separate visually as you scroll.` },
      { title: 'Change data-rellax-speed values', text: `Increase or invert them to intensify or reverse the depth effect.` },
      { title: 'Add a new layer', text: `Add an element with its own data-rellax-speed — no JS changes needed.` },
    ] },
    features: [
      { title: 'Attribute-driven depth', text: `data-rellax-speed sets each layer's parallax rate directly in HTML.` },
      { title: 'Single constructor call', text: `new Rellax(...) wires up every tagged layer at once.` },
      { title: 'Shared scroll listener', text: `One listener updates all layers, regardless of layer count.` },
      { title: 'GPU-composited movement', text: `translate3d keeps layer motion smooth and off the main thread.` },
      { title: 'Pixel rounding', text: `round: true avoids sub-pixel blur on sharp-edged layers.` },
      { title: 'No dependencies', text: `Rellax has zero external dependencies beyond the browser.` },
      { title: 'Refreshable offsets', text: `rellax.refresh() recalculates after dynamic layout changes.` },
      { title: 'Blurred color blobs', text: `A soft gradient blob mid-layer adds atmosphere with pure CSS.` },
    ],
    useCases: [
      { title: 'Landing page heroes', text: `A lighter-weight alternative to [Parallax Hero Section](/ui-snippets/parallax-hero/) for scroll-only depth.` },
      { title: 'Product launch pages', text: `Layer product shots and glow effects at different scroll speeds.` },
      { title: 'Event and conference pages', text: `Add drifting shapes behind a [Hero Section](/ui-snippets/hero-section/) headline.` },
      { title: 'Editorial / storytelling pages', text: `Build scroll-driven scene depth without custom parallax math.` },
      { title: 'Agency portfolio intros', text: `Demonstrate motion craft with minimal JavaScript overhead.` },
      { title: 'App marketing sites', text: `Combine with [Scroll Reveal Grid](/ui-snippets/scroll-reveal-grid/) feature sections below.` },
      { icon: 'CODE', title: 'Related: Scroll 3D Flip Reveal', desc: 'See the [Scroll 3D Flip Reveal](/ui-snippets/scroll-3d-flip-reveal/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What does a data-rellax-speed value actually mean?', a: `It's a rate relative to normal scroll. A speed of 0 would scroll with the page exactly like any other element. Negative values move the element slower than the page scrolls, so it visually lags behind and reads as farther away; positive values move it faster than the page scrolls, so it visually rushes ahead and reads as closer to the viewer. Rellax typically expects values roughly between -10 and 10 for a natural-looking effect.` },
      { q: 'How does Rellax find which elements to animate?', a: `The selector passed to new Rellax(selector, options) — '.rlx-layer' in this snippet — is queried once on initialization. Every matching element is then read for its own data-rellax-speed attribute; if an element doesn't have one, it falls back to the speed value in the options object. All matched elements are then updated together on every scroll event via a single shared listener.` },
      { q: 'Why call rellax.refresh() on window load?', a: `Rellax calculates each layer's scroll range based on its position and the document's height at initialization time. If images, web fonts, or other async content change the page's layout height after that initial calculation, the cached offsets can drift out of sync with actual scroll position — calling refresh() recalculates everything against the current, fully-loaded layout.` },
      { q: 'Is Rellax mobile-friendly?', a: `Rellax works on touch scrolling the same way it works on mouse-wheel scrolling, since it responds to actual scroll position rather than pointer movement — unlike mouse-driven parallax such as Parallax Hero Section. That said, heavy parallax can feel unusual on mobile, so consider reducing speed magnitudes or disabling the effect below a breakpoint for smaller screens.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Install the rellax npm package (or keep the CDN script), import it, and instantiate new Rellax(selector, options) inside a mount effect (useEffect, onMounted, or ngAfterViewInit) after your layered elements have rendered. Keep the data-rellax-speed attributes directly on your JSX/template elements. Call rellax.destroy() in the cleanup function to remove Rellax's scroll listener when the component unmounts.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to guess at reasonable speed values by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how a negative versus a positive data-rellax-speed value changes an element's motion relative to normal scroll, and why Rellax only needs one scroll listener no matter how many layers are tagged. The same assistant can help you tune the depth — asking whether -8/-4/2 is a natural-feeling spread of speeds for a three-layer hero, or how to add a fourth layer that reads as even farther in the background. It's also useful for comparing tools: ask it when Rellax's scroll-only, attribute-driven approach is preferable to a hand-rolled mouse-driven parallax like the one in Parallax Hero Section, and when you'd want the extra control of a custom script instead. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a multi-layer parallax hero section in plain HTML, CSS, and JavaScript using the Rellax.js library loaded from a CDN — depth must be expressed entirely through data-rellax-speed attributes, not custom scroll math.

Requirements:
- A full-height hero container with at least three stacked, absolutely-positioned layers: a background gradient/decorative layer, a middle layer containing one or more soft blurred color shapes, and a front layer containing the actual heading and paragraph content.
- Each layer element must carry its own data-rellax-speed attribute with a distinct value — the background layer should have the most negative speed (appears farthest and slowest), the middle layer a smaller negative speed, and the front content layer a positive speed (appears closest and moves slightly faster than normal scroll).
- Initialize the effect with a single new Rellax(selector, options) call targeting a shared class name on all parallax layers, passing a sensible default speed, center: false, and round: true for crisp pixel values — do not write any custom scroll event listener or manual transform math.
- Call the Rellax instance's refresh() method after the window's load event so cached layer offsets stay accurate if fonts or other async content shift the page's layout height.
- Add a tall spacer section below the hero so there's enough scroll distance to clearly observe each layer moving at its own rate.
- Ensure the front content layer remains legible and doesn't get obscured by the background/middle layers at any scroll position within the hero's height.`,
    },
  },
};

export default rellaxParallaxLayers;
