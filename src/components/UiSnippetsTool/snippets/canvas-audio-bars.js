const canvasAudioBars = {
  id: 'canvas-audio-bars',
  title: 'Canvas Audio Frequency Bars',
  lastmod: '2026-08-21',
  category: 'media',
  cdnUrls: [],
  html: `<section class="cab-wrap">
  <span class="cab-tag">web audio api · analysernode</span>
  <h1>Frequency bars</h1>
  <p id="cabStatus">Click "Use microphone" to visualize real audio, or watch the simulated preview below.</p>

  <div class="cab-stage">
    <canvas class="cab-canvas" id="cabCanvas" width="640" height="220"></canvas>
  </div>

  <div class="cab-actions">
    <button class="cab-btn primary" id="cabMicBtn">Use microphone</button>
    <button class="cab-btn" id="cabSimBtn">Simulated preview</button>
  </div>
  <p class="cab-note">If microphone access is blocked (common inside a sandboxed preview iframe), the bars automatically fall back to a sine-driven simulation — the demo never sits blank.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#1a1030,#050308 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.cab-wrap{width:100%;max-width:720px;text-align:center}
.cab-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f0abfc;background:rgba(240,171,252,.1);border:1px solid rgba(240,171,252,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.cab-wrap h1{font-size:clamp(28px,6vw,40px);font-weight:800;letter-spacing:-.03em}
.cab-wrap p{font-size:14px;color:#b7a9d1;margin-top:8px;line-height:1.6}
.cab-stage{margin:24px 0 18px;border-radius:16px;overflow:hidden;border:1px solid rgba(240,171,252,.2);background:#0a0712}
.cab-canvas{display:block;width:100%;height:220px}
.cab-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:14px}
.cab-btn{padding:12px 22px;border-radius:10px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#e8e2f5;font:600 13px system-ui;cursor:pointer;transition:background .15s,border-color .15s}
.cab-btn:hover{background:rgba(255,255,255,.11)}
.cab-btn.primary{background:linear-gradient(135deg,#c084fc,#f472b6);border-color:transparent;color:#1a0620;font-weight:700}
.cab-note{font-size:11.5px;color:#7c7091;max-width:520px;margin:0 auto;line-height:1.6}`,

  js: `var canvas = document.getElementById('cabCanvas');
var ctx = canvas.getContext('2d');
var statusEl = document.getElementById('cabStatus');
var micBtn = document.getElementById('cabMicBtn');
var simBtn = document.getElementById('cabSimBtn');

var W = canvas.width, H = canvas.height;
var BAR_COUNT = 64;
var mode = 'idle'; // 'idle' | 'mic' | 'sim'
var raf = null;

var audioCtx = null;
var analyser = null;
var freqData = null;
var micStream = null;

function drawBars(values) {
  ctx.clearRect(0, 0, W, H);
  var gap = 3;
  var barWidth = (W - gap * (BAR_COUNT - 1)) / BAR_COUNT;

  for (var i = 0; i < BAR_COUNT; i++) {
    var v = values[i] / 255;
    var barH = Math.max(3, v * (H - 10));
    var x = i * (barWidth + gap);
    var y = H - barH;

    var grad = ctx.createLinearGradient(0, y, 0, H);
    grad.addColorStop(0, '#f0abfc');
    grad.addColorStop(1, '#7c3aed');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barH, 3);
    ctx.fill();
  }
}

// --- Simulated fallback: a sine/noise blend so the preview always animates,
// mic access or not. This is what runs by default and whenever getUserMedia
// is denied, unsupported, or blocked by the surrounding iframe's permissions
// policy (common for third-party embeds and sandboxed previews).
var simT = 0;
function simulatedFrame() {
  simT += 0.045;
  var values = new Uint8Array(BAR_COUNT);
  for (var i = 0; i < BAR_COUNT; i++) {
    var base = Math.sin(i * 0.35 + simT * 2.2) * 0.5 + 0.5;
    var wobble = Math.sin(i * 0.9 - simT * 3.4) * 0.5 + 0.5;
    var envelope = Math.sin(simT * 0.6) * 0.3 + 0.7;
    values[i] = Math.min(255, Math.max(0, (base * 0.6 + wobble * 0.4) * envelope * 255));
  }
  return values;
}

function loop() {
  if (mode === 'mic' && analyser && freqData) {
    analyser.getByteFrequencyData(freqData);
    drawBars(freqData);
  } else {
    drawBars(simulatedFrame());
  }
  raf = requestAnimationFrame(loop);
}

function startSimulated(message) {
  stopMic();
  mode = 'sim';
  statusEl.textContent = message || 'Simulated preview — sine-driven bars, no microphone involved.';
}

function stopMic() {
  if (micStream) {
    micStream.getTracks().forEach(function (t) { t.stop(); });
    micStream = null;
  }
}

async function startMic() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    startSimulated('This browser (or iframe context) has no getUserMedia support — showing the simulated preview instead.');
    return;
  }

  try {
    statusEl.textContent = 'Requesting microphone access…';
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') await audioCtx.resume();

    var source = audioCtx.createMediaStreamSource(micStream);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.82;
    freqData = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);

    mode = 'mic';
    statusEl.textContent = 'Live microphone input — try clapping or talking.';
  } catch (err) {
    // Permission denied, no device, or (very commonly inside a sandboxed
    // preview iframe) the "microphone" Permissions-Policy simply isn't
    // granted to this frame. Whatever the cause, fail into the simulation
    // rather than leaving the canvas blank.
    startSimulated('Microphone unavailable (' + (err && err.name ? err.name : 'blocked') + ') — showing the simulated preview instead.');
  }
}

micBtn.addEventListener('click', startMic);
simBtn.addEventListener('click', function () { startSimulated(); });

window.addEventListener('beforeunload', stopMic);

startSimulated('Simulated preview — sine-driven bars, no microphone involved.');
raf = requestAnimationFrame(loop);`,

  seo: {
    title: 'Canvas Audio Frequency Bars — Free Web Audio API Visualizer',
    description: `Live microphone frequency bars using the Web Audio API's AnalyserNode, with a clean sine-driven simulated fallback for when mic access is denied or blocked. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Canvas Audio Frequency Bars — Real Mic Input With a Graceful Fallback',
      description: `This snippet is a real audio-reactive visualizer, not a faked one: click "Use microphone" and it asks for \`getUserMedia\`, routes the live stream through a Web Audio \`AnalyserNode\`, and paints genuine frequency-bin data to canvas every frame. What makes it worth studying isn't just the Web Audio wiring — it's the fallback path that keeps the demo looking intentional no matter what the browser or embedding context allows.

**The real path: getUserMedia to AnalyserNode**

\`navigator.mediaDevices.getUserMedia({ audio: true })\` requests the microphone and resolves with a \`MediaStream\`. That stream is wrapped in \`audioCtx.createMediaStreamSource(micStream)\` and piped into an \`AnalyserNode\` with \`fftSize: 256\`, which exposes 128 frequency bins. Every animation frame, \`analyser.getByteFrequencyData(freqData)\` fills a \`Uint8Array\` with the current 0-255 magnitude of each bin — that array, sliced down to \`BAR_COUNT\`, is what actually drives every bar's height. \`smoothingTimeConstant: 0.82\` is the analyser's own built-in smoothing, so bars ease between frames instead of jittering on every sample.

**Why a fallback is not optional here**

Microphone access is one of the few browser APIs that can fail in ways entirely outside your code's control: the user can deny the permission prompt, the browser can lack support, or — very commonly for a snippet rendered inside a sandboxed preview \`<iframe>\` — the surrounding page's Permissions-Policy can simply never grant \`microphone\` to that frame, so \`getUserMedia\` rejects immediately with no prompt shown at all. A visualizer that goes blank in that case looks broken, not permission-restricted.

**A simulation indistinguishable from motion**

\`simulatedFrame()\` blends two sine waves per bar — a slow \`base\` term and a faster \`wobble\` term — multiplied by a slow-moving \`envelope\` that swells and recedes like a breathing loudness curve, then packs the result into the exact same \`Uint8Array\` shape \`getByteFrequencyData\` would produce. Because \`drawBars()\` only ever consumes that shape, the rendering code has no idea whether its data came from a real microphone or from math — which is exactly the point: the fallback isn't a "no audio" message, it's a full visual substitute.

**Fail-into-simulation, always**

\`startMic()\` wraps the entire request in a \`try/catch\`; any rejection — \`NotAllowedError\` from a denied prompt, \`NotFoundError\` with no microphone present, or a security error from a Permissions-Policy block — routes to \`startSimulated()\` with a message naming the error. The loop itself never branches on whether the *attempt* succeeded, only on the current \`mode\`, so there's exactly one code path that decides what's on screen at any moment. Pair this with an [audio waveform visualizer](/ui-snippets/audio-waveform-visualizer/) for a player UI, or a [particle network](/ui-snippets/particle-network/) background reacting to the same analyser data.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A simulated bar pattern animates immediately on load.` },
      { title: 'Click "Use microphone"', text: `The browser prompts for mic access; allow it to see real audio.` },
      { title: 'Talk or play music', text: `Bars react to genuine frequency-bin data from AnalyserNode.` },
      { title: 'Deny or block access', text: `The status message explains why, and bars fall back to simulation.` },
      { title: 'Click "Simulated preview"', text: `Switch back to the sine-driven pattern at any time.` },
      { title: 'Tune the visualizer', text: `Change fftSize, smoothingTimeConstant, or BAR_COUNT.` },
    ] },
    features: [
      { title: 'Real AnalyserNode wiring', text: `getUserMedia into createMediaStreamSource into an analyser.` },
      { title: 'Genuine frequency data', text: `getByteFrequencyData drives bar heights, not fake randomness.` },
      { title: 'Built-in smoothing', text: `smoothingTimeConstant eases bars between samples.` },
      { title: 'Shape-matched fallback', text: `Simulation fills the same Uint8Array shape as real data.` },
      { title: 'Fail-into-simulation', text: `Any getUserMedia rejection routes to the sine fallback.` },
      { title: 'Named error status', text: `The status line surfaces the actual DOMException name.` },
      { title: 'Manual mode toggle', text: `A button to force the simulated preview at any time.` },
      { title: 'Clean stream teardown', text: `Mic tracks stop on mode switch and on page unload.` },
    ],
    useCases: [
      { title: 'Music and podcast apps', text: 'Add live frequency bars beside an [audio waveform visualiser](/ui-snippets/audio-waveform-visualizer/), driven by real `getByteFrequencyData` rather than fake random heights.' },
      { title: 'Voice recording tools', text: 'Show live input level while recording, with `smoothingTimeConstant` easing the bars between samples so they do not flicker.' },
      { title: 'Microphone testers', text: 'Let users confirm that their microphone works before a call, with a clear fallback if permission is denied.' },
      { title: 'Karaoke and pitch practice', text: 'Provide a frequency readout as visual feedback while someone sings, using 32 bars redrawn on every animation frame.' },
      { title: 'Always-on overlays and demos', text: 'Embed safely in sandboxed iframes, since a simulated sine-driven fallback fills the same `Uint8Array` shape as real data.' },
      { icon: 'CODE', title: 'Related: Canvas Rainbow Mouse Trail', desc: 'See the [Canvas Rainbow Mouse Trail](/ui-snippets/canvas-mouse-trail-rainbow/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Layout Switcher Container Morph', desc: 'See the [Layout Switcher Container Morph](/ui-snippets/layout-switcher-container-morph/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the bar visualizer sometimes show a simulation instead of real audio?', a: `Microphone access can fail for reasons entirely outside the page's control: the user denies the browser prompt, no microphone device exists, or — especially common when this snippet is rendered inside a sandboxed preview iframe — the surrounding page's Permissions-Policy never grants the microphone feature to that frame, so getUserMedia rejects immediately without even showing a prompt. Rather than leave the canvas blank in any of those cases, the code catches the rejection and switches to a sine-driven simulated pattern.` },
      { q: 'Will this work inside a sandboxed iframe preview?', a: `It will always show something — either real mic data if the iframe is allowed the microphone permission and the user grants it, or the simulated fallback if not. Many sandboxed preview environments (including embedded code sandboxes) block microphone access by default via their iframe\'s allow attribute or Permissions-Policy header, which is exactly the scenario startMic()\'s catch block is designed for: it fails quietly into a visually complete simulation instead of an error state.` },
      { q: 'How does the simulated fallback stay visually convincing?', a: `simulatedFrame() blends a slow sine wave and a faster one per bar, modulated by a slowly breathing envelope term, and packs the result into a Uint8Array with the exact same shape (length and 0-255 value range) that analyser.getByteFrequencyData would produce. Because the drawing function only ever reads that shape, it cannot tell whether the values came from a microphone or from math, so the two modes render with identical code.` },
      { q: 'What do fftSize and smoothingTimeConstant control?', a: `fftSize (set to 256) determines frequency resolution — the AnalyserNode exposes fftSize / 2 frequency bins, so 256 gives 128 bins, of which the first 64 are drawn as bars here. smoothingTimeConstant (0.82) is the analyser's own exponential smoothing between consecutive samples; higher values make bars ease more gently between frames, lower values make them jump more sharply with each sample.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move the AudioContext, AnalyserNode, and MediaStream setup into a mount effect, keep them in refs so they persist across renders, and start the requestAnimationFrame loop there. In cleanup, stop every track on the MediaStream and cancelAnimationFrame the loop so a component unmount doesn't leave the microphone active or the audio graph running in the background.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how audio flows from getUserMedia's MediaStream through createMediaStreamSource into an AnalyserNode, and why getByteFrequencyData needs a Uint8Array sized to analyser.frequencyBinCount rather than an arbitrary length. It's especially useful for reasoning about the fallback design — ask why the simulated data is built to match the exact shape and value range of real frequency data instead of just rendering a "no microphone" message, and why the try/catch around getUserMedia routes every kind of failure (denied permission, missing device, blocked iframe permissions policy) into the same simulated state rather than showing different UI for each. For extensions, ask it to add a second AnalyserNode fed by getByteTimeDomainData for a companion waveform view, expose fftSize and smoothingTimeConstant as live sliders, or add a peak-hold line above each bar that decays slowly. It can also help you reason about the iframe permissions angle — ask how a host page would need to configure an iframe's allow attribute for microphone access to work at all. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "canvas audio frequency bars" visualizer in plain HTML, CSS, and JavaScript using the real Web Audio API and Canvas 2D — no libraries.

Requirements:
- A canvas that renders a fixed number of gradient-filled bars (e.g. 64) across its width, each bar's height driven by a Uint8Array of 0-255 magnitude values, redrawn every requestAnimationFrame tick.
- A "Use microphone" button that calls navigator.mediaDevices.getUserMedia({ audio: true }), and on success routes the resulting MediaStream through audioCtx.createMediaStreamSource into an AnalyserNode (fftSize 256, a smoothingTimeConstant around 0.8) so that analyser.getByteFrequencyData(...) supplies real per-frame frequency-bin data to the bar renderer.
- CRITICAL: implement a graceful fallback. Wrap the entire getUserMedia and Web Audio setup in a try/catch (and also check that navigator.mediaDevices.getUserMedia exists before calling it). On ANY failure — permission denied, no device found, unsupported browser, or a blocked Permissions-Policy in a sandboxed iframe (a common and expected scenario since this snippet may render inside a sandboxed preview iframe with no microphone permission granted to it) — fall back to a "simulated" mode that generates fake but visually convincing frequency data every frame using a blend of a couple of sine waves per bar plus a slow modulating envelope, packed into a Uint8Array of the identical shape and 0-255 range that real frequency data would have, so the exact same drawing function renders both modes with no special-casing.
- Show a status text element that clearly communicates the current state (idle/simulated, requesting access, live microphone active, or a specific error name if the request failed) so the user understands why they might be seeing simulated bars instead of real audio.
- Start the demo in simulated mode immediately on page load (so it is never blank), provide a button to manually switch back to simulated mode at any time, and stop all MediaStream tracks both when switching away from microphone mode and on page unload so the microphone indicator in the browser tab turns off correctly.`,
    },
  },
};

export default canvasAudioBars;
