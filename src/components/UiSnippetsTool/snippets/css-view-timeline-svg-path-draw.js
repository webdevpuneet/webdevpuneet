const cssViewTimelineSvgPathDraw = {
  id: 'css-view-timeline-svg-path-draw',
  title: 'SVG Path Draw (view-timeline, No GSAP)',
  category: 'scroll',
  html: `<section class="spd-intro"><h1>A Line That Draws Itself</h1><p>Scroll down. The route below draws in stroke-by-stroke purely from native CSS <code>animation-timeline: view()</code> animating <code>stroke-dashoffset</code> — no GSAP, no ScrollTrigger, no JavaScript driving the stroke.</p></section>
<div class="spd-stage">
  <svg class="spd-svg" viewBox="0 0 300 640" fill="none">
    <defs>
      <linearGradient id="spd-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#818cf8"/>
        <stop offset="50%" stop-color="#db2777"/>
        <stop offset="100%" stop-color="#f59e0b"/>
      </linearGradient>
    </defs>
    <path class="spd-track" d="M40 20 C 40 120, 260 120, 260 220 S 40 320, 40 420 S 260 520, 150 620" stroke-width="4" stroke-linecap="round"/>
    <path class="spd-line" d="M40 20 C 40 120, 260 120, 260 220 S 40 320, 40 420 S 260 520, 150 620" stroke-width="4" stroke-linecap="round"/>
    <circle class="spd-dot" cx="0" cy="0" r="7"/>
  </svg>
  <div class="spd-labels">
    <div class="spd-label" style="top:2%">Depart</div>
    <div class="spd-label" style="top:33%">First relay</div>
    <div class="spd-label" style="top:64%">Second relay</div>
    <div class="spd-label" style="top:94%">Arrive</div>
  </div>
</div>
<section class="spd-outro"><p>By now the line above should be fully drawn — timed purely by this SVG's own transit through the viewport.</p></section>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0a12;color:#f1eefb}
.spd-intro,.spd-outro{min-height:55vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;padding:24px;max-width:560px;margin:0 auto}
.spd-intro h1{font-size:clamp(28px,5.5vw,44px);letter-spacing:-.02em}
.spd-intro p,.spd-outro p{color:#a3a0c4;font-size:16px;line-height:1.7}
code{background:rgba(219,39,119,.16);color:#f0abfc;padding:2px 6px;border-radius:5px;font-size:.9em;font-family:ui-monospace,Consolas,monospace}

.spd-stage{position:relative;max-width:480px;margin:0 auto;padding:6vh 24px}
.spd-svg{
  width:100%;height:auto;overflow:visible;
  view-timeline-name:--route-in;
  view-timeline-axis:block;
}
.spd-track{stroke:#1c1830}
.spd-line{
  stroke:url(#spd-grad);
  stroke-dasharray:1400;stroke-dashoffset:1400;
  animation:spd-draw linear both;
  animation-timeline:--route-in;
  animation-range:contain 0% contain 100%;
}
.spd-dot{
  fill:#f0abfc;
  offset-path:path('M40 20 C 40 120, 260 120, 260 220 S 40 320, 40 420 S 260 520, 150 620');
  animation:spd-move linear both;
  animation-timeline:--route-in;
  animation-range:contain 0% contain 100%;
}
@keyframes spd-draw{ to{ stroke-dashoffset:0 } }
@keyframes spd-move{ to{ offset-distance:100% } }

.spd-labels{position:absolute;inset:6vh 24px;pointer-events:none}
.spd-label{position:absolute;left:calc(100% - 200px);font-size:12px;font-weight:700;letter-spacing:.03em;color:#7c7098}

@supports not (animation-timeline: view()){
  .spd-line{stroke-dashoffset:0;animation:none}
  .spd-dot{offset-distance:100%;animation:none}
}`,
  js: `// The draw itself is entirely CSS: animation-timeline: view() drives
// stroke-dashoffset on the path AND an offset-path-driven dot along the
// same route, with zero JS scroll handling and no ScrollTrigger. This
// script only reports feature support for the demo readout.
const supportsView = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');
console.log('[view-timeline-svg-path-draw] native view() timeline supported:', supportsView);
if (!supportsView) {
  console.log('[view-timeline-svg-path-draw] falling back to a fully drawn, static line.');
}`,
  seo: {
    title: 'Scroll-Linked SVG Path Draw — Native CSS view-timeline, No GSAP',
    description: 'An SVG route line that draws itself in as you scroll, using native CSS animation-timeline: view() to animate stroke-dashoffset — no GSAP, no ScrollTrigger, no JS scroll math. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Scroll-Linked SVG Path Draw — animation-timeline: view() Instead of GSAP ScrollTrigger',
      description: `The scroll-linked "line draws itself in" effect — an SVG stroke that appears to trace its own path as the reader scrolls past it — is one of the most recognizable scroll animations on the web, almost always built with GSAP's \`DrawSVGPlugin\` and \`ScrollTrigger\` (see [Scroll SVG Path Draw](/ui-snippets/scroll-svg-path-draw/) for that approach). This snippet reproduces the identical stroke-drawing mechanic using nothing but native CSS: a \`view-timeline\` binding \`stroke-dashoffset\` directly to the SVG's own scroll position, with no animation library and no JavaScript computing scroll progress.

**The classic stroke-dasharray trick, now scroll-timed by CSS**

\`stroke-dasharray\` is set to a value at least as long as the path itself (\`1400\`, comfortably longer than this particular route), and \`stroke-dashoffset\` starts at that same value, which hides the entire stroke behind an equally long gap. Animating \`stroke-dashoffset\` down to \`0\` reveals the stroke progressively from start to end — this half of the trick is identical to the GSAP version. What's different is what drives the animation's progress: instead of \`ScrollTrigger\`'s \`scrub\` option computing a 0–1 value from scroll position on every frame, \`animation-timeline: --route-in\` — a named view timeline declared on the \`<svg>\` element itself — supplies that progress value natively.

**A second element riding the exact same timeline**

A small dot uses CSS \`offset-path\` (set to the identical path data) combined with \`offset-distance\` animated from \`0%\` to \`100%\`, bound to the same \`--route-in\` timeline via \`animation-range: contain 0% contain 100%\`. Because both the stroke draw and the dot's movement reference the same named timeline and the same range, they stay perfectly in sync with no manual coordination — both are simply reading the same scroll-derived progress value.

**contain instead of cover, and why it matters for a tall SVG**

\`animation-range: contain 0% contain 100%\` uses the \`contain\` keyword so the draw only progresses while the entire SVG is contained within the viewport — for an SVG taller than the viewport, this differs meaningfully from \`cover\`, which would start progress the instant the top edge appears even while most of the graphic is still off-screen below. \`contain\` here effectively requires the SVG to fit inside the viewport at all, which works well for a graphic sized to roughly viewport height, as this one is; a route taller than the viewport would need a \`cover\`-based range or a different sizing approach instead.

**Comparing to the GSAP version**

The [GSAP Scroll SVG Path Draw](/ui-snippets/scroll-svg-path-draw/) snippet gives finer control — precise scrub smoothing, pinning, easing curves, and cross-browser consistency today, at the cost of a ~40KB dependency and a JS runtime cost per scroll frame. This CSS-only version has zero dependency weight and runs entirely on the compositor, at the cost of narrower browser support today and less granular control over easing along the path.

**Browser support**

Chromium-based browsers (Chrome, Edge, Opera, Brave) support \`animation-timeline: view()\` today. Firefox and Safari support is still landing, so an \`@supports not (animation-timeline: view())\` block resets the stroke and dot to their fully-drawn end states rather than leaving the line invisible.

**Customizing it**

Swap the path's \`d\` attribute for your own route or logo outline (recompute \`stroke-dasharray\` to comfortably exceed the new path's length), adjust the gradient stops in \`<linearGradient id="spd-grad">\`, or change \`view-timeline-axis\` to \`inline\` for a horizontally-scrolling version of the same draw. Pair it with a [Scroll Company Timeline](/ui-snippets/scroll-company-timeline/) or [Vertical Timeline](/ui-snippets/vertical-timeline/) for a journey-style narrative.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `An intro, the route SVG, and an outro render — no CDN or library needed.` },
      { title: 'Scroll down slowly', text: `Watch the gradient stroke draw itself in and the dot travel along the same path.` },
      { title: 'Scroll back up', text: `The stroke and dot retract in reverse, since both are bound to a live view timeline.` },
      { title: 'Swap in your own route', text: `Replace the path d attribute on .spd-track, .spd-line, and offset-path with your own SVG path data.` },
      { title: 'Recompute stroke-dasharray', text: `Set stroke-dasharray to a value at least as long as your new path's total length so it fully hides at the start.` },
      { title: 'Export in your format', text: `Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.` },
    ] },
    features: [
      'Classic stroke-dasharray / stroke-dashoffset draw, timed by native animation-timeline: view()',
      'A second dot element rides the exact same named timeline via offset-path + offset-distance',
      'No GSAP, no ScrollTrigger, no scrub configuration — zero animation library dependency',
      'contain-based animation-range ties progress to the SVG genuinely being in view',
      'Gradient stroke via a standard SVG <linearGradient>',
      'Bidirectional — the line retracts correctly when scrolling back up',
      '@supports fallback shows the fully-drawn line and dot rather than an invisible stroke',
      'Runs entirely on the compositor — no per-frame JavaScript cost',
    ],
    useCases: [
      { icon: 'APP', title: 'Journey, route, and process visualizations', desc: 'A CSS-only alternative to the [Scroll SVG Path Draw](/ui-snippets/scroll-svg-path-draw/) GSAP snippet for the same drawing effect.' },
      { icon: 'DESIGN', title: 'Brand logo reveal animations', desc: 'Trace a logo outline in as it scrolls into view without adding an animation library dependency.' },
      { icon: 'LEARN', title: 'Learn view-timeline on non-block elements', desc: 'A demo of applying a named view timeline to an <svg> element and syncing a second element to the same timeline.' },
      { icon: 'FLOW', title: 'Company history and roadmap pages', desc: 'Pair with [Scroll Company Timeline](/ui-snippets/scroll-company-timeline/) for a connecting line between milestones.' },
      { icon: 'CODE', title: 'Replace a GSAP DrawSVGPlugin dependency', desc: 'Removes the need for GSAP purely for this specific scroll-linked stroke-drawing effect.' },
      { icon: 'CODE', title: 'Related: Scroll SVG Path Draw', desc: 'See the [Scroll SVG Path Draw](/ui-snippets/scroll-svg-path-draw/) for the GSAP ScrollTrigger version with finer scrub control.' },
      { icon: 'CODE', title: 'Related: Count-Up Stats on Scroll (IntersectionObserver)', desc: 'See the [Count-Up Stats on Scroll (IntersectionObserver)](/ui-snippets/scroll-reveal-counter-stats/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the line draw itself without any JavaScript?', a: `stroke-dasharray is set to a value at least as long as the path, and stroke-dashoffset starts at that same value, hiding the stroke entirely. A @keyframes animation drives stroke-dashoffset down to 0, and binding that animation to animation-timeline: --route-in (a named view timeline declared on the SVG element) ties its progress directly to the SVG's own scroll-driven visibility instead of to a duration in seconds.` },
      { q: 'How does the dot stay synced with the drawn line?', a: `The dot uses offset-path set to the identical path data as the line, with offset-distance animated from 0% to 100%. Because that animation references the exact same --route-in named timeline and the same animation-range as the stroke-draw animation, both progress together automatically — there is no manual synchronization logic.` },
      { q: 'Why use the contain keyword in animation-range instead of cover?', a: `contain restricts progress to the window during which the entire SVG element is contained within the viewport at once, rather than starting as soon as any part becomes visible (which is what cover does). For an SVG sized to fit within the viewport, this keeps the draw progress tied to the graphic genuinely being on screen rather than starting prematurely while most of it is still off-screen.` },
      { q: 'How is this different from the GSAP ScrollTrigger version in this library?', a: `The GSAP version (Scroll SVG Path Draw) offers finer scrub smoothing, pinning options, custom easing curves, and works consistently across all current browsers today, at the cost of a JavaScript dependency and per-frame script execution. This CSS-only version has zero dependency weight and runs on the compositor, at the cost of currently narrower browser support and less granular control over the draw's easing.` },
      { q: 'What happens in browsers without animation-timeline: view() support?', a: `The @supports not (animation-timeline: view()) block sets stroke-dashoffset to 0 and offset-distance to 100%, so Firefox and Safari users see the fully drawn line and the dot already at the end of the path — a stable, complete state rather than an invisible stroke or a dot stuck at the origin.` },
      { q: 'Can I use my own SVG path or logo outline?', a: `Yes. Replace the d attribute on .spd-track, .spd-line, and the offset-path value on .spd-dot with your own path data (all three should describe the same path), and update stroke-dasharray to a number comfortably larger than your new path's total length so it fully hides the stroke at the start.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the stroke-dasharray or offset-path math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why stroke-dasharray must be set to a value at least as long as the path's total length, how animation-timeline: --route-in ties the stroke-dashoffset progress to the SVG's own scroll position, and why the dot's offset-path animation stays in sync with the stroke draw purely by referencing the same named timeline and range. The same assistant is useful for extending the effect: ask it to add a pulsing glow to the dot as it travels, make the gradient's colors shift along the path length rather than staying fixed, or convert the effect to view-timeline-axis: inline for a horizontally scrolling route. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an SVG line-drawing effect where a stroked path draws itself in as the reader scrolls past it, using only native CSS scroll-driven animations with a view timeline bound to the SVG element — no GSAP, no ScrollTrigger, no JavaScript scroll math.

Requirements:
- An SVG containing a path drawn with a visible stroke and a gradient defined via a native <linearGradient>, plus a small circular dot element that will travel along the same path.
- The <svg> element itself must declare view-timeline-name and view-timeline-axis: block, creating a named view timeline representing the SVG's own transit through the viewport.
- The path must use the classic stroke-dasharray / stroke-dashoffset technique: stroke-dasharray set to a value at least as long as the path's total length, stroke-dashoffset starting at that same value, and a @keyframes animation driving stroke-dashoffset to 0, bound via animation-timeline to the SVG's named view timeline.
- The dot must use offset-path (set to the identical path data as the stroked path) combined with a @keyframes animation driving offset-distance from 0% to 100%, bound to the exact same named view timeline and the same animation-range as the stroke-draw animation, so the dot's position and the stroke's progress stay in sync automatically with no manual coordination logic.
- Use the contain keyword in animation-range (for example contain 0% contain 100%) so progress is tied to the whole SVG genuinely being within the viewport, appropriate for a graphic sized to roughly fit the viewport height.
- Add an @supports not (animation-timeline: view()) fallback that sets stroke-dashoffset to 0 and offset-distance to 100%, so unsupported browsers show the fully drawn line and the dot at the path's end rather than an invisible stroke or a dot stuck at the origin.
- Keep any JavaScript limited to a CSS.supports('animation-timeline: view()') feature check logged to the console — it must never drive the draw or the dot's movement itself.`,
    },
  },
};

export default cssViewTimelineSvgPathDraw;
