const promoCodeInput = {
  id: 'promo-code-input',
  title: 'Promo Code Input',
  lastmod: '2026-06-22',
  category: 'forms',
  html: `<div class="pci-card">
  <h3>Order summary</h3>

  <div class="pci-line"><span>Subtotal</span><span id="pciSubtotal">$240.00</span></div>
  <div class="pci-line pci-discount" id="pciDiscountLine" hidden><span id="pciDiscountLabel">Discount</span><span id="pciDiscount">−$0.00</span></div>
  <div class="pci-line"><span>Shipping</span><span>$8.00</span></div>

  <div class="pci-promo">
    <label for="pciInput">Promo code</label>
    <div class="pci-applied" id="pciApplied" hidden>
      <span class="pci-applied-tag"><b id="pciAppliedCode"></b> applied</span>
      <button type="button" id="pciRemove" aria-label="Remove code">Remove</button>
    </div>
    <form class="pci-form" id="pciForm" novalidate>
      <input type="text" id="pciInput" placeholder="Enter code" autocomplete="off" spellcheck="false">
      <button type="submit" id="pciApply">Apply</button>
    </form>
    <p class="pci-msg" id="pciMsg" hidden></p>
  </div>

  <div class="pci-line pci-total"><span>Total</span><span id="pciTotal">$248.00</span></div>

  <p class="pci-hint">Try <b>SAVE20</b>, <b>FREESHIP</b>, or <b>HALFOFF</b>.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.pci-card{background:#fff;border-radius:16px;padding:22px;width:100%;max-width:380px;box-shadow:0 18px 44px rgba(15,23,42,.1)}
.pci-card h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:16px}

.pci-line{display:flex;justify-content:space-between;font-size:13.5px;color:#475569;margin-bottom:10px;font-variant-numeric:tabular-nums}
.pci-line[hidden]{display:none}
.pci-discount{color:#16a34a;font-weight:700}
.pci-total{border-top:1.5px solid #e2e8f0;padding-top:13px;margin-top:3px;font-size:16px;font-weight:800;color:#0f172a}

.pci-promo{border-top:1px dashed #e2e8f0;border-bottom:1px dashed #e2e8f0;padding:15px 0;margin:14px 0}
.pci-promo label{display:block;font-size:11.5px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.03em;margin-bottom:9px}

.pci-form{display:flex;gap:8px}
.pci-form[hidden]{display:none}
.pci-form input{flex:1;border:1.5px solid #e2e8f0;border-radius:9px;padding:10px 12px;font-size:13.5px;font-family:inherit;color:#0f172a;text-transform:uppercase;letter-spacing:.04em;transition:border-color .15s,box-shadow .15s}
.pci-form input:focus{outline:none;border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15)}
.pci-form input.invalid{border-color:#ef4444;box-shadow:0 0 0 3px rgba(239,68,68,.12)}
.pci-form button{background:#0f172a;color:#fff;border:none;border-radius:9px;padding:0 18px;font-size:13px;font-weight:700;cursor:pointer;transition:background .15s,opacity .15s}
.pci-form button:hover{background:#1e293b}
.pci-form button:disabled{opacity:.6;cursor:default}

.pci-applied{display:flex;align-items:center;justify-content:space-between;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:9px;padding:9px 12px}
.pci-applied[hidden]{display:none}
.pci-applied-tag{font-size:12.5px;color:#047857;font-weight:600;display:flex;align-items:center;gap:5px}
.pci-applied-tag::before{content:'✓';font-weight:800}
.pci-applied-tag b{font-weight:800}
.pci-applied button{background:none;border:none;color:#059669;font-size:12px;font-weight:700;cursor:pointer;text-decoration:underline}

.pci-msg{font-size:12px;font-weight:600;margin-top:8px}
.pci-msg.err{color:#dc2626}
.pci-msg.ok{color:#16a34a}

.pci-hint{font-size:11.5px;color:#94a3b8;margin-top:14px;text-align:center}
.pci-hint b{color:#64748b;font-weight:700}`,

  js: `var SUBTOTAL = 240;
var SHIPPING = 8;
var CODES = {
  SAVE20:   { type: 'percent', value: 20, label: 'SAVE20 (20% off)' },
  HALFOFF:  { type: 'percent', value: 50, label: 'HALFOFF (50% off)' },
  FREESHIP: { type: 'shipping', value: SHIPPING, label: 'FREESHIP (free shipping)' },
  TENOFF:   { type: 'fixed', value: 10, label: 'TENOFF ($10 off)' },
};
var applied = null;

var form = document.getElementById('pciForm');
var input = document.getElementById('pciInput');
var applyBtn = document.getElementById('pciApply');
var msg = document.getElementById('pciMsg');

function money(n) { return '$' + n.toFixed(2); }

function discountAmount(code) {
  var c = CODES[code];
  if (c.type === 'percent') return SUBTOTAL * (c.value / 100);
  if (c.type === 'fixed') return Math.min(c.value, SUBTOTAL);
  if (c.type === 'shipping') return c.value;          // offsets shipping
  return 0;
}

function recalc() {
  var discount = applied ? discountAmount(applied) : 0;
  var line = document.getElementById('pciDiscountLine');
  if (applied) {
    line.hidden = false;
    document.getElementById('pciDiscountLabel').textContent = CODES[applied].type === 'shipping' ? 'Free shipping' : 'Discount (' + applied + ')';
    document.getElementById('pciDiscount').textContent = '−' + money(discount);
  } else {
    line.hidden = true;
  }
  var total = SUBTOTAL + SHIPPING - discount;
  document.getElementById('pciTotal').textContent = money(Math.max(0, total));
}

function showMsg(text, ok) {
  msg.textContent = text;
  msg.className = 'pci-msg ' + (ok ? 'ok' : 'err');
  msg.hidden = false;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var code = input.value.trim().toUpperCase();
  input.classList.remove('invalid');

  if (!code) { input.classList.add('invalid'); showMsg('Enter a promo code first.', false); return; }
  if (applied === code) { showMsg('That code is already applied.', false); return; }
  if (!CODES[code]) { input.classList.add('invalid'); showMsg('"' + code + '" is not a valid code.', false); return; }

  applied = code;
  recalc();
  document.getElementById('pciForm').hidden = true;
  document.getElementById('pciMsg').hidden = true;
  document.getElementById('pciAppliedCode').textContent = code;
  document.getElementById('pciApplied').hidden = false;
  showMsg(CODES[code].label + ' applied!', true);
});

document.getElementById('pciRemove').addEventListener('click', function () {
  applied = null;
  recalc();
  document.getElementById('pciApplied').hidden = true;
  document.getElementById('pciForm').hidden = false;
  input.value = '';
  msg.hidden = true;
  input.focus();
});

document.getElementById('pciSubtotal').textContent = money(SUBTOTAL);
recalc();`,

  seo: {
    title: 'Promo Code Input — Apply Coupon HTML CSS JS',
    description: `A checkout promo-code field that validates coupons, applies percent/fixed/shipping discounts, and updates the order total live. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Promo Code Input — Coupon Validation, Discount Types & Live Order Total',
      description: `Almost every checkout has a "promo code" or "discount code" field, and it's deceptively easy to get wrong: codes need validating, different coupon types calculate differently, the order total must update without a page reload, and the user needs clear feedback whether a code worked or not. This snippet builds a complete, correct promo-code experience in plain HTML, CSS, and vanilla JavaScript — supporting percentage, fixed-amount, and free-shipping coupons, with an applied state, a remove control, and a live-recalculating total.

**Three coupon types, one calculation function**

Real stores run more than one kind of discount, so \`discountAmount()\` handles three: \`percent\` (20% off the subtotal), \`fixed\` (a flat $10 off, clamped so it never exceeds the subtotal and produces a negative price), and \`shipping\` (offsets the shipping line for free delivery). Each code in the \`CODES\` map declares its type and value, so adding a new coupon is a one-line data change, not new logic. The total always recomputes as \`subtotal + shipping − discount\`, floored at zero.

**Validation that explains itself**

Submitting a code runs through ordered checks, each with a specific message rather than a generic failure: an empty field ("Enter a promo code first"), a code that's already applied ("That code is already applied"), and an unrecognised code ("'BOGUS' is not a valid code"). Invalid input also flashes a red border on the field. This specificity matters at checkout — a shopper who typed a code from an email needs to know whether they fat-fingered it or it simply expired, not just that "something went wrong."

**Case- and whitespace-insensitive matching**

Codes are normalised with \`trim().toUpperCase()\` before lookup, and the input is visually uppercased via CSS, so "save20", " SAVE20 ", and "Save20" all resolve to the same coupon. This removes the single most common reason a valid code "doesn't work" — invisible whitespace or a lowercase letter — without the user ever having to think about it.

**Applied and remove states**

A successfully applied code hides the input and shows a green confirmation chip ("✓ SAVE20 applied") with a Remove link. Removing it restores the input, clears the discount line, recomputes the total, and refocuses the field — so a shopper can swap one code for a better one without confusion. The discount line itself only appears when a code is active, and its label adapts ("Discount (SAVE20)" vs "Free shipping") to match the coupon type.

**Where the real validation lives**

Client-side code-matching is for instant feedback only — it must never be the source of truth, because anyone can read the \`CODES\` map in the page source. In production the field still gives immediate UX, but the authoritative check (does this code exist, is it expired, is it limited to this customer, does it stack) happens server-side when the order is priced and again when it's placed. The FAQs cover wiring the front end to that real validation endpoint while keeping this snippet's instant-feedback feel.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An order summary renders with a subtotal, shipping, total, and a promo-code field. Try SAVE20, FREESHIP, or HALFOFF.` },
      { title: 'Apply a valid code', text: `Enter SAVE20 and click Apply — a discount line appears, the total drops, and a green "applied" chip replaces the field.` },
      { title: 'See validation errors', text: `Enter a made-up code or leave it blank — a specific red message explains exactly what's wrong, and the field flags invalid.` },
      { title: 'Remove an applied code', text: `Click Remove on the applied chip — the discount clears, the total restores, and the input comes back focused for a new code.` },
      { title: 'Add your own coupons', text: `Add entries to the CODES map with a type (percent / fixed / shipping) and value — no new logic needed.` },
      { title: 'Validate codes server-side', text: `Replace the client-side CODES lookup with a fetch to your coupon-validation endpoint, keeping the same applied/error UI states.` },
    ] },
    features: [
      { title: 'Percent, fixed, and free-shipping coupons', text: `One discountAmount() function handles three coupon types, each declared as data in the CODES map.` },
      { title: 'Specific validation messages', text: `Empty, duplicate, and invalid codes each get a distinct message instead of a generic failure.` },
      { title: 'Case- and whitespace-insensitive', text: `trim().toUpperCase() matching means "save20", " SAVE20 ", and "Save20" all resolve to the same coupon.` },
      { title: 'Live-recalculating total', text: `Applying or removing a code recomputes subtotal + shipping − discount instantly, floored at zero.` },
      { title: 'Applied state with remove', text: `A successful code shows a green confirmation chip with a Remove link that restores the input and refocuses it.` },
      { title: 'Adaptive discount line', text: `The discount row only shows when active and labels itself by coupon type ("Discount (SAVE20)" vs "Free shipping").` },
      { title: 'Fixed-discount clamping', text: `A flat-amount coupon never exceeds the subtotal, so the total can't go negative.` },
      { title: 'Ready for server-side validation', text: `Swap the client CODES lookup for a fetch to your real coupon API while keeping the instant-feedback UI.` },
    ],
    useCases: [
      { title: 'E-commerce checkout', text: `The standard discount-code field in a cart or checkout summary — pair with an [order summary](/ui-snippets/order-summary/) and a [free shipping bar](/ui-snippets/free-shipping-bar/).` },
      { title: 'Subscription and SaaS billing', text: `Apply a launch or referral coupon to a plan before payment, recalculating the recurring total.` },
      { title: 'Event and ticket purchases', text: `Let attendees redeem early-bird or partner codes against a ticket order.` },
      { title: 'Course and digital-product sales', text: `Accept a discount code on a one-off purchase, pairing with a [promo or social proof popup](/ui-snippets/exit-intent-popup/) that delivered the code.` },
      { title: 'Booking and reservation flows', text: `Apply a promotional rate code to a booking total before confirming.` },
      { title: 'Learning multi-state form patterns', text: `A reference for input → applied → removed state transitions and typed calculations in one small component.` },
    ],
    faqs: [
      { q: 'How do I validate promo codes against my real backend?', a: `Replace the client-side CODES lookup in the submit handler with a fetch to your coupon-validation endpoint, passing the entered code and the cart contents; the server returns whether it's valid plus the discount type and amount. Show a "Checking…" state during the request, then the applied chip on success or the inline error on failure — the rest of the UI stays the same.` },
      { q: 'Why is client-side code validation not enough?', a: `Anyone can read the CODES map in your page source, so client-side matching is purely for instant feedback. The authoritative check — does the code exist, is it expired, is it usage-limited or customer-specific, can it stack with other offers — must run server-side when the order is priced and again when it's placed, or the discount can be forged. Keep the client check for UX, never for enforcement.` },
      { q: 'How do I support stacking multiple codes?', a: `Track applied as an array instead of a single value, render one chip per code, and sum their discounts in recalc() — but enforce your stacking rules (which combinations are allowed, caps on total discount) server-side. Most stores deliberately disallow stacking, which the single-code model here already enforces.` },
      { q: 'How do I handle minimum-order or product-specific coupons?', a: `Give each code optional conditions (minSubtotal, eligibleProductIds) in its data, and check them before applying — if the cart doesn't qualify, show a specific message ("SAVE20 requires a $100 minimum") rather than silently applying a $0 discount. The same conditions must be re-validated server-side at checkout.` },
      { q: 'How do I use this promo code input in React, Vue, or Angular?', a: `In React, hold the applied code and message in useState and derive the total with useMemo; in Vue, use ref()/computed(); in Angular, use a component field with a getter. The discount-type calculation is plain JavaScript, and the apply/remove handlers map directly to event handlers in each framework — swap the CODES lookup for an async validation call.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace every validation branch by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how discountAmount handles the three coupon types differently, or why the fixed-discount branch clamps its value with Math.min against the subtotal instead of letting the total go negative. The same assistant can help optimize it too, for instance checking whether recalc's repeated getElementById lookups should be cached once at load, or whether the client-side CODES map is exposing more of the discount logic than it should before the code even reaches your server. It's equally useful for extending the field: ask it to add a minimum-order condition to certain codes, support stacking two non-conflicting coupons, or wire the submit handler to a real async validation endpoint with a loading state. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a checkout "promo code input" in plain HTML, CSS, and JavaScript with no framework and no libraries.

Requirements:
- An order summary showing a subtotal line, a shipping line, a conditionally-shown discount line, and a total line that always equals subtotal plus shipping minus any active discount, floored at zero.
- A data structure mapping promo code strings to an object describing a discount type (percent, fixed, or shipping) and a numeric value; adding a new valid code must require only adding an entry to this map, no new branching logic.
- A single calculation function that, given the active code, returns the discount amount: percent multiplies the subtotal by a fraction, fixed returns a flat amount clamped so it never exceeds the subtotal, and shipping returns an amount that offsets the shipping line.
- A form with a text input and an Apply button. On submit, normalize the entered code by trimming whitespace and uppercasing it before checking it against the map, so "save20", " SAVE20 ", and "Save20" all match the same entry.
- Distinct, specific validation messages for each failure case: an empty submitted value, a code that is already the currently-applied one, and a code that does not exist in the map — each with its own message text, plus a visual invalid state on the input field.
- On a successful apply, hide the input form and show a confirmation chip naming the applied code with a Remove control; clicking Remove must clear the applied code, restore the form, refocus the input, and recompute the total — and the discount line's label must adapt based on the coupon type (e.g. reading "Free shipping" for a shipping-type code versus "Discount (CODE)" for the others).`,
    },
  },
};

export default promoCodeInput;
