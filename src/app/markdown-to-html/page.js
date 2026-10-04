import MarkdownToHtml from '@/components/MarkdownToHtml';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Markdown to HTML Converter — Free Online MD to HTML | webdevpuneet.com',
  description: 'Convert Markdown to HTML instantly — paste your README or docs and get clean HTML with live preview. GFM tables, task lists, and code blocks. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/markdown-to-html/' },
  icons: { icon: '/icons/markdown-to-html.svg', shortcut: '/icons/markdown-to-html.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/markdown-to-html/',
    siteName: 'webdevpuneet.com',
    title: 'Markdown to HTML Converter — Free Online MD to HTML',
    description: 'Convert Markdown to HTML instantly. Live preview, raw HTML view, copy fragment or full page, download. Supports GFM tables, task lists, fenced code blocks.',
    images: [{ url: 'https://webdevpuneet.com/images/markdown-to-html.png', width: 1200, height: 630, alt: 'Markdown to HTML Converter Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Markdown to HTML Converter — Free Online MD to HTML',
    description: 'Convert Markdown to HTML instantly. Live preview, GFM support, copy or download. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/markdown-to-html.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert Markdown to HTML online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your Markdown text into the left panel of this converter. The HTML output appears instantly in the right panel — no button press required. Switch between the Preview tab (rendered HTML) and the HTML tab (raw source) using the tabs above the output. To copy just the HTML fragment, click "Copy HTML". To copy a complete standalone HTML page with inline CSS, click "Copy Full Page". To download the result as an .html file, click "Download".',
      },
    },
    {
      '@type': 'Question',
      name: 'What Markdown syntax does this converter support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool uses the marked library with GitHub Flavored Markdown (GFM) enabled. Supported syntax includes: headings (# H1 through ###### H6), bold (**text** or __text__), italic (*text* or _text_), strikethrough (~~text~~), inline code (`code`), fenced code blocks (``` with optional language hint), unordered and ordered lists, task lists (- [ ] and - [x]), blockquotes (> text), horizontal rules (---), links ([text](url)), images (![alt](url)), and tables (pipe-delimited with header row). Line breaks are preserved with GFM line-break mode.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a README.md file to HTML?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open your README.md file in any text editor, select all (Ctrl+A or Cmd+A), and copy. Click the "Paste" button in this tool or paste directly into the left panel. The converter immediately renders the README as HTML — including headings, code blocks, tables, and task lists. Click "Copy Full Page" to get a complete HTML document with basic styling, or "Copy HTML" for the raw fragment to embed in an existing page. Click "Download" to save as an .html file.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Copy HTML and Copy Full Page?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '"Copy HTML" copies only the converted HTML fragment — the body content without any wrapping document structure. Use this when embedding the HTML into an existing page, a CMS rich-text field, or a React/Vue component. "Copy Full Page" copies a complete standalone HTML document with DOCTYPE, head, meta tags, and inline CSS styling (typography, code blocks, tables, blockquotes). Use this when you need a self-contained .html file you can open directly in a browser, send to a client, or host as a static page.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert Markdown tables to HTML?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — this converter fully supports GFM (GitHub Flavored Markdown) pipe tables. Write your table with a header row, a separator row of dashes (| --- |), and data rows. The converter outputs a properly structured HTML table with <table>, <thead>, <tbody>, <tr>, <th>, and <td> elements. Column alignment using colons in the separator row (| :--- |, | ---: |, | :---: |) is also respected in the HTML output.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert Markdown to HTML in a blog post or CMS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Write or paste your blog post in Markdown format into the left panel. Switch the output to HTML view and click "Copy HTML". In your CMS (WordPress, Ghost, Webflow, Contentful, Sanity), switch the editor to HTML or Code view and paste. For WordPress, open the post editor and click the three-dot menu, then "Edit as HTML". For Ghost, use a HTML card block. For Webflow, use an HTML embed element. The converted HTML uses standard semantic tags (<h1>–<h6>, <p>, <ul>, <ol>, <blockquote>, <code>, <pre>) that are compatible with all CMS editors.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this Markdown to HTML converter work offline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — once the page is loaded, all conversion runs entirely in your browser using JavaScript (the marked library). No text is sent to any server. The converter works without an internet connection as long as the page is already open. This also means your Markdown content is completely private — nothing is logged, stored, or processed outside your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert Markdown code blocks to HTML?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fenced code blocks (triple backticks) are converted to <pre><code> HTML elements. An optional language hint after the opening backticks (e.g. ```javascript) is added as a class attribute on the <code> element (class="language-javascript"), which is compatible with syntax highlighters like Prism.js and Highlight.js. Inline code (single backticks) is converted to <code> elements. In the Preview tab, code blocks are rendered with a monospace font and background. In the HTML tab, you can see the exact markup generated.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Markdown to HTML Converter',
  url: 'https://webdevpuneet.com/markdown-to-html/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online Markdown to HTML converter with live preview. Supports GitHub Flavored Markdown including tables, task lists, and fenced code blocks. Copy HTML fragment or full page, download as .html file.',
  featureList: [
    'Live Markdown to HTML conversion as you type',
    'GitHub Flavored Markdown (GFM) — tables, task lists, strikethrough',
    'Preview tab — rendered HTML output with styled typography',
    'HTML tab — raw source code for copy-paste into editors',
    'Copy HTML fragment or complete standalone HTML page',
    'Download as .html file with inline CSS',
    '100% browser-based — private, no server, works offline',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Markdown to HTML Converter', item: 'https://webdevpuneet.com/markdown-to-html/' },
  ],
};

const SEO = {
  slug: 'markdown-to-html',
  title: 'Markdown to HTML Converter — Free Online MD to HTML with Live Preview',

  about: {
    title: 'Markdown to HTML Converter — Free, Convert README, Docs & Blog Posts to HTML Online',
    description: 'You have a Markdown file — a README, a blog draft, a documentation page — and you need the HTML. Paste it here and the conversion happens live as you type, no button press, no waiting. The split-pane layout shows your Markdown on the left and the rendered HTML on the right simultaneously.\n\nThis converter uses **marked** with **GitHub Flavored Markdown (GFM)** enabled — the same parser GitHub uses to render README files, issues, and pull request descriptions. That means tables, task lists (checkboxes), strikethrough text, and fenced code blocks with language hints all convert correctly, not just the basic CommonMark subset.\n\nThe right panel has two modes. **Preview** renders the HTML visually — headings with hierarchy, code blocks with monospace styling, tables with borders, blockquotes with a left accent. This lets you verify the output looks right before copying. **HTML** shows the raw source so you can inspect the exact markup, check that attributes are correct, or copy just the piece you need.\n\n**Copy HTML** gives you the fragment — the body content only — ready to paste into a CMS, a React component, a `dangerouslySetInnerHTML` prop, or any HTML template. **Copy Full Page** wraps the output in a complete `<!DOCTYPE html>` document with inline CSS for typography, code blocks, tables, and blockquotes. Use this when you need a self-contained `.html` file to open in a browser or send to a client. **Download** saves that full-page HTML directly as `document.html`.\n\nParsing is configured with GFM line-break mode turned on, so a single newline inside a paragraph renders as a real `<br>` rather than being collapsed the way strict CommonMark would — closer to how people actually expect plain-text line breaks to behave when pasted straight from an editor. After marked produces the HTML, a sanitizing pass runs over the raw markup before it\'s ever rendered: it strips `<script>` and `<iframe>` tags outright, removes any inline `on*` event-handler attribute regardless of which element carries it, and rewrites any `javascript:` value used as an `href` or `src`. This matters because the preview pane renders the converted HTML directly into the DOM — Markdown itself allows raw HTML to pass through unchanged, so without this pass, a pasted document containing a hidden script tag or an `onerror` handler could execute in your browser the moment it\'s previewed, and the sanitizer closes that specific gap for a tool whose whole premise is pasting content from elsewhere.\n\nAll conversion runs in your browser. Your Markdown text is never sent to any server — making this safe for confidential documentation, internal READMEs, client deliverables, and unpublished drafts.',
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Paste your Markdown or load a sample', text: 'Paste your Markdown text into the left panel, click "Paste" to pull text from your clipboard directly, or click "Sample" to load a demonstration with headings, code blocks, tables, and a task list. The right panel updates live as you type.' },
      { title: 'Switch between Preview and HTML views', text: 'Use the tabs above the right panel to switch between Preview (rendered output with styled typography, tables, and code blocks) and HTML (raw source code). The Preview tab lets you verify the output looks correct before copying.' },
      { title: 'Copy the HTML fragment or full page', text: 'Click "Copy HTML" to copy the fragment — body content only — for embedding in a CMS, a React component, or an HTML template. Click "Copy Full Page" to copy a complete <!DOCTYPE html> document with inline CSS, ready to open directly in a browser or share as a file.' },
      { title: 'Download the HTML file', text: 'Click "Download" to save the complete page to disk as document.html in one click. The file includes full inline CSS for typography, code blocks, tables, and blockquotes.' },
      { title: 'Clear and start fresh', text: 'Use "Clear" to empty the left panel and start a new conversion. The word count and file size for your Markdown input are shown in the pane header. The raw HTML output size is shown next to the HTML tab when that view is active.' },
    ],
  },

  features: [
    'Live Markdown to HTML conversion — output updates instantly as you type without any button press; zero latency for documents up to hundreds of kilobytes',
    'GitHub Flavored Markdown (GFM) — full support for pipe tables, task list checkboxes (- [x] / - [ ]), strikethrough (~~text~~), and fenced code blocks with language class attributes',
    'Preview tab — renders the converted HTML with styled typography: hierarchy headings, styled code blocks, bordered tables, accent blockquotes, and working links',
    'HTML source tab — shows raw HTML output so you can inspect the markup, check element attributes, and copy exactly the snippet you need',
    'Copy HTML — copies the fragment (body content only) for paste into CMS editors, React components, dangerouslySetInnerHTML, or HTML templates',
    'Copy Full Page — wraps the output in a complete <!DOCTYPE html> page with inline CSS for typography, code, tables, and blockquotes; ready to open in a browser or share as a file',
    'Download as .html — saves the complete page to disk as document.html in one click; no filename prompt, instant download',
    'Word count and byte size — both input Markdown size and output HTML size shown in the pane headers so you can track content volume and output weight',
    'Sample and Paste shortcuts — load a rich GFM demo in one click, or paste clipboard content directly into the editor without clicking into the textarea first',
    '100% browser-based and private — uses the marked library entirely client-side; your Markdown is never sent to any server and works offline once the page is loaded',
  ],

  useCases: [
    {
      icon: '◉',
      title: 'Convert README.md to HTML for static site or documentation',
      desc: 'Copy your project README from GitHub or your local repository and paste it into this converter. The GFM parser handles everything GitHub renders — badges, tables, task lists, fenced code with language hints. Click "Copy Full Page" to get a self-contained HTML document you can use as a documentation page, or "Copy HTML" for a fragment to embed in your docs site template. Combine with [HTML Formatter](/html-formatter) to prettify the output before committing it to your static site generator.',
    },
    {
      icon: '✦',
      title: 'Convert Markdown blog posts to HTML for WordPress and CMS',
      desc: 'Write your blog post in Markdown in any text editor or notes app, then paste it here to get clean semantic HTML. Copy the fragment and paste into WordPress in HTML view, Ghost\'s HTML card, Webflow\'s embed block, or any headless CMS that accepts HTML. The output uses standard tags (<h1>–<h6>, <p>, <ul>, <ol>, <blockquote>, <pre><code>) compatible with every CMS styling system. Check the [Word Counter](https://fwdtools.com/word-counter/) for reading time and keyword density before publishing.',
    },
    {
      icon: '⚡',
      title: 'Generate HTML from Markdown in React and Next.js components',
      desc: 'Paste your Markdown content and copy the HTML fragment. In React, set it as the content of a div using dangerouslySetInnerHTML={{ __html: html }}. In Next.js, use it in a server component for static rendering. The output is sanitized — script tags, event handlers, and javascript: href values are stripped. For dynamic use, integrate the marked library directly into your project; this tool shows exactly what the output will look like so you can validate before writing the component.',
    },
    {
      icon: '⇄',
      title: 'Convert Markdown to HTML for email templates',
      desc: 'Write your email copy in Markdown for readability, then convert it here for the HTML version of your email. Click "Copy HTML" to get the fragment and paste it into your email template\'s body section. Use the Preview tab to verify the rendering looks correct for headers, bullet lists, and links. Note that email clients have limited CSS support — avoid complex tables and use inline styles in your final email template. The [Meta Tag Generator](https://fwdtools.com/meta-tag-generator/) can help structure the metadata for email landing pages.',
    },
    {
      icon: '▦',
      title: 'Preview and export Markdown documentation as HTML',
      desc: 'Technical writers and developers who maintain docs in Markdown (MkDocs, Docusaurus, VuePress source files) can use this converter to preview individual pages without spinning up the full docs build. Paste any .md file to see how it will render. Use "Copy Full Page" + "Download" to create standalone HTML previews to share with stakeholders who don\'t have a local docs build environment. For formatting consistency, run the output through the [HTML Formatter](/html-formatter).',
    },
    {
      icon: '△',
      title: 'Learn Markdown syntax by seeing the HTML it generates',
      desc: 'Switch to the HTML tab and watch the raw HTML output update as you type Markdown. This is the fastest way to understand the relationship between Markdown syntax and HTML elements — type **bold** and see <strong>bold</strong> appear, write a | table | and see <table><thead><tr><th> generated in real time. This side-by-side learning mode is more effective than reading documentation because you get immediate feedback. Use the [Diff Checker](/diff-checker) to compare two different Markdown inputs and see how the HTML output differs.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function MarkdownToHtmlPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><MarkdownToHtml /></div>
      <IndexOnly><AdSlot />
      <SeoSection heading="Free Markdown to HTML Converter — Convert README, Docs & Blog Posts Instantly" {...SEO} /></IndexOnly>

    </div>
  );
}
