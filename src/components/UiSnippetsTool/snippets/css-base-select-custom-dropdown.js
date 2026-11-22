const cssBaseSelectCustomDropdown = {
  id: 'css-base-select-custom-dropdown',
  title: 'Custom Select Dropdown in CSS: appearance base-select',
  lastmod: '2026-11-22',
  category: 'forms',
  html: `<main class="bs-page">
  <h1>Style the real select</h1>
  <p class="bs-sub">Badges, descriptions and a rounded menu inside a native &lt;select&gt;. No div-based dropdown, no JavaScript.</p>

  <form class="bs-form" onsubmit="return false">
    <label class="bs-field">
      <span>Support language</span>
      <select name="lang" class="bs-select">
        <button type="button"><selectedcontent></selectedcontent></button>
        <option value="en" selected><span class="bs-flag" style="--h:215">EN</span><span class="bs-txt"><b>English</b><small>Replies within 2 hours</small></span></option>
        <option value="de"><span class="bs-flag" style="--h:350">DE</span><span class="bs-txt"><b>Deutsch</b><small>Replies within 4 hours</small></span></option>
        <option value="fr"><span class="bs-flag" style="--h:235">FR</span><span class="bs-txt"><b>Fran&ccedil;ais</b><small>Replies within 4 hours</small></span></option>
        <option value="es"><span class="bs-flag" style="--h:35">ES</span><span class="bs-txt"><b>Espa&ntilde;ol</b><small>Replies next day</small></span></option>
      </select>
    </label>

    <label class="bs-field">
      <span>Priority</span>
      <select name="prio" class="bs-select">
        <button type="button"><selectedcontent></selectedcontent></button>
        <option value="low"><i class="bs-dot" style="--c:#22c55e"></i>Low</option>
        <option value="normal" selected><i class="bs-dot" style="--c:#3b82f6"></i>Normal</option>
        <option value="high"><i class="bs-dot" style="--c:#f59e0b"></i>High</option>
        <option value="urgent"><i class="bs-dot" style="--c:#ef4444"></i>Urgent</option>
      </select>
    </label>
  </form>
  <p class="bs-note" id="bsNote"></p>
</main>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:#f3f4fb;color:#1c2033;min-height:100vh}
.bs-page{max-width:480px;margin:0 auto;padding:56px 20px}
h1{font-size:clamp(26px,5vw,34px);letter-spacing:-.02em}
.bs-sub{margin:10px 0 28px;color:#5b627a;line-height:1.6}
.bs-form{display:grid;gap:20px}
.bs-field>span{display:block;font-size:13px;font-weight:700;color:#5b627a;margin-bottom:6px}

/* 1. Opt the select AND its popup into the customisable rendering */
.bs-select,.bs-select::picker(select){appearance:base-select}

.bs-select{display:flex;align-items:center;width:100%;font:600 16px system-ui,sans-serif;color:#1c2033;background:#fff;border:1px solid #d3d7e6;border-radius:14px;padding:6px;cursor:pointer;transition:border-color .2s,box-shadow .2s}
.bs-select:hover{border-color:#8b93b5}
.bs-select:focus-visible{outline:3px solid #6366f1;outline-offset:2px}
.bs-select:open{border-color:#6366f1;box-shadow:0 0 0 3px rgb(99 102 241 / .18)}
.bs-select>button{display:flex;align-items:center;flex:1;min-width:0;padding:6px 8px;border:0;background:none;font:inherit;color:inherit;cursor:pointer}

/* 2. The arrow is a pseudo-element you can restyle or rotate */
.bs-select::picker-icon{content:'';width:9px;height:9px;flex:none;margin:0 14px 0 auto;border-right:2px solid #6366f1;border-bottom:2px solid #6366f1;transform:rotate(45deg) translateY(-2px);transition:transform .25s}
.bs-select:open::picker-icon{transform:rotate(-135deg)}

/* 3. The menu is a popover: style it, and animate it with @starting-style */
.bs-select::picker(select){margin-top:6px;padding:6px;border:1px solid #d3d7e6;border-radius:16px;background:#fff;box-shadow:0 18px 40px rgb(30 35 70 / .18);
  opacity:0;transform:translateY(-6px);transition:opacity .2s,transform .2s,overlay .2s allow-discrete,display .2s allow-discrete}
.bs-select::picker(select):popover-open{opacity:1;transform:none}
@starting-style{.bs-select::picker(select):popover-open{opacity:0;transform:translateY(-6px)}}

.bs-select option{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;cursor:pointer}
.bs-select option:hover,.bs-select option:focus-visible{background:#eef0fb;outline:0}
.bs-select option:checked{background:#e3e6ff}
.bs-select option::checkmark{order:1;margin-left:auto;color:#6366f1}
.bs-flag{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font:800 12px system-ui,sans-serif;letter-spacing:.04em;color:#fff;background:hsl(var(--h) 62% 46%)}
.bs-txt{display:grid}.bs-txt b{font-weight:700}.bs-txt small{font-weight:500;font-size:12.5px;color:#6b7390}
.bs-dot{width:12px;height:12px;border-radius:50%;background:var(--c);flex:none}
/* the closed control shows a copy of the chosen option, so give it the same row layout the options have */
selectedcontent{display:flex;align-items:center;gap:12px}
selectedcontent .bs-txt small{display:none}
.bs-note{margin-top:22px;font-size:13px;color:#6b7390}
@media (prefers-reduced-motion:reduce){.bs-select,.bs-select::picker(select),.bs-select::picker-icon{transition:none}}`,

  js: `// Nothing here is needed for the dropdown. It only reports whether this browser supports base-select;
// without it, you still get a normal working select.
var ok = CSS.supports('appearance', 'base-select');
document.getElementById('bsNote').textContent = ok
  ? 'appearance: base-select is supported here: the menu and the badges are styled with CSS.'
  : 'appearance: base-select is not supported in this browser, so you see the standard select. It still works.';`,

  seo: {
    title: 'Custom Select Dropdown in CSS: appearance base-select',
    description: `Free styled select dropdown with badges, descriptions and an animated menu using appearance: base-select on a real native select, no JavaScript. Copy the code.`,
    about: {
      title: 'A Select You Can Finally Style: appearance base-select',
      description: `The native select has resisted styling since the 1990s, so developers rebuilt it from divs, ARIA roles and a few hundred lines of script. Chrome's \`appearance: base-select\` turns that around: the select keeps its keyboard behaviour, form value and mobile picker, but its button, arrow and menu become ordinary CSS-styled elements. This snippet restyles two selects in a support form.

**Opting in**

Setting \`appearance: base-select\` on both \`select\` and \`select::picker(select)\` switches the control and its popup to the customisable rendering. Without it nothing changes, which is why the declaration lives on both selectors.

**Real content inside options**

Options can contain markup. Here each language option holds a coloured language badge, a bold name and a small response-time line, and the priority options hold a coloured dot. A \`<button>\` with \`<selectedcontent>\` as the first child of the select shows a live copy of the chosen option, with the small line hidden by CSS.

**Pseudo-elements for the details**

\`::picker-icon\` is the arrow, rotated while the select is \`:open\`. \`option::checkmark\` is the tick on the chosen row. The menu is a popover, so \`@starting-style\` and \`allow-discrete\` give it the same fade-and-slide used by animated dialogs.

**What you keep**

Typing to jump to an option, arrow keys, Escape, form submission, label association and the native sheet on phones all still work, because the element is still a select. A custom div dropdown has to re-implement each one.

**Fallback**

Browsers without support ignore the unknown value and render a standard select; the option markup is dropped to plain text. The script reports which you are seeing. For a searchable JS version see the [combobox](/ui-snippets/combobox/).

**Accessibility notes**

Keep text contrast high inside the menu, never rely on the coloured dot alone to carry the meaning, and keep the visible focus ring on the closed control. Because the element is still a select, screen readers announce the label, the selected option and the list size the same way they do for any select.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Put a button first inside the select', text: 'Write select > button > selectedcontent before the options. The browser fills selectedcontent with a copy of whichever option is chosen.' },
      { title: 'Opt in on two selectors', text: 'Set appearance: base-select on the select and on select::picker(select). Skip the second and the menu stays the old system one.' },
      { title: 'Put markup inside options', text: 'Add a badge or icon, a title and a small line, or a coloured dot. Hide parts you do not want in the closed button with selectedcontent .your-class.' },
      { title: 'Restyle the arrow and tick', text: '::picker-icon draws the arrow (rotate it under :open) and option::checkmark draws the tick; use order and margin-left: auto to move the tick right.' },
      { title: 'Animate the menu', text: 'Give ::picker(select) opacity 0, then add :popover-open, @starting-style and a transition with overlay and display allow-discrete.' },
      { title: 'Read the support note', text: 'The line under the form shows whether the current browser supports base-select; if not you still get a working native select.' },
    ] },
    features: [
      { title: 'Native select kept', text: 'Form value, typing to jump, arrow keys and Escape all work as before.' },
      { title: 'Rich options', text: 'Badges, two-line labels and coloured dots live inside the option elements.' },
      { title: 'Live selected content', text: 'selectedcontent mirrors the chosen option in the closed control.' },
      { title: 'Restylable arrow', text: '::picker-icon rotates with the :open state.' },
      { title: 'Checkmark pseudo-element', text: 'option::checkmark marks the current choice, positioned with flex order.' },
      { title: 'Animated popup', text: 'The menu fades and slides in with @starting-style.' },
      { title: 'Safe fallback', text: 'Unsupported browsers show a standard working select.' },
      { title: 'Reduced motion', text: 'Transitions switch off under prefers-reduced-motion.' },
    ],
    useCases: [
      { title: 'Language and region pickers', text: 'Show a language badge, a language name and a service note in one row, in a control that still submits a normal value and opens the native sheet on phones.' },
      { title: 'Priority and status fields', text: 'Mark ticket priority or order status with coloured dots inside a dropdown that stays a real select for screen readers.' },
      { title: 'Replacing div dropdowns', text: 'Retire a custom listbox that re-implemented typeahead, focus and Escape, and keep the look with a fraction of the code.' },
      { title: 'Design-system form controls', text: 'Give a component library a themed select that follows its tokens in light and dark without a JavaScript widget per page.' },
    ],
    faqs: [
      { q: 'Which browsers support appearance: base-select?', a: 'Chrome and Edge from version 135. Safari and Firefox do not support it yet and show the normal select, which is why this snippet is a progressive enhancement and not a replacement for every use.' },
      { q: 'Why is there a button inside the select?', a: 'The button is the closed, clickable part and selectedcontent inside it mirrors the chosen option. Older browsers ignore the button, so the markup degrades to a plain select with plain-text options.' },
      { q: 'Is it accessible?', a: 'It is a real select, so the role, labels, keyboard handling and form behaviour come from the browser. You are responsible for contrast, a visible focus ring and not hiding information that only lives in a coloured dot.' },
      { q: 'Can I put images inside options?', a: 'Yes. Options can contain images, icons and spans. Keep the closed state simple by hiding secondary parts with a selectedcontent rule, and do not put interactive elements inside an option.' },
    ],
    aiPrompt: {
      paragraph: 'Paste this snippet into an AI coding assistant and ask it to explain why appearance: base-select must be set on both the select and its ::picker(select), and what selectedcontent does. Useful follow-ups: add an avatar to each option for a user switcher, group options with optgroup headings, or tint the menu to match dark mode. Ask it to keep the fallback note and reduced-motion support.',
      prompt: `Build a customisable native select dropdown in plain HTML and CSS using appearance: base-select.

Requirements:
- A form with two labelled selects. The first lists four support languages; each option holds a coloured two-letter badge, a bold language name and a small "Replies within N hours" line. The second lists Low, Normal, High and Urgent with a coloured dot before the text.
- Markup: select > button > selectedcontent first, then the option elements.
- CSS: appearance: base-select on both .select and .select::picker(select). Style the closed control (border, radius, hover, :focus-visible ring, :open state), draw the arrow with ::picker-icon and rotate it while :open, and show a tick with option::checkmark pushed to the right.
- Style the popup: rounded, shadow, margin-top, and animate it with opacity and translate using :popover-open, @starting-style and a transition that lists overlay and display with allow-discrete.
- Hide the small description line inside the closed button with selectedcontent .small-class { display: none }.
- A script that sets a note using CSS.supports('appearance', 'base-select') to say whether the browser supports it. Respect prefers-reduced-motion and work at phone width.`,
    },
  },
};

export default cssBaseSelectCustomDropdown;
