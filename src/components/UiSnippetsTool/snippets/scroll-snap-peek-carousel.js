const scrollSnapPeekCarousel = {
  id: 'scroll-snap-peek-carousel',
  title: 'Scroll-Snap Peek Carousel',
  lastmod: '2026-08-23',
  category: 'carousels',
  cdnUrls: [],
  html: `<section class="pc-intro"><h1>Drag or scroll →</h1><p>Each slide is sized so the next and previous slides peek in at the edges, with the active slide scaling up based on real scroll position within the track.</p></section>
<div class="pc-track" id="pcTrack">
  <div class="pc-slide"><div class="pc-card"><span class="pc-num">01</span><h3>Northwind</h3><p>Brand identity for a climate-tech studio.</p></div></div>
  <div class="pc-slide"><div class="pc-card"><span class="pc-num">02</span><h3>Cadence</h3><p>A scheduling app rebuilt from the ground up.</p></div></div>
  <div class="pc-slide"><div class="pc-card"><span class="pc-num">03</span><h3>Lumen</h3><p>Dashboard design for a solar analytics firm.</p></div></div>
  <div class="pc-slide"><div class="pc-card"><span class="pc-num">04</span><h3>Harbor</h3><p>E-commerce for an independent boatyard.</p></div></div>
  <div class="pc-slide"><div class="pc-card"><span class="pc-num">05</span><h3>Verde</h3><p>Packaging system for a plant-based label.</p></div></div>
  <div class="pc-slide"><div class="pc-card"><span class="pc-num">06</span><h3>Ember</h3><p>Motion design for a live events platform.</p></div></div>
</div>
<div class="pc-dots" id="pcDots"></div>
<section class="pc-outro"><p>Notice neighboring slides never fully disappear — they peek at both edges.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b13;color:#fff}
.pc-intro{min-height:60vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.pc-intro h1{font-size:clamp(30px,6vw,54px);letter-spacing:-.02em}
.pc-intro p{color:#9aa0b8;font-size:16px;max-width:500px}
.pc-track{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6vh 14vw;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.pc-track::-webkit-scrollbar{display:none}
.pc-slide{flex:0 0 72%;max-width:520px;scroll-snap-align:center}
.pc-card{padding:44px 34px;border-radius:26px;background:linear-gradient(155deg,#1a2138,#11131f);border:1px solid #262d44;box-shadow:0 30px 60px rgba(0,0,0,.4);transform:scale(.88);opacity:.55;transition:transform .1s linear,opacity .1s linear;will-change:transform,opacity}
.pc-card.is-active{transform:scale(1);opacity:1}
.pc-num{font-size:13px;font-weight:800;letter-spacing:.14em;color:#7c8cff}
.pc-card h3{font-size:clamp(24px,4vw,34px);letter-spacing:-.01em;margin:10px 0 8px}
.pc-card p{color:#a7adc4;font-size:15px;line-height:1.55}
.pc-dots{display:flex;justify-content:center;gap:8px;padding:8px 0 4px}
.pc-dots span{width:7px;height:7px;border-radius:50%;background:#2a3148;transition:background .3s,transform .3s}
.pc-dots span.is-active{background:#22d3ee;transform:scale(1.4)}
.pc-outro{min-height:50vh;display:flex;justify-content:center;align-items:center;text-align:center;padding:24px}
.pc-outro p{color:#9aa0b8;font-size:16px;max-width:480px}`,

  js: `(function () {
  var track = document.getElementById('pcTrack');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.pc-slide'));
  var cards = slides.map(function (s) { return s.querySelector('.pc-card'); });
  var dotsWrap = document.getElementById('pcDots');

  slides.forEach(function () {
    var dot = document.createElement('span');
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  var ticking = false;
  function update() {
    ticking = false;
    var trackRect = track.getBoundingClientRect();
    var trackCenter = trackRect.left + trackRect.width / 2;

    var closestIndex = 0;
    var closestDist = Infinity;

    slides.forEach(function (slide, i) {
      var rect = slide.getBoundingClientRect();
      var slideCenter = rect.left + rect.width / 2;
      var dist = Math.abs(slideCenter - trackCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
      // Scale and fade every card as a real, continuous function of its
      // own distance from the track's center — not just a binary
      // "active vs inactive" state — so dragging mid-scroll shows
      // intermediate scale values on neighboring cards too.
      var maxDist = rect.width * 0.9;
      var proximity = Math.max(0, 1 - dist / maxDist);
      var scale = 0.86 + proximity * 0.14;
      var opacity = 0.5 + proximity * 0.5;
      cards[i].style.transform = 'scale(' + scale.toFixed(3) + ')';
      cards[i].style.opacity = opacity.toFixed(3);
    });

    dots.forEach(function (dot, i) { dot.classList.toggle('is-active', i === closestIndex); });
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  track.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // The track only has overflow-x, so a plain vertical mouse wheel does
  // nothing by default -- only native horizontal gestures (trackpad swipe,
  // shift+wheel) scroll it. Translate vertical wheel input into horizontal
  // scroll whenever it's the dominant axis, so a normal mouse wheel works;
  // leave real horizontal trackpad gestures (deltaX dominant) untouched.
  track.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  update();

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      slides[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });
})();`,

  seo: {
    title: 'Scroll-Snap Peek Carousel — Free CSS Snap Carousel With Edge Peeking',
    description: `A horizontally scrollable CSS scroll-snap carousel where neighboring slides peek in at the edges, with active-slide scale driven by real scroll position within the track.`,
    about: {
      title: 'Scroll-Snap Peek Carousel — Neighbors Always Peek, Scale Follows Real Position',
      description: `A one-slide-per-view carousel hides everything except the current slide. This one deliberately doesn't: each slide is sized to 72% of the track's width so the previous and next slides always peek in at both edges, giving a visual hint that there's more to scroll to. It's built with native CSS \`scroll-snap-type\`, so dragging, trackpad scrolling, and keyboard navigation all work for free — with a small vanilla JS layer adding scale and opacity driven by real position, not just snap-point membership.

**CSS does the snapping, JS does the emphasis**

\`.pc-track\` sets \`scroll-snap-type: x mandatory\` and each \`.pc-slide\` sets \`scroll-snap-align: center\`, which is enough on its own to make the carousel snap crisply to each slide with zero JavaScript — this works with touch drags, a trackpad, a mouse wheel with shift, or a scrollbar. JavaScript is layered on top purely for the visual polish: scaling the active card up and neighboring cards down as a continuous function of position.

**Scale as a continuous function of distance, not a binary state**

Rather than a simple "is this the active slide, yes or no" check, the scroll handler measures each slide's actual distance from the track's horizontal center via \`getBoundingClientRect()\` and computes a \`proximity\` value that falls off smoothly to zero at roughly 90% of a slide's width away. That proximity value drives both scale (\`0.86\` to \`1.0\`) and opacity (\`0.5\` to \`1.0\`) continuously — so mid-drag, before a slide has snapped, you see genuinely intermediate scale values on both the outgoing and incoming cards, not a jump-cut between two fixed states.

**72% slides guarantee the peek**

Each slide is sized to \`flex: 0 0 72%\` with generous \`14vw\` horizontal padding on the track, which mathematically guarantees roughly 14% of both neighbors are visible at the track's edges at all times — an intentional layout choice, not an accident of viewport width, so the peek amount stays consistent across screen sizes.

**Dots as both indicator and control**

A row of dots below the track is generated to match the slide count; the closest slide to center is highlighted on scroll (computed in the same pass as the scale update), and clicking a dot calls \`scrollIntoView\` with \`inline: 'center'\`, which respects the track's native snap behavior for a smooth scroll to that slide.

**Customizing it**

Adjust the \`72%\` slide width for a wider or narrower peek, change the \`proximity\` falloff curve for a sharper or gentler scale transition, or add autoplay that calls \`scrollIntoView\` on an interval. Pair it with [scroll-snap gallery](/ui-snippets/scroll-snap-gallery/) or a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) for other layout patterns.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An intro, a peeking carousel track, dots, and an outro render.` },
      { title: 'Drag or scroll the track', text: `Slides snap to center; neighbors peek at both edges.` },
      { title: 'Watch the scale', text: `The centered card scales up; neighbors shrink and dim.` },
      { title: 'Drag slowly mid-scroll', text: `Scale and opacity shift continuously, not in a jump-cut.` },
      { title: 'Click a dot', text: `The track smooth-scrolls that slide to center.` },
      { title: 'Adjust the peek amount', text: `Change .pc-slide's flex-basis percentage.` },
    ] },
    features: [
      { title: 'Native CSS snap', text: `scroll-snap-type handles drag, wheel, and touch for free.` },
      { title: 'Guaranteed edge peek', text: `72% slide width always leaves neighbors visible.` },
      { title: 'Continuous scale function', text: `Proximity to center drives scale smoothly, not binary.` },
      { title: 'Position-driven, not snap-driven', text: `Scale updates from real getBoundingClientRect distance.` },
      { title: 'rAF-throttled scroll handler', text: `One calculation per frame regardless of event frequency.` },
      { title: 'Generated dot indicators', text: `Dots build automatically from the slide count.` },
      { title: 'Click-to-navigate dots', text: `scrollIntoView respects native snap behavior.` },
      { title: 'No dependencies', text: `Pure CSS scroll-snap plus a small vanilla JS layer.` },
    ],
    useCases: [
      { title: 'Portfolio showcases', text: 'Present projects with neighbouring slides always visible at both edges, because each slide is sized to 72 percent of the track width.' },
      { title: 'E-commerce image sets', text: 'Use a peek carousel for product images, where a slide\'s scale rises continuously as it approaches the centre of the track.' },
      { title: 'Testimonial sliders', text: 'Hint at more quotes without hiding them, with native `scroll-snap-type` handling drag, wheel and touch for free.' },
      { title: 'Peeking intro cards', text: 'Pair with a [scroll snap gallery](/ui-snippets/scroll-snap-gallery/) pattern for intro cards, with scale driven by real `getBoundingClientRect` distance rather than the snapped index.' },
      { title: 'Feature rows and card decks', text: 'Contrast with a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) for feature highlights, or use as a touch-first mobile card deck.' },
      { icon: 'CODE', title: 'Related: Staggered Reveal on Scroll — IntersectionObserver, One Timer', desc: 'See the [Staggered Reveal on Scroll — IntersectionObserver, One Timer](/ui-snippets/stagger-reveal-scroll-list/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this need JavaScript to work at all?', a: `No — scroll-snap-type: x mandatory on the track and scroll-snap-align: center on each slide are enough on their own for a fully functional snapping carousel that supports drag, trackpad, mouse wheel, and keyboard scrolling. The JavaScript only adds the scale-and-fade visual polish on top of behavior the browser already provides natively.` },
      { q: 'How is the scale value calculated?', a: `On scroll, each slide's getBoundingClientRect gives its actual horizontal center position, which is compared against the track's center to get a distance in pixels. That distance is converted to a proximity value between 0 and 1 that falls off smoothly as distance approaches about 90% of a slide's width, and proximity linearly drives both the scale (0.86 to 1.0) and opacity (0.5 to 1.0) — a continuous calculation, not a lookup based on which slide is "currently active."` },
      { q: 'Why do neighboring slides always stay partially visible?', a: `Each slide is sized to flex: 0 0 72% of the track's content box, with the track itself padded 14vw on each side. Combined, this guarantees that when a slide is centered, the remaining ~28% of track width is split between showing slivers of the previous and next slides — a deliberate layout ratio, not something that depends on viewport width.` },
      { q: 'Does the scale update while mid-drag, before a slide snaps?', a: `Yes — the scroll handler runs on every scroll event (throttled to once per animation frame), and because it measures live getBoundingClientRect positions rather than checking which slide has snapped, dragging the track partway between two slides shows genuinely intermediate scale and opacity values on both the outgoing and incoming cards.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Render the track and slides with refs, generate the dots array from your slide data, and in a mount effect attach the same rAF-throttled scroll listener to the track ref, reading getBoundingClientRect on the slide refs. Return a cleanup that removes the scroll and resize listeners. The CSS scroll-snap properties need no changes.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how sizing each slide to 72% of the track's width combined with 14vw of track padding mathematically guarantees neighboring slides peek in at both edges regardless of viewport size, and why computing a continuous proximity value from getBoundingClientRect distance (rather than checking which slide has snapped) is what makes the scale and opacity respond smoothly to mid-drag positions instead of jump-cutting between fixed states. It's also useful for extending the carousel: ask it to add autoplay that calls scrollIntoView on an interval while pausing on hover or touch, or to make the peek percentage and card count responsive so mobile shows a tighter peek than desktop.`,
      prompt: `Build a "scroll-snap peek carousel" in plain HTML, CSS, and vanilla JavaScript (no libraries).

Requirements:
- A horizontally scrollable track using CSS scroll-snap-type: x mandatory, with each slide using scroll-snap-align: center, so the browser handles snapping natively for drag, trackpad, mouse wheel, and touch input with zero JavaScript drag-handling code.
- Size each slide so it does NOT fill the full track width — use something like flex: 0 0 72% combined with horizontal padding on the track (e.g. 14vw) so that when any slide is centered, slivers of the previous and next slides remain visible ("peeking") at both edges of the viewport. This peek behavior must hold at different viewport widths, not just accidentally at one size.
- On scroll (throttled with a requestAnimationFrame guard so it runs at most once per frame), measure every slide's real position with getBoundingClientRect, compute each slide's horizontal distance from the track's center, and convert that distance into a continuous "proximity" value between 0 and 1 that falls off smoothly rather than being a hard cutoff.
- Use that continuous proximity value to set each card's CSS scale (e.g. from about 0.86 up to 1.0) and opacity (e.g. from about 0.5 up to 1.0) directly via inline styles, so that dragging the track slowly and stopping mid-scroll — before any slide has snapped — shows genuinely intermediate scale and opacity values on the cards nearest center, not a binary "active vs inactive" jump.
- Generate a row of dot indicators matching the slide count, highlight the dot for whichever slide is currently closest to the track's center, and make each dot clickable to scroll its slide to center using scrollIntoView with inline: 'center' so it respects the native snap points.`,
    },
  },
};

export default scrollSnapPeekCarousel;
