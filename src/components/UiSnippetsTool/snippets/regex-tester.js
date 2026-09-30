const regexTester = {
  id: 'regex-tester',
  title: 'Regex Tester & Match Visualizer',
  category: 'dev',
  html: `<div class="wrap">
  <h2>Regex Tester</h2>

  <div class="pattern-row">
    <span class="slash">/</span>
    <input type="text" id="pattern-input" spellcheck="false" value="(\\w+)@(\\w+)\\.com" placeholder="pattern" />
    <span class="slash">/</span>
    <input type="text" id="flags-input" spellcheck="false" value="g" placeholder="flags" class="flags" />
  </div>
  <div class="flag-toggles">
    <label><input type="checkbox" data-flag="g" checked /> g global</label>
    <label><input type="checkbox" data-flag="i" /> i ignore case</label>
    <label><input type="checkbox" data-flag="m" /> m multiline</label>
    <label><input type="checkbox" data-flag="s" /> s dotAll</label>
  </div>

  <div class="status" id="status-line">Valid pattern</div>

  <textarea id="test-input" spellcheck="false" placeholder="Test string...">Contact us at support@example.com or sales@company.com for help.</textarea>

  <div class="highlight-label">Live matches</div>
  <div class="highlight-box" id="highlight-box"></div>

  <div class="matches-label">Match details <span id="match-count"></span></div>
  <div class="matches-list" id="matches-list"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 720px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

.pattern-row { display: flex; align-items: center; gap: 4px; background: #0f172a; border-radius: 10px; padding: 10px 12px; }
.slash { color: #64748b; font-size: 16px; font-weight: 700; }
#pattern-input { flex: 1; background: none; border: none; color: #a5b4fc; font-family: "SF Mono", Consolas, monospace; font-size: 14px; outline: none; }
.flags { width: 50px; background: none; border: none; color: #fbbf24; font-family: monospace; font-size: 14px; outline: none; }

.flag-toggles { display: flex; gap: 14px; flex-wrap: wrap; margin: 10px 0 4px; }
.flag-toggles label { font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 5px; cursor: pointer; user-select: none; }
.flag-toggles input { accent-color: #6366f1; }

.status { font-size: 12px; font-weight: 600; color: #16a34a; margin: 8px 0 14px; min-height: 16px; }
.status.error { color: #dc2626; }

textarea { width: 100%; min-height: 90px; resize: vertical; padding: 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: "SF Mono", Consolas, monospace; font-size: 13px; line-height: 1.7; color: #1e293b; margin-bottom: 16px; }
textarea:focus { outline: none; border-color: #6366f1; }

.highlight-label, .matches-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px; }
.matches-label { margin-top: 16px; }
#match-count { color: #6366f1; text-transform: none; font-weight: 600; }

.highlight-box { padding: 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: "SF Mono", Consolas, monospace; font-size: 13px; line-height: 1.7; color: #334155; white-space: pre-wrap; word-break: break-word; min-height: 40px; }
.highlight-box mark { background: #c7d2fe; color: #3730a3; border-radius: 3px; padding: 1px 2px; font-weight: 600; }
.highlight-box mark.alt { background: #fde68a; color: #78350f; }

.matches-list { display: flex; flex-direction: column; gap: 6px; max-height: 220px; overflow-y: auto; }
.match-row { padding: 8px 10px; background: #f8fafc; border: 1px solid #eef2f7; border-radius: 8px; font-size: 12px; font-family: "SF Mono", Consolas, monospace; color: #334155; }
.match-row b { color: #6366f1; }
.match-row .groups { color: #64748b; margin-top: 3px; }
.no-matches { font-size: 12.5px; color: #94a3b8; padding: 8px 2px; }`,
  js: `const patternInput = document.getElementById('pattern-input');
const flagsInput = document.getElementById('flags-input');
const testInput = document.getElementById('test-input');
const statusLine = document.getElementById('status-line');
const highlightBox = document.getElementById('highlight-box');
const matchesList = document.getElementById('matches-list');
const matchCount = document.getElementById('match-count');
const flagCheckboxes = document.querySelectorAll('.flag-toggles input');

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function syncFlagCheckboxes() {
  const current = flagsInput.value;
  flagCheckboxes.forEach(cb => { cb.checked = current.includes(cb.dataset.flag); });
}

function syncFlagsInput() {
  let flags = '';
  flagCheckboxes.forEach(cb => { if (cb.checked) flags += cb.dataset.flag; });
  flagsInput.value = flags;
}

function run() {
  const patternStr = patternInput.value;
  let flags = flagsInput.value.replace(/[^gimsuy]/g, '');
  const text = testInput.value;

  if (!patternStr) {
    statusLine.textContent = 'Enter a pattern';
    statusLine.className = 'status';
    highlightBox.innerHTML = escapeHtml(text);
    matchesList.innerHTML = '<div class="no-matches">No pattern yet.</div>';
    matchCount.textContent = '';
    return;
  }

  let re;
  try {
    re = new RegExp(patternStr, flags.includes('g') ? flags : flags + 'g');
    statusLine.textContent = 'Valid pattern — /' + patternStr + '/' + flags;
    statusLine.className = 'status';
  } catch (e) {
    statusLine.textContent = 'Invalid regex: ' + e.message;
    statusLine.className = 'status error';
    highlightBox.innerHTML = escapeHtml(text);
    matchesList.innerHTML = '<div class="no-matches">Fix the pattern to see matches.</div>';
    matchCount.textContent = '';
    return;
  }

  const matches = [];
  let m;
  let iterations = 0;
  while ((m = re.exec(text)) !== null && iterations < 500) {
    matches.push(m);
    iterations++;
    if (m.index === re.lastIndex) re.lastIndex++;
  }

  let html = '';
  let cursor = 0;
  matches.forEach((match, i) => {
    html += escapeHtml(text.slice(cursor, match.index));
    const cls = i % 2 === 0 ? '' : ' alt';
    html += '<mark class="' + cls.trim() + '">' + escapeHtml(match[0]) + '</mark>';
    cursor = match.index + match[0].length;
  });
  html += escapeHtml(text.slice(cursor));
  highlightBox.innerHTML = html || '<span style="color:#cbd5e1">(empty test string)</span>';

  matchCount.textContent = '(' + matches.length + ' match' + (matches.length === 1 ? '' : 'es') + ')';

  if (!matches.length) {
    matchesList.innerHTML = '<div class="no-matches">No matches found.</div>';
    return;
  }

  matchesList.innerHTML = matches.map((match, i) => {
    let groupsHtml = '';
    if (match.length > 1) {
      const groups = [];
      for (let g = 1; g < match.length; g++) {
        groups.push('Group ' + g + ': "' + (match[g] === undefined ? '(undefined)' : match[g]) + '"');
      }
      groupsHtml = '<div class="groups">' + groups.join(' &nbsp;·&nbsp; ') + '</div>';
    }
    return '<div class="match-row"><b>Match ' + (i + 1) + '</b> at index ' + match.index + ': "' + escapeHtml(match[0]) + '"' + groupsHtml + '</div>';
  }).join('');
}

patternInput.addEventListener('input', run);
flagsInput.addEventListener('input', () => { syncFlagCheckboxes(); run(); });
testInput.addEventListener('input', run);
flagCheckboxes.forEach(cb => cb.addEventListener('change', () => { syncFlagsInput(); run(); }));

syncFlagCheckboxes();
run();`,

  seo: {
    title: 'Regex Tester & Match Visualizer — Free HTML CSS JS Snippet',
    description: 'Test JavaScript regular expressions live with real RegExp matching, highlighted matches, capture groups and flag toggles for g, i, m and s. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Regex Tester — Live JavaScript RegExp Matching with Highlighted Matches & Capture Groups',
      description: `Regular expressions are notoriously hard to read back once written, and the fastest way to understand what a pattern actually matches is to see it highlighted against real text. This snippet is a real JavaScript regex engine test — every match shown is produced by the browser's native \`RegExp\` object running against whatever pattern and test string you type, not a simulated or approximated matcher.

**Building the RegExp object safely**

\`run()\` reads the raw pattern string and flags string, sanitizes the flags with \`flags.replace(/[^gimsuy]/g, '')\` to strip anything that isn't a real JavaScript regex flag, and wraps construction in a \`try/catch\`. An invalid pattern — unbalanced parentheses, a bad character class, an unsupported escape — throws a \`SyntaxError\` from the \`RegExp\` constructor itself, and the caught message is shown directly in the status line. This is real engine validation, not a hand-rolled regex syntax checker, so the error messages match exactly what you'd see in a browser console.

**Forcing the global flag for iteration, without changing displayed intent**

To collect *all* matches rather than just the first, the exec loop needs the \`g\` flag set internally regardless of whether the user's flag string includes it — otherwise \`RegExp.exec()\` always returns the same first match forever, since without \`g\` it doesn't advance \`lastIndex\`. The snippet handles this by constructing the working regex with \`flags.includes('g') ? flags : flags + 'g'\`, so iteration always works, while the status line still displays the flags exactly as the user entered them for accuracy. The classic infinite-loop trap with zero-length matches (a pattern like \`x*\` matching an empty string) is guarded against explicitly: \`if (m.index === re.lastIndex) re.lastIndex++\`, which forces the engine to advance past a zero-width match instead of looping forever at the same index — combined with a hard 500-iteration cap as a second line of defense.

**Building the highlighted view without a virtual DOM**

The highlight box is built by walking the matches in order and slicing the original text between them: everything from the cursor position up to the next match's \`.index\` is escaped and appended as plain text, then the matched substring itself is wrapped in a \`<mark>\`, alternating a CSS class between two colors so adjacent matches remain visually distinguishable even when they're touching. \`escapeHtml()\` is applied to every literal text slice before insertion — including inside the \`<mark>\` — so a test string containing literal \`<\` or \`&\` characters can never break the rendered markup or, worse, get interpreted as HTML.

**Capture groups shown per match**

Each match object from \`exec()\` is an array where index 0 is the full match and indices 1+ are capture groups in pattern order; \`match.length > 1\` signals the pattern actually has capture groups. The per-match detail row lists each group's value, explicitly labeling an unmatched optional group as \`(undefined)\` rather than silently omitting it — an easy source of confusion when a pattern has an optional group like \`(foo)?\` that sometimes doesn't participate in a given match.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Type a pattern between the slashes', text: 'The pattern field accepts standard JavaScript regex syntax without the surrounding slashes — they\'re shown as static decoration.' },
        { title: 'Toggle flags with the checkboxes or the flags field', text: 'g (global), i (ignore case), m (multiline), and s (dotAll) can be set either by checkbox or by typing directly into the flags input — both stay in sync.' },
        { title: 'Edit the test string', text: 'Matches update live on every keystroke in the textarea, no submit button required.' },
        { title: 'Read the highlighted view', text: 'Matched substrings are wrapped in alternating-colored marks directly in the test text, so you can see exactly what the pattern captured in context.' },
        { title: 'Check the match details list', text: 'Each match shows its start index, matched text, and every capture group\'s value below the highlighted view.' },
        { title: 'Watch the status line for syntax errors', text: 'An invalid pattern shows the real JavaScript SyntaxError message from the RegExp constructor instead of silently failing.' },
      ],
    },
    features: [
      'Uses the real browser RegExp engine — no simulated or approximated matching logic',
      'Live syntax validation via try/catch around new RegExp(), surfacing the real SyntaxError message',
      'Flag checkboxes (g, i, m, s) and a raw flags text field stay bidirectionally in sync',
      'Global flag is force-enabled internally for iteration while displaying the user\'s actual flag string',
      'Zero-length match infinite-loop guard (advances lastIndex manually) plus a hard iteration cap',
      'Alternating-color <mark> highlighting so adjacent or touching matches stay visually distinct',
      'Full capture group breakdown per match, explicitly labeling non-participating optional groups',
      'HTML-escaped rendering throughout so literal < and & in test text can never break the output',
    ],
    useCases: [
      { icon: 'CODE', title: 'Building and debugging validation regexes', desc: 'Iterate on an email, phone number, or slug validation pattern against a batch of real and edge-case test strings before dropping it into form validation code.' },
      { icon: 'LEARN', title: 'Teaching regex syntax and capture groups', desc: 'Show students exactly which part of a pattern matches which part of the text by toggling flags and watching the highlighted output change in real time.' },
      { icon: 'FLOW', title: 'Writing a find-and-replace or parsing script', desc: 'Confirm a pattern captures the right groups before wiring it into a String.replace() callback or a log-parsing script — the group breakdown shows exactly what each () will extract.' },
      { icon: 'APP', title: 'Internal developer tooling', desc: 'Pair with a [text diff checker](/ui-snippets/text-diff-checker/) or [JSON diff viewer](/ui-snippets/json-diff-viewer/) in an internal dev-tools page for quick data-cleaning and pattern-matching tasks.' },
      { icon: 'DASH', title: 'Reviewing a teammate\'s regex in code review', desc: 'Paste a pattern from a pull request along with representative input data to quickly confirm it behaves as the author intended before approving.' },
      { icon: 'CODE', title: 'Related: CIDR / Subnet Calculator', desc: 'See the [CIDR / Subnet Calculator](/ui-snippets/cidr-subnet-calculator/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this use a real regex engine or a simulation?', a: 'It uses the browser\'s native JavaScript RegExp object directly — new RegExp(pattern, flags) followed by real .exec() calls. Every match, capture group, and error message you see is exactly what the same pattern would produce in any JavaScript environment.' },
      { q: 'Why does the tool force the g flag internally even if I don\'t check it?', a: 'Without the global flag, RegExp.exec() always returns the same first match and never advances, making it impossible to iterate through multiple matches. The tool internally appends g for the iteration loop while still displaying your actual chosen flags in the status line, so what you see reflects your real pattern configuration.' },
      { q: 'How does it avoid an infinite loop on patterns that can match an empty string?', a: 'A pattern like x* can match a zero-length string, which would otherwise leave lastIndex unchanged and loop forever. The exec loop checks if (m.index === re.lastIndex) and manually increments lastIndex in that case, forcing the engine past the zero-width match, plus a hard cap of 500 iterations as a safety backstop.' },
      { q: 'What does "(undefined)" mean next to a capture group?', a: 'It means that specific group is part of the pattern but did not participate in this particular match — typically because it\'s inside an optional group like (foo)? that wasn\'t present in the matched text. JavaScript\'s match arrays represent this as undefined at that group\'s index, and the tool labels it explicitly rather than showing a blank.' },
      { q: 'Can I use lookahead, lookbehind, or named capture groups?', a: 'Yes — any valid JavaScript regex syntax works, since the pattern is passed straight to the native RegExp constructor. Named groups appear in match.groups, though this tool\'s detail view currently lists groups by their numeric index rather than by name.' },
      { q: 'Is my test string or pattern sent anywhere?', a: 'No. Everything runs client-side using the browser\'s built-in RegExp engine — nothing is transmitted to a server, so it\'s safe to test against real (non-sensitive) log lines or sample data.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain exactly why the zero-length-match guard (if (m.index === re.lastIndex) re.lastIndex++) is necessary — it's the kind of edge case that causes a naive regex-iteration loop to freeze a tab. It's also a solid base to extend: ask for named capture group support (reading match.groups instead of numeric indices), a "common patterns" dropdown (email, URL, IPv4, hex color) to load as starting points, or a replace-preview mode that shows the result of String.replace() with a user-supplied replacement string.`,
      prompt: `Build a live regex tester in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A pattern input and a flags input (plus optional checkboxes for g, i, m, s that stay synced with the flags text), and a test-string textarea, all updating results live on every keystroke.
- Construct the actual RegExp object from the user's pattern and flags inside a try/catch, and display real JavaScript SyntaxError messages inline when the pattern is invalid, rather than silently failing.
- Regardless of whether the user's flags include g, internally force it on for the matching loop so all matches (not just the first) are collected, while still showing the user's actual entered flags in the UI.
- Guard against infinite loops on patterns that can match a zero-length string by manually advancing lastIndex when a match's index doesn't move it forward, plus a hard iteration cap as a backstop.
- Render the test string with every match wrapped in a highlighted <mark> element, alternating between two colors so consecutive or adjacent matches remain visually distinguishable, with all literal text properly HTML-escaped.
- Below the highlighted text, list every match with its start index, matched substring, and the value of every capture group (explicitly showing when an optional group didn't participate in that match).`,
    },
  },
};

export default regexTester;
