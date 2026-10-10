const swiperTestimonialFadeSlider = {
  id: 'swiper-testimonial-fade-slider',
  title: 'Swiper Testimonial Slider with Fade and Avatar Pagination',
  lastmod: '2026-09-24',
  category: 'carousels',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.css',
    'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.js',
  ],
  html: `<div class="tt-wrap">
  <div class="swiper tt-swiper" id="ttSwiper">
    <div class="swiper-wrapper" id="ttSlides"></div>
  </div>
  <div class="tt-pag" id="ttPag" role="tablist" aria-label="Choose a testimonial"></div>
</div>`,
  css: `body { background: linear-gradient(160deg, #eef2ff, #fdf2f8) fixed; min-height: 100vh; padding: 26px 16px; font-family: system-ui, sans-serif; }
.tt-wrap { max-width: 620px; margin: 0 auto; text-align: center; }
.tt-swiper { overflow: hidden; }
.tt-swiper .swiper-slide { padding: 6px 22px 10px; }
.tt-quote { position: relative; background: #fff; border: 1px solid #e3e6f5; border-radius: 20px; padding: 34px 32px 28px; box-shadow: 0 14px 34px rgba(60,50,140,.1); }
.tt-quote::before { content: '\\201C'; position: absolute; top: -6px; left: 22px; font: 800 82px/1 Georgia, serif; color: #c7d2fe; }
.tt-stars { color: #f59e0b; letter-spacing: 3px; font-size: 16px; }
.tt-quote p { margin: 12px 0 18px; font-size: 19px; line-height: 1.6; color: #1e2140; font-weight: 500; }
.tt-who { display: flex; align-items: center; justify-content: center; gap: 12px; }
.tt-av { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; color: #fff; font: 800 15px/1 system-ui, sans-serif; }
.tt-info b { display: block; font-size: 14.5px; color: #1e2140; text-align: left; } .tt-info span { display: block; font-size: 12.5px; color: #6b7290; text-align: left; }
.tt-pag { display: flex; justify-content: center; gap: 12px; margin-top: 20px; }
.tt-pag button { position: relative; width: 46px; height: 46px; border-radius: 50%; border: 3px solid transparent; padding: 0; color: #fff; font: 800 13px/1 system-ui, sans-serif; cursor: pointer; opacity: .55; filter: saturate(.7); transition: opacity .25s, transform .25s, border-color .25s, filter .25s; }
.tt-pag button:hover { opacity: .85; }
.tt-pag button[aria-selected="true"] { opacity: 1; filter: none; transform: scale(1.14); border-color: #fff; box-shadow: 0 0 0 3px #818cf8, 0 8px 16px rgba(60,50,140,.25); }
.tt-pag button:focus-visible { outline: 3px solid #4f46e5; outline-offset: 3px; }`,
  js: `const VOICES = [
  { q: 'We replaced three tools with this one and our onboarding time dropped from two weeks to three days.', n: 'Priya Raman', r: 'Head of Ops, Northwind', c: '#6366f1', i: 'PR' },
  { q: 'The API is the first I have used that felt designed by people who actually ship products on it.', n: 'Marcus Lee', r: 'Staff Engineer, Acme Labs', c: '#0ea5e9', i: 'ML' },
  { q: 'Support answered in eleven minutes on a Sunday. That single interaction sold our whole leadership team.', n: 'Sofia Alvarez', r: 'COO, Globex', c: '#ec4899', i: 'SA' },
  { q: 'Our conversion rate went up 18% the week we switched. I stopped questioning it after that.', n: 'Tomas Novak', r: 'Growth Lead, Initech', c: '#10b981', i: 'TN' },
  { q: 'Beautiful defaults, sensible escape hatches. It is a joy to build on.', n: 'Aiko Tanaka', r: 'Design Systems, Hooli', c: '#f59e0b', i: 'AT' },
];

document.getElementById('ttSlides').innerHTML = VOICES.map(function (v) {
  return '<div class="swiper-slide"><figure class="tt-quote" style="margin:0"><div class="tt-stars" aria-label="5 out of 5 stars">★★★★★</div>' +
    '<blockquote style="margin:0"><p>' + v.q + '</p></blockquote>' +
    '<figcaption class="tt-who"><span class="tt-av" style="background:' + v.c + '">' + v.i + '</span><span class="tt-info"><b>' + v.n + '</b><span>' + v.r + '</span></span></figcaption></figure></div>';
}).join('');

const pag = document.getElementById('ttPag');
pag.innerHTML = VOICES.map(function (v, i) {
  return '<button type="button" role="tab" aria-selected="' + (i === 0) + '" aria-label="' + v.n + '" style="background:' + v.c + '" data-i="' + i + '">' + v.i + '</button>';
}).join('');

const swiper = new Swiper('#ttSwiper', {
  effect: 'fade',
  fadeEffect: { crossFade: true },   // without this, both slides show at partial opacity and text overlaps mid-transition
  speed: 600,
  autoHeight: true,                  // quotes differ in length; let the container resize instead of leaving gaps
  autoplay: { delay: 6000, disableOnInteraction: true, pauseOnMouseEnter: true },
  keyboard: { enabled: true },
  a11y: { enabled: true },
});

// Custom pagination: our own avatar buttons, driven by slideTo and the slideChange event.
pag.addEventListener('click', function (e) {
  const b = e.target.closest('button'); if (!b) return;
  swiper.autoplay.stop();
  swiper.slideTo(Number(b.dataset.i));
});
swiper.on('slideChange', function () {
  pag.querySelectorAll('button').forEach(function (b, i) { b.setAttribute('aria-selected', String(i === swiper.activeIndex)); });
});`,

  seo: {
    title: 'Swiper Testimonial Fade Slider — Free JS Snippet',
    description: `A testimonial slider using Swiper's fade effect with crossFade, auto height, autoplay that stops on interaction, and custom avatar buttons as pagination.`,
    about: {
      title: 'Swiper Testimonial Slider — HTML, CSS & JavaScript',
      description: `Testimonials are read, not skimmed, so the way they change matters. A sliding carousel is jumpy for text — the eye follows the motion instead of the words — while a quiet cross-fade lets a reader finish a quote without a distraction and then see the next arrive in place. Swiper's fade effect is designed for this, and this snippet combines it with three details that separate a polished testimonial block from a default one.

The first is crossFade. effect: 'fade' on its own fades slides in and out one after another using opacity, which can leave both partly visible at the same time — two quotes overlapping mid-transition, unreadable. Setting fadeEffect: { crossFade: true } makes the outgoing slide fade out as the incoming one fades in, so exactly one is fully visible at any moment and the text never superimposes. It is the difference between a smooth swap and a visible glitch, and it is an option many implementations never turn on.

The second is autoHeight. Quotes vary in length, and fade slides all sit on top of each other in the same space, so the container would normally be as tall as the tallest quote and leave a hole under short ones. autoHeight: true resizes the container to the active slide. The third is the pagination. Rather than dots, the snippet builds a row of avatar buttons — coloured circles with initials — because putting a face to each quote is what makes social proof feel real, and it lets a reader jump to the person they care about. The custom buttons call slideTo() and keep aria-selected in step through the slideChange event, and they use role="tab" so assistive technology treats them as a set of choices.

Autoplay is configured for reading. The delay is a generous six seconds, pauseOnMouseEnter holds the current quote while the pointer is over it, and disableOnInteraction: true means that once a visitor deliberately picks a testimonial, autoplay stops for good rather than pulling them away. Each slide is a real figure with a blockquote and figcaption, so the markup is semantic, the stars carry an aria-label, and the quotes are indexed as text.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch it rotate', text: 'Testimonials cross-fade every six seconds. Only one is ever fully visible.' },
        { title: 'Pick a person', text: 'Click an avatar below. The slider jumps to that quote and autoplay stops.' },
        { title: 'Hover to pause', text: 'Hover a quote to hold it on screen while you read.' },
        { title: 'Notice the height', text: 'The container resizes to fit each quote, so there is no empty space under short ones.' },
        { title: 'Use the keyboard', text: 'Press the arrow keys to move between testimonials, or Tab to the avatar buttons.' },
      ],
    },
    features: [
      'Fade effect with crossFade so quotes never overlap mid-transition',
      'autoHeight so the container fits each quote',
      'Custom avatar-button pagination with role="tab" and aria-selected',
      'Autoplay with pauseOnMouseEnter and disableOnInteraction',
      'Semantic figure, blockquote and figcaption markup',
      'Star rating with an aria-label',
      'Keyboard control and the a11y module',
      'Initial avatars generated from data, no images',
    ],
    useCases: [
      { icon: '💬', title: 'Calm social proof rotation', desc: 'Rotate customer quotes near a call to action, using a quiet crossfade so readers can finish a quote without motion pulling their eye away.' },
      { icon: '⭐', title: 'Product review sections', desc: 'Highlight standout reviews with `autoHeight` so the container always fits the current quote and avoids a jumping layout.' },
      { icon: '👥', title: 'Team and client stories', desc: 'Let visitors browse stories by their avatar, using custom buttons with `role="tab"` and `aria-selected` as pagination.' },
      { icon: '🏢', title: 'Logo strip pairing', desc: 'Place above a [Swiper infinite logo marquee](/ui-snippets/swiper-infinite-logo-marquee/) so that quotes and customer logos support each other on the same page.' },
      { icon: '🎓', title: 'Fade and autoHeight learning', desc: 'See how `crossFade` prevents quotes from overlapping mid-transition, with autoplay stopping whenever a user interacts with the slider.' },
    ],
    faqs: [
      { q: 'Why do two slides overlap during the fade?', a: 'Fade effect alone leaves both slides partly visible. Set fadeEffect: { crossFade: true } so the outgoing slide fades as the incoming one appears.' },
      { q: 'Why is there empty space under short slides?', a: 'Fade slides stack in the same space. Use autoHeight: true so the container resizes to the active slide.' },
      { q: 'How do I build custom pagination?', a: 'Render your own buttons, call swiper.slideTo(index) on click, and update their state in the slideChange event.' },
      { q: 'What does disableOnInteraction do here?', a: 'Once a visitor picks a testimonial or drags, autoplay stops permanently so the slider does not pull them away.' },
      { q: 'How do I keep the markup accessible?', a: 'Use figure, blockquote and figcaption, give the pagination role="tab" with aria-selected, and label the star rating.' },
      { q: 'How long should the autoplay delay be?', a: 'Long enough to read the quote, typically five to eight seconds, and always with a way to pause.' },
      { q: 'Can I use this testimonial slider in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular or Tailwind export buttons on this page to convert the markup and styles. The behaviour comes from Swiper, so in a framework project install it with npm install swiper (its React and Vue components take the same options) instead of the CDN tag, use the Swiper and SwiperSlide components, or create it in useEffect / onMounted / ngAfterViewInit, and release it with destroy() when the component unmounts.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to add company logos to each quote, a progress bar under the active avatar, or structured data markup for reviews.`,
      prompt: `Build a testimonial slider with Swiper 11 loaded from a CDN (bundle script and CSS).

Requirements:
- Use effect 'fade' with fadeEffect { crossFade: true }, autoHeight: true, speed 600, autoplay { delay: 6000, disableOnInteraction: true, pauseOnMouseEnter: true }, keyboard and a11y.
- Render five quotes as figure/blockquote/figcaption with a star rating (aria-label) and a coloured initials avatar.
- Build custom pagination as avatar buttons with role="tab" and aria-selected; clicking calls slideTo() and stops autoplay, and the slideChange event updates aria-selected.
- Scale and outline the active avatar, and give buttons visible focus outlines.`,
    },
  },
};

export default swiperTestimonialFadeSlider;
