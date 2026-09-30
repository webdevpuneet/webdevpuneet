const emblaCarouselVerticalNewsTicker = {
  id: 'embla-carousel-vertical-news-ticker',
  title: 'Embla Carousel Vertical News Ticker',
  lastmod: '2026-09-25',
  category: 'carousels',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/embla-carousel@8.6.0/embla-carousel.umd.js',
    'https://cdn.jsdelivr.net/npm/embla-carousel-autoplay@8.6.0/embla-carousel-autoplay.umd.js',
  ],
  html: `<div class="evt">
  <div class="evt-card">
    <div class="evt-label"><span class="evt-live"></span>Breaking</div>
    <div class="evt-viewport" id="evtViewport" aria-live="off">
      <div class="evt-container" id="evtList"></div>
    </div>
    <div class="evt-ctrl">
      <button type="button" id="evtUp" aria-label="Previous headline">▲</button>
      <button type="button" id="evtDown" aria-label="Next headline">▼</button>
      <button type="button" id="evtPause" aria-label="Pause ticker">❚❚</button>
    </div>
  </div>
  <p class="evt-note">Headlines rotate every 3.5 s · hover, focus or press pause to stop</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.evt{width:100%;max-width:760px}
.evt-card{display:flex;align-items:stretch;background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;box-shadow:0 4px 18px rgba(15,23,42,.06)}
.evt-label{display:flex;align-items:center;gap:8px;background:#dc2626;color:#fff;font:800 12px system-ui;letter-spacing:.08em;text-transform:uppercase;padding:0 16px;flex:0 0 auto}
.evt-live{width:8px;height:8px;border-radius:50%;background:#fff;animation:evtBlink 1.4s infinite}
@keyframes evtBlink{50%{opacity:.25}}
/* A vertical Embla viewport needs an explicit height: slides are stacked
   in a column and the viewport shows exactly one of them. */
.evt-viewport{overflow:hidden;height:56px;flex:1;min-width:0}
.evt-container{display:flex;flex-direction:column;height:100%;touch-action:pan-x pinch-zoom}
.evt-slide{flex:0 0 100%;min-height:0;display:flex;align-items:center;gap:12px;padding:0 16px}
.evt-slide time{font:700 12px system-ui;color:#dc2626;font-variant-numeric:tabular-nums;flex:0 0 auto}
.evt-slide a{color:#0f172a;text-decoration:none;font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.evt-slide a:hover{text-decoration:underline}
.evt-slide a:focus-visible{outline:2px solid #dc2626;outline-offset:2px;border-radius:3px}
.evt-ctrl{display:flex;border-left:1px solid #e2e8f0}
.evt-ctrl button{width:40px;border:0;background:#fff;color:#475569;font-size:11px;cursor:pointer}
.evt-ctrl button:hover{background:#f8fafc;color:#0f172a}
.evt-ctrl button:focus-visible{outline:2px solid #dc2626;outline-offset:-2px}
.evt-note{font-size:12px;color:#64748b;margin-top:10px;text-align:center}
@media (prefers-reduced-motion:reduce){.evt-live{animation:none}}`,

  js: `var NEWS = [
  ['09:42', 'Central bank holds rates steady for the third straight meeting'],
  ['09:31', 'Open-source browser engine ships native masonry layout by default'],
  ['09:15', 'Heatwave warning extended across southern regions until Friday'],
  ['08:58', 'City council approves car-free weekends on the riverside'],
  ['08:40', 'Chip maker announces new plant, 2,000 jobs expected'],
  ['08:22', 'Underdogs reach the final after a penalty shoot-out'],
];
var list = document.getElementById('evtList');
NEWS.forEach(function (n) {
  list.insertAdjacentHTML('beforeend',
    '<div class="evt-slide"><time>' + n[0] + '</time><a href="#">' + n[1] + '</a></div>');
});

var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var autoplay = EmblaCarouselAutoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true, playOnInit: !reduce });

// axis:'y' makes Embla measure heights and translate on the Y axis.
// The container is a flex COLUMN and the viewport has a fixed height.
var embla = EmblaCarousel(document.getElementById('evtViewport'), { axis: 'y', loop: true, duration: 22 }, [autoplay]);

document.getElementById('evtUp').addEventListener('click', function () { embla.scrollPrev(); });
document.getElementById('evtDown').addEventListener('click', function () { embla.scrollNext(); });

var pauseBtn = document.getElementById('evtPause');
var userPaused = reduce;
function paint() {
  pauseBtn.textContent = userPaused ? '▶' : '❚❚';
  pauseBtn.setAttribute('aria-label', userPaused ? 'Play ticker' : 'Pause ticker');
}
paint();
pauseBtn.addEventListener('click', function () {
  userPaused = !userPaused;
  if (userPaused) autoplay.stop(); else autoplay.play();
  paint();
});

// Only the visible headline's link is tabbable; focusing the ticker pauses it.
var slides = embla.slideNodes();
function syncTab() {
  var sel = embla.selectedScrollSnap();
  slides.forEach(function (s, i) {
    s.setAttribute('aria-hidden', i === sel ? 'false' : 'true');
    s.querySelector('a').tabIndex = i === sel ? 0 : -1;
  });
}
embla.on('select', syncTab);
syncTab();

var card = document.querySelector('.evt-card');
card.addEventListener('focusin', function () { autoplay.stop(); });
card.addEventListener('focusout', function (e) { if (!card.contains(e.relatedTarget) && !userPaused) autoplay.play(); });
list.addEventListener('click', function (e) { if (e.target.closest('a')) e.preventDefault(); });`,

  seo: {
    title: 'Embla Carousel Vertical News Ticker — Free Headline Rotator Snippet',
    description: `A breaking-news headline ticker built with Embla Carousel v8 on the vertical axis plus the Autoplay plugin: headlines roll up every few seconds, with up/down buttons, pause control, hover and focus pausing, and a clean tab order. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Embla Vertical Carousel — A News Ticker That Rolls Upward',
      description: `A single-line ticker that rolls headlines upward is a compact way to show a stream of updates: news, status messages, recent orders, or announcements. Embla's \`axis: 'y'\` option makes this a normal carousel turned on its side, with dragging, looping and plugins all still available.

**What changes for a vertical carousel**

Three things. The option \`axis: 'y'\` tells Embla to measure heights and translate vertically. The container becomes \`flex-direction: column\`. And the viewport needs an explicit height — here 56px, exactly one headline — because a column of slides has no natural height limit. \`touch-action: pan-x pinch-zoom\` flips the usual touch setting so vertical swipes drive the ticker while horizontal gestures stay with the page.

**Autoplay for rotation**

The Autoplay plugin advances every 3.5 seconds, loops, and pauses while the pointer is over the ticker. \`duration: 22\` makes the roll quick, so headlines don't feel sluggish.

**Pausing and accessibility**

Rotating text is hard to read if it can't be stopped. The ticker has an explicit pause button, pauses on hover and while keyboard focus is inside, and doesn't autoplay for users who prefer reduced motion. The viewport is \`aria-live="off"\`, so screen readers aren't interrupted by every rotation, and only the visible headline's link is in the tab order.

**Manual control**

Up and down buttons call \`scrollPrev()\` and \`scrollNext()\`, and dragging the ticker vertically works too.

**Truncation**

Long headlines are clipped with \`text-overflow: ellipsis\` on one line, so the ticker height never changes.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load Embla and Autoplay', text: `Include both UMD builds from the CDN.` },
      { title: 'Paste the snippet', text: `Headlines roll upward every 3.5 seconds.` },
      { title: 'Control it', text: `Use the up/down arrows, pause button, or drag vertically.` },
      { title: 'Feed your data', text: `Replace NEWS with [time, headline] pairs and real links.` },
      { title: 'Change pace', text: `Adjust delay in the Autoplay options and duration in Embla's.` },
    ] },
    features: [
      { title: 'Vertical axis', text: `axis: 'y' with a column container.` },
      { title: 'Fixed one-line viewport', text: `Explicit height shows one headline.` },
      { title: 'Autoplay rotation', text: `Looping, with hover pause.` },
      { title: 'Manual controls', text: `Up, down and pause buttons.` },
      { title: 'Vertical dragging', text: `touch-action tuned for the Y axis.` },
      { title: 'Quiet for screen readers', text: `aria-live off; visible link only in tab order.` },
      { title: 'Focus pause', text: `Keyboard users get the same pause as mouse users.` },
      { title: 'One-line truncation', text: `Ellipsis keeps height stable.` },
    ],
    useCases: [
      { title: 'News and media sites', text: `Breaking headlines bar.` },
      { title: 'E-commerce', text: `Recent orders or promotions.` },
      { title: 'Status pages', text: `Rolling incident updates.` },
      { title: 'Dashboards', text: `Latest events in one line.` },
      { title: 'Event sites', text: `Live schedule updates.` },
      { icon: 'CODE', title: 'Related: Announcement Bar', desc: 'A single static message bar: [Announcement Bar](/ui-snippets/announcement-bar/).' },
      { icon: 'CODE', title: 'Related: Swiper Vertical Full-Page Slider', desc: 'Vertical slides at full-page scale: [Swiper Vertical Full-Page Slider with Wheel Release](/ui-snippets/swiper-vertical-fullpage-slider/).' },
    ],
    faqs: [
      { q: 'How do I make a vertical Embla carousel?', a: `Pass axis: 'y' in the options, make the container a flex column, and give the viewport a fixed height. Embla then measures slide heights and scrolls vertically.` },
      { q: 'Why does my vertical carousel show all slides?', a: `The viewport needs an explicit height and overflow hidden. Without a height, a column of slides simply grows to fit all of them.` },
      { q: 'How should touch-action be set for a vertical carousel?', a: `Use touch-action: pan-x pinch-zoom on the container, the opposite of the horizontal setting, so vertical swipes drive the carousel and horizontal ones stay with the page.` },
      { q: 'Should a news ticker be a live region?', a: `Usually not. Announcing every rotation interrupts screen reader users. Keep the region aria-live="off", keep only the visible headline in the tab order, and provide a pause button.` },
      { q: 'How fast should a ticker rotate?', a: `Long enough to read the headline twice. Three to five seconds per line suits short headlines; allow more for longer text, and always let users pause.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it which three changes make an Embla carousel vertical and why the viewport needs a fixed height. Ask it to fetch headlines from an RSS or JSON endpoint and insert new ones with embla.reInit(), to show a "3 new" badge, or to switch to a horizontal marquee on wide screens. It can also review the accessibility choices against WCAG 2.2.2.`,
      prompt: `Build a one-line vertical news ticker with Embla Carousel v8 and its Autoplay plugin (loaded from a CDN as UMD) in plain HTML, CSS and JavaScript.

Requirements:
- A card with a red "Breaking" label with a blinking dot, a ticker area and a control group.
- Six headlines with a time and a link, each truncated to one line with an ellipsis.
- Use Embla on the vertical axis with a flex-column container, a viewport exactly one headline tall, looping and a quick transition, with touch-action set for vertical swiping.
- Autoplay every 3.5 seconds, pausing on hover and while keyboard focus is inside, and not starting for users who prefer reduced motion.
- Up, down and pause/play buttons with accessible labels.
- Keep the ticker out of live announcements and make only the visible headline's link tabbable.`,
    },
  },
};

export default emblaCarouselVerticalNewsTicker;
