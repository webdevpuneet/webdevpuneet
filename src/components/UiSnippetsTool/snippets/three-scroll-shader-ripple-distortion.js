const threeScrollShaderRippleDistortion = {
  id: 'three-scroll-shader-ripple-distortion',
  title: 'Three.js Scroll Shader Ripple Distortion',
  lastmod: '2026-09-16',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="rpd-stage" id="rpdStage">
  <div class="rpd-intro-overlay"><p>Scroll ↓ to intensify the ripple</p></div>
  <canvas id="rpdCanvas"></canvas>
  <div class="rpd-hud"><span id="rpdPct">0</span>% intensity</div>
</section>
<section class="rpd-bottom"><p>A single ShaderMaterial plane, distorted entirely on the GPU.</p></section>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#04030a;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.rpd-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#b9a8d6;font-size:15px;letter-spacing:.08em;text-transform:uppercase;text-align:center;padding:0 24px}
.rpd-stage{height:100vh;position:relative;overflow:hidden;background:#04030a}
.rpd-intro-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#e9defc;font-size:15px;letter-spacing:.08em;text-transform:uppercase;text-shadow:0 2px 16px rgba(0,0,0,.6);transition:opacity .4s ease}
#rpdCanvas{display:block;width:100%;height:100%}
.rpd-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#e9d5ff;text-transform:uppercase;opacity:.85}`,
  js: `const canvas = document.getElementById('rpdCanvas');
const pctEl = document.getElementById('rpdPct');
const introEl = document.querySelector('.rpd-intro-overlay');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
// An orthographic camera framing exactly [-1, 1] on both axes, paired with
// a 2x2 plane, is the simplest way to get a true full-viewport shader
// surface -- no perspective math or plane-size-to-camera-distance work.
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const vertexShader = [
  'varying vec2 vUv;',
  'void main() {',
  '  vUv = uv;',
  '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
  '}',
].join('\\n');

const fragmentShader = [
  'precision highp float;',
  'varying vec2 vUv;',
  'uniform float uProgress;',
  'uniform float uTime;',
  'uniform vec2 uResolution;',
  '',
  'void main() {',
  '  vec2 uv = vUv;',
  '  vec2 centered = uv - 0.5;',
  '  centered.x *= uResolution.x / uResolution.y;',
  '  float dist = length(centered);',
  '  vec2 dir = centered / (dist + 0.0001);',
  '',
  '  float freq = 10.0 + uProgress * 26.0;',
  '  float amp = 0.015 + uProgress * 0.09;',
  '  float ripple = sin(dist * freq - uTime * 1.6) * amp;',
  '  vec2 distortedUv = uv + dir * ripple;',
  '',
  '  vec3 colorA = vec3(0.05, 0.02, 0.16);',
  '  vec3 colorB = vec3(0.42, 0.08, 0.55);',
  '  vec3 colorC = vec3(0.95, 0.55, 0.85);',
  '  float mixVal = clamp(distortedUv.y + ripple * 1.5, 0.0, 1.0);',
  '  vec3 color = mix(colorA, colorB, smoothstep(0.0, 0.65, mixVal));',
  '  color = mix(color, colorC, smoothstep(0.55, 1.0, mixVal));',
  '',
  '  float rings = sin(dist * freq - uTime * 1.6);',
  '  float glow = smoothstep(0.985, 1.0, abs(rings)) * uProgress * 0.6;',
  '  color += glow * vec3(1.0, 0.9, 1.0);',
  '',
  '  float vignette = smoothstep(0.95, 0.25, dist);',
  '  color *= vignette;',
  '',
  '  gl_FragColor = vec4(color, 1.0);',
  '}',
].join('\\n');

const uniforms = {
  uProgress: { value: 0 },
  uTime: { value: 0 },
  uResolution: { value: new THREE.Vector2(1, 1) },
};

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms,
});

const geometry = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gsap.registerPlugin(ScrollTrigger);
const progress = { t: 0 };
gsap.to(progress, {
  t: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: '#rpdStage',
    start: 'top top',
    end: '+=350%',
    scrub: 0.6,
    pin: true,
  },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  uniforms.uResolution.value.set(w, h);
}

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  if (introEl) introEl.style.opacity = (progress.t > 0.03) ? '0' : '1';

  uniforms.uProgress.value = progress.t;
  uniforms.uTime.value = clock.getElapsedTime();

  pctEl.textContent = Math.round(progress.t * 100);
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,
  seo: {
    title: 'Three.js Scroll Shader Ripple Distortion — GLSL ShaderMaterial Driven by Scroll',
    description: 'A full-viewport GLSL ShaderMaterial plane rippling with a sine-wave UV distortion that intensifies as you scroll, driven by a uProgress uniform and GSAP ScrollTrigger. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven GLSL Ripple Shader With Three.js',
      description: `The **Three.js Scroll Shader Ripple Distortion** snippet renders a single full-viewport plane with a custom \`THREE.ShaderMaterial\`, whose fragment shader displaces its own UV coordinates with a sine-wave ripple radiating from center — and the ripple's frequency and amplitude both grow as the visitor scrolls through a pinned section, entirely via one \`uProgress\` uniform updated from JavaScript each frame.

**An orthographic camera plus a 2×2 plane — the simplest full-viewport shader surface**

Rather than sizing a \`PlaneGeometry\` to exactly match a \`PerspectiveCamera\`'s frustum at some distance, this snippet uses an \`OrthographicCamera(-1, 1, 1, -1, 0, 1)\` paired with a plane spanning \`(-1, -1)\` to \`(1, 1)\` — the camera's view volume and the plane's extent are defined to match exactly, so the plane fills the canvas at any aspect ratio with zero perspective-projection math required.

**The vertex shader is a pure passthrough**

\`gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0)\` is the standard Three.js vertex transform, and \`vUv = uv\` hands the plane's built-in UV attribute to the fragment shader unchanged — all of the actual visual work happens in the fragment shader, which is where GLSL shader effects like this one typically live.

**Radial sine-wave UV distortion**

The fragment shader computes each pixel's distance from center (\`dist\`) and its direction (\`dir\`), then offsets the sampled UV coordinate along that direction by \`sin(dist * freq - uTime * speed) * amp\` — a textbook radial ripple. Both \`freq\` and \`amp\` are linear functions of \`uProgress\`, so scrolling further into the pinned section makes the ripple both faster (higher frequency) and more pronounced (higher amplitude).

**A three-color gradient in place of a texture**

Instead of sampling a loaded image texture, the shader mixes between three hardcoded colors based on the *distorted* UV's y-coordinate, using two \`smoothstep(...)\` calls chained together for a soft three-stop gradient — the ripple visibly warps the gradient bands themselves, since the color lookup uses \`distortedUv\`, not the original \`vUv\`.

**Ring highlights and vignette, computed, not textured**

A second use of the same \`sin()\` ripple value drives a thin glowing ring highlight via \`smoothstep(0.985, 1.0, abs(rings))\`, and a radial \`smoothstep\` vignette darkens the plane's edges — both are pure math on \`dist\`, adding polish with no additional texture lookups.

**One uniform, updated once per frame**

\`material.uniforms.uProgress.value = progress.t\` is set inside the \`requestAnimationFrame\` loop, reading a plain object kept in sync by a scrubbed GSAP tween — the render loop and the scroll-driven tween are decoupled, exactly like the particle system in [Three.js Scroll Galaxy Formation](/ui-snippets/three-scroll-galaxy-formation/), just applied to a shader uniform instead of a geometry attribute.

**Customizing it**

Swap the three hardcoded colors for your brand palette, change \`freq\`/\`amp\`'s multipliers for a subtler or wilder ripple, or replace the fragment shader's gradient mix with a \`texture2D\` sample of a loaded image for a distorted-photo effect instead of an abstract gradient. Pair it with [Three.js Scroll Shader Fluid Gradient Wave](/ui-snippets/three-scroll-shader-fluid-gradient-wave/) for a related uniform-driven GLSL technique.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load all three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js from the CDN panel, in that order.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A rippling full-viewport gradient plane renders inside a pinned stage with a live "% intensity" read-out.' },
        { title: 'Scroll down', text: 'The ripple’s frequency and amplitude both grow as uProgress climbs from 0 to 1.' },
        { title: 'Scroll back up', text: 'The ripple calms back to its subtle resting state exactly in reverse.' },
        { title: 'Retune the ripple', text: 'Change the freq and amp multipliers in the fragment shader for a gentler or wilder distortion.' },
        { title: 'Swap in a texture', text: 'Replace the gradient mix with a texture2D sample of a loaded image for a distorted-photo variant.' },
      ],
    },
    features: [
      'Full-viewport plane rendered with an OrthographicCamera for pixel-perfect coverage at any aspect ratio',
      'Real, compiling GLSL ShaderMaterial — a passthrough vertex shader and a distortion fragment shader',
      'Radial sine-wave UV distortion whose frequency and amplitude both scale with a single uProgress uniform',
      'Three-color gradient mixed via chained smoothstep() calls, no image texture required',
      'Ring highlight and vignette computed purely from distance-from-center math',
      'GSAP ScrollTrigger scrub drives uProgress; a separate clock drives uTime for continuous motion',
      'No per-frame CPU geometry work — all distortion happens on the GPU inside the fragment shader',
      'Fully reversible — scrolling up smoothly relaxes the ripple back to its resting amplitude',
    ],
    useCases: [
      { icon: 'ART', title: 'Generative art and shader portfolios', desc: 'Showcase real GLSL work with an effect that visibly demonstrates uniform-driven distortion.' },
      { icon: 'ANIM', title: 'Music and album launch pages', desc: 'An abstract rippling gradient suits ambient, electronic, or experimental releases.' },
      { icon: 'DESIGN', title: 'Agency or studio hero sections', desc: 'A distinctive GPU-driven backdrop that signals technical craft before any copy is read.' },
      { icon: 'LEARN', title: 'Teaching uniform-driven shader animation', desc: 'A compact, real example of updating a single float uniform per frame instead of animating geometry.' },
      { icon: 'GAME', title: 'Game or interactive-experience landing pages', desc: 'Pair with [Three.js Scroll Shader Fluid Gradient Wave](/ui-snippets/three-scroll-shader-fluid-gradient-wave/) for a two-part shader showcase.' },
      { icon: 'CODE', title: 'Related: Scroll Canvas Particle Text Formation', desc: 'See [Scroll Canvas Particle Text Formation](/ui-snippets/scroll-canvas-particle-text-formation/) for a Canvas2D scroll-driven alternative worth comparing against this WebGL shader.' },
    ],
    faqs: [
      { q: 'Why use an OrthographicCamera instead of a PerspectiveCamera for a full-viewport shader?', a: 'An OrthographicCamera(-1, 1, 1, -1, 0, 1) paired with a 2x2 plane makes the plane’s edges align exactly with the camera’s view volume at any aspect ratio, with no perspective-projection or distance-based sizing math needed. A PerspectiveCamera would require computing the exact plane size that fills the frustum at a chosen z-distance.' },
      { q: 'What does the uProgress uniform actually control?', a: 'uProgress is a single float, updated every animation frame from a value kept in sync with a scrubbed GSAP ScrollTrigger tween. The fragment shader multiplies it into both the ripple’s frequency and its amplitude, so scrolling further into the pinned section makes the ripple visibly faster and more pronounced.' },
      { q: 'Why does the shader distort the UV before sampling color instead of distorting a loaded texture directly?', a: 'Because there is no image texture in this snippet — color comes from a procedural three-stop gradient mixed by smoothstep(). Distorting the UV coordinate before computing that gradient mix makes the gradient bands themselves visibly ripple; the same distorted-UV technique applies unchanged if you swap the gradient mix for a texture2D() sample.' },
      { q: 'Why is there a separate uTime uniform alongside uProgress?', a: 'uProgress is scroll-bound and only changes as the user scrolls (it can pause completely if scrolling stops), while uTime advances continuously from a THREE.Clock every frame regardless of scroll. The ripple’s phase depends on uTime so the surface keeps rippling even while the user holds still, while its intensity depends on uProgress so the ripple’s strength is still tied to scroll position.' },
      { q: 'Can I use this Three.js shader ripple in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind version. Build the renderer, shader material, and GSAP ScrollTrigger inside a mount effect keyed to a canvas ref, and on unmount kill the ScrollTrigger instance, dispose the geometry and material, and call renderer.dispose().' },
    ],
    aiPrompt: {
      paragraph: `You do not need to derive the radial distortion math or the uniform-driven scroll wiring from scratch. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain exactly how the sin(dist * freq - uTime * speed) term produces a radially expanding ripple, and why the color gradient is sampled using the distorted UV rather than the original one. The same assistant can help you extend it — ask it to swap the procedural gradient for a texture2D sample of a loaded image, add a second, slower ripple layer for a more complex interference pattern, or expose the ripple's base color and speed as easily tunable uniforms. Treat the code as a conversation starter, not a finished artifact.`,
      prompt: `Build a "scroll-driven GLSL ripple distortion" in plain HTML, CSS, and JavaScript using Three.js with a custom ShaderMaterial, plus GSAP and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned section containing a full-size canvas, rendered with an OrthographicCamera set to view exactly [-1, 1] on both axes, and a single PlaneGeometry(2, 2) mesh using a custom THREE.ShaderMaterial, so the plane fills the viewport at any aspect ratio.
- A vertex shader that is a standard passthrough: pass the built-in uv attribute to a varying vUv, and set gl_Position using projectionMatrix * modelViewMatrix * vec4(position, 1.0).
- A fragment shader that computes each pixel's distance and direction from the UV center, then offsets the sampled UV coordinate along that direction using a sine wave of distance and time (uTime), producing a radial ripple distortion.
- Two uniforms driving the ripple: a uProgress float uniform (updated every frame from a value kept in sync with scroll position) that scales both the ripple's frequency and amplitude, and a uTime float uniform (updated every frame from an elapsed-time clock, independent of scroll) that drives the ripple's continuous phase.
- Render a smooth multi-color gradient (mixing at least two or three colors via smoothstep or mix()) sampled using the distorted UV coordinate rather than the original one, so the gradient bands themselves visibly ripple.
- Register a GSAP tween on a ScrollTrigger targeting the pinned section, with pin: true, start at top top, a numeric scrub, and a multi-hundred-percent end, animating a single plain progress value from 0 to 1 with linear easing, and write that value into the uProgress uniform every animation frame.
- Confirm scrolling back up smoothly relaxes the ripple's frequency and amplitude back toward their resting values.`,
    },
  },
};

export default threeScrollShaderRippleDistortion;
