const webauthnSecurityKeyPrompt = {
  id: 'webauthn-security-key-prompt',
  title: 'WebAuthn Security Key Prompt',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<section class="wak-wrap">
  <span class="wak-tag">navigator.credentials.get</span>
  <h1>Verify with security key</h1>
  <p id="wakStatus">This button makes a real WebAuthn assertion request. Without a credential already registered for this origin, it will fail — that's expected, and the panel below explains what a real flow looks like.</p>

  <button class="wak-btn" id="wakVerify">
    <svg class="wak-icon" viewBox="0 0 24 24" fill="none"><path d="M12 2 4 5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V5l-8-3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Verify with security key
  </button>

  <div class="wak-result" id="wakResult" hidden></div>

  <div class="wak-explainer">
    <h2>What a real flow looks like</h2>
    <ol class="wak-steps">
      <li><strong>Registration (not shown here)</strong> — a server calls <code>navigator.credentials.create()</code> with a challenge; the user touches their security key or uses platform biometrics, and the resulting public key is stored server-side against their account.</li>
      <li><strong>Login challenge</strong> — the server sends a fresh random challenge to <code>navigator.credentials.get()</code>, scoped to that account's registered credential IDs.</li>
      <li><strong>User presence check</strong> — the authenticator (a USB/NFC/Bluetooth key, or built-in Touch ID/Windows Hello) prompts a tap or biometric to prove physical presence, then signs the challenge.</li>
      <li><strong>Server verification</strong> — the signed assertion is verified against the stored public key; no shared secret ever crosses the network, so it's phishing-resistant by design.</li>
    </ol>
  </div>

  <p class="wak-note" id="wakNote">Checking WebAuthn support…</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#0f1a2e,#050a14 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.wak-wrap{width:100%;max-width:540px}
.wak-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#93c5fd;background:rgba(147,197,253,.1);border:1px solid rgba(147,197,253,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.wak-wrap h1{font-size:clamp(24px,5.5vw,32px);font-weight:800;letter-spacing:-.03em}
.wak-wrap p{font-size:13.5px;color:#9fb3d1;margin-top:8px;line-height:1.65}
.wak-btn{margin-top:20px;width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:15px;border-radius:12px;border:none;background:linear-gradient(135deg,#60a5fa,#2563eb);color:#eef4ff;font:700 14px system-ui;cursor:pointer;transition:transform .1s,box-shadow .15s;box-shadow:0 8px 24px -8px rgba(37,99,235,.6)}
.wak-btn:hover{transform:translateY(-1px)}
.wak-btn:active{transform:translateY(0)}
.wak-icon{width:20px;height:20px}
.wak-result{margin-top:14px;padding:14px 16px;border-radius:10px;font-size:13px;line-height:1.6}
.wak-result.ok{background:rgba(74,222,128,.1);border:1px solid rgba(74,222,128,.3);color:#86efac}
.wak-result.fail{background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.3);color:#fca5a5}
.wak-explainer{margin-top:24px;padding:18px 20px;border-radius:14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.09)}
.wak-explainer h2{font-size:14px;font-weight:700;margin-bottom:10px}
.wak-steps{padding-left:20px;display:flex;flex-direction:column;gap:8px}
.wak-steps li{font-size:12.5px;color:#b7c6e3;line-height:1.6}
.wak-steps code{background:rgba(147,197,253,.12);color:#bfdbfe;padding:1px 5px;border-radius:4px;font-size:11.5px}
.wak-note{font-size:11.5px;color:#7288a6;margin-top:16px;line-height:1.6}`,

  js: `var statusEl = document.getElementById('wakStatus');
var noteEl = document.getElementById('wakNote');
var verifyBtn = document.getElementById('wakVerify');
var resultEl = document.getElementById('wakResult');

var hasWebAuthn = !!(navigator.credentials && typeof navigator.credentials.get === 'function' && window.PublicKeyCredential);

function randomChallenge(length) {
  var arr = new Uint8Array(length || 32);
  if (window.crypto && crypto.getRandomValues) {
    crypto.getRandomValues(arr);
  } else {
    for (var i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
  }
  return arr;
}

function showResult(ok, html) {
  resultEl.hidden = false;
  resultEl.className = 'wak-result ' + (ok ? 'ok' : 'fail');
  resultEl.innerHTML = html;
}

async function verify() {
  verifyBtn.disabled = true;
  resultEl.hidden = true;

  if (!hasWebAuthn) {
    statusEl.textContent = 'WebAuthn is not available in this browser or context.';
    showResult(false, '<strong>Not supported here.</strong> navigator.credentials / PublicKeyCredential is missing — either an older browser, a non-HTTPS context (WebAuthn requires a secure origin), or a sandboxed iframe without the "publickey-credentials-get" Permissions-Policy. See the real flow explained below.');
    verifyBtn.disabled = false;
    return;
  }

  statusEl.textContent = 'Requesting an assertion via navigator.credentials.get()…';

  try {
    // A genuine WebAuthn assertion request. Because no credential has ever
    // been registered for this demo (registration needs a real server to
    // issue a challenge and persist a public key), this call is expected to
    // reject nearly every time it's actually invoked — but the request
    // itself, and the browser's native security key / biometric UI it
    // triggers, are 100% real, not simulated.
    var credential = await navigator.credentials.get({
      publicKey: {
        challenge: randomChallenge(32),
        timeout: 20000,
        userVerification: 'preferred',
        // No allowCredentials list is provided since we have no registered
        // credential IDs to offer — a real login flow would populate this
        // from the server with the specific account's credential IDs.
      },
    });

    // Reaching here would mean the browser actually found and used a
    // resident/passkey credential for this exact origin — vanishingly
    // unlikely in a demo/preview context, but handled honestly regardless.
    showResult(true, '<strong>Assertion received.</strong> credential.id: <code>' + credential.id.slice(0, 24) + '…</code> — in a real flow this signed assertion would now be sent to a server for verification against a stored public key.');
    statusEl.textContent = 'A real assertion was returned by the browser.';
  } catch (err) {
    var name = err && err.name ? err.name : 'Error';
    var reason;
    if (name === 'NotAllowedError') {
      reason = 'The browser either found no matching credential for this origin, the operation timed out, or the user (or sandboxed environment) declined it — by far the most common outcome here since no credential has ever been registered.';
    } else if (name === 'SecurityError') {
      reason = 'The current origin isn\\'t eligible for WebAuthn (e.g. not a secure context, or an RP ID mismatch) — common when this snippet runs inside a sandboxed preview iframe.';
    } else if (name === 'AbortError') {
      reason = 'The request was aborted, likely by the timeout elapsing with no authenticator responding.';
    } else {
      reason = 'The browser rejected the request (' + name + ').';
    }
    showResult(false, '<strong>' + name + ':</strong> ' + reason + ' This is the expected outcome for this demo — WebAuthn requires a credential to have been registered ahead of time via navigator.credentials.create() on a real server-backed flow.');
    statusEl.textContent = 'Real WebAuthn call made and rejected, as expected without a registered credential.';
  }

  verifyBtn.disabled = false;
}

verifyBtn.addEventListener('click', verify);

if (hasWebAuthn) {
  noteEl.textContent = 'WebAuthn is supported here. Clicking the button makes a genuine navigator.credentials.get() call — expect it to fail immediately since this demo has no server and no credential was ever registered for this origin. That failure is the honest, correct behavior, not a bug.';
} else {
  noteEl.textContent = 'This browser or context doesn\\'t expose navigator.credentials.get with PublicKeyCredential support. The explainer panel below still walks through exactly what a real registration-then-login flow involves.';
}`,

  seo: {
    title: 'WebAuthn Security Key Prompt — Free navigator.credentials.get() Demo',
    description: `A "Verify with security key" button that makes a genuine WebAuthn navigator.credentials.get() call, with an honest explainer for the expected failure and what a real registered-credential flow looks like. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'WebAuthn Security Key Prompt — A Real Call, Honestly Explained When It Fails',
      description: `This snippet doesn't fake a security-key check. It calls the genuine \`navigator.credentials.get()\` WebAuthn API with a real random challenge, and treats the near-certain rejection — since no credential was ever registered for this origin — as the expected, informative outcome rather than an error to hide.

**Why this will (almost) always fail, on purpose**

WebAuthn is a two-phase protocol: \`navigator.credentials.create()\` registers a public key against a specific origin during signup, then \`navigator.credentials.get()\` requests an assertion signed by that same key during login. This demo only implements the second phase, because the first requires a real server to issue a registration challenge and persist the resulting public key. Calling \`get()\` with nothing registered is genuinely, correctly rejected by the browser — almost always with \`NotAllowedError\` — and the snippet treats that rejection as the expected teaching moment, with named-error copy rather than a generic failure state.

**A real random challenge, not a placeholder**

The request still generates a cryptographically random 32-byte challenge via \`crypto.getRandomValues()\`, exactly as a real relying-party server would (falling back to \`Math.random()\` only if \`crypto\` is somehow unavailable). Nothing about the request itself is fake — only the surrounding server infrastructure that would normally issue and verify it is absent.

**The explainer carries the weight the button can't**

Since the button's own success path is unreachable in practice, the snippet pairs it with a static four-step explainer covering registration, the login challenge, the user-presence/biometric check, and server-side verification — so a visitor still learns the complete real-world flow even though only the "get" half of it can execute here.

**Distinct, named rejection reasons**

The catch block branches on \`err.name\`: \`NotAllowedError\` (no matching credential, timeout, or user cancellation — the overwhelmingly likely case here), \`SecurityError\` (wrong origin context, common in a sandboxed preview iframe), and \`AbortError\` (timeout with no authenticator response), each with copy naming exactly why — rather than a single "something went wrong."

Pair this with [passkey login](/ui-snippets/passkey-login/) for the registration-adjacent flow, or [OTP verification](/ui-snippets/otp-verification/) as a comparison against a non-hardware second factor.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A "Verify with security key" button and explainer render.` },
      { title: 'Click the button', text: `A genuine navigator.credentials.get() call fires with a real random challenge.` },
      { title: 'Expect a rejection', text: `NotAllowedError is normal — no credential was ever registered here.` },
      { title: 'Read the named error', text: `The result panel explains exactly which WebAuthn error occurred and why.` },
      { title: 'Read the explainer', text: `Four steps cover the full real registration-to-verification flow.` },
      { title: 'Wire up a real backend', text: `Pair with create() and a server to make the success path reachable.` },
    ] },
    features: [
      { title: 'Real navigator.credentials.get() call', text: `Genuine WebAuthn request, not simulated.` },
      { title: 'Cryptographically random challenge', text: `crypto.getRandomValues, matching real server behavior.` },
      { title: 'Named error branching', text: `NotAllowedError, SecurityError, AbortError each explained.` },
      { title: 'Honest-by-design failure', text: `Treats the expected rejection as the teaching moment.` },
      { title: 'Full-flow explainer panel', text: `Covers registration through server verification.` },
      { title: 'Feature-detected support check', text: `Checks PublicKeyCredential before attempting a call.` },
      { title: 'Success path still handled', text: `Renders a real credential.id if one is ever returned.` },
      { title: 'No dependencies', text: `Pure vanilla JS against the native WebAuthn API.` },
    ],
    useCases: [
      { title: 'Login page mockups', text: 'Show a security-key option beside passkey sign-in, using a genuine `navigator.credentials.get()` call with a cryptographically random challenge.' },
      { title: 'Authentication method comparisons', text: 'Contrast with [OTP verification](/ui-snippets/otp-verification/) when explaining the practical differences between phishing-resistant hardware keys and code-based second factors.' },
      { title: 'Security feature marketing', text: 'Explain phishing-resistant authentication, treating the expected failure as the teaching moment because no credential was ever registered here.' },
      { title: 'Developer education', text: 'Teach the create and get WebAuthn lifecycle to developers, with `NotAllowedError`, `SecurityError` and `AbortError` each explained separately.' },
      { title: 'Security key management screens', text: 'Prototype a manage security keys screen alongside [passkey login](/ui-snippets/passkey-login/), as a styled button ready for real credential registration.' },
    ],
    faqs: [
      { q: 'Why does clicking "Verify with security key" always fail?', a: `Because WebAuthn requires a credential to be registered first via navigator.credentials.create(), which needs a real server to issue a registration challenge and store the resulting public key against an account. This demo has no server, so navigator.credentials.get() correctly and honestly rejects — almost always with NotAllowedError — since the browser finds no matching credential for this origin. That's the expected, correct behavior, not a bug in the snippet.` },
      { q: 'Is the WebAuthn call in this snippet actually real?', a: `Yes. It calls the genuine navigator.credentials.get() browser API with a cryptographically random challenge generated via crypto.getRandomValues(), exactly as a production relying-party server would construct one. The only thing missing is the server-side infrastructure to register a credential ahead of time and verify the resulting assertion — the client-side request itself is fully real.` },
      { q: 'What does NotAllowedError actually mean here?', a: `It's WebAuthn's catch-all rejection for "no usable credential and/or no user action completed" — covering no matching registered credential for this origin (the near-certain cause in this demo), the request timing out, or the user/environment declining the native security-key or biometric prompt. It's distinct from SecurityError (wrong origin/context) and AbortError (timeout with no authenticator response), which this snippet also names separately.` },
      { q: 'What would a real, working flow require?', a: `A server that generates a registration challenge, calls navigator.credentials.create() to have the browser create and register a credential (prompting a security key tap or platform biometric), stores the resulting public key against the user's account, then on login generates a fresh challenge for navigator.credentials.get() and verifies the signed assertion server-side against that stored key. The explainer panel in this snippet walks through all four steps.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Wrap the async navigator.credentials.get() call in a handler, keep the try/catch and named-error branching exactly as is, and replace the inline result HTML with component state driving your own result UI. For a real implementation, the challenge and (once registered) the allowCredentials list must come from your backend per request — never hardcode them client-side.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why navigator.credentials.get() is expected to reject in a demo with no prior registration, and how the two-phase WebAuthn lifecycle (create for registration, get for login) would need a real server to complete successfully. It's also useful for reasoning about the specific DOMException names WebAuthn throws — ask it to walk through when NotAllowedError, SecurityError, and AbortError each occur and why they warrant different user-facing copy rather than one generic failure message. For extensions, ask it to sketch the matching navigator.credentials.create() registration call and the minimal server endpoints (challenge issuance and assertion verification) a real flow would need, or to add a conditional UI (autofill) variant using the mediation: 'conditional' option. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "WebAuthn security key prompt" in plain HTML, CSS, and JavaScript using the real navigator.credentials.get() API — no libraries, no server.

Requirements:
- A "Verify with security key" button that, on click, calls navigator.credentials.get({ publicKey: { challenge, timeout, userVerification: 'preferred' } }) where challenge is a real cryptographically random Uint8Array generated via crypto.getRandomValues() (with a Math.random() fallback only if crypto is unavailable) — do not fake or skip this call.
- Feature-detect support first with a check like navigator.credentials && typeof navigator.credentials.get === 'function' && window.PublicKeyCredential, and show a clear "not supported here" message with the explainer (see below) if it's missing, rather than attempting the call.
- CRITICAL: since this demo has no backend and therefore no credential was ever registered via navigator.credentials.create() for this origin, the get() call is expected to reject nearly every time it actually runs — wrap it thoroughly in try/catch and branch on err.name to give distinct, informative copy for at least NotAllowedError (no matching credential / timeout / declined — the overwhelmingly common case here), SecurityError (ineligible origin/context, e.g. inside a sandboxed iframe), and AbortError (timeout with no authenticator response). Present each as an expected, well-explained outcome — not an apologetic error banner — since a real user of this snippet needs to understand WHY it failed, not just that it did.
- Also handle the (unlikely but possible) success path: if a credential is actually returned, display its id in the result area and note that a real flow would now send the signed assertion to a server for verification.
- A static "what a real flow looks like" explainer section (ordered list is fine) covering: server-issued registration challenge and navigator.credentials.create() during signup, the login-time challenge sent to navigator.credentials.get(), the authenticator's user-presence/biometric check, and server-side verification of the signed assertion against the stored public key — so the page teaches the full real-world flow even though only the "get" half can actually execute without a backend.
- Make the visual design polished and confident (a well-designed security-feature UI), not styled like an error state or apology, since a correctly-failing WebAuthn call is the expected and honest behavior for this demo.`,
    },
  },
};

export default webauthnSecurityKeyPrompt;
