const swiperAutoplayProgressRing = {
  id: 'swiper-autoplay-progress-ring',
  title: 'Swiper Autoplay Slider with Circular Progress Ring',
  lastmod: '2026-09-24',
  category: 'carousels',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.css',
    'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.js',
  ],
  html: `<div class="ap-wrap">
  <div class="swiper ap-swiper" id="apSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide a1"><div><span>Now trending</span><h3>Design tokens in practice</h3></div></div>
      <div class="swiper-slide a2"><div><span>New release</span><h3>What&rsquo;s new in CSS this year</h3></div></div>
      <div class="swiper-slide a3"><div><span>Deep dive</span><h3>Accessible motion, done right</h3></div></div>
      <div class="swiper-slide a4"><div><span>Guide</span><h3>Shipping fast without breaking things</h3></div></div>
    </div>
    <div class="ap-ctl">
      <button type="button" class="ap-ring" id="apToggle" aria-label="Pause autoplay" aria-pressed="false">
        <svg viewBox="0 0 48 48" aria-hidden="true"><circle class="bg" cx="24" cy="24" r="20"/><circle class="fg" id="apArc" cx="24" cy="24" r="20"/></svg>
        <span id="apSec">4</span>
      </button>
      <div class="swiper-pagination"></div>
    </div>
  </div>
  <p class="ap-note" id="apNote" aria-live="polite">Autoplaying. Hover or focus the slider to pause.</p>
</div>`,
  css: `body { background: #eef0f6; padding: 22px; font-family: system-ui, sans-serif; }
.ap-wrap { max-width: 680px; margin: 0 auto; }
.ap-swiper { border-radius: 18px; overflow: hidden; height: 300px; position: relative; box-shadow: 0 14px 34px rgba(20,25,70,.2); }
.ap-swiper .swiper-slide { display: flex; align-items: flex-end; padding: 28px 30px 74px; color: #fff; }
.a1 { background: linear-gradient(135deg, #4f46e5, #7c3aed); } .a2 { background: linear-gradient(135deg, #0891b2, #2563eb); }
.a3 { background: linear-gradient(135deg, #059669, #65a30d); } .a4 { background: linear-gradient(135deg, #e11d48, #f97316); }
.ap-swiper .swiper-slide span { font: 800 11.5px/1 system-ui, sans-serif; letter-spacing: .12em; text-transform: uppercase; opacity: .85; }
.ap-swiper .swiper-slide h3 { margin: 8px 0 0; font-size: 28px; line-height: 1.15; max-width: 420px; }
.ap-ctl { position: absolute; right: 18px; bottom: 16px; z-index: 5; display: flex; align-items: center; gap: 12px; }
.ap-ctl .swiper-pagination { position: static; width: auto; display: flex; gap: 6px; }
.ap-ctl .swiper-pagination-bullet { background: #fff; opacity: .45; margin: 0 !important; }
.ap-ctl .swiper-pagination-bullet-active { opacity: 1; }
.ap-ring { position: relative; width: 48px; height: 48px; padding: 0; border: 0; border-radius: 50%; background: rgba(0,0,0,.22); color: #fff; cursor: pointer; display: grid; place-items: center; }
.ap-ring:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
.ap-ring svg { position: absolute; inset: 0; transform: rotate(-90deg); }
.ap-ring circle { fill: none; stroke-width: 3.5; }
.ap-ring .bg { stroke: rgba(255,255,255,.28); }
.ap-ring .fg { stroke: #fff; stroke-linecap: round; stroke-dasharray: 125.66; stroke-dashoffset: 125.66; }
.ap-ring span { font: 800 14px/1 system-ui, sans-serif; font-variant-numeric: tabular-nums; }
.ap-ring[aria-pressed="true"] span { font-size: 15px; }
.ap-note { margin: 12px 2px 0; font-size: 13px; color: #5b6279; }`,
  js: `const DELAY = 4000;
const CIRC = 2 * Math.PI * 20;                 // circumference of the r=20 ring (125.66)
const arc = document.getElementById('apArc');
const sec = document.getElementById('apSec');
const toggle = document.getElementById('apToggle');
const note = document.getElementById('apNote');
let paused = false;

const swiper = new Swiper('#apSwiper', {
  loop: true,
  speed: 600,
  autoplay: {
    delay: DELAY,
    disableOnInteraction: false,     // keep autoplay after a swipe or click instead of stopping for good
    pauseOnMouseEnter: true,         // hovering pauses; leaving resumes from where it left off
  },
  pagination: { el: '.swiper-pagination', clickable: true },
  a11y: { enabled: true },
  on: {
    // Fires many times a second while autoplay runs: (swiper, timeLeft in ms, percentage 0..1 remaining).
    autoplayTimeLeft: function (s, timeLeft, percentage) {
      arc.style.strokeDashoffset = String(CIRC * percentage);     // full ring at the start, empty as time runs out
      sec.textContent = String(Math.ceil(timeLeft / 1000));
    },
    autoplayPause: function () { if (!paused) note.textContent = 'Paused while you hover or focus.'; },
    autoplayResume: function () { if (!paused) note.textContent = 'Autoplaying. Hover or focus the slider to pause.'; },
  },
});

// A visible pause control is a WCAG requirement for anything that moves on its own for more than 5 seconds.
toggle.addEventListener('click', function () {
  paused = !paused;
  if (paused) { swiper.autoplay.stop(); note.textContent = 'Autoplay stopped. Use the dots or swipe to browse.'; arc.style.strokeDashoffset = String(CIRC); sec.textContent = '⏸'; }
  else { swiper.autoplay.start(); note.textContent = 'Autoplaying. Hover or focus the slider to pause.'; }
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.setAttribute('aria-label', paused ? 'Resume autoplay' : 'Pause autoplay');
});

// Keyboard users cannot hover, so focusing anything inside pauses too.
const root = document.getElementById('apSwiper');
root.addEventListener('focusin', function () { if (!paused) swiper.autoplay.pause(); });
root.addEventListener('focusout', function () { if (!paused) swiper.autoplay.resume(); });`,

  seo: {
    title: 'Swiper Autoplay with Progress Ring — Free JS Snippet',
    description: `An autoplaying Swiper slider with a live circular countdown ring, hover and focus pause, a visible pause button and correct disableOnInteraction settings.`,
    about: {
      title: 'Swiper Autoplay Slider with Progress Ring — HTML, CSS & JavaScript',
      description: `Autoplaying carousels are among the most criticised patterns on the web, and mostly for fixable reasons: they advance while you are reading, they give no hint of when they will move, and they cannot be stopped. A good implementation shows how much time is left, pauses when you engage with it, and has a control to switch it off. This snippet builds each of those on top of Swiper's autoplay module, and turns the countdown into a circular ring that doubles as the pause button.

The ring is driven by one of Swiper's most useful and least known events. autoplayTimeLeft fires continuously while autoplay is running and passes three arguments: the swiper, the milliseconds remaining and the fraction of the delay still to go, from one down to zero. The handler maps that fraction to the SVG circle's stroke-dashoffset. Because the circle has a circumference of about 125.66 and stroke-dasharray is set to the same value, an offset equal to the full circumference draws nothing and an offset of zero draws the full ring. The seconds counter in the centre is Math.ceil of the time left. Since the event drives everything, the ring stays perfectly in step with the real timer, including when autoplay pauses and resumes.

The autoplay options carry three important defaults you should choose deliberately. delay sets the time per slide. disableOnInteraction: false keeps autoplay running after a user swipes or clicks a pagination bullet; the default of true stops it permanently after the first touch, which surprises people who assume it merely pauses. pauseOnMouseEnter pauses while the pointer is over the slider and resumes on leave, so nobody loses the slide they are reading. Since keyboard and touch users cannot hover, the snippet also listens for focusin and focusout on the slider to pause and resume.

The pause button is not decoration. WCAG requires a mechanism to pause, stop or hide any content that moves automatically for more than five seconds, so the ring is a real button with aria-pressed and an aria-label that toggles between "Pause autoplay" and "Resume autoplay". A live message below narrates the state for screen readers. The loop option makes the slider circular, and the a11y module announces slide changes.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch the ring', text: 'The ring drains and the number counts down. When it reaches zero the slider advances and the ring refills.' },
        { title: 'Hover the slider', text: 'Move the pointer over it. Autoplay pauses and resumes from the same point when you leave.' },
        { title: 'Swipe or click a dot', text: 'Change slides manually. Autoplay carries on afterwards, because disableOnInteraction is false.' },
        { title: 'Press the ring', text: 'Click the ring to stop autoplay altogether. It shows a pause symbol and the label changes to Resume.' },
        { title: 'Tab into the slider', text: 'Focus any control inside it. Keyboard focus pauses autoplay, just as hover does.' },
      ],
    },
    features: [
      'Live circular countdown from the autoplayTimeLeft event',
      'SVG stroke-dashoffset animation mapped to the remaining fraction',
      'Pause on mouse hover and on keyboard focus',
      'disableOnInteraction: false so manual navigation does not end autoplay',
      'A real pause/resume button with aria-pressed and a changing aria-label',
      'Live status message describing the autoplay state',
      'Loop mode with clickable pagination and the a11y module',
      'Meets the WCAG requirement to control moving content',
    ],
    useCases: [
      { icon: '📰', title: 'Hero and news carousels', desc: 'Rotate featured stories while keeping people informed, with a live circular countdown driven by Swiper\'s `autoplayTimeLeft` event.' },
      { icon: '🏷️', title: 'Promotional banners', desc: 'Show offers in sequence with a visible timer, using SVG `stroke-dashoffset` mapped to the remaining fraction of the delay.' },
      { icon: '♿', title: 'Accessible auto-advancing content', desc: 'Provide a compliant pattern with a visible pause button and pausing on both mouse hover and keyboard focus.' },
      { icon: '💬', title: 'Fade testimonial pairing', desc: 'Pair with the [Swiper testimonial fade slider](/ui-snippets/swiper-testimonial-fade-slider/) for a quieter approach to rotating text content on the same page.' },
      { icon: '🎓', title: 'Swiper events learning', desc: 'See a clear use of `autoplayTimeLeft` and why `disableOnInteraction: false` keeps autoplay going after a manual swipe.' },
    ],
    faqs: [
      { q: 'What does disableOnInteraction do?', a: 'When true (the default), autoplay stops for good after the user swipes or clicks. Set it to false to keep autoplay running after interaction.' },
      { q: 'How do I build a progress indicator for autoplay?', a: 'Use the autoplayTimeLeft event, which provides the time left and the remaining fraction, and map that to a bar width or a circle\'s stroke-dashoffset.' },
      { q: 'How do I pause autoplay on hover?', a: 'Set autoplay.pauseOnMouseEnter: true. Autoplay resumes when the pointer leaves.' },
      { q: 'Why does a pause button matter?', a: 'WCAG requires a way to pause, stop or hide content that moves automatically for more than five seconds. A visible pause control satisfies that.' },
      { q: 'How do I stop and restart autoplay from code?', a: 'Call swiper.autoplay.stop() and swiper.autoplay.start(). Use pause() and resume() for temporary holds.' },
      { q: 'Why is my ring not full at the start?', a: 'Set stroke-dasharray and the initial stroke-dashoffset to the circle\'s circumference, then let the event update the offset.' },
      { q: 'Can I use this autoplay slider in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular or Tailwind export buttons on this page to convert the markup and styles. The behaviour comes from Swiper, so in a framework project install it with npm install swiper (its React and Vue components take the same options) instead of the CDN tag, use the Swiper and SwiperSlide components, or create it in useEffect / onMounted / ngAfterViewInit, and release it with destroy() when the component unmounts.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to make the ring a linear progress bar per slide, pause autoplay when the tab is hidden, or sync a caption below the slider.`,
      prompt: `Build an autoplay slider with a circular countdown using Swiper 11 loaded from a CDN (bundle script and CSS).

Requirements:
- Use loop, autoplay { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }, clickable pagination and the a11y module.
- Draw an SVG ring (r=20, stroke-dasharray = circumference) and update its stroke-dashoffset from the autoplayTimeLeft event's percentage; show the seconds remaining in the centre.
- Make the ring a real button that stops and starts autoplay, with aria-pressed and an aria-label switching between Pause and Resume autoplay.
- Pause on keyboard focusin and resume on focusout, and show a live status message describing the current state.`,
    },
  },
};

export default swiperAutoplayProgressRing;
