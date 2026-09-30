const spinWheel = {
  id: 'spin-wheel',
  title: 'Spin the Wheel',
  category: 'games',
  lastmod: '2026-06-10',
  html: `<div class="wheel-app">
  <div class="wheel-wrap">
    <div class="pointer"></div>
    <canvas id="wheelCanvas"></canvas>
  </div>
  <button class="spin-btn" id="spinBtn">SPIN</button>
  <div class="items-section">
    <div class="items-label">Wheel Items</div>
    <ul class="item-list" id="itemList"></ul>
    <div class="add-row">
      <input type="text" class="add-input" id="addInput" placeholder="Add item…" maxlength="24" />
      <button class="add-btn" id="addBtn">Add</button>
    </div>
  </div>
  <div class="result-overlay" id="resultOverlay">
    <div class="result-box">
      <div class="result-emoji">🎉</div>
      <div class="result-label">You got:</div>
      <div class="result-winner" id="resultWinner"></div>
      <button class="dismiss-btn" id="dismissBtn">Close</button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  background: #0f172a;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.wheel-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 360px;
  position: relative;
}

.wheel-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
}

#wheelCanvas {
  border-radius: 50%;
  box-shadow: 0 0 0 4px #1e293b, 0 0 0 6px #334155, 0 12px 48px rgba(0,0,0,0.5);
  display: block;
}

.pointer {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 28px solid #f1f5f9;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
  z-index: 10;
}

.spin-btn {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 48px;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 2px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(99,102,241,0.4);
  transition: opacity 0.2s, transform 0.1s;
  user-select: none;
}

.spin-btn:hover { opacity: 0.9; }
.spin-btn:active { transform: scale(0.97); }
.spin-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

.items-section {
  width: 100%;
  background: #1e293b;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #334155;
}

.items-label {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.item-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
  max-height: 200px;
  overflow-y: auto;
}

.item-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  background: #0f172a;
  border: 1px solid #334155;
}

.item-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.item-text {
  flex: 1;
  font-size: 13px;
  color: #e2e8f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.remove-btn {
  background: none;
  border: none;
  color: #475569;
  cursor: pointer;
  font-size: 15px;
  line-height: 1;
  padding: 2px 4px;
  border-radius: 4px;
  transition: color 0.15s;
  flex-shrink: 0;
}

.remove-btn:hover { color: #ef4444; }

.add-row {
  display: flex;
  gap: 8px;
}

.add-input {
  flex: 1;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #e2e8f0;
  font-size: 13px;
  padding: 8px 10px;
  outline: none;
  transition: border-color 0.2s;
}

.add-input:focus { border-color: #6366f1; }
.add-input::placeholder { color: #475569; }

.add-btn {
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}

.add-btn:hover { opacity: 0.85; }

/* Result overlay */
.result-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.25s ease;
}

.result-overlay.active { display: flex; }

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.result-box {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 20px;
  padding: 36px 40px;
  text-align: center;
  box-shadow: 0 24px 64px rgba(0,0,0,0.6);
  animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
  max-width: 280px;
  width: 90%;
}

@keyframes popIn {
  from { transform: scale(0.6); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}

.result-emoji { font-size: 48px; margin-bottom: 8px; }
.result-label { font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
.result-winner {
  font-size: 26px;
  font-weight: 800;
  color: #f1f5f9;
  margin-bottom: 24px;
  word-break: break-word;
}

.dismiss-btn {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}

.dismiss-btn:hover { opacity: 0.85; }`,

  js: `const COLORS = ['#ef4444','#f97316','#eab308','#22c55e','#14b8a6','#3b82f6','#8b5cf6','#ec4899'];
const DURATION = 4800; // ms

let items = ['Prize 1','Prize 2','Prize 3','Prize 4','Prize 5','Free Spin','Bonus','Try Again'];
let rotation = 0;
let spinning = false;
let audioCtx = null;
let lastTickSegment = -1;

const canvas   = document.getElementById('wheelCanvas');
const ctx      = canvas.getContext('2d');
const spinBtn  = document.getElementById('spinBtn');
const addBtn   = document.getElementById('addBtn');
const addInput = document.getElementById('addInput');
const itemList = document.getElementById('itemList');
const resultOverlay = document.getElementById('resultOverlay');
const resultWinner  = document.getElementById('resultWinner');
const dismissBtn    = document.getElementById('dismissBtn');

function resize() {
  const size = Math.min(300, window.innerWidth - 48);
  canvas.width  = size;
  canvas.height = size;
  canvas.style.width  = size + 'px';
  canvas.style.height = size + 'px';
  drawWheel();
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function drawWheel() {
  const n   = items.length;
  const cx  = canvas.width  / 2;
  const cy  = canvas.height / 2;
  const r   = cx - 4;
  const arc = (2 * Math.PI) / n;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < n; i++) {
    const start = rotation + i * arc - Math.PI / 2;
    const end   = start + arc;

    // Segment fill
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();

    // Segment border
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Label
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = \`bold \${Math.max(10, Math.min(13, Math.floor(r * 0.18)))}px system-ui, sans-serif\`;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 3;
    const label = items[i].length > 10 ? items[i].slice(0, 9) + '…' : items[i];
    ctx.fillText(label, r - 10, 5);
    ctx.restore();
  }

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#0f172a';
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function getWinnerIndex() {
  const n   = items.length;
  const arc = (2 * Math.PI) / n;
  // Pointer is at top (−π/2). Normalize rotation so segment 0 starts at top.
  let angle = ((-rotation) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  return Math.floor(angle / arc) % n;
}

function getSegmentAtAngle(rot) {
  const n   = items.length;
  const arc = (2 * Math.PI) / n;
  let angle = ((-rot) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  return Math.floor(angle / arc) % n;
}

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playTick() {
  if (!audioCtx) return;
  try {
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(820, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.03);
  } catch (_) {}
}

function spin() {
  if (spinning || items.length < 2) return;
  initAudio();
  spinning = true;
  spinBtn.disabled = true;
  lastTickSegment = getSegmentAtAngle(rotation);

  const extraRotations = (5 + Math.random() * 5) * 2 * Math.PI;
  const segmentArc     = (2 * Math.PI) / items.length;
  // random winner index
  const winnerIdx   = Math.floor(Math.random() * items.length);
  // angle so winnerIdx ends under pointer
  const winnerAngle = winnerIdx * segmentArc + segmentArc * (0.2 + Math.random() * 0.6);
  const targetDelta = extraRotations + winnerAngle;

  const startRotation = rotation;
  const startTime     = performance.now();

  function frame(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / DURATION, 1);
    const eased    = easeOutCubic(progress);

    rotation = startRotation + targetDelta * eased;
    drawWheel();

    // Tick sound on segment boundary crossing
    const currentSeg = getSegmentAtAngle(rotation);
    if (currentSeg !== lastTickSegment) {
      playTick();
      lastTickSegment = currentSeg;
    }

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      rotation = startRotation + targetDelta;
      drawWheel();
      spinning = false;
      spinBtn.disabled = false;

      const winner = items[getWinnerIndex()];
      resultWinner.textContent = winner;
      resultOverlay.classList.add('active');
    }
  }

  requestAnimationFrame(frame);
}

function renderItemList() {
  itemList.innerHTML = '';
  items.forEach((item, i) => {
    const li   = document.createElement('li');
    const dot  = document.createElement('span');
    dot.className = 'item-dot';
    dot.style.background = COLORS[i % COLORS.length];
    const text = document.createElement('span');
    text.className = 'item-text';
    text.textContent = item;
    const btn  = document.createElement('button');
    btn.className = 'remove-btn';
    btn.setAttribute('aria-label', 'Remove ' + item);
    btn.textContent = '×';
    btn.dataset.index = i;
    li.appendChild(dot);
    li.appendChild(text);
    li.appendChild(btn);
    itemList.appendChild(li);
  });
}

function addItem() {
  const val = addInput.value.trim();
  if (!val) return;
  items.push(val);
  addInput.value = '';
  renderItemList();
  drawWheel();
}

function removeItem(index) {
  if (items.length <= 2) return;
  items.splice(index, 1);
  renderItemList();
  drawWheel();
}

// Event listeners
spinBtn.addEventListener('click', spin);

addBtn.addEventListener('click', addItem);

addInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') addItem();
});

itemList.addEventListener('click', function(e) {
  const btn = e.target.closest('.remove-btn');
  if (!btn) return;
  removeItem(Number(btn.dataset.index));
});

dismissBtn.addEventListener('click', function() {
  resultOverlay.classList.remove('active');
});

resultOverlay.addEventListener('click', function(e) {
  if (e.target === resultOverlay) resultOverlay.classList.remove('active');
});

window.addEventListener('resize', resize);

// Init
resize();
renderItemList();`,

  about: {
    title: 'Spin the Wheel — JavaScript Canvas Fortune Wheel',
    description: 'A customizable fortune wheel in HTML Canvas and vanilla JavaScript. Smooth deceleration, tick sounds via Web Audio API, editable items, and winner overlay.',
    about: `The spinning wheel is one of the most universally recognizable interactive elements in both physical and digital spaces. From game shows to classroom engagement tools, from raffle draws to restaurant menus, the wheel spinner has a unique appeal: the outcome is random, the animation is satisfying, and the anticipation during the spin is genuinely exciting.\n\nThis snippet builds a fully functional fortune wheel using the HTML Canvas API and vanilla JavaScript — no external libraries, no WebGL, no dependencies. The wheel draws itself, spins with realistic deceleration, plays subtle tick sounds, and reveals the winner in a clean overlay.\n\n**Canvas rendering**\n\nThe wheel is drawn on an HTML Canvas element each animation frame. Each segment is an arc slice computed with Math.PI angles. The label for each segment is rotated to sit along the segment\'s midpoint radius, using ctx.save(), ctx.rotate(), and ctx.restore() to manage the canvas transform stack. A fixed triangle pointer (a CSS element, not drawn on canvas) sits at the top center and points to the winning segment.\n\n**Spin physics**\n\nWhen the Spin button is clicked, a random target rotation is chosen — at least 5 full rotations (10π radians) plus a random offset that determines the winner. The animation uses requestAnimationFrame with a cubic ease-out easing function: fast at the start, progressively slower toward the end, mimicking real friction. Total spin duration is 4–5 seconds.\n\n**Winner calculation**\n\nThe winner is determined by the final rotation angle modulo 2π, divided into equal segments. Because the target rotation is set before the animation starts, the result is known immediately — the animation is purely cosmetic. This allows you to override the winner for weighted odds if needed.\n\n**Tick sounds**\n\nAs the wheel rotates, a tick plays each time the pointer crosses a segment divider. This is implemented with the Web Audio API — a short sine wave oscillator burst, 30ms long, at around 800Hz. The tick rate naturally slows as the wheel decelerates, creating an authentic "spinning wheel" audio experience.\n\n**Editable items**\n\nBelow the wheel, a simple item list lets users add and remove segments before spinning. The wheel redraws instantly when the list changes. Items are stored in a plain array.

**Web Audio API tick sound**

The tick sound is generated entirely in the browser using the Web Audio API -- no sound files needed. Each tick creates a short oscillator node (sine wave at 820 Hz) with an exponential gain ramp that decays to near-zero in 30ms, then disconnects. The tick fires each time the spinning wheel crosses a segment boundary, detected by comparing the current segment index against the previous frame. As the wheel decelerates, ticks become less frequent, creating the satisfying slowing-down rhythm heard on game shows.

**easeOutCubic deceleration**

The spin animation uses \`easeOutCubic(t) = 1 - (1 - t)^3\` as its timing function. This starts fast and decelerates smoothly to a stop -- matching how a real wheel with friction behaves. The animation runs for a fixed 4800ms duration. The target rotation is calculated before the spin starts: a random number of extra full rotations (5-10) plus the exact angle needed to land the winning segment under the pointer. This means the winner is determined at spin-start, not when the wheel stops.`,
    howToUse: [
      { step: 'Edit items', desc: 'Add or remove segments using the item list below the wheel — the canvas redraws in real time.' },
      { step: 'Spin', desc: 'Click the SPIN button. The wheel accelerates instantly and decelerates over 4–5 seconds.' },
      { step: 'Listen', desc: 'Hear the tick sounds slow down as the wheel loses speed — the rate matches the rotation.' },
      { step: 'Read the result', desc: 'When the wheel stops, a winner overlay displays the selected segment.' },
      { step: 'Spin again', desc: 'Dismiss the overlay and spin again — results are random each time.' },
      { step: 'Customize', desc: 'Change the items array in JS or adjust DURATION and colors to match your use case.' },
    ],
    features: [
      { title: 'Canvas wheel rendering', desc: 'Smooth arc-based drawing of segments with labels — redraws instantly when items change.' },
      { title: 'Cubic ease-out spin', desc: 'Realistic deceleration physics — fast start, gradual slowdown over 4–5 seconds.' },
      { title: 'Tick sounds', desc: 'Web Audio API tick on each segment boundary crossing — rate slows naturally with the wheel.' },
      { title: 'Editable item list', desc: 'Add or remove segments before spinning — the wheel redraws in real time.' },
      { title: 'Winner overlay', desc: 'A clear result announcement with dismiss button after the spin completes.' },
      { title: 'Zero dependencies', desc: 'Pure Canvas and vanilla JS — no libraries, works in any modern browser.' },
    ],
    useCases: [
      { title: 'Raffle & Prize Giveaway Tools', desc: 'Spin to pick a random winner from a list of names, email addresses, or ticket numbers. Import entries from a text input or CSV — the same pattern as Wheel of Names. Trigger a [confetti animation](/ui-snippets/confetti-button/) when the result is revealed.' },
      { title: 'Classroom & Teaching Engagement', desc: 'Randomly select students to answer questions, assign tasks, or pick discussion topics. Teachers love wheel spinners because they are fair, transparent, and exciting. Pair with a [countdown timer](/ui-snippets/countdown-timer/) to time each response.' },
      { title: 'Restaurant & Food Decision Picker', desc: '"Spin for dinner" — add restaurant names or cuisines and spin to resolve the eternal "where should we eat?" debate. More fun than a [poll widget](/ui-snippets/poll-widget/) for small groups.' },
      { title: 'Marketing Activations & Trade Shows', desc: 'Live event prize wheels for booth engagement at conferences and trade shows. Visitors spin for branded merchandise, discount codes, or upgrades. Trigger a [confetti animation](/ui-snippets/confetti-button/) when a prize is won.' },
      { title: 'Game Mechanics & Chance Elements', desc: 'Use the wheel as a random action selector in browser games — spin for power-ups, penalties, or special rounds. The canvas and tick audio create authentic game-show energy. Track scores with a [bar chart](/ui-snippets/bar-chart/).' },
      { title: 'Team Retrospectives & Standups', desc: 'Randomly assign speaking order in team meetings or pick retrospective topics. Pair with a [countdown timer](/ui-snippets/countdown-timer/) to time each speaker.' },
    ],
    faqs: [
      { q: 'How do I add weighted odds (some items more likely than others)?', a: 'Add a weight property to each item. When calculating the target angle, build a weighted random selection: map items to angle ranges proportional to their weight. The visual segment size stays equal; only the probability changes.' },
      { q: 'How do I disable the tick sound?', a: 'Remove or comment out the playTick() call inside the animation loop. The rest of the spin animation is unaffected.' },
      { q: 'Can I import names from a text list?', a: 'Yes — add a textarea input, split its value by newlines, filter empty strings, and set the items array. Call drawWheel() to update the canvas.' },
      { q: 'How do I change the spin duration?', a: 'Change the DURATION constant (in milliseconds) at the top of the JS. Longer values give a more dramatic spin; shorter values feel snappier.' },
      { q: 'How do I add weighted odds (make some items more likely)?', a: 'Add a weight property to each item object. Build a weighted random selection before the spin: create an array where each item appears weight times. Pick a random index from that expanded array to get the winner index, then compute the target angle to land on that segment. The visual wheel segments remain equal size; only the probability changes.' },
    ],
  },

  seo: {
    title: 'Spin the Wheel HTML CSS JS — Canvas Prize Wheel',
    description: 'Canvas prize wheel with requestAnimationFrame easing, Web Audio API tick sounds, dynamic arc segments, item editor, and winner overlay. No dependencies.',
    about: {
      title: 'Spin the Wheel — How to Build an Animated Canvas Prize Wheel with Web Audio Tick Sounds in JavaScript',
      description: `A spin-the-wheel randomizer is one of the most kinetically satisfying UI components you can build — the smooth deceleration, the ticking sound on each segment, and the winner reveal all feel rewarding in a way that a random number generator does not. Building it correctly requires mastering four distinct browser technologies: Canvas 2D for drawing the wheel, requestAnimationFrame for smooth animation, the Web Audio API for the tick sounds, and pointer events for the spin interaction.\n\nThis snippet builds a complete, fully interactive prize wheel with editable items, dynamic segment drawing, requestAnimationFrame-based easing, Web Audio tick sounds, and a winner overlay — all in plain JavaScript with no external libraries.\n\n## Canvas 2D Arc Drawing\n\nThe wheel is drawn on an HTML \`<canvas>\` element using the Canvas 2D API. Each prize segment is a pie slice drawn with \`ctx.beginPath()\`, \`ctx.moveTo(cx, cy)\`, \`ctx.arc(cx, cy, radius, startAngle, endAngle)\`, \`ctx.closePath()\`. The arc command takes angles in radians: \`startAngle = rotation + i * segmentAngle\`, \`endAngle = startAngle + segmentAngle\`, where \`segmentAngle = 2 * Math.PI / items.length\`.\n\nThe fill color cycles through the COLORS array by index: \`ctx.fillStyle = COLORS[i % COLORS.length]\`. After filling, the text label is drawn: \`ctx.save()\`, translate to the arc midpoint, rotate to align with the segment, \`ctx.fillText(item)\`, \`ctx.restore()\`. The text position: translate to \`(cx + cos(midAngle) * (radius * 0.6), cy + sin(midAngle) * (radius * 0.6))\` — 60% of the way from center to edge along the segment midpoint angle.\n\nThe entire \`drawWheel(rotation)\` function is called on every animation frame, passing the current rotation offset. This re-draws all segments at the new angle, creating the animation.\n\n## The Pointer Triangle\n\nA CSS triangle (\`<div class="pointer">\`) sits at the top of the wheel and marks the winning segment. It uses the \`border\` trick: a zero-width/height div with \`border-left: 14px solid transparent; border-right: 14px solid transparent; border-top: 24px solid #fff\` creates a downward-pointing triangle. The pointer is purely CSS — no SVG, no canvas.\n\nThe winning segment is determined by which segment is under the pointer at the end of the spin. Since the pointer is at the 12 o\'clock position (−90° = top of canvas), the winning segment is: \`((2 * Math.PI - (finalRotation % (2 * Math.PI))) / segmentAngle)\` rounded to get the segment index.\n\n## requestAnimationFrame Easing\n\nThe spin animation uses a cubic ease-out deceleration. A random target rotation is computed: \`targetRotation = rotation + (Math.PI * 2 * spinCount) + randomOffset\` where \`spinCount\` is 4–6 full rotations and \`randomOffset\` is a random fraction of a full rotation. This ensures the wheel spins multiple times before landing on a random segment.\n\nOn each animation frame: \`t = (now - startTime) / DURATION\` (where DURATION is 4800ms). The easing: \`ease = 1 - Math.pow(1 - t, 4)\` — a quartic ease-out that starts fast and decelerates dramatically near the end, simulating physical wheel inertia. \`currentRotation = startRotation + (targetRotation - startRotation) * ease\`. When \`t >= 1\`, the animation stops, the final rotation is set, and the winner is computed.\n\n## Web Audio API Tick Sounds\n\nThe tick sound plays each time the pointer crosses a new segment during the spin. An \`AudioContext\` is created lazily on first user interaction (required by browser autoplay policy). On each animation frame, the current segment under the pointer is computed: \`currentSegment = Math.floor((2*Math.PI - normalizedRotation) / segmentAngle) % items.length\`. If \`currentSegment !== lastTickSegment\`, a tick plays and \`lastTickSegment\` updates.\n\nThe tick is synthesized with the Web Audio API: \`const osc = audioCtx.createOscillator()\`, \`osc.frequency.value = 880\` (Hz), \`osc.connect(gainNode)\`, \`gainNode.gain.setValueAtTime(0.15, now)\`, \`gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04)\`, \`osc.start()\`, \`osc.stop(now + 0.05)\`. This creates a brief 880Hz click that naturally fades out — no audio files, no WAV/MP3 loading required.\n\nThe tick frequency increases as the wheel decelerates: early in the spin, segments flash past quickly and ticks blend together. As the wheel slows, individual ticks become audible. This matches the physics of a real ratchet wheel.\n\n## Dynamic Segment Count and Item Editor\n\nThe wheel dynamically redraws when items are added or removed. Items are stored in a JavaScript array. \`renderItemList()\` creates a \`<li>\` element for each item with a delete button. \`drawWheel()\` always reads \`items.length\` to compute \`segmentAngle\` and cycles through COLORS by index.\n\nAdding an item: the Add button reads the input value, validates it (non-empty, under max length), pushes it to the array, calls \`renderItemList()\` and \`drawWheel(rotation)\`. Removing an item: the delete button calls \`items.splice(index, 1)\` and re-renders. The wheel instantly shows the updated segments with equal-width arcs.\n\n## Responsive Canvas Sizing\n\nThe canvas is resized on load and \`window.resize\` via \`resize()\`: \`const size = Math.min(300, window.innerWidth - 48)\`. This caps the canvas at 300px and reduces it on narrow screens. \`canvas.width = canvas.height = size\` sets the pixel buffer, and \`canvas.style.width = canvas.style.height = size + "px"\` sets the CSS display size to match (1:1 pixel density by default, higher on devicePixelRatio screens if scaled).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Spin the wheel', text: 'Click the SPIN button. The wheel accelerates, spins through 4–6 full rotations with a ticking sound on each segment, then decelerates and stops on a random winner.' },
        { title: 'See the winner', text: 'A result overlay appears showing the winning item. Click Dismiss to close it and spin again.' },
        { title: 'Add items', text: 'Type a new item in the input field below the wheel and click Add (or press Enter). The wheel redraws immediately with an additional equal-width segment.' },
        { title: 'Remove items', text: 'Click the × button next to any item in the list to remove it. The wheel redraws with one fewer segment. Minimum 2 items required to spin.' },
        { title: 'Enable sound', text: 'The tick sound uses Web Audio API and requires a user gesture. Click SPIN once to unlock the AudioContext. Subsequent spins play the tick automatically.' },
        { title: 'Customize the wheel', text: 'Edit the COLORS array to change segment colors. Edit the initial items array for default options. Change DURATION for faster or slower spins.' },
      ],
    },
    features: [
      'Canvas 2D arc: ctx.arc(cx, cy, r, startAngle, endAngle) per segment, text at 60% radius along midpoint angle',
      'requestAnimationFrame easing: quartic ease-out 1-Math.pow(1-t,4) over 4800ms — physics-feel deceleration',
      'Random target: spinCount(4-6) full rotations + randomOffset for landing position — different winner every spin',
      'Web Audio tick: createOscillator 880Hz + exponentialRampToValueAtTime 0.04s fade — no audio files needed',
      'Segment change detection: currentSegment computed per frame, tick fires only on segment boundary crossing',
      'Winner computation: (2π - normalizedRotation) / segmentAngle gives index of segment under 12 o\'clock pointer',
      'CSS pointer triangle: border trick (transparent left/right, colored top border) — downward pointing arrow',
      'Dynamic item editor: items array + renderItemList() + drawWheel() called on add/remove for instant update',
      'Responsive canvas: Math.min(300, innerWidth-48) sizing, canvas.width=height=size on window resize',
    ],
    useCases: [
      { icon: 'STAR', title: 'Giveaway & Prize Draw Tools', desc: 'Run live prize draws on streams, at events, or in marketing campaigns. Enter participant names, spin, and the winner is selected fairly at random. The animation and sound make the reveal feel exciting and dramatic rather than just picking a number.' },
      { icon: 'LEARN', title: 'Classroom Random Selector & Ice Breakers', desc: 'Teachers use random selectors to call on students fairly, assign random topics for presentations, or pick teams. The spin animation adds playful drama to otherwise dry classroom administration. Add student names to the wheel and spin for cold calling.' },
      { icon: 'FLOW', title: 'Decision Maker & Random Choice Tool', desc: 'Can\'t decide where to eat, what movie to watch, or which task to tackle first? Spin the wheel. The wheel works for any binary or multi-option decision. The forced random choice removes decision fatigue for low-stakes choices.' },
      { icon: 'APP', title: 'Gamified Onboarding Rewards & Loyalty Programs', desc: 'Reward users with a spin-the-wheel moment after completing onboarding, making a purchase, or hitting a milestone. The random prize (discount, bonus, free item) creates excitement and reinforces the desired behavior. Connect the winner result to your backend rewards system.' },
      { icon: 'CODE', title: 'Canvas 2D & Web Audio API Study Reference', desc: 'Study the complete implementation of Canvas 2D arc drawing, requestAnimationFrame animation with easing, Web Audio API oscillator synthesis, and segment crossing detection. These four browser APIs appear across games, data visualizations, and interactive media — this is a compact working example of all four together.' },
      { icon: 'DESIGN', title: 'Interactive Event & Conference Engagement', desc: 'Use at trade show booths, conference sessions, or product launch events. Attendees input their names, spin for a prize, and the dramatic deceleration animation makes the reveal memorable. The item editor lets event staff customize prizes on the fly without code changes.' },
    ],
    faqs: [
      { q: 'How does the requestAnimationFrame easing make the wheel decelerate naturally?', a: 'A random target rotation is calculated before the spin starts: startRotation + full rotations + random landing offset. On each animation frame, t = (elapsed / DURATION) gives progress 0–1. The ease = 1 - Math.pow(1-t, 4) quartic ease-out maps that linear progress to a curve that moves quickly at the start and extremely slowly at the end. currentRotation = startRotation + (targetRotation - startRotation) * ease. The deceleration near t=1 creates the "slowing to a stop" feel. Because the target rotation is fixed before the animation starts, the winner is always deterministic — the easing only affects the visual path, not the outcome.' },
      { q: 'How does the Web Audio tick sound work without an audio file?', a: 'An OscillatorNode is created: const osc = audioCtx.createOscillator(); osc.type = "sine"; osc.frequency.value = 880. A GainNode applies a fast volume envelope: gainNode.gain.setValueAtTime(0.15, now) sets the initial volume, and gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04) fades it to near-zero over 40ms. osc.start(now); osc.stop(now + 0.05) plays a 50ms burst. The AudioContext is created lazily on first user interaction to comply with browser autoplay policy — iOS and Chrome require a gesture before creating an AudioContext.' },
      { q: 'How do I determine which segment won?', a: 'After the spin stops, finalRotation is the total accumulated rotation in radians. normalizedRotation = ((finalRotation % (2*Math.PI)) + 2*Math.PI) % (2*Math.PI) normalizes it to 0–2π. The pointer is at the top (12 o\'clock = -π/2). The segment under the pointer: segmentIndex = Math.floor((2*Math.PI - normalizedRotation + Math.PI/2) / segmentAngle) % items.length. The winner is items[segmentIndex]. The exact formula depends on where segment 0 starts in your drawing code.' },
      { q: 'How do I add a minimum number of items or prevent spinning with fewer than 2?', a: 'Check items.length before spinning: if (items.length < 2) { alert("Add at least 2 items to spin"); return; }. For the delete button, check after splice: if (items.length < 1) { items.push("Default"); }. You can also disable the SPIN button via spinBtn.disabled = items.length < 2 and re-enable it in renderItemList() after adds. Style the disabled state with CSS: .spin-btn:disabled { opacity: 0.5; cursor: not-allowed; }.' },
      { q: 'How do I save the wheel items so they persist after page refresh?', a: 'After any add or remove operation, call: localStorage.setItem("wheel-items", JSON.stringify(items)). On page load: const saved = localStorage.getItem("wheel-items"); if (saved) { items = JSON.parse(saved); } else { items = defaultItems; }. Call renderItemList() and drawWheel(0) after loading. This persists the item list across refreshes. For multi-user or multi-device persistence, save to your backend API instead.' },
      { q: 'Can I use this spin wheel in React, Vue, or Angular?', a: 'Yes. Click JSX for React, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a utility-class build. In React, store the accumulated rotation in a ref (not state) so the CSS transition animates from the previous angle, and read the winning segment in a transitionend handler.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the winner-before-animation-starts logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the target rotation (extraRotations plus winnerAngle) is calculated once at the start of spin() rather than the winner being read off wherever the wheel happens to stop, or how getSegmentAtAngle compares the current animation frame's rotation against lastTickSegment to know exactly when to fire a Web Audio tick. The same assistant can help optimize it, for instance checking whether drawWheel's full clearRect-and-redraw-every-segment approach on every requestAnimationFrame call would still hit 60fps with thirty or forty wheel items instead of eight. It is just as useful for extending the wheel: ask it to add per-item weighted odds so some prizes are statistically more likely without changing their visual segment size, persist the item list to localStorage across reloads, or add a confetti burst timed to the exact moment the result overlay appears. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a canvas-based "spin the wheel" prize randomizer in plain HTML, CSS, and JavaScript using the Canvas 2D API, requestAnimationFrame, and the Web Audio API — no libraries, no external audio files.

Requirements:
- A canvas wheel divided into equal arc segments (one per item in a JavaScript array), each drawn with ctx.arc using a shared center and radius, filled with a distinct color cycling through a fixed palette, with the item's label drawn rotated to align along that segment's midpoint angle.
- A fixed CSS-only triangle pointer (built from transparent side borders and a solid top border, not an image or SVG) positioned at the top center of the wheel, marking the winning segment.
- When the spin button is clicked: pick a random winning item index BEFORE the animation starts, compute the exact total rotation delta needed to land that segment under the top pointer (several full extra rotations for visual flourish, plus the precise angular offset to the winning segment, with a small random offset within that segment so it doesn't always land dead-center), and store that as a fixed target — the visual animation must never determine the outcome; the outcome is decided before the first frame renders.
- Animate the wheel's rotation from its current value to that pre-computed target over a fixed duration (several seconds) using requestAnimationFrame and a cubic (or quartic) ease-out timing function, so the spin starts fast and decelerates smoothly to a stop like a physical wheel with friction.
- On every animation frame, determine which segment currently sits under the pointer, and each time that segment index changes from the previous frame, synthesize and play a very short percussive tick sound using a Web Audio oscillator node with an exponential gain ramp down to near-silence, with the AudioContext created lazily on the first user gesture (not on page load).
- After the animation completes, display the pre-determined winning item's label in a result overlay, and provide UI to add and remove wheel items live, redrawing the wheel with correctly re-divided equal segments whenever the item count changes (refusing to spin below two items).`,
    },
  },
};

export default spinWheel;
