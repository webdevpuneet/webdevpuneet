---
name: SEO must target Google search keywords — new tools and feature updates
description: All page.js SEO content must match actual Google search queries users type — applies when creating a new tool AND when adding features to an existing tool
type: feedback
---
Every time you write or update a tool's `src/app/<tool-name>/page.js`, the SEO content must be written to match the exact keyword phrases people search for on Google. This rule applies in two situations:

1. **Creating a new tool** — write all SEO from scratch with keyword targeting
2. **Adding a feature to an existing tool** — update the existing SEO to cover the new feature's search queries

**Why:** Features and tools that aren't represented by the right keyword phrases in the SEO content don't get found. The content must contain the exact phrases people type into Google — not feature names, not marketing language.

---

## How to identify the right keywords

Think of what a user would type into Google when they have the problem this tool or feature solves:

- JSON repair → "fix broken json online", "javascript object to json", "json single quotes error", "trailing comma json error"
- JSON path → "json path finder online", "how to access nested json field", "jsonpath online tool"
- REM converter → "rem to px converter", "convert rem to pixels", "css unit calculator"
- HTML formatter → "format html online", "html beautifier", "html minifier online free"

Use these exact phrases naturally across all SEO fields.

---

## Fields to write/update — both new tools and feature additions

- **`faqSchema.mainEntity`** — most important for long-tail ranking. Each `name` field must be phrased exactly as a Google search query. Bad: "What does Repair do?" Good: "My JSON has single quotes and won't parse — how do I fix it?"
- **`SEO.about.description`** — weave target keyword phrases naturally into the paragraphs
- **`SEO.howToUse`** — include keyword phrases when describing steps
- **`SEO.features`** — each bullet must include the searchable phrase, not just the feature name
- **`SEO.useCases`** — titles and descriptions must contain keyword phrases naturally
- **`softwareSchema.featureList`** — add every feature
- **`metadata.description`** — include high-volume keyword phrases here

---

## FAQ question phrasing rule

The `name` field of each FAQ must read like a real Google search query. This is the single highest-leverage SEO field because Google pulls these directly into rich snippets.

- Bad: "What does the Repair feature do?"
- Good: "My JSON has single quotes and won't parse — how do I fix it?"
- Bad: "How do I use the path feature?"
- Good: "How do I find the path to a nested JSON field?"
