import JavascriptMinifierTool from '@/components/JavascriptMinifierTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/javascript-minifier.png';

export const metadata = {
  title: 'JavaScript Minifier Online Free — Compress & Uglify | webdevpuneet.com',
  description: 'Minify JavaScript online free — concatenate multiple files, remove comments, compress whitespace, optionally uglify names, and download .min.js.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/javascript-minifier/' },
  icons: { icon: '/icons/javascript-minifier.svg', shortcut: '/icons/javascript-minifier.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/javascript-minifier/',
    siteName: 'webdevpuneet.com',
    title: 'JavaScript Minifier Online - Concatenate, Uglify & Compress JS',
    description: 'Paste JavaScript or upload multiple JS files, combine them, remove comments, compress whitespace, optionally uglify identifiers, and download a .min.js file.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'JavaScript Minifier Online Tool' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'JavaScript Minifier Online - Compress JS',
    description: 'Free browser-based JavaScript minifier, compressor, uglifier, and concatenator for quick .min.js output.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I minify JavaScript online?',
      acceptedAnswer: { '@type': 'Answer', text: 'Paste JavaScript into the input editor or upload one or more .js files, choose compression options, and click Compress JS. The tool removes comments, collapses whitespace, concatenates files when needed, and creates compact JavaScript that you can copy or download as script.min.js.' },
    },
    {
      '@type': 'Question',
      name: 'Can this tool concatenate multiple JavaScript files?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Upload multiple JavaScript files and the tool combines them in the selected order using your configured separator. This is useful for small websites, legacy CMS snippets, demos, and quick deployments where a full build pipeline is not available.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between minifying and uglifying JavaScript?',
      acceptedAnswer: { '@type': 'Answer', text: 'Minifying usually means removing comments and unnecessary whitespace to reduce file size. Uglifying goes further by shortening variable names or rewriting code into a less readable form. This tool includes an optional identifier shortening mode for simple scripts, while keeping standard compression controls easy to review.' },
    },
    {
      '@type': 'Question',
      name: 'Is my JavaScript uploaded to a server?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. The JavaScript minifier runs in your browser. Your source code, uploaded files, generated output, and compression options are processed locally and are not uploaded to a server.' },
    },
    {
      '@type': 'Question',
      name: 'Should I use this instead of Terser, UglifyJS, webpack, or Vite?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use this tool for quick snippets, small scripts, CMS code, debugging, and one-off compression. For production applications with modules, tree shaking, transpilation, source maps, and advanced syntax transforms, a build pipeline using Terser, esbuild, Rollup, Vite, webpack, or a similar bundler is still the better long-term choice.' },
    },
    {
      '@type': 'Question',
      name: 'Can I beautify JavaScript after minifying it?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The tool includes a Beautify button for quickly expanding compressed JavaScript into a more readable format. It is useful for inspection, comparisons, and checking generated output before copying or downloading.' },
    },
    {
      '@type': 'Question',
      name: 'Does JavaScript minification improve website speed?',
      acceptedAnswer: { '@type': 'Answer', text: 'Minification can reduce transfer size, especially for scripts with comments and whitespace. Smaller JavaScript can download faster and use less bandwidth. The biggest performance gains usually come from combining minification with caching, compression such as Brotli or gzip, code splitting, and removing unused code.' },
    },
    {
      '@type': 'Question',
      name: 'Can I keep license comments in the minified output?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Keep license comments is enabled by default. Comments beginning with important license markers are preserved while ordinary comments are removed. This helps retain copyright or license notices when creating a compressed JavaScript file.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JavaScript Minifier Online',
  url: 'https://webdevpuneet.com/javascript-minifier/',
  image: OG_IMAGE,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based JavaScript minifier, compressor, uglifier, and concatenator. Combine JS files, remove comments, collapse whitespace, optionally shorten identifiers, copy output, or download a .min.js file.',
  featureList: [
    'Minify JavaScript online without installing Node.js',
    'Concatenate multiple .js, .mjs, or .cjs files',
    'Remove ordinary comments while keeping license comments',
    'Compress whitespace and reduce JavaScript file size',
    'Optional variable-name uglification for simple scripts',
    'Optional IIFE wrapper and use strict injection',
    'Configurable file separator for combined scripts',
    'Before and after byte count with reduction percentage',
    'Copy compressed output or download script.min.js',
    'Runs locally in the browser with no code upload',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'JavaScript Minifier', item: 'https://webdevpuneet.com/javascript-minifier/' },
  ],
};

