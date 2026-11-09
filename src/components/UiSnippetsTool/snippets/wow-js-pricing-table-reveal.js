const wowJsPricingTableReveal = {
  id: 'wow-js-pricing-table-reveal',
  title: 'WOW.js Pricing Table Reveal',
  lastmod: '2026-11-09',
  category: 'pricing',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
  ],
  html: `<div class="wpr-stage">
  <div class="wpr-head wow animate__fadeInDown">
    <span class="wpr-tag">WOW.js · one entrance per element</span>
    <h2>Pick your plan</h2>
    <p>The heading drops in, the switch zooms, the side plans fade up and the featured plan flips. Four animate.css classes, one WOW.js call.</p>
  </div>

  <div class="wpr-billing wow animate__zoomIn" data-wow-delay="0.1s" role="radiogroup" aria-label="Billing period">
    <button type="button" class="wpr-bill is-on" role="radio" aria-checked="true" data-period="monthly">Monthly</button>
    <button type="button" class="wpr-bill" role="radio" aria-checked="false" tabindex="-1" data-period="yearly">Yearly <span class="wpr-save">-20%</span></button>
  </div>

  <div class="wpr-grid">
    <div class="wpr-card wow animate__fadeInUp" data-wow-delay="0.2s" data-plan="Starter" data-monthly="9" data-yearly="7">
      <div class="wpr-plan">Starter</div>
      <div class="wpr-price"><span class="wpr-cur">$</span><span class="wpr-num">9</span><span class="wpr-per">/mo</span></div>
      <div class="wpr-note">Billed monthly</div>
      <ul class="wpr-list">
        <li>1 project</li>
        <li>5GB storage</li>
        <li>Community support</li>
      </ul>
      <button type="button" class="wpr-btn" aria-pressed="false">Choose Starter</button>
    </div>

    <div class="wpr-card wpr-featured wow animate__flipInY" data-wow-delay="0.35s" data-plan="Growth" data-monthly="29" data-yearly="23">
      <div class="wpr-badge">Most popular</div>
      <div class="wpr-plan">Growth</div>
      <div class="wpr-price"><span class="wpr-cur">$</span><span class="wpr-num">29</span><span class="wpr-per">/mo</span></div>
      <div class="wpr-note">Billed monthly</div>
      <ul class="wpr-list">
        <li>Unlimited projects</li>
        <li>100GB storage</li>
        <li>Priority support</li>
        <li>Team seats</li>
      </ul>
      <button type="button" class="wpr-btn wpr-btn-primary" aria-pressed="false">Choose Growth</button>
    </div>

    <div class="wpr-card wow animate__fadeInUp" data-wow-delay="0.5s" data-plan="Scale" data-monthly="79" data-yearly="63">
      <div class="wpr-plan">Scale</div>
      <div class="wpr-price"><span class="wpr-cur">$</span><span class="wpr-num">79</span><span class="wpr-per">/mo</span></div>
      <div class="wpr-note">Billed monthly</div>
      <ul class="wpr-list">
        <li>Unlimited everything</li>
        <li>1TB storage</li>
        <li>Dedicated support</li>
      </ul>
      <button type="button" class="wpr-btn" aria-pressed="false">Choose Scale</button>
    </div>
  </div>

  <div class="wpr-foot">
    <p class="wpr-summary" role="status" aria-live="polite">Pick a plan to see your total.</p>
    <button type="button" class="wpr-replay">↻ Replay the entrance</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
@property --wpr-a{syntax:'<angle>';inherits:false;initial-value:0deg}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 100% at 50% 0%,#161d38,#080a14);color:#fff;min-height:100vh;padding:48px 24px 320px}
.wpr-stage{max-width:940px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:28px}
.wpr-head{text-align:center;max-width:560px}
.wpr-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#34d399;background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.wpr-head h2{font-size:clamp(26px,4.6vw,38px);font-weight:800;letter-spacing:-.02em}
.wpr-head p{font-size:14px;color:#8e97b8;margin-top:10px;line-height:1.55}

.wpr-billing{display:inline-flex;gap:4px;padding:4px;border-radius:99px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1)}
.wpr-bill{appearance:none;border:0;background:transparent;color:#a3aacb;font:700 13px system-ui;padding:8px 18px;border-radius:99px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .2s,color .2s}
.wpr-bill:hover{color:#fff}
.wpr-bill.is-on{background:#34d399;color:#062017}
.wpr-bill:focus-visible{outline:2px solid #fff;outline-offset:2px}
.wpr-save{font-size:10.5px;font-weight:800;padding:2px 7px;border-radius:99px;background:rgba(6,32,23,.16)}
.wpr-bill:not(.is-on) .wpr-save{background:rgba(52,211,153,.18);color:#34d399}

.wpr-grid{width:100%;display:grid;grid-template-columns:repeat(3,1fr);gap:18px;align-items:start}
.wpr-card{position:relative;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:18px;padding:28px 24px;box-shadow:0 24px 50px -30px rgba(0,0,0,.8);backface-visibility:hidden;transition:border-color .25s,box-shadow .25s,translate .25s}
.wpr-card::before{content:'';position:absolute;inset:0;border-radius:inherit;background:radial-gradient(240px circle at var(--mx,50%) var(--my,0%),rgba(52,211,153,.16),transparent 65%);opacity:0;transition:opacity .25s;pointer-events:none}
.wpr-card:hover::before{opacity:1}
.wpr-card:hover{translate:0 -4px}
.wpr-card>*{position:relative;z-index:1}
.wpr-featured{background:linear-gradient(165deg,rgba(52,211,153,.14),rgba(255,255,255,.04));border-color:rgba(52,211,153,.25);scale:1.04}
.wpr-featured::after{content:'';position:absolute;inset:-1px;border-radius:19px;padding:1px;background:conic-gradient(from var(--wpr-a),#34d399,#38bdf8,#a78bfa,#34d399);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:wpr-spin 6s linear infinite;pointer-events:none}
@keyframes wpr-spin{to{--wpr-a:360deg}}
.wpr-card.is-selected{border-color:#34d399;box-shadow:0 0 0 1px #34d399,0 28px 60px -28px rgba(52,211,153,.6)}
.wpr-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#34d399;color:#062017;font-size:10.5px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;padding:5px 14px;border-radius:99px;z-index:2}
.wpr-plan{font-size:13px;font-weight:700;color:#a3aacb;text-transform:uppercase;letter-spacing:.06em}
.wpr-price{display:flex;align-items:baseline;margin:10px 0 2px;font-size:40px;font-weight:800;font-variant-numeric:tabular-nums}
.wpr-cur{font-size:22px;color:#a3aacb;margin-right:2px}
.wpr-per{font-size:14px;font-weight:600;color:#8e97b8;margin-left:4px}
.wpr-note{font-size:12px;color:#8e97b8;margin-bottom:18px;min-height:16px}
.wpr-list{list-style:none;display:flex;flex-direction:column;gap:9px;margin-bottom:22px}
.wpr-list li{font-size:13px;color:#c3cbe8;padding-left:20px;position:relative}
.wpr-list li::before{content:'✓';position:absolute;left:0;color:#34d399;font-weight:800}
.wpr-btn{width:100%;padding:11px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#fff;font:700 13px system-ui;cursor:pointer;transition:background .18s}
.wpr-btn:hover{background:rgba(255,255,255,.12)}
.wpr-btn:focus-visible{outline:2px solid #fff;outline-offset:2px}
.wpr-btn-primary{background:#34d399;color:#062017;border-color:#34d399}
.wpr-btn-primary:hover{background:#2bc28b}
.wpr-btn[aria-pressed="true"]{background:#34d399;color:#062017;border-color:#34d399}

.wpr-foot{display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;font-size:13px}
.wpr-summary{min-height:20px;color:#c3cbe8}
.wpr-replay{appearance:none;background:transparent;border:1px solid rgba(255,255,255,.16);color:#a3aacb;font:700 12px system-ui;padding:7px 14px;border-radius:99px;cursor:pointer;transition:color .18s,border-color .18s}
.wpr-replay:hover{color:#fff;border-color:rgba(255,255,255,.4)}
.wpr-replay:focus-visible{outline:2px solid #fff;outline-offset:2px}

@media(max-width:760px){.wpr-grid{grid-template-columns:1fr}.wpr-featured{scale:1}}
@media(prefers-reduced-motion:reduce){.wpr-featured::after{animation:none}.wpr-card,.wpr-bill,.wpr-btn{transition:none}.wpr-card:hover{translate:none}}`,

  js: `// ONE WOW.js instance reveals every .wow element. animate.css 4 prefixes its classes, so WOW.js
// is told which class to add on reveal (animateClass) and the markup carries ONLY the entrance
// name: wow animate__fadeInUp. WOW.js hides the element until it scrolls into view, adds
// animate__animated, and the element's own animate__ class decides what plays: fadeInDown on
// the heading, zoomIn on the switch, fadeInUp on the side plans, flipInY on the featured plan.
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var period = 'monthly';
var selected = null;
var wow = null;

var cards = [].slice.call(document.querySelectorAll('.wpr-card'));
var bills = [].slice.call(document.querySelectorAll('.wpr-bill'));
var animated = [].slice.call(document.querySelectorAll('.wow'));
var summary = document.querySelector('.wpr-summary');
var grid = document.querySelector('.wpr-grid');

function startWow() {
  // Reduced motion, or the CDN did not load: show everything at rest, no entrance
  if (reduce || !window.WOW) {
    animated.forEach(function (el) { el.classList.remove('wow'); });
    return;
  }
  wow = new WOW({ offset: 40, live: true, animateClass: 'animate__animated' });
  wow.init();
}
startWow();

// Replay: stop the old watcher, put every element back to its hidden starting state, start again
document.querySelector('.wpr-replay').addEventListener('click', function () {
  if (reduce || !window.WOW) return;
  if (wow) wow.stop();
  animated.forEach(function (el) {
    el.classList.remove('animate__animated');
    el.style.cssText = '';
    el.classList.add('wow');
  });
  startWow();
});

// Prices count to the new number instead of jumping
function tween(el, to) {
  var from = parseFloat(el.textContent) || 0;
  cancelAnimationFrame(el._raf);
  if (reduce || from === to) { el.textContent = to; return; }
  var t0 = null;
  function frame(t) {
    if (!t0) t0 = t;
    var p = Math.min(1, (t - t0) / 450);
    el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
    if (p < 1) el._raf = requestAnimationFrame(frame);
  }
  el._raf = requestAnimationFrame(frame);
}

function render() {
  cards.forEach(function (card) {
    var price = +card.getAttribute('data-' + period);
    tween(card.querySelector('.wpr-num'), price);
    card.querySelector('.wpr-note').textContent =
      period === 'yearly' ? 'Billed $' + price * 12 + ' a year' : 'Billed monthly';
  });
  if (!selected) { summary.textContent = 'Pick a plan to see your total.'; return; }
  var p = +selected.getAttribute('data-' + period);
  summary.textContent = selected.getAttribute('data-plan') + ' selected: ' +
    (period === 'yearly' ? '$' + p * 12 + ' a year ($' + p + '/mo)' : '$' + p + ' a month');
}

// Monthly / Yearly switch (a radio group: arrow keys move between the two)
bills.forEach(function (b) {
  b.addEventListener('click', function () {
    period = b.getAttribute('data-period');
    bills.forEach(function (o) {
      var on = o === b;
      o.classList.toggle('is-on', on);
      o.setAttribute('aria-checked', on);
      o.tabIndex = on ? 0 : -1;
    });
    render();
  });
  b.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    var other = bills[bills.indexOf(b) ? 0 : 1];
    other.focus();
    other.click();
    e.preventDefault();
  });
});

// Choosing a plan is plain JS: WOW.js is finished once the entrance has played
cards.forEach(function (card) {
  card.querySelector('.wpr-btn').addEventListener('click', function () {
    selected = card;
    cards.forEach(function (c) {
      var on = c === card;
      var btn = c.querySelector('.wpr-btn');
      c.classList.toggle('is-selected', on);
      btn.setAttribute('aria-pressed', on);
      btn.textContent = on ? 'Selected ✓' : 'Choose ' + c.getAttribute('data-plan');
    });
    render();
  });
});

// A soft green spotlight follows the pointer across whichever card it is over
grid.addEventListener('pointermove', function (e) {
  var card = e.target.closest('.wpr-card');
  if (!card) return;
  var r = card.getBoundingClientRect();
  card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  card.style.setProperty('--my', (e.clientY - r.top) + 'px');
});`,

  seo: {
    title: 'WOW.js Pricing Table: Yearly Toggle & Flip-In Reveal',
    description: 'A 3-tier pricing table with a monthly/yearly switch, counting prices and a featured plan that flips in while the side plans fade up, all from one WOW.js call.',
    about: {
      title: 'WOW.js Pricing Table Reveal — Yearly Toggle, Counting Prices and One Entrance per Element',
      description: `Most WOW.js demos give every element the same entrance. This pricing table gives each block its own: the heading drops in with \`animate__fadeInDown\`, the billing switch zooms in, the Starter and Scale plans fade up, and the featured Growth plan flips in on its vertical axis. All four are driven by one \`new WOW({ offset: 40, live: true, animateClass: 'animate__animated' }).init()\` call, and the table is fully usable once the animation has played: a Monthly / Yearly switch, prices that count to their new value, plan selection and a live summary line.

## One WOW.js call, four different entrances

WOW.js only watches the \`.wow\` class. It hides an element until it scrolls into view, then lets it play, and it never looks at which animate.css class is on it. Whatever \`animate__\` name sits in the markup is the entrance that runs, so varying the animation per element costs nothing in the JavaScript. The delays (\`data-wow-delay\`) stagger the order: heading, switch, Starter, Growth, Scale. The idea is the same one explained in the [scroll reveal cards](/ui-snippets/wow-js-scroll-reveal-cards/) snippet, applied to a layout where hierarchy matters.

## The animateClass setting animate.css 4 needs

WOW.js was written for animate.css 3, where the class that starts an animation is \`animated\`. Version 4 renamed it to \`animate__animated\`. This snippet passes \`animateClass: 'animate__animated'\` and leaves that class out of the markup, so the cards carry only \`wow animate__fadeInUp\`. Without the setting, a v4 element that already has \`animate__animated\` in its HTML begins playing at page load, before WOW.js reveals it, and the entrance is half over by the time you scroll to it.

## Why the featured plan keeps its size

The Growth card is slightly larger than its neighbours. A \`transform: scale(1.04)\` would be replaced by the \`transform\` inside the flipInY keyframes and would stay replaced afterwards, because animate.css holds the last frame. The snippet uses the standalone \`scale\` property instead, which composes with \`transform\` and survives the animation. The card also sets \`backface-visibility: hidden\` so its back face never flashes at 90°, and animate.css 4 already puts \`perspective(400px)\` inside the flipInY keyframes, so no extra perspective rule is needed.

## Monthly and yearly with counting prices

Each card stores both prices in \`data-monthly\` and \`data-yearly\`. The switch is a two-button radio group (arrow keys move between the buttons) and the yearly option takes 20% off: $9, $29 and $79 become $7, $23 and $63 per month, with the yearly total shown under the price. Prices tween with \`requestAnimationFrame\` over 450ms with an ease-out curve and a cancel token, so flipping the switch quickly never leaves a number half-counted. If you would rather use a library for the counting, the [CountUp.js pricing toggle](/ui-snippets/countup-js-pricing-toggle-counter/) does exactly that, and the [annual savings badge](/ui-snippets/pricing-annual-savings-badge/) is a good companion for the "-20%" label.

## Selecting a plan and the live summary

Each button is a toggle with \`aria-pressed\`. Choosing a plan outlines its card, relabels the button to "Selected ✓", resets the other two and writes a summary into a \`role="status"\` region, which a screen reader announces. Switching the billing period rewrites the summary too, so it always matches the card.

## Replaying the entrance

WOW.js reveals each element once. The "Replay the entrance" button calls \`wow.stop()\`, strips the inline styles and the \`animate__animated\` class WOW.js left behind, puts \`.wow\` back and starts a fresh instance. It is a quick way to show the whole sequence again, and a pattern for any reveal you want to re-run.

## Reduced motion and missing scripts

With \`prefers-reduced-motion: reduce\` the script skips WOW.js, removes the \`.wow\` class so every element is visible at rest, switches prices instantly and stops the featured card's rotating ring. If the CDN scripts fail to load the same fallback runs, so the table never stays hidden.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add both CDN files', text: 'wow.min.js and animate.min.css (v4) power every entrance from one shared instance.' },
      { title: 'Give each element its own entrance', text: 'Write class="wow animate__fadeInUp" or animate__flipInY. Only the animate__ name changes between elements.' },
      { title: 'Tell WOW.js the v4 class name', text: 'Pass animateClass: \'animate__animated\' so WOW.js adds it on reveal instead of at page load.' },
      { title: 'Stagger with data-wow-delay', text: 'Set 0.2s, 0.35s and 0.5s on the cards to reveal them left to right, with the featured plan in the middle.' },
      { title: 'Store both prices on each card', text: 'data-monthly and data-yearly feed the switch; change the numbers or the discount to match your plans.' },
      { title: 'Use scale, not transform, for resting size', text: 'The standalone scale property keeps the featured card larger after the flip finishes.' },
      { title: 'Add the Replay button if you want it', text: 'It calls wow.stop(), clears the reveal state and starts a fresh instance.' },
    ] },
    features: [
      { title: 'One entrance per element', text: 'Heading, switch, side plans and featured plan each use a different animate.css class from one WOW.js instance.' },
      { title: 'Monthly / Yearly switch', text: 'An accessible two-button radio group with arrow-key support and a -20% yearly option.' },
      { title: 'Counting prices', text: 'Prices tween to their new value with an ease-out curve and a cancel token, so quick toggling stays clean.' },
      { title: 'Featured plan ring', text: 'The Growth card is scaled up at rest and wrapped in a slowly rotating conic-gradient border.' },
      { title: 'Pointer spotlight', text: 'A green radial highlight follows the cursor across whichever card is hovered.' },
      { title: 'Plan selection with a live summary', text: 'aria-pressed buttons and a status line that updates with the plan and the billing period.' },
      { title: 'Replay the entrance', text: 'One button restarts the whole reveal sequence without reloading the preview.' },
      { title: 'Reduced-motion and no-CDN fallback', text: 'Everything shows at rest and prices switch instantly when motion is off or the scripts fail to load.' },
    ],
    useCases: [
      { title: 'SaaS pricing pages', text: 'Show three plans with a monthly/yearly switch and let the recommended tier flip in first, so the eye lands on the plan you want people to pick.' },
      { title: 'Course and membership tiers', text: 'Reveal tiers as the visitor scrolls, with yearly pricing that shows the annual total under each monthly figure before they commit.' },
      { title: 'Agency retainer packages', text: 'Present Starter, Growth and Scale retainers with counting prices, so a visitor comparing options sees the difference between billing periods immediately.' },
      { title: 'Plan upgrade screens', text: 'Reuse the selected state and live summary inside an in-app upgrade dialog, where the chosen plan and its total must stay visible.' },
      { title: 'Learning how WOW.js and animate.css 4 fit together', text: 'Study a working example of animateClass, per-element delays, a replayable reveal and a reduced-motion fallback in about a hundred lines of JavaScript.' },
    ],
    faqs: [
      { q: 'Do all elements need the same animate.css class?', a: 'No. WOW.js only tracks the .wow class and never inspects which animate__ class is also present, so each element plays its own entrance. Here the heading, the switch, the side plans and the featured plan each use a different one.' },
      { q: 'Why is animateClass set to animate__animated?', a: 'WOW.js adds a class named animated by default, which is the animate.css 3 name. Version 4 uses animate__animated, so passing animateClass makes WOW.js add the right one on reveal. The markup then needs only the animate__ entrance name.' },
      { q: 'Why use the scale property instead of transform: scale()?', a: 'animate.css keyframes set transform and hold their last frame, which would replace a transform: scale on the featured card. The standalone scale property is applied separately, so the card stays 4% larger before, during and after the flip.' },
      { q: 'How does the Replay button work?', a: 'It calls wow.stop(), removes the animate__animated class and inline styles WOW.js left behind, adds .wow back to every element and creates a fresh WOW instance. The elements hide and then reveal again in the same staggered order.' },
      { q: 'How do I change the prices or the yearly discount?', a: 'Edit data-monthly and data-yearly on each .wpr-card. The script reads them when the switch changes and works out the yearly total as twelve times the monthly figure, so no other code needs to change.' },
      { q: 'What happens with reduced motion or if the CDN is blocked?', a: 'The script skips WOW.js and removes the .wow class, so every element is visible straight away, prices switch without counting and the card ring stops rotating. The same fallback runs if the WOW.js file fails to load.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is a good prompt for asking an AI to explain how two animation libraries divide the work: paste it into an assistant like Claude and ask why WOW.js needs animateClass: 'animate__animated' with animate.css 4, what the cards would do at page load without it, and why the featured card uses the scale property instead of transform: scale(). Then ask how the Replay button resets the reveal (wow.stop(), clearing inline styles, re-adding .wow). To extend it: ask for a fourth Enterprise tier with a "Contact sales" button, a currency selector that reuses the counting tween, a version where the yearly discount is read from one data attribute, or a comparison table row set that reveals line by line using the same per-element approach.`,
      prompt: `Build an animated 3-tier pricing table with WOW.js (v1.1.2, from a CDN) and animate.css (v4.1.1, from a CDN) in plain HTML, CSS and JavaScript.

Requirements:
- A centred heading block, a Monthly / Yearly switch, and three cards (Starter $9, Growth $29, Scale $79 per month; yearly is 20% off: $7, $23, $63). Growth is the featured card: a "Most popular" badge, a tinted background, a slightly larger size at rest using the standalone CSS scale property (not transform: scale), and a slowly rotating conic-gradient border built with an @property angle and a mask.
- Every animated element carries class="wow animate__<name>" with its own entrance and no animate__animated in the markup: heading animate__fadeInDown, switch animate__zoomIn, side cards animate__fadeInUp, featured card animate__flipInY. Stagger them with data-wow-delay (0.1s, 0.2s, 0.35s, 0.5s).
- One WOW instance: new WOW({ offset: 40, live: true, animateClass: 'animate__animated' }).init(). Give the cards backface-visibility: hidden. Do not add a perspective rule: animate.css 4 flipInY already includes perspective(400px).
- The switch is a role="radiogroup" with two role="radio" buttons and arrow-key support. Each card stores data-monthly and data-yearly. Changing the period makes each price count to its new value with requestAnimationFrame (450ms, ease-out, cancel the previous frame), and each card's note changes between "Billed monthly" and "Billed $X a year".
- The "Choose" buttons are toggles with aria-pressed. Choosing a plan outlines its card, relabels the button "Selected ✓", resets the others, and writes "Plan selected: total" into a role="status" aria-live="polite" line that also updates when the billing period changes.
- A green radial spotlight follows the pointer inside each card (set --mx and --my on pointermove). Hovering lifts a card using the translate property.
- A "Replay the entrance" button calls wow.stop(), removes animate__animated, clears inline styles, re-adds the wow class to every animated element and starts a new WOW instance.
- Respect prefers-reduced-motion: skip WOW.js and remove the wow class so everything is visible, switch prices instantly and stop the rotating ring. Use the same fallback if window.WOW is undefined.
- Style it as a dark, premium pricing section with green accents. The grid collapses to one column under 760px, where the featured card returns to normal size.`,
    },
  },
};

export default wowJsPricingTableReveal;
