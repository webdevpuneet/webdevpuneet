const howlerAudioPlayerVisualizer = {
  id: 'howler-audio-player-visualizer',
  title: 'Howler Audio Player + Visualizer',
  lastmod: '2026-08-21',
  category: 'media',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js',
  ],
  html: `<div class="hp-card">
  <div class="hp-art">
    <canvas id="hpViz" class="hp-viz" width="240" height="80"></canvas>
  </div>
  <div class="hp-meta">
    <h3 class="hp-title">Late Night Drive</h3>
    <p class="hp-sub">Ambient Loop · Demo Track</p>
  </div>
  <div class="hp-controls">
    <button class="hp-play" id="hpPlay" aria-label="Play">▶</button>
    <input class="hp-seek" id="hpSeek" type="range" min="0" max="100" value="0" />
    <span class="hp-time" id="hpTime">0:00</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0f16;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center}
.hp-card{width:300px;border-radius:20px;background:linear-gradient(165deg,#161c2e,#0f1220);border:1px solid #232a3d;padding:20px;display:flex;flex-direction:column;gap:16px;box-shadow:0 20px 50px rgba(0,0,0,.4)}
.hp-art{border-radius:14px;overflow:hidden;background:linear-gradient(135deg,#1e2a4a,#12162a);display:flex;align-items:center;justify-content:center}
.hp-viz{width:100%;height:80px;display:block}
.hp-meta{display:flex;flex-direction:column;gap:2px}
.hp-title{font-size:16px;font-weight:700}
.hp-sub{font-size:12px;color:#7d84a6}
.hp-controls{display:flex;align-items:center;gap:10px}
.hp-play{width:36px;height:36px;border-radius:50%;border:none;background:#22d3ee;color:#0c0f16;font-size:14px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}
.hp-play:active{transform:scale(.95)}
.hp-seek{flex:1;accent-color:#22d3ee}
.hp-time{font-size:11px;color:#7d84a6;width:34px;text-align:right;flex-shrink:0}`,

  js: `// Production note: swap src below for your own hosted audio file. This
// sample is a short, freely licensed public-domain tone loop; if it ever
// fails to load, Howler's own 'loaderror' still lets the player and
// visualizer run in a paused, ready state rather than throwing.
const howl = new Howl({
  src: ['https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e70c5b93.mp3'],
  html5: true,
  loop: true,
});

const playBtn = document.getElementById('hpPlay');
const seek = document.getElementById('hpSeek');
const timeEl = document.getElementById('hpTime');
const canvas = document.getElementById('hpViz');
const ctx = canvas.getContext('2d');

let seeking = false;
let loadFailed = false;
howl.on('loaderror', () => { loadFailed = true; });

playBtn.addEventListener('click', () => {
  if (loadFailed) {
    // No real audio decoded — still flip the visual play state so the
    // visualizer demo runs, matching the "never blank" fallback pattern.
    howl._demoPlaying = !howl._demoPlaying;
    playBtn.textContent = howl._demoPlaying ? '❚❚' : '▶';
    return;
  }
  if (howl.playing()) {
    howl.pause();
    playBtn.textContent = '▶';
  } else {
    howl.play();
    playBtn.textContent = '❚❚';
  }
});

seek.addEventListener('input', () => {
  seeking = true;
  if (!loadFailed && howl.duration()) {
    const pos = (seek.value / 100) * howl.duration();
    timeEl.textContent = formatTime(pos);
  }
});
seek.addEventListener('change', () => {
  if (!loadFailed && howl.duration()) {
    howl.seek((seek.value / 100) * howl.duration());
  }
  seeking = false;
});

function formatTime(sec) {
  sec = Math.max(0, Math.floor(sec || 0));
  const m = Math.floor(sec / 60);
  const s = String(sec % 60).padStart(2, '0');
  return \`\${m}:\${s}\`;
}

// --- Visualizer -----------------------------------------------------------
// Howler doesn't expose raw frequency data by default, so this simulates bar
// heights with a sine-wave pattern driven by Howler's own play state
// (howl.playing() or the demo flag above). Production path: create a Web
// Audio AnalyserNode from howl._sounds[0]._node and read real FFT data with
// analyser.getByteFrequencyData() instead of the sine simulation below.
const BARS = 32;
let t = 0;

function draw() {
  requestAnimationFrame(draw);
  const isPlaying = loadFailed ? !!howl._demoPlaying : howl.playing();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = canvas.width / BARS;
  for (let i = 0; i < BARS; i++) {
    const base = isPlaying
      ? 8 + Math.abs(Math.sin(t * 0.12 + i * 0.5)) * 55 + Math.random() * 10
      : 4;
    ctx.fillStyle = isPlaying ? \`hsl(\${185 + i * 3}, 85%, 60%)\` : '#242c42';
    const h = base;
    ctx.fillRect(i * barWidth + 1, canvas.height - h, barWidth - 2, h);
  }

  if (isPlaying) t += 1;

  if (!seeking && !loadFailed && howl.playing() && howl.duration()) {
    seek.value = String((howl.seek() / howl.duration()) * 100);
    timeEl.textContent = formatTime(howl.seek());
  }
}
draw();`,

  seo: {
    title: 'Howler Audio Player + Visualizer — Free JS Audio Card Snippet',
    description: `A compact audio player card with play/pause/seek powered by Howler.js, plus a canvas bar visualizer driven by playback state. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Howler Audio Player + Visualizer — Play/Seek Controls With a Simulated Bar Graph',
      description: `[Howler.js](https://howlerjs.com) wraps the Web Audio API (falling back to HTML5 audio automatically) behind a small, consistent API — \`new Howl({ src, loop })\`, \`.play()\`, \`.pause()\`, \`.seek()\`, \`.playing()\`, \`.duration()\` — so a play/pause/seek card doesn't need to hand-manage an \`<audio>\` element's quirks across browsers. This snippet pairs that real Howler-driven transport with a canvas bar visualizer, and is explicit about a limitation worth understanding: Howler doesn't expose raw frequency data out of the box, so the bars here are a convincing simulation driven by \`howl.playing()\`, not a true FFT analysis.

**Real Howler transport controls**

The play button toggles between \`howl.play()\`/\`howl.pause()\` and checks \`howl.playing()\` to decide which; the range input calls \`howl.seek()\` on \`change\` and reads \`howl.seek()\`/\`howl.duration()\` on every animation frame to keep the scrubber and time label in sync while playing. All of that is exactly how you'd wire Howler in production — nothing about the transport is simulated.

**Why the visualizer is simulated, and how to make it real**

Howler doesn't ship a frequency analyser; getting real bars requires reaching into the Web Audio graph yourself — creating an \`AnalyserNode\`, connecting the \`Howl\` instance's underlying audio node to it (\`howl._sounds[0]._node\`, an internal but commonly-used escape hatch), and reading \`analyser.getByteFrequencyData()\` each frame. Since this snippet ships without a guaranteed-available audio source (a hosted sample URL can go stale), the visualizer instead draws bars whose height follows a sine wave plus jitter, gated entirely by \`howl.playing()\` (or a demo flag if the audio fails to load) — visually convincing, honestly labeled in the comments as a stand-in, and never dependent on the audio actually decoding.

**Never a blank or broken card**

\`howl.on('loaderror', ...)\` sets a flag that keeps the play button and visualizer fully functional even if the sample URL is unreachable — clicking still toggles a demo playing state and animates the bars, so the card never looks broken even when the network does something unexpected. This is the same never-blank principle used for [Rive interactive icon](/ui-snippets/rive-interactive-icon/)'s fallback SVG.

**Where this fits**

For a genuine waveform rendered from decoded audio data rather than a live bar visualizer, see [audio waveform visualizer](/ui-snippets/audio-waveform-visualizer/); for a full player layout, see [music player](/ui-snippets/music-player/) or [podcast player](/ui-snippets/podcast-player/); for recording rather than playback, see [voice memo recorder](/ui-snippets/voice-memo-recorder/).

**Customizing it**

Swap the \`src\` array for your own hosted file, and if you need a real spectrum instead of the sine simulation, add the \`AnalyserNode\` wiring described above and replace the bar-height calculation in \`draw()\` with \`analyser.getByteFrequencyData(dataArray)\` values.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Howler CDN', text: `Include howler.min.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A player card with a canvas visualizer renders.` },
      { title: 'Click play', text: `Howler starts playback; bars animate to the play state.` },
      { title: 'Drag the seek bar', text: `howl.seek() jumps playback to that position.` },
      { title: 'Swap the audio source', text: `Replace the src URL with your own hosted file.` },
      { title: 'Add a real analyser (optional)', text: `Wire AnalyserNode for true FFT-driven bars.` },
    ] },
    features: [
      { title: 'Real Howler transport', text: `play/pause/seek/duration all genuinely wired.` },
      { title: 'Canvas bar visualizer', text: `32 bars redrawn every animation frame.` },
      { title: 'Playback-gated motion', text: `Bars animate only while howl.playing() is true.` },
      { title: 'Load-failure fallback', text: `loaderror keeps controls usable, never blank.` },
      { title: 'Synced scrubber', text: `Seek input tracks position during playback.` },
      { title: 'Formatted time label', text: `Minutes:seconds updates live.` },
      { title: 'HTML5 audio mode', text: `html5: true avoids autoplay/CORS decode issues.` },
      { title: 'Compact card layout', text: `Drops into a sidebar or dashboard widget.` },
    ],
    useCases: [
      { title: 'Podcast episode cards', text: `A compact player beside [podcast player](/ui-snippets/podcast-player/).` },
      { title: 'Music widgets', text: `A smaller sibling of [music player](/ui-snippets/music-player/).` },
      { title: 'Voice note playback', text: `Pair with [voice memo recorder](/ui-snippets/voice-memo-recorder/).` },
      { title: 'Ambient/background loops', text: `Loop:true for site background audio controls.` },
      { title: 'Real waveform upgrade path', text: `Compare with [audio waveform visualizer](/ui-snippets/audio-waveform-visualizer/).` },
      { title: 'Dashboard audio widgets', text: `A compact status card for audio-driven tools.` },
      { icon: 'CODE', title: 'Related: Subscription Tier Card Stack — Recommended Highlight', desc: 'See the [Subscription Tier Card Stack — Recommended Highlight](/ui-snippets/subscription-tier-stack-recommended/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Are the visualizer bars real audio data?', a: `No, and the code comments say so directly: Howler doesn't expose frequency data out of the box, so the bars are a sine-wave-plus-jitter simulation gated by howl.playing(). It's a visually convincing stand-in, not an FFT analysis. Getting real bars requires wiring a Web Audio AnalyserNode to the Howl instance's underlying audio node and reading getByteFrequencyData() each frame, which the about section explains how to add.` },
      { q: 'What happens if the audio file fails to load?', a: `Howler's loaderror event sets a flag that keeps the card fully interactive: the play button still toggles a demo playing state and the visualizer still animates its simulated bars, so the player never looks broken or frozen. The seek bar and real transport calls are simply skipped while that flag is set, since there's no decoded audio to seek within.` },
      { q: 'Why does the seek bar update during playback?', a: `The visualizer's draw() function runs every animation frame via requestAnimationFrame, and while audio is playing (and the user isn't actively dragging the slider) it reads howl.seek() and howl.duration(), converts that to a percentage, and writes it into the range input's value along with the formatted time label — the same loop that redraws the bars keeps the scrubber in sync at no extra cost.` },
      { q: 'Why use html5: true in the Howl constructor?', a: `It tells Howler to use an HTML5 Audio element instead of decoding the full file via Web Audio, which avoids some autoplay-policy and CORS-decoding restrictions for streamed or cross-origin sources, at the cost of losing access to Web Audio features like a real AnalyserNode for that sound. For a player where you plan to add real frequency analysis later, you'd typically drop html5: true and use the Web Audio path instead.` },
      { q: 'How do I add a real frequency visualizer instead of the simulation?', a: `Create an AnalyserNode from Howler's shared AudioContext (Howler.ctx), connect the specific Howl instance's audio node (accessible internally via howl._sounds[0]._node, an unofficial but widely used path) into it, and each animation frame call analyser.getByteFrequencyData(dataArray) to get real per-frequency-bin amplitude values, then draw bars scaled from that array instead of the sine-wave calculation this snippet uses.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to take it on faith that this visualizer is simulated rather than real. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to point out exactly which parts of the code are genuine Howler.js transport control (play, pause, seek, duration) versus the sine-wave-plus-jitter math in draw() that stands in for real frequency data, and why howl.playing() alone is enough to gate that simulation convincingly. The same assistant can help you upgrade it — asking how to create a Web Audio AnalyserNode from Howler's shared AudioContext, connect a specific Howl instance's internal audio node to it, and replace the sine calculation with real getByteFrequencyData() values. It's also useful for hardening the loaderror fallback further, for instance asking how to retry a failed load or surface a clearer error message to the user instead of silently falling into demo mode. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a compact audio player card with play/pause/seek controls using Howler.js (load it from a CDN), plus a canvas-based bar visualizer, being explicit in code and comments about which parts use real audio data and which are simulated.

Requirements:
- A card with a canvas element for the visualizer, a title/subtitle, a round play/pause button, a range input for seeking, and a time label.
- Instantiate a single Howl with an audio source URL and html5 playback mode, and wire the play button to call the instance's play/pause methods, checking its playing() method to decide which action to take and to update the button's icon.
- Wire the range input so dragging it updates a live time label immediately, and releasing it (on change, not input) calls the Howl instance's seek method to jump playback to that percentage of its duration.
- On every animation frame, if the audio is actively playing and the user isn't currently dragging the seek input, read the current playback position and duration to keep the seek bar's value and the time label in sync automatically.
- Attach a loaderror handler to the Howl instance so that if the audio source fails to load (which must not throw or leave the card visually broken), the play button and visualizer continue to function using an internal demo-playing boolean flag instead of the real playing() state.
- Implement the bar visualizer using a canvas 2D context, redrawing roughly 32 bars every animation frame with heights computed from a sine wave plus randomness whose amplitude is driven by whichever playing state is currently active (real or demo) — do not use the Web Audio API's AnalyserNode for this version, but add a code comment explaining that swapping in a real AnalyserNode connected to the Howl instance's internal audio node and reading getByteFrequencyData() is the production path for true frequency-based bars.`,
    },
  },
};

export default howlerAudioPlayerVisualizer;
