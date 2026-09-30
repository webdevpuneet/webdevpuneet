const bootstrapLoadingSpinnerOverlay = {
  id: 'bootstrap-loading-spinner-overlay',
  title: 'Bootstrap Loading Spinner Overlay',
  lastmod: '2026-09-10',
  category: 'loaders',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bslo-card shadow-sm">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0">Account Overview</h5>
        <button class="btn btn-primary btn-sm" id="bsloLoadBtn">Load data</button>
      </div>

      <div class="position-relative bslo-section" id="bsloSection">
        <div id="bsloContent" class="d-none">
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between"><span>Balance</span><strong>$4,281.00</strong></li>
            <li class="list-group-item d-flex justify-content-between"><span>Pending</span><strong>$120.50</strong></li>
            <li class="list-group-item d-flex justify-content-between"><span>Last transaction</span><strong>Sep 9, 2026</strong></li>
          </ul>
        </div>
        <p class="text-muted small mb-0" id="bsloEmpty">Click "Load data" to fetch the latest account details.</p>

        <div class="bslo-overlay d-none" id="bsloOverlay">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  css: `.bslo-card { width: 420px; border-radius: 14px; border: 1px solid #eceef1; }
.bslo-section { min-height: 120px; }
.bslo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  z-index: 5;
}`,
  js: `const loadBtn = document.getElementById('bsloLoadBtn');
const overlay = document.getElementById('bsloOverlay');
const content = document.getElementById('bsloContent');
const empty = document.getElementById('bsloEmpty');

loadBtn.addEventListener('click', () => {
  // Guard against double-clicks starting a second overlapping timeout while
  // one load is already in flight.
  if (loadBtn.disabled) return;

  loadBtn.disabled = true;
  loadBtn.textContent = 'Loading...';
  empty.classList.add('d-none');
  content.classList.add('d-none');
  overlay.classList.remove('d-none');

  setTimeout(() => {
    overlay.classList.add('d-none');
    content.classList.remove('d-none');
    loadBtn.disabled = false;
    loadBtn.textContent = 'Reload data';
  }, 1500);
});`,

  seo: {
    title: 'Bootstrap Loading Spinner Overlay — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap spinner-border centered over a semi-transparent overlay that toggles with a simulated fetch delay. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'Bootstrap Loading Spinner Overlay — HTML, CSS & JavaScript',
      description: `Most real screens do not swap their whole layout for a spinner while data loads — they dim the existing content in place and float a spinner on top of it, so the user keeps their bearings. This snippet builds exactly that pattern on top of **real Bootstrap 5.3**: a \`.bslo-section\` wrapper set to \`position: relative\` holds either an empty-state message or the loaded \`.list-group\`, and a sibling \`.bslo-overlay\` is positioned with \`inset: 0\` and a translucent \`rgba(255, 255, 255, 0.75)\` background so it covers the section exactly without needing matching width/height values. A native Bootstrap \`spinner-border\` with \`role="status"\` and a \`visually-hidden\` label sits centered inside the overlay via flexbox (\`display: flex; align-items: center; justify-content: center\`).\n\nThe JavaScript is intentionally small: clicking \`#bsloLoadBtn\` hides the empty-state paragraph, hides the (currently empty) content block, removes \`d-none\` from the overlay, disables the button, and relabels it "Loading...". A \`setTimeout\` stands in for a real network request — after 1.5 seconds it re-hides the overlay, reveals the populated \`#bsloContent\` list group, re-enables the button, and relabels it "Reload data" so the demo can be replayed. That relabeling matters for a subtle reason: without it, a second click while nothing has changed would look like the button did nothing, so the button's own text is used to communicate state instead of adding a separate status line.\n\nThe non-obvious edge case handled here is re-entrancy: the click handler's very first line checks \`if (loadBtn.disabled) return;\` before doing anything else. Without that guard, a user double-clicking quickly — which is a completely normal thing to do while waiting on a network call — would fire two overlapping \`setTimeout\` calls. Each one would independently try to hide the overlay and reset the button, and depending on timing the second timeout could stomp on state the first one just set, or the button could flicker between "Loading..." and "Reload data" mid-flight. Disabling the trigger element for the duration of the async operation is the same defensive pattern used for real submit buttons and API calls, which is exactly why it is worth teaching here even in a simulated version.\n\nBecause the overlay is just an absolutely positioned sibling \`div\` toggled with a single class, the whole pattern drops cleanly into a React \`useState\` boolean, a Vue \`ref\`, or an Angular component property — the CSS does not care what toggled the class, only that it gets toggled.\n\nSwapping the simulated \`setTimeout\` for a real \`fetch\` call is a one-line change: show the overlay before the request starts, then hide it in both the success and error branches so a failed request never leaves the overlay stuck on screen forever — a mistake that is easy to make if the hide call only lives in the success path.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'The preview shows an "Account Overview" card with a muted placeholder message and a "Load data" button.' },
        { title: 'Click "Load data"', text: 'The button disables and relabels to "Loading...", and a translucent white overlay with a spinning Bootstrap spinner-border covers the section.' },
        { title: 'Wait about 1.5 seconds', text: 'The overlay disappears and a real list of account details (balance, pending, last transaction) fades into view underneath it.' },
        { title: 'Notice the button relabels', text: 'It now reads "Reload data" and is clickable again, signalling the load actually finished.' },
        { title: 'Click "Reload data"', text: 'The whole cycle repeats — the list hides, the overlay and spinner reappear, and the content returns after the delay.' },
        { title: 'Try double-clicking quickly', text: 'Nothing breaks or flickers, because the button is disabled the instant the first click is registered.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 spinner-border with proper role="status" and visually-hidden label',
      'Overlay uses CSS inset: 0 on a position: relative parent, so it always matches the section size exactly',
      'Semi-transparent rgba background dims content without fully hiding it',
      'Simulated async load via setTimeout, easy to swap for a real fetch() call',
      'Button disables itself during load to prevent double-click re-entrancy bugs',
      'Button text relabels between Load data / Loading... / Reload data to communicate state',
      'Empty-state message and populated list are two mutually exclusive d-none-toggled blocks',
      'Overlay z-index keeps the spinner above content without any custom stacking-context hacks',
    ],
    useCases: [
      { icon: 'APP', title: 'Dashboard widgets that fetch on demand', desc: 'Any card or panel that loads its own data independently, similar in spirit to the counting-up numbers in [Animated Counter Stats](/ui-snippets/bootstrap-animated-counter-stats/).' },
      { icon: 'FORM', title: 'Form submission feedback', desc: 'Show the same overlay pattern over a form while an async submit is in flight, disabling inputs the same way this disables its button.' },
      { icon: 'CART', title: 'E-commerce cart or checkout updates', desc: 'Dim the cart summary while totals recalculate after a coupon code or shipping option changes.' },
      { icon: 'LEARN', title: 'Learning overlay positioning', desc: 'A clean example of position: relative plus inset: 0 for building overlays, a technique also useful for image hover states like in [Lightbox Gallery Modal](/ui-snippets/bootstrap-lightbox-gallery-modal/).' },
      { icon: 'FLOW', title: 'Multi-step wizards and settings panels', desc: 'Pair with something like [Vertical Tabs Settings](/ui-snippets/bootstrap-vertical-tabs-settings/) to show a brief loading state whenever a settings tab is switched.' },
    ],
    faqs: [
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. In React, track a boolean with useState and toggle it in the button\'s onClick, conditionally rendering the overlay div; in Vue, do the same with a ref inside a method and v-if; in Angular, a component property flipped in the click handler and shown with *ngIf. No DOM query selectors are required since the class toggling in this vanilla version maps directly to conditional rendering.' },
      { q: 'How do I replace the fake delay with a real API call?', a: 'Remove the setTimeout wrapper and call your fetch or axios request inside an async function, showing the overlay before the call and hiding it in a .finally() block so it disappears whether the request succeeds or fails.' },
      { q: 'Why is the overlay positioned with inset instead of top/left/width/height?', a: 'inset: 0 is shorthand for top, right, bottom and left all set to 0, which stretches the overlay to exactly match its position: relative parent regardless of that parent\'s size, without needing to read or set explicit pixel dimensions.' },
      { q: 'Does this work with Tailwind instead of Bootstrap?', a: 'The same structure works with a tailwind class set like absolute inset-0 bg-white/75 flex items-center justify-center in place of .bslo-overlay, paired with any spinner component or a simple animated border div.' },
      { q: 'Why disable the button during loading?', a: 'Without disabling it, a fast double-click starts two overlapping setTimeout calls that can both try to reset the UI at slightly different times, causing the button label or content visibility to flicker unpredictably — disabling it is a one-line fix for that re-entrancy bug.' },
      { q: 'Can the overlay cover the whole page instead of one section?', a: 'Yes — apply position: fixed and inset: 0 to the overlay and attach it directly to the body instead of a card section, which is the same technique used for full-page route-change loaders.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to add a minimum-display-time guard so the spinner never flashes for less than, say, 400ms even on a fast connection, or to add a fade transition between the overlay and the revealed content instead of an instant class toggle.`,
      prompt: `Build a Bootstrap 5.3 loading spinner overlay using the real Bootstrap CDN (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A card containing a "Load data" button and a content section that starts with a muted empty-state message.
- Clicking the button disables it, relabels it to "Loading...", hides the empty-state message, and shows a full-section semi-transparent white overlay containing a centered real Bootstrap spinner-border with role="status" and a visually-hidden label.
- After a simulated 1.5 second delay (setTimeout), hide the overlay, reveal a populated Bootstrap list-group of sample data, re-enable the button, and relabel it "Reload data".
- Guard the click handler against re-entrancy so rapid double-clicks cannot start two overlapping timeouts.
- The overlay must be positioned with CSS so it exactly covers the content section regardless of its height, using position: relative on the parent and inset: 0 on the overlay.`,
    },
  },
};

export default bootstrapLoadingSpinnerOverlay;
