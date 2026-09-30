const sideDrawer = {
    id: 'side-drawer',
    title: 'Side Drawer',
    category: 'navigation',
    html: `<div class="page">
  <button class="open-btn" onclick="openDrawer()">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    Open Drawer
  </button>
</div>

<div class="overlay" id="overlay" onclick="closeDrawer()"></div>

<aside class="drawer" id="drawer">
  <div class="drawer-header">
    <div class="brand">⬡ Acme</div>
    <button class="close-btn" onclick="closeDrawer()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <nav class="drawer-nav">
    <a href="#" class="nav-item active"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Dashboard</a>
    <a href="#" class="nav-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Users<span class="badge">12</span></a>
    <a href="#" class="nav-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>Billing</a>
    <a href="#" class="nav-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>Analytics</a>
    <div class="nav-section">Settings</div>
    <a href="#" class="nav-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>Preferences</a>
    <a href="#" class="nav-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Sign out</a>
  </nav>
  <div class="drawer-footer">
    <div class="user-pill">
      <div class="user-av">PS</div>
      <div><div class="user-name">Puneet Sharma</div><div class="user-role">Admin</div></div>
    </div>
  </div>
</aside>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; }

.open-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: #6366f1; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }

.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(2px); opacity: 0; pointer-events: none; transition: opacity 0.25s; z-index: 10; }
.overlay.show { opacity: 1; pointer-events: all; }

.drawer {
  position: fixed; top: 0; left: 0; bottom: 0; width: 260px;
  background: #fff; box-shadow: 4px 0 24px rgba(0,0,0,0.1);
  display: flex; flex-direction: column;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  z-index: 20;
}
.drawer.open { transform: translateX(0); }

.drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 16px; border-bottom: 1px solid #f1f5f9; }
.brand { font-size: 17px; font-weight: 800; color: #1e293b; }
.close-btn { width: 30px; height: 30px; border-radius: 7px; border: 1px solid #e2e8f0; background: none; color: #94a3b8; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.close-btn:hover { background: #f8fafc; color: #1e293b; }

.drawer-nav { flex: 1; padding: 10px 8px; overflow-y: auto; display: flex; flex-direction: column; gap: 1px; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; font-size: 13px; font-weight: 500; color: #475569; text-decoration: none; border-radius: 8px; transition: background 0.1s, color 0.1s; }
.nav-item:hover { background: #f8fafc; color: #1e293b; }
.nav-item.active { background: #eef2ff; color: #6366f1; font-weight: 600; }
.nav-item .badge { margin-left: auto; font-size: 10px; font-weight: 700; background: #6366f1; color: #fff; border-radius: 10px; padding: 1px 6px; }
.nav-section { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: #94a3b8; padding: 10px 10px 4px; margin-top: 6px; }

.drawer-footer { padding: 14px 16px; border-top: 1px solid #f1f5f9; }
.user-pill { display: flex; align-items: center; gap: 10px; }
.user-av { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg,#6366f1,#8b5cf6); color: #fff; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.user-name { font-size: 13px; font-weight: 600; color: #1e293b; }
.user-role { font-size: 11px; color: #94a3b8; }`,
    js: `function openDrawer()  { document.getElementById('drawer').classList.add('open'); document.getElementById('overlay').classList.add('show'); }
function closeDrawer() { document.getElementById('drawer').classList.remove('open'); document.getElementById('overlay').classList.remove('show'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });`,

  seo: {
    title: 'Side Drawer — Free HTML CSS JS Slide Panel Snippet',
    description: 'Slide-in drawer with overlay, ESC and click-outside close, and a focus-trap pattern. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: "Side Drawer — translateX Slide-In, Overlay Backdrop & Three Close Mechanisms",
      description: `A side drawer (also called a slide-over or off-canvas panel) slides in from the edge of the screen to show secondary content — [filters](/ui-snippets/faceted-filter-sidebar/), [settings](/ui-snippets/settings-panel/), navigation, or form details — without navigating away from the current page. Used in mobile navigation, filter panels, and settings sheets — see also the dual nav-and-settings [drawer](/ui-snippets/drawer/).

**The slide-in animation**

The drawer has \`position: fixed; right: 0; top: 0; bottom: 0; transform: translateX(100%)\` by default — positioned off the right edge of the screen. Adding \`.open\` transitions to \`translateX(0)\` with \`transition: transform 0.3s ease\`. This slides the drawer in from the right.

**Three close mechanisms**

The X button calls \`closeDrawer()\`. The overlay background has \`onclick="closeDrawer()"\`. A \`keydown\` listener closes on \`Escape\`. All three call the same function that removes \`.open\` from the drawer and \`.show\` from the overlay.

**The overlay**

The overlay is a fixed full-screen div with a semi-transparent background. It shows behind the drawer and blocks interaction with the main content. The opacity transition (0 to 0.5) creates the dimming effect.

**The translateX slide animation**

Left drawers start at transform: translateX(-100%) — fully off-screen to the left. Adding .open transitions to translateX(0). The cubic-bezier spring curve (fast start, slow settle) creates the feel of a native mobile sheet opening. The CSS transition handles both open and close — removing .open reverses the animation automatically.

**Backdrop and z-index layering**

The backdrop is position: fixed; inset: 0 with a z-index below the drawer. When .open is applied, the backdrop fades in with opacity and gains pointer-events: all so clicks on it close the drawer. This click-backdrop-to-close is expected behaviour on all mobile UIs.

**Push vs overlay mode**

This snippet implements overlay mode — the drawer slides over the content with a backdrop. For push mode (content shifts right when drawer opens), add transition: margin-left 0.3s to the main content and set margin-left: 280px when the drawer opens. Overlay communicates temporary context; push communicates a persistent workspace panel.

**Focus management for accessibility**

When the drawer opens, move focus to the first focusable element inside: drawer.querySelector('a, button, input').focus(). On close, return focus to the element that triggered the open. This prevents keyboard users from losing their position on the page behind the drawer.

**The translateX slide animation**

Left drawers start at transform: translateX(-100%) — fully off-screen to the left. Adding .open transitions to translateX(0). The cubic-bezier spring curve (fast start, slow settle) creates the feel of a native mobile sheet opening. The CSS transition handles both open and close — removing .open reverses the animation automatically.

**Backdrop and z-index layering**

The backdrop is position: fixed; inset: 0 with a z-index below the drawer. When .open is applied, the backdrop fades in with opacity and gains pointer-events: all so clicks on it close the drawer. This click-backdrop-to-close is expected behaviour on all mobile UIs.

**Push vs overlay mode**

This snippet implements overlay mode — the drawer slides over the content with a backdrop. For push mode (content shifts right when drawer opens), add transition: margin-left 0.3s to the main content and set margin-left: 280px when the drawer opens. Overlay communicates temporary context; push communicates a persistent workspace panel.

**Focus management for accessibility**

When the drawer opens, move focus to the first focusable element inside: drawer.querySelector('a, button, input').focus(). On close, return focus to the element that triggered the open. This prevents keyboard users from losing their position on the page behind the drawer.`,
    },
    howToUse: { type: 'steps', items: [
      { title: "Click Open drawer", text: "Click the button to slide the drawer in from the right. Click the overlay, the × button, or press ESC to close." },
      { title: "Update drawer content", text: "In the HTML panel, change the drawer heading, description, and any form fields or links inside." },
      { title: "Change drawer width", text: "Update width: 320px on .drawer in the CSS panel." },
      { title: "Change slide direction", text: "Change translateX(100%) to translateX(-100%) for a left-side drawer, and update right: 0 to left: 0." },
      { title: "Connect close to form submission", text: "Call closeDrawer() after a successful form submit or action completion." },
      { title: "Export in your format", text: "Click \"HTML\" for a standalone file, \"JSX\" for a React component, or \"Tailwind\" for a React + Tailwind version." },
    ]},
    features: [
      "position: fixed; right: 0 — drawer anchored to viewport right edge",
      "translateX(100%) default — drawer hidden off right edge",
      ".open class: translateX(0) — smooth 0.3s ease slide-in",
      "Overlay: fixed full-screen semi-transparent backdrop with opacity transition",
      ".show on overlay adds visibility; removes it on close",
      "Three close: X button, overlay click, ESC keydown — all call closeDrawer()",
      "pointer-events: none on closed overlay — no invisible click blocking",
      "Export as HTML file, React JSX, or React + Tailwind CSS",
      "Mobile (375px), Tablet (768px), Desktop device preview buttons",
      "Live split-pane editor — preview updates as you type",
    ],
    useCases: [
      { icon: "APP", title: "Settings and preferences panels", desc: "Slide in a settings sheet from the right without navigating away. Close returns the user to their previous state." },
      { icon: "FORM", title: "Detail and edit panels", desc: "Show record details or an edit form in a drawer when clicking a table row. The drawer sits over the table without navigating away." },
      { icon: "NAV", title: "Mobile navigation drawer", desc: "Trigger from a hamburger button on mobile. The drawer slides in from the right with nav links and user account options." },
      { icon: "FILTER", title: "Search and filter panels", desc: "A filter drawer that slides in from the right on mobile where a sidebar filter panel would not fit." },
      { icon: "LEARN", title: "Learn translateX slide and overlay patterns", desc: "The drawer uses translateX(100%) to hide off-screen and translateX(0) to reveal. Edit the transition timing and overlay opacity in the CSS panel." },
      { icon: "CODE", title: "Shopping cart drawer", desc: "Classic e-commerce pattern: clicking a cart icon slides in a cart summary drawer from the right with items, totals, and a checkout button." },
      { icon: 'CODE', title: 'Related: View Transitions API Page Navigation', desc: 'See the [View Transitions API Page Navigation](/ui-snippets/view-transition-page-nav/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "How does the slide-in animation work?", a: "The drawer has position: fixed; right: 0; transform: translateX(100%) by default — positioned at the right edge but shifted 100% of its own width off-screen. Adding .open transitions to translateX(0) with transition: transform 0.3s ease." },
      { q: "How do I make a left-side drawer?", a: "Change right: 0 to left: 0 on .drawer. Change translateX(100%) to translateX(-100%). Change the transform-origin if needed. Everything else is identical." },
      { q: "How do I prevent scroll on the main content while the drawer is open?", a: "In openDrawer(), add document.body.style.overflow = \"hidden\". In closeDrawer(), restore it: document.body.style.overflow = \"\"." },
      { q: "How do I add a focus trap for accessibility?", a: "On openDrawer(), get all focusable elements in the drawer: const focusable = drawer.querySelectorAll(\"button, input, a\"). Focus the first one. Add a keydown Tab handler that cycles within the drawer." },
      { q: "Can I use this in React?", a: "Yes. Click \"JSX\" for a React component. Manage isOpen in useState. Apply the CSS class conditionally: className={isOpen ? \"drawer open\" : \"drawer\"}. Use useEffect to add/remove the ESC keydown listener." },
      { q: "How do I animate the drawer content in after it opens?", a: "Add a CSS animation to the drawer content that triggers when .open is applied: .drawer.open .drawer-content { animation: slideUp 0.3s ease 0.1s both }. The 0.1s delay starts the content animation after the drawer begins sliding in." },
    ],
    aiPrompt: {
      paragraph: `You don't need to trace the transform and overlay coordination by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the drawer starts at translateX(-100%) instead of using display none for its closed state, or how the overlay's pointer-events toggle prevents it from silently blocking clicks when it's supposed to be invisible. The same assistant can help optimize it, for example checking whether a proper focus trap is missing (it currently is) and what the minimal fix looks like for keyboard users tabbing past the drawer's edges. It's also useful for extending the feature: ask it to add a real focus trap that cycles Tab within the open drawer, lock body scroll while it's open, or convert it into a push layout that shifts page content instead of overlaying it. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a slide-in side drawer with an overlay backdrop in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- The drawer panel must be position fixed, spanning the full viewport height, sitting off-screen by default using a transform (translateX at plus or minus 100%, not display none or visibility hidden), with a CSS transition on transform only.
- Adding a single open class must be the only thing that changes the drawer's transform to translateX(0) and reveals a full-screen overlay behind it, so opening and closing are symmetric (removing the class must reverse the same transition automatically, not require a separate closing animation).
- The overlay must be a separate fixed, full-screen semi-transparent element with a lower z-index than the drawer, using an opacity transition combined with toggling pointer-events between none and all, so it never blocks clicks while invisible.
- Implement exactly three ways to close the drawer, all calling the same single close function: a close button inside the drawer, clicking the overlay itself, and pressing the Escape key anywhere on the page.
- The drawer's navigation items must be real anchor elements with icons and text labels, including at least one visually distinct "active" nav item and one item with a numeric badge.
- As a documented extension in a code comment, describe how to add a focus trap (moving focus to the first focusable element inside the drawer on open, cycling Tab within it while open, and restoring focus to the trigger element on close) since the base implementation does not include one.`,
    },
  }
};

export default sideDrawer;
