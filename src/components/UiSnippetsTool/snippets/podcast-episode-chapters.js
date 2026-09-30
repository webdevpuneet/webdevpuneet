const podcastEpisodeChapters = {
  id: 'podcast-episode-chapters',
  title: 'Podcast Episode Chapters',
  lastmod: '2026-08-22',
  category: 'media',
  cdnUrls: [],
  html: `<div class="pec-card">
  <div class="pec-header">
    <div class="pec-art">EP</div>
    <div class="pec-meta">
      <h3>The Long Way Round</h3>
      <p>Episode 42 — Field Notes</p>
    </div>
    <button type="button" class="pec-play" id="pecPlay" aria-label="Play or pause">▶</button>
  </div>

  <div class="pec-progress-track" id="pecProgressTrack">
    <div class="pec-progress-fill" id="pecProgressFill"></div>
  </div>
  <div class="pec-time-row">
    <span id="pecElapsed">0:00</span>
    <span id="pecTotal">32:00</span>
  </div>

  <ol class="pec-chapters" id="pecChapters"></ol>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#141019;color:#f1edf7;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 20px}

.pec-card{background:#1e1729;border:1px solid #33253f;border-radius:18px;padding:22px;width:100%;max-width:420px}
.pec-header{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.pec-art{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#c084fc,#7c3aed);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;color:#fff;flex-shrink:0}
.pec-meta{flex:1;min-width:0}
.pec-meta h3{font-size:15.5px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pec-meta p{font-size:12px;color:#a78bda;margin-top:2px}
.pec-play{width:38px;height:38px;border-radius:50%;background:#7c3aed;border:none;color:#fff;font-size:13px;cursor:pointer;flex-shrink:0;transition:background .15s}
.pec-play:hover{background:#8b5cf6}
.pec-play.playing{background:#a78bda}

.pec-progress-track{height:5px;background:#332742;border-radius:3px;overflow:hidden;cursor:pointer}
.pec-progress-fill{height:100%;width:0%;background:linear-gradient(90deg,#c084fc,#7c3aed);border-radius:3px}
.pec-time-row{display:flex;justify-content:space-between;font-size:11px;color:#8a76ad;margin:6px 0 18px;font-variant-numeric:tabular-nums}

.pec-chapters{list-style:none;display:flex;flex-direction:column;gap:2px}
.pec-chapter{display:flex;align-items:center;gap:12px;padding:10px 10px;border-radius:10px;cursor:pointer;transition:background .15s}
.pec-chapter:hover{background:#271c35}
.pec-chapter.pec-active{background:#2f2140}
.pec-ch-time{font-size:11.5px;color:#8a76ad;font-variant-numeric:tabular-nums;font-weight:700;width:40px;flex-shrink:0}
.pec-chapter.pec-active .pec-ch-time{color:#c084fc}
.pec-ch-title{font-size:13.5px;font-weight:600;color:#d9cef0;flex:1}
.pec-chapter.pec-active .pec-ch-title{color:#fff;font-weight:700}
.pec-ch-dot{width:6px;height:6px;border-radius:50%;background:transparent;flex-shrink:0}
.pec-chapter.pec-active .pec-ch-dot{background:#c084fc}`,

  js: `var CHAPTERS = [
  { title: 'Cold open', start: 0 },
  { title: 'Why we started walking', start: 95 },
  { title: 'The first wrong turn', start: 340 },
  { title: 'Interview: a stranger\\'s map', start: 690 },
  { title: 'What the ridge taught us', start: 1180 },
  { title: 'Listener voicemails', start: 1560 },
  { title: 'Wrap-up and next episode', start: 1820 },
];
var TOTAL = 1920; // 32:00 in seconds, simulated episode length

var elapsed = 0;
var playing = false;
var timer = null;

var chaptersEl = document.getElementById('pecChapters');
var fillEl = document.getElementById('pecProgressFill');
var trackEl = document.getElementById('pecProgressTrack');
var elapsedEl = document.getElementById('pecElapsed');
var playBtn = document.getElementById('pecPlay');

function formatTime(sec) {
  var m = Math.floor(sec / 60);
  var s = Math.floor(sec % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

function currentChapterIndex() {
  var idx = 0;
  for (var i = 0; i < CHAPTERS.length; i++) {
    if (elapsed >= CHAPTERS[i].start) idx = i; else break;
  }
  return idx;
}

function renderChapters() {
  var activeIdx = currentChapterIndex();
  chaptersEl.innerHTML = CHAPTERS.map(function (ch, i) {
    return '' +
      '<li class="pec-chapter' + (i === activeIdx ? ' pec-active' : '') + '" data-start="' + ch.start + '">' +
        '<span class="pec-ch-dot"></span>' +
        '<span class="pec-ch-time">' + formatTime(ch.start) + '</span>' +
        '<span class="pec-ch-title">' + ch.title + '</span>' +
      '</li>';
  }).join('');
}

function renderProgress() {
  var pct = Math.min(100, (elapsed / TOTAL) * 100);
  fillEl.style.width = pct + '%';
  elapsedEl.textContent = formatTime(elapsed);
}

function tick() {
  elapsed = Math.min(TOTAL, elapsed + 1);
  renderProgress();
  var prevActive = chaptersEl.querySelector('.pec-active');
  var newActiveIdx = currentChapterIndex();
  var shouldBe = chaptersEl.children[newActiveIdx];
  if (!prevActive || prevActive !== shouldBe) renderChapters();
  if (elapsed >= TOTAL) stop();
}

function play() {
  if (playing) return;
  playing = true;
  playBtn.textContent = '\\u23F8';
  playBtn.classList.add('playing');
  timer = setInterval(tick, 200); // simulated playback: ~5x speed so chapters are easy to watch progress through
}

function stop() {
  playing = false;
  playBtn.textContent = '\\u25B6';
  playBtn.classList.remove('playing');
  clearInterval(timer);
}

playBtn.addEventListener('click', function () {
  if (playing) stop(); else play();
});

chaptersEl.addEventListener('click', function (e) {
  var li = e.target.closest('.pec-chapter');
  if (!li) return;
  elapsed = +li.dataset.start;
  renderProgress();
  renderChapters();
});

trackEl.addEventListener('click', function (e) {
  var rect = trackEl.getBoundingClientRect();
  var pct = (e.clientX - rect.left) / rect.width;
  elapsed = Math.round(Math.max(0, Math.min(1, pct)) * TOTAL);
  renderProgress();
  renderChapters();
});

document.getElementById('pecTotal').textContent = formatTime(TOTAL);
renderChapters();
renderProgress();`,

  seo: {
    title: 'Podcast Episode Chapters — Free Timestamped Chapter List HTML CSS JS',
    description: `A podcast chapter list with a simulated playback ticker, an overall progress bar, and click-to-jump chapters that highlight as they play. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Podcast Episode Chapters — A Timestamped List That Tracks Simulated Playback',
      description: `Long-form audio content benefits enormously from chapters — a scannable list of what's covered and when, with the currently playing section highlighted so listeners always know where they are. This snippet builds that pattern in plain HTML, CSS, and vanilla JavaScript, using a simulated elapsed-time ticker rather than a real \`<audio>\` element, so the chapter-highlighting logic is easy to read, test, and drop into any player.

**A simulated clock, not a real audio element**

Instead of wiring up \`<audio>\` playback, a \`setInterval\` ticker advances an \`elapsed\` seconds counter every 200ms (at roughly 5x speed, so you can watch chapters change without waiting through a real 32-minute episode). This keeps the snippet's logic focused on the part that's reusable regardless of your actual audio backend: given an elapsed time, which chapter is active, and how full is the overall progress bar.

**Finding the active chapter with a simple scan**

\`currentChapterIndex()\` walks the chapters in order and keeps advancing its answer as long as \`elapsed\` has passed that chapter's start time — the last chapter whose start time is at or before the current elapsed time is the active one. This is a linear scan rather than a binary search because chapter lists are short (a handful to a few dozen), and it reads unambiguously.

**Re-rendering only when the chapter actually changes**

On every tick, the code compares the currently-rendered active element against what the chapter list *should* show, and only calls \`renderChapters()\` (which rebuilds the whole list's HTML) when they differ — so during the many ticks within a single chapter, only the lightweight \`renderProgress()\` call runs, keeping the interaction cheap even at a fast simulated tick rate.

**Two ways to jump: click a chapter, or click the bar**

Clicking any chapter row sets \`elapsed\` straight to that chapter's start time; clicking anywhere on the progress track computes the proportional position from the click's x-coordinate and seeks there — both call the same render functions, so jumping by either method keeps the chapter highlight and progress bar in lockstep.

**Customizing it**

Swap the simulated ticker for a real \`timeupdate\` listener on an \`<audio>\` element (the chapter-highlighting and progress logic ports unchanged — just replace where \`elapsed\` comes from), edit \`CHAPTERS\` for your episode, or pair it with a full [podcast player](/ui-snippets/podcast-player/) or [music player](/ui-snippets/music-player/) for real playback controls.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A chapter list renders with the first chapter active and the progress bar at 0.` },
      { title: 'Click the play button', text: `A simulated ticker advances elapsed time at roughly 5x speed.` },
      { title: 'Watch the active chapter change', text: `The highlighted row updates as simulated playback crosses each chapter's start time.` },
      { title: 'Click a chapter', text: `Elapsed time jumps straight to that chapter's start and the progress bar updates.` },
      { title: 'Click the progress bar', text: `Seek to any point proportionally along the track.` },
      { title: 'Swap in real audio', text: `Replace the setInterval ticker with an audio element's timeupdate event.` },
    ] },
    features: [
      { title: 'Simulated playback ticker', text: `A lightweight setInterval stands in for real audio, keeping the chapter logic easy to read and test.` },
      { title: 'Active-chapter detection', text: `A simple ordered scan finds the current chapter from elapsed time.` },
      { title: 'Efficient re-rendering', text: `The chapter list only re-renders when the active chapter actually changes.` },
      { title: 'Click-to-jump chapters', text: `Clicking any chapter row seeks playback directly to its start time.` },
      { title: 'Seekable progress track', text: `Clicking anywhere on the bar computes and seeks to the proportional time.` },
      { title: 'Overall progress bar', text: `A slim bar at top reflects total simulated playback position.` },
      { title: 'Tabular-number timestamps', text: `Fixed-width digits keep times from jittering as they update.` },
      { title: 'Framework-portable core', text: `The elapsed-time-driven logic ports directly onto a real audio element.` },
    ],
    useCases: [
      { title: 'Podcast episode pages', text: `Give listeners a scannable outline alongside a real [podcast player](/ui-snippets/podcast-player/).` },
      { title: 'Long-form video and lecture platforms', text: `Adapt the same chapter-highlight logic for [video player](/ui-snippets/video-player/) timestamps.` },
      { title: 'Interview and documentary shows', text: `Let listeners jump straight to the segment they care about.` },
      { title: 'Audiobook and course platforms', text: `Reuse for chapter or lesson navigation within a single audio file.` },
      { title: 'Meeting and webinar recordings', text: `Chapter agenda items by topic with jump-to-timestamp links.` },
      { title: 'Learning elapsed-time-driven UI', text: `A reference for deriving active state from a single clock value — compare with [table of contents](/ui-snippets/table-of-contents/) scrollspy patterns.` },
      { icon: 'CODE', title: 'Related: Usage-Based Billing Meter', desc: 'See the [Usage-Based Billing Meter](/ui-snippets/usage-based-billing-meter/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the widget know which chapter is currently playing?', a: `currentChapterIndex() scans the CHAPTERS array in order and keeps updating its answer to the current index as long as the elapsed time has reached or passed that chapter\\'s start time, stopping as soon as it finds one that hasn\\'t started yet. The last chapter whose start time has been reached is the active one — a simple, unambiguous linear scan since chapter lists are short.` },
      { q: 'Why simulate playback instead of using a real <audio> element?', a: `Simulating elapsed time with a fast setInterval isolates the reusable part of this pattern — the active-chapter detection and progress rendering — from any specific audio backend, and lets you see the full chapter cycle in seconds instead of waiting through a real episode. Swapping in real audio only requires replacing where the elapsed variable gets its value (an audio element\\'s timeupdate event instead of a timer tick); every rendering function stays the same.` },
      { q: 'Why does the chapter list only sometimes re-render on tick?', a: `Every tick recalculates the elapsed time and updates the progress bar (cheap), but the code compares the DOM element currently marked active against what should be active and only calls the more expensive renderChapters() — which rebuilds the whole list\\'s HTML — when they differ. This keeps a fast simulated tick rate (or a real audio timeupdate, which can fire many times per second) from wastefully re-rendering the full list on every single tick.` },
      { q: 'How do I make the progress bar seekable by dragging, not just clicking?', a: `Add mousedown/touchstart, mousemove/touchmove, and mouseup/touchend listeners on the track: on mousedown set a dragging flag and immediately seek (reusing the click handler\\'s math), on mousemove continue seeking to the pointer position only while dragging, and on mouseup clear the flag. The click-to-seek math (proportional x-coordinate against the track\\'s bounding rect) is already the core of what dragging needs.` },
      { q: 'How do I use this chapter list in React, Vue, or Angular?', a: `Hold elapsed in component state, updated either by a timer effect (for the demo) or a real audio element\\'s timeupdate handler, and derive the active chapter index with a memoized/computed value so React/Vue/Angular\\'s own diffing handles the "only re-render when it changes" optimization for you — you don\\'t need to hand-roll the comparison the vanilla version does.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the elapsed-time logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how currentChapterIndex() derives the active chapter from a single elapsed-seconds number, and why the tick handler compares the currently-rendered active element before deciding whether to re-render the whole chapter list. The same assistant can help optimize it — for example asking whether a binary search would matter for a chapter list with hundreds of entries, or how to debounce progress-bar rendering if driven by a real audio element's very frequent timeupdate event. It's also useful for extending the widget: ask it to wire it to a real <audio> element with play/pause/seek synced both ways, add chapter thumbnail images, or persist playback position in localStorage across visits. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "podcast episode chapters" list widget in plain HTML, CSS, and JavaScript with no library.

Requirements:
- An array of chapter objects, each with a title and a start time in seconds, plus a total episode duration in seconds.
- A simulated playback clock (a setInterval-driven elapsed-seconds counter, standing in for a real audio element, advancing faster than real time so the demo is easy to observe) with play and pause controls that start and stop the ticker.
- A function that, given the current elapsed time, determines which chapter is currently "playing" by finding the last chapter in order whose start time is at or before the elapsed time.
- The chapter list rendered so the currently active chapter is visually distinguished (background, text weight, and a colored dot indicator) from the others, re-rendering the list only when the active chapter actually changes rather than on every single clock tick, to avoid unnecessary DOM rebuilding at a fast tick rate.
- Clicking any chapter row must jump the elapsed time directly to that chapter's start time and immediately update both the active-chapter highlight and the overall progress bar.
- A slim overall progress bar above the chapter list whose fill width reflects elapsed time divided by total duration, which must also be clickable/seekable: clicking anywhere on the bar computes the proportional time from the click's horizontal position within the bar's bounding rectangle and seeks playback there.
- Timestamps and the elapsed/total time display formatted as minutes:seconds with tabular number formatting so digits don't visually jitter as they update.`,
    },
  },
};

export default podcastEpisodeChapters;
