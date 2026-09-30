const viewTimelineSaturationGallery = {
  id: 'view-timeline-saturation-gallery',
  title: 'Saturation Gallery (view-timeline)',
  category: 'scroll',
  html: `<div class="vsg-wrap">
  <p class="vsg-hint">Scroll the strip → each photo desaturates and blurs at its edges, sharpening to full color only in the center — driven purely by CSS <code>animation-timeline: view()</code> on each frame's own inline axis.</p>
  <div class="vsg-track">
    <figure class="vsg-frame" style="--c1:#f97316;--c2:#dc2626"><figcaption>Ember Trail</figcaption></figure>
    <figure class="vsg-frame" style="--c1:#0891b2;--c2:#0d9488"><figcaption>Reef Line</figcaption></figure>
    <figure class="vsg-frame" style="--c1:#7c3aed;--c2:#db2777"><figcaption>Aurora Field</figcaption></figure>
    <figure class="vsg-frame" style="--c1:#65a30d;--c2:#16a34a"><figcaption>Canopy Edge</figcaption></figure>
    <figure class="vsg-frame" style="--c1:#4338ca;--c2:#7c3aed"><figcaption>Nocturne</figcaption></figure>
    <figure class="vsg-frame" style="--c1:#eab308;--c2:#ea580c"><figcaption>Desert Glow</figcaption></figure>
    <figure class="vsg-frame" style="--c1:#0ea5e9;--c2:#4338ca"><figcaption>Deep Current</figcaption></figure>
  </div>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0a10;color:#f1eefb;min-height:100vh;display:flex;align-items:center}
.vsg-wrap{width:100%;padding:40px 0}
.vsg-hint{max-width:560px;margin:0 auto 28px;padding:0 24px;text-align:center;color:#a99fc9;font-size:14px;line-height:1.7}
.vsg-hint code{background:rgba(219,39,119,.16);color:#f0abfc;padding:2px 6px;border-radius:5px;font-size:.9em;font-family:ui-monospace,Consolas,monospace}

.vsg-track{
  display:flex;gap:20px;overflow-x:auto;padding:8vh 40vw 8vh 24px;
  scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;scrollbar-width:thin;
}
.vsg-frame{
  flex:0 0 280px;aspect-ratio:3/4;border-radius:18px;position:relative;overflow:hidden;
  background:linear-gradient(160deg,var(--c1),var(--c2));scroll-snap-align:center;

  view-timeline-name:--frame-x;
  view-timeline-axis:inline;
  animation:vsg-focus linear both;
  animation-timeline:--frame-x;
  animation-range:cover 0% cover 50%, cover 50% cover 100%;
}
.vsg-frame figcaption{
  position:absolute;left:16px;bottom:14px;font-size:13px;font-weight:700;
  letter-spacing:.03em;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.5);
}

@keyframes vsg-focus{
  from{ filter:saturate(.15) blur(3px) brightness(.7); transform:scale(.92) }
  50%{ filter:saturate(1) blur(0) brightness(1); transform:scale(1) }
  to{ filter:saturate(.15) blur(3px) brightness(.7); transform:scale(.92) }
}

@supports not (animation-timeline: view()){
  .vsg-frame{filter:none;animation:none;transform:none}
}`,
  js: `// Every frame's saturation / blur / scale sweep above is entirely driven
// by CSS animation-timeline: view() on that frame's own inline-axis view
// timeline. No JS reads scroll position or intersection state — this
// script only reports feature support for the demo.
const supportsView = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');
console.log('[saturation-gallery] native inline view() timeline supported:', supportsView);
if (!supportsView) {
  document.querySelector('.vsg-hint').textContent = 'Your browser does not yet support animation-timeline: view() — frames are shown at full color as a fallback.';
}`,
  seo: {
    title: 'CSS-Only Saturation Scroll Gallery — animation-timeline: view()',
    description: 'A horizontally scrolling gallery where each frame desaturates and blurs toward the edges and sharpens in the center, driven entirely by native CSS animation-timeline: view() with no JavaScript. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Saturation Scroll Gallery — Native CSS view() Timeline on the Inline Axis',
      description: `Photo apps and editorial sites often use a "focus" effect in a horizontal filmstrip: whichever image is centered in view is shown at full color and sharpness, while images at the edges fade toward grayscale and softness. Traditionally that requires a scroll or intersection listener computing each image's distance from center on every frame. This gallery reproduces the effect with zero JavaScript, using a native CSS view timeline bound to each frame's own horizontal transit through the scroll container.

**view-timeline-axis: inline is the key difference**

Most view-timeline demos — including [View Timeline Image Reveal](/ui-snippets/css-view-timeline-image-reveal/) — use \`view-timeline-axis: block\`, tracking an element's vertical position as the page scrolls down. This gallery instead sets \`view-timeline-axis: inline\` on every \`.vsg-frame\`, so each frame's timeline tracks its own horizontal position as the \`.vsg-track\` container scrolls sideways — the same primitive, just aimed at the axis this layout actually scrolls on.

**A symmetric filter sweep, not a one-way reveal**

The \`vsg-focus\` keyframes are symmetric: \`from\` and \`to\` both apply \`saturate(.15) blur(3px) brightness(.7) scale(.92)\`, while \`50%\` applies full \`saturate(1) blur(0) brightness(1) scale(1)\`. Combined with \`animation-range: cover 0% cover 50%, cover 50% cover 100%\` — two ranges covering the first and second half of the frame's transit — each frame desaturates on the way in, sharpens exactly when centered, then desaturates again on the way out. The effect is continuous and reversible in both scroll directions because it is driven by a live timeline, not a one-shot trigger.

**Why filter and transform, not layout properties**

\`filter\` (saturate, blur, brightness) and \`transform: scale()\` are both compositor-friendly — the browser can animate them without triggering layout recalculation, which matters here because up to seven frames can be mid-animation simultaneously during a fast horizontal scroll. Animating something like \`width\` instead would force expensive layout work on every scroll tick even without a JS listener involved.

**scroll-snap-type is layered on top, not required**

\`.vsg-track\` also declares \`scroll-snap-type: x proximity\`, which gently pulls the scroll position toward each frame's \`scroll-snap-align: center\` when the user stops scrolling near it — this is unrelated to the view-timeline effect and purely a native CSS convenience so the gallery settles on a frame rather than stopping mid-scroll. Removing it does not affect the saturation sweep at all.

**Browser support**

Chromium-based browsers (Chrome, Edge, Opera, Brave) support \`animation-timeline: view()\` on both block and inline axes today. Firefox and Safari support is still landing, so an \`@supports not (animation-timeline: view())\` block removes the filter and transform animation entirely, leaving every frame shown at full color and full size as a safe fallback.

**Customizing it**

Swap the gradient swatches for real \`<img>\` elements with no structural changes, adjust the \`blur(3px)\`/\`saturate(.15)\` edge values for a subtler or more dramatic effect, or change \`view-timeline-axis\` back to \`block\` and stack the frames vertically for a page-scroll version of the same focus effect. Pair it with a [Photo Gallery](/ui-snippets/photo-gallery/) or [Scroll Snap Gallery](/ui-snippets/scroll-snap-gallery/) layout for a real image set.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A horizontally scrolling strip of seven gradient frames renders — no library needed.` },
      { title: 'Scroll the strip left and right', text: `Each frame sharpens to full color only near the horizontal center.` },
      { title: 'Swap in real images', text: `Replace each .vsg-frame's gradient background with an <img> — the timeline logic needs no changes.` },
      { title: 'Adjust the edge intensity', text: `Tune saturate(.15), blur(3px), and brightness(.7) in the from/to keyframe steps.` },
      { title: 'Try the vertical axis instead', text: `Change view-timeline-axis to block and stack frames vertically for a page-scroll version.` },
      { title: 'Export in your format', text: `Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.` },
    ] },
    features: [
      'view-timeline-axis: inline tracks each frame’s horizontal transit, not vertical',
      'Symmetric filter sweep — desaturated at both edges, sharp only near center',
      'Two-range animation-range shapes the in-half and out-half of each transit independently',
      'filter + transform: scale() are both compositor-friendly, no layout thrash',
      'scroll-snap-type: x proximity settles the gallery without fighting the timeline effect',
      'Zero JavaScript scroll or intersection code — the browser drives every frame',
      '@supports fallback shows full-color, full-size frames in unsupported browsers',
      'Drop-in ready for real <img> elements in place of the gradient swatches',
    ],
    useCases: [
      { icon: 'APP', title: 'Photography and portfolio filmstrips', desc: 'A CSS-only focus effect for a [Photo Gallery](/ui-snippets/photo-gallery/) or [Thumbnail Gallery](/ui-snippets/thumbnail-gallery/) horizontal strip.' },
      { icon: 'DESIGN', title: 'Product carousels with a centered hero item', desc: 'Draw attention to whichever product is currently centered without any JS carousel logic.' },
      { icon: 'LEARN', title: 'Learn view-timeline-axis: inline', desc: 'Most view-timeline demos use the block axis; this is a focused example of the inline axis for horizontal layouts.' },
      { icon: 'FLOW', title: 'Editorial and magazine-style image rails', desc: 'Give a horizontal image rail a considered, cinematic feel as readers scroll through it.' },
      { icon: 'CODE', title: 'Replace a JS-computed distance-from-center effect', desc: 'Removes the need for a scroll-listener-based focus calculation for this specific horizontal effect.' },
      { icon: 'CODE', title: 'Related: View Timeline Image Reveal', desc: 'See the [View Timeline Image Reveal](/ui-snippets/css-view-timeline-image-reveal/) for the block-axis version of this per-element view-timeline pattern.' },
    ],
    faqs: [
      { q: 'What does view-timeline-axis: inline actually track?', a: `It makes the element's view timeline follow its position along the inline (horizontal, in left-to-right writing modes) axis of its nearest scrollable ancestor, instead of the default block (vertical) axis. Here that means each frame's 0%-100% progress is defined by its transit across the horizontally scrolling .vsg-track, not by the page's vertical scroll.` },
      { q: 'Why does the animation-range have two comma-separated parts?', a: `cover 0% cover 50% and cover 50% cover 100% split the frame's full horizontal transit into an entering half and an exiting half. The keyframes are written to match — desaturated at from and to, fully saturated at 50% — so the frame reaches full color exactly once, roughly when it is centered, rather than staying saturated across its entire visible window.` },
      { q: 'Why animate filter and transform instead of something like opacity alone?', a: `filter properties (saturate, blur, brightness) and transform: scale() are both handled by the compositor without triggering layout recalculation, which keeps the effect smooth even with several frames mid-animation during a fast horizontal scroll. Layout-affecting properties would be far more expensive to animate at this frequency.` },
      { q: 'Does scroll-snap-type interfere with the saturation effect?', a: `No, they are independent. scroll-snap-type: x proximity only nudges the scroll position toward the nearest frame once the user stops scrolling; the saturation sweep is driven continuously by the live view timeline regardless of whether snapping is enabled or removed.` },
      { q: 'What happens in browsers without inline-axis view() timeline support?', a: `The @supports not (animation-timeline: view()) block removes the animation and resets filter and transform, so every frame renders at full color, full sharpness, and full size — a safe, fully usable fallback rather than frames stuck blurred or desaturated.` },
      { q: 'Can I use real photos instead of gradient swatches?', a: `Yes. Replace each .vsg-frame's background gradient with a nested <img style="width:100%;height:100%;object-fit:cover"> — the view-timeline-name, view-timeline-axis, animation, and animation-range rules all stay on the .vsg-frame element itself and require no changes.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the inline-axis timeline math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how view-timeline-axis: inline changes what a frame's 0%-100% progress represents compared to the default block axis, and why the animation-range is split into two comma-separated halves rather than one continuous range. The same assistant is useful for extending the effect: ask it to make the edge blur intensity vary per frame using individual CSS custom properties, add a subtle rotateY tilt alongside the saturation sweep for extra depth, or convert the gallery to use real <img> elements with object-fit: cover and lazy loading. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a horizontally scrolling image gallery where each frame is desaturated and blurred at the edges of the scroll container and sharpens to full color and full clarity only when centered — using only native CSS scroll-driven animations with per-element view timelines on the inline axis (animation-timeline: view() via view-timeline-name and view-timeline-axis: inline). No JavaScript, no scroll event listeners.

Requirements:
- A horizontally scrollable track containing several frame elements (image or gradient swatch plus a caption), each sized with a fixed flex-basis so multiple frames are visible at once.
- Every frame must declare view-timeline-axis: inline (not the default block) and its own view-timeline-name, then reference that timeline via animation-timeline on a keyframe animation applied to the same element.
- The keyframes must be symmetric: fully desaturated, blurred, dimmed, and slightly scaled down at both the 0% and 100% keyframe steps, and fully saturated, unblurred, and at normal scale and brightness at the 50% keyframe step — so each frame reaches peak clarity once during its transit, roughly when centered in the viewport.
- Use a comma-separated animation-range with two ranges covering the first half and second half of each frame's cover range, so the entering half and exiting half of the transit are shaped independently by the same keyframe animation.
- Only animate compositor-friendly properties (filter functions like saturate/blur/brightness, and transform: scale()) so the effect stays smooth with several frames animating during a fast scroll.
- Add scroll-snap-type: x proximity and scroll-snap-align: center on the track and frames as an optional convenience so the gallery settles near a frame after scrolling, independent of the saturation effect.
- Add an @supports not (animation-timeline: view()) fallback that removes the filter and transform animation entirely, showing every frame at full color and full size in unsupported browsers.
- Keep any JavaScript limited to a CSS.supports('animation-timeline: view()') feature check — it must not drive or trigger the sweep itself.`,
    },
  },
};

export default viewTimelineSaturationGallery;
