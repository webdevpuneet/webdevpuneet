const hideOnScrollNavbar = {
  id: 'hide-on-scroll-navbar',
  title: 'Hide on Scroll Navbar',
  category: 'navigation',
  html: `<nav class="navbar" id="navbar">
  <span class="brand">Acme Inc.</span>
  <div class="nav-links">
    <a href="#">Product</a>
    <a href="#">Pricing</a>
    <a href="#">Docs</a>
    <a href="#" class="cta">Sign up</a>
  </div>
</nav>

<div class="page-content">
  <div class="hero">
    <h1>Scroll down to test the navbar</h1>
    <p>Scroll down and the navbar slides up out of view. Scroll back up — even slightly — and it slides back in immediately.</p>
  </div>
  <section class="block"><h2>Section One</h2><p>Hiding the navbar on scroll-down gives long-form content more vertical space without removing navigation entirely.</p></section>
  <section class="block alt"><h2>Section Two</h2><p>Reversing direction — even by a few pixels — brings the bar back immediately, so it's never more than one scroll away.</p></section>
  <section class="block"><h2>Section Three</h2><p>This pattern is common on blogs, docs sites, and marketing pages where the reader spends most of their time scrolling down.</p></section>
  <section class="block alt"><h2>Section Four</h2><p>Combine it with a shrinking logo or condensed header state for an even more compact scrolled-down view.</p></section>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; margin: 0; }

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  z-index: 20;
  transform: translateY(0);
  transition: transform 0.25s ease;
}
/* Sliding the navbar up by its own height hides it completely; a matching
   0 restores it. Only this one property ever changes. */
.navbar.hidden { transform: translateY(-100%); }

.brand { font-weight: 700; font-size: 15px; color: #1e293b; }

.nav-links { display: flex; align-items: center; gap: 22px; }
.nav-links a {
  font-size: 13.5px;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
}
.nav-links a:hover { color: #1e293b; }
.nav-links a.cta {
  background: #6366f1;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
}
.nav-links a.cta:hover { background: #4f46e5; }

.page-content { padding-top: 60px; background: #f8fafc; }

.hero { padding: 70px 24px; text-align: center; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; }
.hero h1 { font-size: 24px; margin: 0 0 10px; }
.hero p { font-size: 14px; opacity: 0.9; max-width: 460px; margin: 0 auto; line-height: 1.6; }

.block { padding: 80px 24px; background: #fff; }
.block.alt { background: #f8fafc; }
.block h2 { font-size: 20px; color: #1e293b; margin: 0 0 10px; max-width: 560px; margin-inline: auto; }
.block p { font-size: 14px; color: #64748b; line-height: 1.7; max-width: 560px; margin: 0 auto; }`,
  js: `const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;
let ticking = false;

// A minimum scroll delta prevents the navbar from flickering on tiny,
// jittery scroll deltas (e.g. from a trackpad's momentum scrolling).
const MIN_SCROLL_DELTA = 8;
const REVEAL_THRESHOLD = 80;

function handleScroll() {
  const currentY = window.scrollY;
  const delta = currentY - lastScrollY;

  if (Math.abs(delta) < MIN_SCROLL_DELTA) {
    ticking = false;
    return;
  }

  if (currentY < REVEAL_THRESHOLD) {
    // Always show the navbar near the very top of the page.
    navbar.classList.remove('hidden');
  } else if (delta > 0) {
    // Scrolling down -> hide.
    navbar.classList.add('hidden');
  } else {
    // Scrolling up -> reveal immediately.
    navbar.classList.remove('hidden');
  }

  lastScrollY = currentY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    // requestAnimationFrame batches the check to once per rendered frame,
    // instead of running handleScroll on every single scroll event.
    requestAnimationFrame(handleScroll);
    ticking = true;
  }
});`,

  seo: {
    title: 'Hide on Scroll Navbar — Free HTML CSS JS Auto-Hiding Navigation Snippet',
    description: 'A sticky navbar that hides when scrolling down and reappears immediately on scrolling up, tracking direction with a throttled scroll listener.',
    about: {
      title: 'Hide on Scroll Navbar — HTML, CSS & JavaScript Auto-Hiding Nav',
      description: `A navbar that's always visible takes up permanent vertical space on every screen, which matters most on mobile where every pixel of viewport height counts. The common fix is a navbar that hides itself while a user is actively scrolling down to read content, and reappears the instant they scroll back up looking for navigation — a pattern used across countless content-heavy mobile sites and apps.

This snippet implements that exact behavior in **plain HTML, CSS, and vanilla JavaScript**.

**How the hide/show animation works**

The navbar is \`position: fixed\` at the top of the viewport. Hiding it is a single CSS class, \`.hidden\`, that applies \`transform: translateY(-100%)\` — moving the navbar up by exactly its own height, off the top of the screen. A \`transition: transform 0.25s ease\` on the base \`.navbar\` rule makes that hide/show animate smoothly rather than snapping instantly. Only one property ever changes, which keeps the animation cheap for the browser to run — transform-only animations can run on the compositor thread without triggering layout recalculation.

**How scroll direction is detected**

A single \`lastScrollY\` variable stores the scroll position from the previous check. On every scroll event, \`delta = currentY - lastScrollY\` tells you both the direction (positive means scrolling down, negative means scrolling up) and the magnitude of the most recent scroll movement.

**Why a minimum delta threshold matters**

Trackpads and some mice report many tiny scroll events per second, and reacting to every single one — even 1-2px movements — makes the navbar flicker distractingly. \`MIN_SCROLL_DELTA\` (8px here) ignores any scroll movement smaller than that threshold, and only actually evaluates direction once a scroll of meaningful size has accumulated.

**Why requestAnimationFrame wraps the handler**

The native \`scroll\` event can fire dozens of times per second. Wrapping the actual direction-check logic in \`requestAnimationFrame\`, guarded by a \`ticking\` boolean, ensures the check runs at most once per rendered frame rather than once per raw scroll event — a standard throttling technique that keeps scroll-linked JavaScript from becoming a performance bottleneck.

**The reveal threshold near the top**

Below \`REVEAL_THRESHOLD\` (80px), the navbar is always forced visible regardless of direction — this avoids the slightly odd feeling of the navbar hiding itself while the user is still very close to the top of the page, where it should always be reliably present.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Hide on Scroll Navbar" in the sidebar Library tab. The preview shows a fixed navbar above a tall scrollable page.' },
        { title: 'Scroll down', text: 'Scroll down through the page content in the preview and watch the navbar smoothly slide up out of view.' },
        { title: 'Scroll up even slightly', text: 'Scroll back up even a small amount and the navbar reappears immediately, sliding back down into place.' },
        { title: 'Adjust the sensitivity', text: 'In the JS panel, change MIN_SCROLL_DELTA to make the navbar more (lower value) or less (higher value) sensitive to small scroll movements.' },
        { title: 'Adjust the top reveal zone', text: 'In the JS panel, change REVEAL_THRESHOLD to control how close to the top of the page the navbar is always forced visible.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Single transform-only CSS class change drives the entire hide/show animation for smooth performance',
      'requestAnimationFrame throttling caps the scroll handler to once per rendered frame',
      'Minimum scroll delta threshold prevents flicker from tiny trackpad/momentum scroll events',
      'Navbar is always forced visible near the top of the page regardless of scroll direction',
      'Reappears immediately on any upward scroll — no delay, matching user intent instantly',
      'Fixed positioning keeps the navbar correctly placed regardless of page scroll position',
      'Works with any navbar content — links, logo, CTA button — with no changes to the scroll logic',
      'No external scroll or animation library — plain window scroll events and CSS transitions',
      'Lightweight: one scroll listener, one boolean flag, one CSS class toggle',
      'No framework, no build step required',
    ],
    useCases: [
      { icon: 'NAV', title: 'Content-heavy mobile sites', desc: 'Reclaim vertical viewport space while a user is reading or scrolling through content, without permanently removing navigation access.' },
      { icon: 'LEARN', title: 'Learn scroll-direction detection and throttling', desc: 'Study how comparing consecutive scroll positions plus requestAnimationFrame throttling produces a smooth, performant scroll-linked effect.' },
      { icon: 'FLOW', title: 'Prototype a mobile-first product site', desc: 'Drop this into a marketing site or blog prototype where maximizing visible content on scroll matters more than a permanently pinned navbar.' },
      { icon: 'DESIGN', title: 'Match your existing navbar design', desc: 'Keep your current navbar markup and styling — this pattern only needs the hide/show class and scroll logic layered on top of any navbar.' },
      { icon: 'ACCESS', title: 'Keep navigation reachable at all times', desc: 'Because the navbar reappears on any upward scroll, users are never more than a small scroll gesture away from full navigation access.' },
      { icon: 'CODE', title: 'Combine with a scroll-progress or shrinking navbar', desc: 'Layer this hide/show logic alongside a scroll-percentage progress bar or a navbar that shrinks in height past a certain scroll depth.' },
      { icon: 'CODE', title: 'Related: Mega Menu Panel', desc: 'See the [Mega Menu Panel](/ui-snippets/mega-menu-panel/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the navbar know which direction the user is scrolling?', a: 'The script stores the scroll position from the previous check in a lastScrollY variable and compares it to the current scrollY on each scroll event. A positive difference means the page has scrolled down since the last check; a negative difference means it scrolled up.' },
      { q: 'Why does the navbar sometimes not react to very small scroll movements?', a: 'A MIN_SCROLL_DELTA threshold (8px by default) ignores scroll changes smaller than that amount. This prevents the navbar from flickering rapidly in response to the many tiny scroll events some trackpads and mice generate during smooth or momentum scrolling.' },
      { q: 'Why is requestAnimationFrame used instead of just running the logic directly on every scroll event?', a: 'The scroll event can fire far more often than the screen actually repaints. Wrapping the direction-check logic in requestAnimationFrame, guarded by a ticking flag, ensures it runs at most once per rendered frame, keeping the scroll handler cheap and avoiding jank on long pages.' },
      { q: 'Why is the navbar always shown near the top of the page?', a: 'The REVEAL_THRESHOLD constant (80px by default) forces the navbar visible whenever the scroll position is below that value, regardless of direction — this avoids the odd feeling of the navbar hiding itself while the user is still essentially at the top of the page.' },
      { q: 'Does hiding the navbar remove it from the page or just move it visually?', a: 'It only moves it visually, using transform: translateY(-100%). The element remains in the DOM and in the accessibility tree; if you need it to also be unreachable by keyboard when hidden, add aria-hidden="true" and toggle tabindex="-1" on its links alongside the hidden class.' },
      { q: 'Can I make the navbar shrink instead of fully hiding?', a: 'Yes. Instead of translateY(-100%), define a "compact" class that reduces the navbar\'s height and font sizes, and toggle that class using the same scroll-direction logic instead of (or in addition to) the hide/show transform.' },
      { q: 'Will this conflict with anchor-link scrolling or scroll-snap sections elsewhere on the page?', a: 'It can interact with them if those features also read or set scroll position rapidly. Test the combination carefully — you may need to adjust MIN_SCROLL_DELTA or temporarily disable the hide behavior during a programmatic smooth-scroll triggered by an anchor link.' },
      { q: 'Is this accessible to keyboard users tabbing through the navbar links?', a: 'The navbar remains fully focusable at all times since only its visual transform changes, not its DOM presence — but a hidden, off-screen navbar can still receive focus, which may be confusing. For full accessibility, also toggle tabindex or aria-hidden on the navbar\'s interactive children when it is hidden.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to explain why wrapping the scroll handler in requestAnimationFrame with a ticking guard is more effective throttling than a plain setTimeout-based debounce for this specific use case, and why using only a CSS transform (rather than animating top or margin-top) keeps the hide/show animation running smoothly even on lower-powered devices. It's also worth asking the assistant to help you handle the accessibility gap where a visually hidden, translated-off-screen navbar can still receive keyboard focus — specifically how to toggle tabindex or aria-hidden on its interactive children in sync with the hidden class without breaking the existing scroll logic.`,
      prompt: `Build a sticky navbar that hides when scrolling down and reappears immediately when scrolling up, in plain HTML, CSS, and JavaScript — no scroll library.

Requirements:
- A fixed-position navbar at the top of the viewport that hides via a single CSS class using only a transform: translateY property (not top, margin, or height) so the hide/show animation is compositor-friendly, with a CSS transition providing the smooth slide.
- Track scroll direction in JavaScript by comparing the current window.scrollY against the value from the previous check, stored in a variable between scroll events.
- Wrap the actual direction-check logic in requestAnimationFrame, guarded by a boolean flag, so it runs at most once per rendered frame rather than on every raw scroll event.
- Ignore scroll movements smaller than a configurable minimum delta (a named constant) to prevent the navbar from flickering in response to tiny scroll jitter from trackpads or momentum scrolling.
- Force the navbar to always remain visible whenever the scroll position is below a second configurable threshold near the top of the page, regardless of the detected scroll direction.
- The navbar's contents (logo, links, a call-to-action button) should be ordinary markup with no special requirements imposed by the hide/show logic, so any existing navbar could adopt this behavior by adding the class-toggling script.`,
    },
  },
};

export default hideOnScrollNavbar;
