---
name: New Tool Checklist
description: Steps to follow every time a new tool is added to the DevTools project
type: project
originSessionId: 92e683b1-fc16-4ab6-8ceb-0ee6fada5fbf
---
When adding a new tool to `c:\Projects\tools`, always do ALL of the following:

## Files to create

1. `src/components/[ToolName]/index.js` — React component (`'use client'`)
2. `src/components/[ToolName]/styles.module.css` — CSS module using global CSS vars
3. `src/app/[slug]/page.js` — Next.js page with full SEO metadata + SeoSection + JSON-LD FAQPage schema
4. `public/icons/[slug].svg` — 32×32 SVG favicon

## Tool component layout — required structure

Every tool component **must** have a header bar at the top. Structure:

```jsx
<div className={s.wrap}>           {/* flex-direction: column; height: 100% */}
  <div className={s.header}>       {/* 48px tall, border-bottom, flex row */}
    <div className={s.logo}>
      <div className={s.logoIcon}> {/* 28×28px icon box with accent bg + border */}
        <svg>...</svg>
      </div>
      <span>Tool Name <span className={s.accent}>Subtitle</span></span>
    </div>
    <div className={s.headerRight}>
      <span className={s.hint}>Live preview · key features</span>
    </div>
  </div>
  <div className={s.body}>         {/* flex: 1; display: flex; overflow: hidden */}
    <div className={s.left}>...</div>
    <div className={s.right}>...</div>
  </div>
</div>
```

Header CSS pattern (copy from CssButtonGeneratorTool or ToggleSwitchGeneratorTool):
- `.wrap`: `flex-direction: column`
- `.header`: `min-height: 48px; border-bottom: 1px solid var(--border); background: var(--surface); display: flex; align-items: center; gap: 12px; padding: 7px 14px; flex-shrink: 0`
- `.logoIcon`: `width: 28px; height: 28px; border-radius: 7px; background: rgba([accent], 0.1); border: 1px solid rgba([accent], 0.28); display: flex; align-items: center; justify-content: center`
- `.accent`: `color: [tool accent color]`
- `.hint`: `font-size: 11px; color: var(--text3)`
- `.body`: `flex: 1; display: flex; overflow: hidden`

## Files to update

5. `src/components/Sidebar/index.js` — add to TOOLS array `{ slug, name, sub, href }`
6. `src/app/page.js` — add to TOOLS array `{ href, name, desc, icon, accent }`
7. `scripts/postbuild.js` — add the new route to the `NEW_ROUTES` array so it gets added to sitemap.xml on next build
8. `src/lib/related-tools.js` — add an entry for the new slug with 6–8 related tool slugs; pick tools that share audience or workflow (e.g. a CSS tool relates to other CSS tools; a text tool relates to diff-checker, regex-tester, etc.)

## Page structure (src/app/[slug]/page.js)

```js
import [Tool] from '@/components/[ToolName]';
import SeoSection from '@/components/SeoSection';
import styles from '../tool-page.module.css';

export const metadata = { /* full SEO metadata */ };

const faqSchema = { /* JSON-LD FAQPage schema with 6+ Q&A */ };

const SEO = {
  about: { title: '...', description: '...' },
  features: [...],   // 8 bullet strings
  useCases: [...],   // 6 × { icon, title, desc }
  faqs: [...],       // 8 × { q, a }
};

export default function Page() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className={styles.toolSection}><[Tool] /></div>
      <SeoSection {...SEO} />
    </div>
  );
}
```

## SEO content rule — keyword targeting (applies to new tools AND feature updates)

All SEO text must match the actual Google search queries users type — not feature descriptions or marketing language. Before writing any SEO content, identify the keyword phrases people would search for when they need this tool.

- **`faqSchema.mainEntity` `name` fields** — phrase as real Google search queries. This is the highest-leverage SEO field. Bad: "What does this tool do?" Good: "How do I convert rem to px in CSS?"
- **`about.description`** — weave keyword phrases naturally into the paragraphs
- **`features`** — each bullet must include the searchable phrase, not just the feature name
- **`useCases`** — titles must contain the keyword phrase for the use case
- **`metadata.description`** — include the top 2–3 keyword phrases

## sitemap.xml

- Lives at `c:\Projects\tools\sitemap.xml` (project root)
- Existing entries must NEVER be deleted — they contain old tools from before the Next.js migration
- `scripts/postbuild.js` appends NEW_ROUTES that don't already exist in the file on every build
- After adding a new tool, add its route to `NEW_ROUTES` in `scripts/postbuild.js`

## robots.txt

- Lives at `c:\Projects\tools\robots.txt` (project root)
- Copied into `out/` and `tools/` automatically by `scripts/postbuild.js` after every build

**Why:** User wants all tools discoverable via sitemap, SEO-complete with FAQ schema, keyword-targeted content, and consistent component/page structure.
