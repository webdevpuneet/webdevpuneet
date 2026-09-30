const floatingChatWidget = {
  id: 'floating-chat-widget',
  title: 'Floating Chat Support Widget',
  lastmod: '2026-06-13',
  category: 'modals',
  html: `<div class="demo-page">
  <div class="page-content">
    <h2>Support Chat Widget</h2>
    <p>Click the chat button in the bottom-right corner to open the support widget.</p>
  </div>

  <!-- Chat widget -->
  <div class="chat-widget" id="chatWidget">
    <!-- Chat window -->
    <div class="chat-window" id="chatWindow" aria-hidden="true">
      <div class="chat-header">
        <div class="agent-info">
          <div class="agent-avatar">
            <span>S</span>
            <span class="online-dot"></span>
          </div>
          <div>
            <div class="agent-name">Support Team</div>
            <div class="agent-status">● Online · Replies in minutes</div>
          </div>
        </div>
        <button class="close-chat" id="closeChat" aria-label="Close chat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="chat-messages" id="chatMessages">
        <div class="msg msg-agent">
          <div class="msg-bubble">👋 Hi there! How can I help you today?</div>
          <div class="msg-time">10:24 AM</div>
        </div>
        <div class="msg msg-agent">
          <div class="msg-bubble">Feel free to ask anything — we're here to help.</div>
          <div class="msg-time">10:24 AM</div>
        </div>
      </div>

      <div class="quick-replies" id="quickReplies">
        <button class="qr-btn" onclick="quickReply(this)">💬 I have a question</button>
        <button class="qr-btn" onclick="quickReply(this)">🐛 Report a bug</button>
        <button class="qr-btn" onclick="quickReply(this)">💡 Feature request</button>
      </div>

      <div class="chat-input-row">
        <input type="text" class="chat-input" id="chatInput" placeholder="Type a message…" autocomplete="off" onkeydown="handleKey(event)">
        <button class="send-btn" id="sendBtn" onclick="sendMessage()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>

    <!-- Trigger button -->
    <button class="chat-trigger" id="chatTrigger" aria-label="Open chat support" onclick="toggleChat()">
      <span class="trigger-icon open-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </span>
      <span class="trigger-icon close-icon" style="display:none">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </span>
      <span class="unread-badge" id="unreadBadge">2</span>
    </button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f8fafc;min-height:100vh}

.demo-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;position:relative}
.page-content{text-align:center}
.page-content h2{font-size:20px;font-weight:700;color:#1e293b;margin-bottom:8px}
.page-content p{font-size:14px;color:#64748b}

/* Widget container */
.chat-widget{position:fixed;bottom:24px;right:24px;display:flex;flex-direction:column;align-items:flex-end;gap:12px;z-index:1000}

/* Chat window */
.chat-window{
  width:320px;background:#fff;border-radius:20px;
  box-shadow:0 20px 60px rgba(0,0,0,.18),0 4px 16px rgba(0,0,0,.08);
  display:flex;flex-direction:column;overflow:hidden;
  transform-origin:bottom right;
  transform:scale(.8) translateY(20px);opacity:0;
  transition:transform .3s cubic-bezier(.34,1.56,.64,1),opacity .25s ease;
  pointer-events:none;
}
.chat-window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}

.chat-header{padding:14px 16px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;gap:10px;justify-content:space-between}
.agent-info{display:flex;align-items:center;gap:10px}
.agent-avatar{position:relative;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;flex-shrink:0}
.online-dot{position:absolute;bottom:1px;right:1px;width:9px;height:9px;border-radius:50%;background:#4ade80;border:2px solid #6366f1}
.agent-name{font-size:13px;font-weight:700;color:#fff}
.agent-status{font-size:10px;color:rgba(255,255,255,.75);margin-top:1px}
.close-chat{background:rgba(255,255,255,.15);border:none;border-radius:8px;width:28px;height:28px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s;flex-shrink:0}
.close-chat:hover{background:rgba(255,255,255,.25)}

.chat-messages{flex:1;padding:14px;display:flex;flex-direction:column;gap:8px;overflow-y:auto;max-height:220px;min-height:120px;background:#f8fafc}

.msg{display:flex;flex-direction:column;gap:2px}
.msg-agent{align-items:flex-start}
.msg-user{align-items:flex-end}

.msg-bubble{max-width:220px;padding:9px 12px;border-radius:16px;font-size:13px;line-height:1.5}
.msg-agent .msg-bubble{background:#fff;color:#1e293b;border:1px solid #e2e8f0;border-radius:4px 16px 16px 16px;box-shadow:0 1px 4px rgba(0,0,0,.06)}
.msg-user .msg-bubble{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border-radius:16px 4px 16px 16px}
.msg-time{font-size:10px;color:#94a3b8;padding:0 4px}

.typing-indicator .msg-bubble{display:flex;gap:4px;align-items:center;padding:10px 14px}
.typing-dot{width:6px;height:6px;border-radius:50%;background:#94a3b8;animation:typingBounce .9s ease-in-out infinite}
.typing-dot:nth-child(2){animation-delay:.15s}
.typing-dot:nth-child(3){animation-delay:.3s}
@keyframes typingBounce{0%,80%,100%{transform:scale(.8);opacity:.5}40%{transform:scale(1);opacity:1}}

.quick-replies{padding:8px 14px;display:flex;flex-wrap:wrap;gap:6px;border-top:1px solid #f1f5f9}
.qr-btn{font-size:11px;font-weight:600;color:#6366f1;background:#eef2ff;border:1px solid #c7d2fe;border-radius:20px;padding:4px 10px;cursor:pointer;transition:all .15s;font-family:inherit}
.qr-btn:hover{background:#6366f1;color:#fff;border-color:#6366f1}

.chat-input-row{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #e2e8f0;background:#fff}
.chat-input{flex:1;padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;color:#1e293b;outline:none;font-family:inherit;transition:border-color .15s}
.chat-input:focus{border-color:#6366f1}
.send-btn{width:36px;height:36px;border-radius:10px;background:#6366f1;border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s;flex-shrink:0}
.send-btn:hover{background:#4f46e5}
.send-btn:active{transform:scale(.93)}

/* Trigger button */
.chat-trigger{width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 24px rgba(99,102,241,.45);transition:transform .2s,box-shadow .2s;position:relative}
.chat-trigger:hover{transform:scale(1.08);box-shadow:0 12px 32px rgba(99,102,241,.55)}
.trigger-icon{display:flex;align-items:center;justify-content:center;transition:opacity .2s,transform .2s}

.unread-badge{position:absolute;top:-2px;right:-2px;background:#ef4444;color:#fff;font-size:10px;font-weight:800;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;transition:transform .2s}
.unread-badge.hidden{transform:scale(0)}`,

  js: `let isOpen = false;
let messageCount = 0;
const widget = document.getElementById('chatWidget');
const window_ = document.getElementById('chatWindow');
const trigger = document.getElementById('chatTrigger');
const messages = document.getElementById('chatMessages');
const input = document.getElementById('chatInput');
const badge = document.getElementById('unreadBadge');
const quickReplies = document.getElementById('quickReplies');

function toggleChat() {
  isOpen = !isOpen;
  window_.classList.toggle('open', isOpen);
  window_.setAttribute('aria-hidden', String(!isOpen));
  trigger.querySelector('.open-icon').style.display = isOpen ? 'none' : '';
  trigger.querySelector('.close-icon').style.display = isOpen ? '' : 'none';
  badge.classList.add('hidden');
  if (isOpen) setTimeout(() => input.focus(), 350);
}

document.getElementById('closeChat').addEventListener('click', () => {
  isOpen = false;
  window_.classList.remove('open');
  window_.setAttribute('aria-hidden', 'true');
  trigger.querySelector('.open-icon').style.display = '';
  trigger.querySelector('.close-icon').style.display = 'none';
});

function addMessage(text, type) {
  const now = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  const msg = document.createElement('div');
  msg.className = 'msg msg-' + type;
  msg.innerHTML = \`<div class="msg-bubble">\${text}</div><div class="msg-time">\${now}</div>\`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const typing = document.createElement('div');
  typing.className = 'msg msg-agent typing-indicator';
  typing.id = 'typing';
  typing.innerHTML = \`<div class="msg-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>\`;
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
  return typing;
}

const REPLIES = [
  "Got it! Let me look into that for you.",
  "Thanks for reaching out! Our team will follow up shortly.",
  "Happy to help with that. Can you give me a bit more detail?",
  "Sure thing! I'll escalate this to the right person.",
];

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  quickReplies.style.display = 'none';
  const typing = showTyping();
  setTimeout(() => {
    typing.remove();
    addMessage(REPLIES[messageCount % REPLIES.length], 'agent');
    messageCount++;
  }, 1200 + Math.random() * 600);
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function quickReply(btn) {
  input.value = btn.textContent.replace(/^[^\w]+/, '').trim();
  btn.closest('.quick-replies').style.display = 'none';
  sendMessage();
}`,

  seo: {
    title: 'Floating Chat Support Widget — Live Chat UI HTML CSS JS',
    description: `Floating chat support widget with spring open animation, typing indicator, quick-reply chips, and unread badge. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `Floating Chat Support Widget — Spring Animation, Typing Indicator & Message Bubble Pattern`,
      description: `The floating chat widget is the most ubiquitous support UI pattern on the web — used by Intercom, Drift, Crisp, and HubSpot to provide live chat, onboarding help, and lead capture on every page. Building a custom chat widget lets you match your brand, avoid third-party tracking, and control the exact interaction. This snippet builds a complete floating chat widget: a gradient trigger button with unread badge, a spring-animated chat window with agent header, message bubbles with timestamps, typing indicator, quick reply chips, and a send message flow with auto-response.

Chat widgets must feel alive — the spring animation on open, the typing dots before the agent reply, and the bubble tail design all contribute to the sense that a real person is on the other end. Getting these micro-interactions right is the difference between a chat widget users engage with and one they immediately close.

**Spring open animation**

The chat window uses \`transform: scale(.8) translateY(20px)\` as its closed state and \`scale(1) translateY(0)\` when open — a scale-up from the bottom-right corner (\`transform-origin: bottom right\`). The transition uses \`cubic-bezier(.34,1.56,.64,1)\` — a spring easing that overshoots slightly before settling. This overshoot makes the window feel like it "pops" open rather than just appearing.

**Typing indicator with CSS animation**

The typing indicator renders three dots in a \`.typing-indicator\` message bubble. Each dot uses a \`@keyframes typingBounce\` animation with \`transform: scale\` and \`opacity\` — bouncing between 50% scale (dim) and 100% scale (bright). The three dots have staggered \`animation-delay\` values (0s, .15s, .3s), creating the left-to-right bounce wave. The indicator element is removed from the DOM and replaced by the actual reply after 1.2–1.8 seconds.

**Message bubble tail design**

User bubbles use \`border-radius: 16px 4px 16px 16px\` — the top-right corner is cut square to form a visual "tail" pointing toward the user. Agent bubbles use \`border-radius: 4px 16px 16px 16px\` — the top-left corner is cut square. This asymmetric border-radius pattern is the standard instant messaging bubble design (WhatsApp, iMessage, Telegram) that users immediately recognise as a conversation format.

**Quick reply chips**

Quick reply chips provide one-tap conversation starters for users who don't know what to ask. Clicking a chip populates the input with the chip text and immediately sends the message. The quick replies panel hides after the first message — showing them only before the conversation starts prevents them from cluttering an active chat. Pair with a [modal](/ui-snippets/modal/) for a full-screen overlay chat variant.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A floating indigo chat button appears in the bottom-right corner with a red "2" unread badge. The page shows a placeholder content area.` },
      { title: 'Click the chat button', text: `The chat window springs open from the button with a scale + overshoot animation. The unread badge disappears. The agent header shows "Online · Replies in minutes".` },
      { title: 'Use a quick reply chip', text: `Click "💬 I have a question" — it sends as a user message and triggers a typing indicator, followed by an auto-response after ~1.5 seconds.` },
      { title: 'Type your own message', text: `Type in the input and press Enter or click the send button. Each message gets an agent reply from a rotating set of canned responses.` },
      { title: 'Close with the × button', text: `The × in the header closes the window. Clicking the trigger button again re-opens it.` },
      { title: 'Customise the agent and responses', text: `Update the \`agent-name\` and \`agent-status\` in the HTML header. Update the \`REPLIES\` array in JS with your real support responses or API integration.` },
    ] },
    features: [
      { title: 'Spring open animation', text: `\`scale(.8) translateY(20px)\` → \`scale(1)\` with \`cubic-bezier(.34,1.56,.64,1)\` — spring overshoot that makes the window "pop" open from the button.` },
      { title: 'Typing indicator', text: `Three bouncing dots with staggered \`animation-delay\` — CSS-only wave animation removed and replaced with the agent reply after a random delay.` },
      { title: 'Asymmetric bubble tails', text: `\`border-radius: 4px 16px 16px 16px\` (agent) and \`16px 4px 16px 16px\` (user) — the iMessage/WhatsApp tail pattern that communicates message direction.` },
      { title: 'Quick reply chips', text: `Three pre-set topic chips that send a message on click and hide after use — reduces friction for the first message.` },
      { title: 'Unread badge', text: `Red circle badge with count on the trigger button — \`transform: scale(0)\` transition hides it when the chat opens.` },
      { title: 'Online presence indicator', text: `Green dot on the agent avatar — \`position: absolute; bottom; right\` with a white border ring — the standard online status badge.` },
      { title: 'Auto-scroll on new messages', text: `\`messages.scrollTop = messages.scrollHeight\` after each message append ensures the view always shows the latest message.` },
      { title: 'Keyboard send', text: `\`onkeydown\` handler on the input fires \`sendMessage()\` on Enter — the expected keyboard behaviour for chat inputs.` },
    ],
    useCases: [
      { title: 'Customer support on SaaS products', text: `The primary use case — a support chat entry point on every page that connects users to help without leaving the current context.` },
      { title: 'Lead capture on landing pages', text: `Marketing landing pages use chat widgets to capture leads conversationally — "Hi! What are you building?" — converting visitors before they leave.` },
      { title: 'Onboarding assistance for new users', text: `A proactive chat widget that opens automatically after 30 seconds for new users — "Need help getting started?" — reduces early churn.` },
      { title: 'E-commerce pre-purchase support', text: `Product pages use chat to answer questions about sizing, shipping, or compatibility — the moment where a human answer prevents cart abandonment.` },
      { title: 'Developer documentation help', text: `Documentation sites integrate chat for "Stuck? Ask a question" support — the [command palette](/ui-snippets/command-palette/) pattern for searching docs, chat for real questions.` },
      { title: 'Internal helpdesk tools', text: `HR and IT helpdesk portals use floating chat for ticket submission and status updates — employees stay in their current workflow.` },
      { icon: 'CODE', title: 'Related: Fullscreen Search Overlay', desc: 'See the [Fullscreen Search Overlay](/ui-snippets/fullscreen-search-overlay/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to a real chat API (Intercom, Crisp, custom)?', a: `Replace the \`REPLIES\` mock with a \`fetch\` call to your chat API in \`sendMessage()\`. Show the typing indicator while the request is pending. On response, remove the typing indicator and call \`addMessage(response.text, 'agent')\`. For WebSocket-based APIs, open a connection on chat init and push incoming messages via the \`onmessage\` handler.` },
      { q: 'How do I make the chat proactively open after a delay?', a: `Add \`setTimeout(() => { if (!isOpen) { toggleChat(); addMessage("👋 Need any help?", "agent"); } }, 30000)\` on page load. Store a \`sessionStorage\` flag to prevent it reopening on every page navigation within the same session.` },
      { q: 'How do I persist the chat history across page navigations?', a: `Store messages in \`sessionStorage\` as a JSON array. On init, read the stored messages and call \`addMessage\` for each one to restore the conversation. On each \`addMessage\` call, update the stored array.` },
      { q: 'How do I export this as a React component?', a: `Create a \`ChatWidget\` component with \`const [isOpen, setIsOpen] = useState(false)\` and \`const [messages, setMessages] = useState(initialMessages)\`. The window uses a CSS class driven by \`isOpen\`. Messages are a state array of \`{text, type, time}\` objects. The typing indicator is a separate \`const [typing, setTyping] = useState(false)\` state that renders a typing bubble conditionally.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace every timeout and class toggle in this widget by hand. Paste the HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the chat window's closed state uses scale(.8) translateY(20px) with transform-origin bottom right, and how the cubic-bezier(.34,1.56,.64,1) easing produces the overshoot "pop" rather than a plain ease-out. The same assistant can help optimize it — ask whether creating a new typing-indicator DOM node on every message versus reusing one fixed node matters at this scale, or whether the random 1200-1800ms reply delay should be replaced with a real network round trip once a backend is wired up. It's just as useful for extending the widget: have it add message persistence across page loads with sessionStorage, a proactive auto-open after a delay on first visit, or a real fetch/WebSocket integration in place of the REPLIES array. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a floating customer-support chat widget in plain HTML, CSS, and JavaScript — no libraries, no real backend required but structured so one can be added easily.

Requirements:
- A circular trigger button fixed to the bottom-right corner showing a chat-bubble icon and a red unread-count badge; clicking it toggles a chat window class and crossfades the trigger's icon to an X, and clears the unread badge.
- The chat window must be closed by default with transform: scale(0.8) translateY(20px) and opacity 0, transform-origin set to bottom right, and transition to scale(1) translateY(0) opacity 1 when an "open" class is applied, using a springy overshoot cubic-bezier easing so the window visibly pops rather than fades linearly into place.
- A header showing an agent avatar with an initial letter and a small green "online" dot positioned at its corner, an agent name, and a status line, plus a close button.
- A scrollable message list where user messages and agent messages are visually distinguished using an asymmetric border-radius each (one corner squared off on the side facing that speaker, like WhatsApp/iMessage bubbles), each message showing a timestamp.
- A set of quick-reply chip buttons shown only before the first message is sent; clicking one fills the input with that chip's text and immediately sends it, then hides the chips permanently for that session.
- A send flow where submitting a message (via button click or Enter key) appends the user's message, clears the input, shows an animated three-dot typing indicator (each dot bouncing with a staggered CSS keyframe delay) in a message bubble, and after a randomized 1.2-1.8 second delay removes the typing indicator and appends a canned agent reply cycling through a fixed array of responses. The message list must auto-scroll to the bottom after every new message.`,
    },
  },
};

export default floatingChatWidget;
