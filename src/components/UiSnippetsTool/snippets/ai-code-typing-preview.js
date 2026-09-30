const aiCodeTypingPreview = {
  id: 'ai-code-typing-preview',
  title: 'AI Code Typing Preview',
  lastmod: '2026-08-08',
  category: 'animations',
  html: `<div class="actp-wrap">
  <div class="actp-editor">
    <div class="actp-titlebar">
      <span class="actp-dot red"></span>
      <span class="actp-dot yellow"></span>
      <span class="actp-dot green"></span>
      <span class="actp-filename">solution.js</span>
      <span class="actp-badge" id="actp-badge">AI writing<span class="actp-dots">...</span></span>
    </div>
    <div class="actp-body" id="actp-body"></div>
  </div>
  <div class="actp-controls">
    <button class="actp-btn primary" id="actp-replay" type="button">Replay</button>
    <button class="actp-btn" id="actp-speed" type="button">Speed: 1x</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; padding: 32px; }

.actp-wrap { width: 100%; max-width: 560px; display: flex; flex-direction: column; gap: 12px; }

.actp-editor { background: #0f172a; border-radius: 14px; overflow: hidden; box-shadow: 0 16px 40px rgba(15,23,42,0.25); border: 1px solid #1e293b; }

.actp-titlebar { display: flex; align-items: center; gap: 6px; padding: 10px 14px; background: #1e293b; }
.actp-dot { width: 10px; height: 10px; border-radius: 50%; }
.actp-dot.red { background: #ef4444; }
.actp-dot.yellow { background: #f59e0b; }
.actp-dot.green { background: #22c55e; }
.actp-filename { margin-left: 10px; font-size: 12px; color: #94a3b8; font-family: ui-monospace, monospace; }
.actp-badge { margin-left: auto; font-size: 11px; font-weight: 600; color: #a5b4fc; background: rgba(99,102,241,0.15); padding: 3px 9px; border-radius: 999px; display: flex; align-items: center; gap: 2px; }
.actp-dots::after { content: ''; }

.actp-body { padding: 18px 20px 24px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 13.5px; line-height: 1.7; min-height: 220px; }

.actp-line { display: flex; white-space: pre; opacity: 0; transform: translateY(6px); animation: actp-line-in 0.25s ease forwards; }
@keyframes actp-line-in { to { opacity: 1; transform: translateY(0); } }

.actp-gutter { display: inline-block; width: 26px; color: #475569; user-select: none; flex-shrink: 0; text-align: right; margin-right: 14px; }
.actp-code { color: #e2e8f0; }

.tok-kw { color: #c084fc; }
.tok-str { color: #86efac; }
.tok-com { color: #64748b; font-style: italic; }
.tok-num { color: #fca5a5; }
.tok-fn { color: #7dd3fc; }
.tok-punc { color: #94a3b8; }

.actp-cursor { display: inline-block; width: 7px; height: 16px; background: #a5b4fc; margin-left: 1px; vertical-align: -3px; animation: actp-blink 0.9s steps(1) infinite; }
@keyframes actp-blink { 50% { opacity: 0; } }

.actp-controls { display: flex; gap: 8px; }
.actp-btn { padding: 9px 16px; border-radius: 9px; border: 1.5px solid #e2e8f0; background: #fff; color: #334155; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s, border-color 0.15s; }
.actp-btn:hover { border-color: #c7d2fe; }
.actp-btn.primary { background: #6366f1; color: #fff; border-color: #6366f1; }
.actp-btn.primary:hover { background: #4f46e5; }`,
  js: `// ---- Source "typed" by the AI ----
const SOURCE_LINES = [
  '// Find the two numbers that sum to target',
  'function twoSum(nums, target) {',
  '  const seen = new Map();',
  '  for (let i = 0; i < nums.length; i++) {',
  '    const need = target - nums[i];',
  '    if (seen.has(need)) {',
  '      return [seen.get(need), i];',
  '    }',
  "    seen.set(nums[i], i);",
  '  }',
  '  return [];',
  '}',
];

// ---- Tiny regex-based tokenizer ----
// Not a real parser - just enough to color the common categories so the
// "typing" animation looks like a real editor instead of plain monospace
// text. Order matters: comments and strings are matched first so keyword
// matching inside them never fires.
const TOKEN_RULES = [
  { type: 'com', re: /^\\/\\/.*/ },
  { type: 'str', re: /^("([^"\\\\]|\\\\.)*"|'([^'\\\\]|\\\\.)*')/ },
  { type: 'num', re: /^\\b\\d+(\\.\\d+)?\\b/ },
  { type: 'kw', re: /^\\b(function|const|let|var|return|if|else|for|while|new|class|of|in)\\b/ },
  { type: 'fn', re: /^\\b[a-zA-Z_$][\\w$]*(?=\\()/ },
  { type: 'punc', re: /^[{}()\\[\\];,.:]/ },
];

function tokenizeLine(text) {
  const tokens = [];
  let rest = text;
  let guard = 0;
  while (rest.length && guard++ < 500) {
    let matched = false;
    for (const rule of TOKEN_RULES) {
      const m = rule.re.exec(rest);
      if (m && m[0].length) {
        tokens.push({ type: rule.type, text: m[0] });
        rest = rest.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Consume one plain character (whitespace, identifier chars, operators)
      tokens.push({ type: 'plain', text: rest[0] });
      rest = rest.slice(1);
    }
  }
  return tokens;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderHighlighted(text) {
  const tokens = tokenizeLine(text);
  return tokens.map(t => {
    const esc = escapeHtml(t.text);
    if (t.type === 'plain') return esc;
    return '<span class="tok-' + t.type + '">' + esc + '</span>';
  }).join('');
}

const body = document.getElementById('actp-body');
const replayBtn = document.getElementById('actp-replay');
const speedBtn = document.getElementById('actp-speed');
const badge = document.getElementById('actp-badge');

let speedMultiplier = 1;
let running = false;
let runToken = 0;

function delayFor(char, isLineStart) {
  // Jittered per-character timing so it doesn't feel like a metronome.
  // Occasional longer pauses at the start of a line simulate "thinking".
  let base = 18 + Math.random() * 42;
  if (char === ' ') base *= 0.5;
  if (isLineStart && Math.random() < 0.35) base += 180 + Math.random() * 320;
  if (Math.random() < 0.04) base += 140; // rare stray pause mid-line
  return base / speedMultiplier;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLine(lineEl, codeEl, text, myToken) {
  let typed = '';
  for (let i = 0; i < text.length; i++) {
    if (myToken !== runToken) return;
    typed += text[i];
    codeEl.innerHTML = renderHighlighted(typed);
    await sleep(delayFor(text[i], i === 0));
  }
}

async function runAnimation() {
  const myToken = ++runToken;
  running = true;
  body.innerHTML = '';
  badge.style.opacity = '1';

  for (let i = 0; i < SOURCE_LINES.length; i++) {
    if (myToken !== runToken) return;
    const line = document.createElement('div');
    line.className = 'actp-line';

    const gutter = document.createElement('span');
    gutter.className = 'actp-gutter';
    gutter.textContent = String(i + 1);

    const codeEl = document.createElement('span');
    codeEl.className = 'actp-code';

    const cursor = document.createElement('span');
    cursor.className = 'actp-cursor';

    line.appendChild(gutter);
    line.appendChild(codeEl);
    body.appendChild(line);
    codeEl.after(cursor);

    await typeLine(codeEl, codeEl, SOURCE_LINES[i], myToken);
    if (myToken !== runToken) return;
    cursor.remove();
  }

  if (myToken === runToken) {
    running = false;
    badge.textContent = 'Done';
    badge.style.background = 'rgba(34,197,94,0.15)';
    badge.style.color = '#86efac';
  }
}

replayBtn.addEventListener('click', () => {
  badge.textContent = 'AI writing';
  const dotsSpan = document.createElement('span');
  dotsSpan.className = 'actp-dots';
  badge.appendChild(dotsSpan);
  badge.style.background = 'rgba(99,102,241,0.15)';
  badge.style.color = '#a5b4fc';
  runAnimation();
});

speedBtn.addEventListener('click', () => {
  const speeds = [1, 2, 0.5];
  const idx = speeds.indexOf(speedMultiplier);
  speedMultiplier = speeds[(idx + 1) % speeds.length];
  speedBtn.textContent = 'Speed: ' + speedMultiplier + 'x';
});

runAnimation();`,
  seo: {
    title: 'AI Code Typing Preview — Free JS Editor Animation Snippet',
    description: 'Simulated AI code-writing panel with jittered typing, a blinking cursor and live syntax highlighting. Exports to React, Vue & Tailwind.',
    about: {
      title: 'AI Code Typing Preview — Character-by-Character Editor Animation With Live Syntax Highlighting',
      description: `This snippet recreates the now-familiar "AI is writing code" moment seen in Copilot, Cursor, and Claude's own coding tools: a dark code-editor panel where lines of a function appear one character at a time, each token colored the instant it is complete, with a blinking cursor tracking the current write position. The goal was to make something that feels alive rather than mechanical, which meant rejecting the obvious approach — a fixed \`setInterval\` typing at a constant interval — in favor of jittered timing and a hand-rolled tokenizer.

**Why a constant interval looks fake**

A \`setInterval\` typing every character at exactly 30ms looks robotic within about two seconds, because real typing — human or AI-generated token-by-token output — is never that uniform. \`delayFor()\` computes a fresh random delay for every character: a base of \`18 + Math.random() * 42\` milliseconds, halved for spaces (since spaces genuinely type faster), with roughly a 35% chance of a much longer pause at the very start of each line to simulate the model "thinking" before committing to the next statement, and a small 4% chance of a random mid-line pause. None of this is expensive to compute, but it is the single biggest factor in whether the animation reads as scripted or organic.

**The typing loop: recursive setTimeout via async/await, not setInterval**

Rather than a single \`setInterval\` ticking at a fixed rate, \`typeLine()\` is an \`async\` function that awaits a freshly computed \`sleep(delayFor(...))\` promise before appending the next character. This is what lets every single character have its own independent, randomized delay — an interval-based timer can only ever tick at one fixed rate, but a chain of awaited timeouts can vary every step. A monotonically increasing \`runToken\` guards against races: clicking Replay while a previous run is still typing increments the token, and every in-flight \`typeLine\` call checks its captured token against the current one before continuing, so a stale animation can never keep writing over a fresh one.

**A tiny regex tokenizer instead of a syntax-highlighting library**

Pulling in a full syntax highlighter for a five-category demo (keywords, strings, comments, numbers, function names) would be overkill, so \`tokenizeLine()\` hand-rolls one: an ordered array of \`{ type, regex }\` rules is tested against the remaining text left-to-right, and whichever rule matches first consumes that chunk. Order is the whole trick — comments and strings are checked before keywords, so the word "function" appearing inside a string or a comment is never mistakenly colored as a keyword, because the string/comment rule already consumed the entire quoted or commented span before the keyword rule gets a chance to run.

**Progressive highlighting, not "type first, colorize after"**

The easy-but-wrong approach is to type plain characters and run the tokenizer once the whole line is done. Instead, \`renderHighlighted()\` re-tokenizes the *entire partial string typed so far* on every single character and rewrites \`codeEl.innerHTML\`. This sounds wasteful, but at demo-scale line lengths it is trivial for the browser, and it produces the correct visual effect: a string's green coloring appears the instant its closing quote is typed, not after the whole line finishes, exactly like a real editor's incremental highlighter would behave.

**The blinking cursor tracks position, not a static append**

The cursor is a small \`<span>\` with a \`step(1)\` blink animation, and it is physically moved after the current line's code span on each line — \`codeEl.after(cursor)\` — then removed once that line finishes typing and effectively "reappears" attached to the next line's code element. Because it is a real DOM sibling of the code span rather than a CSS \`::after\` on the container, it visually sits exactly at the end of whatever has been typed so far, including mid-word.

**Lines sliding in with CSS keyframes, not JS-driven positioning**

Each new \`<div class="actp-line">\` gets a CSS \`animation: actp-line-in\` that fades and slides it up 6px into place the moment it's appended — pure CSS, no per-frame JS work, so it stays smooth regardless of how the typing loop is timed. Separating "how a line enters" (CSS) from "how its characters appear" (JS timing loop) keeps each concern simple on its own.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch the first line begin typing automatically', text: 'A comment appears character by character with visibly uneven timing — some characters pop in almost instantly, others have a small pause, especially right after a new line starts.' },
      { title: 'Watch keywords and strings color in as they complete', text: 'As "function" finishes typing it turns purple, and once a quoted string\'s closing quote is typed the whole string turns green — highlighting is applied progressively, not after the fact.' },
      { title: 'Follow the blinking cursor', text: 'A small blinking bar sits at the exact character position currently being "typed", moving to the next line once the previous one completes.' },
      { title: 'Notice the badge change from "AI writing..." to "Done"', text: 'Once the last line finishes typing, the status badge in the top-right of the title bar switches to a green "Done" state.' },
      { title: 'Click Replay', text: 'The whole panel clears and the animation restarts from the first line, with freshly randomized timing on every character since delays are recomputed each run.' },
      { title: 'Click Speed to cycle 1x / 2x / 0.5x', text: 'The per-character delay is divided by the multiplier, so 2x types roughly twice as fast and 0.5x types roughly half as fast, without changing the jitter pattern itself.' },
    ]},
    features: [
      'Character-by-character typing driven by chained awaited setTimeout calls, not a fixed-rate setInterval',
      'Randomized per-character delay with extra "thinking" pauses at line starts for organic, non-robotic timing',
      'Hand-rolled regex tokenizer (comments, strings, numbers, keywords, function names) — no highlighting library',
      'Progressive highlighting: the partial line is re-tokenized and recolored on every character as it types',
      'Blinking text cursor implemented as a real DOM sibling that tracks the current typing position per line',
      'New lines slide and fade in via CSS keyframe animation, decoupled from the JS typing timer',
      'Run-token guard prevents a stale animation from continuing to type after Replay is clicked mid-run',
      'Replay button and a three-step Speed toggle (1x / 2x / 0.5x) that scales delay without changing jitter shape',
    ],
    useCases: [
      { icon: 'WEB', title: 'AI coding tool and IDE-plugin landing pages', desc: 'Show the exact "watch it write your code" moment on a marketing page for an AI pair-programmer, code-review bot, or IDE extension, without needing a real screen recording that goes stale as your UI changes.' },
      { icon: 'APP', title: 'Product onboarding and empty-state illustrations', desc: 'Use as a lightweight animated placeholder while a real AI generation request is in flight, or as a static-feeling but still lively empty state before a user\'s first project exists.' },
      { icon: 'LEARN', title: 'Teaching hand-rolled syntax highlighting and async timing', desc: 'A compact, readable example of writing a tiny tokenizer with ordered regex rules and driving character-level animation with chained promises instead of setInterval — useful before reaching for a full highlighting library.' },
      { icon: 'DESIGN', title: 'Developer-tool documentation and changelog pages', desc: 'Pair with a [typing-code](/ui-snippets/typing-code) or [typewriter](/ui-snippets/typewriter) snippet elsewhere on the same docs site for a consistent "live code" motif across feature announcements.' },
      { icon: 'CODE', title: 'Hackathon and demo-day presentation slides', desc: 'Embed as a live, in-browser slide element that types out an example instead of a static code screenshot, giving a presentation more visual energy than a paste-and-freeze code block.' },
      { icon: 'GAME', title: 'Terminal or hacker-aesthetic game and portfolio intros', desc: 'Reuse the same jittered-typing engine with a different color scheme (green-on-black) for a retro-terminal intro sequence on a portfolio or game landing page.' },
      { icon: 'CODE', title: 'Related: Analog Clock', desc: 'See the [Analog Clock](/ui-snippets/analog-clock/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Avatar Stack Fan Expand', desc: 'See the [Avatar Stack Fan Expand](/ui-snippets/avatar-stack-fan-expand/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the animation use chained setTimeout calls instead of setInterval?', a: 'setInterval only supports one fixed delay for every tick, which is exactly what makes typing look robotic. By awaiting a freshly computed sleep(delayFor(...)) before each character, every single character gets its own independently randomized delay — shorter for spaces, occasionally much longer right after a new line to simulate "thinking" — which setInterval cannot express without constantly clearing and re-creating the timer.' },
      { q: 'How does the tokenizer avoid coloring keywords that appear inside a string or comment?', a: 'TOKEN_RULES is an ordered array and tokenizeLine() always tries rules in that order, testing whether the remaining text starts with a match. The comment rule and the string rule are listed before the keyword rule, so if the current position starts a string or a comment, that entire span is consumed as one str or com token before the keyword rule ever gets a chance to test the characters inside it.' },
      { q: 'Is re-tokenizing the whole partial line on every keystroke wasteful?', a: 'For the short line lengths typical of a demo or code-preview panel (a few dozen characters), re-running a handful of regex tests on every character is computationally trivial — well under a millisecond — so there is no visible performance cost. For much longer lines (hundreds of characters) you would want to tokenize incrementally from the last known token boundary instead of from the start of the line each time.' },
      { q: 'Can I use this AI-typing code preview in React, Vue, or Angular?', a: 'Yes. Move SOURCE_LINES, the tokenizer, and runAnimation into the component and trigger runAnimation from a useEffect on mount in React, guarding against re-entrancy the same way the runToken counter already does; because the loop uses awaited setTimeout rather than a persistent interval or requestAnimationFrame, there is nothing to explicitly cancel on unmount as long as you check an "is mounted" flag (or bump runToken) inside the effect cleanup so a stale run does not keep writing into unmounted DOM. In Vue, start it in onMounted and bump the token in onUnmounted; in Angular, start it in ngAfterViewInit and bump it in ngOnDestroy.' },
      { q: 'How do I change what code gets "typed"?', a: 'Edit the SOURCE_LINES array — each string is one line of code exactly as it should appear, including leading whitespace for indentation. The tokenizer and animation logic are language-agnostic within the categories it already recognizes (keywords, strings, comments, numbers, function-call names), so swapping in a different function, a Python-flavored snippet, or a config file example works without touching the rest of the code, though you may want to extend TOKEN_RULES\'s keyword list for a different language.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's JS to an AI assistant like Claude and ask it to explain why TOKEN_RULES order matters and what breaks if the keyword rule is moved before the string rule — it is a small but genuinely instructive bug to walk through. Worth asking for as extensions: support for multi-line strings or template literals in the tokenizer, a "typo and backspace" effect where the AI occasionally types a wrong character and corrects it, or swapping the fixed SOURCE_LINES array for a queue of different code snippets that cycle automatically after each Replay.`,
      prompt: `Build a simulated "AI is writing code" animated panel in plain HTML, CSS, and JavaScript, styled like a dark code editor, no libraries.

Requirements:
- A dark-themed editor panel with a title bar (window control dots, filename, a status badge) and a body area with line-numbered rows.
- An array of source code line strings that get typed into the panel one character at a time, in order, when the animation runs.
- Per-character typing delay must be randomized (not a fixed interval) — shorter for spaces, with an increased chance of a noticeably longer pause specifically at the start of a new line to simulate the AI "thinking", plus a small chance of a random pause mid-line.
- Implement the typing loop with chained awaited setTimeout calls (or an equivalent promise-based delay) rather than setInterval, so every character can have its own independent delay.
- Write a small hand-rolled tokenizer using an ordered list of regular expressions (comments, strings, numbers, keywords, function-call names) that classifies chunks of the partially-typed line, checked in an order that prevents keywords from being matched inside strings or comments.
- Re-render the current line's HTML with syntax-highlighting spans applied on every character typed, so colors appear progressively as tokens complete, not only after the full line finishes.
- Add a blinking text cursor that visually tracks the current end-of-typed-text position and moves correctly from line to line.
- Each new line should animate into view (fade + slight slide) as it is added to the DOM.
- Include a Replay button that restarts the whole animation from scratch (clearing prior output and safely stopping any in-flight typing from the previous run) and a Speed toggle that scales the typing rate.`,
    },
  },
};

export default aiCodeTypingPreview;
