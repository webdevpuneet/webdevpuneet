import JsonFormatterTool from '@/components/JsonFormatterTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Format JSON Online Free — JSON Beautifier, Validator & Minifier | webdevpuneet.com',
  description: 'Format, validate, and minify JSON instantly in your browser — syntax highlighting, sort keys, and error line numbers. Free forever, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/json-formatter/' },
  icons: { icon: '/icons/json-formatter.svg', shortcut: '/icons/json-formatter.svg', apple: '/icons/json-formatter.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/json-formatter/', siteName: 'webdevpuneet.com', title: 'JSON Formatter Online — Beautify, Validate & Minify JSON', description: 'Free JSON formatter, validator and minifier. Syntax highlighting, sort keys, minify — runs entirely in your browser.', images: [{ url: 'https://webdevpuneet.com/images/json-formatter-thumbnail.png', width: 1200, height: 630, alt: 'JSON Formatter Online' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'JSON Formatter Online — Beautify, Validate & Minify JSON', description: 'Free JSON formatter and validator. Syntax highlighting, sort keys, minify — runs entirely in your browser.', images: ['https://webdevpuneet.com/images/json-formatter-thumbnail.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'I have minified JSON from an API response and can\'t read it — how do I format it?', acceptedAnswer: { '@type': 'Answer', text: 'Paste the minified JSON into the input panel on the left. The formatter instantly applies indentation, line breaks, and syntax highlighting so you can read the nested structure. It also validates the JSON as you paste — if there\'s a syntax problem, you\'ll see the exact line and column number where the error is. Press Ctrl+Enter or click Format to apply full beautification. Use the indent selector to choose 2-space, 4-space, or tab indentation to match your project style. The formatted output is ready to copy or download.' } },
    { '@type': 'Question', name: 'How do I validate JSON online and see exactly where the error is?', acceptedAnswer: { '@type': 'Answer', text: 'Paste your JSON and the validator highlights errors in real time as you type. When your JSON is invalid, a red error banner shows the exact error message along with the line and column number — so you can jump straight to the problem instead of scanning the entire file. The validator catches trailing commas (valid in JavaScript but not JSON), single-quoted strings, unquoted object keys, mismatched brackets and braces, invalid escape sequences, and bare values like undefined or NaN.' } },
    { '@type': 'Question', name: 'I copied a JavaScript object from console.log and it\'s not valid JSON — how do I fix it?', acceptedAnswer: { '@type': 'Answer', text: 'Click the Repair button. JavaScript object literals differ from JSON in several ways that cause parse errors: keys are unquoted (name: instead of "name":), strings can use single quotes instead of double quotes, and trailing commas are allowed after the last property. The Repair function converts all of these to valid JSON automatically — it quotes unquoted keys, converts single-quoted strings to double-quoted strings, removes trailing commas, and replaces JavaScript-only values like undefined with null. It also handles Python dicts: True → true, False → false, None → null. After repair, the corrected JSON is formatted and ready to use.' } },
    { '@type': 'Question', name: 'My JSON has a "trailing comma" error — how do I fix it?', acceptedAnswer: { '@type': 'Answer', text: 'Click Repair — it removes trailing commas automatically. A trailing comma error means there is a comma after the last element in an object or array: {"name": "Alice",} or [1, 2, 3,]. JavaScript allows this but the JSON specification does not. Repair strips all trailing commas throughout the entire structure in one click. If you want to fix it manually, the validator shows you the exact line and column number of the problem.' } },
    { '@type': 'Question', name: 'How do I fix JSON that has Python-style True, False, None or JavaScript NaN and undefined?', acceptedAnswer: { '@type': 'Answer', text: 'Click the Repair button. Python boolean and null literals (True, False, None) are not valid JSON — JSON requires lowercase true, false, null. The same applies to JavaScript-only values: undefined, NaN, Infinity, and -Infinity are not in the JSON specification. Repair replaces all of these with their valid JSON equivalents in one pass: True → true, False → false, None → null, undefined → null, NaN → null, Infinity → null. This is the common issue when serializing Python dicts to JSON without using json.dumps(), or when logging JavaScript objects that contain non-serializable values.' } },
    { '@type': 'Question', name: 'How do I find the path to a specific nested field in JSON?', acceptedAnswer: { '@type': 'Answer', text: 'Format your JSON first, then click any line in the tree view. The bottom status bar instantly shows the full dot-notation path to that field — for example $.users[0].address.city. This tells you exactly how to access the field in JavaScript (response.users[0].address.city), Python (data["users"][0]["address"]["city"]), or a JSONPath query ($..city). Keys with special characters use bracket notation automatically: $.data["@type"] or $.config["content-type"]. This is faster than manually tracing brackets when working with deeply nested API responses.' } },
    { '@type': 'Question', name: 'How do I minify JSON to reduce its size?', acceptedAnswer: { '@type': 'Answer', text: 'Click the Minify button to strip all whitespace, line breaks, and indentation from your JSON, producing the smallest possible single-line string. This is the format used in API response bodies and stored database payloads to minimize bandwidth and storage. A typical 10KB pretty-printed JSON file compresses to 4–5KB minified. Use this before pasting JSON into an environment variable, a curl request body, a CloudFormation template, or any other field where whitespace is wasted space. Enable the Wrap toggle if you need to read the minified output without horizontal scrolling.' } },
    { '@type': 'Question', name: 'How do I sort JSON keys alphabetically?', acceptedAnswer: { '@type': 'Answer', text: 'Click Sort Keys in the toolbar. This reorders all object keys alphabetically at every nesting level throughout the entire JSON — it\'s not just the top level, every nested object is sorted too. This is most useful before diffing two JSON objects: if both have the same fields but in different key order, sorting them first ensures the diff only shows genuine value differences, not spurious key-order noise. It also enforces consistent key ordering in config files before committing to version control.' } },
    { '@type': 'Question', name: 'Is there a free JSON formatter that works without signing up or installing anything?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — this tool is completely free with no account, no login, and no extension or software to install. Everything runs in your browser. Paste your JSON, format it, and copy the result. There are no usage limits, no file size caps for typical API responses, and no ads that block access to the tool. The formatter works in Chrome, Firefox, Safari, and Edge on both desktop and mobile.' } },
    { '@type': 'Question', name: 'Is my JSON data private? Can I paste API keys or user data safely?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely private. All JSON parsing, formatting, validation, minification, and repair runs inside your browser using the built-in JavaScript JSON.parse engine — nothing is uploaded to any server. You can safely paste API responses that contain authentication tokens, Bearer tokens, private user records, payment data, or any other sensitive content. When you close or refresh the tab, all pasted data is permanently gone.' } },
    { '@type': 'Question', name: 'How do I compare two JSON objects and find what changed?', acceptedAnswer: { '@type': 'Answer', text: 'Format and sort keys on both JSON objects using Sort Keys, then paste them into a diff checker to compare. Because Sort Keys alphabetically reorders all keys at every level, the diff will highlight only genuine value differences — not noise from different key ordering. This is the standard workflow for comparing API response schemas across versions, config files across environments, or OpenAPI spec definitions before and after a change.' } },
    { '@type': 'Question', name: 'Can this handle large JSON files from a database dump or log export?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The formatter handles multi-megabyte JSON files in the browser. Files up to a few MB typically parse and format in under a second on modern devices. For very large files — 10MB or more — the parse and render may take a few seconds since all processing happens in your browser\'s JavaScript engine. For extremely large datasets (100MB+), a terminal tool like jq is faster, but for typical API responses, config files, and database exports this formatter handles them without issues.' } },
    { '@type': 'Question', name: 'How do I download or save the formatted JSON?', acceptedAnswer: { '@type': 'Answer', text: 'Click the Download button in the output panel to save the formatted JSON as a .json file. The downloaded file uses whichever indentation you selected (2 spaces, 4 spaces, or tabs) and reflects any transformations you applied — including key sorting and minification. This is useful when you want to commit a normalized, formatted config file to version control, or when sharing a readable API response with a teammate in a bug report.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JSON Formatter Online',
  url: 'https://webdevpuneet.com/json-formatter/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online JSON formatter, validator, and minifier. Paste minified or broken JSON and instantly beautify, validate, sort keys, or minify it in your browser. No sign-up required.',
  featureList: ['Live JSON validation with error line and column number', 'Syntax highlighting for keys, strings, numbers, booleans, and null', 'Beautify with 2-space, 4-space, or tab indentation', 'Minify JSON to compact single-line format', 'Repair broken JSON — fixes JS objects, Python dicts, single quotes, unquoted keys, trailing commas, NaN, undefined, missing brackets', 'Sort all object keys alphabetically at every nesting level', 'JSON path display — click any tree node to see its full dot-notation path', 'Wrap toggle for long lines', 'Collapsible tree view with collapse/expand all', 'Copy output to clipboard or download as .json file', 'Upload or drag-and-drop .json files', 'Keyboard shortcut Ctrl+Enter', 'Stats bar: key count, max depth, byte size', '100% private — runs entirely in browser'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'JSON Formatter', item: 'https://webdevpuneet.com/json-formatter/' },
  ],
};

