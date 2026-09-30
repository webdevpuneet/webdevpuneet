const exitIntentPopup = {
  id: 'exit-intent-popup',
  title: 'Exit Intent Popup',
  lastmod: '2026-06-22',
  category: 'modals',
  html: `<div class="eip-page">
  <p class="eip-hint">Move your mouse up out of the page (toward the tab bar) to trigger the exit-intent popup. On this preview, click "Simulate exit" if your cursor can't leave the frame.</p>
  <button type="button" class="eip-sim" id="eipSim">Simulate exit intent</button>
</div>

<div class="eip-backdrop" id="eipBackdrop"></div>
<div class="eip-modal" id="eipModal" role="dialog" aria-modal="true" aria-label="Special offer">
  <button type="button" class="eip-close" id="eipClose" aria-label="Close">✕</button>
  <div class="eip-badge">Wait — before you go</div>
  <h2>Here's <span>15% off</span> your first order</h2>
  <p class="eip-sub">Join 12,000+ subscribers and get the code emailed instantly. No spam, unsubscribe anytime.</p>

  <form id="eipForm" novalidate>
    <div class="eip-field">
      <input type="email" id="eipEmail" placeholder="you@example.com" autocomplete="email">
      <button type="submit">Email my code</button>
    </div>
    <p class="eip-error" id="eipError" hidden></p>
  </form>

  <div class="eip-success" id="eipSuccess" hidden>
    <div class="eip-success-icon">✓</div>
    <strong>Check your inbox!</strong>
    <span>Your <b>WELCOME15</b> code is on its way.</span>
  </div>

  <button type="button" class="eip-decline" id="eipDecline">No thanks, I'll pay full price</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh}

.eip-page{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px;text-align:center}
.eip-hint{color:#94a3b8;font-size:14px;font-weight:600;max-width:360px;line-height:1.55}
.eip-sim{background:#1e293b;color:#fff;border:none;border-radius:10px;padding:11px 20px;font-size:14px;font-weight:700;cursor:pointer}

.eip-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.55);opacity:0;pointer-events:none;transition:opacity .25s;z-index:90}
.eip-backdrop.show{opacity:1;pointer-events:all}

.eip-modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-46%) scale(.96);opacity:0;pointer-events:none;
  width:min(420px,92vw);background:#fff;border-radius:18px;padding:30px 26px 18px;text-align:center;
  box-shadow:0 30px 70px rgba(15,23,42,.3);z-index:91;transition:opacity .26s,transform .26s}
.eip-modal.show{opacity:1;transform:translate(-50%,-50%) scale(1);pointer-events:all}

.eip-close{position:absolute;top:12px;right:12px;width:28px;height:28px;border-radius:50%;border:none;background:#f1f5f9;color:#64748b;cursor:pointer;font-size:13px}
.eip-close:hover{background:#e2e8f0}

.eip-badge{display:inline-block;background:#fef3c7;color:#b45309;font-size:11.5px;font-weight:800;padding:5px 12px;border-radius:999px;text-transform:uppercase;letter-spacing:.04em;margin-bottom:14px}
.eip-modal h2{font-size:24px;font-weight:800;color:#0f172a;line-height:1.2;margin-bottom:10px}
.eip-modal h2 span{color:#6366f1}
.eip-sub{font-size:13px;color:#64748b;line-height:1.55;margin-bottom:20px}

.eip-field{display:flex;gap:8px}
.eip-field input{flex:1;border:1.5px solid #e2e8f0;border-radius:10px;padding:11px 13px;font-size:14px;font-family:inherit;color:#0f172a}
.eip-field input:focus{outline:none;border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15)}
.eip-field button{background:#6366f1;color:#fff;border:none;border-radius:10px;padding:0 18px;font-size:13.5px;font-weight:700;cursor:pointer;white-space:nowrap;transition:background .15s}
.eip-field button:hover{background:#4f46e5}
.eip-error{color:#dc2626;font-size:12px;font-weight:600;text-align:left;margin-top:7px}

.eip-success{display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px 0}
.eip-success[hidden]{display:none}
.eip-success-icon{width:46px;height:46px;border-radius:50%;background:#22c55e;color:#fff;font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center;margin-bottom:6px}
.eip-success strong{font-size:16px;color:#0f172a}
.eip-success span{font-size:13px;color:#64748b}
.eip-success b{color:#6366f1}

.eip-decline{background:none;border:none;color:#94a3b8;font-size:12px;font-weight:600;cursor:pointer;margin-top:16px;text-decoration:underline}
.eip-decline:hover{color:#64748b}`,

  js: `var EMAIL_RE = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
var backdrop = document.getElementById('eipBackdrop');
var modal = document.getElementById('eipModal');
var shown = false;          // only fire once per session
var armed = true;           // becomes false after it fires or is dismissed

function openPopup() {
  if (shown || !armed) return;
  shown = true; armed = false;
  backdrop.classList.add('show');
  modal.classList.add('show');
  // In production, persist this so it doesn't fire again on the next page:
  // sessionStorage.setItem('exitShown', '1');
}
function closePopup() {
  backdrop.classList.remove('show');
  modal.classList.remove('show');
}

// Exit intent: pointer leaves through the TOP of the viewport (toward the tab/URL bar).
document.addEventListener('mouseout', function (e) {
  if (e.clientY <= 0 && !e.relatedTarget) openPopup();
});

document.getElementById('eipSim').addEventListener('click', openPopup);
document.getElementById('eipClose').addEventListener('click', closePopup);
document.getElementById('eipDecline').addEventListener('click', closePopup);
backdrop.addEventListener('click', closePopup);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('show')) closePopup();
});

document.getElementById('eipForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var input = document.getElementById('eipEmail');
  var error = document.getElementById('eipError');
  var email = input.value.trim();
  if (!EMAIL_RE.test(email)) {
    error.textContent = 'Please enter a valid email address.';
    error.hidden = false;
    return;
  }
  error.hidden = true;
  // Send the email + tag the lead with the offer here.
  document.getElementById('eipForm').hidden = true;
  document.getElementById('eipSuccess').hidden = false;
  setTimeout(closePopup, 2600);
});`,

  seo: {
    title: 'Exit Intent Popup — Mouse-Leave Offer HTML CSS JS',
    description: `An exit-intent popup that fires once when the cursor leaves the top of the page, offering a discount with email capture. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Exit Intent Popup — Mouse-Leave Detection, Discount Offer & Email Capture',
      description: `An exit-intent popup is the conversion tactic that catches a visitor in the act of leaving — the moment their cursor races toward the browser's close button or back arrow — and offers one last reason to stay: a discount code, a lead-magnet download, or a newsletter signup. This snippet builds the complete pattern in plain HTML, CSS, and vanilla JavaScript: exit detection, a discount modal with email capture and validation, a success state, and the fire-once discipline that keeps it from becoming an annoyance.

**How exit-intent detection actually works**

The trigger is a single \`mouseout\` listener on \`document\`. When the pointer leaves through the *top* of the viewport — \`e.clientY <= 0\` with no \`relatedTarget\` (meaning it exited the window rather than moving onto another element) — the user is reaching for the tab bar, the URL bar, or the close button, which is the strongest available signal of an imminent exit. Checking the top edge specifically (rather than any edge) avoids false fires when someone's cursor merely drifts to a side scrollbar or off the bottom. This is a desktop-only signal by nature; there's no cursor on touch devices, so mobile needs a different trigger (covered in the FAQs).

**Fire exactly once, then stay quiet**

Nothing erodes trust faster than a popup that reappears every time the mouse twitches toward the top of the screen. Two flags enforce restraint: \`shown\` prevents a second appearance in the same page view, and \`armed\` is cleared the instant it fires or is dismissed. A production build extends this with \`sessionStorage\` (or a cookie with a multi-day expiry) so the popup doesn't fire again on the next page load or the visitor's next session — the commented hook is right there in \`openPopup()\`. The goal is one well-timed ask, not a recurring interruption.

**Email capture with real validation**

The offer is gated behind an email field so the discount becomes a lead, not just a giveaway. Submitting validates the address against a pragmatic regex (catching the common typos without claiming full RFC compliance), shows an inline error for an invalid entry, and on success swaps the form for a confirmation state showing the actual code (\`WELCOME15\`) before auto-closing. In a real build, the submit handler is where you'd POST the email to your ESP and tag the lead with the offer source.

**The decline link matters**

Beneath the form sits a deliberately plain "No thanks, I'll pay full price" link. A negative-framing decline (sometimes called a "confirm-shaming" opt-out, used tastefully here) gives the user a clear, friction-free way out — which both respects their choice and, research consistently shows, slightly increases conversion by making the value of the offer explicit at the moment of refusal. It routes through the same \`closePopup()\` as the ✕ button, the backdrop click, and the Escape key, so every dismissal path is consistent.

**Smooth, accessible presentation**

The modal is \`role="dialog"\` with \`aria-modal="true"\`, animates in with \`opacity\` and \`transform\` only (a slight scale-and-rise, never height), and dims the page behind a backdrop — keeping it crash-safe across every framework export and giving keyboard users an Escape route.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A page renders with a hint and a "Simulate exit intent" button (since a cursor can't always leave an embedded preview frame).` },
      { title: 'Trigger the exit intent', text: `Move your mouse up out of the top of the page toward the tab bar — or click "Simulate exit intent" — and the discount modal appears.` },
      { title: 'See the fire-once behavior', text: `Dismiss the modal and try again — it won't re-fire, because it's armed to show only once per page view.` },
      { title: 'Submit an email', text: `Enter an invalid email to see the inline error; enter a valid one to see the success state revealing the WELCOME15 code.` },
      { title: 'Persist across pages', text: `Uncomment the sessionStorage line in openPopup() (and check it before firing) so the popup stays quiet on later pages and visits.` },
      { title: 'Connect your email service', text: `In the form submit handler, POST the captured email to your ESP (Mailchimp, Klaviyo, ConvertKit) and tag the lead with the offer source.` },
    ] },
    features: [
      { title: 'Top-edge mouse-leave detection', text: `A mouseout listener fires only when the cursor exits through the top of the viewport — the real "about to leave" signal.` },
      { title: 'Fires exactly once', text: `shown and armed flags prevent repeat appearances, with a sessionStorage hook to extend that across pages and sessions.` },
      { title: 'Discount offer with email capture', text: `Gates the code behind an email field so the offer generates a lead, not just a giveaway.` },
      { title: 'Inline email validation', text: `A pragmatic regex catches invalid addresses and shows a specific inline error before any submit proceeds.` },
      { title: 'Success state with the code', text: `Submitting swaps the form for a confirmation showing the actual discount code, then auto-closes.` },
      { title: 'Tasteful decline link', text: `A clear "no thanks" opt-out gives an honest way out and routes through the same dismissal logic as every other close path.` },
      { title: 'Backdrop, close, Escape, decline dismissal', text: `All four close paths call one closePopup() function, keeping behavior consistent everywhere.` },
      { title: 'Accessible, animation-safe modal', text: `role="dialog" with aria-modal, opacity/transform-only transitions, and a dimming backdrop — smooth across every export.` },
    ],
    useCases: [
      { title: 'E-commerce cart abandonment', text: `Catch shoppers leaving without buying and offer a first-order discount — pair with a [free shipping bar](/ui-snippets/free-shipping-bar/) for stacked incentives.` },
      { title: 'Newsletter and lead generation', text: `Offer a lead magnet (guide, checklist, template) in exchange for an email at the moment of exit.` },
      { title: 'SaaS trial conversion', text: `Prompt a visitor leaving the pricing page with an extended trial or a demo-booking link.` },
      { title: 'Content and media sites', text: `Capture subscribers before a reader bounces, framing the value of staying subscribed.` },
      { title: 'Course and info-product sales', text: `Present a time-limited coupon alongside a [countdown timer](/ui-snippets/countdown-timer/) when a visitor leaves the checkout.` },
      { title: 'Learning intent-detection patterns', text: `A practical reference for mouseout exit detection and fire-once discipline — compare with a [social proof popup](/ui-snippets/social-proof-popup/) for passive, non-triggered prompts.` },
      { icon: 'CODE', title: 'Related: Delete Confirmation Modal', desc: 'See the [Delete Confirmation Modal](/ui-snippets/delete-confirmation-modal/) for a related modals pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Accessible Modal Primitive with Real Focus Trap', desc: 'See the [Accessible Modal Primitive with Real Focus Trap](/ui-snippets/focus-trap-modal-primitive/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I make the popup fire only once per visitor, not once per page?', a: `On fire, write a flag to sessionStorage (one popup per browsing session) or a cookie with a multi-day expiry (one per N days), and check that flag at the top of openPopup() before showing anything. The commented sessionStorage line in the code is the exact hook — uncomment it and add the matching guard.` },
      { q: 'Does exit-intent work on mobile?', a: `No — touch devices have no cursor, so there's no mouse-leave signal. Mobile alternatives include firing on a fast upward scroll (reaching for the address bar), after a time-on-page or scroll-depth threshold, or on a history back-button (popstate) attempt. Detect touch with a coarse-pointer media query and swap triggers accordingly.` },
      { q: 'Is the negative "No thanks" decline link a good idea?', a: `Used tastefully, yes — a clear opt-out respects the user and often lifts conversion by making the offer's value explicit at the moment of refusal. Avoid manipulative or guilt-heavy wording; the point is an honest, friction-free exit, not coercion. Keep it visually subordinate to the primary action.` },
      { q: 'How do I connect the email capture to my marketing tool?', a: `In the form submit handler, after validation passes, POST the email to your ESP's API (Mailchimp, Klaviyo, ConvertKit, HubSpot) with a tag identifying the offer and source, then show the success state on a successful response and the inline error on failure — keep the optimistic UI so the user gets instant feedback.` },
      { q: 'How do I use this exit-intent popup in React, Vue, or Angular?', a: `In React, attach the mouseout listener in a useEffect (cleaning up on unmount) and hold the open/shown/armed state in useState or a ref; in Vue, use onMounted/onUnmounted with ref(); in Angular, use HostListener('document:mouseout') and component fields. The detection and fire-once logic are framework-agnostic.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to just trust that the exit-intent detection is reliable. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the mouseout check requires both e.clientY less than or equal to zero and a null relatedTarget, and what false-positive scenario the relatedTarget check is specifically guarding against. The same assistant can help optimize it — ask whether the shown and armed boolean pair could be collapsed into one state value without losing any of the current guard logic, and how the commented-out sessionStorage line should actually be wired in alongside a check at the top of openPopup. It's also useful for extending the popup: ask it to add a scroll-depth or time-on-page fallback trigger for touch devices where mouseout never fires, an A/B-testable second offer variant, or a countdown timer inside the modal that adds urgency to the discount code. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an exit-intent popup in plain HTML, CSS, and JavaScript that detects a user about to leave the page and offers a discount — no library.

Requirements:
- A document-level mouseout listener that only counts as exit intent when the cursor leaves through the very top edge of the viewport (clientY less than or equal to 0) and relatedTarget is null (meaning the pointer left the window entirely, not just moved onto another element) — not any generic mouseout anywhere on the page.
- Two independent boolean flags that gate the popup: one that has permanently been set once the popup has shown this page view, and one that gets cleared as soon as the popup fires or is dismissed, so it can never reopen itself after being shown once.
- A modal with a backdrop that fades in with opacity, animates in with a subtle scale-and-rise transform (never animating height), contains an email input gated behind an offer, and includes a plainly-worded decline link as an alternative to the primary email form, both routing to the exact same single close function.
- Client-side email format validation on submit using a regex check, displaying an inline error message for an invalid address and blocking submission, while a valid address swaps the form out for a success confirmation showing the actual discount code before auto-closing after a few seconds.
- Every dismissal path — a close button, a backdrop click, an Escape keypress, and the decline link — must call the same single close function so behavior stays consistent no matter how the user leaves.
- Add a commented-out or explained hook for persisting the "already shown" state to sessionStorage (or a longer-lived cookie) so the popup does not reappear on the next page load within the same session, and describe what check needs to run before opening to respect that persisted flag.`,
    },
  },
};

export default exitIntentPopup;
