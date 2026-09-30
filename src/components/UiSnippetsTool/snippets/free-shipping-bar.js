const freeShippingBar = {
  id: 'free-shipping-bar',
  title: 'Free Shipping Progress Bar',
  lastmod: '2026-06-22',
  category: 'dashboards',
  html: `<div class="fsb-card">
  <div class="fsb-head">
    <span class="fsb-truck" id="fsbTruck">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="13" height="10" rx="1"/><path d="M14 9h4l3 3v4h-7z"/><circle cx="6" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>
    </span>
    <p class="fsb-msg" id="fsbMsg"></p>
  </div>

  <div class="fsb-track">
    <div class="fsb-fill" id="fsbFill"></div>
    <span class="fsb-flag" id="fsbFlag">🎉</span>
  </div>

  <div class="fsb-foot">
    <span>Cart: <b id="fsbCart">$0.00</b></span>
    <span>Free at <b>$75.00</b></span>
  </div>

  <div class="fsb-demo">
    <button type="button" data-add="14.5">+ Add $14.50 item</button>
    <button type="button" data-add="29">+ Add $29.00 item</button>
    <button type="button" data-add="-12" class="fsb-remove">− Remove $12.00</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.fsb-card{background:#fff;border-radius:16px;padding:20px;width:100%;max-width:400px;box-shadow:0 18px 44px rgba(15,23,42,.1)}

.fsb-head{display:flex;align-items:center;gap:11px;margin-bottom:14px}
.fsb-truck{width:38px;height:38px;border-radius:50%;background:#eef2ff;color:#6366f1;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .3s,color .3s}
.fsb-truck.done{background:#dcfce7;color:#16a34a}
.fsb-msg{font-size:13.5px;color:#334155;line-height:1.45;font-weight:600}
.fsb-msg b{color:#0f172a;font-weight:800}
.fsb-msg .fsb-amt{color:#6366f1;font-weight:800}
.fsb-msg.done{color:#16a34a}

.fsb-track{position:relative;height:10px;background:#f1f5f9;border-radius:999px;margin-bottom:11px}
.fsb-fill{height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#818cf8,#6366f1);transition:width .5s cubic-bezier(.4,0,.2,1)}
.fsb-fill.done{background:linear-gradient(90deg,#34d399,#16a34a)}
.fsb-flag{position:absolute;top:50%;right:-2px;transform:translate(50%,-50%) scale(0);font-size:15px;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
.fsb-flag.show{transform:translate(50%,-50%) scale(1)}

.fsb-foot{display:flex;justify-content:space-between;font-size:12px;color:#94a3b8;margin-bottom:16px}
.fsb-foot b{color:#475569}

.fsb-demo{display:flex;flex-wrap:wrap;gap:8px;border-top:1px solid #f1f5f9;padding-top:14px}
.fsb-demo button{flex:1;min-width:120px;border:1.5px solid #e2e8f0;background:#fff;border-radius:9px;padding:9px;font-size:12.5px;font-weight:700;color:#1e293b;cursor:pointer;transition:border-color .15s,background .15s}
.fsb-demo button:hover{border-color:#6366f1;background:#f8fafc}
.fsb-demo .fsb-remove{color:#dc2626}
.fsb-demo .fsb-remove:hover{border-color:#fca5a5}`,

  js: `var THRESHOLD = 75;
var cart = 0;

var fill = document.getElementById('fsbFill');
var truck = document.getElementById('fsbTruck');
var flag = document.getElementById('fsbFlag');
var msgEl = document.getElementById('fsbMsg');

function money(n) { return '$' + n.toFixed(2); }

function render() {
  var pct = Math.min(100, (cart / THRESHOLD) * 100);
  fill.style.width = pct + '%';
  document.getElementById('fsbCart').textContent = money(cart);

  var qualified = cart >= THRESHOLD;
  fill.classList.toggle('done', qualified);
  truck.classList.toggle('done', qualified);
  flag.classList.toggle('show', qualified);
  msgEl.classList.toggle('done', qualified);

  if (cart <= 0) {
    msgEl.innerHTML = 'Add <span class="fsb-amt">' + money(THRESHOLD) + '</span> to unlock <b>free shipping</b>';
  } else if (qualified) {
    msgEl.innerHTML = '🎉 You\\'ve unlocked <b>free shipping!</b>';
  } else {
    var remaining = THRESHOLD - cart;
    msgEl.innerHTML = 'You\\'re <span class="fsb-amt">' + money(remaining) + '</span> away from <b>free shipping</b>';
  }
}

document.querySelector('.fsb-demo').addEventListener('click', function (e) {
  var btn = e.target.closest('button');
  if (!btn) return;
  cart = Math.max(0, cart + parseFloat(btn.dataset.add));
  render();
});

render();`,

  seo: {
    title: 'Free Shipping Progress Bar — Cart Upsell HTML CSS',
    description: `A "you're $X away from free shipping" progress bar that updates as the cart total changes, with a celebratory unlocked state. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Free Shipping Progress Bar — Cart Threshold Upsell with Live Progress',
      description: `"You're $12.50 away from free shipping" is one of the most reliable average-order-value boosters in e-commerce — a small, honest nudge that turns a shipping fee into a goal worth adding one more item to reach. This snippet builds the complete pattern in plain HTML, CSS, and vanilla JavaScript: a progress bar that fills as the cart total rises, a message that always tells the shopper exactly how much more they need, and a celebratory unlocked state once they cross the threshold.

**A message that adapts to three states**

The headline text isn't static — it rewrites itself based on where the cart sits relative to the threshold. At an empty cart it frames the opportunity ("Add $75.00 to unlock free shipping"); partway there it counts down the exact gap ("You're $12.50 away from free shipping"); and once qualified it celebrates ("🎉 You've unlocked free shipping!"). Showing the precise remaining amount is what makes the pattern work — a vague "spend more for free shipping" gives the shopper no concrete target, while "$12.50 away" reads as an achievable, specific goal, often less than the shipping fee they'd otherwise pay.

**Progress that fills and then transforms**

The bar's fill width is the cart total as a percentage of the threshold, capped at 100% so an over-threshold cart doesn't overflow. Crossing the line isn't just "100% full" — the fill gradient shifts from indigo to green, the truck icon's badge turns green, and a flag emoji pops in at the end of the track with a spring animation, so qualifying *feels* like an accomplishment rather than a quiet state change. Every transition uses \`width\` and \`transform\` only on fixed-size elements, so the animation stays smooth and survives conversion to every framework export.

**Driven by the real cart total**

In this demo, buttons add and remove mock items to drive the bar, but the only input that matters is the running cart subtotal — \`cart\`. In a real store you call \`render()\` whenever the cart changes (an item added, removed, or quantity adjusted), passing the current subtotal. The component is deliberately a pure function of that one number: there's no internal cart state to keep in sync, which makes it trivial to drop into an existing cart, a slide-out drawer, or a sticky header bar.

**Honest by design**

The pattern only works if the math is real. The threshold and the remaining amount are computed directly from the live total, never faked, and the "remove item" button demonstrates that the bar tracks backward correctly too — drop below the threshold and it returns to the countdown message and indigo fill. A free-shipping bar that lies (showing "almost there!" regardless of the cart) erodes the exact trust it's meant to build.

**Where to place it**

This component fits anywhere the cart total is visible: the top of a cart page, inside a [mini cart](/ui-snippets/mini-cart/) or slide-out drawer, in a sticky site-header bar, or in the order summary at checkout. Because it's compact and self-contained, the same instance can even live in multiple places, each calling \`render()\` from the shared cart total.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A free-shipping progress card renders at $0, showing how much to add to unlock free shipping at $75.` },
      { title: 'Add items', text: `Click the "+ Add" demo buttons — the bar fills, the cart total rises, and the message counts down the remaining amount.` },
      { title: 'Cross the threshold', text: `Add enough to reach $75 — the bar turns green, a flag pops in, and the message celebrates "free shipping unlocked".` },
      { title: 'Remove an item', text: `Click "− Remove" to drop below the threshold and watch the bar track backward to the countdown state.` },
      { title: 'Set your own threshold', text: `Change the THRESHOLD constant to your store's free-shipping minimum — every message and the fill recalculate from it.` },
      { title: 'Connect your real cart', text: `Call render() whenever the cart changes, setting the cart variable to the live subtotal from your cart state or API.` },
    ] },
    features: [
      { title: 'Three-state adaptive message', text: `The headline rewrites itself for empty, in-progress ("$12.50 away"), and unlocked carts — always showing the exact gap.` },
      { title: 'Live progress fill', text: `The bar width is the cart total as a percentage of the threshold, capped at 100% so an over-threshold cart never overflows.` },
      { title: 'Celebratory unlocked state', text: `Crossing the threshold shifts the fill to green, turns the truck badge green, and pops in a flag with a spring animation.` },
      { title: 'Tracks backward correctly', text: `Removing items drops the bar and returns the countdown message — the math is always honest, never faked.` },
      { title: 'Pure function of the cart total', text: `The component has no internal cart state — pass the live subtotal and it renders, making it trivial to drop anywhere.` },
      { title: 'Configurable threshold', text: `One THRESHOLD constant drives every message and the fill percentage — change it to your store's minimum.` },
      { title: 'Animation-safe transitions', text: `Width and transform-only animations on fixed-size elements stay smooth across every framework export.` },
      { title: 'Currency-formatted amounts', text: `All totals and gaps use toFixed(2) so they read like real money, not raw floats.` },
    ],
    useCases: [
      { title: 'Cart page upsell', text: `Place it at the top of the cart to nudge shoppers toward the free-shipping threshold — pair with an [order summary](/ui-snippets/order-summary/).` },
      { title: 'Slide-out mini cart', text: `Show progress inside a [mini cart](/ui-snippets/mini-cart/) drawer so the nudge appears the moment an item is added.` },
      { title: 'Sticky header bar', text: `Run a slim version in a site-wide header so the goal stays visible across the whole shopping session.` },
      { title: 'Checkout order summary', text: `Reinforce the threshold next to the totals, pairing with a [promo code input](/ui-snippets/promo-code-input/) for stacked incentives.` },
      { title: 'Tiered rewards and loyalty', text: `Adapt the same fill-to-threshold pattern for "spend $X to earn a reward" or loyalty-point milestones.` },
      { title: 'Learning threshold-progress UI', text: `A clean example of a message that adapts to a value crossing a boundary — compare with a [budget tracker card](/ui-snippets/budget-tracker-card/) for multi-category progress.` },
      { icon: 'CODE', title: 'Related: Admin Impersonation Mode Banner — ', desc: 'See the [Admin Impersonation Mode Banner — ](/ui-snippets/impersonation-mode-banner/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to my real cart total?', a: `The component is a pure function of one number — the cart subtotal. Set the cart variable to your live subtotal and call render() whenever the cart changes (item added, removed, or quantity updated). If your cart is in a store or context, subscribe to it and re-render on change; the bar has no internal cart state to keep in sync.` },
      { q: 'Should the threshold count the subtotal before or after discounts?', a: `Match whatever your shipping policy actually enforces — most stores qualify free shipping on the post-discount subtotal (excluding tax and shipping itself). Compute the same value here that your backend uses to grant free shipping, or the bar will promise something checkout won't honor.` },
      { q: 'How do I handle a tiered structure like "free shipping at $75, free gift at $125"?', a: `Track multiple thresholds in an array, find the next unmet one, and render progress toward it with its own message; once passed, advance to the next tier. The fill percentage is computed against the current target threshold rather than a single fixed value.` },
      { q: 'Is showing a free-shipping nudge actually effective?', a: `It's one of the most consistently effective average-order-value tactics in e-commerce because it gives a concrete, often-small target ("$12.50 away") that's frequently less than the shipping fee itself — but it only works if the math is real. A bar that always says "almost there" regardless of the cart erodes trust; compute the gap honestly from the live total.` },
      { q: 'How do I use this free shipping bar in React, Vue, or Angular?', a: `In React, pass the cart subtotal as a prop and derive the percentage, state, and message with useMemo, re-rendering on cart change; in Vue, use a computed over the cart total; in Angular, use an @Input and getters. The threshold math and message logic are plain JavaScript and need no changes.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the render function's branching by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why render() is written as a pure function of the single cart variable with no internal state of its own, and why the fill percentage is explicitly capped at 100 with Math.min even though the cart total itself can keep growing past the threshold. The same assistant can help optimize it — ask whether the three-branch message logic (empty, in-progress, qualified) could be simplified without losing the exact wording nuance for each state, or whether the demo's data-add buttons approach is the cleanest way to wire this into a real cart's add/remove events. It's also useful for extending the bar: have it support a multi-tier threshold system ("free shipping at $75, free gift at $125"), animate the dollar amount counting down instead of jumping, or add a subtle shake on the flag when it first pops in. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "free shipping progress bar" cart upsell widget in plain HTML, CSS, and JavaScript — no libraries, and the component must be a pure function of a single cart-total number so it can be dropped into any real cart later.

Requirements:
- A card showing a status icon, an adaptive message line, a progress bar track with a fill, a small flag/celebration icon positioned at the end of the track, and a footer showing the current cart total and the free-shipping threshold amount.
- Write a single render function that takes no arguments beyond reading one shared "cart" variable representing the subtotal, and derives everything else from it and a THRESHOLD constant — there must be no other mutable state driving the display.
- The fill bar's width must be the cart total as a percentage of the threshold, explicitly capped at 100% so a cart that exceeds the threshold never overflows the track.
- The message text must have exactly three variants driven by the cart value: when the cart is at or below zero, invite the user to add the full threshold amount; when the cart is between zero and the threshold, state the exact remaining dollar amount needed, computed as threshold minus cart, formatted as currency; when the cart meets or exceeds the threshold, show a celebratory "unlocked" message.
- Crossing the threshold must trigger a visible transformation, not just a value change: the fill's gradient color must switch from one color scheme to another, an icon badge must recolor to match, and the flag element must animate in from scale zero to scale one with a springy easing, only once qualified.
- Include demo buttons that add or subtract fixed dollar amounts from the cart variable and re-run the render function, including at least one "remove" button, to prove the bar correctly reverses back to the countdown message and original colors when the cart drops back below the threshold.
- Format every dollar amount with exactly two decimal places.`,
    },
  },
};

export default freeShippingBar;
