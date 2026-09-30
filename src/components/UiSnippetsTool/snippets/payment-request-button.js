const paymentRequestButton = {
  id: 'payment-request-button',
  title: 'Payment Request API Button',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<section class="prb-wrap">
  <span class="prb-tag">payment request api</span>
  <h1>Checkout</h1>
  <p class="prb-desc">Wireless earbuds — 1 item</p>
  <div class="prb-summary">
    <div class="prb-row"><span>Subtotal</span><span>$78.00</span></div>
    <div class="prb-row"><span>Shipping</span><span>$4.00</span></div>
    <div class="prb-row prb-total"><span>Total</span><span>$82.00</span></div>
  </div>

  <button class="prb-btn" id="prbPayBtn">Pay now</button>
  <p class="prb-status" id="prbStatus">Uses the real Payment Request API where available.</p>

  <div class="prb-success" id="prbSuccess" hidden>
    <span class="prb-check">✓</span>
    <div>
      <strong id="prbSuccessTitle">Payment complete</strong>
      <p id="prbSuccessDetail">Charged $82.00.</p>
    </div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0f1f18,#050a08 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.prb-wrap{width:100%;max-width:380px;text-align:center}
.prb-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#6ee7b7;background:rgba(110,231,183,.1);border:1px solid rgba(110,231,183,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.prb-wrap h1{font-size:28px;font-weight:800;letter-spacing:-.02em}
.prb-desc{color:#9fb3aa;font-size:13.5px;margin-top:6px}
.prb-summary{margin:22px 0 18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:16px;text-align:left}
.prb-row{display:flex;justify-content:space-between;font-size:13.5px;color:#b9c9c1;padding:6px 0}
.prb-total{border-top:1px solid rgba(255,255,255,.12);margin-top:6px;padding-top:12px;font-weight:800;color:#fff;font-size:16px}
.prb-btn{width:100%;padding:15px;border-radius:12px;border:none;background:linear-gradient(135deg,#34d399,#059669);color:#052e1c;font:800 15px system-ui;cursor:pointer;transition:transform .15s}
.prb-btn:hover{transform:translateY(-1px)}
.prb-btn:active{transform:translateY(0)}
.prb-btn:disabled{opacity:.6;cursor:wait}
.prb-status{margin-top:12px;font-size:12px;color:#84a396;line-height:1.6}
.prb-success{display:flex;gap:12px;align-items:flex-start;text-align:left;margin-top:18px;background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.3);border-radius:14px;padding:14px}
.prb-check{width:26px;height:26px;flex:none;border-radius:50%;background:#34d399;color:#052e1c;display:flex;align-items:center;justify-content:center;font-weight:900}
.prb-success strong{font-size:14px}
.prb-success p{font-size:12.5px;color:#9fb3aa;margin-top:3px}`,

  js: `var payBtn = document.getElementById('prbPayBtn');
var statusEl = document.getElementById('prbStatus');
var successEl = document.getElementById('prbSuccess');
var successTitle = document.getElementById('prbSuccessTitle');
var successDetail = document.getElementById('prbSuccessDetail');

var TOTAL = '82.00';

function showSuccess(title, detail) {
  successTitle.textContent = title;
  successDetail.textContent = detail;
  successEl.hidden = false;
  payBtn.textContent = 'Paid';
  payBtn.disabled = true;
}

// Fallback path: a normal styled button flow that ends in a mock success
// state. This is what the vast majority of visitors will actually see,
// because the real Payment Request API needs HTTPS, a supporting browser,
// and at least one registered payment method/card on the device — none of
// which a sandboxed preview iframe can guarantee.
function mockCheckout() {
  payBtn.disabled = true;
  payBtn.textContent = 'Processing…';
  statusEl.textContent = 'Simulating a card charge (no real API available here)…';
  setTimeout(function () {
    showSuccess('Payment complete (simulated)', 'Charged $' + TOTAL + ' — no real transaction occurred.');
    statusEl.textContent = 'This ran as a mock flow; see the FAQ for why.';
  }, 900);
}

async function realPaymentRequest() {
  var methods = [{
    supportedMethods: 'basic-card',
    data: { supportedNetworks: ['visa', 'mastercard', 'amex'] },
  }];
  var details = {
    total: { label: 'Wireless earbuds + shipping', amount: { currency: 'USD', value: TOTAL } },
    displayItems: [
      { label: 'Subtotal', amount: { currency: 'USD', value: '78.00' } },
      { label: 'Shipping', amount: { currency: 'USD', value: '4.00' } },
    ],
  };

  var request = new PaymentRequest(methods, details);

  var canPay = request.canMakePayment ? await request.canMakePayment() : true;
  if (!canPay) {
    throw new Error('no-payment-method');
  }

  var response = await request.show();
  await response.complete('success');
  showSuccess('Payment complete', 'Charged $' + TOTAL + ' via ' + (response.methodName || 'the browser payment sheet') + '.');
}

async function handlePay() {
  payBtn.disabled = true;

  if (!('PaymentRequest' in window)) {
    statusEl.textContent = 'PaymentRequest is unsupported here — falling back to a mock checkout.';
    return mockCheckout();
  }

  try {
    statusEl.textContent = 'Opening the browser\\'s native payment sheet…';
    payBtn.textContent = 'Waiting for payment sheet…';
    await realPaymentRequest();
  } catch (err) {
    // Covers every realistic failure mode: insecure context (non-HTTPS),
    // the user has no saved cards/wallets registered, the sandboxed preview
    // iframe blocks the "payment" Permissions-Policy feature, or the user
    // simply cancels the sheet (AbortError). All of these fail into the
    // same mock flow rather than leaving the button stuck or throwing.
    statusEl.textContent = 'Native payment sheet unavailable (' + (err && err.name ? err.name : 'blocked') + ') — falling back to a mock checkout.';
    payBtn.disabled = false;
    payBtn.textContent = 'Pay now';
    mockCheckout();
  }
}

payBtn.addEventListener('click', handlePay);`,

  seo: {
    title: 'Payment Request API Button — Free Native Checkout Sheet Demo',
    description: `A "Pay now" button that opens the browser's real Payment Request API sheet where supported, with an honest, fully working mock checkout fallback everywhere else. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Payment Request API Button — Real Payment Sheet, Honest Fallback',
      description: `This snippet wires up the actual \`PaymentRequest\` constructor — the browser API behind the native "Pay" sheet you see on checkout pages that support Apple Pay, Google Pay, or saved cards — rather than faking that UI with a modal. Because that real sheet only appears under a narrow set of conditions, the button also ships a complete, well-designed mock checkout so the demo never looks stuck or broken, and the copy tells you plainly which path just ran.

**What actually happens on click**

\`handlePay()\` first checks \`'PaymentRequest' in window\`. If present, it builds a \`methods\` array (here \`basic-card\` with supported networks) and a \`details\` object describing the total and line items, constructs \`new PaymentRequest(methods, details)\`, optionally calls \`request.canMakePayment()\`, then calls \`request.show()\` — which is the line that, in a real HTTPS site with a supporting browser and a saved payment method, pops the OS-level payment sheet. On success, \`response.complete('success')\` closes the sheet and confirms the charge.

**Why this almost always falls back**

The Payment Request API is real, but it has hard requirements this snippet can't control: a secure context (HTTPS, never plain \`http://\` or a \`srcdoc\` sandbox treated as opaque), a browser that still implements it (support has been narrowing as Chrome and others push toward the newer [Payment Handler](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Handler_API) model), and — critically — at least one payment method actually registered on the device. None of those are guaranteed inside a sandboxed preview iframe, so \`request.show()\` typically rejects immediately, and the \`catch\` block routes into \`mockCheckout()\`.

**A fallback that looks intentional, not apologetic**

\`mockCheckout()\` disables the button, shows a "Processing…" state, and after a short delay reveals a styled success card with a checkmark — the same visual weight a real completed payment would have. The status line underneath always states which path ran ("Simulating a card charge (no real API available here)…" vs. a live sheet), so nothing is silently faked without being disclosed.

**Extending it for production**

A production integration needs a real merchant account and server-side charge verification — \`response\` only tells the client that the browser collected payment details; the actual charge must be confirmed server-side with your payment processor. Pair the pattern with [OTP verification](/ui-snippets/otp-verification/) for a full checkout flow, or [passkey login](/ui-snippets/passkey-login/) for the authentication side of an account-based checkout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A checkout summary and "Pay now" button render.` },
      { title: 'Click "Pay now"', text: `The code checks for PaymentRequest support.` },
      { title: 'On a supporting HTTPS site with a saved card', text: `The native payment sheet opens.` },
      { title: 'In this sandboxed preview (or most browsers)', text: `It falls back to a mock checkout automatically.` },
      { title: 'Read the status line', text: `It states plainly which path just ran.` },
      { title: 'Watch the success card', text: `A styled confirmation appears either way.` },
    ] },
    features: [
      { title: 'Real PaymentRequest call', text: `Constructs and shows the native payment sheet.` },
      { title: 'Feature detection first', text: `Checks 'PaymentRequest' in window before calling it.` },
      { title: 'canMakePayment check', text: `Avoids opening a sheet with no usable method.` },
      { title: 'Full try/catch coverage', text: `Every rejection routes into the mock flow.` },
      { title: 'Honest status copy', text: `States which path ran, never silently.` },
      { title: 'Styled mock checkout', text: `Looks intentional, not like a placeholder.` },
      { title: 'Matching success state', text: `Same visual weight for real or mock payment.` },
      { title: 'No backend required', text: `Fully functional demo with zero server code.` },
    ],
    useCases: [
      { title: 'Checkout flows', text: `Pair with [OTP verification](/ui-snippets/otp-verification/) for a full purchase.` },
      { title: 'Account-gated purchases', text: `Combine with [passkey login](/ui-snippets/passkey-login/).` },
      { title: 'Donation buttons', text: `A one-tap "Pay now" for a fixed amount.` },
      { title: 'Digital goods stores', text: `Skip a full cart page for single-item buys.` },
      { title: 'Subscription upsells', text: `A quick native-feeling upgrade prompt.` },
      { title: 'Design prototypes', text: `Demonstrate checkout UX without a payment backend.` },
      { icon: 'CODE', title: 'Related: WebAuthn Security Key Prompt', desc: 'See the [WebAuthn Security Key Prompt](/ui-snippets/webauthn-security-key-prompt/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the button almost always show a mock checkout?', a: `The real Payment Request API needs a secure (HTTPS) context, a browser that still implements the classic PaymentRequest sheet, and at least one payment method already registered on the device (a saved card, Apple Pay, Google Pay, etc). A sandboxed preview iframe typically fails at least one of these — often all three — so request.show() rejects and the code falls back to a fully designed mock checkout rather than leaving the button stuck.` },
      { q: 'Is the mock checkout dishonest?', a: `No — the status text always states plainly which path just ran, e.g. "Simulating a card charge (no real API available here)" versus opening a live browser sheet. No money moves in either the real or mock path in this demo; production use requires server-side charge confirmation with an actual payment processor regardless of which client path fired.` },
      { q: 'Does support vary by browser?', a: `Yes, and it has been shifting. Chromium browsers have historically had the widest support, Safari supports it primarily for Apple Pay, and some browsers are moving toward the newer Payment Handler model instead of the classic sheet. Always feature-detect with 'PaymentRequest' in window and test on your actual target browsers rather than assuming universal support.` },
      { q: 'What does canMakePayment() actually check?', a: `It asks the browser whether it currently has at least one usable payment method matching what you requested, without showing any UI. This snippet awaits it before calling show() so it can throw a clear, catchable error ("no-payment-method") instead of opening a sheet that would have nothing to offer.` },
      { q: 'How do I make this a real, working payment button?', a: `Register a merchant account with a payment processor that supports the Payment Request API (or Payment Handler), replace the basic-card method with your processor's supported method identifier and data, serve the page over HTTPS, and verify every charge server-side using the token or response your processor returns from response.complete() — never trust the client-side "success" alone.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why request.show() requires a secure context and a registered payment method, and why that combination makes it almost certain to fail inside a sandboxed preview iframe even though the code is fully correct. It's also useful for reasoning about the fallback design — ask why the mock checkout matches the real success state's visual weight instead of showing an apologetic error message, and why the status line always discloses which path ran rather than silently faking a payment. For extensions, ask it to add support for multiple payment method identifiers, wire canMakePayment() into a pre-render check that hides the button entirely on unsupported browsers, or connect the real path to a specific payment processor's Payment Request integration docs. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "Payment Request API button" in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A checkout summary card (item, subtotal, shipping, total) and a "Pay now" button.
- On click, feature-detect with 'PaymentRequest' in window. If present, construct a real new PaymentRequest(methods, details) with a basic-card method and a details object matching the displayed total, optionally await request.canMakePayment(), then await request.show() and complete the response with response.complete('success') on success.
- CRITICAL: wrap the entire real payment attempt in try/catch, since request.show() will almost always fail in a demo/sandboxed context — it requires a secure HTTPS context, a supporting browser, and at least one registered payment method on the device. On ANY failure (unsupported API, insecure context, no payment method, user cancellation, or a blocked Permissions-Policy in a sandboxed iframe), fall back to a fully designed mock checkout: disable the button, show a brief "Processing…" state, then reveal a styled success confirmation card with a checkmark, exactly matching the visual weight the real payment success would have.
- A status text element that always states plainly which path just ran — the real native payment sheet or the simulated mock flow — so a viewer never wonders whether a real charge occurred.
- Never leave the button permanently disabled or the demo stuck loading regardless of which path executes.`,
    },
  },
};

export default paymentRequestButton;
