const pricingRoleBasedSeatMixCalculator = {
  id: 'pricing-role-based-seat-mix-calculator',
  title: 'Role-Based Seat Mix Pricing Calculator',
  lastmod: '2026-08-31',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="rsm-card">
  <div class="rsm-head">
    <h3>Build your team's price</h3>
    <p>Every role costs a different amount — mix and match to see your real monthly total.</p>
  </div>

  <div class="rsm-roles" id="rsmRoles">
    <div class="rsm-role" data-rate="49">
      <div class="rsm-role-info">
        <b>Admin</b>
        <span>Full workspace control, billing access</span>
      </div>
      <div class="rsm-role-price">$49<small>/seat</small></div>
      <div class="rsm-stepper">
        <button type="button" class="rsm-minus" aria-label="Decrease admin seats">&minus;</button>
        <span class="rsm-count" data-count="2">2</span>
        <button type="button" class="rsm-plus" aria-label="Increase admin seats">+</button>
      </div>
    </div>

    <div class="rsm-role" data-rate="29">
      <div class="rsm-role-info">
        <b>Editor</b>
        <span>Create and edit, no billing access</span>
      </div>
      <div class="rsm-role-price">$29<small>/seat</small></div>
      <div class="rsm-stepper">
        <button type="button" class="rsm-minus" aria-label="Decrease editor seats">&minus;</button>
        <span class="rsm-count" data-count="5">5</span>
        <button type="button" class="rsm-plus" aria-label="Increase editor seats">+</button>
      </div>
    </div>

    <div class="rsm-role" data-rate="9">
      <div class="rsm-role-info">
        <b>Viewer</b>
        <span>Read-only access to dashboards</span>
      </div>
      <div class="rsm-role-price">$9<small>/seat</small></div>
      <div class="rsm-stepper">
        <button type="button" class="rsm-minus" aria-label="Decrease viewer seats">&minus;</button>
        <span class="rsm-count" data-count="3">3</span>
        <button type="button" class="rsm-plus" aria-label="Increase viewer seats">+</button>
      </div>
    </div>
  </div>

  <div class="rsm-summary">
    <div class="rsm-summary-row">
      <span>Total seats</span>
      <b id="rsmTotalSeats">10</b>
    </div>
    <div class="rsm-summary-row rsm-summary-total">
      <span>Monthly total</span>
      <b id="rsmTotalPrice">$260</b>
    </div>
    <div class="rsm-avg">Average <span id="rsmAvgPerSeat">$26.00</span> per seat</div>
  </div>

  <button type="button" class="rsm-cta">Start with this mix</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f6f7fb;display:flex;justify-content:center;padding:40px 20px}

