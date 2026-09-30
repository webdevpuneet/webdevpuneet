const bootstrapMultilevelDropdownMenu = {
  id: 'bootstrap-multilevel-dropdown-menu',
  title: 'Bootstrap Multi-Level Dropdown Menu',
  lastmod: '2026-09-10',
  category: 'navigation',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
  <div class="container">
    <a class="navbar-brand fw-bold" href="javascript:void(0)">Brandly</a>
    <div class="collapse navbar-collapse show">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="javascript:void(0)">Home</a></li>
        <li class="nav-item dropdown bsml-dropdown">
          <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="bsmlToggle" data-bs-toggle="dropdown" aria-expanded="false">Products</a>
          <ul class="dropdown-menu" aria-labelledby="bsmlToggle">
            <li><a class="dropdown-item" href="javascript:void(0)">Dashboard</a></li>
            <li class="dropdown-submenu">
              <a class="dropdown-item dropdown-toggle" href="javascript:void(0)">Components</a>
              <ul class="dropdown-menu dropdown-submenu-menu">
                <li><a class="dropdown-item" href="javascript:void(0)">Buttons</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)">Forms</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)">Modals</a></li>
              </ul>
            </li>
            <li class="dropdown-submenu">
              <a class="dropdown-item dropdown-toggle" href="javascript:void(0)">Templates</a>
              <ul class="dropdown-menu dropdown-submenu-menu">
                <li><a class="dropdown-item" href="javascript:void(0)">Landing Page</a></li>
                <li><a class="dropdown-item" href="javascript:void(0)">Admin Panel</a></li>
              </ul>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="javascript:void(0)">Pricing</a></li>
          </ul>
        </li>
        <li class="nav-item"><a class="nav-link" href="javascript:void(0)">About</a></li>
      </ul>
    </div>
  </div>
</nav>
<div class="container py-5 text-muted small">Click "Products", then hover or click "Components" or "Templates" to open the nested flyout submenu.</div>`,
  css: `.dropdown-submenu { position: relative; }
.dropdown-submenu-menu {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  margin-top: -1px;
}
.dropdown-submenu.show > .dropdown-submenu-menu { display: block; }
@media (max-width: 991.98px) {
  .dropdown-submenu-menu { left: 0; top: auto; position: static; }
}`,
  js: `const dropdown = document.querySelector('.bsml-dropdown');
const submenus = Array.from(dropdown.querySelectorAll('.dropdown-submenu'));

function closeAllSubmenus(except) {
  submenus.forEach(sub => {
    if (sub !== except) sub.classList.remove('show');
  });
}

submenus.forEach(sub => {
  const toggle = sub.querySelector(':scope > .dropdown-toggle');

  // Hovering a submenu toggle opens it and closes any sibling submenu that
  // was previously open, so only one flyout is ever visible at a time.
  sub.addEventListener('mouseenter', () => {
    closeAllSubmenus(sub);
    sub.classList.add('show');
  });

  toggle.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = sub.classList.contains('show');
    closeAllSubmenus(sub);
    sub.classList.toggle('show', !isOpen);
  });
});

// Closing the top-level Bootstrap dropdown must also reset every submenu,
// otherwise reopening "Products" later would show a stale open flyout.
dropdown.addEventListener('hidden.bs.dropdown', () => closeAllSubmenus(null));

