import VuePlaygroundTool from '@/components/VuePlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Vue.js Playground — Learn Vue.js Visually, 40 Lessons Free | webdevpuneet.com',
  description: 'Learn Vue 3 online with 40 guided lessons — Options API, Composition API, components, composables, and mini-projects. Live preview, free, no install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/vue-playground/' },
  icons: { icon: '/icons/vue-playground.svg', shortcut: '/icons/vue-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/vue-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Vue.js Playground — Learn Vue 3 Online with 40 Interactive Lessons',
    description: 'Learn Vue 3 in your browser — Options API, Composition API, directives, composables, Teleport, custom directives, and 4 mini-projects. Live preview, no install needed.',
    images: [{ url: 'https://webdevpuneet.com/images/vue-playground.png', width: 1200, height: 630, alt: 'Vue.js Playground — 40 Interactive Lessons' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Vue.js Playground — Learn Vue 3 with 40 Interactive Lessons',
    description: 'From createApp to mini-projects — 40 guided Vue 3 lessons with live preview, composables, Teleport, custom directives, and 4 real apps. Free, no install.',
    images: ['https://webdevpuneet.com/images/vue-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Do I need to install Vue or Node.js to use this playground?', acceptedAnswer: { '@type': 'Answer', text: 'No. Vue 3 loads from CDN inside the preview pane. There is nothing to install — no Node.js, no npm, no terminal. Open the page and start writing Vue code immediately.' } },
    { '@type': 'Question', name: 'Does this teach the Options API or the Composition API?', acceptedAnswer: { '@type': 'Answer', text: 'Both. The first chapters use the Options API (data(), methods, computed, watch) which is easier to understand for beginners. Later chapters introduce the Composition API (setup(), ref, reactive, watchEffect) and composables. A dedicated picker lesson shows the same application built in both styles side by side so you can compare them directly.' } },
    { '@type': 'Question', name: 'What Vue 3 topics does this playground cover?', acceptedAnswer: { '@type': 'Answer', text: '40 lessons across 13 chapters: Getting Started (createApp, interpolation, data reactivity, methods), Template Directives (v-bind, v-if, v-show, v-for, v-on, v-model), Computed & Watch (computed, watch, watchEffect), Class & Style binding, Components (child components, props, emits), Lifecycle Hooks (onMounted, full lifecycle sequence), Composition API (ref, reactive, composables, Options vs Composition picker), Component Patterns (slots, provide/inject), Forms, Advanced Vue (dynamic components, transitions), Setup Function (prop validation, emits, template refs), Advanced Patterns (Teleport, custom directives, v-memo, async components), and Mini-Projects (Todo App, Searchable Table, Theme Switcher, Multi-step Form Wizard).' } },
    { '@type': 'Question', name: 'What is the difference between ref() and reactive() in Vue 3?', acceptedAnswer: { '@type': 'Answer', text: 'ref() wraps any value (primitive or object) in a reactive container — you access or change it via .value in JavaScript, but the template unwraps it automatically. reactive() makes an entire object reactive without a .value wrapper. Use ref() for individual values or when you need to reassign the whole thing. Use reactive() for objects with multiple related properties that you access as a group.' } },
    { '@type': 'Question', name: 'What is the difference between v-if and v-show in Vue?', acceptedAnswer: { '@type': 'Answer', text: 'v-if removes the element from the DOM entirely when the condition is false — nothing is rendered. v-show keeps the element in the DOM but sets display:none when the condition is false. Use v-if when the condition rarely changes (avoids rendering overhead). Use v-show for things that toggle frequently (avoids DOM insertion/removal overhead).' } },
    { '@type': 'Question', name: 'What are Vue composables?', acceptedAnswer: { '@type': 'Answer', text: "Composables are functions that use the Composition API to encapsulate reusable stateful logic. By convention they start with 'use' — e.g. useCounter(), useFetch(), useLocalStorage(). They are Vue's equivalent of React hooks. The playground builds useCounter and useLocalStorage from scratch and shows them shared across multiple instances without code duplication." } },
    { '@type': 'Question', name: 'What is Teleport in Vue 3 and when do you use it?', acceptedAnswer: { '@type': 'Answer', text: 'Teleport is a built-in Vue component that renders its slot content at a different DOM location — specified by the to prop (e.g. to="body"). It is used for modals, tooltips, and dropdowns that need to escape overflow:hidden or z-index stacking contexts. The Advanced Patterns chapter has a complete modal example using Teleport.' } },
    { '@type': 'Question', name: 'What are custom directives in Vue 3?', acceptedAnswer: { '@type': 'Answer', text: 'Custom directives attach reusable DOM-manipulation behaviour to elements using the v-name syntax. You define lifecycle hooks (mounted, updated, unmounted) that receive the element and a binding object. The playground demonstrates v-focus (auto-focus on mount), v-highlight (background colour via binding), and v-tooltip (hover tooltip creation).' } },
    { '@type': 'Question', name: 'Can I share code from the playground with a link?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Share button in the editor toolbar encodes the current code as a base64 URL parameter (?c=...) and copies the full link to your clipboard. Anyone who opens the link sees the same code in the editor — useful for sharing examples, asking for help, or saving a specific snippet.' } },
    { '@type': 'Question', name: 'Should I learn JavaScript before Vue?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Vue becomes much easier if you understand functions, arrays, objects, events, and basic DOM manipulation. The playground assumes you know JavaScript fundamentals. If you need to build that base first, the JavaScript Playground on this site covers all of it with 60 interactive lessons.' } },
    { '@type': 'Question', name: 'Is my progress saved between sessions?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completed lessons and your current position are saved to localStorage automatically. When you return you will be placed on the exact lesson you were viewing. No login or account is required.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vue.js Playground',
  url: 'https://webdevpuneet.com/vue-playground/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free interactive Vue 3 playground with 40 guided lessons across 13 chapters — Options API, Composition API, all six core directives, composables, slots, provide/inject, Teleport, custom directives, v-memo, async components, and 4 real mini-projects. Live preview, progress tracking, share via URL. No install required.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
  featureList: [
    'Real Vue 3 engine loaded from CDN',
    '40 structured lessons across 13 chapters',
    'Options API and Composition API both covered',
    'Side-by-side Options vs Composition API picker lesson',
    'Teleport, custom directives, v-memo, async components',
    '4 mini-projects: Todo App, Searchable Table, Theme Switcher, Multi-step Form Wizard',
    'Vue warning hints with plain-English explanations',
    'Live preview with auto-render under 700ms',
    'Console panel for log/warn/error output',
    'Quick Check challenge on every lesson',
    'Progress tracking via localStorage',
    'Share code via base64 URL',
    'Drag-to-resize editor/preview split',
    '100% browser-based, no Node.js required',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Learn to Code', item: 'https://webdevpuneet.com/learn-to-code/' },
    { '@type': 'ListItem', position: 3, name: 'Vue.js Playground', item: 'https://webdevpuneet.com/vue-playground/' },
  ],
};

const seoData = {
  slug: 'vue-playground',
  title: 'Vue.js Playground — Learn Vue 3 in Your Browser, Free',
  subtitle: 'A free interactive Vue 3 playground with 40 guided lessons — Options API, Composition API, composables, Teleport, custom directives, and 4 real mini-projects. No install. No Node.js.',

  about: {
    title: 'Learn Vue 3 Online Without Installing Anything — 40 Lessons, Live Preview',
    description: `Most Vue tutorials tell you to open a terminal, run \`npm create vue@latest\`, configure Vite, and install a handful of packages before writing a single line of code. This playground skips all of that. Vue 3 loads from CDN inside a sandboxed preview pane — open the page and you are already writing and running Vue code. The 40 lessons are structured to take you from your first \`createApp()\` call through composables, Teleport, custom directives, and four complete mini-project applications.

**Getting Started — createApp, interpolation, data reactivity, methods**

The first four lessons establish the mental model that makes Vue predictable: the Vue instance owns your data, the template is a reactive view of that data, and when data changes the DOM updates automatically. You write your first \`createApp\` call, see template interpolation with \`{{ }}\` render live, modify a reactive data property and watch the UI respond, and attach event handlers with \`methods\`. These four lessons alone eliminate the confusion most beginners have about how Vue wires data to the DOM.

**Template Directives — v-bind, v-if, v-show, v-for, v-on, v-model**

Six dedicated directive lessons, each interactive. \`v-bind\` — drag a range slider and watch an image's width attribute update live as you drag. \`v-if\` vs \`v-show\` — toggle a checkbox and open DevTools to see that \`v-if\` removes the element entirely while \`v-show\` sets \`display:none\`. \`v-for\` — edit a search input and watch the list filter in real time. \`v-on\` — click, hover, and keydown events demonstrated with a keyboard shortcut detector. \`v-model\` — a form with text, checkbox, radio, and select inputs all bound two-way simultaneously.

**Computed & Watch — computed properties, watch, watchEffect**

Three lessons on derived state and side effects. A computed property for a live character counter. A watcher that fires a debounced search when a query string changes. A \`watchEffect\` that automatically tracks its dependencies without listing them explicitly. Understanding the difference between these three is what separates Vue beginners from developers who write clean, efficient templates.

**Components — child components, props, emits**

Three lessons on Vue's component model. You register a child component inside a parent, pass data down with props (including type, required, and default validation), and pass data back up with \`$emit\`. A complete rating-star widget demonstrates a realistic parent–child communication pattern where the child emits a rating and the parent stores it reactively.

**Lifecycle Hooks — onMounted, full lifecycle sequence**

Two lessons. The first shows \`onMounted\` fetching simulated API data after the component renders. The second visualises the full lifecycle sequence — \`beforeCreate\`, \`created\`, \`beforeMount\`, \`mounted\`, \`beforeUpdate\`, \`updated\`, \`beforeUnmount\`, \`unmounted\` — as a live log you trigger by interacting with the component.

**Composition API — ref, reactive, composables, Options vs Composition picker**

Four lessons including the most important lesson in the playground: a **side-by-side picker** where you toggle between the same todo application written in the Options API and the Composition API. Switching back and forth with the picker makes the mental mapping between \`data()\` → \`ref()\`, \`methods\` → plain functions, \`computed\` → \`computed()\`, \`watch\` → \`watch()\` completely concrete. The composables lesson builds \`useCounter\` and \`useLocalStorage\` from scratch and mounts them in two independent component instances — showing how stateful logic is now just a function call.

**Component Patterns — slots, provide/inject**

Two lessons on passing content and data through the component tree. Named slots for a Card component with separate header, body, and footer slots. Provide/inject for a theme token passed from a root provider through multiple intermediate components down to deeply nested consumers — no prop drilling.

**Forms — form handling with v-model**

A full form lesson covering text, email, checkbox, radio groups, and a \`<select>\` dropdown. All fields bound with \`v-model\`. A computed property derives a live summary object. A submit handler validates presence and logs the result. Practical and directly applicable to any real form you will build.

**Advanced Vue — dynamic components, transition animations**

Dynamic components with \`<component :is="currentTab">\` and \`<KeepAlive>\` to preserve state when switching tabs. The transitions lesson demonstrates \`<Transition>\` with custom \`name\` attributes and CSS classes for enter/leave animations — including a fade, a slide, and a bouncing list item transition with \`<TransitionGroup>\`.

**Setup Function — prop validation, emits with setup(), template refs**

Three lessons on the \`<script setup>\` mental model using the Options API style of \`setup(props, { emit })\`. Prop validation with runtime type checking. \`emit\` inside \`setup()\` for a dismissible alert component. \`ref()\` as a template ref with \`onMounted\` to auto-focus an input — a pattern every form builder needs.

**Advanced Patterns — Teleport, custom directives, v-memo, async components**

Four lessons on patterns that separate proficient Vue developers from beginners. Teleport renders a modal at \`<body>\` level while the component that controls it sits deep in the tree. Custom directives \`v-focus\`, \`v-highlight\`, and \`v-tooltip\` are built with \`mounted\`/\`updated\`/\`unmounted\` hooks. \`v-memo\` skips re-rendering rows in a 500-item list unless specific dependencies change — a real performance pattern. Async components with \`defineAsyncComponent\` and \`<Suspense>\` demonstrate code-splitting with a loading fallback.

**Mini-Projects — four complete applications**

Four full applications that combine everything you have learned. A **Todo App** with localStorage persistence, active/done filtering, and a delete-all button. A **Searchable Sortable Table** using a single computed property that filters and sorts 10 employees simultaneously. A **Theme Switcher** using \`provide\`/\`inject\` reactive tokens so nested components switch between light, dark, and system themes without prop drilling. A **Multi-step Form Wizard** with four steps (Account, Plan, Payment, Review), per-step validation, a progress bar, and a final review screen that summarises all inputs before submission.

Every lesson includes a Quick Check multiple-choice question to reinforce the concept. Progress and your current lesson are saved to localStorage automatically. A Share button encodes your editor code as a base64 URL you can send to anyone. All code runs fully in your browser — no data is uploaded to any server.`,
  },

  features: [
    'Real Vue 3 engine — loaded from CDN inside a sandboxed iframe, not a simplified simulator — same approach as the [React playground](/react-playground)',
    '40 structured lessons across 13 chapters from createApp basics to mini-projects, building on [JavaScript playground](/js-playground) fundamentals',
    'Options API and Composition API both covered — with a picker lesson comparing both styles side by side; compare component models in the [Angular playground](/angular-playground)',
    'All six core directives — v-bind, v-if, v-show, v-for, v-on, v-model with interactive examples',
    'Composition API deep dive — ref(), reactive(), computed(), watchEffect(), composables from scratch',
    'Setup Function chapter — prop validation, emits via setup(), template refs with onMounted',
    'Advanced Patterns — Teleport modals, custom directives (v-focus/v-highlight/v-tooltip), v-memo, defineAsyncComponent + Suspense',
    '4 complete Mini-Projects — Todo App, Searchable Sortable Table, Theme Switcher, Multi-step Form Wizard',
    'Vue warning hints — when Vue emits a [Vue warn], a plain-English tip explains the likely cause',
    'Live preview — code changes auto-render within 700ms, no manual refresh needed',
    'Picker lessons — toggle between code variants (Options API vs Composition API) without switching tabs',
    'Quick Check challenge on every lesson — collapsible multiple-choice with correct/wrong feedback',
    'Console panel — captures console.log, warn, and error output from the preview iframe',
    'Share button — encodes editor code as a base64 URL parameter you can copy and share',
    'Progress tracking — completed lessons and position saved in localStorage between sessions',
    'Drag-to-resize split handle — adjust editor/preview ratio from 25% to 75%',
    '100% browser-based — no Vue CLI, no Vite, no Node.js, no setup required',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Open the playground — no install required',
        text: 'Navigate to the Vue Playground. Vue 3 is already loaded from CDN inside the preview pane. No terminal, no npm install, no Vite configuration. You are writing real Vue 3 the moment the page loads.',
      },
      {
        title: 'Pick a lesson from the sidebar',
        text: 'The left sidebar lists all 40 lessons grouped into 13 chapters. Start at "Hello Vue" if you are new to Vue, or jump directly to any chapter that matches your current level — Composition API, Teleport, or Mini-Projects. Use the search box to find a specific topic.',
      },
      {
        title: 'Read the concept explanation',
        text: 'A collapsible panel above the editor explains the Vue concept for that lesson in plain English — what the feature does, why it exists, and key things to remember. Each explanation is short and focused so you can get to the code quickly.',
      },
      {
        title: 'Interact with the live preview',
        text: 'The starter code is already running in the preview pane. Click buttons, type in inputs, drag sliders, toggle checkboxes — every lesson is interactive. You can explore the behaviour before changing a single line of code.',
      },
      {
        title: 'Edit the code and experiment',
        text: 'Modify the template, change data values, add a new method, swap \`v-if\` for \`v-show\`, or try a composable. The preview updates automatically within 700ms. If something breaks, click Reset to restore the lesson\'s original code.',
      },
      {
        title: 'Use the Options vs Composition picker',
        text: 'When you reach the "Options API vs Composition API" picker lesson, toggle between the two implementations of the same todo app. Switching back and forth makes the mental mapping between the two styles completely concrete — you see exactly what \`data()\` becomes, what \`methods\` become, and how \`computed\` maps to Composition API equivalents.',
      },
      {
        title: 'Answer the Quick Check',
        text: 'After the preview pane, every lesson has a multiple-choice question that tests your understanding of the core concept. Answer it before marking the lesson done — it takes 30 seconds and helps the concept stick.',
      },
      {
        title: 'Build the mini-projects and share your code',
        text: 'In the Mini-Projects chapter, work through all four full applications. When you have a snippet worth saving or sharing, click the Share button to generate a base64 URL. Paste it in a message or bookmark it — the link reopens the playground with your exact code in the editor.',
      },
    ],
  },

  useCases: [
    {
      icon: '▶',
      title: 'Learn Vue 3 from scratch without a terminal',
      desc: 'If you want to learn Vue but do not want to spend time configuring Vue CLI, Vite, or npm before writing your first component, start here. Vue 3 runs in the browser the moment the page loads. The 40 lessons build from createApp through composables, Teleport, custom directives, and four complete mini-project applications — all in a logical, deliberate sequence.',
    },
    {
      icon: '⇄',
      title: 'Understand the Options API vs Composition API difference',
      desc: 'The most common question from Vue learners is "when do I use the Options API and when do I use the Composition API?" The playground teaches the Options API first, then introduces the Composition API — and the picker lesson shows the exact same todo application in both styles side by side so you can toggle back and forth until the mapping is clear.',
    },
    {
      icon: '{}',
      title: 'Master Vue directives with interactive examples',
      desc: 'v-bind, v-if, v-show, v-for, v-on, and v-model each have a dedicated interactive lesson. Drag a slider to see v-bind update an attribute live. Toggle a checkbox and open DevTools to see the DOM difference between v-if and v-show. Type in a search box to watch v-for filter a list reactively. These lessons make directive behaviour concrete, not theoretical.',
    },
    {
      icon: '⊞',
      title: 'Build composables and understand reusable reactive logic',
      desc: 'The composables lesson builds useCounter and useLocalStorage from scratch, showing how to encapsulate reactive state and side effects into plain functions that start with "use". The same composable is mounted in two independent component instances — no code duplication, no shared state leaking between them. This is the Composition API\'s answer to mixins.',
    },
    {
      icon: '◉',
      title: 'React developers learning Vue for the first time',
      desc: 'If you know React, the Composition API chapter maps cleanly: ref() is useState, watchEffect is useEffect, computed is useMemo, and composables are custom hooks. The key differences — Vue\'s template syntax vs JSX, v-model vs controlled inputs, provide/inject vs Context — are demonstrated with interactive examples so you can build on what you already know.',
    },
    {
      icon: '✦',
      title: 'Quick Vue prototyping without project setup',
      desc: 'Use the playground as a scratch pad for Vue ideas. Write a component, test a reactive pattern, check how provide/inject flows through a tree, or verify a Teleport setup. Copy the working code into your project when satisfied. Much faster than spinning up a Vite project for a quick experiment.',
    },
  ],

  faqs: [
    { q: 'Do I need to install Vue or Node.js to use this playground?', a: 'No. Vue 3 loads from CDN inside the preview pane. There is nothing to install — no Node.js, no npm, no terminal. Open the page and start writing Vue code immediately.' },
    { q: 'Does this teach the Options API or the Composition API?', a: 'Both. The first chapters use the Options API (data(), methods, computed, watch) which is easier for beginners. Later chapters introduce the Composition API (setup(), ref, reactive, watchEffect) and composables. A dedicated picker lesson shows the exact same application built in both styles side by side so you can compare them directly.' },
    { q: 'What topics does this Vue 3 playground cover?', a: '40 lessons across 13 chapters: Getting Started (createApp, interpolation, data reactivity, methods), Template Directives (v-bind, v-if, v-show, v-for, v-on, v-model), Computed & Watch (computed, watch, watchEffect), Class & Style binding, Components (child components, props, emits), Lifecycle Hooks (onMounted, full lifecycle sequence), Composition API (ref, reactive, composables, Options vs Composition picker), Component Patterns (slots, provide/inject), Forms, Advanced Vue (dynamic components, transitions), Setup Function patterns (prop validation, emits, template refs), Advanced Patterns (Teleport, custom directives, v-memo, async components), and Mini-Projects (Todo App, Searchable Table, Theme Switcher, Multi-step Form Wizard).' },
    { q: 'What is the difference between ref() and reactive() in Vue 3?', a: 'ref() wraps any value in a reactive container — access it via .value in JavaScript, though the template unwraps it automatically. reactive() makes an entire object reactive without a .value wrapper. Use ref() for individual values or when you need to reassign the whole container. Use reactive() for groups of related properties on an object.' },
    { q: 'What is the difference between v-if and v-show in Vue?', a: 'v-if removes the element from the DOM entirely when the condition is false — nothing is rendered. v-show keeps the element in the DOM but sets display:none. Use v-if when the condition rarely changes to avoid rendering overhead. Use v-show for elements that toggle frequently to avoid repeated DOM insertion and removal.' },
    { q: 'What are Vue composables and how do they differ from mixins?', a: "Composables are functions using the Composition API to encapsulate reusable stateful logic — by convention they start with 'use' (e.g. useCounter, useFetch, useLocalStorage). Unlike mixins, composables have no naming conflicts, make data sources explicit, and can receive arguments. The playground builds two composables from scratch and shows them shared across multiple component instances." },
    { q: 'What is Teleport in Vue 3 and when do you use it?', a: 'Teleport is a built-in Vue component that renders its content at a different location in the DOM — specified by the to prop (e.g. to="body"). This is essential for modals, tooltips, and dropdowns that need to escape overflow:hidden or z-index stacking contexts. The Advanced Patterns chapter has a complete modal example using Teleport.' },
    { q: 'What are custom directives in Vue 3?', a: 'Custom directives attach reusable DOM-manipulation behaviour to elements using the v-name syntax. You define lifecycle hooks (mounted, updated, unmounted) that receive the element and a binding object. The playground demonstrates v-focus (auto-focus on mount), v-highlight (background colour via binding), and v-tooltip (hover tooltip creation).' },
    { q: 'Can I share my code with someone else?', a: 'Yes. The Share button in the toolbar encodes your current editor code as a base64 string in the URL (?c=...) and copies the link to your clipboard. Anyone who opens that URL will see exactly the same code in the editor. Share links work for any code — not just lesson starters.' },
    { q: 'Should I learn JavaScript before learning Vue?', a: 'Yes. Vue becomes much easier if you already understand functions, arrays, objects, events, and basic DOM manipulation. The playground assumes JavaScript fundamentals. If you need to build that foundation first, the JavaScript Playground on this site covers all of it with 60 interactive lessons.' },
    { q: 'Is my progress saved between sessions?', a: 'Yes. Completed lessons and your current position are saved to localStorage automatically. When you return you will resume exactly where you left off. No login or account required. All code runs fully in your browser — no data is uploaded.' },
  ],

  links: [
    { label: 'JavaScript Playground', href: '/js-playground/', desc: 'Build your JS foundation before learning Vue — 60 interactive lessons.' },
    { label: 'React Playground', href: '/react-playground/', desc: 'Learn React hooks, JSX, and state management with guided lessons.' },
    { label: 'TypeScript Playground', href: '/typescript-playground/', desc: 'Add type safety to your Vue projects — 10 chapters of TS fundamentals.' },
    { label: 'CSS Playground', href: '/css-playground/', desc: 'Master the styling layer that powers every Vue template.' },
    { label: 'Tailwind CSS Playground', href: '/tailwind-playground/', desc: 'Learn the utility-first CSS framework popular in Vue projects.' },
  ],
};

export default function VuePlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><VuePlaygroundTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
