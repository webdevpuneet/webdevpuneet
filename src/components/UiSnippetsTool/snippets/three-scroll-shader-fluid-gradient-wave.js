const threeScrollShaderFluidGradientWave = {
  id: 'three-scroll-shader-fluid-gradient-wave',
  title: 'Three.js Scroll Shader Fluid Gradient Wave',
  lastmod: '2026-09-16',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="fgw-stage" id="fgwStage">
  <div class="fgw-intro-overlay"><p>Scroll ↓ to stir the gradient</p></div>
  <canvas id="fgwCanvas"></canvas>
  <div class="fgw-hud"><span id="fgwPct">0</span>% amplitude</div>
</section>
<section class="fgw-bottom"><p>A single ShaderMaterial plane, waving entirely on the GPU.</p></section>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#040308;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.fgw-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#a8b3d6;font-size:15px;letter-spacing:.08em;text-transform:uppercase;text-align:center;padding:0 24px}
.fgw-stage{height:100vh;position:relative;overflow:hidden;background:#040308}
.fgw-intro-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#eef0ff;font-size:15px;letter-spacing:.08em;text-transform:uppercase;text-shadow:0 2px 16px rgba(0,0,0,.6);transition:opacity .4s ease}
#fgwCanvas{display:block;width:100%;height:100%}
.fgw-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#c7d2ff;text-transform:uppercase;opacity:.85}`,
  js: `const canvas = document.getElementById('fgwCanvas');
const pctEl = document.getElementById('fgwPct');
const introEl = document.querySelector('.fgw-intro-overlay');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
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
  '',
  'void main() {',
  '  vec2 uv = vUv;',
  '',
  '  float speed = 0.35 + uProgress * 0.9;',
  '  float amp = 0.06 + uProgress * 0.16;',
  '',
  '  float wave1 = sin(uv.x * 6.0 + uTime * speed) * amp;',
  '  float wave2 = sin((uv.x * 3.0 - uv.y * 2.0) * 4.0 + uTime * speed * 1.4) * amp * 0.6;',
  '  float wave3 = cos(uv.y * 5.0 - uTime * speed * 0.7) * amp * 0.4;',
  '',
  '  float band = uv.y + wave1 + wave2 + wave3;',
  '',
  '  vec3 colorA = vec3(0.04, 0.07, 0.20);',
  '  vec3 colorB = vec3(0.10, 0.45, 0.62);',
  '  vec3 colorC = vec3(0.85, 0.42, 0.66);',
  '',
  '  float hueShift = uProgress * 0.35;',
  '  vec3 shiftedB = mix(colorB, vec3(0.55, 0.22, 0.78), hueShift);',
  '  vec3 shiftedC = mix(colorC, vec3(0.98, 0.75, 0.35), hueShift);',
  '',
  '  vec3 color = mix(colorA, shiftedB, smoothstep(0.15, 0.55, band));',
  '  color = mix(color, shiftedC, smoothstep(0.55, 0.95, band));',
  '',
  '  float sheen = smoothstep(0.48, 0.5, band) * (1.0 - smoothstep(0.5, 0.52, band));',
  '  color += sheen * 0.5;',
  '',
  '  gl_FragColor = vec4(color, 1.0);',
  '}',
].join('\\n');

const uniforms = {
  uProgress: { value: 0 },
  uTime: { value: 0 },
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
    trigger: '#fgwStage',
    start: 'top top',
    end: '+=350%',
    scrub: 0.6,
    pin: true,
  },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
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
    title: 'Three.js Scroll Shader Fluid Gradient Wave — GLSL ShaderMaterial Driven by Scroll',
    description: 'A full-viewport GLSL ShaderMaterial plane rendering an animated fluid gradient wave whose amplitude, speed, and color mix all shift as you scroll, driven by a uProgress uniform and GSAP ScrollTrigger. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Fluid Gradient Wave Shader With Three.js',
      description: `The **Three.js Scroll Shader Fluid Gradient Wave** snippet renders a single full-viewport plane with a custom \`THREE.ShaderMaterial\` whose fragment shader combines several sine and cosine waves into a smoothly undulating color band, then mixes three colors across that band — and as the visitor scrolls through a pinned section, both the wave's amplitude/speed and the gradient's color mix shift together, driven entirely by a \`uProgress\` uniform.

**Layered waves, not one sine function**

The shader sums three separate wave terms — \`wave1\` (a fast horizontal sine), \`wave2\` (a diagonal sine combining both UV axes), and \`wave3\` (a slower vertical cosine) — each with its own frequency and phase speed, into a single \`band\` value derived from \`uv.y\` plus all three waves. Layering multiple simple waves like this is what keeps the result reading as organically fluid rather than as one obviously periodic ripple — the same layering principle used in [Scroll Canvas Generative Flow Field](/ui-snippets/scroll-canvas-generative-flow-field/)'s procedural vector field, applied here inside a fragment shader instead of a Canvas2D loop.

**A three-color gradient mixed by band position**

Two chained \`mix()\`/\`smoothstep()\` pairs blend from a deep base color through a mid tone into a bright accent color, based on where \`band\` falls — since \`band\` already has the wave terms baked in, the color transitions themselves visibly ripple and shift, rather than sitting on top of a static gradient.

**One uniform driving three things at once**

\`uProgress\` simultaneously scales \`speed\` (how fast the waves animate), \`amp\` (how pronounced the waves are), and \`hueShift\` (how far the mid and accent colors drift toward a secondary palette via their own \`mix()\` calls) — so scrolling further doesn't just speed up the waves, it also intensifies them and shifts the whole gradient's mood, all from one float written into the material each frame.

**A thin sheen highlight for extra polish**

A narrow \`smoothstep\` band around \`band == 0.5\` adds a subtle bright sheen line that rides along with the wave crest, a cheap way to suggest a glossy, liquid-like surface without any lighting model or normal calculation.

**uTime versus uProgress**

Exactly as in [Three.js Scroll Shader Ripple Distortion](/ui-snippets/three-scroll-shader-ripple-distortion/), \`uTime\` advances continuously from a \`THREE.Clock\` so the surface never fully stops moving, while \`uProgress\` is scroll-bound and controls only the wave's intensity and speed multiplier — two uniforms with two distinct jobs.

**Customizing it**

Swap the three base colors for your own palette, add a fourth wave term at yet another frequency for more visual complexity, or change \`hueShift\`'s target colors for a completely different mood shift as the user scrolls. Pair it with [Three.js Scroll Shader Ripple Distortion](/ui-snippets/three-scroll-shader-ripple-distortion/) for a related uniform-driven GLSL technique using radial rather than banded waves.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load all three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js from the CDN panel, in that order.' },
        { title: 'Paste HTML, CSS, and JS', text: 'An undulating full-viewport gradient plane renders inside a pinned stage with a live "% amplitude" read-out.' },
        { title: 'Scroll down', text: 'The waves grow faster and more pronounced, and the gradient shifts toward a secondary color palette.' },
        { title: 'Scroll back up', text: 'The waves calm and the color mix reverts to its resting palette exactly in reverse.' },
        { title: 'Retune the waves', text: 'Adjust each wave term’s frequency and phase-speed multiplier in the fragment shader for a different rhythm.' },
        { title: 'Swap the palette', text: 'Change colorA/colorB/colorC (and their hueShift targets) for a completely different mood.' },
      ],
    },
    features: [
      'Full-viewport plane rendered with an OrthographicCamera for pixel-perfect coverage at any aspect ratio',
      'Real, compiling GLSL ShaderMaterial — a passthrough vertex shader and a wave/gradient fragment shader',
      'Three layered sine/cosine wave terms combined into one organically fluid band value',
      'Three-color gradient mixed via chained smoothstep()/mix() calls, no image texture required',
      'A single uProgress uniform drives wave speed, amplitude, and color-mix hue shift together',
      'Independent uTime uniform keeps the surface animating continuously, decoupled from scroll',
      'Thin computed sheen highlight along the wave crest for a glossy, liquid-like polish',
      'Fully reversible — scrolling up calms the waves and reverts the palette to its resting state',
    ],
    useCases: [
      { icon: 'ART', title: 'Generative art and shader portfolios', desc: 'Showcase real GLSL work with an effect that visibly demonstrates uniform-driven wave and color animation.' },
      { icon: 'DESIGN', title: 'Agency, studio, or SaaS hero sections', desc: 'A calm, premium animated gradient backdrop that intensifies as the visitor engages by scrolling.' },
      { icon: 'ANIM', title: 'Music and wellness/meditation app launches', desc: 'A flowing, liquid gradient suits ambient, calming, or audio-visual brand contexts.' },
      { icon: 'LEARN', title: 'Teaching multi-wave shader composition', desc: 'A compact, real example of layering several sine/cosine terms into one organic-feeling band value.' },
      { icon: 'GAME', title: 'Interactive experience or game landing pages', desc: 'Pair with [Three.js Scroll Shader Ripple Distortion](/ui-snippets/three-scroll-shader-ripple-distortion/) for a two-part shader showcase.' },
      { icon: 'CODE', title: 'Related: Scroll Canvas Generative Flow Field', desc: 'See [Scroll Canvas Generative Flow Field](/ui-snippets/scroll-canvas-generative-flow-field/) for a related layered-wave technique built in Canvas2D instead of GLSL.' },
    ],
    faqs: [
      { q: 'Why does the shader combine three separate wave terms instead of one sine function?', a: 'A single sine wave reads as an obviously mechanical, uniform ripple. Summing three terms at different frequencies, axis combinations, and phase speeds (wave1, wave2, wave3) into one band value produces a result that looks organically fluid, since no single periodic pattern dominates the visible motion.' },
      { q: 'What does the uProgress uniform control here?', a: 'uProgress is a single float updated every animation frame from a value kept in sync with a scrubbed GSAP ScrollTrigger tween. It scales the waves’ speed and amplitude, and also drives a hueShift value used to blend the gradient’s mid and accent colors toward a secondary palette — so scrolling further makes the surface simultaneously wavier, faster, and more vividly colored.' },
      { q: 'Why is there a separate uTime uniform alongside uProgress?', a: 'uTime advances continuously from a THREE.Clock every frame regardless of scroll position, keeping the wave phase animating even if the user stops scrolling. uProgress only reflects scroll position and controls intensity/speed multipliers, not the base animation phase — the two uniforms serve distinct roles.' },
      { q: 'How is the sheen highlight along the wave crest computed?', a: 'A narrow smoothstep window centered on band == 0.5 (using two chained smoothstep calls to build a thin band rather than a hard edge) adds a small amount of extra brightness only where the band value passes through that midpoint, producing a bright line that rides along the wave crest with no lighting model or normal-vector calculation needed.' },
      { q: 'Can I use this Three.js gradient wave shader in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind version. Build the renderer, shader material, and GSAP ScrollTrigger inside a mount effect keyed to a canvas ref, and on unmount kill the ScrollTrigger instance, dispose the geometry and material, and call renderer.dispose().' },
    ],
    aiPrompt: {
      paragraph: `You do not need to derive multi-wave shader composition or uniform-driven color shifting from scratch. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain exactly why layering three differently-tuned sine/cosine terms into one band value produces an organically fluid look instead of a single mechanical ripple, and how the same uProgress uniform manages to control wave amplitude, wave speed, and gradient color mix simultaneously. The same assistant can help you extend it — ask it to add a fourth wave term for even more complexity, expose the base palette as easily swappable uniforms, or add a subtle grain/noise overlay for a more textured, less flat-shaded look. Treat the code as a conversation starter, not a finished artifact.`,
      prompt: `Build a "scroll-driven fluid gradient wave" in plain HTML, CSS, and JavaScript using Three.js with a custom ShaderMaterial, plus GSAP and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned section containing a full-size canvas, rendered with an OrthographicCamera set to view exactly [-1, 1] on both axes, and a single PlaneGeometry(2, 2) mesh using a custom THREE.ShaderMaterial, so the plane fills the viewport at any aspect ratio.
- A vertex shader that is a standard passthrough: pass the built-in uv attribute to a varying vUv, and set gl_Position using projectionMatrix * modelViewMatrix * vec4(position, 1.0).
- A fragment shader that sums at least three separate wave terms (a mix of sin() and cos(), varying frequency, axis combination, and phase speed) into one combined "band" value derived from the UV coordinate, producing a result that looks organically fluid rather than a single obvious periodic ripple.
- Two uniforms driving the animation: a uProgress float uniform (updated every frame from a value kept in sync with scroll position) that scales the waves' amplitude and speed together, and a uTime float uniform (updated every frame from an elapsed-time clock, independent of scroll) that drives the waves' continuous phase so the surface never fully stops moving.
- Render a smooth gradient of at least three colors mixed based on the combined band value using chained smoothstep()/mix() calls, and blend the gradient's mid and accent colors toward a secondary palette as uProgress increases, so scrolling further shifts both the wave's motion and the gradient's overall color mood.
- Add a thin, subtly brighter sheen highlight computed with smoothstep around one specific band value, to suggest a glossy liquid surface with no actual lighting model.
- Register a GSAP tween on a ScrollTrigger targeting the pinned section, with pin: true, start at top top, a numeric scrub, and a multi-hundred-percent end, animating a single plain progress value from 0 to 1 with linear easing, and write that value into the uProgress uniform every animation frame.
- Confirm scrolling back up smoothly calms the waves and reverts the gradient toward its resting color mix.`,
    },
  },
};

export default threeScrollShaderFluidGradientWave;
