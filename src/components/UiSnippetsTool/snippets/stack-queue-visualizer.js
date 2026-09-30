const stackQueueVisualizer = {
  id: 'stack-queue-visualizer',
  title: 'Stack vs Queue Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="sq-wrap">
  <div class="sq-toolbar">
    <button class="sq-btn sq-btn-primary" id="sq-add">Add random item to both</button>
  </div>
  <div class="sq-boards">
    <div class="sq-board">
      <div class="sq-board-title">Stack <span class="sq-tag">LIFO</span></div>
      <div class="sq-stack-col" id="sq-stack-col"></div>
      <div class="sq-board-controls">
        <button class="sq-btn" id="sq-pop">Pop (top)</button>
      </div>
      <div class="sq-hint">Last item in comes out first — pop removes from the top.</div>
    </div>
    <div class="sq-board">
      <div class="sq-board-title">Queue <span class="sq-tag sq-tag-alt">FIFO</span></div>
      <div class="sq-queue-row" id="sq-queue-row"></div>
      <div class="sq-board-controls">
        <button class="sq-btn" id="sq-dequeue">Dequeue (front)</button>
      </div>
      <div class="sq-hint">First item in comes out first — dequeue removes from the front.</div>
    </div>
  </div>
  <div class="sq-log-title">Operation history</div>
  <div class="sq-log" id="sq-log"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.sq-wrap { width: 100%; max-width: 720px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; }

.sq-toolbar { margin-bottom: 16px; }
.sq-btn { font-size: 12.5px; font-weight: 700; padding: 9px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: #fff; color: #374151; cursor: pointer; transition: all 0.15s; }
.sq-btn:hover { border-color: #cbd5e1; background: #f8fafc; }
.sq-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.sq-btn-primary { background: #6366f1; border-color: #6366f1; color: #fff; }
.sq-btn-primary:hover { background: #4f46e5; }

.sq-boards { display: grid; grid-template-columns: 1fr 1.4fr; gap: 16px; margin-bottom: 16px; }
.sq-board { background: #f8fafc; border: 1px solid #eef2f7; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; }
.sq-board-title { font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
.sq-tag { font-size: 10px; font-weight: 700; color: #6366f1; background: #eef2ff; padding: 2px 7px; border-radius: 999px; letter-spacing: 0.04em; }
.sq-tag-alt { color: #7c3aed; background: #f5f3ff; }

.sq-stack-col { position: relative; height: 230px; width: 100px; margin: 0 auto 10px; }
.sq-queue-row { position: relative; height: 230px; width: 100%; margin-bottom: 10px; }

.sq-item { position: absolute; width: 84px; height: 40px; border-radius: 8px; background: #6366f1; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; font-family: ui-monospace, monospace; box-shadow: 0 3px 9px rgba(99,102,241,0.28); transition: left 0.32s cubic-bezier(.2,.8,.2,1), bottom 0.32s cubic-bezier(.2,.8,.2,1), opacity 0.22s ease, transform 0.22s ease; }
.sq-item.entering { opacity: 0; transform: scale(0.6); }
.sq-item.leaving { opacity: 0; transform: scale(0.55); }
.sq-item.queue-item { background: #8b5cf6; }

.sq-board-controls { display: flex; justify-content: center; margin-bottom: 8px; }
.sq-hint { font-size: 11px; color: #94a3b8; text-align: center; }

.sq-log-title { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; }
.sq-log { display: flex; flex-direction: column-reverse; gap: 3px; max-height: 100px; overflow-y: auto; font-family: ui-monospace, monospace; font-size: 11.5px; color: #64748b; }
.sq-log-entry { padding: 2px 0; border-bottom: 1px dashed #f1f5f9; }

@media (max-width: 560px) { .sq-boards { grid-template-columns: 1fr; } }`,
  js: `const ITEM_H = 46;
const ITEM_W = 92;

const stack = [];
const queue = [];
let counter = 0;

function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

function log(text) {
  const box = document.getElementById('sq-log');
  const entry = document.createElement('div');
  entry.className = 'sq-log-entry';
  entry.textContent = text;
  box.appendChild(entry);
}

function randomValue() {
  const letters = 'ABCDEFGHJKMNPQR';
  return letters[Math.floor(Math.random() * letters.length)] + (counter++ % 100);
}

function layoutStack() {
  const col = document.getElementById('sq-stack-col');
  stack.forEach((entry, i) => {
    entry.el.style.bottom = (i * ITEM_H) + 'px';
    entry.el.style.left = '8px';
  });
}

function layoutQueue() {
  queue.forEach((entry, i) => {
    entry.el.style.left = (i * ITEM_W + 6) + 'px';
    entry.el.style.bottom = '95px';
  });
}

function makeItem(value, cls) {
  const el = document.createElement('div');
  el.className = 'sq-item entering' + (cls ? ' ' + cls : '');
  el.textContent = value;
  return el;
}

async function pushStack(value) {
  const el = makeItem(value);
  document.getElementById('sq-stack-col').appendChild(el);
  const entry = { value, el };
  stack.push(entry);
  layoutStack();
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('entering')));
  await wait(60);
}

async function popStack() {
  if (!stack.length) { log('pop() -> stack is empty'); return; }
  const entry = stack.pop();
  entry.el.classList.add('leaving');
  log('pop() -> ' + entry.value + ' (removed from top)');
  await wait(220);
  entry.el.remove();
}

async function enqueueQueue(value) {
  const el = makeItem(value, 'queue-item');
  document.getElementById('sq-queue-row').appendChild(el);
  const entry = { value, el };
  queue.push(entry);
  layoutQueue();
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('entering')));
  await wait(60);
}

async function dequeueQueue() {
  if (!queue.length) { log('dequeue() -> queue is empty'); return; }
  const entry = queue.shift();
  entry.el.classList.add('leaving');
  log('dequeue() -> ' + entry.value + ' (removed from front)');
  await wait(220);
  entry.el.remove();
  layoutQueue();
}

let busy = false;

async function addBoth() {
  if (busy) return;
  busy = true;
  const value = randomValue();
  log('push(' + value + ') + enqueue(' + value + ') -> added to both structures');
  await Promise.all([pushStack(value), enqueueQueue(value)]);
  busy = false;
}

document.getElementById('sq-add').addEventListener('click', addBoth);
document.getElementById('sq-pop').addEventListener('click', () => { if (!busy) popStack(); });
document.getElementById('sq-dequeue').addEventListener('click', () => { if (!busy) dequeueQueue(); });

log('Click "Add random item to both" a few times, then Pop and Dequeue to compare orders.');`,
  seo: {
    title: 'Stack vs Queue Visualizer — Free HTML CSS JS Snippet',
    description: 'Animated LIFO stack and FIFO queue share the same pushed values so you can watch pop and dequeue diverge. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Stack vs Queue Visualizer — Side-by-Side LIFO and FIFO Animation Sharing the Same Input Sequence',
      description: `LIFO and FIFO are usually explained with two separate, unrelated diagrams, which makes it easy to recite "stacks are last-in-first-out, queues are first-in-first-out" without ever building an intuition for what that actually means for a real sequence of operations. This snippet fixes that by feeding the exact same sequence of pushed values into a Stack and a Queue simultaneously, then letting you remove from each independently — after a handful of operations the two structures visibly hold different remaining items in a different order, which is the entire concept made concrete instead of abstract.

**One shared input, two independent backing arrays**

Under the hood there are two completely separate JavaScript arrays, \`stack\` and \`queue\`, each holding \`{ value, el }\` entries. The "Add random item to both" button generates a single random value and calls \`pushStack(value)\` and \`enqueueQueue(value)\` together via \`Promise.all\`, so both structures always receive an identical sequence of inputs in an identical order. Nothing about the insertion logic differs between them — \`pushStack\` appends to the end of the \`stack\` array and \`enqueueQueue\` appends to the end of the \`queue\` array, using \`Array.push()\` in both cases. The divergence that matters is entirely in how each structure is read back out.

**Why popStack() and dequeueQueue() are the whole story**

\`popStack()\` calls \`stack.pop()\`, which removes and returns the array's *last* element — the most recently added item, giving Last-In-First-Out order. \`dequeueQueue()\` calls \`queue.shift()\`, which removes and returns the array's *first* element — the earliest added item still present, giving First-In-First-Out order. That is the entire algorithmic difference between a stack and a queue: identical insertion, opposite-end removal. Everything else in this snippet exists purely to make that one-line distinction visible and memorable.

**Absolute positioning instead of relying on flex reflow**

Rather than letting the browser's normal flow reposition items after a removal (which snaps instantly with no animation), every item is an absolutely positioned \`.sq-item\` inside a \`position: relative\` container, and its \`bottom\` (stack) or \`left\` (queue) coordinate is recalculated by \`layoutStack()\`/\`layoutQueue()\` after every mutation. Because those properties have a CSS \`transition\`, changing them triggers a smooth animated move rather than an instant jump. This is a deliberate simplification worth calling out: the stack's items never actually need to move when you push or pop, because both operations only ever touch the top slot — only the queue's remaining items need repositioning after a \`dequeue\`, since every item shifts one slot toward the front. Watch closely and you'll notice the stack's untouched items are visually still, while the queue's items visibly slide left after every dequeue.

**Enter and leave animations use the same two CSS classes in both boards**

Both boards share an identical \`.entering\`/\`.leaving\` class pair: a new item starts at \`opacity: 0; transform: scale(0.6)\` and is un-classed on the next animation frame so the browser animates it up to full size and opacity; a removed item gets \`.leaving\` added (scaling back down and fading) and is only detached from the DOM after \`await wait(220)\`, matching the CSS transition's duration so the element is never yanked out mid-animation. Using the same visual language for both structures is intentional — it keeps the comparison fair, so any difference you see in *behavior* is a difference in the algorithm, not in the animation styling.

**The operation log as a plain-English audit trail**

Every push, pop, enqueue, and dequeue writes a line to the scrolling \`.sq-log\` panel, phrased as the actual function call and its result (e.g. \`pop() -> C42 (removed from top)\`). After adding four or five items and alternately popping and dequeuing, scrolling back through this log next to the two boards is often what makes the LIFO/FIFO distinction finally click — you can see in plain text that the same input sequence produced two different, and fully explainable, output orders.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click "Add random item to both" a few times', text: 'Each click generates one random value and animates it into both the Stack (entering from the top) and the Queue (entering at the back/right) at the same time, using an identical value in both.' },
      { title: 'Click Pop on the Stack', text: 'The most recently added item animates out from the top of the column and disappears — pop always removes whatever was pushed last.' },
      { title: 'Click Dequeue on the Queue', text: 'The oldest remaining item animates out from the front (left) of the row, and every remaining item slides one slot to the left to close the gap — dequeue always removes whatever was enqueued first.' },
      { title: 'Add a couple more items, then Pop and Dequeue again', text: 'Keep alternating. Because both structures started from the same input sequence but remove from opposite ends, they now hold visibly different sets of leftover items.' },
      { title: 'Read the operation history log', text: 'Every push, pop, enqueue, and dequeue is recorded as a plain-English line, letting you trace exactly which values went in and which order they came back out in for each structure.' },
      { title: 'Try emptying one structure completely', text: 'Keep clicking Pop or Dequeue until a board is empty and click once more — the log reports a clean "structure is empty" message instead of erroring, showing both operations are safe to call on an empty structure.' },
    ]},
    features: [
      'Two independent backing arrays (stack, queue) fed the exact same input sequence via a shared "Add to both" action',
      'pop() uses Array.pop() (removes from the end) versus dequeue() uses Array.shift() (removes from the start) — the entire LIFO/FIFO distinction in two lines',
      'Absolutely positioned items with a CSS transition on left/bottom, recalculated by a layout() pass after every mutation',
      'Stack items never reposition on push/pop since only the top slot is ever touched; queue items visibly slide after every dequeue',
      'Shared entering/leaving animation classes used identically in both boards, keeping the visual comparison fair',
      'Safe no-op handling with a clear log message when popping or dequeuing an empty structure',
      'Scrolling operation history log recording every push, pop, enqueue, and dequeue as a plain-English line',
      'Zero dependencies — pure absolute-position CSS transitions, no animation library, no charting or physics engine',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching LIFO vs FIFO to students or new engineers', desc: 'Makes the core distinction between a stack and a queue immediately visible from a shared input sequence rather than two separate abstract diagrams. Pairs well with the [linked list visualizer](/ui-snippets/linked-list-visualizer) for a broader introduction to fundamental data structures.' },
      { icon: 'CODE', title: 'Interview preparation for data structure fundamentals', desc: 'Stacks and queues underpin classic interview problems — balanced parentheses, undo/redo, breadth-first vs depth-first search, task scheduling. Running the same sequence through both structures here builds fast recall of which one fits which problem shape.' },
      { icon: 'APP', title: 'Explaining undo/redo stacks and job queues in a real app', desc: 'Use this side-by-side view when explaining why an undo feature is built on a stack (most recent action reverses first) while a background job processor or print spooler is built on a queue (oldest job runs first).' },
      { icon: 'DESIGN', title: 'Interactive demo for a computer science course or blog post', desc: 'Embed directly inside an article on data structures so readers can add and remove items themselves and watch LIFO and FIFO diverge live, instead of reading two static before/after diagrams. Self-contained, no build step, fits any [UI snippets](/ui-snippets) gallery.' },
      { icon: 'FLOW', title: 'Onboarding material for junior engineers', desc: 'Use during onboarding to explain call-stack-like LIFO behavior versus message-queue-like FIFO behavior before diving into recursion or the [event loop visualizer](/ui-snippets/event-loop-visualizer), both of which lean on this same LIFO/FIFO distinction internally.' },
    ],
    faqs: [
      { q: 'Can I use this stack/queue visualizer in React, Vue, or Angular?', a: 'Yes. Keep the stack and queue plain arrays in refs (React), non-reactive instance variables (Vue), or class fields (Angular) rather than framework state, since they are mutated imperatively (push/pop/shift) and the DOM nodes are managed directly rather than re-rendered declaratively. Trigger pushStack/enqueueQueue/popStack/dequeueQueue from click handlers wired up in useEffect, onMounted, or ngAfterViewInit. The cleanup concern is the chained await wait(ms) calls: guard each with an "is mounted" flag checked before touching the DOM, and flip it false in the component unmount hook so an in-flight leave animation does not write to a node already removed by the framework.' },
      { q: 'Why does the Stack not need to reposition its items on every operation, but the Queue does?', a: 'A stack only ever adds or removes from one end — the top — so every item below the top stays in exactly the same slot regardless of how many push/pop operations happen. A queue removes from the opposite end it inserts at (front vs back), so every remaining item has to shift one slot closer to the front whenever the item ahead of it is dequeued. That structural difference is why this snippet visibly slides queue items on every dequeue but leaves stack items still on every pop.' },
      { q: 'What is a real-world example of a stack versus a queue?', a: 'A browser\'s back button and an undo feature in a text editor are classic stacks — the most recently visited page or the most recent edit is the first one reversed. A print spooler, a background job processor, and a customer support ticket queue are classic queues — the first job or ticket submitted is the first one handled, regardless of what gets added after it.' },
      { q: 'Why use Array.shift() for dequeue instead of something faster?', a: 'Array.shift() is O(n) in the worst case because every remaining element has to be re-indexed after the first one is removed, which is a known real-world performance caveat of array-backed queues at large scale — production job queues typically use a circular buffer or a linked list with head/tail pointers instead. This snippet intentionally keeps the implementation to plain arrays for the clearest possible read of the FIFO logic; the [LRU cache visualizer](/ui-snippets/lru-cache-visualizer) in this library demonstrates the linked-list-based O(1) alternative for a comparable structure.' },
      { q: 'Can both structures ever end up holding the same items in the same order?', a: 'Only in the trivial case of a single item, or if you always remove everything from one structure before adding anything new. With three or more items pushed and only some of them removed, a stack and a queue fed the same input sequence will structurally diverge, since pop always takes the newest survivor while dequeue always takes the oldest one — that divergence is the whole point of running them side by side.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's JavaScript to an AI assistant like Claude and ask it to trace, for a specific sequence of five pushes and three pops/dequeues you write out by hand, exactly which items each structure ends up holding — predicting it yourself first, then checking your prediction, is the fastest way to internalize LIFO versus FIFO. Good extensions to ask for: a "peek" button that highlights the next item each structure would return without removing it, a shared capacity limit that visually rejects further pushes once full, or a third board showing a double-ended queue (deque) that can add or remove from either end.`,
      prompt: `Build a side-by-side stack and queue visualizer in plain HTML, CSS, and JavaScript, no libraries or frameworks.

Requirements:
- Two separate boards on the same page sharing the same underlying set of pushed values: a Stack (LIFO) shown as a vertical column, and a Queue (FIFO) shown as a horizontal row.
- A single shared "Add random item to both" action that generates one random value and adds it to both structures at the same time (push onto the stack, enqueue onto the queue), so both start from an identical input sequence.
- Implement the stack with array push/pop (removing from the end) and the queue with array push/shift (removing from the start) — the entire LIFO vs FIFO behavior should come from that one distinction, not from separate custom logic per structure.
- Separate Pop and Dequeue buttons, each acting only on its own structure, animating the removed item fading/scaling out from the correct end (top for the stack, front for the queue).
- Position items absolutely within each board and recompute every remaining item's position after a mutation so removals animate smoothly — the stack's untouched items should not need to move on push/pop, since only its top slot changes, while every remaining queue item should visibly shift toward the front after a dequeue.
- After several alternating operations, the two structures must end up holding a visibly different remaining set/order of items, making the LIFO-vs-FIFO distinction concrete rather than something the user has to take on faith.
- Include a scrolling operation history log that records every push, pop, enqueue, and dequeue as a short plain-English line, including a graceful no-op message when popping or dequeuing an empty structure.`,
    },
  },
};

export default stackQueueVisualizer;
