const motionPathPlane = {
  id: 'motion-path-plane',
  title: 'Motion Path Plane',
  lastmod: '2026-07-18',
  category: 'animations',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/MotionPathPlugin.min.js',
  ],
  html: `<div class="mpp-wrap">
  <svg class="mpp-svg" viewBox="0 0 600 320">
    <path id="mppPath" class="mpp-path" d="M60,240 C140,80 240,80 300,180 C360,280 460,280 540,110"/>
    <circle class="mpp-dot" cx="60" cy="240" r="6"/>
    <circle class="mpp-dot" cx="540" cy="110" r="6"/>
    <g id="mppPlane" class="mpp-plane"><text font-size="30" text-anchor="middle" dominant-baseline="central">✈️</text></g>
  </svg>
  <div class="mpp-bar">
    <button class="mpp-btn" data-speed="0.5">0.5×</button>
    <button class="mpp-btn is-active" data-speed="1">1×</button>
    <button class="mpp-btn" data-speed="2">2×</button>
  </div>
  <p class="mpp-hint">autoRotate keeps the plane's nose on the curve's tangent.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d16;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.mpp-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;width:min(640px,94vw)}
.mpp-svg{width:100%;height:auto;background:radial-gradient(90% 90% at 50% 30%,#141a30,#0b0d16);border-radius:18px;border:1px solid rgba(255,255,255,.1)}
.mpp-path{fill:none;stroke:rgba(165,180,252,.5);stroke-width:2.5;stroke-dasharray:3 9;stroke-linecap:round}
.mpp-dot{fill:#818cf8}
.mpp-plane{will-change:transform}
.mpp-bar{display:flex;gap:8px}
.mpp-btn{padding:8px 18px;border-radius:99px;border:1px solid rgba(255,255,255,.16);background:#141a2e;color:#c9d2f8;font:600 13px system-ui;cursor:pointer;transition:background .2s,border-color .2s}
.mpp-btn:hover{background:#1d2440}
.mpp-btn.is-active{border-color:#818cf8;background:#1d2440}
.mpp-hint{color:#5f6782;font-size:12px;letter-spacing:.05em}`,

  js: `gsap.registerPlugin(MotionPathPlugin);

// One tween: the plane follows the SVG path, auto-rotating to the
// curve's tangent. align maps path coordinates onto the plane's space;
// alignOrigin centers the plane's own box on the path line.
var flight = gsap.to('#mppPlane', {
  duration: 5,
  repeat: -1,
  yoyo: true,
  ease: 'power1.inOut',
  motionPath: {
    path: '#mppPath',
    align: '#mppPath',
    autoRotate: true,
    alignOrigin: [0.5, 0.5]
  }
});

// Speed controls scale playback without rebuilding the tween.
var buttons = document.querySelectorAll('.mpp-btn');
buttons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    buttons.forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    gsap.to(flight, { timeScale: Number(btn.getAttribute('data-speed')), duration: 0.5 });
  });
});`,

  seo: {
    title: 'Motion Path Plane — Free GSAP MotionPathPlugin Snippet',
    description: `A plane flying along an SVG bézier curve with GSAP MotionPathPlugin — autoRotate heading, align mapping, live timeScale. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Motion Path Plane — Fly Any Element Along an SVG Curve',
      description: `Moving an element along a curve is the animation ask that breaks CSS: keyframes interpolate in straight lines, and \`offset-path\` support is inconsistent where you need it most. GSAP's MotionPathPlugin (free on the CDN) makes it one tween: this snippet flies a plane back and forth along a dashed bézier route, nose always tangent to the curve, with buttons that retime the flight live via \`timeScale\`.

**One config replaces a page of trigonometry**

\`motionPath: { path: '#mppPath', align: '#mppPath', autoRotate: true, alignOrigin: [0.5, 0.5] }\` does four jobs. \`path\` samples the bézier; \`autoRotate\` continuously sets rotation to the curve's tangent angle (the derivative work you'd otherwise approximate by sampling two nearby points, as the hand-rolled [scroll path follow](/ui-snippets/scroll-path-follow/) does); \`align\` solves coordinate spaces; and \`alignOrigin\` pins the element's center — rather than its top-left corner — onto the path line. Without alignOrigin, the plane would ride the curve by its corner, visibly floating beside the route.

**align is the part everyone underestimates**

An SVG path's coordinates live in the SVG's viewBox space; the animated element has its own coordinate system, transforms, and origin. \`align: '#mppPath'\` measures both and calibrates the tween so the element travels *visually on* the stroked line — accounting for viewBox scaling, existing transforms, and nesting. This is the plugin's quiet superpower: it even lets DOM elements (a div outside the SVG) follow an SVG path, since alignment is computed in screen space.

**yoyo makes a patrol route out of one path**

\`repeat: -1, yoyo: true\` sends the plane out and back forever, and because \`autoRotate\` derives from direction of travel, the plane automatically faces backward on return legs — no second path, no manual flip. \`power1.inOut\` eases each leg so the plane banks gently out of each endpoint rather than bouncing off it.

**timeScale is live retiming, not rebuilding**

The speed buttons never touch the motion path: they tween the *tween's* \`timeScale\` to 0.5, 1, or 2 over half a second. Animating timeScale (rather than setting it) means speed changes themselves accelerate smoothly — the plane audibly "throttles up" instead of jumping to the new rate. This works because a GSAP tween is itself tweenable, one of the engine's most underused properties.

**The route is honest markup**

The dashed stroke users see *is* the animation's source of truth — restyle it, and the flight follows any \`d\` you paste in from Figma or Illustrator. Endpoint dots are plain circles at the path's terminal coordinates. Nothing about the route lives in JavaScript.

**start, end, and partial journeys**

Beyond this demo: \`start\`/\`end\` fractions animate along a sub-segment (\`start: 0.25, end: 0.75\`), values beyond 1 loop around closed paths, and \`start > end\` reverses direction — all without editing the path. Pair with ScrollTrigger and the same tween scrubs with the page.

**Customizing it**

Swap the emoji for an SVG plane that points right (autoRotate assumes rightward-facing art; add a fixed rotation offset otherwise), draw your own route, or attach a drawn trail with [scroll svg path draw](/ui-snippets/scroll-svg-path-draw/) mechanics. Related: scroll-scrubbed path riding in [scroll path follow](/ui-snippets/scroll-path-follow/), orbital motion in [orbiting icons](/ui-snippets/orbiting-icons/), and route-based storytelling in [scroll timeline dots](/ui-snippets/scroll-timeline-dots/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and MotionPathPlugin from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `The plane starts flying its dashed route.` },
      { title: 'Watch the turns', text: `autoRotate keeps the nose on the tangent.` },
      { title: 'Let it return', text: `yoyo flies the same path backward, heading flipped.` },
      { title: 'Click 2×', text: `timeScale tweens up — the plane throttles smoothly.` },
      { title: 'Paste your own path', text: `Any d attribute becomes the new route.` },
    ] },
    features: [
      { title: 'True curve travel', text: `Bézier-accurate motion, no waypoint faking.` },
      { title: 'Tangent heading', text: `autoRotate derives rotation from direction.` },
      { title: 'Space calibration', text: `align solves SVG-to-element coordinates.` },
      { title: 'Centered riding', text: `alignOrigin pins the element's middle to the line.` },
      { title: 'Patrol loops', text: `yoyo reverses path and heading together.` },
      { title: 'Live throttle', text: `timeScale tweens retime without rebuilding.` },
      { title: 'Markup-owned route', text: `The visible dashed path is the source of truth.` },
      { title: 'Partial segments', text: `start/end fractions fly sub-routes.` },
    ],
    useCases: [
      { title: 'Travel and delivery maps', text: 'Fly a plane or truck along a route using real bezier travel, with `autoRotate` deriving the heading from the curve tangent.' },
      { title: 'Onboarding journey markers', text: 'Move a dot between setup milestones beside [scroll timeline dots](/ui-snippets/scroll-timeline-dots/), with `align` calibrating SVG space to the element.' },
      { title: 'Hero ambience', text: 'Let paper planes or comets drift through a [startup hero](/ui-snippets/startup-hero/), with `alignOrigin` pinning the element\'s middle to the line.' },
      { title: 'Process diagrams', text: 'Send tokens flowing through pipeline curves, and pair with [scroll SVG path draw](/ui-snippets/scroll-svg-path-draw/) to draw the route as well.' },
      { title: 'Orbital and game paths', text: 'Use circular paths for satellites next to [orbiting icons](/ui-snippets/orbiting-icons/), or have characters patrol a map near [physics balls](/ui-snippets/physics-balls/).' },
      { icon: 'CODE', title: 'Related: Zdog Pseudo-3D Orbit Scene', desc: 'See the [Zdog Pseudo-3D Orbit Scene](/ui-snippets/zdog-orbit-scene/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why not use CSS offset-path for this?', a: `offset-path can follow a path string, but support gaps (especially older Safari), no autoRotate offset control, awkward coordinate handling for elements outside the SVG, and zero runtime control (no timeScale, no scrubbing, no partial segments) make it fragile for production. MotionPathPlugin normalizes all of it behind one tween that also composes with every other GSAP feature.` },
      { q: 'What exactly does align do?', a: `It reconciles coordinate systems: the path's points live in the SVG viewBox space while the moving element has its own space, transforms, and origin. align: '#mppPath' measures both in screen space and calibrates the tween so the element rides visually on the stroked line — which is also why a plain div outside the SVG can follow an SVG path perfectly.` },
      { q: 'How does the plane know which way to face?', a: `autoRotate: true sets the element's rotation to the path's tangent angle at every tick — the same heading math you'd otherwise approximate by sampling two nearby points and taking atan2. Because heading derives from travel direction, the yoyo return leg faces backward automatically. Art must point right by default; autoRotate: 90 style numeric offsets fix art drawn facing up.` },
      { q: 'How do the speed buttons work without restarting the flight?', a: `They tween the tween: gsap.to(flight, { timeScale: 2, duration: 0.5 }) smoothly accelerates playback rate itself, so the plane throttles up over half a second instead of jumping. Tweens being tweenable is core GSAP — the flight's position, path, and heading logic are untouched; only its clock changes.` },
      { q: 'Can the plane fly just part of the route, or a closed loop?', a: `Yes — start and end fractions define a sub-segment (start: 0.25, end: 0.75 flies the middle half), start greater than end reverses direction, and on closed paths values beyond 1 wrap for continuous laps. Combined with ScrollTrigger, the same motionPath tween scrubs along the route as the page scrolls.` },
      { q: 'How do I use MotionPathPlugin in React, Vue, or Angular?', a: `Register the plugin at module scope, inline the SVG, and create the flight tween in a mount effect — useEffect, onMounted, or ngAfterViewInit — via refs, killing it (or reverting a gsap.context) in the cleanup so the infinite repeat stops on unmount. Keep speed as a ref-held tween handle, not state — buttons call gsap.to(flightRef.current, { timeScale }) directly. The control bar maps straight to Tailwind.` },
    ],
    aiPrompt: {
      paragraph: `Instead of reverse-engineering the coordinate math by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely what the align and alignOrigin options are compensating for, and why removing alignOrigin would make the plane visibly float off the stroked path rather than ride on top of it. The same assistant can help you optimize it too, for instance asking whether animating timeScale on the tween itself is cheaper than killing and recreating the tween on every speed click, or whether autoRotate's per-frame tangent calculation could become a bottleneck if dozens of elements followed paths simultaneously. It's also useful for extending the effect: ask it to attach a fading trail behind the plane using a second path-drawing animation, support multiple planes on independent staggered schedules along the same route, or sync the flight's progress to scroll position with ScrollTrigger instead of looping automatically. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "fly along a curve" animation in plain HTML, CSS, and JavaScript using GSAP and its MotionPathPlugin (load both from a CDN) — no offset-path CSS, no manual trigonometry.

Requirements:
- An SVG containing a visible dashed bezier curve (a path element with a multi-point d attribute) and a separate element (an emoji or small group) that will travel along it.
- Animate the traveling element along the curve using GSAP's motionPath configuration, referencing the path by its selector so the route lives in markup, not as coordinates duplicated in JavaScript.
- The traveling element's rotation must continuously match the curve's tangent direction at its current position, so it visibly "banks" into turns rather than staying at a fixed rotation.
- The element's own center point (not its top-left corner or default SVG origin) must be the point that rides exactly on the stroked line — account for whatever alignment/origin configuration the plugin needs so there's no visible offset between the drawn curve and the traveling element's position.
- The animation must repeat indefinitely, alternating direction each pass (so it travels forward then backward along the same curve, forever) with an ease that gently decelerates into each endpoint before reversing.
- Add speed-control buttons (e.g. 0.5x, 1x, 2x) that retime the existing animation's playback rate smoothly over a brief transition, rather than killing and rebuilding the animation from scratch.`,
    },
  },
};

export default motionPathPlane;
