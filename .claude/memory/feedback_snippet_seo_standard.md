---
name: feedback-snippet-seo-standard
description: "Best practices for writing high-quality SEO content for UI snippet pages — structure, word counts, technical depth required"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8d4305db-14dd-40fa-8ff0-b15ff5e349bb
---

When writing SEO content for a UI snippet, follow this standard (time-picker.js is the gold reference):

## Required structure for each snippet `about` object

```js
about: {
  title: 'Snippet Name — HTML CSS JavaScript',  // ≤60 chars, no keyword stuffing
  description: 'One-sentence summary...',         // 140–160 chars exactly
  about: `Multi-paragraph prose...`,              // 400+ words, \n\n between paragraphs
  howToUse: [...],   // 5–6 steps, { step, desc }, each desc 1–3 sentences
  features: [...],   // 7–8 items, { title, desc }, technical descriptions
  useCases: [...],   // 5–6 items, { title, desc }, with 3–6 interlinks in desc text
  faqs: [...],       // 4–5 items, { q, a }, detailed answers with code examples
}
```

## `about` text (400+ words, 5–8 paragraphs)

Structure:
1. **Intro** — what pattern this implements, why it matters in UI/UX (50–70w)
2. **Section: Implementation detail** — e.g., how the layout works with bold `**Section title**`
3. **Section: Core algorithm** — e.g., how the animation/calculation works
4. **Section: Event handling** — how mouse/touch/keyboard is handled
5. **Section: Edge cases** — what prevents bugs (infinite loops, apostrophe issues, etc.)
6. **Section: Customization** — how to swap in real data / change colors / connect to API

Each `**Section title**` line is followed by \n\n and 2–4 sentences explaining the technical mechanism. Use \`backticks\` for code identifiers and function names.

## Technical depth required

The about text must explain HOW the snippet was built — not just WHAT it does. For each key mechanism:
- Name the specific CSS property, API, or algorithm used
- Explain why that approach was chosen over the alternative
- Mention any non-obvious pitfall (e.g., `display:none` prevents CSS transitions → need double-rAF)

## Word count targets

- Total SEO block: **1200+ words** (measured across all fields)
- about text: 400–600 words
- Each FAQ answer: 40–80 words with specific code examples where relevant

## howToUse step quality

Each step should describe what the user SEES, not just what they DO:
- Bad: "Click the button to start"
- Good: "Click Start Tour — the overlay dims and a spotlight appears around the sidebar navigation"

## useCases interlinks

Every useCases entry should have an inline `[text](/ui-snippets/id/)` link to a related snippet:
- Link format: `/ui-snippets/{id}/` (no category prefix)
- 3–6 links total across all use cases
- Embed naturally: "Pair with a [confetti button](/ui-snippets/confetti-button/) when prize is revealed"

## SERP title & description rules (CTR — enforced 2026-06-12 across all 195 snippets)

- `seo.title` ≤60 chars, keyword-first: `{Component} — Free HTML CSS JS Snippet` (optionally one differentiator: `Modal Dialog — Free HTML CSS JS Popup Snippet`). Google truncates at ~580px; front-load the component keyword, never let value props sit past char 60.
- `seo.description` 140–160 chars = ONE snippet-specific technical detail + the framework-export hook: `Exports to React, Vue & Tailwind.` / `Copy-paste or export to React, Vue, Angular & Tailwind.` — VARY the phrasing across snippets to avoid near-duplicate boilerplate.
- The export hook is the site's differentiator vs other snippet sites — it must appear in the description.
- Every snippet's seo block must mention the framework exports somewhere in body content (description or a FAQ) so the page can rank for long-tail "{component} react/vue component" queries. If the deep-dive FAQs don't cover it, add one: `Can I use this {component} in React, Vue, or Angular?` with a snippet-SPECIFIC porting note (where the JS goes: useEffect/onMounted/ngAfterViewInit, refs vs state, cleanup returns) — never a copy-pasted generic answer.
- Verify with `node scripts/audit-snippet-seo.mjs` — reports titles >60, descriptions outside 120–165, and snippets missing tailwind/angular mentions. Must show 0 violations. Bulk rewrites: `scripts/apply-seo-rewrites.mjs` (map in `scripts/seo-rewrites.mjs`), FAQ inserts: `scripts/add-framework-faqs.mjs`.
- Do NOT add FAQPage schema (Google restricted FAQ rich results to authority sites in 2023) or meta keywords.

## Common mistakes to avoid

- Don't put apostrophes unescaped inside single-quoted JS strings: `'they\'re'` not `'they're'`
- Don't reference constants/functions that don't exist in the actual code
- Don't copy boilerplate across snippets — each technical section must be specific to that snippet's code
- meta description must be 140–160 chars (not 200+)
- title must be ≤60 chars
- The page consumes `sn.seo.*` keys ([slug]/page.js merges per-field over a generic fallback) — a top-level `about:` key is IGNORED; always use `seo: { title, description, about, howToUse, features, useCases, faqs }`

**Why:** User requires 1200+ words per snippet, technical walkthrough that matches the time-picker quality standard, with search-intent-focused prose and interlinks.

**How to apply:** When creating or auditing any UI snippet, check word count, verify all code references exist, ensure apostrophes are escaped in single-quoted strings, and verify description length.
