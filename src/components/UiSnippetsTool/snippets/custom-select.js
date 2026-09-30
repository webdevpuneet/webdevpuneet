const customSelect = {
  id: 'custom-select',
  title: 'Custom Select Dropdown',
  category: 'forms',
  html: `<div class="field">
  <label id="lbl">Country</label>
  <div class="select" role="listbox" aria-labelledby="lbl" tabindex="0">
    <button class="trigger" type="button" aria-haspopup="listbox" aria-expanded="false" onclick="toggleSelect(this)">
      <span class="value">United States</span>
      <svg class="caret" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <ul class="options" role="presentation">
      <li role="option" class="selected" onclick="pick(this)">United States</li>
      <li role="option" onclick="pick(this)">United Kingdom</li>
      <li role="option" onclick="pick(this)">Canada</li>
      <li role="option" onclick="pick(this)">Australia</li>
      <li role="option" onclick="pick(this)">Germany</li>
      <li role="option" onclick="pick(this)">Japan</li>
    </ul>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
  display: flex; align-items: flex-start; justify-content: center;
  padding-top: 80px;
}

.field { width: 100%; max-width: 280px; }
#lbl { display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 7px; }

.select { position: relative; }

.trigger {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between;
  padding: 11px 14px;
  background: #fff;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  font-size: 14px; color: #1e293b; font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.trigger:hover { border-color: #94a3b8; }
.select.open .trigger { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }

.caret {
  width: 18px; height: 18px;
  fill: none; stroke: #64748b; stroke-width: 2.5;
  stroke-linecap: round; stroke-linejoin: round;
  transition: transform 0.2s;
}
.select.open .caret { transform: rotate(180deg); }

.options {
  list-style: none;
  position: absolute; top: calc(100% + 6px); left: 0; right: 0;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  box-shadow: 0 12px 28px rgba(15,23,42,0.12);
  padding: 6px;
  max-height: 240px; overflow-y: auto;
  z-index: 10;
  opacity: 0; transform: translateY(-6px);
  pointer-events: none;
  transition: opacity 0.16s, transform 0.16s;
}
.select.open .options { opacity: 1; transform: translateY(0); pointer-events: auto; }

.options li {
  padding: 9px 11px;
  border-radius: 7px;
  font-size: 14px; color: #334155;
  cursor: pointer;
  transition: background 0.1s;
}
.options li:hover { background: #f1f5f9; }
.options li.selected { background: #eef2ff; color: #6366f1; font-weight: 600; }`,
  js: `function toggleSelect(btn) {
  const sel = btn.closest('.select');
  const open = sel.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
}

function pick(li) {
  const sel = li.closest('.select');
  sel.querySelectorAll('.options li').forEach(o => o.classList.remove('selected'));
  li.classList.add('selected');
  sel.querySelector('.value').textContent = li.textContent;
  sel.classList.remove('open');
  sel.querySelector('.trigger').setAttribute('aria-expanded', 'false');
}

// Close on outside click
document.addEventListener('click', e => {
  document.querySelectorAll('.select.open').forEach(sel => {
    if (!sel.contains(e.target)) {
      sel.classList.remove('open');
      sel.querySelector('.trigger').setAttribute('aria-expanded', 'false');
    }
  });
});

// Keyboard: Enter/Space toggles, Escape closes
document.querySelector('.select').addEventListener('keydown', e => {
  const sel = e.currentTarget;
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sel.querySelector('.trigger').click(); }
  if (e.key === 'Escape') { sel.classList.remove('open'); }
});`,

  seo: {
    title: 'Custom Select Dropdown — Styled CSS/JS Snippet',
    description: 'A fully styled custom select dropdown with animated open, rotating caret, outside-click and keyboard close. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Custom Select Dropdown — Styled Trigger, Animated Menu & Outside-Click Close',
      description: `A custom select dropdown is one of the most-searched UI snippets because the native HTML \`<select>\` cannot be styled freely — the same restyling problem as the [custom checkbox](/ui-snippets/custom-checkbox/) and [custom radio](/ui-snippets/custom-radio/) — yet every form needs a dropdown that matches the design. This snippet is a complete, accessible custom select: a styled trigger that shows the current value, an **animated dropdown panel**, hover and selected option states, a **rotating caret**, and the three things people always forget — **outside-click close, keyboard support, and proper ARIA roles**.

**The structure: trigger plus options panel**

The control has two parts inside a positioned \`.select\` wrapper. The \`.trigger\` is a real \`<button type="button">\` showing the selected value in a \`.value\` span and a caret SVG. Below it, a \`<ul class="options">\` holds the choices as \`<li role="option">\` items. The wrapper has \`position: relative\` and the options panel is \`position: absolute\` directly beneath it, so the menu floats over the page without pushing content down. This trigger-plus-panel pattern is exactly how design-system selects (and comboboxes like the [multi-select dropdown](/ui-snippets/multi-select-dropdown/) and [autocomplete input](/ui-snippets/autocomplete-input/)) are built.

**The open/close animation**

The options panel is always in the DOM but hidden by default with \`opacity: 0; transform: translateY(-6px); pointer-events: none\`. Adding the \`.open\` class on the wrapper flips it to \`opacity: 1; transform: translateY(0); pointer-events: auto\`, and \`transition: opacity 0.16s, transform 0.16s\` animates a quick fade-and-slide-down. Using \`pointer-events: none\` while closed means the hidden menu never intercepts clicks even though it is still rendered, which keeps the animation smooth (animating \`opacity\`/\`transform\` is GPU-friendly) without the layout jump you get from toggling \`display: none\`.

**The rotating caret and trigger focus ring**

The caret SVG rotates 180° when open via \`.select.open .caret { transform: rotate(180deg) }\` with a \`transition: transform 0.2s\`, the universal signal that a dropdown is expanded. The trigger also gets a focus-style treatment when open: \`.select.open .trigger\` gains the brand border color and a soft \`box-shadow: 0 0 0 3px rgba(99,102,241,0.15)\` ring, so the active select stands out. Options show a light hover background, and the currently selected \`<li class="selected">\` is tinted and bolded so users can see their current choice when they reopen the menu.

**Selecting an option**

The \`pick(li)\` function does three things: it clears \`.selected\` from every option, marks the clicked one, copies its text into the trigger's \`.value\` span, and closes the menu. Because the value lives in the trigger, the displayed selection always reflects the last choice. In a real form you would also write the value to a hidden \`<input>\` so it submits — that is a one-line addition (\`hiddenInput.value = li.dataset.value\`), and the snippet's structure makes it easy to add.

**Outside-click and keyboard close — the parts tutorials skip**

A dropdown that only closes when you pick an option is frustrating. This snippet adds a document-level click listener that closes any open select when the click lands outside it (\`if (!sel.contains(e.target))\`), the behavior users expect from every dropdown. It also wires keyboard handling on the focusable wrapper: **Enter or Space** opens/closes the menu (mirroring a native select), and **Escape** closes it. The wrapper has \`tabindex="0"\` so it is reachable by keyboard, and the trigger's \`aria-expanded\` attribute is kept in sync (true when open, false when closed) so assistive tech announces the state.

**ARIA roles for accessibility**

The native \`<select>\` is fully accessible for free, so when you replace it you must restore those semantics. This snippet uses \`role="listbox"\` on the control, \`role="option"\` on each item, \`aria-haspopup="listbox"\` and \`aria-expanded\` on the trigger, and \`aria-labelledby\` pointing at the label — the standard ARIA listbox pattern. For a fully production-grade combobox you would add roving \`tabindex\` and arrow-key navigation between options and \`aria-selected\` on the active item; this snippet gives you the structure and the essential roles to build on. When accessibility is critical and you do not need custom option styling, the native \`<select>\` remains the safest choice.

**Customizing the select**

Re-theme by changing the trigger border, the open-state ring color, and the selected-option tint. Adjust the panel's \`max-height: 240px\` and \`overflow-y: auto\` to control how many options show before scrolling — useful for long lists like countries. Change the animation by editing the \`0.16s\` durations or the \`translateY(-6px)\` start offset. To add icons or flags, put an \`<img>\` or SVG inside each \`<li>\` and the \`.value\` span. Because the options are plain list items, you can group them with headings, add descriptions, or render them from data in a framework.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Copy the select block', text: 'Copy the .select wrapper with its .trigger button and .options list. Keep the role and aria attributes for accessibility.' },
        { title: 'Set your options', text: 'Replace the <li> items with your choices and set which one has the .selected class and shows in the .value span.' },
        { title: 'Submit the value', text: 'Add a hidden <input> and, in pick(), set its value to the chosen option (e.g. li.dataset.value) so the form submits the selection.' },
        { title: 'Re-theme it', text: 'Change the trigger border, the .open ring color, and the .selected option tint to match your brand.' },
        { title: 'Tune the list height', text: 'Adjust max-height on .options to control how many items show before the panel scrolls.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Fully stylable trigger + floating options panel (native <select> cannot be styled)',
      'Animated open: opacity + translateY fade-and-slide, GPU-friendly',
      'Rotating caret and an open-state focus ring on the trigger',
      'Hover and selected option states with a tinted current choice',
      'Outside-click close via a document-level listener',
      'Keyboard support: Enter/Space toggles, Escape closes',
      'ARIA listbox roles, aria-haspopup, and synced aria-expanded',
      'Scrollable panel with max-height for long lists',
      'Easy to add flags, icons, or grouped options inside each <li>',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
    ],
    useCases: [
      { icon: 'FORM',   title: 'Forms that need a branded dropdown', desc: 'Country, language, category, and status pickers where the native <select> look clashes with the rest of the form design.' },
      { icon: 'APP',    title: 'Filters and sort controls',          desc: 'Use the styled select for "Sort by", "Filter", and view options in dashboards and product listings.' },
      { icon: 'DESIGN', title: 'Design-system select component',     desc: 'A consistent dropdown with hover, selected, open, and focus states that matches your buttons and inputs exactly.' },
      { icon: 'LEARN',  title: 'Learn the dropdown pattern',         desc: 'See how a trigger + absolutely-positioned panel, outside-click close, and aria-expanded combine into a real custom dropdown.' },
      { icon: 'ACCESS', title: 'ARIA listbox starting point',        desc: 'Ships with role="listbox"/"option", aria-haspopup, and synced aria-expanded as the foundation for an accessible combobox.' },
      { icon: 'CODE',   title: 'Country / currency selectors',       desc: 'Add flags or symbols inside each option and the value span for rich country, currency, or account pickers.' },
      { icon: 'CODE', title: 'Related: Expense Split Calculator', desc: 'See the [Expense Split Calculator](/ui-snippets/expense-split-calculator/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why build a custom select instead of using <select>?', a: 'The native <select> cannot be styled freely — you cannot control option padding, hover colors, fonts, the panel background, or animations, and the dropdown looks different in every browser and OS. A custom select gives you full control over appearance while you re-add the behavior (open/close, outside-click, keyboard) and ARIA roles the native element provided for free.' },
      { q: 'How does it close when I click elsewhere?', a: 'A document-level click listener checks every open .select and removes the .open class if the click target is not inside it (!sel.contains(e.target)). This is the outside-click-to-close behavior users expect from any dropdown.' },
      { q: 'Is it keyboard accessible?', a: 'The wrapper has tabindex="0" and handles Enter/Space to toggle and Escape to close, with aria-expanded kept in sync. It uses role="listbox" and role="option". For a fully production combobox you would add arrow-key navigation between options and aria-selected; this snippet provides the structure and essential roles to build on.' },
      { q: 'How do I submit the selected value with a form?', a: 'Add a hidden <input name="..."> and, inside pick(), set its value to the chosen option (for example li.dataset.value). The trigger shows the label while the hidden input carries the value to the server.' },
      { q: 'How do I add icons or flags to options?', a: 'Put an <img> or inline SVG inside each <li> and inside the .value span. Because options are plain list items, you can add flags, currency symbols, avatars, or two-line descriptions freely.' },
      { q: 'Can I use this custom select in React?', a: 'Yes. Click "JSX" for a React component or "Tailwind" for a React + Tailwind version. In React, hold the open state and selected value in useState, render options from an array, and replicate the outside-click and key handlers in a useEffect.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to just trust that the outside-click handler is correct. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the options panel stays in the DOM with pointer-events none while closed instead of being removed with display none, and how the document-level click listener's contains check decides which open selects to close. The same assistant can help optimize it — ask whether attaching one listener per select instance versus a single delegated document listener matters as more selects are added to a page, and whether the keyboard handling should be expanded with real arrow-key navigation between options for a production combobox. It's also useful for extending the dropdown: ask it to add type-to-search jumping to an option by first letter, a multi-select variant with checkboxes inside the list, or a virtualized options list for a country picker with hundreds of entries. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a custom select dropdown in plain HTML, CSS, and JavaScript that replaces the native select element while restoring its essential behaviors — no library.

Requirements:
- A wrapper containing a button "trigger" showing the currently selected value and a caret icon, plus an absolutely-positioned options panel floating directly beneath the trigger, with the wrapper as the positioning context.
- The options panel must stay rendered in the DOM at all times, hidden by default using opacity 0, a small upward transform offset, and pointer-events none, then transitioned to opacity 1, no offset, and pointer-events auto when an "open" state class is applied — do not toggle it with display none, since that would prevent the opacity/transform transition from animating.
- Rotate the caret icon 180 degrees when open using a CSS transition tied to the same open state class.
- Clicking an option must update the trigger's displayed value, mark that option as the visually selected one, and close the panel.
- Add a single document-level click listener that closes any currently open select whenever a click lands outside that select's wrapper element, using a contains check against the click target.
- Add keyboard support on the focusable wrapper: Enter or Space opens or closes the panel, and Escape closes it.
- Apply ARIA roles matching the listbox pattern: role listbox on the wrapper, role option on each item, aria-haspopup and aria-expanded on the trigger kept in sync with the open state, and aria-labelledby pointing at an associated label element.`,
    },
  },
};

export default customSelect;
