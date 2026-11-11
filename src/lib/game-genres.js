/* Game types for the Games category gallery (/ui-snippets/games/): every game snippet gets ONE type, shown as the label
   on its card and used by the filter chips above the grid (?type=<id> in the URL).
   Adding a game: add its snippet id to one list below. A game without a type still shows under "All" with a plain
   "games" label. Chips appear in the order of GAME_GENRES. */

export const GAME_GENRES = [
  { id: 'arcade', label: 'Arcade', ids: [
    'snake-game', 'pong-game', 'breakout-brick-game', 'flap-dodge-game', 'dodge-the-blocks-game', 'maze-runner-game',
    'space-blaster-game', 'pixel-platformer-game', 'tank-arena-game', 'lane-runner-game', 'asteroids-game',
    'sky-hopper-game', 'frog-crossing-game', 'cave-flyer-game', 'dot-muncher-game', 'whack-a-mole-game',
  ] },
  { id: 'puzzle', label: 'Puzzle', ids: [
    'switchyard-train-puzzle-game', 'sliding-puzzle-game', 'minesweeper-game', 'tile-merge-2048-game', 'color-sort-puzzle',
    'mini-sudoku-game', 'lights-out-puzzle-game', 'tower-of-hanoi-game', 'sokoban-puzzle-game', 'nonogram-puzzle-game',
    'sorting-swap-puzzle-game', 'mastermind-code-breaker-game',
  ] },
  { id: 'coding', label: 'Coding', ids: [
    'css-selector-challenge-game', 'flexbox-align-game', 'regex-match-game', 'binary-bit-flip-game', 'code-output-quiz-game',
    'bug-hunt-game', 'robot-loop-programmer-game', 'terminal-command-game', 'logic-gate-puzzle-game',
  ] },
  { id: 'board-card', label: 'Board & Card', ids: [
    'tic-tac-toe-game', 'connect-four-game', 'checkers-game', 'dots-and-boxes-game', 'battleship-game',
    'blackjack-card-game', 'rock-paper-scissors-game',
  ] },
  { id: 'skill', label: 'Skill & Reflex', ids: [
    'typing-speed-test', 'reaction-time-tester', 'click-speed-test', 'precision-aim-trainer-game', 'rhythm-tap-game',
    'color-match-reflex-game', 'tower-stack-timing-game',
  ] },
  { id: 'brain', label: 'Brain & Memory', ids: [
    'memory-match-game', 'simon-sequence-game', 'number-sequence-memory-game', 'quick-math-game', 'number-guessing-game',
    'hex-color-guess-game', 'quiz-card',
  ] },
  { id: 'word', label: 'Word', ids: [
    'word-guess-game', 'hangman-word-game', 'word-unscramble-game', 'word-search-puzzle', 'word-ladder-game',
  ] },
  { id: 'physics', label: 'Physics', ids: [
    'matter-js-plinko-board', 'matter-js-slingshot-tower-knockdown', 'matter-js-hill-climb-car', 'matter-js-stacking-tower-game',
  ] },
  { id: 'luck', label: 'Luck & Fun', ids: [
    'spin-wheel', 'dice-roller', 'coin-flip', 'bubble-wrap-popper',
  ] },
];

const BY_SNIPPET = new Map();
GAME_GENRES.forEach(g => g.ids.forEach(id => BY_SNIPPET.set(id, g)));

/** The type of a game snippet ({ id, label }), or null when it has none */
export const genreOf = snippetId => BY_SNIPPET.get(snippetId) || null;
export const isGenreId = id => GAME_GENRES.some(g => g.id === id);
