const motionOneSpringCards = {
  id: 'motion-one-spring-cards',
  title: 'Motion One Spring Cards',
  lastmod: '2026-08-21',
  category: 'cards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/motion@10.16.2/dist/motion.umd.js',
  ],
  html: `<section class="msc-wrap">
  <header class="msc-head"><h1>Team Snapshot</h1><p>Hover a card, or drag one sideways — every motion here is Motion One's spring easing, not a linear or bezier curve.</p></header>
  <div class="msc-grid" id="mscGrid">
    <div class="msc-card" data-drag="true"><span class="msc-avatar" style="background:#6366f1">M</span><h3>Maya Chen</h3><p>Product Design</p></div>
    <div class="msc-card" data-drag="true"><span class="msc-avatar" style="background:#ec4899">R</span><h3>Ravi Patel</h3><p>Engineering</p></div>
    <div class="msc-card" data-drag="true"><span class="msc-avatar" style="background:#22c55e">S</span><h3>Sofia Reyes</h3><p>Growth</p></div>
    <div class="msc-card" data-drag="true"><span class="msc-avatar" style="background:#f59e0b">J</span><h3>Jamal Okafor</h3><p>Research</p></div>
  </div>
  <button class="msc-shuffle" id="mscShuffle">Shuffle in ↻</button>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d16;color:#eef1fb;min-height:100vh}
.msc-wrap{max-width:760px;margin:0 auto;padding:60px 24px}
.msc-head{text-align:center;margin-bottom:44px}
.msc-head h1{font-size:clamp(28px,5vw,42px);letter-spacing:-.02em;margin-bottom:10px;background:linear-gradient(135deg,#fff,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.msc-head p{color:#8b93b0;font-size:15px;max-width:440px;margin:0 auto;line-height:1.6}
.msc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:18px;margin-bottom:32px}
.msc-card{
  background:linear-gradient(160deg,#161b2c,#0f1220);border:1px solid #232a41;border-radius:18px;
  padding:22px 18px;display:flex;flex-direction:column;align-items:flex-start;gap:8px;
  cursor:grab;touch-action:pan-y;opacity:0;transform:scale(.85);
}
.msc-card:active{cursor:grabbing}
.msc-avatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;color:#fff}
.msc-card h3{font-size:16px;letter-spacing:-.01em}
.msc-card p{font-size:12px;color:#8b93b0}
.msc-shuffle{display:block;margin:0 auto;padding:11px 22px;border-radius:10px;border:1px solid #2b3350;background:#151a2c;color:#cdd4ee;font-size:14px;font-weight:600;cursor:pointer}
.msc-shuffle:hover{background:#1d2440}`,

  js: `// Motion One is loaded globally from the CDN as \`Motion\` (UMD build),
// exposing animate(), stagger(), and spring().
const { animate, stagger, spring } = Motion;

const cards = document.querySelectorAll('.msc-card');
const shuffleBtn = document.getElementById('mscShuffle');

// Entrance: spring physics instead of a duration/easing curve — spring()
// takes stiffness/damping-style parameters and settles naturally.
function enter() {
  animate(
    cards,
    { opacity: [0, 1], scale: [0.85, 1], y: [24, 0] },
    { delay: stagger(0.08), easing: spring({ stiffness: 220, damping: 18 }) }
  );
}
enter();

// Hover: a quick spring "pop" on scale, independent per card.
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    animate(card, { scale: 1.05, y: -6 }, { easing: spring({ stiffness: 300, damping: 14 }) });
  });
  card.addEventListener('mouseleave', () => {
    animate(card, { scale: 1, y: 0 }, { easing: spring({ stiffness: 300, damping: 18 }) });
  });

  // Drag: simple pointer-driven horizontal drag that springs back to
  // center on release, using the same spring() easing as the entrance.
  let startX = 0, originX = 0, dragging = false;
  card.addEventListener('pointerdown', e => {
    dragging = true;
    startX = e.clientX;
    originX = 0;
    card.setPointerCapture(e.pointerId);
  });
  card.addEventListener('pointermove', e => {
    if (!dragging) return;
    originX = e.clientX - startX;
    card.style.transform = \`translateX(\${originX}px) rotate(\${originX / 20}deg)\`;
  });
  card.addEventListener('pointerup', () => {
    dragging = false;
    animate(card, { x: 0, rotate: 0 }, { easing: spring({ stiffness: 260, damping: 16 }) });
    card.style.transform = '';
  });
});

// Shuffle button: replay the staggered spring entrance.
shuffleBtn.addEventListener('click', () => {
  animate(cards, { opacity: [1, 0], scale: [1, 0.85], y: [0, 24] }, { duration: 0.15 })
    .finished.then(enter);
});`,

  seo: {
    title: 'Motion One Spring Cards — Free Spring-Physics Card Grid Snippet',
    description: `A card grid that enters, hovers, and drags with real spring physics using the lightweight Motion One library — no easing curves, just stiffness and damping. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Motion One Spring Cards — Spring Physics Entrances, Hover Pops & Drag-Back with Motion One',
      description: `Most CSS and JS animation relies on easing curves — bezier functions that approximate motion but never quite capture the springy overshoot-and-settle of a real physical object. This snippet uses Motion One, a small (under 5KB core) animation library built directly on the native Web Animations API, to drive card entrances, hover states, and drag interactions entirely with \`spring()\` easing instead of duration-based curves.

**Why spring easing instead of bezier curves**

A \`cubic-bezier\` easing curve is defined by four fixed control points and always takes the same shape regardless of how far an element travels. A spring, by contrast, is defined by physical parameters — \`stiffness\` and \`damping\` — and its motion emerges from simulating those forces frame by frame. This means a spring naturally travels faster over a longer distance and settles at a consistent, physical rate, which is why UI built with real device-like motion (iOS, native apps) tends to feel more responsive than web UI relying purely on timed curves. Motion One's \`spring()\` helper exposes this as a drop-in \`easing\` option for its \`animate()\` calls, so this snippet uses the exact same pattern as [Scroll Reveal Grid](/ui-snippets/scroll-reveal-grid/)'s stagger, just with spring physics instead of a power curve.

**Staggered spring entrance**

On load, \`animate(cards, {...}, { delay: stagger(0.08), easing: spring({ stiffness: 220, damping: 18 }) })\` animates every card's opacity, scale, and y-offset together, with each card's start delayed by 0.08s more than the previous one via Motion One's \`stagger()\` helper — the same staggered-wave idea as a GSAP-based reveal, but expressed with a two-line API and no separate plugin.

**Hover pop and drag-back**

Hovering a card triggers a snappier spring (\`stiffness: 300, damping: 14\`) that lifts and scales it slightly — high stiffness with low damping produces a small overshoot, giving the hover a lively "pop" rather than a flat linear lift. Dragging a card horizontally via pointer events, then releasing it, animates it back to \`x: 0, rotate: 0\` using another spring — so letting go of a card doesn't just snap it back instantly, it bounces back the way a card on a real desk would.

**Loading Motion One from a CDN**

This snippet loads Motion One's UMD build directly via a \`<script>\` tag from jsDelivr, which exposes a global \`Motion\` object with \`animate\`, \`stagger\`, and \`spring\` — no bundler or import statement required, matching how this snippet library loads other CDN-based effects. If you're working in a module-based project instead, the same functions are available as named exports from the \`motion\` npm package or its ESM CDN build.

**Customizing it**

Tune \`stiffness\`/\`damping\` for snappier or looser motion (higher stiffness = faster, lower damping = more bounce), change the stagger delay, or swap the horizontal-only drag for a full 2D drag using Motion One's built-in drag utilities. Pair this with [Feature Cards](/ui-snippets/feature-cards/) or a [Product Card](/ui-snippets/product-card/) grid for a livelier catalog entrance.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Motion One CDN', text: `Include the motion.js UMD build from the CDN panel — it exposes a global Motion object.` },
      { title: 'Paste HTML, CSS, and JS', text: `A team card grid and a shuffle button render.` },
      { title: 'Watch the entrance', text: `Cards spring in with a staggered 0.08s delay between each.` },
      { title: 'Hover a card', text: `It springs up and scales slightly with a snappy pop.` },
      { title: 'Drag a card sideways', text: `Release it — it springs back to center with a slight bounce.` },
      { title: 'Click Shuffle in', text: `Cards fade out quickly, then replay the staggered spring entrance.` },
    ] },
    features: [
      { title: 'Spring-based easing', text: `spring({ stiffness, damping }) replaces bezier curves entirely.` },
      { title: 'Staggered entrance', text: `stagger(0.08) delays each card's animation in sequence.` },
      { title: 'Snappy hover pop', text: `Higher stiffness, lower damping gives a lively overshoot.` },
      { title: 'Pointer-driven drag', text: `Cards drag horizontally and rotate slightly while dragging.` },
      { title: 'Spring drag-back', text: `Releasing a card springs it back to center, not an instant snap.` },
      { title: 'Replayable shuffle', text: `A button fades cards out then replays the staggered entrance.` },
      { title: 'Tiny dependency', text: `Motion One's core is a few KB, built on the native WAAPI.` },
      { title: 'No build step needed', text: `Loaded as a UMD global straight from a CDN script tag.` },
    ],
    useCases: [
      { title: 'Team and about pages', text: `Introduce a [team card](/ui-snippets/team-card/) grid with springy motion.` },
      { title: 'Product catalogs', text: `Animate a [product card](/ui-snippets/product-card/) grid entrance.` },
      { title: 'Feature showcases', text: `Give [feature cards](/ui-snippets/feature-cards/) a physical, tactile feel.` },
      { title: 'Kanban / sortable boards', text: `Use the drag-and-spring-back pattern as a base for reorderable cards.` },
      { title: 'Onboarding carousels', text: `Spring-driven card stacks feel more alive than duration-based fades.` },
      { title: 'Testimonial rotators', text: `Pair with [Testimonial Card](/ui-snippets/testimonial-card/) for springy transitions.` },
    ],
    faqs: [
      { q: 'What does spring({ stiffness, damping }) actually control?', a: `stiffness controls how strongly the spring pulls toward its target — higher values move faster and more urgently. damping controls how much the motion is resisted as it approaches the target — lower damping allows more oscillation and overshoot before settling, higher damping approaches smoothly with little or no bounce. Motion One simulates these forces frame by frame rather than interpolating along a fixed curve, which is why the resulting motion looks different depending on how far the element travels.` },
      { q: 'Why use Motion One instead of GSAP for this?', a: `Motion One is a much smaller library (a few KB versus GSAP's larger core plus plugins) built directly on the browser's native Web Animations API, which makes it a good fit when spring easing and simple entrance/hover/drag animations are all you need. GSAP remains the stronger choice for complex timelines, scroll-triggered sequencing, or SVG morphing — see [Scroll Reveal Grid](/ui-snippets/scroll-reveal-grid/) for a GSAP-based example doing exactly that.` },
      { q: 'How does the drag-back-to-center animation work?', a: `Pointer events (pointerdown/pointermove/pointerup) track horizontal movement and directly set a translateX/rotate transform on the card while dragging, giving instant 1:1 feedback. On pointerup, Motion One's animate() call takes over, animating x and rotate back to 0 using spring() easing — so the release feels like a physical snap-back rather than an abrupt jump.` },
      { q: 'Can I use Motion One as an ES module instead of a CDN script tag?', a: `Yes. This snippet loads the UMD build via a <script> tag so animate, stagger, and spring are available as the global Motion object with no bundler. In a module-based project, install the motion npm package and import { animate, stagger, spring } from 'motion' directly, or import from an ESM CDN like esm.sh/motion if you're not using a bundler but want ES module syntax.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Import animate, stagger, and spring from the motion package (or reference the CDN global if not bundling), then call animate() inside a mount effect (useEffect, onMounted, or ngAfterViewInit) targeting refs to your card elements rather than querySelectorAll. Attach the pointer event handlers as React/Vue/Angular event bindings instead of addEventListener, keeping the same spring() easing values.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to tune spring parameters by trial and error. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how stiffness and damping in spring({ stiffness: 220, damping: 18 }) combine to produce the entrance motion's settle time and how that differs from what a cubic-bezier easing curve of similar duration would look like. The same assistant can help you tune the feel — asking whether the hover spring's stiffness: 300, damping: 14 is too bouncy for a dense grid of many cards, or whether the drag-back spring should use different values than the entrance spring. It's also useful for extending the interaction: ask it to add full 2D drag instead of horizontal-only, constrain the drag to the grid's bounding box, or replace the shuffle button's instant fade-out with its own spring-based exit animation. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "spring cards" grid in plain HTML, CSS, and JavaScript using the Motion One library (loaded as a global via its CDN UMD build), where every animation — entrance, hover, and drag release — uses spring() easing instead of duration-based bezier curves.

Requirements:
- A responsive grid of card elements (name, role, avatar), initially hidden (opacity 0, scaled down) via CSS, that animate into place on page load using Motion One's animate() targeting all cards at once.
- The entrance animation must use Motion One's stagger() helper to delay each card's start by a small fixed amount relative to the previous card, and must use spring() (not a named easing string or bezier curve) as the easing option, combining opacity, scale, and a vertical offset.
- On mouseenter, each card should independently animate to a slightly larger scale and a small upward y-offset using a snappier spring configuration (higher stiffness, lower damping than the entrance), and animate back to its resting state with a different spring on mouseleave.
- Implement horizontal pointer-driven dragging on each card: track pointerdown/pointermove to move the card and apply a subtle rotation proportional to the drag distance directly via a CSS transform, then on pointerup use Motion One's animate() with spring() easing to animate the card's position and rotation back to zero — it must visibly bounce back rather than snap instantly.
- Add a "shuffle" button that quickly fades and scales all cards out, waits for that animation to finish (using the returned animation's .finished promise), then re-triggers the original staggered spring entrance.
- Load Motion One only via a CDN script tag (no bundler, no import statement) and access its animate, stagger, and spring functions from the resulting global object.`,
    },
  },
};

export default motionOneSpringCards;
