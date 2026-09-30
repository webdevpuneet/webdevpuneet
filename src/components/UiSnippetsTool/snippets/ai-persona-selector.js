const aiPersonaSelector = {
  id: 'ai-persona-selector',
  title: 'AI Persona Selector',
  lastmod: '2026-08-22',
  category: 'cards',
  html: `<div class="pst-wrap">
  <div class="pst-heading">
    <h2>Choose an assistant style</h2>
    <p>You can change this anytime in settings.</p>
  </div>
  <div class="pst-grid" id="pstGrid"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e17;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.pst-wrap{width:100%;max-width:640px}
.pst-heading{text-align:center;margin-bottom:22px}
.pst-heading h2{font-size:22px;font-weight:800;color:#f8fafc;letter-spacing:-.01em}
.pst-heading p{font-size:13px;color:#7c8aa5;margin-top:6px}

.pst-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
.pst-card{position:relative;text-align:left;cursor:pointer;background:#111827;border:1.5px solid #1f2937;border-radius:14px;padding:16px;display:flex;gap:12px;align-items:flex-start;transition:border-color .18s,background .18s,transform .12s}
.pst-card:hover{border-color:#374151;transform:translateY(-2px)}
.pst-card.selected{border-color:#6366f1;background:rgba(99,102,241,.08)}

.pst-icon{width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0}
.pst-card[data-id="concise"] .pst-icon{background:linear-gradient(160deg,#38bdf8,#0284c7)}
.pst-card[data-id="creative"] .pst-icon{background:linear-gradient(160deg,#f472b6,#db2777)}
.pst-card[data-id="technical"] .pst-icon{background:linear-gradient(160deg,#34d399,#059669)}
.pst-card[data-id="friendly"] .pst-icon{background:linear-gradient(160deg,#fbbf24,#d97706)}

.pst-body{flex:1;min-width:0}
.pst-name{font-size:14.5px;font-weight:800;color:#f1f5f9}
.pst-desc{font-size:12.5px;color:#8a94ab;margin-top:3px;line-height:1.5}

.pst-ring{position:absolute;top:10px;right:10px;width:20px;height:20px;border-radius:50%;border:1.5px solid #374151;display:flex;align-items:center;justify-content:center;transition:border-color .18s,background .18s}
.pst-card.selected .pst-ring{border-color:#6366f1;background:#6366f1}
.pst-check{width:11px;height:11px;color:#fff;opacity:0;transform:scale(.5);transition:opacity .15s,transform .15s}
.pst-card.selected .pst-check{opacity:1;transform:scale(1)}`,

  js: `var PERSONAS = [
  { id: 'concise', name: 'Concise', icon: '&#9889;', desc: 'Short, direct answers with no filler.' },
  { id: 'creative', name: 'Creative', icon: '&#10024;', desc: 'Imaginative, expressive, exploratory replies.' },
  { id: 'technical', name: 'Technical', icon: '&#9881;', desc: 'Precise, detailed, code and spec oriented.' },
  { id: 'friendly', name: 'Friendly', icon: '&#128075;', desc: 'Warm, conversational, encouraging tone.' },
];

var selected = 'concise';
var grid = document.getElementById('pstGrid');

function render() {
  grid.innerHTML = PERSONAS.map(function (p) {
    var isSelected = p.id === selected;
    return '<button type="button" class="pst-card' + (isSelected ? ' selected' : '') + '" data-id="' + p.id + '">' +
      '<span class="pst-icon">' + p.icon + '</span>' +
      '<span class="pst-body">' +
        '<span class="pst-name">' + p.name + '</span>' +
        '<span class="pst-desc">' + p.desc + '</span>' +
      '</span>' +
      '<span class="pst-ring"><svg class="pst-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>' +
    '</button>';
  }).join('');
}

grid.addEventListener('click', function (e) {
  var card = e.target.closest('.pst-card');
  if (!card) return;
  selected = card.dataset.id;
  render();
});

render();`,

  seo: {
    title: 'AI Persona Selector — Free Assistant Style Picker Card Grid Snippet',
    description: `A selectable grid of AI assistant personas — Concise, Creative, Technical, Friendly — with icon cards and a checkmark-ring selected state. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'AI Persona Selector — Icon Cards with a Checkmark-Ring Selected State',
      description: `Letting users pick how an AI assistant talks to them — terse and direct versus warm and exploratory — is one of the highest-leverage personalization controls in an AI product, and it deserves better UI than a plain dropdown. This snippet builds a persona selector as a grid of selectable cards in plain HTML, CSS, and vanilla JavaScript: an icon, a name, a one-line description, and a checkmark-ring selected state, all driven from one data array.

**One data array, one selected value**

Every persona is an object with an \`id\`, \`name\`, \`icon\`, and \`desc\` in the \`PERSONAS\` array. A single \`selected\` string tracks which one is active, and \`render()\` rebuilds the whole grid from that state on every click — so there's no risk of two cards appearing selected at once, since the selected class is derived, never toggled independently per card.

**A checkmark ring, not just a border**

Each card gets a small circular ring in its top-right corner that fills solid and reveals a checkmark only when selected, in addition to the card's border and background shifting to an indigo accent. This double signal (border + explicit checkmark) makes the selected state readable even at a glance or on a low-contrast display, rather than relying on a subtle border-color change alone.

**Color-coded icons per persona**

Each persona's icon tile gets its own gradient — blue for Concise, pink for Creative, green for Technical, amber for Friendly — using an attribute selector keyed on \`data-id\`. This gives each option a distinct visual identity so the grid is scannable by color before a user even reads the labels, useful when personas are used repeatedly across a product.

**Where this fits in an AI product**

Place it in onboarding right before an [AI chat interface](/ui-snippets/ai-chat-interface/) so the first conversation already reflects the chosen tone, or in account settings next to an [AI model comparison table](/ui-snippets/ai-model-comparison-table/) so users configure both *how* the assistant sounds and *which* model powers it.

**Customizing it**

Add more personas by extending the \`PERSONAS\` array and adding a matching \`data-id\` color rule; swap single-select for multi-select by tracking an array instead of one string; or persist the choice to \`localStorage\` so it survives a reload.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A grid of four persona cards renders with Concise selected by default.` },
      { title: 'Click a different card', text: `The selection moves — the previous card's ring and accent clear, the new one fills in.` },
      { title: 'Check the checkmark ring', text: `Only the selected card shows a filled ring with a checkmark.` },
      { title: 'Resize the window', text: `The grid reflows from one to several columns by width.` },
      { title: 'Edit the PERSONAS array', text: `Add, remove, or rename personas — the grid regenerates from data.` },
      { title: 'Wire up persistence', text: `Save the selected id to your backend or localStorage on change.` },
    ] },
    features: [
      { title: 'Single source of selection', text: `One selected variable drives every card's state — never two selected at once.` },
      { title: 'Checkmark-ring indicator', text: `A filling ring plus checkmark makes the selected state unambiguous.` },
      { title: 'Color-coded persona icons', text: `Each persona gets a distinct gradient tile for at-a-glance recognition.` },
      { title: 'Data-driven cards', text: `Every card renders from one PERSONAS array — no repeated markup.` },
      { title: 'Responsive auto-fill grid', text: `Reflows from one to several columns based on available width.` },
      { title: 'Semantic button cards', text: `Cards are real buttons, so they're keyboard and screen-reader accessible by default.` },
      { title: 'Hover lift feedback', text: `Cards lift slightly on hover to signal interactivity before selection.` },
      { title: 'No dependencies', text: `Pure HTML, CSS, and vanilla JavaScript — no icon library required.` },
    ],
    useCases: [
      { title: 'AI onboarding flows', text: `Let users set assistant tone before their first [AI chat interface](/ui-snippets/ai-chat-interface/) session.` },
      { title: 'Assistant settings pages', text: `Pair with an [AI model comparison table](/ui-snippets/ai-model-comparison-table/) for full configuration.` },
      { title: 'Multi-agent products', text: `Pick which agent persona handles a task, alongside [AI agent steps](/ui-snippets/ai-agent-steps/).` },
      { title: 'Customer support widgets', text: `Let users choose a support bot's tone before starting a chat.` },
      { title: 'Writing assistant tools', text: `Select a writing voice or style before generating content.` },
      { title: 'Any single-select card grid', text: `The pattern generalizes to plan tiers, themes, or notification styles.` },
      { icon: 'CODE', title: 'Related: Blog Post Card Grid', desc: 'See the [Blog Post Card Grid](/ui-snippets/blog-post-card-grid/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Guest WiFi Access Card', desc: 'See the [Guest WiFi Access Card](/ui-snippets/wifi-guest-access-card/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Prescription Refill Card', desc: 'See the [Prescription Refill Card](/ui-snippets/prescription-refill-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the selector guarantee only one card is ever selected?', a: `There's a single selected variable holding one persona id, and render() rebuilds every card's class from that one value on every click. Because the selected state lives in one place rather than being toggled on individual card elements, it's structurally impossible for two cards to end up marked selected at once.` },
      { q: 'How do I add a fifth persona?', a: `Add one object with an id, name, icon, and desc to the PERSONAS array, then add a CSS rule targeting .pst-card[data-id="your-id"] .pst-icon with a background gradient for its icon tile color. The grid layout and selection logic need no changes.` },
      { q: 'Can I allow selecting more than one persona at once?', a: `Yes — change selected from a single string to an array, update the click handler to push/remove the clicked id instead of replacing the value, and update render()'s isSelected check to use array.includes(p.id) instead of equality.` },
      { q: 'How do I persist the selected persona across page reloads?', a: `In the click handler, after updating selected, write it to localStorage.setItem('persona', selected) (or send it to your backend). On load, read that value before the first render() call and use it as the initial selected state, falling back to a default if nothing is stored.` },
      { q: 'How do I use this persona selector in React, Vue, or Angular?', a: `Track selected as component state (useState, a ref, or a signal), map PERSONAS to card elements with a key, and toggle a selected class based on comparing each persona's id to the current selected value. The click handler becomes a simple state setter.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the single-selection state logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how storing selected as one value rather than a class toggled per card guarantees exactly one persona can ever be marked selected, and how the data-id attribute selector wires each persona to its own icon gradient without inline styles. The same assistant can help optimize it — ask whether re-rendering the entire grid on every click is worth simplifying to just toggling classes on two elements (the old and new selection) for a very large persona list. It's also useful for extending the picker: ask it to add persistence to localStorage or a backend call, support multi-select with an array of chosen ids, or add a live preview panel showing a sample response in the selected persona's tone. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "AI persona selector" as a grid of selectable cards in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- A responsive grid of persona cards (e.g. Concise, Creative, Technical, Friendly), each rendered from a single JavaScript data array of objects with an id, a display name, an icon, and a one-line description — no hand-written per-card markup.
- Track which persona is selected using exactly one piece of state (a single variable holding one id, not a class toggled independently on each card), and re-render the whole grid from that one value whenever the selection changes, so it is structurally impossible for two cards to appear selected simultaneously.
- Give each persona's icon a distinct color gradient so the grid is visually distinguishable by color before reading labels, using a data attribute selector rather than inline styles.
- The selected card must show two combined visual signals: an accented border/background on the whole card, and a small circular indicator in the corner that fills solid and reveals a checkmark icon only when that card is selected.
- Cards must be real, keyboard-accessible button elements (not divs with click handlers only), and should lift slightly on hover to signal interactivity.
- Use repeat(auto-fill, minmax(260px, 1fr)) or equivalent so the grid reflows responsively by viewport width.
- Use a dark theme with system-ui font and distinct accent colors per persona icon.`,
    },
  },
};

export default aiPersonaSelector;
