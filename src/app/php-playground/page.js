import PhpPlaygroundTool from '@/components/PhpPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'PHP Playground — Learn PHP Visually, 60 Lessons Free | webdevpuneet.com',
  description: 'Learn PHP online without setup — syntax, forms, arrays, OOP, PDO/MySQL, JSON APIs, and Laravel basics in a browser-safe simulator. Free, no signup.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/php-playground/' },
  icons: { icon: '/icons/php-playground.svg', shortcut: '/icons/php-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/php-playground/',
    siteName: 'webdevpuneet.com',
    title: 'PHP Playground - Learn PHP Online with 60 Interactive Lessons',
    description: 'Practice PHP syntax, forms, validation, JSON APIs, OOP, PDO/MySQL, Composer, PHPUnit, Laravel basics, deployment, and security in a browser-safe simulator.',
    images: [{ url: 'https://webdevpuneet.com/images/php-playground.png', width: 1200, height: 630, alt: 'PHP Playground - Interactive PHP Lessons' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'PHP Playground - Learn PHP Online',
    description: 'Browser-based PHP playground with guided lessons from syntax and variables through forms, validation, OOP, MySQL, JSON APIs, Composer, PHPUnit, Laravel basics, and security.',
    images: ['https://webdevpuneet.com/images/php-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Do I need to install PHP?', acceptedAnswer: { '@type': 'Answer', text: 'No. The PHP Playground uses a browser-safe simulator for common tutorial examples, so you can learn syntax and flow without installing PHP, Apache, Nginx, XAMPP, or a database.' } },
    { '@type': 'Question', name: 'Does this run real PHP?', acceptedAnswer: { '@type': 'Answer', text: 'No. It simulates common PHP lesson output in JavaScript. Use a real PHP runtime for production code, filesystem access, databases, and full framework development.' } },
    { '@type': 'Question', name: 'Is this PHP tutorial good for beginners?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. It starts with PHP tags, syntax, comments, variables, echo, data types, strings, numbers, conditionals, loops, functions, and arrays before moving to forms, validation, files, sessions, OOP, security, testing, framework basics, deployment, and database patterns.' } },
    { '@type': 'Question', name: 'Does it cover PHP forms and validation?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Lessons cover superglobals, GET and POST, validating input, sanitizing output with htmlspecialchars, filters, and a contact form handler mini-project.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PHP Playground',
  url: 'https://webdevpuneet.com/php-playground/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free interactive PHP playground with 60 guided lessons and a browser-safe simulator for learning PHP syntax, forms, OOP, JSON APIs, database patterns, testing, framework basics, deployment, and security.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
  featureList: [
    '60 guided PHP lessons from beginner syntax to professional backend patterns — pair with the [SQL playground](/sql-playground) for the database side',
    'Browser-safe PHP output simulator',
    'Editable PHP examples with instant simulated output',
    'Covers PHP tags, variables, echo, data types, strings, numbers, operators, conditionals, loops, functions, arrays, forms, validation, files, sessions, JSON, exceptions, OOP, namespaces, iterables, PDO/MySQL, regex, AJAX/API responses, Composer, security, testing, framework basics, and deployment',
    'Progress tracking via localStorage',
    'Share PHP snippets via URL',
    'No PHP install, no server, no database required',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Learn to Code', item: 'https://webdevpuneet.com/learn-to-code/' },
    { '@type': 'ListItem', position: 3, name: 'PHP Playground', item: 'https://webdevpuneet.com/php-playground/' },
  ],
};

const seoData = {
  slug: 'php-playground',
  title: 'PHP Playground - Learn PHP Online Without Installing a Server',
  subtitle: 'A free browser-based PHP tutorial and practice workspace with 60 lessons for syntax, forms, validation, arrays, OOP, JSON APIs, PDO/MySQL, Composer, PHPUnit, Laravel basics, deployment, and security.',
  about: {
    title: 'Learn PHP Online with a Safe PHP Playground',
    description: `PHP is still one of the most common backend languages for websites, WordPress, forms, dashboards, APIs, ecommerce, and server-rendered pages. But installing PHP, configuring a local server, and connecting a database can slow down beginners who simply want to understand syntax and backend flow. This PHP Playground removes that setup barrier.

The playground gives you a PHP-style editor on the left and simulated output on the right. It is designed for learning, not production execution: examples model common PHP tutorial behavior in the browser, so you can understand variables, echo, strings, arrays, loops, functions, forms, validation, sessions, files, JSON, errors, OOP, PDO/MySQL patterns, regex, API responses, Composer, security, testing, framework structure, and deployment without running a real server.

Use it when your search intent is practical: "learn PHP online", "PHP playground", "PHP practice online", "PHP code editor online", "PHP tutorial for beginners", "PHP forms tutorial", "PHP OOP tutorial", "PHP MySQL tutorial", "PHP JSON API tutorial", or "PHP security basics". The lessons are arranged so beginners can start at the first chapter and experienced developers can jump directly to forms, OOP, PDO, testing, Composer, or deployment topics.

Start with PHP tags, comments, variables, echo and print, data types, strings, numbers, casting, constants, operators, if/else, switch, while, for, and foreach. Then move into functions, typed parameters, arrow functions, indexed arrays, associative arrays, and array helpers. These lessons answer beginner searches like "learn PHP online", "PHP variables tutorial", "PHP echo example", "PHP arrays tutorial", and "PHP functions practice".

The form and request chapters focus on high-intent web development skills: superglobals, GET vs POST, form validation, filters, and output escaping with htmlspecialchars. These are the topics learners need before building contact forms, login forms, admin tools, and APIs.

The advanced and pro chapters introduce practical backend concepts: file reads/writes, cookies, sessions, JSON, exceptions, classes, inheritance, interfaces, traits, namespaces, iterables, strict types, password hashing, CSRF protection, secure file uploads, enums, attributes, readonly properties, Composer autoloading, dependency injection, PDO/MySQL transactions, PHPUnit testing, error logging, framework basics, deployment, and secure coding habits.

If you are preparing for WordPress, Laravel, Symfony, freelance website work, backend interviews, or a PHP refresher after learning JavaScript, this page gives you a compact map of the language. It does not replace a real PHP runtime, but it is useful before installing PHP locally because it teaches the mental model: request comes in, PHP reads input, validates data, runs server logic, talks to files or databases, and sends HTML or JSON back.

The lesson path is inspired by common PHP tutorial structures, including the W3Schools PHP tutorial, but the content and browser simulator are original to webdevpuneet.com. Use it as a PHP tutorial for beginners, a PHP code practice tool, or a quick refresher before moving into real PHP, WordPress, Laravel, Symfony, or backend API work.`,
  },
  features: [
    '60 guided PHP lessons from beginner syntax to professional backend patterns',
    'Search-intent focused curriculum for PHP beginners, PHP forms, PHP OOP, PHP MySQL/PDO, PHP APIs, PHP security, Laravel basics, and WordPress PHP foundations',
    'Editable PHP code editor with instant simulated output',
    'Beginner topics: PHP tags, comments, variables, echo/print, data types, strings, numbers, casting, constants, operators, conditionals, loops, functions, and arrays',
    'Forms and requests: superglobals, GET, POST, validation, sanitization, filters, and contact form handling',
    'Files and state: dates, file read/write examples, cookies, and sessions',
    'Data and errors: JSON encoding/decoding, filters, exceptions, regex, and API-style responses',
    'Object-oriented PHP: classes, constructors, methods, inheritance, interfaces, traits, namespaces, iterables, abstract classes, enums, attributes, and readonly properties',
    'Backend patterns: PDO/MySQL prepared statements, transactions, Composer autoloading, dependency injection, PHPUnit, logging, framework structure, deployment, and secure coding habits',
    'Mini projects for contact form handling and JSON API output',
    'Progress saved locally in the browser',
    'Share and download PHP snippets',
    'No PHP install, no local server, no database required for the learning simulator',
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Start with PHP syntax', text: 'Begin with Hello PHP, PHP tags, comments, variables, echo, data types, strings, and numbers. These lessons teach how PHP code is written and how output is produced.' },
      { title: 'Edit the PHP examples', text: 'Change strings, variable names, numbers, arrays, and conditions. The simulated output updates so you can connect code with result.' },
      { title: 'Practice forms and validation', text: 'Move into superglobals, GET/POST, validation, sanitization, and filters before building real user-facing forms.' },
      { title: 'Learn OOP and backend patterns', text: 'Use the OOP, advanced, and pro chapters to understand classes, interfaces, namespaces, PDO/MySQL patterns, JSON responses, Composer autoloading, dependency injection, PHPUnit, framework structure, deployment, and secure coding habits.' },
      { title: 'Use it as a PHP roadmap', text: 'Jump to the exact search intent you came with: PHP arrays, PHP functions, PHP form validation, PHP sessions, PHP JSON APIs, PHP OOP, PHP PDO, Composer autoloading, Laravel basics, or PHP deployment.' },
      { title: 'Mark lessons done', text: 'Track your progress locally in the browser and return later to continue the PHP curriculum.' },
    ],
  },
  useCases: [
    { icon: 'PHP', title: 'Learn PHP online as a beginner', desc: 'Start with syntax, variables, echo, strings, arrays, loops, and functions without installing PHP or configuring a local server. Planning to store data too? Learn queries alongside in the [SQL playground](/sql-playground).' },
    { icon: 'FORM', title: 'Understand PHP forms and validation', desc: 'Practice GET, POST, superglobals, filters, required fields, email validation, and safe output before building a real contact form.' },
    { icon: 'API', title: 'Prepare for PHP APIs and AJAX', desc: 'Learn how PHP returns JSON, validates request data, and structures API-style responses for JavaScript clients. Test those endpoints with the [API request tester](https://fwdtools.com/api-request-generator-tester) and validate payloads in the [JSON formatter](https://fwdtools.com/json-formatter).' },
    { icon: 'OOP', title: 'Move into object-oriented PHP', desc: 'Practice classes, constructors, methods, inheritance, interfaces, traits, namespaces, and iterables before opening a full framework.' },
    { icon: 'DB', title: 'Understand PHP and MySQL patterns', desc: 'Use the PDO/MySQL lessons to understand prepared statements, transactions, CRUD flow, and why user input must be separated from SQL.' },
    { icon: 'PRO', title: 'Prepare for professional PHP work', desc: 'Study strict types, password hashing, CSRF, uploads, enums, Composer autoloading, dependency injection, PHPUnit, framework basics, and deployment.' },
    { icon: 'CMS', title: 'Prepare for WordPress PHP', desc: 'Learn the core PHP syntax, arrays, functions, forms, sanitization, escaping, and request handling patterns that appear in WordPress themes and plugins.' },
    { icon: 'APP', title: 'Prepare for Laravel and Symfony', desc: 'Build the foundation for routes, controllers, services, validation, dependency injection, Composer, environment variables, testing, and deployment.' },
    { icon: 'STAR', title: 'Refresh PHP before an interview', desc: 'Review the language quickly with grouped lessons for syntax, arrays, OOP, errors, security, databases, testing, and backend architecture.' },
  ],
  faqs: [
    { q: 'Do I need to install PHP?', a: 'No. This playground uses a browser-safe PHP simulator for learning syntax and common examples. You do not need PHP, XAMPP, MAMP, Apache, Nginx, or MySQL to start.' },
    { q: 'Does this execute real PHP?', a: 'No. It simulates common PHP tutorial output in JavaScript. Real PHP code should be run on a PHP runtime for production, filesystem access, database access, and framework development.' },
    { q: 'Is this good for absolute beginners?', a: 'Yes. It starts with PHP tags, syntax, comments, variables, echo/print, types, strings, numbers, operators, if/else, loops, functions, and arrays.' },
    { q: 'Is this a PHP online compiler?', a: 'It behaves like a PHP practice editor with simulated output, but it is not a real PHP compiler or runtime. That makes it safe and fast for lessons, but production PHP should still be tested in a real runtime.' },
    { q: 'Does it teach PHP forms?', a: 'Yes. It covers superglobals, GET and POST, validation, sanitization, filters, and a contact form handler mini-project.' },
    { q: 'Does it teach PHP OOP?', a: 'Yes. Lessons cover classes, constructors, methods, inheritance, interfaces, traits, namespaces, iterables, abstract classes, final classes, static methods, enums, attributes, and readonly properties.' },
    { q: 'Does it cover PHP and MySQL?', a: 'It covers PDO/MySQL prepared statement flow and transaction concepts as safe conceptual lessons. It does not connect to a real database in the browser.' },
    { q: 'Does it include professional PHP topics?', a: 'Yes. The pro chapters cover include/require, scope, strict types, password hashing, CSRF, secure uploads, Composer autoloading, dependency injection, PDO transactions, PHPUnit, logging, framework basics, and deployment.' },
    { q: 'Can I use this before learning Laravel?', a: 'Yes. Laravel is easier when you already understand PHP syntax, arrays, functions, classes, namespaces, Composer autoloading, validation, requests, services, databases, and environment variables.' },
    { q: 'Can I use this for WordPress PHP basics?', a: 'Yes. WordPress development relies heavily on PHP arrays, functions, templates, sanitization, escaping, hooks, forms, and request handling. This playground covers the core PHP foundation before WordPress-specific APIs.' },
    { q: 'What should I learn after this PHP Playground?', a: 'Install PHP locally, run code with the PHP CLI or a local server, connect to a real database, build a small CRUD app, add authentication, write PHPUnit tests, and then move into Laravel, Symfony, WordPress, or API development.' },
    { q: 'Can I use it as a PHP cheat sheet?', a: 'Yes. Lessons are grouped by syntax, strings/numbers, logic, loops, functions, arrays, forms, files/state, data/errors, OOP, advanced PHP, pro foundations, security, advanced OOP, architecture, databases, testing, frameworks, and mini projects.' },
  ],
  links: [
    { label: 'HTML Playground', href: '/html-playground/', desc: 'Learn the markup layer that PHP often renders on the server.' },
    { label: 'JavaScript Playground', href: '/js-playground/', desc: 'Learn browser interactivity for PHP-rendered pages and AJAX calls.' },
    { label: 'SQL Playground', href: '/sql-playground/', desc: 'Learn database querying before connecting PHP to MySQL or PostgreSQL.' },
    { label: 'Git Playground', href: '/git-playground/', desc: 'Learn version control for PHP projects and backend workflows.' },
    { label: 'PHP tutorial reference', href: 'https://www.w3schools.com/php/default.asp', desc: 'External PHP tutorial path used as a topic reference.' },
  ],
};

export default function PhpPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <PhpPlaygroundTool />
      </div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
