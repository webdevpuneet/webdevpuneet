const viewTransitionCarousel = {
  id: 'view-transition-carousel',
  title: 'View Transition API Carousel',
  lastmod: '2026-09-14',
  category: 'carousels',
  html: `<div class="vtc-wrap">
  <div class="vtc-stage" id="vtcStage">
    <div class="vtc-slide" style="background:linear-gradient(160deg,#6366f1,#4338ca)"><span>🎧</span><h3>Headphones</h3></div>
  </div>
  <div class="vtc-controls">
    <button class="vtc-btn" id="vtcPrev" aria-label="Previous">‹</button>
    <div class="vtc-dots" id="vtcDots"></div>
    <button class="vtc-btn" id="vtcNext" aria-label="Next">›</button>
  </div>
  <p class="vtc-support" id="vtcSupport"></p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f6f7f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.vtc-wrap{display:flex;flex-direction:column;align-items:center;gap:18px}
.vtc-stage{width:220px;height:220px}
.vtc-slide{width:100%;height:100%;border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;box-shadow:0 16px 36px rgba(15,23,42,.2);view-transition-name:vtc-active-slide}
.vtc-slide span{font-size:46px}
.vtc-slide h3{color:#fff;font-size:16px;font-weight:800}
.vtc-controls{display:flex;align-items:center;gap:16px}
.vtc-btn{width:38px;height:38px;border-radius:50%;background:#fff;border:1.5px solid #e3e5ea;color:#4b5563;font-size:19px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:border-color .15s,color .15s}
.vtc-btn:hover{border-color:#6366f1;color:#6366f1}
.vtc-dots{display:flex;gap:7px}
.vtc-dot{width:7px;height:7px;border-radius:50%;background:#d1d5db;border:none;cursor:pointer;transition:background .2s,width .2s}
.vtc-dot.active{background:#6366f1;width:20px;border-radius:4px}
.vtc-support{font-size:11px;color:#9ca3af}`,

  js: `var ITEMS = [
  { icon: '🎧', title: 'Headphones', bg: '#6366f1,#4338ca' },
  { icon: '📷', title: 'Camera', bg: '#ec4899,#9d174d' },
  { icon: '⌚', title: 'Watch', bg: '#0ea5e9,#0369a1' },
  { icon: '🎮', title: 'Console', bg: '#10b981,#047857' },
];

var stage = document.getElementById('vtcStage');
var dotsWrap = document.getElementById('vtcDots');
var supportNote = document.getElementById('vtcSupport');
var current = 0;

var supported = typeof document.startViewTransition === 'function';
supportNote.textContent = supported
  ? 'Your browser supports the View Transitions API — real morph animation below.'
  : 'Your browser lacks View Transitions API support — falls back to an instant swap.';

ITEMS.forEach(function (it, i) {
  var d = document.createElement('button');
  d.className = 'vtc-dot';
  d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  d.addEventListener('click', function () { goTo(i); });
  dotsWrap.appendChild(d);
});
var dots = document.querySelectorAll('.vtc-dot');

function paint() {
  var it = ITEMS[current];
  stage.innerHTML = '<div class="vtc-slide" style="background:linear-gradient(160deg,' + it.bg + ')"><span>' + it.icon + '</span><h3>' + it.title + '</h3></div>';
  dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
}

function update(newIndex) {
  current = newIndex;
  // document.startViewTransition captures a snapshot of the DOM before AND
  // after the callback runs, then cross-fades/morphs between them for any
  // element carrying a view-transition-name — here, the slide itself. No
  // manual keyframes are written for this transition at all; the browser
  // interpolates position, size, and appearance between the two snapshots.
  if (supported) {
    document.startViewTransition(function () { paint(); });
  } else {
    paint();
  }
}

function next() { update((current + 1) % ITEMS.length); }
function prev() { update((current - 1 + ITEMS.length) % ITEMS.length); }
function goTo(i) { update(i); }

document.getElementById('vtcNext').addEventListener('click', next);
document.getElementById('vtcPrev').addEventListener('click', prev);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') next();
  else if (e.key === 'ArrowLeft') prev();
});

paint();`,

  seo: {
    title: 'View Transition API Carousel — HTML CSS JS Snippet',
    description: 'A carousel that swaps slides using the real browser View Transitions API — document.startViewTransition automatically cross-fades and morphs between DOM states, with no hand-written keyframes. Exports to React, Vue & Tailwind.',
    about: {
      title: 'View Transition API Carousel — The Browser Animates the Diff, Not You',
      description: `Every other carousel in this library animates a transition by hand — a transform, an opacity, a keyframe. This one hands that job to the browser itself: \`document.startViewTransition(callback)\` snapshots the DOM as it is right now, runs the callback (which just replaces the slide's HTML — no animation code inside it at all), snapshots the DOM again afterward, and then automatically cross-fades and morphs between the two snapshots for any element carrying a matching \`view-transition-name\`.\n\n**One CSS property is the entire animation setup**\n\nThe *only* animation-related code in this snippet is \`view-transition-name: vtc-active-slide\` on \`.vtc-slide\` in the CSS. That single declaration tells the browser "treat this element as a named subject to animate between states" — there's no \`transition\`, no \`@keyframes\`, no JS-driven transform anywhere in the slide-change logic. \`paint()\` just tears down the old slide's markup and writes in the new one synchronously; the browser handles everything about *how* that change appears.\n\n**Feature detection, not a hard dependency**\n\nBecause the View Transitions API isn't universal yet, every call is guarded: \`typeof document.startViewTransition === 'function'\`. When it's missing, \`update()\` just calls \`paint()\` directly — the carousel still works, it simply swaps instantly instead of animating. That's a deliberate progressive-enhancement pattern: the feature adds polish where supported and never breaks functionality where it isn't.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A support note tells you whether your browser has the View Transitions API; the first slide appears.' },
        { title: 'Click the arrows', text: 'In a supporting browser, the slide smoothly cross-fades and morphs into the next one — no hand-written animation.' },
        { title: 'Click a dot', text: 'Jump directly to that slide, with the same automatic browser-driven transition.' },
        { title: 'Try it in an unsupported browser', text: 'The carousel still works perfectly — it just swaps instantly instead of animating.' },
        { title: 'Inspect the CSS', text: 'Notice there\'s no transition or @keyframes rule driving the slide change at all — just one view-transition-name declaration.' },
      ],
    },
    features: [
      'Uses the real browser View Transitions API — document.startViewTransition — not a hand-rolled animation',
      'Zero keyframes, zero CSS transitions, zero JS-driven transform math for the slide-change animation itself',
      'One CSS declaration (view-transition-name) is the entire animation setup',
      'Graceful feature detection — falls back to an instant, fully functional swap in unsupported browsers',
      'The browser automatically interpolates position, size, and appearance between the before/after DOM snapshots',
      'Dots, arrows, and keyboard navigation all route through the same update() function uniformly',
    ],
    useCases: [
      { icon: 'CODE',   title: 'Modern-browser-first product pages', desc: 'Ship a polished native-feeling transition with almost no animation code to maintain.' },
      { icon: 'LEARN',  title: 'Learning the View Transitions API', desc: 'One of the clearest minimal examples of startViewTransition applied to a real, common UI pattern.' },
      { icon: 'DESIGN', title: 'Progressive enhancement showcases', desc: 'Demonstrates a feature that enhances supporting browsers without breaking unsupported ones.' },
      { icon: 'FLOW',   title: 'Lightweight content rotators', desc: 'Get smooth, correct-looking transitions without shipping any custom animation logic at all.' },
    ],
    faqs: [
      { q: 'What does view-transition-name actually do?', a: 'It marks an element as a named "subject" the browser should track across a startViewTransition call — if an element with that same name exists in both the before and after DOM snapshots, the browser automatically animates between its old and new state (position, size, opacity) rather than treating it as an unrelated element being removed and added.' },
      { q: 'What happens in browsers without View Transitions API support?', a: 'The feature is checked with typeof document.startViewTransition === "function" before use — when it\'s missing, paint() is called directly with no wrapping transition call, so the carousel still functions correctly, just without the animated cross-fade/morph.' },
      { q: 'Can I use different view-transition-names for different elements to animate them independently?', a: 'Yes — give the icon, the title, and the background each their own unique view-transition-name, and the browser will animate each one\'s before/after state independently rather than treating the whole slide as one blob.' },
      { q: 'Does startViewTransition work for multi-page navigations too?', a: 'Yes, in supporting browsers it also works for full page navigations (same-document or cross-document), which is a separate but related use of the same API — this snippet demonstrates the single-page, same-document version.' },
      { q: 'Is it accessible?', a: 'Arrows and dots are real labeled buttons, fully keyboard-operable via Left/Right arrow keys; consider also checking prefers-reduced-motion and skipping startViewTransition\'s animation (calling paint() directly) for users who\'ve requested reduced motion.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what document.startViewTransition does with the DOM snapshots it captures before and after its callback runs, and why the callback itself (paint()) contains no animation code whatsoever. It's also worth asking the assistant to give the icon and title their own separate view-transition-names so they animate independently from the background, or to add a prefers-reduced-motion check that skips the transition wrapper entirely for users who've requested reduced motion.`,
      prompt: `Build a carousel in plain HTML, CSS, and vanilla JavaScript that uses the native browser View Transitions API to animate between slides, with no hand-written CSS transitions, keyframes, or JavaScript-driven transform animation for the slide-change effect itself — no library.

Requirements:
- A single stage element that, at any time, contains the markup for exactly one currently active slide (icon, title, and background), swapped out for a different slide's markup on navigation — implemented as a straightforward synchronous DOM replacement with no animation logic inside that replacement function.
- The slide element must carry a view-transition-name CSS property, which is the only styling responsible for enabling the automatic browser-driven cross-fade/morph animation between the old and new slide states.
- Before performing the DOM replacement, feature-detect whether the browser supports the View Transitions API by checking whether document.startViewTransition exists as a function. If supported, wrap the slide-replacement logic inside a call to document.startViewTransition, passing the replacement logic as its callback. If not supported, call the replacement logic directly with no wrapping, so the carousel still functions correctly (just without the animated transition) in browsers lacking the API.
- Display a small text note on the page reporting to the user whether their current browser supports the View Transitions API or not, determined by the same feature check.
- Previous/next buttons and a row of dynamically generated indicator dots that trigger the same slide-update logic (including the same view-transition wrapping/fallback behavior) as any other navigation method.
- Left/Right arrow key support performing the same next/previous action as the buttons.`,
    },
  },
};

export default viewTransitionCarousel;
