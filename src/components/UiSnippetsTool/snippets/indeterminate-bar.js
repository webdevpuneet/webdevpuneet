const indeterminateBar = {
  id: 'indeterminate-bar',
  title: 'Indeterminate Bar',
  lastmod: '2026-06-24',
  category: 'loaders',
  html: `<div class="ib-stage">
  <div class="ib-demo">
    <span class="ib-label">Slim</span>
    <div class="ib-bar"><div class="ib-track ib-slim"><div class="ib-fill"></div></div></div>
  </div>
  <div class="ib-demo">
    <span class="ib-label">Two-dash</span>
    <div class="ib-bar"><div class="ib-track"><div class="ib-fill ib-a"></div><div class="ib-fill ib-b"></div></div></div>
  </div>
  <div class="ib-demo">
    <span class="ib-label">Striped</span>
    <div class="ib-bar"><div class="ib-track"><div class="ib-stripes"></div></div></div>
  </div>
  <div class="ib-demo">
    <span class="ib-label">Determinate</span>
    <div class="ib-bar"><div class="ib-track"><div class="ib-det" id="ibDet"></div></div></div>
  </div>
  <button type="button" class="ib-btn" id="ibToggle">Pause</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.ib-stage{width:100%;max-width:360px;display:flex;flex-direction:column;gap:18px}
.ib-demo{display:flex;flex-direction:column;gap:7px}
.ib-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#64748b}
.ib-track{position:relative;height:8px;background:#1e293b;border-radius:6px;overflow:hidden}
.ib-slim{height:4px}

/* 1) Single sliding fill that grows and shrinks as it crosses (Material style). */
.ib-fill{position:absolute;top:0;bottom:0;left:0;background:linear-gradient(90deg,#6366f1,#8b5cf6);border-radius:6px;width:40%;
  animation:ibSlide 1.6s cubic-bezier(.65,.05,.36,1) infinite}
@keyframes ibSlide{0%{left:-40%;width:40%}50%{left:30%;width:55%}100%{left:100%;width:40%}}

/* 2) Classic two-dash Material indeterminate. */
.ib-a{background:#6366f1;transform-origin:left;animation:ibA 2s cubic-bezier(.65,.815,.735,.395) infinite}
.ib-b{background:#a5b4fc;transform-origin:left;animation:ibB 2s cubic-bezier(.3,.38,.55,.96) infinite;animation-delay:1.15s}
@keyframes ibA{0%{left:-35%;right:100%}60%{left:100%;right:-90%}100%{left:100%;right:-90%}}
@keyframes ibB{0%{left:-200%;right:100%}60%{left:107%;right:-8%}100%{left:107%;right:-8%}}
.ib-a,.ib-b{position:absolute;top:0;bottom:0}

/* 3) Animated diagonal stripes flowing. */
.ib-stripes{position:absolute;inset:0;background-image:repeating-linear-gradient(45deg,#6366f1 0,#6366f1 10px,#818cf8 10px,#818cf8 20px);background-size:28px 28px;animation:ibStripe .6s linear infinite}
@keyframes ibStripe{to{background-position:28px 0}}

/* 4) Determinate (driven by JS). */
.ib-det{position:absolute;top:0;bottom:0;left:0;width:0;background:linear-gradient(90deg,#22c55e,#10b981);border-radius:6px;transition:width .3s}

.ib-paused .ib-fill,.ib-paused .ib-a,.ib-paused .ib-b,.ib-paused .ib-stripes{animation-play-state:paused}

.ib-btn{align-self:center;margin-top:6px;background:#6366f1;color:#fff;border:none;border-radius:9px;padding:9px 20px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.ib-btn:hover{background:#4f46e5}`,

  js: `var stage = document.querySelector('.ib-stage');
var toggle = document.getElementById('ibToggle');

// Pause/resume all CSS animations by toggling animation-play-state via a class.
toggle.addEventListener('click', function () {
  var paused = stage.classList.toggle('ib-paused');
  toggle.textContent = paused ? 'Resume' : 'Pause';
});

// The determinate bar simulates real progress that completes then restarts.
var det = document.getElementById('ibDet');
var p = 0;
setInterval(function () {
  if (stage.classList.contains('ib-paused')) return;
  p += Math.random() * 14;
  if (p >= 100) p = 0;
  det.style.width = p + '%';
}, 500);`,

  seo: {
    title: 'Indeterminate Bar — Loading Progress Bar HTML CSS JS',
    description: `Four indeterminate progress bars — sliding, two-dash, flowing stripes, plus a determinate bar — with a pause toggle. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Indeterminate Progress Bars — Sliding, Two-Dash, Striped, and Determinate',
      description: `An indeterminate progress bar shows that work is happening when you cannot measure how much is left — the looping animation that says "loading" without a percentage. This snippet collects four progress-bar styles in plain HTML and CSS, plus a determinate bar driven by JavaScript and a pause control, so you can pick the right one for any loading state — no library.

**Four loaders, pure CSS**

The first three bars are animation-only, no JavaScript: a **single sliding fill** that grows and shrinks as it sweeps across (the modern Material look), the **classic two-dash Material** indeterminate (two bars chasing each other with offset timing), and **flowing diagonal stripes** (a repeating gradient whose \`background-position\` animates). Each is a different visual idiom for "indeterminate," and each is achieved entirely with \`@keyframes\` on a small element inside an \`overflow: hidden\` track. Having them side by side makes it easy to choose the style that fits your UI.

**Why animate position and transform, not width repeatedly**

The bars animate \`left\`/\`right\` or \`background-position\` in tight loops; the sliding fill also varies its width within the keyframes to get the accelerate-and-stretch feel. Keeping the motion in CSS keyframes means it runs on the compositor, stays smooth, and needs no JavaScript ticking — the right way to do a continuous loading animation versus a JS interval nudging styles every frame.

**A determinate bar for when you can measure**

The fourth bar is determinate: its width is set from JavaScript to a real percentage with a CSS \`transition\` smoothing each change. The demo simulates progress that climbs and restarts, but in practice you would set the width from an upload's loaded/total or a task's completed count. Showing both kinds together highlights the key decision: use indeterminate when you cannot know the total, determinate when you can — and switch to determinate as soon as you can, since a real percentage reassures users more.

**One pause control for all**

A single button toggles a class that sets \`animation-play-state: paused\` on every animated bar, freezing them in place, and the determinate simulation respects the same paused flag. Pausing via \`animation-play-state\` (rather than removing the animation) keeps each bar exactly where it stopped and resumes seamlessly — the clean way to pause CSS animations.

**Drop-in and adaptable**

Each bar is independent, so copy just the style you need. Recolour the gradients, change the track height (a slim variant is included), or adjust the timing. It is a clear, dependency-free reference for indeterminate-loader techniques and the indeterminate-versus-determinate choice every loading UI faces. Accessibility is worth adding on top of the visuals: pair any of these tracks with \`role="progressbar"\`, and for the determinate bar set \`aria-valuenow\`/\`aria-valuemin\`/\`aria-valuemax\` from the same percentage driving the width so assistive tech reports real progress; the indeterminate bars should omit \`aria-valuenow\` entirely, which is the ARIA convention for signalling "busy, but no measurable value."`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Four progress bars render: sliding, two-dash, striped, and a determinate bar.` },
      { title: 'Pick a style', text: `Copy the single bar whose look fits your UI — each is self-contained.` },
      { title: 'Pause and resume', text: `Click the button to freeze all animations via animation-play-state and resume them.` },
      { title: 'Use indeterminate when unknown', text: `Show a looping bar while a request is in flight with no measurable total.` },
      { title: 'Drive the determinate bar', text: `Set the determinate fill width from your real progress (loaded/total).` },
      { title: 'Restyle it', text: `Change the gradients, track height, or timing to match your theme.` },
    ] },
    features: [
      { title: 'Four bar styles', text: `Sliding fill, two-dash Material, flowing stripes, and a determinate bar.` },
      { title: 'CSS-only indeterminate', text: `The three loops run entirely on @keyframes — no JavaScript ticking.` },
      { title: 'Accelerate-and-stretch motion', text: `The sliding fill varies width within the keyframes for the Material feel.` },
      { title: 'Striped flow', text: `An animated repeating-gradient background-position for the barber-pole look.` },
      { title: 'Determinate with transition', text: `A JS-set width smoothed by a CSS transition for measurable progress.` },
      { title: 'Pause / resume all', text: `One class toggles animation-play-state across every bar, freezing in place.` },
      { title: 'Slim variant', text: `A thinner track option for tight layouts.` },
      { title: 'Independent & no library', text: `Copy any single bar; plain HTML/CSS/JS with zero dependencies.` },
    ],
    useCases: [
      { title: 'App and page loading', text: `Show activity while data loads — pair with a [top loading bar](/ui-snippets/top-loading-bar/) for route changes.` },
      { title: 'Form and request submission', text: `An indeterminate bar while a request is in flight, alongside a [loading button](/ui-snippets/loading-button/).` },
      { title: 'Uploads and downloads', text: `Use the determinate bar with real percentages, next to an [upload progress](/ui-snippets/upload-progress/).` },
      { title: 'Background tasks', text: `Indicate ongoing work of unknown length.` },
      { title: 'Skeletons and placeholders', text: `Pair a bar with a [skeleton loader](/ui-snippets/skeleton-loader/) during fetches.` },
      { title: 'Learning loader animation', text: `A reference for indeterminate techniques and the determinate trade-off — compare with a [progress bar](/ui-snippets/progress-bar/).` },
      { icon: 'CODE', title: 'Related: Concentric Rings Progress Loader', desc: 'See the [Concentric Rings Progress Loader](/ui-snippets/loader-concentric-rings-progress/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'When should I use an indeterminate vs. a determinate bar?', a: `Use an indeterminate bar when you cannot measure how much work remains — a request in flight, a task with no known total — so it just communicates "something is happening." Use a determinate bar when you can compute progress (bytes loaded ÷ total, steps done ÷ steps). Prefer determinate whenever possible and switch to it as soon as a total is known, because a real percentage reassures users far more than an endless loop.` },
      { q: 'Why keep the animation in CSS instead of JavaScript?', a: `CSS @keyframes animations run on the browser's compositor, stay smooth even when the main thread is busy (which is common during loading), and need no JavaScript loop nudging styles each frame. For a continuous indeterminate loader, that is both more efficient and more reliable than a setInterval/requestAnimationFrame ticking the width — the JS here only drives the determinate bar and the pause toggle.` },
      { q: 'How does the pause work?', a: `A button toggles a class on the container that applies animation-play-state: paused to every animated bar. Unlike removing the animation, paused freezes each bar exactly where it is and resumes from that point when unpaused — no jump. The determinate simulation also checks the paused flag so it stops advancing too. It is the clean, jump-free way to pause CSS animations.` },
      { q: 'How is the two-dash Material bar built?', a: `Two absolutely-positioned bars animate their left and right insets with offset timing and easing so one shoots across, then the second follows, creating the familiar two-dash chase. It is purely CSS keyframes on each bar with a delay on the second. Copy that one block (the .ib-a/.ib-b rules and keyframes) if that is the style you want.` },
      { q: 'How do I use these bars in React, Vue, or Angular?', a: `The indeterminate bars are pure CSS, so they drop in as-is — just render the markup. For the determinate bar, hold the percentage in state and bind the fill width (style width), updating it from your real progress. For pause, toggle the class from state. The animations are framework-agnostic; only the determinate width and pause flag move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to hand-trace every keyframe percentage yourself. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through why the ibA and ibB keyframes use different cubic-bezier easing curves and staggered animation-delay values to produce the classic two-dash chase, or why animation-play-state is used for pausing instead of removing the animation class outright. The same assistant is useful for optimizing it — ask whether four simultaneous looping animations on one page could be consolidated, or whether the determinate bar's setInterval-based simulation should instead be driven by real fetch progress events. It is equally useful for extending the set: ask it to add aria-valuenow wiring for the determinate bar, a buffering variant like a video scrubber, or a color-shifting bar that turns from indeterminate to determinate once a real total becomes known. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a set of four loading progress bars in plain HTML, CSS, and JavaScript using only CSS keyframe animations for the indeterminate ones, plus one JavaScript-driven determinate bar — no libraries.

Requirements:
- Bar 1 (sliding fill): a single absolutely positioned fill element inside an overflow-hidden track that animates both its left offset and its width across a single keyframes loop, so it appears to accelerate, stretch, and shrink as it sweeps across, similar to Material Design's indeterminate bar.
- Bar 2 (two-dash chase): two separate absolutely positioned fill elements, each animating its left and right insets on its own keyframes with different cubic-bezier easing curves, and the second element's animation delayed by roughly half the first's duration, so they appear to chase each other continuously.
- Bar 3 (striped flow): a track whose background is a repeating-linear-gradient diagonal stripe pattern, animated purely by shifting background-position in a keyframes loop for a continuous barber-pole scrolling effect.
- Bar 4 (determinate): a fill element whose width is set from JavaScript to a real numeric percentage, with a CSS transition so width changes animate smoothly, driven here by a setInterval that randomly increments progress and resets at 100 percent.
- A single pause and resume button that toggles one class on a shared container, and that class must apply animation-play-state: paused to every animated element in bars 1 through 3 simultaneously, freezing them exactly where they are without resetting position, and the determinate bar's interval must also check this paused state before advancing.
- All four bars must be visually independent and copy-pasteable on their own without needing the others' markup or CSS.`,
    },
  },
};

export default indeterminateBar;
