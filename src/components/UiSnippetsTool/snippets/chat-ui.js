const chatUi = {
    id: 'chat-ui',
    title: 'Chat Bubble UI',
    category: 'layouts',
    html: `<div class="chat-wrap">
  <div class="chat-header">
    <div class="avatar-wrap">
      <div class="avatar">AI</div>
      <span class="online-dot"></span>
    </div>
    <div class="info">
      <div class="name">Assistant</div>
      <div class="status">Online</div>
    </div>
    <button class="more-btn">⋯</button>
  </div>
  <div class="messages" id="msgs">
    <div class="msg incoming">
      <div class="bubble">Hey! How can I help you today? 👋</div>
      <div class="time">9:41 AM</div>
    </div>
    <div class="msg outgoing">
      <div class="bubble">I need help designing a landing page</div>
      <div class="time">9:42 AM ✓✓</div>
    </div>
    <div class="msg incoming">
      <div class="bubble">Sure! Here are a few tips for a great landing page:<br><br>1. Clear headline above the fold<br>2. Single call-to-action button<br>3. Social proof (testimonials)</div>
      <div class="time">9:42 AM</div>
    </div>
    <div class="msg outgoing">
      <div class="bubble">That's really helpful, thanks!</div>
      <div class="time">9:43 AM ✓✓</div>
    </div>
  </div>
  <div class="chat-input">
    <input id="msg-input" type="text" placeholder="Type a message…" onkeydown="if(event.key==='Enter')sendMsg()" />
    <button class="send-btn" onclick="sendMsg()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
    </button>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f1f5f9; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.chat-wrap { width: 320px; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1); display: flex; flex-direction: column; }

.chat-header { display: flex; align-items: center; gap: 10px; padding: 14px 16px; background: #6366f1; color: #fff; }
.avatar-wrap { position: relative; }
.avatar { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; }
.online-dot { position: absolute; bottom: 0; right: 0; width: 9px; height: 9px; background: #4ade80; border-radius: 50%; border: 2px solid #6366f1; }
.info { flex: 1; }
.name { font-size: 13px; font-weight: 700; }
.status { font-size: 11px; opacity: 0.8; }
.more-btn { background: none; border: none; color: #fff; font-size: 18px; cursor: pointer; padding: 0 4px; opacity: 0.8; }

.messages { flex: 1; overflow-y: auto; padding: 16px 14px; display: flex; flex-direction: column; gap: 10px; max-height: 300px; background: #f8fafc; }

.msg { display: flex; flex-direction: column; gap: 3px; max-width: 75%; }
.msg.incoming { align-self: flex-start; align-items: flex-start; }
.msg.outgoing { align-self: flex-end; align-items: flex-end; }

.bubble { padding: 10px 13px; border-radius: 16px; font-size: 13px; line-height: 1.5; }
.incoming .bubble { background: #fff; color: #1e293b; border-radius: 4px 16px 16px 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.07); }
.outgoing .bubble { background: #6366f1; color: #fff; border-radius: 16px 4px 16px 16px; }

.time { font-size: 10px; color: #94a3b8; }

.chat-input { display: flex; gap: 8px; padding: 12px 14px; border-top: 1px solid #f1f5f9; }
.chat-input input { flex: 1; padding: 9px 12px; font-size: 13px; font-family: inherit; border: 1.5px solid #e2e8f0; border-radius: 20px; outline: none; transition: border-color 0.15s; }
.chat-input input:focus { border-color: #6366f1; }
.send-btn { width: 36px; height: 36px; border-radius: 50%; background: #6366f1; border: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; flex-shrink: 0; }
.send-btn:hover { background: #4f46e5; }`,
    js: `function sendMsg() {
  const inp = document.getElementById('msg-input');
  const text = inp.value.trim();
  if (!text) return;
  const msgs = document.getElementById('msgs');
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const el = document.createElement('div');
  el.className = 'msg outgoing';
  el.innerHTML = \`<div class="bubble">\${text}</div><div class="time">\${now} ✓✓</div>\`;
  msgs.appendChild(el);
  inp.value = '';
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'msg incoming';
    reply.innerHTML = \`<div class="bubble">Got it! Let me look into that for you… 🔍</div><div class="time">\${now}</div>\`;
    msgs.appendChild(reply);
    msgs.scrollTop = msgs.scrollHeight;
  }, 900);
}`,

  seo: {
    title: 'Chat UI — Free HTML CSS JS Messaging Snippet',
    description: 'Chat layout with incoming and outgoing bubbles, timestamps, Enter-to-send and auto-scroll. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Chat UI — Dynamic Message Append, Outgoing/Incoming Bubbles & Auto-Scroll',
      description: `A chat UI is the messaging interface pattern used in customer support widgets like the [floating chat widget](/ui-snippets/floating-chat-widget/), social apps, AI chatbots (see the [AI prompt composer](/ui-snippets/ai-prompt-composer/)), and collaboration tools. This snippet provides the complete UI: a scrollable message list with outgoing and incoming bubble styles, a text input with send button, Enter key support, and auto-scroll to the latest message.

**Sending messages**

\`sendMsg()\` reads the input value, trims whitespace, and returns early if empty. It creates a \`div.msg.outgoing\` element, sets its \`innerHTML\` with the message text and current time via \`toLocaleTimeString\`. The message is appended to the \`#msgs\` container and the container scrolls to \`scrollTop = scrollHeight\` to show the new message. The input is cleared.

**Incoming vs outgoing bubbles**

\`.msg.outgoing\` aligns to the right with an accent background. \`.msg.incoming\` aligns to the left with a grey background. Both use \`max-width: 70%\` to prevent bubbles from spanning the full chat width. The timestamp sits below the bubble text in a smaller, dimmer colour.

**Enter key support**

The input has \`onkeydown="if(event.key==='Enter') sendMsg()"\` — pressing Enter sends the message without needing to click the button.

**Auto-scroll**

\`msgs.scrollTop = msgs.scrollHeight\` scrolls the message container to its maximum height after appending each message, keeping the latest message always visible.

**The message append pattern**

sendMessage() creates a new .message div with class "outgoing" and the message text, then appends it to .messages. A short setTimeout creates the simulated incoming reply. Each message has a .time span showing the current time formatted as HH:MM. The container uses overflow-y: auto and a JavaScript call to scrollTop = scrollHeight after each append to auto-scroll to the most recent message.

**Message bubbles with CSS**

Outgoing messages float right using margin-left: auto. Incoming messages have no margin override so they sit at the left. Both use border-radius with an asymmetric corner: outgoing messages have border-bottom-right-radius: 4px (the "tail" corner), incoming have border-bottom-left-radius: 4px. This is the standard chat bubble tail pattern.

**The typing indicator**

Before the simulated reply arrives, three animated dots appear (.typing-indicator) using the same bounce animation as the [Dots Loader](/ui-snippets/dots-loader/) snippet in this library. The indicator is removed when the reply message is appended.

**Customising for real use**

Wire sendMessage() to a WebSocket or API endpoint. Render incoming messages from the server's message event. For a real chat UI, each message needs a sender ID, timestamp, and message ID for proper rendering and ordering.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Type and send a message', text: 'Type in the input and press Enter or click Send. Your message appears as an outgoing bubble. The timestamp shows the current time.' },
        { title: 'Update the chat header', text: 'In the HTML panel, change the contact name and status in .chat-header.' },
        { title: 'Add incoming messages', text: 'In the JS panel, add an incoming message after sending: append a .msg.incoming div to mimic a reply.' },
        { title: 'Change bubble colours', text: 'Update background on .msg.outgoing (accent) and .msg.incoming (grey) in the CSS panel.' },
        { title: 'Connect to a WebSocket', text: 'Replace the static incoming message placeholder with a WebSocket onmessage handler that appends .msg.incoming divs from server data.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'sendMsg() creates .msg.outgoing div with text and formatted timestamp',
      'msgs.scrollTop = msgs.scrollHeight auto-scrolls after each message',
      'Enter key onkeydown sends message without clicking the button',
      'Incoming .msg.incoming and outgoing .msg.outgoing distinct visual styles',
      'max-width: 70% on bubbles prevents full-width messages',
      'Online status green dot in header with absolute positioning',
      'overflow-y: auto on message container with scrollbar hidden',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'APP',    title: 'Customer support chat widget',    desc: 'Use as the UI for an embedded support chat. Wire sendMsg() to a WebSocket or third-party chat API like Intercom or Crisp.' },
      { icon: 'CODE',   title: 'AI chatbot interface',           desc: 'Use as the UI for an AI assistant. Send user messages to an API endpoint and append incoming bubble replies from the response.' },
      { icon: 'PEOPLE', title: 'Social and messaging apps',      desc: 'Prototype a direct message UI. The outgoing/incoming bubble pattern is identical to iMessage, WhatsApp, and Slack direct messages.' },
      { icon: 'LEARN',  title: 'Learn DOM append and auto-scroll', desc: 'Edit the sendMsg function to understand how createElement, innerHTML, appendChild, and scrollTop work together to create a live-updating list.' },
      { icon: 'FLOW',   title: 'Chatbot onboarding flows',       desc: 'Simulate a guided onboarding conversation. Programmatically append incoming messages on a timer to create an interactive step-by-step flow.' },
      { icon: 'DESIGN', title: 'Chat UI for design presentations', desc: 'Use as a static mockup by pre-populating the message list in the HTML panel. The chat bubble layout communicates conversation context clearly.' },
      { icon: 'CODE', title: 'Related: CSS aspect-ratio Playground', desc: 'See the [CSS aspect-ratio Playground](/ui-snippets/css-aspect-ratio-playground/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are new messages added to the chat?', a: 'sendMsg() calls document.createElement("div"), sets el.className = "msg outgoing", sets el.innerHTML with the text and timestamp, appends it to #msgs, then sets msgs.scrollTop = msgs.scrollHeight to scroll to the new message.' },
      { q: 'How does auto-scroll work?', a: 'msgs.scrollTop = msgs.scrollHeight sets the scroll position to the maximum possible value — the total height of all messages. This is called after every append, keeping the latest message visible.' },
      { q: 'How do I add an incoming reply?', a: 'In sendMsg(), after appending the outgoing message, create a second element with className = "msg incoming" and simulate a reply: setTimeout(() => { const reply = document.createElement("div"); reply.className = "msg incoming"; reply.innerHTML = "<p>Got it!</p>"; msgs.append(reply); msgs.scrollTop = msgs.scrollHeight; }, 1000); }' },
      { q: 'How do I connect this to a real backend?', a: 'Open a WebSocket connection: const ws = new WebSocket("wss://your-server.com"). In sendMsg(), call ws.send(text) instead of immediately appending. In ws.onmessage, append .msg.incoming divs with the received data.' },
      { q: 'How do I add emoji or file attachment support?', a: 'For emoji, add an emoji picker button that inserts characters into the input value. For files, add a <input type="file"> button. On file selection, read with FileReader and display as an <img> in the bubble.' },
      { q: 'Can I use this chat UI in React?', a: 'Yes. Click "JSX" for a React component. In React, manage messages as an array in useState. Use useRef on the message container and call ref.current.scrollTo({ top: ref.current.scrollHeight }) in a useEffect after messages update.' },
    ],
    aiPrompt: {
      paragraph: `Rather than assuming the auto-scroll and bubble styling are trivial, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setting scrollTop to scrollHeight reliably scrolls to the bottom regardless of how many messages exist, and why the outgoing and incoming bubbles use opposite asymmetric border-radius corners instead of a uniform rounded rectangle. The same assistant can help optimize it — ask whether appending raw text into innerHTML in sendMsg() is safe if a user types HTML-like characters, and how you'd escape it properly without losing the ability to render rich content like links. It's also a good partner for extending the UI: ask it to add a typing indicator that appears before the simulated reply, wire sendMsg() to a real WebSocket connection instead of the setTimeout-based fake reply, or add read-receipt checkmarks that update from single to double tick asynchronously. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "chat bubble UI" in plain HTML, CSS, and JavaScript — no framework, no library.

Requirements:
- A fixed-width chat panel with a header showing an avatar, an online status dot, a name and status line, followed by a scrollable message list and a bottom input row with a text field and a send button.
- Every message must be a div with a shared base class plus either an "incoming" or "outgoing" modifier class: outgoing messages align to the right with an accent-colored bubble, incoming messages align to the left with a neutral bubble, and both must be capped at a maximum width (not full container width) so short messages don't stretch edge to edge.
- Give outgoing and incoming bubbles opposite asymmetric corner radii (a small "tail" corner on the side facing the edge of the screen) so they visually read as speech bubbles pointing toward their sender's side.
- Sending a message must read and trim the input's value, do nothing if it's empty, create a new outgoing message element with the trimmed text and a formatted current timestamp, append it to the message list, clear the input, and scroll the message container to its maximum scroll position so the new message is always visible.
- Pressing the Enter key while focused in the text input must trigger the exact same send function as clicking the send button — no duplicated logic between the two paths.
- After an outgoing message is sent, simulate a delayed incoming reply (via a timeout of under a second) that appends its own incoming-styled message and re-scrolls the container to the bottom.`,
    },
  },
};

export default chatUi;
