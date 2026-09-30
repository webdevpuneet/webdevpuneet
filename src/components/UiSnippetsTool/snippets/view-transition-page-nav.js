const viewTransitionPageNav = {
  id: 'view-transition-page-nav',
  title: 'View Transitions API Page Navigation',
  lastmod: '2026-08-22',
  category: 'navigation',
  cdnUrls: [],
  html: `<section class="vtn-app" id="vtnApp">
  <div class="vtn-list-view" id="vtnListView">
    <div class="vtn-header">
      <h1>Inbox</h1>
      <span class="vtn-count">3 messages</span>
    </div>
    <button class="vtn-row" data-id="1" data-name="Priya Shah" data-subj="Q3 roadmap review" data-body="Quick heads up before Thursday's sync — I've moved the roadmap doc into the shared folder and flagged two open questions on pricing tiers." data-color="#f97316">
      <span class="vtn-avatar" style="background:#f97316">PS</span>
      <span class="vtn-row-text"><strong>Priya Shah</strong><span>Q3 roadmap review</span></span>
      <span class="vtn-time">9:14 AM</span>
    </button>
    <button class="vtn-row" data-id="2" data-name="Dev Ops Bot" data-subj="Deploy succeeded: main" data-body="Build #482 deployed to production in 46s. No failed health checks. View the full deploy log in the pipeline dashboard." data-color="#22c55e">
      <span class="vtn-avatar" style="background:#22c55e">DB</span>
      <span class="vtn-row-text"><strong>Dev Ops Bot</strong><span>Deploy succeeded: main</span></span>
      <span class="vtn-time">8:52 AM</span>
    </button>
    <button class="vtn-row" data-id="3" data-name="Marcus Lee" data-subj="Re: Contract renewal" data-body="Thanks for the quick turnaround. I've signed and attached the updated terms — let's plan to kick off onboarding the week after next." data-color="#6366f1">
      <span class="vtn-avatar" style="background:#6366f1">ML</span>
      <span class="vtn-row-text"><strong>Marcus Lee</strong><span>Re: Contract renewal</span></span>
      <span class="vtn-time">Yesterday</span>
    </button>
  </div>

  <div class="vtn-detail-view" id="vtnDetailView" hidden>
    <button class="vtn-back" id="vtnBack">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Back to inbox
    </button>
    <div class="vtn-detail-head">
      <span class="vtn-avatar large" id="vtnDetailAvatar"></span>
      <div>
        <strong id="vtnDetailName"></strong>
        <span id="vtnDetailSubj"></span>
      </div>
    </div>
    <p id="vtnDetailBody"></p>
  </div>

  <p class="vtn-support-note" id="vtnSupportNote" hidden>Your browser doesn't support the View Transitions API — the list and detail swap instantly instead of cross-fading.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;color:#fff;min-height:100vh;display:flex;justify-content:center;padding:30px 20px;align-items:center}
.vtn-app{width:100%;max-width:420px}
.vtn-header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:16px}
.vtn-header h1{font-size:22px;font-weight:800;letter-spacing:-.02em}
.vtn-count{font-size:12px;color:#8b93ab;font-weight:600}
.vtn-list-view{display:flex;flex-direction:column;gap:8px}
.vtn-row{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:13px 14px;border-radius:13px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);cursor:pointer;font:inherit;color:inherit;transition:background .15s}
.vtn-row:hover{background:rgba(255,255,255,.07)}
.vtn-avatar{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0;view-transition-name:none}
.vtn-avatar.large{width:52px;height:52px;font-size:16px}
.vtn-row-text{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}
.vtn-row-text strong{font-size:13.5px;font-weight:700}
.vtn-row-text span{font-size:12.5px;color:#9aa3bd;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vtn-time{font-size:11px;color:#6b7390;flex-shrink:0}
.vtn-detail-view{padding:4px 2px}
.vtn-back{display:flex;align-items:center;gap:6px;background:none;border:none;color:#93a5f5;font:700 12.5px system-ui;cursor:pointer;margin-bottom:18px;padding:0}
.vtn-detail-head{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.vtn-detail-head strong{display:block;font-size:16px;font-weight:800}
.vtn-detail-head span{display:block;font-size:13px;color:#9aa3bd;margin-top:2px}
#vtnDetailBody{font-size:14px;line-height:1.7;color:#c3cadd}
.vtn-support-note{font-size:11.5px;color:#f0abfc;background:rgba(240,171,252,.08);border:1px solid rgba(240,171,252,.25);padding:10px 12px;border-radius:10px;margin-top:16px}

/* Named view-transition group so the clicked row's avatar and detail avatar
   are treated as the same morphing element by the browser. */
.vtn-avatar.vt-active{view-transition-name:vtn-avatar-active}`,

  js: `var app = document.getElementById('vtnApp');
var listView = document.getElementById('vtnListView');
var detailView = document.getElementById('vtnDetailView');
var backBtn = document.getElementById('vtnBack');
var supportNote = document.getElementById('vtnSupportNote');

var detailAvatar = document.getElementById('vtnDetailAvatar');
var detailName = document.getElementById('vtnDetailName');
var detailSubj = document.getElementById('vtnDetailSubj');
var detailBody = document.getElementById('vtnDetailBody');

var supported = typeof document.startViewTransition === 'function';

function showDetail(row) {
  var avatarHtml = row.querySelector('.vtn-avatar').textContent;
  var color = row.dataset.color;

  function swap() {
    listView.hidden = true;
    detailView.hidden = false;
    detailAvatar.textContent = avatarHtml;
    detailAvatar.style.background = color;
    detailName.textContent = row.dataset.name;
    detailSubj.textContent = row.dataset.subj;
    detailBody.textContent = row.dataset.body;
    detailAvatar.classList.add('vt-active');
  }

  // Real View Transitions API path: startViewTransition takes a callback
  // that performs the DOM mutation. The browser snapshots the before/after
  // states and cross-fades + morphs between them automatically -- no
  // FLIP math, no animation library.
  if (supported) {
    document.startViewTransition(swap);
  } else {
    // Honest fallback: browsers without support (notably older Safari and
    // Firefox releases) simply get an instant swap, no cross-fade. The
    // page still works identically, just without the transition polish.
    swap();
  }
}

function showList() {
  function swap() {
    detailView.hidden = true;
    listView.hidden = false;
    detailAvatar.classList.remove('vt-active');
  }
  if (supported) {
    document.startViewTransition(swap);
  } else {
    swap();
  }
}

listView.addEventListener('click', function (e) {
  var row = e.target.closest('.vtn-row');
  if (row) showDetail(row);
});

backBtn.addEventListener('click', showList);

if (!supported) {
  supportNote.hidden = false;
}`,

  seo: {
    title: 'View Transitions API Page Navigation — Free document.startViewTransition Demo',
    description: `A list-to-detail in-page navigation using the real document.startViewTransition() API for a native cross-fade/morph between views, with an honest instant-swap fallback for unsupported browsers. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'View Transitions API Page Navigation — Native Cross-Fades With No Animation Library',
      description: `This is a genuine SPA-style navigation: clicking a row in a list swaps to a detail view for that item, and back again — the kind of state swap you'd otherwise reach for a router or a manual FLIP animation to make feel smooth. Instead it uses the real \`document.startViewTransition()\` browser API to let the browser itself handle the cross-fade.

**The real API: startViewTransition's callback**

\`document.startViewTransition(callback)\` takes a synchronous callback that performs a DOM mutation — here, hiding the list view and showing the detail view (or the reverse). Before running the callback, the browser captures a snapshot of the current DOM state; after the callback runs, it captures the new state; then it automatically cross-fades between old and new pixels using the View Transitions pseudo-element tree, entirely via compositor-driven CSS animations the browser generates for you.

**Named elements morph, not just fade**

The clicked row's avatar circle gets \`view-transition-name: vtn-avatar-active\` applied (via the \`.vt-active\` class) right inside the same callback that swaps views. Because both the list avatar and the detail-view avatar share that transition name across the before/after snapshots, the browser treats them as *one* continuous element and morphs its size and position between the two layouts, rather than cross-fading two unrelated circles in place. Removing the class on the way back to the list releases the name so a second click can reuse it. This is a genuinely different interaction than a scroll-driven gallery reveal — this is a discrete state swap between two named "pages" inside one document, not motion tied to scroll position.

**Honest fallback: instant swap, no error**

\`document.startViewTransition\` doesn't exist in every browser (older Firefox and Safari releases lack it). The code checks \`typeof document.startViewTransition === 'function'\` up front and, when absent, calls the exact same \`swap()\` function directly instead of wrapping it — so the list-to-detail navigation still works perfectly, just without the cross-fade. A visible note explains the fallback is active rather than leaving the user to wonder why nothing animated. Pair this with an [accordion FAQ](/ui-snippets/accordion-faq/) for a broader "native browser transitions" showcase page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A three-item inbox list renders.` },
      { title: 'Click any row', text: `The view cross-fades to a detail screen for that message.` },
      { title: 'Watch the avatar morph', text: `The same named element grows into the detail header.` },
      { title: 'Click "Back to inbox"', text: `The transition reverses smoothly back to the list.` },
      { title: 'Unsupported browser?', text: `A note explains the swap is instant instead, with no error.` },
      { title: 'Swap in your own data', text: `Replace the row dataset attributes with real content.` },
    ] },
    features: [
      { title: 'Real startViewTransition()', text: `Native browser-driven cross-fade, no animation library.` },
      { title: 'Morphing named element', text: `view-transition-name links the avatar across both views.` },
      { title: 'Discrete SPA-style swap', text: `A list/detail state change, not a scroll-tied effect.` },
      { title: 'Feature-detected fallback', text: `Instant swap when startViewTransition is unsupported.` },
      { title: 'Single swap function', text: `Same DOM-mutation logic runs with or without the API.` },
      { title: 'Reversible transition', text: `Back navigation cross-fades in the opposite direction.` },
      { title: 'Zero dependencies', text: `No router, no animation library, just the native API.` },
      { title: 'Reusable transition name', text: `Class toggling releases the name for repeat use.` },
    ],
    useCases: [
      { title: 'Inbox/message apps', text: `List-to-detail navigation with a native cross-fade.` },
      { title: 'Settings panels', text: `Swap between a menu and a detail settings screen.` },
      { title: 'Product catalogs', text: `Morph a thumbnail into a product detail hero.` },
      { title: 'Mobile-style SPA nav', text: `App-like transitions without a router library.` },
      { title: 'Wizard/step flows', text: `Cross-fade between steps as named views.` },
      { title: 'Design system demos', text: `Showcase native transitions beside an [accordion FAQ](/ui-snippets/accordion-faq/).` },
    ],
    faqs: [
      { q: 'How is this different from a scroll-based view transition?', a: `This snippet performs a discrete state swap triggered by a click -- one named "view" (the list) is replaced by another (the detail screen) inside the same document, with no dependency on scroll position at all. A scroll-driven view transition effect instead ties its animation progress to how far the user has scrolled. Both can use the View Transitions API, but the trigger and interaction model are entirely different.` },
      { q: 'What does document.startViewTransition() actually do?', a: `It accepts a callback that performs a DOM mutation. Before invoking the callback, the browser captures a screenshot-like snapshot of the current DOM; after the callback finishes, it captures the new state; then it automatically generates and plays a cross-fade (and, for elements sharing a view-transition-name, a morph) between the two snapshots using compositor-driven pseudo-elements it creates internally -- no manual FLIP measurement or animation library required.` },
      { q: 'How does the avatar morph instead of just fading?', a: `The clicked row's avatar circle gets the CSS property view-transition-name: vtn-avatar-active applied via a class, inside the same callback that swaps the views. Because the avatar element in the detail view shares that same transition name in the "after" snapshot, the browser recognizes them as one continuous element across the transition and interpolates its size and position, producing a morph rather than a plain cross-fade of two separate circles.` },
      { q: 'What happens in browsers without View Transitions support?', a: `The code checks typeof document.startViewTransition === 'function' before calling it. If it's missing (older Firefox and Safari releases, for example), the exact same swap() function that performs the DOM mutation is called directly instead of being wrapped in startViewTransition -- so the list-to-detail navigation still works correctly, just as an instant swap with no cross-fade, and a note in the UI explains why.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Wrap your state-updating function (e.g. the setState call that swaps which view renders) in a check for document.startViewTransition: if present, call it as document.startViewTransition(() => { /* trigger the state update, then flush synchronously */ }), noting that framework state updates are often asynchronous, so you may need flushSync (React) or a synchronous DOM update inside the callback for the snapshot timing to work correctly. If unsupported, just call the state update directly.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what document.startViewTransition() captures before and after its callback runs, and why giving two elements across those snapshots the same view-transition-name value causes the browser to morph one into the other instead of cross-fading two separate elements in place. It's also worth asking why this snippet's fallback calls the same swap() function directly rather than duplicating the DOM-mutation logic for the unsupported path, and what would happen if a framework's state update inside the callback resolved asynchronously instead of synchronously. For extensions, ask it to add a third "settings" view with its own transition, use CSS ::view-transition-old and ::view-transition-new pseudo-elements to customize the easing and duration beyond the browser default, or wire this pattern into a real client-side router. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "view transitions page navigation" demo in plain HTML, CSS, and JavaScript using the real browser document.startViewTransition() API — no libraries or router.

Requirements:
- Two in-page "views" inside one container: a list view (e.g. an inbox with a few clickable rows, each showing an avatar, name, and subject) and a detail view (hidden by default) showing the full content of whichever row was clicked, plus a "Back" button.
- A single swap() function per direction that performs the actual DOM mutation (hiding one view, showing the other, and populating the detail view's fields from the clicked row's data). Clicking a row should call this function; clicking Back should call the reverse.
- CRITICAL: feature-detect support with typeof document.startViewTransition === 'function'. When supported, call document.startViewTransition(swapFunction) so the browser automatically snapshots the before/after DOM states and cross-fades between them. When NOT supported (this must be handled explicitly, not left to throw), call the exact same swapFunction directly with no wrapping, so the view still switches correctly — just instantly, without a cross-fade — and show a small visible note in the UI explaining that the browser lacks View Transitions support.
- Give the clicked row's avatar element a shared CSS view-transition-name (applied via a class added inside the same swap callback) that matches the corresponding avatar element in the detail view, so supporting browsers morph the avatar's size and position between the two layouts instead of just cross-fading two independent circles. Remove the class when navigating back so the transition name is free to be reused by a different row's avatar on the next click.
- Make sure the interaction is a discrete list/detail state swap triggered by clicks — not tied to scroll position or an automatic gallery cycle — since that's the use case this snippet is meant to demonstrate.`,
    },
  },
};

export default viewTransitionPageNav;