const SEO = {
  slug: 'json-formatter',
  title: 'Format JSON Online Free — JSON Beautifier, Validator & Minifier',

  about: {
    title: 'Format, Repair, and Explore JSON — Validate, Minify, Sort Keys, Find Paths',
    description: 'You got a wall of minified JSON back from an API and can\'t read it. You copied a JavaScript object from console.log and it won\'t parse. You\'re getting a mysterious "Unexpected token" error somewhere in a 500-line config file. Or you need to find the exact dot-notation path to a deeply nested field before writing any code. This tool handles all of it — paste your JSON and it instantly beautifies, validates, repairs, and gives you full syntax highlighting, right in your browser.\n\nThe **Repair** button is the thing most JSON formatters don\'t have. Real-world JSON breaks in predictable ways: JavaScript object literals have unquoted keys (`name:` instead of `"name":`), single-quoted strings, trailing commas, and values like `undefined` and `NaN` that aren\'t in the JSON spec. Python dicts use `True`, `False`, and `None` instead of `true`, `false`, `null`. Pasted content from Google Docs or Word uses curly/smart quotes instead of straight quotes. Repair fixes all of these in one click — it converts the input to valid JSON, formats it, and saves it to history so you can undo.\n\nThe **JSON path** feature solves a different problem: you have a deeply nested response and need to know exactly how to reference a field in code. Click any line in the tree view and the bottom bar shows the full path — `$.orders[0].billing.address.city` — ready to paste into your JavaScript, Python, or JSONPath query.\n\nNeed to go the other way? Minify strips all whitespace to a single line for curl bodies, environment variables, and database fields. Sort Keys alphabetically reorders every key at every nesting level — essential before diffing two JSON objects so your diff only shows genuine value changes instead of key-order noise. Wrap toggle lets you read long minified lines without horizontal scrolling.\n\nEverything runs 100% in your browser. Nothing is uploaded to any server. Paste auth tokens, user records, payment data — it all stays on your machine. No account, no install, no rate limits.',
  },

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste or upload your JSON',
        text: 'Paste raw or minified JSON directly into the left input panel. You can also click **Upload JSON** to load a `.json` file from disk, or drag and drop a file onto the input panel. The formatter validates and syntax-highlights your JSON automatically as you type — a green indicator means valid, a red error banner shows the exact position of any syntax error.',
      },
      {
        title: 'Format or repair broken JSON',
        text: 'Click **Format** or press `Ctrl+Enter` to apply full beautification. Use the **Indent** dropdown to choose 2-space, 4-space, or Tab indentation. If your JSON has issues — JavaScript object with unquoted keys, Python `True`/`False`/`None`, single-quoted strings, trailing commas — click **Repair** to auto-fix all common problems in one pass.',
      },
      {
        title: 'Explore the interactive tree view',
        text: 'After formatting, the right panel shows a collapsible tree view. Click any node to expand or collapse it. Use **Collapse All** / **Expand All** to control the entire tree. Click any line and the bottom status bar shows the full dot-notation path — for example `$.orders[0].billing.address.city` — ready to paste into JavaScript, Python, or a JSONPath query.',
      },
      {
        title: 'Sort keys or minify',
        text: 'Click **Sort keys** to alphabetically reorder all object keys at every nesting level throughout the entire structure — essential before diffing two JSON objects to eliminate key-order noise. Click **Minify** to compress to a single compact line with all whitespace stripped — use the **Wrap** toggle to read long minified output without horizontal scrolling.',
      },
      {
        title: 'Search the formatted output',
        text: 'Click the search icon (or press `Ctrl+F`) to open the search bar over the output panel. Type to highlight all matches. Use the up/down navigation arrows to jump between results. This works in both flat text and tree view mode.',
      },
      {
        title: 'Copy, download, or check stats',
        text: 'Click **Copy Output** to copy the formatted or minified JSON to your clipboard. Click **Download** to save it as `formatted.json`. The stats bar under the output shows total key count, maximum nesting depth, and formatted byte size at a glance.',
      },
      {
        title: 'Use history to restore previous sessions',
        text: 'Every Format, Minify, Sort keys, Repair, and Upload action saves an entry to the history panel (up to 15 entries, persisted in localStorage). Click **History** to open the panel and click any entry to restore that JSON instantly.',
      },
    ],
  },

  features: [
    'Live JSON validation — validates as you type with exact error line and column number',
    'Syntax highlighting — color-codes keys, strings, numbers, booleans, and null values',
    'Repair broken JSON — one click fixes JS objects, Python dicts, single quotes, unquoted keys, trailing commas, NaN, undefined, smart quotes, and missing closing brackets',
    'JSON path display — click any tree node to see its full dot-notation path in the status bar',
    'Format with 2-space, 4-space, or tab indentation to match any project style guide; use our [HTML Formatter](/html-formatter) for HTML templates with embedded JSON',
    'Minify JSON — strips all whitespace for the smallest possible payload size',
    'Wrap toggle — switch long lines to pre-wrap so minified JSON stays readable without scrolling',
    'Collapsible tree view with collapse/expand all and item/key count labels — or view as a spreadsheet using our [JSON Table Viewer](/json-table-viewer)',
    'Sort all object keys alphabetically at every nesting level — essential before using our [Diff Checker](/diff-checker) to compare two JSON objects',
    'Copy output to clipboard or download as a .json file — or paste it into the [JSON Dashboard Generator](/json-dashboard-generator) to instantly visualize it as charts and stat cards',
    'Upload .json files or drag and drop directly onto the input panel',
    'Keyboard shortcut Ctrl+Enter — format without reaching for the mouse',
    'Stats bar — key count, max nesting depth, and formatted byte size at a glance',
    '100% private — all processing runs in your browser, nothing sent to any server; decode JWT tokens with our [JWT Decoder](https://fwdtools.com/jwt-decoder/)',
  ],

  useCases: [
    {
      icon: '{}',
      title: 'Read a minified API response without installing anything',
      desc: 'You just got a wall of compressed JSON back from a REST API, GraphQL query, or webhook and can\'t make sense of it. Paste it here and the formatter instantly applies indentation and syntax highlighting so you can trace every nested field. The color-coding makes it easy to spot missing fields, unexpected nulls, and wrong data types during integration debugging — no Postman, no extension, no install. If the response is a JSON array, also try our [JSON Table Viewer](/json-table-viewer) to browse it as a sortable table, or the [JSON Dashboard Generator](/json-dashboard-generator) to turn it into charts and stat cards instantly.',
    },
    {
      icon: '⚡',
      title: 'Fix a JavaScript object or Python dict that won\'t parse as JSON',
      desc: 'You copied an object from console.log, a Python REPL, or a Slack message and it fails to parse — unquoted keys, single quotes, trailing commas, True/False/None instead of true/false/null. Click Repair and the tool converts it to valid JSON automatically. It also handles curly/smart quotes from Google Docs and Word, undefined and NaN from JS logs, and missing closing brackets from truncated responses. One click, no manual find-replace.',
    },
    {
      icon: '✓',
      title: 'Find and fix a JSON syntax error before your API call fails',
      desc: 'You\'re writing a JSON request body or config file and keep getting a parse error with no useful message. The validator shows you the exact line and column of the problem — trailing commas, single-quoted strings, unquoted keys, mismatched brackets — so you can fix it before sending. For common JS/Python issues, click Repair to auto-fix. Catching errors locally is far faster than debugging a 400 response from a remote server.',
    },
    {
      icon: '◎',
      title: 'Find the exact path to a nested JSON field before writing code',
      desc: 'You have an API response five levels deep and need to know exactly how to reference a field in your code. Click any row in the tree view and the bottom bar shows the full dot-notation path — $.orders[0].billing.address.city — ready to paste directly into JavaScript (response.orders[0].billing.address.city), Python, or a JSONPath query. No manual bracket counting, no guessing nesting levels.',
    },
    {
      icon: '⚙',
      title: 'Make a config file readable before editing it',
      desc: 'Many tools write package.json, tsconfig.json, .eslintrc, and CI config files in compact form that is nearly impossible to navigate. Copy the file contents, format it here, make your edits in the readable output, then copy back. Use Sort Keys to enforce alphabetical key ordering before committing so your diff only shows the actual changes, not ordering noise.',
    },
    {
      icon: '⬇',
      title: 'Minify JSON before embedding in environment variables or templates',
      desc: 'Before pasting JSON into a .env file, CloudFormation template, Terraform resource, or HTTP request body — minify it. The Minify button strips all whitespace to a single line, reducing file size by 30–50% and eliminating whitespace-related parsing failures. Use the Wrap toggle to keep the minified output readable without horizontal scrolling. The output is copy-ready for any field that expects compact JSON.',
    },
    {
      icon: '⇅',
      title: 'Compare two JSON objects and see only real differences',
      desc: 'If two JSON objects have the same fields in different order, a plain diff will flag every line even though nothing actually changed. Use Sort Keys on both objects first, then paste them into our [Diff Checker](/diff-checker) — your diff will only highlight genuine value changes. This is the right workflow for comparing API schemas across versions, config files across environments, or spec files before and after a change.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function JsonFormatterPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><JsonFormatterTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
