const locomotiveScrollSections = {
  id: 'locomotive-scroll-sections',
  title: 'Locomotive Scroll Sections',
  lastmod: '2026-08-21',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.css',
    'https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.js',
  ],
  html: `<div class="ls-scroll" data-scroll-container id="lsContainer">

  <section class="ls-hero" data-scroll-section>
    <h1 data-scroll data-scroll-speed="2">Locomotive Scroll</h1>
    <p data-scroll data-scroll-speed="1">Inertia-smoothed scrolling with per-element speed and reveal.</p>
  </section>

  <section class="ls-row" data-scroll-section>
    <div class="ls-card" data-scroll data-scroll-speed="1"><span>01</span><h3>Slow drift</h3></div>
    <div class="ls-card" data-scroll data-scroll-speed="3"><span>02</span><h3>Fast drift</h3></div>
    <div class="ls-card" data-scroll data-scroll-speed="-1"><span>03</span><h3>Reverse drift</h3></div>
  </section>

  <section class="ls-panel" data-scroll-section>
    <h2 data-scroll data-scroll-class="ls-in" data-scroll-repeat>Reveals as it enters</h2>
    <p data-scroll data-scroll-class="ls-in" data-scroll-repeat data-scroll-delay="0.1">Each element toggles a class via data-scroll-class, replayable with data-scroll-repeat.</p>
  </section>

  <section class="ls-row" data-scroll-section>
    <div class="ls-card" data-scroll data-scroll-speed="2"><span>04</span><h3>Parallax</h3></div>
    <div class="ls-card" data-scroll data-scroll-speed="0.5"><span>05</span><h3>Subtle</h3></div>
    <div class="ls-card" data-scroll data-scroll-speed="4"><span>06</span><h3>Snappy</h3></div>
  </section>

  <section class="ls-outro" data-scroll-section>
    <p data-scroll data-scroll-speed="1">Scrolled with inertia the whole way down.</p>
  </section>

</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0d16;color:#fff;overflow:hidden}
.ls-scroll{height:100vh}
.ls-hero,.ls-panel,.ls-outro{min-height:80vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:14px;padding:24px}
.ls-hero h1{font-size:clamp(36px,8vw,76px);letter-spacing:-.03em;background:linear-gradient(135deg,#38bdf8,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent}
.ls-hero p,.ls-outro p{color:#9aa0c0;font-size:16px;max-width:480px}
.ls-panel h2{font-size:clamp(26px,5vw,44px);opacity:.15;transform:translateY(30px);transition:opacity .6s ease,transform .6s ease}
.ls-panel p{color:#9aa0c0;opacity:0;transition:opacity .6s ease .1s;max-width:460px}
.ls-panel h2.ls-in{opacity:1;transform:translateY(0)}
.ls-panel p.ls-in{opacity:1}
.ls-row{min-height:60vh;display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;padding:24px}
.ls-card{width:220px;height:220px;border-radius:20px;background:linear-gradient(160deg,#1a2036,#11141f);border:1px solid #232a3d;display:flex;flex-direction:column;justify-content:space-between;padding:20px}
.ls-card span{font-size:12px;color:#7dd3fc;font-weight:700;letter-spacing:.08em}
.ls-card h3{font-size:22px;letter-spacing:-.01em}`,

  js: `// Locomotive Scroll turns the container into an inertia-smoothed scroller
// and reads data-scroll-speed / data-scroll-class off child elements.
const scroll = new LocomotiveScroll({
  el: document.querySelector('#lsContainer'),
  smooth: true,
  lerp: 0.08,
  multiplier: 1,
});

// Locomotive recalculates element positions on load and resize; nudge it
// once more after fonts/layout settle so speed offsets stay accurate.
window.addEventListener('load', () => scroll.update());
setTimeout(() => scroll.update(), 400);`,

  seo: {
    title: 'Locomotive Scroll Sections — Free Inertia Smooth-Scroll Snippet',
    description: `Multiple sections with inertia-smoothed scrolling, per-element parallax speed, and class-toggle reveals using Locomotive Scroll. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Locomotive Scroll Sections — Inertia Scrolling With Per-Element Speed',
      description: `Locomotive Scroll replaces the browser's native scroll with a smoothed, momentum-based one and layers a small declarative API on top: add \`data-scroll-speed\` to any element and it drifts faster or slower than the page as you scroll, add \`data-scroll-class\` and it toggles that class in and out of view. This snippet wires up a five-section page — a hero, two card rows with different drift speeds, and a reveal panel — entirely through data attributes, no per-element JavaScript.

**The scroll container is the whole page**

Locomotive works by taking over one container (\`data-scroll-container\`, here \`#lsContainer\`) and driving its transform manually with \`lerp\`-smoothed interpolation toward the real scroll position, rather than letting the browser scroll it natively — that's what produces the inertia feel. \`new LocomotiveScroll({ el, smooth: true, lerp: 0.08 })\` is the entire setup; a lower \`lerp\` value feels heavier and more viscous, a higher one feels snappier and closer to native scroll.

**Speed as a single attribute**

Every card in the two \`.ls-row\` sections has a different \`data-scroll-speed\`, from \`-1\` (drifts backward against scroll direction) up to \`4\` (drifts noticeably faster than the page). Locomotive reads the attribute per element and applies its own parallax transform, so the same markup pattern that works for a hero title (\`speed="2"\`) works identically for a whole row of cards — no manual scroll-position math.

**Class-toggle reveals, not opacity animation in JS**

The panel section uses \`data-scroll-class="ls-in"\` with \`data-scroll-repeat\`, so Locomotive simply adds and removes the \`ls-in\` class as the heading and paragraph cross into and out of the viewport. All of the actual animation — the fade and translate — lives in plain CSS transitions on \`.ls-in\`, keeping the JS-driven part limited to attaching a class name, which is easy to restyle or extend.

**Where this fits vs. other scroll effects**

For a stagger-triggered card grid rather than a full inertia scroller, see [scroll reveal grid](/ui-snippets/scroll-reveal-grid/); for text that types itself in as you scroll, see [scroll typewriter](/ui-snippets/scroll-typewriter/). Locomotive is the right tool specifically when you want the whole page's scroll feel changed, not just individual elements animated on entry.

**Customizing it**

Adjust \`multiplier\` to change overall scroll speed, tune \`lerp\` for more or less smoothing, or add \`data-scroll-direction="horizontal"\` on a section for horizontal scroll panels. Call \`scroll.update()\` any time content height changes dynamically (images loading, accordions expanding) so speed offsets stay correctly calculated.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Locomotive CSS and JS CDNs', text: `Include locomotive-scroll.min.css and .min.js.` },
      { title: 'Paste HTML, CSS, and JS', text: `A scroll container with five sections renders.` },
      { title: 'Scroll the preview', text: `Motion feels smoothed with inertia, not native.` },
      { title: 'Watch the card rows', text: `Each card drifts at its own data-scroll-speed.` },
      { title: 'Scroll to the reveal panel', text: `Heading and text fade in via a toggled class.` },
      { title: 'Tune lerp and multiplier', text: `Adjust the smoothing weight and scroll speed.` },
    ] },
    features: [
      { title: 'Inertia-smoothed scroll', text: `Momentum-based motion replaces native scroll.` },
      { title: 'Per-element speed', text: `data-scroll-speed drives independent parallax.` },
      { title: 'Reverse drift', text: `Negative speed values move against scroll direction.` },
      { title: 'Class-toggle reveals', text: `data-scroll-class swaps a class in and out of view.` },
      { title: 'Repeatable reveals', text: `data-scroll-repeat replays on re-entry.` },
      { title: 'Declarative setup', text: `No per-element JS, only data attributes.` },
      { title: 'Resize-safe', text: `scroll.update() recalculates on load and resize.` },
      { title: 'Multi-section layout', text: `Hero, rows, panel, and outro in one scroller.` },
    ],
    useCases: [
      { title: 'Smooth-scroll agency pages', text: 'Replace native scrolling with inertia-smoothed motion, combined with a [parallax hero](/ui-snippets/parallax-hero/) for a premium agency feel.' },
      { title: 'Portfolio card drift', text: 'Move project cards at varying speeds using `data-scroll-speed`, with negative values drifting against the direction of scroll.' },
      { title: 'Typewriter storytelling', text: 'Reveal copy alongside [scroll typewriter](/ui-snippets/scroll-typewriter/) text for a storytelling section, with `data-scroll-class` toggling a class as each element enters view.' },
      { title: 'Product feature imagery', text: 'Layer speed offsets across feature images to create depth on a product showcase, without writing a single scroll listener of your own.' },
      { title: 'Smooth case study layouts', text: 'Pair with [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) cards on a case study page, giving long-form content a smooth, weighty and premium feel.' },
      { icon: 'CODE', title: 'Related: Lenis Smooth Scroll Page', desc: 'See the [Lenis Smooth Scroll Page](/ui-snippets/lenis-smooth-scroll/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Saturation Gallery (view-timeline)', desc: 'See the [Saturation Gallery (view-timeline)](/ui-snippets/view-timeline-saturation-gallery/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from native browser scrolling?', a: `Locomotive Scroll takes over the designated container and drives it with a transform that interpolates toward the real scroll position using a lerp (linear interpolation) factor each frame, rather than letting the browser jump directly. That interpolation is what produces the momentum, weighted feel — the page keeps "catching up" to where you scrolled instead of moving there instantly.` },
      { q: 'How does data-scroll-speed create parallax without manual math?', a: `Locomotive reads the attribute off every element inside a scroll section on each frame and applies its own transform offset proportional to that value relative to the section's scroll progress — a value of 2 moves roughly twice as far as native scroll, -1 moves backward. You never compute scrollY or write a transform yourself; the attribute is the entire API.` },
      { q: 'What does data-scroll-class actually toggle?', a: `Locomotive adds the class named in the attribute to the element when it crosses into the configured viewport threshold, and removes it when the element leaves — by default only once unless data-scroll-repeat is also present, which makes it toggle every time the element re-enters or exits. All the visual animation of that class change (fade, translate, etc.) is ordinary CSS transitions, not JS-driven.` },
      { q: 'Why call scroll.update() after load?', a: `Locomotive calculates each element's position and scroll bounds when it initializes, but if fonts, images, or dynamic content change the page's height after that (a very common timing issue), those cached measurements go stale and speed offsets or reveal thresholds drift. Calling update() after load, and again after any dynamic layout change, forces it to remeasure.` },
      { q: 'Can I make one section scroll horizontally?', a: `Yes. Locomotive supports data-scroll-direction="horizontal" on an individual data-scroll-section, which converts vertical scroll input into horizontal movement for the content inside that section only, while the rest of the page continues scrolling vertically as normal — useful for a horizontal project gallery embedded in an otherwise vertical page.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace through Locomotive's internals to understand why the scroll feels different from native. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the lerp-based interpolation in LocomotiveScroll's render loop produces the inertia feel, or how data-scroll-speed on individual elements gets translated into per-frame transform offsets without any scroll-event listeners in this file's own JS. The same assistant can help optimize it — asking whether a lerp of 0.08 is too heavy for a fast-scrolling audience, or whether calling scroll.update() on every dynamic content change versus a debounced version matters for performance. It's also useful for extending the effect: ask it to add a horizontal-scrolling section, wire data-scroll-speed values to respond to viewport width, or combine the reveal classes with a stagger so multiple children animate in sequence rather than together. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a multi-section page with inertia-smoothed scrolling using Locomotive Scroll (load its CSS and JS from a CDN, no build step).

Requirements:
- A single outer container marked as the Locomotive scroll container, holding at least five sections marked as individual scroll sections, including a hero, two rows of card elements, a text reveal panel, and an outro.
- Initialize Locomotive Scroll once against that container with smooth scrolling enabled and a lerp (interpolation) value configured explicitly rather than left at its default, so the smoothing weight is visibly intentional.
- On at least six different elements across the two card rows, set a data attribute controlling per-element scroll speed with a mix of values: some slower than the page, some faster, and at least one negative value so it drifts opposite to the scroll direction — do not implement this parallax with your own scroll listener, rely entirely on the library's attribute-driven API.
- In the reveal panel section, use the library's class-toggle data attribute (not a custom IntersectionObserver) on a heading and a paragraph so a CSS class gets added as they scroll into view, with the corresponding fade/translate transition defined purely in CSS keyed off that class, and make the reveal repeatable so scrolling back up and down toggles it again rather than only firing once.
- After the page loads, call the library's update/recalculate method (and again after a short delay) to guard against stale position measurements from fonts or images finishing after initialization.
- Confirm the visual result: scrolling the page should feel weighted and continue briefly after input stops, not track the mouse wheel 1:1 like native scrolling.`,
    },
  },
};

export default locomotiveScrollSections;
