const directionAwareHover = {
  id: 'direction-aware-hover',
  title: 'Direction-Aware Hover',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="da-grid" id="daGrid">
  <article class="da-card" style="--bg:linear-gradient(135deg,#6366f1,#0a0a18)"><div class="da-overlay"><h3>Aurora</h3><p>View set →</p></div></article>
  <article class="da-card" style="--bg:linear-gradient(135deg,#ec4899,#0a0a18)"><div class="da-overlay"><h3>Ember</h3><p>View set →</p></div></article>
  <article class="da-card" style="--bg:linear-gradient(135deg,#22d3ee,#0a0a18)"><div class="da-overlay"><h3>Tide</h3><p>View set →</p></div></article>
  <article class="da-card" style="--bg:linear-gradient(135deg,#34d399,#0a0a18)"><div class="da-overlay"><h3>Fern</h3><p>View set →</p></div></article>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a18;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.da-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;width:100%;max-width:560px}
.da-card{position:relative;aspect-ratio:4/3;border-radius:16px;background:var(--bg);overflow:hidden;cursor:pointer}

.da-overlay{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;gap:4px;padding:20px;background:linear-gradient(0deg,rgba(8,8,18,.92),rgba(8,8,18,.4));
  /* start position is set inline by JS based on entry direction */
  transform:translate(var(--tx,0),var(--ty,100%));transition:transform .35s cubic-bezier(.4,0,.2,1)}
