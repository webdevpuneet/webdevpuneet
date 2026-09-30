const cssScrollTimelineHueRotateBg = {
  id: 'css-scroll-timeline-hue-rotate-bg',
  title: 'Hue-Rotating Scroll Background',
  category: 'scroll',
  html: `<div class="hrb-bg" aria-hidden="true"></div>
<main class="hrb-content">
  <section class="hrb-block"><h1>A Backdrop That Shifts As You Read</h1><p>The gradient behind this whole page slowly rotates through the color wheel as you scroll — one fixed pseudo-element, one CSS filter, one <code>animation-timeline: scroll(root)</code> binding. No JavaScript touches it.</p></section>
  <section class="hrb-block"><h2>Section Two</h2><p>Notice the hue keeps shifting continuously — it is not tied to which section is on screen, only to how far down the total page you have scrolled.</p></section>
  <section class="hrb-block"><h2>Section Three</h2><p>Because the animation is bound to the document's scroll range rather than to a duration, scrolling faster or slower changes nothing about how the color maps to position — only how quickly you pass through it.</p></section>
  <section class="hrb-block"><h2>Section Four</h2><p>Scrolling back up rewinds the hue exactly, since the browser is reading a live scroll-bound timeline, not replaying a one-shot animation.</p></section>
  <section class="hrb-block"><h2>Section Five</h2><p>By the bottom of the page the background has swept through a full 280 degrees of hue rotation.</p></section>
</main>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#08070c}
body{font-family:system-ui,-apple-system,sans-serif;color:#f1eefb}

.hrb-bg{
  position:fixed;inset:0;z-index:-1;
  background:conic-gradient(from 180deg at 30% 20%, #7c3aed, #db2777, #ea580c, #16a34a, #0891b2, #7c3aed);
  filter:hue-rotate(0deg) saturate(.9) brightness(.55);
  animation:hrb-shift linear both;
  animation-timeline:scroll(root);
}
@keyframes hrb-shift{ to{ filter:hue-rotate(280deg) saturate(.9) brightness(.55) } }

.hrb-content{max-width:620px;margin:0 auto;padding:14vh 24px 30vh}
.hrb-block{min-height:70vh;display:flex;flex-direction:column;justify-content:center;gap:14px}
.hrb-block h1{font-size:clamp(30px,5.5vw,46px);letter-spacing:-.02em}
.hrb-block h2{font-size:24px;color:#e6e2f5}
.hrb-block p{color:#c3bfe0;font-size:16px;line-height:1.8}
code{background:rgba(219,39,119,.2);color:#f5b8e0;padding:2px 6px;border-radius:5px;font-size:.9em;font-family:ui-monospace,Consolas,monospace}

@supports not (animation-timeline: scroll()){
  .hrb-bg{animation:none;filter:hue-rotate(140deg) saturate(.9) brightness(.55)}
}`,
  js: `// The full-page background hue-rotation above is entirely driven by CSS
// animation-timeline: scroll(root) on a fixed, negative-z-index backdrop
// layer -- no scroll listener or requestAnimationFrame loop exists in this
// file. This script only reports feature support for the demo readout.
const supportsScrollTimeline = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()');
console.log('[hue-rotate-bg] animation-timeline: scroll() supported:', supportsScrollTimeline);
if (!supportsScrollTimeline) {
  console.log('[hue-rotate-bg] falling back to a static mid-rotation hue via @supports.');
}`,
  seo: {
    title: 'Hue-Rotating Scroll Background — Native CSS animation-timeline',
    description: 'A full-page background gradient that continuously hue-rotates as the reader scrolls, driven by native CSS animation-timeline: scroll() on a fixed pseudo-layer with no JavaScript. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Hue-Rotating Scroll Background — animation-timeline: scroll() on a Fixed Backdrop Layer',
      description: `A background that shifts color as the reader scrolls is a common device in long-form storytelling and landing pages — it signals progress ambiently, without a visible progress bar or counter. This snippet builds a continuous, full-page version of that effect using a single fixed backdrop layer whose CSS \`filter: hue-rotate()\` value is driven directly by \`animation-timeline: scroll(root)\` — there is no JavaScript scroll listener, no per-section trigger, and no \`requestAnimationFrame\` loop.

**A fixed layer behind everything**

\`.hrb-bg\` is a single \`position: fixed; inset: 0\` element with \`z-index: -1\`, painted once behind all page content and never re-created or repositioned as the user scrolls. It holds a static \`conic-gradient\` — the color values in that gradient never change; only a \`filter: hue-rotate()\` value applied to the whole layer shifts, rotating every color in the gradient uniformly around the color wheel at once.

**animation-timeline: scroll(root) versus a per-section discrete effect**

[Scroll Color Sections](/ui-snippets/scroll-color-sections/) changes the page's theme discretely, section by section, using GSAP ScrollTrigger's \`onToggle\` to detect which section currently owns the viewport center. This snippet is a different kind of effect entirely: a single continuous \`hue-rotate()\` sweep bound to the whole document's scroll range via \`scroll(root)\`, with no concept of "sections" at all — the hue at any scroll position is a pure, deterministic function of how far down the page you are, not of which \`<section>\` happens to be nearby.

**Why filter and not changing the gradient's color stops directly**

CSS cannot smoothly interpolate between two different \`conic-gradient()\` color-stop lists without \`@property\`-registered custom properties and per-stop \`<color>\` transitions, which quickly becomes verbose for a five-color gradient. Animating a single \`filter: hue-rotate()\` value instead rotates every stop in the gradient together with one animatable number, and \`filter\` is a compositor-friendly property, so the shift stays smooth even during fast or inertial scrolling.

**Scroll speed does not change the mapping, only the pace**

Because the animation's playback position is bound to scroll offset rather than to elapsed time, scrolling through the page in one second or one minute produces the exact same hue at the exact same scroll position — a genuinely different guarantee than a duration-based CSS animation or a \`requestAnimationFrame\` loop keyed to time, which would have no relationship to scroll position at all without manual event-based math.

**Browser support**

Chromium-based browsers (Chrome, Edge, Opera, Brave) support \`animation-timeline: scroll()\` today. Firefox and Safari support is still landing, so an \`@supports not (animation-timeline: scroll())\` block fixes the backdrop at a static mid-rotation hue rather than leaving it stuck at the unrotated starting color.

**Customizing it**

Widen or narrow the \`hue-rotate(0deg)\` to \`hue-rotate(280deg)\` range in \`@keyframes hrb-shift\` for a subtler or more dramatic sweep, swap the \`conic-gradient\` for a \`radial-gradient\` or \`linear-gradient\` (the \`hue-rotate\` filter works identically on any gradient type), or add a second \`animation-timeline: view()\`-bound layer on top for section-specific accents layered over the continuous base sweep. Pair it with a [Parallax Hero](/ui-snippets/parallax-hero/) or [Aurora BG](/ui-snippets/aurora-bg/) for a more elaborate backdrop treatment.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `Five full-height sections render over a fixed, hue-shifting gradient backdrop.` },
      { title: 'Scroll from top to bottom', text: `Watch the backdrop sweep continuously through roughly 280 degrees of hue rotation.` },
      { title: 'Scroll back up', text: `The hue rewinds exactly, since it is driven by a live scroll(root) timeline, not a one-shot trigger.` },
      { title: 'Adjust the rotation range', text: `Change hue-rotate(280deg) in @keyframes hrb-shift to widen or narrow the total color sweep.` },
      { title: 'Swap the gradient shape', text: `Replace conic-gradient with radial-gradient or linear-gradient — the hue-rotate filter works the same on any of them.` },
      { title: 'Export in your format', text: `Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.` },
    ] },
    features: [
      'Single fixed backdrop layer, painted once, never repositioned by JavaScript',
      'filter: hue-rotate() driven entirely by animation-timeline: scroll(root)',
      'Continuous document-wide sweep, not a per-section discrete effect',
      'Scroll-position-bound, not time-bound — the hue at any scroll offset is deterministic',
      'Compositor-friendly filter property keeps the sweep smooth during fast scrolling',
      'Zero JavaScript scroll listeners or requestAnimationFrame loops',
      '@supports fallback locks to a static mid-rotation hue rather than an unrotated stuck color',
      'Works with any gradient type — conic, radial, or linear — with no other changes',
    ],
    useCases: [
      { icon: 'APP', title: 'Long-form landing and story pages', desc: 'An ambient sense of progress behind [Scroll Company Timeline](/ui-snippets/scroll-company-timeline/)-style narrative sections without an explicit progress bar.' },
      { icon: 'DESIGN', title: 'Portfolio and case-study backdrops', desc: 'Give a case study a continuously shifting mood without hand-authoring per-section color themes.' },
      { icon: 'LEARN', title: 'Learn filter-based scroll-driven animation', desc: 'A focused demo of animating filter (rather than transform or opacity) via a native scroll timeline.' },
      { icon: 'FLOW', title: 'Music, art, or event microsites', desc: 'A colorful, kinetic backdrop appropriate for expressive, less corporate brand contexts.' },
      { icon: 'CODE', title: 'Replace a JS-driven background color interpolation', desc: 'Removes the need for a scroll-listener-based color lerp for this specific ambient background effect.' },
      { icon: 'CODE', title: 'Related: Aurora BG', desc: 'See the [Aurora BG](/ui-snippets/aurora-bg/) for a related animated gradient backdrop pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: SVG Path Draw (view-timeline, No GSAP)', desc: 'See the [SVG Path Draw (view-timeline, No GSAP)](/ui-snippets/css-view-timeline-svg-path-draw/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why animate filter: hue-rotate() instead of changing the gradient colors directly?', a: `CSS cannot smoothly interpolate between two different lists of gradient color stops without registering custom properties via @property for each stop, which is verbose for a multi-color gradient. Applying a single filter: hue-rotate() value to the whole layer rotates every color in the gradient together using one animatable number instead.` },
      { q: 'Does scrolling faster change the colors shown?', a: `No. Because the animation's playback position is bound to scroll offset via animation-timeline: scroll(root) rather than to elapsed time, the hue at any given scroll position is always the same regardless of how fast or slow the user scrolls to get there — only the perceived speed of the color change differs.` },
      { q: 'How is this different from the discrete per-section color theme in Scroll Color Sections?', a: `Scroll Color Sections changes the page theme in discrete steps, one per section, triggered when a section's center crosses the viewport center. This snippet has no concept of sections at all — the hue is a single continuous function of total scroll position across the whole document, not tied to any individual section's boundaries.` },
      { q: 'Does the hue reverse correctly when scrolling back up?', a: `Yes. Because filter: hue-rotate() is bound to a live scroll(root) timeline rather than triggered once, scrolling back toward the top of the page moves the timeline's playback position backward and the hue rotates back toward its starting value automatically.` },
      { q: 'What happens in browsers without animation-timeline support?', a: `The @supports not (animation-timeline: scroll()) block fixes the backdrop filter at a static mid-rotation hue value, so Firefox and Safari users see a stable, pleasant single-color backdrop rather than one stuck at the unrotated starting hue or a broken animation.` },
      { q: 'Can I combine this with per-section accents on top?', a: `Yes. Layer a second element using animation-timeline: view() with its own filter or gradient, positioned above the continuous backdrop, to add section-specific highlights while the base layer keeps sweeping continuously underneath — the two timelines are entirely independent.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the filter and scroll-timeline wiring by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why filter: hue-rotate() is used to shift the whole backdrop's colors instead of animating the gradient's individual color stops, and why binding that filter to animation-timeline: scroll(root) guarantees the same hue always appears at the same scroll position regardless of scroll speed. The same assistant is useful for extending the effect: ask it to layer a second view()-timeline-bound accent element for section-specific highlights on top of the continuous sweep, add a subtle brightness pulse synced to the same timeline, or swap the conic-gradient for a radial or linear one for a different backdrop shape. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a full-page background that continuously hue-rotates as the user scrolls, using only the native CSS animation-timeline: scroll() API on a single fixed backdrop layer — no JavaScript scroll listeners, no requestAnimationFrame loop.

Requirements:
- A single position: fixed, full-viewport (inset: 0) backdrop element with a negative z-index, placed behind several scrollable content sections, holding a static multi-color gradient (conic, radial, or linear).
- A @keyframes animation on that backdrop element that animates the CSS filter property's hue-rotate() function from 0deg to a value like 280deg, without changing the gradient's own color stops.
- Bind that keyframe animation via animation-timeline: scroll(root) so the hue-rotation amount is a direct, deterministic function of how far down the total page the user has scrolled — not of elapsed time — meaning scrolling faster or slower never changes which hue appears at which scroll position.
- The effect must be continuous across the whole document, not tied to individual sections or triggered discretely per section.
- Add an @supports not (animation-timeline: scroll()) fallback that fixes the backdrop's filter at a reasonable static mid-rotation hue value, rather than leaving it stuck at the unrotated starting color in unsupported browsers.
- Keep any JavaScript limited to a one-time CSS.supports('animation-timeline: scroll()') feature check logged to the console — it must never drive or read scroll position itself.`,
    },
  },
};

export default cssScrollTimelineHueRotateBg;
