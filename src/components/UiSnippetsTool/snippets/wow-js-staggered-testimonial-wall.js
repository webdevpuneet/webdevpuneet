const wowJsStaggeredTestimonialWall = {
  id: 'wow-js-staggered-testimonial-wall',
  title: 'WOW.js Staggered Testimonial Wall',
  lastmod: '2026-09-17',
  category: 'cards',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
  ],
  html: `<div class="ttw-stage">
  <div class="ttw-head">
    <span class="ttw-tag">WOW.js · masonry wall</span>
    <h2>Testimonial Wall</h2>
    <p>Scroll down — every card zooms in with a delay computed from its column and row, not just its position in the markup.</p>
  </div>
  <div class="ttw-wall" id="ttwWall"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 100% at 50% 0%,#171b2e,#090a13);color:#fff;min-height:100vh;padding:48px 24px 420px}
.ttw-stage{max-width:1040px;margin:0 auto;display:flex;flex-direction:column;gap:34px}
.ttw-head{text-align:center;max-width:540px;margin:0 auto}
.ttw-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f472b6;background:rgba(244,114,182,.12);border:1px solid rgba(244,114,182,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.ttw-head h2{font-size:clamp(24px,4.4vw,34px);font-weight:800;letter-spacing:-.02em}
.ttw-head p{font-size:14px;color:#9198b8;margin-top:10px;line-height:1.5}
.ttw-wall{column-count:3;column-gap:16px}
@media(max-width:760px){.ttw-wall{column-count:2}}
@media(max-width:520px){.ttw-wall{column-count:1}}
.ttw-card{break-inside:avoid;margin-bottom:16px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:20px;box-shadow:0 24px 50px -30px rgba(0,0,0,.8)}
.ttw-stars{color:#fbbf24;font-size:13px;letter-spacing:2px;margin-bottom:10px}
.ttw-quote{font-size:13.5px;line-height:1.6;color:#c7cbe4;margin-bottom:16px}
.ttw-who{display:flex;align-items:center;gap:10px}
.ttw-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#f472b6,#818cf8);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;color:#0d0f1a}
.ttw-name{font-size:13px;font-weight:700}
.ttw-role{font-size:11.5px;color:#8791b3}`,

  js: `var TESTIMONIALS = [
  { name: 'Priya N.', role: 'Product Designer', quote: 'The wall reads like a real feed — nothing pops in at the same instant, it feels alive.', stars: 5, h: 1 },
  { name: 'Dev R.', role: 'Frontend Lead', quote: 'Swapped a heavier scroll library for this and lost nothing visually.', stars: 5, h: 0 },
  { name: 'Alina K.', role: 'Founder', quote: 'Customers actually scroll to the bottom of this page now.', stars: 4, h: 1 },
  { name: 'Marcus T.', role: 'Growth', quote: 'Staggered zoom without a single line of animation math in my own code.', stars: 5, h: 0 },
  { name: 'Sofia L.', role: 'Marketer', quote: 'The delay pattern makes a 3-column grid look hand-choreographed.', stars: 5, h: 1 },
  { name: 'Ben O.', role: 'Engineer', quote: 'One script tag, one stylesheet, done. That is the whole integration.', stars: 4, h: 0 },
  { name: 'Rhea S.', role: 'PM', quote: 'Reused the same wall for case studies and it still felt intentional.', stars: 5, h: 1 },
  { name: 'Tomas W.', role: 'Indie Maker', quote: 'Cheapest-feeling-expensive trick I have shipped this quarter.', stars: 5, h: 0 },
  { name: 'Nadia F.', role: 'UX Researcher', quote: 'Testers specifically called out the wall as "premium".', stars: 4, h: 1 },
];

var COLS = 3;
var wall = document.getElementById('ttwWall');
var frag = document.createDocumentFragment();

TESTIMONIALS.forEach(function (t, i) {
  var card = document.createElement('div');
  card.className = 'ttw-card wow animate__animated animate__zoomIn';

  // The wall is a CSS column layout, so cards don't sit in a strict grid the way a
  // real grid-template would place them. We approximate each card's column by its
  // index modulo COLS, and its "row" by how many cards have already landed in that
  // column, then turn (column, row) into a delay so the wave still reads as
  // diagonal/staggered rather than every card firing off the same flat list order.
  var col = i % COLS;
  var row = Math.floor(i / COLS);
  var delay = (col * 0.12 + row * 0.18).toFixed(2);
  card.setAttribute('data-wow-delay', delay + 's');

  var stars = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars);
  card.innerHTML =
    '<div class="ttw-stars">' + stars + '</div>' +
    '<p class="ttw-quote">“' + t.quote + '”</p>' +
    '<div class="ttw-who">' +
      '<div class="ttw-avatar">' + t.name.charAt(0) + '</div>' +
      '<div><div class="ttw-name">' + t.name + '</div><div class="ttw-role">' + t.role + '</div></div>' +
    '</div>';

  frag.appendChild(card);
});
wall.appendChild(frag);

var wow = new WOW({ offset: 50, live: true });
wow.init();`,

  seo: {
    title: 'WOW.js Staggered Testimonial Wall — Masonry Reveal Snippet',
    description: 'A CSS-columns testimonial wall where each card zooms in with a WOW.js delay computed from its column and row position. Exports to React, Vue & Tailwind.',
    about: {
      title: 'WOW.js Staggered Testimonial Wall — Computing Delay Without a Grid',
      description: `The [scroll reveal cards](/ui-snippets/wow-js-scroll-reveal-cards/) snippet hand-writes \`data-wow-delay\` on each card because it's a fixed, small grid. A testimonial wall is different: the data is dynamic (nine testimonials today, twenty tomorrow) and the layout is a CSS **column** flow, not a CSS **grid** — so there's no reliable \`grid-row\`/\`grid-column\` to read the way you could with \`display: grid\`. This snippet computes the delay itself, in JavaScript, at render time.

## Why \`column-count\` breaks naive stagger math

\`.ttw-wall { column-count: 3 }\` is a masonry-style layout: the browser fills column 1 top to bottom, then column 2, then column 3, packing each card into whichever column has room next based on its height. That's what gives the wall its uneven, Pinterest-like silhouette — but it also means **DOM order and visual position diverge**. Card index 3 in the source might land at the top of column 2 or the middle of column 1 depending on how tall cards 0-2 turned out. A naive \`index * delay\` stagger would apply delays in source order, which no longer correlates cleanly with the visual left-to-right, top-to-bottom reading a viewer actually does.

This snippet uses a **deliberate approximation** rather than solving that exactly: \`col = i % COLS\` and \`row = Math.floor(i / COLS)\` pretend the wall is a strict 3-wide grid even though CSS columns don't guarantee that mapping. It's not pixel-perfect, but it's good enough that the reveal reads as a diagonal wave rather than a flat list sweep, and it costs one line of arithmetic instead of measuring \`getBoundingClientRect()\` on every card after layout (which would require waiting a frame for the column layout to settle, then re-triggering WOW.js's scan — real complexity for a cosmetic improvement).

## The formula

\`\`\`
delay = col * 0.12 + row * 0.18
\`\`\`

Column contributes a small delay so cards across the same visual row feel like a left-to-right sweep; row contributes a larger delay so successive rows clearly lag behind the ones above. Both values are tunable — raise the row coefficient and the wall reveals in more distinct horizontal bands; raise the column coefficient and it reads more like a left-to-right wipe.

## \`animate__zoomIn\` instead of \`fadeInUp\`

Swapping the animate.css class is the only other change from the base pattern, and it matters for a wall of many small cards: \`zoomIn\` scales from 0.3 to 1 with no vertical travel, so cards popping in at staggered times across three columns don't visually collide by sliding through each other's space the way a \`fadeInUp\` wall of that density can.

## \`offset: 50\`

Passing \`{ offset: 50 }\` to \`new WOW()\` tells it a card only counts as "revealed" once it's 50px further into the viewport than the raw bottom edge — a small buffer so cards don't trigger the instant a single pixel peeks into view, which reads as premature on a dense wall.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add both CDN files', text: 'wow.min.js and animate.min.css — the wall needs both to reveal anything.' },
      { title: 'Define your testimonial data', text: 'Each entry needs a name, role, quote, and star rating; the wall builds itself from the array.' },
      { title: 'Cards get delay computed at render time', text: 'col * 0.12 + row * 0.18 is derived from each card\'s index, not hand-written per card.' },
      { title: 'Call new WOW({ offset: 50 }).init()', text: 'The offset gives a small buffer before a card is considered visible enough to reveal.' },
      { title: 'Scroll to see the wave', text: 'Cards zoom in with a diagonal stagger across the three CSS columns.' },
      { title: 'Add more testimonials', text: 'Push new objects onto the TESTIMONIALS array — the delay formula scales automatically.' },
    ] },
    features: [
      { title: 'Data-driven wall', text: 'Cards are generated from a JS array, so the count and content are not hand-authored in HTML.' },
      { title: 'Computed stagger delay', text: 'Each card\'s data-wow-delay is derived from its approximate column and row, not its raw index.' },
      { title: 'CSS columns masonry', text: 'column-count creates the uneven Pinterest-style layout without a JS layout library.' },
      { title: 'zoomIn over fadeInUp', text: 'A scale-based entrance avoids the visual collisions a slide entrance causes on a dense wall.' },
      { title: 'Configurable offset', text: 'offset: 50 delays the reveal trigger slightly past the raw viewport edge.' },
      { title: 'Star rating rendering', text: 'Filled and empty star characters are generated per testimonial from a numeric rating.' },
      { title: 'Responsive column count', text: 'The wall drops from 3 to 2 to 1 columns at standard breakpoints.' },
      { title: 'Break-inside safe cards', text: 'break-inside: avoid keeps a card from being split across two columns.' },
    ],
    useCases: [
      { title: 'Social proof sections', text: 'Show a dense, lively wall of customer quotes in a CSS-columns layout, with each card zooming in with a computed delay.' },
      { title: 'Case study pull quotes', text: 'Reuse the wall for short quotes from many projects, generated from a JavaScript array so count and content can grow.' },
      { title: 'Stagger approximation teaching', text: 'Learn how to estimate each card\'s column and row position to derive a `data-wow-delay`, since CSS columns give no explicit grid.' },
      { title: 'Review aggregator pages', text: 'Surface many short reviews with motion, using `zoomIn` rather than `fadeInUp` to avoid collisions between slide-in entrances.' },
    ],
    faqs: [
      { q: 'Why not use a real CSS grid instead of column-count?', a: 'column-count is what produces the uneven, masonry-style silhouette where shorter cards pack tighter than taller ones. A real grid would give exact row/column tracking but force every card to the same height per row, which is the opposite of the visual effect this wall is going for.' },
      { q: 'How accurate is the col/row approximation given CSS columns reflow cards?', a: 'It is an approximation, not an exact measurement — i % COLS and Math.floor(i / COLS) assume a strict grid that column-count does not guarantee. It is intentionally good enough to produce a diagonal-looking wave without measuring getBoundingClientRect() on every card after layout settles.' },
      { q: 'Why does this snippet use animate__zoomIn instead of fadeInUp?', a: 'fadeInUp travels vertically as it animates, and on a dense multi-column wall with staggered timing, traveling cards can visually overlap the cards below them mid-animation. zoomIn scales in place with no travel, which avoids that collision.' },
      { q: 'What does offset: 50 change?', a: 'It shifts the trigger point WOW.js uses to decide an element has scrolled into view, requiring it to be 50px further into the viewport than the default edge check. It is a small buffer so cards don\'t reveal the instant one pixel is visible.' },
      { q: 'Can I change the number of columns?', a: 'Yes — update both the COLS constant in JS (used for the delay formula) and column-count in CSS to match. They are two separate values because CSS columns has no JS-readable "current column count" at render time.' },
      { q: 'Does the wall re-scan for new testimonials added later?', a: 'Yes, because WOW.js is initialized with live: true, which sets up a MutationObserver that picks up new .wow elements appended to the DOM after init() runs.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is worth discussing with an AI specifically around the col/row delay formula, since it's an approximation rather than an exact solution. Paste it into an AI assistant like Claude and ask it to explain why column-count layouts make DOM order and visual position diverge, and then ask it to design a more exact alternative — for example, measuring each card's actual offsetTop and offsetLeft after layout and deriving delay from real pixel position instead of the i % COLS guess. Compare the complexity cost against the visual improvement. Also worth asking: what happens to the stagger formula if TESTIMONIALS grows to 50 entries — does the wave still read cleanly, or does the accumulated row * 0.18 delay make the last cards feel sluggish, and how would you cap total delay with Math.min. To extend it: have it add a "load more" button that appends new testimonials and re-triggers reveals via WOW.js's live re-scan, or swap the star rating for an actual interactive rating input.`,
      prompt: `Build a "testimonial wall" using WOW.js (v1.1.2, from a CDN) and animate.css (v4, from a CDN) in plain HTML, CSS, and JavaScript.

Requirements:
- Define an array of at least 9 testimonial objects (name, role, quote, star rating 1-5) in JS, and render each as a card into a container using a CSS column-count: 3 layout (masonry-style, responsive to 2 then 1 columns), with break-inside: avoid on each card so none get split across columns.
- Each generated card must include class="wow animate__animated animate__zoomIn" and a computed data-wow-delay attribute — computed as col * 0.12 + row * 0.18 seconds, where col = index % 3 and row = Math.floor(index / 3), simulating a grid position even though CSS columns don't guarantee one. Explain in a code comment why this is an approximation (DOM order and visual position diverge under column-count) and why it's good enough without measuring real layout positions.
- Render a star rating as filled/empty star characters based on each testimonial's numeric rating.
- Initialize with new WOW({ offset: 50, live: true }).init() after the cards are appended.
- Style as a dark, premium testimonial wall with avatar initials, name, and role per card, and enough bottom page padding that the wall starts below the fold so the reveal is demonstrated on scroll.`,
    },
  },
};

export default wowJsStaggeredTestimonialWall;
