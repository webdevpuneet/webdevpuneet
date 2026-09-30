const footerAccordionMobileCollapse = {
  id: 'footer-accordion-mobile-collapse',
  title: 'Footer with Mobile Accordion Collapse',
  lastmod: '2026-08-27',
  category: 'footers',
  html: `<div class="demo">
  <p class="hint">Shrink the preview below 560px wide to see the columns collapse into accordions</p>
  <footer class="site-footer" id="siteFooter">
    <div class="footer-col" data-col="product">
      <button class="col-toggle" aria-expanded="true">
        <span>Product</span>
        <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <ul class="col-links">
        <li><a href="#">Features</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Changelog</a></li>
        <li><a href="#">Roadmap</a></li>
      </ul>
    </div>

    <div class="footer-col" data-col="company">
      <button class="col-toggle" aria-expanded="true">
        <span>Company</span>
        <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <ul class="col-links">
        <li><a href="#">About</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Press kit</a></li>
      </ul>
    </div>

    <div class="footer-col" data-col="resources">
      <button class="col-toggle" aria-expanded="true">
        <span>Resources</span>
        <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <ul class="col-links">
        <li><a href="#">Documentation</a></li>
        <li><a href="#">API reference</a></li>
        <li><a href="#">Community</a></li>
        <li><a href="#">Support</a></li>
      </ul>
    </div>

    <div class="footer-col" data-col="legal">
      <button class="col-toggle" aria-expanded="true">
        <span>Legal</span>
        <svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <ul class="col-links">
        <li><a href="#">Privacy policy</a></li>
        <li><a href="#">Terms of service</a></li>
        <li><a href="#">Cookie policy</a></li>
      </ul>
    </div>

    <div class="footer-bottom">© 2026 Fictional Co. All rights reserved.</div>
  </footer>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; }
.demo { max-width: 640px; margin: 0 auto; resize: horizontal; overflow: auto; min-width: 260px; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 16px; }
.hint { font-size: 11.5px; color: #94a3b8; margin-bottom: 14px; }

.site-footer { background: #0f172a; border-radius: 16px; padding: 32px 28px 20px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

.col-toggle { display: none; width: 100%; align-items: center; justify-content: space-between; background: none; border: none; color: #f1f5f9; font-size: 13px; font-weight: 700; padding: 12px 0; cursor: pointer; font-family: inherit; }
.chev { transition: transform 0.2s ease; color: #64748b; flex-shrink: 0; }

.footer-col:not(:last-child) { border-bottom: none; }
.col-links { list-style: none; display: flex; flex-direction: column; gap: 10px; overflow: hidden; }
.col-links a { font-size: 12.5px; color: #94a3b8; text-decoration: none; }
.col-links a:hover { color: #f1f5f9; }

.footer-bottom { grid-column: 1 / -1; margin-top: 20px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 11px; color: #64748b; }

@media (max-width: 560px) {
  .site-footer { grid-template-columns: 1fr; gap: 0; padding: 8px 20px 16px; }
  .footer-col { border-bottom: 1px solid rgba(255,255,255,0.08); }
  .col-toggle { display: flex; }
  .col-links { max-height: 0; transition: max-height 0.25s ease; gap: 0; }
  .col-links li { padding: 5px 0; }
  .footer-col.open .col-links { max-height: 240px; padding-bottom: 14px; }
  .footer-col.open .chev { transform: rotate(180deg); }
}`,
  js: `const footer = document.getElementById('siteFooter');
const cols = footer.querySelectorAll('.footer-col');

// Only the accordion behavior needs JS — the multi-column desktop layout is pure CSS grid.
cols.forEach((col) => {
  const toggle = col.querySelector('.col-toggle');
  toggle.addEventListener('click', () => {
    const isOpen = col.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});

// Re-sync aria-expanded when the layout crosses the breakpoint, since desktop
// always shows links regardless of the "open" class.
const mq = window.matchMedia('(max-width: 560px)');
function syncState() {
  cols.forEach((col) => {
    const toggle = col.querySelector('.col-toggle');
    if (!mq.matches) {
      toggle.setAttribute('aria-expanded', 'true');
    } else {
      toggle.setAttribute('aria-expanded', String(col.classList.contains('open')));
    }
  });
}
mq.addEventListener('change', syncState);
syncState();`,
  seo: {
    title: 'Footer with Mobile Accordion Collapse — Same Markup, Grid on Desktop, Accordion on Mobile',
    description: 'A multi-column site footer that renders as a plain CSS grid on desktop and automatically becomes independently collapsible accordions per column on narrow screens, with correct aria-expanded sync across the breakpoint.',
    about: {
      title: 'Footer with Mobile Accordion Collapse — One Markup Structure, Two Behaviors',
      description: `A footer with four or five link columns is fine on desktop, but stacked vertically on a phone it can push several hundred pixels of link text between the page's actual content and anything below the footer. This snippet solves that by making each footer column an **accordion on narrow screens only**, collapsed by default so a mobile visitor sees just the column headings, while leaving the desktop layout as a plain, always-expanded CSS grid — using exactly the same HTML for both.

**CSS media query decides which behavior is even active**

The \`.col-toggle\` button is \`display: none\` by default and only becomes \`display: flex\` inside the \`@media (max-width: 560px)\` block — so above that breakpoint, the toggle buttons don't just look inactive, they're not interactive or present in the layout at all, and \`.col-links\` has no \`max-height\` restriction, showing every link permanently. Below the breakpoint, the same \`.col-links\` gets \`max-height: 0\` with \`overflow: hidden\`, and only the \`.footer-col.open\` state raises that to \`240px\` — the accordion mechanic is entirely dormant until the media query itself makes it relevant.

**Keeping aria-expanded honest across the breakpoint**

This is the detail most footer-accordion implementations get wrong: a column's \`.open\` class might be toggled while the page is narrow, but if the user then resizes the browser wider (or rotates a tablet), the links become permanently visible again via the desktop CSS grid — yet without correction, \`aria-expanded="false"\` would still be sitting on that toggle button, telling a screen reader the content is collapsed when it's now actually fully visible on screen. \`syncState()\`, driven by a \`matchMedia('(max-width: 560px)')\` listener, corrects exactly this: whenever the layout crosses the breakpoint in either direction, it forces \`aria-expanded="true"\` for every column while desktop-width (since the content is always visible there), and only defers to each column's actual \`.open\` class once back in mobile width.

**Why max-height instead of display:none for the collapse**

\`.col-links\` transitions \`max-height\` rather than toggling \`display\`, which is what makes the accordion open/close animate smoothly — \`display\` can't be transitioned at all, and \`height: auto\` isn't animatable either, so a generous fixed \`max-height\` (240px, comfortably larger than the tallest link list) is the standard workaround that still gives a smooth, real slide animation.

**One shared JS listener per column, not one per link**

Only four toggle buttons need click listeners regardless of how many links each column holds — the accordion behavior is entirely about the column-level open/closed state, so the JavaScript footprint stays constant no matter how much link content is inside.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Add or remove footer columns freely', text: 'Each .footer-col is self-contained with its own toggle button and link list — copy the block structure to add more columns.' },
        { title: 'Resize the preview to see both behaviors', text: 'Drag the dashed demo container narrower than 560px to see the desktop grid become mobile accordions.' },
        { title: 'Adjust the collapse breakpoint', text: 'Change the 560px value in the @media query (and the matching value in the JS matchMedia call) together — they must stay in sync.' },
        { title: 'Adjust the open max-height', text: 'If a column has more links than fits within 240px, increase the .footer-col.open .col-links max-height value to accommodate it.' },
        { title: 'Pre-open a column by default on mobile', text: 'Add the .open class to any .footer-col in the HTML if you want that column expanded by default on narrow screens.' },
      ],
    },
    features: [
      'Identical HTML markup renders as a static CSS grid on desktop and independent accordions on mobile',
      'Accordion toggle buttons are entirely absent from the layout above the breakpoint via display:none, not just hidden visually',
      'aria-expanded is actively re-synced via matchMedia whenever the layout crosses the breakpoint in either direction',
      'Smooth open/close animation via a max-height transition, since display and height:auto cannot be animated directly',
      'One click listener per column regardless of how many links it contains',
      'Each column collapses and expands fully independently of the others',
      'Chevron icon rotates in sync with each column\'s open state as a clear visual affordance',
      'Zero external dependencies — plain CSS Grid, media queries, and vanilla JS',
    ],
    useCases: [
      { icon: 'MARKETING', title: 'Marketing Site Footers', desc: 'Keep a content-heavy multi-column footer from dominating the mobile scroll experience.' },
      { icon: 'SAAS', title: 'SaaS Product Site Footers', desc: 'Standard use case for any product site with Product/Company/Resources/Legal-style footer columns.' },
      { icon: 'ECOM', title: 'E-commerce Footers', desc: 'Collapse category, help, and policy links into accordions on mobile checkout and browsing pages.' },
      { icon: 'A11Y', title: 'Accessible Responsive Footer Reference', desc: 'A correct reference for keeping aria-expanded accurate across a component whose interactivity is breakpoint-dependent.' },
      { icon: 'CODE', title: 'Related: Big Wordmark Footer', desc: 'See the [Big Wordmark Footer](/ui-snippets/big-wordmark-footer/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Scroll Progress Footer', desc: 'See the [Scroll Progress Footer](/ui-snippets/scroll-progress-footer/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Footer Locale & Currency Switcher', desc: 'See the [Footer Locale & Currency Switcher](/ui-snippets/footer-locale-switcher/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Newsletter Footer with Animated Confirmation', desc: 'See the [Newsletter Footer with Animated Confirmation](/ui-snippets/footer-newsletter-confirmation-animated/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Region & Currency Availability Footer', desc: 'See the [Region & Currency Availability Footer](/ui-snippets/footer-region-currency-notice/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Do the toggle buttons exist in the DOM on desktop, just hidden?', a: 'They exist in the DOM but are display: none above the 560px breakpoint, meaning they take up no layout space and are not part of the accessibility tree\'s interactive elements in that state, correctly reflecting that they have no function on desktop.' },
      { q: 'Why does aria-expanded need special handling instead of just reflecting the .open class?', a: 'Because the links are always visible on desktop regardless of whether a column happens to have the .open class from a previous mobile session, aria-expanded must report true whenever the desktop grid layout is active, and only defer to the real .open state once back at mobile width — otherwise a screen reader could be told content is collapsed when it\'s actually fully visible.' },
      { q: 'Why use max-height instead of just toggling display:none/block on the link list?', a: 'CSS cannot transition the display property, and height: auto is not animatable either, so max-height (set generously higher than the tallest possible content) is the standard technique that allows a genuinely smooth slide-open/closed animation.' },
      { q: 'What happens if a column has more links than fit in 240px?', a: 'The extra content would be clipped by overflow: hidden during the transition; increase the max-height value on .footer-col.open .col-links in the CSS to accommodate your actual tallest column\'s content.' },
      { q: 'Does resizing the browser window update the accordion state live?', a: 'Yes — a matchMedia listener on the same breakpoint re-runs syncState() any time the layout crosses it, so aria-expanded values are corrected immediately on resize, not just on page load.' },
      { q: 'Can each column have a different default open/closed state on mobile?', a: 'Yes — add the .open class directly to any .footer-col element in the HTML to have that specific column start expanded on narrow screens; columns without .open start collapsed by default.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain exactly why aria-expanded needs to be actively re-synced with matchMedia here rather than just reading each column's .open class directly, and what a screen reader user would actually experience if that sync were missing. It's also worth asking for a version where only one footer column can be open at a time on mobile (accordion-exclusive behavior), or one that persists which columns were left open across page loads using sessionStorage.`,
      prompt: `Build a responsive site footer in HTML, CSS and vanilla JavaScript that renders as a plain multi-column grid on desktop and automatically becomes independently collapsible accordions per column on narrow screens, using the same markup for both — no external libraries.

Requirements:
- A footer with at least four columns, each containing a heading/toggle button and a list of links, laid out as a CSS grid on wide viewports with all links always visible and the toggle buttons entirely hidden (not just visually, but removed from layout).
- Below a defined breakpoint (e.g. 560px), each column's toggle button must become visible and clicking it must independently expand or collapse that column's link list with a smooth animated transition — do not use display:none/block toggling for the animation, since that cannot be transitioned.
- Each toggle button must have an accurate aria-expanded attribute reflecting whether its links are currently visible. Critically, when the layout is at desktop width where links are always shown regardless of any stored "open" state, aria-expanded must report true for every column — and must correctly re-sync back to each column's real open/closed state if the window is resized back to mobile width.
- Use a JavaScript matchMedia listener on the same breakpoint value used in the CSS media query to detect layout changes and keep the aria-expanded values correct in both directions as the viewport crosses that breakpoint.
- A chevron icon on each toggle button should visually rotate to indicate the current open/closed state on mobile.`,
    },
  },
};

export default footerAccordionMobileCollapse;
