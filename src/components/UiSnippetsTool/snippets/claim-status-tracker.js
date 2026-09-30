const claimStatusTracker = {
  id: 'claim-status-tracker',
  title: 'Insurance Claim Status Tracker',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="cs-card">
  <div class="cs-head">
    <div>
      <div class="cs-claim-id">Claim #CLM-88213</div>
      <div class="cs-claim-type">Auto collision — comprehensive coverage</div>
    </div>
    <div class="cs-status-pill" id="csPill">Under review</div>
  </div>

  <div class="cs-stepper" id="csStepper">
    <div class="cs-rail"><div class="cs-rail-fill" id="csFill"></div></div>

    <div class="cs-step">
      <div class="cs-dot"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
      <div class="cs-body">
        <div class="cs-step-title">Submitted</div>
        <div class="cs-step-time">Aug 18, 2026 · 10:14 AM</div>
      </div>
    </div>
    <div class="cs-step">
      <div class="cs-dot"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
      <div class="cs-body">
        <div class="cs-step-title">Under review</div>
        <div class="cs-step-time">Aug 19, 2026 · 2:47 PM</div>
        <div class="cs-est" id="csEst">Estimated resolution: 2–4 business days</div>
      </div>
    </div>
    <div class="cs-step">
      <div class="cs-dot"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
      <div class="cs-body">
        <div class="cs-step-title" id="csDecisionTitle">Decision</div>
        <div class="cs-step-time" id="csDecisionTime">Pending</div>
      </div>
    </div>
    <div class="cs-step">
      <div class="cs-dot"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
      <div class="cs-body">
        <div class="cs-step-title">Paid</div>
        <div class="cs-step-time" id="csPaidTime">Pending</div>
      </div>
    </div>
  </div>

  <div class="cs-actions">
    <button class="cs-btn cs-btn-approve" id="csApprove" onclick="resolveClaim(true)">Simulate: approve</button>
    <button class="cs-btn cs-btn-deny" id="csDeny" onclick="resolveClaim(false)">Simulate: deny</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;color:#e6e9f0}
.cs-card{background:#12161f;border:1px solid #232a3a;border-radius:18px;padding:26px;width:100%;max-width:420px;box-shadow:0 20px 50px rgba(0,0,0,.35)}

.cs-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:26px;gap:12px}
.cs-claim-id{font-size:15px;font-weight:800;color:#f4f6fb}
.cs-claim-type{font-size:12px;color:#8992a8;margin-top:3px}
.cs-status-pill{font-size:11px;font-weight:800;padding:6px 12px;border-radius:999px;background:#22314f;color:#7cb2ff;white-space:nowrap}
.cs-status-pill.approved{background:#0f3327;color:#4ade80}
.cs-status-pill.denied{background:#3a1a1a;color:#f87171}

.cs-stepper{position:relative;padding-left:6px}
.cs-rail{position:absolute;left:15px;top:14px;bottom:14px;width:3px;background:#232a3a;border-radius:3px}
.cs-rail-fill{position:absolute;left:0;top:0;width:100%;height:33%;background:linear-gradient(#60a5fa,#3b82f6);border-radius:3px;transition:height .6s cubic-bezier(.4,0,.2,1),background .3s}
.cs-rail-fill.approved{background:linear-gradient(#4ade80,#22c55e)}
.cs-rail-fill.denied{background:linear-gradient(#f87171,#ef4444)}

.cs-step{position:relative;display:flex;gap:14px;padding:11px 0;min-height:44px}
.cs-dot{width:27px;height:27px;border-radius:50%;background:#232a3a;border:3px solid #12161f;flex-shrink:0;display:flex;align-items:center;justify-content:center;z-index:1;transition:background .3s;box-shadow:0 0 0 1px #232a3a}
.cs-dot svg{opacity:0;transform:scale(.4);transition:opacity .25s,transform .25s}
.cs-step.done .cs-dot{background:#3b82f6;box-shadow:0 0 0 1px #3b82f6}
.cs-step.done .cs-dot svg{opacity:1;transform:scale(1)}
.cs-step.active .cs-dot{background:#3b82f6;box-shadow:0 0 0 1px #3b82f6;animation:cs-pulse 1.8s ease-out infinite}
.cs-step.approved .cs-dot{background:#22c55e;box-shadow:0 0 0 1px #22c55e;animation:none}
.cs-step.approved .cs-dot svg{opacity:1;transform:scale(1)}
.cs-step.denied .cs-dot{background:#ef4444;box-shadow:0 0 0 1px #ef4444;animation:none}
@keyframes cs-pulse{0%{box-shadow:0 0 0 0 rgba(59,130,246,.5)}70%{box-shadow:0 0 0 9px rgba(59,130,246,0)}100%{box-shadow:0 0 0 0 rgba(59,130,246,0)}}

.cs-body{padding-top:2px}
.cs-step-title{font-size:13px;font-weight:700;color:#4b5468;transition:color .3s}
.cs-step.done .cs-step-title,.cs-step.active .cs-step-title,.cs-step.approved .cs-step-title,.cs-step.denied .cs-step-title{color:#f4f6fb}
.cs-step-time{font-size:11px;color:#5c6480;margin-top:1px}
.cs-step.active .cs-step-time{color:#7cb2ff;font-weight:600}
.cs-est{font-size:11px;color:#7cb2ff;margin-top:5px;background:#182238;display:inline-block;padding:4px 9px;border-radius:7px}

.cs-actions{display:flex;gap:10px;margin-top:20px}
.cs-btn{flex:1;padding:11px;border:none;border-radius:11px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:opacity .15s}
.cs-btn-approve{background:#16321f;color:#4ade80}
.cs-btn-deny{background:#3a1a1a;color:#f87171}
.cs-btn:hover{opacity:.85}
.cs-btn:disabled{opacity:.35;cursor:not-allowed}`,

  js: `var current = 1; // 0=submitted,1=under review,2=decision,3=paid
var outcome = null; // 'approved' | 'denied'

function fmtNow() {
  return 'Aug 20, 2026 · 11:0' + (current + 2) + ' AM';
}

function render() {
  var steps = document.querySelectorAll('.cs-step');
  steps.forEach(function (step, i) {
    step.classList.remove('done', 'active', 'approved', 'denied');
    if (outcome && i === 2) {
      step.classList.add(outcome);
    } else if (outcome && i === 3 && outcome === 'approved') {
      step.classList.add(current >= 3 ? 'done' : 'active');
    } else if (i < current) {
      step.classList.add('done');
    } else if (i === current) {
      step.classList.add('active');
    }
  });

  var n = steps.length;
  var pct = (current / (n - 1)) * 100;
  var fill = document.getElementById('csFill');
  fill.style.height = pct + '%';
  fill.classList.remove('approved', 'denied');
  if (outcome) fill.classList.add(outcome);

  var pill = document.getElementById('csPill');
  pill.classList.remove('approved', 'denied');
  if (outcome === 'approved') {
    pill.textContent = current >= 3 ? 'Paid' : 'Approved';
    pill.classList.add('approved');
  } else if (outcome === 'denied') {
    pill.textContent = 'Denied';
    pill.classList.add('denied');
  } else {
    pill.textContent = current === 0 ? 'Submitted' : 'Under review';
  }
}

function resolveClaim(approved) {
  if (outcome) return;
  outcome = approved ? 'approved' : 'denied';
  current = 2;
  document.getElementById('csDecisionTitle').textContent = approved ? 'Approved' : 'Denied';
  document.getElementById('csDecisionTime').textContent = fmtNow();
  document.getElementById('csEst').remove();
  render();

  document.getElementById('csApprove').disabled = true;
  document.getElementById('csDeny').disabled = true;

  if (approved) {
    setTimeout(function () {
      current = 3;
      document.getElementById('csPaidTime').textContent = 'Aug 22, 2026 · 9:30 AM';
      render();
    }, 900);
  }
}

render();`,

  seo: {
    title: 'Insurance Claim Status Tracker — Free HTML CSS JS Snippet',
    description: `A claim-status stepper with an animated progress rail, timestamps per step, an estimated-resolution note, and approve/deny outcome states. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Insurance Claim Status Tracker — A Stepper That Shows Where a Claim Really Stands',
      description: `Nothing erodes trust in an insurer faster than silence after a claim is filed. A claim status tracker answers "where is my claim?" without a phone call — showing every stage from submission to payout, timestamping what has already happened, and giving an honest estimate for what's still pending. This snippet builds that pattern in plain HTML, CSS, and vanilla JavaScript: a vertical stepper with an animated fill rail, a status pill, and a two-outcome decision branch for approved or denied claims.

**One state, one render function**

Two variables drive the whole UI: \`current\`, the index of the furthest-reached stage, and \`outcome\`, which is \`null\` until a decision is made and then \`'approved'\` or \`'denied'\`. The \`render\` function reads both and derives every visual: which dots are filled, which pulses, the rail-fill height, the pill text and color. Nothing is set imperatively outside of \`render\`, so wiring the tracker to a real claims API is a matter of updating those two variables and calling one function.

**A rail that can change color**

The \`.cs-rail-fill\` element grows its height as a percentage of steps completed, exactly like a shipment or order tracker — but here the fill's gradient itself changes: blue while the claim is in progress, green once approved, red once denied. That single color shift communicates the claim's fate at a glance, reinforcing the status pill without adding new UI.

**An honest estimate, not a fake countdown**

The "Under review" step carries an \`.cs-est\` note — "Estimated resolution: 2–4 business days" — sitting directly under the timestamp for that stage. It's static text, not a manufactured countdown timer, because claims processing genuinely doesn't resolve to the second and pretending otherwise erodes the same trust the tracker is meant to build. The estimate note is removed once a decision lands, since it's no longer relevant.

**Two outcomes from one decision step**

Rather than hard-coding a linear "Approved → Paid" path, the decision step branches: \`resolveClaim(true)\` colors it green and, after a short delay, advances a fourth "Paid" step; \`resolveClaint(false)\` colors it red and the tracker stops there — a denied claim never gets a "Paid" state. This mirrors how claims actually behave and is a pattern worth copying into any workflow with a branching outcome.

**Extending it**

Add a "Documents needed" interstitial step for claims sent back for more information, wire an adjuster's name and photo into the review stage, or replace the simulate buttons with a live poll against a claims API. Pair it with an [order tracking timeline](/ui-snippets/order-tracking-timeline/) for shipment-style flows, a [stepper](/ui-snippets/stepper/) for multi-step forms, or a [status dashboard](/ui-snippets/status-dashboard/) for an overview of many claims at once.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A claim card renders with "Submitted" and "Under review" complete, the review stage pulsing, and an estimated-resolution note beneath it.` },
      { title: 'Read the current state', text: `The blue rail fills to the active stage and the header pill reads "Under review".` },
      { title: 'Simulate an approval', text: `Click "Simulate: approve" — the decision step turns green, a timestamp fills in, and after a beat the "Paid" step completes too.` },
      { title: 'Or simulate a denial', text: `Reload and click "Simulate: deny" instead — the decision step turns red and the tracker stops there; no "Paid" step follows.` },
      { title: 'Notice the estimate disappear', text: `Once a decision lands, the "2–4 business days" estimate note is removed since it's no longer relevant.` },
      { title: 'Wire it to real data', text: `Replace the two buttons with a poll or websocket handler that sets current and outcome from your claims API.` },
    ] },
    features: [
      { title: 'Two-variable state', text: `current and outcome drive every visual through one render function — no imperative DOM writes scattered around.` },
      { title: 'Animated fill rail', text: `The progress rail's height transitions smoothly and its gradient recolors on approval or denial.` },
      { title: 'Honest estimate note', text: `A static "2–4 business days" label, not a fake countdown, sits under the in-progress stage.` },
      { title: 'Branching outcome', text: `Approval continues to a Paid step; denial stops the tracker at the decision — matching real claim behavior.` },
      { title: 'Pulsing active stage', text: `A pure-CSS box-shadow keyframe draws the eye to whichever stage is currently in progress.` },
      { title: 'Status pill mirroring', text: `The header pill always reflects current stage or outcome, recoloring green or red on resolution.` },
      { title: 'Timestamped history', text: `Each completed step keeps a real timestamp, building an auditable record of the claim's progress.` },
      { title: 'Disableable actions', text: `Simulate buttons disable once a decision is made, preventing a claim from being resolved twice.` },
    ],
    useCases: [
      { title: 'Auto and property claims', text: `The core use — track a collision or damage claim from filing to payout in a customer-facing portal.` },
      { title: 'Health insurance claims', text: `Show a submitted medical claim moving through review, adjudication, and reimbursement.` },
      { title: 'Warranty and repair tickets', text: `Reuse the branching decision step for approved-vs-denied warranty claims, pairing with a [delivery ETA card](/ui-snippets/delivery-eta-card/) once a replacement ships.` },
      { title: 'Support and dispute tracking', text: `Apply the same stepper to a billing dispute or chargeback, where the outcome is also a binary decision.` },
      { title: 'Insurer admin dashboards', text: `Embed a compact version in a [status dashboard](/ui-snippets/status-dashboard/) showing many claims' stages at a glance.` },
      { title: 'Loan and application pipelines', text: `The submitted → review → decision shape applies directly to loan or credit approvals; pair with a [comparison table](/ui-snippets/comparison-table/) of terms once approved.` },
      { icon: 'CODE', title: 'Related: Content Calendar Grid', desc: 'See the [Content Calendar Grid](/ui-snippets/content-calendar-grid/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to a real claims API?', a: `Replace the two simulate buttons with a fetch/poll or websocket handler that receives the claim's current stage and outcome from your backend, sets the current and outcome variables accordingly, fills in real timestamps, and calls render(). No other code changes — render already derives every visual from those two variables.` },
      { q: 'Why is the estimate text static instead of a countdown?', a: `A precise countdown implies a certainty claims processing rarely has — reviews can finish early or run long. A stated range ("2–4 business days") sets an honest expectation without manufacturing false precision, and it's removed once a real decision timestamp is available.` },
      { q: 'How do I add a "more information needed" state?', a: `Insert an extra step between review and decision, or add a .needs-info modifier class on the review step that swaps its color to amber and updates its text. Branch resolveClaim (or add a requestInfo function) to set that state instead of moving current forward, and give the customer an action to resubmit documents.` },
      { q: 'Is the tracker accessible to screen readers?', a: `Wrap the stepper in an aria-live="polite" region so stage changes are announced, add visually-hidden "completed" or "in progress" text to each step, and make sure the status pill's text (not just its color) conveys the outcome. The checkmark icons should carry aria-hidden since the title text already states completion.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Hold current and outcome in component state, derive each step's class from comparing its index to current and outcome in a computed/render expression, and bind the rail's height style to the same percentage calculation. The CSS, including the pulse keyframe and color transitions, ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to trace every branch by hand to understand this tracker. Paste its HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how the current index and outcome variable together determine each step's class, the rail-fill height and color, and the status pill text through a single render call — and why the decision step branches into two different continuations (a Paid step for approvals, a dead end for denials) instead of always advancing linearly. The same assistant can help harden it for production: ask whether the estimate text should be computed from a real SLA value passed into the component, whether the simulate buttons' disabled state correctly prevents a double-resolution, or how to add a "needs more information" branch that loops the claim back to review. It's also useful for extending the effect: ask it to add an adjuster name and avatar to the review stage, wire resolveClaim up to a real API response, or make the estimate note update dynamically as time passes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "insurance claim status tracker" in plain HTML, CSS, and JavaScript with no framework — a vertical stepper with a branching outcome.

Requirements:
- Four stages: Submitted, Under review, Decision, Paid — each with a dot, a title, and a timestamp area, plus a background rail behind the dots and a colored fill element on top that grows as a percentage of stages completed.
- Track progress with two state variables: a numeric index for the furthest-reached stage, and an outcome variable that starts null and becomes either an "approved" or "denied" string once a decision is simulated. A single render function must derive every visual (dot color/state, rail-fill height and color, header status pill text and color) from just these two variables.
- The "Under review" stage must show a small estimated-resolution note (e.g. "Estimated resolution: 2–4 business days") as static text near its timestamp — not a live countdown — and that note must be removed once a decision is reached.
- Two buttons simulate resolving the claim: one sets the outcome to approved (turning the decision step and rail green, filling in a real timestamp, and after a short delay advancing a final "Paid" step to complete), the other sets it to denied (turning the decision step and rail red) and the tracker must NOT show a Paid step completing in that case.
- The active/in-progress stage's dot must have a continuously looping pulse implemented as a CSS box-shadow keyframe animation, and completed stages must show a checkmark icon that animates in from a smaller scale and zero opacity.
- Both simulate buttons must disable themselves once a decision has been made, so a claim cannot be resolved twice.`,
    },
  },
};

export default claimStatusTracker;
