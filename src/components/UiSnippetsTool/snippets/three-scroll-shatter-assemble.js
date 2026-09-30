const threeScrollShatterAssemble = {
  id: 'three-scroll-shatter-assemble',
  title: 'Three.js Scroll Shatter & Assemble',
  lastmod: '2026-07-20',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="shx-stage" id="shxStage">
  <div class="shx-intro-overlay"><p>Scroll ↓ to assemble the shattered crystal</p></div>
  <canvas id="shxCanvas"></canvas>
  <div class="shx-hud"><span id="shxPct">0</span>% assembled</div>
</section>
<section class="shx-bottom"><p>Whole again.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0a0710;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.shx-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#9b8fc4;font-size:15px;letter-spacing:.08em;text-transform:uppercase;text-align:center;padding:0 24px}
.shx-stage{height:100vh;position:relative;overflow:hidden;background:radial-gradient(ellipse at center,#150e26 0%,#0a0710 75%)}
.shx-intro-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#9b8fc4;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease;}
#shxCanvas{display:block;width:100%;height:100%}
.shx-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#c9a8ff;text-transform:uppercase;opacity:.85}`,

  js: `const canvas = document.getElementById('shxCanvas');
const pctEl = document.getElementById('shxPct');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
camera.position.set(0, 1.5, 11);
camera.lookAt(0, 0, 0);

// Lighting matters far more here than in a flat wireframe scene: MeshStandardMaterial
// needs real lights to read as solid glowing crystal rather than a silhouette.
scene.add(new THREE.AmbientLight(0x8866ff, 0.35));
const key = new THREE.PointLight(0x9d7bff, 3.2, 40);
key.position.set(6, 8, 8);
scene.add(key);
const rim = new THREE.PointLight(0x00e5ff, 1.6, 40);
rim.position.set(-8, -4, -6);
scene.add(rim);
const fill = new THREE.DirectionalLight(0xffffff, 0.5);
fill.position.set(-4, 6, 4);
scene.add(fill);

// Build the "assembled" reference shape by sampling faces of a big icosahedron,
// then generate one small fragment mesh per sampled face: a tetrahedron given
// a target position/rotation on the surface, and a scattered start position/
// rotation flung out into space.
const SHAPE_RADIUS = 3.2;
const FRAGMENTS = 90;
const refGeo = new THREE.IcosahedronGeometry(SHAPE_RADIUS, 1);
const refPos = refGeo.attributes.position;
const faceCount = refPos.count / 3;

const fragments = [];
const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();
const tmpC = new THREE.Vector3();
const up = new THREE.Vector3(0, 1, 0);

for (let f = 0; f < FRAGMENTS; f++) {
  const faceIndex = f % faceCount;
  const i0 = faceIndex * 3;
  tmpA.fromBufferAttribute(refPos, i0);
  tmpB.fromBufferAttribute(refPos, i0 + 1);
  tmpC.fromBufferAttribute(refPos, i0 + 2);
  const center = tmpA.clone().add(tmpB).add(tmpC).divideScalar(3);
  const outward = center.clone().normalize();

  const size = 0.34 + Math.random() * 0.22;
  const geo = new THREE.TetrahedronGeometry(size, 0);
  const hue = 0.68 + (center.y / SHAPE_RADIUS) * 0.12; // subtle violet-to-cyan gradient by height
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(hue, 0.6, 0.58),
    emissive: new THREE.Color().setHSL(hue, 0.8, 0.22),
    metalness: 0.55,
    roughness: 0.25,
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geo, mat);

  // Target: sits just off the icosahedron surface, oriented so one face
  // roughly faces outward — good enough for a "solid crystal" read without
  // real boolean face-fitting.
  const targetPos = center.clone().addScaledVector(outward, 0.05);
  const targetQuat = new THREE.Quaternion().setFromUnitVectors(up, outward);

  // Start: flung out along the same outward direction to a random distance,
  // with a fully randomized tumble rotation.
  const flingDist = 6 + Math.random() * 10;
  const scatterOffset = new THREE.Vector3(
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4
  );
  const startPos = outward.clone().multiplyScalar(flingDist).add(scatterOffset);
  const startQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2)
  );

  mesh.position.copy(startPos);
  mesh.quaternion.copy(startQuat);
  scene.add(mesh);

  fragments.push({ mesh, startPos, targetPos, startQuat, targetQuat, spin: (Math.random() - 0.5) * 0.02 });
}

const introEl = document.querySelector('.shx-intro-overlay');
gsap.registerPlugin(ScrollTrigger);

const assemble = { t: 0 };
gsap.to(assemble, {
  t: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: '#shxStage',
    start: 'top top',
    end: '+=450%',
    scrub: 0.6,
    pin: true,
  },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  if (introEl) introEl.style.opacity = (assemble.t > 0.03) ? '0' : '1';

  const t = assemble.t;
  const eased = t * t * (3 - 2 * t); // smoothstep: fragments accelerate in, then settle

  for (const frag of fragments) {
    frag.mesh.position.lerpVectors(frag.startPos, frag.targetPos, eased);
    // slerp handles the rotation lerp correctly (quaternion lerpVectors would
    // not stay normalized), so the tumble smoothly resolves into alignment.
    frag.mesh.quaternion.slerpQuaternions(frag.startQuat, frag.targetQuat, eased);
    // Residual spin fades out as the piece locks into place, selling weight.
    frag.mesh.rotateY(frag.spin * (1 - eased));
  }

  // Slowly orbit the whole assembled crystal once it's mostly together, and
  // pull the camera in slightly for a satisfying final close-up.
  scene.rotation.y += 0.0025 * eased;
  camera.position.z = 11 - eased * 2.2;
  camera.lookAt(0, 0, 0);

  pctEl.textContent = Math.round(eased * 100);
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Shatter & Assemble — Crystal Debris Effect',
    description: 'Scroll-scrub 90 crystal fragments from scattered debris into a solid lit icosahedron with Three.js MeshStandardMaterial. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Shatter-to-Assemble Crystal With Three.js',
      description: `The **Three.js Scroll Shatter & Assemble** snippet starts with ninety glowing crystal fragments flung apart in space and, as the visitor scrolls through a pinned stage, flies every fragment inward until it locks into an exact position and orientation on the surface of an intact icosahedron. Unlike a flat wireframe effect, this one leans on real \`MeshStandardMaterial\` shading and multiple point lights so the debris reads as solid, faceted crystal rather than a silhouette.

**Deriving fragment targets from a reference geometry**

Rather than hand-placing ninety fragments, the snippet builds a throwaway \`THREE.IcosahedronGeometry\` purely as a source of face data — it is never added to the scene. For each triangular face, the three vertex positions are averaged into a face center, and that center (plus its normalized "outward" direction) becomes the target position and target orientation for one small \`THREE.TetrahedronGeometry\` fragment. This is the same trick used by the [scroll particle assembly](/ui-snippets/three-scroll-particle-assembly/) snippet — sample a reference shape's geometry data to generate per-piece targets — applied here to solid mesh fragments instead of points.

**Position AND rotation both need lerping**

A shattered object is not just displaced, it is also tumbled — each piece has a random orientation while airborne and a specific, deliberate orientation once seated on the assembled surface. Interpolating position alone would leave fragments sliding into place while still spinning at some random fixed angle, breaking the illusion entirely. The snippet therefore stores both a \`startQuat\` and \`targetQuat\` per fragment and calls \`quaternion.slerpQuaternions(startQuat, targetQuat, eased)\` every frame alongside \`position.lerpVectors\`. Quaternion **slerp**, not a naive linear interpolation of Euler angles, is required here — lerping Euler angles independently produces gimbal-locked, non-uniform rotation speed and can even take the visually wrong short-path/long-path turn, whereas slerp guarantees the shortest, constant-angular-velocity rotation between the two orientations.

**Flinging fragments outward, not randomly**

Each fragment's scattered starting position is generated by taking its own target's outward direction vector and multiplying it by a large random distance, then adding a small random offset. Flinging pieces outward *along their own final position's radial direction* — rather than to a fully random point in space — makes the shatter read as an explosion centered on the object, which looks physically plausible, instead of a random cloud that happens to coincide with a crystal shape once settled.

**Why MeshStandardMaterial and three lights, not flat/wireframe**

Wireframe or \`MeshBasicMaterial\` looks are cheap but read as flat outlines with no sense of solidity — fine for a tunnel's glowing walls, wrong for debris meant to look like heavy crystal. This snippet uses \`MeshStandardMaterial\` with \`metalness\` and \`roughness\` tuned for a glassy-metallic look, plus \`flatShading: true\` so each tetrahedron's facets catch light distinctly rather than smoothing into a sphere. Because a PBR-ish material only reacts to real lights, the scene adds an ambient fill, a violet \`PointLight\` as the key light, a cyan \`PointLight\` as a rim light from the opposite side, and a soft white \`DirectionalLight\` — without those, the fragments would render as flat black shapes no matter how correct their geometry is.

**Height-based hue gradient for cohesion**

Each fragment's base color and emissive color are derived from a hue computed off its target's Y position (\`0.68 + center.y / SHAPE_RADIUS * 0.12\`), giving the assembled crystal a subtle violet-to-cyan gradient from bottom to top rather than every facet being an identical flat color. This mirrors the gradient technique used for particle color in the [galaxy formation](/ui-snippets/three-scroll-galaxy-formation/) snippet, adapted here from a radius-based gradient to a height-based one since the target shape is a solid rather than a disk.

**Residual spin that fades with progress**

To avoid pieces looking like they simply teleport-slide into their slots, each fragment carries a small constant per-frame spin (\`frag.spin\`) that is multiplied by \`(1 - eased)\` — meaning fragments tumble energetically while far from home and that tumble smoothly damps to zero exactly as they arrive, adding a sense of momentum bleeding off rather than an abrupt stop. Combined with the whole scene slowly orbiting once \`eased\` climbs, similar to the reveal rotation in [crystal cluster](/ui-snippets/three-crystal-cluster/), the finished crystal gets a satisfying weighty settle instead of a mechanical snap.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load all three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js from the CDN panel, in that order.' },
        { title: 'Paste HTML, CSS, and JS', text: 'Ninety scattered crystal fragments appear, lit by point lights, inside a pinned 3D stage with a live "% assembled" read-out.' },
        { title: 'Scroll down', text: 'Fragments fly inward, their tumble damping out as position and rotation both lerp into an intact glowing icosahedron.' },
        { title: 'Scroll back up', text: 'The crystal shatters back apart exactly in reverse, since every fragment lerps between two fixed start/target transforms.' },
        { title: 'Retune the look', text: 'Adjust FRAGMENTS for a coarser or finer shatter, or SHAPE_RADIUS to resize the assembled crystal.' },
        { title: 'Adjust the pacing', text: 'Change the ScrollTrigger end value (+=450%) for a slower dramatic assembly or a quicker snap-together.' },
      ],
    },
    features: [
      'Fragment targets sampled from a throwaway THREE.IcosahedronGeometry\'s face data — never added to the scene itself',
      'Both position (lerpVectors) and rotation (slerpQuaternions) interpolate per fragment for physically correct tumbling',
      'Fragments fling outward along their own target\'s radial direction, reading as a centered explosion, not random noise',
      'MeshStandardMaterial with metalness/roughness and flatShading for faceted glass-crystal shading, not flat silhouettes',
      'Three-light rig (violet point key light, cyan point rim light, soft directional fill) makes PBR shading read clearly',
      'Height-based HSL hue gradient across fragments for a cohesive violet-to-cyan finished crystal',
      'Residual per-fragment spin damps to zero as eased progress approaches 1, selling physical settle-in weight',
      'Fully reversible and pinned — scrolling up replays the shatter with zero extra code',
    ],
    useCases: [
      { icon: 'WEB', title: 'Product reveal pages', desc: 'Introduce a gemstone, watch, or premium hardware product by having it visibly assemble from fragments as the page scrolls.' },
      { icon: 'GAME', title: 'Loot and collectible showcases', desc: 'A shatter-to-assemble crystal fits RPG item reveals, trading-card sites, and NFT gallery hero sections.' },
      { icon: 'ANIM', title: 'Brand and agency intros', desc: 'A dramatic assembly sequence signals craftsmanship and precision better than a static logo animation.' },
      { icon: 'ART', title: 'Generative and geometric art', desc: 'Pair with a [galaxy formation](/ui-snippets/three-scroll-galaxy-formation/) particle intro so the page opens with dust and closes with solid form.' },
      { icon: 'LEARN', title: 'Teaching quaternion interpolation', desc: 'A concrete example of why slerpQuaternions is required over lerping Euler angles for correct rotation blending.' },
      { icon: 'DESIGN', title: 'Portfolio hero pieces', desc: 'Use the assembled crystal as a striking centerpiece, transitioning from or into a [scroll tunnel](/ui-snippets/three-scroll-tunnel/) journey.' },
    ],
    faqs: [
      { q: 'Why interpolate both position and rotation instead of just position?', a: 'A real shattered object tumbles while airborne and settles into a specific orientation once seated. If only position were lerped, every fragment would slide smoothly to its slot while still spinning at whatever random angle it started at, which breaks the illusion of a piece locking into place. Interpolating rotation via slerpQuaternions alongside position lerp means both translation and orientation resolve together.' },
      { q: 'Why use quaternion slerp instead of lerping Euler angles?', a: 'Lerping Euler angle components independently can produce gimbal lock, uneven rotation speed, and sometimes rotates the long way around instead of the shortest path. THREE.Quaternion.slerpQuaternions interpolates along the shortest arc on the rotation sphere at constant angular velocity, which is the mathematically correct way to blend between two 3D orientations.' },
      { q: 'Why sample face data from an IcosahedronGeometry instead of hand-placing fragments?', a: 'Manually authoring ninety fragment positions and orientations that plausibly cover a polyhedron\'s surface would be tedious and error-prone. Building a reference IcosahedronGeometry (never added to the scene) and reading its triangular face centers and normals gives evenly distributed, geometrically correct target transforms for free, keyed off THREE\'s own subdivision.' },
      { q: 'Why does the material need three separate lights to look right?', a: 'MeshStandardMaterial implements physically-based shading, so it only produces visible color where light actually reaches the surface — unlike MeshBasicMaterial, which ignores lighting entirely. The ambient light provides a shading floor, the violet PointLight acts as a key light for directional highlights, the cyan PointLight rims the far side so fragments do not go fully black in shadow, and the soft DirectionalLight adds an overall fill, together making the flat-shaded facets read as solid crystal.' },
      { q: 'Can I use this Three.js shatter effect in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind version. Build the fragment meshes, lights, and GSAP ScrollTrigger inside a mount effect keyed to a canvas ref, and on unmount kill the ScrollTrigger instance (or revert a gsap.context), dispose each fragment\'s geometry and material, and call renderer.dispose() so lights, geometry, and the WebGL context do not leak between route changes.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to reverse-engineer how ninety independent fragments assemble into one coherent solid on scroll. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain why slerpQuaternions is required for the rotation blend, or how sampling an IcosahedronGeometry's face data generates evenly distributed fragment targets. The same assistant can help you extend it — ask it to swap the target shape for a different polyhedron, add a shockwave ring that pulses outward at full assembly, or trigger a brief camera shake on the frame the crystal fully locks together. It can also help optimize further, for instance converting the ninety separate meshes into a single THREE.InstancedMesh so the draw call count drops to one. Treat the code as a conversation starter, not a finished artifact.`,
      prompt: `Build a "scroll-scrubbed shatter-to-assemble crystal" in plain HTML, CSS, and JavaScript using Three.js, GSAP, and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned section containing a full-size canvas, with a WebGLRenderer and PerspectiveCamera sized to it and updated on window resize including aspect ratio.
- Add an ambient light plus at least two point lights (or a point light and a directional light) with distinct colors so a MeshStandardMaterial reads with clear highlights and rim lighting instead of appearing flat black.
- Build a reference THREE.IcosahedronGeometry (or similar polyhedron) that is never added to the scene, purely to source per-face center positions and outward normal directions.
- For roughly 80-100 fragments, create a small THREE.TetrahedronGeometry mesh per fragment with MeshStandardMaterial (metalness, roughness, flatShading: true, and a color/emissive pair derived from a gradient across the fragment's position).
- For each fragment compute a target position/quaternion sitting on the reference shape's surface (oriented to face outward) and a scattered start position/quaternion (flung outward along that same radial direction to a random distance, with a fully randomized starting rotation).
- Register a GSAP tween on a ScrollTrigger targeting the pinned section, with pin: true, start at top top, a numeric scrub, and a multi-hundred-percent end, animating a single plain progress value from 0 to 1 with linear easing.
- Every animation frame (requestAnimationFrame, independent of the scroll callback), apply smoothstep easing to the scrubbed progress, then for every fragment lerp its position with Vector3.lerpVectors and slerp its rotation with Quaternion.slerpQuaternions between start and target by that eased value.
- Add a small per-fragment residual spin that is scaled by (1 - easedProgress) so tumbling fades out exactly as each piece arrives at its target.
- Slowly rotate the whole assembled group and ease the camera slightly closer once progress is high, for a satisfying final reveal.
- Confirm scrolling back up reverses the entire assembly into a shatter smoothly, since every fragment lerps/slerps between two fixed, precomputed transforms.`,
    },
  },
};

export default threeScrollShatterAssemble;
