import JsPlaygroundTool from '@/components/JsPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'JavaScript Playground — Learn JavaScript Visually, 60 Lessons Free | webdevpuneet.com',
  description: 'Learn JavaScript online with 60 hands-on lessons — variables, functions, arrays, DOM, async/await, and classes. Live editor and console, free, no install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/js-playground/' },
  icons: { icon: '/icons/js-playground.svg', shortcut: '/icons/js-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/js-playground/',
    siteName: 'webdevpuneet.com',
    title: 'JavaScript Playground — Learn JS with 60 Interactive Lessons, Live Preview',
    description: 'Learn JavaScript in the browser with 60 hands-on lessons — variables, DOM, events, async/await, fetch, closures, classes, Canvas, Web Workers, and more. No install needed.',
    images: [{ url: 'https://webdevpuneet.com/images/learn-to-code.png', width: 1200, height: 630, alt: 'JavaScript Playground — 60 Interactive Lessons' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'JavaScript Playground — Learn JS with 60 Interactive Lessons',
    description: 'From variables to Web Workers — 60 guided JS lessons with live preview, clickable DOM examples, console output, and progress tracking. Free, no install.',
    images: ['https://webdevpuneet.com/images/learn-to-code.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Do I need to install Node.js to use the JavaScript Playground?', acceptedAnswer: { '@type': 'Answer', text: 'No. The JavaScript Playground runs entirely in your browser. You can edit JavaScript, render DOM examples, inspect console output, and save progress without installing Node.js, npm, VS Code, or a local project.' } },
    { '@type': 'Question', name: 'Is this JavaScript Playground good for beginners?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The first chapters start with variables, types, operators, conditions, loops, functions, arrays, and objects — with visible output after every edit. Later chapters build toward DOM manipulation, events, async code, browser APIs, performance, security, testing, and mini projects.' } },
    { '@type': 'Question', name: 'Does the preview support clickable DOM examples?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. DOM and event lessons render real buttons, inputs, forms, and lists inside a sandboxed preview iframe. You can click, type, submit forms, and inspect console output while editing the JavaScript.' } },
    { '@type': 'Question', name: 'What helper functions are available in lessons?', acceptedAnswer: { '@type': 'Answer', text: 'app is the preview root element. write() prints output to the visible area. clearOutput() clears it. $() runs querySelector inside the preview. $$() runs querySelectorAll inside the preview and returns an array. These helpers keep lesson examples short while teaching standard browser JavaScript patterns.' } },
    { '@type': 'Question', name: 'Does it go beyond beginner JavaScript?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The advanced chapters cover closures, this, bind, call, apply, classes, prototypes, modules, fetch, localStorage patterns, URLSearchParams, FormData, event loop ordering, debounce, throttle, Canvas, Web Workers, Drag and Drop, Clipboard, generators, modern methods (Array.at, Object.groupBy, structuredClone), regex, AbortController, IntersectionObserver, ResizeObserver, Proxy, performance measurement, safe rendering, and tiny tests.' } },
    { '@type': 'Question', name: 'Does my code get uploaded anywhere?', acceptedAnswer: { '@type': 'Answer', text: 'No. Code runs locally in your browser inside a sandboxed iframe. Lesson progress is stored in localStorage on your device. Share links encode the current code in the URL — nothing is sent to a server.' } },
    { '@type': 'Question', name: 'Why are import and export examples handled in one editor?', acceptedAnswer: { '@type': 'Answer', text: 'Real modules live in separate files, but this playground keeps lessons in one editor. Module-style examples show export and import comments, and the runtime strips export keywords so the example runs as one combined script.' } },
    { '@type': 'Question', name: 'How is this different from the React Playground?', acceptedAnswer: { '@type': 'Answer', text: 'The JavaScript Playground teaches the core language and browser APIs: functions, arrays, objects, DOM, events, async, fetch, storage, performance, security, and testing. The React Playground teaches JSX, components, hooks, state, effects, and React-specific UI patterns. Learn JavaScript fundamentals here first.' } },
    { '@type': 'Question', name: 'Should I learn JavaScript before React?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. React becomes much easier if you understand functions, arrays, objects, callbacks, events, async code, and rendering lists. This playground is designed to build exactly that foundation before you move into a framework.' } },
    { '@type': 'Question', name: 'Can I use it as a quick JavaScript sandbox?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can ignore the lesson path and paste your own snippet into the editor at any time. The preview, console panel, copy, download, and share controls all still work.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'JavaScript Playground',
  url: 'https://webdevpuneet.com/js-playground/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free interactive JavaScript playground with 60 guided lessons across 25 chapters — variables, functions, arrays, objects, DOM, events, async/await, fetch, closures, classes, generators, Web Workers, Canvas, performance, security, and testing. Live preview, clickable DOM examples, console output, progress tracking. No install required.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
  featureList: [
    '60 guided lessons across 25 chapters',
    'Live code editor with auto-updating preview',
    'Clickable DOM preview for event and form lessons',
    'Console panel for log/warn/error output',
    'Generators, Proxy & Reflect, Observers, AbortController',
    'Canvas API, Web Workers, Drag & Drop, Clipboard lessons',
    'Modern JS methods — Array.at(), Object.groupBy(), structuredClone()',
    'Performance lessons — event loop, debounce, throttle, timing',
    'Security lesson — safe rendering vs innerHTML',
    'Mini Projects — Filterable List, Expense Summary',
    'Progress tracking via localStorage',
    'Share code via URL',
    'Download snippet as .js file',
    '100% browser-based, no install required',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Learn to Code', item: 'https://webdevpuneet.com/learn-to-code/' },
    { '@type': 'ListItem', position: 3, name: 'JavaScript Playground', item: 'https://webdevpuneet.com/js-playground/' },
  ],
};

