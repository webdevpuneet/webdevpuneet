import PythonPlaygroundTool from '@/components/PythonPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/learn-to-code.png';

export const metadata = {
  title: 'Python Playground — Learn Python Visually, 29 Lessons Free | webdevpuneet.com',
  description: 'Learn Python online with 29 visual lessons — variables, loops, comprehensions, generators, decorators, OOP, and testing. Step-by-step tracer, free, no install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/python-playground/' },
  icons: { icon: '/icons/python-playground.svg', shortcut: '/icons/python-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/python-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Python Playground Online — 29 Lessons, Beginner to Pro, Step-by-Step Tracer',
    description: 'Learn Python with 29 guided lessons across 14 chapters, beginner to pro — basics through comprehensions, generators, decorators, type hints, closures, and testing. Watch memory, call stack, and output update on every line.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Python Playground Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Python Playground Online - Visual Code Tracer',
    description: 'Learn Python visually with a safe editable editor, parser feedback, memory diff highlights, challenges, and line-by-line traces for variables, branches, loops, dictionaries, functions, JSON, stack, and output.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does this Python Playground execute arbitrary Python code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. This version is a client-side visual tracer for learning Python concepts. It does not run user-submitted Python on a backend server. Each lesson plays a deterministic trace so learners can understand memory, output, and control flow safely.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Python topics are covered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The playground covers 29 lessons across 14 chapters, beginner to pro. Foundations: Basics (variables, strings, numbers & casting), Control Flow (if/elif/else, booleans & operators), Loops (for, while, list comprehensions), Data (list methods, dictionaries, tuples, sets), Functions (define & call, lambda, scope), OOP (classes & objects), Error Handling (try/except), and Files & APIs (JSON). Pro topics: Comprehensions (list, dict, set), Iterators & Generators (yield, generator expressions), Decorators, Type Hints, Advanced Functions (*args/**kwargs, closures & nonlocal), Functional Tools (map/filter/lambda), Testing (assert), and an async/await overview.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why should I learn Python?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Python is one of the most popular and beginner-friendly languages, with clean, readable syntax that lets you focus on problem-solving instead of boilerplate. It is the default language for data science, machine learning, and AI, and it is widely used for web backends, automation and scripting, DevOps, and testing. Its huge standard library and package ecosystem (PyPI) mean most tasks already have a library, and the skills transfer across industries. This playground takes you from first variables to professional features like generators, decorators, type hints, and testing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it cover advanced Python like generators and decorators?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The pro chapters visualize the features that trip up intermediate learners: generators (how yield pauses and resumes a function lazily), generator expressions, decorators (how @decorator wraps a function), closures with nonlocal, *args/**kwargs, type hints (and why they do not change runtime behaviour), map/filter/lambda, testing with assert, and an async/await ordering overview. Each plays a line-by-line trace so you can see exactly when execution pauses, resumes, and produces output.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I edit code in this Python Playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, within a safe beginner subset. You can edit supported lesson patterns such as assignments, list values, dictionary fields, function call arguments, and JSON text. The parser updates the trace when the pattern is supported and shows a friendly message when an edit is outside the safe subset.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this good for beginners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The interface highlights one Python line at a time and shows the matching memory changes, call stack frame, and console output. That makes it useful for first-time learners who need to see how code runs step by step.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this a Python compiler or online interpreter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. It is a visual Python learning simulator, not a general-purpose Python compiler. It focuses on explaining how beginner Python code executes before learners move to a full local Python setup or backend execution environment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this for teaching Python?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Run Trace and Step controls are designed for classrooms, tutorials, and interviews where you want to pause on a line and ask learners to predict what changes next.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Python Playground',
  url: 'https://webdevpuneet.com/python-playground/',
  image: OG_IMAGE,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Browser-based Python learning playground with 29 guided lessons across 14 chapters, beginner to pro — variables, strings, numbers, booleans, operators, loops, comprehensions, list methods, tuples, sets, dictionaries, functions, lambda, scope, classes, try/except, JSON, generators, decorators, type hints, *args/**kwargs, closures, map/filter, and testing. Step-by-step visual tracer shows memory diffs, call stack, and console output on every line.',
  featureList: [
    'Line-by-line Python trace view with highlighted source lines',
    'Safe editable Python lesson editor for supported beginner patterns',
    'Parser feedback when code edits move outside the supported lesson subset',
    'Memory diff highlights for added, changed, and removed variables on each step',
    'Editable safe inputs that regenerate the code, memory trace, and output',
    'Validation challenges for each lesson',
    'Beginner-focused lessons for strings, numbers, booleans, lists, dictionaries, functions, and JSON-like data',
    'Memory panel showing variables and values as code runs',
    'Call stack panel for function lessons',
    'Console output panel that prints only when trace reaches print()',
    'Lessons for variables, print(), if/elif/else, for loops, list operations, dictionary access, function calls, return values, mocked files, API text, and JSON parsing',
    'Run, pause, step, reset, speed controls, progress tracking, and mark done',
    'Practice prompts for prediction and classroom discussion',
    'Browser-only learning simulator with no backend code execution',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'Python Playground', item: 'https://webdevpuneet.com/python-playground/' },
  ],
};

const seoData = {
  slug: 'python-playground',
  title: 'Python Playground Online — 29 Interactive Lessons, Beginner to Pro',
  subtitle: 'Step through 29 Python lessons across 14 chapters — from Basics, Loops, and Functions to Comprehensions, Generators, Decorators, Type Hints, and Testing. Watch memory, call stack, and output update on every line.',
  about: {
    title: 'Learn Python by Watching Code Execute One Line at a Time',
    description: `Python is friendly to read, but beginners still get stuck on the invisible parts: when a variable changes, which branch runs, what a loop variable points to, and what return sends back to the caller. This **Python Playground** turns those invisible steps into a visual trace.

Choose a lesson, edit the safe Python code pattern or the structured inputs, press Run Trace, or step manually. The parser accepts supported beginner edits, the source line highlights, memory diff badges show what was added or changed, the call stack changes, and the console prints only when the code reaches \`print()\`. Each lesson includes a small validation challenge, such as changing a score so the grade becomes A or adding another item to a loop. The goal is not to run arbitrary Python in the browser. The goal is to teach the execution model clearly before learners move into a full Python environment.

The curriculum now spans 29 lessons across 14 chapters and takes you from beginner to pro. The foundations cover the Python basics people search for most often: variables, strings, numbers, booleans, \`print()\`, \`if / elif / else\`, comparison logic, loops, lists, dictionaries, function parameters, return values, classes, \`try / except\`, and JSON parsing. The professional chapters then visualize the features that usually trip up intermediate learners: **comprehensions** (list, dict, and set), **iterators and generators** (how \`yield\` pauses and resumes a function lazily, plus generator expressions), **decorators** (how \`@decorator\` wraps a function), **type hints** (and why they do not change runtime behaviour), **advanced functions** (\`*args\`/\`**kwargs\`, closures and \`nonlocal\`), **functional tools** (\`map\`, \`filter\`, \`lambda\`), **testing** with \`assert\`, and an **async/await** ordering overview. It is useful as a first Python tutorial, a classroom tool, an interview warm-up, and a way to finally *see* how advanced Python actually executes.

### Why Learn Python?

Python is consistently one of the most popular and most beginner-friendly programming languages, and for good reason. Its clean, readable syntax lets you focus on solving problems instead of fighting the language. It is the dominant language for **data science, machine learning, and AI**, and it is widely used for **web backends, automation and scripting, DevOps, and testing** — so the skills open doors across many industries. A massive standard library and the PyPI package ecosystem mean most tasks already have a well-maintained library, and Python's gentle learning curve makes it an ideal first language that still scales to professional work. This playground is built to carry you across that whole range: start with your first variable and finish by understanding generators, decorators, and tests the way a professional does.

Because the playground is intentionally browser-only, it avoids the security and reliability problems of executing arbitrary backend code. Instead, the editable inputs regenerate supported examples and deterministic traces. Learners still get active practice: change the inputs, predict the output, run the trace, inspect memory, and complete the challenge.

For web development fundamentals after Python, pair this with the [JavaScript Playground](/js-playground/), [Node.js Playground](/nodejs-playground/), [SQL Playground](/sql-playground/), and [REST API Builder Playground](/rest-api-builder-playground/).`,
  },
  features: softwareSchema.featureList,
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Choose a Python lesson', text: 'Pick variables, conditionals, loops, dictionaries, functions, or files and JSON from the sidebar.' },
      { title: 'Edit the safe inputs', text: 'Change lesson values such as name, score, task list, role, tax rate, or JSON version. The code and trace update from those supported inputs.' },
      { title: 'Run or step through the trace', text: 'Use Run Trace for an automatic walkthrough, or Step to move through one Python statement at a time.' },
      { title: 'Watch memory and output', text: 'The right panel shows variables, values, call stack frames, and console output as each highlighted line runs.' },
      { title: 'Complete the challenge', text: 'Use the challenge card to make a target change, then rerun the trace to see how the output changes.' },
      { title: 'Use the practice prompt', text: 'Each lesson ends with a small prediction prompt so learners can change the example mentally before writing real code.' },
    ],
  },
  useCases: [
    { icon: 'CODE', title: 'Learn Python execution order', desc: 'See exactly how Python moves from line to line and when variables change.' },
    { icon: 'DATA', title: 'Understand data types and structures', desc: 'Trace strings, numbers, lists, dictionaries, JSON-like data, and printed output through focused examples.' },
    { icon: 'TABS', title: 'Teach loops and dictionaries visually', desc: 'Show list iteration, dictionary reads, and updates without relying on static slides.' },
    { icon: 'SYNC', title: 'Explain functions and return values', desc: 'Use the stack view to show function calls, local variables, and returned values.' },
    { icon: 'API', title: 'Introduce file and API data', desc: 'Use mocked text and JSON parsing examples to explain how Python handles structured data from files or APIs.' },
    { icon: 'LEARN', title: 'Practice with validation challenges', desc: 'Use each challenge card to make a target output happen and confirm the concept was understood.' },
    { icon: 'PRO', title: 'See how advanced Python executes', desc: 'Step through generators, decorators, closures, type hints, and testing to finally understand the features that separate intermediate from professional Python. Pair with the [JavaScript Playground](/js-playground/) to compare language models.' },
    { icon: 'SAFE', title: 'Run beginner-safe demos', desc: 'The playground uses deterministic traces and does not execute arbitrary backend code.' },
  ],
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text,
  })),
};

export default function PythonPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <PythonPlaygroundTool />
      </div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} noShare /></IndexOnly>
    </div>
  );
}
