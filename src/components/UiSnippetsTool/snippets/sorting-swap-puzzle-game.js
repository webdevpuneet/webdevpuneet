const sortingSwapPuzzleGame = {
  id: 'sorting-swap-puzzle-game',
  title: 'Sorting Swap Puzzle Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="demo-wrap">
  <div class="sw-game">
    <div class="sw-head">
      <div class="sw-meta"><span class="sw-label">Swaps</span><span class="sw-value" id="swCount">0</span></div>
      <div class="sw-meta sw-center"><span class="sw-label">Minimum</span><span class="sw-value" id="swPar">0</span></div>
      <div class="sw-meta sw-right"><span class="sw-label">Inversions</span><span class="sw-value" id="swInv">0</span></div>
    </div>

    <p class="sw-goal">Sort the bars ascending. Click two bars to swap them — the minimum is the fewest swaps this arrangement can possibly need.</p>

    <div class="sw-bars" id="swBars"></div>

    <div class="sw-controls">
      <button class="sw-btn sw-primary" id="swNew">New puzzle</button>
      <button class="sw-btn sw-ghost" id="swSolve">Auto-solve</button>
    </div>

    <p class="sw-status" id="swStatus">Pick a bar to start.</p>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 28px 16px; }

.sw-game {
  width: 100%; max-width: 440px; padding: 20px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  display: flex; flex-direction: column; gap: 14px;
  box-shadow: 0 12px 32px rgba(15,23,42,0.08);
}

.sw-head { display: flex; justify-content: space-between; }
.sw-meta { display: flex; flex-direction: column; gap: 2px; }
.sw-center { align-items: center; }
.sw-right { align-items: flex-end; }
.sw-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; }
.sw-value { font-size: 17px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; }

.sw-goal {
  font-size: 12.5px; font-weight: 600; color: #475569; line-height: 1.55;
  background: #f8fafc; border-left: 3px solid #14b8a6; border-radius: 0 8px 8px 0; padding: 9px 12px;
}

