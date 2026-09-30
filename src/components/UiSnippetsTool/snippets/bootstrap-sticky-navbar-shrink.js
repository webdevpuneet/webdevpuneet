const bootstrapStickyNavbarShrink = {
  id: 'bootstrap-sticky-navbar-shrink',
  title: 'Bootstrap Sticky Navbar with Scroll Shrink',
  lastmod: '2026-09-09',
  category: 'navigation',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<nav class="navbar navbar-expand-lg bsshrink-bar fixed-top" id="bsshrinkNav">
  <div class="container">
    <a class="navbar-brand fw-bold" href="javascript:void(0)"><span class="bsshrink-dot"></span>Northwind</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#bsshrinkCollapse">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="bsshrinkCollapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="javascript:void(0)">Product</a></li>
        <li class="nav-item"><a class="nav-link" href="javascript:void(0)">Pricing</a></li>
        <li class="nav-item"><a class="nav-link" href="javascript:void(0)">Docs</a></li>
        <li class="nav-item ms-lg-2"><button class="btn btn-primary btn-sm">Sign up</button></li>
      </ul>
    </div>
  </div>
</nav>

<main class="bsshrink-stage" id="bsshrinkStage">
  <div class="bsshrink-spacer"></div>
  <p class="bsshrink-hint">Scroll down inside this preview — the navbar shrinks its padding and adds a shadow past 40px of scroll, then grows back when you scroll to the top.</p>
  <p class="bsshrink-hint">State: <strong id="bsshrinkState">expanded</strong></p>
  <div class="bsshrink-spacer bsshrink-tall"></div>
</main>`,
  css: `body { margin: 0; }

.bsshrink-bar {
  background: #fff;
  padding-block: 18px;
  border-bottom: 1px solid transparent;
  transition: padding .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.bsshrink-bar.bsshrink-scrolled {
  padding-block: 8px;
  box-shadow: 0 2px 14px rgba(15,23,42,.08);
  border-color: #eceef1;
}

.bsshrink-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #6366f1; margin-right: 7px; }

.bsshrink-stage { padding-top: 90px; height: 100vh; overflow-y: auto; box-sizing: border-box; background: #f6f7f9; }
.bsshrink-spacer { height: 30vh; }
.bsshrink-tall { height: 120vh; }
.bsshrink-hint { text-align: center; font-size: 13px; color: #6b7280; padding: 0 24px; }
.bsshrink-hint strong { color: #6366f1; }`,
  js: `const nav = document.getElementById('bsshrinkNav');
const stage = document.getElementById('bsshrinkStage');
const stateEl = document.getElementById('bsshrinkState');

stage.addEventListener('scroll', () => {
  const scrolled = stage.scrollTop > 40;
  nav.classList.toggle('bsshrink-scrolled', scrolled);
  stateEl.textContent = scrolled ? 'scrolled (shrunk)' : 'expanded';
});`,

  seo: {
    title: 'Bootstrap Sticky Navbar with Scroll Shrink — Free Snippet',
    description: 'A real Bootstrap 5.3 fixed navbar that shrinks its padding and gains a shadow once the page scrolls past a threshold, then expands back at the top.',
    about: {
      title: 'Bootstrap Sticky Navbar with Scroll Shrink — HTML, CSS & JavaScript',
      description: `A navbar fixed to the top of the page can start to feel oversized once a visitor has scrolled past the hero — this snippet fixes that by shrinking the navbar's own padding on scroll, using **real Bootstrap 5.3**'s \`navbar\`/\`navbar-collapse\` component underneath.\n\nA single scroll listener compares the container's \`scrollTop\` against a 40px threshold and toggles one class, \`.bsshrink-scrolled\`, which reduces the navbar's vertical padding, adds a subtle shadow, and fades in a bottom border — all through a CSS \`transition\`, so the resize itself is smooth rather than a hard snap. The threshold is intentionally low: a navbar should visually settle almost immediately once scrolling starts, not wait for a large scroll distance.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads with a tall, padded navbar at the top.' },
        { title: 'Scroll the preview', text: 'Scroll down inside the preview past about 40px — the navbar\'s padding shrinks and a shadow fades in.' },
        { title: 'Scroll back to the top', text: 'The navbar expands back to its original padding and the shadow disappears.' },
        { title: 'Adjust the threshold', text: 'Change the 40 in the JS panel\'s scrollTop comparison to control how far a visitor must scroll before it shrinks.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 navbar and navbar-collapse, loaded from the actual CDN',
      'One scroll listener toggles a single class — the CSS transition does the resizing',
      'Shrinks padding, adds a shadow, and fades in a border past a configurable scroll threshold',
      'Expands back to full size automatically when scrolled back to the top',
      'Fixed positioning keeps it pinned while the page content scrolls beneath it',
      'No layout-shift risk — only padding and box-shadow change, never height-affecting margins',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Marketing and product landing pages', desc: 'A navbar that visibly responds to scroll reads as more polished than one that stays static the whole page.' },
      { icon: 'LEARN', title: 'Learning scroll-driven class toggling', desc: 'A clean example of the single-listener, single-class-toggle pattern that drives most scroll-based UI behavior.' },
      { icon: 'CODE', title: 'Reclaiming vertical space on long pages', desc: 'A shrinking navbar gives back a few extra pixels of content space once a visitor is actively scrolling.' },
      { icon: 'FLOW', title: 'Pairing with a hero section', desc: 'Combine with the Bootstrap Hero Section snippet so the navbar shrink coincides with scrolling past the hero.' },
    ],
    faqs: [
      { q: 'Does this use real Bootstrap?', a: 'Yes — the actual bootstrap.min.css and bootstrap.bundle.min.js loaded from a CDN, using Bootstrap\'s genuine navbar and Collapse component for the mobile hamburger menu.' },
      { q: 'How is the shrink triggered?', a: 'A scroll event listener compares the scrollable container\'s scrollTop against a 40px threshold and toggles one CSS class; the padding/shadow/border changes are all handled by a CSS transition on that class.' },
      { q: 'Will this work on the real window scroll, not just this preview\'s container?', a: 'Yes — swap the listener from the preview\'s scroll container to window and read window.scrollY instead of stage.scrollTop; the class-toggling logic is identical either way.' },
      { q: 'Does shrinking cause any layout shift?', a: 'No — only padding, box-shadow, and border-color change, none of which affect the position of content below the fixed navbar, so nothing jumps.' },
      { q: 'Can I also change the logo size on scroll?', a: 'Yes — add a second rule under .bsshrink-scrolled targeting .bsshrink-dot or the brand text\'s font-size with its own transition; it will animate in sync with the padding change.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to debounce or throttle the scroll listener for very scroll-heavy pages, or to add a second threshold that hides the navbar entirely when scrolling down fast and reveals it again on scroll-up. It's also a good exercise to ask the assistant to convert the scroll listener into an IntersectionObserver watching a sentinel element instead of reading scrollTop directly.`,
      prompt: `Build a Bootstrap 5.3 fixed-top navbar that shrinks on scroll, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A real Bootstrap navbar (navbar-expand-lg, fixed-top) with a brand, nav links, and Bootstrap's own hamburger collapse for mobile.
- A single scroll event listener that compares scroll position against a configurable threshold constant and toggles one CSS class on the navbar when crossing it.
- That class must reduce the navbar's vertical padding, add a box-shadow, and fade in a bottom border, all via CSS transitions — no JavaScript animation.
- The navbar must expand back to its original state automatically when scrolled back above the threshold.`,
    },
  },
};

export default bootstrapStickyNavbarShrink;
