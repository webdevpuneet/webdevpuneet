const rockPaperScissorsGame = {
  id: 'rock-paper-scissors-game',
  title: 'Rock Paper Scissors vs Computer',
  lastmod: '2026-11-14',
  category: 'games',
  html: `<div class="rps-app">
  <div class="rps-header">
    <h2>Rock Paper Scissors</h2>
    <div class="score-board">
      <div class="score-item"><span class="score-label">Wins</span><span class="score-val" id="score-win">0</span></div>
      <div class="score-item"><span class="score-label">Losses</span><span class="score-val" id="score-lose">0</span></div>
      <div class="score-item"><span class="score-label">Ties</span><span class="score-val" id="score-tie">0</span></div>
    </div>
  </div>

  <div class="arena">
    <div class="side">
      <span class="side-label">You</span>
      <div class="icon-circle" id="player-icon">❔</div>
    </div>
    <div class="vs">VS</div>
    <div class="side">
      <span class="side-label">Computer</span>
      <div class="icon-circle" id="computer-icon">❔</div>
    </div>
  </div>

  <p class="result-msg" id="result-msg">Choose rock, paper, or scissors to play</p>

  <div class="choices">
    <button class="choice-btn" data-choice="rock" aria-label="Rock">
      <span class="choice-icon">🪨</span><span class="choice-name">Rock</span>
    </button>
    <button class="choice-btn" data-choice="paper" aria-label="Paper">
      <span class="choice-icon">📄</span><span class="choice-name">Paper</span>
    </button>
    <button class="choice-btn" data-choice="scissors" aria-label="Scissors">
      <span class="choice-icon">✂️</span><span class="choice-name">Scissors</span>
    </button>
  </div>

  <button class="reset-score-btn" id="reset-score-btn">Reset score</button>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.rps-app { max-width: 480px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 18px; }

.rps-header { width: 100%; text-align: center; }
.rps-header h2 { font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 12px; }

.score-board { display: flex; justify-content: center; gap: 10px; }
.score-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 8px 16px; min-width: 70px; text-align: center; }
.score-label { display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; margin-bottom: 2px; }
.score-val { display: block; font-size: 18px; font-weight: 800; color: #1e293b; }
#score-win { color: #16a34a; }
#score-lose { color: #dc2626; }
#score-tie { color: #6366f1; }

.arena { display: flex; align-items: center; justify-content: center; gap: 24px; width: 100%; }
.side { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.side-label { font-size: 12px; font-weight: 600; color: #64748b; }
.icon-circle {
  width: 92px; height: 92px; border-radius: 50%;
  background: #fff; border: 2px solid #e2e8f0;
  display: flex; align-items: center; justify-content: center;
  font-size: 42px;
  box-shadow: 0 4px 14px rgba(30,41,59,0.08);
  transition: border-color 0.2s, transform 0.1s;
}
.icon-circle.shaking { animation: shakeIcon 0.14s ease-in-out infinite; }
@keyframes shakeIcon {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(-8deg) scale(1.06); }
}
.icon-circle.win { border-color: #16a34a; box-shadow: 0 0 0 4px rgba(22,163,74,0.15); }
.icon-circle.lose { border-color: #dc2626; box-shadow: 0 0 0 4px rgba(220,38,38,0.12); }
.icon-circle.tie { border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99,102,241,0.15); }

.vs { font-size: 13px; font-weight: 800; color: #cbd5e1; }

.result-msg { font-size: 14px; font-weight: 600; color: #475569; text-align: center; min-height: 20px; }
.result-msg.win { color: #16a34a; }
.result-msg.lose { color: #dc2626; }
.result-msg.tie { color: #6366f1; }

.choices { display: flex; gap: 12px; }
.choice-btn {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px;
  padding: 14px 18px; cursor: pointer;
  font-family: inherit; transition: border-color 0.15s, transform 0.1s, background 0.15s;
}
.choice-btn:hover:not(:disabled) { border-color: #6366f1; transform: translateY(-2px); }
.choice-btn:active:not(:disabled) { transform: translateY(0); }
.choice-btn:disabled { opacity: 0.5; cursor: default; }
.choice-icon { font-size: 30px; }
.choice-name { font-size: 12px; font-weight: 600; color: #475569; }

.reset-score-btn {
  background: transparent; border: none; color: #94a3b8;
  font-size: 12px; font-weight: 600; text-decoration: underline;
  cursor: pointer; font-family: inherit; padding: 4px;
}
.reset-score-btn:hover { color: #475569; }`,
  js: `const ICONS = { rock: '🪨', paper: '📄', scissors: '✂️' };
const CHOICES = ['rock', 'paper', 'scissors'];
const BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
const VERBS = { rock: 'crushes', paper: 'covers', scissors: 'cuts' };

let score = { win: 0, lose: 0, tie: 0 };
let playing = false;

const playerIcon = document.getElementById('player-icon');
const computerIcon = document.getElementById('computer-icon');
const resultMsg = document.getElementById('result-msg');
const choiceBtns = Array.from(document.querySelectorAll('.choice-btn'));

function setScore() {
  document.getElementById('score-win').textContent = score.win;
  document.getElementById('score-lose').textContent = score.lose;
  document.getElementById('score-tie').textContent = score.tie;
}

function setButtonsDisabled(disabled) {
  choiceBtns.forEach(b => (b.disabled = disabled));
}

function play(playerChoice) {
  if (playing) return;
  playing = true;
  setButtonsDisabled(true);

  playerIcon.classList.remove('win', 'lose', 'tie');
  computerIcon.classList.remove('win', 'lose', 'tie');
  resultMsg.className = 'result-msg';
  resultMsg.textContent = 'Rock... Paper... Scissors...';

  playerIcon.classList.add('shaking');
  computerIcon.classList.add('shaking');

  const shakeInterval = setInterval(() => {
    playerIcon.textContent = ICONS[CHOICES[Math.floor(Math.random() * 3)]];
    computerIcon.textContent = ICONS[CHOICES[Math.floor(Math.random() * 3)]];
  }, 90);

  setTimeout(() => {
    clearInterval(shakeInterval);
    playerIcon.classList.remove('shaking');
    computerIcon.classList.remove('shaking');

    const computerChoice = CHOICES[Math.floor(Math.random() * 3)];
    playerIcon.textContent = ICONS[playerChoice];
    computerIcon.textContent = ICONS[computerChoice];

    resolveRound(playerChoice, computerChoice);

    playing = false;
    setButtonsDisabled(false);
  }, 800);
}

function resolveRound(playerChoice, computerChoice) {
  let outcome;
  if (playerChoice === computerChoice) {
    outcome = 'tie';
  } else if (BEATS[playerChoice] === computerChoice) {
    outcome = 'win';
  } else {
    outcome = 'lose';
  }

  score[outcome]++;
  setScore();

  playerIcon.classList.add(outcome === 'win' ? 'win' : outcome === 'lose' ? 'lose' : 'tie');
  computerIcon.classList.add(outcome === 'win' ? 'lose' : outcome === 'lose' ? 'win' : 'tie');
  resultMsg.classList.add(outcome);

  if (outcome === 'tie') {
    resultMsg.textContent = \`Both chose \${playerChoice} — It's a tie!\`;
  } else {
    const winnerChoice = outcome === 'win' ? playerChoice : computerChoice;
    const loserChoice = outcome === 'win' ? computerChoice : playerChoice;
    const winnerLabel = capitalize(winnerChoice);
    const loserLabel = loserChoice;
    const verb = VERBS[winnerChoice];
    const who = outcome === 'win' ? 'You win!' : 'Computer wins!';
    resultMsg.textContent = \`\${winnerLabel} \${verb} \${loserLabel} — \${who}\`;
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function resetScore() {
  score = { win: 0, lose: 0, tie: 0 };
  setScore();
  resultMsg.className = 'result-msg';
  resultMsg.textContent = 'Choose rock, paper, or scissors to play';
  playerIcon.textContent = '❔';
  computerIcon.textContent = '❔';
  playerIcon.classList.remove('win', 'lose', 'tie');
  computerIcon.classList.remove('win', 'lose', 'tie');
}

choiceBtns.forEach(btn => {
  btn.addEventListener('click', () => play(btn.dataset.choice));
});
document.getElementById('reset-score-btn').addEventListener('click', resetScore);

/* wdp-share:start */
(function () {
  var TITLE = 'Rock Paper Scissors vs Computer', URL = 'https://webdevpuneet.com/ui-snippets/rock-paper-scissors-game/';
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
    title: 'Rock Paper Scissors vs Computer — Free JS Snippet',
    description: 'Play Rock Paper Scissors with a shaking countdown animation, real win rules, and a persistent score tally. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Rock Paper Scissors vs Computer — Countdown Animation, Rule Resolution & Live Score Tracking',
      description: `Rock Paper Scissors is one of the simplest possible games to reason about — three choices, a fixed set of rules, a random opponent — which makes it an excellent small project for practicing state management, timed animation sequencing, and readable game-logic code, all in vanilla JavaScript with no framework or library involved.

**The classic three-way rule and how it's encoded**

The entire ruleset boils down to a single lookup object: \`BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' }\`. Given the player's choice and the computer's random choice, the outcome check is just three cases — equal means a tie, \`BEATS[playerChoice] === computerChoice\` means the player wins, and anything else means the computer wins. This is the cleanest possible way to encode the rule "rock crushes scissors, scissors cuts paper, paper covers rock" without a sprawling if/else chain or a full 3x3 outcome matrix, and it scales naturally if you ever wanted to extend the game to Rock-Paper-Scissors-Lizard-Spock by simply adding more keys to the \`BEATS\` map.

**Building the "shoot" countdown animation**

The classic real-world game is played with a "rock, paper, scissors, shoot" rhythm where both players' hands pump before revealing a choice. This snippet recreates that beat entirely with \`setInterval\` and \`setTimeout\`: when a choice button is clicked, \`play()\` immediately locks input (\`setButtonsDisabled(true)\`) so no double-clicks can happen mid-round, adds a \`.shaking\` class that applies a fast \`@keyframes shakeIcon\` rotation-and-scale wobble to both icon circles, and starts a 90-millisecond interval that randomly swaps each icon's emoji between rock, paper, and scissors — visually simulating an undecided, rapidly cycling hand. After 800 milliseconds, a matching \`setTimeout\` clears the interval, removes the shaking animation, locks in the computer's actual randomly generated choice, and calls \`resolveRound()\` to compute and display the real result. The 800ms duration is deliberately short enough to feel snappy but long enough to register as a genuine "countdown" beat rather than an instant jump-cut to the answer.

**Displaying the correct rule explanation**

Rather than a generic "You win" or "You lose" message, \`resolveRound()\` builds a message that explains the actual rule that applied — for example "Paper covers Rock — You win!" or "Scissors cuts Paper — Computer wins!". This uses a small \`VERBS\` lookup (\`{ rock: 'crushes', paper: 'covers', scissors: 'cuts' }\`) keyed by whichever choice won the round, so the sentence is always grammatically and logically correct regardless of which of the six possible win/lose combinations occurred. This is a small but important detail: it turns the result screen into a tiny teaching moment about the rules rather than just a verdict, which matters most for players who are still new to the game.

**Score persistence and visual feedback**

A simple in-memory \`score = { win: 0, lose: 0, tie: 0 }\` object accumulates across rounds for as long as the page stays open, rendered into three colour-coded counters (green for wins, red for losses, indigo for ties). Each icon circle also receives a \`win\`/\`lose\`/\`tie\` class after every round that draws a coloured ring around it (green, red, or indigo respectively) — applied to the *opposite* class on the computer's icon from the player's, since a player win is a computer loss and vice versa — giving instant, unambiguous visual confirmation of the outcome beyond just reading the text message. A "Reset score" link-style button zeroes the tally and restores both icons to a neutral question-mark placeholder, ready for a fresh session.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Play a round',
          text: 'Click Rock, Paper, or Scissors. Both icon circles shake and rapidly cycle through random emoji for 800ms via the shakeInterval in play(), then settle on your actual choice and the computer\'s randomly generated one, followed immediately by the win/lose/tie result message and rule explanation.',
        },
        {
          title: 'Read the result and rule explanation',
          text: 'The result-msg element always names the specific rule that decided the round (e.g. "Rock crushes Scissors — You win!"), built from the VERBS lookup object matched to whichever choice won. The message and both icon circles are also colour-coded green for a win, red for a loss, and indigo for a tie.',
        },
        {
          title: 'Track your running score',
          text: 'The three score-item cards above the arena update immediately after every round by reading the score.win, score.lose, and score.tie counters, which persist in memory for the whole browser session until you explicitly reset them.',
        },
        {
          title: 'Reset the score',
          text: 'Click "Reset score" to zero out score.win, score.lose, and score.tie, clear the result message back to its default prompt, and restore both icon circles to the neutral ❔ placeholder — this does not reload the page or affect anything else.',
        },
        {
          title: 'Add a fourth or fifth choice',
          text: 'To build Rock-Paper-Scissors-Lizard-Spock, add lizard and spock keys to ICONS, CHOICES, and extend BEATS so each choice maps to the two choices it beats (this requires switching BEATS from a single value to an array, and updating the outcome check to array.includes(computerChoice)), then add two more .choice-btn buttons to the HTML.',
        },
        {
          title: 'Export and add to your project',
          text: 'Click HTML to download a standalone file, or JSX for a React component. In React, move score into useState, replace the direct classList calls with conditional className strings derived from an outcome state variable, and use setTimeout inside a useEffect (with cleanup via clearTimeout) to replicate the countdown sequencing safely across re-renders.',
        },
      ],
    },
    features: [
      'BEATS lookup object encodes the full rule set in three key-value pairs, no long if/else chain',
      'Shaking countdown: 90ms setInterval cycles random emoji on both icons for an 800ms "shoot" beat',
      'setButtonsDisabled() locks all three choice buttons during the countdown to prevent double-submits',
      'VERBS lookup builds a grammatically correct rule explanation for every one of the six win/lose outcomes',
      'Icon circles get win/lose/tie classes for coloured ring feedback, applied as inverse pairs between player and computer',
      'In-memory score object tallies wins, losses, and ties across the whole session with three live counters',
      'resolveRound() cleanly separates outcome computation from DOM/message rendering',
      'Reset score restores both icons and the message to their original neutral state without a page reload',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'A quick single-player mini-game for a waiting room or loading screen',
        desc: 'Drop this into an app\'s empty state, onboarding flow, or a support-ticket queue page as a light distraction while users wait. The self-contained score tally gives it enough replay value that people will play a few rounds rather than just staring at a spinner.',
      },
      {
        icon: 'LEARN',
        title: 'A teaching example for lookup-table game logic',
        desc: 'The BEATS object is a clean, small illustration of replacing branching conditional logic with a data structure — a pattern that scales far better than nested if/else once a game (or any rule-based system) grows past three options, and is worth studying before tackling more complex rule engines.',
      },
      {
        icon: 'FLOW',
        title: 'Demonstrating disable-during-animation input locking',
        desc: 'setButtonsDisabled(true) during the 800ms countdown is a reusable pattern for any interaction that plays a timed animation before revealing a result — preventing a user from firing a second action mid-sequence and corrupting the game state, directly transferable to quiz reveals, spinning wheels, or card-flip games.',
      },
      {
        icon: 'CODE',
        title: 'Boilerplate for expanding to Rock-Paper-Scissors-Lizard-Spock or team variants',
        desc: 'Because the choice set, icon set, and rule set are all defined as small standalone objects rather than hard-coded logic, this snippet is a fast starting point for building out extended variants or a "best of 5" match format with a running match-winner banner.',
      },
      {
        icon: 'DESIGN',
        title: 'A playful component for a games or entertainment landing page',
        desc: 'Swap the emoji icons for custom SVG rock/paper/scissors artwork and the #6366f1 accent for your brand colour to fit a kids\' games site, a party-game app landing page, or a fun 404 page alongside something like the [Number Guessing Game](/ui-snippets/number-guessing-game).',
      },
      { icon: 'CODE', title: 'Related: Tank Arena Game', desc: 'See the [Tank Arena Game](/ui-snippets/tank-arena-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How does the game decide a winner from just two values?',
        a: 'resolveRound() checks three cases in order: if playerChoice equals computerChoice it is a tie; if BEATS[playerChoice] equals computerChoice (meaning the player\'s pick beats the computer\'s pick according to the lookup table) the player wins; otherwise, since there are only three possible choices and the first two cases have been ruled out, the computer must win by elimination. This avoids needing a full nine-combination truth table.',
      },
      {
        q: 'Is the computer\'s choice truly random?',
        a: 'Yes — CHOICES[Math.floor(Math.random() * 3)] picks uniformly at random from rock, paper, and scissors with no memory of past rounds or bias toward countering the player\'s last move, so each round is statistically independent and fair, matching how the physical game is assumed to work.',
      },
      {
        q: 'Why do the buttons get disabled during the countdown animation?',
        a: 'Without setButtonsDisabled(true), a user could click a second choice while the 800ms shake countdown from their first click was still running, triggering an overlapping setInterval/setTimeout pair that would corrupt the icon display and potentially double-count the round in the score. Disabling input for the duration of the countdown, then re-enabling it once resolveRound() finishes, keeps exactly one round in flight at a time.',
      },
      {
        q: 'Does the score reset if I refresh the page?',
        a: 'Yes, by design — score is a plain in-memory JavaScript object with no localStorage or backend persistence, so it resets to zero on every full page reload just like restarting a casual game session. If you want the tally to survive refreshes, wrap setScore() to also write score to localStorage and read it back in on page load.',
      },
      {
        q: 'Can I make this a best-of-N match instead of an open-ended tally?',
        a: 'Yes — track a roundsPlayed counter alongside score, and after calling resolveRound() check if score.win or score.lose has reached a target like 3; if so, display a "Match won!" banner, disable the choice buttons until "Reset score" (or a new "New match" button) is pressed, and stop incrementing further rounds until reset.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how play() sequences the shaking countdown, the computer's choice reveal, and the score update using setInterval and setTimeout, and why setButtonsDisabled() is necessary to prevent a race condition between overlapping rounds. From there, ask the assistant to extend the game: add a "best of 5" match mode that locks the game once a player reaches 3 wins, expand the rule set to Rock-Paper-Scissors-Lizard-Spock with the BEATS lookup restructured to support two counters per choice, or add a simple "computer taunts" text that changes based on the current win streak. It's also a good candidate for asking about accessibility improvements, like announcing the round result to screen readers via an aria-live region.`,
      prompt: `Build a Rock Paper Scissors game against a computer opponent in plain HTML, CSS, and JavaScript — three choice buttons, a shaking countdown reveal, correct rule-based results, and a persistent score tally.

Requirements:
- Three large choice buttons (rock, paper, scissors) each with a clear icon, and two icon-display areas representing the player and the computer.
- Clicking a choice must disable all three buttons immediately, then play a roughly 800ms "shaking hands" countdown where both the player's and computer's displayed icon rapidly cycle through random choices to simulate the classic "rock-paper-scissors-shoot" beat.
- After the countdown, reveal the player's actual choice and a freshly randomized computer choice, then determine and display the outcome (win, lose, or tie) using a data-driven rule lookup rather than a long chain of conditionals.
- Show a result message that names the specific rule that applied (for example "Paper covers Rock — You win!"), correctly grammatical for all six possible win/lose combinations, not just a generic win/lose label.
- Give both icon displays a distinct visual state (like a colored ring) reflecting whether that side won, lost, or tied the round.
- Maintain a running win/loss/tie score tally that persists across rounds for the session, displayed at all times, with a "Reset score" control that zeroes it and returns the UI to its initial neutral state.
- Re-enable the choice buttons only after the full countdown and result have resolved, so a user cannot start a second round while one is still animating.`,
    },
  },
};

export default rockPaperScissorsGame;
