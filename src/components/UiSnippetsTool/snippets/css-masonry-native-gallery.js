const cssMasonryNativeGallery = {
  id: 'css-masonry-native-gallery',
  title: 'Native CSS Masonry Gallery',
  lastmod: '2026-08-22',
  category: 'layouts',
  cdnUrls: [],
  html: `<div class="demo-wrap">
  <p class="demo-note">This gallery uses the native CSS masonry layout (<code>grid-template-rows: masonry</code>) in browsers that support it &mdash; currently Firefox. Everywhere else, an <code>@supports not</code> fallback switches to a column-based masonry technique so the layout still looks like masonry, not a broken grid.</p>

  <div class="masonry-grid">
    <div class="m-card h1">Northern Lights, Iceland</div>
    <div class="m-card h2">Terraced Rice Fields</div>
    <div class="m-card h3">Old Town at Dusk</div>
    <div class="m-card h4">Desert Road, Wide Open</div>
    <div class="m-card h1">Harbor Fog, Early Morning</div>
    <div class="m-card h2">Market Street Stalls</div>
    <div class="m-card h3">Glacier Blue</div>
    <div class="m-card h2">Rooftop Garden</div>
    <div class="m-card h1">Coastline From Above</div>
    <div class="m-card h4">Alleyway Lanterns</div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body{font-family: system-ui, -apple-system, sans-serif; background: #f4f2ec; color: #26221a; min-height: 100vh;display:flex;align-items:center;justify-content:center}

.demo-wrap { max-width: 920px; margin: 0 auto; padding: 36px 20px 60px; }
.demo-note { font-size: 12.5px; color: #6b6455; line-height: 1.6; background: #fff; border: 1px solid #e6e1d3; border-radius: 10px; padding: 12px 14px; margin-bottom: 20px; }
.demo-note code { font-family: 'SFMono-Regular', Consolas, monospace; color: #b45309; }

.m-card {
  border-radius: 14px;
  padding: 16px;
  display: flex;
  align-items: flex-end;
  font-size: 13.5px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(160deg, #c98a3f, #7a4e1e);
  box-shadow: 0 8px 20px rgba(60,40,10,0.12);
}
.m-card.h1 { height: 150px; }
.m-card.h2 { height: 220px; background: linear-gradient(160deg, #4d7c8a, #244854); }
.m-card.h3 { height: 190px; background: linear-gradient(160deg, #8a5cf6, #4527a0); }
.m-card.h4 { height: 260px; background: linear-gradient(160deg, #2e8b57, #16452a); }

/* ---- Native CSS masonry ----
   grid-template-rows: masonry hands row placement to the browser's
   masonry algorithm instead of the normal grid row-track algorithm:
   items pack into whichever column has the least content so far,
   producing the classic staggered "waterfall" look with a single CSS
   property and no JS measuring pass. This is genuinely experimental —
   as of 2026 it ships in Firefox (behind stable support there) and is
   not yet shipped in Chromium or WebKit, both of which are pursuing an
   "item-flow" based alternative proposal instead. */
@supports (grid-template-rows: masonry) {
  .masonry-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-rows: masonry;
    gap: 16px;
  }
}

/* ---- Fallback: manual column-based masonry ----
   The long-standing CSS technique using the multi-column columns
   property. Each card becomes a column item; break-inside: avoid stops a
   card being visually split across two columns. It reads top-to-bottom
   within a column rather than left-to-right across the grid, which is a
   real, known difference from true masonry — but it still produces a
   staggered waterfall look with zero JavaScript and works everywhere. */
@supports not (grid-template-rows: masonry) {
  .masonry-grid {
    columns: 4 200px;
    column-gap: 16px;
  }
  .m-card {
    break-inside: avoid;
    margin-bottom: 16px;
  }
}`,

  js: `// No JavaScript required for either layout path: native masonry is a pure
// CSS grid feature, and the columns() fallback is pure CSS too. No JS
// measuring pass, no ResizeObserver, no re-layout logic to maintain.`,

  seo: {
    title: 'Native CSS Masonry Gallery — Free grid-template-rows: masonry Demo',
    description: `A masonry image gallery built with the emerging native CSS grid-template-rows: masonry, with a real CSS columns()-based fallback for browsers that don't support it yet. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Native CSS Masonry Gallery — grid-template-rows: masonry, With an Honest Fallback',
      description: `Masonry — the staggered, Pinterest-style waterfall layout where items pack into whichever column has the least content so far — has always required either JavaScript (measuring each item and repositioning it) or a compromise CSS technique. \`grid-template-rows: masonry\` is a genuinely native attempt to close that gap: hand row placement to the browser's own masonry algorithm inside an ordinary CSS Grid, with a single property and zero JavaScript.

**What grid-template-rows: masonry actually does**

Inside a normal grid, you declare \`grid-template-columns\` as usual, but set \`grid-template-rows: masonry\` instead of a track list. The browser then places items into whichever column currently has the shortest running height, exactly like a hand-rolled masonry algorithm would, producing the familiar staggered look without you writing any placement logic. Because it's still a grid under the hood, ordinary grid item properties keep working alongside it.

**The honest support story**

This is genuinely experimental as of 2026: Firefox has shipped support for CSS grid masonry, but Chromium and WebKit have not — both are instead exploring a separate "item-flow" masonry proposal with different syntax, and there is no cross-browser consensus yet on the final shape of native masonry in CSS. That means \`grid-template-rows: masonry\` will render a real masonry layout in Firefox today and needs a genuine fallback everywhere else — it is not a "ships everywhere, just needs a vendor prefix" situation.

**The fallback: CSS columns(), not a broken grid**

Rather than degrading to a plain, non-staggered grid in unsupporting browsers, this snippet's \`@supports not (grid-template-rows: masonry)\` block switches to the long-standing multi-column technique: \`columns: 4 200px\` turns the container into a CSS multi-column layout, each card becomes a column item, and \`break-inside: avoid\` stops a card being visually split across a column boundary. It's not pixel-identical to true masonry — items fill top-to-bottom within a column before moving to the next column, rather than always choosing the globally shortest column — but it produces a genuinely staggered waterfall look with zero JavaScript in every browser.

**When to reach for this vs. a JS masonry library**

If your grid item heights are known or fixed ahead of time (as in this demo) and you want the resilience of a pure-CSS approach with graceful native upgrade as browser support grows, this pattern is a good fit. If your items load asynchronously with unknown, changing heights (like a photo grid where images load progressively), a JS-measured masonry library or [a scroll reveal grid](/ui-snippets/scroll-reveal-grid/)-style approach paired with \`ResizeObserver\` may still be more robust until native masonry support is universal. Pair this with [CSS subgrid](/ui-snippets/css-subgrid-demo/) or [container query units](/ui-snippets/css-container-query-units-demo/) for more of the current native-CSS-layout toolkit.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'View the gallery in Firefox', text: `Cards pack into a true staggered masonry layout via native grid-template-rows: masonry.` },
      { title: 'View it in Chrome, Edge, or Safari', text: `The @supports not fallback kicks in: a CSS columns()-based masonry that still staggers, just column-first instead of grid-first.` },
      { title: 'Resize the preview width', text: `Both the native and fallback paths reflow their column count responsively.` },
      { title: 'Inspect the @supports blocks', text: `Compare the two rule sets — grid-template-rows: masonry vs columns: 4 200px.` },
      { title: 'Swap in your own images', text: `Replace the .m-card divs' fixed heights with real <img> aspect ratios.` },
      { title: 'Adjust column count/width', text: `Tune the auto-fill minmax() value and the columns() shorthand together.` },
    ] },
    features: [
      { title: 'Native masonry algorithm', text: `grid-template-rows: masonry hands placement to the browser, no JS.` },
      { title: 'Real @supports fallback', text: `Not a broken grid — a genuine columns()-based masonry technique.` },
      { title: 'break-inside: avoid', text: `Stops fallback cards splitting across a column boundary.` },
      { title: 'Zero JavaScript, either path', text: `No measuring pass, no ResizeObserver, no layout library.` },
      { title: 'Responsive column count', text: `auto-fill/minmax and columns() shorthand both reflow by width.` },
      { title: 'Honest support framing', text: `Documents that this is Firefox-only as of 2026, not universal yet.` },
      { title: 'Works with any item heights', text: `Cards of varying height demonstrate the staggered pack clearly.` },
      { title: 'Ordinary grid item properties still apply', text: `Because it's still CSS Grid underneath the masonry row mode.` },
    ],
    useCases: [
      { title: 'Photo and portfolio galleries', text: `A Pinterest-style waterfall for images with varying aspect ratios.` },
      { title: 'Blog/article card grids', text: `Stagger cards of differing excerpt length without JS.` },
      { title: 'Progressive enhancement demos', text: `Show how a layout can genuinely upgrade as browser support grows.` },
      { title: 'Modern CSS layout showcases', text: `Pair with [CSS subgrid](/ui-snippets/css-subgrid-demo/) or [container query units](/ui-snippets/css-container-query-units-demo/).` },
      { title: 'Replacing a JS masonry library', text: `Drop a JS dependency for fixed/known-height item grids.` },
      { title: 'Design system layout primitives', text: `Document both the native and fallback masonry patterns for a team.` },
      { icon: 'CODE', title: 'Related: 500 Internal Server Error Page', desc: 'See the [500 Internal Server Error Page](/ui-snippets/error-500-page/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Which browsers support grid-template-rows: masonry?', a: `As of 2026, Firefox has shipped support for native CSS grid masonry. Chromium (Chrome, Edge) and WebKit (Safari) have not shipped this exact property — both are instead exploring a separate "item-flow" masonry proposal with different syntax, and there is no finalized cross-browser standard yet. Treat this as genuinely experimental, not a feature you can rely on universally.` },
      { q: 'What does the fallback actually look like, and is it "real" masonry?', a: `The fallback uses the CSS columns property (columns: 4 200px) with break-inside: avoid on each card — a well-established, widely supported technique. It produces a genuinely staggered waterfall look, but fills items top-to-bottom within one column before moving to the next, rather than always placing the next item in whichever column is currently shortest across the whole grid. The visual difference is usually minor but not pixel-identical to true masonry.` },
      { q: 'Do I need JavaScript for either the native or fallback layout?', a: `No — both paths are pure CSS. The native path uses grid-template-rows: masonry inside an ordinary CSS Grid; the fallback path uses the CSS columns shorthand. Neither requires a measuring pass, a ResizeObserver, or a masonry JS library.` },
      { q: 'Can I use real <img> elements instead of fixed-height divs?', a: `Yes — replace each .m-card with a card containing an <img> at its natural aspect ratio (using width: 100%; height: auto), and both the native masonry algorithm and the columns() fallback will still work, since neither one requires you to specify a fixed height ahead of time.` },
      { q: 'Should I ship this in production today?', a: `You can ship it today because of the fallback — the layout degrades gracefully to a real staggered look everywhere, and Firefox users additionally get the more precise native masonry algorithm. Just don't assume native masonry syntax is stable or finalized yet; the Chromium/WebKit "item-flow" alternative could still change what the eventual cross-browser standard looks like.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's CSS into an AI coding assistant like Claude and ask it to explain the practical difference between the native grid-template-rows: masonry algorithm and the columns()-based fallback — specifically why the fallback fills top-to-bottom within a column rather than always choosing the globally shortest column, since that distinction explains any visual gap you notice between browsers. It's also a good prompt for adapting this to real images: ask the assistant to swap the fixed-height cards for <img> elements with lazy loading, and to verify break-inside: avoid still behaves correctly with images versus flex/block content. You could ask it to keep an eye on Chromium and WebKit's masonry proposal status and flag if the syntax used here has since diverged from what shipped. Treat this as a snapshot of a genuinely moving spec, not a permanently settled API.`,
      prompt: `Build a masonry-style image gallery in plain HTML and CSS using the native CSS grid-template-rows: masonry property, with a real fallback for browsers that don't support it.

Requirements:
- A grid container with grid-template-columns using repeat(auto-fill, minmax(200px, 1fr)) and grid-template-rows: masonry, wrapped in an @supports (grid-template-rows: masonry) block so it only applies where the browser actually supports it.
- At least 8-10 card items with genuinely varying heights, to make the staggered waterfall packing visually obvious.
- A fallback rule set wrapped in @supports not (grid-template-rows: masonry) that switches the same container to a CSS multi-column layout using the columns shorthand (e.g. columns: 4 200px; column-gap), with break-inside: avoid on each card so no card is visually split across a column boundary — this must produce a genuinely staggered look, not a plain non-masonry grid.
- No JavaScript anywhere — both the native and fallback layouts must be pure CSS.
- Add a short on-page note honestly explaining that native CSS masonry is experimental as of 2026, currently supported in Firefox but not yet in Chromium or WebKit (which are pursuing a different "item-flow" proposal), so readers understand this is not yet a universally supported feature.`,
    },
  },
};

export default cssMasonryNativeGallery;
