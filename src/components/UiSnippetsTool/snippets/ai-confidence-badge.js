const aiConfidenceBadge = {
  id: 'ai-confidence-badge',
  title: 'AI Confidence Score Badge',
  lastmod: '2026-08-08',
  category: 'cards',
  html: `<div class="demo-wrap">
  <h2 class="demo-title">AI Classification Results</h2>
  <p class="demo-sub">Click any badge to see why the model scored it this way.</p>

  <div class="result-list">
    <div class="result-row">
      <div class="result-main">
        <span class="result-label">Invoice #4471 &rarr; <strong>Payment Received</strong></span>
        <span class="result-meta">Matched against 4 historical patterns</span>
      </div>
      <button class="conf-badge conf-high" data-explain="explain-1" aria-expanded="false">
        <svg class="ring" width="28" height="28" viewBox="0 0 36 36">
          <circle class="ring-bg" cx="18" cy="18" r="15.5"></circle>
          <circle class="ring-fg" cx="18" cy="18" r="15.5" stroke-dasharray="94" stroke-dashoffset="7"></circle>
        </svg>
        <span class="conf-pct">92%</span>
      </button>
    </div>
    <div class="result-explain" id="explain-1">
      <p><strong>High confidence.</strong> Based on strong signal match across 4 sources: exact amount match, known vendor ID, matching PO number, and consistent payment terms.</p>
    </div>

    <div class="result-row">
      <div class="result-main">
        <span class="result-label">Support ticket #8832 &rarr; <strong>Billing Issue</strong></span>
        <span class="result-meta">Matched against 2 historical patterns</span>
      </div>
      <button class="conf-badge conf-med" data-explain="explain-2" aria-expanded="false">
        <svg class="ring" width="28" height="28" viewBox="0 0 36 36">
          <circle class="ring-bg" cx="18" cy="18" r="15.5"></circle>
          <circle class="ring-fg" cx="18" cy="18" r="15.5" stroke-dasharray="94" stroke-dashoffset="35"></circle>
        </svg>
        <span class="conf-pct">64%</span>
      </button>
    </div>
    <div class="result-explain" id="explain-2">
      <p><strong>Medium confidence.</strong> Keywords partially overlap with both "Billing Issue" and "Refund Request" categories. Consider a quick manual check before routing.</p>
    </div>

    <div class="result-row">
      <div class="result-main">
        <span class="result-label">Resume scan &rarr; <strong>Senior Frontend Engineer</strong></span>
        <span class="result-meta">Matched against 1 historical pattern</span>
      </div>
      <button class="conf-badge conf-low" data-explain="explain-3" aria-expanded="false">
        <svg class="ring" width="28" height="28" viewBox="0 0 36 36">
          <circle class="ring-bg" cx="18" cy="18" r="15.5"></circle>
          <circle class="ring-fg" cx="18" cy="18" r="15.5" stroke-dasharray="94" stroke-dashoffset="70"></circle>
        </svg>
        <span class="conf-pct">28%</span>
      </button>
    </div>
    <div class="result-explain" id="explain-3">
      <p><strong>Low confidence.</strong> Limited supporting data &mdash; only one prior example to compare against and no explicit job title match. Verify independently before acting on this label.</p>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-wrap { max-width: 560px; margin: 0 auto; padding: 40px 20px; }
.demo-title { font-size: 19px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.demo-sub { font-size: 13px; color: #64748b; margin-bottom: 22px; }

.result-list { display: flex; flex-direction: column; gap: 8px; }

.result-row {
  display: flex; align-items: center; justify-content: space-between; gap: 14px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;
  padding: 14px 16px;
}
.result-main { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.result-label { font-size: 13.5px; color: #1e293b; }
.result-label strong { color: #0f172a; }
.result-meta { font-size: 11.5px; color: #94a3b8; }

.conf-badge {
  position: relative; display: flex; align-items: center; gap: 6px;
  border: 1.5px solid transparent; border-radius: 30px;
  padding: 5px 12px 5px 6px; cursor: pointer; font-family: inherit;
  flex-shrink: 0; transition: background 0.15s, border-color 0.15s;
}
.conf-pct { font-size: 13px; font-weight: 700; }

.ring-bg { fill: none; stroke: rgba(0,0,0,0.08); stroke-width: 3; }
.ring-fg { fill: none; stroke-width: 3; stroke-linecap: round; transform: rotate(-90deg); transform-origin: 50% 50%; transition: stroke-dashoffset 0.4s; }

.conf-high { background: #ecfdf5; }
.conf-high .ring-fg { stroke: #10b981; }
.conf-high .conf-pct { color: #059669; }
.conf-high:hover, .conf-high.open { border-color: #10b981; }

.conf-med { background: #fffbeb; }
.conf-med .ring-fg { stroke: #f59e0b; }
.conf-med .conf-pct { color: #b45309; }
.conf-med:hover, .conf-med.open { border-color: #f59e0b; }

.conf-low { background: #fef2f2; }
.conf-low .ring-fg { stroke: #ef4444; }
.conf-low .conf-pct { color: #dc2626; }
.conf-low:hover, .conf-low.open { border-color: #ef4444; }

.result-explain {
  max-height: 0; overflow: hidden; opacity: 0;
  transition: max-height 0.25s ease, opacity 0.2s, margin 0.25s;
  background: #f8fafc; border-radius: 10px; margin: 0 2px;
}
.result-explain.open { max-height: 120px; opacity: 1; margin: -2px 2px 4px; padding: 10px 14px; border: 1px dashed #cbd5e1; }
.result-explain p { font-size: 12.5px; line-height: 1.6; color: #475569; }
.result-explain strong { color: #1e293b; }`,
  js: `const badges = document.querySelectorAll('.conf-badge');

badges.forEach(badge => {
  badge.addEventListener('click', () => {
    const targetId = badge.getAttribute('data-explain');
    const panel = document.getElementById(targetId);
    const isOpen = panel.classList.contains('open');

    // Close any other open explanation panel first
    document.querySelectorAll('.result-explain.open').forEach(p => {
      if (p !== panel) p.classList.remove('open');
    });
    document.querySelectorAll('.conf-badge.open').forEach(b => {
      if (b !== badge) { b.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }
    });

    panel.classList.toggle('open', !isOpen);
    badge.classList.toggle('open', !isOpen);
    badge.setAttribute('aria-expanded', String(!isOpen));
  });
});`,
  seo: {
    title: 'AI Confidence Score Badge — Free HTML CSS JS Snippet',
    description: 'Color-coded ring badge showing AI confidence % with a click-to-reveal plain-language explanation of the score. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'AI Confidence Score Badge — Color-Coded Certainty Ring, Click-to-Explain Panel & Transparent AI Output',
      description: `AI systems increasingly make judgments that humans act on without reviewing the underlying evidence: a classification, a match score, a routing decision. The single biggest failure mode in these interfaces is not that the model is wrong sometimes &mdash; every model is wrong sometimes &mdash; it is that the interface presents every output with the same visual authority whether the model is 98% certain or 31% certain. This snippet builds a confidence badge component that makes uncertainty a first-class, visible part of the UI: a color-coded ring (green for high confidence, amber for medium, red for low), a percentage readout, and a click-to-reveal panel that explains *why* the score is what it is in plain language.

**Why confidence transparency matters in 2026**

As AI-generated and AI-assisted output becomes the default in dashboards, support tools, and document processing pipelines, the products that earn user trust are the ones that never let a machine judgment masquerade as a verified fact. This is the core "AI transparency" pattern that is replacing the black-box output style of early AI features: instead of a single confident-looking label, the interface exposes the model's own certainty and gives the user a reason, not just a result. A 92% match and a 28% match should never look the same weight on screen &mdash; and critically, the user should never have to guess which one needs a second look. Designing for this explicitly reduces automation bias, the well-documented tendency for people to over-trust anything presented by a system, regardless of its actual accuracy.

**How the ring and badge are built**

Each badge is an SVG ring built from two overlapping \`<circle>\` elements: a faint background track (\`.ring-bg\`) and a colored foreground arc (\`.ring-fg\`) whose \`stroke-dasharray\` is fixed at the circle's circumference (94, matching \`r="15.5"\`) while its \`stroke-dashoffset\` is set per-badge to represent the percentage &mdash; a smaller offset draws more of the arc. The arc is rotated \`-90deg\` via \`transform-origin: 50% 50%\` so it starts filling from the top rather than the default 3 o'clock position, which reads more naturally as a progress indicator. The three confidence tiers are driven entirely by CSS classes &mdash; \`.conf-high\`, \`.conf-med\`, \`.conf-low\` &mdash; each setting a distinct background tint, ring stroke color, and percentage text color using a semantic green/amber/red palette that is consistent with how developers already read status colors elsewhere in a product.

**The click-to-explain interaction**

Clicking a badge toggles a sibling \`.result-explain\` panel open using a \`max-height\` transition (0 to 120px) combined with opacity, which is a lightweight way to animate a block whose content height is unknown at author time without relying on JavaScript height measurement. The panel text is written in plain, specific language rather than a generic "confidence: 92%" restatement &mdash; it names the actual signals behind the score, such as "exact amount match, known vendor ID, matching PO number" for the high-confidence example, and explicitly recommends manual verification for the medium and low examples. The JavaScript closes any other open panel before opening a new one, so only one explanation is visible at a time, and toggles \`aria-expanded\` on the badge button for screen reader users.

**Design and accessibility notes**

The badge is a real \`<button>\` element, not a styled \`<div>\`, so it is keyboard-focusable and operable with Enter/Space by default, and it carries \`aria-expanded\` state that assistive technology announces on toggle. The color coding is reinforced by the percentage number and by distinct wording in the explanation ("High confidence" / "Medium confidence" / "Low confidence"), so the signal is never conveyed by color alone, which matters for users with color vision deficiencies. This pattern generalizes far beyond classification results &mdash; use it for AI-suggested email replies, fraud risk scores, search relevance rankings, or any place a model attaches a number to a claim and you want users to calibrate their trust accordingly rather than accept it uncritically.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click a badge to see its explanation',
          text: 'Each result row has a color-coded ring badge with a percentage. Click it and a .result-explain panel slides open beneath the row with a plain-language reason for the score. Click a different badge and the previous panel closes automatically.',
        },
        {
          title: 'Set the ring fill for a new confidence value',
          text: 'The ring uses a fixed stroke-dasharray of 94 (the circumference of r=15.5). To show a new percentage, set stroke-dashoffset to 94 - (94 * pct / 100) on the .ring-fg circle, and update the .conf-pct text and the tier class (conf-high, conf-med, conf-low) together.',
        },
        {
          title: 'Choose the right tier thresholds for your data',
          text: 'This demo treats roughly 80%+ as high (green), 50-79% as medium (amber), and below 50% as low (red). Adjust the thresholds in your own logic to match how your model\'s scores are actually calibrated — a poorly calibrated model should not be dressed up in confident-looking green.',
        },
        {
          title: 'Write explanations that name real signals',
          text: 'Avoid restating the percentage in the explanation text. Instead name the actual factors: which sources matched, how many historical examples were compared, or what specific data was missing. This is what separates a genuinely transparent AI interface from a decorative confidence meter.',
        },
        {
          title: 'Wire it to live model output',
          text: 'Replace the hard-coded stroke-dashoffset and conf-pct values with data from your model response, e.g. score.confidence and score.reasons. Generate the explanation paragraph server-side from the top contributing features rather than a static string, if your model can produce that.',
        },
        {
          title: 'Export and drop into your results list',
          text: 'Click HTML to download a standalone file, or JSX to get a React component. Wrap the badge in a reusable ConfidenceBadge component that accepts a percentage prop and a reasons string, so every AI-driven result across your app renders its uncertainty consistently.',
        },
      ],
    },
    features: [
      'SVG ring meter: two-circle technique with stroke-dasharray fixed and stroke-dashoffset driving the fill percentage',
      'Three-tier color system: conf-high (green), conf-med (amber), conf-low (red) mapped to distinct CSS classes',
      'Click-to-reveal explanation panel using max-height + opacity transition, no JS height measurement needed',
      'aria-expanded toggled on the badge button so screen readers announce open/closed state',
      'Only one explanation panel open at a time — opening a new one auto-closes the previous',
      'Real <button> element for keyboard focus and Enter/Space activation, not a styled div',
      'Color is never the only signal — percentage text and explanation wording reinforce the same tier',
      'Plain-language reasoning text names actual signals instead of restating the number',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'AI-assisted document processing and data extraction dashboards',
        desc: 'Invoice parsers, resume screeners, and contract analyzers that use AI to extract or classify fields should never present every extracted value with equal certainty. Attach a confidence badge to each extracted field so reviewers instantly see which values need a second look before they are pushed into a database or approval workflow. This dramatically reduces the risk of a low-confidence guess being treated as verified data.',
      },
      {
        icon: 'FORM',
        title: 'Support ticket routing and auto-categorization',
        desc: 'When an AI model auto-tags incoming support tickets or emails, showing the confidence score next to the suggested category lets human agents quickly triage: high-confidence tags can be trusted and auto-routed, while medium and low-confidence tags get flagged for a quick manual check. This keeps automation fast without silently misrouting ambiguous cases.',
      },
      {
        icon: 'FLOW',
        title: 'Search and semantic match relevance scoring',
        desc: 'Vector search and semantic matching tools (resume-to-job matching, product recommendation, duplicate detection) benefit from showing users the actual match strength rather than a plain ranked list. A confidence badge next to each result helps users calibrate how much weight to give a top result versus a borderline one, similar in spirit to a transparent version of the [AI Review Summary Card](/ui-snippets/ai-review-summary-card) pattern.',
      },
      {
        icon: 'DESIGN',
        title: 'Fraud and risk scoring interfaces for finance and trust teams',
        desc: 'Fraud detection and risk-scoring tools that flag transactions or accounts need to communicate both the flag and the model\'s certainty about it, since acting on a low-confidence fraud flag can wrongly block a legitimate customer. A color-coded badge with a named-reason explanation gives risk analysts the context to make the final call quickly instead of treating every flag as equally urgent.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching the AI-transparency pattern in product and design systems',
        desc: 'This snippet is a compact reference for a pattern every AI-adjacent product team needs: never let a model output look more certain than it is. Use it as a starting template in a design system\'s documentation to show engineers exactly how to pair a visual confidence indicator with an accessible, specific explanation rather than a vague tooltip.',
      },
      {
        icon: 'CODE',
        title: 'Retrofitting confidence signals onto an existing results list',
        desc: 'Many products ship an AI feature first and add trust signals later once users start over-relying on wrong outputs. This component is designed to drop into an existing row-based results list with minimal markup changes — the badge and explain panel are self-contained and do not require restructuring the surrounding layout.',
      },
      { icon: 'CODE', title: 'Related: Achievement Badge Collection Grid', desc: 'See the [Achievement Badge Collection Grid](/ui-snippets/achievement-badge-grid/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Atropos 3D Parallax Card', desc: 'See the [Atropos 3D Parallax Card](/ui-snippets/atropos-3d-card/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Recipe Card with Serving Scaler', desc: 'See the [Recipe Card with Serving Scaler](/ui-snippets/recipe-serving-scaler-card/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Pet Vaccination Reminder Card', desc: 'See the [Pet Vaccination Reminder Card](/ui-snippets/pet-vaccination-reminder-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'What confidence thresholds should I use for the green, amber, and red tiers?',
        a: 'There is no universal cutoff — it depends entirely on how your model\'s scores are calibrated. A well-calibrated model where "90%" genuinely means correct 9 times out of 10 can safely use a higher green threshold (e.g. 85%+) than a poorly calibrated model. Before choosing thresholds, plot your model\'s predicted confidence against its actual accuracy on a held-out set; if 70% predictions are only correct 50% of the time, your thresholds need to shift down accordingly, or you need to recalibrate the model itself (e.g. with temperature scaling or Platt scaling).',
      },
      {
        q: 'Should I show a raw confidence percentage to end users, or is that too technical?',
        a: 'For technical or professional users (support agents, analysts, ops teams) a raw percentage paired with a plain-language explanation works well because it gives them a precise, scannable signal. For general consumer audiences, consider replacing the percentage with a qualitative label ("High confidence" / "Needs review") while keeping the color-coded ring, since raw percentages can be misread as statistical guarantees rather than the model\'s internal estimate.',
      },
      {
        q: 'How do I generate the plain-language explanation dynamically instead of hard-coding it?',
        a: 'Most models or scoring pipelines can expose the top contributing features alongside the score — e.g. which fields matched, which embeddings were closest, or which rules fired. Template the explanation string from those features server-side: "Matched on {factor1}, {factor2}, and {factor3}" for high confidence, and "Only {n} comparable example(s) found" for low confidence. Avoid generic filler text like "the model is fairly sure" that gives the user no actionable information.',
      },
      {
        q: 'Does this component work with screen readers and keyboard-only navigation?',
        a: 'Yes. The badge is a real <button> element so it receives focus in tab order and activates on Enter or Space without any extra JavaScript. The aria-expanded attribute is toggled between "true" and "false" so screen readers announce whether the explanation panel is currently open. Because the tier is also conveyed through the percentage text and explanation wording (not color alone), the component remains understandable for users with color vision deficiencies.',
      },
      {
        q: 'Can I use this for more than three confidence tiers?',
        a: 'Yes — add additional CSS classes (e.g. .conf-verylow) with their own ring color, background tint, and text color, and extend your threshold logic to assign them. Keep in mind that too many tiers dilutes the at-a-glance scannability that makes a three-tier system effective; most products find that green/amber/red, or a four-tier system with a distinct "insufficient data" state, covers the practical range of decisions users need to make.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how the stroke-dasharray and stroke-dashoffset values on the .ring-fg circle map to the displayed percentage, so you can confidently wire in your own model's live confidence scores instead of the hard-coded demo values. It's also worth asking the assistant to help you design a calibration check — a small script that compares your model's predicted confidence against actual accuracy on a labeled sample, so your green/amber/red thresholds reflect real calibration rather than a guess. Finally, ask it to extend the component with a fourth "insufficient data" tier for cases where the model has too little evidence to produce a meaningful score at all, which is a common gap in confidence-badge implementations that only plan for high, medium, and low.`,
      prompt: `Build an AI confidence score badge component in plain HTML, CSS, and JavaScript that shows a color-coded circular meter and a click-to-reveal plain-language explanation.

Requirements:
- Render a list of result rows, each with a label and a confidence badge showing an SVG ring meter (percentage filled by stroke-dashoffset) plus a numeric percentage, color-coded into at least three tiers (e.g. green 80%+, amber 50-79%, red below 50%).
- Clicking a badge toggles open a sibling explanation panel with a smooth height/opacity transition (not an instant show/hide), containing 1-2 sentences that name the actual reasons behind the score rather than restating the percentage.
- Only one explanation panel should be open at a time — opening a new one must close any previously open panel.
- The badge must be a real, keyboard-focusable button element with an aria-expanded attribute that toggles between true and false as the panel opens and closes.
- The confidence tier must never be communicated by color alone — reinforce it with text (percentage number and/or a tier label) so the component remains usable for color-blind users.
- Include at least three example rows spanning high, medium, and low confidence so all three visual states are demonstrated at once.
- Keep the component self-contained with no external dependencies, ready to be wired to real model output by swapping the hard-coded percentages and explanation strings for dynamic data.`,
    },
  },
};
export default aiConfidenceBadge;
