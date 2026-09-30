const loaderSuspenseFallbackCard = {
  id: 'loader-suspense-fallback-card',
  title: 'Suspense-Style Data Fetch Fallback',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<div class="sf-card" id="sfCard">
  <div class="sf-fallback" id="sfFallback">
    <div class="sf-avatar"></div>
    <div class="sf-lines"><div class="sf-line sf-l1"></div><div class="sf-line sf-l2"></div><div class="sf-line sf-l3"></div></div>
  </div>
  <div class="sf-content" id="sfContent" hidden>
    <img class="sf-real-avatar" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%236366f1'/%3E%3Ctext x='24' y='30' font-size='18' text-anchor='middle' fill='white' font-family='sans-serif'%3EJP%3C/text%3E%3C/svg%3E" alt="">
    <div>
      <div class="sf-name">Jordan Park</div>
      <div class="sf-bio">Product designer — resolved after a simulated fetch, exactly like a component read from a Suspense-wrapped data source would.</div>
    </div>
  </div>
</div>
<button type="button" class="sf-retry" id="sfRetry">Refetch</button>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px}

.sf-card{width:100%;max-width:380px;min-height:88px;background:#151f34;border:1px solid #223055;border-radius:14px;padding:18px;display:flex;align-items:center}

.sf-fallback{display:flex;align-items:center;gap:14px;width:100%}
.sf-avatar{width:48px;height:48px;border-radius:50%;flex-shrink:0;background:linear-gradient(90deg,#1c2846 25%,#2a3a63 37%,#1c2846 63%);background-size:400% 100%;animation:sfShimmer 1.5s ease-in-out infinite}
.sf-lines{flex:1;display:flex;flex-direction:column;gap:8px}
.sf-line{height:10px;border-radius:5px;background:linear-gradient(90deg,#1c2846 25%,#2a3a63 37%,#1c2846 63%);background-size:400% 100%;animation:sfShimmer 1.5s ease-in-out infinite}
.sf-l1{width:40%}.sf-l2{width:90%}.sf-l3{width:75%}
@keyframes sfShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

.sf-content{display:flex;align-items:center;gap:14px;width:100%;animation:sfFadeIn .35s ease both}
@keyframes sfFadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.sf-real-avatar{width:48px;height:48px;border-radius:50%;flex-shrink:0}
.sf-name{font-size:14.5px;font-weight:800;margin-bottom:4px}
.sf-bio{font-size:12.5px;color:#94a3b8;line-height:1.5}

.sf-retry{background:#6366f1;color:#fff;border:none;border-radius:10px;padding:9px 18px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.sf-retry:hover{background:#4f46e5}
.sf-retry:disabled{opacity:.5;cursor:not-allowed}`,

  js: `var fallback = document.getElementById('sfFallback');
var content = document.getElementById('sfContent');
var retryBtn = document.getElementById('sfRetry');

// This mirrors what a React <Suspense fallback={<Skeleton />}> boundary does:
// while the "resource" (here, a fake fetch) is unresolved, render the
// fallback; the instant it resolves, swap to the real content. There is no
// framework here — it's the same fallback-then-resolve pattern done by hand
// with plain visibility toggles, so the mechanic is visible and portable.
function fetchProfile() {
  fallback.hidden = false;
  content.hidden = true;
  retryBtn.disabled = true;

  // Stand in for a real request — replace with your actual fetch()/promise.
  return new Promise(function (resolve) {
    setTimeout(resolve, 1600);
  }).then(function () {
    fallback.hidden = true;
    content.hidden = false;
    retryBtn.disabled = false;
  });
}

retryBtn.addEventListener('click', function () { fetchProfile(); });

fetchProfile();`,

  seo: {
    title: 'Suspense-Style Fallback Card — Vanilla JS Loading Boundary Pattern',
    description: `A card that shows a skeleton fallback while "fetching" and resolves into real content — the vanilla-JS equivalent of a React Suspense fallback boundary, no framework required.`,
    about: {
      title: 'Suspense-Style Fallback Card — The Vanilla-JS Version of a Suspense Boundary',
      description: `React's \`<Suspense fallback={<Skeleton />}>\` pattern shows a fallback UI while a component's data is unresolved, then swaps to the real component the instant it resolves — no manual loading-state plumbing inside the component itself. This snippet demonstrates that exact visual pattern without React: a fallback skeleton and the real content both exist in the DOM from the start, and a single \`fetchProfile()\` function toggles which one is visible based on whether the simulated "resource" has resolved — the same boundary-and-swap mechanic, written by hand.

**Two pre-built states, one visibility toggle**

Both the \`.sf-fallback\` skeleton and the \`.sf-content\` real markup exist in the HTML from page load; only their \`hidden\` attribute changes. \`fetchProfile()\` shows the fallback and hides the content, waits on a promise standing in for a real request, and on resolve flips \`hidden\` the other way. This mirrors what Suspense does structurally — the fallback and the resolved tree are two things React can swap between, not a single element mutating its own inner state — which is why this pattern generalizes so cleanly to any framework or no framework at all.

**Why this is useful without React**

If you like the Suspense mental model — declare a fallback, declare the real content, let a resolve event handle the swap — but you're not using React (or you're building a plain HTML component), this is the same idea implemented directly: a promise-returning function that owns exactly one job, showing the right state at the right time. It reads as a clean vanilla-JS pattern for "loading boundary" logic that a framework component or hook could wrap later.

**A real promise, not a fake delay**

\`fetchProfile\` returns an actual \`Promise\`, resolved here by a \`setTimeout\` standing in for \`fetch()\`. Because it's a real promise, callers can \`await\` it, chain \`.then()\`, or race it against a timeout — the same ergonomics as the data-fetching function a Suspense-compatible resource would wrap, just without the resource-cache machinery React needs internally.

**Retry included**

A "Refetch" button re-invokes \`fetchProfile()\`, re-showing the fallback and disabling itself until the new promise resolves — demonstrating that the boundary isn't a one-shot animation, it's a reusable toggle driven by any promise you hand it. Pair the fallback shape with a [skeleton loader](/ui-snippets/skeleton-loader/) for other layouts, or an [ai thinking loader](/ui-snippets/ai-thinking-loader/) for a chat-specific fallback.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A skeleton fallback shows immediately, then resolves into a real profile card.` },
      { title: 'Watch the swap', text: `After ~1.6s the fallback hides and the real content fades in.` },
      { title: 'Click Refetch', text: `The fallback reappears and the cycle repeats, mirroring a re-suspended boundary.` },
      { title: 'Replace the fake promise', text: `Swap the setTimeout in fetchProfile for your real fetch()/API call.` },
      { title: 'Swap the fallback shape', text: `Change .sf-fallback's markup to match whatever content it's standing in for.` },
      { title: 'Reuse the pattern', text: `Copy the two-elements-plus-toggle structure for any other async section.` },
    ] },
    features: [
      { title: 'Real Suspense mental model', text: `Fallback and resolved content are two pre-built states, swapped on resolve.` },
      { title: 'Promise-based function', text: `fetchProfile() returns a real Promise, not a bare timeout.` },
      { title: 'Explicit boundary logic', text: `One function owns exactly when the fallback shows and hides.` },
      { title: 'Framework-agnostic pattern', text: `The same idea a React Suspense component uses, without React.` },
      { title: 'Retry built in', text: `A refetch button re-triggers the fallback-then-resolve cycle.` },
      { title: 'Smooth content entrance', text: `The resolved content fades and lifts in rather than snapping into view.` },
      { title: 'Shimmer fallback', text: `An avatar-plus-lines skeleton in the meantime.` },
      { title: 'Zero dependencies', text: `Pure HTML/CSS/JS — no React, no Suspense runtime.` },
    ],
    useCases: [
      { title: 'Non-React apps wanting the Suspense pattern', text: `The exact case this snippet targets — the visual/logical pattern without the framework.` },
      { title: 'Server-rendered pages with client hydration', text: `Show a fallback before client-side data enhances a card.` },
      { title: 'Widget or card-level async sections', text: `Any self-contained card that fetches its own data independently.` },
      { title: 'Design system reference implementations', text: `A framework-agnostic spec for how a loading boundary should behave.` },
      { title: 'Teaching the Suspense concept', text: `A concrete, dependency-free way to demonstrate the pattern to non-React developers.` },
      { title: 'Migrating away from React', text: `Preserve the same fallback/resolve behavior when porting a Suspense-based UI.` },
      { icon: 'CODE', title: 'Related: Particle Swarm Loader', desc: 'See the [Particle Swarm Loader](/ui-snippets/loader-particle-swarm-orbit/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does this actually resemble React Suspense?', a: `React's <Suspense fallback={<Skeleton/>}> shows the fallback element while a wrapped component's data dependency is unresolved, then swaps to the real component tree once it resolves — without the component itself managing a loading flag. This snippet reproduces that structurally: both the fallback and real content exist as separate elements from the start, and one function toggles which is visible based on a promise's resolution, rather than one element mutating an internal loading state.` },
      { q: 'Do I need React or any framework to use this pattern?', a: `No — that's the point. fetchProfile() is a plain function returning a plain Promise, and the "swap" is just toggling the hidden attribute on two existing DOM elements. It works in any HTML page, any framework, or no framework, which makes it useful if you like the Suspense mental model but aren't using React.` },
      { q: 'How do I connect it to a real API call?', a: `Replace the setTimeout-wrapped Promise inside fetchProfile with your real fetch() or async function, keeping the same shape: show the fallback and hide the content at the start, await/resolve the real request, then hide the fallback and show the content in a .then() or after an await. Add a .catch() to show an error state if you need one — this demo omits it for clarity.` },
      { q: 'Why keep both the fallback and the real content in the DOM from the start?', a: `Pre-building both states and toggling visibility (rather than injecting the real content's markup only after it resolves) keeps the swap instant and avoids a layout jump from building new DOM nodes at resolve time. It also mirrors how Suspense conceptually treats the fallback and the resolved tree as two ready-made branches, not a dynamically constructed one.` },
      { q: 'How would I build an actual reusable version of this in React, Vue, or Angular?', a: `In React, this is literally what <Suspense> plus a Suspense-compatible data source gives you for free. In Vue or Angular (no built-in Suspense-equivalent for arbitrary promises), wrap the same idea in a small component: hold a resolved boolean in state/signal, render the fallback markup when false and the real content when true, and flip it in a promise .then()/await, exactly like fetchProfile() does here.` },
    ],
    aiPrompt: {
      paragraph: `Rather than reasoning through the fallback/resolve toggle on your own, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how it mirrors React's Suspense fallback pattern — specifically, why both the fallback skeleton and the real content exist as separate pre-built elements from page load rather than the real content being constructed only after the fetch resolves, and why fetchProfile returns an actual Promise instead of just running a timeout with side effects. The same assistant can help optimize it — for instance asking whether adding a minimum fallback display time (so a very fast resolve doesn't cause a jarring instant flash) would improve perceived quality, similar to React's concurrent rendering avoiding flashing fallbacks for fast resolutions. It's also useful for extending the pattern: ask it to add an error state third branch (a fallback, an error card, and the real content), wrap the whole toggle logic into a small reusable helper function that takes any promise and two DOM elements, or add a race against a timeout to show a "taking longer than expected" message. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "Suspense-style" data-fetching card in plain HTML, CSS, and JavaScript that reproduces the React Suspense fallback pattern without using React — no framework, no libraries.

Requirements:
- Two complete UI states must exist in the DOM from page load: a skeleton "fallback" (an avatar placeholder plus a few shimmering text-line placeholders) and the real "resolved" content (an actual avatar image, a name, and a bio paragraph) — do not construct the real content's markup dynamically after the fetch resolves; it should already exist, just hidden.
- Write one function that returns a real Promise (not just a bare setTimeout with side effects) representing a data fetch: immediately on call, it must show the fallback and hide the real content, then after the promise resolves (stand in with a setTimeout, but structure it so a real fetch() call could drop in unchanged), hide the fallback and reveal the real content.
- The swap from fallback to real content must use a toggle of visibility/hidden state on the two pre-existing elements, not innerHTML replacement or dynamically created nodes.
- Give the real content a subtle entrance animation (a brief fade and slight upward movement) when it becomes visible, so the swap doesn't feel like an abrupt snap.
- Add a "Refetch" button that re-invokes the fetch function, demonstrating that the fallback-then-resolve cycle is a reusable toggle driven by any promise, not a one-shot page-load animation — disable the button while the fetch is in flight and re-enable it once resolved.
- In comments, explicitly note how this pattern maps to React's <Suspense fallback={...}> boundary concept, for developers coming from a React background who want the same visual/logical pattern in a non-React context.`,
    },
  },
};

export default loaderSuspenseFallbackCard;
