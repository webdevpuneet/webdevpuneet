const addressValidationForm = {
  id: 'address-validation-form',
  title: 'Address Validation Form',
  lastmod: '2026-08-22',
  category: 'forms',
  cdnUrls: [],
  html: `<form class="avf-card" id="avfForm" novalidate>
  <h3>Shipping address</h3>

  <div class="avf-field">
    <label for="avfStreet">Street address</label>
    <input type="text" id="avfStreet" name="street" placeholder="123 Market Street" value="123 Mrket Street" required>
    <span class="avf-msg" id="avfStreetMsg"></span>
  </div>

  <div class="avf-row">
    <div class="avf-field">
      <label for="avfCity">City</label>
      <input type="text" id="avfCity" name="city" placeholder="San Francisco" value="San Francisco" required>
      <span class="avf-msg" id="avfCityMsg"></span>
    </div>
    <div class="avf-field avf-field-sm">
      <label for="avfState">State</label>
      <input type="text" id="avfState" name="state" placeholder="CA" maxlength="2" value="CA" required>
      <span class="avf-msg" id="avfStateMsg"></span>
    </div>
  </div>

  <div class="avf-field avf-field-sm">
    <label for="avfZip">ZIP code</label>
    <input type="text" id="avfZip" name="zip" placeholder="94103" value="94103" required>
    <span class="avf-msg" id="avfZipMsg"></span>
  </div>

  <div class="avf-suggestion" id="avfSuggestion" hidden>
    <div class="avf-suggestion-icon">!</div>
    <div class="avf-suggestion-body">
      <p class="avf-suggestion-title">We couldn't verify this address</p>
      <p class="avf-suggestion-text">Did you mean:</p>
      <button type="button" class="avf-suggestion-pick" id="avfSuggestionPick">123 Market Street, San Francisco, CA 94103</button>
      <button type="button" class="avf-suggestion-dismiss" id="avfSuggestionDismiss">Use address as entered</button>
    </div>
  </div>

  <button type="submit" class="avf-submit">Save address</button>
</form>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 24px}

.avf-card{background:#151b23;border:1px solid #262e3a;border-radius:16px;padding:24px;width:100%;max-width:420px;box-shadow:0 24px 60px rgba(0,0,0,.4)}
.avf-card h3{font-size:16.5px;font-weight:800;color:#e7ebf3;margin-bottom:16px}

.avf-field{display:flex;flex-direction:column;gap:5px;margin-bottom:14px}
.avf-row{display:grid;grid-template-columns:1fr 78px;gap:10px}
.avf-field-sm{max-width:120px}

.avf-field label{font-size:11.5px;font-weight:700;color:#8b96ac;text-transform:uppercase;letter-spacing:.04em}
.avf-field input{padding:10px 12px;border-radius:9px;border:1.5px solid #2a3141;background:#0f141c;color:#e7ebf3;font-family:inherit;font-size:13.5px;transition:border-color .15s,box-shadow .15s}
.avf-field input::placeholder{color:#4a5266}
.avf-field input:focus{outline:none;border-color:#7c9bff;box-shadow:0 0 0 3px rgba(124,155,255,.15)}
.avf-field.valid input{border-color:#3a5a45}
.avf-field.invalid input{border-color:#a24848;box-shadow:0 0 0 3px rgba(248,113,113,.1)}

.avf-msg{font-size:11.5px;min-height:14px;display:flex;align-items:center;gap:4px}
.avf-field.valid .avf-msg{color:#4ade80}
.avf-field.invalid .avf-msg{color:#f87171}

.avf-suggestion{display:flex;gap:12px;background:#1f1a10;border:1px solid #4a3a17;border-radius:12px;padding:14px;margin-bottom:16px}
.avf-suggestion-icon{width:22px;height:22px;border-radius:50%;background:#fbbf24;color:#1f1a10;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.avf-suggestion-title{font-size:13px;font-weight:800;color:#fde68a;margin-bottom:2px}
.avf-suggestion-text{font-size:12px;color:#c9ba8e;margin-bottom:8px}
.avf-suggestion-pick{display:block;width:100%;text-align:left;background:#241d10;border:1.5px solid #5c4a1f;border-radius:8px;padding:9px 11px;color:#fde68a;font-family:inherit;font-size:12.5px;font-weight:700;cursor:pointer;margin-bottom:8px;transition:border-color .15s}
.avf-suggestion-pick:hover{border-color:#fbbf24}
.avf-suggestion-dismiss{background:none;border:none;color:#c9ba8e;font-family:inherit;font-size:11.5px;text-decoration:underline;cursor:pointer;padding:0}

.avf-submit{width:100%;background:linear-gradient(135deg,#7c9bff,#5b7cfa);color:#fff;border:none;border-radius:10px;padding:13px;font-size:14px;font-weight:800;cursor:pointer;transition:filter .15s;font-family:inherit}
.avf-submit:hover{filter:brightness(1.08)}
.avf-submit.success{background:linear-gradient(135deg,#4ade80,#22c55e)}`,

  js: `var form = document.getElementById('avfForm');
var fields = {
  street: { input: document.getElementById('avfStreet'), msg: document.getElementById('avfStreetMsg') },
  city: { input: document.getElementById('avfCity'), msg: document.getElementById('avfCityMsg') },
  state: { input: document.getElementById('avfState'), msg: document.getElementById('avfStateMsg') },
  zip: { input: document.getElementById('avfZip'), msg: document.getElementById('avfZipMsg') },
};

var suggestion = document.getElementById('avfSuggestion');
var suggestionPick = document.getElementById('avfSuggestionPick');
var suggestionDismiss = document.getElementById('avfSuggestionDismiss');
var submitBtn = document.querySelector('.avf-submit');

var ZIP_RE = /^\\d{5}(-\\d{4})?$/;
var STATE_RE = /^[A-Za-z]{2}$/;

function setFieldState(key, state, message) {
  var f = fields[key];
  f.input.parentElement.classList.remove('valid', 'invalid');
  if (state) f.input.parentElement.classList.add(state);
  f.msg.textContent = message || '';
}

function validateField(key) {
  var val = fields[key].input.value.trim();

  if (!val) {
    setFieldState(key, 'invalid', 'This field is required.');
    return false;
  }

  if (key === 'zip') {
    if (!ZIP_RE.test(val)) {
      setFieldState(key, 'invalid', 'Enter a 5-digit ZIP code.');
      return false;
    }
  }

  if (key === 'state') {
    if (!STATE_RE.test(val)) {
      setFieldState(key, 'invalid', 'Use a 2-letter state code.');
      return false;
    }
  }

  setFieldState(key, 'valid', '\\u2713 Looks good');
  return true;
}

Object.keys(fields).forEach(function (key) {
  fields[key].input.addEventListener('input', function () { validateField(key); });
  fields[key].input.addEventListener('blur', function () { validateField(key); });
});

function allFieldsValid() {
  return Object.keys(fields).every(function (key) { return validateField(key); });
}

// Simulated address verification: flags a typo pattern ("Mrket" -> "Market") to
// demonstrate the suggestion card. Swap this for a real address-verification API.
function looksUnverifiable(streetVal) {
  return /mrket|strret|aveneu/i.test(streetVal);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!allFieldsValid()) return;

  var streetVal = fields.street.input.value.trim();
  if (looksUnverifiable(streetVal)) {
    suggestion.removeAttribute('hidden');
    return;
  }

  confirmSave();
});

suggestionPick.addEventListener('click', function () {
  fields.street.input.value = '123 Market Street';
  fields.city.input.value = 'San Francisco';
  fields.state.input.value = 'CA';
  fields.zip.input.value = '94103';
  allFieldsValid();
  suggestion.setAttribute('hidden', '');
  confirmSave();
});

suggestionDismiss.addEventListener('click', function () {
  suggestion.setAttribute('hidden', '');
  confirmSave();
});

function confirmSave() {
  var original = 'Save address';
  submitBtn.textContent = '\\u2713 Address saved';
  submitBtn.classList.add('success');
  setTimeout(function () {
    submitBtn.textContent = original;
    submitBtn.classList.remove('success');
  }, 1800);
}`,

  seo: {
    title: 'Address Validation Form — Free Real-Time Shipping Address UI',
    description: `A shipping address form with real-time field validation, a ZIP/state format check, and a "did you mean" suggestion card pattern. Pure HTML, CSS & JS.`,
    about: {
      title: 'Address Validation Form — Real-Time Checks Plus a Verification Suggestion',
      description: `Bad shipping addresses are one of the most expensive UX failures in e-commerce — a typo that isn't caught until a package bounces costs real money. This snippet builds the two-layer defense real checkout forms use: real-time per-field validation as the user types, plus a simulated "we couldn't verify this address, did you mean" suggestion card mimicking what a real address-verification API (Smarty, Lob, Google's Address Validation API) would return. It complements [inline validation form](/ui-snippets/inline-validation-form/) and [address autocomplete](/ui-snippets/address-autocomplete/) in a full checkout flow.

**One function, three consistent states**

\`setFieldState(key, state, message)\` is the single place that touches a field's visual state — it clears any previous \`valid\`/\`invalid\` class, applies the new one, and sets the message text together, in one call. This guarantees a field's border color and its message text can never contradict each other, a common bug when validation styling and message text are updated by separate code paths.

**Validating on both input and blur**

Each field validates on every keystroke (\`input\`) and again on \`blur\` — validating on input gives immediate feedback as the user types (particularly useful for catching a malformed ZIP before they move on), while validating on blur catches the case where a field is left empty after the user tabs away without typing anything.

**Format checks with real regular expressions**

The ZIP field is checked against \`/^\\d{5}(-\\d{4})?$/\`, accepting both 5-digit and ZIP+4 formats, and the state field against \`/^[A-Za-z]{2}$/\` for a 2-letter code. These are deliberately simple, honest regex checks — they verify *format*, not that the ZIP or state code actually exists, which is exactly the distinction a real form should make clear to the user (format-valid isn't the same as address-verified).

**The suggestion card is a distinct failure mode**

Even a form where every field individually validates can still fail address *verification* — the format-valid but unverifiable case is what the "did you mean" suggestion card handles. It's deliberately visually distinct (an amber warning tone) from the red invalid-field state, because a suggested correction is a different kind of problem than a missing or malformed field: the form doesn't know the address is wrong, only that it can't confirm it's right.

**Two ways out of the suggestion**

The card offers both "use the suggested address" (which repopulates and revalidates every field) and "use address as entered" (which respects the user's insistence and proceeds anyway) — a real verification flow should never trap the user behind a suggestion they don't want to accept. Wire \`looksUnverifiable()\` to a real geocoding/address-verification API call, and replace the hardcoded suggested address with whatever the API actually returns.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A shipping address form renders pre-filled with a deliberate street typo ("Mrket").` },
      { title: 'Edit a field', text: `Each field validates on every keystroke and on blur, showing a green check or a red error inline.` },
      { title: 'Submit the form', text: `Since every field is format-valid but the street has a typo pattern, a "did you mean" suggestion card appears.` },
      { title: 'Accept or dismiss the suggestion', text: `Pick the suggested address to auto-fill and revalidate every field, or dismiss to proceed as entered.` },
      { title: 'Watch the save confirmation', text: `The submit button briefly confirms "Address saved" before reverting.` },
      { title: 'Connect a real API', text: `Replace looksUnverifiable() with a call to an address-verification service, using its actual suggested address.` },
    ] },
    features: [
      { title: 'Single state function', text: `setFieldState() is the one place a field's border, class, and message ever change together.` },
      { title: 'Input + blur validation', text: `Immediate feedback while typing, plus a catch for fields left empty on blur.` },
      { title: 'Real format regexes', text: `ZIP and state fields are checked against honest, simple format patterns.` },
      { title: 'Distinct suggestion state', text: `A visually separate amber "did you mean" card, not conflated with red field errors.` },
      { title: 'Two suggestion exits', text: `Accept the suggested address or proceed as entered — never a dead end.` },
      { title: 'One-click autofill', text: `Picking the suggestion repopulates and revalidates every field at once.` },
      { title: 'Save confirmation state', text: `A brief success state on the submit button confirms the save.` },
      { title: 'Format-only ZIP/state checks', text: `Honestly validates shape, not real-world existence — a documented, intentional boundary.` },
    ],
    useCases: [
      { title: 'E-commerce checkout addresses', text: 'Catch shipping typos before a package bounces, with per-field checks and an amber did-you-mean suggestion card inside a [checkout form](/ui-snippets/checkout-form/).' },
      { title: 'Saved address settings', text: 'Validate addresses in an account area, with one `setFieldState()` function controlling every field\'s border, class and message.' },
      { title: 'Fulfilment staff tools', text: 'Give internal staff the same verification as customers, using honest regular expressions for ZIP and state format.' },
      { title: 'Signup billing addresses', text: 'Validate a billing address during onboarding, combining input and blur checks as in an [inline validation form](/ui-snippets/inline-validation-form/).' },
      { title: 'Logistics and autocomplete pairing', text: 'Reduce bounced packages on shipping platforms, using this as the manual fallback beside an [address autocomplete](/ui-snippets/address-autocomplete/).' },
    ],
    faqs: [
      { q: "How does the form keep a field's color and message text from disagreeing?", a: `setFieldState(key, state, message) is the single function that ever touches a field's valid/invalid class and its message text — it clears any previous state class before applying the new one and setting the message, in one call. Because no other code path modifies these independently, a field's border color and its message can never contradict each other.` },
      { q: 'Why does each field validate on both input and blur?', a: `Validating on input gives immediate feedback as the user types, which is especially useful for a field like ZIP where a malformed pattern should be caught before the user moves on. Validating again on blur catches the separate case of a required field being left empty entirely — a user who tabs through a field without typing anything never fires an input event, so blur is needed to catch that.` },
      { q: "What's the difference between the red invalid-field state and the amber suggestion card?", a: `The red invalid state means a field fails a structural check the form can verify itself (empty, wrong ZIP format, not a 2-letter state code). The amber suggestion card represents a different kind of uncertainty: every field is structurally valid, but the form (or a real address-verification API) still can't confirm the address actually exists as entered. Keeping these visually distinct avoids implying a suggested correction is the same severity as a missing field.` },
      { q: 'How do I connect this to a real address verification API?', a: `Replace looksUnverifiable() with an async call to a service like Smarty, Lob, or Google's Address Validation API, sent on submit once all fields pass local format validation. Use whatever corrected/standardized address the API returns as the suggestion card's content instead of the hardcoded "123 Market Street" fallback, and handle the API's own confidence levels (verified, partially verified, unverifiable) as distinct UI states if needed.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Hold each field's value and validation state (valid/invalid/none plus message) in component state, updating it in onChange and onBlur handlers that mirror validateField()'s logic. Represent the suggestion card's visibility and its suggested-address content as state too, so picking the suggestion becomes a single state update that repopulates and revalidates every field's state object at once.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the validation-state consistency or the suggestion-card UX pattern on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why routing every field's color and message change through a single setFieldState() function prevents the two from ever disagreeing, and why the amber "did you mean" suggestion state is kept visually and logically distinct from the red per-field invalid state rather than conflated into one error type. The same assistant can help optimize it — asking whether validating on both input and blur is redundant for any field type, or whether the ZIP and state regex checks should be loosened or tightened for international address support. It's also useful for extending the form: ask it to wire looksUnverifiable() to a real address-verification API with async loading states, add support for international address formats with a country selector, or add a "save this address for next time" checkbox with its own persistence logic. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "address validation form" in plain HTML, CSS, and JavaScript with no library or CDN dependency.

Requirements:
- A shipping address form with street, city, state, and ZIP fields, each showing a real-time inline validation message (green checkmark for valid, red error text for invalid) that updates as the user types and again when a field loses focus, so both an in-progress typo and a field left empty entirely are both caught.
- Route every field's border-color class and its message text through one single shared function (not separate code paths) so a field's visual valid/invalid state and its displayed message can never contradict each other.
- Real format-checking regular expressions for ZIP (5 digits, optionally followed by a 4-digit extension) and state (a 2-letter code) — the validation should honestly check format/shape only, not claim to confirm the ZIP or state actually exists.
- On submit, if every field passes its own format validation but the street address matches a simulated "looks like a typo" pattern (representing what a real address-verification API would flag), show a distinct "we couldn't verify this address, did you mean: [suggested address]" card that is visually different from the red per-field error state (e.g. a warning/amber tone, not red) — this represents a different kind of problem (unverifiable, not structurally invalid).
- The suggestion card must offer two ways forward: a button that accepts the suggested address (auto-filling and revalidating every field) and a separate button to proceed with the address exactly as the user entered it — the form must never trap the user behind the suggestion with no way to continue on their own terms.
- After a successful submit (either by accepting the suggestion, dismissing it, or when no suggestion was triggered), show a brief success confirmation on the submit button before it reverts to its normal label.`,
    },
  },
};

export default addressValidationForm;
