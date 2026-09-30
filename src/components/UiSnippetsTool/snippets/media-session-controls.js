const mediaSessionControls = {
  id: 'media-session-controls',
  title: 'Media Session API Controls',
  lastmod: '2026-08-22',
  category: 'media',
  cdnUrls: [],
  html: `<section class="msc-wrap">
  <span class="msc-tag">navigator.mediaSession</span>
  <h1>Mini player</h1>
  <p id="mscStatus">Wired to the real Media Session API — supporting devices show this track on the lock screen, notification shade, and hardware media keys.</p>

  <div class="msc-player">
    <div class="msc-art" id="mscArt">♪</div>
    <div class="msc-meta">
      <strong id="mscTitle">Nebula Drift</strong>
      <span id="mscArtist">Auric Fields</span>
      <span class="msc-album" id="mscAlbum">Wandering Signals</span>
    </div>
  </div>

  <div class="msc-progress">
    <div class="msc-progress-fill" id="mscFill"></div>
  </div>
  <div class="msc-times"><span id="mscElapsed">0:00</span><span id="mscDuration">3:12</span></div>

  <div class="msc-controls">
    <button class="msc-ctrl" id="mscPrev" aria-label="Previous track">⏮</button>
    <button class="msc-ctrl main" id="mscPlay" aria-label="Play">▶</button>
    <button class="msc-ctrl" id="mscNext" aria-label="Next track">⏭</button>
  </div>

  <p class="msc-note" id="mscNote">Checking Media Session API support…</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#1c1030,#07050d 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.msc-wrap{width:100%;max-width:400px;text-align:center}
.msc-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f0abfc;background:rgba(240,171,252,.1);border:1px solid rgba(240,171,252,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.msc-wrap h1{font-size:clamp(24px,5.5vw,30px);font-weight:800;letter-spacing:-.03em}
.msc-wrap p{font-size:13px;color:#c3aee0;margin-top:8px;line-height:1.6}
.msc-player{margin-top:22px;display:flex;align-items:center;gap:14px;text-align:left;padding:16px;border-radius:16px;background:linear-gradient(160deg,#241a3d,#120c22);border:1px solid #33265a}
.msc-art{width:64px;height:64px;border-radius:12px;background:linear-gradient(135deg,#e879f9,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;transition:transform .3s}
.msc-art.spin{animation:mscSpin 6s linear infinite}
@keyframes mscSpin{to{transform:rotate(360deg)}}
.msc-meta{display:flex;flex-direction:column;gap:2px;overflow:hidden}
.msc-meta strong{font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.msc-meta span{font-size:12px;color:#a996c9}
.msc-album{color:#7c6a9c!important;font-style:italic}
.msc-progress{margin-top:16px;height:5px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}
.msc-progress-fill{height:100%;width:0%;background:linear-gradient(90deg,#e879f9,#a78bfa);transition:width .25s linear}
.msc-times{display:flex;justify-content:space-between;font-size:11px;color:#8a76ad;margin-top:6px}
.msc-controls{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:18px}
.msc-ctrl{width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#f3ecff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}
.msc-ctrl:hover{background:rgba(255,255,255,.11)}
.msc-ctrl.main{width:56px;height:56px;font-size:20px;background:linear-gradient(135deg,#e879f9,#a855f7);border-color:transparent;color:#1a0d2e}
.msc-note{font-size:11.5px;color:#7a6a9c;margin-top:18px;line-height:1.6}`,

  js: `var statusEl = document.getElementById('mscStatus');
var noteEl = document.getElementById('mscNote');
var artEl = document.getElementById('mscArt');
var titleEl = document.getElementById('mscTitle');
var artistEl = document.getElementById('mscArtist');
var albumEl = document.getElementById('mscAlbum');
var fillEl = document.getElementById('mscFill');
var elapsedEl = document.getElementById('mscElapsed');
var durationEl = document.getElementById('mscDuration');
var playBtn = document.getElementById('mscPlay');
var prevBtn = document.getElementById('mscPrev');
var nextBtn = document.getElementById('mscNext');

var playlist = [
  { title: 'Nebula Drift', artist: 'Auric Fields', album: 'Wandering Signals', duration: 192 },
  { title: 'Glass Horizon', artist: 'Auric Fields', album: 'Wandering Signals', duration: 227 },
  { title: 'Static Bloom', artist: 'Kilo Verse', album: 'Low Orbit', duration: 168 },
];

var trackIndex = 0;
var elapsed = 0;
var playing = false;
var tickTimer = null;

var hasMediaSession = 'mediaSession' in navigator;

function formatTime(sec) {
  var m = Math.floor(sec / 60);
  var s = Math.floor(sec % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

// The on-page player is the ground truth and must be fully functional on
// its own, with or without Media Session support — OS-level integration is
// a bonus layer, never a requirement for basic playback to work here.
function render() {
  var track = playlist[trackIndex];
  titleEl.textContent = track.title;
  artistEl.textContent = track.artist;
  albumEl.textContent = track.album;
  durationEl.textContent = formatTime(track.duration);
  elapsedEl.textContent = formatTime(elapsed);
  fillEl.style.width = Math.min(100, (elapsed / track.duration) * 100) + '%';
  playBtn.textContent = playing ? '⏸' : '▶';
  playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  artEl.classList.toggle('spin', playing);
}

// Push the real MediaMetadata to the OS so lock-screen / notification-shade
// / hardware media keys reflect the current track. Purely cosmetic if
// mediaSession is unsupported — render() above already covers that case.
function updateMetadata() {
  if (!hasMediaSession) return;
  var track = playlist[trackIndex];
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.album,
    });
    navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
  } catch (err) {
    // Some contexts (e.g. certain sandboxed iframes) restrict MediaMetadata
    // construction or assignment; fail silently since it's a pure enhancement.
  }
}

function tick() {
  var track = playlist[trackIndex];
  elapsed += 1;
  if (elapsed >= track.duration) {
    nextTrack();
    return;
  }
  render();
}

function play() {
  playing = true;
  render();
  updateMetadata();
  clearInterval(tickTimer);
  tickTimer = setInterval(tick, 1000);
}

function pause() {
  playing = false;
  render();
  updateMetadata();
  clearInterval(tickTimer);
}

function togglePlay() {
  if (playing) pause(); else play();
}

function prevTrack() {
  elapsed = 0;
  trackIndex = (trackIndex - 1 + playlist.length) % playlist.length;
  render();
  updateMetadata();
}

function nextTrack() {
  elapsed = 0;
  trackIndex = (trackIndex + 1) % playlist.length;
  render();
  updateMetadata();
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

// Wire the real Media Session action handlers so OS-level controls (lock
// screen, notification media widget, headset/keyboard media keys, car
// head units, smartwatches) can drive this exact same player state. This
// is the part of the API whose effect is invisible in an on-page preview —
// there is no way to demonstrate a real lock-screen widget inside a
// sandboxed iframe — so it's included for correctness, not for visible
// feedback here.
if (hasMediaSession) {
  try {
    navigator.mediaSession.setActionHandler('play', play);
    navigator.mediaSession.setActionHandler('pause', pause);
    navigator.mediaSession.setActionHandler('previoustrack', prevTrack);
    navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
    navigator.mediaSession.setActionHandler('seekto', function (details) {
      if (typeof details.seekTime === 'number') {
        elapsed = details.seekTime;
        render();
      }
    });
  } catch (err) {
    // setActionHandler throws if a given action name is unsupported by the
    // current browser; wrap defensively since support varies per-action.
  }
  noteEl.textContent = 'navigator.mediaSession is supported. Metadata and action handlers are wired for real, but their effect is entirely OS-level (lock screen, notification shade, hardware media keys) — nothing extra renders inside this page itself, which is why the on-page buttons above remain the only visible way to control playback here.';
} else {
  noteEl.textContent = 'navigator.mediaSession is unavailable in this browser or context. That only affects OS-level integration — every button below still fully controls playback through ordinary page JavaScript.';
}

render();`,

  seo: {
    title: 'Media Session API Controls — Free navigator.mediaSession Mini Player',
    description: `A fully working mini music player wired to the real Media Session API (setActionHandler, MediaMetadata) so OS-level lock-screen and hardware media keys can control it. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Media Session API Controls — A Real Player With Real OS Integration',
      description: `This snippet is a working mini player first, and a Media Session API demo second — because \`navigator.mediaSession\`'s entire effect is invisible inside a page: it only shows up on a lock screen, in a notification shade, or when a hardware media key is pressed. The on-page buttons have to carry the whole visible demo on their own.

**MediaMetadata drives OS surfaces**

Every time the track changes or play state flips, \`updateMetadata()\` assigns a fresh \`new MediaMetadata({ title, artist, album })\` to \`navigator.mediaSession.metadata\` and sets \`navigator.mediaSession.playbackState\`. On a real device with this player embedded in a real page (not a sandboxed iframe preview), that's what populates the lock-screen now-playing card and notification-shade media widget — artwork, title, and artist, kept in sync automatically as the track advances.

**setActionHandler wires hardware to page state**

\`navigator.mediaSession.setActionHandler('play', play)\` (and \`'pause'\`, \`'previoustrack'\`, \`'nexttrack'\`, \`'seekto'\`) registers this exact page's own functions as the targets for OS-level media controls — a Bluetooth headset's play button, a car head unit's skip button, or a keyboard's media keys all route through these same handlers, calling the identical \`play()\`/\`pause()\`/\`nextTrack()\` functions the on-page buttons call.

**Why the effect can't be shown here**

There's no way for a snippet running inside a preview iframe to render a real OS lock screen or notification shade — that's chrome owned entirely by the operating system, several privilege layers above what any web page can draw. So this snippet is explicit that \`setActionHandler\` and \`MediaMetadata\` are wired for real, with zero expectation that anything extra appears in the preview itself.

**The on-page player never depends on Media Session**

Every piece of visible functionality — play/pause, previous/next, the progress bar, elapsed time — runs through plain \`setInterval\`-driven page state and DOM updates, gated behind a \`hasMediaSession\` check only for the OS-integration calls. Strip \`navigator.mediaSession\` out entirely and the player still works exactly the same on-page; that's a deliberate design choice, not an accident.

Pair this with a [screen wake lock toggle](/ui-snippets/screen-wake-lock-toggle/) so a played track keeps the screen alive, or a [canvas audio frequency bars](/ui-snippets/canvas-audio-bars/) visualizer for a fuller player UI.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A working mini player with three tracks renders.` },
      { title: 'Click play', text: `The progress bar advances and elapsed time counts up.` },
      { title: 'Use next/previous', text: `Track metadata updates on-page and via MediaMetadata.` },
      { title: 'Check a real device', text: `On mobile with a real page, the lock screen shows this track.` },
      { title: 'Try hardware media keys', text: `A keyboard or headset play/pause routes to the same handlers.` },
      { title: 'Read the note', text: `Clarifies the API's effect is OS-level, not visible on-page.` },
    ] },
    features: [
      { title: 'Fully working on-page player', text: `Play, pause, skip, and progress work with zero API dependency.` },
      { title: 'Real MediaMetadata updates', text: `Title, artist, album pushed to the OS on every track change.` },
      { title: 'Real setActionHandler wiring', text: `play/pause/previoustrack/nexttrack/seekto all registered.` },
      { title: 'Shared handler functions', text: `Hardware controls call the identical on-page functions.` },
      { title: 'Honest OS-only effect', text: `States plainly the API's payoff isn't visible in-page.` },
      { title: 'Graceful unsupported path', text: `Player works identically with mediaSession absent.` },
      { title: 'Seek support', text: `seekto handler updates elapsed time from OS scrubbing.` },
      { title: 'No dependencies', text: `Pure vanilla JS against the native API.` },
    ],
    useCases: [
      { title: 'Music/podcast web players', text: `Pair with [canvas audio frequency bars](/ui-snippets/canvas-audio-bars/).` },
      { title: 'Audiobook apps', text: `Lock-screen chapter title and hardware-key seeking.` },
      { title: 'Video sites', text: `Same API pattern applies to HTML video playback.` },
      { title: 'PWA media apps', text: `Keep controls reachable when the app isn't in focus.` },
      { title: 'Radio/streaming embeds', text: `Show live show metadata on the OS lock screen.` },
      { title: 'Keep-awake players', text: `Combine with a [screen wake lock toggle](/ui-snippets/screen-wake-lock-toggle/).` },
      { icon: 'CODE', title: 'Related: Share Menu with Copy Link and Social Options', desc: 'See the [Share Menu with Copy Link and Social Options](/ui-snippets/share-menu/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why don\'t I see anything different when Media Session is supported?', a: `Because the Media Session API's entire visible effect lives outside the page — on the device's lock screen, in the notification shade's media widget, or triggered via hardware media keys. There is no way for any web page, including this snippet inside a preview iframe, to render or simulate that OS-owned chrome. The API is wired for real; its payoff simply isn't observable from inside the page itself.` },
      { q: 'Does the player work if navigator.mediaSession is unsupported?', a: `Yes, identically. The entire play/pause/skip/progress system runs on ordinary page JavaScript (setInterval and DOM updates) gated by a hasMediaSession check only around the OS-integration calls (MediaMetadata assignment and setActionHandler registration). Removing navigator.mediaSession support changes nothing about how the on-page buttons behave.` },
      { q: 'What does setActionHandler actually connect to?', a: `It registers this page's own JavaScript functions (play, pause, prevTrack, nextTrack, and a seek handler) as the targets the operating system calls when the user interacts with OS-level media controls — a lock-screen button, a Bluetooth headset's play button, a car head unit, or a keyboard's media keys. Pressing one of those calls the exact same function the matching on-page button calls.` },
      { q: 'What is MediaMetadata used for?', a: `Assigning navigator.mediaSession.metadata = new MediaMetadata({ title, artist, album, artwork }) tells the OS what to display for the currently "playing" content on surfaces the page can't draw into directly, like a lock screen's now-playing card or a notification shade's media widget. This snippet updates it every time the track or play state changes so those OS surfaces stay in sync automatically.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep the metadata/action-handler wiring in an effect that runs once on mount (re-running setActionHandler on every render can churn OS-level registrations unnecessarily), and store playback state (track index, elapsed time, playing) in your framework's own state so on-page renders and MediaMetadata updates both derive from one source of truth. Clear the interval and consider setting mediaSession.playbackState to 'none' on unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the Media Session API's effect (lock-screen now-playing card, hardware media key routing) is fundamentally invisible from inside the page itself, and why that means the on-page player logic must be built to work completely independently of navigator.mediaSession's availability. It's also useful for reasoning about the shared-handler design — ask why registering the same play/pause/nextTrack functions via setActionHandler as the on-page buttons already call keeps OS-triggered and button-triggered playback perfectly consistent, versus writing separate logic for each trigger source. For extensions, ask it to add real MediaMetadata artwork (an array of icon sizes), wire up a real HTMLAudioElement instead of the setInterval-based progress simulation, or add a 'stop' action handler. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "media session controls" mini music player in plain HTML, CSS, and JavaScript using the real Media Session API (navigator.mediaSession.setActionHandler and MediaMetadata) — no libraries, no real audio file required.

Requirements:
- A mini player UI: album art placeholder, track title/artist/album text, a progress bar with elapsed/duration time, and play/pause/previous/next buttons, cycling through a small hardcoded playlist array (title, artist, album, duration in seconds).
- CRITICAL: the on-page player must be fully functional using ONLY ordinary page JavaScript (setInterval to advance elapsed time, DOM updates for the progress bar and button icons) with ZERO dependency on the Media Session API being supported — feature-detect with 'mediaSession' in navigator and gate only the OS-integration calls behind that check, never the core playback logic.
- On every track change and play/pause toggle, if mediaSession is supported, update navigator.mediaSession.metadata with a new MediaMetadata({ title, artist, album }) and set navigator.mediaSession.playbackState to 'playing' or 'paused', wrapped in try/catch since some contexts restrict MediaMetadata construction.
- Register real setActionHandler callbacks for at least 'play', 'pause', 'previoustrack', 'nexttrack', and 'seekto' (updating elapsed time from details.seekTime), each calling the SAME function the corresponding on-page button calls, wrapped in try/catch per call since individual action names can be unsupported and setActionHandler throws in that case.
- CRITICAL: in the UI copy and code comments, clearly explain that the Media Session API's actual effect — a lock-screen now-playing widget, a notification-shade media control, hardware media key routing — is entirely OS-level and cannot be rendered or simulated inside the page/iframe itself, so a developer or user should not expect to SEE anything different in the preview even when the API is fully wired and working; the only way to observe it is a real device's lock screen or hardware media keys against a real (non-sandboxed) page.
- Show a status note that states whether mediaSession is supported in the current browser/context, without implying that unsupported means the player itself is broken — the player must look and behave identically either way from an on-page perspective.`,
    },
  },
};

export default mediaSessionControls;