.rsm-card{width:min(440px,96vw);background:#fff;border:1px solid #e6e8f2;border-radius:20px;padding:28px;box-shadow:0 20px 50px rgba(20,20,60,.06)}
.rsm-head h3{font-size:18px;font-weight:800;color:#181a2a;margin-bottom:6px}
.rsm-head p{font-size:13px;color:#7b7f99;line-height:1.5;margin-bottom:22px}

.rsm-roles{display:flex;flex-direction:column;gap:10px;margin-bottom:20px}
.rsm-role{display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:14px;padding:14px 14px;border:1.5px solid #eceefa;border-radius:14px;transition:border-color .15s}
.rsm-role:has(.rsm-count[data-count="0"]){opacity:.55}
.rsm-role-info b{display:block;font-size:13.5px;font-weight:800;color:#181a2a}
.rsm-role-info span{font-size:11.5px;color:#9aa0b8}
.rsm-role-price{font-size:13px;font-weight:700;color:#4b4f66;text-align:right;white-space:nowrap}
.rsm-role-price small{color:#9aa0b8;font-weight:600}

.rsm-stepper{display:flex;align-items:center;gap:10px;background:#f7f8fc;border-radius:9px;padding:4px 6px}
.rsm-stepper button{width:24px;height:24px;border-radius:7px;border:none;background:#fff;color:#4338ca;font-size:15px;font-weight:800;cursor:pointer;box-shadow:0 1px 2px rgba(20,20,60,.08);font-family:inherit;line-height:1}
.rsm-stepper button:hover{background:#eef0fe}
.rsm-count{min-width:20px;text-align:center;font-size:13.5px;font-weight:800;color:#181a2a}

.rsm-summary{background:#151726;border-radius:14px;padding:16px 18px;margin-bottom:18px}
.rsm-summary-row{display:flex;justify-content:space-between;align-items:center;font-size:12.5px;color:#a7abcf;font-weight:700;margin-bottom:8px}
.rsm-summary-row b{color:#fff;font-size:13.5px}
.rsm-summary-total{margin-bottom:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,.1)}
.rsm-summary-total span{font-size:13.5px;color:#fff}
.rsm-summary-total b{font-size:20px;color:#a5b4fc}
.rsm-avg{font-size:11px;color:#7c81a8;text-align:center}
.rsm-avg span{color:#c7cbf5;font-weight:700}

.rsm-cta{width:100%;background:#4338ca;color:#fff;border:none;border-radius:11px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.rsm-cta:hover{background:#3730a3}

@media(max-width:400px){
  .rsm-role{grid-template-columns:1fr;gap:8px}
  .rsm-role-price{text-align:left}
}`,

  js: `// Each role card carries its own per-seat rate on data-rate and its own live
// count on data-count. The total is always re-derived from those two attributes
// across every role, so there is never a separately-tracked "total" variable
// that could drift out of sync with what the steppers actually show.
var roleCards = Array.prototype.slice.call(document.querySelectorAll('.rsm-role'));
var totalSeatsEl = document.getElementById('rsmTotalSeats');
var totalPriceEl = document.getElementById('rsmTotalPrice');
var avgPerSeatEl = document.getElementById('rsmAvgPerSeat');

function recalcTotals() {
  var totalSeats = 0;
  var totalPrice = 0;

  roleCards.forEach(function (card) {
    var rate = parseFloat(card.getAttribute('data-rate')) || 0;
    var countEl = card.querySelector('.rsm-count');
    var count = parseInt(countEl.getAttribute('data-count'), 10) || 0;

    totalSeats += count;
    totalPrice += rate * count;
  });

  totalSeatsEl.textContent = String(totalSeats);
  totalPriceEl.textContent = '$' + totalPrice.toLocaleString();

  var avg = totalSeats > 0 ? totalPrice / totalSeats : 0;
  avgPerSeatEl.textContent = '$' + avg.toFixed(2);

  roleCards.forEach(function (card) {
    var countEl = card.querySelector('.rsm-count');
    var count = parseInt(countEl.getAttribute('data-count'), 10) || 0;
    card.classList.toggle('rsm-role-empty', count === 0);
  });
}

function adjustCount(card, delta) {
  var countEl = card.querySelector('.rsm-count');
  var current = parseInt(countEl.getAttribute('data-count'), 10) || 0;
  var next = Math.max(0, Math.min(999, current + delta));
  countEl.setAttribute('data-count', String(next));
  countEl.textContent = String(next);
  recalcTotals();
}

roleCards.forEach(function (card) {
  var minusBtn = card.querySelector('.rsm-minus');
  var plusBtn = card.querySelector('.rsm-plus');
  minusBtn.addEventListener('click', function () { adjustCount(card, -1); });
  plusBtn.addEventListener('click', function () { adjustCount(card, 1); });
});

recalcTotals();`,

  seo: {
    title: 'Role-Based Seat Mix Pricing Calculator — Free HTML CSS JS Snippet',
    description: 'A per-role pricing calculator where Admin, Editor, and Viewer seats each carry their own rate and independent stepper, recalculating the live team total as the mix changes. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Role-Based Seat Mix Calculator — Independent Per-Role Steppers with a Live Blended Total',
      description: `Flat per-seat pricing pretends every user costs the same to support — but an admin with billing access and a read-only viewer rarely cost (or should be priced) the same. This calculator prices each role independently: three role cards, each with its own rate and its own increment/decrement stepper, and a summary that recalculates the live team total and blended average from whatever mix a visitor builds.

**No separately-tracked total — everything is re-derived**

\`recalcTotals()\` never increments a running total variable when a stepper is clicked. Instead, every time it runs, it loops over all \`.rsm-role\` cards fresh, reads each one's \`data-rate\` attribute and its count element's \`data-count\` attribute, and sums both from scratch. This means the displayed total can never drift from what the steppers actually show — there is no intermediate state to get out of sync, only a pure recalculation from the DOM's current attribute values.

**Rate and count live in the DOM as data attributes, not JavaScript variables**

Each role's per-seat rate is set once as \`data-rate\` on the \`.rsm-role\` card itself, and each stepper's live count is tracked as \`data-count\` on its \`.rsm-count\` span — both read directly off the markup rather than mirrored into a separate JavaScript object. This keeps the HTML and the state honest: viewing the page source at any moment shows you exactly what the calculator currently thinks each role costs and how many seats are set, since there's nowhere else for that state to hide.

**\`adjustCount()\` clamps before it ever reaches the total**

Rather than letting a count go negative or unbounded, \`adjustCount()\` clamps the next value with \`Math.max(0, Math.min(999, current + delta))\` before writing it back to the \`data-count\` attribute. A role can be reduced all the way to zero seats (fading the card via \`.rsm-role-empty\`) without breaking the total math — a zero-count role simply contributes \`rate * 0 = 0\` to the sum, same as if it weren't there.

**The blended average tells a different story than any single rate**

\`avg = totalPrice / totalSeats\` is deliberately shown alongside the raw total, since a team weighted toward cheaper Viewer seats will show a low blended average even with a few expensive Admin seats mixed in — a number that a single flat per-seat rate could never communicate, and that helps a visitor sanity-check whether their planned mix is being priced reasonably.

**Customizing it**

Add a fourth role by copying an existing \`.rsm-role\` block with its own \`data-rate\` and a stepper starting count, and adding matching minus/plus click handlers in the \`roleCards.forEach\` loop — \`recalcTotals()\` already sums generically over however many \`.rsm-role\` elements exist, so no changes are needed there. Swap the flat per-seat rates for volume-discounted rates by making \`recalcTotals()\` apply a discount multiplier once a role's count crosses a threshold.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Adjust each role\'s seat count', text: 'Use the + and − steppers on Admin, Editor, and Viewer independently.' },
        { title: 'Watch the summary update live', text: 'Total seats, monthly total, and the blended average per seat recalculate on every click.' },
        { title: 'Reduce a role to zero', text: 'That role card fades and contributes nothing to the total, without breaking the calculation.' },
        { title: 'Add a fourth role', text: 'Copy an .rsm-role block in the HTML panel with its own data-rate, and add its stepper handlers in the JS panel.' },
        { title: 'Change a role\'s rate', text: 'Edit the data-rate attribute on the .rsm-role div and the displayed price next to it.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Independent per-role steppers, each with its own rate stored as a data-rate attribute',
      'Total is fully re-derived from DOM attributes on every change, never a drifting running total',
      'Counts clamped between 0 and 999 before ever reaching the price calculation',
      'Zero-count roles visually fade and contribute cleanly to a zero-cost line item',
      'Blended average-per-seat figure surfaces alongside the raw monthly total',
      'toLocaleString() formats the total with thousands separators automatically',
      'No slider or single-uniform-rate assumption — three genuinely different per-seat prices',
      'CSS :has() selector fades a role card automatically when its stepper reaches zero',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'B2B SaaS with tiered permission roles', desc: 'Price Admin, Editor, and Viewer access differently instead of charging every teammate the same flat rate.' },
      { icon: 'FLOW', title: 'Self-serve quote builders on pricing pages', desc: 'Pair with the [seat-based pricing calculator](/ui-snippets/seat-based-pricing-calculator/) for products with both a simple and an advanced role-mix option.' },
      { icon: 'FORM', title: 'Sales-assisted enterprise pricing pages', desc: 'Let a prospect rough out a realistic team composition before a call, instead of guessing at a single per-seat number.' },
      { icon: 'LEARN', title: 'Learn DOM-attribute-driven recalculation', desc: 'Study how storing rate and count as data attributes and re-summing from scratch avoids state-drift bugs common in incrementing running totals.' },
      { icon: 'DESIGN', title: 'Project management and collaboration tool pricing', desc: 'Reuse the same per-role stepper pattern for Owner, Contributor, and Guest seat tiers.' },
      { icon: 'CODE', title: 'Related: Cost Per User Breakdown', desc: 'Pair with the [Cost Per User Breakdown](/ui-snippets/pricing-cost-per-user-breakdown/) for a complementary single-tier explanation view.' },
    ],
    faqs: [
      { q: 'How is the total price calculated across three different roles?', a: 'recalcTotals() loops over every .rsm-role card, reads its data-rate attribute and its stepper\'s data-count attribute, multiplies them, and sums the result across all roles. It runs this full recalculation from scratch on every single stepper click rather than incrementing a stored total, so the displayed total can never drift from what the steppers show.' },
      { q: 'What happens if I reduce a role to zero seats?', a: 'The stepper clamps at 0 (it will not go negative), the role card visually fades via the rsm-role-empty class, and that role simply contributes rate multiplied by 0, which is 0, to the total sum. The math handles a zero-seat role the same as if it were not in the mix at all.' },
      { q: 'What does the "average per seat" figure represent?', a: 'It is totalPrice divided by totalSeats across all three roles combined, which produces a single blended rate. This is meaningfully different from any one role\'s flat price and helps a visitor sanity-check whether a mix weighted toward cheaper Viewer seats is bringing the effective average down as expected.' },
      { q: 'Why are the rate and count stored as data attributes instead of JavaScript variables?', a: 'Each role\'s data-rate lives directly on its .rsm-role element, and each stepper\'s live data-count lives on its .rsm-count span, both readable straight from the DOM. This keeps a single source of truth for state right in the markup rather than mirroring it into a separate JavaScript object that could fall out of sync with what is visually displayed.' },
      { q: 'How do I add a fourth role, like "Guest"?', a: 'Copy an existing .rsm-role block in the HTML panel, give it its own data-rate value and starting data-count, and add its minus/plus buttons\' click handlers by extending the roleCards.forEach loop in the JS panel (or letting the existing generic loop pick it up automatically, since it already iterates over every .rsm-role element found on the page). recalcTotals() requires no changes since it already sums generically over all role cards present.' },
      { q: 'Is there a maximum number of seats per role?', a: 'Yes, each stepper is clamped between 0 and 999 inside adjustCount() via Math.max(0, Math.min(999, current + delta)), preventing a runaway click sequence from producing an unrealistic seat count or a negative one.' },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the recalculation logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why recalcTotals() re-sums every role's rate times count from the DOM's data attributes on every single click, instead of incrementing a running total variable, and what class of bug that design choice avoids. The same assistant can help you extend it — ask it to add volume discounts that reduce a role's per-seat rate once its count crosses a threshold (e.g. 10+ Editor seats), add an annual-versus-monthly billing toggle that recalculates the total accordingly, or persist the seat mix to the URL as query parameters so a prospect can share or bookmark a specific configuration. It's also useful for a validation review: ask whether the 0-to-999 clamp range makes sense for your actual product, or whether a maximum total-seats cap across all roles combined should be enforced separately from each role's own limit. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a role-based seat mix pricing calculator card in plain HTML, CSS, and vanilla JavaScript — no framework, no chart library.

Requirements:
- Three or more "role" cards (e.g. Admin, Editor, Viewer), each displaying a role name, a short permissions description, its own distinct per-seat price, and an independent stepper (minus button, live count, plus button) for that role's seat count.
- Store each role's per-seat rate as a data attribute on its card element and each stepper's live count as a data attribute on its count display element — do not track rate or count in separate JavaScript variables disconnected from the DOM.
- On every stepper click, recalculate the entire summary from scratch by looping over all role cards fresh and re-summing (rate times count) for each — do not increment or decrement a previously stored running total value.
- Display three summary figures that update live: total seats across all roles combined, the total monthly price, and a blended average price per seat (total price divided by total seats).
- Clamp each role's stepper between a minimum of 0 and a reasonable maximum (e.g. 999) so it can never go negative or grow unbounded from rapid clicking.
- When a role's count reaches 0, visually indicate that role is currently excluded from the mix (e.g. reduced opacity) without breaking the total calculation — a zero-count role should simply contribute zero to the sum.
- Format the total price with thousands separators.`,
    },
  },
};

export default pricingRoleBasedSeatMixCalculator;
