const feedbackTabWidget = {
  id: 'feedback-tab-widget',
  title: 'Feedback Tab Widget',
  lastmod: '2026-06-20',
  category: 'modals',
  html: `<div class="ftw-page">
  <p class="ftw-hint">The docked tab on the right opens a feedback panel.</p>
</div>

<button type="button" class="ftw-tab" id="ftwTab">
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  Feedback
</button>

<div class="ftw-backdrop" id="ftwBackdrop"></div>
<aside class="ftw-panel" id="ftwPanel" role="dialog" aria-label="Send feedback">
  <div class="ftw-panel-head">
    <h3>Send feedback</h3>
    <button type="button" class="ftw-close" id="ftwClose" aria-label="Close">✕</button>
  </div>

  <div class="ftw-body" id="ftwBody">
    <p class="ftw-label">How's your experience so far?</p>
    <div class="ftw-moods" id="ftwMoods">
      <button type="button" class="ftw-mood" data-v="1">😞</button>
      <button type="button" class="ftw-mood" data-v="2">😐</button>
      <button type="button" class="ftw-mood" data-v="3">🙂</button>
      <button type="button" class="ftw-mood" data-v="4">😄</button>
    </div>
    <p class="ftw-label">Tell us more (optional)</p>
    <textarea id="ftwText" placeholder="What's working well or what could be better?" rows="4"></textarea>
    <button type="button" class="ftw-submit" id="ftwSubmit" disabled>Send feedback</button>
  </div>

  <div class="ftw-thanks" id="ftwThanks" hidden>
    <div class="ftw-thanks-icon">✓</div>
    <h4>Thanks for the feedback!</h4>
    <p>We read every response — it genuinely shapes what we build next.</p>
  </div>
</aside>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh}

.ftw-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ftw-hint{color:#94a3b8;font-size:14px;font-weight:600;text-align:center;max-width:280px}

.ftw-tab{position:fixed;top:50%;right:0;transform:translateY(-50%) rotate(-90deg) translateY(-50%);
  transform-origin:right center;background:#6366f1;color:#fff;border:none;border-radius:8px 8px 0 0;
  padding:10px 18px;font-size:13px;font-weight:700;display:flex;align-items:center;gap:7px;cursor:pointer;
  box-shadow:-4px 0 16px rgba(99,102,241,.3);z-index:80}
.ftw-tab:hover{background:#4f46e5}

.ftw-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.25);opacity:0;pointer-events:none;transition:opacity .2s;z-index:88}
.ftw-backdrop.show{opacity:1;pointer-events:all}

.ftw-panel{position:fixed;top:0;right:0;bottom:0;width:min(340px,88vw);background:#fff;box-shadow:-18px 0 50px rgba(15,23,42,.18);
  z-index:89;transform:translateX(100%);transition:transform .28s cubic-bezier(.22,1,.36,1);display:flex;flex-direction:column;padding:20px}
.ftw-panel.show{transform:translateX(0)}

.ftw-panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.ftw-panel-head h3{font-size:16px;font-weight:800;color:#0f172a}
.ftw-close{width:28px;height:28px;border-radius:50%;border:none;background:#f1f5f9;color:#64748b;cursor:pointer;font-size:13px}
.ftw-close:hover{background:#e2e8f0}

.ftw-label{font-size:12.5px;font-weight:700;color:#64748b;margin-bottom:9px}
.ftw-moods{display:flex;gap:8px;margin-bottom:18px}
.ftw-mood{flex:1;border:1.5px solid #e2e8f0;border-radius:10px;background:#fff;font-size:22px;padding:10px 0;cursor:pointer;transition:transform .15s,border-color .15s,background .15s}
.ftw-mood:hover{transform:translateY(-2px)}
.ftw-mood.active{border-color:#6366f1;background:#eef2ff;transform:translateY(-2px) scale(1.05)}

.ftw-body textarea{width:100%;border:1.5px solid #e2e8f0;border-radius:10px;padding:10px 12px;font-size:13.5px;font-family:inherit;color:#0f172a;resize:vertical;margin-bottom:16px;transition:border-color .15s}
.ftw-body textarea:focus{outline:none;border-color:#6366f1}

.ftw-submit{width:100%;background:#6366f1;color:#fff;border:none;border-radius:10px;padding:11px;font-size:14px;font-weight:700;cursor:pointer;transition:background .15s,opacity .15s}
.ftw-submit:hover:not(:disabled){background:#4f46e5}
.ftw-submit:disabled{opacity:.45;cursor:not-allowed}

.ftw-thanks{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:8px;padding:0 8px}
.ftw-thanks-icon{width:48px;height:48px;border-radius:50%;background:#22c55e;color:#fff;font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center;margin-bottom:6px}
.ftw-thanks h4{font-size:15px;font-weight:800;color:#0f172a}
.ftw-thanks p{font-size:12.5px;color:#94a3b8;line-height:1.5}`,

  js: `var panel = document.getElementById('ftwPanel');
var backdrop = document.getElementById('ftwBackdrop');
var moodValue = null;

function openPanel() {
  panel.classList.add('show');
  backdrop.classList.add('show');
}
function closePanel() {
  panel.classList.remove('show');
  backdrop.classList.remove('show');
}

document.getElementById('ftwTab').addEventListener('click', openPanel);
document.getElementById('ftwClose').addEventListener('click', closePanel);
backdrop.addEventListener('click', closePanel);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && panel.classList.contains('show')) closePanel();
});

document.getElementById('ftwMoods').addEventListener('click', function (e) {
  var btn = e.target.closest('.ftw-mood');
  if (!btn) return;
  moodValue = btn.dataset.v;
  this.querySelectorAll('.ftw-mood').forEach(function (m) { m.classList.toggle('active', m === btn); });
  document.getElementById('ftwSubmit').disabled = false;
});

document.getElementById('ftwSubmit').addEventListener('click', function () {
  // moodValue + the textarea content would be sent to your feedback endpoint here.
  document.getElementById('ftwBody').hidden = true;
  document.getElementById('ftwThanks').hidden = false;
  setTimeout(function () {
    closePanel();
    setTimeout(function () {
      document.getElementById('ftwBody').hidden = false;
      document.getElementById('ftwThanks').hidden = true;
      document.getElementById('ftwText').value = '';
      document.getElementById('ftwSubmit').disabled = true;
      moodValue = null;
      document.querySelectorAll('.ftw-mood').forEach(function (m) { m.classList.remove('active'); });
    }, 320);
  }, 1700);
});`,

  seo: {
    title: 'Feedback Tab Widget — Docked Side Panel HTML CSS JS',
    description: `A side-docked "Feedback" tab that slides out a mood-rating and comment panel, with a thank-you confirmation state. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Feedback Tab Widget — Docked Tab, Mood Rating & Slide-Out Panel',
      description: `The little vertical "Feedback" tab clinging to the edge of the screen is one of the most common, lowest-friction feedback-collection patterns on the web — always visible, never blocking content, and a single click away from a real response. This snippet builds the complete widget: a rotated docked tab, a slide-out panel with an emoji mood scale and optional comment, and a thank-you confirmation state.

**A genuinely rotated tab, not a sideways label**

The tab button is rotated -90° with \`transform: rotate(-90deg)\` and a \`transform-origin\` anchored to its right edge, then nudged back into the viewport with a paired \`translateY\`. This two-step transform (rotate, then translate in the *original* axis before rotation takes effect) is the standard trick for a vertical edge tab whose text reads top-to-bottom while the button itself still occupies normal horizontal layout space before rotation — get the order wrong and the tab flies off-screen.

**Mood scale before the comment box**

Four emoji buttons (😞 😐 🙂 😄) let a user register a quick sentiment in one tap, with the submit button staying disabled until a mood is picked — the comment textarea is explicitly optional, since requiring free-text feedback is the single biggest reason these widgets get ignored. Picking a mood lifts and scales the chosen button slightly and tints its border, giving immediate visual confirmation of the selection.

**Slide-out panel, not a centered modal**

The panel itself slides in from the right edge with \`transform: translateX(100%)\` → \`translateX(0)\` on a \`cubic-bezier\` ease, rather than appearing as a centered dialog — this keeps it visually tethered to the docked tab it came from, reinforcing where it will return to on close, and avoids fully obscuring the page the way a centered modal would.

**A real thank-you state, not just a closed panel**

Submitting swaps the form body for a checkmark and thank-you message *inside the still-open panel* for 1.7 seconds before the panel closes and silently resets behind the scenes — so the user gets confirmation their feedback was received, rather than the panel just vanishing the instant they click Send, which would read as if nothing happened.

**Escape key and backdrop dismissal**

Both a backdrop click and the Escape key close the panel via the same \`closePanel()\` function used by the explicit close button, keeping every dismissal path consistent and giving keyboard users a way out without hunting for the small ✕ button.

**Why a docked tab beats a delayed popup**

Many feedback tools instead show an unannounced modal a few seconds after page load, which reads as an interruption and gets reflexively closed. A persistent, low-profile docked tab puts the same control within reach without ever demanding attention — it's there when a user wants it and invisible to their workflow otherwise, which is why this pattern shows up across documentation sites, SaaS dashboards, and support widgets that care about response rate without being intrusive.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A page renders with a rotated "Feedback" tab docked to the right edge of the viewport.` },
      { title: 'Click the tab', text: `A panel slides in from the right with a four-emoji mood scale and an optional comment textarea.` },
      { title: 'Pick a mood', text: `Tap an emoji to register your sentiment — it lifts and highlights, and the Send button becomes enabled.` },
      { title: 'Add a comment (optional) and submit', text: `Type anything you like, then click "Send feedback" to see the thank-you confirmation appear in place.` },
      { title: 'Watch it auto-close and reset', text: `After showing the thank-you message briefly, the panel closes and silently resets for the next visit.` },
      { title: 'Wire up the real submission', text: `Send moodValue and the textarea's value to your feedback or analytics endpoint inside the submit handler, before showing the thank-you state.` },
    ] },
    features: [
      { title: 'Genuinely rotated edge tab', text: `A combined rotate + translate transform creates a real vertical tab whose text reads correctly, docked to the viewport's right edge.` },
      { title: 'Quick emoji mood scale', text: `Four mood options let users respond in one tap, with the picked option visually lifted and highlighted.` },
      { title: 'Optional comment field', text: `The textarea is never required — only a mood pick enables the submit button, lowering the bar to respond.` },
      { title: 'Slide-out panel tethered to its source', text: `The panel animates from the same edge the tab is docked to, instead of appearing as an unrelated centered modal.` },
      { title: 'In-place thank-you confirmation', text: `Submitting shows a checkmark and message inside the still-open panel before it closes, confirming receipt explicitly.` },
      { title: 'Auto-reset after close', text: `The form silently clears itself after the panel closes, so it's ready fresh the next time it's opened.` },
      { title: 'Backdrop, close-button, and Escape dismissal', text: `All three dismissal paths call the same closePanel() function, keeping behavior consistent everywhere.` },
      { title: 'Animation-safe slide transition', text: `The panel transitions only transform, staying smooth in every framework export including Tailwind.` },
    ],
    useCases: [
      { title: 'SaaS product feedback collection', text: `An always-available, low-friction way for users to share sentiment without leaving the page they're on.` },
      { title: 'Beta and early-access programs', text: `Collect quick mood + comment feedback from testers throughout a beta period instead of a single end-of-beta survey.` },
      { title: 'Documentation and help-center pages', text: `Ask "was this page helpful?" with the same mood-scale pattern at the end of an article.` },
      { title: 'Internal tools and admin dashboards', text: `Give employees a always-visible channel to flag friction in internal software without filing a formal ticket.` },
      { title: 'Marketing and landing pages', text: `Gauge visitor sentiment passively, pairing with an [NPS survey](/ui-snippets/nps-survey/) for a deeper periodic check-in.` },
      { title: 'Learning docked-tab and slide-panel patterns', text: `A reusable reference for the rotate+translate edge-tab trick and a source-tethered slide-out panel.` },
      { icon: 'CODE', title: 'Related: Accessible Modal Primitive with Real Focus Trap', desc: 'See the [Accessible Modal Primitive with Real Focus Trap](/ui-snippets/focus-trap-modal-primitive/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I send the feedback to a real backend?', a: `Inside the submit click handler, before swapping to the thank-you view, send moodValue and document.getElementById('ftwText').value in a fetch POST to your feedback API or analytics tool — keep the UI swap so users get confirmation even while the request is in flight.` },
      { q: 'How do I add a screenshot capture button?', a: `Add a "Attach screenshot" button that calls a capture library (or the experimental getDisplayMedia API) on click, store the resulting image/blob, and attach it to the same submission payload alongside the mood and comment.` },
      { q: 'How do I move the tab to the left edge or bottom of the screen?', a: `For the left edge, change right:0 to left:0 and flip the rotation to rotate(90deg) with a matching transform-origin adjustment; for the bottom, drop the rotation entirely and position the tab with bottom:0 and an upward-sliding panel instead.` },
      { q: 'How do I make the panel remember it was already submitted this session?', a: `After a successful submit, store a flag in sessionStorage (or localStorage for persistence across sessions) and check it on load — if set, you can hide the tab entirely or show a "You already gave feedback — thanks!" state instead of the form.` },
      { q: 'How do I use this feedback widget in React, Vue, or Angular?', a: `In React, track panelOpen, mood, and submitted in useState and conditionally render the body vs. thank-you view; in Vue, use ref()/reactive(); in Angular, use component fields with *ngIf. The rotate+translate tab styling and slide-panel transform are pure CSS and need no changes across frameworks.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the transform order by trial and error. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the docked tab needs a rotate followed by a translateY in that specific order (and why reversing them would send the tab off-screen), and how the transform-origin setting interacts with that sequence. The same assistant can help optimize it — ask whether the nested setTimeout chain that shows the thank-you state, then closes the panel, then resets the form is fragile if a user reopens the panel mid-sequence, and how to guard against that race condition. It's also useful for extending the widget: ask it to persist a "already submitted this session" flag so the tab doesn't invite repeat submissions, add a lightweight screenshot-attachment capability, or reposition the same docked-tab pattern to the bottom of the screen for a different layout. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a docked "Feedback" tab that slides out a feedback panel in plain HTML, CSS, and JavaScript — no library.

Requirements:
- A button fixed to the right edge of the viewport, vertically centered, that reads top-to-bottom as a genuinely rotated vertical tab rather than a sideways label — achieved with a combined CSS transform of a negative 90-degree rotation and a translateY, in the correct order, anchored with a transform-origin at its right edge, so the tab lands correctly docked to the edge instead of flying off-screen.
- Clicking the tab must slide a panel in from the same right edge using a transform from translateX(100%) to translateX(0) with an easing curve, not a centered modal, so the panel stays visually tethered to the tab it came from.
- Inside the panel, a row of several emoji "mood" buttons where picking one visually lifts and highlights the chosen button and enables an otherwise-disabled submit button; a comment textarea must be present but explicitly optional and must never gate the submit button on its own.
- Submitting must not immediately close the panel. Instead, swap the form body out for a thank-you confirmation view containing a checkmark and message, displayed inside the still-open panel for a couple of seconds, before the panel then closes and the form silently resets behind the scenes so it's ready fresh next time it opens.
- A backdrop element, an explicit close button, and the Escape key must all trigger the exact same single close function, so every dismissal path behaves identically.
- The panel's slide transition must only animate the transform property (not width, height, or position) to stay smooth and GPU-friendly across every export target.`,
    },
  },
};

export default feedbackTabWidget;
