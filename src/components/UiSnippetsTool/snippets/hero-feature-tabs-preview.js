const heroFeatureTabsPreview = {
  id: 'hero-feature-tabs-preview',
  title: 'Hero with Feature Tabs Preview',
  lastmod: '2026-08-23',
  category: 'heroes',
  html: `<section class="ftp-hero">
  <div class="ftp-inner">
    <span class="ftp-badge">One platform, every workflow</span>
    <h1 class="ftp-title">See the whole picture <span>before you decide.</span></h1>
    <p class="ftp-sub">Analytics, automation, and integrations — one login, one bill, zero context-switching.</p>

    <div class="ftp-tabs" id="ftpTabs" role="tablist">
      <button class="ftp-tab active" role="tab" aria-selected="true" data-tab="analytics" type="button">
        <span class="ftp-tab-icon">📊</span>Analytics
      </button>
      <button class="ftp-tab" role="tab" aria-selected="false" data-tab="automation" type="button">
        <span class="ftp-tab-icon">⚡</span>Automation
      </button>
      <button class="ftp-tab" role="tab" aria-selected="false" data-tab="integrations" type="button">
        <span class="ftp-tab-icon">🔗</span>Integrations
      </button>
      <button class="ftp-tab" role="tab" aria-selected="false" data-tab="security" type="button">
        <span class="ftp-tab-icon">🔒</span>Security
      </button>
    </div>

    <div class="ftp-preview" id="ftpPreview">
      <div class="ftp-panel ftp-panel-analytics active">
        <div class="ftp-panel-bar"><span></span><span></span><span></span></div>
        <div class="ftp-panel-title">Live revenue dashboard</div>
        <div class="ftp-chart">
          <div class="ftp-bar" style="height:38%"></div><div class="ftp-bar" style="height:62%"></div>
          <div class="ftp-bar" style="height:48%"></div><div class="ftp-bar" style="height:81%"></div>
          <div class="ftp-bar" style="height:57%"></div><div class="ftp-bar" style="height:93%"></div>
        </div>
        <div class="ftp-panel-stat"><strong>+34%</strong> revenue growth this quarter</div>
      </div>
      <div class="ftp-panel ftp-panel-automation">
        <div class="ftp-panel-bar"><span></span><span></span><span></span></div>
        <div class="ftp-panel-title">Workflow builder</div>
        <div class="ftp-flow">
          <div class="ftp-node">New signup</div><div class="ftp-flow-arrow">→</div>
          <div class="ftp-node">Send welcome email</div><div class="ftp-flow-arrow">→</div>
          <div class="ftp-node">Add to CRM</div>
        </div>
        <div class="ftp-panel-stat"><strong>1,204</strong> workflows running right now</div>
      </div>
      <div class="ftp-panel ftp-panel-integrations">
        <div class="ftp-panel-bar"><span></span><span></span><span></span></div>
        <div class="ftp-panel-title">Connected tools</div>
        <div class="ftp-grid">
          <div class="ftp-tile">Slack</div><div class="ftp-tile">Stripe</div><div class="ftp-tile">Notion</div>
          <div class="ftp-tile">Figma</div><div class="ftp-tile">GitHub</div><div class="ftp-tile">HubSpot</div>
        </div>
        <div class="ftp-panel-stat"><strong>120+</strong> native integrations</div>
      </div>
      <div class="ftp-panel ftp-panel-security">
        <div class="ftp-panel-bar"><span></span><span></span><span></span></div>
        <div class="ftp-panel-title">Compliance center</div>
        <div class="ftp-checklist">
          <div class="ftp-check-row"><span>✓</span>SOC 2 Type II</div>
          <div class="ftp-check-row"><span>✓</span>GDPR compliant</div>
          <div class="ftp-check-row"><span>✓</span>SSO / SAML</div>
        </div>
        <div class="ftp-panel-stat"><strong>99.99%</strong> uptime SLA</div>
      </div>
    </div>
  </div>
</section>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f6f7fb; }

.ftp-hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 48px 24px; }
.ftp-inner { max-width: 760px; width: 100%; text-align: center; }

.ftp-badge { display: inline-block; padding: 6px 14px; background: #ede9fe; color: #6d28d9; border-radius: 999px; font-size: 12.5px; font-weight: 700; }
.ftp-title { margin-top: 18px; font-size: 38px; font-weight: 800; line-height: 1.18; letter-spacing: -0.02em; color: #1e1b2e; }
.ftp-title span { color: #7c3aed; }
.ftp-sub { margin: 14px auto 0; max-width: 480px; font-size: 15px; line-height: 1.6; color: #64748b; }

.ftp-tabs { display: flex; gap: 6px; justify-content: center; margin-top: 32px; background: #ece9f6; padding: 6px; border-radius: 14px; flex-wrap: wrap; }
.ftp-tab { display: flex; align-items: center; gap: 7px; padding: 10px 16px; border: none; background: transparent; color: #6b6480; font-family: inherit; font-size: 13.5px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: background .15s, color .15s; }
.ftp-tab:hover { color: #1e1b2e; }
.ftp-tab.active { background: #fff; color: #7c3aed; box-shadow: 0 2px 8px rgba(124, 58, 237, 0.12); }
.ftp-tab-icon { font-size: 15px; }

.ftp-preview { margin-top: 20px; position: relative; text-align: left; }
.ftp-panel { display: none; background: #171325; border-radius: 18px; padding: 22px 24px; box-shadow: 0 20px 50px rgba(23, 19, 37, 0.18); }
.ftp-panel.active { display: block; animation: ftpFadeIn .25s ease; }
@keyframes ftpFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.ftp-panel-bar { display: flex; gap: 6px; margin-bottom: 16px; }
.ftp-panel-bar span { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.15); }
.ftp-panel-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 16px; }
.ftp-panel-stat { margin-top: 18px; font-size: 12.5px; color: #a5a0bd; }
.ftp-panel-stat strong { color: #c4b5fd; font-size: 15px; }

.ftp-chart { display: flex; align-items: flex-end; gap: 8px; height: 90px; }
.ftp-bar { flex: 1; border-radius: 5px 5px 0 0; background: linear-gradient(180deg, #a78bfa, #7c3aed); }

.ftp-flow { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ftp-node { background: rgba(167, 139, 250, 0.15); color: #ddd6fe; border: 1px solid rgba(167, 139, 250, 0.3); padding: 9px 13px; border-radius: 9px; font-size: 12.5px; font-weight: 600; }
.ftp-flow-arrow { color: #6d28d9; font-size: 14px; }

.ftp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.ftp-tile { background: rgba(255,255,255,0.06); color: #ddd6fe; text-align: center; padding: 12px 8px; border-radius: 9px; font-size: 12.5px; font-weight: 600; }

.ftp-checklist { display: flex; flex-direction: column; gap: 10px; }
.ftp-check-row { display: flex; align-items: center; gap: 9px; color: #ddd6fe; font-size: 13px; font-weight: 600; }
.ftp-check-row span { width: 20px; height: 20px; border-radius: 50%; background: rgba(74, 222, 128, 0.18); color: #4ade80; font-size: 11px; font-weight: 900; display: flex; align-items: center; justify-content: center; }

@media (max-width: 560px) {
  .ftp-title { font-size: 27px; }
  .ftp-tabs { gap: 4px; }
  .ftp-tab { padding: 9px 11px; font-size: 12.5px; }
}`,
  js: `const tabs = document.querySelectorAll('.ftp-tab');
const panels = document.querySelectorAll('.ftp-panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-tab');

    // Real tab-switching: update ARIA state and swap the active panel
    tabs.forEach((t) => {
      t.classList.toggle('active', t === tab);
      t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
    });

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.classList.contains('ftp-panel-' + target));
    });
  });
});`,
  seo: {
    title: 'Hero with Feature Tabs Preview — Free HTML CSS JS Snippet',
    description: 'A hero with clickable feature tabs that swap a live preview panel below — real tab-switching logic with distinct mock content per tab. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Hero with Feature Tabs Preview — Clickable Tabs That Actually Swap the Preview',
      description: `A product with several strong features has a real problem in the hero: pick one to show, and the others go unseen above the fold. This snippet solves it with clickable feature tabs — Analytics, Automation, Integrations, Security — where clicking a tab genuinely swaps a mock preview panel below it, each with distinct content, not just a static row of labels.

**Real tab logic, not a decorative row**

Every tab click runs a real state update: the clicked tab gets \`.active\` and \`aria-selected="true"\`, every other tab loses both, and the matching panel (matched by a \`data-tab\` attribute against a \`ftp-panel-{name}\` class) gets \`.active\` while the rest lose it. Nothing here is faked with \`:hover\` or a CSS-only accordion — it's a genuine click-driven state machine with four possible states, and the ARIA \`role="tablist"\`/\`role="tab"\`/\`aria-selected\` attributes track that state for assistive tech too.

**Each panel shows genuinely different mock content**

Rather than swapping a headline and reusing the same layout, each of the four panels has its own distinct visual structure: Analytics shows a small CSS bar chart, Automation shows a horizontal workflow of connected nodes, Integrations shows a grid of tool-name tiles, and Security shows a checklist of compliance items. This variety is what sells the "one platform, every workflow" pitch — a visitor clicking through sees genuinely different capability, not the same box relabeled four times.

**A subtle entrance on every switch**

Each panel swap plays a short \`ftpFadeIn\` keyframe (opacity and a small \`translateY\`) rather than snapping in instantly, which gives the switch a sense of the new content actually arriving rather than the old content just disappearing. Because only the active panel is ever \`display: block\`, the layout never shows two panels stacked mid-transition.

**Segmented-control tab styling**

The tab row sits in a rounded grey pill container with individual tabs that get a white background and subtle shadow when active — the segmented-control pattern (iOS settings, macOS System Preferences) that makes the current selection unambiguous at a glance without needing an underline indicator.

**Customizing it**

Replace the four feature names, icons, and panel content with your own product's capabilities — keep each panel visually distinct so the tabs earn their click. Add a fifth tab by duplicating a \`.ftp-tab\` button and a matching \`.ftp-panel\` with a new \`data-tab\`/class pair; the click handler works for any number of tabs since it iterates over whatever's present in the DOM.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A hero renders with four feature tabs and an Analytics preview panel showing by default.` },
      { title: 'Click a different tab', text: `The tab's active state updates, and the preview panel swaps to that tab's distinct mock content with a fade-in.` },
      { title: 'Check the ARIA state', text: `Inspect aria-selected on the tabs — it updates in sync with the visual active state.` },
      { title: 'Replace the panel content', text: `Edit each .ftp-panel-{name} block to show your product's real feature preview.` },
      { title: 'Add or remove a tab', text: `Duplicate a .ftp-tab and its matching .ftp-panel with a consistent data-tab value.` },
      { title: 'Retheme it', text: `Swap the purple accent and dark panel background for your brand colors.` },
    ] },
    features: [
      { title: 'Real tab-switching logic', text: `A genuine click-driven state update, not a CSS-only hover trick.` },
      { title: 'Four distinct panel layouts', text: `Bar chart, workflow diagram, tile grid, and checklist — each visually different.` },
      { title: 'ARIA tab semantics', text: `role="tablist"/"tab" and aria-selected track state for assistive tech.` },
      { title: 'Fade-in panel transition', text: `A short keyframe on every switch instead of an instant snap.` },
      { title: 'Segmented-control tab styling', text: `A rounded pill container with a white active-tab background.` },
      { title: 'Data-attribute matching', text: `data-tab pairs a tab to its panel, scaling to any number of tabs.` },
      { title: 'Icon-labeled tabs', text: `A small emoji icon per tab reinforces what each preview covers.` },
      { title: 'Responsive tab wrapping', text: `Tabs shrink and wrap gracefully on narrow screens.` },
    ],
    useCases: [
      { title: 'Multi-feature SaaS heroes', text: 'Show breadth of capability above the fold, with tabs for Analytics, Automation, Integrations and Security each swapping in a distinct mock panel.' },
      { title: 'Platform and suite pages', text: 'Pair with a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/) lower on the page so the hero introduces and the section explores.' },
      { title: 'Developer tool landing pages', text: 'Swap panels for code, API and CLI views, using `role="tablist"` and `aria-selected` so assistive technology tracks the active tab.' },
      { title: 'Enterprise comparison pages', text: 'Use the Security tab to answer buyer concerns early, with a short fade-in keyframe on every switch rather than an abrupt snap.' },
      { title: 'Onboarding and product tours', text: 'Preview each core workflow in turn, as a reference for accessible tab and panel patterns with genuine click-driven state.' },
      { icon: 'CODE', title: 'Related: Product Launch Countdown Hero', desc: 'See the [Product Launch Countdown Hero](/ui-snippets/hero-countdown-launch/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the tab switching real, or is it a CSS-only hover effect?', a: `It's real click-driven JavaScript. Clicking a tab runs a function that toggles the .active class and aria-selected attribute across all tabs, and toggles .active on the matching panel by comparing each panel's class against the clicked tab's data-tab attribute. No hover state is involved — the selection persists until another tab is clicked.` },
      { q: 'Why does each panel have completely different content instead of reusing one layout?', a: `A row of tabs that all reveal the same box with different text doesn't demonstrate breadth — it just relabels one thing four times. Giving Analytics a bar chart, Automation a workflow diagram, Integrations a tile grid, and Security a checklist makes each click show genuinely different product surface, which is what actually sells a "does everything" pitch.` },
      { q: 'How do I add a fifth tab?', a: `Duplicate a .ftp-tab button with a new data-tab value (for example "reporting"), and duplicate a .ftp-panel div with a matching ftp-panel-reporting class alongside ftp-panel. The existing click handler works for any number of tabs since it queries all .ftp-tab and .ftp-panel elements at load time and matches them by the shared name.` },
      { q: 'Does the tab list meet basic accessibility expectations?', a: `The tab container has role="tablist", each tab has role="tab" with aria-selected kept in sync with the actual visual state, and tabs are real <button> elements so they're keyboard-focusable and clickable via Enter/Space by default. For full tab-panel accessibility, you'd also add aria-controls on each tab pointing to its panel's id and arrow-key navigation between tabs — a reasonable next step to layer on.` },
      { q: 'How do I use this hero in React, Vue, or Angular?', a: `Hold the active tab name in state (a string like "analytics"). Each tab's onClick sets that state; each panel's visibility class is derived by comparing its own name to the state value. Bind aria-selected the same way. The panel content, fade-in animation, and tab styling all port unchanged as static markup and CSS.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to wire up the tab-and-panel matching logic from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the data-tab attribute on each tab button gets matched against each panel's class name to decide which one becomes active, and why giving each panel a genuinely distinct layout (chart, workflow, grid, checklist) makes the feature pitch more convincing than reusing one box with swapped text. The same assistant can help you round out the accessibility — ask it to add aria-controls linking each tab to its panel's id, and arrow-key navigation between tabs per the WAI-ARIA tabs pattern. It's also useful for extending the interaction: ask it to auto-advance through the tabs on a timer if the visitor hasn't interacted yet, or to deep-link the active tab to a URL hash so it can be shared or bookmarked. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a marketing hero with clickable feature tabs and a swapping preview panel in plain HTML, CSS, and JavaScript — no framework, no tab library.

Requirements:
- A centered hero with a badge, headline, subheading, and below that a row of four tab buttons styled as a segmented control (a rounded grey pill container, with the active tab getting a white background and subtle shadow), each with a small icon and label.
- Below the tabs, a preview area that shows exactly one panel at a time based on which tab is selected. Give each of the four panels a genuinely distinct visual layout representing a different feature (for example: a small CSS bar chart for an analytics panel, a horizontal flow of connected steps for an automation panel, a grid of labeled tiles for an integrations panel, and a checklist with checkmark icons for a security/compliance panel) — not the same box with different text.
- Implement real click-driven tab switching in JavaScript: clicking a tab must update that tab's active/selected visual state and aria-selected attribute, clear those states from the other tabs, and toggle visibility so only the matching panel is shown, matched via a shared data attribute between each tab and its panel.
- Use proper ARIA tab semantics: role="tablist" on the tab container, role="tab" on each tab button, and aria-selected kept accurate on every click, not just set once at load.
- Give the panel a short fade/slide-in CSS keyframe animation that plays every time the visible panel changes, so a switch feels like new content arriving rather than snapping in instantly.
- Make it responsive: the tab row should wrap or shrink gracefully on narrow screens without breaking the segmented-control look.`,
    },
  },
};

export default heroFeatureTabsPreview;
