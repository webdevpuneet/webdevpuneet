import MarkdownTableGeneratorTool from '@/components/MarkdownTableGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/markdown-table-generator.png';

export const metadata = {
  title: "Markdown Table Generator \u2014 Visual Table Builder Online | webdevpuneet.com",
  description: "Generate Markdown tables visually. Add rows and columns, edit cells, set column alignment, and export as Markdown, HTML, or CSV. Free online tool.",
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/markdown-table-generator/' },
  icons: { icon: '/icons/markdown-table-generator.svg', shortcut: '/icons/markdown-table-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/markdown-table-generator/',
    siteName: 'webdevpuneet.com',
    title: "Markdown Table Generator \u2014 Visual Table Builder Online | webdevpuneet.com",
    description: "Generate Markdown tables visually. Add rows and columns, edit cells, set column alignment, and export as Markdown, HTML, or CSV. Free online tool.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Markdown Table Generator \u2014 FWD Tools" }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: "Markdown Table Generator \u2014 Visual Table Builder Online | webdevpuneet.com",
    description: "Generate Markdown tables visually. Add rows and columns, edit cells, set column alignment, and export as Markdown, HTML, or CSV. Free online tool.",
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "How do I make a table in Markdown?", acceptedAnswer: { '@type': 'Answer', text: "Markdown tables use pipe characters to separate columns, dashes for the header divider, and colons for alignment. This generator creates that syntax automatically from a visual grid \u2014 you edit cells and the pipe syntax is generated for you." } },
    { '@type': 'Question', name: "What is the correct Markdown table syntax?", acceptedAnswer: { '@type': 'Answer', text: "A Markdown table has a header row, a divider row with dashes (e.g. `---`, `:---:`, `---:`), and data rows. All rows are separated by pipe characters. GFM (GitHub Flavored Markdown) is the most widely supported variant." } },
    { '@type': 'Question', name: "How do I align columns in a Markdown table?", acceptedAnswer: { '@type': 'Answer', text: "In the divider row, use `:---` for left, `:---:` for center, and `---:` for right alignment. This generator adds those colons automatically when you select an alignment from the column dropdown." } },
    { '@type': 'Question', name: "Can I export the table as HTML?", acceptedAnswer: { '@type': 'Answer', text: "Yes. Switch to the HTML tab to see the generated `<table>` markup. Copy or download it directly." } },
    { '@type': 'Question', name: "Can I use this to convert CSV to Markdown?", acceptedAnswer: { '@type': 'Answer', text: "Yes. Paste your data row by row into the grid cells, or type it directly. The Markdown output is generated from whatever is in the cells." } },
    { '@type': 'Question', name: "Does this work with GitHub Markdown tables?", acceptedAnswer: { '@type': 'Answer', text: "Yes. The output follows GitHub Flavored Markdown (GFM) table syntax, which is supported by GitHub, GitLab, Notion, Obsidian, and most modern Markdown renderers." } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: "Markdown Table Generator",
  url: 'https://webdevpuneet.com/markdown-table-generator/',
  image: OG_IMAGE,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: metadata.description,
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: "Markdown Table Generator", item: 'https://webdevpuneet.com/markdown-table-generator/' },
  ],
};

