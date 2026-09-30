const terminalWindow = {
  id: 'terminal-window',
  title: 'Terminal Window',
  category: 'cards',
  html: `<div class="wrap">
  <div class="terminal">
    <div class="term-bar">
      <div class="dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
      <div class="term-title">bash — ~/projects/my-app</div>
      <button class="copy-cmd" onclick="restart()" title="Replay">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
      </button>
    </div>
    <div class="term-body" id="body"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #1e1b2e; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.wrap { width: 100%; max-width: 600px; }
.terminal { background: #0c0c14; border-radius: 12px; overflow: hidden; box-shadow: 0 24px 70px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.06); }
.term-bar { display: flex; align-items: center; gap: 12px; background: #1a1a26; padding: 11px 14px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.dots { display: flex; gap: 7px; }
.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }
.term-title { flex: 1; text-align: center; font-size: 12px; color: #6b7280; font-family: ui-monospace, monospace; }
.copy-cmd { background: none; border: none; color: #4b5563; cursor: pointer; display: flex; align-items: center; transition: color 0.15s; }
.copy-cmd:hover { color: #9ca3af; }
.term-body { padding: 18px 18px 22px; font-family: 'SF Mono', 'Roboto Mono', ui-monospace, monospace; font-size: 13.5px; line-height: 1.7; min-height: 280px; color: #d1d5db; }
.line { white-space: pre-wrap; word-break: break-word; }
.prompt-user { color: #28c840; }
.prompt-path { color: #5e8bff; }
.prompt-sym { color: #6b7280; }
.cmd { color: #f3f4f6; }
.out { color: #9ca3af; }
.out.success { color: #4ade80; }
.out.info { color: #60a5fa; }
.out.warn { color: #fbbf24; }
.out.muted { color: #6b7280; }
.cursor { display: inline-block; width: 8px; height: 16px; background: #4ade80; vertical-align: text-bottom; animation: blink 1s steps(1) infinite; margin-left: 1px; }
@keyframes blink { 50% { opacity: 0; } }`,
  js: `var script = [
  { type: 'cmd', text: 'npm create vite@latest my-app' },
  { type: 'out', cls: 'muted', text: '◇  Select a framework:' },
  { type: 'out', cls: 'info', text: '│  ● React' },
  { type: 'out', cls: 'muted', text: '◇  Select a variant:' },
  { type: 'out', cls: 'info', text: '│  ● TypeScript' },
  { type: 'out', cls: 'success', text: '✔ Scaffolding project in ./my-app...' },
  { type: 'cmd', text: 'cd my-app && npm install' },
  { type: 'out', cls: 'muted', text: 'added 277 packages in 8s' },
  { type: 'out', cls: 'success', text: '✔ Dependencies installed' },
  { type: 'cmd', text: 'npm run dev' },
  { type: 'out', cls: 'success', text: 'VITE v5.4.2  ready in 412 ms' },
  { type: 'out', cls: 'info', text: '➜  Local:   http://localhost:5173/' },
  { type: 'out', cls: 'muted', text: '➜  press h + enter to show help' }
];

var PROMPT = '<span class="prompt-user">dev@machine</span><span class="prompt-sym">:</span><span class="prompt-path">~/projects</span><span class="prompt-sym">$</span> ';
var body = document.getElementById('body');
var idx = 0;
var timeouts = [];

function typeCmd(text, done) {
  var line = document.createElement('div');
  line.className = 'line';
  line.innerHTML = PROMPT + '<span class="cmd"></span><span class="cursor"></span>';
  body.appendChild(line);
  var cmdSpan = line.querySelector('.cmd');
  var cursor = line.querySelector('.cursor');
  var i = 0;
  function step() {
    if (i < text.length) {
      cmdSpan.textContent += text[i++];
      timeouts.push(setTimeout(step, 45 + Math.random() * 40));
    } else {
      cursor.remove();
      timeouts.push(setTimeout(done, 350));
    }
  }
  step();
}

function printOut(cls, text, done) {
  var line = document.createElement('div');
  line.className = 'line out ' + (cls || '');
  line.textContent = text;
  body.appendChild(line);
  body.scrollTop = body.scrollHeight;
  timeouts.push(setTimeout(done, 180));
}

function run() {
  if (idx >= script.length) {
    var line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = PROMPT + '<span class="cursor"></span>';
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
    return;
  }
  var item = script[idx++];
  if (item.type === 'cmd') { typeCmd(item.text, run); }
  else { printOut(item.cls, item.text, run); }
}

function restart() {
  timeouts.forEach(clearTimeout);
  timeouts = [];
  body.innerHTML = '';
  idx = 0;
  run();
}

run();`,
  seo: {
    title: 'Terminal Window — Free HTML CSS JS Snippet',
    description: 'Animated macOS-style terminal with realistic typing effect, command output, blinking cursor, and replay button. Exports to React, Vue & Angular.',
    about: {
      title: 'Terminal Window — Animated Typing Effect, Command Output & Blinking Cursor',
      description: `An animated terminal window is a signature element on developer-focused landing pages (often inside a [split hero](/ui-snippets/split-hero/)), CLI tool documentation, and SaaS hero sections — it demonstrates a product\'s command-line workflow in a way static [code blocks](/ui-snippets/code-block/) cannot. This snippet provides a polished macOS-style terminal with traffic-light window controls, a realistic character-by-character typing animation, colour-coded command output, a blinking cursor, and a replay button.\n\n**The window chrome**\n\nThe terminal frame mimics macOS Terminal: a title bar with three traffic-light dots (red, yellow, green), a centred path title in a monospace font, and a dark body with a subtle border and deep shadow. This instantly-recognisable styling signals "developer tool" without any explanation.\n\n**The typing engine**\n\nCommands type out one character at a time via a recursive setTimeout loop — the same [typewriter](/ui-snippets/typewriter/) technique. Each keystroke is delayed by a randomised 45-85ms, which simulates human typing rhythm far more convincingly than a fixed interval — uniform timing reads as robotic. A blinking cursor follows the text as it types and is removed once the command completes, mirroring how a real shell behaves.\n\n**The script model**\n\nThe terminal plays a declarative script: an array of steps, each tagged as a typed command or a printed output line with a colour class. The run() function processes the script sequentially, calling the typing animation for commands and an instant print for output, with each step invoking the next as its completion callback. This data-driven approach makes the terminal trivial to repurpose — change the script array to show any installation flow, deployment, or demo.\n\n**Colour-coded output**\n\nOutput lines carry semantic classes (success green, info blue, warn amber, muted grey) that match the conventions of modern CLI tools like Vite, npm, and pnpm. The command prompt itself is styled in parts — a green user, a blue path, and grey symbols — replicating a typical coloured shell prompt.\n\n**Replay and cleanup**\n\nThe replay button clears all pending timeouts before restarting, preventing overlapping animations if the user replays mid-sequence. Every setTimeout id is tracked in an array so restart() can cancel them all — a small but important detail that avoids the ghost-typing bug where a stale animation continues after a reset.\n\n**Auto-scroll**\n\nAs output exceeds the visible height, the body auto-scrolls to the bottom (scrollTop = scrollHeight) so the latest line is always in view, exactly like a real terminal session.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch the sequence play', text: 'On load, the terminal types out commands character by character, prints colour-coded output, and ends with a blinking prompt cursor — just like a real shell session.' },
      { title: 'Replay the animation', text: 'Click the replay icon in the top-right of the title bar to clear the terminal and run the sequence again from the start.' },
      { title: 'Customise the script', text: 'Edit the script array in the JS. Each entry is either { type: "cmd", text: "..." } for a typed command or { type: "out", cls: "success", text: "..." } for output. Reorder, add, or remove steps to show your own workflow.' },
      { title: 'Change colours and prompt', text: 'Edit the output classes (success, info, warn, muted) in the CSS to match your brand. Change the PROMPT variable to set the username, path, and symbol of the shell prompt.' },
      { title: 'Adjust typing speed', text: 'In typeCmd, change the 45 + Math.random() * 40 delay to speed up or slow down typing. Increase the randomness range for a more human feel, or fix it for a uniform pace.' },
      { title: 'Export for your framework', text: 'Click "JSX" for a React component using useEffect to run the typing sequence with timeout cleanup. Click "Vue" for a Vue 3 SFC with onMounted and onUnmounted cleanup.' },
    ]},
    features: ['macOS-style chrome: traffic-light dots, centred title, dark body','Character-by-character typing with randomised 45-85ms human rhythm','Blinking cursor that follows typing and clears on command completion','Declarative script array — data-driven, trivial to repurpose','Colour-coded output: success, info, warn, muted classes','Multi-part coloured prompt (green user, blue path, grey symbols)','Replay button with full timeout cleanup to prevent overlap','Auto-scroll to keep the latest output line in view'],
    useCases: [
      { icon: 'APP', title: 'CLI tool and developer-product landing page', desc: 'Show your tool\'s install-and-run flow in the hero section. A prospective user watches "npm install your-cli" type out and succeed, conveying the developer experience instantly. Far more persuasive than a static code block — the motion draws the eye and the realistic output builds credibility.' },
      { icon: 'FLOW', title: 'Documentation quickstart and onboarding', desc: 'Replace static getting-started code blocks with an animated terminal that walks through setup step by step. Pair it with a copy-the-real-command button so users can both watch the flow and grab the exact commands to paste into their own shell.' },
      { icon: 'DESIGN', title: 'Portfolio and personal site signature element', desc: 'Developers use animated terminals as a personality statement on their portfolio — type out "whoami", "ls skills/", or a fake deploy. It signals craft and command-line fluency to anyone reviewing the site, and the replay button invites interaction.' },
      { icon: 'CODE', title: 'Demo and screencast alternative', desc: 'Instead of recording a screencast that goes stale when your CLI output changes, drive a scripted terminal from a data array you keep in version control. Update the script when the tool changes and the "recording" updates itself — no re-recording, no video hosting.' },
      { icon: 'LEARN', title: 'Study typewriter animation and script-driven UI', desc: 'The snippet teaches recursive setTimeout typing with randomised cadence, declarative animation scripts with completion callbacks, and proper timeout cleanup to avoid overlapping runs. These patterns apply to any sequenced animation — chat simulations, guided tours, and step-through demos.' },
      { icon: 'CHART', title: 'Status and deployment visualisation', desc: 'Drive the terminal from real data: feed it the output lines of an actual build or deploy log, replaying them with typing animation for a dramatic status display on a dashboard or release page. The colour classes map cleanly to log levels.' },
    ],
    faqs: [
      { q: 'How do I change what the terminal types?', a: 'Edit the script array at the top of the JavaScript. Each element is an object: { type: "cmd", text: "your command" } renders as a typed-out command with the prompt, and { type: "out", cls: "success", text: "output line" } renders as instant output with a colour (success, info, warn, or muted). The terminal plays the array in order, so reordering, adding, or removing entries changes the whole sequence without touching the animation logic.' },
      { q: 'Why does typing use randomised delays instead of a fixed speed?', a: 'A fixed per-character delay looks mechanical and immediately reads as fake. Real human typing has natural variation in keystroke timing. The snippet adds Math.random() * 40 to a 45ms base, so each character lands 45-85ms after the last. This irregularity is what makes the effect feel like someone is actually typing. You can widen the random range for an even more organic feel or narrow it for a faster, more deliberate pace.' },
      { q: 'Why track and clear the timeouts?', a: 'Each character and output line is scheduled with setTimeout, which returns an id. These ids are collected in an array. When the user clicks replay, restart() loops through the array and calls clearTimeout on every pending id before resetting. Without this, clicking replay mid-animation would leave the old sequence running alongside the new one, producing overlapping ghost typing. Tracking and cancelling timeouts is essential for any replayable timed animation.' },
      { q: 'How do I build this in React?', a: 'Keep the script as a constant array. In a useEffect, run the sequence by chaining timeouts, storing each id in a ref array. Append lines to state (or imperatively to a ref-held DOM node for performance). Return a cleanup function from the effect that clears all tracked timeouts, so unmounting or replaying cancels pending animation. For replay, reset the line state and re-run the effect via a key change or a manual trigger.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the recursive typing loop by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how typeCmd's step function schedules itself character by character with a randomized delay, and why every single setTimeout id gets pushed into a shared timeouts array rather than just the final one. The same assistant can help optimize it — for instance whether the script-driven run function should batch DOM writes instead of appending a new line element on every printOut call, or whether the random 45-85ms typing delay should scale with command length so very long commands don't take unreasonably long to finish. It's also useful for extending the terminal: ask it to support ANSI-style colored inline spans within a single output line, add a fake progress bar that fills over time, or drive the script from a real build/deploy log fetched at runtime. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an animated macOS-style "terminal window" in plain HTML, CSS, and JavaScript using a declarative script array and recursive setTimeout typing — no animation library.

Requirements:
- A window frame with a title bar containing three colored traffic-light dots, a centered monospace title, and a replay icon button, above a dark scrollable body area.
- A script array of step objects, each either a typed command (a type field of "cmd" plus text) or an instant output line (a type field of "out" plus a CSS class name for color and text) — the entire terminal sequence must be driven by this one array, with no hardcoded animation steps elsewhere in the code.
- A typing function that renders one command line with a blinking cursor span, then recursively schedules itself via setTimeout to append one character at a time at a randomized delay in a range (not a fixed interval), removing the cursor and invoking a completion callback once the full text has been typed.
- An output function that instantly appends a line with its given color class and, after a short fixed delay, invokes a completion callback, so command lines and output lines can be chained through the same sequential runner function regardless of type.
- A sequencer function that walks the script array by index, calling the typing function for command steps and the output function for output steps, always passing itself as the next step's completion callback, and appending a final idle prompt with a blinking cursor once every step has played.
- Every setTimeout id created anywhere in the typing or output functions must be collected into a shared array so a replay function can call clearTimeout on all of them, clear the terminal body, reset the step index to zero, and restart the sequence cleanly with no overlapping "ghost" output from the previous run.
- The terminal body must auto-scroll to the bottom as new lines are appended so the most recent output is always visible.`,
    },
  },
};

export default terminalWindow;
