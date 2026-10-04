import HtmlEntityEncoderTool from '@/components/HtmlEntityEncoderTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/html-entity-encoder.png';

export const metadata = {
  title: 'HTML Entity Encoder / Decoder — Named & Numeric Entities | Free Online',
  description: 'Encode HTML special characters to named or numeric entities and decode them back to plain text. Full Unicode support with a reference table. Free.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/html-entity-encoder/' },
  icons: { icon: '/icons/html-entity-encoder.svg', shortcut: '/icons/html-entity-encoder.svg' },
  openGraph: {
    type: 'website', url: 'https://webdevpuneet.com/html-entity-encoder/', siteName: 'webdevpuneet.com',
    title: 'HTML Entity Encoder / Decoder',
    description: 'Encode HTML to safe entities, decode entities to plain text. Named, numeric, and full Unicode encoding modes.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'HTML Entity Encoder / Decoder', description: 'Encode &, <, > and more to HTML entities — or decode them back. Named + numeric + full Unicode.', images: [OG_IMAGE] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is HTML entity encoding and why is it needed?',
      acceptedAnswer: { '@type': 'Answer', text: 'HTML entity encoding converts characters that have special meaning in HTML (like <, >, &, ") into safe representations that browsers display as text rather than interpreting as markup. For example, < becomes &lt;. This is essential to prevent XSS (cross-site scripting) attacks when displaying user-submitted content, and to correctly render special characters in HTML documents.' } },
    { '@type': 'Question', name: 'What is the difference between &amp;, &#38;, and named entities?',
      acceptedAnswer: { '@type': 'Answer', text: '&amp; is the named entity for & (ampersand). &#38; is the decimal numeric entity for the same character (character code 38). &#x26; is the hexadecimal numeric entity. All three render identically in browsers. Named entities are more readable; numeric entities work even when the browser doesn\'t recognize the name.' } },
    { '@type': 'Question', name: 'When should I use Minimal vs Full encoding mode?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use Minimal mode (default) when you want to encode only the 5 characters that break HTML: &, <, >, ", and \'. This is sufficient for preventing XSS in most contexts. Use Full mode when embedding content in an ASCII-only environment and need to encode non-ASCII characters like ©, €, or emoji as named or numeric entities. Use Numeric mode to encode every character as its &#decimal; entity — useful for obfuscation or strict ASCII output.' } },
    { '@type': 'Question', name: 'Does this tool prevent XSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'This tool provides encoding that is the basis of XSS prevention, but it\'s a manual tool — not a library integrated into your application. For real XSS prevention, use a server-side escaping library (like DOMPurify for JavaScript, htmlspecialchars() in PHP, or your framework\'s built-in templating). Never trust user input and always escape before rendering in HTML.' } },
    { '@type': 'Question', name: 'What is &nbsp; and when should I use it?',
      acceptedAnswer: { '@type': 'Answer', text: '&nbsp; (non-breaking space, &#160;) is a space character that browsers will not collapse or wrap at. Use it when you need forced spacing between words that should not break across lines, such as between a number and its unit (10&nbsp;km) or to add padding in HTML. For regular spaces in content, use a normal space — multiple spaces in HTML are collapsed to one anyway.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HTML Entity Encoder / Decoder',
  url: 'https://webdevpuneet.com/html-entity-encoder/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online HTML entity encoder and decoder — convert special characters to named or numeric entities and decode them back to plain text, with full Unicode support. Runs entirely in your browser.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'HTML Entity Encoder / Decoder', item: 'https://webdevpuneet.com/html-entity-encoder/' },
  ],
};

