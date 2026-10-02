const lenisSmoothScroll = {
  id: 'lenis-smooth-scroll',
  title: 'Lenis Smooth Scroll Page',
  lastmod: '2026-08-02',
  category: 'scroll',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js'],
  html: `<div class="lss-progress"><i id="lssBar"></i></div>

<nav class="lss-nav">
  <b>Lenis</b>
  <div class="lss-links">
    <a href="#lssOne" class="lss-link">Inertia</a>
    <a href="#lssTwo" class="lss-link">Parallax</a>
    <a href="#lssThree" class="lss-link">Anchors</a>
  </div>
  <button class="lss-toggle" id="lssToggle">Smooth: on</button>
</nav>

<main>
  <section class="lss-hero">
    <div class="lss-inner">
      <span class="lss-tag">lenis · virtual scroll</span>
      <h1 data-parallax="-0.18">Scroll with weight.</h1>
      <p data-parallax="-0.08">Lenis intercepts the wheel and eases the page toward its target, so momentum carries instead of snapping.</p>
      <div class="lss-metrics">
        <div><b id="lssPos">0</b><small>scroll px</small></div>
        <div><b id="lssVel">0.0</b><small>velocity</small></div>
        <div><b id="lssPct">0%</b><small>progress</small></div>
      </div>
    </div>
  </section>

  <section class="lss-band" id="lssOne">
    <h2 data-parallax="-0.12">Inertia, not animation</h2>
    <p>Every frame Lenis moves the page a fraction of the remaining distance to the target. That exponential approach is why it decelerates naturally rather than following a fixed curve.</p>
  </section>

  <section class="lss-band alt" id="lssTwo">
    <h2 data-parallax="-0.12">Parallax for free</h2>
    <p>Because scroll position is emitted on every frame, layers can be offset by a multiplier of it. The heading above is drifting against the page as you read this.</p>
  </section>

  <section class="lss-band" id="lssThree">
    <h2 data-parallax="-0.12">Anchors that glide</h2>
    <p>Native anchor jumps would teleport past all of this. Lenis intercepts them and eases to the target instead — try the navigation links.</p>
  </section>

  <footer class="lss-foot">End of the page. Scroll back up.</footer>
</main>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
/* Lenis drives scrolling itself; native smooth behavior fights it. */
html.lenis,html.lenis body{height:auto}
.lenis.lenis-smooth{scroll-behavior:auto!important}
html{scroll-behavior:auto}

body{font-family:system-ui,-apple-system,sans-serif;background:#080a16;color:#fff}

.lss-progress{position:fixed;top:0;left:0;right:0;height:3px;background:rgba(255,255,255,.08);z-index:40}
.lss-progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,#818cf8,#22d3ee)}

.lss-nav{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:40;display:flex;align-items:center;gap:18px;padding:9px 9px 9px 18px;border-radius:99px;background:rgba(15,19,38,.72);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.1)}
.lss-nav b{font-size:13.5px;letter-spacing:-.01em}
.lss-links{display:flex;gap:14px}
.lss-link{font-size:12.5px;color:#98a2c6;text-decoration:none;transition:color .16s}
.lss-link:hover{color:#fff}
.lss-toggle{padding:7px 14px;border-radius:99px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:#dbe3fb;font:600 11.5px system-ui;cursor:pointer;white-space:nowrap}
@media (max-width:560px){.lss-links{display:none}}

.lss-hero{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:96px 24px 48px;background:radial-gradient(110% 70% at 50% 0%,rgba(129,140,248,.2),transparent 62%)}
.lss-inner{max-width:660px;text-align:center}
.lss-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7dd3fc;background:rgba(125,211,252,.11);border:1px solid rgba(125,211,252,.3);padding:5px 12px;border-radius:99px;margin-bottom:22px}
.lss-hero h1{font-size:clamp(34px,8vw,74px);font-weight:800;letter-spacing:-.035em;line-height:1.02}
.lss-hero p{font-size:clamp(14px,2.4vw,17px);color:#96a0c4;margin-top:18px;line-height:1.7}

.lss-metrics{display:flex;gap:14px;justify-content:center;margin-top:38px;flex-wrap:wrap}
.lss-metrics div{min-width:104px;padding:14px 16px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09)}
.lss-metrics b{display:block;font-size:20px;font-variant-numeric:tabular-nums}
.lss-metrics small{font-size:10.5px;color:#7f89ad;letter-spacing:.06em;text-transform:uppercase}

.lss-band{min-height:76vh;display:flex;flex-direction:column;justify-content:center;padding:80px 24px;max-width:720px;margin:0 auto}
.lss-band.alt{background:linear-gradient(180deg,transparent,rgba(34,211,238,.05),transparent)}
.lss-band h2{font-size:clamp(24px,4.6vw,40px);font-weight:800;letter-spacing:-.025em}
.lss-band p{font-size:clamp(14px,2.3vw,16.5px);color:#96a0c4;margin-top:14px;line-height:1.8;max-width:560px}

.lss-foot{text-align:center;padding:80px 24px 120px;color:#5f688a;font-size:13px}`,

  js: `var lenis = new Lenis({
  // Lower = snappier. 1.15 keeps momentum readable without feeling laggy.
  duration: 1.15,
  easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.6
});

// Lenis does not run its own loop — you drive it, which is what lets it share
// one rAF with GSAP, Three.js or anything else on the page.
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

var bar = document.getElementById('lssBar');
var posEl = document.getElementById('lssPos');
var velEl = document.getElementById('lssVel');
var pctEl = document.getElementById('lssPct');
var layers = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));

lenis.on('scroll', function (e) {
  var pct = Math.max(0, Math.min(1, e.progress || 0));
  bar.style.width = (pct * 100) + '%';
  posEl.textContent = Math.round(e.scroll);
  velEl.textContent = e.velocity.toFixed(1);
  pctEl.textContent = Math.round(pct * 100) + '%';

  for (var i = 0; i < layers.length; i++) {
    var el = layers[i];
    var speed = parseFloat(el.dataset.parallax);
    el.style.transform = 'translate3d(0,' + (e.scroll * speed) + 'px,0)';
  }
});

document.querySelectorAll('.lss-link').forEach(function (link) {
  link.addEventListener('click', function (ev) {
    ev.preventDefault();
    lenis.scrollTo(link.getAttribute('href'), { offset: -70, duration: 1.4 });
  });
});

var on = true;
document.getElementById('lssToggle').addEventListener('click', function () {
  on = !on;
  if (on) lenis.start(); else lenis.stop();
  this.textContent = 'Smooth: ' + (on ? 'on' : 'off');
});`,

  seo: {
    title: 'Lenis Smooth Scroll Page — Virtual Scroll With Parallax',
    description: 'A smooth-scrolling page built with Lenis, with live velocity readouts, multiplier-based parallax and eased anchors. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Lenis Smooth Scroll Page — What Virtual Scrolling Really Does',
      description: `Smooth scrolling has a long history of being done badly. The versions that gave it a bad name hijacked the wheel, disabled the scrollbar, broke keyboard navigation, and made the browser's find-on-page jump to nowhere. **Lenis** is the modern answer, and the reason it works is a specific architectural choice: it keeps the native scroll position authoritative and only changes *how fast the page approaches it*.

## The easing, and why it decelerates so naturally

The default easing looks cryptic and is worth understanding:

\`function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }\`

That is an **exponential ease-out**. On every frame the page moves a fraction of the *remaining* distance to its target, so movement is fast when far away and slows asymptotically as it arrives. This is why Lenis feels like inertia rather than an animation: a fixed-duration cubic-bezier always takes the same time regardless of distance, whereas an exponential approach naturally takes longer for a long throw and settles quickly for a short one. The \`1.001\` and \`Math.min\` exist to guarantee the function actually reaches exactly 1 rather than approaching it forever.

\`duration: 1.15\` scales the whole feel. Below about 0.8 the effect is barely perceptible; above 1.5 the page starts feeling like it is fighting the user, which is the single most common way this is over-tuned.

## You own the animation frame

Lenis deliberately does **not** start its own loop:

\`function raf(time) { lenis.raf(time); requestAnimationFrame(raf); } requestAnimationFrame(raf);\`

This looks like boilerplate but it is the most important design decision in the library. Because you call \`lenis.raf()\` yourself, Lenis can share a single animation frame with GSAP's ticker, a Three.js render loop, or a physics simulation. Libraries that run their own internal loop end up with two or three independent rAF callbacks per frame, which is exactly how scroll-linked animation drifts a frame out of sync with the scroll it is supposed to follow.

## Parallax from the scroll event

\`lenis.on('scroll', ...)\` fires every frame with \`scroll\`, \`velocity\`, and \`progress\` already computed — no \`getBoundingClientRect()\` calls, no scroll listener of your own, no throttling to write.

The parallax is markup-driven. Any element can opt in by declaring a multiplier:

\`<h1 data-parallax="-0.18">\`

and the handler applies it:

\`el.style.transform = 'translate3d(0,' + (e.scroll * speed) + 'px,0)'\`

Negative values move the layer **against** the scroll so it appears further away; the magnitude is the depth. \`translate3d\` rather than \`translateY\` forces GPU compositing, so the transform never triggers layout.

Note the deliberate use of a plain \`for\` loop over the cached \`layers\` array. This runs on every single frame during scrolling, so re-querying the DOM or allocating a new array here is exactly the kind of per-frame waste that turns smooth scroll into jank.

## Anchors, and the problem they create

Native anchor links are incompatible with virtual scrolling — the browser teleports to the target instantly, skipping everything Lenis is doing. So they are intercepted:

\`lenis.scrollTo(link.getAttribute('href'), { offset: -70, duration: 1.4 })\`

\`scrollTo()\` accepts a selector, an element, or a pixel value. The \`offset: -70\` stops the target sliding under the fixed navigation bar — the detail every sticky-header site gets wrong on first attempt. The longer \`duration\` here is intentional: a deliberate jump reads better slightly slower than free scrolling.

## The CSS that is genuinely required

\`html.lenis, html.lenis body { height: auto }\` and \`.lenis.lenis-smooth { scroll-behavior: auto !important }\` are not optional styling. Lenis adds those classes to the document itself. The second one matters most: if a stylesheet sets \`scroll-behavior: smooth\`, the browser's own smooth scrolling runs *simultaneously* with Lenis, and the two implementations fight over the same scroll position, producing stutter that looks like a performance problem but is a configuration one.

## Accessibility, and the off switch

Smooth scrolling can trigger motion sickness, which is why the toggle calling \`lenis.stop()\` and \`lenis.start()\` exists. In production, that should be driven by \`prefers-reduced-motion\` automatically rather than a button — query the media list and never construct Lenis at all when reduction is requested. Because Lenis leaves the native scroll position intact, keyboard scrolling, find-on-page, and screen readers all continue to work normally either way, which is the substantive difference between it and the wheel-hijacking scripts it replaced.

## Reusing it

Keep the required CSS, the rAF loop, and the scroll handler; everything else is content. Add \`data-parallax\` to anything you want to drift. If you also use GSAP ScrollTrigger, call \`ScrollTrigger.update\` from the same Lenis scroll event and drive \`lenis.raf\` from GSAP's ticker instead of your own. Compare with a [scroll smoother parallax](/ui-snippets/scroll-smoother-parallax/) implementation, or [scroll progress](/ui-snippets/scroll-progress/) if all you need is the bar.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Lenis CDN', text: 'Include lenis from the CDN panel — global Lenis constructor.' },
      { title: 'Paste HTML, CSS, and JS', text: 'The page scrolls with momentum and the metrics update live.' },
      { title: 'Watch the readouts', text: 'Scroll position, velocity, and progress come from the scroll event.' },
      { title: 'Notice the parallax', text: 'Headings with data-parallax drift against the page as you scroll.' },
      { title: 'Use the nav links', text: 'Anchors are intercepted and eased with an offset for the fixed bar.' },
      { title: 'Toggle it off', text: 'lenis.stop() restores native scrolling instantly for comparison.' },
    ] },
    features: [
      { title: 'Exponential ease-out', text: 'Moves a fraction of remaining distance each frame, so it decelerates naturally.' },
      { title: 'You own the rAF loop', text: 'lenis.raf() is called manually so it shares one frame with other libraries.' },
      { title: 'Free scroll telemetry', text: 'scroll, velocity, and progress arrive already computed per frame.' },
      { title: 'Markup-driven parallax', text: 'Any element opts in with a data-parallax multiplier.' },
      { title: 'GPU-composited layers', text: 'translate3d keeps parallax off the layout path.' },
      { title: 'Cached per-frame work', text: 'Layers queried once, iterated with a plain for loop.' },
      { title: 'Eased anchors with offset', text: 'scrollTo(-70) stops targets hiding under the fixed nav.' },
      { title: 'Native scroll preserved', text: 'Keyboard, find-on-page, and screen readers keep working.' },
    ],
    useCases: [
      { title: 'Weighted agency scrolling', text: 'Give an agency or portfolio site the soft, momentum-based feel of premium sites, without hijacking the scrollbar or breaking find-on-page and keyboard navigation.' },
      { title: 'Long landing page progress', text: 'Pair with [scroll progress](/ui-snippets/scroll-progress/) for orientation on long pages, using the velocity and progress values Lenis supplies already computed each frame.' },
      { title: 'Parallax with library support', text: 'Build a library-backed take on [scroll parallax layers](/ui-snippets/scroll-parallax-layers/), where any element opts in through a `data-parallax` multiplier.' },
      { title: 'Eased anchor navigation', text: 'Replace abrupt anchor jumps between sections with eased movement on product tour pages, using the exponential ease-out that decelerates toward each target.' },
      { title: 'Virtual scroll learning', text: 'Learn why owning the `requestAnimationFrame` loop and calling `lenis.raf()` yourself lets scrolling share a single frame with other animation libraries.' },
      { icon: 'CODE', title: 'Related: Saturation Gallery (view-timeline)', desc: 'See the [Saturation Gallery (view-timeline)](/ui-snippets/view-timeline-saturation-gallery/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does Lenis feel like momentum rather than an animation?', a: 'Its default easing is an exponential ease-out, so each frame the page moves a fraction of the remaining distance to the target. That means a long throw naturally takes longer and a short one settles quickly, whereas a fixed-duration bezier takes the same time regardless of distance. The result reads as inertia.' },
      { q: 'Why do I have to write the requestAnimationFrame loop myself?', a: 'Because Lenis is designed to share one animation frame with whatever else you are running. Calling lenis.raf(time) from your own loop lets you drive it from GSAP ticker or a Three.js render loop, so scroll-linked animation stays in lockstep. Libraries with their own internal loop end up a frame out of sync with the scroll they follow.' },
      { q: 'What is the required CSS actually for?', a: 'Lenis adds .lenis and .lenis-smooth classes to the document element. The height: auto rules stop conflicting layout assumptions, and the scroll-behavior: auto override is critical — if any stylesheet sets scroll-behavior: smooth, the browser own smooth scrolling runs at the same time as Lenis and the two fight over scroll position, producing stutter that looks like a performance bug.' },
      { q: 'How is the parallax calculated?', a: 'The scroll event supplies the current scroll offset every frame, and each opted-in element declares a multiplier via data-parallax. The handler sets translate3d(0, scroll * speed, 0). Negative multipliers move the layer against the scroll so it reads as further away, and translate3d forces GPU compositing so no layout is triggered.' },
      { q: 'Why intercept anchor links instead of letting them work natively?', a: 'A native anchor jump teleports the browser to the target instantly, bypassing the virtual scroll entirely. Calling lenis.scrollTo() with the href eases there instead. The offset of -70 accounts for the fixed navigation bar so the target heading does not end up hidden underneath it.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Create the Lenis instance in a mount effect at the app root, start the rAF loop there, and call lenis.destroy() plus cancelAnimationFrame in cleanup. For React specifically, the official lenis/react package provides a ReactLenis provider and a useLenis hook. Gate construction behind a prefers-reduced-motion check so reduced-motion users get native scrolling.' },
    ],
    aiPrompt: {
      paragraph: `The parts of this snippet worth understanding are the easing function and the loop ownership, neither of which is obvious from reading. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to break down the default easing, 1.001 - Math.pow(2, -10 * t), and explain why an exponential approach feels like momentum where a fixed-duration cubic-bezier does not — and what the 1.001 and the Math.min are protecting against. Then ask why Lenis makes you write the requestAnimationFrame loop yourself instead of starting one internally, and how you would rewire it to be driven by GSAP ticker instead. Ask what specifically goes wrong if a stylesheet sets scroll-behavior: smooth while Lenis is running. For optimization, ask whether writing transform on several elements inside the per-frame scroll handler is a problem and how you would batch it if there were fifty parallax layers. To extend it: have it gate construction behind prefers-reduced-motion, integrate GSAP ScrollTrigger by calling ScrollTrigger.update from the Lenis scroll event, add a scroll-direction-aware hiding nav, or clamp parallax on mobile. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a smooth-scrolling page using the Lenis library (from a CDN, global Lenis) in plain HTML, CSS, and JavaScript.

Requirements:
- Instantiate Lenis with a duration around 1.15 and the exponential ease-out easing function t => Math.min(1, 1.001 - Math.pow(2, -10 * t)). Explain in a comment that this moves the page a fraction of the REMAINING distance each frame, which is why it decelerates like inertia rather than following a fixed curve.
- Drive it with your OWN requestAnimationFrame loop calling lenis.raf(time), and comment that Lenis deliberately does not start its own loop so it can share a single animation frame with GSAP, Three.js or a physics loop — libraries with internal loops end up a frame out of sync with the scroll they follow.
- Include the CSS Lenis requires and explain why it is not optional: html.lenis and html.lenis body { height: auto }, and .lenis.lenis-smooth { scroll-behavior: auto !important } — because if any stylesheet sets scroll-behavior: smooth the browser's native smooth scrolling runs simultaneously and fights Lenis over the same scroll position, producing stutter.
- Subscribe to lenis.on('scroll', ...) and use the supplied scroll, velocity and progress values (no getBoundingClientRect, no manual scroll listener) to drive three things: a fixed top progress bar width, a live readout panel showing scroll pixels, velocity to one decimal and progress percent, and markup-driven parallax.
- Implement parallax by letting any element opt in with a data-parallax attribute holding a multiplier, then setting translate3d(0, scroll * multiplier, 0) on it. Use negative multipliers so layers drift against the scroll and read as further away. Cache the queried layer list once outside the handler and iterate it with a plain for loop, since this runs every frame.
- Intercept navigation anchor clicks with preventDefault and use lenis.scrollTo(href, { offset: -70, duration: 1.4 }) instead — explain that native anchors teleport and bypass the virtual scroll entirely, and that the negative offset stops the target sliding under the fixed navigation bar.
- Add a toggle button calling lenis.stop() and lenis.start(), and note that in production this should be driven by prefers-reduced-motion, since smooth scrolling can cause motion sickness — and that because Lenis leaves the native scroll position authoritative, keyboard scrolling, find-on-page and screen readers keep working either way.
- Build a full multi-section dark page (tall hero plus three bands and a footer) so there is genuinely enough content to scroll through.`,
    },
  },
};

export default lenisSmoothScroll;
