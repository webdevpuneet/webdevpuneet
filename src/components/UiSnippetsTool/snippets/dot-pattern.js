const dotPattern = {
  id: 'dot-pattern',
  title: 'Dot Pattern',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<section class="dp-hero" id="dpHero">
  <div class="dp-dots" aria-hidden="true"></div>
  <div class="dp-spot" id="dpSpot" aria-hidden="true"></div>
  <div class="dp-content">
    <span class="dp-tag">◇ Infrastructure</span>
    <h1>Quietly powerful</h1>
    <p>A subtle dot grid backdrop with a glow that follows your cursor — one element, pure CSS.</p>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#06060e;color:#fff}

.dp-hero{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center}

.dp-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.18) 1px,transparent 1px);background-size:22px 22px;
  -webkit-mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%);
  mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%)}

/* A coloured glow that reveals brighter dots under the cursor by overlaying a
   second masked dot layer through the spotlight. */
.dp-spot{position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(rgba(129,140,248,.9) 1px,transparent 1px);background-size:22px 22px;opacity:0;transition:opacity .3s;
  -webkit-mask-image:radial-gradient(200px circle at var(--x,-200px) var(--y,-200px),#000 0%,transparent 70%);
  mask-image:radial-gradient(200px circle at var(--x,-200px) var(--y,-200px),#000 0%,transparent 70%)}
.dp-hero:hover .dp-spot{opacity:1}

.dp-content{position:relative;z-index:1;padding:0 20px;max-width:600px;pointer-events:none}
.dp-tag{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.05em;color:#c7d2fe;background:rgba(99,102,241,.16);border:1px solid rgba(99,102,241,.4);padding:6px 13px;border-radius:999px;margin-bottom:18px}
.dp-content h1{font-size:clamp(34px,7vw,64px);font-weight:900;letter-spacing:-.03em}
.dp-content p{margin-top:14px;font-size:16px;color:#9a9ac0;line-height:1.55}`,

  js: `var hero = document.getElementById('dpHero');
var spot = document.getElementById('dpSpot');

// Move the spotlight mask to the cursor via two CSS variables — no per-frame
// JS work beyond setting properties.
hero.addEventListener('pointermove', function (e) {
  var r = hero.getBoundingClientRect();
  spot.style.setProperty('--x', (e.clientX - r.left) + 'px');
  spot.style.setProperty('--y', (e.clientY - r.top) + 'px');
});`,

  seo: {
    title: 'Dot Pattern — Free HTML CSS JS Dotted Background Snippet',
    description: `A subtle dotted grid hero background with a cursor-following spotlight that reveals brighter dots, in CSS masks. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Dot Pattern — Dotted Backdrop With a Cursor Spotlight',
      description: `The dot pattern is the understated technical backdrop on infrastructure and developer sites: a faint grid of dots, calm at rest, with a soft glow that follows your cursor and lights up brighter, colored dots in its radius. This snippet builds the whole thing with pure CSS backgrounds and masks, plus two lines of JavaScript to move the spotlight — no canvas, no images.

**The dot grid in one element**

The base dots are a single \`radial-gradient\` — a 1px white dot over transparent — tiled across the hero with \`background-size: 22px 22px\`. That repeats the dot on a regular grid, giving graph-paper dots from one background declaration. A \`mask-image\` radial gradient then fades the dots toward the edges so the pattern dissolves into the page rather than ending at a hard border, keeping focus on the center.

**The cursor spotlight**

The interactive glow is a second dot layer, \`.dp-spot\`, identical in tiling but in a brighter accent color. It is revealed through a \`mask-image\` radial gradient whose center is driven by two CSS custom properties, \`--x\` and \`--y\`. A \`pointermove\` handler writes the cursor position into those variables, so the masked circle — and therefore the brighter dots — follows the pointer. Outside the circle the layer is masked away, so you only see the accent dots within the spotlight. The layer fades in on hover so the hero is monochrome and calm until you interact.

**Two layers, one illusion**

The effect of "dots lighting up under the cursor" is really two stacked dot grids: the faint base always visible, and the bright accent grid revealed only inside the moving mask. Because both share the same 22px tiling, the bright dots line up exactly over the faint ones, so it reads as the same dots brightening rather than a separate layer. This alignment is what sells it.

**Cheap and smooth**

There is no per-frame JavaScript — the handler only sets two CSS variables, and the browser composites the masked gradient move on the GPU. So the spotlight tracks the cursor smoothly with negligible cost, even on a large hero. The content sits above with \`pointer-events: none\` (except where you need clicks), so moving over the headline still lights the dots beneath.

**Why masks beat redrawing**

Some implementations redraw dots on a canvas each frame to brighten those near the cursor. Masking a pre-tiled gradient is far cheaper and pixel-perfect: the dots never shift, and the only thing moving is a mask center, which is a single composited property. It also scales to any hero size without more work.

**Customizing it**

Change \`background-size\` for a denser or sparser grid, the dot color and size, the spotlight radius (the \`200px circle\` in the mask), or the edge-fade mask shape. Recolor the accent dots to your brand. Pair it with an [aurora text](/ui-snippets/aurora-text/) headline or a [particle network](/ui-snippets/particle-network/) for a layered, modern hero.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A faint dotted grid fills the hero behind the text.` },
      { title: 'Move your cursor', text: `A glow follows the pointer and brightens nearby dots.` },
      { title: 'Note the edge fade', text: `The dots dissolve toward the edges of the hero.` },
      { title: 'Hover the headline', text: `The dots still light up beneath the text.` },
      { title: 'Resize the grid', text: `Change background-size for denser or sparser dots.` },
      { title: 'Recolor the spotlight', text: `Edit the accent dot color and radius.` },
    ] },
    features: [
      { title: 'One-element dot grid', text: `A tiled radial-gradient, no image.` },
      { title: 'Edge-fade mask', text: `Dots dissolve into the page.` },
      { title: 'Cursor spotlight', text: `A masked accent layer follows the pointer.` },
      { title: 'Aligned bright dots', text: `Shared tiling lines up the two grids.` },
      { title: 'CSS-variable reveal', text: `--x/--y move the mask cheaply.` },
      { title: 'No per-frame JS', text: `The handler only sets two properties.` },
      { title: 'Click-through content', text: `Dots light under the headline.` },
      { title: 'Scales to any size', text: `Masking needs no extra work.` },
    ],
    useCases: [
      { title: 'Dev-tool heroes', text: `Backdrop for an [aurora text](/ui-snippets/aurora-text/) headline.` },
      { title: 'Infrastructure sites', text: `Pair with a [particle network](/ui-snippets/particle-network/) elsewhere.` },
      { title: 'Docs landing pages', text: `Frame a [floating pill nav](/ui-snippets/floating-pill-nav/) above it.` },
      { title: 'SaaS sections', text: `A calm surface behind a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/).` },
      { title: 'Product launches', text: `Set the stage for an [animated gradient CTA](/ui-snippets/animated-gradient-cta/).` },
      { title: 'CSS mask demos', text: `A reference for cursor-spotlit patterns.` },
      { icon: 'CODE', title: 'Related: Before/After Hero with Comparison Slider', desc: 'See the [Before/After Hero with Comparison Slider](/ui-snippets/hero-before-after-slider/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: tsParticles Interactive Hero', desc: 'See the [tsParticles Interactive Hero](/ui-snippets/tsparticles-hero/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Hero with Voice Input Waveform Demo', desc: 'See the [Hero with Voice Input Waveform Demo](/ui-snippets/hero-voice-waveform-input/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the dot grid made from one element?', a: `A single radial-gradient paints a 1px dot over transparent, tiled across the element with background-size: 22px 22px. That repeats the dot on a regular grid from one background declaration. A mask-image radial gradient then fades the dots toward the edges so the pattern dissolves into the page instead of stopping at a hard border.` },
      { q: 'How do dots light up under the cursor?', a: `A second dot layer in a brighter accent color is revealed through a mask-image radial gradient centered on the --x and --y CSS variables, which a pointermove handler updates to the cursor position. Only the dots inside the masked circle show, and because both layers share the same 22px tiling, the bright dots align exactly over the faint ones, so it reads as the same dots brightening.` },
      { q: 'Why use masks instead of redrawing dots on a canvas?', a: `Masking a pre-tiled gradient is cheaper and pixel-perfect: the dots never move, and the only thing changing is a mask center, a single composited property. A canvas approach would redraw dots every frame. The mask method scales to any hero size with no extra work and has negligible runtime cost.` },
      { q: 'Is the spotlight smooth and cheap?', a: `Yes. There is no per-frame JavaScript — the pointermove handler only writes two CSS variables, and the browser composites the masked gradient move on the GPU. So the glow tracks the cursor smoothly even on a large hero, and the content above uses pointer-events: none so it still lights the dots beneath the headline.` },
      { q: 'How do I use this dot pattern in React, Vue, or Angular?', a: `Keep the dot grid and edge fade as static CSS. Attach a pointermove handler that sets the --x and --y inline style on the spotlight layer via a ref. No state is needed since the move only updates CSS variables. The masks port directly; in Tailwind use arbitrary bg-[radial-gradient(...)] and mask-image values with the inline variables.` },
    ],
    aiPrompt: {
      paragraph: `Instead of puzzling through the layered masks yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the two stacked radial-gradient dot layers, sharing the same 22px background-size, line up so the accent layer reads as the same dots brightening rather than a second grid appearing on top. The same assistant can help optimize it, for instance confirming whether the pointermove handler calling getBoundingClientRect() on every event is cheap enough to skip caching, or whether it should be throttled for very high-frequency pointer events. It is also useful for extending the effect: ask it to make the spotlight radius pulse subtly on click, add a second color band further out from the cursor for a layered glow, or swap the dot grid for a subtle grid-line pattern using the same masking technique. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a dotted-grid hero background with a cursor-following spotlight in plain HTML and CSS, using only two lines of JavaScript to track the pointer — no canvas.

Requirements:
- A base layer that renders a repeating dot grid purely from a single CSS radial-gradient background-image (a small solid circle over transparent) tiled with a fixed background-size like 22px 22px, producing a grid of faint dots with zero images or extra DOM elements.
- Apply a separate mask-image (a radial gradient shaped like an ellipse, opaque in the center and fading to transparent toward the edges) on that dot layer so the grid dissolves into the page near the edges instead of ending in a hard rectangular cutoff.
- A second, identically-tiled dot layer in a brighter accent color, stacked on top of the first at the same background-size so its dots align exactly over the base dots, initially invisible or hidden.
- Reveal the accent layer only within a circular region using a mask-image radial-gradient whose center position is controlled by two CSS custom properties (e.g. --x and --y) rather than hardcoded values, so JavaScript can move the visible circle without touching any other CSS.
- A single pointermove listener on the hero section that computes the cursor's position relative to the section's bounding rect and writes it into those two CSS custom properties on every move — no other per-frame JavaScript work, no requestAnimationFrame loop, and no canvas redrawing.
- Fade the accent layer's opacity in only while the pointer is inside the hero (e.g. via a CSS hover rule), and keep the headline content above both dot layers with pointer-events disabled so it doesn't block the spotlight from tracking the cursor underneath it.`,
    },
  },
};

export default dotPattern;
