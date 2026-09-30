const animeJsStaggerGrid = {
  id: 'anime-js-stagger-grid',
  title: 'Anime.js Stagger Grid',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js',
  ],
  html: `<section class="ag-wrap">
  <div class="ag-head">
    <h1>Anime.js Stagger Grid</h1>
    <p>A grid-aware stagger that ripples outward from the center tile.</p>
    <button class="ag-btn" id="agReplay">Replay animation</button>
  </div>
  <div class="ag-grid" id="agGrid">
    <div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div>
    <div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div>
    <div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div>
    <div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div>
    <div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div><div class="ag-tile"></div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b12;color:#fff;min-height:100vh;display:flex;align-items:center}
.ag-wrap{width:100%;max-width:640px;margin:0 auto;padding:clamp(24px,6vw,56px);display:flex;flex-direction:column;gap:28px;align-items:center;text-align:center}
.ag-head h1{font-size:clamp(28px,5vw,42px);letter-spacing:-.02em;background:linear-gradient(135deg,#f472b6,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent}
.ag-head p{color:#9aa0c0;margin-top:8px;font-size:15px}
.ag-btn{margin-top:16px;padding:11px 24px;border-radius:999px;border:1px solid #383f5c;background:#161a2c;color:#fff;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:border-color .2s,transform .15s}
.ag-btn:hover{border-color:#818cf8}
.ag-btn:active{transform:scale(.96)}
.ag-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;width:100%}
.ag-tile{aspect-ratio:1;border-radius:12px;background:linear-gradient(150deg,#312e6b,#1b1533);opacity:0;transform:scale(0)}
.ag-tile:nth-child(3n+1){background:linear-gradient(150deg,#5b2154,#1b1533)}
.ag-tile:nth-child(3n+2){background:linear-gradient(150deg,#173a5e,#111a30)}`,

  js: `const grid = document.querySelectorAll('#agGrid .ag-tile');

function playGrid() {
  anime({
    targets: grid,
    scale: [0, 1],
    opacity: [0, 1],
    borderRadius: ['50%', '12px'],
    easing: 'easeOutExpo',
    duration: 900,
    delay: anime.stagger(60, { grid: [5, 5], from: 'center' })
  });
}

// Play once on load, then let the button replay it on demand.
playGrid();
document.getElementById('agReplay').addEventListener('click', playGrid);`,

  seo: {
    title: 'Anime.js Stagger Grid — Free Grid-Aware Stagger Animation Snippet',
    description: `A 5x5 tile grid that pops in with anime.js's grid-aware stagger, rippling outward from the center tile. CDN-only, no build step. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Anime.js Stagger Grid — Tiles That Ripple Outward From the Center',
      description: `The stagger grid is the moment a dashboard, portfolio, or landing section feels alive instead of static — every tile appearing on its own beat rather than all at once. This snippet builds it with [anime.js](https://animejs.com) loaded from a CDN, using its \`grid\`-aware \`anime.stagger\` helper so the delay between tiles is computed from their actual row and column position rather than their order in the DOM. It's a close cousin of [scroll reveal grid](/ui-snippets/scroll-reveal-grid/), but driven by a click or page-load trigger instead of scroll position, and by anime.js's own timing engine instead of GSAP.

**Grid-aware stagger, not list-aware stagger**

A plain \`anime.stagger(60)\` just adds 60ms per element in DOM order, which reads as a diagonal-ish line at best. Passing \`grid: [5, 5]\` tells anime.js the tiles form a five-by-five layout, so it can compute each tile's real (row, column) coordinates and derive delay from actual 2D distance. Combined with \`from: 'center'\`, the delay is shortest for the middle tile and grows outward in concentric rings — a ripple, not a sweep.

**One targets array, three animated properties**

The single \`anime({...})\` call animates \`scale\`, \`opacity\`, and \`borderRadius\` together across all 25 tiles. Starting \`scale\` at 0 and \`borderRadius\` at \`50%\` means every tile begins as an invisible dot and blooms into a rounded square, which reads as more purposeful than a flat fade. \`easeOutExpo\` gives each tile a fast pop that settles gently, matching the punchy feel of the ripple.

**Replayable on demand**

\`playGrid()\` is a plain function called once on load and again from the "Replay animation" button, so anime.js's timeline is simply recreated each time rather than manually reversed — the simplest way to make a one-shot stagger repeatable without managing timeline state.

**Where this pattern fits**

Use it for onboarding checklists, dashboard widget grids, icon/feature grids, or a gallery of thumbnails that should feel choreographed on first paint. It pairs naturally with [bento grid](/ui-snippets/bento-grid/) layouts and with [stagger list](/ui-snippets/stagger-list/) when you need the same ripple treatment for a single column instead of a grid.

**Customizing it**

Change the \`grid\` dimensions to match your actual column/row count (a mismatch will still stagger, just not accurately), switch \`from\` to \`'first'\`, \`'last'\`, or a specific index, or swap the animated properties for a rotation or color shift. Anime.js also supports staggering \`duration\` and \`delay\` independently, so tiles further from center can take visibly longer as well as start later.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the anime.js CDN', text: `Include anime.min.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A 25-tile grid renders, hidden and scaled to zero.` },
      { title: 'Watch it load', text: `Tiles pop in, rippling outward from the center.` },
      { title: 'Click "Replay animation"', text: `The stagger runs again from a clean state.` },
      { title: 'Adjust grid dimensions', text: `Match anime.stagger's grid option to your layout.` },
      { title: 'Change the origin', text: `Swap from: 'center' for 'first', 'last', or an index.` },
    ] },
    features: [
      { title: 'Grid-aware stagger', text: `Delay derives from real row/column distance.` },
      { title: 'Center-out ripple', text: `from: 'center' concentrates the wave in the middle.` },
      { title: 'Three properties in one call', text: `Scale, opacity, and radius animate together.` },
      { title: 'Dot-to-square morph', text: `borderRadius eases from 50% to 12px.` },
      { title: 'Punchy easing', text: `easeOutExpo pops fast, settles smooth.` },
      { title: 'Replayable', text: `A button re-runs the same animation on demand.` },
      { title: 'CDN-only setup', text: `One script tag, no bundler required.` },
      { title: 'Responsive grid', text: `CSS grid columns adapt independent of the stagger math.` },
    ],
    useCases: [
      { title: 'Dashboards', text: `Stagger a widget grid on first paint.` },
      { title: 'Bento layouts', text: `Pair with [bento grid](/ui-snippets/bento-grid/) tiles.` },
      { title: 'Onboarding', text: `Reveal checklist steps in a ripple.` },
      { title: 'Galleries', text: `Pop in thumbnails instead of a flat fade.` },
      { title: 'Feature sections', text: `A grid cousin of [stagger list](/ui-snippets/stagger-list/).` },
      { title: 'Loading states', text: `Replace a [skeleton dashboard](/ui-snippets/skeleton-dashboard/) reveal.` },
      { icon: 'CODE', title: 'Related: Anime.js Ripple Grid', desc: 'See the [Anime.js Ripple Grid](/ui-snippets/anime-ripple-grid/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Cursor Circle Image Reveal', desc: 'See the [Cursor Circle Image Reveal](/ui-snippets/cursor-image-mask-reveal/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What does grid: [5, 5] actually do in anime.stagger?', a: `It tells anime.js the targets form a 5-column by 5-row layout, so instead of using DOM order to compute each element's delay, it derives each tile's (row, column) coordinates and bases the delay on real 2D distance from the stagger's origin. Without it, anime.stagger just adds a fixed increment per element in list order, which produces a much flatter, less choreographed motion.` },
      { q: 'How does from: "center" create a ripple?', a: `It sets the distance-zero point at the grid's middle tile (or the closest tile to center for an even grid), so every other tile's delay grows with its distance from that point. Tiles equidistant from the center animate at the same time, producing expanding concentric rings rather than a corner-to-corner sweep.` },
      { q: 'Why replay by calling playGrid() again instead of reversing the timeline?', a: `Because the animation starts every tile at scale: 0 and opacity: 0, simply re-running anime({...}) on the same targets restarts them from that same visual state — anime.js overwrites the in-progress or completed animation on those targets. That's simpler than keeping a timeline reference around and calling reverse(), and it works identically whether the grid finished, is still running, or was never played.` },
      { q: 'Does the stagger grid dimension need to exactly match the tile count?', a: `It should for accurate spacing — 25 tiles with grid: [5, 5] gives each tile a unique, correct coordinate. If the grid option doesn't match the actual tile count, anime.js still staggers using whatever grid you specify, but the computed distances no longer line up with the visual layout, so the ripple can look uneven or clipped at the edges.` },
      { q: 'Can I stagger duration as well as delay?', a: `Yes. anime.stagger() can be passed to the duration property too, not just delay, so tiles further from the origin can take measurably longer to complete as well as start later — for example duration: anime.stagger(400, { start: 600, grid: [5, 5], from: 'center' }) makes the ripple's edges feel like they're drifting to a stop rather than snapping in place.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reverse-engineer anime.js's grid-distance math by reading its source. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how passing grid: [5, 5] and from: 'center' to anime.stagger converts each tile's DOM position into a 2D coordinate and a ripple delay, or why animating scale from 0 alongside a borderRadius tween produces a "bloom" feel rather than a flat pop. The same assistant can help optimize it — asking whether the tile count should drive the grid dimensions dynamically instead of being hardcoded, or whether easeOutExpo is the right curve for a denser grid with more tiles. It's also useful for extending the effect: ask it to stagger a color or rotation change alongside the scale, trigger the ripple on scroll into view using an IntersectionObserver instead of load, or make from configurable so the ripple can start from a corner. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "stagger grid" tile entrance animation in plain HTML, CSS, and JavaScript using anime.js (load it from a CDN, no build step).

Requirements:
- A CSS grid of at least 25 identical tile elements arranged in a fixed number of columns and rows so the layout is a true rectangular grid, not a wrapped flex list.
- Every tile starts fully invisible and scaled to zero via inline or CSS defaults so no flash-of-unstyled-content occurs before the animation library runs.
- A single anime({ targets, ... }) call (not one animation per tile) that animates scale from 0 to 1, opacity from 0 to 1, and border-radius from a circle to a rounded square, all in the same call.
- Use anime.stagger for the delay option with its object form, passing a grid option matching the actual column and row count of the tile grid, and a from option set to 'center' so the animation's delay is computed from each tile's real 2D distance to the middle tile rather than its order in the DOM — the effect should read as a ripple expanding outward from the center, not a corner-to-corner sweep.
- Use an easing curve that pops in quickly and settles smoothly (an expo-out style ease) rather than linear or a slow ease-in.
- Wrap the animation call in a named function and expose a button that re-runs that same function, so the entrance can be replayed on demand from a fully settled state without page reload.`,
    },
  },
};

export default animeJsStaggerGrid;
