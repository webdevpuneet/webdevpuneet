const bootstrapFaqPageCategories = {
  id: 'bootstrap-faq-page-categories',
  title: 'Bootstrap FAQ Page with Categories',
  lastmod: '2026-09-10',
  category: 'layouts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5" style="max-width:640px;">
  <h4 class="fw-bold text-center mb-3">Frequently Asked Questions</h4>

  <input type="text" class="form-control mb-3" id="bsfqSearch" placeholder="Search questions...">

  <div class="d-flex gap-2 flex-wrap justify-content-center mb-4" id="bsfqPills">
    <button type="button" class="btn btn-sm btn-primary bsfq-pill active" data-cat="all">All</button>
    <button type="button" class="btn btn-sm btn-outline-primary bsfq-pill" data-cat="billing">Billing</button>
    <button type="button" class="btn btn-sm btn-outline-primary bsfq-pill" data-cat="account">Account</button>
    <button type="button" class="btn btn-sm btn-outline-primary bsfq-pill" data-cat="technical">Technical</button>
  </div>

  <div class="accordion" id="bsfqAccordion">
    <div class="accordion-item bsfq-item" data-cat="billing" data-question="how do i update my billing information">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bsfqA1">How do I update my billing information?</button>
      </h2>
      <div id="bsfqA1" class="accordion-collapse collapse" data-bs-parent="#bsfqAccordion">
        <div class="accordion-body">Go to Account Settings &gt; Billing and update your card details. Changes apply to your next invoice.</div>
      </div>
    </div>
    <div class="accordion-item bsfq-item" data-cat="billing" data-question="do you offer refunds">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bsfqA2">Do you offer refunds?</button>
      </h2>
      <div id="bsfqA2" class="accordion-collapse collapse" data-bs-parent="#bsfqAccordion">
        <div class="accordion-body">Yes, within 14 days of purchase. Contact support with your order number to start a refund request.</div>
      </div>
    </div>
    <div class="accordion-item bsfq-item" data-cat="account" data-question="how do i reset my password">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bsfqA3">How do I reset my password?</button>
      </h2>
      <div id="bsfqA3" class="accordion-collapse collapse" data-bs-parent="#bsfqAccordion">
        <div class="accordion-body">Click "Forgot password" on the login screen and follow the emailed reset link, valid for one hour.</div>
      </div>
    </div>
    <div class="accordion-item bsfq-item" data-cat="account" data-question="can i change my email address">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bsfqA4">Can I change my email address?</button>
      </h2>
      <div id="bsfqA4" class="accordion-collapse collapse" data-bs-parent="#bsfqAccordion">
        <div class="accordion-body">Yes, from Account Settings &gt; Profile. You will need to verify the new address before it takes effect.</div>
      </div>
    </div>
    <div class="accordion-item bsfq-item" data-cat="technical" data-question="which browsers are supported">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bsfqA5">Which browsers are supported?</button>
      </h2>
      <div id="bsfqA5" class="accordion-collapse collapse" data-bs-parent="#bsfqAccordion">
        <div class="accordion-body">The latest two versions of Chrome, Firefox, Safari, and Edge are fully supported.</div>
      </div>
    </div>
    <div class="accordion-item bsfq-item" data-cat="technical" data-question="is there an api available">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bsfqA6">Is there an API available?</button>
      </h2>
      <div id="bsfqA6" class="accordion-collapse collapse" data-bs-parent="#bsfqAccordion">
        <div class="accordion-body">Yes, a REST API is available on paid plans. Find your API key under Account Settings &gt; Developer.</div>
      </div>
    </div>
  </div>

  <p class="text-center text-muted small mt-4 d-none" id="bsfqEmpty">No questions match your search or filter.</p>
</div>`,
  css: `.bsfq-pill.active { pointer-events: none; }
.bsfq-item.d-none { display: none; }`,
  js: `const pills = Array.from(document.querySelectorAll('.bsfq-pill'));
const items = Array.from(document.querySelectorAll('.bsfq-item'));
const searchInput = document.getElementById('bsfqSearch');
const emptyMsg = document.getElementById('bsfqEmpty');

let activeCategory = 'all';

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  items.forEach(item => {
    const matchesCategory = activeCategory === 'all' || item.dataset.cat === activeCategory;
    const matchesSearch = !query || item.dataset.question.includes(query);
    const show = matchesCategory && matchesSearch;
    item.classList.toggle('d-none', !show);
    if (show) visibleCount += 1;
  });

  emptyMsg.classList.toggle('d-none', visibleCount !== 0);
}

pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => {
      p.classList.remove('active', 'btn-primary');
      p.classList.add('btn-outline-primary');
    });
    pill.classList.add('active', 'btn-primary');
    pill.classList.remove('btn-outline-primary');
    activeCategory = pill.dataset.cat;
    applyFilters();
  });
});

searchInput.addEventListener('input', applyFilters);

applyFilters();`,

  seo: {
    title: 'Bootstrap FAQ Page with Categories — Free Snippet',
    description: `A real Bootstrap 5.3 accordion FAQ with category filter pills and a combined live text search, both filtering the same item set. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Bootstrap FAQ Page with Categories — HTML, CSS & JavaScript',
      description: `An FAQ page with both category pills and a search box has one real design decision to get right: the two filters need to combine, not compete. This snippet's \`applyFilters()\` function is the single source of truth for visibility — every \`.bsfq-item\` in the real Bootstrap \`accordion\` is checked against both \`matchesCategory\` and \`matchesSearch\` on every call, and only shown when both are true. That means selecting "Billing" and then typing "refund" narrows to billing questions containing "refund," rather than the search silently overriding the category or vice versa, which is the bug you get if search and category filtering are implemented as two independent, uncoordinated pieces of logic.\n\nEach accordion item carries its category in a \`data-cat\` attribute and a pre-lowercased copy of its question text in \`data-question\`, set once in the HTML rather than computed repeatedly in JavaScript. Search matching is a simple \`item.dataset.question.includes(query)\` against the lowercased search input value, which is intentionally a substring match rather than a fuzzy or word-boundary match — simple, predictable, and fast for a page with a handful of items, without needing a search library.\n\nThe category pills are real Bootstrap buttons that swap between \`btn-primary\` (active) and \`btn-outline-primary\` (inactive) rather than relying on a separate \`active\` utility class alone, since Bootstrap's outline and solid button variants are visually distinct colors, not just a border toggle — clicking a pill strips \`active\`/\`btn-primary\` from every pill first, then applies both to the one clicked, guaranteeing exactly one pill is ever visually active at a time. The \`active\` pill also gets \`pointer-events: none\` in CSS, a small but deliberate touch that prevents redundant re-clicks on the already-selected category from re-running the filter and pill-swap logic for no visible change.\n\nThe accordion behavior itself — expanding one answer, collapsing others — is entirely native Bootstrap: each \`.accordion-collapse\` shares \`data-bs-parent="#bsfqAccordion"\`, which is what makes opening one item automatically close any other open one, using Bootstrap's own Collapse component with zero custom JavaScript for that part. The one edge case this snippet explicitly handles is an empty result set: when a category and search combination matches zero items, every \`.bsfq-item\` ends up hidden and a dedicated \`#bsfqEmpty\` message is revealed by toggling its \`d-none\` class based on \`visibleCount === 0\`, so the page never appears to have silently broken or gone blank with no explanation.\n\nThe pills and accordion items are queried generically with \`querySelectorAll('.bsfq-pill')\` and \`querySelectorAll('.bsfq-item')\` rather than being addressed by individual IDs, which is what lets \`applyFilters()\` stay correct no matter how many categories or questions are added later — every element matching those classes is automatically included in the next filter pass without touching the JavaScript at all.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'All six FAQ items appear collapsed in the accordion, with the "All" category pill highlighted solid blue and the rest outlined.' },
        { title: 'Click the "Billing" pill', text: 'Only the two billing-related questions remain visible; the pill turns solid blue and "All" reverts to outlined.' },
        { title: 'Type "refund" in the search box', text: 'Of the two visible billing questions, only "Do you offer refunds?" remains shown — the other billing question disappears.' },
        { title: 'Clear the search box and click "All"', text: 'All six questions reappear and the "All" pill returns to its solid active state.' },
        { title: 'Search for a term that matches nothing, like "xyz"', text: 'Every accordion item hides and a message reading "No questions match your search or filter" appears in its place.' },
      ],
    },
    features: [
      'Real Bootstrap accordion with native single-open Collapse behavior via data-bs-parent',
      'Category filter pills that combine with, rather than override, the search filter',
      'Live substring search across question text on every keystroke',
      'Single applyFilters() function as the one source of truth for item visibility',
      'Solid/outline button variant swap for a clear single active-pill indicator',
      'pointer-events: none on the active pill preventing redundant re-filtering',
      'Dedicated empty-state message shown only when zero items match',
      'Pre-lowercased data-question attributes for fast, simple search matching',
    ],
    useCases: [
      { icon: 'SEARCH', title: 'Product and SaaS help centers', desc: `A self-serve FAQ section for a support or documentation site, often linked from a [mega menu navbar](/ui-snippets/bootstrap-mega-menu-navbar/) Help section.` },
      { icon: 'FORM', title: 'Pricing and billing pages', desc: `Answer common billing objections right on a pricing page, positioned near a [hero gradient CTA](/ui-snippets/bootstrap-hero-gradient-cta/) to reduce pre-purchase hesitation.` },
      { icon: 'LEARN', title: 'Learning combined multi-filter logic', desc: 'A clear pattern for combining two independent filters (category and text) against one dataset without either overriding the other.' },
      { icon: 'APP', title: 'Onboarding and setup help panels', desc: `Surface category-specific answers during app onboarding, similar to contextual help offered by a [chat widget](/ui-snippets/bootstrap-chat-widget-bubble/).` },
      { icon: 'FLOW', title: 'Internal knowledge base pages', desc: 'Organize internal team documentation by department or topic with quick category filtering and search for fast lookup.' },
    ],
    faqs: [
      { q: 'Does selecting a category reset the current search term?', a: 'No — activeCategory changes but the search input\'s value is left untouched, and applyFilters() re-evaluates both conditions together, so a search term you already typed continues to narrow results within the newly selected category.' },
      { q: 'Is the search case-sensitive?', a: 'No — both the stored data-question attribute and the live search input value are lowercased before comparison, so searching "REFUND" and "refund" produce identical results.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — store faqs as an array of objects with question, answer, and category fields plus activeCategory and searchQuery in state, derive a filtered list with .filter() on every render, and render Bootstrap\'s accordion markup from that filtered array with .map()/*ngFor*.' },
      { q: 'What happens if I search while a category filter is also active and nothing matches?', a: 'Every item is hidden and the "No questions match your search or filter" message appears, since applyFilters() counts visible items across both conditions combined and only reveals the empty-state message when that count is exactly zero.' },
      { q: 'How would I add a new category?', a: 'Add a new pill button with a data-cat value and a new accordion-item with a matching data-cat attribute — no other JavaScript changes are needed since pills and items are both queried generically by class, not hardcoded by name.' },
      { q: 'Does this work well with Tailwind CSS instead of Bootstrap?', a: 'Yes — swap the accordion, btn-primary/btn-outline-primary, and form-control classes for Tailwind utility equivalents and a small custom collapse toggle (or Tailwind\'s own accordion pattern); the filtering logic in applyFilters() is framework-agnostic and needs no changes.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to highlight the matching search term within each visible question using a <mark> tag, or to add a URL query parameter that remembers the selected category on page reload. It's also worth asking it to add a "no results — contact support" call-to-action inside the empty state.`,
      prompt: `Build a Bootstrap 5.3 FAQ page with category filtering using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A real Bootstrap accordion (using data-bs-toggle="collapse" and a shared data-bs-parent so only one answer is open at a time) with each item tagged with a data-cat category attribute.
- A row of category filter pill buttons (All plus at least three real categories) where exactly one pill is visually active (solid) at a time and clicking one filters the accordion items by category.
- A text search input above the accordion that live-filters items by question text on every keystroke, combining with the active category filter (both conditions must match, not just one overriding the other).
- A dedicated empty-state message that appears only when the combination of the active category and search term matches zero questions, and disappears again once something matches.`,
    },
  },
};

export default bootstrapFaqPageCategories;
