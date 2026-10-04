import SqlPlaygroundTool from '@/components/SqlPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'SQL Playground — Learn SQL Visually, 39 Lessons Free | webdevpuneet.com',
  description: 'Learn SQL online with 39 lessons on real PostgreSQL in your browser — SELECT, JOINs, CTEs, window functions, indexes, and transactions. Free, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/sql-playground/' },
  icons: { icon: '/icons/sql-playground.svg', shortcut: '/icons/sql-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/sql-playground/',
    siteName: 'webdevpuneet.com',
    title: 'SQL Playground — Learn SQL with Real PostgreSQL in Your Browser',
    description: '39 structured SQL lessons — basics through window functions, indexes, EXPLAIN, and transactions. Powered by real PostgreSQL WASM. Write, run, and see results instantly. Free, no sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/sql-playground.png', width: 1200, height: 630, alt: 'SQL Playground Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'SQL Playground — Learn SQL with Real PostgreSQL in Your Browser',
    description: '39 structured SQL lessons, beginner to pro. Real PostgreSQL engine. Write and run SQL instantly in your browser.',
    images: ['https://webdevpuneet.com/images/sql-playground.png'],
  },
};

const seoData = {
  slug: 'sql-playground',
  title: 'SQL Playground — Learn SQL with Real PostgreSQL in Your Browser, Free',

  about: {
    title: 'Learn SQL Online with a Real PostgreSQL Engine — No Install, No Sign-Up',
    description: `Most people learning SQL hit the same wall: the tutorial shows you the syntax, but you have no database to actually run it against. Setting up PostgreSQL locally means installing a server, creating a database, connecting a client, and loading sample data — before you even write your first SELECT. This playground eliminates that friction entirely.

Open the page and you have a working PostgreSQL database in your browser, pre-loaded with realistic sample data across four related tables: employees, departments, projects, and assignments. Write any SQL query, press Ctrl+Enter or click Run, and see the results in a table below. No installation, no account, no loading screen on subsequent visits — PostgreSQL runs directly in your browser using PGlite, a real PostgreSQL engine compiled to WebAssembly.

The tool is structured as 39 lessons across 10 chapters that take you from beginner to pro: from the very first SELECT statement through filtering, sorting, aggregations, JOINs, subqueries, CTEs, window functions, and PostgreSQL-specific features, and finally into a professional **Indexes, Transactions & Performance** chapter — creating indexes, reading a query plan with EXPLAIN ANALYZE, BEGIN/COMMIT/ROLLBACK transactions, upserts with ON CONFLICT, and saving queries as views. Each lesson has a short concept explanation and a pre-written starter query that you can run as-is or modify to experiment. Lessons are designed so you can run the starter query, understand what it produces, then change the WHERE clause, add a column, or adjust the ORDER BY to see how the result changes — because that experimentation is how SQL actually sticks.

SQL is worth mastering because it is the universal language of data: every relational database (PostgreSQL, MySQL, SQL Server, SQLite) speaks it, and it remains one of the most in-demand skills for developers, analysts, and data scientists. The concepts here transfer directly to any database job — and because this playground runs a *real* PostgreSQL engine, what you learn is exactly what runs in production.

**The schema** stays consistent across all lessons: a small company with employees (with salaries, hire dates, manager references, and JSONB metadata), departments (with budgets and locations), projects (with statuses and dates), and assignments linking employees to projects with hours worked. This means by lesson 20 the data feels familiar — you're not learning new tables, you're learning new ways to query the same ones.

Progress is tracked automatically in localStorage. Your completed lessons and current position are remembered between sessions, so you can close the tab and pick up exactly where you left off. The schema explorer in the sidebar shows every table with its column names and types, so you always know what data is available without leaving the editor.`,
  },

  features: [
    'Real PostgreSQL engine (PGlite WASM) — not a toy interpreter; runs actual PostgreSQL in your browser; design tables visually first in the [database schema designer](https://fwdtools.com/database-schema-designer/)',
    '39 structured lessons across 10 chapters, beginner to pro — from SELECT basics to window functions, indexes, EXPLAIN, transactions, upserts, and views — tidy your practice queries with the [SQL formatter](https://fwdtools.com/sql-formatter/)',
    'Multiple-choice challenge after every lesson — confirm understanding before marking it complete',
    'Write-your-own SQL challenges — task prompts with automatic result validation and hints',
    'Query Explainer — runs EXPLAIN and shows a human-readable breakdown of what PostgreSQL actually does; for NoSQL equivalents try the [MongoDB playground](/mongo-playground)',
    'Multi-tab editor — open multiple independent queries in tabs, like a real SQL client',
    'Table data preview on hover — hover any table name in the schema explorer to see the first 5 rows',
    'Data Editor — view and edit table rows, insert new rows, and delete rows to test edge cases',
    'Query history — last 20 executed queries saved in localStorage and accessible via a dropdown',
    'Smart error hints — when PostgreSQL returns an error, a friendly tip explains the likely cause',
    'SQL syntax highlighting — keywords, functions, types, strings, and comments all colour-coded',
    'Schema explorer — sidebar shows all tables with column names and PostgreSQL data types',
    'Progress tracking — completed lessons saved in localStorage, position restored on return',
    'CSV export — download any SELECT result as a comma-separated file with one click',
    '100% browser-based — runs entirely in your browser; no server, no account, no sign-up required',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Pick a lesson from the sidebar',
        text: 'The left sidebar lists all 39 lessons grouped by chapter. Start at the beginning (SELECT all columns) or jump to a pro chapter — Indexes, Transactions & Performance — that matches your level. Each lesson title tells you exactly what concept it covers.',
      },
      {
        title: 'Read the concept explanation',
        text: 'A collapsible panel above the editor shows a short explanation of the SQL concept for that lesson — what it does, how it works, and what to watch out for. Click the panel header to collapse it if you want more editor space.',
      },
      {
        title: 'Run the starter query',
        text: 'Each lesson opens with a pre-written SQL query. Press Ctrl+Enter (or click the Run button) to execute it. The results appear in the table below. PostgreSQL loads from CDN on first use — this takes a few seconds; subsequent queries run instantly.',
      },
      {
        title: 'Experiment by modifying the query',
        text: 'Change the WHERE clause, add a column, adjust the ORDER BY, or try writing the same query a different way. The editor supports Tab for indentation. If you break something, click Reset to restore the lesson\'s starter query.',
      },
      {
        title: 'Check the schema explorer',
        text: 'The bottom section of the sidebar shows all four tables with their column names and PostgreSQL data types. Expand it to see what columns are available — useful when writing joins or filtering on a column you\'ve forgotten the name of.',
      },
      {
        title: 'Mark the lesson done and move to the next',
        text: 'Once you\'re comfortable with a concept, click Mark Done. Your progress is saved automatically. Use the Previous/Next buttons at the bottom to navigate between lessons, or click any lesson in the sidebar to jump directly to it.',
      },
    ],
  },

  useCases: [
    {
      icon: '▶',
      title: 'Learn SQL from scratch without installing anything',
      desc: 'If you want to learn SQL and don\'t want to spend 45 minutes setting up a local database before writing your first query, start here. The playground gives you a working PostgreSQL database the moment the page loads. The 35 lessons build from SELECT basics through joins, aggregations, window functions, and PostgreSQL-specific features in a logical order.',
    },
    {
      icon: '⟺',
      title: 'Practice SQL joins and understand which type to use',
      desc: 'INNER JOIN, LEFT JOIN, self join — the joins chapter has dedicated lessons for each type. The pre-loaded employees/departments/projects dataset makes join results immediately readable: you can see which rows are included or excluded by each join type and understand the difference without abstract examples.',
    },
    {
      icon: '{}',
      title: 'Understand CTEs before writing them at work',
      desc: 'The CTEs chapter covers basic WITH clauses, chained CTEs, and recursive CTEs for org chart traversal. Each lesson shows the full query with meaningful column names so you can see how a CTE is structured and how it simplifies a query that would otherwise require nested subqueries.',
    },
    {
      icon: '⊞',
      title: 'Learn window functions with real examples',
      desc: 'ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, running totals, and PARTITION BY — each gets its own lesson with a query you can run and modify. Window functions are one of the hardest SQL concepts to understand from documentation alone; seeing the actual output for each function side-by-side with the input data makes the behaviour clear.',
    },
    {
      icon: '◉',
      title: 'Explore PostgreSQL-specific features like JSONB',
      desc: 'The final chapter covers PostgreSQL extras that don\'t exist in every database: CASE WHEN expressions, string functions like SPLIT_PART, date functions like DATE_TRUNC and EXTRACT, and JSONB operators for querying semi-structured data. The employees table includes a JSONB metadata column with real data to query against.',
    },
    {
      icon: '✦',
      title: 'Refresh SQL knowledge before a technical interview',
      desc: 'Skip directly to the chapters on aggregations, joins, subqueries, or window functions to review concepts before an interview. Each lesson shows the pattern you\'d use in a real query, and the results table confirms exactly what the query produces so there\'s no ambiguity about what you\'re reviewing.',
    },
  ],

  faqs: [
    {
      q: 'Does this use a real PostgreSQL database or a JavaScript simulation?',
      a: 'It uses PGlite — a real PostgreSQL engine compiled to WebAssembly. When the page loads, it downloads the PostgreSQL WASM binary from CDN (a few seconds on first load) and creates an in-memory PostgreSQL database in your browser. Queries run against real PostgreSQL, so you get accurate error messages, real type handling, and support for all standard PostgreSQL features including JSONB, window functions, and recursive CTEs.',
    },
    {
      q: 'Is my data private? Does anything get sent to a server?',
      a: 'Yes, completely private. PostgreSQL runs entirely inside your browser — the database lives in memory in your browser tab and is never sent anywhere. When you close the tab, the database is gone. Your query text, your results, and your progress data (stored in localStorage) never leave your machine.',
    },
    {
      q: 'What tables are in the database?',
      a: 'The database has four related tables: employees (id, name, department_id, salary, hire_date, manager_id, metadata JSONB), departments (id, name, location, budget), projects (id, name, status, start_date, department_id), and assignments (employee_id, project_id, role, hours_worked). The schema explorer in the sidebar shows all columns and types. The data represents a small tech company with 12 employees across 5 departments and 5 projects.',
    },
    {
      q: 'Can I run my own SQL — not just the lesson queries?',
      a: 'Yes. The editor is a full SQL editor — you can clear the starter query and write anything you want. CREATE TABLE, INSERT, SELECT, JOIN, aggregations, CTEs, window functions, and PostgreSQL-specific features all work. You can even modify the existing data with UPDATE or INSERT statements. The only limitation is that the database resets when you reload the page.',
    },
    {
      q: 'What is the difference between SQL and PostgreSQL?',
      a: 'SQL (Structured Query Language) is the standard language for querying relational databases. PostgreSQL is a specific database engine that implements SQL but adds many powerful extensions: JSONB columns, ILIKE for case-insensitive matching, array types, the RETURNING clause, full-text search, and more. The first 8 chapters of this playground teach standard SQL that works in any database. The final chapter covers PostgreSQL-specific features.',
    },
    {
      q: 'Why does the first query take a few seconds to run?',
      a: 'The first time you click Run, the tool downloads the PostgreSQL WebAssembly binary from CDN (~10–15MB), initialises the database engine, and loads the sample data. This typically takes 3–8 seconds depending on your connection. Every subsequent query runs in milliseconds because the engine is already loaded and the database is already initialised. You\'ll see a "Loading PostgreSQL engine…" message while this happens.',
    },
    {
      q: 'How is this different from other online SQL editors?',
      a: 'Most browser-based SQL tools either connect to a shared remote database (introducing latency and privacy concerns), use a simplified JavaScript SQL interpreter (which doesn\'t support real PostgreSQL syntax), or require you to create an account. This playground runs real PostgreSQL entirely in your browser via WebAssembly — no server, no account, no interpreter. It\'s also structured as guided lessons rather than a blank editor, making it more useful for learning than for ad-hoc querying.',
    },
    {
      q: 'Can I export my query results?',
      a: 'Yes. When a SELECT query returns results, a CSV button appears in the results panel header. Click it to download all returned rows as a CSV file named results.csv. The export includes the column names as the header row and handles values that contain commas or quotes correctly.',
    },
    {
      q: 'What are window functions and why are they useful?',
      a: 'Window functions compute a value across a set of rows related to the current row, without collapsing them into a single row the way GROUP BY does. They\'re used for rankings (ROW_NUMBER, RANK), comparing rows to their neighbours (LAG, LEAD), computing running totals (SUM OVER ORDER BY), and calculating per-group statistics alongside individual row data (PARTITION BY). The Window Functions chapter has four lessons that cover each of these patterns with queries you can run and modify.',
    },
    {
      q: 'Is my progress saved if I close the tab?',
      a: 'Yes. Completed lessons and your current lesson position are saved automatically in your browser\'s localStorage. When you reopen the page, you\'ll return to the lesson you were on. Progress is stored per browser — it won\'t sync across devices. If you clear your browser storage or use a private window, progress starts fresh.',
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SQL Playground',
  url: 'https://webdevpuneet.com/sql-playground/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript and WebAssembly',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Interactive SQL learning playground powered by real PostgreSQL (PGlite WASM). 39 structured lessons, beginner to pro, from SELECT basics through window functions, indexes, EXPLAIN, transactions, upserts, and views. Pre-loaded dataset, syntax highlighting, results table, schema explorer, and CSV export. 100% browser-based.',
  featureList: seoData.features.join(', '),
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'SQL Playground', item: 'https://webdevpuneet.com/sql-playground/' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: seoData.faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function SqlPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><SqlPlaygroundTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
