const loaderAudioBufferingVisualizer = {
  id: 'loader-audio-buffering-visualizer',
  title: 'Audio Buffering Visualizer',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="ab-player">
  <div class="ab-art">♪</div>
  <div class="ab-info">
    <div class="ab-track">Midnight Static</div>
    <div class="ab-artist">Aurora Fields</div>
    <div class="ab-bars" id="abBars">
      <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
    <div class="ab-status" id="abStatus">Buffering…</div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d17;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.ab-player{display:flex;gap:16px;align-items:center;background:#141728;border:1px solid #262b45;border-radius:16px;padding:16px 18px;width:100%;max-width:360px}
.ab-art{width:56px;height:56px;border-radius:12px;flex-shrink:0;background:linear-gradient(150deg,#6366f1,#ec4899);display:flex;align-items:center;justify-content:center;font-size:22px;color:#fff}

.ab-info{flex:1;min-width:0}
.ab-track{font-size:14px;font-weight:800}
.ab-artist{font-size:12px;color:#8b90ab;margin-bottom:9px}

.ab-bars{display:flex;align-items:flex-end;gap:3px;height:26px}
.ab-bars span{flex:1;background:linear-gradient(180deg,#818cf8,#6366f1);border-radius:2px;height:20%}

/* Buffering: bars pulse gently in a "waiting" pattern — narrow height range,
   slow, irregular per-bar timing, distinct from the confident full-swing
   equalizer motion used once playback is ready. */
.ab-bars.ab-buffering span{animation:abWait 1.1s ease-in-out infinite}
.ab-bars.ab-buffering span:nth-child(1){animation-delay:0s;animation-duration:1.0s}
.ab-bars.ab-buffering span:nth-child(2){animation-delay:.12s;animation-duration:1.3s}
.ab-bars.ab-buffering span:nth-child(3){animation-delay:.05s;animation-duration:.9s}
.ab-bars.ab-buffering span:nth-child(4){animation-delay:.22s;animation-duration:1.2s}
.ab-bars.ab-buffering span:nth-child(5){animation-delay:.08s;animation-duration:1.1s}
.ab-bars.ab-buffering span:nth-child(6){animation-delay:.18s;animation-duration:1.4s}
.ab-bars.ab-buffering span:nth-child(7){animation-delay:.03s;animation-duration:1.0s}
.ab-bars.ab-buffering span:nth-child(8){animation-delay:.15s;animation-duration:1.25s}
@keyframes abWait{0%,100%{height:20%;opacity:.5}50%{height:45%;opacity:.9}}

/* Ready/playing: confident, fuller-swing equalizer motion, faster and taller. */
.ab-bars.ab-ready span{animation:abPlay .7s ease-in-out infinite}
.ab-bars.ab-ready span:nth-child(1){animation-delay:0s}
.ab-bars.ab-ready span:nth-child(2){animation-delay:.08s}
.ab-bars.ab-ready span:nth-child(3){animation-delay:.16s}
.ab-bars.ab-ready span:nth-child(4){animation-delay:.04s}
.ab-bars.ab-ready span:nth-child(5){animation-delay:.2s}
.ab-bars.ab-ready span:nth-child(6){animation-delay:.1s}
.ab-bars.ab-ready span:nth-child(7){animation-delay:.24s}
.ab-bars.ab-ready span:nth-child(8){animation-delay:.06s}
@keyframes abPlay{0%,100%{height:25%}50%{height:100%}}

.ab-status{font-size:11px;font-weight:700;letter-spacing:.03em;color:#818cf8;margin-top:7px}
.ab-status.ab-ok{color:#34d399}`,

  js: `var bars = document.getElementById('abBars');
var status = document.getElementById('abStatus');

// Start buffering; after the audio has "loaded enough", switch to the ready/
// playing equalizer pattern — a distinct visual state, not just a re-colored
// version of buffering.
bars.classList.add('ab-buffering');

setTimeout(function () {
  bars.classList.remove('ab-buffering');
  bars.classList.add('ab-ready');
  status.textContent = 'Now playing';
  status.classList.add('ab-ok');
}, 2600);`,

  seo: {
    title: 'Audio Buffering Visualizer — Equalizer Bars for Audio Loading States',
    description: `An audio-player buffering state with equalizer-style bars that pulse in a distinct "waiting" pattern, transitioning to a confident "now playing" pattern once ready. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Audio Buffering Visualizer — A Waiting Pattern That Resolves Into Playback',
      description: `Audio players need a loading state that fits their context — an equalizer-style bar visual rather than a generic spinner, since bars already read as "sound" to anyone who's seen a music app. This snippet gives an audio player two distinct bar-animation states: a gentle, irregular "buffering" pattern while audio loads, and a confident, fuller-swing "playing" pattern once it's ready — deliberately different motions, not the same animation just recolored.

**Two states, two different keyframes**

Buffering uses \`abWait\`, a shallow oscillation between 20% and 45% height with each of the 8 bars given its own \`animation-delay\` (0.03s–0.22s) and its own \`animation-duration\` (0.9s–1.4s) — genuinely irregular per-bar timing rather than an evenly-staggered sequence, so the bars pulse somewhat chaotically, like they're waiting rather than performing. Once ready, \`abReady\`'s \`abPlay\` keyframe swings each bar between 25% and a full 100% height on a snappier, uniform 0.7s cycle with tighter, evenly-spaced delays — a confident, rhythmic equalizer motion that reads as active music, not uncertainty.

**Why irregular timing matters for "waiting"**

Uniform timing (every bar identical except for a linear stagger) reads as controlled and purposeful — appropriate for playback, wrong for buffering. Giving buffering bars mismatched durations and delays that don't follow a clean sequence is what makes the pattern feel tentative and provisional, distinct from the [wave loader](/ui-snippets/wave-loader/)'s clean, evenly-staggered wave or the [dots loader](/ui-snippets/dots-loader/)'s wave variant — those communicate general-purpose "loading," while this specifically communicates "audio, buffering."

**A real state transition, not a fixed animation**

JavaScript adds the \`.ab-buffering\` class on load and, after a timeout standing in for the audio actually having buffered enough to play, swaps it for \`.ab-ready\` while updating the status label from "Buffering…" to "Now playing." In a real player you'd trigger that swap from the media element's own \`canplaythrough\` or \`waiting\`/\`playing\` events rather than a fixed delay.

**Audio-specific, not video-shaped**

Unlike a video buffering overlay (a full-frame spinner over the video canvas), this is built for an audio player's compact, persistent UI — album art, track/artist text, and inline equalizer bars that fit a mini-player or now-playing bar. Pair it with a [music player](/ui-snippets/music-player/) shell or an [audio waveform visualizer](/ui-snippets/audio-waveform-visualizer/) for a real, signal-driven playing state.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A mini music player renders with bars pulsing in the buffering pattern.` },
      { title: 'Watch the buffering bars', text: `Notice each bar has its own timing — a gentle, irregular "waiting" motion.` },
      { title: 'Wait for the transition', text: `After ~2.6s the status changes to "Now playing" and the bars switch patterns.` },
      { title: 'Compare the two motions', text: `The ready state swings taller and faster with tighter, uniform timing.` },
      { title: 'Wire to real media events', text: `Trigger the class swap from your <audio> element's waiting/canplaythrough/playing events.` },
      { title: 'Restyle the player', text: `Change the album art gradient, bar colors, or bar count.` },
    ] },
    features: [
      { title: 'Two distinct bar patterns', text: `Buffering and playing use genuinely different keyframes, not a recolor.` },
      { title: 'Irregular buffering timing', text: `Mismatched per-bar durations and delays make waiting feel tentative.` },
      { title: 'Confident playing motion', text: `Taller, faster, evenly-timed swings once ready.` },
      { title: 'Real state transition', text: `JS swaps classes and status text on an actual event, not a loop.` },
      { title: 'Audio-context styling', text: `Album art, track/artist text, and a compact player shell.` },
      { title: 'Status label sync', text: `The text label changes in step with the bar pattern.` },
      { title: 'Media-event ready', text: `Structured to hook into real <audio> waiting/playing events.` },
      { title: 'Zero dependencies', text: `Pure CSS keyframes plus a tiny JS class toggle.` },
    ],
    useCases: [
      { title: 'Music player buffering states', text: `The primary use case — pair with a [music player](/ui-snippets/music-player/) shell.` },
      { title: 'Podcast and audiobook apps', text: `Show buffering before playback of a streamed episode begins.` },
      { title: 'Voice message players', text: `A compact loading state for chat voice notes.` },
      { title: 'Live audio streams', text: `Indicate connecting/buffering before a live stream starts.` },
      { title: 'Now-playing widgets', text: `A persistent mini-player bar's loading-to-playing transition.` },
      { title: 'Comparing loader motion design', text: `A reference for using distinct animation character (not just color) to signal different states.` },
      { icon: 'CODE', title: 'Related: Skeleton-to-Content Crossfade', desc: 'See the [Skeleton-to-Content Crossfade](/ui-snippets/loader-content-fade-swap/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the buffering pattern different from the playing pattern?', a: `They use separate CSS keyframes: buffering (abWait) oscillates each bar in a shallow 20-45% height range with mismatched, non-sequential per-bar durations and delays, giving it an irregular, tentative feel. Playing (abPlay) swings bars in a much taller 25-100% range on a faster, uniform 0.7s cycle with evenly-spaced delays, reading as confident, rhythmic motion. They are genuinely different animations, not the same keyframe recolored or resized.` },
      { q: 'Why use irregular timing for the buffering state specifically?', a: `Uniform, evenly-staggered motion reads as controlled and purposeful, which is the wrong signal for "still loading, please wait." Giving each buffering bar its own slightly mismatched duration and delay — rather than a clean linear stagger — makes the motion feel provisional and uncertain, distinguishing it from a confident playback visualizer or a generic wave loader.` },
      { q: 'How do I trigger the transition from real audio buffering events?', a: `Listen for your <audio> or <video> element's waiting event to add the buffering class, and its canplaythrough or playing event to swap to the ready class — replace the fixed setTimeout with these real event listeners so the visual accurately reflects actual buffering state rather than a guessed delay.` },
      { q: 'How is this different from the video buffering overlay pattern?', a: `A video buffering indicator is typically a full-frame spinner overlaid on the video canvas itself, since video has a large visual area to darken and overlay. This snippet is built for an audio player's compact, always-visible mini-UI — album art plus inline equalizer bars — which stays visible in a persistent now-playing bar rather than overlaying full-screen content.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Track a status state ('buffering' or 'ready') and derive the bars container's class from it, updating it inside your audio element's event handlers (onWaiting, onCanPlayThrough/onPlaying in React's <audio> props, or the equivalent native event listeners in Vue/Angular). The keyframes and per-bar delay/duration CSS need no changes.` },
    ],
    aiPrompt: {
      paragraph: `Instead of eyeballing what makes the two bar patterns feel different, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how giving each buffering bar a mismatched animation-duration and animation-delay (rather than a clean linear stagger) produces a tentative "waiting" read, compared to the ready state's faster, uniform, taller-swinging equalizer motion — and why that distinction in motion character matters more than just changing color between the two states. The same assistant can help optimize it, for example checking whether the fixed 2.6-second setTimeout should be replaced with real HTMLMediaElement event listeners (waiting, canplaythrough, playing) for accurate state tracking. It's also useful for extending the pattern: ask it to drive the bar heights from the audio element's actual buffered TimeRanges for a real, non-decorative buffering percentage, add a third "error/stalled" bar pattern, or make the bar count and player layout configurable. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an audio player buffering visualizer in plain HTML, CSS, and JavaScript with two visually and mechanically distinct equalizer-bar animation states — no library, no video context.

Requirements:
- A compact music-player-style layout: album art placeholder, track name, artist name, a row of 8 vertical equalizer bars, and a status text label.
- A "buffering" bar animation state where each of the 8 bars oscillates in a shallow height range (roughly 20% to 45% of the bar's max height) with DELIBERATELY MISMATCHED per-bar animation-duration and animation-delay values (not a clean evenly-spaced linear stagger) so the motion reads as irregular and tentative, like the bars are waiting rather than performing.
- A separate "ready/playing" bar animation state with its own distinct keyframe: a taller height swing (roughly 25% to 100%), a faster and uniform animation duration across all bars, and evenly-spaced delays, so it reads as confident, rhythmic equalizer motion clearly distinguishable from the buffering state, not just the same animation sped up or recolored.
- JavaScript that starts the player in the buffering state, then after a delay (structured so a real HTMLMediaElement's waiting/canplaythrough/playing events could trigger this instead) swaps to the ready state and updates the status label text and its styling to reflect the transition.
- Style it specifically as an audio player UI (album art, track/artist metadata) rather than a video-buffering overlay, so it is clearly built for an audio-specific context distinct from a video loading spinner.`,
    },
  },
};

export default loaderAudioBufferingVisualizer;
