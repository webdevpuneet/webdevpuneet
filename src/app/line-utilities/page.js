import LineUtilitiesTool from '@/components/LineUtilitiesTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/line-utilities.png';

export const metadata = {
  title: "Line Utilities: Sort, Dedupe and Clean Up Text Lines",
  description: "Sort lines A-Z or Z-A, remove duplicate and blank lines, then number, reverse, shuffle, trim and change the case of every line. Free text tool, no sign-up.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/line-utilities/' },
  icons: { icon: '/icons/line-utilities.svg', shortcut: '/icons/line-utilities.svg' },
  openGraph: {
    type: 'website', url: 'https://webdevpuneet.com/line-utilities/', siteName: 'webdevpuneet.com',
    title: 'Line Utilities — Sort, Deduplicate & Transform Text Lines',
    description: 'Sort, deduplicate, remove blanks, reverse, shuffle, number, and transform text lines. Paste and click — no install needed.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Line Utilities — Sort & Deduplicate Text Lines', description: 'Sort, deduplicate, remove blanks, reverse, shuffle, number lines online. Paste and click.', images: [OG_IMAGE] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I sort lines alphabetically online?',
      acceptedAnswer: { '@type': 'Answer', text: 'Paste your text into the Input box, then click "Sort A → Z" for ascending order or "Sort Z → A" for descending. The sorted lines appear in the Output box instantly. Click Copy to copy the result.' } },
    { '@type': 'Question', name: 'How do I remove duplicate lines from text?',
      acceptedAnswer: { '@type': 'Answer', text: 'Paste your text and click "Remove duplicates" to keep only the first occurrence of each unique line. For case-insensitive deduplication (treating "Apple" and "apple" as the same), use "Remove duplicates (case-insensitive)".' } },
    { '@type': 'Question', name: 'Can I chain multiple operations?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. After the first operation, click ⇅ (Swap) to move the output back to the input, then apply the next operation. For example: sort → swap → deduplicate → swap → number lines.' } },
    { '@type': 'Question', name: 'What does "Comma-separate" do?',
      acceptedAnswer: { '@type': 'Answer', text: 'Comma-separate joins all non-blank lines into a single comma-separated list: "apple, banana, cherry". This is useful for creating SQL IN clauses, CSV values, or JavaScript arrays from a list of items.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Line Utilities',
  url: 'https://webdevpuneet.com/line-utilities/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online line utilities — sort lines A-Z or Z-A, remove duplicate and blank lines, number, reverse, shuffle, trim whitespace, and change case. Runs entirely in your browser.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Line Utilities', item: 'https://webdevpuneet.com/line-utilities/' },
  ],
};

const about = `Line Utilities is a free online text tool for sorting, filtering, and transforming a list of lines. You paste your text, click one button, and get the result instantly. There are no settings to configure and nothing to install. The tool is designed for the tasks that developers, writers, and data workers do constantly: alphabetically sorting a word list, removing duplicates from a dataset, cleaning up blank lines in an export, numbering lines for a reference, or converting a list into a comma-separated value for a SQL query or JavaScript array.

Lists show up constantly in real work. You export a column from Excel or Google Sheets and get 500 lines. A log file has repeated entries you need to deduplicate. An API response gives you a JSON array and you need to pull out the values, one per line, then sort them. A client gives you a list of product names with inconsistent casing. A requirements document has bullet points you want to number. In every case, the actual operation is simple — the friction is the lack of a tool that does just that one thing without opening a full text editor or writing a terminal command.

The Sort group covers six operations: alphabetical ascending (A→Z), alphabetical descending (Z→A), by line length shortest first, by line length longest first, numerically ascending (for lines that are numbers), and random shuffle. Sorting numerically is useful when your lines are numbers like port numbers, IDs, or row counts — regular alphabetical sort would put 10 before 9 because it sorts character by character. Shuffle is useful for randomizing a list for sampling or randomized order tests.

The Filter group removes unwanted lines. "Remove duplicates" keeps the first occurrence of each unique line and discards subsequent identical lines. "Remove duplicates (case-insensitive)" does the same but treats "Apple" and "apple" as the same. "Remove blank lines" strips out any empty lines or lines that contain only whitespace. These three operations cover the most common data-cleaning tasks when working with exports, log files, or pasted content.

The Transform group modifies every line without changing the order. "Trim whitespace" removes leading and trailing spaces and tabs from each line — useful when pasting from a document that added indentation. "Lowercase" and "Uppercase" convert every character. "Number lines" prefixes each line with its sequential number (1. line one, 2. line two, etc.) — useful for creating numbered reference lists. "Quote each line" wraps each line in double quotes — useful when building an array of strings. "Comma-separate" collapses all non-blank lines into a single comma-separated string on one line — the fastest way to build a SQL IN clause or a JavaScript array literal from a list.

Operations can be chained. Click Swap after any operation to move the output back to the input, then run another operation on the result. A common workflow: paste a messy export → sort A→Z → swap → remove duplicates → swap → remove blank lines → comma-separate. Each step takes one click.

The stats bar shows live counts: total lines, non-blank lines, and unique lines in the input, and the same three counts for the output after an operation. This helps you verify that deduplication removed the expected number of duplicates, or that your comma-separate collapsed the expected number of lines.

All processing happens in your browser. Your text is never sent to a server. The tool works with any language and any content — there is no character set restriction.`;

