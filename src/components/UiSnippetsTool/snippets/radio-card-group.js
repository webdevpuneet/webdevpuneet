const radioCardGroup = {
  id: 'radio-card-group',
  title: 'Radio Card Group',
  lastmod: '2026-06-22',
  category: 'forms',
  html: `<form class="rcg-card" id="rcgForm">
  <h3>Choose your plan</h3>
  <p class="rcg-sub">Switch or cancel anytime.</p>

  <div class="rcg-group" id="rcgGroup" role="radiogroup" aria-label="Plan">
    <label class="rcg-option">
      <input type="radio" name="plan" value="starter">
      <span class="rcg-box">
        <span class="rcg-top">
          <span class="rcg-name">Starter</span>
          <span class="rcg-price">$0<small>/mo</small></span>
        </span>
        <span class="rcg-desc">For individuals trying things out.</span>
        <span class="rcg-tick" aria-hidden="true"></span>
      </span>
    </label>

    <label class="rcg-option">
      <input type="radio" name="plan" value="pro" checked>
      <span class="rcg-box">
        <span class="rcg-flag">Most popular</span>
        <span class="rcg-top">
          <span class="rcg-name">Pro</span>
          <span class="rcg-price">$19<small>/mo</small></span>
        </span>
        <span class="rcg-desc">For professionals who need more power.</span>
        <span class="rcg-tick" aria-hidden="true"></span>
      </span>
    </label>

    <label class="rcg-option">
      <input type="radio" name="plan" value="team">
      <span class="rcg-box">
        <span class="rcg-top">
          <span class="rcg-name">Team</span>
          <span class="rcg-price">$49<small>/mo</small></span>
        </span>
        <span class="rcg-desc">For teams collaborating together.</span>
        <span class="rcg-tick" aria-hidden="true"></span>
      </span>
    </label>
  </div>

  <button type="submit" class="rcg-submit">Continue with <b id="rcgChosen">Pro</b></button>
</form>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:40px 24px}

.rcg-card{background:#fff;border-radius:16px;padding:24px;width:100%;max-width:400px;box-shadow:0 18px 44px rgba(15,23,42,.1)}
.rcg-card h3{font-size:17px;font-weight:800;color:#0f172a}
.rcg-sub{font-size:12.5px;color:#94a3b8;margin:3px 0 16px}

.rcg-group{display:flex;flex-direction:column;gap:10px;margin-bottom:18px}
.rcg-option{display:block;cursor:pointer}
.rcg-option input{position:absolute;opacity:0;width:0;height:0}

.rcg-box{position:relative;display:block;border:1.5px solid #e2e8f0;border-radius:12px;padding:14px 15px;transition:border-color .15s,box-shadow .15s,background .15s}
.rcg-option:hover .rcg-box{border-color:#cbd5e1}
.rcg-option input:checked + .rcg-box{border-color:#6366f1;background:#f5f3ff;box-shadow:0 0 0 3px rgba(99,102,241,.12)}
.rcg-option input:focus-visible + .rcg-box{box-shadow:0 0 0 3px rgba(99,102,241,.35)}

.rcg-flag{position:absolute;top:-9px;right:14px;background:#6366f1;color:#fff;font-size:10px;font-weight:800;padding:3px 9px;border-radius:999px;text-transform:uppercase;letter-spacing:.03em}
/* Reserve room on the right of the title row so the price never sits under the tick */
.rcg-top{display:flex;align-items:baseline;justify-content:space-between;gap:10px;padding-right:28px;margin-bottom:4px}
.rcg-name{font-size:14.5px;font-weight:800;color:#0f172a}
.rcg-price{font-size:16px;font-weight:800;color:#0f172a}
.rcg-price small{font-size:11px;font-weight:600;color:#94a3b8}
.rcg-desc{font-size:12px;color:#64748b;line-height:1.4;display:block}

.rcg-tick{position:absolute;top:14px;right:15px;width:20px;height:20px;border-radius:50%;border:2px solid #cbd5e1;transition:border-color .15s,background .15s}
.rcg-option input:checked + .rcg-box .rcg-tick{border-color:#6366f1;background:#6366f1}
.rcg-option input:checked + .rcg-box .rcg-tick::after{content:'';position:absolute;top:4px;left:4px;width:8px;height:8px;border-radius:50%;background:#fff}
/* When a plan has the popular flag, nudge the tick down so they don't overlap */
.rcg-flag ~ .rcg-tick{top:16px}

.rcg-submit{width:100%;background:#6366f1;color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;transition:background .15s}
.rcg-submit:hover{background:#4f46e5}
.rcg-submit b{font-weight:800}`,

  js: `var PLANS = {
  starter: 'Starter',
  pro: 'Pro',
  team: 'Team',
};

var form = document.getElementById('rcgForm');
var chosen = document.getElementById('rcgChosen');

function sync() {
  var sel = form.querySelector('input[name="plan"]:checked');
  if (sel) chosen.textContent = PLANS[sel.value];
}

form.addEventListener('change', function (e) {
  if (e.target.name === 'plan') sync();
});

// Keyboard arrow keys move between options natively because they share a radio name;
// this just keeps the submit label in sync.
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var sel = form.querySelector('input[name="plan"]:checked');
  // Proceed with sel.value (e.g. start checkout for that plan).
  var btn = form.querySelector('.rcg-submit');
  btn.textContent = '✓ ' + PLANS[sel.value] + ' selected';
  setTimeout(function () { btn.innerHTML = 'Continue with <b id="rcgChosen">' + PLANS[sel.value] + '</b>'; }, 1600);
});

sync();`,

  seo: {
    title: 'Radio Card Group — Selectable Option Cards UI',
    description: `An accessible radio-card group for plan or option selection, with checked styling, a popular flag, and keyboard support. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Radio Card Group — Accessible Selectable Cards Built on Native Radios',
      description: `When you need a user to pick exactly one option from a few — a pricing plan, a shipping speed, a payment method — large clickable cards convert far better than a cramped native dropdown, because each choice can show a title, price, description, and badge. This snippet builds that selectable-card pattern the right way: on top of real \`<input type="radio">\` elements, so it stays keyboard-navigable, screen-reader friendly, and form-submittable with zero JavaScript required for the core behavior.

**Real radios under the hood**

Each card is a \`<label>\` wrapping a visually hidden \`<input type="radio">\` and a styled \`.rcg-box\`. Because they're genuine radios sharing one \`name\`, the browser gives you single-selection enforcement, arrow-key navigation between options, focus management, and inclusion in form submission — all for free. The selected styling is driven entirely by the CSS \`:checked\` sibling selector (\`input:checked + .rcg-box\`), which highlights the border, tints the background, and fills the custom radio dot. This is the critical detail: re-implementing radio behavior with \`<div>\`s and JavaScript throws away accessibility that the native element provides automatically.

**Selected state you can't miss**

A chosen card gets a colored border, a soft background tint, a focus-ring-style shadow, and a filled circular indicator in the corner — four redundant signals so the selection is obvious at a glance and never relies on color alone. The \`:focus-visible\` selector adds a stronger ring when a card is reached by keyboard, so keyboard users always see where they are, while mouse users don't get a ring they didn't ask for.

**A "most popular" flag without breaking layout**

One card carries a "Most popular" badge pinned to its top edge — the standard nudge toward a recommended option. A small CSS rule (\`.rcg-flag ~ .rcg-tick\`) nudges the selection indicator down on flagged cards so the badge and the tick never collide, the kind of detail that separates a polished component from one that looks broken on the recommended plan.

**JavaScript only for the nice-to-haves**

The core selection works with no JavaScript at all — that's the point of building on native radios. The small script only powers conveniences: syncing the submit button's label to the chosen plan ("Continue with Pro") and showing a brief confirmation on submit. Strip the script entirely and the cards still select, navigate, and submit correctly, which is exactly the graceful-degradation property you want in a form control.

**Keyboard and screen-reader behavior**

The group is wrapped in \`role="radiogroup"\` with a label, and because the inputs are real radios, arrow keys move the selection, Tab moves into and out of the group as a single stop, and screen readers announce "Pro, radio button, 2 of 3, selected." None of that needs custom key handling — it's the native behavior preserved by not replacing the radios. This is why the radio-card pattern should always be built on inputs, not reconstructed from scratch.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A three-card plan selector renders with Pro pre-selected and marked "Most popular".` },
      { title: 'Click a card', text: `The whole card is clickable — selecting it highlights the border, tints the background, and fills the corner indicator.` },
      { title: 'Use the keyboard', text: `Tab into the group and use Arrow keys to move between plans — native radio behavior, no custom code.` },
      { title: 'Watch the submit label', text: `The button updates to "Continue with [plan]" reflecting the current choice; submitting confirms it briefly.` },
      { title: 'Edit the options', text: `Add or change the option cards in the HTML (and the PLANS map) — each is a label-wrapped radio with your content.` },
      { title: 'Wire up the choice', text: `On submit, read the checked radio's value and proceed — start checkout, save the preference, or advance the flow.` },
    ] },
    features: [
      { title: 'Built on native radio inputs', text: `Real <input type="radio"> elements give single-selection, keyboard nav, and form submission for free.` },
      { title: 'Pure-CSS selected styling', text: `The :checked sibling selector drives all selected visuals — no JavaScript needed for the core behavior.` },
      { title: 'Redundant selection signals', text: `A chosen card shows border, background tint, shadow, and a filled indicator — never relying on color alone.` },
      { title: 'Keyboard focus ring', text: `:focus-visible adds a strong ring for keyboard users without showing one to mouse users.` },
      { title: '"Most popular" badge', text: `A pinned flag nudges toward a recommended option, with a CSS rule preventing it from colliding with the indicator.` },
      { title: 'Whole-card click target', text: `The entire card is the label, so clicking anywhere in it selects the option — a large, forgiving hit area.` },
      { title: 'Graceful degradation', text: `Strip the JavaScript and the cards still select, navigate, and submit — the script only adds label sync and confirmation.` },
      { title: 'Screen-reader friendly', text: `role="radiogroup" plus native radios announce the option, its position, and selected state automatically.` },
    ],
    useCases: [
      { title: 'Pricing and plan selection', text: `Let users choose a subscription tier as large comparable cards — pair with a [pricing toggle](/ui-snippets/pricing-toggle/) for monthly/annual.` },
      { title: 'Checkout options', text: `Pick a shipping speed or payment method as cards, alongside a [promo code input](/ui-snippets/promo-code-input/) and order summary.` },
      { title: 'Onboarding preferences', text: `Have new users select a use case, role, or goal from a few descriptive cards.` },
      { title: 'Survey and quiz answers', text: `Present single-choice questions as cards with more context than a bare radio list.` },
      { title: 'Configurator and product options', text: `Choose a model, size tier, or service level where each option benefits from a title, price, and description.` },
      { title: 'Learning accessible custom controls', text: `A reference for styling native radios without losing accessibility — compare with a [segmented control](/ui-snippets/segmented-control/) for a compact single-choice toggle.` },
    ],
    faqs: [
      { q: 'Why build on radio inputs instead of clickable divs?', a: `Native radios give you single-selection enforcement, arrow-key navigation, focus management, form submission, and correct screen-reader announcements ("2 of 3, selected") automatically. Rebuilding that with divs and JavaScript means re-implementing all of it — and most reimplementations miss keyboard or screen-reader support. Hiding the real radio and styling a sibling keeps every native benefit while giving you full visual control.` },
      { q: 'How do I add or remove options?', a: `Each option is a <label> wrapping an <input type="radio" name="plan" value="..."> and a styled .rcg-box with your title, price, and description. Add or remove these label blocks (and update the PLANS map if you use it for the submit label) — no other code changes, since selection is handled by the shared radio name.` },
      { q: 'How do I make a card the default selection?', a: `Add the checked attribute to that card's radio input (as the Pro card does here). For no default, leave all unchecked — but a sensible default reduces friction and is recommended for plan pickers where one option is the common choice.` },
      { q: 'How do I get the selected value to submit or process?', a: `Read form.querySelector('input[name="plan"]:checked').value, either on the submit event (as shown) or on change for live updates. Because they're real radios inside a form, the value also submits automatically with a normal form POST under the radio's name.` },
      { q: 'How do I use this radio card group in React, Vue, or Angular?', a: `In React, hold the selected value in useState and set each radio's checked={value === opt} with an onChange; in Vue, use v-model on the radio group; in Angular, use formControlName or [(ngModel)]. Keep them as real <input type="radio"> elements so you retain native keyboard and accessibility behavior — only the value binding moves into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to reason through the accessibility tradeoffs here alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the input:checked + .rcg-box sibling selector is what drives all the selected styling instead of a JavaScript class toggle, and what native behaviors (arrow-key navigation, form submission, screen-reader announcements) would be lost if the radios were replaced with plain divs and click handlers. The same assistant can help you optimize it — ask whether the visually-hidden input pattern (position absolute, opacity 0) here has any focus-visible edge cases worth testing across browsers. It's also useful for extending the group: ask it to add a per-card feature comparison list, support a horizontal layout on wide screens instead of stacked cards, or wire the submit handler to a real checkout redirect keyed off the selected plan's value. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a selectable "radio card" group in plain HTML, CSS, and JavaScript, built on real native radio inputs — no custom keyboard handling, no div-based fake radios.

Requirements:
- Each option must be a label element wrapping a visually hidden (not display:none — use position absolute with zero size and opacity 0, so it stays in the accessibility tree and focusable) native input of type radio sharing one name attribute across all options, followed by a styled sibling element containing the card's visible content (a title, a price, and a description).
- All selected-state styling (border color, background tint, box-shadow, and a filled circular indicator) must be driven purely by the CSS :checked sibling combinator on the hidden input — none of it may be set via JavaScript class toggling.
- Add a distinct :focus-visible style on the sibling element so keyboard users see a strong focus ring when tabbing to a card, while mouse clicks do not trigger that same ring.
- One card must display a "Most popular" badge pinned to its top edge, and the layout must ensure that badge never visually overlaps the selected-state indicator circle on that specific card.
- Wrap the group in role="radiogroup" with an accessible label, and confirm that arrow keys move the selection between cards and Tab enters/exits the group as a single stop — purely from using native radio inputs, not custom key handling.
- Add optional JavaScript only for a nice-to-have: keep a submit button's text in sync with the currently selected option's label, and show a brief confirmation state after submit — but the core selection, keyboard navigation, and form submission must all work correctly with that JavaScript removed entirely.`,
    },
  },
};

export default radioCardGroup;
