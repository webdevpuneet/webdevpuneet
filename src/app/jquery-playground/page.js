import JqueryPlaygroundTool from '@/components/JqueryPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/jquery-playground.png';

export const metadata = {
  title: 'jQuery Playground — Learn jQuery Visually, 72 Lessons Free | webdevpuneet.com',
  description: 'Learn jQuery online with 72 hands-on lessons — selectors, events, animations, DOM, AJAX, and plugins. Live preview and progress tracking, free, no install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/jquery-playground/' },
  icons: { icon: '/icons/jquery-playground.svg', shortcut: '/icons/jquery-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/jquery-playground/',
    siteName: 'webdevpuneet.com',
    title: 'jQuery Playground — 72 Interactive Lessons, Live Preview',
    description: 'Learn jQuery with 72 hands-on lessons: selectors, events, animations, DOM manipulation, traversing, AJAX, utilities, promises, and plugins. Live preview, progress tracking, no sign-up.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'jQuery Playground Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'jQuery Playground — 72 Interactive Lessons',
    description: 'Learn jQuery with 72 step-by-step lessons. Live preview, syntax highlighting, progress tracking — all in the browser.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How many lessons are in the jQuery Playground?', acceptedAnswer: { '@type': 'Answer', text: 'There are 72 lessons organized into 16 chapters: Getting Started, Selectors, Events, Hide & Show, Fading, Sliding, Animation, Chaining, DOM Get & Set, DOM Add & Remove, CSS Manipulation, Traversing, AJAX, Utilities, Deferred & Promises, and Plugin Basics. Every lesson has a working code example you can edit live.' } },
    { '@type': 'Question', name: 'Does this jQuery playground run code on a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All code runs locally in a sandboxed iframe in your browser. Nothing is sent to a server. The only external requests are fetching the jQuery library from jsDelivr CDN and, in the AJAX lessons, calls to JSONPlaceholder — a free public REST API used for demonstration.' } },
    { '@type': 'Question', name: 'Is my progress saved between sessions?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completed lessons and your last open lesson position are saved to localStorage in your browser. When you return to the playground, it reopens at the lesson you were on and shows your completed lessons in the sidebar.' } },
    { '@type': 'Question', name: 'Which jQuery version does the playground use?', acceptedAnswer: { '@type': 'Answer', text: 'Every lesson uses jQuery 3.7.1 loaded from the jsDelivr CDN. It is included in the iframe before your code runs, so you can use $() and jQuery() immediately without any import or setup.' } },
    { '@type': 'Question', name: 'Can I make AJAX requests from the playground?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The AJAX chapter (5 lessons) covers $.get(), $.post(), $.ajax(), $.getJSON(), and .load(). All live examples hit JSONPlaceholder — a free public REST API — so the requests work immediately with no backend needed.' } },
    { '@type': 'Question', name: 'How do I see console.log output?', acceptedAnswer: { '@type': 'Answer', text: 'Click the Console button in the preview pane header. The console panel captures all console.log, console.warn, and console.error calls from inside the iframe. JavaScript errors with line numbers also appear there automatically.' } },
    { '@type': 'Question', name: 'What are the Quick Check challenges?', acceptedAnswer: { '@type': 'Answer', text: '9 of the 46 lessons include a multiple-choice Quick Check question below the editor. Select an answer and the correct option is highlighted immediately. You can retry as many times as you like. Challenges are not required to mark a lesson as done.' } },
    { '@type': 'Question', name: 'Can I add external libraries like jQuery UI?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Add a <script src="..."> CDN tag inside the lesson code to load jQuery UI, jQuery Easing, Bootstrap, or any other library. Because the iframe allows scripts, external CDN resources load normally.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'jQuery Playground',
  url: 'https://webdevpuneet.com/jquery-playground/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based jQuery learning playground with 72 structured lessons, live preview, syntax highlighting, progress tracking, console output, and quick-check challenges — no install or sign-up required.',
  featureList: [
    '72 lessons across 16 chapters — full jQuery curriculum from Getting Started to Plugin Basics; for modern vanilla patterns, continue to the [JavaScript playground](/js-playground)',
    'jQuery 3.7.1 pre-loaded in every lesson preview',
    'Live preview with 400ms debounce after typing',
    'Syntax highlighting for HTML tags, $ symbol, and JavaScript keywords',
    'Console panel for log/warn/error from inside the iframe',
    'Progress tracking saved to localStorage',
    'Confetti on chapter completion',
    '9 quick-check multiple-choice challenges',
    'Ctrl+Enter for immediate preview refresh',
    'Download code as a .html file',
    'Share link via URL parameter',
    'Resizable editor/preview split with drag handle',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'jQuery Playground', item: 'https://webdevpuneet.com/jquery-playground/' },
  ],
};

