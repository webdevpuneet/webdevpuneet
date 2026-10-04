import XmlFormatterTool from '@/components/XmlFormatterTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/xml-formatter.png';

export const metadata = {
  title: 'XML Formatter & Validator Online Free | webdevpuneet.com',
  description: 'Free XML formatter, validator, and minifier — pretty-print with syntax highlighting, validate with error line numbers, or minify. Browser-based.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/xml-formatter/' },
  icons: {
    icon: '/icons/xml-formatter.svg',
    shortcut: '/icons/xml-formatter.svg',
    apple: '/icons/xml-formatter.svg',
  },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/xml-formatter/',
    siteName: 'webdevpuneet.com',
    title: 'XML Formatter / Validator — Format, Validate & Minify XML Online',
    description: 'Free XML formatter, validator, and minifier. Syntax highlighting, configurable indentation, error detection with line numbers. Runs entirely in your browser.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'XML Formatter Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'XML Formatter / Validator — Format, Validate & Minify XML Online',
    description: 'Free XML formatter and validator. Syntax highlighting, minify, error detection — runs entirely in your browser.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I format XML online and make it readable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your XML into the input panel on the left and click Format. The tool instantly applies indentation, line breaks, and syntax highlighting so you can read the nested structure clearly. Use the indent selector in the toolbar to choose 2 spaces, 4 spaces, or tab indentation depending on your project style. Tags are highlighted in blue, attribute names in green, attribute values in yellow, and comments in gray. The output is ready to copy or download as a .xml file.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I validate XML online and see which line has an error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your XML and click Validate. If the XML is invalid, a red error banner shows the exact problem along with the line and column number — for example "Mismatched tag: expected </book> but found </books> (line 12, col 3)". Common errors caught include unclosed tags, mismatched opening and closing tag names, multiple root elements, unclosed processing instructions, and malformed CDATA sections. Fixing the shown line and column is much faster than scanning the whole document.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Format and Minify for XML?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Format (pretty-print) adds indentation and line breaks to make XML human-readable. Each nested element is indented according to its depth, making the hierarchy immediately visible. Minify does the opposite — it strips all whitespace between tags to produce the most compact single-line representation. Use Format when you need to read, debug, or edit XML. Use Minify when you need to reduce payload size for API requests, configuration storage, or any place where whitespace wastes bytes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this XML formatter handle CDATA sections and XML comments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CDATA sections (wrapped in <![CDATA[ ... ]]>) are fully preserved in both formatted and minified output. Their content is never modified — whitespace inside CDATA is kept exactly as written since CDATA is treated as raw character data. XML comments (<!-- comment -->) are also preserved and formatted at the correct indentation level. Both CDATA and comments receive distinct syntax highlighting colors in the output panel so they stand out visually from regular element content.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can this tool handle XML with namespaces and processing instructions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Namespace declarations (xmlns:prefix="uri") are treated as regular attributes and highlighted accordingly. Namespace-qualified element names like <xsi:element> and attribute names like xsi:type are fully supported. Processing instructions like <?xml version="1.0" encoding="UTF-8"?> and <?xml-stylesheet type="text/xsl" href="style.xsl"?> are preserved and displayed in pink syntax highlighting to distinguish them from regular elements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my XML data private when I use this formatter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely private. All XML parsing, formatting, validation, and minification runs entirely inside your browser using JavaScript — nothing is ever sent to any server. You can safely paste XML that contains API credentials, configuration secrets, user data, financial records, or any other sensitive content. When you close or refresh the tab, all pasted content is gone permanently. There are no analytics, no logging, and no third-party services that process your input.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I minify XML to reduce file size?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your XML and click Minify. The tool strips all whitespace between tags — spaces, tabs, newlines — leaving only the tag markup and text content. The result is the smallest valid XML representation. A typical configuration file that is 5KB when formatted can shrink to 1–2KB minified. Use minified XML in API request bodies, embedded configuration strings, environment variables, or anywhere byte count matters. The minified output preserves CDATA content and comment nodes exactly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What XML errors does the validator detect?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The validator catches the most common well-formedness errors in XML: unclosed tags (an opening tag with no matching closing tag), mismatched tag names (opening and closing tags with different names), multiple root elements (XML requires exactly one root), unclosed comments (<!-- without -->), unclosed CDATA sections (<![CDATA[ without ]]>), and unclosed processing instructions (<? without ?>). For each error the validator reports the approximate line and column number so you can jump directly to the problem.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'XML Formatter Online',
  url: 'https://webdevpuneet.com/xml-formatter/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online XML formatter, validator, and minifier. Paste XML and instantly format with syntax highlighting, validate with error line numbers, or minify to compact form. Runs in browser, no upload.',
  image: OG_IMAGE,
  featureList: [
    'Pretty-print XML with configurable 2-space, 4-space, or tab indentation',
    'Minify XML — strip all whitespace for smallest payload',
    'Validate XML with error message including line and column number',
    'Syntax highlighting — tags, attributes, values, comments, CDATA, processing instructions',
    'CDATA sections preserved in formatting and minification',
    'XML comments preserved and indented correctly',
    'Namespace and namespace-qualified attribute support',
    'Copy formatted output to clipboard',
    'Download formatted or minified XML as .xml file',
    'Sample XML button to load example document',
    '100% private — runs entirely in browser, no upload',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'XML Formatter', item: 'https://webdevpuneet.com/xml-formatter/' },
  ],
};

