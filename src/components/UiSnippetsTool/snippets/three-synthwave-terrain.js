const threeSynthwaveTerrain = {
  id: 'three-synthwave-terrain',
  title: 'Three.js Synthwave Terrain',
  lastmod: '2026-07-19',
  category: 'animations',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
  ],
  html: `<canvas id="synthCanvas"></canvas>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%;overflow:hidden;background:#0a0014}
#synthCanvas{display:block;width:100%;height:100%}`,

  js: `const canvas = document.getElementById('synthCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a0014, 0.045);
const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
camera.position.set(0, 2.4, 5);
camera.rotation.x = -0.12;

// A glowing sun sprite made from a radial gradient painted onto a canvas
// texture — no external image asset, just 2D canvas drawing used as a
// WebGL texture, which is a common trick for soft glows and sprites.
function makeSunTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(255,214,140,1)');
  grad.addColorStop(0.5, 'rgba(255,110,167,0.8)');
  grad.addColorStop(1, 'rgba(255,110,167,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}
const sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeSunTexture(), transparent: true, depthWrite: false }));
sun.scale.set(9, 9, 1);
sun.position.set(0, 2.2, -30);
scene.add(sun);

// Two wireframe planes (one ahead, one behind, back-to-back) form an
// infinitely-scrolling grid floor. Only their shared Z-offset is animated
// every frame, and it wraps back to zero once a full tile has scrolled by
// — a classic, cheap technique for endless-looking terrain.
const SEGMENTS = 48;
const SIZE = 60;

function buildGrid() {
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS);
  geo.rotateX(-Math.PI / 2);
  const posAttr = geo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i), z = posAttr.getZ(i);
    // A rolling-hills height field from two overlapping sine waves — the
    // terrain "shape" itself, independent of the scrolling animation.
    const y = Math.sin(x * 0.25) * 0.7 + Math.cos(z * 0.2) * 0.7;
    posAttr.setY(i, y);
  }
  geo.computeVertexNormals();
  const mat = new THREE.MeshBasicMaterial({ color: 0xff3fa0, wireframe: true, transparent: true, opacity: 0.75 });
  return new THREE.Mesh(geo, mat);
}

const gridA = buildGrid();
const gridB = buildGrid();
gridB.position.z = -SIZE;
scene.add(gridA, gridB);

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const SPEED = 0.09;
function animate() {
  requestAnimationFrame(animate);

  // Both tiles scroll toward the camera together; once a tile has moved
  // one full SIZE past the camera, snapping it back by 2*SIZE puts it
  // immediately behind its partner again, with no visible seam.
  [gridA, gridB].forEach(g => {
    g.position.z += SPEED;
    if (g.position.z > SIZE) g.position.z -= SIZE * 2;
  });

  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Synthwave Terrain — Infinite Retro Wireframe Grid Landscape',
    description: 'Build a retro synthwave wireframe terrain in Three.js — an infinitely scrolling neon grid with rolling hills, fog depth, and a glowing canvas-texture sun sprite.',
    about: {
      title: 'How to Build an Infinite Synthwave Wireframe Terrain in Three.js',
      description: `The **Three.js Synthwave Terrain** snippet recreates the retro-futuristic wireframe landscape aesthetic — a glowing pink grid stretching to a foggy horizon under a gradient sun — using two seamlessly-looping wireframe planes, exponential fog, and a canvas-drawn sprite texture, all with core Three.js loaded from a CDN and zero external image assets.

**Two tiles, not one endless plane**

Rendering a genuinely infinite terrain would require regenerating geometry forever, which isn't practical. Instead, the snippet builds exactly two identical wireframe grid tiles, placed back-to-back along the Z axis. Every frame, both tiles move slightly toward the camera; the moment either tile has traveled a full tile-length past the camera, its Z position snaps backward by *two* tile-lengths — placing it immediately behind its partner again, invisible to the viewer since it happens off-screen at the far end of the fog. This two-tile relay is the standard, cheap technique behind endless-scrolling roads, rivers, and terrain in countless games and demos.

**The height field comes from the same sine-wave technique as water**

Before the scrolling animation ever starts, each grid's vertices are displaced once using \`Math.sin(x * freq) + Math.cos(z * freq)\` — the exact same overlapping-wave technique used in the [particle wave](/ui-snippets/three-particle-wave/) snippet, just applied once to build a static rolling-hills shape rather than recalculated every frame for a moving ripple. Because both tiles run through the identical height formula, their edges match up perfectly where they meet, with no visible seam or height mismatch at the boundary.