const features = [
  'Sort lines A→Z alphabetically ascending',
  'Sort lines Z→A alphabetically descending',
  'Sort by line length — shortest first or longest first',
  'Sort numerically (for lines that are numbers)',
  'Shuffle lines in random order',
  'Reverse line order',
  'Remove duplicate lines (exact match)',
  'Remove duplicates case-insensitively',
  'Remove blank and whitespace-only lines',
  'Trim leading and trailing whitespace from each line',
  'Convert all lines to lowercase',
  'Convert all lines to uppercase',
  'Number each line (1. line, 2. line, ...)',
  'Wrap each line in double quotes',
  'Comma-separate all lines into one string',
  'Live input stats: total, non-blank, unique line counts',
  'Swap output back to input for chaining operations',
  'Copy output to clipboard in one click',
  'Runs entirely in your browser — no data sent to a server',
];

const useCases = [
  { icon: 'SORT', title: 'Sort a list alphabetically', desc: 'Paste any word list, name list, or tag list and click Sort A→Z. Get a clean alphabetical result in one click. Change capitalization afterwards with the [text case converter](/text-case-converter).' },
  { icon: 'DEL', title: 'Remove duplicate lines', desc: 'Deduplicate an export, log file, or copy-pasted list. Case-sensitive and case-insensitive modes both available. Compare before/after versions with the [diff checker](/diff-checker).' },
  { icon: 'DOC', title: 'Build a SQL IN clause', desc: 'Paste a list of values and click Comma-separate to produce "value1, value2, value3" — ready to paste into a SQL WHERE IN statement; format the full query with the [SQL formatter](https://fwdtools.com/sql-formatter/).' },
  { icon: 'FORM', title: 'Clean up pasted data', desc: 'Remove blank lines, trim whitespace, fix casing — apply multiple transforms by chaining operations with the Swap button.' },
  { icon: 'ROT', title: 'Number a reference list', desc: 'Add sequential numbers to every line instantly. Useful for turning a bullet list into a numbered list without manually typing numbers.' },
  { icon: 'WEB', title: 'Shuffle a list randomly', desc: 'Randomize the order of lines for sampling, randomized tests, or just shuffling a playlist.' },
];

const SEO = {
  slug: 'line-utilities',
  title: 'Line Utilities — Sort, Deduplicate & Transform Text Lines',
  sections: [
    { type: '2col',
      left: { type: 'text', label: 'About this tool', heading: 'Sort, Deduplicate, and Transform Text Lines Online', text: about },
      right: { type: 'features', heading: 'Features', items: features },
    },
    { type: 'steps', heading: 'How to Use',
      items: [
        { title: 'Paste your text', text: 'Type or paste your lines into the Input textarea. The stats bar shows total lines, non-blank lines, and unique line count.' },
        { title: 'Pick an operation', text: 'Click any button in the Sort, Filter, or Transform groups. The result appears instantly in the Output box.' },
        { title: 'Chain operations', text: 'Click ⇅ Swap to move the output back to input, then run another operation on the result.' },
        { title: 'Copy the output', text: 'Click Copy to copy the result to your clipboard. The output stats bar shows the result\'s line and character count.' },
      ],
    },
    { type: 'cards', heading: 'Common Use Cases', columns: 3, items: useCases },
    { type: 'faq', heading: 'Frequently Asked Questions',
      items: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
    },
  ],
};

export default function LineUtilitiesPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><LineUtilitiesTool /></div>
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>


    </div>
  );
}
