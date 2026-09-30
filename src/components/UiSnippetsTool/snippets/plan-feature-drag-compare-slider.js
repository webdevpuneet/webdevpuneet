const planFeatureDragCompareSlider = {
  id: 'plan-feature-drag-compare-slider',
  title: 'Plan Comparison Slider — Drag to Reveal Basic vs Pro Features',
  lastmod: '2026-08-27',
  category: 'pricing',
  html: `<div class="demo">
  <div class="compare" id="compare">
    <div class="side side-a">
      <span class="side-label">Basic</span>
      <ul class="feat-list">
        <li>5 projects</li>
        <li>2 team seats</li>
        <li>Community support</li>
        <li>1 GB storage</li>
        <li>Basic analytics</li>
        <li class="muted">✕ Priority support</li>
        <li class="muted">✕ Custom domains</li>
        <li class="muted">✕ Audit logs</li>
      </ul>
    </div>
    <div class="side side-b">
      <span class="side-label">Pro</span>
      <ul class="feat-list">
        <li>Unlimited projects</li>
        <li>Unlimited seats</li>
        <li>Priority support</li>
        <li>100 GB storage</li>
        <li>Advanced analytics</li>
        <li>✓ Priority support</li>
        <li>✓ Custom domains</li>
        <li>✓ Audit logs</li>
      </ul>
    </div>
    <div class="handle" id="handle" role="slider" tabindex="0" aria-label="Compare Basic and Pro plans" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
      <div class="handle-line"></div>
      <div class="handle-grip">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M8 6 3 12l5 6M16 6l5 6-5 6"/></svg>
      </div>
    </div>
    <div class="tag tag-a">BASIC</div>
    <div class="tag tag-b">PRO</div>
  </div>
  <p class="hint">Drag the handle, or use ← → keys when focused</p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { display: flex; flex-direction: column; align-items: center; gap: 14px; }

.compare { position: relative; width: 460px; max-width: 100%; height: 340px; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 8px 24px rgba(15,23,42,0.06); user-select: none; }

.side { position: absolute; inset: 0; padding: 46px 24px 24px; }
.side-a { background: #f1f5f9; }
.side-b { background: #0f172a; clip-path: inset(0 0 0 50%); transition: clip-path 0.05s linear; }
.side-b .feat-list li { color: #cbd5e1; }
.side-b .feat-list li::before { color: #34d399; }
.side-b .side-label { color: #f1f5f9; }

.side-label { display: block; font-size: 13px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #334155; margin-bottom: 16px; }

.feat-list { list-style: none; display: flex; flex-direction: column; gap: 11px; }
.feat-list li { font-size: 13.5px; font-weight: 600; color: #334155; padding-left: 22px; position: relative; }
.feat-list li::before { content: '✓'; position: absolute; left: 0; color: #059669; font-weight: 800; }
.feat-list li.muted { color: #94a3b8; }
.feat-list li.muted::before { content: '✕'; color: #cbd5e1; }

.handle { position: absolute; top: 0; bottom: 0; left: 50%; width: 40px; margin-left: -20px; display: flex; align-items: center; justify-content: center; cursor: ew-resize; touch-action: none; }
.handle-line { position: absolute; top: 0; bottom: 0; left: 50%; width: 2px; background: rgba(255,255,255,0.9); box-shadow: 0 0 0 1px rgba(15,23,42,0.15); transform: translateX(-1px); }
.handle-grip { position: relative; width: 34px; height: 34px; border-radius: 50%; background: #fff; color: #0f172a; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(15,23,42,0.25); transition: transform 0.15s ease; }
.handle:hover .handle-grip, .handle:focus-visible .handle-grip { transform: scale(1.08); }
.handle:focus-visible { outline: none; }
.handle:focus-visible .handle-grip { box-shadow: 0 0 0 3px #6366f1, 0 4px 14px rgba(15,23,42,0.25); }

.tag { position: absolute; top: 16px; font-size: 10.5px; font-weight: 800; letter-spacing: 0.08em; padding: 4px 9px; border-radius: 6px; pointer-events: none; }
.tag-a { left: 24px; background: #e2e8f0; color: #475569; }
.tag-b { right: 24px; background: rgba(255,255,255,0.12); color: #f1f5f9; }

.hint { font-size: 12px; color: #94a3b8; }`,
  js: `const compare = document.getElementById('compare');
const handle = document.getElementById('handle');
const sideB = compare.querySelector('.side-b');

function setPos(pct) {
  pct = Math.max(4, Math.min(96, pct));
  sideB.style.clipPath = \`inset(0 0 0 \${pct}%)\`;
  handle.style.left = pct + '%';
  handle.setAttribute('aria-valuenow', Math.round(pct));
}

function pctFromClientX(clientX) {
  const rect = compare.getBoundingClientRect();
  return ((clientX - rect.left) / rect.width) * 100;
}

let dragging = false;

handle.addEventListener('pointerdown', (e) => {
  dragging = true;
  handle.setPointerCapture(e.pointerId);
});
handle.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  setPos(pctFromClientX(e.clientX));
});
handle.addEventListener('pointerup', () => { dragging = false; });
handle.addEventListener('pointercancel', () => { dragging = false; });

handle.addEventListener('keydown', (e) => {
  const current = parseFloat(handle.style.left) || 50;
  if (e.key === 'ArrowLeft') { setPos(current - 5); e.preventDefault(); }
  if (e.key === 'ArrowRight') { setPos(current + 5); e.preventDefault(); }
});

setPos(50);`,
  seo: {
    title: 'Plan Comparison Slider — Drag to Reveal Basic vs Pro Plan Features',
    description: 'A draggable split-panel slider that reveals a Pro plan\'s feature list as the handle moves across a Basic plan panel, with keyboard support and a live aria-valuenow.',
    about: {
      title: 'Drag-to-Compare Plan Slider — A Split-Panel Feature Comparison',
      description: `This component borrows the mechanics of a before/after image slider and applies them to a much more common pricing-page need: showing a visitor exactly what changes when they move from a cheaper plan to a more expensive one. Instead of comparing two photos, dragging the handle compares two **feature lists** stacked in the same physical space.

**How the two-layer clip-path works**

The trick is two absolutely positioned \`.side\` panels occupying the exact same box — \`.side-a\` (Basic) sits underneath in normal light styling, and \`.side-b\` (Pro, dark styling) sits on top with \`clip-path: inset(0 0 0 50%)\`. That clip-path hides everything in \`.side-b\` to the left of the 50% mark, letting the Basic panel underneath show through. Dragging the handle simply updates that left-inset percentage in JavaScript — \`inset(0 0 0 \${pct}%)\` — which is why the Pro panel appears to "wipe in" from the right as you drag left, without ever animating the feature list items themselves.

**Why pointer events instead of separate mouse/touch handlers**

The drag logic uses \`pointerdown\`/\`pointermove\`/\`pointerup\` with \`setPointerCapture\`, which unifies mouse, touch, and pen input into one event model and keeps receiving move events even if the cursor leaves the handle's bounding box mid-drag — a common failure mode with plain \`mousemove\` listeners bound only to the handle itself.

**Keyboard accessibility built in from the start**

The handle is a real \`<div role="slider" tabindex="0">\` with \`aria-valuemin\`, \`aria-valuemax\`, and a live \`aria-valuenow\` that updates on every drag or arrow-key press — so a screen reader announces the current comparison position as a percentage, and keyboard users can operate the entire comparison with the \`ArrowLeft\`/\`ArrowRight\` keys alone, with no mouse required at all.

**Where this earns its place over a static comparison table**

Traditional side-by-side pricing tables ask a visitor to scan two columns and mentally diff them row by row. This slider instead makes the *act of comparing* physical and continuous — sliding toward "Pro" viscerally shows more of the upgraded feature set filling the frame, which tends to read as more persuasive on a pricing page than a static checkmark grid, while still degrading gracefully to a readable feature list at either extreme.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Edit the two feature lists', text: 'Update the <li> items inside .side-a and .side-b in the HTML panel to match your own plan tiers.' },
        { title: 'Keep list item counts aligned', text: 'For a clean comparison, keep the same number of <li> rows in both lists so items line up vertically as the handle moves.' },
        { title: 'Adjust the starting position', text: 'Change the 50 passed to setPos(50) at the bottom of the JS panel to start the slider closer to one plan.' },
        { title: 'Restyle the dark Pro panel', text: 'Update the background, text and accent colors on .side-b in the CSS panel to match your brand instead of the default dark theme.' },
        { title: 'Test keyboard operation', text: 'Click the handle to focus it, then press the left and right arrow keys to confirm the slider is fully operable without a mouse.' },
      ],
    },
    features: [
      'Two stacked panels revealed via a live clip-path inset, not a translateX trick, so text never visually shifts',
      'Pointer Events API with setPointerCapture — one code path for mouse, touch and pen input',
      'Draggable handle plus full ArrowLeft/ArrowRight keyboard support',
      'Real role="slider" element with aria-valuemin/max/now kept in sync on every interaction',
      'Clamped range (4%–96%) so the handle never fully hides either plan\'s label',
      'Light Basic panel and dark Pro panel styled independently for clear visual contrast',
      'Static BASIC/PRO corner tags stay legible regardless of handle position',
      'Zero dependencies — pure CSS clip-path plus vanilla JS pointer handling',
    ],
    useCases: [
      { icon: 'SAAS', title: 'SaaS Pricing Pages', desc: 'Let a visitor physically drag between your cheapest and most popular tier to see exactly what upgrading unlocks.' },
      { icon: 'SALES', title: 'Sales Enablement Decks', desc: 'Embed in an interactive one-pager so a rep can demo the value gap between tiers live on a call.' },
      { icon: 'ONBOARD', title: 'In-App Upgrade Prompts', desc: 'Show a free-tier user a compelling side-by-side of what a paid upgrade adds, right where they hit a limit.' },
      { icon: 'AB', title: 'A/B Testing Pricing Framing', desc: 'Compare against a static comparison table to see whether an interactive framing improves upgrade conversion.' },
      { icon: 'CODE', title: 'Related: Pricing Add-On Selector', desc: 'See the [Pricing Add-On Selector](/ui-snippets/pricing-addon-selector/) for a related pricing pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Pricing Model Toggle (Per-Seat vs Per-Usage)', desc: 'See the [Pricing Model Toggle (Per-Seat vs Per-Usage)](/ui-snippets/pricing-value-metric-toggle/) for a related pricing pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Pricing Table with Sticky Compare Bar', desc: 'See the [Pricing Table with Sticky Compare Bar](/ui-snippets/pricing-sticky-compare-bar/) for a related pricing pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Pricing ROI and Breakeven Calculator', desc: 'See the [Pricing ROI and Breakeven Calculator](/ui-snippets/pricing-roi-breakeven-calculator/) for a related pricing pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Role-Based Seat Mix Pricing Calculator', desc: 'See the [Role-Based Seat Mix Pricing Calculator](/ui-snippets/pricing-role-based-seat-mix-calculator/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this work on mobile touch screens?', a: 'Yes — it uses the Pointer Events API (pointerdown/pointermove/pointerup) which normalizes mouse, touch and pen input into a single set of handlers, so dragging works identically on a phone screen.' },
      { q: 'Can I use more than two plans?', a: 'The clip-path technique is inherently two-panel. For three or more tiers, use a traditional side-by-side comparison table or a tabbed switcher instead — this component is best suited to a direct two-plan comparison.' },
      { q: 'Why clip-path instead of just changing width or overflow?', a: 'clip-path: inset() clips the top panel precisely without affecting layout flow or triggering reflow on the panel underneath, which keeps the drag interaction smooth even at high frame rates.' },
      { q: 'Is the slider accessible to screen reader and keyboard users?', a: 'Yes — the handle is a role="slider" element with aria-valuemin, aria-valuemax and a live aria-valuenow, and it supports ArrowLeft/ArrowRight keyboard operation in addition to drag.' },
      { q: 'How do I stop the handle from fully covering one side?', a: 'The setPos function already clamps the percentage between 4 and 96 so a sliver of both panels always remains visible — adjust those two numbers to change the clamp range.' },
      { q: 'Can I animate the reveal instead of having it track the pointer 1:1?', a: 'Yes — add a CSS transition on clip-path to .side-b for eased movement, though for a live drag interaction most implementations keep it instant (transition: 0.05s) so it feels directly connected to the pointer.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to walk through exactly why clip-path: inset() is a better fit here than translateX or width-based reveals, and to explain how setPointerCapture prevents the drag from breaking if the cursor moves faster than the handle can visually follow. It's also worth asking for a version that supports three or more plans via a horizontal multi-stop slider, or one that snaps to discrete tier positions instead of tracking the pointer continuously.`,
      prompt: `Build a draggable two-panel comparison slider in HTML, CSS and vanilla JavaScript that reveals a "Pro" plan's feature list over a "Basic" plan's feature list as the user drags a central handle left and right — no external libraries.

Requirements:
- Two absolutely-positioned panels occupying the same box, each listing plan features; the top panel must be revealed using CSS clip-path: inset(), not width or transform tricks.
- A draggable circular handle positioned at the clip boundary, operable via the Pointer Events API (pointerdown/pointermove/pointerup with setPointerCapture) so it works for mouse, touch and pen input uniformly.
- The handle must be a real role="slider" element with aria-valuemin, aria-valuemax, and a live aria-valuenow attribute that updates on every drag.
- Full keyboard support: when the handle has focus, ArrowLeft and ArrowRight keys must move the comparison position in fixed increments.
- Clamp the draggable range so neither panel can be fully hidden — leave at least a few percent of each side always visible.
- Visually distinguish the two panels (e.g. light vs dark background) and label each with a small corner tag.`,
    },
  },
};

export default planFeatureDragCompareSlider;
