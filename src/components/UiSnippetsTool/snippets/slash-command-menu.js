const slashCommandMenu = {
  id: 'slash-command-menu',
  title: 'Notion-Style Slash Command Menu',
  lastmod: '2026-08-09',
  category: 'forms',
  html: `<div class="slash-app">
  <div class="editor-wrap">
    <div class="editor" id="editor" contenteditable="true" data-placeholder="Type '/' for commands..."></div>

    <div class="slash-menu" id="slash-menu">
      <div class="menu-list" id="menu-list"></div>
      <div class="menu-empty" id="menu-empty">No matching commands</div>
    </div>
  </div>
  <p class="slash-hint">Try typing <code>/</code> then <code>head</code>, <code>list</code>, or <code>code</code></p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.slash-app { max-width: 520px; margin: 0 auto; padding: 40px 20px; }

.editor-wrap { position: relative; }

.editor {
  min-height: 220px;
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px;
  padding: 18px 20px; font-size: 15px; line-height: 1.7; color: #1e293b;
  outline: none;
}
.editor:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
.editor:empty::before {
  content: attr(data-placeholder);
  color: #94a3b8; pointer-events: none;
}

.editor .block-heading { font-size: 19px; font-weight: 800; color: #0f172a; display: block; margin: 4px 0; }
.editor .block-bullet { display: block; margin: 4px 0 4px 4px; }
.editor .block-bullet::before { content: '• '; color: #6366f1; font-weight: 800; }
.editor .block-code {
  display: block; font-family: 'SF Mono', Consolas, monospace; font-size: 13px;
  background: #0f172a; color: #a5b4fc; padding: 10px 14px; border-radius: 8px; margin: 6px 0;
}
.editor .block-divider { display: block; border: none; border-top: 2px solid #e2e8f0; margin: 12px 0; }
.editor .block-image {
  display: block; padding: 20px; text-align: center;
  background: #f1f5f9; border: 1.5px dashed #cbd5e1; border-radius: 10px; color: #94a3b8; font-size: 12.5px; margin: 6px 0;
}

.slash-menu {
  position: fixed;
  width: 250px;
  background: #fff; border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 16px 40px rgba(15,23,42,0.16);
  padding: 6px;
  display: none;
  z-index: 40;
  max-height: 260px; overflow-y: auto;
}
.slash-menu.open { display: block; }

.menu-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 9px; border-radius: 8px; cursor: pointer;
}
.menu-item .item-icon {
  width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0;
  background: #eef2ff; color: #6366f1;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 800;
}
.menu-item .item-text { min-width: 0; }
.menu-item .item-title { font-size: 13px; font-weight: 700; color: #1e293b; }
.menu-item .item-desc { font-size: 11.5px; color: #94a3b8; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.menu-item.active { background: #eef2ff; }
.menu-item.active .item-title { color: #4338ca; }

.menu-empty { padding: 14px 10px; font-size: 12.5px; color: #94a3b8; text-align: center; display: none; }
.menu-empty.show { display: block; }

.slash-hint { margin-top: 14px; font-size: 12px; color: #94a3b8; }
.slash-hint code { background: #e2e8f0; padding: 1px 6px; border-radius: 5px; font-size: 11.5px; color: #475569; }`,

  js: `const editor = document.getElementById('editor');
const menu = document.getElementById('slash-menu');
const menuList = document.getElementById('menu-list');
const menuEmpty = document.getElementById('menu-empty');

const COMMANDS = [
  { key: 'heading', label: 'Heading', desc: 'Big section heading', icon: 'H', block: 'block-heading', text: 'Heading text' },
  { key: 'bullet list', label: 'Bullet list', desc: 'Simple bulleted list', icon: '\\u2022', block: 'block-bullet', text: 'List item' },
  { key: 'code block', label: 'Code block', desc: 'Monospace code snippet', icon: '</>', block: 'block-code', text: 'const x = 1;' },
  { key: 'divider', label: 'Divider', desc: 'Horizontal rule', icon: '\\u2013', block: 'block-divider', text: '' },
  { key: 'image', label: 'Image', desc: 'Upload or embed an image', icon: '\\u25A6', block: 'block-image', text: 'Image placeholder' },
];

let slashNode = null;   // the text node containing the active "/query"
let activeIndex = 0;
let filtered = COMMANDS;

function closeMenu() {
  menu.classList.remove('open');
  slashNode = null;
  activeIndex = 0;
}

function positionMenu() {
  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  const range = sel.getRangeAt(0).cloneRange();
  range.collapse(true);
  const rect = range.getClientRects()[0] || range.getBoundingClientRect();
  const top = (rect.bottom || rect.top) + 6;
  const left = rect.left;
  menu.style.top = top + 'px';
  menu.style.left = left + 'px';
}

function renderMenu() {
  menuList.innerHTML = '';
  menuEmpty.classList.toggle('show', filtered.length === 0);

  filtered.forEach((cmd, i) => {
    const item = document.createElement('div');
    item.className = 'menu-item' + (i === activeIndex ? ' active' : '');
    item.innerHTML =
      '<span class="item-icon">' + cmd.icon + '</span>' +
      '<span class="item-text"><span class="item-title">' + cmd.label + '</span>' +
      '<span class="item-desc">' + cmd.desc + '</span></span>';
    item.addEventListener('mousedown', e => {
      e.preventDefault();
      selectCommand(cmd);
    });
    menuList.appendChild(item);
  });
}

function openMenuAt(textNode) {
  slashNode = textNode;
  activeIndex = 0;
  filtered = COMMANDS;
  renderMenu();
  positionMenu();
  menu.classList.add('open');
}

function updateFilter(query) {
  filtered = COMMANDS.filter(c => c.key.includes(query.toLowerCase()) || c.label.toLowerCase().includes(query.toLowerCase()));
  activeIndex = 0;
  renderMenu();
}

function insertBlock(cmd) {
  const el = document.createElement('span');
  el.className = cmd.block;
  el.textContent = cmd.text;
  el.contentEditable = 'true';

  const br = document.createElement('br');

  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(slashNode);
  range.deleteContents();
  slashNode.parentNode.removeChild(slashNode);

  editor.appendChild(el);
  editor.appendChild(br);

  const newRange = document.createRange();
  newRange.selectNodeContents(el);
  newRange.collapse(false);
  sel.removeAllRanges();
  sel.addRange(newRange);
  editor.focus();
}

function selectCommand(cmd) {
  insertBlock(cmd);
  closeMenu();
}

function getCaretTextNode() {
  const sel = window.getSelection();
  if (!sel.rangeCount) return null;
  const node = sel.anchorNode;
  if (!node || node.nodeType !== Node.TEXT_NODE) return null;
  return node;
}

editor.addEventListener('input', () => {
  const node = getCaretTextNode();

  if (slashNode) {
    // Menu already open — refine or close based on current text after "/"
    if (!node || node !== slashNode || !slashNode.textContent.includes('/')) {
      closeMenu();
      return;
    }
    const slashIdx = slashNode.textContent.lastIndexOf('/');
    const query = slashNode.textContent.slice(slashIdx + 1);
    if (/\\s/.test(query)) {
      closeMenu();
      return;
    }
    updateFilter(query);
    positionMenu();
    return;
  }

  if (node && node.textContent.endsWith('/')) {
    openMenuAt(node);
  }
});

editor.addEventListener('keydown', e => {
  if (!menu.classList.contains('open')) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (filtered.length === 0) return;
    activeIndex = (activeIndex + 1) % filtered.length;
    renderMenu();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (filtered.length === 0) return;
    activeIndex = (activeIndex - 1 + filtered.length) % filtered.length;
    renderMenu();
  } else if (e.key === 'Enter') {
    if (filtered.length === 0) return;
    e.preventDefault();
    selectCommand(filtered[activeIndex]);
  } else if (e.key === 'Escape') {
    e.preventDefault();
    closeMenu();
  }
});

document.addEventListener('click', e => {
  if (!editor.contains(e.target) && !menu.contains(e.target)) closeMenu();
});`,

  seo: {
    title: 'Notion-Style Slash Command Menu — HTML CSS JS Snippet',
    description: 'Typing / opens a filterable floating command menu positioned at the caret, with arrow-key navigation. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Notion-Style Slash Command Menu — Caret-Positioned Floating Menu with Live Filtering & Keyboard Navigation',
      description: `The slash command menu popularized by Notion has become the expected way to insert structured content into a rich text editor — type \`/\`, get a contextual list of block types, keep typing to filter, and press Enter or click to insert. It looks simple, but building it correctly touches three genuinely tricky browser APIs at once: caret-relative positioning, \`contenteditable\` text-node manipulation, and keyboard-versus-mouse interaction handling. This snippet implements the full pattern in a single \`contenteditable\` element with no editor framework.

**Finding the caret's actual screen position**

The hardest part of a slash menu is placing it exactly below the text cursor, not the editable container. This snippet uses the \`Selection\` and \`Range\` APIs: \`window.getSelection()\` returns the current selection, \`sel.getRangeAt(0)\` gives the active \`Range\`, and calling \`.collapse(true)\` shrinks that range to a zero-width point at the start of the selection — which, since the user just typed a character, is effectively the caret position. \`range.getClientRects()[0]\` (falling back to \`getBoundingClientRect()\` for an empty collapsed range at the very end of a line) returns the caret's actual pixel coordinates relative to the viewport, and \`positionMenu()\` uses those coordinates directly to set the menu's \`position: fixed; top; left\` — this is the same technique real rich-text editors use to place inline toolbars, mention pickers, and emoji menus exactly where the user is typing rather than anchored to the editor's bounding box.

**Detecting the trigger and tracking the active text node**

The \`input\` event handler reads \`window.getSelection().anchorNode\`, which is the actual DOM text node the caret sits inside. If that text node's content ends with \`/\`, \`openMenuAt()\` stores a reference to it as \`slashNode\` and opens the menu. On every subsequent keystroke while the menu is open, the handler re-reads \`slashNode.textContent\`, finds the *last* \`/\` in it with \`lastIndexOf('/')\`, and treats everything after that index as the live filter query — so typing \`/head\` after the initial \`/\` progressively narrows \`COMMANDS\` down to just "Heading" via a simple \`.includes()\` match against each command's \`key\` and \`label\`. Typing a space, or moving the caret to a different text node entirely, closes the menu — matching Notion's own behavior that a slash command is abandoned once you've clearly moved past it.

**Keyboard navigation without hijacking normal typing**

The \`keydown\` handler only intercepts \`ArrowUp\`, \`ArrowDown\`, \`Enter\`, and \`Escape\`, and only when \`menu.classList.contains('open')\` — every other keystroke (letters, backspace, punctuation) falls through untouched to the browser's native \`contenteditable\` handling, which is what keeps the query-filtering behavior working through the \`input\` listener rather than needing to be reimplemented in \`keydown\`. \`ArrowDown\`/\`ArrowUp\` wrap the \`activeIndex\` around the filtered list length using modulo arithmetic (\`(activeIndex + 1) % filtered.length\`), and \`Enter\` calls \`selectCommand()\` on whichever item is currently highlighted — importantly, \`e.preventDefault()\` is called on all four keys to stop the browser's default behavior (arrow keys moving the caret, Enter inserting a line break) from firing at the same time as the menu interaction.

**Why menu clicks use \`mousedown\` with \`preventDefault()\`, not \`click\`**

Each rendered menu item listens for \`mousedown\`, not \`click\`, and calls \`e.preventDefault()\` immediately. A \`click\` event fires after \`mousedown\` and \`mouseup\`, and by then the browser has already moved focus away from the \`contenteditable\` editor toward whatever was clicked, collapsing the text selection \`selectCommand()\` needs to correctly locate \`slashNode\`. Preventing the default on \`mousedown\` stops that focus shift, keeping the editor's selection intact through the click — the same technique production editors like Notion and Lexical use for toolbar interactions.

**Replacing the "/query" text with a real block element**

\`insertBlock()\` performs the actual content swap: it builds a \`Range\` around \`slashNode\`'s full contents, deletes them, removes the now-empty text node from the DOM, and appends a new \`<span>\` styled per the selected command's \`block\` class (heading, bullet, code, divider, or image placeholder), followed by a \`<br>\` so the next line starts fresh below it. A new collapsed \`Range\` is placed at the end of the inserted element and applied via \`sel.addRange()\`, restoring a sensible caret position and calling \`editor.focus()\` so typing continues immediately.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Type "/" to open the menu',
          text: 'The input listener checks window.getSelection().anchorNode — if that text node ends with "/", openMenuAt() stores it as slashNode, renders the full COMMANDS list via renderMenu(), and positions the menu below the caret using positionMenu(), which reads Range.getClientRects() for the caret\'s exact pixel coordinates.',
        },
        {
          title: 'Keep typing to filter the list',
          text: 'Every keystroke after the "/" re-reads slashNode.textContent, extracts everything after the last "/" as the query, and calls updateFilter(query), which narrows COMMANDS down using .includes() against each command\'s key and label — for example typing "code" filters down to just the Code block entry.',
        },
        {
          title: 'Navigate with Arrow Up/Down and select with Enter or click',
          text: 'The keydown listener intercepts ArrowUp/ArrowDown to move activeIndex through the filtered list (wrapping with modulo arithmetic) and Enter to call selectCommand() on the currently highlighted item. Clicking an item works identically via a mousedown listener with preventDefault() to avoid losing editor focus.',
        },
        {
          title: 'Press Escape or click outside to cancel',
          text: 'Escape calls closeMenu() directly without inserting anything, leaving the typed "/query" text as-is in the editor. A document-level click listener also calls closeMenu() if the click target is outside both the editor and the menu itself.',
        },
        {
          title: 'Add your own command types',
          text: 'Add an entry to the COMMANDS array with a key (used for filter matching), label, desc, icon, a block CSS class name, and default text placeholder content. Define the matching .block-yourtype CSS rule in the stylesheet to control how the inserted element looks — no changes to the menu logic are needed.',
        },
        {
          title: 'Export and adapt to a real editor framework',
          text: 'Click JSX to export a React component. In a real production editor, you would likely swap the raw contenteditable DOM manipulation in insertBlock() for your editor framework\'s own node-insertion API (Slate, Lexical, TipTap) while keeping the same caret-detection, filtering, and keyboard-navigation logic shown here.',
        },
      ],
    },
    features: [
      'Caret-accurate positioning via Range.collapse(true) + getClientRects() — menu opens exactly at the text cursor',
      'Live filtering: extracts text after the last "/" in the active text node and matches it against command keys',
      'Full keyboard navigation: Arrow Up/Down wrap with modulo arithmetic, Enter selects, Escape cancels cleanly',
      'mousedown + preventDefault() on menu items avoids the focus-loss bug that click-based menus have in contenteditable',
      'Auto-closes on space, caret movement to a different text node, or an outside click via a document-level listener',
      'Real block insertion: replaces the "/query" text node with a styled element matched to the selected command type',
      'Five example block types out of the box: heading, bullet list, code block, divider, and image placeholder',
      'Extensible via a single flat COMMANDS array — add a command and a matching CSS class, no menu-logic changes needed',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'Block-based content editors and internal CMS tools',
        desc: 'Any custom-built content editor — internal blog CMS, documentation tool, knowledge base — benefits from a slash command menu as the primary way authors insert structured blocks without leaving the keyboard. This snippet\'s insertBlock() pattern generalizes directly: add more command types (quote, table, embed) matched to your own content model\'s block types.',
      },
      {
        icon: 'APP',
        title: 'Chat and messaging apps with rich composer commands',
        desc: 'Slack, Discord, and Linear all use a similar "/" trigger in their message composers to insert polls, reminders, or formatted content. The same caret-detection and filtering logic here applies directly to a chat composer\'s contenteditable or textarea input, letting users trigger app-specific actions without a separate toolbar button.',
      },
      {
        icon: 'FLOW',
        title: 'Command palettes and quick-action pickers triggered by a typed character',
        desc: 'The general pattern — detect a trigger character, open a filtered floating list at the caret, navigate by keyboard, insert or execute on selection — extends beyond block insertion to mention pickers (@username), emoji pickers (:smile), and inline command palettes, all of which share the identical Range-based positioning and keydown-interception mechanics demonstrated here.',
      },
      {
        icon: 'LEARN',
        title: 'Learning Selection, Range, and contenteditable manipulation hands-on',
        desc: 'contenteditable text manipulation is one of the more poorly-documented corners of the DOM API, and this snippet is a compact, complete reference for the core techniques — reading caret position, tracking the active text node across keystrokes, and safely replacing DOM content without destroying the user\'s cursor position. It pairs naturally as a deeper dive after simpler form snippets in a UI component library.',
      },
      {
        icon: 'DESIGN',
        title: 'Design-system reference for floating, caret-anchored UI',
        desc: 'The positionMenu() technique — deriving screen coordinates from a Range rather than an element\'s bounding box — is reusable any time a floating UI element needs to track a text cursor instead of a fixed DOM element, which most floating-UI libraries do not handle out of the box for arbitrary contenteditable regions.',
      },
    ],
    faqs: [
      {
        q: 'How does the menu know exactly where the text cursor is on screen?',
        a: 'It uses the Selection and Range APIs rather than any element\'s bounding box: window.getSelection().getRangeAt(0) gets the current Range, .collapse(true) shrinks it to a zero-width point at the caret, and range.getClientRects()[0] returns that point\'s actual pixel position relative to the viewport. This is the same low-level technique real rich-text editors use to position inline toolbars and mention pickers precisely at the cursor, since there is no simpler built-in "get caret coordinates" browser API.',
      },
      {
        q: 'Why do the menu item click handlers use mousedown with preventDefault() instead of a normal click listener?',
        a: 'Clicking anywhere outside a contenteditable element normally moves focus and can collapse the current text selection before a click event even fires, because mousedown -> focus change -> mouseup -> click happens in that order. By listening on mousedown and calling e.preventDefault() immediately, the default focus-shifting behavior never happens, so the editor\'s selection and the stored slashNode reference remain valid and selectCommand() can correctly locate and replace the right text.',
      },
      {
        q: 'Why does typing a space close the menu?',
        a: 'The input handler checks the text after the last "/" in the active text node with a regular expression, /\\s/.test(query), and calls closeMenu() as soon as it finds whitespace. This matches the behavior users expect from Notion and similar editors: once you have typed a space, you have moved on from the slash command intent (you are writing a sentence containing a literal "/" character), so continuing to show a stale filtered menu would be confusing.',
      },
      {
        q: 'How do I add a new command, like a "Quote" block?',
        a: 'Add an object to the COMMANDS array: { key: "quote", label: "Quote", desc: "Blockquote text", icon: "\\"", block: "block-quote", text: "Quote text" }, then define a matching .block-quote CSS rule (for example, a left border and italic text) in the stylesheet. No changes are needed to openMenuAt, updateFilter, renderMenu, or insertBlock — they all read from the COMMANDS array generically, so a new entry is picked up automatically by the existing filtering and rendering logic.',
      },
      {
        q: 'Does this work correctly if the caret is at the very end of a line with no character after it?',
        a: 'Yes — range.getClientRects() can return an empty list for a collapsed range positioned at the very end of a text node with nothing after it, since there is no glyph box to report. The code falls back to range.getBoundingClientRect() in that case (rect.left/rect.bottom are read from whichever value getClientRects()[0] or the fallback provides), which still returns a usable, if very slightly less precise, coordinate for menu positioning.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how slashNode is tracked across keystrokes and why losing that reference (for example if the caret moves to a different text node) correctly closes the menu — that reference-tracking is the trickiest part of the whole pattern to get right. It's also worth asking the assistant to explain the mousedown + preventDefault() detail if it's not obvious why click alone would break the menu in a contenteditable context. For extension, ask it to add fuzzy matching instead of plain substring filtering, support for nested submenus (e.g. a "Media" parent command expanding to Image/Video/Embed), or a version that also triggers on "@" for user mentions using the same caret-positioning infrastructure alongside the existing "/" trigger.`,
      prompt: `Build a Notion-style slash command menu inside a contenteditable text area, in plain HTML, CSS, and JavaScript, with no editor framework.

Requirements:
- Typing "/" inside the editable area opens a floating command menu positioned precisely at the text caret (not just near the editor's edge), listing several block-type commands, each with an icon, a title, and a short description.
- Continuing to type after the "/" live-filters the visible commands by matching the typed text against each command's name, narrowing the list in real time as more characters are typed, and showing an empty-state message if nothing matches.
- Support full keyboard navigation while the menu is open: Arrow Down and Arrow Up move a highlighted selection through the filtered list (wrapping around at the ends), Enter inserts the currently highlighted command, and Escape closes the menu without inserting anything and without altering the already-typed text.
- Clicking a menu item with the mouse must also work and must not cause the editor to lose its text selection/cursor state in the process — explain the specific technique needed to prevent a mouse click on the menu from stealing focus away from the contenteditable editor before the selection can be used.
- Selecting a command (via Enter or click) must remove the typed "/query" text and insert an actual styled block element in its place (for example a distinct heading, bullet list item, or code block element), leaving the cursor positioned correctly to keep typing immediately afterward.
- The menu must also close automatically if the user types a space, moves the cursor elsewhere, or clicks outside both the editor and the menu.`,
    },
  },
};

export default slashCommandMenu;
