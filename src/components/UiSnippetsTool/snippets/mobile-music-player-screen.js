const mobileMusicPlayerScreen = {
  id: 'mobile-music-player-screen',
  title: 'Mobile Music Player Screen',
  lastmod: '2026-07-18',
  category: 'mobile',
  html: `<div class="mmp-phone">
  <div class="mmp-screen">
    <div class="mmp-status"><span>9:41</span><span class="mmp-batt"><i></i></span></div>
    <header class="mmp-head">
      <button class="mmp-chev" aria-label="Close">&#8964;</button>
      <div class="mmp-htitle"><small>Playing from</small><b>Focus Flow</b></div>
      <button class="mmp-menu" aria-label="More">&#8942;</button>
    </header>

    <div class="mmp-art" id="mmpArt">
      <div class="mmp-disc"></div>
    </div>

    <div class="mmp-meta">
      <div class="mmp-mtext">
        <b>Neon Skyline</b>
        <small>Midnight Arcade</small>
      </div>
      <button class="mmp-heart" id="mmpHeart" aria-label="Like">&#9825;</button>
    </div>

    <div class="mmp-seek">
      <div class="mmp-track" id="mmpTrack"><div class="mmp-fill" id="mmpFill"></div><div class="mmp-knob" id="mmpKnob"></div></div>
      <div class="mmp-times"><span id="mmpCur">0:00</span><span id="mmpDur">3:24</span></div>
    </div>

    <div class="mmp-controls">
      <button class="mmp-sh" id="mmpShuffle" aria-label="Shuffle">&#128256;</button>
      <button class="mmp-prev" aria-label="Previous">&#9198;</button>
      <button class="mmp-play" id="mmpPlay" aria-label="Play">&#9654;</button>
      <button class="mmp-next" aria-label="Next">&#9197;</button>
      <button class="mmp-rp" id="mmpRepeat" aria-label="Repeat">&#128257;</button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none;-ms-overflow-style:none}
html::-webkit-scrollbar{display:none}
body{font-family:system-ui,-apple-system,sans-serif;background:#1e293b;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px;scrollbar-width:none;-ms-overflow-style:none}
body::-webkit-scrollbar{display:none}

.mmp-phone{width:288px;height:600px;background:#0b1220;border-radius:46px;padding:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),inset 0 0 0 2px #1e293b}
.mmp-screen{width:100%;height:100%;border-radius:34px;overflow:hidden;background:linear-gradient(165deg,#3b0764,#831843 55%,#7c2d12);color:#fff;display:flex;flex-direction:column;padding:0 20px}
.mmp-status{display:flex;justify-content:space-between;align-items:center;padding:13px 4px 0;font-size:13px;font-weight:700}
.mmp-batt{width:22px;height:11px;border:1.4px solid currentColor;border-radius:3px;position:relative;display:inline-block}
.mmp-batt::after{content:'';position:absolute;right:-3px;top:3px;width:2px;height:5px;background:currentColor;border-radius:0 1px 1px 0}
.mmp-batt i{position:absolute;left:1.4px;top:1.4px;bottom:1.4px;width:70%;background:currentColor;border-radius:1px}

.mmp-head{display:flex;align-items:center;justify-content:space-between;padding:8px 0 4px}
.mmp-chev,.mmp-menu{background:none;border:none;color:#fff;font-size:18px;cursor:pointer;opacity:.85}
.mmp-htitle{text-align:center;line-height:1.2}
.mmp-htitle small{font-size:10px;opacity:.7;text-transform:uppercase;letter-spacing:.6px}
.mmp-htitle b{font-size:12.5px;display:block}

.mmp-art{margin:18px 0 22px;aspect-ratio:1;border-radius:20px;background:linear-gradient(135deg,#f472b6,#a855f7 50%,#38bdf8);display:flex;align-items:center;justify-content:center;box-shadow:0 22px 44px -14px rgba(0,0,0,.6);position:relative;overflow:hidden}
.mmp-art::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.4),transparent 45%)}
.mmp-disc{width:72px;height:72px;border-radius:50%;background:repeating-radial-gradient(circle,#1e1b2e 0 3px,#312244 3px 6px);border:6px solid rgba(0,0,0,.35);position:relative;z-index:1;animation:mmpSpin 5s linear infinite;animation-play-state:paused}
.mmp-disc::after{content:'';position:absolute;inset:29px;border-radius:50%;background:#f472b6}
.mmp-art.playing .mmp-disc{animation-play-state:running}
@keyframes mmpSpin{to{transform:rotate(360deg)}}

.mmp-meta{display:flex;align-items:center;gap:12px}
.mmp-mtext{flex:1}
.mmp-mtext b{font-size:19px;font-weight:800}
.mmp-mtext small{font-size:13px;opacity:.75;display:block;margin-top:2px}
.mmp-heart{background:none;border:none;color:#fff;font-size:22px;cursor:pointer;transition:transform .15s}
.mmp-heart.on{color:#fb7185}
.mmp-heart:active{transform:scale(.8)}

.mmp-seek{margin:22px 0 6px}
.mmp-track{height:5px;border-radius:99px;background:rgba(255,255,255,.25);position:relative;cursor:pointer}
.mmp-fill{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:99px;background:#fff}
.mmp-knob{position:absolute;top:50%;left:0;width:13px;height:13px;border-radius:50%;background:#fff;transform:translate(-50%,-50%);box-shadow:0 2px 6px rgba(0,0,0,.4)}
.mmp-times{display:flex;justify-content:space-between;font-size:11px;opacity:.75;margin-top:8px;font-variant-numeric:tabular-nums}

.mmp-controls{display:flex;align-items:center;justify-content:space-between;margin:14px 0 26px}
.mmp-controls button{background:none;border:none;color:#fff;cursor:pointer}
.mmp-prev,.mmp-next{font-size:26px}
.mmp-sh,.mmp-rp{font-size:16px;opacity:.7}
.mmp-sh.on,.mmp-rp.on{opacity:1;color:#fb7185}
.mmp-play{width:60px;height:60px;border-radius:50%;background:#fff;color:#831843;font-size:22px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 22px -6px rgba(0,0,0,.5);transition:transform .15s}
.mmp-play:active{transform:scale(.92)}`,

  js: `var DUR = 204;
var cur = 0;
var playing = false;
var timer = null;

var art = document.getElementById('mmpArt');
var playBtn = document.getElementById('mmpPlay');
var fill = document.getElementById('mmpFill');
var knob = document.getElementById('mmpKnob');
var track = document.getElementById('mmpTrack');
var curEl = document.getElementById('mmpCur');

function fmt(s){ var m = Math.floor(s/60); var r = Math.floor(s%60); return m + ':' + (r<10?'0':'') + r; }
function render(){
  var pct = (cur / DUR) * 100;
  fill.style.width = pct + '%';
  knob.style.left = pct + '%';
  curEl.textContent = fmt(cur);
}

function play(){
  playing = true;
  playBtn.innerHTML = '&#10074;&#10074;';
  playBtn.setAttribute('aria-label','Pause');
  art.classList.add('playing');
  timer = setInterval(function(){
    cur++;
    if (cur >= DUR){ cur = 0; }
    render();
  }, 1000);
}
function pause(){
  playing = false;
  playBtn.innerHTML = '&#9654;';
  playBtn.setAttribute('aria-label','Play');
  art.classList.remove('playing');
  clearInterval(timer);
}
playBtn.addEventListener('click', function(){ playing ? pause() : play(); });

function seekTo(e){
  var rect = track.getBoundingClientRect();
  var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  var pct = Math.max(0, Math.min(1, x / rect.width));
  cur = Math.round(pct * DUR);
  render();
}
track.addEventListener('click', seekTo);
var dragging = false;
knob.addEventListener('pointerdown', function(e){ dragging = true; e.preventDefault(); });
window.addEventListener('pointermove', function(e){ if (dragging) seekTo(e); });
window.addEventListener('pointerup', function(){ dragging = false; });

document.getElementById('mmpHeart').addEventListener('click', function(){
  this.classList.toggle('on');
  this.innerHTML = this.classList.contains('on') ? '&#10084;' : '&#9825;';
});
document.getElementById('mmpShuffle').addEventListener('click', function(){ this.classList.toggle('on'); });
document.getElementById('mmpRepeat').addEventListener('click', function(){ this.classList.toggle('on'); });

render();`,

  seo: {
    title: 'Mobile Music Player Screen — Free HTML CSS JS UI',
    description: `A full-screen music player with spinning album art, a draggable seek bar, a working play/pause clock, and mode toggles. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Mobile Music Player Screen — Now Playing UI',
      description: `A now-playing screen is the emotional center of a music app — big album art, the track title, a scrubbable progress bar, and a ring of transport controls. This snippet builds a complete, functional one inside a CSS phone frame: the play button starts a real elapsed-time clock, the artwork disc spins only while playing, and the seek bar is draggable with the pointer — in HTML, CSS, and vanilla JavaScript with no dependency or audio file.

**A play state that drives everything**

Tapping play sets a \`playing\` flag, swaps the button glyph to a pause bar, and starts a \`setInterval\` that increments the current time every second and re-renders the progress bar. Pausing clears the interval and restores the play glyph. A single \`render()\` function converts the elapsed seconds into a percentage for the fill width and knob position and formats the \`m:ss\` time, so the visual bar and the clock can never disagree.

**The spinning record, tied to playback**

The album art holds a small vinyl disc drawn entirely in CSS with a \`repeating-radial-gradient\` for the grooves and a pink center label. It has a continuous rotation animation that is \`paused\` by default; adding a \`.playing\` class flips \`animation-play-state\` to \`running\`, so the record spins only while the track plays and freezes the instant you pause — a small, satisfying detail that needs no JavaScript beyond the class toggle.

**A draggable seek bar**

The progress track responds to both a click-to-seek and a drag on the knob using Pointer Events. Clicking anywhere jumps the time to that fraction; pressing the knob starts a drag that follows \`pointermove\` on the window (so the finger can leave the bar) and releases on \`pointerup\`. The seek math clamps the ratio to \`0..1\` so you can never scrub past either end, and it reads \`clientX\` from touch or mouse events alike.

**Transport toggles**

Like, shuffle, and repeat are independent toggle buttons that flip an accent color, mirroring how these persistent modes work in real players versus the momentary previous/next buttons. The like heart also swaps between outline and filled.

**Accessibility and performance**

Every transport control is a real \`<button>\` with an \`aria-label\` that updates between "Play" and "Pause" as the state changes, so screen readers always announce the current action. When you adapt this for production, the seek bar should become a proper \`role="slider"\` with \`aria-valuenow\`, \`aria-valuemin\`, and \`aria-valuemax\` plus arrow-key handling so it is operable without a pointer — the visual track is already in place to style over. Performance is careful about the two moving parts: the vinyl spin is a pure CSS animation whose play state is toggled by a class, so it never touches JavaScript per frame, and the seek drag reads \`clientX\` and writes two style values without triggering layout in a loop. The one-second interval that advances the clock is the only timer, and it does a single percentage calculation per tick. Swapping the interval for an \`<audio>\` element's \`timeupdate\` event removes even that, letting the browser drive both the audio and the progress bar from one source.

**Reusing it**

Point the play/pause and seek at a real \`<audio>\` element — bind \`currentTime\`, \`duration\`, and the \`timeupdate\` event instead of the interval — and feed the art and metadata from your track data. Lift it out of the phone frame for a responsive web player, or keep it framed beside a [music player](/ui-snippets/music-player/) mini-bar to present a full listening experience.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A full-screen now-playing view renders with album art and transport controls.` },
      { title: 'Press play', text: `The elapsed time starts counting, the progress bar fills, and the vinyl disc begins spinning.` },
      { title: 'Pause it', text: `The clock stops, the button returns to a play triangle, and the disc freezes in place.` },
      { title: 'Scrub the track', text: `Click anywhere on the seek bar to jump, or drag the knob to scrub to any position.` },
      { title: 'Like the song', text: `The heart toggles between outline and a filled pink state.` },
      { title: 'Toggle shuffle and repeat', text: `Each mode button flips its accent color independently.` },
    ] },
    features: [
      { title: 'Real elapsed clock', text: `setInterval drives a live m:ss timer.` },
      { title: 'Play-linked spin', text: `animation-play-state toggles the vinyl record.` },
      { title: 'CSS vinyl disc', text: `Grooves drawn with a repeating-radial-gradient.` },
      { title: 'Draggable seek bar', text: `Pointer Events with click-to-seek and knob drag.` },
      { title: 'Clamped scrubbing', text: `Ratio clamped to 0..1 so you never overshoot.` },
      { title: 'One render function', text: `Bar and clock always stay in sync.` },
      { title: 'Mode toggles', text: `Like, shuffle, and repeat flip accent colors.` },
      { title: 'No dependency', text: `Pure HTML, CSS, and vanilla JavaScript.` },
    ],
    useCases: [
      { title: 'Music app now-playing views', text: 'Show spinning album art on a CSS vinyl disc whose rotation pauses with `animation-play-state` when playback stops, beside a compact [music player](/ui-snippets/music-player/) bar.' },
      { title: 'Podcast and audio players', text: 'Replace the seek bar with an [audio waveform visualiser](/ui-snippets/audio-waveform-visualizer/) for spoken audio, keeping the same elapsed-time clock.' },
      { title: 'Transport and volume controls', text: 'Pair the controls with a [volume control](/ui-snippets/volume-control/), with Pointer Events handling click-to-seek and knob dragging on the progress bar.' },
      { title: 'Lock-screen media widgets', text: 'Match the player to a [mobile lock screen](/ui-snippets/mobile-lock-screen/), where the same track and elapsed time appear as a compact notification.' },
      { title: 'Pointer-driven scrubbing reference', text: 'Study how one handler supports both clicking to seek and dragging the knob, using `setInterval` for a live m:ss clock.' },
      { icon: 'CODE', title: 'Related: Mobile Food Order Screen', desc: 'See the [Mobile Food Order Screen](/ui-snippets/mobile-food-order-screen/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the progress bar reflect real audio?', a: `In the demo it is driven by a setInterval that increments a counter each second and loops at the track length. To play real audio, create an audio element, start it on play, and update the bar from its timeupdate event using currentTime and duration instead of the interval. The render function stays the same — only the time source changes.` },
      { q: 'How does the vinyl record spin only while playing?', a: `The disc has a continuous rotation keyframe that is set to animation-play-state: paused by default. Playing adds a .playing class that switches it to running, and pausing removes the class. Because animation-play-state freezes and resumes without resetting, the record picks up exactly where it stopped.` },
      { q: 'How does the draggable seek bar work?', a: `The track listens for a click to seek and uses Pointer Events for dragging: pressing the knob sets a dragging flag, pointermove on the window updates the position so your finger can leave the bar, and pointerup ends the drag. The x offset is converted to a 0-to-1 ratio, clamped so you cannot scrub past either end, and mapped to the current time.` },
      { q: 'Why are shuffle and repeat separate from previous and next?', a: `Shuffle and repeat are persistent modes, so they are toggle buttons that keep an on state and accent color. Previous and next are momentary actions that fire once, so they are plain buttons. This mirrors how real players distinguish sticky modes from one-shot skips.` },
      { q: 'How do I use this player in React, Vue, or Angular?', a: `Hold playing, currentTime, and the toggle states in state, and drive them from a real audio ref. Start and stop it in a handler, and update currentTime from the audio timeupdate event in a useEffect (React), watcher (Vue), or ngZone callback (Angular). Bind the fill width and playing class to state rather than mutating the DOM. Tailwind expresses the gradients and controls with utilities.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to mentally simulate the timer and drag logic to see how they fit together. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the single render() function keeps the progress fill width, knob position, and elapsed-time label from ever disagreeing, or why the vinyl disc's rotation animation is toggled with animation-play-state rather than being started and stopped by adding and removing the animation itself. The same assistant is useful for optimizing it — ask whether the setInterval-per-second clock could drift compared to driving progress off a real audio element's timeupdate event, or whether the pointermove listener attached to the whole window while dragging the knob needs to be removed correctly to avoid leaking listeners across repeated drags. It is just as good for extending the feature: have it wire the transport to a real HTMLAudioElement, add a queue/up-next drawer, or make the seek bar a proper ARIA slider with arrow-key support. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a full-screen mobile now-playing music player in plain HTML, CSS, and JavaScript inside a phone-frame container — no audio library, no real audio file required.

Requirements:
- A header with a collapse button, a "playing from" label plus playlist name, and a more-options button; album art area containing a CSS-only spinning vinyl disc (grooves drawn with a repeating-radial-gradient, a solid center label) whose rotation keyframe animation is paused by default.
- Track title, artist, and a like/heart toggle button; a seek bar consisting of a track, a fill element, and a draggable knob, plus elapsed and total time labels formatted as minutes colon seconds.
- Implement a single render function that is the only place that reads the current elapsed seconds and writes the fill width percentage, the knob's left position percentage, and the formatted elapsed-time text, so those three outputs can never fall out of sync with each other.
- Play/pause must be driven by one boolean state: pressing play starts a repeating one-second interval that increments elapsed time (looping back to zero at the track duration) and calls render each tick, swaps the button icon and aria-label, and adds a class to the album art that switches the disc's animation-play-state from paused to running; pausing must clear the interval, revert the icon and aria-label, and remove that class so the disc freezes in place rather than resetting.
- Implement seeking two ways using Pointer Events: clicking anywhere on the track jumps directly to that position, and pressing down on the knob begins a drag that continues tracking pointermove events on the whole window (not just the track element) until pointerup, so the drag keeps working even if the pointer leaves the track's bounds; the resulting position ratio must be clamped between 0 and 1 before being converted into the current time.
- Independent toggle buttons for like, shuffle, and repeat that flip an accent color and, for the heart, swap between outline and filled icon glyphs, kept clearly distinct from momentary previous/next buttons that do not carry a persistent toggled state.`,
    },
  },
};

export default mobileMusicPlayerScreen;
