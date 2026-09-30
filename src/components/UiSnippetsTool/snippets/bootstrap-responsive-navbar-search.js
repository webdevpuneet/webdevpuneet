const bootstrapResponsiveNavbarSearch = {
  id: 'bootstrap-responsive-navbar-search',
  title: 'Bootstrap Responsive Navbar with Live Search',
  lastmod: '2026-09-09',
  category: 'navigation',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<nav class="navbar navbar-expand-lg bsnav-bar sticky-top">
  <div class="container-fluid px-3 px-lg-4">
    <a class="navbar-brand fw-bold" href="javascript:void(0)">
      <span class="bsnav-dot"></span>Northwind
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#bsnavCollapse" aria-controls="bsnavCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="bsnavCollapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 bsnav-links" id="bsnavLinks">
        <li class="nav-item"><a class="nav-link active" href="javascript:void(0)" data-label="Product">Product</a></li>
        <li class="nav-item"><a class="nav-link" href="javascript:void(0)" data-label="Pricing">Pricing</a></li>
        <li class="nav-item"><a class="nav-link" href="javascript:void(0)" data-label="Docs">Docs</a></li>
        <li class="nav-item"><a class="nav-link" href="javascript:void(0)" data-label="Changelog">Changelog</a></li>
        <li class="nav-item"><a class="nav-link" href="javascript:void(0)" data-label="Support">Support</a></li>
      </ul>
      <div class="d-flex align-items-center gap-2">
        <div class="bsnav-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="bsnavSearchInput" class="form-control form-control-sm" placeholder="Search nav links…" autocomplete="off">
        </div>
        <button class="btn btn-primary btn-sm" type="button">Sign in</button>
      </div>
    </div>
  </div>
</nav>

<main class="bsnav-stage">
  <p class="bsnav-hint">Type in the search box above — matching links stay full-opacity while the rest dim, so you can scan the nav for what's relevant. Resize the preview narrow (or the panel below 992px) to see the real Bootstrap hamburger collapse take over.</p>
  <p class="bsnav-hint" id="bsnavClickReadout">Clicked: <strong>none yet</strong></p>
</main>`,
  css: `body { background: #f6f7f9; }

.bsnav-bar {
  background: #fff;
  border-bottom: 1px solid #e3e5ea;
  padding-block: 10px;
}

.bsnav-dot {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #6366f1;
  margin-right: 7px;
}

.bsnav-links .nav-link {
  color: #4b5563;
  font-weight: 500;
  font-size: 14.5px;
  transition: opacity .15s, color .15s;
}
.bsnav-links .nav-link.active { color: #6366f1; font-weight: 700; }

/* Dimmed rather than removed on a non-match — keeps the nav's width stable
   while still making the match obvious at a glance. */
.bsnav-links .nav-item.bsnav-dim .nav-link { opacity: .3; }

.bsnav-search {
  position: relative;
  display: flex;
  align-items: center;
}
.bsnav-search svg {
  position: absolute;
  left: 10px;
  color: #9ca3af;
  pointer-events: none;
}
.bsnav-search input {
  padding-left: 30px;
  width: 190px;
}

.bsnav-stage {
  padding: 40px 24px;
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}
.bsnav-hint {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 10px;
}
.bsnav-hint strong { color: #6366f1; }`,
  js: `const searchInput = document.getElementById('bsnavSearchInput');
const navLinks = document.getElementById('bsnavLinks');
const clickReadout = document.getElementById('bsnavClickReadout');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  navLinks.querySelectorAll('.nav-item').forEach(item => {
    const label = item.querySelector('.nav-link').dataset.label.toLowerCase();
    const isMatch = !q || label.includes(q);
    item.classList.toggle('bsnav-dim', !isMatch);
  });
});

// Real click handling — not the styling this snippet is about, but proof the
// nav links are wired to something rather than being static placeholders.
navLinks.addEventListener('click', e => {
  const link = e.target.closest('.nav-link');
  if (!link) return;
  e.preventDefault();
  navLinks.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  link.classList.add('active');
  clickReadout.innerHTML = 'Clicked: <strong>' + link.dataset.label + '</strong>';
});`,

  seo: {
    title: 'Bootstrap Responsive Navbar with Live Search — Free Snippet',
    description: 'A real Bootstrap 5.3 navbar with a hamburger collapse on mobile and a live search box that dims non-matching nav links as you type. Copy-paste ready, CDN-loaded.',
    about: {
      title: 'Bootstrap Responsive Navbar with Live Search — HTML, CSS & JavaScript',
      description: `A site or app navbar has to do two things well: collapse cleanly into a hamburger menu on small screens, and stay scannable once it has more than four or five links. Bootstrap's \`navbar\` component solves the first problem out of the box. This snippet adds a solution to the second: a live search box that dims every nav link that doesn't match what's typed, so a nav with a dozen links stays easy to scan instead of forcing a visitor to read every one.

This is **real Bootstrap 5.3** — the actual \`bootstrap.min.css\` and \`bootstrap.bundle.min.js\` loaded from a CDN, using the genuine \`.navbar\`, \`.navbar-collapse\`, and \`.navbar-toggler\` classes with Bootstrap's own Collapse component wiring the hamburger button to the menu via \`data-bs-toggle\` and \`data-bs-target\` — no custom JavaScript reimplements what Bootstrap already does correctly.

**How the live search works**

Every nav link's \`<li>\` carries a \`data-label\` attribute matching its visible text. On every keystroke, \`searchInput\`'s \`input\` event handler lowercases the typed query and checks it against each link's label with a plain \`includes()\` — no fuzzy matching, no external search library. A non-matching item gets a \`.bsnav-dim\` class that drops its opacity to 0.3 rather than removing it from the DOM entirely, which is the detail that keeps the navbar's width and layout completely stable while searching — nothing reflows or jumps as you type.

**Why dim instead of hide**

Hiding non-matching links outright would shrink the nav bar's collapsed width and shift the search box and sign-in button leftward on every keystroke — a distracting, jumpy interaction. Dimming keeps every link's layout box exactly where it was; only its visibility changes. That's a small choice with an outsized effect on how "solid" the interaction feels.

**Where the real Bootstrap classes are doing the work**

The hamburger toggle button, the collapse animation, and the breakpoint at which the nav switches from expanded to collapsed are all handled entirely by Bootstrap's own \`navbar-expand-lg\` class and Collapse component — resize the preview panel below 992px to see it engage. None of that behavior is reimplemented here; the only custom JavaScript in this snippet is the search-dimming logic and a small click handler that sets the active link.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Bootstrap Responsive Navbar with Live Search" in the sidebar Library tab. The preview loads a real Bootstrap navbar with five nav links and a search box.' },
        { title: 'Try the live search', text: 'Type "doc" or "sup" into the search box — matching links stay full-opacity, everything else dims. Clear the box to bring everything back.' },
        { title: 'Shrink the preview width', text: 'Narrow the preview panel (or your browser window) below roughly 992px — the nav collapses into a hamburger button, Bootstrap\'s own Collapse component handling the open/close animation.' },
        { title: 'Click a nav link', text: 'Clicking any link marks it active (shown in accent color) and updates the "Clicked" readout below, proving the links are real, wired elements.' },
        { title: 'Adjust the brand and links', text: 'In the HTML panel, change the brand text/dot color and edit each nav-link\'s text and data-label attribute (keep them matching) to fit your own site.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file with the Bootstrap CDN links included, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 navbar, navbar-collapse and navbar-toggler classes — not a hand-styled imitation',
      'Bootstrap\'s own Collapse JS component handles the hamburger open/close, wired via data-bs-toggle',
      'Live search dims non-matching nav links via a single input event listener and includes() check',
      'Dimming (not hiding) keeps the navbar\'s layout completely stable while typing — nothing reflows',
      'Sticky positioning keeps the navbar pinned to the top of the viewport while scrolling',
      'A small click handler demonstrates the nav links are real, wired elements, not static placeholders',
      'Works at any number of nav links — the search dimming logic scales with however many are added',
      'No jQuery, no extra search library — plain vanilla JavaScript on top of Bootstrap\'s own bundle',
    ],
    useCases: [
      { icon: 'CODE', title: 'SaaS or product marketing site headers', desc: 'A clean, responsive top nav with a search box for sites where visitors are looking for a specific page — docs, pricing, changelog — among several nav items.' },
      { icon: 'LEARN', title: 'Learning Bootstrap\'s real navbar-collapse pattern', desc: 'See exactly which classes and data attributes make a working, accessible hamburger menu, rather than piecing it together from documentation alone.' },
      { icon: 'FLOW', title: 'Internal tools and admin dashboards with many nav links', desc: 'Once a navbar grows past five or six links, a live filter keeps it scannable — pair this with the Bootstrap Admin Dashboard snippet in this same category.' },
      { icon: 'DESIGN', title: 'Documentation sites with a large nav surface', desc: 'Adapt the search box to filter a long list of doc sections or API references directly in the header, instead of requiring a separate search page.' },
    ],
    faqs: [
      { q: 'Does this use real Bootstrap or a CSS imitation?', a: 'Real Bootstrap 5.3 — the actual bootstrap.min.css and bootstrap.bundle.min.js are loaded from a CDN (visible in the CDN panel), and the navbar uses Bootstrap\'s genuine classes and Collapse JS component.' },
      { q: 'How does the search filtering work?', a: 'Each nav link\'s data-label attribute is compared against the lowercased search input on every keystroke using a plain string includes() check. Non-matching links get a class that reduces their opacity, rather than being removed from the page.' },
      { q: 'Why dim non-matching links instead of hiding them?', a: 'Hiding links would shrink the navbar and shift everything to its right — the search box, the sign-in button — on every keystroke. Dimming keeps every element\'s position fixed, which reads as far more stable while typing.' },
      { q: 'At what screen width does the navbar collapse into a hamburger menu?', a: 'navbar-expand-lg collapses below the "lg" breakpoint, 992px. Use navbar-expand-md (768px) or navbar-expand-sm (576px) instead if you want the collapse to happen sooner.' },
      { q: 'Can I add a dropdown menu to one of the nav links?', a: 'Yes — wrap a nav-item in Bootstrap\'s standard .dropdown / .dropdown-toggle / .dropdown-menu markup, same as any other Bootstrap navbar. It will still participate correctly in the search-dimming logic as long as its li keeps a data-label attribute.' },
      { q: 'Does the search box work on mobile, inside the collapsed menu?', a: 'Yes — the search input sits alongside the nav links in the same collapsible region, so it is available and functions identically whether the navbar is expanded or collapsed into the hamburger menu.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to extend the live-search logic to also match against a secondary keyword list per link (so "billing" could match a link labeled "Pricing"), or to add keyboard support so pressing Enter while the search box is focused jumps to and clicks the first visible match. It's also a good snippet to ask the assistant to convert into a React component, replacing the data-label DOM reads with a links array in state and the dimming logic with a derived filtered/dimmed boolean per item.`,
      prompt: `Build a responsive Bootstrap 5.3 navbar with a live-search filter over its nav links, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A standard Bootstrap navbar-expand-lg navbar with a brand, 4-6 nav links, and Bootstrap's own navbar-toggler/navbar-collapse hamburger menu for small screens — do not write custom JavaScript to control the collapse; use Bootstrap's built-in Collapse component via data-bs-toggle and data-bs-target.
- A search input in the navbar (visible in both expanded and collapsed states) that, on every keystroke, compares its lowercased value against a data attribute on each nav link and visually dims (via reduced opacity, not display:none or removal from the DOM) every non-matching link.
- The dimming approach must not change the navbar's layout or width as the user types — no link should be removed from flow.
- A small click handler on the nav links that marks whichever link was clicked as visually active and displays which one was clicked somewhere on the page, to prove the links are functional, not static.
- Sticky positioning so the navbar stays pinned to the top of the viewport on scroll.`,
    },
  },
};

export default bootstrapResponsiveNavbarSearch;