.da-card:hover .da-overlay,.da-card.show .da-overlay{transform:translate(0,0)}
.da-overlay h3{font-size:20px;font-weight:800}
.da-overlay p{font-size:13px;color:#c7c7dd}

@media(max-width:460px){.da-grid{grid-template-columns:1fr}}`,

  js: `var cards = Array.prototype.slice.call(document.querySelectorAll('.da-card'));

// Determine which edge (top/right/bottom/left) the pointer crossed by comparing
// the entry point to the card center, then set the overlay's start offset so it
// slides IN from that edge — and slides back OUT the same edge on exit.
function edge(card, e) {
  var r = card.getBoundingClientRect();
  var x = (e.clientX - r.left) / r.width - 0.5;
  var y = (e.clientY - r.top) / r.height - 0.5;
  // angle-free quadrant test using which magnitude dominates
  if (Math.abs(x) > Math.abs(y)) return x > 0 ? 'right' : 'left';
  return y > 0 ? 'bottom' : 'top';
}

function setStart(card, dir) {
  var map = {
    top:    ['0', '-100%'], bottom: ['0', '100%'],
    left:   ['-100%', '0'], right:  ['100%', '0']
  };
  card.style.setProperty('--tx', map[dir][0]);
  card.style.setProperty('--ty', map[dir][1]);
}

cards.forEach(function (card) {
  card.addEventListener('pointerenter', function (e) {
    setStart(card, edge(card, e));
    // next frame: hover rule animates it to translate(0,0)
    requestAnimationFrame(function () { card.classList.add('show'); });
  });
  card.addEventListener('pointerleave', function (e) {
    card.classList.remove('show');
    setStart(card, edge(card, e));   // exit toward the leaving edge
  });
});`,

  seo: {
    title: 'Direction-Aware Hover — Free HTML CSS JS Reveal Snippet',
    description: `Card overlays that slide in from the edge your cursor enters and exit toward the edge it leaves. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Direction-Aware Hover — Overlays That Enter From the Cursor Edge',
      description: `Direction-aware hover is the refined gallery effect where a card's caption overlay slides in from the precise edge your cursor crossed — enter from the left and it comes from the left, enter from the bottom and it rises up — and then slides back out toward whichever edge you leave by. This snippet implements that classic interaction with plain HTML, CSS, and a small vanilla JavaScript edge detector.

**Detecting the entry edge**

The whole effect hinges on knowing which side the pointer crossed. On \`pointerenter\`, the \`edge()\` function reads the cursor's position relative to the card center as -0.5…0.5 fractions on each axis, then asks which magnitude dominates: if the horizontal offset is larger, the pointer came from the left or right; otherwise from the top or bottom. The sign picks the specific edge. This dominant-axis test is a fast, trig-free way to classify entry into one of four directions accurately.

**Driving the slide with two variables**

The overlay's start position is two CSS custom properties, \`--tx\` and \`--ty\`. \`setStart()\` maps the detected edge to an off-screen offset — \`(-100%, 0)\` for left, \`(0, 100%)\` for bottom, and so on — so the overlay is parked just outside the matching edge. The CSS transitions \`transform: translate(var(--tx), var(--ty))\` to \`translate(0, 0)\` when the \`.show\` class is added, sliding the overlay in from exactly that side. Passing the geometry through variables keeps the animation itself a single CSS rule.

**The next-frame trigger**

After setting the start offset, the code adds \`.show\` inside a \`requestAnimationFrame\` callback. That one-frame gap lets the browser register the overlay at its off-screen start before the transition target is applied, so the slide animates rather than jumping straight to visible. It's the same double-frame technique used for any "set start, then animate" CSS transition.

**Exiting toward the leaving edge**

On \`pointerleave\`, the code removes \`.show\` and recomputes the edge from the exit point, setting \`--tx\`/\`--ty\` to that side. Because \`.show\` is gone, the overlay transitions back to its start offset — which now points at the edge you left through — so it slides out the way you exited. This symmetry (in from entry, out toward exit) is what makes the effect feel physically correct rather than scripted.

**A reusable grid**

Each card is a simple gradient tile with an overlay containing a title and a call-to-action, set up identically, so the same handlers apply to every card in the grid via a shared loop. The background is themed per card through an inline \`--bg\` variable, and the grid collapses to a single column on narrow screens.

**Customizing it**

Swap the gradient tiles for real images, change the overlay content and its background scrim, adjust the \`.35s\` transition for a faster or slower slide, or change the easing. Because the direction logic is generic, you can apply it to any hoverable element. Pair it with a [focus cards](/ui-snippets/focus-cards/) grid or an [Instagram gallery](/ui-snippets/instagram-gallery/) for a polished media section.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A grid of four gradient cards renders with hidden overlays.` },
      { title: 'Enter a card from the left', text: `The caption overlay slides in from the left.` },
      { title: 'Enter from the bottom', text: `The overlay rises up from the bottom edge instead.` },
      { title: 'Leave the card', text: `The overlay slides out toward the edge you exit by.` },
      { title: 'Swap in images', text: `Replace the gradient tiles with real photos.` },
      { title: 'Tune the slide', text: `Adjust the transition duration and easing.` },
    ] },
    features: [
      { title: 'Edge detection', text: `A dominant-axis test classifies entry direction.` },
      { title: 'Trig-free and fast', text: `Compares offsets, no angle math.` },
      { title: 'Variable-driven slide', text: `--tx/--ty set the start offset per edge.` },
      { title: 'Single CSS animation', text: `One transform transition does the reveal.` },
      { title: 'Next-frame trigger', text: `rAF ensures the slide animates from off-screen.` },
      { title: 'Symmetric exit', text: `Overlay leaves toward the exit edge.` },
      { title: 'Reusable handlers', text: `One loop wires every card in the grid.` },
      { title: 'Responsive grid', text: `Two columns collapse to one on mobile.` },
    ],
    useCases: [
      { title: 'Portfolio galleries', text: `Reveal project captions like a [focus cards](/ui-snippets/focus-cards/) grid.` },
      { title: 'Image collections', text: `Pair with an [Instagram gallery](/ui-snippets/instagram-gallery/).` },
      { title: 'Team grids', text: `Slide in roles over a [team card](/ui-snippets/team-card/) layout.` },
      { title: 'Product tiles', text: `Surface a CTA over a [product card](/ui-snippets/product-card/).` },
      { title: 'Category navigation', text: `Animate labels on a [bento grid](/ui-snippets/bento-grid/).` },
      { title: 'Hover effect demos', text: `A reference for direction-aware reveals.` },
      { icon: 'CODE', title: 'Related: Motion One Spring Cards', desc: 'See the [Motion One Spring Cards](/ui-snippets/motion-one-spring-cards/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does it know which edge I entered from?', a: `On pointerenter, the edge() function reads the cursor's position relative to the card center as -0.5 to 0.5 on each axis and checks which magnitude is larger. If horizontal dominates, entry was left or right; otherwise top or bottom, with the sign choosing the exact edge. This dominant-axis comparison classifies the direction without any trigonometry.` },
      { q: 'How does the overlay slide in from that specific side?', a: `The detected edge maps to an off-screen offset stored in two CSS variables, --tx and --ty, so the overlay is parked just outside that edge. The CSS transitions translate(var(--tx), var(--ty)) to translate(0,0) when the show class is added, animating the overlay in from exactly the side the cursor crossed.` },
      { q: 'Why does it slide out toward where I leave?', a: `On pointerleave the code removes the show class and recomputes the edge from the exit point, setting --tx/--ty to that side. With show gone, the overlay transitions back to its start offset — now pointing at the exit edge — so it leaves the way you went out. That in-from-entry, out-toward-exit symmetry makes it feel physically correct.` },
      { q: 'Why is the show class added in a requestAnimationFrame?', a: `After setting the off-screen start offset, the browser needs to paint that start state before the animation target is applied, or it would jump straight to visible. Deferring the class to the next frame with requestAnimationFrame guarantees the start position is registered first, so the slide actually animates.` },
      { q: 'How do I use this direction-aware hover in React, Vue, or Angular?', a: `Render the cards from data and attach pointerenter and pointerleave handlers that compute the edge and set the --tx/--ty inline style and a show state per card. Use refs to measure each card. The transition CSS stays the same. In Tailwind, drive the overlay with translate utilities and arbitrary inline variables, toggling a data attribute for the shown state.` },
    ],
    aiPrompt: {
      paragraph: `Instead of working through the geometry in your head, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the edge() function's dominant-axis comparison classifies a pointer position into one of four directions without any trigonometry, and why setStart() must run again on pointerleave rather than only on pointerenter. The same assistant can help optimize it, for instance checking whether getBoundingClientRect() being called on every single pointerenter and pointerleave event is worth caching for a grid with many cards. It is also useful for extending the effect: ask it to add a fifth diagonal-corner direction for finer entry detection, apply the same edge-aware slide to a full-bleed image gallery instead of gradient tiles, or combine it with a subtle scale transform on the underlying image. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a direction-aware hover reveal for a grid of cards in plain HTML, CSS, and JavaScript with no library.

Requirements:
- A grid of cards, each containing a caption overlay that starts fully translated off-screen using two CSS custom properties for its X and Y offset, transitioning to translate(0,0) via a single CSS transition rule.
- On pointerenter, compute which of the four edges (top, right, bottom, left) the pointer crossed by comparing the entry point's position relative to the card's center as normalized -0.5 to 0.5 fractions on each axis, and picking whichever axis has the larger absolute magnitude to decide between a horizontal or vertical edge, then using the sign to choose the specific side.
- Map the detected edge to an off-screen start offset for the two CSS custom properties (e.g. left edge means the overlay starts fully translated to -100% on the X axis) before adding a class that triggers the transition to (0,0).
- Defer adding that triggering class by one requestAnimationFrame after setting the start offset, so the browser registers the off-screen position before the transition target is applied, guaranteeing the slide actually animates instead of snapping.
- On pointerleave, remove the triggering class and immediately recompute the edge from the exit point, setting the same two custom properties so the overlay animates back out toward whichever edge the cursor left through, not just the edge it entered from.
- Wire the same two event handlers to every card in the grid from a single loop, and make the grid responsive by collapsing to one column on narrow viewports.`,
    },
  },
};

export default directionAwareHover;
