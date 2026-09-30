const scrollSnapViewTimelineCarousel = {
  id: 'scroll-snap-view-timeline-carousel',
  title: 'Scroll-Snap Carousel (view-timeline Scale)',
  category: 'carousels',
  html: `<div class="ssv-wrap">
  <p class="ssv-hint">Drag, swipe, or scroll the strip below. Native CSS <code>scroll-snap-type</code> handles the snapping and the active slide's scale-up comes purely from <code>animation-timeline: view()</code> — no carousel library, no JS position tracking.</p>
  <div class="ssv-track">
    <div class="ssv-slide" style="--c1:#4338ca;--c2:#7c3aed"><span>01</span><h3>Launch Week</h3></div>
    <div class="ssv-slide" style="--c1:#0891b2;--c2:#0d9488"><span>02</span><h3>Field Notes</h3></div>
    <div class="ssv-slide" style="--c1:#db2777;--c2:#ea580c"><span>03</span><h3>Behind the Scenes</h3></div>
    <div class="ssv-slide" style="--c1:#16a34a;--c2:#65a30d"><span>04</span><h3>Studio Visit</h3></div>
    <div class="ssv-slide" style="--c1:#eab308;--c2:#dc2626"><span>05</span><h3>Year in Review</h3></div>
  </div>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a12;color:#f1eefb;min-height:100vh;display:flex;align-items:center}
.ssv-wrap{width:100%;padding:40px 0}
.ssv-hint{max-width:560px;margin:0 auto 30px;padding:0 24px;text-align:center;color:#a3a0c4;font-size:14px;line-height:1.7}
.ssv-hint code{background:rgba(129,140,248,.16);color:#c7d2fe;padding:2px 6px;border-radius:5px;font-size:.9em;font-family:ui-monospace,Consolas,monospace}

.ssv-track{
  display:flex;gap:18px;overflow-x:auto;padding:6vh 42vw 6vh 24px;
  scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;
}
.ssv-track::-webkit-scrollbar{display:none}

.ssv-slide{
  flex:0 0 240px;aspect-ratio:3/4;border-radius:20px;position:relative;overflow:hidden;
  display:flex;flex-direction:column;justify-content:flex-end;gap:6px;padding:22px;
  background:linear-gradient(155deg,var(--c1),var(--c2));
  scroll-snap-align:center;

  view-timeline-name:--slide-x;
  view-timeline-axis:inline;
  animation:ssv-scale linear both;
  animation-timeline:--slide-x;
  animation-range:contain 0% contain 100%;
  transform:scale(.82);
  opacity:.55;
}
.ssv-slide span{font-size:12px;font-weight:700;letter-spacing:.08em;color:rgba(255,255,255,.7)}
.ssv-slide h3{font-size:19px;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.4)}

@keyframes ssv-scale{
  0%{ transform:scale(.82); opacity:.5 }
  50%{ transform:scale(1); opacity:1 }
  100%{ transform:scale(.82); opacity:.5 }
}

@supports not (animation-timeline: view()){
  .ssv-slide{transform:scale(1);opacity:1;animation:none}
}`,
  js: `// The active-slide scale-up is entirely driven by CSS animation-timeline:
// view() on the inline axis (contain 0% to contain 100%), and the snap
// behavior itself is native scroll-snap-type -- no JS position tracking,
// no carousel library, no scroll event listener anywhere in this file.
const supportsView = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');
console.log('[snap-view-timeline-carousel] native inline view() timeline supported:', supportsView);
if (!supportsView) {
  console.log('[snap-view-timeline-carousel] falling back to all slides shown at full scale.');
}`,
  seo: {
    title: 'Native Scroll-Snap Carousel with view-timeline Active-Slide Scale',
    description: 'A horizontal scroll-snap carousel where the centered slide scales up purely from native CSS animation-timeline: view() as it becomes active, no carousel library and no JS position tracking. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Scroll-Snap Carousel with view-timeline Scale — No Carousel Library, No JS Position Math',
      description: `A "story" or "peek" carousel — a horizontal row of cards where the centered card is emphasized while neighbors sit smaller and dimmer at the edges — is normally built with a carousel library computing each slide's distance from center on scroll and writing an inline transform. This snippet builds the identical visual result with two entirely native CSS features working together: \`scroll-snap-type\` for the snapping mechanics, and a per-slide \`animation-timeline: view()\` for the scale-and-fade emphasis — zero JavaScript touches slide position at any point.

**Two independent native systems, stacked**

\`scroll-snap-type: x mandatory\` on \`.ssv-track\` plus \`scroll-snap-align: center\` on each \`.ssv-slide\` is the entire snapping mechanism — dragging, trackpad scrolling, and keyboard arrow navigation (once a slide receives focus) all snap crisply to the nearest slide's center with no JavaScript at all, the same technique behind [Scroll Snap Peek Carousel](/ui-snippets/scroll-snap-peek-carousel/). The scale-and-fade emphasis is a completely separate system layered on top: each slide's own \`view-timeline-axis: inline\` timeline, tracking that slide's transit across the horizontally scrolling track, drives a \`@keyframes\` animation that scales the slide up and fades it to full opacity right around the point it is centered.

**Why contain instead of cover for animation-range**

\`animation-range: contain 0% contain 100%\` uses the \`contain\` range rather than \`cover\` — \`contain\` represents the portion of the timeline during which the *entire* slide is contained within the scrollport, rather than any part of it being visible at all. For a slide that is narrower than the viewport, this produces a scale peak much closer to the slide's true centered position than \`cover\` would, since \`cover\` starts as soon as any single pixel of the slide is visible.

**No carousel library, no active-index state**

A typical JS carousel tracks an \`activeIndex\` in state and recomputes classes or inline styles for every slide whenever it changes. Here there is no index anywhere — each slide answers "how emphasized should I be right now" purely from its own \`view-timeline\`, so slides can be added, removed, or reordered in the DOM with no JavaScript changes required at all.

**Browser support**

\`scroll-snap-type\` has been supported everywhere for years and works today regardless of browser. The \`view-timeline\`-driven scale is the newer piece: Chromium-based browsers (Chrome, Edge, Opera, Brave) support \`animation-timeline: view()\` today, while Firefox and Safari support is still landing. An \`@supports not (animation-timeline: view())\` block shows every slide at full scale and opacity in that case — the carousel still snaps and functions perfectly, it simply loses the scale emphasis.

**Customizing it**

Adjust the \`0.82\` minimum scale and \`.5\` minimum opacity in \`@keyframes ssv-scale\` for a subtler or more dramatic emphasis, change the slide width or gap to control how many neighbors peek in at the edges, or add a small dot pagination indicator that mirrors \`scroll-snap-align\` targets via \`:target\` or a tiny scroll-position script for keyboard-only navigation. Pair it with [Dot Pagination Carousel](/ui-snippets/dot-pagination-carousel/) for an added position indicator.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A five-slide horizontal scroll-snap carousel renders — no library needed.` },
      { title: 'Drag or scroll the strip', text: `Each slide snaps to center; the centered slide scales up and brightens automatically.` },
      { title: 'Try keyboard navigation', text: `Focus the track and use arrow keys or Tab — native scroll-snap handles keyboard scroll targets.` },
      { title: 'Adjust the emphasis amount', text: `Tune scale(.82) and opacity: .5 in @keyframes ssv-scale for a subtler or bolder effect.` },
      { title: 'Change slide count or width', text: `Add, remove, or resize .ssv-slide elements — no JS index state to update anywhere.` },
      { title: 'Export in your format', text: `Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.` },
    ] },
    features: [
      'Native scroll-snap-type + scroll-snap-align handle all snapping, dragging, and keyboard nav',
      'animation-timeline: view() on the inline axis drives the active-slide scale and fade',
      'contain-based animation-range peaks emphasis closer to true visual center than cover would',
      'No JS activeIndex state — every slide computes its own emphasis independently',
      'Slides can be added, removed, or reordered with zero script changes',
      'Compositor-friendly transform: scale() and opacity keep the effect smooth while dragging',
      '@supports fallback keeps the carousel fully functional, just without the scale emphasis',
      'Works with touch drag, trackpad, mouse wheel, and keyboard out of the box',
    ],
    useCases: [
      { icon: 'APP', title: 'Story and highlight carousels', desc: 'A CSS-only alternative to a JS carousel library for [Recently Viewed Carousel](/ui-snippets/recently-viewed-carousel/)-style highlight rows.' },
      { icon: 'DESIGN', title: 'Product or portfolio spotlight rows', desc: 'Emphasize whichever item is centered without maintaining any active-index state in JavaScript.' },
      { icon: 'LEARN', title: 'Learn contain vs cover animation-range', desc: 'A focused comparison point for how contain narrows a view-timeline range differently than cover.' },
      { icon: 'FLOW', title: 'Testimonial or quote carousels', desc: 'Pair with [Testimonial Carousel](/ui-snippets/testimonial-carousel/) patterns for a native-CSS emphasis effect.' },
      { icon: 'CODE', title: 'Replace a JS carousel library', desc: 'Removes the dependency on a carousel library purely for the peek-and-scale visual behavior.' },
      { icon: 'CODE', title: 'Related: Scroll Snap Peek Carousel', desc: 'See the [Scroll Snap Peek Carousel](/ui-snippets/scroll-snap-peek-carousel/) for the JS-driven version of a similar peek-and-scale carousel.' },
    ],
    faqs: [
      { q: 'Is any JavaScript needed for the snapping or the scale effect?', a: `No. Snapping is entirely native scroll-snap-type and scroll-snap-align, and the scale/fade emphasis is entirely native animation-timeline: view(). The included JavaScript only logs whether the browser supports view() timelines — it never tracks slide position or drives the animation.` },
      { q: 'What is the difference between contain and cover in animation-range?', a: `cover represents the range during which any part of the element is visible in the scrollport, starting the instant a single pixel appears. contain represents the range during which the entire element is fully contained within the scrollport at once. For a narrower-than-viewport slide, contain produces a peak much closer to the slide's true centered position than cover would.` },
      { q: 'How does each slide know when it is the active, centered one without JS?', a: `It doesn't "know" in the sense of comparing itself to siblings — each slide's own view timeline simply reports how far through its contain range it currently is, and the @keyframes animation happens to peak in scale and opacity at the 50% keyframe stop, which corresponds to the middle of that range. Because scroll-snap-align: center pulls the active slide toward the viewport center, its contain range midpoint and its visually centered position coincide.` },
      { q: 'Can I add, remove, or reorder slides without touching the JavaScript?', a: `Yes. Every .ssv-slide computes its own emphasis from its own view-timeline-name, so there is no index array, no activeIndex state, and no per-slide JavaScript wiring to update — adding or removing a slide element in the HTML is the only change required.` },
      { q: 'What happens in browsers without animation-timeline: view() support?', a: `The @supports not (animation-timeline: view()) block resets every slide to full scale and full opacity with no animation, so Firefox and Safari users still get a fully functional, native scroll-snap carousel — it simply does not scale the centered slide up.` },
      { q: 'Does this work with touch, trackpad, and keyboard?', a: `Yes, all three work natively because scroll-snap-type is a browser-level scrolling feature, not a JS-simulated one. Touch drags, trackpad gestures, mouse wheel scrolling, and keyboard-driven scroll (once an element inside the track has focus) all trigger the same native snap behavior.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the scroll-snap and view-timeline interplay by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why animation-range uses the contain keyword instead of cover for the active-slide scale peak, and how scroll-snap-align: center on each slide keeps that contain range's midpoint aligned with the slide's actual visually centered position. The same assistant is useful for extending the effect: ask it to add a small dot pagination row that stays in sync purely via CSS (or a tiny script) without maintaining duplicate index state, add autoplay via a periodic scrollIntoView call, or make the scale curve steeper so only the exact center slide stands out. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a horizontally scrolling "story" carousel where slides snap to center using native CSS scroll-snap, and the currently centered slide scales up and brightens purely from native CSS animation-timeline: view() — no carousel library, no JavaScript tracking of an active slide index or scroll position.

Requirements:
- A horizontally scrollable track with scroll-snap-type: x mandatory, containing several slide elements each with scroll-snap-align: center and a fixed flex-basis narrower than the track's visible width, so neighboring slides peek in at both edges.
- Every slide must declare view-timeline-axis: inline (not the default block) and its own view-timeline-name, then reference that timeline via animation-timeline on a keyframe animation applied to the same element.
- Use animation-range with the contain keyword (for example contain 0% contain 100%) rather than cover, so the scale peak aligns closely with the moment the slide is fully contained and centered in the scrollport, not just partially visible.
- The keyframes must animate transform: scale() and opacity so the slide starts smaller and dimmer, reaches full scale and full opacity at the midpoint of its contain range, and returns to smaller and dimmer as it exits — creating a continuous emphasis effect with no JavaScript computing which slide is "active."
- Do not maintain any activeIndex or similar JavaScript state — every slide must determine its own emphasis level purely from its own view timeline.
- Add an @supports not (animation-timeline: view()) fallback that shows every slide at full scale and full opacity (the carousel must remain fully functional via scroll-snap alone even without the scale effect).
- Keep any JavaScript limited to a CSS.supports('animation-timeline: view()') feature check logged to the console — it must not drive or track slide position itself.`,
    },
  },
};

export default scrollSnapViewTimelineCarousel;
