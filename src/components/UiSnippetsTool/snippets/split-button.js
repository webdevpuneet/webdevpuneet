const splitButton = {
  id: 'split-button',
  title: 'Split Action Button with Dropdown',
  lastmod: '2026-06-13',
  category: 'buttons',
  html: `<div class="demo">
  <div class="split-wrap">
    <div class="split-btn" id="splitBtn1">
      <button class="main-action" onclick="handleMain(this,'Deploy to Production')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        Deploy to Production
      </button>
      <button class="arrow-btn" onclick="toggleDropdown('drop1')" aria-label="More deploy options" aria-expanded="false">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="dropdown" id="drop1" role="menu">
        <button class="drop-item" onclick="handleMain(null,'Deploy to Staging')" role="menuitem">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          Deploy to Staging
        </button>
        <button class="drop-item" onclick="handleMain(null,'Deploy to Preview')" role="menuitem">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Deploy to Preview
        </button>
        <div class="drop-divider"></div>
        <button class="drop-item drop-danger" onclick="handleMain(null,'Rollback Deploy')" role="menuitem">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.58"/></svg>
          Rollback Deploy
        </button>
      </div>
    </div>

    <div class="split-btn split-secondary">
      <button class="main-action" onclick="handleMain(this,'Save Draft')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
        Save Draft
      </button>
      <button class="arrow-btn" onclick="toggleDropdown('drop2')" aria-label="More save options" aria-expanded="false">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="dropdown" id="drop2" role="menu">
        <button class="drop-item" onclick="handleMain(null,'Save and Publish')" role="menuitem">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          Save and Publish
        </button>
        <button class="drop-item" onclick="handleMain(null,'Save as Template')" role="menuitem">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          Save as Template
        </button>
      </div>
    </div>
  </div>
  <div class="action-log" id="actionLog"><span class="log-empty">Click any button to see the action</span></div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8f9fa; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
.demo { display: flex; flex-direction: column; align-items: center; gap: 24px; width: 100%; max-width: 480px; }
.split-wrap { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }
.split-btn { position: relative; display: inline-flex; }
.main-action { display: inline-flex; align-items: center; gap: 7px; padding: 9px 14px; border: none; border-radius: 8px 0 0 8px; background: #2563eb; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s; white-space: nowrap; }
.main-action:hover { background: #1d4ed8; }
.arrow-btn { display: inline-flex; align-items: center; justify-content: center; width: 34px; border: none; border-left: 1px solid rgba(255,255,255,0.25); border-radius: 0 8px 8px 0; background: #2563eb; color: #fff; cursor: pointer; transition: background 0.15s; flex-shrink: 0; }
.arrow-btn:hover { background: #1d4ed8; }
.arrow-btn svg { transition: transform 0.2s; }
.arrow-btn[aria-expanded="true"] svg { transform: rotate(180deg); }
.split-secondary .main-action, .split-secondary .arrow-btn { background: #374151; }
.split-secondary .main-action:hover, .split-secondary .arrow-btn:hover { background: #1f2937; }
.dropdown { display: none; position: absolute; top: calc(100% + 6px); right: 0; background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); min-width: 180px; z-index: 100; overflow: hidden; animation: dropIn 0.15s ease; }
.dropdown.open { display: block; }
@keyframes dropIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
.drop-item { display: flex; align-items: center; gap: 9px; width: 100%; padding: 9px 14px; background: none; border: none; font-size: 13px; color: #374151; cursor: pointer; text-align: left; transition: background 0.12s; }
.drop-item:hover { background: #f3f4f6; }
.drop-item svg { color: #6b7280; flex-shrink: 0; }
.drop-danger { color: #dc2626; }
.drop-danger svg { color: #dc2626; }
.drop-danger:hover { background: #fef2f2; }
.drop-divider { height: 1px; background: #f0f0f0; margin: 4px 0; }
.action-log { width: 100%; padding: 11px 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 13px; color: #374151; text-align: center; min-height: 40px; display: flex; align-items: center; justify-content: center; }
.log-empty { color: #9ca3af; }
.log-action::before { content: "Action triggered: "; color: #6b7280; font-weight: 400; }
.log-action { font-weight: 600; color: #111827; }`,

  js: `function toggleDropdown(id) {
  const drop = document.getElementById(id);
  const btn = drop.previousElementSibling;
  const isOpen = drop.classList.contains('open');
  document.querySelectorAll('.dropdown.open').forEach(d => {
    d.classList.remove('open');
    d.previousElementSibling.setAttribute('aria-expanded','false');
  });
  if (!isOpen) {
    drop.classList.add('open');
    btn.setAttribute('aria-expanded','true');
  }
}
function handleMain(triggerEl, action) {
  document.querySelectorAll('.dropdown.open').forEach(d => {
    d.classList.remove('open');
    d.previousElementSibling.setAttribute('aria-expanded','false');
  });
  const log = document.getElementById('actionLog');
  log.innerHTML = '<span class="log-action">' + action + '</span>';
}
document.addEventListener('click', function(e) {
  if (!e.target.closest('.split-btn')) {
    document.querySelectorAll('.dropdown.open').forEach(d => {
      d.classList.remove('open');
      d.previousElementSibling.setAttribute('aria-expanded','false');
    });
  }
});`,

  seo: {
    title: 'Split Button with Dropdown — HTML CSS JS Snippet',
    description: 'Split action button with a primary action plus dropdown arrow, aria-expanded, and outside-click close. Pure HTML CSS JS — exports to React, Vue & Angular.',
    about: {
      title: `Split Action Button — Primary Action, Dropdown Arrow & Outside-Click Close`,
      description: `A split button combines a primary action button with a small dropdown trigger on the right side, separated by a subtle divider. The left half executes the default action immediately on click; the right chevron opens a menu of alternative actions. This pattern appears in deployment dashboards, content management systems, and anywhere a clear primary action exists alongside occasional secondary variants.\n\n**HTML structure**\n\nThe \`.split-btn\` container uses \`display: inline-flex\` and \`position: relative\` — inline-flex so the two child buttons sit side by side without gaps, and relative to anchor the absolutely-positioned dropdown. The \`.main-action\` button receives \`border-radius: 8px 0 0 8px\` (rounded left only) and \`.arrow-btn\` receives \`border-radius: 0 8px 8px 0\` (rounded right only). There is no wrapper with \`overflow: hidden\` because that would clip the dropdown panel.\n\n**The divider trick**\n\nThe visual split between the two halves is \`border-left: 1px solid rgba(255,255,255,0.25)\` on the arrow button. Because both buttons share the same background color, a fully opaque white border would look harsh. Reducing the alpha to 25% creates a gentle inset appearance that reads as a separator without looking bolted on. This is the same technique used by GitHub's branch dropdown and Vercel's deploy button.\n\n**Dropdown animation**\n\n\`display: none\` / \`display: block\` toggling via a class is combined with a CSS \`@keyframes dropIn\` animation. When the \`.open\` class is added, the animation runs: \`opacity 0 → 1\` and \`translateY -6px → 0\` over 150ms. The slight upward offset on entry gives a sense that the panel is emerging from below the button rather than appearing from nowhere. Removal of the \`.open\` class hides the dropdown instantly — adding a separate exit animation would require JavaScript timing to delay the display change.\n\n**JavaScript: single-open and outside-click**\n\n\`toggleDropdown(id)\` first sweeps all open dropdowns closed, then opens the target if it was previously closed. This single-open guarantee is important when multiple split buttons share the same page. The \`document.addEventListener('click')\` handler uses \`e.target.closest('.split-btn')\` — if the click origin is not inside any split button, all dropdowns close. This covers clicking page content, other buttons, or empty space.\n\n**Accessibility**\n\nThe arrow button carries \`aria-expanded="false"\` initially. JavaScript flips it to \`"true"\` when the dropdown opens. This attribute is also the CSS hook for rotating the chevron icon: \`.arrow-btn[aria-expanded="true"] svg { transform: rotate(180deg) }\`. The dropdown has \`role="menu"\` and items have \`role="menuitem"\`, which assistive technologies announce as a menu. \`aria-label\` on the arrow button ("More deploy options") clarifies its purpose since it contains only an icon.\n\n**Danger/destructive action pattern**\n\nThe \`.drop-danger\` class sets color and icon tint to red-600 (\`#dc2626\`) and the hover state to red-50 (\`#fef2f2\`). A \`.drop-divider\` (a 1px \`border-top\`) visually separates destructive actions at the bottom of the menu — the same convention used by macOS contextual menus and VS Code's command palette.\n\n**Variants and theming**\n\nThe secondary gray variant only overrides \`background\` on both button halves — all structural CSS stays the same. This shows that theming is a single-line change per color scheme. To support dark mode, replace the hardcoded hex values with CSS custom properties: \`var(--btn-bg)\`, \`var(--dropdown-bg)\`, \`var(--dropdown-border)\`.\n\n**React integration**\n\nIn React, the component accepts \`primaryLabel\`, \`onPrimary\`, and \`actions\` (array of \`{label, icon, onClick, danger}\`). Open state is \`useState(false)\`. The document click listener goes in \`useEffect(() => { const h = e => { ... }; document.addEventListener('click', h); return () => document.removeEventListener('click', h); }, [])\`. The cleanup return prevents memory leaks when the component unmounts.\n\n**Vue 3 integration**\n\nUse \`ref(false)\` for \`isOpen\` and an \`onMounted\` / \`onUnmounted\` pair for the document listener. The template uses \`v-for\` on the actions array and \`:class="{ open: isOpen }"\` on the dropdown div. Pass the danger flag as \`:class="{ 'drop-danger': action.danger }"\`.\n\nSplit buttons are semantically superior to two separate buttons for primary/secondary because they communicate hierarchy — the wide left portion draws the eye to the default action, while the narrow right chevron signals optionality without cluttering the interface. Users who always use the default action never need to interact with the dropdown at all. See also the [dropdown menu snippet](/ui-snippets/dropdown-menu/) for standalone menus, the [expanding FAB snippet](/ui-snippets/expanding-fab/) for a touch-first radial alternative, and the [button group snippet](/ui-snippets/button-group/) for equal-weight segmented controls.`
    },
    howToUse: [
      { title: 'Copy the HTML wrapper', text: 'Each split button needs a .split-btn div containing .main-action, .arrow-btn, and a .dropdown div with .drop-item children.' },
      { title: 'Assign unique dropdown IDs', text: 'Give each .dropdown a unique id and pass it to onclick="toggleDropdown(\'yourId\')" on the corresponding arrow button.' },
      { title: 'Add the CSS', text: 'Paste the CSS. Change background hex values in .main-action and .arrow-btn to match your brand. Layout and animation CSS needs no changes.' },
      { title: 'Include the JavaScript', text: 'Add the three JS functions. They handle all split buttons on the page via document-level delegation.' },
      { title: 'Mark destructive items', text: 'Add class="drop-item drop-danger" for rollback/delete actions and insert a .drop-divider before them.' }
    ],
    features: [
      'Primary button + chevron trigger in one cohesive unit',
      'Only one dropdown open at a time — siblings auto-close',
      'Outside-click handler via document event delegation',
      'aria-expanded drives both accessibility and CSS arrow rotation',
      'Danger variant with red colour and divider separator',
      'Secondary gray colour scheme variant',
      'CSS keyframe entrance animation',
      'Zero dependencies — pure HTML, CSS, JavaScript'
    ],
    useCases: [
      { icon: 'CODE', title: 'Deploy Pipelines', desc: 'Deploy to production as primary, staging and preview as dropdown variants' },
      { icon: 'DOC', title: 'Content Publishing', desc: 'Publish now as primary, schedule or save draft in dropdown' },
      { icon: 'FLOW', title: 'Form Actions', desc: 'Save as primary, save-and-exit or save-as-template as secondary options' },
      { icon: 'APP', title: 'Export Controls', desc: 'Default format export as primary, other formats available in dropdown' }
    ],
    faqs: [
      { q: 'How do I use a split button in React?', a: 'Create a SplitButton component with props primaryLabel, onPrimary, and actions array. Use useState for open state and useEffect with document click listener for outside-close, returning cleanup.' },
      { q: 'Can I use keyboard navigation in the dropdown?', a: 'Yes — listen for ArrowDown/ArrowUp on the arrow-btn and move focus between .drop-item buttons. Set tabindex="-1" on items so they can receive programmatic focus.' },
      { q: 'How do I stop the dropdown going off-screen on the right?', a: 'Detect overflow with getBoundingClientRect() after opening, then switch from right: 0 to left: 0 if the right edge exceeds window.innerWidth.' },
      { q: 'Can I add icons to each dropdown item?', a: 'Yes — the .drop-item uses display: flex with gap, so simply insert an SVG or img before the text label. Icons are already in the demo code.' },
      { q: 'How do I export this split button to React, Vue, or Angular?', a: 'Open the Export menu (or the Test Exports preview) in the snippet toolbar. It generates a plain React component, a React + Tailwind version where the button and dropdown styles become utility classes, a Vue 3 single-file component, and an Angular standalone component. Each converter preserves the markup, the dropdown open/close behaviour, and the aria-expanded state, so the split button works identically across React, Vue, and Angular. Keep the open state in component state and pass the menu items in as a prop or input, wiring each item action to its own handler rather than the demo alert.' }
    ],
    aiPrompt: {
      paragraph: `You don't need to trace the single-open and outside-click logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how toggleDropdown sweeps every other open dropdown closed before opening its target, or why the document-level click listener uses closest('.split-btn') rather than checking the dropdown element directly. The same assistant can help optimize it, for example checking whether the low-opacity white border trick used for the internal divider would still read correctly against a light background variant, or whether the dropdown's fixed right-anchored position could overflow off-screen on a narrow viewport. It's also useful for extending the feature: ask it to add arrow-key navigation between menu items once the dropdown is open, auto-flip the dropdown to the left edge when it would overflow the viewport, or wire each action to a real confirmation step for the destructive rollback item. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a split action button with a primary action and a dropdown of secondary actions in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- Each split button must be one inline-flex container with position relative, holding a wide primary button (rounded only on its left corners) and a narrow arrow button (rounded only on its right corners) directly beside it, visually separated by a low-opacity border rather than a hard divider line.
- The dropdown menu must be absolutely positioned relative to the split button container, hidden by default, and revealed by toggling a class that also triggers a CSS keyframe entrance animation combining an opacity fade and a small upward-to-resting translateY move.
- Support multiple independent split buttons on the same page. A single toggle function must close every other currently-open dropdown before opening the one that was clicked, so only one dropdown can be open at any time across the whole page.
- Add a single document-level click listener that checks whether the click's target is inside any split button container using the closest method; if it is not, close every open dropdown. This must not interfere with clicks on the buttons or menu items themselves.
- Clicking the arrow button must toggle its aria-expanded attribute between "true" and "false", and that attribute must be the CSS hook used to rotate the chevron icon 180 degrees — the rotation must not be driven by a separate class.
- The dropdown menu must use role="menu" on its container and role="menuitem" on each action button, and one destructive action (visually distinct in a warning color, separated from the other items by a thin divider) must be included to demonstrate a dangerous-action pattern.
- Clicking the primary action or any dropdown item must close all open dropdowns and report which action was triggered (for example, writing it to a status area) before anything else happens.`,
    },
  }
};

export default splitButton;
