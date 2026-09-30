const subscriptionTierStackRecommended = {
  id: 'subscription-tier-stack-recommended',
  title: 'Subscription Tier Card Stack — Recommended Highlight',
  lastmod: '2026-08-27',
  category: 'cards',
  html: `<div class="demo">
  <div class="stack" id="stack">
    <label class="tier-card" data-tier="starter">
      <input type="radio" name="tier" value="starter" class="tier-radio" />
      <div class="tier-top">
        <span class="tier-name">Starter</span>
        <span class="tier-price">$9<small>/mo</small></span>
      </div>
      <p class="tier-desc">For solo builders getting started</p>
      <ul class="tier-feats">
        <li>3 projects</li>
        <li>1 GB storage</li>
        <li>Community support</li>
      </ul>
      <span class="pick-indicator">Select</span>
    </label>

    <label class="tier-card recommended" data-tier="growth">
      <input type="radio" name="tier" value="growth" class="tier-radio" checked />
      <span class="rec-ribbon">Recommended</span>
      <div class="tier-top">
        <span class="tier-name">Growth</span>
        <span class="tier-price">$29<small>/mo</small></span>
      </div>
      <p class="tier-desc">For growing teams that need more room</p>
      <ul class="tier-feats">
        <li>Unlimited projects</li>
        <li>50 GB storage</li>
        <li>Priority support</li>
        <li>Team collaboration</li>
      </ul>
      <span class="pick-indicator">Select</span>
    </label>

    <label class="tier-card" data-tier="scale">
      <input type="radio" name="tier" value="scale" class="tier-radio" />
      <div class="tier-top">
        <span class="tier-name">Scale</span>
        <span class="tier-price">$79<small>/mo</small></span>
      </div>
      <p class="tier-desc">For organizations with advanced needs</p>
      <ul class="tier-feats">
        <li>Unlimited everything</li>
        <li>500 GB storage</li>
        <li>Dedicated support</li>
        <li>SSO &amp; audit logs</li>
      </ul>
      <span class="pick-indicator">Select</span>
    </label>
  </div>
  <p class="picked-line">Selected plan: <strong id="pickedLabel">Growth — $29/mo</strong></p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { display: flex; flex-direction: column; align-items: center; gap: 18px; }

.stack { display: flex; gap: 16px; }
.tier-card { position: relative; width: 190px; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 22px 18px 18px; display: flex; flex-direction: column; gap: 14px; cursor: pointer; transition: border-color 0.18s, transform 0.18s, box-shadow 0.18s; }
.tier-card:hover { border-color: #c7d2fe; transform: translateY(-2px); }
.tier-radio { position: absolute; opacity: 0; pointer-events: none; }

.tier-card.recommended { border-color: #6366f1; box-shadow: 0 10px 28px rgba(99,102,241,0.16); transform: translateY(-8px) scale(1.03); z-index: 1; }
.tier-card.recommended:hover { transform: translateY(-10px) scale(1.03); }

.rec-ribbon { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); background: #6366f1; color: #fff; font-size: 10px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; padding: 4px 12px; border-radius: 999px; box-shadow: 0 4px 10px rgba(99,102,241,0.35); }

.tier-top { display: flex; flex-direction: column; gap: 2px; }
.tier-name { font-size: 13px; font-weight: 700; color: #64748b; }
.tier-price { font-size: 24px; font-weight: 800; color: #111827; }
.tier-price small { font-size: 12px; font-weight: 600; color: #94a3b8; }

.tier-desc { font-size: 11.5px; color: #94a3b8; line-height: 1.4; min-height: 30px; }

.tier-feats { list-style: none; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.tier-feats li { font-size: 12px; font-weight: 600; color: #334155; padding-left: 18px; position: relative; }
.tier-feats li::before { content: '✓'; position: absolute; left: 0; color: #6366f1; font-weight: 800; }

.pick-indicator { text-align: center; font-size: 12px; font-weight: 700; color: #6366f1; border: 1.5px solid #e0e7ff; border-radius: 9px; padding: 8px; transition: background 0.15s, color 0.15s, border-color 0.15s; }
.tier-radio:checked ~ .pick-indicator { background: #4f46e5; color: #fff; border-color: #4f46e5; }
.tier-radio:checked ~ .pick-indicator::after { content: ' ✓'; }
.tier-radio:focus-visible ~ .pick-indicator { outline: 2px solid #6366f1; outline-offset: 2px; }

.picked-line { font-size: 13px; color: #475569; }
.picked-line strong { color: #111827; }`,
  js: `const stack = document.getElementById('stack');
const pickedLabel = document.getElementById('pickedLabel');

const labels = {
  starter: 'Starter — $9/mo',
  growth: 'Growth — $29/mo',
  scale: 'Scale — $79/mo',
};

stack.addEventListener('change', (e) => {
  if (e.target.name !== 'tier') return;
  pickedLabel.textContent = labels[e.target.value];
});`,
  seo: {
    title: 'Subscription Tier Card Stack — Radio-Driven Plan Picker with Recommended Highlight',
    description: 'Three plan cards built as a real radio group, with the middle "Recommended" tier visually elevated via scale and shadow — no JavaScript needed for the selection state itself.',
    about: {
      title: 'Subscription Tier Card Stack — A Radio Group That Looks Like a Pricing Table',
      description: `Pricing tier cards are usually built as clickable \`<div>\`s with a JavaScript click handler toggling a "selected" class by hand. This snippet builds the same visual pattern on top of a **real native radio group** instead — three \`<label>\` elements, each wrapping a hidden \`<input type="radio" name="tier">\`, so the browser's own radio semantics (mutual exclusivity, keyboard operability, form submission) do all of the selection-state work, and the only JavaScript left is a single \`change\` listener that updates a summary line.

**The whole card is the label, the input just tracks state**

Each \`.tier-card\` *is* a \`<label>\`, and the radio input sits inside it, visually hidden via \`opacity: 0\` but still present and focusable. Clicking anywhere on the card — the price, the feature list, the "Select" pill — toggles that card's radio because native \`<label>\`-wrapping makes the entire element a valid click target for its child input, with zero click-handler code required for the selection mechanic itself.

**How the "Select" pill reflects checked state without JS**

\`.pick-indicator\` is a plain sibling \`<span>\` styled through \`.tier-radio:checked ~ .pick-indicator\` — when the radio becomes checked, this sibling selector switches the pill's background to solid indigo and appends a checkmark via \`content: ' ✓'\` on a \`::after\`. Because this is pure CSS state, it works correctly even before any JavaScript has loaded or if JavaScript fails entirely — the radio group is a genuinely functional (if visually plain) form control on its own.

**Why the recommended card is elevated, not just colored differently**

The middle "Growth" card gets a combined \`transform: translateY(-8px) scale(1.03)\` plus a colored border and drop shadow, physically lifting it above its neighbors in the stack — a much stronger visual signal than color alone, especially useful for readers with color vision deficiencies who might not register a colored border as strongly as a person with typical color vision would. A small \`.rec-ribbon\` badge floats above the card's top edge for an explicit, unambiguous "Recommended" label alongside the visual elevation.

**What the JavaScript actually does**

The only script in this snippet listens for the group's \`change\` event and writes a plain-language summary ("Selected plan: Growth — $29/mo") to the page — a good stand-in for updating a checkout total, an order summary sidebar, or a "Continue" button's label elsewhere on a real pricing or upgrade page.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Keep all three inputs sharing name="tier"', text: 'The shared name attribute is what makes the three cards mutually exclusive as a native radio group.' },
        { title: 'Move the .recommended class and rec-ribbon to any card', text: 'Both are independent of which radio is checked by default — you can highlight a different tier than the one pre-selected.' },
        { title: 'Add or remove feature <li> items freely', text: 'Each card\'s .tier-feats list is independent; keep counts roughly aligned for a cleaner visual comparison.' },
        { title: 'Update the labels map in the JS panel', text: 'The labels object maps each radio\'s value to the summary text shown after selection — keep it in sync with your card prices.' },
        { title: 'Read the selection on form submit', text: 'Because these are real radios, wrap the stack in a <form> and read FormData\'s "tier" value directly — no custom state management needed.' },
      ],
    },
    features: [
      'Built on a native radio group — mutual exclusivity, keyboard support and form submission all work with zero custom JS',
      'Whole-card clickability via label-wrapping, no manual click handlers for the selection mechanic',
      'Recommended tier visually elevated with combined transform (translateY + scale) plus shadow, not color alone',
      'Floating "Recommended" ribbon badge for an unambiguous text label alongside the visual emphasis',
      ':checked ~ sibling selector drives the Select pill\'s solid/checkmark state purely in CSS',
      ':focus-visible ring on the hidden radio styled onto its label for full keyboard accessibility',
      'Minimal JavaScript — one change listener updates a plain-language selection summary',
      'Works as a real submittable form field out of the box if wrapped in a <form>',
    ],
    useCases: [
      { icon: 'SAAS', title: 'SaaS Signup / Upgrade Flows', desc: 'Let a user pick a plan as a real form field before continuing to a checkout or account-upgrade step.' },
      { icon: 'PRICING', title: 'Marketing Pricing Pages', desc: 'A three-tier pricing section with a clear default recommendation, submittable directly into a signup form.' },
      { icon: 'ONBOARD', title: 'Onboarding Plan Selection Step', desc: 'One step of a multi-step onboarding wizard where selecting a tier advances the flow.' },
      { icon: 'AB', title: 'A/B Testing Which Tier to Recommend', desc: 'Swap the .recommended class between cards to test which default recommendation converts best.' },
    ],
    faqs: [
      { q: 'Does clicking anywhere on the card select it, or only the Select pill?', a: 'The entire card is a <label> wrapping the hidden radio input, so clicking anywhere inside it — the price, the feature list, or the pill — toggles the selection via native label-to-input association.' },
      { q: 'Why radios instead of just styled buttons with a JavaScript click handler?', a: 'Radios give you correct mutual exclusivity, keyboard operability (Tab plus arrow keys within the group), and native form submission for free, and remain functional even if the page\'s JavaScript fails to load — a button-based version would need to reimplement all of that by hand.' },
      { q: 'How do I make the middle card recommended by default without changing which one is visually elevated?', a: 'The pre-selected radio (checked attribute) and the .recommended styling class are independent — you can pre-check one card while visually elevating a different one, though keeping them aligned is the more common and less confusing pattern.' },
      { q: 'Can I read the selected tier from a real form submission?', a: 'Yes — wrap the .stack element in a <form> and submit it normally; a FormData read or a standard POST will include the tier field with whichever radio\'s value is checked, exactly like any other native radio group.' },
      { q: 'How does the pill\'s checkmark appear without JavaScript?', a: 'The .tier-radio:checked ~ .pick-indicator CSS selector switches the pill\'s background, text color, and adds a checkmark via a ::after pseudo-element the moment the radio becomes checked — purely a CSS sibling-selector reaction with no script involved.' },
      { q: 'What does the JavaScript in this snippet actually control?', a: 'Only the plain-text "Selected plan: …" summary line beneath the cards — the visual selection state of the cards themselves is handled entirely by CSS reacting to the native radio\'s :checked state.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why building the selected-tier state on a native radio group is more robust than a JavaScript-managed "selected" class, and what specifically would break (keyboard navigation, form submission, no-JS fallback) if the cards were plain divs with a click handler instead. It's also worth asking for a version with a monthly/annual billing toggle that updates all three prices simultaneously, or one that supports four or more tiers in a horizontally scrollable row.`,
      prompt: `Build a three-tier subscription plan picker in HTML, CSS and vanilla JavaScript where the middle tier is visually highlighted as "Recommended" — no external libraries.

Requirements:
- Implement the three plan cards as <label> elements each wrapping a hidden <input type="radio"> sharing the same name attribute, so selection is a real, native, mutually-exclusive radio group requiring no custom JavaScript for the selection mechanic itself.
- The entire card area (price, description, feature list) must be clickable to select that plan, relying on native label-to-input association rather than a manual click listener.
- Visually elevate the "Recommended" card above its neighbors using a combination of a transform (e.g. slight scale and upward translation) and an accent border/shadow, plus a floating ribbon badge with the word "Recommended" — not color alone.
- Use a CSS :checked sibling selector to switch a "Select" indicator pill to a solid, checkmarked state on whichever card is currently selected, with no JavaScript involved in that particular visual change.
- Give the hidden radio input a visible :focus-visible outline styled onto its label sibling for keyboard accessibility.
- Add one small JavaScript listener that responds to the group's change event and displays a plain-language summary of the currently selected plan and price elsewhere on the page.`,
    },
  },
};

export default subscriptionTierStackRecommended;