const about = `This free HTML Entity Encoder and Decoder converts characters between plain text and HTML entity representations. When you need to display angle brackets, ampersands, quotes, or special symbols in an HTML document without them being interpreted as markup, entity encoding is the correct approach. Paste your content, choose an encoding mode, and click Encode to get safe HTML. Click Decode to reverse the process — converting entity-encoded HTML back into readable plain text.

HTML entities exist because HTML uses certain characters as syntax: \`<\` opens a tag, \`>\` closes it, \`&\` starts an entity, and \`"\` delimits attribute values. If you want to display the literal text \`<div>\` in a web page without the browser parsing it as a tag, you must encode it as \`&lt;div&gt;\`. Without encoding, the browser interprets the text as markup, which breaks the page layout and, more critically, creates a cross-site scripting (XSS) vulnerability if the content came from a user or an external source.

The tool offers three encoding modes so you can match the output to your exact use case. **Minimal mode** encodes only the five characters that break HTML: \`&\` → \`&amp;\`, \`<\` → \`&lt;\`, \`>\` → \`&gt;\`, \`"\` → \`&quot;\`, and \`'\` → \`&apos;\`. This is the correct mode for escaping user input before inserting it into an HTML template, and it produces the most readable output since non-breaking characters are left as-is. **Full mode** encodes the same five characters plus all non-ASCII characters — copyright symbols, currency signs, accented letters, emoji — using named entities where available (\`©\` → \`&copy;\`, \`€\` → \`&euro;\`) or decimal numeric entities (\`&#decimal;\`) for everything else. Use Full mode when your output must be strict ASCII. **Numeric mode** encodes every single character as its decimal numeric entity — even plain letters and digits — which is useful for obfuscation, certain email compatibility requirements, or testing how a parser handles numeric references.

Decoding works in reverse: paste HTML-encoded content and click Decode. The tool handles named entities (\`&amp;\`, \`&lt;\`, \`&copy;\`), decimal numeric entities (\`&#38;\`, \`&#160;\`), and hexadecimal numeric entities (\`&#x26;\`, \`&#x00A0;\`) — all without using the browser DOM, so it works consistently across environments and can decode in a Node.js context as well.

The reference table at the bottom of the tool lists the most frequently used HTML entities with their character, named entity, and decimal code. Clicking any row in the table loads that character into the input, which is useful when you need to quickly check what entity a specific symbol produces. Common entries include \`&amp;\`, \`&lt;\`, \`&gt;\`, \`&quot;\`, \`&apos;\`, \`&nbsp;\`, \`&copy;\`, \`&reg;\`, \`&trade;\`, \`&euro;\`, \`&pound;\`, \`&yen;\`, and \`&mdash;\`.

This encoder is part of the encoding and escaping toolkit on this site. For URL percent-encoding (\`%20\`, \`%3A\`), use the [URL Encoder / Decoder](https://fwdtools.com/url-encoder-decoder/). For Base64 encoding of binary data or strings, use the [Base64 Encoder / Decoder](https://fwdtools.com/base64-encoder-decoder/). For JSON Web Token inspection, use the [JWT Decoder](https://fwdtools.com/jwt-decoder/). HTML entity encoding specifically handles the HTML layer — it is the right tool when you are working with HTML templates, email content, XML documents, or any context where raw special characters would be misinterpreted as markup.

All encoding and decoding runs in your browser with pure JavaScript. No content is sent to any server, which makes this tool safe for encoding sensitive HTML snippets, internal templates, or any content you would not want to share.`;

const features = [
  'Minimal mode — encode only the 5 HTML-breaking characters (&, <, >, ", \')',
  'Full mode — encode all non-ASCII characters using named or numeric entities',
  'Numeric mode — encode every character as its &#decimal; entity',
  'Decode named entities (&amp;, &copy;, &nbsp;) back to plain text',
  'Decode decimal numeric entities (&#38;) back to plain text',
  'Decode hexadecimal numeric entities (&#x26;) back to plain text',
  'Reference table of 15+ common HTML entities with click-to-load',
  'Swap input and output to chain encode → decode operations',
  'Copy output to clipboard in one click',
  'Pure JavaScript decode — no browser DOM dependency',
  'Runs entirely in your browser — no data sent to a server',
];

const useCases = [
  { icon: 'FORM', title: 'Escape user input for HTML', desc: 'Use Minimal mode to safely encode user-submitted text before inserting it into an HTML template, preventing XSS vulnerabilities.' },
  { icon: 'DOC', title: 'Display code examples in HTML', desc: 'Encode angle brackets and ampersands so that code snippets like <div> render as literal text rather than being parsed as tags.' },
  { icon: 'WEB', title: 'Produce strict ASCII HTML output', desc: 'Use Full mode to replace all non-ASCII characters with named or numeric entities for ASCII-only environments and legacy email systems.' },
  { icon: 'DEL', title: 'Decode received HTML content', desc: 'Paste encoded HTML and click Decode to convert entities back to readable plain text — useful for debugging API responses or email templates.' },
  { icon: 'SORT', title: 'Look up common entity names', desc: 'Use the reference table to quickly find the entity name for &copy;, &mdash;, &nbsp;, &euro;, and other symbols.' },
  { icon: 'ROT', title: 'Obfuscate content with numeric encoding', desc: 'Use Numeric mode to encode every character as its decimal entity — a technique used for spam obfuscation and compatibility testing.' },
];

const SEO = {
  slug: 'html-entity-encoder',
  title: 'HTML Entity Encoder / Decoder',
  sections: [
    { type: '2col',
      left: { type: 'text', label: 'About this tool', heading: 'Free HTML Entity Encoder and Decoder — Named & Numeric Entities', text: about },
      right: { type: 'features', heading: 'Features', items: features },
    },
    { type: 'steps', heading: 'How to Use',
      items: [
        { title: 'Choose an encoding mode', text: 'Select Minimal (just the 5 HTML-breaking chars), Full (all non-ASCII), or Numeric (every character).' },
        { title: 'Paste your content', text: 'Type or paste HTML, text, or any content into the Input textarea.' },
        { title: 'Encode or Decode', text: 'Click Encode to convert to HTML entities, or Decode to convert entities back to plain text.' },
        { title: 'Copy the result', text: 'Click Copy in the Output panel to copy to clipboard. Use Swap to move the output back to input for further processing.' },
        { title: 'Use the reference table', text: 'The reference table below shows common entities. Click any row to load that character into the input.' },
      ],
    },
    { type: 'cards', heading: 'Common Use Cases', columns: 3, items: useCases },
    { type: 'faq', heading: 'Frequently Asked Questions',
      items: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
    },
  ],
};

export default function HtmlEntityEncoderPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><HtmlEntityEncoderTool /></div>
      <IndexOnly><AdSlot /><SeoSection {...SEO} /></IndexOnly>


    </div>
  );
}