const about = [
  'This free JavaScript Minifier is built for developers who need a fast online way to compress JavaScript, concatenate multiple JS files, create a smaller .min.js output, or quickly uglify a simple script before publishing. Paste JavaScript into the editor, upload one or more .js, .mjs, or .cjs files, choose the compression options, and generate compact output directly in your browser. It targets high-intent searches such as JavaScript minifier online, JS minifier, minify JavaScript, JavaScript compressor, JS compressor, JavaScript uglifier, and JavaScript concatenator.',
  'JavaScript files often contain comments, indentation, line breaks, long spacing, and development-only formatting that make the source code easier to read but larger than necessary for delivery. Minification removes that extra text while preserving the behavior of the script. A smaller script can reduce bandwidth, improve cache efficiency, and make simple static websites load with less overhead. If the JavaScript is embedded in an HTML page, clean the surrounding markup first with the [HTML Formatter](/html-formatter), then compress the script here. For smaller jobs, quick fixes, WordPress snippets, Shopify theme code, Webflow embeds, Chrome extension scripts, documentation examples, or legacy pages without a build step, an online JavaScript compressor is often faster.',
  'The tool also works as a JavaScript concatenator. Upload multiple JavaScript files and it combines them using the separator you choose. This is useful when a small project has separate helper, utility, analytics, and UI scripts but the final page expects one file. The file list and byte counters make it clear how much source code went in and how much compressed code came out. After compression you can copy the output, download a script.min.js file, or compare the original and compressed versions with the [Diff Checker](/diff-checker/) before publishing.',
  'Unlike many online code tools, this JavaScript minifier runs fully in your browser. Your source code is not uploaded to a server. That matters when you are working with proprietary frontend logic, client snippets, private analytics code, internal admin scripts, or code that includes API routes, selectors, or business rules you do not want stored elsewhere. Everything happens locally with standard browser JavaScript APIs.',
  'The minifier includes practical switches rather than hiding everything behind one button. Remove comments strips ordinary line and block comments. Keep license comments preserves important copyright and license notices. Remove optional semicolons trims a little more when semicolons are clearly unnecessary. Uglify local variable names attempts simple identifier shortening for small scripts. Wrap in IIFE can isolate a pasted script from the global scope. Add use strict prepends strict mode for older scripts that need it. These options give you enough control for common browser snippets without forcing a full production build configuration.',
  'For advanced production applications, a dedicated build pipeline is still recommended. Tools like Terser, esbuild, SWC, Rollup, Vite, webpack, and UglifyJS understand modern module graphs, source maps, tree shaking, dead-code elimination, environment replacement, transpilation, and advanced syntax transforms. This browser tool is designed for quick compression, inspection, concatenation, and one-off output. It is especially useful when you want a fast result without installing packages, opening a terminal, or configuring a project.',
  'If you are optimizing a full frontend page, combine this with other browser-based tools. Use the [HTML Formatter](/html-formatter) for readable markup, the [CSS Minifier and Beautifier](/css-minifier-beautifier) for stylesheets, the [CSS Autoprefixer](/css-autoprefixer) for browser prefixes, the [Diff Checker](/diff-checker/) to compare before and after code, and the [Code Screenshot Generator](/code-screenshot-generator) when sharing a clean snippet with a team. If your script contains patterns or selectors you need to validate, use the [Regex Tester](https://fwdtools.com/regex-tester/). If the script consumes API data, use the [JSON Formatter](/json-formatter/) to inspect sample payloads before wiring them into code.',
].join('\n\n');

const features = [
  'Minify JavaScript online from pasted code or uploaded files.',
  'Concatenate multiple JavaScript files into one combined output.',
  'Remove comments while preserving license and copyright notices.',
  'Compress whitespace around operators, braces, arrays, objects, calls, and statements.',
  'Optionally remove clearly optional semicolons for smaller output.',
  'Optionally uglify simple local identifiers for smaller, less readable code.',
  'Wrap scripts in an IIFE to reduce accidental global scope pollution.',
  'Add use strict to older scripts before compression.',
  'Choose a custom separator between concatenated files.',
  'Track input size, output size, bytes saved, and percentage reduction.',
  'Beautify compressed JavaScript for quick inspection and debugging.',
  'Copy output to clipboard or download a script.min.js file.',
  'Works locally in the browser with no upload, account, or install.',
];