**Exponential fog does the atmospheric heavy lifting**

\`THREE.FogExp2\` fades objects toward the fog color based on an exponential falloff with distance, rather than the more clinical linear fog. This is what makes the wireframe grid's far edge dissolve smoothly into the background instead of appearing to end abruptly at a hard clipping line — and it's also doing double duty by visually hiding the exact moment each tile snaps back into position at the far end of the scene.

**A sun sprite drawn with 2D canvas, not an image file**

The glowing sun is a \`THREE.Sprite\` — a flat, camera-facing quad — textured with a \`CanvasTexture\` built from a plain 2D \`<canvas>\` radial gradient (warm center fading through pink to fully transparent). This is a genuinely useful technique beyond this one snippet: any soft glow, particle sprite, or gradient billboard in Three.js can be generated on the fly this way, entirely in JavaScript, with no image file to host or load.

**Wireframe as an aesthetic choice, not a debugging leftover**

Setting \`wireframe: true\` on a \`MeshBasicMaterial\` is often used for debugging geometry — here it's the entire point. Combined with a saturated magenta color and additive-feeling transparency, the wireframe grid reads immediately as the classic retro-computer-graphics look associated with 1980s synthwave album art and film title sequences.

**A tilted, fixed camera, not a free-look one**

The camera never moves or rotates on its own beyond a small fixed downward tilt set once at startup — the *illusion* of forward motion comes entirely from the grid tiles scrolling toward the camera, not from the camera actually traveling through space. This is a cheaper and more controllable approach than moving the camera along a path, since the terrain's motion speed is the only variable that needs adjusting.

**Where this technique extends**

The two-tile relay-scroll pattern generalizes to any endless-terrain effect — rivers, roads, star tunnels, or infinite corridors. Pair this snippet with a [starfield warp](/ui-snippets/three-starfield-warp/) for a full synthwave "drive into space" sequence, or contrast its retro wireframe aesthetic against the smooth, lit surface of the [particle wave](/ui-snippets/three-particle-wave/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the Three.js CDN', text: 'Add three.min.js from the CDN panel — no add-ons are required for this snippet.' },
        { title: 'Paste HTML, CSS, and JS', text: 'The grid terrain and glowing sun appear immediately, scrolling toward the camera endlessly.' },
        { title: 'Watch the seamless loop', text: 'Fog hides the moment each tile resets, so the scroll appears to continue forever with no visible seam.' },
        { title: 'Tune scroll speed', text: 'Adjust the SPEED constant for a slower cruise or a faster, more dramatic drive.' },
        { title: 'Retint the scene', text: 'Change the grid color, fog color, and sun gradient stops together for a different neon palette.' },
        { title: 'Resize the window', text: 'Renderer size and camera aspect ratio update automatically.' },
      ],
    },
    features: [
      'Two-tile relay scroll: an endless-looking terrain built from exactly two geometries, not infinite regeneration',
      'Sine-wave height field: the same overlapping-wave technique as a water surface, applied once as static terrain',
      'Seamless tile boundaries: both grids share one height formula so their edges align with no visible gap',
      'Exponential fog: THREE.FogExp2 dissolves the horizon smoothly and conceals each tile\'s reset moment',
      'Canvas-drawn sun sprite: a radial-gradient glow generated on the fly with 2D canvas, no image file needed',
      'Wireframe as aesthetic: a deliberate retro-computer-graphics look, not a geometry debugging leftover',
      'Fixed, tilted camera: motion illusion comes entirely from scrolling terrain, not camera movement',
      'Loaded entirely from a CDN: no npm install, bundler, or build step required',
    ],
    useCases: [
      { icon: 'WEB', title: 'Retro and synthwave-themed landing pages', desc: 'An instantly recognizable 1980s-inspired backdrop for music, gaming, or nostalgia-driven brand sites.' },
      { icon: 'ART', title: 'Music and event visuals', desc: 'Pairs naturally with synthwave, vaporwave, or retro-electronic music branding and album promotion pages.' },
      { icon: 'LEARN', title: 'Teaching seamless scroll-loop techniques', desc: 'A focused, minimal example of the two-tile relay pattern used across countless endless-runner and driving effects.' },
      { icon: 'GAME', title: 'Racing or endless-runner game menus', desc: 'A ready-made scrolling terrain backdrop for a game\'s title screen or menu before gameplay begins.' },
      { icon: 'DESIGN', title: 'Portfolio and agency showpieces', desc: 'A striking, technically interesting background that stands out from typical gradient or particle hero effects.' },
      { icon: 'ANIM', title: 'Video intro and transition sequences', desc: 'Use as a looping background video substitute for intros, loading transitions, or between-section breaks.' },
    ],
    faqs: [
      { q: 'How does the terrain scroll forever without an infinitely large geometry?', a: 'Exactly two identical wireframe grid tiles are placed back-to-back along the Z axis. Every frame both tiles move slightly toward the camera; the moment a tile has traveled a full tile-length past the camera, its position snaps backward by two tile-lengths, placing it immediately behind its partner again. Because that reset happens far away in the fog, it is never visibly noticeable.' },
      { q: 'Why do the two grid tiles line up with no visible seam?', a: 'Both tiles are built by the exact same buildGrid() function, running the identical sine-and-cosine height formula on the same geometry dimensions. Because the height at any given X/Z coordinate is always calculated the same way regardless of which tile it belongs to, the edge where two tiles meet lines up perfectly with no height mismatch.' },
      { q: 'Why use exponential fog instead of linear fog?', a: 'THREE.FogExp2 fades visibility based on an exponential falloff with distance rather than a straight linear ramp, which produces a smoother, more natural-looking dissolve into the horizon. It also conveniently hides the exact far-distance point where each tile\'s position resets, since that area is already heavily obscured by fog.' },
      { q: 'How is the glowing sun created without an image file?', a: 'A plain 2D canvas element is created in memory (never appended to the page), a radial gradient is painted onto it from a warm center color fading through pink to fully transparent, and that canvas is wrapped in a THREE.CanvasTexture applied to a Sprite material. This produces a soft, glowing image entirely through code, with no external asset to host or load.' },
      { q: 'Can I make the terrain scroll faster or slower?', a: 'Yes. The SPEED constant controls how much each tile moves toward the camera every frame — raise it for a faster, more dramatic drive-through feel, or lower it for a slow, ambient cruise.' },
      { q: 'Can I use this Three.js synthwave terrain in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind CSS utility-class version. Build the grid tiles and sun sprite inside a mount effect so the geometry and canvas texture are only created once, and call renderer.dispose() plus cancelAnimationFrame on cleanup.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to reverse-engineer the endless-scroll illusion by watching the animation alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why two tiles are needed instead of one, or how the position-reset math guarantees the tiles never visibly overlap or gap during the loop. The same assistant can help optimize it, for instance checking whether the grid segment count could be lowered for mobile devices without a noticeable quality loss, or whether the fog density could be tuned to better hide the reset point at different scroll speeds. It is also useful for extending the effect: ask it to add a second, differently-colored grid layer scrolling at a different speed for a parallax depth effect, animate the sun's vertical position to simulate a sunrise or sunset, or add scattered glowing "star" sprites in the sky using the same canvas-texture technique as the sun. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an infinite "synthwave wireframe terrain" in plain HTML, CSS, and JavaScript using Three.js loaded from a CDN (no bundler, no build step, no external image assets) — a retro, endlessly-scrolling neon grid landscape.

Requirements:
- A full-viewport canvas with a WebGLRenderer sized to match it, updated on window resize including camera aspect ratio, with a fixed camera position tilted slightly downward and never moved during the animation.
- Add exponential fog to the scene (not linear fog), matching the background color, dense enough to dissolve the far horizon smoothly.
- Create a glowing sun using a Sprite whose texture is generated at runtime from a 2D canvas element: paint a radial gradient onto that canvas (a warm center color fading through a mid-tone to fully transparent) and wrap it in a canvas-based texture, with no external image file.
- Build a wireframe terrain height field using a PlaneGeometry with a reasonable subdivision count, rotated to lie flat, with each vertex's height displaced once using a combination of sine and cosine functions of its X and Z coordinates (a static rolling-hills shape, not animated per frame).
- Create exactly two identical instances of that wireframe grid geometry, positioned back-to-back along one axis (one starting where the other ends).
- Every animation frame, move both grid tiles toward the camera along that axis by a small fixed speed value; whenever either tile's position passes a threshold equivalent to one tile-length beyond the camera, reset its position by subtracting two tile-lengths, so it reappears directly behind its partner with no visible gap or overlap.
- Render the grid with a wireframe material in a saturated, glowing color (e.g. magenta or pink) with partial transparency, and ensure both tiles use exactly the same height-field formula so their shared edge lines up seamlessly.`,
    },
  },
};

export default threeSynthwaveTerrain;
