const coverflowCarousel = {
  id: 'coverflow-carousel',
  title: 'Coverflow Carousel',
  lastmod: '2026-06-17',
  category: 'carousels',
  html: `<div class="cf-stage">
  <div class="cf-track" id="cfTrack">
    <div class="cf-card" data-index="0" style="background:linear-gradient(160deg,#6366f1,#4338ca);transition:transform .55s cubic-bezier(.25,.8,.3,1),opacity .55s ease" onclick="goTo(this)"><span class="cf-emoji">🎧</span><span class="cf-title">Headphones</span></div>
    <div class="cf-card" data-index="1" style="background:linear-gradient(160deg,#ec4899,#9d174d);transition:transform .55s cubic-bezier(.25,.8,.3,1),opacity .55s ease" onclick="goTo(this)"><span class="cf-emoji">📷</span><span class="cf-title">Camera</span></div>
    <div class="cf-card" data-index="2" style="background:linear-gradient(160deg,#0ea5e9,#0369a1);transition:transform .55s cubic-bezier(.25,.8,.3,1),opacity .55s ease" onclick="goTo(this)"><span class="cf-emoji">⌚</span><span class="cf-title">Watch</span></div>
    <div class="cf-card" data-index="3" style="background:linear-gradient(160deg,#10b981,#047857);transition:transform .55s cubic-bezier(.25,.8,.3,1),opacity .55s ease" onclick="goTo(this)"><span class="cf-emoji">🎮</span><span class="cf-title">Console</span></div>
    <div class="cf-card" data-index="4" style="background:linear-gradient(160deg,#f59e0b,#b45309);transition:transform .55s cubic-bezier(.25,.8,.3,1),opacity .55s ease" onclick="goTo(this)"><span class="cf-emoji">🔊</span><span class="cf-title">Speaker</span></div>
  </div>

  <div class="cf-controls">
    <button class="cf-btn" onclick="prev()" aria-label="Previous">‹</button>
    <div class="cf-dots" id="cfDots"></div>
    <button class="cf-btn" onclick="next()" aria-label="Next">›</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.cf-stage{width:100%;max-width:560px}
.cf-track{position:relative;height:280px;perspective:1200px;transform-style:preserve-3d;margin-bottom:24px}

.cf-card{position:absolute;left:50%;top:50%;width:190px;height:240px;margin:-120px 0 0 -95px;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;cursor:pointer;box-shadow:0 20px 45px rgba(0,0,0,.45);backface-visibility:hidden}
.cf-card::after{content:'';position:absolute;inset:0;border-radius:18px;background:rgba(15,23,42,.45);transition:opacity .5s}
.cf-card.active::after{opacity:0}
.cf-emoji{font-size:60px;filter:drop-shadow(0 8px 16px rgba(0,0,0,.4));position:relative;z-index:1}
.cf-title{font-size:16px;font-weight:800;color:#fff;text-shadow:0 2px 6px rgba(0,0,0,.5);position:relative;z-index:1}

.cf-controls{display:flex;align-items:center;justify-content:center;gap:18px}
.cf-btn{width:42px;height:42px;border-radius:50%;background:#1e293b;border:1px solid #334155;color:#cbd5e1;font-size:22px;line-height:1;cursor:pointer;transition:background .15s,color .15s,transform .1s;display:flex;align-items:center;justify-content:center;font-family:inherit}
.cf-btn:hover{background:#334155;color:#fff}
.cf-btn:active{transform:scale(.92)}
.cf-dots{display:flex;gap:8px}
.cf-dot{width:8px;height:8px;border-radius:50%;background:#334155;cursor:pointer;transition:background .2s,width .2s}
.cf-dot.active{background:#6366f1;width:22px;border-radius:4px}`,

  js: `var cards = document.querySelectorAll('.cf-card');
var current = 2;

function layout() {
  cards.forEach(function (card, i) {
    var off = i - current;
    var abs = Math.abs(off);
    card.style.transform = 'translateX(' + (off * 115) + 'px) translateZ(' + (-abs * 120) + 'px) rotateY(' + (off * -48) + 'deg) scale(' + (1 - abs * 0.06) + ')';
    card.style.zIndex = String(100 - abs);
    card.style.opacity = abs > 2 ? '0' : '1';
    card.style.pointerEvents = abs > 2 ? 'none' : 'auto';
    card.classList.toggle('active', off === 0);
  });
  document.querySelectorAll('.cf-dot').forEach(function (d, i) {
    d.classList.toggle('active', i === current);
  });
}

function goTo(el) { current = parseInt(el.dataset.index, 10); layout(); }
function next() { if (current < cards.length - 1) current++; layout(); }
function prev() { if (current > 0) current--; layout(); }

var dots = document.getElementById('cfDots');
cards.forEach(function (c, i) {
  var d = document.createElement('button');
  d.className = 'cf-dot';
  d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  d.addEventListener('click', function () { current = i; layout(); });
  dots.appendChild(d);
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prev();
  else if (e.key === 'ArrowRight') next();
});

layout();`,

  seo: {
    title: 'Coverflow Carousel — 3D Cards HTML CSS JS Snippet',
    description: `3D coverflow carousel: cards rotate, scale & recede in perspective around the active card, with prev/next, dots & arrow keys. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Coverflow Carousel — Perspective Rotation, Depth Scaling & Centred Active Card`,
      description: `Coverflow — the 3D carousel that fans cards out in perspective with the active one front-and-centre and its neighbours angled and receding — is one of the most visually impressive ways to browse a small set of items. Made famous by iTunes, it instantly communicates "there's more on either side". This snippet implements it in plain HTML, CSS, and vanilla JavaScript using only transforms, so it animates on the GPU and exports cleanly to every framework: cards rotate and scale by their distance from centre, with prev/next buttons, clickable cards, position dots, and arrow-key support.

**One layout function, pure transforms**

Every card's appearance is derived from a single number: its offset from the current index. \`layout\` loops the cards and, for each, computes \`off = i - current\` and builds one \`transform\`: \`translateX\` to fan it out, \`translateZ\` to push non-active cards back in space, \`rotateY\` to angle it like an album cover, and \`scale\` to shrink it slightly with distance. The active card (\`off === 0\`) sits flat, large, and forward. Because everything is a transform with a \`transition: transform\`, the rearrangement runs on the compositor — smooth, and it survives a Tailwind/React export intact (utility frameworks animate transforms, not layout).

**Perspective and stacking**

The track sets \`perspective: 1200px\` and \`transform-style: preserve-3d\`, which is what turns the per-card \`rotateY\`/\`translateZ\` into real 3D depth rather than flat skewing. \`layout\` also sets each card's \`z-index\` to \`100 - distance\` so the active card stacks above its neighbours, and fades/disables cards more than two steps away (\`opacity: 0\`, \`pointer-events: none\`) so the wings don't pile up infinitely or capture clicks.

**Click, buttons, dots, and keyboard**

Four navigation paths all funnel into \`layout\`: clicking any visible card calls \`goTo\` (centring it), the prev/next buttons step the index with bounds checks, the auto-generated dots jump straight to a slide, and Left/Right arrow keys move through. A dimming overlay (\`::after\`) darkens every non-active card and clears on the active one, focusing attention on the centre.

**Dynamic dots**

The dots are built in JS from the card count, so the indicator always matches the number of slides — add or remove a card and the dots follow. The active dot widens into a pill for a clear position cue.

Because the whole thing is driven by \`current\` and \`layout\`, wiring it to real data (product images, album art) is just swapping the card contents. Pair this with a [carousel](/ui-snippets/carousel/) for a flat slider, a [scroll-snap gallery](/ui-snippets/scroll-snap-gallery/) for swipe galleries, or a [product card](/ui-snippets/product-card/) grid.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 3D coverflow appears with five cards; the centre one faces you while its neighbours angle back into perspective.` },
      { title: 'Use prev/next', text: `Click the ‹ and › buttons — the cards rotate and slide so the next item swings to the centre.` },
      { title: 'Click a side card', text: `Click any angled card — it animates to the centre and flattens, becoming the active item.` },
      { title: 'Use the dots', text: `Click a position dot to jump straight to that card; the active dot widens into a pill.` },
      { title: 'Arrow keys', text: `Press Left/Right to move through the carousel without the mouse.` },
      { title: 'Swap in real content', text: `Replace each card's gradient and emoji with an image and caption for album art or product covers.` },
    ] },
    features: [
      { title: 'Offset-driven layout', text: `Each card's transform is computed from its distance to \`current\`, so one \`layout\` function defines the entire 3D arrangement.` },
      { title: 'Pure-transform animation', text: `Cards animate with \`translateX/translateZ/rotateY/scale\` and \`transition: transform\`, running on the GPU and exporting cleanly to Tailwind/React.` },
      { title: 'Real 3D depth', text: `\`perspective: 1200px\` and \`preserve-3d\` turn per-card rotateY/translateZ into genuine depth, not flat skew.` },
      { title: 'Smart stacking & culling', text: `\`z-index\` follows distance so the active card is on top, and cards beyond two steps fade out and disable pointer events.` },
      { title: 'Click-to-centre', text: `\`goTo\` reads a card's \`data-index\` and recentres it, so any visible card is one click from active.` },
      { title: 'Auto-generated dots', text: `Dots are built from the card count and stay in sync; the active one widens into a pill for a clear position cue.` },
      { title: 'Keyboard navigation', text: `Left/Right arrow keys step through the carousel, routing through the same \`prev\`/\`next\` as the buttons.` },
      { title: 'Focus dimming', text: `A \`::after\` overlay darkens non-active cards and clears on the centre one, drawing the eye to the active item.` },
    ],
    useCases: [
      { title: 'Product and album showcases', text: `Browse a small set of featured products or covers in style. Link selections to a [product card](/ui-snippets/product-card/) detail view.` },
      { title: 'Portfolio and project galleries', text: `Fan out featured work with the active piece centred; pair with an [image lightbox](/ui-snippets/image-lightbox/) for full views.` },
      { title: 'App / feature highlights', text: `Showcase screenshots or features in a hero; combine with an [app download hero](/ui-snippets/app-download-hero/) on a landing page.` },
      { title: 'Media and content browsers', text: `Movies, playlists, or articles where a visual, tactile browse beats a flat list — a richer alternative to a [carousel](/ui-snippets/carousel/).` },
      { title: 'Onboarding and tutorials', text: `Step through a few visual slides with depth; for guided in-app flows use an [onboarding tour](/ui-snippets/onboarding-tour/).` },
      { title: 'Pricing or plan spotlights', text: `Center the recommended plan with others angled beside it; combine with a [plan selector](/ui-snippets/plan-selector/) for selection.` },
      { icon: 'CODE', title: 'Related: Image Hover Reveal Cards', desc: 'See the [Image Hover Reveal Cards](/ui-snippets/image-hover-reveal/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I add swipe/drag support?', a: `Track \`touchstart\`/\`touchmove\` (and optional \`mousedown\`/\`mousemove\`) on the track: record the start X, and on release compare the delta to a threshold to call \`next()\` or \`prev()\`. For live drag, map the horizontal delta to a fractional offset and pass it into a tweaked \`layout\` so the cards follow the finger before snapping to the nearest index.` },
      { q: 'How do I tune the spread, angle, and depth?', a: `Edit the constants in \`layout\`: the \`off * 115\` term controls horizontal spacing, \`off * -48\` the rotation per step, \`-abs * 120\` how far back neighbours recede, and \`1 - abs * 0.06\` the size falloff. Increase rotation and translateZ for a more dramatic 3D look, or reduce them for a subtler fan.` },
      { q: 'Why use transforms instead of left/margin positioning?', a: `Transforms (\`translate\`, \`rotate\`, \`scale\`) are GPU-accelerated and do not trigger layout, so the animation is smooth even with shadows and many cards. Crucially for this site's exports, Tailwind's \`transition\` utility animates transform but not \`left\`/\`margin\`, so a transform-based coverflow behaves identically in the React + Tailwind build.` },
      { q: 'Is the coverflow carousel accessible?', a: `Provide real controls (the snippet uses \`<button>\`s with \`aria-label\`s) and arrow-key support so it is keyboard-operable. Mark the active card with \`aria-current\` and consider an \`aria-live\` announcement of the centred item's title on change. Ensure non-active, faded cards are not focusable (this snippet disables their pointer events; also set \`tabindex="-1"\` on them).` },
      { q: 'How do I use this coverflow in React, Vue, or Angular?', a: `In React, hold \`current\` in \`useState\` and compute each card's transform inline from its index versus \`current\` in render — no manual DOM writes. In Vue, use a \`ref\` for \`current\` and bind \`:style\` per card in a \`v-for\`. In Angular, track \`current\` and bind \`[style.transform]\`. The perspective/preserve-3d CSS and the offset math port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the offset math by hand to see why the whole 3D fan is driven by one number per card. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how a single "distance from current index" value feeds into the translateX, translateZ, rotateY, and scale terms simultaneously, and why perspective and preserve-3d have to be set on different elements (the track versus nothing on the cards themselves) for the depth effect to render correctly. The same assistant can help optimize it — for instance asking whether recalculating and rewriting every card's transform on every navigation step is necessary versus only updating the cards whose distance-from-current actually changed. It's also useful for extending the carousel: ask it to add touch/drag support so users can swipe through cards with their finger, make the spread and rotation angles responsive so the effect looks right on narrow phone screens, or add momentum so a fast swipe skips multiple cards instead of always stepping one at a time. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a 3D "coverflow" carousel in plain HTML, CSS, and JavaScript using only CSS 3D transforms — no carousel library, no scroll-snap.

Requirements:
- A perspective-enabled container holding a set of absolutely-positioned cards, where transform-style preserve-3d is set on the appropriate parent so child rotateY and translateZ values produce genuine depth rather than flat 2D transforms.
- A single layout function that is the only place that writes each card's transform: for every card, compute its integer offset from the currently active index, then derive a horizontal translateX proportional to that offset, a translateZ that pushes the card backward the further it is from center, a rotateY that angles it like an album cover tilted away from center, and a scale that shrinks it slightly with distance — all four values driven by that one offset number, not tracked independently.
- The active card (offset zero) must end up flat, full-size, and topmost via z-index, with z-index for every other card assigned according to how far it is from center so nearer-to-active cards always stack above farther ones.
- Cards more than a couple of steps from center must fade to fully transparent and have pointer-events disabled, so they don't visually clutter the edges or intercept clicks while still existing in the DOM.
- Clicking any visible (non-culled) card must animate it into the center position by updating the current index and re-running the layout function.
- Provide previous/next buttons that step the current index by one with bounds checking so it can't go below the first or past the last card, plus a row of position-indicator dots generated dynamically from the card count (not hardcoded) where clicking a dot jumps straight to that index and the active dot is visually distinguished from the rest.
- Support left/right arrow key navigation that calls the same previous/next logic as the buttons.
- All motion must use CSS transitions on the transform property only, so the animation stays smooth and compositor-driven rather than triggering layout.`,
    },
  },
};

export default coverflowCarousel;
