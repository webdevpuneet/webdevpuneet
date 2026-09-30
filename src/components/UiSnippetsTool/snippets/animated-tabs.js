const animatedTabs = {
    id: 'animated-tabs',
    title: 'Animated Tabs with Indicator',
    category: 'navigation',
    html: `<div class="demo">
  <div class="tabs" id="tabs">
    <button class="tab active" onclick="switchTab(this,0)">Overview</button>
    <button class="tab" onclick="switchTab(this,1)">Features</button>
    <button class="tab" onclick="switchTab(this,2)">Pricing</button>
    <button class="tab" onclick="switchTab(this,3)">Docs</button>
    <div class="indicator" id="indicator"></div>
  </div>
  <div class="panels">
    <div class="panel active"><h3>Product Overview</h3><p>A high-level summary of what the product does and who it's for. Start here if you're new.</p></div>
    <div class="panel"><h3>Key Features</h3><p>Deep dive into individual features — integrations, automations, custom workflows, and API access.</p></div>
    <div class="panel"><h3>Pricing Plans</h3><p>Compare Starter, Pro, and Team plans. All include a 14-day free trial with no credit card required.</p></div>
    <div class="panel"><h3>Documentation</h3><p>Full API reference, SDK guides, tutorials, and example projects to get you up and running fast.</p></div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.demo { width: 100%; max-width: 520px; }

.tabs {
  display: flex; position: relative;
  background: #e2e8f0; border-radius: 10px;
  padding: 4px; gap: 2px; margin-bottom: 20px;
}

.tab {
  flex: 1; padding: 8px 10px; font-size: 13px; font-weight: 600;
  color: #64748b; background: none; border: none; cursor: pointer;
  border-radius: 7px; position: relative; z-index: 1;
  transition: color 0.2s; font-family: inherit; white-space: nowrap;
}
.tab.active { color: #1e293b; }

.indicator {
  position: absolute; top: 4px; bottom: 4px;
  background: #fff; border-radius: 7px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  transition: left 0.25s cubic-bezier(0.4,0,0.2,1), width 0.25s cubic-bezier(0.4,0,0.2,1);
  pointer-events: none;
}

.panels { }
.panel { display: none; animation: fadeIn 0.2s ease; }
.panel.active { display: block; }
.panel h3 { font-size: 16px; font-weight: 700; color: #1e293b; margin-bottom: 8px; }
.panel p  { font-size: 14px; color: #64748b; line-height: 1.65; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }`,
    js: `function switchTab(btn, idx) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.panel')[idx].classList.add('active');
  moveIndicator(btn);
}

function moveIndicator(btn) {
  const tabsEl = document.getElementById('tabs');
  const ind    = document.getElementById('indicator');
  const rect   = btn.getBoundingClientRect();
  const pRect  = tabsEl.getBoundingClientRect();
  ind.style.left  = (rect.left - pRect.left) + 'px';
  ind.style.width = rect.width + 'px';
}

// Init on load
const firstTab = document.querySelector('.tab.active');
if (firstTab) moveIndicator(firstTab);
window.addEventListener('resize', () => {
  const active = document.querySelector('.tab.active');
  if (active) moveIndicator(active);
});`,

  seo: {
    title: 'Animated Tabs — Free HTML CSS JS Sliding Pill Snippet',
    description: 'Tabs with a sliding pill indicator positioned from offsetLeft and offsetWidth — works for any label length. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Animated Tabs — Sliding Pill via offsetLeft/offsetWidth & Panel Active Class',
      description: `Animated tabs replace the basic underline indicator of the standard [tab bar](/ui-snippets/tab-bar/) with a sliding pill background that smoothly glides between tabs when clicked. The pill communicates transition direction and gives the interface a premium, physically responsive quality — for stacked tabs, see the [vertical tabs](/ui-snippets/vertical-tabs/); for a two-option switch, the [segmented control](/ui-snippets/segmented-control/).

**The sliding indicator**

A \`.indicator\` div sits inside the \`.tabs\` container with \`position: absolute; transition: left 0.2s, width 0.2s\`. \`moveIndicator(btn)\` reads the clicked tab's \`offsetLeft\` and \`offsetWidth\` — the tab's pixel position and size relative to the container — and assigns them to \`indicator.style.left\` and \`indicator.style.width\`. The CSS transition animates the pill to the new position. This correctly handles tabs of different widths.

**Why offsetLeft/offsetWidth instead of a class**

The indicator's position is dynamic — it depends on the exact pixel dimensions of each tab. A CSS class can't encode runtime pixel values. Using \`offsetLeft\` and \`offsetWidth\` reads the actual rendered size, so tabs with longer labels get a wider pill automatically.

**Panel switching**

\`switchTab(btn, idx)\` removes \`.active\` from all tabs and panels, then adds \`.active\` to the clicked tab and the panel at index \`idx\`. The panel uses a \`opacity + transform\` transition on \`.panel.active\` for a fade-in effect. The idx parameter maps each tab button to its corresponding panel by DOM order.

**Adding tabs**

Add a new \`.tab\` button and a matching \`.panel\` div. The JS uses \`querySelectorAll\` and numeric index — the order in the HTML determines the mapping.

**The offsetLeft/offsetWidth technique**

The pill indicator reads the active tab button's actual pixel position using offsetLeft and offsetWidth — values that the browser computes after layout. Setting pill.style.left = btn.offsetLeft + 'px' and pill.style.width = btn.offsetWidth + 'px' positions and sizes the pill to exactly match the active tab. CSS transition: left 0.2s, width 0.2s animates between positions. This approach handles any tab label length, any font size, and any number of tabs automatically — no hardcoded positions needed.

**Panel switching**

Each tab button has a data-panel attribute matching a panel ID. Clicking a tab: (1) removes .active from all tab buttons, (2) adds .active to the clicked button, (3) hides all panels, (4) shows the matching panel. The panel switch is instant (no animation) while the pill indicator slides smoothly — this matches the expected tab behaviour where content switches immediately but the indicator communicates which tab was clicked.

**Accessible implementation**

Add role="tablist" to the tab container, role="tab" to each button, and role="tabpanel" to each panel. Add aria-selected="true/false" to tab buttons and aria-hidden="true/false" to panels. Add aria-controls on each tab pointing to its panel ID, and aria-labelledby on each panel pointing to its tab ID.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click each tab', text: 'Click Design, Development, and Marketing tabs to see the pill indicator slide smoothly between them and the panel content switch.' },
        { title: 'Update tab labels and panel content', text: 'In the HTML panel, change the tab button text and each .panel div content.' },
        { title: 'Add a fourth tab', text: 'Add a .tab button and a matching .panel div. The JS uses index order automatically.' },
        { title: 'Change animation speed', text: 'Update 0.2s on transition: left, width in the CSS .indicator rule.' },
        { title: 'Change indicator colour', text: 'Update background: #fff on .indicator to any colour.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Sliding pill indicator via indicator.style.left = btn.offsetLeft + "px"',
      'indicator.style.width = btn.offsetWidth + "px" — adapts to tab label length',
      'CSS transition: left 0.2s, width 0.2s on .indicator — smooth pill slide',
      'Panel .active class switch with opacity + transform fade-in transition',
      'Index-based tab-to-panel mapping via querySelectorAll and numeric idx',
      'Pill background on dark tab container: #e2e8f0 container, white pill',
      'Tabs use flex: 1 for equal-width distribution',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'TABS',   title: 'Product detail tabbed navigation',   desc: 'A more polished version of the Tab Bar snippet. The sliding pill gives clear visual feedback about which tab is active and the direction of navigation.' },
      { icon: 'APP',    title: 'Settings and preference panels',     desc: 'Organise settings into categories with animated tabs. The sliding indicator makes the active section unmistakable even in complex UIs.' },
      { icon: 'LEARN',  title: 'Learn offsetLeft and offsetWidth',   desc: 'The sliding indicator reads the tab element\'s actual pixel position and size. Edit the indicator move function to understand how DOM geometry APIs work.' },
      { icon: 'DESIGN', title: 'Dashboard section switcher',         desc: 'Use animated tabs to switch between Overview, Analytics, and Reports sections. The premium slide animation signals a polished dashboard product.' },
      { icon: 'FLOW',   title: 'Onboarding step switcher',          desc: 'Use as a step indicator in an onboarding flow. The sliding pill communicates progress through sections more clearly than a simple underline.' },
      { icon: 'CODE',   title: 'Drop-in replacement for basic tabs', desc: 'The HTML structure is identical to the Tab Bar snippet. Swap in the animated indicator by replacing the simple border-bottom with the sliding pill CSS and JS.' },
      { icon: 'CODE', title: 'Related: Breadcrumb Trail with Collapsing Middle Items', desc: 'See the [Breadcrumb Trail with Collapsing Middle Items](/ui-snippets/breadcrumbs/) for a related navigation pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Icon Rail with Flyout Submenu', desc: 'See the [Icon Rail with Flyout Submenu](/ui-snippets/flyout-icon-rail-nav/) for a related navigation pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Drill-Down Settings Navigation', desc: 'See the [Drill-Down Settings Navigation](/ui-snippets/drill-down-settings-nav/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the pill indicator slide to the correct position?', a: 'moveIndicator(btn) reads btn.offsetLeft (the tab\'s left pixel position relative to .tabs) and btn.offsetWidth (the tab\'s width). It sets indicator.style.left and indicator.style.width to these values. CSS transition: left 0.2s, width 0.2s animates between positions.' },
      { q: 'Why use offsetLeft/offsetWidth instead of a class?', a: 'The indicator position needs to match the exact pixel location and size of each tab — values that depend on the rendered tab label length. CSS classes cannot encode runtime pixel values. offsetLeft and offsetWidth read the actual DOM geometry.' },
      { q: 'How do I add a new tab?', a: 'Add a <button class="tab" onclick="switchTab(this, N)">Label</button> where N is the zero-based panel index. Add a matching <div class="panel">content</div>. The querySelectorAll picks up new tabs automatically.' },
      { q: 'How do I start on a specific tab?', a: 'Call switchTab(document.querySelectorAll(".tab")[N], N) after the JS code to open the Nth tab on page load.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. In React, manage activeTab in useState. Use useRef on the indicator element and read the active tab button\'s offsetLeft/offsetWidth in a useEffect after state changes to update the indicator position.' },
      { q: 'How is this different from the Tab Bar snippet?', a: 'The Tab Bar uses a CSS border-bottom underline indicator. Animated Tabs uses a sliding pill background. The pill is more visually prominent and communicates transition direction. The panel switching logic is similar in both.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the geometry calls by hand — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why moveIndicator reads offsetLeft and offsetWidth from the clicked button rather than using hardcoded percentage widths, and what would visually break for tabs with unequal label lengths if those measurements were skipped. The same assistant is useful for optimizing it — asking whether the resize listener recalculating the indicator position on every resize event needs throttling for smoother behavior on window drag. It's just as good for extending the tabs: ask it to add full ARIA tablist semantics with keyboard arrow-key navigation between tabs, animate the panel transition with a directional slide instead of a plain fade, or make the tab list horizontally scrollable with the indicator staying correctly positioned when tabs overflow. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build "animated tabs" with a sliding pill indicator in plain HTML, CSS, and JavaScript — no libraries, using measured DOM geometry rather than fixed-width assumptions.

Requirements:
- A row of tab buttons inside a relatively-positioned container, plus one absolutely-positioned indicator element that sits behind the tab labels (lower z-index) and shares the same rounded shape as an individual tab.
- Clicking a tab must: remove an active class from all tabs and panels, add it to the clicked tab and its corresponding panel (mapped by array index, not by guessing from text), and reposition the indicator to sit exactly behind the newly active tab.
- The indicator's position and size must be computed by reading the clicked tab button's real offsetLeft (relative to the tab container) and offsetWidth at click time and writing those directly as the indicator's left and width styles — do not hardcode indicator positions or assume equal-width tabs, since tab labels vary in length.
- Both the left and width changes must be CSS-transitioned together with a shared duration and easing so the pill smoothly slides and resizes in one motion between tabs of different widths.
- On page load, position the indicator under whichever tab starts marked active (without requiring a click), and add a window resize listener that recalculates and repositions the indicator under the currently active tab whenever the viewport changes, since tab widths may change responsively.
- Panels must switch their visibility instantly via a CSS display or active-class toggle (not animated in sync with the pill), but should play a brief fade-and-rise-in transition each time a panel becomes active, independent from the indicator's slide animation.`,
    },
  }
};

export default animatedTabs;