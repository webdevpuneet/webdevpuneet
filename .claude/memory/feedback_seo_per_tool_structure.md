---
name: feedback-seo-per-tool-structure
description: "Each tool/snippet's SeoSection content structure should be chosen to fit that specific tool, not copy-pasted as an identical template"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c998e8a2-9eff-448c-8d9a-1240899ea587
---

When doing the comprehensive content pass (see [project_content_audit](project_content_audit.md)), don't force the exact same section shape (1 comparison table + 2 callouts + N use-case cards, etc.) onto every page. Choose whichever `SeoSection` section types (`text`, `table`, `callout`, `steps`, `cards`, `faq`, `timeline`, `2col`, `image`) actually fit that tool's subject matter.

**Why:** the user corrected this after watching the mesh-gradient-generator treatment (table + 2 callouts + cards) get mechanically reapplied to svg-wave-generator. Identical structure across dozens of pages reads as templated/thin to both readers and search engines, even if the word count is high — the goal is genuinely useful, tool-specific content, not a fill-in-the-blanks pattern.

**How to apply:** before adding sections to a tool page, think about what's actually useful for *that* tool — e.g. a unit-converter tool benefits from a conversion-reference table; a color tool benefits from a palette/contrast callout; a calculator benefits from a worked-example walkthrough; a code-formatter may not need a comparison table at all. Reuse mesh-gradient-generator and svg-wave-generator as *examples of the pattern library*, not as a fixed checklist to replicate everywhere. Related: [feedback_seo_content_volume](feedback_seo_content_volume.md) still applies (800–1200+ words), but the shape of how that volume is achieved should vary per tool.
