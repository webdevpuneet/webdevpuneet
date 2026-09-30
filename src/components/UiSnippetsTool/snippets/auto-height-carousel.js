const autoHeightCarousel = {
  id: 'auto-height-carousel',
  title: 'Auto-Height Carousel',
  lastmod: '2026-09-14',
  category: 'carousels',
  html: `<div class="ahc-wrap">
  <div class="ahc-viewport" id="ahcViewport">
    <div class="ahc-track" id="ahcTrack">
      <div class="ahc-slide"><h3>Short FAQ</h3><p>Do you offer refunds? Yes, within 30 days.</p></div>
      <div class="ahc-slide"><h3>A Medium One</h3><p>Our platform supports single sign-on, role-based access control, audit logs, and exports to CSV or JSON for any report you build.</p></div>
      <div class="ahc-slide"><h3>The Long Answer</h3><p>Pricing scales with active seats, not total users — invited members who never log in cost nothing. Annual billing saves 20% versus monthly, and you can switch between plans at any time; unused time on a downgrade is credited to your next invoice automatically, no support ticket required.</p></div>
    </div>
  </div>
  <div class="ahc-controls">
    <button class="ahc-btn" id="ahcPrev" aria-label="Previous">‹</button>
    <div class="ahc-dots" id="ahcDots"></div>
    <button class="ahc-btn" id="ahcNext" aria-label="Next">›</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f6f7f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ahc-wrap{width:100%;max-width:380px}
.ahc-viewport{position:relative;overflow:hidden;border-radius:14px;background:#fff;box-shadow:0 10px 26px rgba(15,23,42,.14);transition:height .35s cubic-bezier(.4,0,.2,1)}
.ahc-track{display:flex;transition:transform .4s cubic-bezier(.4,0,.2,1)}
.ahc-slide{flex:0 0 100%;padding:24px;box-sizing:border-box}
.ahc-slide h3{font-size:15px;font-weight:800;color:#1f2937;margin-bottom:8px}
.ahc-slide p{font-size:13px;color:#4b5563;line-height:1.6}
.ahc-controls{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:16px}
.ahc-btn{width:36px;height:36px;border-radius:50%;background:#fff;border:1.5px solid #e3e5ea;color:#4b5563;font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:border-color .15s,color .15s}
.ahc-btn:hover{border-color:#6366f1;color:#6366f1}
.ahc-dots{display:flex;gap:7px}
.ahc-dot{width:7px;height:7px;border-radius:50%;background:#d1d5db;border:none;cursor:pointer;transition:background .2s,width .2s}
.ahc-dot.active{background:#6366f1;width:20px;border-radius:4px}`,

  js: `var viewport = document.getElementById('ahcViewport');
var track = document.getElementById('ahcTrack');
var slides = document.querySelectorAll('.ahc-slide');
var dotsWrap = document.getElementById('ahcDots');
var current = 0;

slides.forEach(function (s, i) {
  var d = document.createElement('button');
  d.className = 'ahc-dot';
  d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  d.addEventListener('click', function () { goTo(i); });
  dotsWrap.appendChild(d);
});
var dots = document.querySelectorAll('.ahc-dot');

function measureAndSetHeight() {
  // Measuring the active slide's natural height and applying it explicitly
  // to the viewport (rather than letting the viewport size to its tallest
  // child, or leaving it unset) is what makes an animated height CHANGE
  // possible at all — a CSS transition cannot animate to/from "auto".
  var activeSlide = slides[current];
  var h = activeSlide.getBoundingClientRect().height;
  viewport.style.height = h + 'px';
}

function render() {
  track.style.transform = 'translateX(' + (-current * 100) + '%)';
  dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
  measureAndSetHeight();
}

function goTo(i) { current = i; render(); }
function next() { goTo((current + 1) % slides.length); }
function prev() { goTo((current - 1 + slides.length) % slides.length); }

document.getElementById('ahcNext').addEventListener('click', next);
document.getElementById('ahcPrev').addEventListener('click', prev);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') next();
  else if (e.key === 'ArrowLeft') prev();
});

window.addEventListener('resize', measureAndSetHeight);

// Set the initial height without a transition, so the very first paint
// doesn't visibly animate from 0.
viewport.style.transition = 'none';
render();
requestAnimationFrame(function () { viewport.style.transition = ''; });`,

  seo: {
    title: 'Auto-Height Carousel — HTML CSS JS Snippet',
    description: 'A carousel whose container smoothly animates its own height to match each slide\'s real content — short FAQs and long paragraphs both fit perfectly, no clipped text and no fixed slide height. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Auto-Height Carousel — Measuring Content to Animate a Property CSS Can\'t Animate',
      description: `CSS cannot transition \`height\` to or from \`auto\` — it's one of the oldest, most persistent limitations in the language. This carousel works around it by never using \`auto\` for the animated value at all: on every slide change, JavaScript measures the *new* active slide's real, natural height in pixels with \`getBoundingClientRect()\`, and sets that literal pixel value on the viewport. Because the viewport's \`height\` is a CSS \`transition\`-able property, animating *between two known pixel numbers* works perfectly — the trick is entirely in how that target number gets produced.\n\n**Measuring the slide, not the viewport**\n\nEach \`.ahc-slide\` sits in a flex track sized at 100% width each, so all three slides' natural heights already exist in the DOM regardless of which one is "active" — \`measureAndSetHeight()\` just reads \`getBoundingClientRect().height\` off whichever slide index is currently \`current\`. That's the one measurement this entire pattern depends on: a slide's true rendered height, taken fresh every time the active index changes.\n\n**Skipping the transition on the very first paint**\n\nIf the viewport's height transition were active from the start, the browser would animate from its default (\`auto\`-derived, effectively 0 before any height is set) up to the first slide's real height — a visible pop on page load. Setting \`transition: none\` before the first \`render()\` call, then clearing it back on the next animation frame, sidesteps that: the first height is applied instantly, and only subsequent slide changes animate.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A short FAQ appears in a card sized to fit it exactly — no extra empty space.' },
        { title: 'Click next', text: 'The card smoothly grows taller as it slides to the medium-length answer.' },
        { title: 'Click next again', text: 'It grows further still for the longest answer — always sized to fit exactly, never clipped or padded.' },
        { title: 'Click back to the first', text: 'The card smoothly shrinks back down to the short answer\'s natural height.' },
        { title: 'Add a slide with different content length', text: 'No height needs to be set manually — measureAndSetHeight reads it automatically.' },
      ],
    },
    features: [
      'The viewport smoothly animates its height between slides of genuinely different content lengths',
      'Works around CSS\'s inability to transition to/from "auto" by measuring real pixel heights via JavaScript',
      'Every slide keeps its natural, unclipped height — no fixed slide height forcing scroll or empty space',
      'The very first paint sets height instantly (transition disabled for one frame) to avoid an unwanted pop-in animation',
      'Recalculates on window resize, so height stays accurate if content reflows at a new viewport width',
      'Standard translateX slide transition runs simultaneously with the height animation for a cohesive motion',
    ],
    useCases: [
      { icon: 'CODE',  title: 'FAQ or accordion-style carousels', desc: 'The exact case this snippet models — answers of wildly different lengths, each perfectly fitted.' },
      { icon: 'FORM',  title: 'Multi-step forms with varying field counts', desc: 'Each step\'s card resizes to fit exactly the fields it contains, no wasted space on shorter steps.' },
      { icon: 'DESIGN',title: 'Testimonial carousels with varying quote lengths', desc: 'Long, detailed quotes and short one-liners both display in full without a fixed, compromise height.' },
      { icon: 'FLOW',  title: 'Onboarding cards with different amounts of copy', desc: 'Avoid the common onboarding-carousel bug where a fixed height clips a longer step\'s text.' },
    ],
    faqs: [
      { q: 'Why can\'t I just use height: auto with a CSS transition?', a: 'Browsers cannot animate a transition to or from the auto keyword — there\'s no defined intermediate state between "auto" and a pixel value for the browser to interpolate. Measuring the real height in JavaScript and setting an explicit pixel value is the standard, reliable workaround.' },
      { q: 'What if a slide\'s content changes dynamically (e.g. loaded async)?', a: 'Call measureAndSetHeight() again after that content finishes loading/rendering — it always re-measures the currently active slide\'s real height, so it stays accurate as long as it\'s invoked after any layout-affecting change.' },
      { q: 'Does this work with images or other async-loading content inside a slide?', a: 'Only if the height is measured after the image has actually loaded — an image without explicit width/height attributes can cause a late reflow. Add an aspect-ratio or explicit dimensions to any image, or re-measure on that image\'s load event.' },
      { q: 'Why is the transition disabled just for the very first render?', a: 'Without that guard, the viewport would visibly animate from its unset/zero starting height up to the first slide\'s real height the instant the page loads — a distracting pop-in that has nothing to do with actual carousel navigation.' },
      { q: 'Is it accessible?', a: 'Arrows and dots are real labeled buttons operable via Left/Right arrow keys — for full accessibility, ensure the animated height change doesn\'t interfere with a screen reader\'s ability to read the newly active slide\'s content, which it won\'t since content is always present in the DOM, just visually repositioned.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why CSS cannot animate a height transition to or from auto, and how measuring a slide's real pixel height with getBoundingClientRect and applying it explicitly sidesteps that limitation entirely. It's also worth asking the assistant to add a ResizeObserver on the active slide so the height stays correct even if that slide's content changes dynamically after the initial render (e.g. an image loading late), instead of only re-measuring on navigation and window resize.`,
      prompt: `Build a carousel in plain HTML, CSS, and vanilla JavaScript whose container smoothly animates its height to match each slide's actual content height, given that slides contain meaningfully different amounts of content — no library.

Requirements:
- A viewport container with overflow hidden wrapping a horizontally sliding track of full-width slide elements, where each slide contains a different, realistic amount of text content (varying enough that their natural heights are noticeably different from each other).
- A function that measures the currently active slide's real rendered height (using an actual DOM measurement API, not an estimate or fixed value) and applies that exact pixel value as the viewport container's height, since CSS cannot animate a height transition to or from the auto keyword — this measurement must be re-run every time the active slide changes.
- The viewport's height change and the track's horizontal slide transition must both be CSS transitions that run smoothly together whenever navigating to a new slide.
- On the very first page render, the initial height must be applied without any visible transition animation (to avoid an unwanted "pop-in" effect from an unset starting height), with the transition only becoming active for subsequent slide navigations.
- The height measurement must be re-run on window resize as well, so the displayed height stays accurate if the content reflows at a different viewport width.
- Previous/next buttons and dynamically generated indicator dots for navigation, plus Left/Right arrow key support.`,
    },
  },
};

export default autoHeightCarousel;
