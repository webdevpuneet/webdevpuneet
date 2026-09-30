const bootstrapError404Page = {
  id: 'bootstrap-error-404-page',
  title: 'Bootstrap 404 Error Page',
  lastmod: '2026-09-10',
  category: 'layouts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex flex-column align-items-center text-center bs404-wrap">
  <div class="bs404-code fw-bold mb-2">404</div>
  <h4 class="fw-bold mb-2">Page not found</h4>
  <p class="text-muted mb-4">The page you're looking for doesn't exist or may have been moved.</p>

  <div class="w-100 bs404-search mb-2">
    <input type="text" class="form-control" id="bs404Input" placeholder="Search for a page...">
    <div class="list-group mt-2" id="bs404Results"></div>
  </div>

  <a href="javascript:void(0)" class="btn btn-dark mt-3 px-4" id="bs404Home">Back to Home</a>
</div>`,
  css: `.bs404-code { font-size: 6rem; line-height: 1; color: #0d6efd; }
.bs404-search { max-width: 380px; position: relative; }
.bs404-search .list-group { position: absolute; width: 100%; z-index: 5; box-shadow: 0 6px 16px rgba(0,0,0,.12); }`,
  js: `const PAGES = [
  'Home', 'Pricing', 'About Us', 'Contact', 'Blog', 'Documentation',
  'Careers', 'Help Center', 'Login', 'Sign Up', 'Privacy Policy', 'Terms of Service',
];

const input = document.getElementById('bs404Input');
const results = document.getElementById('bs404Results');
const homeBtn = document.getElementById('bs404Home');

function render(query) {
  results.innerHTML = '';
  if (!query) return;

  const matches = PAGES.filter(p => p.toLowerCase().includes(query.toLowerCase()));

  if (matches.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'list-group-item text-muted small';
    empty.textContent = 'No matching pages found.';
    results.appendChild(empty);
    return;
  }

  matches.slice(0, 6).forEach(page => {
    const item = document.createElement('a');
    item.href = 'javascript:void(0)';
    item.className = 'list-group-item list-group-item-action';
    item.textContent = page;
    item.addEventListener('click', () => {
      input.value = page;
      results.innerHTML = '';
    });
    results.appendChild(item);
  });
}

input.addEventListener('input', () => render(input.value.trim()));

homeBtn.addEventListener('click', () => {
  input.value = '';
  results.innerHTML = '';
  input.focus();
});`,

  seo: {
    title: 'Bootstrap 404 Error Page — Free HTML CSS JS Snippet',
    description: `A real Bootstrap 5.3 centered 404 page with a live client-side search suggesting popular pages as you type. Copy-paste or export to React, Vue & Tailwind.`,
    about: {
      title: 'Bootstrap 404 Error Page — HTML, CSS & JavaScript',
      description: `A 404 page's job is to recover the visit, not just apologize for it — this snippet's most useful piece is the small client-side search that turns "page not found" into "here's what you probably meant." A fixed \`PAGES\` array stands in for a sitemap, and every keystroke in \`#bs404Input\` calls \`render(query)\`, which filters that array with a case-insensitive \`.includes()\` substring match and rebuilds the results list from scratch by clearing \`results.innerHTML = ''\` before appending fresh matches — this avoids the common bug of stale suggestions lingering underneath newer ones when a query is edited quickly.\n\nThe layout itself is centered with Bootstrap flex utilities (\`d-flex flex-column align-items-center text-center\`) inside a standard \`container\`, with the large \`404\` figure styled by a single custom rule (\`.bs404-code\`) setting an oversized \`font-size\` and Bootstrap's primary blue as its color — deliberately minimal, so the visual weight comes from scale and color rather than a custom illustration or icon library. The search results dropdown is a real Bootstrap \`list-group\` with \`list-group-item-action\` entries, absolutely positioned beneath the input via \`.bs404-search\` so opening it doesn't push the "Back to Home" button further down the page.\n\nMatching results are capped at six with \`matches.slice(0, 6)\` to keep the suggestion list from growing unbounded and overwhelming the page if a broad query (like a single common letter) matches most of the list. When zero pages match, a distinct \`text-muted\` "No matching pages found" row is shown instead of leaving an ambiguous empty gap — a user who types a genuinely unmatched query gets clear feedback rather than wondering if the search is broken. Clicking a suggested page writes it into the input and clears the results (\`results.innerHTML = ''\`), which in a real deployment would be replaced with an actual navigation call, such as setting \`window.location.href\`; that hook is deliberately left as the one integration point since this snippet has no real routes to send anyone to.\n\nOne subtle behavior worth noting: \`render()\` clears and rebuilds the entire results list on every keystroke rather than diffing which items changed, which is deliberately simple for a list capped at six entries — the cost of a full rebuild is negligible at this scale, and it sidesteps any bookkeeping bugs that a partial-update approach could introduce when a fast typist changes the query several times within a second.\n\nThe "Back to Home" button is a genuine Bootstrap \`btn btn-dark\` styled as a link, and its click handler resets the search field, clears any lingering results, and refocuses the input — treated here as "reset the demo state" rather than a real navigation, since wiring an actual home route is left to the page it's embedded in.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A large blue "404" figure appears above a "Page not found" message, an empty search box, and a dark "Back to Home" button.' },
        { title: 'Type "b" into the search box', text: 'A dropdown list appears beneath the input showing every page containing that letter, such as "Blog," "About Us," and "Contact."' },
        { title: 'Keep typing to "blo"', text: 'The list narrows live to just "Blog" as the filter re-runs on every keystroke.' },
        { title: 'Click "Blog" in the results', text: 'The search box fills with "Blog" and the suggestion dropdown closes.' },
        { title: 'Type a query that matches nothing, like "zzz"', text: 'The dropdown shows a plain "No matching pages found" message instead of appearing empty or broken.' },
      ],
    },
    features: [
      'Centered Bootstrap flex layout for the 404 figure, message, and actions',
      'Live client-side search filtering a fixed list of popular pages as you type',
      'Real Bootstrap list-group dropdown for search suggestions',
      'Results capped at six matches to avoid an overwhelming suggestion list',
      'Dedicated no-match message instead of a silently empty results list',
      'Clicking a suggestion fills the input and closes the dropdown',
      'Back to Home button resets search state and refocuses the input',
      'Case-insensitive substring matching against the page list',
    ],
    useCases: [
      { icon: 'SEARCH', title: 'Marketing and SaaS site 404 pages', desc: `A friendly not-found page that helps lost visitors self-navigate instead of bouncing, often reachable from a [sticky navbar](/ui-snippets/bootstrap-sticky-navbar-shrink/) on every other page.` },
      { icon: 'APP', title: 'Documentation and help center fallbacks', desc: `Suggest nearby documentation pages when a link is broken or outdated, complementing an [FAQ page](/ui-snippets/bootstrap-faq-page-categories/) elsewhere on the same site.` },
      { icon: 'LEARN', title: 'Learning client-side filtering patterns', desc: 'A simple, reusable example of live substring filtering, result capping, and an explicit empty-state message applicable to any small search UI.' },
      { icon: 'DESIGN', title: 'Static site and JAMstack error pages', desc: 'A fully self-contained error page that works with only static hosting, no backend search service required.' },
      { icon: 'FLOW', title: 'E-commerce broken-link recovery', desc: `Help shoppers find a moved product category page, similar in spirit to the [coming-soon page](/ui-snippets/bootstrap-coming-soon-page/) pattern used for pages still in progress.` },
    ],
    faqs: [
      { q: 'Does the search actually query a real sitemap or backend?', a: 'No — it filters a small fixed PAGES array defined directly in the JavaScript as a stand-in for a real site structure. Replace that array with your actual page list, or swap render() to call a real search API for production use.' },
      { q: 'What happens when I click a suggested page?', a: 'The click handler fills the search input with that page name and clears the results dropdown; in a real deployment you would also navigate to that page\'s URL, for example by setting window.location.href inside the same handler.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — store the query and filtered results in component state (React useState, Vue ref, Angular class fields), derive matches with .filter() on every render instead of manually rebuilding innerHTML, and use your framework\'s router (react-router, vue-router, Angular Router) to actually navigate on suggestion click.' },
      { q: 'Why cap the results at six matches?', a: 'A broad or single-character query could otherwise match most of the page list, producing an unusably long dropdown; slicing to the first six keeps suggestions scannable and fast to act on.' },
      { q: 'Is the search case-sensitive?', a: 'No — both the page names and the typed query are lowercased before comparison, so searching "BLOG" and "blog" return identical results.' },
      { q: 'How would this look built in Tailwind CSS?', a: 'Replace list-group/list-group-item-action and form-control with Tailwind utility classes for a bordered dropdown list and input, and keep the render() filtering logic completely unchanged since it has no Bootstrap dependency.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to wire the suggestion clicks and the Back to Home button to real navigation using your router of choice, or to add a subtle fade-in animation on the 404 figure when the page loads. It's also worth asking it to log unmatched search queries so you can spot real broken links visitors are hitting.`,
      prompt: `Build a Bootstrap 5.3 404 error page with a client-side page search using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A centered layout with a large "404" figure, a heading, a short message, a search input, and a "Back to Home" button, using real Bootstrap flex and spacing utilities.
- A small fixed array of "popular pages" filtered live (case-insensitive substring match) as the user types into the search input, rendered as a real Bootstrap list-group dropdown beneath the input.
- The results list must be capped at a reasonable number of matches (around 5-6) and must show a distinct "no matches found" message when nothing matches, rather than appearing empty.
- Clicking a suggested result must fill the input with that page name and close the dropdown.
- The Back to Home button must reset the search field and refocus the input.`,
    },
  },
};

export default bootstrapError404Page;
