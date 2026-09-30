const appStoreRatingPrompt = {
  id: 'app-store-rating-prompt',
  title: 'App Store Rating Prompt Modal',
  lastmod: '2026-08-24',
  category: 'modals',
  cdnUrls: [],
  html: `<button class="asrp-trigger" id="asrpTrigger">Open rating prompt</button>

<div class="asrp-overlay" id="asrpOverlay" hidden>
  <div class="asrp-modal" role="dialog" aria-modal="true" aria-labelledby="asrpTitle">
    <div class="asrp-step" id="asrpStepRate">
      <div class="asrp-app-icon" aria-hidden="true">FT</div>
      <h3 id="asrpTitle">Enjoying FwdTools?</h3>
      <p class="asrp-sub">Your feedback helps other developers find this app.</p>
      <div class="asrp-stars" id="asrpStars">
        <span data-v="1">★</span><span data-v="2">★</span><span data-v="3">★</span><span data-v="4">★</span><span data-v="5">★</span>
      </div>
      <button class="asrp-btn asrp-ghost" id="asrpNotNow">Not now</button>
    </div>

    <div class="asrp-step" id="asrpStepStore" hidden>
      <div class="asrp-emoji">🎉</div>
      <h3>Thanks for the love!</h3>
      <p class="asrp-sub">Mind leaving a quick rating on the App Store? It takes 10 seconds.</p>
      <button class="asrp-btn asrp-primary" id="asrpGoToStore">Rate on the App Store</button>
      <button class="asrp-btn asrp-ghost" id="asrpMaybeLater">Maybe later</button>
    </div>

    <div class="asrp-step" id="asrpStepFeedback" hidden>
      <div class="asrp-emoji">💬</div>
      <h3>Help us improve</h3>
      <p class="asrp-sub">Sorry to hear that. What could be better?</p>
      <textarea id="asrpFeedback" placeholder="Tell us what went wrong..."></textarea>
      <button class="asrp-btn asrp-primary" id="asrpSendFeedback">Send feedback</button>
      <button class="asrp-btn asrp-ghost" id="asrpSkipFeedback">Skip</button>
    </div>

    <div class="asrp-step" id="asrpStepDone" hidden>
      <div class="asrp-emoji">✅</div>
      <h3 id="asrpDoneTitle">All set</h3>
      <p class="asrp-sub" id="asrpDoneSub">Thanks for helping us improve.</p>
      <button class="asrp-btn asrp-primary" id="asrpClose">Close</button>
    </div>
  </div>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.asrp-trigger{padding:12px 20px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer}
.asrp-trigger:hover{background:#4f46e5}
.asrp-overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:20px;z-index:50;animation:asrpFade .15s ease}
.asrp-overlay[hidden]{display:none}
@keyframes asrpFade{from{opacity:0}to{opacity:1}}
.asrp-modal{background:#fff;border-radius:18px;padding:30px 26px;width:100%;max-width:340px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.25);animation:asrpPop .2s cubic-bezier(.34,1.56,.64,1)}
@keyframes asrpPop{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}
.asrp-step[hidden]{display:none}
.asrp-app-icon{width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-weight:800;font-size:18px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.asrp-emoji{font-size:38px;margin-bottom:10px}
.asrp-modal h3{font-size:17px;font-weight:800;color:#0f172a;margin-bottom:6px}
.asrp-sub{font-size:12.5px;color:#64748b;line-height:1.5;margin-bottom:18px}
.asrp-stars{display:flex;gap:6px;justify-content:center;margin-bottom:20px;font-size:32px}
.asrp-stars span{color:#e2e8f0;cursor:pointer;transition:color .1s,transform .1s}
.asrp-stars span:hover{transform:scale(1.1)}
.asrp-stars span.on{color:#f59e0b}
.asrp-btn{width:100%;padding:12px;border-radius:10px;font-size:13.5px;font-weight:700;cursor:pointer;border:none;font-family:inherit;margin-bottom:8px}
.asrp-primary{background:#6366f1;color:#fff}
.asrp-primary:hover{background:#4f46e5}
.asrp-ghost{background:none;color:#94a3b8}
.asrp-ghost:hover{color:#64748b}
textarea{width:100%;min-height:80px;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:9px;font-family:inherit;font-size:13px;resize:vertical;margin-bottom:14px;outline:none}
textarea:focus{border-color:#6366f1}`,
  js: `(function(){
  var trigger = document.getElementById('asrpTrigger');
  var overlay = document.getElementById('asrpOverlay');
  var stepRate = document.getElementById('asrpStepRate');
  var stepStore = document.getElementById('asrpStepStore');
  var stepFeedback = document.getElementById('asrpStepFeedback');
  var stepDone = document.getElementById('asrpStepDone');
  var stars = Array.prototype.slice.call(document.querySelectorAll('#asrpStars span'));
  var doneTitle = document.getElementById('asrpDoneTitle');
  var doneSub = document.getElementById('asrpDoneSub');

  function showStep(step) {
    [stepRate, stepStore, stepFeedback, stepDone].forEach(function (s) { s.hidden = (s !== step); });
  }

  function open() { overlay.hidden = false; showStep(stepRate); highlightStars(0); }
  function close() { overlay.hidden = true; }

  function highlightStars(value) {
    stars.forEach(function (s) { s.classList.toggle('on', Number(s.getAttribute('data-v')) <= value); });
  }

  trigger.addEventListener('click', open);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  document.getElementById('asrpNotNow').addEventListener('click', close);
  document.getElementById('asrpMaybeLater').addEventListener('click', close);
  document.getElementById('asrpSkipFeedback').addEventListener('click', close);
  document.getElementById('asrpClose').addEventListener('click', close);

  stars.forEach(function (star) {
    star.addEventListener('mouseenter', function () { highlightStars(Number(star.getAttribute('data-v'))); });
    star.addEventListener('click', function () {
      var value = Number(star.getAttribute('data-v'));
      // route: 4-5 stars -> ask for a public store rating; 1-3 stars -> ask for private feedback first
      if (value >= 4) showStep(stepStore);
      else showStep(stepFeedback);
    });
  });
  document.getElementById('asrpStars').addEventListener('mouseleave', function () {
    var onStars = stars.filter(function (s) { return s.classList.contains('on'); });
    highlightStars(onStars.length);
  });

  document.getElementById('asrpGoToStore').addEventListener('click', function () {
    // in production this opens the platform's real store review URL
    doneTitle.textContent = 'Thanks for rating us!';
    doneSub.textContent = 'You are being redirected to the App Store.';
    showStep(stepDone);
  });

  document.getElementById('asrpSendFeedback').addEventListener('click', function () {
    var text = document.getElementById('asrpFeedback').value.trim();
    doneTitle.textContent = 'Feedback received';
    doneSub.textContent = text ? 'Thanks — our team will review this personally.' : 'Thanks for letting us know.';
    showStep(stepDone);
  });
})();`,
  seo: {
    title: 'App Store Rating Prompt Modal — Free HTML CSS JS Snippet',
    description: 'A branching rating prompt that routes 4-5 star ratings to a public App Store review request and 1-3 star ratings to a private feedback form, keeping unhappy users off the store page.',
    about: {
      title: 'App Store Rating Prompt — Star-Gated Branching Flow',
      description: `Native mobile apps rarely ask "please leave a public review" outright — instead they ask an in-app star question first, then route the response: happy users get sent to the App Store or Play Store to leave a public review, while unhappy users are redirected to a private feedback form instead of a public one-star review. This snippet reproduces that exact branching flow with four self-contained modal steps.

**Four steps, one visibility switch**

\`showStep(step)\` loops all four step elements and sets \`hidden\` on every one except the target, so only one step is ever visible at a time. This keeps all the flow's markup and state in a single DOM tree — no step needs to be dynamically created or destroyed, which keeps the routing logic in \`showStep()\` trivially simple.

**The routing decision**

Clicking a star calls \`highlightStars()\` to update the visual state, then branches on the star value: \`if (value >= 4) showStep(stepStore); else showStep(stepFeedback)\`. This single \`if\` statement is the entire mechanism behind the pattern — a high rating leads to the public ask, a low rating leads to the private one, protecting the app's visible store rating from frustrated one-off complaints while still capturing that feedback internally.

**Hover preview mirrors the half-star pattern**

\`stars.forEach(star => star.addEventListener('mouseenter', () => highlightStars(value)))\` previews the rating on hover the same way a checkout star-rating input would, and \`mouseleave\` restores the highlight to the last *committed* star count (tracked by counting how many stars currently carry the \`.on\` class) rather than resetting to zero — so browsing past the stars without clicking doesn't lose the visual state.

**A shared "done" step for two different outcomes**

Both the store-redirect button and the feedback-submit button ultimately call \`showStep(stepDone)\`, but each first sets \`doneTitle.textContent\` and \`doneSub.textContent\` to outcome-specific copy. Reusing one terminal step for both paths avoids duplicating the "all set" UI while still giving each path its own confirmation message.

**Escape hatches at every step**

"Not now," "Maybe later," and "Skip" are all wired to the same \`close()\` function, so a user can exit the flow from any point without being forced through every step — an unhappy user is never trapped between "give feedback" and "leave a review" with no way out.

**Customizing it**

Replace the \`asrpGoToStore\` handler's placeholder with a real \`window.location.href\` to your platform's store review URL (using the App Store's \`itms-apps://\` deep link or the Play Store's review intent), and wire \`asrpSendFeedback\` to your actual support or feedback API.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A trigger button opens the rating prompt modal with a 5-star row.` },
      { title: 'Hover and click a star', text: `Hovering previews the rating; clicking commits it and routes the flow.` },
      { title: 'Rate 4 or 5 stars', text: `The flow shows a "Rate on the App Store" step with a public review call to action.` },
      { title: 'Rate 1-3 stars', text: `The flow instead shows a private feedback textarea, keeping the complaint out of the public store.` },
      { title: 'Complete either path', text: `Both paths end on a shared "done" step with outcome-specific confirmation text.` },
      { title: 'Wire up real destinations', text: `Replace the store button's placeholder with your real App Store or Play Store review deep link, and connect the feedback form to your support API.` },
    ] },
    features: [
      { title: 'Star-gated branching flow', text: `A single if statement on the clicked star value decides between the public and private paths.` },
      { title: 'Four steps, one visibility switch', text: `showStep() hides every step but the target, keeping all flow state in one simple function.` },
      { title: 'Hover preview with committed-state restore', text: `Mouseleave restores the highlight to the last clicked rating, not to zero.` },
      { title: 'Shared terminal "done" step', text: `Both the store and feedback paths reuse one confirmation step with outcome-specific text.` },
      { title: 'Escape hatch on every step', text: `"Not now", "Maybe later", and "Skip" all close the modal without forcing completion.` },
      { title: 'Click-outside-to-close overlay', text: `Clicking the dimmed backdrop closes the modal, matching standard modal conventions.` },
      { title: 'Animated entrance', text: `A spring-like scale-and-fade keyframe animation gives the modal a polished pop-in.` },
      { title: 'Zero dependencies', text: `Pure HTML, CSS, and vanilla JavaScript — no modal or star-rating library.` },
    ],
    useCases: [
      { title: 'Mobile app review requests', text: `Reproduce the native "gate before store review" pattern inside a web or hybrid app shell.` },
      { title: 'SaaS product NPS-style prompts', text: `Route happy users to a public review site (G2, Capterra) and unhappy ones to internal feedback.` },
      { title: 'Browser extension review prompts', text: `Ask extension users for a Chrome Web Store or Firefox Add-ons rating using the same gate.` },
      { title: 'Post-purchase satisfaction surveys', text: `Route satisfied customers to a public review platform and dissatisfied ones to support.` },
      { title: 'In-app support triage', text: `Capture negative feedback privately before it becomes a public complaint.` },
      { title: 'Learning multi-step modal state', text: `A clear example of driving a branching wizard flow from one shared step-visibility function.` },
      { icon: 'CODE', title: 'Related: Action Sheet', desc: 'See the [Action Sheet](/ui-snippets/action-sheet/) for a related modals pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Terms Modal with Scroll-to-Accept', desc: 'See the [Terms Modal with Scroll-to-Accept](/ui-snippets/modal-terms-scroll-to-accept/) for a related modals pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Feedback Modal with Star Rating and Comment', desc: 'See the [Feedback Modal with Star Rating and Comment](/ui-snippets/modal-rating-feedback-star-comment/) for a related modals pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Export Data Modal with Format and Field Picker', desc: 'See the [Export Data Modal with Format and Field Picker](/ui-snippets/modal-export-data-download-picker/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `Isn't gating reviews by star rating manipulative?`, a: `It's a widely used and generally accepted pattern (most major consumer apps use some version of it), but it does shape which sentiment becomes public. Many teams pair it with genuinely acting on the private feedback from low-rating users, rather than using it purely to suppress visible criticism — how you use the routed feedback matters more than the routing mechanism itself.` },
      { q: `How does the flow decide which step to show after a star is clicked?`, a: `The star's click handler reads its data-v attribute as a number and checks if (value >= 4). Four or five stars shows the store-review step; one through three stars shows the private feedback step instead. Everything else in the flow is the same regardless of which branch is taken.` },
      { q: `Why do both branches end on the same "done" step instead of separate ones?`, a: `Both outcomes need the same basic "thanks, you're done" UI shell, so reusing one step avoids duplicating that markup and styling. Before showing it, each button handler sets doneTitle.textContent and doneSub.textContent to outcome-specific copy, so the shared step still shows the right message for whichever path was taken.` },
      { q: `How do I connect the "Rate on the App Store" button to a real store listing?`, a: `Replace the placeholder logic inside the asrpGoToStore click handler with window.location.href set to your app's actual store review URL — for iOS, an itms-apps:// URL with the action=write-review query parameter and your app's numeric ID; for Android, a Play Store URL with the same intent.` },
      { q: `Can I skip the star rating and go straight to feedback?`, a: `Yes — the "Not now" button already closes the modal without any rating being recorded. If you want an explicit "just leave feedback" option regardless of star count, add a link on the first step that calls showStep(stepFeedback) directly, bypassing the star-based routing.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the branching logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the single if (value >= 4) check in the star click handler drives the entire public-versus-private routing decision, and why showStep() hiding every step but one keeps the flow's state management simple compared to mounting and unmounting separate modals. The same assistant can help optimize it too — ask whether the flow should remember a user's previous rating in localStorage to avoid re-prompting too often. It's also useful for extending it: ask it to add a real analytics event on each step transition, support a configurable star threshold instead of a hardcoded 4, or add a "remind me later" delay using a stored timestamp. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "app store rating prompt" modal in plain HTML, CSS, and JavaScript with no framework or library, using a branching multi-step flow.

Requirements:
- A trigger button that opens a centered modal overlay with a dimmed backdrop; clicking the backdrop itself (not the modal content) closes it.
- The modal's first step shows an app icon, a headline, and a row of 5 star icons that preview on hover (restoring to the last clicked rating when the pointer leaves the row, not resetting to zero) and commit on click.
- Clicking a star of value 4 or 5 must transition the modal to a "public review" step showing a button that represents redirecting to the platform's App Store or Play Store review page.
- Clicking a star of value 1, 2, or 3 must instead transition the modal to a private "feedback" step with a textarea for the user to describe what went wrong, and a submit button.
- Both the public-review step and the feedback step must ultimately lead to a single shared "done" confirmation step, with each path setting different heading and subtext content on that shared step before showing it.
- Every intermediate step must include an escape action (like "Not now", "Maybe later", or "Skip") that closes the modal entirely without forcing the user through the remaining steps.
- Manage all step visibility through one function that shows exactly one of the four steps at a time and hides the rest, rather than creating or destroying DOM elements per step.`,
    },
  },
};

export default appStoreRatingPrompt;
