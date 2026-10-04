import HtmlTableGeneratorTool from '@/components/HtmlTableGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/html-table-generator.png';

export const metadata = {
  title: "HTML Table Generator \u2014 Visual Table Builder Online Free | webdevpuneet.com",
  description: "Build HTML tables visually. Add rows and columns, edit cells, set alignment, and export clean semantic HTML or Tailwind CSS. Free online tool.",
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/html-table-generator/' },
  icons: { icon: '/icons/html-table-generator.svg', shortcut: '/icons/html-table-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/html-table-generator/',
    siteName: 'webdevpuneet.com',
    title: "HTML Table Generator \u2014 Visual Table Builder Online Free | webdevpuneet.com",
    description: "Build HTML tables visually. Add rows and columns, edit cells, set alignment, and export clean semantic HTML or Tailwind CSS. Free online tool.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HTML Table Generator \u2014 FWD Tools" }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: "HTML Table Generator \u2014 Visual Table Builder Online Free | webdevpuneet.com",
    description: "Build HTML tables visually. Add rows and columns, edit cells, set alignment, and export clean semantic HTML or Tailwind CSS. Free online tool.",
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "How do I create an HTML table?", acceptedAnswer: { '@type': 'Answer', text: "An HTML table uses `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` elements. This generator creates that structure visually \u2014 you edit cells and it writes the markup." } },
    { '@type': 'Question', name: "What is the difference between `<th>` and `<td>`?", acceptedAnswer: { '@type': 'Answer', text: "`<th>` is a table header cell \u2014 typically bold and centered, used for row or column labels. `<td>` is a standard data cell. The generator uses `<th>` for the header row and header column based on your toggle selections." } },
    { '@type': 'Question', name: "Can I generate Tailwind CSS table classes?", acceptedAnswer: { '@type': 'Answer', text: "Yes. Toggle the Tailwind option to generate table markup with Tailwind utility classes for borders, padding, alignment, and hover states." } },
    { '@type': 'Question', name: "Is the generated HTML accessible?", acceptedAnswer: { '@type': 'Answer', text: "The output includes `scope=\"col\"` on column headers and `scope=\"row\"` on row headers, which improves screen reader accessibility for data tables." } },
    { '@type': 'Question', name: "Can I add more rows and columns after starting?", acceptedAnswer: { '@type': 'Answer', text: "Yes. Use the + buttons at the bottom and right side of the grid to add rows and columns at any time." } },
    { '@type': 'Question', name: "Does the tool support merged cells?", acceptedAnswer: { '@type': 'Answer', text: "Basic table generation does not include cell merging. For complex colspan/rowspan tables, use the output as a starting point and add those attributes manually." } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: "HTML Table Generator",
  url: 'https://webdevpuneet.com/html-table-generator/',
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
    { '@type': 'ListItem', position: 2, name: "HTML Table Generator", item: 'https://webdevpuneet.com/html-table-generator/' },
  ],
};

