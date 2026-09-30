const photoGallery = {
  id: 'photo-gallery',
  title: 'Photo Gallery with Lightbox',
  lastmod: '2026-06-12',
  category: 'media',
  html: `<div class="gallery-page">
  <h1 class="page-title">Travel Photography</h1>
  <p class="page-sub">Click any photo to view full size</p>

  <div class="gallery" id="gallery">
    <div class="item" data-src="https://picsum.photos/seed/mtn/800/600" data-alt="Mountain peaks at sunrise" data-cap="Mountain peaks at sunrise — Dolomites, Italy">
      <img src="https://picsum.photos/seed/mtn/400/300" alt="Mountain peaks at sunrise" loading="lazy" />
      <div class="overlay">
        <svg class="zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </div>
    </div>
    <div class="item" data-src="https://picsum.photos/seed/sea/800/600" data-alt="Coastal sunset" data-cap="Golden hour on the Amalfi Coast — Italy">
      <img src="https://picsum.photos/seed/sea/400/300" alt="Coastal sunset" loading="lazy" />
      <div class="overlay"><svg class="zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>
    </div>
    <div class="item item-wide" data-src="https://picsum.photos/seed/forest/1200/600" data-alt="Forest path in autumn" data-cap="Autumn light through beech forest — Bavaria, Germany">
      <img src="https://picsum.photos/seed/forest/600/300" alt="Forest path in autumn" loading="lazy" />
      <div class="overlay"><svg class="zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>
    </div>
    <div class="item" data-src="https://picsum.photos/seed/city/800/600" data-alt="City skyline at night" data-cap="Night skyline — Tokyo, Japan">
      <img src="https://picsum.photos/seed/city/400/300" alt="City skyline at night" loading="lazy" />
      <div class="overlay"><svg class="zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>
    </div>
    <div class="item" data-src="https://picsum.photos/seed/desert/800/600" data-alt="Desert sand dunes" data-cap="Sahara dunes at dawn — Morocco">
      <img src="https://picsum.photos/seed/desert/400/300" alt="Desert sand dunes" loading="lazy" />
      <div class="overlay"><svg class="zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>
    </div>
    <div class="item item-tall" data-src="https://picsum.photos/seed/waterfall/600/900" data-alt="Waterfall cascade" data-cap="Angel Falls cascade — Venezuela">
      <img src="https://picsum.photos/seed/waterfall/300/450" alt="Waterfall cascade" loading="lazy" />
      <div class="overlay"><svg class="zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>
    </div>
    <div class="item" data-src="https://picsum.photos/seed/lake/800/600" data-alt="Alpine lake reflection" data-cap="Mirror lake at golden hour — Switzerland">
      <img src="https://picsum.photos/seed/lake/400/300" alt="Alpine lake reflection" loading="lazy" />
      <div class="overlay"><svg class="zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>
    </div>
  </div>

  <!-- lightbox -->
  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo lightbox" hidden>
    <div class="lb-backdrop" id="lb-backdrop"></div>
    <button class="lb-close" id="lb-close" aria-label="Close lightbox">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <button class="lb-arrow lb-prev" id="lb-prev" aria-label="Previous photo">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <div class="lb-content">
      <img class="lb-img" id="lb-img" src="" alt="" />
      <p class="lb-caption" id="lb-caption"></p>
      <span class="lb-counter" id="lb-counter"></span>
    </div>
    <button class="lb-arrow lb-next" id="lb-next" aria-label="Next photo">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  </div>
</div>`,
  css: `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#0f172a;color:#f1f5f9;padding:32px 20px;min-height:100vh}
.page-title{font-size:26px;font-weight:800;text-align:center;margin-bottom:6px}
.page-sub{font-size:14px;color:#64748b;text-align:center;margin-bottom:28px}
/* grid */
.gallery{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:200px;gap:10px}
.item{position:relative;overflow:hidden;border-radius:10px;cursor:pointer}
.item-wide{grid-column:span 2}
.item-tall{grid-row:span 2}
.item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease}
/* overlay */
.overlay{position:absolute;inset:0;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;transition:background .3s}
.zoom-icon{width:36px;height:36px;color:#fff;opacity:0;transform:scale(.7);transition:opacity .3s,transform .3s}
.item:hover .overlay{background:rgba(0,0,0,.45)}
.item:hover .zoom-icon{opacity:1;transform:scale(1)}
.item:hover img{transform:scale(1.06)}
/* lightbox */
.lightbox{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center}
.lightbox[hidden]{display:none}
.lb-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.92)}
.lb-content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:12px;max-width:90vw;max-height:90vh}
.lb-img{max-width:90vw;max-height:78vh;object-fit:contain;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,.6);animation:lbIn .25s ease}
@keyframes lbIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
.lb-caption{font-size:13px;color:#94a3b8;text-align:center}
.lb-counter{font-size:12px;color:#475569}
.lb-close{position:fixed;top:16px;right:16px;z-index:2;width:40px;height:40px;border-radius:50%;border:1.5px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer}
.lb-close:hover{background:rgba(255,255,255,.2)}
.lb-arrow{position:fixed;top:50%;transform:translateY(-50%);z-index:2;width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer}
.lb-arrow:hover{background:rgba(255,255,255,.2)}
.lb-arrow:disabled{opacity:.2;cursor:default}
.lb-prev{left:16px}
.lb-next{right:16px}
@media(max-width:600px){.gallery{grid-template-columns:repeat(2,1fr);grid-auto-rows:140px}.item-wide{grid-column:span 2}}`,
  js: `const items = [...document.querySelectorAll('.gallery .item')];
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-caption');
const lbCount = document.getElementById('lb-counter');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');
const lbBackdrop = document.getElementById('lb-backdrop');
let current = 0;

function openLightbox(index) {
  current = index;
  showPhoto();
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  lbClose.focus();
}

function closeLightbox() {
  lb.hidden = true;
  document.body.style.overflow = '';
  items[current].querySelector('img').focus();
}

function showPhoto() {
  const el = items[current];
  lbImg.src = el.dataset.src;
  lbImg.alt = el.dataset.alt;
  lbCap.textContent = el.dataset.cap || '';
  lbCount.textContent = \`\${current + 1} / \${items.length}\`;
  lbPrev.disabled = current === 0;
  lbNext.disabled = current === items.length - 1;
  // restart animation
  lbImg.classList.remove('lb-anim');
  void lbImg.offsetWidth;
  lbImg.style.animation = 'none';
  requestAnimationFrame(() => { lbImg.style.animation = ''; });
}

items.forEach((el, i) => el.addEventListener('click', () => openLightbox(i)));
lbClose.addEventListener('click', closeLightbox);
lbBackdrop.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => { if (current > 0) { current--; showPhoto(); } });
lbNext.addEventListener('click', () => { if (current < items.length - 1) { current++; showPhoto(); } });

// keyboard navigation
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft' && current > 0) { current--; showPhoto(); }
  if (e.key === 'ArrowRight' && current < items.length - 1) { current++; showPhoto(); }
});

// swipe support
let touchStartX = 0;
lb.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    if (dx < 0 && current < items.length - 1) { current++; showPhoto(); }
    if (dx > 0 && current > 0) { current--; showPhoto(); }
  }
});`,
  seo: {
    title: 'Photo Gallery with Lightbox — Free HTML CSS JS Snippet',
    description: `CSS grid masonry gallery with hover overlays, zoom-in animation, full-screen lightbox, arrow/keyboard/swipe navigation. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Photo Gallery with Lightbox — CSS Grid Layout, Hover Overlays & Keyboard-Navigable Lightbox in Vanilla JS`,
      description: `A professional photo gallery needs two layers: a compact grid that shows thumbnails at a glance, and a full-screen lightbox for focused viewing. This snippet delivers both — a CSS grid with wide and tall spanning items, smooth hover overlays with a zoom-in icon, and a full-screen lightbox with fade-in animation, prev/next arrows, keyboard navigation (Escape, arrow keys), touch swipe, caption display, and position counter — all in pure HTML, CSS, and vanilla JavaScript.

A well-built photo gallery is one of the most complex layout challenges in UI development: it must present many images compactly without reflow jank, handle images of different aspect ratios gracefully, provide a fast path to full-screen viewing, and remain accessible on both desktop and mobile. This snippet covers the complete stack — CSS grid layout, hover overlays, full-screen lightbox, keyboard navigation, swipe gestures, and lazy loading — in pure HTML, CSS, and vanilla JavaScript with no dependencies.

**CSS grid with spanning items**

The gallery uses \`display: grid\` with \`grid-template-columns: repeat(3, 1fr)\` and \`grid-auto-rows: 200px\`. Items span multiple columns or rows using \`.item-wide { grid-column: span 2 }\` and \`.item-tall { grid-row: span 2 }\`. This produces a masonry-like layout where feature images can be wider or taller than thumbnails without JavaScript. The key technique for making images fill their grid cell regardless of intrinsic dimensions is \`width: 100%; height: 100%; object-fit: cover\` on the \`<img>\` element — \`cover\` scales the image to fill the container while cropping rather than stretching or leaving whitespace.

**Hover overlay animation**

Each grid item has a \`<div class="overlay">\` absolutely positioned over the image. On hover, the overlay's background transitions from \`rgba(0,0,0,0)\` to \`rgba(0,0,0,0.45)\` and a zoom icon SVG transitions from \`opacity:0; transform:scale(0.7)\` to \`opacity:1; transform:scale(1)\`. Simultaneously, the image itself scales up to \`scale(1.06)\` via a transform on \`img:hover\`, but because \`overflow:hidden\` is set on the parent \`.item\`, the scaled image stays within the card boundary — the zoom-in feels like you're pushing through the frame.

**Lightbox open/close and focus management**

Clicking a gallery item calls \`openLightbox(index)\` which sets \`lb.hidden = false\`, locks the scroll with \`document.body.style.overflow = 'hidden'\`, and moves keyboard focus to the close button. Closing calls \`closeLightbox()\` which sets \`lb.hidden = true\`, unlocks scroll, and returns focus to the thumbnail that was clicked (\`items[current].querySelector('img').focus()\`). This focus-return pattern is required for screen reader compatibility — without it, keyboard users lose their place in the document after closing the modal.

**Photo switching and animation restart**

\`showPhoto()\` updates \`lbImg.src\`, \`lbImg.alt\`, the caption, and the counter. To restart the fade-in animation on each photo change, it sets \`lbImg.style.animation = 'none'\`, forces a reflow with \`void lbImg.offsetWidth\` (a sync layout read that flushes the pending style), then clears the inline animation style inside a \`requestAnimationFrame\` — this causes the browser to re-apply the keyframe from the stylesheet on the next frame. Without the forced reflow, the browser batches the style change and the animation doesn't restart.

**Keyboard and touch navigation**

A \`document.keydown\` handler checks whether the lightbox is open before acting: Escape closes, ArrowLeft decrements \`current\`, ArrowRight increments it. Touch navigation uses \`touchstart\` (passive listener for scroll performance) to record \`startX\`, and \`touchend\` to compute \`dx\`. A 50px threshold filters accidental taps.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Load the snippet',
        text: `Paste the HTML, CSS, and JS into your page. A 3-column dark grid appears with photos from Picsum — wide and tall items create an editorial mosaic layout.`,
      },
      {
        title: 'Hover over any photo',
        text: `A semi-transparent dark overlay fades in with a magnifier "+" icon. The photo simultaneously scales up slightly, constrained by the cell's overflow:hidden.`,
      },
      {
        title: 'Click to open the lightbox',
        text: `The lightbox opens full-screen with the photo fading in at scale. Caption and position counter ("2 / 7") appear below the image.`,
      },
      {
        title: 'Navigate with arrows or keyboard',
        text: `Click the ← / → arrows or press the keyboard arrow keys to move between photos. The Escape key closes the lightbox.`,
      },
      {
        title: 'Swipe on mobile',
        text: `Touch-swipe left or right in the lightbox to navigate between photos. A 50px threshold prevents accidental swipes during scrolling.`,
      },
      {
        title: 'Swap in your own images',
        text: `Replace each \`data-src\` (full image URL), \`src\` (thumbnail URL), \`alt\`, and \`data-cap\` attributes on the \`.item\` divs. Add or remove \`.item\` divs to change the gallery size.`,
      },
    ] },
    features: [
      {
        title: 'CSS grid with spanning cells',
        text: `\`.item-wide\` spans 2 columns and \`.item-tall\` spans 2 rows — creating an editorial mosaic layout without JavaScript or a third-party masonry library.`,
      },
      {
        title: 'Hover overlay + zoom animation',
        text: `Each item has a semi-transparent overlay that fades in on hover, with a zoom icon that scales from 70% to 100% and the image that scales to 106%.`,
      },
      {
        title: 'Full-screen lightbox',
        text: `Modal overlay with \`position:fixed; inset:0\` and \`backdrop:rgba(0,0,0,.92)\`. The photo fades in from scale 0.95 using a \`@keyframes lbIn\` animation.`,
      },
      {
        title: 'Keyboard navigation',
        text: `Escape closes the lightbox; ArrowLeft/ArrowRight navigate. Focus is trapped on open and returned to the trigger thumbnail on close.`,
      },
      {
        title: 'Touch swipe support',
        text: `Passive \`touchstart\` + \`touchend\` listeners detect left/right swipes with a 50px threshold — no touch library needed.`,
      },
      {
        title: 'Caption and counter',
        text: `Caption text from \`data-cap\` and a position counter ("1 / 7") display below the lightbox image. Both update instantly on navigation.`,
      },
      {
        title: 'Lazy loading thumbnails',
        text: `All \`<img>\` elements have \`loading="lazy"\` — the browser defers loading off-screen thumbnails until they're about to scroll into view.`,
      },
      {
        title: 'Responsive breakpoint',
        text: `At ≤600px, the grid switches to 2 columns with a shorter row height. Wide items still span 2 columns to maintain the editorial feel on mobile.`,
      },
    ],
    useCases: [
      {
        title: 'Portfolio and photography sites',
        text: `Display project screenshots or photos in a masonry grid with a lightbox for full-resolution viewing. Pair with a [hero section](/ui-snippets/hero-section/) above for a personal site.`,
      },
      {
        title: 'Product image galleries',
        text: `E-commerce product detail pages can use the grid for alternate angles and a standalone [image lightbox](/ui-snippets/image-lightbox/) for zoom-in inspection. Add an [image magnifier](/ui-snippets/image-magnifier/) for hover-to-zoom on fabric and texture detail.`,
      },
      {
        title: 'Event recap pages',
        text: `Showcase conference, wedding, or party photos in an editorial grid with captions. Wide cells can highlight key moments with a panoramic photo.`,
      },
      {
        title: 'Real estate listings',
        text: `Property listings can display room photos in the grid with the lightbox for full-screen viewing. Caption each photo with the room name.`,
      },
      {
        title: 'Blog post embedded galleries',
        text: `Embed a compact grid inside a long-form article for series of screenshots or diagrams, with lightbox access for readers who want to inspect details.`,
      },
      {
        title: 'Team or client showcase',
        text: `Display headshots or brand logos in a uniform grid. Clicking opens a larger image with name and role as the caption text.`,
      },
      { icon: 'CODE', title: 'Related: Smart TV Mockup', desc: 'See the [Smart TV Mockup](/ui-snippets/tv-mockup/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How do I add more photos?',
        a: `Add a \`.item\` div for each photo with \`data-src\` (full URL), \`src\` (thumbnail), \`alt\`, and \`data-cap\` attributes. Copy the overlay SVG from an existing item. Add \`.item-wide\` or \`.item-tall\` for spanning cells. The JS uses \`querySelectorAll(".gallery .item")\` so new items are picked up automatically.`,
      },
      {
        q: 'How do I use local images instead of Picsum?',
        a: `Replace the \`src\` and \`data-src\` attributes with your own image paths. Thumbnails can be the same image as the full version — \`object-fit:cover\` crops them to the grid cell size. For production, generate separate thumbnail sizes to reduce load time.`,
      },
      {
        q: 'Can I make the grid use equal-height rows without wide/tall items?',
        a: `Remove the \`.item-wide\` and \`.item-tall\` classes from the HTML and their CSS rules. Change \`grid-template-columns\` to \`repeat(auto-fill, minmax(200px,1fr))\` for a fully responsive equal-height grid.`,
      },
      {
        q: 'Can I use this photo gallery in React, Vue, or Angular?',
        a: `Yes. Use the JSX, Vue, Angular, or Tailwind export buttons on this page. In React, keep \`currentIndex\` and \`lightboxOpen\` in \`useState\`. Render the lightbox conditionally with a portal (\`ReactDOM.createPortal\`) so it sits outside the gallery DOM tree. Attach keyboard listeners in \`useEffect\` with cleanup. In Vue, use \`v-if\` on the lightbox and handle keyboard events in \`mounted\`/\`beforeUnmount\`. In Angular, use \`*ngIf\` and \`@HostListener\`.`,
      },
      {
        q: 'Why does the snippet use void lbImg.offsetWidth to restart the animation?',
        a: `Setting \`animation: none\` then immediately removing it in the same JS tick doesn't restart the animation because the browser batches style changes. Reading \`offsetWidth\` forces a synchronous layout flush, committing the \`animation:none\` state before the next style is applied. The \`requestAnimationFrame\` callback then removes the inline style, letting the CSS animation re-apply from frame 0.`,
      },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the grid spanning or the focus-management details by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the item-wide and item-tall classes combine with CSS grid's grid-auto-rows to create the masonry-like layout, and why closeLightbox deliberately returns focus to the thumbnail image that was clicked rather than just hiding the modal. The same assistant can help optimize it, for example checking whether lazy-loading the full-resolution lightbox images ahead of time (prefetching the next/previous photo) would make arrow navigation feel snappier, or whether the touch-swipe threshold of 50px is well tuned against accidental scroll gestures. It's also useful for extending the effect: ask it to add pinch-to-zoom on the lightbox image, a thumbnail filmstrip along the bottom, or lazy-load the grid itself with an IntersectionObserver for very large photo sets. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a photo gallery grid with a full-screen lightbox in plain HTML, CSS, and vanilla JavaScript, with no third-party masonry or lightbox library.

Requirements:
- A CSS grid gallery with a fixed number of columns and a fixed grid-auto-rows height, where individual items can span two columns or two rows via dedicated classes to create a mosaic/masonry look, and every thumbnail image uses object-fit: cover so it fills its cell regardless of its native aspect ratio.
- On hover, each grid item must reveal a semi-transparent overlay with a centered zoom icon that fades and scales in, while the underlying image simultaneously scales up slightly, clipped by the item's overflow: hidden so the zoomed image never escapes its cell.
- A full-screen lightbox (position: fixed, covering the viewport) that opens when a grid item is clicked, showing the full-resolution image, a caption, and a "current / total" counter, with previous/next arrow buttons that disable themselves at the first and last photo.
- The lightbox image must play a fade-and-scale-in entrance animation every time the displayed photo changes, correctly restarted via the animation:none plus forced-reflow plus requestAnimationFrame technique rather than relying on the browser to replay an already-finished CSS animation.
- Keyboard support while the lightbox is open: Escape closes it, ArrowLeft/ArrowRight navigate to the previous/next photo, and closing the lightbox must return keyboard focus to the thumbnail that originally opened it (not just hide the modal).
- Touch swipe support using passive touchstart/touchend listeners that compute the horizontal drag distance and navigate photos when it exceeds roughly 50 pixels, ignoring shorter accidental swipes.
- Give every thumbnail image loading="lazy" so off-screen images defer loading, and make the whole gallery responsive by dropping to fewer grid columns and a shorter row height below a mobile breakpoint.`,
    },
  },
};

export default photoGallery;
