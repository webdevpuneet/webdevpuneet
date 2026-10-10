const swiperInfiniteLogoMarquee = {
  id: 'swiper-infinite-logo-marquee',
  title: 'Swiper Infinite Logo Marquee with Hover Pause',
  lastmod: '2026-09-24',
  category: 'carousels',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.css',
    'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.js',
  ],
  html: `<div class="lm-wrap">
  <p class="lm-title">Trusted by product teams at</p>
  <div class="lm-rows">
    <div class="swiper lm-swiper" id="lmA" aria-label="Customer logos, first row"><div class="swiper-wrapper"></div></div>
    <div class="swiper lm-swiper" id="lmB" aria-label="Customer logos, second row"><div class="swiper-wrapper"></div></div>
  </div>
  <div class="lm-ctl">
    <button type="button" id="lmToggle" aria-pressed="false">Pause</button>
    <span>Hover a row to pause it &middot; rows move in opposite directions</span>
  </div>
</div>`,
  css: `body { background: #f6f7fb; padding: 26px 16px; font-family: system-ui, sans-serif; }
.lm-wrap { max-width: 780px; margin: 0 auto; text-align: center; }
.lm-title { margin: 0 0 18px; font: 800 12.5px/1 system-ui, sans-serif; letter-spacing: .14em; text-transform: uppercase; color: #7a8199; }
.lm-rows { display: grid; grid-template-columns: minmax(0, 1fr); gap: 14px; -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); }
/* Swiper's own CSS gives .swiper auto left/right margins, and a grid item with auto margins
   shrinks to its content instead of stretching. Without the explicit width each row would
   measure as wide as all its logos laid end to end, and Swiper could never loop. */
.lm-swiper { width: 100%; min-width: 0; }
.lm-swiper .swiper-wrapper { transition-timing-function: linear !important; }   /* constant speed: no easing between slides */
.lm-swiper .swiper-slide { width: auto; }
.lm-logo { display: inline-flex; align-items: center; gap: 10px; padding: 12px 22px; background: #fff; border: 1px solid #e3e6f0; border-radius: 999px; font: 800 16px/1 system-ui, sans-serif; color: #2b3150; white-space: nowrap; box-shadow: 0 2px 8px rgba(20,25,70,.05); }
.lm-logo i { width: 18px; height: 18px; border-radius: 5px; display: inline-block; }
.lm-ctl { display: flex; justify-content: center; align-items: center; gap: 14px; margin-top: 20px; font-size: 12.5px; color: #7a8199; flex-wrap: wrap; }
.lm-ctl button { font: 800 12.5px/1 system-ui, sans-serif; color: #4338ca; background: #eef0ff; border: 0; border-radius: 999px; padding: 9px 16px; cursor: pointer; }
.lm-ctl button:hover { background: #e0e4ff; }
@media (prefers-reduced-motion: reduce) { .lm-rows { -webkit-mask-image: none; mask-image: none; } }`,
  js: `const ROW1 = [['Northwind', '#6366f1'], ['Acme Labs', '#f97316'], ['Globex', '#10b981'], ['Initech', '#0ea5e9'], ['Umbrella', '#ef4444'], ['Hooli', '#8b5cf6'], ['Stark & Co', '#f59e0b']];
const ROW2 = [['Wayne Tech', '#334155'], ['Soylent', '#84cc16'], ['Vandelay', '#ec4899'], ['Cyberdyne', '#14b8a6'], ['Tyrell', '#6366f1'], ['Massive', '#f43f5e'], ['Pied Piper', '#22c55e']];

// Swiper's loop mode needs more slides than fit on screen at once, otherwise it logs
// "not enough slides for loop mode" and stops looping. Seven logos only just clear that on a
// 780px row, so each row is rendered twice for headroom; the copy is hidden from screen readers.
function fill(id, list) {
  document.querySelector('#' + id + ' .swiper-wrapper').innerHTML = list.concat(list).map(function (l, i) {
    return '<div class="swiper-slide"' + (i >= list.length ? ' aria-hidden="true"' : '') + '><span class="lm-logo"><i style="background:' + l[1] + '"></i>' + l[0] + '</span></div>';
  }).join('');
}
fill('lmA', ROW1); fill('lmB', ROW2);

// Continuous motion: a very long transition (speed) and an autoplay delay of 0 means the next
// slide starts the instant the last one lands, so it never appears to stop.
function marquee(id, reverse) {
  return new Swiper('#' + id, {
    loop: true,
    slidesPerView: 'auto',        // slides are as wide as their content
    spaceBetween: 14,
    speed: 6000,
    allowTouchMove: false,        // a marquee is decorative; dragging it would fight the autoplay
    autoplay: { delay: 0, disableOnInteraction: false, reverseDirection: reverse },
    freeMode: true,
    a11y: { enabled: false },
  });
}
const rows = [marquee('lmA', false), marquee('lmB', true)];

// Pause an individual row while it is hovered.
rows.forEach(function (s) {
  s.el.addEventListener('mouseenter', function () { s.autoplay.stop(); freeze(s); });
  s.el.addEventListener('mouseleave', function () { s.autoplay.start(); });
});

// Autoplay.stop() lets the current transition finish. To freeze IMMEDIATELY, pin the wrapper where it is.
function freeze(s) {
  const t = s.getTranslate();
  s.setTransition(0);
  s.setTranslate(t);
  s.wrapperEl.style.transitionDuration = '0ms';
}

// A pause control for people who find continuous motion distracting (WCAG 2.2.2).
const btn = document.getElementById('lmToggle');
let paused = false;
btn.addEventListener('click', function () {
  paused = !paused;
  rows.forEach(function (s) { if (paused) { s.autoplay.stop(); freeze(s); } else s.autoplay.start(); });
  btn.textContent = paused ? 'Play' : 'Pause';
  btn.setAttribute('aria-pressed', String(paused));
});

// Honour the OS-level reduced-motion setting by not starting at all.
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  rows.forEach(function (s) { s.autoplay.stop(); freeze(s); });
  btn.textContent = 'Play'; btn.setAttribute('aria-pressed', 'true'); paused = true;
}`,

  seo: {
    title: 'Swiper Infinite Logo Marquee — Free JS Snippet',
    description: `A two-row infinite logo marquee built with Swiper: constant-speed looping autoplay, opposite directions, hover pause that freezes instantly, a pause button and reduced-motion support.`,
    about: {
      title: 'Swiper Infinite Logo Marquee — HTML, CSS & JavaScript',
      description: `The logo strip — a row of customer or partner names sliding endlessly across the page — is a landing-page staple. The common way to build it is a CSS animation on a duplicated list, which works but gives no control: you cannot easily pause it precisely, change its direction or stop it when the tab is hidden. Swiper can produce the same effect with a configuration trick, and inherits the ability to loop seamlessly, respond to touch and start or stop from code.

The trick is to make Swiper move continuously instead of in steps. Normally autoplay waits between slides and eases each move in and out, which reads as a carousel. For a marquee, set autoplay.delay to 0 so the next transition begins the instant the previous one ends, and give speed a very long duration — here six seconds per slide-width — so movement is slow and steady. Then remove the easing: Swiper's wrapper has a transition-timing-function, and forcing it to linear in CSS is what makes the speed constant rather than accelerating and decelerating. Without that one CSS line the marquee visibly pulses. slidesPerView: 'auto' with slides sized by content lets logos of different widths flow naturally, and loop: true duplicates slides behind the scenes so the strip never runs out.

Pausing takes more care than it seems. Calling autoplay.stop() does not halt movement; it lets the current transition finish, which with a six-second speed means the row keeps gliding for several seconds after the pointer arrives. To freeze immediately, the snippet reads the wrapper's current position with getTranslate(), sets the transition to zero and reapplies that translate, pinning the wrapper exactly where it is. Leaving the row calls autoplay.start() to resume. The second row uses reverseDirection: true, so the two strips travel in opposite directions, which looks livelier and avoids the two rows appearing to lock together.

Continuous motion is one of the things accessibility guidelines specifically call out. WCAG 2.2.2 requires a way to pause, stop or hide anything that moves for more than five seconds, so the snippet adds a Pause and Play button with aria-pressed, disables touch dragging because the marquee is decorative, and checks the prefers-reduced-motion media query on load so people who have asked for less movement never see it start. Edge fades are applied with a CSS mask so logos dissolve rather than being cut off.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch the rows', text: 'Two rows of logos glide at a constant speed in opposite directions, looping forever.' },
        { title: 'Hover a row', text: 'Move the pointer over a row. That row freezes at once while the other keeps moving.' },
        { title: 'Leave the row', text: 'Move the pointer away and the row resumes from where it stopped.' },
        { title: 'Press Pause', text: 'Use the Pause button to stop both rows, then press Play to restart them.' },
        { title: 'Try reduced motion', text: 'Turn on "reduce motion" in your operating system and reload: the marquee starts paused.' },
      ],
    },
    features: [
      'Constant-speed looping via autoplay delay 0, long speed and linear timing',
      'slidesPerView auto so logos of any width flow naturally',
      'Two rows moving in opposite directions using reverseDirection',
      'Immediate freeze on hover by pinning the wrapper with getTranslate and setTranslate',
      'Pause and Play button with aria-pressed (WCAG 2.2.2)',
      'prefers-reduced-motion honoured on load',
      'Touch dragging disabled for a purely decorative strip',
      'CSS mask edge fades instead of hard clipping',
    ],
    useCases: [
      { icon: '🏢', title: 'Customer and partner logo strips', desc: 'Show social proof under a hero with two rows moving in opposite directions, using `reverseDirection` for the second row.' },
      { icon: '📰', title: 'Press and publication mentions', desc: 'Scroll a list of featured-in outlets at constant speed, using autoplay `delay: 0` with a long speed and linear timing.' },
      { icon: '🔌', title: 'Technology and integration lists', desc: 'Show the tools a product works with, using `slidesPerView: \'auto\'` so logos of any width flow naturally.' },
      { icon: '⏱️', title: 'Autoplay progress pairing', desc: 'Compare with the [Swiper autoplay progress ring](/ui-snippets/swiper-autoplay-progress-ring/) for content that should show when it will change rather than flow constantly.' },
      { icon: '🎓', title: 'Continuous transition learning', desc: 'See why hover pause that freezes instantly needs `getTranslate` and `setTranslate` pinning the wrapper, plus a pause button and reduced-motion support.' },
    ],
    faqs: [
      { q: 'How do I make Swiper scroll continuously?', a: 'Set autoplay.delay to 0, give speed a large value, and set transition-timing-function: linear on the wrapper so the speed is constant.' },
      { q: 'Why doesn\'t autoplay.stop() halt the marquee immediately?', a: 'It only prevents the next transition. The current one finishes first. To freeze at once, read getTranslate() and reapply it with setTransition(0) and setTranslate().' },
      { q: 'How do I run two rows in opposite directions?', a: 'Use autoplay.reverseDirection: true on one of them.' },
      { q: 'Should a marquee be draggable?', a: 'For a decorative strip, no. Set allowTouchMove: false so touch does not fight the autoplay.' },
      { q: 'How do I make it accessible?', a: 'Provide a visible pause control, honour prefers-reduced-motion, and hide decorative content from assistive technology if it duplicates other text.' },
      { q: 'Why does the loop show a gap?', a: 'Loop mode duplicates slides, so make sure there are enough slides to fill the container width plus one full set.' },
      { q: 'Can I use this logo marquee in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular or Tailwind export buttons on this page to convert the markup and styles. The behaviour comes from Swiper, so in a framework project install it with npm install swiper (its React and Vue components take the same options) instead of the CDN tag, use the Swiper and SwiperSlide components, or create it in useEffect / onMounted / ngAfterViewInit, and release it with destroy() when the component unmounts.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to speed up the marquee on scroll, use real SVG logos with grayscale and colour-on-hover, or add a slower speed variant for mobile.`,
      prompt: `Build a two-row infinite logo marquee with Swiper 11 loaded from a CDN (bundle script and CSS).

Requirements:
- Create two Swiper instances with loop, slidesPerView 'auto', spaceBetween 14, speed 6000, freeMode, allowTouchMove: false and autoplay { delay: 0, disableOnInteraction: false }; reverseDirection on the second row.
- Force transition-timing-function: linear on .swiper-wrapper.
- On mouseenter, call autoplay.stop() and freeze immediately with getTranslate(), setTransition(0) and setTranslate(); on mouseleave call autoplay.start().
- Add a Pause/Play button with aria-pressed, and start paused when prefers-reduced-motion: reduce matches.
- Fade the edges with a CSS mask and draw the logos as coloured pill labels.`,
    },
  },
};

export default swiperInfiniteLogoMarquee;
