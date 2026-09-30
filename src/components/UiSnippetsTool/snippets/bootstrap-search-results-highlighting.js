const bootstrapSearchResultsHighlighting = {
  id: 'bootstrap-search-results-highlighting',
  title: 'Bootstrap Search Results Highlighting',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bshl-card">
    <div class="card-body p-3">
      <input type="search" class="form-control mb-3" id="bshlInput" placeholder="Search articles...">
      <p class="small text-muted mb-2" id="bshlCount">6 articles</p>
      <ul class="list-unstyled mb-0" id="bshlList"></ul>
    </div>
  </div>
</div>`,
  css: `.bshl-card { width: 420px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bshl-item { padding: 8px 4px; font-size: 13.5px; border-bottom: 1px solid #f1f2f5; }
.bshl-item:last-child { border-bottom: none; }
.bshl-item mark { background: #fde68a; padding: 0 1px; border-radius: 2px; }`,
  js: `const ARTICLES = [
  'Getting started with keyboard navigation',
  'Designing accessible form validation',
  'A guide to CSS Grid layout patterns',
  'Debugging flaky JavaScript event listeners',
  'Building a design system from scratch',
  'Performance budgets for modern web apps',
];

const input = document.getElementById('bshlInput');
const count = document.getElementById('bshlCount');
const list = document.getElementById('bshlList');

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&');
}

function highlight(text, query) {
  if (!query) return escapeHtml(text);
  const pattern = new RegExp('(' + escapeRegExp(query) + ')', 'ig');
  return escapeHtml(text).replace(pattern, '<mark>$1</mark>');
}

function render() {
  const query = input.value.trim();
  const matches = query
    ? ARTICLES.filter(t => t.toLowerCase().includes(query.toLowerCase()))
    : ARTICLES;

  count.textContent = matches.length + ' article' + (matches.length === 1 ? '' : 's') +
    (query ? ' matching "' + query + '"' : '');

  list.innerHTML = matches.map(t => '<li class="bshl-item">' + highlight(t, query) + '</li>').join('') ||
    '<li class="bshl-item text-muted">No articles match.</li>';
}

input.addEventListener('input', render);
render();`,

  seo: {
    title: 'Bootstrap Search Results Highlighting — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 live search that wraps the matching substring of every visible result in a real <mark> element, safely escaped against both HTML injection and special regex characters.',
    about: {
      title: 'Bootstrap Search Results Highlighting — HTML, CSS & JavaScript',
      description: `Highlighting a live-typed query safely takes two separate escaping passes, and skipping either one breaks something different. \`escapeHtml()\` runs first so a result containing \`<\`/\`>\`/\`&\` can never be misinterpreted as markup once it's injected via \`innerHTML\`. Separately, \`escapeRegExp()\` runs on the *query itself* before it's used to build a \`RegExp\` — without it, a user typing a character that's meaningful in regex syntax (like \`.\`, \`(\`, or \`*\`) would either throw a runtime error or silently match in unintended ways, since \`new RegExp(query)\` would interpret those characters as pattern syntax instead of literal text to search for.\n\n\`highlight()\` builds the match pattern with a capturing group and the \`i\`/\`g\` flags (\`new RegExp('(' + escaped + ')', 'ig')\`), then replaces every match with \`<mark>$1</mark>\` — the capturing group is what lets the replacement preserve the original casing of the matched text (searching "grid" still highlights "Grid" with its real capital G intact) rather than replacing it with the lowercase query.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'All 6 sample articles show with no highlighting, since no search has been typed yet.' },
        { title: 'Type "grid"', text: 'Only the CSS Grid article remains, and "Grid" inside its title is wrapped in a yellow highlight.' },
        { title: 'Clear the input and type "a"', text: 'Every article containing the letter "a" anywhere shows, each with every occurrence highlighted.' },
        { title: 'Type a regex-special character like "(" ', text: 'The search still works correctly as literal text instead of breaking, thanks to the escaped pattern.' },
        { title: 'Type something matching nothing', text: 'The list shows a plain "No articles match" message instead of an empty highlighted list.' },
      ],
    },
    features: [
      'Two independent escaping passes — one for the rendered HTML, one for the regex pattern itself',
      'Special regex characters typed into the search box are treated as literal text, never as pattern syntax',
      'The regex capturing group preserves the original casing of each highlighted match',
      'Case-insensitive matching via the regex "i" flag, matching every occurrence via the "g" flag',
      'A live result count that reflects the current query, distinct from a plain no-filter count',
    ],
    useCases: [
      { icon: 'SEARCH', title: 'Documentation, help center, and FAQ search', desc: 'Pairs with [bootstrap-search-autocomplete-suggestions](/ui-snippets/bootstrap-search-autocomplete-suggestions/) or [bootstrap-no-search-results-state](/ui-snippets/bootstrap-no-search-results-state/) for a complete search experience.' },
      { icon: 'SEARCH', title: 'Letting a user repeat a search that already worked well', desc: 'Combine with [bootstrap-search-recent-searches](/ui-snippets/bootstrap-search-recent-searches/) so a highlighted, successful search is one click away from being run again.' },
      { icon: 'APP', title: 'Admin tables and log viewers', desc: 'Highlighting exactly what matched in each row makes scanning long filtered lists noticeably faster.' },
      { icon: 'LEARN', title: 'Learning safe dynamic regex construction', desc: 'A compact, realistic example of the escaping mistake ("what if the user types a regex special character") that\'s easy to overlook when building search-as-you-type features.' },
    ],
    faqs: [
      { q: 'What happens if I search for a character like "*" or "("?', a: 'It\'s treated as literal text to search for, not regex syntax — escapeRegExp() escapes every character with special regex meaning before the query is ever turned into a RegExp, so the search never throws an error or matches unpredictably.' },
      { q: 'Why use <mark> instead of a custom styled <span>?', a: '<mark> is the semantically correct HTML element for "text highlighted for reference," carries a sensible default yellow background with zero CSS required, and is understood by assistive technology as a genuine highlight rather than arbitrary styling.' },
      { q: 'Does the highlighting preserve the original text\'s capitalization?', a: 'Yes — the regex\'s capturing group and the $1 in the replacement insert exactly what was matched in the source text, not the (possibly differently-cased) query the user actually typed.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. The escaping and highlight-building logic is framework-agnostic; render the highlighted string via dangerouslySetInnerHTML (React), v-html (Vue), or [innerHTML] (Angular) since it\'s pre-escaped HTML, or split the matched ranges into an array of text/mark segments for a fully JSX-native render instead.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to highlight multiple separate search terms at once (splitting the query on whitespace), or to add fuzzy matching so close-but-not-exact spellings still return and highlight the closest matching substring.`,
      prompt: `Build a Bootstrap 5.3 live search with results highlighting, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A search input filtering a list of at least 6 sample text items live on every keystroke, case-insensitive substring match.
- Every visible result must have its matching substring wrapped in a real <mark> element, preserving the original text's exact casing.
- The query must be escaped for safe use inside a RegExp before building the highlight pattern, so a user typing a regex-special character (., *, (, etc.) is treated as literal text rather than breaking the search or matching unexpectedly.
- The result text itself must also be HTML-escaped before highlighting, so any special HTML characters in the source text can never be misinterpreted as markup.
- Show a live result count reflecting the current query, and an explicit no-matches message when nothing matches.`,
    },
  },
};

export default bootstrapSearchResultsHighlighting;
