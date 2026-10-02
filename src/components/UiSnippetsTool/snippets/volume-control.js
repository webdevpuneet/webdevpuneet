const volumeControl = {
  id: 'volume-control',
  title: 'Volume Control',
  lastmod: '2026-07-18',
  category: 'forms',
  html: `<div class="vol-card">
  <button type="button" class="vol-icon" id="volIcon" aria-label="Mute"></button>
  <div class="vol-track" id="volTrack" role="slider" tabindex="0"
       aria-label="Volume" aria-valuemin="0" aria-valuemax="100" aria-valuenow="60">
    <div class="vol-fill" id="volFill"></div>
    <div class="vol-knob" id="volKnob"></div>
  </div>
  <span class="vol-pct" id="volPct">60</span>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.vol-card{display:flex;align-items:center;gap:14px;background:#1e293b;border:1px solid #334155;border-radius:14px;padding:16px 20px;width:100%;max-width:340px}

.vol-icon{width:34px;height:34px;flex-shrink:0;border:none;border-radius:9px;background:#334155;color:#e2e8f0;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s}
.vol-icon:hover{background:#3e4c63}
.vol-icon.muted{background:#7f1d1d;color:#fca5a5}
.vol-icon svg{width:19px;height:19px}

.vol-track{position:relative;flex:1;height:8px;border-radius:5px;background:#334155;cursor:pointer;touch-action:none;outline:none}
.vol-track:focus-visible{box-shadow:0 0 0 3px rgba(56,189,248,.45)}
.vol-fill{position:absolute;left:0;top:0;height:100%;border-radius:5px;background:#38bdf8;width:60%}
.vol-knob{position:absolute;top:50%;left:60%;width:18px;height:18px;border-radius:50%;background:#fff;border:2px solid #38bdf8;transform:translate(-50%,-50%);box-shadow:0 2px 6px rgba(0,0,0,.4);transition:transform .12s}
.vol-track:active .vol-knob,.vol-track:focus-visible .vol-knob{transform:translate(-50%,-50%) scale(1.18)}
.vol-card.muted .vol-fill{background:#64748b}
.vol-card.muted .vol-knob{border-color:#64748b}

.vol-pct{font-size:13px;font-weight:800;color:#cbd5e1;min-width:26px;text-align:right;font-variant-numeric:tabular-nums}`,

  js: `var card = document.querySelector('.vol-card');
var track = document.getElementById('volTrack');
var fill = document.getElementById('volFill');
var knob = document.getElementById('volKnob');
var pct = document.getElementById('volPct');
var iconBtn = document.getElementById('volIcon');

var volume = 60;
var muted = false;
var lastVolume = 60; // restore point when un-muting

var ICONS = {
  mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>',
  low: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.5 8.5a5 5 0 0 1 0 7"></path></svg>',
  high: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M19 5a9 9 0 0 1 0 14"></path></svg>',
};

function paint() {
  var shown = muted ? 0 : volume;
  fill.style.width = shown + '%';
  knob.style.left = shown + '%';
  pct.textContent = shown;
  track.setAttribute('aria-valuenow', String(shown));
  card.classList.toggle('muted', muted);
  iconBtn.classList.toggle('muted', muted);
  iconBtn.innerHTML = muted || volume === 0 ? ICONS.mute : volume < 50 ? ICONS.low : ICONS.high;
}

function setVolume(v) {
  volume = Math.max(0, Math.min(100, Math.round(v)));
  if (volume > 0) muted = false;
  if (volume > 0) lastVolume = volume;
  paint();
}

// Convert a clientX into a 0-100 volume from the track geometry.
function fromPointer(clientX) {
  var r = track.getBoundingClientRect();
  setVolume(((clientX - r.left) / r.width) * 100);
}

var dragging = false;
track.addEventListener('pointerdown', function (e) {
  dragging = true;
  track.setPointerCapture(e.pointerId);
  fromPointer(e.clientX);
});
track.addEventListener('pointermove', function (e) { if (dragging) fromPointer(e.clientX); });
track.addEventListener('pointerup', function () { dragging = false; });

track.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { setVolume(volume + 5); e.preventDefault(); }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { setVolume(volume - 5); e.preventDefault(); }
  else if (e.key === 'Home') { setVolume(0); e.preventDefault(); }
  else if (e.key === 'End') { setVolume(100); e.preventDefault(); }
});

iconBtn.addEventListener('click', function () {
  muted = !muted;
  if (!muted && volume === 0) volume = lastVolume || 50;
  paint();
});

paint();`,

  seo: {
    title: 'Volume Control — Free Custom Slider HTML CSS JS Snippet',
    description: `A draggable volume slider with a speaker icon, mute toggle that remembers the level, keyboard control, and dynamic icons. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Volume Control — Custom Draggable Volume Slider',
      description: `A volume control is the speaker-plus-slider you find in every media player, video app, and sound settings panel. This snippet builds a polished, fully custom one — not a styled \`<input type=range>\` — in HTML, CSS, and vanilla JavaScript, with pointer dragging, a mute button that remembers the last level, full keyboard support, and a speaker icon that changes with the volume. No library, no audio dependency.

**A custom track, not a native range**

The track is a plain div with an absolutely-positioned \`fill\` and a round \`knob\` whose \`left\` is a percentage. Building it by hand (instead of restyling \`<input type=range>\`, which is notoriously inconsistent across browsers) gives total control over the knob size, the focus ring, and the active scale animation. \`touch-action:none\` on the track stops the browser from scrolling the page while you drag on touch devices.

**Pointer Events for unified drag**

A single set of Pointer Events handles mouse, touch, and pen identically. On \`pointerdown\` the track calls \`setPointerCapture\`, so dragging keeps tracking even when the cursor leaves the element, and \`fromPointer()\` converts \`clientX\` into a 0–100 value using \`getBoundingClientRect()\`. That one geometry function powers both the initial click-to-seek and continuous dragging.

**Mute that remembers**

The speaker button toggles \`muted\`, which renders the fill at zero without losing the real \`volume\`. A \`lastVolume\` variable stores the level so un-muting restores exactly where you were — and dragging the slider above zero auto-un-mutes, matching how native players behave. The icon swaps between muted, low, and high SVGs based on the current state, so the glyph always reflects what you'll hear.

**Accessible slider semantics**

The track uses \`role="slider"\` with \`aria-valuemin\`, \`aria-valuemax\`, and a live \`aria-valuenow\`, and is focusable via \`tabindex="0"\`. Arrow keys nudge by 5, Home and End jump to mute and max, and the focus-visible ring plus a scaled knob make the keyboard state obvious — so it's operable and announced correctly without a mouse.

**Wiring to audio**

Point \`setVolume()\` at a real sink: set \`audioElement.volume = shown / 100\` (the HTML5 media API expects 0–1) or a Web Audio \`GainNode.gain.value\`. Because every change funnels through \`setVolume()\` and \`paint()\`, syncing the UI to actual playback — including external volume changes — is a one-line addition.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A speaker icon, a track, and a percentage render in a row.` },
      { title: 'Drag the knob', text: `Pointer dragging sets the volume and the fill follows your finger or cursor.` },
      { title: 'Click anywhere on the track', text: `The knob jumps to that point — click-to-seek and drag share one function.` },
      { title: 'Press the speaker to mute', text: `The fill drops to zero but your level is remembered for un-muting.` },
      { title: 'Use the keyboard', text: `Focus the track and press arrows to nudge, Home and End to jump.` },
      { title: 'Connect to audio', text: `Set audio.volume = value / 100 inside setVolume().` },
    ] },
    features: [
      { title: 'Fully custom track', text: `Hand-built div slider, not a restyled input range.` },
      { title: 'Pointer Events', text: `One code path for mouse, touch, and pen with pointer capture.` },
      { title: 'Click-to-seek', text: `Tapping the track jumps the knob via shared geometry math.` },
      { title: 'Mute with memory', text: `Un-muting restores the exact prior level.` },
      { title: 'Dynamic speaker icon', text: `Muted, low, and high glyphs follow the volume.` },
      { title: 'Keyboard control', text: `Arrows, Home, and End with a focus-visible ring.` },
      { title: 'ARIA slider', text: `role=slider with live aria-valuenow for screen readers.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS — drop it onto any player.` },
    ],
    useCases: [
      { title: 'Media player levels', text: 'Control playback volume next to a [video player](/ui-snippets/video-player/), with a mute toggle that remembers the previous level on un-mute.' },
      { title: 'Music and audio apps', text: 'Pair with a [music player](/ui-snippets/music-player/) transport bar, with the speaker icon changing as the level crosses thresholds.' },
      { title: 'Recording monitor levels', text: 'Set a monitor level beside an [audio waveform visualiser](/ui-snippets/audio-waveform-visualizer/) while recording voice or music in the browser.' },
      { title: 'Sound settings panels', text: 'Drop the control into a [settings panel](/ui-snippets/settings-panel/) for sound preferences, with full keyboard control for accessibility.' },
      { title: 'Custom slider reference', text: 'Reuse the drag maths for a [range slider](/ui-snippets/range-slider/), and learn Pointer Events with capture for mouse, touch and pen.' },
    ],
    faqs: [
      { q: 'Why build a custom slider instead of input type=range?', a: `Native range inputs are hard to style consistently — the track, thumb, and focus ring differ across browsers and need vendor pseudo-elements. A custom div track gives full control over the knob, the active scale, and the focus ring, while role=slider plus aria-valuenow restores the accessibility you'd otherwise get for free.` },
      { q: 'How does dragging work on both mouse and touch?', a: `It uses Pointer Events, which unify mouse, touch, and pen. On pointerdown the track calls setPointerCapture so it keeps receiving moves even if the pointer leaves, and fromPointer() turns clientX into a 0–100 value using getBoundingClientRect(). touch-action:none prevents the page from scrolling mid-drag.` },
      { q: 'Does muting lose my volume level?', a: `No. Muting sets a flag that renders the fill at zero but leaves the real volume untouched, and a lastVolume variable stores your level so un-muting returns to exactly where you were. Dragging above zero also auto-un-mutes, matching native media players.` },
      { q: 'Can I control it with the keyboard?', a: `Yes. The track is focusable and listens for keys: ArrowRight/Up and ArrowLeft/Down nudge by 5, Home mutes to 0, and End jumps to 100. A focus-visible ring and a slightly enlarged knob make the focused state clear, and aria-valuenow updates so screen readers announce the level.` },
      { q: 'How do I use this volume control in React, Vue, or Angular?', a: `Hold volume and muted in state and bind the fill width and knob left to the shown value. Attach the pointer handlers to a ref and set audio.volume = value / 100 in the setter. Put nothing in a global; the logic is self-contained. In Tailwind, position the fill and knob with inline styles for the percentage and use utilities for the rest.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the drag math by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why fromPointer() and the initial click both funnel through setVolume() rather than each having their own logic, and how setPointerCapture on pointerdown keeps a drag tracking correctly even once the cursor moves outside the track's bounding box. It's also worth asking about the mute/lastVolume interaction — have it walk through what happens to lastVolume across a mute, an unmute, and then a fresh drag, to confirm there's no case where the remembered level gets silently lost. For extending it, have it add a scroll-wheel handler that nudges volume on the track, persist the last volume setting to localStorage across page loads, or add a small numeric tooltip that follows the knob while dragging. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a fully custom volume slider (not a styled native range input) in plain HTML, CSS, and vanilla JavaScript with no libraries, using the Pointer Events API for unified mouse/touch/pen dragging.

Requirements:
- A track element built from a div (not input type=range) containing an absolutely positioned fill bar and a circular knob, both driven by inline percentage widths/positions computed in JavaScript rather than CSS-only.
- On pointerdown on the track, call setPointerCapture with the event's pointerId so that subsequent pointermove events keep being received by the track even if the cursor moves outside its bounding rectangle during a fast drag; on pointerup, end the drag.
- A single geometry function that converts a clientX coordinate into a 0-100 volume value using the track's getBoundingClientRect, used identically for both an initial click-to-seek and continuous dragging — do not duplicate this math between the two interactions.
- A mute toggle button that hides the current volume (renders the fill at zero) without discarding the actual numeric volume value, remembering the pre-mute level in a separate variable so clicking unmute restores exactly that prior value; dragging the slider to any value above zero must also automatically clear the muted state.
- A speaker icon that swaps between three distinct SVG glyphs (muted, low volume, high volume) based on whether the control is currently muted or zero, below a threshold, or above it.
- Full keyboard operability: the track must be focusable, and ArrowUp/ArrowRight must increase volume by a fixed step, ArrowDown/ArrowLeft must decrease it, Home must set it to zero, and End must set it to one hundred, each with a visible focus ring distinguishing keyboard interaction from mouse hover.
- Proper ARIA slider semantics: role="slider" with aria-valuemin, aria-valuemax, and a live aria-valuenow that updates on every change.`,
    },
  },
};

export default volumeControl;
