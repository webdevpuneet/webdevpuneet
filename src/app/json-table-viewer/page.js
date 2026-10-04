import JsonTableViewerTool from '@/components/JsonTableViewerTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'JSON Table Viewer — Free, View JSON as Sortable Table Online | webdevpuneet.com',
  description: 'Free JSON table viewer online. Paste any JSON array to instantly render a sortable, searchable, paginated table. Filter, toggle columns, export CSV. No sign-up needed.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/json-table-viewer/' },
  icons: { icon: '/icons/json-table-viewer.svg', shortcut: '/icons/json-table-viewer.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/json-table-viewer/', siteName: 'webdevpuneet.com', title: 'JSON to Table Viewer — Sortable, Searchable JSON Viewer', description: 'Paste JSON to view as a sortable, searchable table. Filter rows, toggle columns, export CSV. Free, no sign-up.', images: [{ url: 'https://webdevpuneet.com/images/json-table-viewer.png', width: 1200, height: 630, alt: 'JSON Table Viewer' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'JSON to Table Viewer — Sortable & Searchable', description: 'Paste JSON arrays to view as a sortable, searchable table. Export to CSV. Free, no sign-up.', images: ['https://webdevpuneet.com/images/json-table-viewer.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What JSON format does the viewer support?', acceptedAnswer: { '@type': 'Answer', text: 'The viewer expects a JSON array of objects at the top level — for example [{"name":"Alice","age":30},{"name":"Bob","age":25}]. Each object in the array becomes a row in the table, and each unique key across all objects becomes a column header. If your JSON is wrapped in a parent key (e.g. {"users":[...]}), paste just the inner array value. The tool automatically handles sparse arrays where not every object has every key, filling missing cells with empty values.' } },
    { '@type': 'Question', name: 'Can I sort the table by a column?', acceptedAnswer: { '@type': 'Answer', text: 'Click any column header to sort the table by that column in ascending order — a sort indicator arrow appears next to the header. Click the same header again to reverse to descending order. Click it a third time to clear the sort and restore the original order. For complex multi-field analysis where you need to sort by multiple columns simultaneously, use the CSV export and sort in Excel or Google Sheets which support multi-level sorting.' } },
    { '@type': 'Question', name: 'How does the search and filter work?', acceptedAnswer: { '@type': 'Answer', text: 'The search box filters visible rows in real time as you type, matching your query against every value in every visible column simultaneously. The match is case-insensitive and partial — typing "lon" will match "London", "elong", or any value containing that substring in any column. Hiding a column via the column toggle also removes it from the search scope, so only visible columns are included in the filter — useful for excluding ID or metadata fields from your search.' } },
    { '@type': 'Question', name: 'Can I export just a subset of the data?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Apply a search filter to reduce the visible rows to only the records you want, toggle off any columns you do not need in the export, and then click Export CSV — the download will only include the currently visible rows and visible columns. This makes it easy to extract subsets of large JSON datasets for import into Excel, Google Sheets, or a database without writing any code or scripts.' } },
    { '@type': 'Question', name: 'Does it handle nested or complex JSON?', acceptedAnswer: { '@type': 'Answer', text: 'The viewer is optimized for flat or shallow JSON arrays where values are scalars — strings, numbers, booleans, and null. Nested objects and arrays as values are serialized to their compact JSON string representation and shown in the cell as text. For deeply nested data, consider flattening it first using jq or a JSON flatten utility before pasting, which will give you a proper column for each nested field rather than a collapsed JSON string.' } },
    { '@type': 'Question', name: 'How large a dataset can it handle?', acceptedAnswer: { '@type': 'Answer', text: 'The tool runs entirely in the browser using JavaScript. Arrays of up to a few thousand objects with dozens of columns render smoothly on most modern devices. Very large datasets — 10,000 or more records with many fields — may be slower to parse and render on initial load. For large datasets, set the rows-per-page to 25 or 50 to keep the DOM efficient and use the search and column-toggle to narrow the visible data before scrolling.' } },
    { '@type': 'Question', name: 'Can I use this for API response debugging?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, and it is one of the most common use cases. Copy a JSON array response from your browser\'s Network tab, Postman, Insomnia, or any REST/GraphQL client and paste it directly into the viewer. The table immediately shows all records with all fields aligned in columns. Sort by a timestamp column to find the newest entries, search for a specific user ID or status value, or toggle off verbose metadata columns to focus on the fields relevant to your debugging.' } },
    { '@type': 'Question', name: 'Is my data secure?', acceptedAnswer: { '@type': 'Answer', text: 'All JSON parsing and table rendering happens entirely in your browser using JavaScript — no data is transmitted to any server at any point. You can safely use this tool with sensitive API responses, private database exports, authentication tokens, or any other confidential data. The tool has no analytics that capture or log input content, and closing the browser tab permanently discards all pasted data.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JSON Table Viewer',
  url: 'https://webdevpuneet.com/json-table-viewer/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online JSON to table converter that renders JSON arrays as sortable, searchable, paginated tables with CSV export.',
  featureList: ['Sortable columns', 'Full-text search', 'Column visibility toggle', 'Pagination', 'CSV export', 'Live JSON validation'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'JSON Table Viewer', item: 'https://webdevpuneet.com/json-table-viewer/' },
  ],
};

const SEO = {
  slug: 'json-table-viewer',
  title: 'JSON to Table Viewer — Sortable, Searchable JSON Viewer',

  about: {
    title: 'Paste a JSON Array and View It as a Sortable, Searchable Table — Export to CSV',
    description: `You got a JSON response from an API or a database export and you need to find a specific record, sort by a field, or spot missing values — but scrolling through hundreds of raw JSON objects in a text editor is slow and error-prone. Paste the array here and click Parse to see every record as a spreadsheet row instantly.\n\nIf the pasted value isn't itself an array, the parser doesn't just fail — it inspects the object's top-level keys and automatically pulls out the first one whose value is an array (handling the common {"data": [...]} or {"users": [...]} API envelope shape), or wraps a single bare object in a one-row array as a fallback. The tool then derives columns from the union of every key across every row, so sparse arrays where not every object has every field are handled gracefully — missing fields simply render as empty cells rather than breaking the layout.\n\nClick any column header to sort: values are compared numerically with parseFloat first, and only fall back to a locale-aware string comparison when the values aren't numeric, so a column mixing "10" and "9" sorts correctly instead of alphabetically. A cell whose value is itself an object or array isn't flattened away — it renders as a compact "{…} N keys" or "[…] N items" preview you can click to open a side panel showing the full nested JSON. Type in the search box to filter rows across all currently visible columns simultaneously — case-insensitive and matching nested values by their stringified JSON too. Toggle column visibility to hide internal IDs and metadata fields you don't need, and page through results at 10, 25, 50, 100, or unlimited rows.\n\nEvery successful parse, paste, or upload is saved to a local history panel (up to 15 entries, persisted in your browser's localStorage) so you can jump back to a previous dataset without re-pasting it. The CSV and TSV exports respect your current search filter, sort order, and column visibility — hide columns you don't want, filter to the records you need, then export a clean file ready for Excel, Google Sheets, or database import. All processing is entirely client-side — no data is transmitted to any server, safe for sensitive API responses and private database exports.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste your JSON array into the input',
        text: 'Paste a JSON array of objects into the textarea at the top of the tool — each object becomes a table row and each unique key becomes a column. If your data is wrapped in a parent object (e.g. `{"data": [...]}`) paste just the inner array value. Click **Sample** to load a 5-row employee dataset to see the tool in action.',
      },
      {
        title: 'Click Parse to render the table',
        text: 'Click the **Parse →** button or press `Ctrl+Enter` to parse and render the table. The tool auto-derives all columns from the union of every unique key across all objects, so sparse arrays where not every object has every field are handled gracefully — missing cells show as empty.',
      },
      {
        title: 'Sort by clicking column headers',
        text: 'Click any column header to sort the table ascending by that column — an arrow indicator appears next to the header. Click the same header again to reverse to descending. The sort is applied to the entire dataset, not just the current page.',
      },
      {
        title: 'Search and filter rows in real time',
        text: 'Type in the **Search** box above the table to instantly filter visible rows. The search matches against every visible column simultaneously — it is case-insensitive and partial. Hiding a column via the Columns toggle also removes it from the search scope.',
      },
      {
        title: 'Toggle column visibility',
        text: 'Click **Columns ▾** to open the column picker. Check or uncheck individual columns to show or hide them. Hidden columns are excluded from both the search and the CSV export — useful for stripping internal IDs and metadata before sharing data with non-technical stakeholders.',
      },
      {
        title: 'Paginate large datasets',
        text: 'Use the **rows per page** selector (10, 25, 50, 100, or All) to control how many rows appear at once. Use the pagination controls at the bottom to navigate. The row counter above the table shows how many rows are currently visible after filtering.',
      },
      {
        title: 'Export to CSV or copy as TSV',
        text: 'Click **↓ CSV** to download the current filtered, sorted, and column-restricted view as a comma-separated file ready for Excel, Google Sheets, or database import. Click **TSV** to copy the data as tab-separated values to your clipboard for pasting directly into a spreadsheet.',
      },
    ],
  },

  features: [
    'Auto-derives columns from the union of all keys across the input JSON array; use our [JSON Formatter](/json-formatter) first to validate and prettify the JSON before pasting',
    'Click column headers to sort ascending or descending — click again to clear',
    'Real-time full-text search across all visible columns simultaneously',
    'Column visibility toggle — show or hide any field independently',
    'Pagination — 10, 25, 50, 100 rows per page with navigation controls',
    'CSV export of the current filtered, sorted, and column-restricted view — for chart-based analysis, paste the same JSON into the [JSON Dashboard Generator](/json-dashboard-generator)',
    'Handles sparse arrays where objects have different sets of keys',
    'Live JSON syntax validation with inline error messages for invalid input',
    '100% client-side — no data sent to any server, safe for sensitive data; decode JWT fields found in records with our [JWT Decoder](https://fwdtools.com/jwt-decoder/)',
    'Free — no sign-up, no rate limits, runs entirely in your browser',
  ],

  useCases: [
    {
      icon: '⊞',
      title: 'Debug an API response by viewing all records in a table instead of scrolling raw JSON',
      desc: 'Paste the response array from Postman, Insomnia, or your browser Network tab and see every record with fields aligned in columns. Sort by timestamp to find the newest records, search for a specific ID or status, or toggle off verbose metadata fields to focus on the data that matters. Use our [Regex Tester](https://fwdtools.com/regex-tester/) to build patterns for filtering specific field values.',
    },
    {
      icon: '⇅',
      title: 'Find outliers in a dataset by sorting a numeric column to see the highest and lowest values',
      desc: 'Click a price, count, or score column to sort and immediately spot anomalies at the top and bottom. Search for specific statuses or categories to isolate the subset you need, then export the filtered result as CSV for deeper analysis in Excel or pandas — or paste the JSON into the [JSON Dashboard Generator](/json-dashboard-generator) to get bar and line charts with category filters in seconds.',
    },
    {
      icon: '⬇',
      title: 'Convert a JSON API response to CSV for import into Excel, Google Sheets, or Airtable',
      desc: 'Paste the JSON array, hide internal fields you don\'t want in the export, and download a clean CSV. No command-line scripting, no jq, no Python — the export respects your current column selection and row filter. Use our [Diff Checker](/diff-checker) afterwards to compare two exported CSVs and find what changed between API versions.',
    },
    {
      icon: '✓',
      title: 'Scan for missing values, nulls, or data quality issues across an entire dataset',
      desc: 'Search for "null" or empty values to find all rows with missing data at once. Sort by a field to spot rows where the value is unexpectedly 0, blank, or inconsistently formatted compared to other records.',
    },
    {
      icon: '⚙',
      title: 'Compare configuration objects or API schema definitions side by side',
      desc: 'Paste an array of environment configs, feature flags, or schema objects and toggle off the identical fields to focus the view on only the fields that differ — faster than reading raw JSON side by side.',
    },
    {
      icon: '◎',
      title: 'Export a filtered subset of API data for a non-technical stakeholder',
      desc: 'Paste the full dataset, apply a search to narrow it to the relevant records, hide internal ID and metadata columns, and export as CSV. Stakeholders can review it in Google Sheets without needing to understand JSON structure.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function JsonTableViewerPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><JsonTableViewerTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
