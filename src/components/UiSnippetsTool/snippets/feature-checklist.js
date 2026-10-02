const featureChecklist = {
  id: 'feature-checklist',
  title: 'Feature Checklist',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="fl-card" id="flCard">
  <div class="fl-head">
    <h3>Set up your workspace</h3>
    <span class="fl-prog"><span class="fl-prog-num" id="flNum">0</span>/<span id="flTot">5</span></span>
  </div>
  <div class="fl-bar"><span class="fl-bar-fill" id="flFill"></span></div>
  <ul class="fl-list" id="flList">
    <li class="fl-item is-done"><span class="fl-check"></span><div class="fl-body"><strong>Create your account</strong><span>You're signed in and ready.</span></div></li>
    <li class="fl-item"><span class="fl-check"></span><div class="fl-body"><strong>Invite a teammate</strong><span>Collaboration is better together.</span></div></li>
    <li class="fl-item"><span class="fl-check"></span><div class="fl-body"><strong>Connect a data source</strong><span>Link a database or API.</span></div></li>
    <li class="fl-item"><span class="fl-check"></span><div class="fl-body"><strong>Build your first board</strong><span>Drag in a few widgets.</span></div></li>
    <li class="fl-item"><span class="fl-check"></span><div class="fl-body"><strong>Publish a dashboard</strong><span>Share it with your team.</span></div></li>
  </ul>
  <div class="fl-done" id="flBanner">🎉 All set — your workspace is ready!</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0e17;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.fl-card{width:340px;background:#141826;border:1px solid #232838;border-radius:18px;padding:20px}
.fl-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.fl-head h3{color:#fff;font-size:16px}
.fl-prog{color:#8b93a8;font-size:13px;font-weight:700}
.fl-prog-num{color:#22c55e}
.fl-bar{height:6px;background:#1d2233;border-radius:999px;overflow:hidden}
.fl-bar-fill{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#22c55e,#10b981);transition:width .4s cubic-bezier(.22,1,.36,1)}

.fl-list{list-style:none;margin-top:14px;display:flex;flex-direction:column;gap:4px}
.fl-item{display:flex;align-items:flex-start;gap:12px;padding:10px;border-radius:12px;cursor:pointer;transition:background .15s}
.fl-item:hover{background:#1a1f2e}
.fl-check{flex-shrink:0;width:22px;height:22px;margin-top:1px;border-radius:50%;border:2px solid #38415a;position:relative;transition:background .2s,border-color .2s}
.fl-check::after{content:'';position:absolute;left:6px;top:2.5px;width:5px;height:10px;border:solid #fff;border-width:0 2.5px 2.5px 0;transform:rotate(45deg) scale(0);transition:transform .2s cubic-bezier(.5,1.6,.5,1)}
.fl-item.is-done .fl-check{background:#22c55e;border-color:#22c55e}
.fl-item.is-done .fl-check::after{transform:rotate(45deg) scale(1)}
.fl-body{display:flex;flex-direction:column;gap:1px;min-width:0}
.fl-body strong{color:#e7eaf3;font-size:14px;font-weight:600;transition:color .2s}
.fl-body span{font-size:12.5px;color:#7c8398}
.fl-item.is-done .fl-body strong{color:#8a93a8;text-decoration:line-through}

.fl-done{margin-top:14px;text-align:center;font-size:14px;font-weight:600;color:#bbf7d0;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);border-radius:12px;padding:12px;opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s;display:none}
.fl-done.is-visible{display:block;opacity:1;transform:none}`,

  js: `var card = document.getElementById('flCard');
var items = Array.prototype.slice.call(document.querySelectorAll('.fl-item'));
var fill = document.getElementById('flFill');
var num = document.getElementById('flNum');
var banner = document.getElementById('flBanner');

function update() {
  var done = items.filter(function (i) { return i.classList.contains('is-done'); }).length;
  num.textContent = done;
  fill.style.width = (done / items.length * 100) + '%';
  var all = done === items.length;
  banner.classList.toggle('is-visible', all);
}

items.forEach(function (item) {
  item.addEventListener('click', function () {
    item.classList.toggle('is-done');
    update();
  });
});

document.getElementById('flTot').textContent = items.length;
update();`,

  seo: {
    title: 'Feature Checklist — Free HTML CSS JS Checklist Card',
    description: `An onboarding checklist with toggleable items, an animated check draw, a progress bar and counter, and a completion banner. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Feature Checklist — A Progress-Tracking Onboarding Card',
      description: `The feature checklist is the getting-started card that walks new users through setup tasks, ticking each one off with a satisfying check and filling a progress bar as they go — the onboarding pattern that boosts activation. This snippet builds it with plain HTML, CSS, and a small vanilla JavaScript tracker, including an animated check mark and a completion celebration.

**The drawn check mark**

Each item's checkbox is a circle whose tick is a \`::after\` made from two borders forming an L, rotated 45°. At rest the tick is scaled to zero; when the item gains \`is-done\` it scales to one with a slight overshoot bezier, so the check "pops" in as if drawn. The circle fills green at the same time. Building the check from borders rather than an icon means it animates smoothly and recolours with a property — no SVG or icon font needed.

**Toggle and derive**

Clicking anywhere on an item toggles its \`is-done\` class — the whole row is the target, not just the box, which is a larger, friendlier hit area. A single \`update()\` function then derives everything from the current state: it counts done items, sets the counter, sets the progress bar width to that fraction, and shows the completion banner when all are done. Deriving the UI from one count keeps it impossible for the bar and the checks to disagree.

**Animated progress bar**

The progress bar fill is a gradient whose \`width\` transitions with an ease-out curve, so it glides to the new percentage each time an item toggles rather than jumping. The counter beside the heading ("3/5") updates in step, giving both a visual and a numeric read on progress.

**Completing the list**

Done items get a struck-through, dimmed title so finished tasks visibly recede, keeping attention on what's left. When the last item is checked, a celebration banner slides and fades in beneath the list; unchecking drops it back below 100% and hides the banner. This open/close on the completion state models the real reward moment of finishing onboarding.

**Accessible, extendable structure**

The list is a real \`<ul>\` of items with a title and description each, so it reads clearly and is easy to extend. In production you'd drive \`is-done\` from real completion data (account created, teammate invited) and persist progress, calling \`update()\` whenever a task completes in the background.

**Customizing it**

Add or remove tasks — the counter and bar adapt to the list length automatically — change the accent, the celebration copy, or make items links to the relevant setup screen. Pair it with an [onboarding checklist widget](/ui-snippets/onboarding-checklist-widget/), a [progress wizard](/ui-snippets/progress-wizard/), or a [profile completion](/ui-snippets/profile-completion/) meter.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 5-task checklist renders with one done.` },
      { title: 'Click a task', text: `Its check pops in and the bar advances.` },
      { title: 'Watch the counter', text: `The x/5 count tracks completion.` },
      { title: 'Finish the list', text: `A celebration banner slides in at 100%.` },
      { title: 'Uncheck a task', text: `The bar drops and the banner hides.` },
      { title: 'Add a task', text: `Drop in another item — totals adapt.` },
    ] },
    features: [
      { title: 'Drawn check mark', text: `Border-built tick pops in with overshoot.` },
      { title: 'Whole-row toggle', text: `Large, friendly click target.` },
      { title: 'Derived UI', text: `One count drives bar, counter, and banner.` },
      { title: 'Animated bar', text: `Gradient fill glides to each percentage.` },
      { title: 'Struck-through done', text: `Finished tasks visibly recede.` },
      { title: 'Completion banner', text: `Celebration slides in at 100%.` },
      { title: 'Length-aware totals', text: `Counter and bar adapt to item count.` },
      { title: 'Data-ready', text: `Drive is-done from real progress.` },
    ],
    useCases: [
      { title: 'Onboarding checklist cards', text: 'Offer a card form of an [onboarding checklist widget](/ui-snippets/onboarding-checklist-widget/), with a drawn tick that pops in with overshoot.' },
      { title: 'Setup flow tracking', text: 'Track setup steps beside a [progress wizard](/ui-snippets/progress-wizard/), using whole-row click targets that are large, friendly and easy to hit.' },
      { title: 'Profile completion nudges', text: 'Pair with a [profile completion](/ui-snippets/profile-completion/) meter, with a single count driving bar, counter and completion banner.' },
      { title: 'Richer task lists', text: 'Compare with a [todo widget](/ui-snippets/todo-widget/) when tasks need adding and deleting as well as simply being ticked off.' },
      { title: 'Activation and tutorials', text: 'Guide users from an [empty state](/ui-snippets/empty-state/) through setup, and follow with an [onboarding tour](/ui-snippets/onboarding-tour/) for the first real action.' },
      { icon: 'CODE', title: 'Related: Offer Letter Preview Card', desc: 'See the [Offer Letter Preview Card](/ui-snippets/offer-letter-preview/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the check mark animated?', a: `Each checkbox is a circle whose tick is a ::after made from two borders forming an L, rotated 45 degrees. At rest it is scaled to zero; when the item is done it scales to one with a slight overshoot bezier, so the check pops in as if drawn, while the circle fills green. Building it from borders means it animates smoothly with no SVG or icon font.` },
      { q: 'How do the bar and counter stay in sync with the checks?', a: `A single update function derives everything from the current state: it counts the done items, sets the counter, sets the progress bar width to that fraction, and toggles the completion banner. Because the whole UI is computed from one count, the bar and the checked items can never disagree.` },
      { q: 'Why is the whole row clickable, not just the box?', a: `Making the entire item the toggle target gives a much larger, friendlier hit area than a small checkbox, which is easier to tap on touch devices and quicker on desktop. The checkbox is purely visual; clicking anywhere on the row flips the is-done class.` },
      { q: 'How would I connect this to real onboarding data?', a: `Drive each item's is-done class from your real completion signals — account created, teammate invited, data source connected — and call update whenever one completes in the background. Persist the state so progress survives reloads. The check, bar, and banner all follow from the class, so your code only sets is-done per task.` },
      { q: 'How do I use this feature checklist in React, Vue, or Angular?', a: `Hold the tasks as an array of objects with a done flag in state. Render each item from the array, toggle its done flag on click, and derive the completed count, bar width, and banner visibility with computed values rather than manual DOM updates. The check and bar CSS port unchanged; persist the array to localStorage or your backend.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the derived-state logic by memory to be confident it's correct. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the single update function recomputes the counter text, the progress bar width, and the completion banner's visibility all from one filtered count of done items, and why that single-source-of-truth approach guarantees the bar and the checkmarks can never visually disagree. The same assistant can help optimize it — ask whether re-querying all list items on every single click is worth caching, and whether the border-built checkmark's overshoot easing curve should be tuned differently for a checklist with many more items animating in quick succession. It's also useful for extending it: ask it to persist checked state to localStorage so progress survives a page reload, drive is-done from real async completion events instead of a click, or add a subtle confetti burst tied to the completion banner appearing. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an onboarding feature checklist card in plain HTML, CSS, and JavaScript with an animated progress bar and completion banner — no library.

Requirements:
- A list of task items, each with a title, a short description, and a circular checkbox indicator, where the checkmark itself is built from two CSS borders forming an L-shape rotated 45 degrees (not an SVG icon or icon font), scaled to zero by default and animated to full scale with a bouncy overshoot easing curve when the item is marked done.
- Clicking anywhere on an item's row (not just its small checkbox) must toggle that item's done state, since a larger click target is more forgiving on both touch and desktop.
- A single function must derive every dependent piece of UI from one count of currently-done items: the numeric counter text (e.g. "3/5"), the progress bar's fill width as a percentage, and whether a completion banner is shown — there must be no separate, independently-maintained state for the bar or the counter.
- The progress bar's fill must be a gradient element whose width transitions smoothly with an ease-out timing function whenever the done count changes, rather than snapping instantly to the new percentage.
- Completed items must visually recede: strike through the title text and mute its color, so attention naturally stays on the remaining unchecked items.
- When the done count reaches the total item count, a celebration banner must slide and fade into view beneath the list; unchecking any item so the count drops below the total must hide that banner again.
- The counter, the progress bar's percentage math, and the completion check must all be computed relative to the actual number of list items rendered, so adding or removing a task from the list requires no other code changes.`,
    },
  },
};

export default featureChecklist;