const seoData = {
  slug: 'js-playground',
  title: 'JavaScript Playground — Learn JS from Basics to Browser Projects',
  subtitle: 'A free interactive JavaScript playground with 60 guided lessons, live preview, clickable DOM examples, console output, progress tracking, and mini projects. No install.',

  about: {
    title: 'Learn JavaScript Online Without Installing Anything — 60 Lessons, Live Browser Preview',
    description: `Most JavaScript tutorials give you a code block and the final output and skip the part you actually need: what changes when you edit one value, move one line, or click a button twice. This JavaScript Playground keeps the code and the browser behavior visible at the same time. Edit the code, see the preview update, click rendered buttons and forms, inspect the console panel — then edit again. That feedback loop is how JavaScript actually makes sense.

There is nothing to install. No Node.js, no npm, no terminal, no project folder. Open the page and 60 lessons are ready across 25 chapters that take you from your first \`let\` declaration through Web Workers, Canvas, generators, Proxy, and performance timing.

**Foundations, Values & Logic, Control Flow — the language core**

The first three chapters establish the JavaScript mental model that everything else builds on. You write your first \`console.log\`, then learn \`let\` vs \`const\`, primitive types, type coercion, comparison operators, string and number methods, \`if/else\`, and loop patterns. Each lesson shows visible output — not a static screenshot — so you can change a value and immediately see what updates. Two lessons on Debugging (the Console panel and \`try/catch\`) are placed here on purpose: understanding \`console.log\` as a tool and \`try/catch\` as a safety net makes every chapter that follows more approachable.

**Functions, Arrays, Objects — the three things JavaScript uses for everything**

Three dedicated chapters covering the structures you will use in every program. Functions: declarations, arrow functions, default parameters, callbacks, and scope. Arrays: \`.map()\`, \`.filter()\`, \`.reduce()\`, destructuring, and two lessons on grouped data and running totals. Objects: property access, spread, computed keys, \`.entries()\`, \`.values()\`, and a lesson on real object methods — \`formatDate\`, \`totalRevenue\`, \`activeClients\` on a client record. By the end of these chapters you have the data-handling foundation that React, Vue, and every other framework assumes you already have.

**DOM, Events, Data — browser JavaScript fundamentals**

Four DOM lessons and three Events lessons where the preview pane becomes interactive. \`querySelector\` and \`querySelectorAll\` to select elements. \`document.createElement\` and \`innerHTML\` to build content. Rendering an array of objects as a list of cards. Toggling CSS classes and inline styles dynamically. Click handlers, form input with \`addEventListener\`, and event delegation using a single parent listener for a dynamically built list. A Data chapter covers \`JSON.parse\` and \`JSON.stringify\`, and transforming a flat API response into grouped summary objects — a pattern you will use every time you work with a real API.

**Async — setTimeout, Promises, async/await**

Three lessons on asynchronous JavaScript — the topic that trips up more learners than any other. A \`setTimeout\` lesson shows the event loop in practice: your code keeps running while the timer is pending, then the callback fires later. A Promises lesson covers \`.then\` chains, error handling with \`.catch\`, and \`Promise.all\` for parallel requests. An Async Data Pattern lesson builds a realistic loading-state UI: show a spinner, \`await\` a simulated fetch, hide the spinner, render the result, catch errors.

**Advanced Functions, OOP, Architecture — the gap between beginner and capable**

Three chapters that separate learners who understand JavaScript from those who just paste it. Closures: private counter, memoize pattern, and debounced event handler — all showing how a function can remember its own scope. \`this\`, \`bind\`, \`call\`, \`apply\`: four patterns that explain why \`this\` behaves differently depending on how the function is called. OOP: \`class\` with constructor and methods, then prototypes and \`Object.create\` to show what \`class\` is doing under the hood. Architecture: module-style code organisation with \`export\` and \`import\` patterns in a single editor.

**Browser APIs — Fetch, localStorage, URLSearchParams, Canvas, Web Workers, Drag & Drop, Clipboard**

Seven Browser API lessons across two groups. The first group covers professional fetch patterns (loading state + error boundary + abort signal), localStorage-style persistence with a JSON read/write wrapper, and URLSearchParams and FormData for building query strings and reading form submissions without touching the DOM directly. The second group goes deeper: drawing on a \`<canvas>\` with arcs, fills, gradients, and animation frames; offloading a heavy Fibonacci computation to a Web Worker so the UI thread stays responsive; dragging and dropping list items with the HTML5 Drag and Drop API; reading and writing clipboard text with the Clipboard API.

**Performance, Security, Testing — patterns that matter in real code**

Three Performance lessons: the Event Loop & Microtasks lesson logs the exact firing order of \`setTimeout\`, \`Promise.resolve\`, and \`queueMicrotask\` so you can see why async ordering sometimes surprises you. Debounce & Throttle demonstrates both patterns on a live input and a scroll-rate counter. Measure Performance uses \`performance.now()\` to time a sort and \`PerformanceObserver\` to detect long tasks. A Security lesson shows exactly why \`innerHTML\` with user input is dangerous, demonstrates a script-injection attack in a safe sandbox, and shows how \`textContent\` and \`DOMPurify\`-style sanitisation block it. Testing: a tiny test runner built in 20 lines with \`assert\`, \`assertEqual\`, and \`assertThrows\` — so you can see what a test framework does before you reach Jest or Vitest.

**Generators, Modern Methods, Regex, AbortController, Observers, Proxy & Reflect**

Six advanced chapters for the topics that rarely appear in beginner tutorials but come up constantly in real codebases. Generators: \`function*\` with \`yield\`, infinite sequences, and custom iterators. Modern Methods: \`Array.at()\`, \`Object.hasOwn()\`, \`Object.groupBy()\`, and \`structuredClone()\` — all with before/after comparisons of the older pattern they replace. Regex: patterns and flags, then \`.replace()\` and \`.replaceAll()\` transforms. AbortController: cancelling a slow fetch mid-flight, and using \`AbortSignal.timeout()\` to automatically time out after a deadline. Observers: \`IntersectionObserver\` for lazy-loading and infinite scroll triggers, \`ResizeObserver\` for reacting to container size changes. Proxy & Reflect: get/set traps, validation, and a 30-line reactive state implementation that updates the DOM when a property changes — the same pattern Vue and MobX use internally.

**Mini Projects — Filterable List and Expense Summary**

Two full applications combining everything you have learned. A Filterable List with a status dropdown and search input — a single \`filter\` chain recalculates both simultaneously and re-renders with \`innerHTML\`. An Expense Summary with category grouping, running totals, and a formatted breakdown — all driven by \`.reduce()\` on a flat data array.

Every lesson has a Quick Check multiple-choice question. Progress and your current lesson are saved to localStorage automatically — close the tab and resume where you left off. A Share button encodes your editor code as a base64 URL. All code runs fully in your browser — no data is uploaded to any server.`,
  },

  features: [
    '60 guided lessons across 25 chapters from Hello JavaScript to Proxy & Reflect — then go deeper with the [TypeScript playground](/typescript-playground) or [Node.js playground](/nodejs-playground/)',
    'Live code editor — preview updates automatically, Ctrl+Enter to run immediately',
    'Clickable DOM preview — event and form lessons render real interactive UI, with patterns you can reuse from the [UI snippets library](/ui-snippets)',
    'Console panel — captures console.log, warn, and error output next to the preview',
    'Generators chapter — function*, yield, infinite sequences, custom iterators',
    'Modern Methods chapter — Array.at(), Object.groupBy(), structuredClone()',
    'AbortController chapter — cancel slow fetches, AbortSignal.timeout() deadlines',
    'Observers chapter — IntersectionObserver for lazy load, ResizeObserver for layout',
    'Proxy & Reflect chapter — traps, validation, and a reactive state pattern',
    'Canvas API, Web Workers, Drag & Drop, Clipboard — all with working examples',
    'Performance lessons — event loop ordering, debounce/throttle, performance.now()',
    'Security lesson — live injection demo, textContent vs innerHTML, safe patterns',
    '2 mini projects — Filterable List and Expense Summary',
    'Progress tracking via localStorage — resume exactly where you left off',
    'Share button — encodes code as base64 URL, no server required',
    'Download snippet as a .js file',
    '100% browser-based — no Node.js, no npm, no terminal, no setup',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Open the playground — no install required',
        text: 'Navigate to the JavaScript Playground. The editor and sandboxed preview are ready immediately — no Node.js, no npm, no terminal. Start from the first lesson or jump to any chapter that matches your current level.',
      },
      {
        title: 'Start at Foundations if you are new to JS',
        text: 'Work through Hello JavaScript, Variables, Types, Operators, and String & Number Methods. Change values in the editor and watch the output update in real time. The Debugging chapter (Console and Try/Catch) follows — work through those before moving to DOM.',
      },
      {
        title: 'Interact with the DOM and Events lessons',
        text: 'When you reach the DOM and Events chapters, the preview pane becomes interactive. Click buttons, type into inputs, submit forms, and drag list items. These lessons connect the JavaScript you write to real browser behavior — the connection that makes DOM manipulation finally click.',
      },
      {
        title: 'Work through the Async chapter carefully',
        text: 'setTimeout, Promises, and the Async Data Pattern chapter are the most common sticking points. The lessons show the event loop in practice: your code keeps running while a timer is pending, then the callback fires. The loading-state UI pattern (spinner → fetch → render → catch errors) is directly applicable to any real app.',
      },
      {
        title: 'Use the Console panel for log output',
        text: 'Open the Console panel (toggle button in the toolbar) whenever a lesson uses console.log, console.warn, or console.error. Debugging, async, fetch, and mini-project lessons all log heavily — the Console panel shows those messages next to the preview without leaving the page.',
      },
      {
        title: 'Explore the advanced chapters at your own pace',
        text: 'Generators, Modern Methods, Regex, AbortController, Observers, and Proxy & Reflect are standalone chapters — you can skip ahead or return to them after the main curriculum. Each lesson links only to the feature it demonstrates, so there is no prerequisite chain in these chapters.',
      },
      {
        title: 'Answer the Quick Check on each lesson',
        text: 'Every lesson ends with a multiple-choice Quick Check. Answer it before marking the lesson done — it takes under a minute and reinforces the concept before you move on. Progress is saved automatically to localStorage.',
      },
      {
        title: 'Share and save snippets you want to keep',
        text: 'When you have a snippet worth saving, click Share to generate a base64 URL. Bookmark it or paste it in a message. Click Download to save the current code as a .js file. Both options work for your own code, not just lesson starters.',
      },
    ],
  },

  useCases: [
    {
      icon: '▶',
      title: 'Learn JavaScript from scratch in your browser',
      desc: 'If you want to start learning JavaScript but do not know where to begin or do not want to set up a local project, open the Foundations chapter. Variables, types, operators, functions, arrays, and objects — all with visible output after every edit. No terminal, no npm, no configuration. The 25-chapter path takes you from your first console.log through Web Workers and Proxy.',
    },
    {
      icon: '⇄',
      title: 'Build the foundation JavaScript React assumes you have',
      desc: 'React tutorials assume you already understand functions, arrays, callbacks, events, async code, and rendering lists from data. If any of those still feel uncertain, this playground covers all of them with interactive, editable examples. Work through DOM, Events, Arrays, Async, and Closures — then the React Playground will feel like a natural next step, not a wall.',
    },
    {
      icon: '{}',
      title: 'Understand async JavaScript — Promises, await, and the event loop',
      desc: 'Async is where most JS learners get stuck. The three-lesson Async chapter makes it concrete: a setTimeout lesson logs exact firing order to show the event loop in action; a Promises lesson covers .then, .catch, and Promise.all; an Async Data Pattern lesson builds a loading-state UI with async/await, error handling, and a spinner. The Event Loop & Microtasks lesson shows the exact ordering of setTimeout, Promise.resolve, and queueMicrotask.',
    },
    {
      icon: '⊞',
      title: 'Explore advanced JS topics — generators, Proxy, observers',
      desc: 'The last six chapters cover topics that rarely appear in beginner courses but come up constantly in real codebases: generator functions, infinite sequences, custom iterators, Object.groupBy(), structuredClone(), AbortController for cancelling fetches, IntersectionObserver for lazy loading, ResizeObserver for layout reactions, Proxy traps, and a reactive state implementation that updates the DOM on property change.',
    },
    {
      icon: '◉',
      title: 'Practice security and performance patterns safely',
      desc: 'The Security lesson demonstrates a script-injection attack in a sandboxed environment, then shows how textContent and sanitisation block it — making the danger concrete without any risk. The three Performance lessons cover event loop ordering, debounce vs throttle on a live input, and performance.now() timing. These are the gaps that separate a working app from a robust one.',
    },
    {
      icon: '✦',
      title: 'Use it as a fast JavaScript scratchpad',
      desc: 'Ignore the lesson path entirely and paste any snippet into the editor. The preview, console panel, copy, download, and share controls all work on your own code. Faster than opening a CodePen tab, spinning up a Vite project, or opening browser DevTools for a multi-line experiment.',
    },
  ],

  faqs: [
    { q: 'Do I need to install Node.js to use the JavaScript Playground?', a: 'No. The playground runs entirely in your browser. You can edit JavaScript, render DOM examples, inspect console output, and save progress without installing Node.js, npm, VS Code, or a local project.' },
    { q: 'Is this JavaScript Playground good for beginners?', a: 'Yes. The first chapters start with variables, types, operators, conditions, loops, functions, arrays, and objects with visible output after every edit. Later chapters build toward DOM, events, async, browser APIs, performance, security, testing, and mini projects.' },
    { q: 'Does it really go beyond beginner JavaScript?', a: 'Yes. Advanced chapters cover closures, this, bind, call, apply, classes, prototypes, modules, fetch, localStorage, URLSearchParams, FormData, event loop ordering, debounce, throttle, Canvas, Web Workers, Drag & Drop, Clipboard, generators, modern methods (Array.at, Object.groupBy, structuredClone), regex, AbortController, IntersectionObserver, ResizeObserver, Proxy, Reflect, performance timing, safe rendering, and tiny tests.' },
    { q: 'Does the preview support clickable DOM examples?', a: 'Yes. DOM and event lessons render real buttons, inputs, forms, and lists inside the sandboxed preview. You can click, type, submit forms, and inspect console output while editing the JavaScript.' },
    { q: 'What are app, write(), $(), and $$()?', a: 'app is the preview root element. write() prints to the visible output area. clearOutput() clears it. $() runs querySelector inside the preview. $$() runs querySelectorAll inside the preview and returns an array. These helpers keep lesson code short while teaching standard browser JavaScript patterns.' },
    { q: 'Does my code get uploaded anywhere?', a: 'No. Code runs locally in your browser inside a sandboxed iframe. Lesson progress is stored in localStorage on your device. Share links encode the current code in the URL — nothing is sent to a server.' },
    { q: 'Why are import and export examples in one editor?', a: 'Real modules live in separate files, but this playground keeps lessons in one editor. Module-style examples show export and import comments, and the runtime strips export keywords so the example runs as one combined script.' },
    { q: 'How is this different from the React Playground?', a: 'The JavaScript Playground teaches the core language and browser APIs: functions, arrays, objects, DOM, events, async, fetch, storage, performance, security, and testing. The React Playground teaches JSX, components, hooks, state, effects, and React-specific patterns. Learn JavaScript fundamentals here first.' },
    { q: 'Should I learn JavaScript before React?', a: 'Yes. React becomes much easier if you understand functions, arrays, objects, callbacks, events, async code, and rendering lists. This playground is designed to build exactly that foundation.' },
    { q: 'Can I use it as a quick JavaScript sandbox?', a: 'Yes. Paste any snippet into the editor at any time — the preview, console panel, copy, download, and share controls all work on your own code, not just lesson starters.' },
  ],

  links: [
    { label: 'React Playground', href: '/react-playground/', desc: 'Learn React hooks, JSX, and state — the natural next step after JavaScript fundamentals.' },
    { label: 'Vue.js Playground', href: '/vue-playground/', desc: 'Learn Vue 3 with 40 interactive lessons — directives, Composition API, mini-projects.' },
    { label: 'TypeScript Playground', href: '/typescript-playground/', desc: 'Add static types to your JavaScript knowledge — 10 chapters from basics to generics.' },
    { label: 'HTML Playground', href: '/html-playground/', desc: 'Learn HTML structure visually before adding JavaScript behavior.' },
    { label: 'CSS Playground', href: '/css-playground/', desc: 'Learn the styling layer that pairs with every JavaScript-rendered DOM element.' },
  ],
};

export default function JsPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <JsPlaygroundTool />
      </div>
      <AdSlot />
      <IndexOnly><SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