document.addEventListener('click', e => {
  if (!dropdown.contains(e.target)) closeAllSubmenus(null);
});`,

  seo: {
    title: 'Bootstrap Multi-Level Dropdown Menu — Free JS Snippet',
    description: 'Nested flyout submenus layered on real Bootstrap dropdown-menu classes, with sibling-closing and outside-click logic. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Bootstrap Multi-Level Dropdown Menu — HTML, CSS & JavaScript',
      description: `Bootstrap 5's dropdown component intentionally has no built-in support for nested submenus, so this snippet layers a small, self-contained amount of extra CSS and JS directly on top of the real \`dropdown-menu\`/\`dropdown-item\` classes rather than reinventing the whole menu system. Each item that should open a flyout is wrapped in a \`.dropdown-submenu\` list item containing its own nested \`<ul class="dropdown-menu dropdown-submenu-menu">\`; CSS gives \`.dropdown-submenu\` \`position: relative\` and the nested menu \`position: absolute; left: 100%\`, so the flyout is anchored to the right edge of its parent item, and a single \`.dropdown-submenu.show > .dropdown-submenu-menu { display: block; }\` rule is the only thing that actually reveals it.\n\nThe JavaScript's job is entirely about managing that one \`show\` class correctly. Each submenu's toggle link listens for both \`mouseenter\` (so hovering opens the flyout, matching the desktop-menu convention users expect) and \`click\` (so touch and keyboard users can open it deliberately, with \`e.preventDefault()\` and \`e.stopPropagation()\` stopping the click from also bubbling up and toggling or closing Bootstrap's own top-level dropdown). Both handlers funnel through \`closeAllSubmenus(except)\`, which removes \`show\` from every submenu except the one being opened — this is the sibling-closing behavior called out in the requirements: without it, hovering from "Components" to "Templates" would leave both flyouts open stacked on top of each other instead of swapping cleanly.\n\nThe non-obvious edge case this snippet specifically handles is stale state when the *outer* Bootstrap dropdown closes. Bootstrap's dropdown fires its own \`hidden.bs.dropdown\` event on the \`.dropdown\` element whenever "Products" closes — by listening for that event and calling \`closeAllSubmenus(null)\`, every nested flyout is force-reset even if the user never explicitly closed it, so reopening "Products" later never shows a leftover open flyout from the previous visit. A separate document-level \`click\` listener also closes every submenu when a click lands outside the whole \`.bsml-dropdown\` element, using \`dropdown.contains(e.target)\` the same way a standard outside-click-to-close pattern works for any popover or menu.\n\nOn narrow viewports the CSS media query collapses \`.dropdown-submenu-menu\` back to \`position: static\`, so the nested items stack inline underneath their parent instead of trying to flyout sideways off-screen, which would otherwise be unusable on a small screen inside Bootstrap's collapsed navbar.\n\nThe toggle lookup inside each submenu uses \`:scope > .dropdown-toggle\` rather than a plain \`querySelector('.dropdown-toggle')\`, which matters because a submenu's own nested \`<ul>\` can itself contain further \`.dropdown-toggle\` elements once a third nesting level is added — the \`:scope >\` combinator guarantees only the immediate child toggle for that specific submenu is ever wired up, not a descendant belonging to a deeper flyout.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A Bootstrap navbar is shown with Home, Products, and About links.' },
        { title: 'Click "Products"', text: 'A real Bootstrap dropdown-menu opens showing Dashboard, Components, Templates, and Pricing.' },
        { title: 'Hover over "Components"', text: 'A nested flyout submenu opens to the right, showing Buttons, Forms, and Modals.' },
        { title: 'Move your mouse to "Templates" instead', text: 'The Components flyout closes automatically and the Templates flyout opens in its place — only one is ever open at a time.' },
        { title: 'Click a nested item like "Forms"', text: 'The whole menu structure is a normal link, ready to wire up to real navigation.' },
        { title: 'Click outside the navbar', text: 'The top-level dropdown and any open flyout both close together.' },
        { title: 'Reopen "Products"', text: 'It opens fresh with no flyout still expanded from before, confirming the reset logic works.' },
      ],
    },
    features: [
      'Built entirely on real Bootstrap dropdown-menu and dropdown-item classes, no custom menu system',
      'Nested flyout submenus open via CSS position: absolute; left: 100%, anchored to their parent item',
      'Opens on both mouseenter and click, supporting mouse, touch, and keyboard interaction',
      'Only one sibling submenu can be open at a time via closeAllSubmenus()',
      'Resets all submenus automatically when the parent Bootstrap dropdown fires hidden.bs.dropdown',
      'Closes on outside click using Node.contains() for containment checking',
      'Responsive fallback collapses submenus to static stacked position on small viewports',
      'stopPropagation() on submenu toggles prevents accidentally closing the parent dropdown',
    ],
    useCases: [
      { icon: 'NAV', title: 'Multi-category site navigation', desc: 'The classic "Products > Category > Subcategory" navbar pattern used across e-commerce and SaaS marketing sites.' },
      { icon: 'APP', title: 'Admin panel sidebars and toolbars', desc: 'Reuse the same submenu-toggle logic for nested action menus, alongside something like [User Menu Avatar Dropdown](/ui-snippets/bootstrap-user-menu-avatar-dropdown/) for account actions.' },
      { icon: 'LEARN', title: 'Learning to extend Bootstrap components', desc: 'A concrete example of adding real functionality on top of a Bootstrap component that intentionally omits it, rather than rebuilding the component from scratch.' },
      { icon: 'FLOW', title: 'Documentation and settings navigation', desc: 'Pair with [Vertical Tabs Settings](/ui-snippets/bootstrap-vertical-tabs-settings/) for nested settings categories that need a flyout of sub-pages.' },
      { icon: 'NAV', title: 'Breadcrumb-adjacent quick navigation', desc: 'Combine with [Breadcrumb Overflow Dropdown](/ui-snippets/bootstrap-breadcrumb-overflow-dropdown/) so users can jump directly into a nested section from either control.' },
    ],
    faqs: [
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep an openSubmenuId in useState (React) or a ref (Vue), set it in the mouseenter/click handlers instead of toggling classList directly, and conditionally apply the show class from that state; in Angular, do the same with a component property and *ngClass, calling the reset logic in ngOnDestroy or from Bootstrap\'s hidden.bs.dropdown event via a ViewChild reference instead of querySelector.' },
      { q: 'Does Bootstrap support nested dropdowns natively?', a: 'No — Bootstrap 5\'s dropdown JavaScript only manages a single level of dropdown-menu, so any nested flyout needs the extra positioning CSS and open/close JavaScript this snippet adds on top of Bootstrap\'s own dropdown-item and dropdown-menu classes.' },
      { q: 'Why does the submenu toggle need stopPropagation()?', a: 'Without it, a click on a submenu toggle bubbles up to Bootstrap\'s own dropdown click handling and can immediately close the parent "Products" dropdown at the same time the submenu tries to open, since Bootstrap listens for clicks on and outside its toggle to manage visibility.' },
      { q: 'What happens if I open Components then move to Templates without closing either first?', a: 'closeAllSubmenus(sub) runs on every mouseenter before the new submenu is shown, removing the show class from every other submenu, so Components closes the instant Templates opens rather than both staying visible.' },
      { q: 'Does this work with Tailwind instead of Bootstrap?', a: 'Yes — replace the dropdown-menu/dropdown-item classes with Tailwind\'s own absolute positioned panel classes and keep the same left-100% flyout positioning and JavaScript open/close logic, since none of it depends on Bootstrap-specific behavior beyond the hidden.bs.dropdown event.' },
      { q: 'Why reset submenus on hidden.bs.dropdown instead of just on outside click?', a: 'A user can also close the top-level dropdown by pressing Escape or selecting an item, both of which Bootstrap handles internally and fires hidden.bs.dropdown for — listening to that event, rather than only outside clicks, guarantees the submenus reset no matter how the parent dropdown was closed.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to add keyboard arrow-key navigation between submenu items, or to support a third nesting level by generalizing the closeAllSubmenus() logic to operate per-parent instead of across the whole top-level dropdown.`,
      prompt: `Build a Bootstrap 5.3 navbar with a multi-level dropdown menu using the real Bootstrap CDN (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A real Bootstrap navbar with a dropdown-toggle nav item using data-bs-toggle="dropdown", opening a standard dropdown-menu.
- At least two items inside that dropdown must themselves open a nested flyout submenu to the side, built as a nested dropdown-menu positioned with CSS (position: absolute, left: 100%) since Bootstrap's dropdown JS has no built-in multi-level support.
- Submenu flyouts must open on both hover (mouseenter) and click, and only one sibling submenu may be open at a time — opening one must close any other open submenu.
- Clicking a submenu toggle must not close the parent top-level dropdown (stop event propagation appropriately).
- All open submenus must reset when the parent dropdown closes (listen for Bootstrap's hidden.bs.dropdown event) and when the user clicks anywhere outside the whole menu structure.`,
    },
  },
};

export default bootstrapMultilevelDropdownMenu;
