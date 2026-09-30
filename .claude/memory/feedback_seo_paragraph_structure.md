---
name: SEO paragraph structure in page.js files
description: How to structure multi-paragraph SEO text and what the SeoSection component supports
type: feedback
originSessionId: 8894e604-ac40-4057-9bfb-0a44c7066ad8
---
Always write `about.description` and `howToUse` in page.js as multi-paragraph template literals using `\n\n` to separate paragraphs. The `SeoSection` component splits on `\n\n` and renders each paragraph as a separate `<p>` tag, so blank lines between paragraphs are required for them to render correctly.

The component also renders inline markdown: `**bold**` → `<strong>`, `` `code` `` → `<code>` (styled as inline code).

FAQ `a:` answers are rendered the same way — use `\n\n` in long answers if they need multiple paragraphs.

**Why:** Before this fix the component rendered everything inside a single `<p>` tag, making `\n\n` breaks invisible. The component was updated to split properly. Going forward, content must use `\n\n` to get visible paragraph breaks.

**How to apply:** When writing new tool pages or updating SEO content, break long text into 2–4 logical paragraphs with blank lines. Never write a single wall of text for `about.description` or `howToUse`.
