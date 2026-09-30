const motionFlipExpand = {
  id: 'motion-flip-expand',
  title: 'Motion One Spring Card Expand',
  lastmod: '2026-08-02',
  category: 'cards',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/motion@10.18.0/dist/motion.min.js'],
  html: `<div class="mfe-page">
  <div class="mfe-head">
    <span class="mfe-tag">motion one · spring</span>
    <h2>Field Notes</h2>
    <p>Click a card — it grows into the full story on a spring, then springs back.</p>
  </div>

  <div class="mfe-grid" id="mfeGrid">
    <article class="mfe-card" tabindex="0">
      <div class="mfe-thumb t1"></div>
      <div class="mfe-body">
        <span class="mfe-kicker">Iceland</span>
        <h3>Chasing the blue hour</h3>
        <p class="mfe-more">Nine days along the south coast waiting for the twenty minutes each evening when the light goes the color of a gas flame. Most of it was spent in the car with the heater on, watching cloud cover refuse to break.</p>
      </div>
    </article>

    <article class="mfe-card" tabindex="0">
      <div class="mfe-thumb t2"></div>
      <div class="mfe-body">
        <span class="mfe-kicker">Kyoto</span>
        <h3>Sixty-four shades of moss</h3>
        <p class="mfe-more">The temple gardens are maintained with tweezers. A gardener explained that the moss is weeded strand by strand, and that the work is never finished because it is not supposed to be.</p>
      </div>
    </article>

    <article class="mfe-card" tabindex="0">
      <div class="mfe-thumb t3"></div>
      <div class="mfe-body">
        <span class="mfe-kicker">Atacama</span>
        <h3>The driest place with a sky</h3>
        <p class="mfe-more">No humidity, no light pollution, and 2,400 metres of altitude. The Milky Way casts a shadow here, which sounds like an exaggeration until you hold your hand over a sheet of paper and see it.</p>
      </div>
    </article>

    <article class="mfe-card" tabindex="0">
      <div class="mfe-thumb t4"></div>
      <div class="mfe-body">
        <span class="mfe-kicker">Lofoten</span>
        <h3>Fishing villages in February</h3>
        <p class="mfe-more">Four hours of usable daylight and a wind that comes off the water sideways. Every red cabin you have seen in a photograph is a rorbu, and most of them are still working buildings rather than rentals.</p>
      </div>
    </article>
  </div>

  <div class="mfe-backdrop" id="mfeBackdrop"></div>
  <button class="mfe-close" id="mfeClose" aria-label="Close">&times;</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e1a;color:#eef1fa;min-height:100vh;padding:40px 24px}
.mfe-page{max-width:900px;margin:0 auto}
.mfe-head{text-align:center;margin-bottom:26px}
.mfe-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#a78bfa;background:rgba(167,139,250,.13);border:1px solid rgba(167,139,250,.32);padding:5px 11px;border-radius:99px;margin-bottom:12px}
.mfe-head h2{font-size:clamp(26px,5vw,38px);font-weight:800;letter-spacing:-.02em}
.mfe-head p{font-size:14px;color:#8b93b4;margin-top:8px}

.mfe-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px}
.mfe-card{background:#141930;border:1px solid rgba(255,255,255,.08);border-radius:18px;overflow:hidden;cursor:pointer;box-shadow:0 18px 40px -24px rgba(0,0,0,.9);outline:none}
.mfe-card:focus-visible{border-color:#a78bfa}
.mfe-card.is-open{cursor:default;z-index:60;box-shadow:0 40px 90px -30px rgba(0,0,0,1)}
.mfe-thumb{height:120px;flex-shrink:0}
.mfe-card.is-open .mfe-thumb{height:200px}
.t1{background:linear-gradient(150deg,#1e3a8a,#0ea5e9,#a5f3fc)}
.t2{background:linear-gradient(150deg,#14532d,#65a30d,#fde68a)}
.t3{background:linear-gradient(150deg,#4c1d95,#7c3aed,#f0abfc)}
.t4{background:linear-gradient(150deg,#7c2d12,#ea580c,#fed7aa)}
.mfe-body{padding:16px 18px 20px}
.mfe-kicker{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8b93b4}
.mfe-body h3{font-size:16px;font-weight:700;margin-top:6px;letter-spacing:-.01em}
.mfe-card.is-open .mfe-body{padding:24px 30px 30px}
.mfe-card.is-open .mfe-body h3{font-size:26px;margin-top:8px}
.mfe-more{font-size:14.5px;line-height:1.75;color:#a6aecb;margin-top:14px;display:none}
.mfe-card.is-open .mfe-more{display:block}

.mfe-backdrop{position:fixed;inset:0;background:rgba(6,8,18,.78);backdrop-filter:blur(6px);opacity:0;pointer-events:none;z-index:50}
.mfe-backdrop.on{pointer-events:auto}
.mfe-close{position:fixed;top:18px;right:18px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.18);background:rgba(20,25,48,.9);color:#eef1fa;font-size:22px;line-height:1;cursor:pointer;opacity:0;pointer-events:none;z-index:70}
.mfe-close.on{pointer-events:auto}`,

  js: `var animate = Motion.animate, spring = Motion.spring;

var grid = document.getElementById('mfeGrid');
var backdrop = document.getElementById('mfeBackdrop');
var closeBtn = document.getElementById('mfeClose');

var openCard = null;
var placeholder = null;

var SPRING = { easing: spring({ stiffness: 210, damping: 24, mass: 1 }) };

function targetRect() {
  var w = Math.min(560, window.innerWidth - 40);
  var h = Math.min(520, window.innerHeight - 60);
  return {
    top: (window.innerHeight - h) / 2,
    left: (window.innerWidth - w) / 2,
    width: w,
    height: h
  };
}

function open(card) {
  if (openCard) return;
  openCard = card;

  var first = card.getBoundingClientRect();

  // The grid would collapse the moment the card goes position:fixed,
  // so a same-sized placeholder holds its slot open.
  placeholder = document.createElement('div');
  placeholder.style.width = first.width + 'px';
  placeholder.style.height = first.height + 'px';
  card.parentNode.insertBefore(placeholder, card);

  card.classList.add('is-open');
  card.style.position = 'fixed';
  card.style.margin = '0';
  card.style.top = first.top + 'px';
  card.style.left = first.left + 'px';
  card.style.width = first.width + 'px';
  card.style.height = first.height + 'px';
  card.style.overflowY = 'auto';

  var t = targetRect();
  animate(card, {
    top: [first.top + 'px', t.top + 'px'],
    left: [first.left + 'px', t.left + 'px'],
    width: [first.width + 'px', t.width + 'px'],
    height: [first.height + 'px', t.height + 'px']
  }, SPRING);

  backdrop.classList.add('on');
  closeBtn.classList.add('on');
  animate(backdrop, { opacity: [0, 1] }, { duration: 0.28 });
  animate(closeBtn, { opacity: [0, 1] }, { duration: 0.28, delay: 0.1 });
  animate(card.querySelector('.mfe-more'), { opacity: [0, 1], y: [12, 0] }, { duration: 0.4, delay: 0.14 });
}

function close() {
  if (!openCard) return;
  var card = openCard;
  var back = placeholder.getBoundingClientRect();
  var now = card.getBoundingClientRect();

  animate(backdrop, { opacity: [1, 0] }, { duration: 0.26 });
  animate(closeBtn, { opacity: [1, 0] }, { duration: 0.2 });

  var anim = animate(card, {
    top: [now.top + 'px', back.top + 'px'],
    left: [now.left + 'px', back.left + 'px'],
    width: [now.width + 'px', back.width + 'px'],
    height: [now.height + 'px', back.height + 'px']
  }, SPRING);

  anim.finished.then(function () {
    card.classList.remove('is-open');
    card.removeAttribute('style');
    if (placeholder) { placeholder.remove(); placeholder = null; }
    backdrop.classList.remove('on');
    closeBtn.classList.remove('on');
    openCard = null;
  });
}

grid.addEventListener('click', function (e) {
  var card = e.target.closest('.mfe-card');
  if (card && !openCard) open(card);
});

grid.addEventListener('keydown', function (e) {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  var card = e.target.closest('.mfe-card');
  if (card && !openCard) { e.preventDefault(); open(card); }
});

backdrop.addEventListener('click', close);
closeBtn.addEventListener('click', close);
window.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });`,

  seo: {
    title: 'Motion One Spring Card Expand — FLIP Detail View',
    description: 'A grid card that grows into a full detail panel on real spring physics using Motion One and a FLIP measurement. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Motion One Spring Card Expand — Shared-Element Transition Without a Framework',
      description: `The "card grows into a detail view" transition is the single most recognizable interaction in modern app design — it is how iOS opens an App Store listing and how Framer Motion's \`layoutId\` made its name. It is also the one most people give up on outside React, because doing it properly means measuring live geometry and animating between two layouts that never exist at the same time.

This snippet does it in plain JavaScript with **Motion One**, a ~4kb library that drives the native Web Animations API and — critically for this effect — ships a real \`spring()\` easing function.

## Why a spring, not a cubic-bezier

A card growing to five times its size on \`ease-out\` looks like a video being scrubbed. It arrives at its destination and stops dead. A spring settles:

\`spring({ stiffness: 210, damping: 24, mass: 1 })\`

Those three numbers describe a physical system rather than a curve. \`stiffness\` is how hard the spring pulls toward the target, \`damping\` is how much energy is bled off each oscillation, and \`mass\` is inertia. At damping 24 against stiffness 210 the card overshoots its final size by a hair and settles back — the tiny bit of overshoot is what the eye reads as *weight*. Notably, spring animations have **no duration**: the physics decides when it is finished, which is why the open and close feel consistent even though they cover different distances.

## The placeholder problem

The moment the card becomes \`position: fixed\` so it can escape the grid, its slot in the grid vanishes and every sibling card jumps left to fill the gap. That reflow is jarring, and it also breaks the close animation, because the geometry you want to return to no longer exists.

The fix is four lines:

\`placeholder = document.createElement('div'); placeholder.style.width = first.width + 'px'; ...\`

An empty div of exactly the card's measured size is inserted into the grid before the card is lifted out of flow. The grid never notices the card left. On close, the placeholder's \`getBoundingClientRect()\` is what the animation targets — so the card flies back to wherever its slot ended up, even if the window was resized or the layout reflowed while the detail view was open. That is the detail most implementations miss: they cache the original rect at open time, and a mid-transition resize sends the card back to the wrong place.

## Measuring first, animating second

\`open()\` follows the FLIP discipline. \`first = card.getBoundingClientRect()\` captures the card's real position **before** anything changes. Those values are immediately written back as explicit \`top\`, \`left\`, \`width\`, and \`height\` on the fixed element, so visually nothing moves at the instant the card leaves flow — the user sees no jump. Only then does the animation run from those literal values to the target rect.

\`targetRect()\` computes the destination from the viewport rather than hard-coding it: \`Math.min(560, window.innerWidth - 40)\` keeps the panel comfortable on desktop and inset on a phone, and the centering math is derived from the same numbers.

## What each animation is for

Four properties animate together on the card (\`top\`, \`left\`, \`width\`, \`height\`), and three more run alongside on different elements — the backdrop fades, the close button fades in slightly later at \`delay: 0.1\`, and the hidden body copy rises with \`y: [12, 0]\` at \`delay: 0.14\`. Staggering those by a tenth of a second is what makes the transition feel choreographed rather than simultaneous.

Animating layout properties rather than \`transform\` is a deliberate trade here. \`transform: scale()\` is cheaper, but non-uniform scaling **distorts the text inside the card** — the classic squashed-headline artifact — and correcting it requires counter-scaling every child. For a single element, animating width and height keeps the type crisp at every frame, and one element's layout cost is not what will slow a page down.

## Closing cleanly

\`animate()\` returns an object with a \`finished\` promise, which is what lets the teardown wait for the spring to actually settle:

\`anim.finished.then(function () { card.removeAttribute('style'); ... })\`

Stripping the entire inline \`style\` attribute in one call is cleaner than resetting six properties individually, and it guarantees no stale \`position: fixed\` survives into the next open. The placeholder is removed in the same callback, so the grid closes its gap exactly as the card lands in it.

## Reusing it

The detail copy already lives inside each card and is simply \`display: none\` until \`.is-open\` — so there is no second template to keep in sync and no fetch to wait for. Escape, backdrop click, and the close button all route through the same \`close()\`. Pair it with an [expandable card](/ui-snippets/expandable-card/) for the in-flow variant, or a [modal](/ui-snippets/modal/) when the content has no origin element to grow from.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Motion One CDN', text: 'Include motion from the CDN panel — it exposes a global Motion object.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A four-card grid renders with hidden detail copy inside each card.' },
      { title: 'Click a card', text: 'It lifts out of the grid and springs into a centered detail panel.' },
      { title: 'Close it', text: 'Escape, the backdrop, or the close button all spring the card back to its slot.' },
      { title: 'Tune the spring', text: 'Raise stiffness for a snappier open, lower damping for more overshoot.' },
      { title: 'Add your content', text: 'Put the detail copy in .mfe-more — it reveals as the card expands.' },
    ] },
    features: [
      { title: 'Real spring physics', text: 'Motion One spring() with stiffness, damping, and mass — no duration.' },
      { title: 'FLIP measurement', text: 'getBoundingClientRect captured before the card leaves flow.' },
      { title: 'Placeholder holds the slot', text: 'The grid never reflows, and close targets the live placeholder rect.' },
      { title: 'Resize-safe return', text: 'Close reads the placeholder position at close time, not a cached rect.' },
      { title: 'No text distortion', text: 'Layout properties animate instead of scale, so type stays crisp.' },
      { title: 'Choreographed stagger', text: 'Backdrop, close button, and body copy fade in on offset delays.' },
      { title: 'Promise-based teardown', text: 'anim.finished waits for the spring to settle before resetting styles.' },
      { title: 'Three ways to close', text: 'Escape key, backdrop click, and button all share one close path.' },
    ],
    useCases: [
      { title: 'Editorial and photo grids', text: 'Open a story in place instead of navigating away from the feed.' },
      { title: 'Product detail previews', text: 'A richer alternative to a [product quick view](/ui-snippets/product-quick-view/).' },
      { title: 'Portfolio case studies', text: 'Expand a project tile into its full write-up without a route change.' },
      { title: 'Dashboard widget zoom', text: 'Grow a small metric tile into a full chart panel on click.' },
      { title: 'Team and profile grids', text: 'Expand a card into a bio, next to an [expandable card](/ui-snippets/expandable-card/).' },
      { title: 'Learning FLIP', text: 'A readable reference for measure-then-animate layout transitions.' },
    ],
    faqs: [
      { q: 'Why use a spring easing instead of a cubic-bezier?', a: 'A bezier arrives at the target and stops dead, which reads as a scrub rather than a movement. A spring is defined by stiffness, damping, and mass, so it overshoots slightly and settles — that overshoot is what the eye interprets as weight. Springs also have no fixed duration; the physics decides when the motion ends, so opens and closes over different distances stay consistent.' },
      { q: 'What is the placeholder div for?', a: 'When the card becomes position: fixed it leaves the grid, so its slot would collapse and every sibling would jump. An empty div sized to the card measurement holds that slot. It also gives the close animation a live target — reading the placeholder rect at close time means the card returns correctly even if the window was resized while the panel was open.' },
      { q: 'Why animate width and height instead of transform: scale?', a: 'Non-uniform scaling distorts the card contents, producing stretched headlines that only look right at the start and end frames. Fixing that requires counter-scaling every child. Animating layout properties on a single element keeps the type crisp throughout, and one element reflowing is not what makes a page slow.' },
      { q: 'Why are the card measurements written back as inline styles before animating?', a: 'That is the FLIP discipline. The rect is captured before the card leaves flow, then immediately applied as explicit top, left, width, and height on the fixed element. Visually nothing changes at the moment the card is lifted out, so there is no jump — the animation then runs from those literal starting values to the target.' },
      { q: 'How does the close teardown avoid leaving stale styles behind?', a: 'Motion One returns an object with a finished promise. The teardown runs in .then(), after the spring has actually settled, and calls card.removeAttribute("style") to strip every inline property in one go rather than resetting six of them by hand — so no position: fixed can survive into the next open.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Keep the open card id in state and refs to the card elements. Run the measurement and Motion One calls in an effect that fires after the state change commits, since you need post-layout geometry. Await the finished promise before clearing the open state. In React, a portal is unnecessary because the card is position: fixed, but make sure the effect cleanup cancels any in-flight animation on unmount.' },
    ],
    aiPrompt: {
      paragraph: `The interesting decisions here are all about measurement order, which is exactly the kind of thing worth having explained back to you. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to walk through why open() writes the measured first rect back as inline top/left/width/height before starting the animation, and what the user would see if that step were skipped. Then ask why close() reads placeholder.getBoundingClientRect() fresh instead of reusing the rect captured at open time — resize the window while a card is open to see the bug that avoids. Ask it to explain what stiffness 210 and damping 24 do physically, and have it show what damping 8 versus damping 40 would feel like. For optimization, ask whether animating width and height on one element is genuinely a problem, and at what point you would switch to transform with counter-scaled children. To extend it: add a drag-to-dismiss gesture, animate between two open cards without closing first, use Motion One's inView to stagger the grid on load, or add a View Transitions API fallback. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "card expands into a detail panel" shared-element transition using Motion One (from a CDN, global Motion) in plain HTML, CSS, and JavaScript — no React, no Framer Motion.

Requirements:
- A responsive grid of cards, each already containing its own detail copy in an element that is display:none until the card opens, so there is no second template to keep in sync.
- Clicking a card must follow the FLIP discipline: capture its live geometry with getBoundingClientRect FIRST, then set the card to position:fixed and immediately write those exact measured values back as inline top, left, width and height — so the card does not visually jump at the instant it leaves normal flow — and only then animate to the target rect.
- Before lifting the card out of flow, insert an empty placeholder div sized to the card's measured width and height into the grid, so the grid does not collapse and reflow when the card becomes fixed.
- Animate the card's top, left, width and height (NOT transform: scale) using Motion One's spring easing: spring({ stiffness: 210, damping: 24, mass: 1 }). Explain in a comment or the code why layout properties are used instead of scale — non-uniform scale distorts the text inside the card and would require counter-scaling every child.
- Compute the target rect from the viewport rather than hard-coding it: a width of min(560, innerWidth - 40) and height of min(520, innerHeight - 60), centered.
- Choreograph supporting animations on offset delays rather than simultaneously: a blurred backdrop fades in, a fixed close button fades in around 0.1s later, and the revealed body copy fades and rises (y from 12 to 0) around 0.14s later.
- On close, animate back to the PLACEHOLDER's rect read fresh at close time — not a rect cached when the card opened — so the card returns to the correct position even if the window was resized while the panel was open.
- Use the promise returned by Motion One (anim.finished) to run teardown only after the spring settles: remove the open class, strip all inline styles in one call with removeAttribute('style'), remove the placeholder, and clear the open state.
- Support closing via the Escape key, a backdrop click, and the close button, all routed through a single close function, and make cards keyboard-openable with Enter or Space.`,
    },
  },
};

export default motionFlipExpand;
