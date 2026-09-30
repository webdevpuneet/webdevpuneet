const bootstrapChatWidgetBubble = {
  id: 'bootstrap-chat-widget-bubble',
  title: 'Bootstrap Floating Chat Widget',
  lastmod: '2026-09-10',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="bscw-wrap">
  <div class="card bscw-window d-none" id="bscwWindow">
    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center py-2">
      <span class="fw-bold small">Support Chat</span>
      <button type="button" class="btn-close btn-close-white" aria-label="Close" id="bscwClose"></button>
    </div>
    <div class="card-body bscw-body" id="bscwBody">
      <div class="bscw-msg bscw-bot">Hi there! How can we help you today?</div>
    </div>
    <div class="card-footer p-2">
      <form class="d-flex gap-2" id="bscwForm">
        <input type="text" class="form-control form-control-sm" id="bscwInput" placeholder="Type a message..." autocomplete="off">
        <button type="submit" class="btn btn-primary btn-sm">Send</button>
      </form>
    </div>
  </div>

  <button type="button" class="btn btn-primary rounded-circle bscw-launcher" id="bscwLauncher" aria-label="Open chat">
    &#128172;
  </button>
</div>`,
  css: `.bscw-wrap { position: fixed; right: 20px; bottom: 20px; z-index: 1080; }
.bscw-launcher { width: 56px; height: 56px; font-size: 1.4rem; box-shadow: 0 4px 12px rgba(0,0,0,.25); }
.bscw-window { width: 320px; max-width: calc(100vw - 40px); position: absolute; bottom: 72px; right: 0; border: 1px solid #eceef1; box-shadow: 0 8px 24px rgba(0,0,0,.2); }
.bscw-body { height: 300px; overflow-y: auto; }
.bscw-msg { max-width: 80%; padding: 6px 10px; border-radius: 12px; margin-bottom: 8px; font-size: .9rem; }
.bscw-bot { background: #f1f3f5; }
.bscw-user { background: #0d6efd; color: #fff; margin-left: auto; }`,
  js: `const launcher = document.getElementById('bscwLauncher');
const windowEl = document.getElementById('bscwWindow');
const closeBtn = document.getElementById('bscwClose');
const form = document.getElementById('bscwForm');
const input = document.getElementById('bscwInput');
const body = document.getElementById('bscwBody');

const botReplies = [
  "Thanks for your message! A team member will follow up shortly.",
  "Got it — could you share a bit more detail?",
  "That's a great question. Let me check on that for you.",
  "I've noted that down. Is there anything else you need help with?",
];
let replyIndex = 0;

function scrollToBottom() {
  body.scrollTop = body.scrollHeight;
}

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = 'bscw-msg ' + (sender === 'user' ? 'bscw-user' : 'bscw-bot');
  msg.textContent = text;
  body.appendChild(msg);
  scrollToBottom();
}

launcher.addEventListener('click', () => {
  windowEl.classList.toggle('d-none');
  if (!windowEl.classList.contains('d-none')) {
    input.focus();
    scrollToBottom();
  }
});

closeBtn.addEventListener('click', () => {
  windowEl.classList.add('d-none');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  // Simulated network/thinking delay before the bot reply appears, so the
  // conversation doesn't feel instantaneous and unrealistic.
  setTimeout(() => {
    const reply = botReplies[replyIndex % botReplies.length];
    replyIndex += 1;
    addMessage(reply, 'bot');
  }, 900);
});`,

  seo: {
    title: 'Bootstrap Floating Chat Widget — Free JS Snippet',
    description: `A real Bootstrap 5.3 fixed-position chat launcher with a toggleable card window, simulated bot replies via setTimeout, and auto-scroll. Exports to React & Vue.`,
    about: {
      title: 'Bootstrap Floating Chat Widget — HTML, CSS & JavaScript',
      description: `A floating chat widget lives outside the normal document flow by design — the whole \`.bscw-wrap\` container is pinned with \`position: fixed; right: 20px; bottom: 20px\` and a \`z-index: 1080\`, deliberately set above Bootstrap's own default modal z-index tier so the widget stays clickable even on pages using Bootstrap modals or offcanvas panels elsewhere. The circular launcher button is a real Bootstrap \`btn btn-primary rounded-circle\`, and the chat window itself is a genuine Bootstrap \`card\` absolutely positioned at \`bottom: 72px; right: 0\` relative to that fixed wrapper, so it always opens directly above the launcher regardless of scroll position, with \`max-width: calc(100vw - 40px)\` keeping it from overflowing the viewport on narrow phone screens.\n\nOpening and closing is a single \`classList.toggle('d-none')\` call on \`#bscwWindow\` from the launcher's click handler, paired with a dedicated Bootstrap \`btn-close btn-close-white\` in the card header that only ever closes (never toggles) the window — two different controls with two clearly distinct behaviors instead of one ambiguous toggle button doing double duty. When the window opens, the input is explicitly focused and \`scrollToBottom()\` runs, so returning to an open conversation always lands the user at the most recent message and ready to type immediately.\n\nSending a message follows a deliberately realistic two-step flow: \`addMessage(text, 'user')\` appends a right-aligned blue \`.bscw-user\` bubble immediately using \`textContent\` (never \`innerHTML\`, so a typed message containing angle brackets can't be interpreted as markup), then a \`setTimeout\` of 900ms delays the bot's response before \`addMessage(reply, 'bot')\` appends a left-aligned gray \`.bscw-bot\` bubble. That artificial delay is intentional — an instant reply reads as obviously fake, while a short pause mimics the network or "typing" latency of a real chat backend. The bot cycles through a fixed \`botReplies\` array using \`replyIndex % botReplies.length\`, so it never runs out of responses no matter how many messages are sent, looping back to the first reply after the fourth.\n\nThe non-obvious detail this snippet gets right is auto-scroll: every call to \`addMessage()\` — for both user and bot messages — ends by setting \`body.scrollTop = body.scrollHeight\`, which is the standard way to pin a scrollable container to its bottom edge after content is appended. Without this, the message list would silently overflow its fixed \`height: 300px\` and new messages would append below the visible area, invisible until the user manually scrolled down — a bug that's easy to miss when testing with only one or two messages but becomes obvious the moment a conversation grows.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Only a circular blue launcher button with a speech-bubble icon is visible in the bottom-right corner; the chat window is hidden.' },
        { title: 'Click the launcher', text: 'A chat window slides into view above the launcher, showing a header, one greeting message from the bot, and a message input focused and ready to type.' },
        { title: 'Type a message and press Send', text: 'Your message appears immediately as a blue bubble on the right side of the message list, and the list scrolls to show it.' },
        { title: 'Wait about a second', text: 'A gray bot reply bubble appears on the left side automatically, and the message list auto-scrolls to keep it visible.' },
        { title: 'Click the × in the header', text: 'The chat window closes completely; clicking the launcher again reopens it with the full conversation history still intact.' },
      ],
    },
    features: [
      'Fixed-position launcher and window pinned to the bottom-right corner at all scroll positions',
      'Real Bootstrap card, card-header, and card-footer structure for the chat window',
      'Distinct open/close controls: launcher toggles, header × button always closes',
      'Simulated bot replies delayed via setTimeout for a realistic conversational feel',
      'Cycling reply array so the bot never runs out of responses',
      'Auto-scroll to the latest message after every user or bot message',
      'Messages inserted with textContent to prevent HTML/script injection from typed input',
      'Responsive max-width so the window never overflows a narrow mobile viewport',
    ],
    useCases: [
      { icon: 'CHAT', title: 'Customer support widgets', desc: `A live-chat-style support launcher for a marketing or SaaS site, often placed alongside a [cookie consent banner](/ui-snippets/bootstrap-cookie-consent-offcanvas/) in the page's fixed UI layer.` },
      { icon: 'APP', title: 'AI chatbot demo interfaces', desc: 'A ready-made front end for prototyping a chatbot before wiring the setTimeout-based reply logic to a real language model API call.' },
      { icon: 'LEARN', title: 'Learning fixed-position UI and auto-scroll', desc: 'A clear example of stacking a fixed launcher and an absolutely positioned panel together, plus the scrollTop/scrollHeight auto-scroll pattern used in any chat or log UI.' },
      { icon: 'FORM', title: 'Lead-capture and pre-sales chat', desc: `Combine with a [notification center dropdown](/ui-snippets/bootstrap-notification-center-dropdown/) so returning visitors see both new messages and site notifications from one corner of the UI.` },
      { icon: 'FLOW', title: 'In-app help and onboarding assistants', desc: `Provide contextual help inside a dashboard or app shell, similar in placement to a [filter sidebar offcanvas](/ui-snippets/bootstrap-filter-sidebar-offcanvas/) that stays available without leaving the page.` },
    ],
    faqs: [
      { q: 'Are the bot replies from a real AI model?', a: 'No — this is a front-end demo cycling through a fixed array of canned replies with a setTimeout delay to simulate a real conversation. Replace the setTimeout callback with a real fetch call to your chat or AI backend for production use.' },
      { q: 'Why is there a separate close button instead of just clicking the launcher again?', a: 'Both work — the launcher toggles the window open and closed, and the header × button is provided as a more discoverable, conventional close control right where users expect it, matching common chat widget UX patterns.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — track an isOpen boolean and a messages array in component state (React useState, Vue ref, Angular class fields), render messages with .map()/*ngFor*, and replace the direct scrollTop DOM write with a ref-based effect that runs after each new message renders.' },
      { q: 'Does the message list scroll correctly with many messages?', a: 'Yes — every appended message triggers body.scrollTop = body.scrollHeight, which pins the scrollable message container to its bottom edge, so the newest message (user or bot) is always visible without manual scrolling.' },
      { q: 'Is user input sanitized before being displayed?', a: 'Yes — addMessage() uses element.textContent to insert both user and bot text, which always renders as plain text rather than being parsed as HTML, preventing a typed message from injecting markup or scripts into the page.' },
      { q: 'What z-index does the widget use and why does it matter?', a: 'The wrapper uses z-index: 1080, intentionally higher than Bootstrap 5.3\'s default modal (1055) and offcanvas (1045) layers, so the chat launcher and window remain visible and clickable above other Bootstrap components rather than being hidden behind them.' },
      { q: 'Can this be restyled in Tailwind CSS instead of Bootstrap?', a: 'Yes — replace the card, btn, and rounded-circle classes with Tailwind utilities for the fixed launcher and panel, and keep addMessage(), the setTimeout reply logic, and the scrollTop auto-scroll exactly as written, since none of that JavaScript reads Bootstrap-specific classes.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to add a typing indicator (three animated dots) shown during the setTimeout delay before the bot reply appears, or to add an unread-message badge on the launcher when the window is closed. It's also worth asking it to persist chat history to localStorage across reloads.`,
      prompt: `Build a Bootstrap 5.3 floating chat widget using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A fixed-position circular launcher button in the bottom-right corner of the viewport, and a real Bootstrap card styled as a chat window (header with a close button, scrollable message body, footer with a text input and send button) that toggles visibility when the launcher is clicked.
- Sending a message via the form must immediately append a right-aligned "user" message bubble, then after a short setTimeout delay append a left-aligned simulated "bot" reply bubble cycling through a small fixed array of canned responses.
- The message list must automatically scroll to the bottom every time a new message (user or bot) is appended, using scrollTop and scrollHeight.
- All message text must be inserted using textContent, not innerHTML, so typed input cannot inject HTML or scripts.
- The window must have a sensible max-width so it does not overflow the viewport on a narrow mobile screen.`,
    },
  },
};

export default bootstrapChatWidgetBubble;
