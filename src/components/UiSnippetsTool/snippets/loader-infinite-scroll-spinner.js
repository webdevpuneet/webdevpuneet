const loaderInfiniteScrollSpinner = {
  id: 'loader-infinite-scroll-spinner',
  title: 'Infinite Scroll Loading Spinner',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="is-frame">
  <ul class="is-list" id="isList"></ul>
  <div class="is-sentinel" id="isSentinel">
    <div class="is-spinner" id="isSpinner"></div>
    <span class="is-end" id="isEnd">You've reached the end</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.is-frame{width:100%;max-width:340px;height:420px;background:#121729;border:1px solid #232a41;border-radius:16px;overflow-y:auto;box-shadow:0 18px 44px rgba(0,0,0,.4)}

.is-list{list-style:none;display:flex;flex-direction:column}
.is-row{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid #1b2136}
.is-avatar{width:34px;height:34px;border-radius:50%;flex-shrink:0}
.is-body{flex:1;min-width:0}
.is-title{font-size:13px;font-weight:700;color:#e2e6f5}
.is-sub{font-size:11px;color:#6b7591;margin-top:2px}

.is-sentinel{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:22px 0;min-height:64px}
.is-spinner{width:22px;height:22px;border:2.5px solid #232a41;border-top-color:#818cf8;border-radius:50%;animation:isSpin .7s linear infinite;display:none}
.is-spinner.show{display:block}
@keyframes isSpin{to{transform:rotate(360deg)}}
.is-end{display:none;font-size:11.5px;color:#4b5470;letter-spacing:.03em}
.is-end.show{display:block}`,

  js: `var list = document.getElementById('isList');
var sentinel = document.getElementById('isSentinel');
var spinner = document.getElementById('isSpinner');
var endLabel = document.getElementById('isEnd');

var NAMES = ['Ava Chen', 'Marco Diaz', 'Priya Raman', 'Jonah Lee', 'Sara Kim', 'Tobi Adeyemi', 'Lena Fischer', 'Omar Haddad'];
var page = 0;
var MAX_PAGES = 4;
var loading = false;

function colorFor(seed) {
  var hue = (seed * 47) % 360;
  return 'hsl(' + hue + ', 65%, 55%)';
}

function renderPage(items) {
  var frag = document.createDocumentFragment();
  items.forEach(function (item) {
    var li = document.createElement('li');
    li.className = 'is-row';
    li.innerHTML =
      '<span class="is-avatar" style="background:' + colorFor(item.id) + '"></span>' +
      '<span class="is-body">' +
        '<span class="is-title">' + item.name + '</span>' +
        '<span class="is-sub">Item #' + item.id + '</span>' +
      '</span>';
    frag.appendChild(li);
  });
  list.appendChild(frag);
}

function loadNextPage() {
  if (loading || page >= MAX_PAGES) return;
  loading = true;
  spinner.classList.add('show');

  // Simulated network fetch for the next batch of rows. Swap this for a real
  // fetch('/api/items?page=' + page) that resolves to real items.
  setTimeout(function () {
    var startId = page * 8 + 1;
    var items = [];
    for (var i = 0; i < 8; i++) {
      items.push({ id: startId + i, name: NAMES[(startId + i) % NAMES.length] });
    }
    renderPage(items);
    page++;
    loading = false;
    spinner.classList.remove('show');

    if (page >= MAX_PAGES) {
      observer.unobserve(sentinel);
      endLabel.classList.add('show');
    }
  }, 900);
}

// The sentinel sits just below the list. As soon as it scrolls into view
// inside the scrollable frame, the observer fires and the next page loads —
// this is the real mechanic, not a scroll-position calculation.
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) loadNextPage();
  });
}, {
  root: document.querySelector('.is-frame'),
  rootMargin: '80px',
  threshold: 0,
});

observer.observe(sentinel);
loadNextPage();`,

  seo: {
    title: 'Infinite Scroll Loading Spinner — IntersectionObserver Load-More',
    description: `A scrollable list that loads and appends more items via a real IntersectionObserver on a sentinel element, showing a spinner right where the list ends. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Infinite Scroll Loading Spinner — A Real IntersectionObserver Sentinel Pattern',
      description: `Infinite scroll is often built with a scroll-position calculation — checking \`scrollTop + clientHeight\` against \`scrollHeight\` on every scroll event — which is both imprecise and expensive to run at scroll frequency. The correct, modern mechanic is a sentinel element and an \`IntersectionObserver\`: an invisible marker sits just past the last row, the browser itself tells you the instant it scrolls into view, and that single event triggers the next page load. This snippet builds the pattern properly, with a spinner that appears exactly at the list's growing edge while a page loads.

**A sentinel element, not a scroll listener**

The \`.is-sentinel\` div sits as the last child of the scrollable frame, after the list. Instead of attaching a \`scroll\` event handler and computing distance-from-bottom math on every single scroll tick, an \`IntersectionObserver\` is created once and told to watch that one element. The browser's own compositor tracks the intersection natively — no per-scroll-event JavaScript runs at all, which is both simpler and considerably cheaper than polling scroll position.

**rootMargin gives it a head start**

The observer is configured with \`root: <the scrollable frame>\` (so it measures intersection against the list's own scroll container, not the whole page) and \`rootMargin: '80px'\`, which extends the "viewport" the observer checks against by 80px beyond the frame's actual visible bottom edge. That means the next page starts loading slightly before the sentinel is literally visible — while the user still has a little unread content to scroll through — so by the time they actually reach the bottom, the new rows are often already rendered rather than making them wait after arriving.

**One flag prevents duplicate loads**

\`loading\` is checked and set inside \`loadNextPage()\` before anything else happens, and reset only once the simulated fetch resolves. Since \`IntersectionObserver\` can fire its callback more than once while an element stays intersecting (for instance if the observed element's size or position shifts slightly), this guard is what stops a single scroll-to-bottom from accidentally triggering two overlapping page loads.

**A real "end of list" state, not an infinite loop**

Once \`page\` reaches \`MAX_PAGES\`, the observer calls \`unobserve(sentinel)\` to stop watching entirely (there's nothing left to load, so there's no reason to keep paying for intersection checks) and swaps the spinner for a static "You've reached the end" label — an honest terminal state rather than a spinner that would otherwise spin forever with nothing left to fetch.

**Wiring it to a real API**

Replace the \`setTimeout\` inside \`loadNextPage()\` with a real \`fetch('/api/items?page=' + page)\`, calling \`renderPage()\` with the response's actual items inside the resolved promise, and set \`loading = false\` in a \`finally\`. The observer setup, the \`rootMargin\` head start, the duplicate-load guard, and the end-of-list handling all stay exactly the same — only the data source changes. Pair it with a [skeleton card grid](/ui-snippets/skeleton-card-grid/) for a richer per-row placeholder while a page loads, or an [empty state](/ui-snippets/empty-state/) for the very first, zero-item case.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A scrollable list renders with its first page of rows already loaded.` },
      { title: 'Scroll to the bottom', text: `A spinner appears at the list's edge and the next page loads and appends.` },
      { title: 'Keep scrolling', text: `Each time the sentinel comes into view, another page loads automatically.` },
      { title: 'Reach the last page', text: `The spinner is replaced by a static "You've reached the end" label.` },
      { title: 'Inspect the observer setup', text: `Note root, rootMargin, and threshold are scoped to the scrollable frame.` },
      { title: 'Wire a real API', text: `Replace the setTimeout in loadNextPage() with a real fetch call.` },
    ] },
    features: [
      { title: 'Real IntersectionObserver', text: `No scroll event listener or manual scroll-position math anywhere.` },
      { title: 'Scoped root', text: `The observer measures against the scrollable frame, not the whole page.` },
      { title: 'rootMargin head start', text: `Loading begins slightly before the sentinel is literally visible.` },
      { title: 'Duplicate-load guard', text: `A loading flag prevents overlapping fetches from a single scroll.` },
      { title: 'Spinner at the growing edge', text: `The loading indicator sits exactly where new rows will appear.` },
      { title: 'Honest end-of-list state', text: `Observing stops and a static label replaces the spinner once done.` },
      { title: 'Fragment-batched rendering', text: `Each page's rows are appended via one DocumentFragment, not one-by-one.` },
      { title: 'Real-API-ready structure', text: `Swap the simulated timeout for fetch with no change to the observer logic.` },
    ],
    useCases: [
      { title: 'Social and activity feeds', text: 'Load more posts as the reader nears the end, using an IntersectionObserver sentinel rather than costly scroll-position maths.' },
      { title: 'Search and product results', text: 'Append results continuously, with `rootMargin` starting the next load slightly before the sentinel is actually visible.' },
      { title: 'Notification and inbox lists', text: 'Page in older items only when needed, with a loading flag preventing overlapping fetches from a single scroll.' },
      { title: 'Image galleries', text: 'Combine with an [image blur-up](/ui-snippets/image-blur-up/) loader so each newly appended picture also fades in gracefully as the list grows.' },
      { title: 'Admin tables and comment threads', text: 'Offer a lighter alternative to full pagination, with an end-of-list message once no more items remain.' },
      { icon: 'CODE', title: 'Related: Button Loading State Morph', desc: 'See the [Button Loading State Morph](/ui-snippets/loader-inline-button-morph/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use IntersectionObserver instead of a scroll event listener?', a: `A scroll listener fires continuously as the user scrolls and forces you to manually compute scrollTop, clientHeight, and scrollHeight on every single event to guess proximity to the bottom — expensive and imprecise. IntersectionObserver instead watches one sentinel element and lets the browser's own compositor report, natively and efficiently, the exact moment that element enters the visible area, with zero per-scroll-frame JavaScript.` },
      { q: 'What does rootMargin: "80px" actually do here?', a: `It expands the area the observer treats as "the viewport" by 80px past the scroll frame's real visible edge, so the sentinel is considered intersecting — and the next page starts loading — while it's still 80px below what the user can currently see. This gives the fetch a head start, so new rows are often already rendered by the time the user actually scrolls that far.` },
      { q: 'How does the snippet prevent loading the same page twice?', a: `loadNextPage() checks and immediately sets a loading flag before doing anything else, and only clears it once the simulated fetch resolves. Because IntersectionObserver can re-fire its callback while an element remains intersecting (for example after a layout shift), this guard is what stops a single scroll position from triggering two overlapping requests for the same page.` },
      { q: 'What happens when there is no more data to load?', a: `Once page reaches MAX_PAGES, the code calls observer.unobserve(sentinel) so the browser stops tracking that element entirely, and swaps the spinner for a static "You've reached the end" label. This is a genuine terminal state — there's no risk of the spinner reappearing or another fetch firing, since the observer is no longer watching anything.` },
      { q: 'How do I use this with a real API and in React, Vue, or Angular?', a: `Replace the setTimeout with a real fetch('/api/items?page=' + page) call, rendering the response's actual items and clearing the loading flag in a .finally(). In a framework, create the IntersectionObserver inside a mount effect targeting a ref on the sentinel element, call your data-fetching function from its callback, and clean up by disconnecting the observer on unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why watching a single sentinel element with IntersectionObserver is more efficient than a scroll event listener computing scrollTop/scrollHeight math on every tick, and what specific role the rootMargin: '80px' option plays in giving the next page's fetch a head start before the user actually reaches the bottom. It's worth a robustness check too: ask why loadNextPage() needs its own loading guard given that IntersectionObserver can fire its callback multiple times while an element stays intersecting, and what would go wrong without that guard. For extending it, ask for a version that shows a skeleton row placeholder instead of a spinner while each page loads, one that handles a failed fetch by showing a retry affordance at the sentinel instead of silently stopping, or a way to prefetch the next page slightly earlier by increasing rootMargin further. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "infinite scroll" list in plain HTML, CSS, and JavaScript that loads more items using a real IntersectionObserver on a sentinel element — no scroll event listener and no manual scrollTop/scrollHeight distance calculations anywhere.

Requirements:
- A scrollable container (fixed height, overflow-y: auto) holding a list of rows, with a distinct sentinel element placed as the last child after the list, initially hidden behind a loading spinner that is only shown while a page is actively loading.
- Create exactly one IntersectionObserver, scoped to the scrollable container as its root (not the document viewport), configured with a rootMargin that extends its trigger area some distance past the container's real visible bottom edge, and have it observe only the sentinel element.
- The observer's callback must trigger a page-loading function only when the sentinel is reported as intersecting, and that function must guard against being invoked again while a previous page load is still in flight, using a boolean flag checked and set before any asynchronous work begins.
- Simulate fetching each page's items with a short delay before appending new rows to the list (structured so swapping in a real fetch call requires touching only that one function), and batch-insert each page's new rows using a single DocumentFragment rather than individual appendChild calls in a loop.
- After a fixed number of pages have loaded, stop observing the sentinel entirely (calling unobserve or disconnect) and replace the spinner with a static "reached the end" message, so no further loads are possible and the UI clearly communicates there is nothing left to fetch.
- Confirm scrolling quickly to the bottom multiple times in succession never triggers more than one overlapping request for the same page.`,
    },
  },
};

export default loaderInfiniteScrollSpinner;
