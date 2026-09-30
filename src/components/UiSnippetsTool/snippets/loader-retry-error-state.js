const loaderRetryErrorState = {
  id: 'loader-retry-error-state',
  title: 'Loading State with Retry on Error',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="re-card">
  <div class="re-state re-loading" id="reLoading">
    <div class="re-spinner"></div>
    <p class="re-text">Loading your account…</p>
  </div>

  <div class="re-state re-success" id="reSuccess">
    <div class="re-icon re-icon-ok">✓</div>
    <h3 class="re-title">Account loaded</h3>
    <p class="re-text">Everything came back as expected.</p>
  </div>

  <div class="re-state re-error" id="reError">
    <div class="re-icon re-icon-err">!</div>
    <h3 class="re-title">Couldn't load your account</h3>
    <p class="re-text">The request failed. Check your connection and try again.</p>
    <button type="button" class="re-retry" id="reRetry">Retry</button>
  </div>
</div>

<div class="re-demo">
  <p class="re-demo-label">Force the next attempt to:</p>
  <div class="re-demo-row">
    <button type="button" class="re-demo-btn" id="reForceSuccess">Succeed</button>
    <button type="button" class="re-demo-btn" id="reForceError">Fail</button>
    <button type="button" class="re-demo-btn" id="reForceRandom">Random</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px}

