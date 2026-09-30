const scrollGalleryPin = {
  id: 'scroll-gallery-pin',
  title: 'Scroll Gallery Pin',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="gp-top"><p>Scroll ↓</p></section>
<section class="gp-pin" id="gpPin">
  <div class="gp-head">
    <span class="gp-count" id="gpCount">01 / 05</span>
    <h2 id="gpTitle">Aurora</h2>
  </div>
  <div class="gp-rail" id="gpRail">
    <figure class="gp-item" style="--g:linear-gradient(160deg,#5b6ad8,#22d3ee)"><figcaption>Aurora</figcaption></figure>
    <figure class="gp-item" style="--g:linear-gradient(160deg,#a855f7,#ec4899)"><figcaption>Bloom</figcaption></figure>
    <figure class="gp-item" style="--g:linear-gradient(160deg,#10b981,#84cc16)"><figcaption>Canopy</figcaption></figure>
    <figure class="gp-item" style="--g:linear-gradient(160deg,#f59e0b,#ef4444)"><figcaption>Dune</figcaption></figure>
    <figure class="gp-item" style="--g:linear-gradient(160deg,#0ea5e9,#6366f1)"><figcaption>Echo</figcaption></figure>
  </div>
</section>
<section class="gp-bottom"><p>A pinned, scroll-driven gallery rail.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b12;color:#fff}
.gp-top,.gp-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.gp-pin{height:100vh;display:flex;flex-direction:column;justify-content:center;gap:24px;overflow:hidden}
.gp-head{display:flex;align-items:baseline;gap:16px;padding:0 6vw}
.gp-count{font-size:14px;font-weight:800;letter-spacing:.16em;color:#7c8cff;font-variant-numeric:tabular-nums}
.gp-head h2{font-size:clamp(28px,5vw,52px);letter-spacing:-.02em}
.gp-rail{display:flex;gap:2.5vw;padding:0 6vw;width:max-content;will-change:transform}
.gp-item{position:relative;flex-shrink:0;width:34vw;min-width:260px;height:54vh;border-radius:22px;background:var(--g);box-shadow:0 30px 70px rgba(0,0,0,.4);overflow:hidden}
.gp-item figcaption{position:absolute;left:18px;bottom:16px;font-size:20px;font-weight:700;text-shadow:0 2px 12px rgba(0,0,0,.4)}
.gp-item::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.35),transparent 50%)}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var rail = document.getElementById('gpRail');
var items = gsap.utils.toArray('.gp-item');
var titleEl = document.getElementById('gpTitle');
var countEl = document.getElementById('gpCount');

function distance() { return rail.scrollWidth - window.innerWidth + window.innerWidth * 0.12; }

