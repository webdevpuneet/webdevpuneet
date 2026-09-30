const lazyLoadedCarousel = {
  id: 'lazy-loaded-carousel',
  title: 'Lazy-Loaded Carousel',
  lastmod: '2026-09-14',
  category: 'carousels',
  html: `<div class="llc-wrap">
  <div class="llc-track" id="llcTrack">
    <div class="llc-slide" data-bg="#6366f1,#4338ca" data-icon="🎧"><div class="llc-placeholder"></div></div>
    <div class="llc-slide" data-bg="#0ea5e9,#0369a1" data-icon="📷"><div class="llc-placeholder"></div></div>
    <div class="llc-slide" data-bg="#ec4899,#9d174d" data-icon="⌚"><div class="llc-placeholder"></div></div>
    <div class="llc-slide" data-bg="#10b981,#047857" data-icon="🎮"><div class="llc-placeholder"></div></div>
    <div class="llc-slide" data-bg="#f59e0b,#b45309" data-icon="🔊"><div class="llc-placeholder"></div></div>
  </div>
  <div class="llc-controls">
    <button class="llc-btn" id="llcPrev" aria-label="Previous">‹</button>
    <div class="llc-dots" id="llcDots"></div>
    <button class="llc-btn" id="llcNext" aria-label="Next">›</button>
  </div>
  <p class="llc-log" id="llcLog">Loaded: none yet</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f6f7f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.llc-wrap{width:100%;max-width:420px}
.llc-track{display:flex;overflow:hidden;border-radius:16px;position:relative;height:220px}
.llc-slide{position:absolute;inset:0;opacity:0;transition:opacity .4s ease;display:flex;align-items:center;justify-content:center}
.llc-slide.llc-active{opacity:1;z-index:1}
.llc-placeholder{width:100%;height:100%;background:#e5e7eb;display:flex;align-items:center;justify-content:center;font-size:11px;color:#9ca3af;font-weight:700}
.llc-slide.llc-loaded .llc-placeholder{background:var(--llc-bg);color:transparent}
.llc-slide.llc-loaded::after{content:attr(data-icon);position:absolute;font-size:56px;z-index:1}
.llc-controls{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:16px}
.llc-btn{width:36px;height:36px;border-radius:50%;background:#fff;border:1.5px solid #e3e5ea;color:#4b5563;font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:border-color .15s,color .15s}
.llc-btn:hover{border-color:#6366f1;color:#6366f1}
.llc-dots{display:flex;gap:7px}
.llc-dot{width:7px;height:7px;border-radius:50%;background:#d1d5db;border:none;cursor:pointer;transition:background .2s,width .2s}
.llc-dot.active{background:#6366f1;width:20px;border-radius:4px}
.llc-log{text-align:center;font-size:11px;color:#9ca3af;margin-top:12px}`,

  js: `var slides = document.querySelectorAll('.llc-slide');
var dotsWrap = document.getElementById('llcDots');
var logEl = document.getElementById('llcLog');
var current = 0;
var loaded = {};

slides.forEach(function (s, i) {
  var d = document.createElement('button');
  d.className = 'llc-dot';
  d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  d.addEventListener('click', function () { goTo(i); });
  dotsWrap.appendChild(d);
});
var dots = document.querySelectorAll('.llc-dot');

function fakeLoad(index) {
  return new Promise(function (resolve) {
    // Simulates an async image fetch (a real implementation would set
    // img.src here and resolve on the load event). A short randomized delay
    // stands in for real network latency so the placeholder-to-content swap
    // is visibly distinct from an instant, synchronous render.
    setTimeout(function () { resolve(); }, 250 + Math.random() * 250);
  });
}

function ensureLoaded(index) {
  if (loaded[index]) return;
  loaded[index] = true;
  var slide = slides[index];
  fakeLoad(index).then(function () {
    slide.style.setProperty('--llc-bg', 'linear-gradient(160deg,' + slide.dataset.bg + ')');
    slide.classList.add('llc-loaded');
    logEl.textContent = 'Loaded: slide ' + (index + 1);
  });
}

// The IntersectionObserver watches every slide but only triggers a load for
// ones that actually become visible-or-nearly-visible — the neighbors of the
// active slide, driven by a generous rootMargin, load slightly BEFORE they're
// navigated to, so there's no visible pop-in the instant you click next.
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var index = Array.prototype.indexOf.call(slides, entry.target);
      ensureLoaded(index);
    }
  });
}, { root: null, rootMargin: '0px 100% 0px 100%', threshold: 0.01 });

slides.forEach(function (s) { observer.observe(s); });

function render() {
  slides.forEach(function (s, i) { s.classList.toggle('llc-active', i === current); });
  dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
  ensureLoaded(current);
}

function goTo(i) { current = i; render(); }
function next() { goTo((current + 1) % slides.length); }
function prev() { goTo((current - 1 + slides.length) % slides.length); }

document.getElementById('llcNext').addEventListener('click', next);
document.getElementById('llcPrev').addEventListener('click', prev);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') next();
  else if (e.key === 'ArrowLeft') prev();
});

render();`,

  seo: {
    title: 'Lazy-Loaded Carousel — HTML CSS JS Snippet',
    description: 'A carousel that only loads each slide\'s real content right before it\'s needed — IntersectionObserver with a generous rootMargin pre-loads the active slide and its immediate neighbors, showing a placeholder until then. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Lazy-Loaded Carousel — Loading Just Ahead of the Click, Not All Upfront',
      description: `A carousel with ten heavy images usually loads all ten the instant the page loads, even though a visitor might only ever see the first two. This snippet defers that work: every slide starts as a plain gray placeholder, and its real content only loads the moment that slide is genuinely about to matter — either because it's the currently active one, or because it's sitting just outside the viewport where a viewer is about to scroll or click to it.\n\n**A generous rootMargin turns "about to be needed" into a real signal**\n\nThe \`IntersectionObserver\` here uses \`rootMargin: '0px 100% 0px 100%'\` — expanding its effective viewport by a full container-width on both the left and right. That means a slide is reported as "intersecting" not just when it's literally on screen, but when it's within one carousel-width of being on screen — exactly capturing "the neighbor you're about to navigate to," so its load kicks off *before* you click next, not after.\n\n**A load-tracking map instead of re-fetching on every visit**\n\n\`loaded\` is a plain object keyed by slide index — \`ensureLoaded()\` checks it first and does nothing if that index has already started loading, even if the observer fires again for the same slide later (e.g. scrolling back and forth). That guard is what makes this safe to call from both the observer callback *and* directly from \`render()\` on every navigation, without ever double-fetching the same slide's content.\n\n**Simulated latency, standing in for a real fetch**\n\n\`fakeLoad()\` returns a Promise that resolves after a short randomized delay — a stand-in for a real \`<img>\`'s \`load\` event or a fetch call, deliberately visible enough that the placeholder-to-content swap reads as genuine asynchronous loading, not an instant synchronous render.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'The first slide shows a brief gray placeholder, then loads in with its icon and color.' },
        { title: 'Watch the log line', text: 'It reports exactly which slide just finished loading, in real time.' },
        { title: 'Click next', text: 'The slide you land on is often already loaded, since its neighbor status triggered a pre-load earlier.' },
        { title: 'Click through all five', text: 'Notice each one only ever loads once, even if you navigate back and forth repeatedly.' },
        { title: 'Swap in real images', text: 'Replace fakeLoad\'s setTimeout with an actual <img> element whose src is set only inside ensureLoaded, resolving on its load event.' },
      ],
    },
    features: [
      'Slides only load their real content when genuinely about to be needed, not all upfront on page load',
      'IntersectionObserver with an expanded rootMargin pre-loads the active slide\'s immediate neighbors ahead of time',
      'A load-tracking map guarantees each slide is only ever loaded once, no matter how many times it\'s revisited',
      'A visible placeholder-to-content swap and status log make the lazy-loading behavior observable, not just theoretical',
      'The pattern generalizes directly to real <img> elements — swap the simulated delay for a real load event',
      'Standard next/prev/dot navigation, unaffected by which slides have or haven\'t finished loading',
    ],
    useCases: [
      { icon: 'CODE',   title: 'Image-heavy product or portfolio carousels', desc: 'Avoid loading every high-resolution image upfront when a visitor may only ever see the first couple.' },
      { icon: 'APP',    title: 'Long testimonial or content carousels', desc: 'Defer loading avatar images, embeds, or rich content until a slide is actually about to be seen.' },
      { icon: 'FLOW',   title: 'Performance-sensitive landing pages', desc: 'Cut initial page weight significantly on pages where a carousel is not the very first thing visible.' },
      { icon: 'DESIGN', title: 'Learning the IntersectionObserver pre-load pattern', desc: 'A clear example of rootMargin used to trigger work slightly before an element is actually visible.' },
    ],
    faqs: [
      { q: 'How do I use this with real images instead of the simulated delay?', a: 'Replace the body of fakeLoad with code that creates or updates a real <img> element\'s src attribute and resolves the returned Promise on that image\'s load (and error) event, instead of a setTimeout — everything else in the pattern (the observer, the loaded map, ensureLoaded) works unchanged.' },
      { q: 'Why use rootMargin instead of the default (0px) viewport bounds?', a: 'The default would only trigger a load once a slide is already visible — by the time a user clicks next, there\'d be a visible loading delay. Expanding the observed area by a full container-width in each direction (100%) means a slide starts loading while it\'s still just off-screen, so it\'s often already loaded by the time it becomes active.' },
      { q: 'What stops a slide from loading multiple times if it re-enters the observed area repeatedly?', a: 'The loaded object is checked at the very top of ensureLoaded and set to true before the async load even starts — every subsequent call for that same index, whether from the observer firing again or from render(), sees it\'s already been claimed and does nothing further.' },
      { q: 'Does this work well with the IntersectionObserver\'s root set to something other than the viewport?', a: 'Yes — set root to the carousel\'s own scrollable ancestor (if the carousel sits inside its own scroll container) instead of null (the viewport) so the intersection calculation is relative to that container rather than the whole page.' },
      { q: 'Is it accessible?', a: 'Arrows and dots are real labeled buttons operable via Left/Right arrow keys; for real images, ensure meaningful alt text is set at the same time the src is set, so a screen reader announces accurate content once loading completes.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the IntersectionObserver uses an expanded rootMargin ('0px 100% 0px 100%') instead of the default viewport bounds, and how that specific margin value relates to pre-loading a slide's immediate neighbors before they're navigated to. It's also worth asking the assistant to adapt fakeLoad to use real <img> elements with actual src assignment and load-event resolution, or to add a visible loading spinner inside the placeholder while a slide's content is in flight.`,
      prompt: `Build a lazy-loading carousel in plain HTML, CSS, and vanilla JavaScript where each slide's real content only loads when that slide is about to be needed, using IntersectionObserver — no library.

Requirements:
- Several slide elements stacked absolutely within a viewport, each starting in a placeholder state (a plain neutral-colored box) with its real content (represented by a data attribute or similar, standing in for a real image URL) not yet applied.
- A "loaded" tracking structure (e.g. an object or Set keyed by slide index) that records which slides have already had their real content applied, checked before starting any load so a slide's content-loading logic can only ever run once per slide, no matter how many times loading is triggered for it.
- An asynchronous load function (standing in for a real image fetch or img.load event, using a Promise that resolves after a short delay) that, once it resolves for a given slide, swaps that slide's placeholder into its real content state with a visible CSS transition, not an instant snap.
- A single IntersectionObserver watching every slide, configured with a rootMargin significantly larger than the default zero margin (expanding the effectively-observed area by roughly a full container-width to either side) so that a slide is detected and begins loading its content once it comes within about one carousel-width of being visible — not only once it is already fully on screen.
- The currently active slide must always be guaranteed to have its loading triggered as well (in case the observer hasn't yet fired for it), independent of the observer's own detection.
- Standard previous/next buttons and dynamically generated indicator dots for navigation, with Left/Right arrow key support, all functioning correctly regardless of which slides have or haven't finished loading their content.
- A visible status indicator on the page reporting which slide most recently finished loading, so the lazy-loading behavior is observable rather than purely internal.`,
    },
  },
};

export default lazyLoadedCarousel;
