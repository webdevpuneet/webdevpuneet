const wishlistHeartButton = {
  id: 'wishlist-heart-button',
  title: 'Wishlist Heart Button',
  lastmod: '2026-07-18',
  category: 'buttons',
  html: `<div class="whb-row">
  <button class="whb-btn" type="button" aria-pressed="false" aria-label="Add to wishlist">
    <span class="whb-burst" aria-hidden="true"></span>
    <svg class="whb-heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
    <span class="whb-count" id="whbCount">214</span>
  </button>

  <button class="whb-icon" type="button" aria-pressed="false" aria-label="Save to wishlist">
    <span class="whb-burst" aria-hidden="true"></span>
    <svg class="whb-heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
  </button>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px; }

.whb-row { display: flex; align-items: center; gap: 20px; }

/* Pill button with count */
.whb-btn {
  position: relative;
  display: inline-flex; align-items: center; gap: 9px;
  padding: 10px 18px 10px 16px;
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 999px;
  font-family: inherit; font-size: 14px; font-weight: 700; color: #475569;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.whb-btn:hover { border-color: #fca5a5; }

/* Bare icon button */
.whb-icon {
  position: relative;
  width: 46px; height: 46px;
  display: inline-flex; align-items: center; justify-content: center;
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 50%;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.whb-icon:hover { border-color: #fca5a5; }

.whb-heart {
  width: 21px; height: 21px;
  fill: none; stroke: #94a3b8; stroke-width: 2;
  transition: fill 0.2s, stroke 0.2s, transform 0.35s cubic-bezier(0.2, 1.6, 0.4, 1);
}

/* Active state */
.whb-btn[aria-pressed="true"], .whb-icon[aria-pressed="true"] { border-color: #fecdd3; background: #fff1f2; }
.whb-btn[aria-pressed="true"] { color: #e11d48; }
[aria-pressed="true"] .whb-heart { fill: #f43f5e; stroke: #f43f5e; }

/* Pop animation applied briefly on toggle-on */
.whb-pop .whb-heart { animation: whbPop 0.4s cubic-bezier(0.2, 1.6, 0.4, 1); }
@keyframes whbPop { 0% { transform: scale(1); } 35% { transform: scale(0.78); } 70% { transform: scale(1.25); } 100% { transform: scale(1); } }

/* Particle burst ring */
.whb-burst {
  position: absolute; left: 50%; top: 50%;
  width: 8px; height: 8px;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.whb-icon .whb-burst, .whb-btn .whb-burst { left: 22px; }
.whb-burst::before, .whb-burst::after {
  content: ''; position: absolute; left: 50%; top: 50%; width: 5px; height: 5px; border-radius: 50%;
  transform: translate(-50%, -50%);
}
.whb-go.whb-icon .whb-burst, .whb-go.whb-btn .whb-burst { animation: none; }
.whb-go .whb-burst::before { animation: whbP1 0.55s ease-out forwards; }
.whb-go .whb-burst::after { animation: whbP2 0.55s ease-out forwards; }
@keyframes whbP1 {
  0% { box-shadow: 0 0 0 #fb7185, 0 0 0 #f43f5e, 0 0 0 #fda4af; opacity: 1; }
  100% { box-shadow: 14px -10px 0 -2px #fb7185, -14px -10px 0 -2px #f43f5e, 0 -18px 0 -2px #fda4af; opacity: 0; }
}
@keyframes whbP2 {
  0% { box-shadow: 0 0 0 #fda4af, 0 0 0 #fb7185, 0 0 0 #f43f5e; opacity: 1; }
  100% { box-shadow: 14px 9px 0 -2px #fda4af, -14px 9px 0 -2px #fb7185, 0 17px 0 -2px #f43f5e; opacity: 0; }
}

.whb-count { font-variant-numeric: tabular-nums; }`,
  js: `function wireHeart(btn) {
  const count = btn.querySelector('.whb-count');
  btn.addEventListener('click', () => {
    const on = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', String(!on));

    if (count) {
      let n = parseInt(count.textContent.replace(/\\D/g, ''), 10) || 0;
      count.textContent = (on ? n - 1 : n + 1).toLocaleString();
    }

    if (!on) {
      // Re-trigger the pop + burst animations from the start
      btn.classList.remove('whb-pop', 'whb-go');
      void btn.offsetWidth;
      btn.classList.add('whb-pop', 'whb-go');
    } else {
      btn.classList.remove('whb-pop', 'whb-go');
    }
  });

  btn.addEventListener('animationend', (e) => {
    if (e.animationName === 'whbPop') btn.classList.remove('whb-pop');
  });
}

document.querySelectorAll('.whb-btn, .whb-icon').forEach(wireHeart);`,
  seo: {
    title: 'Wishlist Heart Button — Free HTML CSS JS Like Snippet',
    description: 'A wishlist heart toggle with a spring pop, particle burst, optimistic count and aria-pressed state, in pill and icon variants. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Wishlist Heart Button — Animated Favorite Toggle with Pop and Particle Burst',
      description: `The heart/favourite/wishlist toggle is everywhere — product cards, listings, posts, playlists — and the satisfying ones share two traits: a springy pop when you tap them and a little burst of particles confirming the action. This component delivers both, in two variants (a pill button with a live count and a bare icon button), with an optimistic count update and proper \`aria-pressed\` state. It is built in HTML, CSS, and vanilla JavaScript, and the animations are pure CSS keyframes re-triggered from JavaScript.

**Toggle state on aria-pressed**

Rather than tracking state in a JavaScript variable or an extra class, the button's on/off state lives in its \`aria-pressed\` attribute — which is also exactly what a toggle button needs for accessibility. CSS targets \`[aria-pressed="true"]\` to fill the heart red, tint the button background pink, and recolour the count, so the visual state is driven directly by the accessibility state. There is one source of truth, and screen readers announce the button as "pressed" when it is favourited.

**The spring pop**

When you favourite, the heart plays a \`whbPop\` keyframe: it dips to \`scale(0.78)\`, overshoots to \`scale(1.25)\`, and settles back to \`scale(1)\`, using a \`cubic-bezier(0.2, 1.6, 0.4, 1)\` easing whose value above 1 creates the spring overshoot. This squash-then-stretch is what makes the tap feel physical and rewarding rather than a flat colour change. The pop only plays on toggle-on, not toggle-off, matching the asymmetry users expect (favouriting is celebrated; un-favouriting is quiet).

**Re-triggering a CSS animation**

A CSS animation only plays once when its class is added; adding the same class again does nothing because the class is already present. To replay the pop on every favourite, the handler removes the animation classes, forces a reflow with \`void btn.offsetWidth\` — which flushes the style change so the browser treats the next class add as a fresh animation — then re-adds them. This reflow trick is the standard way to restart a CSS animation from JavaScript, and it is why rapid repeated taps each get their own pop.

**The particle burst**

Around the heart, a \`.whb-burst\` element fires six dots outward on favourite. The trick is doing six particles with no extra DOM: a \`::before\` and \`::after\` pseudo-element each carry three dots via a triple \`box-shadow\`, and the keyframes animate those shadows from the centre outward (up-left, up-right, up; and down-left, down-right, down) while fading to transparent. Each dot is a different pink/rose shade. It is a self-contained confetti effect in pure CSS — no canvas, no particle library, no DOM churn — that cleans itself up when the animation ends.

**Optimistic count**

The pill variant shows a like count. On toggle it updates immediately — plus one on favourite, minus one on un-favourite — parsed from the displayed text and re-formatted with \`toLocaleString()\` so large counts keep their thousands separators, and rendered with \`tabular-nums\` so the digits do not shift width as the number changes. This is an optimistic update: the UI responds instantly rather than waiting for a server, which is what makes the interaction feel snappy. In production you would reconcile with the real count from your API.

**Customisation**

Both variants are wired by one \`wireHeart()\` function applied to every \`.whb-btn\` and \`.whb-icon\`, so you can drop the markup anywhere and it just works. Swap the rose palette (\`#f43f5e\` and the burst shades) for your brand, adjust the pop easing and the burst distances in the keyframes, and connect the click handler to your favourite/wishlist API. Pre-set \`aria-pressed="true"\` to render an already-favourited item on load.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A pill heart button with a count and a round icon heart button both render in their unfavourited (grey outline) state.` },
      { title: 'Click a heart', text: `The heart fills red with a springy pop, a burst of pink particles fires outward, and the pill's count increments by one.` },
      { title: 'Click again to unfavourite', text: `The heart returns to grey outline quietly (no pop) and the count decrements.` },
      { title: 'Tap rapidly', text: `Each favourite re-triggers the pop and burst from the start thanks to the reflow restart, so quick taps stay responsive.` },
      { title: 'Pre-favourite an item', text: `Set aria-pressed="true" on the button in markup to render an already-saved item on load.` },
      { title: 'Theme and connect', text: `Swap the rose palette for your brand and wire the click handler to your wishlist/favourite API.` },
    ]},
    features: [
      { title: 'aria-pressed as state', text: `The favourited state lives in aria-pressed, so the visual style and the accessibility state share one source of truth.` },
      { title: 'Spring pop on favourite', text: `A squash-and-overshoot keyframe with a >1 cubic-bezier makes the tap feel physical; it plays only on toggle-on.` },
      { title: 'CSS animation restart', text: `A reflow with void offsetWidth replays the pop and burst on every tap, even rapid repeats.` },
      { title: 'Pure-CSS particle burst', text: `Six dots fire outward using two pseudo-elements with triple box-shadows — confetti with zero extra DOM or libraries.` },
      { title: 'Optimistic count', text: `The count updates instantly with locale formatting and tabular-nums so digits do not jump width.` },
      { title: 'Two variants, one wiring', text: `A pill-with-count and a bare icon button are both handled by a single wireHeart() applied to every instance.` },
      { title: 'Quiet un-favourite', text: `Removing a favourite skips the pop and burst, matching the asymmetry users expect.` },
      { title: 'Accessible toggle', text: `Real buttons with aria-pressed and aria-label announce the favourited state to screen readers.` },
    ],
    useCases: [
      { title: 'Product and listing cards', text: `Add a save-to-wishlist heart on e-commerce cards — pair it with a [thumbnail gallery](/ui-snippets/thumbnail-gallery/) and a [quantity stepper](/ui-snippets/quantity-stepper/) on the product page.` },
      { title: 'Social posts and feeds', text: `Use the icon variant as a like button; compare with a [like burst button](/ui-snippets/like-burst-button/) for an alternative particle effect.` },
      { title: 'Media and playlist UIs', text: `Favourite songs, videos, or articles with the count variant showing total likes.` },
      { title: 'Real-estate and travel listings', text: `Let users save properties or stays for later with a persistent favourited state.` },
      { title: 'Bookmarking and saved items', text: `Swap the heart for a bookmark icon to build a save toggle; complements a [bookmark toggle](/ui-snippets/bookmark-toggle/).` },
      { title: 'Learning CSS animation restarts', text: `A reference for replaying keyframes via reflow, pseudo-element particle bursts, and aria-pressed-driven styling.` },
    ],
    faqs: [
      { q: 'How do I replay a CSS animation every time the button is clicked?', a: `A CSS animation runs once per class application, so re-adding an already-present class does nothing. The fix is to remove the animation class, force a reflow by reading a layout property (void btn.offsetWidth), then re-add the class — the reflow makes the browser treat the re-add as a brand-new animation. This snippet does exactly that for the pop and burst so every favourite tap animates, even rapid ones.` },
      { q: 'How does the particle burst work without a canvas or library?', a: `The .whb-burst element's ::before and ::after pseudo-elements each hold three dots using a triple box-shadow. The keyframes animate those box-shadow offsets from the centre outward in six directions while fading opacity to 0. It is purely declarative — no DOM nodes are created or destroyed, nothing to clean up — which makes it cheap and reliable. Adjust the offsets in the whbP1/whbP2 keyframes to change the spread.` },
      { q: 'Why store the state in aria-pressed instead of a class?', a: `aria-pressed is the correct ARIA attribute for a toggle button, so a screen reader announces "pressed" when the item is favourited. By styling [aria-pressed="true"] directly in CSS, the visual state and the accessibility state can never disagree — there is no separate class to keep in sync. It is one attribute doing double duty as state and as accessibility.` },
      { q: 'Is the count a real like count?', a: `It is an optimistic local update for demo purposes — clicking adds or subtracts one immediately so the UI feels instant. In production you would send the favourite to your API and reconcile with the server's authoritative count, ideally rolling back the optimistic change if the request fails. The toLocaleString() formatting and tabular-nums styling are there so real large counts display cleanly.` },
      { q: 'How do I use this heart button in React, Vue, or Angular?', a: `Hold a favourited boolean (and count) in state and bind aria-pressed to it. On click, flip the boolean and adjust the count. For the pop/burst replay, toggle an animating flag: set it false then true (React needs a key change or a forced reflow in a ref to restart), or simply remount the heart via a key. Bind .whb-pop/.whb-go to that flag and clear it on animationEnd. The CSS keyframes, particle burst, and aria-pressed styling port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to explain exactly why void btn.offsetWidth appears between removing and re-adding the animation classes in wireHeart() — that forced-reflow trick is the whole reason rapid repeated taps each get a fresh pop and burst instead of the second click doing nothing. It's also worth asking how six particles are drawn from just two pseudo-elements using triple box-shadows, since that's a neat technique worth reusing elsewhere. For extending it, ask for a version that persists the favorited state to localStorage or an API with optimistic-then-reconciled updates, a bookmark-icon variant sharing the same wiring, or a batch "favorite all visible items" action that staggers the pop animation across a grid of cards. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an animated wishlist/favorite heart toggle button in plain HTML, CSS, and JavaScript with a spring pop and a particle burst confetti effect — no canvas, no animation library.

Requirements:
- The button's on/off state must live entirely in its aria-pressed attribute, not in a separate JavaScript variable or CSS-only class — style the filled/unfilled heart and any color changes purely from a [aria-pressed="true"] CSS attribute selector.
- On favoriting (toggling from false to true), play a squash-and-overshoot keyframe animation on the heart icon using a cubic-bezier easing whose value exceeds 1 to create a spring overshoot, and ensure this pop animation does NOT play when un-favoriting.
- Because a CSS animation only plays once per class application, implement the replay correctly: remove the animation classes, force a synchronous layout reflow by reading a layout-triggering property (such as offsetWidth) on the element, then re-add the classes — verify that rapidly clicking the button multiple times in a row replays the full animation every single time with no dead clicks.
- Build a six-dot particle burst using only two pseudo-elements (::before and ::after), each carrying three dots via a triple box-shadow value, animated outward from the button's center via keyframes that change the box-shadow offsets while fading opacity to zero — no additional DOM elements may be created for the particles.
- Include a live count next to the heart that increments on favorite and decrements on un-favorite, formatted with locale-aware thousands separators and rendered with a tabular-number font so the digit width doesn't shift as the count changes.
- Provide both a pill variant (with the visible count) and a bare circular icon-only variant, both wired through the exact same reusable function so adding the markup anywhere just works.`,
    },
  },
};

export default wishlistHeartButton;
