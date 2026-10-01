import CssGridBuilderTool from '@/components/CssGridBuilderTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Grid Builder — Free Visual Grid Layout Generator Online | webdevpuneet.com',
  description: 'Build CSS grid layouts visually — drag to create named areas, edit tracks and gaps, and export CSS, SCSS, Tailwind, or React. 6 presets, free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-grid-builder/' },
  icons: { icon: '/icons/css-grid-builder.svg', shortcut: '/icons/css-grid-builder.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/css-grid-builder/',
    siteName: 'webdevpuneet.com',
    title: 'CSS Grid Builder — Visual Layout Generator',
    description: 'Drag to create named grid areas on a live canvas. Export CSS, SCSS, Tailwind, React, or full HTML. 6 layout presets. 100% browser-based.',
    images: [{ url: 'https://webdevpuneet.com/images/css-grid-builder.png', width: 1200, height: 630, alt: 'CSS Grid Builder Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS Grid Builder — Visual Layout Generator with 5 Export Formats',
    description: 'Drag to create named grid areas. Edit column/row tracks, gap, alignment. Export CSS, SCSS, Tailwind, React, HTML. Free & browser-based.',
    images: ['https://webdevpuneet.com/images/css-grid-builder.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is CSS Grid and how does it differ from Flexbox?',
      acceptedAnswer: { '@type': 'Answer', text: 'CSS Grid is a two-dimensional layout system that lets you position elements across both rows and columns simultaneously. Flexbox is a one-dimensional system — either row or column direction at a time. Grid is ideal for page-level layouts (header, sidebar, main, footer) and complex two-axis designs. Flexbox is better for distributing items along a single axis. Both can be combined — a grid container can hold flex children and vice versa.' },
    },
    {
      '@type': 'Question',
      name: 'What is grid-template-areas and why should I use it?',
      acceptedAnswer: { '@type': 'Answer', text: 'grid-template-areas lets you assign human-readable names to grid regions and compose your layout visually in CSS. Instead of using numeric row/column coordinates, you write ASCII art in quotes that maps names to cells: "header header" / "sidebar main" / "footer footer". Child elements then use grid-area: header to place themselves. This makes layouts highly readable and much easier to maintain than coordinate-based placement. It also makes responsive rearrangement via media queries extremely simple — just redefine the template areas string.' },
    },
    {
      '@type': 'Question',
      name: 'What CSS Grid track size units can I use?',
      acceptedAnswer: { '@type': 'Answer', text: 'CSS Grid supports fr (fraction of free space — 1fr means one equal share), px (fixed pixels), % (percentage of container), auto (size to content), min-content (smallest content size), max-content (largest content size), minmax(min, max) (flexible range), and fit-content(value). The fr unit is unique to CSS Grid and is the key to fluid, proportional layouts — 3 columns of 1fr each each take exactly one third of available space after fixed-size tracks are satisfied.' },
    },
    {
      '@type': 'Question',
      name: 'How does repeat() work in grid-template-columns?',
      acceptedAnswer: { '@type': 'Answer', text: 'repeat(n, track-size) is shorthand for repeating a track definition. grid-template-columns: repeat(3, 1fr) is identical to 1fr 1fr 1fr. More powerfully, repeat(auto-fill, minmax(200px, 1fr)) creates as many columns as will fit, each at least 200px wide — a responsive grid requiring zero media queries. repeat(auto-fit, minmax(200px, 1fr)) is similar but collapses empty tracks, centering content when items dont fill a row.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between gap, column-gap, and row-gap in CSS Grid?',
      acceptedAnswer: { '@type': 'Answer', text: 'gap is shorthand for setting both row and column gutters in one declaration: gap: 16px sets both; gap: 12px 24px sets row then column. column-gap sets only the space between columns. row-gap sets only the space between rows. Gap only affects space between tracks — not the outer edge of the grid. To add outer padding, apply padding to the grid container.' },
    },
    {
      '@type': 'Question',
      name: 'How do I make CSS Grid responsive without media queries?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use auto-fill or auto-fit with minmax() in grid-template-columns: grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)). This creates as many columns as fit the container at the minimum width, and each column grows to fill space. On a wide screen you might get 4 columns; on mobile, 1. No media queries needed. auto-fit collapses empty tracks so items stretch to fill; auto-fill keeps empty tracks at their minimum size.' },
    },
    {
      '@type': 'Question',
      name: 'How do I export a CSS Grid to Tailwind CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Tailwind has built-in grid utilities: grid, grid-cols-{n} (1–12 columns), grid-rows-{n} (1–6 rows), gap-{n}, col-span-{n}, row-span-{n}, col-start-{n}, row-start-{n}. For custom track sizes, use arbitrary values: grid-cols-[200px_1fr_200px]. This tool generates the Tailwind classes automatically — select the Tailwind tab to get the HTML with all the correct utility classes.' },
    },
    {
      '@type': 'Question',
      name: 'What is the Holy Grail layout and how do I build it with CSS Grid?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Holy Grail layout is the classic web page structure: a full-width header at the top, three columns in the middle (left sidebar, main content, right sidebar), and a full-width footer at the bottom. In CSS Grid: grid-template-columns: 200px 1fr 200px; grid-template-rows: auto 1fr auto; grid-template-areas: "header header header" "sidebar main aside" "footer footer footer". Each child uses grid-area: header, grid-area: sidebar, etc. This tool includes Holy Grail as a built-in preset.' },
    },
    {
      '@type': 'Question',
      name: 'Does this CSS Grid builder work completely in the browser?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — everything runs 100% client-side in your browser. No server requests are made, no data is uploaded, and no login is required. You can use it offline after the page loads. The live canvas preview uses actual CSS Grid styling so what you see is precisely what the generated code produces.' },
    },
    {
      '@type': 'Question',
      name: 'What export formats does the CSS Grid Builder support?',
      acceptedAnswer: { '@type': 'Answer', text: 'Five formats: CSS (clean .grid-container with grid-template-areas and child grid-area rules), SCSS (same with $variables for gaps and nested child selectors), Tailwind (HTML markup with grid-cols, gap, col-span, row-start utility classes), React (a complete component with inline styles object and JSX), and HTML (a full standalone HTML file with embedded CSS ready to open in a browser).' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Grid Builder',
  url: 'https://webdevpuneet.com/css-grid-builder/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Visual CSS grid layout builder with live canvas, named area creation via drag, track editors, and 5 export formats: CSS, SCSS, Tailwind, React, HTML.',
  featureList: [
    'Interactive canvas — drag to create named grid areas, click to select',
    '6 presets: Holy Grail, Sidebar, 3-Column, Dashboard, Blog, Card Grid',
    'Column and row track editors with add/remove and free-form size values',
    'Gap sliders for column-gap and row-gap independently',
    'justify-items and align-items alignment controls',
    'Named area management — double-click to rename, delete, color-coded',
    'Export: CSS, SCSS with variables, Tailwind utility classes, React component, HTML file',
    'Live code output that updates as you build',
    '100% browser-based — no server, no login',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Grid Builder', item: 'https://webdevpuneet.com/css-grid-builder/' },
  ],
};

const SEO = {
  slug: 'css-grid-builder',
  title: 'CSS Grid Builder — Visual Grid Layout Generator',
  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Choose a layout preset',
        text: 'Click one of the six preset buttons in the header — Holy Grail, Sidebar, 3-Column, Dashboard, Blog, or Card Grid — to instantly load a complete layout. The canvas refreshes with colored named areas showing the grid structure. Presets are the fastest starting point; you can customize everything after loading one.',
      },
      {
        title: 'Add and configure columns and rows',
        text: 'In the left panel, the Columns section lists each column track with an editable text input. Type any valid CSS track size: `1fr`, `200px`, `auto`, `minmax(100px, 1fr)`, or a percentage. Click "+ Add" to append a new column, or click × next to any column to remove it. The Rows section works identically for horizontal tracks.',
      },
      {
        title: 'Create named grid areas on the canvas',
        text: 'Click and drag across empty cells on the canvas to draw a new area. Release the mouse to commit — the area auto-names as area1, area2, etc. Double-click an area name in the canvas or in the Areas list on the left to rename it to a meaningful name like "header", "sidebar", or "content". Click any area to select it. A conflict warning flashes if you try to draw over an existing area.',
      },
      {
        title: 'Set gap and alignment',
        text: 'Drag the Column Gap and Row Gap sliders in the left panel to set gutter spacing between tracks (0–48px in 4px steps). Use the `justify-items` and `align-items` button groups to control how child elements align within their grid cells — options are start, end, center, and stretch (default).',
      },
      {
        title: 'Select your export format',
        text: 'Use the export tab strip above the code output to switch between CSS, SCSS, Tailwind, React, and HTML. CSS outputs the container with `grid-template-areas` and a `grid-area` rule for each named child. SCSS adds `$col-gap` and `$row-gap` variables. Tailwind generates HTML with `grid-cols-*`, `col-span-*`, and `row-start-*` utility classes. React generates a full component with an inline styles object. HTML generates a complete standalone file ready to open in a browser.',
      },
      {
        title: 'Copy or use the generated code',
        text: 'Click the Copy button at the top right of the code output panel to copy the current export to your clipboard. Paste directly into your project. The code updates live with every change — column edits, area renames, and gap adjustments all reflect instantly in the output without needing to refresh.',
      },
    ],
  },
  about: {
    title: 'Build a CSS Grid Layout Visually — Named Areas, fr Units, Export CSS or Tailwind',
    description: `You know you need \`grid-template-areas\` for a dashboard layout, but writing it as quoted ASCII art and remembering the right \`grid-area\` name for each child is slow and error-prone. Draw the layout on the live canvas, drag to create named areas, and the tool generates the complete CSS — including both the container rule with \`grid-template-columns\`, \`grid-template-rows\`, and \`grid-template-areas\`, and the individual \`grid-area\` rules for every named child. No memorizing coordinate systems, no counting quoted strings.\n\nThe canvas renders a **real CSS Grid** — not a simulation. Drag across cells to create a named area. The area appears as a colored overlay with a label. Double-click to rename it. The areas panel on the left lists all regions in color-coded form with their column×row span shown alongside. Column and row track inputs accept any valid CSS value: \`fr\`, \`px\`, \`%\`, \`auto\`, \`minmax(100px, 1fr)\`. The column gap and row gap sliders control gutters independently from 0 to 48px. The \`justify-items\` and \`align-items\` controls let you set item alignment across all cells simultaneously.\n\nSix presets cover the most common real-world layout patterns: **Holy Grail** (full-width header, three-column middle with two fixed sidebars and a fluid main, full-width footer), **Sidebar** (fixed-width nav plus fluid main), **3-Column** (equal fluid columns with header and footer), **Dashboard** (four-column layout with stat cards and a wide content zone), **Blog** (article plus fixed-width sidebar), and **Card Grid** (four-column card layout with a spanning wide card). Click any preset to load a complete layout with named areas and start customizing from there.\n\nExport in **5 formats**: CSS with \`grid-template-areas\` string and child \`grid-area\` rules, SCSS with \`$col-gap\` and \`$row-gap\` variables, Tailwind HTML with \`grid-cols-*\`, \`col-span-*\`, and \`row-start-*\` utility classes, a complete React component with an inline styles object and JSX, or a standalone HTML file with embedded CSS ready to open directly in a browser. All processing is 100% client-side — no data is uploaded anywhere.`,
  },
  features: [
    'Drag-to-create named areas on a live CSS grid canvas — see the real grid, not a simulation',
    '6 layout presets: Holy Grail, Sidebar, 3-Column, Dashboard, Blog, Card Grid',
    'Column and row track editors — add, remove, and set any valid CSS track size (fr, px, %, auto, minmax); compute fluid values with our [CSS Clamp Generator](/css-clamp-generator)',
    'Independent column-gap and row-gap sliders',
    'justify-items and align-items alignment controls for item placement within grid cells; use our [Flexbox Builder](/flexbox-builder) for item-level alignment inside grid cells',
    'Named area management with color-coded overlays, double-click rename, and delete',
    '5 export formats: CSS, SCSS with $variables, Tailwind classes, React component, full HTML file; convert Tailwind classes with our [Tailwind Formatter](https://fwdtools.com/tailwind-formatter/)',
    'Live code output synced to canvas — every change updates the code instantly',
    '100% client-side — no server, no upload, no login required; preview across breakpoints with our [Responsive Preview Tool](https://fwdtools.com/responsive-preview-tool/)',
  ],
  useCases: [
    { icon: '⊞', title: 'Build a header + sidebar + main + footer layout', desc: 'Click the Holy Grail preset or drag areas yourself. The generated CSS includes grid-template-areas and the correct grid-area rule for each child — the complete structure is ready to paste into any project.' },
    { icon: '◑', title: 'Design a dashboard grid with stat cards and content zones', desc: 'The Dashboard preset provides a starting point for admin UIs. Drag to add or resize areas, rename them to match your actual content zones, and export CSS or React. Build the carousel widget inside a grid cell with our [Carousel Builder](/carousel-builder).' },
    { icon: '▦', title: 'Create a responsive card grid with no media queries', desc: 'Use repeat(auto-fill, minmax(280px, 1fr)) in the column track to create a grid that adapts to any container width automatically — columns wrap when they don\'t fit, no breakpoints needed.' },
    { icon: '⇄', title: 'Understand what grid-template-areas actually does', desc: 'The canvas shows the real CSS Grid — not a simulation. Drag areas around and watch the generated grid-template-areas string update live. The visual connection between the ASCII art and the rendered layout makes the property immediately intuitive.' },
    { icon: '≡', title: 'Get Tailwind grid classes without memorizing grid-cols syntax', desc: 'The Tailwind tab generates grid-cols-{n}, gap-{n}, col-span-{n}, and row-start-{n} classes for the layout. Paste the HTML directly into a Tailwind project.' },
    { icon: '⚡', title: 'Export a complete React grid component', desc: 'The React tab generates a component with an inline styles object for the container and each named area. Paste it into any React app and replace the placeholder content with your actual components.' },
  ],
  faqs: [
    { q: 'How do I build a CSS grid layout with a header, sidebar, and footer?', a: 'Click the Holy Grail preset to load the classic layout: full-width header, three middle columns (sidebar, main, aside), and full-width footer. Or drag areas yourself on the canvas. The generated CSS includes grid-template-areas with the correct ASCII art string and a grid-area rule for each child element.' },
    { q: 'What is grid-template-areas and how does it work?', a: 'grid-template-areas lets you name grid regions in CSS by writing quoted rows as "ASCII art": "header header" / "sidebar main" / "footer footer". Each child then uses grid-area: header (or sidebar, main, footer) to position itself. This makes layouts readable and easy to reorganize — just rewrite the template areas string for a different arrangement.' },
    { q: 'How do I make a responsive grid that adjusts columns automatically?', a: 'Set a column track to repeat(auto-fill, minmax(280px, 1fr)). This creates as many columns as fit the container at the minimum width, with each column expanding to fill space. On wide screens you might get 4 columns; on mobile, 1 — with no media queries required.' },
    { q: 'What CSS Grid track size units can I use?', a: 'fr (fraction of free space — Grid-exclusive), px (fixed), % (percentage of container), auto (size to content), minmax(min, max) (flexible range). The fr unit is the key to fluid proportional layouts — 3 columns of 1fr each take exactly one-third of available space after fixed tracks are satisfied.' },
    { q: 'How do I export a CSS Grid layout for Tailwind CSS?', a: 'Select the Tailwind tab. The tool generates HTML with grid-cols-{n}, gap-{n}, col-span-{n}, and row-start-{n} utility classes. Custom track sizes use arbitrary value syntax: grid-cols-[200px_1fr_200px]. Copy and paste into any Tailwind project.' },
    { q: 'When should I use CSS Grid vs Flexbox?', a: 'Grid is for two-dimensional layouts where you control rows and columns simultaneously — page shells, dashboards, magazine layouts. Flexbox is for one-dimensional distribution — navbars, button groups, centering content. Most UIs use both: Grid for the overall page structure and Flexbox inside individual components.' },
    { q: 'What export formats are available?', a: 'CSS (grid-template-areas + child grid-area rules), SCSS (with $gap variables), Tailwind HTML (utility classes), React component (inline styles object), and a complete standalone HTML file ready to open in a browser.' },
    { q: 'Is this CSS Grid builder free?', a: 'Yes — no login, no subscription, no export limits. Everything runs in your browser. Nothing is sent to any server.' },
  ],
};

export default function CssGridBuilderPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><CssGridBuilderTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
