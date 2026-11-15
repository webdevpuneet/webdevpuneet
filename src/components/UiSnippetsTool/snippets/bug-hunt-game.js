const bugHuntGame = {
  id: 'bug-hunt-game',
  title: 'Bug Hunt Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="demo-wrap">
  <div class="bh-game">
    <div class="bh-head">
      <div class="bh-meta"><span class="bh-label">Bug</span><span class="bh-value" id="bhNum">1 / 7</span></div>
      <div class="bh-meta bh-right"><span class="bh-label">Found</span><span class="bh-value" id="bhScore">0</span></div>
    </div>

    <p class="bh-brief" id="bhBrief">This function should return the largest number in the array.</p>

    <div class="bh-file">
      <div class="bh-file-bar"><span class="bh-dot"></span><span class="bh-dot"></span><span class="bh-dot"></span><span class="bh-file-name" id="bhFileName">largest.js</span></div>
      <ol class="bh-code" id="bhCode"></ol>
    </div>

    <p class="bh-status" id="bhStatus">Click the line that contains the bug.</p>

    <div class="bh-fix" id="bhFix" hidden>
      <span class="bh-fix-title">The fix</span>
      <pre class="bh-fix-code" id="bhFixCode"></pre>
      <p class="bh-fix-text" id="bhFixText"></p>
      <button class="bh-btn" id="bhNext">Next bug</button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #111827; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 28px 16px; }

.bh-game {
  width: 100%; max-width: 460px; padding: 20px;
  background: #1f2937; border: 1px solid #374151; border-radius: 16px;
  display: flex; flex-direction: column; gap: 13px;
  box-shadow: 0 18px 40px rgba(0,0,0,0.4);
}

.bh-head { display: flex; justify-content: space-between; }
.bh-meta { display: flex; flex-direction: column; gap: 2px; }
.bh-right { align-items: flex-end; }
.bh-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #9ca3af; }
.bh-value { font-size: 16px; font-weight: 800; color: #f9fafb; }

.bh-brief {
  font-size: 13.5px; font-weight: 600; color: #e5e7eb; line-height: 1.5;
  background: #111827; border-left: 3px solid #f97316; border-radius: 0 8px 8px 0; padding: 10px 12px;
}

.bh-file { border-radius: 11px; overflow: hidden; border: 1px solid #374151; background: #0b1120; }
.bh-file-bar { display: flex; align-items: center; gap: 6px; padding: 8px 11px; background: #111827; border-bottom: 1px solid #374151; }
.bh-dot { width: 9px; height: 9px; border-radius: 50%; background: #374151; }
.bh-file-name {
  margin-left: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px; color: #9ca3af;
}

.bh-code { list-style: none; counter-reset: line; padding: 8px 0; }
.bh-code li {
  counter-increment: line; display: flex; gap: 10px; padding: 3px 12px; cursor: pointer;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; line-height: 1.6;
  color: #d1d5db; white-space: pre; transition: background 0.12s;
}
.bh-code li::before {
  content: counter(line); width: 16px; flex: 0 0 auto; text-align: right;
  color: #4b5563; font-size: 11px;
}
.bh-code li:hover:not(.locked) { background: rgba(249,115,22,0.12); }
.bh-code.locked li { cursor: default; }
.bh-code li.hit { background: rgba(74,222,128,0.16); box-shadow: inset 3px 0 0 #4ade80; }
.bh-code li.miss { background: rgba(248,113,113,0.16); box-shadow: inset 3px 0 0 #f87171; }

.bh-status { font-size: 12px; font-weight: 600; color: #9ca3af; min-height: 17px; }
.bh-status.ok { color: #4ade80; }
.bh-status.err { color: #f87171; }

.bh-fix { display: flex; flex-direction: column; gap: 8px; padding: 12px; border-radius: 10px; background: #111827; border: 1px solid #374151; }
.bh-fix-title { font-size: 11px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #4ade80; }
.bh-fix-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: #bbf7d0;
  background: #0b1120; border-radius: 7px; padding: 9px 11px; white-space: pre; overflow-x: auto;
}
.bh-fix-text { font-size: 13px; line-height: 1.6; color: #d1d5db; }
.bh-btn {
  align-self: flex-start; padding: 9px 15px; border: none; border-radius: 8px;
  background: #f97316; color: #fff; font-size: 13px; font-weight: 700; font-family: inherit; cursor: pointer;
}
.bh-btn:hover { background: #ea580c; }`,

  js: `var BUGS = [
  {
    file: 'largest.js',
    brief: 'This should return the largest number in the array.',
    lines: [
      'function largest(nums) {',
      '  let max = 0;',
      '  for (const n of nums) {',
      '    if (n > max) max = n;',
      '  }',
      '  return max;',
      '}',
    ],
    bug: 1,
    fix: 'let max = nums[0];',
    why: 'Seeding max at 0 breaks for arrays of all-negative numbers: largest([-5, -2]) returns 0, a value that was never in the input. Seed from the first element instead (and decide what an empty array should do).',
  },
  {
    file: 'total.js',
    brief: 'This should sum every price in the cart.',
    lines: [
      'function total(cart) {',
      '  let sum = 0;',
      '  for (let i = 0; i <= cart.length; i++) {',
      '    sum += cart[i].price;',
      '  }',
      '  return sum;',
      '}',
    ],
    bug: 2,
    fix: 'for (let i = 0; i < cart.length; i++) {',
    why: 'The classic off-by-one: <= runs one iteration past the end, so cart[cart.length] is undefined and reading .price throws a TypeError. Array indexes stop at length - 1.',
  },
  {
    file: 'toggle.js',
    brief: 'This should flip a boolean setting and return the new value.',
    lines: [
      'function toggle(state, key) {',
      '  state[key] = !state[key];',
      '  return state.key;',
      '}',
    ],
    bug: 2,
    fix: 'return state[key];',
    why: 'Dot notation looks up a literal property named "key", not the value held in the key variable. It returns undefined for every call. Use bracket notation when the property name is dynamic.',
  },
  {
    file: 'search.js',
    brief: 'This should return true when the id is found.',
    lines: [
      'function hasUser(users, id) {',
      '  users.forEach(u => {',
      '    if (u.id === id) return true;',
      '  });',
      '  return false;',
      '}',
    ],
    bug: 2,
    fix: 'return users.some(u => u.id === id);',
    why: 'return inside a forEach callback exits only that callback, not the outer function — forEach ignores return values entirely, so hasUser always returns false. Use some(), find(), or a plain for loop you can actually return from.',
  },
  {
    file: 'debounce.js',
    brief: 'This should call fn only after the user stops typing.',
    lines: [
      'function debounce(fn, wait) {',
      '  let timer;',
      '  return function (...args) {',
      '    timer = setTimeout(() => fn(...args), wait);',
      '  };',
      '}',
    ],
    bug: 3,
    fix: 'clearTimeout(timer); timer = setTimeout(() => fn(...args), wait);',
    why: 'Without clearing the previous timer first, every keystroke schedules its own delayed call, so nothing is actually debounced — fn fires once per event, just late. Cancelling the pending timer before scheduling a new one is the whole mechanism.',
  },
  {
    file: 'copy.js',
    brief: 'This should return a copy that can be edited safely.',
    lines: [
      'function copySettings(settings) {',
      '  const copy = settings;',
      '  copy.theme = "dark";',
      '  return copy;',
      '}',
    ],
    bug: 1,
    fix: 'const copy = { ...settings };',
    why: 'Assigning an object copies the reference, not the object, so copy and settings are the same object and the caller\\'s original is mutated. Spread makes a shallow copy; use structuredClone for nested data.',
  },
  {
    file: 'discount.js',
    brief: 'This should apply a discount only to orders over 100.',
    lines: [
      'function finalPrice(order) {',
      '  if (order.total > 100);',
      '    return order.total * 0.9;',
      '  return order.total;',
      '}',
    ],
    bug: 1,
    fix: 'if (order.total > 100)',
    why: 'The stray semicolon ends the if statement immediately, so its body is empty and the return below runs unconditionally — every order gets the discount. This one is invisible in review and passes a linter without the right rule enabled.',
  },
];

var order = [];
var pos = 0;
var found = 0;
var locked = false;

var codeEl = document.getElementById('bhCode');
var briefEl = document.getElementById('bhBrief');
var fileNameEl = document.getElementById('bhFileName');
var statusEl = document.getElementById('bhStatus');
var fixEl = document.getElementById('bhFix');
var fixCodeEl = document.getElementById('bhFixCode');
var fixTextEl = document.getElementById('bhFixText');
var numEl = document.getElementById('bhNum');
var scoreEl = document.getElementById('bhScore');

function shuffledIndices(n) {
  var arr = Array.from({ length: n }, function (_, i) { return i; });
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

function current() { return BUGS[order[pos]]; }

function setStatus(msg, kind) {
  statusEl.textContent = msg;
  statusEl.className = 'bh-status' + (kind ? ' ' + kind : '');
}

function render() {
  var b = current();
  locked = false;
  fixEl.hidden = true;
  codeEl.classList.remove('locked');
  briefEl.textContent = b.brief;
  fileNameEl.textContent = b.file;
  numEl.textContent = (pos + 1) + ' / ' + BUGS.length;
  scoreEl.textContent = found;

  codeEl.innerHTML = '';
  b.lines.forEach(function (line, i) {
    var li = document.createElement('li');
    li.textContent = line;
    li.dataset.index = i;
    codeEl.appendChild(li);
  });

  setStatus('Click the line that contains the bug.', '');
}

function guess(i) {
  if (locked) return;
  locked = true;
  var b = current();
  codeEl.classList.add('locked');

  var lines = codeEl.children;
  lines[b.bug].classList.add('hit');
  if (i !== b.bug) lines[i].classList.add('miss');

  if (i === b.bug) {
    found++;
    scoreEl.textContent = found;
    setStatus('Found it — line ' + (b.bug + 1) + '.', 'ok');
  } else {
    setStatus('Not that one. The bug is on line ' + (b.bug + 1) + '.', 'err');
  }

  fixCodeEl.textContent = b.fix;
  fixTextEl.textContent = b.why;
  fixEl.hidden = false;
}

function next() {
  if (pos === BUGS.length - 1) {
    setStatus('Round complete — ' + found + ' of ' + BUGS.length + ' found. Reshuffling…', 'ok');
    setTimeout(start, 1400);
    fixEl.hidden = true;
    return;
  }
  pos++;
  render();
}

function start() {
  order = shuffledIndices(BUGS.length);
  pos = 0;
  found = 0;
  render();
}

codeEl.addEventListener('click', function (e) {
  var li = e.target.closest('li');
  if (li) guess(Number(li.dataset.index));
});
document.getElementById('bhNext').addEventListener('click', next);

start();

/* wdp-share:start */
(function () {
  var TITLE = 'Bug Hunt Game', URL = 'https://webdevpuneet.com/ui-snippets/bug-hunt-game/';
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
    title: 'Bug Hunt Game — Free HTML CSS JS Snippet',
    description: 'Spot the buggy line in seven real JavaScript functions, each with the fix and an explanation. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Bug Hunt Game — Clickable Code Lines, Real Failure Modes & A Fix Shown After Every Guess',
      description: `Reading code for defects is a skill nobody is explicitly taught — it is absorbed slowly through code review, usually after shipping the same bug once. This snippet compresses that loop into something playable: a short function with a stated purpose, a file-window UI with numbered lines, and one click to say where the defect is. Every round ends by showing the corrected line and explaining exactly how the original fails, so a wrong guess costs nothing but still teaches the pattern.

**Seven defects that are real, not typos**

The bugs are chosen because each represents a class of failure rather than a one-off slip: seeding a maximum at \`0\` so all-negative input returns a value that was never in the array; the \`<=\` off-by-one that reads one past the end and throws on property access; dot notation used for a dynamic property so \`state.key\` looks up a literal \`"key"\`; \`return\` inside a \`forEach\` callback, which exits the callback and is silently discarded, making the function always return false; a debounce that never calls \`clearTimeout\`, so every event still fires — just late; assigning an object and mutating the "copy", which writes through to the caller's original; and a stray semicolon after \`if (...)\` that empties the conditional's body so the discount applies to every order. Each \`why\` string names the mechanism, and each \`fix\` shows the corrected line ready to read.

**Clickable lines built from data, numbered by CSS**

Each bug is a data object holding the file name, a brief describing intended behaviour, an array of source lines, the index of the defective line, the corrected line, and the explanation. Lines render as \`<li>\` elements carrying a \`data-index\`, and line numbers come from a CSS \`counter-reset\`/\`counter-increment\` pair with the value drawn in a \`::before\` pseudo-element — so the numbers are presentational only. That matters more than it sounds: a player who selects and copies the code gets the code, not a column of numbers glued to it, which is exactly how a real editor behaves.

**A brief that makes the bug findable**

Every level states what the function is *supposed* to do before showing the code, because a defect is only a defect relative to an intention. Without the brief, the \`max = 0\` seed and the \`forEach\` return are unfalsifiable — the code is internally consistent and syntactically fine. Giving the intent first is also the honest model of real review: you cannot review code whose purpose you do not know.

**One guess, then the answer**

A \`locked\` flag makes each round single-shot: the first click resolves it. The correct line is always highlighted green whether or not the player found it, and a wrong pick is marked red simultaneously, so both pieces of information are on screen at once. The container also gets a \`locked\` class that removes the hover affordance and the pointer cursor, which is the visual signal that the round is over — state expressed through a class on the parent rather than by unbinding listeners, so nothing has to be re-bound on the next render.

**Shuffled rounds over an index array**

\`start()\` shuffles an array of indices with Fisher-Yates and walks that, leaving \`BUGS\` itself untouched, so a replay presents the same seven defects in a new order. Finishing the last bug reports the round score and restarts automatically after a short pause.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the brief first', text: 'The orange-bordered line states what the function is supposed to do. That intent is what makes the defect findable — several of these bugs are syntactically valid code that is simply wrong for the stated purpose.' },
        { title: 'Scan the numbered lines', text: 'The code renders in a file-window with numbered lines, and hovering highlights the line under your cursor. Line numbers come from a CSS counter, so selecting and copying the code gives you clean source without the numbers.' },
        { title: 'Click the line you think is wrong', text: 'You get one click per round. The correct line highlights green regardless of your answer, and a wrong pick is marked red at the same time so you can compare the two directly.' },
        { title: 'Read the fix and the explanation', text: 'Every round shows the corrected line as copy-ready code plus a written explanation of the failure — why returning inside forEach is discarded, why <= reads past the end, why a stray semicolon empties an if body.' },
        { title: 'Continue through all seven bugs', text: 'The found counter tracks how many you spotted on the first try. After the last bug the round score is announced and the game reshuffles automatically for another pass.' },
        { title: 'Replay for a different order', text: 'Each round shuffles an array of indices with a Fisher-Yates pass rather than mutating the source data, so the same seven defects arrive in a new sequence every time.' },
      ],
    },
    features: [
      'Seven real defect classes: bad accumulator seed, off-by-one loop bound, dot notation on a dynamic key, return inside forEach, missing clearTimeout in a debounce, reference copy mistaken for a clone, and a stray semicolon after if',
      'A stated intent per level, without which several of the defects would be unfalsifiable',
      'Corrected line shown as copy-ready code alongside a written explanation of the failure mechanism',
      'Line numbers rendered with a CSS counter in a ::before pseudo-element, so copied code stays clean',
      'Single-guess rounds with a locked flag, highlighting the correct line whether or not it was found',
      'Round-over state expressed as a class on the code container rather than by unbinding event listeners',
      'Event-delegated clicks resolving the line index from a data attribute',
      'Fisher-Yates shuffle over an index array so replays reorder without mutating the source data',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Code review training for junior developers', desc: 'Reading for defects is learned by repetition against real failure classes, not by reading a style guide. A short bug hunt makes an effective warm-up before a review session, especially paired with a [predict the output quiz](/ui-snippets/code-output-quiz-game/) covering the language quirks that cause the same bugs.' },
      { icon: 'CODE', title: 'Internal onboarding for a codebase\'s common mistakes', desc: 'Swap the BUGS array for defects that actually recur in your repository — a forgotten cleanup, a misused helper, an unsafe cast — and the game becomes a targeted onboarding module that teaches your team\'s specific footguns rather than generic ones.' },
      { icon: 'APP', title: 'Developer marketing, careers pages, and conference booths', desc: 'A two-minute bug hunt is instantly legible to a technical audience and demonstrates competence better than a feature list. It sits well beside other learn-by-playing snippets such as the [CSS Selector Challenge Game](/ui-snippets/css-selector-challenge-game/).' },
      { icon: 'DESIGN', title: 'File-window UI pattern for code presentation', desc: 'The window chrome, monospaced line list, CSS-counter line numbers, hover affordance and inset highlight bar together make a clean, reusable pattern for any interface that displays code — diff viewers, error reports, and documentation callouts.' },
      { icon: 'FLOW', title: 'Interactive changelog or postmortem storytelling', desc: 'Engineering blog posts about an incident can present the offending code and let readers try to spot the defect before revealing it, which is far more memorable than a screenshot with an arrow drawn on it.' },
      { icon: 'FORM', title: 'Assessment component for a hiring or training platform', desc: 'Because each round is one data object and one click, the format is easy to score and instrument — recording which defect classes a candidate misses is more informative than a single pass/fail on a whole exercise.' },
      { icon: 'CODE', title: 'Related: Blackjack Card Game vs Dealer', desc: 'See the [Blackjack Card Game vs Dealer](/ui-snippets/blackjack-card-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Word Ladder Game', desc: 'See the [Word Ladder Game](/ui-snippets/word-ladder-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Sokoban Box Pushing Game', desc: 'See the [Sokoban Box Pushing Game](/ui-snippets/sokoban-puzzle-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Nonogram Puzzle Game', desc: 'See the [Nonogram Puzzle Game](/ui-snippets/nonogram-puzzle-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is a brief shown above every code sample?', a: 'Because a bug only exists relative to intended behaviour. Several of these samples — seeding max at 0, returning inside forEach — are perfectly valid JavaScript that simply does not do what was wanted. Without the stated intent there is nothing to judge the code against, which is also true of real code review.' },
      { q: 'How are the line numbers rendered?', a: 'With CSS counters: counter-reset on the list, counter-increment on each item, and the value drawn in a ::before pseudo-element. They are presentational only, so a player who selects and copies the code gets the source without a column of numbers merged into it — the same behaviour a real editor gives you.' },
      { q: 'Do I get more than one guess per bug?', a: 'No — a locked flag makes each round single-shot, which keeps the game honest about whether you actually spotted the defect. The correct line highlights green either way and a wrong pick is marked red at the same time, so a miss still shows you both what you chose and what was right.' },
      { q: 'How do I use my own code samples?', a: 'Push an object onto the BUGS array with six keys: file (the filename shown in the window chrome), brief (what the code should do), lines (an array of source lines, one string per line), bug (the zero-based index of the defective line), fix (the corrected line), and why (the explanation). Keep samples short — seven lines or fewer reads well without scrolling.' },
      { q: 'Can I use this bug hunt game in React, Vue, or Angular?', a: 'Yes. Keep BUGS in a module, hold the shuffled order, position, score and locked flag in component state, and render the lines from the data array with the highlight classes derived from state rather than added imperatively. A single click handler on the list with the index from the rendered item replaces the delegated listener, and the auto-restart timeout should be cleared on unmount in useEffect / onUnmounted / ngOnDestroy.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add a second phase per round where, after finding the buggy line, the player has to pick the correct fix from three plausible candidates — spotting a defect and knowing how to repair it are different skills, and the wrong-but-tempting fixes are where the real teaching happens. Other extensions worth requesting: a timer with a par time per bug, a difficulty ramp that shows longer functions with more distractor lines, a category tag per bug (async, mutation, off-by-one) with per-category accuracy tracked in localStorage so weak areas can be replayed, or a mode that shows a failing test output instead of a written brief so players debug from a symptom rather than a description.`,
      prompt: `Build a playable "spot the bug" code review game in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- A BUGS array where each entry has a file name, a brief describing what the code is SUPPOSED to do, an array of source lines, the zero-based index of the defective line, the corrected line, and an explanation of how the original fails.
- Choose defects that represent real failure classes rather than typos: an accumulator seeded at 0 that breaks on all-negative input, a <= loop bound that reads past the end, dot notation used for a dynamic property key, return inside a forEach callback being discarded, a debounce missing clearTimeout, an object assignment mistaken for a copy, and a stray semicolon after an if condition.
- Render the code in a file-window UI as a list of clickable lines, with line numbers produced by CSS counters in a ::before pseudo-element so copied code stays clean.
- Always show the brief above the code — a defect is only judgeable against stated intent.
- Allow one guess per round using a locked flag. On the guess, highlight the correct line green whether or not the player found it, mark a wrong pick red at the same time, and reveal both the corrected line as copy-ready code and the written explanation.
- Express the round-over state as a class on the code container that removes hover affordances, rather than unbinding event listeners.
- Use event delegation with a data-index attribute for line clicks, shuffle the round order with Fisher-Yates over an array of indices (never mutating the source data), and report the round score before reshuffling for another pass.`,
    },
  },
};

export default bugHuntGame;
