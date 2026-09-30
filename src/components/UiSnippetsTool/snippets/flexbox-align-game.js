const flexboxAlignGame = {
  id: 'flexbox-align-game',
  title: 'Flexbox Alignment Game',
  lastmod: '2026-08-13',
  category: 'games',
  html: `<div class="demo-wrap">
  <div class="fx-game">
    <div class="fx-head">
      <div class="fx-meta"><span class="fx-label">Level</span><span class="fx-value" id="fxLevel">1 / 6</span></div>
      <div class="fx-meta fx-right"><span class="fx-label">Moves</span><span class="fx-value" id="fxMoves">0</span></div>
    </div>

    <p class="fx-goal" id="fxGoal">Land every ball inside its dashed outline.</p>

    <div class="fx-stage" id="fxStage">
      <div class="fx-layer fx-ghost" id="fxGhost"></div>
      <div class="fx-layer fx-live" id="fxLive"></div>
    </div>

    <div class="fx-controls" id="fxControls">
      <div class="fx-group" data-prop="flexDirection">
        <span class="fx-prop">flex-direction</span>
        <div class="fx-chips">
          <button class="fx-chip is-on" data-value="row">row</button>
          <button class="fx-chip" data-value="column">column</button>
        </div>
      </div>
      <div class="fx-group" data-prop="justifyContent">
        <span class="fx-prop">justify-content</span>
        <div class="fx-chips">
          <button class="fx-chip is-on" data-value="flex-start">flex-start</button>
          <button class="fx-chip" data-value="center">center</button>
          <button class="fx-chip" data-value="flex-end">flex-end</button>
          <button class="fx-chip" data-value="space-between">space-between</button>
        </div>
      </div>
      <div class="fx-group" data-prop="alignItems">
        <span class="fx-prop">align-items</span>
        <div class="fx-chips">
          <button class="fx-chip is-on" data-value="flex-start">flex-start</button>
          <button class="fx-chip" data-value="center">center</button>
          <button class="fx-chip" data-value="flex-end">flex-end</button>
        </div>
      </div>
    </div>

    <pre class="fx-code" id="fxCode"></pre>
    <p class="fx-status" id="fxStatus">Pick values and watch the balls move.</p>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 28px 16px; }

.fx-game {
  width: 100%; max-width: 440px; padding: 20px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  display: flex; flex-direction: column; gap: 14px;
  box-shadow: 0 12px 32px rgba(15,23,42,0.08);
}

.fx-head { display: flex; justify-content: space-between; }
.fx-meta { display: flex; flex-direction: column; gap: 2px; }
.fx-right { align-items: flex-end; }
.fx-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; }
.fx-value { font-size: 16px; font-weight: 800; color: #0f172a; }

.fx-goal {
  font-size: 13.5px; font-weight: 600; color: #334155; line-height: 1.5;
  background: #f8fafc; border-left: 3px solid #0ea5e9; border-radius: 0 8px 8px 0; padding: 10px 12px;
}

.fx-stage {
  position: relative; height: 190px; border-radius: 12px;
  background: repeating-linear-gradient(45deg, #f8fafc 0 10px, #f1f5f9 10px 20px);
  border: 2px solid #e2e8f0; overflow: hidden;
}
.fx-layer { position: absolute; inset: 0; display: flex; padding: 14px; gap: 10px; }
.fx-ghost { pointer-events: none; }

.fx-ball {
  width: 42px; height: 42px; border-radius: 50%; flex: 0 0 auto;
  background: #0ea5e9; box-shadow: 0 4px 12px rgba(14,165,233,0.35);
  transition: all 0.35s cubic-bezier(0.34, 1.4, 0.64, 1);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 13px; font-weight: 800;
}
.fx-slot {
  width: 42px; height: 42px; border-radius: 50%; flex: 0 0 auto;
  border: 2px dashed #94a3b8; background: rgba(148,163,184,0.12);
}
.fx-live.solved .fx-ball { background: #22c55e; box-shadow: 0 4px 14px rgba(34,197,94,0.4); }

.fx-controls { display: flex; flex-direction: column; gap: 10px; }
.fx-group { display: flex; flex-direction: column; gap: 5px; }
.fx-prop { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; font-weight: 700; color: #64748b; }
.fx-chips { display: flex; flex-wrap: wrap; gap: 5px; }
.fx-chip {
  padding: 6px 10px; border-radius: 7px; border: 1.5px solid #e2e8f0; background: #f8fafc;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; font-weight: 600;
  color: #475569; cursor: pointer; transition: all 0.12s;
}
.fx-chip:hover { border-color: #0ea5e9; color: #0ea5e9; }
.fx-chip.is-on { background: #0ea5e9; border-color: #0ea5e9; color: #fff; }

.fx-code {
  background: #0f172a; border-radius: 10px; padding: 12px; color: #cbd5e1;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; line-height: 1.6;
  white-space: pre; overflow-x: auto;
}

.fx-status { font-size: 12px; font-weight: 600; color: #64748b; min-height: 18px; }
.fx-status.ok { color: #16a34a; }`,

  js: `var LEVELS = [
  { balls: 3, goal: 'Push all three balls to the far end of the row.', solution: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' } },
  { balls: 3, goal: 'Centre the row both horizontally and vertically.', solution: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } },
  { balls: 3, goal: 'Spread the balls edge to edge along the bottom.', solution: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' } },
  { balls: 2, goal: 'Stack them vertically, hugging the top-right corner.', solution: { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end' } },
  { balls: 3, goal: 'Stack them in a column, spread top to bottom, centred across.', solution: { flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' } },
  { balls: 2, goal: 'Column again — bottom of the stage, hard left.', solution: { flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start' } },
];

var TOLERANCE = 6;   // px of slop allowed between a ball centre and its slot centre

var ghost = document.getElementById('fxGhost');
var live = document.getElementById('fxLive');
var goalEl = document.getElementById('fxGoal');
var codeEl = document.getElementById('fxCode');
var statusEl = document.getElementById('fxStatus');
var levelEl = document.getElementById('fxLevel');
var movesEl = document.getElementById('fxMoves');

var index = 0;
var moves = 0;
var locked = false;
var state = { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' };

function level() { return LEVELS[index]; }

function applyStyles(el, styles) {
  el.style.flexDirection = styles.flexDirection;
  el.style.justifyContent = styles.justifyContent;
  el.style.alignItems = styles.alignItems;
}

function fillLayer(el, count, cls, labelled) {
  el.innerHTML = '';
  for (var i = 0; i < count; i++) {
    var node = document.createElement('div');
    node.className = cls;
    if (labelled) node.textContent = i + 1;
    el.appendChild(node);
  }
}

function renderCode() {
  codeEl.textContent = '.container {\\n  display: flex;\\n  flex-direction: ' + state.flexDirection +
    ';\\n  justify-content: ' + state.justifyContent +
    ';\\n  align-items: ' + state.alignItems + ';\\n}';
}

function syncChips() {
  var groups = document.querySelectorAll('.fx-group');
  Array.prototype.forEach.call(groups, function (group) {
    var prop = group.dataset.prop;
    Array.prototype.forEach.call(group.querySelectorAll('.fx-chip'), function (chip) {
      chip.classList.toggle('is-on', chip.dataset.value === state[prop]);
    });
  });
}

function centres(layer) {
  return Array.prototype.map.call(layer.children, function (el) {
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
}

// Win check is positional, not property-based: every ball centre must sit
// within TOLERANCE of a slot centre, so any styles that land them count.
function isSolved() {
  var balls = centres(live);
  var slots = centres(ghost);
  if (balls.length !== slots.length) return false;
  return balls.every(function (b) {
    return slots.some(function (s) {
      return Math.abs(b.x - s.x) <= TOLERANCE && Math.abs(b.y - s.y) <= TOLERANCE;
    });
  });
}

function setStatus(msg, kind) {
  statusEl.textContent = msg;
  statusEl.className = 'fx-status' + (kind ? ' ' + kind : '');
}

function evaluate() {
  // Wait a frame so the transition-independent layout is measurable.
  requestAnimationFrame(function () {
    if (locked) return;
    if (!isSolved()) return;
    locked = true;
    live.classList.add('solved');
    if (index === LEVELS.length - 1) {
      setStatus('Solved in ' + moves + ' moves — all six levels cleared!', 'ok');
      setTimeout(function () { index = 0; moves = 0; loadLevel(); }, 1800);
    } else {
      setStatus('Solved! Next level…', 'ok');
      setTimeout(function () { index++; loadLevel(); }, 1000);
    }
  });
}

function loadLevel() {
  var lv = level();
  locked = false;
  live.classList.remove('solved');
  goalEl.textContent = lv.goal;
  levelEl.textContent = (index + 1) + ' / ' + LEVELS.length;
  movesEl.textContent = moves;

  fillLayer(ghost, lv.balls, 'fx-slot', false);
  fillLayer(live, lv.balls, 'fx-ball', true);
  applyStyles(ghost, lv.solution);

  state = { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' };
  applyStyles(live, state);
  syncChips();
  renderCode();
  setStatus('Pick values and watch the balls move.', '');
}

document.getElementById('fxControls').addEventListener('click', function (e) {
  var chip = e.target.closest('.fx-chip');
  if (!chip || locked) return;
  var prop = chip.closest('.fx-group').dataset.prop;
  if (state[prop] === chip.dataset.value) return;
  state[prop] = chip.dataset.value;
  moves++;
  movesEl.textContent = moves;
  applyStyles(live, state);
  syncChips();
  renderCode();
  evaluate();
});

window.addEventListener('resize', function () { if (!locked) evaluate(); });

loadLevel();`,

  seo: {
    title: 'Flexbox Alignment Game — Free HTML CSS JS Snippet',
    description: 'Land balls on their targets by picking real flex properties, with position-based win detection. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Flexbox Alignment Game — Ghost-Layer Targets, Position-Based Win Detection & Live Generated CSS',
      description: `Flexbox is learned by watching things move, not by reading property tables, and the fastest way to build that intuition is a tight loop: change one value, see the layout react immediately, and know instantly whether the result is right. This snippet is a playable flexbox trainer built around exactly that loop — a stage with dashed target slots, a row of chips for \`flex-direction\`, \`justify-content\` and \`align-items\`, and balls that animate to their new positions the moment a value changes, with the equivalent CSS rule printed live underneath.

**Targets drawn by flexbox itself, not by hardcoded coordinates**

The stage holds two absolutely positioned layers of identical size. The lower one, the ghost layer, is a flex container filled with dashed \`.fx-slot\` circles and given the level's solution styles; the upper one holds the real \`.fx-ball\` elements and receives whatever the player has selected. Because the target positions are produced by applying real flex properties to a real container rather than by storing pixel coordinates, they stay correct at every stage width, on every device, and after any resize — there is no coordinate table to fall out of sync with the CSS. Adding a level means writing one solution object, not measuring anything.

**Winning is positional, so alternative routes are accepted**

\`isSolved()\` never compares the player's chosen property values against the level's solution object. It measures both layers with \`getBoundingClientRect()\`, reduces each element to its centre point, and requires every ball centre to sit within a six-pixel tolerance of some slot centre. That means any combination of properties that genuinely lands the balls on their targets counts as a win — which is the honest definition of "did you solve the layout" and prevents the game from teaching one memorised answer per level. The tolerance exists because flex distribution produces sub-pixel fractional positions that will not compare exactly equal, and because a strict equality check would fail intermittently at certain container widths.

**Measuring at the right moment**

Setting \`justifyContent\` on the live layer changes layout synchronously, but the check runs inside a \`requestAnimationFrame\` callback so measurement happens after the browser has settled the new layout rather than in the middle of the same task that mutated it. The balls animate to their new positions with a springy \`cubic-bezier\` transition, but the check deliberately does not wait for that animation: \`getBoundingClientRect()\` on a transitioning element returns its live interpolated box, so waiting for the transition would only delay the verdict, while measuring the settled layout box immediately is both correct and instant.

**Generated CSS as the real reward**

Every change re-renders a code panel containing the exact rule the player has constructed — \`display: flex\` plus the three chosen properties, formatted as copy-ready CSS. This is what converts play into transferable knowledge: the player ends each level looking at the declaration block that produced the layout they just built, in the same syntax they will type into a real stylesheet.

**State kept in one object, chips derived from it**

A single \`state\` object holds the three current values, and \`syncChips()\` re-derives which chip in each group is active by comparing \`chip.dataset.value\` against \`state[prop]\`. Nothing tracks selection independently in the DOM, so the visual state of the controls cannot drift from the styles actually applied to the layer — the same one-way data-flow discipline a framework would enforce, implemented in a dozen lines of vanilla JavaScript. A move counter increments only when a chip changes the value rather than on every click, so re-clicking the already-active option costs nothing.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the goal and find the dashed slots', text: 'Each level states its objective in plain English and draws dashed circles where the balls need to end up. Those slots are positioned by real flex properties on a hidden ghost layer, so they sit correctly at any stage size.' },
        { title: 'Pick a flex-direction', text: 'Switching between row and column changes which axis is the main axis — and therefore what justify-content and align-items each control. Levels 4 through 6 only solve in column mode, which is the fastest way to internalise the axis swap.' },
        { title: 'Choose justify-content and align-items', text: 'Every chip applies its value to the live layer immediately and the balls animate to their new positions with a spring transition, so you see the effect of a single property change in isolation.' },
        { title: 'Read the generated CSS', text: 'The dark code panel always shows the exact rule you have built — display: flex plus your three current values — formatted as a copy-ready declaration block, so the layout and the syntax stay connected.' },
        { title: 'Land every ball to advance', text: 'The win check measures both layers with getBoundingClientRect() and requires each ball centre within six pixels of a slot centre. Any property combination that genuinely lands them counts, and the balls turn green when the level is solved.' },
        { title: 'Watch your move count', text: 'The counter increments only when a chip actually changes a value, not on every click. Clearing all six levels in as few moves as possible is the natural replay goal once you know the properties.' },
      ],
    },
    features: [
      'Target positions generated by applying real flex properties to a ghost layer — no hardcoded pixel coordinates',
      'Position-based win detection via getBoundingClientRect() centre comparison, accepting any property set that lands the balls',
      'Six-pixel tolerance that absorbs the sub-pixel fractions flex distribution produces',
      'Layout measured inside requestAnimationFrame so the check runs after the browser settles the new layout',
      'Live-generated CSS declaration block showing the exact rule the player has constructed',
      'Single state object as the source of truth, with chip active states re-derived from it on every change',
      'Six levels ramping across both axes, including three that only solve in column mode',
      'Move counter that ignores no-op clicks on the already-selected value',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching flexbox in a course, workshop, or internal onboarding', desc: 'The generated CSS panel means every solved level ends with the learner looking at real syntax rather than a game abstraction. Follow it with a [flexbox alignment visualizer](/ui-snippets/flexbox-alignment-visualizer/) for a reference view once the intuition is in place.' },
      { icon: 'CODE', title: 'Interactive documentation for a layout or design system', desc: 'Docs that explain layout primitives benefit enormously from a play surface. Dropping a challenge like this into a layout page lets readers build the alignment they are reading about instead of scrolling past another static diagram.' },
      { icon: 'FLOW', title: 'Reference for ghost-layer target patterns in any drag or placement UI', desc: 'The two-layer approach — a non-interactive layer showing where things should be, a live layer showing where they are, and a measured comparison between them — is directly reusable for drag-and-drop puzzles, seat-selection UIs, and layout builders with snap targets.' },
      { icon: 'APP', title: 'Developer-audience marketing or recruitment page', desc: 'A short CSS challenge on a careers or product page speaks to front-end developers in their own language, and sits naturally alongside other learn-by-playing snippets such as the [CSS Selector Challenge Game](/ui-snippets/css-selector-challenge-game/).' },
      { icon: 'DESIGN', title: 'Pattern for measured, tolerance-based hit testing', desc: 'Any interface that asks "is this close enough to correct" — puzzle games, alignment tools, gesture targets — needs a deliberate tolerance rather than exact equality. This snippet is a compact demonstration of choosing and applying one against live geometry.' },
      { icon: 'FORM', title: 'Property-chip control pattern for style editors', desc: 'The chip groups here are a working model for any visual style editor: a data-prop attribute per group, values in data attributes, one delegated click handler, and active state re-derived from a single state object rather than tracked in the DOM.' },
    ],
    faqs: [
      { q: 'Does the game check my property values or where the balls end up?', a: 'Where they end up. isSolved() measures both layers with getBoundingClientRect(), reduces every element to its centre, and requires each ball centre within six pixels of a slot centre. The level solution object is used only to style the ghost targets, never compared against your selections — so any combination that lands the balls correctly is accepted.' },
      { q: 'Why is there a six-pixel tolerance instead of an exact position match?', a: 'Flex distribution routinely produces fractional pixel positions (a container width that does not divide evenly across items, for example), so ball and slot centres would rarely be exactly equal even when the layout is visually identical. A small tolerance absorbs that sub-pixel noise while still being far tighter than the gap between any two distinct alignment values.' },
      { q: 'Why measure inside requestAnimationFrame rather than immediately?', a: 'Setting a style property and reading geometry in the same task can measure a layout the browser has not finished settling. Deferring the read to the next animation frame guarantees the new layout is in place. Note the check does not wait for the CSS transition to finish — getBoundingClientRect() returns the interpolated box mid-transition, so waiting would only delay the verdict without changing it.' },
      { q: 'How do I add my own levels?', a: 'Push an object onto the LEVELS array with three keys: balls (how many items), goal (the plain-English instruction), and solution (an object with flexDirection, justifyContent and alignItems). The ghost layer is styled with that solution object, so the dashed targets position themselves — you never need to compute or store coordinates.' },
      { q: 'Can I use this flexbox game in React, Vue, or Angular?', a: 'Yes. Keep the LEVELS array in a module, hold the three property values in component state, and bind them straight to the live layer\'s style object so the framework handles the style updates. Put the getBoundingClientRect() comparison in an effect that runs after the style change commits — useEffect in React, watch plus nextTick in Vue, ngAfterViewChecked or a signal effect in Angular — using refs to both layers rather than getElementById, and remember to remove the resize listener on unmount.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to extend the control set with align-self on individual balls, which introduces the idea that one item can opt out of the container's cross-axis alignment — the concept that trips up most people learning flexbox. Other good extensions: add flex-wrap levels where the stage is deliberately too narrow, add a par-moves target per level so players optimise rather than brute-force, add a "show me" button that animates the ghost solution's properties one at a time with the code panel narrating each change, or port the same ghost-layer-and-measure architecture to a CSS Grid version using grid-column, grid-row and place-items.`,
      prompt: `Build a playable flexbox alignment game in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- A stage containing two absolutely positioned, identically sized layers: a non-interactive "ghost" layer of dashed target slots, and a live layer of coloured balls.
- A levels array where each level is a data object with a ball count, a plain-English goal, and a solution object of flex property values. Style the ghost layer with the solution object so the targets are positioned by real flexbox — never by hardcoded pixel coordinates.
- Control chips for flex-direction (row/column), justify-content (flex-start/center/flex-end/space-between) and align-items (flex-start/center/flex-end), applied to the live layer immediately on click, with the balls animating to their new positions.
- Detect a win positionally, not by comparing property values: measure both layers with getBoundingClientRect(), reduce each element to its centre point, and require every ball centre within a small pixel tolerance of a slot centre — so any property combination that genuinely lands the balls is accepted.
- Run the measurement inside requestAnimationFrame so it happens after the browser settles the new layout, and re-check on window resize.
- Print a live, copy-ready CSS declaration block showing display: flex plus the three currently selected values, updating on every change.
- Keep the three values in one state object and re-derive which chip is active from it, so the controls can never disagree with the applied styles. Count a move only when a click actually changes a value.
- Include at least six levels, several of which are only solvable in column mode so the player has to internalise the main-axis/cross-axis swap.`,
    },
  },
};

export default flexboxAlignGame;
