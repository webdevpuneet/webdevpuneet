const chatMessageBubbles = {
  id: 'chat-message-bubbles',
  title: 'Chat Message Bubbles with Read Receipts',
  lastmod: '2026-08-17',
  category: 'cards',
  html: `<div class="demo">
  <div class="thread" id="thread">
    <div class="day-divider"><span>Today</span></div>
    <div class="msg-row them">
      <div class="avatar">JN</div>
      <div class="bubble-group">
        <div class="bubble">Hey! Did you get a chance to look at the designs?</div>
        <div class="bubble">No rush, just checking in</div>
        <div class="meta">9:14 AM</div>
      </div>
    </div>
    <div class="msg-row me">
      <div class="bubble-group">
        <div class="bubble">Yep, looking now 👀</div>
        <div class="meta">Sent <span class="tick tick-read">✓✓</span> · 9:16 AM</div>
      </div>
    </div>
    <div class="msg-row them">
      <div class="avatar">JN</div>
      <div class="bubble-group">
        <div class="bubble">Take your time, no deadline on this one</div>
        <div class="meta">9:17 AM</div>
      </div>
    </div>
    <div class="msg-row me">
      <div class="bubble-group">
        <div class="bubble">Sounds good, I'll send feedback by EOD</div>
        <div class="meta">Delivered <span class="tick">✓</span> · 9:18 AM</div>
      </div>
    </div>
    <div class="typing-row" id="typingRow" hidden>
      <div class="avatar">JN</div>
      <div class="bubble typing-bubble"><span></span><span></span><span></span></div>
    </div>
  </div>
  <form class="composer" onsubmit="return sendMsg(event)">
    <input type="text" id="msgInput" placeholder="Type a message..." autocomplete="off">
    <button type="submit" aria-label="Send">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
    </button>
  </form>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f0f2f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
.demo { width: 100%; max-width: 380px; height: 520px; background: #fff; border-radius: 16px; box-shadow: 0 12px 32px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden; }
.thread { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
.day-divider { text-align: center; margin: 4px 0 10px; }
.day-divider span { background: #eef0f3; color: #8a8f98; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 999px; }
.msg-row { display: flex; gap: 8px; align-items: flex-end; max-width: 82%; }
.msg-row.them { align-self: flex-start; }
.msg-row.me { align-self: flex-end; flex-direction: row-reverse; }
.avatar { width: 26px; height: 26px; border-radius: 50%; background: #6366f1; color: #fff; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.bubble-group { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.msg-row.me .bubble-group { align-items: flex-end; }
.bubble { padding: 9px 13px; border-radius: 16px; font-size: 13.5px; line-height: 1.4; word-wrap: break-word; }
.msg-row.them .bubble { background: #f0f1f3; color: #1f2937; border-bottom-left-radius: 4px; }
.msg-row.me .bubble { background: #2563eb; color: #fff; border-bottom-right-radius: 4px; }
.msg-row.them .bubble-group .bubble:not(:first-child) { border-top-left-radius: 16px; }
.meta { font-size: 10.5px; color: #9ca3af; padding: 0 4px; }
.tick { color: #9ca3af; }
.tick-read { color: #34c759; }
.typing-row { display: flex; gap: 8px; align-items: flex-end; }
.typing-bubble { background: #f0f1f3; border-bottom-left-radius: 4px; padding: 11px 14px; display: flex; gap: 4px; }
.typing-bubble span { width: 6px; height: 6px; border-radius: 50%; background: #9ca3af; animation: bounce 1.2s infinite; }
.typing-bubble span:nth-child(2) { animation-delay: 0.15s; }
.typing-bubble span:nth-child(3) { animation-delay: 0.3s; }
@keyframes bounce { 0%,60%,100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-4px); opacity: 1; } }
.composer { display: flex; gap: 8px; padding: 12px; border-top: 1px solid #eef0f3; }
.composer input { flex: 1; border: 1px solid #e5e7eb; border-radius: 20px; padding: 9px 14px; font-size: 13.5px; outline: none; }
.composer input:focus { border-color: #2563eb; }
.composer button { width: 36px; height: 36px; border: none; border-radius: 50%; background: #2563eb; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
.composer button:hover { background: #1d4ed8; }`,
  js: `var thread = document.getElementById('thread');
var typingRow = document.getElementById('typingRow');

function scrollToBottom() {
  thread.scrollTop = thread.scrollHeight;
}

function addMessage(text, mine) {
  var row = document.createElement('div');
  row.className = 'msg-row ' + (mine ? 'me' : 'them');
  var time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  row.innerHTML = (mine ? '' : '<div class="avatar">JN</div>') +
    '<div class="bubble-group"><div class="bubble"></div><div class="meta">' +
    (mine ? 'Sent <span class="tick">\\u2713</span> · ' + time : time) + '</div></div>';
  row.querySelector('.bubble').textContent = text;
  thread.insertBefore(row, typingRow);
  scrollToBottom();
  return row;
}

function sendMsg(e) {
  e.preventDefault();
  var input = document.getElementById('msgInput');
  var text = input.value.trim();
  if (!text) return false;
  addMessage(text, true);
  input.value = '';
  simulateReply();
  return false;
}

function simulateReply() {
  setTimeout(function() {
    typingRow.hidden = false;
    scrollToBottom();
    setTimeout(function() {
      typingRow.hidden = true;
      addMessage('Got it, thanks!', false);
    }, 1400);
  }, 500);
}
scrollToBottom();`,
  seo: {
    title: 'Chat Message Bubbles — HTML CSS JS Snippet',
    description: 'Chat thread UI with grouped bubbles, read receipts, day dividers, and an animated typing indicator. Exports to React, Vue & Angular.',
    about: {
      title: 'Chat Message Bubbles — Grouped Threads, Read Receipts & Typing Indicator',
      description: `A chat interface is more than styled speech bubbles — the details that make one feel real are message grouping, delivery status, and a typing indicator that appears and disappears at the right moments. This snippet builds all three on top of plain flexbox, matching the visual language of iMessage and WhatsApp.\n\n**Bubble tails via asymmetric border-radius**\n\nRather than an SVG or pseudo-element tail, each bubble uses \`border-radius: 16px\` with one corner overridden: incoming bubbles get \`border-bottom-left-radius: 4px\`, outgoing bubbles get \`border-bottom-right-radius: 4px\`. The sharp corner sits nearest the avatar, which is what visually "points" the bubble at its sender without any extra markup.\n\n**Grouping consecutive messages**\n\nWhen the same sender posts multiple messages in a row, only the first carries the full rounded top corners — a CSS rule targets \`.bubble:not(:first-child)\` within a group to restore the top-left radius on any bubble after the first, since the group's first bubble is the only one that should have a soft top. Combined with the shared \`.bubble-group\` wrapper only showing one timestamp per group instead of one per bubble, this is what makes rapid-fire messages read as one thought instead of a wall of separate boxes.\n\n**Read receipts**\n\nEach outgoing message's \`.meta\` line renders a status word ("Sent" or "Delivered") plus a checkmark. A single check in gray means delivered; a double check in green (\`.tick-read\`) means read. This is purely a CSS class toggle — in a real app, flip \`.tick\` to \`.tick-read\` when your backend's read-receipt event for that message arrives, typically over a WebSocket.\n\n**Day dividers**\n\nA centered pill (\`.day-divider\`) breaks the thread into date groups, matching the convention in every major chat app. In a real implementation, insert one whenever a message's date differs from the previous message's date, computed by comparing \`toDateString()\` on consecutive timestamps.\n\n**The typing indicator**\n\nThree dots inside a bubble-shaped container animate with a shared \`@keyframes bounce\`, offset by \`animation-delay\` of 0s, 0.15s, and 0.3s so they ripple rather than bounce in unison — the same staggering technique used by loading-dot spinners elsewhere in this library. The row is toggled via the \`hidden\` attribute rather than being added and removed from the DOM, so no layout thrash occurs each time it appears.\n\n**Sending flow**\n\n\`sendMsg()\` prevents the form's default submission, builds a new \`.msg-row\` via \`addMessage()\`, and inserts it with \`insertBefore(row, typingRow)\` — always right before the typing indicator's row rather than at the end of the thread, so the typing bubble (when shown) stays visually last. \`scrollToBottom()\` runs after every insertion by setting \`thread.scrollTop = thread.scrollHeight\`, keeping the newest message in view the way every chat app auto-scrolls.\n\n**Simulated reply for the demo**\n\n\`simulateReply()\` shows the typing indicator after a short delay, waits, then hides it and inserts a reply — standing in for a real WebSocket or polling connection. In production, the typing indicator's visibility should be driven by a "user is typing" event from your backend, not a fixed timeout, and the actual reply should come from your message stream rather than a hardcoded string.\n\n**XSS safety**\n\nMessage text is written using \`.textContent\`, never \`innerHTML\`, on the dynamically created bubble — the only \`innerHTML\` usage builds the surrounding structural markup (avatar, meta), never the user-authored message body, which is the detail that keeps a chat UI safe when real user input flows through it.\n\nSee also the [chat conversation list](/ui-snippets/chat-conversation-list/) for the inbox view this thread would open from, and the [AI chat interface](/ui-snippets/ai-chat-interface/) for a variant built around a single assistant rather than a peer-to-peer conversation.`,
    },
    howToUse: [
      { title: 'Copy the thread and composer markup', text: 'The .thread scroll container holds .msg-row groups (them/me variants) plus a hidden .typing-row, and a .composer form sits below it for input.' },
      { title: 'Wire sendMsg to your backend', text: 'Replace the demo\'s local addMessage call with an API request or WebSocket emit, and only render the message once your backend confirms receipt if you want a "sending" intermediate state.' },
      { title: 'Drive read receipts from real events', text: 'Toggle a message\'s .tick class to .tick-read when your backend\'s read-receipt event for that specific message id arrives, rather than on a timer.' },
      { title: 'Show typing status from the other user', text: 'Toggle typingRow.hidden based on a "user is typing" socket event from the other participant, not a fixed setTimeout as the demo does.' },
      { title: 'Insert day dividers dynamically', text: 'Before rendering a new message, compare its date to the previous message\'s date with toDateString() and insert a .day-divider element when they differ.' },
    ],
    features: [
      'Asymmetric border-radius bubble tails — no SVG or pseudo-element shapes needed',
      'Consecutive messages from the same sender group under one avatar and timestamp',
      'Read-receipt ticks (delivered vs. read) as a simple CSS class toggle',
      'Animated three-dot typing indicator with staggered bounce timing',
      'Day-divider pills separating the thread by date',
      'Auto-scroll to the newest message on every send',
      'Message text inserted via textContent, safe against HTML injection from user input',
      'Zero dependencies — pure HTML, CSS, and JavaScript',
    ],
    useCases: [
      { icon: '💬', title: 'Support and direct message threads', desc: 'Build customer support widgets or direct-message views with grouped bubbles, using asymmetric border radius for the tails instead of SVG shapes.' },
      { icon: '📱', title: 'Mobile chat screens', desc: 'Provide the message view behind a [mobile chat screen](/ui-snippets/mobile-chat-screen/), with delivered and read ticks switched by a simple CSS class.' },
      { icon: '👥', title: 'Team collaboration tools', desc: 'Add in-app messaging beside a [chat conversation list](/ui-snippets/chat-conversation-list/), with consecutive messages grouped under one avatar and timestamp.' },
      { icon: '🤖', title: 'AI assistant interfaces', desc: 'Use as a starting point for one-on-one bots, or extend into an [AI chat interface](/ui-snippets/ai-chat-interface/), including an animated typing indicator with staggered bounces.' },
      { icon: 'CODE', title: 'Related: Encrypt Reveal Card', desc: 'See the [Encrypt Reveal Card](/ui-snippets/evervault-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to a real-time backend?', a: 'Replace the local addMessage() call in sendMsg() with an emit to your WebSocket or a POST to your API, then render the message when the server confirms it (or optimistically, then reconcile). Listen for incoming-message, typing, and read-receipt events to drive the other three dynamic pieces.' },
      { q: 'How do I group messages by day automatically?', a: 'Before inserting each new message, compare new Date(message.timestamp).toDateString() to the previous message\'s date string; if they differ, insert a .day-divider element before the message row.' },
      { q: 'How do I show when the other person is typing?', a: 'Listen for a "typing" event from your backend (commonly debounced on their keystrokes) and toggle typingRow.hidden = false, then hide it again after a short timeout or when their message actually arrives — do not drive it from a fixed local timer in production.' },
      { q: 'Is the message text safe from HTML injection?', a: 'Yes — every message body is set via element.textContent, not innerHTML, so any HTML or script tags a user types are rendered as literal visible text rather than executed markup.' },
      { q: 'How do I use this chat UI in React, Vue, or Angular?', a: 'Open the Export menu on the snippet page for a React component that keeps messages in a useState array and maps over them, a React + Tailwind version, a Vue 3 SFC, or an Angular standalone component — all preserve the grouping, read-receipt, and typing-indicator logic.' },
    ],
    aiPrompt: {
      paragraph: `Paste this chat thread's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how consecutive messages from the same sender get grouped visually, and how the border-radius asymmetry creates the speech-bubble tail effect without any extra shapes. This is also a good snippet to ask an assistant to wire up to a real backend — describe your WebSocket or REST API shape and have it replace the simulateReply timeout with real typing and read-receipt events. Beyond that, ask it to add message reactions (emoji tap-to-react), image/file attachments inside a bubble, or a "jump to latest" floating button that appears once the user has scrolled up away from the bottom of the thread.`,
      prompt: `Build a chat message thread UI in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- A scrollable message thread showing alternating incoming and outgoing message rows, each with a small circular avatar for incoming messages only, and speech-bubble-style message content with the corner nearest the avatar visually sharper than the other three corners to suggest a tail, achieved through border-radius alone with no separate tail shape.
- Consecutive messages from the same sender must visually group together: only the first bubble in a run of same-sender messages should get full rounding on its top corner, and only the last bubble in that group should display a single shared timestamp beneath it.
- Outgoing messages must show a status line with a delivery indicator that can toggle between a "delivered" state (a single gray checkmark) and a "read" state (a double green checkmark) via a CSS class.
- Include a centered pill-shaped day divider element demonstrating how a thread would be split by date.
- Include an animated three-dot typing indicator styled as its own bubble, hidden by default, with each dot bouncing on a shared animation but with staggered delays so they ripple rather than move in unison.
- Include a message composer input and send button at the bottom of the thread. Submitting a message must append it to the thread using safe text insertion (not raw HTML insertion), auto-scroll the thread to the newest message, and after a short delay, simulate the other participant's typing indicator appearing and then being replaced by a reply message, to demonstrate the full interaction loop.`,
    },
  },
};

export default chatMessageBubbles;
