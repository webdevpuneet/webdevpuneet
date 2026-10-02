const skeletonCardGrid = {
  id: 'skeleton-card-grid',
  title: 'Skeleton Card Grid',
  lastmod: '2026-06-23',
  category: 'loaders',
  html: `<div class="skg-wrap">
  <div class="skg-bar"><h3>Products</h3><button type="button" class="skg-btn" id="skgReload">Reload</button></div>
  <div class="skg-grid" id="skgGrid"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:32px 20px}

.skg-wrap{width:100%;max-width:560px}
.skg-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.skg-bar h3{font-size:16px;font-weight:800;color:#0f172a}
.skg-btn{background:#0f172a;color:#fff;border:none;border-radius:9px;padding:8px 15px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.skg-btn:hover{background:#1e293b}

.skg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px}
.skg-card{background:#fff;border-radius:14px;padding:14px;box-shadow:0 6px 18px rgba(15,23,42,.05)}
.skg-thumb{height:96px;border-radius:10px;margin-bottom:12px}
.skg-line{height:11px;border-radius:6px;margin-bottom:8px}
.skg-line.w70{width:70%}.skg-line.w40{width:40%}

/* Shimmer: a moving highlight swept across each placeholder via background-position. */
.skg-sk .skg-thumb,.skg-sk .skg-line{
  background:linear-gradient(90deg,#e9eef5 25%,#f1f5f9 37%,#e9eef5 63%);
  background-size:400% 100%;animation:skgShimmer 1.3s ease-in-out infinite}
@keyframes skgShimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}

/* Real card content. */
.skg-real{animation:skgFade .35s ease}
@keyframes skgFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.skg-img{height:96px;border-radius:10px;margin-bottom:12px;display:flex;align-items:center;justify-content:center;font-size:34px}
.skg-name{font-size:13.5px;font-weight:700;color:#0f172a;margin-bottom:4px}
.skg-price{font-size:13px;font-weight:800;color:#6366f1}`,

  js: `var PRODUCTS = [
  { name: 'Studio Headphones', price: '$129', emoji: '🎧', c1: '#6366f1', c2: '#8b5cf6' },
  { name: 'Smart Watch', price: '$199', emoji: '⌚', c1: '#22c55e', c2: '#10b981' },
  { name: 'Mirrorless Camera', price: '$849', emoji: '📷', c1: '#f59e0b', c2: '#f97316' },
  { name: 'Mechanical Keyboard', price: '$89', emoji: '⌨️', c1: '#ec4899', c2: '#db2777' },
  { name: 'Bluetooth Speaker', price: '$59', emoji: '🔊', c1: '#0ea5e9', c2: '#0284c7' },
  { name: 'Wireless Charger', price: '$35', emoji: '🔌', c1: '#a855f7', c2: '#9333ea' },
];

var grid = document.getElementById('skgGrid');

function skeletons(n) {
  var card = '<div class="skg-card skg-sk">' +
    '<div class="skg-thumb"></div>' +
    '<div class="skg-line w70"></div>' +
    '<div class="skg-line w40"></div></div>';
  return new Array(n).fill(card).join('');
}

function realCards() {
  return PRODUCTS.map(function (p) {
    return '<div class="skg-card skg-real">' +
      '<div class="skg-img" style="background:linear-gradient(135deg,' + p.c1 + ',' + p.c2 + ')">' + p.emoji + '</div>' +
      '<div class="skg-name">' + p.name + '</div>' +
      '<div class="skg-price">' + p.price + '</div></div>';
  }).join('');
}

function load() {
  // Show skeletons matching the real layout, then swap in content when "loaded".
  grid.innerHTML = skeletons(PRODUCTS.length);
  setTimeout(function () { grid.innerHTML = realCards(); }, 1600);
}

document.getElementById('skgReload').addEventListener('click', load);
load();`,

  seo: {
    title: 'Skeleton Card Grid — Loading Placeholder HTML CSS JS',
    description: `A skeleton loading grid that mirrors the real card layout with a shimmer, then swaps to content — reducing layout shift. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Skeleton Card Grid — Shimmering Placeholders That Mirror the Real Cards',
      description: `A skeleton screen shows grey placeholder shapes where content will appear while data loads, instead of a spinner — making the wait feel shorter and the layout feel stable. This snippet builds a skeleton *card grid* in plain HTML, CSS, and vanilla JavaScript: shimmering placeholder cards that match the real cards' dimensions exactly, then swap to content when loaded — no library.

**Placeholders that mirror the real layout**

The key to a good skeleton is that the placeholder occupies the *same space* as the real content. Here the skeleton card uses the identical card padding, the same thumbnail height, and lines sized to the real title and price — so when content arrives, nothing jumps. This eliminates cumulative layout shift (CLS), the janky reflow you get when a spinner is replaced by content of a different size. The skeleton and real cards share the same grid, so the columns and gaps are identical too.

**The shimmer is one moving gradient**

Each placeholder shape has a three-stop linear-gradient background sized larger than the element (\`background-size: 400%\`), and a keyframe animates its \`background-position\` across, producing the highlight that sweeps over the skeleton. Animating \`background-position\` (rather than moving a pseudo-element) is the lightweight, widely-used way to get the shimmer with a single rule applied to every placeholder — no extra DOM. The shimmer signals "loading, not broken" far better than static grey blocks.

**Matching counts and a clean swap**

The grid renders as many skeleton cards as there will be real cards, so the placeholder grid looks like the final grid, not an arbitrary few boxes. When data is ready, the whole grid's content is replaced in one assignment and the real cards fade in. Swapping all at once (rather than card-by-card) avoids a piecemeal flicker, and the fade gives a gentle transition from placeholder to content.

**Driven by a load lifecycle**

A \`load()\` function shows the skeletons, then (here on a timer, in reality on a \`fetch\` resolving) swaps to content — and a Reload button replays the cycle so you can see the loading state on demand. In production you'd render the skeletons immediately on mount and replace them in the promise's \`.then\`, which is the standard data-loading pattern.

**Drop-in and adaptable**

Match the skeleton's shapes to your own card (avatar circle, image, lines) and render counts to your expected results, and it drops into any grid that loads asynchronously. It's a clear reference for layout-stable skeleton loading and the single-gradient shimmer technique used across modern apps. Worth adding for real usage: \`aria-busy="true"\` on the grid container while skeletons are showing (removed once real content renders), plus \`aria-live="polite"\` somewhere announcing "Products loaded" — screen reader users get no visual cue from a shimmering placeholder, so without an explicit announcement they have no way to know when the real content has actually arrived.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A product grid renders shimmering skeleton cards, then swaps to real cards after a moment.` },
      { title: 'Reload to replay', text: `Click Reload to show the skeleton loading state again.` },
      { title: 'Match your card', text: `Adjust the skeleton shapes (thumb height, line widths) to mirror your real card exactly.` },
      { title: 'Set the count', text: `Render as many skeletons as expected results so the placeholder grid matches the final one.` },
      { title: 'Wire to fetch', text: `Show skeletons on mount and swap to content in your fetch().then() instead of the timer.` },
      { title: 'Restyle the shimmer', text: `Tweak the gradient colours or animation speed to fit your theme.` },
    ] },
    features: [
      { title: 'Layout-stable placeholders', text: `Skeleton cards match the real cards' size, eliminating layout shift on swap.` },
      { title: 'Single-gradient shimmer', text: `One animated background-position rule shimmers every placeholder — no extra DOM.` },
      { title: 'Matching grid', text: `Skeletons share the real grid, so columns and gaps are identical.` },
      { title: 'Matching count', text: `Renders as many skeletons as expected cards for a realistic placeholder.` },
      { title: 'Clean one-shot swap', text: `Content replaces all skeletons at once to avoid piecemeal flicker.` },
      { title: 'Fade-in content', text: `Real cards fade in for a gentle transition from placeholder.` },
      { title: 'Replayable load cycle', text: `A Reload button re-triggers the loading state on demand.` },
      { title: 'Drop-in & no library', text: `Pure HTML/CSS/JS skeleton + content rendering with zero dependencies.` },
    ],
    useCases: [
      { title: 'Product and catalogue grids', text: 'Show placeholders matching real [product card](/ui-snippets/product-card/) dimensions while the catalogue loads, avoiding layout shift when items appear.' },
      { title: 'Dashboards and feeds', text: 'Fill tiles while widgets fetch, mirroring the final grid so columns and gaps are identical before and after loading.' },
      { title: 'Search and gallery results', text: 'Hold stable space while results arrive, rendering exactly as many skeletons as the page expects to show.' },
      { title: 'Profile and people cards', text: 'Show avatar and line placeholders for member directories, using a single `background-position` rule to shimmer every block.' },
      { title: 'Skeleton family reuse', text: 'Combine with a [skeleton dashboard](/ui-snippets/skeleton-dashboard/) and a plain [skeleton loader](/ui-snippets/skeleton-loader/) for one consistent loading language across the whole product.' },
      { icon: 'CODE', title: 'Related: Typewriter Status Log Loader', desc: 'See the [Typewriter Status Log Loader](/ui-snippets/loader-typewriter-status-log/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use a skeleton instead of a spinner?', a: `A spinner says "something is loading" but gives no sense of what or how the page will look, and when it's replaced by content of a different size the layout jumps. A skeleton shows the shape of the incoming content in the exact space it will occupy, so the wait feels shorter, the page feels stable, and there's no layout shift when content arrives. Research consistently shows skeletons feel faster than spinners.` },
      { q: 'How does the shimmer work?', a: `Each placeholder shape has a three-stop linear-gradient background that's much wider than the element (background-size: 400%). A keyframe animates the background-position across the element, so the lighter middle stop sweeps over it like a highlight. It's a single CSS rule applied to every placeholder — no extra elements or JavaScript — which is why it's the standard skeleton-shimmer technique.` },
      { q: 'Why must the skeleton match the real card size?', a: `Because if the placeholder is a different size than the content that replaces it, the page reflows when content loads — text shifts, things jump, and you get poor Cumulative Layout Shift (a Core Web Vitals metric). Matching the skeleton's padding, thumbnail height, and line sizes to the real card means the swap is seamless and nothing moves. Layout stability is the main reason skeletons exist.` },
      { q: 'How do I connect it to real data loading?', a: `Render the skeletons immediately (on mount), kick off your fetch, and replace the grid with real cards in the promise's .then() — exactly where the demo's setTimeout swap is. Render as many skeletons as you expect results (or a sensible default). If the fetch can fail, swap to an error/empty state instead. The skeleton-then-content lifecycle is the same; only the trigger changes from a timer to a real response.` },
      { q: 'How do I use this skeleton grid in React, Vue, or Angular?', a: `Hold a loading boolean and the data in state; render skeleton cards when loading is true and real cards when false. In React, flip loading in a useEffect fetch; in Vue, in onMounted; in Angular, in ngOnInit. The shimmer CSS and matching-layout principle are framework-agnostic — only the loading state and conditional render move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the shimmer mechanics or the swap timing by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely why the shimmer animates background-position on an oversized linear-gradient rather than animating a separate overlay element, or why the skeleton cards must reuse the exact same grid, padding, and thumbnail height as the real cards. The same assistant can help optimize it, for instance checking whether replacing the whole grid's innerHTML in one shot is better than patching individual cards when only some data has arrived. It is just as useful for extending the pattern: ask it to add aria-busy and aria-live announcements for screen reader users, stagger the fade-in of each real card instead of swapping them all at once, or wire the load() timer up to a real fetch call with an error-state fallback. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "skeleton card grid" loading placeholder in plain HTML, CSS, and JavaScript — no library, no canvas.

Requirements:
- A CSS grid of cards using grid-template-columns: repeat(auto-fill, minmax(...)) so column count is responsive without media queries.
- A skeleton card variant whose thumbnail height and text-line widths and heights exactly match the real card's image height and text sizes, so swapping one for the other causes zero layout shift.
- The shimmer effect must be a single reusable CSS rule: a linear-gradient background with at least three color stops, sized much wider than the element (e.g. 400% width), animated purely by shifting background-position across the element in a keyframe — no extra shimmer overlay element and no JavaScript-driven animation.
- A JS render function must generate exactly as many skeleton cards as the real content will eventually have, so the placeholder grid's shape matches the final grid instead of showing an arbitrary generic count.
- Simulate an async load: show the skeleton grid immediately, then after a delay (standing in for a real fetch resolving) replace the entire grid's contents in one operation with the real cards, which must fade in via a CSS opacity/transform keyframe rather than appearing abruptly.
- Include a reload control that re-triggers the full skeleton-then-content cycle on demand, so the loading state can be replayed for testing or demonstration.`,
    },
  },
};

export default skeletonCardGrid;
