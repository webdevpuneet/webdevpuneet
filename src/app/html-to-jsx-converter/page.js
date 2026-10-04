import HtmlToJsxConverterTool from '@/components/HtmlToJsxConverterTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'HTML to JSX Converter — Convert HTML to React JSX Online Free | webdevpuneet.com',
  description: 'Convert HTML to React JSX instantly — auto-handles className, htmlFor, camelCase events, self-closing tags, and inline styles. Free, in-browser.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/html-to-jsx-converter/' },
  icons: { icon: '/icons/html-to-jsx-converter.svg', shortcut: '/icons/html-to-jsx-converter.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/html-to-jsx-converter/', siteName: 'webdevpuneet.com', title: 'HTML to JSX Converter — Free Online React Converter', description: 'Convert HTML to valid JSX instantly. Auto-handles class→className, events, inline styles, self-closing tags. Free, no sign-up.', images: [{ url: 'https://webdevpuneet.com/images/html-to-jsx-converter.png', width: 1200, height: 630, alt: 'HTML to JSX Converter' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'HTML to JSX Converter — Free Online React Converter', description: 'Convert HTML to valid JSX instantly — handles class→className, events, inline styles. Free, no sign-up.', images: ['https://webdevpuneet.com/images/html-to-jsx-converter.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Why do I get errors when I paste HTML into React?', acceptedAnswer: { '@type': 'Answer', text: 'JSX requires different attribute names than HTML. class must be className (class is a reserved JavaScript keyword), for on labels must be htmlFor, inline style must be a JavaScript object with camelCase properties rather than a CSS string, and event attributes like onclick must be camelCase (onClick). Void elements like br and img must be self-closed with a slash. This converter handles all of these transformations automatically.' } },
    { '@type': 'Question', name: 'Why does class become className in JSX?', acceptedAnswer: { '@type': 'Answer', text: 'class is a reserved keyword in JavaScript used to define ES6 classes. If JSX used the attribute name class, the JavaScript parser would throw a syntax error during compilation. React uses className instead. When React renders JSX to the real DOM, it automatically converts className back to the HTML class attribute.' } },
    { '@type': 'Question', name: 'How are HTML inline styles converted to JSX?', acceptedAnswer: { '@type': 'Answer', text: 'HTML inline styles are CSS strings: style="background-color: red; font-size: 16px". JSX requires a JavaScript object: style={{ backgroundColor: "red", fontSize: "16px" }}. The converter parses the CSS string, camelCases every property name (background-color → backgroundColor, border-radius → borderRadius), and wraps the result in double braces.' } },
    { '@type': 'Question', name: 'What event handler attributes are converted?', acceptedAnswer: { '@type': 'Answer', text: 'All on* HTML event attributes are converted to camelCase React equivalents: onclick → onClick, onmouseover → onMouseOver, onkeydown → onKeyDown, onchange → onChange, onsubmit → onSubmit, onfocus → onFocus, onblur → onBlur. React uses camelCase for all event handlers consistently.' } },
    { '@type': 'Question', name: 'What happens to br, img, and input elements?', acceptedAnswer: { '@type': 'Answer', text: 'In HTML5, void elements have no closing tags. In JSX, all elements must be explicitly closed — void elements get a self-closing slash: <br />, <img />, <input />, <hr />. The converter auto-closes all recognized void elements, preventing the "JSX element has no corresponding closing tag" compile error.' } },
    { '@type': 'Question', name: 'Can I wrap the output in a React component?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Toggle "Wrap in component" to surround the JSX output in a default-exported named functional component: export default function Component() { return (...) }. Rename the placeholder name in your editor after pasting — this makes the output paste-ready as a complete new component file.' } },
    { '@type': 'Question', name: 'Are data-* and aria-* attributes preserved?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. data-* and aria-* attributes are identical in HTML and JSX — they pass through unchanged. Only the attributes that differ between HTML and JSX (class, for, style, on* events) are transformed.' } },
    { '@type': 'Question', name: 'How do I convert an HTML template from a UI kit (Bootstrap, Tailwind, etc.) to React?', acceptedAnswer: { '@type': 'Answer', text: 'Paste the HTML snippet directly into the converter. All class attributes are converted to className — this includes complex Tailwind class strings and Bootstrap utility classes, which are preserved exactly as-is since JSX just changes the attribute name, not the values. If the template uses data-bs-* Bootstrap JavaScript attributes or aria- accessibility attributes, these pass through unchanged. Event handlers like onclick="myFunction()" are converted to the camelCase form onClick but their string values are left as-is — in a real component you would replace the string value with a proper JSX event handler function reference.' } },
    { '@type': 'Question', name: 'What is dangerouslySetInnerHTML and when should I use it instead of converting?', acceptedAnswer: { '@type': 'Answer', text: 'dangerouslySetInnerHTML is a React prop that injects a raw HTML string into the DOM without converting it to JSX: <div dangerouslySetInnerHTML={{ __html: htmlString }} />. This is appropriate when the HTML is dynamic and user-generated (a rich-text editor output, a CMS body field, a server-rendered HTML block) — content you cannot control at build time. Use this converter when the HTML is static and known at build time — a template you copied from a UI kit, documentation, or design tool. Converting to real JSX is always preferable for static content because React can manage the output correctly, whereas dangerouslySetInnerHTML bypasses React\'s rendering and can introduce XSS vulnerabilities if the HTML contains untrusted input.' } },
    { '@type': 'Question', name: 'Why does self-closing matter in JSX but not in HTML5?', acceptedAnswer: { '@type': 'Answer', text: 'HTML5 parsers are designed to handle missing closing tags gracefully — <br> is perfectly valid HTML. JSX is compiled by a JavaScript parser (Babel or the TypeScript compiler) that follows XML-like rules requiring every opening tag to have a closing tag or a self-closing slash. Without the slash, <br> in JSX throws a "JSX element has no corresponding closing tag" compile error that stops your build. The converter adds the required slash to all recognized void elements: br, hr, img, input, area, base, col, embed, link, meta, param, source, track, and wbr. This is a purely syntactic transformation — the rendered HTML output is identical.' } },
    { '@type': 'Question', name: 'Can I convert a full multi-component HTML file to React?', acceptedAnswer: { '@type': 'Answer', text: 'The converter handles any amount of HTML markup in a single pass — paste a full page template, a multi-section layout, or an entire email template and the JSX output covers all of it. For large HTML files intended to become multiple React components, the best approach is to paste the full HTML first to get the converted JSX, then manually split it into component functions. The "Wrap in component" toggle wraps the entire output in one functional component — this is a good starting point from which to extract smaller sub-components.' } },
    { '@type': 'Question', name: 'Does this work for converting HTML emails to React Email format?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, and this is one of the most common use cases. HTML email templates are built with extensive inline styles (since email clients do not support external stylesheets) and many attribute-driven formatting properties. All inline style strings are converted to JavaScript style objects automatically, which is the exact format React Email and similar libraries require. After converting, replace generic HTML tags with React Email\'s semantic components (<Html>, <Body>, <Section>, <Text>, <Button>) as needed — the attribute conversions are already handled.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HTML to JSX Converter',
  url: 'https://webdevpuneet.com/html-to-jsx-converter/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online HTML to JSX converter that handles all React-specific transformations including className, htmlFor, camelCase events, and inline style objects.',
  featureList: ['class→className', 'for→htmlFor', 'camelCase event handlers', 'inline style objects', 'self-closing void elements', 'JSX comment conversion', 'wrap in component toggle'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'HTML to JSX Converter', item: 'https://webdevpuneet.com/html-to-jsx-converter/' },
  ],
};

