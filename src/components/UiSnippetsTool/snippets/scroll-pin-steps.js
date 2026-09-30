const scrollPinSteps = {
  id: 'scroll-pin-steps',
  title: 'Scroll Pin Steps',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="ps-top"><p>Scroll ↓</p></section>
<section class="ps-pin" id="psPin">
  <div class="ps-left">
    <span class="ps-kicker">How it works</span>
    <h2 class="ps-num" id="psNum">01</h2>
    <h3 class="ps-head" id="psHead">Connect your data</h3>
    <p class="ps-body" id="psBody">Link a database, warehouse, or API in a couple of clicks.</p>
    <div class="ps-track"><span class="ps-track-fill" id="psFill"></span></div>
  </div>
  <div class="ps-right" id="psRight">
    <div class="ps-visual" data-i="0" style="--c:#6366f1">🔌</div>
    <div class="ps-visual" data-i="1" style="--c:#0ea5e9">🧩</div>
    <div class="ps-visual" data-i="2" style="--c:#10b981">📊</div>
    <div class="ps-visual" data-i="3" style="--c:#f59e0b">🚀</div>
  </div>
</section>
<section class="ps-bottom"><p>Four steps, one pinned panel.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0c14;color:#fff}
.ps-top,.ps-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.ps-pin{height:100vh;display:flex;align-items:center;gap:clamp(24px,6vw,80px);padding:0 clamp(24px,7vw,120px);max-width:1180px;margin:0 auto}
.ps-left{flex:1;min-width:0}
.ps-kicker{font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9fb4ff}
.ps-num{font-size:clamp(40px,7vw,84px);letter-spacing:-.03em;line-height:1;margin:6px 0 4px;background:linear-gradient(120deg,#fff,#9aa6ff);-webkit-background-clip:text;background-clip:text;color:transparent}
.ps-head{font-size:clamp(22px,3.4vw,34px);letter-spacing:-.01em;margin-bottom:10px}
.ps-body{color:#aab0c6;font-size:clamp(15px,2vw,18px);max-width:380px;line-height:1.6}
.ps-track{margin-top:24px;height:4px;background:#1e2335;border-radius:999px;overflow:hidden}
.ps-track-fill{display:block;height:100%;width:0;background:linear-gradient(90deg,#6366f1,#0ea5e9);border-radius:999px}
.ps-right{flex:1;position:relative;aspect-ratio:1;max-width:380px}
.ps-visual{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:96px;border-radius:28px;background:radial-gradient(70% 70% at 50% 30%,color-mix(in srgb,var(--c) 45%,#0a0c14),#0a0c14);border:1px solid color-mix(in srgb,var(--c) 40%,#0a0c14);opacity:0}
.ps-visual[data-i="0"]{opacity:1}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var STEPS = [
  { num: '01', head: 'Connect your data', body: 'Link a database, warehouse, or API in a couple of clicks.' },
  { num: '02', head: 'Model & transform', body: 'Shape raw tables into clean, query-ready datasets.' },
  { num: '03', head: 'Build dashboards', body: 'Drag widgets onto a canvas — no SQL required.' },
  { num: '04', head: 'Share & ship', body: 'Publish and invite your whole team in one click.' }
];

var numEl = document.getElementById('psNum');
var headEl = document.getElementById('psHead');
var bodyEl = document.getElementById('psBody');
var fill = document.getElementById('psFill');
var visuals = gsap.utils.toArray('.ps-visual');
var current = -1;

function show(i) {
  if (i === current) return;
  current = i;
  var s = STEPS[i];
  numEl.textContent = s.num; headEl.textContent = s.head; bodyEl.textContent = s.body;
  // Crossfade visuals.
  visuals.forEach(function (v, j) { gsap.to(v, { opacity: j === i ? 1 : 0, duration: 0.4 }); });
  // Pop the text in.
  gsap.fromTo([numEl, headEl, bodyEl], { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, overwrite: true });
}

// Pin the panel for 4 screens; map scroll progress to the active step + fill.
ScrollTrigger.create({
  trigger: '#psPin',
  start: 'top top',
  end: '+=300%',
  pin: true,
  scrub: true,
  onUpdate: function (self) {
    var i = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
    show(i);
    fill.style.width = (self.progress * 100) + '%';
  }
});

show(0);`,

  seo: {
    title: 'Scroll Pin Steps — Free GSAP ScrollTrigger Steps Snippet',
    description: `A pinned how-it-works panel whose text and visual swap per step as you scroll, with a progress bar, via GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Pin Steps — A Pinned Panel That Advances as You Scroll',
      description: `Scroll pin steps is the "how it works" pattern where a two-column panel sticks to the screen and its content — step number, heading, body, and visual — swaps from one step to the next as you scroll, with a progress bar tracking how far through you are. This snippet builds it with GSAP and ScrollTrigger (from a CDN), plus plain HTML and CSS.

**Pin once, scroll through many steps**

A single \`ScrollTrigger\` pins the panel with \`pin: true\` and runs for \`end: '+=300%'\` — three extra screens of scroll for four steps. During that pinned window, \`onUpdate\` reads \`self.progress\` (0 to 1) and maps it to a step index with \`Math.floor(progress × stepCount)\`. So one pinned section presents the entire sequence without repeating markup for each step — the content is data, swapped in place.

**Data-driven content**

The steps live in a \`STEPS\` array of \`{ num, head, body }\`. A \`show(i)\` function writes the active step's text into the panel and crossfades to the matching visual. Guarding with \`if (i === current) return\` means the swap only runs when the step actually changes, not on every scroll frame — important because \`onUpdate\` fires constantly while pinned.

**Crossfading visuals and popping text**

When the step changes, the visuals crossfade via opacity tweens (only the active one is shown), and the text elements pop in with a small \`fromTo\` rise-and-fade plus a stagger, using \`overwrite: true\` so rapid scrolling can't stack half-finished tweens. This gives each step a clean micro-transition instead of a hard text replacement.

**The progress bar**

Because \`onUpdate\` also has the continuous \`self.progress\`, the snippet sets a fill bar's width to \`progress × 100%\` every frame — a smooth, scrubbed indicator of position within the pinned section that's independent of the discrete step swaps. It gives the viewer a sense of "how much is left" while the steps tick over.

**Discrete steps from a continuous scroll**

The interesting part is mixing two readings of the same scroll: a continuous one for the progress bar, and a quantized one (\`floor\`) for which step is active. ScrollTrigger's single \`progress\` value drives both, so they stay perfectly in sync — the bar is exactly one-quarter full as step two begins, and so on.

**Customizing it**

Add steps to the array (and matching visuals) and bump the \`end\` accordingly, change the per-step transitions, swap emoji for real images or components, or flip the columns. Pair it with a [scroll horizontal pin](/ui-snippets/scroll-horizontal-pin/), a [progress wizard](/ui-snippets/progress-wizard/), or [scroll sticky stack](/ui-snippets/scroll-sticky-stack/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A two-column panel renders with step one.` },
      { title: 'Scroll down', text: `The panel pins and steps advance in place.` },
      { title: 'Watch the bar', text: `The progress fill tracks your position.` },
      { title: 'Scroll back up', text: `Steps reverse — everything is scrubbed.` },
      { title: 'Add a step', text: `Extend the STEPS array and the end value.` },
    ] },
    features: [
      { title: 'Pinned panel', text: `One section presents all steps.` },
      { title: 'Progress-to-step', text: `floor(progress × count) picks the step.` },
      { title: 'Data-driven steps', text: `Content lives in a STEPS array.` },
      { title: 'Change-guarded swaps', text: `Only updates when the step changes.` },
      { title: 'Crossfade visuals', text: `Active visual fades in per step.` },
      { title: 'Text pop-in', text: `Staggered rise-and-fade per change.` },
      { title: 'Scrubbed bar', text: `Fill width tracks continuous progress.` },
      { title: 'Synced readings', text: `One progress drives bar and steps.` },
    ],
    useCases: [
      { title: 'How it works', text: `Pair with a [progress wizard](/ui-snippets/progress-wizard/).` },
      { title: 'Onboarding', text: `Explain steps before an [onboarding tour](/ui-snippets/onboarding-tour/).` },
      { title: 'Product tours', text: `Lead into a [scroll horizontal pin](/ui-snippets/scroll-horizontal-pin/).` },
      { title: 'Feature flows', text: `Showcase beside [feature cards](/ui-snippets/feature-cards/).` },
      { title: 'Stacking', text: `Combine with [scroll sticky stack](/ui-snippets/scroll-sticky-stack/).` },
      { title: 'Pipelines', text: `Visualize stages of a [status dashboard](/ui-snippets/status-dashboard/).` },
      { icon: 'CODE', title: 'Related: Scroll-Snap Peek Carousel', desc: 'See the [Scroll-Snap Peek Carousel](/ui-snippets/scroll-snap-peek-carousel/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does one pinned section show several steps?', a: `A single ScrollTrigger pins the panel and runs for end: +=300%, three extra screens for four steps. In onUpdate it reads self.progress from 0 to 1 and maps it to a step index with floor(progress times stepCount). So the whole sequence plays inside one pinned section, with the content swapped in place rather than duplicated per step.` },
      { q: 'Why guard the step swap with a change check?', a: `onUpdate fires on every scroll frame while pinned, but the step only changes occasionally. The if (i === current) return guard ensures the text write, visual crossfade, and pop-in tweens run only when the active step actually changes, avoiding redundant work and preventing the entrance animation from restarting every frame.` },
      { q: 'How does the progress bar stay in sync with the steps?', a: `Both come from the same self.progress value. The bar width is set to progress times 100% continuously, while the active step is the floored progress times step count. Because one number drives both, the bar is exactly one quarter full as the second step begins, and so on — the continuous and quantized readings never drift.` },
      { q: 'How are the per-step transitions kept clean during fast scrolls?', a: `Visuals crossfade with opacity tweens so only the active one shows, and the text pops in with a fromTo rise-and-fade. Passing overwrite: true means a new step's tween cancels any in-flight one, so rapid scrolling cannot stack half-finished animations — each step lands in a clean state.` },
      { q: 'How do I use this scroll pin steps in React, Vue, or Angular?', a: `Keep the steps array in your component and, in a mount effect, register ScrollTrigger and create the pinned trigger whose onUpdate updates state (active index and progress) or writes to refs. Return a cleanup that reverts the GSAP context so the pin is removed on unmount. Render the active step from state; the CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reason through the progress-to-step mapping alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly why Math.floor(self.progress * STEPS.length) is the right formula for picking the active step, or why guarding show(i) with an if (i === current) return check matters when onUpdate fires on every single scroll frame. The same assistant can help optimize it — asking whether the crossfade and pop-in tweens should use gsap.timeline with overwrite instead of individual tweens as more steps are added, or whether the progress bar write could be batched with the step-swap logic. It's also useful for extending the effect: ask it to add per-step sound cues, sync the ps-visual crossfades to real screenshots or Lottie animations, or make the panel snap so scroll settles cleanly on step boundaries. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll pin steps" how-it-works panel in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN).

Requirements:
- A two-column pinned section: a left column showing a step number, heading, body text, and a thin progress-fill bar; a right column with one visual per step, all absolutely positioned on top of each other, only the first one visible at load.
- Store all step content (number, heading, body) in a plain JavaScript array of objects, not hardcoded per-step markup, so adding a step means adding one array entry.
- Create a single ScrollTrigger (not a full timeline) with pin: true, scrub: true, and an end distance long enough to give each step comfortable room (e.g. 300% of the viewport for four steps), and read self.progress inside its onUpdate callback.
- Inside onUpdate, compute the active step index as Math.floor(progress times step count), clamped to the last valid index, and only re-render the step's text and crossfade the visuals when that index actually differs from the previously active one — do not re-run the reveal animation on every scroll frame.
- When the active step changes, crossfade the visuals (fade out the previous one, fade in the new one) and animate the number/heading/body in with a small staggered rise-and-fade, using overwrite so rapid scrolling can't stack overlapping tweens.
- In that same onUpdate, independently and continuously update a progress-fill bar's width to progress times 100%, so the bar's continuous motion and the stepped content changes are both driven from the exact same progress value and can never drift apart.
- Confirm scrolling back up decrements through the steps in reverse and the bar unfills accordingly, purely because the underlying scroll position is scrubbed - no separate reverse-specific code.`,
    },
  },
};

export default scrollPinSteps;
