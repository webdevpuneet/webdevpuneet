import BinaryHexAsciiTool from '@/components/BinaryHexAsciiTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/binary-hex-ascii.png';

export const metadata = {
  title: "Binary, Hex & ASCII Converter: Free Online Text Encoder",
  description: "Convert between binary, hexadecimal, decimal, octal and ASCII in real time. Type in any field and every other format updates instantly. Free, in your browser.",
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/binary-hex-ascii/' },
  icons: { icon: '/icons/binary-hex-ascii.svg', shortcut: '/icons/binary-hex-ascii.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/binary-hex-ascii/',
    siteName: 'webdevpuneet.com',
    title: "Binary / Hex / ASCII Converter \u2014 Convert Between Formats Online",
    description: "Convert between binary, hexadecimal, decimal, octal, and ASCII text instantly. Enter any format and all others update in real time. Free online tool.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Binary / Hex / ASCII \u2014 webdevpuneet.com" }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: "Binary / Hex / ASCII Converter \u2014 Convert Between Formats Online",
    description: "Convert between binary, hexadecimal, decimal, octal, and ASCII text instantly. Enter any format and all others update in real time. Free online tool.",
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "How do I convert binary to hex?", acceptedAnswer: { '@type': 'Answer', text: "Group the binary digits into nibbles (groups of 4) from right to left, then convert each nibble to its hex digit (0\u2013F). This tool does that conversion automatically \u2014 enter a binary string and the hex equivalent appears instantly." } },
    { '@type': 'Question', name: "How do I convert ASCII to binary?", acceptedAnswer: { '@type': 'Answer', text: "Each ASCII character has a decimal code point (e.g. A = 65). Convert that decimal to binary (65 = 01000001). This tool shows the binary, hex, decimal, and octal for any character or string." } },
    { '@type': 'Question', name: "What is the difference between hex and binary?", acceptedAnswer: { '@type': 'Answer', text: "Binary uses base 2 (digits 0\u20131). Hexadecimal uses base 16 (digits 0\u20139, A\u2013F). One hex digit represents exactly 4 binary digits (one nibble). Two hex digits represent one byte (8 bits)." } },
    { '@type': 'Question', name: "How do I convert text to binary?", acceptedAnswer: { '@type': 'Answer', text: "Switch to Text mode and type your string. Each character is converted to its ASCII/UTF-8 byte value, then shown as binary, hex, decimal, and octal." } },
    { '@type': 'Question', name: "What is the ASCII code for a space?", acceptedAnswer: { '@type': 'Answer', text: "A space is ASCII 32 (decimal), 20 (hex), 00100000 (binary), 40 (octal). Use the ASCII reference table in this tool to look up any printable character." } },
    { '@type': 'Question', name: "Can I decode a hex string to text?", acceptedAnswer: { '@type': 'Answer', text: "Yes. Enter space-separated hex bytes like \"48 65 6C 6C 6F\" in the hex field. The tool decodes each byte to its ASCII character and shows the text \"Hello\"." } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: "Binary / Hex / ASCII",
  url: 'https://webdevpuneet.com/binary-hex-ascii/',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: "Binary / Hex / ASCII", item: 'https://webdevpuneet.com/binary-hex-ascii/' },
  ],
};