.sw-bars {
  display: flex; align-items: flex-end; gap: 6px; height: 170px;
  padding: 10px; border-radius: 12px; background: #f1f5f9; border: 1px solid #e2e8f0;
}
.sw-bar {
  flex: 1; display: flex; align-items: flex-end; justify-content: center;
  border: none; padding: 0 0 5px; border-radius: 7px 7px 4px 4px; cursor: pointer;
  background: #14b8a6; color: #f0fdfa; font-family: inherit; font-size: 11px; font-weight: 800;
  transition: height 0.22s ease, background 0.15s, transform 0.15s;
}
.sw-bar:hover { background: #0d9488; }
.sw-bar.picked { background: #f59e0b; transform: translateY(-6px); }
.sw-bar.settled { background: #22c55e; }
.sw-bars.done .sw-bar { background: #22c55e; }

.sw-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
.sw-btn { padding: 10px 0; border-radius: 9px; font-size: 13px; font-weight: 700; font-family: inherit; cursor: pointer; border: none; }
.sw-primary { background: #14b8a6; color: #fff; }
.sw-primary:hover { background: #0d9488; }
.sw-ghost { background: #f8fafc; color: #475569; border: 1.5px solid #e2e8f0; }
.sw-ghost:hover { border-color: #14b8a6; color: #0f766e; }

.sw-status { font-size: 12px; font-weight: 600; color: #64748b; min-height: 17px; }
.sw-status.ok { color: #16a34a; }`,

  js: `var SIZE = 8;

var barsEl = document.getElementById('swBars');
var countEl = document.getElementById('swCount');
var parEl = document.getElementById('swPar');
var invEl = document.getElementById('swInv');
var statusEl = document.getElementById('swStatus');

var values = [];
var sorted = [];
var picked = null;
var swaps = 0;
var par = 0;
var busy = false;

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// Minimum swaps to sort ANY arrangement = n - (number of cycles in the
// permutation). Each cycle of length k needs exactly k - 1 swaps.
function minSwaps(list) {
  var target = list.slice().sort(function (a, b) { return a - b; });
  var indexOf = {};
  target.forEach(function (v, i) { indexOf[v] = i; });

  var seen = new Array(list.length).fill(false);
  var swapsNeeded = 0;
  for (var i = 0; i < list.length; i++) {
    if (seen[i] || indexOf[list[i]] === i) continue;
    var size = 0;
    var j = i;
    while (!seen[j]) {         // walk the cycle back to where it started
      seen[j] = true;
      j = indexOf[list[j]];
      size++;
    }
    swapsNeeded += size - 1;
  }
  return swapsNeeded;
}

// Inversions: pairs that are in the wrong relative order. One adjacent swap
// removes exactly one — which is why bubble sort takes as many passes as it does.
function inversions(list) {
  var total = 0;
  for (var i = 0; i < list.length; i++) {
    for (var j = i + 1; j < list.length; j++) {
      if (list[i] > list[j]) total++;
    }
  }
  return total;
}

function isSorted() {
  return values.every(function (v, i) { return v === sorted[i]; });
}

function setStatus(msg, kind) {
  statusEl.textContent = msg;
  statusEl.className = 'sw-status' + (kind ? ' ' + kind : '');
}

function render() {
  barsEl.innerHTML = '';
  var max = Math.max.apply(null, values);
  values.forEach(function (v, i) {
    var bar = document.createElement('button');
    bar.className = 'sw-bar';
    bar.style.height = Math.round((v / max) * 100) + '%';
    bar.textContent = v;
    bar.dataset.index = i;
    if (picked === i) bar.classList.add('picked');
    if (v === sorted[i]) bar.classList.add('settled');
    barsEl.appendChild(bar);
  });

  countEl.textContent = swaps;
  parEl.textContent = par;
  invEl.textContent = inversions(values);
  barsEl.classList.toggle('done', isSorted());
}

function swap(i, j) {
  var t = values[i]; values[i] = values[j]; values[j] = t;
}

function finishIfSorted() {
  if (!isSorted()) return false;
  var verdict = swaps === par
    ? 'Sorted in ' + swaps + ' swaps — that is the provable minimum.'
    : 'Sorted in ' + swaps + ' swaps. The minimum for that arrangement was ' + par + '.';
  setStatus(verdict, 'ok');
  return true;
}

function pick(i) {
  if (busy || isSorted()) return;
  if (picked === null) {
    picked = i;
    render();
    setStatus('Now pick the bar to swap it with.', '');
    return;
  }
  if (picked === i) { picked = null; render(); setStatus('Pick a bar to start.', ''); return; }

  swap(picked, i);
  swaps++;
  picked = null;
  render();
  if (!finishIfSorted()) setStatus('Inversions left: ' + inversions(values) + '.', '');
}

// Optimal solver: repeatedly send the value at position i to where it belongs.
// Every swap places at least one value permanently, so it hits the minimum.
function autoSolve() {
  if (busy || isSorted()) return;
  busy = true;
  picked = null;
  setStatus('Solving — each swap puts at least one bar in its final place.', '');

  var timer = setInterval(function () {
    var i = values.findIndex(function (v, idx) { return v !== sorted[idx]; });
    if (i === -1) {
      clearInterval(timer);
      busy = false;
      render();
      setStatus('Solved by the optimal algorithm in ' + swaps + ' swaps (minimum ' + par + ').', 'ok');
      return;
    }
    var destination = sorted.indexOf(values[i]);
    swap(i, destination);
    swaps++;
    render();
  }, 420);
}

function newPuzzle() {
  if (busy) return;
  var pool = [];
  for (var i = 0; i < SIZE; i++) pool.push((i + 1) * 10 + Math.floor(Math.random() * 6));
  values = shuffle(pool);
  if (values.every(function (v, i) { return v === pool[i]; })) values = shuffle(pool);  // never start solved
  sorted = values.slice().sort(function (a, b) { return a - b; });
  par = minSwaps(values);
  swaps = 0;
  picked = null;
  render();
  setStatus('Pick a bar to start.', '');
}

barsEl.addEventListener('click', function (e) {
  var bar = e.target.closest('.sw-bar');
  if (bar) pick(Number(bar.dataset.index));
});
document.getElementById('swNew').addEventListener('click', newPuzzle);
document.getElementById('swSolve').addEventListener('click', autoSolve);

newPuzzle();

/* wdp-share:start */
(function () {
  var TITLE = 'Sorting Swap Puzzle Game', URL = 'https://webdevpuneet.com/ui-snippets/sorting-swap-puzzle-game/';
  if (window.__wdpShare) return;
  window.__wdpShare = true;
  var blob = null;

  /* ---- UI: a small pill fixed to the bottom-right corner, and a panel above it ---- */
  var st = document.createElement('style');
  st.textContent =
    '.wdps-btn{position:fixed;right:12px;bottom:12px;z-index:2147483000;border:0;border-radius:99px;padding:9px 16px;font:700 13px/1 system-ui,sans-serif;background:#16a34a;color:#fff;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.3)}' +
    '.wdps-btn:active{transform:translateY(1px)}' +
    '.wdps-box{position:fixed;right:12px;bottom:56px;z-index:2147483000;max-width:min(92vw,330px);background:#fff;color:#1e293b;border:1px solid #d5e2ee;border-radius:14px;padding:10px 12px;font:600 12px/1.4 system-ui,sans-serif;box-shadow:0 8px 26px rgba(0,0,0,.3);display:flex;flex-wrap:wrap;gap:6px;align-items:center}' +
    '.wdps-box[hidden]{display:none}' +
    '.wdps-box img{width:100%;border-radius:8px;border:1px solid #e2e8f0}' +
    '.wdps-box button,.wdps-box a{border:1px solid #d5e2ee;background:#f8fafc;color:#1e293b;border-radius:99px;padding:5px 11px;font:700 12px system-ui,sans-serif;text-decoration:none;cursor:pointer}' +
    '.wdps-box .wdps-x{margin-left:auto;border:0;background:none;font-size:16px;padding:0 4px}';
  document.head.appendChild(st);
  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'wdps-btn'; btn.textContent = 'Share result';
  var box = document.createElement('div');
  box.className = 'wdps-box'; box.hidden = true;
  box.innerHTML =
    '<img alt="Your result card">' +
    '<button type="button" data-a="more" hidden>Share&hellip;</button>' +
    '<button type="button" data-a="copy">Copy image</button>' +
    '<a data-a="dl" download="result.png">Download image</a>' +
    '<a data-a="wa" target="_blank" rel="noopener">WhatsApp</a>' +
    '<a data-a="x" target="_blank" rel="noopener">X</a>' +
    '<a data-a="fb" target="_blank" rel="noopener">Facebook</a>' +
    '<button type="button" class="wdps-x" data-a="close" aria-label="Close">&times;</button>' +
    '<span data-a="msg" style="width:100%;color:#64748b"></span>';
  document.body.appendChild(box);
  document.body.appendChild(btn);
  function q(a) { return box.querySelector('[data-a="' + a + '"]'); }

  /* ---- reading the result from the screen ---- */
  function shown(el) {
    if (!el || !el.getClientRects().length) return false;
    for (var n = el; n && n !== document.body; n = n.parentElement) {
      var cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.1) return false;
      if (n.hidden || n.getAttribute('aria-hidden') === 'true') return false;
    }
    return true;
  }
  function txt(el) { return (el.textContent || '').replace(/\\s+/g, ' ').trim(); }
  function sig(el) { return ((el.id || '') + ' ' + (typeof el.className === 'string' ? el.className : '')).toLowerCase(); }
  var OUTCOME = /(you win|you won|win!|wins|victory|game over|time.?s up|cleared|complete|solved|defeat|you lose|you lost|lost|draw|crash|failed|success|congrat|score|result|finished|beat)/i;
  function readResult() {
    var head = '', sub = '', root = null;
    var all = document.body.querySelectorAll('h1,h2,h3,h4,p,strong,div,span');
    for (var i = 0; i < all.length && !head; i++) {
      var el = all[i];
      if (el.closest('.wdps-box') || el.children.length > 2) continue;
      var s = sig(el);
      if (!/(title|headline|msg|message|banner|result|verdict|status)/.test(s)) continue;
      var t = txt(el);
      if (t.length < 3 || t.length > 70 || !OUTCOME.test(t) || !shown(el)) continue;
      head = t; root = el.parentElement;
    }
    if (root) {
      var kids = root.querySelectorAll('p,span,div');
      for (var j = 0; j < kids.length && !sub; j++) {
        var k = kids[j];
        if (k.children.length > 2 || !/(sub|text|summary|note|desc|detail)/.test(sig(k))) continue;
        var tt = txt(k);
        if (tt && tt !== head && tt.length >= 5 && tt.length <= 160 && shown(k)) sub = tt;
      }
    }
    return { head: head, sub: sub };
  }
  var STATRE = /(score|moves|time|wpm|best|level|streak|accuracy|combo|coins|distance|height|points|stars|lives|wins|attempt|guess)/;
  function readStats() {
    var out = [], seen = {};
    var all = document.body.querySelectorAll('span,strong,b,div,p,output');
    for (var i = 0; i < all.length && out.length < 4; i++) {
      var el = all[i];
      if (el.closest('.wdps-box') || el.children.length > 1) continue;
      if (!STATRE.test(sig(el))) continue;
      var t = txt(el);
      if (!t || t.length > 28 || !/[0-9]/.test(t) || !shown(el)) continue;
      if (!/[a-zA-Z]/.test(t) && el.parentElement) {
        var parts = [], ch = el.parentElement.childNodes;
        for (var p = 0; p < ch.length; p++) { var pv = (ch[p].textContent || '').replace(/\\s+/g, ' ').trim(); if (pv) parts.push(pv); }
        var pt = parts.join(' ');
        if (pt.length <= 30 && /[a-zA-Z]/.test(pt)) t = pt;
      }
      var key = t.toLowerCase();
      if (seen[key]) continue;
      seen[key] = 1; out.push(t);
    }
    return out;
  }
  function bestCanvas() {
    var cs = document.querySelectorAll('canvas'), best = null, area = 0;
    for (var i = 0; i < cs.length; i++) {
      var r = cs[i].getBoundingClientRect(), a = r.width * r.height;
      if (a > area && a > 8000 && shown(cs[i])) { area = a; best = cs[i]; }
    }
    return best;
  }

  /* ---- the card (1080 x 1080, drawn in memory) ---- */
  function wrap(g, text, x, y, maxW, lh, maxLines) {
    var words = text.split(' '), line = '', n = 0;
    for (var i = 0; i < words.length; i++) {
      var tst = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(tst).width > maxW && line) {
        g.fillText(line, x, y); y += lh; n++; line = words[i];
        if (n >= maxLines) return y;
      } else line = tst;
    }
    if (line) { g.fillText(line, x, y); y += lh; }
    return y;
  }
  function makeCard(info, cb) {
    var S = 1080, c = document.createElement('canvas');
    c.width = S; c.height = S;
    var g = c.getContext('2d');
    var gr = g.createLinearGradient(0, 0, S, S);
    gr.addColorStop(0, '#0f172a'); gr.addColorStop(1, '#312e81');
    g.fillStyle = gr; g.fillRect(0, 0, S, S);
    g.textAlign = 'center';
    g.fillStyle = '#a5b4fc'; g.font = '700 38px system-ui, sans-serif';
    g.fillText(TITLE.toUpperCase(), S / 2, 100);
    g.fillStyle = '#ffffff'; g.font = '800 84px system-ui, sans-serif';
    var y = wrap(g, info.head || 'Can you beat me?', S / 2, 215, 940, 94, 2);
    g.fillStyle = '#cbd5e1'; g.font = '600 38px system-ui, sans-serif';
    if (info.sub) y = wrap(g, info.sub, S / 2, y + 6, 900, 50, 2);
    g.fillStyle = '#fde68a'; g.font = '800 48px system-ui, sans-serif';
    for (var i = 0; i < info.stats.length; i++) { g.fillText(info.stats[i], S / 2, y + 60 + i * 60); }
    y = y + 60 + info.stats.length * 60;
    var cv = bestCanvas();
    if (cv) {
      try {
        var maxW = 900, maxH = Math.max(160, 930 - y), r = cv.width / cv.height;
        var w = maxW, h = w / r;
        if (h > maxH) { h = maxH; w = h * r; }
        var x = (S - w) / 2, yy = y + 20;
        g.save(); g.shadowColor = 'rgba(0,0,0,0.5)'; g.shadowBlur = 30; g.fillStyle = '#000';
        g.fillRect(x - 6, yy - 6, w + 12, h + 12); g.restore();
        g.drawImage(cv, x, yy, w, h);
      } catch (e) {}
    }
    g.fillStyle = '#ffffff'; g.font = '800 46px system-ui, sans-serif';
    g.fillText('Can you beat it?', S / 2, 990);
    g.fillStyle = '#94a3b8'; g.font = '700 32px system-ui, sans-serif';
    g.fillText('Play free at webdevpuneet.com', S / 2, 1040);
    var dataUrl = '';
    try { dataUrl = c.toDataURL('image/png'); } catch (e) {}
    c.toBlob(function (b) { cb(b, dataUrl); }, 'image/png');
  }

  function shareText(info) {
    var bits = [];
    if (info.head) bits.push(info.head);
    if (info.stats.length) bits.push(info.stats.join(', '));
    return TITLE + ': ' + (bits.length ? bits.join(' - ') + '. ' : '') + 'Can you beat it? ' + URL;
  }
  function msg(t) { q('msg').textContent = t; }
  function nativeShare(file, text) {
    navigator.share({ files: [file], title: TITLE, text: text }).catch(function () {});
  }

  btn.addEventListener('click', function () {
    var info = readResult(); info.stats = readStats();
    var text = shareText(info);
    makeCard(info, function (b, dataUrl) {
      blob = b;
      if (!b) { msg('Could not make the image here.'); box.hidden = false; return; }
      var file = null;
      try { file = new File([b], 'result.png', { type: 'image/png' }); } catch (e) {}
      var canNative = !!(file && navigator.canShare && navigator.canShare({ files: [file] }));
      var touch = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      box.querySelector('img').src = dataUrl;
      q('dl').href = dataUrl;
      var t = encodeURIComponent(text);
      q('wa').href = 'https://wa.me/?text=' + t;
      q('x').href = 'https://twitter.com/intent/tweet?text=' + t;
      q('fb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(URL) + '&quote=' + t;
      q('more').hidden = !canNative;
      q('more').onclick = function () { nativeShare(file, text); };
      msg('Copy or download the image, or pick a site.');
      if (canNative && touch) { nativeShare(file, text); }
      else { box.hidden = false; }
    });
  });
  q('close').addEventListener('click', function () { box.hidden = true; });
  q('copy').addEventListener('click', function () {
    try {
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(
        function () { msg('Image copied. Paste it into your chat or post.'); },
        function () { msg('Could not copy here. Try Download image.'); }
      );
    } catch (e) { msg('Copying images is not supported here. Try Download image.'); }
  });
})();
/* wdp-share:end */`,

  seo: {
    title: 'Sorting Swap Puzzle Game — Free HTML CSS JS Snippet',
    description: 'Sort bars by swapping pairs, scored against the provable minimum from cycle decomposition. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Sorting Swap Puzzle Game — Cycle-Decomposition Par, Live Inversion Count & An Optimal Auto-Solver',
      description: `Sorting is the first algorithm everyone learns and the last one most people actually understand, because a lecture on bubble sort teaches the procedure without ever explaining what makes one arrangement harder than another. This snippet is a playable sorting puzzle that puts the two real measures of disorder on screen: the minimum number of swaps the current arrangement can possibly need, computed by decomposing the permutation into cycles, and the live inversion count, which is the quantity every adjacent-swap sort exists to drive to zero.

**The minimum-swaps par is computed, not guessed**

\`minSwaps()\` treats the bar arrangement as a permutation and decomposes it into cycles. Every element belongs to exactly one cycle — the chain formed by asking "where does this value belong?", moving there, and repeating until you arrive back where you started — and a cycle of length \`k\` always needs exactly \`k - 1\` swaps to resolve. The minimum for the whole array is therefore \`n\` minus the number of cycles, which the function accumulates as it walks each unvisited position with a \`seen\` array. This is a genuine, provable lower bound rather than a hand-tuned difficulty number, and it is what makes "you sorted it in seven swaps, the minimum was five" a meaningful piece of feedback.

**Inversions as the other measure of disorder**

The header also shows the live inversion count: the number of pairs in the wrong relative order, counted by the straightforward O(n²) double loop. Watching it fall as you play makes a fact visible that bubble sort's proof depends on — a swap of adjacent elements removes exactly one inversion, so an array with 20 inversions cannot be sorted by fewer than 20 adjacent swaps no matter how cleverly you choose them. Seeing the two numbers side by side (minimum swaps and inversions) is the clearest possible demonstration that "how sorted is this" has more than one answer, and that the answer depends on which operations you are allowed.

**An auto-solver that is optimal by construction**

The Auto-solve button runs the placement algorithm rather than a textbook sort: find the first position holding the wrong value, look up where that value belongs, and swap it there. Because every such swap puts at least one value into its final position permanently, the algorithm can never exceed the cycle-decomposition minimum — and watching it step through at 420ms per swap makes the cycle structure visible, since each cycle resolves as a run of consecutive swaps before the solver moves on to the next.

**Feedback baked into the rendering**

\`render()\` rebuilds the bars from the \`values\` array on every change, deriving each bar's height from its value relative to the maximum, and marks any bar already standing in its final position with a \`settled\` class. That single visual cue converts an abstract goal into a concrete one — the player can see which bars are done — without giving away which swap to make next. Because everything on screen is derived from one array on each render, the display cannot disagree with the model.

**Two-click swapping with a cancel**

Selecting a bar lifts it and stores its index; selecting a second swaps them and clears the selection; selecting the same bar again cancels. Values are generated as distinct numbers so the permutation logic never has to break a tie between equal elements, and a freshly generated puzzle is reshuffled if it happens to come out already sorted.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the two numbers in the header', text: 'Minimum is the provable fewest swaps this arrangement can be sorted in, computed by cycle decomposition. Inversions counts the pairs currently in the wrong relative order — a different measure of the same disorder.' },
        { title: 'Click a bar to pick it up', text: 'The selected bar lifts and turns amber. Clicking it again cancels the selection, so a misclick costs nothing.' },
        { title: 'Click a second bar to swap', text: 'Any two bars can be swapped, not just adjacent ones, and the swap counter increments. Bars already standing in their final position are shown in green so you can see what is already done.' },
        { title: 'Watch the inversion count fall', text: 'The status line reports the remaining inversions after every swap. A single adjacent swap can only ever remove one inversion, which is exactly why bubble sort needs so many passes.' },
        { title: 'Compare your total against the minimum', text: 'Finishing reports whether you hit the provable minimum or how far over it you landed. Matching the minimum consistently means you are recognising cycles rather than sorting by feel.' },
        { title: 'Watch the optimal solver', text: 'Auto-solve repeatedly sends the first misplaced value to where it belongs. Each swap permanently places at least one bar, so it always finishes at the minimum — and each run of consecutive swaps is one cycle resolving.' },
      ],
    },
    features: [
      'Provable minimum swap count computed by permutation cycle decomposition (n minus the number of cycles)',
      'Live inversion count showing the other standard measure of array disorder',
      'Optimal auto-solver that places at least one value per swap, so it can never exceed the minimum',
      'Stepped solver animation that makes each permutation cycle visible as a run of consecutive swaps',
      'Bars already in their final position marked, giving progress feedback without revealing the next move',
      'Arbitrary pair swapping with a two-click select-and-swap flow and a cancel on re-click',
      'Distinct generated values, so the permutation logic never has to break ties between equal elements',
      'Freshly generated puzzles reshuffled if they come out already sorted',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching sorting, permutations and lower bounds', desc: 'Most sorting lessons cover procedures; this one covers the structure of the problem — cycles, inversions, and why a lower bound exists at all. It pairs naturally with a [stack and queue visualizer](/ui-snippets/stack-queue-visualizer/) or a [binary search tree visualizer](/ui-snippets/binary-search-tree-visualizer/) in an algorithms teaching sequence.' },
      { icon: 'CODE', title: 'Algorithm interview preparation', desc: 'Minimum swaps via cycle decomposition is a recurring interview question, and playing the puzzle a dozen times builds the intuition far faster than reading the solution — the cycles become something you can see rather than derive.' },
      { icon: 'APP', title: 'Daily puzzle feature or waiting-screen distraction', desc: 'A round lasts under a minute and has a natural score to beat (the minimum), which makes it a good fit for a daily-puzzle slot or a loading-screen diversion that happens to teach something.' },
      { icon: 'DESIGN', title: 'Bar-chart interaction pattern with derived rendering', desc: 'Heights derived from values relative to the maximum, a settled state per bar, and a full re-render from one array on every change make this a compact reference for any interactive chart where the data is edited in place.' },
      { icon: 'FLOW', title: 'Reference implementation of cycle decomposition', desc: 'The seen-array walk in minSwaps() is the canonical way to decompose a permutation, and it appears well beyond sorting — in scheduling, in matching problems, and anywhere a set of items must be rearranged with a minimum number of moves.' },
      { icon: 'FORM', title: 'Reordering UI with an optimality score', desc: 'Products that let users reorder a list — playlists, priority queues, seating plans — can borrow the idea of scoring a rearrangement against its theoretical minimum, turning a mundane drag-and-drop into something with feedback.' },
      { icon: 'CODE', title: 'Related: Typing Speed Test (WPM Counter)', desc: 'See the [Typing Speed Test (WPM Counter)](/ui-snippets/typing-speed-test/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the minimum swap count calculated?', a: 'By decomposing the arrangement into permutation cycles. Starting from each unvisited position, the code follows "where does this value belong" until it returns to the start, counting the cycle length; a cycle of length k needs exactly k - 1 swaps. Summing that across all cycles gives n minus the number of cycles, which is the provable minimum for arbitrary (non-adjacent) swaps.' },
      { q: 'Why show inversions as well as the minimum swaps?', a: 'Because they measure disorder under different rules. The minimum swap count assumes you can swap any two elements; the inversion count is the minimum number of ADJACENT swaps required, since one adjacent swap removes exactly one inversion. Seeing both makes it obvious that the difficulty of sorting depends on which operations are permitted — the insight behind why bubble sort is quadratic.' },
      { q: 'Is the auto-solver guaranteed to hit the minimum?', a: 'Yes, by construction. It finds the first position holding the wrong value and swaps that value directly to its destination, which places at least one element permanently on every swap. An algorithm that never wastes a swap and finishes cannot exceed the cycle-decomposition bound — and watching it run makes the cycles visible, since each one resolves as a run of consecutive swaps.' },
      { q: 'Why are the bar values distinct rather than arbitrary numbers?', a: 'Because cycle decomposition needs an unambiguous "where does this value belong" lookup. Duplicate values would make the destination index ambiguous, so the generator produces distinct values (spaced tens with a small random offset) and the puzzle is reshuffled if it happens to generate an already-sorted arrangement.' },
      { q: 'Can I use this sorting puzzle in React, Vue, or Angular?', a: 'Yes, and it ports cleanly because minSwaps(), inversions() and the solver step are pure functions of the array. Hold the values array, swap count and picked index in component state, derive the bar heights, the settled flags and both header numbers during render, and update with an immutable copy of the array rather than mutating in place. The auto-solve interval belongs in an effect with a cleanup (useEffect return, onUnmounted, ngOnDestroy) so it stops if the component unmounts mid-solve.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add an adjacent-swaps-only mode where the par becomes the inversion count instead of the cycle bound — playing the same board under both rule sets is the clearest possible demonstration of why the allowed operation determines the lower bound. Other extensions worth requesting: highlight the cycle a selected bar belongs to so the structure is visible before you solve it, add a race mode where a bubble sort and the optimal solver animate side by side with live swap counters, add a move-limited challenge that only accepts a minimum-swap solution, or extend the auto-solver into a step-through mode with a written explanation of each swap.`,
      prompt: `Build a playable sorting puzzle game in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- Render a row of bars from an array of distinct random values, with each bar's height derived from its value relative to the array maximum, and the whole row re-rendered from the array on every change.
- Let the player swap ANY two bars with a two-click select-then-swap flow, where clicking the selected bar again cancels the selection. Count the swaps.
- Compute and display the provable minimum number of swaps for the current arrangement using permutation cycle decomposition: walk each unvisited position following "where does this value belong" until the cycle closes, count the cycle length k, and add k - 1. The total is n minus the number of cycles.
- Also display a live inversion count (pairs in the wrong relative order) and explain in the UI copy that it is the minimum number of ADJACENT swaps — a different bound under different allowed operations.
- Mark any bar already standing in its final position with a distinct colour, so progress is visible without revealing the next move.
- Include an auto-solve button that runs an optimal algorithm: find the first position holding the wrong value, swap that value directly to its destination index, repeat. Animate it one swap at a time on an interval so each permutation cycle is visible as a run of consecutive swaps.
- On completion, report the player's swap count against the computed minimum. Generate distinct values so the destination lookup is unambiguous, and reshuffle if a new puzzle happens to be generated already sorted.`,
    },
  },
};

export default sortingSwapPuzzleGame;