const SEO = {
  slug: 'html-to-jsx-converter',
  title: 'HTML to JSX Converter — Free Online React Converter',

  about: {
    title: 'Paste HTML, Get Valid JSX — class→className, Inline Styles, and Event Handlers Converted',
    description: `You copied an HTML template from a CMS, a design tool, or a tutorial and pasted it into a React component — and now you have a wall of compile errors because class needs to be className, for needs to be htmlFor, style="background-color: red" needs to be style={{ backgroundColor: "red" }}, and onclick needs to be onClick. Fix all of them at once in one paste.\n\nThis converter handles every HTML-to-JSX transformation automatically: \`class\` → \`className\` (because \`class\` is a reserved JavaScript keyword), \`for\` on labels → \`htmlFor\`, inline style strings → JavaScript objects with camelCased property names (\`background-color: red; font-size: 16px\` → \`{{ backgroundColor: "red", fontSize: "16px" }}\`), all \`on*\` event attributes → camelCase React equivalents drawn from a lookup table covering roughly 30 events (\`onclick\` → \`onClick\`, \`onmouseover\` → \`onMouseOver\`, \`ondragstart\` → \`onDragStart\`, \`onpointerdown\` → \`onPointerDown\`), void elements (\`br\`, \`img\`, \`input\`, \`hr\`) → self-closed form (\`<br />\`), and HTML comments → JSX comments (\`<!-- -->\` → \`{/* */}\`). A second lookup table handles the less obvious lowercase-to-camelCase attributes JSX requires beyond class and for — \`tabindex\` → \`tabIndex\`, \`readonly\` → \`readOnly\`, \`colspan\`/\`rowspan\` → \`colSpan\`/\`rowSpan\`, \`maxlength\` → \`maxLength\`, \`contenteditable\` → \`contentEditable\` — that are easy to miss when fixing errors by hand one at a time.\n\nAttribute values also get type-aware treatment rather than being left as bare strings: a value of \`true\`/\`false\` becomes a boolean attribute or an explicit \`{false}\` expression, a numeric-looking value like \`tabindex="0"\` becomes \`tabIndex={0}\` instead of the string \`"0"\`, and everything else stays a quoted string. This matters because React treats \`disabled="false\"\` (a truthy non-empty string) differently from a real boolean \`{false}\`, a common source of bugs when HTML is pasted into JSX without conversion.\n\nPaste any HTML — a single element, a component template, a CMS output block, or an email template — and the JSX output updates instantly without a button press. A Prettify step retokenizes the markup to re-indent it based on nesting depth, correctly treating self-closing and void elements as non-indenting. Toggle "Wrap in component" to get a complete named functional component ready to paste as a new file, and toggle "Wrap in Fragment" when the source HTML has multiple root-level siblings that JSX requires a single parent for. All processing runs in your browser — safe for proprietary templates and confidential code.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste your HTML into the input panel',
        text: 'Paste any HTML markup into the left input panel — a single element, a full component template, a CMS export, an email template, or a UI kit snippet. The converter processes the input automatically and the JSX output appears in the right panel instantly as you type or paste. No button press required.',
      },
      {
        title: 'Review the automatic attribute conversions',
        text: 'The tool applies all HTML-to-JSX transformations in one pass: `class` → `className`, `for` → `htmlFor`, all `on*` event attributes camelCased (`onclick` → `onClick`, `onmouseover` → `onMouseOver`), void elements self-closed (`<br />`, `<img />`), inline style strings → JS objects (`style={{ backgroundColor: "red" }}`), and HTML comments → JSX comments (`{/* comment */}`).',
      },
      {
        title: 'Toggle conversion options as needed',
        text: 'Use the option toggles in the toolbar to control specific behaviors: **Self-closing tags** (add `/>`), **class → className**, **for → htmlFor**, **Camel events** (camelCase all `on*` handlers), **Style strings → objects** (convert CSS strings to JS style objects), **Wrap in `<>…</>`** (add a JSX Fragment wrapper around multi-root markup), **Export component** (wrap everything in a named `export const MyComponent = () => (...)`).',
      },
      {
        title: 'Use Prettify to clean up messy input',
        text: 'Click **Prettify** in the input panel header to normalize indentation of the source HTML before converting. This is useful when pasting from tools with inconsistent indentation — Prettify normalizes it first so the JSX output is cleanly indented.',
      },
      {
        title: 'Copy or download the JSX output',
        text: 'Click **Copy** in the output panel header to copy the complete JSX to your clipboard. Click **Download .jsx** to save the file to disk. The output is valid JSX ready to paste directly into a `.jsx` or `.tsx` file in your React project.',
      },
      {
        title: 'Use history to restore a previous conversion',
        text: 'The tool saves the last 18 conversions in browser localStorage. Click **History** to open the history panel and click any entry to restore that input. This is useful when you accidentally cleared the input or want to re-convert a previous snippet with different options.',
      },
    ],
  },

  features: [
    'class → className — all class attributes converted for JSX compatibility in React',
    'for → htmlFor — label for attributes converted to their React JSX equivalent',
    'Event handlers camelCased — onclick/onkeydown/onmouseover → onClick/onKeyDown/onMouseOver',
    'Inline styles → JS objects — CSS property strings parsed, camelCased, and objectified; convert those CSS values to Tailwind classes with our [CSS to Tailwind](/css-to-tailwind) converter',
    'Void element self-closing — <br>, <img>, <input>, <hr> converted to self-closed form',
    'HTML comments → JSX comments — <!-- --> converted to {/* */} throughout',
    'Boolean attributes normalized — disabled, checked, readonly handled for JSX',
    'Wrap in component toggle — outputs a complete named default-exported functional component',
    'Real-time conversion — output updates instantly as you type or paste, no button needed',
    '100% client-side — no data sent to any server, safe for proprietary HTML templates; format the source HTML first with our [HTML Formatter](/html-formatter)',
  ],

  useCases: [
    {
      icon: '⇄',
      title: 'Fix className, htmlFor, and inline style errors when pasting HTML into React',
      desc: 'Paste the HTML template here first. Copy the JSX output. Paste it into your component. No more hunting through markup to fix every class → className, every style string to a style object, and every onclick to onClick one at a time. Use our [Diff Checker](https://fwdtools.com/diff-checker/) to verify the conversion changed only what it should.',
    },
    {
      icon: '◎',
      title: 'Convert a CMS or WordPress HTML block to a React component',
      desc: 'CMS systems output raw HTML you may want to convert to a real component rather than injecting via dangerouslySetInnerHTML. Paste the CMS output, copy the JSX, and componentize the structure without spending time on attribute syntax conversions.',
    },
    {
      icon: '⚙',
      title: 'Convert an HTML email template for React Email',
      desc: 'React Email and similar libraries require JSX. HTML email templates are full of inline style attributes that all need to become style objects. Paste the raw template and get JSX that compiles without errors — inline styles included.',
    },
    {
      icon: '✓',
      title: 'Understand HTML-to-JSX differences while learning React',
      desc: 'Paste any HTML example from a tutorial or Stack Overflow and see the JSX equivalent side by side. The concrete transformation applied to your specific input is more memorable than reading abstract rules in documentation.',
    },
    {
      icon: '≡',
      title: 'Clean up HTML output from an AI tool or Figma export before pasting into a component',
      desc: 'AI code tools and design-to-code platforms often output HTML. Format it first with our [HTML Formatter](/html-formatter) to normalize indentation, then paste it here to get valid JSX — verify the conversions and copy it in one step.',
    },
    {
      icon: '▦',
      title: 'Quickly wrap an HTML snippet in a named React component',
      desc: 'Enable "Wrap in component" to surround the JSX in an exported named functional component. Paste as a new .tsx file and start filling in props — the structural scaffolding is done. Apply Tailwind classes via our [CSS to Tailwind](/css-to-tailwind) converter to replace any inline styles in the output.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function HtmlToJsxConverterPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><HtmlToJsxConverterTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
