const bubbleWrapPopper = {
  id: 'bubble-wrap-popper',
  title: 'Bubble Wrap Popper (Stress Relief)',
  lastmod: '2026-08-09',
  category: 'games',
  html: `<div class="wrap-app">
  <div class="wrap-header">
    <h2>Bubble Wrap</h2>
    <div class="counter"><span id="pop-count">0</span> / 80 popped</div>
  </div>
  <div class="sheet" id="sheet"></div>
  <button class="reset-btn" id="reset-btn">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
    Reset sheet
  </button>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #eef2f7; min-height: 100vh; }

.wrap-app { display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 32px 16px; max-width: 560px; margin: 0 auto; }
.wrap-header { display: flex; align-items: center; justify-content: space-between; width: 100%; }
.wrap-header h2 { font-size: 19px; font-weight: 700; color: #1e293b; }
.counter { font-size: 13px; font-weight: 700; color: #6366f1; background: #eef2ff; padding: 6px 12px; border-radius: 20px; }

.sheet {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 7px;
  width: 100%;
  background: linear-gradient(#f8fafc, #eef2f7);
  border: 1px solid #dbe3ee;
  border-radius: 16px;
  padding: 16px;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.04);
}

.bubble {
  aspect-ratio: 1;
  border-radius: 50%;
  cursor: pointer;
  background: radial-gradient(circle at 32% 28%, #ffffff 0%, #dbeafe 45%, #93c5fd 100%);
  box-shadow:
    inset -3px -3px 6px rgba(30,64,175,0.25),
    inset 2px 2px 4px rgba(255,255,255,0.8),
    0 2px 3px rgba(30,41,59,0.08);
  transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
}
.bubble:hover:not(.popped) { transform: scale(1.05); }

.bubble.popping {
  animation: popAnim 0.28s ease-out forwards;
}
@keyframes popAnim {
  0%   { transform: scale(1) rotate(0deg); }
  35%  { transform: scale(0.72) rotate(-6deg); }
  60%  { transform: scale(0.9) rotate(4deg); }
  100% { transform: scale(0.8) rotate(0deg); }
}

.bubble.popped {
  background: radial-gradient(circle at 40% 40%, #eef2f7 0%, #cbd5e1 100%);
  box-shadow: inset 2px 2px 5px rgba(30,41,59,0.25), inset -1px -1px 2px rgba(255,255,255,0.4);
  transform: scale(0.8);
  cursor: default;
}
.bubble:hover.popped { transform: scale(0.8); }

.bubble.reinflate {
  animation: reinflateAnim 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
@keyframes reinflateAnim {
  0%   { transform: scale(0.8); }
  55%  { transform: scale(1.12); }
  100% { transform: scale(1); }
}

.reset-btn {
  display: flex; align-items: center; gap: 7px;
  background: #1e293b; color: #f1f5f9;
  border: none; border-radius: 10px;
  padding: 10px 20px; font-size: 13px; font-weight: 600;
  font-family: inherit; cursor: pointer;
  transition: background 0.15s;
}
.reset-btn:hover { background: #334155; }`,
  js: `const ROWS = 8, COLS = 10, TOTAL = ROWS * COLS;
const sheet = document.getElementById('sheet');
const countEl = document.getElementById('pop-count');
let poppedCount = 0;
let audioCtx = null;

function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playPop() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(520, now);
  osc.frequency.exponentialRampToValueAtTime(140, now + 0.09);
  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.12);
}

function buildSheet() {
  sheet.innerHTML = '';
  for (let i = 0; i < TOTAL; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    b.dataset.index = i;
    b.addEventListener('click', onPop);
    sheet.appendChild(b);
  }
}

function onPop(e) {
  const b = e.currentTarget;
  if (b.classList.contains('popped')) return;
  b.classList.add('popping');
  playPop();
  poppedCount++;
  countEl.textContent = poppedCount;
  b.addEventListener('animationend', function handler() {
    b.classList.remove('popping');
    b.classList.add('popped');
    b.removeEventListener('animationend', handler);
  }, { once: true });
}

function resetSheet() {
  const bubbles = Array.from(sheet.children);
  bubbles.forEach((b, i) => {
    setTimeout(() => {
      if (b.classList.contains('popped')) {
        b.classList.remove('popped');
        b.classList.add('reinflate');
        b.addEventListener('animationend', function handler() {
          b.classList.remove('reinflate');
          b.removeEventListener('animationend', handler);
        }, { once: true });
      }
    }, i * 12);
  });
  poppedCount = 0;
  countEl.textContent = 0;
}

document.getElementById('reset-btn').addEventListener('click', resetSheet);

buildSheet();`,
  seo: {
    title: 'Bubble Wrap Popper — Free HTML CSS JS Stress Relief Snippet',
    description: 'An 80-bubble sheet you actually pop, with satisfying squash animation and synthesized pop sounds. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Bubble Wrap Popper — CSS Squash Animation, Web Audio Pop Synthesis & Staggered Re-Inflation',
      description: `Real bubble wrap is oddly satisfying to pop because it combines three sensory cues at once: a visible pressure change, a physical squash, and a sharp little sound. This snippet reconstructs all three in the browser with an 8x10 grid of 80 individually poppable bubbles, each one a plain \`div\` rendered as a raised plastic dome using layered CSS \`box-shadow\` and \`radial-gradient\`, and permanently flattened once popped so the sheet fills up exactly like the real thing.

**Making a flat div look like a raised bubble**

Each \`.bubble\` is a circle (\`border-radius: 50%\` on a square \`aspect-ratio: 1\` element inside a CSS grid) whose 3D "puffed up" appearance comes entirely from layered shadows and a gradient, no images involved. The background uses \`radial-gradient(circle at 32% 28%, #ffffff, #dbeafe 45%, #93c5fd 100%)\` — the light spot is offset toward the upper-left, mimicking a light source hitting a convex dome. Two \`inset\` shadows reinforce the illusion: a dark inset shadow on the opposite (lower-right) side suggests the shaded underside of the bulge, while a light inset shadow near the highlight corner adds a subtle rim-light. A third, non-inset shadow beneath the whole shape gives it a slight lift off the sheet.

**The pop animation**

Clicking an unpopped bubble adds a \`.popping\` class that runs a single \`@keyframes popAnim\` over 280ms: scale drops sharply to 0.72 with a -6deg rotation (the "squash" and a bit of jitter for a tactile, slightly chaotic feel), overshoots back up to 0.9 with a +4deg rotation, and settles at a permanent 0.8 scale. When the \`animationend\` event fires, the JS swaps \`.popping\` for a persistent \`.popped\` class that flips the gradient to flat greys and swaps the shadow to a fully inset, pressed-in look with no more raised highlight — that's what makes a popped bubble read as genuinely "spent" rather than just temporarily squished, and it stays that way since \`onPop()\` checks \`classList.contains('popped')\` and returns immediately for bubbles that are already flat.

**Synthesizing the pop sound with the Web Audio API**

Rather than loading an audio file, \`playPop()\` builds a tiny two-node graph on demand: an \`OscillatorNode\` whose frequency is swept from 520 Hz down to 140 Hz in 90 milliseconds using \`exponentialRampToValueAtTime\`, layered with a \`GainNode\` envelope that starts at a modest 0.22 and decays to near-silent over 100 milliseconds using the same exponential ramp shape. A falling-pitch, fast-decaying sine burst is a classic, cheap synthesis trick for a soft "thock" or "pop" sound — it's the same principle used for kick-drum and UI-click synthesis, just tuned higher and shorter here to stay gentle rather than loud or jarring. Because it's generated in code, there's no audio file to load and no latency waiting on a network request.

**The staggered reset ripple**

The "Reset sheet" button doesn't snap every bubble back instantly — \`resetSheet()\` iterates the 80 bubbles and staggers each one's re-inflate animation by \`i * 12\` milliseconds using \`setTimeout\`, so the sheet visibly refills in a left-to-right, top-to-bottom ripple over roughly one second. Each bubble's \`.reinflate\` class plays a bouncy \`cubic-bezier(0.34, 1.56, 0.64, 1)\` keyframe that overshoots to 1.12 scale before settling at 1, giving the refill a springy, elastic pop-back feel that mirrors the original pop's overshoot.

**Why it works as a stress-relief interaction**

The appeal of bubble wrap is that each pop is small, irreversible, low-stakes, and immediately rewarding — you get instant visual, physical, and audible confirmation with zero cognitive load. This snippet's live "X / 80 popped" counter adds a light completionist pull that keeps people popping until the sheet is done, and the reset ripple turns "starting over" into its own small moment of visual satisfaction rather than an abrupt reset.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Pop a bubble',
          text: 'Click or tap any raised bubble to pop it. The bubble briefly squashes and jitters via the .popping animation class, plays a short synthesized pop sound through playPop(), and then permanently settles into the flat .popped visual state — clicking an already-popped bubble does nothing.',
        },
        {
          title: 'Watch the live counter',
          text: 'The header counter reads directly from the poppedCount variable, which increments by one inside onPop() every time a fresh bubble is popped. It is updated synchronously with the click, before the animation even finishes, so the number always matches reality immediately.',
        },
        {
          title: 'Reset the whole sheet',
          text: 'Click "Reset sheet" to run resetSheet(), which walks every bubble and, for any currently in the .popped state, removes that class and adds .reinflate with a setTimeout delay of i * 12ms per bubble index — producing the staggered ripple refill rather than an instant snap-back.',
        },
        {
          title: 'Change the grid size',
          text: 'Edit the ROWS and COLS constants at the top of the JS panel (default 8 x 10 = 80) and update grid-template-columns: repeat(10, 1fr) in the CSS to match your new COLS value, then update the "/ 80" text in the HTML header to reflect the new TOTAL.',
        },
        {
          title: 'Tune the pop sound',
          text: 'In playPop(), adjust the frequency sweep (osc.frequency.setValueAtTime(520, now) down to exponentialRampToValueAtTime(140, now + 0.09)) for a higher, lighter or lower, deeper pop, and change the gain.gain starting value (0.22) to make pops louder or quieter relative to your page.',
        },
        {
          title: 'Export and add to your project',
          text: 'Click HTML to download a standalone file, or JSX for a React component. In React, replace the imperative buildSheet()/onPop() DOM manipulation with a poppedIndices state array (e.g. a Set) and derive each bubble\'s className from whether its index is in that set, keeping the same animation classes and timing.',
        },
      ],
    },
    features: [
      'CSS-only raised bubble illusion: radial-gradient highlight + dual inset box-shadow, no images',
      'One-shot popAnim keyframe: scale down with rotation jitter, overshoot, settle — 280ms squash sequence',
      'Permanent .popped state: flattened gradient + fully inset shadow, click-through prevented once popped',
      'Web Audio pop synthesis: exponential frequency sweep 520Hz to 140Hz through a fast-decaying GainNode',
      'Live counter bound directly to poppedCount, updated synchronously on every fresh pop',
      'Staggered ripple reset: setTimeout(i * 12ms) per bubble drives a sequential, not instant, re-inflation',
      'Bouncy reinflateAnim keyframe: cubic-bezier overshoot to 1.12 scale before settling at 1',
      'animationend listeners (once: true) cleanly hand off from transient animation classes to persistent state classes',
    ],
    useCases: [
      {
        icon: 'DESIGN',
        title: 'A genuinely fun micro-break widget on a busy dashboard',
        desc: 'Embed a small 3x3 or 4x4 version of this sheet in the corner of an internal tool, loading screen, or empty state as a bit of stress-relief for users waiting on something. The permanent popped state and satisfying pop sound give it real replay value compared to a purely decorative loading spinner.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching layered box-shadow and radial-gradient for fake 3D surfaces',
        desc: 'The bubble is a strong worked example of building a convincing raised/pressed surface purely with CSS shadows and gradients — a technique also used for neumorphic buttons, toggle switches, and skeuomorphic UI elements, without needing a single image asset.',
      },
      {
        icon: 'CODE',
        title: 'Reference implementation for short procedural sound effects',
        desc: 'The playPop() function is a compact, copy-pasteable pattern for synthesizing any short UI sound effect (clicks, pops, dings) using nothing but an OscillatorNode and GainNode with exponential ramps — useful anywhere you want audio feedback without shipping audio files, similar in spirit to the tone generation in the [Virtual Piano Keyboard](/ui-snippets/virtual-piano-keys).',
      },
      {
        icon: 'APP',
        title: 'A fidget-toy Easter egg on a 404 or empty-state page',
        desc: 'Instead of a plain "nothing here" message, a small bubble sheet gives visitors something playful to interact with while they figure out where to go next, and the reset button lets them replay it without a page reload.',
      },
      {
        icon: 'FLOW',
        title: 'Demonstrating staggered list animations with setTimeout',
        desc: 'The reset ripple is a clean, dependency-free example of staggering an animation across many DOM elements using per-index setTimeout offsets — a pattern directly transferable to staggered card reveals, list re-orders, or grid re-populations in any other project.',
      },
      { icon: 'CODE', title: 'Related: Canvas Kaleidoscope Drawing', desc: 'See the [Canvas Kaleidoscope Drawing](/ui-snippets/canvas-kaleidoscope-drawing/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Inbox Row Expand — Vanilla FLIP Detail View', desc: 'See the [Inbox Row Expand — Vanilla FLIP Detail View](/ui-snippets/inbox-row-expand-flip-detail/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why does a popped bubble stay popped instead of toggling back on click?',
        a: 'onPop() checks classList.contains(\'popped\') at the very top and returns immediately if it is true, so clicks on an already-popped bubble are simply ignored. This intentionally mirrors real bubble wrap, where a popped bubble cannot be re-inflated by hand — the only way back is the deliberate "Reset sheet" action, which is what makes finishing a whole sheet feel like a real accomplishment.',
      },
      {
        q: 'How is the pop sound generated without an audio file?',
        a: 'playPop() creates a fresh OscillatorNode and GainNode for every pop: the oscillator\'s frequency sweeps from 520 Hz down to 140 Hz over 90ms using exponentialRampToValueAtTime, while the gain envelope starts at 0.22 and decays to near-zero over 100ms with the same exponential ramp shape. A fast falling-pitch tone with a quick decay reads as a soft "pop" or "thock" — the same lightweight synthesis trick used for many UI click and notification sounds, avoiding any network request or file size cost.',
      },
      {
        q: 'Why is the reset staggered instead of instant?',
        a: 'resetSheet() delays each bubble\'s re-inflation by i * 12 milliseconds, where i is its index in the grid, so bubble 0 flips almost immediately and bubble 79 flips roughly 950ms later — producing a visible left-to-right, top-to-bottom ripple across the sheet. An instant reset (all 80 bubbles changing in the same frame) is far less satisfying to watch and loses the tactile, sequential feel that makes the pop-and-refill loop enjoyable.',
      },
      {
        q: 'Can I make the bubbles pop on hover instead of click, for a rapid "sweep" pop effect?',
        a: 'Yes — change the addEventListener(\'click\', onPop) call in buildSheet() to addEventListener(\'mouseenter\', onPop), which lets users pop a whole row by dragging their cursor across it. Keep the classList.contains(\'popped\') guard in place so hovering an already-popped bubble is still a no-op, and consider adding a matching touchmove-based handler for a similar swipe-to-pop effect on touch devices.',
      },
      {
        q: 'Does the sound work if the browser autoplay policy blocks audio?',
        a: 'Yes, because getCtx() only creates or resumes the shared AudioContext inside a real click event handler, satisfying every major browser\'s requirement that audio contexts originate from a direct user gesture. There is no autoplay on page load, so no permission or interaction warning is ever triggered.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the layered radial-gradient and inset box-shadow combination on .bubble creates the illusion of a raised 3D dome using only flat CSS, and how that visual state flips when .popped is applied. It's a great base to extend from there — ask the assistant to add a "pop all" button that triggers every bubble in a fast cascading sequence, a small particle-burst effect on pop using a few absolutely-positioned dots that fly outward and fade, or a persistence layer using localStorage so a partially popped sheet survives a page refresh. You could also ask it to vary the pop sound pitch slightly at random for each bubble so a rapid popping streak sounds less repetitive and more like a real sheet of bubble wrap.`,
      prompt: `Build an interactive bubble wrap popping toy in plain HTML, CSS, and JavaScript — an 8x10 grid of 80 poppable bubbles, no external libraries or images.

Requirements:
- Render each bubble as a div styled with CSS gradients and box-shadows to look like a raised, convex plastic bubble, arranged in a responsive grid.
- Clicking or tapping an unpopped bubble must play a short squash-and-settle animation (quick scale-down with a slight rotation jitter, then settle smaller) and permanently switch it to a visually distinct "popped/flat" state that cannot be re-popped or re-inflated by clicking again.
- Trigger a brief, quiet synthesized "pop" sound effect using the Web Audio API on every successful pop — no audio files.
- Maintain and display a live "X / 80 popped" counter that updates the instant a bubble is popped.
- Add a "Reset sheet" button that re-inflates every popped bubble back to its raised state, staggered across the grid so it visibly ripples/refills rather than snapping back all at once instantly.
- Ensure clicking an already-popped bubble is a safe no-op and does not increment the counter or replay the pop animation or sound.
- Keep the whole thing dependency-free and performant even while rapidly popping many bubbles in a row.`,
    },
  },
};

export default bubbleWrapPopper;
