const aiReviewSummaryCard = {
  id: 'ai-review-summary-card',
  title: 'AI-Generated Review Summary Card',
  lastmod: '2026-08-08',
  category: 'cards',
  html: `<div class="demo-wrap">
  <div class="summary-card">
    <div class="summary-head">
      <span class="ai-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.8L20 10l-6.1 2.2L12 18l-1.9-5.8L4 10l6.1-2.2z"/></svg>
        AI Summary
      </span>
      <span class="star-rating">&#9733; 4.4</span>
    </div>

    <p class="sentiment-line">Customers consistently praise the <strong>fast shipping</strong> and <strong>build quality</strong>, though several mention the fit runs slightly small.</p>

    <div class="tag-list">
      <div class="tag-row">
        <span class="tag-chip tag-pos">Fast shipping</span>
        <div class="tag-bar"><span class="tag-bar-fill pos" style="width:78%"></span></div>
        <span class="tag-count">+42</span>
      </div>
      <div class="tag-row">
        <span class="tag-chip tag-pos">Great quality</span>
        <div class="tag-bar"><span class="tag-bar-fill pos" style="width:61%"></span></div>
        <span class="tag-count">+31</span>
      </div>
      <div class="tag-row">
        <span class="tag-chip tag-pos">Good value</span>
        <div class="tag-bar"><span class="tag-bar-fill pos" style="width:44%"></span></div>
        <span class="tag-count">+19</span>
      </div>
      <div class="tag-row">
        <span class="tag-chip tag-neg">Sizing runs small</span>
        <div class="tag-bar"><span class="tag-bar-fill neg" style="width:22%"></span></div>
        <span class="tag-count neg">-8</span>
      </div>
    </div>

    <button class="disclosure-toggle" id="disclosure-toggle" aria-expanded="false">
      <span>Summary generated from 214 reviews &mdash; view source excerpts</span>
      <svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
    </button>

    <div class="excerpts" id="excerpts">
      <blockquote>&ldquo;Ordered Tuesday, arrived Thursday &mdash; genuinely surprised how fast it got here.&rdquo; <cite>&mdash; Priya M.</cite></blockquote>
      <blockquote>&ldquo;Feels much sturdier than I expected for the price. No complaints on build quality.&rdquo; <cite>&mdash; Daniel K.</cite></blockquote>
      <blockquote>&ldquo;Runs small &mdash; I sized up and it fits perfectly now, but order a size larger than usual.&rdquo; <cite>&mdash; Ava R.</cite></blockquote>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 32px 16px; }

.summary-card {
  width: 100%; max-width: 400px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  padding: 20px; box-shadow: 0 8px 24px rgba(15,23,42,0.06);
}

.summary-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.ai-tag {
  display: inline-flex; align-items: center; gap: 5px;
  background: #ede9fe; color: #6d28d9; font-size: 11px; font-weight: 700;
  padding: 4px 9px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.02em;
}
.star-rating { font-size: 13px; font-weight: 700; color: #b45309; }

.sentiment-line { font-size: 13.5px; line-height: 1.6; color: #334155; margin-bottom: 16px; }
.sentiment-line strong { color: #0f172a; }

.tag-list { display: flex; flex-direction: column; gap: 9px; margin-bottom: 16px; }
.tag-row { display: grid; grid-template-columns: 108px 1fr 32px; align-items: center; gap: 10px; }

.tag-chip {
  font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 6px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.tag-pos { background: #ecfdf5; color: #047857; }
.tag-neg { background: #fef2f2; color: #b91c1c; }

.tag-bar { height: 6px; background: #f1f5f9; border-radius: 6px; overflow: hidden; }
.tag-bar-fill { display: block; height: 100%; border-radius: 6px; transition: width 0.5s ease; }
.tag-bar-fill.pos { background: #10b981; }
.tag-bar-fill.neg { background: #ef4444; }

.tag-count { font-size: 11px; font-weight: 700; color: #059669; text-align: right; }
.tag-count.neg { color: #dc2626; }

.disclosure-toggle {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px;
  background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px;
  padding: 9px 12px; font-size: 11.5px; color: #64748b; font-family: inherit;
  cursor: pointer; text-align: left; transition: background 0.15s, border-color 0.15s;
}
.disclosure-toggle:hover { background: #f1f5f9; border-color: #94a3b8; }
.chev { flex-shrink: 0; transition: transform 0.25s ease; }
.disclosure-toggle[aria-expanded="true"] .chev { transform: rotate(180deg); }

.excerpts {
  max-height: 0; overflow: hidden; opacity: 0;
  transition: max-height 0.3s ease, opacity 0.25s, margin 0.3s;
}
.excerpts.open { max-height: 300px; opacity: 1; margin-top: 12px; }
.excerpts blockquote {
  font-size: 12px; line-height: 1.6; color: #475569;
  background: #f8fafc; border-left: 3px solid #a5b4fc;
  padding: 8px 12px; border-radius: 0 8px 8px 0; margin-bottom: 8px;
}
.excerpts blockquote:last-child { margin-bottom: 0; }
.excerpts cite { display: block; margin-top: 4px; font-size: 11px; color: #94a3b8; font-style: normal; }`,
  js: `const toggle = document.getElementById('disclosure-toggle');
const excerpts = document.getElementById('excerpts');

toggle.addEventListener('click', () => {
  const isOpen = excerpts.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

// Animate the tag bars in from 0 width on load so the proportions
// feel like they're being computed, reinforcing that this is a live
// aggregate rather than static copy.
window.addEventListener('DOMContentLoaded', () => {
  const fills = document.querySelectorAll('.tag-bar-fill');
  fills.forEach(fill => {
    const target = fill.style.width;
    fill.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.width = target;
      });
    });
  });
});`,
  seo: {
    title: 'AI-Generated Review Summary Card — HTML CSS JS Snippet',
    description: 'Sentiment summary with tag chips, bar indicators, and a toggle to reveal real source review quotes. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'AI-Generated Review Summary Card — Sentiment Tags, Mini Bar Indicators & Source Excerpt Disclosure',
      description: `AI-generated review summaries have become a standard ecommerce and marketplace feature: instead of making a shopper scroll through 200 individual reviews, a model condenses them into a short paragraph and a handful of common themes. The convenience is real, but so is the risk &mdash; a summary is an interpretation, not a fact, and if a product page presents it with the same unquestionable authority as a spec sheet, users have no way to tell whether the AI accurately represented the underlying reviews or quietly smoothed over a real problem. This snippet builds a review summary card that stays honest about its own nature: an overall sentiment line, tag chips with proportional bar indicators showing how often each theme was mentioned, and &mdash; critically &mdash; a disclosure control that reveals the actual excerpt quotes the summary was built from.

**Why source-verifiable AI summaries matter in 2026**

As AI-summarized content spreads across ecommerce, news aggregation, and customer feedback tools, the products that retain user trust are the ones that treat a summary as a starting point for the user's own judgment, not a replacement for it. This is the same AI-transparency principle behind confidence scoring and cited AI answers: never let a generated summary stand alone without a path back to its source material. A shopper reading "customers praise the fast shipping" should be able to click through and see two or three real sentences that back that claim up, in the actual words of real reviewers, not just trust the AI's paraphrase. This habit of designing a verification path into every AI-summarized surface is quickly becoming a baseline expectation rather than a differentiator, especially as synthetic and manipulated reviews make raw review volume alone an unreliable trust signal.

**How the sentiment tags and bars communicate proportion, not just presence**

Rather than a flat list of theme keywords, each tag in the \`.tag-list\` pairs a colored chip (green \`.tag-pos\` for favorable themes, red \`.tag-neg\` for critical ones) with a horizontal \`.tag-bar\` whose fill width is set per-tag to represent how frequently that theme appeared relative to the others &mdash; "Fast shipping" at 78% width clearly outweighs "Good value" at 44%, giving the user an at-a-glance sense of theme prominence that a plain list of chips cannot convey. Each tag also carries a raw mention count (\`+42\`, \`-8\`) so the proportion is anchored to an actual number rather than an abstract percentage. On page load, the bars animate in from 0% width using a double \`requestAnimationFrame\` call (needed because the browser must paint the 0% state once before the transition to the target width can be observed), which reinforces the impression that these are computed, live figures rather than static decorative copy.

**The disclosure pattern: summary first, evidence on demand**

The \`.disclosure-toggle\` button sits below the tag list, stating plainly how many reviews the summary was generated from ("Summary generated from 214 reviews") and inviting the user to view source excerpts. Clicking it expands an \`.excerpts\` panel &mdash; using the same \`max-height\`/opacity transition technique as other progressive-disclosure components &mdash; containing two to three real, attributed review quotes that directly support the themes named above. This keeps the primary card compact and scannable for users who trust the summary at a glance, while giving skeptical or high-stakes shoppers (someone about to spend real money, or make a decision based on the "sizing runs small" note) a one-click path to the actual evidence. The \`aria-expanded\` state on the toggle button and the rotating chevron icon both signal the disclosure's open/closed state clearly to sighted and assistive-technology users alike.

**Design notes**

The purple \`.ai-tag\` badge in the card header is a deliberate, small, consistent marker &mdash; it should appear on every AI-generated summary surface in a product so users learn to recognize at a glance which content is machine-generated versus directly authored, which is itself a transparency requirement increasingly expected of AI-assisted product content. The excerpt blockquotes use a left border accent rather than heavy quotation styling, keeping them legible and clearly distinguished from the summary prose above them.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click the disclosure line to see source quotes',
          text: 'Click "Summary generated from 214 reviews — view source excerpts" beneath the tag list. The .excerpts panel expands with a smooth max-height transition to reveal 2-3 real, attributed review quotes that back up the themes named above.',
        },
        {
          title: 'Set tag bar widths from real mention frequency',
          text: 'Each .tag-bar-fill has an inline style="width:XX%" representing how often that theme was mentioned relative to the most common one. Compute this server-side as (theme mentions / max theme mentions) * 100 so the bars accurately reflect your real review data, not arbitrary values.',
        },
        {
          title: 'Keep the mention count anchored to a real number',
          text: 'The .tag-count span (e.g. "+42") should always be the actual count of reviews mentioning that theme, not a derived percentage — this gives users a concrete number to sanity-check the bar proportion against.',
        },
        {
          title: 'Always populate the excerpts panel with real quotes',
          text: 'Never leave the .excerpts panel empty or filled with paraphrased text — it exists specifically to let users verify the AI summary against real customer language. Pull 2-3 representative quotes per theme directly from your review database, with attribution.',
        },
        {
          title: 'Keep the AI Summary tag visible and consistent',
          text: 'The .ai-tag badge in the card header should appear identically on every AI-generated summary surface across your product so users learn to recognize AI-summarized content at a glance, distinct from directly authored copy.',
        },
        {
          title: 'Export and wire to your review data pipeline',
          text: 'Click HTML to download a standalone file, or JSX for a React component. Generate the sentiment line, tag list, and review count server-side from your actual review aggregation pipeline, and pass the excerpt quotes as props so the disclosure panel always reflects real source data.',
        },
      ],
    },
    features: [
      'Proportional tag bars: .tag-bar-fill width reflects real relative mention frequency between themes, not just presence',
      'Paired count badges (+42, -8) anchor each bar to a concrete number so proportions can be sanity-checked',
      'Progressive disclosure pattern: summary and tags shown by default, real source excerpts revealed on demand',
      'aria-expanded + rotating chevron icon clearly signal the disclosure toggle\'s open/closed state',
      'Bars animate in from 0% width on load via double requestAnimationFrame for a "live computed" feel',
      'Consistent AI Summary badge marks the content as machine-generated at a glance, distinct from authored copy',
      'Attributed real excerpt quotes give users a direct verification path back to source material',
      'Green/red semantic coloring on tag chips separates favorable and critical themes at a glance',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'Ecommerce product pages summarizing hundreds of customer reviews',
        desc: 'Product listing pages with hundreds of reviews use AI summaries to save shoppers from scrolling through every one. This card format lets shoppers quickly grasp the consensus while still being able to verify specific claims (like sizing or durability concerns) against real reviewer language before making a purchase decision, similar in spirit to the transparency goal behind the [AI Confidence Score Badge](/ui-snippets/ai-confidence-badge).',
      },
      {
        icon: 'APP',
        title: 'Marketplace and travel booking listing aggregation',
        desc: 'Hotel, rental, and marketplace listings with large review volumes benefit from the same pattern — an AI-condensed sentiment overview with theme tags (cleanliness, location, responsiveness) backed by a small set of real excerpt quotes, so travelers can verify a summary before committing to a non-refundable booking.',
      },
      {
        icon: 'FLOW',
        title: 'SaaS review aggregation and competitor comparison tools',
        desc: 'B2B software review sites and internal vendor evaluation tools that aggregate feedback across many users can use this pattern to summarize sentiment per feature area, giving decision-makers a fast overview while preserving a path to the actual quoted feedback behind any given claim.',
      },
      {
        icon: 'DESIGN',
        title: 'Design systems establishing a consistent AI-content marker',
        desc: 'Products shipping multiple AI-generated content surfaces (summaries, suggested replies, auto-tags) benefit from standardizing a single small badge component like .ai-tag used consistently everywhere, so users build a reliable mental model of what content across the product is machine-generated.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching the summarize-then-verify transparency pattern',
        desc: 'This snippet is a compact, complete reference for a pattern every team building AI summarization features should internalize: never ship a summary without a low-friction way for the user to check it against real source material. It generalizes to meeting summaries, support ticket digests, and AI-condensed reports of any kind.',
      },
      {
        icon: 'CODE',
        title: 'Retrofitting a verification path onto an existing AI summary feature',
        desc: 'Teams that shipped an AI review or feedback summary feature without a source-verification path can use this component\'s disclosure pattern as a drop-in addition — the excerpts panel and toggle button are self-contained and can be appended beneath an existing summary card with minimal restructuring.',
      },
      { icon: 'CODE', title: 'Related: Blog Post Card Grid', desc: 'See the [Blog Post Card Grid](/ui-snippets/blog-post-card-grid/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Guest WiFi Access Card', desc: 'See the [Guest WiFi Access Card](/ui-snippets/wifi-guest-access-card/) for a related cards pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Prescription Refill Card', desc: 'See the [Prescription Refill Card](/ui-snippets/prescription-refill-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How many source excerpt quotes should the disclosure panel show?',
        a: 'Two to three quotes per disclosure is usually enough to let a user spot-check the summary\'s key claims without turning the card into a full review list. Prioritize quotes that directly support the most prominent tags (highest bar width) and, if space allows, include at least one quote representing the negative theme so the disclosure does not read as cherry-picked positive evidence.',
      },
      {
        q: 'Should the tag bar percentages be based on review count or something else?',
        a: 'Base the bar width on relative mention frequency: count how many reviews mention each theme, then scale each bar relative to the most-mentioned theme (100% width) rather than an absolute scale, so the bars stay visually meaningful even as your total review count grows over time. Keep the raw count visible alongside the bar so users are not left guessing what the percentage is relative to.',
      },
      {
        q: 'Is it necessary to label AI-generated summaries explicitly, or can they blend in with regular content?',
        a: 'Explicit labeling is strongly recommended and increasingly expected by users. Presenting an AI-generated summary without any indication of its origin risks users treating an approximation as verified fact, and can damage trust if the summary is later found to have missed or softened a real issue. A small, consistent badge like the .ai-tag in this snippet costs very little visual space and meaningfully improves transparency.',
      },
      {
        q: 'What happens if the review count or theme data changes after the page has already loaded?',
        a: 'If your review data updates in near-real-time, re-fetch the summary and tag data on an interval or on page revisit rather than caching it indefinitely, and re-run the bar-fill animation (reset width to 0% then animate to the new target) so returning users notice the numbers have been refreshed rather than assuming stale data is current.',
      },
      {
        q: 'Can this pattern work for summarizing something other than product reviews, like support tickets or meeting notes?',
        a: 'Yes — the same structure (a short AI-generated summary line, a small set of theme tags with proportional indicators, and a disclosure toggle revealing real source snippets) applies directly to summarizing support ticket clusters, meeting transcripts, or survey responses. The core requirement stays the same: whatever the AI condenses, give the user an easy way to check the condensation against the real source material.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the tag bars are animated in with a double requestAnimationFrame call instead of just setting the width directly, and whether that technique is necessary in your specific framework (React, for instance, has its own patterns for mount-triggered transitions). It's also worth asking the assistant to help you wire the sentiment line, tag list, and excerpt quotes to a real review aggregation pipeline or API response instead of the hard-coded demo data, and to design a sensible fallback UI for when a product has too few reviews for a meaningful AI summary to be generated at all. Finally, ask it to help extend the disclosure pattern to support pagination if you want to reveal more than 2-3 excerpts on demand.`,
      prompt: `Build an AI-generated review summary card in plain HTML, CSS, and JavaScript that summarizes many customer reviews with a verification path back to real source quotes.

Requirements:
- Show a small, consistent "AI Summary" badge in the card header so the content is clearly marked as machine-generated, plus an overall star rating and a one-sentence AI-generated sentiment summary referencing at least one specific positive and one specific negative theme.
- Show 3-4 theme tag chips (color-coded positive/negative), each paired with a horizontal bar indicator whose fill width represents that theme's relative mention frequency compared to the others, and a raw mention count (e.g. +42 or -8) next to each bar.
- Include a disclosure line stating how many total reviews the summary was generated from, that toggles open a panel of 2-3 real, individually attributed excerpt quotes directly supporting the summarized themes when clicked — using a smooth height/opacity transition, not an instant show/hide.
- The disclosure toggle must be a real button with aria-expanded reflecting open/closed state, and an icon (e.g. a chevron) that visually rotates to match the state.
- Animate the tag bars filling in from zero width shortly after the card first renders, to reinforce that the proportions are computed from real data rather than static.
- Keep the whole component self-contained and ready to be wired to a real review aggregation backend by replacing the hard-coded summary text, tag data, and excerpt quotes with dynamic values.`,
    },
  },
};
export default aiReviewSummaryCard;
