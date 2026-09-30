const scrollTimelineExplainer = {
  id: 'scroll-timeline-explainer',
  title: 'CSS Scroll-Driven Animations (animation-timeline) Explainer',
  lastmod: '2026-08-08',
  category: 'scroll',
  html: `<div class="wrap">
  <div class="panel">
    <p class="panel-title">Scroll the box below &darr;</p>
    <p class="panel-sub">The progress bar, reveal image, and scale card all animate purely from CSS <code>animation-timeline: scroll()</code> and <code>view()</code> &mdash; zero scroll event listeners in JavaScript.</p>

    <div class="scroller" id="scroller">
      <div class="progress-track">
        <div class="progress-bar" id="progress-bar"></div>
      </div>

      <div class="scroll-inner">
        <div class="reveal-card">
          <div class="reveal-fill"></div>
          <p class="reveal-label">opacity + translateY reveal</p>
        </div>

        <div class="scale-card">
          <p class="scale-label">scale() on scroll</p>
        </div>

        <div class="spacer-block">Keep scrolling&hellip;</div>

        <div class="rotate-card">
          <p class="rotate-label">rotate() on scroll</p>
        </div>

        <div class="end-block">You reached the end of the scroll timeline.</div>
      </div>
    </div>
  </div>

  <div class="support-note" id="support-note"></div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.wrap { max-width: 640px; margin: 0 auto; padding: 40px 20px; display: flex; flex-direction: column; gap: 20px; }

.panel {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  padding: 24px; box-shadow: 0 8px 24px rgba(15,23,42,0.06);
}
.panel-title { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
.panel-sub { font-size: 12.5px; color: #64748b; line-height: 1.6; margin-bottom: 18px; }
.panel-sub code { background: #f1f5f9; padding: 1px 5px; border-radius: 4px; font-size: 11.5px; color: #6366f1; }

/* Progress bar driven purely by a CSS scroll() timeline, no JS */
.progress-track {
  height: 6px; border-radius: 4px; background: #e2e8f0;
  margin-bottom: 12px; overflow: hidden;
}
.progress-bar {
  height: 100%; width: 100%;
  background: #6366f1;
  transform-origin: left;
  transform: scaleX(0);
  animation: grow-progress linear;
  animation-timeline: scroll(nearest);
}
@keyframes grow-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* The internal scrollable container -- this element is the scroll source */
.scroller {
  height: 260px; overflow-y: auto;
  border: 1.5px dashed #c7d2fe;
  border-radius: 12px;
  padding: 0 16px;
}

.scroll-inner { display: flex; flex-direction: column; gap: 18px; padding: 20px 0 60px; }

/* Reveal card: fades and slides in as it enters the scroller's viewport, using a view() timeline */
.reveal-card {
  position: relative;
  height: 100px; border-radius: 12px; overflow: hidden;
  background: #ede9fe;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transform: translateY(24px);
  animation: reveal-in linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}
.reveal-fill { position: absolute; inset: 0; background: linear-gradient(135deg, #c7d2fe, #a5b4fc); }
.reveal-label { position: relative; font-size: 13px; font-weight: 700; color: #4338ca; }
@keyframes reveal-in {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.scale-card {
  height: 90px; border-radius: 12px; background: #0f172a;
  display: flex; align-items: center; justify-content: center;
  animation: scale-pop linear;
  animation-timeline: view();
  animation-range: cover 10% cover 50%;
}
.scale-label { color: #f1f5f9; font-size: 13px; font-weight: 700; }
@keyframes scale-pop {
  from { transform: scale(0.85); opacity: 0.4; }
  to   { transform: scale(1); opacity: 1; }
}

.spacer-block {
  height: 70px; display: flex; align-items: center; justify-content: center;
  color: #94a3b8; font-size: 12.5px; font-style: italic;
}

.rotate-card {
  height: 90px; border-radius: 12px; background: #ecfdf5; border: 1px solid #a7f3d0;
  display: flex; align-items: center; justify-content: center;
  animation: rotate-in linear;
  animation-timeline: view();
  animation-range: entry 0% cover 50%;
}
.rotate-label { font-size: 13px; font-weight: 700; color: #059669; }
@keyframes rotate-in {
  from { transform: rotate(-6deg) scale(0.9); opacity: 0; }
  to   { transform: rotate(0deg) scale(1); opacity: 1; }
}

.end-block {
  height: 50px; display: flex; align-items: center; justify-content: center;
  color: #cbd5e1; font-size: 12px;
}

.support-note {
  background: #fffbeb; border: 1px solid #fde68a; color: #92400e;
  font-size: 12.5px; line-height: 1.6; border-radius: 10px; padding: 12px 16px;
}
.support-note strong { color: #78350f; }

/* Fallback for browsers without scroll-driven animation support */
@supports not (animation-timeline: scroll()) {
  .progress-bar { transform: scaleX(1); animation: none; }
  .reveal-card, .scale-card, .rotate-card { opacity: 1; transform: none; animation: none; }
}`,

  js: `const supportNote = document.getElementById('support-note');

function checkSupport() {
  const supportsScroll = CSS && CSS.supports && CSS.supports('animation-timeline', 'scroll()');
  const supportsView = CSS && CSS.supports && CSS.supports('animation-timeline', 'view()');

  if (supportsScroll && supportsView) {
    supportNote.innerHTML = '<strong>Native scroll-driven animations active:</strong> every effect below (progress bar, reveals, scale, rotate) runs from animation-timeline: scroll()/view() with zero JavaScript scroll listeners.';
  } else {
    supportNote.innerHTML = '<strong>Fallback active:</strong> this browser does not support animation-timeline yet, so the @supports not (...) block in the CSS disables the animations and shows every element in its final, fully-revealed state instead.';
  }
}

checkSupport();

// Note: nothing in this file listens to the "scroll" event. The progress bar
// and card reveal effects are driven entirely by the browser's own scroll
// timeline implementation via CSS animation-timeline: scroll() and view() --
// this script only detects and reports feature support, it never reads
// scrollTop or attaches a scroll listener.`,

  seo: {
    title: 'CSS Scroll-Driven Animations: animation-timeline Explained',
    description: 'Native scroll-linked progress bars using animation-timeline: scroll() — no scroll listeners. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'CSS Scroll-Driven Animations — animation-timeline: scroll() and view() Without a Single Scroll Listener',
      description: `Scroll-linked effects — a progress bar that fills as you scroll, an image that fades in when it enters the viewport, a parallax card that scales as it passes through view — have almost always been built the same way: attach a \`scroll\` event listener, read \`window.scrollY\` or \`element.getBoundingClientRect()\` on every fired event, compute a percentage, and write the result into an inline style or CSS custom property, typically wrapped in \`requestAnimationFrame\` to avoid layout thrashing. The CSS Scroll-Driven Animations spec replaces that entire pipeline with two new native timeline types, \`scroll()\` and \`view()\`, that plug directly into the standard CSS \`animation\` property — no JavaScript execution on scroll at all.

**\`animation-timeline: scroll()\` — progress through a scroller**

By default, a CSS \`animation\`'s progress is driven by time — 0% at \`animation-duration: 0s\`, 100% at the end. Setting \`animation-timeline: scroll()\` instead ties that same 0%-to-100% progress to how far a scrollable ancestor has been scrolled. The progress bar in this demo uses \`animation-timeline: scroll(nearest)\`, which tells the browser "find the nearest scrollable ancestor and use its scroll position as the timeline" — in this case, the dashed-border \`.scroller\` box. The \`@keyframes grow-progress\` rule animates \`transform: scaleX(0)\` to \`scaleX(1)\`, and instead of running over a fixed duration, the browser now maps that keyframe range directly onto 0%-100% of the scroller's scroll distance. Note \`animation-duration\` becomes irrelevant for a scroll-timeline-driven animation; only the keyframe percentages matter.

**\`animation-timeline: view()\` — progress through the viewport**

The reveal, scale, and rotate cards use the second timeline type, \`view()\`, which is subtly different: instead of tracking scroll distance through a container, it tracks how far the *animating element itself* has travelled through its nearest scrollable ancestor's visible area — effectively "is this element entering, centered in, or leaving the visible viewport of its scroller." This is the exact mechanism most scroll-reveal libraries (AOS, ScrollReveal, GSAP ScrollTrigger) reimplement in JavaScript, now available natively.

**\`animation-range\` — controlling exactly when the animation plays**

Pairing a \`view()\` timeline with \`animation-range\` lets you scope the 0%-100% animation progress to a specific portion of the element's transit through the viewport. This demo's reveal card uses \`animation-range: entry 0% cover 40%\`, meaning the keyframes play out entirely during the element's "entry" phase (from first becoming visible to being 40% scrolled past) — so it finishes revealing well before it reaches the vertical center, rather than animating the whole time it's on screen. The named range keywords are \`entry\`, \`contain\`, \`exit\`, \`cover\`, and \`entry-crossing\`/\`exit-crossing\`, each describing a different phase of the element's relationship to the scrollport.

**Named scroll-timelines vs the anonymous shorthand**

This demo uses the anonymous \`scroll()\`/\`view()\` function form for simplicity, but the spec also supports explicitly named timelines: declaring \`scroll-timeline-name: --my-timeline\` on the scroller and referencing \`animation-timeline: --my-timeline\` on a *different* element anywhere in the DOM (not just a descendant), which is useful when the element you want to animate isn't nested inside the scroller itself.

**Browser support and the \`@supports\` fallback**

\`animation-timeline\` shipped in Chromium-based browsers (Chrome/Edge 115+) first, with Safari and Firefox support arriving later — as of early 2026 it's usable in production behind a feature-detection fallback. This demo wraps a fallback in \`@supports not (animation-timeline: scroll())\`, which sets all animated elements to their final, fully-visible resting state (\`opacity: 1\`, \`transform: none\`, \`animation: none\`) so unsupported browsers see a clean static layout instead of permanently-hidden or half-animated content — this is the single most important detail to get right when shipping scroll-driven CSS today, since without it, elements would stay at their \`from\` keyframe state (often invisible) forever in a non-supporting browser.

**Why this matters for 2025/2026 UI work**

Because the browser owns the timeline calculation, scroll-driven CSS animations run off the main thread and stay perfectly smooth even during heavy JavaScript execution elsewhere on the page — a category of jank that plagued nearly every JS-based scroll-reveal implementation. It also means one less runtime dependency, one less bundle-size cost, and no risk of a scroll listener firing after its element has already been removed from the DOM.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll the dashed box', text: `Scroll inside the .scroller container (not the page itself — this uses an internal overflow: auto box). As you scroll, the thin indigo progress bar above it grows from 0 to full width purely via animation-timeline: scroll(nearest) with no JavaScript reading the scroll position.` },
        { title: 'Watch the reveal card animate in', text: `The purple "opacity + translateY reveal" card starts invisible and slides up into place as it enters the scroller's visible area. It uses animation-timeline: view() combined with animation-range: entry 0% cover 40%, so the reveal completes early in its transit rather than animating the whole time it's visible.` },
        { title: 'Compare the scale and rotate cards', text: `The dark "scale() on scroll" card and the green "rotate() on scroll" card each use view() with a different animation-range, showing how the same timeline type can be scoped to different phases of an element's scroll transit to produce distinctly timed effects.` },
        { title: 'Check the live support banner', text: `The amber panel below the demo runs CSS.supports("animation-timeline", "scroll()") and CSS.supports("animation-timeline", "view()") in JavaScript and reports whether your current browser is actually running the native scroll-driven animations or falling back to the static @supports not (...) CSS block.` },
        { title: 'Open devtools to inspect the timeline properties', text: `Select the .progress-bar or .reveal-card element in your browser's devtools and look at the Animations panel (Chrome DevTools has dedicated scroll-timeline visualization) to see the live progress value update in real time as you scroll, without a single console.log needed.` },
        { title: 'Apply the pattern to your own scroll effects', text: `Add animation-timeline: scroll() to any element inside an overflow: auto container for a progress-style effect, or animation-timeline: view() plus animation-range for a reveal-style effect on elements inside a normal page scroll — always pair it with an @supports not (animation-timeline: scroll()) fallback block so the animation's "from" state doesn't get stuck permanently in unsupported browsers.` },
      ],
    },
    features: [
      `animation-timeline: scroll(nearest) ties a standard CSS @keyframes animation's progress to scroll distance, no JS listener`,
      `animation-timeline: view() ties progress to an element's transit through its scroller's visible viewport`,
      'animation-range: entry/cover/exit values scope exactly which phase of the scroll transit the keyframes play across',
      'transform: scaleX() progress bar demonstrates a classic scroll-progress-indicator pattern with zero JavaScript math',
      'CSS.supports("animation-timeline", "scroll()") used in JS purely to report feature-detection status to the viewer',
      `@supports not (animation-timeline: scroll()) fallback block prevents elements getting stuck in their invisible "from" state`,
      'Internal overflow: auto scroller demonstrates scroll-timeline sourced from a nested container, not the page itself',
      'Zero requestAnimationFrame or scroll event listeners anywhere in the JavaScript — animation runs entirely on the CSS/compositor side',
    ],
    useCases: [
      { icon: 'FLOW', title: 'Reading-progress bars for articles and long-form content', desc: `A thin progress bar pinned to the top of an article that fills as the reader scrolls is one of the most common scroll-linked UI patterns. animation-timeline: scroll() replaces the usual scroll-event-plus-requestAnimationFrame implementation with a single CSS animation, and keeps working smoothly even if the page has other heavy JavaScript running.` },
      { icon: 'DESIGN', title: 'Scroll-reveal effects for marketing and landing pages', desc: `Fade-and-slide-in reveals as sections scroll into view are a landing-page staple, traditionally implemented with libraries like AOS or GSAP ScrollTrigger. animation-timeline: view() with animation-range reproduces the same effect natively, removing a dependency and its associated bundle-size and main-thread cost.` },
      { icon: 'APP', title: 'Image galleries and card carousels with scroll-linked scale/rotate', desc: `Product image galleries or feature carousels that scale, rotate, or fade cards as they scroll past center benefit from view()'s built-in awareness of an element's position relative to the scrollport, avoiding the getBoundingClientRect() calculations a JS implementation would otherwise need on every scroll frame.` },
      { icon: 'CODE', title: 'Replacing JS scroll-linked animation libraries for simple effects', desc: `For straightforward progress bars and single-element reveals, native animation-timeline removes the need for a scroll-animation library entirely. More complex choreography (pinning, scrubbing multiple elements against one master timeline) may still benefit from a library like GSAP ScrollTrigger, but simple cases are now a pure-CSS solve — worth pairing with the [CSS Trig Functions Lab](/ui-snippets/css-trig-functions-lab) as another example of CSS absorbing what used to require JavaScript math.` },
      { icon: 'LEARN', title: 'Teaching the CSS Scroll-Driven Animations spec and its fallback strategy', desc: `This explainer is a clear, hands-on way to teach both halves of shipping this feature responsibly: the animation-timeline/animation-range syntax itself, and the equally important @supports not (...) fallback pattern needed so unsupported browsers don't show permanently-hidden content stuck at a keyframe's "from" state.` },
      { icon: 'APP', title: 'Dashboard section indicators and scroll-synced navigation highlighting', desc: `Internal dashboard panels with scrollable content sections can use a scroll() timeline on a progress indicator to show users how far through a long settings or report panel they've scrolled, without wiring a scroll listener into a dashboard's already-complex state management.` },
      { icon: 'CODE', title: 'Related: Three.js Scroll Moon Phases Cycle', desc: 'See the [Three.js Scroll Moon Phases Cycle](/ui-snippets/three-scroll-moon-phases/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the difference between animation-timeline: scroll() and view()?', a: `scroll() ties an animation's 0%-100% progress to how far a scrollable container has been scrolled overall — it answers "how far through this scroller are we." view() instead ties progress to how far the specific animating element has travelled through its scroller's visible area — it answers "how far has this particular element travelled through the viewport," which is what you want for per-element reveal effects rather than a single global progress bar.` },
      { q: 'Do I still need JavaScript for scroll-driven animations at all?', a: `For the animation mechanics themselves, no — animation-timeline: scroll()/view() combined with standard @keyframes and animation-range handles the entire effect in CSS. This demo's only JavaScript is a small feature-detection check using CSS.supports() purely to display a support-status message to the viewer; it never listens to the scroll event or drives any visual change itself.` },
      { q: 'What happens in browsers that don\'t support animation-timeline yet?', a: `Without a fallback, an element whose animation's "from" keyframe is invisible (opacity: 0) would stay invisible forever in an unsupported browser, since the timeline that's meant to drive it never advances. This demo guards against that with @supports not (animation-timeline: scroll()) { ... }, which explicitly resets every animated element to its natural, fully-visible final state and disables the animation property entirely when the feature isn't supported.` },
      { q: 'What do the animation-range keywords like entry, cover, and exit mean?', a: `These keywords describe named phases of an element's transit through the scrollport when using a view() timeline: entry is while the element is first scrolling into view, contain is while it's fully contained within the scrollport, exit is while it's scrolling out, and cover spans the element's entire visible duration from first pixel visible to last pixel visible. Combining a keyword with a percentage, like entry 0% cover 40% used in this demo's reveal card, scopes the animation's 0%-100% progress to exactly that sub-range of the full transit.` },
      { q: 'Can animation-timeline drive an animation on an element outside the scroller it measures?', a: `Yes, using named timelines: declare scroll-timeline-name: --my-timeline (or view-timeline-name: --my-timeline) on the scrolling container, then reference animation-timeline: --my-timeline on any other element in the document, even one that isn't a descendant of the scroller. This demo uses the simpler anonymous scroll()/view() function form instead, which implicitly targets the nearest ancestor scroller and only works for elements inside it.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how animation-range: entry 0% cover 40% maps onto the .reveal-card's transit through the scroller, and why that produces a different timing than the .scale-card's cover 10% cover 50% range — walking through both side by side makes the range syntax click much faster than reading the spec alone. It's also worth asking the assistant to add a named scroll-timeline example (scroll-timeline-name plus a separate animation-timeline reference) to show the alternative to the anonymous scroll()/view() functions used throughout this demo. You could also ask it to explain precisely why the @supports not (animation-timeline: scroll()) fallback block is necessary — specifically what would visually happen to the reveal card in an unsupported browser if that block were deleted.`,
      prompt: `Build an educational explainer of native CSS scroll-driven animations (animation-timeline: scroll() and view()) in plain HTML, CSS, and JavaScript.

Requirements:
- A self-contained scrollable box (overflow-y: auto on an internal container, not the page body) containing several stacked cards with generous vertical spacing so each one requires actual scrolling to reach.
- A thin progress bar above the scrollable box whose fill width animates from 0% to 100% using animation-timeline: scroll(nearest) tied to that internal scroller, implemented as a standard @keyframes animation transitioning a transform: scaleX() value, with animation-duration left irrelevant since the scroll timeline governs progress instead.
- At least two or three cards inside the scroller that each animate into view using animation-timeline: view(), each with a distinct animation-range (for example entry 0% cover 40% versus cover 10% cover 50%) so the demo visibly shows how animation-range changes when an effect plays relative to the element's transit through the visible area.
- Each scroll-driven card should animate a different visual property for variety: one an opacity+translateY reveal, one a scale() pop, one a rotate()+scale() combination.
- A mandatory @supports not (animation-timeline: scroll()) fallback block in the CSS that resets every scroll-driven element to its final, fully-visible resting state (opacity 1, no transform, animation: none) so the demo degrades gracefully instead of leaving elements stuck invisible in unsupported browsers.
- A small JavaScript feature-detection check using CSS.supports('animation-timeline', 'scroll()') and CSS.supports('animation-timeline', 'view()') that displays which timeline types the current browser actually supports — this must be the ONLY JavaScript in the demo; there must be no scroll event listener, no requestAnimationFrame loop, and no manual reading of scrollTop anywhere.
- Clear code comments explicitly noting that no scroll listener exists and that all animation timing is delegated to the browser's native scroll-timeline implementation.`,
    },
  },
};

export default scrollTimelineExplainer;
