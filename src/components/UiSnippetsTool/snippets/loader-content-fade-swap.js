const loaderContentFadeSwap = {
  id: 'loader-content-fade-swap',
  title: 'Skeleton-to-Content Crossfade',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="cf-card">
  <div class="cf-layer cf-skeleton" id="cfSkeleton">
    <div class="cf-sk cf-sk-avatar"></div>
    <div class="cf-sk cf-sk-line w60"></div>
    <div class="cf-sk cf-sk-line w40"></div>
    <div class="cf-sk cf-sk-block"></div>
  </div>
  <div class="cf-layer cf-content" id="cfContent">
    <img class="cf-avatar" alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Ccircle cx='22' cy='22' r='22' fill='%236366f1'/%3E%3C/svg%3E">
    <h3 class="cf-name">Priya Raman</h3>
    <p class="cf-role">Senior Product Designer</p>
    <div class="cf-media"></div>
  </div>
</div>
<button type="button" class="cf-btn" id="cfBtn">↻ Reload content</button>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px}

.cf-card{position:relative;width:100%;max-width:320px;height:230px;background:#121729;border:1px solid #232a41;border-radius:16px;box-shadow:0 18px 44px rgba(0,0,0,.4);overflow:hidden}
.cf-layer{position:absolute;inset:0;padding:20px;display:flex;flex-direction:column;gap:10px;
  /* Both layers use the same 400ms transition, and both are toggled in the
     same tick — so as the skeleton fades to 0 the content is simultaneously
     fading to 1. Neither ever fully disappears before the other appears,
     which is the actual crossfade (as opposed to a sequential swap). */
  transition:opacity .4s ease;
}
.cf-skeleton{opacity:1}
.cf-content{opacity:0;pointer-events:none}
.cf-card.is-loaded .cf-skeleton{opacity:0;pointer-events:none}
.cf-card.is-loaded .cf-content{opacity:1;pointer-events:auto}

.cf-sk{background:linear-gradient(90deg,#1c2338 25%,#252d49 50%,#1c2338 75%);background-size:200% 100%;animation:cfShimmer 1.4s infinite;border-radius:8px}
@keyframes cfShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
.cf-sk-avatar{width:44px;height:44px;border-radius:50%}
.cf-sk-line{height:11px}
.w40{width:40%}.w60{width:60%}
.cf-sk-block{flex:1;border-radius:10px}

.cf-avatar{width:44px;height:44px;border-radius:50%}
.cf-name{font-size:15px;font-weight:800;color:#fff}
.cf-role{font-size:12.5px;color:#8a93ad;margin-top:-6px}
.cf-media{flex:1;border-radius:10px;background:linear-gradient(160deg,#3730a3,#0891b2);margin-top:4px}

.cf-btn{padding:9px 16px;background:#1c2338;border:1px solid #2b3350;color:#c3cadf;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.cf-btn:hover{background:#242c47}`,

  js: `var card = document.querySelector('.cf-card');
var btn = document.getElementById('cfBtn');

function loadIn() {
  card.classList.remove('is-loaded');
  // Restart from the skeleton state, then flip to loaded on the next tick so
  // the browser has committed the "unloaded" opacity before the transition
  // to "loaded" begins — otherwise the crossfade could be skipped entirely.
  requestAnimationFrame(function () {
    setTimeout(function () {
      card.classList.add('is-loaded');
    }, 900); // simulated fetch delay before the real content is ready
  });
}

btn.addEventListener('click', loadIn);
loadIn();`,

  seo: {
    title: 'Skeleton-to-Content Crossfade — Overlapping Fade Loading Transition',
    description: `A card that crossfades a skeleton placeholder into its real content — both layers fade simultaneously with a deliberate overlap, instead of an abrupt swap. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Skeleton-to-Content Crossfade — Both Layers Fade at Once, With Overlap',
      description: `Most skeleton-to-content transitions are actually a hard swap: the placeholder disappears, then the real content appears, often with a visible flash or layout pop between the two states. A true crossfade is different — the outgoing skeleton and the incoming content fade simultaneously, briefly overlapping, so there is never a moment where neither is visible or where the swap reads as instantaneous. This snippet builds exactly that timing in plain HTML, CSS, and a small amount of JavaScript, and the crossfade's overlap is the entire point of the pattern — not a byproduct of two elements happening to occupy the same space.

**Two full layers, stacked, both always present**

Rather than removing the skeleton from the DOM when content is ready, both \`.cf-skeleton\` and \`.cf-content\` are absolutely positioned to fill the same card (\`position: absolute; inset: 0\`), stacked directly on top of each other. This is what makes a true overlap possible: since both layers occupy identical space at all times, transitioning one's opacity down while the other's opacity rises simultaneously produces a genuine cross-dissolve, the way a film crossfade works, rather than a layout-driven swap where one element's removal shifts the other into view.

**One class flip drives both transitions**

A single \`is-loaded\` class on the parent \`.cf-card\` controls both layers via CSS: \`.cf-skeleton\` opacity goes to 0 and \`.cf-content\` opacity goes to 1 in the same rule change, both using an identical \`transition: opacity .4s ease\`. Because one class toggle drives both transitions with matching durations and easing, the fade-out and fade-in are mathematically synchronized — at the 200ms mark, the skeleton is at 50% opacity and the content is simultaneously at 50% opacity, which is the actual definition of a crossfade rather than two independently-timed animations that happen to look similar.

**Why the timing needs a frame, not just a class toggle**

\`loadIn()\` first removes \`is-loaded\` to reset to the skeleton state, then waits for a \`requestAnimationFrame\` before scheduling the switch to loaded. Toggling classes in the same synchronous tick can let the browser coalesce the "before" and "after" states into a single paint, skipping the transition entirely — waiting a frame guarantees the reset state is actually committed and painted before the transition to loaded begins, so the crossfade reliably plays every time, not just occasionally.

**Pointer-events follow opacity, not the other way around**

Both layers toggle \`pointer-events\` alongside opacity — the invisible layer becomes unclickable and the visible one becomes interactive — so during the brief overlap window neither a lingering skeleton nor an about-to-appear content card can intercept clicks meant for the other.

**Distinct from a plain skeleton or a hard swap**

A standard [skeleton loader](/ui-snippets/skeleton-loader/) never demonstrates the transition to real content at all — it only shows the placeholder state. And a naive swap (\`display: none\` on one, \`display: block\` on the other) has zero overlap by construction, since \`display\` can't be transitioned. This snippet is specifically about the overlap: tune the shared \`.4s\` duration, or offset the two layers' transition-delay slightly so the fade-in trails the fade-out by a beat for an even softer dissolve. Pair it with a [skeleton card grid](/ui-snippets/skeleton-card-grid/) for a whole grid of independently-timed crossfading cards.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A skeleton card renders and crossfades into real profile content after a short delay.` },
      { title: 'Watch the overlap', text: `The shimmer fades out while the real content fades in at the same time, briefly overlapping.` },
      { title: 'Click "Reload content"', text: `The card resets to the skeleton state and crossfades in again.` },
      { title: 'Tune the overlap', text: `Adjust the shared .4s transition duration on both layers to make the dissolve longer or shorter.` },
      { title: 'Offset the timing', text: `Add a small transition-delay to the content layer for a fade-out-then-fade-in feel.` },
      { title: 'Wire real data', text: `Replace the 900ms setTimeout with your real fetch's .then(), calling the same is-loaded toggle.` },
    ] },
    features: [
      { title: 'Two stacked full layers', text: `Skeleton and content occupy identical space, enabling a genuine overlap.` },
      { title: 'One class, two synced transitions', text: `A single is-loaded toggle drives both opacity transitions in lockstep.` },
      { title: 'Matched duration and easing', text: `Both layers share transition: opacity .4s ease so the crossfade math lines up.` },
      { title: 'Frame-delayed trigger', text: `A requestAnimationFrame ensures the reset state paints before the fade starts.` },
      { title: 'Pointer-events follow opacity', text: `Only the currently visible layer is ever clickable.` },
      { title: 'Genuine overlap, not a swap', text: `Both layers are simultaneously partially visible mid-transition.` },
      { title: 'Replayable on demand', text: `A reload button resets and re-triggers the entire crossfade sequence.` },
      { title: 'Real-fetch ready', text: `Swap the simulated timeout for a real request's resolution handler.` },
    ],
    useCases: [
      { title: 'Profile and account cards', text: `Crossfade a [skeleton profile](/ui-snippets/skeleton-profile/) into real user data.` },
      { title: 'Dashboard widgets', text: `Soften the reveal of a [skeleton dashboard](/ui-snippets/skeleton-dashboard/) card.` },
      { title: 'Product and article cards', text: `A polished reveal for content cards in a grid or feed.` },
      { title: 'Detail panels and drawers', text: `Crossfade a side panel from placeholder to loaded detail view.` },
      { title: 'Search result cards', text: `Soften the transition as each result's real data resolves.` },
      { title: 'Any single-item async view', text: `Wherever a hard skeleton-to-content swap currently feels abrupt.` },
      { icon: 'CODE', title: 'Related: Infinite Scroll Loading Spinner', desc: 'See the [Infinite Scroll Loading Spinner](/ui-snippets/loader-infinite-scroll-spinner/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from just hiding the skeleton and showing the content?', a: `A plain hide/show swap using display: none has zero overlap by construction, since display cannot be transitioned — one element vanishes and the other appears in the same instant. This snippet stacks both layers in the same space and animates their opacity in opposite directions simultaneously, so for the full .4s duration both are partially visible together, which is what a crossfade actually means.` },
      { q: 'Why do both layers need to be absolutely positioned on top of each other?', a: `A crossfade requires both the outgoing and incoming elements to occupy the exact same visual space during the transition. If the skeleton and content were laid out normally (one after another, or one only appearing after the other is removed), fading their opacity wouldn't overlap visually — the content would fade in below or after the skeleton rather than through it.` },
      { q: 'Why does loadIn() wait for a requestAnimationFrame before scheduling the class change?', a: `If the class were reset and re-added in the same synchronous block of code, the browser can coalesce both changes into a single paint and the CSS transition never visibly runs — the card would just jump straight to the loaded state. Waiting a frame ensures the browser actually commits and paints the reset (skeleton-visible) state first, so the subsequent transition to loaded is guaranteed to animate.` },
      { q: 'How do I wire this to a real API call instead of a fake timeout?', a: `Remove the setTimeout in loadIn() and instead call the same card.classList.add('is-loaded') inside your real fetch's .then() (or an async function's completion), once your actual data has arrived and been rendered into the .cf-content layer. Keep the requestAnimationFrame-then-reset pattern if you also want to support reloading the same card multiple times.` },
      { q: 'How do I use this crossfade in React, Vue, or Angular?', a: `Render both layers unconditionally (never conditionally unmount either), and toggle a single boolean loaded state that adds or removes an is-loaded class (or toggles inline opacity styles) on the parent — exactly like the vanilla version. In React, wrap the class reset in a small effect using requestAnimationFrame if you need to support replaying the transition after the initial load.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why both the skeleton and content layers need to be absolutely positioned on top of each other for a genuine crossfade to be possible, and why a single is-loaded class toggle driving both layers' opacity with matching transition durations is what keeps the fade-out and fade-in mathematically synchronized rather than merely visually similar. It's worth asking about the requestAnimationFrame step too: what specifically would break — the transition getting skipped entirely — if loadIn() reset and re-applied the is-loaded class in the same synchronous tick instead of waiting a frame. For extending it, ask for a version where the content layer's transition has a slight delay so the fade-in visibly trails the fade-out for a softer dissolve, a variant that also crossfades a subtle scale change alongside opacity, or a grid of several of these cards that crossfade in with a staggered delay per card. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "skeleton-to-content crossfade" card in plain HTML, CSS, and JavaScript where a skeleton placeholder and the real content genuinely overlap during the transition, not a simple hide-then-show swap.

Requirements:
- Two full-size layers (a skeleton placeholder layer and a real-content layer) both absolutely positioned to fill the exact same card area, so they occupy identical space at all times rather than being laid out sequentially.
- Both layers must use the same CSS opacity transition duration and easing function, and a single shared parent class toggle must simultaneously drive the skeleton's opacity down to 0 and the content's opacity up to 1 in the same rule change — not two independently-timed animations.
- Both layers must also toggle pointer-events alongside their opacity, so that only the currently more-visible layer can receive clicks, and the fading-out layer stops intercepting interaction as soon as its opacity trends toward 0.
- The JavaScript that triggers the load must first reset the parent to its unloaded (skeleton-visible) state, then wait for at least one animation frame before scheduling the switch to the loaded state, so the browser reliably commits and paints the reset state before the transition begins — the fade must never be skippable due to both class changes happening in the same synchronous tick.
- The skeleton layer must use a standard animated shimmer gradient so it clearly reads as a loading placeholder before the crossfade begins, and the real content layer must contain genuinely different markup (an image, heading, and text) rather than reusing the skeleton's shapes.
- Include a button that resets and re-triggers the entire crossfade sequence on demand, so the effect can be replayed repeatedly for a demo without reloading the page.`,
    },
  },
};

export default loaderContentFadeSwap;
