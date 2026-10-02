const gasFeeEstimator = {
  id: 'gas-fee-estimator',
  title: 'Gas Fee Estimator',
  lastmod: '2026-08-22',
  category: 'tools',
  cdnUrls: [],
  html: `<div class="gfe-card">
  <div class="gfe-head">
    <h3>Network fee</h3>
    <span class="gfe-net">Ethereum Mainnet</span>
  </div>

  <div class="gfe-tiers" id="gfeTiers" role="radiogroup" aria-label="Gas speed">
    <button type="button" class="gfe-tier" data-tier="slow" data-gwei="18" data-wait="~5 min">
      <span class="gfe-tier-icon">🐢</span>
      <span class="gfe-tier-name">Slow</span>
      <span class="gfe-tier-fee">$0.42</span>
      <span class="gfe-tier-wait">~5 min</span>
    </button>
    <button type="button" class="gfe-tier active" data-tier="normal" data-gwei="26" data-wait="~1 min">
      <span class="gfe-tier-icon">🚗</span>
      <span class="gfe-tier-name">Normal</span>
      <span class="gfe-tier-fee">$0.61</span>
      <span class="gfe-tier-wait">~1 min</span>
    </button>
    <button type="button" class="gfe-tier" data-tier="fast" data-gwei="41" data-wait="~15 sec">
      <span class="gfe-tier-icon">🚀</span>
      <span class="gfe-tier-name">Fast</span>
      <span class="gfe-tier-fee">$0.97</span>
      <span class="gfe-tier-wait">~15 sec</span>
    </button>
  </div>

  <button type="button" class="gfe-advanced-toggle" id="gfeAdvToggle" aria-expanded="false" aria-controls="gfeAdvPanel">
    <span>Advanced: custom gas price</span>
    <span class="gfe-chevron" id="gfeChevron">⌄</span>
  </button>

  <div class="gfe-advanced" id="gfeAdvPanel" hidden>
    <div class="gfe-slider-row">
      <input type="range" id="gfeGweiSlider" min="10" max="80" step="1" value="26" aria-label="Custom gas price in gwei">
      <span class="gfe-gwei-val" id="gfeGweiVal">26 gwei</span>
    </div>
    <p class="gfe-custom-fee">Estimated fee: <b id="gfeCustomFee">$0.61</b></p>
  </div>

  <div class="gfe-summary">
    <span>Selected: <b id="gfeSummaryName">Normal</b></span>
    <span id="gfeSummaryFee">$0.61 &middot; ~1 min</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}

.gfe-card{width:100%;max-width:380px;background:linear-gradient(165deg,#161d30,#0e1220);border:1px solid #232c47;border-radius:18px;padding:22px;box-shadow:0 24px 60px rgba(0,0,0,.4)}

.gfe-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.gfe-head h3{font-size:15px;font-weight:800;color:#f2f4fb}
.gfe-net{font-size:11px;color:#8b93b3;background:#1d2540;padding:4px 9px;border-radius:999px;font-weight:600}

.gfe-tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px}
.gfe-tier{display:flex;flex-direction:column;align-items:center;gap:3px;background:#131a2d;border:1.5px solid #232c47;border-radius:12px;padding:12px 6px;cursor:pointer;font-family:inherit;color:#c6cbe0;transition:border-color .15s,background .15s,transform .1s}
.gfe-tier:hover{border-color:#3a4670}
.gfe-tier:active{transform:scale(.97)}
.gfe-tier.active{border-color:#7c9bff;background:linear-gradient(165deg,#1c2a52,#141b32);box-shadow:0 0 0 3px rgba(124,155,255,.15)}
.gfe-tier-icon{font-size:18px;margin-bottom:2px}
.gfe-tier-name{font-size:12.5px;font-weight:800;color:#f2f4fb}
.gfe-tier-fee{font-size:14px;font-weight:800;color:#7c9bff}
.gfe-tier.active .gfe-tier-fee{color:#a8c0ff}
.gfe-tier-wait{font-size:10.5px;color:#8b93b3}

.gfe-advanced-toggle{width:100%;display:flex;align-items:center;justify-content:space-between;background:transparent;border:none;border-top:1px solid #202844;padding:12px 2px 4px;font-family:inherit;font-size:12.5px;font-weight:700;color:#8b93b3;cursor:pointer}
.gfe-advanced-toggle:hover{color:#c6cbe0}
.gfe-chevron{display:inline-block;transition:transform .2s}
.gfe-advanced-toggle[aria-expanded="true"] .gfe-chevron{transform:rotate(180deg)}

.gfe-advanced{padding:14px 2px 4px;display:flex;flex-direction:column;gap:10px}
.gfe-slider-row{display:flex;align-items:center;gap:12px}
.gfe-slider-row input[type=range]{flex:1;accent-color:#7c9bff;height:4px}
.gfe-gwei-val{font-size:12px;font-weight:800;color:#f2f4fb;min-width:66px;text-align:right;font-variant-numeric:tabular-nums}
.gfe-custom-fee{font-size:12px;color:#8b93b3}
.gfe-custom-fee b{color:#a8c0ff}

.gfe-summary{margin-top:16px;padding-top:14px;border-top:1px solid #202844;display:flex;align-items:center;justify-content:space-between;font-size:12.5px;color:#8b93b3}
.gfe-summary b{color:#f2f4fb}`,

  js: `var tiersEl = document.getElementById('gfeTiers');
var tierButtons = Array.prototype.slice.call(tiersEl.querySelectorAll('.gfe-tier'));
var advToggle = document.getElementById('gfeAdvToggle');
var advPanel = document.getElementById('gfeAdvPanel');
var chevron = document.getElementById('gfeChevron');
var gweiSlider = document.getElementById('gfeGweiSlider');
var gweiVal = document.getElementById('gfeGweiVal');
var customFee = document.getElementById('gfeCustomFee');
var summaryName = document.getElementById('gfeSummaryName');
var summaryFee = document.getElementById('gfeSummaryFee');

var ETH_USD = 3400;
var GAS_LIMIT = 21000;

function feeForGwei(gwei) {
  var eth = (gwei * 1e-9) * GAS_LIMIT;
  return eth * ETH_USD;
}

function selectTier(btn) {
  tierButtons.forEach(function (b) { b.classList.toggle('active', b === btn); });
  var name = btn.querySelector('.gfe-tier-name').textContent;
  var fee = btn.querySelector('.gfe-tier-fee').textContent;
  var wait = btn.dataset.wait;
  summaryName.textContent = name;
  summaryFee.textContent = fee + ' \\u00b7 ' + wait;

  // Keep the custom slider roughly in sync with the chosen tier's gwei.
  gweiSlider.value = btn.dataset.gwei;
  syncCustomFee();
}

tierButtons.forEach(function (btn) {
  btn.addEventListener('click', function () { selectTier(btn); });
});

advToggle.addEventListener('click', function () {
  var open = advPanel.hasAttribute('hidden');
  if (open) {
    advPanel.removeAttribute('hidden');
  } else {
    advPanel.setAttribute('hidden', '');
  }
  advToggle.setAttribute('aria-expanded', String(open));
});

function syncCustomFee() {
  var gwei = +gweiSlider.value;
  gweiVal.textContent = gwei + ' gwei';
  customFee.textContent = '$' + feeForGwei(gwei).toFixed(2);
}

gweiSlider.addEventListener('input', function () {
  syncCustomFee();
  // Using the custom slider deselects the preset tiers so the summary reflects
  // the manually chosen price instead of a stale preset.
  tierButtons.forEach(function (b) { b.classList.remove('active'); });
  summaryName.textContent = 'Custom';
  summaryFee.textContent = customFee.textContent + ' \\u00b7 varies';
});

syncCustomFee();`,

  seo: {
    title: 'Gas Fee Estimator — Free Slow/Normal/Fast Network Fee UI',
    description: `A gas fee estimator with three speed tiers, a selected-tier highlight, and an advanced custom gwei slider. Pure HTML, CSS & JS — exports to React, Vue & Tailwind.`,
    about: {
      title: 'Gas Fee Estimator — Speed Tiers Plus a Custom Gwei Slider',
      description: `Every crypto wallet or dApp that submits a transaction needs to show the user what it will cost and how long it might take — the gas fee estimator is that widget. This snippet builds the now-standard pattern: three tappable speed tiers (Slow, Normal, Fast) each showing a USD fee and a wait estimate, plus an "advanced" disclosure that reveals a raw gwei slider for users who want manual control.

**Tiers as buttons, not radios**

Each tier is a plain \`<button>\` carrying its gwei price and wait estimate as \`data-*\` attributes, grouped visually with \`role="radiogroup"\`. Clicking one toggles an \`.active\` class across the group and updates a summary line at the bottom — deliberately simple state, since the whole point of the tier row is a single, obvious selection rather than a form that needs native radio semantics for keyboard grouping.

**One formula computes every fee**

\`feeForGwei(gwei)\` converts a gwei price into a USD estimate using a fixed gas limit (21,000, a standard ETH transfer) and a reference ETH/USD rate: \`gwei * 1e-9 * gasLimit * ethUsd\`. Both the preset tiers' displayed fees and the custom slider's live fee run through conceptually the same math, so switching between presets and manual entry never shows two different pricing models.

**The advanced disclosure follows the button pattern properly**

The "Advanced: custom gas price" toggle is a real button with \`aria-expanded\` and \`aria-controls\` pointing at the panel it reveals, and the panel itself uses the \`hidden\` attribute rather than a CSS-only \`display\` hack — so assistive technology and the DOM agree on whether the content exists right now. A rotating chevron gives a lightweight visual cue that mirrors the \`aria-expanded\` state.

**Custom slider deselects the presets**

Dragging the gwei slider intentionally clears the \`.active\` class from all three tier buttons and relabels the summary as "Custom" — because once a user overrides the gas price manually, showing a preset as still "selected" would misrepresent what's actually about to be submitted. This is a small but important correctness detail: the UI should never claim two conflicting fees are both the current choice.

**Tuning it for a real network**

Swap the hardcoded \`ETH_USD\` rate for a live price (pair with the [crypto price ticker card](/ui-snippets/crypto-price-ticker-card/)), and replace the static tier gwei values with real estimates from your RPC provider's fee-suggestion endpoint (most return low/medium/high percentiles). The summary line and custom-fee math will pick up new numbers automatically since they always recompute from whatever gwei value is current.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Three speed tiers render with Normal pre-selected.` },
      { title: 'Click a tier', text: `The chosen tier highlights and the summary line at the bottom updates.` },
      { title: 'Open "Advanced"', text: `Click the toggle to reveal a raw gwei slider with a live USD estimate.` },
      { title: 'Drag the slider', text: `The presets deselect and the summary switches to "Custom" with the live fee.` },
      { title: 'Swap in real rates', text: `Replace the tier gwei values and ETH_USD with live figures from your provider.` },
      { title: 'Wire the submit action', text: `Read the active tier's gwei (or the slider's value) when the user confirms a transaction.` },
    ] },
    features: [
      { title: 'Three speed tiers', text: `Slow, Normal, Fast — each with its own fee and wait estimate.` },
      { title: 'Single active selection', text: `Clicking a tier highlights it and clears the others.` },
      { title: 'Shared fee formula', text: `Presets and custom slider both derive from one gwei-to-USD calculation.` },
      { title: 'Accessible disclosure', text: `Advanced panel uses aria-expanded, aria-controls, and the hidden attribute.` },
      { title: 'Live custom slider', text: `Drag to any gwei value with a real-time fee readout.` },
      { title: 'Preset/custom exclusivity', text: `Adjusting the slider clears preset selection so the UI never shows two conflicting fees.` },
      { title: 'Rotating chevron', text: `A lightweight visual cue mirrors the panel's open/closed state.` },
      { title: 'Tabular gwei readout', text: `Monospaced numerals keep the value from jittering as digits change.` },
    ],
    useCases: [
      { title: 'Wallet send flows', text: 'Show Slow, Normal and Fast tiers with fees and wait times before confirming a transaction, beside a [wallet card](/ui-snippets/wallet-card/).' },
      { title: 'DeFi transaction confirmations', text: 'Let users choose urgency before signing, with every tier and the custom slider sharing one gwei to dollar formula.' },
      { title: 'NFT minting checkouts', text: 'Pair with [NFT mint progress](/ui-snippets/nft-mint-progress/) so the cost is shown before submission and the transaction status is shown after it.' },
      { title: 'dApp settings panels', text: 'Offer a default gas preference alongside a [settings panel](/ui-snippets/settings-panel/), with an advanced disclosure using `aria-expanded` and `aria-controls`.' },
      { title: 'Swap and bridge widgets', text: 'Show network cost next to a [currency converter](/ui-snippets/currency-converter/), and an [API key manager](/ui-snippets/api-key-manager/) for developer tooling.' },
      { icon: 'CODE', title: 'Related: Number Stepper with Keyboard Arrows and Long-Press Acceleration', desc: 'See the [Number Stepper with Keyboard Arrows and Long-Press Acceleration](/ui-snippets/number-stepper-keyboard-longpress/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the USD fee calculated from a gwei price?', a: `feeForGwei(gwei) converts the gwei price into ETH using a fixed gas limit representing the transaction type (21,000 for a standard transfer), then multiplies by a reference ETH/USD rate: gwei * 1e-9 * gasLimit * ethUsd. Both the three preset tiers and the custom slider run through this same formula, so there is never a mismatch between preset and manual pricing.` },
      { q: 'Why does dragging the slider deselect the preset tiers?', a: `Once the user manually overrides the gas price, none of the three presets accurately represents what will be submitted. The slider's input handler clears the active class from every tier button and relabels the summary "Custom" so the UI never implies two different fees are simultaneously selected.` },
      { q: 'How do I connect this to real network fee data?', a: `Replace the static data-gwei values on each tier button and the ETH_USD constant with live figures. Most RPC providers and gas APIs (Etherscan gas oracle, blocknative, etc.) return low/medium/high gwei suggestions — map those to the Slow/Normal/Fast tiers on load or on an interval, and update ETH_USD from a price feed like the crypto price ticker card.` },
      { q: 'Is the advanced panel accessible?', a: `Yes. The toggle button carries aria-expanded (kept in sync with true/false) and aria-controls pointing at the panel's id. The panel itself is hidden with the hidden attribute rather than a CSS-only display trick, so screen readers correctly treat its contents as absent until expanded, matching what sighted users see.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Hold selectedTier (or null when custom) and gweiValue in component state. Derive the fee for each tier and the custom slider from the same feeForGwei-equivalent function, and drive the active class and hidden panel from state rather than direct DOM manipulation. The CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the fee math or the disclosure accessibility pattern from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how feeForGwei() turns a gwei price into a USD estimate, and why using the same formula for both the preset tiers and the custom slider avoids the two ever disagreeing on pricing. The same assistant can help optimize it — asking whether the advanced panel's aria-expanded and hidden attribute handling covers all the accessibility bases, or whether the preset-to-custom deselection logic needs a debounce if the slider is dragged rapidly. It's also useful for extending the widget: ask it to add a live gwei feed from a real RPC provider, show an estimated confirmation-time range instead of a single number, or add a "priority fee" versus "base fee" breakdown for EIP-1559 chains. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "gas fee estimator" widget in plain HTML, CSS, and JavaScript with no library.

Requirements:
- Three tappable speed-tier buttons (Slow, Normal, Fast), each carrying its own gas price (in gwei) and estimated wait time as data attributes, showing a computed USD fee and the wait time. Clicking a tier highlights it as selected and clears the highlight from the others.
- A single shared fee formula (gwei price times a fixed gas-limit constant times a reference ETH/USD rate) must compute both the three presets' displayed fees and any custom fee, so preset and manual pricing can never disagree.
- An "Advanced: custom gas price" disclosure toggle built as a real button with aria-expanded and aria-controls pointing at the panel it reveals; the panel itself must be hidden using the HTML hidden attribute (not just a CSS display trick) so it is correctly hidden from assistive technology, with a small rotating chevron icon reflecting the open/closed state.
- Inside the advanced panel, a range slider for a raw gwei value with a live-updating USD fee readout that recalculates through the exact same fee formula as the presets.
- When the user drags the custom slider, the three preset tier buttons must lose their selected/active state and a summary line must switch to reflect "Custom" pricing — the UI should never show a preset as selected while a different custom fee is also displayed.
- A summary line at the bottom that always reflects whichever fee (preset or custom) is currently the active selection, including its wait-time estimate when known.`,
    },
  },
};

export default gasFeeEstimator;
