const threeScrollTunnel = {
  id: 'three-scroll-tunnel',
  title: 'Three.js Scroll Tunnel Travel',
  lastmod: '2026-07-19',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="tnl-top"><p>Scroll ↓ to enter the tunnel</p></section>
<section class="tnl-stage" id="tnlStage">
  <canvas id="tnlCanvas"></canvas>
  <div class="tnl-hud"><span id="tnlDepth">0</span> m</div>
</section>
<section class="tnl-bottom"><p>You've reached the end of the line.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#04040a;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.tnl-top,.tnl-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#7c83a6;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.tnl-stage{height:100vh;position:relative;overflow:hidden;background:#04040a}
#tnlCanvas{display:block;width:100%;height:100%}
.tnl-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#67e8f9;text-transform:uppercase;opacity:.8}`,

  js: `const canvas = document.getElementById('tnlCanvas');
const depthEl = document.getElementById('tnlDepth');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x04040a, 0.06);
const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 120);
camera.position.set(0, 0, 0);

// A curved path through space. The tube geometry is extruded along it and
// the camera later travels the exact same curve, so the visitor is always
// inside the tube looking down its throat.
const points = [];
for (let i = 0; i < 12; i++) {
  points.push(new THREE.Vector3(
    Math.sin(i * 0.6) * 6,
    Math.cos(i * 0.5) * 5,
    -i * 12
  ));
}
const curve = new THREE.CatmullRomCurve3(points);

const tubeGeo = new THREE.TubeGeometry(curve, 400, 3.2, 24, false);
const wire = new THREE.LineSegments(
  new THREE.WireframeGeometry(tubeGeo),
  new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.5 })
);
scene.add(wire);

// Neon rings threaded along the curve give a strong sense of forward speed
// as the camera passes through them.
const rings = [];
for (let i = 0; i < 40; i++) {
  const t = i / 40;
  const pos = curve.getPointAt(t);
  const tangent = curve.getTangentAt(t);
  const hue = (t * 0.6 + 0.5) % 1;
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.6, 0.06, 8, 40),
    new THREE.MeshBasicMaterial({ color: new THREE.Color().setHSL(hue, 0.8, 0.6) })
  );
  ring.position.copy(pos);
  ring.lookAt(pos.clone().add(tangent));
  scene.add(ring);
  rings.push(ring);
}

gsap.registerPlugin(ScrollTrigger);

// A single scrubbed value 't' walks the camera from the start of the curve
// to the end. Everything downstream is derived from t each frame.
const travel = { t: 0 };
gsap.to(travel, {
  t: 0.985,
  ease: 'none',
  scrollTrigger: {
    trigger: '#tnlStage',
    start: 'top top',
    end: '+=500%',
    scrub: 0.7,
    pin: true,
  },
});

let roll = 0;
function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);

  const t = Math.max(0.0001, Math.min(0.999, travel.t));
  const pos = curve.getPointAt(t);
  const look = curve.getPointAt(Math.min(0.999, t + 0.01));
  camera.position.copy(pos);

  // Roll the CAMERA (its up vector) so the tunnel appears to twist past you,
  // while the tube and rings stay fixed and perfectly aligned on the shared
  // curve. Rotating the wireframe itself swung it around the world origin,
  // which drifted the mesh away from the rings.
  roll += 0.0015;
  camera.up.set(Math.sin(roll), Math.cos(roll), 0);
  camera.lookAt(look);

  depthEl.textContent = Math.round(t * curve.getLength());
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Tunnel — GSAP ScrollTrigger WebGL Flythrough',
    description: 'Fly through a neon wireframe tunnel scrubbed by the scrollbar with GSAP ScrollTrigger and Three.js TubeGeometry. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Neon Tunnel Flythrough With Three.js and GSAP',
      description: `The **Three.js Scroll Tunnel** snippet drops the visitor inside a glowing wireframe tube and flies them down its length as they scroll — the scrollbar drives camera position directly along a curved 3D path, not a timer — by pairing Three.js \`TubeGeometry\` with GSAP's ScrollTrigger plugin, both loaded from a CDN.

**One curve defines both the tunnel and the camera path**

The whole effect hinges on a single \`CatmullRomCurve3\` built from a dozen control points that gently wander in X and Y while marching steadily in negative Z. That one curve is used twice: once to extrude the \`TubeGeometry\` that becomes the visible tunnel walls, and again as the exact path the camera travels. Because the geometry and the camera share the same curve, the camera is always perfectly centered inside the tube looking down its throat — there is no separate "align the camera to the wall" step to get wrong.

**A single scrubbed number walks the whole scene**

Rather than tweening the camera object, the snippet scrubs one plain value — \`travel.t\` — from 0 to just under 1. Every frame, \`curve.getPointAt(t)\` returns the camera's exact world position and \`curve.getPointAt(t + 0.01)\` returns a look-ahead point a little further down the tube. Deriving everything from one normalized parameter means the tunnel can be reshaped, lengthened, or curved differently without touching the ScrollTrigger timeline at all.

**Look-ahead, not look-at-center**

If the camera simply stared at the tunnel's far end, cornering would feel wrong — you would see the wall swing past rather than the path bend toward you. Instead the look target is sampled a small fraction of the curve *ahead* of the camera's current position, so the camera always faces the direction of travel and banks naturally into each turn, exactly like a real vehicle following a track.

**Neon rings sell the speed**

Forty torus rings are threaded along the curve at even intervals, each oriented perpendicular to the path using \`curve.getTangentAt()\` and \`lookAt()\`, and tinted across a hue sweep. A featureless tube gives almost no sense of motion; the rings streaking past the camera are what make the flythrough read as genuine forward speed, and they double as depth markers.

**Exponential fog hides the seams**

\`FogExp2\` fades the far end of the tunnel into the background color, which both hides where the finite tube geometry ends and concentrates the neon glow near the camera. Because the fog color matches the page background exactly, the WebGL canvas blends seamlessly into the surrounding scroll sections above and below the pinned stage.

**scrub: 0.7 for cinematic glide**

A numeric scrub value lets the camera position glide toward the scroll position over about seven-tenths of a second rather than snapping frame-perfectly. Fast camera travel through a tunnel amplifies input jitter, so this smoothing is what turns raw trackpad and wheel noise into a fluid, deliberate ride. This is the same scrubbing pattern used by the [scroll camera path](/ui-snippets/three-scroll-camera-path/) snippet, applied to a curved tube instead of a straight gallery. Pair it with a [starfield warp](/ui-snippets/three-starfield-warp/) intro or a [synthwave terrain](/ui-snippets/three-synthwave-terrain/) outro for a full retro-futurist scroll journey.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load all three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js from the CDN panel, in that order.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A neon wireframe tunnel appears in a pinned 3D stage with a live depth read-out.' },
        { title: 'Scroll down', text: 'The camera flies down the curved tube, passing through glowing rings tied directly to scroll position.' },
        { title: 'Scroll back up', text: 'The flythrough reverses exactly, since the travel value is fully scrubbed rather than timer-based.' },
        { title: 'Reshape the tunnel', text: 'Edit the control-point loop to change how the curve wanders, or the TubeGeometry radius to widen it.' },
        { title: 'Tune the ride length', text: 'Change the ScrollTrigger end value (+=500%) for a longer, slower descent or a shorter, quicker one.' },
      ],
    },
    features: [
      'One shared CatmullRomCurve3 defines both the tunnel geometry and the camera path — always perfectly centered',
      'Single scrubbed parameter: GSAP tweens one 0–1 value that walks the camera along the curve each frame',
      'Look-ahead targeting: the camera faces a point sampled further down the curve, so it banks into every turn',
      'Forty hue-swept neon rings thread the path to convey genuine forward speed and depth',
      'FogExp2 matched to the page background hides the tube end and blends the canvas into surrounding sections',
      'Smoothed scrub (0.7): camera travel glides toward scroll position instead of snapping frame-perfectly',
      'Live depth HUD derived from curve.getLength() times the scrubbed parameter',
      'Fully reversible and pinned — scrolling back up replays the descent backward with no extra code',
    ],
    useCases: [
      { icon: 'WEB', title: 'Immersive landing intros', desc: 'Open a product or event site by pulling visitors down a neon tunnel before the content resolves.' },
      { icon: 'GAME', title: 'Game and esports promos', desc: 'A high-speed tube ride matches the energy of arcade racers, rhythm games, and cyberpunk worlds.' },
      { icon: 'ANIM', title: 'Music and event pages', desc: 'Sync the ring colors to a brand palette for a scroll-controlled hype reel above the lineup.' },
      { icon: 'LEARN', title: 'Teaching curve-based camera rigs', desc: 'A compact example of driving a Three.js camera along a CatmullRomCurve3 with getPointAt and getTangentAt.' },
      { icon: 'DESIGN', title: 'Portfolio transitions', desc: 'Use the tunnel as a transition between a [scroll camera path](/ui-snippets/three-scroll-camera-path/) gallery and your work.' },
      { icon: 'ART', title: 'Sci-fi storytelling', desc: 'Pair each ring you pass with a caption to narrate a journey, chapter by chapter, as the visitor scrolls.' },
    ],
    faqs: [
      { q: 'Why use the same curve for the tunnel and the camera?', a: 'The TubeGeometry is extruded along a CatmullRomCurve3, and the camera travels that identical curve via getPointAt. Sharing one curve guarantees the camera is always centered inside the tube looking down its length, so there is never a mismatch between where the walls are and where the camera points — reshaping the curve reshapes both at once.' },
      { q: 'Why sample a look-ahead point instead of looking at the tunnel end?', a: 'Facing a fixed far point makes corners feel like the wall is swinging past you. Sampling the curve a small fraction ahead of the camera\'s current position (t + 0.01) means the camera always aims down the direction of travel, so it banks naturally into each bend the way a vehicle follows a track.' },
      { q: 'What makes the sense of speed so strong?', a: 'Forty torus rings are placed along the curve at even intervals, each oriented perpendicular to the path with getTangentAt and lookAt. A bare tube gives almost no motion cue; the rings streaking past the camera are what read as real forward velocity, and they act as evenly spaced depth markers.' },
      { q: 'Why does the fog color match the background?', a: 'FogExp2 fades the distant tube into the page background color. Matching the fog to the CSS background hides where the finite geometry ends and lets the WebGL canvas blend seamlessly into the plain scroll sections above and below the pinned stage, so there is no visible edge to the 3D scene.' },
      { q: 'Can I use this Three.js scroll tunnel in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind version. Build the curve, geometry, and GSAP timeline inside a mount effect against a canvas ref, and on cleanup kill the ScrollTrigger instance (or revert a gsap.context) and call renderer.dispose() so the pin and WebGL context are released on unmount.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to reverse-engineer how a single scrubbed number can drive an entire curved flythrough. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to walk through why the tunnel geometry and the camera share one CatmullRomCurve3, or why the look target is sampled ahead of the camera rather than at a fixed point. The same assistant can help you extend it — ask it to add a subtle roll that leans into each turn using the curve's tangent, spawn particles that stream backward past the camera for extra speed, or trigger a color pulse on the rings in time with an audio track. It can also optimize the scene, for instance merging the ring meshes into a single instanced mesh so forty draw calls collapse into one. Treat the code as a conversation starter, not a finished artifact.`,
      prompt: `Build a "scroll-scrubbed neon tunnel flythrough" in plain HTML, CSS, and JavaScript using Three.js, GSAP, and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned section containing a full-size canvas, with a WebGLRenderer and PerspectiveCamera sized to it and updated on window resize including aspect ratio.
- Build a single THREE.CatmullRomCurve3 from about a dozen control points that wander gently in X and Y while stepping steadily in negative Z.
- Extrude a THREE.TubeGeometry along that curve and render it as a wireframe (LineSegments over WireframeGeometry) so the tunnel walls glow.
- Thread roughly 40 torus rings along the same curve at even intervals, each positioned with getPointAt and oriented perpendicular to the path using getTangentAt and lookAt, tinted across a hue sweep.
- Add THREE.FogExp2 whose color matches the page background so the far end of the tube fades out and the canvas blends into surrounding scroll sections.
- Register a GSAP tween on a ScrollTrigger targeting the pinned section, with pin: true, start at top top, a numeric scrub around 0.7, and an end several hundred percent tall, animating a single plain value t from 0 to just under 1.
- Every animation frame (requestAnimationFrame, independent of the scroll callback), set the camera position to curve.getPointAt(t) and call camera.lookAt on curve.getPointAt(t + a small delta) so the camera always faces the direction of travel and banks into turns.
- Confirm scrolling back up reverses the entire flythrough, since t is fully scrubbed rather than a one-way timer.`,
    },
  },
};

export default threeScrollTunnel;
