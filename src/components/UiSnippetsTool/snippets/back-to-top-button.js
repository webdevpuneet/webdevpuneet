const backToTopButton = {
  id: 'back-to-top-button',
  title: 'Back to Top Button',
  category: 'scroll',
  html: `<div class="page" id="page">
  <div class="hero">
    <h1>Scroll down to see the button appear</h1>
    <p>Keep scrolling — a floating button will fade in once you pass the threshold, and smooth-scroll you back to the top on click.</p>
  </div>
  <section class="block" id="s1"><h2>Section One</h2><p>Long pages benefit from a quick way back to the top instead of forcing a slow reverse scroll through everything already read.</p></section>
  <section class="block alt" id="s2"><h2>Section Two</h2><p>The button stays hidden until the user has scrolled past a threshold, so it never clutters the initial view of a short page.</p></section>
  <section class="block" id="s3"><h2>Section Three</h2><p>A smooth scroll animation on click feels more intentional than an instant jump, especially on pages with a lot of vertical distance to cover.</p></section>
  <section class="block alt" id="s4"><h2>Section Four</h2><p>Pair this with a scroll-progress indicator so returning users can tell at a glance how much of the page is left.</p></section>
  <button class="back-to-top" id="backToTop" onclick="scrollToTop()" aria-label="Back to top">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
  </button>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; margin: 0; }

.page { position: relative; }

.hero {
  padding: 80px 24px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  text-align: center;
}
.hero h1 { font-size: 24px; margin: 0 0 10px; }
.hero p { font-size: 14px; opacity: 0.9; max-width: 460px; margin: 0 auto; line-height: 1.6; }

.block { padding: 80px 24px; background: #fff; }
.block.alt { background: #f8fafc; }
.block h2 { font-size: 20px; color: #1e293b; margin: 0 0 10px; max-width: 560px; margin-inline: auto; }
.block p { font-size: 14px; color: #64748b; line-height: 1.7; max-width: 560px; margin: 0 auto; }

.back-to-top {
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: #1e293b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(12px);
  transition: opacity 0.25s ease, transform 0.25s ease, background 0.15s ease;
}
.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.back-to-top:hover { background: #6366f1; }
.back-to-top:focus-visible { outline: 2px solid #6366f1; outline-offset: 3px; }`,
  js: `const backToTop = document.getElementById('backToTop');
const SHOW_AFTER = 400;

window.addEventListener('scroll', () => {
  if (window.scrollY > SHOW_AFTER) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}`,

  seo: {
    title: 'Back to Top Button — Free HTML CSS JS Scroll-to-Top Snippet',
    description: 'A floating back-to-top button that fades in past a scroll threshold and smooth-scrolls the page back up on click. Copy-paste vanilla JS, no dependencies.',
    about: {
      title: 'Back to Top Button — HTML, CSS & JavaScript Scroll-to-Top Snippet',
      description: `On long pages — articles, product listings, changelogs — users who scroll far down need a fast way back to the header without repeatedly flicking their mouse wheel or dragging a thumb across a phone screen. A back-to-top button solves this with a single fixed-position control that appears once it's actually useful and disappears when it isn't.

This snippet implements the full pattern in **plain HTML, CSS, and vanilla JavaScript**: a circular button fixed to the bottom-right corner, hidden by default, that fades and slides into view once the page has been scrolled past a threshold, and smooth-scrolls back to the top when clicked.

**How the show/hide threshold works**

A single \`scroll\` event listener on \`window\` checks \`window.scrollY\` against a \`SHOW_AFTER\` constant (400px by default). Past that point, the \`.visible\` class is added to the button; below it, the class is removed. The class itself does the animating — \`opacity\`, \`visibility\`, and a small \`transform: translateY\` all transition over 0.25s, so the button fades and slides up into place rather than snapping in abruptly. \`visibility: hidden\` is paired with \`opacity: 0\` specifically so the invisible button can't be tabbed to or accidentally clicked while hidden.

**How the smooth scroll works**

The click handler is a single line: \`window.scrollTo({ top: 0, behavior: 'smooth' })\`. This uses the native Scroll Behavior API rather than a manual \`requestAnimationFrame\` loop or an interval that decrements \`scrollTop\` — the browser handles the easing curve itself, and it respects the user's OS-level "reduce motion" accessibility setting automatically in supporting browsers.

**Why the threshold matters**

Showing the button immediately at the top of the page is pointless — there's nowhere to scroll to. A 400px threshold roughly corresponds to "past the hero section" on most page layouts, so the button only appears once a user has actually scrolled far enough that jumping back up saves real effort. Tune \`SHOW_AFTER\` per page: a value close to one viewport height works well for most designs.

**Performance note**

The scroll listener here does very little work per tick — one comparison and a class toggle — so it doesn't need throttling for typical use. On extremely scroll-heavy pages with many other listeners, you can wrap the check in a \`requestAnimationFrame\` guard to avoid running it more than once per frame.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Back to Top Button" in the sidebar Library tab. The preview loads with a tall scrollable page and a hidden button.' },
        { title: 'Scroll down in the preview', text: 'Scroll past the hero section — the circular arrow button fades and slides in from the bottom-right corner.' },
        { title: 'Click the button', text: 'Click it to trigger a native smooth scroll back to the top of the page, then watch the button fade back out.' },
        { title: 'Adjust the threshold', text: 'In the JS panel, change the SHOW_AFTER constant to control how far a user must scroll before the button appears.' },
        { title: 'Restyle the button', text: 'In the CSS panel, update .back-to-top background, size, and position to match your site — bottom-left placement just needs left instead of right.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Fades and slides in using opacity, visibility, and transform — no JS animation loop',
      'Single scroll listener compares window.scrollY against a configurable threshold constant',
      'Native window.scrollTo({ behavior: "smooth" }) — no manual easing math required',
      'visibility: hidden paired with opacity keeps the hidden button out of the tab order',
      'Fixed bottom-right circular placement that stays clear of page content at any scroll position',
      'Focus-visible outline for keyboard users tabbing to the button',
      'Respects reduced-motion browser settings automatically via the native scroll API',
      'One configurable constant (SHOW_AFTER) controls the entire show/hide behavior',
      'Works on any page length or content type with no markup changes needed',
      'No framework, no scroll library, no build step required',
    ],
    useCases: [
      { icon: 'SCROLL', title: 'Long-form articles and blog posts', desc: 'Give readers a quick way back to the top of a long article without needing a sticky table of contents or manual scrolling.' },
      { icon: 'FLOW', title: 'Product listing and catalog pages', desc: 'Let shoppers who have scrolled through dozens of products jump back to filters and search at the top instantly.' },
      { icon: 'LEARN', title: 'Learn threshold-based visibility toggling', desc: 'Study how a single scrollY comparison combined with a CSS transition produces a clean, non-janky show/hide effect.' },
      { icon: 'DESIGN', title: 'Match your brand and icon set', desc: 'Swap the inline arrow SVG for your own icon and recolor the button to fit your site\'s design system.' },
      { icon: 'ACCESS', title: 'Improve mobile scroll ergonomics', desc: 'On touch devices where flicking back to the top repeatedly is tedious, a persistent tap target meaningfully improves navigation.' },
      { icon: 'CODE', title: 'Port to a React or Vue component', desc: 'Use the JSX export and replace the scroll listener with a useEffect hook that toggles a boolean state on scroll.' },
      { icon: 'CODE', title: 'Related: Native CSS Scroll Progress Ring', desc: 'See the [Native CSS Scroll Progress Ring](/ui-snippets/css-native-scroll-progress-ring/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the button know when to appear?', a: 'A scroll event listener on window checks window.scrollY against a SHOW_AFTER constant (400px by default). Once the user has scrolled past that point, a .visible class is added, which fades and slides the button into view via CSS transition.' },
      { q: 'How do I change how far a user must scroll before it appears?', a: 'Edit the SHOW_AFTER constant near the top of the JS panel. A larger number delays the button appearing until further down the page; a smaller number shows it sooner.' },
      { q: 'Does the smooth scroll work in all browsers?', a: 'window.scrollTo with behavior: "smooth" is supported in all current major browsers. For very old browsers without support, the scroll simply happens instantly instead of animated — it still functions correctly, just without the easing.' },
      { q: 'Can I move the button to the bottom-left instead?', a: 'Yes. In the CSS panel, replace right: 28px with left: 28px on .back-to-top. Everything else — the fade animation, the threshold logic — is unaffected by its horizontal position.' },
      { q: 'Will this button interfere with other fixed elements like a chat widget?', a: 'Only if they occupy the same corner. Move the button to a different corner, or add extra bottom/right spacing to stack it above another fixed element without overlapping.' },
      { q: 'Does the button remain reachable by keyboard?', a: 'Yes. It stays out of the tab order while hidden thanks to visibility: hidden, and once visible it is a normal focusable button with a visible focus-visible outline, so it works with keyboard-only and screen reader navigation.' },
      { q: 'Can I show a scroll-progress ring around the button instead of a plain circle?', a: 'Yes. Add an SVG circle stroke behind the arrow icon and update its stroke-dashoffset in the scroll listener proportionally to window.scrollY divided by the page\'s total scrollable height, turning the button into a scroll-progress indicator.' },
      { q: 'Why use visibility: hidden in addition to opacity: 0?', a: 'opacity: 0 alone still leaves the element clickable and focusable even though it is invisible. Pairing it with visibility: hidden removes it from the tab order and from hit-testing while hidden, then visibility: visible restores both once the .visible class is applied.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to explain precisely why pairing opacity: 0 with visibility: hidden (rather than using either alone) matters for keyboard accessibility, and why the transition applies to both properties even though visibility itself can't be smoothly interpolated. It's also a great snippet to extend with the assistant's help — ask it to add a circular SVG progress ring that fills in proportionally to how far down the page the user has scrolled, to throttle the scroll listener with requestAnimationFrame for very scroll-heavy pages, or to convert the threshold check into an IntersectionObserver watching a sentinel element instead of reading window.scrollY directly, which is often the more modern and performant approach.`,
      prompt: `Build a floating "back to top" button in plain HTML, CSS, and JavaScript — no framework, no scroll animation library.

Requirements:
- A circular button fixed to the bottom-right corner of the viewport, hidden by default via a combination of opacity: 0 and visibility: hidden so it is not focusable or clickable while hidden.
- A single scroll event listener on window that compares window.scrollY against a named, easily configurable threshold constant, and toggles a single "visible" class on the button based on that comparison — do not create or destroy the button element itself.
- The visible class must trigger a CSS transition on opacity, visibility, and a small transform: translateY so the button fades and slides up into place rather than appearing abruptly.
- Clicking the button must call the native window.scrollTo API with behavior: "smooth" to scroll back to the top — do not implement a manual requestAnimationFrame easing loop.
- Include a visible focus-visible outline on the button for keyboard users, and make sure the button is a real <button> element with an aria-label so it is announced correctly by screen readers.
- The threshold value must live in one clearly named constant near the top of the script so it can be tuned without touching the rest of the logic.`,
    },
  },
};

export default backToTopButton;
