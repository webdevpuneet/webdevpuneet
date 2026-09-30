---
name: SEO interlinking pattern for tool pages
description: Add contextual inline links to related tools inside SEO text — no closing paragraph, just natural in-context links
type: feedback
originSessionId: 92e683b1-fc16-4ab6-8ceb-0ee6fada5fbf
---
When writing or updating SEO content for any tool, add `[anchor text](/slug)` inline links to related tools naturally within existing feature descriptions, step text, and card descriptions. Do NOT add a dedicated closing paragraph just for links.

**Why:** Inline contextual links within real content sentences are what Google values. A separate "complementary tools" paragraph feels promotional and adds no user value.

**How to apply:** Use the `[text](/slug)` markdown syntax anywhere in `text`, feature `items`, step `text`, or card `desc` strings — `SeoSection`'s `renderInline` handles rendering automatically.

- 3–6 links per page total, spread naturally across sections
- Only link where the related tool is genuinely relevant to the sentence — don't force it
- Use descriptive anchor text (e.g. "use [JWT Decoder](/jwt-decoder) to inspect token claims" not just "[JWT Decoder](/jwt-decoder)")
- Do not add links inside headings or FAQ question text
- Do not add a standalone "Need complementary tools?" paragraph
