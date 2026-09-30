const waitlistSignup = {
  id: 'waitlist-signup',
  title: 'Waitlist Signup',
  lastmod: '2026-06-22',
  category: 'forms',
  html: `<div class="wls-card">
  <div class="wls-join" id="wlsJoin">
    <span class="wls-badge">🚀 Early access</span>
    <h2>Join the waitlist</h2>
    <p>Be first to try Nimbus when we launch. We're onboarding in batches.</p>
    <div class="wls-avatars"><i></i><i></i><i></i><i></i><span>2,847 people waiting</span></div>
    <form id="wlsForm" novalidate>
      <div class="wls-row">
        <input type="email" id="wlsEmail" placeholder="you@example.com" autocomplete="email">
        <button type="submit">Join</button>
      </div>
      <p class="wls-error" id="wlsError" hidden></p>
    </form>
  </div>

  <div class="wls-done" id="wlsDone" hidden>
    <div class="wls-check">✓</div>
    <h2>You're on the list!</h2>
    <p class="wls-pos">You're <b id="wlsPos">#1,284</b> in line</p>
    <div class="wls-refbox">
      <p>Skip ahead — share your link. Each friend who joins moves you up.</p>
      <div class="wls-ref">
        <input type="text" id="wlsRef" readonly>
        <button type="button" id="wlsCopy">Copy</button>
      </div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.wls-card{background:#fff;border-radius:20px;padding:30px 28px;width:100%;max-width:400px;box-shadow:0 24px 60px rgba(0,0,0,.35);text-align:center}
.wls-badge{display:inline-block;background:#eef2ff;color:#4f46e5;font-size:11px;font-weight:800;padding:5px 12px;border-radius:999px;text-transform:uppercase;letter-spacing:.04em;margin-bottom:14px}
.wls-card h2{font-size:23px;font-weight:800;color:#0f172a;margin-bottom:8px}
.wls-card p{font-size:13px;color:#64748b;line-height:1.55}

.wls-avatars{display:flex;align-items:center;justify-content:center;gap:0;margin:16px 0 18px}
.wls-avatars i{width:26px;height:26px;border-radius:50%;border:2px solid #fff;margin-left:-7px}
.wls-avatars i:first-child{margin-left:0}
.wls-avatars i:nth-child(1){background:linear-gradient(135deg,#6366f1,#8b5cf6)}
.wls-avatars i:nth-child(2){background:linear-gradient(135deg,#22c55e,#10b981)}
.wls-avatars i:nth-child(3){background:linear-gradient(135deg,#f59e0b,#f97316)}
.wls-avatars i:nth-child(4){background:linear-gradient(135deg,#ec4899,#db2777)}
.wls-avatars span{font-size:12px;font-weight:700;color:#94a3b8;margin-left:10px}

.wls-row{display:flex;gap:8px}
.wls-row input{flex:1;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px 13px;font-size:14px;font-family:inherit;color:#0f172a}
.wls-row input:focus{outline:none;border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15)}
.wls-row button{background:#6366f1;color:#fff;border:none;border-radius:10px;padding:0 22px;font-size:14px;font-weight:700;cursor:pointer;transition:background .15s}
.wls-row button:hover{background:#4f46e5}
.wls-error{color:#dc2626;font-size:12px;font-weight:600;text-align:left;margin-top:8px}

.wls-check{width:54px;height:54px;border-radius:50%;background:#22c55e;color:#fff;font-size:26px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.wls-pos{font-size:14px;color:#475569;margin-top:6px}
.wls-pos b{color:#6366f1;font-size:18px;font-weight:800}
.wls-refbox{margin-top:20px;background:#f8fafc;border-radius:12px;padding:15px}
.wls-refbox p{font-size:12px;color:#475569;margin-bottom:10px;font-weight:600}
.wls-ref{display:flex;gap:7px}
.wls-ref input{flex:1;border:1.5px solid #e2e8f0;border-radius:8px;padding:9px 11px;font-size:12px;color:#475569;font-family:inherit;background:#fff}
.wls-ref button{background:#0f172a;color:#fff;border:none;border-radius:8px;padding:0 16px;font-size:12.5px;font-weight:700;cursor:pointer;min-width:64px}
.wls-ref button.copied{background:#16a34a}`,

  js: `var EMAIL_RE = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
var join = document.getElementById('wlsJoin');
var done = document.getElementById('wlsDone');

document.getElementById('wlsForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var input = document.getElementById('wlsEmail');
  var error = document.getElementById('wlsError');
  var email = input.value.trim();
  if (!EMAIL_RE.test(email)) {
    error.textContent = 'Please enter a valid email address.';
    error.hidden = false;
    return;
  }
  error.hidden = true;

  // In production: POST the email to your waitlist API, which returns the real
  // queue position and a unique referral code. Here we simulate both.
  var position = 1284;
  var code = btoa(email).replace(/[^a-z0-9]/gi, '').slice(0, 8).toLowerCase();

  document.getElementById('wlsPos').textContent = '#' + position.toLocaleString();
  document.getElementById('wlsRef').value = 'nimbus.app/?ref=' + code;
  join.hidden = true;
  done.hidden = false;
});

document.getElementById('wlsCopy').addEventListener('click', function () {
  var ref = document.getElementById('wlsRef');
  navigator.clipboard.writeText(ref.value).catch(function () {
    ref.select(); try { document.execCommand('copy'); } catch (e) {}
  });
  var btn = this;
  btn.textContent = '✓ Copied';
  btn.classList.add('copied');
  setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
});`,

  seo: {
    title: 'Waitlist Signup — Early Access Form HTML CSS JS',
    description: `A waitlist signup form with email validation, social proof, a queue-position reveal, and a referral link to skip ahead. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Waitlist Signup — Email Capture with Queue Position & Referral Sharing',
      description: `A waitlist does two jobs before you've launched: it captures demand as a list of warm leads, and — done well — it turns each signup into a promoter through referral mechanics. This snippet builds the complete modern waitlist in plain HTML, CSS, and vanilla JavaScript: a signup card with social proof and email validation, then a confirmation that reveals the user's queue position and a referral link they can share to move up the line.

**Social proof before the ask**

Above the email field sits a small stack of avatars and a live count ("2,847 people waiting"). Showing that others have already joined is one of the most effective ways to increase signups — a waitlist nobody's on feels risky to join, while one with thousands already waiting signals the product is worth waiting for. The avatar stack uses overlapping circles (the standard "people" motif) built purely with CSS gradients, so it needs no images.

**Validation before commitment**

Submitting validates the email against a pragmatic regex and shows an inline error for an invalid address before anything else happens — there's no point sending someone to the confirmation state with a typo'd email that can never be contacted. The validation is intentionally simple (catching the common mistakes, not chasing full RFC compliance), which is the right trade-off for a low-friction signup.

**The position reveal — why it works**

On success, the card swaps to a confirmation showing "You're #1,284 in line." A concrete position transforms an abstract "you're signed up" into something the user has a stake in — and crucially, sets up the referral mechanic. Seeing a number they'd like to lower is exactly what motivates sharing, far more than a generic "tell your friends" plea. The position should come from your backend (the demo simulates it); it's the anchor the whole referral loop hangs on.

**Referral sharing to skip ahead**

Below the position is a unique referral link and a copy button, framed with the incentive: "Each friend who joins moves you up." This is the viral loop that powers launches like Robinhood and Superhuman — every signup is handed a personal stake and a tool to recruit others, turning a static lead list into compounding growth. The copy button uses the modern \`navigator.clipboard\` API with a graceful \`execCommand\` fallback for older browsers, and confirms with a green "✓ Copied" state so the user knows it worked.

**Two states, one card**

The signup form and the confirmation are two states of one card, toggled with the \`hidden\` attribute — keeping the user anchored in place rather than navigating away, which matters for a flow whose whole point is to immediately hand them the referral tool. In production the submit handler is where you'd POST the email to your waitlist service (which returns the real position and referral code); the demo generates both client-side so the full flow is visible without a backend.

**Honest, portable, and adaptable**

The referral code here is derived from the email for demonstration, but a real implementation must generate it server-side and track referrals authoritatively — client-side codes can be forged. The component is otherwise self-contained and easy to re-theme: swap the product name, the social-proof count, and the accent color, and it fits any pre-launch product, beta program, or early-access drop.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A waitlist card renders with social proof, an early-access badge, and an email signup form.` },
      { title: 'Enter an email', text: `Type an invalid email to see the inline error; a valid one proceeds to the confirmation.` },
      { title: 'See your position', text: `The card swaps to "You're #1,284 in line" — a concrete number that motivates sharing.` },
      { title: 'Copy the referral link', text: `Click Copy to copy the unique referral URL; the button confirms with a green "✓ Copied" state.` },
      { title: 'Customize it', text: `Change the product name, the social-proof count, and the accent color to fit your launch.` },
      { title: 'Connect a waitlist backend', text: `POST the email to your waitlist service in the submit handler and use the real position and referral code it returns.` },
    ] },
    features: [
      { title: 'Social-proof avatar stack', text: `Overlapping CSS-gradient avatars and a live count signal an active waitlist, increasing signups — no images needed.` },
      { title: 'Inline email validation', text: `A pragmatic regex catches invalid addresses and shows a specific error before the confirmation state.` },
      { title: 'Queue-position reveal', text: `A concrete "#1,284 in line" gives the user a stake and sets up the referral incentive.` },
      { title: 'Referral link with copy', text: `A unique share link and a clipboard copy button (with execCommand fallback) power the skip-ahead viral loop.` },
      { title: 'Copy confirmation', text: `The copy button flips to a green "✓ Copied" state so the user knows the link was captured.` },
      { title: 'Two-state card', text: `Signup and confirmation are one card toggled in place, keeping the user with the referral tool rather than navigating away.` },
      { title: 'Backend-ready handler', text: `The submit handler is the single hook to POST the email and use the real position and referral code from your service.` },
      { title: 'Re-themeable for any launch', text: `Product name, social-proof count, and accent color are the only changes needed to fit a different product.` },
    ],
    useCases: [
      { title: 'Pre-launch product waitlists', text: `Capture demand and build a referral loop before you ship — pair with a [countdown timer](/ui-snippets/countdown-timer/) to launch day.` },
      { title: 'Beta and early-access programs', text: `Onboard users in batches while they recruit others to move up the queue.` },
      { title: 'Product Hunt and launch campaigns', text: `Convert launch-day traffic into a referral-powered list rather than one-off visits.` },
      { title: 'Course and cohort enrollment', text: `Build a waitlist for the next cohort with social proof of how many are waiting.` },
      { title: 'Exclusive drops and releases', text: `Gate access to a limited release behind a referral-ranked waitlist.` },
      { title: 'Learning viral signup loops', text: `A reference for position + referral mechanics — compare with an [exit intent popup](/ui-snippets/exit-intent-popup/) and [magic link login](/ui-snippets/magic-link-login/) for related capture flows.` },
    ],
    faqs: [
      { q: 'How do I connect this to a real waitlist backend?', a: `In the submit handler, after validation, POST the email to your waitlist service (a tool like Waitlist/GetWaitlist, or your own endpoint). It should return the user's real queue position and a unique referral code; populate the position display and referral link from that response, then show the confirmation state. Handle a failure by showing the inline error instead of advancing.` },
      { q: 'How do the referral mechanics actually move someone up?', a: `Each signup gets a unique referral code embedded in their share link. When someone joins via that link, your backend credits the referrer and recalculates queue positions (e.g. each referral moves them up N spots, or ranks by referral count). The position and ranking logic must live server-side and be authoritative — client-side codes and counts can be forged, so never trust them for the actual ordering.` },
      { q: 'Why show social proof and a position number?', a: `A visible "thousands waiting" count reduces the risk of joining an empty list, and a concrete position number gives the user a personal stake. Together they drive both the initial signup and the subsequent sharing — the position is the thing referrals improve, so it's the hook that makes the referral link compelling rather than a generic "tell your friends."` },
      { q: 'How do I make the copy button work everywhere?', a: `Use navigator.clipboard.writeText() (the modern async API) with a fallback to selecting the input and document.execCommand('copy') for older browsers, as shown. Clipboard access requires a secure context (HTTPS or localhost); on insecure origins the execCommand fallback handles it. Always confirm the copy visually so the user knows it succeeded.` },
      { q: 'How do I use this waitlist signup in React, Vue, or Angular?', a: `In React, hold the email, error, and submitted state in useState and conditionally render the signup vs confirmation, calling your waitlist API in the submit handler; in Vue, use ref()/reactive() with v-if; in Angular, use a reactive form with *ngIf. The validation regex and clipboard logic port unchanged — only the two-state toggle and the async API call move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the clipboard fallback by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the copy handler tries navigator.clipboard.writeText() first and only falls back to selecting the input plus document.execCommand('copy') in a catch block, and in which real browser/context situations that fallback path actually gets exercised. It's also worth flagging a real gap in the current demo logic — the referral code is derived client-side from btoa(email), so ask what specifically would need to move server-side to make the position and code trustworthy and unforgeable. For extending it, have it add a countdown showing estimated days until launch based on queue position, a visual progress bar showing "X referrals to skip Y more spots," or social share buttons that pre-fill a tweet with the referral link. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a waitlist signup widget with referral mechanics in plain HTML, CSS, and vanilla JavaScript with no libraries.

Requirements:
- A signup card showing social proof (an overlapping avatar stack built from CSS gradients, no images, plus a live count of people already waiting) above an email input and submit button.
- On submit, validate the email against a practical regex (not full RFC compliance) and, if invalid, show a specific inline error message without proceeding; a valid email must clear any existing error.
- On successful validation, swap the card's visible content from the signup form to a confirmation view using the hidden attribute (not a separate page navigation), showing a concrete queue position number (e.g. "#1,284 in line") and a unique referral link value.
- The confirmation view must include a read-only text input containing the referral link and a Copy button. The copy button must attempt navigator.clipboard.writeText() first, and only if that throws (e.g. in a non-secure context or older browser) fall back to selecting the input's text and calling document.execCommand('copy').
- After a successful copy, the button must visually confirm success (different background color and label such as a checkmark plus "Copied") for a couple of seconds before reverting to its original label and style.
- Structure the code so it's obvious where a real implementation would POST the email to a backend waitlist service and use the actual queue position and referral code from that response instead of a client-side placeholder — comment or structurally isolate that substitution point.`,
    },
  },
};

export default waitlistSignup;
