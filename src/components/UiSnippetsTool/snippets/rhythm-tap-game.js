const rhythmTapGame = {
  id: 'rhythm-tap-game',
  title: 'Rhythm Tap Game',
  lastmod: '2026-08-09',
  category: 'games',
  html: `<div class="rt-wrap">
  <div class="rt-hud">
    <div class="rt-hud-item"><span class="rt-hud-label">Score</span><span class="rt-hud-value" id="rt-score">0</span></div>
    <div class="rt-hud-item"><span class="rt-hud-label">Combo</span><span class="rt-hud-value" id="rt-combo">0</span></div>
    <div class="rt-hud-item"><span class="rt-hud-label">Best</span><span class="rt-hud-value" id="rt-best">0</span></div>
  </div>

  <div class="rt-stage" id="rt-stage">
    <div class="rt-lane" data-lane="0"><div class="rt-lane-track" id="track-0"></div><div class="rt-hitline"></div><div class="rt-key">D</div></div>
    <div class="rt-lane" data-lane="1"><div class="rt-lane-track" id="track-1"></div><div class="rt-hitline"></div><div class="rt-key">F</div></div>
    <div class="rt-lane" data-lane="2"><div class="rt-lane-track" id="track-2"></div><div class="rt-hitline"></div><div class="rt-key">J</div></div>
    <div class="rt-lane" data-lane="3"><div class="rt-lane-track" id="track-3"></div><div class="rt-hitline"></div><div class="rt-key">K</div></div>
    <div class="rt-feedback" id="rt-feedback"></div>

    <div class="rt-screen rt-start-screen" id="rt-start-screen">
      <p class="rt-logo">Rhythm Tap</p>
      <p class="rt-sub">Hit D F J K as notes cross the line</p>
      <button class="rt-btn" id="rt-start-btn">Start</button>
    </div>
    <div class="rt-screen rt-end-screen" id="rt-end-screen">
      <p class="rt-logo">Run Complete</p>
      <p class="rt-summary" id="rt-summary"></p>
      <button class="rt-btn" id="rt-restart-btn">Play Again</button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f0f1a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.rt-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; }

.rt-hud { display: flex; gap: 10px; }
.rt-hud-item {
  background: rgba(255,255,255,0.06); border-radius: 8px; padding: 6px 16px;
  display: flex; flex-direction: column; align-items: center; min-width: 68px;
}
.rt-hud-label { font-size: 10px; font-weight: 700; color: #a5b4fc; text-transform: uppercase; letter-spacing: 0.5px; }
.rt-hud-value { font-size: 18px; font-weight: 800; color: #fff; font-family: 'Courier New', monospace; }

.rt-stage {
  position: relative;
  width: 320px; height: 440px;
  background: linear-gradient(180deg, #1e1b3a 0%, #14122a 100%);
  border-radius: 14px; overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  display: flex;
}

.rt-lane {
  position: relative; flex: 1;
  border-right: 1px solid rgba(255,255,255,0.06);
  display: flex; flex-direction: column; align-items: center;
}
.rt-lane:last-child { border-right: none; }

.rt-lane-track { position: absolute; inset: 0; }

.rt-note {
  position: absolute; left: 50%; transform: translateX(-50%);
  width: 60%; height: 22px; border-radius: 6px;
  background: #6366f1; box-shadow: 0 0 10px rgba(99,102,241,0.6);
}

.rt-hitline {
  position: absolute; bottom: 56px; left: 4px; right: 4px; height: 4px;
  background: rgba(255,255,255,0.35); border-radius: 4px;
}
.rt-hitline.flash { background: #fbbf24; box-shadow: 0 0 12px #fbbf24; }

.rt-key {
  position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
  width: 34px; height: 34px; border-radius: 8px;
  background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.18);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; color: #cbd5e1;
  transition: background 0.08s, transform 0.08s;
}
.rt-key.pressed { background: #6366f1; color: #fff; transform: translateX(-50%) scale(0.9); }

.rt-feedback {
  position: absolute; top: 40%; left: 0; right: 0; text-align: center;
  font-size: 20px; font-weight: 800; pointer-events: none;
  opacity: 0; transition: opacity 0.15s;
}
.rt-feedback.show { opacity: 1; animation: rt-pop 0.4s ease forwards; }
@keyframes rt-pop { 0% { transform: translateY(0) scale(0.8); opacity: 1; } 100% { transform: translateY(-18px) scale(1.1); opacity: 0; } }
.rt-feedback.perfect { color: #4ade80; }
.rt-feedback.good { color: #60a5fa; }
.rt-feedback.miss { color: #f87171; }

.rt-screen {
  position: absolute; inset: 0;
  background: rgba(15,15,26,0.88);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
  opacity: 0; pointer-events: none; transition: opacity 0.2s;
}
.rt-screen.show { opacity: 1; pointer-events: all; }
.rt-logo { font-size: 24px; font-weight: 800; color: #fff; }
.rt-sub { font-size: 12px; color: #a5b4fc; margin-bottom: 4px; }
.rt-summary { font-size: 13px; color: #e0e7ff; text-align: center; line-height: 1.7; }

.rt-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 10px;
  padding: 10px 24px; font-size: 14px; font-weight: 700; cursor: pointer;
  font-family: inherit; transition: background 0.15s, transform 0.1s; margin-top: 4px;
}
.rt-btn:hover { background: #4f46e5; }
.rt-btn:active { transform: scale(0.96); }`,

  js: `const LANE_KEYS = ['d', 'f', 'j', 'k'];
const LANE_LABELS = ['D', 'F', 'J', 'K'];
const NOTE_SPEED = 260;       // px/s
const HIT_LINE_OFFSET = 56;   // px from bottom, matches .rt-hitline
const NOTE_HEIGHT = 22;
const STAGE_HEIGHT = 440;
const SPAWN_INTERVAL = 850;   // ms between note spawns
const TOTAL_NOTES = 30;
const PERFECT_WINDOW = 14;    // px tolerance from hit line center
const GOOD_WINDOW = 30;

const BEST_KEY = 'rhythm-tap-best-combo';

const stage = document.getElementById('rt-stage');
const scoreEl = document.getElementById('rt-score');
const comboEl = document.getElementById('rt-combo');
const bestEl = document.getElementById('rt-best');
const feedbackEl = document.getElementById('rt-feedback');
const startScreen = document.getElementById('rt-start-screen');
const endScreen = document.getElementById('rt-end-screen');
const summaryEl = document.getElementById('rt-summary');
const tracks = [0, 1, 2, 3].map(i => document.getElementById('track-' + i));
const hitlines = document.querySelectorAll('.rt-hitline');
const keyEls = document.querySelectorAll('.rt-key');

let notes = []; // { lane, el, y, hit }
let score = 0;
let combo = 0;
let bestCombo = parseInt(localStorage.getItem(BEST_KEY) || '0', 10) || 0;
let hits = 0, misses = 0, perfects = 0, goods = 0;
let notesSpawned = 0;
let running = false;
let lastTime = 0;
let spawnTimer = 0;
let rafId = null;

bestEl.textContent = bestCombo;

const hitLineY = STAGE_HEIGHT - HIT_LINE_OFFSET; // px from top

function resetState() {
  notes.forEach(n => n.el.remove());
  notes = [];
  score = 0; combo = 0; hits = 0; misses = 0; perfects = 0; goods = 0; notesSpawned = 0;
  spawnTimer = 0;
  scoreEl.textContent = '0';
  comboEl.textContent = '0';
}

function startGame() {
  resetState();
  running = true;
  startScreen.classList.remove('show');
  endScreen.classList.remove('show');
  lastTime = performance.now();
  rafId = requestAnimationFrame(loop);
}

function spawnNote() {
  const lane = Math.floor(Math.random() * 4);
  const el = document.createElement('div');
  el.className = 'rt-note';
  el.style.top = '-24px';
  tracks[lane].appendChild(el);
  notes.push({ lane, el, y: -24, hit: false });
  notesSpawned++;
}

function loop(now) {
  const dt = Math.min(0.033, (now - lastTime) / 1000);
  lastTime = now;
  if (!running) return;

  spawnTimer += dt * 1000;
  if (spawnTimer >= SPAWN_INTERVAL && notesSpawned < TOTAL_NOTES) {
    spawnTimer = 0;
    spawnNote();
  }

  for (const note of notes) {
    if (note.hit) continue;
    note.y += NOTE_SPEED * dt;
    note.el.style.top = note.y + 'px';
    if (note.y > hitLineY + GOOD_WINDOW + NOTE_HEIGHT) {
      // Passed the hit window unhit — counts as a miss
      registerMiss(note);
    }
  }
  notes = notes.filter(n => !n.consumed);

  if (notesSpawned >= TOTAL_NOTES && notes.length === 0) {
    endRun();
    return;
  }

  rafId = requestAnimationFrame(loop);
}

function registerMiss(note) {
  note.hit = true;
  note.consumed = true;
  note.el.remove();
  misses++;
  combo = 0;
  comboEl.textContent = combo;
  showFeedback('Miss', 'miss');
}

function laneKeyDown(laneIndex) {
  if (!running) return;
  const key = keyEls[laneIndex];
  key.classList.add('pressed');
  setTimeout(() => key.classList.remove('pressed'), 100);

  // Find the closest un-hit note in this lane within the good timing window
  let closest = null;
  let closestDist = Infinity;
  for (const note of notes) {
    if (note.hit || note.lane !== laneIndex) continue;
    const dist = Math.abs(note.y - hitLineY);
    if (dist < closestDist) { closestDist = dist; closest = note; }
  }

  if (closest && closestDist <= GOOD_WINDOW) {
    closest.hit = true;
    closest.consumed = true;
    closest.el.remove();
    hits++;
    combo++;
    if (combo > bestCombo) {
      bestCombo = combo;
      localStorage.setItem(BEST_KEY, String(bestCombo));
      bestEl.textContent = bestCombo;
    }
    comboEl.textContent = combo;
    hitlines[laneIndex].classList.add('flash');
    setTimeout(() => hitlines[laneIndex].classList.remove('flash'), 120);

    if (closestDist <= PERFECT_WINDOW) {
      perfects++;
      score += 100 + combo * 2;
      showFeedback('Perfect', 'perfect');
    } else {
      goods++;
      score += 50 + combo;
      showFeedback('Good', 'good');
    }
    scoreEl.textContent = score;
  }
  // A key press with no note in range is simply ignored (no penalty),
  // matching common rhythm-game leniency for early/late taps.
}

function showFeedback(text, cls) {
  feedbackEl.textContent = text;
  feedbackEl.className = 'rt-feedback show ' + cls;
  void feedbackEl.offsetWidth; // restart animation
  feedbackEl.classList.add('show');
}

function endRun() {
  running = false;
  cancelAnimationFrame(rafId);
  const totalNotes = hits + misses;
  const accuracy = totalNotes ? Math.round((hits / totalNotes) * 100) : 0;
  summaryEl.innerHTML =
    'Score: ' + score + '<br>' +
    'Perfect: ' + perfects + ' &nbsp; Good: ' + goods + ' &nbsp; Miss: ' + misses + '<br>' +
    'Accuracy: ' + accuracy + '% &nbsp; Best Combo: ' + bestCombo;
  endScreen.classList.add('show');
}

document.addEventListener('keydown', (e) => {
  const idx = LANE_KEYS.indexOf(e.key.toLowerCase());
  if (idx !== -1) {
    e.preventDefault();
    laneKeyDown(idx);
  }
});

document.querySelectorAll('.rt-lane').forEach((laneEl, idx) => {
  laneEl.addEventListener('click', () => laneKeyDown(idx));
});

document.getElementById('rt-start-btn').addEventListener('click', startGame);
document.getElementById('rt-restart-btn').addEventListener('click', startGame);`,

  seo: {
    title: 'Rhythm Tap Game — Free HTML CSS JS Snippet',
    description: 'Four-lane falling-note rhythm game with timing-window accuracy, combo streaks and best-combo persistence. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Rhythm Tap Game — Falling-Note Timing Windows, Combo Streaks & Nearest-Note Hit Detection',
      description: `Rhythm games boil down to one core mechanic done well: judging how close a player's input is to a moving target in time, then translating that closeness into a graded result. This snippet implements a genuine four-lane falling-note rhythm game — no audio library, no timing engine dependency, just \`requestAnimationFrame\`, delta-time movement, and a nearest-note matching algorithm that decides what counts as a Perfect, a Good, or a Miss.

**Falling notes driven by delta time**

Every note is a small \`div\` absolutely positioned inside its lane's track, spawned at \`spawnNote()\` with a starting \`y\` of roughly -24px (just above the visible stage). Each frame of the game loop advances every unhit note's \`y\` position by \`NOTE_SPEED * dt\`, where \`dt\` is the real elapsed seconds since the previous frame — exactly the same delta-time approach used in the [Flap & Dodge Obstacle Game](/ui-snippets/flap-dodge-game) snippet — so notes fall at a constant real-world speed no matter the device's refresh rate. Notes are spawned into a random lane on a fixed real-time interval (\`SPAWN_INTERVAL\`) up to a total of \`TOTAL_NOTES\`, giving the run a simple but genuine fixed pattern without needing an actual audio track to sync against.

**Judging a hit: nearest note, distance-based grading**

When a lane's key is pressed, \`laneKeyDown()\` does not simply check "is any note near the line" — it scans every unhit note currently in that lane and finds the one whose vertical distance from the hit line is smallest, because more than one note could theoretically be near the line in a dense pattern. If that closest note's distance falls within \`GOOD_WINDOW\` pixels, it counts as a hit; if it falls within the tighter \`PERFECT_WINDOW\`, it is upgraded to a Perfect. This two-tier distance check is the same principle every rhythm game from arcade cabinets to mobile hits uses, just expressed in pixels-from-the-line instead of milliseconds-from-the-beat, since this snippet is deliberately visual-timing-only rather than audio-synced.

**Combo streaks and score weighting**

A successful hit increments a \`combo\` counter and both Perfect and Good hits scale their score reward by the current combo (\`100 + combo * 2\` for Perfect, \`50 + combo\` for Good), rewarding sustained accuracy the way real rhythm games do. Missing — whether by a note scrolling past the hit line unhit, tracked in the game loop as \`note.y > hitLineY + GOOD_WINDOW + NOTE_HEIGHT\`, or simply never pressing the right key in time — resets \`combo\` back to zero immediately, breaking the streak. The best combo achieved is compared against the running value on every successful hit and persisted to \`localStorage\` the moment a new record is set, so it survives page reloads.

**Ending the run and reporting accuracy**

The run considers itself finished once \`notesSpawned\` reaches \`TOTAL_NOTES\` and the \`notes\` array is empty (meaning every spawned note has either been hit or has scrolled past and been counted as a miss). \`endRun()\` then computes a simple accuracy percentage from hits divided by total judged notes and renders a summary breaking down Perfect, Good, and Miss counts alongside the final score and best combo — giving the player a clear, honest readout of how the run actually went rather than just a single number.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start a run', text: 'Click "Start" on the opening screen. Notes begin spawning into a random lane on a fixed interval (SPAWN_INTERVAL) and immediately start falling toward the hit line at the bottom.' },
        { title: 'Watch the four lanes', text: 'Each of the four lanes is mapped to a key — D, F, J, K — shown as an on-screen label at the bottom hit line of its lane, matching the classic rhythm-game control layout.' },
        { title: 'Hit notes as they cross the line', text: 'Press the matching key (or click/tap the lane) the moment a falling note reaches the hit line. laneKeyDown() finds the closest unhit note in that lane and grades it Perfect or Good based on how close it is to the line.' },
        { title: 'Chain hits into a combo', text: 'Consecutive successful hits build a combo streak shown in the HUD, and both Perfect and Good hits award more score the higher your current combo climbs.' },
        { title: 'Avoid breaking your streak', text: 'A note that scrolls past the hit line without being pressed in time counts as a Miss, immediately resetting your combo back to zero — shown briefly as red "Miss" feedback text.' },
        { title: 'Review your accuracy summary', text: 'After 30 notes have been spawned and resolved, the run ends automatically and shows your final score, Perfect/Good/Miss breakdown, overall accuracy percentage, and your best-ever combo, which persists across sessions via localStorage.' },
      ],
    },
    features: [
      'Delta-time note movement via requestAnimationFrame, keeping fall speed constant across frame rates',
      'Nearest-note matching in laneKeyDown(): scans all unhit notes in a lane to find the closest one to the hit line',
      'Two-tier timing windows (PERFECT_WINDOW and GOOD_WINDOW) producing graded Perfect/Good/Miss judgments',
      'Combo-scaled scoring: both Perfect and Good hits award more points as the current combo streak grows',
      'Automatic miss detection for notes that scroll past the hit line unhit, immediately breaking the combo',
      'Persistent best-combo tracking via localStorage, updated live the instant a new record combo is reached',
      'Fixed-count run (TOTAL_NOTES) with a run-end summary reporting accuracy percentage and a full hit breakdown',
      'Dual input handling: physical keydown for D/F/J/K plus click/tap support directly on each lane',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching timing-window and nearest-match input judging', desc: 'The core challenge in any rhythm or timing-based game is converting a raw input event into a graded result based on proximity to a target. This snippet\'s nearest-note search followed by a two-tier distance check is a clean, minimal teaching example of that pattern, applicable to any game or interactive UI that needs to judge "how close was that" rather than a simple boolean hit/miss.' },
      { icon: 'APP', title: 'Portfolio piece demonstrating multi-lane real-time input handling', desc: 'A working four-lane rhythm game with graded accuracy, combo tracking, and a fair delta-time-driven fall speed is a strong, self-contained demonstration of real-time state management and precise input handling for a portfolio or coding exercise, showing skills well beyond a static UI mockup.' },
      { icon: 'FLOW', title: 'Quick, replayable skill-based diversion embedded in a site', desc: 'A fixed 30-note run with a clear accuracy summary at the end makes this a satisfying quick session for a "just for fun" corner of a personal site, a loading screen, or a break-room panel in an internal tool — short enough to play in under a minute but with a genuine skill ceiling worth returning to beat your best combo.' },
      { icon: 'DESIGN', title: 'Vertical lane and hit-line UI pattern reference', desc: 'The four-lane layout with a shared hit line, flash feedback on successful hits, and floating Perfect/Good/Miss text callouts is a reusable visual pattern for any timing-based or reaction-based mini-game, or for building tutorial/onboarding flows that need to visually confirm a well-timed user action.' },
      { icon: 'CODE', title: 'Base for real audio-synced or difficulty-scaling variants', desc: 'Because note spawning is driven by a simple fixed SPAWN_INTERVAL rather than baked-in beat data, this snippet is a practical starting point for syncing note spawns to an actual audio track\'s timestamps using the Web Audio API, or for a difficulty mode that shortens SPAWN_INTERVAL and tightens the timing windows as the run progresses, similar to how the [Flap & Dodge Obstacle Game](/ui-snippets/flap-dodge-game) could ramp its obstacle speed.' },
      { icon: 'FORM', title: 'Reaction-time and hand-eye coordination practice tool', desc: 'With visual-only timing and no audio dependency, this snippet works well as a lightweight reaction-time or hand-eye coordination exercise embedded in an educational or wellness app, where the accuracy percentage and best-combo tracking give users a concrete, improvable metric over repeated sessions.' },
      { icon: 'CODE', title: 'Related: Sorting Swap Puzzle Game', desc: 'See the [Sorting Swap Puzzle Game](/ui-snippets/sorting-swap-puzzle-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the game decide whether a hit is Perfect or Good?', a: 'When a lane key is pressed, laneKeyDown() finds the closest unhit note currently in that lane by comparing each note\'s vertical distance from the hit line. If that distance is within PERFECT_WINDOW (14px), the hit is graded Perfect and scores 100 plus a combo bonus; if it is further but still within GOOD_WINDOW (30px), it is graded Good and scores 50 plus a smaller combo bonus. If no unhit note in that lane is within GOOD_WINDOW of the line, the key press is simply ignored with no penalty.' },
      { q: 'Why does missing a note reset the combo to zero but pressing an empty lane does not?', a: 'A Miss is only registered when a spawned note fully scrolls past the hit line without ever being hit, tracked each frame in the game loop by checking note.y against the hit line plus the timing window. Pressing a lane key when no note is currently in range is treated as a harmless "air tap" with no consequence, which matches the leniency most rhythm games offer for slightly early or exploratory key presses, rather than punishing every mistimed press as a full miss.' },
      { q: 'Is the note timing synced to real music?', a: 'No — this snippet is deliberately visual-timing-only, spawning notes on a fixed SPAWN_INTERVAL with no audio dependency, as noted in the howToUse steps. To sync it to real music, you would replace the fixed spawn interval with a schedule of timestamps read from an audio analysis or a hand-authored beatmap, and use the Web Audio API\'s currentTime as the authoritative clock instead of requestAnimationFrame\'s delta time alone.' },
      { q: 'How is the best combo persisted, and can I track best score too?', a: 'bestCombo is compared against the current combo on every successful hit inside laneKeyDown(), and the moment a new record is set it is written to localStorage under the key rhythm-tap-best-combo and immediately reflected in the HUD. To also persist best score, add a similar comparison and localStorage.setItem call inside endRun() (or after every score update) using a separate storage key, following the same pattern used for bestCombo.' },
      { q: 'Can I add a fifth lane or remap the keys?', a: 'Yes. Add a matching key to the LANE_KEYS array (and its display label to LANE_LABELS), duplicate a .rt-lane block in the HTML with the next track id and key label, and add a corresponding track div reference in the JS tracks array. Because spawnNote() picks a random lane using Math.floor(Math.random() * 4), you would also update that 4 to match your new total lane count.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how laneKeyDown() picks which note to judge when a key is pressed — the "closest unhit note in this lane" search is the crux of the whole timing system, and understanding it makes every other rhythm-game mechanic easier to reason about. It's also a great snippet to extend with AI assistance: ask it to build a real beatmap-driven variant using the Web Audio API's currentTime as the timing source instead of a fixed spawn interval, add a difficulty mode that shortens the spawn interval and tightens the Perfect/Good windows as the run progresses, or add a visual multiplier badge that appears once your combo crosses certain thresholds. Ask the assistant to sanity-check the miss-detection boundary condition too, since off-by-one errors there are easy to introduce.`,
      prompt: `Build a four-lane falling-note rhythm tap game in plain HTML, CSS, and JavaScript — no frameworks, no libraries, and no real audio/music sync required (visual timing only).

Requirements:
- Four vertical lanes, each mapped to one keyboard key (for example D, F, J, K), with the key shown as an on-screen label at a fixed "hit line" near the bottom of its lane.
- Notes spawn at the top of a randomly chosen lane on a timed schedule and fall downward at a constant speed, using requestAnimationFrame with delta-time-based movement so speed is not tied to frame rate.
- Pressing the correct lane's key while a note is within a small timing window of the hit line must register as a hit, removing that note and awarding a graded result (for example "Perfect" for very close timing versus "Good" for looser timing) rather than a single flat hit result.
- A note that passes the hit line without being hit must count as a "Miss" and immediately reset the current combo streak to zero.
- Track and display a live score, the current combo streak, and the best combo achieved, persisting the best combo across page reloads using localStorage.
- Include a "Start" button that begins spawning notes on a simple fixed pattern, and automatically end the run after a fixed number of notes (for example 30) or a fixed duration, showing a final summary with accuracy percentage and a breakdown of Perfect/Good/Miss counts.
- Support both a physical keydown listener for the mapped keys and a click/tap fallback directly on each lane for touch devices.`,
    },
  },
};

export default rhythmTapGame;
