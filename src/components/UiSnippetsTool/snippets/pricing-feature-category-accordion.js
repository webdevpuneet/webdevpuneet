const pricingFeatureCategoryAccordion = {
  id: 'pricing-feature-category-accordion',
  title: 'Pricing Table with Collapsible Feature Categories',
  lastmod: '2026-08-30',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="fca-wrap">
  <div class="fca-head-row">
    <span class="fca-corner">Compare plans</span>
    <div class="fca-plan-heads">
      <span>Basic</span><span>Pro</span><span class="fca-highlight">Team</span>
    </div>
  </div>

  <div class="fca-table" id="fcaTable">
    <div class="fca-category" data-open="true">
      <button type="button" class="fca-cat-head">
        <span class="fca-cat-title">
          <svg class="fca-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          Core features
        </span>
        <span class="fca-cat-count">5/5 in Team</span>
      </button>
      <div class="fca-cat-body">
        <div class="fca-row"><span>Projects</span><b>3</b><b>Unlimited</b><b>Unlimited</b></div>
        <div class="fca-row"><span>Storage</span><b>2 GB</b><b>50 GB</b><b>500 GB</b></div>
        <div class="fca-row"><span>File versioning</span><b data-no></b><b data-yes></b><b data-yes></b></div>
        <div class="fca-row"><span>Custom templates</span><b data-no></b><b data-yes></b><b data-yes></b></div>
        <div class="fca-row"><span>Offline mode</span><b data-yes></b><b data-yes></b><b data-yes></b></div>
      </div>
    </div>

    <div class="fca-category" data-open="false">
      <button type="button" class="fca-cat-head">
        <span class="fca-cat-title">
          <svg class="fca-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          Collaboration
        </span>
        <span class="fca-cat-count">3/3 in Team</span>
      </button>
      <div class="fca-cat-body">
        <div class="fca-row"><span>Team members</span><b>1</b><b>5</b><b>Unlimited</b></div>
        <div class="fca-row"><span>Shared workspaces</span><b data-no></b><b data-yes></b><b data-yes></b></div>
        <div class="fca-row"><span>Live commenting</span><b data-no></b><b data-yes></b><b data-yes></b></div>
      </div>
    </div>

    <div class="fca-category" data-open="false">
      <button type="button" class="fca-cat-head">
        <span class="fca-cat-title">
          <svg class="fca-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          Security &amp; admin
        </span>
        <span class="fca-cat-count">1/4 in Team</span>
      </button>
      <div class="fca-cat-body">
        <div class="fca-row"><span>SSO / SAML</span><b data-no></b><b data-no></b><b data-yes></b></div>
        <div class="fca-row"><span>Audit logs</span><b data-no></b><b data-no></b><b data-yes></b></div>
        <div class="fca-row"><span>Role-based permissions</span><b data-no></b><b data-no></b><b data-yes></b></div>
        <div class="fca-row"><span>Two-factor auth</span><b data-yes></b><b data-yes></b><b data-yes></b></div>
      </div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f5f6fb;display:flex;justify-content:center;padding:40px 20px}

