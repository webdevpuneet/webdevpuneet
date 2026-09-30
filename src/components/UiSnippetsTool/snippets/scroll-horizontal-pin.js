const scrollHorizontalPin = {
  id: 'scroll-horizontal-pin',
  title: 'Scroll Horizontal Pin',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="hp-intro"><h1>Scroll down ↓</h1><p>The next section pins and scrolls sideways.</p></section>
<section class="hp-pin" id="hpPin">
  <div class="hp-track" id="hpTrack">
    <article class="hp-panel" style="--b:#6366f1"><span class="hp-num">01</span><h2>Discover</h2><p>Vertical scroll becomes horizontal travel.</p></article>
    <article class="hp-panel" style="--b:#0ea5e9"><span class="hp-num">02</span><h2>Design</h2><p>Each panel slides in as you keep scrolling.</p></article>
    <article class="hp-panel" style="--b:#10b981"><span class="hp-num">03</span><h2>Develop</h2><p>The section stays pinned until the track ends.</p></article>
    <article class="hp-panel" style="--b:#f59e0b"><span class="hp-num">04</span><h2>Deliver</h2><p>Then the page releases and scrolls on.</p></article>
  </div>
</section>
<section class="hp-outro"><p>Back to normal vertical scroll.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b12;color:#fff}
.hp-intro,.hp-outro{min-height:90vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.hp-intro h1{font-size:clamp(34px,7vw,64px);letter-spacing:-.02em}
.hp-intro p,.hp-outro p{color:#9aa0b8;font-size:17px}
.hp-pin{height:100vh;overflow:hidden}
.hp-track{display:flex;height:100%;width:max-content}
.hp-panel{position:relative;width:100vw;height:100vh;flex-shrink:0;display:flex;flex-direction:column;justify-content:center;padding:0 clamp(24px,8vw,120px);background:radial-gradient(70% 90% at 20% 20%,color-mix(in srgb,var(--b) 55%,#0a0b12),#0a0b12)}
.hp-num{font-size:15px;font-weight:800;letter-spacing:.2em;color:var(--b)}
.hp-panel h2{font-size:clamp(40px,9vw,110px);letter-spacing:-.03em;margin:8px 0 14px;line-height:.95}
.hp-panel p{color:#c3c8da;font-size:clamp(16px,2.4vw,22px);max-width:440px}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var track = document.getElementById('hpTrack');
var panels = track.children;

// Translate the track left by its overflow width while the section is pinned.
var horizontal = gsap.to(track, {
  x: function () { return -(track.scrollWidth - window.innerWidth); },
  ease: 'none',
  scrollTrigger: {
    trigger: '#hpPin',
    pin: true,
    scrub: 1,                 // smooth catch-up to the scroll position
    // One full viewport of vertical scroll per panel feels natural.
    end: function () { return '+=' + (track.scrollWidth - window.innerWidth); },
    invalidateOnRefresh: true // recalc widths on resize
  }
});

// Subtle parallax on each panel's heading as it crosses the screen.
// containerAnimation links these to the horizontal tween, not the page scroll.
Array.prototype.forEach.call(panels, function (panel) {
  gsap.from(panel.querySelector('h2'), {
    x: 140, opacity: 0.2,
    scrollTrigger: {
      trigger: panel,
      containerAnimation: horizontal,
      start: 'left right',
      end: 'center center',
      scrub: true
    }
  });
});`,

  seo: {
    title: 'Scroll Horizontal Pin — Free GSAP ScrollTrigger Snippet',
    description: `A section that pins and converts vertical scrolling into horizontal panel travel using GSAP ScrollTrigger with scrub. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Horizontal Pin — Turn Vertical Scroll Into Sideways Travel',
      description: `The horizontal scroll pin is the signature interaction where a full-screen section sticks to the viewport and its panels slide sideways as you keep scrolling down — the showcase technique used by award-winning agency and product sites. This snippet builds it with GSAP and the ScrollTrigger plugin (both loaded from a CDN), plus plain HTML and CSS.

**Pinning the section**

ScrollTrigger's \`pin: true\` fixes the \`.hp-pin\` section in place while the page scroll continues to advance. During that pinned window, a single \`gsap.to\` tween moves the inner \`.hp-track\` along its x-axis from 0 to the negative of its overflow width (\`scrollWidth − innerWidth\`), so the row of 100vw panels travels exactly far enough to reveal the last one. The track is laid out with \`display: flex\` and \`width: max-content\` so it overflows horizontally rather than wrapping.

**Scrub ties motion to the scrollbar**

Setting \`scrub: 1\` links the tween's progress to the scroll position with a one-second catch-up, so the panels move precisely as fast as you scroll — forward and backward — instead of playing on a fixed timeline. The \`end\` is computed as \`+=\` the overflow distance, which makes one screen of vertical scrolling map to one panel of horizontal travel, the ratio that feels most natural. \`ease: 'none'\` keeps the mapping perfectly linear so there's no drift between scroll and position.

**Responsive recalculation**

Widths depend on the viewport, so \`invalidateOnRefresh: true\` tells ScrollTrigger to recompute the start, end, and tween values on resize or orientation change. Using function-based values for \`x\` and \`end\` means those numbers are re-read at refresh time rather than frozen at load — the key to a horizontal scroller that doesn't break when the window changes size.

**Per-panel parallax**

Each panel's heading gets a secondary tween driven by the same horizontal motion, easing in from an offset and a low opacity as the panel crosses center. This layered movement — the panel translating while its content settles — adds depth so the section reads as more than a flat conveyor belt.

**Why GSAP for this**

Horizontal-on-vertical scroll is awkward with native CSS: \`position: sticky\` can pin, but mapping scroll distance to a transform, keeping it reversible, and recalculating on resize is exactly what ScrollTrigger is built for. GSAP handles the pin spacer, the scrub math, and the refresh lifecycle, so the snippet stays compact and robust.

**Customizing it**

Add or remove panels — the overflow math adapts automatically — change the scrub smoothing, adjust the scroll-to-travel ratio via \`end\`, or restyle the panels. Pair it with a [scroll pin steps](/ui-snippets/scroll-pin-steps/) section, a [scroll gallery pin](/ui-snippets/scroll-gallery-pin/), or [stacking scroll cards](/ui-snippets/stacking-scroll-cards/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `An intro, a pinned track, and an outro render.` },
      { title: 'Scroll down', text: `The section pins and panels slide sideways.` },
      { title: 'Scroll back up', text: `The panels reverse — motion is scrubbed.` },
      { title: 'Reach the end', text: `The page releases to normal vertical scroll.` },
      { title: 'Add a panel', text: `Drop in another .hp-panel; widths recalc.` },
    ] },
    features: [
      { title: 'ScrollTrigger pin', text: `Section sticks while panels travel.` },
      { title: 'Scrubbed motion', text: `Panels track the scrollbar both ways.` },
      { title: 'Overflow math', text: `Travel equals scrollWidth minus viewport.` },
      { title: 'Natural ratio', text: `One screen scroll per panel via end.` },
      { title: 'Resize-safe', text: `invalidateOnRefresh recomputes widths.` },
      { title: 'Per-panel parallax', text: `Headings settle as panels cross center.` },
      { title: 'Linear mapping', text: `ease none keeps scroll and position locked.` },
      { title: 'Any panel count', text: `Flex max-content adapts to the markup.` },
    ],
    useCases: [
      { title: 'Process sections', text: `Step through stages like [scroll pin steps](/ui-snippets/scroll-pin-steps/).` },
      { title: 'Galleries', text: `A pinned [scroll gallery pin](/ui-snippets/scroll-gallery-pin/) variant.` },
      { title: 'Case studies', text: `Showcase work beside [stacking scroll cards](/ui-snippets/stacking-scroll-cards/).` },
      { title: 'Product tours', text: `Pair with a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/).` },
      { title: 'Storytelling', text: `Complement a [scroll pin story](/ui-snippets/scroll-pin-story/).` },
      { title: 'Portfolios', text: `Slide projects past a [portfolio hero](/ui-snippets/portfolio-hero/).` },
      { icon: 'CODE', title: 'Related: Scroll Map Journey Story', desc: 'See the [Scroll Map Journey Story](/ui-snippets/scroll-map-journey-story/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does vertical scrolling move the panels sideways?', a: `ScrollTrigger pins the section with pin: true, and during that pinned window a gsap.to tween moves the inner track along x from 0 to negative its overflow width (scrollWidth minus innerWidth). So as the page scroll advances, the row of 100vw panels translates left exactly far enough to reveal the last one.` },
      { q: 'What does scrub do here?', a: `scrub: 1 links the tween's progress to the scrollbar with a one-second catch-up, so the panels move as fast as you scroll and reverse when you scroll back, rather than playing on a fixed timeline. Combined with ease: none, the scroll position and the horizontal offset stay locked together.` },
      { q: 'Why does it still work after resizing?', a: `The x distance and the end are function-based values, and invalidateOnRefresh: true tells ScrollTrigger to re-read them on resize or orientation change. So the overflow width, pin length, and travel are recomputed for the new viewport instead of being frozen at load — without this, horizontal scrollers break when the window changes.` },
      { q: 'How long should the section scroll last?', a: `The end is set to +=(scrollWidth − innerWidth), which makes the pinned scroll distance equal the horizontal travel distance, so one viewport of vertical scrolling reveals roughly one panel. Increase the end value to slow the travel down, or decrease it to speed the panels up.` },
      { q: 'How do I use this scroll horizontal pin in React, Vue, or Angular?', a: `Register ScrollTrigger once, then create the tween inside a mount effect (useGSAP or useLayoutEffect in React, onMounted in Vue, ngAfterViewInit in Angular) scoped to refs for the section and track. Critically, return a cleanup that calls ScrollTrigger.getAll().forEach(t => t.kill()) or ctx.revert() so pins are torn down on unmount and route changes. The CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to work out the overflow math or the containerAnimation wiring by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the x tween and the end value are written as functions rather than fixed numbers, and how invalidateOnRefresh keeps that math correct across resizes. The same assistant can help optimize it — for instance checking whether the per-panel parallax tweens should be batched into one ScrollTrigger.batch call instead of one trigger per panel once the panel count grows large. It is just as useful for extending the effect: ask it to add snap points so panels settle rather than stop mid-slide, layer in a progress indicator for the current panel, or make the horizontal track itself draggable with a mouse or touch swipe alongside the scroll-driven motion. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "horizontal scroll pin" section in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step, no other libraries).

Requirements:
- A pinned section containing a flex row of full-viewport-width panels, laid out with display: flex and width: max-content so the row overflows horizontally instead of wrapping.
- Use ScrollTrigger's pin: true to stick the section in place while normal page scroll continues, and a single gsap.to tween that moves the row's x from 0 to the negative of its own overflow distance (scrollWidth minus the viewport width) so the last panel becomes reachable.
- The tween's x target and the ScrollTrigger's end value must both be functions (not fixed numbers) that compute the overflow distance at call time, and invalidateOnRefresh must be set to true, so the whole scroller recalculates correctly after a window resize or orientation change.
- Use scrub (a numeric value, not scrub: true) so the horizontal position tracks the scrollbar with a slight catch-up smoothing, with ease: none so the mapping between scroll distance and horizontal position stays linear.
- Add a secondary parallax tween per panel (for example on its heading) that uses containerAnimation pointing at the horizontal tween, not the page's own scroll, so that inner motion is keyed to the panel's position inside the horizontal track rather than to vertical page scroll.
- The section must fully reverse when the user scrolls back up, and must support any number of panels without code changes beyond adding markup.`,
    },
  },
};

export default scrollHorizontalPin;
