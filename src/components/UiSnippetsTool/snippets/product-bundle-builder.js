const productBundleBuilder = {
  id: 'product-bundle-builder',
  title: 'Product Bundle Builder',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="pbb-wrap">
  <div class="pbb-products">
    <h3>Build your bundle</h3>
    <p class="pbb-sub">Add 2 items for 5% off, 3+ items for 10% off</p>
    <div class="pbb-grid" id="pbbGrid"></div>
  </div>

  <div class="pbb-summary">
    <h4>Your bundle</h4>
    <div class="pbb-summary-list" id="pbbSummaryList">
      <p class="pbb-empty" id="pbbEmpty">No items added yet</p>
    </div>
    <div class="pbb-totals">
      <div class="pbb-line">
        <span>Subtotal</span>
        <b id="pbbSubtotal">$0.00</b>
      </div>
      <div class="pbb-line pbb-discount-line" id="pbbDiscountLine" hidden>
        <span>Bundle discount (<span id="pbbDiscountPct">0</span>%)</span>
        <b id="pbbDiscountAmt">&minus;$0.00</b>
      </div>
      <div class="pbb-line pbb-total-line">
        <span>Total</span>
        <b id="pbbTotal">$0.00</b>
      </div>
    </div>
    <button type="button" class="pbb-checkout" id="pbbCheckout">Add bundle to cart</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0a12;min-height:100vh;padding:32px 24px;display:flex;align-items:center;justify-content:center}

.pbb-wrap{display:grid;grid-template-columns:1fr 300px;gap:22px;max-width:840px;margin:0 auto;align-items:start}
@media (max-width:680px){.pbb-wrap{grid-template-columns:1fr}}

