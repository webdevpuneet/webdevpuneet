const bootstrapVideoHeroPlayOverlay = {
  id: 'bootstrap-video-hero-play-overlay',
  title: 'Bootstrap Video Hero with Play Overlay',
  lastmod: '2026-09-09',
  category: 'heroes',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<section class="bsvhero-section">
  <div class="container py-5 text-center">
    <span class="badge rounded-pill bsvhero-badge mb-3">Product tour</span>
    <h1 class="bsvhero-title">See it in action</h1>
    <p class="bsvhero-sub mb-4">A 90-second walkthrough of the whole workflow, start to finish.</p>

    <div class="bsvhero-frame mx-auto" id="bsvheroFrame">
      <div class="bsvhero-cover" id="bsvheroCover">
        <button class="bsvhero-play" id="bsvheroPlay" aria-label="Play video">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <span class="bsvhero-duration">1:32</span>
      </div>
      <div class="bsvhero-playing d-none" id="bsvheroPlaying">
        <div class="bsvhero-progress"><div class="bsvhero-progress-bar" id="bsvheroBar"></div></div>
        <span class="small">Playing demo…</span>
        <button class="btn btn-sm btn-light mt-2" id="bsvheroReset">Reset</button>
      </div>
    </div>
  </div>
</section>`,
  css: `body { margin: 0; }
.bsvhero-section { background: linear-gradient(180deg, #0f172a, #1e293b); color: #fff; }
.bsvhero-badge { background: rgba(255,255,255,.12); color: #fff; font-size: 12px; }
.bsvhero-title { font-weight: 800; letter-spacing: -0.02em; font-size: clamp(1.6rem, 1.3rem + 1.2vw, 2.4rem); }
.bsvhero-sub { color: rgba(255,255,255,.7); max-width: 460px; margin-inline: auto; }

.bsvhero-frame {
  max-width: 640px;
  aspect-ratio: 16/9;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, #334155, #1e293b);
  box-shadow: 0 30px 60px rgba(0,0,0,.4);
}

.bsvhero-cover { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.bsvhero-play {
  width: 62px; height: 62px; border-radius: 50%;
  border: none; background: #fff; color: #0f172a;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: transform .15s;
}
.bsvhero-play:hover { transform: scale(1.08); }
.bsvhero-duration { position: absolute; bottom: 12px; right: 14px; font-size: 12px; background: rgba(0,0,0,.5); padding: 2px 8px; border-radius: 6px; }

.bsvhero-playing {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
}
.bsvhero-progress { width: 70%; height: 4px; background: rgba(255,255,255,.2); border-radius: 4px; overflow: hidden; }
.bsvhero-progress-bar { height: 100%; width: 0%; background: #6366f1; transition: width .1s linear; }`,
  js: `const cover = document.getElementById('bsvheroCover');
const playing = document.getElementById('bsvheroPlaying');
const playBtn = document.getElementById('bsvheroPlay');
const resetBtn = document.getElementById('bsvheroReset');
const bar = document.getElementById('bsvheroBar');
let timer = null;

playBtn.addEventListener('click', () => {
  cover.classList.add('d-none');
  playing.classList.remove('d-none');
  let pct = 0;
  bar.style.width = '0%';
  timer = setInterval(() => {
    pct += 2;
    bar.style.width = Math.min(100, pct) + '%';
    if (pct >= 100) clearInterval(timer);
  }, 100);
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  playing.classList.add('d-none');
  cover.classList.remove('d-none');
  bar.style.width = '0%';
});`,

  seo: {
    title: 'Bootstrap Video Hero with Play Overlay — Free Snippet',
    description: 'A Bootstrap 5.3 hero section with a video-style play button overlay that reveals a progress state when clicked — no real video file required to try it.',
    about: {
      title: 'Bootstrap Video Hero with Play Overlay — HTML, CSS & JavaScript',
      description: `A product-tour hero usually centers on an embedded video, but a working demo shouldn't require shipping a real video file to be useful as a starting point. This snippet builds the **interaction shape** on real Bootstrap layout and utility classes: a dark hero, a framed thumbnail with a centered circular play button, and a click handler that swaps the static cover for a "playing" state with an animating progress bar — the exact structure you'd wire a real \`<video>\` or embedded player into.\n\nThe cover and the playing state are two separate absolutely-positioned layers inside one frame, toggled with Bootstrap's \`.d-none\` utility class — swap the progress-bar simulation for a real \`<video>\` element's \`timeupdate\` event and the rest of the show/hide logic needs no changes.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads a dark hero with a video thumbnail and a play button.' },
        { title: 'Click the play button', text: 'The cover swaps out for a "Playing demo…" state with an animating progress bar.' },
        { title: 'Let it finish or reset', text: 'The bar fills to 100% and stops, or click Reset to return to the play button.' },
        { title: 'Swap in a real video', text: 'Replace the .bsvhero-cover thumbnail background and playing-state logic with an actual <video> element and its play()/timeupdate events.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 layout, badge, and button utility classes',
      'Two-layer cover/playing structure toggled with Bootstrap\'s d-none utility class',
      'Simulated progress bar shows the interaction shape without requiring a real video file',
      'Reset control returns cleanly to the initial play-button state',
      'Dark gradient hero with a responsive, clamp()-sized headline',
      'Structure maps directly onto a real <video> element or embedded player integration',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Product tour and demo-video landing sections', desc: 'The standard "watch a 90-second demo" hero pattern, ready to wire to a real video once you have one.' },
      { icon: 'CODE',   title: 'Prototyping before the real video asset exists', desc: 'Show stakeholders the full interaction — click, play state, progress — before a final video has been recorded or edited.' },
      { icon: 'LEARN',  title: 'Learning the cover/playing toggle pattern', desc: 'A clean, minimal example of swapping two absolutely-positioned states with one utility class.' },
      { icon: 'FLOW',   title: 'Landing pages proving a product visually', desc: 'Pair with the Bootstrap Hero Section snippet\'s email capture for a two-hero landing page: value prop, then proof.' },
    ],
    faqs: [
      { q: 'Does this play a real video?', a: 'No — it simulates the play interaction with an animating progress bar so the pattern is usable without shipping a real video file. Replace the playing-state markup with a real <video> element or embed to make it functional.' },
      { q: 'How would I wire in a real video?', a: 'Replace .bsvhero-cover\'s background with your thumbnail, add a <video> element inside .bsvhero-playing, and call video.play() in the play button\'s click handler instead of starting the simulated progress interval.' },
      { q: 'Can I use a YouTube or Vimeo embed instead of a native video?', a: 'Yes — on click, replace .bsvhero-playing\'s content with an <iframe> pointing at the embed URL (with autoplay=1) instead of toggling the simulated progress bar.' },
      { q: 'Does the Reset button stop a real video too?', a: 'You would extend it to call video.pause() and reset video.currentTime = 0, or remove the iframe embed, alongside the existing cover/playing class toggle.' },
      { q: 'Is the play button accessible?', a: 'It\'s a real <button> with an aria-label, so it\'s reachable and understandable via keyboard and screen reader navigation.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to wire in a real HTML5 <video> element with its native play/pause/timeupdate events driving the progress bar instead of the simulated interval, or to add a YouTube embed variant. It's also a good exercise to ask the assistant to add a mute/unmute control and a fullscreen button once a real video is in place.`,
      prompt: `Build a Bootstrap 5.3 hero section with a video-style play overlay, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A dark hero section with a headline, subtext, and a centered video-thumbnail frame with a circular play button overlay and a duration badge.
- Clicking the play button must swap the cover state for a "playing" state (toggled with Bootstrap's d-none utility class) showing a progress indicator that visibly fills over time.
- Include a Reset control that returns the frame to its initial play-button cover state.
- Structure the cover and playing states as clearly separable layers so a real <video> element or embed could be substituted for the simulated progress bar with minimal changes.`,
    },
  },
};

export default bootstrapVideoHeroPlayOverlay;
