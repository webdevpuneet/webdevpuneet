const diceRoller = {
  id: 'dice-roller',
  title: 'Dice Roller',
  lastmod: '2026-06-23',
  category: 'games',
  html: `<div class="dr-stage">
  <div class="dr-scene">
    <div class="dr-cube" id="drCube">
      <div class="dr-face dr-f1"><span></span></div>
      <div class="dr-face dr-f2"><span></span><span></span></div>
      <div class="dr-face dr-f3"><span></span><span></span><span></span></div>
      <div class="dr-face dr-f4"><span></span><span></span><span></span><span></span></div>
      <div class="dr-face dr-f5"><span></span><span></span><span></span><span></span><span></span></div>
      <div class="dr-face dr-f6"><span></span><span></span><span></span><span></span><span></span><span></span></div>
    </div>
  </div>
  <button type="button" class="dr-btn" id="drBtn">Roll</button>
  <p class="dr-result" id="drResult">Tap roll</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center}

.dr-stage{display:flex;flex-direction:column;align-items:center;gap:26px}
.dr-scene{width:96px;height:96px;perspective:600px}
.dr-cube{position:relative;width:96px;height:96px;transform-style:preserve-3d;transition:transform 1s cubic-bezier(.34,1.4,.5,1);transform:rotateX(-20deg) rotateY(-20deg)}

.dr-face{position:absolute;width:96px;height:96px;background:linear-gradient(145deg,#fff,#e2e8f0);border-radius:14px;box-shadow:inset 0 0 0 1px rgba(15,23,42,.06);display:grid;padding:14px;gap:6px}
.dr-face span{align-self:center;justify-self:center;width:17px;height:17px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#475569,#0f172a)}

.dr-f1{transform:translateZ(48px);grid-template-areas:'. . .' '. a .' '. . .'}
.dr-f1 span{grid-area:a}
.dr-f2{transform:rotateY(180deg) translateZ(48px);grid-template-areas:'a . .' '. . .' '. . b'}
.dr-f2 span:nth-child(1){grid-area:a}.dr-f2 span:nth-child(2){grid-area:b}
.dr-f3{transform:rotateY(90deg) translateZ(48px);grid-template-areas:'a . .' '. b .' '. . c'}
.dr-f3 span:nth-child(1){grid-area:a}.dr-f3 span:nth-child(2){grid-area:b}.dr-f3 span:nth-child(3){grid-area:c}
.dr-f4{transform:rotateY(-90deg) translateZ(48px);grid-template-areas:'a . b' '. . .' 'c . d'}
.dr-f4 span:nth-child(1){grid-area:a}.dr-f4 span:nth-child(2){grid-area:b}.dr-f4 span:nth-child(3){grid-area:c}.dr-f4 span:nth-child(4){grid-area:d}
.dr-f5{transform:rotateX(90deg) translateZ(48px);grid-template-areas:'a . b' '. e .' 'c . d'}
.dr-f5 span:nth-child(1){grid-area:a}.dr-f5 span:nth-child(2){grid-area:b}.dr-f5 span:nth-child(3){grid-area:c}.dr-f5 span:nth-child(4){grid-area:d}.dr-f5 span:nth-child(5){grid-area:e}
.dr-f6{transform:rotateX(-90deg) translateZ(48px);grid-template-areas:'a . b' 'c . d' 'e . f'}
.dr-f6 span:nth-child(1){grid-area:a}.dr-f6 span:nth-child(2){grid-area:b}.dr-f6 span:nth-child(3){grid-area:c}.dr-f6 span:nth-child(4){grid-area:d}.dr-f6 span:nth-child(5){grid-area:e}.dr-f6 span:nth-child(6){grid-area:f}

.dr-btn{background:#6366f1;color:#fff;border:none;border-radius:11px;padding:12px 30px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;transition:background .15s,transform .1s}
.dr-btn:hover{background:#4f46e5}
.dr-btn:active{transform:scale(.95)}
.dr-btn:disabled{opacity:.6;cursor:default}
.dr-result{color:#94a3b8;font-size:13px;font-weight:600;min-height:18px}`,

  js: `var cube = document.getElementById('drCube');
var btn = document.getElementById('drBtn');
var result = document.getElementById('drResult');

// Base rotation that brings each face to the front (matches the CSS face transforms).
var FACE_ROT = {
  1: [0, 0], 2: [0, 180], 3: [0, -90], 4: [0, 90], 5: [-90, 0], 6: [90, 0],
};
var spins = 0;

function roll() {
  var n = Math.floor(Math.random() * 6) + 1;
  var base = FACE_ROT[n];
  spins++;
  // Add whole extra turns so the cube tumbles, then lands showing face n.
  var rx = base[0] + 360 * spins;
  var ry = base[1] + 360 * spins;
  cube.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
  btn.disabled = true;
  result.textContent = 'Rolling…';
  setTimeout(function () {
    btn.disabled = false;
    result.textContent = 'You rolled ' + n;
  }, 1000);
}

btn.addEventListener('click', roll);
cube.addEventListener('click', function () { if (!btn.disabled) roll(); });`,

  seo: {
    title: 'Dice Roller — CSS 3D Dice Roll Animation (JS)',
    description: `A 3D CSS die that tumbles and lands on a random face — real cube faces, animated with one rotation. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Dice Roller — A Real 3D CSS Cube That Tumbles to a Random Face',
      description: `A rolling 3D die is a small piece of delight that's also a perfect lesson in CSS 3D transforms. This snippet builds a real cube — six faces with correct pip layouts — that tumbles and lands showing a random face, in pure HTML, CSS, and a few lines of vanilla JavaScript, with no library and no images.

**A genuine 3D cube, not a flat sprite**

The cube is six \`div\` faces positioned in 3D space. The container has \`transform-style: preserve-3d\` so its children render in a shared 3D scene, and each face is pushed out from the centre with \`translateZ(48px)\` after being rotated to point in its direction — front, back, left, right, top, bottom. The scene has \`perspective\` so the cube looks dimensional rather than isometric. This is the canonical way to build a CSS cube, and it means the die is a real object you can rotate to any orientation.

**Pips placed with CSS grid areas**

Each face's dots are laid out with CSS grid template areas — a 3×3 grid where named cells hold the pips for that number. One pip sits in the centre cell; two sit in opposite corners; five fills the corners plus centre; and so on. Using named grid areas (rather than absolute positioning) makes each face's layout declarative and easy to read, and it's the cleanest way to get the classic die-face arrangements without hand-tuning pixel positions.

**Rolling by rotating to a known orientation**

The roll is one CSS transition. For each face there's a base \`rotateX/rotateY\` that brings it to the front, matching the face transforms. Rolling picks a random 1–6, looks up that base rotation, and adds several full 360° turns so the cube visibly tumbles before settling — landing exactly on the chosen face because the final orientation is a known value plus whole turns. Accumulating the spin count across rolls means the cube always rotates forward, never snapping backwards, so consecutive rolls look continuous.

**Honest randomness and a settled result**

The result is chosen with \`Math.random()\` *before* the animation, so the visual outcome always matches the reported number — the die isn't faked after the fact. The button disables during the ~1s tumble and re-enables with the result text when it lands, so users can't spam mid-roll and the announced value always corresponds to the resting face.

**Drop-in and adaptable**

The whole thing is self-contained and themeable with CSS. Use it for a board-game UI, a randomiser, a "pick for me" control, or just a tactile bit of fun. It's also a clear, complete reference for CSS 3D cubes, \`preserve-3d\`, and transform-based animation that you can adapt into any 3D interaction.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 3D die renders on a dark stage with a Roll button.` },
      { title: 'Roll it', text: `Click Roll (or the die) and the cube tumbles for about a second, landing on a random face.` },
      { title: 'Read the result', text: `The text below shows the rolled value, which always matches the resting face.` },
      { title: 'Roll again', text: `Each roll adds more turns so the cube keeps tumbling forward continuously.` },
      { title: 'Restyle it', text: `Change the face gradient, pip colour, size, or perspective to fit your design.` },
      { title: 'Hook into your game', text: `Read the chosen number in roll() to drive a board game, randomiser, or picker.` },
    ] },
    features: [
      { title: 'Real CSS 3D cube', text: `Six faces in a preserve-3d scene with perspective — a genuine 3D object, not a flat sprite.` },
      { title: 'Grid-area pip layouts', text: `Each face's dots use named CSS grid areas for clean, declarative die faces.` },
      { title: 'Transform-based roll', text: `Rolling is one CSS transition to a known orientation plus extra full turns to tumble.` },
      { title: 'Lands on the right face', text: `The final rotation is the chosen face's base plus whole 360° turns, so it settles exactly.` },
      { title: 'Continuous forward spin', text: `An accumulating spin count means the cube never snaps backwards between rolls.` },
      { title: 'Honest randomness', text: `Math.random() picks the value before the animation, so the visual always matches the result.` },
      { title: 'Roll guard', text: `The button disables during the tumble and re-enables with the result.` },
      { title: 'No images, no library', text: `Pure HTML/CSS/JS — themeable and dependency-free.` },
    ],
    useCases: [
      { title: 'Board and tabletop game UIs', text: `Drive turns with a tactile roll — pair with a [spin wheel](/ui-snippets/spin-wheel/) for other randomisers.` },
      { title: 'Randomisers and "pick for me"', text: `Use the result to choose an option or order, alongside a [confetti button](/ui-snippets/confetti-button/) for wins.` },
      { title: 'Quizzes and classroom tools', text: `Pick a random student or question with a fun roll.` },
      { title: 'Gamified onboarding', text: `Add playful chance to a flow next to a [scratch card reveal](/ui-snippets/scratch-card-reveal/).` },
      { title: 'Decision and party apps', text: `A delightful way to leave a choice to chance.` },
      { title: 'Learning CSS 3D transforms', text: `A complete reference for preserve-3d cubes — compare with a [3D card tilt](/ui-snippets/3d-card-tilt/).` },
      { icon: 'CODE', title: 'Related: GSAP Draggable Inertia', desc: 'See the [GSAP Draggable Inertia](/ui-snippets/gsap-draggable-inertia/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the die land on the correct face?', a: `Each face has a base rotateX/rotateY that brings it to the front, matching the CSS transforms that position the faces. Rolling picks a random 1–6, looks up that base rotation, and adds several full 360° turns. Because a full turn returns to the same orientation, the cube tumbles and then settles exactly on the chosen face — the final transform is "known landing orientation + whole turns."` },
      { q: 'How are the pips arranged without absolute positioning?', a: `Each face is a 3×3 CSS grid with named grid-template-areas, and the pips are placed into named cells (centre for 1, opposite corners for 2, all corners plus centre for 5, and so on). Declarative grid areas are cleaner and more readable than hand-tuned absolute coordinates, and they reproduce the classic die-face layouts exactly.` },
      { q: 'Is the roll actually random or faked after the animation?', a: `It's genuinely random and decided first. Math.random() picks the value before the animation starts, the cube is rotated to land on that face, and the same number is reported when it settles. The visual outcome and the announced result always match — nothing is changed after the tumble.` },
      { q: 'Why does the button disable while rolling?', a: `The roll is a ~1-second CSS transition. Disabling the button (and ignoring clicks on the cube) during that window prevents a new roll from interrupting the current animation, which would make the cube jump and could desync the displayed result from the resting face. It re-enables with the result text once the die settles.` },
      { q: 'How do I use this dice roller in React, Vue, or Angular?', a: `In React, hold the current rotation/result in state and set the cube's transform style in the click handler, using a timeout to re-enable; in Vue, bind :style with a ref; in Angular, bind [style.transform] with a component property. The FACE_ROT lookup and rotation math are framework-agnostic — only the state and the transform binding move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `Rather than mentally rotating the cube yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why adding 360 times the spins counter to the FACE_ROT base rotation makes the cube land on the correct face every time, and how translateZ(48px) combined with preserve-3d positions all six faces without them overlapping. The same assistant can help optimize it, for example checking whether the spins counter should be reset or capped after many rolls to avoid an ever-growing transform value, and whether that has any real performance cost. It's also useful for extending the effect: ask it to support two dice rolled together with a combined total, add a physically-tumbling multi-axis animation instead of a single transform, or replace the click-to-roll with a shake/deviceorientation trigger on mobile. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a rolling 3D dice UI in plain HTML, CSS, and JavaScript using only CSS 3D transforms — no canvas, no images, no library.

Requirements:
- A cube built from six absolutely-positioned div faces inside a parent with transform-style: preserve-3d, each face pushed outward from the center with translateZ and rotated with rotateX/rotateY so it points in its own direction (front, back, left, right, top, bottom), inside an outer container with a CSS perspective value so the cube reads as genuinely three-dimensional.
- Each face's pips laid out with CSS grid-template-areas (a 3x3 named grid) rather than absolute pixel positions, matching the classic dot arrangements for 1 through 6.
- A lookup table mapping each face value 1-6 to the base rotateX/rotateY that brings that face to the front of the cube, matching the CSS transforms used to build the faces.
- A roll function that first picks a random result with Math.random() before any animation runs, then sets the cube's transform to that face's base rotation plus a growing whole-number multiple of 360 degrees (tracked in a counter that increases on every roll) so the cube visibly tumbles forward and always lands exactly on the chosen face, never snapping backward between rolls.
- Disable the roll trigger for the duration of the roughly one-second CSS transition and only report the rolled number in the UI once the transition's timeout fires, so the displayed result can never desync from the cube's resting orientation.`,
    },
  },
};

export default diceRoller;
