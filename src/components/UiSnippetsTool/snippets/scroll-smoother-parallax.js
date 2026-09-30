const scrollSmootherParallax = {
  id: 'scroll-smoother-parallax',
  title: 'ScrollSmoother Parallax Page',
  lastmod: '2026-07-15',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollSmoother.min.js',
  ],
  html: `<div id="smooth-wrapper">
  <div id="smooth-content">
    <section class="ssp-hero">
      <h1 data-speed="0.85">Butter-smooth scrolling</h1>
      <p data-speed="0.92">This whole page is riding ScrollSmoother. Speeds differ per element — that's the parallax.</p>
    </section>
    <section class="ssp-row">
      <div class="ssp-card" data-speed="1.08" style="--cc:#6366f1"><b>1.08×</b><span>faster than scroll</span></div>
      <div class="ssp-card" data-speed="1.0" style="--cc:#0ea5e9"><b>1.0×</b><span>normal speed</span></div>
      <div class="ssp-card" data-speed="0.9" style="--cc:#a855f7"><b>0.9×</b><span>slower than scroll</span></div>
    </section>
    <section class="ssp-band">
      <h2 data-speed="0.95">Lag makes things feel attached by springs</h2>
      <div class="ssp-chips">
        <span class="ssp-chip" data-lag="0.1">lag 0.1</span>
        <span class="ssp-chip" data-lag="0.3">lag 0.3</span>
        <span class="ssp-chip" data-lag="0.6">lag 0.6</span>
      </div>
    </section>
    <section class="ssp-end"><p>Native scrollbar, synthetic smoothness.</p></section>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d16;color:#fff}
.ssp-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center;padding:24px;background:radial-gradient(90% 80% at 50% 20%,#181f3d,#0b0d16)}
.ssp-hero h1{font-size:clamp(34px,6.6vw,64px);font-weight:800;letter-spacing:-.03em;background:linear-gradient(120deg,#a5b4fc,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}
.ssp-hero p{color:#aeb4ca;font-size:clamp(14px,2.2vw,17px);max-width:460px;line-height:1.6}
.ssp-row{display:flex;gap:16px;justify-content:center;align-items:flex-start;padding:16vh 24px;flex-wrap:wrap}
.ssp-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;width:170px;aspect-ratio:3/4;border-radius:18px;background:linear-gradient(160deg,color-mix(in srgb,var(--cc) 75%,#000),color-mix(in srgb,var(--cc) 25%,#0b0d16));border:1px solid rgba(255,255,255,.14)}
.ssp-card b{font-size:24px}
.ssp-card span{font-size:12px;color:rgba(255,255,255,.75)}
.ssp-band{min-height:70vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;text-align:center;padding:24px}
.ssp-band h2{font-size:clamp(22px,4vw,36px);font-weight:800;letter-spacing:-.02em;max-width:560px}
.ssp-chips{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
.ssp-chip{padding:12px 20px;border-radius:99px;background:#141a2e;border:1px solid rgba(255,255,255,.16);font-size:14px;font-weight:600;color:#c9d2f8}
.ssp-end{min-height:60vh;display:flex;align-items:center;justify-content:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}`,

  js: `gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// ScrollSmoother requires exactly this structure: a wrapper that gets
// pinned, and a content element that is translated smoothly while the
// native scrollbar (and native accessibility) keep working.
ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1.2,      // seconds to "catch up" to the scrollbar
  effects: true,    // activate data-speed and data-lag attributes
  smoothTouch: 0.1  // a light touch of smoothing on mobile
});`,

  seo: {
    title: 'ScrollSmoother Parallax Page — Free GSAP Snippet',
    description: `Whole-page smooth scrolling with GSAP ScrollSmoother — data-speed parallax, data-lag spring effects, native scrollbar preserved. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ScrollSmoother Parallax — Smooth Scrolling With the Native Scrollbar Intact',
      description: `"Smooth scrolling" libraries traditionally hijack the wheel, fake a scrollbar, and break accessibility. GSAP's ScrollSmoother (free on the CDN since 3.13) takes the opposite approach: the browser scrolls natively — real scrollbar, keyboard, find-in-page, anchor links all intact — while the visible content is *translated* to catch up smoothly. This snippet wires a whole page through it, with per-element \`data-speed\` parallax and \`data-lag\` spring effects declared entirely in markup.

**How the wrapper/content trick works**

ScrollSmoother requires exactly two elements: \`#smooth-wrapper\` (which it fixes in place) and \`#smooth-content\` (the actual page, which it moves with \`transform: translateY\`). The document retains its full natural height, so the native scrollbar reflects real position — but instead of the browser jumping content per scroll event, ScrollSmoother eases the transform toward the scroll position over \`smooth: 1.2\` seconds. Scroll hard and content glides after the scrollbar like it has mass. Because it's transform-based, everything stays compositor-friendly.

**data-speed is declarative parallax**

With \`effects: true\`, any element carrying \`data-speed\` moves at that multiple of scroll speed: \`0.85\` drifts slower than the page (appearing deeper), \`1.08\` outruns it (appearing closer). The three demo cards sit side by side with 1.08 / 1.0 / 0.9 — scroll and watch them shear apart, a controlled experiment in perceived depth. Crucially, ScrollSmoother auto-compensates so each element is exactly at its natural position when it's centered in the viewport; parallax offsets grow toward the viewport edges. That's why speeds don't wreck layouts the way hand-rolled parallax does.

**data-lag is parallax's springy cousin**

Where speed changes an element's velocity, \`data-lag\` delays it: a lag of 0.3 means the element takes an extra 0.3 seconds to catch up to where it should be, then settles. The chip row (lags 0.1 / 0.3 / 0.6) turns a scroll stop into a little cascade of settling elements — the "attached by soft springs" feel that agencies charge for, in one attribute.

**smoothTouch is deliberately tiny**

Touch devices already have physical momentum scrolling; stacking 1.2s of synthetic smoothing on top feels drunk. \`smoothTouch: 0.1\` applies just enough to keep effects working on mobile while respecting the platform's native feel — or set it \`false\` to disable entirely.

**It's built on ScrollTrigger, and they compose**

ScrollSmoother requires ScrollTrigger and registers itself as its scroller — meaning every ScrollTrigger technique (pins, scrubs, snap) works inside a smoothed page without changes. The pinned scroll effects across this library can drop into \`#smooth-content\` as-is.

**What to watch out for**

\`position: fixed\` elements must live *outside* \`#smooth-content\` (inside a transformed ancestor, fixed becomes absolute — a CSS spec behavior, not a plugin bug). And because content height is virtualized against the transform, dynamically injected content needs \`ScrollTrigger.refresh()\`.

**Customizing it**

Tune \`smooth\` (0.8 subtle, 2 dramatic), spread \`data-speed\`/\`data-lag\` across real imagery, or add \`ScrollSmoother.create().effects()\` targets dynamically. Related: scrubbed depth in [scroll parallax layers](/ui-snippets/scroll-parallax-layers/), row-shear in [hero parallax grid](/ui-snippets/hero-parallax-grid/), mouse parallax in [parallax hero](/ui-snippets/parallax-hero/), and native-scroll pinning in [scroll sticky features](/ui-snippets/scroll-sticky-features/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `gsap, ScrollTrigger, and ScrollSmoother — order matters.` },
      { title: 'Paste HTML, CSS, and JS', text: `The wrapper/content structure is required exactly.` },
      { title: 'Scroll the page', text: `Content glides after the scrollbar with inertia.` },
      { title: 'Watch the cards', text: `data-speed values shear them apart in depth.` },
      { title: 'Stop scrolling abruptly', text: `data-lag chips settle in a spring cascade.` },
      { title: 'Add effects anywhere', text: `Any element takes data-speed or data-lag.` },
    ] },
    features: [
      { title: 'Native scrollbar kept', text: `Real scrolling; only rendering is smoothed.` },
      { title: 'Transform-based glide', text: `Content translates to catch up over 1.2s.` },
      { title: 'Markup parallax', text: `data-speed multiples, zero JavaScript per element.` },
      { title: 'Center-compensated', text: `Elements sit naturally when viewport-centered.` },
      { title: 'Spring lag', text: `data-lag adds per-element settle delays.` },
      { title: 'Touch-respectful', text: `smoothTouch keeps mobile momentum native.` },
      { title: 'ScrollTrigger-native', text: `Pins and scrubs compose without changes.` },
      { title: 'A11y preserved', text: `Keyboard, anchors, find-in-page still work.` },
    ],
    useCases: [
      { title: 'Agency portfolios', text: `The signature glide plus depth; add scrubbed scenes from [scroll parallax layers](/ui-snippets/scroll-parallax-layers/).` },
      { title: 'Product marketing pages', text: `Float screenshots at different speeds around [sticky scroll features](/ui-snippets/scroll-sticky-features/).` },
      { title: 'Editorial longform', text: `Weight and lag for photo essays, with a [reading time left](/ui-snippets/scroll-reading-time/) pill outside the wrapper.` },
      { title: 'Hero depth', text: `Layered hero elements like [hero parallax grid](/ui-snippets/hero-parallax-grid/), driven by attributes.` },
      { title: 'Interactive resumes', text: `Smooth single-pagers with [scrollto anchor nav](/ui-snippets/scrollto-anchor-nav/) jumps.` },
      { title: 'Mouse-parallax pairing', text: `Combine with pointer depth from [parallax hero](/ui-snippets/parallax-hero/).` },
      { icon: 'CODE', title: 'Related: Shrink on Scroll Header', desc: 'See the [Shrink on Scroll Header](/ui-snippets/shrink-on-scroll-header/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is ScrollSmoother different from libraries like Lenis or Locomotive?', a: `Philosophy: the browser keeps scrolling natively — real scrollbar, keyboard paging, anchor jumps, find-in-page — and ScrollSmoother only eases the content's transform toward the true scroll position. Hijack-style libraries intercept wheel events and synthesize scrolling, which breaks those native behaviors. It also registers itself with ScrollTrigger, so the entire pin/scrub ecosystem works unchanged.` },
      { q: 'Why does it need the exact wrapper/content structure?', a: `The wrapper is fixed to the viewport (the window the user sees through) while the content element — the real page at its natural height — is translated within it. The document keeps its full height so the scrollbar stays honest, and the translate is what gets smoothed. Without that two-element split there'd be nothing to transform independently of the scroll position.` },
      { q: 'How does data-speed avoid breaking my layout?', a: `ScrollSmoother anchors every effect element to its natural position at the moment it's centered in the viewport — parallax offsets grow toward the edges and vanish at center. So a 0.9× image is exactly where CSS put it when the user looks straight at it, drifting only while entering and leaving. Hand-rolled parallax lacks that compensation, which is why it usually collides with neighbors.` },
      { q: 'What does data-lag do differently from data-speed?', a: `Speed scales an element's scroll velocity (depth illusion); lag delays it — a data-lag of 0.3 lets the element fall behind its true position and spring back over 0.3 seconds when scrolling pauses. Speeds separate layers in space; lags separate them in time, producing that soft-spring settle when a fast scroll stops.` },
      { q: 'Why do my position: fixed elements misbehave inside the content?', a: `CSS spec: inside any transformed ancestor, fixed positioning resolves against that ancestor rather than the viewport — and #smooth-content is permanently transformed. Move genuinely fixed UI (navs, cookie bars, floating buttons) outside #smooth-content as siblings of the wrapper, where they'll behave normally while the page glides beneath them.` },
      { q: 'How do I use ScrollSmoother in React, Vue, or Angular?', a: `Create it in a mount effect — useEffect, onMounted, or ngAfterViewInit — after the wrapper/content DOM exists, and call smoother.kill() in the cleanup (plus ScrollTrigger.refresh() after route content changes). In SPAs, recreate per page or keep one instance at the layout level with content swapped inside. The required structure is two plain divs, so Tailwind handles all styling; keep fixed overlays outside the wrapper.` },
      { q: 'Does ScrollSmoother work with keyboard scrolling and screen readers?', a: `Yes — because the browser's real scroll position is what's driving everything, Page Down, arrow keys, Space, and Home/End all move the native scrollbar exactly as before, and ScrollSmoother just eases the visual transform to catch up. Screen readers that read document order and jump to headings or landmarks are unaffected since the DOM structure and focus order never change, only the transform applied for rendering.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the wrapper/content mechanics from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why ScrollSmoother needs two separate elements rather than one, or how the effects: true option turns plain data-speed and data-lag attributes into center-compensated parallax without any per-element JavaScript. The same assistant can help optimize it — asking whether smoothTouch: 0.1 strikes the right balance for mobile, or how to safely handle position: fixed elements that would otherwise resolve against the transformed content wrapper instead of the viewport. It's also useful for extending the effect: ask it to combine ScrollSmoother with a pinned ScrollTrigger section elsewhere on the page, add dynamically injected content that needs a ScrollTrigger.refresh call, or build a toggle that lets users disable the smoothing entirely for accessibility. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "ScrollSmoother parallax page" in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger and ScrollSmoother plugins (load all three from a CDN, in that order) — do not hijack scroll events manually.

Requirements:
- Exactly two nested elements required by ScrollSmoother: an outer wrapper element and an inner content element containing all of the page's real sections (a hero, a row of cards, a text band, and an end section).
- Register ScrollTrigger and ScrollSmoother, then call ScrollSmoother.create with wrapper and content selectors pointing to those two elements, a smooth duration value controlling how many seconds the content takes to catch up to the true scroll position, effects set to true so declarative attributes are activated, and a small smoothTouch value for a lighter touch of smoothing specifically on touch devices.
- Add a data-speed attribute (a number, some above 1 and some below 1) to several elements across different sections, without writing any JavaScript per element — the effects: true option alone must make those elements parallax at their declared multiple of scroll speed, appearing to move slower or faster than the page depending on whether the value is below or above 1.
- Add a data-lag attribute (different small decimal values) to a group of sibling elements so they visibly settle into position with a staggered spring-like delay whenever the user stops scrolling abruptly, again using only the attribute with no manual JavaScript.
- Confirm the native browser scrollbar, keyboard scrolling (Page Down, arrow keys, Home/End), and anchor-link jumps all continue to work correctly, since the actual document scroll position must remain real and only the rendered content's transform is being smoothed.
- Note in a comment which kinds of elements (e.g. fixed-position navigation bars or cookie banners) must be placed outside the content element entirely, since position: fixed inside a permanently-transformed ancestor resolves differently than the CSS spec's normal viewport-relative fixed behavior.`,
    },
  },
};

export default scrollSmootherParallax;
