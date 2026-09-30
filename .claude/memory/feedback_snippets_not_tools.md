---
name: feedback-snippets-not-tools
description: "UI snippets must be reusable UI components, NOT generators/calculators/converters (those belong as standalone tools)"
metadata:
  type: feedback
---

When creating UI snippets (the UiSnippetsTool library), do **not** create generators, calculators, converters, or other utility "tools" — they belong as standalone tools under `src/app/[slug]`, not in the snippet gallery. Avoid anything whose core purpose is computing/transforming a value: percentage/age/tip calculators, UUID/lorem-ipsum/slug/border-radius/gradient/shadow generators, unit/temperature/case converters, reading-time estimators, etc.

**Create instead:** reusable UI components and screens useful for building real interfaces — e.g. mobile screens, tablet screens, device/browser mockups, login screens, lock screens, status bars, app chrome, cards, navigation, controls, indicators, charts, layouts, loaders, animations.

**Litmus test:** if the snippet's name would naturally end in `-calculator`, `-generator`, or `-converter`, it's a tool, not a snippet — don't add it. Form *inputs/pickers* (e.g. a duration picker, a quantity stepper) are fine because they're reusable UI controls that capture a value rather than compute an answer.

**Why:** The snippet gallery is for copy-paste UI building blocks. Tools dilute it and overlap the dedicated tools section. See [[feedback-snippet-seo-standard]] and [[project-new-tool-checklist]].

**How to apply:** Before adding a snippet, check it's a UI component, not a utility. If a past batch added calculators/generators/converters, delete those files and unregister them from `snippets.js`.
