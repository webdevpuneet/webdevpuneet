const flashcardDeck = {
  id: 'flashcard-deck',
  title: 'Flashcard Deck',
  lastmod: '2026-07-23',
  category: 'cards',
  html: `<div class="deck-app">
  <div class="deck-top">
    <span class="deck-label">Spanish basics</span>
    <span class="deck-count" id="deck-count"></span>
  </div>
  <div class="deck-progress"><span id="deck-bar"></span></div>

  <!-- Card stack -->
  <div class="stack" id="stack">
    <div class="stack-card ghost g2"></div>
    <div class="stack-card ghost g1"></div>

    <button class="card" id="card" aria-live="polite">
      <div class="card-inner" id="card-inner">
        <div class="face front">
          <span class="face-tag">Prompt</span>
          <p class="face-text" id="front-text"></p>
          <span class="face-hint">Click or press Space to flip</span>
        </div>
        <div class="face back">
          <span class="face-tag">Answer</span>
          <p class="face-text" id="back-text"></p>
          <span class="face-hint">How did you do?</span>
        </div>
      </div>
    </button>
  </div>

  <!-- Rating buttons -->
  <div class="rate-row" id="rate-row">
    <button class="rate-btn again" id="btn-again">
      ✗ Again <span class="kbd">1</span>
    </button>
    <button class="rate-btn got" id="btn-got">
      ✓ Got it <span class="kbd">2</span>
    </button>
  </div>

  <!-- Summary -->
  <div class="summary" id="summary" hidden>
    <div class="sum-ring" id="sum-ring">
      <svg viewBox="0 0 80 80" width="92" height="92">
        <circle cx="40" cy="40" r="34" fill="none" stroke="#283548" stroke-width="7"/>
        <circle id="sum-arc" cx="40" cy="40" r="34" fill="none" stroke="#34d399" stroke-width="7"
          stroke-linecap="round" stroke-dasharray="213.6" stroke-dashoffset="213.6"
          transform="rotate(-90 40 40)"/>
      </svg>
      <span class="sum-pct" id="sum-pct"></span>
    </div>
    <h3 class="sum-title" id="sum-title"></h3>
    <p class="sum-sub" id="sum-sub"></p>
    <button class="restart" id="btn-restart">Study again</button>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.deck-app { width: 100%; max-width: 380px; }

.deck-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.deck-label { font-size: 13px; font-weight: 700; color: #e2e8f0; }
.deck-count { font-size: 11.5px; color: #64748b; font-variant-numeric: tabular-nums; }

.deck-progress { height: 5px; background: #1e293b; border-radius: 5px; overflow: hidden; margin-bottom: 22px; }
.deck-progress span {
  display: block; height: 100%; width: 0;
  background: linear-gradient(90deg, #6366f1, #a855f7);
  border-radius: 5px; transition: width 0.4s ease;
}

/* — Stack — */
.stack { position: relative; height: 230px; perspective: 1000px; }
.stack-card {
  position: absolute; inset: 0; border-radius: 18px;
  background: #16213a; border: 1px solid #283548;
}
.ghost.g1 { transform: translateY(8px) scale(0.965); opacity: 0.7; }
.ghost.g2 { transform: translateY(16px) scale(0.93); opacity: 0.4; }

.card {
  position: absolute; inset: 0;
  background: none; border: none; padding: 0;
  cursor: pointer; font-family: inherit;
  perspective: 1000px;
}
.card:focus-visible { outline: 3px solid #6366f1; outline-offset: 4px; border-radius: 18px; }

.card-inner {
  position: relative; width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.4, 0.1, 0.2, 1);
}
.card.flipped .card-inner { transform: rotateY(180deg); }

/* leave animations */
.card.leave-right .card-inner { transition: transform 0.35s ease, opacity 0.35s; transform: translateX(120%) rotate(8deg) rotateY(180deg); opacity: 0; }
.card.leave-left  .card-inner { transition: transform 0.35s ease, opacity 0.35s; transform: translateX(-120%) rotate(-8deg) rotateY(180deg); opacity: 0; }
.card.enter .card-inner { animation: card-enter 0.3s ease; }
@keyframes card-enter { from { transform: translateY(-14px) scale(0.96); opacity: 0; } }

.face {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  border-radius: 18px;
  background: #1e293b; border: 1px solid #334155;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; padding: 24px; text-align: center;
}
.face.back {
  transform: rotateY(180deg);
  background: linear-gradient(160deg, #1e293b, #251e4d);
  border-color: rgba(99,102,241,0.45);
}
.face-tag {
  font-size: 9.5px; font-weight: 800; letter-spacing: 0.14em;
  text-transform: uppercase; color: #64748b;
}
.face.back .face-tag { color: #a5b4fc; }
.face-text { font-size: 24px; font-weight: 800; color: #f8fafc; line-height: 1.3; }
.face-hint { font-size: 10.5px; color: #4a5a76; }

/* — Rating — */
.rate-row { display: flex; gap: 10px; margin-top: 20px; }
.rate-btn {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px; border-radius: 11px;
  font-size: 13.5px; font-weight: 700; font-family: inherit; cursor: pointer;
  border: 1px solid; background: none;
  transition: all 0.15s; opacity: 0.35; pointer-events: none;
}
.rate-row.armed .rate-btn { opacity: 1; pointer-events: all; }
.rate-btn.again { color: #f87171; border-color: rgba(248,113,113,0.4); }
.rate-btn.again:hover { background: rgba(248,113,113,0.12); }
.rate-btn.got { color: #34d399; border-color: rgba(52,211,153,0.4); }
.rate-btn.got:hover { background: rgba(52,211,153,0.12); }
.kbd {
  font-size: 10px; border: 1px solid currentColor; border-radius: 4px;
  padding: 0 5px; opacity: 0.6;
}

/* — Summary — */
.summary { text-align: center; padding: 8px 0 4px; }
.sum-ring { position: relative; width: 92px; margin: 0 auto 14px; }
.sum-ring svg { display: block; }
#sum-arc { transition: stroke-dashoffset 0.9s cubic-bezier(0.4, 0, 0.2, 1); }
.sum-pct {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  font-size: 19px; font-weight: 800; color: #f8fafc; font-variant-numeric: tabular-nums;
}
.sum-title { font-size: 18px; font-weight: 800; color: #f8fafc; }
.sum-sub { font-size: 12.5px; color: #94a3b8; margin: 6px 0 18px; line-height: 1.6; }
.restart {
  background: #6366f1; color: #fff; border: none;
  border-radius: 10px; padding: 11px 24px;
  font-size: 13px; font-weight: 700; font-family: inherit; cursor: pointer;
}
.restart:hover { background: #4f46e5; }`,

  js: `const CARDS = [
  { front: 'Hello',        back: 'Hola' },
  { front: 'Thank you',    back: 'Gracias' },
  { front: 'Good morning', back: 'Buenos d\\u00EDas' },
  { front: 'Please',       back: 'Por favor' },
  { front: 'See you later', back: 'Hasta luego' },
  { front: 'How much?',    back: '\\u00BFCu\\u00E1nto cuesta?' },
];

let queue = [];        // indexes still to study this session
let firstTry = {};     // id -> true if answered "Got it" on first sight
let seen = {};         // id -> has been shown at least once
let total = 0;         // total ratings given (for progress)
let flipped = false;
let animating = false;

const card    = document.getElementById('card');
const rateRow = document.getElementById('rate-row');

function start() {
  queue = CARDS.map((_, i) => i);
  firstTry = {}; seen = {}; total = 0;
  document.getElementById('summary').hidden = true;
  document.getElementById('stack').style.display = '';
  rateRow.style.display = '';
  show();
}

function show() {
  const idx = queue[0];
  flipped = false;
  card.classList.remove('flipped', 'leave-left', 'leave-right');
  card.classList.add('enter');
  setTimeout(() => card.classList.remove('enter'), 320);
  document.getElementById('front-text').textContent = CARDS[idx].front;
  document.getElementById('back-text').textContent = CARDS[idx].back;
  rateRow.classList.remove('armed');
  updateHud();
}

function updateHud() {
  document.getElementById('deck-count').textContent = queue.length + ' to go';
  // progress = unique cards fully cleared
  const done = CARDS.length - new Set(queue).size;
  document.getElementById('deck-bar').style.width = (done / CARDS.length * 100) + '%';
}

function flip() {
  if (animating || !queue.length) return;
  flipped = !flipped;
  card.classList.toggle('flipped', flipped);
  // Rating only unlocks after the user has seen the answer.
  if (flipped) rateRow.classList.add('armed');
}

function rate(gotIt) {
  if (animating || !flipped) return;
  animating = true;
  const idx = queue.shift();

  if (!seen[idx]) {
    seen[idx] = true;
    firstTry[idx] = gotIt;
  }
  // "Again" re-queues the card near the end — the lightweight Leitner loop.
  if (!gotIt) queue.push(idx);
  total++;

  card.classList.add(gotIt ? 'leave-right' : 'leave-left');
  setTimeout(() => {
    animating = false;
    queue.length ? show() : finish();
  }, 330);
}

function finish() {
  document.getElementById('stack').style.display = 'none';
  rateRow.style.display = 'none';
  const s = document.getElementById('summary');
  s.hidden = false;

  const firstTryCount = CARDS.filter((_, i) => firstTry[i]).length;
  const pct = Math.round(firstTryCount / CARDS.length * 100);
  document.getElementById('sum-pct').textContent = pct + '%';
  document.getElementById('sum-title').textContent =
    pct === 100 ? 'Perfect run!' : pct >= 60 ? 'Nice work!' : 'Keep practising!';
  document.getElementById('sum-sub').innerHTML =
    '<b>' + firstTryCount + ' of ' + CARDS.length + '</b> on the first try \\u00B7 ' +
    total + ' total reviews';
  document.getElementById('deck-count').textContent = 'done';
  document.getElementById('deck-bar').style.width = '100%';

  // animate the ring: 213.6 = 2\\u03C0r for r=34
  requestAnimationFrame(() => {
    document.getElementById('sum-arc').style.strokeDashoffset =
      213.6 * (1 - pct / 100);
  });
}

card.addEventListener('click', flip);
document.getElementById('btn-again').addEventListener('click', () => rate(false));
document.getElementById('btn-got').addEventListener('click', () => rate(true));
document.getElementById('btn-restart').addEventListener('click', start);

document.addEventListener('keydown', e => {
  if (e.key === ' ') { e.preventDefault(); flip(); }
  if (e.key === '1') rate(false);
  if (e.key === '2') rate(true);
});

start();`,

  seo: {
    title: 'Flashcard Deck with Flip — HTML CSS JS Snippet',
    description: 'Study flashcards: 3D flip, Again/Got-it rating with re-queueing, progress bar, keyboard shortcuts and an animated score ring. React & Tailwind exports.',
    about: {
      title: 'Flashcard Deck — 3D Flip with preserve-3d, Leitner-Style Re-Queueing, Gated Rating & an Animated Score Ring',
      description: `Flashcards are the most-built study UI on the web — every language app, med-school tool, and coding-interview prep site ships one — and the searches ("flashcard flip CSS", "quizlet clone") stay perennially high because the component combines three genuinely instructive techniques: a correct 3D card flip, a small spaced-repetition loop, and session-summary math. This snippet implements the full study session in vanilla HTML, CSS, and JavaScript: a stacked deck with depth ghosts, click-or-Space flipping, Again/Got-it rating that re-queues missed cards until cleared, directional leave animations, keyboard shortcuts, a progress bar, and an SVG score ring summarising first-try accuracy.

**The flip, done correctly**

The card is a real \`<button>\` (keyboard-focusable, Space/Enter native) containing a \`.card-inner\` with \`transform-style: preserve-3d\`, holding two absolutely stacked faces with \`backface-visibility: hidden\` — the back pre-rotated \`rotateY(180deg)\`. Flipping toggles one class that rotates the inner wrapper 180°; the browser shows whichever face currently points at the viewer. \`perspective: 1000px\` on the stack gives the rotation its depth (without it the flip looks like a flat squash). This is the canonical three-layer flip structure — perspective on the parent, preserve-3d on the rotator, hidden backfaces on the leaves — and each layer answers one rendering question: how deep, rotate together, and don't draw mirrored text. The answer face gets a violet-tinted gradient and indigo border so "flipped" is legible even in a screenshot.

**The study loop: a two-line Leitner system**

Session state is a queue of card indexes. Rating shifts the current card; "Got it" drops it, "Again" pushes it back onto the *end* of the queue — so missed cards return after the remaining cards, the lightweight version of the Leitner spaced-repetition principle (wrong answers repeat at increasing intervals; here, one interval: the rest of the deck). The session ends only when the queue empties, meaning every card was eventually answered correctly — the "study until cleared" contract users know from Anki. Two maps record honesty for the summary: \`seen\` marks first exposure, and \`firstTry\` records whether that first exposure was correct — so re-queued cards can't inflate the score by being easy the second time.

**Gated rating and directional exits**

The Again/Got-it row starts disabled (\`opacity: 0.35; pointer-events: none\`) and arms only when the card is flipped — you cannot rate an answer you haven't seen, the guard that keeps the data meaningful. Rating triggers a directional exit: "Got it" flies the card off to the right with a slight clockwise rotation, "Again" off to the left — the swipe-vocabulary mapping (right = keep/pass, left = reject/retry) that Tinder normalised and study apps adopted, here reinforced by the buttons' green/red colouring. An \`animating\` flag debounces the 330ms exit so double-clicks can't skip cards, and the next card enters with a small drop-in. Two static ghost cards behind the live one (progressively offset, scaled, and faded) sell the "deck" illusion for the cost of two divs.

**Progress and the score ring**

The progress bar tracks *unique cards cleared* — \`CARDS.length − new Set(queue).size\` — not raw ratings, so re-queued cards don't make progress lie. The summary's ring is the standard SVG donut-meter recipe: a track circle plus a progress circle with \`stroke-dasharray\` equal to its circumference (2π × 34 ≈ 213.6) and \`stroke-dashoffset\` animated from full (empty) to \`circumference × (1 − pct)\`, pre-rotated −90° so it starts at 12 o'clock. The offset is set inside \`requestAnimationFrame\` after the summary becomes visible so the CSS transition actually plays — the classic display-none-to-animated gotcha. Keyboard mappings (Space flip, 1 again, 2 got-it) make rapid-fire studying possible, matching the muscle memory Anki users expect.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Run a study session',
          text: 'Click the card (or press Space) to flip it — the Spanish answer appears and the rating buttons arm. Press "Got it" (or 2) and the card exits right; "Again" (or 1) exits left and the card returns later in the queue. Miss a couple on purpose: the counter shows them re-queued, but the progress bar only advances on unique cards cleared. Finish the deck and the score ring animates to your first-try percentage — re-queued cards count against it honestly.',
        },
        {
          title: 'Load your own deck',
          text: 'CARDS is the whole content model: an array of { front, back } strings. Swap in vocabulary, definitions, interview questions, or cloze prompts. For multiple decks, store them as an object of arrays with a picker that assigns CARDS and calls start(). Long answers wrap fine — the face uses flexbox centring — but keep fronts short; a flashcard with a paragraph prompt is a quiz, and the [Quiz Card](/ui-snippets/quiz-card) snippet fits that better.',
        },
        {
          title: 'Persist progress between sessions',
          text: 'For real study value, persist per-card state: after each rate(), save { cardId: { lastSeen: Date.now(), streak } } to localStorage. On start(), build the queue from cards whose review is due — streak 0 due immediately, streak n due after n days (the simplest expanding-interval schedule). That upgrade turns the session toy into a genuine spaced-repetition tool; the FAQ sketches the full algorithm.',
        },
        {
          title: 'Add swipe gestures for mobile',
          text: 'The directional exits are already swipe-shaped — add the gesture with pointer events on the card: track pointerdown/move to drag the card-inner with translateX + slight rotate, and on pointerup past a ±80px threshold call rate(dx > 0), else spring back with a transition. The [Swipe Cards](/ui-snippets/swipe-cards) snippet implements exactly this drag mechanic to copy from; keep the buttons as the accessible path.',
        },
        {
          title: 'Tune the deck feel',
          text: 'The flip duration (0.5s) and its easing live on .card-inner; the exit animation (0.35s) on the leave classes — the animating flag\'s 330ms timeout must stay just under the exit duration. Ghost depth is the two .ghost transforms. For a flat single-card look, delete the ghosts and the stack height stays. To flip on hover instead of click (display decks, not study decks), see the [3D Flip Card](/ui-snippets/3d-flip-card) variant.',
        },
        {
          title: 'Export and compose',
          text: 'Click JSX for React — queue, flipped, and the score maps become state; the exit animation coordinates with state via a leaving flag cleared on transition end. Compose the study suite from this library: [Streak Tracker](/ui-snippets/streak-tracker) for daily habit, [Progress Circle Steps](/ui-snippets/progress-circle-steps) for course position, [Confetti Celebration Card](/ui-snippets/confetti-celebration-card) on perfect runs, and [Quiz Card](/ui-snippets/quiz-card) for multiple-choice checks between decks.',
        },
      ],
    },
    features: [
      'Canonical 3D flip: perspective parent, preserve-3d rotator, backface-hidden faces, pre-rotated back',
      'Card is a real button — focus ring, Space/Enter, aria-live announcing face changes',
      'Leitner-style loop: "Again" re-queues at the end; the session only ends when every card is cleared',
      'First-try scoring kept honest via seen/firstTry maps — re-queued successes can\'t inflate the result',
      'Rating gated until the answer is seen; animating flag debounces exits so double-clicks can\'t skip cards',
      'Directional exits (right = got it, left = again) with rotation, plus drop-in entrances and two depth ghosts',
      'Progress bar counts unique cards cleared, not raw ratings; live "N to go" counter',
      'SVG score ring animated via stroke-dashoffset inside requestAnimationFrame, with keyboard shortcuts (Space/1/2)',
    ],
    useCases: [
      {
        icon: 'LEARN',
        title: 'Language apps, exam prep, and course platforms',
        desc: 'The direct use: vocabulary decks, terminology drills, med/law exam cards, coding-interview Q&A. The study-until-cleared queue and first-try scoring are the pedagogically correct core — students can\'t skip what they got wrong, and the summary tells the truth about retention. Add the localStorage due-date schedule from the how-to and you have a genuine lightweight Anki alternative embeddable in any course page, paired with the [Streak Tracker](/ui-snippets/streak-tracker) for daily-practice retention loops.',
      },
      {
        icon: 'APP',
        title: 'Onboarding and product-training decks in SaaS',
        desc: 'Internal enablement teams drill sales reps on objection handling, support agents on policy answers, and new hires on domain terms — flashcards outperform slide decks for all three because rating forces recall. Load CARDS from your LMS content, report the summary (firstTry map + total reviews) to your backend per session, and the re-queue loop guarantees reps actually clear the deck rather than clicking through it.',
      },
      {
        icon: 'CODE',
        title: 'Learning the 3D flip pattern properly',
        desc: 'The three-layer flip structure here is the reference implementation of CSS 3D\'s most-searched effect, with each layer\'s purpose commented: perspective for depth, preserve-3d so faces rotate as one, backface-visibility so text never mirrors. It also demonstrates composing the flip with OTHER transforms — the exit animations combine translateX, rotate, and the maintained rotateY(180deg) in one transition, which is where most hand-rolled flips break. Compare the hover-driven [3D Flip Card](/ui-snippets/3d-flip-card) and the [Flip Card Modal](/ui-snippets/flip-card-modal) siblings.',
      },
      {
        icon: 'FLOW',
        title: 'The queue-with-requeue pattern beyond studying',
        desc: 'The two-line loop — shift the head, push failures back, finish when empty — is a general retry-until-done queue: content moderation passes, photo culling (keep/decide-later), inbox-zero triage, QA checklist runs. The honesty maps (seen/firstTry) generalise to first-pass metrics for any of these. This snippet is the smallest complete demonstration of the pattern with UI state, debouncing, and progress math attached.',
      },
      {
        icon: 'DESIGN',
        title: 'Marketing and portfolio "deck" interactions',
        desc: 'The stacked-ghost deck with flip and directional dismissal makes a strong landing-page interactive: feature cards visitors flip and swipe through, testimonial decks, or "myth vs fact" content marketing. Strip the rating semantics, keep the exits, and autoplay with a timer. The violet answer-face treatment and the tactile flip give the section the crafted feel that static feature grids lack — pair with [Stacked Cards](/ui-snippets/stacked-cards) for the scroll-driven sibling.',
      },
      {
        icon: 'CHART',
        title: 'The SVG score ring as a reusable result meter',
        desc: 'The summary ring — track circle, progress circle, dasharray = circumference, animated dashoffset, −90° start, rAF-after-reveal — is the exact recipe for every percentage donut in dashboards and results screens. Lift it standalone: it is 10 lines of SVG and 3 of JS, with the display-none-transition gotcha already solved. The [SVG Progress Ring](/ui-snippets/svg-progress-ring) and [Gradient Stat Ring](/ui-snippets/gradient-stat-ring) snippets extend the same recipe with gradients and counters.',
      },
      { icon: 'CODE', title: 'Related: Out of Stock Overlay', desc: 'See the [Out of Stock Overlay](/ui-snippets/out-of-stock-overlay/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How does the 3D flip actually work — what does each CSS property contribute?',
        a: 'Three properties on three elements, each answering one rendering question. perspective: 1000px on the stack container establishes the viewing depth — it defines how far the "camera" sits from the plane, so rotating children foreshorten realistically; without it, rotateY just horizontally squashes the card. transform-style: preserve-3d on .card-inner makes its children live in the parent\'s 3D space instead of being flattened into its plane — this is what lets the two faces occupy the same spot facing opposite directions and rotate as a rigid unit when the inner wrapper turns. backface-visibility: hidden on each face tells the renderer not to draw a face when its back points at the viewer — without it you would see the front card\'s text mirrored instead of the answer. The back face is pre-rotated 180° so that when the inner wrapper reaches 180°, the back\'s net rotation is 360° — facing forward, readable. The exit animations then show why the structure matters: they transition transform to translateX(120%) rotate(8deg) rotateY(180deg) — keeping the flip term in the value list — because transform is one property; drop the rotateY term and the card would visibly snap un-flipped as it flies away.',
      },
      {
        q: 'Is pushing "Again" cards to the back of the queue real spaced repetition?',
        a: 'It is the honest minimum of the idea, and the upgrade path is short. What the queue loop implements is within-session spacing: a missed card returns after the remaining cards rather than immediately (immediate re-showing tests echo memory, not recall — the interval, even a small one, is what forces retrieval), and the session contract is Anki\'s "study until cleared". What it lacks is between-session scheduling, which is where the real retention gains live. The upgrade: persist per-card { streak, due } — on "Got it" increment streak and set due = now + interval(streak) with an expanding series (1 day, 3, 7, 16, 35 is a serviceable approximation of SM-2\'s output); on "Again" reset streak and set due = now. Each session\'s starting queue is then cards where due <= now. That is ~15 lines over this snippet\'s structure and captures most of the measured benefit of full SM-2; the remaining refinements (per-card ease factors adjusting the multiplier from rating history) matter at thousands-of-cards scale. The firstTry map already gives you the per-session signal an ease factor would consume.',
      },
      {
        q: 'Why does the score ring animate only when set inside requestAnimationFrame?',
        a: 'Because of how style changes batch. The summary starts hidden; finish() reveals it and sets the final stroke-dashoffset. If both happen in the same synchronous block, the browser computes styles once afterwards — the element\'s first-ever rendered state already has the final offset, so there is no "from" state and the transition has nothing to interpolate: the ring appears full instantly. Wrapping the offset assignment in requestAnimationFrame defers it until after the browser has rendered a frame with the summary visible at the initial full-circumference offset (empty ring); the subsequent change then transitions from a real rendered state. This is the general display:none-to-animated gotcha — the same reason popovers need @starting-style and why entrance animations on freshly-inserted DOM need a frame\'s separation (some codebases use double-rAF or a forced reflow via offsetHeight; single rAF suffices here because the reveal and the offset are separated by it). The ring math itself: dasharray equals the circumference (2π × 34 ≈ 213.6), and dashoffset = circumference × (1 − pct/100) leaves pct% of the stroke drawn, started at 12 o\'clock by the −90° pre-rotation.',
      },
      {
        q: 'How would this port to React or Angular, and what does Tailwind styling look like?',
        a: 'React: state is { queue, flipped, seenMap, firstTryMap, phase } — but the exit animations need coordination, since removing the old card from state the instant a rating lands would skip the fly-away. The clean pattern: rate() sets a leaving: "left"|"right" state that renders the exit class, and an onTransitionEnd (or a matching setTimeout, as here) commits the queue shift and clears leaving — the same two-phase commit this vanilla code does with the animating flag, made explicit. Key the card element by the current card index so React remounts it per card, giving you the enter animation for free via an animation (not transition) as this CSS already does. Angular mirrors it with signals plus @if for the phases, and (transitionend) driving the commit. Tailwind: the stack is relative h-[230px] [perspective:1000px]; the rotator is relative size-full [transform-style:preserve-3d] transition-transform duration-500 with data-[flipped]:[transform:rotateY(180deg)]; faces are absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center gap-3 p-6, the back adding [transform:rotateY(180deg)] bg-gradient-to-br from-slate-800 to-indigo-950 border-indigo-500/45; rating buttons use flex-1 border rounded-xl py-3 font-bold with color pairs like text-red-400 border-red-400/40 hover:bg-red-400/10 and an armed gate via group-data or a parent data-[armed] variant flipping opacity and pointer-events.',
      },
    ],
    aiPrompt: {
      paragraph: `Two halves of this snippet reward different questions to an AI assistant. For the CSS half, paste it into Claude and ask it to break the flip on purpose three ways — remove perspective, remove preserve-3d, remove backface-visibility — and describe what you'd see in each case; the three distinct failure modes are the fastest way to make the 3D model stick, and the exit-animation's kept rotateY term is a fourth question worth asking. For the study-logic half, ask it to upgrade the within-session queue to real between-session spaced repetition: per-card streak/due persistence in localStorage, an expanding interval series, and a due-cards session builder — then ask it to explain what full SM-2 would add and whether your deck size justifies it. Product extensions worth requesting: swipe gestures via pointer events reusing the directional exits (with the buttons kept as the accessible path), a deck picker over multiple CARDS sets, cloze-deletion card fronts, and a session-report POST from the firstTry map if this feeds an LMS. Each is cleanly separable because the content model is just { front, back } — which is also why your own deck goes in first.`,
      prompt: `Build a study flashcard deck in plain HTML, CSS, and JavaScript — 3D flip, Again/Got-it rating with re-queueing, and a scored session summary. No libraries.

Requirements:
- A deck header (title, live "N to go" counter) over a gradient progress bar, then a card stack: two static ghost cards offset/scaled/faded behind the live card to sell depth, inside a perspective container.
- The card must be a real button (focus-visible ring, Space via native activation) containing the canonical three-layer flip: a preserve-3d inner rotator transitioning rotateY(180deg) on a class toggle, two absolutely-stacked faces with backface-visibility hidden, the back pre-rotated 180° and styled distinctly (violet-tinted gradient, accent border) with Prompt/Answer tag labels; comment what each of the three properties contributes.
- Session logic as a queue of card indexes over a { front, back } CARDS array (~6 language pairs): flipping arms the initially-disabled rating row (opacity + pointer-events gate — you cannot rate an unseen answer); "Got it" removes the card, "Again" pushes it to the END of the queue (comment this as the minimal Leitner loop), and the session ends only when the queue empties.
- Track honesty for the summary with two maps — seen (first exposure) and firstTry (was that first exposure correct) — so re-queued cards cannot inflate the score, and make the progress bar advance on UNIQUE cards cleared (deck size minus set-of-queue size), not raw ratings.
- Directional exits: got-it flies the card right with slight clockwise rotation, again flies left — both transitions keeping the rotateY(180deg) term so the card never un-flips mid-exit (comment why) — debounced by an animating flag timed just under the exit duration; new cards drop in with a keyframed entrance.
- Keyboard shortcuts: Space flips (preventDefault scrolling), 1 = again, 2 = got it, shown as small kbd chips in the buttons.
- The summary replaces the stack: an SVG score ring (track + progress circle, dasharray = 2πr, dashoffset animated to circumference × (1 − pct), −90° start) set inside requestAnimationFrame after reveal (comment the display-to-animated gotcha), a title tiered by score, "N of M on the first try · T total reviews", and a restart button that resets all state.`,
    },
  },
};

export default flashcardDeck;
