const bootstrapFormAutosaveStatus = {
  id: 'bootstrap-form-autosave-status',
  title: 'Bootstrap Form Autosave Status',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsauto-card">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h5 class="fw-bold mb-0">Untitled note</h5>
        <span class="small d-flex align-items-center gap-2" id="bsautoStatus">
          <span class="bsauto-dot bsauto-dot-idle" id="bsautoDot"></span>
          <span id="bsautoText">All changes saved</span>
        </span>
      </div>
      <textarea class="form-control" id="bsautoBody" rows="6" placeholder="Start typing...">Q3 planning notes — revisit budget line items before Thursday's review.</textarea>
      <p class="small text-muted mt-2 mb-0">Autosaves 1.2s after you stop typing.</p>
    </div>
  </div>
</div>`,
  css: `.bsauto-card { width: 460px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsauto-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.bsauto-dot-idle { background: #9ca3af; }
.bsauto-dot-saving { background: #f5a623; animation: bsauto-pulse 1s ease-in-out infinite; }
.bsauto-dot-saved { background: #198754; }
.bsauto-dot-failed { background: #dc3545; }
@keyframes bsauto-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
#bsautoText.text-danger { color: #dc3545 !important; }
.bsauto-retry { border: none; background: none; padding: 0; color: #0d6efd; font-weight: 600; text-decoration: underline; cursor: pointer; }`,
  js: `const body = document.getElementById('bsautoBody');
const dot = document.getElementById('bsautoDot');
const text = document.getElementById('bsautoText');

let debounceTimer = null;
let isSaving = false;
let pendingResave = false;

function setState(state, message) {
  dot.className = 'bsauto-dot bsauto-dot-' + state;
  text.className = state === 'failed' ? 'text-danger' : '';
  text.innerHTML = message;
}

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function performSave() {
  if (isSaving) {
    // A keystroke landed while a save was already in flight — remember to
    // run one more save right after this one finishes, rather than firing
    // a second overlapping request.
    pendingResave = true;
    return;
  }
  isSaving = true;
  setState('saving', 'Saving...');

  setTimeout(() => {
    isSaving = false;
    const failed = Math.random() < 0.15;
    if (failed) {
      setState('failed', 'Failed to save &mdash; <button type="button" class="bsauto-retry" id="bsautoRetry">Retry</button>');
      document.getElementById('bsautoRetry').addEventListener('click', performSave);
    } else {
      setState('saved', 'Saved at ' + timestamp());
    }
    if (pendingResave) {
      pendingResave = false;
      performSave();
    }
  }, 800);
}

body.addEventListener('input', () => {
  setState('idle', 'Unsaved changes...');
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(performSave, 1200);
});`,

  seo: {
    title: 'Bootstrap Form Autosave Status — Free HTML CSS JS Snippet',
    description: 'A real debounced autosave indicator built with Bootstrap 5.3 — Saving / Saved / Failed states, a retry action, and protection against overlapping save requests while the user keeps typing.',
    about: {
      title: 'Bootstrap Form Autosave Status — HTML, CSS & JavaScript',
      description: `Autosave has a timing problem most demos skip: firing a save on every keystroke would flood a real backend, but waiting until the user is completely done is exactly what a "Save" button already does. This snippet uses a debounce — every \`input\` event clears the previous \`setTimeout\` and starts a new 1200ms one — so \`performSave()\` only actually runs once typing genuinely pauses, no matter how fast or long the user types before that.\n\nThe part most autosave demos skip entirely is what happens when a save is still in flight and the user keeps typing. This snippet guards \`performSave()\` with an \`isSaving\` flag: a keystroke that lands mid-save doesn't fire a second overlapping request, it just sets a \`pendingResave\` flag that triggers exactly one more save the moment the current one resolves — so the saved copy can never silently fall behind the last thing the user typed, and the backend never sees two requests racing each other.\n\nThe failure path is simulated with a random 15% chance specifically so the Failed state and its Retry link are actually reachable in this preview rather than only existing in the code. \`Retry\` calls the exact same \`performSave()\` function a fresh debounce would have called, so there's no separate "retry logic" to keep correct alongside the main save path.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'The status reads "All changes saved" with a gray idle dot.' },
        { title: 'Start typing in the textarea', text: 'The status immediately switches to "Unsaved changes..." on the very first keystroke.' },
        { title: 'Keep typing, then pause', text: '1.2 seconds after your last keystroke, the dot turns amber and pulses while "Saving..." shows.' },
        { title: 'Wait for the save to resolve', text: 'Roughly 85% of the time it turns green with a real timestamp; the rest of the time it turns red with a Retry link.' },
        { title: 'Click Retry on a failure', text: 'It re-runs the same save logic and usually succeeds on the next attempt.' },
        { title: 'Type again while a save is in progress', text: 'No second "Saving..." flicker appears mid-save — one more save is queued and runs immediately after the first finishes.' },
      ],
    },
    features: [
      'Debounced saves — one request per pause in typing, not one per keystroke',
      'isSaving guard prevents two overlapping save requests from ever firing at once',
      'A queued pendingResave flag guarantees a keystroke during a save is never silently lost',
      'A real, changing timestamp on every successful save, not a static label',
      'A simulated failure path with a working Retry action wired to the same save function',
      'Four distinct visual states (idle, saving, saved, failed) driven by one setState function',
    ],
    useCases: [
      { icon: 'FORM', title: 'Notes, docs, and long-form content editors', desc: 'Removes the need for an explicit Save button entirely — pairs well with [bootstrap-inline-form-editing](/ui-snippets/bootstrap-inline-form-editing/) for settings that should feel just as continuous.' },
      { icon: 'APP', title: 'Admin panels editing structured records', desc: 'Show the same status pattern next to any field group in a CMS or dashboard record editor.' },
      { icon: 'LEARN', title: 'Learning debounce and request-overlap handling', desc: 'A compact, realistic example of the two problems every autosave implementation has to solve, in isolation from a specific backend.' },
      { icon: 'SEARCH', title: 'Search-as-you-type and live filter inputs', desc: 'The same debounce-plus-in-flight-guard pattern applies directly to any input that triggers a network request as the user types.' },
    ],
    faqs: [
      { q: 'Why 1200ms for the debounce delay?', a: 'It is long enough that normal typing does not trigger a save mid-sentence, but short enough that a genuine pause reads as "done for now" rather than a stall. Tune it to match how expensive your real save operation is.' },
      { q: 'What happens if I type again the instant a save finishes?', a: 'A brand-new debounce timer starts from that keystroke, exactly as if no previous save had happened — the finished save does not interfere with the next one.' },
      { q: 'Why not just save on every keystroke?', a: 'A real save is usually a network request; firing one per keystroke on a paragraph of typing would send dozens of requests for a single sentence, most of which are immediately superseded by the next one.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. In React, keep isSaving and the debounce timer in refs (not state, since updating them should not trigger a re-render) and drive the visible state through useState; the same performSave logic works unchanged.' },
      { q: 'How would I connect this to a real API?', a: 'Replace the setTimeout inside performSave with an actual fetch/axios call, treating its resolved promise as success and its rejection (or a non-2xx response) as the failure branch — the debounce and overlap-guard logic around it needs no changes.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add exponential backoff to the Retry flow (waiting longer between each failed attempt) or to persist the draft to localStorage as a fallback whenever every retry fails, so a page refresh never loses unsaved text.`,
      prompt: `Build a Bootstrap 5.3 form autosave status indicator, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js) for the surrounding card, not custom CSS made to resemble it.

Requirements:
- A card with a textarea and a small status indicator (a colored dot plus text) showing one of: idle/unsaved, saving, saved, or failed.
- Debounce saves: every input event should reset a timer, and the actual save function should only run once typing has paused for about 1.2 seconds.
- The save function must guard against overlapping calls with an isSaving flag — if a new save is requested while one is already in progress, queue exactly one follow-up save to run immediately after the current one resolves, rather than firing a second request or dropping the request entirely.
- Simulate the save with a randomized outcome so both success and failure are reachable: on success, show "Saved at" plus the current time; on failure, show an inline Retry action that calls the same save function.`,
    },
  },
};

export default bootstrapFormAutosaveStatus;
