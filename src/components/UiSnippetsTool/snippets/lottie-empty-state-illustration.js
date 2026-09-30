const lottieEmptyStateIllustration = {
  id: 'lottie-empty-state-illustration',
  title: 'Lottie Empty State Illustration',
  lastmod: '2026-09-05',
  category: 'cards',
  cdnUrls: ['https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js'],
  html: `<div class="lei-card">
  <div class="lei-lottie" id="leiLottie"></div>
  <h3 class="lei-title">No items yet</h3>
  <p class="lei-desc">Items you create will show up here. Get started by adding your first one.</p>
  <button class="lei-btn" id="leiCreateBtn" type="button">Create your first item</button>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.lei-card{font-family:system-ui,-apple-system,sans-serif;background:#12141f;color:#e7e9f5;border:1px solid #262a3d;border-radius:16px;padding:36px 30px;max-width:340px;width:100%;text-align:center}
.lei-lottie{width:110px;height:110px;margin:0 auto 12px}
.lei-title{font-size:17px;margin:0 0 8px;font-weight:700}
.lei-desc{font-size:13px;color:#9096b3;line-height:1.5;margin:0 0 22px}
.lei-btn{background:#6366f1;border:none;color:#fff;font-size:13.5px;font-weight:700;padding:11px 20px;border-radius:9px;cursor:pointer}
.lei-btn:hover{background:#4f52e0}
.lei-toast{margin-top:14px;font-size:12px;color:#4ade80;font-weight:600;min-height:16px}`,

  js: `// Same minimal Lottie animation JSON as the loader snippets — here used
// purely as a small looping decorative illustration above the empty-state copy.
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
        { ty: "fl", c: { a: 0, k: [0.545, 0.361, 0.965, 1] }, o: { a: 0, k: 100 } },
        { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
      ]
    }],
    ip: 0, op: 60, st: 0, bm: 0
  }]
};

var lottieContainer = document.getElementById('leiLottie');
lottie.loadAnimation({
  container: lottieContainer,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: animData,
});

document.getElementById('leiCreateBtn').addEventListener('click', function () {
  var btn = this;
  var original = btn.textContent;
  btn.textContent = 'Opening editor…';
  btn.disabled = true;
  setTimeout(function () {
    btn.textContent = original;
    btn.disabled = false;
  }, 1400);
});`,

  seo: {
    title: 'Lottie Empty State Illustration — Free HTML CSS JS Snippet',
    description: `An empty-state card with a looping Lottie illustration, headline, description, and call-to-action button. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Lottie Empty State Illustration — Animated Card for Zero-Content Screens',
      description: `Empty states are the first thing a new user or an emptied-out list shows, and a static icon often feels flat. This snippet replaces it with a small looping animation from the real \`lottie-web\` library, paired with a clear headline, supporting copy, and a call-to-action button.\n\n**The Lottie illustration**\n\nThe lottie-web UMD script is loaded from a CDN via \`cdnUrls\`, and on load the snippet immediately calls \`lottie.loadAnimation({ container, renderer: 'svg', loop: true, autoplay: true, animationData })\` against an inline animation JSON object, so the pulsing circle plays continuously as a lightweight decorative accent above the text — no external \`.json\` asset needed.\n\n**Copy and call to action**\n\nBelow the animation, a bold headline ("No items yet") and a one-sentence explanation set expectations, followed by a primary button whose label makes the very next action unambiguous. The button includes a brief disabled "Opening editor…" state on click to simulate a real navigation transition.\n\n**Reusing the pattern**\n\nSwap the headline, description, and button label for any zero-content screen — empty inbox, empty search results, empty dashboard — and reuse the same Lottie loading code with a different \`animationData\` object for a different decorative motion.`,
    },
    features: [
      'Loads the real lottie-web library from a CDN via cdnUrls',
      'Inline animationData JSON object — no external .json file fetched',
      'Looping SVG-rendered Lottie illustration as a decorative accent',
      'Clear empty-state headline and one-sentence supporting copy',
      'Primary call-to-action button with a brief loading feedback state',
      'Self-contained — no image or font assets required',
      'Compact card layout suitable for dropping into any list or dashboard',
      'Dark-theme styling consistent with the rest of the snippet library',
    ],
    useCases: [
      { icon: 'APP', title: 'Empty list and dashboard states', desc: 'Show this card when a table, board, or feed has no items yet.' },
      { icon: 'CODE', title: 'New workspace onboarding', desc: 'Welcome users into an empty project space with a clear first action.' },
      { icon: 'DESIGN', title: 'Search with no results', desc: 'Swap the copy to explain a search returned nothing and suggest next steps.' },
      { icon: 'LEARN', title: 'lottie-web integration example', desc: 'Demonstrates loading a small looping Lottie animation in vanilla JS.' },
    ],
    faqs: [
      { q: 'Does this fetch an external animation file?', a: 'No. The animationData object is embedded directly in the JavaScript, so aside from loading the lottie-web library, no additional network request is made for the animation itself.' },
      { q: 'Can I use a different Lottie animation?', a: 'Yes — export any animation from After Effects with the Bodymovin/Lottie plugin as JSON and pass it as the animationData object in place of the inline example.' },
      { q: 'Why use Lottie instead of a static SVG icon?', a: 'A subtle looping animation draws the eye and signals that the empty area is intentional rather than broken, which a static icon cannot convey as effectively.' },
    ],
  },
};

export default lottieEmptyStateIllustration;
