const dashboardShellWithDarkMode = {
  id: 'dashboard-shell-with-dark-mode',
  title: 'Dashboard Shell with Dark Mode',
  lastmod: '2026-09-05',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="ds-shell" id="dsShell" data-theme="light">
  <aside class="ds-sidebar">
    <div class="ds-logo">Northstar</div>
    <nav class="ds-nav">
      <a class="ds-nav-item ds-active" href="#">Overview</a>
      <a class="ds-nav-item" href="#">Projects</a>
      <a class="ds-nav-item" href="#">Reports</a>
      <a class="ds-nav-item" href="#">Team</a>
      <a class="ds-nav-item" href="#">Settings</a>
    </nav>
  </aside>

  <div class="ds-main">
    <header class="ds-topbar">
      <h1>Overview</h1>
      <button class="ds-theme-btn" id="dsThemeBtn">
        <svg class="ds-icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        <svg class="ds-icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>
        <span id="dsThemeLabel">Dark mode</span>
      </button>
    </header>

    <section class="ds-tiles">
      <div class="ds-tile">
        <span class="ds-tile-label">Active users</span>
        <span class="ds-tile-value">4,218</span>
        <span class="ds-tile-delta ds-up">+12.4%</span>
      </div>
      <div class="ds-tile">
        <span class="ds-tile-label">Revenue</span>
        <span class="ds-tile-value">$38.2k</span>
        <span class="ds-tile-delta ds-up">+8.1%</span>
      </div>
      <div class="ds-tile">
        <span class="ds-tile-label">Churn rate</span>
        <span class="ds-tile-value">2.3%</span>
        <span class="ds-tile-delta ds-down">-0.4%</span>
      </div>
    </section>

    <section class="ds-content">
      <p>Main content area — swap this placeholder for tables, charts, or any other dashboard content.</p>
    </section>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, -apple-system, sans-serif; margin: 0; background: #f1f5f9; }

.ds-shell {
  display: grid; grid-template-columns: 220px 1fr; min-height: 100vh;
  --ds-bg: #f1f5f9; --ds-surface: #ffffff; --ds-sidebar: #1e293b; --ds-sidebar-text: #cbd5e1;
  --ds-text: #1e293b; --ds-muted: #64748b; --ds-border: #e2e8f0; --ds-accent: #4f46e5;
  background: var(--ds-bg); color: var(--ds-text);
  transition: background 0.2s, color 0.2s;
}
.ds-shell[data-theme="dark"] { --ds-bg: #0f172a; --ds-surface: #1e293b; --ds-sidebar: #020617; --ds-sidebar-text: #94a3b8; --ds-text: #f1f5f9; --ds-muted: #94a3b8; --ds-border: #334155; --ds-accent: #818cf8; }

.ds-sidebar { background: var(--ds-sidebar); padding: 22px 14px; transition: background 0.2s; }
.ds-logo { color: #fff; font-weight: 800; font-size: 15px; padding: 0 10px; margin-bottom: 24px; }
.ds-nav { display: flex; flex-direction: column; gap: 2px; }
.ds-nav-item { color: var(--ds-sidebar-text); text-decoration: none; font-size: 13px; font-weight: 600; padding: 9px 12px; border-radius: 8px; }
.ds-nav-item:hover { background: rgba(255,255,255,0.06); }
.ds-nav-item.ds-active { background: var(--ds-accent); color: #fff; }

.ds-main { padding: 24px 28px; }
.ds-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
.ds-topbar h1 { margin: 0; font-size: 19px; }

.ds-theme-btn { display: flex; align-items: center; gap: 8px; background: var(--ds-surface); border: 1px solid var(--ds-border); color: var(--ds-text); padding: 8px 14px; border-radius: 9px; font-size: 12.5px; font-weight: 700; cursor: pointer; font-family: inherit; }
.ds-icon-moon { display: none; }
.ds-shell[data-theme="dark"] .ds-icon-sun { display: none; }
.ds-shell[data-theme="dark"] .ds-icon-moon { display: block; }

.ds-tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 22px; }
.ds-tile { background: var(--ds-surface); border: 1px solid var(--ds-border); border-radius: 14px; padding: 18px; display: flex; flex-direction: column; gap: 6px; transition: background 0.2s, border-color 0.2s; }
.ds-tile-label { font-size: 11.5px; font-weight: 700; color: var(--ds-muted); text-transform: uppercase; letter-spacing: 0.03em; }
.ds-tile-value { font-size: 22px; font-weight: 800; }
.ds-tile-delta { font-size: 11.5px; font-weight: 700; width: fit-content; }
.ds-up { color: #22c55e; }
.ds-down { color: #ef4444; }

.ds-content { background: var(--ds-surface); border: 1px solid var(--ds-border); border-radius: 14px; padding: 40px 24px; text-align: center; color: var(--ds-muted); font-size: 13px; transition: background 0.2s, border-color 0.2s; }

@media (max-width: 640px) {
  .ds-shell { grid-template-columns: 1fr; }
  .ds-sidebar { display: none; }
  .ds-tiles { grid-template-columns: 1fr; }
}`,
  js: `var shell = document.getElementById('dsShell');
var themeBtn = document.getElementById('dsThemeBtn');
var themeLabel = document.getElementById('dsThemeLabel');

function applyTheme(theme) {
  shell.setAttribute('data-theme', theme);
  themeLabel.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
}

themeBtn.addEventListener('click', function () {
  var current = shell.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

applyTheme('light');`,
  seo: {
    title: 'Dashboard Shell with Dark Mode — Free HTML CSS JS Snippet',
    description: 'A sidebar-plus-topbar dashboard shell with stat tiles, all restyled consistently by a single dark mode toggle. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Dashboard Shell with Dark Mode — Sidebar, Top Bar, and Stat Tiles with a Unified Theme Toggle',
      description: `This snippet is a small but complete dashboard shell — a dark sidebar with navigation, a top bar with a page title and theme toggle, three stat tiles, and a placeholder content area — with a single toggle button that switches the entire shell between light and dark themes consistently.\n\n**One token set for the whole shell**\n\nEvery color used across the sidebar, top bar, tiles, and content area is a CSS custom property defined on the outer \`.ds-shell\` grid container: background, surface, sidebar background, sidebar text, primary text, muted text, border, and accent. No individual section defines its own color values, which is what guarantees the sidebar, tiles, and borders all restyle together rather than some pieces lagging behind on a theme switch.\n\n**Toggling the whole shell at once**\n\nClicking the theme button in the top bar reads the shell's current \`data-theme\` attribute and flips it between \`"light"\` and \`"dark"\`. A single \`[data-theme="dark"]\` CSS rule scoped to \`.ds-shell\` redefines all eight custom properties at once — because every descendant element already reads its colors through \`var()\`, one attribute change on one element is sufficient to restyle the entire shell.\n\n**Icon and label swap without extra JS**\n\nThe toggle button contains both a sun and a moon icon; CSS attribute selectors (\`.ds-shell[data-theme="dark"] .ds-icon-sun\` and its moon counterpart) show only the icon appropriate to the current theme, while the button's text label is the one piece of the UI updated directly by JavaScript, since it must describe the action the click will perform next (e.g. showing "Dark mode" while currently light).`,
    },
    features: [
      'Complete dashboard shell: sidebar navigation, top bar, three stat tiles, and a content area',
      'A single set of CSS custom properties on the shell drives every color in every section',
      'One button toggles data-theme on the whole shell, restyling sidebar, tiles, and borders in sync',
      'Sun/moon icon swap handled purely by CSS attribute selectors, no icon-swapping JS',
      'Stat tiles include up/down delta indicators with semantic green/red coloring',
      'Responsive collapse of the sidebar and tile grid on narrow viewports',
      'Smooth color transitions on every themed element when the toggle is clicked',
      'Self-contained vanilla JS toggle handler with no external state management',
    ],
    useCases: [
      { icon: 'DASH', title: 'Admin and analytics dashboards', desc: 'A ready-made shell layout for internal tools, admin panels, or analytics products.' },
      { icon: 'APP', title: 'SaaS product shells', desc: 'The sidebar-plus-topbar-plus-tiles layout is the default shape for most SaaS app interiors.' },
      { icon: 'DESIGN', title: 'Dark mode implementation reference', desc: 'Demonstrates theming an entire multi-region layout from one toggle and one token set.' },
      { icon: 'LEARN', title: 'Teaching CSS custom property theming at scale', desc: 'Shows how a token system scales cleanly from a single component to a full page layout.' },
    ],
    faqs: [
      { q: 'How does one button restyle the entire shell?', a: 'Every color in the sidebar, top bar, tiles, and content area is a CSS custom property defined once on the outer .ds-shell element. A single [data-theme="dark"] rule redefines all of them at once, and because every descendant reads colors via var(), the whole shell restyles together.' },
      { q: 'How do the sun and moon icons swap?', a: 'Both icons are always in the DOM. CSS attribute selectors scoped to the current data-theme value show only the relevant one (display: none on the other), so no JavaScript touches the icons directly.' },
      { q: 'What does JavaScript actually do here?', a: 'It reads the shell\'s current data-theme attribute, flips it to the opposite value, and updates the toggle button\'s text label to describe the next available action. All visual restyling is handled by CSS reacting to that attribute change.' },
      { q: 'How does the layout behave on small screens?', a: 'Below 640px, the CSS grid collapses to a single column, the sidebar is hidden, and the stat tiles stack vertically — independent of whichever theme is currently active.' },
    ],
  },
};

export default dashboardShellWithDarkMode;
