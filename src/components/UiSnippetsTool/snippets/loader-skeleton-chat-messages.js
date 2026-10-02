const loaderSkeletonChatMessages = {
  id: 'loader-skeleton-chat-messages',
  title: 'Skeleton Chat Message Loader',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="sc-thread" id="scThread"></div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b1120;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.sc-thread{width:100%;max-width:400px;background:#111a2e;border:1px solid #223055;border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:14px}

.sc-row{display:flex;align-items:flex-end;gap:8px;max-width:80%}
.sc-row.sc-in{align-self:flex-start}
.sc-row.sc-out{align-self:flex-end;flex-direction:row-reverse}

.sc-avatar{width:26px;height:26px;border-radius:50%;flex-shrink:0;background:linear-gradient(90deg,#1c2846 25%,#2a3a63 37%,#1c2846 63%);background-size:400% 100%;animation:scShimmer 1.6s ease-in-out infinite}

.sc-bubble{height:16px;border-radius:14px;background:linear-gradient(90deg,#1c2846 25%,#2a3a63 37%,#1c2846 63%);background-size:400% 100%;animation:scShimmer 1.6s ease-in-out infinite}
.sc-in .sc-bubble{border-bottom-left-radius:4px;background-color:#16213b}
.sc-out .sc-bubble{border-bottom-right-radius:4px;background-color:#26314f}

@keyframes scShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`,

  js: `var thread = document.getElementById('scThread');

// Each entry: side (in = received, has avatar / out = sent, no avatar) and a
// bubble width — alternating sides and varied widths is what makes this read
// as chat bubbles rather than a generic skeleton block.
var MESSAGES = [
  { side: 'in', width: 62 },
  { side: 'in', width: 38 },
  { side: 'out', width: 45 },
  { side: 'in', width: 70 },
  { side: 'out', width: 58 },
  { side: 'out', width: 30 },
];

MESSAGES.forEach(function (m, i) {
  var row = document.createElement('div');
  row.className = 'sc-row sc-' + m.side;

  if (m.side === 'in') {
    var avatar = document.createElement('div');
    avatar.className = 'sc-avatar';
    avatar.style.animationDelay = (i * 80) + 'ms';
    row.appendChild(avatar);
  }

  var bubble = document.createElement('div');
  bubble.className = 'sc-bubble';
  bubble.style.width = m.width + '%';
  bubble.style.animationDelay = (i * 80) + 'ms';
  row.appendChild(bubble);

  thread.appendChild(row);
});`,

  seo: {
    title: 'Skeleton Chat Message Loader — Alternating Bubble Placeholders in HTML CSS JS',
    description: `Chat-bubble-shaped skeleton placeholders that alternate left/right with varied widths and avatar circles for received messages — a messaging UI's loading state. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Skeleton Chat Message Loader — Alternating Bubbles for a Messaging UI',
      description: `A generic [skeleton list](/ui-snippets/skeleton-loader/) of equal-width bars doesn't read as "a conversation is loading" — it reads as "a list is loading." This snippet is shaped specifically for chat: skeleton placeholders styled as message bubbles, alternating between left-aligned "received" messages (with a small avatar circle) and right-aligned "sent" messages (no avatar), each bubble a different width, so the loading state already looks like a conversation before any real content arrives.

**Alternating sides via a data array**

Rather than hard-coding rows, a small \`MESSAGES\` array holds \`{ side, width }\` pairs — \`side\` is \`'in'\` (received, avatar shown, bubble left-aligned with \`align-self: flex-start\`) or \`'out'\` (sent, no avatar, bubble right-aligned via \`flex-direction: row-reverse\` and \`align-self: flex-end\`). Looping over this array and toggling classes/flex direction per row is what produces the genuine left/right alternation — a structural difference from a skeleton list where every row has identical alignment.

**Varied bubble widths read as varied message lengths**

Each entry's \`width\` (a percentage, 30–70% in the demo) sets that bubble's actual CSS width, so the skeleton bubbles are different sizes the way real chat messages are — a one-word reply next to a longer sentence. A uniform-width skeleton row, by contrast, reads as a table or list rather than conversational text of varying length, which is a big part of what makes this pattern feel chat-specific rather than generic.

**Bubble-shaped corners, not bars**

Each placeholder uses a large \`border-radius\` like a real chat bubble, with one corner flattened (\`border-bottom-left-radius\` on received, \`border-bottom-right-radius\` on sent) to mimic the little "tail" corner convention most chat UIs use — a detail that immediately reads as "message bubble" rather than "generic skeleton bar," even before the shimmer animation runs.

**Avatar only on the received side**

Only \`'in'\` rows get a circular avatar placeholder next to the bubble, matching how most chat UIs show the other person's avatar next to their messages but omit your own avatar next to messages you sent — another small alternation that reinforces the specific chat-UI mental model rather than a generic alternating list. Pair it with a [chat UI](/ui-snippets/chat-ui/) shell or [chat message bubbles](/ui-snippets/chat-message-bubbles/) for the resolved content, or a [typing indicator](/ui-snippets/typing-indicator/) for the moment just before a reply streams in.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `6 alternating chat-bubble skeletons render inside a thread container.` },
      { title: 'Observe the alternation', text: `Received messages sit left with an avatar; sent messages sit right without one.` },
      { title: 'Observe the widths', text: `Each bubble is a different width, mimicking varied message lengths.` },
      { title: 'Edit the MESSAGES array', text: `Add, remove, or reorder { side, width } entries to change the thread shape.` },
      { title: 'Replace with real messages', text: `Once data loads, swap each skeleton row for the actual message bubble.` },
      { title: 'Restyle the bubbles', text: `Change the bubble colors, corner radius, or avatar size to match your chat UI.` },
    ] },
    features: [
      { title: 'Alternating left/right sides', text: `Received and sent skeleton bubbles alternate, mirroring a real thread.` },
      { title: 'Varied bubble widths', text: `Each placeholder has its own width, reading as varied message lengths.` },
      { title: 'Avatar on received only', text: `A circular placeholder appears next to left-aligned messages, matching common chat UI conventions.` },
      { title: 'Bubble-shaped corners', text: `Large border-radius with one flattened corner mimics a real chat bubble tail.` },
      { title: 'Data-driven layout', text: `A single MESSAGES array of { side, width } drives the entire thread.` },
      { title: 'Staggered shimmer', text: `Per-row animation-delay gives the thread a gentle top-to-bottom ripple.` },
      { title: 'Dark, chat-ready container', text: `Drops into any messaging UI's message list area.` },
      { title: 'Zero dependencies', text: `Pure CSS keyframes plus a small JS loop — no library.` },
    ],
    useCases: [
      { title: 'Messaging app thread loading', text: 'Show the shape of a conversation while it loads, using bubble-shaped placeholders that alternate sides inside a [chat UI](/ui-snippets/chat-ui/).' },
      { title: 'Support chat widgets', text: 'Show a loading thread before an agent history arrives, with avatar circles only beside received messages as in a real conversation.' },
      { title: 'Direct message previews', text: 'Give an inbox pane a convincing loading state, with varied bubble widths reading as messages of different lengths.' },
      { title: 'AI chat response lead-ins', text: 'Precede an answer in an [AI chat interface](/ui-snippets/ai-chat-interface/) with this shape, so the layout does not jump when real messages arrive.' },
      { title: 'Data-driven skeleton layout', text: 'Study how rows are created from a plain width list, with one flattened corner on each bubble mimicking a real chat tail.' },
      { icon: 'CODE', title: 'Related: Page Transition Progress Bar', desc: 'See the [Page Transition Progress Bar](/ui-snippets/loader-page-transition-bar/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the alternation between left and right actually work?', a: `A MESSAGES array holds a side value ('in' or 'out') per row. The row's CSS class and alignment are set from that value: 'in' rows get align-self: flex-start and a leading avatar; 'out' rows get align-self: flex-end and flex-direction: row-reverse with no avatar. Because this comes from real per-row data rather than a fixed CSS pattern like nth-child(even), you can reorder or extend the array freely and the alignment always matches.` },
      { q: 'Why do only some rows have an avatar?', a: `Only rows where side is 'in' (received messages) render an avatar element, matching the common chat-UI convention of showing the other person's avatar next to their messages while omitting your own avatar next to messages you sent. This is a conditional render based on the data, not a CSS visibility trick.` },
      { q: 'Why are the bubble widths different instead of uniform?', a: `Each entry in MESSAGES carries its own width percentage, applied directly as that bubble's CSS width. Real chat messages vary enormously in length, so uniform-width skeleton bars would look like a generic list rather than a conversation. Randomizing or hand-picking varied widths per row is what sells the "chat message" read before any real text loads.` },
      { q: 'How do I make the skeleton match my real message list length?', a: `Generate the MESSAGES array from your actual expected message count (or a reasonable guess, like 5-8 rows) rather than hard-coding 6 entries, and randomize width and side if you don't know the real shape yet — Math.random() < 0.5 ? 'in' : 'out' and a random width in a sensible range (30-75%) works well as a stand-in.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Map over your MESSAGES-equivalent array (or a generated placeholder array) in the framework's templating syntax, conditionally rendering the avatar for 'in' rows and binding the width as an inline style or CSS variable on the bubble. The shimmer keyframe and bubble-shape CSS are framework-agnostic and need no changes.` },
    ],
    aiPrompt: {
      paragraph: `Rather than reverse-engineering the alternation logic by eye, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the side value in each MESSAGES entry drives both the flex alignment (flex-start vs flex-end with a reversed flex-direction) and the conditional avatar rendering, and why varying each bubble's width per entry is what makes the skeleton read as a conversation rather than a generic list. The same assistant can help optimize it — for example asking whether the MESSAGES array should be randomly generated to match an unknown real message count, or kept as fixed realistic-looking data for a stable-looking loading state. It's also useful for extending the pattern: ask it to add a typing-indicator row at the end of the received side, vary the avatar between a few placeholder colors, or crossfade each skeleton bubble into its real message once content loads instead of an abrupt swap. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a chat-message-shaped skeleton loading state in plain HTML, CSS, and JavaScript — no library.

Requirements:
- Generate a configurable list of skeleton message rows dynamically in JavaScript from a small data array where each entry specifies which side the message belongs to (received vs sent) and a width percentage for that bubble — do not hard-code the rows as static HTML.
- Received-side rows must align to the left of the thread container and include a small circular avatar placeholder next to the bubble. Sent-side rows must align to the right of the container and must NOT include an avatar, matching a typical chat UI's convention of only showing the other person's avatar.
- Each bubble's width must come from its own entry in the data array so widths vary noticeably between rows, rather than every bubble sharing one fixed width — this is what makes the skeleton read as varied-length chat messages rather than a generic uniform list.
- Style each bubble with rounded corners typical of a chat bubble, with one corner (the one nearest the "tail" side, differing between received and sent) flattened slightly to mimic the common chat-bubble tail-corner convention.
- Apply a shimmering gradient animation (an oversized background-position keyframe loop) to every bubble and avatar placeholder, with a small per-row stagger so the shimmer ripples gently down the thread rather than every element pulsing in perfect unison.
- Ensure the whole thing is driven from one central array so adding, removing, or reordering messages (and toggling which side they're on) automatically produces a correctly alternating, correctly avatar'd layout with no other code changes.`,
    },
  },
};

export default loaderSkeletonChatMessages;
