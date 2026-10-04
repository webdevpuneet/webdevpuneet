import MarkdownEditorTool from '@/components/MarkdownEditorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Markdown Editor Online Free — Live Preview, Export MD & HTML | webdevpuneet.com',
  description: 'Write and preview Markdown in real time — GitHub Flavored Markdown, syntax toolbar, auto-save, and .md/.html export. Free online editor, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/markdown-editor/' },
  icons: { icon: '/icons/markdown-editor.svg', shortcut: '/icons/markdown-editor.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/markdown-editor/',
    siteName: 'webdevpuneet.com',
    title: 'Markdown Editor Online Free — Live Preview & Export',
    description: 'Write Markdown with live preview, toolbar shortcuts, and GitHub Flavored Markdown support. Export as .md or .html. Free, no sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/markdown-editor.png', width: 1200, height: 800, alt: 'Markdown Editor Online Free with Live Preview' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Markdown Editor Online — Live Preview, Export MD & HTML — Free',
    description: 'Real-time Markdown editor with GFM support, toolbar, auto-save, and one-click export to .md or .html. No install.',
    images: ['https://webdevpuneet.com/images/markdown-editor.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a Markdown editor?',
      acceptedAnswer: { '@type': 'Answer', text: 'A Markdown editor is a tool that lets you write text using Markdown syntax — a lightweight plain-text formatting language — and see the rendered HTML output in real time. Markdown uses simple symbols to indicate formatting: **text** becomes bold, *text* becomes italic, # starts a heading, - starts a list item, and so on. The rendered preview shows headings, bold text, tables, code blocks, and blockquotes as they would appear in a web page or README file. This online Markdown editor shows the rendered preview side-by-side with the source, updating instantly as you type.' },
    },
    {
      '@type': 'Question',
      name: 'What is GitHub Flavored Markdown (GFM)?',
      acceptedAnswer: { '@type': 'Answer', text: 'GitHub Flavored Markdown (GFM) is a superset of standard Markdown that adds several widely used extensions. GFM adds support for: tables using pipe characters (| Col 1 | Col 2 |), task lists with checkboxes (- [x] Done), strikethrough text (~~text~~), fenced code blocks with language hints (```javascript), and auto-linking of URLs. GFM is used on GitHub, GitLab, npm, many documentation platforms, and README files. This editor uses the marked library with GFM mode enabled, so all GFM features are supported and render correctly in the live preview.' },
    },
    {
      '@type': 'Question',
      name: 'How do I create a table in Markdown?',
      acceptedAnswer: { '@type': 'Answer', text: 'In GitHub Flavored Markdown, tables are created using pipe characters and hyphens. The format is:\n\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n\nThe second row with hyphens acts as the separator between the header row and the body. You can align columns left, center, or right by adding colons: |:---| for left, |:---:| for center, |---:| for right. Click the ⊞ button in the toolbar to insert a ready-made table template.' },
    },
    {
      '@type': 'Question',
      name: 'How do I create a task list in Markdown?',
      acceptedAnswer: { '@type': 'Answer', text: 'Task lists in GitHub Flavored Markdown use a dash followed by square brackets with a space or x: "- [ ] To do" for an unchecked item and "- [x] Done" for a checked item. In this editor, checked items render as a ticked checkbox and unchecked items render as an empty checkbox. Click the ☑ button in the toolbar to insert a task list item at the current cursor position.' },
    },
    {
      '@type': 'Question',
      name: 'Can I export my Markdown as HTML?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Click the ↓ .html button in the footer to download a complete standalone HTML file containing your rendered content. The exported file includes a minimal stylesheet for typography, code blocks, tables, and blockquotes — it is ready to open in any browser or publish to a static site. You can also click "Copy HTML" to copy the raw HTML fragment to the clipboard without the surrounding page structure.' },
    },
    {
      '@type': 'Question',
      name: 'Does the editor auto-save my work?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The editor automatically saves your content to your browser\'s localStorage after 1 second of inactivity. A "✓ Saved" indicator appears in the bottom-left corner when the save completes. When you reopen the editor, your last draft is automatically restored. The save is entirely local — no data is sent to any server. Click "Reset" in the header to clear the draft and reload the sample content.' },
    },
    {
      '@type': 'Question',
      name: 'What keyboard shortcuts does the editor support?',
      acceptedAnswer: { '@type': 'Answer', text: 'The editor supports the following keyboard shortcuts: Ctrl+B (Cmd+B on Mac) to toggle bold, Ctrl+I (Cmd+I) to toggle italic, Ctrl+K (Cmd+K) to insert a link, and Tab to insert two spaces for indentation. All toolbar buttons are also clickable. If you have text selected when pressing a formatting shortcut, the selected text is wrapped with the formatting markers. If no text is selected, a placeholder is inserted.' },
    },
    {
      '@type': 'Question',
      name: 'What view modes are available?',
      acceptedAnswer: { '@type': 'Answer', text: 'Three view modes are available via the segmented control in the header: Split shows the editor and preview side-by-side (the default on wide screens), Editor shows only the writing area for distraction-free writing, and Preview shows only the rendered output. The editor and preview scroll positions are kept approximately in sync in Split mode — scrolling in the editor scrolls the preview proportionally.' },
    },
    {
      '@type': 'Question',
      name: 'How do I insert a code block with syntax highlighting?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use triple backticks to create a fenced code block. Add a language name after the opening backticks to specify the language for syntax highlighting: ```javascript, ```python, ```css, etc. The live preview renders the code block with a monospace font and styled background. Click the ``` button in the toolbar to insert a blank code block template at the cursor position.' },
    },
    {
      '@type': 'Question',
      name: 'Is my content private? Is anything sent to a server?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely private. The Markdown editor runs entirely in your browser. Your text is never sent to any server — all rendering, parsing, and saving happens locally using JavaScript and the browser\'s localStorage API. There is no account, no cloud sync, and no analytics that capture your content. This makes the editor safe for writing private notes, internal documentation, or sensitive technical content.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Markdown Editor Online with Live Preview',
  url: 'https://webdevpuneet.com/markdown-editor/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online Markdown editor with real-time GitHub Flavored Markdown preview. Syntax toolbar, localStorage auto-save, export as .md or .html. 100% browser-based.',
  featureList: [
    'Real-time GitHub Flavored Markdown (GFM) preview',
    'Split view — editor and preview side-by-side',
    'Editor-only and Preview-only focus modes',
    'Toolbar: H1–H3, Bold, Italic, Strikethrough',
    'Toolbar: Inline code, code block, blockquote',
    'Toolbar: Unordered list, ordered list, task list',
    'Toolbar: Link, image, table, horizontal rule',
    'Keyboard shortcuts: Ctrl+B, Ctrl+I, Ctrl+K, Tab',
    'localStorage auto-save with 1-second debounce',
    'Draft restored automatically on next visit',
    'Proportional scroll sync between editor and preview',
    'Word count, character count, line count in footer',
    'Copy Markdown source to clipboard',
    'Copy rendered HTML fragment to clipboard',
    'Download as .md file',
    'Download as standalone .html file with embedded styles',
    'XSS-safe HTML rendering — strips scripts, event handlers, javascript: URLs',
    '100% client-side — no server, no sign-up, no data sent',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Markdown Editor', item: 'https://webdevpuneet.com/markdown-editor/' },
  ],
};

