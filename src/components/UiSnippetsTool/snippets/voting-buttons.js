const votingButtons = {
  id: 'voting-buttons',
  title: 'Voting Buttons',
  lastmod: '2026-07-18',
  category: 'buttons',
  html: `<ul class="vb-list" id="vbList"></ul>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;color:#0f172a;display:flex;justify-content:center;padding:28px 18px}

.vb-list{list-style:none;width:100%;max-width:380px;display:flex;flex-direction:column;gap:10px}
.vb-item{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #e2e8f0;border-radius:13px;padding:12px 14px;box-shadow:0 10px 28px -22px rgba(0,0,0,.3)}

.vb-vote{display:flex;flex-direction:column;align-items:center;gap:2px;flex-shrink:0}
.vb-btn{width:30px;height:30px;border:none;border-radius:8px;background:#f1f5f9;color:#94a3b8;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s,transform .12s}
.vb-btn:hover{background:#e2e8f0;color:#475569}
.vb-btn:active{transform:scale(.86)}
.vb-btn svg{width:16px;height:16px}
.vb-btn.up.on{background:#dcfce7;color:#16a34a}
.vb-btn.down.on{background:#fee2e2;color:#dc2626}

.vb-score{font-size:14px;font-weight:800;min-width:30px;text-align:center;font-variant-numeric:tabular-nums;color:#334155;transition:color .15s}
.vb-score.pos{color:#16a34a}
.vb-score.neg{color:#dc2626}
.vb-score.bump{animation:vbBump .28s ease}
@keyframes vbBump{40%{transform:translateY(-3px) scale(1.18)}}

.vb-body{min-width:0}
.vb-title{font-size:13.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vb-meta{font-size:11.5px;color:#94a3b8;margin-top:2px}`,

  js: `var DATA = [
  { id: 1, title: 'Add dark mode to the dashboard', base: 142, author: 'sona' },
  { id: 2, title: 'Keyboard shortcuts for power users', base: 87, author: 'dev_max' },
  { id: 3, title: 'Export reports as CSV', base: 23, author: 'priya' },
  { id: 4, title: 'Slack notifications on deploy', base: -4, author: 'omar' }
];

var list = document.getElementById('vbList');
var votes = {}; // id -> 1 | 0 | -1

var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 14 12 8 18 14"></polyline></svg>';

function scoreFor(item) { return item.base + (votes[item.id] || 0); }

function render() {
  list.innerHTML = '';
  DATA.forEach(function (item) {
    var v = votes[item.id] || 0;
    var score = scoreFor(item);

    var li = document.createElement('li');
    li.className = 'vb-item';

    var vote = document.createElement('div');
    vote.className = 'vb-vote';

    var up = document.createElement('button');
    up.className = 'vb-btn up' + (v === 1 ? ' on' : '');
    up.type = 'button';
    up.setAttribute('aria-label', 'Upvote');
    up.setAttribute('aria-pressed', v === 1 ? 'true' : 'false');
    up.innerHTML = ARROW;

    var sc = document.createElement('div');
    sc.className = 'vb-score' + (score > 0 ? ' pos' : score < 0 ? ' neg' : '');
    sc.textContent = score;

    var down = document.createElement('button');
    down.className = 'vb-btn down' + (v === -1 ? ' on' : '');
    down.type = 'button';
    down.setAttribute('aria-label', 'Downvote');
    down.setAttribute('aria-pressed', v === -1 ? 'true' : 'false');
    down.innerHTML = ARROW;

    up.addEventListener('click', function () { cast(item.id, 1, sc); });
    down.addEventListener('click', function () { cast(item.id, -1, sc); });

    vote.appendChild(up); vote.appendChild(sc); vote.appendChild(down);

    var body = document.createElement('div');
    body.className = 'vb-body';
    var t = document.createElement('div'); t.className = 'vb-title'; t.textContent = item.title;
    var m = document.createElement('div'); m.className = 'vb-meta'; m.textContent = score + ' points \\u00b7 @' + item.author;
    body.appendChild(t); body.appendChild(m);

    li.appendChild(vote); li.appendChild(body);
    list.appendChild(li);
  });
}

// Toggle semantics: clicking the active direction clears the vote.
function cast(id, dir, scoreEl) {
  votes[id] = (votes[id] === dir) ? 0 : dir;
  if (scoreEl) { scoreEl.classList.remove('bump'); void scoreEl.offsetWidth; scoreEl.classList.add('bump'); }
  render();
}

render();`,

  seo: {
    title: 'Voting Buttons — Free Upvote Downvote HTML CSS JS Snippet',
    description: `Reddit-style upvote and downvote buttons with a running score, toggle-to-undo voting, and color states. Copy-paste or export to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Voting Buttons — Upvote / Downvote Score Widget',
      description: `Voting buttons are the up/down arrows beside a post, comment, or feature request that let users rate it and surface the best content — the pattern Reddit, Stack Overflow, and Product Hunt are built on. This snippet implements the full interaction in plain HTML, CSS, and vanilla JavaScript: an upvote and downvote arrow, a live score between them, three-state toggle logic, and color feedback, with no framework or dependency.

**Three-state toggle logic**

Each row tracks one of three states — upvoted (\`+1\`), neutral (\`0\`), or downvoted (\`-1\`) — in a \`votes\` map keyed by item id. The key behaviour is that clicking the *already-active* arrow clears the vote rather than re-applying it: \`votes[id] = (votes[id] === dir) ? 0 : dir\`. That single expression handles every transition (up→neutral, up→down, neutral→down, and back) the way users expect, so there is no separate "remove vote" button.

**Score derived from a base, never mutated**

The displayed number is computed as \`base + vote\`, where \`base\` is the server-side tally and \`vote\` is only the current user's contribution. Keeping the base immutable and deriving the score on every render means the count is always correct after any sequence of clicks — you can't drift out of sync by toggling rapidly, because nothing is incremented in place.

**Color and motion feedback**

The score turns green when positive, red when negative, and neutral at zero, and the active arrow fills with a matching tint via the \`.on\` class. Every change triggers a short \`vbBump\` keyframe — the number lifts and scales briefly — restarted reliably with the \`void el.offsetWidth\` reflow trick so the animation replays even on consecutive clicks. The arrows also scale down on \`:active\` for a tactile press.

**Accessible by default**

Arrows are real \`<button>\` elements with \`aria-label\` and \`aria-pressed\` reflecting the current vote, so screen readers announce "Upvote, pressed" correctly and keyboard users can Tab and activate them with Enter or Space — no extra wiring needed.

**Wiring to real data**

Replace the \`DATA\` array with your posts and send a request in \`cast()\` (the single choke point for every vote) to POST the new direction; optimistic UI already updates instantly, so you only need to reconcile on error. The \`scoreFor()\` helper is pure, making it trivial to also sort the list by score for a "hot" or "top" ranking.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A list of items renders, each with an upvote arrow, score, and downvote arrow.` },
      { title: 'Click upvote', text: `The arrow fills green and the score increases by one with a bump animation.` },
      { title: 'Click the active arrow again', text: `Your vote clears and the score returns to its base value.` },
      { title: 'Switch direction', text: `Clicking downvote after an upvote moves the score by two in one step.` },
      { title: 'Watch the color states', text: `Positive scores turn green, negative turn red, zero stays neutral.` },
      { title: 'Wire to your API', text: `Swap the DATA array and POST the new direction inside cast().` },
    ] },
    features: [
      { title: 'Three-state voting', text: `Up, neutral, and down with click-to-undo on the active arrow.` },
      { title: 'Immutable base score', text: `Score is base + vote, so rapid toggling never drifts.` },
      { title: 'Color feedback', text: `Green for positive, red for negative, neutral at zero.` },
      { title: 'Bump animation', text: `The score lifts and scales on every change via reflow restart.` },
      { title: 'Accessible buttons', text: `Real buttons with aria-pressed and aria-label for screen readers.` },
      { title: 'Single vote choke point', text: `All logic flows through cast() — one place to add API calls.` },
      { title: 'Tactile press', text: `Arrows scale down on :active for a physical feel.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS — no framework, no icon library.` },
    ],
    useCases: [
      { title: 'Feature request boards', text: `Let users vote ideas up the list, paired with a [poll widget](/ui-snippets/poll-widget/).` },
      { title: 'Comment threads', text: `Score replies the way Reddit does inside a [comment thread](/ui-snippets/comment-thread/).` },
      { title: 'Q&A and forums', text: `Surface the best answers Stack Overflow-style above a [rating breakdown](/ui-snippets/rating-breakdown/).` },
      { title: 'Product feedback', text: `Collect signal next to an [NPS survey](/ui-snippets/nps-survey/) or [helpful feedback widget](/ui-snippets/helpful-feedback-widget/).` },
      { title: 'Changelog reactions', text: `Gauge interest on shipped items in a [changelog feed](/ui-snippets/changelog-feed/).` },
      { title: 'Learning the pattern', text: `A clean reference for three-state toggle voting logic.` },
    ],
    faqs: [
      { q: 'How does clicking an arrow twice work?', a: `Voting is three-state. The cast() function uses votes[id] = (votes[id] === dir) ? 0 : dir, so clicking the arrow you already selected sets the vote back to neutral and the score returns to its base. Clicking the opposite arrow switches direction in a single step, moving the displayed score by two.` },
      { q: 'Why is the score computed instead of incremented?', a: `The displayed number is base + vote, where base is the server tally and vote is just this user's -1, 0, or +1. Deriving it on every render means no sequence of rapid clicks can corrupt the count, which is a common bug when you mutate a counter directly on each press.` },
      { q: 'How do I connect this to a backend?', a: `Every vote flows through cast(), so it is the only place you add a request. POST the item id and new direction, update the UI optimistically (it already does), and roll back only if the request fails. Because the base is separate from the user's vote, reconciling the server's true total is straightforward.` },
      { q: 'Is it accessible to keyboard and screen reader users?', a: `Yes. The arrows are native button elements with aria-label and aria-pressed set to the current state, so they are focusable, operable with Enter or Space, and announced as pressed or not pressed. No custom key handling or roles are required.` },
      { q: 'How do I use these voting buttons in React, Vue, or Angular?', a: `Hold the votes map in state (useState in React, a ref or reactive object in Vue, a component property in Angular) and render the score as base + vote. Move the cast() toggle into an event handler that also calls your API. In Tailwind, apply the green and red tints with conditional utility classes based on the vote value instead of the .on class.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the toggle logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why votes[id] = (votes[id] === dir) ? 0 : dir alone is enough to correctly implement all four transitions (neutral-to-up, up-to-neutral, up-to-down, and back), and why scoreFor() recomputes base + vote on every render instead of mutating a running counter in place. It's also worth asking about the void scoreEl.offsetWidth line — have it explain precisely why that forced reflow is necessary to replay the bump animation on rapid consecutive clicks. For extending it, have it add a "hot"/"top" sort toggle that reorders the list by the derived score, disable voting temporarily while a real API request for that item is in flight, or add a subtle floating "+1"/"-1" indicator that appears and fades near the score on each click. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a Reddit-style upvote/downvote list widget in plain HTML, CSS, and vanilla JavaScript with no libraries.

Requirements:
- A list of items, each rendered with an upvote button, a numeric score display, and a downvote button, plus a title and metadata line.
- Track each item's current user vote as exactly one of three states (+1, 0, -1) in a single lookup object keyed by item id — do not store separate booleans for "is upvoted" and "is downvoted".
- Implement voting with a single toggle expression: clicking a direction button sets that item's vote to that direction unless it is already set to that same direction, in which case it clears back to neutral (0). Clicking the opposite direction while one is active must switch directly to the opposite value in one click, without requiring the user to first clear the existing vote.
- Compute the displayed score on every render as an immutable base value (representing everyone else's votes) plus only the current user's own vote value — never mutate a counter directly in place, so rapid or repeated toggling can never drift the displayed number away from the true total.
- Style the score text and the active vote button with distinct color states: a positive color when the score is above the base, a negative color when below, and neutral otherwise; the currently active direction button must be visually filled to match.
- Every score change must replay a short "bump" animation (a brief upward lift and scale) even on consecutive clicks to the same element, which requires forcing a synchronous reflow between removing and re-adding the animation class.
- Both direction buttons must be real button elements with an aria-label describing their action and an aria-pressed attribute reflecting whether that direction is the item's current vote.`,
    },
  },
};

export default votingButtons;
