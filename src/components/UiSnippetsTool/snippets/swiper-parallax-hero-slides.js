const swiperParallaxHeroSlides = {
  id: 'swiper-parallax-hero-slides',
  title: 'Swiper Parallax Hero Slides',
  lastmod: '2026-09-24',
  category: 'heroes',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.css',
    'https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.js',
  ],
  html: `<div class="ph-wrap">
  <div class="swiper ph-swiper" id="phSwiper">
    <div class="parallax-bg" data-swiper-parallax="-23%"></div>
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="ph-art ph-a" data-swiper-parallax="-40%" aria-hidden="true"></div>
        <div class="ph-copy">
          <span class="ph-kick" data-swiper-parallax="-300">Summer collection</span>
          <h2 data-swiper-parallax="-200">Made for long days outside</h2>
          <p data-swiper-parallax="-100" data-swiper-parallax-opacity="0.5">Lightweight layers that pack down small and dry in minutes.</p>
          <a class="ph-cta" href="#" data-swiper-parallax="-50">Shop the range</a>
        </div>
      </div>
      <div class="swiper-slide">
        <div class="ph-art ph-b" data-swiper-parallax="-40%" aria-hidden="true"></div>
        <div class="ph-copy">
          <span class="ph-kick" data-swiper-parallax="-300">New arrival</span>
          <h2 data-swiper-parallax="-200">The trail shoe that grips everything</h2>
          <p data-swiper-parallax="-100" data-swiper-parallax-opacity="0.5">A redesigned outsole with 30% more traction on wet rock.</p>
          <a class="ph-cta" href="#" data-swiper-parallax="-50">Discover</a>
        </div>
      </div>
      <div class="swiper-slide">
        <div class="ph-art ph-c" data-swiper-parallax="-40%" aria-hidden="true"></div>
        <div class="ph-copy">
          <span class="ph-kick" data-swiper-parallax="-300">Community</span>
          <h2 data-swiper-parallax="-200">Join 40,000 weekend explorers</h2>
          <p data-swiper-parallax="-100" data-swiper-parallax-opacity="0.5">Routes, gear swaps and group hikes in your area.</p>
          <a class="ph-cta" href="#" data-swiper-parallax="-50">Get involved</a>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev" aria-label="Previous slide"></div>
    <div class="swiper-button-next" aria-label="Next slide"></div>
  </div>
</div>`,
  css: `body { margin: 0; background: #0e1116; padding: 18px; font-family: system-ui, sans-serif; }
.ph-wrap { max-width: 760px; margin: 0 auto; }
.ph-swiper { height: 380px; border-radius: 18px; overflow: hidden; position: relative; background: #111; box-shadow: 0 18px 44px rgba(0,0,0,.5); }
/* The background layer is wider than the viewport so it has room to slide at a slower rate. */
.parallax-bg { position: absolute; left: 0; top: 0; width: 130%; height: 100%; background: linear-gradient(120deg, #0f172a 0%, #1e3a8a 35%, #0d9488 65%, #65a30d 100%); z-index: 0; }
.ph-swiper .swiper-slide { position: relative; display: flex; align-items: center; padding: 0 64px; color: #fff; overflow: hidden; }
.ph-art { position: absolute; right: -6%; top: 50%; width: 46%; aspect-ratio: 1; margin-top: -23%; border-radius: 50%; opacity: .9; filter: blur(.3px); }
.ph-a { background: radial-gradient(circle at 30% 30%, #fde68a, #f97316 60%, transparent 62%); }
.ph-b { background: radial-gradient(circle at 30% 30%, #a5f3fc, #0ea5e9 60%, transparent 62%); }
.ph-c { background: radial-gradient(circle at 30% 30%, #fbcfe8, #db2777 60%, transparent 62%); }
.ph-copy { position: relative; max-width: 380px; }
.ph-kick { display: block; font: 800 12px/1 system-ui, sans-serif; letter-spacing: .16em; text-transform: uppercase; color: #a7f3d0; }
.ph-copy h2 { margin: 12px 0 10px; font-size: 34px; line-height: 1.08; }
.ph-copy p { margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #d7e3f5; }
.ph-cta { display: inline-block; font: 800 13px/1 system-ui, sans-serif; color: #0f172a; background: #fff; text-decoration: none; padding: 13px 20px; border-radius: 999px; }
.ph-cta:hover { background: #a7f3d0; }
.ph-cta:focus-visible { outline: 3px solid #a7f3d0; outline-offset: 3px; }
.ph-swiper .swiper-pagination-bullet { background: #fff; opacity: .45; }
.ph-swiper .swiper-pagination-bullet-active { opacity: 1; }
.ph-swiper .swiper-button-prev, .ph-swiper .swiper-button-next { color: #fff; --swiper-navigation-size: 22px; }`,
  js: `const swiper = new Swiper('#phSwiper', {
  speed: 900,
  parallax: true,            // enables the module; the data-swiper-parallax attributes do the actual work
  grabCursor: true,
  keyboard: { enabled: true },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  a11y: { enabled: true },
});

// Layers move by their data-swiper-parallax value as the slide travels:
//   a number  = pixels of extra travel   (-300 moves 300px against the slide)
//   a percent = share of the slide width (-40% for the artwork, -23% for the background)
//   data-swiper-parallax-opacity fades the element as it leaves.
// Different values per layer create depth: the further from 0, the faster it slides past.`,

  seo: {
    title: 'Swiper Parallax Hero Slides — Free JS Snippet',
    description: `A hero slider with layered parallax built on Swiper: the background, artwork, heading, text and button all travel at different speeds using data-swiper-parallax attributes.`,
    about: {
      title: 'Swiper Parallax Hero Slides — HTML, CSS & JavaScript',
      description: `Parallax turns a flat slider into something with depth: when the slides move, elements at different distances travel at different speeds, as they would in the physical world. It is easy to overdo with scroll listeners and requestAnimationFrame maths, and equally easy to do with Swiper's parallax module, where the whole effect is declared in HTML attributes.

There are two parts to the setup. The option parallax: true switches the module on. The effect itself comes from the data-swiper-parallax attribute on each layer, whose value is how far the element moves against the slide as the slider travels. A number is pixels, and a percentage is a proportion of the slide's width. In this hero the heading moves -200, the kicker -300, the paragraph -100 and the button -50, so the eyebrow text races past while the button barely shifts — an offset that reads as text floating in front of the artwork. The large decorative circle uses -40%, and the shared background gradient sits at -23%, the slowest of all. The rule of thumb is that the further a value is from zero, the faster the layer moves and the closer it appears.

The background deserves one technical note. It is a single element outside the swiper-wrapper, so it belongs to the whole slider rather than to one slide, and it is deliberately 130% wide. A parallax layer that is moving slower than the slides needs spare width to slide across; if it were exactly as wide as the container, it would reveal an empty edge partway through the transition. data-swiper-parallax-opacity on the paragraph adds a fade as it leaves, another cue for depth.

The rest is a solid hero. The slider has a 900 millisecond speed, so the parallax has time to be seen, grabCursor and keyboard control, navigation arrows, clickable pagination and the a11y module. The call-to-action is a real link with a visible focus outline, so keyboard users are not left behind by the visual effects. The artwork is CSS gradients, so no images are needed.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Drag a slide', text: 'Drag slowly and watch each layer move at its own speed: the eyebrow text fastest, the button slowest.' },
        { title: 'Compare layers', text: 'The large circle and the shared background gradient move more slowly than the text, which creates depth.' },
        { title: 'Use the arrows or keys', text: 'Use the arrow buttons, pagination dots or the keyboard to advance; the parallax runs on every transition.' },
        { title: 'Watch the fade', text: 'The paragraph fades as it leaves, driven by data-swiper-parallax-opacity.' },
        { title: 'Reach the link', text: 'Tab to a call-to-action to see the visible focus outline.' },
      ],
    },
    features: [
      'Declarative parallax via data-swiper-parallax attributes',
      'Pixel and percentage offsets per layer',
      'A shared, over-wide background layer outside the wrapper',
      'Opacity parallax with data-swiper-parallax-opacity',
      '900ms transitions so the depth effect is visible',
      'Arrow navigation, pagination, keyboard and grab cursor',
      'a11y module and visible focus states on links',
      'CSS-only artwork, no image files',
    ],
    useCases: [
      { icon: '🏠', title: 'Homepage hero banners', desc: 'Add depth to a brand hero where background, artwork, heading, text and button all travel at different speeds through `data-swiper-parallax` attributes.' },
      { icon: '🎄', title: 'Seasonal campaign sliders', desc: 'Rotate seasonal collections with cinematic layering, setting pixel or percentage offsets per layer for each element of the slide.' },
      { icon: '🎨', title: 'Portfolio openers', desc: 'Introduce portfolio work with layered typography, using opacity parallax from `data-swiper-parallax-opacity` for softer, fading entrances on each slide.' },
      { icon: '↕️', title: 'Vertical full-page comparison', desc: 'Compare with the [Swiper vertical full-page slider](/ui-snippets/swiper-vertical-fullpage-slider/) for a vertical take on full-screen storytelling with similar controls.' },
      { icon: '🎓', title: 'Layered motion learning', desc: 'Experiment with values to see how an over-wide shared background layer outside the wrapper creates convincing depth.' },
    ],
    faqs: [
      { q: 'How do I turn on parallax in Swiper?', a: 'Set parallax: true in the options, then add data-swiper-parallax attributes to the elements you want to move.' },
      { q: 'What do the values mean?', a: 'A number is a pixel offset; a percentage is a share of the slide width. Larger magnitudes move faster.' },
      { q: 'Why is there a gap when the background moves?', a: 'A layer moving at a different speed needs extra width. Make the background wider than the slider, such as 130%.' },
      { q: 'Can I fade elements while they move?', a: 'Yes, add data-swiper-parallax-opacity with a value between 0 and 1 to fade the element out as it leaves.' },
      { q: 'Does it work with vertical sliders?', a: 'Yes. Parallax follows the slider direction, moving layers vertically for vertical sliders.' },
      { q: 'Is parallax bad for accessibility?', a: 'Motion can trouble some users. Keep offsets modest, and consider disabling parallax when prefers-reduced-motion is set.' },
      { q: 'Can I use this parallax hero in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular or Tailwind export buttons on this page to convert the markup and styles. The behaviour comes from Swiper, so in a framework project install it with npm install swiper (its React and Vue components take the same options) instead of the CDN tag, use the Swiper and SwiperSlide components, or create it in useEffect / onMounted / ngAfterViewInit, and release it with destroy() when the component unmounts.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to disable the parallax for reduced-motion users, add a video background, or tie the accent colour to the active slide.`,
      prompt: `Build a parallax hero slider with Swiper 11 loaded from a CDN (bundle script and CSS).

Requirements:
- Use parallax: true, speed 900, grabCursor, keyboard, navigation arrows, clickable pagination and the a11y module.
- Add a shared background element outside the swiper-wrapper at 130% width with data-swiper-parallax="-23%".
- Give each of three slides a decorative circle (data-swiper-parallax="-40%"), a kicker (-300), heading (-200), paragraph (-100 with data-swiper-parallax-opacity) and call-to-action link (-50).
- Style with CSS gradients only and give the links visible focus outlines.`,
    },
  },
};

export default swiperParallaxHeroSlides;
