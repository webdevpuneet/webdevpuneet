const scrollFadeStack = {
  id: 'scroll-fade-stack',
  title: 'Scroll Fade Stack',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="fs-top"><p>Scroll ↓</p></section>
<section class="fs-pin" id="fsPin">
  <div class="fs-frame">
    <div class="fs-slide is-on"><span class="fs-k">01</span><h2>Capture everything</h2><p>One lightweight SDK collects events from web, mobile, and server.</p></div>
    <div class="fs-slide"><span class="fs-k">02</span><h2>Understand instantly</h2><p>Streams become live metrics with sub-second latency.</p></div>
    <div class="fs-slide"><span class="fs-k">03</span><h2>Act automatically</h2><p>Thresholds fire alerts and trigger your workflows.</p></div>
    <div class="fs-slide"><span class="fs-k">04</span><h2>Share the story</h2><p>Publish dashboards your whole company can read.</p></div>
  </div>
  <div class="fs-progress" id="fsProgress"></div>
</section>
<section class="fs-bottom"><p>Slides crossfaded in one pinned frame.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b12;color:#fff}
.fs-top,.fs-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.fs-pin{position:relative;height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.fs-frame{position:relative;width:min(680px,92vw);height:340px}
.fs-slide{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:14px;text-align:center;opacity:0;will-change:opacity,transform}
.fs-slide.is-on{opacity:1}
.fs-k{font-size:14px;font-weight:800;letter-spacing:.24em;color:#7c8cff}
.fs-slide h2{font-size:clamp(30px,6vw,62px);letter-spacing:-.02em;line-height:1.05}
.fs-slide p{color:#aab0c6;font-size:clamp(15px,2.4vw,21px);max-width:520px;margin:0 auto;line-height:1.5}
.fs-progress{position:absolute;left:0;bottom:0;height:4px;width:0;background:linear-gradient(90deg,#6366f1,#22d3ee)}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var slides = gsap.utils.toArray('.fs-slide');
var progress = document.getElementById('fsProgress');
var current = 0;

function go(i) {
  if (i === current) return;
  var dir = i > current ? 1 : -1;
  // Crossfade: outgoing slides up/down, incoming arrives from the opposite side.
  gsap.to(slides[current], { opacity: 0, y: -22 * dir, duration: 0.45, overwrite: true });
  gsap.fromTo(slides[i], { opacity: 0, y: 22 * dir }, { opacity: 1, y: 0, duration: 0.45, overwrite: true });
  current = i;
}

ScrollTrigger.create({
  trigger: '#fsPin',
  start: 'top top',
  end: '+=' + (slides.length * 100) + '%',
  pin: true,
  scrub: true,
  onUpdate: function (self) {
    var i = Math.min(slides.length - 1, Math.floor(self.progress * slides.length));
    go(i);
    progress.style.width = (self.progress * 100) + '%';
  }
});`,

  seo: {
    title: 'Scroll Fade Stack — Free GSAP ScrollTrigger Crossfade Slides',
    description: `A pinned frame whose slides crossfade as you scroll, with directional motion and a progress bar, via GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Fade Stack — Crossfading Slides in a Pinned Frame',
      description: `Scroll fade stack is the effect where a single fixed frame holds a series of messages and crossfades from one to the next as you scroll, with each slide drifting in the direction you're moving — a clean, focused way to present a sequence without a horizontal rail or card stack. This snippet builds it with GSAP and ScrollTrigger (from a CDN), plus plain HTML and CSS.

**One frame, stacked slides**

All slides are absolutely positioned in the same frame, stacked on top of each other, with only the active one at \`opacity: 1\`. Because they share the exact position, switching between them is a pure crossfade — there's no layout shift, and the headline stays anchored in the center of the screen the whole time. The frame is a fixed size so the pinned section never jumps as content changes.

**Scroll progress drives the index**

A pinned ScrollTrigger runs for one screen per slide (\`end: '+=400%'\` for four), and its \`onUpdate\` floors \`self.progress × slideCount\` to pick the active slide. So scrolling through the pinned section steps cleanly from slide to slide, and a progress bar at the bottom fills with the continuous \`progress\` value — the same dual continuous/discrete reading used by step sliders.

**Directional crossfade**

The \`go(i)\` function isn't a plain opacity swap: it checks whether you're moving forward or backward and animates the outgoing slide out in that direction while the incoming slide arrives from the opposite side (a small \`y\` offset). This directional motion communicates which way you're navigating — scroll down and slides rise; scroll up and they fall — so the sequence feels coherent rather than a random dissolve.

**Guarded against thrash**

\`onUpdate\` fires every frame, so \`go\` returns early when the index hasn't changed, and every tween uses \`overwrite: true\` so a fast scroll that skips a slide cancels any in-flight fade and lands cleanly on the current one. Without these guards, quick scrolling would stack half-finished opacity tweens and flicker.

**Composited and smooth**

The crossfades animate only \`opacity\` and a tiny \`y\` transform, both GPU-friendly, with \`will-change\` hints. The pin is the only structural change, and it's handled by ScrollTrigger, so the effect stays smooth and fully reversible — scroll back up and the slides crossfade in reverse.

**Customizing it**

Add slides (bump the \`end\` accordingly), change the drift distance or fade duration, swap text for media, or add a snap so the scroll settles on whole slides. Pair it with [scroll pin steps](/ui-snippets/scroll-pin-steps/), a [scroll sticky stack](/ui-snippets/scroll-sticky-stack/), or a [testimonial slider](/ui-snippets/testimonial-slider/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A pinned frame shows the first slide.` },
      { title: 'Scroll down', text: `Slides crossfade upward one to the next.` },
      { title: 'Watch the bar', text: `A progress bar fills across the section.` },
      { title: 'Scroll back up', text: `Slides crossfade downward in reverse.` },
      { title: 'Add a slide', text: `Add a .fs-slide and extend the end value.` },
    ] },
    features: [
      { title: 'Stacked slides', text: `All share one frame for pure crossfade.` },
      { title: 'Progress-to-index', text: `floor(progress × count) picks the slide.` },
      { title: 'Directional motion', text: `Slides drift the way you scroll.` },
      { title: 'Progress bar', text: `Continuous fill tracks position.` },
      { title: 'Change-guarded', text: `Skips redundant per-frame swaps.` },
      { title: 'Overwrite-safe', text: `Fast scroll lands on the right slide.` },
      { title: 'Anchored headline', text: `No layout shift between slides.` },
      { title: 'Reversible', text: `Crossfades run backward on scroll-up.` },
    ],
    useCases: [
      { title: 'Feature message sequences', text: 'Crossfade a series of messages inside one frame, as a gentler take on [scroll pin steps](/ui-snippets/scroll-pin-steps/) with no layout change.' },
      { title: 'Pinned storytelling', text: 'Pace a narrative alongside a [scroll pin story](/ui-snippets/scroll-pin-story/), with slides drifting the direction the reader is scrolling.' },
      { title: 'Testimonial cycles', text: 'Cycle customer quotes like a [testimonial slider](/ui-snippets/testimonial-slider/), but driven by `floor(progress × count)` instead of buttons or timers.' },
      { title: 'Product value statements', text: 'Stack key messages the way a [scroll sticky stack](/ui-snippets/scroll-sticky-stack/) does, but crossfading in one fixed frame with a progress bar.' },
      { title: 'Onboarding and highlights', text: 'Explain steps before an [onboarding tour](/ui-snippets/onboarding-tour/), or summarise key benefits beside [feature cards](/ui-snippets/feature-cards/) in a landing section.' },
      { icon: 'CODE', title: 'Related: Scroll Day/Night Sky Cycle', desc: 'See the [Scroll Day/Night Sky Cycle](/ui-snippets/scroll-day-night-sky-cycle/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why do the slides not shift the layout when they change?', a: `All slides are absolutely positioned in the same fixed-size frame, stacked on top of each other, with only the active one at full opacity. Because they share the exact position, switching is a pure crossfade with no layout shift, and the centered headline stays anchored the whole time the section is pinned.` },
      { q: 'How is the active slide chosen?', a: `A pinned ScrollTrigger runs for one screen per slide, and its onUpdate floors self.progress times the slide count to pick the index. A progress bar fills from the same continuous progress value, so the section steps cleanly between slides while the bar shows exact position — the dual discrete and continuous reading.` },
      { q: 'What makes the crossfade feel directional?', a: `The go function checks whether you are scrolling forward or backward and animates the outgoing slide out in that direction while the incoming slide arrives from the opposite side with a small y offset. So scrolling down makes slides rise and scrolling up makes them fall, communicating navigation direction instead of a random dissolve.` },
      { q: 'How does it handle fast scrolling?', a: `onUpdate fires every frame, so go returns early when the index has not changed, and every tween uses overwrite: true so a fast scroll that skips slides cancels any in-flight fade and lands cleanly on the current one. Without these guards, quick scrolling would stack half-finished opacity tweens and flicker.` },
      { q: 'How do I use this scroll fade stack in React, Vue, or Angular?', a: `Keep the active index and progress in state. In a mount effect, register ScrollTrigger and create the pinned trigger whose onUpdate sets the index and progress; render the active slide and bar width from state. Return a cleanup that reverts the GSAP context so the pin is removed on unmount. The crossfade CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the index math and guard conditions by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how flooring self.progress times the slide count picks a stable index, and why the go function's early-return-on-same-index check and each tween's overwrite: true are both necessary to prevent flicker on fast scrolling. The same assistant can help optimize it — asking whether the onUpdate callback, which runs every scroll frame, could be made cheaper for a stack with dozens of slides, or whether the directional y-offset math could be simplified. It's also great for extending the effect: ask it to add keyboard or dot navigation that jumps to a specific slide and updates the scroll position to match, snap the scroll to whole slides at rest, or swap the text slides for image or video content. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll fade stack" effect in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A fixed-size frame containing several slides, all absolutely positioned in the exact same spot (stacked on top of each other), with only one slide at a time visible via opacity, so switching slides never shifts layout.
- A single pinned, scrubbed ScrollTrigger on the frame's container, whose scroll distance is proportional to the slide count (e.g. one full viewport height of scroll per slide).
- In that trigger's onUpdate callback, compute the target slide index by flooring self.progress multiplied by the slide count (clamped to the last valid index), and only trigger a slide change if that index actually differs from the currently active one — do not re-run the crossfade every frame.
- When the active index changes, determine the scroll direction (whether the new index is greater or less than the current one) and animate the outgoing slide's opacity to 0 while translating it up or down depending on that direction, while simultaneously animating the incoming slide in from the opposite vertical offset to opacity 1 — so the motion visibly communicates forward vs. backward navigation, not just a plain cross-dissolve.
- Every one of these crossfade tweens must use overwrite: true so that a fast scroll skipping past several slides cancels any in-flight tween instead of stacking multiple competing animations on the same element.
- Update a progress bar element's width continuously (every onUpdate call, not just on index change) from self.progress times 100%, so the bar gives continuous feedback even though the slide switching itself is discrete.
- Confirm the whole thing reverses correctly on scroll-up using the same onUpdate logic, with no separate reverse-specific code path.`,
    },
  },
};

export default scrollFadeStack;