const SEO = {
  slug: 'markdown-editor',
  title: 'Markdown Editor Online Free — Live Preview & Export',

  about: {
    title: 'Write, Preview, and Export Markdown in Your Browser — No Install Required',
    description: `You open a README, write a doc, or draft a blog post in Markdown, but you're switching between a text file and a browser tab to see what it actually looks like. This tool puts the editor and the live preview side-by-side in a single page, updating the rendered output as you type — no save, no reload, no extension required.\n\nThe editor supports **GitHub Flavored Markdown (GFM)** — the same dialect used on GitHub, GitLab, npm, and most documentation platforms. That means tables, task lists with checkboxes, fenced code blocks with language identifiers, strikethrough, and auto-linking all work out of the box. The SAMPLE document that loads on first visit demonstrates every supported feature so you can see immediately what the tool can render.\n\nThe toolbar gives you one-click insertion for all the constructs that require exact syntax: heading levels, bold, italic, strikethrough, inline code, code blocks, blockquotes, unordered and ordered lists, task list items, links, images, tables, and horizontal rules. Keyboard shortcuts cover the most common operations — **Ctrl+B** for bold, **Ctrl+I** for italic, **Ctrl+K** for link — with Tab inserting two-space indentation.\n\nThe editor auto-saves to **localStorage** after 1 second of inactivity and restores your draft automatically on next visit. The "✓ Saved" indicator in the footer confirms each save. Three view modes let you switch between a side-by-side split for editing, a distraction-free editor-only mode, and a full-screen preview.\n\nWhen you're done, the footer gives you four export options: copy the raw Markdown source, copy the rendered HTML fragment, download a \`.md\` file, or download a complete standalone \`.html\` file with embedded typography styles — ready to open in any browser or drop into a static site.\n\nAll rendering happens in your browser using the [marked](https://marked.js.org) library. No content is ever sent to a server, logged, or stored outside your own browser's localStorage. Safe for private notes, internal docs, or any sensitive writing.`,
  },

  features: [
    '**Real-time GFM preview** — renders GitHub Flavored Markdown as you type; supports tables, task lists, fenced code blocks, strikethrough, and auto-links via the marked library',
    '**Split / Editor / Preview modes** — three view modes via the segmented control; Split shows editor and preview side-by-side; use [Diff Checker](/diff-checker) to compare two versions of a document',
    '**Formatting toolbar** — 15 buttons across 5 groups: H1–H3 headings, Bold/Italic/Strikethrough, inline code/code blocks, blockquote/ul/ol/task lists, and link/image/table/hr insertion',
    '**Keyboard shortcuts** — Ctrl+B bold, Ctrl+I italic, Ctrl+K link, Tab for two-space indentation; works with selected text (wraps selection) or without (inserts placeholder)',
    '**localStorage auto-save** — drafts saved after 1 s of inactivity and restored on next visit; "✓ Saved" indicator in footer; click Reset to clear; pairs well with [AI Prompt Studio](/ai-prompt-studio) for drafting prompts',
    '**Scroll sync** — editor and preview scroll positions stay approximately in sync in Split mode; proportional scroll based on percentage position',
    '**Live stats** — word count, character count, and line count update continuously in the footer as you write; useful for blog posts and documentation with length targets',
    '**Copy Markdown** — copies the raw source to clipboard for pasting into GitHub, GitLab, Notion, or any Markdown-aware input',
    '**Copy HTML** — copies the rendered HTML fragment; paste into any CMS, email template builder, or [HTML Formatter](/html-formatter) for cleanup',
    '**Export .md** — downloads a plain text \`.md\` file named `document.md`; ready to commit to a repository or open in any Markdown editor',
    '**Export .html** — downloads a complete standalone HTML page with embedded CSS reset for clean typography, code blocks, tables, and blockquotes; open in any browser',
    '**XSS-safe rendering** — inline sanitizer strips `<script>` tags, `<iframe>` embeds, `on*` event handlers, and `javascript:` URLs from rendered HTML before display; safe to use with untrusted Markdown input',
    '**100% client-side** — no server, no sign-up, no analytics capturing your content; works offline once loaded; all processing runs in the browser',
  ],

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Start writing or edit the sample', text: 'The editor loads with a sample Markdown document demonstrating all supported features — tables, code blocks, task lists, blockquotes, and inline formatting. Edit it directly or click Reset to clear and start from scratch.' },
      { title: 'Use the toolbar and keyboard shortcuts', text: 'Type Markdown in the left pane (Split mode) or the full-width editor (Editor mode). Use the toolbar buttons for one-click formatting or the keyboard shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+K (link), Tab (two-space indent). Select text first to wrap a selection, or click a button without a selection to insert a placeholder.' },
      { title: 'Switch view modes', text: 'Use the Editor / Split / Preview segmented control in the header. Split is the default and shows editor and preview side-by-side. Switch to Editor for distraction-free writing, or Preview to focus on the rendered output. Scroll positions stay approximately in sync in Split mode.' },
      { title: 'Monitor word count and auto-save status', text: 'Your content auto-saves to localStorage after 1 second of inactivity. The "✓ Saved" indicator in the footer confirms each save. Close the tab, reopen it, and your draft is restored automatically. Word count, character count, and line count update continuously in the footer.' },
      { title: 'Export in your preferred format', text: 'Use the four footer buttons — Copy MD copies the raw Markdown, Copy HTML copies the rendered HTML fragment, ↓ .md downloads a Markdown file, ↓ .html downloads a complete standalone HTML page with embedded styles — ready to open in any browser or share with teammates.' },
    ],
  },

  useCases: [
    {
      icon: '◉',
      title: 'Write and preview README and documentation files',
      desc: 'Draft README.md files for GitHub or GitLab projects with a live preview showing exactly how tables, code blocks, and task lists will render. Use the toolbar to insert table and code block syntax quickly. Export as .md and commit directly to your repository. Use the [Diff Checker](/diff-checker) to compare two versions of a README.',
    },
    {
      icon: '✦',
      title: 'Write blog posts and articles in Markdown',
      desc: 'Write blog posts for Ghost, Hashnode, Dev.to, or any platform that accepts Markdown input. Live preview shows paragraph spacing, headings, blockquotes, and code blocks as they\'ll appear. Check word count in the footer to hit target lengths. Copy the HTML fragment to paste directly into a CMS.',
    },
    {
      icon: '▦',
      title: 'Draft technical notes and internal documentation',
      desc: 'Write technical notes, runbooks, architecture docs, or onboarding guides with Markdown formatting and a preview. Auto-save to localStorage means notes persist between sessions without a backend. Export as standalone .html to share with teammates who don\'t have a Markdown viewer.',
    },
    {
      icon: '⇄',
      title: 'Convert Markdown to HTML for emails and CMS import',
      desc: 'Paste Markdown from any source and export the rendered HTML for use in email templates, newsletter platforms, or CMS imports. Click "Copy HTML" to get the fragment or "↓ .html" for a complete document. Clean up the output with the [HTML Formatter](/html-formatter) before publishing.',
    },
    {
      icon: '⊞',
      title: 'Format AI prompt responses into readable documents',
      desc: 'AI models like Claude and GPT output Markdown formatting. Paste the raw response into the editor to see it rendered with proper headings, code blocks, and tables. Copy the HTML or export the .html for sharing or archiving. Pair with [AI Prompt Studio](/ai-prompt-studio) when crafting prompts.',
    },
    {
      icon: '△',
      title: 'Learn Markdown syntax interactively',
      desc: 'Experiment with Markdown syntax by editing the sample document and watching the preview update in real time. Each change is immediately visible — ideal for learning tables, task lists, code blocks, or blockquotes. The sample document covers every GFM feature with working examples.',
    },
  ],

  faqs: [
    {
      q: 'What Markdown features does this editor support?',
      a: 'Full GitHub Flavored Markdown (GFM): headings (H1–H6), bold, italic, strikethrough, inline code, fenced code blocks with language identifiers, blockquotes, unordered and ordered lists, task lists with checkboxes, tables, horizontal rules, links, images, and auto-linking. Rendered via marked with gfm and breaks modes enabled.',
    },
    {
      q: 'Does my content auto-save?',
      a: 'Yes. The editor saves to localStorage after 1 second of inactivity. "✓ Saved" appears in the footer when the save completes. Drafts are restored automatically on next visit. Nothing is sent to a server — all saving is local to your browser.',
    },
    {
      q: 'Can I export my Markdown as HTML?',
      a: 'Yes — two ways. "Copy HTML" copies the rendered HTML fragment to your clipboard. "↓ .html" downloads a complete standalone HTML file with embedded CSS for typography, code blocks, tables, and blockquotes. Open it in any browser or host it as a static page.',
    },
    {
      q: 'What keyboard shortcuts are available?',
      a: 'Ctrl+B (Cmd+B) for bold, Ctrl+I (Cmd+I) for italic, Ctrl+K (Cmd+K) for link insertion, and Tab for two-space indentation. Shortcuts wrap selected text or insert a placeholder when no text is selected.',
    },
    {
      q: 'Is this editor safe for private content?',
      a: 'Yes. Everything runs in your browser — no content is ever sent to a server, logged, or accessible to anyone else. LocalStorage saves are local to your device. The editor also sanitizes rendered HTML to prevent XSS, stripping scripts, iframes, event handlers, and javascript: URLs.',
    },
    {
      q: 'How do I create a Markdown table?',
      a: 'Click the ⊞ button in the toolbar to insert a 3-column table template. Tables use pipe characters: | Col 1 | Col 2 | on the header row, |-------|-------| as the separator, and | Cell | Cell | for data rows. Align columns with colons: |:---| left, |:---:| center, |---:| right.',
    },
    {
      q: 'What is the difference between the three view modes?',
      a: 'Split shows editor and preview side-by-side and is the default. Editor shows only the writing area — best for distraction-free writing on small screens. Preview shows only the rendered output — good for reviewing the final document before exporting.',
    },
    {
      q: 'Does the preview update in real time?',
      a: 'Yes. The preview pane re-renders on every keystroke using a memoized call to the marked parser. There is no manual refresh step. Scroll positions are also kept in approximate sync — scrolling the editor scrolls the preview to the same relative position.',
    },
  ],
};

export default function Page() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><MarkdownEditorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
