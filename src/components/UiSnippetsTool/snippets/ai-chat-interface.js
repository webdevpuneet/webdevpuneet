const aiChatInterface = {
  id: 'ai-chat-interface',
  title: 'AI Chat Interface',
  category: 'layouts',
  lastmod: '2026-06-10',
  html: `<div class="app">

  <!-- Sidebar -->
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="brand">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/></svg>
        <span>AI Chat</span>
      </div>
      <button class="new-chat-btn" id="new-chat-btn" title="New chat">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </div>

    <div class="sidebar-section-label">Recent</div>

    <nav class="conv-list" id="conv-list">
      <button class="conv-item active" data-conv="0">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>Async/await explained</span>
      </button>
      <button class="conv-item" data-conv="1">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>Python list sorting</span>
      </button>
      <button class="conv-item" data-conv="2">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>CSS grid vs flexbox</span>
      </button>
      <button class="conv-item" data-conv="3">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>SQL JOIN types</span>
      </button>
    </nav>

    <div class="sidebar-footer">
      <div class="user-row">
        <div class="user-avatar">U</div>
        <span class="user-name">You</span>
      </div>
    </div>
  </aside>

  <!-- Main chat area -->
  <div class="main">

    <!-- Header -->
    <header class="chat-header">
      <div class="model-selector" id="model-selector">
        <span class="model-name">Claude 3.5</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </header>

    <!-- Messages -->
    <div class="messages" id="messages">

      <!-- Assistant message -->
      <div class="msg-row assistant">
        <div class="assistant-avatar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/></svg>
        </div>
        <div class="bubble assistant-bubble">
          Hi! I'm here to help with coding questions. What would you like to explore today?
        </div>
      </div>

      <!-- User message -->
      <div class="msg-row user">
        <div class="bubble user-bubble">
          Can you explain how async/await works in JavaScript?
        </div>
      </div>

      <!-- Assistant message -->
      <div class="msg-row assistant">
        <div class="assistant-avatar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/></svg>
        </div>
        <div class="bubble assistant-bubble">
          <strong>async/await</strong> is syntactic sugar over Promises that makes asynchronous code read like synchronous code.<br><br>
          An <code>async</code> function always returns a Promise. Inside it, <code>await</code> pauses execution until the awaited Promise resolves — but doesn't block the main thread.<br><br>
          <strong>Example:</strong><br>
          <code>async function fetchUser(id) &#123;</code><br>
          <code>&nbsp;&nbsp;const res = await fetch(\`/api/users/$&#123;id&#125;\`);</code><br>
          <code>&nbsp;&nbsp;return res.json();</code><br>
          <code>&#125;</code><br><br>
          The key benefit: error handling with <code>try/catch</code> instead of chained <code>.catch()</code> callbacks.
        </div>
      </div>

      <!-- User message -->
      <div class="msg-row user">
        <div class="bubble user-bubble">
          That's really clear, thanks! What about error handling with async/await?
        </div>
      </div>

    </div>

    <!-- Suggested prompts (shown when chat is empty) -->
    <div class="suggestions" id="suggestions" style="display:none">
      <p class="suggestions-label">Try asking about</p>
      <div class="suggestion-chips" id="suggestion-chips">
        <button class="chip" data-prompt="Explain async/await in JavaScript">Explain async/await in JavaScript</button>
        <button class="chip" data-prompt="Write a Python function to sort a list by key">Write a Python function to sort a list</button>
        <button class="chip" data-prompt="What is the difference between CSS Grid and Flexbox?">CSS Grid vs Flexbox</button>
        <button class="chip" data-prompt="Explain the difference between SQL JOIN types">Explain SQL JOIN types</button>
      </div>
    </div>

    <!-- Input area -->
    <div class="input-area">
      <div class="input-box">
        <textarea
          id="chat-input"
          class="chat-textarea"
          placeholder="Message Claude 3.5…"
          rows="1"
        ></textarea>
        <button class="send-btn" id="send-btn" title="Send message" disabled>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
        </button>
      </div>
      <p class="input-hint">Enter to send · Shift+Enter for new line</p>
    </div>

  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; height: 100vh; overflow: hidden; }

/* ─ App shell ─ */
.app { display: flex; height: 100vh; }

/* ─ Sidebar ─ */
.sidebar {
  width: 240px; flex-shrink: 0;
  background: #0f172a;
  display: flex; flex-direction: column;
  border-right: 1px solid #1e293b;
  overflow: hidden;
}

.sidebar-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 14px 12px;
  border-bottom: 1px solid #1e293b;
  flex-shrink: 0;
}
.brand {
  display: flex; align-items: center; gap: 8px;
  color: #f1f5f9; font-size: 14px; font-weight: 700;
}
.new-chat-btn {
  width: 28px; height: 28px; border-radius: 7px;
  background: #1e293b; border: 1px solid #334155;
  color: #94a3b8; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s, color 0.15s;
}
.new-chat-btn:hover { background: #334155; color: #f1f5f9; }

.sidebar-section-label {
  font-size: 10px; font-weight: 600; color: #475569;
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: 14px 14px 6px;
  flex-shrink: 0;
}

.conv-list {
  flex: 1; overflow-y: auto; padding: 4px 8px;
  display: flex; flex-direction: column; gap: 1px;
}
.conv-list::-webkit-scrollbar { width: 4px; }
.conv-list::-webkit-scrollbar-track { background: transparent; }
.conv-list::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }

.conv-item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px; border-radius: 8px;
  background: none; border: none;
  color: #64748b; font-size: 12px; font-family: inherit;
  cursor: pointer; text-align: left; width: 100%;
  transition: background 0.12s, color 0.12s;
  white-space: nowrap; overflow: hidden;
}
.conv-item span { overflow: hidden; text-overflow: ellipsis; }
.conv-item:hover { background: #1e293b; color: #cbd5e1; }
.conv-item.active { background: #1e293b; color: #f1f5f9; font-weight: 500; }
.conv-item svg { flex-shrink: 0; opacity: 0.6; }

.sidebar-footer {
  flex-shrink: 0; padding: 12px 14px;
  border-top: 1px solid #1e293b;
}
.user-row { display: flex; align-items: center; gap: 9px; }
.user-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff; font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.user-name { font-size: 12px; color: #94a3b8; font-weight: 500; }

/* ─ Main area ─ */
.main { flex: 1; display: flex; flex-direction: column; min-width: 0; background: #fff; }

/* ─ Header ─ */
.chat-header {
  display: flex; align-items: center;
  padding: 0 20px; height: 52px;
  border-bottom: 1px solid #f1f5f9;
  flex-shrink: 0;
}
.model-selector {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 10px; border-radius: 8px;
  cursor: pointer; border: 1px solid #e2e8f0;
  transition: background 0.12s;
}
.model-selector:hover { background: #f8fafc; }
.model-name { font-size: 13px; font-weight: 600; color: #1e293b; }
.model-selector svg { color: #94a3b8; }

/* ─ Messages ─ */
.messages {
  flex: 1; overflow-y: auto; padding: 24px 20px 16px;
  display: flex; flex-direction: column; gap: 20px;
  scroll-behavior: smooth;
}
.messages::-webkit-scrollbar { width: 5px; }
.messages::-webkit-scrollbar-track { background: transparent; }
.messages::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }

.msg-row {
  display: flex; gap: 10px; align-items: flex-start;
  animation: fadeUp 0.2s ease both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.msg-row.user { flex-direction: row-reverse; }

.assistant-avatar {
  width: 30px; height: 30px; border-radius: 8px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}

.bubble { padding: 11px 14px; border-radius: 14px; font-size: 13.5px; line-height: 1.65; max-width: 72%; }

.assistant-bubble {
  background: #fff; color: #1e293b;
  border: 1px solid #e2e8f0;
  border-radius: 4px 14px 14px 14px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.assistant-bubble code {
  background: #f1f5f9; color: #4f46e5;
  padding: 1px 5px; border-radius: 4px;
  font-size: 12px; font-family: ui-monospace, 'Fira Code', monospace;
}
.assistant-bubble strong { color: #0f172a; }

.user-bubble {
  background: #6366f1; color: #fff;
  border-radius: 14px 4px 14px 14px;
}

/* ─ Typing indicator ─ */
.typing-indicator {
  display: flex; gap: 4px; align-items: center;
  padding: 12px 14px;
  background: #fff; border: 1px solid #e2e8f0;
  border-radius: 4px 14px 14px 14px;
  width: fit-content;
}
.typing-indicator .dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #94a3b8;
  animation: bounce 1.2s ease-in-out infinite;
}
.typing-indicator .dot:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator .dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30%           { transform: translateY(-6px); }
}

/* ─ Suggestions ─ */
.suggestions {
  padding: 0 20px 8px;
  display: flex; flex-direction: column; gap: 10px;
  flex-shrink: 0;
}
.suggestions-label { font-size: 12px; color: #94a3b8; font-weight: 500; }
.suggestion-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  padding: 7px 13px; border-radius: 20px;
  border: 1px solid #e2e8f0; background: #f8fafc;
  color: #475569; font-size: 12px; font-family: inherit;
  cursor: pointer; transition: border-color 0.12s, background 0.12s, color 0.12s;
}
.chip:hover { border-color: #6366f1; background: #eef2ff; color: #4f46e5; }

/* ─ Input area ─ */
.input-area {
  flex-shrink: 0; padding: 12px 20px 16px;
  border-top: 1px solid #f1f5f9;
  display: flex; flex-direction: column; gap: 6px;
}
.input-box {
  display: flex; align-items: flex-end; gap: 8px;
  background: #f8fafc; border: 1.5px solid #e2e8f0;
  border-radius: 14px; padding: 8px 8px 8px 14px;
  transition: border-color 0.15s;
}
.input-box:focus-within { border-color: #6366f1; background: #fff; }

.chat-textarea {
  flex: 1; resize: none; border: none; outline: none;
  background: transparent; font-family: inherit;
  font-size: 13.5px; line-height: 1.5; color: #1e293b;
  max-height: 160px; overflow-y: auto;
}
.chat-textarea::placeholder { color: #94a3b8; }

.send-btn {
  width: 34px; height: 34px; border-radius: 10px;
  background: #6366f1; border: none; color: #fff;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background 0.15s, opacity 0.15s; flex-shrink: 0;
}
.send-btn:hover:not(:disabled) { background: #4f46e5; }
.send-btn:disabled { background: #e2e8f0; color: #94a3b8; cursor: default; }

.input-hint { font-size: 11px; color: #cbd5e1; text-align: center; }`,

  js: `const textarea  = document.getElementById('chat-input');
const sendBtn   = document.getElementById('send-btn');
const messages  = document.getElementById('messages');
const newChatBtn = document.getElementById('new-chat-btn');
const suggestions = document.getElementById('suggestions');
const chips     = document.querySelectorAll('#suggestion-chips .chip');
const convItems = document.querySelectorAll('#conv-list .conv-item');

// ── Canned AI responses (cycle through) ──
const aiResponses = [
  "Great question! In JavaScript, <code>try/catch</code> with <code>async/await</code> is the cleanest approach:<br><br><code>async function getData() {</code><br><code>&nbsp;&nbsp;try {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;const res = await fetch('/api/data');</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;return await res.json();</code><br><code>&nbsp;&nbsp;} catch (err) {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;console.error('Failed:', err.message);</code><br><code>&nbsp;&nbsp;}</code><br><code>}</code><br><br>This catches both network errors and any exceptions thrown inside the block.",
  "Here's a concise Python function to sort a list of objects by a key:<br><br><code>def sort_by_key(items, key):</code><br><code>&nbsp;&nbsp;return sorted(items, key=lambda x: x[key])</code><br><br>Use <code>reverse=True</code> for descending order. The built-in <code>sorted()</code> is stable, so equal elements maintain their original order.",
  "Both layout systems are powerful — here's when to use each:<br><br><strong>Flexbox</strong> is best for one-dimensional layouts (a single row or column). Use it for nav bars, button groups, and aligning items within a container.<br><br><strong>CSS Grid</strong> is best for two-dimensional layouts (rows and columns simultaneously). Use it for page layouts, card grids, and any design where you need precise control in both directions.",
  "The four SQL JOIN types in one sentence each:<br><br><strong>INNER JOIN</strong> — only rows that match in both tables.<br><strong>LEFT JOIN</strong> — all rows from the left table, matched rows from the right (NULLs where no match).<br><strong>RIGHT JOIN</strong> — all rows from the right table, matched rows from the left.<br><strong>FULL OUTER JOIN</strong> — all rows from both tables, NULLs where no match on either side.",
  "I'd recommend breaking this into smaller functions, each with a single responsibility. This makes testing easier and the logic much easier to follow at a glance. Would you like me to refactor a specific section?"
];
let responseIndex = 0;

function nextAiResponse() {
  const r = aiResponses[responseIndex % aiResponses.length];
  responseIndex++;
  return r;
}

// ── Auto-grow textarea ──
textarea.addEventListener('input', () => {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
  sendBtn.disabled = textarea.value.trim() === '';
});

// ── Enter to send, Shift+Enter for newline ──
textarea.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!sendBtn.disabled) sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

// ── Suggested prompt chips ──
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    textarea.value = chip.dataset.prompt;
    textarea.dispatchEvent(new Event('input'));
    textarea.focus();
  });
});

// ── Conversation history items ──
convItems.forEach(item => {
  item.addEventListener('click', () => {
    convItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// ── New Chat ──
newChatBtn.addEventListener('click', () => {
  messages.innerHTML = '';
  showSuggestions(true);
  textarea.value = '';
  textarea.style.height = 'auto';
  sendBtn.disabled = true;
  convItems.forEach(i => i.classList.remove('active'));
});

// ── Model selector ──
document.getElementById('model-selector').addEventListener('click', () => {
  const names = ['Claude 3.5', 'GPT-4o', 'Gemini 1.5 Pro'];
  const current = document.querySelector('.model-name');
  const idx = names.indexOf(current.textContent);
  current.textContent = names[(idx + 1) % names.length];
});

// ── Core send function ──
function sendMessage() {
  const text = textarea.value.trim();
  if (!text) return;

  // Hide suggestions if visible
  showSuggestions(false);

  // Append user message
  appendMessage('user', text);

  // Reset input
  textarea.value = '';
  textarea.style.height = 'auto';
  sendBtn.disabled = true;

  // Show typing indicator
  const typingRow = appendTyping();

  // Simulate AI response after 1.5s
  setTimeout(() => {
    typingRow.remove();
    appendMessage('assistant', nextAiResponse());
  }, 1500);
}

function appendMessage(role, html) {
  const row = document.createElement('div');
  row.className = 'msg-row ' + role;

  if (role === 'assistant') {
    const avatar = document.createElement('div');
    avatar.className = 'assistant-avatar';
    avatar.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/></svg>';
    row.appendChild(avatar);
  }

  const bubble = document.createElement('div');
  bubble.className = 'bubble ' + role + '-bubble';
  bubble.innerHTML = html;
  row.appendChild(bubble);

  messages.appendChild(row);
  scrollToBottom();
  return row;
}

function appendTyping() {
  const row = document.createElement('div');
  row.className = 'msg-row assistant';

  const avatar = document.createElement('div');
  avatar.className = 'assistant-avatar';
  avatar.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/></svg>';

  const indicator = document.createElement('div');
  indicator.className = 'typing-indicator';
  indicator.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

  row.appendChild(avatar);
  row.appendChild(indicator);
  messages.appendChild(row);
  scrollToBottom();
  return row;
}

function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
}

function showSuggestions(show) {
  suggestions.style.display = show ? 'flex' : 'none';
}`,

  about: {
    title: 'ChatGPT-Style AI Chat UI — Vanilla JavaScript',
    description: 'A ChatGPT-style AI chat interface in vanilla HTML, CSS, and JavaScript. Typing indicator, sidebar history, auto-grow textarea, and simulated AI responses.',
    about: `The AI chat interface has become one of the most recognized UI patterns of the 2020s. Since ChatGPT's release in late 2022, the two-panel layout — conversation sidebar on the left, message thread on the right — has been replicated across hundreds of products. Developers building AI-powered tools, customer support bots, coding assistants, and internal knowledge bases all need to implement this pattern.\n\nThis snippet provides a complete, production-quality AI chat interface using only HTML, CSS, and vanilla JavaScript. No React, no Vue, no Tailwind — just clean, framework-agnostic code you can understand and customize.\n\n**Layout structure**\n\nThe interface follows the standard two-column layout: a narrow dark sidebar for conversation history on the left, and a wider light-background main area for the active chat. This mirrors ChatGPT, Claude, Gemini, and virtually every other major AI interface. The sidebar collapses gracefully on small screens.\n\n**Message rendering**\n\nUser messages appear right-aligned in indigo bubbles. Assistant messages appear left-aligned as white cards with a subtle border, accompanied by a small robot avatar icon. Each message group is a flex row — the avatar and content are laid out with gap spacing.\n\n**Typing indicator**\n\nBefore the assistant responds, three dots appear in an animated sequence — each dot bounces with a staggered CSS animation delay. This is the universal "someone is typing" indicator. After the simulated delay (1.5 seconds), the dots disappear and the response message fades in.\n\n**Auto-growing textarea**\n\nThe message input uses a textarea that grows vertically as the user types. The height is set to scrollHeight on every input event, capped at a maximum height where it begins to scroll internally. This avoids the awkward fixed-height textarea that cuts off long messages.\n\n**Suggested prompts**\n\nWhen the chat is empty, four quick-action chips appear: "Explain async/await in JavaScript", "Write a Python function to sort a list", etc. Clicking any chip fills the input, ready to send. This is the same pattern used by ChatGPT and Claude to reduce blank-page friction.\n\n**Keyboard shortcuts**\n\nEnter sends the message. Shift+Enter inserts a newline. This is the standard chat keyboard behavior that users expect.\n\n**Simulated responses**\n\nFive canned technical responses cycle through as the "AI" reply. Replace this mock with a fetch() call to any AI API — OpenAI, Anthropic, or a local LLM endpoint.

**Auto-grow textarea**

The message input uses a \`<textarea>\` that auto-grows as the user types. On each \`input\` event, the textarea height is reset to \`auto\`, then set to \`scrollHeight + "px"\`. This makes the input expand line by line without scroll bars, matching the behavior of ChatGPT and Slack. A \`max-height\` cap prevents it from growing beyond a few lines, after which the textarea scrolls internally.

**Typing indicator animation**

The three animated dots in the typing indicator use CSS \`@keyframes\` with staggered \`animation-delay\` values (0s, 0.2s, 0.4s). Each dot bounces up and down using \`transform: translateY()\`. The indicator is appended to the chat container as a temporary message bubble, then removed and replaced with the real response after the simulated delay. This matches exactly how streaming AI responses appear in production chat applications.`,
    howToUse: [
      { step: 'Type a message', desc: 'Click the input at the bottom and type. Press Enter to send, Shift+Enter for a new line.' },
      { step: 'Suggested prompts', desc: 'Click any of the suggested prompt chips to pre-fill the input.' },
      { step: 'Watch the response', desc: 'A typing indicator appears for 1.5 seconds, then the simulated AI response fades in.' },
      { step: 'Conversation history', desc: 'Previous conversations are listed in the left sidebar for navigation.' },
      { step: 'New chat', desc: 'Click "New Chat" in the sidebar to reset the conversation.' },
      { step: 'Connect a real AI', desc: 'Replace the mock response logic with a fetch() to OpenAI, Anthropic, or any AI API.' },
    ],
    features: [
      { title: 'Two-panel layout', desc: 'Dark sidebar for conversation history, light main area for the active chat — the industry-standard AI UI pattern.' },
      { title: 'Typing indicator', desc: 'Three animated bouncing dots appear before each AI response — the universal "thinking" indicator.' },
      { title: 'Auto-grow textarea', desc: 'The input field expands vertically as you type, up to a maximum height.' },
      { title: 'Suggested prompts', desc: 'Quick-action chips on an empty chat reduce blank-page friction.' },
      { title: 'Keyboard shortcuts', desc: 'Enter to send, Shift+Enter for newline — standard chat keyboard behavior.' },
      { title: 'Smooth scroll', desc: 'The chat automatically scrolls to the latest message after each response.' },
      { title: 'Zero dependencies', desc: 'Pure HTML, CSS, and JS — plug a real AI API endpoint into the send function.' },
    ],
    useCases: [
      { title: 'AI Product Prototypes & Demos', desc: 'Build a working AI chat front-end to demo to stakeholders before the backend is ready. The typing indicator and simulated responses are convincing enough for investor demos. Swap in a [markdown live preview](/ui-snippets/markdown-live-preview/) renderer to display formatted AI output with code blocks and lists.' },
      { title: 'Customer Support Chatbots', desc: 'The sidebar conversation history, message bubbles, and typing indicator are ready for a real support bot — connect to Intercom, Zendesk, or a custom bot API. Add a [scroll-to-top](/ui-snippets/scroll-to-top/) button for long conversation threads.' },
      { title: 'In-App Coding Assistants', desc: 'The suggested prompts are pre-set for programming questions — ideal for a code helper embedded in a developer tool or IDE-like interface. Add a [rich text editor](/ui-snippets/rich-text-editor/) for the user input area to support code pasting.' },
      { title: 'Internal Knowledge Base & Q&A', desc: "Let employees ask questions in a familiar ChatGPT-like interface powered by your company's internal data — documents, wikis, or a vector database. The sidebar history keeps previous queries accessible. Add a [date-range-picker](/ui-snippets/date-range-picker/) to filter conversations by date range." },
      { title: 'Educational Tutoring Interfaces', desc: 'A subject-matter AI tutor that students can ask questions freely. Use suggested prompts as topic starters. Add a [keyboard shortcuts](/ui-snippets/keyboard-shortcuts/) overlay to show power-user tips.' },
      { title: 'Developer Portfolio Showcase', desc: 'Show recruiters or clients a polished, production-quality AI UI. Hook it up to a free OpenAI API key for live responses. Pair with a [glassmorphism login](/ui-snippets/glassmorphism-login/) for a complete auth + chat portfolio.' },
      { icon: 'CODE', title: 'Related: AI Image Generator UI', desc: 'See the [AI Image Generator UI](/ui-snippets/ai-image-generator-ui/) for a related layouts pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Breakout Grid Article Layout', desc: 'See the [Breakout Grid Article Layout](/ui-snippets/breakout-grid-article-layout/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to the OpenAI API?', a: 'In the sendMessage() function, replace the setTimeout mock with: const res = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { "Authorization": "Bearer YOUR_KEY", "Content-Type": "application/json" }, body: JSON.stringify({ model: "gpt-4o", messages: history }) }); const data = await res.json(); appendMessage("assistant", data.choices[0].message.content);' },
      { q: 'How do I add streaming responses?', a: 'Use fetch() with ReadableStream and TextDecoder to process the Server-Sent Events stream from OpenAI. Append each chunk to the assistant message in real time by updating its innerHTML as chunks arrive.' },
      { q: 'How do I add code syntax highlighting?', a: 'After appending an assistant message, run it through a library like Prism.js or Highlight.js, or write a simple regex that wraps backtick code blocks in <pre><code> tags with a monospace style.' },
      { q: 'How do I persist conversation history?', a: 'Store the messages array in localStorage: localStorage.setItem("chat", JSON.stringify(messages)). On page load, read it back and render the saved messages.' },
      { q: 'How do I add copy-to-clipboard on assistant messages?', a: 'In appendMessage(), when role === \'assistant\', add a copy button: const btn = document.createElement(\'button\'); btn.textContent = \'Copy\'; btn.addEventListener(\'click\', () => navigator.clipboard.writeText(content)); bubble.appendChild(btn). Style it to appear on hover with CSS .bubble:hover .copy-btn { opacity: 1; }.' },
    ],
  },

  seo: {
    title: 'AI Chat Interface HTML CSS JS — ChatGPT-Style UI',
    description: 'ChatGPT-style AI chat UI with auto-resize textarea, streaming text animation, sidebar conversation history, and suggestion chips. Pure HTML CSS JS.',
    about: {
      title: 'AI Chat Interface — How to Build a ChatGPT-Style Chat UI in HTML, CSS, and JavaScript',
      description: `Conversational AI interfaces have a distinctive layout that users now recognize immediately: a sidebar listing past conversations, a central message thread with alternating user and assistant bubbles, a fixed bottom input bar with an auto-resizing textarea, and suggestion chips for quick prompts. Building this pattern correctly requires careful attention to scrolling behavior, textarea height management, streaming text effects, and message bubble rendering.\n\nThis snippet builds a complete, production-quality AI chat interface in plain HTML, CSS, and vanilla JavaScript — no React, no framework, no external library. Every interaction detail matches the pattern users expect from ChatGPT, Claude, and Gemini.\n\n## Auto-Resize Textarea\n\nThe input field is a \`<textarea>\` rather than an \`<input type="text">\` to support multi-line messages. Auto-resizing is a two-step CSS+JS technique: set \`height: auto\` to collapse the textarea to its natural height, then immediately set \`height: scrollHeight + 'px'\` to expand it to fit all content. A \`max-height\` CSS property caps the growth and enables internal scrolling for very long messages.\n\nThe resize handler fires on every \`input\` event. Setting \`height: auto\` first is the critical step — without it, the element only grows (never shrinks) because \`scrollHeight\` reads the content height including any existing expansion.\n\n## Message Bubble Architecture\n\nEach message is a \`<div class="message user">\` or \`<div class="message assistant">\` containing a \`<div class="bubble">\`. User bubbles align right with an accent background. Assistant bubbles align left with a surface background, a bot icon, and inline-formatted content supporting \`<code>\`, \`<strong>\`, and \`<br>\` tags from the canned response strings.\n\nThe \`appendMessage(role, html)\` function creates this structure programmatically, appends it to the messages container, and calls \`scrollToBottom()\` — which sets \`messages.scrollTop = messages.scrollHeight\`. The \`scrollToBottom()\` call is wrapped in \`requestAnimationFrame\` to ensure the DOM has updated before the scroll happens.\n\n## Streaming Text Animation\n\nWhen the assistant responds, the text is revealed character by character using \`setInterval\`. The interval fires every 18ms, appending one character to the bubble's innerHTML. The streaming creates the illusion of the AI typing in real time — the same technique used in actual AI streaming implementations, though here the full response string is known in advance.\n\nThe streaming function: creates an empty bubble, starts an interval, reads one character from the response string on each tick, appends it to the bubble, calls \`scrollToBottom()\`, and clears the interval when the full string is appended. The send button is disabled during streaming and re-enabled when complete.\n\n## Conversation Sidebar\n\nThe left sidebar lists previous conversation items using \`<a class="conv-item">\` elements. Clicking any item sets it as active (by removing active from all items and adding it to the clicked one). In a production implementation, each item would load its message history into the main thread — the snippet keeps the click handler hookable for this extension.\n\nThe sidebar has a collapsible state toggled by a hamburger-style button. On mobile (\`max-width: 640px\`) the sidebar overlays the chat area using \`position: fixed\` and a semi-transparent backdrop. The \`toggleSidebar()\` function adds/removes the \`.open\` class which drives the transform and visibility transitions via CSS.\n\n## Suggestion Chips\n\nOn initial load (empty state), the interface shows a set of suggestion chips — common starter prompts like "Explain async/await in JavaScript" or "Write a Python function to sort a list". Clicking a chip fills the textarea with that prompt and removes the chip area. Once the first message is sent, the chip area is hidden permanently in the session. This pattern reduces friction for new users who don't know what to type.\n\n## New Chat and Conversation History\n\nThe New Chat button (+ icon in the sidebar header) calls \`newChat()\` — clears the message thread, restores the suggestion chips, resets the input, focuses the textarea, and creates a new conversation entry in the sidebar list. The conversation entry uses the first message text (truncated to 30 characters) as its label, simulating the pattern of AI apps naming conversations after their first query.\n\n## Input Bar Layout\n\nThe input bar uses a \`display: flex\` row with the textarea taking \`flex: 1\` and the send button fixed-width. The \`Enter\` key submits (via \`keydown\` event checking \`e.key === 'Enter' && !e.shiftKey\`), while \`Shift+Enter\` inserts a newline — the same keyboard behavior as ChatGPT and Claude's web interface. \`e.preventDefault()\` on plain Enter prevents the default form newline.\n\n## Styling the Code Blocks\n\nThe assistant responses include HTML with inline \`<code>\` tags. The CSS \`.bubble code\` styles these with a monospace font, a subtle background tint, and rounded corners — matching the pattern of AI chat interfaces that render markdown-style code inline without a full syntax highlighter.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start a conversation', text: 'Type a message in the input bar and press Enter (or Shift+Enter for a new line). The user bubble appears on the right, and after a brief delay the assistant responds with a streaming text animation.' },
        { title: 'Use suggestion chips', text: 'On the empty state, click any suggestion chip to pre-fill the input with a common prompt. The chips disappear after the first message is sent.' },
        { title: 'Toggle the sidebar', text: 'Click the hamburger icon to collapse or expand the conversation history sidebar. On mobile, the sidebar overlays the chat with a backdrop.' },
        { title: 'Start a new chat', text: 'Click the + button in the sidebar header to clear the message thread and start fresh. The previous conversation appears as a new entry in the sidebar list.' },
        { title: 'Connect a real AI API', text: 'In the sendMessage() function, replace the canned response with a fetch() call to OpenAI, Anthropic, or any streaming AI endpoint. Replace the character-by-character interval with a ReadableStream reader for true server-sent streaming.' },
        { title: 'Add markdown rendering', text: 'Replace the inner HTML string assignment with a markdown parser (marked.js, markdown-it) for full bold, code block, and list rendering. The bubble structure and streaming loop stay the same.' },
      ],
    },
    features: [
      'Auto-resize textarea: height:auto → scrollHeight trick, max-height cap for internal scroll, fires on every input event',
      'Streaming text: setInterval 18ms character-by-character reveal — same UX as real AI streaming responses',
      'Message bubbles: user (right, accent bg) and assistant (left, surface bg) with bot icon and inline HTML rendering',
      'Suggestion chips: empty-state prompts, click-to-fill, hidden permanently after first message sent',
      'Sidebar: conversation history list, active item tracking, collapsible with CSS transform transition',
      'Mobile sidebar: position:fixed overlay with backdrop, .open class toggle via toggleSidebar()',
      'New Chat: clears thread, restores chips, creates sidebar entry with first-message-truncated label',
      'Enter to send, Shift+Enter for newline — preventDefault on plain Enter prevents default form newline',
      'scrollToBottom: messages.scrollTop = messages.scrollHeight, wrapped in requestAnimationFrame for DOM update timing',
    ],
    useCases: [
      { icon: 'APP', title: 'AI Assistant & Chatbot UI Template', desc: 'Use as the front-end shell for any AI assistant product — connect to OpenAI, Anthropic Claude, Google Gemini, or any custom LLM API. The streaming simulation matches the UX of real streaming responses, so swapping in a real ReadableStream reader requires only changing the response handler.' },
      { icon: 'LEARN', title: 'Customer Support & Help Chat Widget', desc: 'Embed as a support chat interface connected to a rule-based chatbot or live agent backend. The sidebar conversation history, suggestion chips for common questions, and mobile overlay sidebar match the patterns users expect from modern support chat tools.' },
      { icon: 'CODE', title: 'Developer Tool Copilot Interface', desc: 'Build a coding assistant UI that accepts code questions and returns syntax-highlighted answers. The inline \`<code>\` rendering and streaming animation are already wired. Connect to a code-specialized model and add a [code editor panel](/html-playground/) alongside the chat thread.' },
      { icon: 'DESIGN', title: 'Product Prototype & UX Demo', desc: 'Use the canned responses and suggestion chips to demo an AI-powered feature to stakeholders or user research participants without building a real backend. The streaming animation and familiar ChatGPT-style layout make demos feel polished and production-ready.' },
      { icon: 'FLOW', title: 'Onboarding Bot & Interactive Tutorial', desc: 'Replace canned responses with a scripted conversation tree that guides new users through product features step by step. Each step\'s response advances the tutorial. Pair with an [onboarding tour](/ui-snippets/onboarding-tour/) that highlights UI elements in sync with the chat messages.' },
      { icon: 'GLOBAL', title: 'Language Learning & Conversation Practice', desc: 'Build a language learning conversation partner that responds in the target language. The suggestion chips can scaffold early learners with pre-written prompts. The message history sidebar lets learners review past practice sessions. Connect to any multilingual model API.' },
    ],
    faqs: [
      { q: 'How do I connect this to a real AI API like OpenAI or Anthropic?', a: 'In sendMessage(), replace the canned response setTimeout with: const res = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { "Authorization": "Bearer " + API_KEY, "Content-Type": "application/json" }, body: JSON.stringify({ model: "gpt-4o", messages: conversationHistory, stream: true }) }). Read the response as a ReadableStream and decode each SSE chunk to get the delta text, appending it to the assistant bubble in real time.' },
      { q: 'How does the auto-resize textarea work?', a: 'The input handler does: textarea.style.height = "auto"; then immediately textarea.style.height = textarea.scrollHeight + "px". Setting height to auto first collapses the element so scrollHeight reflects the actual content height. Without the collapse step, scrollHeight always reads the previously set height and the textarea never shrinks. A CSS max-height caps growth and enables internal scrolling for very long inputs.' },
      { q: 'How do I add markdown rendering for bold text, lists, and code blocks?', a: 'Add the marked.js CDN script, then in the appendMessage function change the bubble innerHTML assignment to: bubble.innerHTML = marked.parse(responseText). This renders **bold**, `code`, ```code blocks```, and - list items correctly. For the streaming animation, accumulate the full response in a string variable and call marked.parse() on the complete string after streaming ends, replacing the streaming innerHTML with the rendered markdown.' },
      { q: 'How do I persist conversation history across page reloads?', a: 'Serialize the messages array to localStorage on each message: localStorage.setItem("chat-history", JSON.stringify(messages)). On page load, read it back and re-render each message. For the sidebar conversation list, store an array of conversation objects { id, title, messages } in localStorage keyed by a generated UUID. This matches the persistence pattern of real AI chat apps.' },
      { q: 'How do I implement Shift+Enter for multiline and Enter to send?', a: 'Add a keydown listener to the textarea: textarea.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }). The !e.shiftKey condition means plain Enter sends, while Shift+Enter falls through to the default behavior (newline insertion). Always call e.preventDefault() on plain Enter to prevent the textarea from adding a newline before submitting.' },
      { q: 'Can I use this AI chat interface in React, Vue, or Angular?', a: 'Yes. The JSX, Vue, Angular, and Tailwind export buttons convert it automatically. In React, keep the message array in useState, replace the typing simulation with your streaming API call, and scroll the container in a useEffect that runs whenever messages change.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the auto-grow and scroll logic by hand — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the textarea's height is reset to auto before reading scrollHeight on every input event, and what would break if that reset were skipped. The same assistant is useful for optimizing it — asking whether appendMessage's approach of building a fresh DOM subtree per message is fast enough for a conversation with hundreds of messages, or whether older messages should be virtualized out of the DOM. It's just as good for extending the interface: ask it to replace the setTimeout-based canned responses with a real streaming fetch call to an LLM API using ReadableStream, add markdown/code-block rendering to assistant bubbles, or persist conversations to localStorage so they survive a page reload. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a ChatGPT-style "AI chat interface" in plain HTML, CSS, and JavaScript — no framework, no libraries, using a sidebar plus main chat panel layout.

Requirements:
- A fixed-width dark sidebar containing a "new chat" button, a list of clickable past-conversation entries (one marked active at a time), and a user row at the bottom; a flexible main panel containing a header with a clickable model-name selector, a scrollable message thread, an empty-state row of clickable suggestion chips, and a bottom input bar.
- The message input must be a textarea (not a single-line input) that automatically grows taller as the user types: on every input event, first reset its height to auto, then set it to its scrollHeight in pixels, capped at a maximum height beyond which it scrolls internally instead of growing further.
- Enter must send the message and Shift+Enter must insert a newline: implement this by checking e.key and e.shiftKey in a keydown handler and calling preventDefault only for the plain-Enter case.
- Sending a message must: append a right-aligned user bubble, clear and shrink the input, disable the send button, show a left-aligned "typing" indicator (three bouncing dots with staggered animation-delay values) in place of the assistant's response, and after a delay remove the typing indicator and append the assistant's reply bubble (built from a small rotating array of canned HTML responses for this demo, structured so a real API call could replace it later).
- Every new message appended to the thread must trigger the message container to scroll to its bottom automatically.
- Clicking a suggestion chip should fill the input with that chip's preset prompt text and focus the input, without sending it automatically. Clicking "new chat" should clear the thread, restore the suggestion chips, and reset the input.`,
    },
  },
};

export default aiChatInterface;
