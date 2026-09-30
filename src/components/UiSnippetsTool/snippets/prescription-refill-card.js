const prescriptionRefillCard = {
  id: 'prescription-refill-card',
  title: 'Prescription Refill Card',
  category: 'cards',
  html: `<div class="wrap">
  <div class="rx-card">
    <div class="rx-head">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5 3 13a4.95 4.95 0 1 1 7-7l1 1"/><path d="M8 16l7-7"/><path d="M14.5 3.5 21 10"/><circle cx="17.5" cy="6.5" r="1"/></svg>
      <div>
        <h3>Atorvastatin 20mg</h3>
        <p>Rx #8842013 &middot; Northgate Pharmacy</p>
      </div>
    </div>

    <div class="rx-supply">
      <div class="rx-supply-top">
        <span class="rx-supply-label">Supply remaining</span>
        <span class="rx-supply-days" id="rxDays">9 days left</span>
      </div>
      <div class="rx-supply-bar"><div class="rx-supply-fill" id="rxFill"></div></div>
    </div>

    <div class="rx-meta">
      <div class="rx-meta-item">
        <span class="rx-meta-label">Refills left</span>
        <span class="rx-meta-val">2 of 3</span>
      </div>
      <div class="rx-meta-item">
        <span class="rx-meta-label">Dosage</span>
        <span class="rx-meta-val">1 tablet, nightly</span>
      </div>
    </div>

    <button class="rx-btn" id="rxBtn">Request refill</button>
    <p class="rx-note" id="rxNote">Requesting now gives the pharmacy time to prepare before your supply runs out.</p>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 20px; }

.wrap { width: 100%; max-width: 340px; }
.rx-card { background: #fff; border-radius: 20px; padding: 22px; box-shadow: 0 18px 44px rgba(15,23,42,0.1); border: 1px solid #f1f5f9; }

.rx-head { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
.rx-head svg { color: #0ea5e9; flex-shrink: 0; }
.rx-head h3 { font-size: 15px; font-weight: 800; color: #0f172a; }
.rx-head p { font-size: 12px; color: #94a3b8; margin-top: 2px; }

.rx-supply { margin-bottom: 16px; }
.rx-supply-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.rx-supply-label { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
.rx-supply-days { font-size: 12.5px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; }
.rx-supply-days.low { color: #dc2626; }
.rx-supply-bar { height: 8px; border-radius: 999px; background: #f1f5f9; overflow: hidden; }
.rx-supply-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #0ea5e9, #6366f1); transition: width 0.4s ease, background 0.3s; }
.rx-supply-fill.low { background: linear-gradient(90deg, #f59e0b, #dc2626); }

.rx-meta { display: flex; gap: 10px; margin-bottom: 18px; padding: 12px 0; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; }
.rx-meta-item { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.rx-meta-label { font-size: 10.5px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; }
.rx-meta-val { font-size: 13px; font-weight: 700; color: #0f172a; }

.rx-btn { width: 100%; border: none; background: #0ea5e9; color: #fff; font-size: 13px; font-weight: 700; padding: 12px; border-radius: 12px; cursor: pointer; margin-bottom: 10px; transition: background 0.15s, opacity 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px; }
.rx-btn:hover:not(:disabled) { background: #0284c7; }
.rx-btn:disabled { cursor: default; }
.rx-btn.requested { background: #dcfce7; color: #15803d; }

.rx-spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; border-radius: 50%; animation: rxspin 0.7s linear infinite; }
@keyframes rxspin { to { transform: rotate(360deg); } }

.rx-note { font-size: 11.5px; color: #94a3b8; text-align: center; line-height: 1.5; }
.rx-note.success { color: #15803d; font-weight: 600; }`,
  js: `var supplyDays = 9;
var TOTAL_DAYS = 30;
var refillsLeft = 2;
var state = 'idle';

var daysEl = document.getElementById('rxDays');
var fillEl = document.getElementById('rxFill');
var btn = document.getElementById('rxBtn');
var note = document.getElementById('rxNote');

function updateSupply() {
  var pct = Math.max(0, Math.min(100, (supplyDays / TOTAL_DAYS) * 100));
  fillEl.style.width = pct + '%';
  var low = supplyDays <= 10;
  fillEl.classList.toggle('low', low);
  daysEl.classList.toggle('low', low);
  daysEl.textContent = supplyDays <= 0 ? 'Out of supply' : supplyDays + ' day' + (supplyDays === 1 ? '' : 's') + ' left';
}

function setState(next) {
  state = next;
  if (next === 'idle') {
    btn.disabled = false;
    btn.classList.remove('requested');
    btn.innerHTML = 'Request refill';
    note.classList.remove('success');
    note.textContent = 'Requesting now gives the pharmacy time to prepare before your supply runs out.';
  } else if (next === 'requesting') {
    btn.disabled = true;
    btn.innerHTML = '<span class="rx-spinner"></span> Sending request…';
  } else if (next === 'requested') {
    btn.disabled = true;
    btn.classList.add('requested');
    btn.innerHTML = 'Refill requested \\u2713';
    note.classList.add('success');
    note.textContent = 'Northgate Pharmacy will notify you when it is ready — usually within 1 business day.';
  }
}

btn.addEventListener('click', function () {
  if (state !== 'idle' || refillsLeft <= 0) return;
  setState('requesting');
  setTimeout(function () {
    refillsLeft -= 1;
    document.querySelector('.rx-meta-val').textContent = refillsLeft + ' of 3';
    setState('requested');
  }, 1100);
});

updateSupply();
setState('idle');`,
  seo: {
    title: 'Prescription Refill Card — Free HTML CSS JS Snippet',
    description: 'A pharmacy prescription card with a live supply-remaining bar, refill count, and a request-refill button that transitions through sending and confirmed states. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Prescription Refill Card — Supply Progress Bar, Refill Counter & Async Request Button',
      description: `A patient managing a maintenance medication needs one thing from a pharmacy app's home screen: a clear signal for "am I about to run out, and have I already asked for more." This card answers both at once — a supply-remaining progress bar that recolors as the pill count gets low, and a refill button whose three visual states (idle, sending, confirmed) mirror exactly what's happening on the pharmacy's end rather than pretending the request is instantaneous.

**Supply as days remaining, not just a percentage**

\`updateSupply()\` computes the fill width as \`supplyDays / TOTAL_DAYS\`, but the text label always shows an absolute day count ("9 days left") rather than a bare percentage. A percentage requires mental math to answer "do I need to act this week"; a day count answers it directly. Once \`supplyDays\` drops to 10 or below, both the bar and the text switch to a \`.low\` class that shifts the gradient from blue to amber-red — the same escalating-urgency technique used for a countdown timer, applied to a supply level instead of a clock.

**A refill button that shows its real network state**

\`setState()\` drives the button through three explicit states: \`idle\` (default, clickable), \`requesting\` (disabled, spinner plus "Sending request…"), and \`requested\` (disabled, green, checkmark confirmation). Clicking the button immediately moves to \`requesting\` and only after a simulated 1.1 second delay — standing in for a real API round-trip to the pharmacy's refill system — does it settle on \`requested\`. A button that just changes its label the instant it's clicked, with no intermediate pending state, misrepresents what's actually happening: the refill hasn't been confirmed by the pharmacy yet, it's only just been sent.

**The refill counter decrements only after confirmation, not on click**

\`refillsLeft\` is decremented inside the \`setTimeout\` callback — after the simulated request completes — not synchronously when the button is clicked. This ordering matters: if the request were to fail (in a real integration, a rejected fetch), the displayed refill count should still reflect reality rather than having already been optimistically spent. The demo doesn't model a failure path, but the state machine's shape leaves room for one: a rejected promise would simply call \`setState('idle')\` again instead of \`setState('requested')\`, leaving \`refillsLeft\` untouched.

**A note that changes meaning with the button state**

The helper text beneath the button isn't static — \`setState()\` rewrites it for each state, from an explanatory nudge ("requesting now gives the pharmacy time to prepare") in the idle state to a specific reassurance ("Northgate Pharmacy will notify you... within 1 business day") once requested. Pairing state-specific microcopy with state-specific button styling reinforces the same message through two channels at once, useful for a patient who might be scanning quickly rather than reading closely.

**Guarding against a request when refills are exhausted**

The click handler checks \`refillsLeft <= 0\` before allowing a request to begin at all — a real pharmacy card in this state should instead route to a "contact your doctor for a new prescription" flow, since the refill button here is deliberately inert once the underlying refill count would go negative, avoiding a confusing "requested" confirmation for a refill that was never actually possible.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click "Request refill"', text: 'The button shows a spinner while "sending," then confirms with a checkmark and a green state once the simulated request completes.' },
        { title: 'Watch the supply bar and refill count update', text: 'The refills-left count decrements only after the request is confirmed, and the supply bar turns amber-red under 10 days remaining.' },
        { title: 'Replace medication details', text: 'Update the medication name, Rx number, pharmacy name, dosage, and supplyDays / refillsLeft values in the HTML and JS.' },
        { title: 'Wire the button to a real pharmacy API', text: 'Replace the setTimeout in the click handler with an actual fetch() call to your refill-request endpoint, and only call setState("requested") once that call resolves successfully.' },
        { title: 'Adjust the low-supply threshold', text: 'Change the "supplyDays <= 10" condition in updateSupply() to whatever day count should trigger the urgent color scheme.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a Tailwind CSS version.' },
      ],
    },
    features: [
      'Supply-remaining progress bar shown as an absolute day count, not a bare percentage',
      'Bar and text automatically recolor to an urgent amber-red scheme under a configurable low-supply threshold',
      'Refill button moves through explicit idle, sending (with spinner), and confirmed states rather than an instant label swap',
      'Refill counter decrements only after the simulated request resolves, not optimistically on click',
      'Helper note text changes wording to match the current button state',
      'Guards against submitting a refill request once the refills-left count is exhausted',
      'Confirmed state locks the button with a green checkmark to prevent duplicate submissions',
      'Compact card suited to a pharmacy app home screen or medication list detail view',
    ],
    useCases: [
      { icon: 'APP', title: 'Pharmacy and telehealth apps', desc: 'The core use case — surface each active prescription as one of these cards on a patient\'s medication home screen or dashboard.' },
      { icon: 'ALERT', title: 'Chronic condition medication reminders', desc: 'Pair with a [Medication Reminder screen](/ui-snippets/mobile-medication-reminder-screen/) so dosage-time nudges and supply-level refill prompts work together for maintenance medications.' },
      { icon: 'FORM', title: 'Mail-order and auto-refill pharmacy dashboards', desc: 'Show upcoming auto-refill shipments alongside a manual request option for patients who want to refill earlier than the automatic schedule.' },
      { icon: 'DASH', title: 'Caregiver and family medication management', desc: 'A caregiver managing a family member\'s prescriptions benefits from the same at-a-glance supply and refill-status signal across multiple medications.' },
      { icon: 'CODE', title: 'Learn async button state machines', desc: 'A clean example of a button that represents idle, pending, and confirmed states explicitly instead of collapsing a network request into an instant UI change.' },
      { icon: 'LEARN', title: 'Insurance and benefits portals', desc: 'Health insurance member portals showing prescription benefits can reuse the same supply-and-refill card pattern for plan-covered medications.' },
    ],
    faqs: [
      { q: 'Why does the refill count update after the request completes instead of immediately?', a: 'refillsLeft is decremented inside the setTimeout callback that simulates the pharmacy request completing, not synchronously when the button is clicked. This keeps the displayed count truthful to what has actually been confirmed — in a real integration with a fetch() call, the count should only change once the request genuinely succeeds.' },
      { q: 'What happens when refillsLeft reaches zero?', a: 'The click handler checks refillsLeft <= 0 and does nothing if the count is exhausted. In a real pharmacy app, this state should route the user to a "contact your prescriber" flow instead, since no further automatic refills remain on the prescription.' },
      { q: 'How is the low-supply threshold determined?', a: 'updateSupply() checks whether supplyDays is 10 or fewer and, if so, adds a .low class to both the progress bar fill and the day-count text, switching their color from blue to an amber-red gradient. Change the threshold number in that comparison to match how far in advance you want to warn patients.' },
      { q: 'Why show a spinner instead of instantly changing the button label on click?', a: 'A refill request involves a real round-trip to a pharmacy system that takes measurable time to process. Showing a "Sending request…" state with a spinner before the confirmed state accurately represents that the request is in flight rather than falsely implying it was already fulfilled.' },
      { q: 'How do I connect the button to a real pharmacy refill API?', a: 'Replace the setTimeout inside the click handler with an actual fetch() or API call to your refill endpoint. Call setState("requested") only inside the success branch of that call, and call setState("idle") again (with an error note) if the request fails, so refillsLeft is never decremented for a request that did not actually succeed.' },
      { q: 'Can this card show multiple medications at once?', a: 'Yes — render one .rx-card per prescription from an array of medication objects (name, Rx number, pharmacy, supplyDays, refillsLeft, dosage), with each card\'s button and supply bar driven by its own independent state rather than the single set of module-level variables used in this single-medication demo.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the refill counter is decremented inside the setTimeout callback rather than immediately when the button is clicked, and what could go wrong for a patient if it were decremented optimistically instead. The same assistant can help optimize it — for instance asking how to add a real error-handling branch for a rejected fetch call that reverts the button back to its idle state with an explanatory note. It's also useful for extending the card: ask it to render a list of several medications from an array with independent per-card state, add a "remind me later" snooze option, or wire the low-supply threshold to trigger a push notification. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "prescription refill" card in plain HTML, CSS, and JavaScript — no framework, no library.

Requirements:
- Show a medication name, prescription number, pharmacy name, dosage instructions, a refills-remaining count, and a supply-remaining progress bar labeled with an absolute number of days left rather than a bare percentage.
- Once the days-remaining value drops to or below a configurable low-supply threshold, both the progress bar fill and its day-count label must switch to a visually distinct "urgent" color scheme, and switch back if supply is above the threshold.
- Implement a "Request refill" button as an explicit three-state machine: an idle state that is clickable, a "sending" state entered immediately on click that disables the button and shows a loading spinner with in-progress text, and a "requested" state entered only after a simulated delay (standing in for a real network request) that disables the button permanently, shows a checkmark confirmation, and switches to a distinct confirmed color.
- The refills-remaining count must only decrement after the simulated request actually resolves in the "requested" state, never optimistically at the moment of the click, so the displayed count always reflects a confirmed refill rather than a merely attempted one.
- A helper text line below the button must change its wording depending on which of the three button states is currently active.
- If the refills-remaining count is already zero, clicking the button must do nothing rather than starting a request that could never succeed.`,
    },
  },
};

export default prescriptionRefillCard;
