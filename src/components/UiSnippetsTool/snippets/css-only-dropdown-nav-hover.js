const cssOnlyDropdownNavHover = {
  id: 'css-only-dropdown-nav-hover',
  title: 'Dropdown Navbar — CSS Only Hover & Focus-Within (No JavaScript)',
  lastmod: '2026-08-26',
  category: 'navigation',
  html: `<div class="demo">
  <nav class="navbar">
    <span class="brand">Acme</span>
    <ul class="menu">
      <li class="menu-item"><a href="#" class="menu-link">Home</a></li>
      <li class="menu-item has-dropdown">
        <a href="#" class="menu-link">Products</a>
        <ul class="dropdown">
          <li><a href="#" class="dropdown-link">Analytics</a></li>
          <li><a href="#" class="dropdown-link">Automation</a></li>
          <li><a href="#" class="dropdown-link">Integrations</a></li>
          <li><a href="#" class="dropdown-link">Pricing</a></li>
        </ul>
      </li>
      <li class="menu-item has-dropdown">
        <a href="#" class="menu-link">Resources</a>
        <ul class="dropdown">
          <li><a href="#" class="dropdown-link">Documentation</a></li>
          <li><a href="#" class="dropdown-link">Blog</a></li>
          <li><a href="#" class="dropdown-link">Support</a></li>
        </ul>
      </li>
      <li class="menu-item"><a href="#" class="menu-link">Contact</a></li>
    </ul>
  </nav>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 100%; max-width: 640px; }
.navbar { display: flex; align-items: center; gap: 32px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 24px; box-shadow: 0 1px 3px rgba(15,23,42,0.06); }
.brand { font-weight: 700; font-size: 16px; color: #111827; }
.menu { list-style: none; display: flex; gap: 6px; }
.menu-item { position: relative; }
.menu-link { display: block; padding: 10px 14px; border-radius: 8px; color: #374151; text-decoration: none; font-size: 14px; font-weight: 500; transition: background 0.15s, color 0.15s; }
.menu-link:hover, .menu-link:focus-visible { background: #f1f5f9; color: #4f46e5; }

.has-dropdown > .menu-link::after { content: ''; display: inline-block; margin-left: 6px; width: 6px; height: 6px; border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor; transform: rotate(45deg) translateY(-2px); transition: transform 0.2s ease; }
.has-dropdown:hover > .menu-link::after, .has-dropdown:focus-within > .menu-link::after { transform: rotate(-135deg) translateY(1px); }

.dropdown { position: absolute; top: calc(100% + 8px); left: 0; min-width: 200px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 12px 28px rgba(15,23,42,0.12); list-style: none; padding: 8px; opacity: 0; visibility: hidden; transform: translateY(-6px); transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s; z-index: 20; }

/* Reveal on hover of the parent li, or when any child receives keyboard focus */
.has-dropdown:hover > .dropdown,
.has-dropdown:focus-within > .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-link { display: block; padding: 9px 12px; border-radius: 6px; color: #4b5563; text-decoration: none; font-size: 13.5px; transition: background 0.12s, color 0.12s; }
.dropdown-link:hover, .dropdown-link:focus-visible { background: #eef2ff; color: #4f46e5; }`,
  seo: {
    title: 'CSS Only Dropdown Navbar — Hover & Focus-Within, No JavaScript',
    description: 'A horizontal navbar with dropdown submenus revealed by pure CSS :hover and :focus-within — fully keyboard accessible with no JavaScript at all.',
    about: {
      title: 'Dropdown Navigation Menu — Pure CSS :hover and :focus-within',
      description: `Dropdown navbars are usually built with a JavaScript click/hover handler that toggles a class, but the two pseudo-classes \`:hover\` and \`:focus-within\` are enough to build the entire interaction natively, including the keyboard-accessible case that naive CSS-only attempts usually get wrong.

**The core mechanism: :hover on the parent, styling a descendant**

Each dropdown-capable item is an \`<li class="menu-item has-dropdown">\` containing both the trigger link and a nested \`<ul class="dropdown">\`. The rule \`.has-dropdown:hover > .dropdown\` says: when the mouse is over this specific \`<li>\` (not just the link inside it), reveal its direct-child dropdown. Because \`:hover\` matches for as long as the cursor is anywhere inside the element's box — including the dropdown panel itself once it appears below the trigger — moving the mouse down into the open dropdown keeps it open rather than closing it the instant the cursor leaves the link. This is the detail that trips up most hand-rolled attempts: hovering the *link* alone, rather than the containing *li*, causes the dropdown to disappear the moment the cursor moves toward it.

**Why :focus-within, not just :focus**

\`:focus\` only matches an element that is itself the focus target. \`:focus-within\` matches an element if *it or any of its descendants* currently has focus. Tabbing to the "Products" link doesn't put focus on the \`<li>\` — it puts focus on the \`<a>\` inside it — so \`.has-dropdown:focus\` would never match. \`.has-dropdown:focus-within\` does match, because the focused \`<a>\` is a descendant of the \`<li>\`. Critically, this also means that after the dropdown opens and a user presses Tab again to move focus into one of the \`.dropdown-link\` items, the \`<li>\` *still* matches \`:focus-within\`, because focus is still somewhere inside it — so the panel stays open while a keyboard user tabs through its contents, and only closes once focus moves to a sibling top-level item or leaves the navbar entirely.

**Opacity + visibility, not display**

The dropdown transitions with \`opacity\`, \`transform: translateY\`, and \`visibility\` together, rather than toggling \`display: none\`/\`block\`. \`display\` cannot be animated or transitioned by CSS at all — it's an all-or-nothing property, so a fade/slide reveal is impossible with it. \`visibility\`, on the other hand, *can* be included in a \`transition\` list; while it can't be smoothly interpolated either, listing it in the transition still lets the browser defer applying \`visibility: hidden\` until the opacity transition finishes, and the combination is what removes the dropdown from hit-testing (and screen-reader/tab focus reachability, when paired with sensible markup) once it's fully faded out, unlike \`opacity: 0\` alone which would leave an invisible-but-still-clickable panel floating over the page.

**The chevron rotation**

The small triangle after each dropdown trigger is drawn with a single \`::after\` pseudo-element: two borders (\`border-right\` and \`border-bottom\`) on an otherwise empty 6×6px box, rotated 45 degrees to form a downward-pointing chevron using \`transform: rotate(45deg)\`. On hover/focus-within it rotates to \`-135deg\`, flipping it to point upward — a single \`transform\` transition handles the animation, with no separate "up" and "down" icon assets needed.

**Where this matters beyond convenience**

Anywhere JavaScript cannot run — sanitized CMS content blocks, HTML email templates, AMP pages, markdown-rendered documentation sites that strip embedded scripts — a JS-driven dropdown navbar simply won't open. Because this version's entire interaction model lives in \`:hover\` and \`:focus-within\`, both of which are core CSS pseudo-classes the browser evaluates natively, it renders and functions identically in those environments with zero script dependency.

**Touch device caveat, addressed honestly**

Touch screens have no true hover state — most mobile browsers simulate a "hover" on first tap and then follow through as a click, which can make dropdown-only-on-hover navbars awkward on touch. This pattern is best suited to desktop/pointer navigation; for a fully touch-friendly version you'd pair it with a small media query that swaps to the checkbox-hack pattern (see the companion hamburger-menu snippet) below a touch-relevant breakpoint.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Add has-dropdown to any top-level li', text: 'Only items that should show a submenu need the has-dropdown class — it is what the :hover and :focus-within selectors key off of.' },
        { title: 'Nest a ul.dropdown as a direct child', text: 'The dropdown list must be a direct child of the has-dropdown li so the > combinator in .has-dropdown:hover > .dropdown matches it.' },
        { title: 'Populate dropdown-link items', text: 'Add as many <a class="dropdown-link"> items inside the dropdown as needed — width and spacing adapt automatically via min-width.' },
        { title: 'Test with keyboard only', text: 'Tab through the navbar without a mouse — each has-dropdown item should open its panel on focus and keep it open while tabbing through its links.' },
        { title: 'Adjust dropdown position', text: 'Change left:0 to right:0 on .dropdown for menus near the right edge of the navbar, so the panel doesn\'t overflow the viewport.' },
      ],
    },
    features: [
      '.has-dropdown:hover > .dropdown reveals the panel only while the pointer is over the full parent li, not just the trigger link',
      ':focus-within keeps the dropdown open while keyboard focus is anywhere inside it, including its own links',
      'opacity + visibility + transform combination enables a smooth fade/slide with no display:none flash',
      'Single rotating ::after chevron indicator, no separate icon assets for open/closed states',
      'Zero JavaScript — works identically inside sandboxed iframes, CMS blocks, and email HTML',
      'Dropdown positioned with position:absolute relative to its li, independent of sibling item widths',
      'Distinct :hover and :focus-visible states on both top-level and dropdown links for full interactive feedback',
      'Bounded max-width demo container sized safely for iframe preview rendering',
    ],
    useCases: [
      { icon: 'SHOP', title: 'E-commerce Category Menus', desc: 'Product category navbars with dropdown subcategories that must render inside CMS-managed header regions' },
      { icon: 'DOC', title: 'Documentation Site Headers', desc: 'Static-site-generated docs where the header partial is often rendered from Markdown/HTML with scripts stripped' },
      { icon: 'MAIL', title: 'Marketing Site Headers in AMP', desc: 'AMP pages forbid custom JavaScript entirely, making hover/focus-within dropdowns the only native option' },
      { icon: 'APP', title: 'Embedded Widget Navigation', desc: 'Navbar embedded in a sandboxed iframe without allow-scripts still opens and closes its dropdowns correctly' },
      { icon: 'FORM', title: 'Internal Admin Tool Navbars', desc: 'A dependency-free navbar for lightweight internal tools that intentionally avoid a JS framework for the shell' },
      { icon: 'CODE', title: 'Related: Drag to Reveal Side Panel', desc: 'See the [Drag to Reveal Side Panel](/ui-snippets/drag-to-reveal-panel/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this dropdown work on touch devices?', a: 'Hover-based dropdowns are inherently a pointer-device pattern; most mobile browsers simulate hover on first tap, which is usable but not ideal. For dedicated touch support, pair this with a checkbox-hack toggle pattern activated only below a touch-relevant breakpoint.' },
      { q: 'Why use :focus-within instead of just relying on :hover?', a: ':hover never matches for keyboard-only navigation since there is no pointer involved. :focus-within matches whenever focus lands on the trigger link or any link inside the dropdown, which is what makes the menu keyboard-operable at all.' },
      { q: 'Can I nest a second level of dropdown inside this one?', a: 'Yes — nest another li.has-dropdown with its own ul.dropdown inside a dropdown-link\'s li, and add a corresponding .has-dropdown:hover > .dropdown, .has-dropdown:focus-within > .dropdown rule scoped one level deeper with position:absolute; left:100%; top:0 so it opens sideways rather than overlapping.' },
      { q: 'Why not just toggle display:none/block?', a: 'display cannot be transitioned by CSS, so toggling it produces an instant pop with no fade or slide. This snippet uses opacity, transform, and visibility together to get a smooth animated reveal while still functionally hiding the panel from clicks and screen readers once fully closed.' },
      { q: 'How do I adapt this for a React or Vue app?', a: 'The CSS and structure are framework-agnostic — render the same nested <li>/<ul> markup as a component and the hover/focus-within behavior works unchanged, no state or event handlers required for the open/close interaction itself.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain precisely why :hover must be bound to the containing <li> rather than the <a> trigger — this is the single most common bug in hand-rolled CSS dropdowns, where the panel flickers shut as the cursor moves toward it. It's also a good prompt for extending this into a multi-level flyout submenu, or for adding a media-query-gated fallback to the checkbox-hack technique for touch devices where hover intent is unreliable.`,
      prompt: `Build a horizontal dropdown navigation bar using only HTML and CSS — no JavaScript, no onclick or onmouseover attributes, no <script> tags.

Requirements:
- A horizontal list of top-level nav items, where at least two items contain a nested submenu list as a direct child.
- The submenu must reveal using only the :hover pseudo-class applied to the containing list item (not the link), so moving the cursor from the trigger into the open submenu does not close it.
- The submenu must also reveal via the :focus-within pseudo-class on the same containing list item, so that keyboard users tabbing to the trigger link, and then tabbing further into the submenu's own links, keep the panel open throughout.
- Animate the submenu's appearance using a combination of opacity, transform, and visibility (not display:none/block, which cannot be transitioned) for a smooth fade-and-slide reveal.
- Include a small chevron indicator next to each dropdown trigger, built as a CSS pseudo-element, that visually rotates between a closed and open state using only a transform transition.
- Ensure every interactive element (top-level links and submenu links) has a distinct, visible :focus-visible style.`,
    },
  },
};

export default cssOnlyDropdownNavHover;
