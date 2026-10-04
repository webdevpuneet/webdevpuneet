import SqlFormatterTool from '@/components/SqlFormatterTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'SQL Formatter & Beautifier Online Free | webdevpuneet.com',
  description: 'Format, beautify, and minify SQL queries online — MySQL, PostgreSQL, SQLite, and SQL Server with keyword casing and syntax highlighting. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/sql-formatter/' },
  icons: { icon: '/icons/sql-formatter.svg', shortcut: '/icons/sql-formatter.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/sql-formatter/',
    siteName: 'webdevpuneet.com',
    title: 'SQL Formatter & Beautifier Online — Format SQL Queries Instantly',
    description: 'Paste any SQL query and get it instantly formatted with proper indentation, keyword casing, and syntax highlighting. MySQL, PostgreSQL, SQLite, SQL Server. Free, no sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/sql-formatter.png', width: 1200, height: 630, alt: 'SQL Formatter Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'SQL Formatter & Beautifier Online — Format SQL Queries Instantly',
    description: 'Paste any SQL query and get it instantly formatted with proper indentation, keyword casing, and syntax highlighting. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/sql-formatter.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I format a SQL query online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your SQL query into the input panel on the left. The formatter automatically applies proper indentation and formatting as you type — no button press required. If you prefer to trigger formatting manually, click the Format button in the toolbar. The formatted output appears in the right panel with syntax highlighting. You can then click Copy to copy it to your clipboard or Download to save it as a .sql file.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which SQL dialects does this formatter support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The formatter handles Generic SQL, MySQL, PostgreSQL, SQLite, and SQL Server (T-SQL) syntax. The dialect selector in the toolbar lets you label your query with the target database. The tokenizer handles dialect-specific syntax including MySQL backtick identifiers, PostgreSQL dollar-quoted strings and :: cast syntax, SQL Server square bracket identifiers and TOP clause, and SQLite-specific functions. Most standard SQL constructs — SELECT, JOIN, subqueries, CASE/WHEN, window functions, CTEs — work across all dialects.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between formatting and minifying SQL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Formatting (beautifying) adds proper indentation, newlines before each major clause, and consistent keyword casing to make queries readable for humans. Each SELECT column, WHERE condition, and JOIN clause is placed on its own indented line. Minifying does the opposite — it removes all unnecessary whitespace and comments to produce the shortest possible query string. Minified SQL is useful for embedding queries in code strings, logging, or sending over a wire where readability is less important than compactness.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I change SQL keywords to uppercase or lowercase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the Keywords dropdown in the toolbar. Select UPPERCASE to convert all SQL keywords (SELECT, FROM, WHERE, JOIN, etc.) to uppercase — the most common convention in professional SQL. Select lowercase to convert all keywords to lowercase — common in some PostgreSQL and application-layer codebases. Select Preserve to leave keyword casing exactly as typed, without modification. The setting applies instantly without needing to reformat.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I format multi-statement SQL scripts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The formatter handles multiple SQL statements separated by semicolons. Each statement is formatted independently, with a blank line between them in the output for readability. This works for scripts containing a mix of SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, ALTER TABLE, and other statement types. Comments (-- line comments and /* block comments */) are preserved and formatted at the correct indentation level.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this SQL formatter handle subqueries and CTEs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Subqueries inside parentheses are detected automatically and indented one level deeper than the outer query. Common Table Expressions (CTEs) using WITH ... AS (...) are formatted with the CTE body properly indented. Nested subqueries increase indentation with each level. CASE/WHEN/THEN/ELSE/END expressions are formatted with each WHEN and ELSE on its own indented line, and END is dedented back to the CASE level.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my SQL private when I use this online formatter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — all SQL formatting runs entirely in your browser using JavaScript. Your queries are never sent to any server, never logged, and never stored outside your browser tab. This makes the tool safe for formatting queries that contain sensitive table names, column names, production data patterns, credentials in connection strings, or any proprietary database schema. Closing the tab permanently discards everything you pasted.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload a .sql file to format it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Click the Upload button in the toolbar to select a .sql or .txt file from your computer, or drag and drop the file directly onto the panel. The file contents are loaded into the input editor and formatted automatically. You can then download the formatted output using the Download button, which saves the result as query.sql.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SQL Formatter Online',
  url: 'https://webdevpuneet.com/sql-formatter/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online SQL formatter and beautifier with syntax highlighting, keyword casing, dialect support, and SQL minifier. Supports MySQL, PostgreSQL, SQLite, SQL Server.',
  featureList: [
    'Auto-format SQL with proper clause indentation',
    'SQL minifier — remove whitespace and comments',
    'Keyword casing: UPPERCASE, lowercase, or preserve',
    'Dialect support: MySQL, PostgreSQL, SQLite, SQL Server',
    'Syntax highlighting for keywords, strings, numbers, comments',
    'Multi-statement SQL script support',
    'Subquery and CTE indentation',
    'CASE/WHEN/THEN/ELSE/END formatting',
    'File upload (.sql, .txt) and drag & drop',
    'Copy to clipboard and download as .sql',
    'Query history — auto-saves last 10 formatted queries',
    '100% private — no SQL ever sent to any server',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'SQL Formatter', item: 'https://webdevpuneet.com/sql-formatter/' },
  ],
};

