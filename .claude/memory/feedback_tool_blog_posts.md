---
name: feedback-tool-blog-posts
description: "Blog posts about individual fwdtools.com tools should focus on what the tool does and who it's for, not algorithm/implementation internals"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 28e96bb0-52c8-4375-b1e9-527521547fdf
---

Tool blog posts (blog/blog-posts/tools/*.txt) must skip "how it works under the hood" / algorithm-internals sections (e.g. no LCS/dynamic-programming explanations). Lead with what the tool does, who it's for, and how it helps the user — written for Google search intent and general readers, not a developer-audience deep-dive.

**Why:** These posts are for SEO/user acquisition on webdevpuneet.com — readers searching "diff checker online" want to know if the tool solves their problem, not how the DP table is built. A prior draft included a full LCS/backtracking algorithm walkthrough; the user cut it and said "there is no need to explain how it works but what it does who it is for - for all tools."

**How to apply:** Structure: hook on the user's problem → what the tool is / who needs it → real-world use-case list → step-by-step how-to-use → why it's worth using (privacy, free, no signup, etc.) → FAQ → CTA link. Must be plain copy-paste-ready HTML for Blogger (h1/p/h2/h3/ul/ol/li/a/iframe — no WordPress `<!-- wp:... -->` block comments). See [[project_content_audit]] for the broader content-quality push this fits into.
