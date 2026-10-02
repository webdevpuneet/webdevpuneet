const lottieSuccessCheckmarkLoader = {
  id: 'lottie-success-checkmark-loader',
  title: 'Lottie Success Checkmark Loader',
  lastmod: '2026-09-05',
  category: 'loaders',
  cdnUrls: ['https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js'],
  html: `<div class="lsc-card">
  <div class="lsc-stage">
    <div class="lsc-lottie" id="lscLottie"></div>
    <div class="lsc-checkmark" id="lscCheckmark">
      <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </div>
  </div>
  <div class="lsc-status" id="lscStatus">Processing…</div>
  <button class="lsc-btn" id="lscRestart" type="button">Run again</button>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.lsc-card{font-family:system-ui,-apple-system,sans-serif;background:#12141f;color:#e7e9f5;border:1px solid #262a3d;border-radius:16px;padding:32px;max-width:320px;width:100%;text-align:center}
.lsc-stage{position:relative;width:140px;height:140px;margin:0 auto 18px;display:flex;align-items:center;justify-content:center}
.lsc-lottie{width:140px;height:140px}
.lsc-checkmark{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#22c55e;border-radius:50%;width:90px;height:90px;margin:auto;opacity:0;transform:scale(.6);transition:opacity .35s ease,transform .35s cubic-bezier(.34,1.56,.64,1)}
.lsc-checkmark.lsc-show{opacity:1;transform:scale(1)}
.lsc-status{font-size:14px;font-weight:600;color:#9096b3;margin-bottom:18px;min-height:20px}
.lsc-btn{background:#181b2a;border:1px solid #262a3d;color:#e7e9f5;font-size:13px;font-weight:600;padding:9px 18px;border-radius:9px;cursor:pointer}
.lsc-btn:hover{background:#20233a}`,

  js: `// Minimal inline Lottie animation JSON — a pulsing/scaling circle used as
// the "processing" indicator before the success state takes over.
var animData = {
  v: "5.7.4", fr: 30, ip: 0, op: 60, w: 200, h: 200, nm: "pulse", ddd: 0, assets: [],
  layers: [{
    ddd: 0, ind: 1, ty: 4, nm: "circle", sr: 1,
    ks: {
      o: { a: 1, k: [
        { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [100], e: [40] },
        { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 30, s: [40], e: [100] },
        { t: 60, s: [100] }
      ] },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [100, 100, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 1, k: [
        { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [70, 70, 100], e: [100, 100, 100] },
        { i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 30, s: [100, 100, 100], e: [70, 70, 100] },
        { t: 60, s: [70, 70, 100] }
      ] }
    },
    ao: 0,
    shapes: [{
      ty: "gr",
      it: [
        { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [120, 120] } },
        { ty: "fl", c: { a: 0, k: [0.388, 0.4, 0.965, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]
    }],
    ip: 0, op: 60, st: 0, bm: 0
  }]
};

var lottieContainer = document.getElementById('lscLottie');
var checkmarkEl = document.getElementById('lscCheckmark');
var statusEl = document.getElementById('lscStatus');
var restartBtn = document.getElementById('lscRestart');
var lottieInstance = null;
var timeoutId = null;

function runSequence() {
  clearTimeout(timeoutId);
  checkmarkEl.classList.remove('lsc-show');
  lottieContainer.style.display = 'block';
  statusEl.textContent = 'Processing…';

  if (lottieInstance) {
    lottieInstance.destroy();
  }
  lottieInstance = lottie.loadAnimation({
    container: lottieContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animData,
  });

  timeoutId = setTimeout(function () {
    lottieInstance.stop();
    lottieContainer.style.display = 'none';
    checkmarkEl.classList.add('lsc-show');
    statusEl.textContent = 'Success!';
  }, 2200);
}

restartBtn.addEventListener('click', runSequence);

runSequence();`,

  seo: {
    title: 'Lottie Success Checkmark Loader — Free HTML CSS JS Snippet',
    description: `A processing-to-success loading sequence using the lottie-web library, swapping a pulsing Lottie animation for a static checkmark. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Lottie Success Checkmark Loader — Animated Processing State With Checkmark Completion',
      description: `This snippet shows the common "processing then success" loading pattern using the real \`lottie-web\` library rather than a CSS spinner. A small pulsing circle animation plays while work is simulated, then smoothly hands off to a static green checkmark.\n\n**Loading the animation**\n\nThe lottie-web UMD build is loaded from a CDN via \`cdnUrls\`, exposing a global \`lottie\` object. \`runSequence()\` calls \`lottie.loadAnimation({ container, renderer: 'svg', loop: true, autoplay: true, animationData })\` against an inline animation JSON object — no external \`.json\` file is fetched, keeping the snippet fully self-contained.\n\n**The handoff to success**\n\nAfter roughly two seconds, \`lottieInstance.stop()\` halts the Lottie player, the Lottie container is hidden, and a plain SVG checkmark inside a green circle is revealed with a spring-like CSS scale transition — a lightweight way to combine a vector animation library with a simple CSS-driven completion state.\n\n**Restartable**\n\nThe "Run again" button calls the same \`runSequence()\` function, which destroys the previous Lottie instance before creating a fresh one, so the whole processing-to-success cycle can be replayed without leaking animation instances.`,
    },
    features: [
      'Loads the real lottie-web library from a CDN via cdnUrls',
      'Inline animationData JSON object — no external .json file fetched',
      'lottie.loadAnimation() with SVG renderer, looping while "processing"',
      'Clean handoff from the Lottie animation to a static CSS checkmark',
      'Spring-style CSS scale transition on the success checkmark reveal',
      'Restart button replays the full sequence, destroying old instances first',
      'Self-contained — no image or font assets required',
      'Dark-theme card layout with a fixed-size animation stage',
    ],
    useCases: [
      { icon: '📨', title: 'Form submission feedback', desc: 'Show a pulsing Lottie animation while a request runs, then hand off to a static checkmark on success.' },
      { icon: '📤', title: 'File upload confirmation', desc: 'Play the processing sequence while a file transfers, ending on a clear completed state that does not keep animating.' },
      { icon: '✅', title: 'Onboarding completion steps', desc: 'Confirm that a setup step has finished, using inline `animationData` so no external JSON file needs to be fetched.' },
      { icon: '🎓', title: 'lottie-web integration reference', desc: 'See `lottie.loadAnimation()` with the SVG renderer looping while processing, and how stopping it cleanly makes room for the final state.' },
    ],
    faqs: [
      { q: 'Does this need an external Lottie JSON file?', a: 'No. The animationData object is defined inline in the JavaScript, so the snippet is fully self-contained aside from loading the lottie-web library itself.' },
      { q: 'How is the success state triggered?', a: 'A setTimeout simulates completed work; in a real app you would call lottieInstance.stop() and swap to the checkmark inside your actual success callback instead of a fixed delay.' },
      { q: 'Can I reuse the same animation for a failure state?', a: 'Yes — clone the pattern used for the checkmark, swapping in a red circle and an X icon, and branch the timeout callback based on your real success/failure result.' },
    ],
  },
};

export default lottieSuccessCheckmarkLoader;
