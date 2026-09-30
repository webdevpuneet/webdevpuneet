const blockEditor = {
  id: 'block-editor',
  title: 'Notion-Style Block Editor',
  lastmod: '2026-07-22',
  category: 'forms',
  html: `<div class="editor-page">
  <div class="editor" id="editor"></div>

  <!-- Slash command menu -->
  <div class="slash-menu" id="slash-menu" role="listbox">
    <div class="slash-title">Basic blocks</div>
    <div class="slash-items" id="slash-items"></div>
  </div>

  <p class="editor-hint">Type <kbd>/</kbd> for blocks · <kbd>Enter</kbd> new block · <kbd>Backspace</kbd> on empty removes</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; justify-content: center; padding: 32px 20px; }

.editor-page { width: 100%; max-width: 560px; position: relative; }

.editor {
  background: #1e293b; border: 1px solid #334155;
  border-radius: 16px; padding: 28px 18px;
  min-height: 320px;
}

/* — Blocks — */
.block { display: flex; gap: 4px; position: relative; border-radius: 8px; }
.block:hover { background: rgba(51,65,85,0.25); }

.drag-dots {
  flex-shrink: 0; width: 20px; display: flex;
  align-items: center; justify-content: center;
  color: #475569; opacity: 0; cursor: grab;
  transition: opacity 0.15s; user-select: none;
  font-size: 13px; letter-spacing: -1px;
}
.block:hover .drag-dots { opacity: 1; }

.block-content {
  flex: 1; min-width: 0; outline: none;
  color: #e2e8f0; line-height: 1.65;
  padding: 4px 6px;
  word-break: break-word;
}
/* placeholder for the focused empty block */
.block-content:empty::before {
  content: attr(data-ph);
  color: #475569; pointer-events: none;
}

/* block types */
.block[data-type="p"]  .block-content { font-size: 14.5px; }
.block[data-type="h1"] .block-content { font-size: 24px; font-weight: 800; color: #f8fafc; padding-top: 10px; }
.block[data-type="h2"] .block-content { font-size: 18px; font-weight: 700; color: #f1f5f9; padding-top: 6px; }
.block[data-type="quote"] .block-content {
  border-left: 3px solid #6366f1; padding-left: 14px;
  color: #a5b4fc; font-style: italic; font-size: 14.5px;
}
.block[data-type="bullet"] .block-content { font-size: 14.5px; }
.block[data-type="bullet"] .block-content::after { content: none; }
.block[data-type="bullet"]::before {
  content: '•'; color: #818cf8;
  padding: 4px 0 0 6px; font-size: 14.5px; line-height: 1.65;
}
.block[data-type="todo"] { align-items: flex-start; }
.todo-check {
  margin: 8px 0 0 6px; width: 15px; height: 15px;
  accent-color: #6366f1; cursor: pointer; flex-shrink: 0;
}
.block[data-type="todo"] .block-content { font-size: 14.5px; }
.block.done .block-content { text-decoration: line-through; color: #64748b; }
.block[data-type="divider"] { padding: 10px 6px; }
.block[data-type="divider"] .block-content { display: none; }
.block[data-type="divider"] hr { border: none; border-top: 1px solid #334155; width: 100%; }

/* — Slash menu — */
.slash-menu {
  position: absolute; width: 240px;
  background: #16213a; border: 1px solid #334155;
  border-radius: 12px; padding: 8px;
  box-shadow: 0 18px 45px rgba(0,0,0,0.55);
  opacity: 0; transform: translateY(4px) scale(0.98);
  pointer-events: none; z-index: 30;
  transition: opacity 0.14s, transform 0.14s;
}
.slash-menu.open { opacity: 1; transform: none; pointer-events: all; }
.slash-title {
  font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; color: #475569;
  padding: 4px 8px 8px;
}
.slash-item {
  display: flex; align-items: center; gap: 11px;
  padding: 7px 8px; border-radius: 8px; cursor: pointer;
}
.slash-item.focused { background: #273549; }
.slash-icon {
  width: 30px; height: 30px; border-radius: 7px; flex-shrink: 0;
  background: #1e293b; border: 1px solid #334155;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; color: #94a3b8; font-weight: 700;
}
.slash-label { font-size: 13px; font-weight: 600; color: #e2e8f0; }
.slash-desc { font-size: 11px; color: #64748b; }

.editor-hint { margin-top: 14px; text-align: center; font-size: 12px; color: #475569; }
.editor-hint kbd {
  background: #1e293b; border: 1px solid #334155;
  border-radius: 5px; padding: 1px 6px;
  font-size: 11px; font-family: inherit; color: #94a3b8;
}`,

  js: `const TYPES = [
  { id: 'p',       label: 'Text',      desc: 'Plain paragraph',        icon: 'T',  ph: "Type '/' for commands" },
  { id: 'h1',      label: 'Heading 1', desc: 'Large section heading',  icon: 'H1', ph: 'Heading 1' },
  { id: 'h2',      label: 'Heading 2', desc: 'Medium section heading', icon: 'H2', ph: 'Heading 2' },
  { id: 'todo',    label: 'To-do',     desc: 'Checkbox task item',     icon: '\\u2611', ph: 'To-do' },
  { id: 'bullet',  label: 'Bullet',    desc: 'Simple list item',       icon: '\\u2022', ph: 'List item' },
  { id: 'quote',   label: 'Quote',     desc: 'Highlighted quotation',  icon: '\\u201C', ph: 'Quote' },
  { id: 'divider', label: 'Divider',   desc: 'Horizontal rule',        icon: '\\u2014', ph: '' },
];

const editor    = document.getElementById('editor');
const slashMenu = document.getElementById('slash-menu');
const slashItems = document.getElementById('slash-items');
let slashBlock = null;   // the block that opened the menu
let slashFocus = 0;
let filtered   = TYPES;

/* ————— Block creation ————— */
function makeBlock(type, text) {
  const t = TYPES.find(x => x.id === type) || TYPES[0];
  const el = document.createElement('div');
  el.className = 'block';
  el.dataset.type = type;
  el.innerHTML = '<span class="drag-dots">\\u22EE\\u22EE</span>';
  if (type === 'todo') {
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.className = 'todo-check';
    cb.addEventListener('change', () => el.classList.toggle('done', cb.checked));
    el.appendChild(cb);
  }
  if (type === 'divider') {
    el.insertAdjacentHTML('beforeend', '<hr>');
  }
  const content = document.createElement('div');
  content.className = 'block-content';
  content.contentEditable = type === 'divider' ? 'false' : 'true';
  content.dataset.ph = t.ph;
  content.textContent = text || '';
  el.appendChild(content);
  bindContent(content, el);
  return el;
}

function bindContent(content, block) {
  content.addEventListener('keydown', e => {
    if (slashMenu.classList.contains('open')) {
      if (e.key === 'ArrowDown') { e.preventDefault(); slashFocus = Math.min(slashFocus + 1, filtered.length - 1); paintSlash(); return; }
      if (e.key === 'ArrowUp')   { e.preventDefault(); slashFocus = Math.max(slashFocus - 1, 0); paintSlash(); return; }
      if (e.key === 'Enter')     { e.preventDefault(); applySlash(filtered[slashFocus].id); return; }
      if (e.key === 'Escape')    { closeSlash(); return; }
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      // continue lists/todos; otherwise new paragraph
      const cont = ['todo', 'bullet'].includes(block.dataset.type) && content.textContent.trim()
        ? block.dataset.type : 'p';
      const nb = makeBlock(cont, '');
      block.after(nb);
      focusBlock(nb);
    }
    if (e.key === 'Backspace' && content.textContent === '' && editor.children.length > 1) {
      e.preventDefault();
      const prev = block.previousElementSibling;
      block.remove();
      if (prev) focusBlock(prev, true);
      closeSlash();
    }
  });

  content.addEventListener('input', () => {
    const txt = content.textContent;
    if (txt.startsWith('/')) {
      openSlash(block, txt.slice(1));
    } else {
      closeSlash();
    }
  });
}

function focusBlock(block, toEnd) {
  const c = block.querySelector('.block-content');
  if (!c || c.contentEditable === 'false') return;
  c.focus();
  if (toEnd && c.textContent) {
    const r = document.createRange();
    r.selectNodeContents(c); r.collapse(false);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
  }
}

/* ————— Slash menu ————— */
function openSlash(block, query) {
  slashBlock = block;
  filtered = TYPES.filter(t => t.label.toLowerCase().includes(query.toLowerCase()));
  if (!filtered.length) { closeSlash(); return; }
  slashFocus = 0;
  renderSlash();
  const r = block.getBoundingClientRect();
  const page = document.querySelector('.editor-page').getBoundingClientRect();
  slashMenu.style.left = Math.min(r.left - page.left + 24, page.width - 250) + 'px';
  slashMenu.style.top = (r.bottom - page.top + 6) + 'px';
  slashMenu.classList.add('open');
}

function renderSlash() {
  slashItems.innerHTML = filtered.map((t, i) =>
    '<div class="slash-item' + (i === slashFocus ? ' focused' : '') + '" data-type="' + t.id + '">' +
      '<span class="slash-icon">' + t.icon + '</span>' +
      '<span><span class="slash-label">' + t.label + '</span><br><span class="slash-desc">' + t.desc + '</span></span>' +
    '</div>'
  ).join('');
  slashItems.querySelectorAll('.slash-item').forEach((el, i) => {
    el.addEventListener('mousedown', e => { e.preventDefault(); applySlash(el.dataset.type); });
    el.addEventListener('mousemove', () => { slashFocus = i; paintSlash(); });
  });
}

function paintSlash() {
  slashItems.querySelectorAll('.slash-item').forEach((el, i) =>
    el.classList.toggle('focused', i === slashFocus));
}

function applySlash(type) {
  const nb = makeBlock(type, '');
  slashBlock.replaceWith(nb);
  closeSlash();
  if (type === 'divider') {
    // divider isn't editable — add a paragraph after and focus it
    const p = makeBlock('p', '');
    nb.after(p);
    focusBlock(p);
  } else {
    focusBlock(nb);
  }
}

function closeSlash() {
  slashMenu.classList.remove('open');
  slashBlock = null;
}

document.addEventListener('click', e => {
  if (!e.target.closest('.slash-menu')) closeSlash();
});

/* ————— Seed content ————— */
[
  ['h1', 'Product launch plan'],
  ['p',  'Everything we need before the v2 announcement next month.'],
  ['h2', 'Checklist'],
  ['todo', 'Finalise pricing page copy'],
  ['todo', 'Record the demo video'],
  ['bullet', 'Coordinate with design on social assets'],
  ['quote', 'Ship early, ship often — but never ship broken.'],
  ['p', ''],
].forEach(([t, txt]) => editor.appendChild(makeBlock(t, txt)));

// mark the second todo as done for the demo
const todos = editor.querySelectorAll('.todo-check');
if (todos[1]) { todos[1].checked = true; todos[1].dispatchEvent(new Event('change')); }`,

  seo: {
    title: 'Notion-Style Block Editor — HTML CSS JS Snippet',
    description: 'Block-based editor with a slash command menu, headings, to-dos, quotes and dividers built on contenteditable. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Notion-Style Block Editor — contenteditable Blocks, Slash Command Menu, Keyboard Block Management & Empty-State Placeholders',
      description: `The block editor — pioneered by Notion and now expected in docs tools, CMSs, note apps, and AI writing products — replaces one big rich-text area with a vertical list of independent blocks: paragraphs, headings, to-dos, quotes, each its own editable unit, created and transformed through a slash-command menu. Full implementations (ProseMirror, Lexical, Tiptap, Editor.js) are heavyweight for good reasons, but the core interaction model fits in a few hundred lines of vanilla JavaScript — and building it teaches exactly why those libraries make the choices they do. This snippet implements the recognisable essentials: seven block types, the "/" menu with filtering and keyboard navigation, Enter/Backspace block management, list continuation, and Notion's floating placeholder text.

**One block, one contenteditable**

The critical architectural decision: instead of a single \`contenteditable\` document (the traditional rich-text approach, and the source of most of its legendary pain), *each block owns its own small \`contenteditable\` element*. A block is a flex row — hover-revealed drag dots, an optional checkbox for to-dos, and the \`.block-content\` editable div — with its type stored in \`data-type\` and all type styling driven by \`[data-type="…"]\` attribute selectors. Per-block editables mean the browser can never produce the arbitrary nested markup that plagues monolithic contenteditable (a stray bold span swallowing three paragraphs); the document structure lives in the DOM as a clean list of typed blocks, trivially serialisable by mapping over \`editor.children\`. This is, in miniature, the same model Editor.js uses.

**The slash menu: trigger, filter, place, apply**

Typing "/" as the first character of a block opens the command menu — detected in the \`input\` event by checking \`textContent.startsWith('/')\`, with everything after the slash used as a live filter over the block-type registry (type "/h" and only headings remain). The menu positions itself under the active block via \`getBoundingClientRect()\` math relative to the page wrapper, clamped so it never overflows. Navigation follows the roving-index pattern: ArrowUp/Down move a \`.focused\` highlight, Enter applies, Escape dismisses, and \`mousemove\` syncs the same index so mouse and keyboard never fight. One subtle but load-bearing detail: menu items listen on \`mousedown\` with \`preventDefault()\` rather than \`click\` — a click would first blur the editable and collapse the selection before the handler runs, the classic bug in every toolbar-over-contenteditable UI. Applying a type calls \`makeBlock()\` and \`replaceWith()\`, swapping the slash-bearing paragraph for a fresh block of the chosen type.

**Keyboard block management**

Enter never inserts a newline — it creates the next block (\`preventDefault\`, build, \`block.after(nb)\`, focus). The type of that next block encodes the list-continuation rule: a non-empty to-do or bullet spawns another of the same type, anything else spawns a paragraph — press Enter on an *empty* to-do and you drop back to text, exactly Notion's escape-from-list behaviour. Backspace on an empty block removes it and focuses the previous block with the caret moved to its end, done properly with a collapsed \`Range\` (\`selectNodeContents\` + \`collapse(false)\`) since programmatic focus alone puts the caret at the start. Dividers are the special case: non-editable (\`contentEditable="false"\`), rendered as an \`<hr>\`, and choosing one auto-inserts a focused paragraph after it so the caret always has somewhere to live.

**Placeholders without placeholder attributes**

Divs have no \`placeholder\` attribute, so the hint text uses the CSS trick every block editor relies on: \`.block-content:empty::before { content: attr(data-ph) }\` — each block carries its own hint ("Heading 1", "To-do", "Type '/' for commands") in a data attribute, painted as a pseudo-element only while the element is truly empty, with \`pointer-events: none\` so it never intercepts the caret. Type-specific styling covers the rest: attribute selectors size headings, draw the quote's indigo left border, inject bullet dots via \`::before\` on the block, and strike through completed to-dos via a \`.done\` class toggled by the checkbox.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Write with the block model',
          text: 'Click into the seeded document and type. Press Enter to create a new block — inside the to-dos, Enter continues the checklist; on an empty to-do it drops back to a paragraph. Press Backspace on an empty block to remove it, caret landing at the end of the previous block. Tick a to-do checkbox to strike it through. Hover any block to see the drag-handle dots.',
        },
        {
          title: 'Use the slash menu',
          text: 'On an empty block, type "/" — the command menu opens under the block listing all seven types with icons and descriptions. Keep typing to filter ("/h" shows only headings), navigate with ArrowUp/Down, apply with Enter or a click, dismiss with Escape. Choosing Divider inserts the rule plus a fresh focused paragraph after it, since dividers themselves are not editable.',
        },
        {
          title: 'Add your own block types',
          text: 'Register a type in the TYPES array — { id: "callout", label: "Callout", desc: "Highlighted note", icon: "💡", ph: "Callout" } — then add its CSS as a .block[data-type="callout"] .block-content rule (tinted background, padding, radius). For types needing extra DOM (like the to-do checkbox), add a branch in makeBlock(). The slash menu, filtering, and keyboard flow pick the new type up automatically.',
        },
        {
          title: 'Serialise and restore documents',
          text: 'The DOM is the document model, so saving is a map: [...editor.children].map(b => ({ type: b.dataset.type, text: b.querySelector(".block-content")?.textContent ?? "", done: b.classList.contains("done") })). Persist the JSON (localStorage or your API), and restore by feeding it through the same seed loop the demo uses. Debounce saves on the editor\'s input event for autosave — pair with the [Form Autosave Indicator](/ui-snippets/form-autosave-indicator).',
        },
        {
          title: 'Add block reordering',
          text: 'The drag dots are ready for it: set draggable on the handle, store the dragged block on dragstart, and in dragover on the editor compute the nearest block boundary from event.clientY and insertBefore accordingly — the same algorithm as the [Drag Sort List](/ui-snippets/drag-sort-list) snippet. Alternatively, bind Alt+ArrowUp/Down to swap the focused block with its sibling for keyboard-only reordering, which is simpler and equally Notion-authentic.',
        },
        {
          title: 'Know when to graduate to a library',
          text: 'This pattern handles typed blocks of plain text superbly and stays understandable. The moment you need inline formatting spans (bold mid-sentence), collaborative cursors, or undo history beyond the browser\'s per-element default, reach for Lexical, Tiptap, or ProseMirror — they exist precisely for those. Click JSX to export the React version of this one; its per-block model maps naturally onto components with a blocks array in state.',
        },
      ],
    },
    features: [
      'Seven block types — text, two heading levels, to-do with checkbox, bullet, quote, divider — styled purely via data-type attribute selectors',
      'Per-block contenteditable architecture: clean typed structure, no monolithic rich-text DOM chaos',
      'Slash command menu with live filtering, icon cards, roving keyboard focus, and getBoundingClientRect placement',
      'mousedown + preventDefault on menu items so applying a command never blurs the editable first',
      'Enter creates blocks with list continuation; empty to-do/bullet escapes back to paragraph — Notion\'s exact rule',
      'Backspace on empty removes the block and restores the caret to the previous block\'s end via a collapsed Range',
      'Notion-style placeholders: :empty::before + content: attr(data-ph), per-type hint text, zero JS',
      'Hover-revealed drag handles and one-map serialisation of the whole document from the DOM',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'Notes, docs, and knowledge-base features inside your product',
        desc: 'SaaS products keep growing document surfaces — meeting notes in CRMs, runbooks in ops tools, briefs in project managers — and users now expect the Notion interaction grammar there: slash commands, to-dos, block placeholders. This snippet delivers that grammar at a weight you can actually embed and audit, with serialisation being a single map over children. Start here for typed plain-text blocks; the how-to lists the precise triggers (inline spans, collaboration) for graduating to Lexical or Tiptap later.',
      },
      {
        icon: 'FORM',
        title: 'Structured content entry for CMSs and page builders',
        desc: 'Block editors beat big textareas for CMS content because the output is structured data, not an HTML blob: each block arrives typed (h2, quote, callout), so rendering, validation, and design-system enforcement happen per type. Wire the serialised JSON to your content API and render blocks server-side with your own components. Custom types are one registry entry plus one CSS rule — an image-upload block or CTA block slots into the same slash menu unchanged.',
      },
      {
        icon: 'FLOW',
        title: 'AI writing tools that generate and edit block documents',
        desc: 'AI writing products need a canvas the model can populate structurally — generate an outline as h2 blocks, expand each into paragraphs, insert to-dos from action items. Because this editor\'s document model is a JSON array of typed blocks, LLM output maps onto it directly (ask the model for that exact shape), and streaming generation can append blocks live with makeBlock(). Combine with the [AI Streaming Response](/ui-snippets/ai-streaming-response) for the generation feed and the [AI Prompt Composer](/ui-snippets/ai-prompt-composer) as the instruction bar.',
      },
      {
        icon: 'LEARN',
        title: 'Learning contenteditable\'s real behaviour and Selection/Range APIs',
        desc: 'contenteditable is infamous, and this snippet is a guided tour of taming it: per-block isolation as the structural defence, the mousedown-vs-click blur trap on menu items, caret placement with collapsed Ranges, and placeholders via :empty::before. These four techniques transfer to every editable surface you will ever build — comment boxes, inline rename fields, caption editors. Compare with the [Inline Edit Field](/ui-snippets/inline-edit-field) and [Mention Autocomplete](/ui-snippets/mention-autocomplete) snippets, which reuse the same primitives in smaller settings.',
      },
      {
        icon: 'DOC',
        title: 'Checklist and runbook tools with mixed content',
        desc: 'The to-do block with list continuation makes this a natural checklist editor that also carries context: an incident runbook interleaves h2 phase headings, explanatory paragraphs, and actionable to-dos whose done-state serialises with the document. Enter-continues-the-list matches how people brain-dump tasks; the strike-through done styling and the escape-on-empty-Enter rule keep entry fast. Pair with the [Onboarding Checklist Widget](/ui-snippets/onboarding-checklist-widget) for the read-only rendering of the same data.',
      },
      {
        icon: 'CODE',
        title: 'Slash-command UX for any input surface',
        desc: 'The menu subsystem stands alone: trigger-character detection in input events, query filtering over a registry, rect-based placement, roving focus, and blur-safe application. Reuse it for "/" commands in chat composers (insert a poll, attach a file), "@" mentions, or ":" emoji pickers — swap the trigger check and the registry. It is the same interaction core as the [Command Palette](/ui-snippets/command-palette), scoped to a text caret instead of a global overlay, and the [Emoji Picker](/ui-snippets/emoji-picker) slots in as an alternate payload.',
      },
      { icon: 'CODE', title: 'Related: Calculator', desc: 'See the [Calculator](/ui-snippets/calculator/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why one contenteditable per block instead of a single editable document?',
        a: 'A single contenteditable region hands document structure to the browser, and browsers make chaotic editing decisions: pressing Enter might produce a div, a p, or a br depending on engine and context; deleting across a boundary can merge elements into arbitrarily nested spans; pasted content imports foreign markup. Every serious editor spends most of its complexity budget fighting this. Per-block editables sidestep the whole class of problems — the browser only ever edits flat text inside one small div, while all structure (creating, removing, transforming, reordering blocks) goes through your JavaScript, which is exactly the "state-owns-structure" philosophy ProseMirror and Lexical implement with virtual documents. The trade-offs you accept: cross-block text selection doesn\'t work naturally (Notion itself restricts it, switching to block-level selection), and inline formatting within a block needs either execCommand-style spans or a token model. For typed plain-text blocks — checklists, outlines, structured notes — those trade-offs cost nothing.',
      },
      {
        q: 'Why do the slash-menu items listen on mousedown instead of click, and why preventDefault?',
        a: 'Because of focus timing. A click is mousedown + mouseup, and the browser processes focus changes on mousedown: clicking a menu item first blurs the contenteditable block, which collapses the selection and (in a naive implementation) may close the menu via a blur handler — so by the time the click event fires, the context the command needs is gone. Listening on mousedown gets in before any of that, and calling preventDefault() on it suppresses the default focus-transfer entirely, so the editable never blurs and the caret survives. This is the single most common bug in toolbar-over-editor UIs — bold buttons that "lose the selection" — and the fix is always the same pair: mousedown listener, preventDefault, then perform the command against the still-live selection. The demo\'s applySlash then moves focus deliberately to the newly created block, which is the one intentional focus change in the flow.',
      },
      {
        q: 'How would I add inline formatting like bold and italic inside blocks?',
        a: 'Three tiers, in order of effort. Quickest: allow the browser\'s native shortcuts (Ctrl/Cmd+B and +I work inside contenteditable in all modern browsers, producing <b>/<i> tags) and serialise innerHTML per block instead of textContent — sanitise it on save with an allowlist (b, i, a, code) because contenteditable HTML must never be trusted. Middle: add a floating toolbar that appears on selection (listen for selectionchange, position over getSelection().getRangeAt(0).getBoundingClientRect()) and apply formatting by wrapping the range in elements yourself — reuse the mousedown/preventDefault rule from the slash menu for its buttons. Full: adopt a token-based model where each block stores [{ text, marks: ["bold"] }] segments and renders spans from data — that is the point where you have rebuilt the core of Lexical, and adopting Lexical or Tiptap outright becomes the honest choice. For many products (checklists, outlines, briefs), tier one plus a code-block type covers real usage.',
      },
      {
        q: 'Can I build this in React or Angular, and does Tailwind cover the styling?',
        a: 'React needs one architectural caution: contenteditable and React\'s controlled rendering conflict, because re-rendering a block\'s text from state resets the caret. The working pattern is uncontrolled blocks — keep the blocks array in state for structure (ids, types, order) but let each block\'s DOM own its text, syncing to state on onInput without echoing state back into the element (suppressContentEditableWarning, and never put the text in JSX). Structural operations (Enter, Backspace, slash-apply) go through setState splices keyed by block id. Angular is analogous: an @for over a signal array of block metadata, [attr.contenteditable] bindings, and text captured on input events without rebinding innerText. Tailwind maps cleanly since all type styling is attribute-driven: data-[type=h1]:text-2xl data-[type=h1]:font-extrabold on the content, data-[type=quote]:border-l-2 data-[type=quote]:border-indigo-500 data-[type=quote]:italic, the placeholder via empty:before:content-[attr(data-ph)] empty:before:text-slate-600, and the menu with the usual popover utilities.',
      },
    ],
    aiPrompt: {
      paragraph: `The two hardest ideas in this snippet — why structure must never be left to contenteditable, and why menu buttons listen on mousedown — are exactly the kind of thing an AI assistant explains well against concrete code: paste the file into Claude and ask it to demonstrate each by describing what a user would observe if you changed the architecture (one big editable) or the event (click instead of mousedown). Then extend it where your product needs: ask for a callout or code block type end-to-end (registry entry, makeBlock branch, CSS, serialisation), drag-to-reorder using the existing handle dots with the nearest-boundary insertBefore algorithm, or Alt+Arrow keyboard reordering if you want the simpler path. For persistence, have it write the debounced autosave that serialises editor.children to your API and the restore path that rebuilds from JSON. And before you scale this up, ask the assistant the honest architectural question: given your feature list — inline bold? collaboration? undo across blocks? — should you extend this or adopt Lexical/Tiptap, and what is the migration cost of each answer. That conversation is worth more than the code.`,
      prompt: `Build a Notion-style block editor in plain HTML, CSS, and JavaScript — typed content blocks with a slash command menu, no editor libraries.

Requirements:
- Architect the document as a vertical list of blocks where EACH block contains its own small contenteditable content element (never one monolithic editable region), with the block type stored in a data attribute and all type styling driven by [data-type] attribute selectors.
- Support seven types from a single registry array (id, label, description, icon, placeholder): paragraph, heading 1, heading 2, to-do with a real checkbox that strikes through the text via a toggled class, bullet with the dot drawn by a ::before pseudo-element, quote with an accent left border, and a non-editable divider rendered as an hr.
- Typing "/" as the first character of a block opens a command menu positioned under that block via getBoundingClientRect: it lists the registry with icon tiles and descriptions, filters live as the user keeps typing after the slash, supports ArrowUp/ArrowDown roving focus synced with mousemove, applies on Enter or click, and dismisses on Escape or outside click; applying replaces the block with a fresh one of the chosen type (a divider must auto-insert a focused paragraph after itself).
- Menu items must listen on mousedown with preventDefault rather than click, so choosing a command never blurs the editable and collapses the caret first — comment why.
- Enter never inserts a newline: it creates the next block, continuing the same type after a non-empty to-do or bullet but escaping to a paragraph after an empty one; Backspace on an empty block removes it and places the caret at the END of the previous block using a collapsed Range (selectNodeContents + collapse(false)).
- Implement per-type placeholder hints with zero JavaScript via .block-content:empty::before { content: attr(data-ph) }, and reveal drag-handle dots on block hover.
- Seed a demo document (heading, paragraph, sub-heading, two to-dos with one checked, a bullet, a quote), and comment how the whole document serialises to JSON by mapping over the editor's children.`,
    },
  },
};

export default blockEditor;
