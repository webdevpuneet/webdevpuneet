const customRadio = {
  id: 'custom-radio',
  title: 'Custom Radio Buttons',
  category: 'forms',
  html: `<form class="plans">
  <h3 class="plans-title">Choose a plan</h3>

  <label class="radio">
    <input type="radio" name="plan" value="starter">
    <span class="dot"></span>
    <span class="info">
      <strong>Starter</strong>
      <small>$0 / month — for individuals</small>
    </span>
  </label>

  <label class="radio">
    <input type="radio" name="plan" value="pro" checked>
    <span class="dot"></span>
    <span class="info">
      <strong>Pro</strong>
      <small>$12 / month — for small teams</small>
    </span>
  </label>

  <label class="radio">
    <input type="radio" name="plan" value="business">
    <span class="dot"></span>
    <span class="info">
      <strong>Business</strong>
      <small>$32 / month — advanced controls</small>
    </span>
  </label>
</form>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
}

.plans { width: 100%; max-width: 340px; display: flex; flex-direction: column; gap: 10px; }
.plans-title { font-size: 16px; color: #1e293b; margin-bottom: 6px; }

.radio {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer; user-select: none;
  background: #fff;
  transition: border-color 0.2s, background 0.2s;
}

/* Hide native radio but keep it focusable & accessible */
.radio input {
  position: absolute; opacity: 0; width: 0; height: 0;
}

.dot {
  flex-shrink: 0;
  width: 20px; height: 20px;
  border: 2px solid #cbd5e1;
  border-radius: 50%;
  display: grid; place-items: center;
  transition: border-color 0.2s;
}
.dot::after {
  content: "";
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #6366f1;
  transform: scale(0);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Selected card */
.radio input:checked + .dot { border-color: #6366f1; }
.radio input:checked + .dot::after { transform: scale(1); }
.radio:has(input:checked) {
  border-color: #6366f1;
  background: #eef2ff;
}

/* Keyboard focus ring on the card */
.radio input:focus-visible + .dot {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.35);
}

.info { display: flex; flex-direction: column; gap: 2px; }
.info strong { font-size: 14px; color: #1e293b; }
.info small { font-size: 12px; color: #64748b; }`,
  js: `// Pure CSS radio group — no JavaScript needed.
// The native radio's name attribute enforces single-selection automatically.
document.querySelectorAll('.radio input').forEach(r => {
  r.addEventListener('change', e => console.log('Selected plan:', e.target.value));
});`,

  seo: {
    title: 'Custom Radio Buttons — CSS Card Group Snippet',
    description: 'Accessible custom radio buttons as selectable cards in pure CSS, with a springy dot and a :has() card highlight. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Custom Radio Buttons — Selectable Cards with a Springy Dot & :has() Highlight',
      description: `Custom radio buttons are a top-searched form snippet because the native radio is impossible to restyle reliably, and developers want the modern "selectable card" look used in pricing pages (the [plan selector](/ui-snippets/plan-selector/) and [radio card group](/ui-snippets/radio-card-group/)), checkout flows, and onboarding. This snippet delivers exactly that: a group of plan cards where choosing one highlights the whole card, animates a dot into place, and — crucially — keeps a **real \`<input type="radio">\`** so single-selection, keyboard arrows, and screen-reader semantics all work natively. It is pure CSS, with no JavaScript managing which option is selected.

**Why keep the native radio**

Radio buttons have behavior you do not want to reimplement: a group sharing the same \`name\` allows only one selection, arrow keys move between options, Space/Enter selects, and the chosen value submits with the form. Building this from divs and JavaScript loses all of it and is a common accessibility failure — the same lesson as the [custom checkbox](/ui-snippets/custom-checkbox/). Here every option is a \`<label class="radio">\` wrapping an \`<input type="radio" name="plan">\`. The browser enforces single-selection through the shared \`name\`, so there is no script to uncheck siblings — the radio group simply works.

**The accessible hide pattern**

The native radio is hidden with \`position: absolute; opacity: 0; width: 0; height: 0\` rather than \`display: none\`. That keeps it focusable, keyboard-operable, and announced by assistive tech while letting CSS draw a custom indicator. The whole card is a label, so clicking anywhere on it selects that option. This is the same reliable pattern used for accessible custom checkboxes, applied to radios.

**The animated dot with a springy bounce**

The visible indicator is a \`.dot\` — a 20px circle with a border — containing an \`::after\` pseudo-element that is the inner fill. By default the inner fill is \`transform: scale(0)\` (invisible). When the radio is checked, \`input:checked + .dot::after { transform: scale(1) }\` pops it to full size. The transition uses \`cubic-bezier(0.34, 1.56, 0.64, 1)\` — an overshoot easing curve whose value above 1 makes the dot scale slightly past 100% and settle back, producing a satisfying springy "bounce" as the option is selected. Animating only \`transform\` keeps it smooth on the GPU.

**Highlighting the whole card with :has()**

The standout feature is the card highlight. The modern CSS \`:has()\` relational selector lets a parent style itself based on a descendant's state: \`.radio:has(input:checked)\` matches the label only when the radio inside it is checked, applying a colored border and a soft tinted background (\`border-color: #6366f1; background: #eef2ff\`). This is the clean, script-free way to build selectable cards — before \`:has()\`, you needed JavaScript to add a class to the parent. \`:has()\` is supported in all current major browsers; for very old browsers you can fall back to highlighting just the dot and label text via the \`+\` sibling selector, which this snippet also uses.

**Focus, hover, and selected states**

The card responds to every interaction. Hovering or selecting transitions the \`border-color\` and \`background\` smoothly. Keyboard focus shows a ring via \`input:focus-visible + .dot { box-shadow: 0 0 0 3px rgba(99,102,241,0.35) }\` — using \`:focus-visible\` so the ring appears only during keyboard navigation, not on mouse clicks. The selected card combines the colored border, tinted background, filled dot, and (on keyboard) focus ring, so the chosen option is unmistakable at a glance.

**The card content layout**

Each card uses a flex row: the dot on the left, then an \`.info\` column with a bold plan name and a small description. This layout scales to any content — add a price badge, an icon, or a "Most popular" tag inside the info column. Because the dot is \`flex-shrink: 0\`, it never squashes when the text is long. The cards stack in a flex column with consistent spacing, and the whole group sits under a heading so the question being answered is clear.

**Customizing the group**

Change the accent color in four places — the checked dot fill (\`::after background\`), the checked dot border, the \`:has\` card border, and the focus-ring \`rgba()\`. To add a fourth option, copy a label and update its \`value\` and text; the shared \`name="plan"\` automatically includes it in the group. To make the dot bigger, scale the \`.dot\` and its \`::after\` together. For a more subtle selection, soften the \`:has()\` background tint or remove the bounce by swapping the cubic-bezier for a plain \`ease\`. Because the markup is a simple repeating label, the pattern works for 2, 3, or 10 options.

**Accessibility checklist**

Give every radio in a group the same \`name\` so they form one group, and a unique \`value\` so the selection submits correctly. The wrapping \`<label>\` associates the text with the input, but you can also add \`for\`/\`id\` pairs for extra robustness. Consider wrapping the group in a \`<fieldset>\` with a \`<legend>\` ("Choose a plan") so screen readers announce the group's purpose. Keep the \`:focus-visible\` ring intact for keyboard users, and ensure the unchecked dot border has enough contrast against the card so empty options are visible. Because the native radios remain, arrow-key navigation, voice control, and screen readers all work without extra ARIA.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Copy a label card', text: 'Each option is a <label class="radio"> wrapping a hidden <input type="radio">, a .dot indicator, and an .info column. Keep all parts.' },
        { title: 'Share one name', text: 'Give every radio the same name (e.g. name="plan") so the browser allows only one selection, and a unique value per option.' },
        { title: 'Edit the card content', text: 'Change the bold title and small description inside .info. Add a price badge or icon if you like — the layout flexes.' },
        { title: 'Re-theme the accent', text: 'Update the color in four places: the dot fill, the checked dot border, the .radio:has(input:checked) border/background, and the focus ring.' },
        { title: 'Add or remove options', text: 'Copy a label to add an option, or delete one. The shared name keeps them a single group automatically.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Real <input type="radio"> kept — single-selection and arrow keys work natively',
      'Accessible hide pattern (opacity + zero size), never display: none',
      'Whole card highlights via the modern :has(input:checked) selector',
      'Springy dot animation with an overshoot cubic-bezier on scale',
      'Focus-visible ring shows for keyboard users but not mouse clicks',
      'Selectable-card layout: dot + bold title + description, fully flexible',
      'No JavaScript — the shared name attribute enforces single selection',
      'Submits natively with the form under name and value',
      'Re-theme the whole group from four color values',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
    ],
    useCases: [
      { icon: 'PRO',    title: 'Pricing & plan selection',         desc: 'The signature use case — selectable plan cards on pricing pages and checkout where one option must be chosen and clearly highlighted.' },
      { icon: 'FORM',   title: 'Checkout: shipping & payment',      desc: 'Pick a shipping speed or payment method as a card group, with the whole card highlighting the active choice.' },
      { icon: 'APP',    title: 'Onboarding preference steps',       desc: 'Ask new users to choose a role, use case, or theme with large, tappable cards instead of tiny native radios.' },
      { icon: 'LEARN',  title: 'Learn the :has() parent selector',  desc: 'See how :has(input:checked) styles a card based on a descendant input — the modern, script-free way to build selectable cards.' },
      { icon: 'CODE',   title: 'Design-system radio group',         desc: 'Add the card-style radio to your component library with checked, focus, hover, and disabled states ready to go.' },
      { icon: 'ACCESS', title: 'Accessible single-choice control',  desc: 'Keeps native radios so arrow-key navigation, form submission, and screen-reader grouping all work without custom ARIA.' },
      { icon: 'CODE', title: 'Related: Expense Split Calculator', desc: 'See the [Expense Split Calculator](/ui-snippets/expense-split-calculator/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do custom radio buttons stay accessible?', a: 'Keep the real <input type="radio"> and hide it with position: absolute; opacity: 0; width/height: 0 (never display: none). Wrap each in a <label> and give all radios in the group the same name. The browser then handles single-selection, arrow-key navigation, and screen-reader semantics; CSS only draws the custom dot and card.' },
      { q: 'How does the whole card get highlighted?', a: 'The CSS :has() relational selector — .radio:has(input:checked) — styles the parent label when the radio inside it is checked, applying a colored border and tinted background. This is the modern, script-free way to build selectable cards; it is supported in all current major browsers.' },
      { q: 'How does the springy dot animation work?', a: 'The dot fill is an ::after with transform: scale(0) by default and scale(1) when checked. The transition uses cubic-bezier(0.34, 1.56, 0.64, 1) — an overshoot curve that scales slightly past 100% and settles back, creating a bounce.' },
      { q: 'Do I need JavaScript to enforce one selection?', a: 'No. Native radios that share the same name attribute allow only one to be checked at a time, automatically unchecking the others. No script is required.' },
      { q: 'How do I add another option or change colors?', a: 'Copy a label, set a unique value and new text — the shared name keeps it in the group. To re-theme, change the accent in four places: the dot fill, the checked dot border, the :has card border/background, and the focus-ring rgba().' },
      { q: 'Can I use these custom radios in React?', a: 'Yes. Click "JSX" for a React component or "Tailwind" for a React + Tailwind version. In React, use controlled radios sharing a name with value/checked/onChange; the same label/dot/info structure keeps the CSS working unchanged.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to guess how the whole card lights up without any JavaScript. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the radio:has(input:checked) selector reaches up from the hidden input to style its own parent label, and why that only became possible with the modern :has() relational selector rather than requiring a class toggle. The same assistant can help optimize it — ask whether the overshoot cubic-bezier on the dot's scale transition needs adjusting for very small or very large dot sizes, and whether :has() support gaps in older browsers warrant a sibling-selector fallback for this specific project's browser targets. It's also useful for extending the group: ask it to add a "most popular" ribbon on one card, a disabled option with a tooltip explaining why, or a price that animates when the user switches between billing periods. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a selectable plan-card radio group in plain HTML, CSS, and JavaScript, using the native input type="radio" for state and the CSS :has() selector for the card highlight — no JavaScript managing which card is selected.

Requirements:
- Each option is a label wrapping a hidden input type="radio" (all sharing the same name attribute so the browser enforces single selection), a visual dot indicator, and an info block with a title and description.
- Hide the radio inputs with position: absolute, opacity: 0, and zero width/height — never display: none — so they remain focusable, keyboard-operable with arrow keys, and correctly announced by screen readers.
- Style the checked dot's inner fill as a pseudo-element that scales from 0 to 1 using a transition with an overshoot cubic-bezier easing curve (a curve with a control point value greater than 1) so the fill visibly bounces slightly past full size before settling.
- Use the CSS :has() relational selector on the outer label so the entire card's border color and background tint change when the radio inside it is checked, with no JavaScript class toggling required for that highlight.
- Add a visible focus ring on the dot using :focus-visible tied to the hidden input's focus state, so keyboard navigation between cards is clearly visible but mouse clicks don't show a lingering ring.
- Wrap the whole group in a fieldset with a legend describing the choice being made, for correct screen-reader grouping semantics.
- Confirm and explain: because every radio shares one name attribute, no script is needed anywhere to uncheck a previously selected sibling when a new one is chosen.`,
    },
  },
};

export default customRadio;
