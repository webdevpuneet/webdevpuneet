const doubleTapLikeBurst = {
  id: 'double-tap-like-burst',
  title: 'Double-Tap to Like',
  lastmod: '2026-08-23',
  category: 'animations',
  cdnUrls: [],
  html: `<div class="dtl-wrap">
  <article class="dtl-card" id="dtlCard">
    <div class="dtl-media" id="dtlMedia">
      <img class="dtl-img" src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=70&auto=format&fit=crop" alt="Forest path" draggable="false">
    </div>
    <div class="dtl-footer">
      <button type="button" class="dtl-like-btn" id="dtlLikeBtn" aria-pressed="false">
        <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <span id="dtlCount">2,481</span>
      </button>
      <span class="dtl-tip">Double-tap the photo to like</span>
    </div>
  </article>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0b12;color:#e6e6ee;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:22px}

.dtl-wrap{width:100%;max-width:380px}
.dtl-card{border-radius:16px;overflow:hidden;background:#15151f;border:1px solid #26263a}
.dtl-media{position:relative;aspect-ratio:1;overflow:hidden;-webkit-user-select:none;user-select:none}
.dtl-img{width:100%;height:100%;object-fit:cover;pointer-events:none;transition:transform .25s}
.dtl-card.liked .dtl-img{transform:scale(1.02)}

.dtl-burst-heart{position:absolute;width:84px;height:84px;margin:-42px 0 0 -42px;pointer-events:none;filter:drop-shadow(0 6px 18px rgba(0,0,0,.5))}
.dtl-burst-heart svg{width:100%;height:100%;fill:#fff}

.dtl-footer{display:flex;align-items:center;gap:12px;padding:12px 14px}
.dtl-like-btn{display:inline-flex;align-items:center;gap:7px;background:transparent;border:none;color:#a9adc1;font:700 13.5px system-ui;cursor:pointer;padding:4px 2px}
.dtl-like-btn svg{width:22px;height:22px;fill:#565a71;transition:fill .15s,transform .15s}
.dtl-like-btn.liked svg{fill:#f43f5e;animation:dtlPop .4s cubic-bezier(.2,1.4,.4,1)}
.dtl-like-btn.liked span{color:#f43f5e}
@keyframes dtlPop{0%{transform:scale(0)}55%{transform:scale(1.3)}100%{transform:scale(1)}}
.dtl-tip{margin-left:auto;font-size:11px;color:#5b5f77}`,

  js: `var media = document.getElementById('dtlMedia');
var card = document.getElementById('dtlCard');
var likeBtn = document.getElementById('dtlLikeBtn');
var countEl = document.getElementById('dtlCount');

var liked = false;
var count = 2481;

function setLiked(v) {
  if (v === liked) return;
  liked = v;
  card.classList.toggle('liked', liked);
  likeBtn.classList.toggle('liked', liked);
  likeBtn.setAttribute('aria-pressed', liked ? 'true' : 'false');
  count += liked ? 1 : -1;
  countEl.textContent = count.toLocaleString();
}

function popHeartAt(x, y) {
  var rect = media.getBoundingClientRect();
  var heart = document.createElement('div');
  heart.className = 'dtl-burst-heart';
  heart.style.left = (x - rect.left) + 'px';
  heart.style.top = (y - rect.top) + 'px';
  heart.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
  media.appendChild(heart);
  heart.animate(
    [
      { transform: 'scale(0) rotate(-14deg)', opacity: 0, offset: 0 },
      { transform: 'scale(1.15) rotate(4deg)', opacity: 1, offset: 0.28 },
      { transform: 'scale(1) rotate(0deg)', opacity: 1, offset: 0.5 },
      { transform: 'scale(1) rotate(0deg)', opacity: 0, offset: 1 },
    ],
    { duration: 900, easing: 'cubic-bezier(.2,.8,.3,1)' }
  ).onfinish = function () { heart.remove(); };
}

// --- Real double-tap / double-click detection ---
// A single ondblclick handler does not fire reliably (or at all) for touch
// gestures, so tap timestamps are compared by hand: two taps landing on the
// media within DOUBLE_TAP_MS of each other, close enough together in
// position, count as a double-tap. A single tap alone never likes anything.
var DOUBLE_TAP_MS = 320;
var DOUBLE_TAP_DIST = 36;
var lastTapTime = 0;
var lastTapX = 0, lastTapY = 0;

function handleTap(x, y) {
  var now = Date.now();
  var dt = now - lastTapTime;
  var dist = Math.hypot(x - lastTapX, y - lastTapY);

  if (dt > 0 && dt < DOUBLE_TAP_MS && dist < DOUBLE_TAP_DIST) {
    lastTapTime = 0; // consume the pair so a third tap starts fresh
    setLiked(true);
    popHeartAt(x, y);
  } else {
    lastTapTime = now;
    lastTapX = x;
    lastTapY = y;
  }
}

media.addEventListener('touchend', function (e) {
  var t = e.changedTouches[0];
  handleTap(t.clientX, t.clientY);
}, { passive: true });

// Mouse path for desktop testing (two real clicks compared the same way,
// not the browser's built-in dblclick which fires on a fixed OS-level timer).
media.addEventListener('click', function (e) { handleTap(e.clientX, e.clientY); });

likeBtn.addEventListener('click', function () { setLiked(!liked); });`,

  seo: {
    title: 'Double-Tap to Like — Free Instagram-Style Tap Gesture Snippet',
    description: `A real double-tap gesture (timestamp-compared taps, not the unreliable dblclick event) pops a heart from the tap point and toggles a persistent like state. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Double-Tap to Like — Real Gesture Detection, Not dblclick',
      description: `This is the Instagram-style interaction where tapping a photo twice in quick succession pops a heart from the exact tap location and likes the post, distinct from tapping a dedicated like button (see [like burst button](/ui-snippets/like-burst-button/) for that click-triggered version). The whole point of this snippet is that it detects a genuine double-tap gesture by hand — it does not rely on the browser's native \`dblclick\` event, which behaves inconsistently on touch devices and does not report where the second tap landed relative to the first.

**Why dblclick is not enough**

\`dblclick\` fires from two \`click\` events close together at the OS/browser level, but on touch devices tap-to-click synthesis is inconsistent across browsers, and \`dblclick\` gives you no way to check *where* each tap landed — a double-tap on one corner of a photo and a double-tap on the opposite corner both just fire the same event. This snippet instead listens for \`touchend\` (and \`click\`, for desktop testing) directly and does the comparison itself.

**Timestamp and distance comparison**

Every tap calls \`handleTap(x, y)\`, which computes \`dt = now - lastTapTime\` and the on-screen distance from the previous tap with \`Math.hypot\`. If the new tap arrives within \`DOUBLE_TAP_MS\` (320ms) *and* within \`DOUBLE_TAP_DIST\` (36px) of the previous one, it counts as a double-tap and triggers the like; otherwise the tap is simply recorded as the new "last tap" to compare the next one against. Requiring both a time window and a position window is what stops two unrelated taps in different corners of the photo, or two taps a second apart, from being misread as one gesture.

**The heart pops from the actual tap point**

\`popHeartAt(x, y)\` converts the tap's viewport coordinates into a position relative to the photo with \`getBoundingClientRect()\`, then creates a heart element positioned exactly there and animates it through a scale-up-with-rotation-then-fade sequence via the Web Animations API, removing itself on \`onfinish\` — the same fire-and-forget cleanup pattern as [like burst button](/ui-snippets/like-burst-button/), but positioned at wherever you actually tapped rather than a fixed spot.

**Persistent state, separate from the animation**

The heart animation and the \`liked\` state are deliberately decoupled: \`setLiked(true)\` always runs on a successful double-tap (toggling the button, count, and card styling), but the like button itself can also toggle the same state independently via a normal click, and repeated double-taps on an already-liked photo simply keep the state at "liked" without double-counting, matching real apps where a double-tap only ever *adds* a like visually.

**Customizing it**

Tune \`DOUBLE_TAP_MS\` and \`DOUBLE_TAP_DIST\` for stricter or looser detection, change the heart's easing and duration, or spawn multiple hearts per tap for a bigger celebration. Pair it with [swipe cards](/ui-snippets/swipe-cards/) for a full feed-card interaction set.`,
    },
    howToUse: { type: 'steps', items: [
      { title: `Paste HTML, CSS, and JS`, text: `A photo card renders with a like button beneath it.` },
      { title: `Tap or click the photo once`, text: `Nothing happens yet — it is recorded as the first tap.` },
      { title: `Tap again quickly, nearby`, text: `A heart pops from that exact spot and the post is liked.` },
      { title: `Tap slowly or far apart`, text: `Two taps outside the time or distance window do not trigger a like.` },
      { title: `Use the like button directly`, text: `It toggles the same state independent of double-tapping.` },
      { title: `Tune the thresholds`, text: `Change DOUBLE_TAP_MS and DOUBLE_TAP_DIST for sensitivity.` },
    ] },
    features: [
      { title: `Real tap-timing detection`, text: `Compares timestamps by hand, not the dblclick event.` },
      { title: `Position-aware pairing`, text: `Math.hypot rejects taps that land too far apart.` },
      { title: `Tap-point-accurate heart`, text: `Pops exactly where the second tap landed.` },
      { title: `WAAPI fire-and-forget`, text: `The heart animates and self-removes on finish.` },
      { title: `Idempotent like state`, text: `Repeated double-taps never double-count a like.` },
      { title: `Independent like button`, text: `A normal tap toggles the same underlying state.` },
      { title: `Touch and mouse paths`, text: `Works via touchend on mobile, click for desktop testing.` },
      { title: `No dependency`, text: `Pure HTML/CSS/JS — no gesture library.` },
    ],
    useCases: [
      { title: 'Social feed photos', text: 'Reproduce the classic double-tap to like on a photo or post, popping a heart from the exact point of the second tap.' },
      { title: 'Story and reel viewers', text: 'Let people like without covering the media with a button, comparing timestamps by hand because `dblclick` is unreliable on touch.' },
      { title: 'Photo gallery gestures', text: 'Add a like gesture next to a [swipe cards](/ui-snippets/swipe-cards/) deck, rejecting taps that land too far apart using `Math.hypot`.' },
      { title: 'Message photo reactions', text: 'Let users double-tap a shared photo to react quickly, with a persistent like state toggled alongside the animation.' },
      { title: 'Button-triggered comparison', text: 'Contrast with the click-driven [like burst button](/ui-snippets/like-burst-button/), as the heart here animates via the Web Animations API and removes itself.' },
      { icon: 'CODE', title: 'Related: GSAP Flip Layout Transition', desc: 'See the [GSAP Flip Layout Transition](/ui-snippets/gsap-flip-layout-transition/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `Why not just use the browser's dblclick event?`, a: `dblclick fires from two click events close together, but touch-to-click synthesis is inconsistent across mobile browsers, and dblclick never tells you where each tap actually landed. This snippet listens to touchend and click directly, records each tap's timestamp and coordinates, and compares the new tap against the previous one itself — giving full control over both the timing and position thresholds that count as a double-tap.` },
      { q: `How does it decide two taps are a double-tap?`, a: `handleTap(x, y) computes the time since the previous tap and the on-screen distance between the two tap points using Math.hypot. Only when the new tap arrives within DOUBLE_TAP_MS (320ms) of the previous one, and within DOUBLE_TAP_DIST (36px) of it, does it count as a double-tap and trigger the like. Requiring both conditions stops two unrelated taps in different spots, or two taps a second apart, from being misread as one gesture.` },
      { q: `Why does the heart appear exactly where I tapped?`, a: `popHeartAt(x, y) takes the tap's viewport coordinates and converts them into a position relative to the photo using getBoundingClientRect(), then positions a new heart element at that exact offset before animating it. Because the coordinates come from the real tap event rather than a fixed center point, double-tapping any corner of the photo pops the heart from that corner.` },
      { q: `Can double-tapping accidentally unlike a photo?`, a: `No. setLiked(true) is what a successful double-tap always calls, regardless of the current state, so repeated double-taps on an already-liked photo simply keep it liked without incrementing the count again. Only the separate like button click toggles the state in both directions, matching how double-tap-to-like behaves in real apps.` },
      { q: `How do I use this double-tap-to-like snippet in React, Vue, or Angular?`, a: `Keep lastTapTime/lastTapX/lastTapY in refs (not state, since they change on every tap without needing a re-render), and keep liked/count in component state. Attach the touchend and click listeners to the media ref in a mount effect, call your like API from inside setLiked, and spawn the heart animation with element.animate directly on a DOM node rather than through render.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out the tap-timing comparison from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why dblclick is unreliable for detecting a real double-tap gesture on touch devices, and how comparing both the elapsed time (via Date.now()) and the on-screen distance (via Math.hypot) between two taps is what correctly separates one intentional double-tap from two unrelated single taps. The same assistant can help you optimize it — for instance asking whether DOUBLE_TAP_MS and DOUBLE_TAP_DIST should be tuned differently for touch versus mouse input, since finger taps naturally land with more positional variance than mouse clicks. It is also useful for extending the interaction: ask it to add a small heart burst (multiple particles, not just one heart) on double-tap, support double-tap-to-zoom on the same gesture detector, or add a subtle single-tap ripple that does not trigger a like, to give feedback that the first tap registered. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "double-tap to like" interaction in plain HTML, CSS, and JavaScript with real gesture detection — do not use the browser's dblclick event, since it behaves inconsistently on touch devices and cannot report tap position.

Requirements:
- An image inside a card, with a separate like button (icon + count) below it that also independently toggles the same liked state.
- Detect a double-tap by hand: on both touchend (using event.changedTouches for the tap coordinates) and click (for desktop/mouse testing), record the current timestamp via Date.now() and the tap's x/y coordinates. Compare each new tap against the previously recorded one using both the elapsed time and the on-screen distance (computed with Math.hypot on the coordinate deltas).
- Only treat two taps as a double-tap if the second arrives within a configurable time window (e.g. 300-350ms) of the first AND within a configurable distance threshold (e.g. under 40px) of the first's position — a single tap alone, two taps too far apart in time, or two taps too far apart in position must never trigger the like.
- On a successful double-tap, create a heart element positioned at the exact tap coordinates (converted relative to the image using getBoundingClientRect, not a fixed center point), and animate it with the Web Animations API through a pop-in-with-slight-rotation-then-fade sequence, removing the element from the DOM in the animation's onfinish callback so hearts never accumulate.
- A successful double-tap must always set the liked state to true (never toggle it off), so repeatedly double-tapping an already-liked photo does not un-like it or double-count the like; only a direct click on the separate like button should be able to toggle the state in both directions.
- Update a visible like count and the like button's visual/aria-pressed state whenever the liked state changes, regardless of whether it changed via double-tap or via the button.`,
    },
  },
};

export default doubleTapLikeBurst;