const SEO = {
  slug: 'binary-hex-ascii',
  title: "Binary / Hex / ASCII \u2014 Convert between binary, hex, decimal, ASCII",
  subtitle: "Convert between binary, hex, decimal, ASCII. Runs in your browser.",
  about: {
    title: "Convert Between Binary, Hexadecimal, Decimal, Octal, and ASCII Instantly",
    description: `Working with low-level data, network protocols, memory addresses, color codes, or character encoding means constantly translating between binary, hexadecimal, decimal, and ASCII. Doing this in your head for multi-byte values is slow and error-prone. A dedicated converter handles the tedious part — enter a value in any format and all other representations update simultaneously, with no submit button and no page reload required.\n\nThis converter handles both single-value and multi-character text conversion. For individual numbers, enter a binary string, hex value, decimal number, or octal value and see all equivalent representations at once. For text strings, switch to Text mode and enter any ASCII or UTF-8 string to get the full byte-level breakdown: each character displayed as its decimal code point, hexadecimal byte, binary representation, and octal value side by side. This is essential when debugging encoding issues in file parsers, protocol implementations, or terminal output where invisible bytes cause unexpected behavior.\n\n**Common programming and networking uses.** Color codes are written in hex (\`#FF5733\`) — convert to decimal RGB values (255, 87, 51) for use in code that expects integer color channels. Memory addresses are displayed in hex by debuggers and disassemblers — see the binary representation to understand which bits are set. ASCII encoding tables map printable characters to decimal codes — verify or look up any code point without memorizing the table. Network protocols use hex dumps in packet captures — paste space-separated hex bytes to decode the ASCII text they represent. Bit masks and flag values are written in binary or hex — convert to decimal to compare against integer literals in your code. The built-in ASCII reference table covers printable characters, digits, uppercase letters, lowercase letters, and common control codes — all organized by category.\n\nPairs well with [Number Base Converter](/number-base-converter/) for multi-base arithmetic across bases 2 through 36, and [Hash Generator](https://fwdtools.com/hash-generator/) for checksums and cryptographic digests.`,
  },
  features: [
    "**Instant multi-format conversion** \u2014 binary, hex, decimal, octal, and ASCII all update simultaneously as you type in any field",
    "**Text-to-bytes mode** \u2014 convert any ASCII or UTF-8 string to its full byte-level representation in all four number formats",
    "**Byte-by-byte breakdown** showing each character as decimal code point, hex byte, binary bits, and octal value",
    "**ASCII reference table** \u2014 printable characters, digits, uppercase, lowercase, and common control codes organized by category",
    "**Multi-byte hex input** \u2014 paste space-separated hex bytes (e.g. `48 65 6C 6C 6F`) to decode multiple bytes to ASCII text at once",
    "**Copy buttons** on every output field for one-click clipboard copy in any format",
    "**No submit button** \u2014 results update in real time as you enter any value in any field",
    "**Runs entirely in the browser** \u2014 no data is uploaded to any server",
    "**Pairs with [Number Base Converter](/number-base-converter/)** for multi-base arithmetic and [Hash Generator](https://fwdtools.com/hash-generator/) for checksums",
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: "Enter a value in any field", text: "Type a binary string (e.g. 01001000), hex value (e.g. 48), decimal number (e.g. 72), octal value (e.g. 110), or ASCII character (H). All other fields update instantly." },
      { title: "Convert text strings", text: "Switch to Text mode and type any ASCII or UTF-8 string. The tool shows the full byte-by-byte breakdown \u2014 each character as decimal, hex, binary, and octal." },
      { title: "Use the lookup table", text: "Browse the ASCII table below the converter to look up character codes by category: printable characters, digits, uppercase, lowercase, and control characters." },
      { title: "Copy any representation", text: "Click the copy button next to any field to copy that format to the clipboard." },
      { title: "Handle multi-byte hex strings", text: "In hex mode, enter a space-separated hex string like \"48 65 6C 6C 6F\" to decode multiple bytes to ASCII text at once." },
    ],
  },
  useCases: [
    { icon: "\u25c9", title: "Convert hex color codes to RGB decimal", desc: "Translate CSS hex colors (#FF5733) to decimal RGB values (255, 87, 51) or binary representation for use in code that expects integer color channels." },
    { icon: "\u25a6", title: "Decode ASCII from hex dumps", desc: "Paste space-separated hex bytes from a network protocol, binary file, or memory inspector and decode the ASCII characters they represent." },
    { icon: "\u25d1", title: "Understand binary representation of characters", desc: "See the exact bit pattern for any ASCII character \u2014 useful for learning binary encoding, bitwise operations, and data formats in low-level programming." },
    { icon: "\u25b3", title: "Verify character encoding", desc: "Check the exact byte value for a character to debug encoding issues in text processing, file parsing, or protocol implementation." },
    { icon: "\u26a1", title: "Work with network protocol bytes", desc: "Translate between the hex values used in protocol documentation and the ASCII text or decimal values they represent in packet captures." },
    { icon: "\u2261", title: "Quick base conversions for programming", desc: "Convert constants between hex, binary, and decimal without leaving the browser \u2014 useful when working with bit masks, flags, and memory offsets in systems code." },
  ],
  faqs: [
    { q: "How do I convert binary to hex?", a: "Group the binary digits into nibbles (groups of 4) from right to left, then convert each nibble to its hex digit (0\u2013F). This tool does that conversion automatically \u2014 enter a binary string and the hex equivalent appears instantly." },
    { q: "How do I convert ASCII to binary?", a: "Each ASCII character has a decimal code point (e.g. A = 65). Convert that decimal to binary (65 = 01000001). This tool shows the binary, hex, decimal, and octal for any character or string." },
    { q: "What is the difference between hex and binary?", a: "Binary uses base 2 (digits 0\u20131). Hexadecimal uses base 16 (digits 0\u20139, A\u2013F). One hex digit represents exactly 4 binary digits (one nibble). Two hex digits represent one byte (8 bits)." },
    { q: "How do I convert text to binary?", a: "Switch to Text mode and type your string. Each character is converted to its ASCII/UTF-8 byte value, then shown as binary, hex, decimal, and octal." },
    { q: "What is the ASCII code for a space?", a: "A space is ASCII 32 (decimal), 20 (hex), 00100000 (binary), 40 (octal). Use the ASCII reference table in this tool to look up any printable character." },
    { q: "Can I decode a hex string to text?", a: "Yes. Enter space-separated hex bytes like \"48 65 6C 6C 6F\" in the hex field. The tool decodes each byte to its ASCII character and shows the text \"Hello\"." },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "How to use Binary / Hex / ASCII",
  description: "Convert between binary, hexadecimal, decimal, octal, and ASCII text instantly. Enter any format and all others update in real time. Free online tool.",
  totalTime: 'PT3M',
  step: SEO.howToUse.items.map((item, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: item.title,
    text: item.text,
  })),
};

export default function BinaryHexAsciiPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><BinaryHexAsciiTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
