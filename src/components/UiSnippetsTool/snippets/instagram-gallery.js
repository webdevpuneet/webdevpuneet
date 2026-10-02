const instagramGallery = {
  id: 'instagram-gallery',
  title: 'Instagram Gallery Lightbox',
  lastmod: '2026-07-18',
  category: 'media',
  html: `<div class="ig-wrap">
  <div class="ig-grid" id="igGrid" role="list"></div>

  <div class="ig-box" id="igBox" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Photo viewer">
    <button class="ig-close" id="igClose" aria-label="Close">✕</button>
    <button class="ig-nav ig-prev" id="igPrev" aria-label="Previous">‹</button>
    <figure class="ig-figure">
      <div class="ig-photo" id="igPhoto"></div>
      <figcaption class="ig-cap">
        <span class="ig-cap-likes" id="igLikes"></span>
        <span class="ig-cap-pos" id="igPos"></span>
      </figcaption>
    </figure>
    <button class="ig-nav ig-next" id="igNext" aria-label="Next">›</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0b10;color:#fff;display:flex;justify-content:center;padding:30px 16px;min-height:100vh}

.ig-wrap{width:100%;max-width:560px}
.ig-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}
.ig-cell{position:relative;aspect-ratio:1;border-radius:4px;overflow:hidden;cursor:pointer;background:var(--bg);background-size:cover}
.ig-cell::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,.45);opacity:0;transition:opacity .2s;display:flex}
.ig-cell:hover::after{opacity:1}
.ig-stats{position:absolute;inset:0;z-index:1;display:flex;align-items:center;justify-content:center;gap:16px;font-size:14px;font-weight:700;opacity:0;transition:opacity .2s;pointer-events:none}
.ig-cell:hover .ig-stats{opacity:1}
.ig-stats span{display:inline-flex;align-items:center;gap:5px}

.ig-box{position:fixed;inset:0;z-index:50;background:rgba(8,8,12,.92);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;gap:14px;padding:20px;opacity:0;visibility:hidden;transition:opacity .25s,visibility .25s}
.ig-box.open{opacity:1;visibility:visible}
.ig-figure{position:relative;max-width:560px;width:100%}
.ig-photo{aspect-ratio:1;width:100%;border-radius:12px;background:var(--bg);background-size:cover;box-shadow:0 30px 80px -30px rgba(0,0,0,.9);transition:opacity .18s}
.ig-cap{display:flex;justify-content:space-between;align-items:center;margin-top:12px;font-size:13px;color:#c7c7d2}
.ig-cap-likes{font-weight:700;color:#fff}

.ig-close{position:absolute;top:18px;right:20px;background:rgba(255,255,255,.1);border:none;color:#fff;width:40px;height:40px;border-radius:50%;font-size:17px;cursor:pointer;transition:background .2s}
.ig-close:hover{background:rgba(255,255,255,.22)}
.ig-nav{flex-shrink:0;background:rgba(255,255,255,.08);border:none;color:#fff;width:46px;height:46px;border-radius:50%;font-size:26px;line-height:1;cursor:pointer;transition:background .2s}
.ig-nav:hover{background:rgba(255,255,255,.2)}

@media(max-width:600px){.ig-nav{position:absolute;top:50%;transform:translateY(-50%);z-index:2}.ig-prev{left:8px}.ig-next{right:8px}}`,

  js: `var PHOTOS = [
  { c1: '#6366f1', c2: '#ec4899', likes: 1240, tag: 'Aurora' },
  { c1: '#22d3ee', c2: '#0ea5e9', likes: 982,  tag: 'Tide' },
  { c1: '#f59e0b', c2: '#ef4444', likes: 2310, tag: 'Ember' },
  { c1: '#34d399', c2: '#10b981', likes: 654,  tag: 'Fern' },
  { c1: '#a78bfa', c2: '#7c3aed', likes: 1875, tag: 'Nebula' },
  { c1: '#fb7185', c2: '#e11d48', likes: 421,  tag: 'Dusk' },
  { c1: '#60a5fa', c2: '#2563eb', likes: 1099, tag: 'Frost' },
  { c1: '#fbbf24', c2: '#f97316', likes: 3402, tag: 'Solstice' },
  { c1: '#2dd4bf', c2: '#14b8a6', likes: 760,  tag: 'Lagoon' }
];
function grad(p) { return 'linear-gradient(135deg,' + p.c1 + ',' + p.c2 + ')'; }

var grid = document.getElementById('igGrid');
PHOTOS.forEach(function (p, i) {
  var cell = document.createElement('div');
  cell.className = 'ig-cell';
  cell.setAttribute('role', 'listitem');
  cell.style.setProperty('--bg', grad(p));
  cell.innerHTML = '<div class="ig-stats"><span>♥ ' + p.likes.toLocaleString() +
    '</span><span>◎ ' + p.tag + '</span></div>';
  cell.addEventListener('click', function () { open(i); });
  grid.appendChild(cell);
});

var box = document.getElementById('igBox');
var photo = document.getElementById('igPhoto');
var likesEl = document.getElementById('igLikes');
var posEl = document.getElementById('igPos');
var current = 0, lastFocus = null;

function render() {
  var p = PHOTOS[current];
  photo.style.opacity = '0';
  setTimeout(function () {
    photo.style.setProperty('--bg', grad(p));
    photo.style.opacity = '1';
  }, 120);
  likesEl.textContent = '♥ ' + p.likes.toLocaleString() + ' likes';
  posEl.textContent = (current + 1) + ' / ' + PHOTOS.length;
}
function open(i) {
  current = i; lastFocus = document.activeElement;
  render();
  box.classList.add('open'); box.setAttribute('aria-hidden', 'false');
  document.getElementById('igNext').focus();
}
function close() {
  box.classList.remove('open'); box.setAttribute('aria-hidden', 'true');
  if (lastFocus) lastFocus.focus();
}
function go(d) { current = (current + d + PHOTOS.length) % PHOTOS.length; render(); }

document.getElementById('igClose').addEventListener('click', close);
document.getElementById('igPrev').addEventListener('click', function () { go(-1); });
document.getElementById('igNext').addEventListener('click', function () { go(1); });
box.addEventListener('click', function (e) { if (e.target === box) close(); });
document.addEventListener('keydown', function (e) {
  if (!box.classList.contains('open')) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowRight') go(1);
  if (e.key === 'ArrowLeft') go(-1);
});

// Touch swipe to move between photos in the lightbox.
var sx = 0;
box.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
box.addEventListener('touchend', function (e) {
  var dx = e.changedTouches[0].clientX - sx;
  if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
});`,

  seo: {
    title: 'Instagram Gallery Lightbox — Free HTML CSS JS Snippet',
    description: `An Instagram-style square photo grid with hover like counts and a full lightbox with prev/next, keyboard arrows, swipe, and Escape. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Instagram Gallery Lightbox — Square Grid with a Full Photo Viewer',
      description: `This snippet recreates the Instagram profile experience: a tidy three-column grid of square photos that show like counts on hover, and a full-screen lightbox that opens on click with previous/next navigation, keyboard arrows, swipe gestures, and the usual dismissal patterns. It's built in plain HTML, CSS, and vanilla JavaScript, with accessibility and touch handled.

**The square grid**

The grid is a CSS \`grid-template-columns: repeat(3, 1fr)\` with a tight 5px gap, exactly like Instagram's profile layout. Each cell uses \`aspect-ratio: 1\` so it stays perfectly square regardless of column width, and \`overflow: hidden\` with a cover-sized background keeps images cropped to the square without distortion. On hover, a dark scrim fades in (\`::after\`) and a centered overlay reveals the photo's like count and tag — the signature Instagram hover, which surfaces engagement stats without cluttering the resting grid.

**Data-driven cells**

All photos live in a \`PHOTOS\` array (here, gradient placeholders with like counts and tags, swappable for real image URLs). The grid is generated in a loop, with each cell's background set through a \`--bg\` custom property and its like count formatted with \`toLocaleString()\` so large numbers read as "3,402". Clicking a cell opens the lightbox at that index.

**The lightbox**

The viewer is a fixed-position overlay with a blurred, dimmed backdrop (\`backdrop-filter: blur\`). It toggles via an \`.open\` class that transitions \`opacity\` and \`visibility\` together — using \`visibility\` ensures the closed lightbox isn't focusable or interactive, which a plain opacity fade wouldn't guarantee. Inside, a large square photo shows the current image, with a caption row displaying the like count and the position indicator ("3 / 9").

**Smooth image swaps**

When you navigate, \`render()\` briefly fades the photo to \`opacity: 0\`, swaps the \`--bg\` after 120ms, then fades back in — so moving between images cross-dissolves instead of hard-cutting. The \`go(d)\` function wraps the index with modulo arithmetic (\`(current + d + length) % length\`), so Next from the last photo loops to the first and Previous from the first loops to the last.

**Every dismissal and navigation path**

The lightbox supports the full set of expected interactions: the close button, clicking the backdrop (but not the photo, via an \`e.target === box\` check), the Escape key, the on-screen prev/next arrows, and the Left/Right arrow keys. On touch, \`touchstart\`/\`touchend\` measure horizontal swipe distance and call \`go()\` past a 50px threshold, so you can flick between photos on a phone. On small screens the arrows reposition to overlay the photo edges.

**Focus management**

When the lightbox opens it stores the previously focused element, moves focus to the Next button, and restores focus to the original trigger on close — the correct focus pattern for a modal dialog, which is marked up with \`role="dialog"\` and \`aria-modal="true"\`.

**Customizing it**

Replace the gradient placeholders with real image URLs in \`PHOTOS\`, change the grid to four columns, adjust the swipe threshold, or add captions and avatars to the lightbox. Pair it with a [focus cards](/ui-snippets/focus-cards/) section or a [photo gallery](/ui-snippets/photo-gallery/) elsewhere on the page for a complete media experience.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A three-column square photo grid renders like an Instagram profile.` },
      { title: 'Hover a tile', text: `A scrim fades in showing the like count and tag.` },
      { title: 'Click a photo', text: `A blurred full-screen lightbox opens on that image.` },
      { title: 'Navigate', text: `Use the arrows, Left/Right keys, or swipe to move between photos.` },
      { title: 'Close it', text: `Click the backdrop, press the X, or hit Escape.` },
      { title: 'Swap in real photos', text: `Replace the PHOTOS array with image URLs.` },
    ] },
    features: [
      { title: 'Square aspect grid', text: `aspect-ratio keeps cells perfectly square.` },
      { title: 'Hover like counts', text: `A scrim reveals engagement stats per tile.` },
      { title: 'Blurred lightbox', text: `backdrop-filter dims and frosts the page.` },
      { title: 'Cross-dissolve swaps', text: `Photos fade between each navigation.` },
      { title: 'Looping prev/next', text: `Modulo wrapping cycles past the ends.` },
      { title: 'Keyboard and swipe', text: `Arrows, Escape, and touch flicks.` },
      { title: 'Backdrop dismiss', text: `Clicking outside the photo closes it.` },
      { title: 'Modal focus management', text: `Focus moves in and restores on close.` },
    ],
    useCases: [
      { title: 'Profile photo grids', text: 'Build an Instagram-style alternative to a plain [photo gallery](/ui-snippets/photo-gallery/), using `aspect-ratio` to keep every cell perfectly square.' },
      { title: 'Portfolio work viewers', text: 'Open projects in a lightbox below a [portfolio hero](/ui-snippets/portfolio-hero/), with previous and next navigation plus swipe on touch screens.' },
      { title: 'Product image grids', text: 'Show a catalogue of shots and link each to a [product card](/ui-snippets/product-card/) detail page, with hover like counts adding social proof.' },
      { title: 'Event recap galleries', text: 'Browse event photos beside a [focus cards](/ui-snippets/focus-cards/) section, with a frosted `backdrop-filter` lightbox dimming the page behind.' },
      { title: 'Accessible lightbox reference', text: 'Study keyboard arrows, Escape to close and cross-dissolve swaps between photos as a complete model for an image viewer dialog.' },
      { icon: 'CODE', title: 'Related: Recent Purchase Notification Popup', desc: 'See the [Recent Purchase Notification Popup](/ui-snippets/recent-purchase-notification-popup/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the grid stay perfectly square like Instagram?', a: `Each cell uses aspect-ratio: 1, so its height always matches its width no matter how the three flexible columns resize. overflow: hidden with a cover-sized background crops images into the square without stretching them, reproducing Instagram's tidy profile grid at any viewport width.` },
      { q: 'How does navigation loop past the ends?', a: `The go(d) function computes (current + d + length) % length. The modulo wraps the index, so pressing Next on the last photo lands on the first and Previous on the first lands on the last. The same function backs the arrow buttons, the Left/Right keys, and swipe gestures.` },
      { q: 'Why use visibility as well as opacity for the lightbox?', a: `Fading opacity alone leaves the overlay technically present and focusable while invisible, so keyboard users could tab into hidden controls. Transitioning visibility alongside opacity makes the closed lightbox non-interactive and removes it from the tab order, while still allowing the fade because visibility is transitionable when paired with a delay.` },
      { q: 'Is the lightbox accessible?', a: `It's marked up as role="dialog" with aria-modal="true". On open it records the previously focused element and moves focus to the Next button; on close it restores focus to the trigger. It closes on Escape and on backdrop click, and all controls have aria-labels. For production you'd also trap Tab focus within the dialog while it's open.` },
      { q: 'How do I use this Instagram gallery in React, Vue, or Angular?', a: `Render the grid from your photos array and keep current index and open state in component state. Move the keyboard and touch listeners into a mount effect with cleanup, and use refs for focus management. Drive the lightbox visibility from state rather than toggling a class. Swap the gradient placeholders for <img> elements with real src values. In Tailwind, use aspect-square, grid-cols-3, and backdrop-blur utilities.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to work out the focus-management and swipe logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the lightbox transitions both opacity and visibility together rather than opacity alone, or how the go function's modulo arithmetic makes prev and next wrap seamlessly past the first and last photos. The same assistant can help you optimize it — ask whether the render function's 120ms setTimeout-based cross-dissolve could instead be driven by a transitionend listener for more reliable timing, or how the grid and lightbox would need to change to lazy-load real photo files instead of instant CSS gradients. It is just as useful for extending the gallery: ask it to add pinch-to-zoom on the open photo, a double-tap-to-like heart animation like the real Instagram app, or a way to jump directly to a specific photo from a deep link on page load. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an Instagram-style square photo grid with a full-screen lightbox in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A three-column CSS grid with a small fixed gap, where every cell uses aspect-ratio: 1 so it stays perfectly square at any column width, with overflow hidden and a cover-sized background image so photos crop into the square without distortion.
- On hover, each cell must reveal a dark scrim overlay and a centered row showing a like count (formatted with toLocaleString for thousands separators) and a tag, using an opacity transition driven by hover state, not JavaScript.
- Clicking a cell opens a fixed, full-viewport lightbox overlay with a blurred backdrop (backdrop-filter), toggled by adding and removing a class that transitions both opacity and visibility together, so the closed lightbox is neither visible nor focusable.
- The lightbox must show the current photo, a caption row with the like count and a "current / total" position indicator, a close button, and previous/next arrow buttons.
- Navigating between photos must wrap around at both ends using modulo arithmetic on the current index, and must briefly fade the photo to opacity 0, swap its content after roughly 120ms, then fade it back in for a cross-dissolve transition rather than a hard cut.
- Support every standard dismissal and navigation path: a close button click, clicking the backdrop but not the photo itself, the Escape key, the Left and Right arrow keys, and touch swipe gestures measured between touchstart and touchend with a minimum horizontal distance threshold.
- On open, store the previously focused element and move focus into the lightbox; on close, restore focus back to that stored element — the correct focus-management pattern for a modal dialog marked up with role="dialog" and aria-modal="true".`,
    },
  },
};

export default instagramGallery;