// Pin and translate the rail; update the heading from scroll progress.
gsap.to(rail, {
  x: function () { return -distance(); },
  ease: 'none',
  scrollTrigger: {
    trigger: '#gpPin',
    start: 'top top',
    end: function () { return '+=' + distance(); },
    scrub: 1,
    pin: true,
    invalidateOnRefresh: true,
    onUpdate: function (self) {
      var i = Math.min(items.length - 1, Math.round(self.progress * (items.length - 1)));
      titleEl.textContent = items[i].querySelector('figcaption').textContent;
      countEl.textContent = ('0' + (i + 1)).slice(-2) + ' / 0' + items.length;
    }
  }
});`,

  seo: {
    title: 'Scroll Gallery Pin — Free GSAP ScrollTrigger Snippet',
    description: `A pinned gallery whose image rail scrolls horizontally while a live caption and counter update, via GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Gallery Pin — A Pinned Horizontal Gallery With Live Caption',
      description: `Scroll gallery pin is the portfolio gallery where the section sticks to the screen and a row of images glides sideways as you scroll, with the heading and a counter updating to name whichever image is in focus — the polished showcase from agency and photography sites. This snippet builds it with GSAP and ScrollTrigger (from a CDN), plus plain HTML and CSS.

**Pin and translate the rail**

ScrollTrigger pins the gallery section and a single scrubbed tween moves the inner rail along its x-axis by its overflow distance (\`scrollWidth − innerWidth\`, plus a little padding so the last item clears the edge). So vertical scrolling drives the horizontal travel, and the section holds in place until the rail reaches its end — the standard horizontal-scroll-on-pin pattern, here applied to a captioned gallery.

**A live caption and counter**

What sets this apart from a plain horizontal scroller is the \`onUpdate\` callback. It reads \`self.progress\` (0 to 1), rounds it to the nearest item index, and writes that item's caption into the heading and updates a "03 / 05" counter. Because the index is rounded, the heading snaps to whichever image is most centered, giving the gallery a sense of discrete "slides" even though the motion is continuous. The counter uses \`tabular-nums\` so it doesn't jitter.

**Responsive distance**

The travel distance is computed in a function and \`invalidateOnRefresh: true\` re-runs it on resize, so the rail always scrolls exactly far enough regardless of viewport width — items are sized in \`vw\` so the gallery adapts, and the pin length (\`end\`) tracks the same function. This is what keeps a horizontal gallery from breaking or leaving dead scroll when the window changes.

**Smooth catch-up**

\`scrub: 1\` gives the rail a one-second easing toward the scroll position, so the images glide with a touch of momentum rather than locking rigidly to the scrollbar — a more gallery-like feel. \`ease: 'none'\` on the tween keeps the underlying mapping linear while the scrub adds the smoothing.

**Composited and clean**

The rail moves with a transform (\`x\`), so it composites on the GPU with no reflow even with large image cards, and \`overflow: hidden\` on the pinned section clips the off-screen items. Captions sit over a gradient scrim so they stay legible on any image.

**Customizing it**

Swap the gradient figures for real images, change the item width or gap, add more items (the distance recalculates), or snap the rail to each item. Pair it with a [scroll horizontal pin](/ui-snippets/scroll-horizontal-pin/), a [photo gallery](/ui-snippets/photo-gallery/), or a [coverflow carousel](/ui-snippets/coverflow-carousel/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A pinned gallery with a heading renders.` },
      { title: 'Scroll down', text: `The image rail glides sideways.` },
      { title: 'Watch the heading', text: `The title and counter track the focused image.` },
      { title: 'Resize the window', text: `The travel distance recalculates.` },
      { title: 'Use real images', text: `Swap the gradient figures for photos.` },
    ] },
    features: [
      { title: 'Pinned rail', text: `Section holds while images travel.` },
      { title: 'Scroll-driven scroll', text: `Vertical scroll moves the rail.` },
      { title: 'Live caption', text: `Heading names the focused image.` },
      { title: 'Index counter', text: `03 / 05 updates with progress.` },
      { title: 'Snapped index', text: `Rounded progress gives slide feel.` },
      { title: 'Resize-safe', text: `invalidateOnRefresh recomputes distance.` },
      { title: 'Momentum scrub', text: `scrub 1 adds a gallery-like glide.` },
      { title: 'Legible captions', text: `Gradient scrim under each label.` },
    ],
    useCases: [
      { title: 'Portfolios', text: `A captioned [scroll horizontal pin](/ui-snippets/scroll-horizontal-pin/).` },
      { title: 'Photography', text: `A pinned [photo gallery](/ui-snippets/photo-gallery/).` },
      { title: 'Product lines', text: `Glide through [product card](/ui-snippets/product-card/) shots.` },
      { title: 'Coverflow', text: `Pair with a [coverflow carousel](/ui-snippets/coverflow-carousel/).` },
      { title: 'Case studies', text: `Showcase work beside a [team card](/ui-snippets/team-card/).` },
      { title: 'Lookbooks', text: `Reveal via a [scroll image mask](/ui-snippets/scroll-image-mask/) first.` },
      { icon: 'CODE', title: 'Related: Scroll Day/Night Sky Cycle', desc: 'See the [Scroll Day/Night Sky Cycle](/ui-snippets/scroll-day-night-sky-cycle/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does scrolling move the gallery sideways?', a: `ScrollTrigger pins the section and a scrubbed tween moves the rail along x by its overflow distance (scrollWidth − innerWidth plus padding). Vertical scrolling drives the horizontal travel while the section holds in place until the rail ends — the horizontal-scroll-on-pin pattern, applied to a captioned image gallery.` },
      { q: 'How does the heading know which image is in focus?', a: `The tween's onUpdate reads self.progress from 0 to 1, rounds it to the nearest item index, and writes that item's caption into the heading plus a 03 / 05 counter. Rounding makes the title snap to whichever image is most centered, giving discrete slide feedback even though the rail moves continuously.` },
      { q: 'Does it adapt to different screen sizes?', a: `Yes. The travel distance is a function and invalidateOnRefresh: true re-runs it on resize, so the rail scrolls exactly far enough at any width, and the pin length tracks the same function. Items are sized in vw so the gallery itself reflows, avoiding dead scroll or a cut-off last image.` },
      { q: 'Why use scrub: 1 instead of true?', a: `scrub: 1 gives the rail a one-second easing toward the scroll position, so the images glide with a little momentum rather than locking rigidly to the scrollbar — a more gallery-like feel. ease: none keeps the underlying scroll-to-position mapping linear while the scrub value adds the smoothing on top.` },
      { q: 'How do I use this scroll gallery pin in React, Vue, or Angular?', a: `In a mount effect, register ScrollTrigger and create the pinned, scrubbed tween scoped to refs for the section and rail, with onUpdate setting state (active index) or writing to refs for the caption and counter. Use function-based distance and invalidateOnRefresh. Return a cleanup that reverts the GSAP context. The CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the responsive distance math from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the travel distance function subtracts window.innerWidth from the rail's scrollWidth and adds 12% of padding, and why both the tween's x value and the ScrollTrigger's end are defined as functions rather than plain numbers. The same assistant is helpful for optimizing it — asking whether invalidateOnRefresh recalculating on every resize event is expensive with many high-resolution images, or whether scrub: 1's one-second easing needs tuning for a rail with far more items. It's also great for extending the effect: ask it to add clickable thumbnail dots synced to the current index, make each figure a link to a full case-study page, or add a subtle parallax on the figure backgrounds as the rail scrolls past them. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll gallery pin" effect in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A pinned section containing a heading area (a title and an index counter like "01 / 05") and a horizontal rail of figure elements laid out with flexbox and no wrapping, each figure a fixed viewport-relative width with a caption.
- Compute the rail's horizontal travel distance as a function — scrollWidth minus window.innerWidth, plus roughly 12% of the viewport width so the last item fully clears the edge — and use that same function for both the tween's target x value and the ScrollTrigger's end value, so both stay in sync.
- Pin the section and scrub a single tween that moves the rail's x to the negative of that computed distance, using scrub: 1 (not scrub: true) so the rail glides with a bit of momentum rather than locking rigidly to the scrollbar.
- Set invalidateOnRefresh: true on the ScrollTrigger so the distance function is recalculated on window resize, keeping the horizontal travel correct at any viewport width without a hardcoded pixel value.
- In the tween's onUpdate callback, read self.progress (0 to 1), round it to the nearest figure index, and write that figure's caption text into the heading and update a zero-padded counter (e.g. "03 / 05") — the index must be rounded, not floored, so the heading feels centered on the most-visible figure.
- Keep the rail's motion to a transform (x) only, with overflow hidden on the pinned section clipping off-screen figures, and each caption legible over its figure via a bottom gradient scrim.`,
    },
  },
};

export default scrollGalleryPin;
