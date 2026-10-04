import HtmlToMarkdown from '@/components/HtmlToMarkdown';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'HTML to Markdown Converter — Free Online HTML to MD | webdevpuneet.com',
  description: 'Convert HTML to Markdown instantly — paste HTML from any page or CMS and get clean Markdown with tables, code blocks, and lists. Free, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/html-to-markdown/' },
  icons: { icon: '/icons/html-to-markdown.svg', shortcut: '/icons/html-to-markdown.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/html-to-markdown/',
    siteName: 'webdevpuneet.com',
    title: 'HTML to Markdown Converter — Free Online HTML to MD',
    description: 'Convert HTML to clean Markdown instantly. Paste HTML from web pages, CMS exports, or email templates. Supports tables, code blocks, links, images, and lists.',
    images: [{ url: 'https://webdevpuneet.com/images/html-to-markdown.png', width: 1200, height: 630, alt: 'HTML to Markdown Converter Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'HTML to Markdown Converter — Free Online HTML to MD',
    description: 'Convert HTML to Markdown instantly. Paste from web pages or CMS exports. Supports tables, code blocks, links, images. Copy or download .md file free.',
    images: ['https://webdevpuneet.com/images/html-to-markdown.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert HTML to Markdown online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your HTML into the left panel of this converter. The Markdown output appears instantly in the right panel as you type — no button press required. To copy the Markdown to your clipboard, click "Copy". To save it as a .md file, click "Download .md". Use the "Paste" button to paste clipboard content directly, "Sample" to load a demo, and "Clear" to reset the input. Both panels show file size in bytes so you can see how the conversion changes document size.',
      },
    },
    {
      '@type': 'Question',
      name: 'What HTML elements does this converter support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This converter handles the full set of common HTML elements: headings (h1–h6 → # through ######), paragraphs (p), bold (strong/b → **text**), italic (em/i → *text*), strikethrough (del/s → ~~text~~), inline code (code → `text`), fenced code blocks (pre > code → ``` blocks with language class), links (a → [text](href)), images (img → ![alt](src)), unordered lists (ul/li → - item), ordered lists (ol/li → 1. item), blockquotes (blockquote → > text), tables (table/thead/tbody/tr/th/td → pipe tables), horizontal rules (hr → ---), and line breaks (br → two trailing spaces). Block wrapper elements like div, section, and article are unwrapped and their children converted.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a web page to Markdown?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In your browser, open the web page you want to convert. Right-click on the main content area and select "View Page Source" (Ctrl+U / Cmd+U), or right-click an element and choose "Inspect", then copy the outer HTML of the article or content div. Paste the HTML into this converter. For a cleaner result, paste only the content section HTML rather than the full page (including nav, header, footer, and sidebar), since those elements add noise to the Markdown output. Alternatively, use your browser\'s DevTools to select and copy the innerHTML of the article element.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a WordPress post to Markdown?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the WordPress editor, switch to the Code Editor view (the three-dot menu → Code editor, or Ctrl+Shift+Alt+M). Select all the HTML and copy it. Paste it into this converter. The result will be clean Markdown with headings, paragraphs, lists, and links preserved. For the Classic Editor, click the "Text" tab to view the raw HTML, then copy and paste. If you are using the Gutenberg block editor and want to export all blocks at once, go to the post editor, open the Options menu (⋮), and choose "Code Editor" to see the full post HTML.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert HTML tables to Markdown?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — HTML tables are converted to GitHub Flavored Markdown pipe tables. A table with a header row produces a Markdown table with a separator row of dashes (| --- |) between the header and body. Cells with pipe characters (|) inside them are automatically escaped with a backslash so the table remains valid. Nested tables are not currently supported — the inner table content is extracted as plain text. For best results, use simple tables without merged cells (colspan/rowspan), as Markdown pipe tables do not support cell spanning.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between HTML to Markdown and Markdown to HTML?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HTML to Markdown conversion is lossy in a specific way: it strips presentational HTML (font tags, inline styles, class attributes, div wrappers) and keeps only semantic structure. The resulting Markdown is portable, readable as plain text, and works in GitHub, GitLab, Notion, Obsidian, and any Markdown-aware editor. Markdown to HTML is the reverse — it takes a lightweight text format and generates HTML for rendering in browsers. Use HTML to Markdown when migrating content into a Markdown-based system (documentation, static site generators, note-taking apps). Use [Markdown to HTML](/markdown-to-html) when you have Markdown content and need HTML output for a web page or CMS.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert email HTML to Markdown?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Email HTML is typically messy — it uses tables for layout, inline styles, and nested divs. To extract meaningful content: open the email in your email client, view the source (look for a "View Original" or "Show Original" option), or forward it to yourself and copy the HTML source. Paste the full HTML here — the converter strips layout tables and inline styles, keeping only the semantic text content: headings, paragraphs, lists, links, and images. For newsletters, the result is usually clean body copy with links preserved. Email signature HTML (tables with logos and contact info) produces somewhat noisy Markdown but all text content is preserved.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this HTML to Markdown converter work offline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — once the page has loaded, all conversion runs entirely in your browser using JavaScript and the built-in DOMParser API. No HTML is sent to any server, and the tool continues to work without an internet connection. This makes it safe for confidential content, internal documentation, proprietary code, and any HTML you would not want to transmit over the internet.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HTML to Markdown Converter',
  url: 'https://webdevpuneet.com/html-to-markdown/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online HTML to Markdown converter. Paste HTML from web pages, CMS exports, or email templates and get clean Markdown with full support for headings, tables, code blocks, links, images, and lists.',
  featureList: [
    'Live HTML to Markdown conversion as you type',
    'Full element support — headings, bold, italic, strikethrough, code blocks, links, images, lists, blockquotes, tables, hr',
    'GitHub Flavored Markdown pipe table output',
    'Fenced code blocks with language class preserved',
    'Copy Markdown to clipboard in one click',
    'Download as .md file',
    'File size shown for both input and output',
    '100% browser-based — no server, DOMParser API, works offline',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'HTML to Markdown Converter', item: 'https://webdevpuneet.com/html-to-markdown/' },
  ],
};

const SEO = {
  slug: 'html-to-markdown',
  title: 'HTML to Markdown Converter — Free Online HTML to MD for Web Pages & CMS Exports',

  about: {
    title: 'HTML to Markdown Converter — Free, Convert Web Pages, CMS Exports & Email HTML to Clean Markdown',
    description: 'Paste any HTML and get clean Markdown in under a second. Whether you are pulling content from a web page, migrating posts out of a CMS, extracting text from an email template, or converting documentation from an old HTML site — this converter handles it all in your browser with no server involved.\n\nThe conversion uses the browser\'s native **DOMParser API** to parse HTML into a DOM tree, then walks the tree recursively to produce properly structured Markdown. This means it handles real-world HTML correctly — nested elements, inline formatting inside list items, links inside headings, code inside blockquotes — not just simple regex replacements that break on complex markup.\n\n**What gets converted:** All six heading levels (h1–h6 → `#` through `######`), paragraphs, bold (`strong`/`b` → `**text**`), italic (`em`/`i` → `*text*`), strikethrough (`del`/`s` → `~~text~~`), inline code (`code` → `` `code` ``), fenced code blocks (`pre > code` → ` ``` ` with language class), hyperlinks (`a` → `[text](href)`), images (`img` → `![alt](src)`), unordered and ordered lists, blockquotes, horizontal rules, line breaks, and full HTML tables converted to GFM pipe tables with automatic pipe-character escaping.\n\n**Block wrapper elements** like `div`, `section`, `article`, `main`, and `figure` are transparently unwrapped — their content is converted and their containers discarded, so you get clean prose instead of empty structural markup.\n\nThe recursive walker carries a small context object down through every call — tracking the current list type and nesting depth, plus a stack of counters for ordered lists. That stack is what makes nested numbering come out right: each `ol` pushes its own counter onto the stack when it opens, every `li` inside increments only the counter at the top of the stack, and the counter is popped when that list closes — so a numbered list nested inside another numbered list restarts cleanly at 1 instead of continuing the outer list\'s count. Inline `code` is distinguished from a fenced code block purely by checking whether its parent element is a `pre` tag, and for fenced blocks the converter looks for a class name starting with `language-` on the inner `code` element to preserve syntax-highlighting hints in the fence. Table conversion pads every row out to the widest row\'s column count before building the pipe-table header and separator, so a table with a missing trailing cell in one row still renders as valid Markdown rather than a ragged table. A final cleanup pass collapses any run of three or more consecutive newlines down to exactly one blank line, since block-level conversions each add their own spacing and stacking several in a row would otherwise leave large gaps.\n\nThe output is **GitHub Flavored Markdown (GFM)** compatible — it works in GitHub READMEs, GitLab wikis, Notion, Obsidian, Docusaurus, MkDocs, and any standard Markdown renderer. Use **Copy** to paste it directly into your editor, or **Download .md** to save a named file.\n\nAll conversion runs in your browser. Your HTML is never sent to any server.',
  },

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Get the HTML you want to convert',
        text: 'For a web page: open DevTools (F12), right-click the main content element, and copy its outerHTML. For a CMS post: switch to Code Editor or Text view and copy the raw HTML. For an email: use "View Source" or "Show Original" to get the HTML. For a file: use the **Paste** button to paste clipboard content directly.',
      },
      {
        title: 'Paste the HTML into the left panel',
        text: 'Paste your HTML into the left input panel. The Markdown output appears immediately in the right panel as you type — no button press needed. Use **Sample** to load a demonstration with headings, lists, a code block, a blockquote, and a table to see the conversion in action.',
      },
      {
        title: 'Review the Markdown output',
        text: 'The converter strips layout wrappers (`div`, `section`, `article`, `figure`) and inline styles, keeping only semantic content: headings, paragraphs, bold, italic, code, links, images, lists, blockquotes, and tables. HTML tables become GitHub Flavored Markdown pipe tables with automatic pipe-character escaping in cells.',
      },
      {
        title: 'Copy the Markdown to clipboard',
        text: 'Click **Copy** in the output panel to copy the full Markdown to your clipboard. Paste it directly into a GitHub README, Obsidian note, Notion page, Ghost post editor, or any Markdown-aware editor. The output is GitHub Flavored Markdown (GFM) compatible.',
      },
      {
        title: 'Download as a .md file',
        text: 'Click **Download .md** to save the Markdown as a named file. Use this when converting CMS posts to static site generator content files, when building a local documentation library, or when you need a portable `.md` file to import into another system.',
      },
      {
        title: 'Check conversion size in both panels',
        text: 'Both the input and output panels show the byte size of their content. This is useful for seeing how much the conversion reduces document size — typically 30–60% smaller than the source HTML since all markup, attributes, and inline styles are stripped.',
      },
    ],
  },

  features: [
    'Live HTML to Markdown conversion — output updates in real time as you type or paste, using the browser\'s DOMParser API for accurate tree-based parsing',
    'Full heading support — h1 through h6 converted to # through ###### with surrounding blank lines for proper spacing',
    'Inline formatting — strong/b → **bold**, em/i → *italic*, del/s → ~~strikethrough~~, code → `inline code`',
    'Fenced code blocks — pre > code elements converted to triple-backtick blocks with the language class preserved (e.g., language-javascript → ```javascript)',
    'GFM pipe tables — HTML tables with thead/tbody converted to properly aligned pipe tables with separator row; pipe characters in cells are escaped automatically',
    'Lists — ul/li → dash bullets with nested indent, ol/li → numbered lists; nesting is preserved with two-space indent per level',
    'Links and images — a tags become [text](href "title"), img tags become ![alt](src "title"); title attributes included when present',
    'Block unwrapping — div, section, article, main, figure, and other semantic wrappers are stripped while their inner content is preserved and converted',
    'Copy and Download — copy the full Markdown output to clipboard or download as document.md in one click',
    '100% browser-based — no server, no data sent, works offline; uses the native DOMParser API available in all modern browsers',
  ],

  useCases: [
    {
      icon: '🌐',
      title: 'Convert web page content to Markdown for documentation',
      desc: 'Open a web page in DevTools (F12), right-click the main content element, and copy its outerHTML. Paste it here to get clean Markdown. This is the fastest way to pull structured content from documentation sites, knowledge bases, or reference pages into your own Markdown-based docs. The converter strips navigation, ads, and layout divs — only the semantic content (headings, paragraphs, lists, code) survives. Combine with [Markdown to HTML](/markdown-to-html) if you need to re-export the content as HTML for a different system.',
    },
    {
      icon: '📝',
      title: 'Migrate WordPress or CMS blog posts to Markdown',
      desc: 'Switch your WordPress post to Code Editor view to expose the raw HTML, select all, and paste it here. The converter produces Markdown you can drop directly into Ghost, Gatsby, Hugo, Jekyll, Astro, or any Markdown-based blog platform. This is the core workflow for CMS migrations — convert each post\'s HTML to Markdown, save the .md files, and import into the new system. Use "Download .md" to save each converted post. Run the result through [Diff Checker](/diff-checker) to compare with a manually edited version.',
    },
    {
      icon: '💬',
      title: 'Extract content from email templates to Markdown',
      desc: 'View the source of a marketing email or newsletter and paste the HTML body here. The converter discards layout tables, inline styles, and tracking pixels — keeping headings, paragraphs, links, and images as clean Markdown. This is useful when repurposing newsletter content as a blog post, archiving email campaigns in a Markdown-based notes system, or extracting copy from an HTML email template into a content brief. Use [Word Counter](https://fwdtools.com/word-counter/) on the output to check the extracted word count.',
    },
    {
      icon: '📚',
      title: 'Convert HTML documentation to Markdown for GitHub README',
      desc: 'Many older projects have HTML documentation files (index.html, docs/*.html) that need to be converted to Markdown for a GitHub repository README or wiki. Paste each HTML file\'s content here, copy the output, and paste into a .md file. The converter preserves the full document hierarchy — all heading levels, code examples, tables, and links — so the README reflects the original documentation structure accurately. Use the [HTML Formatter](/html-formatter) to clean up messy HTML before converting if the output looks noisy.',
    },
    {
      icon: '🗒',
      title: 'Pull web content into Obsidian, Notion, or note-taking apps',
      desc: 'When researching a topic, copy the HTML of an article or documentation page and convert it to Markdown to paste into Obsidian, Logseq, or Notion. Markdown notes are searchable, portable, and renderable across all these tools. The conversion preserves the structure — headings become section headers you can link to, code blocks are syntax-highlighted, and tables remain readable. For Notion, paste into a page and it will interpret the Markdown formatting automatically. For Obsidian, save the .md file directly into your vault using "Download .md".',
    },
    {
      icon: '⚙',
      title: 'Convert HTML to Markdown for static site generators',
      desc: 'Static site generators like Hugo, Jekyll, Gatsby, Eleventy, and Astro all use Markdown for content files. When migrating a legacy HTML site to one of these frameworks, use this converter to transform each page\'s content HTML into a .md file. The front matter (title, date, tags) still needs to be added manually, but the body content conversion — preserving headings, code blocks, lists, and links — is fully automated. Combine with [Lorem Ipsum Generator](/lorem-ipsum-generator) when you need placeholder content for template development.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function HtmlToMarkdownPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><HtmlToMarkdown /></div>
      <IndexOnly><AdSlot />
      <SeoSection heading="Free HTML to Markdown Converter — Convert Web Pages, CMS Exports & Email HTML" {...SEO} /></IndexOnly>

    </div>
  );
}
