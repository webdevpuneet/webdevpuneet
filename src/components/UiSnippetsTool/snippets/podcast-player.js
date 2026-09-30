const podcastPlayer = {
  id: 'podcast-player',
  title: 'Podcast Player with Speed & Skip Controls',
  lastmod: '2026-08-17',
  category: 'media',
  html: `<div class="demo">
  <div class="player">
    <div class="cover">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    </div>
    <div class="info">
      <div class="ep-title">The Long Road to Product-Market Fit</div>
      <div class="ep-sub">Founder Stories · Episode 42</div>
    </div>
    <div class="progress-wrap">
      <span class="time" id="curTime">0:00</span>
      <input type="range" id="seek" class="seek" min="0" max="100" value="0" step="0.1" aria-label="Seek">
      <span class="time" id="durTime">24:18</span>
    </div>
    <div class="controls">
      <button class="ctrl-btn" id="speedBtn" onclick="cycleSpeed()">1x</button>
      <button class="ctrl-btn" onclick="skip(-15)" aria-label="Back 15 seconds">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 4 3 9 8 9"/></svg>
        <span class="ctrl-num">15</span>
      </button>
      <button class="play-btn" id="playBtn" onclick="togglePlay()" aria-label="Play">
        <svg id="playIcon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <button class="ctrl-btn" onclick="skip(30)" aria-label="Forward 30 seconds">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-3-6.7"/><polyline points="21 4 21 9 16 9"/></svg>
        <span class="ctrl-num">30</span>
      </button>
      <button class="ctrl-btn vol-btn" onclick="toggleMute()" id="volBtn" aria-label="Mute">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/></svg>
      </button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8f9fa; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 100%; max-width: 380px; }
.player { background: #14151a; border-radius: 18px; padding: 20px; color: #fff; box-shadow: 0 16px 40px rgba(0,0,0,0.18); }
.cover { width: 100%; aspect-ratio: 16/7; border-radius: 12px; background: linear-gradient(135deg, #4c1d95, #6d28d9 45%, #db2777); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
.info { text-align: center; margin-bottom: 16px; }
.ep-title { font-size: 15px; font-weight: 700; margin-bottom: 3px; }
.ep-sub { font-size: 12px; color: #9ca3af; }
.progress-wrap { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.time { font-size: 11px; color: #9ca3af; font-variant-numeric: tabular-nums; width: 34px; flex-shrink: 0; }
.time:last-child { text-align: right; }
.seek { flex: 1; -webkit-appearance: none; appearance: none; height: 4px; border-radius: 999px; background: linear-gradient(to right, #db2777 var(--p, 0%), #33343a var(--p, 0%)); cursor: pointer; }
.seek::-webkit-slider-thumb { -webkit-appearance: none; width: 13px; height: 13px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.4); }
.seek::-moz-range-thumb { width: 13px; height: 13px; border-radius: 50%; background: #fff; border: none; }
.controls { display: flex; align-items: center; justify-content: center; gap: 14px; }
.ctrl-btn { position: relative; background: none; border: none; color: #d1d5db; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 50%; transition: background 0.15s; }
.ctrl-btn:hover { background: rgba(255,255,255,0.08); }
.ctrl-num { position: absolute; font-size: 8px; font-weight: 700; }
#speedBtn { width: auto; padding: 0 8px; font-size: 12px; font-weight: 700; }
.play-btn { width: 52px; height: 52px; border-radius: 50%; background: #fff; color: #14151a; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
.play-btn:hover { background: #f0f0f0; }`,
  js: `var isPlaying = false;
var duration = 24 * 60 + 18;
var current = 0;
var timer = null;
var speeds = [1, 1.25, 1.5, 2, 0.75];
var speedIndex = 0;
var muted = false;

var seek = document.getElementById('seek');
var curTime = document.getElementById('curTime');
var playIcon = document.getElementById('playIcon');
var playBtn = document.getElementById('playBtn');

function formatTime(s) {
  s = Math.max(0, Math.round(s));
  var m = Math.floor(s / 60);
  var r = s % 60;
  return m + ':' + (r < 10 ? '0' : '') + r;
}

function updateUI() {
  var pct = (current / duration) * 100;
  seek.value = pct;
  seek.style.setProperty('--p', pct + '%');
  curTime.textContent = formatTime(current);
}

function togglePlay() {
  isPlaying = !isPlaying;
  playIcon.innerHTML = isPlaying
    ? '<rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/>'
    : '<path d="M8 5v14l11-7z"/>';
  playBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
  if (isPlaying) {
    timer = setInterval(function() {
      current += 0.25 * speeds[speedIndex];
      if (current >= duration) { current = duration; togglePlay(); }
      updateUI();
    }, 250);
  } else {
    clearInterval(timer);
  }
}

function skip(sec) {
  current = Math.max(0, Math.min(duration, current + sec));
  updateUI();
}

function cycleSpeed() {
  speedIndex = (speedIndex + 1) % speeds.length;
  document.getElementById('speedBtn').textContent = speeds[speedIndex] + 'x';
}

function toggleMute() {
  muted = !muted;
  document.getElementById('volBtn').style.opacity = muted ? '0.4' : '1';
}

seek.addEventListener('input', function() {
  current = (seek.value / 100) * duration;
  updateUI();
});

updateUI();`,
  seo: {
    title: 'Podcast Player — Speed & Skip Controls Snippet',
    description: 'Custom podcast/audio player UI with a styled seek bar, 15/30s skip buttons, and a playback-speed cycler. Exports to React, Vue & Angular.',
    about: {
      title: 'Podcast Player — Custom Seek Bar, Skip Controls, and a Playback-Speed Cycler',
      description: `Browsers already ship a native \`<audio>\` element with default controls, but every podcast app replaces it with a custom player for the same three reasons: the native seek bar can't be restyled cross-browser, skip-15/skip-30 buttons aren't a native feature, and there's no built-in speed cycler. This snippet demonstrates the UI layer of that custom player, wired against a simulated timeline so it works standalone with no audio file required.\n\n**Styling a native range input as a seek bar**\n\nThe seek bar is a real \`<input type="range">\`, not a custom-built div, which gets keyboard operability (arrow keys move it once focused) for free. Its default styling is stripped with \`appearance: none\`, and the filled portion is drawn using a \`linear-gradient\` background with a CSS custom property: \`background: linear-gradient(to right, #db2777 var(--p, 0%), #33343a var(--p, 0%))\`. JavaScript updates only the \`--p\` custom property on every tick — \`seek.style.setProperty('--p', pct + '%')\` — rather than rewriting the whole gradient string, which is a cheap single-property update instead of a full style recalculation. The thumb is restyled separately for WebKit (\`::-webkit-slider-thumb\`) and Firefox (\`::-moz-range-thumb\`), since range-input pseudo-elements have never been unified across browsers.\n\n**Simulated playback timeline**\n\nSince there's no audio file, \`togglePlay()\` starts a \`setInterval\` that increments a \`current\` seconds counter by \`0.25 × speeds[speedIndex]\` every 250ms — multiplying the tick size by the active speed multiplier is what makes the timeline visibly race ahead at 2x and crawl at 0.75x, rather than just changing a label. Wiring this to a real \`<audio>\` element means deleting the interval entirely and instead listening to \`audio.ontimeupdate\` for \`current\`, calling \`audio.play()\`/\`audio.pause()\` from \`togglePlay()\`, and setting \`audio.playbackRate\` directly in \`cycleSpeed()\`.\n\n**Skip buttons with an inline number**\n\nThe 15-second-back and 30-second-forward buttons overlay a small \`<span class="ctrl-num">\` with the number directly on top of the rounded-arrow icon — the same visual convention every major podcast app uses instead of a plain "-15s" text button, because the icon plus overlaid number reads faster at a glance than a text label would.\n\n**Speed cycler**\n\n\`cycleSpeed()\` steps through a fixed array \`[1, 1.25, 1.5, 2, 0.75]\` with \`(speedIndex + 1) % speeds.length\`, wrapping back to 1x after 0.75x. The array order is deliberate — it visits the most commonly used speeds (1x, 1.25x, 1.5x) before the extremes, so a user who only ever wants "a bit faster" doesn't have to cycle through every increment to get there.\n\n**Time formatting**\n\n\`formatTime()\` converts raw seconds into \`m:ss\`, zero-padding the seconds with a manual \`r < 10 ? '0' : ''\` check rather than \`padStart\`, which keeps the function dependency-free and trivially portable into older environments if needed. \`font-variant-numeric: tabular-nums\` on the time labels prevents the digits from shifting width as they change — without it, a "9" next to a "1" occupies different horizontal space in most fonts, making the countdown visibly jitter.\n\n**Wiring to a real audio file**\n\nAdd a hidden \`<audio id="track" src="episode.mp3">\` element, set \`duration\` from its \`loadedmetadata\` event (\`audio.duration\`) instead of the hardcoded value, and replace every manual \`current\` update with reads from \`audio.currentTime\`. The seek bar's \`input\` event should set \`audio.currentTime = (seek.value / 100) * audio.duration\` directly.\n\nSee also the [audio waveform visualizer](/ui-snippets/audio-waveform-visualizer/) for a variant that reacts to real frequency data, and the [flip clock](/ui-snippets/flip-clock/) for another tabular-nums time-display use case.`,
    },
    howToUse: [
      { title: 'Copy the player markup', text: 'The .player card contains a cover art block, episode title/subtitle, a range-input seek bar with time labels, and a row of control buttons.' },
      { title: 'Connect a real audio element', text: 'Add a hidden <audio> element with your episode\'s src, set duration from its loadedmetadata event, and drive current from its timeupdate event instead of the demo\'s setInterval.' },
      { title: 'Wire play/pause to the audio element', text: 'In togglePlay(), call audio.play() and audio.pause() instead of starting/clearing the simulated interval.' },
      { title: 'Wire the speed cycler to playbackRate', text: 'In cycleSpeed(), set audio.playbackRate = speeds[speedIndex] directly after updating the button label.' },
      { title: 'Wire skip buttons to currentTime', text: 'In skip(sec), set audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + sec)) instead of updating the local current variable.' },
    ],
    features: [
      'Native <input type="range"> seek bar restyled with a CSS custom-property-driven gradient fill',
      '15-second-back and 30-second-forward skip buttons with an overlaid number on the icon',
      'Playback-speed cycler stepping through 1x, 1.25x, 1.5x, 2x, 0.75x',
      'Simulated playback timeline works standalone with no audio file required',
      'tabular-nums time display prevents digit-width jitter as the counter updates',
      'Mute toggle with a dimmed icon state',
      'Cross-browser thumb styling for both WebKit and Firefox range inputs',
      'Ready to wire directly to a real <audio> element — see the How to Use steps',
    ],
    useCases: [
      { icon: 'APP', title: 'Podcast Apps', desc: 'Episode players inside a podcast web app or embedded episode page' },
      { icon: 'CARD', title: 'Audiobook Players', desc: 'Chapter-based playback with speed control for long-form audio content' },
      { icon: 'CODE', title: 'Course & Lecture Platforms', desc: 'Lesson audio players alongside a [video player](/ui-snippets/video-player/) for mixed-media courses' },
      { icon: 'DOC', title: 'Voice Memo & Recording Tools', desc: 'Playback UI for recorded notes, paired with a [signature pad](/ui-snippets/signature-pad/) style capture flow' },
    ],
    faqs: [
      { q: 'How do I connect this to a real audio file?', a: 'Add a hidden <audio src="episode.mp3"> element. Set duration from its loadedmetadata event, drive the UI from its timeupdate event instead of the demo setInterval, and call audio.play()/audio.pause() from togglePlay().' },
      { q: 'Why is the seek bar a real range input instead of a custom div?', a: 'A native range input is keyboard-operable (arrow keys after focus) and gets built-in accessibility semantics for free. Restyling it with appearance:none and a gradient background achieves the same custom look while keeping that native behavior.' },
      { q: 'How do I make the playback speed actually change audio speed?', a: 'Set audio.playbackRate = speeds[speedIndex] inside cycleSpeed() once you have a real <audio> element — the HTMLMediaElement API applies the rate change immediately without needing to restart playback.' },
      { q: 'Why does the seek bar update use a CSS custom property instead of changing the whole gradient?', a: 'Updating a single custom property (--p) is a lighter-weight style change than rewriting the entire background gradient string on every playback tick, and it keeps the gradient definition in one place in the CSS rather than duplicated in JavaScript.' },
      { q: 'How do I use this podcast player in React, Vue, or Angular?', a: 'Open the Export menu on the snippet page for a React component wrapping a real <audio> ref with the same controls, a React + Tailwind version, a Vue 3 SFC, or an Angular standalone component — each preserves the seek bar styling and skip/speed logic.' },
    ],
    aiPrompt: {
      paragraph: `Paste this podcast player's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the seek bar's fill is driven by a single CSS custom property instead of rewriting the whole gradient, and why the simulated timeline multiplies its tick size by the active speed rather than just changing a label. The most useful thing to ask for next is the real wiring: describe your actual episode source (a static mp3 URL, or a streaming endpoint) and have the assistant replace the setInterval simulation with a genuine <audio> element bound to play/pause, timeupdate, playbackRate, and currentTime. Beyond that, ask it to add a volume slider instead of the current mute-only toggle, or a chapters list that lets tapping a chapter jump the seek position directly.`,
      prompt: `Build a custom podcast/audio player UI in plain HTML, CSS, and JavaScript, no framework, no libraries, no external audio file — simulate playback with a timer.

Requirements:
- A dark card containing cover art, an episode title and subtitle, a seek bar with current-time and total-duration labels on either side, and a row of playback controls: a playback-speed button, a skip-back-15-seconds button, a large central play/pause button, a skip-forward-30-seconds button, and a mute toggle.
- The seek bar must be a real native range input restyled with appearance:none, whose filled portion is drawn with a CSS linear-gradient background driven by a single CSS custom property that JavaScript updates on every tick, not by rewriting the entire gradient string. It must also support the user dragging it directly to seek.
- Since there is no real audio file, simulate playback with a repeating timer that advances a current-time counter, and make the speed control cycle through at least four speed multipliers (for example 1x, 1.25x, 1.5x, 2x, 0.75x) that visibly change how fast the simulated timeline advances.
- The skip buttons must visually overlay a small number (15 and 30 respectively) on top of a rounded circular-arrow icon rather than using plain text buttons.
- The play button must swap between a play triangle icon and a pause bars icon depending on state, and update its accessible label to match.
- Time values must be formatted as minutes:seconds with zero-padded seconds, and the time labels must use a numeric font style that prevents the digits from changing width as the counter updates, so the layout does not jitter during playback.`,
    },
  },
};

export default podcastPlayer;
