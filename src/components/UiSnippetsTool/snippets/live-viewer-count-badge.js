const liveViewerCountBadge = {
  id: 'live-viewer-count-badge',
  title: 'Live Viewer Count Badge',
  lastmod: '2026-08-24',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="lvc-card">
  <div class="lvc-thumb" aria-hidden="true">
    <svg viewBox="0 0 240 135" width="100%" height="100%"><rect width="240" height="135" fill="#111827"/><circle cx="120" cy="60" r="34" fill="#374151"/><rect x="70" y="100" width="100" height="22" rx="6" fill="#374151"/></svg>
    <span class="lvc-live-badge"><span class="lvc-dot"></span>LIVE</span>
    <span class="lvc-viewers" id="lvcViewers"><span class="lvc-dot lvc-dot-small"></span><span id="lvcCount">1,284</span> watching</span>
  </div>
  <div class="lvc-meta">
    <p class="lvc-title">Building a UI component library from scratch</p>
    <p class="lvc-sub">DevStream · Started 42 minutes ago</p>
  </div>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.lvc-card{width:100%;max-width:360px;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,.1)}
.lvc-thumb{position:relative;aspect-ratio:16/9;background:#111827}
.lvc-thumb svg{display:block}
.lvc-live-badge{position:absolute;top:10px;left:10px;display:inline-flex;align-items:center;gap:5px;background:#dc2626;color:#fff;font-size:10.5px;font-weight:800;letter-spacing:.04em;padding:4px 8px 4px 6px;border-radius:5px}
.lvc-dot{width:6px;height:6px;border-radius:50%;background:#fff;animation:lvcPulse 1.4s ease-in-out infinite}
.lvc-viewers{position:absolute;bottom:10px;left:10px;display:inline-flex;align-items:center;gap:6px;background:rgba(17,24,39,.75);backdrop-filter:blur(4px);color:#fff;font-size:11.5px;font-weight:700;padding:5px 10px;border-radius:999px;transition:transform .15s}
.lvc-viewers.lvc-bump{transform:scale(1.06)}
.lvc-dot-small{background:#34d399;animation:none}
@keyframes lvcPulse{0%,100%{opacity:1}50%{opacity:.25}}
.lvc-meta{padding:12px 14px}
.lvc-title{font-size:13.5px;font-weight:700;color:#0f172a;line-height:1.4;margin-bottom:4px}
.lvc-sub{font-size:11.5px;color:#94a3b8}`,
  js: `(function(){
  var countEl = document.getElementById('lvcCount');
  var viewersEl = document.getElementById('lvcViewers');
  var current = 1284;
  var bumpTimer = null;

  function formatCount(n) {
    return n.toLocaleString();
  }

  function tick() {
    // random-walk the count so it feels like a live stream, not a static number:
    // small moves most of the time, occasional larger swings, never below a floor
    var direction = Math.random() < 0.55 ? 1 : -1;
    var magnitude = Math.random() < 0.85
      ? Math.floor(Math.random() * 4) + 1
      : Math.floor(Math.random() * 22) + 10;
    current = Math.max(940, current + direction * magnitude);
    countEl.textContent = formatCount(current);

    clearTimeout(bumpTimer);
    viewersEl.classList.add('lvc-bump');
    bumpTimer = setTimeout(function () { viewersEl.classList.remove('lvc-bump'); }, 150);
  }

  var intervalId = setInterval(tick, 2200);

  // pause updates when the tab isn't visible to avoid unnecessary work in the background
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      clearInterval(intervalId);
    } else {
      intervalId = setInterval(tick, 2200);
    }
  });
})();`,
  seo: {
    title: 'Live Viewer Count Badge — Free HTML CSS JS Live Stream Snippet',
    description: 'A "LIVE" badge with a pulsing dot and a viewer counter that random-walks up and down like a real live stream, pausing updates when the tab is backgrounded.',
    about: {
      title: 'Live Viewer Count Badge — Random-Walk Counter with a Visibility-Aware Timer',
      description: `A live viewer count only feels "live" if the number actually moves — a static count next to a pulsing red dot reads as obviously fake within a few seconds. This snippet drives a believable, gently fluctuating counter with a constrained random walk instead of either a static number or fully random noise.

**A random walk, not random noise**

Each \`tick()\` picks a direction (up 55% of the time, down 45%, so the count trends slightly upward like a growing stream) and a magnitude — usually a small move of 1 to 4 viewers, but 15% of the time a larger jump of 10 to 31, simulating a batch of viewers joining or leaving together (e.g. after a clip gets shared). \`current = Math.max(940, current + direction * magnitude)\` clamps the result so the count never drifts below a believable floor, preventing an unlucky streak of "down" ticks from crashing the number toward zero.

**Two different dots for two different meanings**

The "LIVE" badge's dot uses \`@keyframes lvcPulse\` fading between full and low opacity — a heartbeat signaling the stream is active. The viewer-count dot is deliberately static (green, no animation) — it represents current status, not a pulse — so the two indicators aren't visually competing for the same "this is animating, pay attention" attention.

**A tiny scale bump on every update**

Each tick briefly adds \`.lvc-bump\` (a 6% CSS \`transform: scale()\`) to the whole viewer pill and removes it 150ms later via \`clearTimeout\`/\`setTimeout\`, giving a subtle tactile confirmation that the number just changed — small enough not to be distracting on a 2.2-second cycle, noticeable enough to register subconsciously.

**Pausing work in a backgrounded tab**

The \`visibilitychange\` listener clears the interval when \`document.hidden\` is true and restarts it when the tab becomes visible again. A live counter nobody is looking at doesn't need to keep computing and repainting every 2.2 seconds — this is a small but genuine performance courtesy, especially if a page has several such widgets running simultaneously.

**Customizing it**

Replace the random-walk simulation with a real WebSocket or Server-Sent Events feed from your streaming backend, keeping the same \`.lvc-bump\` visual feedback and \`formatCount()\` thousands-separator formatting for whatever real number arrives.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A stream thumbnail renders with a pulsing "LIVE" badge and a viewer count that updates every 2.2 seconds.` },
      { title: 'Watch the counter', text: `The number drifts up and down in small steps, occasionally jumping by a larger amount, and briefly scales up on each change.` },
      { title: 'Switch to another browser tab', text: `Updates pause automatically; switching back resumes the counter.` },
      { title: 'Replace the simulation with real data', text: `In the JS, swap the tick() function's random-walk logic for a value received from a WebSocket or polling endpoint.` },
      { title: 'Adjust the update frequency', text: `Change the 2200ms interval in setInterval(tick, 2200) to update more or less often.` },
      { title: 'Tune the movement feel', text: `Edit the direction probability and magnitude ranges in tick() to make the count feel calmer or busier.` },
    ] },
    features: [
      { title: 'Constrained random-walk counter', text: `Small frequent moves and occasional larger jumps simulate believable real audience movement.` },
      { title: 'Floor-clamped value', text: `Math.max() prevents the count from ever drifting toward an implausible near-zero number.` },
      { title: 'Two visually distinct status dots', text: `A pulsing red dot for "live," a static green dot for the viewer count — different meanings, different motion.` },
      { title: 'Scale-bump feedback on update', text: `A brief CSS transform confirms each tick without being distracting.` },
      { title: 'Visibility-aware interval', text: `Updates pause automatically when the browser tab is backgrounded, resuming when it's visible again.` },
      { title: 'Locale-formatted count', text: `toLocaleString() adds thousands separators automatically for any locale.` },
      { title: 'Glass-morphism viewer pill', text: `backdrop-filter: blur() keeps the counter legible over any thumbnail image.` },
      { title: 'Zero dependencies', text: `Pure HTML, CSS, and vanilla JavaScript — no WebSocket library required for the demo.` },
    ],
    useCases: [
      { title: 'Live streaming platforms', text: `Show a believable, actively-updating audience count on stream thumbnails and player overlays.` },
      { title: 'Virtual event and webinar pages', text: `Display live attendee counts during a broadcast or Q&A session.` },
      { title: 'Flash sale and drop pages', text: `Show a "people viewing this" counter to reinforce urgency during a limited-time sale.` },
      { title: 'Sports and news live blogs', text: `Show concurrent reader counts alongside a live-updating article.` },
      { title: 'Auction platforms', text: `Display how many bidders are currently watching a live auction lot.` },
      { title: 'Learning visibility-aware timers', text: `A clear example of pausing background work using the Page Visibility API.` },
      { icon: 'CODE', title: 'Related: Before/After Image Slider — CSS Only Radio Steps (No JavaScript)', desc: 'See the [Before/After Image Slider — CSS Only Radio Steps (No JavaScript)](/ui-snippets/css-only-before-after-image-slider/) for a related misc pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Share-URL State Sync — Filters Encoded into a Copyable Link', desc: 'See the [Share-URL State Sync — Filters Encoded into a Copyable Link](/ui-snippets/share-url-state-sync/) for a related misc pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `Why use a random walk instead of fully random numbers each tick?`, a: `Fully random numbers would make the count jump unpredictably between ticks with no continuity, which reads as obviously fake. A random walk changes the existing value by a small delta each time, so the number drifts naturally the way a real audience count would — mostly small moves, occasionally a bigger jump when a group joins or leaves together.` },
      { q: `Why does the count sometimes jump by a larger amount?`, a: `The tick() function rolls an 85/15 split: 85% of the time it applies a small 1-4 viewer move, and 15% of the time a larger 10-31 viewer swing, simulating something like a clip going semi-viral or a batch of viewers navigating away together. Without the occasional larger jump, the counter would feel too metronomic and uniform.` },
      { q: `Why pause the counter when the browser tab isn't visible?`, a: `The Page Visibility API's visibilitychange event and document.hidden property let the script detect when the tab is backgrounded and clear the interval, avoiding unnecessary timer callbacks, DOM updates, and repaints for a widget nobody is currently looking at — then restart the interval once the tab becomes visible again.` },
      { q: `How do I connect this to a real viewer count from my backend?`, a: `Replace the body of tick() with logic that reads the latest count from a WebSocket message handler or a periodic fetch() poll, instead of computing a random delta. Keep calling countEl.textContent = formatCount(newValue) and toggling the .lvc-bump class so the same visual feedback applies to real updates.` },
      { q: `Why does the count never go below 940?`, a: `Math.max(940, current + direction * magnitude) clamps every update to a floor value. Without this, a long unlucky streak of "down" ticks in the random walk could theoretically drift the number toward zero or negative, which would look obviously wrong for what's meant to represent an active live stream's audience.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the random-walk math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why a constrained random walk with an 85/15 split between small and large moves reads as more believable than either a static number or fully random values each tick, and how the visibilitychange listener avoids wasted work in a backgrounded tab. The same assistant can help optimize it too — ask whether the bump animation's timing should vary with the magnitude of each update. It's also useful for extending the badge: ask it to wire in a real WebSocket feed, add a small up/down trend arrow next to the count, or animate the digits individually like an odometer instead of swapping the whole text at once. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "live viewer count badge" for a stream thumbnail in plain HTML, CSS, and JavaScript with no library.

Requirements:
- A thumbnail area with a "LIVE" badge in one corner featuring a small dot that pulses continuously via a CSS opacity keyframe animation, and a separate viewer-count pill in another corner showing a static (non-pulsing) status dot plus a formatted number and the word "watching".
- A JavaScript function that updates the viewer count on a fixed interval using a constrained random walk: most updates should nudge the current value by a small random amount in a randomly chosen direction, with a smaller chance of a much larger jump in either direction, and the result must be clamped to never fall below a reasonable floor value.
- Format the displayed number with thousands separators using the appropriate built-in string formatting method.
- On every update, briefly apply a small CSS scale transform to the viewer-count pill and remove it a short time later, giving a subtle visual pulse confirming the number changed, using a debounced timer so rapid updates don't stack multiple removals.
- Use the Page Visibility API to pause the update interval entirely when the browser tab is not visible, and resume it automatically when the tab becomes visible again.`,
    },
  },
};

export default liveViewerCountBadge;
