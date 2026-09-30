const coinFlip = {
  id: 'coin-flip',
  title: 'Coin Flip',
  lastmod: '2026-06-23',
  category: 'games',
  html: `<div class="cf-stage">
  <div class="cf-scene">
    <div class="cf-coin" id="cfCoin">
      <div class="cf-side cf-heads">H</div>
      <div class="cf-side cf-tails">T</div>
    </div>
  </div>
  <button type="button" class="cf-btn" id="cfBtn">Flip coin</button>
  <p class="cf-result" id="cfResult">Heads or tails?</p>
  <p class="cf-tally" id="cfTally"></p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center}

.cf-stage{display:flex;flex-direction:column;align-items:center;gap:22px}
.cf-scene{perspective:800px}
.cf-coin{position:relative;width:110px;height:110px;transform-style:preserve-3d;transition:transform 1.1s cubic-bezier(.3,.7,.4,1);transform:rotateY(0)}

.cf-side{position:absolute;inset:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:900;backface-visibility:hidden;box-shadow:inset 0 0 0 5px rgba(0,0,0,.12),0 10px 24px rgba(0,0,0,.35)}
.cf-heads{background:radial-gradient(circle at 35% 30%,#fde68a,#f59e0b);color:#7c2d12}
.cf-tails{background:radial-gradient(circle at 35% 30%,#e2e8f0,#94a3b8);color:#334155;transform:rotateY(180deg)}

.cf-btn{background:#6366f1;color:#fff;border:none;border-radius:11px;padding:12px 28px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;transition:background .15s,transform .1s}
.cf-btn:hover{background:#4f46e5}
.cf-btn:active{transform:scale(.95)}
.cf-btn:disabled{opacity:.6;cursor:default}
.cf-result{color:#e2e8f0;font-size:15px;font-weight:800;min-height:20px}
.cf-tally{color:#64748b;font-size:12.5px;font-weight:600;min-height:16px}`,

  js: `var coin = document.getElementById('cfCoin');
var btn = document.getElementById('cfBtn');
var result = document.getElementById('cfResult');
var tally = document.getElementById('cfTally');

var turns = 0;          // accumulated half-rotations so the coin always spins forward
var counts = { Heads: 0, Tails: 0 };

function flip() {
  var heads = Math.random() < 0.5;
  // Heads shows at an even multiple of 180deg, tails at an odd one. Add several
  // full spins on top so the coin visibly tumbles before landing.
  var landing = heads ? 0 : 180;
  turns += 5;                       // 5 half-turns of flourish each flip
  var deg = turns * 180 + landing;
  // Keep parity correct: round 'turns*180' down to a multiple of 360 first.
  deg = Math.ceil((turns * 180) / 360) * 360 + landing;
  coin.style.transform = 'rotateY(' + deg + 'deg)';
  btn.disabled = true;
  result.textContent = 'Flipping…';
  setTimeout(function () {
    var face = heads ? 'Heads' : 'Tails';
    counts[face]++;
    result.textContent = face + '!';
    tally.textContent = 'Heads ' + counts.Heads + ' · Tails ' + counts.Tails;
    btn.disabled = false;
  }, 1100);
}

btn.addEventListener('click', flip);
coin.addEventListener('click', function () { if (!btn.disabled) flip(); });`,

  seo: {
    title: 'Coin Flip — CSS 3D Coin Flip Animation (JS)',
    description: `A 3D coin that tumbles and lands on heads or tails, with a running tally — CSS backface-visibility. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Coin Flip — A 3D CSS Coin That Tumbles to Heads or Tails',
      description: `Flipping a coin is the simplest possible randomiser, and a 3D coin that actually tumbles makes it satisfying. This snippet builds a two-sided coin that spins and lands on heads or tails, with a running tally, in pure HTML, CSS, and a few lines of vanilla JavaScript — no images, no library.

**Two faces with backface-visibility**

The coin is two circular faces stacked on the same spot inside a \`preserve-3d\` scene. The tails face is pre-rotated 180° so it points the opposite way, and both faces use \`backface-visibility: hidden\` — the key property that makes a flippable two-sided element work, because it hides whichever face is currently turned away from the viewer. Without it you'd see a mirror-image bleed-through; with it, exactly one side shows at a time as the coin rotates. The scene's \`perspective\` gives the spin real depth.

**Landing on the right side via rotation parity**

Heads shows when the coin's \`rotateY\` is at an even multiple of 180° (0°, 360°, …) and tails at an odd multiple (180°, 540°, …). A flip picks the result first with \`Math.random()\`, then computes a final angle that has the correct parity for that result plus several extra full spins so the coin visibly tumbles before settling. Because the landing angle is derived from the chosen outcome, the coin always rests on the side it reported — the randomness is honest, decided before the animation, never faked afterward. The \`Math.ceil((turns * 180) / 360) * 360\` step is the part that keeps this correct flip after flip: it rounds the accumulated half-turns up to the next full 360°, discarding any leftover odd half-turn from the previous landing, before the new parity offset (0 or 180) is added back on top — without it, the parity from one flip could bleed into the next and land the coin on the wrong face.

**Always spinning forward**

An accumulating \`turns\` counter ensures each flip adds rotation on top of the last, so the coin keeps spinning in the same direction rather than snapping back to zero between flips. This continuity is a small detail that makes repeated flips feel like one continuous physical object rather than a resetting widget.

**A running tally**

Each result increments a heads/tails count, shown beneath the coin. Over many flips this both adds a sense of a session and quietly demonstrates that the 50/50 split holds — a nice touch for anything that uses the coin to make repeated decisions. The button disables during the ~1.1s tumble so flips can't overlap and desync the tally from the resting face.

**Drop-in and adaptable**

The coin is self-contained and easy to theme — swap the H/T glyphs for icons or images, change the metals, or resize it. Use it as a decision-maker, a game mechanic, or a playful "let fate decide" control, and as a clear reference for two-sided CSS 3D flips with \`backface-visibility\`.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 3D coin renders on a dark stage with a Flip button.` },
      { title: 'Flip it', text: `Click Flip (or the coin) and it tumbles for about a second, landing on heads or tails.` },
      { title: 'Read the result', text: `The text shows the outcome, which always matches the resting face.` },
      { title: 'Watch the tally', text: `Each flip updates the running heads/tails count beneath the coin.` },
      { title: 'Restyle it', text: `Swap the H/T glyphs for icons, change the coin colours, or resize it.` },
      { title: 'Hook into your app', text: `Read the chosen side in flip() to drive a decision, game, or picker.` },
    ] },
    features: [
      { title: 'Two-sided 3D coin', text: `Two faces in a preserve-3d scene with perspective for a real tumble.` },
      { title: 'backface-visibility flip', text: `Hidden backfaces show exactly one side at a time as the coin rotates.` },
      { title: 'Parity-based landing', text: `Heads at even, tails at odd 180° multiples, so the coin rests on the reported side.` },
      { title: 'Honest randomness', text: `Math.random() picks the result before the spin, so the visual always matches.` },
      { title: 'Forward-spinning', text: `An accumulating turn count keeps the coin rotating the same way between flips.` },
      { title: 'Running tally', text: `A heads/tails counter tracks the session and shows the 50/50 split holding.` },
      { title: 'Flip guard', text: `The button disables during the tumble so flips can't overlap.` },
      { title: 'No images, no library', text: `Pure HTML/CSS/JS — themeable and dependency-free.` },
    ],
    useCases: [
      { title: 'Decision makers', text: `Settle a yes/no or A/B choice — pair with a [dice roller](/ui-snippets/dice-roller/) for more options.` },
      { title: 'Game mechanics', text: `Drive a coin-toss in a game UI alongside a [spin wheel](/ui-snippets/spin-wheel/).` },
      { title: 'Sports and matchups', text: `Pick who goes first with a visible, fair toss.` },
      { title: 'Gamified prompts', text: `Add chance to onboarding or quizzes next to a [confetti button](/ui-snippets/confetti-button/).` },
      { title: 'Party and icebreaker apps', text: `A playful "let fate decide" control.` },
      { title: 'Learning CSS 3D flips', text: `A reference for backface-visibility and 3D rotation — compare with a [3D flip card](/ui-snippets/3d-flip-card/).` },
      { icon: 'CODE', title: 'Related: Cursor Spotlight Reveal', desc: 'See the [Cursor Spotlight Reveal](/ui-snippets/cursor-spotlight-reveal/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the coin land on the side it reports?', a: `Heads corresponds to an even multiple of 180° of rotateY and tails to an odd one. The flip picks the result with Math.random() first, then computes a final angle with the matching parity plus several full spins for flourish. Because the resting angle is derived from the chosen outcome, the coin always settles on the side it announced — the result is decided before the animation, not after.` },
      { q: 'What does backface-visibility do here?', a: `It hides the side of each face that's turned away from the viewer. The coin is two faces on the same spot, with tails pre-rotated 180°. As the coin spins, backface-visibility:hidden ensures only the face pointing toward you is visible, so you never see the reverse bleeding through. It's the essential property for any two-sided 3D flip element.` },
      { q: 'Why does the coin keep spinning the same direction?', a: `A turns counter accumulates across flips, so each new flip's target angle is larger than the last. That keeps the rotation always increasing — the coin spins forward continuously instead of snapping back toward zero between flips, which would look like a glitch. The parity of the final angle still encodes heads or tails correctly.` },
      { q: 'Is the 50/50 actually fair?', a: `Yes — Math.random() < 0.5 gives each side an equal chance on every independent flip. The running tally beneath the coin lets you watch the split converge toward 50/50 over many flips. There's no weighting or memory between flips, so it behaves like a fair coin.` },
      { q: 'How do I use this coin flip in React, Vue, or Angular?', a: `In React, hold the rotation, result, and counts in state and set the coin's transform in the click handler with a timeout to settle; in Vue, bind :style with refs; in Angular, bind [style.transform] with component properties. The parity math and randomness are framework-agnostic — only the state and the transform binding move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the rotation parity math in your head. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how the Math.ceil rounding step keeps heads landing on an even multiple of 180 degrees and tails on an odd one, flip after flip. The same assistant can help you optimize it — for example checking whether the accumulating turns counter could grow unbounded over a very long session and whether it should wrap periodically without breaking the parity check. It's also useful for extending the coin: ask it to add a weighted-odds mode for a loaded coin, a session history list instead of just a running tally, or a sound effect timed to the landing moment via the existing setTimeout callback. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a 3D coin-flip animation in plain HTML, CSS, and JavaScript using only CSS 3D transforms (perspective, transform-style: preserve-3d, backface-visibility) — no images, no canvas, no library.

Requirements:
- Two circular faces (heads and tails) stacked in the same position inside a perspective scene, with the tails face pre-rotated 180 degrees on the Y axis and both faces set to backface-visibility: hidden so only the face currently pointing at the viewer is ever visible.
- On flip, decide the outcome first with Math.random() before computing any animation values — the animation must never be allowed to land on a face that contradicts the already-chosen result.
- Compute the final rotateY angle so that heads always rests at an even multiple of 180 degrees and tails at an odd multiple, plus several extra half-turns of flourish so the coin visibly tumbles rather than snapping straight to its resting angle.
- Maintain a running total of accumulated half-turns across flips (do not reset it to zero between flips) so the coin always keeps spinning forward in the same direction, while still correctly rounding that accumulated value up to the next full 360 degrees before adding the new landing offset, so parity from a previous flip can never bleed into the next one.
- Disable the flip button for the duration of the CSS transition so a second flip cannot be triggered mid-tumble and desync the displayed result from the coin's resting face.
- After each flip settles, update a visible running tally of heads versus tails counts.`,
    },
  },
};

export default coinFlip;
