import HtmlFormatterTool from '@/components/HtmlFormatterTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'HTML Formatter Online Free — Beautify & Indent HTML | webdevpuneet.com',
  description: 'Format minified or messy HTML with proper indentation — also formats inline CSS and JS blocks. Line numbers, history, file upload. Free, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/html-formatter/' },
  icons: { icon: '/icons/html-formatter.svg', shortcut: '/icons/html-formatter.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/html-formatter/',
    siteName: 'webdevpuneet.com',
    title: 'HTML Formatter Online — Beautify & Prettify HTML Code Free',
    description: 'Instantly format HTML with proper indentation, inline CSS & JS prettification, live line numbers, and history snapshots. Paste, upload, or drag and drop. Free, no sign-up, 100% client-side.',
    images: [{ url: 'https://webdevpuneet.com/images/html-formatter.png', width: 1200, height: 630, alt: 'HTML Formatter Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'HTML Formatter Online — Beautify & Prettify HTML Code Free',
    description: 'Format HTML with proper indentation, inline CSS & JS prettification, line numbers, history snapshots. Free, no sign-up, browser-only.',
    images: ['https://webdevpuneet.com/images/html-formatter.png'],
  },
};

const seoData = {
  slug: 'html-formatter',
  title: 'HTML Formatter Online Free — Beautify & Indent HTML, Inline CSS, and JS',

  about: {
    title: 'Format HTML Online Instantly — Beautify Minified HTML with Proper Indentation',
    description: `You got a wall of minified HTML from a build tool, a CMS export, or a web scraper and you can't read it. Or you copied a template from documentation and the indentation is all over the place. Paste it here and click Format — it comes back with clean 2-space indentation in under a second.\n\nUnder the hood, the formatter tokenizes the source with a single regular expression built from alternation branches — one each for HTML comments, the DOCTYPE declaration, complete script blocks, complete style blocks, closing tags, opening tags, and plain text — so the parser always knows what kind of token comes next. Each opening tag is checked against a fixed set of void elements (\`br\`, \`img\`, \`input\`, \`meta\`, \`link\`, \`hr\`, \`area\`, \`base\`, \`col\`, \`embed\`, \`param\`, \`source\`, \`track\`, \`wbr\`) and against a self-closing \`/>\` check, and only tags that are neither increase indentation depth for what follows — keeping a lone \`<img>\` or \`<br>\` from pushing every sibling one level deeper. Works on complete HTML documents, partial fragments, component templates, and email HTML alike, since the tokenizer makes no assumption about a full document structure.\n\nWhat makes this different from basic HTML indenters: it also formats **inline CSS and JavaScript**. Most HTML formatters only indent the tags — they leave the contents of style and script blocks as raw unformatted text. This formatter detects every style block and applies CSS-specific formatting — a newline and indent after every \`{\`, \`;\`, and \`}\` — and every script block and applies a bracket-counting pass to JavaScript: each line is indented by a running depth counter that rises for every \`{\`, \`[\`, or \`(\` and falls for the matching closer, dedenting a line that opens with a closing bracket before its content is emitted. It's a heuristic, not a full JS parser, so it won't match Prettier exactly on unusual formatting, but it handles the vast majority of inline scripts correctly.\n\nThe history bar saves up to 15 timestamped snapshots of your formatting sessions. Format, edit, format again, and every version is available to restore with one click. Live line numbers stay in sync with the editor so you can reference specific lines in code reviews or bug reports. Everything runs in your browser — no code is sent to any server, making it safe for internal templates, client work, and any HTML you wouldn't want shared.`,
  },

  features: [
    'Formats HTML with consistent 2-space indentation and correct tag nesting depth',
    'Automatically prettifies inline <style> CSS blocks — rule blocks, properties, and selectors; then minify or convert those styles with our [CSS Minifier & Beautifier](/css-minifier-beautifier)',
    'Automatically prettifies inline <script> JavaScript blocks — brace-indented, readable JS',
    'Live line-number gutter synced to editor scroll — updates instantly as you type or format',
    'History bar — up to 15 timestamped snapshots, click any chip to restore that version',
    'File upload and drag-and-drop — load .html or .htm files without copy-pasting',
    'Download button — save the formatted result as an .html file to your computer',
    'Handles void elements (br, img, input, meta, link, hr, etc.) with no extra indent step',
    'Handles self-closing tags (/>), DOCTYPE declarations, and HTML comment blocks; convert formatted HTML to JSX with our [HTML to JSX Converter](/html-to-jsx-converter)',
    'Works on partial HTML fragments — no complete document required, any snippet works',
    'One-click Copy button copies the full formatted output to clipboard',
    '100% client-side — no data sent to any server, no sign-up, no watermark, no limit; compare two versions of a template with our [Diff Checker](https://fwdtools.com/diff-checker/)',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste or upload your HTML',
        text: 'Paste your raw, minified, or unformatted HTML directly into the editor. You can also click **Upload** to load an `.html`, `.htm`, `.xml`, or `.svg` file from your computer, or drag and drop a file directly onto the editor area. The editor accepts full HTML documents, partial fragments, component templates, email HTML, and any other valid or near-valid markup.',
      },
      {
        title: 'Choose indent size (2 or 4 spaces)',
        text: 'Use the **2** or **4** chip buttons in the toolbar to set your preferred indentation width before formatting. 2 spaces is the most common default. The setting also applies live to already-formatted output — switch between 2 and 4 and the result updates instantly without re-clicking Format.',
      },
      {
        title: 'Click Format to beautify',
        text: 'Click the **Format** button. The output appears with clean indentation, properly nested tags, and formatted inline CSS and JavaScript blocks. Void elements — `br`, `img`, `input`, `meta`, `link`, `hr`, `area`, `base`, `col`, `embed`, `param`, `source`, `track`, `wbr` — are handled correctly with no extra indentation step.',
      },
      {
        title: 'Use Minify to collapse the output',
        text: 'Click **Minify** to collapse the HTML to its smallest possible single-line form — all whitespace removed, inline CSS and JS compacted. Check **Keep comments** before minifying if you want HTML comment blocks preserved in the output. The minified result appears immediately and can be copied or downloaded.',
      },
      {
        title: 'Use Find to search through the code',
        text: 'Click **Find** (or press `Ctrl+F` / `Cmd+F`) to open the search bar. Type a query to highlight all matches in the editor. Use the up/down arrows to jump between matches and toggle **Aa** for case-sensitive search. The search bar works in both input and formatted output modes.',
      },
      {
        title: 'Copy, download, or restore from history',
        text: 'Click **Copy** to copy the full output to clipboard. Click **Download** to save it as `formatted.html`. Click **History** to see up to 15 timestamped snapshots of previous format operations — click any entry to restore that version instantly.',
      },
      {
        title: 'Toggle line wrap for long lines',
        text: 'Click **Wrap** in the toolbar to toggle word-wrap on long attribute lists or minified output. The live line-number gutter stays synced to the editor scroll position in both wrapped and unwrapped modes.',
      },
    ],
  },

  useCases: [
    {
      icon: '</>',
      title: 'Expand minified HTML from a build tool or CDN into readable code',
      desc: 'Paste one-line minified HTML from webpack, Vite, a CDN response, or a server-rendered page and expand it into a fully indented, navigable structure. Line numbers make it easy to find broken nesting or missing closing tags. Then use our [JSON Formatter](https://fwdtools.com/json-formatter/) to format any embedded JSON payloads in script tags.',
    },
    {
      icon: '⇄',
      title: 'Review a PR with messy or auto-generated HTML templates',
      desc: 'Paste the template HTML before reviewing a pull request. Clean 2-space indentation makes structural issues — extra nesting levels, misplaced divs, wrong tag order — immediately visible. Compare before and after with our [Diff Checker](https://fwdtools.com/diff-checker/) to see only what changed.',
    },
    {
      icon: '◑',
      title: 'Read HTML returned by a web scraper or API',
      desc: 'Format raw HTML from a headless browser, scraper output, or an HTML-returning API endpoint so you can navigate the structure and find the elements you need to parse or extract.',
    },
    {
      icon: '▦',
      title: 'Inspect the table nesting in an email template',
      desc: 'Format HTML email templates from Mailchimp, Klaviyo, or custom builders to see the table-based nesting structure email clients require. Broken table nesting is invisible in minified HTML — it becomes obvious with indentation.',
    },
    {
      icon: '⚡',
      title: 'Clean up an HTML snippet pasted from Stack Overflow or AI',
      desc: 'Code snippets from documentation, Stack Overflow answers, or AI tools often arrive with inconsistent or missing indentation. Format them here before adding to your codebase so the style matches your project. If you\'re converting to React, use our [HTML to JSX Converter](/html-to-jsx-converter) next.',
    },
    {
      icon: '◉',
      title: 'Format a code example before posting it in a blog or docs',
      desc: 'Prettify HTML code examples before including them in blog posts, documentation, READMEs, or presentations. Properly indented examples are easier to read and copy for your audience.',
    },
  ],

  faqs: [
    {
      q: 'How do I format minified HTML to make it readable?',
      a: 'Paste the minified HTML into the editor and click Format. The entire document expands from a single line into properly indented, nested structure. Every opening tag increases indentation depth and every closing tag decreases it. Void elements (br, img, input, meta, link) are handled correctly without adding extra indentation depth. The result is ready to read, debug, or commit to version control.',
    },
    {
      q: 'Does this also format the CSS and JavaScript inside script and style blocks?',
      a: 'Yes — this is what separates it from basic HTML indenters. Most online HTML formatters only indent the tags and leave style and script block contents as raw unformatted text. This tool detects every style block and applies CSS formatting (rule blocks, property indentation, selector spacing), and every script block and applies JavaScript brace-based indentation. The entire document is formatted end-to-end.',
    },
    {
      q: 'Can I format a partial HTML fragment or component snippet?',
      a: 'Yes. You don\'t need a complete HTML document with doctype, html, head, and body. Paste any fragment — a single div and its children, a navigation component, a form, a table, or a Vue/Angular/React template — and the formatter indents it correctly. It works on whatever structure is present, not on assumptions about a complete document.',
    },
    {
      q: 'Is there a free HTML formatter that works without installing anything?',
      a: 'Yes — this tool is completely free with no installation, no extension, no sign-up, and no file upload. Paste HTML, click Format, and copy the result. Works in Chrome, Firefox, Safari, and Edge on both desktop and mobile. Everything runs in your browser using JavaScript — no server involved.',
    },
    {
      q: 'What is the History feature and how do I use it?',
      a: 'Every time you click Format, the output is automatically saved as a timestamped chip in the history bar. Up to 15 entries are saved per session. Click any chip to restore that version — useful when you format, make edits, format again, and want to compare or go back to an earlier version. History is only kept in memory for the current session; closing the tab clears it.',
    },
    {
      q: 'Does it send my HTML code to a server?',
      a: 'No. All formatting runs in your browser using JavaScript. Your HTML is never transmitted over the network or stored anywhere. Safe for internal templates, proprietary component code, client work, and HTML you wouldn\'t want to share with a third-party service. Works fully offline once the page is loaded.',
    },
    {
      q: 'Does it handle broken or malformed HTML?',
      a: 'Yes, for most real-world imperfections. It handles missing closing tags, attributes without quotes, mixed case tag names, and other common issues. It applies best-effort indentation based on the tag structure it can detect. Severely mismatched tag hierarchies may produce unexpected indentation. For production code, validate with the W3C Markup Validator after formatting.',
    },
    {
      q: 'Can I upload and download HTML files?',
      a: 'Yes. Click Upload to load an .html or .htm file from your computer, or drag and drop a file onto the editor. Click Download after formatting to save the result as a .html file. The filename matches the original uploaded file\'s name, or defaults to formatted.html for pasted content.',
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HTML Formatter Online',
  url: 'https://webdevpuneet.com/html-formatter/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based HTML formatter that prettifies HTML with 2-space indentation, formats inline CSS and JavaScript blocks, includes live line numbers, history snapshots, file upload, and download. 100% client-side.',
  featureList: seoData.features.join(', '),
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'HTML Formatter', item: 'https://webdevpuneet.com/html-formatter/' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: seoData.faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Page() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <HtmlFormatterTool />
      </div>
      <AdSlot />
      <IndexOnly><SeoSection {...seoData} /></IndexOnly>

    </div>
  );
}
