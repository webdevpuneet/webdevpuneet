const emojiPicker = {
  id: 'emoji-picker',
  title: 'Emoji Picker',
  category: 'forms',
  html: `<div class="page">
  <div class="chat-demo">
    <div class="chat-output" id="chat-output">
      <div class="chat-msg">Hey! How's it going? 👋</div>
      <div class="chat-msg outgoing">Pretty good! Just testing this emoji picker 😄</div>
    </div>

    <div class="input-row">
      <div class="emoji-wrap" id="emoji-wrap">
        <button class="emoji-trigger" id="emoji-trigger" onclick="togglePicker()" aria-label="Insert emoji" aria-haspopup="true" aria-expanded="false">😊</button>

        <div class="picker" id="picker" role="dialog" aria-label="Emoji picker">
          <div class="picker-search">
            <input class="search-inp" id="search-inp" type="text" placeholder="Search emoji…" oninput="filterEmoji(this.value)">
          </div>
          <div class="cat-tabs" id="cat-tabs">
            <button class="cat-tab active" data-cat="recent" onclick="showCat(this,'recent')">🕐</button>
            <button class="cat-tab" data-cat="smileys" onclick="showCat(this,'smileys')">😀</button>
            <button class="cat-tab" data-cat="people" onclick="showCat(this,'people')">👋</button>
            <button class="cat-tab" data-cat="nature" onclick="showCat(this,'nature')">🌿</button>
            <button class="cat-tab" data-cat="food" onclick="showCat(this,'food')">🍕</button>
            <button class="cat-tab" data-cat="symbols" onclick="showCat(this,'symbols')">💡</button>
          </div>
          <div class="emoji-grid" id="emoji-grid"></div>
          <div class="picker-footer" id="picker-footer">Click an emoji to add it</div>
        </div>
      </div>

      <input class="chat-input" id="chat-input" type="text" placeholder="Type a message…">
      <button class="send-btn" onclick="sendMsg()">Send</button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 24px; }

.page { width: 100%; max-width: 420px; padding-top: 280px; }

.chat-demo { background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; }

.chat-output { padding: 16px; display: flex; flex-direction: column; gap: 8px; min-height: 130px; }
.chat-msg { background: #f1f5f9; color: #374151; font-size: 13px; padding: 8px 12px; border-radius: 16px 16px 16px 4px; max-width: 80%; width: fit-content; line-height: 1.5; }
.chat-msg.outgoing { background: #6366f1; color: #fff; border-radius: 16px 16px 4px 16px; align-self: flex-end; }

.input-row { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-top: 1px solid #f1f5f9; }

.emoji-wrap { position: relative; flex-shrink: 0; }
.emoji-trigger { width: 36px; height: 36px; border: none; background: transparent; font-size: 20px; cursor: pointer; border-radius: 8px; transition: background 0.12s; display: flex; align-items: center; justify-content: center; }
.emoji-trigger:hover { background: #f1f5f9; }

.picker { position: absolute; bottom: calc(100% + 8px); left: 0; width: 280px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); z-index: 100; opacity: 0; pointer-events: none; transform: scale(0.96) translateY(6px); transition: opacity 0.18s, transform 0.18s; overflow: hidden; }
.picker.open { opacity: 1; pointer-events: all; transform: scale(1) translateY(0); }

.picker-search { padding: 10px 10px 6px; }
.search-inp { width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; padding: 7px 10px; font-size: 13px; outline: none; transition: border-color 0.15s; }
.search-inp:focus { border-color: #6366f1; }

.cat-tabs { display: flex; gap: 2px; padding: 4px 8px; border-bottom: 1px solid #f1f5f9; }
.cat-tab { background: none; border: none; font-size: 16px; padding: 4px 6px; border-radius: 6px; cursor: pointer; transition: background 0.1s; }
.cat-tab:hover { background: #f1f5f9; }
.cat-tab.active { background: rgba(99,102,241,0.1); }

.emoji-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; padding: 8px; max-height: 180px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
.emoji-grid::-webkit-scrollbar { width: 4px; }
.emoji-grid::-webkit-scrollbar-track { background: transparent; }
.emoji-grid::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.emoji-grid::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
.e-btn { background: none; border: none; font-size: 20px; padding: 5px; border-radius: 6px; cursor: pointer; transition: background 0.1s; line-height: 1; }
.e-btn:hover { background: #f1f5f9; transform: scale(1.2); }

.picker-footer { font-size: 11px; color: #94a3b8; padding: 6px 10px; border-top: 1px solid #f1f5f9; text-align: center; min-height: 26px; }

.chat-input { flex: 1; border: 1px solid #e2e8f0; border-radius: 10px; padding: 9px 12px; font-size: 13px; outline: none; transition: border-color 0.15s; font-family: inherit; }
.chat-input:focus { border-color: #6366f1; }
.send-btn { background: #6366f1; color: #fff; border: none; border-radius: 10px; padding: 9px 16px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: background 0.15s; font-family: inherit; }
.send-btn:hover { background: #4f46e5; }`,
  js: `const EMOJI_DATA = {
  recent:  ['😊','😂','❤️','👍','🎉','😍','🙏','🔥','💯','✨','🤝','👀'],
  smileys: ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','😇','😉','😊','😋','😎','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','😣','😖','😫','😩','🥺','😢','😭','😤','😠','🤬','🤯','😳','🥵','😱','😨','😰'],
  people:  ['👋','🤚','✋','🖐','👌','🤌','🤏','✌️','🤞','🖖','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','💅','🤳','💪','🦾','🦿','🦵','🦶','👂','🦻','👃','🫀','🫁','🧠','🦷','🦴','👁','👅','👄','🫦'],
  nature:  ['🌿','🍀','🌱','🌲','🌳','🌴','🌵','🎋','🎍','🍁','🍂','🍃','🍄','🌾','🌺','🌸','🌼','🌻','🌹','🌷','💐','🌞','🌝','🌛','🌜','🌚','🌙','⭐','🌟','💫','✨','⚡','🌈','☁️','⛅','🌤','🌥','🌦','🌧','⛈','🌩','🌨','❄️','☃️','⛄'],
  food:    ['🍕','🍔','🌮','🌯','🥗','🥘','🍲','🍱','🍣','🍜','🍝','🍛','🍚','🍙','🍘','🍤','🍗','🍖','🌭','🥪','🥙','🧆','🥚','🍳','🧇','🥞','🧈','🥓','🥩','🍱','🍣','🍤','🦀','🦞','🦐','🦑','🦪','🍦','🍧','🍨','🍩','🍪','🎂','🍰','🧁','🥧'],
  symbols: ['💡','🔥','✨','💯','❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉','☸️','✡️','🔯','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚜️','🔰'],
};

let recent = [...EMOJI_DATA.recent];
let curCat = 'recent';
let isOpen = false;

function renderGrid(emojis) {
  const grid = document.getElementById('emoji-grid');
  grid.innerHTML = '';
  emojis.forEach(e => {
    const btn = document.createElement('button');
    btn.className = 'e-btn';
    btn.textContent = e;
    btn.title = e;
    btn.onclick = () => insertEmoji(e);
    grid.appendChild(btn);
  });
}

function insertEmoji(e) {
  const inp = document.getElementById('chat-input');
  const pos = inp.selectionStart || inp.value.length;
  inp.value = inp.value.slice(0,pos) + e + inp.value.slice(pos);
  inp.focus();
  inp.selectionStart = inp.selectionEnd = pos + e.length;
  document.getElementById('picker-footer').textContent = e + ' added';
  // Add to recent
  recent = [e, ...recent.filter(x => x !== e)].slice(0, 12);
  if (curCat === 'recent') renderGrid(recent);
}

function togglePicker() {
  isOpen = !isOpen;
  document.getElementById('picker').classList.toggle('open', isOpen);
  document.getElementById('emoji-trigger').setAttribute('aria-expanded', isOpen);
  if (isOpen) {
    renderGrid(EMOJI_DATA[curCat] || recent);
    setTimeout(() => document.getElementById('search-inp').focus(), 100);
  }
}

function showCat(btn, cat) {
  curCat = cat;
  document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('search-inp').value = '';
  renderGrid(cat === 'recent' ? recent : EMOJI_DATA[cat]);
}

function filterEmoji(q) {
  if (!q.trim()) { renderGrid(EMOJI_DATA[curCat] || recent); return; }
  const all = Object.values(EMOJI_DATA).flat();
  // Simple: show emojis where the search somehow matches (we don't have names, so just show all on any input)
  renderGrid(all.slice(0, 42));
}

function sendMsg() {
  const inp = document.getElementById('chat-input');
  const txt = inp.value.trim();
  if (!txt) return;
  const msg = document.createElement('div');
  msg.className = 'chat-msg outgoing';
  msg.textContent = txt;
  document.getElementById('chat-output').appendChild(msg);
  msg.scrollIntoView({ behavior: 'smooth' });
  inp.value = '';
  if (isOpen) togglePicker();
}

document.addEventListener('click', e => {
  if (isOpen && !e.target.closest('#emoji-wrap')) togglePicker();
});

renderGrid(recent);`,
  seo: {
    title: 'Emoji Picker — Free HTML CSS JS Snippet',
    description: 'Categorised emoji grid with search, recents tab and insert-at-cursor in a chat input demo. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'Emoji Picker — Category Tabs, Recent Emojis, Insert at Cursor & Chat Demo',
      description: `Type "I'm so happy" into any chat box and it reads flat — type "I'm so happy 🎉" and it suddenly has a tone. That gap is why every messaging product, from the [Chat Bubble UI](/ui-snippets/chat-ui) you're replying in to the comment box under a blog post, ships its own emoji picker rather than relying on the operating system's. This snippet builds one from scratch: six categorised tabs (Recent, Smileys, People, Nature, Food, Symbols), a search field, a hover-scale emoji grid, a popover that inserts *exactly where the cursor is* rather than at the end of the line, a self-maintaining "recently used" tab, click-outside dismissal, and a working chat demo so you can see it inserting into a real conversation rather than an empty textarea.\n\n**Inserting at the cursor, not the end**\n\nThe naive approach — \`input.value += emoji\` — always appends to the end, which breaks the moment someone clicks back into the middle of a sentence to fix a typo and then wants to drop in an emoji there. \`insertEmoji(e)\` instead reads \`inp.selectionStart\`, the cursor's character offset, and rebuilds the string around it: \`inp.value.slice(0, pos) + e + inp.value.slice(pos)\`. The subtle part is what happens *after*: setting \`.value\` programmatically silently resets the cursor to position zero, so the very next line restores it with \`inp.selectionStart = inp.selectionEnd = pos + e.length\` — placing the caret immediately after the freshly inserted emoji, exactly where a native keyboard insertion would leave it. Skip that one line and every emoji after the first lands in the wrong place.\n\n**A "recently used" tab that's really a tiny LRU cache**\n\nThe Recent tab isn't hand-curated — it's a 12-item array that rebuilds itself on every selection: \`recent = [e, ...recent.filter(x => x !== e)].slice(0, 12)\`. Unshifting the new emoji to the front, filtering out any earlier occurrence of the same one, and slicing to 12 is the textbook shape of a least-recently-used cache, just applied to emoji instead of memory pages. It's the same "move to front, evict the tail" idea that powers browser history and tab-switcher ordering — useful to recognise because it shows up anywhere a UI claims to remember "recent" anything.\n\n**One render function, six categories**\n\nRather than writing six near-identical grid-building blocks, \`renderGrid(emojis)\` takes any flat array of emoji strings, clears \`#emoji-grid\`, and stamps out a button per emoji with its click handler wired to \`insertEmoji\`. \`showCat(btn, cat)\` just decides *which* array to hand it — \`recent\` for the clock tab, \`EMOJI_DATA[cat]\` for everything else — toggles the \`.active\` class, and clears any in-progress search. Adding a seventh category is a one-line addition to \`EMOJI_DATA\` plus a matching \`.cat-tab\` button; the rendering plumbing needs no changes at all.\n\n**Closing on an outside click**\n\nA single listener on \`document\` checks every click against \`e.target.closest('#emoji-wrap')\`. If the click landed anywhere outside the trigger-and-popover wrapper, \`togglePicker()\` fires and the panel closes — the same delegation pattern used by the [Command Palette](/ui-snippets/command-palette) and [Context Menu](/ui-snippets/context-menu) snippets to dismiss themselves without attaching a listener to every possible "outside" element. The popover itself animates with \`opacity\`, \`pointer-events\`, and a \`scale(0.96) → scale(1)\` transform — properties the compositor can animate without ever triggering layout.\n\n**Where the search currently falls short**\n\nThe \`filterEmoji(q)\` stub is honest about its limits: without a names database, "smile" can't be matched to 😀, so it currently just shows a broad slice of every category on any non-empty query. The FAQ below shows how a small \`emoji-datasource\`-style package turns this into real name-based search — the kind that lets someone type "fire" and land on 🔥 instead of scrolling six tabs.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click the 😊 button to open the emoji picker', text: 'The picker slides open with a scale animation. Browse categories with the tab buttons. Click any emoji to insert it at the cursor position in the text input.' },
      { title: 'Click inside the text input first to set the cursor position', text: 'Click in the input where you want the emoji inserted, then open the picker and select an emoji. It inserts exactly at the cursor, not appended to the end.' },
      { title: 'Type in the search bar to filter emojis', text: 'The search input filters the emoji display. Currently shows a broad set on any search — connect to an emoji names database (emoji-data npm package) for name-based search.' },
      { title: 'Check the Recent tab to see your emoji history', text: 'The Recent tab shows the 12 most recently used emojis, updated in real time as you select emojis from other categories. Click Send to send a chat message and test the full flow.' },
      { title: 'Attach to any textarea or input in your project', text: 'Change document.getElementById("chat-input") to your own input element. The insertEmoji() function works with any text input or textarea by reading selectionStart.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component using useRef for the input, or "Tailwind" for a React + Tailwind CSS version.' },
    ]},
    features: ['Insert at cursor: selectionStart read + string slice insert + cursor restore','Recent tab: unshift to recent array, deduplicate, cap at 12, re-render on select','6 category tabs: Recent/Smileys/People/Nature/Food/Symbols with CSS .active state','Scale+opacity popup animation: 0.96 scale → 1 on .open class','Hover scale on emoji buttons: transform:scale(1.2) on :hover','Click-outside close: document click + e.target.closest("#emoji-wrap") check','Search input: triggers filterEmoji() on every keystroke','Chat demo: sendMsg() appends outgoing messages, clears input, closes picker'],
    useCases: [
      { icon: 'APP', title: 'Chat app and messaging interface emoji insertion', desc: 'The primary use case — a chat input with an emoji picker button. The cursor-position insertion works correctly even when the user has typed partway through a message and wants to insert an emoji in the middle.' },
      { icon: 'DESIGN', title: 'Comment and reply system reaction picker', desc: 'Social platforms and blog comment systems use emoji pickers for reactions and in-text emoji. The recent tab shows the user\'s favourite emojis for quick repeat use.' },
      { icon: 'FLOW', title: 'Social media post composer emoji support', desc: 'Content creation tools need emoji pickers for post composers. The picker integrates with any textarea. Add a character counter alongside it to show the user how many characters their post uses including emojis.' },
      { icon: 'CODE', title: 'Form field emoji support for display names and bios', desc: 'Profile forms, username fields, and bio textareas often allow emojis. The picker provides a keyboard-free way to select emojis for users on desktop who cannot easily access the system emoji picker.' },
      { icon: 'LEARN', title: 'Study cursor-position text insertion technique', desc: 'The insertEmoji() function demonstrates the correct pattern for inserting text at cursor position in any input: read selectionStart, slice and reassemble the string, restore cursor position. This pattern applies to any text insertion feature.' },
      { icon: 'STAR', title: 'No-code builder and drag-drop editor emoji support', desc: 'Visual page builders and no-code tools let users add emoji to text blocks. An embedded picker provides a better UX than asking users to use their system keyboard shortcut (Win+. or Cmd+Ctrl+Space) which many users do not know.' },
      { icon: 'CODE', title: 'Related: Half-Star Rating Input', desc: 'See the [Half-Star Rating Input](/ui-snippets/half-star-rating-input/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the emoji insert at cursor position instead of the end?', a: 'inp.selectionStart returns the current cursor position in the input field (an integer offset from the start). The insertion: inp.value = inp.value.slice(0, selectionStart) + emoji + inp.value.slice(selectionStart). After setting value, cursor is restored: inp.selectionStart = inp.selectionEnd = selectionStart + emoji.length. Without this, setting value programmatically resets the cursor to the end.' },
      { q: 'How do I add emoji name-based search?', a: 'Import an emoji metadata package: import emojiData from "emoji-datasource". Each entry has char (the emoji) and name fields. In filterEmoji(q): const matches = emojiData.filter(e => e.name.toLowerCase().includes(q.toLowerCase())).map(e => e.char).slice(0,42). This gives real name-based search ("smiling face", "thumbs up") instead of the current category-level filtering.' },
      { q: 'How do I persist the recent emojis across page reloads?', a: 'Save to localStorage in insertEmoji(): localStorage.setItem("recent_emoji", JSON.stringify(recent)). On page load, restore: const saved = localStorage.getItem("recent_emoji"); if (saved) { try { recent = JSON.parse(saved); } catch {} }. This persists the user\'s recently used emojis so they appear in the Recent tab on the next visit.' },
      { q: 'How do I use this emoji picker in React?', a: 'Click "JSX" to download. Use useState for isOpen, curCat, and recent. Use useRef for the input element. In insertEmoji: const pos = inputRef.current.selectionStart; then use a React-controlled input value state with setInputValue(prev => prev.slice(0,pos) + e + prev.slice(pos)). For cursor restore after state update, use useEffect with a ref to the desired cursor position and set selectionStart/End after the render.' },
    ],
    aiPrompt: {
      paragraph: `Instead of guessing why emoji sometimes land in the wrong spot, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why insertEmoji() must explicitly restore inp.selectionStart and inp.selectionEnd after writing to inp.value, and how the recent array's unshift-filter-slice pattern in insertEmoji implements a tiny least-recently-used cache. The same assistant can help you optimize it, for instance pointing out that filterEmoji() currently ignores the query entirely and just shows a slice of every emoji, and discussing what a real name-based search would need. It's also useful for extending the picker: ask it to wire filterEmoji to an actual emoji-name dataset for real search, persist the recent list to localStorage across sessions, or add keyboard arrow-key navigation through the grid. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an emoji picker popover attached to a chat text input, in plain HTML, CSS, and JavaScript with no library.

Requirements:
- A trigger button that toggles a popover panel containing a search input, a row of category tab buttons (including a "Recent" tab), and a scrollable grid of emoji buttons, animated open and closed with an opacity and scale transition rather than a hard show/hide.
- Clicking any emoji in the grid must insert it into a separate target text input at the exact current cursor position (read via the input's selectionStart), not appended to the end of the input's value, by slicing the existing value into a before-cursor and after-cursor part and rebuilding the string around the inserted emoji.
- After programmatically setting the input's value, explicitly restore the cursor position to immediately after the newly inserted emoji, since setting an input's value property resets the browser's cursor to the start by default.
- Maintain a "recent" list capped at a fixed size (e.g. 12) that updates every time an emoji is inserted: the newly used emoji moves to the front, any earlier occurrence of that same emoji already in the list is removed first so it doesn't appear twice, and the list is trimmed back down to the cap length.
- Build one single grid-rendering function that accepts any flat array of emoji characters and is reused for every category tab and for the recent tab, so switching categories is only a matter of choosing which array to pass in, not duplicating rendering logic per category.
- Close the popover automatically when a click occurs anywhere outside the trigger-and-panel wrapper, using a single document-level click listener with a closest() containment check rather than per-element blur handlers.`,
    },
  },
};

export default emojiPicker;
