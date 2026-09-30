const verticalTabs = {
  id: 'vertical-tabs',
  title: 'Vertical Tabs',
  category: 'navigation',
  html: `<div class="vtabs">
  <div class="vtab-list" role="tablist" aria-orientation="vertical">
    <button class="vtab active" role="tab" aria-selected="true"  aria-controls="p1" id="t1">
      <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
      Overview
    </button>
    <button class="vtab" role="tab" aria-selected="false" aria-controls="p2" id="t2">
      <svg viewBox="0 0 24 24"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
      Analytics
    </button>
    <button class="vtab" role="tab" aria-selected="false" aria-controls="p3" id="t3">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V22a2 2 0 0 1-4 0v-.1A1.7 1.7 0 0 0 6 20.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H2a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 3.7 6l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H8.5A1.7 1.7 0 0 0 9.6 2.1V2a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6 1H22a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>
      Settings
    </button>
  </div>

  <div class="vtab-panels">
    <div class="vtab-panel active" role="tabpanel" id="p1" aria-labelledby="t1">
      <h3 class="vtab-title">Overview</h3>
      <p>A snapshot of your workspace — recent activity, quick stats, and shortcuts to everything you use most.</p>
    </div>
    <div class="vtab-panel" role="tabpanel" id="p2" aria-labelledby="t2" hidden>
      <h3 class="vtab-title">Analytics</h3>
      <p>Track growth over time with charts for traffic, conversions, and engagement, broken down by source.</p>
    </div>
    <div class="vtab-panel" role="tabpanel" id="p3" aria-labelledby="t3" hidden>
      <h3 class="vtab-title">Settings</h3>
      <p>Manage your profile, team members, billing, and notification preferences all in one place.</p>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  background: #f1f5f9;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}

.vtabs {
  display: flex;
  width: 100%; max-width: 560px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(15,23,42,0.06);
}

.vtab-list {
  flex-shrink: 0;
  display: flex; flex-direction: column; gap: 4px;
  padding: 12px;
  border-right: 1px solid #e2e8f0;
  background: #f8fafc;
}

.vtab {
  position: relative;
  display: flex; align-items: center; gap: 10px;
  padding: 11px 16px 11px 14px;
  border: none; background: none;
  border-radius: 10px;
  font-size: 14px; font-weight: 600; color: #64748b; font-family: inherit;
  cursor: pointer; text-align: left; white-space: nowrap;
  transition: background 0.15s, color 0.15s;
}
.vtab svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
.vtab:hover { background: #eef2ff; color: #475569; }
.vtab.active { background: #6366f1; color: #fff; }

.vtab-panels { flex: 1; padding: 28px; min-width: 0; }

.vtab-panel { animation: fade 0.25s ease; }
.vtab-title { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 10px; }
.vtab-panel p { font-size: 14px; color: #475569; line-height: 1.7; }

@keyframes fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 480px) {
  .vtabs { flex-direction: column; }
  .vtab-list { flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1px solid #e2e8f0; }
}`,
  js: `function initVerticalTabs() {
  const tabs = Array.from(document.querySelectorAll('.vtab'));
  if (!tabs.length) return;                // not mounted yet
  const panels = Array.from(document.querySelectorAll('.vtab-panel'));

  function select(i) {
    tabs.forEach((t, j) => {
      const on = i === j;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p, j) => {
      p.classList.toggle('active', i === j);
      p.hidden = i !== j;
    });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    // Arrow-key navigation between tabs (WAI-ARIA tabs pattern)
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      e.preventDefault();
      const next = e.key === 'ArrowDown' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
      select(next);
      tabs[next].focus();
    });
  });
}

// Run after the DOM mounts (framework exports run snippet JS before render)
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initVerticalTabs);
else requestAnimationFrame(initVerticalTabs);`,

  seo: {
    title: 'Vertical Tabs — Side Tab Navigation Snippet',
    description: 'Accessible vertical tabs with an icon side rail, animated panels, ARIA roles, and arrow-key navigation. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Vertical Tabs — Icon Side Rail, Animated Panels & ARIA Keyboard Navigation',
      description: `Vertical tabs are one of the most-searched navigation snippets because a side-by-side "rail of tabs on the left, content on the right" layout is the standard for [settings pages](/ui-snippets/settings-panel/), [dashboards](/ui-snippets/dashboard-layout/), account screens, and documentation — anywhere there are several sections and the horizontal [tab bar](/ui-snippets/tab-bar/) would run out of room. This snippet is a complete, accessible vertical tab component: an **icon side rail**, **animated content panels**, full **WAI-ARIA roles with arrow-key navigation**, and a responsive layout that collapses to a horizontal scroll on mobile.

**The two-column layout**

The component is a flex row: a fixed-width \`.vtab-list\` rail on the left and a flexible \`.vtab-panels\` area on the right, wrapped in a bordered, rounded container. The rail holds the tab buttons stacked vertically; the panel area shows one panel at a time. Because the rail is \`flex-shrink: 0\` and the panels are \`flex: 1\`, the rail keeps its width while the content fills the rest — the canonical settings-screen layout. Each tab has an icon plus a label, which is why vertical tabs scale better than horizontal ones: you can fit many labeled sections down the side without horizontal overflow.

**Switching tabs and panels**

A \`select(i)\` function is the single source of truth. It loops the tabs, marking the chosen one \`.active\` and setting \`aria-selected\`, and loops the panels, showing the matching one and hiding the rest with the \`hidden\` attribute. Using \`hidden\` (not just CSS) means inactive panels are removed from the accessibility tree and the tab order entirely, which is correct — a hidden tab panel should not be reachable. Each panel fades and slides in with a short \`@keyframes fade\` animation when it becomes active, so switching sections feels smooth rather than an instant swap.

**Full WAI-ARIA tabs semantics**

This is built to the ARIA Authoring Practices tabs pattern, which most "vertical tabs" tutorials skip. The rail is \`role="tablist"\` with \`aria-orientation="vertical"\` (telling assistive tech the tabs are arranged vertically, so it expects up/down keys). Each button is \`role="tab"\` with \`aria-selected\` and an \`aria-controls\` pointing at its panel; each panel is \`role="tabpanel"\` with \`aria-labelledby\` pointing back at its tab. This bidirectional wiring lets screen readers announce "tab, 1 of 3, selected" and associate each panel with its tab. It is the difference between a div soup that looks like tabs and a component that actually behaves like tabs for assistive tech.

**Roving tabindex and arrow-key navigation**

Proper tabs use a "roving tabindex": only the active tab is in the page tab order (\`tabIndex = 0\`), while the others are \`tabIndex = -1\`. So pressing Tab moves *into and out of* the tablist as a single stop, and you move *between* tabs with the arrow keys — exactly how native tab widgets work and what keyboard users expect. The \`keydown\` handler intercepts ArrowDown/ArrowUp (the correct keys for vertical orientation), wraps around at the ends, selects the new tab, and moves focus to it. This roving-tabindex-plus-arrow-keys behavior is the hallmark of a correctly implemented tab component and is implemented here in a few lines.

**Responsive: vertical on desktop, horizontal on mobile**

Vertical tabs do not fit a narrow phone screen, so a \`@media (max-width: 480px)\` query flips the layout: the container becomes a column, and the rail becomes a horizontal, scrollable strip along the top (\`flex-direction: row; overflow-x: auto\`) with a bottom border instead of a right one. The panels then sit below. This gives you the best of both — a spacious side rail on desktop and a familiar horizontal tab bar on mobile — without duplicating any markup.

**Customizing the tabs**

Re-theme by changing the active tab color, the hover background, and the rail background. Add or remove tabs by adding a \`<button role="tab">\` and a matching \`<div role="tabpanel">\` with paired \`id\`/\`aria-controls\`/\`aria-labelledby\` values; the script picks up any number of tabs automatically. Swap the icons for your own. Widen the rail for longer labels, or hide the labels and show only icons on smaller screens. To remember the selected tab across reloads, save the active index to \`localStorage\` in \`select()\` and restore it on load. Because the component is index-driven, all of these are small changes.

**Accessibility checklist**

Keep the \`role="tablist"\`/\`role="tab"\`/\`role="tabpanel"\` triad and the \`aria-controls\`/\`aria-labelledby\` links intact — they are what make it a real tab widget. Preserve the roving tabindex so keyboard users Tab into the group once and arrow between tabs. Maintain strong contrast for the active tab so its selected state is clear, and ensure the icons are decorative (the text label provides the name). Because inactive panels use the \`hidden\` attribute, they are correctly excluded from screen readers and keyboard focus. With these in place, the component is usable by mouse, keyboard, and assistive tech alike.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Copy the structure', text: 'Copy the .vtabs container with its .vtab-list of role="tab" buttons and the .vtab-panels of role="tabpanel" divs. Keep the id / aria-controls / aria-labelledby links paired.' },
        { title: 'Edit tabs and content', text: 'Change the tab labels and icons, and the heading and text inside each panel. The script handles any number of tab/panel pairs.' },
        { title: 'Keep the ARIA wiring', text: 'Each tab\'s aria-controls must match its panel id, and each panel\'s aria-labelledby must match its tab id. This makes it a real accessible tab widget.' },
        { title: 'Re-theme it', text: 'Update the active tab color, hover background, and rail background to match your design.' },
        { title: 'Remember the active tab (optional)', text: 'Save the selected index to localStorage in select() and restore it on load so the last tab reopens.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Side rail of icon + label tabs with a flexible content panel area',
      'Animated panel fade-and-slide on tab switch',
      'Full WAI-ARIA tabs: role tablist/tab/tabpanel, aria-selected, aria-controls, aria-labelledby',
      'aria-orientation="vertical" for correct screen-reader expectations',
      'Roving tabindex — Tab in/out as one stop, arrow keys move between tabs',
      'ArrowUp/ArrowDown navigation with wrap-around',
      'Inactive panels use the hidden attribute (removed from a11y tree and tab order)',
      'Responsive: collapses to a scrollable horizontal tab bar on mobile',
      'Index-driven script works with any number of tabs',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
    ],
    useCases: [
      { icon: 'NAV',    title: 'Settings and account pages',        desc: 'The classic use: a left rail of sections (Profile, Billing, Notifications) with the chosen panel on the right.' },
      { icon: 'DASH',   title: 'Dashboard section switcher',        desc: 'Switch between Overview, Analytics, and Reports in an admin panel without leaving the page or losing context.' },
      { icon: 'DOC',    title: 'Documentation and help centers',    desc: 'Many labeled topics fit down a side rail far better than a crowded horizontal tab bar.' },
      { icon: 'LEARN',  title: 'Learn the ARIA tabs pattern',       desc: 'See the full tablist/tab/tabpanel wiring, roving tabindex, and arrow-key navigation that most tab tutorials leave out.' },
      { icon: 'MOBILE', title: 'Responsive tab layouts',           desc: 'Get a spacious vertical rail on desktop that automatically becomes a familiar horizontal tab bar on phones.' },
      { icon: 'ACCESS', title: 'Keyboard-accessible tabs',         desc: 'Tab into the group once, arrow between tabs, with panels properly hidden — a correctly accessible tab widget.' },
    ],
    faqs: [
      { q: 'How do vertical tabs differ from horizontal tabs?', a: 'Functionally they are the same WAI-ARIA tabs pattern; only the layout and key bindings change. Vertical tabs stack down a side rail (using aria-orientation="vertical" and Up/Down arrow keys) and suit settings pages with many labeled sections that would overflow a horizontal bar.' },
      { q: 'How is the keyboard navigation supposed to work?', a: 'Tabs use a roving tabindex: only the active tab has tabIndex 0, the rest -1, so Tab moves into and out of the whole tablist as one stop. You move between tabs with the arrow keys (Up/Down for vertical), which select the tab and move focus to it, wrapping at the ends.' },
      { q: 'Why hide inactive panels with the hidden attribute instead of CSS?', a: 'The hidden attribute removes inactive panels from the accessibility tree and the tab order, which is correct — a hidden tab panel should not be reachable by keyboard or announced by screen readers. CSS display:none also hides them, but using the attribute keeps the intent explicit and the ARIA state consistent.' },
      { q: 'How do I add another tab?', a: 'Add a <button role="tab"> to the rail and a matching <div role="tabpanel"> to the panels, with paired id, aria-controls, and aria-labelledby values. The index-driven script automatically includes any number of tab/panel pairs.' },
      { q: 'How does it behave on mobile?', a: 'A media query at 480px flips the container to a column and turns the side rail into a horizontal, scrollable strip along the top with a bottom border. The panels sit below, giving a familiar horizontal tab bar on small screens with no extra markup.' },
      { q: 'Can I use these vertical tabs in React?', a: 'Yes. Click "JSX" for a React component or "Tailwind" for a React + Tailwind version. In React, hold the active index in useState, render tabs and panels from an array with the ARIA attributes, and replicate the arrow-key handler; the structure maps directly.' },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the ARIA wiring by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each tab needs a roving tabindex (tabIndex 0 on the active tab, -1 on the rest) instead of leaving every tab in the default tab order, and why the panels are hidden with the hidden attribute rather than plain CSS display or opacity. It's also worth asking about the initVerticalTabs guard clause — have it explain why the script checks document.readyState before running, and what would happen in a framework export if that check were skipped. For extending it, have it add localStorage persistence of the active tab index across reloads, support for badge counts next to each tab label, or a variant where tabs can be reordered by drag-and-drop. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build fully accessible vertical tabs in plain HTML, CSS, and vanilla JavaScript with no libraries, implementing the complete WAI-ARIA tabs pattern rather than just a visual side-rail layout.

Requirements:
- A tablist container with aria-orientation="vertical" containing several tab buttons, each with role="tab", an aria-selected attribute, and an aria-controls attribute pointing at its matching panel's id; a separate area holding one panel per tab, each with role="tabpanel" and aria-labelledby pointing back at its tab's id.
- Only one tab panel visible at a time. Inactive panels must use the hidden attribute (not just a CSS class) so they are removed from the accessibility tree and the keyboard tab order entirely.
- Implement roving tabindex: the currently active tab must have tabIndex 0 and every other tab must have tabIndex -1, so pressing Tab moves into and out of the whole tablist as a single stop rather than stopping on every individual tab.
- Handle ArrowDown and ArrowUp keydown events on the tabs to move selection to the next or previous tab respectively, wrapping around at the first and last tab, and move keyboard focus to the newly selected tab when this happens.
- The panel that becomes active must play a brief fade-and-slide-in CSS animation so switching feels smooth rather than an instant swap.
- On viewports narrower than roughly 480px, the layout must flip from a vertical side rail to a horizontal, horizontally-scrollable strip of tabs with the panel content below it.
- The initialization script must safely handle running before the DOM has fully parsed (guard on document.readyState) since it may be invoked in a framework export context where the markup mounts asynchronously.`,
    },
  },
};

export default verticalTabs;
