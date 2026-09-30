import ReactPlaygroundTool from '@/components/ReactPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'React Playground — Learn React Visually, 68 Lessons Free | webdevpuneet.com',
  description: 'Free React playground — no install, no signup. 68 lessons: JSX, hooks, TypeScript, testing, patterns, i18n, GSAP. Live editor, instant preview. Beginner to pro.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/react-playground/' },
  icons: { icon: '/icons/react-playground.svg', shortcut: '/icons/react-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/react-playground/',
    siteName: 'webdevpuneet.com',
    title: 'React Playground — Learn React Visually, 68 Lessons Free',
    description: 'Free React playground — no install, no signup. 68 lessons from JSX to TypeScript, testing, and GSAP. Live editor with instant preview. Beginner to pro.',
    images: [{ url: 'https://webdevpuneet.com/images/react-playground.png', width: 1200, height: 630, alt: 'Interactive React Playground — Learn React Visually' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'React Playground — Learn React Visually, 68 Lessons Free',
    description: 'Write JSX, see it live. 68 lessons from beginner to pro — hooks, TypeScript, testing, i18n, GSAP, patterns. Free, no install, no signup. Progress saved in browser.',
    images: ['https://webdevpuneet.com/images/react-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How does useState work in React?', acceptedAnswer: { '@type': 'Answer', text: 'useState returns a pair: the current value and a setter function. Call the setter with a new value and React re-renders the component with the updated state. The playground covers useState with numbers, strings, and objects — you can edit the live examples to see exactly how state triggers re-renders.' } },
    { '@type': 'Question', name: 'How does useEffect work in React?', acceptedAnswer: { '@type': 'Answer', text: 'useEffect runs a side effect after React updates the DOM. The dependency array controls when it re-runs: empty array means once on mount, specific values mean re-run when those values change, no array means every render. Always return a cleanup function for timers, subscriptions, and event listeners.' } },
    { '@type': 'Question', name: 'What is the difference between useMemo and useCallback?', acceptedAnswer: { '@type': 'Answer', text: 'useMemo memoises a computed value. useCallback memoises a function reference. Both prevent unnecessary recalculations or re-renders. useCallback is most useful when passing callbacks to React.memo-wrapped child components.' } },
    { '@type': 'Question', name: 'When should I use useReducer instead of useState?', acceptedAnswer: { '@type': 'Answer', text: 'useReducer is better for complex state with multiple related values, when next state depends on previous in non-trivial ways, or when you want to centralise update logic. Define a reducer function taking (state, action) and dispatch action objects.' } },
    { '@type': 'Question', name: 'How does useContext work in React?', acceptedAnswer: { '@type': 'Answer', text: 'useContext reads a value from a React Context without prop drilling. Create context with createContext(), wrap a subtree in Provider, then call useContext(YourContext) in any descendant. Best for theme, auth, and locale data.' } },
    { '@type': 'Question', name: 'How do I handle forms in React?', acceptedAnswer: { '@type': 'Answer', text: 'Controlled inputs bind value to state with onChange — React controls the input at every keystroke. Uncontrolled inputs use a ref to read the value only on submit. The playground covers both patterns with working examples.' } },
    { '@type': 'Question', name: 'How does React handle async data fetching?', acceptedAnswer: { '@type': 'Answer', text: 'Use useEffect with an async function, a loading/error/data state, and AbortController for cancellation. Always handle unmount cleanup to prevent state updates on unmounted components.' } },
    { '@type': 'Question', name: 'Do I need to install Node.js or npm to use the React Playground?', acceptedAnswer: { '@type': 'Answer', text: 'No. The React Playground runs entirely in your browser using React 18 and Babel standalone loaded from CDN. There is nothing to install — no Node.js, no npm, no terminal. Open the page and start writing React code immediately.' } },
    { '@type': 'Question', name: 'Do I need to know JavaScript before learning React?', acceptedAnswer: { '@type': 'Answer', text: 'A basic understanding of JavaScript helps — variables, functions, arrays, and objects. The playground starts with JSX basics and builds up gradually. Each lesson explains the concept in plain English before showing the code, so even beginners with minimal JS experience can follow along.' } },
    { '@type': 'Question', name: 'What React topics does the playground cover?', acceptedAnswer: { '@type': 'Answer', text: 'The playground covers 68 lessons across 26 chapters from beginner to pro: JSX Basics, Components, Props, State, Events, Forms, Lists & Conditionals, Hooks, Patterns, Data & Async, Performance, Advanced Hooks, Advanced Patterns, Patterns & Architecture, Error Handling & Testing, Portals, Suspense & Concurrent, Accessibility, Performance & Debugging, TypeScript with React, GSAP in React, Styling in React, Beginner Patterns, Real-World Patterns, Testing, and Internationalisation.' } },
    { '@type': 'Question', name: 'Can I edit the code in each lesson?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every lesson has a fully editable code editor. The preview updates automatically 300ms after you stop typing — no need to press Run or Refresh. You can experiment freely with the code. Use the Reset button to restore the original lesson code if you want to start over.' } },
    { '@type': 'Question', name: 'What are the picker lessons?', acceptedAnswer: { '@type': 'Answer', text: 'Picker lessons show multiple code variants for the same concept — for example, three different approaches to conditional rendering. Click a variant button to load that code into the editor and see it render live. You can then edit the code to explore further.' } },
    { '@type': 'Question', name: 'Is my progress saved if I close the browser?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Both your completed lessons and your current position are saved to your browser\'s localStorage. When you return to the page you will be placed on the exact lesson you were viewing. No login or account is required — everything is stored locally on your device.' } },
    { '@type': 'Question', name: 'Can I use import statements in the editor?', acceptedAnswer: { '@type': 'Answer', text: 'Import statements are automatically stripped before the code runs — React, ReactDOM, and all hooks (useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, createContext) are already available as globals. Just write your components and define a function named App as the root component.' } },
    { '@type': 'Question', name: 'How do errors appear in the playground?', acceptedAnswer: { '@type': 'Answer', text: 'Syntax errors caught by Babel (like invalid JSX or missing brackets) show in a red error bar below the editor with the exact error message. React runtime errors (thrown during rendering) are caught by an error boundary and shown in the preview area. Fix the code and the preview updates automatically.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'React Playground',
  url: 'https://webdevpuneet.com/react-playground/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Interactive React learning tool with 68 lessons across 26 chapters — beginner to pro. Live code editor with JSX syntax highlighting and instant preview powered by React 18 and Babel standalone. No install required.',
  featureList: [
    '68 lessons across 26 chapters covering React from JSX basics through TypeScript, testing, i18n, and production patterns',
    'Live code editor with JSX syntax highlighting — keywords, hooks, tags, and components coloured',
    'React 18 + Babel standalone — full JSX support, no build step',
    'Draggable split handle to resize editor and preview panes',
    'Quick Check multiple-choice challenges on 9 key lessons',
    'Console panel captures console.log, warn, and error output from the preview',
    'Picker variants for comparing different approaches side by side',
    'Error line highlight — gutter turns red at the line Babel reports',
    'Download current code as a .jsx file; Share encodes code in the URL',
    'Ctrl+Enter to force-run code immediately',
    'Dark mode sync — preview matches the app theme',
    'Lesson search to filter the sidebar by title or chapter',
    'Progress and position saved to localStorage — no account needed',
    'Confetti on chapter completion',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'React Playground', item: 'https://webdevpuneet.com/react-playground/' },
  ],
};

const SEO = {
  slug: 'react-playground',
  title: 'React Playground — Learn React Visually, 68 Lessons Free',
  about: {
    title: 'Learn React from Zero to Production — 68 Lessons, No Install Required',
    description: `Most people trying to learn React hit a wall before writing their first component — Node.js installation, npm commands, Vite setup, a terminal, a code editor. This React Playground removes every barrier. Open it in your browser and start writing JSX immediately. React 18 and Babel compile your code right there in the tab, with a live preview that updates as you type.\n\nThe playground covers **68 lessons across 26 chapters** — a complete curriculum from absolute beginner through production-level React.\n\n**Beginner (27 lessons)** — JSX basics, function components, props and children, useState with strings and objects, click events, form handling, controlled and uncontrolled inputs, rendering lists, conditional rendering, dynamic lists, keys, useEffect with cleanup, useRef, custom hooks, styling approaches (inline, className, Tailwind), loading states, debugging techniques, and common beginner bugs.\n\n**Intermediate (29 lessons)** — Lifting state up, component composition, data fetching with loading/error/success states, useMemo, useCallback, React.memo, useContext, useReducer, useId, useDeferredValue, optimistic updates, portals and modals, Suspense and lazy loading, useTransition, error boundaries, accessibility patterns, skeleton loading, responsive patterns, real-world API patterns with AbortController and pagination, and state management at scale (Zustand pattern).\n\n**Pro (12 lessons)** — Compound components, render props, higher-order components, state machines with useReducer, React DevTools profiling, TypeScript prop types, advanced TypeScript patterns (discriminated unions and generic components), testing strategy (unit and component tests), internationalisation with Intl formatters, and GSAP animations in React (tweens, timelines, ScrollTrigger).\n\n<table><thead><tr><th>Chapter</th><th>Level</th><th>Lessons</th></tr></thead><tbody><tr><td>JSX Basics</td><td>🟢 Beginner</td><td>4</td></tr><tr><td>Components</td><td>🟢 Beginner</td><td>2</td></tr><tr><td>Props</td><td>🟢 Beginner</td><td>3</td></tr><tr><td>State</td><td>🟢 Beginner</td><td>3</td></tr><tr><td>Events</td><td>🟢 Beginner</td><td>2</td></tr><tr><td>Forms</td><td>🟢 Beginner</td><td>2</td></tr><tr><td>Lists &amp; Conditionals</td><td>🟢 Beginner</td><td>4</td></tr><tr><td>Hooks</td><td>🟢 Beginner</td><td>3</td></tr><tr><td>Styling in React</td><td>🟢 Beginner</td><td>1</td></tr><tr><td>Beginner Patterns</td><td>🟢 Beginner</td><td>3</td></tr><tr><td>Patterns</td><td>🟡 Intermediate</td><td>2</td></tr><tr><td>Data &amp; Async</td><td>🟡 Intermediate</td><td>1</td></tr><tr><td>Performance</td><td>🟡 Intermediate</td><td>3</td></tr><tr><td>Advanced Hooks</td><td>🟡 Intermediate</td><td>13</td></tr><tr><td>Real-World Patterns</td><td>🟡 Intermediate</td><td>4</td></tr><tr><td>Error Handling &amp; Testing</td><td>🟡 Intermediate</td><td>2</td></tr><tr><td>Portals</td><td>🟡 Intermediate</td><td>1</td></tr><tr><td>Suspense &amp; Concurrent</td><td>🟡 Intermediate</td><td>2</td></tr><tr><td>Accessibility &amp; Patterns</td><td>🟡 Intermediate</td><td>1</td></tr><tr><td>Advanced Patterns</td><td>🔴 Pro</td><td>2</td></tr><tr><td>Patterns &amp; Architecture</td><td>🔴 Pro</td><td>2</td></tr><tr><td>Performance &amp; Debugging</td><td>🔴 Pro</td><td>1</td></tr><tr><td>TypeScript with React</td><td>🔴 Pro</td><td>2</td></tr><tr><td>Testing</td><td>🔴 Pro</td><td>1</td></tr><tr><td>Internationalisation</td><td>🔴 Pro</td><td>1</td></tr><tr><td>GSAP in React</td><td>🔴 Pro</td><td>3</td></tr></tbody></table>\n\nThe code editor has JSX syntax highlighting — keywords, hooks, HTML tags, and React component names each appear in a distinct colour, exactly as in VS Code. A draggable handle lets you resize the editor and preview panes to your preferred ratio. Key lessons end with a Quick Check multiple-choice challenge to test recall — active retrieval has been shown to double long-term retention compared to passive reading alone. A console panel below the preview captures console.log, console.warn, and console.error output so you can inspect values without opening browser DevTools.\n\nProgress saves automatically to your browser's localStorage. Close the tab, come back tomorrow, come back in three weeks — your completed lessons and current position are exactly where you left them. No account, no login, no email address required. Every lesson is free, every chapter is free, and the playground will always be free.\n\nOnce you are comfortable with React, the [JavaScript Playground](/js-playground/) covers the underlying language in 60 lessons, and the [TypeScript Playground](/typescript-playground/) adds static typing in 32 lessons — both are free with no install. If you are a freelance React developer, the [Freelance Rate Calculator](https://fwdtools.com/freelance-rate-calculator/) helps you price React projects correctly, and the [Freelance Invoice Generator](https://fwdtools.com/freelance-invoice-generator/) handles client billing — both run entirely in your browser with no sign-up. For longer, example-driven walkthroughs of specific React concepts, see the [React tutorials on webdevpuneet.com](https://www.webdevpuneet.com/search/label/React).

### The Main Purpose of React — Why It's Used

The main purpose of React is to **simplify the development of dynamic, fast, and interactive user interfaces**, primarily for single-page web applications. It achieves this by shifting developers away from manual, complex DOM manipulation toward a predictable, state-driven model — you describe what the UI should look like for a given state, and React figures out the minimum set of DOM updates needed to get there.

**Core Technical Pillars**

**Component-Based Architecture** — React breaks the UI into modular, self-contained, and reusable code blocks called components. A navigation bar, a button, a form field, a data table — each is a component that can be developed, tested, and reused independently across the application. This composability is why large React codebases stay manageable at scale: each component has a single responsibility and a clear interface (props).

**Declarative UI Model** — Developers describe how the UI should look for any given state instead of writing manual execution steps. In traditional JavaScript you write imperative instructions: find the element, change its text, toggle a class. In React you write a render function that says "given this data, this is what the UI looks like" — and React handles the how. This makes UI code dramatically easier to reason about, debug, and test.

**Virtual DOM** — React maintains an in-memory UI representation called the virtual DOM. When state changes, React calculates the difference between the previous and next virtual DOM trees and updates only the changed browser DOM elements. Direct DOM manipulation is one of the slowest operations in a browser — the virtual DOM reconciliation engine minimises it, which is why React UIs feel fast even with frequent state changes.

**Unidirectional Data Flow** — Data passes exclusively downward from parent to child components via props. This one-way data flow establishes predictable application behaviour: you always know where a piece of data comes from and which components it can reach. Debugging state bugs is far simpler when data cannot flow in arbitrary directions.

**Key Benefits**

**Code Reusability** — Component architecture speeds up development cycles by eliminating repeated interface code. A \`Button\` component, a \`Modal\`, a \`DataTable\` — write once, use everywhere, style consistently.

**High Performance** — The virtual DOM reconciliation engine minimises slow direct browser DOM interactions. React batches updates, defers non-urgent renders with \`useTransition\`, and allows fine-grained memoisation with \`useMemo\` and \`React.memo\` so components only re-render when their data actually changes.

**Target Flexibility** — Skills transfer cleanly from building web apps with ReactDOM to crafting native mobile applications using React Native. The same component model, the same hooks API, the same mental model — applied to iOS and Android instead of the browser. React has also expanded to server rendering (Next.js), desktop (Electron with React), and even terminal UIs (Ink).

### React Hooks Explained — With Live Examples

React hooks are functions that let you use state and other React features inside function components. The playground covers every hook in the standard library with working, editable examples.

**useState** is the first hook every React developer learns. It adds a piece of state to a component and returns the current value plus a setter function. When you call the setter, React re-renders the component with the new value. The playground teaches useState with three progressive examples: a numeric counter (the simplest case), a controlled text input (string state with immediate feedback), and an object state (showing why you must spread the old state instead of mutating it). You can edit each example live and see precisely what triggers a re-render.

**useEffect** is one of the most searched React topics — and also one of the most misunderstood. It handles side effects — things that need to happen outside the React render cycle: fetching data, setting up subscriptions, updating the document title, starting timers, and adding event listeners. The dependency array is the key: an empty array runs the effect once on mount, a filled array re-runs it when any dependency changes, and no array runs it after every render. The cleanup function (returned from the effect) runs before the next effect and on unmount, preventing memory leaks. A missing dependency in the array causes stale closures — one of the most common React bugs. Putting a state setter inside the effect with that state in the deps array causes an infinite loop — the effect runs, updates state, which triggers the effect again. The playground shows how to spot and fix both issues. The playground covers useEffect with a real timer cleanup example and a document title tracker — both editable so you can see what happens when you remove the cleanup.

**useRef** serves two distinct purposes that beginners often confuse. First: accessing a DOM element directly (focus, measure, scroll). Second: storing a mutable value that persists across renders without triggering a re-render — perfect for tracking render counts, animation state, and previous values. The playground shows both uses side by side.

**Custom hooks** are how React developers share stateful logic between components without duplicating code. A custom hook is just a function that starts with "use" and calls other hooks. The playground shows how to build \`useCounter\` (reusable counter logic) and \`useLocalStorage\` (persistent state backed by localStorage) — patterns that appear in almost every production React codebase.

**useMemo** memoises an expensive calculation so it only recomputes when its inputs change. Without it, the calculation runs on every render even if nothing relevant changed. The playground demonstrates filtering a list of items — with useMemo, the filter only runs when the search query or the list changes, not when a completely unrelated state update triggers a re-render. The rule that experienced React developers follow: profile first, add useMemo only when you measure an actual performance problem.

**useCallback** memoises a function reference so it stays stable across renders. This matters when you pass a callback to a child component wrapped in \`React.memo\` — without useCallback, the child re-renders every time the parent renders because a new function object is created each time. The playground demonstrates this with a side-by-side comparison of memoised and non-memoised children to show the exact re-render count difference.

**useContext** solves prop drilling — the pattern where you pass a value through many component levels just to reach one deeply nested component that needs it. Create a context with createContext, wrap a subtree in the Provider, and call useContext in any descendant to read the current value. The playground covers a theme switcher using context, showing how to change a value at the top of the tree and have it propagate to any depth without manual prop passing.

**useReducer** is an alternative to useState for complex state logic. Instead of multiple setState calls that can get out of sync, you dispatch action objects and a single reducer function handles all state transitions. The pattern enforces consistency — impossible states become impossible when all transitions go through one function. The playground covers a shopping cart with ADD, REMOVE, and CLEAR actions, showing how reducers make complex state predictable and testable.

### React Patterns Every Developer Should Know

Beyond hooks, the playground teaches the component patterns that appear in every serious React codebase.

**Getting started with React** is easier here than anywhere else — no project setup, no terminal, no package.json. Just open the playground and write your first component in seconds.\n\n**Lifting state up** is the fundamental React data flow pattern: when two sibling components need to share state, move that state to their closest common parent and pass it down as props. The playground shows a temperature converter where two inputs stay in sync through a shared parent — the canonical React example for this pattern.

**Compound components** are a pattern for building flexible UI components where the parent and children share implicit state through context. Think of how HTML select and option work together — neither works without the other, but you can arrange options however you like. The playground implements a Tab component using this pattern.

**Render props** and **higher-order components (HOCs)** are pre-hooks patterns for sharing component logic that you will still encounter in older codebases and some libraries. The playground covers both with practical examples and explains when to use hooks instead.

**Error boundaries** are class components that catch JavaScript errors in their child component tree and display a fallback UI instead of crashing the entire app. They are the React equivalent of try/catch for render errors. The playground shows the required getDerivedStateFromError and componentDidCatch lifecycle methods with a realistic error simulation.

**React.lazy and Suspense** enable code splitting — loading component bundles only when they are needed, reducing the initial bundle size. The playground demonstrates the lazy import pattern and the Suspense fallback prop that shows while the component loads.

### React Performance Optimisation

React re-renders a component whenever its state or props change. Understanding when and why components re-render is the key to building fast React applications.

**React hooks cheat sheet** — all hooks available in the playground as globals: useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, useId, useTransition, useDeferredValue, useLayoutEffect, useDebugValue, and useSyncExternalStore. Each has at least one dedicated lesson.\n\n**React.memo** wraps a component to prevent re-renders when its props have not changed. Without it, a child re-renders every time the parent renders. The playground shows the render count difference between a memoised and non-memoised child component — the effect becomes visible when you click a counter in the parent.

**useTransition** marks a state update as non-urgent, allowing React to defer it while keeping the UI responsive to higher-priority interactions. The playground demonstrates filtering a large list — without useTransition, typing in the search box feels sluggish because React processes both the input update and the expensive filter synchronously. With useTransition, the input updates instantly and the filter catches up.

**useDeferredValue** is similar to useTransition but works on a value rather than a state update. It is useful when you receive a value from a parent component and want to defer expensive child renders without changing the parent.

### Advanced React Hooks

**forwardRef** lets a parent component pass a ref down through a child component to a DOM element inside it. Without it, refs stop at the component boundary. The playground covers forwardRef with a reusable input component that exposes its underlying DOM node to the parent — a pattern essential for any UI library.

**useImperativeHandle** (used with forwardRef) lets a child component expose a custom API to its parent via a ref — instead of the raw DOM node, you expose specific methods like focus() and clear(). This gives fine-grained control over what the parent can do with the ref.

**useSyncExternalStore** safely subscribes React components to external state stores (like Redux, Zustand, or browser APIs) without tearing in concurrent mode. It is the hook that state management libraries use internally. The playground demonstrates building a minimal Zustand-style store with this hook.

**useDebugValue** adds a label to custom hooks in React DevTools. When you inspect a component using your custom hook, DevTools shows the label next to the hook name — making it easy to see its current state at a glance during debugging. It has no effect in production.

### React with TypeScript

TypeScript and React are used together in most modern production projects. TypeScript catches type errors at compile time — wrong prop types, missing required props, incorrect event handler signatures — before they become runtime bugs.

The playground covers TypeScript prop typing with interfaces, event types (React.ChangeEvent, React.FormEvent, React.MouseEvent), and advanced patterns like discriminated unions for state — where the TypeScript type narrows based on a status field so impossible states become type errors. Generic components that work with any data type while staying fully type-safe are also demonstrated with working examples you can edit and run immediately.`,
  },
  features: [
    { title: '68 Lessons — Beginner to Pro', text: 'Complete React curriculum across 26 chapters: JSX and components, all hooks, performance patterns, TypeScript, testing, internationalisation, state management at scale, and GSAP animations.' },
    { title: 'Live Editor — No Run Button', text: 'The preview updates automatically 300ms after you stop typing. Press Ctrl+Enter to run immediately. Write code, see the result — no extra step, no refresh.' },
    { title: 'JSX Syntax Highlighting', text: 'The editor colours keywords, React hooks, HTML tags, component names, strings, and comments — same colour scheme used in VS Code themes.' },
    { title: 'Quick Check Challenges', text: 'Key lessons end with a multiple-choice question testing recall — click an answer, see immediately if you are right, try again if not. Active recall doubles long-term retention.' },
    { title: 'Console Panel', text: 'Toggle a console panel below the preview that captures console.log, console.warn, and console.error output — inspect values without leaving the playground.' },
    { title: 'Picker Variants', text: 'Picker lessons show multiple approaches to the same concept — e.g. three ways to write conditional rendering. Click each variant to load it and see how it renders.' },
    { title: 'Error Line Highlight', text: 'When Babel catches a syntax error, the gutter turns red at the exact line so you find the problem instantly without reading the full error message.' },
    { title: 'Download and Share', text: 'Download your current code as a .jsx file, or copy a share link that encodes the code into the URL — paste it to anyone and they open your exact code.' },
    { title: 'Progress Tracking + Confetti', text: 'Completed lessons save to your browser. Finishing the last lesson in any chapter triggers a confetti burst. No account needed — everything is local.' },
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Pick a lesson from the sidebar', text: 'The left sidebar lists all 26 chapters and 68 lessons across beginner, intermediate, and pro levels. Use the search box to jump to any lesson by name. Click a lesson to load it, or use Previous and Next at the bottom to work through in order. Completed lessons show a filled dot.' },
      { title: 'Read the concept explanation', text: 'Each lesson opens with a plain-English explanation of what the concept does, when to use it, and why it matters. It is written for humans, not documentation readers. Read it once, then look at the code.' },
      { title: 'Experiment in the editor', text: 'The left panel is a fully editable code editor. The preview on the right updates automatically as you type — 300ms after you stop, so it never interrupts mid-keystroke. Use Tab to indent. Press Reset in the editor header to restore the original lesson code at any time.' },
      { title: 'Switch picker variants', text: 'On picker lessons you will see variant buttons above the editor — for example "if statement", "&& operator", "ternary ? :". Click each to load that approach into the editor and see how it renders. The note below the buttons explains the tradeoff.' },
      { title: 'Check the console and error bar', text: 'Toggle the Console panel on the preview header to see console.log output from your code. Syntax errors show in a red bar below the editor — the gutter highlights the exact line number. Fix the code and the error clears automatically.' },
      { title: 'Take the Quick Check challenge', text: 'On nine key lessons, a multiple-choice Quick Check appears below the editor after you have worked through the code. Click the answer you think is correct — green means right, red means wrong with the correct answer shown. Active recall like this doubles long-term retention compared to passive reading.' },
      { title: 'Mark Done and track progress', text: 'Click Mark Done when you understand the lesson. It marks it complete in the sidebar and advances to the next one. Completing the last lesson in a chapter triggers a confetti burst. Your progress saves to localStorage automatically — close the tab and return to exactly where you left off, no account required.' },
    ],
  },
  useCases: [
    { icon: '🌱', title: 'JavaScript Developers Learning React', desc: 'If you know JavaScript and want to add React to your skill set, this playground gives you a structured path from the first JSX element through hooks and patterns. No toolchain setup — start learning in the time it takes to open a browser tab.' },
    { icon: '🎓', title: 'Students Following a React Course', desc: 'Use the playground alongside any React course or bootcamp. When your instructor introduces a concept, jump to the matching lesson here and interact with working code immediately. Seeing it run cements understanding faster than re-reading notes.' },
    { icon: '🔄', title: 'Developers Refreshing React Knowledge', desc: 'Forget the exact signature for useEffect cleanup, or how lifting state up works? Jump to the relevant lesson, read the concept, and edit the live example. Get a working reminder in under two minutes without opening MDN or Stack Overflow.' },
    { icon: '🎨', title: 'Designers Understanding React Code', desc: 'If you work alongside React developers and want to read component code, this playground shows you what props, children, and state actually do in a rendered UI. No jargon — just the concept explained, the code shown, and the result visible.' },
    { icon: '🏫', title: 'Teachers Demonstrating React Live', desc: 'The playground works as a classroom demo tool. Load a lesson, explain the concept, then edit the code live in front of students and show the result update in real time. No local project needed — works on any machine with a browser.' },
    { icon: '🧪', title: 'Quick Experiments Without a Project', desc: 'Need to test whether a React pattern does what you think? Open the sandbox, write the component, and see the result in seconds. Faster than spinning up a Vite project for a one-off test.' },
  ],
  faqs: [
    { q: 'Do I need to install Node.js or npm to use the React Playground?', a: 'No. The React Playground runs entirely in your browser using React 18 and Babel standalone loaded from CDN. There is nothing to install — no Node.js, no npm, no terminal. Open the page and start writing React code immediately.' },
    { q: 'Do I need to know JavaScript before learning React?', a: 'A basic understanding of JavaScript helps — variables, functions, arrays, and objects. The playground starts with JSX basics and builds up gradually. Each lesson explains the concept in plain English before showing the code, so even beginners with minimal JS experience can follow along.' },
    { q: 'What React topics does the playground cover?', a: 'The playground covers 68 lessons across 26 chapters from beginner to pro: JSX, components, props, state, events, forms, lists, conditionals, hooks, styling, loading states, debugging, data fetching, performance (useMemo, useCallback, React.memo), all advanced hooks, real-world API patterns, state management, TypeScript, testing, internationalisation, accessibility, GSAP animations, and production architecture patterns.' },
    { q: 'Can I edit the code in each lesson?', a: 'Yes. Every lesson has a fully editable code editor. The preview updates automatically 300ms after you stop typing. Experiment freely with the code — use the Reset button to restore the original lesson code if you want to start over.' },
    { q: 'What are the picker lessons?', a: 'Picker lessons show multiple code variants for the same concept — for example, three different ways to write conditional rendering. Click a variant button to load that code and see it render live. You can then edit it to explore further.' },
    { q: 'Is my progress saved if I close the browser?', a: 'Yes. Completed lessons and your current position are saved to your browser\'s localStorage. When you return to the page you will be placed on the exact lesson you were viewing. No login or account is required — everything is stored locally on your device.' },
    { q: 'Can I use import statements in the editor?', a: 'Import statements are automatically stripped before the code runs — React and all hooks (useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, createContext) are already available as globals. Just write your components and define a function named App as the root.' },
    { q: 'How do errors appear in the playground?', a: 'Babel syntax errors (invalid JSX, missing brackets) show in a red error bar below the editor with the exact message. React runtime errors are caught by an error boundary and shown in the preview. Fix the code and the preview updates automatically.' },
    { q: 'Can I use this playground on a phone or tablet?', a: 'Yes, the layout is responsive. On smaller screens the sidebar collapses and the editor and preview stack vertically. The playground is usable on tablets, though a larger screen gives more comfortable space for the editor and preview side by side.' },
    { q: 'What is the difference between this and CodeSandbox or StackBlitz?', a: 'CodeSandbox and StackBlitz are full development environments for building complete projects. This playground is focused on learning — each lesson teaches one concept with a minimal working example, a plain-English explanation, and guided progression from basics to patterns. It is optimised for understanding, not for building production apps.' },
    { q: 'Why does React warn about missing keys in lists?', a: 'When you render a list with .map(), React needs a stable key prop on each element to track which items changed, were added, or were removed. Without keys, React re-renders the entire list on every change. Use a unique, stable ID from your data (like item.id) — never use the array index as a key if the list can reorder or filter, because the index changes and React loses track of which item is which. The playground covers keys in the Lists & Conditionals chapter with a side-by-side comparison of stable keys vs index keys.' },
    { q: 'How do I get started with React with no setup?', a: 'Open this React Playground in your browser. No Node.js, no npm, no terminal, no install required. React 18, Babel, and all hooks are pre-loaded. The first lesson (Hello JSX) shows you your first component in under a minute. Work through the 68 lessons at your own pace — progress saves automatically to your browser.' },
    { q: 'How does useState work in React?', a: 'useState is React\'s hook for adding state to a function component. It returns a pair: the current value and a setter function. Call the setter with a new value and React re-renders the component with the updated state. The playground covers useState across 3 lessons — with numbers (counter), strings (controlled input), and objects (spread to avoid mutation). You can edit the live examples to see exactly how state triggers re-renders.' },
    { q: 'How does useEffect work in React?', a: 'useEffect runs a side effect after React updates the DOM. The dependency array controls when it re-runs: empty array means once on mount, specific values mean re-run when those values change, no array means every render. The cleanup function (return value) runs before the next effect and on unmount — essential for clearing timers, cancelling fetch requests, and removing event listeners. The playground has 3 useEffect examples including a timer with cleanup and a document title updater.' },
    { q: 'What is the difference between useEffect and useLayoutEffect?', a: 'useEffect runs after the browser has painted — it is asynchronous and does not block the visual update. useLayoutEffect runs synchronously after React updates the DOM but before the browser paints — use it when you need to measure or mutate the DOM before the user sees the result (like positioning a tooltip). For most side effects including data fetching, subscriptions, and timers, useEffect is the right choice. useLayoutEffect is covered in the Advanced Hooks chapter.' },
    { q: 'When should I use useReducer instead of useState?', a: 'useReducer is better than useState when state logic is complex — multiple related values that update together, next state depends on previous state in non-trivial ways, or you want to centralise update logic for easier testing. The pattern: define a reducer function that takes (state, action) and returns the new state, then dispatch action objects. The playground covers useReducer with a shopping cart example showing ADD, REMOVE, and CLEAR actions.' },
    { q: 'How does useContext work and when should I use it?', a: 'useContext lets you read a value from a React Context without passing it as a prop through every component in between — solving "prop drilling". Create a context with createContext(), wrap a subtree in Provider with a value prop, then call useContext(YourContext) in any descendant to read it. The playground covers useContext with a theme switcher example. For large apps with frequent context updates, consider a dedicated state library like Zustand instead.' },
    { q: 'What is useMemo and when should I use it?', a: 'useMemo memoises an expensive computation so it only re-runs when its dependencies change. Without it, the calculation runs on every render even if the inputs are the same. The playground shows filtering a large list — with useMemo it only refilters when the query or list changes, not when unrelated state changes. The rule: profile first, add useMemo when you measure an actual performance problem, not as a default.' },
    { q: 'What is the difference between useMemo and useCallback?', a: 'useMemo memoises a computed value. useCallback memoises a function reference. Both exist for performance optimisation. useCallback is useful when you pass a callback to a child component wrapped in React.memo — without it, the child re-renders every time the parent does because a new function object is created on each render. The playground demonstrates both with and without React.memo to show the practical difference.' },
    { q: 'How do I handle forms in React?', a: 'React has two form patterns. Controlled inputs: bind the input value to state with onChange — React controls the input at every keystroke, letting you validate, format, and submit from state. Uncontrolled inputs: use a ref to read the value only when needed (e.g. on submit) — simpler for basic forms with no live validation. The playground covers both patterns with working form examples you can edit and experiment with.' },
    { q: 'How does React handle async data fetching?', a: 'The standard pattern: use a useEffect with an async function inside it, a boolean flag to prevent state updates after unmount, and three state values for loading/data/error. AbortController cancels in-flight requests when the component unmounts or dependencies change. The playground covers data fetching with real loading and error states, AbortController for cancellation, and pagination patterns — all with live working examples.' },
    { q: 'How does TypeScript work with React components?', a: 'TypeScript adds static types to React props, state, event handlers, and hooks — catching bugs at compile time instead of runtime. Define props with an interface or type alias, type event handlers with React.ChangeEvent<HTMLInputElement> and React.FormEvent<HTMLFormElement>, and use generics for reusable components that work with any data type. The playground covers TypeScript prop types and advanced patterns like discriminated unions for state.' },
  ],
};

export default function ReactPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <ReactPlaygroundTool />
      </div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
