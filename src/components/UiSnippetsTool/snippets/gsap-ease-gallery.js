const gsapEaseGallery = {
  id: 'gsap-ease-gallery',
  title: 'GSAP Ease Gallery',
  lastmod: '2026-07-18',
  category: 'visualizers',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/EasePack.min.js',
  ],
  html: `<div class="geg-wrap">
  <div class="geg-head">
    <h3>Pick your motion personality</h3>
    <button class="geg-play" id="gegPlay">▶ Race all eases</button>
  </div>
  <div class="geg-lanes" id="gegLanes"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d16;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.geg-wrap{width:min(640px,94vw);display:flex;flex-direction:column;gap:16px}
.geg-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.geg-head h3{font-size:clamp(17px,2.8vw,22px);font-weight:800;letter-spacing:-.01em}
.geg-play{padding:10px 20px;border-radius:12px;border:0;background:linear-gradient(120deg,#6366f1,#0ea5e9);color:#fff;font:700 13.5px system-ui;cursor:pointer}
.geg-play:hover{opacity:.9}
.geg-lanes{display:flex;flex-direction:column;gap:9px}
.geg-lane{position:relative;height:44px;border-radius:12px;background:#10152a;border:1px solid rgba(255,255,255,.09);overflow:hidden}
.geg-lane:hover{border-color:rgba(129,140,248,.4)}
.geg-name{position:absolute;left:14px;top:50%;transform:translateY(-50%);font:600 12px ui-monospace,monospace;color:#8a90a8;pointer-events:none}
.geg-ball{position:absolute;left:8px;top:50%;margin-top:-11px;width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 32% 28%,color-mix(in srgb,var(--bc) 60%,#fff),var(--bc));box-shadow:0 4px 12px rgba(0,0,0,.4);will-change:transform}`,

  js: `// EasePack (loaded via CDN) adds rough(), slow(), and expoScale()
// to the core ease families — no registration needed as a script tag.
var EASES = [
  { name: 'power2.out',            ease: 'power2.out',            color: '#818cf8' },
  { name: 'power4.inOut',          ease: 'power4.inOut',          color: '#6366f1' },
  { name: 'back.out(1.7)',         ease: 'back.out(1.7)',         color: '#22d3ee' },
  { name: 'elastic.out(1, 0.3)',   ease: 'elastic.out(1, 0.3)',   color: '#f472b6' },
  { name: 'bounce.out',            ease: 'bounce.out',            color: '#fbbf24' },
  { name: 'circ.inOut',            ease: 'circ.inOut',            color: '#34d399' },
  { name: 'steps(8)',              ease: 'steps(8)',              color: '#fb7185' },
  { name: 'rough(...)', ease: 'rough({ strength: 2, points: 24, taper: "out", randomize: true })', color: '#c084fc' },
  { name: 'slow(0.7, 0.7)',        ease: 'slow(0.7, 0.7, false)', color: '#4ade80' }
];

var lanes = document.getElementById('gegLanes');
EASES.forEach(function (item, i) {
  var lane = document.createElement('div');
  lane.className = 'geg-lane';
  lane.innerHTML = '<span class="geg-name">' + item.name + '</span>' +
    '<div class="geg-ball" style="--bc:' + item.color + '"></div>';
  // Clicking a single lane replays just that ease.
  lane.addEventListener('click', function () { run(lane, item.ease); });
  lanes.appendChild(lane);
});

function run(lane, ease) {
  var ball = lane.querySelector('.geg-ball');
  var dist = lane.clientWidth - 38;
  gsap.killTweensOf(ball);
  gsap.fromTo(ball, { x: 0 }, { x: dist, duration: 1.8, ease: ease });
}

function runAll() {
  document.querySelectorAll('.geg-lane').forEach(function (lane, i) {
    run(lane, EASES[i].ease);
  });
}

document.getElementById('gegPlay').addEventListener('click', runAll);
runAll();`,

  seo: {
    title: 'GSAP Ease Gallery — Free Easing Comparison Snippet',
    description: `Nine balls race the same distance on different GSAP eases — back, elastic, bounce, steps, plus EasePack's rough and slow. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'GSAP Ease Gallery — See Every Easing Personality Side by Side',
      description: `Easing is the most consequential decision in any animation — the same 1.8-second, same-distance movement reads as confident, playful, broken, or robotic purely from its curve. But eases are impossible to choose from documentation graphs. This gallery makes them physical: nine balls race identical lanes over identical durations, differing *only* in ease — the core families plus EasePack's exotic \`rough()\` and \`slow()\` — with a race-all button and per-lane replays.

**Identical everything except the curve**

Every lane's tween is \`fromTo(ball, { x: 0 }, { x: dist, duration: 1.8, ease })\`. Distance is measured per lane (\`clientWidth − 38\`) so the race is fair at any container width. Because duration and distance are constant, all differences you see — the overshoot, the rubbery settle, the stutter — are pure easing. That controlled-experiment framing is what makes the gallery useful for *choosing*: you're comparing personalities, not implementations.

**The core cast, briefly**

\`power2.out\` is the workhorse UI ease (fast start, gentle landing); \`power4.inOut\` is its dramatic cousin with a violent middle. \`back.out(1.7)\` overshoots the target and returns — the parenthesized config is amplitude, tunable inline. \`elastic.out(1, 0.3)\` oscillates around the target like a plucked band (amplitude, period). \`bounce.out\` hits the end like a floor. \`circ.inOut\` is quarter-circle geometry — silkier than power curves at the extremes. \`steps(8)\` quantizes motion into eight discrete jumps, the sprite-sheet and mechanical-counter ease.

**EasePack's exotics are the reason this file exists**

\`rough({ strength: 2, points: 24, taper: 'out', randomize: true })\` perturbs an underlying ease with jitter — the flickering-candle, damaged-machine, glitch ease; \`taper: 'out'\` calms it near the finish. \`slow(0.7, 0.7, false)\` rushes in, moves *almost not at all* through a long middle plateau, then rushes out — the slow-motion-highlight ease used for text flybys (its third parameter can even yoyo the value back). Both ship in EasePack, loaded as one extra CDN script and available by string name with zero registration.

**Config-in-the-string is the underrated feature**

\`back.out(1.7)\`, \`elastic.out(1, 0.3)\`, \`steps(8)\`, \`rough({...})\` — GSAP parses ease configuration from the string itself, so an ease choice (with tuning) is *data*, not code. This gallery exploits that: the entire lineup is an array of strings, and your production code can store ease choices in config, CMS fields, or design tokens the same way.

**killTweensOf keeps replays honest**

Clicking a lane mid-race kills that ball's tween and restarts from zero — the standard interrupt-safety idiom — so you can spam-compare two lanes rhythmically, which is genuinely the fastest way to feel the difference between, say, \`back\` and \`elastic\` settles.

**What's deliberately absent**

No curve graphs: graphs describe eases the way sheet music describes a song. Motion is the medium; judge eases by watching the balls. For designing *custom* curves, GSAP's CustomEase draws them as SVG paths — with [CustomBounce](/ui-snippets/custom-bounce-ball/) and [CustomWiggle](/ui-snippets/custom-wiggle-icons/) as its generators.

**Customizing it**

Add lanes to the \`EASES\` array (name, ease string, color), race y-axis drops instead, or wire lane clicks to copy the ease string. Related: bounce physics in [custom bounce ball](/ui-snippets/custom-bounce-ball/), oscillation in [custom wiggle icons](/ui-snippets/custom-wiggle-icons/), curve editing in [bezier curve editor](/ui-snippets/bezier-curve-editor/), and CSS-side timing in [css animation generator](/css-animation-generator/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and EasePack from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Nine lanes build from the EASES array and race once.` },
      { title: 'Click Race all', text: `All balls launch together — same time, same distance.` },
      { title: 'Replay one lane', text: `Click it; killTweensOf restarts that ball cleanly.` },
      { title: 'Study rough and slow', text: `EasePack's exotics jitter and plateau mid-run.` },
      { title: 'Add your candidates', text: `One array entry per ease string you're considering.` },
    ] },
    features: [
      { title: 'Controlled comparison', text: `Only the ease differs between lanes.` },
      { title: 'Core families', text: `power, back, elastic, bounce, circ, steps.` },
      { title: 'EasePack exotics', text: `rough() jitter and slow() plateaus.` },
      { title: 'String-configured', text: `Eases with tuning live as plain data.` },
      { title: 'Fair lanes', text: `Distance measured per lane width.` },
      { title: 'Spam-safe replays', text: `Per-lane kills restart mid-race.` },
      { title: 'Data-built gallery', text: `Lanes render from the EASES array.` },
      { title: 'Race-all button', text: `Simultaneous launch for direct comparison.` },
    ],
    useCases: [
      { title: 'Design-system motion decisions', text: 'Audition motion tokens before committing, racing nine balls over the same distance on different GSAP eases in one controlled comparison.' },
      { title: 'Stakeholder reviews', text: 'Race candidate eases in front of stakeholders, with only the ease differing between lanes so the comparison is fair.' },
      { title: 'Learning GSAP easing', text: 'Build intuition for power, back, elastic, bounce, circ and steps families, with tuning held as plain strings of data.' },
      { title: 'Glitch and slow-motion effects', text: 'Hear how `rough()` produces flicker like [glitch text](/ui-snippets/glitch-text/), and how `slow()` creates dramatic plateaus for flybys.' },
      { title: 'Stepped mechanics and bounce siblings', text: 'Use `steps()` for counters like a [flip clock](/ui-snippets/flip-clock/), and compare with the [custom bounce ball](/ui-snippets/custom-bounce-ball/) for squash and stretch.' },
      { icon: 'CODE', title: 'Related: Motion Path Plane', desc: 'See the [Motion Path Plane](/ui-snippets/motion-path-plane/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why compare eases with racing balls instead of curve graphs?', a: `Graphs describe position-over-time abstractly; motion is judged by the eye. With duration and distance held constant across lanes, every visible difference — overshoot, oscillation, stutter, plateau — is pure easing personality. Watching back.out and elastic.out settle side by side communicates their difference faster than any pair of plots.` },
      { q: 'What do the numbers in eases like back.out(1.7) mean?', a: `Inline configuration parsed from the string: back's parameter is overshoot amplitude (1.7 is the classic default; 3 is cartoonish), elastic.out(1, 0.3) is amplitude and period (smaller period = faster oscillation), steps(8) is the jump count. Because config lives in the string, tuned eases are storable data — in tokens, CMS fields, or props.` },
      { q: 'What does EasePack add that core GSAP lacks?', a: `Three specialty eases: rough(), which perturbs a base ease with configurable jitter (strength, point count, tapering) for flicker and glitch motion; slow(), which rushes in, holds a long near-still plateau, and rushes out — with an optional yoyo for flyby effects; and expoScale(), which linearizes perceived zoom rates between scale factors. One extra script, string-name access.` },
      { q: 'When would I actually use steps()?', a: `Whenever motion should be discrete: sprite-sheet frame playback, mechanical counters and flip displays, typewriter-adjacent movement, or retro/8-bit aesthetics where smoothness would break the fiction. steps(8) quantizes the tween into eight equal jumps — pair it with tabular numerals or frames sized to the step count.` },
      { q: 'How does clicking a lane mid-race stay glitch-free?', a: `run() begins with gsap.killTweensOf(ball) and a fromTo that re-asserts x: 0, so a fresh race replaces the old tween rather than stacking on it. Interrupt-safety matters double in a comparison tool — rhythmically replaying two lanes back-to-back is the fastest way to feel a difference, and that habit must not corrupt state.` },
      { q: 'How do I build this ease gallery in React, Vue, or Angular?', a: `Render lanes from the EASES array (map / v-for / *ngFor) with per-lane refs, fire run() from click handlers, and trigger the initial race in a mount effect — useEffect, onMounted, or ngAfterViewInit — with killTweensOf cleanup on unmount. Measure lane width at run time (as here) so responsive Tailwind layouts keep races fair; the ease strings themselves are framework-agnostic data.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to decode every ease string by memory. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what the rough() ease's strength, points, and taper parameters do to the underlying motion, or why killTweensOf is called before every replay. The same assistant is useful for optimizing it — ask whether recalculating clientWidth on every single run() call could be cached and only invalidated on resize, especially if the lane count grows much larger. It is just as handy for extending the gallery: ask it to add a duration slider so viewers can compare eases at different speeds, let users paste a custom ease string into a new lane, or add a mode that races the same ease at different durations instead of different eases at the same duration. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "ease comparison gallery" in plain HTML, CSS, and JavaScript using GSAP with its EasePack plugin loaded from a CDN — no other libraries.

Requirements:
- Define an array of ease candidates, each with a display name, a GSAP ease string (including at least one core family like power2.out, one overshoot like back.out with a numeric amplitude argument, one oscillating one like elastic.out with amplitude and period arguments, one bounce.out, and at least one EasePack-only ease such as rough({...}) or slow(a, b, false)), and a distinct color.
- Render one horizontal lane per ease, each a fixed-height track containing a label showing the ease name and a circular ball positioned at the left edge.
- Write a run function that measures the lane's own clientWidth at call time (not a hardcoded distance) to compute a fair travel distance, calls gsap.killTweensOf on that lane's ball first, then tweens the ball with gsap.fromTo from x:0 to x:distance over a fixed duration using the lane's ease string — so every lane's duration and distance are identical and only the ease differs.
- Clicking an individual lane must replay only that lane's ball using its own ease, without disturbing other lanes' current tweens.
- Add a single "race all" button that runs every lane simultaneously so all eases can be compared side by side in real time, and trigger that same race automatically once on page load.`,
    },
  },
};

export default gsapEaseGallery;
