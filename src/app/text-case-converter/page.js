import TextCaseConverter from '@/components/TextCaseConverter';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: "Text Case Converter: camelCase, snake_case and More",
  description: "Convert text to camelCase, snake_case, PascalCase, kebab-case, UPPER CASE, Title Case and 14 more formats at once. Paste your text once and copy any case. Free.",
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/text-case-converter/' },
  icons: { icon: '/icons/text-case-converter.svg', shortcut: '/icons/text-case-converter.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/text-case-converter/',
    siteName: 'webdevpuneet.com',
    title: 'Text Case Converter — camelCase, snake_case, Title Case & 14 More',
    description: 'Convert text to 14 case formats simultaneously — camelCase, snake_case, PascalCase, kebab-case, UPPER, Title Case, and more. Paste once, copy any case free.',
    images: [{ url: 'https://webdevpuneet.com/images/text-case-converter.png', width: 1200, height: 630, alt: 'Text Case Converter Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Text Case Converter — camelCase, snake_case, Title Case & 14 More',
    description: 'Convert text to 14 case formats at once. camelCase, snake_case, PascalCase, kebab-case, SCREAMING_SNAKE, Title Case, and more. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/text-case-converter.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert text to camelCase online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your text into the input field at the top of this converter. All 14 case formats are shown simultaneously in the grid below — find the camelCase card and click "Copy" to copy the converted text to your clipboard. camelCase joins words together with no separator and capitalizes every word except the first: "hello world" becomes "helloWorld". The converter automatically handles text from any source — it splits on spaces, hyphens, underscores, dots, and even detects existing camelCase or PascalCase boundaries.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between camelCase, PascalCase, and snake_case?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'camelCase starts with a lowercase letter and capitalizes each subsequent word: helloWorld. It is the default naming convention for variables and functions in JavaScript, Java, Swift, Kotlin, and Dart. PascalCase (also called UpperCamelCase) capitalizes every word including the first: HelloWorld. It is used for class names, component names in React, and type names in TypeScript and C#. snake_case separates words with underscores and uses all lowercase: hello_world. It is the standard for variables and functions in Python, Ruby, and Rust, and for database column names in SQL.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is kebab-case and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'kebab-case (also written as "kebab case" or "spinal case") separates words with hyphens and uses all lowercase: hello-world. It is the standard for CSS class names, HTML attributes, URL slugs, and file names in web projects. For example: a CSS utility class might be .flex-center, a URL might be /blog/getting-started-with-react, and a package name in npm uses kebab-case. Kebab-case is invalid in most programming languages as a variable or function name because the hyphen is interpreted as a minus operator — it is primarily a web and filesystem convention.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is SCREAMING_SNAKE_CASE used for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SCREAMING_SNAKE_CASE (also called CONSTANT_CASE or UPPER_SNAKE_CASE) uses all uppercase letters with underscores between words: HELLO_WORLD. It is the universal convention for constants, environment variables, and compile-time configuration values across almost every programming language. Examples: MAX_RETRIES = 3, API_BASE_URL, NODE_ENV = "production", HTTP_PORT = 8080. In Python, Java, JavaScript, C, C++, Go, and Rust, constants defined at the module or global scope use SCREAMING_SNAKE_CASE. Environment variables in .env files and shell scripts also follow this convention.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert camelCase to snake_case?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your camelCase text (e.g., "getUserProfile") into the input field. The converter automatically detects camelCase word boundaries by splitting on transitions between lowercase and uppercase letters. The snake_case card in the grid shows the converted result: "get_user_profile". Click "Copy" to copy it. The same input simultaneously produces all other formats — PascalCase, kebab-case, SCREAMING_SNAKE_CASE, and more — so you can switch between naming conventions for the same identifier without re-typing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Title Case and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Title Case capitalizes the first letter of every word: "Hello World". It is used for article headings, page titles, button labels, navigation items, and book titles. This converter capitalizes every word including short conjunctions and prepositions, which is appropriate for UI labels and headings. Academic and journalistic style guides (APA, Chicago, AP) define slightly different rules — for example, short prepositions like "in", "on", and "at" are typically not capitalized in headlines — but for most web and UI purposes, capitalizing every word produces consistent, readable results.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is COBOL-CASE (screaming kebab)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'COBOL-CASE (also called screaming kebab case or UPPER-KEBAB-CASE) uses all uppercase letters separated by hyphens: HELLO-WORLD. It gets its name from the COBOL programming language, where identifiers historically used this format. Today it appears as HTTP header names (Content-Type, X-Request-ID, Accept-Language), in some legacy enterprise systems, and occasionally in configuration file keys. The Train-Case variant (Hello-World) is used specifically for HTTP headers in Go\'s http package, where it distinguishes canonically formatted header keys.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert multiple lines or a list of words at once?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — the converter handles multi-line input. Each line is converted independently so line breaks are preserved in the output. For example, if you paste a list of database column names like "user_first_name", "email_address", "created_at" with each on its own line, the camelCase output will show "userFirstName", "emailAddress", "createdAt" — one per line. This is useful when renaming a batch of variables, converting a list of API field names between conventions, or reformatting a set of CSS class names. Pin your most-used case formats to the top of the grid using the ⊹ button for faster access.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Text Case Converter',
  url: 'https://webdevpuneet.com/text-case-converter/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online text case converter. Convert to 14 formats simultaneously — camelCase, PascalCase, snake_case, SCREAMING_SNAKE, kebab-case, COBOL-CASE, Train-Case, dot.case, Title Case, Sentence case, UPPER, lower, alternating, and inverse.',
  featureList: [
    '14 case formats shown simultaneously',
    'camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE',
    'kebab-case, COBOL-CASE, Train-Case, dot.case',
    'UPPER CASE, lower case, Title Case, Sentence case',
    'Alternating case, Inverse case',
    'Detects and splits camelCase/PascalCase input automatically',
    'Multi-line support — each line converted independently',
    'Pin favourite cases to top of grid',
    'Apply any conversion back to input for chaining',
    '100% browser-based — no server, works offline',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Text Case Converter', item: 'https://webdevpuneet.com/text-case-converter/' },
  ],
};

const SEO = {
  slug: 'text-case-converter',
  title: 'Text Case Converter — camelCase, snake_case, PascalCase, kebab-case & 14 Formats',

  about: {
    title: 'Text Case Converter — Free, Convert to camelCase, snake_case, PascalCase, kebab-case & 14 More Formats',
    description: 'Paste your text once and instantly see all 14 case conversions side by side — no switching between tools, no separate buttons, no waiting. Every format updates live as you type, computed by a single React `useMemo` that re-runs all 14 conversion functions on each keystroke.\n\nThis tool covers every naming convention you will encounter in software development and content writing: **camelCase** for JavaScript variables and functions, **PascalCase** for React components and TypeScript types, **snake_case** for Python and database columns, **SCREAMING_SNAKE_CASE** for constants and environment variables, **kebab-case** for CSS classes and URL slugs, **COBOL-CASE** for HTTP headers and legacy systems, **Train-Case**, **dot.case** for package namespaces and config keys, **Title Case**, **Sentence case**, **UPPER CASE**, **lower case**, **alternating case**, and **inverse case**.\n\nThe converter is smart about its input because it first normalizes everything into a plain array of words before re-assembling each target format. A shared `toWords()` step splits on camelCase letter-case transitions (so `getUserProfileData` becomes `get`, `User`, `Profile`, `Data`), separates runs of capitals from a trailing capitalized word (so `ABCDef` splits into `ABC` and `Def`), and also breaks on hyphens, underscores, dots, and slashes. Because every format is built from this same normalized word list, pasting from any source format produces accurate output in every target format, unlike converters that only handle one direction.\n\n**Multi-line input** is preserved: the tool maps each line through the conversion function independently, so pasting a list of 20 database column names, one per line, returns all 14 case variants for all 20 names at once, with line breaks intact rather than collapsed into one block.\n\nTitle Case and Sentence case work differently from the rest — they use regular-expression word and sentence boundaries rather than the word-splitting pipeline, since they need to preserve existing spacing. Alternating case and inverse case operate character-by-character, toggling capitalization as they scan the string rather than reassembling words.\n\n**Pin** your most-used cases to the top of the grid so they stay within reach, even after filtering. Use the **↑ Apply** button to feed any converted output back into the input field, which lets you chain conversions — for example, running camelCase first to cleanly re-split a messy string before converting it to snake_case. Everything runs client-side in your browser via the Clipboard API — no server processing, no data sent anywhere, and it keeps working offline.',
  },

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Type or paste your text into the input field',
        text: 'Type or paste any text into the large input field at the top of the page. All 14 case conversions appear instantly in the card grid below as you type — no button press required. Click **Paste** to pull text directly from your clipboard, **Sample** to load example text and explore the tool, or **Clear** to reset the input. The word and character count update live in the header.',
      },
      {
        title: 'Browse the conversion results grid',
        text: 'Each card in the grid shows the case format label (e.g., camelCase, snake_case), its colour-coded identifier, the converted output for your text, and a small example to confirm the expected format. All 14 formats — camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, kebab-case, COBOL-CASE, Train-Case, dot.case, Title Case, Sentence case, UPPER CASE, lower case, alternating case, and inverse case — are shown simultaneously so you can compare them at a glance.',
      },
      {
        title: 'Copy any format with one click',
        text: 'Click the **Copy** button on any case card to copy that format\'s output to your clipboard. The button briefly shows a checkmark to confirm the copy. You can copy multiple different formats in sequence — each click copies that card\'s output independently.',
      },
      {
        title: 'Filter to find a specific case quickly',
        text: 'Use the **Filter cases** search input in the toolbar to narrow the grid by name. Type "snake" to show only snake-related formats, "camel" to find camelCase and related formats, or "title" to find title and train case. The grid filters in real time as you type.',
      },
      {
        title: 'Pin, apply, and chain conversions',
        text: 'Click **⊹** on any card to pin it to the top of the grid — useful when you always need camelCase or snake_case within reach. Click **↑** (Apply) to feed that card\'s output back into the input field for further transformation — for example, apply camelCase first to split the input cleanly, then apply snake_case to the result. This chaining approach handles complex mixed-format input that a single conversion might not parse perfectly.',
      },
    ],
  },

  features: [
    'All 14 case formats shown simultaneously — paste once and see every conversion without switching between tools or clicking separate buttons',
    'camelCase — splits on spaces, hyphens, underscores, dots, and existing camelCase/PascalCase boundaries; used in JavaScript, TypeScript, Java, Swift, and Dart',
    'PascalCase — same splitting logic as camelCase but capitalizes the first word; used for class names, React components, and TypeScript interfaces',
    'snake_case and SCREAMING_SNAKE_CASE — underscore-separated lowercase and uppercase; used in Python, Ruby, Rust, SQL, and environment variables',
    'kebab-case and COBOL-CASE — hyphen-separated lowercase and uppercase; used in CSS, URLs, npm packages, and HTTP header names',
    'Train-Case, dot.case — capitalised-hyphen and dot-separated formats for HTTP headers, package namespaces, and config keys',
    'Title Case and Sentence case — for headings, article titles, UI labels, and properly capitalised prose',
    'UPPER CASE, lower case, alternating case, inverse case — utility transformations for content editing and creative text effects',
    'Smart input splitting — automatically detects and splits camelCase and PascalCase input so conversions are correct when pasting existing code identifiers',
    'Multi-line support — converts each line independently; paste a batch of variable names and get all 14 formats for the entire list at once',
    'Pin cases to top — ⊹ pin your most-used formats so they appear first in the grid on every visit',
    'Apply back to input — ↑ button feeds any converted output back into the input for chaining transformations',
  ],

  useCases: [
    {
      icon: '💻',
      title: 'Convert variable and function names between programming languages',
      desc: 'When porting code between Python (snake_case) and JavaScript (camelCase), paste your Python function names here and copy the camelCase output. When creating a TypeScript interface from a Python dataclass, paste the snake_case field names and copy PascalCase for the type and camelCase for the fields. When writing Go code that calls a REST API with snake_case JSON keys, convert the names to Go\'s PascalCase exported struct fields. Use the multi-line input to convert a whole list of identifiers at once — paste 20 column names, get all 20 in camelCase in one copy.',
    },
    {
      icon: '🗄',
      title: 'Convert database column names to code variable names',
      desc: 'Database column names follow snake_case convention (user_first_name, created_at, is_active). Paste a list of your schema column names here and copy the camelCase output for JavaScript ORM models, the PascalCase for C# entity classes, or SCREAMING_SNAKE_CASE for SQL constants and migration scripts. This eliminates the tedious manual renaming that causes typos when wiring up a new database table to a frontend. Combine with our [JSON to TypeScript](/json-to-typescript) converter to generate full TypeScript interfaces from API responses.',
    },
    {
      icon: '🎨',
      title: 'Generate CSS class names and design token names',
      desc: 'Design tokens and CSS custom properties use kebab-case (--color-primary-500, .flex-center, .btn-outline-danger). Paste your token names from a Figma file or design brief and copy the kebab-case output directly into your stylesheet. For Tailwind CSS arbitrary values and component class names, kebab-case is the standard. Convert the same names to camelCase for JavaScript object keys in a design token JS file, or to SCREAMING_SNAKE_CASE for Sass variable names ($COLOR_PRIMARY_500).',
    },
    {
      icon: '📝',
      title: 'Convert headings and article titles to Title Case',
      desc: 'Blog post titles, article headings, email subject lines, and page meta titles conventionally use Title Case. Paste your draft heading in any format and copy the Title Case output. This is especially useful when importing content from a document or database where capitalisation is inconsistent. Run each H1 and H2 heading through the converter to ensure consistent capitalisation across your site. Combine with [Word Counter](/word-counter) to check heading length and readability, and [Meta Tag Generator](https://webdevpuneet.com/meta-tag-generator/) to write the page title and description.',
    },
    {
      icon: '🔧',
      title: 'Format environment variables and config keys as SCREAMING_SNAKE_CASE',
      desc: 'Environment variables in .env files, Docker compose, Kubernetes secrets, CI/CD pipelines, and shell scripts always use SCREAMING_SNAKE_CASE. Paste your config key names here and copy the SCREAMING_SNAKE_CASE output directly into your .env file or configuration YAML. When a developer writes a new feature and needs to name five new environment variables, this converter produces all five formatted correctly in one paste. Combine with the ↑ Apply button to chain — convert to camelCase first to clean up the input, then apply that output and copy the SCREAMING_SNAKE_CASE result.',
    },
    {
      icon: '🌐',
      title: 'Convert page titles and content to URL-friendly kebab-case slugs',
      desc: 'URL slugs must be lowercase, hyphen-separated, and free of special characters. Paste a blog post title like "Building a REST API with Node.js and Express" and copy the kebab-case output: "building-a-rest-api-with-node-js-and-express". This is ready to use as the URL path, file name, or route parameter. For static site generators (Jekyll, Hugo, Gatsby, Next.js), file names follow the same kebab-case convention. Use [Lorem Ipsum Generator](/lorem-ipsum-generator) to generate sample slugs for testing routing logic.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function TextCaseConverterPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><TextCaseConverter /></div>
      <IndexOnly><AdSlot />
      <SeoSection heading="Free Text Case Converter — camelCase, snake_case, PascalCase, kebab-case & 14 Formats" {...SEO} /></IndexOnly>

    </div>
  );
}
