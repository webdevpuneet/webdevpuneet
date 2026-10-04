import JsonDashboardGeneratorTool from '@/components/JsonDashboardGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'JSON to Dashboard Generator — Free, Visualize API Data Online | webdevpuneet.com',
  description: 'Paste any JSON or API response and get instant bar charts, line charts, filters, and a table. Export a complete React dashboard with Recharts. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/json-dashboard-generator/' },
  icons: { icon: '/icons/json-dashboard-generator.svg', shortcut: '/icons/json-dashboard-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/json-dashboard-generator/',
    siteName: 'webdevpuneet.com',
    title: 'JSON to Dashboard Generator — Visualize API Data with Charts & Tables',
    description: 'Free — Paste any JSON array or API response and get an instant dashboard — stat cards, bar/line/pie charts, category filters, sortable table, and exportable React code.',
    images: [{ url: 'https://webdevpuneet.com/images/json-dashboard-generator.png', width: 1200, height: 800, alt: 'JSON to Dashboard Generator' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'JSON to Dashboard Generator — Charts, Filters & React Code Export',
    description: 'Paste any JSON or API response and instantly get charts, stat cards, filters, and a sortable table. Export a complete Recharts React dashboard.',
    images: ['https://webdevpuneet.com/images/json-dashboard-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I visualize JSON API data as charts and tables online?',
      acceptedAnswer: { '@type': 'Answer', text: 'Paste your JSON array directly into this tool and it will instantly generate bar charts, line charts, stat cards, and a sortable table — no configuration needed. The tool auto-detects field types (numbers, categories, dates, booleans) and selects the most appropriate chart type: line charts for date fields, pie charts for low-cardinality categories, and bar charts otherwise. You can override the chart type, X axis, and Y axis using the controls in the left panel.' },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a JSON array to a React dashboard with Recharts?',
      acceptedAnswer: { '@type': 'Answer', text: 'This tool generates a complete, copy-pasteable React component using the Recharts library. Click the "React (Recharts)" tab in the code panel to see the generated component, which includes filter state with useState, aggregated chart data with useMemo, stat cards for numeric fields, filter dropdowns for category fields, a Recharts chart (BarChart, LineChart, or PieChart) wrapped in ResponsiveContainer, and a data table showing the first 50 filtered rows. Paste the code into your project, run npm install recharts, and it works immediately.' },
    },
    {
      '@type': 'Question',
      name: 'How do I handle paginated API responses like {data: [], meta: {}} in a dashboard?',
      acceptedAnswer: { '@type': 'Answer', text: 'The tool automatically unwraps common paginated response shapes. If your JSON is an object (not an array), it looks for a nested array under any of these keys: data, results, items, records, rows, or list. Once found, it uses that array as the dataset. Remaining keys — like page, total, per_page, count, or cursor — are shown as a "meta banner" with key-value chips above the dashboard. This means you can paste a raw API response like {"data": [...], "meta": {"page": 1, "total": 2500}} without pre-processing it.' },
    },
    {
      '@type': 'Question',
      name: 'How do I automatically aggregate JSON data by category for a bar chart?',
      acceptedAnswer: { '@type': 'Answer', text: 'The tool groups all rows by the selected X axis field, summing the selected Y axis (numeric) field for each unique X value. This aggregation happens client-side using useMemo and updates instantly when you change filters. For example, if your data has rows with region and revenue fields, selecting X=region and Y=revenue produces a chart showing total revenue per region across all filtered rows. Up to 30 unique X values are shown in a single chart.' },
    },
    {
      '@type': 'Question',
      name: 'How do I build sortable, filterable tables from JSON data in React?',
      acceptedAnswer: { '@type': 'Answer', text: 'The generated React code includes fully working sort and filter logic. Clicking a column header sorts the table by that field — a second click reverses the direction. Filter dropdowns are generated for every category or boolean field in your JSON. The filtering logic uses Array.filter with conditions chained per active dropdown, and sorting uses Array.sort with numeric and string comparisons. The table shows up to 50 rows to keep rendering fast, with a row count indicator showing how many total rows match the active filters.' },
    },
    {
      '@type': 'Question',
      name: 'What Recharts component should I use for a JSON array time series?',
      acceptedAnswer: { '@type': 'Answer', text: 'When the tool detects a date field in your JSON (a string that parses as a valid date with at least 8 characters), it automatically selects the X axis as that date field and sets the chart type to LineChart — the right choice for time series data because it preserves the continuous, ordered nature of timestamps. The generated code uses <LineChart> with <Line type="monotone"> and <XAxis dataKey="yourDateField"> for correct rendering. If you need a bar chart for the same data, switch the chart type selector to "Bar" and the generated code updates to use <BarChart> instead.' },
    },
    {
      '@type': 'Question',
      name: 'How do I filter a React data table by a category field from JSON?',
      acceptedAnswer: { '@type': 'Answer', text: 'The tool detects category fields automatically: any string field with 25 or fewer unique values where cardinality is below 90% of the row count is classified as a category. In the left panel, check the filter fields you want to expose as dropdowns. In the dashboard, a filter bar appears with a labeled dropdown for each selected category field. In the generated React code, each filter field gets a useState hook and the filtered array is computed with a single data.filter() call that chains all active conditions.' },
    },
    {
      '@type': 'Question',
      name: 'How do I detect field types in a JSON array automatically?',
      acceptedAnswer: { '@type': 'Answer', text: 'The tool inspects all values in each field across all rows. A field is typed as "number" if every value is a JavaScript number or a parseable numeric string. It is typed as "date" if every value is a string of at least 8 characters that passes Date.parse(). It is typed as "boolean" if every value is a true/false boolean. It is "id" if the field name is id, _id, uuid, key, or pk, or if all values are unique and look like IDs (long strings or pure number sequences). It is "category" if it is a string field with 25 or fewer unique values and cardinality below 90% of rows. Everything else is typed as "string". One-level-deep nested objects are flattened into parent.child keys.' },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'JSON Dashboard Generator', item: 'https://webdevpuneet.com/json-dashboard-generator/' },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JSON Dashboard Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Paste any JSON array or API response and instantly generate stat cards, bar/line/pie charts, category filters, a sortable paginated table, and a complete React dashboard using Recharts — all in the browser.',
  url: 'https://webdevpuneet.com/json-dashboard-generator/',
};

const seoData = {
  slug: 'json-dashboard-generator',
  title: 'JSON Dashboard Generator — Visualize Any API Response Instantly',
  sections: [
    {
      type: '2col',
      left: {
        type: 'text',
        label: 'About this tool',
        heading: 'Stop Building Dashboards by Hand — Paste JSON and Get One Instantly',
        text: `Every developer has been there: you get a JSON response from an API, you need to understand the data quickly, and you end up writing throwaway React code to render a table, manually picking columns, hard-coding filter dropdowns, and writing aggregation logic that you'll delete the moment the real dashboard is built. It's tedious, slow, and you repeat it every time you work with a new API endpoint.\n\nThis tool eliminates that cycle. Paste any JSON — a raw array, a paginated API response with a data or results wrapper, or a single object — and it instantly generates a live dashboard you can actually use: stat cards for every numeric field, a bar, line, or pie chart (automatically chosen based on your data types), filter dropdowns for category fields, and a sortable, paginated table. No configuration, no API keys, no installation. It runs entirely in your browser.\n\n**Automatic field type detection** is what makes this work without configuration. The tool inspects every value across all rows for every field. Number fields (including numeric strings like "12400") become stat cards and chart axes. String fields with 25 or fewer unique values — like "region", "status", or "category" — become category filters and pie chart segments. Date strings (ISO 8601, readable formats) trigger a line chart for time-series visualization. Boolean fields become filter toggles. ID fields (named id, _id, uuid, or unique-valued columns) are hidden from the table by default to reduce noise. One level of nested objects is automatically flattened: a row like {"user": {"name": "Alice", "role": "admin"}} becomes {"user.name": "Alice", "user.role": "admin"}.\n\n**Chart type selection** uses the data to make an informed choice. If a date field exists, the tool selects it as the X axis and renders a line chart — the right representation for time series because it shows continuity and trend. If a category field exists with six or fewer unique values, a donut-style pie chart shows proportional breakdown. Larger category fields and string fields default to a bar chart for easy comparison. You can override the chart type, X axis field, and Y axis field at any time using the controls in the left panel — the chart updates instantly.\n\n**Paginated API responses** are handled transparently. If your JSON is an object rather than a plain array, the tool looks for the array inside common wrapper keys: data, results, items, records, rows, list. Once found, the remaining keys (page, total, per_page, cursor, count, etc.) appear as a meta banner above the dashboard — so you can paste a raw API response with pagination metadata and see it all at once. This lets you work directly with real-world API shapes like those from REST APIs, GraphQL responses, and frameworks like Laravel's paginate() or Django REST Framework's PageNumberPagination.\n\n**The React code export** is where the tool saves the most time. Click the React (Recharts) tab in the code panel and you get a complete, production-quality React component: import statements for Recharts, the first 100 rows embedded as a data constant, inline style objects, filter state with useState, aggregated chart data with useMemo, stat cards for numeric fields, filter dropdowns with all unique values populated, the correct Recharts chart component (BarChart, LineChart, or PieChart) wrapped in ResponsiveContainer, and a data table with sortable column headers. Install Recharts (npm install recharts), paste the component into your project, and it renders correctly with zero changes. The JSON Data tab exports the currently filtered rows as clean JSON — useful for seeding tests, feeding into other tools, or quickly slicing a large dataset.\n\nFor testing the API endpoint that produced your JSON, use our [API Request Generator & Tester](/api-request-generator-tester) to send requests and copy the response. For formatting and validating your JSON before pasting, the [JSON Formatter](/json-formatter) handles syntax highlighting, pretty-printing, and error detection with line-level error messages.`,
      },
      right: {
        type: 'features',
        heading: 'Features',
        items: [
          '**Auto field type detection** — number, category, date, boolean, string, ID — inspects all values across all rows',
          '**Smart chart selection** — line chart for date fields, pie for low-cardinality categories, bar for everything else',
          '**Pure SVG charts** — bar, line (with gradient area fill), and donut pie — no chart library dependency in the live preview',
          '**Stat cards** — auto-generated for every numeric field showing sum across filtered rows + row count',
          '**Category filter dropdowns** — auto-generated from string fields with ≤25 unique values; stacks with multiple active filters',
          '**Sortable, paginated table** — click any column header to sort ascending/descending; 10 rows per page with prev/next controls',
          '**Paginated API response unwrapping** — detects data, results, items, records, rows, list wrapper keys; shows meta fields as a banner',
          '**One-level object flattening** — nested objects like {"user":{"name":"Alice"}} become "user.name" columns automatically',
          '**React (Recharts) code export** — complete component with useState filters, useMemo aggregation, stat cards, and responsive chart',
          '**JSON Data export** — export the current filtered view (up to 100 rows) as clean JSON',
          '**Configurable X and Y axes** — override auto-selection for any combination of fields',
          '**Configurable filter fields** — check/uncheck which category fields appear as dashboard filter dropdowns',
          '**Meta banner** — shows pagination metadata (page, total, cursor) from API response wrappers',
          '**Works immediately** — sample monthly revenue dataset is pre-loaded so the tool demonstrates itself on first open',
          '**100% browser-based** — your data never leaves your device; no server, no sign-up, no usage limits',
        ],
      },
    },
    {
      type: 'steps',
      heading: 'How to Use',
      items: [
        { title: 'Paste your JSON', text: 'Click in the JSON Input textarea on the left and paste any JSON array, API response object, or paginated response. The tool accepts plain arrays ([{...}]), wrapped responses ({"data":[...],"meta":{...}}), and single objects. The sample dataset loads automatically when you open the tool so you can explore it immediately.' },
        { title: 'Review detected fields', text: 'The Detected Fields panel shows every field in your JSON with a colored type badge: # for numbers, Aⓐ for categories, 📅 for dates, T/F for booleans, Aa for strings, and ID for identifier fields. Number fields show their total sum; category fields show the unique value count. This lets you verify the tool understood your data correctly before configuring the chart.' },
        { title: 'Read the stat cards', text: 'Stat cards appear automatically for every numeric field — up to four cards showing the sum across all visible rows. The count underneath each card updates as you apply filters, so you can see totals for filtered subsets (e.g., "total revenue for East region" by selecting the East filter).' },
        { title: 'Apply filters', text: 'If your JSON has category or boolean fields, filter dropdowns appear in the filter bar above the chart. Select a value from any dropdown to narrow the data — the chart, stat cards, and table all update instantly. Use multiple filters at once to drill down. Click ✕ Clear to reset all filters at once.' },
        { title: 'Configure the chart', text: 'In the left panel under Chart, use the Bar / Line / Pie segmented control to switch chart types. Use the X axis dropdown to choose the grouping field and the Y axis dropdown to choose which numeric field to aggregate. The chart re-renders immediately — use this to explore different angles of your data without writing any code.' },
        { title: 'Sort and page through the table', text: 'Click any column header in the table to sort by that field. Click again to reverse direction. Use the pagination buttons (« ‹ › ») to step through 10 rows at a time. The row counter below the table shows the current range and total, updating as you filter.' },
        { title: 'Copy the React code', text: 'Click the React (Recharts) tab in the code panel at the bottom. The generated component includes your actual data (first 100 rows), all active filter fields as dropdowns, the selected chart type, and a data table. Click Copy to copy to clipboard. Install Recharts in your project (npm install recharts) and paste the component — it renders immediately with no edits required. Switch to the JSON Data tab to export the filtered dataset as clean JSON.' },
      ],
    },
    {
      type: 'cards',
      heading: 'Common Use Cases',
      columns: 3,
      items: [
        { icon: '📊', title: 'Visualize API response data instantly', desc: 'Hit an API endpoint with the [API Request Generator & Tester](/api-request-generator-tester), copy the JSON response body, and paste it here. In seconds you have a chart showing trends, stat cards with totals, and a sortable table — without writing a single line of code. Works with REST APIs, GraphQL data arrays, and any JSON-returning service.' },
        { icon: '⊞', title: 'JSON array to sortable data table', desc: 'Paste any flat JSON array and the tool renders a paginated, sortable table across all fields. Click column headers to sort by any field — strings use locale-aware alphabetical order, numbers use numeric comparison. The [JSON Formatter](/json-formatter) can help you validate and pretty-print the JSON before pasting.' },
        { icon: '📈', title: 'Turn monthly data into a line chart', desc: 'Any JSON array with a date or sequential string field becomes a time series line chart automatically. The tool detects date strings, sets them as the X axis, and renders a smooth line chart with gradient area fill. Use the Y axis selector to switch between different numeric metrics.' },
        { icon: '🔍', title: 'Filter and slice a large JSON dataset', desc: 'Working with a large API response? Apply multiple category filters to slice the data — the chart, stat cards, and table all update to show only matching rows. Export the filtered subset as JSON using the JSON Data tab for use in tests, seeding fixtures, or piping into other tools like the [CSV to JSON Converter](https://fwdtools.com/csv-json-converter/).' },
        { icon: '⚛️', title: 'Generate a Recharts dashboard component', desc: 'The React export produces a complete Recharts component: filter state with useState, chart data aggregation with useMemo, BarChart/LineChart/PieChart with ResponsiveContainer, and a data table — all in one file. Paste it into any React project as a starting point for a real dashboard, then swap in your live API calls.' },
        { icon: '📦', title: 'Inspect paginated API responses', desc: 'APIs that return {"data": [...], "meta": {"page": 1, "total": 500}} can be pasted directly — the tool unwraps the array and shows pagination metadata as a banner. This is useful for debugging pagination logic, verifying that total counts match data length, and understanding what a paginated endpoint actually returns before writing client-side logic.' },
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      items: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
    },
  ],
};


const howToSteps = seoData.sections.find(section => section.type === 'steps')?.items ?? [];
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: seoData.title,
  description: howToSteps[0]?.text || seoData.title,
  step: howToSteps.map((item, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: item.title,
    text: item.text,
  })),
};

export default function JsonDashboardGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <div className={styles.page}>
        <div className={styles.toolSection}>
          <JsonDashboardGeneratorTool />
        </div>
        <IndexOnly><AdSlot />
        <SeoSection {...seoData} /></IndexOnly>


      </div>
    </>
  );
}
