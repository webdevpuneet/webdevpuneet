import NumberBaseConverterTool from '@/components/NumberBaseConverterTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/number-base-converter.png';

export const metadata = {
  title: "Number Base Converter: Binary, Octal, Decimal and Hex",
  description: "Convert numbers between binary, octal, decimal and hexadecimal instantly, with 8-bit and 16-bit binary views and a clickable reference table. Free, no sign-up.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/number-base-converter/' },
  icons: { icon: '/icons/number-base-converter.svg', shortcut: '/icons/number-base-converter.svg' },
  openGraph: {
    type: 'website', url: 'https://webdevpuneet.com/number-base-converter/', siteName: 'webdevpuneet.com',
    title: 'Number Base Converter — Binary, Octal, Decimal, Hex',
    description: 'Instantly convert between binary, octal, decimal, and hex. Shows 8-bit and 16-bit binary. Reference table for common values.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Number Base Converter', description: 'Binary ↔ Decimal ↔ Hex ↔ Octal — instant conversion with reference table.', images: [OG_IMAGE] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I convert binary to decimal?',
      acceptedAnswer: { '@type': 'Answer', text: 'To convert binary to decimal, multiply each bit by its power of 2 and sum the results. For example, 11111111 in binary = 128+64+32+16+8+4+2+1 = 255 in decimal. In this tool, select Binary as the input base, type your binary number, and read the Decimal row instantly.' } },
    { '@type': 'Question', name: 'How do I convert decimal to hexadecimal?',
      acceptedAnswer: { '@type': 'Answer', text: 'To convert decimal to hex, repeatedly divide by 16 and record the remainders. Remainders 10-15 become A-F. For example, 255 ÷ 16 = 15 remainder 15, so 255 decimal = FF hex. This tool handles it automatically — select Decimal, type your number, and read the Hex row.' } },
    { '@type': 'Question', name: 'What is 0xFF in decimal?',
      acceptedAnswer: { '@type': 'Answer', text: '0xFF in decimal is 255. FF in hex = (15 × 16) + 15 = 240 + 15 = 255. This is the maximum value for an 8-bit unsigned integer, commonly seen in color codes (#FFFFFF = white) and bitmasks.' } },
    { '@type': 'Question', name: 'What does 0b prefix mean?',
      acceptedAnswer: { '@type': 'Answer', text: '0b is the binary literal prefix used in most programming languages (Python, JavaScript, C, Rust, etc.). For example, 0b11111111 is 255 in decimal. Similarly, 0x means hexadecimal (0xFF = 255) and 0o means octal (0o377 = 255).' } },
    { '@type': 'Question', name: 'How many bits is a hex digit?',
      acceptedAnswer: { '@type': 'Answer', text: 'One hex digit (0–F) represents exactly 4 bits (a nibble). Two hex digits represent 8 bits (one byte). For example, hex FF = binary 1111 1111 = 8 bits. This is why hex is so common in programming — it compactly represents binary data.' } },
    { '@type': 'Question', name: 'What is octal used for?',
      acceptedAnswer: { '@type': 'Answer', text: 'Octal (base 8) is primarily used in Unix file permissions. chmod 755 means rwxr-xr-x: owner has 7 (read+write+execute = 4+2+1), group has 5 (read+execute = 4+1), others have 5. Each octal digit maps to exactly 3 binary bits, making it convenient for permission flags.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Number Base Converter',
  url: 'https://webdevpuneet.com/number-base-converter/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online number base converter — convert between binary, octal, decimal, and hexadecimal instantly, with 8-bit and 16-bit binary views and a reference table. Runs entirely in your browser.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Number Base Converter', item: 'https://webdevpuneet.com/number-base-converter/' },
  ],
};

const about = [
  'This free Number Base Converter instantly converts any number between binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16). Select the base you are entering, type your number, and all four representations update live. Each row has a Copy button so you can grab any result in one click. The tool also shows 8-bit and 16-bit binary representations with nibble grouping for values up to 65,535.',
  'Number base conversion is a daily task for programmers, students, and anyone working with computer systems at a low level. The need comes up everywhere: reading a hex color code from a design file, understanding a bitmask in a C header, decoding a memory address in a debugger, checking Unix file permissions, looking up an ASCII character code, or doing computer science homework on number systems. Without a calculator, converting between bases requires manual long division or bit counting — this tool removes that friction entirely.',
  '**Binary (base 2)** is the foundation of all digital computing. Every piece of data a computer stores or processes is ultimately binary — a sequence of 0s and 1s. Binary is useful to read directly when working with bitmasks, bit flags, and bitwise operations. A bitmask of `0b00001111` immediately tells you which bits are set. The 8-bit representation (padded to 8 digits) makes it easy to see all bits of a byte simultaneously, and the nibble grouping (spaces every 4 bits) helps parse longer values. The 16-bit representation (padded to 16 digits with nibble groups) is shown for values up to 65,535.',
  '**Hexadecimal (base 16)** is the most common alternative to decimal in programming. Each hex digit represents exactly 4 binary bits, so one byte is always exactly two hex digits. This makes hex a compact, readable notation for binary data. Colors in CSS and HTML are written as hex (`#FF5733` = RGB 255, 87, 51). Memory addresses are shown in hex in debuggers and disassemblers. IPv6 addresses use hex. Byte values in network packets, hash outputs, and cryptographic keys are all represented in hex. The prefix `0x` is used in C, C++, Python, JavaScript, Go, Rust, and virtually every other language to denote a hex literal.',
  '**Octal (base 8)** is most commonly used in Unix/Linux file permissions. The `chmod` command uses octal: `755` means owner has 7 (rwx = 4+2+1), group has 5 (r-x = 4+1), others have 5. Each octal digit maps to exactly 3 binary bits, so octal is a compact grouping for binary that predates hex\'s dominance. You will also see octal in some older escape sequences and file format specifications.',
  'The reference table at the bottom lists common values with all four base representations: 0 through 15 (the hex digits), 16, 32, 64, 127, 128, 255 (maximum byte value), 256, 1023, 1024, 32767, 65535. Clicking any row loads that value into the converter instantly. This is useful when you need to quickly verify that 0xFF = 255, 0x7F = 127, or 0b10000000 = 128 = 0x80.',
  'This converter works alongside the developer tools on this site. For character encoding and string-to-binary conversions, use the [Base64 Encoder / Decoder](https://fwdtools.com/base64-encoder-decoder/). For URL percent-encoding, use the [URL Encoder / Decoder](https://fwdtools.com/url-encoder-decoder/). For HTML character entities, use the [HTML Entity Encoder](/html-entity-encoder). For regular expression testing, use the [Regex Tester](https://fwdtools.com/regex-tester/).',
  'All conversions run in your browser with no server interaction. The tool works offline once loaded and validates your input for the selected base — entering a character not valid in the chosen base shows an error rather than silently producing a wrong result.',
].join('\n\n');

