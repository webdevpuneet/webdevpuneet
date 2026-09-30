---
name: feedback-about-deep-dive
description: "about.description in seo: blocks must be a deep technical dive — how the component works internally, not just what it does"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8d4305db-14dd-40fa-8ff0-b15ff5e349bb
---

The `about.description` text in every `seo:` block must be a deep dive into *how* the component is built — the specific HTML structure, CSS techniques, JS algorithms, and browser APIs used. Not a feature list, not marketing copy.

**Why:** User wants readers (and search engines) to see technical depth that demonstrates expertise and matches "how to build X" search intent. Thin content that only describes output features is not acceptable.

**How to apply:** For each snippet, explain: the DOM/SVG structure, the key CSS technique (e.g. stroke-dasharray, clip-path, CSS custom properties), the JS algorithm (e.g. requestAnimationFrame, IntersectionObserver, touch events), any math involved (e.g. polar coordinates, bezier curves), edge cases handled, and how to customise. Write as a technical walkthrough, minimum 1200 words. Include specific property names, values, and patterns a developer would search for.
