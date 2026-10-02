const swiperVerticalFullpageSlider = {
  id: 'swiper-vertical-fullpage-slider',
  title: 'Swiper Vertical Full-Page Slider with Wheel Release',
  lastmod: '2026-09-24',
  category: 'carousels',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.css',
    'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.js',
  ],
  html: `<div class="fp-wrap">
  <div class="swiper fp-swiper" id="fpSwiper">
    <div class="swiper-wrapper">
      <section class="swiper-slide s1"><div class="fp-in"><span class="fp-kick">01 &middot; Discover</span><h2>Find the right plan in seconds</h2><p>Scroll, swipe or press &darr; to move between sections.</p></div></section>
      <section class="swiper-slide s2"><div class="fp-in"><span class="fp-kick">02 &middot; Build</span><h2>Compose with real components</h2><p>Each section snaps into place with a smooth 700ms transition.</p></div></section>
      <section class="swiper-slide s3"><div class="fp-in"><span class="fp-kick">03 &middot; Ship</span><h2>Deploy without ceremony</h2><p>Wheel input is throttled so one flick moves exactly one section.</p></div></section>
      <section class="swiper-slide s4"><div class="fp-in"><span class="fp-kick">04 &middot; Grow</span><h2>Measure what matters</h2><p>At the last slide the wheel is released, so the page can scroll on.</p></div></section>
    </div>
    <div class="swiper-pagination"></div>
    <div class="fp-counter" id="fpCounter" aria-live="polite">1 / 4</div>
    <div class="fp-hint" id="fpHint">Scroll &darr;</div>
  </div>
</div>`,
  css: `body { margin: 0; background: #0b0d1a; padding: 18px; font-family: system-ui, sans-serif; }
.fp-wrap { max-width: 720px; margin: 0 auto; }
.fp-swiper { height: 380px; border-radius: 16px; overflow: hidden; position: relative; box-shadow: 0 16px 40px rgba(0,0,0,.45); }
.fp-swiper .swiper-slide { display: flex; align-items: center; padding: 0 56px; color: #fff; }
.s1 { background: linear-gradient(135deg, #4f46e5, #0ea5e9); } .s2 { background: linear-gradient(135deg, #db2777, #f97316); }
.s3 { background: linear-gradient(135deg, #059669, #14b8a6); } .s4 { background: linear-gradient(135deg, #7c3aed, #c026d3); }
.fp-in { max-width: 460px; }
.fp-kick { font: 800 12px/1 system-ui, sans-serif; letter-spacing: .14em; text-transform: uppercase; opacity: .8; }
.fp-in h2 { margin: 12px 0 10px; font-size: 34px; line-height: 1.1; }
.fp-in p { margin: 0; font-size: 15px; line-height: 1.6; opacity: .88; }
.fp-swiper .swiper-slide .fp-in > * { opacity: 0; transform: translateY(18px); transition: opacity .5s ease, transform .5s ease; }
.fp-swiper .swiper-slide-active .fp-in > * { opacity: 1; transform: none; }
.fp-swiper .swiper-slide-active .fp-in > *:nth-child(2) { transition-delay: .12s; } .fp-swiper .swiper-slide-active .fp-in > *:nth-child(3) { transition-delay: .24s; }
.fp-swiper .swiper-pagination { right: 16px; }
.fp-swiper .swiper-pagination-bullet { background: #fff; opacity: .4; width: 9px; height: 9px; }
.fp-swiper .swiper-pagination-bullet-active { opacity: 1; height: 24px; border-radius: 6px; }
.fp-counter { position: absolute; left: 20px; bottom: 16px; z-index: 5; font: 800 13px/1 system-ui, sans-serif; color: #fff; background: rgba(0,0,0,.28); padding: 7px 11px; border-radius: 999px; font-variant-numeric: tabular-nums; }
.fp-hint { position: absolute; left: 50%; bottom: 16px; z-index: 5; transform: translateX(-50%); font: 700 12px/1 system-ui, sans-serif; color: #fff; opacity: .8; animation: fpBob 1.6s ease-in-out infinite; }
@keyframes fpBob { 50% { transform: translate(-50%, 5px); } }
@media (prefers-reduced-motion: reduce) { .fp-hint { animation: none; } .fp-swiper .swiper-slide .fp-in > * { transition: none; } }`,
  js: `const counter = document.getElementById('fpCounter');
const hint = document.getElementById('fpHint');

const swiper = new Swiper('#fpSwiper', {
  direction: 'vertical',
  speed: 700,
  resistanceRatio: 0.6,
  mousewheel: {
    thresholdDelta: 25,     // ignore tiny wheel movements
    thresholdTime: 500,     // and only accept one move per 500ms, so a single trackpad flick = one slide
    releaseOnEdges: true,   // at the first/last slide, let the wheel scroll the surrounding page instead of trapping it
  },
  keyboard: { enabled: true, onlyInViewport: true },
  pagination: { el: '.swiper-pagination', clickable: true },
  a11y: { enabled: true, prevSlideMessage: 'Previous section', nextSlideMessage: 'Next section' },
});

swiper.on('slideChange', function () {
  counter.textContent = (swiper.activeIndex + 1) + ' / ' + swiper.slides.length;
  // The hint only makes sense while there is somewhere to go.
  hint.style.display = swiper.isEnd ? 'none' : '';
});`,

  seo: {
    title: 'Swiper Vertical Full-Page Slider — Free JS Snippet',
    description: `A full-page vertical section slider built with Swiper: throttled mouse-wheel control, releaseOnEdges so the page can still scroll, keyboard support, staggered content animation and side pagination.`,
    about: {
      title: 'Swiper Vertical Full-Page Slider — HTML, CSS & JavaScript',
      description: `Full-page section sliders — one idea per screen, snapping into place as you scroll — are a staple of product tours and landing pages. They are also famous for a usability failure: the scroll trap. If the slider captures the mouse wheel and never lets go, a visitor who scrolls to the last section is stuck there, unable to reach the footer or the rest of the page. Swiper handles both halves of that problem with options on its mousewheel module, and this snippet is built around them.

direction: 'vertical' makes the slides stack top to bottom, and the mousewheel object shapes how wheel input translates to movement. thresholdDelta ignores tiny wheel movements, and thresholdTime accepts only one movement per 500 milliseconds. Together they solve the "one flick, three slides" problem: a trackpad swipe generates a burst of wheel events, and without throttling the slider would skip several sections at once. Then releaseOnEdges: true fixes the scroll trap. At the first and last slide it stops capturing the wheel, so the next scroll moves the surrounding page. Without it the section slider swallows all vertical scrolling that reaches it.

Keyboard control comes from keyboard: { enabled: true, onlyInViewport: true }, where the second flag matters on a page with other content, since without it the arrow keys would change slides even when the slider is scrolled off-screen. The a11y module adds live announcements and labelled buttons, and the custom messages read "Next section" rather than the generic "Next slide".

The visual polish is CSS. Content inside slides starts translated and transparent, and the active slide — identified by the swiper-slide-active class Swiper maintains — transitions its children to their resting position with a staggered delay, so headings, text and details settle in one after another each time a section arrives. The pagination bullets turn into tall pills for the active section, the counter updates on slideChange, and the "Scroll" hint hides once swiper.isEnd is true. Animation is turned off for people who prefer reduced motion.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll the wheel', text: 'Scroll over the slider. One flick moves exactly one section, even with a fast trackpad.' },
        { title: 'Use the keyboard', text: 'Press the up and down arrow keys, or click the pagination pills, to jump between sections.' },
        { title: 'Watch the entrance', text: 'Each section\'s heading, text and detail fade in one after another.' },
        { title: 'Reach the end', text: 'On the last section the hint disappears and further scrolling moves the page instead of trapping you.' },
        { title: 'Check the counter', text: 'The counter shows the current section number as you move.' },
      ],
    },
    features: [
      'Vertical direction with 700ms transitions',
      'Throttled wheel input (thresholdDelta and thresholdTime) for one section per flick',
      'releaseOnEdges so the page can scroll past the slider at either end',
      'Keyboard control limited to when the slider is in the viewport',
      'a11y module with custom "Next section" messages',
      'Staggered entrance animation keyed off swiper-slide-active',
      'Pill-shaped active pagination bullet and live counter',
      'Reduced-motion support',
    ],
    useCases: [
      { icon: '🖥️', title: 'Landing pages and product tours', desc: 'Present one idea per screen with 700 millisecond transitions, and `releaseOnEdges` letting the page scroll past at either end.' },
      { icon: '📣', title: 'Campaign microsites', desc: 'Walk visitors through a story with snapping sections, throttling wheel input so one flick moves exactly one section.' },
      { icon: '✨', title: 'Feature tours', desc: 'Introduce features one at a time with staggered content animation and side pagination, limiting keyboard control to when the slider is in view.' },
      { icon: '🌄', title: 'Parallax pairing', desc: 'Compare with [Swiper parallax hero slides](/ui-snippets/swiper-parallax-hero-slides/) for a horizontal approach to full-screen storytelling on landing pages.' },
      { icon: '🎓', title: 'Scroll-trap avoidance learning', desc: 'Learn why a slider that captures the wheel can trap users, and how releasing on edges avoids that frustration.' },
    ],
    faqs: [
      { q: 'Why does the slider skip several slides on one scroll?', a: 'A trackpad flick fires many wheel events. Set mousewheel.thresholdTime (and thresholdDelta) so only one movement is accepted per interval.' },
      { q: 'How do I stop the slider trapping the page scroll?', a: 'Set mousewheel.releaseOnEdges: true. At the first and last slide, the wheel then scrolls the surrounding page.' },
      { q: 'Why do arrow keys change slides when the slider is off-screen?', a: 'Use keyboard.onlyInViewport: true so keys only work while the slider is visible.' },
      { q: 'How do I animate content when a slide becomes active?', a: 'Style children under .swiper-slide-active with transitions, as Swiper toggles that class for the current slide.' },
      { q: 'How do I know when the last slide is reached?', a: 'Check swiper.isEnd in the slideChange handler.' },
      { q: 'Is it accessible?', a: 'Enable the a11y module, provide meaningful prev/next messages and ensure keyboard access, and respect prefers-reduced-motion.' },
      { q: 'Can I use this full-page slider in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular or Tailwind export buttons on this page to convert the markup and styles. The behaviour comes from Swiper, so in a framework project install it with npm install swiper (its React and Vue components take the same options) instead of the CDN tag, use the Swiper and SwiperSlide components, or create it in useEffect / onMounted / ngAfterViewInit, and release it with destroy() when the component unmounts.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to sync the sections to URL hashes, add a progress line instead of bullets, or switch to horizontal on narrow screens.`,
      prompt: `Build a vertical full-page section slider with Swiper 11 loaded from a CDN (bundle script and CSS).

Requirements:
- Use direction 'vertical', speed 700, four full-height gradient sections and a right-side pagination with clickable bullets.
- Configure mousewheel with thresholdDelta 25, thresholdTime 500 and releaseOnEdges: true, and keyboard with onlyInViewport: true; enable the a11y module with custom prev/next messages.
- Animate each section's content in with staggered CSS transitions keyed off .swiper-slide-active, and respect prefers-reduced-motion.
- Show an "n / total" counter and a scroll hint that hides when swiper.isEnd is true, updated in the slideChange event.`,
    },
  },
};

export default swiperVerticalFullpageSlider;
