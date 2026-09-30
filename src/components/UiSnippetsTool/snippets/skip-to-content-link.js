const skipToContentLink = {
  id: 'skip-to-content-link',
  title: 'Accessible Skip to Content Link',
  lastmod: '2026-08-08',
  category: 'navigation',
  html: `<a href="#main-content" class="skip-link">Skip to main content</a>

<header class="demo-header">
  <div class="demo-logo">Acme Co.</div>
  <nav class="demo-nav" aria-label="Primary">
    <a href="#">Home</a>
    <a href="#">Products</a>
    <a href="#">Solutions</a>
    <a href="#">Pricing</a>
    <a href="#">Resources</a>
    <a href="#">Company</a>
    <a href="#">Blog</a>
    <a href="#">Support</a>
    <a href="#">Contact</a>
  </nav>
</header>

<main id="main-content" tabindex="-1" class="demo-main">
  <p class="hint">Press <kbd>Tab</kbd> from the top of this preview (click the preview background first, then press Tab) to reveal the skip link. Activate it to jump straight here, past the nine-link nav above.</p>
  <h1>Main Content</h1>
  <p>This is the landmark that the skip link targets. Without a skip link, a keyboard or screen-reader user has to tab through every navigation item above before reaching this paragraph on every single page load.</p>
  <div class="status" id="status">Skip link not yet activated.</div>
</main>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }

/* — The skip link itself — */
/* Positioned off-screen (not display:none / visibility:hidden) so it stays
   in the accessibility tree and the natural tab order. On :focus it is
   translated back into the viewport and becomes visible. */
.skip-link {
  position: absolute;
  top: -48px;
  left: 12px;
  z-index: 1000;
  background: #1e293b;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  transition: top 0.2s ease;
}
.skip-link:focus {
  top: 12px;
  outline: 3px solid #6366f1;
  outline-offset: 2px;
}

.demo-header {
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; flex-wrap: wrap;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}
.demo-logo { font-weight: 800; font-size: 16px; color: #0f172a; }
.demo-nav { display: flex; gap: 16px; flex-wrap: wrap; }
.demo-nav a {
  font-size: 13px; font-weight: 600; color: #475569; text-decoration: none;
  padding: 6px 4px;
}
.demo-nav a:hover { color: #6366f1; }

.demo-main { max-width: 640px; margin: 0 auto; padding: 40px 24px 60px; }
.demo-main:focus { outline: none; }
.hint {
  font-size: 12.5px; color: #6366f1; background: #eef2ff;
  border: 1px solid #c7d2fe; border-radius: 8px;
  padding: 12px 14px; margin-bottom: 24px; line-height: 1.6;
}
.hint kbd {
  background: #fff; border: 1px solid #c7d2fe; border-radius: 4px;
  padding: 1px 6px; font-family: inherit; font-size: 11px; font-weight: 700;
}
.demo-main h1 { font-size: 24px; margin-bottom: 12px; color: #0f172a; }
.demo-main p { font-size: 14px; line-height: 1.7; color: #475569; margin-bottom: 16px; }

.status {
  margin-top: 20px;
  font-size: 12.5px; font-weight: 600; color: #64748b;
  background: #f1f5f9; border-radius: 8px; padding: 10px 14px;
  transition: background 0.2s, color 0.2s;
}
.status.active { background: #ecfdf5; color: #047857; }`,

  js: `const skipLink = document.querySelector('.skip-link');
const mainContent = document.getElementById('main-content');
const status = document.getElementById('status');

// When the skip link is actually activated (clicked or Enter/Space while
// focused), move keyboard focus to the main landmark. tabindex="-1" on
// #main-content lets it receive programmatic focus even though it is not
// naturally focusable.
skipLink.addEventListener('click', (e) => {
  e.preventDefault();
  mainContent.focus();
  status.textContent = 'Skip link activated — focus jumped straight to main content, bypassing the nav.';
  status.classList.add('active');
});

// Demonstrate the off-screen -> focus -> visible mechanic explicitly for
// anyone inspecting behaviour via mouse too: hovering/using devtools focus.
skipLink.addEventListener('focus', () => {
  status.textContent = 'Skip link is now focused and visible on screen (still off-screen when not focused).';
});
skipLink.addEventListener('blur', () => {
  if (!status.classList.contains('active')) {
    status.textContent = 'Skip link not yet activated.';
  }
});`,

  seo: {
    title: 'Accessible Skip to Content Link — Free HTML CSS JS Snippet',
    description: 'WCAG skip-navigation link that hides off-screen until keyboard focus reveals it, then jumps to #main-content. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Accessible Skip to Content Link — WCAG Skip-Navigation Pattern with Focus-Triggered Visibility',
      description: `A skip-to-content link is one of the oldest and most consequential patterns in web accessibility, and it is also one of the most commonly implemented incorrectly. Its job is simple: let a keyboard user or screen-reader user bypass a page's repeated navigation, header, and search widgets and jump straight to the unique content of the page, without having to tab through every menu item first. WCAG 2.2 Success Criterion 2.4.1 (Bypass Blocks) requires exactly this mechanism, and it is one of the first things an accessibility audit checks. This snippet implements the pattern correctly: a link that is invisible until it receives keyboard focus, then appears clearly at the top of the viewport with a high-contrast, unmistakable focus style.

**The bug class this snippet avoids**

The single most common mistake in skip-link implementations is hiding the link with \`display: none\` or \`visibility: hidden\`. Both properties remove an element from the accessibility tree entirely — a screen reader will never announce it, and more critically, a hidden element with \`display: none\` cannot receive focus at all, so a sighted keyboard user pressing Tab will simply skip over it as if it does not exist. The link becomes permanently unreachable rather than temporarily hidden, which defeats its entire purpose while still satisfying a naive "is there a skip link in the HTML" checklist item. This is exactly the kind of accessibility bug that passes a cursory code review and fails every real assistive-technology test.

**The correct technique: absolute positioning off-screen**

This snippet instead uses \`position: absolute\` with \`top: -48px\` to push the link above the visible viewport while keeping it fully present in the layout and, crucially, in the tab order and accessibility tree. Because the element is still rendered (just positioned outside the visible area), a screen reader announces it in document order exactly like any other link, and pressing Tab from the top of the page moves focus to it normally. The reveal happens entirely through the \`:focus\` pseudo-class: \`.skip-link:focus { top: 12px; }\` animates the link back into the viewport with a \`transition: top 0.2s ease\`, paired with a strong \`outline: 3px solid #6366f1\` so sighted keyboard users get an unmistakable visual cue that focus has landed somewhere new. The moment focus moves away — either by tabbing onward or activating the link — it slides back off-screen.

**Why the destination needs \`tabindex="-1"\`**

Activating the skip link needs to do more than change the URL hash; it needs to move actual keyboard focus to the main content landmark so the very next Tab press continues from there, not from the top of the page again. The \`<main id="main-content" tabindex="-1">\` element is not naturally focusable — only interactive elements like links, buttons, and form fields are — so \`tabindex="-1"\` is added specifically to make it a valid, though not tab-reachable, focus target. The JavaScript calls \`mainContent.focus()\` on click, which combined with the browser's native hash-jump from \`href="#main-content"\` produces the complete bypass behaviour: the viewport scrolls to the content and keyboard focus lands there simultaneously.

**Why this matters for 2026 accessibility-first design**

Accessibility-first design is no longer a compliance checkbox tacked on before launch — regulatory pressure (the European Accessibility Act, ADA Title II digital rules, WCAG 2.2 as the emerging baseline) and genuine product quality expectations have made keyboard and screen-reader usability a first-class design requirement from day one. A skip link is one of the highest-leverage accessibility investments a page can make: it costs almost nothing to build correctly, and it directly determines whether keyboard and assistive-technology users can efficiently use a site with a large navigation, or whether every single page load costs them dozens of extra keystrokes. Getting the off-screen mechanic right, rather than reaching for \`display: none\`, is the difference between a pattern that looks done and one that actually works.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click into the preview, then press Tab',
          text: 'Click anywhere on the light grey preview background first so the demo iframe has focus, then press Tab once. The "Skip to main content" link slides down from off-screen into view at the top-left with a high-contrast dark background and a visible indigo focus outline.',
        },
        {
          title: 'Activate the link to jump past the nav',
          text: 'Press Enter (or click the visible link) while it is focused. Focus moves directly to the #main-content landmark — notice the status line updates and the page does not require tabbing through the nine nav links above it to get there.',
        },
        {
          title: 'Understand the CSS mechanic',
          text: 'Inspect .skip-link in the CSS panel: it uses position: absolute; top: -48px to sit outside the viewport while remaining in the DOM and tab order. The .skip-link:focus rule sets top: 12px, animated by transition: top 0.2s ease, to bring it into view only when it actually has focus.',
        },
        {
          title: 'Place it as the very first focusable element',
          text: 'A skip link only works if it is the first tabbable element on the page — before the logo, before the nav, before any cookie banner. In the HTML panel it sits immediately as the first child, before .demo-header, which is exactly where it must go in your real layout.',
        },
        {
          title: 'Add tabindex="-1" to your real main landmark',
          text: 'In your own app, add id="main-content" tabindex="-1" to the <main> element (or the first heading inside it). Without tabindex="-1", calling mainContent.focus() in JS silently does nothing in most browsers because non-interactive elements are not programmatically focusable by default.',
        },
        {
          title: 'Export and adapt for multi-region pages',
          text: 'Click HTML or JSX to export. For pages with multiple landmarks (nav, main, footer), consider adding a second skip link ("Skip to footer") using the same off-screen/focus pattern, stacked with a slightly larger top offset so both remain reachable and visually distinct when tabbed to in sequence.',
        },
      ],
    },
    features: [
      'True off-screen technique: position: absolute; top: -48px keeps the link in the tab order and accessibility tree',
      'Never uses display: none or visibility: hidden, which would remove the link from keyboard reach entirely',
      'Focus-triggered reveal: .skip-link:focus animates top back into the viewport via CSS transition',
      'High-contrast focus style: dark background plus a 3px solid outline so sighted keyboard users see it clearly',
      'Programmatic focus jump: mainContent.focus() moves real keyboard focus, not just the URL hash',
      'tabindex="-1" on #main-content makes a non-interactive landmark a valid, non-tab-order focus target',
      'Realistic nine-link nav demonstrates the actual keystroke cost the skip link eliminates',
      'Live status line confirms exactly when the link is focused versus activated for demo clarity',
    ],
    useCases: [
      {
        icon: 'LEARN',
        title: 'Fixing a "fake" skip link that never appears on Tab',
        desc: 'Many sites ship a skip link that technically exists in the HTML but was hidden with display: none for visual tidiness, which silently makes it unreachable by keyboard. This snippet is a direct, side-by-side reference for the correct pattern — swap any display: none or visibility: hidden skip-link CSS in an existing codebase for the position: absolute plus :focus technique shown here to make the link genuinely reachable again.',
      },
      {
        icon: 'FORM',
        title: 'Baseline accessibility requirement for marketing sites and web apps',
        desc: 'WCAG 2.2 Success Criterion 2.4.1 (Bypass Blocks) requires a mechanism to skip repeated navigation on every page with more than a trivial header. Add this component as the very first element inside your root layout, right after the opening body tag, so it applies site-wide with zero per-page setup.',
      },
      {
        icon: 'APP',
        title: 'Complex dashboards and SaaS apps with deep sidebar navigation',
        desc: 'Applications with long sidebars, multi-level menus, or persistent top toolbars impose an especially high keyboard-navigation tax without a skip link — sometimes 20 or more tab stops before reaching the actual page content. Point the skip link at the primary content region of your app shell so power users and assistive-technology users can bypass the chrome and get to work immediately, similar in spirit to the [Accessible Skip to Content Link](/ui-snippets/skip-to-content-link) pattern applied to a persistent app frame.',
      },
      {
        icon: 'DESIGN',
        title: 'Multi-landmark pages needing more than one skip target',
        desc: 'Long pages with a nav, a filter sidebar, and a footer full of links benefit from multiple skip links ("Skip to main content", "Skip to filters", "Skip to footer"), each using the same off-screen/focus-reveal CSS technique but targeting a different tabindex="-1" landmark, stacked vertically so each becomes visible in turn as the user tabs through them.',
      },
      {
        icon: 'FLOW',
        title: 'Accessibility audits and automated testing pipelines',
        desc: 'Automated tools like axe-core or Lighthouse flag missing or non-functional skip links, but they cannot always verify that a link is genuinely keyboard-reachable versus merely present in markup. Use this snippet as the reference implementation when writing a manual keyboard-only test pass, or as the fix template when an audit surfaces a "bypass blocks" violation on an existing page.',
      },
      {
        icon: 'CODE',
        title: 'Teaching the difference between visually hidden and accessibility-hidden',
        desc: 'This is a canonical teaching example for the distinction between elements that are visually hidden but accessible (off-screen positioning, or the common .sr-only utility class) versus elements that are hidden from everyone including assistive technology (display: none, visibility: hidden, or the hidden attribute). Understanding this distinction correctly prevents an entire category of accessibility regressions across a codebase, not just in skip links.',
      },
    ],
    faqs: [
      {
        q: 'Why not just use display: none and toggle it with JavaScript on focus?',
        a: 'display: none removes an element from the accessibility tree and, critically, makes it impossible to focus in the first place — a keyboard user tabbing through the page would skip right over it because there is nothing there to receive focus. You cannot use JavaScript to detect a focus event that can never fire. Off-screen positioning with position: absolute keeps the link fully present and focusable at all times; only its visual location changes on :focus.',
      },
      {
        q: 'Why does the main content need tabindex="-1"?',
        a: 'Only naturally interactive elements (links, buttons, inputs, elements with a native tabindex) can receive keyboard focus by default. A <main> or <div> landmark is not interactive, so calling element.focus() on it does nothing in most browsers unless it has tabindex="-1", which makes it programmatically focusable without adding it to the natural Tab order. This lets the skip link move real focus there, so the next Tab press continues from inside the content rather than jumping back to the top of the page.',
      },
      {
        q: 'Does the skip link need to be the very first element in the page?',
        a: 'Yes — its entire value depends on being the first (or one of the first) tabbable elements a keyboard user encounters. If it appears after the logo, search box, or any other focusable element, users still have to tab past those first, which defeats the purpose. Place it immediately inside the opening body tag, before any header, nav, or cookie-consent banner markup.',
      },
      {
        q: 'Do I need a skip link if my site already has proper landmark regions (nav, main, footer)?',
        a: 'Landmark regions help screen-reader users navigate by region using rotor or landmark-jump commands, but they do nothing for sighted keyboard-only users who rely purely on the Tab key, and not every screen reader user relies on landmark navigation exclusively. A visible, focusable skip link is still required by WCAG 2.4.1 and remains the most universally supported bypass mechanism across assistive technologies and keyboard-only use.',
      },
      {
        q: 'Can I style the skip link to match my brand instead of the default dark background?',
        a: 'Yes — any colours work as long as the focused state maintains strong contrast against the page background (WCAG requires at least 3:1 contrast for the focus indicator itself and 4.5:1 for the link text against its own background). Keep the position: absolute plus top offset plus :focus reveal structure intact; only the background, text colour, border-radius, and outline colour are safe to customise.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly why position: absolute with a negative top offset keeps the link keyboard-reachable while display: none would not — it's a great way to actually internalize the accessibility-tree distinction rather than memorizing a rule. You can also ask it to extend the pattern to a second "Skip to footer" link stacked below the first, or to adapt the reveal animation to a slide-from-left instead of slide-from-top while preserving the same off-screen/focus mechanics. Another good ask: have it audit a real page of yours for elements hidden with display: none or visibility: hidden that should instead be visually-hidden-but-focusable, since that exact mistake is the most common cause of broken skip links and broken accessibility labels in production codebases. Treat this less as a copy-paste widget and more as the reference case for a pattern that recurs throughout accessible UI work.`,
      prompt: `Build a WCAG-compliant "skip to main content" link in plain HTML, CSS, and JavaScript.

Requirements:
- The link must be the first focusable element in the document, placed before any header or navigation markup.
- It must remain fully present in the DOM and in the natural tab order at all times — do not use display: none or visibility: hidden at any point, since both remove an element from the accessibility tree and make it unfocusable.
- Instead, hide it visually by positioning it off-screen (for example position: absolute with a negative top or left offset) while it is unfocused, and reveal it with a smooth CSS transition when it receives keyboard focus via the :focus pseudo-class.
- The revealed state must have a clearly visible, high-contrast focus indicator (background, text color, and outline) that meets accessible contrast ratios against the page background.
- Clicking or activating the link (Enter key while focused) must move actual keyboard focus to the main content landmark, not just scroll to it — give the landmark id="main-content" and tabindex="-1" so it becomes a valid programmatic focus target, and call element.focus() on it in JavaScript.
- Build a small demo page around it with a realistic multi-item navigation bar before the main content, so the practical benefit of skipping it is obvious.
- Add a visible status indicator in the demo that confirms when the skip link has actually been activated versus merely focused, for clarity during manual testing.`,
    },
  },
};

export default skipToContentLink;
