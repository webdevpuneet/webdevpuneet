export const LESSONS = [
  // ── Getting Started ───────────────────────────────────────────────────────
  {
    id: 'gsap-to',
    chapter: 'Getting Started',
    title: 'gsap.to()',
    type: 'live',
    concept: '`gsap.to()` animates an element **from its current state to the values you specify**. The first argument is a CSS selector or DOM element. The second is a vars object with target values and a `duration` in seconds. Edit the values and watch the box move.',
    code: `gsap.to(".box", {
  x: 200,
  duration: 1,
  ease: "power2.out"
});`,
  },
  {
    id: 'gsap-from',
    chapter: 'Getting Started',
    title: 'gsap.from()',
    type: 'live',
    concept: '`gsap.from()` animates **from the values you provide back to the element\'s current state**. Perfect for entrance animations — the element starts invisible or off-screen and tweens into position.',
    challenge: {
      question: 'What does gsap.from() animate toward?',
      options: ['The values you pass in', 'The element\'s current/natural state', 'Zero for all properties', 'The previous tween\'s end state'],
      correct: 1,
    },
    code: `gsap.from(".box", {
  x: -200,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});`,
  },
  {
    id: 'gsap-fromto',
    chapter: 'Getting Started',
    title: 'gsap.fromTo()',
    type: 'live',
    concept: '`gsap.fromTo()` gives you **full control** over both start and end values. Three arguments: target, fromVars, toVars. Use this when you need to define both states explicitly regardless of current element state.',
    code: `gsap.fromTo(".box",
  { x: -180, opacity: 0, scale: 0.5 },
  { x: 180, opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.4)" }
);`,
  },
  {
    id: 'duration-delay',
    chapter: 'Getting Started',
    title: 'duration & delay',
    type: 'live',
    concept: '`duration` sets how long the animation takes (seconds). `delay` postpones the start. Both accept decimals. Use them to sequence simple animations without a full timeline.',
    code: `// Starts immediately
gsap.to(".box:nth-child(1)", {
  x: 180, duration: 0.6
});

// Starts 0.7s later
gsap.to(".box:nth-child(2)", {
  x: 180, duration: 0.6, delay: 0.7
});

// Starts 1.4s later
gsap.to(".box:nth-child(3)", {
  x: 180, duration: 0.6, delay: 1.4
});`,
  },

  // ── Properties ───────────────────────────────────────────────────────────
  {
    id: 'x-y',
    chapter: 'Properties',
    title: 'x & y (translate)',
    type: 'live',
    concept: '`x` and `y` map to `translateX` and `translateY` via CSS transform — **GPU-accelerated** and far cheaper than animating `left` or `top`. Values in pixels by default. Use `xPercent` and `yPercent` for percentage-based movement.',
    code: `gsap.to(".box", {
  x: 200,
  y: 80,
  duration: 1.2,
  ease: "power2.inOut"
});`,
  },
  {
    id: 'rotation-scale',
    chapter: 'Properties',
    title: 'rotation & scale',
    type: 'live',
    concept: '`rotation` accepts degrees (positive = clockwise). `scale` is a multiplier — `2` doubles size, `0.5` halves it. `scaleX` and `scaleY` affect individual axes. All use CSS transform and compose without conflict.',
    challenge: {
      question: 'What value of scale makes an element twice as big?',
      options: ['100', '200', '2', '0.5'],
      correct: 2,
    },
    code: `gsap.to(".box", {
  rotation: 360,
  scale: 1.6,
  duration: 1.4,
  ease: "power2.inOut"
});`,
  },
  {
    id: 'opacity-autovalpha',
    chapter: 'Properties',
    title: 'opacity & autoAlpha',
    type: 'picker',
    concept: '`opacity` fades between 0 and 1. `autoAlpha` is a GSAP shorthand that also toggles `visibility: hidden` when opacity reaches 0 — this removes the element from pointer events and accessibility trees when fully hidden.',
    options: [
      {
        label: 'opacity',
        code: `gsap.fromTo(".box",
  { opacity: 0 },
  { opacity: 1, duration: 1.2, ease: "power2.out" }
);`,
      },
      {
        label: 'autoAlpha',
        code: `// autoAlpha = opacity + visibility combined
gsap.fromTo(".box",
  { autoAlpha: 0 },
  { autoAlpha: 1, duration: 1.2, ease: "power2.out" }
);`,
      },
    ],
  },
  {
    id: 'css-properties',
    chapter: 'Properties',
    title: 'CSS properties',
    type: 'live',
    concept: 'GSAP animates any CSS property by converting camelCase names (`backgroundColor`, `borderRadius`). It also handles colour interpolation between any valid CSS colour values automatically.',
    code: `gsap.to(".box", {
  backgroundColor: "#88ce02",
  borderRadius: "50%",
  boxShadow: "0 0 0 8px rgba(136,206,2,0.25)",
  duration: 1.2,
  ease: "power2.inOut"
});`,
  },

  // ── Easing ───────────────────────────────────────────────────────────────
  {
    id: 'power-ease',
    chapter: 'Easing',
    title: 'Power eases',
    type: 'picker',
    concept: 'Eases control the **rate of change** over time. Power eases (power1–4) are the workhorses. `.in` starts slow and accelerates. `.out` starts fast and decelerates. `.inOut` does both. Higher numbers = more dramatic effect.',
    challenge: {
      question: 'Which ease variant starts fast then slows to a stop?',
      options: ['power2.in', 'power2.out', 'power2.inOut', 'none'],
      correct: 1,
    },
    options: [
      {
        label: 'power2.in',
        code: `gsap.fromTo(".box",
  { x: 0 }, { x: 240, duration: 1.5, ease: "power2.in" }
);`,
      },
      {
        label: 'power2.out',
        code: `gsap.fromTo(".box",
  { x: 0 }, { x: 240, duration: 1.5, ease: "power2.out" }
);`,
      },
      {
        label: 'power2.inOut',
        code: `gsap.fromTo(".box",
  { x: 0 }, { x: 240, duration: 1.5, ease: "power2.inOut" }
);`,
      },
      {
        label: 'linear',
        code: `gsap.fromTo(".box",
  { x: 0 }, { x: 240, duration: 1.5, ease: "linear" }
);`,
      },
    ],
  },
  {
    id: 'special-ease',
    chapter: 'Easing',
    title: 'Bounce, Elastic & Back',
    type: 'picker',
    concept: '**bounce** simulates physical bounce on landing. **elastic** overshoots and oscillates like a spring — the two numbers control amplitude and period. **back** slightly overshoots and snaps back — great for button and card interactions.',
    options: [
      {
        label: 'bounce.out',
        code: `gsap.to(".box", {
  y: 160,
  duration: 1.5,
  ease: "bounce.out"
});`,
      },
      {
        label: 'elastic.out',
        code: `gsap.to(".box", {
  scale: 2,
  duration: 1.5,
  ease: "elastic.out(1, 0.3)"
});`,
      },
      {
        label: 'back.out',
        code: `gsap.to(".box", {
  x: 200,
  duration: 1,
  ease: "back.out(2)"
});`,
      },
    ],
  },
  {
    id: 'steps-ease',
    chapter: 'Easing',
    title: 'Steps & none',
    type: 'picker',
    concept: '`"steps(n)"` snaps the animation into `n` discrete jumps — useful for sprite-sheet animations and retro effects. `"none"` is an alias for `"linear"` — constant speed with no easing.',
    options: [
      {
        label: 'steps(8)',
        code: `gsap.to(".box", {
  x: 220,
  duration: 1.2,
  ease: "steps(8)"
});`,
      },
      {
        label: 'none (linear)',
        code: `gsap.to(".box", {
  x: 220,
  rotation: 180,
  duration: 1.2,
  ease: "none"
});`,
      },
    ],
  },

  // ── Timelines ────────────────────────────────────────────────────────────
  {
    id: 'timeline-basics',
    chapter: 'Timelines',
    title: 'Timeline basics',
    type: 'live',
    concept: 'A `gsap.timeline()` sequences tweens automatically — each `.to()` starts when the previous one ends. No manual delay math. The whole sequence is a single controllable object.',
    challenge: {
      question: 'What does a gsap.timeline() do by default between tweens?',
      options: ['Plays them all at once', 'Plays each after the previous ends', 'Adds a 0.5s gap between each', 'Reverses every other tween'],
      correct: 1,
    },
    code: `const tl = gsap.timeline();

tl.to(".box:nth-child(1)", { x: 200, duration: 0.5 })
  .to(".box:nth-child(2)", { x: 200, duration: 0.5 })
  .to(".box:nth-child(3)", { x: 200, duration: 0.5 });`,
  },
  {
    id: 'timeline-position',
    chapter: 'Timelines',
    title: 'Position parameter',
    type: 'picker',
    concept: 'The **position parameter** (third arg to `.to()`) controls when a tween starts relative to the timeline. `"<"` = same time as previous. `"-=0.3"` = 0.3s before previous ends. `"+=0.2"` = 0.2s after previous ends.',
    options: [
      {
        label: '< (overlap)',
        note: 'All three start at the same time',
        code: `const tl = gsap.timeline();
tl.to(".box:nth-child(1)", { x: 200, duration: 0.8 })
  .to(".box:nth-child(2)", { y: 80, duration: 0.8 }, "<")
  .to(".box:nth-child(3)", { scale: 1.5, duration: 0.8 }, "<");`,
      },
      {
        label: '-=0.3 (partial overlap)',
        note: 'Each starts 0.3s before the previous ends',
        code: `const tl = gsap.timeline();
tl.to(".box:nth-child(1)", { x: 200, duration: 0.8 })
  .to(".box:nth-child(2)", { x: 200, duration: 0.8 }, "-=0.3")
  .to(".box:nth-child(3)", { x: 200, duration: 0.8 }, "-=0.3");`,
      },
      {
        label: '+=0.2 (gap)',
        note: 'Each starts 0.2s after the previous ends',
        code: `const tl = gsap.timeline();
tl.to(".box:nth-child(1)", { x: 200, duration: 0.5 })
  .to(".box:nth-child(2)", { x: 200, duration: 0.5 }, "+=0.2")
  .to(".box:nth-child(3)", { x: 200, duration: 0.5 }, "+=0.2");`,
      },
    ],
  },
  {
    id: 'timeline-defaults',
    chapter: 'Timelines',
    title: 'defaults',
    type: 'live',
    concept: 'Pass a `defaults` object when creating a timeline to apply shared properties to every tween inside it. This avoids repeating `ease`, `duration`, or other common values across all `.to()` calls.',
    code: `const tl = gsap.timeline({
  defaults: { duration: 0.6, ease: "power3.out" }
});

tl.from(".box:nth-child(1)", { x: -200, opacity: 0 })
  .from(".box:nth-child(2)", { x: -200, opacity: 0 })
  .from(".box:nth-child(3)", { x: -200, opacity: 0 });`,
  },
  {
    id: 'timeline-controls',
    chapter: 'Timelines',
    title: 'Timeline controls',
    type: 'live',
    concept: 'Timelines expose `.play()`, `.pause()`, `.reverse()`, `.seek(time)`, and `.progress(0–1)`. Create with `{ paused: true }` and drive playback from user events, scroll, or any other trigger.',
    code: `const tl = gsap.timeline({ paused: true, defaults: { duration: 0.5 } });

tl.to(".box:nth-child(1)", { x: 190 })
  .to(".box:nth-child(2)", { x: 190 })
  .to(".box:nth-child(3)", { x: 190 });

const row = document.createElement("div");
row.style.cssText = "display:flex;gap:8px;margin-top:12px;flex-wrap:wrap";

[["▶ Play", () => tl.play()],
 ["⏸ Pause", () => tl.pause()],
 ["↩ Reverse", () => tl.reverse()],
 ["⟳ Restart", () => tl.restart()]
].forEach(([label, fn]) => {
  const b = document.createElement("button");
  b.textContent = label;
  b.onclick = fn;
  row.appendChild(b);
});
app.appendChild(row);`,
  },

  // ── Stagger ──────────────────────────────────────────────────────────────
  {
    id: 'stagger-basics',
    chapter: 'Stagger',
    title: 'stagger basics',
    type: 'live',
    concept: '`stagger` delays the start of each element in a matched set by a fixed amount. Pass a number for even spacing. GSAP distributes the animation across all matching elements automatically.',
    code: `gsap.from(".box", {
  opacity: 0,
  y: 50,
  scale: 0.6,
  duration: 0.6,
  stagger: 0.15,
  ease: "back.out(1.4)"
});`,
  },
  {
    id: 'stagger-from',
    chapter: 'Stagger',
    title: 'stagger from',
    type: 'picker',
    concept: 'Pass an object to `stagger` to control the starting point: `"start"`, `"end"`, `"center"`, or `"edges"`. The `each` property sets the delay between each element.',
    options: [
      {
        label: 'from: start',
        code: `gsap.from(".box", {
  opacity: 0, x: -60, duration: 0.5,
  stagger: { each: 0.15, from: "start" },
  ease: "power2.out"
});`,
      },
      {
        label: 'from: end',
        code: `gsap.from(".box", {
  opacity: 0, x: 60, duration: 0.5,
  stagger: { each: 0.15, from: "end" },
  ease: "power2.out"
});`,
      },
      {
        label: 'from: center',
        code: `gsap.from(".box", {
  opacity: 0, scale: 0.3, duration: 0.5,
  stagger: { each: 0.15, from: "center" },
  ease: "back.out"
});`,
      },
    ],
  },

  // ── Repeat & Yoyo ────────────────────────────────────────────────────────
  {
    id: 'repeat',
    chapter: 'Repeat & Yoyo',
    title: 'repeat',
    type: 'live',
    concept: '`repeat: n` plays the tween `n` extra times after the first play. `repeat: -1` loops forever. Add `repeatDelay` for a pause between each cycle.',
    code: `gsap.to(".box", {
  x: 200,
  duration: 0.8,
  repeat: 3,
  repeatDelay: 0.3,
  ease: "power1.inOut"
});`,
  },
  {
    id: 'yoyo',
    chapter: 'Repeat & Yoyo',
    title: 'yoyo',
    type: 'live',
    concept: '`yoyo: true` reverses direction on alternating repeats — forward, backward, forward. Most useful with `repeat: -1` for a continuous ping-pong loop. Combine with `ease` for natural-feeling back-and-forth motion.',
    challenge: {
      question: 'What does yoyo: true do on each even repeat?',
      options: ['Speeds up the animation', 'Plays in reverse', 'Resets to start position', 'Adds a delay'],
      correct: 1,
    },
    code: `gsap.to(".box", {
  x: 210,
  duration: 0.9,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});`,
  },

  // ── Callbacks ────────────────────────────────────────────────────────────
  {
    id: 'on-complete',
    chapter: 'Callbacks',
    title: 'onComplete',
    type: 'live',
    concept: '`onComplete` fires once when a tween finishes. Use it to trigger follow-up logic, chain independent animations, update UI state, or kick off the next step in a sequence.',
    code: `gsap.to(".box", {
  x: 200,
  duration: 1,
  ease: "power2.out",
  onComplete() {
    gsap.to(".box", {
      backgroundColor: "#88ce02",
      scale: 1.4,
      rotation: 180,
      duration: 0.4,
      ease: "back.out(2)"
    });
  }
});`,
  },
  {
    id: 'on-update',
    chapter: 'Callbacks',
    title: 'onStart & onUpdate',
    type: 'live',
    concept: '`onStart` fires once at the beginning. `onUpdate` fires every frame during the animation. Inside `onUpdate`, `this` refers to the tween — use `this.progress()` to read the current progress (0–1).',
    code: `const label = document.createElement("div");
label.style.cssText = "margin-top:12px;font-size:13px;font-family:monospace;color:var(--text,#374151)";
label.textContent = "Ready";
app.appendChild(label);

gsap.to(".box", {
  x: 210,
  duration: 2,
  ease: "power2.inOut",
  onStart()   { label.textContent = "▶ Started"; },
  onUpdate()  { label.textContent = "Progress: " + Math.round(this.progress() * 100) + "%"; },
  onComplete(){ label.textContent = "✓ Done!"; }
});`,
  },

  // ── ScrollTrigger ────────────────────────────────────────────────────────
  {
    id: 'scroll-basics',
    scene: 'scroll',
    chapter: 'ScrollTrigger',
    title: 'ScrollTrigger basics',
    type: 'live',
    concept: '**ScrollTrigger** links animations to scroll position. Add a `scrollTrigger` object to any tween. `trigger` is the element to watch. `start` uses `"elementEdge viewportEdge"` syntax. `toggleActions` controls what happens on enter, leave, re-enter, and re-leave — four states, four actions: `"play pause resume reset"`, `"play none none reverse"`, etc.',
    challenge: {
      question: 'What does toggleActions: "play none none reverse" do when you scroll back up?',
      options: ['Nothing', 'Reverses the animation', 'Restarts from beginning', 'Pauses it'],
      correct: 1,
    },
    code: `// Scroll down to trigger — scroll back up to reverse
gsap.to("#scroll-box", {
  x: 180,
  rotation: 360,
  scale: 1.3,
  backgroundColor: "#88ce02",
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#scroll-box",
    start: "top 80%",
    end: "top 30%",
    toggleActions: "play none none reverse",
    markers: true
  }
});`,
  },
  {
    id: 'scroll-toggle-class',
    scene: 'scroll',
    chapter: 'ScrollTrigger',
    title: 'toggleClass',
    type: 'live',
    concept: '`toggleClass` adds a CSS class when the trigger enters the viewport and removes it when it leaves. No tween needed — useful for CSS-driven animations, active states, or visibility triggers. Pair with a CSS transition for smooth effects.',
    code: `// Inject a style, then toggle a class on scroll
var style = document.createElement("style");
style.textContent = [
  "#scroll-box {",
  "  transition: transform 0.6s ease, background-color 0.6s ease, border-radius 0.4s ease;",
  "}",
  "#scroll-box.active {",
  "  transform: translateX(180px) rotate(360deg);",
  "  background-color: #88ce02;",
  "  border-radius: 50%;",
  "}"
].join("");
document.head.appendChild(style);

ScrollTrigger.create({
  trigger: "#scroll-box",
  start: "top 80%",
  end: "top 30%",
  toggleClass: { targets: "#scroll-box", className: "active" },
  markers: true
});`,
  },
  {
    id: 'scroll-scrub',
    scene: 'scroll',
    chapter: 'ScrollTrigger',
    title: 'scrub',
    type: 'live',
    concept: '`scrub: true` ties the animation directly to the scrollbar — it progresses as you scroll down and reverses as you scroll up. `scrub: 1` adds 1 second of lag for a smoother feel. `start` and `end` define the scroll range.',
    code: `gsap.to("#scroll-box", {
  x: 180,
  rotation: 360,
  scale: 1.4,
  backgroundColor: "#88ce02",
  scrollTrigger: {
    trigger: "#scroll-box",
    start: "top 75%",
    end: "top 25%",
    scrub: 1,
    markers: true
  }
});`,
  },
  {
    id: 'scroll-pin',
    scene: 'scroll',
    chapter: 'ScrollTrigger',
    title: 'pin',
    type: 'live',
    concept: '`pin: true` fixes the trigger element in place while you scroll through the animation. The page content below it moves up but the element stays put until the animation completes. Great for scroll-driven storytelling.',
    code: `gsap.to("#scroll-box", {
  x: 180,
  rotation: 360,
  backgroundColor: "#88ce02",
  scrollTrigger: {
    trigger: "#scroll-box",
    start: "top 60%",
    end: "+=300",
    scrub: 1,
    pin: true,
    markers: true
  }
});`,
  },

  // ── Keyframes ────────────────────────────────────────────────────────────
  {
    id: 'keyframes-array',
    chapter: 'Keyframes',
    title: 'Array keyframes',
    type: 'live',
    concept: 'Pass an array to `keyframes` to define multiple states in a single tween. Each object is applied sequentially with its own `duration`. This avoids chaining multiple tweens for simple multi-step paths.',
    code: `gsap.to(".box", {
  keyframes: [
    { x: 180, duration: 0.4 },
    { y: 100, duration: 0.4 },
    { x: 0,   duration: 0.4 },
    { y: 0,   duration: 0.4 },
  ],
  ease: "power1.inOut"
});`,
  },
  {
    id: 'keyframes-percent',
    chapter: 'Keyframes',
    title: 'Percent keyframes',
    type: 'live',
    concept: 'Use an object with percentage keys (`"0%"`, `"50%"`, `"100%"`) for CSS-@keyframe-style control. This gives precise control over which portion of the total duration each state occupies.',
    code: `gsap.to(".box", {
  duration: 2,
  ease: "none",
  keyframes: {
    "0%":   { x: 0,   y: 0,   backgroundColor: "#6366f1" },
    "33%":  { x: 200, y: 0,   backgroundColor: "#f59e0b" },
    "66%":  { x: 200, y: 100, backgroundColor: "#ef4444" },
    "100%": { x: 0,   y: 100, backgroundColor: "#88ce02" }
  }
});`,
  },

  // ── Real Patterns ─────────────────────────────────────────────────────────
  {
    id: 'card-reveal',
    scene: 'cards',
    chapter: 'Real Patterns',
    title: 'Card reveal',
    type: 'live',
    concept: 'Cards fading up from below on page load is one of the most common UI animation patterns. A timeline with staggered `.from()` calls produces a polished sequence with minimal code.',
    code: `const tl = gsap.timeline({
  defaults: { ease: "power3.out", duration: 0.7 }
});

tl.from(".card", {
  y: 50,
  opacity: 0,
  stagger: 0.15
});`,
  },
  {
    id: 'hero-animation',
    scene: 'hero',
    chapter: 'Real Patterns',
    title: 'Hero entrance',
    type: 'live',
    concept: 'Hero sections animate headline, subtitle, and CTA in sequence. A timeline with a shared `defaults` and slight overlapping via `"-=0.2"` keeps things snappy without feeling rushed.',
    code: `const tl = gsap.timeline({
  defaults: { ease: "power3.out" }
});

tl.from(".heading",  { y: -30, opacity: 0, duration: 0.7 })
  .from(".subtitle", { y:  20, opacity: 0, duration: 0.6 }, "-=0.3")
  .from(".btn",      { scale: 0.8, opacity: 0, duration: 0.5 }, "-=0.2");`,
  },
  {
    id: 'pulse-loader',
    chapter: 'Real Patterns',
    title: 'Pulsing loader',
    type: 'live',
    concept: '`repeat + yoyo + stagger` combined creates a wave loading indicator with very little code. This pattern scales to any number of elements — change the count or stagger timing to taste.',
    code: `gsap.to(".box", {
  scale: 1.5,
  backgroundColor: "#88ce02",
  duration: 0.4,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
  stagger: {
    each: 0.18,
    from: "center",
    repeat: -1
  }
});`,
  },
  {
    id: 'animated-counter',
    scene: 'app',
    chapter: 'Real Patterns',
    title: 'Animated counter',
    type: 'live',
    concept: 'GSAP can tween plain JavaScript objects, not just DOM elements. Animating a `{ val: 0 }` object with `onUpdate` lets you drive a number counter, progress bar, or any derived display value.',
    code: `const display = document.createElement("div");
display.style.cssText = "font-size:52px;font-weight:800;font-family:monospace;color:#88ce02;margin-top:8px";
display.textContent = "0";
app.appendChild(display);

const obj = { val: 0 };
gsap.to(obj, {
  val: 1000,
  duration: 2.5,
  ease: "power2.out",
  roundProps: "val",
  onUpdate() {
    display.textContent = obj.val.toLocaleString();
  }
});`,
  },

  // ── gsap.utils ──────────────────────────────────────────────────────────
  {
    id: 'utils-clamp-wrap',
    chapter: 'GSAP Utils',
    title: 'clamp, wrap & mapRange',
    scene: 'boxes',
    concept: '`gsap.utils` is a collection of pure utility functions used inside GSAP\'s own interpolation engine. `clamp(min, max)` constrains a number. `wrap(min, max)` wraps it cyclically. `mapRange(inMin, inMax, outMin, outMax)` maps one range to another — great for driving values from scroll or mouse position.',
    code: `const clamp = gsap.utils.clamp(0, 100);
const wrap = gsap.utils.wrap(0, 360);
const map = gsap.utils.mapRange(0, 1, 0, 500);

const boxes = document.querySelectorAll(".box");

document.addEventListener("mousemove", (e) => {
  const ratio = e.clientX / window.innerWidth;
  const hue = Math.round(map(ratio));
  const clamped = clamp(Math.round(ratio * 120));
  const wrapped = Math.round(wrap(ratio * 400));

  boxes[0].style.background = "hsl(" + hue + ",70%,55%)";
  boxes[1].style.background = "hsl(220,70%," + (30 + clamped / 3) + "%)";
  boxes[2].style.background = "hsl(" + wrapped + ",70%,55%)";
});`,
  },
  {
    id: 'utils-interpolate',
    chapter: 'GSAP Utils',
    title: 'interpolate & toArray',
    scene: 'boxes',
    concept: '`gsap.utils.interpolate(startVal, endVal, progress)` linearly blends two values (numbers, colours, even arrays) by a 0–1 progress. `gsap.utils.toArray(selector)` is a cross-browser querySelector that always returns a real array — handy inside animation loops.',
    code: `const lerp = gsap.utils.interpolate;
const boxes = gsap.utils.toArray(".box");

const colorA = "#4f46e5";
const colorB = "#88ce02";

const tween = { p: 0 };

gsap.to(tween, {
  p: 1,
  duration: 2.5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  onUpdate() {
    const progress = tween.p;
    boxes.forEach((box, i) => {
      const offset = i / boxes.length;
      const p = (progress + offset) % 1;
      box.style.background = lerp(colorA, colorB, p);
      box.style.borderRadius = Math.round(lerp(4, 50, p)) + "%";
      box.style.transform = "scale(" + lerp(0.8, 1.1, p) + ")";
    });
  }
});`,
  },

  // ── Responsive ──────────────────────────────────────────────────────────
  {
    id: 'match-media',
    chapter: 'Responsive',
    title: 'gsap.matchMedia()',
    scene: 'boxes',
    concept: '`gsap.matchMedia()` creates a context that runs different GSAP code based on CSS media queries — and automatically reverts when the query no longer matches. This is the correct way to build responsive animations: no manual cleanup, no resize listeners, no conflicts.',
    code: `const boxes = document.querySelectorAll(".box");
const mm = gsap.matchMedia();

mm.add("(min-width: 600px)", () => {
  gsap.from(boxes, {
    x: -200,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "back.out(1.5)"
  });

  gsap.to(boxes, {
    x: 60,
    rotation: 10,
    stagger: 0.1,
    duration: 1,
    delay: 1,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });

  return () => gsap.set(boxes, { clearProps: "all" });
});

mm.add("(max-width: 599px)", () => {
  gsap.from(boxes, {
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 0.6,
    ease: "power2.out"
  });
});`,
  },
  {
    id: 'reduced-motion',
    chapter: 'Responsive',
    title: 'Reduced Motion',
    scene: 'boxes',
    concept: 'Pair `gsap.matchMedia()` with `prefers-reduced-motion` to provide instant, non-animated fallbacks for users who request reduced motion in their OS accessibility settings. GSAP automatically reverts whichever context is inactive.',
    code: `const boxes = document.querySelectorAll(".box");
const mm = gsap.matchMedia();

mm.add({
  reducedMotion: "(prefers-reduced-motion: reduce)",
  fullMotion: "(prefers-reduced-motion: no-preference)",
}, (context) => {
  const { reducedMotion } = context.conditions;

  if (reducedMotion) {
    gsap.set(boxes, { opacity: 1, scale: 1 });
  } else {
    gsap.from(boxes, {
      scale: 0,
      rotation: 360,
      opacity: 0,
      stagger: { amount: 0.6, from: "center" },
      duration: 0.8,
      ease: "back.out(2)"
    });

    gsap.to(boxes, {
      y: -20,
      stagger: { amount: 0.4, yoyo: true, repeat: -1 },
      duration: 1,
      ease: "sine.inOut",
      delay: 1
    });
  }
});`,
  },

  // ── Plugins ──────────────────────────────────────────────────────────────
  {
    id: 'all-plugins',
    scene: 'app',
    chapter: 'Plugins',
    title: 'All plugins loaded',
    type: 'live',
    concept: 'The playground loads the official GSAP plugin files from the local project bundle, including the formerly Club GSAP plugins that are now free. This lesson checks which plugin globals are available inside the iframe before you use them in your own demos.',
    code: `const plugins = [
  'ScrollTrigger', 'ScrollToPlugin', 'Observer', 'ScrollSmoother',
  'Draggable', 'InertiaPlugin', 'Flip', 'MotionPathPlugin',
  'MotionPathHelper', 'MorphSVGPlugin', 'DrawSVGPlugin',
  'SplitText', 'TextPlugin', 'ScrambleTextPlugin',
  'CustomEase', 'CustomBounce', 'CustomWiggle',
  'Physics2DPlugin', 'PhysicsPropsPlugin', 'CSSRulePlugin',
  'EaselPlugin', 'PixiPlugin', 'GSDevTools',
  'RoughEase', 'ExpoScaleEase', 'SlowMo'
];

app.innerHTML = \`
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px"></div>
\`;

const grid = app.firstElementChild;
plugins.forEach(name => {
  const loaded = typeof window[name] !== 'undefined';
  const item = document.createElement('div');
  item.className = 'card';
  item.style.cssText = 'display:flex;justify-content:space-between;gap:8px;align-items:center';
  item.innerHTML = \`
    <strong style="font-size:12px">\${name}</strong>
    <span style="color:\${loaded ? '#047857' : '#b91c1c'};font-size:11px;font-weight:700">
      \${loaded ? 'Loaded' : 'Missing'}
    </span>
  \`;
  grid.appendChild(item);
});

gsap.from('.card', {
  y: 16,
  opacity: 0,
  duration: 0.35,
  stagger: 0.025,
  ease: 'power2.out'
});`,
  },
  {
    id: 'custom-ease',
    chapter: 'Plugins',
    title: 'CustomEase',
    type: 'live',
    concept: '`CustomEase` lets you draw any easing curve as a cubic bezier SVG path string. Create a named ease once, then use it by name in any tween. The path string goes from `M0,0` (animation start) to `1,1` (end) — values outside 0–1 create overshoot.',
    code: `// Create a custom springy ease from a bezier path
CustomEase.create("springy", "M0,0 C0.14,0 0.27,-0.5 0.4,0.02 0.5,0.38 0.52,1.5 0.75,1 0.87,0.73 1,1 1,1");

// Use it like any built-in ease
gsap.from(".box", {
  y: -160,
  opacity: 0,
  duration: 1.4,
  stagger: 0.12,
  ease: "springy"
});`,
  },
  {
    id: 'scroll-to',
    scene: 'scroll',
    chapter: 'Plugins',
    title: 'ScrollToPlugin',
    type: 'live',
    concept: '`ScrollToPlugin` lets GSAP animate `window` or any scrollable element to a target position or element. Pass a CSS selector, a DOM element, or a pixel value to `scrollTo`. The easing and duration apply to the scroll itself.',
    code: `const controls = document.getElementById('controls');
const returnSlot = document.getElementById('scroll-return');
controls.innerHTML = \`
  <button class="btn" id="scrollDown">Scroll to target ↓</button>
\`;
returnSlot.innerHTML = \`
  <button class="btn" id="scrollTop">Back to top ↑</button>
\`;

document.getElementById('scrollDown').addEventListener('click', () => {
  gsap.to(window, {
    scrollTo: { y: '#scroll-box', offsetY: 80 },
    duration: 1.4,
    ease: 'power2.inOut'
  });
});

document.getElementById('scrollTop').addEventListener('click', () => {
  gsap.to(window, {
    scrollTo: 0,
    duration: 1,
    ease: 'power2.inOut'
  });
});`,
    challenge: {
      question: 'What does the offsetY option do in scrollTo?',
      options: ['Sets the scroll speed', 'Adds a pixel gap above the target', 'Scrolls past the target by that amount', 'Delays the scroll start'],
      correct: 1,
    },
  },
  {
    id: 'motion-path',
    scene: 'app',
    chapter: 'Plugins',
    title: 'MotionPath',
    type: 'live',
    concept: '`MotionPathPlugin` animates any element along an SVG `<path>`. Set `align` to the same path to position the element correctly, and `autoRotate: true` to orient the element to face the direction of travel.',
    code: `// Build an SVG path scene in #app
const app = document.getElementById('app');
app.style.cssText = 'position:relative;padding:10px';
app.innerHTML = \`
  <svg id="pathSvg" width="100%" height="200" viewBox="0 0 340 200" style="display:block;overflow:visible">
    <path id="curve"
      d="M20,160 C60,20 140,20 170,100 S280,180 320,40"
      fill="none" stroke="#d1d5db" stroke-width="2" stroke-dasharray="6 4"/>
    <circle cx="20" cy="160" r="5" fill="#a5b4fc" opacity="0.6"/>
    <circle cx="320" cy="40" r="5" fill="#a5b4fc" opacity="0.6"/>
  </svg>
  <div id="dot" style="width:22px;height:22px;background:#6366f1;border-radius:50%;position:absolute;top:0;left:0;transform-origin:50% 50%"></div>
\`;

gsap.to('#dot', {
  motionPath: {
    path: '#curve',
    align: '#curve',
    autoRotate: true,
    alignOrigin: [0.5, 0.5],
  },
  duration: 3,
  ease: 'power1.inOut',
  repeat: -1,
  yoyo: true,
});`,
  },
  {
    id: 'flip-plugin',
    scene: 'app',
    chapter: 'Plugins',
    title: 'Flip',
    type: 'live',
    concept: '`Flip` animates layout changes using the FLIP technique (First, Last, Invert, Play). Capture state before a DOM change with `Flip.getState()`, make the change, then call `Flip.from(state)` — GSAP figures out the delta and animates the difference.',
    code: `const app = document.getElementById('app');
app.innerHTML = \`
  <p style="font-size:12px;color:#6b7280;margin-bottom:10px;font-weight:600">Click any card to move it to the front</p>
  <div id="grid" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px"></div>
\`;

const grid = document.getElementById('grid');
['A','B','C','D','E','F'].forEach(letter => {
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = letter;
  card.style.cssText = 'cursor:pointer;text-align:center;font-weight:700;font-size:18px;padding:20px 0';
  card.addEventListener('click', () => moveFirst(card));
  grid.appendChild(card);
});

function moveFirst(el) {
  const state = Flip.getState('.card');
  grid.prepend(el);
  Flip.from(state, {
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.04,
  });
}`,
  },
  {
    id: 'draggable-plugin',
    scene: 'app',
    chapter: 'Interaction Plugins',
    title: 'Draggable',
    type: 'live',
    concept: '`Draggable` turns DOM or SVG elements into pointer-driven controls. It handles mouse, touch, bounds, inertia handoff, callbacks, and transform updates so you do not need to write low-level pointer math.',
    code: `app.innerHTML = \`
  <div id="dragArea" style="height:220px;border:1px dashed #d1d5db;border-radius:10px;position:relative;overflow:hidden;background:#f9fafb">
    <div id="dragMe" style="width:76px;height:76px;border-radius:16px;background:#88ce02;display:grid;place-items:center;font-weight:800;color:#111827;position:absolute;left:20px;top:20px;box-shadow:0 10px 24px rgba(0,0,0,.12)">Drag</div>
  </div>
\`;

Draggable.create('#dragMe', {
  type: 'x,y',
  bounds: '#dragArea',
  edgeResistance: 0.75,
  onPress() { gsap.to(this.target, { scale: 1.08, duration: 0.15 }); },
  onRelease() { gsap.to(this.target, { scale: 1, duration: 0.2 }); }
});`,
  },
  {
    id: 'observer-plugin',
    scene: 'app',
    chapter: 'Interaction Plugins',
    title: 'Observer',
    type: 'live',
    concept: '`Observer` normalizes wheel, touch, pointer, and scroll input into a single API. Use it for gesture-driven interfaces such as swipers, scrubbers, horizontal galleries, and custom scroll experiences.',
    code: `app.innerHTML = \`
  <div id="observeBox" style="height:210px;border-radius:12px;background:#111827;color:white;display:grid;place-items:center;text-align:center;padding:20px;user-select:none">
    <div>
      <div style="font-size:32px;font-weight:800" id="count">0</div>
      <p style="color:#cbd5e1">Wheel, drag, or swipe here</p>
    </div>
  </div>
\`;

let value = 0;
const count = document.getElementById('count');

Observer.create({
  target: '#observeBox',
  type: 'wheel,touch,pointer',
  preventDefault: true,
  onUp() { update(1); },
  onDown() { update(-1); },
  onRight() { update(1); },
  onLeft() { update(-1); }
});

function update(delta) {
  value += delta;
  count.textContent = value;
  gsap.fromTo(count, { scale: 1.45, color: '#88ce02' }, { scale: 1, color: '#fff', duration: 0.35 });
}`,
  },
  {
    id: 'inertia-plugin',
    scene: 'app',
    chapter: 'Interaction Plugins',
    title: 'InertiaPlugin',
    type: 'live',
    concept: '`InertiaPlugin` continues motion after release based on velocity. Combined with Draggable, it creates natural flick, throw, and momentum behaviour without hand-written velocity tracking.',
    code: `app.innerHTML = \`
  <div id="throwArea" style="height:220px;border:1px dashed #d1d5db;border-radius:10px;position:relative;overflow:hidden;background:#f8fafc">
    <div id="puck" style="width:68px;height:68px;border-radius:50%;background:#6366f1;position:absolute;left:20px;top:70px;box-shadow:0 12px 24px rgba(99,102,241,.3)"></div>
  </div>
  <p style="font-size:12px;color:#6b7280;margin-top:8px">Drag and release the puck quickly.</p>
\`;

Draggable.create('#puck', {
  type: 'x,y',
  bounds: '#throwArea',
  inertia: true,
  edgeResistance: 0.8
});`,
  },
  {
    id: 'split-text-plugin',
    scene: 'app',
    chapter: 'Text Plugins',
    title: 'SplitText',
    type: 'live',
    concept: '`SplitText` splits text into words, lines, or characters so each piece can animate independently. It is useful for editorial headings, hero reveals, and kinetic typography.',
    code: `app.innerHTML = \`
  <h2 id="splitHeadline" style="font-size:34px;line-height:1.05;letter-spacing:0;font-weight:900;color:#111827">Animate every word with SplitText</h2>
\`;

const split = new SplitText('#splitHeadline', { type: 'words,chars' });

gsap.from(split.chars, {
  yPercent: 120,
  opacity: 0,
  rotation: 8,
  duration: 0.55,
  ease: 'back.out(1.7)',
  stagger: 0.018
});`,
  },
  {
    id: 'text-plugin',
    scene: 'app',
    chapter: 'Text Plugins',
    title: 'TextPlugin',
    type: 'live',
    concept: '`TextPlugin` tweens text content itself. Use it for typewriter effects, changing status messages, command palettes, onboarding copy, and animated UI labels.',
    code: `app.innerHTML = \`
  <div class="card" style="font-family:ui-monospace,Menlo,monospace;font-size:18px;line-height:1.6">
    <span style="color:#64748b">$</span> <span id="terminalText">Preparing animation...</span>
  </div>
\`;

gsap.to('#terminalText', {
  duration: 2.4,
  text: 'GSAP plugins are loaded and ready.',
  ease: 'none'
});`,
  },
  {
    id: 'scramble-text-plugin',
    scene: 'app',
    chapter: 'Text Plugins',
    title: 'ScrambleTextPlugin',
    type: 'live',
    concept: '`ScrambleTextPlugin` transitions text through randomized characters before resolving to the final phrase. It is commonly used for dashboards, sci-fi interfaces, and playful reveal states.',
    code: `app.innerHTML = \`
  <div id="scramble" style="font-size:30px;font-weight:900;color:#111827;min-height:48px">Deploy status</div>
  <button class="btn" id="rerun">Scramble again</button>
\`;

function scramble() {
  gsap.to('#scramble', {
    duration: 1.4,
    scrambleText: {
      text: 'Production deploy complete',
      chars: 'upperAndLowerCase',
      speed: 0.35
    },
    ease: 'none'
  });
}

document.getElementById('rerun').addEventListener('click', scramble);
scramble();`,
  },
  {
    id: 'draw-svg-plugin',
    scene: 'app',
    chapter: 'SVG Plugins',
    title: 'DrawSVGPlugin',
    type: 'live',
    concept: '`DrawSVGPlugin` animates the visible stroke range of SVG paths. It is ideal for line drawing, signatures, route maps, icons, loaders, and technical illustrations.',
    code: `app.innerHTML = \`
  <svg viewBox="0 0 360 180" width="100%" height="210" style="display:block">
    <path id="drawLine" d="M30 130 C70 20, 130 20, 170 100 S280 170, 330 45"
      fill="none" stroke="#88ce02" stroke-width="8" stroke-linecap="round"/>
    <path d="M30 130 C70 20, 130 20, 170 100 S280 170, 330 45"
      fill="none" stroke="#e5e7eb" stroke-width="2" stroke-dasharray="6 8"/>
  </svg>
\`;

gsap.from('#drawLine', {
  drawSVG: '0%',
  duration: 2,
  ease: 'power2.inOut',
  repeat: -1,
  yoyo: true
});`,
  },
  {
    id: 'morph-svg-plugin',
    scene: 'app',
    chapter: 'SVG Plugins',
    title: 'MorphSVGPlugin',
    type: 'live',
    concept: '`MorphSVGPlugin` morphs one SVG shape into another by interpolating path data. It helps create logo transitions, icon state changes, blob morphs, and custom shape choreography.',
    code: `app.innerHTML = \`
  <svg viewBox="0 0 220 180" width="100%" height="220" style="display:block">
    <path id="morphShape" fill="#6366f1"
      d="M110,20 C150,20 185,55 185,95 C185,140 150,160 110,160 C70,160 35,140 35,95 C35,55 70,20 110,20 Z"/>
    <path id="starShape" style="display:none"
      d="M110,16 L134,70 L194,76 L149,116 L162,174 L110,143 L58,174 L71,116 L26,76 L86,70 Z"/>
  </svg>
\`;

gsap.to('#morphShape', {
  morphSVG: '#starShape',
  duration: 1.2,
  ease: 'power2.inOut',
  repeat: -1,
  yoyo: true
});`,
  },
  {
    id: 'css-rule-plugin',
    scene: 'app',
    chapter: 'SVG Plugins',
    title: 'CSSRulePlugin',
    type: 'live',
    concept: '`CSSRulePlugin` targets CSS rules directly, including pseudo-elements that do not exist as normal DOM nodes. It is useful when the thing you want to animate is defined in a stylesheet rule rather than an element.',
    code: `app.innerHTML = \`
  <style>
    #ruleCard{position:relative;overflow:hidden;padding:28px;border-radius:12px;background:#111827;color:white;font-weight:800}
    #ruleCard::before{content:"";position:absolute;inset:0;background:#88ce02;transform:scaleX(.08);transform-origin:left center;z-index:0}
    #ruleCard span{position:relative;z-index:1}
  </style>
  <div id="ruleCard"><span>Animating a ::before rule</span></div>
\`;

const rule = CSSRulePlugin.getRule('#ruleCard::before');

gsap.to(rule, {
  cssRule: { scaleX: 1 },
  duration: 1.2,
  ease: 'power2.inOut',
  repeat: -1,
  yoyo: true
});`,
  },
  {
    id: 'custom-bounce-wiggle',
    scene: 'app',
    chapter: 'Physics & Ease Plugins',
    title: 'CustomBounce & CustomWiggle',
    type: 'live',
    concept: '`CustomBounce` creates realistic bounce eases, and `CustomWiggle` creates controlled shake/wiggle eases. Both generate named eases that you can reuse in normal GSAP tweens.',
    code: `CustomBounce.create('rubberBounce', { strength: 0.65, squash: 2.2 });
CustomWiggle.create('alertWiggle', { wiggles: 8, type: 'easeOut' });

app.innerHTML = \`
  <div style="display:flex;gap:34px;align-items:flex-end;height:190px;padding:10px">
    <div id="bounceBall" style="width:58px;height:58px;border-radius:50%;background:#88ce02"></div>
    <div id="wiggleCard" class="card" style="width:150px;text-align:center;font-weight:800">Wiggle</div>
  </div>
\`;

gsap.to('#bounceBall', {
  y: -120,
  duration: 1.2,
  ease: 'rubberBounce',
  repeat: -1,
  yoyo: true
});

gsap.to('#wiggleCard', {
  rotation: 12,
  duration: 1.2,
  ease: 'alertWiggle',
  repeat: -1,
  repeatDelay: 0.4
});`,
  },
  {
    id: 'physics-plugins',
    scene: 'app',
    chapter: 'Physics & Ease Plugins',
    title: 'Physics2D & PhysicsProps',
    type: 'live',
    concept: '`Physics2DPlugin` animates position with velocity, angle, acceleration, gravity, and friction. `PhysicsPropsPlugin` applies the same idea to arbitrary numeric properties.',
    code: `app.innerHTML = \`
  <div id="physicsStage" style="height:230px;position:relative;overflow:hidden;border-radius:12px;background:#f8fafc;border:1px solid #e5e7eb">
    <div id="projectile" style="width:30px;height:30px;border-radius:50%;background:#6366f1;position:absolute;left:20px;bottom:25px"></div>
    <div id="meter" style="position:absolute;right:20px;bottom:20px;width:16px;height:80px;background:#88ce02;border-radius:999px;transform-origin:bottom center"></div>
  </div>
\`;

gsap.to('#projectile', {
  physics2D: { velocity: 260, angle: -55, gravity: 420 },
  duration: 2.2,
  repeat: -1,
  repeatDelay: 0.3
});

const gauge = { height: 80 };
gsap.to(gauge, {
  physicsProps: { height: { velocity: 160, acceleration: -120 } },
  duration: 1.6,
  repeat: -1,
  yoyo: true,
  onUpdate() {
    document.getElementById('meter').style.height = Math.max(24, gauge.height) + 'px';
  }
});`,
  },
  {
    id: 'ease-pack-plugin',
    scene: 'app',
    chapter: 'Physics & Ease Plugins',
    title: 'EasePack',
    type: 'live',
    concept: '`EasePack` adds specialty eases such as RoughEase, SlowMo, and ExpoScaleEase. Use them when standard power/back/elastic eases are too smooth or too ordinary for the motion you need.',
    code: `app.innerHTML = \`
  <div style="display:grid;gap:12px">
    <div class="box" id="rough"></div>
    <div class="box" id="slow"></div>
    <div class="box" id="expo"></div>
  </div>
\`;

gsap.to('#rough', {
  x: 240,
  duration: 1.6,
  ease: RoughEase.ease.config({ strength: 2, points: 28, template: 'none.out' }),
  repeat: -1,
  yoyo: true
});

gsap.to('#slow', {
  x: 240,
  duration: 1.6,
  ease: SlowMo.ease.config(0.55, 0.7, false),
  repeat: -1,
  yoyo: true
});

gsap.to('#expo', {
  x: 240,
  scale: 2.2,
  duration: 1.6,
  ease: ExpoScaleEase.config(1, 2.2),
  repeat: -1,
  yoyo: true
});`,
  },
  {
    id: 'scroll-smoother-plugin',
    scene: 'app',
    chapter: 'Helper & Integration Plugins',
    title: 'ScrollSmoother',
    type: 'live',
    concept: '`ScrollSmoother` creates smooth page-level scrolling and parallax effects. It expects control over a full page wrapper, so this playground demonstrates the same setup pattern inside a contained mini wrapper.',
    code: `app.innerHTML = \`
  <style>
    #smoothMock{border:1px solid #e5e7eb;border-radius:14px;background:#f8fafc;overflow-y:auto;max-height:380px}
    .smooth-hero{min-height:200px;padding:28px 22px;display:flex;align-items:flex-end;background:linear-gradient(135deg,#111827,#334155);color:white;position:relative}
    .smooth-blob{position:absolute;right:24px;top:20px;width:110px;height:110px;border-radius:999px;background:#88ce02;opacity:.85;will-change:transform}
    .smooth-section{min-height:160px;padding:28px 22px;border-bottom:1px solid #e5e7eb;background:white}
    .smooth-section:nth-child(even){background:#f1f5f9}
    .smooth-eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#047857;font-weight:800;margin-bottom:6px}
    .smooth-section h3{font-size:20px;line-height:1.2;margin-bottom:8px;color:#111827}
    .smooth-section p{color:#475569;margin-bottom:8px}
  </style>
  <div class="card" style="margin-bottom:10px">
    <strong>ScrollSmoother:</strong> \${typeof ScrollSmoother !== 'undefined' ? '✅ loaded' : '❌ missing'}
    <p style="margin-top:6px;color:#6b7280;font-weight:400">Scroll inside the panel below ↓ — the green blob moves with parallax as you scroll. In production, ScrollSmoother.create() wraps a full-page layout for momentum scrolling and data-speed parallax.</p>
  </div>
  <div id="smoothMock">
    <section class="smooth-hero">
      <div class="smooth-blob"></div>
      <div>
        <div class="smooth-eyebrow">ScrollSmoother demo — scroll me ↓</div>
        <h3 style="font-size:26px;line-height:1.05;margin:0 0 6px">Parallax blob follows scroll</h3>
        <p style="color:#cbd5e1;max-width:400px">The green circle moves at a different speed than the page — that's parallax via scrollTop.</p>
      </div>
    </section>
    <section class="smooth-section">
      <div class="smooth-eyebrow">Section 01</div>
      <h3>Smooth content flow</h3>
      <p>Keep scrolling down — the blob drifts further as you go deeper into the page.</p>
      <p>In production, ScrollSmoother adds momentum inertia to the entire page scroll, not just one element.</p>
    </section>
    <section class="smooth-section">
      <div class="smooth-eyebrow">Section 02</div>
      <h3>data-speed attribute</h3>
      <p>Any element with data-speed="0.5" moves at half the scroll speed. data-speed="1.5" moves faster than the page.</p>
      <p>ScrollSmoother reads these automatically when effects: true is set.</p>
    </section>
    <section class="smooth-section" style="border-bottom:none">
      <div class="smooth-eyebrow">Production pattern</div>
      <h3>ScrollSmoother.create()</h3>
      <p>gsap.registerPlugin(ScrollSmoother, ScrollTrigger)</p>
      <p>ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 1.2, effects: true })</p>
    </section>
  </div>
\`;

const mock = document.getElementById('smoothMock');
const blob = document.querySelector('.smooth-blob');

// Fix: listen on the container element, not window — window never scrolls in this scene
mock.addEventListener('scroll', () => {
  gsap.to(blob, {
    y: mock.scrollTop * 0.35,
    duration: 0.3,
    overwrite: true,
    ease: 'power2.out'
  });
});

gsap.from('.card', { y: 16, opacity: 0, duration: 0.5, ease: 'power2.out' });
gsap.from('.smooth-hero > div', { y: 20, opacity: 0, duration: 0.6, delay: 0.15, ease: 'power2.out' });`,
  },
  {
    id: 'motion-helper-gsdevtools',
    scene: 'app',
    chapter: 'Helper & Integration Plugins',
    title: 'MotionPathHelper & GSDevTools',
    type: 'live',
    concept: '`MotionPathPlugin` animates elements along an SVG `<path>` using `motionPath: { path, align, autoRotate }`. `GSDevTools` renders an interactive timeline player UI — scrub, speed, repeat controls — directly in the preview. Both are registered and active in this lesson.',
    code: `app.innerHTML = \`
  <div class="card" style="display:flex;gap:16px;align-items:center;padding:10px 14px;margin-bottom:12px">
    <span><strong>MotionPathPlugin</strong> \${typeof MotionPathPlugin !== 'undefined' ? '✅' : '❌'}</span>
    <span><strong>GSDevTools</strong> \${typeof GSDevTools !== 'undefined' ? '✅' : '❌'}</span>
  </div>
  <svg width="100%" height="160" viewBox="0 0 440 160" style="display:block">
    <path id="curvePath"
      d="M 30,120 C 100,20 180,150 260,60 S 380,130 420,80"
      fill="none" stroke="#6b7280" stroke-width="2" stroke-dasharray="6 4"/>
    <circle id="motionDot" r="16" fill="#88ce02"/>
    <circle id="motionTrail" r="8" fill="#88ce02" opacity="0.35"/>
  </svg>
  <p style="color:#6b7280;font-size:12px;margin:6px 0 0">↓ GSDevTools timeline player — scrub, change speed, loop</p>
\`;

gsap.registerPlugin(MotionPathPlugin, GSDevTools);

const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

tl.to('#motionTrail', {
  duration: 2.2,
  ease: 'power1.inOut',
  motionPath: { path: '#curvePath', align: '#curvePath', alignOrigin: [0.5, 0.5] }
}, 0);

tl.to('#motionDot', {
  duration: 2.2,
  ease: 'power1.inOut',
  motionPath: { path: '#curvePath', align: '#curvePath', autoRotate: true, alignOrigin: [0.5, 0.5] }
}, 0.12);

GSDevTools.create({ animation: tl });`,
  },
  {
    id: 'renderer-plugins',
    scene: 'app',
    chapter: 'Helper & Integration Plugins',
    title: 'PixiPlugin & EaselPlugin',
    type: 'live',
    concept: '`PixiPlugin` lets GSAP animate PixiJS display object properties (tint, alpha, colorMatrixFilter). `EaselPlugin` does the same for EaselJS/CreateJS. Both plugins are registered here. Because PixiJS and EaselJS are not loaded, we demonstrate what GSAP animates on plain DOM as a stand-in.',
    code: `app.innerHTML = \`
  <div class="card" style="padding:10px 14px;margin-bottom:12px;display:flex;gap:20px">
    <span><strong>PixiPlugin</strong> \${typeof PixiPlugin !== 'undefined' ? '✅ registered' : '❌'}</span>
    <span><strong>EaselPlugin</strong> \${typeof EaselPlugin !== 'undefined' ? '✅ registered' : '❌'}</span>
  </div>
  <p style="color:#6b7280;font-size:12px;margin:0 0 10px">
    PixiJS/EaselJS not loaded — DOM stand-in shows the same animation patterns
  </p>
  <div style="display:flex;gap:14px;flex-wrap:wrap">
    <canvas id="pixiStand" width="120" height="120"
      style="border-radius:12px;background:#1a1a2e;display:block"></canvas>
    <div style="flex:1;min-width:160px">
      <div id="easelBox" style="width:72px;height:72px;border-radius:8px;background:#ff6b35;margin-bottom:10px"></div>
      <div id="colorBox" style="width:72px;height:72px;border-radius:50%;background:#88ce02"></div>
    </div>
  </div>
\`;

// ── PixiPlugin pattern: tint / alpha / scale on a PixiJS sprite
// Here we animate a canvas 2D gradient as a stand-in
const canvas = document.getElementById('pixiStand');
const ctx = canvas.getContext('2d');
const state = { t: 0 };
gsap.to(state, {
  t: 1, repeat: -1, yoyo: true, duration: 1.6, ease: 'sine.inOut',
  onUpdate() {
    ctx.clearRect(0, 0, 120, 120);
    const g = ctx.createRadialGradient(60, 60, 4, 60, 60, 52);
    const hue = Math.round(state.t * 200 + 180);
    g.addColorStop(0, \`hsl(\${hue},90%,70%)\`);
    g.addColorStop(1, \`hsl(\${hue + 40},70%,30%)\`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(60, 60, 50, 0, Math.PI * 2);
    ctx.fill();
  }
});

// ── EaselPlugin pattern: alpha, scaleX/scaleY on a DisplayObject
gsap.to('#easelBox', {
  scaleX: 1.4, scaleY: 0.7, rotation: 20,
  repeat: -1, yoyo: true, duration: 0.9, ease: 'power2.inOut'
});

// ── colorMatrixFilter pattern (tint cycling)
gsap.to('#colorBox', {
  backgroundColor: '#0d6efd',
  repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut'
});

gsap.from('.card', { y: -12, opacity: 0, duration: 0.4, ease: 'power2.out' });`,
  },
];

export const CHAPTERS = [...new Set(LESSONS.map(l => l.chapter))];
