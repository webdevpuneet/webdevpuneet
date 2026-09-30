const voiceMessageBubble = {
  id: 'voice-message-bubble',
  title: 'Voice Message Bubble',
  lastmod: '2026-08-08',
  category: 'mobile',
  html: `<div class="wrap">
  <div class="chat-thread">
    <div class="bubble bubble-in">
      <div class="avatar">M</div>
      <div class="voice-card">
        <button class="play-btn" id="play-btn" aria-label="Play voice message">
          <svg id="icon-play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
          <svg id="icon-pause" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="display:none"><rect x="5" y="3" width="5" height="18" rx="1.5"/><rect x="14" y="3" width="5" height="18" rx="1.5"/></svg>
        </button>
        <div class="waveform" id="waveform"></div>
        <div class="time" id="time-label">0:00</div>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #eef2f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 380px; }
.chat-thread { display: flex; flex-direction: column; gap: 10px; }
.bubble { display: flex; align-items: flex-end; gap: 8px; }
.avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #818cf8, #6366f1); color: #fff; font-size: 12.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

.voice-card { background: #fff; border-radius: 18px 18px 18px 4px; padding: 10px 14px 10px 10px; display: flex; align-items: center; gap: 10px; box-shadow: 0 1px 2px rgba(15,23,42,0.06), 0 8px 20px rgba(15,23,42,0.06); max-width: 260px; }

.play-btn { width: 34px; height: 34px; border-radius: 50%; background: #6366f1; border: none; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: background 0.15s, transform 0.1s; }
.play-btn:hover { background: #4f46e5; }
.play-btn:active { transform: scale(0.94); }
.play-btn svg#icon-play { margin-left: 2px; }

.waveform { position: relative; display: flex; align-items: center; gap: 2px; height: 28px; flex: 1; cursor: pointer; user-select: none; touch-action: none; }
.bar { width: 2.5px; border-radius: 2px; background: #d6dbea; transition: background 0.08s linear; flex-shrink: 0; }
.bar.played { background: #6366f1; }

.time { font-size: 10.5px; color: #94a3b8; font-variant-numeric: tabular-nums; flex-shrink: 0; min-width: 30px; text-align: right; }`,
  js: `var waveformEl = document.getElementById('waveform');
var playBtn = document.getElementById('play-btn');
var iconPlay = document.getElementById('icon-play');
var iconPause = document.getElementById('icon-pause');
var timeLabel = document.getElementById('time-label');

var DURATION = 18.4;
var BAR_COUNT = 46;

var barHeights = generateBarHeights(BAR_COUNT, 1337);

function generateBarHeights(count, seed) {
  var heights = [];
  var s = seed;
  function nextRand() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  }
  for (var i = 0; i < count; i++) {
    var base = 0.3 + Math.abs(Math.sin(i * 0.42)) * 0.5;
    var jitter = (nextRand() - 0.5) * 0.35;
    var h = Math.max(0.18, Math.min(1, base + jitter));
    heights.push(h);
  }
  return heights;
}

function buildWaveform() {
  waveformEl.innerHTML = '';
  for (var i = 0; i < BAR_COUNT; i++) {
    var bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = Math.round(barHeights[i] * 26) + 'px';
    waveformEl.appendChild(bar);
  }
}
buildWaveform();

var elapsed = 0;
var playing = false;
var rafId = null;
var lastTs = null;

function formatTime(t) {
  var m = Math.floor(t / 60);
  var s = Math.floor(t % 60);
  return m + ':' + String(s).padStart(2, '0');
}

function updateUi() {
  var pct = elapsed / DURATION;
  var playedCount = Math.round(pct * BAR_COUNT);
  var bars = waveformEl.querySelectorAll('.bar');
  bars.forEach(function (bar, i) {
    bar.classList.toggle('played', i < playedCount);
  });
  timeLabel.textContent = formatTime(playing ? DURATION - elapsed : (elapsed || DURATION));
}
updateUiInitial();
function updateUiInitial() {
  timeLabel.textContent = formatTime(DURATION);
}

function tick(ts) {
  if (!playing) return;
  if (lastTs === null) lastTs = ts;
  var dt = (ts - lastTs) / 1000;
  lastTs = ts;
  elapsed += dt;
  if (elapsed >= DURATION) {
    elapsed = DURATION;
    updateUi();
    stopPlayback();
    return;
  }
  updateUi();
  rafId = requestAnimationFrame(tick);
}

function startPlayback() {
  playing = true;
  lastTs = null;
  iconPlay.style.display = 'none';
  iconPause.style.display = '';
  rafId = requestAnimationFrame(tick);
}

function stopPlayback() {
  playing = false;
  iconPlay.style.display = '';
  iconPause.style.display = 'none';
  if (rafId) cancelAnimationFrame(rafId);
}

function togglePlay() {
  if (playing) {
    stopPlayback();
  } else {
    if (elapsed >= DURATION) elapsed = 0;
    startPlayback();
  }
}

playBtn.addEventListener('click', togglePlay);

function seekFromClientX(clientX) {
  var rect = waveformEl.getBoundingClientRect();
  var x = clientX - rect.left;
  var pct = Math.max(0, Math.min(1, x / rect.width));
  elapsed = pct * DURATION;
  updateUi();
}

var dragging = false;
waveformEl.addEventListener('pointerdown', function (e) {
  dragging = true;
  waveformEl.setPointerCapture(e.pointerId);
  seekFromClientX(e.clientX);
});
waveformEl.addEventListener('pointermove', function (e) {
  if (!dragging) return;
  seekFromClientX(e.clientX);
});
waveformEl.addEventListener('pointerup', function () {
  dragging = false;
});
waveformEl.addEventListener('pointercancel', function () {
  dragging = false;
});`,
  seo: {
    title: 'Voice Message Bubble — Free HTML CSS JS Chat Snippet',
    description: 'WhatsApp-style voice note bubble with a cached pseudo-random waveform, synced playback recoloring and drag-to-seek. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Voice Message Bubble — Animated Waveform Playback with Drag Scrubbing in Vanilla JS',
      description: `Every major chat app — WhatsApp, iMessage, Telegram, Signal — renders voice notes the same way: a row of thin bars whose heights look like a real audio waveform, with a moving line or color sweep showing how much has played. Building that convincingly requires answering two separate questions correctly: where do realistic-looking bar heights come from without an actual decoded audio buffer, and how does the "played" portion stay perfectly in sync with a playback clock while still being draggable. This snippet answers both with plain JavaScript, a seeded pseudo-random generator, and \`requestAnimationFrame\`, with no audio file and no Web Audio API involved — it simulates the timeline the same way a design mockup or a demo needs to.

**Generating the waveform once, not per frame**

The tempting-but-wrong approach is to calculate bar heights inside the render loop, which would make the waveform flicker to a new random shape on every animation frame. Instead, \`generateBarHeights(count, seed)\` runs exactly once, immediately when the script loads, and returns a plain array of 46 height ratios that is cached in the \`barHeights\` variable for the lifetime of the component. The values are not pure noise — each bar's height starts from \`Math.abs(Math.sin(i * 0.42)) * 0.5 + 0.3\`, a slow sine wave that gives the waveform gentle rises and falls like real speech, then a small seeded jitter is layered on top so adjacent bars are not identical. The seed is a plain linear congruential generator (\`s = (s * 9301 + 49297) % 233280\`) rather than \`Math.random()\`, specifically so the exact same waveform shape renders every time the component mounts — a real recording's waveform does not change shape between plays, and neither should this one.

**Playback clock: requestAnimationFrame, not setInterval**

Elapsed time is tracked with \`requestAnimationFrame\` rather than \`setInterval\`. Each frame computes \`dt\`, the delta in seconds since the previous frame timestamp, and adds it to \`elapsed\` — this makes the timer resilient to dropped frames or background-tab throttling, because it is driven by actual elapsed wall-clock time between frames rather than assuming each tick represents a fixed interval. \`setInterval\` timers drift under load; a \`dt\`-based rAF loop stays accurate even if the browser skips frames.

**Progress-based recoloring: percentage maps to bar count**

The core visual trick is in \`updateUi()\`: \`elapsed / DURATION\` gives a 0-to-1 playback percentage, which is multiplied by the total bar count and rounded to get \`playedCount\` — the number of bars, counting from the left, that should show the "played" indigo color. A single loop over all \`.bar\` elements toggles the \`.played\` class on any bar whose index is less than \`playedCount\`. This is deliberately class-based rather than inline-style-based so the actual color transition is handled by a CSS \`transition: background 0.08s linear\` rule, keeping the JavaScript responsible only for deciding which bars are played, not for animating the color change itself.

**Drag-to-seek with Pointer Events**

Scrubbing uses the unified Pointer Events API (\`pointerdown\`, \`pointermove\`, \`pointerup\`) instead of separate mouse and touch handlers, which means the same code handles a mouse drag on desktop and a finger drag on a touchscreen without branching. On \`pointerdown\`, \`setPointerCapture\` is called so that \`pointermove\` keeps firing on the waveform element even if the pointer moves outside its bounding box mid-drag — without capture, a fast drag past the edge of the element would silently stop updating. \`seekFromClientX\` converts the pointer's horizontal client coordinate into a 0-to-1 fraction of the waveform's width using \`getBoundingClientRect()\`, multiplies by \`DURATION\` to get the new elapsed time, and calls the same \`updateUi()\` function playback uses — so dragging and automatic playback both funnel through one rendering path, guaranteeing the bars never fall out of sync with the displayed time.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click the circular play button', text: 'The play icon swaps to a pause icon, and a set of thin gray bars — the waveform — begins filling in with indigo color from the left edge as playback proceeds.' },
      { title: 'Watch the bars recolor in sync with the timer', text: 'The number of indigo "played" bars grows smoothly, matching the exact percentage of the message that has played, while the countdown label on the right ticks down.' },
      { title: 'Click anywhere on the waveform to seek', text: 'Clicking a point partway through the bars immediately jumps playback to that position — bars to the left of the click turn indigo, bars to the right turn back to gray.' },
      { title: 'Press and drag across the waveform to scrub', text: 'Holding the pointer down and dragging left or right continuously updates the played position in real time, exactly like scrubbing a native audio player, using pointer capture so the drag keeps working even past the bar edges.' },
      { title: 'Let it play to the end', text: 'When elapsed time reaches the full duration, playback stops automatically, the icon reverts to play, and clicking play again restarts the message from the beginning.' },
    ]},
    features: [
      'Waveform bar heights generated once via a seeded pseudo-random function and cached — never regenerated on re-render',
      'Sine-wave-shaped height profile layered with seeded jitter for a realistic, non-uniform bar pattern',
      'requestAnimationFrame playback loop using real delta-time (dt) instead of fixed-interval setInterval ticks',
      'Progress-based recoloring: elapsed/duration percentage maps directly to how many bars get the .played class',
      'Drag-to-seek and click-to-seek implemented with unified Pointer Events (mouse + touch, one code path)',
      'setPointerCapture keeps a fast drag tracked even when the pointer leaves the waveform element bounds',
      'CSS-driven color transition on bars keeps recoloring smooth without animating from JavaScript',
      'Play/pause icon swap and countdown time label stay perfectly synced to the same single source of truth (elapsed)',
    ],
    useCases: [
      { icon: 'APP', title: 'Chat application voice note UI', desc: 'Drop this directly into a messaging product to render inbound or outbound voice messages, matching the visual language of [chat-ui](/ui-snippets/chat-ui) and [mobile-chat-screen](/ui-snippets/mobile-chat-screen) bubbles already in this library.' },
      { icon: 'APP', title: 'Podcast or voicemail preview cards', desc: 'Reuse the waveform-plus-scrub pattern for voicemail transcription apps, short podcast clip previews, or customer-support call snippets where a full audio player would be too heavy for an inline card.' },
      { icon: 'DESIGN', title: 'Design system audio component reference', desc: 'Use as a starting reference implementation before wiring real Web Audio API decoding, since the recoloring and scrubbing logic stays identical — only the seeded generateBarHeights() function needs replacing with actual decoded amplitude data.' },
      { icon: 'LEARN', title: 'Teaching Pointer Events and rAF-based timers', desc: 'A compact example of three techniques every interactive UI developer eventually needs: seeded deterministic randomness, delta-time-based animation loops, and unified pointer-capture dragging — see also [audio-waveform-visualizer](/ui-snippets/audio-waveform-visualizer) for a related live-input take on waveform rendering.' },
      { icon: 'WEB', title: 'Marketing pages and product demo mockups', desc: 'Showcase a messaging or social product\'s voice-note feature on a landing page without shipping real audio files or an audio player library — the whole demo is simulated in JavaScript.' },
      { icon: 'CODE', title: 'Related: Smart App Banner', desc: 'See the [Smart App Banner](/ui-snippets/smart-app-banner/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this play real audio, or is the waveform simulated?', a: 'The waveform and playback timer are fully simulated with requestAnimationFrame and a fixed DURATION constant — no <audio> element or real audio file is involved. To wire it to real audio, create an Audio object, read its actual duration once metadata loads, and drive elapsed from its currentTime property inside a timeupdate listener instead of the manual dt accumulation, then call audio.currentTime = pct * audio.duration inside seekFromClientX for real seeking.' },
      { q: 'How are the waveform bar heights generated so they look realistic?', a: 'generateBarHeights() runs once and combines a slow sine wave (Math.sin(i * 0.42)) for gentle rise-and-fall shape with a seeded pseudo-random jitter for natural variation between adjacent bars. The seed uses a small linear congruential generator formula rather than Math.random(), so the exact same waveform pattern renders on every mount — a real recording does not change shape between plays, so the fake one should not either.' },
      { q: 'How do I change the number of bars or the message duration?', a: 'Edit the BAR_COUNT and DURATION constants at the top of the script. BAR_COUNT controls both how many <div class="bar"> elements are created in buildWaveform() and the resolution of the playedCount calculation, so more bars means finer-grained recoloring. DURATION is in seconds and is used both for the countdown label and for converting drag position into elapsed time in seekFromClientX.' },
      { q: 'Can I use this voice message bubble in React, Vue, or Angular?', a: 'Yes. Compute barHeights once with useMemo (React), as a computed value outside reactive state (Vue), or in ngOnInit (Angular) so it is never regenerated on re-render. The requestAnimationFrame loop should start in useEffect / onMounted / ngAfterViewInit and must be explicitly stopped with cancelAnimationFrame in the cleanup function (React\'s effect cleanup, onUnmounted, or ngOnDestroy) — leaving a rAF loop running after the component unmounts is a common source of "cannot update state on unmounted component" errors and wasted CPU.' },
      { q: 'Why use Pointer Events instead of separate mouse and touch listeners?', a: 'Pointer Events (pointerdown/pointermove/pointerup) unify mouse, touch, and stylus input into a single event model, so the same seekFromClientX logic handles a mouse drag on desktop and a finger swipe on mobile without any device detection or duplicated code paths. Combined with setPointerCapture, the drag also keeps receiving move events even if the pointer temporarily leaves the waveform element, which touch-specific or mouse-specific handlers do not guarantee on their own.' },
    ],
    aiPrompt: {
      paragraph: `Share this snippet's code with an AI assistant like Claude and ask it to explain exactly why generateBarHeights() is called once at load time instead of inside the render or animation loop — understanding that distinction is the difference between a stable waveform and a flickering one. From there, ask for a version wired to a real <audio> element and Web Audio API AnalyserNode for genuine amplitude data, a variant that shows a live recording indicator while capturing from the microphone, or support for multiple voice bubbles in one thread where only one can play at a time.`,
      prompt: `Build a chat-app voice message bubble in plain HTML, CSS, and JavaScript — no frameworks, no real audio file required.

Requirements:
- A rounded chat bubble containing a circular play/pause button and an inline waveform made of many thin vertical bars with varying heights.
- Generate the bar heights exactly once using a seeded pseudo-random function (not Math.random, so the shape is identical every time the page loads) combined with a slow sine-wave curve so the pattern looks like real speech rather than random noise, and cache the resulting array — never regenerate it inside an animation loop.
- Drive playback with a requestAnimationFrame loop that accumulates real delta-time between frames (not a fixed-interval setInterval) into an elapsed-seconds variable.
- On every frame, compute the percentage played (elapsed divided by total duration), convert it to a count of bars, and toggle a "played" class on that many bars from the left so they visibly recolor as playback advances, letting CSS handle the actual color transition.
- Support seeking by clicking anywhere on the waveform, and support continuous scrubbing by dragging across it, both implemented with Pointer Events (pointerdown/pointermove/pointerup) and setPointerCapture so a fast drag keeps tracking even past the element's edges.
- Show a duration/elapsed time label that counts down or up in sync with the same elapsed variable used for the waveform recoloring, and correctly stop playback (reverting the icon to "play") when the end of the duration is reached.`,
    },
  },
};

export default voiceMessageBubble;
