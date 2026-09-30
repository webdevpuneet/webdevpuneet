const nowPlayingMiniPlayer = {
  id: 'now-playing-mini-player',
  title: 'Now Playing Mini Player',
  lastmod: '2026-08-08',
  category: 'media',
  html: `<div class="stage" id="stage">
  <div class="backdrop">
    <div class="placeholder-text">Tap the mini player below to expand it</div>
  </div>

  <div class="mini-player" id="mini-player">
    <div class="mini-art"></div>
    <div class="mini-info">
      <div class="mini-title">Nightdrive</div>
      <div class="mini-artist">Echo Valley</div>
    </div>
    <div class="mini-eq" id="mini-eq">
      <span></span><span></span><span></span>
    </div>
    <button class="mini-play" id="mini-play-btn" aria-label="Play or pause">
      <svg id="mini-play-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
    </button>
  </div>

  <div class="sheet" id="sheet">
    <div class="sheet-header">
      <button class="sheet-close" id="sheet-close" aria-label="Collapse player">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <span class="sheet-kicker">NOW PLAYING</span>
    </div>
    <div class="sheet-art"></div>
    <div class="sheet-meta">
      <div class="sheet-title">Nightdrive</div>
      <div class="sheet-artist">Echo Valley &mdash; Midnight Radio EP</div>
    </div>
    <div class="scrubber" id="scrubber">
      <div class="scrubber-fill" id="scrubber-fill"></div>
      <div class="scrubber-handle" id="scrubber-handle"></div>
    </div>
    <div class="time-row">
      <span id="time-current">0:00</span>
      <span id="time-total">3:24</span>
    </div>
    <div class="sheet-eq" id="sheet-eq">
      <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
    <div class="controls">
      <button class="ctrl-btn" aria-label="Previous">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zM9.5 12l10 7V5z"/></svg>
      </button>
      <button class="ctrl-btn big" id="sheet-play-btn" aria-label="Play or pause">
        <svg id="sheet-play-icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <button class="ctrl-btn" aria-label="Next">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2zM4.5 12l10-7v14z"/></svg>
      </button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.stage { position: relative; width: 320px; height: 480px; background: #eef1f8; border-radius: 22px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.backdrop { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 40px; }
.placeholder-text { font-size: 13px; color: #94a3b8; text-align: center; line-height: 1.6; }

.mini-player {
  position: absolute; left: 12px; right: 12px; bottom: 12px; height: 60px;
  background: #0f172a; border-radius: 16px; display: flex; align-items: center; gap: 10px;
  padding: 0 10px; cursor: pointer; box-shadow: 0 8px 24px rgba(15,23,42,0.35);
  transition: opacity 0.2s, transform 0.2s;
  z-index: 5;
}
.mini-player.hidden { opacity: 0; pointer-events: none; transform: scale(0.97); }

.mini-art { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #818cf8, #c084fc); flex-shrink: 0; }
.mini-info { flex: 1; min-width: 0; }
.mini-title { font-size: 13px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mini-artist { font-size: 11px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.mini-eq { display: flex; align-items: flex-end; gap: 2px; height: 16px; }
.mini-eq span { width: 3px; background: #a5b4fc; border-radius: 2px; height: 4px; transition: height 0.12s ease; }

.mini-play { width: 34px; height: 34px; border-radius: 50%; background: #fff; border: none; display: flex; align-items: center; justify-content: center; color: #0f172a; cursor: pointer; flex-shrink: 0; }

.sheet {
  position: absolute; inset: 0; background: linear-gradient(180deg, #1e1b4b, #0f172a);
  display: none; flex-direction: column; align-items: center; padding: 20px 22px 26px;
  z-index: 10; transform-origin: top left; will-change: transform;
}

.sheet-header { width: 100%; display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
.sheet-close { width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.08); border: none; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.sheet-kicker { font-size: 10px; font-weight: 800; letter-spacing: 0.12em; color: #a5b4fc; }

.sheet-art { width: 190px; height: 190px; border-radius: 18px; background: linear-gradient(135deg, #818cf8, #c084fc, #f472b6); margin: 6px 0 20px; box-shadow: 0 20px 50px rgba(129,140,248,0.35); }

.sheet-meta { text-align: center; margin-bottom: 20px; }
.sheet-title { font-size: 19px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.sheet-artist { font-size: 13px; color: #a5b4fc; }

.scrubber { width: 100%; height: 4px; background: rgba(255,255,255,0.15); border-radius: 4px; position: relative; cursor: pointer; margin-bottom: 6px; }
.scrubber-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0%; background: #fff; border-radius: 4px; }
.scrubber-handle { position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%; background: #fff; left: 0%; transform: translate(-50%, -50%); box-shadow: 0 2px 6px rgba(0,0,0,0.3); }

.time-row { width: 100%; display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; margin-bottom: 22px; }

.sheet-eq { display: flex; align-items: flex-end; gap: 4px; height: 34px; margin-bottom: 26px; }
.sheet-eq span { width: 4px; background: linear-gradient(180deg, #c4b5fd, #6366f1); border-radius: 3px; height: 6px; transition: height 0.15s ease; }

.controls { display: flex; align-items: center; gap: 22px; }
.ctrl-btn { background: transparent; border: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0.85; }
.ctrl-btn:hover { opacity: 1; }
.ctrl-btn.big { width: 56px; height: 56px; border-radius: 50%; background: #fff; color: #1e1b4b; opacity: 1; }`,
  js: `const stage = document.getElementById('stage');
const mini = document.getElementById('mini-player');
const sheet = document.getElementById('sheet');
const miniPlayBtn = document.getElementById('mini-play-btn');
const sheetPlayBtn = document.getElementById('sheet-play-btn');
const miniPlayIcon = document.getElementById('mini-play-icon');
const sheetPlayIcon = document.getElementById('sheet-play-icon');
const scrubber = document.getElementById('scrubber');
const scrubberFill = document.getElementById('scrubber-fill');
const scrubberHandle = document.getElementById('scrubber-handle');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');
const miniEqBars = document.querySelectorAll('#mini-eq span');
const sheetEqBars = document.querySelectorAll('#sheet-eq span');

const DURATION = 204; // seconds, 3:24
let progress = 0.18;
let playing = true;
let expanded = false;
let rafId = null;
let lastTick = null;

const PLAY_ICON = '<path d="M8 5v14l11-7z"/>';
const PAUSE_ICON = '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>';

function formatTime(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return m + ':' + String(s).padStart(2, '0');
}

function renderProgress() {
  const pct = progress * 100;
  scrubberFill.style.width = pct + '%';
  scrubberHandle.style.left = pct + '%';
  timeCurrent.textContent = formatTime(progress * DURATION);
  timeTotal.textContent = formatTime(DURATION);
}

function setPlayIcons() {
  const html = playing ? PAUSE_ICON : PLAY_ICON;
  miniPlayIcon.innerHTML = html;
  sheetPlayIcon.innerHTML = html;
}

function loop(ts) {
  if (lastTick === null) lastTick = ts;
  const dt = (ts - lastTick) / 1000;
  lastTick = ts;

  if (playing) {
    progress = Math.min(1, progress + dt / DURATION);
    renderProgress();
    if (progress >= 1) { playing = false; setPlayIcons(); }
  }

  const bars = expanded ? sheetEqBars : miniEqBars;
  const maxH = expanded ? 32 : 15;
  bars.forEach(bar => {
    if (playing) {
      bar.style.height = (4 + Math.random() * maxH) + 'px';
    }
  });

  rafId = requestAnimationFrame(loop);
}
rafId = requestAnimationFrame(loop);

function togglePlay() {
  playing = !playing;
  setPlayIcons();
}
miniPlayBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
sheetPlayBtn.addEventListener('click', togglePlay);

/*
 * FLIP shared-element expand: First (measure the mini player's current
 * on-screen rect), Last (make the sheet visible at its natural full-size
 * layout and measure THAT rect), Invert (compute the translate+scale that
 * would make the sheet visually sit exactly where the mini player was), then
 * Play (clear the inverted transform on the next frame so the browser
 * animates from the inverted position back to the sheet's natural size).
 */
function expand() {
  if (expanded) return;
  expanded = true;

  const miniRect = mini.getBoundingClientRect();
  sheet.style.display = 'flex';
  sheet.style.transition = 'none';
  sheet.style.transform = 'none';
  const sheetRect = sheet.getBoundingClientRect();

  const dx = miniRect.left - sheetRect.left;
  const dy = miniRect.top - sheetRect.top;
  const sx = miniRect.width / sheetRect.width;
  const sy = miniRect.height / sheetRect.height;

  sheet.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
  sheet.style.opacity = '0.4';
  sheet.style.borderRadius = '16px';
  mini.classList.add('hidden');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      sheet.style.transition = 'transform 0.42s cubic-bezier(0.32,0.72,0,1), opacity 0.3s, border-radius 0.42s';
      sheet.style.transform = 'none';
      sheet.style.opacity = '1';
      sheet.style.borderRadius = '0px';
    });
  });
}

function collapse() {
  if (!expanded) return;
  expanded = false;

  const sheetRect = sheet.getBoundingClientRect();
  mini.classList.remove('hidden');
  const miniRect = mini.getBoundingClientRect();
  mini.classList.add('hidden');

  const dx = miniRect.left - sheetRect.left;
  const dy = miniRect.top - sheetRect.top;
  const sx = miniRect.width / sheetRect.width;
  const sy = miniRect.height / sheetRect.height;

  sheet.style.transition = 'transform 0.38s cubic-bezier(0.32,0.72,0,1), opacity 0.32s, border-radius 0.38s';
  sheet.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')';
  sheet.style.opacity = '0.3';
  sheet.style.borderRadius = '16px';

  const onEnd = (e) => {
    if (e.propertyName !== 'transform') return;
    sheet.style.display = 'none';
    mini.classList.remove('hidden');
    sheet.removeEventListener('transitionend', onEnd);
  };
  sheet.addEventListener('transitionend', onEnd);
}

mini.addEventListener('click', expand);
document.getElementById('sheet-close').addEventListener('click', collapse);

function seek(clientX) {
  const rect = scrubber.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  progress = pct;
  renderProgress();
}
scrubber.addEventListener('click', (e) => seek(e.clientX));
let dragging = false;
scrubberHandle.addEventListener('pointerdown', (e) => { dragging = true; e.stopPropagation(); });
window.addEventListener('pointermove', (e) => { if (dragging) seek(e.clientX); });
window.addEventListener('pointerup', () => { dragging = false; });

renderProgress();
setPlayIcons();`,
  seo: {
    title: 'Now Playing Mini Player — Free HTML CSS JS Snippet',
    description: 'Mini player bar that morphs into a full sheet using a FLIP shared-element transition, plus a live scrubber and equalizer. Exports to React & Vue.',
    about: {
      title: 'Now Playing Mini Player — FLIP Shared-Element Morph, Live Scrubber & Pulsing Equalizer in Vanilla JS',
      description: `Music apps like Spotify and Apple Music do not open their full player as a plain modal that fades in from nowhere — the mini bar at the bottom of the screen visibly grows into the full-screen player, so the album art you were just looking at stays the same object the whole time, just bigger. That continuity is what makes the transition feel physical instead of like two disconnected screens. This snippet reproduces that exact effect using the FLIP technique (First, Last, Invert, Play), the same general approach behind iOS and Android "hero" transitions between a list item and its detail view, built with nothing but getBoundingClientRect(), CSS transforms, and one requestAnimationFrame-driven loop for the animated equalizer bars.

**What FLIP actually stands for and why each step exists**

FLIP is a sequence, not a single trick. **First**: before anything changes, measure the mini player's exact position and size on screen with getBoundingClientRect(). **Last**: make the destination element (the full sheet) visible at its natural, final layout — full-screen, no transform — and measure ITS rect too. **Invert**: compute the delta between those two rects (how far left/up the sheet's top-left corner needs to shift, and what scale factor would shrink its width/height down to the mini player's dimensions) and apply that as a transform immediately, with transitions disabled, so the sheet is technically full-size in the DOM but visually rendered exactly where the mini player was. **Play**: on the very next frame, remove the inverted transform and re-enable transitions, so the browser animates the transform from "shrunk down to mini-player size and position" to "none" (its natural full-size state) — which reads as the sheet growing out of the mini player.

**Why the transform has to be computed, not guessed**

The delta values are never hardcoded pixel numbers. expand() reads miniRect.left - sheetRect.left and miniRect.top - sheetRect.top for the translate offset, and miniRect.width / sheetRect.width plus the same ratio for height as the scale factor. This means the morph works correctly regardless of where the mini player happens to sit or how large the sheet is at any given viewport size — the same code that works in a 320px-wide mobile mockup would work identically if the container were resized, because the transform is derived from live measurements taken at the moment of the click rather than a fixed guess.

**Why the transform-origin matters**

sheet.style.transformOrigin is set to top left to match how the translate+scale math is computed — the delta values describe how the sheet's own top-left corner needs to move and shrink to land on the mini player's top-left corner. If the transform-origin were left at its default of center, the same translate/scale numbers would scale the sheet from its middle outward, producing a transform that visually drifts away from the mini player's actual position instead of growing cleanly out of it.

**Reversing the morph on collapse**

collapse() runs the identical FLIP math in the opposite direction: it measures the sheet's current (full-size) rect as the starting point, temporarily reveals the still-hidden mini player to read its target rect, then re-hides it, computes the same translate/scale delta, and animates the sheet's transform FROM none TO that inverted position — shrinking the sheet back down onto the mini player rather than just fading it away. A transitionend listener (checked against e.propertyName === 'transform' so it does not fire early on the opacity or border-radius transitions running in parallel) finally sets display: none on the sheet and restores the mini player's visibility once the shrink animation has actually finished.

**The equalizer bars and progress loop**

A single requestAnimationFrame loop drives two unrelated things every frame: it advances progress (a 0-1 float) by dt / DURATION seconds elapsed, which updates the scrubber fill width and handle position and the current-time label — and, only while playing is true, it assigns each equalizer bar a fresh randomized height, capped higher in the expanded sheet view (32px) than in the compact mini bar (15px). When paused, the bars simply stop being reassigned and freeze at whatever height they last had, rather than resetting to zero, which reads as "sound stopped" more naturally than an abrupt flatline.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch the mini bar at the bottom', text: 'The compact player shows album art, title, artist, three small equalizer bars pulsing at random heights, and a play/pause button — all inside a 60px-tall dark bar pinned to the bottom of the stage.' },
      { title: 'Click anywhere on the mini bar to expand it', text: 'The full player sheet visibly grows out of the mini bar\'s exact position and size using a FLIP transform, landing at full-screen size roughly 420ms later with an eased deceleration curve.' },
      { title: 'Drag or click the scrubber in the expanded sheet', text: 'Click anywhere on the progress track to seek instantly, or press and drag the circular handle to scrub continuously — both update the current-time label in real time.' },
      { title: 'Press play/pause in either view', text: 'Toggling from the mini bar or the full sheet stays in sync between both — the icon morphs between a play triangle and a pause double-bar, and the equalizer bars freeze in place when paused.' },
      { title: 'Tap the chevron to collapse the sheet', text: 'The full player shrinks back down using the reverse FLIP transform, visually retreating into the exact mini-bar position it grew from, and the mini bar fades back in once the shrink finishes.' },
    ]},
    features: [
      'FLIP shared-element morph: measured translate+scale transform, not a plain modal fade',
      'Transform delta computed live from getBoundingClientRect() on every expand/collapse, never hardcoded',
      'transform-origin: top left kept consistent with how the translate/scale math is derived',
      'Single requestAnimationFrame loop drives both the scrubber progress and the equalizer bar heights',
      'Draggable and click-to-seek scrubber with a synced numeric time label',
      'Play/pause icon morph shared between the mini bar and the expanded sheet',
      'Equalizer bars freeze in place on pause instead of resetting to zero',
      'transitionend listener filtered to the transform property so display:none only applies once the shrink animation truly finishes',
    ],
    useCases: [
      { icon: 'APP', title: 'Music and podcast player interfaces', desc: 'The canonical use case — a persistent mini player that expands to a full now-playing screen, matching the [mobile music player screen](/ui-snippets/mobile-music-player-screen/) mockup and pairing well with an [audio waveform visualizer](/ui-snippets/audio-waveform-visualizer/) for a richer expanded view.' },
      { icon: 'MEDIA', title: 'Video and livestream mini-to-full transitions', desc: 'The same FLIP technique works for a picture-in-picture video bar that expands into a full [video player](/ui-snippets/video-player/) — swap the album art for a video thumbnail and the scrubber logic carries over directly.' },
      { icon: 'LEARN', title: 'Teaching the FLIP animation technique', desc: 'A concrete, readable reference for First-Last-Invert-Play shared-element transitions, the same mechanism used by page-transition libraries and iOS/Android hero animations, useful alongside a [modal](/ui-snippets/modal/) when comparing morph transitions to plain fade/scale modals.' },
      { icon: 'DESIGN', title: 'Sticky action bars that expand to detail panels', desc: 'Reuse the morph pattern for any "small persistent bar expands to full detail" UI — a shopping cart summary bar that grows into a full checkout panel, or a notification toast that expands into a full alert detail view.' },
      { icon: 'CODE', title: 'Portfolio and product demo micro-interactions', desc: 'A polished, self-contained piece to showcase FLIP-based motion design skills in a portfolio, alongside other card-based [UI snippets](/ui-snippets) that demonstrate interaction craft rather than static layout.' },
    ],
    faqs: [
      { q: 'What does FLIP stand for and why not just use a CSS modal fade instead?', a: 'FLIP stands for First, Last, Invert, Play — measure the starting rect, measure the natural ending rect, invert the difference into a transform applied instantly with no transition, then remove that transform on the next frame so the browser animates from the inverted position to the natural one. A plain fade-in modal has no visual connection to where the trigger element was, which reads as two disconnected screens. FLIP keeps the album art, title, and general shape visually continuous, which is what makes the morph feel like the same object growing rather than a new screen appearing.' },
      { q: 'Why is transform-origin set to top left instead of the default center?', a: 'The translate and scale deltas in this snippet are computed from the two rects\' top-left corners (miniRect.left - sheetRect.left, etc). That math only produces a visually correct morph if the browser also scales the element from its top-left corner — with the default center origin, the same numbers would scale the sheet outward from its middle, causing it to visibly drift away from the mini player\'s actual position instead of growing cleanly out of it.' },
      { q: 'Why does collapse() briefly show and re-hide the mini player before animating?', a: 'To compute the shrink target, the code needs the mini player\'s real on-screen rect via getBoundingClientRect() — but that only returns meaningful, non-zero dimensions if the element is actually laid out and visible. The mini player is briefly un-hidden just long enough to measure it, then hidden again immediately so it does not double up visually with the still-shrinking sheet, and its .hidden class is only permanently removed once the sheet\'s shrink transition genuinely finishes.' },
      { q: 'Can I use this mini player and FLIP morph in React, Vue, or Angular?', a: 'Yes. In React, keep expanded as component state, and run the getBoundingClientRect() measurement plus the inverted-transform assignment inside a useLayoutEffect that fires synchronously after the expanded state changes but before the browser paints (useEffect alone can flash the unanimated final state for one frame). Cancel the shared requestAnimationFrame loop in the cleanup function of the useEffect that starts it. In Vue, do the measurement in a watcher on expanded using nextTick, and stop the rAF loop in onUnmounted. In Angular, trigger it from ngOnChanges or a signal effect and cancel the frame in ngOnDestroy. In every framework, keep the rAF-driven equalizer and scrubber loop outside the framework\'s render cycle for smoothness, same as in this vanilla version.' },
      { q: 'How do I make the scrubber actually control real audio playback?', a: 'Replace the DURATION constant and the progress variable\'s manual increment with an actual HTMLAudioElement: listen for its timeupdate event to set progress = audio.currentTime / audio.duration instead of advancing it manually in the rAF loop, and in seek(), set audio.currentTime = pct * audio.duration instead of just updating the visual progress variable. The rAF loop can keep driving the equalizer bars independently since real audio has no built-in frequency data unless you also wire up the Web Audio API\'s AnalyserNode.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's JS to an AI assistant like Claude and ask it to trace through exactly why the transform has to be computed from live getBoundingClientRect() calls rather than hardcoded, and why transform-origin: top left has to match how the delta is derived — it is easy to copy the FLIP pattern without understanding why those two details are load-bearing. It is also worth asking whether the mini-player "briefly show, measure, re-hide" trick in collapse() could be replaced with a cleaner approach, like keeping the mini player permanently in the layout at opacity: 0 with pointer-events: none instead of toggling a hidden class, so its rect is always measurable without a flash. For extending the snippet, ask for a swipe-down-to-collapse gesture using pointer events, a queue/playlist drawer that slides up from the bottom of the expanded sheet, or wiring the equalizer to real frequency data via the Web Audio API AnalyserNode instead of randomized bar heights.`,
      prompt: `Build a "now playing" mini music player in plain HTML, CSS, and JavaScript that expands into a full player sheet using a FLIP shared-element transition — no animation library, no framework.

Requirements:
- A compact mini player bar fixed near the bottom of its container showing album art, title, artist, a small pulsing equalizer, and a play/pause button.
- Clicking the mini bar must expand it into a full-size player sheet using the FLIP technique: measure the mini bar's getBoundingClientRect() BEFORE anything changes, make the full sheet visible at its natural full-size layout and measure that rect too, compute the translate offset and width/height scale ratio between the two rects, apply that as an instant (no-transition) transform so the sheet is technically full-size but visually sits exactly on top of the mini bar, then on the next animation frame remove the transform with a transition enabled so it animates smoothly from "shrunk to mini-bar size" to its natural full size.
- Set transform-origin to top left on the sheet, consistent with how the translate/scale delta is computed from the two rects' top-left corners.
- Reverse the exact same FLIP math when collapsing, so the sheet visibly shrinks back down into the mini bar's position and size before being hidden, with a transitionend listener (filtered to the transform property specifically) that swaps display back only once the shrink animation has actually finished.
- A working scrubber/progress bar in the expanded sheet: click-to-seek and drag-to-seek, both updating a numeric current-time label, driven by a single requestAnimationFrame loop.
- Play/pause button whose icon morphs between a play triangle and a pause icon, synced between the mini bar and the expanded sheet.
- A small set of equalizer bars that get randomized heights every animation frame while playing, and freeze in place (not reset to zero) when paused.`,
    },
  },
};

export default nowPlayingMiniPlayer;
