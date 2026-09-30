const bootstrapNoSearchResultsState = {
  id: 'bootstrap-no-search-results-state',
  title: 'Bootstrap No Search Results State',
  lastmod: '2026-09-11',
  category: 'layouts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsnores-card">
    <div class="card-body p-3">
      <input type="search" class="form-control mb-3" id="bsnoresInput" placeholder="Search integrations...">

      <ul class="list-unstyled mb-0" id="bsnoresList"></ul>

      <div class="text-center py-4 d-none" id="bsnoresEmpty">
        <p class="fw-semibold mb-1">No results for &ldquo;<span id="bsnoresQuery"></span>&rdquo;</p>
        <p class="small text-muted mb-3">Try a different spelling, or clear your search to see everything.</p>
        <button type="button" class="btn btn-sm btn-outline-secondary" id="bsnoresClear">Clear search</button>
      </div>
    </div>
  </div>
</div>`,
  css: `.bsnores-card { width: 380px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsnores-item { display: flex; align-items: center; gap: 10px; padding: 8px 6px; border-radius: 8px; font-size: 13.5px; }
.bsnores-item:hover { background: #f8f9fb; }
.bsnores-dot { width: 8px; height: 8px; border-radius: 50%; background: #6366f1; flex-shrink: 0; }`,
  js: `const ITEMS = ['Slack', 'Notion', 'Figma', 'GitHub', 'Jira', 'Zoom', 'Stripe', 'Linear', 'Zendesk', 'HubSpot'];
const input = document.getElementById('bsnoresInput');
const list = document.getElementById('bsnoresList');
const empty = document.getElementById('bsnoresEmpty');
const queryEl = document.getElementById('bsnoresQuery');

function render() {
  const q = input.value.trim();
  const matches = q === '' ? ITEMS : ITEMS.filter(name => name.toLowerCase().includes(q.toLowerCase()));

  if (matches.length === 0) {
    list.innerHTML = '';
    list.classList.add('d-none');
    empty.classList.remove('d-none');
    queryEl.textContent = q;
    return;
  }

  empty.classList.add('d-none');
  list.classList.remove('d-none');
  list.innerHTML = matches.map(name =>
    '<li class="bsnores-item"><span class="bsnores-dot"></span>' + name + '</li>'
  ).join('');
}

input.addEventListener('input', render);

document.getElementById('bsnoresClear').addEventListener('click', () => {
  input.value = '';
  render();
  input.focus();
});

render();`,

  seo: {
    title: 'Bootstrap No Search Results State — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 search list that echoes the exact query back in its empty state — "No results for \'xyz\'" — with a one-click Clear search action, distinct from a generic first-time empty state.',
    about: {
      title: 'Bootstrap No Search Results State — HTML, CSS & JavaScript',
      description: `A "no results" state and a generic "nothing here yet" empty state look similar but mean opposite things — one says the data doesn't exist, the other says the data exists but the current search didn't find it. This snippet keeps that distinction sharp by echoing the exact, unmodified query back into the message: \`queryEl.textContent = q\` inside \`render()\` means the empty state always says "No results for 'xyz'" using the literal text the user typed, not a generic "no items found" that leaves them wondering whether their search even registered.\n\n\`render()\` is the single function driving every visible state — it filters \`ITEMS\` by a case-insensitive substring match, and then either populates the list or reveals the empty block based on \`matches.length\`, so the list and the empty state are structurally guaranteed to never both show at once (unlike toggling them from two separate code paths that could fall out of sync). Clearing an empty input on load intentionally returns every item rather than nothing, since an empty query means "no filter applied yet," not "search for the empty string."\n\n"Clear search" does two things a lot of clear buttons skip: it calls \`render()\` immediately so the full list reappears without waiting for another keystroke, and it calls \`input.focus()\` afterward so a user can start a new search right away instead of having to click back into the field themselves.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'All ten integrations appear in a plain list, with the empty state hidden.' },
        { title: 'Type a real match like "fig"', text: 'The list narrows live to just "Figma" as you type.' },
        { title: 'Type something that matches nothing, like "asdf"', text: 'The list disappears and a message reads exactly: No results for "asdf".' },
        { title: 'Click "Clear search"', text: 'The input empties, the full list of ten reappears immediately, and the cursor returns to the search field.' },
        { title: 'Clear the field manually with backspace instead', text: 'The full list reappears the same way, confirming an empty query always means "show everything."' },
      ],
    },
    features: [
      'The empty-state message echoes back the user\'s exact search text, not a generic placeholder',
      'One render() function is the single source of truth for whether the list or the empty state shows',
      'An empty search query is treated as "no filter," correctly returning every item rather than nothing',
      'Case-insensitive substring matching, so "FIG", "fig", and "Fig" all find the same result',
      'Clear search immediately re-renders and refocuses the input in one action',
    ],
    useCases: [
      { icon: 'SEARCH', title: 'Any filterable list, dropdown, or command menu', desc: 'Pairs directly with [bootstrap-search-autocomplete-suggestions](/ui-snippets/bootstrap-search-autocomplete-suggestions/) or [bootstrap-multi-select-dropdown](/ui-snippets/bootstrap-multi-select-dropdown/) for the moment a search legitimately comes up empty.' },
      { icon: 'CART', title: 'Product or catalog search on ecommerce sites', desc: 'A shopper searching for a misspelled or unstocked item needs to see their own query reflected back, not a vague "nothing found."' },
      { icon: 'APP', title: 'Admin panels filtering users, orders, or records', desc: 'Distinguishes cleanly from a true first-time empty state — see [bootstrap-empty-state-placeholder](/ui-snippets/bootstrap-empty-state-placeholder/) for when a table has no records at all rather than a search that found none.' },
      { icon: 'LEARN', title: 'Learning single-source-of-truth rendering', desc: 'A small, complete example of driving multiple mutually exclusive UI states from one function instead of separately toggled flags.' },
    ],
    faqs: [
      { q: 'How is this different from a generic empty-state placeholder?', a: 'A generic empty state (see bootstrap-empty-state-placeholder) means the underlying data itself doesn\'t exist yet — an empty inbox, a fresh account. This state means the data exists, but the user\'s specific search term matched none of it, which is why echoing their exact query back is the important detail here.' },
      { q: 'Why does an empty search box show everything instead of nothing?', a: 'An empty query represents "no filter has been applied," which is different from "search for an empty string." Treating it as no filter matches how virtually every real search box behaves before a user has typed anything.' },
      { q: 'Is the search debounced?', a: 'No — with only ten in-memory items, filtering on every keystroke is effectively instant. For a real search hitting a network request, wrap the render() call in the same debounce pattern used in bootstrap-form-autosave-status before firing the actual request.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep ITEMS and the query in component state, derive matches with the same filter logic inside the render function or a computed value, and conditionally render either the list or the empty-state block based on matches.length — no other logic needs to change.' },
      { q: 'Does the search match anywhere in the name or only the start?', a: 'Anywhere — it uses String.includes(), so searching "hub" correctly matches "HubSpot" even though the match isn\'t at the start of the name. Swap to startsWith() if you specifically want prefix-only matching instead.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a "Did you mean...?" suggestion using a simple edit-distance check against the item list when a search comes up empty, or to highlight the matching substring within each visible result the way bootstrap-search-autocomplete-suggestions does.`,
      prompt: `Build a Bootstrap 5.3 searchable list with a proper no-results state, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A search input above a list of at least 8 sample items, filtering the list live on every keystroke with a case-insensitive substring match.
- An empty search query must show every item, not zero items — empty means "no filter," not "search for nothing."
- When the current query matches zero items, hide the list entirely and show an empty-state block that echoes the user's exact search text back in a message like: No results for "xyz".
- Include a "Clear search" button in the empty state that resets the input, immediately re-renders the full list, and returns keyboard focus to the search field.`,
    },
  },
};

export default bootstrapNoSearchResultsState;