.re-card{width:100%;max-width:320px;min-height:180px;background:#121729;border:1px solid #232a41;border-radius:16px;padding:26px 22px;box-shadow:0 18px 44px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center}
.re-state{display:none;flex-direction:column;align-items:center;text-align:center;gap:10px;width:100%}
.re-state.is-visible{display:flex}

.re-spinner{width:34px;height:34px;border:3px solid #232a41;border-top-color:#818cf8;border-radius:50%;animation:reSpin .75s linear infinite}
@keyframes reSpin{to{transform:rotate(360deg)}}

.re-icon{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800}
.re-icon-ok{background:#0f2e1e;color:#22c55e}
.re-icon-err{background:#341418;color:#f87171}

.re-title{font-size:15px;font-weight:800;color:#fff}
.re-text{font-size:12.5px;color:#8a93ad;line-height:1.5}

.re-retry{margin-top:4px;padding:9px 20px;background:#6366f1;border:none;color:#fff;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.re-retry:hover{background:#4f46e5}

.re-demo{width:100%;max-width:320px;text-align:center}
.re-demo-label{font-size:11px;color:#6b7591;margin-bottom:8px}
.re-demo-row{display:flex;gap:8px;justify-content:center}
.re-demo-btn{flex:1;padding:8px;background:#1c2338;border:1px solid #2b3350;color:#c3cadf;border-radius:9px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}
.re-demo-btn:hover{background:#242c47}
.re-demo-btn.is-armed{background:#3730a3;border-color:#4338ca;color:#fff}`,

  js: `var loadingEl = document.getElementById('reLoading');
var successEl = document.getElementById('reSuccess');
var errorEl = document.getElementById('reError');
var retryBtn = document.getElementById('reRetry');
var demoBtns = {
  succeed: document.getElementById('reForceSuccess'),
  error: document.getElementById('reForceError'),
  random: document.getElementById('reForceRandom'),
};

// The state machine has exactly three states. forcedOutcome lets the demo
// controls deterministically pick which real branch runs next, but the
// branching logic itself (loading -> success OR loading -> error) is the
// same code path a real fetch failure/success would take.
var forcedOutcome = 'random';
var timer = null;

function setState(state) {
  [loadingEl, successEl, errorEl].forEach(function (el) { el.classList.remove('is-visible'); });
  if (state === 'loading') loadingEl.classList.add('is-visible');
  if (state === 'success') successEl.classList.add('is-visible');
  if (state === 'error') errorEl.classList.add('is-visible');
}

function attempt() {
  setState('loading');
  clearTimeout(timer);
  timer = setTimeout(function () {
    var willSucceed = forcedOutcome === 'succeed'
      ? true
      : forcedOutcome === 'error'
        ? false
        : Math.random() > 0.5;
    setState(willSucceed ? 'success' : 'error');
  }, 1200);
}

function armDemo(key) {
  forcedOutcome = key;
  Object.keys(demoBtns).forEach(function (k) {
    demoBtns[k].classList.toggle('is-armed', k === key);
  });
}

demoBtns.succeed.addEventListener('click', function () { armDemo('succeed'); attempt(); });
demoBtns.error.addEventListener('click', function () { armDemo('error'); attempt(); });
demoBtns.random.addEventListener('click', function () { armDemo('random'); attempt(); });
retryBtn.addEventListener('click', attempt);

armDemo('random');
attempt();`,

  seo: {
    title: 'Loading State with Retry on Error — Real Loading/Success/Error Machine',
    description: `A genuine three-state loader — loading, success, or error with a working Retry button — driven by a real state machine, with demo controls to force either outcome. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Loading State with Retry on Error — A Real Loading/Success/Error State Machine',
      description: `Most loader snippets only ever demonstrate the happy path: a spinner that always resolves to content. Real requests fail — a dropped connection, a 500, a timeout — and a production loading state needs a genuine error branch with a way to recover, not just a spinner that happens to always succeed in the demo. This snippet builds the whole state machine: loading (spinner), success (content), or error (a clear message plus a Retry button that re-enters the loading state) — and ships with demo controls that force either outcome, so both paths are actually visible and testable, not just implied by a comment.

**Three states, one function controls all of them**

\`setState()\` is the single place that toggles visibility — it hides all three \`.re-state\` panels, then shows exactly one. Nothing else in the code directly manipulates a panel's \`is-visible\` class, which is what guarantees the UI can never show two states at once (a spinner alongside an error, for instance) even as the demo controls fire in quick succession.

**A real branch, not a scripted one-way flow**

\`attempt()\` is the function a real fetch call would call: it sets the loading state, then after the network delay resolves to either \`success\` or \`error\`. In this demo the outcome is decided by \`forcedOutcome\` (armed by the demo buttons) or, in "Random" mode, a genuine coin flip — but the branching structure — set loading, wait, then call \`setState('success')\` or \`setState('error')\` — is exactly what you'd write around a real \`fetch().then().catch()\`, just with the network call itself replaced by a timer.

**Retry re-enters the exact same code path**

The Retry button in the error state calls \`attempt()\` directly — the identical function the initial load and the demo buttons call — so retrying isn't a special case with its own logic; it's simply running the same state transition again. This matters because a retry path that diverges from the original load path is a common source of bugs (a retry that doesn't properly clear a previous error, for instance); reusing one function eliminates that class of bug structurally.

**Demo controls that make the error path honestly testable**

Because loaders overwhelmingly ship without anyone having actually seen the error branch, this snippet exposes "Succeed", "Fail", and "Random" controls that arm \`forcedOutcome\` before the next \`attempt()\` runs — clicking "Fail" and then Retry lets you deterministically walk through the failure UI as many times as needed, and "Random" demonstrates that the exact same component correctly renders whichever branch actually occurs.

**Wiring it to a real request**

Replace the \`setTimeout\` and its forced-outcome logic inside \`attempt()\` with a real \`fetch(...).then(success handler).catch(error handler)\`, calling \`setState('success')\` in the \`then\` and \`setState('error')\` in the \`catch\` — everything else (the Retry button, the state-toggling structure, the visual states) stays identical. Pair this with a [loading overlay](/ui-snippets/loading-overlay/) for the surrounding page or an [empty state](/ui-snippets/empty-state/) for a "no results" branch distinct from a true error.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The card starts loading, then resolves to a random success or error state.` },
      { title: 'Use the demo controls', text: `Click "Fail" then watch it load and land on the error state with a Retry button.` },
      { title: 'Click Retry', text: `It re-enters the loading state and resolves again based on the armed outcome.` },
      { title: 'Try "Succeed" and "Random"', text: `Confirm all three demo modes correctly drive the same state machine.` },
      { title: 'Inspect setState', text: `Notice it is the only function that ever toggles which panel is visible.` },
      { title: 'Wire a real request', text: `Replace the setTimeout in attempt() with a real fetch's then/catch.` },
    ] },
    features: [
      { title: 'Genuine three-state machine', text: `Loading, success, and error are mutually exclusive, enforced by one function.` },
      { title: 'Real branching logic', text: `attempt() mirrors a real fetch's then/catch structure, not a scripted sequence.` },
      { title: 'Retry reuses the same path', text: `The Retry button calls the identical attempt() function as the initial load.` },
      { title: 'Testable error branch', text: `Demo controls force success, error, or random so both paths are actually visible.` },
      { title: 'Single source of truth', text: `setState() is the only place any panel's visibility changes.` },
      { title: 'Clear, actionable error UI', text: `A specific message plus a labeled Retry button, not a dead end.` },
      { title: 'Race-safe transitions', text: `Rapid re-attempts always land in a single consistent visible state.` },
      { title: 'Drop-in real-fetch structure', text: `Swap the timer for a real request with no change to the state logic.` },
    ],
    useCases: [
      { title: 'Data fetching panels', text: `Any card or widget whose content depends on an API call that can fail.` },
      { title: 'Payment and checkout steps', text: `Show a clear retry path when a payment or order call errors out.` },
      { title: 'Dashboard widgets', text: `Handle a failed metric fetch without breaking the surrounding layout.` },
      { title: 'Form submission feedback', text: `Pair with an [ai generating loader](/ui-snippets/ai-generating-loader/) pattern for AI calls that can fail.` },
      { title: 'Offline-prone mobile web apps', text: `Give users a working retry when connectivity drops mid-request.` },
      { title: 'Any async widget needing an honest error UI', text: `A reusable template for loading/success/error anywhere in a product.` },
      { icon: 'CODE', title: 'Related: Multi-Stage Loading Checklist', desc: 'See the [Multi-Stage Loading Checklist](/ui-snippets/loader-multi-stage-checklist/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the state machine guarantee only one state shows at a time?', a: `setState() is the single function that ever toggles the is-visible class — it always hides all three panels first, then shows exactly the one requested. No other code in the snippet directly manipulates a panel's visibility, so there's no path by which two states could end up visible simultaneously, even if attempt() were called again before a previous attempt finished.` },
      { q: 'Is the Retry button a special case, or does it reuse the normal load logic?', a: `Retry calls attempt() directly — the exact same function used for the initial load and by the demo buttons. There is no separate "retry" code path, which avoids a common bug class where retry logic subtly diverges from the original load logic (for example, forgetting to clear a stale error before showing the spinner again).` },
      { q: 'How do the demo controls force a specific outcome?', a: `Clicking Succeed, Fail, or Random arms a forcedOutcome variable before calling attempt(). Inside attempt(), once the simulated delay completes, the outcome is decided by that variable — true for Succeed, false for Fail, or a coin flip for Random — and then setState is called with the corresponding result, exactly as a real fetch's resolved or rejected promise would decide it.` },
      { q: 'How do I wire this to a real API call?', a: `Inside attempt(), replace the setTimeout and forced-outcome branching with a real request: call setState('loading'), then fetch(url).then(res => setState('success')).catch(err => setState('error')). Keep the Retry button's handler pointed at attempt() unchanged — it will automatically re-run whatever real request logic you put there.` },
      { q: 'How do I use this loading/error state machine in React, Vue, or Angular?', a: `Hold a single state value (e.g. 'loading' | 'success' | 'error') instead of toggling classes, and render exactly one branch based on it — a switch or conditional render is the direct equivalent of setState(). Call your state-setting function from a real request's resolve and reject handlers, and point the Retry button's onClick at the same function used for the initial fetch.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setState() being the only function that toggles panel visibility guarantees the loading, success, and error states can never appear simultaneously, even under rapid repeated clicks, and why having the Retry button call the identical attempt() function used for the initial load (rather than a separate retry handler) eliminates a whole class of bugs where retry behavior quietly diverges from first-load behavior. It's worth a resilience check too: ask what would happen if a user clicked Retry multiple times in quick succession before the first attempt's timer resolved, and whether the current code handles overlapping in-flight attempts correctly. For extending it, ask for a version that tracks and displays a retry count, adds exponential backoff between automatic retries, or distinguishes a "no results" empty state from a true network error rather than collapsing both into one error branch. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a loading component with a real loading/success/error state machine in plain HTML, CSS, and JavaScript, including a working Retry action and demo controls to force either outcome.

Requirements:
- Three distinct visual states (a loading spinner state, a success state showing placeholder content, and an error state showing a clear error message with a Retry button), where a single JavaScript function is the only place in the code that toggles which state's markup is visible — no other code may directly manipulate a state panel's visibility.
- A core "attempt" function that sets the loading state immediately, then after a simulated delay resolves to either the success or error state — structured the way a real fetch call's request-then-resolve-or-reject flow would work, so the branching logic itself is the same shape a production version would use.
- The Retry button inside the error state must call the exact same attempt function used for the initial load, not a separate retry-specific code path, so retrying is provably identical logic to the first load rather than a parallel implementation that could drift out of sync.
- Add demo controls (e.g. "Succeed", "Fail", "Random") that let a user force which outcome the next attempt will resolve to, so both the success and error branches can be deliberately and repeatedly triggered and inspected, not just the happy path.
- Ensure that clicking Retry (or any of the demo controls) while already loading, or immediately after a previous attempt just resolved, always leaves the UI in exactly one clean, consistent visible state — never two states shown at once and never a state left stuck from a previous attempt.
- The error state's message must be specific and actionable (not a generic "Something went wrong" with no path forward), and the Retry button must be clearly the primary action to take from that state.`,
    },
  },
};

export default loaderRetryErrorState;
