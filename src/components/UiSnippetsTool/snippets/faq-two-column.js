const faqTwoColumn = {
  id: 'faq-two-column',
  title: 'Two-Column FAQ',
  lastmod: '2026-07-18',
  category: 'layouts',
  html: `<section class="fq-section">
  <div class="fq-head">
    <span class="fq-eyebrow">Support</span>
    <h2 class="fq-title">Frequently asked questions</h2>
    <p class="fq-sub">Everything you need to know about the product and billing.</p>
  </div>

  <div class="fq-grid" id="fqGrid"></div>
</section>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #fff; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 24px; }

.fq-section { width: 100%; max-width: 820px; }

.fq-head { text-align: center; margin-bottom: 30px; }
.fq-eyebrow {
  display: inline-block;
  font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: #6366f1;
  margin-bottom: 8px;
}
.fq-title { font-size: 30px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
.fq-sub { font-size: 15px; color: #64748b; margin-top: 8px; }

.fq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 24px;
  align-items: start;
}

.fq-item {
  border: 1px solid #e8edf3;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  transition: border-color 0.18s, box-shadow 0.18s;
}
.fq-item.open { border-color: #c7d2fe; box-shadow: 0 8px 24px rgba(99, 102, 241, 0.08); }

.fq-q {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 16px 18px;
  background: none; border: none; cursor: pointer; text-align: left;
  font-family: inherit; font-size: 15px; font-weight: 600; color: #1e293b;
}
.fq-icon {
  width: 22px; height: 22px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  color: #6366f1;
  transition: transform 0.3s ease;
}
.fq-icon svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; }
.fq-item.open .fq-icon { transform: rotate(45deg); }

.fq-a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}
.fq-item.open .fq-a { grid-template-rows: 1fr; }
.fq-a-inner { overflow: hidden; }
.fq-a-inner p { padding: 0 18px 17px; font-size: 14px; line-height: 1.6; color: #64748b; }

@media (max-width: 620px) {
  .fq-grid { grid-template-columns: 1fr; }
  .fq-title { font-size: 25px; }
}`,
  js: `const FAQS = [
  { q: 'Do you offer a free trial?', a: 'Yes — every plan includes a 14-day free trial with full access to all features. No credit card is required to start, and you can cancel any time during the trial without being charged.' },
  { q: 'Can I change plans later?', a: 'Absolutely. You can upgrade or downgrade at any time from your billing settings. Upgrades take effect immediately and we prorate the difference; downgrades apply at the start of your next cycle.' },
  { q: 'How does billing work?', a: 'Plans are billed monthly or annually, and annual billing saves you two months. You can pay by card or, on higher tiers, by invoice. Every payment generates a downloadable receipt.' },
  { q: 'Is my data secure?', a: 'All data is encrypted in transit with TLS and at rest with AES-256. We run automated daily backups, and we never sell or share your data with third parties.' },
  { q: 'Do you support team accounts?', a: 'Yes. You can invite teammates, assign roles, and manage permissions from a single dashboard. Billing is consolidated, so you receive one invoice for the whole team.' },
  { q: 'What if I need to cancel?', a: 'You can cancel in two clicks from your account page, no email or phone call required. Your plan stays active until the end of the period you have already paid for.' },
];

const grid = document.getElementById('fqGrid');

FAQS.forEach((item, i) => {
  const el = document.createElement('div');
  el.className = 'fq-item';
  const aId = 'fq-a-' + i;
  const qId = 'fq-q-' + i;
  el.innerHTML =
    '<button class="fq-q" id="' + qId + '" type="button" aria-expanded="false" aria-controls="' + aId + '">' +
      '<span>' + item.q + '</span>' +
      '<span class="fq-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>' +
    '</button>' +
    '<div class="fq-a" id="' + aId + '" role="region" aria-labelledby="' + qId + '"><div class="fq-a-inner"><p>' + item.a + '</p></div></div>';

  const btn = el.querySelector('.fq-q');
  btn.addEventListener('click', () => {
    const open = el.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  grid.appendChild(el);
});`,
  seo: {
    title: 'Two-Column FAQ — Free HTML CSS JS Accordion Snippet',
    description: 'A responsive two-column FAQ accordion with grid-rows expand animation, rotating plus icons and ARIA wiring. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Two-Column FAQ — Responsive Accordion Grid with grid-template-rows Animation',
      description: `A long single-column FAQ pushes important questions far down the page; a two-column layout fits twice as many above the fold and reads faster. This component is a responsive two-column FAQ where each question is an independently expandable accordion item, the columns collapse to one on mobile, and the open/close animation uses the modern \`grid-template-rows\` technique that animates to a content's natural height without measuring it in JavaScript. It is built in semantic HTML, CSS, and a small data-driven script.

**The two-column grid that collapses**

The FAQ items live in a CSS grid with \`grid-template-columns: 1fr 1fr\` and \`align-items: start\`, which is the important detail: \`start\` alignment lets each item size to its own content height rather than stretching to match its row neighbour, so an expanded question on the left does not drag an empty gap onto the collapsed one on the right. A single media query at 620px switches the grid to one column, so on phones the FAQ becomes a familiar vertical stack. Each item is its own card with a border that brightens and lifts with a shadow when open.

**Animating height with grid-template-rows**

The hard part of any accordion is animating to "auto" height — you cannot CSS-transition to \`height: auto\`. The classic workarounds are measuring \`scrollHeight\` in JavaScript or animating \`max-height\` to a guessed value (which makes the timing wrong for short or long answers). This component uses the modern fix instead: the answer is a grid container set to \`grid-template-rows: 0fr\`, and opening transitions it to \`1fr\`. An inner wrapper with \`overflow: hidden\` clips the content as the row grows. Because \`0fr\` to \`1fr\` is an animatable transition, the answer smoothly expands to exactly its natural height — no measurement, no magic numbers, correct for any answer length.

**The rotating plus-to-cross icon**

Each question shows a plus icon that rotates 45 degrees into a cross when its item opens, driven purely by \`transform: rotate(45deg)\` on the \`.open\` state with a CSS \`transition\`. Using a single plus that rotates — rather than swapping a plus SVG for a minus SVG — gives a continuous, satisfying motion and means there is no icon-swap flicker. The whole question row is a real \`<button>\`, so it is keyboard-focusable and operable with Enter or Space out of the box.

**Independent accordion items**

Unlike a single-open accordion, every item here toggles independently — opening one does not close the others, which suits an FAQ where a visitor may want several answers open at once for comparison. The click handler simply toggles the \`.open\` class on that item and flips its \`aria-expanded\`. If you prefer single-open behaviour (only one answer visible at a time), the FAQ section explains the one-line change.

**Accessible disclosure wiring**

Each question button has \`aria-expanded\` reflecting its state and \`aria-controls\` pointing at its answer's \`id\`; the answer region has \`role="region"\` and \`aria-labelledby\` pointing back at the question. This is the WAI-ARIA disclosure pattern, so screen readers announce each question as an expandable control and associate the revealed text with the question that owns it. The ids are generated per item in the render loop, so they stay unique no matter how many questions you add.

**Customisation**

The FAQ is driven by a \`FAQS\` array of \`{ q, a }\` objects — add, remove, or reorder questions there and the grid rebuilds. Items fill the two columns in source order (left, right, left, right…), so order your most important questions first. Swap the \`#6366f1\` accent used by the eyebrow, icon, and open-state border, change the 0.3s expand duration, and edit the header eyebrow, title, and subtitle to match your section. To add a JSON-LD FAQ schema for SEO, mirror the same \`FAQS\` array into a \`@type: FAQPage\` script — the data is already in the right shape.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A two-column FAQ renders with a centered heading and six collapsible question cards.` },
      { title: 'Click a question', text: `Its card highlights, the plus icon rotates into a cross, and the answer smoothly expands to its full height.` },
      { title: 'Open several at once', text: `Each item toggles independently, so visitors can keep multiple answers open to compare.` },
      { title: 'Resize the window', text: `Below 620px the two columns collapse into a single vertical stack for mobile.` },
      { title: 'Edit the questions', text: `Change the FAQS array of { q, a } objects — the grid rebuilds and ARIA ids stay unique automatically.` },
      { title: 'Match your brand', text: `Swap the #6366f1 accent and edit the eyebrow, title, and subtitle in the header markup.` },
    ]},
    features: [
      { title: 'Responsive two-column grid', text: `grid-template-columns: 1fr 1fr with align-items: start so items size to their own height; collapses to one column under 620px.` },
      { title: 'grid-template-rows height animation', text: `Animates 0fr to 1fr so each answer expands to its exact natural height — no scrollHeight measuring, no max-height guesswork.` },
      { title: 'Rotating plus-to-cross icon', text: `A single plus rotates 45° into a cross via CSS transform, giving continuous motion with no icon-swap flicker.` },
      { title: 'Independent toggles', text: `Each question opens and closes on its own, ideal for comparing multiple answers at once.` },
      { title: 'Data-driven', text: `A FAQS array builds every card and generates unique ARIA ids per item in the render loop.` },
      { title: 'WAI-ARIA disclosure pattern', text: `aria-expanded, aria-controls, role=region, and aria-labelledby wire each question to its answer for screen readers.` },
      { title: 'Keyboard operable', text: `Each question is a real <button>, focusable and toggled with Enter or Space out of the box.` },
      { title: 'Schema-ready data', text: `The { q, a } array maps directly to a JSON-LD FAQPage block for rich-result eligibility.` },
    ],
    useCases: [
      { title: 'Pricing and billing FAQs', text: `Answer the objections that block a purchase right beside your plans — pair with a [pricing card](/ui-snippets/pricing-card/) or a [pricing toggle](/ui-snippets/pricing-toggle/).` },
      { title: 'Product and feature pages', text: `Address common how-does-it-work questions without cluttering the main copy; for a searchable variant use the [FAQ search accordion](/ui-snippets/faq-search-accordion/).` },
      { title: 'Support and help centers', text: `Group the most-asked questions two-up so users find answers faster than scrolling a long list.` },
      { title: 'Landing pages', text: `Place a tight FAQ above the footer to handle last-minute hesitation before the CTA; complements a [callout box](/ui-snippets/callout-box/) for key notes.` },
      { title: 'Event and course pages', text: `Cover schedule, refunds, and prerequisites in a compact two-column block.` },
      { title: 'Learning accordion animation', text: `A reference for the modern grid-template-rows expand technique and the ARIA disclosure pattern.` },
      { icon: 'CODE', title: 'Related: Live Code Playground', desc: 'See the [Live Code Playground](/ui-snippets/live-code-playground/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the height animation work without JavaScript measuring?', a: `The answer is a CSS grid set to grid-template-rows: 0fr, and opening transitions it to 1fr. An inner wrapper with overflow: hidden clips the content while the row grows. Because 0fr→1fr is an animatable value, the browser expands the row to the content's natural height on its own — no scrollHeight read, no guessed max-height. This is the most reliable accordion animation technique in modern browsers.` },
      { q: 'How do I make only one answer open at a time?', a: `In the click handler, before toggling the clicked item, loop the other .fq-item elements and remove their .open class (and reset their button's aria-expanded to false). That gives single-open "exclusive" accordion behaviour. Leaving the handler as-is keeps the default independent behaviour where multiple answers can be open together.` },
      { q: 'Why do my columns have uneven gaps when one item is open?', a: `That is usually a missing align-items: start on the grid. Without it, grid items stretch to the tallest in their row, so opening one item adds empty space to its neighbour. With align-items: start, each item sizes to its own content and the columns stay tight regardless of which answers are open.` },
      { q: 'How do I add FAQ schema for SEO?', a: `Your FAQS array is already in the right shape. Build a JSON-LD object with @type: FAQPage and a mainEntity array mapping each { q, a } to a Question with an acceptedAnswer, then inject it in a <script type="application/ld+json">. This makes the page eligible for FAQ rich results. Keep the visible answers and the schema text identical, as search engines expect them to match.` },
      { q: 'How do I use this FAQ in React, Vue, or Angular?', a: `Render the FAQS array with .map/v-for/*ngFor and track open state — either a Set of open indices (for independent toggles) or a single openIndex (for exclusive). Bind the .open class and aria-expanded to that state. All the CSS, including the grid-template-rows animation and the icon rotation, ports unchanged; only the toggle state moves into the framework. Generate stable ids from the index for aria-controls / aria-labelledby.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to guess why the two-column layout doesn't leave awkward gaps. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why align-items start on the grid is necessary to keep an expanded item on one column from stretching its row-neighbor in the other column, and how the grid-template-rows zero-fraction-to-one-fraction transition avoids the classic "can't animate to height auto" problem. The same assistant can help optimize it — ask whether the current independent-toggle behavior (every item opens on its own) should become exclusive single-open for a very long FAQ list, and what the one-line change to the click handler would look like. It's also useful for extending the section: ask it to generate a matching JSON-LD FAQPage schema block directly from the same FAQS array for rich search results, add category tabs above the grid to filter which questions show, or add deep-linking so a URL hash can open a specific question on page load. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a responsive two-column FAQ accordion in plain HTML, CSS, and JavaScript with independently-toggling items and full ARIA wiring — no library.

Requirements:
- Render every question-and-answer pair from a single data array of objects, generating a unique id per item in the render loop for use in ARIA attributes — do not hardcode the markup for each question.
- Lay the items out in a CSS grid with two equal columns and align-items set to start (not stretch), so an expanded item in one column never forces its row-neighbor in the other column to grow to match its height; collapse to a single column below a defined mobile breakpoint.
- Animate each answer's expand/collapse using a CSS grid-template-rows transition between a zero-fraction and a one-fraction row (with an inner overflow-hidden wrapper) rather than any JavaScript height measurement or a fixed max-height value, so it works correctly for answers of any length.
- Use a single plus-shaped icon per question that rotates 45 degrees into an X via a CSS transform transition when its item is open, instead of swapping between two different icons.
- Make every item toggle independently of the others (opening one must not close any other item), and wire full disclosure ARIA semantics: each question button needs aria-expanded reflecting its state and aria-controls pointing at its answer's id, and each answer region needs role region and aria-labelledby pointing back at its question's id.
- Explain, in a comment or to the user, how the same underlying data array could be mirrored into a JSON-LD FAQPage schema block for search engine rich results without duplicating the question and answer text.`,
    },
  },
};

export default faqTwoColumn;
