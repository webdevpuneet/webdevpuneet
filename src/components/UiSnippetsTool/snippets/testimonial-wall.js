const testimonialWall = {
  id: 'testimonial-wall',
  title: 'Testimonial Wall',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<section class="tw-section">
  <h2 class="tw-head">Loved by builders</h2>
  <div class="tw-wall" id="twWall" aria-label="Customer testimonials">
    <div class="tw-col" data-speed="38"></div>
    <div class="tw-col" data-speed="50"></div>
    <div class="tw-col tw-hide" data-speed="44"></div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0f;color:#e7e7ef}

.tw-section{max-width:1040px;margin:0 auto;padding:48px 18px}
.tw-head{text-align:center;font-size:clamp(24px,5vw,38px);font-weight:800;letter-spacing:-.02em;margin-bottom:34px;background:linear-gradient(120deg,#fff,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent}

.tw-wall{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;height:560px;overflow:hidden;position:relative;-webkit-mask-image:linear-gradient(180deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(180deg,transparent,#000 12%,#000 88%,transparent)}
.tw-col{display:flex;flex-direction:column;gap:16px;will-change:transform}

.tw-card{background:#15151f;border:1px solid #26263a;border-radius:14px;padding:17px;flex-shrink:0}
.tw-quote{font-size:13.5px;line-height:1.6;color:#cfcfe0}
.tw-who{display:flex;align-items:center;gap:10px;margin-top:13px}
.tw-av{width:34px;height:34px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;color:#0a0a0f}
.tw-name{font-size:12.5px;font-weight:700;color:#fff}
.tw-role{font-size:11px;color:#8b8ba3}
.tw-stars{color:#fbbf24;font-size:12px;letter-spacing:1px;margin-bottom:9px}

@media(max-width:760px){.tw-wall{grid-template-columns:repeat(2,1fr);height:520px}.tw-hide{display:none}}
@media(max-width:480px){.tw-wall{grid-template-columns:1fr}}`,

  js: `var DATA = [
  { q: 'Shipped our marketing site in a weekend. The snippets just drop in.', n: 'Mara Okafor', r: 'Founder, Tilt', c: '#a78bfa' },
  { q: 'The export-to-React button saved me hours of porting plain HTML.', n: 'Devon Reyes', r: 'Frontend Lead', c: '#22d3ee' },
  { q: 'Finally a library that is real UI, not yet another color converter.', n: 'Priya Nair', r: 'Design Engineer', c: '#f472b6' },
  { q: 'Copy, paste, customize. My team uses it as a starter every sprint.', n: 'Liam Chen', r: 'CTO, Forge', c: '#34d399' },
  { q: 'Accessible defaults out of the box meant fewer audit fixes later.', n: 'Sofia Marenco', r: 'Accessibility Eng.', c: '#fbbf24' },
  { q: 'The dark, modern aesthetic matched our brand with zero restyling.', n: 'Noah Patel', r: 'Product Designer', c: '#60a5fa' },
  { q: 'I prototype client pitches twice as fast now. Total game changer.', n: 'Ava Lindqvist', r: 'Freelancer', c: '#fb7185' },
  { q: 'Vanilla JS means no dependency headaches in our legacy stack.', n: 'Marcus Bauer', r: 'Staff Engineer', c: '#c084fc' },
  { q: 'Our conversion bump came straight from these polished components.', n: 'Yuki Tanaka', r: 'Growth, Bloom', c: '#2dd4bf' }
];

function cardHTML(t) {
  var initials = t.n.split(' ').map(function (w) { return w[0]; }).join('');
  return '<div class="tw-card"><div class="tw-stars">★★★★★</div>' +
    '<p class="tw-quote">' + t.q + '</p>' +
    '<div class="tw-who"><span class="tw-av" style="background:' + t.c + '">' + initials + '</span>' +
    '<span><span class="tw-name">' + t.n + '</span><br><span class="tw-role">' + t.r + '</span></span></div></div>';
}

var cols = Array.prototype.slice.call(document.querySelectorAll('.tw-col'));

cols.forEach(function (col, i) {
  // Each column gets a rotated slice of the data, then a duplicate set so the
  // loop is seamless: when we scroll exactly one set height, we reset to 0.
  var slice = DATA.slice(i * 3).concat(DATA.slice(0, i * 3));
  var html = slice.map(cardHTML).join('');
  col.innerHTML = html + html;

  var speed = parseFloat(col.getAttribute('data-speed'));   // px per second
  var offset = i % 2 ? -1 : 1;                               // alternate direction
  var pos = 0, half = 0, paused = false, last = performance.now();

  requestAnimationFrame(function measure() { half = col.scrollHeight / 2; });

  col.addEventListener('mouseenter', function () { paused = true; });
  col.addEventListener('mouseleave', function () { paused = false; });

  function tick(now) {
    var dt = (now - last) / 1000; last = now;
    if (!half) half = col.scrollHeight / 2;
    if (!paused) {
      pos += speed * dt * offset;
      if (pos <= -half) pos += half;     // wrap upward scroll
      if (pos >= 0) pos -= half;         // wrap downward scroll
      col.style.transform = 'translateY(' + pos + 'px)';
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
});`,

  seo: {
    title: 'Testimonial Wall — Free HTML CSS JS Marquee Snippet',
    description: `An infinite auto-scrolling testimonial wall with columns moving at different speeds, edge fade masks, and pause on hover. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Testimonial Wall — Infinite Scrolling Social-Proof Columns',
      description: `The testimonial wall is the social-proof section every modern landing page reaches for: multiple columns of review cards that scroll vertically and endlessly, each column drifting at a slightly different speed so the motion feels organic rather than mechanical. This snippet builds the whole effect — seamless looping, edge fades, alternating directions, and pause-on-hover — in plain HTML, CSS, and vanilla JavaScript with no animation library.

**Seamless infinite loop**

The trick to an endless scroll is duplication. Each column renders its set of cards twice (\`col.innerHTML = html + html\`), and the animation translates the column upward. The instant the offset reaches exactly one set's height — measured as \`scrollHeight / 2\` — the position wraps by adding that height back, which is visually identical because the second set is a perfect copy of the first. The viewer never sees a seam or a reset jump; the cards appear to flow forever.

**A real-time animation loop**

Rather than a fixed CSS keyframe, the motion runs on \`requestAnimationFrame\` with delta timing. Each frame computes \`dt\`, the seconds since the previous frame, and advances the position by \`speed * dt\`. Because it is time-based instead of frame-based, the scroll runs at the same real-world velocity whether the display is 60Hz or 120Hz, and a dropped frame doesn't cause a stutter in distance traveled. Each column reads its own \`data-speed\` (in pixels per second), so the three columns drift at 38, 50, and 44 px/s for that layered, living feel.

**Alternating directions**

The middle column scrolls the opposite way from its neighbors via an \`offset\` of \`-1\` versus \`1\`. The wrap logic handles both: when scrolling up, the position resets after passing \`-half\`; when scrolling down, it resets after crossing \`0\`. This two-way wrap means a single loop body supports both directions without special-casing.

**Edge fade with a mask**

To avoid hard cut-offs where cards appear and disappear, the wall uses a CSS \`mask-image: linear-gradient(180deg, transparent, #000 12%, #000 88%, transparent)\`. The mask fades the top and bottom 12% of the container to transparent, so cards melt in and out at the edges instead of popping. This is a pure compositing effect — no extra overlay elements and no impact on layout.

**Pause on hover**

Each column listens for \`mouseenter\` and \`mouseleave\` to set a \`paused\` flag. While paused, the animation loop keeps running but skips the position update, so a visitor can stop a column and actually read a testimonial — then it resumes exactly where it left off. This is the small touch that turns a decorative marquee into something usable.

**Data-driven cards**

All testimonials live in one \`DATA\` array of quote, name, role, and accent color. A \`cardHTML\` function builds each card, deriving the avatar's initials from the name automatically. Each column gets a rotated slice of the array so the three columns don't show the same quotes in the same order. To wire it to real reviews, replace \`DATA\` with your API response — the rendering and looping need no changes.

**Customizing it**

Adjust the \`data-speed\` values for faster or calmer motion, change the mask percentages to widen or tighten the fade, add a fourth column on wide screens, or hide the third column on tablets (the snippet already drops to two columns under 760px and one under 480px). Pair it with a [rating breakdown](/ui-snippets/rating-breakdown/) summary or a [logo marquee](/ui-snippets/logo-marquee/) for a complete social-proof block.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Three columns of review cards scroll vertically and endlessly.` },
      { title: 'Watch the layered motion', text: `Each column drifts at a different speed and the middle one reverses.` },
      { title: 'Note the edge fades', text: `Cards melt in and out at the top and bottom via a CSS mask.` },
      { title: 'Hover a column', text: `It pauses so you can read a testimonial, then resumes.` },
      { title: 'Swap in real reviews', text: `Replace the DATA array with your own quotes and avatars.` },
      { title: 'Tune speeds and fade', text: `Edit data-speed and the mask percentages to taste.` },
    ] },
    features: [
      { title: 'Seamless infinite loop', text: `Duplicated card sets wrap with no visible seam.` },
      { title: 'Delta-timed animation', text: `rAF with dt keeps speed constant across refresh rates.` },
      { title: 'Per-column speeds', text: `data-speed drives the layered, organic drift.` },
      { title: 'Alternating directions', text: `Two-way wrap logic supports up and down scroll.` },
      { title: 'CSS mask edge fade', text: `Cards fade at the top and bottom with no overlays.` },
      { title: 'Pause on hover', text: `Stop a column to read, then resume in place.` },
      { title: 'Data-driven cards', text: `One array with auto-derived avatar initials.` },
      { title: 'Responsive columns', text: `Drops to two then one column on small screens.` },
    ],
    useCases: [
      { title: 'Moving social proof wall', text: 'Anchor an endless wall of review cards below a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/), with columns drifting at different speeds.' },
      { title: 'SaaS homepage credibility', text: 'Pair with a [rating breakdown](/ui-snippets/rating-breakdown/) summary card so an overall score is followed by individual voices.' },
      { title: 'Agency client reviews', text: 'Follow a [logo marquee](/ui-snippets/logo-marquee/) of client brands with real quotes from the people behind those agency clients.' },
      { title: 'Static alternative pairing', text: 'Complement a [testimonial masonry](/ui-snippets/testimonial-masonry/) grid with a moving wall, or place a [testimonial slider](/ui-snippets/testimonial-slider/) above it for variety.' },
      { title: 'Infinite loop reference', text: 'Study a seamless `requestAnimationFrame` loop with delta timing, so speed stays constant across screen refresh rates.' },
    ],
    faqs: [
      { q: 'How does the scroll loop without a visible jump?', a: `Each column renders its cards twice and scrolls by translateY. When the offset reaches one set's height (scrollHeight / 2), the position wraps by adding that height back. Because the second set is an exact copy of the first, the reset lands on an identical frame, so the loop is seamless.` },
      { q: 'Why use requestAnimationFrame instead of a CSS keyframe?', a: `The rAF loop uses delta timing — it advances by speed times the elapsed seconds each frame — so the velocity is identical on 60Hz and 120Hz displays and survives dropped frames. It also makes pause-on-hover trivial: the loop keeps running but skips the position update while a paused flag is set.` },
      { q: 'How do the edge fades work?', a: `The wall has a CSS mask-image set to a vertical linear-gradient that is transparent at the very top and bottom and opaque in the middle. The mask hides the top and bottom 12% of pixels, so cards fade in and out at the edges with no extra overlay elements and no effect on layout.` },
      { q: 'Can I plug in real testimonials?', a: `Yes. All content lives in the DATA array of quote, name, role, and color. The cardHTML function derives avatar initials from the name automatically. Replace DATA with your reviews API response and the duplication, looping, and masking all keep working unchanged.` },
      { q: 'How do I use this testimonial wall in React, Vue, or Angular?', a: `Render the columns from your data and keep the rAF loop in a mount effect, storing the animation frame id so you can cancel it on unmount (useEffect cleanup in React, onUnmounted in Vue, ngOnDestroy in Angular). Use refs for the column elements rather than getElementById. The CSS — including the mask-image — ports directly, and in Tailwind the fade can use [mask-image:...] arbitrary values.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the seamless-loop trick by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each column renders its card set twice back to back, why the wrap check compares the scroll position against half of scrollHeight rather than the full height, and how the delta-timed requestAnimationFrame loop keeps the drift speed constant regardless of the display's refresh rate. The same assistant can help optimize it — for instance whether measuring scrollHeight inside the very first animation frame is reliable if images or fonts are still loading and change layout height afterward, or whether nine testimonials duplicated across three columns is enough content to avoid a visibly short, repetitive loop. It's also useful for extending the wall: ask it to fetch testimonials from a real API instead of a static array, add a fourth column on very wide screens, or make the pause-on-hover apply to touch/tap on mobile as well as mouse hover. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an infinitely auto-scrolling "testimonial wall" with multiple vertical columns in plain HTML, CSS, and JavaScript using delta-timed requestAnimationFrame — no CSS keyframe animation, no library.

Requirements:
- Multiple columns of review cards, each column receiving a different rotated slice of a shared testimonials data array so no two columns show the same cards in the same order, and each column's full card set rendered twice back-to-back in the DOm so the content can loop seamlessly.
- Each column must read its own scroll speed in pixels per second from a data attribute, and columns must alternate scroll direction (e.g. even-indexed columns scroll one way, odd-indexed the opposite way).
- Drive the vertical motion with requestAnimationFrame computing the elapsed time since the previous frame (delta time) on every tick, and advance each column's position by its speed multiplied by that delta time and its direction — not by a fixed per-frame pixel amount — so the visual speed stays constant regardless of display refresh rate or dropped frames.
- Measure each column's half-height (the height of one un-duplicated card set) once after the duplicated content has rendered, and whenever the running position passes that half-height boundary in either scroll direction, wrap it back by adding or subtracting that half-height so the loop continues with no visible jump or seam, relying on the fact that the duplicated content is pixel-identical to the first set.
- Apply a vertical CSS mask (a linear gradient which is transparent at the very top and bottom and opaque through the middle) over the whole wall container so cards fade in and out softly at the edges instead of being hard-clipped.
- Each column must pause its own position updates on mouseenter and resume on mouseleave, without stopping the underlying animation frame loop itself, so hovering one column to read a card does not affect the others.
- The wall must drop from three columns to two, then to one, at defined responsive breakpoints, hiding one column's cards entirely rather than just visually compressing them.`,
    },
  },
};

export default testimonialWall;
