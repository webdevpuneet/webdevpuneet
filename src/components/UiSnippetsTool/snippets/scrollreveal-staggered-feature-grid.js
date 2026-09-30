const scrollrevealStaggeredFeatureGrid = {
  id: 'scrollreveal-staggered-feature-grid',
  title: 'ScrollReveal Staggered Feature Grid',
  lastmod: '2026-09-17',
  category: 'scroll',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/scrollreveal@4.0.9/dist/scrollreveal.min.js'],
  html: `<div class="sfg-stage">
  <div class="sfg-head">
    <span class="sfg-tag">scrollreveal · reset: false</span>
    <h2>Built for Scale</h2>
    <p>Scroll down — each card reveals once, from the bottom, staggered across the grid.</p>
  </div>
  <div class="sfg-grid">
    <div class="sfg-card"><div class="sfg-ico">⚡</div><h3>Instant Deploys</h3><p>Push to main, live in under 10 seconds.</p></div>
    <div class="sfg-card"><div class="sfg-ico">🔐</div><h3>Zero-Trust Auth</h3><p>Every request verified, nothing implicitly trusted.</p></div>
    <div class="sfg-card"><div class="sfg-ico">📦</div><h3>Edge Caching</h3><p>Static and dynamic content cached at 40+ PoPs.</p></div>
    <div class="sfg-card"><div class="sfg-ico">🧮</div><h3>Usage Analytics</h3><p>Per-endpoint cost and latency, out of the box.</p></div>
    <div class="sfg-card"><div class="sfg-ico">🔄</div><h3>Auto Rollback</h3><p>Bad deploys revert themselves within 30 seconds.</p></div>
    <div class="sfg-card"><div class="sfg-ico">🧩</div><h3>Plugin API</h3><p>Extend the pipeline without forking the core.</p></div>
  </div>
  <p class="sfg-note">Scroll back up, then down again — the grid does <strong>not</strong> replay. That's intentional.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c1016;color:#fff;min-height:150vh;padding:70px 24px}
.sfg-stage{max-width:760px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:32px}
.sfg-head{text-align:center}
.sfg-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#34d399;background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.3);padding:5px 12px;border-radius:99px;margin-bottom:12px}
.sfg-head h2{font-size:clamp(26px,5vw,38px);font-weight:800;letter-spacing:-.02em}
.sfg-head p{font-size:13.5px;color:#8ba397;margin-top:7px}

.sfg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;width:100%}
@media (max-width:680px){.sfg-grid{grid-template-columns:1fr}}
.sfg-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:22px;box-shadow:0 20px 50px -20px rgba(0,0,0,.7)}
.sfg-ico{font-size:24px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;border-radius:12px;background:rgba(52,211,153,.14);margin-bottom:14px}
.sfg-card h3{font-size:15px;font-weight:700;margin-bottom:6px}
.sfg-card p{font-size:12.5px;color:#8ba397;line-height:1.5}

.sfg-note{font-size:12.5px;color:#5c7168;text-align:center;max-width:440px}
.sfg-note strong{color:#8ba397}`,

  js: `// reset: false is a deliberate choice for a feature grid: once someone has
// seen the cards animate in, re-triggering the same fade every time they
// scroll past it again would feel repetitive rather than delightful. A hero
// section benefits from a replay; a mid-page feature grid usually doesn't.
var sr = ScrollReveal({ reset: false });

sr.reveal('.sfg-card', {
  origin: 'bottom',
  distance: '40px',
  duration: 650,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  interval: 110,
  opacity: 0,
});`,

  seo: {
    title: 'ScrollReveal Staggered Feature Grid — reset: false Explained',
    description: 'A 3-column feature grid whose cards stagger in from the bottom as it scrolls into view, using ScrollReveal.js interval with reset: false as an explicit design choice. Exports to React, Vue & Tailwind.',
    about: {
      title: 'ScrollReveal Staggered Feature Grid — Interval Stagger and reset: false, Explained',
      description: `This is the simplest possible ScrollReveal setup — one selector, one \`.reveal()\` call — and it's worth studying precisely *because* it's simple: almost every visual decision in it is one configuration option, and getting those options right (rather than reaching for custom JS) is the actual skill.

## The whole animation is six options

\`\`\`js
sr.reveal('.sfg-card', { origin: 'bottom', distance: '40px', duration: 650, easing: 'cubic-bezier(0.5, 0, 0, 1)', interval: 110, opacity: 0 });
\`\`\`

\`origin: 'bottom'\` plus \`distance: '40px'\` means each card starts 40px below its resting position; \`opacity: 0\` adds a fade on top of that translation (ScrollReveal combines them into one CSS transition automatically). \`duration\` and the cubic-bezier \`easing\` control the individual card's motion curve — this particular bezier, \`(0.5, 0, 0, 1)\`, is a strong ease-in-out that starts and ends with near-zero velocity, giving the card a smooth, confident settle rather than a linear slide.

## interval is why six cards read as one grid, not six separate pops

\`interval: 110\` is the option doing the "staggered" work: it delays each subsequent match in DOM order by 110ms relative to the one before it. Because the six cards are laid out left-to-right, top-to-bottom in a 3-column CSS grid, the stagger visually reads as a wave sweeping across each row — row 1's three cards cascade left to right, then row 2 picks up right where row 1 left off. This is a side effect of DOM order matching visual order, not something the grid explicitly encodes; reordering the cards in HTML without reordering them visually (e.g. via CSS \`order\`) would make the stagger direction disconnect from what the eye sees.

## reset: false, made explicit rather than left as a default

ScrollReveal's \`reset\` option defaults to \`false\`, so this snippet technically didn't need to set it — but it does so explicitly and comments why, because the choice is easy to get backwards. With \`reset: false\`, once a card has revealed, ScrollReveal detaches its observer for that element; scrolling back up and down again does nothing further to it. With \`reset: true\` (used deliberately in the companion [hero text reset](/ui-snippets/scrollreveal-hero-text-reset/) snippet), the element re-hides every time it exits the viewport and re-plays every time it re-enters — appropriate for a hero someone lands on repeatedly, actively wrong for a feature grid buried mid-page that a user might scroll past several times while reading; re-triggering the same six-card cascade on every pass would feel like the page is stuttering rather than delighting.

## Reusing it

The entire visual identity of this pattern — direction, distance, stagger speed, easing — lives in one options object. Swap \`origin: 'bottom'\` for \`'left'\` to change the sweep axis, or drop \`interval\` to 0 for cards that reveal in unison instead of cascading.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the ScrollReveal CDN', text: 'Include the scrollreveal UMD build from the CDN panel.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A 3-column, 6-card feature grid renders with all cards initially invisible.' },
      { title: 'Scroll the grid into view', text: 'Cards fade up from the bottom, cascading left to right, row by row, 110ms apart.' },
      { title: 'Scroll away and back', text: 'The grid does not replay — reset: false means each card reveals exactly once.' },
      { title: 'Tune the stagger feel', text: 'Raise interval for a slower cascade, or set it to 0 for all cards revealing together.' },
      { title: 'Add more cards', text: 'Append another .sfg-card element — the single reveal() selector picks it up automatically.' },
    ] },
    features: [
      { title: 'Single reveal() call', text: 'One selector and one options object animate the entire grid — no per-card JS.' },
      { title: 'DOM-order stagger', text: 'interval delays each match by its position in the DOM, which lines up with the visual grid order.' },
      { title: 'Explicit reset: false', text: 'The one-time-reveal behavior is set and commented deliberately, not left as an implicit default.' },
      { title: 'Combined translate + fade', text: 'origin/distance and opacity animate together as one CSS transition.' },
      { title: 'Confident easing curve', text: 'A cubic-bezier ease-in-out gives each card a settled, non-linear motion.' },
      { title: 'Responsive column collapse', text: 'The grid drops to a single column under 680px without touching the reveal config.' },
      { title: 'No layout shift on reveal', text: 'Only opacity and transform animate, so revealing cards never reflow the grid.' },
      { title: 'Config-only customization', text: 'Every visual property of the effect is one options object, easy to retune without touching structure.' },
    ],
    useCases: [
      { icon: 'APP', title: 'SaaS feature sections', text: 'The classic "why choose us" 3-column grid, given entrance polish.' },
      { icon: 'DESIGN', title: 'Portfolio skill grids', text: 'Stagger competency or service cards in as a visitor scrolls a personal site.' },
      { icon: 'CODE', title: 'Docs/changelog highlight cards', text: 'Draw attention to release highlights without an intrusive animation.' },
      { title: 'Team/testimonial grids', text: 'Any repeated card layout benefits from a one-time staggered entrance.' },
      { title: 'Pricing feature comparisons', text: 'Cascade the included-features list in below a pricing table.' },
      { title: 'Learning ScrollReveal defaults', text: 'A minimal reference for interval stagger and the reset option\'s real effect.' },
    ],
    faqs: [
      { q: 'Why does the stagger read as row-by-row rather than random?', a: 'interval delays each matched element by its position in DOM order, and because the six cards are written in the HTML in the same left-to-right, top-to-bottom order they appear in the 3-column grid, the delay sequence lines up with the visual sweep. It is a side effect of DOM order matching visual order, not something the grid layout enforces.' },
      { q: 'What exactly does reset: false prevent?', a: "With reset: false, ScrollReveal reveals each element once and then stops observing it — scrolling it out of view and back in does nothing further. With reset: true, it would re-hide the element every time it exits the viewport and animate it again every time it re-enters, which this snippet deliberately avoids so a feature grid a user scrolls past multiple times doesn't replay every pass." },
      { q: "Isn't reset: false already the default? Why set it explicitly?", a: "It is the default, but setting it explicitly and commenting why documents the decision as intentional rather than incidental — someone reading the code later (including future you) shouldn't have to know ScrollReveal's default to understand that replay-on-rescroll was considered and rejected for this component." },
      { q: 'How would I make cards reveal all at once instead of staggered?', a: 'Set interval to 0, or omit it entirely — with no interval, every matched card animates on the same timer relative to when it individually crosses the visibility threshold, so a grid fully inside the viewport at once would appear to reveal in unison.' },
      { q: 'Why animate both origin/distance and opacity instead of just one?', a: "A pure translate without opacity can look like the card was always there but just moving, especially with a short distance; a pure opacity fade with no motion can feel flat. Combining a modest 40px slide with a fade gives the reveal a sense of arrival without being a dramatic slide-in." },
      { q: 'Does this cause any layout shift as cards reveal?', a: 'No — ScrollReveal animates transform (for the origin/distance translation) and opacity, both of which are compositor-only properties that never trigger layout or paint of surrounding elements, so the grid and page around it stay perfectly stable while cards animate in.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is intentionally minimal, which makes it a good place to interrogate defaults rather than custom logic. Paste it into an AI assistant like Claude and ask it to explain precisely what reset: false changes about ScrollReveal's internal IntersectionObserver usage compared to reset: true, and why a feature grid is a better candidate for reset: false than a hero section is (the companion hero-text-reset snippet makes the opposite choice deliberately — worth comparing the two). Then ask what would happen visually if the six cards were reordered in the DOM without changing their visual grid position — the stagger direction would no longer match the sweep the eye sees. For extension, ask it to make the stagger interval scale dynamically with the number of cards, add a subtle scale transform alongside the existing translate/fade, or convert the single reveal() call into per-row reveal() calls with independent origins for a criss-cross effect.`,
      prompt: `Build a "staggered feature grid" using ScrollReveal.js (v4, from a CDN) in plain HTML, CSS, and JavaScript.

Requirements:
- A 3-column responsive CSS grid (collapsing to 1 column below 680px) of 6 feature cards, each with an icon, a bold title, and a short description, styled as a rounded, bordered, shadowed card on a dark background.
- Reveal the entire grid with a SINGLE ScrollReveal reveal() call targeting all .sfg-card elements — no per-card JavaScript loop.
- The reveal config must use origin: 'bottom', a distance around 40px, opacity: 0, a cubic-bezier ease-in-out easing curve, and an interval (around 110ms) so cards stagger in DOM order — which, because the cards are written in the same order they appear visually in the grid, produces a left-to-right, row-by-row cascade.
- Explicitly set reset: false when constructing the ScrollReveal instance, and add a code comment explaining that this is a deliberate design choice for a feature grid (which a user might scroll past multiple times while reading a page) as opposed to a hero section a user usually only sees once per visit, where replaying the reveal (reset: true) is more appropriate.
- Make the page tall enough (e.g. min-height: 150vh on body) that the grid starts below the fold, so the reveal-on-scroll behavior is actually visible on load.
- Include a small caption below the grid noting that scrolling away and back does not replay the animation, as a visible demonstration of reset: false.
- Style it as a dark theme with a green accent color, soft shadows, and generous card padding.`,
    },
  },
};

export default scrollrevealStaggeredFeatureGrid;
