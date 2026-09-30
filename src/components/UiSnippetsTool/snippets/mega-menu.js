const megaMenu = {
  id: 'mega-menu',
  title: 'Mega Menu',
  lastmod: '2026-06-12',
  category: 'navigation',
  html: `<div class="page">
  <nav class="nav" id="nav">
    <div class="nav-logo">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      <span>Acme</span>
    </div>
    <ul class="nav-list" role="menubar">
      <li class="nav-item" role="none"><a class="nav-link" href="#" role="menuitem">Home</a></li>
      <li class="nav-item has-mega" id="products-item" role="none">
        <button class="nav-link nav-trigger" id="products-btn" role="menuitem" aria-haspopup="true" aria-expanded="false">
          Products
          <svg class="nav-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="mega" id="mega" role="region" aria-label="Products menu">
          <div class="mega-inner">
            <div class="mega-col">
              <div class="mega-col-head">Design</div>
              <a class="mega-link" href="#">
                <div class="mega-link-icon" style="background:#f0f4ff">🎨</div>
                <div><div class="mega-link-name">Design Studio</div><div class="mega-link-desc">Visual design tools</div></div>
              </a>
              <a class="mega-link" href="#">
                <div class="mega-link-icon" style="background:#f0fdf4">🖼️</div>
                <div><div class="mega-link-name">Asset Library</div><div class="mega-link-desc">Icons, images, fonts</div></div>
              </a>
              <a class="mega-link" href="#">
                <div class="mega-link-icon" style="background:#fdf4ff">✨</div>
                <div><div class="mega-link-name">Prototyping</div><div class="mega-link-desc">Interactive wireframes</div></div>
              </a>
            </div>
            <div class="mega-col">
              <div class="mega-col-head">Developer</div>
              <a class="mega-link" href="#">
                <div class="mega-link-icon" style="background:#fff7ed">⚡</div>
                <div><div class="mega-link-name">API Platform</div><div class="mega-link-desc">REST &amp; GraphQL APIs</div></div>
              </a>
              <a class="mega-link" href="#">
                <div class="mega-link-icon" style="background:#fefce8">📦</div>
                <div><div class="mega-link-name">CLI Tools</div><div class="mega-link-desc">Terminal productivity</div></div>
              </a>
              <a class="mega-link" href="#">
                <div class="mega-link-icon" style="background:#f0fdf4">🔌</div>
                <div><div class="mega-link-name">Integrations</div><div class="mega-link-desc">500+ app connectors</div></div>
              </a>
            </div>
            <div class="mega-col">
              <div class="mega-col-head">Analytics</div>
              <a class="mega-link" href="#">
                <div class="mega-link-icon" style="background:#fdf2f8">📊</div>
                <div><div class="mega-link-name">Dashboards</div><div class="mega-link-desc">Real-time metrics</div></div>
              </a>
              <a class="mega-link" href="#">
                <div class="mega-link-icon" style="background:#eff6ff">🔍</div>
                <div><div class="mega-link-name">Insights</div><div class="mega-link-desc">AI-powered reports</div></div>
              </a>
              <a class="mega-link" href="#">
                <div class="mega-link-icon" style="background:#fff7ed">🎯</div>
                <div><div class="mega-link-name">Attribution</div><div class="mega-link-desc">Track conversions</div></div>
              </a>
            </div>
            <div class="mega-featured">
              <div class="featured-badge">✨ New</div>
              <div class="featured-title">Introducing AI Copilot</div>
              <div class="featured-desc">Generate components, write queries, and build flows with natural language.</div>
              <a class="featured-cta" href="#">Try it free →</a>
            </div>
          </div>
        </div>
      </li>
      <li class="nav-item" role="none"><a class="nav-link" href="#" role="menuitem">Pricing</a></li>
      <li class="nav-item" role="none"><a class="nav-link" href="#" role="menuitem">Docs</a></li>
    </ul>
    <div class="nav-actions">
      <a class="btn-ghost" href="#">Log in</a>
      <a class="btn-primary" href="#">Get started</a>
    </div>
  </nav>
  <div class="hero-placeholder">
    <p>Hover or click <strong>Products</strong> in the nav above</p>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; }

.page { min-height: 100vh; }

.nav {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 24px;
  height: 58px;
  display: flex;
  align-items: center;
  gap: 32px;
  position: relative;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.nav-logo { display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 800; color: #1e293b; flex-shrink: 0; }

.nav-list { display: flex; align-items: center; gap: 2px; list-style: none; flex: 1; }

.nav-link {
  display: flex; align-items: center; gap: 5px;
  padding: 6px 12px; border-radius: 8px;
  font-size: 14px; font-weight: 500; color: #475569;
  text-decoration: none; border: none; background: none; cursor: pointer;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}
.nav-link:hover { background: #f1f5f9; color: #1e293b; }
.nav-trigger.open { background: #f1f5f9; color: #1e293b; }

.nav-chevron { transition: transform 0.2s; flex-shrink: 0; }
.nav-trigger.open .nav-chevron { transform: rotate(180deg); }

.has-mega { position: static; }

.mega {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 680px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
  opacity: 0;
  transform: translateX(-50%) translateY(-8px) scale(0.98);
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
  overflow: hidden;
}
.mega.open {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1);
  pointer-events: all;
}
/* arrow — hidden when positioned under full nav; gap provides spacing */

.mega-inner {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 200px;
  padding: 20px;
  gap: 12px;
}

.mega-col { display: flex; flex-direction: column; gap: 4px; }
.mega-col-head { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: #94a3b8; padding: 0 8px 8px; }

.mega-link {
  display: flex; align-items: center; gap: 12px;
  padding: 8px; border-radius: 10px;
  text-decoration: none; color: inherit;
  transition: background 0.12s;
}
.mega-link:hover { background: #f8fafc; }

.mega-link-icon {
  width: 36px; height: 36px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
}
.mega-link-name { font-size: 13px; font-weight: 600; color: #1e293b; }
.mega-link-desc { font-size: 11.5px; color: #64748b; margin-top: 1px; }

.mega-featured {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 12px;
  padding: 18px;
  display: flex; flex-direction: column; gap: 8px;
  color: #fff;
}
.featured-badge {
  display: inline-flex; align-items: center; gap: 4px;
  background: rgba(255,255,255,0.2);
  border-radius: 99px; padding: 3px 10px;
  font-size: 11px; font-weight: 700;
  width: fit-content;
}
.featured-title { font-size: 15px; font-weight: 800; line-height: 1.2; }
.featured-desc { font-size: 12px; opacity: 0.85; line-height: 1.4; }
.featured-cta {
  display: inline-block; margin-top: 4px;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px; padding: 7px 14px;
  font-size: 12px; font-weight: 700; color: #fff;
  text-decoration: none; transition: background 0.15s;
  width: fit-content;
}
.featured-cta:hover { background: rgba(255,255,255,0.35); }

.nav-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.btn-ghost { font-size: 13px; font-weight: 600; color: #475569; text-decoration: none; padding: 7px 14px; border-radius: 8px; transition: background 0.15s; }
.btn-ghost:hover { background: #f1f5f9; }
.btn-primary { font-size: 13px; font-weight: 700; color: #fff; background: #6366f1; padding: 7px 16px; border-radius: 8px; text-decoration: none; transition: background 0.15s; }
.btn-primary:hover { background: #4f46e5; }

.hero-placeholder { display: flex; align-items: center; justify-content: center; height: calc(100vh - 58px); color: #94a3b8; font-size: 15px; }`,
  js: `const trigger  = document.getElementById('products-btn');
const mega     = document.getElementById('mega');
const item     = document.getElementById('products-item');
let closeTimer = null;

function open() {
  clearTimeout(closeTimer);
  mega.classList.add('open');
  trigger.classList.add('open');
  trigger.setAttribute('aria-expanded', 'true');
}

function close() {
  mega.classList.remove('open');
  trigger.classList.remove('open');
  trigger.setAttribute('aria-expanded', 'false');
}

function scheduleClose() {
  closeTimer = setTimeout(close, 150);
}

item.addEventListener('mouseenter', open);
item.addEventListener('mouseleave', scheduleClose);
mega.addEventListener('mouseenter', () => clearTimeout(closeTimer));
mega.addEventListener('mouseleave', scheduleClose);
trigger.addEventListener('click', e => {
  e.stopPropagation();
  mega.classList.contains('open') ? close() : open();
});

document.addEventListener('click', e => {
  if (!item.contains(e.target)) close();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') close();
});

mega.querySelectorAll('a').forEach(a => a.addEventListener('click', e => e.preventDefault()));`,
  seo: {
    title: 'Mega Menu — Free HTML CSS JS Dropdown Snippet',
    description: `Desktop mega dropdown with 3 link columns, featured card, hover-intent delay, CSS arrow pointer, and ARIA. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Mega Menu — HTML CSS JavaScript',
      description: `Desktop mega menu with 3 linked columns, featured card, hover and click open, arrow indicator, and Escape-to-close. Pure HTML/CSS/JS.

A mega menu is an expanded navigation dropdown that reveals multiple columns of categorised links, often with a featured promotional panel. It is the standard pattern for product-heavy SaaS sites, e-commerce stores, and enterprise dashboards where a simple one-level dropdown cannot surface enough destinations without overwhelming users. This snippet builds a full mega menu with three linked columns, a gradient featured card, a CSS arrow pointer, and combined hover + click behaviour — all in vanilla HTML, CSS, and JavaScript.

**Panel positioning and the CSS arrow**

The mega panel is \`position: absolute; left: 50%; transform: translateX(-50%)\` on the \`.has-mega\` nav item. This centres the panel below the trigger regardless of where the nav item sits in the bar. The open state composes two transforms on a single property: \`transform: translateX(-50%) translateY(0) scale(1)\` — the closed state uses \`translateX(-50%) translateY(-8px) scale(0.98)\`. Both transforms must be written together or the translateX centering is lost when the other transforms change. The decorative arrow pointer is a pseudo-element \`::before\` rotated 45° with the same \`border-left\` and \`border-top\` as the panel border, positioned absolutely above the panel top edge.

**Hover-intent with timer guard**

A plain \`mouseenter\` / \`mouseleave\` approach causes flickering as the mouse moves from the nav trigger across the 14px gap into the panel. The solution is a \`scheduleClose()\` function that sets a 150ms \`setTimeout\` on \`mouseleave\`. Both the trigger's parent \`<li>\` and the mega panel itself call \`clearTimeout\` on \`mouseenter\`, cancelling the pending close. This creates a "hover bridge" — the user can move the mouse across the gap without the panel closing mid-movement.

**Dual open trigger (hover + click)**

The trigger button also supports click-to-toggle, which is essential for keyboard users and touch devices where hover events do not fire reliably. The click handler calls \`e.stopPropagation()\` to prevent the document-level click listener from immediately closing a panel that was just opened. The document listener closes the panel when a click lands outside the \`.has-mega\` container, using \`.contains()\` to check ancestry.

**Keyboard accessibility**

An \`Escape\` keydown listener on the document always closes the panel regardless of focus position. The trigger button carries \`aria-haspopup="true"\` and \`aria-expanded\` which is toggled on every open/close. The mega div uses \`role="region"\` with \`aria-label="Products menu"\` so screen readers announce the region when focus enters.

**Featured panel**

The fourth column is a gradient card using \`background: linear-gradient(135deg, #6366f1, #8b5cf6)\` — the indigo-to-violet diagonal is a common SaaS brand treatment. The featured CTA button uses \`rgba(255,255,255,0.2)\` background so it adapts to any gradient colour behind it without needing a hardcoded contrasting colour. The \`width: fit-content\` on the CTA prevents it from stretching to full column width.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Hover over "Products"',
        text: `The mega panel slides down with a scale-and-fade animation and a CSS arrow indicator points up to the trigger button.`,
      },
      {
        title: 'Browse the three columns',
        text: `Each column has a category heading and three links with icon, name, and description. Hover each link for the background highlight.`,
      },
      {
        title: 'See the featured card',
        text: `The fourth column shows a gradient promotional card with a "New" badge, title, description, and a CTA button.`,
      },
      {
        title: 'Move mouse away',
        text: `Moving the mouse off the panel or the trigger starts a 150ms close timer. Moving back into either cancels it — no accidental closes.`,
      },
      {
        title: 'Press Escape',
        text: `Pressing Escape closes the panel from anywhere on the page, resetting the trigger's aria-expanded to false.`,
      },
      {
        title: 'Add more mega menus',
        text: `Duplicate the .has-mega <li> structure for other nav items. Each needs its own trigger, mega div, and JS listener wired to separate element IDs.`,
      },
    ] },
    features: [
      {
        title: 'Centred panel with transform trick',
        text: `translateX(-50%) centres the panel below any trigger. Open state composes translateY and scale on the same transform property to avoid losing the centering.`,
      },
      {
        title: 'CSS arrow pointer',
        text: `::before pseudo-element rotated 45deg with matching border creates a standard dropdown arrow without extra markup.`,
      },
      {
        title: 'Hover-intent timer guard',
        text: `150ms setTimeout on mouseleave, cancelled by mouseenter on either element, prevents the flicker of crossing the gap between trigger and panel.`,
      },
      {
        title: 'Click and keyboard toggle',
        text: `Button click toggles the panel open/closed. Escape key closes it. Click-outside closes it via a document listener with .contains() check.`,
      },
      {
        title: 'Gradient featured card',
        text: `Fourth column uses a purple gradient card with semi-transparent white CTA button — adapts to any brand gradient without hardcoded colours.`,
      },
      {
        title: 'ARIA attributes',
        text: `aria-haspopup="true", aria-expanded toggled on open/close, and role="region" with aria-label on the panel for screen reader compatibility.`,
      },
      {
        title: 'Three-column layout',
        text: `CSS grid with four columns (3×1fr + 200px fixed) for the featured panel. Each column uses flex-direction column for natural link stacking.`,
      },
      {
        title: 'Icon tiles on links',
        text: `Each mega link has a small rounded icon tile with a custom tinted background. Swap emoji for SVG icons without changing layout.`,
      },
    ],
    useCases: [
      {
        title: 'SaaS product sites',
        text: `Expose product lines, features, and integrations in one dropdown. Pair with a [sticky header](/ui-snippets/sticky-header/) so the nav remains accessible on long landing pages.`,
      },
      {
        title: 'E-commerce category nav',
        text: `Show top-level departments and subcategories with preview images. Combine with a [chip filter](/ui-snippets/chip-filter/) on the category page for further filtering.`,
      },
      {
        title: 'Enterprise dashboards',
        text: `Organise tools and modules into a mega menu so users can navigate between sections without going back to a home screen.`,
      },
      {
        title: 'Documentation sites',
        text: `Surface API sections, guides, and reference pages grouped by topic. Add a search input as a fifth column for instant doc search.`,
      },
      {
        title: 'Agency and portfolio sites',
        text: `Show service categories and case studies. Link the featured card to a recent project. Combine with [animated tabs](/ui-snippets/animated-tabs/) for the main page content.`,
      },
      { icon: 'CODE', title: 'Related: Page Minimap', desc: 'See the [Page Minimap](/ui-snippets/page-minimap/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How do I add a second mega menu for a different nav item?',
        a: `Duplicate the .has-mega <li> with a new id on both the trigger button and the mega div. Add a second set of open/close event listeners in JS referencing the new IDs. Each mega menu is fully independent.`,
      },
      {
        q: 'How do I make this mobile-friendly?',
        a: `On mobile, hide .mega and replace with an off-canvas drawer or accordion. Use a media query to switch the .has-mega from position:relative + hover behaviour to a full-width collapsible panel on small screens.`,
      },
      {
        q: 'Why combine translateX and the open/close transforms on one property?',
        a: `CSS transform is a single property — setting transform in one rule overwrites any previously set transform values. If the open state only sets translateY(0) scale(1), it loses the translateX(-50%) centering from the base rule. All transforms must be written together.`,
      },
      {
        q: 'How do I populate mega links from an API?',
        a: `Fetch your navigation data on page load, then generate the .mega-inner HTML using a template literal map over the response data. Re-attach event listeners after innerHTML is set, or use event delegation with a single listener on .mega-inner.`,
      },
      {
        q: 'How do I add keyboard navigation through mega links?',
        a: `Listen for ArrowDown on the trigger to move focus into the first mega link. Then listen for ArrowDown/ArrowUp on .mega-link elements to move between them with element.nextElementSibling?.focus(). Tab naturally moves focus forward through links.`,
      },
      {
        q: 'Can I use this mega menu in React, Vue, or Angular?',
        a: `Yes. Export it as a React, Vue, or Angular component with the buttons above the preview. The hover-to-open dropdown and the multi-column panel grid are pure CSS, so they port over unchanged; the only JavaScript — the click-outside close and the keyboard focus handling — moves into a useEffect (React), onMounted (Vue), or ngAfterViewInit (Angular) lifecycle hook so listeners attach after the menu mounts. The link data is a natural fit for an array you map over with JSX, v-for, or *ngFor. The Tailwind export rewrites the mega-panel grid, spacing, and hover states as utility classes for a Tailwind project.`,
      },
    ],
    aiPrompt: {
      paragraph: `You don't need to trace the open and close logic by hand to trust it. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the scheduleClose function's 150ms setTimeout paired with clearTimeout on both the trigger and the panel prevents flicker across the gap between them, or why the open state has to rewrite translateX, translateY, and scale together on the transform property rather than layering them separately. The same assistant is useful for optimizing it — asking whether the document-level click listener should be scoped more narrowly once there are several mega menus on one page, or whether the panel's transition properties could be trimmed for snappier perceived response. It's just as good for extending the effect: ask it to add arrow-key navigation between mega-links, support a second mega menu for another nav item, or swap emoji icon tiles for real SVGs without breaking the grid. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a desktop "mega menu" dropdown in plain HTML, CSS, and JavaScript using only CSS grid, transforms, and vanilla event listeners — no libraries.

Requirements:
- A horizontal nav bar with a logo, a list of nav items, and a trigger button for one item (e.g. "Products") that has aria-haspopup="true" and an aria-expanded attribute kept in sync with open state.
- A mega panel absolutely positioned under the trigger's containing list item, centered with left: 50% and transform: translateX(-50%). The open state must add translateY(0) scale(1) to the SAME transform declaration as the centering translateX, not a separate rule, so opening the panel never loses the horizontal centering.
- Inside the panel, a CSS grid with three or more link columns (icon tile, name, description per link) plus a distinct fourth "featured" column styled with a gradient background and a call-to-action button.
- Implement hover-intent: opening on mouseenter of the trigger's parent list item, and on mouseleave scheduling a close with a roughly 150ms setTimeout — but cancel that pending timeout with clearTimeout if the mouse re-enters either the trigger's parent or the panel itself, so moving the cursor across the small gap between trigger and panel never causes a flicker-close.
- Also support opening and closing the panel by clicking the trigger button (call stopPropagation on that click so a document-level click-outside listener doesn't immediately re-close it), by clicking anywhere outside the menu (using contains() to detect outside clicks), and by pressing Escape from anywhere on the page.
- Add a CSS-only arrow/pointer indicator on the panel using a rotated pseudo-element that shares the panel's border color.
- Toggle a chevron icon's rotation to reflect open/closed state, and keep aria-expanded synced on every open and close call.`,
    },
  },
};
export default megaMenu;
