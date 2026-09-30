const terminalCommandGame = {
  id: 'terminal-command-game',
  title: 'Terminal Command Game',
  lastmod: '2026-08-13',
  category: 'games',
  html: `<div class="demo-wrap">
  <div class="tc-game">
    <div class="tc-head">
      <div class="tc-meta"><span class="tc-label">Task</span><span class="tc-value" id="tcNum">1 / 8</span></div>
      <div class="tc-meta tc-right"><span class="tc-label">Solved</span><span class="tc-value" id="tcScore">0</span></div>
    </div>

    <p class="tc-task" id="tcTask">List every file in this folder, including hidden ones.</p>

    <div class="tc-term" id="tcTerm">
      <div class="tc-bar"><span class="tc-dot r"></span><span class="tc-dot y"></span><span class="tc-dot g"></span><span class="tc-title">bash — project</span></div>
      <div class="tc-scroll" id="tcScroll">
        <div class="tc-out" id="tcOut"></div>
        <div class="tc-line">
          <span class="tc-prompt">~/project $</span>
          <input class="tc-input" id="tcInput" type="text" spellcheck="false" autocomplete="off" autocapitalize="off">
        </div>
      </div>
    </div>

    <p class="tc-status" id="tcStatus">Type the command and press Enter.</p>
    <div class="tc-actions">
      <button class="tc-link" id="tcHint">Show hint</button>
      <button class="tc-link" id="tcSkip">Skip task</button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0b0f14; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 26px 16px; }

.tc-game {
  width: 100%; max-width: 460px; padding: 20px;
  background: #131a22; border: 1px solid #1f2933; border-radius: 16px;
  display: flex; flex-direction: column; gap: 13px;
  box-shadow: 0 18px 40px rgba(0,0,0,0.45);
}

.tc-head { display: flex; justify-content: space-between; }
.tc-meta { display: flex; flex-direction: column; gap: 2px; }
.tc-right { align-items: flex-end; }
.tc-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; }
.tc-value { font-size: 16px; font-weight: 800; color: #e6edf3; }

.tc-task {
  font-size: 13.5px; font-weight: 600; color: #e6edf3; line-height: 1.5;
  background: #0b0f14; border-left: 3px solid #22c55e; border-radius: 0 8px 8px 0; padding: 10px 12px;
}

.tc-term { border-radius: 11px; overflow: hidden; border: 1px solid #1f2933; background: #05080b; }
.tc-bar { display: flex; align-items: center; gap: 6px; padding: 8px 11px; background: #0b0f14; border-bottom: 1px solid #1f2933; }
.tc-dot { width: 9px; height: 9px; border-radius: 50%; }
.tc-dot.r { background: #f87171; } .tc-dot.y { background: #fbbf24; } .tc-dot.g { background: #4ade80; }
.tc-title { margin-left: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; color: #64748b; }

.tc-scroll { max-height: 190px; overflow-y: auto; padding: 11px 12px; }
.tc-out { display: flex; flex-direction: column; gap: 2px; margin-bottom: 4px; }
.tc-out div {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; line-height: 1.6;
  color: #9fb3c8; white-space: pre-wrap; word-break: break-word;
}
.tc-out .echo { color: #e6edf3; }
.tc-out .ok { color: #4ade80; }
.tc-out .err { color: #f87171; }

.tc-line { display: flex; align-items: center; gap: 7px; }
.tc-prompt { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; font-weight: 700; color: #22c55e; flex: 0 0 auto; }
.tc-input {
  flex: 1; min-width: 0; border: none; outline: none; background: transparent; color: #e6edf3;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; caret-color: #22c55e;
}

.tc-status { font-size: 12px; font-weight: 600; color: #64748b; min-height: 17px; }
.tc-status.ok { color: #4ade80; }
.tc-status.err { color: #f87171; }

.tc-actions { display: flex; gap: 14px; }
.tc-link {
  background: none; border: none; padding: 0; cursor: pointer; font-family: inherit;
  font-size: 12px; font-weight: 600; color: #64748b; text-decoration: underline;
}
.tc-link:hover { color: #86efac; }`,

  js: `var TASKS = [
  {
    task: 'List every file in this folder, including hidden ones.',
    // Accepted as regex so flag order and combined flags all pass.
    accept: ['^ls\\\\s+-(?=[al]*a)[al]+$'],
    output: ['.  ..  .env  .git  package.json  src  README.md'],
    hint: 'ls hides dotfiles by default. The -a flag means "all".',
    why: 'ls -a (or -la for the long listing) includes entries starting with a dot, which is how hidden files are marked on Unix systems.',
  },
  {
    task: 'Print the full path of the folder you are standing in.',
    accept: ['^pwd$'],
    output: ['/home/dev/project'],
    hint: 'Three letters. "Print working directory".',
    why: 'pwd prints the absolute path of the current working directory — useful in scripts where a relative path would be ambiguous.',
  },
  {
    task: 'Create a new folder called notes.',
    accept: ['^mkdir\\\\s+(-p\\\\s+)?notes/?$'],
    output: [''],
    hint: 'Make directory. The folder name goes after the command.',
    why: 'mkdir notes creates one directory. Adding -p creates any missing parent folders too, and does not error if the folder already exists.',
  },
  {
    task: 'Search every file under this folder for the text TODO.',
    accept: ['^grep\\\\s+-[rRni]*r[rRni]*\\\\s+["\\']?TODO["\\']?\\\\s+\\\\.?$'],
    output: ['src/app.js:42:  // TODO: handle empty cart', 'src/api.js:8:  // TODO: retry on 429'],
    hint: 'grep searches text. The -r flag makes it recurse into subfolders.',
    why: 'grep -r "TODO" . walks the directory tree from the current folder. Without -r, grep only reads the files you name explicitly.',
  },
  {
    task: 'Show the last 20 lines of app.log.',
    accept: ['^tail\\\\s+(-n\\\\s*20|-20)\\\\s+app\\\\.log$'],
    output: ['[12:04:11] GET /api/cart 200', '[12:04:12] GET /api/user 200', '… 18 more lines'],
    hint: 'tail reads the end of a file. -n sets how many lines.',
    why: 'tail -n 20 app.log prints the final 20 lines. Add -f to follow the file live as new lines are appended — the standard way to watch a log.',
  },
  {
    task: 'Make the script deploy.sh executable.',
    accept: ['^chmod\\\\s+\\\\+x\\\\s+(\\\\./)?deploy\\\\.sh$', '^chmod\\\\s+7[0-9][0-9]\\\\s+(\\\\./)?deploy\\\\.sh$'],
    output: [''],
    hint: 'chmod changes permissions. +x adds the execute bit.',
    why: 'chmod +x deploy.sh adds execute permission for everyone who already has read access. The numeric form (chmod 755) sets all permission bits at once instead of adding one.',
  },
  {
    task: 'Copy the whole src folder to a folder called backup.',
    accept: ['^cp\\\\s+-[rRa]+\\\\s+src/?\\\\s+backup/?$'],
    output: [''],
    hint: 'cp copies. Copying a folder needs the recursive flag.',
    why: 'cp -r src backup copies the directory and everything inside it. Without -r, cp refuses to copy a directory at all.',
  },
  {
    task: 'Find every .log file anywhere under this folder.',
    accept: ['^find\\\\s+\\\\.\\\\s+-name\\\\s+["\\']?\\\\*\\\\.log["\\']?$'],
    output: ['./app.log', './tmp/debug.log', './src/old/build.log'],
    hint: 'find takes a starting path, then -name with a quoted pattern.',
    why: 'find . -name "*.log" searches recursively from the current folder. Quoting the pattern stops the shell expanding the * before find ever sees it — the mistake that makes this command behave differently in a folder that happens to contain a .log file.',
  },
];

var outEl = document.getElementById('tcOut');
var input = document.getElementById('tcInput');
var scrollEl = document.getElementById('tcScroll');
var taskEl = document.getElementById('tcTask');
var statusEl = document.getElementById('tcStatus');
var numEl = document.getElementById('tcNum');
var scoreEl = document.getElementById('tcScore');

var pos = 0;
var solved = 0;
var locked = false;

function task() { return TASKS[pos]; }

function print(text, cls) {
  var line = document.createElement('div');
  if (cls) line.className = cls;
  line.textContent = text;
  outEl.appendChild(line);
  scrollEl.scrollTop = scrollEl.scrollHeight;
}

function setStatus(msg, kind) {
  statusEl.textContent = msg;
  statusEl.className = 'tc-status' + (kind ? ' ' + kind : '');
}

// Collapse runs of whitespace so "ls   -a" and "ls -a" are the same command.
function normalise(value) {
  return value.trim().replace(/\\s+/g, ' ');
}

function matches(value) {
  var cmd = normalise(value);
  return task().accept.some(function (pattern) {
    return new RegExp(pattern).test(cmd);
  });
}

function submit() {
  if (locked) return;
  var raw = input.value;
  if (!normalise(raw)) return;

  print('~/project $ ' + raw, 'echo');
  input.value = '';

  if (matches(raw)) {
    locked = true;
    solved++;
    scoreEl.textContent = solved;
    task().output.forEach(function (line) { if (line) print(line); });
    print(task().why, 'ok');
    setStatus('Correct.', 'ok');
    setTimeout(next, 1500);
  } else {
    print('command did not do what the task asked', 'err');
    setStatus('Not quite — try again, or take a hint.', 'err');
  }
}

function next() {
  if (pos === TASKS.length - 1) {
    print('— all ' + TASKS.length + ' tasks complete, resetting —', 'ok');
    pos = 0;
    solved = 0;
    setTimeout(function () { outEl.innerHTML = ''; load(); }, 1200);
    return;
  }
  pos++;
  load();
}

function load() {
  locked = false;
  taskEl.textContent = task().task;
  numEl.textContent = (pos + 1) + ' / ' + TASKS.length;
  scoreEl.textContent = solved;
  setStatus('Type the command and press Enter.', '');
  input.focus();
}

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') submit();
});
document.getElementById('tcTerm').addEventListener('click', function () { input.focus(); });
document.getElementById('tcHint').addEventListener('click', function () {
  print(task().hint);
  setStatus('Hint printed to the terminal.', '');
});
document.getElementById('tcSkip').addEventListener('click', function () {
  if (locked) return;
  print('skipped — ' + task().why);
  next();
});

load();`,

  seo: {
    title: 'Terminal Command Game — Free HTML CSS JS Snippet',
    description: 'Type real shell commands to complete eight tasks in a simulated terminal, graded by regex so flag order and variants all pass. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Terminal Command Game — Regex-Graded Shell Tasks, Simulated Output & An Explanation After Every Solve',
      description: `Command-line fluency is built from a few dozen commands used often enough to become muscle memory, and the fastest way to build it is to be given a goal rather than a command to copy. This snippet is a playable terminal trainer: each task states an outcome in plain English — list hidden files, search a tree for TODO, make a script executable — and the player types the command they think does it into a working terminal UI, which echoes the input, prints plausible output, and explains what the command actually did.

**Grading with regular expressions, not string equality**

Real shell usage does not have one canonical spelling. \`ls -a\` and \`ls -la\` both list hidden files; \`tail -n 20 app.log\` and \`tail -20 app.log\` are equivalent; \`grep -rn "TODO" .\` is as valid as \`grep -r TODO .\`. Each task therefore carries an \`accept\` array of regex patterns rather than a literal answer, and the patterns are written to tolerate flag order, combined short flags, optional quoting, and trailing slashes on directory names. A lookahead such as \`-(?=[al]*a)[al]+\` accepts any combination of \`a\` and \`l\` flags as long as \`a\` is present, which is exactly the rule the task actually cares about.

**Normalising before matching**

\`normalise()\` trims the input and collapses every run of whitespace to a single space before any pattern runs, so \`ls   -a\` with stray spacing grades identically to \`ls -a\`. Doing this once, in one place, keeps every regex simpler — no pattern needs to litter itself with \`\\s+\` alternatives for spacing the player might have typed. It is also the correct order of operations: normalise the input, then test it, rather than trying to write patterns tolerant of arbitrary formatting.

**A terminal that behaves like a terminal**

Submitted commands are echoed after the prompt exactly as typed, output lines print beneath, and the scroll container is pinned to the bottom on every write so the newest line is always visible. Clicking anywhere in the terminal focuses the input, which is the small affordance that makes a simulated terminal feel real rather than like a form field with a monospace font. Output is written with \`textContent\` on generated elements rather than by concatenating HTML, so a player who types something containing angle brackets sees their own text rather than injecting markup.

**Explanations that generalise past the answer**

Every solved task prints a \`why\` line explaining not just what the command did but the rule behind it — that \`-a\` reveals dot-prefixed entries because that is how hidden files are marked on Unix, that \`cp\` refuses directories without \`-r\`, that quoting \`"*.log"\` stops the shell expanding the glob before \`find\` ever receives it. That last one is the kind of detail that turns a command someone copied into a command they understand, and it is the reason the same command sometimes behaves differently in a different folder.

**Task data drives everything**

Each task is a single object with the plain-English goal, the accept patterns, the simulated output lines, a hint, and the explanation. Adding a task is one array entry — the counter in the header, the end-of-round reset, and the skip and hint buttons all derive from the array — and no command is ever executed anywhere, since the "output" is authored text chosen to look like the real thing.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the task, not a command', text: 'Each task states an outcome in plain English — list hidden files, show the last 20 lines of a log, make a script executable — so you have to recall the command rather than copy one.' },
        { title: 'Type into the terminal and press Enter', text: 'Clicking anywhere in the terminal window focuses the input. Your command is echoed after the prompt exactly as typed, the way a real shell does.' },
        { title: 'Get credit for any valid form', text: 'Answers are graded with regular expressions, so ls -a and ls -la both pass, tail -n 20 and tail -20 are equivalent, and quoting or a trailing slash on a directory name does not matter.' },
        { title: 'Read the explanation after a solve', text: 'A correct command prints plausible output followed by a green explanation of the rule behind it — why cp needs -r for directories, why the glob in find should be quoted, what -a actually means on a Unix filesystem.' },
        { title: 'Take a hint if you are stuck', text: 'Show hint prints a nudge into the terminal itself rather than a popup, describing the command\'s purpose without giving the exact syntax away.' },
        { title: 'Work through all eight tasks', text: 'Tasks cover ls, pwd, mkdir, grep, tail, chmod, cp and find — the core of everyday shell work. Completing the last one resets the terminal for another pass.' },
      ],
    },
    features: [
      'Eight tasks covering ls, pwd, mkdir, grep, tail, chmod, cp and find, stated as outcomes rather than commands',
      'Regex-based grading with an accept array per task, tolerating flag order, combined short flags, optional quoting and trailing slashes',
      'Input normalised once (trimmed, whitespace collapsed) before any pattern runs, keeping every regex simple',
      'Authored simulated output per task — nothing is ever executed',
      'An explanation printed after every solve covering the rule behind the command, not just the answer',
      'Terminal-accurate behaviour: prompt echo of the raw input, auto-scroll to the newest line, click-anywhere-to-focus',
      'Output written with textContent on generated elements, so typed angle brackets cannot inject markup',
      'Hints printed into the terminal stream rather than into a separate popup',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching the command line to beginners or bootcamp students', desc: 'Stating the goal instead of the command is what builds recall, and the per-solve explanations mean students learn the rule rather than a string to paste. It pairs well with a [bug hunt game](/ui-snippets/bug-hunt-game/) when moving from tooling to reading code.' },
      { icon: 'CODE', title: 'Interactive onboarding for a CLI product', desc: 'Swap the TASKS array for your own tool\'s commands and the game becomes a guided first-run tutorial that lets people practise your syntax without touching a real system — no sandbox infrastructure, no risk of a destructive command.' },
      { icon: 'APP', title: 'Developer marketing pages, careers sites and booth screens', desc: 'A terminal that responds to real commands reads as credible to a technical audience instantly, and a task or two makes a memorable interactive moment on an otherwise static page.' },
      { icon: 'DESIGN', title: 'Terminal UI pattern for docs, demos and product tours', desc: 'The window chrome, prompt line, echo-and-output stream, auto-scroll and click-to-focus behaviour together form a reusable simulated-terminal component for any docs page that wants a playable console instead of a screenshot.' },
      { icon: 'FLOW', title: 'Reference for tolerant answer matching', desc: 'Normalise once, then test against an array of accepting patterns, is the right shape for grading any free-text input with multiple valid forms — quiz apps, search-syntax trainers, and command palettes with alias support all need exactly this.' },
      { icon: 'FORM', title: 'Safe practice environment for destructive commands', desc: 'Because nothing is executed and the output is authored, tasks can safely cover commands you would never let a learner run for real — the simulation teaches the syntax without any possibility of touching a filesystem.' },
      { icon: 'CODE', title: 'Related: Word Search Puzzle Grid', desc: 'See the [Word Search Puzzle Grid](/ui-snippets/word-search-puzzle/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the game actually run the commands I type?', a: 'No. Nothing is executed anywhere — each task carries authored output lines chosen to look like real shell output, and grading is a regex test against the typed string. That is what makes it safe to practise commands you would not want a learner running against a real filesystem.' },
      { q: 'Why are answers graded with regular expressions?', a: 'Because most shell tasks have several correct spellings. ls -a and ls -la both list hidden files, tail -n 20 and tail -20 are the same request, and quoting a glob is optional in some shells. Each task holds an array of accept patterns written to tolerate flag order, combined short flags, optional quotes and trailing slashes, so a valid command is not rejected on formatting.' },
      { q: 'What does the normalise() step do before matching?', a: 'It trims the input and collapses every run of whitespace to a single space, so "ls   -a" grades identically to "ls -a". Doing that once means no accept pattern has to account for arbitrary spacing, which keeps the patterns readable and stops them from quietly disagreeing with each other about whitespace.' },
      { q: 'How do I add my own tasks or use my own CLI?', a: 'Push an object onto TASKS with five keys: task (the plain-English goal), accept (an array of regex source strings), output (an array of lines to print on success), hint (a nudge that stops short of the syntax), and why (the explanation printed after a solve). Write accept patterns anchored with ^ and $, and remember the input has already been whitespace-normalised.' },
      { q: 'Can I use this terminal game in React, Vue, or Angular?', a: 'Yes. Keep TASKS and the normalise/matches helpers in a plain module, hold the line history and current task index in component state, and render history lines from that array instead of appending DOM nodes — that also removes the manual scroll management if you keep a ref and scroll to the bottom in an effect after each append. The post-solve setTimeout should be cleared on unmount (useEffect cleanup, onUnmounted, ngOnDestroy) so a task advance cannot fire after the component is gone.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add command history navigation with the up and down arrow keys plus a simple tab-completion for the file names mentioned in the current task — both are things a real shell does that players immediately reach for, and both are small, self-contained state problems. Other good extensions: add a simulated filesystem object that commands actually mutate so mkdir and cp change what a later ls prints, add a piping task set (grep piped into wc -l) with patterns that accept either order of equivalent pipelines, track per-command accuracy in localStorage to surface which commands need practice, or fork the task list into a git edition covering branch, rebase and reset.`,
      prompt: `Build a playable terminal command training game in plain HTML, CSS, and JavaScript — no frameworks or libraries, and without executing anything.

Requirements:
- A TASKS array where each entry has a plain-English goal (state the OUTCOME, never the command), an accept array of regex source strings, an array of authored output lines to print on success, a hint, and an explanation of the rule behind the command.
- Cover the core of everyday shell work: listing hidden files, printing the working directory, creating a directory, recursively searching for text, tailing the last N lines of a log, making a script executable, recursively copying a folder, and finding files by glob.
- Grade with regular expressions rather than string equality so every valid form passes — ls -a and ls -la, tail -n 20 and tail -20, quoted and unquoted globs, optional trailing slashes on directory arguments, and any order of combined short flags.
- Normalise the input once before matching (trim, collapse runs of whitespace to a single space) so no accept pattern has to handle arbitrary spacing.
- Render a terminal window with title-bar chrome, a prompt line with an inline input, an output stream that echoes the raw typed command, auto-scroll to the newest line, and click-anywhere-in-the-terminal to focus the input.
- Write all output with textContent on generated elements so typed angle brackets cannot inject markup.
- After a correct answer, print the simulated output followed by an explanation of the underlying rule — why cp needs -r, why a find glob should be quoted, what -a means on a Unix filesystem — then advance. Include hint and skip actions that print into the terminal stream rather than into a popup, plus task and solved counters.`,
    },
  },
};

export default terminalCommandGame;
