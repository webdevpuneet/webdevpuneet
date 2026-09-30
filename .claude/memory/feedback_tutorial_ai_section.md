---
name: feedback-tutorial-ai-section
description: "every tutorial blog post needs a \"Build, understand, optimize, and extend it with AI\" section before Final thought"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 56e319f8-32a7-4afd-8726-85c01b922529
---

Every tutorial blog post in `blog/blog-posts/tutorials/` must include an `<h2>Build, understand, optimize, and extend it with AI</h2>` section, placed directly before the final `<h2>Final thought</h2>` section.

**Why:** User wants readers pointed at using an AI coding assistant (e.g. Claude) to understand the snippet's trickier mechanics, optimize it, and extend it with new features — not just read the post passively.

**How to apply:** Write one paragraph, tailored to the specific snippet (name real functions/CSS properties/constants from that snippet, not generic advice), covering three things in order: (1) understand — ask the AI to explain a specific non-obvious mechanic in the code; (2) optimize — a concrete performance/scaling question specific to that snippet; (3) extend — 2-3 concrete feature ideas specific to that snippet. Close with a version of "Treat the code less like a finished artifact and more like a starting point for a conversation." Applied retroactively to tutorial1.txt, tutorial2.txt, and tutorial3.txt on 2026-07-17 — use those as the template for tone and specificity.

Immediately after that paragraph, add an `<h3>Prompt to recreate it</h3>` sub-section: one lead-in sentence, then a `<pre><code class="language-text">` block containing a copy-paste prompt that names the snippet's real constraints (exact technique required, e.g. "CSS 3D transforms only, no canvas") and lists the specific mechanics/requirements a correct rebuild must satisfy (the same specifics called out in the tutorial body, phrased as build requirements rather than explanations). Added to all three tutorials on 2026-07-17.
