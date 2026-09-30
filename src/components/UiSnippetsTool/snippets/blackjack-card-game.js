const blackjackCardGame = {
  id: 'blackjack-card-game',
  title: 'Blackjack Card Game vs Dealer',
  lastmod: '2026-08-09',
  category: 'games',
  html: `<div class="bj-wrap">
  <div class="bj-tally">
    <div class="bj-tally-item"><span class="bj-tally-label">Wins</span><span class="bj-tally-value" id="tally-win">0</span></div>
    <div class="bj-tally-item"><span class="bj-tally-label">Losses</span><span class="bj-tally-value" id="tally-loss">0</span></div>
    <div class="bj-tally-item"><span class="bj-tally-label">Pushes</span><span class="bj-tally-value" id="tally-push">0</span></div>
  </div>

  <div class="bj-table">
    <div class="bj-hand-area">
      <div class="bj-hand-label">Dealer <span class="bj-hand-total" id="dealer-total"></span></div>
      <div class="bj-cards" id="dealer-cards"></div>
    </div>

    <p class="bj-message" id="bj-message">Press Deal to start a round</p>

    <div class="bj-hand-area">
      <div class="bj-hand-label">You <span class="bj-hand-total" id="player-total"></span></div>
      <div class="bj-cards" id="player-cards"></div>
    </div>
  </div>

  <div class="bj-actions">
    <button class="bj-btn bj-btn-primary" id="deal-btn">Deal</button>
    <button class="bj-btn" id="hit-btn" disabled>Hit</button>
    <button class="bj-btn" id="stand-btn" disabled>Stand</button>
    <button class="bj-btn bj-btn-outline" id="new-round-btn" style="display:none;">New Round</button>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0b3d24; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.bj-wrap { width: 420px; max-width: 100%; display: flex; flex-direction: column; gap: 16px; }

.bj-tally { display: flex; justify-content: center; gap: 10px; }
.bj-tally-item {
  background: rgba(255,255,255,0.08); border-radius: 8px; padding: 6px 16px;
  display: flex; flex-direction: column; align-items: center; min-width: 64px;
}
.bj-tally-label { font-size: 10px; font-weight: 700; color: #86efac; text-transform: uppercase; letter-spacing: 0.5px; }
.bj-tally-value { font-size: 18px; font-weight: 800; color: #fff; }

.bj-table {
  background: #0f5132; border: 3px solid #14532d; border-radius: 16px;
  padding: 20px; display: flex; flex-direction: column; gap: 18px;
  min-height: 280px; justify-content: space-between;
  box-shadow: inset 0 0 40px rgba(0,0,0,0.25);
}

.bj-hand-area { display: flex; flex-direction: column; gap: 8px; align-items: center; }
.bj-hand-label { font-size: 12px; font-weight: 700; color: #d1fae5; display: flex; align-items: center; gap: 6px; }
.bj-hand-total { background: rgba(255,255,255,0.15); border-radius: 10px; padding: 2px 8px; font-size: 11px; }

.bj-cards { display: flex; gap: 8px; min-height: 84px; flex-wrap: wrap; justify-content: center; }

.bj-card {
  width: 56px; height: 78px; border-radius: 8px; background: #fff;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  font-weight: 800; font-size: 16px; box-shadow: 0 3px 8px rgba(0,0,0,0.3);
  animation: bj-deal 0.25s ease;
}
.bj-card.red { color: #dc2626; }
.bj-card.black { color: #1e293b; }
.bj-card .bj-suit { font-size: 20px; }
.bj-card.face-down {
  background: repeating-linear-gradient(45deg, #6366f1, #6366f1 6px, #4f46e5 6px, #4f46e5 12px);
}
@keyframes bj-deal { from { transform: translateY(-16px) scale(0.85); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }

.bj-message { text-align: center; font-size: 13px; font-weight: 700; color: #fef08a; min-height: 18px; }

.bj-actions { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
.bj-btn {
  background: #334155; color: #fff; border: none; border-radius: 8px;
  padding: 10px 20px; font-size: 13px; font-weight: 700; cursor: pointer;
  font-family: inherit; transition: background 0.15s, opacity 0.15s, transform 0.1s;
}
.bj-btn:hover:not(:disabled) { background: #475569; }
.bj-btn:active:not(:disabled) { transform: scale(0.96); }
.bj-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.bj-btn-primary { background: #6366f1; }
.bj-btn-primary:hover:not(:disabled) { background: #4f46e5; }
.bj-btn-outline { background: transparent; border: 1.5px solid #86efac; color: #86efac; }
.bj-btn-outline:hover { background: rgba(134,239,172,0.1); }`,

  js: `const SUITS = [
  { symbol: '♠', color: 'black' },
  { symbol: '♥', color: 'red' },
  { symbol: '♦', color: 'red' },
  { symbol: '♣', color: 'black' },
];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let deck = [];
let playerHand = [];
let dealerHand = [];
let roundActive = false;
let dealerHoleHidden = true;
let tally = { win: 0, loss: 0, push: 0 };

const dealerCardsEl = document.getElementById('dealer-cards');
const playerCardsEl = document.getElementById('player-cards');
const dealerTotalEl = document.getElementById('dealer-total');
const playerTotalEl = document.getElementById('player-total');
const messageEl = document.getElementById('bj-message');
const dealBtn = document.getElementById('deal-btn');
const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');
const newRoundBtn = document.getElementById('new-round-btn');
const tallyWinEl = document.getElementById('tally-win');
const tallyLossEl = document.getElementById('tally-loss');
const tallyPushEl = document.getElementById('tally-push');

function buildShuffledDeck() {
  const d = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      d.push({ rank, suit: suit.symbol, color: suit.color });
    }
  }
  // Fisher-Yates shuffle
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

function drawCard() {
  if (deck.length === 0) deck = buildShuffledDeck();
  return deck.pop();
}

// Computes best hand value, treating Aces as 11 unless that busts the hand (soft/hard logic)
function handValue(hand) {
  let total = 0;
  let aces = 0;
  for (const card of hand) {
    if (card.rank === 'A') { total += 11; aces++; }
    else if (['J', 'Q', 'K'].includes(card.rank)) total += 10;
    else total += parseInt(card.rank, 10);
  }
  while (total > 21 && aces > 0) {
    total -= 10; // demote an Ace from 11 to 1
    aces--;
  }
  return total;
}

function renderCard(card, faceDown) {
  const el = document.createElement('div');
  el.className = 'bj-card ' + (faceDown ? 'face-down' : card.color);
  if (!faceDown) {
    el.innerHTML = '<span>' + card.rank + '</span><span class="bj-suit">' + card.suit + '</span>';
  }
  return el;
}

function renderHands() {
  dealerCardsEl.innerHTML = '';
  dealerHand.forEach((card, i) => {
    const faceDown = dealerHoleHidden && i === 1;
    dealerCardsEl.appendChild(renderCard(card, faceDown));
  });
  playerCardsEl.innerHTML = '';
  playerHand.forEach(card => playerCardsEl.appendChild(renderCard(card, false)));

  playerTotalEl.textContent = playerHand.length ? handValue(playerHand) : '';
  dealerTotalEl.textContent = dealerHoleHidden
    ? (dealerHand.length ? '?' : '')
    : (dealerHand.length ? handValue(dealerHand) : '');
}

function setMessage(msg) { messageEl.textContent = msg; }

function setButtons({ deal, hit, stand, newRound }) {
  dealBtn.disabled = !deal;
  hitBtn.disabled = !hit;
  standBtn.disabled = !stand;
  newRoundBtn.style.display = newRound ? 'inline-block' : 'none';
  dealBtn.style.display = newRound ? 'none' : 'inline-block';
}

function deal() {
  deck = buildShuffledDeck();
  playerHand = [drawCard(), drawCard()];
  dealerHand = [drawCard(), drawCard()];
  dealerHoleHidden = true;
  roundActive = true;
  renderHands();

  if (handValue(playerHand) === 21) {
    resolveRound('Blackjack! You win!', 'win');
    return;
  }

  setMessage('Hit or Stand?');
  setButtons({ deal: false, hit: true, stand: true, newRound: false });
}

function hit() {
  if (!roundActive) return;
  playerHand.push(drawCard());
  renderHands();
  const total = handValue(playerHand);
  if (total > 21) {
    resolveRound('Bust! You lose.', 'loss');
  } else if (total === 21) {
    stand();
  } else {
    setMessage('Hit or Stand?');
  }
}

function stand() {
  if (!roundActive) return;
  dealerHoleHidden = false;
  renderHands();
  dealerPlay();
}

function dealerPlay() {
  const step = () => {
    const dealerTotal = handValue(dealerHand);
    if (dealerTotal < 17) {
      dealerHand.push(drawCard());
      renderHands();
      setTimeout(step, 450);
    } else {
      finishRound();
    }
  };
  setTimeout(step, 450);
}

function finishRound() {
  const playerTotal = handValue(playerHand);
  const dealerTotal = handValue(dealerHand);

  if (dealerTotal > 21) {
    resolveRound('Dealer busts! You win!', 'win');
  } else if (dealerTotal > playerTotal) {
    resolveRound('Dealer wins with ' + dealerTotal + '.', 'loss');
  } else if (dealerTotal < playerTotal) {
    resolveRound('You win with ' + playerTotal + '!', 'win');
  } else {
    resolveRound('Push — it\\'s a tie.', 'push');
  }
}

function resolveRound(msg, outcome) {
  roundActive = false;
  dealerHoleHidden = false;
  renderHands();
  setMessage(msg);
  tally[outcome]++;
  tallyWinEl.textContent = tally.win;
  tallyLossEl.textContent = tally.loss;
  tallyPushEl.textContent = tally.push;
  setButtons({ deal: false, hit: false, stand: false, newRound: true });
}

function newRound() {
  playerHand = [];
  dealerHand = [];
  dealerHoleHidden = true;
  renderHands();
  setMessage('Press Deal to start a round');
  setButtons({ deal: true, hit: false, stand: false, newRound: false });
}

dealBtn.addEventListener('click', deal);
hitBtn.addEventListener('click', hit);
standBtn.addEventListener('click', stand);
newRoundBtn.addEventListener('click', newRound);

renderHands();`,

  seo: {
    title: 'Blackjack vs Dealer — Free HTML CSS JS Snippet',
    description: 'Playable single-player Blackjack with soft/hard Ace logic, automatic dealer AI at 17, and a win/loss/push tally. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Blackjack Card Game — Soft/Hard Ace Scoring, Automatic Dealer AI & Fisher-Yates Shuffle',
      description: `Blackjack is deceptively simple to describe but genuinely tricky to implement correctly, because a single rule — how an Ace is scored — has to be recalculated dynamically every time a card is drawn, not decided once. This snippet builds a complete, playable single-player Blackjack round against an automatic dealer, using nothing but vanilla JavaScript for the rules engine and CSS for card rendering, with every core rule implemented rather than approximated.

**Soft and hard hand scoring**

The trickiest part of Blackjack logic is that an Ace is worth 11 by default but must demote to 1 whenever counting it as 11 would bust the hand — and this has to be re-evaluated every time a new card is drawn, since a hand that was "hard" (no usable Ace) can become "soft" again as cards are added, or vice versa. The \`handValue()\` function handles this cleanly: it first sums every card assuming every Ace is worth 11 while counting how many Aces are present, then runs a loop that subtracts 10 (demoting one Ace from 11 to 1) for as long as the total exceeds 21 and at least one Ace is still counted as 11. This produces the correct best-possible total in every situation — a hand of Ace-6 correctly reads as a soft 17, and if a third card like a 10 is drawn, the same function correctly re-evaluates it as a hard 17 without any special-case branching.

**The dealer's fixed, rule-bound AI**

Once the player stands, the dealer's hole card (drawn face-down at deal time and rendered with a diagonal-stripe pattern) is flipped face-up, and \`dealerPlay()\` runs an automatic loop: the dealer draws another card any time its total is below 17, and stops the instant its total reaches 17 or higher — this is the standard, unmodifiable house rule used at real casino tables, sometimes called "dealer stands on all 17s." Each dealer draw is spaced out with a short \`setTimeout\` so the player can actually watch the hand build up rather than seeing it resolve instantly.

**Deck management and shuffling**

A fresh 52-card deck is built and shuffled with the Fisher-Yates algorithm — the standard unbiased in-place shuffle, iterating from the last card to the first and swapping each with a randomly chosen earlier-or-equal-index card — at the start of every round, which is simpler and just as fair as tracking a persistent shoe across rounds for a casual single-player demo. \`drawCard()\` pops from the end of the shuffled array and silently rebuilds and reshuffles a new deck if it is ever exhausted, so the game can never run out of cards mid-round.

**Round resolution and the session tally**

Busting (exceeding 21) ends the round immediately as a loss without waiting for the dealer to play, matching real Blackjack rules where a bust is an instant loss regardless of what the dealer holds. A two-card total of exactly 21 on the deal is recognised as a natural Blackjack and resolves the round immediately. Standing triggers the dealer's automatic play, and \`finishRound()\` compares final totals: a dealer bust is an automatic win, a strictly higher dealer total wins for the dealer, a strictly higher player total wins for the player, and equal totals resolve as a push (tie), crediting a running win/loss/push tally that persists for the whole session across a "New Round" button.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Deal a new round', text: 'Click "Deal" to shuffle a fresh deck (buildShuffledDeck() with a Fisher-Yates shuffle) and deal two cards each to you and the dealer. The dealer\'s second card is dealt face-down, rendered with a striped pattern.' },
        { title: 'Hit to draw another card', text: 'Click "Hit" to draw one more card into your hand. handValue() recalculates your total immediately, correctly re-evaluating any Ace as 1 or 11 depending on what keeps your hand at or under 21.' },
        { title: 'Watch for a bust', text: 'If your total exceeds 21 after a Hit, the round ends immediately as a loss — busting is an instant loss regardless of what the dealer is holding, exactly like real Blackjack rules.' },
        { title: 'Stand to end your turn', text: 'Click "Stand" once you are satisfied with your total. The dealer\'s hidden card flips face-up and dealerPlay() begins drawing automatically.' },
        { title: 'Watch the dealer play by the house rule', text: 'The dealer draws cards one at a time, with a short pause between each, until its total reaches 17 or higher — a fixed rule with no strategic choice, exactly matching real casino dealer behaviour.' },
        { title: 'See the result and track your tally', text: 'finishRound() compares final totals to declare a win, loss, or push, updating a running session tally. Click "New Round" to clear the table and deal again.' },
      ],
    },
    features: [
      'handValue() dynamically re-evaluates soft/hard Ace scoring on every card drawn, not just once at deal time',
      'Fisher-Yates shuffle for an unbiased fresh 52-card deck built at the start of every round',
      'Automatic deck reshuffling via drawCard() if the deck is ever exhausted mid-round',
      'Face-down dealer hole card rendered with a distinct diagonal-stripe CSS pattern until the round resolves',
      'Automatic dealer AI following the fixed "stand on 17" house rule, drawing with a readable setTimeout pace',
      'Immediate-loss bust detection that skips dealer play entirely, matching real Blackjack rules',
      'Natural Blackjack (21 on the initial two cards) detected and resolved instantly on deal',
      'Persistent session-long win/loss/push tally, incremented by resolveRound() and displayed live',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching state machines and conditional recalculation logic', desc: 'The Ace soft/hard scoring rule is a genuinely good teaching example of why some values cannot be computed once and cached — they must be recalculated from scratch whenever the underlying data (the hand) changes. Combined with the deal/hit/stand round state machine, this snippet is a compact, realistic example of both patterns for students studying game or application state management.' },
      { icon: 'APP', title: 'Portfolio piece demonstrating card-game rules engines', desc: 'A correctly implemented Blackjack — with proper Ace logic, dealer AI bound to house rules, and accurate win/loss/push resolution — is a recognisable way to demonstrate rules-engine thinking and edge-case handling in a portfolio or take-home coding exercise, well beyond what a static card-layout mockup can show.' },
      { icon: 'FLOW', title: 'Casual replayable diversion embedded in a site', desc: 'A self-contained, dependency-free Blackjack round is an easy drop-in for a "break room" or "just for fun" section of a personal site, internal tool, or waiting screen, giving visitors a genuinely playable card game with no server or backend required.' },
      { icon: 'DESIGN', title: 'Card table UI and animated card-deal pattern reference', desc: 'The green felt table background, simple styled-rectangle card rendering (rank plus suit symbol rather than illustrated art), and the CSS keyframe deal-in animation on each new card are a reusable visual reference for any card-based UI — memory-match games, flashcards, or hand-of-cards displays.' },
      { icon: 'CODE', title: 'Base for betting, splitting, or doubling-down variants', desc: 'Because the round lifecycle (deal, hit, stand, resolve, new round) is cleanly separated into named functions, this snippet is a practical starting point for adding a chip-based betting system, a double-down action, or hand-splitting on a starting pair — each of which builds on the same handValue() and dealerPlay() foundation.' },
      { icon: 'FORM', title: 'Probability and expected-value teaching tool', desc: 'Because the shuffle and dealing logic are fully transparent and inspectable in the source, this snippet doubles as a sandbox for exploring basic Blackjack probability and strategy concepts — for example logging every round\'s outcome to compare observed win rate against known basic-strategy expected values.' },
      { icon: 'CODE', title: 'Related: Battleship Ship-Finding Game', desc: 'See the [Battleship Ship-Finding Game](/ui-snippets/battleship-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Precision Aim Trainer Game', desc: 'See the [Precision Aim Trainer Game](/ui-snippets/precision-aim-trainer-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Mastermind Code Breaker Game', desc: 'See the [Mastermind Code Breaker Game](/ui-snippets/mastermind-code-breaker-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Dots and Boxes Game', desc: 'See the [Dots and Boxes Game](/ui-snippets/dots-and-boxes-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the game decide whether an Ace counts as 1 or 11?', a: 'handValue() first assumes every Ace is worth 11 and sums the hand, while separately counting how many Aces are present. It then runs a loop that subtracts 10 from the total (equivalent to re-counting one Ace as 1 instead of 11) for as long as the total exceeds 21 and at least one Ace is still being counted as 11. This means the function always returns the highest possible total that does not bust, recalculated fresh every time it is called — so a hand\'s Ace value automatically adjusts as more cards are drawn.' },
      { q: 'What rule does the dealer follow, and can I change it?', a: 'The dealer follows "stand on all 17s": dealerPlay() draws another card any time the dealer\'s total is below 17 and stops the instant it reaches 17 or higher, matching the most common real-world casino rule. To implement "hit on soft 17" instead (a stricter variant), you would need to also track whether the dealer\'s 17 is soft (contains an Ace still counted as 11) and continue drawing in that specific case — handValue() would need a companion function that reports softness, not just the total.' },
      { q: 'Why does busting end the round without waiting for the dealer?', a: 'In real Blackjack, if your hand exceeds 21, you lose immediately regardless of what the dealer is holding or would have drawn — the dealer never even needs to reveal their hole card or play out their hand. The hit() function checks handValue(playerHand) > 21 immediately after each draw and calls resolveRound() as an instant loss, skipping dealerPlay() entirely, which matches this real rule.' },
      { q: 'How is the deck shuffled, and is it unbiased?', a: 'buildShuffledDeck() constructs all 52 rank/suit combinations and then applies the Fisher-Yates shuffle: iterating the array from the last index down to the second, and at each step swapping the current card with a card at a uniformly random index from 0 up to and including the current index. This is the standard algorithm for producing a mathematically unbiased random permutation, unlike naive approaches such as sorting by Math.random() which are not uniformly distributed.' },
      { q: 'Does the game support betting or chip amounts?', a: 'No — this snippet focuses purely on the core round logic (deal, hit, stand, dealer AI, win/loss/push resolution) and a running tally of round outcomes, without a betting or bankroll system. To add one, introduce a chip balance variable, a bet-amount input or chip-selection UI before each Deal, and adjust the balance inside resolveRound() based on the outcome and bet size — the existing win/loss/push branching is the natural hook point for that logic.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace through handValue() with a specific hand like Ace, Ace, 9 to confirm it correctly resolves to a soft 21 rather than double-counting both Aces as 11 — working through an edge case like that by hand alongside the AI is the fastest way to trust the scoring logic. It's also a good snippet to extend with AI help: ask it to add a simple chip-based betting system that adjusts a bankroll based on resolveRound()'s outcome, implement splitting when your first two cards are a matching pair, or add a "hit on soft 17" dealer variant that requires tracking hand softness rather than just the numeric total. You could also ask the assistant to review the Fisher-Yates shuffle implementation for correctness against the textbook algorithm.`,
      prompt: `Build a single-player Blackjack card game against an automatic dealer in plain HTML, CSS, and JavaScript — no frameworks, no libraries, no card image assets (render cards as styled rectangles with rank and suit text).

Requirements:
- A "Deal" button shuffles a fresh 52-card deck using an unbiased shuffle algorithm and deals two cards each to the player and dealer, with the dealer's second card shown face-down until the round resolves.
- Implement correct Ace scoring: an Ace counts as 11 unless that would cause the hand to bust, in which case it counts as 1, and this must be recalculated correctly as more cards are drawn (a hand can move between "soft" and "hard" states across multiple draws).
- A "Hit" button draws one card into the player's hand; if the resulting total exceeds 21, the round ends immediately as a loss without revealing the dealer's hidden card or letting the dealer draw.
- A "Stand" button reveals the dealer's hidden card and then has the dealer draw automatically, one card at a time, until the dealer's total is 17 or higher, following the standard house rule.
- After the dealer finishes, compare final hand totals to determine a win, loss, or push (tie), accounting for a dealer bust as an automatic player win.
- Track and display a running win/loss/push tally across the whole session, and provide a "New Round" button that clears the table for another deal without resetting the tally.
- Detect a natural Blackjack (a two-card total of 21 immediately after dealing) and resolve it right away rather than allowing further hits.`,
    },
  },
};

export default blackjackCardGame;
