const scrollrevealFadeTimeline = {
  id: 'scrollreveal-fade-timeline',
  title: 'ScrollReveal Fade Timeline',
  lastmod: '2026-09-17',
  category: 'scroll',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/scrollreveal@4.0.9/dist/scrollreveal.min.js'],
  html: `<div class="srt-stage">
  <div class="srt-head">
    <span class="srt-tag">scrollreveal · alternating origin</span>
    <h2>Company Timeline</h2>
    <p>Scroll down — each entry fades in from alternating sides as it enters the viewport.</p>
  </div>
  <div class="srt-timeline">
    <div class="srt-line"></div>
    <div class="srt-item" data-side="left">
      <div class="srt-dot"></div>
      <div class="srt-card"><span class="srt-year">2019</span><h3>Founded</h3><p>Three engineers, one laptop, zero customers.</p></div>
    </div>
    <div class="srt-item" data-side="right">
      <div class="srt-dot"></div>
      <div class="srt-card"><span class="srt-year">2020</span><h3>First 100 Users</h3><p>Word of mouth carried us through a rough year.</p></div>
    </div>
    <div class="srt-item" data-side="left">
      <div class="srt-dot"></div>
      <div class="srt-card"><span class="srt-year">2022</span><h3>Series A</h3><p>$8M raised to build out the platform team.</p></div>
    </div>
    <div class="srt-item" data-side="right">
      <div class="srt-dot"></div>
      <div class="srt-card"><span class="srt-year">2024</span><h3>1M Requests/Day</h3><p>Crossed a million daily API calls in production.</p></div>
    </div>
    <div class="srt-item" data-side="left">
      <div class="srt-dot"></div>
      <div class="srt-card"><span class="srt-year">2026</span><h3>Global Launch</h3><p>Live in 40 countries with a fully remote team.</p></div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0e17;color:#fff;min-height:100vh;padding:60px 24px}
.srt-stage{max-width:640px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:50px}
.srt-head{text-align:center}
.srt-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#60a5fa;background:rgba(96,165,250,.12);border:1px solid rgba(96,165,250,.3);padding:5px 12px;border-radius:99px;margin-bottom:12px}
.srt-head h2{font-size:clamp(24px,5vw,34px);font-weight:800;letter-spacing:-.02em}
.srt-head p{font-size:13.5px;color:#8b98b8;margin-top:7px}

.srt-timeline{position:relative;width:100%;display:flex;flex-direction:column;gap:44px;padding:10px 0}
.srt-line{position:absolute;left:50%;top:0;bottom:0;width:2px;background:linear-gradient(180deg,rgba(96,165,250,0),rgba(96,165,250,.5),rgba(96,165,250,0));transform:translateX(-50%)}
.srt-item{position:relative;width:calc(50% - 26px)}
.srt-item[data-side="left"]{margin-right:auto;text-align:right}
.srt-item[data-side="right"]{margin-left:auto;text-align:left}
.srt-dot{position:absolute;top:6px;width:14px;height:14px;border-radius:50%;background:#0a0e17;border:3px solid #60a5fa;box-shadow:0 0 0 5px rgba(96,165,250,.14)}
.srt-item[data-side="left"] .srt-dot{right:-33px}
.srt-item[data-side="right"] .srt-dot{left:-33px}
.srt-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:18px 20px;box-shadow:0 18px 40px -18px rgba(0,0,0,.7)}
.srt-year{font-size:11px;font-weight:700;letter-spacing:.08em;color:#60a5fa}
.srt-card h3{font-size:15.5px;font-weight:700;margin:5px 0 6px}
.srt-card p{font-size:12.5px;color:#8b98b8;line-height:1.5}
@media (max-width:560px){.srt-item,.srt-item[data-side="left"],.srt-item[data-side="right"]{width:calc(100% - 46px);margin-left:46px;text-align:left}.srt-line{left:14px}.srt-item[data-side="left"] .srt-dot,.srt-item[data-side="right"] .srt-dot{left:-33px;right:auto}}`,

  js: `var sr = ScrollReveal({ reset: false });

// Alternate origin per side so left entries slide in from the left
// and right entries slide in from the right, reinforcing the timeline's axis.
sr.reveal('.srt-item[data-side="left"]', {
  origin: 'left',
  distance: '46px',
  duration: 700,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  interval: 120,
});

sr.reveal('.srt-item[data-side="right"]', {
  origin: 'right',
  distance: '46px',
  duration: 700,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  interval: 120,
});

sr.reveal('.srt-dot', {
  scale: 0.3,
  distance: '0px',
  duration: 500,
  delay: 200,
});

sr.reveal('.srt-line', {
  origin: 'top',
  distance: '0px',
  scale: 1,
  duration: 1200,
  opacity: 0,
  reset: false,
});`,

  seo: {
    title: 'ScrollReveal Fade Timeline — Alternating Origin Snippet',
    description: 'A vertical company timeline where each entry fades in from alternating left/right origins as it scrolls into view, using ScrollReveal.js per-side selectors. Exports to React, Vue & Tailwind.',
    about: {
      title: 'ScrollReveal Fade Timeline — Alternating Origins and IntersectionObserver, Explained',
      description: `A plain scroll-reveal list — every item fading up from the bottom — reads as a generic feed. A **timeline** needs the motion to reinforce the layout: entries on the left side of the spine should feel like they're arriving from the left, and entries on the right should arrive from the right. ScrollReveal.js makes this a matter of calling \`.reveal()\` twice with different selectors rather than writing any custom observer code.

## Two reveal calls, one per side

\`\`\`js
sr.reveal('.srt-item[data-side="left"]', { origin: 'left', distance: '46px', interval: 120 });
sr.reveal('.srt-item[data-side="right"]', { origin: 'right', distance: '46px', interval: 120 });
\`\`\`

ScrollReveal's \`origin\` option sets which direction the element travels *from* — \`'left'\` means the element starts \`distance\` pixels to the left of its resting position and slides right into place, translated with opacity. Because the HTML already marks each timeline entry with \`data-side="left"\` or \`data-side="right"\`, two separate attribute selectors let each side get its own reveal configuration without any JavaScript branching — the CSS attribute selector does the routing.

## What interval does versus what you might expect from "stagger"

\`interval: 120\` staggers elements matched by **that one** \`.reveal()\` call, delaying each subsequent match by 120ms relative to the previous one *in that selector's own match order*. Because left and right items are revealed by two independent calls, the stagger is scoped per side — left items stagger against each other, right items stagger against each other, and both groups start their timers as they individually enter the viewport (ScrollReveal uses an IntersectionObserver under the hood, not a fixed page-load timer), so items further down the page naturally reveal later regardless of interval.

## Under the hood: IntersectionObserver, not scroll events

ScrollReveal.js v4 replaced its old scroll-listener implementation with **IntersectionObserver**, which is why this snippet doesn't debounce or throttle anything — there's no scroll handler to throttle. Each revealed element gets its own observer entry; when it crosses the configured threshold (roughly 20% visible by default) the callback fires the CSS transition. This is dramatically cheaper than polling \`getBoundingClientRect()\` on scroll, especially with dozens of timeline entries.

## The spine line and dots

The vertical \`.srt-line\` gets its own subtle reveal (opacity fade with no translation) so it doesn't compete visually with the entries, and each \`.srt-dot\` reveals with a \`scale\` animation and a short \`delay\` so the dot "pops" into place slightly after its card starts sliding in — a small sequencing detail that makes the connection between dot and card read as intentional rather than coincidental.

## Reusing it

Because the reveal logic is entirely selector-driven, adding a sixth timeline entry means adding one \`data-side\` HTML block — no JS changes required. Swap the alternating pattern for a single-column layout by revealing everything with the same \`origin\`.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the ScrollReveal CDN', text: 'Include the scrollreveal UMD build from the CDN panel.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A five-entry timeline renders with a central spine and alternating left/right cards.' },
      { title: 'Scroll down the page', text: 'Left-side entries slide in from the left, right-side entries from the right, staggered per side.' },
      { title: 'Add more entries', text: 'Duplicate an .srt-item block with the opposite data-side value — no JS changes needed.' },
      { title: 'Tune the stagger', text: 'Adjust interval (currently 120ms) to speed up or slow down how quickly items on the same side cascade.' },
      { title: 'Change the reveal direction', text: "Swap origin: 'left'/'right' for 'bottom' on both selectors for a simpler single-direction reveal." },
    ] },
    features: [
      { title: 'Attribute-selector routing', text: 'data-side="left"/"right" lets two .reveal() calls target each side without JS branching.' },
      { title: 'Per-side stagger scope', text: 'interval staggers each selector\'s own match order independently, so both sides cascade in parallel.' },
      { title: 'IntersectionObserver-driven', text: 'ScrollReveal v4 observes visibility natively — no scroll-event polling or throttling code needed.' },
      { title: 'Directional origin per axis', text: "origin: 'left'/'right' reinforces the timeline's left-right layout instead of a generic bottom fade." },
      { title: 'Independent dot animation', text: 'Spine dots scale in with a short delay so they visibly connect to their card.' },
      { title: 'Subtle spine reveal', text: 'The connecting line fades in on its own schedule instead of competing with entry motion.' },
      { title: 'Responsive single-column fallback', text: 'CSS collapses the alternating layout to one column with left-aligned dots on narrow screens.' },
      { title: 'Zero manual observer code', text: 'The entire effect is configuration passed to sr.reveal() — no IntersectionObserver written by hand.' },
    ],
    useCases: [
      { icon: 'FLOW', title: 'Company/product timelines', text: 'About pages and changelogs where chronology is the point.' },
      { icon: 'LEARN', title: 'Course/roadmap progress', text: 'Show completed and upcoming milestones as a learner scrolls.' },
      { icon: 'DESIGN', title: 'Case study narratives', text: 'Walk through a project\'s phases with alternating supporting screenshots.' },
      { title: 'Event schedules', text: 'Conference or launch-day agendas presented as a scrolling spine.' },
      { title: 'Resume/CV pages', text: 'Career history revealed as the visitor scrolls, left/right per role.' },
      { title: 'Learning ScrollReveal selectors', text: 'A concrete example of routing reveal config via data attributes instead of JS conditionals.' },
    ],
    faqs: [
      { q: 'Why call .reveal() twice instead of once for all timeline items?', a: "Each call configures a distinct origin direction — 'left' for the left-side selector, 'right' for the right-side one. ScrollReveal's reveal() takes one origin per call, so two selectors (routed by the existing data-side attribute) is the simplest way to give each side its own travel direction without writing conditional JS." },
      { q: 'Does interval stagger left and right items together or separately?', a: "Separately. interval staggers matches within a single reveal() call in the order they appear in the DOM for that selector, so the five left-side items stagger against each other and the right-side items stagger against each other, each group timed relative to when its own elements individually cross the viewport threshold." },
      { q: 'Does ScrollReveal poll scroll position?', a: "No — version 4 uses IntersectionObserver internally, which the browser fires natively when an element crosses a visibility threshold, rather than ScrollReveal manually listening to scroll events and computing getBoundingClientRect() on every frame. That's why nothing in this snippet needs debouncing." },
      { q: 'Why does the spine dot delay slightly behind the card?', a: "The dot's reveal call includes delay: 200, so its scale-in animation starts 200ms after it would otherwise. Combined with the card's slide-in duration of 700ms, the dot visibly 'catches up' to and locks onto the card mid-slide, reading as a deliberate connection rather than two unrelated animations." },
      { q: 'How do I add a sixth timeline entry?', a: 'Add another .srt-item block in the HTML with data-side set to "left" or "right" and it is automatically picked up — the reveal() selectors target the data-side attribute generically, so no JavaScript needs to change when the timeline grows.' },
      { q: 'What does reset: false do here, and could I set it to true?', a: "reset: false (the default passed at ScrollReveal({ reset: false })) means each entry reveals once and stays visible on scroll-up. Setting it true would re-hide and re-animate every entry each time it leaves and re-enters the viewport — appropriate for a hero section you want to replay, but distracting on a long timeline someone might scroll past repeatedly." },
    ],
    aiPrompt: {
      paragraph: `This snippet is a good example of letting data attributes route configuration instead of writing conditional JavaScript. Paste it into an AI assistant like Claude and ask it to explain exactly how two separate sr.reveal() calls, scoped by the data-side attribute selector, produce independent stagger groups that still visually interleave correctly down the page. Then ask what would happen if reset were set to true — items further up would re-hide and re-play every time you scrolled back past them, which is worth trying live to feel the difference from the default reset: false. For extension, ask it to add a progress indicator that fills the spine line proportional to scroll position, make the active (most recently revealed) entry get a persistent highlight, or convert the two-call pattern into a single reusable function that takes a side name and returns the right origin.`,
      prompt: `Build a vertical "fade timeline" using ScrollReveal.js (v4, from a CDN) in plain HTML, CSS, and JavaScript.

Requirements:
- A vertical timeline with a centered connecting spine line and 5 dated entries alternating left/right of the spine, each entry marked with a data-side="left" or data-side="right" attribute and containing a year label, a title, and a short description in a card.
- Each card has a small circular dot on the spine at its vertical position.
- Configure ScrollReveal with reset: false globally (entries reveal once and stay visible).
- Call sr.reveal() TWICE: once targeting '[data-side="left"]' with origin: 'left', and once targeting '[data-side="right"]' with origin: 'right' — so left-side cards slide in from the left and right-side cards slide in from the right, reinforcing the timeline's axis. Give both an interval (e.g. 120ms) so same-side entries stagger against each other as they individually scroll into view.
- Separately reveal the spine dots with a scale-in animation and a short delay (e.g. 200ms) so each dot visibly locks into place slightly after its card starts sliding in.
- Reveal the spine line itself with a subtle opacity-only fade, distinct from the card/dot animations.
- Make it responsive: collapse to a single left-aligned column with dots on the left edge below 560px width.
- Style it as a dark, minimal theme with a blue accent color, soft card shadows, and generous vertical spacing between entries.`,
    },
  },
};

export default scrollrevealFadeTimeline;
