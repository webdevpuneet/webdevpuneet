const cssViewTimelineImageReveal = {
  id: 'css-view-timeline-image-reveal',
  title: 'View Timeline Image Reveal',
  lastmod: '2026-08-21',
  category: 'scroll',
  html: `<section class="vtr-intro"><h1>Frames That Reveal Themselves</h1><p>Scroll down — each frame clips open and settles into place purely from CSS <code>animation-timeline: view()</code>, with no IntersectionObserver in sight.</p></section>
<div class="vtr-gallery">
  <figure class="vtr-frame"><div class="vtr-swatch" style="background:linear-gradient(160deg,#7c3aed,#db2777)"></div><figcaption>Aurora</figcaption></figure>
  <figure class="vtr-frame"><div class="vtr-swatch" style="background:linear-gradient(160deg,#0891b2,#0d9488)"></div><figcaption>Reef</figcaption></figure>
  <figure class="vtr-frame"><div class="vtr-swatch" style="background:linear-gradient(160deg,#ea580c,#dc2626)"></div><figcaption>Ember</figcaption></figure>
  <figure class="vtr-frame"><div class="vtr-swatch" style="background:linear-gradient(160deg,#4338ca,#7c3aed)"></div><figcaption>Nocturne</figcaption></figure>
  <figure class="vtr-frame"><div class="vtr-swatch" style="background:linear-gradient(160deg,#65a30d,#16a34a)"></div><figcaption>Canopy</figcaption></figure>
  <figure class="vtr-frame"><div class="vtr-swatch" style="background:linear-gradient(160deg,#db2777,#f59e0b)"></div><figcaption>Bloom</figcaption></figure>
</div>
<section class="vtr-outro"><p>Every frame above animated independently, timed by its own presence in the viewport — not by a shared scroll percentage.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0a12;color:#f1eefb}
.vtr-intro,.vtr-outro{min-height:60vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;padding:24px;max-width:560px;margin:0 auto}
.vtr-intro h1{font-size:clamp(30px,6vw,54px);letter-spacing:-.02em}
.vtr-intro p,.vtr-outro p{color:#a99fc9;font-size:16px;line-height:1.7}
code{background:rgba(219,39,119,.14);color:#f0abfc;padding:2px 6px;border-radius:5px;font-size:.9em;font-family:ui-monospace,Consolas,monospace}
.vtr-gallery{display:flex;flex-direction:column;gap:22vh;max-width:640px;margin:0 auto;padding:10vh 24px}
.vtr-frame{
  position:relative;border-radius:22px;overflow:hidden;border:1px solid #241f36;
  /* per-element view timeline: named so each frame gets its own independent progress */
  view-timeline-name:--frame-in;
  view-timeline-axis:block;
  animation:vtr-reveal linear both;
  animation-timeline:--frame-in;
  animation-range:entry 0% cover 40%;
}
.vtr-swatch{aspect-ratio:16/9;width:100%}
figcaption{position:absolute;left:18px;bottom:16px;font-size:13px;font-weight:700;letter-spacing:.04em;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.5)}
@keyframes vtr-reveal{
  from{clip-path:inset(0 100% 0 0 round 22px);opacity:0;transform:scale(.94)}
  to{clip-path:inset(0 0% 0 0 round 22px);opacity:1;transform:scale(1)}
}
@supports not (animation-timeline: view()){
  .vtr-frame{opacity:1;clip-path:none;transform:none;animation:none}
}`,

  js: `// Every reveal above is timed by CSS animation-timeline: view() (via a named
// view-timeline on each .vtr-frame) — each frame's own entry into the
// viewport drives its own animation independently. No JS observes scroll
// position at all; this script only reports feature support for the demo.
const supportsView = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');
document.querySelectorAll('.vtr-frame figcaption').forEach(cap => {
  if (!supportsView) cap.textContent += ' (fallback: always visible)';
});
console.log('[view-timeline-reveal] native view() timeline supported:', supportsView);`,

  seo: {
    title: 'View Timeline Image Reveal — Native CSS view() Per-Element Scroll Reveal',
    description: `A gallery of frames that clip-path reveal independently as each one enters the viewport, using the native CSS animation-timeline: view() API — no IntersectionObserver required. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'View Timeline Image Reveal — animation-timeline: view() Without IntersectionObserver',
      description: `Revealing elements as they scroll into view is one of the most common scroll effects on the web, and until recently it always meant JavaScript — an IntersectionObserver watching each element, toggling a class, letting CSS transitions take over. This snippet replaces that entire pattern with a single native CSS primitive: a per-element view timeline, where each frame's own position relative to the viewport drives its own animation, with zero JavaScript observing anything.

**A timeline per element, not per page**

The previous scroll-driven snippets in this series ([CSS Scroll-Driven Progress Bar](/ui-snippets/css-scroll-driven-progress/), [Scroll Timeline Nav Progress Indicator](/ui-snippets/css-scroll-timeline-nav-progress/)) both used \`scroll(root)\` — a single timeline representing the whole document's scroll range. \`view()\` timelines are different: each element gets \`view-timeline-name\` and \`view-timeline-axis\` set on itself, creating an independent timeline whose 0%–100% range corresponds to that specific element's transit through the viewport — from first becoming visible to fully exiting. Every \`.vtr-frame\` in the gallery has its own named timeline (\`--frame-in\`), so six frames animate on six independent schedules, purely because each one's geometry is different.

**Shaping exactly when the animation plays**

\`animation-range: entry 0% cover 40%\` narrows the portion of the view timeline that the keyframes actually play across — starting the moment the frame begins entering the viewport and finishing once it's 40% covered, rather than stretching the reveal across the frame's entire scroll transit. This is the CSS equivalent of an IntersectionObserver's \`rootMargin\` and threshold tuning, but declared directly in the animation itself.

**The reveal keyframes**

Each frame animates \`clip-path\` from \`inset(0 100% 0 0)\` (fully clipped from the right) to \`inset(0 0% 0 0)\` (fully visible), alongside \`opacity\` and a subtle \`scale\`. Because \`clip-path\` and \`transform\` are both compositor-friendly properties, the reveal stays smooth even with several frames animating independently during a fast scroll — the browser doesn't need to run any JavaScript callback per frame to know which elements are currently intersecting.

**Why this replaces IntersectionObserver for simple reveals**

An IntersectionObserver-based reveal (the technique behind libraries like [AOS Fade-Up Gallery](/ui-snippets/aos-fade-gallery/)) needs a JS observer instance, a callback that toggles classes, and CSS transitions that key off those classes — three moving parts kept in sync by hand. A view-timeline reveal needs one CSS block per element type and nothing else; the browser is the observer. For codebases already leaning on scroll-driven CSS elsewhere, this collapses a common JS dependency into pure styling.

**Customizing it**

Change \`view-timeline-axis\` to \`inline\` for horizontally-scrolling galleries, adjust \`animation-range\` to reveal earlier or later, or swap the clip-path direction for a top-down or centered iris reveal. Pair this technique with a [Photo Gallery](/ui-snippets/photo-gallery/) layout or a [Portfolio Filter Grid](/ui-snippets/portfolio-filter-grid/) for a CSS-only entrance across a real image set.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `An intro, a six-frame gallery, and an outro render — no CDN needed.` },
      { title: 'Scroll down slowly', text: `Each frame clip-path reveals independently as it enters the viewport.` },
      { title: 'Scroll back up', text: `Frames animate in reverse as they re-enter from below (animation both).` },
      { title: 'Compare timing between frames', text: `Notice each frame starts its own reveal on its own schedule.` },
      { title: 'Inspect animation-range', text: `Tune entry/cover percentages to reveal earlier or later.` },
      { title: 'Swap the clip-path direction', text: `Change inset() values for a top-down or diagonal reveal instead.` },
    ] },
    features: [
      { title: 'Per-element view timelines', text: `Each frame gets its own independent scroll-driven schedule.` },
      { title: 'Zero IntersectionObserver', text: `The browser tracks visibility natively, no JS observer needed.` },
      { title: 'Tunable animation-range', text: `entry/cover percentages control exactly when reveals play.` },
      { title: 'Clip-path + scale + opacity', text: `A compositor-friendly combination for smooth reveals.` },
      { title: 'Bidirectional by default', text: `animation ... both replays correctly scrolling up or down.` },
      { title: '@supports fallback', text: `Unsupported browsers show frames fully visible, never stuck hidden.` },
      { title: 'Independent gradients', text: `Six distinct color swatches so frames are visually distinguishable.` },
      { title: 'No image assets required', text: `CSS gradients stand in for photos; drop in real images with no changes.` },
    ],
    useCases: [
      { title: 'Portfolio galleries', text: `A CSS-only alternative to [Portfolio Filter Grid](/ui-snippets/portfolio-filter-grid/) entrances.` },
      { title: 'Photo showcases', text: `Reveal real images inside a [Photo Gallery](/ui-snippets/photo-gallery/) layout.` },
      { title: 'Case study pages', text: `Reveal screenshots one at a time as the reader scrolls a case study.` },
      { title: 'Product showcase pages', text: `Each product shot reveals independently instead of all at once.` },
      { title: 'Editorial / magazine layouts', text: `Pace image reveals against long-form text sections.` },
      { title: 'Marketing feature walkthroughs', text: `Pair with [Feature Cards](/ui-snippets/feature-cards/) for a scroll-paced story.` },
      { icon: 'CODE', title: 'Related: GSAP ScrollTrigger Pinned Gallery Snap', desc: 'See the [GSAP ScrollTrigger Pinned Gallery Snap](/ui-snippets/gsap-scroll-pin-gallery-snap/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Count-Up Stats on Scroll (IntersectionObserver)', desc: 'See the [Count-Up Stats on Scroll (IntersectionObserver)](/ui-snippets/scroll-reveal-counter-stats/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is a view() timeline different from a scroll() timeline?', a: `A scroll() timeline represents a single scroll container's overall scroll range — 0% to 100% across the whole scrollable distance. A view() timeline is per-element: it represents that specific element's own transit through the viewport, from first entering to fully exiting. Because each element defines its own view-timeline-name, multiple elements can animate on entirely independent schedules with no shared coordinate system.` },
      { q: 'What does animation-range: entry 0% cover 40% control?', a: `It restricts which portion of the element's view timeline the animation actually plays across. entry 0% is the moment the element starts entering the viewport; cover 40% is the point at which 40% of the element is covered by (has passed into) the viewport. Narrowing the range like this makes the reveal finish quickly after the element appears, rather than stretching it across the element's entire scroll transit.` },
      { q: 'Does the reveal replay when scrolling back up?', a: `Yes. Because the animation is set to both (fill-mode both) and driven by the live view timeline rather than a one-shot trigger, scrolling a frame back out of view and then back in re-plays the same keyframe range in the corresponding direction — there's no manual reset needed, unlike a class-toggling IntersectionObserver approach.` },
      { q: 'What happens in browsers without view() timeline support?', a: `The @supports not (animation-timeline: view()) block removes the animation and clip-path entirely, leaving frames fully opaque, unclipped, and at normal scale — so unsupported browsers simply see a static, fully visible gallery rather than frames stuck invisible or half-clipped.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Since the entire effect is CSS, the .vtr-frame rules (including view-timeline-name, view-timeline-axis, animation, and animation-range) port directly into a component stylesheet or CSS module — just make sure each repeated frame in a list gets the same class so they all pick up independent named timelines. No JavaScript lifecycle hooks are required for the reveal itself.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out per-element scroll timelines by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how giving every .vtr-frame the same view-timeline-name still lets each individual frame animate on its own independent schedule, and what animation-range: entry 0% cover 40% is actually narrowing compared to the element's full view timeline. The same assistant is useful for extending the effect: ask it to change the reveal direction to a vertical or diagonal clip-path, add a horizontal-scrolling variant using view-timeline-axis: inline, or make frames further down the page reveal with a slightly different animation-range so the pacing feels varied rather than mechanical. It's also worth asking whether a fallback using IntersectionObserver would be a reasonable belt-and-suspenders addition for browsers where the @supports block currently just disables the effect outright. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a scroll-triggered image/frame reveal gallery using only native CSS scroll-driven animations with per-element view timelines (animation-timeline: view() via view-timeline-name and view-timeline-axis) — no IntersectionObserver, no scroll event listeners for the core effect.

Requirements:
- A vertical stack of several frame elements (cards or figures), each containing a visual (a gradient swatch or image) and a caption.
- Every frame must declare its own view-timeline-name (they can share the same custom-ident name since each element gets an independent timeline instance) and view-timeline-axis: block, then reference that timeline via animation-timeline on a keyframe animation applied to the same element.
- The keyframe animation must reveal each frame using a compositor-friendly combination of properties — for example animating clip-path from a fully-clipped inset() state to a fully-visible inset() state, combined with opacity from 0 to 1 and a subtle scale from slightly-below-1 to 1.
- Use animation-range (for example entry 0% cover 40%) to narrow the portion of each frame's view timeline that the reveal actually plays across, so the animation completes shortly after the frame starts entering the viewport rather than stretching across its entire scroll transit.
- Set the animation's fill mode to both so frames correctly reverse their reveal when scrolled back out of view and re-play it when scrolled back in, entirely driven by the live timeline with no JavaScript re-triggering.
- Add an @supports not (animation-timeline: view()) fallback that removes the clip-path/opacity/transform animation entirely so frames render fully visible in unsupported browsers instead of being stuck clipped or invisible.
- Keep any JavaScript limited to a feature-support check (CSS.supports('animation-timeline: view()')) for a status message — it must not drive or trigger the reveal itself.`,
    },
  },
};

export default cssViewTimelineImageReveal;
