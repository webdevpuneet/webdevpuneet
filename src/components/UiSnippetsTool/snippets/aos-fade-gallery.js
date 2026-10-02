const aosFadeGallery = {
  id: 'aos-fade-gallery',
  title: 'AOS Fade-Up Gallery',
  lastmod: '2026-08-21',
  category: 'scroll',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css',
    'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js',
  ],
  html: `<section class="afg-intro" data-aos="fade-up"><h1>Field Notes</h1><p>A gallery that fades up piece by piece as you scroll, powered by AOS (Animate On Scroll) attributes.</p></section>
<div class="afg-grid">
  <figure class="afg-card" data-aos="fade-up" data-aos-delay="0"><div class="afg-swatch" style="background:linear-gradient(160deg,#059669,#10b981)"></div><figcaption>Wetlands</figcaption></figure>
  <figure class="afg-card" data-aos="fade-up" data-aos-delay="80"><div class="afg-swatch" style="background:linear-gradient(160deg,#0d9488,#14b8a6)"></div><figcaption>Tide Pool</figcaption></figure>
  <figure class="afg-card" data-aos="fade-up" data-aos-delay="160"><div class="afg-swatch" style="background:linear-gradient(160deg,#166534,#22c55e)"></div><figcaption>Fern Grove</figcaption></figure>
  <figure class="afg-card" data-aos="fade-up" data-aos-delay="0"><div class="afg-swatch" style="background:linear-gradient(160deg,#065f46,#34d399)"></div><figcaption>River Bend</figcaption></figure>
  <figure class="afg-card" data-aos="fade-up" data-aos-delay="80"><div class="afg-swatch" style="background:linear-gradient(160deg,#047857,#6ee7b7)"></div><figcaption>Moss Trail</figcaption></figure>
  <figure class="afg-card" data-aos="fade-up" data-aos-delay="160"><div class="afg-swatch" style="background:linear-gradient(160deg,#15803d,#4ade80)"></div><figcaption>Canyon Light</figcaption></figure>
</div>
<section class="afg-outro" data-aos="fade-up"><p>Each row fades up together thanks to the shared per-column delay values.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#08110d;color:#e9f7ef}
.afg-intro,.afg-outro{min-height:50vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px;max-width:520px;margin:0 auto}
.afg-intro h1{font-size:clamp(30px,6vw,52px);letter-spacing:-.02em}
.afg-intro p,.afg-outro p{color:#8fbfa3;font-size:16px;line-height:1.7}
.afg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;max-width:1040px;margin:0 auto;padding:20px 24px 30vh}
.afg-card{border-radius:16px;overflow:hidden;border:1px solid #163524;background:#0d1e15}
.afg-swatch{aspect-ratio:4/3;width:100%}
figcaption{padding:12px 14px;font-size:13px;font-weight:600;color:#c7ecd7;letter-spacing:.01em}`,

  js: `// AOS reads every data-aos attribute in the DOM and toggles a visibility
// class as each element crosses its scroll trigger point — this is the
// entire integration surface; no custom animation code is needed.
AOS.init({
  duration: 650,
  easing: 'ease-out-cubic',
  once: false,      // replay the fade each time an element re-enters
  offset: 80,        // trigger 80px before the element's edge reaches the viewport
});

// Optional: re-calculate AOS offsets if content loads asynchronously or
// the layout otherwise changes after initial render.
window.addEventListener('resize', () => AOS.refresh());`,

  seo: {
    title: 'AOS Fade-Up Gallery — Free Animate On Scroll Gallery Snippet',
    description: `A photo gallery where every card fades up on scroll using the AOS (Animate On Scroll) library and simple data-aos attributes — no custom JS animation code. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'AOS Fade-Up Gallery — Scroll Reveals with Declarative data-aos Attributes',
      description: `AOS (Animate On Scroll) is one of the oldest and most widely used scroll-reveal libraries because of how little code it asks for: mark any element with a \`data-aos\` attribute, call \`AOS.init()\` once, and the library handles observing scroll position and toggling the reveal — no bespoke IntersectionObserver setup, no manual class-toggling logic. This snippet builds a photo/card gallery that fades each item upward as it scrolls into view, entirely through HTML attributes.

**Attribute-driven, not code-driven**

Every card carries \`data-aos="fade-up"\` and an optional \`data-aos-delay\`. AOS scans the DOM on init, attaches a single shared scroll listener (internally using an IntersectionObserver-like strategy), and adds a visibility class to each element as it crosses its trigger offset — the corresponding CSS transition, already defined in AOS's own stylesheet, handles the actual fade and translate. This is fundamentally different from the [Scroll Reveal Grid](/ui-snippets/scroll-reveal-grid/) snippet's GSAP-driven approach: there's no JavaScript describing the animation itself, only markup describing intent.

**Per-column stagger via data-aos-delay**

Rather than JavaScript computing a stagger, this gallery hand-assigns \`data-aos-delay\` values (0, 80, 160ms) cycling across the three-column grid, so each row reveals with a gentle left-to-right cascade. Because AOS applies delay via plain CSS \`transition-delay\`, this scales to any number of items without any stagger-calculation logic — you're placing the delay directly where the element is defined.

**Configuring global behavior**

\`AOS.init({ duration: 650, easing: 'ease-out-cubic', once: false, offset: 80 })\` sets library-wide defaults: \`once: false\` means elements fade out and back in every time they cross the trigger point (rather than firing only the first time, which is AOS's default), and \`offset: 80\` triggers the reveal 80px before the element's edge would otherwise cross the viewport, giving reveals a slight head start. Every one of these can also be overridden per-element with matching \`data-aos-*\` attributes if you need item-level control.

**When AOS is the right tool**

For straightforward "fade/slide/zoom on scroll" reveals across many elements — galleries, feature lists, testimonial rows — AOS's attribute-based approach is faster to wire up and easier to hand off to non-JS-heavy contributors than a bespoke animation script. For more elaborate sequencing, pinning, or scrubbing, a library like GSAP ScrollTrigger (see [Scroll Reveal Grid](/ui-snippets/scroll-reveal-grid/)) or native CSS scroll timelines (see [View Timeline Image Reveal](/ui-snippets/css-view-timeline-image-reveal/)) offer more control at the cost of more code.

**Customizing it**

Swap \`fade-up\` for any of AOS's built-in animations (\`fade-down\`, \`zoom-in\`, \`flip-left\`, and more), adjust \`data-aos-duration\` per element, or combine with a [Photo Gallery](/ui-snippets/photo-gallery/) layout using real images instead of gradient swatches.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the AOS CDN CSS and JS', text: `Include aos.css and aos.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `An intro, a six-card gallery, and an outro render, each tagged with data-aos.` },
      { title: 'Call AOS.init()', text: `The JS panel initializes AOS once with duration, easing, and offset options.` },
      { title: 'Scroll the gallery', text: `Cards fade upward in a staggered cascade as each row enters view.` },
      { title: 'Scroll back up', text: `Because once is false, cards fade back out and replay on re-entry.` },
      { title: 'Adjust data-aos attributes', text: `Change fade-up, delays, or add data-aos-duration per card.` },
    ] },
    features: [
      { title: 'Zero animation code', text: `Reveals are entirely declared via data-aos HTML attributes.` },
      { title: 'One-line init', text: `A single AOS.init() call wires up every marked element.` },
      { title: 'Per-item delay', text: `data-aos-delay creates a manual column stagger.` },
      { title: 'Replay on re-scroll', text: `once: false replays the fade each time an item re-enters.` },
      { title: 'Configurable offset', text: `offset: 80 triggers reveals slightly before the viewport edge.` },
      { title: 'Built-in easing curves', text: `ease-out-cubic and others ship with the library.` },
      { title: 'Resize-safe', text: `AOS.refresh() recalculates trigger points after layout changes.` },
      { title: 'Broad animation catalog', text: `Swap fade-up for zoom, flip, or slide variants with one attribute.` },
    ],
    useCases: [
      { title: 'Attribute-only photo galleries', text: 'Reveal every card in a gallery by adding `data-aos` attributes and one `AOS.init()` call, with no custom animation code at all.' },
      { title: 'Portfolio sections', text: 'Pair with [portfolio filter grid](/ui-snippets/portfolio-filter-grid/) items, using `data-aos-delay` to build a manual column stagger across the row.' },
      { title: 'Marketing feature lists', text: 'Fade in [feature cards](/ui-snippets/feature-cards/) without writing JavaScript, setting `once: false` so the fade replays when items re-enter.' },
      { title: 'Blog and editorial content', text: 'Add low-effort scroll reveals to blog and editorial pages, with the library handling observation and class changes on your behalf.' },
      { title: 'Designer-friendly markup', text: 'Hand reveal control to designers who work only in HTML, and quickly add motion to a [hero section](/ui-snippets/hero-section/) or any static page.' },
      { icon: 'CODE', title: 'Related: Back to Top Button', desc: 'See the [Back to Top Button](/ui-snippets/back-to-top-button/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Native CSS Scroll Progress Ring', desc: 'See the [Native CSS Scroll Progress Ring](/ui-snippets/css-native-scroll-progress-ring/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does AOS know when to trigger a reveal?', a: `AOS.init() scans the document for elements carrying a data-aos attribute and tracks their position relative to the viewport as the page scrolls. When an element's trigger point (adjustable via the offset option or a per-element data-aos-offset) is crossed, AOS adds a class that the library's own CSS uses to transition the element from its hidden state to its visible one.` },
      { q: 'What does once: false actually change?', a: `By default, AOS animates each element only the first time it enters the viewport and leaves it visible afterward. Setting once: false makes AOS remove the visible class again when an element scrolls back out of view, so scrolling up and back down replays the fade — useful for demos or pages where users frequently scroll up and down through content.` },
      { q: 'Why does each card have a different data-aos-delay?', a: `The delay values (0, 80, 160ms) are assigned by hand to create a left-to-right stagger across the three-column grid — AOS itself doesn't compute a grid-aware stagger automatically the way a library like GSAP's stagger: { grid: "auto" } option does, so the cascade is achieved simply by placing incrementing delay attributes on each column's cards.` },
      { q: 'Do I need to call AOS.refresh() manually?', a: `Only if content changes after the initial page load in a way that shifts element positions — for example, images loading asynchronously and changing layout height, or items being added dynamically. This snippet calls AOS.refresh() on window resize as a simple example; in a single-page app you'd also call it after route changes or dynamic content updates.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Install the aos npm package (or keep using the CDN scripts), import AOS and its CSS, and call AOS.init() inside a mount effect (useEffect, onMounted, or ngAfterViewInit). Keep the data-aos attributes directly on your JSX/template elements exactly as in this snippet — AOS works by scanning rendered DOM attributes, so no framework-specific wiring is required beyond calling init() once after mount.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to memorize AOS's attribute vocabulary. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what data-aos, data-aos-delay, and the offset/once options in AOS.init() each control, and how AOS internally decides when an element has "entered" the viewport enough to trigger its reveal. The same assistant can help you extend the gallery — asking it to swap fade-up for a different built-in AOS animation like zoom-in or flip-left on alternating cards, or to compute the data-aos-delay values programmatically instead of hand-assigning them so the stagger still works if you add or remove grid columns. It's also useful for comparing approaches: ask it when AOS's declarative attributes are the better choice versus a library like GSAP ScrollTrigger or native CSS scroll timelines for a given use case. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a scroll-reveal photo/card gallery in plain HTML, CSS, and JavaScript using the AOS (Animate On Scroll) library loaded from a CDN (both its CSS and JS) — the animation itself must be driven by data-aos HTML attributes, not custom animation code.

Requirements:
- A responsive CSS grid gallery of at least six card/figure elements, each with a colored swatch or image placeholder and a caption.
- Every gallery card must carry a data-aos="fade-up" attribute, and a data-aos-delay attribute assigned by column position (for example 0ms, 80ms, 160ms cycling across a three-column layout) to create a manual left-to-right stagger within each row.
- Include an intro heading section and an outro section, both also marked with data-aos="fade-up", so the whole page demonstrates the reveal, not just the gallery.
- In JavaScript, initialize the library with a single AOS.init() call configuring duration, an easing curve (for example ease-out-cubic), once: false so elements replay their fade every time they re-enter the viewport, and a numeric offset so the trigger point is reached slightly before the element's edge crosses the viewport.
- Add a window resize listener that calls AOS.refresh() so trigger points stay accurate if the layout reflows.
- Do not write any manual IntersectionObserver, scroll listener, or custom class-toggling code — the entire reveal behavior must come from AOS's own attribute-driven engine.`,
    },
  },
};

export default aosFadeGallery;
