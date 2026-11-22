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
  var blob = null, file = null, lastInfo = null;

  /* ---- UI ---- */
  var st = document.createElement('style');
  st.textContent =
    '.wdps-in,.wdps-btn,.wdps-box{touch-action:manipulation;-webkit-tap-highlight-color:transparent}.wdps-in{display:block;margin:12px auto 0;border:0;border-radius:12px;padding:11px 22px;font:800 15px/1 system-ui,sans-serif;background:#16a34a;color:#fff;cursor:pointer;box-shadow:0 3px 0 #11793a;pointer-events:auto;position:relative;z-index:5}' +
    '.wdps-in:hover{background:#15803d}.wdps-in:active{transform:translateY(2px);box-shadow:0 1px 0 #11793a}' +
    '.wdps-btn{position:fixed;right:12px;bottom:12px;z-index:2147483000;border:0;border-radius:99px;padding:9px 16px;font:700 13px/1 system-ui,sans-serif;background:#16a34a;color:#fff;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.3)}' +
    '.wdps-btn.wdps-hot{animation:wdps-p 1.4s ease-in-out infinite}' +
    '@keyframes wdps-p{0%,100%{box-shadow:0 0 0 0 rgba(22,163,74,.6),0 3px 12px rgba(0,0,0,.3)}50%{box-shadow:0 0 0 9px rgba(22,163,74,0),0 3px 12px rgba(0,0,0,.3)}}' +
    '.wdps-btn:active{transform:translateY(1px)}' +
    '.wdps-in[hidden],.wdps-btn[hidden],.wdps-box[hidden],.wdps-box [hidden]{display:none}' +
    '.wdps-box{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:2147483001;width:max-content;max-width:calc(100vw - 24px);box-sizing:border-box;background:#fff;color:#64748b;border:1px solid #d5e2ee;border-radius:12px;padding:8px 12px;font:700 12px/1.4 system-ui,sans-serif;box-shadow:0 8px 26px rgba(15,23,42,.25);display:flex;flex-wrap:wrap;gap:8px;align-items:center}' +
    '.wdps-box button,.wdps-box a{border:1px solid #d5e2ee;background:#f8fafc;color:#1e293b;border-radius:99px;padding:5px 12px;font:700 12px system-ui,sans-serif;text-decoration:none;cursor:pointer}' +
    '.wdps-box .wdps-x{border:0;background:none;font-size:19px;line-height:1;padding:0 4px;margin-left:auto;color:#475569}' +
    '@media (max-width:700px){.wdps-box{width:calc(100vw - 24px);justify-content:center;padding:10px 12px}.wdps-box>span{width:100%;text-align:center}.wdps-box button,.wdps-box a{padding:9px 14px;font-size:13px}.wdps-box .wdps-x{position:absolute;top:4px;right:4px}.wdps-in{width:100%;max-width:320px}}';
  document.head.appendChild(st);

  var pill = document.createElement('button');
  pill.type = 'button'; pill.className = 'wdps-btn'; pill.textContent = 'Share result';
  var inl = document.createElement('button');
  inl.type = 'button'; inl.className = 'wdps-in'; inl.textContent = 'Share result'; inl.hidden = true;
  var box = document.createElement('div');
  box.className = 'wdps-box'; box.hidden = true;
  box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Share your result');
  box.innerHTML =
    '<span data-a="msg">Share your result:</span>' +
    '<button type="button" data-a="copy">Copy image</button>' +
    '<a data-a="dl" download="result.png">Download image</a>' +
    '<button type="button" data-a="more" hidden>More&hellip;</button>' +
    '<a data-a="wa" target="_blank" rel="noopener">WhatsApp</a>' +
    '<a data-a="x" target="_blank" rel="noopener">X</a>' +
    '<a data-a="fb" target="_blank" rel="noopener">Facebook</a>' +
    '<button type="button" class="wdps-x" data-a="close" aria-label="Close share options">&times;</button>';
  document.body.appendChild(box);
  document.body.appendChild(pill);
  function q(a) { return box.querySelector('[data-a="' + a + '"]'); }
  function ours(el) { return el === inl || el === pill || !!el.closest('.wdps-box'); }

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
  var OUTCOME = /(you win|you won|win!|wins|victory|game over|time.?s up|cleared|complete|solved|defeat|you lose|you lost|lost|draw|crash|failed|success|congrat|score|result|finished|beat|all matched|well done|perfect|new best)/i;
  var HEADSIG = /(title|headline|msg|message|banner|result|verdict|status)/;
  var WIN = /(you win|you won|win!|wins|victory|cleared|complete|solved|success|congrat|beat|matched|perfect|new best|record)/i;
  var LOSS = /(game over|time.?s up|defeat|you lose|you lost|lost|crash|failed|out of)/i;
  var BOX = /(overlay|modal|banner|result|over|end|dialog|screen|popup|panel|card|finish|win)/;
  function readResult() {
    var head = '', sub = '', root = null, headEl = null;
    var all = document.body.querySelectorAll('h1,h2,h3,h4,p,strong,div,span');
    for (var i = 0; i < all.length && !head; i++) {
      var el = all[i];
      if (ours(el) || el.children.length > 2) continue;
      if (!HEADSIG.test(sig(el))) continue;
      /* a banner that holds its own title: use the title inside it instead */
      var inner = false;
      for (var c = 0; c < el.children.length; c++) if (HEADSIG.test(sig(el.children[c]))) inner = true;
      if (inner) continue;
      var t = txt(el);
      if (t.length < 3 || t.length > 70 || !OUTCOME.test(t) || !shown(el)) continue;
      head = t; headEl = el; root = el.parentElement;
    }
    if (root) {
      var kids = root.querySelectorAll('p,span,div');
      for (var j = 0; j < kids.length && !sub; j++) {
        var k = kids[j];
        if (ours(k) || k.children.length > 2 || !/(sub|text|summary|note|desc|detail)/.test(sig(k))) continue;
        var tt = txt(k);
        if (tt && tt !== head && tt.length >= 5 && tt.length <= 160 && shown(k)) sub = tt;
      }
    }
    /* the result screen the button goes into: the nearest overlay / banner / result box around the headline */
    var host = null;
    for (var n = headEl, d = 0; n && n !== document.body && d < 4; n = n.parentElement, d++) {
      if (d > 0 && BOX.test(sig(n)) && n.tagName !== 'BUTTON') { host = n; break; }
    }
    return { head: head, sub: sub, host: host };
  }
  var STATRE = /(score|moves|time|wpm|best|level|streak|accuracy|combo|coins|distance|height|points|stars|lives|wins|attempt|guess)/;
  function readStats() {
    var out = [], seen = {};
    var all = document.body.querySelectorAll('span,strong,b,div,p,output');
    for (var i = 0; i < all.length && out.length < 4; i++) {
      var el = all[i];
      if (ours(el) || el.children.length > 1) continue;
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

  /* ---- show the button when a result is on screen ---- */
  var lastHost = null, timer = 0;
  function sync() {
    timer = 0;
    var r = readResult();
    if (r.head && r.host) {
      if (inl.parentElement !== r.host) r.host.appendChild(inl);
      if (inl.hidden) inl.hidden = false;
      if (!pill.hidden) pill.hidden = true;
    } else {
      if (!inl.hidden) inl.hidden = true;
      if (pill.hidden) pill.hidden = false;
      pill.classList.toggle('wdps-hot', !!r.head);
    }
    if (lastHost && !r.head && !box.hidden) box.hidden = true;
    lastHost = r.head ? (r.host || document.body) : null;
  }
  function later() { if (!timer) timer = setTimeout(sync, 200); }
  try {
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) {
        var t = list[i].target;
        if (t.nodeType !== 1) t = t.parentElement;
        if (t && !ours(t)) { later(); return; }
      }
    }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
  } catch (e) {}
  setInterval(later, 1500);
  later();

  /* ---- the card (1080 x 1080, drawn in memory, light like Pocket Artillery's) ---- */
  var outline = 0;
  function put(g, t, x, y) { if (outline) { g.lineJoin = 'round'; g.lineWidth = outline; g.strokeStyle = 'rgba(8,12,28,.85)'; g.strokeText(t, x, y); } g.fillText(t, x, y); }
  function wrap(g, text, x, y, maxW, lh, maxLines) {
    var words = text.split(' '), line = '', n = 0;
    for (var i = 0; i < words.length; i++) {
      var tst = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(tst).width > maxW && line) {
        put(g, line, x, y); y += lh; n++; line = words[i];
        if (n >= maxLines - 1) { line = words.slice(i).join(' '); break; }
      } else line = tst;
    }
    if (line) {
      while (line.length > 3 && g.measureText(line).width > maxW) line = line.slice(0, -2);
      put(g, line, x, y); y += lh;
    }
    return y;
  }
  /* Biggest-screenshot card: the game frame fills the whole image, the text sits on top of it as an overlay. */
  function bgOf(el) {
    for (var n = el; n; n = n.parentElement) {
      var c = getComputedStyle(n).backgroundColor;
      if (c && c !== 'transparent' && c.slice(-4) !== ', 0)') return c;
    }
    return '#0f172a';
  }
  function drawBig(info, cv) {
    var W = 1080, r = cv.width / cv.height, H = Math.max(810, Math.min(1350, Math.round(W / r)));
    var c = document.createElement('canvas'); c.width = W; c.height = H;
    var g = c.getContext('2d');
    g.fillStyle = bgOf(cv.parentElement || cv); g.fillRect(0, 0, W, H);
    var w = W, h = w / r;
    if (h > H) { h = H; w = h * r; }
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    try { g.drawImage(cv, (W - w) / 2, (H - h) / 2, w, h); } catch (e) { return null; }
    /* dark fades under the text so it stays readable on any game colours */
    var g1 = g.createLinearGradient(0, 0, 0, H * 0.55); g1.addColorStop(0, 'rgba(8,12,28,.74)'); g1.addColorStop(1, 'rgba(8,12,28,0)');
    g.fillStyle = g1; g.fillRect(0, 0, W, H * 0.55);
    var g2 = g.createLinearGradient(0, H - 200, 0, H); g2.addColorStop(0, 'rgba(8,12,28,0)'); g2.addColorStop(1, 'rgba(8,12,28,.85)');
    g.fillStyle = g2; g.fillRect(0, H - 200, W, 200);
    var head = info.head || 'Can you beat me?';
    var kind = /draw|tie/i.test(head) ? 'draw' : LOSS.test(head) && !WIN.test(head) ? 'loss' : 'win';
    g.textAlign = 'center';
    var y = 36;
    g.fillStyle = 'rgba(255,255,255,.93)'; g.font = '800 34px system-ui, sans-serif'; outline = 7;
    y = wrap(g, TITLE.toUpperCase(), W / 2, y + 34, 1000, 42, 1);
    g.fillStyle = kind === 'draw' ? '#e2e8f0' : kind === 'loss' ? '#9db8ff' : '#ffc233';
    var big = head.length > 22 ? 84 : 112; g.font = '900 ' + big + 'px system-ui, sans-serif'; outline = 16;
    y = wrap(g, head, W / 2, y + big * 0.85, 1000, big * 1.05, 2);
    if (info.sub) { g.fillStyle = '#fff'; g.font = '700 40px system-ui, sans-serif'; outline = 9; y = wrap(g, info.sub, W / 2, y + 6, 980, 50, 2); }
    outline = 0;
    if (info.stats.length) {
      g.font = '800 38px system-ui, sans-serif';
      var gap = 16, pad = 26, ws = [], tot = -gap;
      for (var i = 0; i < info.stats.length; i++) { ws.push(g.measureText(info.stats[i]).width + pad * 2); tot += ws[i] + gap; }
      var sc = tot > 960 ? 960 / tot : 1, px = (W - tot * sc) / 2, py = y + 14;
      for (var k = 0; k < info.stats.length; k++) {
        var w0 = ws[k] * sc;
        g.fillStyle = 'rgba(8,12,28,.72)'; g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 3;
        g.beginPath();
        if (g.roundRect) g.roundRect(px, py, w0, 68, 34); else g.rect(px, py, w0, 68);
        g.fill(); g.stroke();
        g.fillStyle = '#fff'; g.font = '800 ' + Math.round(38 * sc) + 'px system-ui, sans-serif';
        g.fillText(info.stats[k], px + w0 / 2, py + 47);
        px += w0 + gap * sc;
      }
    }
    outline = 8;
    g.fillStyle = '#fff'; g.font = '900 52px system-ui, sans-serif'; put(g, 'Can you beat it?', W / 2, H - 84);
    g.fillStyle = 'rgba(255,255,255,.92)'; g.font = '700 34px system-ui, sans-serif'; outline = 6; put(g, 'Play free at webdevpuneet.com', W / 2, H - 34);
    outline = 0;
    return c;
  }
  function finish(c, cb) {
    var dataUrl = '';
    try { dataUrl = c.toDataURL('image/png'); } catch (e) {}
    try { c.toBlob(function (b) { cb(b, dataUrl); }, 'image/png'); } catch (e) { cb(null, dataUrl); }
  }
  function makeCard(info, cb) {
    var cv0 = bestCanvas();
    if (cv0) { var bc = drawBig(info, cv0); if (bc) { finish(bc, cb); return; } }
    var S = 1080, c = document.createElement('canvas');
    c.width = S; c.height = S;
    var g = c.getContext('2d');
    var gr = g.createLinearGradient(0, 0, 0, S);
    gr.addColorStop(0, '#eaf4ff'); gr.addColorStop(1, '#fff3ef');
    g.fillStyle = gr; g.fillRect(0, 0, S, S);
    var cv = bestCanvas();
    var head = info.head || 'Can you beat me?';
    var kind = /draw|tie/i.test(head) ? 'draw' : LOSS.test(head) && !WIN.test(head) ? 'loss' : 'win';
    g.textAlign = 'center';
    g.fillStyle = '#1e293b'; g.font = '800 60px system-ui, sans-serif';
    var y = wrap(g, TITLE, S / 2, cv ? 120 : 200, 980, 68, 1);
    g.fillStyle = kind === 'draw' ? '#475569' : kind === 'loss' ? '#3b63e0' : '#e8553a';
    g.font = '800 ' + (head.length > 22 ? 76 : 100) + 'px system-ui, sans-serif';
    y = wrap(g, head, S / 2, y + (head.length > 22 ? 70 : 90), 980, head.length > 22 ? 84 : 108, 2);
    if (info.sub) { g.fillStyle = '#475569'; g.font = '700 38px system-ui, sans-serif'; y = wrap(g, info.sub, S / 2, y + 4, 940, 48, 2); }
    if (info.stats.length) {
      g.font = '800 36px system-ui, sans-serif';
      var gap = 18, pad = 26, ws = [], tot = -gap;
      for (var i = 0; i < info.stats.length; i++) { ws.push(g.measureText(info.stats[i]).width + pad * 2); tot += ws[i] + gap; }
      var sc = tot > 1000 ? 1000 / tot : 1, px = (S - tot * sc) / 2, py = y + 14;
      for (var k = 0; k < info.stats.length; k++) {
        var w0 = ws[k] * sc;
        g.fillStyle = '#ffffff'; g.strokeStyle = '#d5e2ee'; g.lineWidth = 3;
        g.beginPath();
        if (g.roundRect) g.roundRect(px, py, w0, 64, 32); else g.rect(px, py, w0, 64);
        g.fill(); g.stroke();
        g.fillStyle = '#1e293b'; g.font = '800 ' + Math.round(36 * sc) + 'px system-ui, sans-serif';
        g.fillText(info.stats[k], px + w0 / 2, py + 44);
        px += w0 + gap * sc;
      }
      y = py + 64 + 10;
    }
    if (cv) {
      try {
        var maxW = 960, maxH = Math.max(180, 930 - y - 30), r = cv.width / cv.height;
        var w = maxW, h = w / r;
        if (h > maxH) { h = maxH; w = h * r; }
        var x = (S - w) / 2, yy = y + 20 + Math.max(0, (maxH - h) / 2);
        g.save(); g.shadowColor = 'rgba(60,100,140,0.3)'; g.shadowBlur = 30; g.shadowOffsetY = 10;
        g.fillStyle = '#fff'; g.fillRect(x - 8, yy - 8, w + 16, h + 16); g.restore();
        g.drawImage(cv, x, yy, w, h);
      } catch (e) {}
    }
    g.fillStyle = '#1e293b'; g.font = '800 46px system-ui, sans-serif';
    g.fillText('Can you beat it?', S / 2, 1000);
    g.fillStyle = '#64748b'; g.font = '700 34px system-ui, sans-serif';
    g.fillText('Play free at webdevpuneet.com', S / 2, 1050);
    var dataUrl = '';
    try { dataUrl = c.toDataURL('image/png'); } catch (e) {}
    try { c.toBlob(function (b) { cb(b, dataUrl); }, 'image/png'); } catch (e) { cb(null, dataUrl); }
  }

  function shareText(info) {
    var bits = [];
    if (info.head) bits.push(info.head);
    if (info.stats.length) bits.push(info.stats.join(', '));
    return TITLE + ': ' + (bits.length ? bits.join(' - ') + '. ' : '') + 'Can you beat it? ' + URL;
  }
  function msg(t) { q('msg').textContent = t; }
  function openFallback() {
    var t = encodeURIComponent(shareText(lastInfo));
    q('wa').href = 'https://wa.me/?text=' + t;
    q('x').href = 'https://twitter.com/intent/tweet?text=' + t;
    q('fb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(URL) + '&quote=' + t;
    box.hidden = false;
  }
  function nativeShare() {
    /* a user cancel does nothing; anything else (blocked in an iframe, no permission) shows Copy / Download / links */
    try {
      navigator.share({ files: [file], title: TITLE, text: shareText(lastInfo) }).catch(function (e) { if (!e || e.name !== 'AbortError') openFallback(); });
    } catch (e) { openFallback(); }
  }
  function onShare() {
    var info = readResult(); info.stats = readStats();
    lastInfo = info;
    msg('Share your result:');
    makeCard(info, function (b, dataUrl) {
      blob = b; file = null;
      if (b) { try { file = new File([b], 'result.png', { type: 'image/png' }); } catch (e) {} }
      if (dataUrl) q('dl').href = dataUrl;
      q('dl').hidden = !dataUrl;
      var canNative = !!(file && navigator.share && navigator.canShare && navigator.canShare({ files: [file] }));
      var touch = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      q('more').hidden = !canNative;
      if (canNative && touch) nativeShare();
      else openFallback();
    });
  }
  /* Games often have document/window level touch and pointer handlers (some call preventDefault, which cancels the tap's
     click on phones, others restart the game on touchstart). So: keep every pointer event on our controls away from the
     game, and fire on touchend as well as click (guarded so one tap shares once). */
  var busy = 0;
  function trigger() { if (busy) return; busy = 1; setTimeout(function () { busy = 0; }, 700); onShare(); }
  function guard(el, act) {
    var evs = ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'click'];
    for (var i = 0; i < evs.length; i++) el.addEventListener(evs[i], function (e) { e.stopPropagation(); });
    if (act) {
      el.addEventListener('touchend', function (e) { if (e.cancelable) e.preventDefault(); act(); });
      el.addEventListener('click', function () { act(); });
    }
  }
  guard(pill, trigger);
  guard(inl, trigger);
  guard(box);
  q('more').addEventListener('click', function () { if (file) nativeShare(); });
  q('close').addEventListener('click', function () { box.hidden = true; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) box.hidden = true; });
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
