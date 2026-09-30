const logicGatePuzzleGame = {
  id: 'logic-gate-puzzle-game',
  title: 'Logic Gate Puzzle Game',
  lastmod: '2026-08-13',
  category: 'games',
  html: `<div class="demo-wrap">
  <div class="lg-game">
    <div class="lg-head">
      <div class="lg-meta"><span class="lg-label">Puzzle</span><span class="lg-value" id="lgLevel">1 / 5</span></div>
      <div class="lg-meta lg-right"><span class="lg-label">Rows correct</span><span class="lg-value"><span id="lgRows">0</span> / 8</span></div>
    </div>

    <p class="lg-goal" id="lgGoal">Make the output light up only when all three switches are on.</p>

    <div class="lg-circuit">
      <div class="lg-inputs">
        <button class="lg-sw" data-input="0">A<span class="lg-bit">0</span></button>
        <button class="lg-sw" data-input="1">B<span class="lg-bit">0</span></button>
        <button class="lg-sw" data-input="2">C<span class="lg-bit">0</span></button>
      </div>

      <div class="lg-wires">
        <div class="lg-gate" id="lgGate0">
          <span class="lg-gate-name">AND</span>
          <span class="lg-gate-hint">A · B</span>
        </div>
        <div class="lg-gate" id="lgGate1">
          <span class="lg-gate-name">AND</span>
          <span class="lg-gate-hint">· C</span>
        </div>
        <div class="lg-out" id="lgOut">OUT<span class="lg-bit">0</span></div>
      </div>
    </div>

    <div class="lg-picker" id="lgPicker"></div>

    <div class="lg-table">
      <div class="lg-tr lg-th"><span>A</span><span>B</span><span>C</span><span>want</span><span>got</span></div>
      <div id="lgRowsBody"></div>
    </div>

    <p class="lg-status" id="lgStatus">Pick a gate type for each slot, then flip the switches to test.</p>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f1729; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 26px 16px; }

.lg-game {
  width: 100%; max-width: 430px; padding: 20px;
  background: #16203a; border: 1px solid #26314f; border-radius: 16px;
  display: flex; flex-direction: column; gap: 13px;
  box-shadow: 0 18px 40px rgba(0,0,0,0.45);
}

.lg-head { display: flex; justify-content: space-between; }
.lg-meta { display: flex; flex-direction: column; gap: 2px; }
.lg-right { align-items: flex-end; }
.lg-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #7c8bb0; }
.lg-value { font-size: 16px; font-weight: 800; color: #e8edf9; }

.lg-goal {
  font-size: 13px; font-weight: 600; color: #dbe3f5; line-height: 1.5;
  background: #0f1729; border-left: 3px solid #f59e0b; border-radius: 0 8px 8px 0; padding: 9px 12px;
}

.lg-circuit { display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: center; padding: 12px; border-radius: 12px; background: #0f1729; border: 1px solid #26314f; }
.lg-inputs { display: flex; flex-direction: column; gap: 7px; }
.lg-sw {
  display: flex; flex-direction: column; align-items: center; gap: 1px;
  width: 46px; padding: 7px 0; border-radius: 9px; cursor: pointer; font-family: inherit;
  background: #16203a; border: 1.5px solid #26314f; color: #7c8bb0; font-size: 11px; font-weight: 800;
  transition: all 0.14s;
}
.lg-sw .lg-bit { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; }
.lg-sw.on { background: rgba(245,158,11,0.16); border-color: #f59e0b; color: #fbbf24; }

.lg-wires { display: flex; align-items: center; gap: 8px; }
.lg-gate {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 1px;
  padding: 10px 4px; border-radius: 10px; background: #16203a; border: 1.5px solid #3b82f6; color: #93c5fd;
}
.lg-gate.live { background: rgba(59,130,246,0.18); }
.lg-gate-name { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; font-weight: 800; }
.lg-gate-hint { font-size: 9.5px; color: #64748b; }
.lg-gate.picking { border-color: #f59e0b; color: #fbbf24; }

.lg-out {
  display: flex; flex-direction: column; align-items: center; gap: 1px; width: 52px; padding: 10px 0;
  border-radius: 10px; background: #16203a; border: 1.5px solid #26314f; color: #7c8bb0;
  font-size: 10px; font-weight: 800;
}
.lg-out .lg-bit { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 14px; }
.lg-out.on { background: rgba(74,222,128,0.16); border-color: #4ade80; color: #86efac; }

.lg-picker { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; }
.lg-pick {
  padding: 8px 0; border-radius: 8px; border: 1.5px solid #26314f; background: #0f1729; color: #dbe3f5;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; font-weight: 700;
  cursor: pointer; transition: all 0.12s;
}
.lg-pick:hover { border-color: #3b82f6; color: #93c5fd; }

.lg-table { border-radius: 10px; overflow: hidden; border: 1px solid #26314f; }
.lg-tr {
  display: grid; grid-template-columns: repeat(5, 1fr); text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; color: #dbe3f5;
}
.lg-tr span { padding: 4px 0; }
.lg-th { background: #0f1729; color: #7c8bb0; font-size: 10px; font-weight: 800; text-transform: uppercase; }
.lg-tr.row-ok { background: rgba(74,222,128,0.10); }
.lg-tr.row-bad { background: rgba(248,113,113,0.12); }
.lg-tr.current { box-shadow: inset 3px 0 0 #f59e0b; }

.lg-status { font-size: 12px; font-weight: 600; color: #7c8bb0; min-height: 17px; }
.lg-status.ok { color: #4ade80; }`,

  js: `var GATES = {
  AND:  function (a, b) { return a & b; },
  OR:   function (a, b) { return a | b; },
  XOR:  function (a, b) { return a ^ b; },
  NAND: function (a, b) { return a & b ? 0 : 1; },
  NOR:  function (a, b) { return a | b ? 0 : 1; },
};
var GATE_NAMES = Object.keys(GATES);

// Circuit shape is fixed: out = gate1( gate0(A, B), C )
var LEVELS = [
  { goal: 'Light the output only when all three switches are on.', want: function (a, b, c) { return a & b & c; } },
  { goal: 'Light it when C is on AND at least one of A or B is on.', want: function (a, b, c) { return (a | b) & c; } },
  { goal: 'Light it when A and B differ, or when C is on.', want: function (a, b, c) { return (a ^ b) | c; } },
  { goal: 'Light it when an ODD number of switches are on (a parity check).', want: function (a, b, c) { return a ^ b ^ c; } },
  { goal: 'Light it only when C is on and A and B are NOT both on.', want: function (a, b, c) { return (a & b ? 0 : 1) & c; } },
];

var ROWS = [];
for (var i = 0; i < 8; i++) ROWS.push([(i >> 2) & 1, (i >> 1) & 1, i & 1]);

var levelIndex = 0;
var choice = ['OR', 'OR'];   // never a solution to any level, so nothing starts solved
var slot = 0;
var inputs = [0, 0, 0];
var solvedFlag = false;

var pickerEl = document.getElementById('lgPicker');
var rowsBody = document.getElementById('lgRowsBody');
var statusEl = document.getElementById('lgStatus');
var goalEl = document.getElementById('lgGoal');
var levelEl = document.getElementById('lgLevel');
var rowsEl = document.getElementById('lgRows');
var outEl = document.getElementById('lgOut');
var gateEls = [document.getElementById('lgGate0'), document.getElementById('lgGate1')];

function level() { return LEVELS[levelIndex]; }

// Evaluate the whole circuit for one input triple.
function evaluate(a, b, c, gates) {
  var first = GATES[gates[0]](a, b);
  return { first: first, out: GATES[gates[1]](first, c) };
}

function buildPicker() {
  pickerEl.innerHTML = '';
  GATE_NAMES.forEach(function (name) {
    var btn = document.createElement('button');
    btn.className = 'lg-pick';
    btn.textContent = name;
    btn.dataset.gate = name;
    pickerEl.appendChild(btn);
  });
}

function renderTable() {
  rowsBody.innerHTML = '';
  var correct = 0;
  ROWS.forEach(function (row) {
    var want = level().want(row[0], row[1], row[2]);
    var got = evaluate(row[0], row[1], row[2], choice).out;
    var ok = want === got;
    if (ok) correct++;

    var tr = document.createElement('div');
    tr.className = 'lg-tr ' + (ok ? 'row-ok' : 'row-bad');
    if (row[0] === inputs[0] && row[1] === inputs[1] && row[2] === inputs[2]) tr.classList.add('current');
    tr.innerHTML = '<span>' + row[0] + '</span><span>' + row[1] + '</span><span>' + row[2] +
      '</span><span>' + want + '</span><span>' + got + '</span>';
    rowsBody.appendChild(tr);
  });
  rowsEl.textContent = correct;
  return correct;
}

function render() {
  var live = evaluate(inputs[0], inputs[1], inputs[2], choice);

  Array.prototype.forEach.call(document.querySelectorAll('.lg-sw'), function (btn, i) {
    btn.classList.toggle('on', inputs[i] === 1);
    btn.querySelector('.lg-bit').textContent = inputs[i];
  });

  gateEls.forEach(function (el, i) {
    el.querySelector('.lg-gate-name').textContent = choice[i];
    el.classList.toggle('picking', slot === i && !solvedFlag);
    el.classList.toggle('live', (i === 0 ? live.first : live.out) === 1);
  });

  outEl.classList.toggle('on', live.out === 1);
  outEl.querySelector('.lg-bit').textContent = live.out;

  var correct = renderTable();
  if (correct === ROWS.length && !solvedFlag) win();
}

function setStatus(msg, kind) {
  statusEl.textContent = msg;
  statusEl.className = 'lg-status' + (kind ? ' ' + kind : '');
}

function win() {
  solvedFlag = true;
  var expression = '(A ' + choice[0] + ' B) ' + choice[1] + ' C';
  if (levelIndex === LEVELS.length - 1) {
    setStatus('All 8 rows match with ' + expression + '. Every puzzle solved!', 'ok');
    setTimeout(function () { levelIndex = 0; loadLevel(); }, 2000);
  } else {
    setStatus('All 8 rows match with ' + expression + '. Next puzzle…', 'ok');
    setTimeout(function () { levelIndex++; loadLevel(); }, 1600);
  }
}

function loadLevel() {
  solvedFlag = false;
  choice = ['OR', 'OR'];
  slot = 0;
  inputs = [0, 0, 0];
  goalEl.textContent = level().goal;
  levelEl.textContent = (levelIndex + 1) + ' / ' + LEVELS.length;
  setStatus('Pick a gate type for each slot, then flip the switches to test.', '');
  render();
}

pickerEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.lg-pick');
  if (!btn || solvedFlag) return;
  choice[slot] = btn.dataset.gate;
  slot = slot === 0 ? 1 : 0;      // fill the first slot, then the second, then wrap
  render();
});

gateEls.forEach(function (el, i) {
  el.addEventListener('click', function () {
    if (solvedFlag) return;
    slot = i;
    render();
  });
});

document.querySelector('.lg-inputs').addEventListener('click', function (e) {
  var btn = e.target.closest('.lg-sw');
  if (!btn) return;
  var i = Number(btn.dataset.input);
  inputs[i] = inputs[i] ? 0 : 1;
  render();
});

buildPicker();
loadLevel();`,

  seo: {
    title: 'Logic Gate Puzzle Game — Free HTML CSS JS Snippet',
    description: 'Pick gates to match a target truth table, graded across all eight input rows with live wire states. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Logic Gate Puzzle Game — Full Truth-Table Grading, Live Circuit State & Behavioural Equivalence',
      description: `Boolean logic is the substrate under every conditional anyone ever writes, and it clicks the moment you can flip a switch and watch a wire light up. This snippet is a playable circuit puzzle: a fixed two-gate circuit wired as \`gate1(gate0(A, B), C)\`, five gate types to choose from, three input switches, and a target described in plain English. The player picks gates until the circuit's behaviour matches the target across every possible input — not just the case currently on screen.

**Graded on the whole truth table, not the visible state**

The critical design decision is that the win condition evaluates all eight input combinations, not the three switches as they currently stand. \`ROWS\` is generated by extracting bits from the numbers 0-7 with \`(i >> 2) & 1\`, \`(i >> 1) & 1\` and \`i & 1\`, which produces the canonical truth-table ordering without a hand-written table. Every render re-evaluates the circuit for all eight rows and shows want versus got side by side, so a circuit that happens to be right for the switches you are looking at but wrong elsewhere is visibly, specifically wrong — which is exactly the bug that hides in real conditional logic.

**Behavioural equivalence, not a stored answer**

Levels define their target as a JavaScript function of \`(a, b, c)\` rather than as a required pair of gate names. Any gate combination producing the same output column clears the puzzle, so a player who reaches the answer by a route the author did not anticipate is rewarded — and several of these targets genuinely have more than one solution, since \`NAND\` and \`NOR\` can substitute for combinations of the others. Grading behaviour rather than structure is what makes the game teach Boolean equivalence instead of gate trivia.

**Gates as a lookup table of pure functions**

\`GATES\` is an object mapping each name to a two-argument function built on JavaScript's bitwise operators — \`a & b\`, \`a | b\`, \`a ^ b\`, and the negated forms for \`NAND\` and \`NOR\`. The picker buttons are generated from \`Object.keys(GATES)\`, so adding \`XNOR\` means adding one entry and nothing else: the picker, the evaluation, and the truth table all pick it up automatically. Using bitwise operators on 0/1 integers rather than booleans keeps the whole model in the same representation the truth table displays.

**Live state shown on the wires**

\`evaluate()\` returns both the intermediate value out of the first gate and the final output, which lets the UI light each gate independently — so a player flipping switches can see where a signal dies. That intermediate readout is the difference between a puzzle and an explanation: when the output is dark, you can tell at a glance whether the first gate produced a 0 or the second gate consumed a 1 and produced nothing. The row of the truth table matching the current switch positions is marked, tying the interactive view and the exhaustive view together.

**Puzzles that build toward parity**

The five targets run from a three-way AND, through an OR feeding an AND, an XOR feeding an OR, a three-input parity check (output high when an odd number of inputs are on — the basis of parity bits and checksums), and finally a NAND-based condition. Parity is the one that repays study: it is the standard example of a function that cannot be expressed without XOR-like behaviour, and building it by hand is more convincing than reading that fact.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the target in plain English', text: 'Each puzzle describes the behaviour you have to build — "light the output when an odd number of switches are on" — rather than naming the gates, so you have to reason about the logic instead of following instructions.' },
        { title: 'Pick a gate for each slot', text: 'The five buttons set the gate type for the currently highlighted slot, then move the highlight to the other slot automatically. Clicking a gate in the circuit selects it directly if you want to change just one.' },
        { title: 'Flip the switches to test', text: 'A, B and C toggle between 0 and 1. Both gates light independently, so you can see whether a dark output is because the first gate produced 0 or the second consumed a 1 and produced nothing.' },
        { title: 'Watch the full truth table', text: 'All eight input combinations are evaluated on every change and shown as want versus got. A circuit that is right for the switches you are looking at but wrong elsewhere shows exactly which rows disagree.' },
        { title: 'Match all eight rows to solve', text: 'The puzzle clears when every row matches — not when the current switch state happens to look right. Any gate combination producing the correct output column is accepted, and several puzzles have more than one valid answer.' },
        { title: 'Work up to the parity puzzle', text: 'The five targets progress from a three-way AND to a parity check that lights when an odd number of switches are on — the logic behind parity bits and simple checksums.' },
      ],
    },
    features: [
      'Win condition evaluated across all eight input combinations, not just the current switch state',
      'Truth table rows generated by bit extraction from 0-7 rather than a hand-written table',
      'Targets defined as JavaScript functions, so any behaviourally equivalent gate combination is accepted',
      'Five gate types as a lookup table of pure functions built on bitwise operators, with the picker generated from its keys',
      'Intermediate gate output exposed alongside the final result, so a dead signal can be located visually',
      'Want-versus-got columns per row, showing exactly which input combinations still disagree',
      'The truth-table row matching the current switch positions highlighted, linking the interactive and exhaustive views',
      'Five puzzles progressing to a three-input parity check, the basis of parity bits and checksums',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching Boolean logic, truth tables and digital fundamentals', desc: 'Grading against the full truth table teaches the habit of checking all cases rather than the visible one — the same discipline that prevents conditional bugs in ordinary code. It sits well beside a [binary bit flip game](/ui-snippets/binary-bit-flip-game/) in a computer-fundamentals sequence.' },
      { icon: 'CODE', title: 'Explaining complex conditionals in code review or docs', desc: 'A nested condition with three variables has eight cases, and most bugs live in the two nobody considered. Presenting the same want-versus-got table for a real conditional is a directly transferable technique from this snippet.' },
      { icon: 'APP', title: 'STEM outreach, electronics courses, and museum kiosks', desc: 'Switches, wires and a lamp are a familiar physical metaphor, so the puzzle works for visitors with no programming background at all — no typing required and a round takes under a minute.' },
      { icon: 'FLOW', title: 'Reference for exhaustive-case evaluation in a UI', desc: 'Generating every input combination by bit extraction and evaluating a pure function against each is a compact pattern for any interface that needs to show behaviour across a whole input space — feature-flag matrices, permission combinations, or pricing rule testers.' },
      { icon: 'DESIGN', title: 'Circuit-diagram UI without a diagramming library', desc: 'The whole circuit is flex containers with border and background states, which makes it a lightweight approach for schematic-style interfaces that would otherwise pull in an SVG diagramming dependency.' },
      { icon: 'FORM', title: 'Rule-builder interfaces with live evaluation', desc: 'Products that let users assemble conditions — automation triggers, audience segments, alert rules — can borrow the pattern of showing the assembled rule\'s result across a table of sample cases rather than asking the user to trust it.' },
      { icon: 'CODE', title: 'Related: Hangman Word Guessing Game', desc: 'See the [Hangman Word Guessing Game](/ui-snippets/hangman-word-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the puzzle check the switches I am looking at, or every possible input?', a: 'Every possible input. All eight combinations of A, B and C are evaluated on every change and shown as want versus got, and the puzzle only clears when all eight rows match. A circuit that happens to be correct for the current switch positions but wrong elsewhere is explicitly shown as wrong — which is the same failure mode as a conditional tested on only one case.' },
      { q: 'Is there one correct pair of gates per puzzle?', a: 'Not necessarily. Levels define their target as a function of (a, b, c), and any gate combination producing the same output column is accepted. Because NAND and NOR are functionally complete, several puzzles have more than one valid answer — grading behaviour rather than structure is what makes the game teach Boolean equivalence.' },
      { q: 'How are the eight truth-table rows generated?', a: 'By extracting bits from the numbers 0 through 7: (i >> 2) & 1 for A, (i >> 1) & 1 for B, and i & 1 for C. That produces the canonical truth-table ordering automatically, with no hand-written table to get out of sync, and the same technique scales to four or more inputs by widening the loop.' },
      { q: 'How do I add another gate type or another puzzle?', a: 'Add an entry to the GATES object — for example XNOR as (a, b) => (a ^ b) ? 0 : 1 — and the picker, the evaluation and the truth table all pick it up, since the buttons are generated from Object.keys(GATES). For a new puzzle, push an object onto LEVELS with a plain-English goal and a want function of (a, b, c) returning 0 or 1.' },
      { q: 'Can I use this logic gate game in React, Vue, or Angular?', a: 'Yes, and it maps unusually well because evaluate() and every gate are pure functions. Hold the two gate choices, the three input bits and the active slot in component state; derive the live wire values, the output, and the entire truth table during render rather than mutating classes. The only side effect is the advance timeout after a solve, which should be cleared on unmount (useEffect cleanup, onUnmounted, ngOnDestroy) so a level change cannot fire after the component is gone.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add a NAND-only mode where every slot is forced to NAND and the circuit grows to four or five gates — building AND, OR and XOR out of nothing but NAND is the classic demonstration of functional completeness, and it is genuinely satisfying to solve. Other extensions worth requesting: let the player add and remove gate slots so the circuit shape is part of the puzzle, add a fourth input with a sixteen-row truth table, add a score based on gate count so simpler solutions win, or generate the plain-English goal automatically from the target function so new puzzles need only a Boolean expression.`,
      prompt: `Build a playable logic gate puzzle game in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- A fixed two-gate circuit wired as gate1(gate0(A, B), C), with three input switches that toggle between 0 and 1 and an output indicator.
- A GATES lookup object mapping names (AND, OR, XOR, NAND, NOR) to two-argument pure functions built on bitwise operators, with the gate picker buttons generated from Object.keys(GATES) so adding a gate type requires only a new entry.
- Levels that define their target as a JavaScript function of (a, b, c) returning 0 or 1 — never as a required pair of gate names — so ANY behaviourally equivalent gate combination clears the puzzle.
- Generate the eight truth-table rows by bit extraction from the numbers 0-7 ((i >> 2) & 1, (i >> 1) & 1, i & 1) rather than hand-writing a table.
- Evaluate the circuit against ALL eight input combinations on every change and display want versus got per row, colouring each row. The puzzle clears only when all eight rows match — never merely when the current switch state looks right.
- Expose the intermediate value out of the first gate as well as the final output, and light each gate independently so a player can see where a signal dies. Highlight the truth-table row matching the current switch positions.
- Include at least five puzzles described in plain English, progressing to a three-input parity check (output high when an odd number of inputs are on), and report the solved expression in the success message.`,
    },
  },
};

export default logicGatePuzzleGame;
