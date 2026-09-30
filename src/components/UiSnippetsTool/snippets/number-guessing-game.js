const numberGuessingGame = {
  id: 'number-guessing-game',
  title: 'Number Guessing Game (1-100)',
  lastmod: '2026-08-09',
  category: 'games',
  html: `<div class="guess-app">
  <div class="guess-header">
    <h2>Guess the Number</h2>
    <p>I'm thinking of a number between 1 and 100</p>
  </div>

  <div class="stat-row">
    <div class="stat"><span class="stat-label">Attempts</span><span class="stat-val" id="attempts-val">0</span></div>
    <div class="stat"><span class="stat-label">Range</span><span class="stat-val" id="range-val">1 - 100</span></div>
  </div>

  <form class="guess-form" id="guess-form">
    <input type="number" id="guess-input" min="1" max="100" placeholder="Enter a number..." autocomplete="off">
    <button type="submit" class="submit-btn" id="submit-btn">Guess</button>
  </form>

  <p class="feedback" id="feedback">Make your first guess!</p>

  <div class="win-panel" id="win-panel">
    <p class="win-title" id="win-title"></p>
    <p class="win-note">Optimal play (always guessing the midpoint of what's left) solves any 1-100 game in at most 7 guesses — that's binary search in action.</p>
    <button class="play-again-btn" id="play-again-btn">Play again</button>
  </div>

  <div class="history-wrap">
    <p class="history-label">Guess history</p>
    <div class="history" id="history"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.guess-app { max-width: 420px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 16px; }

.guess-header { text-align: center; }
.guess-header h2 { font-size: 19px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
.guess-header p { font-size: 13px; color: #64748b; }

.stat-row { display: flex; gap: 10px; }
.stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 7px 16px; min-width: 90px; text-align: center; }
.stat-label { display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.stat-val { display: block; font-size: 16px; font-weight: 800; color: #6366f1; }

.guess-form { display: flex; gap: 8px; width: 100%; }
.guess-form input {
  flex: 1; padding: 11px 14px; font-size: 15px;
  border: 1.5px solid #e2e8f0; border-radius: 10px;
  font-family: inherit; outline: none;
  transition: border-color 0.15s;
}
.guess-form input:focus { border-color: #6366f1; }
.submit-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 10px;
  padding: 11px 20px; font-size: 14px; font-weight: 600;
  font-family: inherit; cursor: pointer; transition: background 0.15s;
}
.submit-btn:hover { background: #4f46e5; }
.submit-btn:disabled { background: #cbd5e1; cursor: default; }

.feedback { font-size: 14px; font-weight: 700; text-align: center; min-height: 20px; display: flex; align-items: center; gap: 6px; color: #475569; }
.feedback.high { color: #dc2626; }
.feedback.low { color: #2563eb; }
.feedback.win { color: #16a34a; }

.win-panel {
  display: none;
  width: 100%;
  background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 14px;
  padding: 18px; text-align: center; flex-direction: column; gap: 10px;
}
.win-panel.show { display: flex; }
.win-title { font-size: 16px; font-weight: 800; color: #15803d; }
.win-note { font-size: 12px; color: #166534; line-height: 1.5; }
.play-again-btn {
  align-self: center;
  background: #16a34a; color: #fff; border: none; border-radius: 10px;
  padding: 9px 20px; font-size: 13px; font-weight: 600;
  font-family: inherit; cursor: pointer; transition: background 0.15s;
}
.play-again-btn:hover { background: #15803d; }

.history-wrap { width: 100%; }
.history-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #94a3b8; margin-bottom: 8px; }
.history { display: flex; flex-wrap: wrap; gap: 6px; min-height: 34px; }
.history-chip {
  display: flex; align-items: center; gap: 4px;
  padding: 5px 10px; border-radius: 20px;
  font-size: 12px; font-weight: 700;
  background: #fff; border: 1px solid #e2e8f0; color: #475569;
}
.history-chip.high { border-color: #fecaca; background: #fef2f2; color: #dc2626; }
.history-chip.low { border-color: #bfdbfe; background: #eff6ff; color: #2563eb; }
.history-chip.win { border-color: #bbf7d0; background: #f0fdf4; color: #16a34a; }`,
  js: `let target = 0;
let attempts = 0;
let low = 1, high = 100;
let gameOver = false;

const form = document.getElementById('guess-form');
const input = document.getElementById('guess-input');
const feedback = document.getElementById('feedback');
const historyEl = document.getElementById('history');
const winPanel = document.getElementById('win-panel');
const winTitle = document.getElementById('win-title');
const submitBtn = document.getElementById('submit-btn');

function newGame() {
  target = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  low = 1;
  high = 100;
  gameOver = false;
  document.getElementById('attempts-val').textContent = '0';
  document.getElementById('range-val').textContent = '1 - 100';
  feedback.textContent = 'Make your first guess!';
  feedback.className = 'feedback';
  historyEl.innerHTML = '';
  winPanel.classList.remove('show');
  input.value = '';
  input.disabled = false;
  submitBtn.disabled = false;
  input.focus();
}

function addHistoryChip(value, type) {
  const chip = document.createElement('span');
  chip.className = 'history-chip ' + type;
  const arrow = type === 'high' ? '&#8595;' : type === 'low' ? '&#8593;' : '&#10003;';
  chip.innerHTML = value + ' ' + arrow;
  historyEl.appendChild(chip);
}

function submitGuess(e) {
  e.preventDefault();
  if (gameOver) return;

  const raw = input.value.trim();
  if (raw === '') return;
  const guess = parseInt(raw, 10);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    feedback.textContent = 'Enter a whole number between 1 and 100';
    feedback.className = 'feedback';
    return;
  }

  attempts++;
  document.getElementById('attempts-val').textContent = attempts;

  if (guess === target) {
    addHistoryChip(guess, 'win');
    feedback.textContent = 'You got it!';
    feedback.className = 'feedback win';
    winTitle.textContent = \`Correct! You found \${target} in \${attempts} attempt\${attempts === 1 ? '' : 's'}.\`;
    winPanel.classList.add('show');
    gameOver = true;
    input.disabled = true;
    submitBtn.disabled = true;
  } else if (guess > target) {
    if (guess < high) high = guess;
    addHistoryChip(guess, 'high');
    feedback.innerHTML = '&#8595; Too high! Try lower.';
    feedback.className = 'feedback high';
    document.getElementById('range-val').textContent = \`\${low} - \${high}\`;
  } else {
    if (guess > low) low = guess;
    addHistoryChip(guess, 'low');
    feedback.innerHTML = '&#8593; Too low! Try higher.';
    feedback.className = 'feedback low';
    document.getElementById('range-val').textContent = \`\${low} - \${high}\`;
  }

  input.value = '';
  input.focus();
}

form.addEventListener('submit', submitGuess);
document.getElementById('play-again-btn').addEventListener('click', newGame);

newGame();`,
  seo: {
    title: 'Number Guessing Game 1-100 — Free JS Snippet',
    description: 'A higher/lower number guessing game with a live guess history, attempt counter, and a binary-search win tip. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Number Guessing Game (1-100) — Higher/Lower Feedback, Guess History & the Binary Search Connection',
      description: `The classic "guess the number between 1 and 100" game is a staple first project for learning conditional logic, but it's also a surprisingly direct, hands-on demonstration of binary search — one of the most important algorithms in computer science. This snippet builds the full game loop with real input validation, a persistent guess history so players can visually trace their own narrowing strategy, and an explicit callout connecting the gameplay to the underlying algorithm once the player wins.

**The core game loop**

On load, \`newGame()\` picks a secret \`target\` with \`Math.floor(Math.random() * 100) + 1\`, which produces a uniformly random integer from 1 to 100 inclusive (the \`+ 1\` shifts \`Math.random()\`'s natural 0-to-0.999... range up by one so 0 is never a possible target and 100 is reachable). Every submitted guess runs through \`submitGuess()\`, which first validates the input — rejecting empty submissions, non-numeric input via \`isNaN()\`, and anything outside the 1-100 range — before comparing the guess to \`target\` and branching into exactly one of three outcomes: a win, "too high," or "too low." Each guess increments a live \`attempts\` counter displayed at the top of the game, so players always know exactly how many tries they've used.

**Visualising the narrowing range**

Beyond the pass/fail feedback, the game tracks a running \`low\`/\`high\` bound: any guess that comes back "too high" tightens \`high\` down to that guess (since the target must be below it), and any "too low" guess raises \`low\` up to that guess. This bound is rendered live as a "Range" stat (e.g. "34 - 67") that visibly shrinks after every guess, making the search space contraction — the entire idea behind binary search — directly visible rather than something the player has to track mentally.

**The guess history as a strategy mirror**

Every guess, right or wrong, is appended as a small coloured chip to a running history list: red chips with a down arrow for "too high," blue chips with an up arrow for "too low," and a green checkmark chip for the final correct guess. Because the chips accumulate in submission order, a player can look back at their own sequence after finishing and immediately see whether they played efficiently — someone who bounced between 1, 100, 2, 99, 3 played essentially randomly, while someone who went 50, 75, 62, 68 was narrowing the interval in half each time, which is precisely optimal play.

**Why binary search guarantees a win in at most 7 guesses**

Binary search always guesses the midpoint of the remaining possible range, which discards roughly half of the remaining candidates with every single guess regardless of whether the result is "too high" or "too low." Starting from 100 possible values, repeatedly halving gives 100 → 50 → 25 → 13 → 7 → 4 → 2 → 1, which takes \`ceil(log2(100))\` = 7 halvings to guarantee narrowing down to exactly one possible value. This is why the win panel explicitly states that optimal play — always guessing the midpoint of what's left, i.e. \`Math.floor((low + high) / 2)\` on each turn — solves any 1-100 instance of this game in at most 7 guesses, no matter how unlucky the target number is. It's a concrete, playable way to feel why binary search is \`O(log n)\` rather than \`O(n)\`: doubling the range to 1-200 only adds one more guess in the worst case (8, since \`ceil(log2(200))\` = 8), not twice as many.

**Input handling details worth noting**

The number \`<input>\` is cleared and refocused after every guess (\`input.value = ''; input.focus();\`) so players can keep typing rapid guesses without touching the mouse, and both the input and submit button are disabled once the game is won to make it unambiguous that the round has ended and "Play again" is the only next action.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Enter a guess',
          text: 'Type a whole number between 1 and 100 into the input and press Enter or click Guess. submitGuess() validates the input, rejecting empty, non-numeric, or out-of-range values with an inline message before comparing it against the hidden target.',
        },
        {
          title: 'Read the higher/lower feedback',
          text: 'Every valid guess shows an immediate directional message — "Too high! Try lower." in red with a down arrow, or "Too low! Try higher." in blue with an up arrow — and the Attempts counter increments by one on every submission, right or wrong.',
        },
        {
          title: 'Watch the range and history narrow',
          text: 'The Range stat updates after every guess to show the current low-high bounds implied by your guesses so far, and each guess is appended as a colour-coded chip to the guess history below the form so you can review your full sequence at a glance.',
        },
        {
          title: 'Win the round',
          text: 'Guessing the exact target number shows a green success message, disables further input, and opens the win panel with your total attempts and a note on optimal binary-search play, generated dynamically from the attempts variable in submitGuess().',
        },
        {
          title: 'Play again',
          text: 'Click "Play again" to call newGame(), which picks a brand new random target, resets attempts to zero, clears the low/high bounds back to 1-100, empties the guess history, hides the win panel, and re-enables the input.',
        },
        {
          title: 'Export and add to your project',
          text: 'Click HTML to download a standalone file, or JSX for a React component. In React, move target, attempts, low, high, gameOver, and the history array into useState, and derive the range display and history chips from that state rather than direct DOM manipulation.',
        },
      ],
    },
    features: [
      'Math.floor(Math.random() * 100) + 1 generates a uniformly random integer target from 1 to 100 inclusive',
      'Full input validation: rejects empty, non-numeric (isNaN), and out-of-1-100-range guesses before scoring',
      'Live low/high range tracking narrows visibly after every guess, mirroring the binary search search space',
      'Colour-coded guess history chips (red/high, blue/low, green/win) preserve the full guess sequence for review',
      'Attempts counter increments on every valid submission and is reported in the final win message',
      'Win panel explicitly explains the O(log n) binary-search strategy and the guaranteed 7-guess worst case',
      'Input auto-clears and refocuses after each guess for fast, mouse-free repeated guessing',
      'Input and submit button disable on win to make the end-of-round state unambiguous until Play again',
    ],
    useCases: [
      {
        icon: 'LEARN',
        title: 'Teaching binary search as a playable, intuitive exercise',
        desc: 'Rather than presenting binary search as an abstract array-searching algorithm, this game lets a learner feel the halving strategy directly: guess the midpoint, get instant higher/lower feedback, and watch the range collapse from 100 possibilities to 1 in at most 7 tries. The visible Range stat and colour-coded history make the connection between the game and the O(log n) algorithm concrete rather than theoretical.',
      },
      {
        icon: 'FORM',
        title: 'Practicing robust numeric form input validation',
        desc: 'submitGuess() is a clean, small reference for validating a number input against multiple failure modes — empty string, non-numeric text, and out-of-range values — before acting on it, a pattern directly reusable in any form that accepts bounded numeric input, like age, quantity, or rating fields.',
      },
      {
        icon: 'APP',
        title: 'A light engagement loop for a loading screen or empty state',
        desc: 'Embed this as a small distraction while a longer async operation completes elsewhere on the page. The self-contained state (target, attempts, history) and Play again flow make it easy to replay multiple rounds without ever needing a page reload.',
      },
      {
        icon: 'CODE',
        title: 'Boilerplate for building an actual computer-guesses-your-number variant',
        desc: 'Flip the roles: keep the same low/high tracking logic but have the human think of a number and the computer guess Math.floor((low + high) / 2) each turn based on the human\'s higher/lower answers, demonstrating the binary search algorithm from the other side and typically finishing in 7 guesses or fewer live in front of the user.',
      },
      {
        icon: 'DESIGN',
        title: 'A simple onboarding or tutorial interaction for a coding-education product',
        desc: 'Because the code is short, fully commented in structure, and demonstrates validation, state tracking, and a real algorithmic payoff, it works well as a first interactive exercise in a JavaScript course or bootcamp curriculum, paired with a challenge to modify the range or add a hint system, similar in spirit to the multiple-choice format of the [Guess the Hex Color Code Game](/ui-snippets/hex-color-guess-game).',
      },
      { icon: 'CODE', title: 'Related: Robot Loop Programmer Game', desc: 'See the [Robot Loop Programmer Game](/ui-snippets/robot-loop-programmer-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why is it mathematically guaranteed that optimal play never needs more than 7 guesses?',
        a: 'With 100 possible target values, always guessing the exact midpoint of the remaining range eliminates roughly half of the remaining candidates on every single guess, regardless of whether the feedback is "too high" or "too low." The number of halvings needed to reduce 100 possibilities down to 1 is ceil(log2(100)), which equals 7 — so no matter how unlucky the target is, a player following the midpoint strategy perfectly will always find it in 7 guesses or fewer, and will often find it sooner.',
      },
      {
        q: 'How does the game validate guesses before scoring them?',
        a: 'submitGuess() first trims the raw input and returns early if it is an empty string, then runs parseInt(raw, 10) and checks isNaN(guess) to catch non-numeric text, and finally checks guess < 1 || guess > 100 to reject out-of-bounds numbers — showing an inline message and not incrementing the attempts counter for any of these invalid cases, so only genuine 1-100 integer guesses count toward your attempt total.',
      },
      {
        q: 'What do the low and high values actually track?',
        a: 'low and high represent the tightest known bounds on where the target must be, based purely on the feedback received so far: any "too high" guess becomes the new high (since the target must be strictly below it), and any "too low" guess becomes the new low (since the target must be strictly above it). They start at 1 and 100 respectively and only ever tighten, never loosen, which is exactly the invariant that makes binary search correct.',
      },
      {
        q: 'Does the guess history remember guesses across multiple rounds?',
        a: 'No — newGame() clears historyEl.innerHTML at the start of every round, so the history list always reflects only the current round\'s guesses. This is intentional: comparing your current round\'s strategy against a clean slate is more useful for self-assessment than an ever-growing list mixing guesses from unrelated rounds with different targets.',
      },
      {
        q: 'Can I change the range from 1-100 to something else, like 1-1000?',
        a: 'Yes — update Math.floor(Math.random() * 100) + 1 to Math.floor(Math.random() * 1000) + 1 in newGame(), change the initial high value from 100 to 1000, update the input\'s max attribute and the range-bound validation check in submitGuess(), and adjust the displayed "1 - 100" text. The worst-case optimal guess count becomes ceil(log2(1000)) = 10, so you may also want to update the win-note copy to reflect the new number.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the low/high bound tracking in submitGuess() mirrors the binary search algorithm, and why ceil(log2(100)) gives the guaranteed 7-guess worst case shown in the win panel. It's also a strong base for extension — ask the assistant to add a "hint" button that reveals whether the optimal next guess (the true midpoint of the current low/high range) would beat your next guess, a difficulty selector that changes the range to 1-1000 or 1-10, or a small results chart comparing your attempts this round against the theoretical optimal. You could also ask it to implement the reverse game mode where the computer guesses a number you're thinking of using the same binary-search midpoint strategy.`,
      prompt: `Build a number guessing game in plain HTML, CSS, and JavaScript where the computer picks a random target between 1 and 100 and the player tries to find it through repeated guesses.

Requirements:
- On game start (and on replay), silently pick a new random integer target between 1 and 100 inclusive.
- Provide a number input and submit control where the player enters a guess; validate that the input is a whole number between 1 and 100 before scoring it, showing an inline message for invalid input without counting it as an attempt.
- After each valid guess, give immediate directional feedback (a clear "too high" or "too low" message, visually distinguished, for example by color and a directional icon) and increment a visible attempts counter.
- Maintain a running low/high bound implied by the guesses so far and display it, so the player can see the possible range narrowing after each guess.
- Keep a visible, ordered history of every guess made this round, each one labeled with whether it was too high, too low, or the final correct guess.
- On a correct guess, show a clear win message including the total number of attempts taken, explain in the UI that always guessing the midpoint of the remaining range (binary search) guarantees solving any 1-100 instance in at most 7 guesses, and disable further guessing until the player chooses to play again.
- Provide a "Play again" control that fully resets all game state (new target, zero attempts, cleared history, reset bounds) without requiring a page reload.`,
    },
  },
};

export default numberGuessingGame;