const SEO = {
  slug: 'xml-formatter',
  title: 'XML Formatter / Validator — Format, Validate & Minify XML Online',
  subtitle: 'Runs in your browser. No upload, no account.',

  about: {
    title: 'XML Formatter, Validator & Minifier — Pretty-Print, Validate, and Compress XML in Your Browser',
    description: `You got a wall of minified XML back from a SOAP API, a configuration file exported from a legacy system, or an RSS feed — and you can not read it. Or you wrote an XML document by hand and need to know if the tags are balanced before sending it to a parser. Or you need to compress a verbose config file before embedding it in an environment variable. This XML formatter handles all of it: paste your XML, click Format, and the tool instantly pretty-prints it with syntax highlighting, indentation, and correct nesting — right in your browser.

**Format (pretty-print) XML** adds indentation and newlines so the hierarchical structure is immediately visible. Each nested child element is indented one level deeper than its parent. You can choose 2-space indentation (the most common default), 4-space indentation (common in Java and XML Schema projects), or tab indentation to match your editor settings. XML comments are preserved at the correct indentation level. CDATA sections are kept intact without modifying the raw character data inside them. Processing instructions like the XML declaration are placed at the top of the formatted output exactly as written.

**Validate XML** checks your document for well-formedness errors — the most common cause of XML parse failures. The validator checks for unclosed tags, mismatched opening and closing tag names, multiple root elements, unclosed comments, and malformed CDATA sections. When an error is found, the error banner shows a precise message with the line and column number so you can jump directly to the problem. This catches the class of errors that make XML parsers throw with an unhelpful "unexpected token" message pointing to the end of the file rather than the actual problem location.

**Minify XML** strips all inter-tag whitespace — spaces, tabs, and newlines — leaving only the markup and text content. A typical formatted XML configuration file that is 6KB pretty-printed can become 1–2KB minified. Use the minified output in API request bodies, HTTP headers, environment variables, CloudFormation templates, or any field where compact XML is expected. The minifier preserves CDATA sections without altering their contents, since CDATA whitespace is semantically significant.

**Syntax highlighting** colors different parts of the XML structure so you can scan it quickly: element names in blue, attribute names in green, attribute values in yellow, comments in gray italic, CDATA sections in purple, and processing instructions in pink. This makes it easy to spot a misspelled attribute name, a missing closing quote, or an incorrect element name at a glance.

All processing runs entirely in your browser. No server receives your XML. No data is uploaded, logged, or stored. You can safely paste XML that contains database credentials, API keys, private configuration, financial records, or patient data — it never leaves your machine. There is no account required, no rate limits, and no install.`,
  },

  features: [
    '**Format (pretty-print) XML** — apply configurable indentation and newlines so deeply nested structures are easy to read and navigate',
    '**Minify XML** — strip all inter-tag whitespace to produce the smallest valid XML representation for API payloads and config storage; convert between formats with the [YAML to JSON converter](https://fwdtools.com/yaml-json-converter/) or [CSV to JSON converter](https://fwdtools.com/csv-json-converter/)',
    '**Validate XML online** — check well-formedness with precise error messages showing line and column numbers for mismatched or unclosed tags — the XML counterpart to the [JSON formatter](/json-formatter)',
    '**Syntax highlighting** — color-code element names, attribute names, attribute values, comments, CDATA sections, and processing instructions',
    '**CDATA section support** — CDATA blocks are preserved exactly in formatting and minification without modifying the raw character data',
    '**XML comment preservation** — comments are kept and indented at the correct level in formatted output',
    '**Configurable indentation** — choose 2 spaces, 4 spaces, or tabs to match your project or editor style guide',
    '**Copy and Download** — copy the formatted or minified output to clipboard, or download as a .xml file ready for use',
    '**Sample XML button** — load a ready-made example document with nested elements, attributes, and a CDATA section to explore the tool',
    '**100% private** — runs fully in your browser, no data is uploaded or stored anywhere',
    '**Namespace and processing instruction support** — handles xmlns declarations, namespace-qualified tags, and <?xml?> processing instructions',
    '**Responsive two-panel layout** — input on the left, syntax-highlighted output on the right; stacks vertically on mobile',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste your XML',
        text: 'Click the input panel on the left and paste your XML. This can be minified XML from an API response, a hand-written document with uncertain structure, a configuration file, or any XML string you want to inspect.',
      },
      {
        title: 'Click Format to pretty-print',
        text: 'Click the Format button to apply indentation and newlines. Use the indent selector to choose 2 spaces, 4 spaces, or tabs. The formatted XML appears in the right panel with syntax highlighting. If your XML has a well-formedness error, a red status banner shows the error message and line number.',
      },
      {
        title: 'Validate to check for errors',
        text: 'Click Validate to check your XML for well-formedness issues without reformatting the output. The status bar shows either "Valid XML" in green or a detailed error message in red with the approximate line and column number where the problem was detected.',
      },
      {
        title: 'Minify for compact output',
        text: 'Click Minify to strip all whitespace between tags. This produces the smallest possible XML string. CDATA content is preserved unmodified. Use the minified output in API bodies, environment variables, or any field that expects compact XML.',
      },
      {
        title: 'Copy or Download the result',
        text: 'Click Copy to copy the formatted or minified output to your clipboard, ready to paste into your code editor, terminal, or HTTP client. Click Download to save the result as formatted.xml on your machine.',
      },
    ],
  },

  useCases: [
    {
      icon: '{}',
      title: 'Debug a SOAP API or RSS feed response',
      desc: 'SOAP web services and RSS feeds return XML that is compact or difficult to read inline. Paste the response here and click Format to see the element hierarchy clearly with syntax highlighting. The color-coded output makes it easy to find missing fields, extra elements, or unexpected attribute values during integration work — without installing Postman or a dedicated XML editor.',
    },
    {
      icon: '✓',
      title: 'Validate hand-written XML before deployment',
      desc: 'Writing an XML configuration file, XSLT stylesheet, or Ant build script by hand is error-prone. Paste the file and click Validate before deploying. The validator reports any unclosed tags, mismatched tag names, or multiple root elements with the line and column number so you can fix problems locally rather than diagnosing a cryptic parse error from a remote server or build system.',
    },
    {
      icon: '⚡',
      title: 'Minify XML for API requests and environment variables',
      desc: 'Before embedding XML in a curl command, an HTTP request body, a CloudFormation template parameter, or a Kubernetes ConfigMap — minify it. The Minify button strips all inter-tag whitespace in one click. CDATA content is preserved without modification. The result is copy-ready for any field that expects compact XML without line breaks.',
    },
    {
      icon: '◎',
      title: 'Read a Maven pom.xml or Spring configuration file',
      desc: 'Maven pom.xml files and Spring applicationContext.xml files are often several hundred lines long and deeply nested. Paste the file, adjust the indent selector to 2 or 4 spaces, and click Format to normalize inconsistent indentation from different contributors. The formatted version is much easier to navigate and edit.',
    },
    {
      icon: '⚙',
      title: 'Format XML Schema (XSD) and WSDL files',
      desc: 'XSD schema files and WSDL service definitions use deeply nested XML structures with namespace declarations. Paste the XSD or WSDL and format it to see the type hierarchy and element constraints clearly. Syntax highlighting distinguishes element names from attribute names and values so you can read complex schema structures at a glance.',
    },
    {
      icon: '⬇',
      title: 'Clean up exported configuration files',
      desc: 'Many tools export XML configuration — IntelliJ run configurations, Android resource files, SVG exports from Figma, Office Open XML fragments. Exported files often have inconsistent or missing indentation. Paste and format to normalize the structure, then copy back into your project. The output uses your chosen indentation style and consistent newlines throughout.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function XmlFormatterPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><XmlFormatterTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
