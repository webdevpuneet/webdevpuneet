const codeOutputQuizGame = {
  id: 'code-output-quiz-game',
  title: 'Predict the Output Quiz Game',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="demo-wrap">
  <div class="cq-game">
    <div class="cq-head">
      <div class="cq-meta"><span class="cq-label">Question</span><span class="cq-value" id="cqNum">1 / 8</span></div>
      <div class="cq-meta cq-right"><span class="cq-label">Score</span><span class="cq-value" id="cqScore">0</span></div>
    </div>

    <div class="cq-timer"><div class="cq-timer-fill" id="cqTimerFill"></div></div>

    <p class="cq-prompt">What does this log?</p>
    <pre class="cq-code" id="cqCode"></pre>

    <div class="cq-options" id="cqOptions"></div>

    <div class="cq-explain" id="cqExplain" hidden>
      <span class="cq-explain-title" id="cqVerdict">Correct</span>
      <p class="cq-explain-text" id="cqExplainText"></p>
      <button class="cq-next" id="cqNext">Next question</button>
    </div>

    <div class="cq-final" id="cqFinal" hidden>
      <p class="cq-final-score" id="cqFinalScore">6 / 8</p>
      <button class="cq-next" id="cqRestart">Play again</button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #18181b; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 28px 16px; }

.cq-game {
  width: 100%; max-width: 440px; padding: 20px;
  background: #27272a; border: 1px solid #3f3f46; border-radius: 16px;
  display: flex; flex-direction: column; gap: 13px;
  box-shadow: 0 18px 40px rgba(0,0,0,0.4);
}

.cq-head { display: flex; justify-content: space-between; }
.cq-meta { display: flex; flex-direction: column; gap: 2px; }
.cq-right { align-items: flex-end; }
.cq-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #a1a1aa; }
.cq-value { font-size: 16px; font-weight: 800; color: #fafafa; }

.cq-timer { height: 4px; border-radius: 999px; background: #3f3f46; overflow: hidden; }
.cq-timer-fill { height: 100%; width: 100%; background: #facc15; transition: width 0.25s linear; }
.cq-timer-fill.low { background: #f87171; }

.cq-prompt { font-size: 12px; font-weight: 700; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.06em; }

.cq-code {
  background: #18181b; border: 1px solid #3f3f46; border-radius: 10px; padding: 13px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; line-height: 1.65;
  color: #e4e4e7; white-space: pre; overflow-x: auto;
}

.cq-options { display: flex; flex-direction: column; gap: 7px; }
.cq-opt {
  text-align: left; padding: 11px 13px; border-radius: 10px; cursor: pointer;
  background: #18181b; border: 1.5px solid #3f3f46; color: #e4e4e7;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px;
  transition: all 0.14s;
}
.cq-opt:hover:not(:disabled) { border-color: #facc15; }
.cq-opt:disabled { cursor: default; }
.cq-opt.right { border-color: #4ade80; background: rgba(74,222,128,0.12); color: #bbf7d0; }
.cq-opt.wrong { border-color: #f87171; background: rgba(248,113,113,0.12); color: #fecaca; }

.cq-explain, .cq-final {
  display: flex; flex-direction: column; gap: 8px; padding: 13px;
  border-radius: 10px; background: #18181b; border: 1px solid #3f3f46;
}
.cq-explain-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #4ade80; }
.cq-explain-title.bad { color: #f87171; }
.cq-explain-text { font-size: 13px; line-height: 1.6; color: #d4d4d8; }
.cq-final { align-items: center; }
.cq-final-score { font-size: 26px; font-weight: 900; color: #facc15; }

.cq-next {
  align-self: flex-start; padding: 9px 15px; border: none; border-radius: 8px;
  background: #facc15; color: #422006; font-size: 13px; font-weight: 800;
  font-family: inherit; cursor: pointer;
}
.cq-next:hover { background: #eab308; }
.cq-final .cq-next { align-self: center; }`,

  js: `var TIME_PER_QUESTION = 15;

var QUESTIONS = [
  {
    code: "console.log(typeof null);",
    options: ["'null'", "'object'", "'undefined'", "TypeError"],
    answer: 1,
    explain: "typeof null returns 'object' — a bug from the first JavaScript implementation, where values were tagged by their low bits and the null pointer shared the object tag. It was never fixed because too much code depends on it.",
  },
  {
    code: "console.log([1, 2, 10].sort());",
    options: ["[1, 2, 10]", "[1, 10, 2]", "[10, 2, 1]", "[2, 1, 10]"],
    answer: 1,
    explain: "Array.prototype.sort() with no comparator converts every element to a string and sorts lexicographically, so '10' sorts before '2'. Pass a comparator — sort((a, b) => a - b) — whenever you sort numbers.",
  },
  {
    code: "console.log(0.1 + 0.2 === 0.3);",
    options: ["true", "false", "NaN", "TypeError"],
    answer: 1,
    explain: "Numbers are IEEE-754 doubles, and 0.1 and 0.2 have no exact binary representation. Their sum is 0.30000000000000004, so the strict comparison is false. Compare floats with a small epsilon instead.",
  },
  {
    code: "for (var i = 0; i < 3; i++) {\\n  setTimeout(() => console.log(i), 0);\\n}",
    options: ["0 1 2", "3 3 3", "0 0 0", "1 2 3"],
    answer: 1,
    explain: "var is function-scoped, so all three callbacks close over the SAME i. The loop finishes before any timeout fires, by which point i is 3. Switching var to let creates a fresh binding per iteration and logs 0 1 2.",
  },
  {
    code: "console.log('5' - 3, '5' + 3);",
    options: ["2 8", "2 '53'", "'53' 2", "NaN '53'"],
    answer: 1,
    explain: "The - operator has no string meaning, so '5' is coerced to a number giving 2. The + operator is overloaded: with a string on either side it concatenates, giving the string '53'.",
  },
  {
    code: "console.log(1);\\nsetTimeout(() => console.log(2), 0);\\nPromise.resolve().then(() => console.log(3));\\nconsole.log(4);",
    options: ["1 2 3 4", "1 4 3 2", "1 4 2 3", "1 3 4 2"],
    answer: 1,
    explain: "Synchronous code runs first (1, 4). Then the microtask queue drains before the next macrotask, so the promise callback (3) runs before the setTimeout callback (2) even with a 0ms delay.",
  },
  {
    code: "const a = { x: 1 };\\nconst b = a;\\nb.x = 2;\\nconsole.log(a.x);",
    options: ["1", "2", "undefined", "TypeError"],
    answer: 1,
    explain: "const prevents reassigning the binding, not mutating the object it points to. a and b reference the same object, so writing through b is visible through a. Use structuredClone or a spread to copy.",
  },
  {
    code: "console.log([] + {});\\nconsole.log(typeof ([] + {}));",
    options: ["'{}' 'object'", "'[object Object]' 'string'", "'' 'string'", "NaN 'number'"],
    answer: 1,
    explain: "The + operator converts both operands to primitives: [] becomes the empty string and {} becomes '[object Object]'. Concatenating them yields '[object Object]', which is a string.",
  },
];

var order = [];
var pos = 0;
var score = 0;
var timeLeft = TIME_PER_QUESTION;
var tick = null;
var answered = false;

var codeEl = document.getElementById('cqCode');
var optionsEl = document.getElementById('cqOptions');
var explainEl = document.getElementById('cqExplain');
var explainText = document.getElementById('cqExplainText');
var verdictEl = document.getElementById('cqVerdict');
var finalEl = document.getElementById('cqFinal');
var timerFill = document.getElementById('cqTimerFill');
var numEl = document.getElementById('cqNum');
var scoreEl = document.getElementById('cqScore');

function shuffled(n) {
  var arr = Array.from({ length: n }, function (_, i) { return i; });
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

function question() { return QUESTIONS[order[pos]]; }

function startTimer() {
  clearInterval(tick);
  timeLeft = TIME_PER_QUESTION;
  paintTimer();
  tick = setInterval(function () {
    timeLeft--;
    paintTimer();
    if (timeLeft <= 0) { clearInterval(tick); reveal(-1); }
  }, 1000);
}

function paintTimer() {
  var pct = Math.max(0, (timeLeft / TIME_PER_QUESTION) * 100);
  timerFill.style.width = pct + '%';
  timerFill.classList.toggle('low', timeLeft <= 5);
}

function renderQuestion() {
  var q = question();
  answered = false;
  explainEl.hidden = true;
  finalEl.hidden = true;
  numEl.textContent = (pos + 1) + ' / ' + QUESTIONS.length;
  scoreEl.textContent = score;
  codeEl.textContent = q.code;

  optionsEl.innerHTML = '';
  q.options.forEach(function (text, i) {
    var btn = document.createElement('button');
    btn.className = 'cq-opt';
    btn.textContent = text;
    btn.dataset.index = i;
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function reveal(chosen) {
  if (answered) return;
  answered = true;
  clearInterval(tick);

  var q = question();
  var buttons = optionsEl.children;
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
    if (i === q.answer) buttons[i].classList.add('right');
    if (i === chosen && chosen !== q.answer) buttons[i].classList.add('wrong');
  }

  var correct = chosen === q.answer;
  if (correct) { score++; scoreEl.textContent = score; }

  verdictEl.textContent = correct ? 'Correct' : (chosen === -1 ? 'Out of time' : 'Not quite');
  verdictEl.className = 'cq-explain-title' + (correct ? '' : ' bad');
  explainText.textContent = q.explain;
  explainEl.hidden = false;
}

function next() {
  if (pos === QUESTIONS.length - 1) {
    explainEl.hidden = true;
    optionsEl.innerHTML = '';
    document.getElementById('cqFinalScore').textContent = score + ' / ' + QUESTIONS.length;
    finalEl.hidden = false;
    return;
  }
  pos++;
  renderQuestion();
}

function restart() {
  order = shuffled(QUESTIONS.length);
  pos = 0;
  score = 0;
  renderQuestion();
}

optionsEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.cq-opt');
  if (btn && !btn.disabled) reveal(Number(btn.dataset.index));
});
document.getElementById('cqNext').addEventListener('click', next);
document.getElementById('cqRestart').addEventListener('click', restart);

restart();

/* wdp-share:start */
(function () {
  var TITLE = 'Predict the Output Quiz Game', URL = 'https://webdevpuneet.com/ui-snippets/code-output-quiz-game/';
  if (window.__wdpShare) return;
  window.__wdpShare = true;
  var blob = null, file = null, lastInfo = null;

  /* ---- UI ---- */
  var st = document.createElement('style');
  st.textContent =
    '.wdps-in{display:block;margin:12px auto 0;border:0;border-radius:12px;padding:11px 22px;font:800 15px/1 system-ui,sans-serif;background:#16a34a;color:#fff;cursor:pointer;box-shadow:0 3px 0 #11793a;pointer-events:auto;position:relative;z-index:5}' +
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
  function wrap(g, text, x, y, maxW, lh, maxLines) {
    var words = text.split(' '), line = '', n = 0;
    for (var i = 0; i < words.length; i++) {
      var tst = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(tst).width > maxW && line) {
        g.fillText(line, x, y); y += lh; n++; line = words[i];
        if (n >= maxLines - 1) { line = words.slice(i).join(' '); break; }
      } else line = tst;
    }
    if (line) {
      while (line.length > 3 && g.measureText(line).width > maxW) line = line.slice(0, -2);
      g.fillText(line, x, y); y += lh;
    }
    return y;
  }
  function makeCard(info, cb) {
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
  pill.addEventListener('click', onShare);
  inl.addEventListener('click', function (e) { e.stopPropagation(); onShare(); });
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
    title: 'Predict the Output Quiz Game — Free HTML CSS JS Snippet',
    description: 'A timed JavaScript output quiz with eight real language quirks, per-question countdown and an explanation after every answer. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Predict the Output Quiz Game — Timed Rounds, Shuffled Question Order & An Explanation After Every Answer',
      description: `"What does this log?" is the single most efficient format for teaching a language's sharp edges, because the learner commits to a prediction before seeing the truth — and a wrong prediction is what makes the explanation stick. This snippet is a complete, playable version of that format for JavaScript: eight questions covering the quirks that actually cost people debugging hours, a per-question countdown, immediate colour-coded reveal, and a written explanation of the mechanism behind every answer.

**The questions are real behaviour, not trivia**

Each entry covers something a working developer genuinely hits: \`typeof null\` returning \`'object'\`, \`[1, 2, 10].sort()\` producing \`[1, 10, 2]\` because the default comparator stringifies, \`0.1 + 0.2 === 0.3\` being false under IEEE-754, \`var\` in a loop with \`setTimeout\` logging \`3 3 3\` because all callbacks share one binding, \`'5' - 3\` and \`'5' + 3\` diverging because \`+\` is overloaded, microtasks draining before macrotasks so a resolved promise beats \`setTimeout(fn, 0)\`, \`const\` preventing reassignment but not mutation, and \`[] + {}\` coercing to \`'[object Object]'\`. Every \`explain\` string names the underlying rule and, where useful, the fix — pass a comparator, use \`let\`, compare floats with an epsilon.

**Shuffled order with a stable answer index**

\`restart()\` builds a shuffled array of question indices with a Fisher-Yates pass and walks that array rather than the questions themselves, so replaying the quiz presents a different sequence without ever mutating \`QUESTIONS\`. The answer for each question is stored as an index into its own \`options\` array, which keeps the data compact and makes the reveal logic trivial: mark the button at \`q.answer\` correct, and mark the chosen button wrong when it differs.

**A countdown that ends the question rather than the game**

Each question runs a one-second \`setInterval\` driving a width-animated bar that turns red in its last five seconds. Running out of time calls the same \`reveal()\` function the click handler uses, passing \`-1\` as the choice — so a timeout is treated as an answered question with no selection: the correct option still highlights, the explanation still appears, and the player still learns the answer. Reusing one reveal path for both routes is what keeps the timeout case from becoming a second, subtly different code path.

**Guarding against double scoring**

\`reveal()\` returns immediately if \`answered\` is already true, and every option button is disabled the moment an answer lands. That double guard matters because the timer and a click can otherwise race: a click landing in the same tick as the countdown reaching zero would otherwise run the scoring branch twice. The interval is cleared inside \`reveal()\` rather than at the next render, so no stray tick can fire while the explanation is on screen.

**Reveal, explanation, and final score as three states**

The card shows one of three states at a time — the live question, the explanation panel with the verdict heading and the "Next question" button, or the final score panel — toggled with the \`hidden\` attribute rather than by swapping innerHTML. The verdict itself distinguishes three outcomes: correct, wrong, and out of time, so the feedback text always matches how the question actually ended.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the code block', text: 'Each question shows a short, self-contained snippet of real JavaScript in a monospaced panel — the kind of code that appears in a bug report rather than a textbook exercise.' },
        { title: 'Answer before the bar runs out', text: 'A fifteen-second countdown drains a bar across the top, turning red for the final five seconds. Running out of time reveals the answer and its explanation rather than skipping past it, so a timeout still teaches you something.' },
        { title: 'Pick one of the four options', text: 'Clicking an option immediately locks the question: the correct answer turns green, and a wrong pick turns red alongside it so you can see both what you chose and what was right.' },
        { title: 'Read the explanation', text: 'Every question carries a written explanation naming the actual rule — the microtask queue draining before macrotasks, the default sort comparator stringifying elements, IEEE-754 rounding — plus the practical fix where one exists.' },
        { title: 'Work through all eight questions', text: 'The score counter updates as you go and a final panel shows your total out of eight when the last question is answered.' },
        { title: 'Play again for a different order', text: 'Play again reshuffles the question order with a Fisher-Yates pass over an index array, so a replay is not the same sequence — and the QUESTIONS array itself is never mutated.' },
      ],
    },
    features: [
      'Eight questions covering genuine JavaScript behaviour: typeof null, default sort, float equality, var closures, + overloading, microtask ordering, const mutation, and object coercion',
      'A written explanation for every question naming the underlying rule and the practical fix',
      'Fifteen-second per-question countdown with a width-animated bar that turns red in the last five seconds',
      'Timeouts routed through the same reveal() function as clicks, so an unanswered question still shows the answer and explanation',
      'Double guard against race conditions between a click and the countdown reaching zero',
      'Shuffled question order via Fisher-Yates over an index array, leaving the source data unmutated',
      'Three-state card (question, explanation, final score) toggled with the hidden attribute rather than innerHTML swaps',
      'Distinct verdict wording for correct, incorrect, and out-of-time outcomes',
    ],
    useCases: [
      { icon: 'LEARN', title: 'JavaScript teaching, onboarding, or interview preparation', desc: 'Predict-the-output is the fastest known format for surfacing misconceptions, because the learner commits before seeing the answer. Pair it with an [event loop visualizer](/ui-snippets/event-loop-visualizer/) so the microtask-ordering question can be followed up with a visual model of why.' },
      { icon: 'CODE', title: 'Documentation sidebars for language or API gotchas', desc: 'Any library with surprising behaviour — timezone handling, floating-point money, async ordering — can embed a two-question version of this next to the relevant docs section, turning a warning callout most readers skim into something they engage with.' },
      { icon: 'APP', title: 'Developer marketing, conference booths, and careers pages', desc: 'A quiz that takes two minutes and teaches something real is far better received by a technical audience than a generic lead form, and works well alongside other learn-by-playing snippets like the [Regex Match Game](/ui-snippets/regex-match-game/).' },
      { icon: 'FLOW', title: 'Reusable timed-quiz engine for any subject', desc: 'Nothing in the mechanics is JavaScript-specific — swap the QUESTIONS array and the same countdown, reveal, explanation and scoring flow drives a quiz on CSS, SQL, accessibility rules, or internal product knowledge.' },
      { icon: 'DESIGN', title: 'Reference for safe timer-and-click race handling', desc: 'The answered flag plus disabling every option is a compact demonstration of guarding a scoring path that two independent event sources can trigger — the same defence any timed form, auction bid, or countdown checkout needs.' },
      { icon: 'FORM', title: 'Training and compliance modules with explanations', desc: 'Because a wrong answer produces an explanation rather than just a red mark, the pattern suits internal training where understanding matters more than the score — security awareness, code review standards, or style-guide quizzes.' },
      { icon: 'CODE', title: 'Related: Canvas Conway', desc: 'See the [Canvas Conway](/ui-snippets/canvas-game-of-life/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What happens if the timer runs out before I answer?', a: 'The countdown calls the same reveal() function a click does, passing -1 as the chosen index. The question is marked as answered, the correct option highlights, and the explanation appears — you simply score nothing for it. Reusing one reveal path means the timeout case cannot drift into behaving differently from a normal answer.' },
      { q: 'Can a fast click and the timer both score the same question?', a: 'No. reveal() returns immediately if the answered flag is already set, and all option buttons are disabled the moment an answer lands. The interval is also cleared inside reveal() rather than at the next render, so no stray tick can fire while the explanation panel is showing.' },
      { q: 'How do I add my own questions?', a: 'Push an object onto QUESTIONS with four keys: code (the snippet string, with \\n for line breaks), options (an array of answer strings), answer (the index of the correct option within that array), and explain (a sentence or two naming the rule and, where useful, the fix). The question count in the header derives from the array length automatically.' },
      { q: 'Does the quiz actually execute the code shown?', a: 'No — the snippets are rendered as text into a pre element with textContent, never evaluated. That is deliberate: eval or new Function on quiz content would be both unnecessary and a poor pattern to demonstrate, and the answers are authored rather than computed so the explanations can describe the mechanism rather than just the result.' },
      { q: 'Can I use this quiz in React, Vue, or Angular?', a: 'Yes. Keep QUESTIONS in a module, hold the shuffled order, position, score and answered flag in component state, and render options from data rather than mutating classes. Run the countdown in useEffect / onMounted / ngOnInit keyed on the current question and return a clearInterval cleanup so a question change or unmount cannot leave a timer running — that cleanup is the one thing a naive port usually misses.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add a "run it" button that executes each question's code in a sandboxed iframe with a captured console, so players can verify the stated answer themselves rather than taking the explanation on trust — a genuinely instructive extension that also raises real questions about safely executing untrusted code. Other good directions: add difficulty tiers with a scoring multiplier, add a streak bonus that shortens the timer as the player gets hotter, persist a high score and per-question accuracy to localStorage so weak topics can be replayed, or swap the question set for a CSS or TypeScript edition using the same engine.`,
      prompt: `Build a timed "predict the output" JavaScript quiz game in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- A QUESTIONS array where each entry has a code string, an options array, the index of the correct option, and an explanation string that names the underlying language rule and the practical fix.
- Use real JavaScript behaviour that developers actually hit — typeof null, the default sort comparator stringifying elements, 0.1 + 0.2 !== 0.3, var closures in a setTimeout loop, + being overloaded for strings, microtasks draining before macrotasks, const preventing reassignment but not mutation, and [] + {} coercion.
- Render the code as text into a pre element with textContent — never evaluate it.
- A per-question countdown driving a width-animated bar that changes colour in its final seconds. When time runs out, call the SAME reveal function a click calls (passing -1 as the choice) so an unanswered question still highlights the correct option and shows its explanation.
- Guard against a click and the countdown both scoring the same question: an answered flag checked at the top of reveal, disabling every option button on reveal, and clearing the interval inside reveal.
- On reveal, mark the correct option green and a wrong choice red simultaneously, and show a verdict that distinguishes correct, incorrect, and out-of-time.
- Shuffle the question order on each play with a Fisher-Yates pass over an array of indices rather than mutating the source array, and show a final score panel with a play-again action after the last question.`,
    },
  },
};

export default codeOutputQuizGame;
