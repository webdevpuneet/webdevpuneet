const timeSlotPicker = {
  id: 'time-slot-picker',
  title: 'Time Slot Picker',
  lastmod: '2026-06-16',
  category: 'forms',
  html: `<div class="ts-card">
  <div class="ts-head">
    <h2 class="ts-title">Book a session</h2>
    <span class="ts-tz">GMT+0 · 30 min</span>
  </div>

  <div class="ts-days" id="tsDays">
    <button class="ts-day active" data-day="Mon, Jun 15" onclick="selectDay(this)"><span class="ts-dow">Mon</span><span class="ts-dnum">15</span></button>
    <button class="ts-day" data-day="Tue, Jun 16" onclick="selectDay(this)"><span class="ts-dow">Tue</span><span class="ts-dnum">16</span></button>
    <button class="ts-day" data-day="Wed, Jun 17" onclick="selectDay(this)"><span class="ts-dow">Wed</span><span class="ts-dnum">17</span></button>
    <button class="ts-day" data-day="Thu, Jun 18" onclick="selectDay(this)"><span class="ts-dow">Thu</span><span class="ts-dnum">18</span></button>
    <button class="ts-day" data-day="Fri, Jun 19" onclick="selectDay(this)"><span class="ts-dow">Fri</span><span class="ts-dnum">19</span></button>
  </div>

  <div class="ts-section-label">Morning</div>
  <div class="ts-slots">
    <button class="ts-slot" onclick="selectSlot(this)">9:00 AM</button>
    <button class="ts-slot" onclick="selectSlot(this)">9:30 AM</button>
    <button class="ts-slot booked" disabled>10:00 AM</button>
    <button class="ts-slot" onclick="selectSlot(this)">10:30 AM</button>
    <button class="ts-slot" onclick="selectSlot(this)">11:00 AM</button>
    <button class="ts-slot booked" disabled>11:30 AM</button>
  </div>

  <div class="ts-section-label">Afternoon</div>
  <div class="ts-slots">
    <button class="ts-slot" onclick="selectSlot(this)">1:00 PM</button>
    <button class="ts-slot" onclick="selectSlot(this)">1:30 PM</button>
    <button class="ts-slot" onclick="selectSlot(this)">2:00 PM</button>
    <button class="ts-slot booked" disabled>2:30 PM</button>
    <button class="ts-slot" onclick="selectSlot(this)">3:00 PM</button>
    <button class="ts-slot" onclick="selectSlot(this)">3:30 PM</button>
  </div>

  <button class="ts-confirm" id="tsConfirm" onclick="confirmBooking()" disabled>Select a time</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ts-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:22px;width:100%;max-width:380px;box-shadow:0 14px 44px rgba(15,23,42,.07)}
.ts-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:16px}
.ts-title{font-size:17px;font-weight:800;color:#1e293b}
.ts-tz{font-size:11px;color:#94a3b8;font-weight:600}

.ts-days{display:flex;gap:7px;margin-bottom:20px}
.ts-day{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:9px 0;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:11px;cursor:pointer;font-family:inherit;transition:all .15s}
.ts-day:hover{border-color:#cbd5e1}
.ts-day.active{background:#6366f1;border-color:#6366f1}
.ts-dow{font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.04em}
.ts-dnum{font-size:16px;font-weight:800;color:#1e293b}
.ts-day.active .ts-dow,.ts-day.active .ts-dnum{color:#fff}

.ts-section-label{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:9px}
.ts-slots{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:18px}
.ts-slot{padding:10px 4px;background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;font-weight:700;color:#334155;cursor:pointer;font-family:inherit;transition:all .14s}
.ts-slot:hover:not(.booked){border-color:#6366f1;color:#6366f1}
.ts-slot.active{background:#6366f1;border-color:#6366f1;color:#fff}
.ts-slot.booked{background:#f8fafc;color:#cbd5e1;cursor:not-allowed;text-decoration:line-through}

.ts-confirm{width:100%;padding:13px;background:#6366f1;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s,transform .1s}
.ts-confirm:hover:not(:disabled){background:#4f46e5}
.ts-confirm:active:not(:disabled){transform:scale(.99)}
.ts-confirm:disabled{background:#e2e8f0;color:#94a3b8;cursor:not-allowed}
.ts-confirm.done{background:#10b981!important}`,

  js: `var selectedDay = 'Mon, Jun 15';
var selectedSlot = null;

function selectDay(btn) {
  document.querySelectorAll('.ts-day').forEach(function (d) { d.classList.remove('active'); });
  btn.classList.add('active');
  selectedDay = btn.dataset.day;
  clearSlot();
}

function selectSlot(btn) {
  document.querySelectorAll('.ts-slot').forEach(function (s) { s.classList.remove('active'); });
  btn.classList.add('active');
  selectedSlot = btn.textContent.trim();
  var c = document.getElementById('tsConfirm');
  c.disabled = false;
  c.classList.remove('done');
  c.textContent = 'Book ' + selectedDay.split(',')[0] + ' · ' + selectedSlot;
}

function clearSlot() {
  selectedSlot = null;
  document.querySelectorAll('.ts-slot').forEach(function (s) { s.classList.remove('active'); });
  var c = document.getElementById('tsConfirm');
  c.disabled = true;
  c.classList.remove('done');
  c.textContent = 'Select a time';
}

function confirmBooking() {
  if (!selectedSlot) return;
  var c = document.getElementById('tsConfirm');
  c.classList.add('done');
  c.textContent = '✓ Booked ' + selectedDay + ' · ' + selectedSlot;
}`,

  seo: {
    title: 'Time Slot Picker — Booking Slots HTML CSS JS Snippet',
    description: `Appointment time-slot picker with a day selector, morning/afternoon grids, struck-through booked slots, and a gated confirm. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Time Slot Picker — Day Selector, Morning/Afternoon Grids & Selection-Gated Booking`,
      description: `Booking an appointment online comes down to two choices: which day, and which time. A good time-slot picker makes both fast and unambiguous — a compact day selector, time slots grouped into morning and afternoon, clearly disabled slots for times already taken, and a confirm action that only activates once a valid slot is chosen. This snippet implements the complete flow in plain HTML, CSS, and vanilla JavaScript: a day strip, two slot grids, struck-through booked slots, a selection-gated confirm button, and a final booked state.

**Day selector that resets the time**

The day strip is a row of buttons, each showing a weekday and date. \`selectDay\` moves the \`.active\` highlight and stores the chosen day, then crucially calls \`clearSlot\` — because a time selected for Monday should not carry over when the user switches to Tuesday, where availability differs. Resetting the slot (and disabling the confirm button) on every day change prevents the classic booking bug of confirming a stale time against the wrong date.

**Grouped, scannable slot grids**

Times are split into "Morning" and "Afternoon" sections, each a three-column grid. Grouping reduces the cognitive load of scanning a long flat list and matches how people think about their day. Each slot is a real \`<button>\`, so the grid is keyboard-navigable out of the box.

**Honest availability**

Booked slots use the native \`disabled\` attribute plus a \`.booked\` style — greyed and struck through — so they read clearly as unavailable and cannot be focused, hovered into a selectable state, or clicked. Using \`disabled\` (not just a CSS class) means the browser enforces the unavailability, which is the correct, accessible way to block a choice rather than relying on a click handler to reject it.

**Selection-gated confirm**

The confirm button starts \`disabled\` reading "Select a time". \`selectSlot\` highlights the chosen slot, records it, enables the button, and rewrites its label to a concrete summary — "Book Mon · 9:30 AM" — so the user sees exactly what they are about to book before committing. This is the single most important safeguard: the action is impossible until a real, available slot is selected, and the label removes any doubt about what will be booked. \`confirmBooking\` then switches the button to a green "✓ Booked …" state.

The picker is data-light: availability is expressed purely as the presence of the \`booked\`/\`disabled\` attributes, so rendering real slots from an API (different per day) is a matter of generating the buttons. Pair this with a [date picker](/ui-snippets/date-picker/) for longer ranges, a [calendar widget](/ui-snippets/calendar-widget/) for month views, or a [shipping method selector](/ui-snippets/shipping-method-selector/) style of gated confirmation.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A "Book a session" card appears with five day buttons (Monday active) and morning/afternoon time grids; the confirm button reads "Select a time".` },
      { title: 'Pick a day', text: `Click another day — it highlights in indigo and any previously selected time is cleared so you cannot confirm a stale slot.` },
      { title: 'Choose a time', text: `Click an available slot — it highlights and the confirm button unlocks, now reading "Book Tue · 2:00 PM".` },
      { title: 'See booked slots', text: `Notice the struck-through, greyed times (e.g. 10:00 AM) — they are disabled and cannot be selected.` },
      { title: 'Confirm the booking', text: `Click the confirm button — it turns green and reads "✓ Booked Tue, Jun 16 · 2:00 PM".` },
      { title: 'Switch days again', text: `Pick a different day after selecting — the selection and confirm button reset, ready for a fresh time choice.` },
    ] },
    features: [
      { title: 'Day-change resets time', text: `\`selectDay\` calls \`clearSlot\`, so switching days never leaves a stale time selected against the wrong date — a common booking bug.` },
      { title: 'Morning/afternoon grouping', text: `Slots are split into labelled sections in a three-column grid, matching how people scan a day and reducing list fatigue.` },
      { title: 'Enforced booked slots', text: `Unavailable times use the native \`disabled\` attribute plus a struck-through style, so the browser blocks selection accessibly.` },
      { title: 'Selection-gated confirm', text: `The confirm button stays \`disabled\` until a valid slot is chosen, making it impossible to book nothing.` },
      { title: 'Concrete confirm label', text: `\`selectSlot\` rewrites the button to "Book Mon · 9:30 AM", so users see exactly what they are committing to.` },
      { title: 'Keyboard-friendly grid', text: `Every slot and day is a real \`<button>\`, so the picker is tab-navigable and operable without a mouse by default.` },
      { title: 'Success state', text: `\`confirmBooking\` switches the button to a green "✓ Booked …" confirmation, closing the loop on the action.` },
      { title: 'Data-light availability', text: `Availability is just the presence of \`booked\`/\`disabled\`, so rendering real per-day slots from an API needs no logic changes.` },
    ],
    useCases: [
      { title: 'Appointment and consultation booking', text: `The core use — pick a day and time for a call or meeting. Combine with a [country selector](/ui-snippets/country-selector/) and form for contact details.` },
      { title: 'Salon, clinic, and service bookings', text: `Reserve a haircut, dental, or repair slot; struck-through times communicate a busy schedule honestly.` },
      { title: 'Restaurant reservations', text: `Choose a date and seating time, with full slots disabled. Pair with a [time picker](/ui-snippets/time-picker/) for custom times.` },
      { title: 'Class and event scheduling', text: `Book a fitness class or workshop session from available slots, leading into a [checkout form](/ui-snippets/checkout-form/) for payment.` },
      { title: 'Demo and sales calls', text: `Let prospects self-serve a meeting time; combine with a [calendar widget](/ui-snippets/calendar-widget/) for picking dates further out.` },
      { title: 'Delivery and pickup windows', text: `Choose a fulfilment time window at checkout, mirroring how this picker gates confirmation on a valid, available slot.` },
    ],
    faqs: [
      { q: 'How do I load real availability per day?', a: `Render the slot buttons from your API response for the selected day: output a normal \`<button>\` for free times and add \`class="booked" disabled\` for taken ones. Re-fetch and re-render when \`selectDay\` runs (after \`clearSlot\`), since availability differs by date. The selection-gating and confirm logic need no changes.` },
      { q: 'How do I handle time zones?', a: `Store and book in UTC, but display slots in the user's local zone. Convert each slot time with \`Intl.DateTimeFormat\` using the detected \`Intl.DateTimeFormat().resolvedOptions().timeZone\`, and show the zone in the header (this snippet shows a placeholder). Send the UTC timestamp to the server on confirm so there is no ambiguity.` },
      { q: 'How do I prevent double-booking?', a: `Availability can change between page load and confirm, so re-validate server-side: on \`confirmBooking\`, send the slot and have the API atomically reserve it, returning an error if it was just taken. On error, mark that slot \`booked\`, clear the selection, and ask the user to pick again. Optionally poll or use websockets to live-update availability.` },
      { q: 'How do I make the slot grid fully keyboard accessible?', a: `The buttons are already focusable and respect \`disabled\`. Add \`aria-pressed\` to reflect the selected slot, group each section with a heading association, and consider arrow-key roving focus within the grid. Announce the confirm label change via an \`aria-live\` region so screen-reader users hear the chosen day and time.` },
      { q: 'How do I use this time-slot picker in React, Vue, or Angular?', a: `In React, hold \`selectedDay\` and \`selectedSlot\` in \`useState\`, derive the confirm label and disabled state from them, and render slots from an availability array. In Vue, use \`ref\`s with \`:class\`/\`:disabled\` bindings in a \`v-for\`. In Angular, track selection on the component and bind \`[class.active]\`/\`[disabled]\`. The grid and day-strip CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to explain exactly why selectDay() calls clearSlot() every time, and what booking bug that single line of code prevents — it's a small detail with an outsized effect on correctness. It's worth a critical look too: since availability here is just a disabled attribute baked into static markup, ask what would break if two tabs booked the same slot at nearly the same moment, and how you'd add a real server-side reservation check on confirm. For extending the picker, ask for multi-slot selection for booking back-to-back sessions, a way to show a slot's remaining capacity (like "2 of 4 spots left") instead of a binary booked/available, or a loading state on the confirm button while an API call resolves. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an appointment time-slot picker in plain HTML, CSS, and JavaScript with a day selector, grouped time slots, and a confirmation gated on a valid selection — no library.

Requirements:
- A horizontal row of day buttons (weekday plus date) where clicking one moves the active highlight and stores the selected day, and critically also clears any previously selected time slot, so a time chosen for one day can never be silently carried over and confirmed against a different day.
- Time slots grouped into labelled sections (such as Morning and Afternoon), each rendered as a grid of real button elements rather than divs, so the grid is keyboard-focusable by default.
- Some slots must be unavailable, marked with the native disabled attribute (not just a visual class) plus a struck-through, muted style, so the browser itself prevents focusing, hovering into an active-looking state, or clicking them — never rely on a click handler alone to reject a disabled slot.
- A confirm button that starts disabled with placeholder text, and only becomes enabled once a valid slot is selected, at which point its label rewrites itself to a concrete summary combining the selected day and time (e.g. "Book Tue · 2:00 PM") so the user sees exactly what they're about to commit to before clicking.
- Clicking confirm must transition the button into a distinct success state (different background color, checkmark, and a label restating the full booked day and time) rather than simply hiding the form.
- Structure the code so real per-day availability from an API could replace the hardcoded booked/disabled slots without touching the day-selection, slot-selection, or confirm-gating logic at all.`,
    },
  },
};

export default timeSlotPicker;
