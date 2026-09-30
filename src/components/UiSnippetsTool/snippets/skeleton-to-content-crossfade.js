const skeletonToContentCrossfade = {
  id: 'skeleton-to-content-crossfade',
  title: 'Skeleton to Content Crossfade',
  lastmod: '2026-08-24',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="stc-wrap">
  <button class="stc-btn" id="stcReload">Reload data</button>
  <div class="stc-stack" id="stcStack" aria-busy="true" aria-live="polite">
    <div class="stc-layer stc-skeleton" id="stcSkeleton">
      <div class="stc-sk-row">
        <div class="stc-sk stc-sk-avatar"></div>
        <div class="stc-sk-lines">
          <div class="stc-sk stc-sk-line" style="width:60%"></div>
          <div class="stc-sk stc-sk-line" style="width:40%"></div>
        </div>
      </div>
      <div class="stc-sk stc-sk-block"></div>
      <div class="stc-sk stc-sk-line" style="width:90%"></div>
      <div class="stc-sk stc-sk-line" style="width:75%"></div>
    </div>
    <div class="stc-layer stc-content" id="stcContent">
      <div class="stc-row">
        <div class="stc-avatar">JM</div>
        <div>
          <p class="stc-name">Jordan Mills</p>
          <p class="stc-role">Product Designer · 2h ago</p>
        </div>
      </div>
      <div class="stc-block" aria-hidden="true">
        <svg viewBox="0 0 200 90" width="100%" height="100%"><rect width="200" height="90" rx="10" fill="#eef2ff"/><path d="M10 70 L50 40 L85 55 L120 20 L160 45 L190 15" stroke="#818cf8" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <p class="stc-text">Shipped the new onboarding flow this morning — early signups are already converting 18% better than the previous version.</p>
    </div>
  </div>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.stc-wrap{width:100%;max-width:380px}
.stc-btn{padding:9px 16px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;margin-bottom:14px}
.stc-btn:hover{background:#4f46e5}
.stc-btn:disabled{opacity:.6;cursor:default}
.stc-stack{position:relative;background:#fff;border-radius:16px;padding:20px;box-shadow:0 4px 24px rgba(15,23,42,.08);min-height:220px}
.stc-layer{position:absolute;inset:0;padding:20px;transition:opacity .35s ease;display:flex;flex-direction:column;gap:12px}
.stc-skeleton{opacity:1}
.stc-content{opacity:0;pointer-events:none}
.stc-stack.stc-loaded .stc-skeleton{opacity:0;pointer-events:none}
.stc-stack.stc-loaded .stc-content{opacity:1;pointer-events:auto}
.stc-sk-row{display:flex;gap:10px;align-items:center}
.stc-sk{border-radius:8px;background:linear-gradient(90deg,#eef1f6 25%,#f6f8fb 37%,#eef1f6 63%);background-size:400% 100%;animation:stcShimmer 1.4s ease-in-out infinite}
.stc-sk-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0}
.stc-sk-lines{flex:1;display:flex;flex-direction:column;gap:7px}
.stc-sk-line{height:11px}
.stc-sk-block{height:90px}
@keyframes stcShimmer{0%{background-position:100% 0}100%{background-position:0 0}}
.stc-row{display:flex;gap:10px;align-items:center}
.stc-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.stc-name{font-size:13.5px;font-weight:700;color:#0f172a}
.stc-role{font-size:11.5px;color:#94a3b8;margin-top:1px}
.stc-block{border-radius:10px;overflow:hidden;height:90px}
.stc-text{font-size:13px;color:#475569;line-height:1.6}`,
  js: `(function(){
  var stack = document.getElementById('stcStack');
  var btn = document.getElementById('stcReload');

  function load() {
    btn.disabled = true;
    stack.classList.remove('stc-loaded');
    stack.setAttribute('aria-busy', 'true');
    // simulate a network request; swap for a real fetch() in production
    setTimeout(function () {
      stack.classList.add('stc-loaded');
      stack.setAttribute('aria-busy', 'false');
      btn.disabled = false;
    }, 1400);
  }

  btn.addEventListener('click', load);
  load();
})();`,
  seo: {
    title: 'Skeleton to Content Crossfade — Free HTML CSS JS Loading Snippet',
    description: 'A loading pattern that crossfades a shimmering skeleton into real content using stacked absolutely-positioned layers and a single opacity toggle, with aria-busy for accessibility.',
    about: {
      title: 'Skeleton to Content Crossfade — Stacked Layers with One Class Toggle',
      description: `Swapping a skeleton loader for real content usually means the layout jumps or the skeleton just vanishes abruptly. This snippet crossfades between the two states smoothly by stacking both the skeleton and the real content in the same space and animating opacity, driven by a single CSS class toggle.

**Two layers, one position**

Both \`.stc-skeleton\` and \`.stc-content\` sit inside \`.stc-stack\` with \`position: absolute; inset: 0\`, occupying the exact same box. Because they overlap rather than sitting in normal document flow, toggling between them never causes a layout shift — the container's height is set by whichever layer is currently visible, and both layers are always present in the DOM, just at different opacity.

**One class controls both transitions**

Adding \`.stc-loaded\` to the parent \`.stc-stack\` is the only state change JavaScript needs to make: the CSS rules \`.stc-stack.stc-loaded .stc-skeleton { opacity: 0 }\` and \`.stc-stack.stc-loaded .stc-content { opacity: 1 }\` handle both fades from a single toggle, guaranteeing they're always in sync — there's no risk of the skeleton fading out on a different schedule than the content fades in.

**pointer-events prevents a dead-zone trap**

Both layers also flip \`pointer-events\` alongside opacity — the hidden layer gets \`pointer-events: none\` so an invisible skeleton (or invisible content, before load) can never intercept clicks meant for the layer that's actually visible. Without this, a user could click exactly where a real button appears to be and hit an invisible skeleton element instead.

**The shimmer animation is independent of the crossfade**

\`@keyframes stcShimmer\` animates a moving gradient across each skeleton block on a continuous loop, entirely separate from the opacity transition — the shimmer keeps running for as long as the skeleton is visible, and simply stops mattering once \`.stc-loaded\` fades it out, no coordination between the two animations required.

**Accessible loading state**

\`aria-busy="true"\` on the stack while loading, flipped to \`"false"\` once content is ready, tells assistive technology the region is in a busy/loading state without needing to read the skeleton's decorative shimmer bars as content.

**Customizing it**

Replace the \`setTimeout\` in \`load()\` with a real \`fetch()\` call, populating the content layer's actual data once the response resolves, before adding the \`.stc-loaded\` class.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A shimmering skeleton shows for about 1.4 seconds, then crossfades into the real content.` },
      { title: 'Click "Reload data"', text: `The content fades back to the skeleton state, then crossfades to content again after the simulated delay.` },
      { title: 'Inspect the two layers', text: `Both .stc-skeleton and .stc-content exist in the DOM simultaneously, stacked with position: absolute.` },
      { title: 'Replace the simulated delay', text: `In the JS, swap the setTimeout in load() for a real fetch() call to your API.` },
      { title: 'Populate real data', text: `Before adding the .stc-loaded class, update the content layer's text and images from your fetch response.` },
      { title: 'Adjust the crossfade speed', text: `Edit the transition: opacity duration on .stc-layer to make the fade faster or slower.` },
    ] },
    features: [
      { title: 'Stacked absolute-position layers', text: `Skeleton and content occupy the same box, eliminating layout shift when swapping between them.` },
      { title: 'Single class toggle drives both fades', text: `.stc-loaded on the parent controls both the skeleton fade-out and content fade-in in perfect sync.` },
      { title: 'pointer-events prevents click traps', text: `The hidden layer can never intercept clicks meant for the visible one.` },
      { title: 'Independent shimmer animation', text: `A continuous gradient sweep runs on skeleton blocks, decoupled from the crossfade transition.` },
      { title: 'aria-busy accessibility state', text: `Assistive technology is told when the region is loading versus ready.` },
      { title: 'Disabled reload button while loading', text: `Prevents overlapping load cycles from a rapid double-click.` },
      { title: 'Matched skeleton and content shapes', text: `Skeleton block sizes mirror the real content's avatar, image, and text line dimensions.` },
      { title: 'Zero dependencies', text: `Pure HTML, CSS, and vanilla JavaScript — no animation or loading-state library.` },
    ],
    useCases: [
      { title: 'Social feed and card lists', text: `Smoothly transition each card from loading to loaded instead of an abrupt content pop-in.` },
      { title: 'Dashboard widgets', text: `Crossfade charts and stats from skeleton placeholders into real data on refresh.` },
      { title: 'Profile and detail pages', text: `Avoid layout shift when user or product data finishes loading.` },
      { title: 'Search result panels', text: `Crossfade from a loading skeleton into real results on every new search.` },
      { title: 'Single-page app route transitions', text: `Smooth the moment between a route change and its data becoming available.` },
      { title: 'Learning layered UI state patterns', text: `A clean example of using absolute positioning and one class toggle to manage two overlapping states.` },
    ],
    faqs: [
      { q: `Why stack both layers instead of removing the skeleton from the DOM?`, a: `Stacking with position: absolute means both layers occupy the exact same space at all times, so the container's size doesn't jump when swapping between them, and the opacity transition can crossfade smoothly. Removing and inserting DOM nodes instead would require the container to resize abruptly and couldn't animate the exit and entrance together.` },
      { q: `How does one class toggle control two separate animations?`, a: `The CSS defines both transitions relative to the same parent selector: .stc-stack.stc-loaded .stc-skeleton and .stc-stack.stc-loaded .stc-content. Since both rules key off the identical .stc-loaded class on the identical parent element, JavaScript only ever needs to add or remove that one class, and the browser's CSS engine keeps both opacity transitions perfectly synchronized.` },
      { q: `Why toggle pointer-events alongside opacity?`, a: `An element with opacity: 0 is still in the document and still receives clicks by default. Without pointer-events: none on the hidden layer, a user clicking where a visible button appears to be could actually be clicking through to an invisible skeleton element sitting on top of or behind it, causing confusing dead clicks.` },
      { q: `Does the shimmer animation need to be stopped manually when content loads?`, a: `No — the shimmer keyframe animation keeps running on the skeleton layer indefinitely, but once .stc-loaded sets that layer's opacity to 0, it's simply invisible. There's no performance concern with leaving it running, though you could pause it via animation-play-state if you wanted to be strict about not animating hidden elements.` },
      { q: `How do I connect this to a real API instead of a fake delay?`, a: `Replace the setTimeout body in load() with a fetch() call. Once the response resolves, populate the .stc-content layer's actual DOM elements with the real data (name, image, text) first, then add the .stc-loaded class — so the crossfade reveals real data, not stale placeholder content.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the layered-state technique by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why stacking the skeleton and content layers with position: absolute avoids layout shift compared to swapping DOM nodes, and why pointer-events needs to be toggled alongside opacity on each layer. The same assistant can help optimize it too — ask whether the shimmer animation should pause via animation-play-state once a layer is hidden to save a small amount of CPU on long-lived pages. It's also useful for extending the pattern: ask it to add a minimum skeleton display duration so fast responses don't cause a jarring flash, wire in a real fetch() call with error-state handling, or generalize the stacked-layer technique into a reusable component for multiple card types. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "skeleton to content crossfade" loading pattern in plain HTML, CSS, and JavaScript with no animation library.

Requirements:
- A container holding two child layers — a skeleton placeholder layer and a real content layer — both positioned absolutely to occupy the exact same space so the container's size never jumps between states.
- The skeleton layer shows shimmering placeholder shapes (an avatar circle, several text lines of varying width, and a larger block) using a CSS keyframe animation that sweeps a gradient across each shape continuously.
- A single CSS class added to the shared parent container controls both layers' opacity via CSS selectors scoped to that class, so one JavaScript class toggle crossfades the skeleton out and the content in simultaneously, with a smooth opacity transition rather than an instant swap.
- Both layers must toggle pointer-events alongside opacity so the currently invisible layer can never intercept clicks meant for the visible one.
- A "Reload" button that removes the loaded class (returning to the skeleton state), simulates a network delay with a timer, and re-adds the loaded class afterward — disabling itself while the simulated request is in flight to prevent overlapping reloads.
- Mark the container with aria-busy="true" while loading and "false" once content is shown, so assistive technology can announce the loading state correctly.`,
    },
  },
};

export default skeletonToContentCrossfade;
