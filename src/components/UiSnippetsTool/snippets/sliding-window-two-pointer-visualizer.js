const slidingWindowTwoPointerVisualizer = {
  id: 'sliding-window-two-pointer-visualizer',
  title: 'Sliding Window Two-Pointer Visualizer (Longest Substring Without Repeats)',
  lastmod: '2026-09-25',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="sw">
  <div class="sw-top">
    <div>
      <h2>Sliding window: longest substring without repeating characters</h2>
      <p>The right pointer only moves forward; the left pointer only moves forward. Every character enters and leaves the window at most once.</p>
    </div>
    <form class="sw-form" id="swForm">
      <input id="swInput" value="pwwkewabcdcba" maxlength="24" aria-label="String" autocomplete="off">
      <button type="submit">Load</button>
    </form>
  </div>
  <div class="sw-strip" id="swStrip" aria-hidden="true"></div>
  <div class="sw-ctrl">
    <button type="button" id="swStep">Step</button>
    <button type="button" id="swRun">Run</button>
    <span class="sw-count" id="swCount"></span>
  </div>
  <div class="sw-panels">
    <div class="sw-panel"><h3>Last seen at</h3><div class="sw-map" id="swMap"></div></div>
    <div class="sw-panel"><h3>What happened</h3><p id="swLog" aria-live="polite"></p></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#fff7ed;color:#431407;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.sw{width:100%;max-width:960px}
.sw-top{display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap}
.sw h2{font-size:18px}
.sw-top p{font-size:12.5px;color:#9a3412;margin-top:4px;max-width:540px}
.sw-form{display:flex;gap:6px}
.sw-form input{width:200px;border:1px solid #fdba74;border-radius:9px;padding:8px 10px;font:600 14px ui-monospace,monospace}
.sw button{border:0;border-radius:9px;padding:8px 14px;font:700 12px system-ui;background:#ea580c;color:#fff;cursor:pointer}
.sw button:disabled{opacity:.4}
.sw :focus-visible{outline:2px solid #f97316;outline-offset:2px}
.sw-strip{position:relative;display:flex;gap:6px;margin:26px 0 30px;flex-wrap:wrap;padding-top:18px}
.sw-cell{position:relative;width:40px;height:48px;display:grid;place-items:center;background:#fff;border:2px solid #fed7aa;border-radius:10px;font:800 18px ui-monospace,monospace;transition:background .2s,border-color .2s,transform .2s}
.sw-cell small{position:absolute;bottom:-17px;font:600 10px system-ui;color:#c2410c}
.sw-cell.in{background:#ffedd5;border-color:#fb923c}
.sw-cell.best{box-shadow:inset 0 -5px 0 #16a34a}
.sw-cell.dup{background:#fee2e2;border-color:#ef4444;transform:translateY(-4px)}
.sw-cell .ptr{position:absolute;top:-20px;font:800 10px system-ui;padding:1px 5px;border-radius:5px;color:#fff}
.ptr.l{background:#2563eb;left:0}.ptr.r{background:#ea580c;right:0}
.sw-ctrl{display:flex;gap:8px;align-items:center}
.sw-count{font-size:13px;color:#9a3412;margin-left:6px}
.sw-panels{display:grid;grid-template-columns:1fr 1.4fr;gap:12px;margin-top:14px}
@media (max-width:700px){.sw-panels{grid-template-columns:1fr}}
.sw-panel{background:#fff;border:1px solid #fed7aa;border-radius:12px;padding:12px}
.sw-panel h3{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#c2410c;margin-bottom:8px}
.sw-map{display:flex;flex-wrap:wrap;gap:6px}
.sw-map span{font:700 12px ui-monospace,monospace;background:#fff7ed;border:1px solid #fed7aa;border-radius:6px;padding:3px 7px}
.sw-map span.hot{background:#fee2e2;border-color:#ef4444}
#swLog{font-size:13px;line-height:1.6}`,

  js: `var s, left, right, last, best, bestL, dupAt, finished, ops, timer = null;
var strip = document.getElementById('swStrip');

function load() {
  s = document.getElementById('swInput').value.slice(0, 24) || 'abc';
  left = 0; right = -1; last = {}; best = 0; bestL = 0; dupAt = -1; finished = false; ops = 0;
  document.getElementById('swLog').textContent = 'Window is empty. Each step moves the right pointer one character forward.';
  stop();
  draw();
}

// One step: extend the window by one character on the right. If that
// character is already inside the window, jump the left pointer to just
// past its previous position (never backwards).
function step() {
  if (finished) return;
  right++;
  if (right >= s.length) { right = s.length - 1; return finish(); }
  var c = s[right];
  ops++;
  var msg;
  dupAt = -1;
  if (last[c] !== undefined && last[c] >= left) {
    dupAt = last[c];
    var oldLeft = left;
    left = last[c] + 1;
    msg = '"' + c + '" is already in the window at index ' + dupAt + '. Move left from ' + oldLeft + ' to ' + left + ', dropping everything up to that copy.';
  } else {
    msg = '"' + c + '" is new to the window, so it simply grows.';
  }
  last[c] = right;
  var len = right - left + 1;
  if (len > best) { best = len; bestL = left; msg += ' New best: <b>' + s.substr(left, len) + '</b> (length ' + len + ').'; }
  document.getElementById('swLog').innerHTML = msg.replace(/</g, '&lt;').replace(/&lt;(\\/?)b>/g, '<$1b>');
  if (right === s.length - 1) return finish();
  draw();
}

function finish() {
  finished = true;
  stop();
  dupAt = -1;
  document.getElementById('swLog').innerHTML = 'Done after ' + ops + ' steps for ' + s.length + ' characters — O(n). Longest substring without repeats: <b>' +
    s.substr(bestL, best).replace(/</g, '&lt;') + '</b> (length ' + best + ').';
  draw();
}

function draw() {
  strip.innerHTML = s.split('').map(function (c, i) {
    var cls = 'sw-cell';
    if (right >= 0 && i >= left && i <= right) cls += ' in';
    if (i >= bestL && i < bestL + best) cls += ' best';
    if (i === dupAt) cls += ' dup';
    var ptr = '';
    if (right >= 0 && i === left) ptr += '<span class="ptr l">L</span>';
    if (right >= 0 && i === right) ptr += '<span class="ptr r">R</span>';
    return '<div class="' + cls + '">' + ptr + c.replace(/</g, '&lt;') + '<small>' + i + '</small></div>';
  }).join('');
  document.getElementById('swMap').innerHTML = Object.keys(last).map(function (c) {
    return '<span class="' + (last[c] === dupAt ? 'hot' : '') + '">' + c.replace(/</g, '&lt;') + ' → ' + last[c] + '</span>';
  }).join('') || '<span>empty</span>';
  var len = right >= left ? right - left + 1 : 0;
  document.getElementById('swCount').textContent = 'window ' + len + ' · best ' + best + ' · steps ' + ops + '/' + s.length;
  document.getElementById('swStep').disabled = finished;
  document.getElementById('swRun').disabled = finished;
}

function stop() { clearInterval(timer); timer = null; document.getElementById('swRun').textContent = 'Run'; }
document.getElementById('swForm').addEventListener('submit', function (e) { e.preventDefault(); load(); });
document.getElementById('swStep').addEventListener('click', function () { stop(); step(); });
document.getElementById('swRun').addEventListener('click', function () {
  if (timer) return stop();
  this.textContent = 'Pause';
  timer = setInterval(step, 700);
});
load();`,

  seo: {
    title: 'Sliding Window Two-Pointer Visualizer — Longest Substring Without Repeats',
    description: `Step through the O(n) sliding window solution to "longest substring without repeating characters": watch the left and right pointers move, the last-seen map update, and the best window get recorded. Plain HTML, CSS and JS; exports to React, Vue & Tailwind.`,
    about: {
      title: 'The Sliding Window Technique — Two Pointers That Never Go Backwards',
      description: `"Find the longest substring without repeating characters" is one of the most common coding interview questions, and the reason it matters is the technique behind it. A brute-force solution checks every substring, O(n²) or worse. The sliding window solves it in one pass by keeping a window of characters between two pointers and only ever moving them forward.

**The invariant**

Everything between the left pointer L and the right pointer R has no repeated characters. Each step moves R one character to the right. If the new character isn't already inside the window, the window grows. If it is, L jumps to just past that character's previous position, which removes the duplicate and everything before it in one move.

**The last-seen map**

To make that jump in O(1), the algorithm stores the most recent index of every character. When a character comes back, the map says exactly where the old copy is. Note the check \`last[c] >= left\`: a character seen *before* the current window doesn't count as a repeat, which is the most common bug in this problem.

**Why it's linear**

R visits each index once. L only moves forward and never passes R. So the total work is proportional to the length of the string, which the step counter shows: n steps for n characters.

**Reading the visual**

Orange cells are inside the window, the L and R badges mark the pointers, a red cell is the earlier copy that forced L to jump, and the green underline marks the best window found so far. The map panel shows the last-seen index of each character.

**The pattern generalises**

The same two-pointer idea solves "smallest subarray with sum ≥ K", "longest substring with at most K distinct characters" and "minimum window substring". The shape is always: grow on the right, shrink from the left until the invariant holds again.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load a string', text: `Up to 24 characters; the default contains several repeats.` },
      { title: 'Step', text: `R moves one character; watch whether L has to jump.` },
      { title: 'Watch the map', text: `The last index of each character; the repeat is highlighted.` },
      { title: 'Run', text: `Auto-step to the end and read the result.` },
      { title: 'Count the steps', text: `Steps equal the string length: linear time.` },
    ] },
    features: [
      { title: 'Two-pointer window', text: `L and R badges on the characters.` },
      { title: 'Duplicate highlighting', text: `The earlier copy that forces the jump.` },
      { title: 'Last-seen map', text: `Character → most recent index.` },
      { title: 'Stale-index check', text: `Repeats before L are ignored.` },
      { title: 'Best window tracking', text: `Underlined and reported with its length.` },
      { title: 'Step counter', text: `Shows O(n) work directly.` },
      { title: 'Plain-language log', text: `Why each pointer moved.` },
      { title: 'Custom input', text: `Try your own strings, escaped safely.` },
    ],
    useCases: [
      { title: 'Coding interview practice', text: `One of the most asked string problems.` },
      { title: 'Learning algorithm patterns', text: `Two pointers and sliding windows.` },
      { title: 'Teaching complexity', text: `See why O(n²) becomes O(n).` },
      { title: 'Streaming data', text: `The same idea underlies rolling windows.` },
      { title: 'Self-testing', text: `Predict the pointers before each step.` },
      { icon: 'CODE', title: 'Related: Big-O Growth Visualizer', desc: 'Why linear beats quadratic: [Big-O Complexity Growth Visualizer](/ui-snippets/big-o-complexity-growth-visualizer/).' },
      { icon: 'CODE', title: 'Related: Binary Search Visualizer', desc: 'Another pointer-based technique: [Binary Search Visualizer](/ui-snippets/binary-search-visualizer/).' },
    ],
    faqs: [
      { q: 'What is the sliding window technique?', a: `Keeping a range between two indexes over an array or string and moving both ends forward to maintain a condition, instead of re-examining every possible range. It usually turns an O(n²) search into an O(n) pass.` },
      { q: 'How do you find the longest substring without repeating characters?', a: `Move a right pointer over the string, storing each character's last index. If the character was last seen inside the window, move the left pointer to one past that index. Track the largest right − left + 1 seen.` },
      { q: 'Why check that the last index is at least left?', a: `The map remembers characters from before the current window. Those copies are no longer in the window, so they don't create a repeat. Without the check, the left pointer could jump backwards.` },
      { q: 'What is the time complexity?', a: `O(n): the right pointer visits each character once and the left pointer only moves forward. Space is O(min(n, alphabet size)) for the map.` },
      { q: 'What other problems use a sliding window?', a: `Minimum window substring, longest substring with at most K distinct characters, maximum sum subarray of size K, and smallest subarray with sum at least K.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to walk through the default string and explain every left-pointer jump. Ask it to adapt the visualizer to "at most K distinct characters", to minimum window substring with a target multiset, or to a numeric array version for maximum-sum windows. It can also show the O(n²) brute force side by side with a step counter.`,
      prompt: `Build a step-by-step sliding window visualizer for "longest substring without repeating characters" in plain HTML, CSS and JavaScript.

Requirements:
- An input for a string up to 24 characters, drawn as a row of indexed character cells.
- Each Step moves the right pointer forward one character; if that character's last-seen index is inside the window, move the left pointer to one past it; update the last-seen map; record a new best window when the window is longer than the best so far.
- Show L and R pointer badges, shade cells inside the window, highlight the earlier duplicate that caused a jump, and underline the best window.
- Show the last-seen map and a plain-language log of each step.
- Count steps against the string length to show linear time, and add Run/Pause.
- When finished, report the longest substring and its length. Escape user input.`,
    },
  },
};

export default slidingWindowTwoPointerVisualizer;