const howToUse = {
  items: [
    { title: 'Paste or upload JavaScript', text: 'Paste source code into the input editor, or upload multiple .js, .mjs, or .cjs files. When files are uploaded, the tool combines their content using the configured separator before compression.' },
    { title: 'Choose compression options', text: 'Leave the default options on for ordinary minification, or adjust comments, license comment preservation, semicolon removal, simple uglification, IIFE wrapping, and use strict insertion.' },
    { title: 'Compress the script', text: 'Click Compress JS to generate a compact output. The stats panel shows input bytes, output bytes, saved bytes, and the reduction percentage so you can judge whether the compression is meaningful.' },
    { title: 'Review or beautify', text: 'Inspect the compressed output directly, or use Beautify output when you want a readable version for checking behavior, comparing changes, or debugging a pasted snippet.' },
    { title: 'Copy or download', text: 'Copy the compressed JavaScript to your clipboard or download it as script.min.js. If you are editing a full page, compare the before and after output with the [Diff Checker](/diff-checker/) before publishing, then compress matching styles with the [CSS Minifier and Beautifier](/css-minifier-beautifier).' },
  ],
};

const useCases = [
  { icon: 'CODE', title: 'Compress a JavaScript snippet for a website', desc: 'Paste a custom script for a landing page, blog, CMS field, or static website and generate compact JavaScript. Use the [HTML Formatter](/html-formatter) first when the script is inside a full HTML document.' },
  { icon: 'FLOW', title: 'Concatenate multiple JS files', desc: 'Upload helpers, utilities, and page scripts, combine them into one file, and download a single .min.js output for smaller projects or legacy templates.' },
  { icon: 'ZIP', title: 'Reduce script file size quickly', desc: 'Remove whitespace and comments from development code before publishing a small script, embed, bookmarklet, widget, or internal browser utility. Pair it with the [CSS Minifier and Beautifier](/css-minifier-beautifier) for stylesheet compression.' },
  { icon: 'SAFE', title: 'Keep private source code local', desc: 'Minify proprietary snippets, client scripts, and internal JavaScript in the browser. The code is processed locally and is not uploaded to a server.' },
  { icon: 'DOC', title: 'Preserve license comments', desc: 'Keep important license or copyright comments while stripping ordinary development notes, TODOs, and explanatory comments from the production output.' },
  { icon: 'WEB', title: 'Prepare quick assets for static hosting', desc: 'Create a compressed JavaScript file for GitHub Pages, Netlify, Cloudflare Pages, Webflow embeds, Shopify themes, or plain HTML projects. Use [CSS Autoprefixer](/css-autoprefixer) when your styles also need browser-prefix cleanup.' },
];

const tips = [
  'Test minified JavaScript in the target page before publishing, especially when using the optional identifier uglification mode.',
  'Keep license comments enabled when compressing third-party code that includes copyright or open-source license notices.',
  'Use a bundler for large production applications that need module resolution, source maps, tree shaking, or modern syntax transforms.',
  'Compress JavaScript, CSS, and HTML separately when working on static pages: use this tool for scripts, [CSS Minifier and Beautifier](/css-minifier-beautifier) for styles, and [HTML Formatter](/html-formatter) for readable markup.',
  'Pair minification with HTTP compression such as Brotli or gzip for better real-world transfer savings.',
  'Avoid pasting secrets, API keys, or private tokens into any frontend JavaScript file, even when a tool runs locally.',
];

const faqs = faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text }));

export default function JavascriptMinifierPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><JavascriptMinifierTool /></div>
      <AdSlot slot="javascript-minifier-below-tool" />
      <IndexOnly><SeoSection
        slug="javascript-minifier"
        title="JavaScript Minifier Online - Compress, Uglify, and Concatenate JS"
        subtitle="Paste JavaScript or upload multiple files, remove comments, compress whitespace, optionally uglify identifiers, and download a .min.js file."
        sections={[
          { type: '2col', left: { type: 'text', label: 'About this tool', heading: 'Free Online JavaScript Minifier, Compressor, Uglifier, and Concatenator', text: about }, right: { type: 'features', heading: 'Features', items: features } },
          { type: 'steps', heading: 'How to Use', items: howToUse.items },
          { type: 'cards', heading: 'Common Use Cases', columns: 3, items: useCases },
          { type: 'features', heading: 'Best Practices for JavaScript Compression', items: tips },
          { type: 'faq', heading: 'Frequently Asked Questions', items: faqs },
        ]}
      /></IndexOnly>


    </div>
  );
}