const SEO = {
  slug: 'sql-formatter',
  title: 'SQL Formatter & Beautifier Online — Format, Highlight & Minify SQL Queries',

  about: {
    title: 'Online SQL Formatter — Free, Beautify, Highlight & Minify SQL Queries Instantly',
    description: 'You have a SQL query that looks like one long unreadable line — everything on a single row, no indentation, mixed keyword casing, no whitespace between clauses. Paste it here and the formatter instantly restructures it: each major clause (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY) on its own line, columns indented beneath SELECT, AND/OR conditions aligned under WHERE, subqueries indented inside their parentheses. The output has full syntax highlighting — clause keywords in blue, other keywords lighter, strings in green, numbers in red, comments dimmed, quoted identifiers in purple.\n\nThe formatter handles the full range of SQL you write day to day. **Multi-statement scripts** with semicolons are formatted statement by statement with a blank line between each. **Subqueries** in parentheses are automatically detected and indented one level deeper than the outer query. **CTEs** (Common Table Expressions) using `WITH ... AS (...)` format with the CTE body properly indented. **CASE/WHEN/THEN/ELSE/END** expressions format with each branch on its own line. **Window functions** with OVER (PARTITION BY ... ORDER BY ...) are handled correctly. **Comments** — both `--` line comments and `/* block comments */` — are preserved at the correct indentation level in the formatted output.\n\n**Dialect support** covers the most common databases: MySQL (backtick identifiers, AUTO_INCREMENT, STRAIGHT_JOIN), PostgreSQL (dollar-quoted strings, `::` cast syntax, ILIKE, RETURNING), SQLite (AUTOINCREMENT, GLOB), and SQL Server / T-SQL (square bracket identifiers, TOP, NOLOCK hints, OUTPUT clause). Most standard SQL constructs work identically across all dialects.\n\nThe **minifier** collapses all formatting and removes comments to produce the shortest valid query string — useful for embedding SQL in application code, connection strings, log messages, or any context where compact output matters more than readability.\n\n**Query history** automatically saves the last 10 formatted queries in your browser, so you can quickly restore a query you formatted earlier without pasting it again. Everything runs 100% client-side — your SQL, table names, column names, and data patterns never leave your browser.',
  },

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste your SQL into the input panel',
        text: 'Paste any SQL query into the left input panel. The formatter auto-formats in real time as you type — each major clause (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY) moves to its own line with proper indentation. Click **Sample** to load a realistic multi-table e-commerce query with JOINs, a CASE expression, GROUP BY, HAVING, and ORDER BY. Click **Paste** to paste clipboard content directly. Drag and drop a `.sql` file or click **Upload** to load from disk.',
      },
      {
        title: 'Set keyword casing and indent size',
        text: 'Use the **Keywords** dropdown to choose: **UPPERCASE** (the most widely-used SQL convention), **lowercase** (common in some PostgreSQL codebases), or **Preserve** (leave casing unchanged). Use the **Indent** dropdown to choose 2, 4, or 8 spaces per indentation level. Both settings apply live — changing them updates the output without re-clicking Format.',
      },
      {
        title: 'Select a dialect',
        text: 'Use the **Dialect** dropdown to label your query as Generic SQL, MySQL, PostgreSQL, SQLite, or SQL Server. The tokenizer handles dialect-specific syntax: MySQL backtick identifiers, PostgreSQL `::` cast and dollar-quoted strings, SQL Server square bracket identifiers and TOP, SQLite AUTOINCREMENT. Most standard constructs work across all dialects.',
      },
      {
        title: 'Format manually or minify',
        text: 'Click **Format** to trigger explicit formatting (useful if you turned off auto-format). Click **Minify** to collapse the query to the shortest possible single-line string with all comments stripped — useful for embedding SQL in application code, log entries, or config files where compactness matters more than readability.',
      },
      {
        title: 'Copy the formatted output or download it',
        text: 'Click **Copy** in the toolbar to copy the full formatted SQL to your clipboard. Click **Download** to save the output as `query.sql`. The stats bar at the bottom shows the number of statements, total keyword count, and line count for the formatted output.',
      },
      {
        title: 'Use history to restore previous queries',
        text: 'The tool auto-saves the last 10 formatted queries to your browser history. Click **History** in the toolbar to open the history panel. Click any entry to restore that query instantly. This is useful when you formatted a query, navigated away, and want to recover the work without pasting again.',
      },
    ],
  },

  features: [
    'Auto-format SQL live as you type — SELECT columns, JOINs, WHERE conditions and subqueries each on their own indented line without any button press',
    'SQL minifier — collapse any query to a single compact line with all comments stripped; useful for embedding SQL in [JSON config](/json-formatter) or application code',
    'Keyword casing control — convert all keywords to UPPERCASE, lowercase, or preserve original casing; applies to SELECT, FROM, WHERE, JOIN, GROUP BY, and all other reserved words',
    'Dialect support — MySQL backtick identifiers, PostgreSQL `::` cast and dollar-quoted strings, SQL Server square brackets and TOP, SQLite AUTOINCREMENT all tokenized correctly',
    'Full syntax highlighting — clause keywords in blue, other keywords lighter blue, strings green, numbers red, comments dimmed, quoted identifiers purple, operators and punctuation gray',
    'Subquery and CTE indentation — parenthesized subqueries indent one level deeper automatically; WITH...AS CTEs format with the body indented inside the parentheses',
    'CASE/WHEN/THEN/ELSE/END formatting — each branch on its own indented line, END dedented back to the CASE level; works inside SELECT columns and WHERE conditions',
    'Multi-statement SQL scripts — semicolons split the script into independently-formatted statements with blank lines between them; works with mixed SELECT, INSERT, CREATE TABLE scripts',
    'File upload and drag & drop — load any .sql or .txt file directly into the editor; download formatted output as query.sql; compare before/after with [Diff Checker](/diff-checker)',
    'Query history — last 10 formatted queries auto-saved in your browser; restore any query in one click; 100% private, no SQL ever sent to a server',
  ],

  useCases: [
    {
      icon: '⊞',
      title: 'Format a minified SQL query from an ORM or query log',
      desc: 'ORMs like Hibernate, ActiveRecord, SQLAlchemy, and Prisma often log queries as single-line strings with no whitespace. Paste the minified log output and the formatter restructures it into readable multi-line SQL with proper clause indentation — making it straightforward to understand what the ORM generated and whether it is doing what you intended. Combine with our [JSON Formatter](/json-formatter) to clean up JSON query parameters alongside the SQL.',
    },
    {
      icon: '⟺',
      title: 'Clean up SQL before committing to version control',
      desc: 'SQL stored in migration files, seed scripts, and stored procedures should be consistently formatted before committing to git — otherwise every developer\'s editor produces different whitespace and diffs become noise. Paste the SQL here, format it with your team\'s chosen convention (2-space indent, UPPERCASE keywords), copy, and paste back. Use our [Diff Checker](/diff-checker) to verify exactly what changed between the old and new version before committing.',
    },
    {
      icon: '◎',
      title: 'Debug a complex query with subqueries and multiple JOINs',
      desc: 'Multi-table queries with nested subqueries, multiple JOINs, and long WHERE conditions are difficult to read as flat text. Formatting them makes the structure immediately visible — each JOIN is on its own line, each subquery is indented inside its parentheses, and AND/OR conditions are aligned under the WHERE clause. This makes it easier to spot missing JOIN conditions, incorrect column references, and logic errors in complex analytical queries.',
    },
    {
      icon: '⚙',
      title: 'Standardize keyword casing across a legacy codebase',
      desc: 'Legacy SQL codebases often have inconsistent keyword casing — some files use SELECT, others use select or Select. Paste each query and use the UPPERCASE keywords option to normalize the casing, then copy back. The formatter never changes identifiers, string values, or comments — only SQL reserved keywords are affected, making it safe to run on production queries without risk of semantic changes.',
    },
    {
      icon: '▦',
      title: 'Embed SQL in application code after minifying',
      desc: 'SQL strings embedded in Python, JavaScript, Go, or Java application code are easier to maintain as minified single-line strings in some codebases. Use the Minify button to collapse your formatted query to a compact single line with all comments stripped — ready to paste into a string literal or configuration file. The minifier preserves all query semantics and handles string literals and quoted identifiers correctly.',
    },
    {
      icon: '≡',
      title: 'Prepare SQL for documentation, reports, or code review',
      desc: 'SQL shared in documentation, pull request descriptions, Confluence pages, Slack messages, or technical reports should be formatted and consistently cased. Paste your query, format it with UPPERCASE keywords and 2-space indentation, then download as query.sql or copy to clipboard. The syntax-highlighted output in the right panel can also be screenshot for documentation using our [Code Screenshot Generator](/code-screenshot-generator).',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function SqlFormatterPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><SqlFormatterTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection heading="Free SQL Formatter Online — Beautify, Highlight & Minify SQL Queries" {...SEO} /></IndexOnly>

    </div>
  );
}
