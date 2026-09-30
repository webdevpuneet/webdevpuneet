const dotPaginationCarousel = {
  id: 'dot-pagination-carousel',
  title: 'Dot Pagination Carousel',
  category: 'carousels',
  html: `<div class="carousel" id="carousel">
  <div class="carousel-track" id="carouselTrack">
    <div class="slide slide-1"><span>Slide 1</span></div>
    <div class="slide slide-2"><span>Slide 2</span></div>
    <div class="slide slide-3"><span>Slide 3</span></div>
    <div class="slide slide-4"><span>Slide 4</span></div>
  </div>
  <button class="arrow arrow-prev" onclick="moveSlide(-1)" aria-label="Previous slide">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
  </button>
  <button class="arrow arrow-next" onclick="moveSlide(1)" aria-label="Next slide">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
  </button>
  <div class="dots" id="dots" role="tablist" aria-label="Slide navigation">
    <button class="dot active" onclick="goToSlide(0)" aria-label="Go to slide 1"></button>
    <button class="dot" onclick="goToSlide(1)" aria-label="Go to slide 2"></button>
    <button class="dot" onclick="goToSlide(2)" aria-label="Go to slide 3"></button>
    <button class="dot" onclick="goToSlide(3)" aria-label="Go to slide 4"></button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; display: flex; align-items: center; flex-direction: column; gap: 20px; justify-content: center; min-height: 100vh; }

.carousel { position: relative; max-width: 480px; margin: 0 auto; border-radius: 14px; overflow: hidden; }

.carousel-track { display: flex; transition: transform 0.4s ease; }

.slide { min-width: 100%; height: 220px; display: flex; align-items: center; justify-content: center; }
.slide span { font-size: 20px; font-weight: 700; color: #fff; }
.slide-1 { background: linear-gradient(135deg, #6366f1, #4f46e5); }
.slide-2 { background: linear-gradient(135deg, #ec4899, #db2777); }
.slide-3 { background: linear-gradient(135deg, #10b981, #059669); }
.slide-4 { background: linear-gradient(135deg, #f59e0b, #d97706); }

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: rgba(15,23,42,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s;
}
.arrow:hover { background: rgba(15,23,42,0.55); }
.arrow-prev { left: 12px; }
.arrow-next { right: 12px; }

.dots { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; }
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, width 0.2s;
}
.dot.active { background: #fff; width: 22px; border-radius: 4px; }`,
  js: `const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.dot');
const totalSlides = document.querySelectorAll('.slide').length;
let currentIndex = 0;

function renderSlide() {
  track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}

function goToSlide(index) {
  currentIndex = index;
  renderSlide();
}

function moveSlide(delta) {
  currentIndex = (currentIndex + delta + totalSlides) % totalSlides;
  renderSlide();
}

renderSlide();`,

  seo: {
    title: 'Dot Pagination Carousel — Free HTML CSS JS Slide Carousel Snippet',
    description: 'An image/content carousel with clickable dot indicators, an active pill-shaped dot, and prev/next arrows, built with a single translateX transform. Vanilla JS.',
    about: {
      title: 'Dot Pagination Carousel — HTML, CSS & JavaScript Slide Carousel',
      description: `Carousels are everywhere — hero banners, testimonial rotators, onboarding screens — and the dot-indicator-plus-arrows combination is the most recognizable navigation pattern for them. This snippet builds a complete carousel using a single sliding track and a row of clickable dots, with the currently active dot rendered as a wider pill rather than just a differently colored circle.

**How the sliding mechanism works**

All slides sit side by side inside \`.carousel-track\` with \`display: flex\`, each slide set to \`min-width: 100%\` so exactly one slide fills the visible \`.carousel\` viewport at a time (\`overflow: hidden\` on the parent hides the rest). Moving between slides is a single CSS transform: \`track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)'\`. To show slide index 2, the track shifts left by exactly \`200%\` of its own width — since each slide is 100% of the viewport, sliding by a multiple of 100% always lines up a slide exactly with the viewport. The \`transition: transform 0.4s ease\` on the track is what makes that jump animate smoothly instead of snapping.

**How the dots and arrows share one state**

There is exactly one source of truth: the \`currentIndex\` variable. Both \`goToSlide(index)\` (called by clicking a dot) and \`moveSlide(delta)\` (called by clicking an arrow, passing \`+1\` or \`-1\`) do nothing but update \`currentIndex\` and then call the single \`renderSlide()\` function, which both moves the track and updates which dot has the \`.active\` class. This means dots and arrows can never disagree about which slide is showing — they're just two different ways of changing the same variable.

**How the arrows wrap around**

\`moveSlide\` computes \`(currentIndex + delta + totalSlides) % totalSlides\`. Adding \`totalSlides\` before the modulo is what correctly handles the "previous" click from slide 0 — without it, \`(0 - 1) % 4\` would evaluate to \`-1\` in JavaScript (a negative number, not a valid array-style wraparound), rather than the desired \`3\`.

**How the active dot pill effect works**

The \`.dot.active\` class doesn't just change \`background\` — it also grows \`width\` from \`8px\` to \`22px\` and rounds the corners slightly less (\`border-radius: 4px\` instead of \`50%\`), turning a circle into a short pill. This is a purely cosmetic CSS transition layered on top of the same class toggle used for the color change.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Dot Pagination Carousel" in the sidebar Library tab to load the four-slide demo.' },
        { title: 'Click dots and arrows', text: 'Click any dot to jump directly to that slide, or use the prev/next arrows in the preview.' },
        { title: 'Add real content', text: 'Replace each .slide div\'s background gradient with a real image via background-image or an <img> tag.' },
        { title: 'Add more slides', text: 'Add a new .slide div in the track and a matching dot button — totalSlides and the wraparound math update automatically.' },
        { title: 'Add autoplay', text: 'Wrap moveSlide(1) in a setInterval to auto-advance, and clear it on user interaction if you want to pause on hover.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind, or click "Save as" to reuse this carousel in a real hero or testimonial section.' },
      ],
    },
    features: [
      'Single translateX transform on a flex track — no per-slide positioning logic needed',
      'One currentIndex variable and one renderSlide function keep dots, arrows, and track perfectly in sync',
      'Modulo-based wraparound lets prev/next arrows cycle seamlessly past the first and last slide',
      'Active dot grows into a pill shape rather than just changing color, for a clearer active state',
      'Dots and arrows are fully keyboard-clickable native <button> elements',
      'role="tablist" and descriptive aria-labels on dots and arrows for screen reader support',
      'Smooth 0.4s eased slide transition defined entirely in CSS',
      'Adding or removing slides requires no changes to the JavaScript logic',
    ],
    useCases: [
      { icon: 'HERO', title: 'Hero banner carousels', desc: 'Rotate through promotional banners or featured content on a homepage with clear dot navigation.' },
      { icon: 'FLOW', title: 'Onboarding and feature tour screens', desc: 'Use as the base pattern for a multi-step onboarding flow where dots double as progress indicators.' },
      { icon: 'REVIEW', title: 'Testimonial and review rotators', desc: 'Cycle through customer testimonials or case study highlights with a familiar, accessible navigation pattern.' },
      { icon: 'SHOP', title: 'Product image galleries', desc: 'Adapt the same carousel to cycle through multiple images of a single product on a detail page.' },
      { icon: 'LEARN', title: 'Learn transform-based slide animation', desc: 'Study why translateX percentage math naturally handles any number of equal-width slides without per-slide calculations.' },
      { icon: 'CODE', title: 'Foundation for autoplay carousels', desc: 'Extend with a setInterval calling moveSlide(1) to build an auto-advancing carousel, pausing it on hover or focus.' },
      { icon: 'CODE', title: 'Related: Filter Tabs Gallery', desc: 'See the [Filter Tabs Gallery](/ui-snippets/filter-tabs-gallery/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the carousel know how far to slide?', a: 'Each slide is exactly 100% of the visible viewport width. Sliding to index N means shifting the track left by N times 100%, which the transform property does directly: translateX(-N00%). Because every slide is the same width, this math works for any number of slides without per-slide coordinates.' },
      { q: 'How do the dots and the prev/next arrows stay in sync?', a: 'Both interactions only ever change one shared variable, currentIndex, and then call the same renderSlide function, which updates both the track position and the active dot. There is no separate state for "which dot is active" versus "which slide is showing" — they are driven by the same source of truth.' },
      { q: 'How does clicking Previous on the first slide work correctly?', a: 'moveSlide computes (currentIndex + delta + totalSlides) % totalSlides. Adding totalSlides before the modulo operation ensures a negative intermediate value (like -1 when going back from slide 0) wraps around to the correct last-slide index instead of producing a negative number.' },
      { q: 'How do I add autoplay to this carousel?', a: 'Wrap a call to moveSlide(1) in a setInterval with your desired delay (e.g. 4000ms). Consider clearing and restarting that interval on manual dot/arrow interaction, and pausing it on mouse hover or keyboard focus for better usability.' },
      { q: 'Can I use real images instead of the gradient placeholders?', a: 'Yes — replace each .slide div\'s background gradient with a background-image, or replace the div\'s content with an <img> element sized to fill the slide with object-fit: cover.' },
      { q: 'How do I add a fifth slide?', a: 'Add a new .slide div inside the track and a matching dot button in the .dots container calling goToSlide with the next index. totalSlides is calculated automatically from the DOM, so no manual count needs updating.' },
      { q: 'Is this carousel accessible to screen reader and keyboard users?', a: 'The dots and arrows are native buttons with descriptive aria-labels ("Go to slide 2", "Previous slide"), and the dots container uses role="tablist" to signal a navigable group. All controls are reachable and operable via keyboard by default since they are real button elements.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to walk through the translateX percentage math in detail — specifically why multiplying currentIndex by 100% works regardless of how many slides exist, as long as every slide is exactly the width of the viewport. It's also a good prompt for adding touch/swipe support via pointer events so mobile users can drag between slides, or for adding autoplay with a pause-on-hover behavior, both common real-world carousel requirements not covered by the base click-only version.`,
      prompt: `Build a "dot pagination carousel" in plain HTML, CSS, and vanilla JavaScript with clickable dots and prev/next arrows — no carousel library.

Requirements:
- A flex track containing several full-viewport-width slides, moved between using a single CSS transform (translateX by a percentage of the track width based on the current slide index), animated with a CSS transition rather than manual JavaScript animation.
- A row of small dot buttons below the carousel, one per slide, where clicking a dot jumps directly to that slide, and the currently active dot is visually distinguished (e.g. widened into a pill shape) rather than only changed in color.
- Previous/next arrow buttons that move one slide at a time and correctly wrap around from the last slide back to the first (and vice versa) using modulo arithmetic that handles negative intermediate values correctly.
- Exactly one shared piece of state (a current slide index) must drive both the track position and the active dot — no separate, potentially-desynced state for the two.
- The whole component must support adding or removing slides by only editing the markup, with zero required changes to the JavaScript logic.
- All interactive controls must be real <button> elements with descriptive aria-labels for accessibility.`,
    },
  },
};

export default dotPaginationCarousel;
