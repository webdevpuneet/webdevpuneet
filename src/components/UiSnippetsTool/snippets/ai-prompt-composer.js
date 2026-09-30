const aiPromptComposer = {
  id: 'ai-prompt-composer',
  title: 'AI Prompt Composer',
  lastmod: '2026-06-17',
  category: 'forms',
  html: `<div class="ap-card">
  <div class="ap-box" id="apBox">
    <div class="ap-attach" id="apAttach"></div>
    <textarea class="ap-input" id="apInput" rows="1" placeholder="Message the assistant…" oninput="onInput(this)" onkeydown="onKey(event)"></textarea>
    <div class="ap-toolbar">
      <div class="ap-left">
        <button class="ap-model" id="apModel" onclick="cycleModel()" type="button">
          <span class="ap-spark">✦</span><span id="apModelName">Opus 4.8</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <button class="ap-tool" type="button" onclick="attach()" aria-label="Attach file">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 8-9.2 9.2a3 3 0 0 1-4.2-4.2L16 4a2 2 0 0 1 3 3l-8.5 8.5"/></svg>
        </button>
      </div>
      <div class="ap-right">
        <span class="ap-count" id="apCount">0 / 4000</span>
        <button class="ap-send" id="apSend" type="button" onclick="send()" disabled aria-label="Send">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5m0 0-6 6m6-6 6 6"/></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="ap-hint">Enter to send · Shift + Enter for a new line</div>
  <div class="ap-toast" id="apToast"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:60px 24px}
.ap-card{width:100%;max-width:540px;position:relative}

.ap-box{background:#fff;border:1.5px solid #e2e8f0;border-radius:18px;padding:12px 14px;transition:border-color .15s,box-shadow .15s}
.ap-box:focus-within{border-color:#6366f1;box-shadow:0 0 0 4px rgba(99,102,241,.1)}

.ap-attach{display:flex;flex-wrap:wrap;gap:6px}
.ap-attach:not(:empty){margin-bottom:8px}
.ap-file{display:inline-flex;align-items:center;gap:6px;background:#eef2ff;color:#4f46e5;border:1px solid #c7d2fe;border-radius:8px;padding:4px 6px 4px 9px;font-size:12px;font-weight:600;animation:ap-pop .18s ease}
@keyframes ap-pop{from{transform:scale(.85);opacity:0}to{transform:scale(1);opacity:1}}
.ap-file button{background:none;border:none;color:#818cf8;cursor:pointer;font-size:14px;line-height:1;padding:0}
.ap-file button:hover{color:#4f46e5}

.ap-input{width:100%;border:none;outline:none;resize:none;font-family:inherit;font-size:15px;line-height:1.5;color:#1e293b;background:none;max-height:180px;overflow-y:auto;padding:4px 2px}
.ap-input::placeholder{color:#94a3b8}

.ap-toolbar{display:flex;align-items:center;justify-content:space-between;margin-top:8px}
.ap-left{display:flex;align-items:center;gap:6px}
.ap-model{display:flex;align-items:center;gap:5px;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:9px;padding:6px 9px;font-size:12px;font-weight:700;color:#475569;cursor:pointer;font-family:inherit;transition:background .15s}
.ap-model:hover{background:#e2e8f0}
.ap-spark{color:#6366f1}
.ap-tool{width:32px;height:32px;border-radius:9px;border:1px solid #e2e8f0;background:#fff;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s}
.ap-tool:hover{background:#f1f5f9;color:#1e293b}

.ap-right{display:flex;align-items:center;gap:10px}
.ap-count{font-size:11px;color:#94a3b8;font-variant-numeric:tabular-nums}
.ap-count.over{color:#ef4444;font-weight:700}
.ap-send{width:34px;height:34px;border-radius:10px;border:none;background:#6366f1;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,transform .1s}
.ap-send:hover:not(:disabled){background:#4f46e5}
.ap-send:active:not(:disabled){transform:scale(.9)}
.ap-send:disabled{background:#e2e8f0;color:#94a3b8;cursor:not-allowed}

.ap-hint{font-size:11px;color:#94a3b8;text-align:center;margin-top:10px}
.ap-toast{position:absolute;left:50%;bottom:-44px;transform:translate(-50%,8px);background:#1e293b;color:#fff;font-size:12px;font-weight:700;padding:8px 16px;border-radius:999px;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s}
.ap-toast.show{opacity:1;transform:translate(-50%,0)}`,

  js: `var MAX = 4000;
var MODELS = ['Opus 4.8', 'Sonnet 4.6', 'Haiku 4.5'];
var modelIdx = 0;
var FILES = ['brief.pdf', 'mockup.png', 'data.csv', 'notes.md'];
var fileIdx = 0;
var input = document.getElementById('apInput');
var sendBtn = document.getElementById('apSend');
var count = document.getElementById('apCount');
var toastTimer;

function onInput(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  var len = el.value.length;
  var tokens = Math.ceil(len / 4);
  count.textContent = len + ' / ' + MAX + (len ? ' · ~' + tokens + ' tokens' : '');
  count.classList.toggle('over', len > MAX);
  updateSend();
}

function updateSend() {
  var hasText = input.value.trim().length > 0;
  var hasFiles = document.getElementById('apAttach').children.length > 0;
  sendBtn.disabled = (!hasText && !hasFiles) || input.value.length > MAX;
}

function onKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    send();
  }
}

function cycleModel() {
  modelIdx = (modelIdx + 1) % MODELS.length;
  document.getElementById('apModelName').textContent = MODELS[modelIdx];
}

function attach() {
  var box = document.getElementById('apAttach');
  var name = FILES[fileIdx % FILES.length]; fileIdx++;
  var chip = document.createElement('span');
  chip.className = 'ap-file';
  chip.innerHTML = '📎 ' + name + '<button type="button" onclick="removeAttach(this)" aria-label="Remove">×</button>';
  box.appendChild(chip);
  updateSend();
}

function removeAttach(btn) {
  btn.closest('.ap-file').remove();
  updateSend();
}

function send() {
  if (sendBtn.disabled) return;
  input.value = '';
  input.style.height = 'auto';
  document.getElementById('apAttach').innerHTML = '';
  count.textContent = '0 / ' + MAX;
  count.classList.remove('over');
  updateSend();
  showToast('Message sent to ' + MODELS[modelIdx]);
}

function showToast(msg) {
  var t = document.getElementById('apToast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
}`,

  seo: {
    title: 'AI Prompt Composer — Chat Input HTML CSS JS Snippet',
    description: `AI prompt composer with an auto-growing textarea, model picker, file attachments, a live token counter & Enter-to-send. Exports to React, Vue & Tailwind.`,
    about: {
      title: `AI Prompt Composer — Auto-Grow Textarea, Model Picker, Attachments & Token Counter`,
      description: `Every AI product needs a great prompt composer — the input box where users type, attach context, pick a model, and send. It looks simple but has real interaction depth: the textarea must grow with the content (then cap and scroll), Enter should send while Shift+Enter inserts a newline, a counter should track length and approximate tokens, attachments need to be added and removed, and Send must be disabled when there is nothing to send. This snippet implements all of it in plain HTML, CSS, and vanilla JavaScript.

**Auto-growing textarea**

\`onInput\` resets the textarea height to \`auto\` and sets it to \`scrollHeight\`, capped at a max (180px) after which it scrolls. Resetting to \`auto\` first is the key trick — without it the textarea can only ever grow, never shrink when you delete lines. This gives the now-standard composer feel: one line to start, expanding smoothly as you type a paragraph, then scrolling for very long prompts.

**Enter to send, Shift+Enter for newline**

\`onKey\` intercepts Enter: pressing it alone calls \`send\` (and \`preventDefault\` stops the newline), while Shift+Enter falls through to insert a line break. This is the convention users expect from chat and AI interfaces, and getting it right is what makes the composer feel native.

**Live character and token counter**

\`onInput\` updates a counter showing characters against a \`MAX\` and an approximate token count (\`Math.ceil(length / 4)\` — the rough chars-per-token heuristic). It turns red past the limit and the Send button disables, mirroring how real AI apps cap context length.

**Model picker and attachments**

A model pill cycles through options (\`Opus 4.8\`, \`Sonnet 4.6\`, \`Haiku 4.5\`) on click — the model-selector affordance every multi-model app has. The attach button adds removable file chips that animate in with a pop; \`updateSend\` enables Send when there is either text **or** an attachment, so you can send a file with no message. Each chip has a × that removes it and re-evaluates the Send state.

**Send and reset**

\`send\` clears the text, collapses the textarea, removes attachments, resets the counter, disables Send, and shows a confirmation toast naming the chosen model — standing in for dispatching the message. The whole box lights up with a focus ring via \`:focus-within\` so the composite reads as one control.

Replace \`send\` with your real API call (stream the response into a message list) and you have a production composer. Pair this with an [AI chat interface](/ui-snippets/ai-chat-interface/) for the conversation view, a [chat UI](/ui-snippets/chat-ui/) for messaging, or an [auto-resize textarea](/ui-snippets/auto-resize-textarea/) for simpler inputs.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A prompt composer appears with a single-line input, a model pill ("Opus 4.8"), an attach button, a counter, and a disabled Send button.` },
      { title: 'Type a message', text: `The textarea grows line by line as you type; the counter shows characters and an approximate token count, and Send enables.` },
      { title: 'Press Enter to send', text: `Enter sends and clears the box; Shift+Enter inserts a newline instead, exactly like a chat app.` },
      { title: 'Switch models', text: `Click the model pill to cycle through Opus 4.8 → Sonnet 4.6 → Haiku 4.5.` },
      { title: 'Attach files', text: `Click the attach button to add removable file chips; you can send with just an attachment and no text.` },
      { title: 'Send', text: `Hit Send — the box resets and a toast confirms "Message sent to <model>".` },
    ] },
    features: [
      { title: 'Auto-grow textarea', text: `\`onInput\` sets height to \`auto\` then \`scrollHeight\` (capped at 180px), so it expands and — crucially — shrinks as you edit.` },
      { title: 'Enter vs Shift+Enter', text: `\`onKey\` sends on Enter and \`preventDefault\`s the newline, while Shift+Enter inserts a line break — the chat convention.` },
      { title: 'Char + token counter', text: `Shows length against a \`MAX\` plus an approximate token count (chars ÷ 4), turning red and blocking send over the limit.` },
      { title: 'Model picker pill', text: `A click cycles through model options, the standard multi-model selector affordance.` },
      { title: 'Add/remove attachments', text: `The attach button adds animated, removable file chips; each × re-evaluates the send state.` },
      { title: 'Smart send-enable', text: `\`updateSend\` enables Send when there is text OR an attachment, and disables it past the character cap.` },
      { title: 'Send + reset + toast', text: `Sending clears text, collapses the box, drops attachments, resets the counter, and shows a model-named confirmation toast.` },
      { title: 'Unified focus ring', text: `\`:focus-within\` lights up the whole composer so the textarea, toolbar, and controls read as one input.` },
    ],
    useCases: [
      { title: 'AI chat and assistant apps', text: `The input bar for any LLM chat. Pair it with an [AI chat interface](/ui-snippets/ai-chat-interface/) for the message stream.` },
      { title: 'Prompt and content generators', text: `A composer for image, copy, or code generators where users attach references and pick a model.` },
      { title: 'Support and messaging', text: `Reuse the auto-grow + Enter-to-send box in a [chat UI](/ui-snippets/chat-ui/) or support widget.` },
      { title: 'Comment and post composers', text: `The growing textarea with attachments works for social posts or a [comment thread](/ui-snippets/comment-thread/) reply box.` },
      { title: 'Search and command inputs', text: `An expandable multi-line query box for advanced search or a [command palette](/ui-snippets/command-palette/)-style action bar.` },
      { title: 'Feedback and report forms', text: `Long-form input with attachments and a character cap; a richer take on an [auto-resize textarea](/ui-snippets/auto-resize-textarea/).` },
      { icon: 'CODE', title: 'Related: AI Prompt Suggestion Chips', desc: 'See the [AI Prompt Suggestion Chips](/ui-snippets/ai-prompt-suggestion-chips/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect it to a real model API?', a: `Replace the body of \`send\` with your request: read \`input.value\`, the selected \`MODELS[modelIdx]\`, and any attachments, then call your endpoint and stream the response into a message list. Keep the optimistic reset (clear the box immediately) so the UI feels instant, and disable Send while a request is in flight to prevent duplicate submissions.` },
      { q: 'How accurate is the token counter?', a: `The \`chars / 4\` estimate is a rough heuristic — real tokenisation depends on the model's tokenizer and the actual text (code and non-English vary a lot). For an accurate count, run the text through the provider's tokenizer (or a token-counting endpoint) and display that instead. The estimate here is fine for a soft "how long is my prompt" gauge.` },
      { q: 'Why reset the textarea height to auto before measuring?', a: `\`scrollHeight\` only reports how tall the content needs to be relative to the current height. If you never reset to \`auto\`, the element can grow but never shrink, because its \`scrollHeight\` stays inflated by its own current height. Setting \`height = 'auto'\` first lets the browser recompute the true content height so the box both grows and collapses correctly.` },
      { q: 'How do I handle real file uploads and validation?', a: `Wire the attach button to a hidden \`<input type="file" multiple>\` and read \`event.target.files\`. Render a chip per file (name, size), validate type and size before accepting, and on send upload them (or send as multipart / base64) alongside the prompt. Revoke any object URLs you create for previews to avoid memory leaks.` },
      { q: 'How do I use this prompt composer in React, Vue, or Angular?', a: `In React, hold the text, model index, and attachments in \`useState\`; auto-grow in an effect or the \`onChange\` handler using a ref to the textarea, and handle Enter in \`onKeyDown\`. In Vue, use \`v-model\` with a watcher for auto-grow. In Angular, \`[(ngModel)]\` plus an input handler. The height-reset trick and key handling port unchanged.` },
    ],
  },
};

export default aiPromptComposer;
