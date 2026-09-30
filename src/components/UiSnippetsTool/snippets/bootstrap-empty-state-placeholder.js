const bootstrapEmptyStatePlaceholder = {
  id: 'bootstrap-empty-state-placeholder',
  title: 'Bootstrap Empty State Placeholder',
  lastmod: '2026-09-10',
  category: 'layouts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bses-card shadow-sm">
    <div class="card-body p-4">
      <div class="d-flex justify-content-end mb-2">
        <button class="btn btn-sm btn-outline-secondary" id="besToggle">Toggle demo state</button>
      </div>

      <div id="besEmpty" class="text-center py-5">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" class="mb-3 text-secondary mx-auto d-block">
          <path d="M3 7h18M3 7l1.5 12a2 2 0 0 0 2 1.8h11a2 2 0 0 0 2-1.8L21 7M3 7l2-4h14l2 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 11v4M15 11v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <h5 class="fw-bold mb-1">Your cart is empty</h5>
        <p class="text-muted mb-4">Items you add will show up here.</p>
        <button class="btn btn-primary" id="besCta">Browse products</button>
      </div>

      <div id="besPopulated" class="d-none">
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>Wireless Mouse</span><span class="text-muted small">$24.00</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>Mechanical Keyboard</span><span class="text-muted small">$89.00</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>USB-C Hub</span><span class="text-muted small">$34.00</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>`,
  css: `.bses-card { width: 380px; border-radius: 14px; border: 1px solid #eceef1; }`,
  js: `const toggleBtn = document.getElementById('besToggle');
const empty = document.getElementById('besEmpty');
const populated = document.getElementById('besPopulated');
const cta = document.getElementById('besCta');

function setEmpty(isEmpty) {
  empty.classList.toggle('d-none', !isEmpty);
  populated.classList.toggle('d-none', isEmpty);
  toggleBtn.textContent = isEmpty ? 'Show populated view' : 'Show empty state';
}

let currentlyEmpty = true;

toggleBtn.addEventListener('click', () => {
  currentlyEmpty = !currentlyEmpty;
  setEmpty(currentlyEmpty);
});

// The CTA button inside the empty state itself also switches to the
// populated view, simulating what happens after a user adds an item.
cta.addEventListener('click', () => {
  currentlyEmpty = false;
  setEmpty(false);
});`,

  seo: {
    title: 'Bootstrap Empty State Placeholder — Free HTML CSS JS Snippet',
    description: 'A reusable empty-state card with inline SVG icon, heading, message and CTA, toggled against a populated list view. Exports cleanly to React, Vue & Tailwind.',
    about: {
      title: 'Bootstrap Empty State Placeholder — HTML, CSS & JavaScript',
      description: `An empty state is the screen most product teams forget to design on purpose, so this snippet treats it as a first-class, reusable block rather than an afterthought: a centered inline SVG icon (a simple outlined cart/box drawn with \`path\` elements and \`stroke\` rather than a raster image, so it scales crisply and inherits \`currentColor\` from the surrounding \`text-secondary\` class), a bold heading, a muted one-line message, and a primary Bootstrap \`btn btn-primary\` call-to-action, all centered inside a real Bootstrap \`card\`. Using an inline SVG instead of an \`<img>\` means the icon needs zero extra network requests and can be recolored purely through CSS \`currentColor\` inheritance, which matters because empty states often need to match a theme's muted-secondary palette rather than a fixed icon color.\n\nThe demo itself is built to prove the component actually works both ways, not just render once: a "Toggle demo state" button and the CTA button (\`#besCta\`) inside the empty state both call a single \`setEmpty(isEmpty)\` function that toggles Bootstrap's own \`d-none\` utility class on the \`#besEmpty\` and \`#besPopulated\` blocks in lockstep, so exactly one is ever visible, and also relabels the toggle button itself to describe the action it will perform next rather than the state it is currently in. A \`currentlyEmpty\` boolean tracks state outside the DOM so both entry points (the manual toggle and the CTA click) can flip it consistently without reading the current visibility from the DOM each time.\n\nThe non-obvious detail worth calling out is that the CTA button living *inside* the empty state is wired to the same state-changing function as the external toggle button, rather than having its own separate logic — in a real cart or list this is exactly the button a user clicks to leave the empty state, so testing it needs to produce the same populated view as the demo toggle, not a different one. Keeping both entry points calling one shared function also means a future change to what "populated" looks like — say, adding a badge count — only needs to happen in one place.\n\nBecause the whole component is two sibling blocks toggled by one boolean, it maps directly onto conditional rendering in any component framework: an \`isEmpty\` state variable controlling which JSX/template block renders, with the underlying SVG, heading, and button markup unchanged.\n\nThe populated view reuses Bootstrap's own \`list-group-flush\` and \`d-flex justify-content-between\` utilities to align each item's name on the left and its price on the right without any custom flexbox rules of its own, which keeps the "after" state visually consistent with the rest of a typical Bootstrap-built page rather than looking like a bolted-on demo table.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'The preview shows a card with a centered outline icon, "Your cart is empty" heading, a short message, and a "Browse products" button.' },
        { title: 'Click "Toggle demo state"', text: 'The empty state disappears and a populated list of three cart items with prices appears in its place.' },
        { title: 'Notice the toggle button relabels', text: 'It now reads "Show empty state" so its next click is predictable.' },
        { title: 'Click it again', text: 'The view switches back to the empty state with the icon, heading, and CTA button.' },
        { title: 'Click "Browse products" inside the empty state', text: 'The same populated list view appears, proving the CTA is wired to the real state change, not just a decorative button.' },
      ],
    },
    features: [
      'Centered inline SVG icon built with real path elements, not a raster image',
      'Icon inherits color via currentColor so it matches the text-secondary utility class',
      'Bold heading, muted message, and a primary CTA button in a consistent empty-state layout',
      'Toggle button and the in-state CTA both drive the same shared setEmpty() function',
      'Toggle button relabels to describe its next action rather than the current state',
      'Populated view built from a real Bootstrap list-group with price alignment via flexbox utilities',
      'State tracked with a simple boolean rather than re-reading DOM visibility each click',
      'Zero external icon library or image request required for the illustration',
    ],
    useCases: [
      { icon: 'CART', title: 'Empty shopping cart or wishlist', desc: 'The exact scenario demoed here — show this instead of a blank list-group when nothing has been added yet.' },
      { icon: 'SEARCH', title: 'No search results found', desc: 'Swap the icon and copy for a "no results" message, similar to the no-results state used in [Search Autocomplete Suggestions](/ui-snippets/bootstrap-search-autocomplete-suggestions/).' },
      { icon: 'CHAT', title: 'No notifications or messages yet', desc: 'A friendly first-run state for an inbox, notification center, or activity feed before any items exist.' },
      { icon: 'LEARN', title: 'Teaching conditional UI patterns', desc: 'A clean example of toggling between two mutually exclusive views with one state variable, the same technique behind [Loading Spinner Overlay](/ui-snippets/bootstrap-loading-spinner-overlay/).' },
      { icon: 'APP', title: 'Dashboards with no data yet', desc: 'Pair with [Animated Counter Stats](/ui-snippets/bootstrap-animated-counter-stats/) to show an empty-state card until the first data point arrives.' },
    ],
    faqs: [
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Store an isEmpty boolean in useState (React), a ref (Vue), or a component property (Angular), and conditionally render the empty-state JSX/template or the populated one from it; the CTA button and the toggle button both just flip that one variable, exactly like the shared setEmpty() function does here.' },
      { q: 'Why use an inline SVG instead of an icon font or image?', a: 'An inline SVG has no network request, scales without blurring at any size, and its stroke color inherits from the surrounding text-secondary class via currentColor, so it automatically matches the empty state\'s muted tone without a separate color override.' },
      { q: 'Does the CTA button inside the empty state actually do anything?', a: 'Yes — it calls the same setEmpty(false) logic as the external toggle button, switching to the populated view, which mirrors what a real "Browse products" or "Add your first item" button should do in production.' },
      { q: 'Can I reuse this for a different empty scenario, like no notifications?', a: 'Yes — swap the SVG path, heading text, message, and CTA label; the toggle logic and d-none-based visibility switching stay identical regardless of what the empty and populated content actually is.' },
      { q: 'Does this work with Tailwind?', a: 'Yes — replace the Bootstrap card and btn classes with Tailwind equivalents like a bordered rounded-xl container and a bg-blue-600 button; the inline SVG and the isEmpty toggle logic need no changes at all.' },
      { q: 'Why track state with a boolean instead of checking classList directly?', a: 'A dedicated currentlyEmpty boolean lets both the toggle button and the CTA button update state through one function call without each needing to inspect and interpret the other element\'s current CSS classes, keeping the two entry points from drifting out of sync.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to add a subtle fade transition between the empty and populated views instead of an instant swap, or to parameterize the icon, heading, and message so the same component can be reused for multiple empty-state scenarios on one page.`,
      prompt: `Build a reusable Bootstrap 5.3 empty-state placeholder using the real Bootstrap CDN (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A card containing a centered inline SVG icon (built with real path elements, not an external image), a bold heading, a short muted message, and a primary btn btn-primary call-to-action button.
- A separate populated view (a Bootstrap list-group with sample items) that is hidden by default using the d-none utility class.
- A demo "Toggle demo state" button outside the card that switches between the empty state and the populated view, and relabels itself to describe its next action.
- The CTA button inside the empty state itself must also switch to the populated view when clicked, sharing the same state-toggling function as the external toggle button rather than duplicating the logic.`,
    },
  },
};

export default bootstrapEmptyStatePlaceholder;
