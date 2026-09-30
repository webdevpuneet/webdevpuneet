const numberSlot = {
    id: 'number-slot',
    title: 'Number Slot Machine',
    category: 'loaders',
    html: `<div class="scene">
  <div class="display">
    <div class="slot-wrap" id="display"></div>
    <span class="currency">USD</span>
  </div>
  <div class="btns">
    <button class="btn" onclick="spinTo(Math.floor(Math.random()*9000+1000))">Random</button>
    <button class="btn accent" onclick="spinTo(99999)">Max</button>
    <button class="btn" onclick="spinTo(0)">Reset</button>
  </div>
  <p class="hint">Each digit spins independently to its target</p>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.scene { display: flex; flex-direction: column; align-items: center; gap: 28px; }

.display { display: flex; align-items: center; gap: 10px; }
.slot-wrap { display: flex; gap: 6px; }

.slot {
  width: 52px; height: 72px;
  background: #1e293b; border: 1px solid #334155;
  border-radius: 10px; overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.3);
}
.slot-inner {
  position: absolute; left: 0; right: 0; top: 0;
  transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
}
.digit {
  height: 72px; display: flex; align-items: center; justify-content: center;
  font-size: 36px; font-weight: 800; color: #f1f5f9;
  font-family: 'Courier New', monospace;
}
.slot::before,.slot::after {
  content: ''; position: absolute; left: 0; right: 0; height: 20px; z-index: 2; pointer-events: none;
}
.slot::before { top: 0;    background: linear-gradient(to bottom,#1e293b,transparent); }
.slot::after  { bottom: 0; background: linear-gradient(to top,#1e293b,transparent); }

.currency { font-size: 13px; font-weight: 700; color: #475569; letter-spacing: 1px; }

.btns { display: flex; gap: 10px; }
.btn { padding: 9px 20px; font-size: 13px; font-weight: 600; border-radius: 8px; cursor: pointer; font-family: inherit; background: #1e293b; color: #64748b; border: 1px solid #334155; transition: all 0.15s; }
.btn:hover { border-color: #6366f1; color: #6366f1; }
.btn.accent { background: #6366f1; color: #fff; border-color: #6366f1; }
.btn.accent:hover { background: #4f46e5; }

.hint { font-size: 12px; color: #334155; }`,
    js: `const DIGITS = 5;
let current = Array(DIGITS).fill(0);

function buildSlots() {
  const wrap = document.getElementById('display');
  wrap.innerHTML = '';
  for (let i = 0; i < DIGITS; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot';
    const inner = document.createElement('div');
    inner.className = 'slot-inner';
    inner.id = 'slot-' + i;
    for (let d = 0; d <= 9; d++) {
      const div = document.createElement('div');
      div.className = 'digit';
      div.textContent = d;
      inner.appendChild(div);
    }
    slot.appendChild(inner);
    wrap.appendChild(slot);
  }
}

function spinTo(num) {
  const padded = String(num).padStart(DIGITS, '0').slice(-DIGITS);
  padded.split('').forEach((ch, i) => {
    const target = parseInt(ch);
    const extra  = Math.floor(Math.random() * 2 + 1) * 10;
    const total  = extra + target;
    const pct    = -(total / 10) * 100;
    const inner  = document.getElementById('slot-' + i);
    inner.style.transition = \`transform \${0.5 + i * 0.08}s cubic-bezier(0.25,0.46,0.45,0.94)\`;
    inner.style.transform  = \`translateY(\${pct}%)\`;
    setTimeout(() => {
      inner.style.transition = 'none';
      inner.style.transform  = \`translateY(\${-target * 10}%)\`;
    }, (0.5 + i * 0.08) * 1000 + 50);
    current[i] = target;
  });
}

buildSlots();
setTimeout(() => spinTo(12345), 300);`,

  seo: {
    title: 'Number Slot Machine — Free HTML CSS JS Snippet',
    description: 'Slot-machine digits that roll to their target on translateY columns with eased motion. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: "Number Slot Machine — translateY Digit Column Scroll & Eased Animation",
      description: `A number slot machine animates digits rolling like a slot machine — each digit column spins through 0-9 and settles on the target number. Used on count-up hero sections, lottery-style reveals, and any metric display that benefits from a reveal animation.

**The digit column structure**

Each digit position is a container showing one digit at a time (\`overflow: hidden\`). Inside is a column of divs for digits 0-9. The visible digit is controlled by \`translateY(-index * height)\` — translating the column up to reveal the digit at the target index.

**The roll animation**

When a new number is set, each digit column animates from its current position through several random intermediate values before settling on the target digit. The animation uses \`requestAnimationFrame\` with easing, and each column has a slightly different timing to create the authentic slot machine feel where digits settle at different moments.

**Use cases**

Live counters that update when new data arrives, lottery number reveals, and score displays all benefit from this animation pattern.

**The column scroll mechanism**

Each digit column contains all 10 digits (0-9) stacked vertically. To show digit 7, the column translates to translateY(-700%). The CSS transition: transform 0.3s cubic-bezier(0.4,0,0.2,1) animates the column scrolling to the target digit. overflow: hidden on the digit window clips the column to show only one digit at a time. For a multi-digit display, each column animates independently with a small staggered delay creating the cascading slot machine roll effect.

**Triggering and reset**

A spin() function picks random target digits and sets each column transform. A staggered animation-delay per column creates the sequential reveal. For a score or counter display, animate to the actual value instead of a random number — compute the target digit for each column position from the number string.

**Sound integration**

For a complete slot machine experience, add a Web Audio API click sound on each column stop. Create a brief 440Hz tone that fades in 0.02s and out in 0.03s using an OscillatorNode and GainNode. Trigger one sound per column as each settles, staggered by the same delay as the visual animation.

**The column scroll mechanism**

Each digit column contains all 10 digits (0-9) stacked vertically. To show digit 7, the column translates to translateY(-700%). The CSS transition: transform 0.3s cubic-bezier(0.4,0,0.2,1) animates the column scrolling to the target digit. overflow: hidden on the digit window clips the column to show only one digit at a time. For a multi-digit display, each column animates independently with a small staggered delay creating the cascading slot machine roll effect.

**Triggering and reset**

A spin() function picks random target digits and sets each column transform. A staggered animation-delay per column creates the sequential reveal. For a score or counter display, animate to the actual value instead of a random number — compute the target digit for each column position from the number string.

**Sound integration**

For a complete slot machine experience, add a Web Audio API click sound on each column stop. Create a brief 440Hz tone that fades in 0.02s and out in 0.03s using an OscillatorNode and GainNode. Trigger one sound per column as each settles, staggered by the same delay as the visual animation.`,
    },
    howToUse: { type: 'steps', items: [
      { title: "Watch the digits roll", text: "The number slot machine spins each digit through 0-9 before settling on the target number." },
      { title: "Click to generate a new number", text: "Click the button to spin to a new random number." },
      { title: "Change the number of digits", text: "Update const DIGITS = 5 in the JS panel." },
      { title: "Set a specific target number", text: "Replace the random logic with a specific number: spinTo([1,2,3,4,5])." },
      { title: "Change spin speed", text: "Update the animation timing values in the spin logic in the JS panel." },
      { title: "Export in your format", text: "Click \"HTML\" for a standalone file, \"JSX\" for a React component, or \"Tailwind\" for a React + Tailwind version." },
    ]},
    features: [
      "Each digit is an overflow:hidden container with a 0-9 column inside",
      "translateY(-digit * height) selects the visible digit in each column",
      "CSS transition on the column element creates the rolling animation",
      "Random intermediate values create the spinning-through effect before settling",
      "Each column settles at a slightly different time for authentic slot feel",
      "Configurable digit count via DIGITS constant",
      "Dark display panel aesthetic matching scoreboards and counters",
      "Export as HTML file, React JSX, or React + Tailwind CSS",
      "Mobile (375px), Tablet (768px), Desktop device preview buttons",
      "Live split-pane editor — preview updates as you type",
    ],
    useCases: [
      { icon: "STAR", title: "Lottery and prize reveal animations", desc: "Animate a prize draw by spinning to the winning number. The slot machine aesthetic adds anticipation." },
      { icon: "APP", title: "Live score and counter displays", desc: "Animate score changes in a game or points system. The rolling digit communicates that the value has updated — for a simple ticking total, the [count-up counter](/ui-snippets/count-up/) is lighter weight." },
      { icon: "DESIGN", title: "OTP and verification code reveals", desc: "Animate one-time code display alongside an [OTP input](/ui-snippets/otp-input/) — each digit rolls in sequentially for a more engaging code presentation." },
      { icon: "LEARN", title: "Learn CSS translateY digit column technique", desc: "The slot uses translateY to scroll through a column of digits. Edit the column height and translateY calculation to understand the positioning." },
      { icon: "FLOW", title: "Dashboard metric animated updates", desc: "When a live metric updates, spin the changed digits only — the unchanged digits remain still while updated ones roll to new values." },
      { icon: "CODE", title: "Countdown timer with slot animation", desc: "Wire to a [countdown timer](/ui-snippets/countdown-timer/): update the digit arrays each second and call spinTo(). The rolling animation makes countdown timers more visually engaging." },
      { icon: 'CODE', title: 'Related: Diagonal Shimmer Skeleton', desc: 'See the [Diagonal Shimmer Skeleton](/ui-snippets/loader-shimmer-diagonal-sweep/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "How does the digit column work?", a: "Each slot position has an overflow: hidden container showing one row. Inside is a column with divs for each digit 0-9. translateY(-index * rowHeight) scrolls the column to show the digit at that index position." },
      { q: "How does the spinning effect work before settling?", a: "Before transitioning to the target digit, the column first scrolls through several random intermediate digit values. The rapid changes create the visual \"spinning\" before the final slow settle." },
      { q: "How do I set a specific number instead of random?", a: "Replace the random digit generation with your target: const target = [7,4,2]; // for 742. Pass this array to the spin function. The digits roll and settle on exactly these values." },
      { q: "How do I change only some digits?", a: "Track the previous value and only trigger the spin animation on columns where the digit changed. Keep unchanged columns at their current translateY position." },
      { q: "Can I use this in React?", a: "Yes. Click \"JSX\" for a React component. Manage the digit array in useState. Trigger the animation in a useEffect when the values change, using CSS transitions on the column elements via useRef." },
      { q: "How do I add a comma separator for large numbers?", a: "After every third digit from the right, insert a separator element between the slot columns in the HTML. Style it as a static comma character between the animated digit columns." },
    ],
    aiPrompt: {
      paragraph: `You don't need to reverse-engineer the two-phase transform swap on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why spinTo computes an extra multiple of 10 percent on top of the target digit before the transition, and why a second setTimeout then snaps the transform to negative target times 10 percent with transition set to none rather than leaving the eased transition to finish on its own. The same assistant can help optimize it — for example asking whether rebuilding buildSlots on every load is wasteful compared to keeping the ten-digit columns permanently in the DOM, or whether the per-digit staggered duration (0.5 plus i times 0.08 seconds) scales sensibly if you extend DIGITS well past five. It's also useful for extending the effect: ask it to only spin the digits that actually changed between calls, add a Web Audio click on each column's settle, or drive spinTo from a live counter instead of the demo buttons. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "slot machine" style rolling digit display in plain HTML, CSS, and JavaScript using only CSS transforms and transitions for the motion — no requestAnimationFrame loop.

Requirements:
- A fixed number of digit slots, each an overflow-hidden container holding one inner column div that itself contains ten stacked digit elements for 0 through 9 in order.
- A spinTo(number) function that pads the number to the slot count with leading zeros, and for each digit position computes a target index 0-9 plus a random extra multiple of ten (so the column visibly scrolls past several full 0-9 loops before landing), expressed as a single translateY percentage on that column's inner element.
- Give each digit column a slightly different transition duration based on its position (e.g. a base duration plus an increasing offset per index) so columns settle at staggered times rather than all at once, mimicking a real mechanical slot machine.
- After each column's transition duration elapses, snap its transform directly to the exact target position with the transition temporarily disabled, so the column ends up exactly aligned regardless of any rounding from the randomized extra spin distance.
- Add fade gradients at the top and bottom edge of each slot window (via pseudo-elements or overlays) so digits appear to scroll in and out smoothly rather than clipping abruptly.
- Include buttons that call spinTo with a random number, a max value, and zero, to demonstrate the roll animation on demand.`,
    },
  }
};

export default numberSlot;
