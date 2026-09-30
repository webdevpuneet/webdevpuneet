const mobileOnboarding = {
  id: 'mobile-onboarding',
  title: 'Mobile Onboarding Screens',
  lastmod: '2026-07-18',
  category: 'mobile',
  html: `<div class="ob-phone">
  <div class="ob-screen">
    <div class="ob-top"><span>9:41</span><button type="button" class="ob-skip" id="obSkip">Skip</button></div>
    <div class="ob-track" id="obTrack">
      <div class="ob-slide">
        <div class="ob-art a1"><span class="ob-blob"></span><span class="ob-glyph">📊</span></div>
        <h2>Track everything</h2>
        <p>See all your accounts and spending in one clean dashboard.</p>
      </div>
      <div class="ob-slide">
        <div class="ob-art a2"><span class="ob-blob"></span><span class="ob-glyph">⚡</span></div>
        <h2>Move money fast</h2>
        <p>Send, request, and split payments in just a couple of taps.</p>
      </div>
      <div class="ob-slide">
        <div class="ob-art a3"><span class="ob-blob"></span><span class="ob-glyph">🔒</span></div>
        <h2>Bank-grade security</h2>
        <p>Your data is encrypted end-to-end and protected with Face ID.</p>
      </div>
    </div>
    <div class="ob-foot">
      <div class="ob-dots" id="obDots"><span class="on"></span><span></span><span></span></div>
      <button type="button" class="ob-next" id="obNext">Next</button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none;-ms-overflow-style:none}
html::-webkit-scrollbar{display:none}
body{font-family:system-ui,-apple-system,sans-serif;background:#1e293b;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px;scrollbar-width:none;-ms-overflow-style:none}
body::-webkit-scrollbar{display:none}

.ob-phone{width:288px;height:600px;background:#0b1220;border-radius:46px;padding:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),inset 0 0 0 2px #1e293b}
.ob-screen{width:100%;height:100%;border-radius:34px;overflow:hidden;background:#fff;color:#0f172a;display:flex;flex-direction:column}
.ob-top{display:flex;justify-content:space-between;align-items:center;padding:13px 22px 0;font-size:13px;font-weight:700}
.ob-skip{background:none;border:none;font-size:13px;font-weight:700;color:#94a3b8;cursor:pointer;font-family:inherit}

.ob-track{flex:1;display:flex;overflow:hidden;transition:transform .4s cubic-bezier(.65,0,.35,1)}
.ob-slide{min-width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px 30px}
.ob-art{position:relative;width:150px;height:150px;display:flex;align-items:center;justify-content:center;margin-bottom:34px}
.ob-blob{position:absolute;inset:0;border-radius:42% 58% 63% 37%/45% 38% 62% 55%;animation:obMorph 8s ease-in-out infinite}
.a1 .ob-blob{background:linear-gradient(135deg,#a5b4fc,#6366f1)}
.a2 .ob-blob{background:linear-gradient(135deg,#fcd34d,#f59e0b)}
.a3 .ob-blob{background:linear-gradient(135deg,#6ee7b7,#10b981)}
.ob-glyph{position:relative;font-size:52px;z-index:2}
@keyframes obMorph{50%{border-radius:58% 42% 38% 62%/55% 62% 38% 45%}}
.ob-slide h2{font-size:23px;font-weight:800;margin-bottom:10px}
.ob-slide p{font-size:14px;color:#64748b;line-height:1.55;max-width:230px}

.ob-foot{display:flex;align-items:center;justify-content:space-between;padding:18px 26px 26px}
.ob-dots{display:flex;gap:7px}
.ob-dots span{width:7px;height:7px;border-radius:99px;background:#e2e8f0;transition:width .3s,background .3s}
.ob-dots span.on{width:22px;background:#6366f1}
.ob-next{background:#6366f1;color:#fff;border:none;border-radius:12px;padding:12px 24px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.ob-next:hover{background:#4f46e5}`,

  js: `var track = document.getElementById('obTrack');
var dots = document.getElementById('obDots').children;
var nextBtn = document.getElementById('obNext');
var skip = document.getElementById('obSkip');
var total = track.children.length;
var index = 0;

function go(i) {
  index = Math.max(0, Math.min(total - 1, i));
  track.style.transform = 'translateX(' + (-index * 100) + '%)';
  for (var d = 0; d < dots.length; d++) dots[d].classList.toggle('on', d === index);
  nextBtn.textContent = index === total - 1 ? 'Get started' : 'Next';
  skip.style.visibility = index === total - 1 ? 'hidden' : 'visible';
}

nextBtn.addEventListener('click', function () {
  if (index === total - 1) { nextBtn.textContent = 'Welcome! 🎉'; return; }
  go(index + 1);
});
skip.addEventListener('click', function () { go(total - 1); });

// Allow swiping between slides.
var startX = null;
track.addEventListener('pointerdown', function (e) { startX = e.clientX; });
window.addEventListener('pointerup', function (e) {
  if (startX === null) return;
  var dx = e.clientX - startX;
  if (dx < -45) go(index + 1); else if (dx > 45) go(index - 1);
  startX = null;
});

go(0);`,

  seo: {
    title: 'Mobile Onboarding Screens — Free App Intro UI Snippet',
    description: `A swipeable mobile onboarding flow with morphing blob illustrations, animated progress dots, skip, and a final get-started button. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Mobile Onboarding Screens — Swipeable App Intro Carousel',
      description: `An onboarding flow is the set of intro screens a new user swipes through on first launch — each pitching one feature with an illustration, a headline, and a line of copy, with progress dots and a skip option. This snippet builds a complete, swipeable one inside a CSS phone frame in HTML, CSS, and vanilla JavaScript with no dependency, ready to adapt to any app.

**A sliding track of full-width slides**

All slides sit in a flex \`.ob-track\` where each slide is \`min-width: 100%\`, so they line up horizontally. Navigation is a single \`transform: translateX(-index * 100%)\` on the track, transitioned with a \`cubic-bezier\` ease — moving between screens is just changing one index and letting CSS animate the slide. There's no per-slide show/hide, which keeps state trivial and the motion smooth.

**Swipe and buttons share one navigator**

A \`go(i)\` function clamps the index, sets the transform, updates the dots, and relabels the button — every navigation path funnels through it. The Next button advances, Skip jumps to the last slide, and a pointer swipe (comparing start and end \`clientX\` against a 45px threshold) moves a slide in either direction. Because they all call \`go()\`, the dots, button label, and slide position can never desync.

**Animated progress dots**

The dots aren't just filled circles — the active one stretches into a pill (\`width\` animates from 7px to 22px) while the others stay small, the modern "worm" indicator. It's driven by toggling an \`.on\` class, with a CSS transition doing the morph, so it reads as a continuous progress bar split into segments.

**Morphing blob illustrations**

Each slide's art is an emoji glyph over a gradient blob whose organic shape comes from a multi-value \`border-radius\` (e.g. \`42% 58% 63% 37% / 45% 38% 62% 55%\`) animated between two shapes on an infinite \`obMorph\` keyframe. It gives lively, on-brand artwork with zero images — swap the gradient and glyph per slide to match your features.

**Context-aware controls**

On the last slide the Next button becomes "Get started" and Skip hides, because skipping the final screen makes no sense — small touches that make the flow feel finished. Wire the final button to your home route or auth screen.

**Reusing it**

Keep the slide structure and replace the copy, glyphs, and gradients. Drop it into a [phone mockup](/ui-snippets/phone-mockup/) for presentations, or lift it out as a responsive web onboarding carousel.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A three-screen onboarding flow renders in a phone frame.` },
      { title: 'Press Next', text: `The track slides to the next screen and the dots advance.` },
      { title: 'Swipe', text: `Drag left or right to move between slides past a threshold.` },
      { title: 'Tap Skip', text: `Jump straight to the final get-started screen.` },
      { title: 'Reach the end', text: `Next becomes Get started and Skip hides.` },
      { title: 'Customize', text: `Swap the copy, glyphs, and blob gradients per feature.` },
    ] },
    features: [
      { title: 'Sliding track', text: `One translateX moves between full-width slides.` },
      { title: 'Swipe and buttons', text: `Both navigate through a single go() function.` },
      { title: 'Worm progress dots', text: `The active dot stretches into a pill.` },
      { title: 'Morphing blobs', text: `Animated border-radius art with no images.` },
      { title: 'Threshold swipe', text: `Pointer delta past 45px changes slides.` },
      { title: 'Context-aware controls', text: `Final slide relabels Next and hides Skip.` },
      { title: 'No desync', text: `Dots, label, and slide always agree.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS, no carousel library.` },
    ],
    useCases: [
      { title: 'App first-run intros', text: `Introduce features inside a [phone mockup](/ui-snippets/phone-mockup/).` },
      { title: 'Feature tours', text: `A lighter alternative to an [onboarding tour](/ui-snippets/onboarding-tour/).` },
      { title: 'Lead into sign-in', text: `Hand off to a [mobile login screen](/ui-snippets/mobile-login-screen/).` },
      { title: 'Web onboarding', text: `Lift it out as a [carousel](/ui-snippets/carousel/)-style intro.` },
      { title: 'Product walkthroughs', text: `Pair with a [progress wizard](/ui-snippets/progress-wizard/) for steps.` },
      { title: 'Learning sliders', text: `A reference for translateX carousels and swipe.` },
      { icon: 'CODE', title: 'Related: Mobile Keyboard Guide — Correct inputmode/type/pattern Per Field', desc: 'See the [Mobile Keyboard Guide — Correct inputmode/type/pattern Per Field](/ui-snippets/mobile-inputmode-keyboard-guide/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does sliding between screens work?', a: `All slides live in a flex track, each at min-width 100%, so they sit side by side. Moving is a single transform: translateX(-index * 100%) on the track with a CSS transition, so changing the index animates the slide. There's no per-slide visibility toggling, which keeps the logic and the motion simple.` },
      { q: 'How do swiping and the buttons stay in sync?', a: `Every navigation — Next, Skip, and swipe — calls one go(i) function that clamps the index, sets the transform, updates the progress dots, and relabels the button. Because there's a single source of truth, the dots, the button text, and the visible slide can never drift out of agreement.` },
      { q: 'How is the swipe detected?', a: `A pointerdown records the start X, and a window pointerup compares the end X. If the horizontal delta is less than -45 pixels it advances, more than +45 it goes back, otherwise it stays — a threshold that ignores tiny accidental drags. Listening for pointerup on the window catches releases even outside the track.` },
      { q: 'Are the illustrations images?', a: `No. Each is an emoji glyph layered over a gradient blob whose organic shape comes from a multi-value border-radius animated between two shapes on an infinite keyframe. Swapping the gradient and glyph per slide gives distinct, lively artwork for each feature with no image assets to load.` },
      { q: 'How do I use this onboarding flow in React, Vue, or Angular?', a: `Keep the active index in state and bind the track's transform to it. Implement Next, Skip, and swipe handlers that update the index. Render slides from a data array of glyph, title, and copy. The progress dots derive from the index. In Tailwind, set slides to w-full shrink-0 in a flex track and animate the active dot's width.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out on your own why every interaction funnels through one function. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely how the go(i) function keeps the translateX transform, the worm-style progress dots, and the button label from ever drifting out of sync, or why the pointer swipe compares clientX against a 45px threshold rather than reacting to any movement at all. The same assistant is useful for optimizing it too — ask whether the blob's animated multi-value border-radius keyframe is cheap enough to run on lower-end devices, or whether preloading the next slide's content would smooth the cubic-bezier transition further. It is equally handy for extending the flow: have it add a progress-based auto-advance timer, support more than three slides driven from a data array, or replace the emoji glyphs with SVG illustrations. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a swipeable mobile "onboarding carousel" in plain HTML, CSS, and JavaScript using only a single CSS transform for navigation — no carousel library, no per-slide show/hide.

Requirements:
- A horizontal flex track containing full-width slides (each slide min-width: 100%), where moving between slides is done entirely by setting one transform: translateX(-index * 100%) on the track, transitioned with a CSS cubic-bezier easing.
- A single go(index) function that clamps the index within bounds, applies the transform, updates a row of progress dots, and relabels the primary button — and make every navigation path (a Next button, a Skip button, and a swipe gesture) call only that one function so they can never disagree about the current slide.
- The progress dots must use a "worm" style: the active dot animates its width from a small circle to an elongated pill via a CSS transition triggered by toggling a single class, while inactive dots stay small circles.
- Implement swipe navigation with pointerdown recording a starting clientX and a window-level pointerup comparing the ending clientX; only change slides if the horizontal delta exceeds a defined threshold (e.g. 45px) in either direction, so small accidental drags are ignored.
- Each slide's illustration must be built with no images: an organic blob shape from an animated multi-value border-radius keyframe animation behind a centered emoji or icon glyph.
- On the final slide, change the primary button's label to something like "Get started" and hide the Skip control, since skipping the last screen doesn't make sense.`,
    },
  },
};

export default mobileOnboarding;
