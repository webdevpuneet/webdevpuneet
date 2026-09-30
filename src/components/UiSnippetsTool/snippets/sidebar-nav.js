const sidebarNav = {
  id: 'sidebar-nav',
  title: 'Collapsible Sidebar Nav',
  lastmod: '2026-06-13',
  category: 'navigation',
  html: `<div class="layout">
  <aside class="sidebar" id="sidebar" aria-label="Main navigation">
    <div class="sidebar-header">
      <div class="logo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 22 22 7 12 2"/></svg>
        <span class="logo-text">Nexus</span>
      </div>
      <button class="collapse-btn" id="collapseBtn" aria-label="Toggle sidebar" aria-expanded="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
    </div>

    <nav class="nav-section">
      <p class="nav-label">Main</p>
      <a class="nav-item active" href="#" data-tip="Dashboard">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span class="nav-text">Dashboard</span>
        <span class="nav-badge">3</span>
      </a>
      <a class="nav-item" href="#" data-tip="Analytics">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        <span class="nav-text">Analytics</span>
      </a>
      <a class="nav-item" href="#" data-tip="Projects">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 7l9-4 9 4v13l-9 4-9-4z"/><polyline points="3 7 12 11 21 7"/><line x1="12" y1="11" x2="12" y2="22"/></svg>
        <span class="nav-text">Projects</span>
        <span class="nav-badge new">New</span>
      </a>
      <a class="nav-item" href="#" data-tip="Messages">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span class="nav-text">Messages</span>
        <span class="nav-dot"></span>
      </a>
    </nav>

    <nav class="nav-section">
      <p class="nav-label">Management</p>
      <a class="nav-item" href="#" data-tip="Team">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span class="nav-text">Team</span>
      </a>
      <a class="nav-item" href="#" data-tip="Files">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
        <span class="nav-text">Files</span>
      </a>
      <a class="nav-item" href="#" data-tip="Settings">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        <span class="nav-text">Settings</span>
      </a>
    </nav>

    <div class="sidebar-footer">
      <div class="user-info" data-tip="Puneet Sharma">
        <div class="avatar">PS</div>
        <div class="user-details">
          <span class="user-name">Puneet Sharma</span>
          <span class="user-role">Admin</span>
        </div>
      </div>
    </div>
  </aside>

  <main class="main-content">
    <div class="topbar">
      <h1 class="page-title">Dashboard</h1>
      <div class="topbar-right">
        <span class="status-dot"></span>
        <span class="status-text">All systems normal</span>
      </div>
    </div>
    <div class="stats-row">
      <div class="stat-card"><span class="stat-num">2,847</span><span class="stat-label">Active Users</span></div>
      <div class="stat-card"><span class="stat-num">$18.2k</span><span class="stat-label">Revenue</span></div>
      <div class="stat-card"><span class="stat-num">94.3%</span><span class="stat-label">Uptime</span></div>
    </div>
    <p class="placeholder-text">Click the arrow to collapse the sidebar — icons stay visible with tooltips. Click again to expand.</p>
  </main>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0;height:100vh;overflow:hidden}
.layout{display:flex;height:100vh}

/* Sidebar */
.sidebar{
  width:220px;min-width:220px;
  background:#1e293b;
  border-right:1px solid #334155;
  display:flex;flex-direction:column;
  transition:width .28s cubic-bezier(.4,0,.2,1),min-width .28s cubic-bezier(.4,0,.2,1);
  overflow:hidden;
}
.sidebar.collapsed{width:60px;min-width:60px;}
.sidebar-header{display:flex;align-items:center;justify-content:space-between;padding:16px 14px;border-bottom:1px solid #334155;flex-shrink:0}
.logo{display:flex;align-items:center;gap:10px;color:#818cf8}
.logo-text{font-size:15px;font-weight:800;color:#f1f5f9;white-space:nowrap;overflow:hidden;transition:opacity .2s}
.collapsed .logo-text{opacity:0;width:0}

.collapse-btn{width:30px;height:30px;border-radius:8px;background:rgba(129,140,248,.1);border:1px solid rgba(129,140,248,.28);color:#818cf8;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:background .15s,border-color .15s,color .15s}
.collapse-btn:hover{background:rgba(129,140,248,.22);border-color:rgba(129,140,248,.55);color:#a5b4fc}
.collapse-btn svg{transition:transform .28s cubic-bezier(.4,0,.2,1)}
.collapsed .collapse-btn svg{transform:rotate(180deg)}
.collapsed .sidebar-header{justify-content:center}
.collapsed .logo{display:none}

.nav-section{padding:12px 8px 0;flex-shrink:0}
.nav-label{font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#475569;padding:0 8px 6px;white-space:nowrap;overflow:hidden;transition:opacity .15s}
.collapsed .nav-label{opacity:0}
.collapsed .nav-section{padding-left:0;padding-right:0}
.collapsed .nav-item{justify-content:center;padding:9px 0;border-radius:0;gap:0}
.collapsed .nav-text,.collapsed .nav-badge,.collapsed .nav-dot{display:none}
.collapsed .sidebar-footer{padding-left:0;padding-right:0}
.collapsed .user-info{justify-content:center;gap:0}
.collapsed .user-details{display:none}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 8px;border-radius:8px;text-decoration:none;color:#94a3b8;font-size:13px;font-weight:500;transition:background .15s,color .15s;position:relative;white-space:nowrap;cursor:pointer;margin-bottom:2px}
.nav-item:hover,.nav-item.active{background:#334155;color:#f1f5f9}
.nav-item.active{color:#818cf8}
.nav-icon{width:18px;height:18px;flex-shrink:0}
.nav-text{overflow:hidden;transition:opacity .15s,width .28s}
.collapsed .nav-text{opacity:0;width:0;overflow:hidden}
.nav-badge{font-size:9px;font-weight:700;padding:1px 6px;border-radius:20px;background:#818cf8;color:#fff;margin-left:auto;flex-shrink:0;transition:opacity .15s}
.nav-badge.new{background:#10b981}
.collapsed .nav-badge{opacity:0}
.nav-dot{width:6px;height:6px;border-radius:50%;background:#f59e0b;margin-left:auto;flex-shrink:0;transition:opacity .15s}
.collapsed .nav-dot{opacity:0}

/* Tooltip for collapsed state */
.collapsed .nav-item::after,.collapsed .user-info::after{content:attr(data-tip);position:absolute;left:calc(100% + 10px);top:50%;transform:translateY(-50%);background:#1e293b;border:1px solid #334155;color:#f1f5f9;font-size:11px;font-weight:500;padding:4px 10px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .15s;z-index:100;box-shadow:0 4px 12px rgba(0,0,0,0.3)}
.collapsed .nav-item:hover::after,.collapsed .user-info:hover::after{opacity:1}

/* Footer */
.sidebar-footer{margin-top:auto;padding:12px 8px;border-top:1px solid #334155}
.user-info{display:flex;align-items:center;gap:10px;padding:8px;border-radius:8px;cursor:pointer;transition:background .15s;position:relative}
.user-info:hover{background:#334155}
.avatar{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;flex-shrink:0}
.user-details{overflow:hidden;transition:opacity .15s}
.collapsed .user-details{opacity:0;width:0}
.user-name{display:block;font-size:12px;font-weight:600;color:#f1f5f9;white-space:nowrap}
.user-role{display:block;font-size:10px;color:#64748b}

/* Main content */
.main-content{flex:1;overflow:auto;background:#0f172a;display:flex;flex-direction:column;min-width:0}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid #1e293b}
.page-title{font-size:18px;font-weight:700;color:#f1f5f9}
.topbar-right{display:flex;align-items:center;gap:8px}
.status-dot{width:7px;height:7px;border-radius:50%;background:#10b981}
.status-text{font-size:12px;color:#64748b}
.stats-row{display:flex;gap:16px;padding:20px 24px}
.stat-card{flex:1;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:4px}
.stat-num{font-size:22px;font-weight:800;color:#f1f5f9}
.stat-label{font-size:11px;color:#64748b}
.placeholder-text{padding:0 24px;font-size:13px;color:#475569;line-height:1.7}`,

  js: `const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');

collapseBtn.addEventListener('click', () => {
  const isCollapsed = sidebar.classList.toggle('collapsed');
  collapseBtn.setAttribute('aria-expanded', String(!isCollapsed));
});`,

  seo: {
    title: 'Collapsible Sidebar Nav — Free HTML CSS Dashboard Snippet',
    description: `Dashboard sidebar with collapse/expand animation, icon tooltips, badge indicators, active states, and user profile footer. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `Collapsible Sidebar Nav — CSS Width Transition, Icon Tooltip System & Active State Design`,
      description: `The collapsible sidebar is the defining pattern of dashboard UI design — a persistent navigation panel that maximises screen space when collapsed to icon-only view while remaining fully navigable. This snippet builds a production-quality sidebar in pure HTML and CSS, with a single JavaScript toggle: smooth width animation, labelled nav items with icon fallback, badge counters, notification dots, a user profile footer, and CSS-only tooltips in the collapsed state.

Dashboards are where developers most often need a sidebar, and getting it right requires solving several simultaneous problems: the panel must animate smoothly without layout reflow, labels must hide without leaving gaps, icons must remain accessible in collapsed state (with tooltips), and badges must not clutter the icon view.

**The width collapse animation**

The sidebar collapses by toggling a \`.collapsed\` class that changes \`width\` and \`min-width\` from 220px to 60px. Both properties are animated with \`transition: width .28s cubic-bezier(.4,0,.2,1)\` — the Material Design standard easing for panel motions. Using \`min-width\` alongside \`width\` prevents the flex container from shrinking below the target during animation. The content inside (\`logo-text\`, \`nav-text\`, badges, labels) fades out with \`opacity: 0\` and \`width: 0\`, which collapses their space without affecting the icon alignment.

**CSS-only tooltips in collapsed state**

Each \`.nav-item\` carries a \`data-tip\` attribute with its label text. The collapsed state uses an \`::after\` pseudo-element with \`content: attr(data-tip)\` to render this as a floating tooltip. The tooltip is positioned \`left: calc(100% + 10px)\` — to the right of the icon — with a dark background and border to match the sidebar theme. \`pointer-events: none\` prevents it interfering with clicks. Visibility is controlled with \`opacity: 0\` + \`opacity: 1\` on hover — no JavaScript needed for the tooltip system.

**Badge and notification dot system**

Three badge styles are demonstrated: a purple numeric badge (\`3\`), a green "New" label badge, and a yellow notification dot. In collapsed state, all badges have \`opacity: 0\` — they would crowd the icon-only view. The icons alone communicate location; users expand the sidebar to check counts. This pattern matches VS Code, Linear, and Notion's sidebar behaviour.

**Active state with accent colour**

The active nav item uses \`background: #334155\` and \`color: #818cf8\` (indigo accent). This accent colour matches the logo icon and the user avatar gradient, creating visual coherence across the sidebar. The active state is set in HTML via the \`.active\` class — in a real app, your router would apply this dynamically.

**User profile footer**

The sidebar footer contains an avatar (initials-based \`<div>\` with gradient background), username, and role label. In collapsed state, the details fade out and the avatar tooltip shows the full name. This footer is a standard dashboard pattern — it anchors the user's identity in the navigation chrome and provides a consistent entry point for profile/account settings. Pair with a [command palette](/ui-snippets/command-palette/) for keyboard navigation between sections.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Paste the three code blocks',
        text: `Drop the HTML, CSS, and JS into your page. A full-height layout appears with a 220px sidebar on the left and a main content area on the right.`,
      },
      {
        title: 'Click the collapse arrow',
        text: `The sidebar smoothly animates to 60px — labels, badges, and the logo text fade out. Only icons remain, bottom-aligned.`,
      },
      {
        title: 'Hover over icons in collapsed state',
        text: `A CSS tooltip appears to the right of each icon showing its label. The user avatar tooltip shows the full name. No JavaScript required.`,
      },
      {
        title: 'Click again to expand',
        text: `The collapse arrow rotates 180° and the sidebar expands back to 220px. Labels, badges, and the user details fade back in.`,
      },
      {
        title: 'Set an active item',
        text: `Add the \`.active\` class to any \`.nav-item\` to highlight it with the accent colour. In a real app, apply this based on the current route.`,
      },
      {
        title: 'Add your nav items',
        text: `Copy any \`.nav-item\` block, swap the SVG icon, update the \`data-tip\` attribute, label text, and optionally add a badge or dot. Sections are grouped by \`.nav-section\`.`,
      },
    ] },
    features: [
      {
        title: 'Smooth width collapse animation',
        text: `CSS \`width\` + \`min-width\` transition at \`cubic-bezier(.4,0,.2,1)\` collapses the sidebar from 220px to 60px without layout reflow or icon jumping.`,
      },
      {
        title: 'CSS-only tooltip in collapsed state',
        text: `\`::after\` pseudo-elements with \`content: attr(data-tip)\` render label tooltips without any JavaScript — one attribute per nav item is all that is needed.`,
      },
      {
        title: 'Three badge styles',
        text: `Numeric badge (purple), text badge ("New" — green), and notification dot (amber) demonstrate common sidebar notification patterns. All fade out when collapsed.`,
      },
      {
        title: 'Arrow rotation indicator',
        text: `The collapse button arrow rotates 180° via \`transform: rotate(180deg)\` on \`.collapsed .collapse-btn svg\` — a pure CSS direction indicator.`,
      },
      {
        title: 'User profile footer',
        text: `Initials-avatar with gradient background, username and role text. Fades gracefully in collapsed state, shows a tooltip on hover with the full name.`,
      },
      {
        title: 'Section labels',
        text: `\`.nav-label\` divides items into labelled sections ("Main", "Management"). Labels fade out in collapsed state to avoid cluttering the icon-only view.`,
      },
      {
        title: 'Active state with accent colour',
        text: `The \`.active\` class applies an indigo accent colour matching the logo and avatar gradient — visual coherence across the navigation chrome.`,
      },
      {
        title: 'Single-line JS toggle',
        text: `The entire collapse behaviour is one \`classList.toggle\` call — three lines of JS total. All animation, tooltip, and label logic lives in CSS.`,
      },
    ],
    useCases: [
      {
        title: 'SaaS dashboard navigation',
        text: `The primary use case — a persistent left panel for navigating between dashboard sections. Collapse to give more space to data tables and charts.`,
      },
      {
        title: 'Admin panels and CMS interfaces',
        text: `Content management systems, e-commerce admin panels, and CRMs all use collapsible sidebars to balance navigation access with content editing space.`,
      },
      {
        title: 'Productivity app layouts',
        text: `Project management tools (Notion, Linear, Asana pattern) use a collapsible sidebar with icons + labels. The badge system communicates unread counts and new items.`,
      },
      {
        title: 'Developer tooling interfaces',
        text: `Code editors, database GUIs, and API testing tools use icon-only sidebars at small screen sizes. The tooltip system provides label access without expanding.`,
      },
      {
        title: 'Documentation sites',
        text: `Technical documentation with many sections benefits from a collapsible tree-style sidebar. Pair with a [table of contents](/ui-snippets/table-of-contents/) for per-page navigation.`,
      },
      {
        title: 'Analytics and reporting dashboards',
        text: `Financial dashboards, analytics platforms, and reporting tools use the sidebar for section navigation while the main area renders data-dense charts and tables.`,
      },
    ],
    faqs: [
      {
        q: 'How do I persist the collapsed state across page loads?',
        a: `Save the state to localStorage on toggle: \`localStorage.setItem('sidebar_collapsed', isCollapsed)\`. On page load, read it: \`if (localStorage.getItem('sidebar_collapsed') === 'true') sidebar.classList.add('collapsed')\`.`,
      },
      {
        q: 'How do I make the sidebar work as a mobile drawer?',
        a: `On mobile breakpoints (\`max-width: 768px\`), position the sidebar with \`position: fixed; left: -220px\` by default, and \`left: 0\` when open. Add an overlay backdrop behind it. The toggle button would move to the topbar. See the [drawer](/ui-snippets/drawer/) snippet for the full pattern.`,
      },
      {
        q: 'How do I add nested sub-menus?',
        a: `Add a \`<div class="sub-menu">\` inside a nav item. Toggle a \`.open\` class on click. Use \`max-height: 0\` → \`max-height: 200px\` with a CSS transition for a smooth expand. The parent item needs a chevron icon that rotates on \`.open\`.`,
      },
      {
        q: 'How do I export this as a React component?',
        a: `Replace the toggle JS with \`const [collapsed, setCollapsed] = useState(false)\`. Apply \`className={\`sidebar\${collapsed ? ' collapsed' : ''}\`}\` to the aside. The collapse button's onClick calls \`setCollapsed(c => !c)\`. Active state comes from comparing the current route to each item's href using Next.js \`usePathname()\` or React Router \`useLocation()\`.`,
      },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace every collapse transition and tooltip rule by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why width and min-width are both animated together on the sidebar, or how the data-tip attribute becomes a visible tooltip with no JavaScript involved. The same assistant can help optimize it, for example checking whether the collapsed-state selectors could be consolidated so the browser recalculates fewer rules per toggle, or whether the transition timing feels right at different sidebar depths. It is just as useful for extending the sidebar: ask it to persist the collapsed state in localStorage, add nested sub-menus with their own expand animation, or turn the sidebar into a mobile slide-out drawer below a breakpoint. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a collapsible dashboard sidebar in plain HTML, CSS, and a single JavaScript toggle — no framework, no animation library.

Requirements:
- A fixed-width sidebar (around 220px) containing a logo, several grouped nav sections with icon plus label plus optional badge or notification dot per item, and a footer with a user avatar, name, and role.
- A collapse button that toggles a single class on the sidebar. That class change alone must animate the sidebar from its full width down to an icon-only width (around 60px) using a CSS transition on both width and min-width with an easing curve, not a JS-driven animation loop.
- When collapsed, nav labels, badges, notification dots, and the user's name/role must fade out and collapse their own width via opacity and width transitions, without breaking icon alignment or causing the icons to jump position.
- Every nav item and the user info block must carry a data-tip attribute with its label text. In the collapsed state only, reveal that label as a floating tooltip to the right of the icon using a ::after pseudo-element with content: attr(data-tip), shown on hover via opacity — this tooltip system must work with zero JavaScript.
- The collapse button's icon must rotate 180 degrees via a CSS transform tied to the same collapsed class, so its direction always matches the current state.
- The entire interactive behavior in JavaScript must be a single class toggle call — all visual logic (fading, resizing, tooltips, icon rotation) must live in CSS, not be computed or animated via JS.`,
    },
  },
};

export default sidebarNav;