.pbb-products h3{font-size:18px;font-weight:800;color:#f4f2fb}
.pbb-sub{font-size:12px;color:#8c84a8;margin-top:4px;margin-bottom:16px}

.pbb-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
@media (max-width:420px){.pbb-grid{grid-template-columns:1fr}}
.pbb-product{background:#151222;border:1.5px solid #241f38;border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px;transition:border-color .15s}
.pbb-product.is-selected{border-color:#a78bfa}
.pbb-swatch{width:100%;aspect-ratio:16/10;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:26px}
.pbb-product-name{font-size:13px;font-weight:700;color:#eae6f7}
.pbb-product-price{font-size:12.5px;color:#8c84a8;font-variant-numeric:tabular-nums}
.pbb-add-btn{margin-top:2px;background:#201b34;border:1px solid #322a52;border-radius:8px;padding:8px;font-size:12px;font-weight:700;color:#c9c2e6;cursor:pointer;transition:background .15s,border-color .15s}
.pbb-add-btn:hover{background:#291f47}
.pbb-add-btn.is-added{background:#a78bfa;border-color:#a78bfa;color:#1c1830}

.pbb-summary{background:#12101e;border:1px solid #241f38;border-radius:16px;padding:18px;position:sticky;top:24px}
.pbb-summary h4{font-size:13.5px;font-weight:800;color:#f4f2fb;margin-bottom:12px}
.pbb-summary-list{display:flex;flex-direction:column;gap:8px;margin-bottom:14px;min-height:24px}
.pbb-empty{font-size:12px;color:#655d80}
.pbb-summary-row{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;color:#cdc6e8}
.pbb-summary-row .pbb-sr-name{display:flex;align-items:center;gap:7px;overflow:hidden}
.pbb-sr-swatch{width:20px;height:20px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px}
.pbb-sr-name span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pbb-summary-row b{color:#eae6f7;font-variant-numeric:tabular-nums;white-space:nowrap}
.pbb-sr-remove{background:none;border:none;color:#544d70;cursor:pointer;font-size:14px;padding:2px 4px}
.pbb-sr-remove:hover{color:#f87171}

.pbb-totals{border-top:1px solid #241f38;padding-top:12px;display:flex;flex-direction:column;gap:8px}
.pbb-line{display:flex;align-items:baseline;justify-content:space-between;font-size:12.5px;color:#8c84a8}
.pbb-line b{color:#eae6f7;font-weight:700;font-variant-numeric:tabular-nums}
.pbb-discount-line span{color:#5fd996}
.pbb-discount-line b{color:#3fd68a}
.pbb-discount-line[hidden]{display:none}
.pbb-total-line{padding-top:8px;border-top:1px dashed #241f38;font-size:14px;color:#eae6f7;font-weight:700}
.pbb-total-line b{color:#a78bfa;font-size:17px}

.pbb-checkout{width:100%;margin-top:14px;background:linear-gradient(135deg,#8b5cf6,#a78bfa);border:none;border-radius:10px;padding:11px;color:#fff;font-size:13px;font-weight:700;cursor:pointer;transition:filter .15s}
.pbb-checkout:hover{filter:brightness(1.08)}
.pbb-checkout:disabled{opacity:.45;cursor:not-allowed;filter:none}`,

  js: `var PRODUCTS = [
  { id: 'case',    name: 'Protective Case',   price: 24,  emoji: '\\uD83D\\uDCE6', bg: '#2b2440' },
  { id: 'charger', name: 'Fast Charger',      price: 29,  emoji: '\\u26A1',       bg: '#243a2f' },
  { id: 'strap',   name: 'Wrist Strap',       price: 12,  emoji: '\\u2328\\uFE0F', bg: '#3a2a24' },
  { id: 'screen',  name: 'Screen Protector',  price: 15,  emoji: '\\uD83D\\uDEE1\\uFE0F', bg: '#243040' },
];

var selected = [];

var gridEl = document.getElementById('pbbGrid');
var summaryListEl = document.getElementById('pbbSummaryList');
var emptyMsgEl = document.getElementById('pbbEmpty');
var subtotalEl = document.getElementById('pbbSubtotal');
var discountLine = document.getElementById('pbbDiscountLine');
var discountPctEl = document.getElementById('pbbDiscountPct');
var discountAmtEl = document.getElementById('pbbDiscountAmt');
var totalEl = document.getElementById('pbbTotal');
var checkoutBtn = document.getElementById('pbbCheckout');

function fmtMoney(n) {
  return '$' + n.toFixed(2);
}

function discountRateFor(count) {
  if (count >= 3) return 0.10;
  if (count === 2) return 0.05;
  return 0;
}

function renderProducts() {
  gridEl.innerHTML = PRODUCTS.map(function (p) {
    var isSelected = selected.indexOf(p.id) !== -1;
    return '<div class="pbb-product' + (isSelected ? ' is-selected' : '') + '" data-id="' + p.id + '">' +
      '<div class="pbb-swatch" style="background:' + p.bg + '">' + p.emoji + '</div>' +
      '<span class="pbb-product-name">' + p.name + '</span>' +
      '<span class="pbb-product-price">' + fmtMoney(p.price) + '</span>' +
      '<button type="button" class="pbb-add-btn' + (isSelected ? ' is-added' : '') + '" data-id="' + p.id + '">' + (isSelected ? '\\u2713 Added' : '+ Add to bundle') + '</button>' +
    '</div>';
  }).join('');
}

function renderSummary() {
  var items = PRODUCTS.filter(function (p) { return selected.indexOf(p.id) !== -1; });

  if (items.length === 0) {
    summaryListEl.innerHTML = '<p class="pbb-empty" id="pbbEmpty">No items added yet</p>';
  } else {
    summaryListEl.innerHTML = items.map(function (p) {
      return '<div class="pbb-summary-row" data-id="' + p.id + '">' +
        '<span class="pbb-sr-name"><span class="pbb-sr-swatch" style="background:' + p.bg + '">' + p.emoji + '</span><span>' + p.name + '</span></span>' +
        '<b>' + fmtMoney(p.price) + ' <button type="button" class="pbb-sr-remove" data-id="' + p.id + '">&times;</button></b>' +
      '</div>';
    }).join('');
  }

  var subtotal = items.reduce(function (sum, p) { return sum + p.price; }, 0);
  var rate = discountRateFor(items.length);
  var discount = subtotal * rate;
  var total = subtotal - discount;

  subtotalEl.textContent = fmtMoney(subtotal);

  if (rate > 0) {
    discountLine.hidden = false;
    discountPctEl.textContent = Math.round(rate * 100);
    discountAmtEl.textContent = '−' + fmtMoney(discount);
  } else {
    discountLine.hidden = true;
  }

  totalEl.textContent = fmtMoney(total);
  checkoutBtn.disabled = items.length === 0;
}

gridEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.pbb-add-btn');
  if (!btn) return;
  var id = btn.dataset.id;
  var idx = selected.indexOf(id);
  if (idx === -1) {
    selected.push(id);
  } else {
    selected.splice(idx, 1);
  }
  renderProducts();
  renderSummary();
});

summaryListEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.pbb-sr-remove');
  if (!btn) return;
  var id = btn.dataset.id;
  selected = selected.filter(function (s) { return s !== id; });
  renderProducts();
  renderSummary();
});

checkoutBtn.addEventListener('click', function () {
  if (selected.length === 0) return;
  alert('Bundle added to cart! (wire this up to your real cart)');
});

renderProducts();
renderSummary();`,

  seo: {
    title: 'Product Bundle Builder — Free Build-Your-Own-Bundle UI (HTML/CSS/JS)',
    description: `A build-your-own bundle selector with addable product cards, a running summary panel, and a discount that increases automatically as more items are added. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Product Bundle Builder — A Discount That Grows as the Cart Does',
      description: `"Build your own bundle" is a proven e-commerce upsell: let a shopper pick their own combination of add-ons and reward them with a bigger discount the more they add. This snippet builds that interaction in plain HTML, CSS, and vanilla JavaScript — a grid of addable product cards, a running summary sidebar, and a discount rate that automatically steps up as the bundle grows.

**One selection array, two views**

Selected product ids live in a single \`selected\` array. \`renderProducts()\` and \`renderSummary()\` both read from it — the former to mark which product cards show "Added" instead of "Add to bundle," the latter to build the summary list, subtotal, discount, and total. Adding or removing an item (from either the product grid or the summary's own remove button) mutates that one array and re-renders both views, so the grid and the summary can never fall out of sync.

**A discount that scales with commitment**

\`discountRateFor(count)\` is a tiny, explicit function: 0% for zero or one item, 5% for exactly two, and 10% for three or more. Because it's a pure function of the selected count, the discount badge and dollar amount always match the actual rule, and changing the thresholds or rates later is a one-line edit rather than a hunt through scattered conditionals.

**Discount shown as real savings, not just a lower number**

The summary shows a full subtotal (the sum of every selected item's price), then a distinct discount line with both the percentage and the dollar amount it represents, and finally the total. For two items — say a $24 case and a $29 charger — the subtotal is $53.00, the 5% discount is $2.65, and the total is $50.35. For three items adding a $12 strap, the subtotal becomes $65.00, the 10% discount is $6.50, and the total is $58.50 — visibly showing the shopper that the *third* item didn't just add its own price, it also improved the discount rate on everything.

**Where it fits**

Pair it with a [product card](/ui-snippets/product-card/) grid for the base catalog, a [product quick view](/ui-snippets/product-quick-view/) for item detail, or a [coupon card](/ui-snippets/coupon-card/) / [promo-code-input](/ui-snippets/promo-code-input/) for stacking a manual code on top of the bundle discount.

**Customizing it**

Swap in your real product catalog and images, adjust the discount tiers and thresholds, add a maximum bundle size, or add per-category exclusivity (e.g. only one item from a "color" group) if your bundles need that constraint.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 4-product grid renders with an empty bundle summary.` },
      { title: 'Add a product', text: `Click "+ Add to bundle"; it appears in the summary at full price.` },
      { title: 'Add a second product', text: `The summary shows a 5% discount line automatically.` },
      { title: 'Add a third product', text: `The discount jumps to 10% — recalculated on every add.` },
      { title: 'Remove an item', text: `Use the × in the summary or toggle the product card; the discount tier adjusts down.` },
      { title: 'Wire up checkout', text: `Replace the alert() in the checkout button with your real add-to-cart flow.` },
    ] },
    features: [
      { title: 'Single source of truth', text: `One selected array drives both the product grid and the summary panel.` },
      { title: 'Tiered auto-discount', text: `5% at 2 items, 10% at 3+, computed by one pure function of the count.` },
      { title: 'Discount shown as real savings', text: `Subtotal, percentage, dollar discount, and total are all shown separately.` },
      { title: 'Two removal paths', text: `Deselect from the product card or remove directly from the summary — both stay in sync.` },
      { title: 'Disabled empty checkout', text: `The checkout button disables itself when no items are selected.` },
      { title: 'Responsive layout', text: `Sidebar summary collapses to a stacked layout on narrow viewports.` },
      { title: 'Sticky summary panel', text: `The bundle summary stays visible while scrolling a longer product grid.` },
      { title: 'Framework-agnostic core', text: `The selection array and discount function port directly to any component model.` },
    ],
    useCases: [
      { title: 'E-commerce upsells', text: `Let shoppers assemble their own accessory bundle with a growing discount.` },
      { title: 'Subscription add-on selection', text: `Apply the same pattern to SaaS add-on modules instead of physical products.` },
      { title: 'Gift set builders', text: `Combine with a [product card](/ui-snippets/product-card/) grid for a curated gift-bundle flow.` },
      { title: 'Cart upsell modules', text: `Show a mini version of this builder inside a cart drawer to grow order value.` },
      { title: 'Promotional campaigns', text: `Pair with a [coupon card](/ui-snippets/coupon-card/) for stacking a seasonal code on top.` },
      { title: 'Quote-style B2B selection', text: `Adapt for a services or add-on selector where bulk selection earns a discount.` },
    ],
    faqs: [
      { q: 'How does the discount tier get calculated?', a: `discountRateFor(count) is a small pure function: 0 or 1 selected items get no discount, exactly 2 items get 5% off the subtotal, and 3 or more items get 10% off. It only depends on how many items are currently selected, so the discount badge and dollar amount are always in sync with the actual bundle contents.` },
      { q: 'Can you walk through the math for a 3-item bundle?', a: `With a $24 case, $29 charger, and $12 strap selected, the subtotal is 24 + 29 + 12 = $65.00. At the 3-item tier the discount rate is 10%, so the discount is 65.00 × 0.10 = $6.50, and the total is 65.00 − 6.50 = $58.50.` },
      { q: 'What keeps the product grid and the summary panel in sync?', a: `Both views read from the same selected array of product ids — there's no separate "cart" state. Any click that adds or removes an item (from the grid's Add button or the summary's × button) mutates that one array and immediately re-renders both renderProducts() and renderSummary(), so they can never disagree.` },
      { q: 'What happens if a user removes an item and drops below a discount tier?', a: `renderSummary() recomputes discountRateFor() from the new, smaller selected count on every change, so removing an item immediately recalculates and can show a lower discount tier (or hide the discount line entirely if only one item remains) — it's always freshly derived, never cached from a prior state.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move the selected array into component state (useState/ref) and derive the subtotal, discount rate, discount amount, and total with useMemo or a computed property whenever it changes. The PRODUCTS catalog and discountRateFor() function port over unchanged as plain data and a pure function.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the tiered-discount logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how discountRateFor(count) turns the number of selected items into a discount percentage, and how that single function keeps the product grid's "Added" badges and the summary panel's discount line from ever disagreeing, since both derive from the same selected array. The same assistant can help you extend the tiers — ask it to add a fourth tier (e.g. 15% off at 5+ items), cap the maximum discount, or add a mutually-exclusive product group (like only one color variant per bundle). It's also useful for hardening the checkout step: ask how you'd replace the alert() placeholder with a real POST to a cart API, including error handling if an item goes out of stock between selection and checkout. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "build your own bundle" product selector in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- Render a grid of at least 4 selectable product cards, each with a name, a price, and an "Add to bundle" button that toggles to a visibly different "Added" state when clicked again.
- Maintain exactly one array of selected product ids as the single source of truth — both the product grid's added/not-added state and a separate running summary panel must derive from this one array, never maintain separate state.
- The summary panel must list each selected item with its name and price, plus its own remove button, and must show a subtotal (sum of selected item prices).
- Implement a tiered bundle discount as a pure function of the selected item count: 0% for 0-1 items, 5% for exactly 2 items, and 10% for 3 or more items. Show the discount as a separate line item with both its percentage and its dollar amount, only when the discount is greater than zero, followed by a final total (subtotal minus discount).
- Selecting or deselecting an item from either the product grid or the summary panel's remove button must update the shared selected array and re-render both the grid and the summary so they never fall out of sync.
- Disable the final "add bundle to cart" button when no items are selected, and re-enable it once at least one item is selected.
- Double-check that the discount and total math is arithmetically correct for at least one worked multi-item example.`,
    },
  },
};

export default productBundleBuilder;