const SEO = {
  slug: 'html-table-generator',
  title: "HTML Table Generator \u2014 Visual table builder \u2192 clean HTML",
  subtitle: "Visual table builder \u2192 clean HTML. Runs in your browser.",
  about: {
    title: "Build HTML Tables Visually and Export Clean Semantic Markup",
    description: `Writing HTML table markup by hand is repetitive. Each row is a \`<tr>\`, each cell is a \`<td>\` or \`<th>\`, and getting alignment, borders, and responsiveness right requires either inline styles or a stylesheet. For a simple comparison table or data grid, the markup setup takes longer than the content.

This HTML table generator lets you build tables visually in a spreadsheet-style grid backed by a two-dimensional array of cell strings held in component state. Click to edit cells, add and remove rows and columns, toggle whether the first row or column is a header, and choose alignment per column by clicking a cycling align button above each column that steps through left, center, and right. Resizing the grid preserves existing cell content by index — growing from 3 to 5 columns keeps your first three columns of data intact and only adds blank cells for the new ones, rather than resetting the whole grid. The clean semantic HTML is generated automatically — with proper \`<thead>\`, \`<tbody>\`, \`<th scope>\`, and optional Tailwind CSS utility classes.

**Tailwind output option.** Toggle Tailwind mode to add utility classes instead of inline styles — \`border\`, \`px-4 py-2\`, \`text-left\` or \`text-center\` or \`text-right\` depending on each column's alignment, \`font-semibold\` on header cells, and a \`hover:bg-gray-50\` state on body rows. This produces table markup you can drop directly into a Tailwind project without writing any CSS.

**Plain HTML output.** The default output is minimal, semantic HTML with no framework dependency — alignment is expressed as an inline \`style="text-align:..."\` attribute only on cells that aren't left-aligned, keeping the markup free of clutter. Add your own CSS or paste it into any web page, CMS, or email template.\n\n**Accessibility built in.** The generator adds \`scope="col"\` on column headers and \`scope="row"\` on row headers automatically whenever the header-row and header-column toggles are on, which improves screen reader navigation for data tables — a screen reader can announce "Price, column header" instead of just reading the cell text. This matters for documentation sites, government pages, and any content that must meet WCAG accessibility guidelines without additional markup work. An optional \`<caption>\` element, inserted directly after the opening \`<table>\` tag, gives assistive technology and SEO crawlers a one-line summary of what the table contains.\n\n**Why use a generator instead of writing table HTML by hand?** A 4-column, 5-row table requires 25 \`<td>\` elements, 4 \`<th>\` elements, 5 \`<tr>\` elements, plus \`<thead>\`, \`<tbody>\`, and the \`<table>\` wrapper. Typing all of that — with consistent indentation, proper attributes, and no typos — takes several minutes and is easy to get wrong. The generator produces the correct, complete markup from a visual grid in under 30 seconds.\n\nRuns fully in your browser — no data is uploaded.`,
  },
  features: [
    "**Visual grid editor** \u2014 click cells to edit, Tab to navigate, no markup needed",
    "**Header row and header column** toggles for `<th>` and `scope` attributes",
    "**Column alignment** \u2014 left, center, or right per column",
    "**Clean semantic HTML** with `<thead>`, `<tbody>`, and accessible `<th scope>`",
    "**Tailwind CSS output** with utility classes for borders, padding, and hover states — convert any of it back with [Tailwind to CSS](/tailwind-to-css)",
    "**Add/remove rows and columns** dynamically",
    "**Optional table caption** support for accessible and SEO-friendly table descriptions",
    "**Copy and download** as a standalone HTML table fragment ready to paste into any project",
    "**Runs entirely in the browser** — no data is uploaded, safe for sensitive table content",
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: "Set rows and columns", text: "Enter the number of rows and columns, or start with the default 4\u00d73 grid and add more using the + buttons." },
      { title: "Edit cell content", text: "Click any cell to edit. Use Tab to move forward, Shift+Tab to go back. Header cells in the first row are rendered as `<th>` in the output." },
      { title: "Configure table options", text: "Toggle whether the first row is a header, whether the first column is a row header, and whether to include a caption. Set column alignment (left, center, right)." },
      { title: "Choose output style", text: "Select Plain HTML for clean minimal markup, or Tailwind CSS for utility-class-based styling suitable for Tailwind projects." },
      { title: "Copy or download", text: "Copy the generated HTML to clipboard or download as table.html. Paste directly into your project." },
    ],
  },
  useCases: [
    { icon: "\u25c9", title: "Build comparison tables for product pages", desc: "Generate feature comparison tables with header rows and column alignment without writing repetitive HTML markup by hand." },
    { icon: "\u25a6", title: "Create pricing tables for landing pages", desc: "Build pricing tier comparison tables with header columns and export clean HTML or Tailwind utility-class markup ready to paste." },
    { icon: "\u25b3", title: "Convert spreadsheet data to HTML", desc: "Enter data from a spreadsheet grid and export as a semantic HTML table for embedding in a web page, email, or CMS. Working in Markdown instead? Use the [Markdown table generator](/markdown-table-generator)." },
    { icon: "\u26a1", title: "Generate Tailwind CSS tables quickly", desc: "Build tables with Tailwind utility classes for Next.js, Nuxt, or other Tailwind-based projects without writing repetitive class strings." },
    { icon: "\u25d1", title: "Create HTML tables for email templates", desc: "Export minimal, accessible HTML table markup with proper th and td elements suitable for HTML email layouts." },
    { icon: "\u2261", title: "Reference tables for documentation", desc: "Build keyboard shortcut tables, API parameter tables, or option reference tables for documentation sites with proper scope attributes. Convert docs back to Markdown with [HTML to Markdown](/html-to-markdown/)." },
  ],
  faqs: [
    { q: "How do I create an HTML table?", a: "An HTML table uses `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` elements. This generator creates that structure visually \u2014 you edit cells and it writes the markup." },
    { q: "What is the difference between `<th>` and `<td>`?", a: "`<th>` is a table header cell \u2014 typically bold and centered, used for row or column labels. `<td>` is a standard data cell. The generator uses `<th>` for the header row and header column based on your toggle selections." },
    { q: "Can I generate Tailwind CSS table classes?", a: "Yes. Toggle the Tailwind option to generate table markup with Tailwind utility classes for borders, padding, alignment, and hover states." },
    { q: "Is the generated HTML accessible?", a: "The output includes `scope=\"col\"` on column headers and `scope=\"row\"` on row headers, which improves screen reader accessibility for data tables." },
    { q: "Can I add more rows and columns after starting?", a: "Yes. Use the + buttons at the bottom and right side of the grid to add rows and columns at any time." },
    { q: "Does the tool support merged cells?", a: "Basic table generation does not include cell merging. For complex colspan/rowspan tables, use the output as a starting point and add those attributes manually." },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "How to use HTML Table Generator",
  description: "Build HTML tables visually. Add rows and columns, edit cells, set alignment, and export clean semantic HTML or Tailwind CSS. Free online tool.",
  totalTime: 'PT3M',
  step: SEO.howToUse.items.map((item, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: item.title,
    text: item.text,
  })),
};

export default function HtmlTableGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><HtmlTableGeneratorTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
