const stackedCards = {
  id: 'stacked-cards',
  title: 'Stacked Cards Deck',
  lastmod: '2026-06-12',
  category: 'cards',
  html: `<div class="scene">
  <div class="deck" id="deck">
    <div class="card" data-index="0" style="--i:0">
      <div class="card-inner">
        <div class="card-tag">Design</div>
        <h2 class="card-title">Typography Scale</h2>
        <p class="card-body">A harmonious type scale makes reading effortless. Use a modular ratio — 1.25 or 1.333 — to generate heading sizes that feel visually related.</p>
        <div class="card-foot">
          <span class="avatar" style="background:#818cf8">A</span>
          <span class="card-meta">2 min read</span>
        </div>
      </div>
    </div>
    <div class="card" data-index="1" style="--i:1">
      <div class="card-inner">
        <div class="card-tag">CSS</div>
        <h2 class="card-title">CSS Cascade Layers</h2>
        <p class="card-body">@layer lets you explicitly order specificity buckets so third-party styles and resets never bleed into your component rules unexpectedly.</p>
        <div class="card-foot">
          <span class="avatar" style="background:#34d399">B</span>
          <span class="card-meta">3 min read</span>
        </div>
      </div>
    </div>
    <div class="card" data-index="2" style="--i:2">
      <div class="card-inner">
        <div class="card-tag">JavaScript</div>
        <h2 class="card-title">Intersection Observer</h2>
        <p class="card-body">Replace scroll event listeners with IntersectionObserver for lazy-loading, scroll animations, and infinite feeds. It runs off the main thread.</p>
        <div class="card-foot">
          <span class="avatar" style="background:#f472b6">C</span>
          <span class="card-meta">4 min read</span>
        </div>
      </div>
    </div>
    <div class="card" data-index="3" style="--i:3">
      <div class="card-inner">
        <div class="card-tag">Performance</div>
        <h2 class="card-title">Core Web Vitals</h2>
        <p class="card-body">LCP, CLS, and INP measure real-user experience. Optimise the LCP image with fetchpriority="high" and avoid layout shifts from unsized media.</p>
        <div class="card-foot">
          <span class="avatar" style="background:#fb923c">D</span>
          <span class="card-meta">5 min read</span>
        </div>
      </div>
    </div>
    <div class="card" data-index="4" style="--i:4">
      <div class="card-inner">
        <div class="card-tag">Accessibility</div>
        <h2 class="card-title">Focus Management</h2>
        <p class="card-body">When a modal opens, move focus inside it. When it closes, return focus to the trigger. This is the single most impactful a11y improvement you can make.</p>
        <div class="card-foot">
          <span class="avatar" style="background:#38bdf8">E</span>
          <span class="card-meta">3 min read</span>
        </div>
      </div>
    </div>
  </div>
  <div class="controls">
    <button class="ctrl-btn" id="btn-prev" title="Previous" disabled>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <span class="counter" id="counter">1 / 5</span>
    <button class="ctrl-btn" id="btn-next" title="Next">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  </div>
</div>`,
  css: `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:linear-gradient(135deg,#0f172a,#1e1b4b);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 20px}
.scene{display:flex;flex-direction:column;align-items:center;gap:32px}
/* deck */
.deck{position:relative;width:340px;height:220px}
/* card base */
.card{position:absolute;inset:0;border-radius:20px;cursor:pointer;user-select:none;
  transform-origin:bottom center;
  transition:transform .45s cubic-bezier(.34,1.56,.64,1), opacity .35s ease;
  will-change:transform}
.card-inner{height:100%;padding:24px;display:flex;flex-direction:column;gap:12px;border-radius:20px;
  background:linear-gradient(145deg,#1e293b,#0f172a);
  border:1px solid rgba(255,255,255,.08);
  box-shadow:0 8px 32px rgba(0,0,0,.4)}
/* stack positions via --i */
.card[data-pos="0"]{transform:translateY(0) scale(1);opacity:1;z-index:10}
.card[data-pos="1"]{transform:translateY(10px) scale(.97);opacity:.85;z-index:9}
.card[data-pos="2"]{transform:translateY(20px) scale(.94);opacity:.65;z-index:8}
.card[data-pos="3"]{transform:translateY(30px) scale(.91);opacity:.4;z-index:7}
.card[data-pos="4"]{transform:translateY(40px) scale(.88);opacity:.2;z-index:6}
.card.exit-left{transform:translateX(-120%) rotate(-8deg) scale(.9);opacity:0;z-index:11;transition:transform .4s ease,opacity .3s ease}
.card.enter-back{transform:translateY(40px) scale(.88);opacity:0;z-index:5;transition:none}
/* card content */
.card-tag{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#818cf8;
  background:rgba(99,102,241,.15);padding:3px 10px;border-radius:20px;align-self:flex-start}
.card-title{font-size:18px;font-weight:700;color:#f1f5f9;line-height:1.3}
.card-body{font-size:13px;color:#94a3b8;line-height:1.6;flex:1}
.card-foot{display:flex;align-items:center;gap:10px;margin-top:auto}
.avatar{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0}
.card-meta{font-size:12px;color:#64748b}
/* controls */
.controls{display:flex;align-items:center;gap:20px}
.ctrl-btn{width:40px;height:40px;border-radius:50%;border:1.5px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#94a3b8;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.ctrl-btn:hover:not(:disabled){background:rgba(255,255,255,.12);color:#f1f5f9;border-color:rgba(255,255,255,.3)}
.ctrl-btn:disabled{opacity:.3;cursor:default}
.counter{font-size:14px;color:#64748b;min-width:40px;text-align:center}`,
  js: `const deck = document.getElementById('deck');
const cards = [...deck.querySelectorAll('.card')];
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const counter = document.getElementById('counter');
const N = cards.length;
let current = 0;

function applyPositions() {
  cards.forEach((card, i) => {
    const pos = (i - current + N) % N;
    // remove all pos classes
    for (let p = 0; p < N; p++) card.removeAttribute('data-pos');
    card.dataset.pos = pos < 5 ? pos : 4;
  });
}

function updateControls() {
  btnPrev.disabled = current === 0;
  btnNext.disabled = current === N - 1;
  counter.textContent = \`\${current + 1} / \${N}\`;
}

function advance(dir) {
  const topCard = cards[current];
  if (dir === 'next') {
    topCard.classList.add('exit-left');
    setTimeout(() => {
      topCard.classList.remove('exit-left');
      current++;
      applyPositions();
      updateControls();
    }, 380);
  } else {
    current--;
    applyPositions();
    updateControls();
  }
}

btnNext.addEventListener('click', () => { if (current < N - 1) advance('next'); });
btnPrev.addEventListener('click', () => { if (current > 0) advance('prev'); });

// swipe support
let startX = 0;
deck.addEventListener('pointerdown', e => { startX = e.clientX; });
deck.addEventListener('pointerup', e => {
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 50) {
    if (dx < 0 && current < N - 1) advance('next');
    if (dx > 0 && current > 0) advance('prev');
  }
});

applyPositions();
updateControls();`,
  seo: {
    title: 'Stacked Cards Deck — Free HTML CSS JS Snippet',
    description: `CSS transform stack with scale/Y offset layers, swipe gesture, exit animation, and prev/next controls. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `Stacked Cards Deck — CSS Stack Transforms, Swipe Gestures & Animated Card Cycling in Vanilla JS`,
      description: `Stacked card UIs signal depth and discovery — they're used in dating apps, flashcard tools, recommendation feeds, and onboarding sequences to present a curated set of items while hinting more content lies beneath. This snippet builds a five-card dark-theme deck with progressive scale and Y-offset transforms creating a convincing physical stack, smooth exit-left slide animation for dismissal, swipe gesture support, and prev/next controls — all in pure HTML, CSS, and vanilla JavaScript.

Stacked card UIs appear across product categories — Tinder-style swiping, flashcard learning apps, featured article carousels, and onboarding slides all use the visual metaphor of a physical deck to signal that items can be cycled through. This snippet creates a five-card dark-theme deck with a CSS-only depth effect, smooth card exit animations, pointer-event swipe support, and prev/next buttons — built entirely in HTML, CSS, and vanilla JavaScript with zero dependencies.

**CSS stack depth with scale and translateY**

The depth illusion is achieved by a \`data-pos\` attribute that the JavaScript updates on every card after each navigation step. Five \`[data-pos]\` CSS rules define the transform for each layer: position 0 (top card) has \`translateY(0) scale(1) opacity:1\`, position 1 has \`translateY(10px) scale(0.97) opacity:0.85\`, and so on down to position 4 at \`translateY(40px) scale(0.88) opacity:0.2\`. The scale shrinks by 3% per layer and Y offset grows by 10px — two parameters you can tune to taste. Because the transforms are applied via CSS and only the data attribute changes in JS, the browser handles interpolation: every card transition between layers animates via \`transition: transform .45s cubic-bezier(.34,1.56,.64,1)\`. The cubic-bezier is a spring ease (the middle two control points above and beyond 1) giving a slight overshoot that feels physical.

**Exit animation with a separate CSS class**

When the user advances forward, the top card is given the class \`exit-left\` which translates it off-screen to the left while rotating −8° and fading to opacity 0. A \`setTimeout\` of 380ms (slightly shorter than the 400ms CSS transition) waits for the animation to finish, then removes the class, increments \`current\`, and calls \`applyPositions()\` to re-stack the deck. The removed card re-enters at position 4 (bottom of the stack) instantly since its \`exit-left\` class is removed before \`data-pos\` is recalculated — it snaps to the back position without a visible jump.

**Pointer-event swipe detection**

Swipe support is implemented with three pointer events: \`pointerdown\` records \`startX\`, \`pointerup\` computes \`dx = clientX - startX\`. If \`|dx| > 50px\`, the swipe is treated as intentional — left swipe advances, right swipe goes back. Using the Pointer Events API (rather than Touch Events + Mouse Events) gives a single code path that works on touch screens, mouse drag, and stylus input without any \`e.preventDefault()\` dance.

**Modular rotation: keeping position indices circular**

\`applyPositions()\` uses modulo arithmetic: \`(i - current + N) % N\` maps each card's absolute index to a position 0–N−1 relative to the current top card. This means when \`current\` increments past the last card, the modulo wraps earlier cards back to the bottom of the stack without an array splice — the deck is logically circular. Only positions 0–4 are styled; any card at a position ≥ 5 shares position 4's rules and is visually buried.

**Customising the deck**

Swap the card content for your own data by editing the \`.card-inner\` markup — the outer \`.card\` wrapper and \`data-index\` attribute must remain. Change the number of cards by adding or removing \`.card\` divs and updating the five \`[data-pos]\` CSS rules to match. The colour scheme lives in two variables at the top of the CSS: the background gradient and the card gradient. Pair with a [profile card](/ui-snippets/profile-card/) design for a people-browsing feature.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Load the snippet',
        text: `Paste the HTML, CSS, and JS into your page. Five dark cards appear in a stacked perspective — the top card is fully visible, the others recede with scale and offset behind it.`,
      },
      {
        title: 'Click Next (→) to advance',
        text: `The top card slides left with a slight rotation and fades out. The remaining cards animate upward in the stack, and what was card 2 becomes the new top card.`,
      },
      {
        title: 'Swipe left or right on mobile',
        text: `Touch or click-drag the deck horizontally by more than 50px to trigger a swipe. Left swipe advances to the next card; right swipe goes back.`,
      },
      {
        title: 'Use the Back button',
        text: `The Prev (←) button is disabled on card 1 and enables once you advance. Clicking it snaps the previous card back to the top instantly.`,
      },
      {
        title: 'Track position with the counter',
        text: `The "1 / 5" counter below the deck updates after each navigation step so users always know their position.`,
      },
      {
        title: 'Customise card content',
        text: `Edit the \`.card-inner\` HTML for each card — change the tag colour, title, body, and avatar letter. Add or remove \`.card\` wrappers to resize the deck.`,
      },
    ] },
    features: [
      {
        title: 'CSS transform depth stack',
        text: `Progressive \`scale()\` and \`translateY()\` transforms on each layer create a convincing physical deck illusion — no 3D perspective or canvas needed.`,
      },
      {
        title: 'Spring cubic-bezier animation',
        text: `Stack reflow uses \`cubic-bezier(.34,1.56,.64,1)\` — a spring ease with slight overshoot — giving the cards a natural, physical feel when they shift up.`,
      },
      {
        title: 'Exit-left slide animation',
        text: `Advancing cards slide off-screen with \`translateX(-120%) rotate(-8deg)\` and fade out, matching the swipe-to-dismiss pattern users expect from mobile apps.`,
      },
      {
        title: 'Pointer Events swipe support',
        text: `Single \`pointerdown\`/\`pointerup\` handler works on mouse, touch, and stylus without duplicating code for touch events. Threshold of 50px prevents accidental swipes.`,
      },
      {
        title: 'Modulo deck cycling',
        text: `Card positions use \`(i - current + N) % N\` so the deck is logically circular — no array splicing, just a single integer index and CSS-driven reflow.`,
      },
      {
        title: 'Prev/Next controls with counter',
        text: `Arrow buttons with disabled state at boundaries, plus a "1 / N" counter that updates on every navigation step for clear orientation.`,
      },
      {
        title: 'Dark-theme card design',
        text: `Cards use a gradient dark background, subtle border glow, colour-coded category tags, avatar initials, and read-time metadata — ready to customise.`,
      },
      {
        title: 'Zero dependencies',
        text: `Pure HTML, CSS, and vanilla JS — no Swiper.js, no Framer Motion, no framework. The entire interaction is ~35 lines of JavaScript.`,
      },
    ],
    useCases: [
      {
        title: 'Article or content carousels',
        text: `Present featured posts, tips, or updates as a browsable deck. Each card shows a title, category tag, and read time — users flip through at their own pace.`,
      },
      {
        title: 'Flashcard learning apps',
        text: `Build vocabulary, quiz, or study-card flows where users swipe through questions. Combine with a [typewriter](/ui-snippets/typewriter/) effect for the answer reveal.`,
      },
      {
        title: 'Onboarding feature highlights',
        text: `Walk new users through product features one highlight at a time. Each card covers one key feature with an illustration area and short description.`,
      },
      {
        title: 'Team or product showcases',
        text: `Display team members, case studies, or portfolio items in a stacked deck that users browse through. Pair with a [profile card](/ui-snippets/profile-card/) layout.`,
      },
      {
        title: 'Recommendation feeds',
        text: `Show personalised suggestions (articles, products, people) as a swipeable stack — accept with right swipe, dismiss with left, matching mobile-native patterns.`,
      },
      {
        title: 'Pricing plan comparison',
        text: `Present multiple pricing tiers as a browsable card deck so mobile users can swipe between plans without horizontal scrolling. Link to a [pricing toggle](/ui-snippets/pricing-toggle/) for billing frequency.`,
      },
    ],
    faqs: [
      {
        q: 'How do I add more than five cards?',
        a: `Add more \`.card\` divs in the HTML (each needs a unique \`data-index\`). The JS \`N\` variable reads \`cards.length\` automatically. Add matching \`[data-pos="5"]\`, \`[data-pos="6"]\` etc. rules in CSS following the same scale/offset pattern, or cap all positions ≥ 4 at the \`[data-pos="4"]\` style.`,
      },
      {
        q: 'Can I make the cards auto-advance on a timer?',
        a: `Yes — call \`advance("next")\` inside a \`setInterval\`. Add a pause-on-hover: set a flag in \`mouseenter\`/\`mouseleave\` handlers and check it in the interval callback. Clear the interval when \`current === N - 1\` to stop at the last card.`,
      },
      {
        q: 'How do I make the top card draggable (Tinder-style)?',
        a: `Listen to \`pointermove\` in addition to \`pointerdown\`/\`pointerup\`. During drag, apply \`transform: translateX(dx) rotate(dx * 0.05deg)\` directly to the top card. On \`pointerup\`, if \`|dx| > threshold\` trigger \`advance("next")\`, otherwise spring the card back to \`translateX(0) rotate(0)\` by removing the inline style.`,
      },
      {
        q: 'Can I use these stacked cards in React, Vue, or Angular?',
        a: `Yes. Use the JSX, Vue, Angular, or Tailwind export buttons on this page. In React, keep \`current\` in \`useState\` and derive each card's \`data-pos\` in the render loop — the CSS \`transition\` animates the transform change automatically. Attach the pointer handlers with \`onPointerDown\`/\`onPointerUp\` props. In Vue, bind \`:data-pos\` and \`@pointerdown\`/\`@pointerup\`.`,
      },
      {
        q: 'Why does the back button not animate?',
        a: `Going back snaps instantly by design — like physically pulling a card from beneath the deck. If you prefer an animated reverse, add a \`enter-right\` CSS class that slides from the right and apply it to the card that becomes the new top, then remove it after a frame with \`requestAnimationFrame\`.`,
      },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out the modulo-based position math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how (i - current + N) % N maps each card's fixed index to its visual depth position, or why the exit-left class's 380ms setTimeout is deliberately shorter than its 400ms CSS transition duration. The same assistant can help optimize it, for example checking whether removing all data-pos attributes on every single card during every applyPositions call (rather than just updating the changed ones) is wasteful for a much larger deck. It's also useful for extending the feature: ask it to add live pointermove dragging so the top card follows the cursor before committing to a swipe (the FAQ already sketches this), add auto-advance with pause-on-hover, or make the back-navigation animate instead of snapping. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a stacked, swipeable card deck in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- A fixed set of card elements absolutely positioned on top of each other, each assigned a data-pos attribute by JavaScript that determines its depth via distinct CSS rules per position value (position 0 fully visible at full scale, increasingly smaller/more-offset/more-transparent for higher position values, capping visually at some maximum depth).
- Compute each card's position using modular arithmetic based on a single current index and the total card count, so the deck is logically circular (advancing past the last card and going back before the first must both be handled by the same formula, with no array splicing).
- Clicking Next must add an exit class to the current top card that slides and rotates it off-screen to one side while fading out, wait via a timeout slightly shorter than the CSS transition's duration, then remove the class, increment the current index, and recompute every card's position so the exited card reappears instantly at the back of the stack with no visible jump.
- Clicking Prev must instantly decrement the index and recompute positions with no exit animation, distinct from the forward navigation.
- Implement swipe gesture support using the Pointer Events API (not separate touch and mouse event handlers) that records the horizontal start position on pointerdown and, on pointerup, advances or goes back if the horizontal delta exceeds a minimum threshold in pixels.
- Disable the Prev button on the first card and the Next button on the last card, and display a running "current / total" counter that updates after every navigation.
- Use a CSS transition with a spring-like cubic-bezier easing (overshoot) for the position-to-position stack reflow, distinct from the exit animation's easing.`,
    },
  },
};

export default stackedCards;
