const holyGrailLayout = {
  id: 'holy-grail-layout',
  title: 'Holy Grail Layout',
  lastmod: '2026-06-23',
  category: 'layouts',
  html: `<div class="hg">
  <header class="hg-header">
    <span class="hg-logo">◆ Acme</span>
    <button type="button" class="hg-burger" id="hgBurger" aria-label="Toggle navigation" aria-expanded="false">☰</button>
  </header>
  <div class="hg-body">
    <nav class="hg-nav" id="hgNav">
      <a href="#" class="hg-active">Dashboard</a>
      <a href="#">Projects</a>
      <a href="#">Team</a>
      <a href="#">Reports</a>
      <a href="#">Settings</a>
    </nav>
    <main class="hg-main">
      <h1>Holy Grail Layout</h1>
      <p>Header and footer span the full width. Between them, a left nav and right aside flank a fluid main column that takes the remaining space — and all three stretch to the same height.</p>
      <div class="hg-cards"><div></div><div></div><div></div><div></div></div>
    </main>
    <aside class="hg-aside">
      <h4>On this page</h4>
      <a href="#">Overview</a>
      <a href="#">Activity</a>
      <a href="#">Members</a>
    </aside>
  </div>
  <footer class="hg-footer">© 2026 Acme · Holy grail in CSS grid</footer>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;color:#0f172a}

.hg{min-height:100vh;display:grid;grid-template-rows:auto 1fr auto}
.hg-header,.hg-footer{background:#0f172a;color:#fff;padding:14px 20px;display:flex;align-items:center;justify-content:space-between}
.hg-logo{font-size:16px;font-weight:800}
.hg-footer{font-size:12.5px;color:#94a3b8;justify-content:center}
.hg-burger{display:none;background:none;border:none;color:#fff;font-size:20px;cursor:pointer}

/* The grail row: fixed nav, fluid main, fixed aside — equal height via grid. */
.hg-body{display:grid;grid-template-columns:200px 1fr 220px}
.hg-nav,.hg-aside{padding:18px 16px;display:flex;flex-direction:column;gap:4px}
.hg-nav{background:#fff;border-right:1px solid #e2e8f0}
.hg-aside{background:#f8fafc;border-left:1px solid #e2e8f0}
.hg-nav a,.hg-aside a{text-decoration:none;color:#475569;font-size:13.5px;font-weight:600;padding:9px 11px;border-radius:8px;transition:background .15s,color .15s}
.hg-nav a:hover,.hg-aside a:hover{background:#f1f5f9;color:#0f172a}
.hg-nav a.hg-active{background:#eef2ff;color:#4f46e5}
.hg-aside h4{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:#94a3b8;margin-bottom:8px}

.hg-main{padding:26px 28px}
.hg-main h1{font-size:24px;font-weight:800;margin-bottom:12px}
.hg-main p{font-size:14px;color:#475569;line-height:1.6;max-width:60ch;margin-bottom:22px}
.hg-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:14px}
.hg-cards div{height:90px;background:linear-gradient(135deg,#eef2ff,#fff);border:1px solid #e2e8f0;border-radius:12px}

/* Tablet: aside drops below main. Mobile: nav collapses behind the burger. */
@media (max-width:860px){
  .hg-body{grid-template-columns:200px 1fr}
  .hg-aside{grid-column:1 / -1;border-left:none;border-top:1px solid #e2e8f0;flex-direction:row;flex-wrap:wrap}
}
@media (max-width:560px){
  .hg-burger{display:block}
  .hg-body{grid-template-columns:1fr}
  .hg-nav{position:fixed;top:50px;left:0;bottom:0;width:200px;transform:translateX(-100%);transition:transform .25s;z-index:20;box-shadow:4px 0 24px rgba(0,0,0,.15)}
  .hg-nav.open{transform:none}
}`,

  js: `var burger = document.getElementById('hgBurger');
var nav = document.getElementById('hgNav');

burger.addEventListener('click', function () {
  var open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Close the mobile nav after choosing a link.
nav.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});`,

  seo: {
    title: 'Holy Grail Layout — CSS Grid Header Nav Aside Footer',
    description: `The classic holy-grail layout in CSS grid — full-width header/footer, fixed nav and aside, fluid main, responsive. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Holy Grail Layout — Header, Footer, Two Sidebars & a Fluid Centre in CSS Grid',
      description: `The "holy grail" layout — a full-width header and footer with three columns between them (a fixed-width left nav, a fluid main content area, and a fixed-width right aside, all equal height) — was famously hard in the float era. With CSS grid it's a handful of lines. This snippet builds the complete, responsive holy-grail layout in plain HTML and CSS, with a small bit of JavaScript only for the mobile nav toggle, and no library.

**The page as a three-row grid**

The outer container is a grid with \`grid-template-rows: auto 1fr auto\` — the header and footer size to their content while the middle row expands to fill the viewport, which is what pins the footer to the bottom on short pages (a "sticky footer" for free). \`min-height: 100vh\` ensures the layout always fills the screen. This row structure is the skeleton every app shell shares.

**The grail row in one line**

The middle row is itself a grid: \`grid-template-columns: 200px 1fr 220px\`. That single declaration is the entire trick the float era struggled with — fixed-fluid-fixed columns that the browser sizes automatically, with all three stretching to the same height because grid items fill their row by default. No clearfix, no negative margins, no source-order gymnastics: the nav, main, and aside appear in natural reading order in the HTML and the grid places them correctly.

**Responsive collapse in two steps**

The layout degrades gracefully at two breakpoints. On tablets the right aside drops below the main content by spanning the full grid width (\`grid-column: 1 / -1\`) and laying its links out in a row — keeping the nav and main side by side where there's still room. On phones the columns collapse to a single column and the nav becomes an off-canvas drawer behind a hamburger, sliding in with a transform. This two-stage approach reflows for the space available rather than forcing one mobile layout everywhere.

**Accessible, progressive mobile nav**

The hamburger is a real button with \`aria-expanded\` that toggles as the drawer opens and closes, and choosing any nav link auto-closes the drawer — the expected behaviour on mobile. Crucially, the nav is part of the normal layout on desktop and only becomes a drawer at the small breakpoint, so there's no JavaScript dependency for the layout itself: the JS does nothing but toggle a class on small screens.

**A reference app shell**

Because it's the canonical structure behind dashboards, docs sites, and admin panels, this layout is a drop-in starting shell — fill the main with your content and wire the nav to your routes. It's also the clearest possible demonstration of why CSS grid replaced the float-and-clear contortions that made this layout a "holy grail" in the first place.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A full holy-grail layout renders: header, left nav, main, right aside, and footer.` },
      { title: 'Resize the window', text: `At tablet width the aside drops below main; at phone width the nav becomes a hamburger drawer.` },
      { title: 'Open the mobile nav', text: `On a narrow screen, tap the hamburger to slide in the nav; picking a link closes it.` },
      { title: 'Fill in your content', text: `Replace the main column's placeholder content and wire the nav links to your routes.` },
      { title: 'Adjust column widths', text: `Change the 200px / 1fr / 220px grid-template-columns to fit your nav and aside.` },
      { title: 'Tune the breakpoints', text: `Edit the 860px and 560px media queries to match your design's reflow points.` },
    ] },
    features: [
      { title: 'Three-row page grid', text: `auto / 1fr / auto rows pin the footer to the bottom — a sticky footer for free.` },
      { title: 'Fixed-fluid-fixed columns', text: `One grid-template-columns line creates the nav / main / aside row, all equal height.` },
      { title: 'Natural source order', text: `Nav, main, and aside sit in reading order in the HTML — no float source-order tricks.` },
      { title: 'Two-stage responsive', text: `The aside drops below at tablet width; columns collapse and nav drawers at phone width.` },
      { title: 'Off-canvas mobile nav', text: `The nav slides in as a transform-animated drawer behind a hamburger on small screens.` },
      { title: 'Accessible toggle', text: `A real button with aria-expanded, and links auto-close the drawer.` },
      { title: 'Layout needs no JS', text: `JavaScript only toggles the mobile drawer; the grid layout is pure CSS.` },
      { title: 'Drop-in app shell', text: `The canonical structure for dashboards, docs, and admin panels.` },
    ],
    useCases: [
      { title: 'Dashboard and admin shells', text: 'Use as the frame for an admin app with a [dashboard layout](/ui-snippets/dashboard-layout/) inside, with a header and footer spanning the full width.' },
      { title: 'Docs three-column shells', text: 'Place a [sidebar nav](/ui-snippets/sidebar-nav/) for sections on the left and a [table of contents](/ui-snippets/table-of-contents/) in the right aside.' },
      { title: 'Content and article pages', text: 'Present a main article beside related links, with the columns in natural source order and no float tricks.' },
      { title: 'Web app starting points', text: 'Begin any multi-section interface from a responsive shell, with the aside dropping below at tablet width and columns collapsing on phones.' },
      { title: 'Settings areas and grid learning', text: 'Put a nav of sections beside a [settings panel](/ui-snippets/settings-panel/), or compare with a [bento grid](/ui-snippets/bento-grid/) while learning how `auto 1fr auto` rows pin the footer.' },
      { icon: 'CODE', title: 'Related: Resizable Split Pane', desc: 'See the [Resizable Split Pane](/ui-snippets/resizable-split-pane/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is this layout called the "holy grail"?', a: `For years it was the hard-to-achieve ideal: a header and footer spanning full width, with a fixed left sidebar, a fluid centre, and a fixed right sidebar between them — all equal height, with the content in natural source order for accessibility. Floats and tables could only approximate it with hacks. CSS grid makes it trivial, which is why it's the canonical "look how much grid simplified things" example.` },
      { q: 'How does the footer stick to the bottom on short pages?', a: `The page container is a grid with grid-template-rows: auto 1fr auto and min-height: 100vh. The header and footer rows size to their content (auto), while the middle row takes all remaining space (1fr). On a short page the 1fr row stretches to fill the viewport, pushing the footer to the bottom; on a long page everything grows naturally. No JavaScript or absolute positioning needed.` },
      { q: 'How do the three columns end up equal height?', a: `Grid items stretch to fill their grid area by default (align-items defaults to stretch). Because the nav, main, and aside all sit in the same grid row, they each fill that row's full height automatically — so the sidebars match the main column's height regardless of which has the most content. This was the single hardest part to achieve with floats.` },
      { q: 'Does the layout depend on JavaScript?', a: `No — the layout is pure CSS grid. JavaScript is used only to toggle the off-canvas nav drawer on phone-width screens (open/close a class and update aria-expanded). On tablet and desktop the nav is part of the grid and the JS does nothing, so the core layout works even with scripts disabled.` },
      { q: 'How do I use this layout in React, Vue, or Angular?', a: `Wrap it as a layout component with slots/children for header, nav, main, aside, and footer; in React put it in a layout component (or Next.js layout.tsx), in Vue use <slot>s, in Angular use <ng-content>. The grid CSS is framework-agnostic — only the mobile-drawer open state moves into component state with a class binding.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the grid cascade in your head. Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly how grid-template-rows: auto 1fr auto pins the footer to the bottom on short pages, or why the three body columns end up equal height without any explicit height rule on the nav or aside. The same assistant is useful for optimizing it — ask whether the two separate media query breakpoints (860px and 560px) could be consolidated or whether a container query would be more appropriate for a layout that gets reused inside variable-width parents. It's just as handy for extending the shell: ask it to add a collapsible (not just off-canvas) desktop sidebar that toggles between 200px and a slim icon-only width, persist the collapsed state in localStorage, or add a breadcrumb row between the header and main content. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build the classic "holy grail" page layout in plain HTML and CSS using CSS Grid only — no floats, no flexbox for the outer structure, minimal JavaScript.

Requirements:
- An outer page container that is a CSS grid with three rows: an auto-sized header, a flexible middle row that consumes all remaining vertical space, and an auto-sized footer, combined with a full-viewport minimum height so the footer sticks to the bottom of the viewport on short pages without any absolute positioning.
- The middle row must itself be a CSS grid with three columns: a fixed-width left navigation, a flexible fluid main content column, and a fixed-width right aside — all three elements must stretch to equal height automatically via the grid's default item stretching, with no explicit height set on any of them.
- The nav, main, and aside must appear in that natural reading order in the HTML source (no visual reordering via CSS that would break source order for assistive tech).
- At a tablet-width breakpoint, make the aside span the full grid width and drop below the main content while the nav and main remain side by side.
- At a phone-width breakpoint, collapse the grid to a single column, turn the left nav into an off-canvas drawer that is hidden via a CSS transform translateX and slides into view when an "open" class is toggled, and show a hamburger button that only appears at this breakpoint.
- The hamburger button must be a real button element with an aria-expanded attribute that JavaScript updates to true/false when toggling the drawer, and clicking any link inside the drawer must close it again.
- Ensure the desktop and tablet layouts require zero JavaScript — only the phone-width drawer toggle should depend on the script.`,
    },
  },
};

export default holyGrailLayout;
