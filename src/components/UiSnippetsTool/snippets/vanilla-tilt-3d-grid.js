const vanillaTilt3dGrid = {
  id: 'vanilla-tilt-3d-grid',
  title: 'Vanilla-Tilt 3D Card Grid',
  lastmod: '2026-08-21',
  category: 'cards',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js',
  ],
  html: `<section class="vtg-wrap">
  <header class="vtg-head"><h1>Skill Cards</h1><p>Hover any card below — the 3D tilt, glare, and scale are handled entirely by VanillaTilt.init(), configured with a single options object.</p></header>
  <div class="vtg-grid" id="vtgGrid">
    <div class="vtg-card" data-tilt><h3>Interface Design</h3><p>Systems, components, motion.</p></div>
    <div class="vtg-card" data-tilt><h3>Frontend Engineering</h3><p>Performance, accessibility, DX.</p></div>
    <div class="vtg-card" data-tilt><h3>Data Visualization</h3><p>Charts that explain, not decorate.</p></div>
    <div class="vtg-card" data-tilt><h3>Design Systems</h3><p>Tokens, docs, adoption.</p></div>
    <div class="vtg-card" data-tilt><h3>Prototyping</h3><p>Fast, disposable, honest.</p></div>
    <div class="vtg-card" data-tilt><h3>Motion Design</h3><p>Timing that feels physical.</p></div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#08121a;color:#e6f6ff}
.vtg-wrap{max-width:900px;margin:0 auto;padding:60px 24px}
.vtg-head{text-align:center;margin-bottom:40px}
.vtg-head h1{font-size:clamp(28px,5vw,42px);letter-spacing:-.02em;margin-bottom:10px;background:linear-gradient(135deg,#fff,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.vtg-head p{color:#7fa9bd;font-size:15px;max-width:460px;margin:0 auto;line-height:1.6}
.vtg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px}
.vtg-card{
  background:linear-gradient(160deg,#102534,#081a24);border:1px solid #163244;border-radius:18px;
  padding:26px 22px;min-height:150px;transform-style:preserve-3d;
}
.vtg-card h3{font-size:18px;letter-spacing:-.01em;margin-bottom:8px;transform:translateZ(30px)}
.vtg-card p{font-size:13px;color:#7fa9bd;line-height:1.6;transform:translateZ(20px)}`,

  js: `// VanillaTilt.init scans every element passed to it (or matching a
// selector) and attaches its own mousemove/mouseleave listeners that
// compute rotateX/rotateY plus an optional glare layer — no manual
// pointer math needed in this file at all.
VanillaTilt.init(document.querySelectorAll('.vtg-card'), {
  max: 14,            // maximum tilt rotation in degrees
  speed: 400,          // transition speed back to rest, in ms
  perspective: 900,    // 3D perspective distance
  scale: 1.04,         // slight zoom while hovering
  glare: true,         // enable the moving glare highlight
  'max-glare': 0.25,   // glare opacity ceiling
  gyroscope: true,     // use device tilt on supported mobile devices
});`,

  seo: {
    title: 'Vanilla-Tilt 3D Card Grid — Free Tilt.js Hover Effect Snippet',
    description: `A grid of cards with 3D tilt, glare, and gyroscope support on hover, powered entirely by VanillaTilt.init() and a single options object. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Vanilla-Tilt 3D Card Grid — Tilt, Glare & Gyroscope from One init() Call',
      description: `VanillaTilt.js packages the mouse-driven 3D tilt effect — the same family of interaction as [3D Card Tilt](/ui-snippets/3d-card-tilt/) — into a small dependency-free library, so instead of writing your own \`mousemove\` handler and rotation math, you call \`VanillaTilt.init()\` once with a set of elements and an options object, and the library owns the pointer tracking, the transform application, and the reset-on-leave behavior for every card at once.

**One init call, a whole grid**

\`VanillaTilt.init(document.querySelectorAll('.vtg-card'), { ... })\` attaches the tilt behavior to every card in a single call — there's no per-card event wiring in this file's JavaScript at all. Internally, VanillaTilt does the same kind of \`getBoundingClientRect()\`-based offset calculation as a hand-written tilt effect, but it also manages a shared render loop, easing, and cleanup so the same options object scales from one card to a hundred without any additional code.

**The options that shape the feel**

\`max: 14\` caps rotation at 14 degrees; \`perspective: 900\` sets how dramatic the 3D foreshortening looks (lower values feel more extreme); \`scale: 1.04\` adds a subtle zoom while hovering; \`speed: 400\` controls how quickly the card eases back to flat on mouse-leave. Each of these mirrors a concept from a hand-rolled tilt effect, just exposed as a named, documented option instead of inline math.

**Built-in glare and gyroscope**

Two features VanillaTilt adds beyond a basic hand-rolled tilt: \`glare: true\` overlays a moving highlight that tracks the cursor, simulating light reflecting off the card's surface (conceptually similar to the \`.glow\` element in [3D Card Tilt](/ui-snippets/3d-card-tilt/), but generated and positioned by the library); and \`gyroscope: true\` lets the same tilt respond to device orientation on supported mobile browsers, so the effect isn't purely a desktop-hover feature.

**3D depth inside each card**

The heading and paragraph inside each card use \`transform: translateZ(30px)\` and \`translateZ(20px)\` respectively, combined with \`transform-style: preserve-3d\` on the card. Because the card itself is being rotated in 3D by VanillaTilt, child elements pushed forward on the Z-axis appear to float above the card's surface as it tilts — a detail that reads as genuine depth rather than a flat rotated rectangle.

**When to reach for a library versus hand-rolling it**

If you need one distinctive tilt effect with full control over the easing curve or glow behavior, hand-writing it (as in [3D Card Tilt](/ui-snippets/3d-card-tilt/)) keeps the code self-contained and dependency-free. If you need the same tilt applied consistently across many cards, with glare and gyroscope support out of the box, VanillaTilt's declarative options object is less code to maintain. Pair this grid with [Feature Cards](/ui-snippets/feature-cards/) or a [Tilt Glow Card](/ui-snippets/tilt-glow-card/) hero for a showcase page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the VanillaTilt CDN script', text: `Include vanilla-tilt.min.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A six-card skill grid renders, each marked with data-tilt.` },
      { title: 'Hover a card', text: `It tilts toward the cursor with a moving glare highlight.` },
      { title: 'Move the cursor across it', text: `Rotation follows cursor position smoothly in real time.` },
      { title: 'Move the cursor away', text: `The card eases back to flat over 400ms.` },
      { title: 'Adjust the options object', text: `Change max, speed, glare, or scale to retune the feel.` },
    ] },
    features: [
      { title: 'Single init() call', text: `VanillaTilt.init() wires up every card at once.` },
      { title: 'Configurable tilt angle', text: `max controls the maximum rotation in degrees.` },
      { title: 'Built-in glare layer', text: `glare: true adds a moving highlight with no extra markup.` },
      { title: 'Gyroscope support', text: `gyroscope: true drives tilt from device orientation on mobile.` },
      { title: 'Eased reset', text: `speed controls how quickly cards return to flat on leave.` },
      { title: 'Hover scale', text: `scale slightly zooms cards while the cursor is over them.` },
      { title: '3D child depth', text: `translateZ on heading/paragraph adds layered depth per card.` },
      { title: 'Zero manual pointer math', text: `No mousemove handlers are written in this file at all.` },
    ],
    useCases: [
      { title: 'Skill and service grids', text: 'Give a services list the same tactile feel as a [3D card tilt](/ui-snippets/3d-card-tilt/), wiring every card with one `VanillaTilt.init()` call.' },
      { title: 'Product catalogues', text: 'Apply tilt across an entire [product card](/ui-snippets/product-card/) grid, with `max` controlling the maximum rotation in degrees.' },
      { title: 'Portfolio project grids', text: 'Combine with a [portfolio filter grid](/ui-snippets/portfolio-filter-grid/), adding `glare: true` for a moving highlight with no extra markup.' },
      { title: 'Team member grids', text: 'Apply one options object across a [team card](/ui-snippets/team-card/) grid, and enable `gyroscope: true` so phones drive tilt from device orientation.' },
      { title: 'NFT and collectible galleries', text: 'Use the tilt-plus-glare combination for trading-card style displays, and for pricing plans that need a livelier comparison.' },
    ],
    faqs: [
      { q: 'How is this different from hand-writing the tilt effect myself?', a: `The mechanics are conceptually the same as a hand-written version like 3D Card Tilt — pointer offset from the element's center drives rotateX/rotateY — but VanillaTilt handles the event listeners, easing, glare rendering, and gyroscope support for every matched element automatically from one options object, so you don't maintain that logic yourself or repeat it per card.` },
      { q: 'What does the glare option actually add?', a: `When glare: true, VanillaTilt creates and positions its own overlay element inside each tilted card that brightens on the side facing the simulated light source (which tracks the cursor), fading in and out as the card rotates. max-glare caps how opaque that overlay can become, so you can keep the highlight subtle or make it a dominant visual element.` },
      { q: 'Does the tilt work on mobile devices?', a: `With gyroscope: true, VanillaTilt listens to the device orientation API on supported mobile browsers and drives the same rotateX/rotateY transform from the phone's physical tilt instead of a mouse position — so the effect degrades gracefully from mouse-hover on desktop to device-tilt on mobile rather than simply not working at all.` },
      { q: 'Why do the heading and paragraph use translateZ?', a: `Because the card has transform-style: preserve-3d, child elements can be positioned along the Z-axis within the same 3D space the card itself is rotating in. Pushing the heading and paragraph forward with translateZ makes them appear to float slightly above the card's base surface as it tilts, reinforcing the depth illusion beyond what rotation alone would produce.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Install the vanilla-tilt npm package (or keep the CDN script), import it, and call VanillaTilt.init() inside a mount effect (useEffect, onMounted, or ngAfterViewInit) targeting refs to your card elements. Call VanillaTilt.destroy() on each element in the cleanup function to remove its listeners when the component unmounts, especially important in list views where cards are added and removed dynamically.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to read through VanillaTilt's source to understand its options. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what each option in the VanillaTilt.init() call controls — max, speed, perspective, scale, glare, max-glare, and gyroscope — and how they interact to produce the overall feel of the tilt. The same assistant can help you tune it, for instance asking whether a max of 14 degrees is appropriate for a dense grid of many small cards versus a few large feature cards, or whether gyroscope: true could cause unwanted motion on a mobile page that also uses scroll-based effects. It's also useful for extending the grid: ask it to stagger each card's tilt initialization with a slight entrance delay, add a subtle border-glow color tied to a data attribute per card, or combine this tilt with a scroll-reveal entrance like Scroll Reveal Grid. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a grid of 3D-tilting cards in plain HTML, CSS, and JavaScript using the VanillaTilt.js library loaded from a CDN — the tilt, glare, and reset behavior must come entirely from the library's own options, with no manual mousemove/mouseleave handlers written by hand.

Requirements:
- A responsive CSS grid of at least six cards, each with a heading and short description, styled with a dark background and transform-style: preserve-3d so child elements can be pushed forward with translateZ to appear layered above the card surface.
- Every card element must be selectable by VanillaTilt (either via a data-tilt attribute or a shared class/selector) and initialized with a single VanillaTilt.init() call targeting all cards at once — do not attach any custom pointer event listeners.
- Configure the init call's options object with: a maximum tilt angle (max) around 10-15 degrees, a perspective distance, a reset speed in milliseconds, a slight hover scale greater than 1, glare enabled with a capped max-glare opacity, and gyroscope enabled for mobile device-tilt support.
- The heading and paragraph text inside each card should use translateZ to sit visually above the card's base plane once it's tilted, demonstrating genuine 3D depth rather than a flat rotated rectangle.
- Ensure the grid reflows responsively (for example with repeat(auto-fit, minmax(...))) so the tilt effect still looks correct at different card counts per row.`,
    },
  },
};

export default vanillaTilt3dGrid;
