import CssMinifierBeautifierTool from '@/components/CssMinifierBeautifierTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Minifier & Beautifier Online Free | webdevpuneet.com',
  description: 'Minify CSS for production or beautify minified CSS to readable form — shows exact bytes saved. No build tools, paste and click. Free, browser-based.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-minifier-beautifier/' },
  icons: { icon: '/icons/css-minifier-beautifier.svg', shortcut: '/icons/css-minifier-beautifier.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/css-minifier-beautifier/',
    siteName: 'webdevpuneet.com',
    title: 'CSS Minifier & Beautifier Online — Minify and Format CSS Free',
    description: 'Minify CSS for production or beautify it for readability. Compression stats, syntax highlighting, history snapshots, file upload, and one-click copy. Free, no sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/css-minifier-beautifier.png', width: 1200, height: 800, alt: 'CSS Minifier & Beautifier Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS Minifier & Beautifier Online — Minify and Format CSS Free',
    description: 'Minify CSS for production or beautify it for readability. Stats, syntax highlighting, history. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/css-minifier-beautifier.png'],
  },
};

const seoData = {
  slug: 'css-minifier-beautifier',
  title: 'CSS Minifier & Beautifier Online — Minify and Format CSS Free',

  about: {
    title: 'Minify CSS for Production or Beautify Minified CSS for Readability — No Build Tools Required',
    description: `You need to reduce your CSS file size before deploying, but you don't have a build pipeline set up. Or you copied a minified stylesheet from browser DevTools or a CDN and you can't read a word of it. Paste it here, click Minify or Beautify, and the result is ready in under a second — with an exact byte count showing how much was saved or expanded.\n\nThe minifier runs a short chain of regex passes: strip \`/* … */\` comments, collapse all runs of whitespace to a single space, then remove the space around \`{\`, \`}\`, \`;\`, \`,\`, and \`:\`, and finally drop the semicolon immediately before a closing brace since it's redundant. The browser parses the result identically to developer-formatted CSS — the only difference is byte count. For a typical stylesheet with generous whitespace and inline comments explaining each section, minification reduces file size by 25–50%.\n\nThe beautifier is not a reverse regex — restoring indentation reliably needs actual structure, so it walks the input character by character with a state machine tracking brace depth and whether it currently expects a property name or a value. Depth tells it when a colon should be treated as a property/value separator (and rendered without a following newline) versus a pseudo-class colon or part of a selector; a dedicated branch matches \`::\` so pseudo-elements like \`::before\` aren't mistaken for a declaration. String literals are scanned separately so a semicolon or brace inside a quoted \`content: ';'\` value doesn't trigger a fake line break, and comments are re-indented to the current depth rather than left wherever they happened to sit in the minified source. The result: 2-space indentation, one property per line, and a blank line between rule blocks, matching the formatting Prettier applies to CSS.\n\nA stats bar shows input size, output size, bytes saved, and percentage change after every operation, so you know whether the optimization was worthwhile before shipping. An **Edit** button feeds the current output back into the input panel so you can chain operations — beautify to read and adjust a file, then minify the revised version without retyping anything. History keeps up to 15 timestamped snapshots per session, each showing the operation type and byte counts; click any entry to restore both the original input and processed output instantly. Everything runs in your browser with no server request, no sign-up, and no file size limit.`,
  },

  features: [
    'CSS minification — strips whitespace, comments, line breaks, and trailing semicolons for maximum compression',
    'CSS beautification — reformats with 2-space indentation, consistent line breaks, and readable property spacing; combine with our [HTML Formatter](/html-formatter/) to clean up full HTML+CSS files',
    'Compression stats — shows input size, output size, bytes saved, and percentage change in the header',
    'Syntax highlighting — properties, values, selectors, at-rules, and comments are all color-coded',
    'History panel — up to 15 timestamped snapshots, click any entry to restore input and output instantly',
    'File upload — drag and drop or click to load any .css file directly into the editor',
    'Download output as .css (beautified) or .min.css (minified)',
    'One-click Copy to clipboard with a confirmation toast',
    '100% client-side — no CSS is ever sent to a server, private and offline-capable; convert minified Tailwind output with our [Tailwind to CSS](/tailwind-to-css/) converter',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste or upload your CSS',
        text: 'Paste your CSS directly into the editor on the left — anything from a single rule block to a complete multi-section stylesheet. Or click **Upload** to load a `.css` file from your computer, or drag and drop a `.css` or `.txt` file directly onto the editor area. The editor accepts both formatted and already-minified CSS.',
      },
      {
        title: 'Click Minify or Beautify',
        text: 'Click **Minify** to compress the CSS for production: strips all comments, whitespace, blank lines between rules, and trailing semicolons before closing braces. The browser parses minified CSS identically — the only change is file size. Click **Beautify** to format minified or poorly-indented CSS for readability: adds 2-space indentation, puts each property on its own line, places the opening brace on the selector line, and adds blank lines between rule blocks.',
      },
      {
        title: 'Check the stats bar',
        text: 'After every Minify or Beautify operation, the stats bar at the top shows the full comparison: **input size**, **output size**, **bytes saved** (or added for beautification), and the **percentage change**. For well-commented, generously spaced CSS, minification typically achieves 25–50% reduction. The stats update instantly so you know whether the optimization is worthwhile before committing.',
      },
      {
        title: 'Edit, refine, and reprocess',
        text: 'Click **Edit** to move the current output back into the input area — useful for making manual adjustments and then running Minify or Beautify again. The Edit button lets you chain operations: beautify a file to read it, make edits, then minify the revised version. Click **Clear** to reset both panels and start over.',
      },
      {
        title: 'Copy or download the output',
        text: 'Click **Copy** to copy the full processed CSS to your clipboard with a confirmation toast. Click **Download** to save the output as a file — `.min.css` for minified output, `.css` for beautified. When a file was uploaded, the download filename is derived from the original filename; pasted content defaults to `style.css` or `style.min.css`.',
      },
      {
        title: 'Restore previous sessions from History',
        text: 'Click **History** to open the history panel. Every Minify and Beautify operation is automatically saved as a timestamped snapshot (up to 15 entries). Each entry shows the operation type, input size, and output size. Click any entry to restore both the original input and the processed output — useful for comparing multiple versions, recovering from accidental edits, or switching between files worked on in the same session.',
      },
    ],
  },

  useCases: [
    {
      icon: '⚡',
      title: 'Reduce CSS file size before deploying without a build pipeline',
      desc: 'Paste your stylesheet, click Minify, and see the exact bytes saved — ready to deploy. No webpack, no Vite, no npm required. For well-commented, developer-formatted CSS, minification typically achieves 25–50% size reduction with zero change in how the page renders.',
    },
    {
      icon: '{}',
      title: 'Read a minified third-party stylesheet you can\'t parse',
      desc: 'Beautify minified CSS from libraries, themes, CDN-served stylesheets, or computed styles copied from browser DevTools. One click converts an unreadable wall of text into an indented, navigable stylesheet with each property on its own line.',
    },
    {
      icon: '⇄',
      title: 'Review a CSS diff in a pull request without formatting noise',
      desc: 'Beautify CSS snippets from both versions before comparing them with our [Diff Checker](https://fwdtools.com/diff-checker/). Clean, consistently formatted rules make added, removed, or changed properties immediately visible — rather than trying to read structural changes through inconsistent indentation.',
    },
    {
      icon: '◑',
      title: 'Clean up auto-generated CSS from a CMS or page builder',
      desc: 'WordPress themes, Elementor, Webflow, and other page builders output redundant, poorly structured CSS. Beautify it first to identify unused rules and understand the actual selector structure before deciding what to remove or optimize. Then convert surviving utility patterns with our [CSS to Tailwind](/css-to-tailwind/) converter.',
    },
    {
      icon: '▦',
      title: 'Format a CSS example from a tutorial or AI before using it',
      desc: 'Code snippets from Stack Overflow, documentation, or AI tools often arrive with inconsistent indentation or minified. Beautify them here before adding to your project so the style matches your codebase conventions. Format the surrounding HTML with our [HTML Formatter](/html-formatter/) too.',
    },
    {
      icon: '◉',
      title: 'Format CSS code examples for blog posts or documentation',
      desc: 'Beautify CSS before pasting it into blog posts, GitHub READMEs, or documentation sites. Properly formatted code with consistent 2-space indentation is significantly easier for readers to follow and copy.',
    },
  ],

  faqs: [
    {
      q: 'How do I minify CSS online without a build tool or npm?',
      a: 'Paste your CSS into the editor and click Minify. The minifier removes whitespace, comments, blank lines between rules, and trailing semicolons — everything the browser doesn\'t need. The stats bar immediately shows the input size, output size, bytes saved, and percentage reduction. Click Download to save the result as a .min.css file. No webpack, Vite, Node.js, or npm installation required.',
    },
    {
      q: 'How much does CSS minification reduce file size?',
      a: 'For typical developer-formatted stylesheets with generous whitespace and inline comments, minification reduces file size by 25–50%. The exact amount depends on how much whitespace and how many comments are in the original. The stats bar shows the precise byte count and percentage after every minification — so you know immediately whether the optimization was worthwhile for that specific file.',
    },
    {
      q: 'Will minifying CSS break my styles or change how the page looks?',
      a: 'No. CSS minification only removes whitespace, comments, and trailing semicolons — none of which affect how the browser parses or applies style rules. The rendered page looks identical before and after minification. If you see a rendering difference, it means a pre-existing CSS syntax error was present in the original that minification exposed, not a problem introduced by the minifier.',
    },
    {
      q: 'How do I make minified CSS readable again?',
      a: 'Paste the minified CSS into the editor and click Beautify. The beautifier adds 2-space indentation inside rule blocks, puts each property on its own line with a semicolon, places opening braces on the same line as the selector, and adds blank lines between rule blocks. The result matches the formatting conventions used by Prettier and modern CSS style guides. Works on any minified CSS — from third-party libraries, CDN-served stylesheets, browser DevTools, or your own production builds.',
    },
    {
      q: 'Can I upload a .css file instead of pasting?',
      a: 'Yes. Click Upload to open a file picker, or drag and drop a .css file directly onto the editor area. The file loads instantly into the editor. After minifying or beautifying, click Download to save the result — as .min.css for minified output or .css for beautified — with the filename derived from the original uploaded file.',
    },
    {
      q: 'How do I use the history to compare different versions of a stylesheet?',
      a: 'Every time you click Minify or Beautify, a timestamped snapshot is automatically saved to the history panel (up to 15 entries). Each entry shows the operation type, input size, and output size. Click any entry to instantly restore both the original input and the processed output together. This lets you compare multiple versions of a stylesheet, recover from accidental edits, or switch between several files you were working on in the same session.',
    },
    {
      q: 'Is my CSS uploaded to a server?',
      a: 'No. All processing runs entirely in your browser using JavaScript. Your CSS is never transmitted over the network, never stored on any server, and never logged anywhere. Safe for proprietary stylesheets, client work, and any CSS you wouldn\'t want shared with a third-party service. The tool also works fully offline once the page has loaded.',
    },
    {
      q: 'What is the difference between CSS minification and gzip compression?',
      a: 'They are complementary. Minification removes unnecessary characters from the CSS source before it is served. Gzip or Brotli compression is applied by the web server when transmitting the file to the browser — it finds repeating byte patterns and encodes them more efficiently. Both work best together: minify first, then let your server apply gzip. Minification typically reduces file size by 25–50%; gzip on top of that adds another 60–80% reduction.',
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Minifier & Beautifier Online',
  url: 'https://webdevpuneet.com/css-minifier-beautifier/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online CSS minifier and beautifier. Minify CSS for production or beautify for readability. Syntax highlighting, compression stats, 15-entry history, file upload, and file download. 100% client-side.',
  featureList: seoData.features.join(', '),
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Minifier / Beautifier', item: 'https://webdevpuneet.com/css-minifier-beautifier/' },
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
        <CssMinifierBeautifierTool />
      </div>
      <AdSlot />
      <IndexOnly><SeoSection {...seoData} /></IndexOnly>

    </div>
  );
}