.fca-wrap{width:min(720px,96vw)}
.fca-head-row{display:grid;grid-template-columns:1fr 1fr;padding:0 4px 12px}
.fca-corner{align-self:end;font-size:12px;font-weight:700;color:#9aa0b4;text-transform:uppercase;letter-spacing:.03em}
.fca-plan-heads{display:grid;grid-template-columns:repeat(3,1fr);text-align:center}
.fca-plan-heads span{font-size:14px;font-weight:800;color:#16182a;padding-bottom:4px}
.fca-plan-heads .fca-highlight{color:#6366f1}

.fca-table{background:#fff;border:1px solid #e7e9f2;border-radius:16px;overflow:hidden}

.fca-cat-head{width:100%;display:flex;align-items:center;justify-content:space-between;padding:15px 18px;background:#fafbff;border:none;border-bottom:1px solid #eef0f6;cursor:pointer;font-family:inherit}
.fca-cat-title{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:700;color:#16182a}
.fca-chev{color:#9aa0b4;transition:transform .2s;flex-shrink:0}
.fca-category[data-open="true"] .fca-chev{transform:rotate(180deg);color:#6366f1}
.fca-cat-count{font-size:12px;font-weight:700;color:#6366f1;background:#eef0fe;padding:3px 10px;border-radius:99px}

.fca-cat-body{max-height:0;overflow:hidden;transition:max-height .3s ease}
.fca-category[data-open="true"] .fca-cat-body{max-height:600px}

.fca-row{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;align-items:center;padding:12px 18px;font-size:13.5px;border-bottom:1px solid #f4f5fa}
.fca-row:last-child{border-bottom:none}
.fca-row span{color:#3b4156;font-weight:600}
.fca-row b{text-align:center;color:#3b4156;font-weight:700;font-size:13px}

b[data-yes]::after{content:'';display:inline-block;width:16px;height:16px;border-radius:50%;background:#10b981;-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6L9 17l-5-5'/%3E%3C/svg%3E") center/11px no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6L9 17l-5-5'/%3E%3C/svg%3E") center/11px no-repeat}
b[data-no]::after{content:'\\2013';color:#c2c6d4;font-weight:700}

@media(max-width:600px){
  .fca-row,.fca-plan-heads{font-size:12px}
  .fca-cat-title{font-size:13px}
  .fca-row{padding:10px 10px}
  .fca-cat-head{padding:13px 10px}
}`,

  js: `// Each category is an independent collapsible section — clicking a header toggles
// only that section's own data-open state, so multiple categories can be expanded
// at once if the visitor wants to compare more than one area side by side.
var categories = document.querySelectorAll('.fca-category');

categories.forEach(function (category) {
  var head = category.querySelector('.fca-cat-head');
  head.addEventListener('click', function () {
    var isOpen = category.dataset.open === 'true';
    category.dataset.open = isOpen ? 'false' : 'true';
    head.setAttribute('aria-expanded', String(!isOpen));
  });

  // Wire up ARIA so the collapse state is announced correctly from the start.
  head.setAttribute('aria-expanded', category.dataset.open);
});`,

  seo: {
    title: 'Pricing Table with Collapsible Feature Categories — Free HTML CSS JS Snippet',
    description: 'A pricing comparison table where rows are grouped into collapsible categories (Core, Collaboration, Security) with a per-category included-count badge, instead of one long flat list. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Pricing Comparison Table Grouped by Feature Category — Collapsible Sections, Not a Flat List',
      description: `A pricing table with thirty rows in one flat list is exhausting to scan — a buyer who only cares about security features has to wade past storage limits and template settings to find them. This snippet groups every row into named categories (Core features, Collaboration, Security & admin), each collapsed to a single clickable header by default except the first, so the table reads as a short, scannable summary until a visitor opens the category they actually care about.

**Independent open/closed state per category, not an accordion**

Each \`.fca-category\` tracks its own \`data-open\` attribute, and clicking its header only ever toggles that one category — there's no "close all others" logic like a single-open accordion. A buyer evaluating both Collaboration and Security limits can have both sections open simultaneously to compare them side by side, which a strict single-open accordion would prevent.

**A count badge that previews what's inside without opening it**

Each category header shows a badge like "1/4 in Team" — how many of that category's features the highlighted plan actually includes — right in the collapsed header. This means a visitor doesn't have to open Security & admin just to get a rough sense of how security-featured the Team plan is; the badge gives that away before a single click, and the full row-by-row breakdown is only a click away for anyone who wants it.

**max-height accordion animation, one detail at a time**

Collapsing and expanding a \`.fca-cat-body\` uses the same \`max-height: 0\` to fixed-value CSS transition used by a standard [accordion FAQ](/ui-snippets/accordion-faq/) — set high enough (600px) to never clip the tallest category's content, with \`overflow: hidden\` doing the actual clipping while collapsed. The chevron icon rotates 180 degrees in sync via the same \`data-open\` attribute selector, so the open/closed visual state, the row content, and the chevron direction can never disagree with each other.

**Feature cells stay a consistent yes/no/value pattern**

Inside each category, rows use either a plain text value (seat counts, storage limits) or the same \`data-yes\`/\`data-no\` CSS-masked checkmark pattern as a plain [feature table](/ui-snippets/pricing-feature-table/) — grouping by category changes how rows are organized, not how any individual row is rendered, so it's a drop-in structural upgrade over a flat table rather than a different visual language.

**Accessible from the start**

Each category header is a real \`<button>\` with \`aria-expanded\` set on load to match its initial \`data-open\` value and kept in sync on every toggle, so a screen reader announces the correct collapsed/expanded state immediately rather than only after the first interaction.

**Customizing it**

Add a new category by copying a \`.fca-category\` block with its own header text, count badge, and \`.fca-row\` children — the toggle logic queries all \`.fca-category\` elements generically, so no JavaScript changes are needed. Change which category starts open by editing its initial \`data-open\` attribute in the HTML.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click a category header', text: 'Core features starts open by default — click any header to expand or collapse that category.' },
        { title: 'Open more than one category', text: 'Categories toggle independently, so you can compare Collaboration and Security open at the same time.' },
        { title: 'Read the count badge', text: 'Each header shows how many of that category\'s features the highlighted plan includes, even while collapsed.' },
        { title: 'Compare plan columns', text: 'Each row shows the value or a check/dash for Basic, Pro, and Team side by side.' },
        { title: 'Add a new category', text: 'Copy a .fca-category block with its own header and .fca-row children — no JS changes needed.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Feature rows grouped into named, independently collapsible categories',
      'Each category toggles its own state — multiple categories can stay open at once',
      'Per-category count badge previews plan coverage without opening the section',
      'max-height CSS transition matches the standard accordion pattern, no JS animation',
      'Chevron rotation and open state driven by the same data-open attribute, always in sync',
      'CSS-masked yes/no checkmarks alongside plain text values in the same row format',
      'aria-expanded set correctly on load and kept in sync on every toggle',
      'Responsive — column and padding sizes shrink gracefully on narrow viewports',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Feature-dense B2B pricing pages', desc: 'Keep a long comparison table scannable by letting visitors open only the categories they care about, instead of scrolling a [flat feature table](/ui-snippets/pricing-feature-table/).' },
      { icon: 'FORM', title: 'Enterprise sales and procurement pages', desc: 'Let a security or compliance reviewer jump straight to the Security & admin category without reading through unrelated rows.' },
      { icon: 'LEARN', title: 'Learn independent multi-open accordion state', desc: 'Study how each category tracks its own data-open attribute instead of a single shared open index.' },
      { icon: 'DESIGN', title: 'Platform pricing with multiple product areas', desc: 'Group rows by product module (Core, Analytics, Integrations) so each area reads like its own mini comparison.' },
      { icon: 'CODE', title: 'Self-serve pricing FAQs', desc: 'Pair with a [pricing FAQ](/ui-snippets/pricing-faq/) below the table for questions that go beyond feature availability.' },
      { icon: 'CODE', title: 'Related: Feature Table with Explainer Tooltips', desc: 'Combine with the [Feature Table with Explainer Tooltips](/ui-snippets/pricing-feature-tooltip-table/) pattern inside any category that needs jargon explained.' },
    ],
    faqs: [
      { q: 'Does opening one category close the others, like a single-open FAQ accordion?', a: 'No. Each .fca-category has its own independent data-open attribute, and clicking a header only toggles that category. Any number of categories can be open at the same time, which matters here because a buyer often wants to compare two different categories (like Collaboration and Security) side by side rather than one at a time.' },
      { q: 'What does the badge in each category header mean?', a: 'It shows how many of that category\'s features the highlighted plan (Team, in this example) actually includes out of the category\'s total row count — e.g. "1/4 in Team" for Security & admin. It gives a rough sense of coverage before a visitor even opens the section.' },
      { q: 'How is the expand/collapse animation implemented?', a: 'The same technique as a standard accordion: .fca-cat-body starts at max-height: 0 with overflow: hidden, and gains a fixed max-height (600px, larger than any category is likely to need) when its parent\'s data-open attribute is "true", animated via a CSS transition on max-height. The chevron icon rotates 180 degrees using the same data-open attribute selector so it never falls out of sync with the actual open state.' },
      { q: 'How do I add a fourth category?', a: 'Copy an entire .fca-category block — its .fca-cat-head button with a title, chevron icon, and count badge, plus a .fca-cat-body containing .fca-row children — and paste it into #fcaTable. No JavaScript changes are needed since the toggle logic queries all .fca-category elements generically on page load.' },
      { q: 'Is the accordion accessible to screen reader users?', a: 'Each category header is a real <button> element, and its aria-expanded attribute is set to match the category\'s initial data-open value when the page loads, then kept updated on every click. This means a screen reader announces the correct expanded or collapsed state immediately, not just after the first time a category is toggled.' },
      { q: 'Can I use plain text values and yes/no checkmarks in the same category?', a: 'Yes — that is the default setup. Rows like "Storage" show a plain text value per plan (e.g. "2 GB", "50 GB"), while rows like "File versioning" use the data-yes/data-no attributes to render a CSS-masked checkmark or a dash. Both row styles can appear in any category without any special handling.' },
    ],
    aiPrompt: {
      paragraph: `Instead of guessing why some categories can stay open together while others might seem to close each other in a typical accordion, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how each .fca-category's independent data-open attribute avoids the single-open-at-a-time behavior of a standard FAQ accordion, and why that matters specifically for a comparison table where a buyer might want two categories open side by side. The same assistant can help you extend it — ask it to add a "expand all / collapse all" control above the table, compute each category's count badge dynamically from the actual data-yes/data-no attributes in its rows instead of a hardcoded string, or persist which categories are open in sessionStorage so returning to the page keeps a visitor's previous state. It's also useful for a UX review: ask whether defaulting only the first category open is the right call for your specific feature set, or whether a search box that auto-expands and scrolls to the category containing a matched feature name would serve long tables better. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a pricing comparison table in plain HTML, CSS, and vanilla JavaScript where feature rows are grouped into independently collapsible categories — no accordion library.

Requirements:
- A table-like layout with plan name headers (e.g. Basic, Pro, Team) across the top, and below it several named category sections (e.g. Core features, Collaboration, Security & admin), each collapsed behind a clickable header except one category that starts expanded.
- Each category header must show a small badge summarizing how many of that category's features the top-tier plan includes (e.g. "1/4 in Team"), visible even while the category is collapsed.
- Clicking a category header toggles only that category's own open/closed state — opening or closing one category must never affect any other category's state, so multiple categories can be expanded at the same time (this must NOT behave like a single-open-at-a-time FAQ accordion).
- Each category's body contains several feature rows, and each row must support two cell types across its plan columns: a plain text value (e.g. "50 GB", "5 seats") or a supported/unsupported indicator rendered via a data attribute (not a raw checkmark character) styled as a colored checkmark or a dash.
- Implement the expand/collapse animation using the max-height CSS transition technique (max-height: 0 with overflow hidden collapsed, a fixed large max-height expanded) rather than height: auto, and rotate a chevron icon 180 degrees in sync with the open state using the same attribute the animation reads from.
- Each category header must be a real <button> element with an aria-expanded attribute that is correctly set on page load to match its initial open/closed state and updated on every toggle.
- Keep the table usable on narrow mobile viewports.`,
    },
  },
};

export default pricingFeatureCategoryAccordion;
