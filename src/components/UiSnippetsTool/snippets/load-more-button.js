const loadMoreButton = {
  id: 'load-more-button',
  title: 'Load More Button',
  category: 'buttons',
  html: `<div class="card-grid" id="cardGrid"></div>
<button class="load-more-btn" id="loadMoreBtn" onclick="loadMore()">Load More</button>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; display: flex; align-items: center; flex-direction: column; gap: 20px; }

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  width: 460px;
  max-width: 100%;
}
@media (max-width: 560px) { .card-grid { grid-template-columns: repeat(2, 1fr); width: 320px; } }

.grid-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 22px;
  text-align: center;
  animation: fadeIn 0.35s ease both;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

.grid-card .swatch { width: 100%; aspect-ratio: 1.3; border-radius: 8px; background: linear-gradient(135deg, #6366f1, #a855f7); margin-bottom: 10px; }
.grid-card span { font-size: 13px; color: #475569; font-weight: 600; }

.load-more-btn {
  display: block;
  margin: 0 auto;
  padding: 13px 36px;
  font-size: 14px;
  font-weight: 600;
  color: #6366f1;
  background: #fff;
  border: 1px solid #c7d2fe;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s;
}
.load-more-btn:hover { background: #eef2ff; }
.load-more-btn:disabled { opacity: 0.6; cursor: default; }

.load-more-btn.loading::after {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 8px;
  border: 2px solid #c7d2fe;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  vertical-align: middle;
}
@keyframes spin { to { transform: rotate(360deg); } }

.load-more-btn.all-loaded { display: none; }`,
  js: `const TOTAL_ITEMS = 24;
const BATCH_SIZE = 6;
let loaded = 0;

const grid = document.getElementById('cardGrid');
const btn = document.getElementById('loadMoreBtn');

function renderBatch(count) {
  for (let i = 0; i < count && loaded < TOTAL_ITEMS; i++) {
    loaded++;
    const card = document.createElement('div');
    card.className = 'grid-card';
    card.innerHTML = '<div class="swatch"></div><span>Item ' + loaded + '</span>';
    grid.appendChild(card);
  }
}

function loadMore() {
  btn.classList.add('loading');
  btn.disabled = true;

  setTimeout(() => {
    renderBatch(BATCH_SIZE);
    btn.classList.remove('loading');
    btn.disabled = false;

    if (loaded >= TOTAL_ITEMS) {
      btn.classList.add('all-loaded');
    }
  }, 600);
}

renderBatch(BATCH_SIZE);`,

  seo: {
    title: 'Load More Button — Free HTML CSS JS Batch Loading Grid Snippet',
    description: 'A "Load More" button that reveals additional card grid items in batches, shows a spinner loading state, and hides itself once every item has been shown. Vanilla JS.',
    about: {
      title: 'Load More Button — HTML, CSS & JavaScript Batch Content Reveal',
      description: `Infinite scroll isn't always the right choice — sometimes users want explicit control over when more content loads, and a footer stays reachable. This snippet implements the classic "Load More" pattern: a button below a card grid that appends a fixed-size batch of new cards each time it's clicked, shows a brief spinner while "loading," and disappears entirely once every item has been revealed.

**How batching works**

Two constants drive everything: \`TOTAL_ITEMS\` (the full dataset size) and \`BATCH_SIZE\` (how many cards to reveal per click). A \`loaded\` counter tracks progress. \`renderBatch(count)\` loops up to \`count\` times, but stops early if \`loaded\` reaches \`TOTAL_ITEMS\`, which is what prevents a final partial batch from creating extra empty cards. Each new card is built with \`document.createElement\` and appended directly — no destructive re-render of cards that are already showing, so their state (scroll position, any per-card JS listeners) is undisturbed.

**How the loading state is simulated**

Real-world "load more" clicks usually trigger a network request with genuine latency. This demo simulates that with a \`setTimeout\` of 600ms: the button gets a \`.loading\` class (which adds a small CSS spinner via \`::after\` and a \`@keyframes spin\` rotation) and is \`disabled\` immediately on click, then re-enabled once the simulated batch finishes loading. In a real integration, you'd replace the \`setTimeout\` with an actual \`fetch\`/\`await\` call and call \`renderBatch\` (or an equivalent render function) inside the \`.then\`.

**How the button hides itself when everything is loaded**

After each batch, \`loadMore\` checks \`loaded >= TOTAL_ITEMS\`. If true, it adds an \`.all-loaded\` class that sets \`display: none\` on the button — there's no reason to show a "Load More" affordance once there's nothing left to load. This check happens after every batch, so it correctly triggers on the exact batch that reaches the end, even if the last batch is smaller than a full \`BATCH_SIZE\`.

**Why cards fade in individually**

Each new \`.grid-card\` has a CSS \`animation: fadeIn 0.35s ease both\` applied automatically as soon as it's added to the DOM (CSS animations on new elements play automatically without needing to be triggered manually), giving each freshly-loaded batch a gentle staggered-feeling entrance rather than an abrupt appearance.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Load More Button" in the sidebar Library tab — the first batch of items renders immediately.' },
        { title: 'Click Load More repeatedly', text: 'Watch the spinner briefly appear, new cards fade in, and the button disappear once all items are shown.' },
        { title: 'Adjust batch size and total', text: 'Change TOTAL_ITEMS and BATCH_SIZE in the JS panel to control how many items exist and how many load per click.' },
        { title: 'Connect to real data', text: 'Replace the setTimeout simulation with a real fetch call, and build each card from your actual API response data.' },
        { title: 'Style the empty/all-loaded state', text: 'Optionally show a "You\'ve seen it all" message instead of just hiding the button — add it after the all-loaded class is applied.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind or click "Save as" to reuse this pattern in a real content grid.' },
      ],
    },
    features: [
      'Fixed-size batch loading driven by two simple TOTAL_ITEMS / BATCH_SIZE constants',
      'Existing cards are never re-rendered — new cards are only appended, preserving scroll and state',
      'Spinner loading state via a CSS ::after pseudo-element, no extra markup needed',
      'Button disables itself during the loading window to prevent duplicate rapid clicks',
      'Automatically hides once every item has been loaded, with no manual count-tracking in the caller',
      'Individual fade-in animation on each new card for a polished batch reveal',
      'Simulated network delay via setTimeout, structured to be swapped for a real fetch call directly',
      'Responsive 3-column-to-2-column grid with a single media query',
    ],
    useCases: [
      { icon: 'SHOP', title: 'Product and catalog grids', desc: 'Reveal more products in controlled batches instead of loading an entire catalog or relying on infinite scroll.' },
      { icon: 'FLOW', title: 'Blog and article archives', desc: 'Let readers explicitly ask for more posts rather than triggering a load automatically while scrolling.' },
      { icon: 'DASH', title: 'Search results pagination alternative', desc: 'Use as a simpler alternative to numbered pagination for moderate-sized result sets.' },
      { icon: 'LEARN', title: 'Learn append-only DOM updates', desc: 'Study why appending new elements (rather than re-rendering the whole list) preserves state and is more efficient.' },
      { icon: 'CODE', title: 'Foundation for real API pagination', desc: 'Swap the setTimeout for a real paginated fetch call, using the same loaded counter as your API\'s offset or cursor.' },
      { icon: 'CODE', title: 'Related: Screen Orientation Lock Toggle', desc: 'See the [Screen Orientation Lock Toggle](/ui-snippets/screen-orientation-lock-toggle/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the button know when to stop showing itself?', a: 'A loaded counter tracks how many items have been rendered. After every batch, loadMore checks whether loaded has reached TOTAL_ITEMS, and if so adds a class that hides the button — no manual tracking needed outside these two variables.' },
      { q: 'What happens if the last batch is smaller than BATCH_SIZE?', a: 'renderBatch loops up to the batch size but stops early once loaded equals TOTAL_ITEMS, so a final partial batch (e.g. 2 items left when BATCH_SIZE is 6) renders exactly those remaining items without creating empty cards.' },
      { q: 'Does clicking Load More re-render items that are already on the page?', a: 'No — new cards are created with document.createElement and appended to the existing grid. Cards already showing are never touched, so any state, animations, or event listeners attached to them are preserved.' },
      { q: 'How do I connect this to a real API instead of the demo data?', a: 'Replace the setTimeout callback with an actual fetch call (ideally paginated using loaded as an offset), await the response, and build each card\'s markup from the returned data instead of a hardcoded "Item N" label.' },
      { q: 'Why does the button disable itself while loading?', a: 'Without disabling the button, a user could click it multiple times in quick succession before the first batch finishes, potentially triggering duplicate loads or race conditions in a real network-backed implementation.' },
      { q: 'Can I show a message instead of just hiding the button when everything is loaded?', a: 'Yes — instead of only adding the all-loaded class (display:none), you can also insert a "You\'ve seen everything" message element into the DOM at that same point in the code.' },
      { q: 'Why does each new card fade in?', a: 'Each grid-card has a CSS animation applied via its class, which plays automatically the moment the element is inserted into the DOM. This gives each freshly-appended batch a soft entrance instead of popping in abruptly.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why renderBatch loops with an early-exit condition against TOTAL_ITEMS rather than always adding a full BATCH_SIZE worth of cards — the answer matters for correctly handling the final, possibly-partial batch. It's also a good prompt for converting this pattern to real infinite scroll using an IntersectionObserver on a sentinel element instead of a manual button click, or for adding error-state handling (a retry button) for when the simulated/real fetch fails.`,
      prompt: `Build a "load more button" pattern in plain HTML, CSS, and vanilla JavaScript for a card grid.

Requirements:
- A responsive card grid that initially renders one batch of items on page load, using two named constants: a total item count and a batch size per click.
- A "Load More" button below the grid that, when clicked, disables itself and shows a CSS-only spinner (no external icon), waits for a simulated network delay, then appends exactly enough new cards to fill the next batch — stopping early if fewer than a full batch's worth of items remain.
- New cards must be appended to the existing grid, not created by re-rendering the whole list, so previously loaded cards and their state are undisturbed.
- Once every item has been loaded, the button must hide itself automatically and stay hidden — no further clicks possible.
- Each newly appended card should play a brief fade/slide-in CSS animation automatically when it enters the DOM.
- Structure the loading simulation (a setTimeout) so it is obvious where a real fetch/await call to a paginated API would replace it.`,
    },
  },
};

export default loadMoreButton;
