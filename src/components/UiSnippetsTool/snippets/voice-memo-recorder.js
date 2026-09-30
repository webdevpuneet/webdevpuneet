const voiceMemoRecorder = {
  id: 'voice-memo-recorder',
  title: 'Voice Memo Recorder',
  lastmod: '2026-06-20',
  category: 'media',
  html: `<div class="vmr-card">
  <div class="vmr-head">
    <h3>Voice memo</h3>
    <span class="vmr-time" id="vmrTime">0:00</span>
  </div>

  <div class="vmr-bars" id="vmrBars"></div>

  <div class="vmr-controls">
    <button type="button" class="vmr-record" id="vmrRecord" aria-label="Record">
      <span class="vmr-record-dot"></span>
    </button>
    <button type="button" class="vmr-play" id="vmrPlay" hidden aria-label="Play">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20"/></svg>
    </button>
    <button type="button" class="vmr-discard" id="vmrDiscard" hidden aria-label="Discard">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
    </button>
  </div>
  <p class="vmr-status" id="vmrStatus">Tap to start recording</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.vmr-card{background:#fff;border-radius:18px;padding:22px;width:100%;max-width:340px;box-shadow:0 18px 44px rgba(15,23,42,.12);text-align:center}
.vmr-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.vmr-head h3{font-size:15px;font-weight:800;color:#0f172a}
.vmr-time{font-size:13px;font-weight:700;color:#64748b;font-variant-numeric:tabular-nums}

.vmr-bars{display:flex;align-items:center;justify-content:center;gap:3px;height:56px;margin-bottom:18px}
.vmr-bar{width:3px;border-radius:2px;background:#cbd5e1;height:6px;transition:height .1s ease,background .2s}
.vmr-bar.live{background:#6366f1}

.vmr-controls{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:10px}
.vmr-record{width:64px;height:64px;border-radius:50%;border:none;background:#ef4444;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s,border-radius .2s;box-shadow:0 8px 20px rgba(239,68,68,.35)}
.vmr-record:hover{transform:scale(1.05)}
.vmr-record-dot{width:22px;height:22px;border-radius:50%;background:#fff;transition:border-radius .2s,width .2s,height .2s}
.vmr-record.recording .vmr-record-dot{border-radius:5px;width:18px;height:18px}
.vmr-record.recording{animation:vmrPulse 1.6s ease-out infinite}
@keyframes vmrPulse{0%{box-shadow:0 0 0 0 rgba(239,68,68,.45)}70%{box-shadow:0 0 0 14px rgba(239,68,68,0)}100%{box-shadow:0 0 0 0 rgba(239,68,68,0)}}

.vmr-play,.vmr-discard{width:42px;height:42px;border-radius:50%;border:1.5px solid #e2e8f0;background:#fff;color:#1e293b;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}
.vmr-play:hover,.vmr-discard:hover{background:#f8fafc}
.vmr-play.playing{background:#eef2ff;border-color:#6366f1;color:#6366f1}

.vmr-status{font-size:12.5px;font-weight:600;color:#94a3b8}`,

  js: `var BAR_COUNT = 40;
var bars = [];
var recording = false;
var playing = false;
var seconds = 0;
var timer = null;
var playTimer = null;
var hasRecording = false;
var recordedLevels = [];

var barsEl = document.getElementById('vmrBars');
for (var i = 0; i < BAR_COUNT; i++) {
  var b = document.createElement('div');
  b.className = 'vmr-bar';
  barsEl.appendChild(b);
  bars.push(b);
}

function formatTime(s) {
  var m = Math.floor(s / 60), r = s % 60;
  return m + ':' + (r < 10 ? '0' : '') + r;
}

function randomLevel() { return 5 + Math.random() * 50; }

document.getElementById('vmrRecord').addEventListener('click', function () {
  if (recording) { stopRecording(); } else { startRecording(); }
});

function startRecording() {
  recording = true;
  hasRecording = false;
  seconds = 0;
  recordedLevels = [];
  document.getElementById('vmrRecord').classList.add('recording');
  document.getElementById('vmrStatus').textContent = 'Recording…';
  document.getElementById('vmrPlay').hidden = true;
  document.getElementById('vmrDiscard').hidden = true;
  document.getElementById('vmrTime').textContent = '0:00';

  timer = setInterval(function () {
    seconds++;
    document.getElementById('vmrTime').textContent = formatTime(seconds);
    recordedLevels.push(randomLevel());
  }, 1000);

  animateLiveBars();
}

var liveBarRaf = null;
function animateLiveBars() {
  bars.forEach(function (bar, i) {
    var delay = i * 18;
    setTimeout(function () {
      if (!recording) return;
      bar.style.height = randomLevel() + 'px';
      bar.classList.add('live');
    }, delay);
  });
  if (recording) liveBarRaf = setTimeout(animateLiveBars, 320);
}

function stopRecording() {
  recording = false;
  clearInterval(timer);
  clearTimeout(liveBarRaf);
  hasRecording = seconds > 0;
  document.getElementById('vmrRecord').classList.remove('recording');
  bars.forEach(function (bar) { bar.classList.remove('live'); });

  if (hasRecording) {
    // Render a static waveform from the captured levels so the bars reflect this take.
    bars.forEach(function (bar, i) {
      var lvl = recordedLevels[i % recordedLevels.length] || 8;
      bar.style.height = Math.max(4, lvl * 0.6) + 'px';
      bar.style.background = '#cbd5e1';
    });
    document.getElementById('vmrStatus').textContent = formatTime(seconds) + ' recorded';
    document.getElementById('vmrPlay').hidden = false;
    document.getElementById('vmrDiscard').hidden = false;
  } else {
    document.getElementById('vmrStatus').textContent = 'Tap to start recording';
  }
}

document.getElementById('vmrPlay').addEventListener('click', function () {
  if (!hasRecording) return;
  if (playing) { stopPlayback(); return; }
  playing = true;
  this.classList.add('playing');
  document.getElementById('vmrStatus').textContent = 'Playing…';
  var elapsed = 0;
  playTimer = setInterval(function () {
    elapsed++;
    document.getElementById('vmrTime').textContent = formatTime(elapsed);
    var litCount = Math.round((elapsed / seconds) * BAR_COUNT);
    bars.forEach(function (bar, i) { bar.classList.toggle('live', i < litCount); });
    if (elapsed >= seconds) stopPlayback();
  }, 1000);
});

function stopPlayback() {
  playing = false;
  clearInterval(playTimer);
  document.getElementById('vmrPlay').classList.remove('playing');
  document.getElementById('vmrTime').textContent = formatTime(seconds);
  document.getElementById('vmrStatus').textContent = formatTime(seconds) + ' recorded';
  bars.forEach(function (bar) { bar.classList.remove('live'); });
}

document.getElementById('vmrDiscard').addEventListener('click', function () {
  stopPlayback();
  hasRecording = false;
  seconds = 0;
  recordedLevels = [];
  bars.forEach(function (bar) { bar.style.height = '6px'; bar.style.background = '#cbd5e1'; });
  document.getElementById('vmrTime').textContent = '0:00';
  document.getElementById('vmrStatus').textContent = 'Tap to start recording';
  document.getElementById('vmrPlay').hidden = true;
  document.getElementById('vmrDiscard').hidden = true;
});`,

  seo: {
    title: 'Voice Memo Recorder — Waveform UI HTML CSS JS',
    description: `A voice-memo recorder UI with a live animated waveform, a pulsing record button, and playback scrubbing over the captured bars. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Voice Memo Recorder — Live Waveform, Pulsing Record Button & Playback Scrub',
      description: `Voice messages have become a default communication mode in chat apps, support tools, and async-first workplaces, and the UI that sells the feature is the live waveform — bars jumping in time with your voice, then settling into a fixed shape you can play back. This snippet builds the complete front-end interaction (record, waveform, play, discard) in plain HTML, CSS, and vanilla JavaScript, ready to wire to the real MediaRecorder API.

**A round-to-square morphing record button**

The record button is a circle with a smaller white circle inside; clicking it toggles a \`.recording\` class that morphs the inner dot from a circle to a rounded square via \`border-radius\` transition — the same visual shorthand iOS and most voice-recording apps use for "tap again to stop." A pulsing box-shadow ring animates outward continuously while recording, reinforcing the active state independent of the dot's own shape change.

**Two waveform phases, one set of bar elements**

The same 40 bar \`<div>\`s serve two purposes. While recording, \`animateLiveBars()\` staggers each bar's height update by a small per-index delay and re-runs on a loop, producing an organic, left-to-right "wave" of motion rather than every bar jumping in perfect unison — a more convincing fake live-audio look. The instant recording stops, every bar's height is rewritten *once* from the \`recordedLevels\` captured during recording (cycled to fill all 40 bars), turning the live animation into a fixed, static waveform that represents "this take" — exactly like a real recorded memo's waveform freezing in place.

**Playback that highlights bars as it goes**

Pressing play starts a one-second interval that computes how many bars *should* be lit based on elapsed time over total duration (\`Math.round((elapsed / seconds) * BAR_COUNT)\`) and toggles the \`.live\` class on that many bars from the left — visually "filling in" the waveform as playback progresses, the same scrubbing-position feedback real voice-memo players give.

**Discard resets everything explicitly**

The discard button is a deliberate, separate action from re-recording: it stops any playback, clears the captured levels and timer, and resets every bar back to its resting height — so there's no ambiguity between "I want to record over this" (tap record again) and "I want to delete this and start fresh" (tap discard).

**From simulated levels to a real microphone**

Everything above works identically once the random \`randomLevel()\` calls are swapped for real input: \`navigator.mediaDevices.getUserMedia({ audio: true })\` grants microphone access, a \`MediaRecorder\` captures the resulting stream into a blob for upload or playback, and a Web Audio \`AnalyserNode\` reads live frequency or time-domain data each animation frame to drive the exact same bar-height updates this demo already wires up. The UI layer — record button, waveform, play, discard — doesn't need to change at all.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A voice memo card renders with a flat row of bars at rest and a red record button.` },
      { title: 'Tap record', text: `The button morphs and pulses, the timer counts up, and bars animate in a left-to-right wave to simulate live audio.` },
      { title: 'Tap record again to stop', text: `The waveform freezes into a fixed shape from the captured levels, and Play and Discard buttons appear.` },
      { title: 'Tap play', text: `The recording "plays" for its recorded duration, with bars lighting up from left to right as time elapses.` },
      { title: 'Tap discard', text: `Everything resets to the initial flat-bar, "Tap to start recording" state.` },
      { title: 'Wire up real audio capture', text: `Replace the simulated timer/levels with the MediaRecorder API and Web Audio AnalyserNode for real microphone levels, feeding the same bar-height update calls.` },
    ] },
    features: [
      { title: 'Morphing record button', text: `The inner dot shifts from circle to rounded square on record/stop, the universal "tap to stop" visual cue.` },
      { title: 'Two-phase waveform rendering', text: `Bars animate live with staggered per-index timing while recording, then freeze into a fixed shape from the captured levels on stop.` },
      { title: 'Pulsing record-state ring', text: `A looping box-shadow animation reinforces the active recording state independent of the button's own shape change.` },
      { title: 'Playback bar-fill scrubbing', text: `Play highlights a proportional number of bars as time elapses, visually scrubbing through the fixed waveform.` },
      { title: 'Explicit discard action', text: `Discarding is a separate, deliberate control from re-recording, avoiding ambiguity about what a tap will do.` },
      { title: 'Live elapsed-time counter', text: `A formatted m:ss timer counts up while recording and reflects playback position while playing.` },
      { title: 'Status text for every state', text: `"Tap to start recording," "Recording…," "X:XX recorded," and "Playing…" each give an explicit text status alongside the visuals.` },
      { title: 'Pure CSS/JS — ready for the real MediaRecorder API', text: `The interaction layer is fully built; swapping in real microphone capture only touches the level-generation logic.` },
    ],
    useCases: [
      { title: 'Chat and messaging apps', text: `The voice-note recording UI for a messaging product, pairing with a [chat UI](/ui-snippets/chat-ui/) message list.` },
      { title: 'Customer support and feedback tools', text: `Let users record a quick voice description of an issue instead of typing a long text explanation.` },
      { title: 'Voice journaling and note-taking apps', text: `A focused single-recording interface for quick audio notes.` },
      { title: 'Async standups and team updates', text: `Replace a typed status update with a 30-second voice memo in a remote-work tool.` },
      { title: 'Language learning and pronunciation apps', text: `Record and immediately play back a learner's pronunciation attempt using the same record/play/discard cycle.` },
      { title: 'Learning waveform UI technique', text: `A clear reference for staggered bar animation and freeze-on-stop waveform rendering — compare with an [audio waveform visualizer](/ui-snippets/audio-waveform-visualizer/) for a playback-only variant.` },
    ],
    faqs: [
      { q: 'How do I capture a real microphone recording?', a: `Call navigator.mediaDevices.getUserMedia({ audio: true }) on record-start, pipe the stream into a MediaRecorder to capture the audio blob, and use a Web Audio AnalyserNode's getByteFrequencyData() on an animation frame to drive the live bar heights instead of the random randomLevel() values — the rest of the UI logic stays the same.` },
      { q: 'How do I actually play back the recorded audio, not just animate bars?', a: `Store the MediaRecorder's resulting Blob, create an <audio> element (or Audio() instance) with its object URL, and call .play()/.pause() from the existing play button handler, syncing the bar-highlight progress to the audio element's timeupdate event instead of a fixed setInterval.` },
      { q: 'How do I upload the recording to a server?', a: `Once stopped, send the captured Blob via fetch with FormData to your upload endpoint, showing an upload-progress state (see the [upload progress](/ui-snippets/upload-progress/) snippet) before revealing the play/discard controls.` },
      { q: 'How do I limit the maximum recording length?', a: `In the recording setInterval, check seconds against a MAX_SECONDS constant and call stopRecording() automatically once reached, optionally showing a brief "Maximum length reached" status message.` },
      { q: 'How do I use this voice recorder in React, Vue, or Angular?', a: `In React, keep recording/playing/seconds/levels in useState and run the capture/playback loops in useEffect with cleanup on unmount; in Vue, use ref()/onUnmounted for the same timer cleanup; in Angular, use component fields with ngOnDestroy. The MediaRecorder and AnalyserNode integration is identical across frameworks since it's a browser API, not a UI-layer concern.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the two rendering phases by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the same 40 bar elements serve two different visual jobs — animateLiveBars' staggered per-index setTimeout wave while recording, versus the one-time static rewrite from recordedLevels when stopRecording runs — and why recordedLevels needs to be cycled with a modulo when there are fewer captured samples than bars. It's also worth asking why discard is implemented as an entirely separate handler from stop-then-record rather than folding into the same button. For extending it, have it replace randomLevel() with real getUserMedia plus an AnalyserNode reading actual microphone amplitude, add a maximum recording length that auto-stops, or wire real playback with an actual audio element synced to the bar highlighting. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a voice memo recorder UI in plain HTML, CSS, and vanilla JavaScript with no libraries, simulating microphone capture with randomized data so the interaction can be fully built before wiring in the real MediaRecorder API.

Requirements:
- A fixed set of vertical bar elements (e.g. 40) laid out in a row, all starting at a minimal resting height.
- A record button whose inner shape morphs from a circle to a rounded square when toggled into a recording state (the universal "tap again to stop" visual cue), with a continuously pulsing outward box-shadow ring animation active only while recording.
- While recording: run a repeating timer that increments and displays an elapsed mm:ss counter, and separately animate the bars with staggered per-index delays so they update in a left-to-right wave rather than all jumping in unison, using randomized height values to simulate live audio levels; also push each generated level into an array as it's captured.
- When recording stops: freeze the bars into a single static waveform shape derived from the array of levels captured during that recording (reusing/cycling through the captured values if there are fewer levels than bars), reveal separate Play and Discard controls, and show the total recorded duration as status text.
- A Play control that, when clicked, runs a per-second timer that progressively marks a proportional fraction of the bars (left to right) as "active" based on elapsed time versus the total recorded duration, stopping and resetting that active-marking automatically once playback reaches the end.
- A Discard control that is a distinct action from re-recording: it must stop any in-progress playback, clear all captured level data and the elapsed time, and reset every bar back to its original resting height and color.`,
    },
  },
};

export default voiceMemoRecorder;
