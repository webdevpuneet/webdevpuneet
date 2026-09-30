const optimisticActionRollbackLoader = {
  id: 'optimistic-action-rollback-loader',
  title: 'Optimistic Action Button with Rollback on Failure',
  lastmod: '2026-08-27',
  category: 'loaders',
  html: `<div class="demo">
  <div class="opt-card">
    <div class="opt-row">
      <div>
        <span class="opt-title">Auto-renew subscription</span>
        <span class="opt-sub" id="optSub">Currently enabled</span>
      </div>
      <button class="opt-toggle on" id="optToggle" role="switch" aria-checked="true" aria-label="Toggle auto-renew">
        <span class="opt-knob"></span>
      </button>
    </div>

    <div class="opt-log" id="optLog" role="status" aria-live="polite">Ready.</div>
    <p class="opt-hint">Toggling simulates a network request that fails ~40% of the time — watch it roll back automatically on failure.</p>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.opt-card { width: 340px; max-width: 100%; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 14px; }

.opt-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.opt-title { display: block; font-size: 13.5px; font-weight: 700; color: #111827; }
.opt-sub { display: block; font-size: 11.5px; color: #94a3b8; font-weight: 600; margin-top: 2px; }

.opt-toggle { width: 46px; height: 27px; border-radius: 999px; background: #e2e8f0; border: none; position: relative; cursor: pointer; transition: background 0.2s; flex-shrink: 0; }
.opt-toggle.on { background: #34d399; }
.opt-toggle.pending { opacity: 0.7; cursor: wait; }
.opt-knob { position: absolute; top: 2px; left: 2px; width: 23px; height: 23px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.25); transition: transform 0.2s; display: flex; align-items: center; justify-content: center; }
.opt-toggle.on .opt-knob { transform: translateX(19px); }
.opt-toggle.pending .opt-knob::after { content: ''; width: 10px; height: 10px; border: 2px solid #cbd5e1; border-top-color: #6366f1; border-radius: 50%; animation: spin 0.6s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.opt-log { font-size: 11.5px; font-weight: 600; color: #64748b; background: #f8fafc; border-radius: 9px; padding: 9px 11px; min-height: 16px; }
.opt-log.error { color: #b91c1c; background: #fef2f2; }
.opt-log.success { color: #15803d; background: #f0fdf4; }

.opt-hint { font-size: 11px; color: #94a3b8; line-height: 1.5; }`,
  js: `const toggle = document.getElementById('optToggle');
const subEl = document.getElementById('optSub');
const logEl = document.getElementById('optLog');

let serverState = true; // the "confirmed" state, as last acknowledged by the server
let pending = false;

function setLog(text, kind) {
  logEl.textContent = text;
  logEl.className = 'opt-log' + (kind ? ' ' + kind : '');
}

function renderToggle(isOn) {
  toggle.classList.toggle('on', isOn);
  toggle.setAttribute('aria-checked', String(isOn));
  subEl.textContent = isOn ? 'Currently enabled' : 'Currently disabled';
}

// Simulates a real network request with a 40% failure rate and realistic latency.
function fakeApiCall(nextState) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const willFail = Math.random() < 0.4;
      if (willFail) reject(new Error('Network error — please try again.'));
      else resolve(nextState);
    }, 700 + Math.random() * 500);
  });
}

toggle.addEventListener('click', async () => {
  if (pending) return; // ignore clicks while a request is already in flight

  const nextState = !serverState;
  pending = true;
  toggle.classList.add('pending');
  toggle.disabled = true;

  // Optimistic update: reflect the new state immediately, before the "server" confirms it.
  renderToggle(nextState);
  setLog('Saving…');

  try {
    const confirmed = await fakeApiCall(nextState);
    serverState = confirmed;
    setLog(\`Saved — auto-renew is now \${confirmed ? 'on' : 'off'}.\`, 'success');
  } catch (err) {
    // Roll back: revert the UI to the last confirmed server state, not just "the opposite".
    renderToggle(serverState);
    setLog(\`\${err.message} Reverted to previous state.\`, 'error');
  } finally {
    pending = false;
    toggle.classList.remove('pending');
    toggle.disabled = false;
  }
});`,
  seo: {
    title: 'Optimistic UI Toggle with Automatic Rollback on Failure — Correct State Management',
    description: 'A toggle switch that updates instantly (optimistic UI) before its simulated network request resolves, and automatically rolls back to the last confirmed server state if that request fails.',
    about: {
      title: 'Optimistic Action Button — Instant Feedback, Correct Rollback on Failure',
      description: `Waiting for a server response before updating a toggle's visual state makes every click feel sluggish, even for actions that usually succeed. **Optimistic UI** updates the interface immediately, assuming success, and only reconciles with reality once the real request resolves — this snippet demonstrates the full pattern correctly, including the part most naive implementations get wrong: rolling back cleanly on failure.

**Two separate concepts: serverState versus what's currently rendered**

The code deliberately tracks \`serverState\` — the last state actually *confirmed* by the (simulated) server — separately from whatever the toggle currently displays. A click immediately renders the new desired state optimistically, but \`serverState\` isn't updated until the fake API call actually resolves successfully. This separation is exactly what makes correct rollback possible: on failure, the code can revert to \`serverState\` (the last known-good, confirmed value) rather than naively guessing "just flip it back," which would be wrong if, for example, a second click happened before the first request's rollback ran.

**Why rollback reverts to serverState, not simply the opposite of the failed attempt**

\`renderToggle(serverState)\` inside the \`catch\` block is a deliberate choice over something like \`renderToggle(!nextState)\`. Reverting to the tracked confirmed state is robust even in edge cases — if \`serverState\` were somehow already different from what a naive "undo my last flip" calculation would assume, reverting to the actual last-confirmed truth is always correct, while reverting to "the opposite of what I just tried" is only correct by coincidence.

**In-flight requests block new ones, rather than racing**

\`if (pending) return;\` at the top of the click handler, combined with \`toggle.disabled = true\` for the request's duration, prevents a user from firing a second toggle request while the first is still resolving. Without this guard, two overlapping requests could resolve out of order, and whichever one's \`.then\`/\`.catch\` callback happened to run last would silently determine the final displayed state — a classic race condition this snippet avoids by simply not allowing overlapping requests in the first place.

**Distinct visual and textual feedback for all three states**

The toggle gets a \`.pending\` class (dimmed, a small spinner inside the knob, \`cursor: wait\`) while a request is in flight, and the status log line switches between neutral, \`.success\`, and \`.error\` styling depending on outcome — so a user always has both the toggle's own visual state and an explicit text explanation of what's currently happening, including the specific reason for a rollback when one occurs.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click the toggle repeatedly to see both outcomes', text: 'About 60% of clicks succeed and confirm the new state; about 40% fail and visibly roll back with an error message.' },
        { title: 'Replace fakeApiCall with a real request', text: 'Swap the setTimeout/Math.random simulation for an actual fetch() call, keeping the same resolve-on-success/reject-on-failure contract.' },
        { title: 'Adjust the simulated failure rate or latency', text: 'Change the 0.4 probability or the 700 + Math.random() * 500 delay to model different network conditions during development.' },
        { title: 'Reuse the pattern for other optimistic actions', text: 'The same serverState-vs-optimistic-render structure applies to any toggle, like/unlike button, or single-value setting update.' },
        { title: 'Customize the rollback message', text: 'Edit the error branch\'s setLog() call to surface a more specific or user-friendly failure explanation.' },
      ],
    },
    features: [
      'Genuine optimistic UI — the toggle updates instantly on click, before any request has resolved',
      'Correct rollback reverts to the last confirmed serverState, not a naive "undo the last flip" guess',
      'In-flight request guard (pending flag plus disabled toggle) prevents overlapping requests and race conditions',
      'Three distinct, clearly styled states: idle, pending (with an inline spinner), success, and error',
      'Simulated realistic network behavior — randomized latency and a genuine failure rate, not an always-succeeds mock',
      'role="switch" with synchronized aria-checked state for accessibility',
      'role="status" aria-live="polite" log region announces save, success, and rollback events to screen readers',
      'Fully self-contained fake API layer, easy to swap for a real fetch() call with the same promise contract',
    ],
    useCases: [
      { icon: 'SETTINGS', title: 'Settings Toggles', desc: 'Any single-setting toggle (notifications, auto-renew, feature flags) that should feel instant but must handle save failures correctly.' },
      { icon: 'SOCIAL', title: 'Like / Follow Buttons', desc: 'The classic optimistic-UI use case — instant visual feedback with correct rollback if the underlying request fails.' },
      { icon: 'SAAS', title: 'Inline Editable Fields', desc: 'Apply the same serverState-vs-optimistic pattern to inline-edited values that save on blur or Enter.' },
      { icon: 'EDUCATION', title: 'Teaching Correct Optimistic UI', desc: 'A clear, minimal reference implementation for a genuinely correct optimistic-update-with-rollback pattern.' },
      { icon: 'CODE', title: 'Related: Skeleton Chat Message Loader', desc: 'See the [Skeleton Chat Message Loader](/ui-snippets/loader-skeleton-chat-messages/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What makes this "optimistic" UI specifically?', a: 'The toggle\'s visual state (and the aria-checked attribute) update immediately when clicked, before the simulated network request has resolved — the interface assumes success up front rather than waiting for confirmation, which is the defining trait of optimistic UI.' },
      { q: 'Why revert to serverState instead of just flipping the toggle back to its previous visual state?', a: 'serverState tracks the last value actually confirmed by the server, which is the only value guaranteed to be correct. Reverting to "whatever the toggle displayed right before this click" is a reasonable approximation most of the time, but reverting to the tracked confirmed truth is robust even in edge cases where that approximation could be wrong.' },
      { q: 'What happens if I click the toggle again while a request is still in flight?', a: 'Nothing — the click handler checks a pending flag at the very top and returns immediately if a request is already running, and the toggle button is also natively disabled during that window, preventing a second overlapping request and the race condition it could cause.' },
      { q: 'How would I connect this to a real API instead of the simulated one?', a: 'Replace the body of fakeApiCall with an actual fetch() call (or another async request), keeping the same contract: resolve with the confirmed new state on success, and reject with an Error on failure — the rest of the click handler\'s logic works unchanged against that contract.' },
      { q: 'Why does the log show specific text like "Reverted to previous state" instead of just a generic error?', a: 'Being explicit about what happened (not just that something failed) helps a user understand the toggle\'s current displayed state is trustworthy again, rather than leaving them uncertain whether the failed action partially applied.' },
      { q: 'Is this pattern only useful for toggles?', a: 'No — the same core structure (track a confirmed value separately from an optimistically-rendered one, guard against overlapping in-flight requests, roll back to the confirmed value on failure) applies to any single-value optimistic update: a star rating, a quantity stepper, an inline-edited text field, and more.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain the specific race condition that the pending-flag guard prevents, and to walk through what would visibly go wrong if two overlapping toggle requests were allowed to resolve out of order without that guard. It's also worth asking for a version that queues a second toggle request to run automatically once the first one finishes (rather than simply ignoring the second click), or one that retries a failed request automatically once with backoff before falling back to a visible rollback.`,
      prompt: `Build an optimistic UI toggle switch in HTML, CSS and vanilla JavaScript that updates instantly on click and correctly rolls back if its underlying (simulated) network request fails — no external libraries.

Requirements:
- A toggle switch (role="switch" with a synchronized aria-checked attribute) that, on click, immediately re-renders to the new desired state before any request has completed — this is the "optimistic" part.
- Track the last state actually confirmed by the simulated server separately from whatever the toggle is currently optimistically displaying, so a failure can roll back to that specific confirmed value rather than guessing.
- Simulate a network request with realistic random latency and a genuine random failure rate (e.g. around 40%) using a Promise that resolves on success and rejects with an error on failure.
- While a request is in flight, disable the toggle and show a distinct pending visual state (e.g. a small inline spinner), and ignore additional clicks until that request resolves — prevent overlapping/racing requests entirely.
- On failure, revert the toggle's visual state to the last confirmed server value (not simply the opposite of the failed attempt) and show a clear, specific error message explaining that the change was reverted.
- On success, update the tracked confirmed server value to match and show a success message. Use an accessible live region so all of these state changes are announced to screen reader users.`,
    },
  },
};

export default optimisticActionRollbackLoader;
