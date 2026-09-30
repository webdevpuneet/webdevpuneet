const tabBar = {
    id: 'tab-bar',
    title: 'Tab Bar',
    category: 'navigation',
    html: `<div class="tabs">
  <button class="tab active" onclick="switchTab(this,'p1')">Overview</button>
  <button class="tab" onclick="switchTab(this,'p2')">Details</button>
  <button class="tab" onclick="switchTab(this,'p3')">Reviews</button>
</div>
<div class="panels">
  <div class="panel active" id="p1">
    <h3>Overview</h3>
    <p>High-level summary of the product or feature.</p>
  </div>
  <div class="panel" id="p2">
    <h3>Details</h3>
    <p>Specifications, dimensions, and technical info.</p>
  </div>
  <div class="panel" id="p3">
    <h3>Reviews</h3>
    <p>Customer ratings and feedback go here.</p>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; }

.tabs {
  display: flex;
  gap: 2px;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 20px;
}

.tab {
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: color 0.15s, border-color 0.15s;
  border-radius: 4px 4px 0 0;
}
.tab:hover { color: #1e293b; background: #f1f5f9; }
.tab.active { color: #6366f1; border-bottom-color: #6366f1; font-weight: 600; }

.panel { display: none; }
.panel.active { display: block; }

.panel h3 { font-size: 16px; font-weight: 700; color: #1e293b; margin-bottom: 8px; }
.panel p { font-size: 14px; color: #64748b; line-height: 1.6; }`,
    js: `function switchTab(btn, panelId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(panelId).classList.add('active');
}`,

  seo: {
    title: 'Tab Bar — Free HTML CSS JS Tabbed Interface Snippet',
    description: 'Tabbed interface with active underline indicator and instant panel switching in a few lines of JS. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'Tab Bar Navigation — HTML, CSS & JavaScript Tabbed Interface',
      description: `A tab bar is one of the most common UI patterns on the web. Product pages use it to switch between Overview, Details, and Reviews. [Dashboards](/ui-snippets/dashboard-layout/) use it to toggle between Analytics, Settings, and Reports. Web apps use it to organise content without navigating to a new page. Every time you need to show multiple panels of content in the same space, a tab bar is the right pattern — see also the sliding-indicator [animated tabs](/ui-snippets/animated-tabs/) and the [vertical tabs](/ui-snippets/vertical-tabs/) variant.

This snippet gives you a complete, production-ready tab bar in **plain HTML, CSS, and vanilla JavaScript**. Three tab buttons switch three content panels. The active tab shows a coloured bottom border indicator. Clicking any tab instantly hides the previous panel and shows the new one. No libraries, no npm, no build step.

**How the active underline indicator works**

The underline technique used here is a classic CSS trick. The \`.tabs\` container has \`border-bottom: 2px solid #e2e8f0\` — a light grey line across the full width. Each \`.tab\` button sits on top of that line with \`margin-bottom: -2px\`, which means the button overlaps the container border by exactly 2px. The active tab has \`border-bottom: 2px solid #6366f1\` — a coloured border the same thickness as the container line. This coloured border sits exactly on top of the grey container line, visually replacing it for the active tab. The inactive tabs have \`border-bottom: 2px solid transparent\`, so they sit over the grey line without covering it.

**How the panel switching works**

The JavaScript uses a single \`switchTab(btn, panelId)\` function. When a tab is clicked, \`querySelectorAll('.tab').forEach(t => t.classList.remove('active'))\` removes the active class from all tabs, and \`querySelectorAll('.panel').forEach(p => p.classList.remove('active'))\` hides all panels. Then \`btn.classList.add('active')\` and \`document.getElementById(panelId).classList.add('active')\` highlight the clicked tab and show the matching panel. The panels use \`display: none\` and \`display: block\` — simple and reliable.

**Adding more tabs**

To add a fourth tab, add a new \`<button class="tab" onclick="switchTab(this,'p4')">\` in the HTML and a matching \`<div class="panel" id="p4">\` in the panels section. The CSS handles any number of tabs automatically — no changes needed.

**Customising the active colour**

The active indicator colour is \`#6366f1\` (indigo). To change it, find \`.tab.active\` in the CSS panel and update both \`color\` and \`border-bottom-color\` to your brand colour. Change \`.tabs { border-bottom-color }\` if you want to update the inactive line colour too.

**Accessibility improvements**

For a production site, add \`role="tablist"\` to the \`.tabs\` container and \`role="tab"\` to each button. Add \`aria-selected="true"\` to the active tab and \`aria-selected="false"\` to the others — update these in the \`switchTab\` function alongside the classList changes. Add \`role="tabpanel"\` to each panel div. These additions make the tab bar fully usable with keyboard navigation and screen readers.

**Saving your customised version**

After editing the snippet to match your project, click **"Save as"** in the editor header, type a name, and press Enter. The version saves to your browser's IndexedDB and appears in the **Saved** tab in the sidebar. Connect GitHub Gist via the GitHub button to back it up and restore it on any device.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Load the snippet',
          text: 'Click "Tab Bar" in the sidebar Library tab. The HTML, CSS, and JS panels load instantly and the preview shows the three-tab interface.',
        },
        {
          title: 'Click the tabs in the preview',
          text: 'Click Overview, Details, and Reviews in the preview to see the panel switching in action and verify the active underline indicator.',
        },
        {
          title: 'Add or rename tabs',
          text: 'In the HTML panel, update the button text and add new tab/panel pairs. Each button needs a matching panel id. The JS and CSS handle any number of tabs automatically.',
        },
        {
          title: 'Change the active colour',
          text: 'In the CSS panel, update the colour value in .tab.active to match your brand. Change both color and border-bottom-color. The preview updates as you type.',
        },
        {
          title: 'Export in your format',
          text: 'Click "HTML" to download a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind CSS version. "Copy all" copies the full code to clipboard.',
        },
        {
          title: 'Save your version',
          text: 'Click "Save as", type a name, and press Enter. Your tab bar saves to IndexedDB and appears in the Saved tab for future sessions.',
        },
      ],
    },
    features: [
      'Active tab underline using the negative margin border overlap trick — pure CSS',
      'Instant panel switching with querySelectorAll — no animation library needed',
      'display: none / display: block panel toggle — simple and reliable',
      'Add any number of tabs — CSS and JS scale automatically',
      'Live split-pane editor — preview updates as you type, no run button',
      'Export as HTML file, React JSX component, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Save custom versions to IndexedDB via "Save as"',
      'GitHub Gist sync — restore saved snippets on any device',
      'No framework, no npm, no build step required',
    ],
    useCases: [
      {
        icon: 'TABS',
        title: 'Product and content pages',
        desc: 'Organise product details, specs, and reviews into tabs without a page reload. Works in any HTML template, CMS, or web app.',
      },
      {
        icon: 'LEARN',
        title: 'Learn the CSS border overlap trick',
        desc: 'The active underline uses a margin-bottom: -2px technique. Edit the values in the CSS panel and watch the preview to understand exactly how the indicator works.',
      },
      {
        icon: 'FLOW',
        title: 'Prototype tabbed dashboards',
        desc: 'Drop the tab bar into a dashboard prototype to switch between Analytics, Settings, and Reports sections. Test on mobile before committing to a framework.',
      },
      {
        icon: 'DESIGN',
        title: 'Match your brand colours',
        desc: 'Update the active indicator colour in .tab.active to your brand hex. Save under a custom name to reuse across multiple projects.',
      },
      {
        icon: 'ACCESS',
        title: 'Add ARIA tab roles',
        desc: 'Practice adding role="tablist", role="tab", and aria-selected to the markup. The JavaScript switchTab function is the right place to toggle aria-selected alongside classList.',
      },
      {
        icon: 'CODE',
        title: 'Migrate to a React component',
        desc: 'Use the JSX export as a starting point. Replace the inline onclick with useState for the active tab index and map over a tabs array to render panels dynamically.',
      },
    ],
    faqs: [
      {
        q: 'What is a tab bar navigation component?',
        a: 'A tab bar is a UI pattern that lets users switch between multiple content panels without navigating to a new page. One tab is active at a time, its panel is visible, and all other panels are hidden. Tab bars are used on product pages, dashboards, settings screens, and profile pages.',
      },
      {
        q: 'How does the active underline indicator work?',
        a: 'The .tabs container has a 2px grey border-bottom across its full width. Each tab button has margin-bottom: -2px, overlapping the container line. The active tab has a 2px coloured border-bottom that sits exactly on top of the grey line, visually replacing it. Inactive tabs have a transparent border-bottom, so the grey line shows through beneath them.',
      },
      {
        q: 'How do I add more tabs?',
        a: 'Add a new button element with class="tab" and onclick="switchTab(this,\'p4\')" in the .tabs div. Add a matching div with class="panel" and id="p4" in the .panels div. Fill in the content. No CSS or JS changes are needed — both scale to any number of tabs.',
      },
      {
        q: 'How do I change the active tab colour?',
        a: 'Find .tab.active in the CSS panel and update the color and border-bottom-color values to your brand hex. To change the inactive line colour, update border-bottom-color on the .tabs selector.',
      },
      {
        q: 'Can I animate the panel transition?',
        a: 'Yes. Replace display: none / display: block with opacity and a CSS transition. Set .panel { opacity: 0; transition: opacity 0.2s; pointer-events: none; } and .panel.active { opacity: 1; pointer-events: auto; }. The panels will fade in and out instead of snapping.',
      },
      {
        q: 'How do I make this tab bar accessible?',
        a: 'Add role="tablist" to the .tabs div, role="tab" to each button, and aria-selected="true/false" on each tab. Add role="tabpanel" to each panel div. In the switchTab function, update aria-selected alongside classList. This makes the component fully usable with keyboard navigation and screen readers.',
      },
      {
        q: 'Can I use this in React or Vue?',
        a: 'Yes. Click "JSX" to download a React component, or "Tailwind" for a React + Tailwind version. For Vue or Svelte, the HTML pastes directly into a template block. Replace the inline onclick with a component method and manage the active state with reactive data.',
      },
      {
        q: 'Does this tab bar work without JavaScript?',
        a: 'No — the panel switching requires JavaScript to toggle the active class. If you need a zero-JS solution, you can use the CSS :checked hack with hidden radio inputs and sibling selectors, but that approach is more complex and harder to style consistently across browsers.',
      },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out the underline overlap trick on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the tabs each need a negative margin-bottom of -2px to sit on top of the container's border-bottom, and how the transparent versus colored border-bottom on inactive versus active tabs creates the illusion of one continuous underline that jumps between tabs. The same assistant can help optimize it — for instance whether switchTab's two separate querySelectorAll-plus-forEach passes over every tab and panel should be consolidated, or whether adding aria-selected updates alongside the classList changes would meaningfully improve accessibility without extra DOM queries. It's also useful for extending the pattern: ask it to add a sliding underline that animates its position and width between tabs instead of snapping, wire the panels to fade in and out instead of using display none, or add left/right arrow key navigation between tabs. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "tab bar" with an active underline indicator in plain HTML, CSS, and JavaScript using only classList toggling — no framework, no animation library.

Requirements:
- A row of tab buttons sitting directly above a set of content panels, where exactly one tab and its matching panel are active at any time.
- The tab row container must have a colored border-bottom running its full width; every individual tab button must have a negative margin-bottom exactly equal to that border's thickness so each button visually overlaps and sits flush on top of the container's border line.
- Inactive tabs must have a transparent border-bottom of the same thickness as the container's border (so the container's line shows through beneath them), while the active tab must have a colored border-bottom of that same thickness in the accent color, which visually replaces the container's line directly beneath that one tab only.
- Write a single switchTab function, called with the clicked button and a target panel id, that removes the active class from every tab and every panel in one pass each, then adds the active class to just the clicked tab and just the matching panel.
- Panels must toggle between display: none and display: block based on the active class — no opacity or animation in the base version.
- The markup and logic must support adding a fourth, fifth, or further tab/panel pair without any changes to the CSS or JavaScript, purely by adding matching button/panel markup with a new shared id.`,
    },
  },
};

export default tabBar;
