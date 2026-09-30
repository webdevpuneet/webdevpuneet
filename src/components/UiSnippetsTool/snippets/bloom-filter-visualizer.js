const bloomFilterVisualizer = {
  id: 'bloom-filter-visualizer',
  title: 'Bloom Filter Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="wrap">
  <div class="bit-array" id="bit-array"></div>
  <div class="rows">
    <div class="row">
      <label class="label">Add word</label>
      <div class="field-group">
        <input type="text" id="add-input" placeholder="e.g. mango" autocomplete="off" spellcheck="false" />
        <button class="btn btn-primary" id="btn-add" type="button">Add</button>
      </div>
    </div>
    <div class="row">
      <label class="label">Check word</label>
      <div class="field-group">
        <input type="text" id="check-input" placeholder="e.g. mango" autocomplete="off" spellcheck="false" />
        <button class="btn" id="btn-check" type="button">Check</button>
      </div>
    </div>
  </div>
  <div class="result" id="result"></div>
  <div class="log-panel">
    <div class="log-title">Activity Log</div>
    <div class="log-list" id="log-list"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 460px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; }

.bit-array { display: grid; grid-template-columns: repeat(8, 1fr); gap: 6px; margin-bottom: 16px; }
.bit { aspect-ratio: 1; border-radius: 6px; background: #f1f5f9; border: 1.5px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #cbd5e1; transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, color 0.2s ease; }
.bit.set { background: #eef2ff; border-color: #6366f1; color: #4338ca; }
.bit.pulse { transform: scale(1.25); background: #6366f1; border-color: #6366f1; color: #fff; }
.bit.check-hit { background: #dcfce7; border-color: #22c55e; color: #15803d; }
.bit.check-miss { background: #fee2e2; border-color: #ef4444; color: #b91c1c; }

.rows { display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px; }
.label { display: block; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
.field-group { display: flex; gap: 8px; }
.field-group input { flex: 1; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 14px; color: #0f172a; font-family: ui-monospace, monospace; }
.field-group input:focus { outline: none; border-color: #6366f1; }

.btn { font-size: 13px; font-weight: 600; padding: 9px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: #fff; color: #374151; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
.btn:hover { border-color: #cbd5e1; background: #f8fafc; }
.btn-primary { background: #6366f1; border-color: #6366f1; color: #fff; }
.btn-primary:hover { background: #4f46e5; border-color: #4f46e5; }

.result { min-height: 44px; padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; line-height: 1.5; margin-bottom: 12px; }
.result.empty { display: none; }
.result.negative { background: #fee2e2; color: #b91c1c; }
.result.positive { background: #dcfce7; color: #15803d; }
.result.false-positive { background: #fef3c7; color: #92400e; }

.log-panel { padding-top: 12px; border-top: 1px solid #f1f5f9; }
.log-title { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
.log-list { display: flex; flex-direction: column-reverse; gap: 4px; max-height: 130px; overflow-y: auto; }
.log-item { font-size: 11.5px; padding: 5px 9px; border-radius: 6px; font-family: ui-monospace, monospace; background: #f8fafc; color: #475569; animation: slideIn 0.18s ease; }
@keyframes slideIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`,
  js: `const M = 32;
let bits = new Array(M).fill(0);
const addedWords = new Set();

function hash1(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h + str.charCodeAt(i) * 7) % M;
  return h;
}
function hash2(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33 + str.charCodeAt(i)) % M;
  return h;
}
function hash3(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 131 + str.charCodeAt(i) + i) % M;
  return h;
}
function hashPositions(word) {
  return [hash1(word), hash2(word), hash3(word)];
}

const arrayEl = document.getElementById('bit-array');
for (let i = 0; i < M; i++) {
  const cell = document.createElement('div');
  cell.className = 'bit';
  cell.textContent = i;
  cell.dataset.idx = i;
  arrayEl.appendChild(cell);
}
const cells = arrayEl.querySelectorAll('.bit');

function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

function log(text) {
  const list = document.getElementById('log-list');
  const el = document.createElement('div');
  el.className = 'log-item';
  el.textContent = text;
  list.appendChild(el);
  while (list.children.length > 40) list.removeChild(list.firstChild);
}

function showResult(text, kind) {
  const el = document.getElementById('result');
  el.className = 'result ' + kind;
  el.textContent = text;
}

async function addWord(word) {
  if (!word) return;
  const positions = hashPositions(word);
  for (const p of positions) {
    const cell = cells[p];
    cell.classList.add('pulse');
    await wait(260);
    bits[p] = 1;
    cell.classList.remove('pulse');
    cell.classList.add('set');
    await wait(90);
  }
  addedWords.add(word);
  log('Added "' + word + '" \\u2014 set bits [' + positions.join(', ') + ']');
}

async function checkWord(word) {
  if (!word) return;
  document.querySelectorAll('.bit.check-hit, .bit.check-miss').forEach(c => c.classList.remove('check-hit', 'check-miss'));
  const positions = hashPositions(word);
  let allSet = true;
  for (const p of positions) {
    const cell = cells[p];
    const isSet = bits[p] === 1;
    cell.classList.add(isSet ? 'check-hit' : 'check-miss');
    if (!isSet) allSet = false;
    await wait(220);
    if (!isSet) break;
  }

  if (!allSet) {
    const missPos = positions.find(p => bits[p] === 0);
    showResult('"' + word + '" is definitely NOT in the set \\u2014 bit ' + missPos + ' was 0.', 'negative');
    log('Checked "' + word + '" \\u2014 definitely NOT in the set');
    return;
  }

  if (addedWords.has(word)) {
    showResult('"' + word + '" is possibly in the set \\u2014 correct, it really was added.', 'positive');
    log('Checked "' + word + '" \\u2014 possibly in the set (true positive)');
  } else {
    showResult('"' + word + '" is possibly in the set \\u2014 but it was never added! All 3 of its bit positions [' + positions.join(', ') + '] happen to already be set by other words. This is a genuine FALSE POSITIVE.', 'false-positive');
    log('Checked "' + word + '" \\u2014 FALSE POSITIVE (never added, bits collided)');
  }
}

document.getElementById('btn-add').addEventListener('click', async () => {
  const input = document.getElementById('add-input');
  const word = input.value.trim().toLowerCase();
  if (!word) return;
  document.getElementById('btn-add').disabled = true;
  await addWord(word);
  document.getElementById('btn-add').disabled = false;
  input.value = '';
});

document.getElementById('btn-check').addEventListener('click', async () => {
  const input = document.getElementById('check-input');
  const word = input.value.trim().toLowerCase();
  if (!word) return;
  document.getElementById('btn-check').disabled = true;
  await checkWord(word);
  document.getElementById('btn-check').disabled = false;
});

(async function seed() {
  await addWord('apple');
  await addWord('banana');
  await addWord('cherry');
  log('Try checking "mango" (never added) to see a real false positive, or "kiwi" for a correct negative.');
})();`,
  seo: {
    title: 'Bloom Filter Visualizer — Free HTML CSS JS Snippet',
    description: 'Animated bit array with 3 hash functions demonstrates a real false-positive collision, never a false negative. Exports to React & Vue.',
    about: {
      title: 'Bloom Filter Visualizer — Animated Bit Array, Triple Hash Functions & a Genuine False Positive in Vanilla JS',
      description: `A Bloom filter is almost always explained with the caveat "it can have false positives" tacked on as an afterthought, as if that were a minor footnote rather than the entire reason the data structure exists. This snippet does not just claim a false positive is possible — it seeds the filter with three specific words, chosen because they provably collide with a fourth word that was never added, so checking that fourth word produces a real, reproducible false positive every single time you load the page.

**The bit array: 32 boxes, all starting at zero**

The filter's entire state is a plain JavaScript array, \`bits = new Array(32).fill(0)\`, rendered as 32 small boxes in an 8-column grid. Nothing else backs the filter — no list of added words is consulted when answering "might this be in the set," only these 32 bits. (A separate \`addedWords\` Set does exist in the code, but it is used only to label results for teaching purposes — a real Bloom filter has no such ground truth to check against, which is exactly why false positives are invisible to the filter itself.)

**Three small, genuinely distinct hash functions**

\`hash1\` sums each character code multiplied by 7 and takes the result mod 32 on every step. \`hash2\` is a djb2-style rolling hash (\`h = h * 33 + charCode\`, mod 32 each iteration to keep numbers small). \`hash3\` multiplies the running total by 131 and adds both the character code and its index, mod 32. Because each function combines character codes differently — different multiplier, different accumulation order, one of them index-sensitive — they produce different-looking bit positions for the same word, which is the entire point of using more than one hash function: three independent chances to distinguish two different words, instead of one.

**Adding a word: three bits, flipped one at a time**

\`addWord(word)\` computes all three hash positions up front, then flips each corresponding bit from 0 to 1 with a short pulse animation and a 260ms pause between them, so you can watch each hash function fire in sequence rather than all three positions lighting up simultaneously. Once a bit is set to 1 it never goes back to 0 in this snippet — standard Bloom filters cannot support deletion without additional structure (like a counting Bloom filter), because a single bit can be shared by multiple words' hash positions, and this snippet\'s bit array makes that sharing directly visible.

**Checking a word: all three must be 1, or it's a guaranteed no**

\`checkWord(word)\` computes the same three hash positions and checks each one's current bit value in order, stopping the moment it finds a 0. If any of the three positions is unset, the result is "definitely NOT in the set" — a Bloom filter can say this with total certainty, because a word that was genuinely added would have set all three of its bits, and bits are never cleared. If all three positions are 1, the result is only "possibly in the set," never "definitely" — and this snippet distinguishes the two ways that can happen: the word really was added (checked against the internal \`addedWords\` set purely for the demo's benefit), or it was never added and just happens to hash to three positions that other words already filled in.

**The guaranteed false positive: apple, banana, cherry, and mango**

On load, this snippet automatically adds three words — apple, banana, cherry — which between them set bit positions 30, 23, 20, 7, 6, 24, 27, 18, and 12. The word "mango" was deliberately chosen because, run through the exact same three hash functions, it also lands on positions 30, 23, and 20 — precisely the three bits that "apple" already set. Check "mango" and every one of its three required bits reads 1, so the filter reports "possibly in the set," even though mango was never added. This is not a scripted animation faking a false positive; it is the real output of the real hash functions on real input, which is why checking "kiwi" (hash positions 12, 25, 26) correctly returns "definitely NOT in the set" instead — position 12 is set from "cherry," but 25 and 26 are still zero, and one unset bit is all it takes to rule a word out with certainty.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch the filter seed itself on load', text: 'Apple, banana, and cherry are added automatically, one at a time — for each word, three bits pulse and light up indigo in sequence as the three hash functions fire.' },
      { title: 'Type "mango" into Check word and click Check', text: 'Mango was never added, but watch all three of its hash positions turn green as hits. The result banner reports a possibly-in-the-set result and explicitly flags it as a genuine false positive.' },
      { title: 'Read which exact bits mango collided on', text: 'The result text names the three bit positions that mango shares with apple — the same positions light up green during the check, so you can see precisely which prior word is responsible for the collision.' },
      { title: 'Type "kiwi" into Check word and click Check', text: 'Kiwi\'s first hash position is already set (shared with cherry), but the check stops the moment it reaches an unset bit and turns it red, reporting "definitely NOT in the set" — a correct negative.' },
      { title: 'Add a few of your own words', text: 'Type any word into Add word and click Add to watch its own three bits pulse and set. More added words mean more filled bits, which raises the odds of future false positives — you can watch the bit array fill up as you go.' },
      { title: 'Check a word you just added yourself', text: 'The result banner distinguishes this from mango\'s case explicitly, confirming it as a true positive rather than a coincidental collision, since the filter tracks what was really added purely for this teaching display.' },
    ]},
    features: [
      '32-bit array rendered as an interactive grid, the entire real state of the filter with no hidden word list backing lookups',
      'Three genuinely distinct hash functions (different multiplier, accumulation order, and index-sensitivity) computed live in the browser',
      'Sequential per-hash pulse animation on Add shows each of the three bit flips firing one at a time, not all at once',
      'A guaranteed, hand-verified false positive: checking "mango" after adding apple/banana/cherry collides on all 3 real bit positions',
      'Correct negative demonstrated too: "kiwi" shares one bit with cherry but is ruled out the instant an unset bit is found',
      'Check flow stops at the first unset bit it finds, mirroring how a real Bloom filter short-circuits a definite-no answer',
      'Distinct result states for true positive, false positive, and definite negative, each explained in plain language',
      'Zero dependencies, zero external hashing library — every hash function is under 5 lines of vanilla JavaScript',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching probabilistic data structures concretely', desc: 'Bloom filters are usually introduced with only an abstract false-positive-rate formula. This snippet replaces the abstraction with a reproducible, hand-verified collision you can point to and explain bit by bit, then pairs naturally with the [trie autocomplete visualizer](/ui-snippets/trie-autocomplete-visualizer) for a broader search-and-lookup-structures teaching sequence.' },
      { icon: 'CODE', title: 'Interview preparation for Bloom filter and probabilistic data structure questions', desc: 'Bloom filters come up in interviews for caching, deduplication, and database-indexing questions (they back real systems like Cassandra\'s SSTable lookups and Chrome\'s Safe Browsing check). Watching a genuine collision happen builds the intuition to explain false-positive-but-never-false-negative behavior with a concrete example instead of a memorized definition.' },
      { icon: 'APP', title: 'Debugging aid for a real Bloom-filter-backed feature', desc: 'If a production system using a Bloom filter (e.g. a "have we seen this before" dedup check) is reporting unexpected possibly-in-set results, reproducing a similarly small hash space here helps explain to a team why an occasional false positive is expected behavior rather than a bug.' },
      { icon: 'DESIGN', title: 'Interactive demo for a data structures course or blog post', desc: 'Embed as a live, typeable companion to an article on Bloom filters or probabilistic data structures, letting readers add their own words and immediately see whether they created new bit collisions, rather than only reading about the possibility.' },
      { icon: 'DASH', title: 'Explaining space-efficient membership testing to a product or infra team', desc: 'Use the visible bit array to make the "constant, tiny memory footprint regardless of how many words are added" trade-off tangible when proposing a Bloom filter for a real deduplication, caching, or spam-filtering feature.' },
      { icon: 'CODE', title: 'Related: Canvas Kaleidoscope Drawing', desc: 'See the [Canvas Kaleidoscope Drawing](/ui-snippets/canvas-kaleidoscope-drawing/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Inbox Row Expand — Vanilla FLIP Detail View', desc: 'See the [Inbox Row Expand — Vanilla FLIP Detail View](/ui-snippets/inbox-row-expand-flip-detail/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Can I use this Bloom filter visualizer in React, Vue, or Angular?', a: 'Yes. Move the three hash functions and the bits array into a plain utility module — they are pure functions with no DOM access. The async addWord() and checkWord() functions use await wait(ms) between animation steps rather than a persistent interval, so in React run them from a click handler and guard each awaited step with a mounted ref (check ref.current before touching state after each await) so a check in progress does not try to update state after unmount. In Vue, use a local "cancelled" flag set in onUnmounted and check it after each await. In Angular, use an isDestroyed flag set in ngOnDestroy. There is no setInterval or requestAnimationFrame loop to clear — the only cleanup concern is an in-flight chain of awaited setTimeout delays.' },
      { q: 'Why does checking "mango" report a false positive when mango was never added?', a: 'Because mango, run through the exact same three hash functions used to add apple, banana, and cherry, happens to land on the identical three bit positions (30, 23, and 20) that adding "apple" already set. The Bloom filter has no way to distinguish "these bits are set because mango was added" from "these bits are set because some other word that hashes identically was added" — it only ever sees 1s and 0s in the bit array, never the original words. This is not a rare edge case unique to this demo; any Bloom filter with a small enough bit array relative to the number of items inserted will eventually produce collisions like this.' },
      { q: 'Why can a Bloom filter never produce a false negative?', a: 'Because bits are only ever set to 1, never cleared back to 0, when a word is added — every bit that was set by a real addWord() call stays set forever. So if a word really was added, all three of its hash positions are guaranteed to still read 1 whenever it is checked later, meaning the check can never wrongly report "definitely NOT in the set" for something that truly was added. The only uncertainty runs in one direction: bits being 1 does not guarantee the checked word caused them.' },
      { q: 'What happens if I add more and more words to this filter?', a: 'Each added word sets up to three more bits (fewer if some were already set by earlier words). As more of the 32 bits fill up with 1s, the odds that a random unrelated word\'s three hash positions all happen to already be set goes up, meaning the false-positive rate rises. This is the real, general trade-off behind Bloom filter sizing: a larger bit array relative to the number of items inserted keeps the false-positive rate low, while a small array like this 32-bit demo makes collisions easy to trigger on purpose.' },
      { q: 'Why does the demo use three hash functions instead of just one?', a: 'A single hash function means any word that happens to collide on that one position with a previously-added word gets a false positive immediately. Requiring all three independent hash functions to agree makes an accidental collision on every single one much less likely for arbitrary words, which is why real Bloom filters almost always use multiple hash functions — this snippet\'s apple/mango collision is a deliberately engineered example of exactly the rare case three independent hashes are meant to make uncommon.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's JavaScript to an AI assistant like Claude and ask it to verify by hand, character by character, why "apple" and "mango" land on the same three hash positions under hash1, hash2, and hash3 — walking through the actual arithmetic is the fastest way to really trust the false-positive claim instead of just believing it. Worth asking for as extensions: a live false-positive-rate estimator that samples random words against the current bit array, a larger bit array with a slider to watch the false-positive rate drop as size increases, or a second filter running side by side with only one hash function to show how much more collision-prone a single-hash design is.`,
      prompt: `Build an animated Bloom filter visualizer in plain HTML, CSS, and JavaScript, no libraries or frameworks.

Requirements:
- A fixed-size bit array (24-32 bits) rendered as a grid of small boxes, all starting unset, backed by a plain JavaScript array of 0s and 1s as the filter's only real state.
- Implement 2-3 small, genuinely distinct hash functions (different multiplier, seed, or character-index sensitivity from each other) that each map a string to a position within the bit array, all computed live in plain JavaScript with no external hashing library.
- An "Add" input that, on submit, computes all hash positions for the typed word and animates each corresponding bit flipping from 0 to 1 in sequence (a brief pulse per bit, not all at once), leaving the bits permanently set afterward.
- A "Check" input that, on submit, computes the same hash positions for a typed word and reports "possibly in the set" only if every one of those bit positions is currently 1, or "definitely NOT in the set" the moment it finds any one of them still 0.
- Choose your specific hash functions and a specific set of words to add such that checking a different word — one that was deliberately never added — produces a genuine false positive, where all of its hash positions happen to already be set by the other added words; verify this collision actually occurs given your exact hash function implementations rather than assuming it will.
- Track internally which words were actually added (for the demo's own labeling purposes only, not as part of the filter's real logic) so the check result can explicitly tell the user whether a "possibly in the set" answer was a true positive or a genuine false positive, making the false-positive-but-never-false-negative property directly demonstrable rather than merely claimed.`,
    },
  },
};

export default bloomFilterVisualizer;
