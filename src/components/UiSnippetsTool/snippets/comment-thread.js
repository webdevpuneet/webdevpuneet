const commentThread = {
  id: 'comment-thread',
  title: 'Comment Thread',
  category: 'cards',
  html: `<div class="wrap">
  <div class="thread-head">
    <h2 class="thread-title">Discussion <span class="count">8 comments</span></h2>
    <select class="sort" onchange="sortThread(this.value)">
      <option value="top">Top</option>
      <option value="new">Newest</option>
    </select>
  </div>
  <div class="composer">
    <div class="avatar me">YO</div>
    <div class="composer-body">
      <textarea class="composer-input" id="rootInput" placeholder="Add to the discussion..." oninput="autoGrow(this)"></textarea>
      <div class="composer-actions"><button class="post-btn" onclick="postRoot()">Comment</button></div>
    </div>
  </div>
  <div class="thread" id="thread">
    <div class="comment" data-votes="42" data-time="3">
      <div class="avatar" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">SM</div>
      <div class="comment-body">
        <div class="comment-head"><span class="author">Sara Mitchell</span><span class="badge">Author</span><span class="time">3h ago</span></div>
        <div class="comment-text">This is exactly the pattern I was looking for. The nested replies make it so much easier to follow sub-conversations without losing the main thread.</div>
        <div class="comment-actions">
          <button class="vote-btn" onclick="vote(this,1)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
          <span class="vote-count">42</span>
          <button class="vote-btn" onclick="vote(this,-1)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg></button>
          <button class="reply-btn" onclick="toggleReply(this)">Reply</button>
        </div>
        <div class="replies">
          <div class="comment" data-votes="12" data-time="2">
            <div class="avatar" style="background:linear-gradient(135deg,#ec4899,#f97316)">DK</div>
            <div class="comment-body">
              <div class="comment-head"><span class="author">Dan Kim</span><span class="time">2h ago</span></div>
              <div class="comment-text">Agreed. The vote sorting keeps the best replies surfaced too.</div>
              <div class="comment-actions">
                <button class="vote-btn" onclick="vote(this,1)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
                <span class="vote-count">12</span>
                <button class="vote-btn" onclick="vote(this,-1)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg></button>
                <button class="reply-btn" onclick="toggleReply(this)">Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment" data-votes="28" data-time="5">
      <div class="avatar" style="background:linear-gradient(135deg,#10b981,#0ea5e9)">RP</div>
      <div class="comment-body">
        <div class="comment-head"><span class="author">Raj Patel</span><span class="time">5h ago</span></div>
        <div class="comment-text">One question — how would you handle really deep nesting? Past 3 or 4 levels it usually gets cramped on mobile.</div>
        <div class="comment-actions">
          <button class="vote-btn" onclick="vote(this,1)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
          <span class="vote-count">28</span>
          <button class="vote-btn" onclick="vote(this,-1)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg></button>
          <button class="reply-btn" onclick="toggleReply(this)">Reply</button>
        </div>
        <div class="replies"></div>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; padding: 32px 20px; }
.wrap { max-width: 620px; margin: 0 auto; }
.thread-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.thread-title { font-size: 17px; font-weight: 800; color: #0f172a; }
.count { font-size: 13px; font-weight: 500; color: #94a3b8; margin-left: 6px; }
.sort { border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 10px; font-size: 13px; color: #475569; background: #fff; cursor: pointer; }
.composer { display: flex; gap: 12px; margin-bottom: 28px; }
.composer-body { flex: 1; }
.composer-input { width: 100%; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; font-size: 14px; font-family: inherit; color: #1e293b; resize: none; outline: none; min-height: 44px; transition: border-color 0.15s; }
.composer-input:focus { border-color: #6366f1; }
.composer-actions { display: flex; justify-content: flex-end; margin-top: 8px; }
.post-btn { background: #6366f1; color: #fff; border: none; padding: 8px 18px; border-radius: 9px; font-size: 13px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.post-btn:hover { background: #4f46e5; }
.avatar { width: 38px; height: 38px; border-radius: 50%; color: #fff; font-size: 13px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.avatar.me { background: #334155; }
.comment { display: flex; gap: 12px; margin-bottom: 20px; }
.comment-body { flex: 1; min-width: 0; }
.comment-head { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap; }
.author { font-size: 13px; font-weight: 700; color: #1e293b; }
.badge { font-size: 10px; font-weight: 700; background: rgba(99,102,241,0.1); color: #6366f1; padding: 1px 7px; border-radius: 10px; }
.time { font-size: 12px; color: #94a3b8; }
.comment-text { font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 8px; }
.comment-actions { display: flex; align-items: center; gap: 4px; }
.vote-btn { background: none; border: none; color: #94a3b8; cursor: pointer; width: 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center; transition: all 0.12s; }
.vote-btn:hover { background: #f1f5f9; color: #6366f1; }
.vote-btn.up-active { color: #6366f1; background: rgba(99,102,241,0.08); }
.vote-btn.down-active { color: #ef4444; background: rgba(239,68,68,0.08); }
.vote-count { font-size: 13px; font-weight: 700; color: #475569; min-width: 24px; text-align: center; font-variant-numeric: tabular-nums; }
.reply-btn { background: none; border: none; color: #64748b; font-size: 12px; font-weight: 700; cursor: pointer; padding: 4px 10px; border-radius: 6px; margin-left: 4px; transition: all 0.12s; }
.reply-btn:hover { background: #f1f5f9; color: #1e293b; }
.replies { margin-top: 16px; padding-left: 20px; border-left: 2px solid #f1f5f9; }
.reply-box { margin-top: 12px; }
.reply-box textarea { width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; font-size: 13px; font-family: inherit; resize: none; outline: none; min-height: 38px; }
.reply-box textarea:focus { border-color: #6366f1; }
.reply-box-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 6px; }
.cancel-btn { background: none; border: none; color: #94a3b8; font-size: 12px; font-weight: 600; cursor: pointer; padding: 6px 12px; }
.send-btn { background: #6366f1; color: #fff; border: none; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; }`,
  js: `function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

function vote(btn, dir) {
  var actions = btn.parentElement;
  var countEl = actions.querySelector('.vote-count');
  var up = actions.querySelector('.vote-btn:first-child');
  var down = actions.querySelector('.vote-btn:nth-child(3)');
  var base = parseInt(countEl.dataset.base || countEl.textContent);
  if (!countEl.dataset.base) countEl.dataset.base = base;
  var state = countEl.dataset.state || '0';
  var newState = (dir === 1) ? (state === '1' ? '0' : '1') : (state === '-1' ? '0' : '-1');
  countEl.dataset.state = newState;
  countEl.textContent = base + parseInt(newState);
  up.classList.toggle('up-active', newState === '1');
  down.classList.toggle('down-active', newState === '-1');
  var comment = btn.closest('.comment');
  comment.dataset.votes = countEl.textContent;
}

function toggleReply(btn) {
  var body = btn.closest('.comment-body');
  var existing = body.querySelector(':scope > .reply-box');
  if (existing) { existing.remove(); return; }
  var box = document.createElement('div');
  box.className = 'reply-box';
  box.innerHTML = '<textarea placeholder="Write a reply..." oninput="autoGrow(this)"></textarea><div class="reply-box-actions"><button class="cancel-btn" onclick="this.closest(\\'.reply-box\\').remove()">Cancel</button><button class="send-btn" onclick="sendReply(this)">Reply</button></div>';
  var actions = body.querySelector(':scope > .comment-actions');
  actions.insertAdjacentElement('afterend', box);
  box.querySelector('textarea').focus();
}

function sendReply(btn) {
  var box = btn.closest('.reply-box');
  var text = box.querySelector('textarea').value.trim();
  if (!text) return;
  var body = box.closest('.comment-body');
  var replies = body.querySelector(':scope > .replies');
  if (!replies) { replies = document.createElement('div'); replies.className = 'replies'; body.appendChild(replies); }
  replies.appendChild(buildComment('You', 'YO', text, true));
  box.remove();
  bumpCount();
}

function postRoot() {
  var input = document.getElementById('rootInput');
  var text = input.value.trim();
  if (!text) return;
  var thread = document.getElementById('thread');
  thread.insertBefore(buildComment('You', 'YO', text, true), thread.firstChild);
  input.value = '';
  input.style.height = 'auto';
  bumpCount();
}

function buildComment(name, initials, text, mine) {
  var c = document.createElement('div');
  c.className = 'comment';
  c.dataset.votes = '0';
  c.dataset.time = '0';
  var bg = mine ? '#334155' : 'linear-gradient(135deg,#6366f1,#8b5cf6)';
  c.innerHTML = '<div class="avatar" style="background:' + bg + '">' + initials + '</div><div class="comment-body"><div class="comment-head"><span class="author">' + name + '</span><span class="time">just now</span></div><div class="comment-text"></div><div class="comment-actions"><button class="vote-btn" onclick="vote(this,1)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button><span class="vote-count">0</span><button class="vote-btn" onclick="vote(this,-1)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg></button><button class="reply-btn" onclick="toggleReply(this)">Reply</button></div><div class="replies"></div></div>';
  c.querySelector('.comment-text').textContent = text;
  return c;
}

function bumpCount() {
  var all = document.querySelectorAll('.comment').length;
  document.querySelector('.count').textContent = all + ' comments';
}

function sortThread(mode) {
  var thread = document.getElementById('thread');
  var comments = Array.from(thread.children);
  comments.sort(function(a, b) {
    if (mode === 'top') return parseInt(b.dataset.votes) - parseInt(a.dataset.votes);
    return parseInt(a.dataset.time) - parseInt(b.dataset.time);
  });
  comments.forEach(function(c) { thread.appendChild(c); });
}`,
  seo: {
    title: 'Comment Thread UI — Free HTML CSS JS Snippet',
    description: 'Nested comment thread with replies, upvote/downvote, sort by top or newest, and auto-growing composer. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Comment Thread — Nested Replies, Voting, Sorting & Auto-Grow Composer',
      description: `A threaded comment system is one of the most complex common UI patterns — it combines recursion, voting state, dynamic insertion, and sorting. It sits below a [social post card](/ui-snippets/social-post-card/) in most feeds. This snippet delivers a complete, working comment thread with nested replies, a Reddit-style up/down voting widget (compare the [emoji reaction bar](/ui-snippets/emoji-reaction-bar/)), top/newest sorting, an author badge, relative timestamps, and an auto-growing comment composer.\n\n**The nesting structure**\n\nEach comment is a .comment element containing an avatar and a .comment-body. The body holds the comment content and a .replies container, which itself holds more .comment elements — making the structure naturally recursive. Replies are visually indented with a left padding and a 2px left border that acts as a thread line, the convention popularised by Reddit and Hacker News. Because the markup is self-similar at every depth, the same JavaScript functions work at any nesting level.\n\n**The voting widget**\n\nThe vote() function implements toggle voting with proper state tracking. It stores the base vote count and a per-comment state of 0, 1, or −1. Clicking upvote toggles between +1 and 0; clicking downvote toggles between −1 and 0; switching from up to down moves directly between states. The displayed count is always base + state, and the active arrow gets a coloured highlight. This matches the exact behaviour users expect from social platforms and prevents the common bug of double-counting repeated clicks.\n\n**Dynamic reply insertion**\n\ntoggleReply() injects an inline reply box directly beneath a comment\'s actions, using the :scope selector to target only the immediate children — critical in a recursive structure where a naive querySelector would match nested descendants. sendReply() builds a new comment node via buildComment() and appends it to that comment\'s own .replies container, so the reply lands at the correct depth.\n\n**Sorting**\n\nsortThread() reorders top-level comments by either vote count (Top) or recency (Newest), reading data-votes and data-time attributes. It sorts an array of the DOM nodes and re-appends them in order — appendChild on an existing node moves it rather than cloning, so reordering is efficient and preserves all event handlers and state.\n\n**The auto-growing composer**\n\nThe composer textarea grows to fit its content via autoGrow() — the same [auto-resize textarea](/ui-snippets/auto-resize-textarea/) technique — which resets the height to auto and then sets it to scrollHeight on every input. This avoids inner scrollbars and gives the comfortable expanding-input feel of modern comment boxes. Posting a root comment prepends it to the thread and updates the comment count.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Write a top-level comment', text: 'Type in the composer at the top. It grows as you type. Click Comment to post — your comment appears at the top of the thread and the count updates.' },
      { title: 'Reply to a comment', text: 'Click Reply under any comment to open an inline reply box at that exact level. Type your reply and click Reply to nest it under the parent.' },
      { title: 'Vote on comments', text: 'Click the up or down arrow to vote. Clicking the same arrow again removes your vote; clicking the opposite arrow switches it. The count and arrow colour update instantly.' },
      { title: 'Sort the discussion', text: 'Use the Top / Newest dropdown to reorder top-level comments by vote count or recency.' },
      { title: 'Wire to a backend', text: 'Replace the in-DOM buildComment with API calls: POST new comments and replies to your server, and render the returned comment objects. Store votes server-side keyed by user and comment.' },
      { title: 'Export for your framework', text: 'Click "JSX" for a React component that renders comments recursively from a nested data array. Click "Vue" for a Vue 3 SFC using a recursive component.' },
    ]},
    features: ['Recursive nesting: self-similar markup works at any reply depth','Thread line: left border + indent on .replies, Reddit/HN convention','Toggle voting with base+state tracking — no double-counting',':scope selectors to target immediate children in the recursive tree','Inline reply boxes injected at the correct depth','Sort by Top (votes) or Newest (time) via data attributes','appendChild node-move reordering preserves handlers and state','Auto-growing composer textarea via scrollHeight'],
    useCases: [
      { icon: 'APP', title: 'Blog and article comment section', desc: 'Drop the thread below articles to enable reader discussion. Wire posting and voting to your backend, render server-stored comments on load, and add pagination or lazy-loading for long threads. The nested structure supports the back-and-forth that flat comment lists cannot.' },
      { icon: 'FLOW', title: 'Community forum and discussion platform', desc: 'Build a Reddit- or Hacker News-style forum where vote sorting surfaces the best replies. Add moderation actions (pin, remove, lock), user flair via the badge slot, and collapse controls for deep threads. The recursive model scales to arbitrary discussion depth.' },
      { icon: 'CODE', title: 'Code review and document annotation tool', desc: 'Adapt threaded comments for inline code review or document feedback, where each thread is anchored to a line or selection. Replies form the review conversation, and resolving a thread collapses it. Voting becomes agreement signalling among reviewers.' },
      { icon: 'CHART', title: 'Product feedback and feature-request board', desc: 'Let users post feature requests as top-level comments and discuss them in replies. Vote sorting prioritises the most-wanted features, giving the product team a ranked backlog driven directly by user demand. Add a status badge (Planned, Shipped) to each top-level item.' },
      { icon: 'LEARN', title: 'Study recursion, :scope selectors, and DOM moves', desc: 'Threaded comments are a masterclass in recursive UI: self-similar markup, scoped DOM queries that avoid matching descendants, toggle-state voting, and efficient reordering via node moves. These patterns underpin file trees, org charts, nested menus, and any hierarchical interface.' },
      { icon: 'DESIGN', title: 'Live event or stream chat with threaded replies', desc: 'Use threaded comments for a live Q&A or stream chat where viewers reply to each other. Vote sorting floats the best questions to the top for the host to answer. Combine with real-time updates (WebSocket) to append incoming comments and replies as they arrive.' },
      { icon: 'CODE', title: 'Related: GLB Spin-to-Reveal Stats Viewer', desc: 'See the [GLB Spin-to-Reveal Stats Viewer](/ui-snippets/glb-spin-reveal-stats-viewer/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the voting toggle prevent double-counting?', a: 'Each vote count stores two pieces of data: a base value (the original score) and a state of 0, 1, or −1 representing the current user\'s vote. The displayed number is always base + state. Clicking upvote sets state to 1, or back to 0 if it was already 1. Clicking downvote sets it to −1, or back to 0. Switching directly from up to down moves from 1 to −1 in one click. Because the display is derived from base + state rather than incremented, repeated clicks can never accumulate a runaway count.' },
      { q: 'Why are :scope selectors needed in a nested thread?', a: 'In a recursive structure, a comment contains a .replies container that holds more comments, each with their own .comment-actions and .replies. A plain querySelector(".replies") from a comment body would match the first nested .replies anywhere in its subtree, not necessarily its own direct child. The :scope pseudo-class (querySelector(":scope > .replies")) restricts the match to immediate children, so reply boxes and new comments are inserted at the correct depth rather than leaking into a descendant.' },
      { q: 'How do I limit nesting depth on mobile?', a: 'Track the depth as you render and stop indenting past a threshold (commonly 3-5 levels), which is how Reddit handles it. Beyond the limit, render deeper replies at the same indentation as their parent and prefix them with "replying to @user" for context. In CSS, you can also cap the cumulative left padding with a max value so the thread line never pushes content off a narrow screen.' },
      { q: 'How do I build this in React?', a: 'Model comments as a nested array where each comment has a replies array. Create a recursive Comment component that renders its content and maps over comment.replies, rendering a Comment for each — the recursion mirrors the DOM nesting. Manage votes and the open reply box in component state or a normalised store keyed by comment id. For posting, update the tree immutably by inserting the new reply into the correct parent\'s replies array.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to reconstruct the vote state machine or the recursive DOM targeting in your head. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why vote() stores a separate base value and a tri-state (0, 1, -1) rather than just incrementing a counter directly, and why toggleReply and sendReply use :scope-qualified queries instead of a plain querySelector. The same assistant can help optimize it — for instance asking whether sortThread's full re-append of every top-level comment node is necessary versus a more targeted DOM reorder for very long threads. It's also useful for extending the thread: ask it to add comment editing and deletion, collapse/expand controls for deeply nested replies on narrow screens, or wire the whole thing to a real backend so votes and new comments persist across reloads. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a nested, threaded comment system in plain HTML, CSS, and JavaScript with voting and sorting — no frameworks, no state library.

Requirements:
- Each comment must be a self-similar DOM structure (avatar, author, timestamp, text, action row, and a replies container that itself can hold more comments of the identical structure) so the same functions work correctly at any nesting depth, with replies visually indented and marked with a left border thread line.
- An upvote/downvote control per comment that tracks a base score plus a separate tri-state value (neutral, upvoted, downvoted) so the displayed count is always base plus state: clicking the active arrow again returns to neutral, and clicking the opposite arrow switches directly between the two active states without ever double-counting or drifting from repeated clicks.
- A "Reply" action that inserts an inline textarea box immediately after that specific comment's own action row — using a scoped child query (not a query that could accidentally match a nested descendant's reply box) — with Cancel and Reply buttons, and submitting appends the new comment into that exact parent's own replies container, not the root thread.
- A composer textarea at the top of the thread that grows its height automatically to fit its content as the user types, instead of scrolling internally, and clears itself after a successful post.
- A sort control that reorders only the top-level comments by either total votes (descending) or recency, by reading data attributes on each comment node and re-inserting the existing DOM nodes in the new order (moving them, not cloning or rebuilding them) so all attached event handlers and any open reply boxes are preserved.
- A live comment counter that updates whenever a new top-level comment or reply is posted.`,
    },
  },
};

export default commentThread;