const SEO = {
  slug: 'markdown-table-generator',
  title: "Markdown Table Generator \u2014 Visual table builder \u2192 Markdown/HTML/CSV",
  subtitle: "Visual table builder \u2192 Markdown/HTML/CSV. Runs in your browser.",
  about: {
    title: "Build Markdown Tables Visually Without Writing Pipe Syntax",
    description: `Markdown table syntax is readable once you understand it, but tedious to write correctly — especially when columns need alignment, cells have different lengths, and the pipe characters need to line up. Counting spaces manually to make a table look right in a plain text editor is exactly the kind of work a generator should handle.

This Markdown table generator gives you a spreadsheet-style grid backed by a two-dimensional array of cell values in component state — the same data model powers all three export formats simultaneously, so nothing is re-parsed when you switch tabs. Click to edit any cell, add or remove rows and columns, set column alignment (left, center, right), and the Markdown output is generated automatically by joining each row's cells with \` | \` delimiters and writing a divider row directly beneath the header. The table preview shows exactly how it will render, and you can copy the output directly into a README, GitHub issue, documentation file, or any Markdown editor.

**A common misconception worth clearing up:** GFM table syntax does not actually require the pipe characters to visually line up in your source file — only the number of columns and the divider row's dashes and colons matter structurally. Every renderer reflows the columns regardless of how the raw text looks. The friction people feel when hand-writing Markdown tables is purely a readability habit, not a rendering requirement — which is exactly why a generator that outputs correct, if visually uneven, pipe syntax is not "wrong," it's just optimizing for correctness over hand-authoring aesthetics.

**Export formats.** Beyond Markdown, the same table data exports as an HTML \`<table>\` for web pages, with per-column \`style="text-align:..."\` attributes applied only to non-left-aligned columns, and as CSV for spreadsheets, with any cell containing a comma automatically wrapped in double quotes so the file still parses correctly when opened in Excel, Sheets, or a CSV importer. This makes the tool useful for converting between formats in both directions: build the table visually, export to whichever format your workflow needs.

**GitHub-flavored Markdown.** The output follows GFM (GitHub Flavored Markdown) table syntax, which is supported by GitHub, GitLab, Notion, Obsidian, VS Code preview, and most modern Markdown renderers.\n\n**Column alignment and workflow efficiency.** Each column has an alignment selector — left (default), center, or right — that controls the colon placement in the Markdown divider row (\`:---\`, \`:---:\`, \`---:\`). Switch alignment at any time and the output updates instantly. Add columns at any point without needing to manually pad existing rows or reformat the entire table; resizing keeps existing cell values in place by row and column index rather than clearing the grid. When a table has five or more columns with varying cell lengths, the pipe characters stop lining up in a plain text editor and the raw Markdown becomes hard to scan by eye — a visual grid generator removes all of that friction entirely.\n\nRuns fully in your browser — no data is uploaded.`,
  },
  features: [
    "**Visual grid editor** \u2014 click to edit cells, Tab to navigate, no pipe syntax needed",
    "**Column alignment** \u2014 set left, center, or right alignment per column",
    "**Add/remove rows and columns** dynamically without reformatting",
    "**Markdown output** in GitHub-Flavored Markdown (GFM) table syntax",
    "**HTML table output** with `<table>`, `<thead>`, `<tbody>`, and alignment attributes",
    "**CSV export** for moving table data to spreadsheets",
    "**Live Markdown preview** showing how the rendered table will look",
    "**Copy and download** buttons for all output formats — Markdown, HTML, and CSV in one click",
    "**Runs entirely in the browser** — no data is uploaded, safe for sensitive or proprietary table content",
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: "Set the number of rows and columns", text: "Enter how many rows and columns you need, or start with the default 3\u00d73 and add more as you go." },
      { title: "Click cells to edit content", text: "Click any cell to edit its content. Use Tab to move to the next cell and Shift+Tab to go back. The header row becomes the column names." },
      { title: "Set column alignment", text: "Use the alignment selector per column to set left (default), center, or right alignment. This controls the `:---`, `:---:`, and `---:` divider in the Markdown output." },
      { title: "Add or remove rows and columns", text: "Use the + buttons to add a row below or a column to the right. Use the \u00d7 buttons on each row and column header to delete them." },
      { title: "Copy or export", text: "Click Copy Markdown to copy the table syntax. Use the HTML or CSV tabs to switch output format and copy or download in that format instead." },
    ],
  },
  useCases: [
    { icon: "\u25c9", title: "Create comparison tables for README files", desc: "Build feature comparison or API reference tables for GitHub README files without counting pipe characters or manually aligning column separators. For pure HTML tables, use the [HTML table generator](/html-table-generator)." },
    { icon: "\u25a6", title: "Write documentation with structured data tables", desc: "Generate Markdown tables for docs, wikis, Notion pages, and Confluence without switching to a spreadsheet or writing pipe syntax by hand. Draft the surrounding docs in the [Markdown editor](/markdown-editor/)." },
    { icon: "\u25b3", title: "Convert spreadsheet data to Markdown", desc: "Paste data from a CSV export into the table cells and generate the Markdown equivalent for pasting into a documentation file or README. Convert full CSV files with the [CSV to JSON converter](https://fwdtools.com/csv-json-converter/)." },
    { icon: "\u26a1", title: "Convert between Markdown, HTML, and CSV", desc: "Enter the table once and export in whichever format your workflow needs \u2014 Markdown for docs, HTML for web, CSV for spreadsheets." },
    { icon: "\u25d1", title: "Create pricing and comparison tables", desc: "Build tier comparison tables for product pages or proposals and export clean Markdown or HTML without writing the markup by hand." },
    { icon: "\u2261", title: "Generate tables for GitHub issues and PRs", desc: "Format structured data as a Markdown table inside a GitHub issue, pull request description, or project wiki page without leaving your browser." },
  ],
  faqs: [
    { q: "How do I make a table in Markdown?", a: "Markdown tables use pipe characters to separate columns, dashes for the header divider, and colons for alignment. This generator creates that syntax automatically from a visual grid \u2014 you edit cells and the pipe syntax is generated for you." },
    { q: "What is the correct Markdown table syntax?", a: "A Markdown table has a header row, a divider row with dashes (e.g. `---`, `:---:`, `---:`), and data rows. All rows are separated by pipe characters. GFM (GitHub Flavored Markdown) is the most widely supported variant." },
    { q: "How do I align columns in a Markdown table?", a: "In the divider row, use `:---` for left, `:---:` for center, and `---:` for right alignment. This generator adds those colons automatically when you select an alignment from the column dropdown." },
    { q: "Can I export the table as HTML?", a: "Yes. Switch to the HTML tab to see the generated `<table>` markup. Copy or download it directly." },
    { q: "Can I use this to convert CSV to Markdown?", a: "Yes. Paste your data row by row into the grid cells, or type it directly. The Markdown output is generated from whatever is in the cells." },
    { q: "Does this work with GitHub Markdown tables?", a: "Yes. The output follows GitHub Flavored Markdown (GFM) table syntax, which is supported by GitHub, GitLab, Notion, Obsidian, and most modern Markdown renderers." },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "How to use Markdown Table Generator",
  description: "Generate Markdown tables visually. Add rows and columns, edit cells, set column alignment, and export as Markdown, HTML, or CSV. Free online tool.",
  totalTime: 'PT3M',
  step: SEO.howToUse.items.map((item, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: item.title,
    text: item.text,
  })),
};

export default function MarkdownTableGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><MarkdownTableGeneratorTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
