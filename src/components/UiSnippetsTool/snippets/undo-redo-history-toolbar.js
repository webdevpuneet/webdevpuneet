const undoRedoHistoryToolbar = {
  id: 'undo-redo-history-toolbar',
  title: 'Undo/Redo History Toolbar with Jump-to-State',
  lastmod: '2026-08-28',
  category: 'misc',
  html: `<div class="demo">
  <div class="undo-toolbar">
    <button class="undo-btn" id="undoBtn" aria-label="Undo" disabled>
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M3 13a9 9 0 1 0 3-7"/></svg>
    </button>
    <button class="undo-btn" id="redoBtn" aria-label="Redo" disabled>
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"/><path d="M21 13a9 9 0 1 1-3-7"/></svg>
    </button>
    <div class="undo-sep"></div>
    <button class="hist-toggle" id="histToggle">History (<span id="histCount">0</span>)</button>
  </div>

  <div class="canvas-area" id="canvasArea">
    <p class="canvas-hint">Click anywhere to add a shape. Use Undo/Redo or Ctrl/Cmd+Z / Ctrl/Cmd+Shift+Z.</p>
  </div>

  <ul class="hist-list" id="histList" hidden></ul>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 420px; max-width: 100%; display: flex; flex-direction: column; gap: 10px; }

.undo-toolbar { display: flex; align-items: center; gap: 4px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 5px; width: fit-content; }
.undo-btn { width: 30px; height: 30px; border: none; background: transparent; border-radius: 7px; color: #475569; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.undo-btn:hover:not(:disabled) { background: #f1f5f9; color: #334155; }
.undo-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.undo-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 1px; }
.undo-sep { width: 1px; height: 20px; background: #e2e8f0; margin: 0 2px; }
.hist-toggle { border: none; background: transparent; color: #6366f1; font-size: 11.5px; font-weight: 700; padding: 6px 10px; border-radius: 7px; cursor: pointer; font-family: inherit; }
.hist-toggle:hover { background: #eef2ff; }

.canvas-area { position: relative; height: 220px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; cursor: crosshair; overflow: hidden; }
.canvas-hint { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: 11.5px; color: #cbd5e1; text-align: center; pointer-events: none; width: 200px; }
.shape { position: absolute; width: 26px; height: 26px; border-radius: 8px; background: #6366f1; transform: translate(-50%,-50%); }

.hist-list { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 6px; display: flex; flex-direction: column; gap: 2px; max-height: 160px; overflow-y: auto; list-style: none; }
.hist-list li button { width: 100%; text-align: left; padding: 7px 10px; border: none; background: transparent; border-radius: 7px; font-size: 12px; color: #64748b; cursor: pointer; font-family: inherit; display: flex; justify-content: space-between; }
.hist-list li button:hover { background: #f8fafc; }
.hist-list li button.current { background: #eef2ff; color: #4338ca; font-weight: 700; }
.hist-step-num { color: #cbd5e1; font-size: 10.5px; }
.hist-list li button.current .hist-step-num { color: #a5b4fc; }`,
  js: `const canvasArea = document.getElementById('canvasArea');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const histToggle = document.getElementById('histToggle');
const histCount = document.getElementById('histCount');
const histList = document.getElementById('histList');

// The history model: an array of past states plus a pointer into it. This
// is the standard "undo stack with a cursor" pattern — undo/redo never
// mutate past entries, they only MOVE the pointer, and adding a new action
// after having undone some steps discards the now-abandoned "future" branch
// rather than trying to preserve it as a second timeline.
let history = [[]]; // each entry is a full snapshot: an array of {x, y} shape positions
let pointer = 0;

function currentState() {
  return history[pointer];
}

function render() {
  canvasArea.querySelectorAll('.shape').forEach((el) => el.remove());
  currentState().forEach((pos) => {
    const shape = document.createElement('div');
    shape.className = 'shape';
    shape.style.left = pos.x + 'px';
    shape.style.top = pos.y + 'px';
    canvasArea.appendChild(shape);
  });

  undoBtn.disabled = pointer === 0;
  redoBtn.disabled = pointer === history.length - 1;
  histCount.textContent = String(history.length - 1);
  renderHistoryList();
}

function renderHistoryList() {
  histList.innerHTML = history.map((state, i) => \`
    <li>
      <button class="\${i === pointer ? 'current' : ''}" data-step="\${i}">
        <span>\${i === 0 ? 'Empty canvas' : \`\${state.length} shape\${state.length > 1 ? 's' : ''}\`}</span>
        <span class="hist-step-num">#\${i}</span>
      </button>
    </li>
  \`).join('');
}

function pushState(newState) {
  // Discard any "redo" branch beyond the current pointer before appending —
  // once a new action happens after undoing, the old redo-able future is no
  // longer reachable, matching how every real undo/redo system behaves.
  history = history.slice(0, pointer + 1);
  history.push(newState);
  pointer = history.length - 1;
  render();
}

canvasArea.addEventListener('click', (e) => {
  if (e.target !== canvasArea) return; // ignore clicks on shapes/hint, only the empty canvas adds a new one
  const rect = canvasArea.getBoundingClientRect();
  const newShape = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  pushState([...currentState(), newShape]);
});

function undo() {
  if (pointer === 0) return;
  pointer -= 1;
  render();
}

function redo() {
  if (pointer === history.length - 1) return;
  pointer += 1;
  render();
}

undoBtn.addEventListener('click', undo);
redoBtn.addEventListener('click', redo);

histToggle.addEventListener('click', () => { histList.hidden = !histList.hidden; });

histList.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-step]');
  if (!btn) return;
  // Jumping directly to any point in history just moves the pointer — no
  // special-casing needed versus a single-step undo/redo, since both are
  // really the same operation (move the pointer, re-render) at heart.
  pointer = parseInt(btn.dataset.step, 10);
  render();
});

document.addEventListener('keydown', (e) => {
  const isMod = e.metaKey || e.ctrlKey;
  if (!isMod || e.key.toLowerCase() !== 'z') return;
  e.preventDefault();
  if (e.shiftKey) redo(); else undo();
});

render();`,
  seo: {
    title: 'Undo/Redo History Toolbar with Jump-to-Any-State',
    description: 'A real undo/redo implementation built on a state-snapshot array with a pointer, supporting standard undo/redo, keyboard shortcuts, and a history list letting users jump directly to any prior state — with the correct "discard future on new action" branching behavior.',
    about: {
      title: 'Undo/Redo History — The Pointer-Into-a-Snapshot-Array Pattern',
      description: `A genuinely correct undo/redo implementation is a specific, well-understood pattern — not a stack of "reverse operations" that has to be carefully written for every possible action type. This snippet implements the simpler, more robust version: an array of full state snapshots, plus a single integer pointer into that array. Every operation — undo, redo, or jumping to an arbitrary point in history — reduces to nothing more than moving the pointer and re-rendering.

**Why snapshots, not "reverse operations"**

A tempting alternative design stores each action as an *inverse* operation (e.g. "delete the last shape" as the undo for "add a shape") — but this requires writing and maintaining a correct inverse for every single action type in the app, and inverses can be genuinely hard to get right for complex or composite actions. Storing a full snapshot of the *entire relevant state* after every action sidesteps this completely: undoing is never "run the opposite operation," it's simply "look at what the state used to be, one step back," which is trivially correct by construction no matter how complex an individual action was.

**The pointer, not the array length, defines "where you are"**

\`pointer\` is a separate integer tracking the currently-displayed index into \`history\`, distinct from the array's own length. \`undo()\` and \`redo()\` do nothing more than decrement or increment \`pointer\` (bounded at the array's edges) and call \`render()\` — there's no separate "apply the inverse" logic, because \`render()\` always just displays whatever full snapshot lives at \`history[pointer]\`.

**Why a new action must discard the "future" branch**

\`pushState()\` calls \`history.slice(0, pointer + 1)\` *before* appending the new state — this is the detail that makes branching behave correctly. If a user undoes three steps and then performs a brand-new action, the three steps they'd undone past are no longer reachable via redo; they represent an abandoned timeline the new action has now diverged from. Without this truncation, the old "future" states would linger in the array past the new action, and redo could jump to a state that's no longer consistent with what's actually been done since.

**Jumping to an arbitrary history entry is not a special case**

The history list lets a user click any past entry and jump straight to it — implemented as nothing more than setting \`pointer\` directly to that entry's index and calling \`render()\`, the exact same two operations \`undo()\`/\`redo()\` perform. This is a direct consequence of the pointer-into-an-array design: there's no meaningful difference between "move the pointer back one step" and "move the pointer back five steps," so no separate jump-specific logic is needed at all.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click anywhere on the canvas', text: 'Adds a new shape and pushes a new state snapshot onto the history array, moving the pointer to it.' },
        { title: 'Click Undo (or press Ctrl/Cmd+Z)', text: 'Moves the pointer back one step and re-renders whatever snapshot lives there — the most recently added shape disappears.' },
        { title: 'Click Redo (or press Ctrl/Cmd+Shift+Z)', text: 'Moves the pointer forward one step, restoring whatever was undone, as long as no new action has happened since.' },
        { title: 'Add a new shape after undoing', text: 'The abandoned "future" states are discarded — redo is no longer available past this new action, matching standard undo/redo behavior everywhere.' },
        { title: 'Open the History panel and click any entry', text: 'Jumps the pointer directly to that specific point in history — implemented as exactly the same operation undo/redo use internally.' },
      ],
    },
    features: [
      'Built on the standard snapshot-array-plus-pointer pattern, not fragile per-action "inverse operation" logic',
      'Undo, redo, and jump-to-any-history-entry are all the same underlying operation: move the pointer, re-render',
      'Correctly discards the abandoned "future" branch when a new action happens after undoing, matching standard undo/redo behavior',
      'Full keyboard shortcut support: Ctrl/Cmd+Z for undo, Ctrl/Cmd+Shift+Z for redo',
      'Toggleable history list showing every past state with a one-click jump to any specific point',
      'Undo/redo buttons correctly disable themselves at the boundaries of available history',
      'Zero per-action-type special-casing required — the same logic handles any number of distinct action types uniformly',
    ],
    useCases: [
      { icon: 'EDITOR', title: 'Canvas, drawing, and design tools', desc: 'Any tool where users place, move, or modify visual elements benefits directly from this exact snapshot-based undo model.' },
      { icon: 'FORM', title: 'Complex multi-field form editors', desc: 'Form builders or content editors with many possible edit actions benefit from snapshot-based undo over maintaining inverse operations per field type.' },
      { icon: 'TEXT', title: 'Rich text and document editors', desc: 'Document state snapshots (even if throttled/coalesced for typing) follow the same pointer-based undo/redo architecture.' },
      { icon: 'GAME', title: 'Turn-based game state history', desc: 'Games with a turn history benefit from the same jump-to-any-point pattern, letting a player review or rewind to any prior turn.' },
      { icon: 'CODE', title: 'Related: Environment Badge', desc: 'See the [Environment Badge](/ui-snippets/environment-badge/) for a related misc pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Timezone Meeting Overlap Finder', desc: 'See the [Timezone Meeting Overlap Finder](/ui-snippets/timezone-meeting-overlap-finder/) for a related misc pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why store full state snapshots instead of a list of reverse operations?', a: 'Reverse-operation undo requires writing and correctly maintaining an inverse for every distinct action type in the app, which becomes error-prone for complex actions. Full snapshots sidestep this entirely — undoing is just "display what the state was one step back," which is correct by construction regardless of how complicated the action that produced each state was.' },
      { q: 'What happens if I undo several steps and then perform a new action?', a: 'The history array is truncated to everything up to and including the current pointer position before the new state is appended — the abandoned "future" states (everything you had undone past) are discarded, and redo is no longer available past the new action, exactly matching how undo/redo behaves in real applications.' },
      { q: 'Is jumping to an arbitrary history entry implemented differently from undo/redo?', a: 'No — it uses the exact same underlying mechanism: setting the pointer to a specific index and re-rendering. There is no separate jump-specific code path, since moving the pointer by one step (undo/redo) and moving it by several steps (a history-list jump) are fundamentally the same operation.' },
      { q: 'Does this scale well for actions that happen very frequently, like typing?', a: 'For high-frequency actions like keystrokes, a real implementation typically coalesces rapid successive changes into a single history entry (for example, committing a new snapshot only after a pause in typing) rather than pushing a new full snapshot per keystroke — the underlying pointer/array pattern stays the same either way.' },
      { q: 'What determines when the Undo and Redo buttons are disabled?', a: 'Undo disables when the pointer is at index 0 (the very first, empty state) — there\'s nothing earlier to move back to. Redo disables when the pointer is at the last index in the history array — there\'s no "future" state beyond the current one to move forward to.' },
      { q: 'How would I adapt this for a real design tool with move/resize/delete actions, not just adding shapes?', a: 'Keep the same pattern — every action (move, resize, delete, add) simply computes and pushes a new full snapshot of the relevant state after that action, exactly like the single addShape action does here. No per-action-type undo logic needs to be written.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain in detail why the snapshot-array-plus-pointer undo pattern avoids the correctness problems of a reverse-operations approach, and to walk through exactly what happens to the history array's contents when a new action is pushed after several undo steps. It's also worth asking for a version that coalesces rapid successive actions (like fast typing) into fewer history entries to avoid an excessively long, granular history, or one that caps the maximum history length and discards the oldest entries once that cap is exceeded.`,
      prompt: `Build an undo/redo history toolbar in HTML, CSS, and vanilla JavaScript — no external library.

Requirements:
- A simple interactive canvas area where clicking adds a new visual element (like a small shape) at the click position, and a toolbar with Undo and Redo buttons plus a keyboard shortcut (Ctrl/Cmd+Z for undo, Ctrl/Cmd+Shift+Z for redo).
- Implement the undo/redo system using an array of full state snapshots (not a list of reverse/inverse operations per action type) plus a single pointer index into that array — every state-changing action must push a complete new snapshot onto the array.
- Undo and redo must both work by simply moving the pointer backward or forward by one and re-rendering whatever full snapshot is at that new pointer position — there should be no separate "apply the inverse of this specific action" logic anywhere.
- When a new action is performed after the user has undone one or more steps, correctly discard the now-abandoned "future" portion of the history array (everything beyond the current pointer) before appending the new state, so redo is no longer available past that new action.
- Include a toggleable history panel listing every past state, where clicking any entry jumps the pointer directly to that point in history using the exact same underlying mechanism as a single undo or redo step (not separate jump-specific logic).
- Disable the Undo button when the pointer is at the very first history entry, and disable the Redo button when the pointer is at the very last entry.`,
    },
  },
};

export default undoRedoHistoryToolbar;
