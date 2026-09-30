const emblaCarouselLazyLoadImages = {
  id: 'embla-carousel-lazy-load-images',
  title: 'Embla Carousel Lazy-Loaded Images with slidesInView',
  lastmod: '2026-09-25',
  category: 'carousels',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/embla-carousel@8.6.0/embla-carousel.umd.js',
  ],
  html: `<div class="ell">
  <div class="ell-head">
    <h2>Photo roll</h2>
    <div class="ell-stat" id="ellStat" aria-live="polite"></div>
  </div>
  <div class="ell-viewport" id="ellViewport">
    <div class="ell-container" id="ellList"></div>
  </div>
  <div class="ell-foot">
    <button type="button" id="ellPrev" aria-label="Previous photos">‹</button>
    <div class="ell-dots" id="ellMap" aria-hidden="true"></div>
    <button type="button" id="ellNext" aria-label="Next photos">›</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ell{width:100%;max-width:860px}
.ell-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px}
.ell-head h2{font-size:18px;color:#0f172a}
.ell-stat{font-size:12px;color:#64748b;font-variant-numeric:tabular-nums}
.ell-viewport{overflow:hidden}
.ell-container{display:flex;touch-action:pan-y pinch-zoom;margin-left:-12px}
.ell-slide{flex:0 0 50%;min-width:0;padding-left:12px}
@media (min-width:720px){.ell-slide{flex-basis:33.333%}}
.ell-frame{position:relative;aspect-ratio:4/5;border-radius:14px;overflow:hidden;background:#e2e8f0}
/* Shimmer placeholder until the image has actually decoded. */
.ell-frame::before{content:'';position:absolute;inset:0;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.55) 50%,transparent 70%);background-size:220% 100%;animation:ellShimmer 1.3s infinite}
.ell-frame.is-loaded::before{display:none}
.ell-frame img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .45s;user-select:none;-webkit-user-drag:none}
.ell-frame.is-loaded img{opacity:1}
.ell-frame.is-error{display:grid;place-items:center;color:#94a3b8;font-size:12px}
.ell-frame.is-error::before{display:none}
@keyframes ellShimmer{to{background-position:-120% 0}}
.ell-foot{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:14px}
.ell-foot button{width:36px;height:36px;border-radius:50%;border:1px solid #cbd5e1;background:#fff;font-size:18px;cursor:pointer}
.ell-foot button:disabled{opacity:.35;cursor:default}
.ell-foot button:focus-visible{outline:2px solid #0ea5e9;outline-offset:2px}
.ell-dots{display:flex;gap:4px}
.ell-dots i{width:8px;height:8px;border-radius:2px;background:#e2e8f0}
.ell-dots i.loaded{background:#38bdf8}
.ell-dots i.view{outline:2px solid #0f172a;outline-offset:1px}
@media (prefers-reduced-motion:reduce){.ell-frame::before{animation:none}.ell-frame img{transition:none}}`,

  js: `var IDS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28];
var list = document.getElementById('ellList');
var map = document.getElementById('ellMap');

// Images start with data-src only: no request is made until the slide is
// (nearly) in view. A decoded image is revealed with a fade.
IDS.forEach(function (id, i) {
  list.insertAdjacentHTML('beforeend',
    '<div class="ell-slide"><div class="ell-frame"><img data-src="https://picsum.photos/id/' + id + '/600/750" alt="Photo ' + (i + 1) + ' of ' + IDS.length + '"></div></div>');
  map.insertAdjacentHTML('beforeend', '<i></i>');
});

// inViewThreshold: 0 counts a slide as "in view" as soon as a single pixel
// shows, so a peeking slide starts loading before it is fully visible.
var embla = EmblaCarousel(document.getElementById('ellViewport'), { align: 'start', containScroll: 'trimSnaps', inViewThreshold: 0 });
var frames = embla.slideNodes().map(function (s) { return s.querySelector('.ell-frame'); });
var loaded = new Set();
var statEl = document.getElementById('ellStat');

function load(index) {
  if (loaded.has(index) || index < 0 || index >= frames.length) return;
  loaded.add(index);
  var frame = frames[index];
  var img = frame.querySelector('img');
  img.addEventListener('load', function () { frame.classList.add('is-loaded'); map.children[index].classList.add('loaded'); report(); }, { once: true });
  img.addEventListener('error', function () { frame.classList.add('is-error'); frame.textContent = 'Could not load'; report(); }, { once: true });
  img.src = img.dataset.src;
}

function report() {
  var done = frames.filter(function (f) { return f.classList.contains('is-loaded'); }).length;
  statEl.textContent = done + ' of ' + frames.length + ' photos downloaded';
}

// slidesInView() lists the slides currently visible. Load those, plus one
// slide ahead, so the next swipe rarely lands on a placeholder.
function loadVisible() {
  var inView = embla.slidesInView();
  Array.prototype.forEach.call(map.children, function (d, i) { d.classList.toggle('view', inView.indexOf(i) !== -1); });
  inView.forEach(function (i) { load(i); load(i + 1); });
}

// slidesInView fires whenever the set of visible slides changes.
embla.on('slidesInView', loadVisible).on('reInit', loadVisible);
loadVisible();
report();

var prev = document.getElementById('ellPrev');
var next = document.getElementById('ellNext');
function arrows() { prev.disabled = !embla.canScrollPrev(); next.disabled = !embla.canScrollNext(); }
embla.on('select', arrows).on('reInit', arrows);
arrows();
prev.addEventListener('click', function () { embla.scrollPrev(); });
next.addEventListener('click', function () { embla.scrollNext(); });`,

  seo: {
    title: 'Embla Carousel Lazy-Loaded Images with slidesInView — Free Snippet',
    description: `An image carousel built with Embla Carousel v8 that only downloads photos as they come into view, using the slidesInView event, a one-slide look-ahead, shimmer placeholders, fade-in on load, error handling and a live download counter. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Embla Carousel Lazy Loading — Download Only What People Actually See',
      description: `A carousel of 18 photos that loads everything up front makes visitors download images most of them will never swipe to. Lazy loading downloads a photo only when its slide is about to be seen. Embla reports which slides are visible, which makes this straightforward and more precise than native \`loading="lazy"\`.

**Why not loading="lazy"?**

Native lazy loading works on distance from the viewport, but slides inside an \`overflow: hidden\` carousel are positioned with transforms. Browsers handle this inconsistently: some load hidden slides immediately, others don't load them until too late. Asking the carousel itself is reliable.

**slidesInView drives the loading**

Each image starts with its URL in \`data-src\` and no \`src\`, so nothing is requested. Embla's \`slidesInView\` event fires whenever the set of visible slides changes, and \`embla.slidesInView()\` returns their indexes. The handler copies \`data-src\` into \`src\` for those slides. With \`inViewThreshold: 0\`, a slide counts as visible as soon as one pixel shows, so a peeking slide starts loading early.

**Look one slide ahead**

Loading only what's visible means the next swipe often lands on a placeholder. The handler also loads the slide after each visible one, which hides most of the latency without downloading the whole set.

**Placeholders, fade-in and errors**

A shimmer placeholder covers each frame until the image's \`load\` event, then the image fades in. The \`error\` event swaps in a message instead of leaving an endless shimmer. The frame has a fixed aspect ratio, so nothing jumps when images arrive.

**Seeing the effect**

The strip of squares under the carousel shows which photos have downloaded and which are in view, and the header counts downloads, so you can watch requests happen as you swipe.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load Embla', text: `Include embla-carousel.umd.js from the CDN.` },
      { title: 'Paste the snippet', text: `Only the first few photos download; the rest show shimmer placeholders.` },
      { title: 'Swipe or use the arrows', text: `Photos load as their slides approach the viewport.` },
      { title: 'Watch the map', text: `Blue squares are downloaded; outlined squares are in view.` },
      { title: 'Use your images', text: `Put real URLs in data-src and keep src empty.` },
    ] },
    features: [
      { title: 'Visibility-driven loading', text: `Embla's slidesInView event and method.` },
      { title: 'Early trigger', text: `inViewThreshold: 0 counts peeking slides.` },
      { title: 'One-slide look-ahead', text: `The next slide is fetched in advance.` },
      { title: 'Shimmer placeholders', text: `Shown until the image loads.` },
      { title: 'Fade-in reveal', text: `Opacity transition on load.` },
      { title: 'Error state', text: `A message replaces failed images.` },
      { title: 'No layout shift', text: `Fixed aspect-ratio frames.` },
      { title: 'Download counter', text: `Live count plus a visual map.` },
    ],
    useCases: [
      { title: 'Product and photo galleries', text: `Large sets without heavy page weight.` },
      { title: 'Mobile-first sites', text: `Save data on slow connections.` },
      { title: 'Real-estate listings', text: `Dozens of photos per property.` },
      { title: 'Social feeds', text: `Horizontal media rows.` },
      { title: 'Performance work', text: `Improve Largest Contentful Paint.` },
      { icon: 'CODE', title: 'Related: Lazy-Loaded Carousel', desc: 'A dependency-free take: [Lazy-Loaded Carousel](/ui-snippets/lazy-loaded-carousel/).' },
      { icon: 'CODE', title: 'Related: Lazy Load Image Grid', desc: 'IntersectionObserver in a grid: [Lazy Load Image Grid](/ui-snippets/lazy-load-image-grid-observer/).' },
    ],
    faqs: [
      { q: 'How do I lazy load images in Embla Carousel?', a: `Store each image URL in a data attribute, listen for the slidesInView event, and for each index returned by embla.slidesInView() copy the data attribute into src. Mark loaded slides so they are only processed once.` },
      { q: 'Why not use the native loading="lazy" attribute?', a: `Carousel slides are hidden with overflow and moved with transforms, and browsers treat them inconsistently for native lazy loading. Using the carousel's own visibility information is more predictable.` },
      { q: 'What does inViewThreshold do?', a: `It sets how much of a slide must be visible to count as in view, from 0 to 1. A value of 0 means a single visible pixel is enough, which starts loading as soon as a slide peeks in.` },
      { q: 'Should I load the next slide too?', a: `Usually yes. Loading one slide beyond the visible ones hides most network latency on the next swipe, while still avoiding downloading the whole gallery.` },
      { q: 'How do I prevent layout shift while images load?', a: `Give each frame a fixed aspect ratio, or width and height attributes on the image, so space is reserved before the image arrives.` },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI assistant like Claude and ask it why slidesInView is more reliable than native lazy loading inside a carousel. Ask it to add responsive srcset and sizes, low-quality blurred placeholders, preloading two slides ahead on fast connections using the Network Information API, or retrying failed images. It can also measure the effect on page weight with your own images.`,
      prompt: `Build a lazy-loading image carousel with Embla Carousel v8 (loaded from a CDN as UMD) in plain HTML, CSS and JavaScript.

Requirements:
- Eighteen photo slides, two per view on phones and three on wider screens, aligned to the start with trimmed ends.
- Each image starts with its URL in data-src and no src, inside a frame with a fixed 4:5 aspect ratio and a shimmer placeholder.
- Treat a slide as in view as soon as one pixel is visible, and on the slidesInView event load the visible slides plus the next one.
- Fade images in on load, show an error message if an image fails, and never load an image twice.
- Show a live "X of 18 photos downloaded" counter and a row of small squares indicating which photos are downloaded and which are in view.
- Add previous and next buttons that disable at the ends, and respect reduced motion for the shimmer and fade.`,
    },
  },
};

export default emblaCarouselLazyLoadImages;
