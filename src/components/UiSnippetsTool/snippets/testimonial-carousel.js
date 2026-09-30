const testimonialCarousel = {
  id: 'testimonial-carousel',
  title: 'Testimonial Carousel',
  lastmod: '2026-07-18',
  category: 'carousels',
  html: `<div class="tc-carousel" id="tcCarousel" aria-roledescription="carousel" aria-label="Customer testimonials">
  <div class="tc-viewport">
    <div class="tc-track" id="tcTrack"></div>
  </div>

  <div class="tc-controls">
    <button class="tc-arrow" id="tcPrev" type="button" aria-label="Previous testimonial">
      <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <div class="tc-dots" id="tcDots" role="tablist" aria-label="Choose testimonial"></div>
    <button class="tc-arrow" id="tcNext" type="button" aria-label="Next testimonial">
      <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px; }

.tc-carousel { width: 100%; max-width: 460px; }

.tc-viewport { overflow: hidden; border-radius: 18px; }

.tc-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1);
  will-change: transform;
}

.tc-slide {
  flex: 0 0 100%;
  padding: 34px 32px 30px;
  background: #fff;
  border: 1px solid #e8edf3;
}

.tc-stars { display: flex; gap: 3px; margin-bottom: 16px; }
.tc-stars svg { width: 17px; height: 17px; fill: #f59e0b; }

.tc-text {
  font-size: 17px;
  line-height: 1.6;
  color: #1e293b;
  font-weight: 500;
  letter-spacing: -0.01em;
  min-height: 110px;
}

.tc-author { display: flex; align-items: center; gap: 12px; margin-top: 22px; }
.tc-avatar {
  width: 44px; height: 44px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 15px; font-weight: 700;
  border-radius: 50%;
}
.tc-meta { display: flex; flex-direction: column; }
.tc-name { font-size: 14.5px; font-weight: 700; color: #0f172a; }
.tc-role { font-size: 12.5px; color: #94a3b8; }

.tc-controls { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 22px; }

.tc-arrow {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 50%;
  cursor: pointer; color: #475569;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.tc-arrow svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.tc-arrow:hover { border-color: #6366f1; color: #6366f1; }

.tc-dots { display: flex; gap: 8px; }
.tc-dot {
  width: 8px; height: 8px; padding: 0;
  background: #cbd5e1; border: none; border-radius: 999px;
  cursor: pointer;
  transition: width 0.3s, background 0.3s;
}
.tc-dot.active { width: 24px; background: #6366f1; }`,
  js: `const DATA = [
  { text: 'We shipped our redesign three weeks early. The component library alone saved us a month of work — everything just dropped in and worked.', name: 'Maya Chen', role: 'Head of Product, Linework', rating: 5, color: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { text: 'Support actually reads your messages. I reported an edge case at 11pm and had a fix in the next release. That never happens.', name: 'Devon Park', role: 'CTO, Halcyon', rating: 5, color: 'linear-gradient(135deg,#0ea5e9,#22d3ee)' },
  { text: 'Onboarding took ten minutes. Our whole team was productive on day one without a single training call.', name: 'Priya Nair', role: 'Eng Manager, Foundry', rating: 4, color: 'linear-gradient(135deg,#16a34a,#84cc16)' },
  { text: 'The pricing is honest and the value is obvious. We compared four tools and this was the only one that did not nickel-and-dime us.', name: 'Tom Alvarez', role: 'Founder, Skiff', rating: 5, color: 'linear-gradient(135deg,#f97316,#ec4899)' },
];

const track = document.getElementById('tcTrack');
const dotsWrap = document.getElementById('tcDots');
const carousel = document.getElementById('tcCarousel');
let index = 0;
let timer = null;

function starSvg() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
}

DATA.forEach((t, i) => {
  const slide = document.createElement('div');
  slide.className = 'tc-slide';
  const initials = t.name.split(' ').map(w => w[0]).join('').slice(0, 2);
  const stars = Array.from({ length: 5 }, (_, s) => s < t.rating ? starSvg() : '').join('');
  slide.innerHTML =
    '<div class="tc-stars">' + stars + '</div>' +
    '<p class="tc-text">' + t.text + '</p>' +
    '<div class="tc-author">' +
      '<span class="tc-avatar" style="background:' + t.color + '">' + initials + '</span>' +
      '<span class="tc-meta"><span class="tc-name">' + t.name + '</span><span class="tc-role">' + t.role + '</span></span>' +
    '</div>';
  track.appendChild(slide);

  const dot = document.createElement('button');
  dot.className = 'tc-dot' + (i === 0 ? ' active' : '');
  dot.type = 'button';
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
  dot.addEventListener('click', () => { goTo(i); restart(); });
  dotsWrap.appendChild(dot);
});

function goTo(i) {
  index = (i + DATA.length) % DATA.length;
  track.style.transform = 'translateX(-' + (index * 100) + '%)';
  [...dotsWrap.children].forEach((d, di) => d.classList.toggle('active', di === index));
}

function restart() {
  clearInterval(timer);
  timer = setInterval(() => goTo(index + 1), 5000);
}

document.getElementById('tcPrev').addEventListener('click', () => { goTo(index - 1); restart(); });
document.getElementById('tcNext').addEventListener('click', () => { goTo(index + 1); restart(); });

// Pause autoplay on hover / focus
carousel.addEventListener('mouseenter', () => clearInterval(timer));
carousel.addEventListener('mouseleave', restart);
carousel.addEventListener('focusin', () => clearInterval(timer));
carousel.addEventListener('focusout', restart);

restart();`,
  seo: {
    title: 'Testimonial Carousel — Free HTML CSS JS Slider Snippet',
    description: 'An autoplaying testimonial carousel with star ratings, avatars, arrow controls and animated dots that pauses on hover. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Testimonial Carousel — Autoplay Slider with Stars, Avatars and Animated Dots',
      description: `Social proof sells, but a wall of testimonials is overwhelming and a single static quote is forgettable. The testimonial carousel solves both problems: it shows one customer quote at a time, full and readable, then advances automatically so visitors see several without scrolling. This component is a complete, accessible carousel built with a CSS \`transform\` track, autoplay that pauses on interaction, arrow controls, and animated progress dots — all in plain HTML, CSS, and vanilla JavaScript with no slider library.

**The transform-based track**

The mechanics are a flex track inside an \`overflow: hidden\` viewport. Every slide has \`flex: 0 0 100%\`, so each one is exactly the viewport's width and they line up in a horizontal row. Sliding is a single \`transform: translateX(-N%)\` on the track, where N is the active index times 100 — moving to slide 2 translates the track by -100%, slide 3 by -200%, and so on. Because it animates only \`transform\`, the slide runs on the GPU compositor at 60fps with no layout work, and \`will-change: transform\` hints the browser to promote the track to its own layer ahead of time.

**Data-driven slides and ratings**

The carousel is built from a \`DATA\` array of \`{ text, name, role, rating, color }\` objects. On load the script loops the array, builds each slide's markup, and derives two things automatically: the author's initials (by splitting the name and taking each word's first letter) for the gradient avatar, and the star row (by rendering a filled star SVG for each point up to \`rating\` out of five). This means adding a testimonial is a single array entry — no markup edits — and the four-star example shows partial ratings render correctly.

**Autoplay with pause-on-interaction**

A \`setInterval\` advances the carousel every 5 seconds by calling \`goTo(index + 1)\`. The crucial UX detail is that autoplay yields to the user: \`mouseenter\` and \`focusin\` clear the interval so the carousel stops while someone is reading or tabbing through it, and \`mouseleave\` and \`focusout\` restart it. Every manual action — clicking an arrow or a dot — also calls \`restart()\`, which clears and re-creates the timer so the full 5 seconds is given to the slide the user just chose rather than whatever was left on the previous tick.

**Infinite wrap-around**

The \`goTo()\` function normalises any index with \`(i + length) % length\`, so advancing past the last slide wraps to the first and going back from the first wraps to the last. The arrows and autoplay all route through this one function, which means there is a single source of truth for the current index, the track transform, and the active dot — no chance of the dots drifting out of sync with the visible slide.

**Animated progress dots**

The dots are real \`<button>\` elements with \`role="tab"\`. The active dot is not just a different colour — it stretches from a circle to a pill with \`width: 24px\` via a CSS \`transition\` on \`width\`, giving a subtle, modern progress indicator. Clicking any dot jumps straight to that slide and restarts autoplay. The arrows are circular icon buttons with hover states that adopt the accent colour, and everything carries appropriate \`aria-label\` and \`aria-roledescription\` attributes so the carousel is understandable to screen readers.

**Customisation**

To use it, replace the \`DATA\` array with your real testimonials — set each \`rating\` from 1 to 5, give each author a gradient \`color\`, and the avatars and stars render automatically. Adjust the 5000ms autoplay interval, change the 0.5s slide \`transition\` duration or easing, and swap the \`#6366f1\` accent (active dot, arrow hover, avatars) for your brand. To show real photos instead of initials, render an \`<img>\` in place of the \`.tc-avatar\` span. For a multi-card view, change the slide's \`flex-basis\` to \`50%\` or \`33.33%\` and step the transform by that amount.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A testimonial card renders with a star rating, quote, author, arrow controls, and a row of dots; it begins autoplaying every 5 seconds.` },
      { title: 'Use the arrows', text: `Click the left/right arrows to move between testimonials; the track slides smoothly and autoplay timing resets.` },
      { title: 'Click a dot', text: `Jump directly to any testimonial; the active dot stretches into a pill to mark your position.` },
      { title: 'Hover to pause', text: `Move the pointer over the carousel (or tab into it) and autoplay pauses so you can read; it resumes when you leave.` },
      { title: 'Replace the testimonials', text: `Edit the DATA array — each entry's rating drives the stars and the name drives the avatar initials automatically.` },
      { title: 'Theme and time it', text: `Swap the #6366f1 accent and adjust the 5000ms interval and 0.5s slide duration to fit your brand and pace.` },
    ]},
    features: [
      { title: 'Transform-based sliding', text: `A single translateX on a flex track gives GPU-accelerated 60fps transitions with no layout cost.` },
      { title: 'Autoplay that respects the reader', text: `Advances every 5s but pauses on hover and keyboard focus, resuming when the user leaves.` },
      { title: 'Infinite wrap-around', text: `Index normalisation with modulo means next past the end loops to the start and vice versa.` },
      { title: 'Data-driven slides', text: `A DATA array builds slides, derives author initials, and renders the correct number of filled stars per rating.` },
      { title: 'Animated pill dots', text: `The active dot transitions from a circle to a 24px pill for a clean progress indicator.` },
      { title: 'Single source of truth', text: `Arrows, dots, and autoplay all call one goTo() function, so the slide, dots, and index never drift apart.` },
      { title: 'Star ratings', text: `Renders 1–5 filled stars per testimonial so partial ratings display correctly.` },
      { title: 'Accessible markup', text: `Roledescription, tab roles, and aria-labels make the carousel and its controls understandable to screen readers.` },
    ],
    useCases: [
      { title: 'Landing-page social proof', text: `Rotate customer quotes near your CTA to build trust without a long testimonials wall — pair with a [logo cloud](/ui-snippets/logo-cloud/) of customer brands.` },
      { title: 'Product and SaaS marketing', text: `Showcase reviews from different roles (CTO, PM, founder) so each visitor sees someone like them; complements a [pricing card](/ui-snippets/pricing-card/) section.` },
      { title: 'Agency and freelance portfolios', text: `Cycle through client praise to reinforce credibility alongside your work; for a single highlighted quote use a [testimonial card](/ui-snippets/testimonial-card/).` },
      { title: 'App store and review highlights', text: `Surface your best star-rated reviews; show the full distribution with a [rating breakdown](/ui-snippets/rating-breakdown/).` },
      { title: 'Course and creator pages', text: `Rotate student or subscriber testimonials to convert visitors on the fence.` },
      { title: 'Learning carousel mechanics', text: `A reference for transform tracks, autoplay with pause-on-interaction, and synced dot indicators.` },
    ],
    faqs: [
      { q: 'How do I change the autoplay speed or turn it off?', a: `The interval is set in restart() as setInterval(..., 5000) — change 5000 to your preferred milliseconds. To disable autoplay entirely, remove the restart() call at the bottom and the mouseenter/leave/focus handlers, leaving only the arrows and dots for manual control. The slide animation speed is separate: edit the 0.5s transition on .tc-track.` },
      { q: 'How do I show two or three testimonials at once?', a: `Change the slide's flex-basis from 100% to 50% (two up) or 33.33% (three up) in .tc-slide, and update goTo() to translate by index * (100 / perView) percent. You may also want the dots to represent pages rather than individual slides. The autoplay, wrap-around, and pause logic stay the same.` },
      { q: 'Why does autoplay reset when I click an arrow?', a: `Every manual navigation calls restart(), which clears and recreates the timer. This gives the slide you just selected the full interval before it advances, rather than the leftover fraction of the previous tick — so the carousel never jumps away a moment after you click. It is a small detail that makes manual control feel responsive.` },
      { q: 'How do I use real avatar photos instead of initials?', a: `Replace the <span class="tc-avatar">initials</span> in the slide template with <img class="tc-avatar" src={t.img} alt={t.name}> and add object-fit: cover to the .tc-avatar rule so the photo fills the circle. Add an img field to each DATA entry. Keep the initials version as a fallback for testimonials without a photo.` },
      { q: 'How do I use this carousel in React, Vue, or Angular?', a: `Keep the index in state and bind the track's transform to translateX(-index*100%). Render DATA with .map/v-for/*ngFor. Run autoplay in an effect that sets an interval and clears it on cleanup (useEffect return, onUnmounted, ngOnDestroy) — this is essential to avoid leaked timers. Pause handlers map to onMouseEnter/onMouseLeave (and onFocus/onBlur) that clear and restart the interval; arrows and dots call your goTo(i) setter.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the modulo wrap-around math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why goTo computes the index as (i plus DATA.length) modulo DATA.length instead of a simple bounds check, and why every navigation path — arrows, dots, and autoplay — funnels through that single function rather than each setting the transform independently. The same assistant can help optimize it — for instance whether pausing on mouseenter/focusin but not on touch interactions leaves a gap on mobile, or whether rebuilding all slides' innerHTML up front instead of lazily is wasteful for a very large testimonial set. It's also useful for extending the carousel: ask it to show two testimonials per view on wide screens, add swipe gesture support for touch devices, or sync the dots with a progress-bar countdown showing time until the next auto-advance. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an autoplaying "testimonial carousel" in plain HTML, CSS, and JavaScript using a single transform-driven track — no slider library, no framework.

Requirements:
- A viewport with overflow hidden containing a flex track, where every slide has flex: 0 0 100% so slides sit side by side each exactly the viewport's width.
- A single goTo(index) function that normalizes any given index with modulo arithmetic so it wraps correctly in both directions (going past the last slide returns to the first, going before the first wraps to the last), sets the track's transform to translateX of negative index times 100%, and updates which dot indicator is marked active — every other piece of navigation logic (arrows, dots, autoplay) must call this one function rather than duplicating the transform/active-dot logic.
- Build slides and dot indicators dynamically from a single data array of testimonial objects (quote text, name, role, star rating, accent color), deriving each avatar's initials automatically from the name and rendering exactly as many filled stars as the rating value out of five.
- An autoplay timer that advances to the next slide automatically on a fixed interval, where every manual navigation (arrow click or dot click) clears and restarts that timer so the newly selected slide gets the full interval before it advances again.
- Autoplay must pause while the pointer hovers over the carousel or while any element inside it has keyboard focus, and resume when the pointer leaves or focus moves away.
- The active dot indicator must visually grow from a small circle into a wider pill shape via a CSS transition, distinct from the inactive dots.
- Include appropriate ARIA roles and labels (carousel role description, tab roles on the dots, labeled prev/next buttons) so the carousel is understandable via screen reader and keyboard.`,
    },
  },
};

export default testimonialCarousel;
