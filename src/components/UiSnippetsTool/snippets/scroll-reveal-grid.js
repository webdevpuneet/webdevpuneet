const scrollRevealGrid = {
  id: 'scroll-reveal-grid',
  title: 'Scroll Reveal Grid',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="rg-intro"><h1>Our work</h1><p>Scroll — cards rise in as their row appears.</p></section>
<section class="rg-grid" id="rgGrid">
  <article class="rg-card"><span class="rg-tag">Brand</span><h3>Northwind</h3></article>
  <article class="rg-card"><span class="rg-tag">App</span><h3>Cadence</h3></article>
  <article class="rg-card"><span class="rg-tag">Web</span><h3>Lumen</h3></article>
  <article class="rg-card"><span class="rg-tag">Motion</span><h3>Drift</h3></article>
  <article class="rg-card"><span class="rg-tag">Brand</span><h3>Harbor</h3></article>
  <article class="rg-card"><span class="rg-tag">App</span><h3>Pulse</h3></article>
  <article class="rg-card"><span class="rg-tag">Web</span><h3>Atlas</h3></article>
  <article class="rg-card"><span class="rg-tag">Motion</span><h3>Ember</h3></article>
  <article class="rg-card"><span class="rg-tag">Brand</span><h3>Verde</h3></article>
</section>
<section class="rg-outro"><p>Each card revealed once, with a stagger.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0c14;color:#fff}
.rg-intro,.rg-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.rg-intro h1{font-size:clamp(34px,7vw,68px);letter-spacing:-.02em}
.rg-intro p,.rg-outro p{color:#9aa0b8;font-size:16px}
.rg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px;padding:clamp(20px,5vw,60px);max-width:1080px;margin:0 auto}
.rg-card{aspect-ratio:4/3;border-radius:18px;padding:18px;display:flex;flex-direction:column;justify-content:flex-end;gap:6px;background:linear-gradient(160deg,#1a2036,#11141f);border:1px solid #232a3d;will-change:transform,opacity}
.rg-card:nth-child(4n+1){background:linear-gradient(160deg,#3a1d5c,#15101f)}
.rg-card:nth-child(4n+2){background:linear-gradient(160deg,#123a4a,#0e1620)}
.rg-card:nth-child(4n+3){background:linear-gradient(160deg,#3a2a12,#1a1408)}
.rg-tag{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#c4b5fd}
.rg-card h3{font-size:22px;letter-spacing:-.01em}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Reveal cards in a staggered grid wave when the grid scrolls into view (once).
gsap.from('#rgGrid .rg-card', {
  y: 60,
  opacity: 0,
  duration: 0.7,
  ease: 'power3.out',
  stagger: { each: 0.08, grid: 'auto', from: 'start' },
  scrollTrigger: {
    trigger: '#rgGrid',
    start: 'top 75%',
    toggleActions: 'play none none reverse'
  }
});`,

  seo: {
    title: 'Scroll Reveal Grid — Free GSAP ScrollTrigger Staggered Grid',
    description: `A card grid that rises and fades in with a grid-aware stagger when it scrolls into view, using GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Reveal Grid — Cards That Rise in With a Staggered Wave',
      description: `The scroll reveal grid is the portfolio or feature grid where cards lift up and fade in one after another as the section scrolls into view, instead of appearing all at once — the polished entrance on agency and product pages. This snippet builds it with GSAP and ScrollTrigger (from a CDN), plus a responsive CSS grid.

**One tween, many cards**

A single \`gsap.from\` animates every card from \`y: 60\` and \`opacity: 0\` up to its resting state. Using \`from\` means GSAP records each card's natural position, animates it out of that offset state, and lands it exactly where the CSS grid placed it — so you never hard-code final positions, and the reveal works no matter how the responsive grid wraps.

**Grid-aware stagger**

The magic is \`stagger: { each: 0.08, grid: 'auto', from: 'start' }\`. With \`grid: 'auto'\`, GSAP reads the cards' actual row-and-column layout and offsets each card's start time based on its position, producing a diagonal wave that ripples across the grid rather than a flat left-to-right list. \`each: 0.08\` sets the gap between cards; \`from: 'start'\` begins the wave at the top-left. This is the difference between a generic fade and a reveal that feels choreographed to the layout.

**Triggered once, reversible**

The ScrollTrigger fires at \`start: 'top 75%'\` — when the grid's top reaches 75% down the viewport, so the cards begin revealing just before they're fully in view. \`toggleActions: 'play none none reverse'\` plays the entrance on the way in and reverses it if you scroll the grid back out of view, so re-entering replays it cleanly without a manual reset.

**Smooth, GPU-friendly motion**

The animation only touches \`transform\` (the y offset) and \`opacity\`, both composited on the GPU, with \`power3.out\` easing so each card decelerates as it settles. \`will-change\` on the cards hints the compositor. Because nothing reflows, even a large grid reveals without jank.

**Responsive grid underneath**

The grid uses \`repeat(auto-fill, minmax(220px, 1fr))\`, so it reflows from one to several columns by width — and the grid-aware stagger adapts automatically, since it reads the live layout each time. The cards use \`aspect-ratio\` so they stay proportional at any column count.

**Customizing it**

Change the rise distance, the stagger spacing or origin (\`'center'\`, \`'edges'\`), the easing, or the trigger point; swap \`from\` for a scale or blur entrance. Pair it with [feature cards](/ui-snippets/feature-cards/), a [portfolio filter grid](/ui-snippets/portfolio-filter-grid/), or [stagger list](/ui-snippets/stagger-list/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `An intro, a card grid, and an outro render.` },
      { title: 'Scroll to the grid', text: `Cards rise and fade in as a diagonal wave.` },
      { title: 'Scroll it out and back', text: `The reveal reverses, then replays.` },
      { title: 'Resize the window', text: `The grid reflows; the stagger adapts.` },
      { title: 'Tune the wave', text: `Change stagger each, from, and easing.` },
    ] },
    features: [
      { title: 'Single from tween', text: `Lands cards at their grid positions.` },
      { title: 'Grid-aware stagger', text: `Diagonal wave reads the live layout.` },
      { title: 'Early trigger', text: `Starts at top 75% before full view.` },
      { title: 'Replay on re-enter', text: `toggleActions reverses then replays.` },
      { title: 'GPU motion', text: `Only transform and opacity animate.` },
      { title: 'Eased settle', text: `power3.out decelerates each card.` },
      { title: 'Responsive grid', text: `auto-fill columns adapt by width.` },
      { title: 'Proportional cards', text: `aspect-ratio keeps shape at any count.` },
    ],
    useCases: [
      { title: 'Portfolios', text: `Reveal a [portfolio filter grid](/ui-snippets/portfolio-filter-grid/).` },
      { title: 'Feature sections', text: `Animate [feature cards](/ui-snippets/feature-cards/) in.` },
      { title: 'Galleries', text: `Pair with a [photo gallery](/ui-snippets/photo-gallery/).` },
      { title: 'Lists', text: `A grid sibling of [stagger list](/ui-snippets/stagger-list/).` },
      { title: 'Team pages', text: `Reveal a [team card](/ui-snippets/team-card/) grid.` },
      { title: 'Products', text: `Enter a [product card](/ui-snippets/product-card/) grid.` },
      { icon: 'CODE', title: 'Related: Scroll Velocity Motion Blur', desc: 'See the [Scroll Velocity Motion Blur](/ui-snippets/scroll-velocity-blur/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do the cards land in the right place?', a: `A single gsap.from animates every card from y: 60 and opacity: 0 to its resting state. Because from records each card's natural position and animates out of the offset, GSAP lands each card exactly where the CSS grid placed it — so you never hard-code final positions and the reveal works however the responsive grid wraps.` },
      { q: 'What makes the reveal a diagonal wave?', a: `The stagger uses grid: auto, which tells GSAP to read the cards' real row and column layout and offset each card's start time by its position, producing a wave that ripples diagonally across the grid. each: 0.08 sets the spacing and from: start begins at the top-left, so it feels choreographed to the layout rather than a flat sequence.` },
      { q: 'Does it replay when scrolling back?', a: `Yes. toggleActions: play none none reverse plays the entrance when the grid enters and reverses it when the grid leaves the top, so scrolling away and back replays the reveal cleanly without a manual reset. The trigger fires at top 75%, so cards start animating just before they are fully in view.` },
      { q: 'Does the stagger still work after a resize?', a: `It does, because grid: auto reads the live layout when the animation runs. The CSS grid uses auto-fill columns that reflow by width, and the grid-aware stagger adapts to whatever row and column arrangement is current, so the diagonal wave stays correct from one column on mobile to several on desktop.` },
      { q: 'How do I use this scroll reveal grid in React, Vue, or Angular?', a: `Render the grid, then in a mount effect register ScrollTrigger and create the gsap.from on the cards scoped to a container ref (use gsap.context or a scoped selector). Return a cleanup that reverts the context so triggers are removed on unmount. If the list is dynamic, recreate or refresh ScrollTrigger after the items render. The CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out the stagger configuration on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the grid: auto stagger option reads the cards' real row and column positions to produce a diagonal wave instead of a flat sequential list, or why using gsap.from rather than a manual keyframe lets the reveal land cards at whatever position the responsive CSS grid actually placed them. The same assistant can help optimize it — asking whether toggleActions: play none none reverse is the right choice for a grid with dozens of cards versus play none none none, or whether the stagger's each value should scale down as card count grows. It's also useful for extending the effect: ask it to add a filterable category system that re-triggers the reveal for the visible subset, swap the rise-and-fade for a scale-and-blur entrance, or make the wave originate from the center instead of the start. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll reveal grid" card entrance effect in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN).

Requirements:
- A CSS grid of card elements using repeat(auto-fill, minmax(220px, 1fr)) so the number of columns responds to viewport width, with each card given a fixed aspect-ratio so cards stay proportional regardless of column count.
- A single gsap.from call (not one tween per card) targeting all cards, animating them from an offset y position and opacity 0 up to their natural resting position and full opacity — do not hardcode each card's final x/y position, since the CSS grid must remain the single source of truth for layout.
- Use GSAP's stagger option in its object form with grid set to auto (not a fixed row/column number) so GSAP detects the actual grid layout at animation time and offsets each card's start time based on its real row and column position, producing a diagonal reveal wave rather than a left-to-right list order.
- Attach a single ScrollTrigger to the grid container with a start point of roughly when the grid's top is 75% down the viewport (before it's fully in view) and toggleActions set to play the reveal on enter and reverse it if the grid scrolls back out of view, so re-scrolling into the grid replays the animation cleanly.
- Only animate transform-based properties (the y offset) and opacity so the reveal stays GPU-composited with no layout reflow, and use an easing curve that decelerates into the resting position (e.g. a power3 out ease) rather than linear motion.
- Confirm resizing the browser window, which changes how many columns the auto-fill grid produces, does not break the diagonal wave — since grid: auto re-reads the live layout each time the animation is triggered.`,
    },
  },
};

export default scrollRevealGrid;
