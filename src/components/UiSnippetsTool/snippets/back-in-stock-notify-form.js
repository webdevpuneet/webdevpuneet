const backInStockNotifyForm = {
  id: 'back-in-stock-notify-form',
  title: 'Back in Stock Notify Me Form',
  lastmod: '2026-08-22',
  category: 'forms',
  cdnUrls: [],
  html: `<div class="bis-card">
  <div class="bis-product">
    <div class="bis-swatch">&#128266;</div>
    <div>
      <h3>Aria Wireless Headphones</h3>
      <span class="bis-oos-tag">Out of stock</span>
    </div>
  </div>

  <div class="bis-form" id="bisForm">
    <p class="bis-copy">Get notified the moment this is back in stock.</p>
    <form id="bisNotifyForm" novalidate>
      <div class="bis-field">
        <input type="email" id="bisEmail" placeholder="you@example.com" autocomplete="email" />
        <button type="submit">Notify me</button>
      </div>
      <p class="bis-error" id="bisError" hidden>Enter a valid email address.</p>
    </form>
  </div>

  <div class="bis-success" id="bisSuccess" hidden>
    <div class="bis-success-icon">&#10003;</div>
    <p class="bis-success-title">You're on the list</p>
    <p class="bis-success-copy">We'll email <b id="bisSuccessEmail"></b> the moment it's back.</p>
    <button type="button" class="bis-edit-link" id="bisEdit">Wrong email? Edit</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.bis-card{background:#111720;border:1px solid #1f2733;border-radius:18px;padding:24px;width:100%;max-width:380px;box-shadow:0 20px 50px rgba(0,0,0,.45)}

.bis-product{display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:18px;border-bottom:1px solid #1f2733}
.bis-swatch{width:52px;height:52px;flex-shrink:0;border-radius:12px;background:#1a2230;display:flex;align-items:center;justify-content:center;font-size:22px;filter:grayscale(1) opacity(.7)}
.bis-product h3{font-size:14.5px;font-weight:700;color:#e9edf5}
.bis-oos-tag{display:inline-block;margin-top:5px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;padding:3px 8px;border-radius:999px;background:rgba(248,113,113,.14);color:#f87171}

.bis-copy{font-size:12.5px;color:#8993a8;margin-bottom:14px;line-height:1.5}

.bis-field{display:flex;gap:8px}
.bis-field input{flex:1;min-width:0;background:#0c1118;border:1.5px solid #232c3b;border-radius:9px;padding:10px 12px;color:#e9edf5;font-size:13px;font-family:inherit;transition:border-color .15s}
.bis-field input:focus{outline:none;border-color:#38bdf8}
.bis-field input.is-invalid{border-color:#f87171}
.bis-field button{background:#38bdf8;border:none;border-radius:9px;padding:10px 16px;color:#06212e;font-size:12.5px;font-weight:800;cursor:pointer;white-space:nowrap;transition:background .15s}
.bis-field button:hover{background:#22a8ea}

.bis-error{margin-top:8px;font-size:11.5px;color:#f87171}
.bis-error[hidden]{display:none}

.bis-success{display:flex;flex-direction:column;align-items:center;text-align:center;gap:5px;padding:8px 0 4px}
.bis-success[hidden]{display:none}
.bis-success-icon{width:38px;height:38px;border-radius:999px;background:rgba(74,222,128,.14);color:#4ade80;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;margin-bottom:6px}
.bis-success-title{font-size:14.5px;font-weight:800;color:#e9edf5}
.bis-success-copy{font-size:12.5px;color:#8993a8;line-height:1.5;margin-bottom:8px}
.bis-success-copy b{color:#c7d0e3;font-weight:700}
.bis-edit-link{background:none;border:none;color:#38bdf8;font-size:12px;font-weight:700;cursor:pointer;text-decoration:underline;text-underline-offset:2px}
.bis-edit-link:hover{color:#7dd8fb}`,

  js: `var formWrap = document.getElementById('bisForm');
var successWrap = document.getElementById('bisSuccess');
var form = document.getElementById('bisNotifyForm');
var emailInput = document.getElementById('bisEmail');
var errorEl = document.getElementById('bisError');
var successEmailEl = document.getElementById('bisSuccessEmail');
var editBtn = document.getElementById('bisEdit');

function isValidEmail(value) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var value = emailInput.value.trim();

  if (!isValidEmail(value)) {
    emailInput.classList.add('is-invalid');
    errorEl.hidden = false;
    return;
  }

  emailInput.classList.remove('is-invalid');
  errorEl.hidden = true;

  successEmailEl.textContent = value;
  formWrap.hidden = true;
  successWrap.hidden = false;
});

emailInput.addEventListener('input', function () {
  if (emailInput.classList.contains('is-invalid') && isValidEmail(emailInput.value.trim())) {
    emailInput.classList.remove('is-invalid');
    errorEl.hidden = true;
  }
});

editBtn.addEventListener('click', function () {
  successWrap.hidden = true;
  formWrap.hidden = false;
  emailInput.focus();
  emailInput.select();
});`,

  seo: {
    title: 'Back in Stock Notify Me Form — Free Email Capture Widget (HTML/CSS/JS)',
    description: `An out-of-stock product state with a validated "Notify me" email capture form, a clear success confirmation, and an edit link to fix a mistyped email. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Back in Stock Notify Me Form — Capture Demand Without Losing the Sale',
      description: `An out-of-stock page is a moment of lost intent — the shopper wanted to buy, and a plain "sold out" message sends them away for good. A "notify me when available" form turns that lost sale into a captured lead, but only if the form is trustworthy: it needs to validate the email before submitting, confirm clearly that the request went through, and let the shopper fix a typo without starting over. This snippet builds that complete three-state flow in plain HTML, CSS, and vanilla JavaScript.

**Inline validation before submission**

The form validates on submit with a simple email-shape regex, and — this is the detail that matters — once an invalid attempt has shown an error, the input re-validates on every keystroke so the error clears itself the moment the address becomes valid, rather than requiring a second submit click to discover the error is gone. No network request or backend is simulated; validation is purely client-side shape-checking, which is exactly what should happen before you ever hit an API.

**A success state that repeats the email back**

After a valid submit, the form swaps for a confirmation view that explicitly echoes the submitted address — "We'll email **you@example.com** the moment it's back" — rather than a generic "Thanks, you're signed up." Repeating the value back is what lets a shopper immediately notice if they made a typo, instead of finding out weeks later when the notification never arrives.

**An edit path back, not a dead end**

Right below the confirmation, an "Wrong email? Edit" link returns to the form with the previously entered address still filled in and selected, ready to be corrected and resubmitted. This is a small but important piece of forgiving form design — a mistake shouldn't require abandoning the whole flow and starting from a blank field.

**Where it fits**

Pair it with a [product card](/ui-snippets/product-card/) or [product quick view](/ui-snippets/product-quick-view/) for the surrounding product context, a [waitlist signup](/ui-snippets/waitlist-signup/) for a similar pre-launch capture pattern, or a [promo-code-input](/ui-snippets/promo-code-input/) for the same inline-validation-plus-confirmation approach applied to a different field.

**Customizing it**

Swap the regex for a stricter validator, add a debounced "check availability" call to confirm the product is genuinely still out of stock before showing the form, or extend the success state with a secondary CTA to browse similar in-stock products.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An out-of-stock product card renders with a Notify me form.` },
      { title: 'Submit with a bad email', text: `An inline error appears and the input outlines in red.` },
      { title: 'Start typing a valid address', text: `The error clears automatically as soon as it's valid.` },
      { title: 'Submit a valid email', text: `The form swaps for a success state that echoes the address back.` },
      { title: 'Click "Wrong email? Edit"', text: `You return to the form with your previous entry pre-filled and selected.` },
      { title: 'Wire up the backend', text: `Replace the local success-state swap with a real API call in the submit handler.` },
    ] },
    features: [
      { title: 'Inline email validation', text: `A shape-check regex runs on submit and re-checks live once an error has shown.` },
      { title: 'Self-clearing error', text: `The error message and red outline disappear the moment the address becomes valid.` },
      { title: 'Confirmation echoes the email', text: `The success state repeats the submitted address so typos are caught immediately.` },
      { title: 'Edit-and-retry path', text: `A dedicated link returns to the form with the prior value pre-filled and selected.` },
      { title: 'Three clean states', text: `Form, error, and success states never overlap or show simultaneously.` },
      { title: 'No page reload', text: `preventDefault keeps the whole flow inline within the card.` },
      { title: 'Out-of-stock context', text: `A product header with a clear "Out of stock" tag frames the form's purpose.` },
      { title: 'Framework-agnostic core', text: `Three simple states and one validator port directly to any component model.` },
    ],
    useCases: [
      { title: 'Out-of-stock product pages', text: 'Capture demand on any sold-out item, turning a lost sale into a lead with a validated Notify me email form.' },
      { title: 'Limited drops and restock campaigns', text: 'Pair with a [product quick view](/ui-snippets/product-quick-view/) so shoppers can request a restock alert without leaving the listing.' },
      { title: 'Pre-launch waitlists', text: 'Adapt the same validate, confirm and edit flow for early access, or compare with a standalone [waitlist signup](/ui-snippets/waitlist-signup/).' },
      { title: 'Variant-specific restocks', text: 'Use per size or colour variant on a [product card](/ui-snippets/product-card/), so a shopper is told about exactly the option they wanted.' },
      { title: 'Update signups and seller alerts', text: 'Reuse for newsletter updates or third-party marketplace inventory alerts, where the confirmation echoes the address and offers an edit link.' },
      { icon: 'CODE', title: 'Related: Calculator', desc: 'See the [Calculator](/ui-snippets/calculator/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What validation does the email field run?', a: `On submit, the value is trimmed and tested against a basic email-shape regex (something@something.something). If it fails, the input gets an invalid outline and an inline error shows. If it passes, the form immediately swaps to the success state — there's no simulated network delay since this snippet handles only client-side shape validation.` },
      { q: 'Why does the error clear itself while typing?', a: `Once an invalid submission has shown the error, an input listener re-checks the value on every keystroke and removes the error and invalid styling as soon as the address becomes valid — so the shopper isn't stuck staring at a stale error message after they've already fixed it, and doesn't need to click submit again just to clear it.` },
      { q: 'Why does the success message repeat the submitted email back?', a: `Echoing the exact address back ("We'll email you@example.com...") is what lets a shopper catch a typo immediately, while they're still on the page, instead of discovering weeks later that the restock notification never arrived because of a mistyped domain.` },
      { q: 'How does the "edit" link work?', a: `Clicking it hides the success view and re-shows the form, then focuses and selects the email input's existing text — so the shopper can either overwrite the whole thing or fix a small typo, without needing to re-type an address that was already mostly correct.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Track two booleans in state — hasError and isSubmitted (or a single status enum with 'form' | 'error' | 'success' values) — and conditionally render the three views. The isValidEmail() regex function and the submit handler's logic port over unchanged; only the DOM hidden-attribute toggles become conditional rendering.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to design the validate-confirm-edit flow from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the error only clears itself on keystrokes after a failed submit (rather than validating on every keystroke from the start, which can feel naggy before the user has even finished typing), and why the success state explicitly echoes the submitted email address instead of showing a generic thank-you message. The same assistant can help you harden it — ask whether the current regex is too permissive or too strict for real-world email addresses, and how you'd add a debounced server-side check to catch a typo'd but well-formed domain (like "gmial.com"). It's also useful for extending the form: ask it to add a loading state for the real API call this snippet doesn't simulate, persist the submitted state in localStorage so a returning visitor sees "you're already on the list," or add an unsubscribe/cancel-notification option. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "back in stock, notify me" email capture form in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- Show an out-of-stock product header (name, image/icon placeholder, an "Out of stock" tag) above the form.
- The form has a single email input and a submit button. On submit, prevent the default page reload and validate the email against a reasonable email-shape check.
- If invalid, show an inline error message below the input and visually mark the input as invalid (e.g. a red outline) — do not let the form proceed to a success state.
- Once an invalid submission has shown the error, re-validate on every keystroke in the input and automatically clear the error and invalid styling the moment the value becomes valid, without requiring another submit click.
- On a valid submit, hide the form and show a distinct success view that explicitly repeats the submitted email address back to the user (e.g. "We'll email you at [address] the moment it's back"), not just a generic confirmation message.
- In the success view, include an "edit" link or button that returns to the form with the previously submitted email address still filled in (and ideally selected/focused), so the user can correct a typo without retyping the whole address.
- Keep the three states — form, error, and success — mutually exclusive, and make sure no page reload or console error occurs during the whole flow.`,
    },
  },
};

export default backInStockNotifyForm;
