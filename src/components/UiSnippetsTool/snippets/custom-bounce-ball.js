const customBounceBall = {
  id: 'custom-bounce-ball',
  title: 'CustomBounce Ball',
  lastmod: '2026-07-18',
  category: 'animations',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/CustomEase.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/CustomBounce.min.js',
  ],
  html: `<div class="cbb-wrap">
  <div class="cbb-stage">
    <div class="cbb-ball" id="cbbBall"></div>
    <div class="cbb-shadow" id="cbbShadow"></div>
    <div class="cbb-floor"></div>
  </div>
  <div class="cbb-bar">
    <button class="cbb-btn" data-strength="0.3">Soft</button>
    <button class="cbb-btn is-active" data-strength="0.6">Bouncy</button>
    <button class="cbb-btn" data-strength="0.8">Superball</button>
  </div>
  <p class="cbb-hint">Squash & stretch ride a matched companion ease.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d16;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.cbb-wrap{display:flex;flex-direction:column;align-items:center;gap:18px}
.cbb-stage{position:relative;width:min(340px,86vw);height:320px;border-radius:18px;background:radial-gradient(100% 100% at 50% 0%,#141a30,#0b0d16);border:1px solid rgba(255,255,255,.1);overflow:hidden}
.cbb-ball{position:absolute;left:50%;top:24px;width:64px;height:64px;margin-left:-32px;border-radius:50%;background:radial-gradient(circle at 32% 26%,#a5b4fc,#4f46e5 65%);box-shadow:0 10px 26px rgba(79,70,229,.4);will-change:transform}
.cbb-shadow{position:absolute;left:50%;bottom:26px;width:70px;height:12px;margin-left:-35px;border-radius:50%;background:rgba(0,0,0,.55);filter:blur(4px);will-change:transform,opacity}
.cbb-floor{position:absolute;left:0;right:0;bottom:30px;border-top:1px solid rgba(255,255,255,.14)}
.cbb-bar{display:flex;gap:8px}
.cbb-btn{padding:9px 18px;border-radius:99px;border:1px solid rgba(255,255,255,.16);background:#141a2e;color:#c9d2f8;font:600 13px system-ui;cursor:pointer;transition:background .2s,border-color .2s}
.cbb-btn:hover{background:#1d2440}
.cbb-btn.is-active{border-color:#818cf8;background:#1d2440}
.cbb-hint{color:#5f6782;font-size:12px;letter-spacing:.05em}`,

  js: `gsap.registerPlugin(CustomEase, CustomBounce);

var DROP = 196; // px from rest to floor contact

function play(strength) {
  // CustomBounce generates TWO eases: 'ball' for position and
  // 'ball-squash' — perfectly synchronized so squash happens exactly
  // at each floor contact.
  CustomBounce.create('ball', { strength: strength, squash: 3 });

  gsap.killTweensOf(['#cbbBall', '#cbbShadow']);
  gsap.set('#cbbBall', { y: 0, scaleX: 1, scaleY: 1, transformOrigin: '50% 100%' });

  var dur = 1.6 + strength;

  gsap.to('#cbbBall', { y: DROP, duration: dur, ease: 'ball' });
  gsap.to('#cbbBall', {
    scaleX: 1.5, scaleY: 0.55,
    duration: dur,
    ease: 'ball-squash',
    transformOrigin: '50% 100%'
  });
  // The shadow grows and darkens as the ball approaches the floor.
  gsap.fromTo('#cbbShadow',
    { scale: 0.45, opacity: 0.25 },
    { scale: 1, opacity: 0.8, duration: dur, ease: 'ball' });
}

var buttons = document.querySelectorAll('.cbb-btn');
buttons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    buttons.forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    play(Number(btn.getAttribute('data-strength')));
  });
});

play(0.6);`,

  seo: {
    title: 'CustomBounce Ball — Free GSAP Squash & Stretch Snippet',
    description: `A dropping ball with real squash-and-stretch via GSAP CustomBounce — paired position and squash eases, strength presets. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'CustomBounce Ball — Animation-Principle Bouncing With Paired Eases',
      description: `GSAP's built-in \`bounce.out\` moves a value like a bouncing ball — but a *real* ball also squashes on impact and stretches in flight, Disney's most famous animation principle. Faking that by hand means computing exactly when each bounce contacts the floor and syncing scale keyframes to those instants. CustomBounce (free on the CDN since 3.13) does the sync for you: one call generates a position ease *and* a matched squash ease whose deformations land precisely on every floor contact.

**One create() call, two synchronized eases**

\`CustomBounce.create('ball', { strength: 0.6, squash: 3 })\` registers two named eases: \`'ball'\`, the bounce trajectory for \`y\`, and \`'ball-squash'\`, a companion curve that spikes exactly at the trajectory's contact points. Two separate tweens — one moving \`y\`, one animating \`scaleX/scaleY\` — run over the *same duration* with their respective eases, and because both curves were generated from the same bounce math, deformation and impact can never drift apart. That co-generation is the entire plugin; hand-synced versions break the moment you retune the bounce.

**strength is restitution**

The \`strength\` parameter (0–1) is effectively the coefficient of restitution: how much energy survives each bounce. Soft (0.3) dies in a couple of low rebounds; Superball (0.8) keeps rebounding tall and long. The demo scales total duration with strength (\`1.6 + strength\`) because bouncier balls genuinely take longer to settle — a fixed duration would compress the superball's extra bounces into frantic jitter.

**squash: 3 and the transform origin**

\`squash\` sets how much of the ease's time is spent deformed relative to airborne travel. The squash tween drives \`scaleX: 1.5, scaleY: 0.55\` — wider and flatter — with \`transformOrigin: '50% 100%'\` so the ball flattens *against the floor* rather than around its own center (center-origin squash makes the ball appear to levitate mid-impact, the most common squash-and-stretch mistake).

**The shadow rides the same position ease**

The contact shadow grows and darkens using the *same* \`'ball'\` ease on scale and opacity — so it inflates as the ball approaches and shrinks as it rebounds, in perfect sync, with zero additional timing logic. Reusing a registered ease across properties is the quiet superpower of named CustomEases.

**Replays are kill-set-play**

Each button re-creates the ease with a new strength (re-registering under the same name replaces it), kills running tweens, resets transforms, and replays — the standard idiom for parameterized animations, keeping every run interrupt-safe.

**Where CustomBounce sits in the ease family**

It's built on CustomEase (SVG-path-defined easing curves — also loaded here as a dependency) alongside CustomWiggle. Bounce trajectories are painful to draw by hand as paths; CustomBounce is essentially a curve *generator* for the physics-shaped subset. For arbitrary hand-drawn feels, drop to raw CustomEase; for oscillation, see [custom wiggle icons](/ui-snippets/custom-wiggle-icons/).

**Customizing it**

Tweak \`squash\` (1 subtle, 4 cartoon), drop from a click position, or apply the paired-eases idea to UI: a dropping modal or badge with landing squash reads delightfully physical. Related motion: ease shopping in [gsap ease gallery](/ui-snippets/gsap-ease-gallery/), simulated momentum in [physics props pucks](/ui-snippets/physics-props-pucks/), gravity arcs in [physics 2d burst](/ui-snippets/physics-2d-burst/), and the CSS-keyframe [breathing animation](/ui-snippets/breathing-animation/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `gsap, CustomEase, and CustomBounce (order matters).` },
      { title: 'Paste HTML, CSS, and JS', text: `The ball drops immediately with the Bouncy preset.` },
      { title: 'Watch an impact', text: `The ball squashes flat exactly at floor contact.` },
      { title: 'Try Superball', text: `Higher strength: taller rebounds, longer settle.` },
      { title: 'Watch the shadow', text: `It grows and darkens on the same ease.` },
      { title: 'Tune squash', text: `Raise it toward 4 for cartoon-grade deformation.` },
    ] },
    features: [
      { title: 'Paired ease generation', text: `Position and squash curves from one call.` },
      { title: 'Contact-perfect squash', text: `Deformation lands on every impact.` },
      { title: 'Restitution control', text: `strength shapes rebound energy.` },
      { title: 'Floor-anchored origin', text: `Squash flattens against the ground.` },
      { title: 'Strength-scaled time', text: `Bouncier presets settle over longer runs.` },
      { title: 'Shared named eases', text: `The shadow reuses the ball's curve.` },
      { title: 'Interrupt-safe replays', text: `Kill, reset, re-create, play.` },
      { title: 'CustomEase family', text: `Built on SVG-path-defined easing.` },
    ],
    useCases: [
      { title: 'Notification arrivals', text: 'Drop a badge in with impact squash beside a [notification bell](/ui-snippets/notification-bell/), using paired position and squash curves from one call.' },
      { title: 'Modal entrances', text: 'Land a [confirm dialog](/ui-snippets/confirm-dialog/) with weight, using a softer strength preset so the bounce suits a serious message.' },
      { title: 'Game HUD pickups', text: 'Bounce coins or items into a heads-up display, near [physics balls](/ui-snippets/physics-balls/) that show the same idea with a real engine.' },
      { title: 'Empty-state mascots', text: 'Bring a character into an [empty state](/ui-snippets/empty-state/) with squash against the ground, anchored so deformation flattens at the floor.' },
      { title: 'Ease education', text: 'Compare against stock curves in the [GSAP ease gallery](/ui-snippets/gsap-ease-gallery/), or look at [custom wiggle icons](/ui-snippets/custom-wiggle-icons/) for oscillation from the same plugin family.' },
      { icon: 'CODE', title: 'Related: FLIP Technique List Reorder Animation', desc: 'See the [FLIP Technique List Reorder Animation](/ui-snippets/flip-list-reorder-animation/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What does CustomBounce add over the built-in bounce ease?', a: `The companion squash ease. bounce.out only shapes a value's trajectory; CustomBounce.create generates that trajectory plus a second registered ease ('name-squash') whose spikes align exactly with each floor contact. Run position and scale tweens over the same duration with the paired eases and squash-and-stretch synchronizes to impacts automatically — the hand-sync this replaces breaks on every retune.` },
      { q: 'What do strength and squash control?', a: `strength (0–1) is restitution — how much energy each rebound keeps: 0.3 dies quickly in low bounces, 0.8 keeps rebounding tall. squash sets how much relative time the ease allocates to deformation at contact versus airborne travel: 1 reads as firm rubber, 3–4 as cartoon. They're independent, so a soft ball can still squash dramatically.` },
      { q: 'Why is transformOrigin set to the ball’s bottom?', a: `Squash must flatten against the floor: with origin at 50% 100%, scaleY compresses the ball downward onto the contact line while scaleX widens it there. Center-origin squash shrinks toward the middle, visually lifting the ball's underside off the floor mid-impact — the tell-tale mistake in most squash-and-stretch attempts.` },
      { q: 'How does the shadow stay perfectly synced without extra timing?', a: `It tweens with the same registered 'ball' ease over the same duration — as y approaches the floor the ease's progress drives shadow scale and opacity up, and rebounds pull both back. Named eases are reusable across any tween and property, so one generated curve coordinates ball, squash companion, and shadow.` },
      { q: 'Why does replaying re-create the ease each time?', a: `Each preset needs a different strength, and CustomBounce.create registering under the same name simply replaces the previous curves. The replay then follows the kill-set-play idiom — kill running tweens, reset transforms, start fresh — which keeps mid-animation button mashing safe and means the shadow and squash always pair with the current preset's trajectory.` },
      { q: 'How do I use CustomBounce in React, Vue, or Angular?', a: `Register CustomEase and CustomBounce at module scope and create the named ease there too if strength is fixed; parameterized versions re-create inside the play function as here. Trigger from handlers against refs, and killTweensOf the ball in the unmount cleanup (useEffect return, onUnmounted, ngOnDestroy). The stage is simple absolute positioning that maps directly to Tailwind utilities.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reverse-engineer how the two generated eases stay locked together. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how CustomBounce.create derives the 'ball-squash' ease from the same underlying bounce math as the 'ball' position ease, and why that guarantees the squash always lands on a floor contact instead of drifting out of sync over repeated bounces. The same assistant can help optimize it — ask whether re-creating the named ease on every button click is wasteful when only three fixed strength presets ever get used, and whether those could be pre-registered once instead. It's also useful for extending the effect: ask it to add a click-to-drop-from-cursor-position interaction, a second ball with a different squash value bouncing alongside the first for comparison, or a sound effect timed to trigger exactly at each floor contact using the same ease's progress. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a squash-and-stretch bouncing ball animation in plain HTML, CSS, and JavaScript using GSAP with the CustomEase and CustomBounce plugins (load all three from a CDN, in that order) — no manual keyframe timing.

Requirements:
- A circular ball element and a separate blurred elliptical shadow element on a stage with a visible floor line.
- Call CustomBounce.create with a unique name, a strength option between 0 and 1 controlling how much energy the bounce retains per rebound, and a squash option controlling how exaggerated the impact deformation is.
- Run two separate GSAP tweens over the exact same duration: one animating the ball's y position using the generated position ease, and one animating the ball's scaleX and scaleY using the generated companion squash ease, so the deformation is mathematically guaranteed to land exactly at each floor contact rather than being manually timed.
- Set the ball's transform-origin to the bottom-center of the element (not its own center) before applying the squash scale, so the ball visibly flattens against the floor on impact instead of appearing to compress around its own middle and float above the ground.
- Scale down the shadow's size and opacity when the ball is airborne and grow/darken it as the ball approaches the floor, driven by reusing the same named position ease rather than writing separate timing logic for the shadow.
- Scale the total animation duration up as the strength value increases, since a bouncier ball takes measurably longer to settle and a fixed duration would visually compress its extra rebounds.
- Provide at least three strength presets as buttons, and make replaying any preset kill any in-flight tweens on the ball and shadow, reset their transforms, then start a fresh animation — so rapid button clicks never leave the ball in a broken mid-animation state.`,
    },
  },
};

export default customBounceBall;
