const seatPicker = {
  id: 'seat-picker',
  title: 'Seat Picker',
  lastmod: '2026-06-20',
  category: 'forms',
  html: `<div class="sp-card">
  <div class="sp-head">
    <h3>Select your seats</h3>
    <p>Screen 4 · Fri 7:30 PM</p>
  </div>

  <div class="sp-screen">SCREEN</div>
  <div class="sp-grid" id="spGrid"></div>

  <div class="sp-legend">
    <span><i class="sp-dot avail"></i> Standard $12</span>
    <span><i class="sp-dot premium"></i> Premium $18</span>
    <span><i class="sp-dot selected"></i> Selected</span>
    <span><i class="sp-dot taken"></i> Taken</span>
  </div>

  <div class="sp-footer">
    <div class="sp-summary">
      <span id="spCount">0 seats</span>
      <strong id="spTotal">$0</strong>
    </div>
    <button type="button" class="sp-confirm" id="spConfirm" disabled>Confirm seats</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.sp-card{background:#1e293b;border:1px solid #334155;border-radius:18px;padding:22px;width:100%;max-width:440px;box-shadow:0 18px 44px rgba(0,0,0,.4)}
.sp-head h3{color:#f8fafc;font-size:16px;font-weight:800;margin-bottom:2px}
.sp-head p{color:#94a3b8;font-size:12.5px;margin-bottom:16px}

.sp-screen{height:8px;background:linear-gradient(90deg,transparent,#38bdf8,transparent);border-radius:50%;margin-bottom:6px;filter:blur(1px)}
.sp-screen{color:transparent;text-align:center;font-size:0}

.sp-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:7px;margin:18px 0;justify-content:center}
.sp-seat{aspect-ratio:1;border-radius:7px 7px 3px 3px;border:none;cursor:pointer;font-size:9.5px;font-weight:700;color:#0f172a;display:flex;align-items:center;justify-content:center;transition:transform .12s,box-shadow .12s}
.sp-seat.avail{background:#cbd5e1}
.sp-seat.avail:hover{transform:translateY(-2px);box-shadow:0 4px 10px rgba(0,0,0,.3)}
.sp-seat.premium{background:#fbbf24}
.sp-seat.premium:hover{transform:translateY(-2px);box-shadow:0 4px 10px rgba(0,0,0,.3)}
.sp-seat.selected{background:#22c55e;color:#fff;transform:translateY(-2px)}
.sp-seat.taken{background:#475569;color:#94a3b8;cursor:not-allowed}

.sp-legend{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px;font-size:11.5px;color:#cbd5e1}
.sp-legend span{display:flex;align-items:center;gap:5px}
.sp-dot{width:10px;height:10px;border-radius:3px;display:inline-block}
.sp-dot.avail{background:#cbd5e1}
.sp-dot.premium{background:#fbbf24}
.sp-dot.selected{background:#22c55e}
.sp-dot.taken{background:#475569}

.sp-footer{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #334155;padding-top:14px;gap:12px}
.sp-summary{display:flex;flex-direction:column}
.sp-summary span{font-size:11.5px;color:#94a3b8}
.sp-summary strong{font-size:19px;color:#f8fafc;font-variant-numeric:tabular-nums}
.sp-confirm{background:#22c55e;color:#fff;border:none;border-radius:10px;padding:11px 22px;font-size:14px;font-weight:700;cursor:pointer;transition:opacity .15s}
.sp-confirm:disabled{opacity:.4;cursor:not-allowed}`,

  js: `var ROWS = ['A','B','C','D','E','F'];
var SEATS_PER_ROW = 8;
var PREMIUM_ROWS = ['A','B'];
var MAX_SEATS = 6;
var TAKEN = ['A3','A4','C5','C6','D1','D8','E2','E3','E4','F7'];
var selected = [];

function priceOf(id) {
  var row = id[0];
  return PREMIUM_ROWS.indexOf(row) !== -1 ? 18 : 12;
}

function buildGrid() {
  var grid = document.getElementById('spGrid');
  var frag = '';
  ROWS.forEach(function (row) {
    for (var n = 1; n <= SEATS_PER_ROW; n++) {
      var id = row + n;
      var cls = 'sp-seat ' + (TAKEN.indexOf(id) !== -1 ? 'taken' : (PREMIUM_ROWS.indexOf(row) !== -1 ? 'premium' : 'avail'));
      frag += '<button type="button" class="' + cls + '" data-id="' + id + '" ' + (TAKEN.indexOf(id) !== -1 ? 'disabled' : '') + '>' + id + '</button>';
    }
  });
  grid.innerHTML = frag;
  grid.addEventListener('click', onSeatClick);
}

function onSeatClick(e) {
  var btn = e.target.closest('.sp-seat');
  if (!btn || btn.classList.contains('taken')) return;
  var id = btn.dataset.id;
  var idx = selected.indexOf(id);
  if (idx !== -1) {
    selected.splice(idx, 1);
    btn.classList.remove('selected');
    btn.classList.add(PREMIUM_ROWS.indexOf(id[0]) !== -1 ? 'premium' : 'avail');
  } else {
    if (selected.length >= MAX_SEATS) return;
    selected.push(id);
    btn.classList.remove('avail', 'premium');
    btn.classList.add('selected');
  }
  updateSummary();
}

function updateSummary() {
  var total = selected.reduce(function (sum, id) { return sum + priceOf(id); }, 0);
  document.getElementById('spCount').textContent = selected.length + (selected.length === 1 ? ' seat' : ' seats') + (selected.length ? ' (' + selected.slice().sort().join(', ') + ')' : '');
  document.getElementById('spTotal').textContent = '$' + total;
  document.getElementById('spConfirm').disabled = selected.length === 0;
}

document.getElementById('spConfirm').addEventListener('click', function () {
  var label = this;
  var original = label.textContent;
  label.textContent = 'Seats confirmed ✓';
  label.disabled = true;
  setTimeout(function () { label.textContent = original; label.disabled = selected.length === 0; }, 1800);
});

buildGrid();`,

  seo: {
    title: 'Seat Picker — Cinema/Event Seat Map HTML CSS JS',
    description: `An interactive cinema-style seat map with premium-row pricing, a selection cap, taken-seat blocking, and a running total. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Seat Picker — Interactive Seat Map, Premium Pricing & Running Total',
      description: `Booking a seat is more reassuring than booking a generic "ticket" — seeing the actual row and number you'll sit in, with taken seats clearly blocked off, is what makes a checkout feel trustworthy. This snippet builds a complete cinema/event seat map in plain HTML, CSS, and vanilla JavaScript: a generated grid, three seat states (available, premium, taken), a selection cap, and a live running total.

**Generating the grid from data, not markup**

Rather than hand-writing 48 \`<button>\` elements, \`buildGrid()\` loops over a \`ROWS\` array and a fixed seat count per row, building each seat's id (\`A1\`, \`A2\`, …) and class (\`taken\`, \`premium\`, or \`avail\`) from three small config arrays: \`ROWS\`, \`PREMIUM_ROWS\`, and a \`TAKEN\` id list. Change the venue by editing these arrays — the grid, pricing, and taken-seat blocking all follow automatically with no template changes.

**Three seat states and tiered pricing**

Front rows (\`A\`, \`B\`) are flagged as premium and styled gold at $18; the rest are standard gray at $12. \`priceOf(id)\` reads the row letter from the seat id to look up the right price, so the pricing logic lives in one function instead of being duplicated across the grid and the total calculation. Taken seats get the \`disabled\` attribute and a \`taken\` class, which removes both the hover lift and the pointer cursor — they are visually and functionally inert.

**Selection with a cap**

Clicking an available or premium seat toggles it into \`selected\` (a plain array of ids) and swaps its class to green; clicking it again removes it and restores its original tier color. A \`MAX_SEATS\` cap (six, configurable) silently rejects further clicks once reached rather than showing an error — appropriate for a soft limit most users won't hit, though you could add a toast warning if you want it surfaced explicitly.

**Live running total**

Every click recomputes the summary: the seat count and a sorted, comma-separated list of selected ids (e.g. "2 seats (A2, B5)"), and the total price via \`selected.reduce\`, summing each seat's tier price. The Confirm button stays disabled until at least one seat is selected, then shows a checkmark confirmation for 1.8 seconds on click — a placeholder for handing the selection off to a real checkout flow.

**Why buttons, not divs**

Every seat is a real \`<button>\`, so it's keyboard-focusable and clickable with Enter/Space out of the box, and \`disabled\` correctly removes taken seats from the tab order — accessibility that a clickable \`<div>\` would need extra ARIA and key-handling code to replicate.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 6×8 seat grid renders with gold premium rows up front, gray standard rows behind, and pre-blocked taken seats.` },
      { title: 'Click an available seat', text: `It turns green and is added to the running total; the footer shows the seat count, ids, and price.` },
      { title: 'Click a selected seat again', text: `It deselects and returns to its original tier color (gold or gray); the total updates.` },
      { title: 'Try a taken seat', text: `Gray-blue taken seats are disabled and don't respond to clicks — they can't be selected.` },
      { title: 'Hit the selection cap', text: `After selecting MAX_SEATS (6 by default) seats, further clicks on new seats are ignored until you deselect one.` },
      { title: 'Confirm your seats', text: `Click "Confirm seats" — the button shows a checkmark confirmation, a placeholder for your real checkout call.` },
    ] },
    features: [
      { title: 'Data-driven grid generation', text: `The seat grid, pricing tiers, and taken seats are all generated from three small config arrays — no hand-written markup per seat.` },
      { title: 'Three visual seat states', text: `Available, premium, and taken seats are distinct at a glance via color, with taken seats disabled outright.` },
      { title: 'Tiered pricing by row', text: `priceOf(id) looks up the correct price from the row letter, keeping pricing logic in one place.` },
      { title: 'Selection cap', text: `A configurable MAX_SEATS limit prevents over-selecting without needing a checkout-side check.` },
      { title: 'Live running total and seat list', text: `The footer updates instantly with the seat count, sorted id list, and total price on every click.` },
      { title: 'Real, keyboard-accessible buttons', text: `Every seat is a focusable <button>; taken seats use disabled instead of a click-blocking class.` },
      { title: 'Toggle-to-deselect', text: `Clicking a selected seat again deselects it and restores its original tier color — no separate "remove" control needed.` },
      { title: 'Confirmation feedback', text: `The Confirm button shows a temporary checkmark state, ready to wire into a real checkout submission.` },
    ],
    useCases: [
      { title: 'Cinema and theater booking', text: `The canonical use case — pick seats by row and number before checkout, with premium rows priced higher.` },
      { title: 'Concert and event ticketing', text: `Adapt the grid shape to a venue's actual seating chart for general or reserved seating.` },
      { title: 'Flight and bus seat selection', text: `Swap the grid for an aircraft or coach layout; the selection cap and pricing-tier pattern carry over directly.` },
      { title: 'Restaurant table reservations', text: `Repurpose the grid as a table map, with "taken" representing already-reserved tables.` },
      { title: 'Coworking and desk booking', text: `Use the same taken/available/premium pattern for hot-desk or meeting-room booking systems.` },
      { title: 'Learning data-driven UI generation', text: `A clear example of building a whole interactive grid from arrays instead of static markup — pair with a [pricing card](/ui-snippets/pricing-card/) for the checkout step.` },
    ],
    faqs: [
      { q: 'How do I load real seat availability from a server?', a: `Replace the static TAKEN array with data fetched from your booking API (an array or Set of taken seat ids), and call buildGrid() once it resolves; re-fetch and rebuild after a successful booking so other users see updated availability.` },
      { q: 'How do I change the venue layout?', a: `Edit the ROWS array (row letters), SEATS_PER_ROW (seats per row), and PREMIUM_ROWS (which rows cost more) — buildGrid() regenerates the entire grid and pricing from these three values with no other code changes.` },
      { q: 'How do I prevent double-booking when two users select the same seat?', a: `On confirm, send the selected seat ids to your server, which should atomically check and mark them taken; if the server rejects any seat (already taken), remove it from selected, mark it taken in the UI, and ask the user to pick again.` },
      { q: 'How do I add a seat hold/countdown timer?', a: `On confirm, start a countdown (e.g. with setInterval) showing "Seats held for 5:00"; if it expires before checkout completes, clear selected, restore the seats to available, and notify the user.` },
      { q: 'How do I use this seat picker in React, Vue, or Angular?', a: `In React, keep selected as state and derive the grid with .map() over ROWS/seat numbers, computing each seat's class from props; in Vue, use a computed seats array with v-for; in Angular, use *ngFor with a component method for class binding. The pricing and cap logic ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to trace how the grid, pricing, and taken-seat blocking all derive from three small arrays on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how buildGrid combines ROWS, PREMIUM_ROWS, and TAKEN into each seat's id and class, or why priceOf reading only the row letter keeps pricing consistent between the grid and the running total. The same assistant can help optimize it, for example checking whether rebuilding the entire grid's innerHTML on every load scales to a venue with hundreds of seats, or whether a single delegated click listener could replace a heavier per-button approach as the grid grows. It's also useful for extending the feature: ask it to add a seat-hold countdown timer after confirm, group selected seats visually when they are adjacent, or fetch the TAKEN list from a live booking API instead of a hardcoded array. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an interactive cinema-style seat picker in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- Generate the seat grid entirely from data, not hand-written markup: a ROWS array of row letters, a fixed SEATS_PER_ROW count, a PREMIUM_ROWS array marking which rows cost more, and a TAKEN array of already-booked seat ids (e.g. "A3"). Build every seat button's id and CSS class from these arrays in a loop.
- Give seats exactly three visual and functional states: available (standard price), premium (higher price, for rows in PREMIUM_ROWS), and taken (disabled attribute set, not just a CSS class, so it is unfocusable and unclickable).
- Every seat must be a real button element, not a clickable div, so taken seats are correctly removed from the tab order via the disabled attribute alone.
- Write a single priceOf(seatId) function that derives the price from the seat's row letter, and reuse that same function both when computing the running total and anywhere else a seat's price is needed, so pricing logic exists in exactly one place.
- Clicking an available or premium seat toggles it into a selected array and recolors it; clicking a selected seat again removes it and restores its original tier color exactly.
- Enforce a MAX_SEATS cap that silently ignores further selection clicks once reached, without an error dialog.
- After every click, recompute and display: the count of selected seats, a sorted comma-separated list of their ids, and the total price via a reduce over the selected array's priceOf values. Keep a confirm button disabled whenever zero seats are selected.`,
    },
  },
};

export default seatPicker;
