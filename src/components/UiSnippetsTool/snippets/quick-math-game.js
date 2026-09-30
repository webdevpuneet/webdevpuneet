const quickMathGame = {
  id: 'quick-math-game',
  title: 'Quick Math Arithmetic Game',
  lastmod: '2026-08-09',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">⚡</span>
      <h2>Quick Math</h2>
    </div>
    <div class="best-badge">Best: <span id="best-score">0</span></div>
  </div>

  <div class="timer-wrap">
    <div class="timer-bar"><div class="timer-fill" id="timer-fill"></div></div>
    <span class="timer-text" id="timer-text">60s</span>
  </div>

  <div class="stat-row">
    <div class="stat-box"><span class="stat-label">Score</span><span class="stat-value" id="stat-score">0</span></div>
    <div class="stat-box"><span class="stat-label">Correct</span><span class="stat-value" id="stat-correct">0</span></div>
    <div class="stat-box"><span class="stat-label">Wrong</span><span class="stat-value" id="stat-wrong">0</span></div>
  </div>

  <div class="play-area" id="play-area">
    <div class="problem" id="problem">--</div>
    <form class="answer-form" id="answer-form" autocomplete="off">
      <input type="number" id="answer-input" class="answer-input" placeholder="?" inputmode="numeric" />
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <p class="hint-text">Press Enter or click Submit — a new problem appears instantly</p>
  </div>

  <div class="results-area hidden" id="results-area">
    <h3 class="results-title">Time's up!</h3>
    <div class="results-grid">
      <div class="result-item"><span class="result-value" id="res-answered">0</span><span class="result-label">Answered</span></div>
      <div class="result-item"><span class="result-value" id="res-correct">0</span><span class="result-label">Correct</span></div>
      <div class="result-item"><span class="result-value" id="res-accuracy">0%</span><span class="result-label">Accuracy</span></div>
    </div>
    <p class="new-best hidden" id="new-best-msg">🏆 New best score!</p>
    <button class="btn btn-primary btn-block" id="btn-play-again">Play again</button>
  </div>

  <button class="btn btn-outline btn-block hidden" id="btn-start">Start game</button>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.game-card { width: 100%; max-width: 420px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.08); padding: 24px; }

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }
.best-badge { font-size: 12px; font-weight: 700; color: #6366f1; background: #eef2ff; padding: 5px 10px; border-radius: 20px; }

.timer-wrap { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.timer-bar { flex: 1; height: 8px; background: #f1f5f9; border-radius: 6px; overflow: hidden; }
.timer-fill { height: 100%; width: 100%; background: linear-gradient(90deg, #6366f1, #818cf8); border-radius: 6px; transition: width 1s linear, background 0.3s; }
.timer-fill.low { background: linear-gradient(90deg, #ef4444, #f87171); }
.timer-text { font-size: 13px; font-weight: 700; color: #475569; min-width: 34px; text-align: right; }

.stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px; }
.stat-box { background: #f8fafc; border: 1px solid #eef2f7; border-radius: 10px; padding: 10px; text-align: center; }
.stat-label { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 4px; }
.stat-value { display: block; font-size: 18px; font-weight: 800; color: #1e293b; }

.play-area { text-align: center; }
.play-area.flash-correct .problem { color: #16a34a; }
.play-area.flash-wrong .problem { animation: shake 0.35s; color: #ef4444; }
@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-8px); }
  40%, 60% { transform: translateX(8px); }
}

.problem { font-size: 34px; font-weight: 800; color: #1e293b; margin-bottom: 16px; transition: color 0.15s; letter-spacing: 1px; }

.answer-form { display: flex; gap: 8px; margin-bottom: 10px; }
.answer-input { flex: 1; padding: 12px 14px; font-size: 18px; text-align: center; font-weight: 700; border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: inherit; outline: none; transition: border-color 0.15s; -moz-appearance: textfield; }
.answer-input:focus { border-color: #6366f1; }

.hint-text { font-size: 11px; color: #94a3b8; }

.btn { padding: 11px 16px; font-size: 14px; font-weight: 700; border-radius: 9px; cursor: pointer; font-family: inherit; transition: all 0.15s; border: none; }
.btn-primary { background: #6366f1; color: #fff; }
.btn-primary:hover { background: #4f46e5; }
.btn-outline { background: #fff; color: #475569; border: 1.5px solid #e2e8f0; }
.btn-outline:hover { border-color: #6366f1; color: #6366f1; }
.btn-block { width: 100%; }

.results-area { text-align: center; }
.results-title { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 16px; }
.results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
.result-item { background: #f8fafc; border: 1px solid #eef2f7; border-radius: 10px; padding: 14px 8px; }
.result-value { display: block; font-size: 22px; font-weight: 800; color: #6366f1; margin-bottom: 2px; }
.result-label { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #94a3b8; }
.new-best { font-size: 13px; font-weight: 700; color: #d97706; margin-bottom: 14px; }

.hidden { display: none !important; }`,

  js: `const GAME_SECONDS = 60;
const BEST_KEY = 'quick-math-best-score';

let timeLeft = GAME_SECONDS;
let timerInterval = null;
let currentAnswer = 0;
let answered = 0;
let correct = 0;
let score = 0;
let running = false;

const problemEl = document.getElementById('problem');
const answerForm = document.getElementById('answer-form');
const answerInput = document.getElementById('answer-input');
const playArea = document.getElementById('play-area');
const resultsArea = document.getElementById('results-area');
const timerFill = document.getElementById('timer-fill');
const timerText = document.getElementById('timer-text');
const statScore = document.getElementById('stat-score');
const statCorrect = document.getElementById('stat-correct');
const statWrong = document.getElementById('stat-wrong');
const bestScoreEl = document.getElementById('best-score');
const btnPlayAgain = document.getElementById('btn-play-again');

function getBest() {
  try {
    return parseInt(localStorage.getItem(BEST_KEY), 10) || 0;
  } catch (e) {
    return 0;
  }
}

function setBest(value) {
  try {
    localStorage.setItem(BEST_KEY, String(value));
  } catch (e) { /* ignore */ }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const ops = ['+', '-', '×'];
  const op = ops[randInt(0, 2)];
  let a, b;
  if (op === '×') {
    a = randInt(1, 12);
    b = randInt(1, 12);
    currentAnswer = a * b;
  } else if (op === '+') {
    a = randInt(1, 50);
    b = randInt(1, 50);
    currentAnswer = a + b;
  } else {
    a = randInt(1, 50);
    b = randInt(1, a);
    currentAnswer = a - b;
  }
  problemEl.textContent = a + ' ' + op + ' ' + b + ' = ?';
  answerInput.value = '';
}

function flash(className) {
  playArea.classList.remove('flash-correct', 'flash-wrong');
  void playArea.offsetWidth;
  playArea.classList.add(className);
}

function handleSubmit(e) {
  e.preventDefault();
  if (!running) return;
  const val = answerInput.value.trim();
  if (val === '') return;
  answered++;
  if (parseInt(val, 10) === currentAnswer) {
    correct++;
    score++;
    flash('flash-correct');
  } else {
    flash('flash-wrong');
  }
  statScore.textContent = score;
  statCorrect.textContent = correct;
  statWrong.textContent = answered - correct;
  generateProblem();
  answerInput.focus();
}

function tick() {
  timeLeft--;
  timerText.textContent = timeLeft + 's';
  const pct = Math.max((timeLeft / GAME_SECONDS) * 100, 0);
  timerFill.style.width = pct + '%';
  timerFill.classList.toggle('low', timeLeft <= 10);
  if (timeLeft <= 0) endGame();
}

function startGame() {
  running = true;
  timeLeft = GAME_SECONDS;
  answered = 0;
  correct = 0;
  score = 0;
  statScore.textContent = '0';
  statCorrect.textContent = '0';
  statWrong.textContent = '0';
  timerText.textContent = GAME_SECONDS + 's';
  timerFill.style.width = '100%';
  timerFill.classList.remove('low');
  resultsArea.classList.add('hidden');
  playArea.classList.remove('hidden');
  generateProblem();
  answerInput.focus();
  clearInterval(timerInterval);
  timerInterval = setInterval(tick, 1000);
}

function endGame() {
  running = false;
  clearInterval(timerInterval);
  playArea.classList.add('hidden');
  resultsArea.classList.remove('hidden');
  document.getElementById('res-answered').textContent = answered;
  document.getElementById('res-correct').textContent = correct;
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  document.getElementById('res-accuracy').textContent = accuracy + '%';

  const best = getBest();
  const newBestMsg = document.getElementById('new-best-msg');
  if (correct > best) {
    setBest(correct);
    bestScoreEl.textContent = correct;
    newBestMsg.classList.remove('hidden');
  } else {
    newBestMsg.classList.add('hidden');
  }
}

answerForm.addEventListener('submit', handleSubmit);
btnPlayAgain.addEventListener('click', startGame);

bestScoreEl.textContent = getBest();
startGame();`,

  seo: {
    title: 'Quick Math Arithmetic Game — Free HTML CSS JS Snippet',
    description: 'A 60-second rapid-fire arithmetic quiz with a live timer, instant feedback and localStorage best score. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Quick Math Arithmetic Game — Timed Arithmetic Quiz with Live Feedback and localStorage Best Score',
      description: `Speed-arithmetic games like this one are a staple of mental maths practice apps because they combine two things that make casual games sticky: a hard time constraint and instant right/wrong feedback. This snippet builds a complete 60-second rapid-fire arithmetic quiz in vanilla JavaScript — random addition, subtraction, and multiplication problems, a live countdown, immediate visual feedback on every submission, and a persisted best score using \`localStorage\` so returning players have something to beat.

**Problem generation and difficulty-appropriate ranges**

\`generateProblem()\` randomly selects one of three operators — addition, subtraction, or multiplication — and generates operands within ranges chosen specifically to keep each problem type roughly equally difficult under time pressure. Addition and subtraction use operands from 1 to 50, which keeps sums in a comfortably mental-maths range without ever needing carrying-heavy three-digit arithmetic. Subtraction specifically generates \`b\` as \`randInt(1, a)\`, which guarantees \`a - b\` is always non-negative — the game deliberately avoids negative-number answers to keep the input format simple (a plain numeric field, no minus-sign parsing ambiguity). Multiplication uses the classic 1-to-12 times-table range, matching how most people actually memorise multiplication facts, which keeps multiplication problems fast to solve rather than requiring long multiplication.

**The countdown timer and its visual language**

A \`setInterval\` running once per second decrements \`timeLeft\` and updates both a numeric \`60s\`-style label and a horizontal progress bar whose width is set to \`(timeLeft / GAME_SECONDS) * 100\` percent. In the final ten seconds, a \`.low\` class swaps the bar's gradient from the indigo accent to a red gradient, giving players a clear, low-cost visual cue that time is running out without needing to read the numeric label. When \`timeLeft\` reaches zero, \`endGame()\` fires immediately, stops the interval, and swaps the play area for a results summary — there is no grace period, matching how real speed-round games behave.

**Instant feedback without breaking flow**

Every submission — whether via the Submit button or the Enter key on the numeric input — is handled by a single \`handleSubmit()\` function that parses the input, compares it to \`currentAnswer\`, and immediately calls \`generateProblem()\` regardless of whether the answer was right or wrong, so play never pauses to wait for acknowledgement. Correct answers trigger a green colour flash on the problem text via a \`.flash-correct\` class; incorrect answers trigger a red CSS \`shake\` keyframe animation via \`.flash-wrong\`. Both classes are removed and a layout reflow is forced with \`void playArea.offsetWidth\` before re-adding the class, which is the standard trick for restarting a CSS animation that was already applied on the previous problem — without it, two wrong answers in a row would only animate once.

**Scoring, accuracy, and the results screen**

The game tracks three separate counters: \`answered\` (total problems submitted), \`correct\` (correct answers), and a derived \`score\` that in this implementation equals \`correct\` — each correct answer is worth one point, keeping the scoring model transparent and easy to read at a glance during play. When the timer expires, the results screen computes accuracy as \`Math.round((correct / answered) * 100)\` and displays answered count, correct count, and accuracy percentage side by side.

**Persisting a best score with localStorage**

\`getBest()\` and \`setBest()\` wrap \`localStorage.getItem\`/\`setItem\` in try/catch blocks (some browser contexts, like sandboxed iframes with storage disabled, throw on access) around a single numeric key, \`quick-math-best-score\`. At the end of each round, if the current \`correct\` count exceeds the stored best, the game updates \`localStorage\`, refreshes the header badge, and shows a "New best score!" message — the score persists across page reloads and browser sessions since \`localStorage\` survives until explicitly cleared, unlike \`sessionStorage\` or in-memory state.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Answer problems as fast as you can',
          text: 'A random addition, subtraction, or multiplication problem appears in generateProblem(). Type your answer into the numeric input and press Enter or click Submit — handleSubmit() checks it immediately and generates the next problem with zero delay, so keep typing without pausing.',
        },
        {
          title: 'Watch the live countdown bar',
          text: 'The horizontal timer-fill bar and the numeric label both count down from 60 seconds via a setInterval tick() call. In the final 10 seconds the bar switches to a red gradient using the .low class as an urgency cue.',
        },
        {
          title: 'Read the instant right/wrong feedback',
          text: 'A correct answer flashes the problem text green via the flash-correct class; an incorrect answer triggers a red shake animation via flash-wrong. Both are re-triggered on every submission using a forced reflow (void playArea.offsetWidth) so consecutive same-outcome answers still animate.',
        },
        {
          title: 'Review your results when time runs out',
          text: 'When timeLeft hits zero, endGame() stops the timer and shows problems answered, correct count, and accuracy percentage (Math.round((correct / answered) * 100)). Click "Play again" to call startGame() and reset the timer, score, and problem generator.',
        },
        {
          title: 'Beat your persisted best score',
          text: 'The Best badge in the header reads from localStorage via getBest(). If your correct count this round beats the stored best, setBest() updates localStorage and a "New best score!" message appears on the results screen — this persists across page reloads.',
        },
        {
          title: 'Adjust difficulty and duration',
          text: 'Change GAME_SECONDS at the top of the JS panel to make rounds longer or shorter. Adjust the randInt() ranges inside generateProblem() — e.g. raise addition/subtraction to randInt(1, 100) or the multiplication range to randInt(1, 20) — to tune difficulty for different age groups or skill levels.',
        },
      ],
    },
    features: [
      'Three operators (+, −, ×) with difficulty-appropriate ranges: 1-50 for addition/subtraction, 1-12 times tables for multiplication',
      'Non-negative subtraction guaranteed by generating the subtrahend as randInt(1, a), avoiding negative-number input parsing',
      'Live countdown timer: setInterval-driven progress bar and numeric label, switching to a red .low gradient in the final 10 seconds',
      'Zero-delay feedback loop: handleSubmit() checks the answer and calls generateProblem() immediately regardless of correctness',
      'Re-triggerable CSS feedback: flash-correct/flash-wrong classes reset via forced reflow (void offsetWidth) for consecutive animations',
      'Enter-key and button submission both handled by a single form submit listener for fast, keyboard-only play',
      'Persisted best score via localStorage with try/catch guards for storage-restricted environments',
      'Results summary computing live accuracy percentage: Math.round((correct / answered) * 100)',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'Mental maths practice tool for students and classrooms',
        desc: 'Timed arithmetic drills are a well-established method for building automaticity in basic maths facts. Embed this in an education site or classroom activity page as a warm-up exercise — the 60-second format is short enough to run at the start of a lesson, and the persisted best score gives students a personal target to beat across sessions without needing a login system.',
      },
      {
        icon: 'APP',
        title: 'Waiting-room or loading-screen engagement game',
        desc: 'Drop this into an app splash screen, queue page, or "your download is preparing" state to give users something genuinely fun to do while they wait, rather than a static spinner. Because it is fully self-contained with no network calls, it works even if the underlying page is still loading other resources.',
      },
      {
        icon: 'FLOW',
        title: 'Brain-training or cognitive-speed daily challenge feature',
        desc: 'Brain-training apps commonly include a reaction-speed or processing-speed mini-game alongside memory and logic puzzles. This snippet\'s combination of a hard time limit, instant feedback, and a persisted personal best fits that pattern directly, and can sit alongside puzzle-style content like the [Word Unscramble Puzzle Game](/ui-snippets/word-unscramble-game) in a mini-games hub.',
      },
      {
        icon: 'DESIGN',
        title: 'Teaching real-time countdown UI and animated feedback states',
        desc: 'The timer bar\'s percentage-driven width and colour-swap-at-threshold pattern is directly reusable for any countdown UI — session expiry warnings, form auto-save timers, or checkout time limits. Swap the accent colour #6366f1 for your brand colour and the urgency-red #ef4444 stays as a universally understood warning colour.',
      },
      {
        icon: 'LEARN',
        title: 'Learn setInterval timer management and localStorage persistence patterns',
        desc: 'This snippet demonstrates correctly starting and clearing a setInterval (clearInterval is called both when a new game starts and when the timer expires, preventing duplicate intervals from stacking up on repeated Play Again clicks) plus a defensive localStorage read/write pattern wrapped in try/catch — both are common sources of subtle bugs in real applications.',
      },
      {
        icon: 'CODE',
        title: 'A/B testing different difficulty curves for gamified onboarding',
        desc: 'Product teams building gamified onboarding flows can use a snippet like this as a base to test how different problem-difficulty ranges and round lengths affect completion rate and perceived difficulty. Because the number ranges and GAME_SECONDS constant are isolated at the top of the JS, they are trivial to parameterise for an experiment.',
      },
      { icon: 'CODE', title: 'Related: Sky Hopper Game', desc: 'See the [Sky Hopper Game](/ui-snippets/sky-hopper-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why does subtraction never produce a negative answer?',
        a: 'The subtrahend b is generated as randInt(1, a) — a random integer between 1 and the already-chosen minuend a — which guarantees a - b is always zero or positive. This is a deliberate design choice to keep the answer input a plain non-negative numeric field; supporting negative answers would require either a signed-number keypad affordance or extra input parsing for a leading minus sign.',
      },
      {
        q: 'How do I add a division operator?',
        a: 'Add \'÷\' to the ops array, and inside the operator branch generate the answer first and derive the operands from it to guarantee a whole-number result: const answer = randInt(1, 12); const b = randInt(1, 12); const a = answer * b; currentAnswer = answer; then display a + \' ÷ \' + b + \' = ?\'. Generating from the answer outward avoids fractional results, which the numeric-only input cannot represent.',
      },
      {
        q: 'Does the best score reset if I clear my browser data?',
        a: 'Yes. The best score is stored under the localStorage key quick-math-best-score, which is scoped to the browser and origin — clearing site data, using a different browser, or playing in a private/incognito window all start best-score tracking fresh. To sync a best score across devices you would need to send it to a backend and associate it with a user account.',
      },
      {
        q: 'Can I change the round length from 60 seconds?',
        a: 'Yes — change the GAME_SECONDS constant at the top of the JS panel to any value in seconds, for example 30 for a faster round or 120 for an extended session. The timer bar, numeric label, and low-time red-gradient threshold (currently the final 10 seconds) all derive from GAME_SECONDS automatically, so no other code needs to change.',
      },
      {
        q: 'Why does the score sometimes feel out of sync with the correct counter?',
        a: 'In this implementation score and correct always move together — every correct answer adds exactly one to both. They are tracked as separate variables so you can extend the scoring model independently later, for example weighting multiplication problems higher than addition, or adding a speed bonus for very fast consecutive correct answers, without having to change how the correct-answer accuracy statistic is calculated.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through how generateProblem(), the setInterval-driven tick(), and the localStorage best-score functions fit together across a full 60-second round. It's a strong candidate for extension — ask the assistant to add a division operator with whole-number-safe generation, introduce difficulty tiers (easy/medium/hard) that change the operand ranges, or add a combo/streak multiplier that rewards several correct answers in a row with bonus points. You could also ask it to review the setInterval cleanup logic for edge cases, such as what happens if a user clicks Play Again rapidly, or to help port the timer and feedback-flash logic into a React component using useEffect and useState instead of direct DOM manipulation. Use it as a jumping-off point for a real conversation about the tradeoffs in this implementation, not as a black box to copy unmodified.`,
      prompt: `Build a 60-second rapid-fire arithmetic quiz game in plain HTML, CSS, and JavaScript with a live countdown timer and a persisted best score — no frameworks or libraries.

Requirements:
- Randomly generate addition, subtraction, or multiplication problems with difficulty-appropriate operand ranges (e.g. 1-50 for addition/subtraction, 1-12 for multiplication), ensuring subtraction never produces a negative answer.
- A numeric input for the answer, submittable via both the Enter key and a Submit button, that checks correctness immediately on submit and generates the next problem instantly with no pause, regardless of whether the answer was right or wrong.
- Clear, re-triggerable visual feedback for each submission: a distinct success state (e.g. a green flash) for correct answers and a distinct error state (e.g. a shake animation) for incorrect ones, both of which must visibly restart even when the same outcome happens on consecutive problems.
- A visible countdown timer starting at 60 seconds, shown as both a numeric label and a progress bar that visually communicates urgency as time runs low (e.g. changing color in the final seconds).
- When the timer reaches zero, end the round immediately, disable further answer submission, and show a results summary with total problems answered, number correct, and accuracy percentage, plus a "Play again" button that fully resets the timer and all counters.
- Persist the best score (most correct answers achieved in a single round) using localStorage, wrapped defensively in case storage access throws, and display it in the UI at all times, updating it and showing a "new best" indicator whenever the current round beats the stored value.`,
    },
  },
};

export default quickMathGame;
