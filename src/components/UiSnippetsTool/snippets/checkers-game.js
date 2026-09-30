const checkersGame = {
  id: 'checkers-game',
  title: 'Checkers Game',
  category: 'games',
  html: `<div class="ck-app">
  <div class="ck-header">
    <h2>Checkers</h2>
    <div class="stats">
      <div class="stat red"><span class="stat-label">Red</span><span class="stat-val" id="ck-red">12</span></div>
      <div class="stat black"><span class="stat-label">Black</span><span class="stat-val" id="ck-black">12</span></div>
    </div>
  </div>

  <p class="ck-turn" id="ck-turn">Red to move — click a piece, then click a highlighted square.</p>

  <div class="ck-board" id="ck-board"></div>

  <div class="ck-actions">
    <button class="ghost-btn" id="ck-reset">New Game</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.ck-app { max-width: 420px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 14px; }

.ck-header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.ck-header h2 { font-size: 19px; font-weight: 800; color: #1e293b; }

.stats { display: flex; gap: 10px; }
.stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 6px 14px; min-width: 56px; text-align: center; }
.stat-label { display: block; font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.stat-val { display: block; font-size: 15px; font-weight: 800; }
.stat.red .stat-val { color: #dc2626; }
.stat.black .stat-val { color: #1e293b; }

.ck-turn { font-size: 12.5px; font-weight: 600; color: #64748b; text-align: center; min-height: 32px; line-height: 1.5; }
.ck-turn.win { color: #16a34a; font-weight: 800; }
.ck-turn.bad { color: #dc2626; }

.ck-board {
  width: 100%; max-width: 360px; aspect-ratio: 1 / 1;
  display: grid; grid-template-columns: repeat(8, 1fr); grid-template-rows: repeat(8, 1fr);
  border: 3px solid #1e293b; border-radius: 8px; overflow: hidden;
}
.ck-sq { position: relative; display: flex; align-items: center; justify-content: center; cursor: default; }
.ck-sq.light { background: #f1e4d0; }
.ck-sq.dark { background: #8b6b4a; }
.ck-sq.playable { cursor: pointer; }
.ck-sq.selected { box-shadow: inset 0 0 0 3px #6366f1; }
.ck-sq.hint::after { content: ''; position: absolute; width: 28%; height: 28%; border-radius: 50%; background: rgba(99,102,241,0.55); }
.ck-sq.capture-hint::after { background: rgba(220,38,38,0.6); }

.ck-piece {
  width: 76%; height: 76%; border-radius: 50%; position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.35), inset 0 -3px 4px rgba(0,0,0,0.25), inset 0 3px 4px rgba(255,255,255,0.15);
  transition: transform 0.1s;
}
.ck-piece.red { background: radial-gradient(circle at 35% 30%, #f87171, #b91c1c); }
.ck-piece.black { background: radial-gradient(circle at 35% 30%, #475569, #0f172a); }
.ck-piece.king::after {
  content: '\\2605'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.85); font-size: 13px;
}

.ghost-btn {
  background: none; border: 1.5px solid #e2e8f0; border-radius: 10px;
  padding: 8px 16px; font-size: 12px; font-weight: 700; color: #475569;
  cursor: pointer; font-family: inherit; transition: border-color 0.15s, color 0.15s;
}
.ghost-btn:hover { border-color: #6366f1; color: #6366f1; }`,
  js: `const SIZE = 8;
const boardEl = document.getElementById('ck-board');
const turnEl = document.getElementById('ck-turn');
const redCountEl = document.getElementById('ck-red');
const blackCountEl = document.getElementById('ck-black');

// board[r][c] = null | { color: 'red'|'black', king: bool }
let board = [];
let turn = 'red';
let selected = null; // { r, c }
let legalMoves = []; // moves available for the selected piece this click
let mustCapture = false;
let gameOver = false;

function initBoard() {
  board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < SIZE; c++) {
      if ((r + c) % 2 === 1) board[r][c] = { color: 'black', king: false };
    }
  }
  for (let r = 5; r < 8; r++) {
    for (let c = 0; c < SIZE; c++) {
      if ((r + c) % 2 === 1) board[r][c] = { color: 'red', king: false };
    }
  }
}

function inBounds(r, c) { return r >= 0 && r < SIZE && c >= 0 && c < SIZE; }

function dirsFor(piece) {
  // Regular red pieces move up (toward row 0); regular black pieces move down (toward row 7). Kings move all 4 diagonals.
  if (piece.king) return [[-1, -1], [-1, 1], [1, -1], [1, 1]];
  return piece.color === 'red' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
}

function movesFor(r, c) {
  const piece = board[r][c];
  if (!piece) return { simple: [], captures: [] };
  const simple = [];
  const captures = [];
  for (const [dr, dc] of dirsFor(piece)) {
    const nr = r + dr, nc = c + dc;
    if (inBounds(nr, nc) && !board[nr][nc]) simple.push({ r: nr, c: nc });
    const jr = r + dr * 2, jc = c + dc * 2;
    if (inBounds(jr, jc) && inBounds(nr, nc) && board[nr][nc] && board[nr][nc].color !== piece.color && !board[jr][jc]) {
      captures.push({ r: jr, c: jc, capR: nr, capC: nc });
    }
  }
  return { simple, captures };
}

function anyCaptureAvailable(color) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const p = board[r][c];
      if (p && p.color === color && movesFor(r, c).captures.length) return true;
    }
  }
  return false;
}

function countPieces() {
  let red = 0, black = 0;
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
    const p = board[r][c];
    if (p) { if (p.color === 'red') red++; else black++; }
  }
  redCountEl.textContent = String(red);
  blackCountEl.textContent = String(black);
  return { red, black };
}

function render() {
  boardEl.innerHTML = '';
  mustCapture = anyCaptureAvailable(turn);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const sq = document.createElement('div');
      sq.className = 'ck-sq ' + ((r + c) % 2 === 1 ? 'dark' : 'light');
      const piece = board[r][c];

      if (piece) {
        const p = document.createElement('div');
        p.className = 'ck-piece ' + piece.color + (piece.king ? ' king' : '');
        sq.appendChild(p);
      }

      if (selected && selected.r === r && selected.c === c) sq.classList.add('selected');

      const hint = legalMoves.find(m => m.r === r && m.c === c);
      if (hint) {
        sq.classList.add('playable', 'hint');
        if (hint.capR !== undefined) sq.classList.add('capture-hint');
      }
      if ((r + c) % 2 === 1 && piece && piece.color === turn && !selected) {
        sq.classList.add('playable');
      }

      sq.addEventListener('click', () => onSquareClick(r, c));
      boardEl.appendChild(sq);
    }
  }
}

function onSquareClick(r, c) {
  if (gameOver) return;
  const piece = board[r][c];

  // Clicking a highlighted destination completes the move
  const dest = legalMoves.find(m => m.r === r && m.c === c);
  if (selected && dest) {
    performMove(selected.r, selected.c, dest);
    return;
  }

  // Clicking a piece of the current color selects it (and enforces forced captures)
  if (piece && piece.color === turn) {
    const moves = movesFor(r, c);
    const available = mustCapture ? moves.captures : [...moves.captures, ...moves.simple];
    if (mustCapture && moves.captures.length === 0) {
      turnEl.textContent = 'A capture is available elsewhere on the board — you must take it.';
      turnEl.className = 'ck-turn bad';
      return;
    }
    selected = { r, c };
    legalMoves = available;
    turnEl.textContent = mustCapture ? 'Capture available — click a highlighted square to jump.' : 'Click a highlighted square to move.';
    turnEl.className = 'ck-turn';
    render();
    return;
  }

  selected = null;
  legalMoves = [];
  render();
}

function performMove(fromR, fromC, dest) {
  const piece = board[fromR][fromC];
  board[fromR][fromC] = null;
  board[dest.r][dest.c] = piece;

  let chainCapture = false;
  if (dest.capR !== undefined) {
    board[dest.capR][dest.capC] = null;
    const followUp = movesFor(dest.r, dest.c).captures;
    if (followUp.length) chainCapture = true;
  }

  // Kinging: reaching the far row promotes a regular piece
  if (!piece.king && ((piece.color === 'red' && dest.r === 0) || (piece.color === 'black' && dest.r === SIZE - 1))) {
    piece.king = true;
  }

  const counts = countPieces();

  if (chainCapture) {
    selected = { r: dest.r, c: dest.c };
    legalMoves = movesFor(dest.r, dest.c).captures;
    turnEl.textContent = 'Multi-jump! Click a highlighted square to continue capturing.';
    turnEl.className = 'ck-turn';
    render();
    return;
  }

  selected = null;
  legalMoves = [];

  if (counts.red === 0) { endGame('Black wins — all red pieces captured!'); return; }
  if (counts.black === 0) { endGame('Red wins — all black pieces captured!'); return; }

  turn = turn === 'red' ? 'black' : 'red';

  if (!anyCaptureAvailable(turn) && !hasAnyMove(turn)) {
    endGame((turn === 'red' ? 'Black' : 'Red') + ' wins — ' + turn + ' has no legal moves!');
    return;
  }

  turnEl.textContent = (turn === 'red' ? 'Red' : 'Black') + ' to move — click a piece, then click a highlighted square.';
  turnEl.className = 'ck-turn';
  render();
}

function hasAnyMove(color) {
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
    const p = board[r][c];
    if (p && p.color === color) {
      const m = movesFor(r, c);
      if (m.simple.length || m.captures.length) return true;
    }
  }
  return false;
}

function endGame(message) {
  gameOver = true;
  turnEl.textContent = message;
  turnEl.className = 'ck-turn win';
  render();
}

function reset() {
  initBoard();
  turn = 'red';
  selected = null;
  legalMoves = [];
  gameOver = false;
  countPieces();
  turnEl.textContent = 'Red to move — click a piece, then click a highlighted square.';
  turnEl.className = 'ck-turn';
  render();
}

document.getElementById('ck-reset').addEventListener('click', reset);
reset();`,
  seo: {
    title: 'Checkers Game — Free HTML CSS JS Snippet',
    description: 'A full playable Checkers (draughts) game with forced captures, multi-jump chains, and king promotion, built in vanilla JS on an 8x8 board. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Checkers Game — Forced Captures, Multi-Jump Chains & King Promotion in Vanilla JS',
      description: `Checkers (draughts) is a two-player board game played on the dark squares of an 8x8 grid, where pieces move diagonally, capture by jumping over an opposing piece into an empty square beyond it, and are promoted to kings on reaching the far row. This snippet implements the full rule set — not a simplified mockup — including the rule that captures are mandatory whenever one is available, and that a single turn can chain several jumps together if each landing square opens up another capture.

**Board representation and movement**

The board is a plain 8x8 array, \`board[r][c]\`, holding either \`null\` or a piece object \`{ color, king }\`. \`movesFor(r, c)\` computes both the simple diagonal moves and the jump captures available to the piece at that square by checking \`dirsFor(piece)\` — two forward diagonals for a regular piece (up for red, down for black) or all four diagonals once a piece is \`king\`. A capture requires an opposing piece immediately adjacent diagonally with an empty square directly beyond it in the same direction.

**Forced captures — the rule most checkers implementations skip**

\`anyCaptureAvailable(color)\` scans every piece of the moving color before each turn. If any piece on the board has a legal capture, \`mustCapture\` is set and clicking a piece without one shows an inline message telling the player a capture is available elsewhere and must be taken instead. This mandatory-capture rule is one of the most commonly-missed parts of checkers in casual implementations, and is central to real strategic play — it is why players can deliberately "sacrifice" a piece to force a worse trade for the opponent.

**Multi-jump chains**

After a capture lands, \`performMove()\` immediately calls \`movesFor()\` again from the new square. If further captures are available from that same piece, the turn does not pass — \`selected\` stays on the same piece, \`legalMoves\` is replaced with only the follow-up captures, and the player must continue jumping with that piece before the turn ends. This correctly implements the standard checkers rule that a capturing move must be completed as far as it will go in one turn.

**King promotion**

When a regular piece's landing row is the opponent's back row (row 0 for red, row 7 for black), \`piece.king = true\` promotes it in place, rendering a star glyph over the piece via the \`.king::after\` CSS pseudo-element and unlocking backward diagonal movement through \`dirsFor()\`.

**Win detection**

The game ends the moment either color's piece count reaches zero, or the side to move has no legal moves at all (\`hasAnyMove\`) — both a real, complete win condition, not just a piece-count check, since checkers can also be won by immobilizing the opponent even with pieces still on the board.

**Click-to-select interaction**

Like other click-based board games in this library, moves are made by clicking a piece (highlighting its legal destinations, with capture destinations tinted differently from quiet moves) and then clicking a highlighted destination square — fully usable on touch devices without drag-and-drop.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click a piece to select it', text: 'Legal destination squares light up — a red-tinted dot marks a capturing jump, an indigo dot marks a quiet move.' },
        { title: 'Click a highlighted square to move', text: 'If the move is a capture, the jumped piece is removed from the board immediately.' },
        { title: 'Watch for forced captures', text: 'If any piece of your color can capture, you must select and play a capturing piece — the game blocks quiet moves in that situation.' },
        { title: 'Chain multiple jumps', text: 'Landing a capture that opens another capture from the same piece keeps that piece selected so you can continue the chain in one turn.' },
        { title: 'Reach the far row to king a piece', text: 'A regular piece reaching the opponent\'s back row is promoted to a king (marked with a star) and can then move and capture backward too.' },
        { title: 'Start a new game', text: 'Click "New Game" to reset both the board and the piece counts to the starting position.' },
      ],
    },
    features: [
      'Full 8x8 checkers board modeled as a plain 2D array of piece objects',
      'Mandatory-capture rule enforced across the whole board, not just the selected piece',
      'Multi-jump chain captures keep the same piece selected until no further jump is available',
      'King promotion on reaching the far row, unlocking backward diagonal movement',
      'Distinct hint styling for quiet-move destinations versus capturing-jump destinations',
      'Live captured-piece counters for both colors in the header',
      'Win detection on elimination or on the side to move having no legal moves',
      'Click-to-select, click-to-move interaction — fully touch-friendly, no drag-and-drop',
    ],
    useCases: [
      { icon: 'GAME', title: 'Classic two-player board game collections', desc: 'A complete rules-accurate checkers implementation to sit alongside other board and logic games such as the [Tic-Tac-Toe Game](/ui-snippets/tic-tac-toe-game/) or [Connect Four Game](/ui-snippets/connect-four-game/).' },
      { icon: 'LEARN', title: 'Teaching game-state modeling', desc: 'A clean example of representing a grid-based board as a 2D array, computing legal moves per piece, and enforcing a non-trivial rule (mandatory capture) across the whole board state.' },
      { icon: 'APP', title: 'Turn-based multiplayer prototyping', desc: 'The move-validation and turn-passing logic is a solid starting point for wiring up real two-player-over-network checkers with a small amount of added networking code.' },
      { icon: 'CODE', title: 'Reference for diagonal-movement and jump-capture logic', desc: 'The dirsFor() and movesFor() functions are a reusable pattern for any diagonal-movement board game needing jump-over captures, such as a custom draughts variant.' },
      { icon: 'DESIGN', title: 'Casual games section on a portfolio or product site', desc: 'A recognizable, immediately playable game that demonstrates real interactive JavaScript skill beyond static UI components.' },
    ],
    faqs: [
      { q: 'Are captures mandatory in this implementation?', a: 'Yes. Before rendering each turn, anyCaptureAvailable(color) checks whether any piece of the moving color has a legal jump. If one exists, selecting a piece without a capture available shows a warning and does not allow a quiet move — matching standard checkers rules.' },
      { q: 'How do multi-jump chains work?', a: 'After a capture completes, performMove() checks the landing square for further captures with the same piece. If one exists, the turn does not pass — the same piece stays selected and only its follow-up captures are highlighted, so the player must continue the chain before the turn ends.' },
      { q: 'How does a piece become a king?', a: 'A regular piece is promoted the instant it lands on the opponent\'s back row — row 0 for red, row 7 for black. Once king: true, dirsFor() returns all four diagonal directions instead of only the two forward ones, so kings can move and capture backward.' },
      { q: 'How is the game won?', a: 'Either a color\'s piece count reaches zero (all captured), or the side to move has no legal moves at all — checked by hasAnyMove() — even if pieces remain on the board.' },
      { q: 'Can I add an AI opponent?', a: 'Yes — movesFor() and anyCaptureAvailable() already expose everything a minimax or greedy-capture AI needs. A simple bot could call movesFor() across every AI-colored piece, prefer any available capture (especially multi-jump chains), and otherwise pick a random simple move.' },
      { q: 'Why click-to-select instead of drag-and-drop?', a: 'Click-to-select works identically on mouse and touch without the added complexity of tracking drag offsets over a diagonal grid, while still feeling direct: click a piece, then click one of its highlighted legal destinations.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how mustCapture is recomputed before every render and why that single flag is enough to enforce the mandatory-capture rule across the whole board, plus how the multi-jump chain avoids passing the turn while follow-up captures remain. It's also a strong candidate for extension — ask the assistant to add a simple greedy-capture AI opponent using the existing movesFor() function, add move highlighting that also shows which of the opponent's pieces are currently vulnerable, or add an undo button that replays the move history from scratch.`,
      prompt: `Build a full 8x8 Checkers (draughts) game in plain HTML, CSS, and JavaScript — no libraries, click-to-select interaction only.

Requirements:
- Model the board as a plain 2D array, with pieces placed on the dark squares of the first three rows for one color and the last three rows for the other, red moving toward row 0 and black moving toward row 7 by default.
- Compute legal simple diagonal moves and legal jump captures separately for whichever piece is clicked, based on the piece's color and whether it has been promoted to a king (kings may move and capture in all four diagonal directions; regular pieces only in their forward two).
- Enforce mandatory captures: before allowing a piece to be selected for a quiet move, check whether ANY piece belonging to the current player has an available capture anywhere on the board, and if so, block quiet moves and require a capturing piece to be selected instead, with a clear inline message explaining why.
- Implement multi-jump chains: after a capture lands, check whether that same piece has a further capture available from its new square, and if so, keep it selected and require the chain to continue before the turn passes to the other player.
- Promote a regular piece to a king the instant it reaches the opponent's back row, after which it can move and capture backward as well as forward, with a distinct visual marker (e.g. a star) on kinged pieces.
- Detect the win condition when either color has zero pieces remaining, or when the player to move has no legal moves at all even with pieces still on the board.
- Visually highlight the selected piece and its legal destination squares, distinguishing capturing-jump destinations from quiet-move destinations.
- Include a live piece-count display for both colors and a "New Game" button that resets the full board state.`,
    },
  },
};

export default checkersGame;
