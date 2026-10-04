import NodejsPlaygroundTool from '@/components/NodejsPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/learn-to-code.png';

export const metadata = {
  title: 'Node.js Playground — Learn Node.js Visually, 31 Lessons Free | webdevpuneet.com',
  description: 'Learn Node.js free in your browser — 31 lessons running real JavaScript: modules, events, streams, async, fs, plus a visual event-loop simulator. No install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/nodejs-playground/' },
  icons: { icon: '/icons/nodejs-playground.svg', shortcut: '/icons/nodejs-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/nodejs-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Node.js Playground — Run Real Node Code + Event Loop Visualizer',
    description: 'A free browser-based Node.js course, beginner to pro: 26 runnable lessons (modules, events, streams, async/await, Buffer, fs, JSON, testing, env, performance, worker threads, cluster) plus a 5-lesson event-loop visualizer. No install, no backend.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Node.js Playground Online — Run Code and Visualize the Event Loop' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Node.js Playground — Run Real Node Code + Event Loop Visualizer',
    description: 'Run real Node.js JavaScript in the browser — modules, EventEmitter, streams, async/await, Buffer, fs, JSON, assert — plus an animated event-loop simulator. Free.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why should I learn and use Node.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Node.js lets you use JavaScript everywhere — the same language on the server and in the browser — so you maintain one skill set across the stack. Its non-blocking, event-driven model handles thousands of concurrent connections efficiently, which makes it excellent for APIs, real-time apps, and microservices. It ships practical built-in modules (events, path, streams, fs, http), runs on the fast V8 engine, and has the largest package ecosystem in the world through npm. Node also powers the tooling and frameworks most web developers already use, including Express, Next.js, and build tools. This playground teaches the fundamentals behind all of that with runnable lessons.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the Node.js Playground run real code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, for the runnable lessons. Twenty-six lessons execute genuine JavaScript in a sandboxed iframe — editing the code produces real console output. Node built-ins that are pure JavaScript are provided as faithful shims: events (EventEmitter), path, util, assert, os, and Buffer, plus process, async/await, and streams via async iterators. Server-only resources are modeled honestly rather than faked: fs is a real in-memory file store with true ENOENT errors (not disk), and http runs your handler against one sample request. A separate five-lesson chapter visualizes the event loop as an animated, deterministic model. Nothing fabricates output it cannot actually compute.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does the Node.js Playground teach?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The curriculum spans modules and require, globals and the process object, async patterns (callbacks, Promises, async/await, Promise.all), the EventEmitter, paths and strings, Buffers and binary, streams with async iterators, the file system (in-browser model), JSON parsing and stringifying, error handling for sync and async code, an HTTP request handler model, and assertions with the assert module for testing. A dedicated Event Loop chapter visualizes the call stack, process.nextTick queue, Promise microtasks, timers, and I/O callbacks so you understand why async output prints in the order it does.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I learn Node.js without installing it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Everything runs in your browser — no Node.js install, no npm, no terminal, and no code uploaded to a server. The runnable lessons execute JavaScript locally in a sandbox, and the event-loop lessons animate scheduling. It is ideal for first-time learners, classrooms, and quick concept review. When you are ready to build real servers and use the full npm ecosystem and disk and network access, install Node.js locally.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the file system and HTTP lessons real?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They are honest in-browser models, not fakes. The fs lessons read and write a real in-memory file store, so writeFileSync then readFileSync behaves like Node — including throwing ENOENT for missing files — but the storage is memory rather than your disk. The HTTP lesson invokes your request handler once with a sample request object and captures what it writes, so your handler code runs for real even though there is no network socket. The lesson text states this clearly so you always know what is executing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is process.nextTick and why does it run before Promises?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'process.nextTick schedules a callback to run at the end of the current operation, before the event loop continues to the next phase — and before Promise microtasks. So nextTick callbacks run ahead of .then and await continuations. You can run this directly in the Globals and process lesson and watch the order in the console, and the Event Loop visualizer animates the same rule across the call stack, nextTick queue, and microtask queue.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between readFileSync and readFile in Node.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'readFileSync is synchronous — it blocks the event loop until the read completes, so no other callbacks run during that time, which is why it is avoided in request handlers. readFile is asynchronous — it starts the I/O and returns immediately, then runs your callback later in the poll/I/O phase. The File System lesson lets you run both against the in-memory store, and the Event Loop visualizer shows the call stack and I/O queue side by side so the blocking-versus-non-blocking tradeoff is obvious.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does this compare to the Express.js Playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This Node.js Playground teaches the language and runtime fundamentals — modules, events, streams, async scheduling, Buffers, fs, and error handling — that everything else is built on. The Express.js Playground is a lesson-based environment where you write real Express route handlers, middleware, and API endpoints. Learn the Node fundamentals here, then move to the Express.js Playground to build request-handling servers.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Node.js Playground',
  url: 'https://webdevpuneet.com/nodejs-playground/',
  image: OG_IMAGE,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free interactive Node.js course in the browser, beginner to pro: 26 runnable lessons covering modules, events, streams, async, Buffer, fs, JSON, testing, environment config, performance, worker threads, cluster, and debugging, plus a 5-lesson animated event-loop visualizer.',
  featureList: [
    '31 Node.js lessons, beginner to pro: 26 that run real JavaScript plus a 5-lesson event-loop visualizer',
    'Production & Performance chapter: environment variables, CommonJS vs ES Modules, measuring performance, worker threads, scaling with cluster, and logging/debugging',
    'Real in-browser execution with faithful shims for events, path, util, assert, os, and Buffer',
    'process object, async/await, callbacks, Promises, and streams via async iterators',
    'In-memory file system model with real ENOENT behaviour for fs lessons',
    'Modeled HTTP request handler lesson that runs your handler code for real',
    'EventEmitter, JSON parsing, error handling, and assert-based testing lessons',
    'Animated event loop: call stack, nextTick, Promise microtasks, timers, and I/O phases',
    'Editable code, live console output, Quick Check questions, and progress tracking',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to learn Node.js online',
  description: 'Use the Node.js Playground to run real Node code lessons and visualize the event loop in your browser.',
  step: [
    { '@type': 'HowToStep', name: 'Pick a chapter and lesson', text: 'Start with Modules or Globals, or jump to the Event Loop visualizer.' },
    { '@type': 'HowToStep', name: 'Read the concept', text: 'Open the concept panel to understand what the lesson demonstrates.' },
    { '@type': 'HowToStep', name: 'Run the code', text: 'Edit the script and click Run to execute it in a sandbox and read the console output.' },
    { '@type': 'HowToStep', name: 'Visualize the event loop', text: 'In the Event Loop chapter, step through the call stack and queues.' },
    { '@type': 'HowToStep', name: 'Take the Quick Check and mark done', text: 'Answer the lesson question and track your progress.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com/' },
    { '@type': 'ListItem', position: 2, name: 'Node.js Playground', item: 'https://webdevpuneet.com/nodejs-playground/' },
  ],
};

const seoData = {
  slug: 'nodejs-playground',
  title: 'Node.js Playground — Run Real Node Code and Visualize the Event Loop',
  subtitle: 'A free, browser-based Node.js course, beginner to pro: 26 runnable lessons (modules, events, streams, async/await, Buffer, fs, JSON, testing, env, performance, worker threads, cluster) plus a 5-lesson animated event-loop simulator. No install, no backend.',
  about: {
    title: 'Learn Node.js the Right Way — Run Real Code and Understand the Event Loop',
    description: `Most Node.js tutorials drop you into \`express()\` before you understand why \`setTimeout\` runs after a resolved Promise, or how \`require\` and \`module.exports\` actually wire files together. This **Node.js Playground** fixes that by being two things at once: a set of **runnable lessons that execute real JavaScript**, and a **visual event-loop simulator** that shows how Node schedules work.

The runnable lessons execute genuine code in a sandboxed iframe — edit the script, click Run, and read real console output. Node's pure-JavaScript built-ins are provided as faithful shims, so they behave like the real thing: \`events\` (\`EventEmitter\`), \`path\`, \`util\`, \`assert\`, \`os\`, and \`Buffer\`, plus the \`process\` object, \`async\`/\`await\`, and streams through async iterators. Server-only resources are modeled honestly rather than faked: \`fs\` is a real in-memory file store that throws true \`ENOENT\` errors for missing files (the storage is memory, not your disk), and \`http\` runs your request handler against one sample request and captures what it writes. Nothing fabricates output it cannot actually compute.

Alongside the runnable lessons, the **Event Loop (Visualized)** chapter animates how Node orders asynchronous work: the call stack, the \`process.nextTick\` queue, Promise microtasks, timers, and I/O callbacks. Watching synchronous code finish first, then nextTick drain before Promises, then timers and I/O land later, makes the scheduling rules stick in a way a diagram never quite does.

The full curriculum covers: **Modules & require** (\`module.exports\`, requiring built-ins), **Globals & process** (the \`process\` object, \`nextTick\` ordering), **Async Patterns** (callbacks, Promises, \`async\`/\`await\`, \`Promise.all\`), the **Event Loop** visualizer, **Events** (the \`EventEmitter\` pub/sub pattern), **Paths & Strings**, **Buffers** and binary, **Streams** with \`for await...of\`, the **File System** model, **JSON & Data**, **Error Handling** for sync and async code, an **HTTP** request-handler model, **Testing** with the \`assert\` module, and a pro **Production & Performance** chapter covering environment variables (\`process.env\`), CommonJS vs ES Modules, measuring performance, worker threads for CPU-bound work, scaling with the \`cluster\` module, and logging/debugging. Each lesson has a concept panel, a Quick Check, and Mark Done progress tracking.

### Why Use Node.js?

Node.js is one of the most popular runtimes for building servers, APIs, and tools, and these lessons teach the fundamentals behind its biggest benefits:

**One language across the stack.** Use JavaScript on the server and in the browser, so you maintain a single skill set instead of context-switching between languages.

**Non-blocking, event-driven I/O.** Node handles many concurrent connections on a single thread by scheduling work through the event loop instead of blocking on each request — ideal for APIs, real-time apps, chat, and streaming.

**The largest ecosystem.** npm is the biggest package registry in the world, so almost any feature you need already has a well-maintained library.

**Fast and lightweight.** Built on Google's V8 engine, Node starts quickly and excels at I/O-bound workloads, microservices, serverless functions, and command-line tools.

**Practical built-in modules.** \`fs\`, \`http\`, \`path\`, \`events\`, and \`streams\` give you file access, servers, and data pipelines without external dependencies — exactly the modules these lessons cover.

**It powers the modern web toolchain.** Express, Next.js, build tools, and most front-end tooling run on Node, so learning it unlocks the wider JavaScript ecosystem.

Everything here runs in your browser — no install, no terminal, no code uploaded anywhere. When the fundamentals click, move to the [Express.js Playground](/express-playground/) to build real route handlers and middleware, or strengthen the language itself with the [JavaScript Playground](/js-playground/). For typed Node and framework prep, the [TypeScript Playground](/typescript-playground/) is a useful next step.`,
  },
  features: [
    '26 runnable Node.js lessons that execute real JavaScript in a sandboxed browser iframe, beginner to pro',
    'Faithful shims for `events` (EventEmitter), `path`, `util`, `assert`, `os`, and `Buffer`',
    'process object, async/await, callbacks, Promises, and streams via async iterators',
    'In-memory file system model with real ENOENT behaviour for `fs` lessons',
    'Modeled HTTP request-handler lesson that runs your handler code for real',
    'JSON parsing, error handling for sync and async code, and assert-based testing lessons',
    'Animated event-loop visualizer: call stack, nextTick, Promise microtasks, timers, and I/O',
    'Editable code with live console output, concept panels, Quick Checks, and progress tracking',
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Pick a chapter and lesson', text: 'Start with Modules & require or Globals & process for fundamentals, or jump straight to the Event Loop chapter to see scheduling animated. The lesson list is grouped by chapter so you can follow a path or explore a single topic.' },
      { title: 'Read the concept, then run the code', text: 'Open the concept panel for a short explanation, then edit the script and click Run. The code executes for real in a sandbox and prints to the console — change a value and run again to see how the output changes.' },
      { title: 'Use the built-in modules', text: 'Lessons use real shims for `events`, `path`, `Buffer`, `assert`, and more, plus `async`/`await` and streams. Experiment freely — for example, add another `bus.on(...)` listener or change a `path.join(...)` and rerun to confirm your understanding.' },
      { title: 'Step through the event loop', text: 'In the Event Loop chapter, use Run, Step, and Reset to watch the call stack, nextTick queue, Promise microtasks, timers, and I/O callbacks move. This answers the classic question of why async `console.log` output prints out of source order.' },
      { title: 'Take the Quick Check and mark done', text: 'Answer the multiple-choice Quick Check to confirm the concept, then use Mark Done to advance. Progress is saved in your browser so you can return where you left off.' },
      { title: 'Move to Express when ready', text: 'Once the fundamentals make sense, open the [Express.js Playground](/express-playground/) to write real route handlers and middleware. The async and event-loop concepts you practiced here apply directly to request handling.' },
    ],
  },
  useCases: [
    { icon: 'LEARN', title: 'Learn Node.js fundamentals from scratch', desc: 'Follow a chapter-based course covering modules, the process object, events, streams, Buffers, fs, JSON, and testing — all running real code in the browser with no install. Ideal for first-time learners and classrooms.' },
    { icon: 'CODE', title: 'Run real Node-flavoured JavaScript', desc: 'Edit and execute genuine code with faithful shims for `events`, `path`, `Buffer`, `assert`, and async/await. Change a value, rerun, and see the real output — the experiment-driven way to learn a runtime.' },
    { icon: 'SYNC', title: 'Understand async output order', desc: 'The Event Loop visualizer animates the call stack, nextTick queue, Promise microtasks, timers, and I/O callbacks so you finally see why async `console.log` prints out of order. Pairs well with the [JavaScript Playground](/js-playground/) for language basics.' },
    { icon: 'DOC', title: 'Practice fs and HTTP handlers safely', desc: 'Read and write an in-memory file store that behaves like `fs` (including ENOENT), and run an HTTP request handler against a sample request. Honest models that execute your code without needing a disk or a network.' },
    { icon: 'PRO', title: 'See the real benefits of Node.js', desc: 'Lessons put non-blocking I/O, the event loop, built-in modules, and the EventEmitter pattern into practice — the features that make Node a top choice for APIs, real-time apps, and tooling — so the "why" is concrete, not abstract.' },
    { icon: 'SAFE', title: 'Run deterministic demos in tutorials', desc: 'Because lessons run locally with modeled resources, every run is repeatable — no network timeouts, version drift, or environment setup. Reliable for live coding, recorded tutorials, and classroom instruction.' },
  ],
  faqs: faqSchema.mainEntity.map((item) => ({
    q: item.name,
    a: item.acceptedAnswer.text,
  })),
};

export default function NodejsPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <div className={styles.toolSection}>
        <NodejsPlaygroundTool />
      </div>
      <AdSlot />
      <IndexOnly><SeoSection {...seoData} noShare /></IndexOnly>
    </div>
  );
}
