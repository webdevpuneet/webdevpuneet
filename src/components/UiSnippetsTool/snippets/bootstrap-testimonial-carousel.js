const bootstrapTestimonialCarousel = {
  id: 'bootstrap-testimonial-carousel',
  title: 'Bootstrap Testimonial Card Carousel',
  lastmod: '2026-09-09',
  category: 'carousels',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5" style="max-width:560px">
  <div id="bstestiCarousel" class="carousel slide" data-bs-ride="false">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="card bstesti-card"><div class="card-body text-center">
          <div class="bstesti-stars">★★★★★</div>
          <p class="bstesti-quote">"Cut our onboarding time from two weeks to two days. The whole team adopted it in a single sprint."</p>
          <strong>Dana Reyes</strong><div class="text-muted small">Head of Ops, Fenwick</div>
        </div></div>
      </div>
      <div class="carousel-item">
        <div class="card bstesti-card"><div class="card-body text-center">
          <div class="bstesti-stars">★★★★★</div>
          <p class="bstesti-quote">"Support responded in minutes, not days. That alone justified switching."</p>
          <strong>Priya Nair</strong><div class="text-muted small">CTO, Loomis</div>
        </div></div>
      </div>
      <div class="carousel-item">
        <div class="card bstesti-card"><div class="card-body text-center">
          <div class="bstesti-stars">★★★★☆</div>
          <p class="bstesti-quote">"The API is exactly what you'd hope for — predictable, well documented, no surprises."</p>
          <strong>Marcus Chen</strong><div class="text-muted small">Lead Engineer, Voxel</div>
        </div></div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#bstestiCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#bstestiCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
    <div class="carousel-indicators bstesti-dots position-relative mt-3">
      <button type="button" data-bs-target="#bstestiCarousel" data-bs-slide-to="0" class="active"></button>
      <button type="button" data-bs-target="#bstestiCarousel" data-bs-slide-to="1"></button>
      <button type="button" data-bs-target="#bstestiCarousel" data-bs-slide-to="2"></button>
    </div>
  </div>
</div>`,
  css: `.bstesti-card { border: 1px solid #eceef1; border-radius: 14px; min-height: 220px; }
.bstesti-stars { color: #f59e0b; font-size: 15px; margin-bottom: 10px; }
.bstesti-quote { font-size: 16px; color: #1f2937; margin-bottom: 16px; }
.carousel-control-prev, .carousel-control-next { width: 5%; filter: invert(1); opacity: .5; }
.bstesti-dots button { background-color: #d1d5db; width: 7px; height: 7px; border-radius: 50%; }
.bstesti-dots button.active { background-color: #6366f1; }`,
  js: `// Bootstrap's own Carousel component handles all sliding and indicator
// sync via data-bs-* attributes — data-bs-ride="false" keeps it from
// auto-advancing, since testimonials should stay until manually browsed.
const carousel = bootstrap.Carousel.getOrCreateInstance(document.getElementById('bstestiCarousel'), { ride: false });`,

  seo: {
    title: 'Bootstrap Testimonial Card Carousel — Free Snippet',
    description: 'Real Bootstrap 5.3 carousel used for testimonial cards — star rating, quote, and attribution, with working prev/next controls and clickable indicator dots.',
    about: {
      title: 'Bootstrap Testimonial Card Carousel — HTML, CSS & JavaScript',
      description: `Bootstrap's Carousel component is usually shown carrying full-bleed images — this snippet uses the same real component to carry **testimonial cards** instead: a star rating, a quote, and an attribution, one per slide. The prev/next arrows, the clickable indicator dots, and the slide transition are all Bootstrap's own \`.carousel\`/\`.carousel-inner\`/\`.carousel-indicators\` markup, wired entirely through \`data-bs-target\`/\`data-bs-slide\` attributes.\n\nOne deliberate setting: \`data-bs-ride="false"\`. Testimonials are read, not glanced at — auto-advancing them (Bootstrap's default carousel behavior) risks sliding a quote away before a visitor finishes reading it. Here the carousel only ever moves when a visitor clicks an arrow or a dot.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads the first testimonial card.' },
        { title: 'Click the next arrow', text: 'Bootstrap\'s real Carousel slides smoothly to the second testimonial.' },
        { title: 'Click an indicator dot', text: 'Jump directly to any of the three testimonials by clicking its dot.' },
        { title: 'Add a fourth testimonial', text: 'Copy a .carousel-item block and add a matching fourth indicator button with data-bs-slide-to="3".' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 Carousel component carrying testimonial cards instead of images',
      'Auto-advance disabled (data-bs-ride="false") — moves only on explicit visitor interaction',
      'Working prev/next arrow controls and clickable indicator dots, all Bootstrap\'s own markup',
      'Star rating, quote, and attribution laid out in a real Bootstrap card per slide',
      'Adding a slide needs only a new carousel-item and a matching indicator button',
      'No JavaScript required for the sliding itself — one line initializes the instance',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Customer testimonial and social-proof sections', desc: 'A rotating set of testimonials in the space a single quote would otherwise occupy, without needing a separate carousel library.' },
      { icon: 'LEARN',  title: 'Learning to repurpose Bootstrap\'s Carousel', desc: 'Shows that Carousel isn\'t limited to full-bleed images — any content can be a slide, including a full card.' },
      { icon: 'CODE',   title: 'Case-study and review widgets', desc: 'Reuse the same slide structure for rotating case-study summaries or product reviews.' },
      { icon: 'FLOW',   title: 'Pricing pages needing trust signals', desc: 'Pair with the Bootstrap Pricing Table snippet — testimonials directly below pricing reinforce the decision at the moment it matters.' },
    ],
    faqs: [
      { q: 'Is this Bootstrap\'s real Carousel component?', a: 'Yes — the sliding, the prev/next controls, and the indicator dots are all genuine Bootstrap 5.3 Carousel behavior, driven by data-bs-target/data-bs-slide attributes, loaded from the real CDN.' },
      { q: 'Why doesn\'t it auto-advance like a typical carousel?', a: 'data-bs-ride="false" disables Bootstrap\'s default auto-advance. Testimonials need to be read, not glanced at, so this carousel only moves when a visitor clicks an arrow or a dot.' },
      { q: 'How do I add a fourth testimonial?', a: 'Copy a .carousel-item block with your new content, and add a matching indicator button with data-bs-slide-to="3" (continuing the zero-based index) to the indicator row.' },
      { q: 'Can I re-enable auto-advance?', a: 'Yes — remove data-bs-ride="false" (or set it to "carousel") and optionally pass an interval option to the JS initialization, e.g. { interval: 6000 }.' },
      { q: 'Are the prev/next arrows accessible?', a: 'Yes — they\'re Bootstrap\'s standard carousel controls, which include the correct ARIA labeling and keyboard focusability out of the box.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add swipe/touch gesture support for mobile visitors, or to make each slide show two testimonial cards side-by-side on desktop and one on mobile. It's also a good exercise to ask the assistant to pull testimonial data from a JSON array and render the slides dynamically instead of hardcoded HTML.`,
      prompt: `Build a Bootstrap 5.3 carousel used for testimonial cards, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- Use Bootstrap's real Carousel component (carousel/carousel-inner/carousel-item) with at least three slides, each containing a full card with a star rating, a quote, and an attribution (name and role) — not images.
- Disable auto-advance (data-bs-ride="false") so the carousel only moves on explicit visitor interaction via the prev/next arrows or the indicator dots, all using Bootstrap's real carousel-control and carousel-indicators markup.
- Initialize the carousel instance in JavaScript with bootstrap.Carousel.getOrCreateInstance and the ride:false option, rather than relying only on the data attribute.
- The whole thing must remain readable and correctly sized on both mobile and desktop widths.`,
    },
  },
};

export default bootstrapTestimonialCarousel;