const SEO = {
  slug: 'jquery-playground',
  title: 'Learn jQuery Online — 72 Interactive Lessons with Live Preview',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Pick a lesson from the sidebar', text: 'The sidebar lists all 72 lessons grouped into 16 chapters — Getting Started, Selectors, Events, Hide & Show, Fading, Sliding, Animation, Chaining, DOM Get & Set, DOM Add & Remove, CSS Manipulation, Traversing, AJAX, Utilities, Deferred & Promises, and Plugin Basics. Click any lesson to load it.' },
      { title: 'Read the concept panel', text: 'Each lesson opens with a concept explanation at the top. It describes the jQuery method or pattern covered, including code examples inline. Collapse it once you understand the concept to give the editor more space.' },
      { title: 'Edit the code and see the live preview', text: 'The editor on the left contains working HTML and jQuery code for the lesson. The preview on the right updates automatically 400ms after you stop typing. jQuery 3.7.1 is loaded in every preview — no import needed, just use $().' },
      { title: 'Open the console for output', text: 'Click the Console button on the preview pane to see console.log, console.warn, and console.error output from your code. JavaScript errors appear there automatically with the line number.' },
      { title: 'Answer the Quick Check challenge', text: 'Some lessons include a multiple-choice Quick Check question below the editor. Select the answer you think is correct — the correct answer is highlighted immediately, with an option to try again.' },
      { title: 'Mark the lesson done and move on', text: 'Click "Mark Done →" in the nav footer to record your progress. The progress bar in the sidebar updates. Completing all lessons in a chapter triggers a confetti celebration. Use Previous and Next to navigate between lessons.' },
      { title: 'Use Ctrl+Enter to re-run code', text: 'Press Ctrl+Enter (or Cmd+Enter on Mac) to force an immediate preview rebuild without waiting for the debounce. Use the Refresh button in the preview header for the same effect.' },
      { title: 'Download or share your code', text: 'Click .html to download the current lesson code as a standalone HTML file with jQuery included. The share link (via URL parameter) lets you send your modified code to someone else.' },
    ],
  },
  about: {
    title: 'Learn jQuery Step by Step with 72 Hands-On Lessons',
    description: `jQuery is still one of the most widely deployed JavaScript libraries on the web. Millions of websites built over the past decade use jQuery for DOM manipulation, event handling, AJAX requests, and animation. Whether you are learning web development for the first time, maintaining a legacy codebase, or brushing up on selectors and traversal before a job interview, the jQuery Playground gives you a structured path through the entire library — with live, editable examples at every step.

The playground is organized into **16 chapters** covering the full jQuery curriculum: Getting Started, Selectors, Events, Hide & Show, Fading, Sliding, Animation, Chaining, DOM Get & Set, DOM Add & Remove, CSS Manipulation, Traversing, AJAX, Utilities, Deferred & Promises, and Plugin Basics. Each chapter contains between 1 and 7 lessons, for a total of **72 lessons**. Every lesson includes a concept explanation, a working code example you can edit immediately, and a live preview that rebuilds automatically as you type.

The editor handles mixed HTML and JavaScript code the way jQuery code naturally looks — HTML markup at the top of the file, jQuery logic inside a \`<script>\` tag below. The syntax highlighter colors HTML tags, attributes, strings, jQuery's \`$\` symbol, and JavaScript keywords separately. Line numbers stay in sync with scrolling. Error messages from uncaught exceptions appear in the editor's error bar and in the console panel.

Each lesson's preview runs in a sandboxed iframe with jQuery 3.7.1 loaded from the jsDelivr CDN. The iframe is rebuilt on every code change (debounced at 400ms), so you always see a fresh execution — no stale state from a previous run. The console panel captures \`console.log\`, \`console.warn\`, and \`console.error\` from inside the iframe and displays them in the parent, so you do not need to open browser DevTools to see output.

Progress is saved automatically to \`localStorage\`. Your completed lessons persist across sessions. The progress bar in the sidebar shows how far through the curriculum you are. Completing every lesson in a chapter triggers a confetti animation. You can reset progress from any lesson forward using the Mark Done button toggle.

The AJAX chapter (seven lessons) covers \`$.get()\`, \`$.post()\`, \`$.ajax()\`, \`$.getJSON()\`, \`.load()\`, \`$.ajaxSetup()\`, and global AJAX events. All live examples use JSONPlaceholder — a free public REST API — so the AJAX calls work immediately without needing a backend.

The **Utilities chapter** introduces five helper functions that every jQuery developer encounters: \`$.each()\` for iterating arrays and objects, \`$.map()\` for transforming collections, \`$.grep()\` for filtering arrays, \`$.extend()\` for merging options objects, and \`$.type()\` for reliable type detection that handles null and arrays correctly unlike \`typeof\`.

The **Deferred & Promises chapter** covers jQuery's async programming model: creating a \`$.Deferred()\`, resolving and rejecting it, attaching \`.done()\`, \`.fail()\`, and \`.always()\` handlers, coordinating parallel operations with \`$.when()\`, and chaining sequential async steps with \`.then()\`. These patterns underpin jQuery's AJAX methods and appear throughout older codebases.

The **Plugin Basics chapter** teaches you to extend jQuery itself. You will write a plugin using the \`$.fn\` pattern, wrap it in an IIFE to protect the \`$\` alias, return \`this\` to keep chains alive, and add a method-dispatch pattern with per-element state stored via \`$.data()\`. The quick-check challenges appear on 13 of the 72 lessons and test your understanding of the method just covered.`,
  },
  features: [
    '72 lessons across 16 chapters — full jQuery curriculum from Getting Started to Plugin Basics',
    'Live preview rebuilds automatically 400ms after typing stops',
    'jQuery 3.7.1 pre-loaded in every lesson — no import needed',
    'Syntax highlighting for HTML tags, attributes, $ symbol, and JavaScript keywords',
    'Console panel captures log, warn, error from inside the iframe',
    'Progress tracking saved to localStorage — persists across sessions',
    'Confetti on chapter completion',
    '9 quick-check multiple-choice challenges embedded in lessons',
    'Ctrl+Enter for immediate preview refresh',
    'Download lesson code as a standalone .html file',
    'Share link via URL parameter to send modified code to others',
    'Drag handle to resize editor/preview split',
    'Runs entirely in the browser — no install, no sign-up',
  ],
  useCases: [
    { icon: '⚡', title: 'Learn jQuery from scratch', desc: 'Work through all 72 lessons in order to build a complete mental model of jQuery — from basic document-ready to promises, utilities, and writing your own plugins. New to JavaScript itself? Start with the [JavaScript playground](/js-playground) first.' },
    { icon: '⬚', title: 'Prep for a jQuery interview', desc: 'Jump directly to the chapter you need to review. The selector, event delegation, DOM manipulation, and traversal chapters cover the questions that come up most often.' },
    { icon: '⇄', title: 'Understand AJAX with jQuery', desc: 'The AJAX chapter walks through $.get(), $.post(), $.ajax(), $.getJSON(), .load(), $.ajaxSetup(), and global AJAX events with live examples hitting a real public API. Test your own endpoints with the [API request tester](https://fwdtools.com/api-request-generator-tester) or mock them with the [API mock generator](https://fwdtools.com/api-mock-generator).' },
    { icon: '▹', title: 'Maintain legacy jQuery codebases', desc: 'Use the playground to quickly prototype a fix, test a selector, or verify how .on() event delegation behaves before editing production code.' },
    { icon: '◈', title: 'Teach jQuery in workshops', desc: 'Share lesson URLs with students so everyone starts from the same code. Progress is local to each browser, so students can work at their own pace.' },
    { icon: '◇', title: 'Reference effects and animation API', desc: 'The Fading, Sliding, and Animation chapters serve as runnable documentation — see exactly what .fadeToggle(), .slideUp(), and .animate() do with real output.' },
  ],
  faqs: faqSchema.mainEntity.map(item => ({ q: item.name, a: item.acceptedAnswer.text })),
  links: [
    { href: 'https://fwdtools.com/regex-tester/', label: 'Regex Tester - test JavaScript regular expressions live' },
    { href: 'https://fwdtools.com/json-formatter/', label: 'JSON Formatter - format and validate JSON from API responses' },
    { href: 'https://fwdtools.com/diff-checker/', label: 'Diff Checker - compare two code snippets side by side' },
    { href: 'https://fwdtools.com/api-request-generator-tester/', label: 'API Request Tester - test GET, POST, PUT and DELETE requests' },
  ],
};

export default function JqueryPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><JqueryPlaygroundTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
