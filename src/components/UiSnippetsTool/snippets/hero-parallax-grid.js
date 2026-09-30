const heroParallaxGrid = {
  id: 'hero-parallax-grid',
  title: 'Hero Parallax Grid',
  lastmod: '2026-07-18',
  category: 'scroll',
  html: `<header class="hp-head">
  <h1>The Studio</h1>
  <p>Selected work, drifting past in parallax as you scroll.</p>
</header>
<section class="hp-rows" id="hpRows">
  <div class="hp-row" data-dir="1" id="hpR1"></div>
  <div class="hp-row" data-dir="-1" id="hpR2"></div>
  <div class="hp-row" data-dir="1" id="hpR3"></div>
</section>
<footer class="hp-foot">Keep scrolling — each row slides the opposite way.</footer>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#070710;color:#fff;overflow-x:hidden}

.hp-head{max-width:760px;padding:90px 24px 30px}
.hp-head h1{font-size:clamp(40px,9vw,88px);font-weight:900;letter-spacing:-.04em;line-height:1}
.hp-head p{margin-top:14px;font-size:17px;color:#9a9ab8;max-width:440px}

.hp-rows{display:flex;flex-direction:column;gap:20px;padding:20px 0 120px}
.hp-row{display:flex;gap:20px;width:max-content;will-change:transform}

.hp-tile{width:300px;aspect-ratio:16/10;border-radius:14px;background:var(--g);flex-shrink:0;box-shadow:0 20px 40px -18px rgba(0,0,0,.7);position:relative;overflow:hidden;transition:transform .3s}
.hp-tile:hover{transform:scale(1.04)}
.hp-tile span{position:absolute;left:14px;bottom:12px;font-size:13px;font-weight:700;z-index:1}
.hp-tile::after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.4),transparent 50%)}

.hp-foot{text-align:center;color:#55556e;font-size:14px;padding-bottom:80px}`,

  js: `var GRADS = ['#6366f1,#8b5cf6','#ec4899,#f43f5e','#22d3ee,#3b82f6','#34d399,#10b981','#f59e0b,#ef4444','#a78bfa,#6366f1','#f472b6,#db2777','#2dd4bf,#0ea5e9'];
function tile(i) {
  var g = GRADS[i % GRADS.length];
  return '<div class="hp-tile" style="--g:linear-gradient(135deg,' + g + ')"><span>Project ' + (i + 1) + '</span></div>';
}

var rows = Array.prototype.slice.call(document.querySelectorAll('.hp-row'));
rows.forEach(function (row, r) {
  var html = '';
  for (var i = 0; i < 7; i++) html += tile(r * 7 + i);
  row.innerHTML = html;
  // Offset alternating rows so they don't start aligned.
  row.dataset.base = row.getAttribute('data-dir') === '1' ? -200 : -600;
});

var ticking = false;
function update() {
  var sc = window.scrollY;
  rows.forEach(function (row) {
    var dir = parseFloat(row.getAttribute('data-dir'));
    var base = parseFloat(row.dataset.base);
    // Each row translates horizontally proportional to scroll, in its direction.
    var x = base + sc * 0.25 * dir;
    row.style.transform = 'translateX(' + x + 'px)';
  });
  ticking = false;
}
window.addEventListener('scroll', function () {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(update);
}, { passive: true });
update();`,

  seo: {
    title: 'Hero Parallax Grid — Free HTML CSS JS Scroll Snippet',
    description: `Rows of project tiles that slide horizontally in opposite directions as you scroll, creating a parallax gallery hero. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Hero Parallax Grid — Rows Sliding Opposite Ways on Scroll',
      description: `The hero parallax grid is the showpiece header where several rows of project tiles slide horizontally as you scroll the page — adjacent rows moving in opposite directions — so the gallery drifts past in a layered parallax. This snippet builds it with plain HTML, CSS, and a lean vanilla JavaScript scroll handler, and it's a favorite opener for studio and portfolio sites.

**Scroll drives horizontal movement**

Unlike a normal page where scrolling only moves things vertically, here the vertical scroll position is translated into horizontal motion. The \`update()\` function reads \`window.scrollY\` and, for each row, applies \`translateX\` proportional to it: \`base + scrollY * 0.25 * dir\`. So as you scroll down, the rows glide sideways. The \`0.25\` factor controls how fast they slide relative to scroll — smaller is subtler, larger is faster.

**Opposite directions per row**

Each row carries a \`data-dir\` of \`1\` or \`-1\`, and the translate is multiplied by it, so odd rows slide one way and even rows the other. This counter-motion between neighboring rows is the essence of the parallax — your eye reads the opposing layers as depth and energy, whereas rows all sliding the same way would just look like a single moving band. Each row also starts at a different \`base\` offset so they aren't aligned at the top edge, which makes the staggering feel intentional.

**Efficient scroll handling**

The \`scroll\` listener is \`{ passive: true }\` and throttled through \`requestAnimationFrame\` with a \`ticking\` guard, so the transforms update at most once per frame however fast you scroll. Because the only work per frame is reading \`scrollY\` and writing a \`translateX\` on three elements, it stays smooth even on long pages. The rows have \`will-change: transform\` so the browser promotes them to their own compositor layers.

**Overflow-wide rows**

Each row is \`width: max-content\` and filled with seven tiles in a flex line, so the row is much wider than the viewport and there's plenty of content to slide into view from either side. \`overflow-x: hidden\` on the body clips the off-screen tiles so the horizontal motion doesn't create a scrollbar. The tiles themselves lift slightly on hover, so the gallery is interactive as well as animated.

**Image-free, themeable tiles**

Tiles are gradient rectangles with a label and a bottom scrim, generated in JavaScript from a color palette — so the hero is dependency-free and colorful. Swap each tile's \`--g\` background for a real image to turn it into an actual portfolio wall; the parallax logic doesn't care what fills the tiles.

**Customizing it**

Tune the \`0.25\` speed factor for more or less drift, add rows (each picks up its direction and a base offset automatically), change the per-row \`base\` offsets, adjust tile size, or drop in real images. Combine it with a static headline above, as shown, so the moving grid reads as a backdrop to your title. Pair it with a [3D marquee](/ui-snippets/3d-marquee/) section or a [flip link](/ui-snippets/flip-link/) navigation for a striking studio homepage.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A headline sits above three rows of colorful project tiles.` },
      { title: 'Scroll the page', text: `The rows slide horizontally as you move down.` },
      { title: 'Watch the parallax', text: `Adjacent rows drift in opposite directions.` },
      { title: 'Hover a tile', text: `It lifts slightly, so the gallery stays interactive.` },
      { title: 'Swap in images', text: `Set each tile's --g to a real project image.` },
      { title: 'Tune the speed', text: `Change the 0.25 scroll factor for more or less drift.` },
    ] },
    features: [
      { title: 'Scroll-to-horizontal', text: `Vertical scroll drives translateX on rows.` },
      { title: 'Opposite-direction rows', text: `data-dir slides neighbors apart for depth.` },
      { title: 'Staggered start offsets', text: `Rows begin unaligned for an intentional look.` },
      { title: 'rAF-throttled scroll', text: `Passive, one transform update per frame.` },
      { title: 'Overflow-wide rows', text: `max-content rows hold plenty to slide.` },
      { title: 'Hover lift tiles', text: `Tiles scale up for interactivity.` },
      { title: 'Themeable tiles', text: `Gradient tiles, swappable for images.` },
      { title: 'Auto-filled rows', text: `JavaScript generates every tile.` },
    ],
    useCases: [
      { title: 'Studio homepages', text: `Open above a [3D marquee](/ui-snippets/3d-marquee/) section.` },
      { title: 'Portfolio heroes', text: `Pair with a [flip link](/ui-snippets/flip-link/) navigation.` },
      { title: 'Agency landing pages', text: `A moving backdrop for an [agency hero](/ui-snippets/agency-hero/).` },
      { title: 'Product showcases', text: `Drift screenshots past a headline.` },
      { title: 'Photography sites', text: `Slide real shots in parallax rows.` },
      { title: 'Scroll parallax demos', text: `A reference for scroll-driven horizontal motion.` },
      { icon: 'CODE', title: 'Related: Independence Day Flag Hoist', desc: 'See the [Independence Day Flag Hoist](/ui-snippets/independence-day-flag-hoist/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: 3D Card Rotate on Scroll (view-timeline)', desc: 'See the [3D Card Rotate on Scroll (view-timeline)](/ui-snippets/view-timeline-card-rotate-3d/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does vertical scrolling move the rows sideways?', a: `The update function reads window.scrollY and applies translateX to each row as base + scrollY * 0.25 * dir. So scroll position is mapped to horizontal offset rather than vertical, and the rows glide sideways as you scroll the page. The 0.25 factor sets how fast they slide relative to scroll.` },
      { q: 'What creates the parallax depth?', a: `Each row has a data-dir of 1 or -1 that multiplies its translate, so adjacent rows slide in opposite directions. The eye reads the opposing layers as depth and motion. Different per-row base offsets also keep the rows from starting aligned, which makes the layering feel deliberate.` },
      { q: 'Does the horizontal motion create a scrollbar?', a: `No. The rows are width: max-content and wider than the viewport, but overflow-x: hidden on the body clips the off-screen tiles. So tiles slide in and out from the sides without ever adding a horizontal scrollbar to the page.` },
      { q: 'Is it smooth on long pages?', a: `Yes. The scroll listener is passive and throttled with requestAnimationFrame behind a ticking flag, so it updates at most once per frame. The only per-frame work is reading scrollY and writing a translateX on a few rows, and will-change: transform promotes those rows to their own compositor layers for smooth movement.` },
      { q: 'How do I use this hero parallax grid in React, Vue, or Angular?', a: `Render the rows and tiles from data, then run the scroll handler in a mount effect with cleanup, writing each row's translateX via refs so scrolling doesn't re-render. Keep the ticking flag in a ref. The CSS ports directly. In Tailwind, build the rows with flex and w-max, hide overflow on a wrapper, and apply the computed transforms inline.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the scroll math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the data-dir attribute and the per-row base offset combine inside the update function to produce the counter-sliding rows, or why the scroll listener is guarded with a ticking flag before scheduling requestAnimationFrame. The same assistant is useful for optimizing it — ask whether reading window.scrollY and writing three translateX values per frame would still be smooth with many more rows, or if the rows should be virtualized so off-screen tiles are removed from the DOM. It's just as handy for extending the effect: ask it to make the drift speed respond to scroll velocity instead of a fixed multiplier, add a subtle vertical bob to each row on top of the horizontal slide, or lazy-load real project images into the tiles as they enter the viewport. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a horizontally-scrolling parallax gallery hero in plain HTML, CSS, and JavaScript, driven purely by vertical page scroll — no scroll-jacking library, no canvas.

Requirements:
- Several rows stacked vertically, each row set to width: max-content and filled with more tiles than fit in the viewport, with overflow-x: hidden on the page so the extra width never creates a horizontal scrollbar.
- Each row must carry a direction flag (1 or -1) and a distinct starting horizontal offset so rows are not aligned with each other at scroll position zero.
- On every scroll event, compute each row's horizontal translateX as its starting offset plus the current window.scrollY multiplied by a shared speed constant and that row's own direction flag, so adjacent rows visibly slide in opposite directions as the page scrolls, creating a layered parallax.
- The scroll listener must be registered as passive, and must guard against redundant work using a boolean flag combined with requestAnimationFrame so the transform update runs at most once per animation frame regardless of how many scroll events fire.
- Apply will-change: transform to the rows so the browser can promote them to their own compositor layers.
- Generate the tiles programmatically from a small color/gradient palette array (cycling through it) rather than hand-writing each tile in markup, and give each tile a hover state that scales it up slightly.
- Run the transform update once immediately on load, in addition to on scroll, so the layout is correct before the user scrolls at all.`,
    },
  },
};

export default heroParallaxGrid;
