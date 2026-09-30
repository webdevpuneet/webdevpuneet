const bootstrapMegaMenuNavbar = {
  id: 'bootstrap-mega-menu-navbar',
  title: 'Bootstrap Mega Menu Dropdown Navbar',
  lastmod: '2026-09-09',
  category: 'navigation',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<nav class="navbar navbar-expand-lg bsmega-bar">
  <div class="container">
    <a class="navbar-brand fw-bold" href="javascript:void(0)">Northwind</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#bsmegaCollapse">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="bsmegaCollapse">
      <ul class="navbar-nav">
        <li class="nav-item dropdown bsmega-dropdown">
          <a class="nav-link dropdown-toggle" href="javascript:void(0)" data-bs-toggle="dropdown">Products</a>
          <div class="dropdown-menu bsmega-panel">
            <div class="row g-4 p-3">
              <div class="col-4">
                <h6 class="bsmega-heading">Platform</h6>
                <a class="bsmega-link" href="javascript:void(0)">Analytics</a>
                <a class="bsmega-link" href="javascript:void(0)">Automation</a>
                <a class="bsmega-link" href="javascript:void(0)">Integrations</a>
              </div>
              <div class="col-4">
                <h6 class="bsmega-heading">Solutions</h6>
                <a class="bsmega-link" href="javascript:void(0)">For startups</a>
                <a class="bsmega-link" href="javascript:void(0)">For enterprise</a>
                <a class="bsmega-link" href="javascript:void(0)">For agencies</a>
              </div>
              <div class="col-4">
                <div class="bsmega-promo">
                  <strong>New: AI Insights</strong>
                  <p class="small text-muted mb-2">Automated weekly summaries of your key metrics.</p>
                  <button class="btn btn-sm btn-dark">Learn more</button>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="nav-item"><a class="nav-link" href="javascript:void(0)">Pricing</a></li>
        <li class="nav-item"><a class="nav-link" href="javascript:void(0)">Docs</a></li>
      </ul>
    </div>
  </div>
</nav>
<main class="bsmega-stage"><p class="text-muted small">Click "Products" above to open the mega menu.</p></main>`,
  css: `body { margin: 0; background: #fafafa; }
.bsmega-bar { background: #fff; border-bottom: 1px solid #eceef1; padding-block: 12px; }
.bsmega-stage { padding: 60px 24px; text-align: center; }

.bsmega-dropdown { position: static; }
.bsmega-panel {
  width: 100%;
  border: none;
  border-radius: 0 0 14px 14px;
  box-shadow: 0 20px 40px rgba(15,23,42,.1);
  margin-top: 12px;
}
@media (min-width: 992px) {
  .bsmega-panel { left: 0; right: 0; }
}

.bsmega-heading { font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: #9ca3af; margin-bottom: 10px; }
.bsmega-link { display: block; padding: 6px 0; color: #374151; text-decoration: none; font-size: 14px; }
.bsmega-link:hover { color: #6366f1; }

.bsmega-promo { background: #eef0ff; border-radius: 10px; padding: 16px; }`,
  js: `// Bootstrap's own Dropdown component opens/closes the menu; this only
// reports which top-level item is currently open, for the demo readout.
document.querySelectorAll('.bsmega-dropdown').forEach(dd => {
  dd.addEventListener('shown.bs.dropdown', () => console.log('mega menu opened'));
});`,

  seo: {
    title: 'Bootstrap Mega Menu Dropdown Navbar — Free Snippet',
    description: 'A real Bootstrap 5.3 navbar dropdown expanded into a full-width mega menu with grouped links and a promo panel, using Bootstrap\'s own Dropdown component.',
    about: {
      title: 'Bootstrap Mega Menu Dropdown Navbar — HTML, CSS & JavaScript',
      description: `A single-column dropdown runs out of room once a "Products" menu needs to list more than four or five links. This snippet keeps **Bootstrap's real Dropdown component** — \`data-bs-toggle="dropdown"\`, the genuine open/close and outside-click behavior — but replaces the default narrow \`.dropdown-menu\` with a full-width panel laid out in Bootstrap's own grid, grouping links into columns with a promotional callout alongside them.\n\nThe trick is entirely CSS: \`.bsmega-dropdown { position: static; }\` on the parent \`<li>\` removes the positioning context Bootstrap's dropdown would normally anchor to, so the absolutely-positioned \`.dropdown-menu\` panel is instead free to stretch \`left: 0; right: 0\` relative to the whole navbar — a well-known, minimal-CSS technique for turning any Bootstrap dropdown into a mega menu without touching its JavaScript at all.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads with a plain navbar.' },
        { title: 'Click "Products"', text: 'Bootstrap\'s real Dropdown component opens a full-width panel with three grouped columns of links and a promo card.' },
        { title: 'Click elsewhere to close', text: 'Click outside the panel — Bootstrap\'s own outside-click handling closes it, no custom code needed.' },
        { title: 'Add a fourth column', text: 'Copy a .col-4 block and adjust to col-3 across all four for a four-column layout.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 Dropdown component — genuine open/close and outside-click handling',
      'Full-width mega panel achieved with one CSS rule (position: static) on the parent list item',
      'Grouped link columns using Bootstrap\'s own grid, easy to extend to more columns',
      'A promo/callout panel sits alongside the link groups for cross-selling a feature',
      'No custom JavaScript needed for the open/close behavior itself',
      'Responsive — collapses into the standard mobile hamburger menu below Bootstrap\'s lg breakpoint',
    ],
    useCases: [
      { icon: 'CODE', title: 'SaaS products with many feature pages', desc: 'A mega menu is the standard pattern once a "Products" or "Solutions" nav item needs to link to more than a handful of pages.' },
      { icon: 'LEARN', title: 'Learning the position:static mega-menu trick', desc: 'A minimal, well-known technique for expanding any Bootstrap dropdown into a full-width panel without new JavaScript.' },
      { icon: 'FLOW', title: 'Marketing sites promoting a specific feature', desc: 'The promo column is a ready-made spot to spotlight a new feature or offer every time a visitor opens the menu.' },
      { icon: 'DESIGN', title: 'E-commerce category navigation', desc: 'Reuse the grouped-columns layout for a shop\'s category mega menu — swap link groups for product categories.' },
    ],
    faqs: [
      { q: 'Is this Bootstrap\'s real dropdown, or a custom-built panel?', a: 'Real Bootstrap 5.3 — it uses the actual Dropdown component via data-bs-toggle="dropdown". The only custom part is CSS that lets the panel stretch full-width instead of Bootstrap\'s default narrow menu.' },
      { q: 'How does the dropdown become full-width?', a: 'Setting position: static on the parent li removes the positioning context the dropdown menu would normally anchor to, so the absolutely-positioned panel can stretch left: 0; right: 0 relative to the whole navbar instead of just the toggle button.' },
      { q: 'What happens on mobile?', a: 'Below Bootstrap\'s lg breakpoint, the whole navbar collapses into the standard hamburger menu, and the mega menu becomes a normal nested dropdown within it — still fully functional, just not full-width.' },
      { q: 'Can I add more link columns?', a: 'Yes — copy a .col-4 block and adjust the column widths (e.g. to col-3 for four columns) using Bootstrap\'s standard grid classes.' },
      { q: 'Does clicking outside the menu close it?', a: 'Yes — that\'s Bootstrap\'s own Dropdown component behavior, working exactly as it would for any standard dropdown, with no extra code required.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add a second mega-menu dropdown for a "Resources" nav item, or to add icons next to each link for a more visual mega menu. It's also a good exercise to ask the assistant to make the promo column rotate between two or three different callouts.`,
      prompt: `Build a Bootstrap 5.3 navbar with a full-width mega menu dropdown, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A real Bootstrap navbar with a "Products" nav item using Bootstrap's actual Dropdown component (data-bs-toggle="dropdown") — do not build custom open/close JavaScript.
- Override the dropdown menu to span the full width of the navbar (not Bootstrap's default narrow menu) using only CSS, by making the parent list item position: static so the absolutely-positioned menu can stretch to the container's edges.
- Inside the mega menu, use Bootstrap's grid to lay out at least two columns of grouped links plus a promotional callout column with its own heading, description, and button.
- The whole thing must remain responsive, collapsing into Bootstrap's standard mobile hamburger menu below the lg breakpoint.`,
    },
  },
};

export default bootstrapMegaMenuNavbar;
