const addToCartButton = {
  id: 'add-to-cart-button',
  title: 'Add to Cart Button',
  lastmod: '2026-06-16',
  category: 'buttons',
  html: `<div class="atc-stage">
  <div class="atc-cart" id="atcCart">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#1e293b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
    <span class="atc-badge" id="atcBadge">0</span>
  </div>

  <div class="atc-product">
    <div class="atc-img">🎧</div>
    <div class="atc-name">Studio Wireless Headphones</div>
    <div class="atc-price">$199.00</div>
    <button class="atc-btn" id="atcBtn" onclick="addToCart(this)">
      <span class="atc-btn-label">Add to cart</span>
      <svg class="atc-spinner" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6"><circle cx="12" cy="12" r="9" stroke-opacity=".25"/><path d="M12 3a9 9 0 0 1 9 9"/></svg>
      <svg class="atc-check" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    </button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:40px 24px}
.atc-stage{position:relative;width:100%;max-width:300px}

.atc-cart{position:absolute;top:-14px;right:-4px;width:46px;height:46px;border-radius:50%;background:#fff;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(15,23,42,.08);z-index:5}
.atc-cart.shake{animation:atc-shake .5s ease}
@keyframes atc-shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}50%{transform:rotate(10deg)}75%{transform:rotate(-6deg)}}
.atc-badge{position:absolute;top:-5px;right:-5px;min-width:20px;height:20px;padding:0 5px;border-radius:999px;background:#f43f5e;color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;transform:scale(0);transition:transform .25s cubic-bezier(.2,1.6,.4,1)}
.atc-badge.show{transform:scale(1)}
.atc-badge.bump{animation:atc-bump .35s ease}
@keyframes atc-bump{0%{transform:scale(1)}45%{transform:scale(1.4)}100%{transform:scale(1)}}

.atc-product{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;text-align:center;box-shadow:0 14px 44px rgba(15,23,42,.06);margin-top:40px}
.atc-img{width:96px;height:96px;margin:0 auto 16px;border-radius:18px;background:linear-gradient(135deg,#eef2ff,#e0e7ff);display:flex;align-items:center;justify-content:center;font-size:48px}
.atc-name{font-size:15px;font-weight:700;color:#1e293b}
.atc-price{font-size:18px;font-weight:800;color:#6366f1;margin:4px 0 18px}

.atc-btn{position:relative;width:100%;height:46px;background:#6366f1;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;overflow:hidden;transition:background .25s,transform .1s}
.atc-btn:hover:not(:disabled){background:#4f46e5}
.atc-btn:active:not(:disabled){transform:scale(.98)}
.atc-btn:disabled{cursor:default}
.atc-btn-label,.atc-spinner,.atc-check{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);transition:opacity .2s,transform .2s}
.atc-spinner,.atc-check{opacity:0}
.atc-spinner{animation:atc-spin 1s linear infinite}
@keyframes atc-spin{to{transform:translate(-50%,-50%) rotate(360deg)}}

.atc-btn.loading .atc-btn-label{opacity:0}
.atc-btn.loading .atc-spinner{opacity:1}
.atc-btn.done{background:#10b981}
.atc-btn.done .atc-btn-label,.atc-btn.done .atc-spinner{opacity:0}
.atc-btn.done .atc-check{opacity:1;animation:atc-pop .4s cubic-bezier(.2,1.5,.4,1)}
@keyframes atc-pop{0%{transform:translate(-50%,-50%) scale(0)}100%{transform:translate(-50%,-50%) scale(1)}}

.atc-fly{position:fixed;width:18px;height:18px;border-radius:50%;background:#6366f1;z-index:50;pointer-events:none;box-shadow:0 4px 12px rgba(99,102,241,.5)}`,

  js: `var cartCount = 0;
var busy = false;

function addToCart(btn) {
  if (busy) return;
  busy = true;
  btn.disabled = true;
  btn.classList.add('loading');

  flyToCart(btn);

  setTimeout(function () {
    btn.classList.remove('loading');
    btn.classList.add('done');
    btn.querySelector('.atc-btn-label').textContent = 'Added';
  }, 650);

  setTimeout(function () {
    btn.classList.remove('done');
    btn.querySelector('.atc-btn-label').textContent = 'Add to cart';
    btn.disabled = false;
    busy = false;
  }, 2000);
}

function flyToCart(btn) {
  var cart = document.getElementById('atcCart');
  var from = btn.getBoundingClientRect();
  var to = cart.getBoundingClientRect();

  var dot = document.createElement('div');
  dot.className = 'atc-fly';
  var startX = from.left + from.width / 2 - 9;
  var startY = from.top + from.height / 2 - 9;
  dot.style.left = startX + 'px';
  dot.style.top = startY + 'px';
  document.body.appendChild(dot);

  var dx = (to.left + to.width / 2 - 9) - startX;
  var dy = (to.top + to.height / 2 - 9) - startY;

  requestAnimationFrame(function () {
    dot.style.transition = 'transform .7s cubic-bezier(.5,-0.3,.5,1), opacity .7s ease-in';
    dot.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(.4)';
    dot.style.opacity = '0.4';
  });

  dot.addEventListener('transitionend', function () {
    dot.remove();
    landInCart();
  });
}

function landInCart() {
  cartCount++;
  var badge = document.getElementById('atcBadge');
  badge.textContent = cartCount;
  badge.classList.add('show');
  badge.classList.remove('bump');
  void badge.offsetWidth;
  badge.classList.add('bump');

  var cart = document.getElementById('atcCart');
  cart.classList.remove('shake');
  void cart.offsetWidth;
  cart.classList.add('shake');
}`,

  seo: {
    title: 'Add to Cart Button — Fly Animation HTML CSS JS Snippet',
    description: `Add-to-cart button with a loading→checkmark state machine, a dot that flies into the cart icon, and a springing badge counter. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Add to Cart Button — Fly-to-Cart Dot, Loading→Success State Machine & Springing Badge`,
      description: `The add-to-cart button is the most important button in commerce. The moment it is clicked decides whether a browsing session becomes revenue, and the feedback it gives in that moment shapes whether the shopper trusts that the item was actually added. A button that silently does nothing for 400ms feels broken; a button that shows progress, confirms success, and visibly sends the product into the cart feels reliable and delightful. This snippet implements that full experience in plain HTML, CSS, and vanilla JavaScript: a three-state button, a dot that flies from the button into the cart icon, and a badge counter that springs and bumps.

**Loading → success state machine**

The button holds three overlaid elements — a label, a spinner, and a checkmark — all absolutely centred. \`addToCart\` walks them through a state machine using classes. On click it adds \`.loading\` (label fades out, spinner fades in and rotates), then after a short delay swaps to \`.done\` (spinner out, green background, checkmark pops in with a spring, label becomes "Added"), and finally reverts to idle. A \`busy\` guard ignores clicks while a cycle is in progress, so rapid clicking cannot desync the states.

**Fly-to-cart dot**

This is the signature effect. \`flyToCart\` measures the button and the cart icon with \`getBoundingClientRect\`, creates a fixed-position dot at the button's centre, and on the next animation frame applies a \`transform: translate(dx, dy) scale(.4)\` with a \`cubic-bezier\` transition that has a slight negative control point — giving the dot a subtle arc rather than a straight line. The dot fades as it travels and removes itself on \`transitionend\`. Because it is \`position: fixed\` and appended to \`body\`, it flies correctly regardless of scroll position or where the product sits on the page.

**Springing, bumping badge**

When the dot lands, \`landInCart\` increments the count, reveals the badge with a spring scale (it starts at \`scale(0)\`), and re-triggers a \`bump\` keyframe via a forced reflow so every subsequent add visibly pulses the number. The cart icon itself does a quick shake, reinforcing that something just arrived. Synchronising the badge update to the dot's arrival — not the button click — is the detail that makes the whole thing feel physically connected: the count goes up exactly when the product "drops in".

**Production-ready structure**

The 650ms loading delay stands in for a network request; replace it with your real add-to-cart API call and trigger the \`.done\` state on the resolved promise. The fly animation and badge logic stay exactly the same. Pair this button with a [mini cart](/ui-snippets/mini-cart/) dropdown, a [product card](/ui-snippets/product-card/) grid, a [variant selector](/ui-snippets/variant-selector/) for size/colour, or an [order summary](/ui-snippets/order-summary/) at checkout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A product card appears with a floating cart icon (badge at 0) and a purple "Add to cart" button.` },
      { title: 'Click Add to cart', text: `The label fades to a spinning loader, and a purple dot launches from the button on a gentle arc toward the cart icon.` },
      { title: 'Watch the dot land', text: `When the dot reaches the cart, the icon shakes, the badge springs into view, and the count ticks to 1.` },
      { title: 'See the success state', text: `The button turns green with a popping checkmark and reads "Added", confirming the item was added.` },
      { title: 'Add again', text: `After the button resets, click again — the badge bumps with a pulse to 2, 3, and so on, each synced to the dot's arrival.` },
      { title: 'Try rapid clicks', text: `Click repeatedly — the \`busy\` guard ignores clicks mid-cycle so the states never overlap or desync.` },
    ] },
    features: [
      { title: 'Three-state button machine', text: `Overlaid label, spinner, and checkmark are toggled by \`.loading\` and \`.done\` classes — idle → loading → success → reset, all in CSS opacity transitions.` },
      { title: 'Fly-to-cart dot', text: `\`getBoundingClientRect\` measures button and cart; a fixed dot animates with \`translate\` + \`scale\` on an arc and removes itself on \`transitionend\`.` },
      { title: 'Scroll-safe fixed positioning', text: `The flying dot is \`position: fixed\` on \`body\`, so it lands accurately no matter where the product sits or how far the page is scrolled.` },
      { title: 'Arrival-synced badge', text: `The count increments when the dot lands — not on click — so the cart number rises exactly as the product "drops in".` },
      { title: 'Springing + bumping badge', text: `The badge reveals with a \`cubic-bezier\` spring from \`scale(0)\` and re-bumps on each add via a forced-reflow class restart.` },
      { title: 'Cart icon shake', text: `A short \`atc-shake\` keyframe nudges the cart on arrival, reinforcing that an item just landed.` },
      { title: 'Re-entrancy guard', text: `A \`busy\` flag and disabled button ignore clicks mid-animation, preventing overlapping cycles from rapid tapping.` },
      { title: 'Spring checkmark success', text: `The confirm tick pops in with a \`cubic-bezier(.2,1.5,.4,1)\` scale and a green button, an unmistakable success signal.` },
    ],
    useCases: [
      { title: 'Product grids and listings', text: `Add items straight from a catalogue without leaving the page. Drop it onto a [product card](/ui-snippets/product-card/) and pair with a [faceted filter sidebar](/ui-snippets/faceted-filter-sidebar/).` },
      { title: 'Product detail pages', text: `The primary CTA below the gallery; combine it with a [variant selector](/ui-snippets/variant-selector/) so size and colour are chosen before the fly animation fires.` },
      { title: 'Quick-add in mini carts', text: `Reuse the button inside a [mini cart](/ui-snippets/mini-cart/) or [sticky cart drawer](/ui-snippets/sticky-cart-drawer/) for "buy it again" rows.` },
      { title: 'Wishlist-to-cart moves', text: `Animate moving a saved item into the cart; combine with a [favorite button](/ui-snippets/favorite-button/) for the save action.` },
      { title: 'Menu and food ordering', text: `Add dishes to an order with satisfying feedback — the arrival-synced badge mirrors a growing food-delivery basket.` },
      { title: 'Digital goods and tickets', text: `Even without shipping, the confirmation state and badge reassure buyers that a licence or ticket was added before checkout.` },
      { icon: 'CODE', title: 'Related: Async Button with Real Progress Fill (Not a Fake Spinner)', desc: 'See the [Async Button with Real Progress Fill (Not a Fake Spinner)](/ui-snippets/async-progress-fill-button/) for a related buttons pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Dual-Hold Safety Button', desc: 'See the [Dual-Hold Safety Button](/ui-snippets/dual-hold-safety-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to a real add-to-cart API?', a: `Replace the 650ms \`setTimeout\` with your actual request: call your cart endpoint, and switch the button to the \`.done\` state in the promise's \`.then\`. Trigger \`flyToCart\` immediately on click for instant feedback (optimistic), or wait for success if you prefer; \`landInCart\` should set the badge to the count returned by the server rather than a local counter.` },
      { q: 'Why does the dot use position:fixed and getBoundingClientRect?', a: `\`getBoundingClientRect\` returns viewport-relative coordinates, which match a \`position: fixed\` element's coordinate system exactly. That means the dot flies to the cart accurately regardless of page scroll, parent overflow, or transforms on ancestors — far more robust than computing offsets through nested \`offsetParent\` chains.` },
      { q: 'How do I respect reduced-motion preferences?', a: `Wrap \`flyToCart\` in a check for \`window.matchMedia('(prefers-reduced-motion: reduce)').matches\` and skip the dot when true, calling \`landInCart\` directly. The button still shows the loading and success states, so the interaction stays clear without the travelling animation.` },
      { q: 'How do I prevent double-adds from fast clicks?', a: `This snippet already guards with a \`busy\` flag and a disabled button during the cycle. For network-backed carts, also debounce the API call and rely on the server returning the authoritative quantity, so even if a click slips through, the displayed count stays correct.` },
      { q: 'How do I use this add-to-cart button in React, Vue, or Angular?', a: `In React, hold the button status ('idle' | 'loading' | 'done') and \`cartCount\` in \`useState\`, and run the fly animation in a click handler using a ref to the cart node. In Vue, use \`ref\`s and bind \`:class\` from the status; trigger the dot in a method. In Angular, track status on the component and use \`[class.loading]\`/\`[class.done]\`. The fly and badge CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the coordinate math on your own — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why flyToCart uses getBoundingClientRect with a fixed-position dot instead of computing offsetParent-relative coordinates, and why the badge count updates in landInCart (triggered by transitionend) rather than immediately on click. The same assistant is useful for optimizing it — asking whether the busy flag and disabled button fully prevent race conditions if the same product is added from two different buttons on the page, or whether the forced reflow via void badge.offsetWidth is the cleanest way to restart the bump keyframe. It's just as good for extending the button: ask it to fly multiple dots for a bulk "add 3" action, support the prefers-reduced-motion media query by skipping the flight animation, or connect the 650ms setTimeout to a real fetch call with proper error handling that reverts the button to idle on failure. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "add to cart" button with a flying animation in plain HTML, CSS, and JavaScript — no libraries, using getBoundingClientRect and a fixed-position element for the flight.

Requirements:
- A button containing three absolutely-centered overlapping elements: a text label, a spinning loader icon, and a checkmark icon, only one of which is visible at a time based on CSS classes.
- Clicking the button must, in order: set a busy guard flag and disable the button so rapid clicks are ignored, switch to a loading state (label fades out, spinner fades in and rotates continuously), launch a small circular element that flies from the button's exact screen position to a cart icon's screen position, and after the flight completes, switch to a success state (green background, checkmark pops in with a spring easing, label changes to "Added") before reverting to idle after a couple of seconds.
- The flying element must be position: fixed, get its start coordinates from the button's getBoundingClientRect() and its end coordinates from the cart icon's getBoundingClientRect() (not from offsetTop/offsetLeft), so the flight lands accurately regardless of scroll position or layout.
- Animate the flying element's transform (translate plus a scale-down) using a cubic-bezier with a slightly negative control point so it travels in a subtle arc rather than a straight line, fading its opacity out simultaneously, and remove the element from the DOM on its transitionend event.
- Only increment a visible cart badge counter and play a shake animation on the cart icon at the moment the flying element's transitionend fires (i.e. when it "arrives"), not at the moment the button was clicked — so the counter change is visually synced to the object landing in the cart.
- Every time the badge updates, force a reflow (reading an element's offsetWidth) before re-adding its "bump" animation class, so the pulse animation restarts correctly even if the previous one hasn't finished.`,
    },
  },
};

export default addToCartButton;
