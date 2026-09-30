const lruCacheVisualizer = {
  id: 'lru-cache-visualizer',
  title: 'LRU Cache Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="lru-wrap">
  <div class="lru-header">
    <div class="lru-title-group">
      <div class="lru-title">LRU Cache <span class="lru-cap">capacity 4</span></div>
      <div class="lru-legend"><span class="lru-dot lru-dot-mru"></span> most recently used <span class="lru-dot lru-dot-lru"></span> least recently used</div>
    </div>
  </div>
  <div class="lru-row" id="lru-row"></div>
  <div class="lru-controls">
    <div class="lru-field">
      <label class="lru-label">Key</label>
      <input type="text" id="lru-key" maxlength="3" placeholder="A" />
    </div>
    <div class="lru-field">
      <label class="lru-label">Value</label>
      <input type="text" id="lru-value" maxlength="4" placeholder="1" />
    </div>
    <button class="lru-btn lru-btn-primary" id="lru-put">put(key, value)</button>
    <button class="lru-btn" id="lru-get">get(key)</button>
    <button class="lru-btn" id="lru-random">Random op</button>
  </div>
  <div class="lru-status" id="lru-status">Try put(A, 1), put(B, 2), get(A), then fill past capacity.</div>
  <div class="lru-log-title">Operation log</div>
  <div class="lru-log" id="lru-log"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.lru-wrap { width: 100%; max-width: 620px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; }

.lru-header { margin-bottom: 14px; }
.lru-title { font-size: 15px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 8px; }
.lru-cap { font-size: 11px; font-weight: 700; color: #6366f1; background: #eef2ff; padding: 2px 8px; border-radius: 999px; }
.lru-legend { margin-top: 6px; font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 5px; }
.lru-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.lru-dot-mru { background: #6366f1; }
.lru-dot-lru { background: #cbd5e1; margin-left: 10px; }

.lru-row { position: relative; height: 78px; background: #f8fafc; border: 1px solid #eef2f7; border-radius: 10px; margin-bottom: 16px; overflow: hidden; }

.lru-slot { position: absolute; top: 12px; width: 84px; height: 54px; border: 1.5px dashed #e2e8f0; border-radius: 9px; }

.lru-node { position: absolute; top: 12px; width: 84px; height: 54px; border-radius: 9px; background: #6366f1; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: left 0.38s cubic-bezier(.2,.8,.2,1), opacity 0.25s ease, transform 0.25s ease, background-color 0.25s ease; box-shadow: 0 3px 10px rgba(99,102,241,0.28); }
.lru-node .lru-k { font-size: 13px; font-weight: 800; font-family: ui-monospace, monospace; }
.lru-node .lru-v { font-size: 10.5px; font-weight: 600; opacity: 0.85; }
.lru-node.entering { opacity: 0; transform: scale(0.6); }
.lru-node.pulse { background: #10b981; }
.lru-node.leaving { opacity: 0; transform: scale(0.55) translateY(6px); background: #ef4444; }
.lru-node.stale { background: #a5b4fc; }

.lru-controls { display: flex; align-items: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
.lru-field { display: flex; flex-direction: column; gap: 4px; }
.lru-label { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
.lru-field input { width: 60px; padding: 8px 10px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; text-align: center; }
.lru-field input:focus { outline: none; border-color: #6366f1; }

.lru-btn { font-size: 12.5px; font-weight: 700; padding: 9px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: #fff; color: #374151; cursor: pointer; transition: all 0.15s; }
.lru-btn:hover { border-color: #cbd5e1; background: #f8fafc; }
.lru-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.lru-btn-primary { background: #6366f1; border-color: #6366f1; color: #fff; }
.lru-btn-primary:hover { background: #4f46e5; }

.lru-status { font-size: 12.5px; color: #475569; background: #f8fafc; border: 1px solid #eef2f7; border-radius: 8px; padding: 8px 10px; margin-bottom: 12px; min-height: 34px; }

.lru-log-title { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; }
.lru-log { display: flex; flex-direction: column-reverse; gap: 3px; max-height: 110px; overflow-y: auto; font-family: ui-monospace, monospace; font-size: 11.5px; color: #64748b; }
.lru-log-entry { padding: 2px 0; border-bottom: 1px dashed #f1f5f9; }`,
  js: `const CAPACITY = 4;
const SLOT_W = 96;

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = { key: null };
    this.tail = { key: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  _insertFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }
  get(key) {
    if (!this.map.has(key)) return { hit: false };
    const node = this.map.get(key);
    this._remove(node);
    this._insertFront(node);
    return { hit: true, value: node.value };
  }
  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this._remove(node);
      this._insertFront(node);
      return { evictedKey: null, updated: true };
    }
    let evictedKey = null;
    if (this.map.size >= this.capacity) {
      const lru = this.tail.prev;
      evictedKey = lru.key;
      this._remove(lru);
      this.map.delete(lru.key);
    }
    const node = { key, value, prev: null, next: null };
    this._insertFront(node);
    this.map.set(key, node);
    return { evictedKey, updated: false };
  }
  order() {
    const out = [];
    let cur = this.head.next;
    while (cur !== this.tail) {
      out.push({ key: cur.key, value: cur.value });
      cur = cur.next;
    }
    return out;
  }
}

const cache = new LRUCache(CAPACITY);
const nodeEls = new Map();

function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

function log(text) {
  const box = document.getElementById('lru-log');
  const entry = document.createElement('div');
  entry.className = 'lru-log-entry';
  entry.textContent = text;
  box.appendChild(entry);
}

function setStatus(text) { document.getElementById('lru-status').textContent = text; }

function ensureSlots() {
  const row = document.getElementById('lru-row');
  for (let i = 0; i < CAPACITY; i++) {
    const slot = document.createElement('div');
    slot.className = 'lru-slot';
    slot.style.left = (i * SLOT_W + 8) + 'px';
    row.appendChild(slot);
  }
}

function layout() {
  const order = cache.order();
  order.forEach((item, i) => {
    const el = nodeEls.get(item.key);
    if (el) el.style.left = (i * SLOT_W + 8) + 'px';
  });
}

function createNodeEl(key, value, index) {
  const row = document.getElementById('lru-row');
  const el = document.createElement('div');
  el.className = 'lru-node entering';
  el.innerHTML = '<div class="lru-k">' + key + '</div><div class="lru-v">' + value + '</div>';
  el.style.left = (index * SLOT_W + 8) + 'px';
  row.appendChild(el);
  nodeEls.set(key, el);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.remove('entering'));
  });
  return el;
}

async function removeNodeEl(key) {
  const el = nodeEls.get(key);
  if (!el) return;
  el.classList.add('leaving');
  await wait(320);
  el.remove();
  nodeEls.delete(key);
}

async function pulse(key) {
  const el = nodeEls.get(key);
  if (!el) return;
  el.classList.add('pulse');
  await wait(300);
  el.classList.remove('pulse');
}

let busy = false;

async function doGet(key) {
  if (busy || !key) return;
  busy = true;
  const result = cache.get(key);
  if (!result.hit) {
    setStatus('get(' + key + ') -> MISS. Key not found in the hash map, O(1) lookup, nothing to move.');
    log('get(' + key + ') -> miss');
    busy = false;
    return;
  }
  setStatus('get(' + key + ') -> HIT (' + result.value + '). Node is unlinked and re-inserted at the MRU front in O(1).');
  log('get(' + key + ') -> hit, value=' + result.value);
  layout();
  await wait(380);
  await pulse(key);
  busy = false;
}

async function doPut(key, value) {
  if (busy || !key) return;
  busy = true;
  const willEvictCheck = !cache.map.has(key) && cache.map.size >= cache.capacity;
  const evictedKeyBefore = willEvictCheck ? cache.tail.prev.key : null;

  const result = cache.put(key, value);

  if (result.evictedKey) {
    setStatus('put(' + key + ', ' + value + ') -> cache full, evicting least-recently-used key "' + result.evictedKey + '" in O(1) via the tail pointer.');
    log('put(' + key + ', ' + value + ') -> evicts ' + result.evictedKey);
    await removeNodeEl(result.evictedKey);
  } else if (result.updated) {
    setStatus('put(' + key + ', ' + value + ') -> key existed, value updated and moved to the MRU front.');
    log('put(' + key + ', ' + value + ') -> updated existing key');
  } else {
    setStatus('put(' + key + ', ' + value + ') -> new key inserted at the MRU front.');
    log('put(' + key + ', ' + value + ') -> inserted new key');
  }

  if (result.updated) {
    layout();
    await wait(380);
    await pulse(key);
  } else {
    layout();
    createNodeEl(key, value, 0);
    await wait(120);
    layout();
  }
  busy = false;
}

function randomOp() {
  const keys = ['A', 'B', 'C', 'D', 'E', 'F'];
  const existing = cache.order().map(n => n.key);
  const doGetOp = existing.length > 0 && Math.random() < 0.45;
  if (doGetOp) {
    const key = existing[Math.floor(Math.random() * existing.length)];
    document.getElementById('lru-key').value = key;
    doGet(key);
  } else {
    const key = keys[Math.floor(Math.random() * keys.length)];
    const value = Math.floor(Math.random() * 90 + 10);
    document.getElementById('lru-key').value = key;
    document.getElementById('lru-value').value = String(value);
    doPut(key, value);
  }
}

document.getElementById('lru-put').addEventListener('click', () => {
  const key = document.getElementById('lru-key').value.trim();
  const value = document.getElementById('lru-value').value.trim() || '1';
  if (key) doPut(key, value);
});
document.getElementById('lru-get').addEventListener('click', () => {
  const key = document.getElementById('lru-key').value.trim();
  if (key) doGet(key);
});
document.getElementById('lru-random').addEventListener('click', randomOp);

ensureSlots();`,
  seo: {
    title: 'LRU Cache Visualizer — Free HTML CSS JS Snippet',
    description: 'A real doubly linked list plus hash map animate O(1) get/put and eviction in a fixed-capacity LRU cache. Exports to React, Vue & Tailwind.',
    about: {
      title: 'LRU Cache Visualizer — Doubly Linked List + Hash Map Animating True O(1) get/put and Eviction',
      description: `Most "LRU cache" demos on the web fake the algorithm with an array and \`indexOf\`/\`splice\`, which is O(n) per operation and quietly teaches the wrong lesson about why real LRU caches are fast. This snippet implements the actual textbook data structure — a doubly linked list ordered by recency plus a hash map from key to list node — so every \`get\` and \`put\` genuinely runs in O(1), and the animation you see on screen is a direct visualization of real pointer surgery, not a reshuffled array pretending to be one.

**Why a linked list instead of an array**

An array-based "LRU" typically does \`arr.findIndex(k)\` (O(n) scan) followed by \`arr.splice()\` (O(n) shift) on every single access, which defeats the entire purpose of caching — a lookup that costs O(n) is barely better than not caching at all once the array grows. A doubly linked list solves this because moving a node to the front only requires rewriting four pointers (the moved node's neighbors' \`next\`/\`prev\`, and the moved node's own \`next\`/\`prev\`), regardless of how many items are in the list. Combined with a hash map that gives instant node lookup by key, both operations become genuinely O(1): \`this.map.get(key)\` finds the node instantly, and \`_remove\`/\`_insertFront\` relink it instantly, with no scanning of any kind.

**The two sentinel nodes that remove every edge case**

\`this.head\` and \`this.tail\` are permanent dummy nodes that are never evicted and never returned to the caller — \`head.next\` is always the current most-recently-used real node, and \`tail.prev\` is always the current least-recently-used real node. This sentinel-node pattern is the detail that most hand-rolled LRU implementations get wrong: without it, \`_remove()\` and \`_insertFront()\` need special-case branches for "the list is empty," "removing the only node," or "inserting into an empty list," because there is no real neighbor to relink against. With sentinels, \`this.head.next = this.tail\` on construction means \`_remove\` and \`_insertFront\` are four-line functions with zero conditionals — they always have a real \`.prev\` and \`.next\` object to write to, even in an empty cache.

**get(key): unlink and re-insert, not "find and swap"**

\`get(key)\` first checks \`this.map.has(key)\`; a miss returns immediately with no list mutation at all. On a hit, the node is unlinked from its current position with \`_remove(node)\` and immediately relinked at the front with \`_insertFront(node)\` — the same node object, just re-pointed. On screen this plays out as the accessed box's \`left\` CSS value animating across to the leftmost (MRU) slot while every box that used to sit ahead of it shifts one slot to the right, all driven by \`transition: left 0.38s\` rather than a JavaScript animation loop, since a single property tween is all a slot reorder needs.

**put(key, value): three distinct paths, three distinct animations**

\`put()\` branches into exactly the three cases a real LRU cache has to handle. If the key already exists, its value is overwritten and the existing node is moved to the front exactly like a \`get\` hit — visualized identically, plus a brief green pulse to distinguish "value changed" from "just accessed." If the key is new and the cache has spare capacity, a fresh node is linked in at the front and its box animates in from a scaled-down, transparent state. If the key is new and the cache is already at \`capacity\`, the code reads \`this.tail.prev\` — the LRU node — evicts it with \`_remove\` plus a \`map.delete\`, and only then inserts the new node at the front; the evicted box animates out (a red fade-and-shrink) before the remaining boxes shift to make room, so eviction is never silent or instantaneous.

**Why eviction is a pointer read, not a search**

Because the list is kept sorted by recency at all times (every access moves its node to the front), the least-recently-used item is always sitting at \`this.tail.prev\` — no scan is ever needed to find "the oldest one." This is the second half of why the whole structure is O(1): insertion and lookup are fast because of the hash map, and eviction is fast because the linked list's own ordering invariant means the eviction candidate is always exactly one pointer dereference away.

**Layout by index, not full FLIP, for a simpler correct animation**

Rather than a general FLIP (First-Last-Invert-Play) animation library, this snippet keeps positioning simple and honest: \`layout()\` walks the linked list front-to-back after every mutation and sets each existing box's \`left\` to \`index * SLOT_WIDTH\`. Because the CSS transition is declared on \`left\` itself, the browser animates the change automatically — the JavaScript never computes a transform matrix or an intermediate frame, it just asks "where does each node belong now" and lets the browser's own compositor interpolate the movement.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Insert a few keys with put(key, value)', text: 'Type a key like A and a value like 1, then click put. The new box slides in and animates to the leftmost, most-recently-used slot. Repeat with B, C, D to fill all 4 slots.' },
      { title: 'Access an existing key with get(key)', text: 'Type an existing key and click get. If found, its box animates across to the MRU slot and briefly pulses green — the status line reports the O(1) hit and confirms the linked-list splice that just happened.' },
      { title: 'Try get() on a key that was never inserted', text: 'The status line reports a clean MISS with no animation, since a hash-map lookup that fails does not touch the linked list at all — this is the fast-fail path.' },
      { title: 'Fill the cache past capacity 4', text: 'Insert a 5th distinct key. Watch the box in the rightmost (least-recently-used) slot fade and shrink out in red before the new key slides in at the front — that is the real eviction path, reading straight from the tail pointer.' },
      { title: 'Access an older key, then overflow again', text: 'get() an older key to move it back to the MRU end, then insert two more new keys. Notice the key you just accessed survives longer than keys you never touched, since eviction always targets whatever currently sits at the tail.' },
      { title: 'Click Random op to fuzz the cache automatically', text: 'Each click performs either a random get on an existing key or a random put with a new key/value pair, useful for watching the eviction order settle into a pattern over many operations.' },
    ]},
    features: [
      'Real doubly linked list with head/tail sentinel nodes — no array, no indexOf/splice anywhere in the logic',
      'Hash map (JS Map) from key to list node gives true O(1) lookup backing every get and put',
      'get() unlinks and re-inserts the accessed node at the MRU front in four pointer writes, O(1) regardless of cache size',
      'put() eviction reads the LRU candidate directly from tail.prev — no scan needed to find "the oldest" item',
      'Three visually distinct outcomes: cache hit (blue slide + green pulse), new insert (scale-in), eviction (red fade-out)',
      'Fixed 4-slot layout with dashed placeholder slots so empty capacity is always visible, not just implied',
      'layout() repositions every node by its true list index after each mutation, animated purely via CSS transition on left',
      'Random op button fuzzes get/put automatically to reveal long-run eviction patterns',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching O(1) cache algorithms and Big-O intuition', desc: 'Makes the difference between an O(n) array-based fake LRU and a real O(1) linked-list-plus-map implementation concrete and watchable, rather than an abstract complexity-class claim. Pairs well with the [linked list visualizer](/ui-snippets/linked-list-visualizer) for a fuller data-structures teaching sequence.' },
      { icon: 'CODE', title: 'Interview preparation for the classic "Design LRU Cache" problem', desc: 'This exact data structure (doubly linked list + hash map) is the canonical answer to one of the most frequently asked coding interview questions. Running get/put by hand and watching the pointer surgery animate builds real recall of the mechanism instead of a memorized answer.' },
      { icon: 'APP', title: 'Explaining real caching layers to engineering teams', desc: 'Browser caches, CDN edge caches, database buffer pools, and in-memory application caches all commonly use LRU or an LRU variant for eviction. Use this visualizer in a design review or onboarding session to explain why a fixed-capacity cache with LRU eviction behaves the way it does under load.' },
      { icon: 'DESIGN', title: 'Interactive demo for a computer science course or blog post', desc: 'Embed directly inside an article on caching strategies or system design so readers can run get/put themselves and watch eviction happen live rather than reading a static before/after diagram. Self-contained, no build step, fits any [UI snippets](/ui-snippets) gallery.' },
      { icon: 'FLOW', title: 'Debugging aid for cache invalidation bugs', desc: 'Adapt the same pointer-surgery pattern to instrument a real application cache during development, temporarily logging node moves to confirm eviction order matches expectations before shipping a caching layer.' },
      { icon: 'CODE', title: 'Related: Readability Score Gauge', desc: 'See the [Readability Score Gauge](/ui-snippets/readability-score-gauge/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Can I use this LRU cache visualizer in React, Vue, or Angular?', a: 'Yes. Move the LRUCache class into a plain utility module — it has no DOM dependency at all, it only manipulates plain JS objects. Keep the cache instance in a ref (React), a non-reactive plain variable (Vue, mutated outside reactivity), or a class field (Angular) rather than component state, since its internal pointer structure should not be deep-cloned or made reactive. Trigger doGet/doPut from click handlers and drive the visual boxes off cache.order() after each mutation. The only cleanup concern is the chain of await wait(ms) calls inside doGet/doPut: guard each one with a "still mounted" flag checked before touching the DOM, and set that flag false in the component unmount hook (useEffect cleanup, onUnmounted, ngOnDestroy) so an in-flight animation does not write to a removed node.' },
      { q: 'Why is an array-based LRU cache (using indexOf and splice) considered wrong or slow?', a: 'Array.indexOf() is a linear scan, O(n), and Array.splice() to remove or reinsert an element is also O(n) because every following element has to shift index. Doing both on every single get and put means an array-based cache degrades linearly as it grows, which defeats the point of caching for lookup speed. A doubly linked list plus hash map avoids both scans entirely: the map gives instant node lookup, and moving a node within a linked list is a fixed number of pointer writes no matter how large the list is.' },
      { q: 'Why does the cache need two sentinel (dummy) nodes instead of just tracking the first and last real node directly?', a: 'Without sentinels, every insert/remove function needs extra conditional branches for edge cases like an empty list or a single-node list, because there is no guaranteed real neighbor object to write .next/.prev onto. With permanent head and tail dummy nodes that are always present, _remove() and _insertFront() can unconditionally assume a valid .prev and .next exist on every node, which is what keeps them at a clean four lines each with zero special-casing.' },
      { q: 'What happens if I put() a key that already exists in the cache?', a: 'The existing node\'s value is overwritten in place and the node is unlinked and re-inserted at the MRU front, exactly like a get() hit — this snippet gives it a brief green pulse in addition to the slide so you can tell "value updated" apart from "just read." Critically, updating an existing key never triggers eviction, since the cache\'s total item count does not change.' },
      { q: 'How is the least-recently-used item found without scanning the whole cache?', a: 'Because every get and put keeps the list sorted by recency (accessed or inserted nodes always move to the front), the node at tail.prev is, by construction, always the one that has gone the longest without being touched. Eviction never scans anything — it just reads this.tail.prev.key directly, which is why eviction is O(1) exactly like get and put.' },
    ],
    aiPrompt: {
      paragraph: `Hand the LRUCache class to an AI assistant like Claude and ask it to trace exactly which four pointers change during a single get() hit, or why the sentinel head/tail nodes remove the need for any empty-list special case — walking through one _remove/_insertFront pair by hand is the fastest way to actually internalize the mechanism. Worth asking for as extensions: a capacity slider that live-resizes the cache, a hit-rate counter that tracks hits versus misses over a session, or an LFU (least-frequently-used) mode alongside LRU to compare eviction strategies on the same sequence of operations.`,
      prompt: `Build an animated LRU (Least Recently Used) cache visualizer in plain HTML, CSS, and JavaScript, no libraries or frameworks.

Requirements:
- Implement the cache as a genuine doubly linked list (nodes with real prev/next pointers) combined with a hash map from key to node — do not fake the ordering with a plain array and indexOf/splice, since the entire point is demonstrating true O(1) get/put.
- Use two permanent sentinel nodes (head and tail) that are never evicted, so insertion and removal functions never need special-case branches for an empty or single-item list.
- A fixed-capacity row of visual slots (e.g. 4), ordered left-to-right from most-recently-used to least-recently-used, with empty capacity shown as dashed placeholder slots rather than left blank.
- get(key): on a hit, unlink the corresponding node from its current position and re-link it at the most-recently-used front, animating its box sliding to the front slot while other boxes shift to fill the gap; on a miss, show a clear no-op result with no animation.
- put(key, value): if the key exists, update its value and move it to the front like a hit (with a distinct visual cue such as a brief color pulse so "updated" reads differently from "just accessed"); if the key is new and there is spare capacity, animate the new box scaling/fading in at the front; if the key is new and the cache is full, first animate the current least-recently-used box (at the tail) fading and shrinking out, then animate the new box sliding in at the front.
- Read the eviction candidate directly from the tail-side sentinel's neighbor rather than scanning the list, since correctness of that O(1) read is the core teaching point.
- Provide key/value text inputs with get and put buttons, a random-operation button that fuzzes the cache with random get/put calls, and a scrolling operation log recording every call and its outcome (hit, miss, inserted, evicted, updated).`,
    },
  },
};

export default lruCacheVisualizer;
