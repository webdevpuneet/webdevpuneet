const collapsibleSidebar = {
  id: 'collapsible-sidebar',
  title: 'Collapsible Sidebar',
  category: 'layouts',
  html: `<div class="app-shell">
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <span class="logo-dot"></span>
      <span class="logo-text">Acme</span>
      <button class="collapse-btn" id="collapseBtn" onclick="toggleSidebar()" aria-label="Collapse sidebar" aria-expanded="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
    </div>
    <nav class="nav-list">
      <a href="#" class="nav-item active"><span class="nav-icon">D</span><span class="nav-label">Dashboard</span></a>
      <a href="#" class="nav-item"><span class="nav-icon">P</span><span class="nav-label">Projects</span></a>
      <a href="#" class="nav-item"><span class="nav-icon">T</span><span class="nav-label">Team</span></a>
      <a href="#" class="nav-item"><span class="nav-icon">S</span><span class="nav-label">Settings</span></a>
    </nav>
  </aside>
  <main class="main-content">
    <h3>Main Content Area</h3>
    <p>Toggle the sidebar using the arrow button in its header.</p>
  </main>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.app-shell { display: flex; height: 360px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }

.sidebar {
  width: 220px;
  background: #1e293b;
  color: #e2e8f0;
  transition: width 0.25s ease;
  flex-shrink: 0;
  overflow: hidden;
}
.sidebar.collapsed { width: 64px; }

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border-bottom: 1px solid #334155;
  white-space: nowrap;
}
.logo-dot { width: 22px; height: 22px; border-radius: 6px; background: #6366f1; flex-shrink: 0; }
.logo-text { font-weight: 700; font-size: 15px; flex: 1; opacity: 1; transition: opacity 0.15s; }
.sidebar.collapsed .logo-text { opacity: 0; width: 0; }

.collapse-btn {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: none;
  background: #334155;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.25s;
}
.sidebar.collapsed .collapse-btn { transform: rotate(180deg); }
.collapse-btn:hover { background: #475569; }

.nav-list { padding: 8px; display: flex; flex-direction: column; gap: 2px; }
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: background 0.15s;
}
.nav-item:hover { background: #334155; }
.nav-item.active { background: #6366f1; color: #fff; }

.nav-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}
.nav-item.active .nav-icon { background: rgba(255,255,255,0.2); }

.nav-label { opacity: 1; transition: opacity 0.15s; }
.sidebar.collapsed .nav-label { opacity: 0; width: 0; overflow: hidden; }

.main-content { padding: 24px; flex: 1; }
.main-content h3 { font-size: 16px; color: #1e293b; margin-bottom: 8px; }
.main-content p { font-size: 13px; color: #64748b; }`,
  js: `function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const btn = document.getElementById('collapseBtn');
  const collapsed = sidebar.classList.toggle('collapsed');

  btn.setAttribute('aria-expanded', String(!collapsed));
  btn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
}`,

  seo: {
    title: 'Collapsible Sidebar — Free HTML CSS JS Icon-Only Toggle Sidebar Snippet',
    description: 'A navigation sidebar that collapses to an icon-only rail and expands back to full width with labels, animated with a single CSS width transition. Vanilla JS.',
    about: {
      title: 'Collapsible Sidebar — HTML, CSS & JavaScript Icon Rail Toggle',
      description: `Dashboards and admin panels almost always need a navigation sidebar, and power users almost always want the option to shrink it down once they've learned the icons and want more room for content. This snippet implements the classic "icon-only rail" collapse pattern used by tools like VS Code and Notion, built with a single boolean class toggle and a CSS width transition.

**How the width animation works**

The \`.sidebar\` has an explicit \`width: 220px\` and a \`transition: width 0.25s ease\`. Toggling the \`.collapsed\` class swaps that to \`width: 64px\` — just enough room for the icon column. Because both states are explicit pixel widths (not \`auto\`), the browser can smoothly animate between them; animating to/from \`width: auto\` is not reliably transitionable in CSS, which is a common trap when building this pattern from scratch.

**How labels disappear without causing layout jumps**

Simply hiding the \`.nav-label\` and \`.logo-text\` elements with \`display: none\` would make them disappear instantly, out of sync with the slower width animation, which looks broken. Instead, both fade via \`opacity\` (a separate, faster 0.15s transition) *and* collapse via \`width: 0; overflow: hidden\`, so the text visually fades away first and its space collapses in sync with the sidebar's own shrink, rather than the text abruptly vanishing or wrapping awkwardly mid-animation.

**How the toggle button flips**

The collapse button's chevron icon is rotated 180 degrees via \`transform: rotate(180deg)\` when \`.collapsed\` is active, which turns a "point left" icon into a "point right" icon using the same SVG — no separate icon asset needed for the two directions.

**Accessibility handling**

\`toggleSidebar()\` updates both \`aria-expanded\` and \`aria-label\` on the toggle button every time it's clicked, so assistive technology always announces the sidebar's current state and the action the button will perform next ("Expand sidebar" vs. "Collapse sidebar") rather than a static, potentially stale label.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Collapsible Sidebar" in the sidebar Library tab to load the app shell layout.' },
        { title: 'Toggle the sidebar', text: 'Click the arrow button in the sidebar header in the preview to collapse and expand it.' },
        { title: 'Adjust the widths', text: 'Change the 220px and 64px values on .sidebar and .sidebar.collapsed in the CSS panel to fit your icon size.' },
        { title: 'Add navigation items', text: 'Copy a .nav-item anchor in the HTML panel and update its icon letter/label text.' },
        { title: 'Persist the collapsed state', text: 'Store the collapsed boolean in localStorage inside toggleSidebar and read it back on page load to remember the user\'s preference.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind or click "Save as" to reuse this shell across projects.' },
      ],
    },
    features: [
      'Single .collapsed class toggle drives the entire width animation and icon-only state',
      'Explicit pixel widths on both states so the CSS width transition animates smoothly',
      'Labels fade via opacity before their space collapses, avoiding an abrupt text pop',
      'Toggle button chevron rotates 180 degrees to indicate direction using one SVG asset',
      'aria-expanded and aria-label update dynamically to reflect current state for screen readers',
      'Active nav item highlighted with a solid background and lightened icon tile',
      'Sidebar and icon tiles both use flex-shrink:0 to avoid squeezing during the transition',
      'Ready to persist the collapsed preference via localStorage with one added line',
    ],
    useCases: [
      { icon: 'DASH', title: 'Admin dashboards and internal tools', desc: 'Give power users more horizontal room for tables and charts by collapsing the nav to icons only.' },
      { icon: 'CODE', title: 'Developer tool layouts', desc: 'Mimic the VS Code / IDE-style collapsible activity bar pattern for a code-adjacent product.' },
      { icon: 'FLOW', title: 'SaaS app shells', desc: 'Use as the base navigation shell for a multi-page SaaS product, wiring each nav-item href to a real route.' },
      { icon: 'LEARN', title: 'Learn width-transition animation pitfalls', desc: 'See why explicit pixel widths (not width:auto) on both states are required for a smooth CSS transition.' },
      { icon: 'ACCESS', title: 'Accessible collapse/expand toggles', desc: 'Study how aria-expanded and aria-label should update dynamically rather than staying static across state changes.' },
      { icon: 'DESIGN', title: 'Mobile-adaptive navigation', desc: 'Extend the collapsed state to auto-trigger below a breakpoint, giving mobile users an icon rail by default.' },
      { icon: 'CODE', title: 'Related: CSS light-dark() Theme Demo', desc: 'See the [CSS light-dark() Theme Demo](/ui-snippets/css-light-dark-theme-demo/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the sidebar use explicit pixel widths instead of width: auto?', a: 'CSS transitions cannot reliably animate to or from width: auto because the browser cannot interpolate an unknown target size. Using explicit values like 220px and 64px on both states lets the transition animate smoothly between two known numbers.' },
      { q: 'Why do labels fade out instead of just using display: none?', a: 'display: none changes instantly with no animation, which would make the text disappear abruptly out of sync with the slower sidebar width transition. Fading opacity first, then collapsing width, keeps the whole collapse feeling like one cohesive animation.' },
      { q: 'How do I make the collapsed state persist across page loads?', a: 'Inside toggleSidebar, save the new collapsed state to localStorage (e.g. localStorage.setItem(\'sidebarCollapsed\', collapsed)). On page load, read that value and apply the .collapsed class immediately, before the user interacts with the toggle.' },
      { q: 'How do I add more navigation items?', a: 'Copy an existing .nav-item anchor element inside .nav-list, update its icon letter (or swap in an SVG) and its .nav-label text, and update the href to point at the real route.' },
      { q: 'Can the sidebar auto-collapse on mobile?', a: 'Yes — add a media query or a resize listener that adds the .collapsed class automatically below a chosen viewport width, while still letting the user manually toggle it back if there is room.' },
      { q: 'Why does the toggle button rotate instead of swapping icons?', a: 'Rotating a single chevron SVG 180 degrees produces the mirrored "point the other way" icon without needing a second SVG asset or an icon font, keeping the markup smaller and the two states visually consistent.' },
      { q: 'Does the collapsed sidebar keep the nav items clickable?', a: 'Yes — the icon tiles remain fully sized and clickable in the collapsed state; only the text label collapses. Consider adding a title attribute or tooltip on each icon so users can identify items by hovering while collapsed.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet to an AI assistant and ask it to explain precisely why animating width requires two explicit pixel values rather than width: auto on either end — this trips up nearly every first attempt at a collapsible sidebar. It's also a good prompt for adding a tooltip that appears on hover over each icon while the sidebar is collapsed (since the text label is invisible then), or for wiring localStorage persistence so a returning user's collapse preference is remembered automatically.`,
      prompt: `Build a "collapsible sidebar" navigation shell in plain HTML, CSS, and vanilla JavaScript.

Requirements:
- A sidebar with an explicit pixel width in its default (expanded) state and a smaller explicit pixel width in a .collapsed state, animated purely with a CSS transition on the width property — do not use width: auto anywhere in the transitioning states.
- Each navigation item must show both an icon and a text label in the expanded state. In the collapsed state, only the icon remains fully visible; the label must fade out via opacity and collapse its own width so no extra empty space is left behind, without abruptly disappearing out of sync with the sidebar's own width transition.
- A single toggle button in the sidebar header that calls one function to toggle the .collapsed class, and that visually flips its own icon (e.g. rotate a chevron 180 degrees) to indicate the opposite action is now available.
- The toggle button must update its aria-expanded and aria-label attributes every time it is clicked so screen reader users always hear the sidebar's current state and the action the button performs next.
- The overall layout must be a flex app shell with the sidebar beside a main content area that fills remaining space.`,
    },
  },
};

export default collapsibleSidebar;
