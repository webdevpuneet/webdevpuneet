const featureSpotlightTabs = {
  id: 'feature-spotlight-tabs',
  title: 'Feature Spotlight Tabs',
  lastmod: '2026-07-18',
  category: 'layouts',
  html: `<section class="fst-section">
  <h2 class="fst-heading">Everything in one workspace</h2>

  <div class="fst-layout">
    <div class="fst-tabs" id="fstTabs" role="tablist" aria-label="Features"></div>

    <div class="fst-stage">
      <div class="fst-visual" id="fstVisual"></div>
    </div>
  </div>
</section>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 24px; }

.fst-section { width: 100%; max-width: 880px; }
.fst-heading { font-size: 30px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; text-align: center; margin-bottom: 34px; }

.fst-layout { display: grid; grid-template-columns: 320px 1fr; gap: 28px; align-items: start; }

.fst-tabs { display: flex; flex-direction: column; gap: 10px; }
.fst-tab {
  position: relative;
  display: flex; align-items: flex-start; gap: 13px;
  padding: 16px 16px 16px 18px;
  background: #fff; border: 1px solid #e8edf3; border-radius: 13px;
  cursor: pointer; text-align: left; font-family: inherit;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
}
.fst-tab:hover { transform: translateX(2px); }
.fst-tab.active { border-color: #c7d2fe; box-shadow: 0 10px 30px rgba(99, 102, 241, 0.1); }
.fst-tab::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: #6366f1; transform: scaleY(0); transform-origin: top;
  transition: transform 0.3s ease;
}
.fst-tab.active::before { transform: scaleY(1); }

.fst-ico {
  width: 38px; height: 38px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: #eef2ff; border-radius: 10px; color: #6366f1;
  transition: background 0.2s, color 0.2s;
}
.fst-tab.active .fst-ico { background: #6366f1; color: #fff; }
.fst-ico svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

.fst-tab-text h3 { font-size: 15px; font-weight: 700; color: #0f172a; }
.fst-tab-text p { font-size: 13px; line-height: 1.5; color: #64748b; margin-top: 3px; }

.fst-stage {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  min-height: 340px;
  background: #0f172a;
}
.fst-visual {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  padding: 30px;
  color: #fff; font-size: 30px; font-weight: 800; letter-spacing: -0.01em;
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.fst-visual.swap { opacity: 0; transform: translateY(12px); }

@media (max-width: 720px) {
  .fst-layout { grid-template-columns: 1fr; }
  .fst-stage { min-height: 240px; order: -1; }
}`,
  js: `const FEATURES = [
  { icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>', title: 'Unified dashboard', desc: 'Every metric on one screen.', label: 'Dashboard', bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { icon: '<path d="M12 20v-6M6 20V10M18 20V4"/>', title: 'Live analytics', desc: 'Real-time charts that update as data flows in.', label: 'Analytics', bg: 'linear-gradient(135deg,#0ea5e9,#22d3ee)' },
  { icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>', title: 'Team collaboration', desc: 'Comment, assign, and resolve together.', label: 'Teams', bg: 'linear-gradient(135deg,#16a34a,#84cc16)' },
  { icon: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>', title: 'Automations', desc: 'Trigger workflows without code.', label: 'Automations', bg: 'linear-gradient(135deg,#f97316,#ec4899)' },
];

const tabsWrap = document.getElementById('fstTabs');
const visual = document.getElementById('fstVisual');
let active = 0;

function paint(i) {
  const f = FEATURES[i];
  visual.classList.add('swap');
  setTimeout(() => {
    visual.style.background = f.bg;
    visual.textContent = f.label;
    visual.classList.remove('swap');
  }, 180);
}

function select(i) {
  if (i === active) return;
  active = i;
  [...tabsWrap.children].forEach((t, ti) => {
    t.classList.toggle('active', ti === i);
    t.setAttribute('aria-selected', ti === i);
  });
  paint(i);
}

FEATURES.forEach((f, i) => {
  const tab = document.createElement('button');
  tab.className = 'fst-tab' + (i === 0 ? ' active' : '');
  tab.type = 'button';
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-selected', i === 0);
  tab.innerHTML =
    '<span class="fst-ico"><svg viewBox="0 0 24 24" aria-hidden="true">' + f.icon + '</svg></span>' +
    '<span class="fst-tab-text"><h3>' + f.title + '</h3><p>' + f.desc + '</p></span>';
  tab.addEventListener('click', () => select(i));
  tabsWrap.appendChild(tab);
});

// Keyboard support across the tablist
tabsWrap.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  e.preventDefault();
  const dir = e.key === 'ArrowDown' ? 1 : -1;
  const next = (active + dir + FEATURES.length) % FEATURES.length;
  select(next);
  tabsWrap.children[next].focus();
});

// Initialise the stage
visual.style.background = FEATURES[0].bg;
visual.textContent = FEATURES[0].label;`,
  seo: {
    title: 'Feature Spotlight Tabs — Free HTML CSS JS Snippet',
    description: 'A vertical feature-tabs layout where selecting a tab cross-fades a paired visual, with active accent rail and keyboard nav. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Feature Spotlight Tabs — Vertical Feature Selector with Paired Cross-Fading Visual',
      description: `Marketing pages need to explain several features without turning into an endless scroll. The feature-spotlight-tabs pattern solves this elegantly: a vertical list of feature tabs on one side, a large visual stage on the other, and selecting a tab swaps the visual to match. The visitor controls the pace, sees one feature at a time in detail, and the whole section stays compact. This is the layout Stripe, Notion, and most modern SaaS sites use for their "here's what it does" block. This component implements it in HTML, CSS, and vanilla JavaScript, driven by a single features array.

**The two-column layout that stacks**

The section is a CSS grid with a fixed \`320px\` tab column and a flexible visual stage (\`grid-template-columns: 320px 1fr\`). \`align-items: start\` keeps the tab list from stretching to the stage's height. At 720px a media query collapses it to a single column and reorders the stage above the tabs with \`order: -1\`, so on mobile the visual leads and the tappable feature list follows — the natural reading order for a small screen.

**Tabs with an animated accent rail**

Each tab is a card with an icon tile, a title, and a one-line description. The active tab is marked three ways: a lifted shadow and tinted border, an icon tile that inverts to a filled accent colour, and an accent rail that grows down the left edge. That rail is a \`::before\` pseudo-element scaled with \`transform: scaleY(0)\` to \`scaleY(1)\` and \`transform-origin: top\`, so it wipes in from the top when the tab activates rather than just appearing — a small motion detail that signals which feature is selected. Hovering any tab nudges it a couple of pixels right for tactile feedback.

**Cross-fading the paired visual**

Selecting a tab does not snap the visual — it cross-fades. The \`paint()\` function adds a \`.swap\` class that fades the stage to \`opacity: 0\` and nudges it down 12px, then in a \`setTimeout\` it swaps the content and background and removes the class, easing the new visual back in. The timeout is matched to the CSS transition so the swap happens while the stage is invisible. Here the visuals are coloured gradient panels with a label, standing in for what would be product screenshots, animations, or videos in production.

**Data-driven from one array**

Everything is generated from a \`FEATURES\` array of \`{ icon, title, desc, label, bg }\` objects. The script builds each tab — including its inline SVG icon — attaches the click handler, and renders the matching visual. Adding a feature is one array entry; there is no markup to duplicate and no risk of the tabs and visuals drifting out of sync because they share the same index. A guard in \`select()\` ignores clicks on the already-active tab so there is no needless re-fade.

**Accessible tablist with keyboard support**

The tabs use \`role="tab"\` inside a \`role="tablist"\` container, and the active tab carries \`aria-selected="true"\`. The tab list listens for \`ArrowDown\` and \`ArrowUp\` and moves the selection (with wrap-around via modulo) plus focus to the next tab — the keyboard interaction screen-reader and keyboard users expect from a vertical tablist. Because every tab is a real \`<button>\`, it is focusable and clickable without any extra wiring.

**Customisation**

Replace the \`FEATURES\` array with your real features — give each an inline SVG icon path, a title, a description, and a visual. To use real media instead of gradient panels, set the visual to an \`<img>\` or \`<video>\` and swap the \`paint()\` function to change its \`src\`. Adjust the cross-fade timing (CSS transition plus the matching JS timeout), swap the \`#6366f1\` accent used by the rail, active icon, and active border, and change the stage \`min-height\` to fit your visuals. To auto-advance like a carousel, add a \`setInterval\` that calls \`select((active + 1) % FEATURES.length)\` and pause it on hover.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A two-column section renders with a vertical list of feature tabs and a large visual stage showing the first feature.` },
      { title: 'Click a feature tab', text: `The accent rail wipes down its left edge, its icon fills with the accent colour, and the stage cross-fades to that feature's visual.` },
      { title: 'Use arrow keys', text: `Focus a tab and press Up/Down to move the selection with wrap-around; focus follows the active tab.` },
      { title: 'Resize to mobile', text: `Below 720px the layout stacks to one column with the visual on top and the feature list beneath.` },
      { title: 'Edit the features', text: `Change the FEATURES array — each entry's icon, title, description, and visual render automatically and stay index-matched.` },
      { title: 'Use real media', text: `Swap the gradient panels for an <img> or <video> in the stage and update paint() to change its src, then theme the accent.` },
    ]},
    features: [
      { title: 'Vertical feature tabs', text: `A scannable list of feature cards with icon, title, and description on one side of the section.` },
      { title: 'Paired cross-fading visual', text: `Selecting a tab fades the large stage out and the matching visual in over 350ms instead of a hard cut.` },
      { title: 'Animated accent rail', text: `The active tab's left rail wipes in with transform: scaleY from the top for a clear selection signal.` },
      { title: 'Inverting icon tile', text: `Each tab's icon tile flips from tinted to a filled accent when active, reinforcing the current feature.` },
      { title: 'Data-driven', text: `One FEATURES array builds every tab, icon, and visual, so adding a feature is a single entry.` },
      { title: 'Index-locked sync', text: `Tabs and visuals share an index, so they can never drift out of step.` },
      { title: 'Accessible tablist', text: `role=tablist/tab and aria-selected with ArrowUp/Down keyboard navigation and wrap-around.` },
      { title: 'Responsive reorder', text: `Stacks to one column under 720px with the visual moved above the tabs for mobile reading order.` },
    ],
    useCases: [
      { title: 'SaaS feature sections', text: `Explain several product capabilities in a compact, self-paced block — pair it with a [pricing card](/ui-snippets/pricing-card/) and a [testimonial carousel](/ui-snippets/testimonial-carousel/) further down the page.` },
      { title: 'Product tours and how-it-works', text: `Walk visitors through key features with a matching screenshot for each; compare with the [feature tabs showcase](/ui-snippets/feature-tabs-showcase/) for a horizontal variant.` },
      { title: 'App landing pages', text: `Showcase screens of a mobile or web app, swapping a device mockup as each feature is selected.` },
      { title: 'Comparison and capability grids', text: `Highlight what sets your product apart, one differentiator per tab.` },
      { title: 'Documentation overviews', text: `Give an at-a-glance tour of a tool's main areas before users dive into the docs; complements an [animated tabs](/ui-snippets/animated-tabs/) component.` },
      { title: 'Learning tablist patterns', text: `A reference for index-driven tabs, cross-fade swaps, and accessible vertical tablist keyboard navigation.` },
      { icon: 'CODE', title: 'Related: Magazine Asymmetric Grid Layout', desc: 'See the [Magazine Asymmetric Grid Layout](/ui-snippets/magazine-asymmetric-grid-layout/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I show real screenshots or videos instead of gradient panels?', a: `Put an <img> or <video> inside .fst-visual and add a src/poster field to each FEATURES entry. In paint(), instead of setting textContent and background, set the media element's src during the .swap window (while it is faded out) so the new asset loads before fading in. Preload upcoming images if the swap should feel instant. The cross-fade timing and tab logic stay the same.` },
      { q: 'How do I make the tabs run horizontally instead of vertically?', a: `Change .fst-tabs to flex-direction: row (or a grid) and move the accent rail from the left edge to the bottom (::before with height: 3px, left/right: 0, bottom: 0, and transform: scaleX instead of scaleY). Switch the keyboard handler to ArrowLeft/ArrowRight. The layout grid and cross-fade are independent of tab orientation.` },
      { q: 'Can the spotlight auto-advance like a carousel?', a: `Yes. Add setInterval(() => select((active + 1) % FEATURES.length), 5000) after setup, and clear it on the tablist's mouseenter/focusin (restarting on mouseleave/focusout) so it pauses while the user is interacting. Any manual click should also reset the timer so the chosen feature gets the full interval before auto-advancing.` },
      { q: 'Why does the active tab have a growing line on its left?', a: `That is a ::before pseudo-element rail animated with transform: scaleY from 0 to 1 with transform-origin: top, so it wipes in from the top edge when the tab becomes active rather than just appearing. It is a lightweight motion cue — animating transform (not height or width) keeps it on the GPU compositor — that makes the current selection obvious at a glance.` },
      { q: 'How do I use this spotlight in React, Vue, or Angular?', a: `Hold the active index in state and render FEATURES with .map/v-for/*ngFor. Bind each tab's .active class and aria-selected to index comparisons, and bind the visual's content/src to FEATURES[active]. For the cross-fade, toggle a swap class via state and use a timeout (cleared on unmount) to change the asset at the midpoint, or key the visual off the index and let a CSS transition handle it. The arrow-key handler attaches to the tablist's onKeyDown.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to guess why the visual swap needs a setTimeout instead of just changing instantly. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the paint function's timeout is matched to the CSS opacity transition duration so the content only changes while the stage is invisible, and what would visually break if that timing drifted out of sync. The same assistant can help optimize it — ask whether the accent rail's scaleY wipe-in animation and the icon tile's background/color transition are both necessary or somewhat redundant as selection signals, and whether the keyboard arrow handler correctly wraps at both ends of the list. It's also useful for extending the component: ask it to swap the gradient placeholder panels for real lazy-loaded product screenshots with a preload step during the fade-out window, add auto-advancing like a carousel that pauses on hover or focus, or support a horizontal tab variant for wider, shorter sections. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a vertical feature-spotlight tabs section in plain HTML, CSS, and JavaScript where selecting a tab cross-fades a paired visual — no library.

Requirements:
- A two-column CSS grid layout: a fixed-width vertical column of feature tab cards on one side, and a flexible visual "stage" area on the other, with the tab column using align-items start so it never stretches to match the stage's height.
- Generate every tab and its paired visual from a single shared data array of objects (containing at minimum an icon, a title, a description, a visual label, and a visual background), so the tabs and visuals can never drift out of sync because they are always read from the same indexed array.
- The active tab must be marked with at least three visual signals: a lifted box-shadow and tinted border, an icon tile that inverts from a tinted background to a solid filled accent color, and a left-edge accent rail built from a pseudo-element that wipes in via a scaleY transform animation from a top transform-origin (not just appearing instantly).
- Clicking a tab must not instantly swap the stage's content. Instead, first add a class that fades the stage to zero opacity and shifts it slightly downward, then after a timeout matched to that transition's duration, swap the visual's background and label content and remove the fade class so it eases back into view — implement a guard so clicking the already-active tab does nothing.
- Wire proper ARIA tablist semantics: a role tablist container, role tab on each button with aria-selected reflecting the active state, and keyboard support where ArrowDown and ArrowUp move both the visual selection and keyboard focus to the next or previous tab, wrapping around at both ends of the list.
- Add a responsive breakpoint that collapses the two-column grid to a single column and reorders the visual stage above the tab list for mobile reading order.`,
    },
  },
};

export default featureSpotlightTabs;
