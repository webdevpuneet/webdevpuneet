const loaderTypewriterStatusLog = {
  id: 'loader-typewriter-status-log',
  title: 'Typewriter Status Log Loader',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="tl-console">
  <div class="tl-titlebar"><span class="tl-dot r"></span><span class="tl-dot y"></span><span class="tl-dot g"></span><span class="tl-title">build.log</span></div>
  <div class="tl-log" id="tlLog"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f19;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.tl-console{width:100%;max-width:420px;background:#0d1117;border:1px solid #21262d;border-radius:12px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.5)}
.tl-titlebar{display:flex;align-items:center;gap:6px;padding:10px 14px;background:#161b22;border-bottom:1px solid #21262d}
.tl-dot{width:10px;height:10px;border-radius:50%}
.tl-dot.r{background:#f87171}.tl-dot.y{background:#fbbf24}.tl-dot.g{background:#34d399}
.tl-title{margin-left:6px;font-size:11.5px;color:#7d8590;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}

.tl-log{padding:16px 16px 18px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12.5px;line-height:1.85;min-height:190px}
.tl-line{white-space:pre;color:#8b949e}
.tl-line .tl-ok{color:#3fb950}
.tl-line .tl-tag{color:#58a6ff}
.tl-cursor{display:inline-block;width:7px;height:13px;background:#58a6ff;vertical-align:-2px;animation:tlBlink 1s step-end infinite}
@keyframes tlBlink{50%{opacity:0}}`,

  js: `var LOG = [
  { text: '$ npm run build', tag: true },
  { text: 'Compiling assets...' },
  { text: 'Optimizing images...' },
  { text: 'Bundling modules (214 files)...' },
  { text: 'Purging unused CSS...' },
  { text: 'Generating source maps...' },
  { text: 'Done in 3.42s.', ok: true },
];

var logEl = document.getElementById('tlLog');
var CHAR_MS = 18;      // real per-character typing speed
var LINE_GAP_MS = 260; // pause between finishing one line and starting the next

function typeLine(entry, onDone) {
  var row = document.createElement('div');
  row.className = 'tl-line';
  logEl.appendChild(row);

  var textSpan = document.createElement('span');
  if (entry.ok) textSpan.className = 'tl-ok';
  else if (entry.tag) textSpan.className = 'tl-tag';
  row.appendChild(textSpan);

  var cursor = document.createElement('span');
  cursor.className = 'tl-cursor';
  row.appendChild(cursor);

  var i = 0;
  var full = entry.text;

  // Genuine character-by-character reveal via a real interval — not a CSS
  // width/steps() typewriter trick, so line length and content are fully
  // dynamic and each character's timing is a real scheduled tick.
  var timer = setInterval(function () {
    i++;
    textSpan.textContent = full.slice(0, i);
    if (i >= full.length) {
      clearInterval(timer);
      cursor.remove();
      setTimeout(onDone, LINE_GAP_MS);
    }
  }, CHAR_MS);
}

function runLog(index) {
  if (index >= LOG.length) return;
  typeLine(LOG[index], function () { runLog(index + 1); });
}

runLog(0);`,

  seo: {
    title: 'Typewriter Status Log Loader — Character-by-Character Build Log in HTML CSS JS',
    description: `A vertical status log where each line types out character-by-character via a real interval, like a build/deploy console — not a fade-in list. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Typewriter Status Log Loader — A Build-Console Log That Types Itself Out',
      description: `Some loading states are best communicated as a literal log — the terminal-style scroll of "Compiling assets…", "Optimizing images…", "Done." that CI tools and build systems show while they work. This snippet renders exactly that: a mock console window where each status line reveals itself character-by-character before the next line begins, using a real per-character interval rather than a CSS fade or a steps()-based faux-typewriter trick.

**Real character-by-character typing**

\`typeLine()\` uses a genuine \`setInterval\` ticking every \`CHAR_MS\` (18ms) that increments an index \`i\` and sets \`textSpan.textContent = full.slice(0, i)\` — each tick reveals exactly one more character of the actual string. This is meaningfully different from the common CSS \`steps()\` typewriter trick, which only works for a fixed-width, fixed-content \`<span>\` known at build time; because this is driven by a real loop reading real string data, log lines can be any length, generated dynamically, or even streamed in from a server one line at a time.

**One line finishes before the next starts**

\`runLog(index)\` types the current entry, and only once its interval clears (the full string has been revealed) does it wait \`LINE_GAP_MS\` and then recursively call \`runLog(index + 1)\` for the next line — a genuine sequential reveal, not several lines fading in on staggered but independent timers. This mirrors how a real build log actually streams: each line completes before the next begins.

**Distinct from a "thinking" indicator**

This is deliberately literal and technical — monospace font, a mock console titlebar with the classic red/yellow/green window dots, a blinking block cursor, and syntax-style coloring (a blue command prompt, green success line) — the register of a CI/deploy log, not an AI "thinking…" indicator like the shimmering, vague status text of an [ai thinking loader](/ui-snippets/ai-thinking-loader/). The messages here are concrete completed actions ("Bundling modules (214 files)…"), not open-ended reasoning narration.

**Data-driven and extensible**

The whole log comes from one \`LOG\` array of \`{ text, tag?, ok? }\` entries, so changing the script is editing a list — swap in your real build/deploy/import steps, or drive entries in dynamically as a long-running task actually completes each stage. Pair it with a [top loading bar](/ui-snippets/top-loading-bar/) for an overall progress cue alongside the detailed log, or a [loading overlay](/ui-snippets/loading-overlay/) as the surrounding shell.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A mock console window renders and the first log line begins typing.` },
      { title: 'Watch each line type out', text: `Characters appear one at a time with a blinking cursor, then the next line begins.` },
      { title: 'Reach the final line', text: `The last line types out in green, signaling completion.` },
      { title: 'Edit the LOG array', text: `Change, add, or remove { text, tag, ok } entries for your real process's steps.` },
      { title: 'Tune the typing speed', text: `Adjust CHAR_MS (per-character delay) and LINE_GAP_MS (between-line pause).` },
      { title: 'Drive it from real events', text: `Call typeLine() for each step as your actual task completes it, instead of a fixed array.` },
    ] },
    features: [
      { title: 'Real per-character typing', text: `A genuine setInterval reveals one character per tick — not a CSS steps() trick.` },
      { title: 'Sequential line reveal', text: `Each line fully completes before the next begins typing.` },
      { title: 'Blinking block cursor', text: `A CSS-animated cursor follows the actively typing line.` },
      { title: 'Console-styled shell', text: `A mock titlebar with window dots and a monospace log area.` },
      { title: 'Syntax-style coloring', text: `Command prompts and success lines get distinct colors.` },
      { title: 'Data-driven log', text: `A single LOG array of entries drives the whole sequence.` },
      { title: 'Dynamic-length safe', text: `Works for any line length or content, since it types real string data.` },
      { title: 'Zero dependencies', text: `Pure DOM manipulation and vanilla JS — no terminal library.` },
    ],
    useCases: [
      { title: 'Build and deploy loading screens', text: 'Show a CI-style log typed character by character, in a mock window with title bar dots and a monospace output area.' },
      { title: 'Import and export narration', text: 'Narrate parsing, validating and writing steps, each line finishing completely before the next begins to type.' },
      { title: 'Account setup screens', text: 'Make a setting up your account wait feel purposeful, with a blinking block cursor following the line currently being typed.' },
      { title: 'AI and agent task logs', text: 'Show discrete completed actions, pairing with an [AI thinking loader](/ui-snippets/ai-thinking-loader/) when the wait has both a thinking and a doing phase.' },
      { title: 'Terminal-style web installers', text: 'Mimic a command-line experience for developer tools, using a genuine `setInterval` that reveals one character per tick.' },
      { icon: 'CODE', title: 'Related: Full-Screen Percentage Counter Loader', desc: 'See the [Full-Screen Percentage Counter Loader](/ui-snippets/loader-percentage-morph-text/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from a CSS steps() typewriter effect?', a: `A CSS steps() typewriter animates a fixed-width element's clip or width in discrete steps, which only works cleanly for a single line of known, fixed-length text set at build time. This snippet instead uses a real setInterval that reveals one character of an actual string per tick, so lines can be any length, generated dynamically, added to an array at runtime, or even streamed in from a live source — CSS steps() can't do any of that.` },
      { q: 'Why does the next line wait for the current one to finish?', a: `runLog(index) only calls itself for the next index inside typeLine's onDone callback, which fires after the interval has revealed every character and a short LINE_GAP_MS pause has elapsed. This produces a genuinely sequential reveal — one line completing triggers the next — matching how a real build log actually streams output, rather than several independent fade-in timers that might overlap.` },
      { q: 'How do I change the typing speed?', a: `CHAR_MS controls the delay between each revealed character (lower is faster typing); LINE_GAP_MS controls the pause after a line finishes before the next one starts. Both are plain constants at the top of the script.` },
      { q: 'How do I drive this from a real long-running task instead of a fixed array?', a: `Call typeLine({ text: 'Your real status message' }, callback) directly from your task's own progress events as each stage actually completes, instead of iterating a pre-built LOG array — the typing mechanism doesn't care where the text comes from, only that you provide a string and a callback for when it should type.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep the setInterval-based character reveal logic in a small hook/composable that takes a string and a speed, returning the currently-revealed substring as state, updated on each tick with cleanup on unmount. Drive a list of these hook instances sequentially (starting the next only once the current one's revealed length equals its full text length) to reproduce the same one-line-at-a-time behavior declaratively.` },
    ],
    aiPrompt: {
      paragraph: `Instead of assuming the typing effect is a CSS trick, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how typeLine() uses a real setInterval and string slicing to reveal one character per tick, why that approach supports dynamic and arbitrary-length text where a CSS steps()-based typewriter cannot, and how runLog()'s recursive callback structure guarantees each line fully finishes typing before the next one starts. The same assistant can help optimize it — for instance asking whether requestAnimationFrame with a timestamp-based accumulator would produce steadier character timing than setInterval under heavy main-thread load. It's also useful for extending the pattern: ask it to support a variable typing speed per character (slightly randomized, for a more human feel), add a way to skip/fast-forward the whole log on click, or make the log auto-scroll to keep the actively-typing line in view once it grows past the visible area. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "typewriter status log" loading indicator in plain HTML, CSS, and JavaScript styled like a build/deploy console — no library, and no CSS steps()-based typewriter trick.

Requirements:
- A mock console/terminal window shell with a titlebar (window control dots and a filename label) and a monospace log area below it.
- Define the log content as an array of line objects (each with at least a text string, and optionally flags for special styling like a command-prompt line or a final success line).
- Implement the typing effect with a REAL character-by-character reveal: for each line, use a JavaScript interval that increments an index and sets the line's displayed text to a substring of the real string sliced to that index length on every tick — not a CSS animation of width/clip-path on a fixed-content element, since the line lengths must be able to vary and the content must come from real string data, not be baked into CSS at build time.
- Lines must type out strictly one at a time in sequence: the next line's typing must only begin after the current line's interval has fully revealed all of its characters (plus an optional short pause), not run on independent overlapping timers.
- Show a blinking block cursor next to the line that is currently typing, and remove or hide it once that line finishes and before the next line's cursor appears.
- Give the log distinct visual styling from a generic AI "thinking" indicator: literal, technical status messages (e.g. "Compiling assets...", "Bundling modules...", "Done in 3.42s.") rather than vague reasoning narration, with monospace styling and syntax-style coloring for command and success lines.
- Expose the per-character typing delay and the pause between lines as easily tunable constants.`,
    },
  },
};

export default loaderTypewriterStatusLog;
