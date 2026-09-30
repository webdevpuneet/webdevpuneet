const bootstrapBlogPostCardGrid = {
  id: 'bootstrap-blog-post-card-grid',
  title: 'Bootstrap Blog Post Card Grid with Read-Time Filter',
  lastmod: '2026-09-09',
  category: 'cards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5">
  <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
    <h1 class="bsblog-title mb-0">From the blog</h1>
    <select class="form-select form-select-sm" style="width:auto" id="bsblogSort">
      <option value="newest">Newest first</option>
      <option value="quickest">Quickest read</option>
    </select>
  </div>
  <div class="row g-4" id="bsblogGrid">
    <div class="col-md-4" data-date="2026-09-01" data-mins="8">
      <div class="card h-100"><div class="bsblog-cover" style="--h:230"></div><div class="card-body">
        <span class="badge bg-primary-subtle text-primary-emphasis mb-2">Engineering</span>
        <h5 class="card-title">Scaling our API to 10x traffic</h5>
        <p class="text-muted small">Sep 1 · 8 min read</p>
      </div></div>
    </div>
    <div class="col-md-4" data-date="2026-08-20" data-mins="3">
      <div class="card h-100"><div class="bsblog-cover" style="--h:20"></div><div class="card-body">
        <span class="badge bg-success-subtle text-success-emphasis mb-2">Product</span>
        <h5 class="card-title">Introducing dark mode</h5>
        <p class="text-muted small">Aug 20 · 3 min read</p>
      </div></div>
    </div>
    <div class="col-md-4" data-date="2026-08-28" data-mins="5">
      <div class="card h-100"><div class="bsblog-cover" style="--h:150"></div><div class="card-body">
        <span class="badge bg-warning-subtle text-warning-emphasis mb-2">Design</span>
        <h5 class="card-title">Redesigning our onboarding flow</h5>
        <p class="text-muted small">Aug 28 · 5 min read</p>
      </div></div>
    </div>
  </div>
</div>`,
  css: `.bsblog-title { font-weight: 800; letter-spacing: -0.01em; }
.bsblog-cover { height: 140px; border-radius: 8px 8px 0 0; background: linear-gradient(135deg, hsl(calc(var(--h)) 60% 85%), hsl(calc(var(--h) + 50) 60% 70%)); }`,
  js: `const grid = document.getElementById('bsblogGrid');
const sort = document.getElementById('bsblogSort');

function applySort() {
  const cols = Array.from(grid.children);
  const key = sort.value;
  cols.sort((a, b) => key === 'newest'
    ? new Date(b.dataset.date) - new Date(a.dataset.date)
    : Number(a.dataset.mins) - Number(b.dataset.mins)
  );
  cols.forEach(col => grid.appendChild(col));
}

sort.addEventListener('change', applySort);`,

  seo: {
    title: 'Bootstrap Blog Post Card Grid with Read-Time Sort — Free Snippet',
    description: 'A real Bootstrap 5.3 blog card grid that actually re-sorts — by newest or by quickest read time — reordering the real DOM elements, not just a display trick.',
    about: {
      title: 'Bootstrap Blog Post Card Grid with Read-Time Sort — HTML, CSS & JavaScript',
      description: `Each card in this grid carries its real metadata as data attributes — \`data-date\` and \`data-mins\` — so the sort dropdown can genuinely reorder them: \`Array.from(grid.children)\` reads every card, \`.sort()\` compares dates or read-time minutes depending on the selected option, and \`grid.appendChild(col)\` in the new order physically **moves** each card to its sorted position, since re-appending an element already in the DOM relocates it rather than duplicating it.\n\nBuilt on **real Bootstrap 5.3** cards and grid, with Bootstrap 5.3's newer "subtle" badge variants for the category tags — soft enough not to compete visually with the headline, which is exactly what a category label on a card should do.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads three post cards in their authored order.' },
        { title: 'Select "Newest first"', text: 'The cards reorder so the Sep 1 post leads, followed by Aug 28, then Aug 20.' },
        { title: 'Select "Quickest read"', text: 'The cards reorder again — the 3-minute post leads, then 5-minute, then 8-minute.' },
        { title: 'Add a fourth post', text: 'Copy a column block with its own data-date and data-mins — it participates in both sort orders automatically.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 card grid, loaded from the actual CDN',
      'Genuine DOM reordering on sort — appendChild moves real elements, not a CSS-order illusion',
      'Sorts by real per-card metadata (date, read-time minutes) stored as data attributes',
      'Bootstrap 5.3\'s "subtle" badge variants used for category tags',
      'CSS-gradient cover images, no photography required to try the snippet',
      'Scales to any number of posts with no changes to the sort logic',
    ],
    useCases: [
      { icon: 'CODE',  title: 'Blog index and article listing pages', desc: 'Letting readers sort by newest or by how much time they have is a small but genuinely useful piece of content-discovery UX.' },
      { icon: 'LEARN', title: 'Learning real DOM reordering vs. CSS order', desc: 'A clear example of appendChild repositioning existing elements, the correct approach when sort needs to affect actual tab/reading order too.' },
      { icon: 'FLOW',  title: 'Documentation and changelog listings', desc: 'Reuse the same pattern to sort docs pages by recency or changelog entries by category.' },
      { icon: 'DESIGN', title: 'Content hubs with multiple content types', desc: 'Extend the data attributes to sort by content type, popularity, or any other metadata a card carries.' },
    ],
    faqs: [
      { q: 'Does the sort actually reorder the cards, or just visually rearrange them?', a: 'It genuinely reorders the underlying DOM elements — grid.appendChild(col) on an element already in the DOM moves it to the new position rather than creating a duplicate, so the real element order (and therefore tab order for keyboard users) changes too.' },
      { q: 'How does "quickest read" sorting work?', a: 'Each card\'s data-mins attribute holds its read-time in minutes; the sort compares those numbers directly rather than parsing the visible "X min read" text.' },
      { q: 'Can I add a third sort option, like alphabetical by title?', a: 'Yes — add a new <option> to the select, and a new comparator branch in applySort() reading each card\'s title text (e.g. via querySelector(\'.card-title\').textContent) for the comparison.' },
      { q: 'Do the cover images require real photos?', a: 'No — each is a CSS gradient keyed off a --h hue variable, so the grid works immediately with no images. Swap in real cover photography by changing .bsblog-cover\'s background.' },
      { q: 'Is the "subtle" badge style specific to Bootstrap 5.3?', a: 'Yes — bg-success-subtle and its -emphasis text counterpart are newer Bootstrap 5.3 utility variants specifically designed for lower-contrast label use, versus the older solid bg-success style.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add a category filter dropdown that combines with the existing sort, or to persist the selected sort order to localStorage so it's remembered on the next visit. It's also a good exercise to ask the assistant to load post data from a JSON file or API and render the cards dynamically instead of hardcoded HTML.`,
      prompt: `Build a Bootstrap 5.3 blog post card grid with a working sort dropdown, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A responsive grid of at least three blog post cards using Bootstrap's real card and grid classes, each with a CSS-gradient cover, a category badge (using Bootstrap 5.3's subtle badge variant), a title, and a date/read-time line — each card carrying its real publish date and read-time-in-minutes as data attributes.
- A select dropdown with at least two options: "Newest first" and "Quickest read". Changing the selection must genuinely reorder the actual card elements in the DOM (using appendChild to reposition existing nodes, not a CSS order trick or re-rendering), sorted by the corresponding data attribute.
- The sort logic must scale to any number of cards added to the grid, without hardcoding which cards exist.`,
    },
  },
};

export default bootstrapBlogPostCardGrid;
