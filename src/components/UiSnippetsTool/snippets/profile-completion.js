const profileCompletion = {
  id: 'profile-completion',
  title: 'Profile Completion Meter',
  lastmod: '2026-06-17',
  category: 'dashboards',
  html: `<div class="pc-card" id="pcCard">
  <div class="pc-top">
    <div class="pc-ring">
      <svg viewBox="0 0 100 100" width="96" height="96">
        <circle class="pc-track" cx="50" cy="50" r="42"/>
        <circle class="pc-prog" id="pcProg" cx="50" cy="50" r="42"/>
      </svg>
      <div class="pc-pct"><span id="pcPctNum">0</span><small>%</small></div>
    </div>
    <div class="pc-intro">
      <h2 class="pc-title">Complete your profile</h2>
      <p class="pc-msg" id="pcMsg">Finish setup to unlock everything.</p>
    </div>
  </div>

  <ul class="pc-list" id="pcList">
    <li class="pc-task done" data-w="20" onclick="toggleTask(this)"><span class="pc-check"></span><span class="pc-label">Add a profile photo</span><span class="pc-pts">+20%</span></li>
    <li class="pc-task done" data-w="20" onclick="toggleTask(this)"><span class="pc-check"></span><span class="pc-label">Verify your email</span><span class="pc-pts">+20%</span></li>
    <li class="pc-task" data-w="15" onclick="toggleTask(this)"><span class="pc-check"></span><span class="pc-label">Write a short bio</span><span class="pc-pts">+15%</span></li>
    <li class="pc-task" data-w="20" onclick="toggleTask(this)"><span class="pc-check"></span><span class="pc-label">Connect an integration</span><span class="pc-pts">+20%</span></li>
    <li class="pc-task" data-w="15" onclick="toggleTask(this)"><span class="pc-check"></span><span class="pc-label">Invite a teammate</span><span class="pc-pts">+15%</span></li>
    <li class="pc-task" data-w="10" onclick="toggleTask(this)"><span class="pc-check"></span><span class="pc-label">Set up billing</span><span class="pc-pts">+10%</span></li>
  </ul>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.pc-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;width:100%;max-width:380px;box-shadow:0 14px 44px rgba(15,23,42,.07)}

.pc-top{display:flex;align-items:center;gap:16px;margin-bottom:20px}
.pc-ring{position:relative;flex-shrink:0;width:96px;height:96px}
.pc-ring svg{transform:rotate(-90deg)}
.pc-track{fill:none;stroke:#eef2f7;stroke-width:8}
.pc-prog{fill:none;stroke:#6366f1;stroke-width:8;stroke-linecap:round;stroke-dasharray:263.9;stroke-dashoffset:263.9}
.pc-card.complete .pc-prog{stroke:#10b981}
.pc-pct{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#1e293b;font-variant-numeric:tabular-nums}
.pc-pct small{font-size:12px;font-weight:700;color:#94a3b8;margin-left:1px}

.pc-title{font-size:16px;font-weight:800;color:#1e293b}
.pc-msg{font-size:13px;color:#64748b;margin-top:4px;line-height:1.4}
.pc-card.complete .pc-msg{color:#10b981;font-weight:700}

.pc-list{list-style:none;display:flex;flex-direction:column;gap:2px}
.pc-task{display:flex;align-items:center;gap:11px;padding:11px 10px;border-radius:10px;cursor:pointer;transition:background .15s}
.pc-task:hover{background:#f8fafc}
.pc-check{width:22px;height:22px;border-radius:50%;border:2px solid #cbd5e1;flex-shrink:0;position:relative;transition:all .18s}
.pc-task.done .pc-check{background:#10b981;border-color:#10b981}
.pc-task.done .pc-check::after{content:'';position:absolute;left:6.5px;top:3px;width:5px;height:9px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
.pc-label{flex:1;font-size:13px;font-weight:600;color:#334155;transition:color .15s}
.pc-task.done .pc-label{color:#94a3b8;text-decoration:line-through}
.pc-pts{font-size:11px;font-weight:800;color:#6366f1}
.pc-task.done .pc-pts{color:#cbd5e1}`,

  js: `var C = 2 * Math.PI * 42;
var card = document.getElementById('pcCard');
var prog = document.getElementById('pcProg');
var pctNum = document.getElementById('pcPctNum');
var msgEl = document.getElementById('pcMsg');
var shown = 0;

function targetPct() {
  var tasks = document.querySelectorAll('.pc-task');
  var total = 0, done = 0;
  tasks.forEach(function (t) {
    var w = +t.dataset.w; total += w;
    if (t.classList.contains('done')) done += w;
  });
  return total ? Math.round(done / total * 100) : 0;
}

function setRing(pct) {
  var from = shown, start = performance.now();
  function frame(now) {
    var p = Math.min(1, (now - start) / 450);
    var cur = from + (pct - from) * (1 - Math.pow(1 - p, 3));
    prog.style.strokeDashoffset = (C * (1 - cur / 100)).toFixed(2);
    pctNum.textContent = Math.round(cur);
    if (p < 1) requestAnimationFrame(frame); else shown = pct;
  }
  requestAnimationFrame(frame);
}

function message(pct) {
  if (pct >= 100) return 'Profile complete 🎉 You are all set!';
  if (pct >= 60)  return 'Almost there — just a few steps left.';
  if (pct >= 30)  return 'Nice start! Keep going to finish setup.';
  return 'Finish setup to unlock everything.';
}

function toggleTask(el) {
  el.classList.toggle('done');
  var pct = targetPct();
  setRing(pct);
  msgEl.textContent = message(pct);
  card.classList.toggle('complete', pct >= 100);
}

setRing(targetPct());
msgEl.textContent = message(targetPct());`,

  seo: {
    title: 'Profile Completion Meter — HTML CSS JS Snippet',
    description: `Profile completion widget with an animated SVG progress ring, a weighted setup checklist & an eased percentage count. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Profile Completion Meter — Weighted Checklist, Animated Progress Ring & Complete State`,
      description: `The profile completion meter is one of the most effective onboarding nudges in SaaS: a progress ring paired with a checklist of setup tasks that visibly fills as users complete each step. It leverages the Zeigarnik effect — people are driven to finish what they have started — and measurably increases activation. This snippet implements it in plain HTML, CSS, and vanilla JavaScript: a weighted task checklist, an animated SVG progress ring, an eased percentage count-up, and a celebratory complete state.

**Weighted tasks, not just a count**

Each task carries a \`data-w\` weight (photo 20%, verify email 20%, bio 15%, integration 20%, invite 15%, billing 10%) summing to 100. \`targetPct\` recomputes completion as the sum of completed weights over the total — so higher-impact steps move the needle more, exactly as real onboarding scores work. Tasks start with some pre-completed (photo + email = 40%), and clicking any row toggles its \`done\` state, checks it off with a strike-through, and recalculates.

**Animated SVG progress ring**

The ring is two SVG circles (track + progress) using the stroke-dash technique: \`stroke-dasharray\` set to the circumference (\`2πr\`) and \`stroke-dashoffset\` reduced toward zero to draw the arc, rotated \`-90deg\` to start at the top. Rather than a CSS transition on \`stroke-dashoffset\` (which utility frameworks like Tailwind do not animate, so it would snap), \`setRing\` tweens the offset every frame with a \`requestAnimationFrame\` loop and a cubic ease-out, animating smoothly from the previously shown value to the new target. The centre percentage counts up in lockstep from the same eased value.

**Contextual messaging and complete state**

The supporting message changes with progress — "Nice start!", "Almost there", and on 100% "Profile complete 🎉 You are all set!" — turning a static label into encouragement. At 100% the card gains a \`complete\` class that recolours the ring green and emphasises the message, marking the goal as achieved. These small reinforcements are what make completion meters convert.

**Self-recomputing**

Everything derives from the checklist DOM: \`targetPct\` reads the tasks each time, so adding, removing, or reweighting tasks needs no other changes, and the ring/percentage/message all follow. On load it computes the initial percentage and message from the pre-completed tasks.

Wire each task's click to actually open that setup step (or mark it done from your backend) and you have a real onboarding widget. Pair this with a [stats card](/ui-snippets/stats-card/) for account metrics, an [onboarding tour](/ui-snippets/onboarding-tour/) for guided setup, or a [streak tracker](/ui-snippets/streak-tracker/) for ongoing engagement.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A "Complete your profile" card appears with a progress ring at 40% and a six-item checklist (two pre-completed).` },
      { title: 'Complete a task', text: `Click "Write a short bio" — it checks off with a strike-through and the ring animates up, the percentage counting smoothly.` },
      { title: 'Watch the message change', text: `As you pass thresholds the supporting text updates from "Nice start!" to "Almost there".` },
      { title: 'Undo a task', text: `Click a completed task again to uncheck it — the ring eases back down and the percentage recalculates.` },
      { title: 'Reach 100%', text: `Finish every task — the ring turns green and the message becomes "Profile complete 🎉 You are all set!".` },
      { title: 'Wire real steps', text: `Make each task's click open that setup flow or sync its done state from your backend; the meter recomputes automatically.` },
    ] },
    features: [
      { title: 'Weighted completion', text: `Each task has a \`data-w\` weight; \`targetPct\` scores completed weight over total, so high-impact steps move the ring more.` },
      { title: 'SVG stroke-dash ring', text: `Two circles with \`stroke-dasharray\` = circumference and a shrinking \`stroke-dashoffset\` draw the arc, rotated to start at the top.` },
      { title: 'JS-tweened ring', text: `\`setRing\` animates the offset each \`requestAnimationFrame\` with an ease-out — smooth and export-safe, unlike a CSS stroke transition.` },
      { title: 'Eased percentage count', text: `The centre number counts up from the same eased value as the ring, so they always agree.` },
      { title: 'Animated checklist', text: `Tasks toggle a \`done\` state with a check-circle fill and strike-through label, with hover feedback per row.` },
      { title: 'Contextual messaging', text: `\`message\` returns encouragement by threshold, turning a static label into a motivating nudge.` },
      { title: 'Complete state', text: `At 100% the card recolours the ring green and emphasises the message, marking the goal as achieved.` },
      { title: 'Self-recomputing', text: `All values derive from the checklist DOM, so adding or reweighting tasks needs no other code changes.` },
    ],
    useCases: [
      { title: 'SaaS onboarding nudges', text: `The core use — drive activation by showing setup progress. Pair with an [onboarding tour](/ui-snippets/onboarding-tour/) for guided steps.` },
      { title: 'Account / profile settings', text: `Show completion in a settings or profile page beside a [stats card](/ui-snippets/stats-card/) of account info.` },
      { title: 'Seller / creator setup', text: `Marketplaces nudge sellers to complete a storefront (add photos, payout, policies) before going live.` },
      { title: 'Verification / KYC flows', text: `Track multi-step identity or compliance steps with weights reflecting each step's importance.` },
      { title: 'Course / learning progress', text: `Show progress through required modules; combine with a [streak tracker](/ui-snippets/streak-tracker/) for daily engagement.` },
      { title: 'Checklist dashboards', text: `Any weighted task list with a visual progress goal in a [dashboard layout](/ui-snippets/dashboard-layout/).` },
      { icon: 'CODE', title: 'Related: Video Call Hand-Raise Queue', desc: 'See the [Video Call Hand-Raise Queue](/ui-snippets/video-call-hand-raise-queue/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I sync task state with my backend?', a: `On load, set each task's \`done\` class from your user record, then call \`setRing(targetPct())\`. In \`toggleTask\`, after toggling, PATCH the change to your API (optimistically); on failure, revert the class and recompute. Make each row's click open the actual setup step (navigate or open a modal) rather than just toggling, so the checklist drives real completion.` },
      { q: 'How do I change the task weights?', a: `Edit each task's \`data-w\`. They do not need to sum to 100 — \`targetPct\` divides completed weight by the total of all weights, so any numbers work and the percentage stays correct. Weight steps by impact (e.g. connecting an integration is worth more than adding a bio) to reflect what actually matters for activation.` },
      { q: 'Why tween the ring in JS instead of a CSS transition?', a: `Utility frameworks like Tailwind do not include \`stroke-dashoffset\` in their \`transition\` utility, so a CSS-transition approach snaps in the React + Tailwind export. Updating the offset each \`requestAnimationFrame\` (with an ease-out) animates smoothly everywhere and lets the centre percentage count up in perfect sync from the same value.` },
      { q: 'Is the completion meter accessible?', a: `Give the ring \`role="progressbar"\` with \`aria-valuenow\`/\`aria-valuemax\` updated in \`setRing\`, and make each task a real interactive element (button or checkbox) so it is keyboard-operable and announces its checked state. Announce the new percentage via an \`aria-live="polite"\` region so screen-reader users hear progress as they complete steps.` },
      { q: 'How do I use this completion meter in React, Vue, or Angular?', a: `In React, hold the tasks (with done flags) in \`useState\`, derive the percentage with \`useMemo\`, and animate the ring with a small tween effect or by setting the offset from an animated value. In Vue, use a \`ref\` for tasks and a \`computed\` percentage. In Angular, track tasks on the component and bind \`[style.strokeDashoffset]\`. The stroke-dash math and checklist CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out the stroke-dash geometry from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the circumference constant, the stroke-dasharray, and the shrinking stroke-dashoffset combine with the -90deg rotation to draw an arc that starts at the top, or why setRing tweens the offset in a requestAnimationFrame loop instead of relying on a CSS transition. The same assistant can help optimize it too, for example checking whether targetPct re-querying every task node on each toggle is wasteful once the checklist grows, or whether the ease-out cubic in setRing could be swapped for a spring for a snappier feel. It is equally useful for extending the widget: ask it to persist task state to localStorage or a backend, add a confetti burst at 100 percent, or support nested sub-tasks with their own weights. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "profile completion meter" in plain HTML, CSS, and JavaScript using only inline SVG and requestAnimationFrame — no charting library, no CSS-only stroke transition.

Requirements:
- A card with an SVG progress ring made of two concentric circles of the same radius: a light track circle and a colored progress circle, both using stroke-dasharray set to the circle's circumference (2 * PI * r) so the entire stroke length is the dash. Rotate the SVG -90 degrees so the arc begins at the top instead of the 3 o'clock position.
- Below or beside the ring, a checklist of tasks, each carrying a numeric weight (e.g. a data attribute) that need not sum to any particular total.
- A function that computes the completion percentage as the sum of the weights of completed tasks divided by the sum of all weights, rounded to a whole number.
- A function that animates the ring: given a new target percentage, it must tween the stroke-dashoffset every animation frame from the currently displayed percentage to the new one over a fixed duration (450ms) using a cubic ease-out curve, updating a centered percentage number in the same loop so the digit and the ring always agree.
- Clicking any task toggles its completed state (with a strikethrough and a filled check indicator), recomputes the percentage, and re-triggers the ring animation from wherever it currently is — including animating backward if a task is unchecked.
- A supporting message that changes at percentage thresholds (e.g. a "nice start" message early on, an "almost there" message in the 60-99 range, and a celebratory message exactly at 100), and a distinct "complete" visual state (e.g. the ring recoloring) that only appears at 100 percent.`,
    },
  },
};

export default profileCompletion;
