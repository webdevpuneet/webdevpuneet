const mobileStoriesViewer = {
  id: 'mobile-stories-viewer',
  title: 'Mobile Stories Viewer',
  lastmod: '2026-07-18',
  category: 'mobile',
  html: `<div class="msv-phone">
  <div class="msv-screen" id="msvScreen">
    <div class="msv-bars" id="msvBars">
      <span class="msv-bar"><i></i></span>
      <span class="msv-bar"><i></i></span>
      <span class="msv-bar"><i></i></span>
      <span class="msv-bar"><i></i></span>
    </div>

    <header class="msv-head">
      <div class="msv-ava">MK</div>
      <div class="msv-who"><b>maya.kdesign</b><small id="msvAgo">2h ago</small></div>
      <button class="msv-x" id="msvClose" aria-label="Close">&times;</button>
    </header>

    <div class="msv-stage" id="msvStage">
      <div class="msv-slide s0 active"><span class="msv-emoji">🌅</span><p>Sunrise over the studio ☕</p></div>
      <div class="msv-slide s1"><span class="msv-emoji">🎨</span><p>New palette exploration</p></div>
      <div class="msv-slide s2"><span class="msv-emoji">💻</span><p>Prototyping the checkout flow</p></div>
      <div class="msv-slide s3"><span class="msv-emoji">🌙</span><p>Late-night polish. Night! ✨</p></div>
      <button class="msv-nav prev" id="msvPrev" aria-label="Previous"></button>
      <button class="msv-nav next" id="msvNext" aria-label="Next"></button>
    </div>

    <div class="msv-reply">
      <input type="text" placeholder="Send message" id="msvInput" autocomplete="off">
      <button class="msv-like" id="msvLike" aria-label="Like">&#9825;</button>
      <button class="msv-send" id="msvSend" aria-label="Send">&#10148;</button>
    </div>
    <div class="msv-toast" id="msvToast"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none;-ms-overflow-style:none}
html::-webkit-scrollbar{display:none}
body{font-family:system-ui,-apple-system,sans-serif;background:#1e293b;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px;scrollbar-width:none;-ms-overflow-style:none}
body::-webkit-scrollbar{display:none}

.msv-phone{width:288px;height:600px;background:#0b1220;border-radius:46px;padding:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),inset 0 0 0 2px #1e293b}
.msv-screen{width:100%;height:100%;border-radius:34px;overflow:hidden;background:#000;color:#fff;display:flex;flex-direction:column;position:relative}

.msv-bars{display:flex;gap:4px;padding:14px 12px 6px;z-index:6}
.msv-bar{flex:1;height:3px;border-radius:99px;background:rgba(255,255,255,.35);overflow:hidden}
.msv-bar i{display:block;height:100%;width:0;background:#fff;border-radius:99px}
.msv-bar.done i{width:100%}
.msv-bar.active i{animation:msvFill 4s linear forwards}
.msv-bar.paused i{animation-play-state:paused}
@keyframes msvFill{from{width:0}to{width:100%}}

.msv-head{display:flex;align-items:center;gap:9px;padding:4px 14px 8px;z-index:6}
.msv-ava{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#f43f5e,#f59e0b);color:#fff;font-weight:800;font-size:11px;display:flex;align-items:center;justify-content:center}
.msv-who b{font-size:12.5px}
.msv-who small{font-size:10.5px;opacity:.7;display:block}
.msv-x{margin-left:auto;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;line-height:1;opacity:.85}

.msv-stage{flex:1;position:relative;overflow:hidden}
.msv-slide{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;opacity:0;pointer-events:none;transition:opacity .3s}
.msv-slide.active{opacity:1}
.s0{background:linear-gradient(160deg,#f59e0b,#ef4444)}
.s1{background:linear-gradient(160deg,#8b5cf6,#ec4899)}
.s2{background:linear-gradient(160deg,#0ea5e9,#6366f1)}
.s3{background:linear-gradient(160deg,#1e293b,#4c1d95)}
.msv-emoji{font-size:82px;filter:drop-shadow(0 6px 16px rgba(0,0,0,.35))}
.msv-slide p{font-size:15px;font-weight:600;text-align:center;padding:0 32px;text-shadow:0 2px 8px rgba(0,0,0,.3)}
.msv-nav{position:absolute;top:0;bottom:0;width:38%;background:none;border:none;cursor:pointer;z-index:5}
.msv-nav.prev{left:0}
.msv-nav.next{right:0}

.msv-reply{display:flex;align-items:center;gap:10px;padding:11px 14px 16px;z-index:6}
.msv-reply input{flex:1;background:none;border:1.5px solid rgba(255,255,255,.5);border-radius:99px;padding:9px 15px;color:#fff;font-size:12.5px;outline:none;font-family:inherit}
.msv-reply input::placeholder{color:rgba(255,255,255,.7)}
.msv-like,.msv-send{background:none;border:none;color:#fff;font-size:20px;cursor:pointer;transition:transform .15s}
.msv-like.on{color:#fb7185}
.msv-like:active,.msv-send:active{transform:scale(.8)}

.msv-toast{position:absolute;left:50%;bottom:70px;transform:translateX(-50%) translateY(10px);background:rgba(0,0,0,.7);color:#fff;font-size:12px;padding:8px 16px;border-radius:99px;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s;z-index:7}
.msv-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}`,

  js: `var bars = Array.prototype.slice.call(document.querySelectorAll('.msv-bar'));
var slides = Array.prototype.slice.call(document.querySelectorAll('.msv-slide'));
var stage = document.getElementById('msvStage');
var idx = 0;
var paused = false;

function show(i){
  if (i < 0) i = 0;
  if (i >= slides.length){ i = slides.length - 1; }
  idx = i;
  slides.forEach(function(s, n){ s.classList.toggle('active', n === i); });
  bars.forEach(function(b, n){
    b.classList.remove('active','done','paused');
    if (n < i) b.classList.add('done');
    else if (n === i){
      var inner = b.querySelector('i');
      inner.style.animation = 'none';
      void inner.offsetWidth;
      inner.style.animation = '';
      b.classList.add('active');
    }
  });
}

// advance when the active bar finishes filling
document.getElementById('msvBars').addEventListener('animationend', function(e){
  if (e.animationName === 'msvFill'){
    if (idx < slides.length - 1) show(idx + 1);
    else bars[idx].classList.add('done');
  }
});

document.getElementById('msvNext').addEventListener('click', function(){ if (idx < slides.length - 1) show(idx + 1); });
document.getElementById('msvPrev').addEventListener('click', function(){ show(idx - 1); });

// hold to pause
function setPaused(p){
  paused = p;
  bars[idx].classList.toggle('paused', p);
}
stage.addEventListener('pointerdown', function(){ setPaused(true); });
window.addEventListener('pointerup', function(){ if (paused) setPaused(false); });

document.getElementById('msvLike').addEventListener('click', function(){
  this.classList.toggle('on');
  this.innerHTML = this.classList.contains('on') ? '&#10084;' : '&#9825;';
});

var toast = document.getElementById('msvToast');
var input = document.getElementById('msvInput');
function fireToast(msg){
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function(){ toast.classList.remove('show'); }, 1600);
}
document.getElementById('msvSend').addEventListener('click', function(){
  if (input.value.trim()){ fireToast('Reply sent ✓'); input.value = ''; }
});
input.addEventListener('keydown', function(e){
  if (e.key === 'Enter' && input.value.trim()){ fireToast('Reply sent ✓'); input.value = ''; }
});

show(0);`,

  seo: {
    title: 'Mobile Stories Viewer — Free HTML CSS JS UI Snippet',
    description: `A full-screen stories viewer with auto-advancing progress bars, tap-to-navigate zones, hold-to-pause, and a reply bar. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Mobile Stories Viewer — Segmented Story UI',
      description: `A stories viewer is a self-driving slideshow — segmented progress bars across the top that fill one at a time, tap zones to jump forward or back, and hold-to-pause. This snippet builds a complete, interactive one inside a CSS phone frame: the active segment fills over four seconds and auto-advances, tapping the left or right of the screen navigates, pressing and holding pauses, and a reply bar with a like button sits at the bottom — in HTML, CSS, and vanilla JavaScript with no dependency.

**CSS-driven segment timing**

Each story has a progress bar whose inner fill runs a four-second \`msvFill\` keyframe animation. The timing lives entirely in CSS, so there is no \`setInterval\` counting milliseconds — the browser drives the fill, and JavaScript only listens for when it finishes. Completed segments get a \`done\` class that pins them full, and future segments stay empty, so the bar row always reflects your position in the story.

**Auto-advance via animationend**

Rather than a timer, the viewer advances when the active bar's fill animation ends: an \`animationend\` listener checks the event's \`animationName\` and moves to the next slide, or stops at the last one. This ties the advance precisely to the visual completion, so the story never jumps early or late relative to the bar.

**Tap zones and restarting a segment**

Two invisible buttons cover the left and right ~38% of the stage for previous and next — the exact gesture zones stories apps use. Navigating re-shows a slide and restarts its bar by clearing the animation, forcing a reflow with \`void inner.offsetWidth\`, and re-applying it, so replaying a segment always starts its timer from zero.

**Hold to pause**

Pressing anywhere on the stage sets a \`paused\` class on the active bar that flips \`animation-play-state\` to paused, freezing both the fill and the countdown; releasing resumes it. Because pausing is pure CSS state, the fill picks up exactly where it stopped — the same read-without-rushing behavior real viewers offer.

**Reply and like**

The bottom bar has a reply input that fires a confirmation toast on send (Enter or the send button), and a like heart that toggles filled — the two lightweight engagement actions every story overlay includes.

**Accessibility and performance**

The navigation zones, the close and like buttons, and the send control are real buttons with \`aria-label\`s, so the viewer can be driven from the keyboard and screen readers announce each action. Auto-advancing content is inherently tricky for accessibility, so when you adapt this, honor \`prefers-reduced-motion\` by pausing the auto-advance and letting users step through manually, and expose the current position — "story 2 of 4" — through an \`aria-live\` region so non-visual users know where they are. The hold-to-pause gesture also gives everyone a way to stop the timer, which is a WCAG-friendly escape hatch for moving content. Performance is a strength of the CSS-timed design: the segment fill and its pause are pure CSS, so no timer runs on the main thread and pausing costs nothing, and advancing is driven by a single \`animationend\` event rather than polling. Slides cross-fade with opacity, which the browser composites cheaply. Swapping the gradients for images or video is the only heavier part; preload the next slide so transitions stay seamless.

**Reusing it**

Replace the gradient slides with real images or video, feed the segments from a story array, and post replies to your API. Lift the overlay out of the phone frame for a responsive web stories player, or keep it framed after a [mobile feed screen](/ui-snippets/mobile-feed-screen/) to present a full social app.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A full-screen story opens and the first segment bar begins filling.` },
      { title: 'Let it auto-advance', text: `When a segment bar finishes, the viewer moves to the next story automatically.` },
      { title: 'Tap to navigate', text: `Tap the right side to skip ahead or the left side to go back a story.` },
      { title: 'Hold to pause', text: `Press and hold anywhere to freeze the current segment; release to resume where it stopped.` },
      { title: 'Like the story', text: `The heart toggles between outline and filled.` },
      { title: 'Send a reply', text: `Type in the reply bar and press Enter or send — a confirmation toast appears.` },
    ] },
    features: [
      { title: 'Segmented progress bars', text: `One fills at a time across the top.` },
      { title: 'CSS-driven timing', text: `A keyframe fill, not a JS interval.` },
      { title: 'animationend advance', text: `Advances exactly when the bar completes.` },
      { title: 'Tap zones', text: `Left and right regions for back and forward.` },
      { title: 'Segment restart', text: `Reflow trick replays a bar from zero.` },
      { title: 'Hold to pause', text: `animation-play-state freezes and resumes.` },
      { title: 'Reply and like', text: `Toast on send and a toggling heart.` },
      { title: 'No dependency', text: `Pure HTML, CSS, and vanilla JavaScript.` },
    ],
    useCases: [
      { title: 'Social story views', text: 'Play full-screen stories with segmented bars filling one at a time, following a [mobile feed screen](/ui-snippets/mobile-feed-screen/) in a complete social flow.' },
      { title: 'Onboarding story tours', text: 'Present a first-run walkthrough as stories, as a swipeable alternative to the [mobile onboarding](/ui-snippets/mobile-onboarding/) screens, with tap zones to move back and forward.' },
      { title: 'Product highlight reels', text: 'Reuse the bar timing from [story progress bars](/ui-snippets/story-progress-bars/), driven by a CSS keyframe so `animationend` advances exactly when a bar completes.' },
      { title: 'Post-capture publishing', text: 'Follow a [mobile camera screen](/ui-snippets/mobile-camera-screen/) with this viewer to show how a captured photo appears once it is posted.' },
      { title: 'Hold-to-pause interactions', text: 'Study the tap zones and hold-to-pause behaviour, where pressing and holding freezes the running bar until the finger lifts.' },
      { icon: 'CODE', title: 'Related: Mobile Search Screen', desc: 'See the [Mobile Search Screen](/ui-snippets/mobile-search-screen/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the story advance without a JavaScript timer?', a: `Each segment's fill runs a four-second CSS keyframe animation. Instead of counting time in JS, an animationend listener checks the event's animationName and advances to the next slide when the active bar's fill completes. The browser owns the timing, so the advance stays perfectly in step with the visible bar.` },
      { q: 'How does hold-to-pause work?', a: `Pressing the stage adds a paused class to the active bar that sets animation-play-state to paused, freezing the fill. Releasing removes it and the animation resumes from the exact point it stopped, because pausing a CSS animation preserves its progress. No time bookkeeping is needed in JavaScript.` },
      { q: 'Why does replaying a segment restart its bar from zero?', a: `A CSS animation will not replay just by re-adding a class. When you navigate back to a story, the code clears the fill's animation, reads offsetWidth to force a reflow, then restores it. That reflow makes the browser start the animation fresh, so the segment's timer begins again at zero.` },
      { q: 'How are the tap-to-navigate zones created?', a: `Two transparent buttons overlay the left and right roughly 38 percent of the stage. Tapping the right one advances and the left one goes back, matching how stories apps split the screen into gesture regions. Because they are real buttons, they are also keyboard-focusable.` },
      { q: 'How do I use this stories viewer in React, Vue, or Angular?', a: `Hold the current index and paused flag in state. Advance on the fill's onAnimationEnd, and drive the active and done bar classes from the index. Restart a segment with a key change keyed to the index so it remounts. Bind pause to pointer handlers. Replace the gradient slides with media and post replies to your API. Tailwind expresses the bars and slides with utilities.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out the timing tricks in show() and the animationend listener on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the segment restart forces a reflow with void inner.offsetWidth before re-applying the animation, or how animation-play-state alone gives hold-to-pause without any JavaScript tracking elapsed time. The same assistant can help you optimize it — for example asking whether cross-fading real images or video instead of CSS gradients needs a preloading strategy so the animationend-driven advance never outruns a slow-loading asset. It is also a good way to extend the viewer: ask it to add a story-of-N counter for accessibility, support variable per-slide durations instead of a fixed four seconds, or wire the reply bar to a real backend. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a full-screen mobile "stories viewer" in plain HTML, CSS, and JavaScript using CSS keyframe animations for timing — no setInterval-based countdown.

Requirements:
- A row of segmented progress bars across the top, one per story slide, where the currently active bar's inner fill runs a four-second CSS keyframe animation from 0% to 100% width, completed bars are pinned at full width via a class, and future bars stay empty.
- Advance to the next slide only in response to the active bar's animationend event (checking the event's animationName), never via a JavaScript timer — the CSS animation duration is the single source of truth for pacing.
- Two invisible full-height tap zones covering roughly the left and right thirds of the stage that go to the previous or next slide respectively, layered above the slide content with z-index.
- When navigating to a slide (forward, back, or replaying the current one), its bar's fill animation must restart from zero: clear the animation, force a synchronous reflow by reading the element's offsetWidth, then reapply the animation — a class toggle alone will not restart a running CSS animation.
- Implement hold-to-pause: a pointerdown anywhere on the stage should add a class to the active bar that sets its animation-play-state to paused, freezing the fill exactly where it is, and a pointerup should remove that class and resume the fill from that same point.
- Slides cross-fade via an opacity transition on an active class, not display toggling, and each slide is absolutely positioned within the stage so they stack.
- Add a bottom bar with a text input that fires a temporary confirmation toast on Enter or a send button click, and a heart icon button that toggles a liked state and swaps its glyph.`,
    },
  },
};

export default mobileStoriesViewer;
