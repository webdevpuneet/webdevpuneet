const typingIndicator = {
  id: 'typing-indicator',
  title: 'Typing Indicator',
  lastmod: '2026-06-23',
  category: 'loaders',
  html: `<div class="ty-chat">
  <div class="ty-msg ty-them">Hey! Did the deploy go through?</div>
  <div class="ty-msg ty-me">Checking now…</div>

  <div class="ty-row" id="tyRow">
    <div class="ty-avatar">A</div>
    <div class="ty-bubble" aria-label="Contact is typing">
      <span class="ty-dot"></span><span class="ty-dot"></span><span class="ty-dot"></span>
    </div>
  </div>

  <div class="ty-controls">
    <button type="button" class="ty-btn" id="tyToggle">Stop typing</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.ty-chat{background:#fff;border-radius:18px;padding:20px;width:100%;max-width:360px;box-shadow:0 18px 44px rgba(15,23,42,.1);display:flex;flex-direction:column;gap:10px}
.ty-msg{max-width:78%;padding:10px 14px;font-size:13.5px;line-height:1.45;border-radius:16px}
.ty-them{align-self:flex-start;background:#f1f5f9;color:#0f172a;border-bottom-left-radius:5px}
.ty-me{align-self:flex-end;background:#6366f1;color:#fff;border-bottom-right-radius:5px}

.ty-row{display:flex;align-items:flex-end;gap:8px;align-self:flex-start;transition:opacity .2s}
.ty-row.ty-hidden{opacity:0;pointer-events:none;height:0;overflow:hidden;margin:-5px 0}
.ty-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#10b981);color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ty-bubble{background:#f1f5f9;border-radius:16px;border-bottom-left-radius:5px;padding:13px 14px;display:flex;gap:5px;align-items:center}
.ty-dot{width:7px;height:7px;border-radius:50%;background:#94a3b8;animation:tyBounce 1.3s infinite ease-in-out}
.ty-dot:nth-child(2){animation-delay:.18s}
.ty-dot:nth-child(3){animation-delay:.36s}
@keyframes tyBounce{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-6px);opacity:1}}

.ty-controls{margin-top:6px}
.ty-btn{width:100%;background:#0f172a;color:#fff;border:none;border-radius:10px;padding:9px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.ty-btn:hover{background:#1e293b}`,

  js: `var row = document.getElementById('tyRow');
var toggle = document.getElementById('tyToggle');

// Demo control: show/hide the indicator. In a real app, show it when a
// "typing" event arrives over your socket and hide it on the message or a timeout.
toggle.addEventListener('click', function () {
  var hidden = row.classList.toggle('ty-hidden');
  toggle.textContent = hidden ? 'Show typing' : 'Stop typing';
});

// Example of the real-world pattern: auto-hide after inactivity.
var hideTimer = null;
function showTyping() {
  row.classList.remove('ty-hidden');
  toggle.textContent = 'Stop typing';
  clearTimeout(hideTimer);
  hideTimer = setTimeout(function () {
    row.classList.add('ty-hidden');
    toggle.textContent = 'Show typing';
  }, 4000);
}
// Expose so you can call showTyping() whenever a typing event fires.
window.showTyping = showTyping;`,

  seo: {
    title: 'Typing Indicator — Chat "..." Dots HTML CSS JS',
    description: `An animated chat typing indicator — three staggered bouncing dots, with show/hide and auto-hide-on-idle. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Typing Indicator — Staggered Bouncing Dots in a Chat Bubble',
      description: `The three bouncing dots that mean "someone is typing…" are a tiny, universally understood piece of UI — and getting the animation and the show/hide logic right is what makes a chat feel alive. This snippet builds the classic typing indicator in plain HTML, CSS, and vanilla JavaScript: a bubble with three dots animated on a staggered loop, plus the show, hide, and auto-hide-on-idle behaviour a real chat needs — no library.

**Three dots, one keyframe, staggered**

All three dots share a single \`@keyframes\` that lifts a dot up and brightens it, then settles. The illusion of a travelling wave comes entirely from \`animation-delay\`: the second dot starts 0.18s after the first, the third 0.36s after, so at any moment they're at different points in the same cycle. This delay-stagger technique — one animation, offset start times — is the elegant way to build any sequential dot or bar loader without writing three separate animations. The easing and the dip-to-50%-opacity at rest give it the soft, organic bounce of the real thing.

**A proper chat bubble**

The dots sit in a bubble styled exactly like an incoming message — same background, same asymmetric \`border-radius\` with the squared bottom-left corner that marks it as "from them" — next to the sender's avatar. Matching the indicator to your message bubbles is what makes it read as "this person is about to send a message" rather than a generic spinner; it occupies the same visual slot the real message will.

**Show, hide, and auto-hide-on-idle**

A typing indicator isn't just an animation — it's state. The snippet includes the logic a real chat uses: \`showTyping()\` reveals the bubble and resets a 4-second idle timer that hides it automatically, so a dropped "stopped typing" event never leaves the dots stuck forever. In production you'd call \`showTyping()\` each time a \`typing\` event arrives over your socket, and hide it when the actual message lands — the timer is the safety net. Exposing \`showTyping\` on \`window\` makes it easy to wire to your real-time events.

**Graceful hide transition**

Hiding collapses the row with opacity and height rather than an abrupt \`display: none\`, so the indicator fades out and the conversation closes the gap smoothly — the small polish that keeps the chat from jumping when typing stops. The demo button toggles it so you can see both states immediately.

**Drop-in for any chat**

The markup is just a row you append to your message list, so it drops into any chat UI. Swap the avatar and bubble colours to match your theme, wire \`showTyping()\` to your WebSocket or presence channel, and you have the complete typing-indicator behaviour. It's also a clear reference for the delay-stagger animation pattern used across loaders and sequential effects.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A mini chat renders with two messages and a typing indicator (three bouncing dots).` },
      { title: 'Toggle it', text: `Click the button to hide or show the typing bubble and see the fade transition.` },
      { title: 'Call showTyping() on events', text: `In a real app, call showTyping() each time a "typing" event arrives over your socket.` },
      { title: 'Let it auto-hide', text: `If no further typing event arrives within 4s, the indicator hides itself automatically.` },
      { title: 'Theme the bubble', text: `Match the avatar and bubble colours and radius to your chat's message styling.` },
      { title: 'Drop into your list', text: `Append the row to your message list and remove it when the real message arrives.` },
    ] },
    features: [
      { title: 'Delay-staggered dots', text: `One keyframe plus animation-delay offsets creates the travelling-wave bounce.` },
      { title: 'Soft organic motion', text: `Easing and a dip to 50% opacity at rest give the dots a natural bounce.` },
      { title: 'Message-matched bubble', text: `Styled like an incoming message with the squared bottom-left corner and avatar.` },
      { title: 'Show / hide state', text: `Toggle helpers reveal or collapse the indicator as a real chat would.` },
      { title: 'Auto-hide on idle', text: `A 4s timer hides the dots if no further typing event arrives — a safety net for dropped events.` },
      { title: 'Graceful collapse', text: `Hiding fades opacity and height instead of an abrupt display:none, so the list doesn't jump.` },
      { title: 'Event-ready API', text: `showTyping() is exposed so you can wire it to a WebSocket or presence channel.` },
      { title: 'Drop-in & no library', text: `A single appendable row in plain HTML/CSS/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Chat and messaging apps', text: `Show when the other person is typing — pair with a [chat UI](/ui-snippets/chat-ui/) for the full thread.` },
      { title: 'AI assistant interfaces', text: `Indicate the assistant is composing a reply next to an [AI chat interface](/ui-snippets/ai-chat-interface/).` },
      { title: 'Support and live chat widgets', text: `Reassure users an agent is responding, alongside a [floating chat widget](/ui-snippets/floating-chat-widget/).` },
      { title: 'Comment and reply threads', text: `Show live composing state in a [comment thread](/ui-snippets/comment-thread/).` },
      { title: 'Collaborative editors', text: `Signal that a collaborator is typing a message or note.` },
      { title: 'Learning staggered animation', text: `A reference for delay-staggered loops — compare with a [dots loader](/ui-snippets/dots-loader/).` },
    ],
    faqs: [
      { q: 'How do the dots make a wave with only one animation?', a: `All three dots share the same @keyframes (lift up and brighten, then settle), but each starts at a different time via animation-delay — 0s, 0.18s, 0.36s. Because they're offset within the same cycle, at any instant they're at different phases, producing a travelling wave. This one-animation-plus-staggered-delays technique avoids writing three separate animations and is the standard way to build sequential dot loaders.` },
      { q: 'Why auto-hide the indicator after a few seconds?', a: `Typing indicators are driven by events — "started typing" and "stopped typing" / message-sent. If the stop event is dropped (flaky network, closed tab), the dots can get stuck on forever. A short idle timer that hides the indicator unless refreshed by a new typing event is the safety net every robust chat uses: showTyping() resets the timer each call, so the dots persist only while typing events keep arriving.` },
      { q: 'How do I wire this to a real chat backend?', a: `Call showTyping() whenever a typing event arrives over your WebSocket or presence channel (it reveals the bubble and resets the idle timer), and hide the row when the actual message arrives or the user goes idle. The snippet exposes showTyping() on window for easy wiring; in a framework you'd call a component method instead. The animation and bubble are purely presentational.` },
      { q: 'Why fade and collapse instead of display:none?', a: `display:none removes the element instantly, which makes the message list jump as the gap closes abruptly. Animating opacity and collapsing the height (with overflow hidden and negative margin) lets the indicator fade out smoothly and the conversation close the space gracefully — the small polish that keeps the chat from feeling jumpy when typing stops.` },
      { q: 'How do I use this typing indicator in React, Vue, or Angular?', a: `Render the bubble conditionally on an isTyping state. In React, set isTyping from your socket handler and clear it with a useEffect timeout; in Vue, use a ref with a watcher or timeout; in Angular, a component property with a timer. The dot animation is pure CSS and ports unchanged — only the show/hide state and idle timer move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the timing values by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the three dots produce a travelling-wave effect from a single shared keyframe plus staggered animation-delay values, and why showTyping() clears and resets hideTimer on every call rather than letting multiple timers stack up. It's worth asking about optimization too — with many simultaneous chat threads each running their own idle timer, is a single per-conversation setTimeout the right approach, or would a shared scheduler be cheaper? For extending it, have it add a "seen" receipt that appears once typing stops and a message lands, support multiple people typing at once with stacked avatars, or wire showTyping/hideTyping directly to WebSocket presence events. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a chat "typing indicator" (three bouncing dots) in plain HTML, CSS, and vanilla JavaScript with no libraries.

Requirements:
- A message bubble styled identically to an incoming chat message (same background and border-radius, including a squared corner on the side that marks it as "from them"), containing exactly three small dot elements next to a sender avatar.
- All three dots must share a single CSS keyframe animation that lifts each dot up and brightens it before settling back down; do not write three separate animations. Stagger the three dots purely with different animation-delay values (e.g. 0s, 0.18s, 0.36s) so they appear as a travelling wave from one shared keyframe.
- Provide a showTyping() function that reveals the indicator row and starts (or resets, if already running) a several-second idle timer; if showTyping() is not called again before the timer fires, the indicator must hide itself automatically, so a dropped "stopped typing" event from the server never leaves the dots stuck on screen forever.
- Hiding the indicator (whether by timeout or manually) must animate opacity and the row's height down to zero rather than using display: none abruptly, so the surrounding messages close the gap smoothly instead of jumping.
- Expose the show/hide functions in a way that could be called from a WebSocket "typing" event handler in a real application.`,
    },
  },
};

export default typingIndicator;
