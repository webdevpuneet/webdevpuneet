const emojiReactionBar = {
  id: 'emoji-reaction-bar',
  title: 'Emoji Reaction Bar',
  lastmod: '2026-06-16',
  category: 'buttons',
  html: `<div class="er-card">
  <div class="er-post">
    <div class="er-avatar">N</div>
    <div>
      <div class="er-author">Nadia Okonkwo</div>
      <div class="er-time">2 hours ago</div>
    </div>
  </div>
  <p class="er-text">Just shipped the new dashboard 🚀 Months of work — would love your honest reactions!</p>

  <div class="er-footer">
    <div class="er-summary">
      <div class="er-cluster" id="erCluster"></div>
      <span class="er-total"><span id="erTotal">24</span> reactions</span>
    </div>

    <div class="er-react" id="erReact">
      <div class="er-pop" id="erPop">
        <button class="er-emoji" data-emoji="👍" data-label="Like" onclick="pickReaction(this)">👍</button>
        <button class="er-emoji" data-emoji="❤️" data-label="Love" onclick="pickReaction(this)">❤️</button>
        <button class="er-emoji" data-emoji="😂" data-label="Haha" onclick="pickReaction(this)">😂</button>
        <button class="er-emoji" data-emoji="😮" data-label="Wow" onclick="pickReaction(this)">😮</button>
        <button class="er-emoji" data-emoji="😢" data-label="Sad" onclick="pickReaction(this)">😢</button>
        <button class="er-emoji" data-emoji="😡" data-label="Angry" onclick="pickReaction(this)">😡</button>
      </div>
      <button class="er-trigger" id="erTrigger" onclick="togglePop(event)"><span class="er-temoji">🙂</span>React</button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.er-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:18px;width:100%;max-width:380px;box-shadow:0 14px 44px rgba(15,23,42,.07)}
.er-post{display:flex;align-items:center;gap:11px;margin-bottom:12px}
.er-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-weight:800;font-size:17px;display:flex;align-items:center;justify-content:center}
.er-author{font-size:14px;font-weight:700;color:#1e293b}
.er-time{font-size:11px;color:#94a3b8}
.er-text{font-size:14px;color:#334155;line-height:1.55;margin-bottom:16px}

.er-footer{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #f1f5f9;padding-top:12px}
.er-summary{display:flex;align-items:center;gap:8px}
.er-cluster{display:flex}
.er-bubble{width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(15,23,42,.15);display:flex;align-items:center;justify-content:center;font-size:13px;margin-left:-7px;border:1.5px solid #fff}
.er-bubble:first-child{margin-left:0}
.er-bubble.mine{box-shadow:0 0 0 2px #6366f1;animation:er-bub .3s cubic-bezier(.2,1.6,.4,1)}
@keyframes er-bub{from{transform:scale(0)}to{transform:scale(1)}}
.er-total{font-size:12px;color:#64748b;font-weight:600}

.er-react{position:relative}
.er-trigger{display:flex;align-items:center;gap:6px;background:#f1f5f9;border:none;border-radius:9px;padding:8px 14px;font-size:13px;font-weight:700;color:#475569;cursor:pointer;font-family:inherit;transition:background .15s,color .15s}
.er-trigger:hover{background:#e2e8f0}
.er-trigger.reacted{background:#eef2ff;color:#4f46e5}
.er-temoji{font-size:16px;line-height:1}

.er-pop{position:absolute;bottom:calc(100% + 9px);right:0;display:flex;gap:3px;background:#fff;border:1px solid #e2e8f0;border-radius:999px;padding:6px 8px;box-shadow:0 10px 28px rgba(15,23,42,.18);opacity:0;visibility:hidden;transform:translateY(8px) scale(.9);transform-origin:bottom right;transition:opacity .2s,transform .2s,visibility .2s;z-index:5}
.er-react:hover .er-pop,.er-react.open .er-pop{opacity:1;visibility:visible;transform:translateY(0) scale(1)}
.er-emoji{position:relative;width:38px;height:38px;border:none;background:none;font-size:24px;cursor:pointer;border-radius:50%;transition:transform .15s;line-height:1}
.er-emoji:hover{transform:scale(1.45) translateY(-4px)}
.er-emoji::after{content:attr(data-label);position:absolute;bottom:calc(100% + 4px);left:50%;transform:translateX(-50%);background:#1e293b;color:#fff;font-size:10px;font-weight:700;padding:2px 7px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .15s}
.er-emoji:hover::after{opacity:1}`,

  js: `var REACTIONS = { '👍': 'Like', '❤️': 'Love', '😂': 'Haha', '😮': 'Wow', '😢': 'Sad', '😡': 'Angry' };
var BASE = ['👍', '❤️', '😂'];
var BASE_COUNT = 24;
var myReaction = null;
var react = document.getElementById('erReact');

function togglePop(e) {
  e.stopPropagation();
  react.classList.toggle('open');
}

function closePop() { react.classList.remove('open'); }

function pickReaction(el) {
  var emoji = el.dataset.emoji;
  myReaction = (myReaction === emoji) ? null : emoji;
  updateReact();
  closePop();
}

function updateReact() {
  var trigger = document.getElementById('erTrigger');
  if (myReaction) {
    trigger.innerHTML = '<span class="er-temoji">' + myReaction + '</span>' + REACTIONS[myReaction];
    trigger.classList.add('reacted');
  } else {
    trigger.innerHTML = '<span class="er-temoji">🙂</span>React';
    trigger.classList.remove('reacted');
  }

  document.getElementById('erTotal').textContent = BASE_COUNT + (myReaction ? 1 : 0);

  var list = (myReaction && BASE.indexOf(myReaction) === -1) ? [myReaction].concat(BASE).slice(0, 3) : BASE.slice();
  document.getElementById('erCluster').innerHTML = list.map(function (e) {
    var mine = e === myReaction ? ' mine' : '';
    return '<span class="er-bubble' + mine + '">' + e + '</span>';
  }).join('');
}

document.addEventListener('click', function (e) {
  if (!react.contains(e.target)) closePop();
});

updateReact();`,

  seo: {
    title: 'Emoji Reaction Bar — HTML CSS JS Snippet',
    description: `Facebook-style emoji reaction bar: hover or tap to reveal a reaction popover with tooltips, pick one, and update the count cluster. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Emoji Reaction Bar — Hover-Reveal Popover, Tooltip Reactions & Overlapping Count Cluster`,
      description: `A single "Like" button is binary; a reaction bar lets people respond with nuance — love, laughter, surprise, sadness, anger. Popularised by Facebook, the hover-reveal reaction picker is now a standard pattern in social feeds, comment threads, and chat. This snippet implements it in plain HTML, CSS, and vanilla JavaScript: a trigger that reveals a popover of emoji reactions on hover or tap, scale-and-tooltip animations on each emoji, single-reaction toggle logic, and an overlapping count cluster that reflects your choice.

**Hover-reveal popover that also works on touch**

The reactions live in an \`.er-pop\` popover positioned above the trigger. On devices with a pointer it appears on hover via \`.er-react:hover .er-pop\`, springing up from \`scale(.9)\` with its transform origin at the bottom-right. Hover does not exist on touch screens, so the trigger also has an \`onclick\` calling \`togglePop\`, which toggles an \`.open\` class that reveals the same popover — and a document click listener closes it when tapping elsewhere. \`stopPropagation\` on the trigger keeps that outside-click handler from immediately re-closing it.

**Tactile emoji interactions**

Each reaction is a button that scales to 1.45× and lifts on hover (\`transform: scale(1.45) translateY(-4px)\`), the playful "bounce" that makes the picker feel alive. A CSS-only tooltip — \`content: attr(data-label)\` on the \`::after\` — shows the reaction name ("Love", "Haha") above the emoji on hover, so the meaning is never ambiguous. No tooltip library, no extra markup.

**Single-reaction toggle**

Real reaction systems let you have exactly one reaction at a time, and clicking your current reaction removes it. \`pickReaction\` implements this with one line: \`myReaction = (myReaction === emoji) ? null : emoji\`. \`updateReact\` then rewrites the trigger to show your chosen emoji and its label (or reverts to the neutral "React"), adjusts the total count by one, and rebuilds the summary cluster.

**Overlapping count cluster**

The summary shows the familiar overlapping circle cluster of top reactions with a total count. \`updateReact\` builds it from a base set of reactions; when you react with something not already shown, your emoji is unshifted to the front and highlighted with a ring and a spring \`er-bub\` animation, so you can immediately see your contribution. The overlap is pure CSS — negative \`margin-left\` with white borders to fake the stacked-coins look.

Everything is driven by a single \`myReaction\` variable and the \`updateReact\` function, so wiring it to a backend is a matter of POSTing the reaction and seeding real counts. Pair this with a [favorite button](/ui-snippets/favorite-button/) for simple likes, a [comment thread](/ui-snippets/comment-thread/) for discussions, or a [social post card](/ui-snippets/social-post-card/) feed.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A social post card appears with a reaction summary (24 reactions) and a "🙂 React" button in the footer.` },
      { title: 'Reveal the reactions', text: `Hover the React button (or tap it on touch) — a rounded popover of six emoji springs up above it.` },
      { title: 'Hover an emoji', text: `Each emoji scales up and lifts, and a tooltip shows its name ("Love", "Haha", "Wow") above it.` },
      { title: 'Pick a reaction', text: `Click one — the trigger changes to that emoji and label, the count ticks to 25, and your reaction joins the cluster with a highlighted ring.` },
      { title: 'Change or remove it', text: `Pick a different emoji to switch, or click your current reaction again to remove it — the count and cluster update accordingly.` },
      { title: 'Dismiss the popover', text: `Click anywhere outside to close the picker without changing your reaction.` },
    ] },
    features: [
      { title: 'Hover + tap reveal', text: `The popover shows on hover for pointers and via an \`.open\` class toggled by tap for touch, so it works on every device.` },
      { title: 'Spring-up popover', text: `The picker animates from \`scale(.9)\` with a bottom-right origin, appearing to grow out of the React button.` },
      { title: 'Scale-and-lift emojis', text: `Each reaction grows to 1.45× and lifts on hover, the tactile bounce that makes the picker feel responsive and fun.` },
      { title: 'CSS-only tooltips', text: `\`content: attr(data-label)\` on a pseudo-element labels each emoji on hover — no tooltip library or extra markup.` },
      { title: 'Single-reaction toggle', text: `\`pickReaction\` enforces one reaction at a time and removes it when re-clicked, matching real social platforms.` },
      { title: 'Live count and trigger', text: `\`updateReact\` rewrites the trigger to your emoji and label and adjusts the total by one in a single pass.` },
      { title: 'Overlapping count cluster', text: `Top reactions stack as overlapping circles via negative margins; your new reaction is unshifted and ringed with a spring animation.` },
      { title: 'Outside-click dismissal', text: `A document listener closes the popover on any outside click, with \`stopPropagation\` keeping the trigger from self-closing.` },
    ],
    useCases: [
      { title: 'Social feeds and posts', text: `Let users react to posts with nuance beyond a like. Drop it into a [social post card](/ui-snippets/social-post-card/) or [activity feed](/ui-snippets/activity-feed/).` },
      { title: 'Comment threads', text: `Add reactions to individual comments; pair with a [comment thread](/ui-snippets/comment-thread/) so each reply can be reacted to.` },
      { title: 'Chat and messaging', text: `Tap-and-hold style emoji reactions on chat bubbles — the popover and toggle logic map directly to message reactions.` },
      { title: 'Docs and knowledge bases', text: `"Was this helpful?" with emoji reactions instead of a plain thumbs pair; a richer alternative to a [favorite button](/ui-snippets/favorite-button/).` },
      { title: 'Polls and feedback widgets', text: `Quick sentiment capture on announcements or changelog entries; combine with a [poll widget](/ui-snippets/poll-widget/) for structured votes.` },
      { title: 'Live events and streams', text: `Floating emoji reactions during a broadcast; reuse the picker to choose which reaction to send.` },
      { icon: 'CODE', title: 'Related: Icon Toolbar — Roving Tabindex Keyboard Navigation', desc: 'See the [Icon Toolbar — Roving Tabindex Keyboard Navigation](/ui-snippets/icon-toolbar-roving-tabindex/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I save reactions to a backend?', a: `In \`pickReaction\`, after updating \`myReaction\`, POST the change to your API (the post id and the new reaction, or null to remove). Update optimistically as the snippet does, and reconcile with the server's authoritative counts on response. Seed \`BASE_COUNT\` and the cluster from real data on load so the UI reflects everyone's reactions, not just yours.` },
      { q: 'How do I show real top reactions and counts?', a: `Replace the static \`BASE\` array and \`BASE_COUNT\` with data from your API: sort reaction types by count, take the top three for the cluster, and use the true total. Rebuild the cluster in \`updateReact\` from that data, still unshifting and highlighting the current user's reaction so it stands out.` },
      { q: 'Why support both hover and click to open the picker?', a: `Hover is fast and discoverable on desktop, but touch devices have no hover state — relying on it alone makes the picker unusable on phones. The snippet shows the popover on hover via CSS and also toggles it with a tap via \`togglePop\`, so both input types get a natural way to open it.` },
      { q: 'Is the reaction bar accessible?', a: `Make the emoji buttons keyboard-reachable (they are real \`<button>\`s) and give each an \`aria-label\` matching its \`data-label\`, since an emoji alone is not descriptive. Open the popover on focus as well as hover, support Escape to close, and announce reaction/count changes via an \`aria-live\` region so screen-reader users get feedback.` },
      { q: 'How do I use this reaction bar in React, Vue, or Angular?', a: `In React, hold \`myReaction\` and \`open\` in \`useState\`, derive the trigger label and cluster from \`myReaction\`, and add a click-outside effect. In Vue, use \`ref\`s with \`@click\`/\`@mouseenter\` and a \`computed\` cluster. In Angular, track state on the component and bind \`[class.open]\`/\`[class.reacted]\`. The popover and emoji-hover CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the toggle logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the one-line ternary in pickReaction turns clicking the same emoji twice into a way to remove your reaction, and how updateReact() decides whether to unshift your reaction to the front of the cluster or leave the base list untouched. The same assistant can help you optimize it, for instance checking whether relying on both a CSS hover rule and a JS-toggled open class for the popover could ever get out of sync on devices that support both touch and a mouse. It's also useful for extending the bar: ask it to wire pickReaction to a real backend so reactions persist and reflect other users' counts, add keyboard accessibility so the popover opens on focus and closes on Escape, or support showing a tooltip listing which specific people reacted with each emoji. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a Facebook-style emoji reaction bar in plain HTML, CSS, and JavaScript with no library.

Requirements:
- A "React" trigger button that reveals a row of six emoji reaction buttons in a popover positioned above it, showing the popover both on CSS hover (for pointer devices) and via a JavaScript-toggled open class from a click (for touch devices), so both interaction methods work without conflicting.
- Each emoji button in the popover must visually scale up and lift slightly on hover, and show a small tooltip label naming the reaction (e.g. "Love", "Haha") built purely from a CSS pseudo-element reading a data attribute, with no separate tooltip markup or library.
- Track the current user's reaction as a single value (not a set), and clicking an emoji must toggle it: clicking a different emoji than the current one switches to it, and clicking the same emoji the user already picked removes the reaction entirely, all with one compact conditional rather than separate add/remove code paths.
- Whenever the reaction changes, rewrite the trigger button's label and icon to reflect the current reaction (or revert to a neutral default icon and label when no reaction is set), adjust a total reaction count by exactly one in the corresponding direction, and close the popover.
- Render a small cluster of overlapping circular avatars representing the top reactions using negative margins and white borders (not flexbox gap) to create the stacked-coin visual effect, and when the current user's reaction is not already among the displayed top reactions, insert it at the front of that cluster with a distinct highlighted ring and a brief spring-in scale animation.
- Close the popover automatically on any click outside the whole reaction control, using a single document-level click listener with a containment check, while making sure a click on the trigger button itself does not immediately re-close the popover it just opened.`,
    },
  },
};

export default emojiReactionBar;
