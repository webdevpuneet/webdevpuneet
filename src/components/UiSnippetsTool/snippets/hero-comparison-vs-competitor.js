const heroComparisonVsCompetitor = {
  id: 'hero-comparison-vs-competitor',
  title: 'Hero Framed as Us vs. Them',
  lastmod: '2026-08-23',
  category: 'heroes',
  html: `<section class="cvh-hero">
  <div class="cvh-inner">
    <span class="cvh-badge">The honest comparison</span>
    <h1 class="cvh-title">Everything your old tool made you tolerate — fixed.</h1>
    <p class="cvh-sub">We built Ledger because spreadsheets and legacy accounting software both stop working at 50 employees. Here's exactly what changes.</p>

    <div class="cvh-compare">
      <div class="cvh-col cvh-us">
        <div class="cvh-col-head"><span class="cvh-logo">Ledger</span></div>
        <ul>
          <li><span class="cvh-icon cvh-yes">✓</span>Live sync across every device</li>
          <li><span class="cvh-icon cvh-yes">✓</span>Setup in under 10 minutes</li>
          <li><span class="cvh-icon cvh-yes">✓</span>Flat pricing, no per-seat fees</li>
          <li><span class="cvh-icon cvh-yes">✓</span>Real human support, same day</li>
          <li><span class="cvh-icon cvh-yes">✓</span>Exports to every format you need</li>
        </ul>
      </div>
      <div class="cvh-col cvh-them">
        <div class="cvh-col-head"><span class="cvh-logo cvh-logo-muted">Typical alternative</span></div>
        <ul>
          <li><span class="cvh-icon cvh-no">✕</span>Manual re-uploads to stay in sync</li>
          <li><span class="cvh-icon cvh-no">✕</span>Weeks of onboarding calls</li>
          <li><span class="cvh-icon cvh-no">✕</span>Pricing jumps with every hire</li>
          <li><span class="cvh-icon cvh-no">✕</span>Ticket queues measured in days</li>
          <li><span class="cvh-icon cvh-no">✕</span>Locked into one proprietary format</li>
        </ul>
      </div>
    </div>

    <div class="cvh-cta-row">
      <a href="#" class="cvh-btn-primary">Switch to Ledger</a>
      <a href="#" class="cvh-btn-secondary">See full comparison</a>
    </div>
  </div>
</section>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0d1117; }

.cvh-hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 56px 24px; }
.cvh-inner { max-width: 760px; text-align: center; }

.cvh-badge { display: inline-block; padding: 6px 14px; background: rgba(56, 189, 248, 0.12); color: #7dd3fc; border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 999px; font-size: 12.5px; font-weight: 700; }
.cvh-title { margin-top: 20px; font-size: 40px; font-weight: 800; line-height: 1.16; letter-spacing: -0.02em; color: #f1f5f9; }
.cvh-sub { margin: 16px auto 0; max-width: 540px; font-size: 15.5px; line-height: 1.65; color: #94a3b8; }

.cvh-compare { margin-top: 36px; display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; text-align: left; }
.cvh-col { padding: 24px 22px; background: #161b22; }
.cvh-us { background: linear-gradient(180deg, rgba(56, 189, 248, 0.1), #161b22 60%); }
.cvh-col-head { margin-bottom: 16px; }
.cvh-logo { font-size: 15px; font-weight: 800; color: #7dd3fc; }
.cvh-logo-muted { color: #64748b; }
.cvh-col ul { list-style: none; display: flex; flex-direction: column; gap: 13px; }
.cvh-col li { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; line-height: 1.5; color: #cbd5e1; }
.cvh-them li { color: #7c8494; }
.cvh-icon { flex-shrink: 0; width: 19px; height: 19px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; margin-top: 1px; }
.cvh-yes { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
.cvh-no { background: rgba(248, 113, 113, 0.12); color: #f87171; }

.cvh-cta-row { margin-top: 32px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.cvh-btn-primary { padding: 13px 26px; background: #38bdf8; color: #0b1220; border-radius: 10px; text-decoration: none; font-size: 14.5px; font-weight: 800; transition: background .15s; }
.cvh-btn-primary:hover { background: #7dd3fc; }
.cvh-btn-secondary { padding: 13px 26px; background: transparent; color: #cbd5e1; border: 1.5px solid rgba(255,255,255,0.14); border-radius: 10px; text-decoration: none; font-size: 14.5px; font-weight: 700; transition: border-color .15s, color .15s; }
.cvh-btn-secondary:hover { border-color: #7dd3fc; color: #7dd3fc; }

@media (max-width: 640px) {
  .cvh-title { font-size: 28px; }
  .cvh-compare { grid-template-columns: 1fr; }
}`,
  js: '',
  seo: {
    title: 'Us vs. Them Comparison Hero — Free HTML CSS JS Snippet',
    description: 'A hero built around a compact "us vs. typical alternative" checklist, positioned as the primary persuasive content instead of buried lower on the page. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Us vs. Them Comparison Hero — The Checklist Is the Hero, Not a Footnote',
      description: `Comparison content usually lives far down the page, in a table most visitors never scroll to. This snippet moves the comparison itself into the hero — a two-column "us / typical alternative" checklist sits directly under the headline, doing the persuasive work that a headline and screenshot alone can't. It's built entirely in HTML and CSS, no JavaScript required.

**Why the comparison belongs above the fold**

A visitor evaluating a switch already has a mental model of what's wrong with their current tool. Restating generic benefits ("fast," "easy," "powerful") doesn't engage with that model — a direct, specific comparison does. By putting five concrete contrasts (sync behavior, setup time, pricing structure, support speed, export flexibility) in the hero itself, the page answers "why should I switch" before asking for any commitment, which is a stronger opening than a generic value-prop headline followed by a screenshot.

**The two-column contrast structure**

\`.cvh-compare\` is a two-column grid with a 2px gap that reads as a dividing line between the columns. The left "us" column gets a subtle blue-tinted gradient background and a colored logo label; the right "typical alternative" column stays flat and its logo label is deliberately muted grey — a visual hierarchy that makes clear which side to prefer without needing bold claims. Each row pairs a small circular icon (green check or red X) with a specific, falsifiable statement — not "better," but "flat pricing, no per-seat fees."

**Specificity over superlatives**

Every line in both columns names a concrete behavior a prospect can verify themselves, rather than an abstract quality. "Live sync across every device" versus "manual re-uploads to stay in sync" is checkable; "we're better at syncing" is not. This specificity is what makes an us-vs-them comparison credible instead of feeling like marketing copy — replace these five points with your product's actual differentiators, written the same concrete way.

**Framing without naming a competitor**

The right column is labeled "Typical alternative" rather than a specific competitor's name, which keeps the comparison legally safe and evergreen (it doesn't need updating when a competitor changes their pricing) while still being unambiguous to anyone shopping in the category. If you do want to name a specific competitor, swap the label and keep the same structure — just make sure every claim you make about them is accurate and current.

**Customizing it**

Replace the five comparison points with your product's real differentiators — keep them specific and verifiable. Update the two CTAs: a primary "switch" action and a secondary link to a fuller [comparison table](/ui-snippets/comparison-table/) elsewhere on the site for visitors who want more detail. Pair this hero with a [pricing card](/ui-snippets/pricing-card/) section below for visitors who are already convinced and want to see numbers.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML and CSS', text: `A dark hero renders with a headline and a two-column comparison checklist beneath it.` },
      { title: 'Review the five comparison points', text: `Each row pairs a green check (your product) with a red X (the alternative) on a specific claim.` },
      { title: 'Replace the claims with your own', text: `Keep every point concrete and verifiable — avoid vague superlatives.` },
      { title: 'Decide whether to name a competitor', text: `Keep "Typical alternative" for an evergreen comparison, or name a specific competitor if every claim is accurate.` },
      { title: 'Wire the CTAs', text: `Point the primary button at signup and the secondary link at a fuller comparison table page.` },
      { title: 'Check the mobile stack', text: `Below 640px the two columns stack vertically.` },
    ] },
    features: [
      { title: 'Comparison as the hero', text: `The checklist sits directly under the headline instead of buried in a lower page section.` },
      { title: 'Two-column contrast grid', text: `A 2px gap between columns reads as a dividing line without extra markup.` },
      { title: 'Tinted "us" column', text: `A subtle gradient and colored logo label signal preference without bold claims.` },
      { title: 'Specific, verifiable claims', text: `Each line names a concrete behavior, not an abstract quality.` },
      { title: 'Evergreen competitor framing', text: `"Typical alternative" avoids naming a specific competitor by default.` },
      { title: 'Dual CTA row', text: `A primary switch action paired with a link to a fuller comparison page.` },
      { title: 'Pure HTML and CSS', text: `No JavaScript required — the whole hero is static markup.` },
      { title: 'Responsive stacking', text: `Columns collapse to a single stack under 640px.` },
    ],
    useCases: [
      { title: 'Competitor switch campaigns', text: 'Lead a switch from X landing page with a two-column us versus typical alternative checklist directly under the headline.' },
      { title: 'SaaS category pages', text: 'Pair with a fuller [comparison table](/ui-snippets/comparison-table/) lower down on a SaaS category page for visitors who want every detail.' },
      { title: 'Migration-focused pages', text: 'Add a [pricing card](/ui-snippets/pricing-card/) beside the checklist, with a tinted us column signalling preference without shouting.' },
      { title: 'Category-defining products', text: 'Frame the product against the old way, using specific verifiable claims rather than abstract quality adjectives.' },
      { title: 'Sales enablement pages', text: 'Give a rep a shareable page making the case persuasively, and study a two-pixel grid gap that reads as a dividing line with no borders.' },
      { icon: 'CODE', title: 'Related: Developer Hero with Typing Code Window', desc: 'See the [Developer Hero with Typing Code Window](/ui-snippets/hero-code-window-showcase/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why put the comparison in the hero instead of lower on the page?', a: `A visitor evaluating a switch already has a mental model of what's wrong with their current tool. Putting the comparison directly under the headline engages with that model immediately, rather than making the visitor scroll past generic value-prop copy to find the content that actually addresses their hesitation.` },
      { q: 'Should I name a specific competitor or keep it generic?', a: `The default "Typical alternative" label keeps the comparison evergreen and legally safe — it doesn't need updating when a competitor changes pricing, and it's unambiguous to anyone shopping in the category. Naming a specific competitor is more direct but requires every claim to be accurate and kept current, and may need legal review depending on your market.` },
      { q: 'What makes a comparison point credible instead of marketing fluff?', a: `Specificity. "Live sync across every device" is a claim a prospect can verify themselves; "we're better at syncing" is not. Every point in both columns should name a concrete, checkable behavior — replace the placeholder claims with your product's real, specific differentiators written the same way.` },
      { q: 'How do I extend this to more than five comparison points?', a: `Add more <li> elements to both .cvh-us and .cvh-them lists — keep the same number of items in each column so the rows stay visually aligned across the two sides. For a much longer list, consider linking to a dedicated comparison table page instead of growing the hero indefinitely.` },
      { q: 'How do I use this hero in React, Vue, or Angular?', a: `Since there's no JavaScript, the conversion is a direct markup translation — map your comparison points array to two lists of items. Click JSX, Vue, or Angular in the export panel to download the converted component.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to guess which comparison points will land. Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain why putting a specific, verifiable comparison in the hero is a stronger persuasive structure than a generic headline followed by a screenshot, or how the subtle gradient and muted logo label on the two columns create a preference hierarchy without needing bold claims. The same assistant can help you sharpen the copy — ask it to review your five comparison points for vague superlatives versus concrete, checkable claims. It's also useful for extending the pattern: ask it to add a third column for a second competitor, make the comparison points expandable with more detail on click, or turn the static list into a component that pulls its claims from a CMS. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a marketing hero section in plain HTML and CSS (no JavaScript needed) that puts a compact "us vs. typical alternative" comparison directly beneath the headline as the hero's primary persuasive content.

Requirements:
- A centered hero with a small eyebrow badge, a bold headline, and a short subheading.
- Below the subheading, a two-column comparison grid with a thin visual divider between the columns: a left "us" column with a colored logo label and a subtle tinted gradient background, and a right "typical alternative" column with a muted grey label and a flat background.
- Each column lists exactly five rows, and each row pairs a small circular icon (a green checkmark for the "us" column, a red X for the "alternative" column) with one short, specific, verifiable claim — not a vague adjective like "better" or "faster" but a concrete behavior (for example "flat pricing, no per-seat fees" versus "pricing jumps with every hire").
- Below the comparison grid, a row with two call-to-action buttons: a solid primary "switch" button and an outlined secondary button linking to a fuller comparison page.
- Make it fully responsive: the two comparison columns stack vertically on narrow screens, and the headline scales down.
- Use a dark background so the colored checkmarks, X marks, and the tinted "us" column stand out clearly.`,
    },
  },
};

export default heroComparisonVsCompetitor;
