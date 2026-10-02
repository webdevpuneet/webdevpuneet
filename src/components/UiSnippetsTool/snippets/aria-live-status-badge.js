const ariaLiveStatusBadge = {
  id: 'aria-live-status-badge',
  title: 'ARIA Live Status Badge',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="demo-wrap">
  <div class="doc-card">
    <div class="doc-head">
      <span class="doc-icon" aria-hidden="true">&#128196;</span>
      <div>
        <h2>Q3 Roadmap.docx</h2>
        <p class="doc-sub">Edited by you</p>
      </div>
      <span class="status-badge" id="statusBadge" data-state="idle">
        <span class="status-dot" aria-hidden="true"></span>
        <span id="statusText">All changes saved</span>
      </span>
    </div>

    <!-- Two separate live regions, deliberately: routine status changes go
         through the polite region so they never interrupt; errors go
         through the assertive region so they always do. -->
    <div class="sr-only" id="politeRegion" aria-live="polite" aria-atomic="true"></div>
    <div class="sr-only" id="assertiveRegion" aria-live="assertive" aria-atomic="true"></div>

    <div class="btn-row">
      <button class="demo-btn" id="triggerSaving">Simulate typing (polite: Saving… &rarr; Saved)</button>
      <button class="demo-btn danger" id="triggerError">Simulate sync failure (assertive: Error)</button>
    </div>
  </div>

  <div class="explainer">
    <h3>What each button announces</h3>
    <ul>
      <li><strong>Polite</strong> waits for any current screen reader speech to finish, then announces &mdash; right for routine status like autosave.</li>
      <li><strong>Assertive</strong> interrupts immediately &mdash; reserved for errors or anything the user must know right now.</li>
    </ul>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body{font-family: system-ui, -apple-system, sans-serif; background: #0d0f1a; color: #dfe1f0; min-height: 100vh;display:flex;align-items:center;justify-content:center}

.demo-wrap { max-width: 540px; margin: 0 auto; padding: 40px 20px; display: flex; flex-direction: column; gap: 18px; }

.doc-card { background: #151827; border: 1px solid #262b45; border-radius: 16px; padding: 20px; }
.doc-head { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
.doc-icon { font-size: 26px; }
.doc-head h2 { font-size: 15px; }
.doc-sub { font-size: 12px; color: #838aad; }

.status-badge {
  margin-left: auto;
  display: flex; align-items: center; gap: 7px;
  font-size: 12px; font-weight: 700;
  padding: 6px 12px; border-radius: 999px;
  background: #1c2138; color: #9ca3d4;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
}
.status-dot { width: 7px; height: 7px; border-radius: 50%; background: #9ca3d4; transition: background 0.2s; }

.status-badge[data-state="saving"] { background: #1e2a4a; color: #93c5fd; }
.status-badge[data-state="saving"] .status-dot { background: #93c5fd; animation: blink 1s ease-in-out infinite; }

.status-badge[data-state="saved"] { background: #113023; color: #6ee7b7; }
.status-badge[data-state="saved"] .status-dot { background: #6ee7b7; }

.status-badge[data-state="error"] { background: #3a1414; color: #fca5a5; }
.status-badge[data-state="error"] .status-dot { background: #fca5a5; animation: blink 0.6s ease-in-out infinite; }

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

.btn-row { display: flex; gap: 10px; flex-wrap: wrap; }
.demo-btn {
  font-family: inherit; font-size: 12.5px; font-weight: 700;
  background: #232842; color: #dfe1f5; border: 1px solid #323966;
  padding: 9px 14px; border-radius: 9px; cursor: pointer;
}
.demo-btn:hover { border-color: #6366f1; }
.demo-btn:focus-visible { outline: 3px solid #6366f1; outline-offset: 2px; }
.demo-btn.danger { border-color: #7f1d1d; color: #fca5a5; }
.demo-btn.danger:hover { border-color: #f87171; }

.explainer { background: #12131f; border: 1px solid #232a3d; border-radius: 14px; padding: 16px 18px; }
.explainer h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #818cf8; margin-bottom: 10px; }
.explainer ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.explainer li { font-size: 13px; color: #b5b9d6; line-height: 1.6; }
.explainer strong { color: #eef0fa; }

.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }`,

  js: `const statusBadge = document.getElementById('statusBadge');
const statusText = document.getElementById('statusText');
const politeRegion = document.getElementById('politeRegion');
const assertiveRegion = document.getElementById('assertiveRegion');
const triggerSaving = document.getElementById('triggerSaving');
const triggerError = document.getElementById('triggerError');

let sequence = 0;

function setBadge(state, label) {
  statusBadge.dataset.state = state;
  statusText.textContent = label;
}

// Force a fresh announcement even if the message text repeats, by clearing
// the region and writing on the next frame.
function announcePolite(message) {
  politeRegion.textContent = '';
  requestAnimationFrame(() => { politeRegion.textContent = message; });
}
function announceAssertive(message) {
  assertiveRegion.textContent = '';
  requestAnimationFrame(() => { assertiveRegion.textContent = message; });
}

triggerSaving.addEventListener('click', () => {
  sequence += 1;
  const mySequence = sequence;

  setBadge('saving', 'Saving\\u2026');
  announcePolite('Saving document.');

  setTimeout(() => {
    if (mySequence !== sequence) return; // a newer click superseded this one
    setBadge('saved', 'All changes saved');
    announcePolite('All changes saved.');
  }, 1400);
});

triggerError.addEventListener('click', () => {
  sequence += 1;
  setBadge('error', 'Sync failed');
  // Assertive: this interrupts whatever the screen reader is currently
  // saying, because a failed sync is something the user needs to know
  // about right away rather than after their current sentence finishes.
  announceAssertive('Sync failed. Your latest changes were not saved. Check your connection and try again.');
});`,

  seo: {
    title: 'ARIA Live Status Badge — Free polite vs assertive Live Region Demo',
    description: `A "Saving / Saved / Error" status badge that demonstrates the real difference between aria-live="polite" and aria-live="assertive", with buttons to trigger each. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ARIA Live Status Badge — polite vs assertive, Demonstrated Side by Side',
      description: `\`aria-live\` has exactly two commonly used politeness levels, and picking the wrong one is a frequent, subtle accessibility bug: routine status announced as \`assertive\` interrupts a screen reader user constantly and becomes noise they learn to tune out, while genuine errors announced as \`polite\` can queue behind other speech and go unnoticed at the worst possible moment. This snippet builds a small "Saving… → Saved" status badge, wired to two separate live regions, so you can trigger both politeness levels and feel the difference directly rather than just reading about it.

**Two regions, not one, on purpose**

The markup includes \`#politeRegion\` (\`aria-live="polite"\`) and \`#assertiveRegion\` (\`aria-live="assertive"\`) as two distinct, always-present, visually-hidden elements, rather than one region whose \`aria-live\` attribute gets toggled at runtime. Some browser/screen-reader combinations handle a dynamically-changed \`aria-live\` value inconsistently, so keeping the politeness level fixed per-region and simply choosing which region to write into is the more reliable pattern in production.

**polite: waits its turn**

Clicking "Simulate typing" sets the badge to "Saving…" and writes into the polite region. A screen reader honors \`polite\` by finishing whatever it is currently saying — including the user's own typing being echoed back, or another announcement in flight — before speaking this one. That's exactly right for autosave status: useful information, but never urgent enough to justify cutting the user off mid-sentence.

**assertive: cuts the line**

Clicking "Simulate sync failure" writes into the assertive region instead, and a screen reader interrupts its current speech to announce it immediately. That's the correct behavior for a failed save the user genuinely needs to know about right now — silently losing work is worse than a brief interruption. Reserve \`assertive\` for exactly this class of event; overusing it for routine updates trains users to distrust or disable it.

**The same clear-then-set trick, twice**

Both \`announcePolite\` and \`announceAssertive\` clear the target region's \`textContent\` and set the new message on the next animation frame, guaranteeing a real DOM mutation fires even if the message text repeats — the identical technique used in [the live region announcer demo](/ui-snippets/live-region-announcer-demo/), which this snippet extends from a single-region toast pattern into a two-region politeness comparison.

**Where this belongs**

Any UI with an autosave indicator, a sync status, a form-validation summary, or a connection-status chip needs exactly this polite/assertive split. Pair it with [a toast notification](/ui-snippets/toast-notification/) for the visual half and [a notification center](/ui-snippets/notification-center/) for a persistent history of the same events.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click "Simulate typing"', text: `The badge shows "Saving…" then "All changes saved" about 1.4s later — announced politely both times.` },
      { title: 'Click "Simulate sync failure"', text: `The badge turns red and announces immediately via the assertive region.` },
      { title: 'Turn on a screen reader', text: `Notice the polite announcement waits its turn; the assertive one interrupts instantly.` },
      { title: 'Click "Simulate typing" repeatedly, fast', text: `Only the latest click's "Saved" message lands — a sequence counter discards stale timers.` },
      { title: 'Inspect the two live regions', text: `#politeRegion and #assertiveRegion are separate, always-present, visually-hidden elements.` },
      { title: 'Reuse the pattern', text: `Route routine status through the polite region and errors through the assertive one in your own app.` },
    ] },
    features: [
      { title: 'Two fixed-politeness regions', text: `Separate polite and assertive elements, never a toggled aria-live value.` },
      { title: 'Realistic saving/saved flow', text: `A timed transition mirrors real autosave UX.` },
      { title: 'Interruptible error state', text: `Assertive announcement cuts in immediately, as errors should.` },
      { title: 'Stale-timer guard', text: `A sequence counter prevents an old "Saved" from overwriting a newer state.` },
      { title: 'Forced re-announcement', text: `Clear-then-set avoids silently skipped repeat messages.` },
      { title: 'Visual + semantic parity', text: `Badge color/animation always match what's announced.` },
      { title: 'Correct sr-only hiding', text: `Clip/position technique, never display:none, on both regions.` },
      { title: 'Two trigger buttons', text: `Directly compare polite vs assertive behavior side by side.` },
    ],
    useCases: [
      { title: 'Document autosave indicators', text: 'Announce Saving and Saved politely to screen reader users without interrupting what they are typing, using a fixed `aria-live="polite"` region that never toggles.' },
      { title: 'Error and failure announcements', text: 'Route urgent errors through the separate assertive region so they interrupt immediately, as a failed save or lost connection should.' },
      { title: 'Sync and connection chips', text: 'Announce reconnect and disconnect events in a way that matches their urgency, with a sequence counter preventing an old Saved from overwriting a newer message.' },
      { title: 'Visual toast pairing', text: 'Back a sighted [toast notification](/ui-snippets/toast-notification/) with the equivalent spoken announcement, so both audiences receive the same message at the same moment.' },
      { title: 'Accessibility teaching demos', text: 'Demonstrate the real difference between polite and assertive to your team, using the trigger buttons and a [notification center](/ui-snippets/notification-center/) history of both kinds.' },
      { icon: 'CODE', title: 'Related: Fundraising Campaign Leaderboard', desc: 'See the [Fundraising Campaign Leaderboard](/ui-snippets/campaign-leaderboard/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the actual difference between polite and assertive?', a: `aria-live="polite" tells the screen reader to wait until it finishes whatever it is currently saying before announcing the new content, so it never interrupts. aria-live="assertive" tells it to interrupt immediately and announce right away, even mid-sentence. Polite is right for routine, non-urgent updates; assertive is right for something the user needs to know about immediately, like an error.` },
      { q: 'Why use two separate live region elements instead of one with a changing aria-live value?', a: `Some browser and screen-reader combinations handle a dynamically changed aria-live attribute inconsistently — the new politeness level may not reliably take effect on the next announcement. Keeping two fixed-politeness elements always present in the DOM and simply choosing which one to write into is the more broadly reliable pattern.` },
      { q: 'Why does clicking "Simulate typing" repeatedly not stack up stale "Saved" messages?', a: `Each click increments a sequence counter and captures its own value. When the delayed "Saved" callback fires, it checks whether its captured sequence still matches the current one; if a newer click has happened in the meantime, the stale callback exits without touching the badge or announcing anything, so only the latest state ever lands.` },
      { q: 'Should error messages always be assertive?', a: `Errors that genuinely need immediate attention — a failed save that could lose the user\'s work, a broken connection — are a good fit for assertive. But not every error needs to interrupt; a minor, recoverable validation hint on a single field is often better as polite so it doesn\'t constantly cut off the user while they\'re still typing elsewhere on the page.` },
      { q: 'What happens if I overuse assertive for routine updates?', a: `Screen reader users experience constant interruptions to their current speech, which is jarring and, over time, trains them to distrust, mute, or tune out live announcements entirely — the same fatigue effect as an app that pushes too many push notifications. Reserve assertive specifically for events that truly warrant breaking in.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain, using this exact code, why two separate fixed-politeness live regions are more reliable than one region whose aria-live attribute changes at runtime — that's a subtlety worth understanding deeply before you build your own status system. It's also a good prompt for auditing an existing autosave or sync indicator in your codebase: ask the assistant to trace whether your current implementation routes errors and routine status through the correct politeness level, or whether everything funnels through one region regardless of urgency. You can ask it to extend the sequence-counter guard into a more general debounce utility, or to add a third "warning" state and reason about which politeness level that deserves. Treat the demo as a reference case for a distinction that recurs across notification systems, not a one-off widget.`,
      prompt: `Build a status badge component in plain HTML, CSS, and JavaScript that demonstrates the difference between aria-live="polite" and aria-live="assertive".

Requirements:
- A visible status badge showing states like "Saving...", "All changes saved", and "Sync failed", each with a distinct color and a small animated indicator dot.
- Two separate, always-present, visually-hidden live region elements: one with aria-live="polite" and aria-atomic="true", and a second, different element with aria-live="assertive" and aria-atomic="true" — do not use a single region whose aria-live attribute is changed dynamically at runtime.
- A button that simulates a routine autosave flow: set the badge to "Saving..." and announce it via the polite region, then after a short delay transition to "All changes saved" and announce that via the polite region too.
- A separate button that simulates an error: set the badge to an error state and announce a clear error message via the assertive region, since an error is the kind of urgent information that should interrupt current screen reader speech.
- A guard against stale delayed callbacks: if the "Saving..." button is clicked again before the delayed "Saved" transition fires, only the most recent click's transition should ever take effect (e.g. using a sequence/generation counter).
- Force a fresh screen reader announcement even when the message text is identical to the previous one, by clearing each live region's content and setting the new message on the next animation frame rather than setting it directly.
- Visually hide both live regions using the correct sr-only CSS technique (absolute positioning, 1px clipped box) — never display:none or visibility:hidden, since both would remove the regions from the accessibility tree.`,
    },
  },
};

export default ariaLiveStatusBadge;
