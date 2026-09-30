const bootstrapAnimatedCounterStats = {
  id: 'bootstrap-animated-counter-stats',
  title: 'Bootstrap Animated Counter Stats',
  lastmod: '2026-09-10',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5">
  <p class="text-muted small text-center mb-4">Scroll this row out of view and back into view to replay the count-up.</p>
  <div class="row text-center g-4" id="bsacsRow">
    <div class="col-6 col-md-3">
      <div class="bsacs-stat" data-target="10000" data-suffix="+">
        <div class="display-5 fw-bold text-primary"><span class="bsacs-num">0</span><span class="bsacs-suffix">+</span></div>
        <p class="text-muted mb-0">Customers</p>
      </div>
    </div>
    <div class="col-6 col-md-3">
      <div class="bsacs-stat" data-target="248" data-suffix="">
        <div class="display-5 fw-bold text-primary"><span class="bsacs-num">0</span><span class="bsacs-suffix"></span></div>
        <p class="text-muted mb-0">Countries</p>
      </div>
    </div>
    <div class="col-6 col-md-3">
      <div class="bsacs-stat" data-target="99" data-suffix="%">
        <div class="display-5 fw-bold text-primary"><span class="bsacs-num">0</span><span class="bsacs-suffix">%</span></div>
        <p class="text-muted mb-0">Uptime</p>
      </div>
    </div>
    <div class="col-6 col-md-3">
      <div class="bsacs-stat" data-target="4200" data-suffix="+">
        <div class="display-5 fw-bold text-primary"><span class="bsacs-num">0</span><span class="bsacs-suffix">+</span></div>
        <p class="text-muted mb-0">Reviews</p>
      </div>
    </div>
  </div>
</div>`,
  css: `.bsacs-num { font-variant-numeric: tabular-nums; }`,
  js: `function easeOutQuad(t) {
  return t * (2 - t);
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const numEl = el.querySelector('.bsacs-num');
  const duration = 1800;
  let start = null;

  function step(timestamp) {
    if (start === null) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuad(progress);
    numEl.textContent = Math.floor(eased * target).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      numEl.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(step);
}

const stats = Array.from(document.querySelectorAll('.bsacs-stat'));

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      // Each stat only ever counts up once: unobserving here prevents the
      // animation from restarting every time the row scrolls back into view.
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

stats.forEach(stat => observer.observe(stat));`,

  seo: {
    title: 'Bootstrap Animated Counter Stats — Free HTML CSS JS Snippet',
    description: 'IntersectionObserver-triggered count-up numbers with requestAnimationFrame easing, running once per stat. Copy-paste or export to React, Vue & Angular.',
    about: {
      title: 'Bootstrap Animated Counter Stats — HTML, CSS & JavaScript',
      description: `A stat that counts up the moment it scrolls into view is a common dashboard and marketing-page effect, and getting it right depends on two browser APIs working together correctly: \`IntersectionObserver\` to detect visibility, and \`requestAnimationFrame\` to drive a smooth animation rather than a laggy \`setInterval\` loop. This snippet lays out four stats in a Bootstrap \`row\` with \`display-5\` numbers, each wrapped in a \`.bsacs-stat\` div carrying its final value in a \`data-target\` attribute (e.g. \`data-target="10000"\`) so the target number lives in the markup rather than being hardcoded separately in JavaScript.\n\nA single \`IntersectionObserver\` is created with a \`{ threshold: 0.4 }\` option, meaning a stat is only considered "visible" once 40% of it has entered the viewport, avoiding a count-up that fires the instant one pixel peeks into view. When a stat intersects, \`animateCounter(el)\` reads its \`data-target\`, then drives the animation with \`requestAnimationFrame\`: each frame computes elapsed time against a fixed 1800ms \`duration\`, converts that into a 0–1 \`progress\` value, and runs it through \`easeOutQuad(t)\` — \`t * (2 - t)\` — so the count starts fast and settles gently into its final value instead of animating at a constant linear rate, which reads as noticeably more polished for this kind of UI.\n\nThe critical line for correctness is inside the observer's callback: \`obs.unobserve(entry.target)\` is called immediately after triggering the animation. This is the specific requirement that the counters run only once — without it, scrolling the stats row out of view and back again would restart every counter from zero repeatedly, which looks broken rather than intentional on a page where users often scroll up and down past the same section. Each number is written with \`.toLocaleString()\` during the animation, so a growing number like 10,000 displays with a comma separator on every intermediate frame, not just at the final value, and \`font-variant-numeric: tabular-nums\` is applied via the \`.bsacs-num\` class so digits don't visibly shift width frame-to-frame as the number grows from one digit to five, which would otherwise cause a distracting layout jitter during the count.\n\nA separate \`.bsacs-suffix\` span (holding "+", "%", or nothing) sits outside the animated number span entirely, so the suffix never gets overwritten by \`numEl.textContent\` assignments each animation frame.\n\nThe \`start\` timestamp inside \`animateCounter()\` is deliberately initialized to \`null\` and set on the very first frame received rather than being computed from \`performance.now()\` up front, because the first value \`requestAnimationFrame\` hands its callback is already a high-resolution timestamp anchored to the same clock — capturing it on that first call keeps \`elapsed\` accurate to the millisecond the animation actually began rendering, instead of drifting by however long it took the browser to schedule that first frame.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Four stat numbers are shown, all starting at 0.' },
        { title: 'Scroll the row into view', text: 'Each number rapidly counts up from 0 to its final value (10,000+, 248, 99%, 4,200+), slowing down as it approaches the end.' },
        { title: 'Watch the comma formatting', text: 'As the Customers number grows past 999, it displays with a thousands separator (e.g. "6,204") on every intermediate frame, not just the final one.' },
        { title: 'Scroll the row out of view, then back in', text: 'The numbers stay at their final values and do not restart, because each counter already unobserved itself after triggering once.' },
        { title: 'Compare the easing', text: 'Numbers rise quickly at first and settle in more slowly near the end, rather than incrementing at a constant linear rate.' },
      ],
    },
    features: [
      'IntersectionObserver with a 0.4 threshold triggers the count-up only once meaningfully visible',
      'requestAnimationFrame drives the animation instead of setInterval, for smoother frame timing',
      'easeOutQuad easing function makes the count-up decelerate naturally near its target',
      'Each stat unobserves itself after animating, guaranteeing it only ever counts up once',
      'Target values and suffixes are read from data attributes in the HTML, not hardcoded in JS',
      'toLocaleString() formats growing numbers with comma separators on every animation frame',
      'font-variant-numeric: tabular-nums prevents digit-width jitter as the number grows',
      'Suffix characters live in a separate span so they are never overwritten by the counting number',
    ],
    useCases: [
      { icon: 'DASH', title: 'Marketing landing page stats', desc: 'The classic "10,000+ Customers" trust-building section shown above the fold or before a testimonials block.' },
      { icon: 'APP', title: 'Admin dashboard KPI headers', desc: 'Pair with [Loading Spinner Overlay](/ui-snippets/bootstrap-loading-spinner-overlay/) so a dashboard both loads its data and animates the resulting numbers into view.' },
      { icon: 'STAR', title: 'Social proof near testimonials', desc: 'Place directly above a [Testimonial Carousel](/ui-snippets/bootstrap-testimonial-carousel/) to reinforce credibility with hard numbers before showcasing quotes.' },
      { icon: 'LEARN', title: 'Learning IntersectionObserver patterns', desc: 'A clean, dependency-free reference for scroll-triggered animation using the observer API instead of scroll event listeners.' },
      { icon: 'FLOW', title: 'Product or pricing page highlights', desc: 'Highlight adoption numbers alongside a [Video Hero Play Overlay](/ui-snippets/bootstrap-video-hero-play-overlay/) on a product landing page.' },
    ],
    faqs: [
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Create the IntersectionObserver inside useEffect (React) with a ref per stat element and disconnect/unobserve it in the cleanup function, inside onMounted (Vue) with template refs, or inside ngAfterViewInit (Angular) using ViewChild — in all three cases the observer and requestAnimationFrame logic itself is framework-agnostic and needs no changes.' },
      { q: 'Why use requestAnimationFrame instead of setInterval for the count-up?', a: 'requestAnimationFrame is synchronized to the browser\'s actual repaint cycle, so it produces smoother animation and automatically pauses when the tab is backgrounded, whereas a fixed-interval setInterval loop can drift out of sync with rendering and keeps running unnecessarily in a hidden tab.' },
      { q: 'Why does the counter only run once instead of every time it scrolls into view?', a: 'The IntersectionObserver callback calls obs.unobserve(entry.target) as soon as a stat becomes visible and its animation starts, which permanently stops that element from firing the callback again, satisfying the requirement that each stat counts up only the first time it is seen.' },
      { q: 'How is the easing curve chosen?', a: 'easeOutQuad computes t * (2 - t) on the 0-to-1 progress value, producing a curve that moves fast initially and decelerates toward the end, which is a standard, cheap-to-compute easing function well suited to short UI count-up animations.' },
      { q: 'Does this work with Tailwind instead of Bootstrap?', a: 'Yes — the display-5 and text-primary classes are purely cosmetic; replace them with Tailwind\'s text-5xl font-bold text-blue-600 or similar utilities, since the IntersectionObserver and requestAnimationFrame logic reads only from data-target and querySelector, not from any Bootstrap-specific class.' },
      { q: 'What happens with very large or decimal target numbers?', a: 'Math.floor(eased * target) always rounds down to a whole number during the animation and the final frame explicitly sets the exact target value, so even a large target like 4200 lands precisely on 4,200 rather than stopping one unit short due to floating-point rounding during the animation.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to make the animation duration proportional to each stat's target value so bigger numbers animate slightly longer, or to add a staggered start delay between the four stats instead of triggering them all at the same instant.`,
      prompt: `Build a Bootstrap 5.3 animated counter stats row using the real Bootstrap CDN (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A responsive row of at least four large stat numbers (e.g. "10,000+ Customers"), each starting at 0, with the final target value and any suffix stored in data attributes on the containing element.
- Use an IntersectionObserver with a meaningful visibility threshold to detect when the stats row scrolls into the viewport, and trigger the count-up animation only then.
- Animate each number counting up to its target using requestAnimationFrame and an easing function so the count decelerates near the end rather than incrementing linearly.
- Format the growing number with thousands separators during the animation, not just at the final value, and prevent digit-width layout jitter as the number grows.
- Each stat must animate only once — unobserve it from the IntersectionObserver after it has triggered so scrolling away and back does not restart the count.`,
    },
  },
};

export default bootstrapAnimatedCounterStats;
