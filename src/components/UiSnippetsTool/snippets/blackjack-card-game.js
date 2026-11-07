const blackjackCardGame = {
  id: 'blackjack-card-game',
  title: 'Blackjack Card Game vs Dealer',
  lastmod: '2026-11-07',
  category: 'games',
  html: `<div class="bj" id="bj" data-phase="bet">
  <header class="bj-top">
    <div class="bj-brand"><span class="bj-brand-chip"></span><b>Blackjack</b><small>vs the dealer</small></div>
    <div class="bj-stats">
      <div class="bj-bank"><span>Chips</span><b id="bj-bank">$1,000</b></div>
      <div class="bj-rec" title="Wins, losses and pushes"><span id="bj-w">0</span>W <span id="bj-l">0</span>L <span id="bj-p">0</span>P</div>
      <button type="button" class="bj-reset" id="bj-reset" aria-label="Reset chips and stats" title="Reset chips and stats">&#8634;</button>
    </div>
  </header>

  <div class="bj-table" id="bj-table">
    <svg class="bj-arcs" viewBox="0 0 600 160" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs><path id="bjArcA" d="M80 62 Q300 12 520 62"/><path id="bjArcB" d="M120 112 Q300 150 480 112"/></defs>
      <text><textPath href="#bjArcA" startOffset="50%" text-anchor="middle">BLACKJACK PAYS 3 TO 2</textPath></text>
      <text class="sm"><textPath href="#bjArcB" startOffset="50%" text-anchor="middle">DEALER STANDS ON ALL 17s</textPath></text>
    </svg>

    <div class="bj-shoe" id="bj-shoe" aria-hidden="true"><div class="bj-shoe-stack"><i></i><i></i><i></i></div><span id="bj-shoe-n">312</span></div>

    <section class="bj-seat bj-dealer" aria-label="Dealer">
      <div class="bj-label">Dealer <span class="bj-badge" id="bj-dealer-total"></span></div>
      <div class="bj-hand" id="bj-dealer-hand" role="group" aria-label="Dealer hand"></div>
    </section>

    <div class="bj-center">
      <p class="bj-msg" id="bj-msg" role="status" aria-live="polite">Place your bet</p>
      <p class="bj-hint" id="bj-hint" hidden></p>
    </div>

    <section class="bj-seat bj-player" aria-label="Player">
      <div class="bj-hand" id="bj-player-hand" role="group" aria-label="Your hand"></div>
      <div class="bj-label">You <span class="bj-badge" id="bj-player-total"></span></div>
    </section>

    <div class="bj-bet" aria-label="Current bet"><div class="bj-bet-stack" id="bj-bet-stack"></div><span class="bj-bet-amt" id="bj-bet-amt">$0</span></div>
    <span class="bj-float" id="bj-float" aria-hidden="true"></span>
  </div>

  <div class="bj-controls">
    <div class="bj-bets" role="group" aria-label="Place your bet">
      <button type="button" class="bj-chip c10" data-chip="10" aria-label="Add $10"><span>10</span></button>
      <button type="button" class="bj-chip c50" data-chip="50" aria-label="Add $50"><span>50</span></button>
      <button type="button" class="bj-chip c100" data-chip="100" aria-label="Add $100"><span>100</span></button>
      <button type="button" class="bj-chip c500" data-chip="500" aria-label="Add $500"><span>500</span></button>
      <button type="button" class="bj-btn bj-ghost" id="bj-clear">Clear</button>
      <button type="button" class="bj-btn bj-gold" id="bj-deal" title="Deal (D)">Deal</button>
    </div>
    <div class="bj-play" role="group" aria-label="Your move">
      <button type="button" class="bj-btn" id="bj-hit" title="Hit (H)">Hit</button>
      <button type="button" class="bj-btn" id="bj-stand" title="Stand (S)">Stand</button>
      <button type="button" class="bj-btn" id="bj-double" title="Double down (D)">Double</button>
      <button type="button" class="bj-btn bj-ghost" id="bj-hintbtn" title="Basic strategy hint (?)">Hint</button>
    </div>
    <div class="bj-after" role="group" aria-label="Next hand">
      <button type="button" class="bj-btn bj-gold" id="bj-again" title="Deal again (D)">Deal again</button>
      <button type="button" class="bj-btn bj-ghost" id="bj-change">Change bet</button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 28px 18px; color: #f4f1e8; background: radial-gradient(ellipse 80% 60% at 50% 0%, #17313f 0, transparent 70%), radial-gradient(ellipse 60% 50% at 0% 100%, #2a1736 0, transparent 70%), #0a0d14; -webkit-font-smoothing: antialiased; }

.bj { width: 100%; max-width: 780px; display: flex; flex-direction: column; gap: 18px; }

/* Top bar */
.bj-top { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
.bj-brand { display: flex; align-items: baseline; gap: 10px; }
.bj-brand b { font: 800 20px Georgia, 'Times New Roman', serif; letter-spacing: 0.02em; color: #f5c451; }
.bj-brand small { font-size: 12px; color: #8f9aa8; }
.bj-brand-chip { align-self: center; width: 16px; height: 16px; border-radius: 50%; background: conic-gradient(#f5c451 0 25%, #fff 0 50%, #f5c451 0 75%, #fff 0); box-shadow: 0 0 0 2px #7c5a12; }
.bj-stats { display: flex; align-items: center; gap: 12px; }
.bj-bank { display: flex; flex-direction: column; align-items: flex-end; line-height: 1.1; }
.bj-bank span { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #8f9aa8; }
.bj-bank b { font: 800 22px ui-monospace, SFMono-Regular, Menlo, monospace; color: #fff; }
.bj-rec { padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; color: #b6c0cc; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); }
.bj-rec span { color: #fff; }
.bj-reset { width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.05); color: #b6c0cc; font-size: 16px; cursor: pointer; transition: background 0.15s, color 0.15s; }
.bj-reset:hover, .bj-reset.sure { background: rgba(244,63,94,0.2); color: #fda4af; border-color: rgba(244,63,94,0.5); }

/* The table: felt, a wooden rail and a gold inner line */
.bj-table { position: relative; height: 480px; border-radius: 26px 26px 50% 50% / 26px 26px 110px 110px; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 24px 20px 26px;
  background: radial-gradient(ellipse 75% 60% at 50% 38%, #228455 0, #166b42 52%, #0b4a2c 100%);
  box-shadow: 0 0 0 9px #3a2113, 0 0 0 11px #6e4727, 0 0 0 12px #2a180d, inset 0 0 0 2px rgba(245,196,81,0.4), inset 0 0 90px rgba(0,0,0,0.38), 0 34px 70px rgba(0,0,0,0.6); }
.bj-table::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0.16; mix-blend-mode: overlay; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E"); }
.bj-arcs { position: absolute; left: 50%; top: 50%; width: 88%; transform: translate(-50%, -48%); pointer-events: none; }
.bj-arcs text { fill: rgba(245,196,81,0.34); font: 700 13px Georgia, serif; letter-spacing: 0.2em; }
.bj-arcs text.sm { font-size: 10px; fill: rgba(255,255,255,0.26); }

.bj-shoe { position: absolute; top: 22px; right: 30px; width: 58px; text-align: center; }
.bj-shoe-stack { position: relative; width: 52px; height: 74px; margin: 0 auto 6px; }
.bj-shoe-stack i { position: absolute; inset: 0; border-radius: 7px; background: repeating-linear-gradient(45deg, #1e3a8a 0 5px, #1d4ed8 5px 10px); border: 2px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.4); }
.bj-shoe-stack i:nth-child(1) { transform: translate(4px, 4px); }
.bj-shoe-stack i:nth-child(2) { transform: translate(2px, 2px); }
.bj-shoe span { font: 700 11px ui-monospace, SFMono-Regular, Menlo, monospace; color: rgba(255,255,255,0.65); }

.bj-seat { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.bj-label { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.75); }
.bj-badge { min-width: 26px; padding: 2px 9px; border-radius: 999px; text-align: center; font: 800 12px ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: 0; color: #0b3d24; background: #f4f1e8; transition: background 0.2s, color 0.2s; }
.bj-badge:empty { display: none; }
.bj-badge.bust { background: #ef4444; color: #fff; }
.bj-badge.gold { background: #f5c451; color: #3b2a05; }

.bj-hand { display: flex; justify-content: center; min-height: 118px; }

/* Cards: corner indexes, pips, face cards and a patterned back; the dealer's hole card flips in 3D */
.card { position: relative; flex: none; width: 84px; height: 118px; margin-left: var(--ov, -16px); perspective: 800px; filter: drop-shadow(0 6px 10px rgba(0,0,0,0.45)); }
.card:first-child { margin-left: 0; }
.card-inner { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.3, 0.9, 0.3, 1); }
.card.down .card-inner { transform: rotateY(180deg); }
.face, .back { position: absolute; inset: 0; border-radius: 9px; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.face { background: linear-gradient(160deg, #ffffff, #eef0f5); border: 1px solid #c9ced9; color: #151a22; overflow: hidden; }
.card.red .face { color: #d01f2d; }
.back { transform: rotateY(180deg); border: 3px solid #fff; background: radial-gradient(circle at 50% 50%, #fbbf24 0 7px, transparent 8px), repeating-linear-gradient(45deg, #1e3a8a 0 6px, #2447b0 6px 12px); box-shadow: inset 0 0 0 2px #1e3a8a; }
.corner { position: absolute; display: flex; flex-direction: column; align-items: center; line-height: 1; font: 700 16px Georgia, serif; }
.corner span:last-child { font-size: 13px; margin-top: 1px; }
.corner.tl { left: 7px; top: 6px; }
.corner.br { right: 7px; bottom: 6px; transform: rotate(180deg); }
.pips { position: absolute; inset: 20% 25%; }
.pip { position: absolute; font-size: 19px; line-height: 1; transform: translate(-50%, -50%); }
.pip.flip { transform: translate(-50%, -50%) rotate(180deg); }
.bigsuit { position: absolute; inset: 0; display: grid; place-items: center; font-size: 50px; }
.court { position: absolute; inset: 16% 20%; display: grid; place-content: center; text-align: center; border: 1.5px solid currentColor; border-radius: 7px; font: 700 34px/1 Georgia, serif; background: repeating-linear-gradient(135deg, rgba(0,0,0,0.035) 0 6px, transparent 6px 12px); }
.court small { display: block; margin-top: 4px; font-size: 19px; }

.bj-center { position: relative; z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 8px; max-width: 80%; }
.bj-msg { padding: 8px 20px; border-radius: 999px; text-align: center; font-size: 14px; font-weight: 700; color: #fff7d6; background: rgba(8,26,16,0.62); border: 1px solid rgba(245,196,81,0.35); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); transition: background 0.3s, color 0.3s, border-color 0.3s; }
.bj-msg.win { color: #052e1a; background: linear-gradient(180deg, #fde68a, #f5c451); border-color: #fde68a; }
.bj-msg.loss { color: #fff; background: rgba(185,28,28,0.78); border-color: rgba(252,165,165,0.6); }
.bj-hint { padding: 7px 14px; border-radius: 12px; max-width: 420px; text-align: center; font-size: 12.5px; line-height: 1.45; color: #e8eef4; background: rgba(15,23,42,0.78); border: 1px solid rgba(255,255,255,0.18); }
.bj-hint[hidden] { display: none; }

.bj-bet { position: absolute; z-index: 1; left: 74px; bottom: 66px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.bj-bet-stack { position: relative; width: 50px; height: 50px; border-radius: 50%; border: 2px dashed rgba(245,196,81,0.45); }
.bj-bet-amt { font: 800 13px ui-monospace, SFMono-Regular, Menlo, monospace; color: #f5c451; }
.bj-float { position: absolute; z-index: 5; left: 50%; bottom: 110px; transform: translateX(-50%); font: 800 34px/1 Georgia, serif; opacity: 0; pointer-events: none; text-shadow: 0 3px 16px rgba(0,0,0,0.5); }
.bj-float.plus { color: #fde68a; }
.bj-float.minus { color: #fca5a5; }

/* Chips (the same shape for the buttons and the bet stack) */
.bj-chip { position: relative; width: 56px; height: 56px; border-radius: 50%; border: 0; cursor: pointer; color: #fff; font: 800 15px ui-monospace, SFMono-Regular, Menlo, monospace; --c: #2563eb;
  background: radial-gradient(circle at 50% 50%, var(--c) 0 56%, rgba(255,255,255,0.9) 57% 62%, var(--c) 63%); box-shadow: 0 5px 10px rgba(0,0,0,0.45), inset 0 0 0 3px rgba(255,255,255,0.85), inset 0 -4px 6px rgba(0,0,0,0.25); transition: transform 0.15s; }
.bj-chip::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(transparent 0 8deg, rgba(255,255,255,0.9) 8deg 22deg, transparent 22deg 45deg, rgba(255,255,255,0.9) 45deg 67deg, transparent 67deg 90deg, rgba(255,255,255,0.9) 90deg 112deg, transparent 112deg 135deg, rgba(255,255,255,0.9) 135deg 157deg, transparent 157deg 180deg, rgba(255,255,255,0.9) 180deg 202deg, transparent 202deg 225deg, rgba(255,255,255,0.9) 225deg 247deg, transparent 247deg 270deg, rgba(255,255,255,0.9) 270deg 292deg, transparent 292deg 315deg, rgba(255,255,255,0.9) 315deg 337deg, transparent 337deg); -webkit-mask: radial-gradient(circle, transparent 0 66%, #000 67%); mask: radial-gradient(circle, transparent 0 66%, #000 67%); opacity: 0.55; }
.bj-chip span { position: relative; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
.bj-chip.c10 { --c: #2563eb; } .bj-chip.c50 { --c: #dc2626; } .bj-chip.c100 { --c: #111827; color: #f5c451; } .bj-chip.c500 { --c: #7c3aed; }
.bj-chip:hover:not(:disabled) { transform: translateY(-4px); }
.bj-chip:active:not(:disabled) { transform: translateY(0) scale(0.96); }
.bj-chip:disabled { opacity: 0.35; cursor: not-allowed; }
.bj-chip:focus-visible, .bj-btn:focus-visible, .bj-reset:focus-visible { outline: 2px solid #f5c451; outline-offset: 3px; }
.bj-bet-stack .bj-chip { position: absolute; left: 0; width: 50px; height: 50px; font-size: 12px; pointer-events: none; box-shadow: 0 2px 3px rgba(0,0,0,0.5), inset 0 0 0 3px rgba(255,255,255,0.85); }

/* Controls: one group is visible for each phase of the round */
.bj-controls { display: flex; justify-content: center; min-height: 64px; }
.bj-bets, .bj-play, .bj-after { display: none; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }
.bj[data-phase="bet"] .bj-bets { display: flex; }
.bj[data-phase="dealing"] .bj-play, .bj[data-phase="player"] .bj-play, .bj[data-phase="dealer"] .bj-play { display: flex; }
.bj[data-phase="done"] .bj-after { display: flex; }
.bj-btn { padding: 12px 24px; border: 0; border-radius: 12px; font: inherit; font-size: 14px; font-weight: 800; letter-spacing: 0.02em; color: #fff; cursor: pointer; background: linear-gradient(180deg, #3b4a63, #2a3548); box-shadow: 0 6px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18); transition: transform 0.12s, filter 0.15s, opacity 0.15s; }
.bj-btn:hover:not(:disabled) { filter: brightness(1.15); transform: translateY(-1px); }
.bj-btn:active:not(:disabled) { transform: scale(0.97); }
.bj-btn:disabled { opacity: 0.38; cursor: not-allowed; }
.bj-gold { color: #3b2a05; background: linear-gradient(180deg, #fde68a, #f5c451); box-shadow: 0 6px 16px rgba(245,196,81,0.3), inset 0 1px 0 rgba(255,255,255,0.6); }
.bj-ghost { background: rgba(255,255,255,0.07); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18); }
.bj-btn.rec { box-shadow: 0 0 0 2px #f5c451, 0 0 26px rgba(245,196,81,0.6); animation: bjPulse 1.2s ease-in-out infinite; }
@keyframes bjPulse { 50% { box-shadow: 0 0 0 3px #f5c451, 0 0 38px rgba(245,196,81,0.85); } }

@media (max-width: 600px) {
  body { padding: 16px 10px; }
  .bj-table { height: 520px; padding: 20px 12px 24px; border-radius: 22px 22px 50% 50% / 22px 22px 70px 70px; }
  .card { width: 66px; height: 93px; }
  .corner { font-size: 13px; } .corner span:last-child { font-size: 11px; } .corner.tl { left: 5px; top: 5px; } .corner.br { right: 5px; bottom: 5px; }
  .pip { font-size: 15px; } .bigsuit { font-size: 38px; } .court { font-size: 26px; } .court small { font-size: 15px; }
  .bj-hand { min-height: 93px; }
  .bj-shoe { right: 14px; top: 14px; transform: scale(0.8); transform-origin: top right; }
  .bj-bet { left: 26px; bottom: 54px; }
  .bj-chip { width: 50px; height: 50px; }
  .bj-btn { padding: 11px 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .card-inner { transition-duration: 0.01ms; }
  .bj-btn.rec { animation: none; }
}`,
  js: `// Blackjack against a dealer who stands on all 17s. A 6-deck shoe, chips, double down, a basic-strategy hint.
var SUITS = [
  { s: '♠', n: 'spades', c: 'black' }, { s: '♥', n: 'hearts', c: 'red' },
  { s: '♦', n: 'diamonds', c: 'red' }, { s: '♣', n: 'clubs', c: 'black' }
];
var RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var RANK_NAME = { A: 'Ace', J: 'Jack', Q: 'Queen', K: 'King' };
var DECKS = 6, RESHUFFLE_AT = 78, MIN_BET = 10, START_CHIPS = 1000;
var CHIP_VALUES = [500, 100, 50, 10];
// Pip positions for 2-10: [column 0-2, row 0-6]. Pips in the lower half are drawn upside down, like a real card.
var PIPS = {
  '2': [[1, 0], [1, 6]], '3': [[1, 0], [1, 3], [1, 6]], '4': [[0, 0], [2, 0], [0, 6], [2, 6]],
  '5': [[0, 0], [2, 0], [1, 3], [0, 6], [2, 6]], '6': [[0, 0], [2, 0], [0, 3], [2, 3], [0, 6], [2, 6]],
  '7': [[0, 0], [2, 0], [1, 1.5], [0, 3], [2, 3], [0, 6], [2, 6]],
  '8': [[0, 0], [2, 0], [1, 1.5], [0, 3], [2, 3], [1, 4.5], [0, 6], [2, 6]],
  '9': [[0, 0], [2, 0], [0, 2], [2, 2], [1, 3], [0, 4], [2, 4], [0, 6], [2, 6]],
  '10': [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2], [0, 4], [2, 4], [1, 5], [0, 6], [2, 6]]
};

var shoe = [], player = [], dealer = [];
var bankroll = START_CHIPS, bet = 0, baseBet = 0, lastBet = 0;
var phase = 'bet', busy = false, holeHidden = true, tally = { w: 0, l: 0, p: 0 };
var shownBank = START_CHIPS, resetTimer = null;

var $ = function (id) { return document.getElementById(id); };
var root = $('bj'), playerEl = $('bj-player-hand'), dealerEl = $('bj-dealer-hand'), shoeEl = $('bj-shoe');
var msgEl = $('bj-msg'), hintEl = $('bj-hint'), floatEl = $('bj-float');
var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function el(tag, cls, text) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
function sleep(ms) { return new Promise(function (r) { setTimeout(r, reduce ? Math.min(ms, 30) : ms); }); }
function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }

// ---- The shoe and the scoring ----
function buildShoe() {
  var s = [];
  for (var d = 0; d < DECKS; d++) SUITS.forEach(function (su) { RANKS.forEach(function (r) { s.push({ rank: r, suit: su.s, name: su.n, color: su.c }); }); });
  for (var i = s.length - 1; i > 0; i--) {         // Fisher-Yates: an unbiased shuffle
    var j = Math.floor(Math.random() * (i + 1));
    var t = s[i]; s[i] = s[j]; s[j] = t;
  }
  return s;
}
function draw() { if (!shoe.length) shoe = buildShoe(); return shoe.pop(); }
function pointValue(rank) { return rank === 'A' ? 11 : ('10JQK'.indexOf(rank) !== -1 ? 10 : parseInt(rank, 10)); }

// Best total for a hand. Every Ace starts as 11 and is demoted to 1, one at a time, while the hand would bust.
// "soft" means an Ace is still counting as 11. This is recalculated from scratch whenever a card is added.
function score(hand) {
  var total = 0, aces = 0;
  hand.forEach(function (c) { total += pointValue(c.rank); if (c.rank === 'A') aces++; });
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return { total: total, soft: aces > 0 };
}
function isNatural(hand) { return hand.length === 2 && score(hand).total === 21; }

// ---- Drawing cards ----
function cardName(c) { return (RANK_NAME[c.rank] || c.rank) + ' of ' + c.name; }
function cornerEl(c, pos) {
  var d = el('div', 'corner ' + pos);
  d.appendChild(el('span', '', c.rank));
  d.appendChild(el('span', '', c.suit));
  return d;
}
function cardEl(c, down) {
  var card = el('div', 'card ' + c.color + (down ? ' down' : ''));
  card.setAttribute('role', 'img');
  card.setAttribute('aria-label', down ? 'Face-down card' : cardName(c));
  card._card = c;
  var inner = el('div', 'card-inner');
  var face = el('div', 'face');
  face.appendChild(cornerEl(c, 'tl'));
  face.appendChild(cornerEl(c, 'br'));
  if (PIPS[c.rank]) {
    var pips = el('div', 'pips');
    PIPS[c.rank].forEach(function (p) {
      var pip = el('span', 'pip' + (p[1] > 3 ? ' flip' : ''), c.suit);
      pip.style.left = (p[0] * 50) + '%';
      pip.style.top = (p[1] / 6 * 100) + '%';
      pips.appendChild(pip);
    });
    face.appendChild(pips);
  } else if (c.rank === 'A') {
    face.appendChild(el('div', 'bigsuit', c.suit));
  } else {
    var court = el('div', 'court', c.rank);
    court.appendChild(el('small', '', c.suit));
    face.appendChild(court);
  }
  inner.appendChild(face);
  inner.appendChild(el('div', 'back'));
  card.appendChild(inner);
  return card;
}

// A new card flies in from the shoe, and the cards already on the table slide aside to make room (FLIP:
// measure where they were, let layout move them, then animate the difference away).
function addCard(who, c, down) {
  var hand = who === 'player' ? player : dealer;
  var host = who === 'player' ? playerEl : dealerEl;
  var before = [].map.call(host.children, function (n) { return n.getBoundingClientRect().left; });
  hand.push(c);
  var node = cardEl(c, down);
  host.appendChild(node);
  // The more cards in a hand, the more they overlap, so two cards are both easy to read and six still fit
  var cw = node.offsetWidth, k = hand.length <= 2 ? 0.18 : hand.length === 3 ? 0.3 : hand.length === 4 ? 0.42 : 0.52;
  host.style.setProperty('--ov', '-' + Math.round(cw * k) + 'px');
  if (!reduce && node.animate) {
    [].forEach.call(host.children, function (n, i) {
      if (i >= before.length) return;
      var dx = before[i] - n.getBoundingClientRect().left;
      if (dx) n.animate([{ transform: 'translateX(' + dx + 'px)' }, { transform: 'none' }], { duration: 300, easing: 'ease-out' });
    });
    var from = shoeEl.getBoundingClientRect(), to = node.getBoundingClientRect();
    var fx = from.left + from.width / 2 - (to.left + to.width / 2);
    var fy = from.top + from.height / 2 - (to.top + to.height / 2);
    node.animate([{ transform: 'translate(' + fx + 'px,' + fy + 'px) rotate(-14deg) scale(0.8)', opacity: 0.3 }, { transform: 'none', opacity: 1 }], { duration: 440, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });
  }
  $('bj-shoe-n').textContent = shoe.length;
  return sleep(280);
}
function revealHole() {
  holeHidden = false;
  var hole = dealerEl.children[1];
  if (hole) { hole.classList.remove('down'); hole.setAttribute('aria-label', cardName(hole._card)); }
}

function renderBadge(node, hand, hideHole) {
  node.className = 'bj-badge';
  if (!hand.length) { node.textContent = ''; return; }
  if (hideHole) { node.textContent = pointValue(hand[0].rank) === 11 ? 'A' : String(pointValue(hand[0].rank)); return; }
  var s = score(hand);
  if (s.total > 21) { node.textContent = 'Bust'; node.classList.add('bust'); }
  else if (isNatural(hand)) { node.textContent = 'Blackjack'; node.classList.add('gold'); }
  else node.textContent = (s.soft ? 'Soft ' : '') + s.total;
}
function renderTotals() {
  renderBadge($('bj-player-total'), player, false);
  renderBadge($('bj-dealer-total'), dealer, holeHidden);
  playerEl.setAttribute('aria-label', player.length ? 'Your hand: ' + player.map(cardName).join(', ') + '. ' + $('bj-player-total').textContent : 'Your hand');
}

// ---- Chips, bet and bankroll ----
function renderBet() {
  var stack = $('bj-bet-stack');
  stack.textContent = '';
  var left = bet, n = 0;
  CHIP_VALUES.forEach(function (v) {
    while (left >= v && n < 9) {
      var chip = el('div', 'bj-chip c' + v);
      chip.style.bottom = (n * 5) + 'px';
      stack.appendChild(chip);
      left -= v; n++;
    }
  });
  $('bj-bet-amt').textContent = bet ? money(bet) : '$0';
  [].forEach.call(document.querySelectorAll('.bj-chip[data-chip]'), function (b) { b.disabled = phase !== 'bet' || bet + Number(b.dataset.chip) > bankroll; });
  $('bj-deal').disabled = phase !== 'bet' || bet < MIN_BET;
  $('bj-clear').disabled = phase !== 'bet' || !bet;
}
function tweenBank() {
  var from = shownBank, to = bankroll, t0 = performance.now();
  if (reduce || from === to) { shownBank = to; $('bj-bank').textContent = money(to); return; }
  (function step(now) {
    var k = Math.min(1, (now - t0) / 600);
    shownBank = from + (to - from) * (1 - Math.pow(1 - k, 3));
    $('bj-bank').textContent = money(shownBank);
    if (k < 1) requestAnimationFrame(step); else shownBank = to;
  })(t0);
}
function renderStats() { $('bj-w').textContent = tally.w; $('bj-l').textContent = tally.l; $('bj-p').textContent = tally.p; }
function save() { try { localStorage.setItem('bj-save-v1', JSON.stringify({ bankroll: bankroll, tally: tally })); } catch (e) { /* private mode */ } }
function load() {
  try {
    var d = JSON.parse(localStorage.getItem('bj-save-v1') || 'null');
    if (d && typeof d.bankroll === 'number' && d.tally) { bankroll = d.bankroll; tally = d.tally; return true; }
  } catch (e) { /* ignore */ }
  return false;
}

function setMsg(text, tone) { msgEl.textContent = text; msgEl.className = 'bj-msg' + (tone ? ' ' + tone : ''); }
function setPhase(p) {
  phase = p;
  root.setAttribute('data-phase', p);
  var mine = p === 'player';
  $('bj-hit').disabled = !mine;
  $('bj-stand').disabled = !mine;
  $('bj-double').disabled = !canDouble();
  $('bj-hintbtn').disabled = !mine;
  renderBet();
}
function canDouble() { return phase === 'player' && player.length === 2 && bankroll >= bet; }
function clearHighlights() { hintEl.hidden = true; [].forEach.call(document.querySelectorAll('.bj-btn.rec'), function (b) { b.classList.remove('rec'); }); }
function floatText(text, cls) {
  floatEl.textContent = text;
  floatEl.className = 'bj-float ' + cls;
  if (floatEl.animate && !reduce) floatEl.animate([{ opacity: 0, transform: 'translate(-50%, 16px) scale(0.8)' }, { opacity: 1, transform: 'translate(-50%, -10px) scale(1.08)', offset: 0.25 }, { opacity: 1, transform: 'translate(-50%, -34px) scale(1)', offset: 0.75 }, { opacity: 0, transform: 'translate(-50%, -60px) scale(1)' }], { duration: 1600, easing: 'ease-out' });
}

// ---- Basic strategy (6 decks, dealer stands on 17): what a good player does with this hand ----
function advice() {
  var s = score(player), t = s.total, u = pointValue(dealer[0].rank), up = dealer[0].rank, can = canDouble();
  var weak = u >= 2 && u <= 6, move, why;
  if (s.soft) {
    if (t >= 19) move = 'stand';
    else if (t === 18) move = u >= 9 ? 'hit' : (u >= 3 && u <= 6 ? (can ? 'double' : 'stand') : 'stand');
    else if (t === 17) move = u >= 3 && u <= 6 ? (can ? 'double' : 'hit') : 'hit';
    else if (t >= 15) move = u >= 4 && u <= 6 ? (can ? 'double' : 'hit') : 'hit';
    else move = u >= 5 && u <= 6 ? (can ? 'double' : 'hit') : 'hit';
    why = move === 'double' ? 'The dealer shows ' + up + ', which often busts, and a soft ' + t + ' cannot bust on one card. Double your bet.' :
      move === 'stand' ? 'A soft ' + t + ' is already a strong hand against a dealer ' + up + '.' :
      'A soft hand cannot bust with one more card, so taking one is free.';
  } else if (t >= 17) { move = 'stand'; why = t + ' is strong. Another card is far more likely to bust you than to help.'; }
  else if (t >= 13) { move = weak ? 'stand' : 'hit'; why = weak ? 'The dealer shows ' + up + ', a weak card that often busts. Let them take the risk.' : 'The dealer shows ' + up + ', which is strong, so standing on ' + t + ' usually loses. Take a card.'; }
  else if (t === 12) { move = u >= 4 && u <= 6 ? 'stand' : 'hit'; why = move === 'stand' ? 'The dealer shows ' + up + ', a weak card that often busts. Let them take the risk.' : 'Twelve loses if you stand against a dealer ' + up + ', and only a ten-value card busts you. Hit.'; }
  else if (t === 11) { move = can ? 'double' : 'hit'; why = 'Eleven is the best doubling hand: any ten-value card makes 21.'; }
  else if (t === 10) { move = u <= 9 && can ? 'double' : 'hit'; why = move === 'double' ? 'Ten against a dealer ' + up + ' is a favourite to improve. Double your bet.' : 'Ten against a ' + up + ' is better played with a normal hit.'; }
  else if (t === 9) { move = u >= 3 && u <= 6 && can ? 'double' : 'hit'; why = move === 'double' ? 'The dealer shows ' + up + ', a weak card. Double while it is in trouble.' : 'Nine cannot bust on one card. Take a card.'; }
  else { move = 'hit'; why = t + ' is too low to stand, and you cannot bust with one card.'; }
  return { move: move, why: why };
}
function showHint() {
  if (phase !== 'player' || busy) return;
  clearHighlights();
  var a = advice();
  hintEl.textContent = 'Basic strategy: ' + a.move.charAt(0).toUpperCase() + a.move.slice(1) + '. ' + a.why;
  hintEl.hidden = false;
  $('bj-' + a.move).classList.add('rec');
}

// ---- The round ----
async function dealRound() {
  if (phase !== 'bet' || busy || bet < MIN_BET || bet > bankroll) return;
  busy = true;
  baseBet = bet; lastBet = bet;
  bankroll -= bet; tweenBank();
  player = []; dealer = []; playerEl.textContent = ''; dealerEl.textContent = '';
  holeHidden = true; clearHighlights(); renderTotals();
  if (shoe.length < RESHUFFLE_AT) { setMsg('Shuffling the shoe...'); shoe = buildShoe(); $('bj-shoe-n').textContent = shoe.length; await sleep(800); }
  setPhase('dealing'); setMsg('Dealing...');
  await addCard('player', draw(), false);
  await addCard('dealer', draw(), false);
  await addCard('player', draw(), false);
  await addCard('dealer', draw(), true);
  renderTotals();
  await afterDeal();
  busy = false;
}
async function afterDeal() {
  var pn = isNatural(player);
  var peek = pointValue(dealer[0].rank) >= 10;          // the dealer checks the hole card under an Ace or a ten-value card
  if (pn || (peek && isNatural(dealer))) {
    await sleep(350); revealHole(); renderTotals(); await sleep(650);
    if (pn && isNatural(dealer)) await finish('push', 'Both have blackjack. Push.');
    else if (pn) await finish('blackjack', 'Blackjack! Pays 3 to 2.');
    else await finish('loss', 'Dealer has blackjack.');
    return;
  }
  setPhase('player');
  setMsg('Your move: hit, stand or double.');
}
async function doHit() {
  if (phase !== 'player' || busy) return;
  busy = true; clearHighlights();
  await addCard('player', draw(), false);
  renderTotals();
  var t = score(player).total;
  if (t > 21) await finish('loss', 'Bust! You went over 21.');
  else if (t === 21) await dealerTurn();
  else { setPhase('player'); setMsg('Hit or stand?'); }
  busy = false;
}
async function doStand() {
  if (phase !== 'player' || busy) return;
  busy = true; clearHighlights();
  await dealerTurn();
  busy = false;
}
async function doDouble() {
  if (!canDouble() || busy) return;
  busy = true; clearHighlights();
  bankroll -= bet; bet *= 2; tweenBank(); renderBet();
  setMsg('Doubled. One more card...');
  await addCard('player', draw(), false);
  renderTotals();
  if (score(player).total > 21) await finish('loss', 'Bust on the double.');
  else await dealerTurn();
  busy = false;
}
async function dealerTurn() {
  setPhase('dealer'); setMsg('Dealer plays...');
  revealHole(); renderTotals();
  await sleep(700);
  while (score(dealer).total < 17) {                    // the house rule: draw to 16, stand on 17 (soft or hard)
    await addCard('dealer', draw(), false);
    renderTotals();
    await sleep(380);
  }
  var p = score(player).total, d = score(dealer).total;
  if (d > 21) await finish('win', 'Dealer busts with ' + d + '! You win.');
  else if (d > p) await finish('loss', 'Dealer wins ' + d + ' to ' + p + '.');
  else if (d < p) await finish('win', 'You win ' + p + ' to ' + d + '!');
  else await finish('push', 'Push at ' + p + '. Your bet is returned.');
}
// Payouts: a win returns the bet plus the same again, a blackjack pays 3 to 2, a push returns the bet
async function finish(outcome, text) {
  var back = outcome === 'blackjack' ? bet * 2.5 : outcome === 'win' ? bet * 2 : outcome === 'push' ? bet : 0;
  bankroll += back;
  var net = back - bet;
  if (outcome === 'win' || outcome === 'blackjack') tally.w++; else if (outcome === 'loss') tally.l++; else tally.p++;
  if (holeHidden) revealHole();
  renderTotals(); renderStats(); tweenBank(); save();
  setMsg(text, outcome === 'loss' ? 'loss' : (outcome === 'push' ? '' : 'win'));
  floatText(net > 0 ? '+' + money(net) : (net < 0 ? '-' + money(-net) : 'Push'), net > 0 ? 'plus' : (net < 0 ? 'minus' : 'plus'));
  bet = 0; renderBet();
  setPhase('done');
  var again = $('bj-again');
  again.disabled = bankroll < lastBet;
  again.textContent = 'Deal again (' + money(lastBet) + ')';
  if (bankroll < MIN_BET) setMsg('Out of chips! Press the reset button to start over.', 'loss');
}

// ---- Wiring ----
[].forEach.call(document.querySelectorAll('.bj-chip[data-chip]'), function (b) {
  b.addEventListener('click', function () {
    var v = Number(b.dataset.chip);
    if (phase === 'bet' && bet + v <= bankroll) { bet += v; renderBet(); setMsg(bet >= MIN_BET ? 'Bet ' + money(bet) + '. Press Deal.' : 'Place your bet'); }
  });
});
$('bj-clear').addEventListener('click', function () { bet = 0; renderBet(); setMsg('Place your bet'); });
$('bj-deal').addEventListener('click', dealRound);
$('bj-hit').addEventListener('click', doHit);
$('bj-stand').addEventListener('click', doStand);
$('bj-double').addEventListener('click', doDouble);
$('bj-hintbtn').addEventListener('click', showHint);
$('bj-again').addEventListener('click', function () {
  if (phase !== 'done' || busy || bankroll < lastBet) return;
  bet = lastBet; setPhase('bet'); dealRound();
});
$('bj-change').addEventListener('click', function () {
  if (phase !== 'done' || busy) return;
  player = []; dealer = []; playerEl.textContent = ''; dealerEl.textContent = ''; holeHidden = true;
  renderTotals(); bet = 0; setPhase('bet'); setMsg('Place your bet');
});
$('bj-reset').addEventListener('click', function () {
  var b = $('bj-reset');
  if (!b.classList.contains('sure')) {                  // the first press only asks; the second one resets
    b.classList.add('sure'); b.textContent = '?'; b.title = 'Press again to reset';
    resetTimer = setTimeout(function () { b.classList.remove('sure'); b.innerHTML = '&#8634;'; b.title = 'Reset chips and stats'; }, 2500);
    return;
  }
  clearTimeout(resetTimer); b.classList.remove('sure'); b.innerHTML = '&#8634;';
  if (busy) return;
  bankroll = START_CHIPS; tally = { w: 0, l: 0, p: 0 }; bet = 0; player = []; dealer = [];
  playerEl.textContent = ''; dealerEl.textContent = ''; holeHidden = true;
  shownBank = bankroll; $('bj-bank').textContent = money(bankroll);
  renderStats(); renderTotals(); save(); clearHighlights(); setPhase('bet'); setMsg('Place your bet');
});
// Keyboard: H hit, S stand, D double (or deal), ? hint
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  var k = e.key.toLowerCase();
  if (phase === 'player') {
    if (k === 'h') doHit(); else if (k === 's') doStand(); else if (k === 'd') doDouble(); else if (k === '?' || k === '/') showHint();
  } else if (phase === 'bet' && k === 'd') dealRound();
  else if (phase === 'done' && k === 'd') $('bj-again').click();
});

// ---- Start: a first-time visitor gets a hand already dealt, so there is something to play straight away ----
function take(rank, name) {
  for (var i = 0; i < shoe.length; i++) if (shoe[i].rank === rank && shoe[i].name === name) return shoe.splice(i, 1)[0];
  return null;
}
function begin() {
  shoe = buildShoe();
  $('bj-shoe-n').textContent = shoe.length;
  var saved = load();
  shownBank = bankroll; $('bj-bank').textContent = money(bankroll);
  renderStats(); renderTotals();
  if (saved) { setPhase('bet'); setMsg(bankroll < MIN_BET ? 'Out of chips! Press the reset button to start over.' : 'Place your bet'); return; }
  bet = baseBet = lastBet = 50; bankroll -= bet; shownBank = bankroll; $('bj-bank').textContent = money(bankroll);
  player = [take('Q', 'hearts'), take('5', 'clubs')];
  dealer = [take('7', 'diamonds'), take('9', 'spades')];
  holeHidden = true;
  player.forEach(function (c) { playerEl.appendChild(cardEl(c, false)); });
  dealer.forEach(function (c, i) { dealerEl.appendChild(cardEl(c, i === 1)); });
  $('bj-shoe-n').textContent = shoe.length;
  renderTotals();
  setPhase('player');
  setMsg('Your first hand is dealt: hit or stand?');
}
begin();`,
  seo: {
    title: 'Blackjack vs Dealer with Chips and Hints — Free HTML CSS JS',
    description: 'A playable casino blackjack table in vanilla JS with real card faces, chips and 3:2 payouts, double down, a flipping hole card and a basic-strategy hint.',
    about: {
      title: 'Blackjack Card Game — A Casino Table With Chips, Double Down, 3:2 Payouts and a Strategy Hint',
      description: `Blackjack looks simple but rewards getting the details right: an Ace that changes value, a dealer who follows a fixed rule, a blackjack that pays more than an ordinary win, and a tie that returns your bet. This snippet is a complete single-player table in plain JavaScript and CSS, with every one of those rules implemented, real playing-card faces drawn without any images, chips and a bankroll, and the extras that make it feel like a game rather than a demo: a card that flies from the shoe, a hole card that flips in 3D, and a hint button that explains what basic strategy would do.

**Soft and hard totals**

\`score(hand)\` adds every card with each Ace counted as 11, remembers how many Aces there are, and then demotes them to 1 one at a time while the total is over 21. It returns both the best total and whether the hand is "soft" (an Ace is still counting as 11). A hand of Ace and 6 reads as a soft 17, and drawing a 10 turns it into a hard 17 without any special-case code, because the total is recalculated from scratch on every card.

**A fixed dealer, and the real rules of the table**

After you stand, the dealer's hole card flips and \`dealerTurn()\` draws until the total reaches 17, then stops, whether the 17 is hard or soft ("dealer stands on all 17s", printed on the felt). A natural is checked the way a casino checks it: when the dealer shows an Ace or a ten-value card, the hole card is peeked at straight away. Player blackjack against a dealer without one pays 3 to 2; both having blackjack is a push, which the earlier version of this snippet scored as a win; a bust ends the round at once as a loss.

**Chips, payouts and double down**

Bets are built from chips of 10, 50, 100 and 500, and the bet is shown as a stack drawn greedily from the highest chip down. \`finish()\` is the one place money moves: a win returns the bet twice, a blackjack returns it 2.5 times, a push returns it once and a loss returns nothing, so the ledger always balances. Double down is allowed on the first two cards when you can afford it: the bet doubles, you get exactly one more card, and the dealer then plays. Chips and the win, loss and push record are saved to \`localStorage\` in a try/catch, and a two-press reset button starts over.

**A six-deck shoe**

The shoe holds six shuffled decks (312 cards), built with the Fisher-Yates shuffle, which is the standard unbiased in-place shuffle. \`draw()\` pops from the end, a new shoe is shuffled when fewer than 78 cards remain, and the shoe counter beside the stack shows how deep you are.

**Cards drawn with CSS**

Each card is built from elements: a corner index at the top left and, rotated 180 degrees, at the bottom right; pips for the numbers 2 to 10 placed from a table of column and row positions (the lower half drawn upside down like a real card); a large suit for the Ace; and a framed letter for the court cards. The back is a repeating-gradient pattern. The dealer's hole card has a front and a back with \`backface-visibility: hidden\`, and removing the \`down\` class rotates it 180 degrees on the Y axis.

**Animating the deal with FLIP**

When a card is dealt, \`addCard()\` measures the cards already in the hand, adds the new one (which makes the hand re-centre), and animates each old card from its previous position back to the new one with the Web Animations API. The new card flies in from the shoe's position the same way. Only transforms are animated, so the motion stays smooth, and visitors who prefer reduced motion get an instant deal.

**A hint that explains itself**

The Hint button runs \`advice()\`, a compact basic-strategy table for six decks with a dealer who stands on 17. It looks at your total, whether it is soft, the dealer's up card and whether doubling is still possible, then names the move and gives a one-sentence reason. The recommended button pulses gold. It never plays for you.

**Keyboard and accessibility**

H hits, S stands, D doubles (or deals when betting), and ? shows the hint. The message line is a live region, every card has an \`aria-label\` such as "Queen of hearts" (the hole card says "Face-down card" until it is revealed), and the hands announce their cards and total.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Play the hand you are dealt', text: 'A first-time visitor starts with a hand already dealt: a Queen and a 5 against a dealer 7. Press Hit or Stand. After that, every hand starts with your own bet.' },
      { title: 'Place a bet', text: 'Click chips to build a bet of 10, 50, 100 or 500 each, up to your chips. Clear removes it, and Deal starts the round with a card flying from the shoe to each hand.' },
      { title: 'Hit, stand or double', text: 'Hit takes a card, Stand ends your turn, and Double (on your first two cards) doubles the bet and gives you exactly one more card. Going over 21 is an instant loss.' },
      { title: 'Ask for a hint', text: 'Press Hint (or ?) and the table names the basic-strategy move with a short reason. The matching button pulses. Try it on a soft hand such as Ace and 6.' },
      { title: 'Watch the dealer', text: 'The hole card flips in 3D and the dealer draws to 16 and stands on every 17. A blackjack pays 3 to 2, a push returns your bet, and the float text shows what you won or lost.' },
      { title: 'Keep playing', text: 'Deal again repeats your last bet, and Change bet lets you pick a new one. When the shoe runs low it is reshuffled. Your chips are remembered the next time you visit.' },
      { title: 'Use the keyboard', text: 'H, S and D play the hand, D deals when you are betting, and ? shows the hint.' },
      { title: 'Make it your own', text: 'Change MIN_BET, START_CHIPS, DECKS or the CHIP_VALUES list in the JS panel. For hit-on-soft-17, change the dealer loop in dealerTurn() to also draw on a soft 17.' },
    ]},
    features: [
      'Real card faces built from HTML and CSS: corner indexes, pips for 2 to 10, big Ace, framed court cards',
      'Hole card that flips in 3D, and cards that fly in from a six-deck shoe',
      'FLIP animation re-spaces the cards already in a hand when a new one arrives',
      'Chips with a 10, 50, 100 and 500 denomination, a stacked bet and an animated chip counter',
      'Casino payouts: 3 to 2 for blackjack, 1 to 1 for a win, bet returned on a push',
      'Double down on the first two cards, with the bankroll checked first',
      'Soft and hard Ace scoring recalculated on every card',
      'Dealer stands on all 17s, and peeks for blackjack under an Ace or ten-value card',
      'Basic-strategy hint button with a one-line explanation and a pulsing recommended action',
      'Six-deck shoe with Fisher-Yates shuffle and automatic reshuffle below 78 cards',
      'Chips and the win, loss and push record saved in localStorage, with a two-press reset',
      'Keyboard play (H, S, D, ?), live-region messages and labelled cards, and reduced-motion support',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching state machines and recalculation', desc: 'The Ace rule is a good example of a value that cannot be computed once and cached: it must be recalculated from the hand each time. The bet, dealing, player, dealer and done phases make a compact state machine.' },
      { icon: 'APP', title: 'Portfolio pieces that show a rules engine', desc: 'A blackjack with correct Ace scoring, a house-rule dealer, 3 to 2 payouts and push handling shows edge-case thinking far better than a static card mockup.' },
      { icon: 'FLOW', title: 'A playable diversion on a site', desc: 'A self-contained, dependency-free table is an easy drop-in for a break-room page, a waiting screen or a games section, with no server needed.' },
      { icon: 'DESIGN', title: 'Card UI and 3D flip reference', desc: 'The card faces, the backface-visibility flip and the FLIP re-spacing are reusable for memory games, flashcards or any hand-of-cards layout.' },
      { icon: 'CODE', title: 'A base for splitting, insurance and surrender', desc: 'The round is split into named functions (dealRound, doHit, doDouble, dealerTurn, finish), so side rules can be added without touching the scoring.' },
      { icon: 'FORM', title: 'Probability and strategy practice', desc: 'The hint button is a basic-strategy trainer. Play with and without it and compare your results over a few hundred hands.' },
      { icon: 'CODE', title: 'Related: Battleship Ship-Finding Game', desc: 'See the [Battleship Ship-Finding Game](/ui-snippets/battleship-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Precision Aim Trainer Game', desc: 'See the [Precision Aim Trainer Game](/ui-snippets/precision-aim-trainer-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Mastermind Code Breaker Game', desc: 'See the [Mastermind Code Breaker Game](/ui-snippets/mastermind-code-breaker-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Dots and Boxes Game', desc: 'See the [Dots and Boxes Game](/ui-snippets/dots-and-boxes-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the game decide whether an Ace counts as 1 or 11?', a: 'score() adds every Ace as 11 and counts them, then demotes Aces to 1 one at a time while the total is over 21. It returns the best total that does not bust and a soft flag that says whether an Ace is still counting as 11, and it recalculates from the whole hand every time a card is added.' },
      { q: 'What does the dealer do, and can I change the rule?', a: 'The dealer draws until the total is 17 or more and stands on every 17, including a soft 17. For the stricter "hit on soft 17" rule, change the loop in dealerTurn() so it also keeps drawing when score(dealer).total is 17 and the hand is soft.' },
      { q: 'How are payouts worked out?', a: 'finish() is the only place money moves. A win returns twice the bet, a blackjack returns 2.5 times the bet (3 to 2 profit), a push returns the bet, and a loss returns nothing. Because the bet is taken when you deal or double, those returns keep the bankroll exact. Chips are multiples of 10, so 3 to 2 never creates a fraction.' },
      { q: 'What happens when both have blackjack?', a: 'It is a push and your bet is returned. When the dealer shows an Ace or a ten-value card, the hole card is peeked at straight after the deal, so a dealer blackjack ends the round immediately.' },
      { q: 'How does the card flip and the dealing animation work?', a: 'The hole card has a front and a back with backface-visibility hidden, and the card-inner element rotates 180 degrees on the Y axis when the down class is removed. For dealing, addCard() uses FLIP: it measures the existing cards, adds the new one, and animates each card from its old position, and the new card from the shoe, with the Web Animations API.' },
      { q: 'How is the shoe shuffled, and is it unbiased?', a: 'buildShoe() creates six decks and applies the Fisher-Yates shuffle, swapping each card with a randomly chosen card at or before it. That is the standard way to get an unbiased permutation. Sorting with Math.random() is not uniform.' },
      { q: 'Can I add splitting or insurance?', a: 'Yes. The round is split into named functions, so splitting would mean holding an array of hands instead of one, giving each its own bet, and running doHit and dealerTurn once per hand. Insurance is a side bet offered when the dealer shows an Ace, settled in afterDeal().' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JS into an AI assistant like Claude and ask it to trace score() with Ace, Ace and 9 to confirm it reads a soft 21 and not two Aces counted as 11, and to explain why finish() pays 2.5 times the bet for a blackjack. Then try the extensions the code does not have: splitting a pair into two hands with a bet each, an insurance side bet when the dealer shows an Ace, a hit-on-soft-17 table rule switch, a Hi-Lo card-counting trainer that shows the running and true count, sound effects with the Web Audio API, or a simulation mode that plays 10,000 hands with basic strategy and reports the house edge.`,
      prompt: `Build a casino-style single-player Blackjack game in plain HTML, CSS and JavaScript, with no libraries and no image files.

Requirements:
- Table: a felt table with a wooden rail, curved printed text ("BLACKJACK PAYS 3 TO 2", "DEALER STANDS ON ALL 17s"), a dealer hand at the top, a message line in the middle, your hand below it, a shoe in the corner with a card counter, and a bet circle.
- Cards drawn with HTML and CSS only: a corner index at the top left and, rotated 180 degrees, at the bottom right; pips for 2 to 10 placed from a table of column and row positions with the lower half upside down; a large suit for the Ace; a framed letter for J, Q and K; red and black suits; a patterned back. The dealer's hole card has a front and back (backface-visibility: hidden) and flips in 3D when revealed.
- Shoe: six decks shuffled with Fisher-Yates, reshuffled when fewer than 78 cards remain, with the count shown.
- Scoring: a score(hand) function that counts Aces as 11 and demotes them one at a time while the total is over 21, returning the best total and whether the hand is soft. Show the total in a badge ("Soft 17", "Bust", "Blackjack").
- Betting: a $1,000 bankroll, chips of 10, 50, 100 and 500 drawn as round casino chips, a stacked bet display and a counter that animates when it changes. Payouts in one function: win returns 2x the bet, blackjack returns 2.5x, push returns 1x, loss returns 0. Save chips and the win/loss/push record to localStorage in a try/catch, with a two-press reset.
- Round: deal alternating cards (dealer's second face down), peek for dealer blackjack under an Ace or ten, push if both have blackjack, hit, stand, and double down on the first two cards (double the bet, take exactly one card). A bust ends the round immediately. The dealer reveals the hole card and draws to 16, standing on all 17s.
- Animation: each dealt card flies in from the shoe with the Web Animations API, and the cards already in the hand slide to their new positions with a FLIP technique. Show a floating "+$150" or "-$50" after each round. Respect prefers-reduced-motion.
- Hint: a button that computes basic strategy for six decks (hard totals, soft totals, doubling when allowed) from the player's hand and the dealer's up card, shows the move with a one-sentence reason, and highlights the matching button. It must not play for the user.
- Keyboard and accessibility: H hit, S stand, D double or deal, ? hint; a live region for messages; aria-labels on cards ("Queen of hearts") and on the hands; the hole card labelled "Face-down card" until revealed.
- Start a first-time visitor with a hand already dealt (Queen and 5 against a 7) so there is something to play immediately. Make it responsive, with smaller cards under 600px.`,
    },
  },
};

export default blackjackCardGame;
