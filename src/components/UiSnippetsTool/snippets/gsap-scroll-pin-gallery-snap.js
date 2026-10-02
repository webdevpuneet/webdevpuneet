const gsapScrollPinGallerySnap = {
  id: 'gsap-scroll-pin-gallery-snap',
  title: 'GSAP ScrollTrigger Pinned Gallery Snap',
  lastmod: '2026-08-21',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="pg-intro"><h1>Pinned gallery</h1><p>Scroll down — the page pins while you scroll sideways through the panels, snapping to each one.</p></section>
<section class="pg-pin" id="pgPin">
  <div class="pg-track" id="pgTrack">
    <article class="pg-panel"><span class="pg-idx">01</span><h2>Horizon</h2></article>
    <article class="pg-panel"><span class="pg-idx">02</span><h2>Monolith</h2></article>
    <article class="pg-panel"><span class="pg-idx">03</span><h2>Cascade</h2></article>
    <article class="pg-panel"><span class="pg-idx">04</span><h2>Signal</h2></article>
    <article class="pg-panel"><span class="pg-idx">05</span><h2>Basin</h2></article>
  </div>
</section>
<section class="pg-outro"><p>Back to a normal vertical scroll.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b12;color:#fff}
.pg-intro,.pg-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.pg-intro h1{font-size:clamp(30px,6vw,56px);letter-spacing:-.02em}
.pg-intro p,.pg-outro p{color:#8b91ab;font-size:15px;max-width:480px}
.pg-pin{position:relative;overflow:hidden;height:100vh}
.pg-track{display:flex;height:100%;width:max-content}
.pg-panel{width:100vw;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:clamp(24px,8vw,90px);gap:10px;flex-shrink:0}
.pg-panel:nth-child(1){background:linear-gradient(135deg,#1c1830,#0a0b12)}
.pg-panel:nth-child(2){background:linear-gradient(135deg,#122a34,#0a0b12)}
.pg-panel:nth-child(3){background:linear-gradient(135deg,#301c28,#0a0b12)}
.pg-panel:nth-child(4){background:linear-gradient(135deg,#1e2c18,#0a0b12)}
.pg-panel:nth-child(5){background:linear-gradient(135deg,#2c2412,#0a0b12)}
.pg-idx{font-size:13px;font-weight:700;letter-spacing:.1em;color:#7dd3fc}
.pg-panel h2{font-size:clamp(32px,7vw,80px);letter-spacing:-.02em}`,

  js: `gsap.registerPlugin(ScrollTrigger);

const track = document.getElementById('pgTrack');
const panels = track.children.length;

// Move the track horizontally by exactly the distance needed to reveal every
// panel, tying that motion to vertical scroll while the section stays pinned.
const scrollTween = gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '#pgPin',
    start: 'top top',
    end: () => '+=' + (track.scrollWidth - window.innerWidth),
    pin: true,
    scrub: 1,
    snap: {
      snapTo: 1 / (panels - 1),
      duration: 0.4,
      ease: 'power1.inOut'
    },
    invalidateOnRefresh: true
  }
});`,

  seo: {
    title: 'GSAP Pinned Gallery Snap — Free ScrollTrigger Horizontal Snap',
    description: `A pinned section where vertical scroll drives a horizontal gallery that snaps to each panel, built with GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'GSAP ScrollTrigger Pinned Gallery Snap — Vertical Scroll, Horizontal Snap',
      description: `This snippet turns ordinary vertical scrolling into a pinned, horizontally-snapping gallery — the section locks in place while your scroll input drives a track of panels sideways, and lifting your finger or wheel settles the view on the nearest whole panel instead of leaving it mid-transition. It's built entirely with GSAP and ScrollTrigger from a CDN, no scroll-jacking libraries required.

**Pinning holds the section still**

\`pin: true\` on the ScrollTrigger fixes \`#pgPin\` in the viewport once its top reaches the top of the screen, and keeps it fixed for the entire duration of the scroll range defined by \`end\`. Visually the page appears to stop scrolling vertically — but scroll input is still being captured and converted into progress along the tween.

**Scroll distance becomes horizontal motion**

The core tween is \`gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth), scrollTrigger: { scrub: 1, ... } })\`. \`scrub: 1\` ties the tween's progress directly to scroll position (with a slight 1-second catch-up smoothing), so scrolling down moves the track left in lockstep — scroll up and it reverses. The \`end\` value is calculated from the track's actual overflow width, so it always matches exactly how far the track needs to travel to reveal the last panel.

**Snap locks onto whole panels**

Without \`snap\`, releasing the scroll mid-panel would leave the gallery awkwardly between two images. The \`snap: { snapTo: 1 / (panels - 1), duration: 0.4, ease: 'power1.inOut' }\` config divides the scroll progress into even increments — one per panel — and animates to the nearest one once scrolling settles, giving the gallery a deliberate, page-like feel instead of a loose scrub.

**Responsive by recalculation**

Both the \`x\` and \`end\` values are functions, not fixed numbers, so ScrollTrigger recalculates them on refresh. \`invalidateOnRefresh: true\` ensures a browser resize (which changes \`window.innerWidth\` and possibly \`track.scrollWidth\`) recomputes the whole scroll distance rather than reusing stale measurements.

**Customizing it**

Add more panels, change \`scrub\` to a larger number for looser lag, or drop \`snap\` entirely for a free-scrub gallery. Pair it with a [scroll horizontal pin](/ui-snippets/scroll-horizontal-pin/) or [scroll pin steps](/ui-snippets/scroll-pin-steps/) layout for related pinned-scroll patterns.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `An intro, pinned gallery, and outro section render.` },
      { title: 'Scroll into the gallery', text: `The section pins and panels slide horizontally.` },
      { title: 'Pause mid-scroll', text: `The view snaps to the nearest full panel.` },
      { title: 'Keep scrolling past the last panel', text: `The pin releases and vertical scroll resumes.` },
      { title: 'Resize the window', text: `ScrollTrigger recalculates the pin and scroll distance.` },
    ] },
    features: [
      { title: 'Vertical-to-horizontal scroll', text: `Wheel/touch input drives a sideways track.` },
      { title: 'True pinning', text: `Section stays fixed for the whole gallery duration.` },
      { title: 'Panel snapping', text: `Settles on the nearest whole panel after scrolling.` },
      { title: 'Scrubbed motion', text: `scrub: 1 ties progress directly to scroll with slight ease.` },
      { title: 'Dynamic distance', text: `end is computed from the track's real overflow width.` },
      { title: 'Resize-safe', text: `invalidateOnRefresh recalculates on viewport change.` },
      { title: 'No extra markup', text: `Snap math derives from panel count, not hardcoded steps.` },
      { title: 'Smooth release', text: `Scrolling past the last panel resumes normal flow.` },
    ],
    useCases: [
      { title: 'Snapping portfolio galleries', text: 'Pin a section and drive a horizontal track from vertical scroll, settling on the nearest whole panel when scrolling stops.' },
      { title: 'Product showcase steps', text: 'Step through products like [scroll pin steps](/ui-snippets/scroll-pin-steps/), with `scrub: 1` adding slight ease to the connection with scroll.' },
      { title: 'Case study introductions', text: 'Pair with a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) intro, then lock into a snapping gallery for the main work.' },
      { title: 'Editorial feature stories', text: 'Pace a long-form story with panels that settle one screen at a time, as a snapping alternative to the free-flowing [scroll horizontal pin](/ui-snippets/scroll-horizontal-pin/).' },
      { title: 'Brand story pages', text: 'Combine with [scroll SVG path draw](/ui-snippets/scroll-svg-path-draw/) accents, so a drawn line and a snapping gallery both follow scroll.' },
      { icon: 'CODE', title: 'Related: GSAP Scroll Text Scramble', desc: 'See the [GSAP Scroll Text Scramble](/ui-snippets/gsap-text-scramble-scroll/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Scroll-Snap Carousel (view-timeline Scale)', desc: 'See the [Scroll-Snap Carousel (view-timeline Scale)](/ui-snippets/scroll-snap-view-timeline-carousel/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does vertical scroll turn into horizontal motion?', a: `The ScrollTrigger doesn't change scroll direction itself — it pins the section and uses the vertical scroll distance as the driver for a scrubbed gsap.to(track, { x: ... }) tween. As you scroll down within the pinned range, the tween's progress advances and the track's x transform moves it left, so scroll input reads as horizontal motion visually.` },
      { q: 'Why compute end and x with functions instead of fixed numbers?', a: `track.scrollWidth and window.innerWidth can change — on resize, font load, or content changes — so hardcoding a pixel value would drift out of sync with the actual track width. Passing functions lets ScrollTrigger call them fresh each time it recalculates, and invalidateOnRefresh forces that recalculation on resize.` },
      { q: 'What does the snap config do exactly?', a: `snap: { snapTo: 1 / (panels - 1) } divides the scroll progress (0 to 1) into even increments, one per panel gap. When scrolling settles at a progress value that isn't exactly on one of those increments, GSAP animates to the nearest one over the given duration and easing, so the gallery always comes to rest on a full panel.` },
      { q: 'Why is scrub set to 1 instead of true?', a: `scrub: true ties the tween's progress to the scrollbar with zero lag, which can feel abrupt on fast wheel scrolls. Passing a number like 1 tells GSAP to take that many seconds to catch up to the scroll position, smoothing out jittery input while still feeling responsive.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Register ScrollTrigger and create the pinned tween inside a mount effect, scoping selectors to refs for the pin and track elements. Store the ScrollTrigger instance (or use gsap.context) and kill/revert it in the cleanup function so pins don't stack up across route changes or re-renders.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how pinning a section and scrubbing a horizontal tween off vertical scroll distance combine to make wheel input feel like sideways navigation, and why the end value and x target are computed as functions rather than fixed pixel numbers. It can also help you extend the pattern — ask for a version with visible progress dots that highlight the active panel, a vertical-panel variant, or a way to jump directly to a given panel via a nav click while keeping the snap and pin intact. Use it to make sure you understand the scrub/snap relationship before adapting the timing for your own content.`,
      prompt: `Build a "pinned horizontal gallery with scroll snap" in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN).

Requirements:
- An intro section, a pinned gallery section containing a flex track of several full-viewport-width panels laid out horizontally, and an outro section that resumes normal vertical scrolling after the gallery.
- Use ScrollTrigger's pin: true on the gallery section so it stays fixed in the viewport for the duration of the horizontal scroll, and scrub (a small numeric value, not just true) to tie the horizontal tween's progress to vertical scroll position with slight smoothing.
- The horizontal tween's target x offset and the ScrollTrigger's end value must both be computed dynamically from the track's actual scrollWidth and the viewport width (as functions, not hardcoded numbers), so the scroll distance always matches exactly how far the track needs to move to reveal the final panel.
- Configure ScrollTrigger's snap option so that once the user stops scrolling, the gallery animates to rest on the nearest whole panel rather than stopping at an arbitrary point between two panels — derive the snap increment from the number of panels, not a hardcoded fraction.
- Set invalidateOnRefresh: true so a browser resize correctly recalculates the pin distance and horizontal target instead of using stale measurements.
- Confirm that scrolling past the last panel releases the pin and returns to normal vertical scrolling into the outro section.`,
    },
  },
};

export default gsapScrollPinGallerySnap;
