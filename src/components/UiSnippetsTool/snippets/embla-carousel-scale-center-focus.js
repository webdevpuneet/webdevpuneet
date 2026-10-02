const emblaCarouselScaleCenterFocus = {
  id: 'embla-carousel-scale-center-focus',
  title: 'Embla Carousel Scale-on-Focus (Center Slide Emphasis)',
  lastmod: '2026-09-25',
  category: 'carousels',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/embla-carousel@8.6.0/embla-carousel.umd.js',
  ],
  html: `<div class="esc">
  <h2 class="esc-title">Pick your plan</h2>
  <div class="esc-viewport" id="escViewport">
    <div class="esc-container" id="escContainer"></div>
  </div>
  <p class="esc-hint" id="escHint" aria-live="polite"></p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:linear-gradient(180deg,#eef2ff,#fdf2f8);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.esc{width:100%;max-width:900px;text-align:center}
.esc-title{font-size:22px;color:#1e1b4b;margin-bottom:14px}
.esc-viewport{overflow:hidden;padding:18px 0}
.esc-container{display:flex;touch-action:pan-y pinch-zoom;margin-left:-12px}
.esc-slide{flex:0 0 46%;min-width:0;padding-left:12px}
@media (min-width:700px){.esc-slide{flex-basis:34%}}
.esc-card{background:#fff;border-radius:20px;padding:26px 22px;box-shadow:0 12px 30px rgba(49,46,129,.12);transform-origin:center;will-change:transform,opacity;text-align:left;user-select:none}
.esc-name{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6366f1}
.esc-price{font-size:34px;font-weight:800;color:#1e1b4b;margin:8px 0 2px}
.esc-price small{font-size:13px;color:#64748b;font-weight:500}
.esc-card ul{list-style:none;margin:14px 0 18px;display:grid;gap:7px;font-size:13px;color:#334155}
.esc-card li::before{content:'✓';color:#22c55e;font-weight:800;margin-right:8px}
.esc-card button{width:100%;border:0;border-radius:12px;padding:11px;font:700 13px system-ui;background:#1e1b4b;color:#fff;cursor:pointer}
.esc-card button:focus-visible{outline:2px solid #6366f1;outline-offset:2px}
.esc-hint{font-size:13px;color:#475569;min-height:20px}`,

  js: `var PLANS = [
  { name: 'Starter',  price: 0,  per: 'forever', feats: ['1 project', 'Community support', 'Basic analytics'] },
  { name: 'Hobby',    price: 9,  per: 'month',   feats: ['5 projects', 'Custom domain', 'Email support'] },
  { name: 'Pro',      price: 24, per: 'month',   feats: ['Unlimited projects', 'Team roles', 'Priority support'] },
  { name: 'Business', price: 79, per: 'month',   feats: ['SSO & audit log', 'SLA 99.9%', 'Dedicated manager'] },
  { name: 'Scale',    price: 199,per: 'month',   feats: ['Volume pricing', 'Private cloud', '24/7 phone line'] },
];
var container = document.getElementById('escContainer');
PLANS.forEach(function (p, i) {
  container.insertAdjacentHTML('beforeend',
    '<div class="esc-slide"><div class="esc-card">' +
    '<div class="esc-name">' + p.name + '</div>' +
    '<div class="esc-price">$' + p.price + ' <small>/ ' + p.per + '</small></div>' +
    '<ul>' + p.feats.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
    '<button type="button" data-i="' + i + '">Choose ' + p.name + '</button></div></div>');
});

// startIndex centres the most popular plan first. containScroll:false gives
// the first and last slides their own centred snaps too.
var embla = EmblaCarousel(document.getElementById('escViewport'), {
  loop: false, align: 'center', containScroll: false, startIndex: 2,
});

var TWEEN_FACTOR_BASE = 0.52;
var tweenFactor = 0;
var cards = [];
function clamp(n, a, b) { return Math.min(Math.max(n, a), b); }

function setup() {
  tweenFactor = TWEEN_FACTOR_BASE * embla.scrollSnapList().length;
  cards = embla.slideNodes().map(function (s) { return s.querySelector('.esc-card'); });
}

// Same distance-to-centre maths as a parallax effect, mapped to scale and
// opacity instead of translation: 1 at the centre, shrinking with distance.
function tween(eventName) {
  var engine = embla.internalEngine();
  var progress = embla.scrollProgress();
  var inView = embla.slidesInView();
  embla.scrollSnapList().forEach(function (snap, snapIndex) {
    var diff = snap - progress;
    engine.slideRegistry[snapIndex].forEach(function (slideIndex) {
      if (eventName === 'scroll' && inView.indexOf(slideIndex) === -1) return;
      var t = clamp(1 - Math.abs(diff * tweenFactor), 0, 1);
      var scale = 0.82 + 0.18 * t;
      cards[slideIndex].style.transform = 'scale(' + scale.toFixed(3) + ')';
      cards[slideIndex].style.opacity = (0.45 + 0.55 * t).toFixed(3);
    });
  });
}

var hint = document.getElementById('escHint');
function announce() {
  var p = PLANS[embla.selectedScrollSnap()];
  hint.textContent = p.name + ' — $' + p.price + ' / ' + p.per;
}

setup();
tween();
announce();
embla.on('reInit', setup).on('reInit', tween).on('scroll', tween).on('slideFocus', tween).on('select', announce);

// Clicking a card that isn't centred brings it to the centre first; only
// the centred card's button acts. The click that ends a drag never gets
// here: Embla v8 stops it in the capture phase.
container.addEventListener('click', function (e) {
  var btn = e.target.closest('button');
  if (!btn) return;
  var i = Number(btn.dataset.i);
  if (i !== embla.selectedScrollSnap()) { embla.scrollTo(i); return; }
  hint.textContent = 'You chose ' + PLANS[i].name + '.';
});

// Tabbing onto a button scrolls its slide into the centre.
container.addEventListener('focusin', function (e) {
  var btn = e.target.closest('button');
  if (btn) embla.scrollTo(Number(btn.dataset.i));
});`,

  seo: {
    title: 'Embla Carousel Scale-on-Focus (Center Slide Emphasis) — Free Snippet',
    description: `A pricing-plan carousel built with Embla Carousel v8 where the centred card grows and brightens as you drag, using scrollProgress-based tweening, a centred start slide and click-to-centre behaviour. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Embla Carousel Scale Effect — Emphasising the Centred Slide',
      description: `When a carousel shows several items at once, people need to know which one is "current". Scaling the centred slide up and fading its neighbours makes that obvious without any extra UI, and because the effect is tied to scroll position, cards grow and shrink smoothly while you drag rather than switching state at the end.

**Distance to centre, mapped to scale**

On every scroll event the snippet computes each snap's distance from the current position (\`scrollSnapList()[i] - scrollProgress()\`). That distance, multiplied by a tween factor and clamped, becomes \`t\`: 1 at the centre, 0 far away. Scale runs from 0.82 to 1 and opacity from 0.45 to 1. It's the same calculation used for parallax, applied to different properties.

**Every slide gets its own centred position**

By default Embla's \`containScroll\` trims snaps at the ends so the carousel never shows empty space, which means the first and last cards can't be centred. \`containScroll: false\` gives every card a centred snap. \`startIndex: 2\` opens on the middle "Pro" plan.

**Click to centre, then act**

Clicking the button on a side card scrolls it to the centre instead of choosing it immediately. Only the centred card's button performs the action. This prevents accidental choices on half-visible cards. Embla v8 already stops the click that ends a drag, so dragging across a button never triggers it.

**Keyboard and screen readers**

Tabbing to a card's button centres its slide, and the selected plan is announced in a polite live region.

**Scale without layout shifts**

Only \`transform\` and \`opacity\` change, so neighbouring cards never reflow while you drag.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load Embla', text: `Include embla-carousel.umd.js from the CDN.` },
      { title: 'Paste the snippet', text: `Five plan cards render with Pro centred and enlarged.` },
      { title: 'Drag', text: `Cards scale and fade continuously based on their distance from the centre.` },
      { title: 'Click a side card', text: `It moves to the centre; click again to choose it.` },
      { title: 'Adjust the look', text: `Change the 0.82 and 0.45 minimums or TWEEN_FACTOR_BASE.` },
    ] },
    features: [
      { title: 'Continuous scale tween', text: `Scale and opacity follow scroll position.` },
      { title: 'Centred snaps for every slide', text: `containScroll: false.` },
      { title: 'Opens on a chosen slide', text: `startIndex centres the popular plan.` },
      { title: 'Click-to-centre', text: `Side cards come to the centre before acting.` },
      { title: 'Drag-safe buttons', text: `Embla v8 blocks clicks that end a drag.` },
      { title: 'Focus follows keyboard', text: `Tabbing centres the focused card.` },
      { title: 'Announced selection', text: `A polite live region names the centred plan.` },
      { title: 'No layout shift', text: `Only transform and opacity animate.` },
    ],
    useCases: [
      { title: 'Pricing plans on mobile', text: 'Show Free, Pro and Team as swipeable cards where the centred plan grows and brightens. `startIndex` opens on the popular plan, so the plan you most want to sell is seen first.' },
      { title: 'Product, size and model pickers', text: 'Let shoppers swipe through variants such as models or sizes. The enlarged centre card makes the current choice obvious, and clicking a side card brings it to the centre before anything happens.' },
      { title: 'Media shelves with a focused item', text: 'Browse albums, films or books where one title is always in focus. Neighbours fade by distance from the centre, which makes the selection readable without a separate highlight element.' },
      { title: 'Onboarding role and goal selection', text: 'Ask new users to pick a role or goal from large cards. Because every slide can sit centred (`containScroll: false`), even the first and last options can reach the middle.' },
      { title: 'Character and level select screens', text: 'Build a game menu where the focused option scales up as you drag. Start the game from the click handler only once a card is already centred.' },
      { icon: 'CODE', title: 'Related: Embla Parallax Slides', desc: 'The same tween as parallax: [Embla Carousel Parallax Slides](/ui-snippets/embla-carousel-parallax-slides/).' },
      { icon: 'CODE', title: 'Related: Pricing Card', desc: 'A static pricing layout: [Pricing Card](/ui-snippets/pricing-card/).' },
    ],
    faqs: [
      { q: 'How do I scale the centre slide in Embla Carousel?', a: `On each scroll event, compute each snap's distance from scrollProgress(), convert it into a 0-1 value that is 1 at the centre, and apply it as a CSS scale on the slide's inner element. Apply it to an inner element, not the slide itself, so Embla's measurements stay correct.` },
      { q: `Why can't my first slide be centred?`, a: `The default containScroll setting trims snaps at the start and end so no empty space is shown. Set containScroll to false to give every slide its own centred snap.` },
      { q: 'How do I start on a specific slide?', a: `Pass startIndex in the options, for example startIndex: 2 to begin on the third slide.` },
      { q: 'Why scale an inner card instead of the slide?', a: `Embla measures slide sizes and positions. Transforming the slide element would interfere with those measurements; transforming a child keeps the layout stable.` },
      { q: 'Does dragging trigger the buttons?', a: `No. Embla v8 adds a capture-phase click listener to its container and stops the click that ends a drag, so buttons only respond to real clicks.` },
    ],
    aiPrompt: {
      paragraph: `Give this snippet to an AI assistant like Claude and ask it to explain how distance to centre becomes scale and opacity, and why containScroll must be false. Ask it to add a 3D rotateY for side cards, a monthly/annual toggle that updates prices, or a highlighted "Most popular" badge on the default card. It can also check the keyboard flow for a pricing page.`,
      prompt: `Build a pricing-plan carousel with Embla Carousel v8 (loaded from a CDN as UMD) in plain HTML, CSS and JavaScript.

Requirements:
- Render five plan cards (name, price, three features, choose button), about 46% wide on phones and 34% on wider screens.
- Center-align slides, disable scroll containment so every card can be centred, and start on the third plan.
- On scroll, compute each snap's distance from the current scroll progress and set each inner card's scale (0.82 to 1) and opacity (0.45 to 1) so the centred card is emphasised, updating only slides in view.
- Clicking the button on a side card scrolls it to the centre; clicking the centred card's button confirms the choice.
- Tabbing to a card's button centres it, and the centred plan is announced in a polite live region.
- Only animate transform and opacity.`,
    },
  },
};

export default emblaCarouselScaleCenterFocus;