const features = [
  'Convert between binary, octal, decimal, and hexadecimal simultaneously',
  'All four bases update live as you type',
  'Select any base as the input — others derive from it',
  'Standard prefix display: 0b (binary), 0o (octal), 0x (hex)',
  '8-bit binary representation with nibble grouping (0–255)',
  '16-bit binary representation with nibble grouping (0–65535)',
  'Copy button for each base representation',
  'Clickable reference table for common values (0–65535)',
  'Input validation — invalid characters for the selected base shown as error',
  'Runs entirely in your browser — no data sent to a server',
];

const useCases = [
  { icon: 'ROT', title: 'Decode hex colors and addresses', desc: 'Convert #FF5733 hex to decimal RGB values, or inspect a memory address from a debugger by typing it in hex.' },
  { icon: 'FORM', title: 'Read and write bitmasks', desc: 'View any decimal flag value in binary to see exactly which bits are set. Useful for permissions, feature flags, and protocol fields.' },
  { icon: 'DEL', title: 'Understand Unix file permissions', desc: 'Convert chmod 755 or 644 in octal to binary to see the rwxr-xr-x bit pattern, or reverse a binary mask to its octal value.' },
  { icon: 'DOC', title: 'Computer science homework', desc: 'Instantly verify binary-to-decimal, decimal-to-hex, and octal conversions for coursework without manual long division.' },
  { icon: 'SORT', title: 'Check 8-bit and 16-bit limits', desc: 'Use the reference table to verify common boundary values: 0x7F (127), 0x80 (128), 0xFF (255), 0xFFFF (65535).' },
  { icon: 'WEB', title: 'Write numeric literals in code', desc: 'Get the correct 0b, 0o, or 0x prefixed form of any value to paste directly into Python, JavaScript, C, Rust, or Go source code.' },
];

const SEO = {
  slug: 'number-base-converter',
  title: 'Number Base Converter',
  sections: [
    { type: '2col',
      left: { type: 'text', label: 'About this tool', heading: 'Free Number Base Converter — Binary, Octal, Decimal, Hexadecimal', text: about },
      right: { type: 'features', heading: 'Features', items: features },
    },
    { type: 'steps', heading: 'How to Use',
      items: [
        { title: 'Select the input base', text: 'Click Binary, Octal, Decimal, or Hexadecimal at the top to tell the tool what base you\'re typing in.' },
        { title: 'Type your number', text: 'Enter the number. Invalid characters for the selected base are caught and shown as an error.' },
        { title: 'Read all bases instantly', text: 'All four bases update live. The current input base is highlighted. 8-bit and 16-bit binary representations appear for values up to 65535.' },
        { title: 'Copy any result', text: 'Each row has a Copy button. Click it to copy that base\'s representation to your clipboard.' },
        { title: 'Use the reference table', text: 'Click any row in the Common Values table to load that number into the converter instantly.' },
      ],
    },
    { type: 'cards', heading: 'Common Use Cases', columns: 3, items: useCases },
    { type: '2col',
      left: { type: 'text', heading: 'Binary, Hex, Octal, Decimal — Instant Conversion',
        text: `Whether you're reading a hex color code, debugging a bitmask, decoding a Unix permission, or just doing computer science homework — number base conversion is something every developer does constantly.\n\nType any number in any base, and all four representations update instantly. Click any row in the common values table to load it. Switch the input base by clicking the tab, and the display shifts to show your current input in context.` },
      right: { type: 'text', heading: 'Common Conversions at a Glance',
        text: `**255 decimal = 0xFF hex = 0b11111111 binary = 0o377 octal** — the maximum 8-bit value, used everywhere from colors to bitmasks.\n\n**Binary prefixes:** 0b = binary · 0o = octal · 0x = hex. All major languages (Python, JavaScript, C, Rust, Go) support these literals.\n\n**Hex digits:** each hex digit is exactly 4 bits. Two hex digits = 1 byte. Color #FFFFFF = RGB(255, 255, 255) = three 0xFF bytes.\n\n**Octal and permissions:** chmod 755 = binary 111 101 101 = rwxr-xr-x. One octal digit = 3 binary bits.` },
    },
    { type: 'faq', heading: 'Frequently Asked Questions',
      items: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
    },
  ],
};

export default function NumberBaseConverterPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><NumberBaseConverterTool /></div>
      <IndexOnly><AdSlot /><SeoSection {...SEO} /></IndexOnly>


    </div>
  );
}
