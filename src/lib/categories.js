/* Central definition for category cluster pages.
   Each category page lives at /<slug>/ and lists tools from multiple
   registry categories — allowing one tool to appear in several clusters. */

export const CATEGORIES = [







  {
    slug:        'learn-to-code',
    name:        'Learn to Code',
    headline:    'Learn to Code Free — Interactive Playgrounds for HTML, CSS, JavaScript, React & More',
    tagline:     '28 browser-based coding playgrounds with live preview and structured lessons. No install, no signup — open any playground and start immediately.',
    accent:      '#6366f1',
    icon:        '🎓',
    toolSlugs: [
      'ui-snippets',
      'html-playground',
      'js-playground',
      'git-playground',
      'php-playground',
      'typescript-playground',
      'css-playground',
      'scss-playground',
      'tailwind-playground',
      'react-playground',
      'angular-playground',
      'jquery-playground',
      'bootstrap5-playground',
      'vue-playground',
      'nextjs-playground',
      'gsap-playground',
      'svg-playground',
      'sql-playground',
      'mongo-playground',
      'express-playground',
      'firebase-playground',
      'graphql-playground',
      'nodejs-playground',
      'python-playground',
      'rest-api-builder-playground',
      'ai-prompt-studio',
      'mind-map',
      'database-schema-designer',
    ],
    related: ['css-tools', 'developer-tools', 'design-tools'],
    about: `Learning to code is easier when you can see the result of every change instantly. These interactive playgrounds cover the full stack — HTML, CSS, SCSS/Sass, JavaScript, Git, PHP, TypeScript, Python, Tailwind CSS, React, Vue.js, Next.js, GSAP, SQL, MongoDB, and Express.js — each with a structured curriculum of lessons, a live editor, a visual trace, or an instant preview. No Node.js, no terminal, no build step. Open the browser and start writing.

### Why Playgrounds Matter More in the Age of AI

AI tools like ChatGPT, GitHub Copilot, and Claude can generate code in seconds. But AI increases the need for interactive learning environments — not the other way around.

People no longer need to memorise syntax. But they still need to **understand what code does**, experiment visually, debug AI-generated output, tweak results quickly, learn concepts interactively, and compare variations in real time. That is exactly where playgrounds become essential.

Consider how this plays out across tools: AI can generate Tailwind classes, but you still need a live preview to understand spacing and layout. AI can generate GSAP animations, but you still need timeline controls and sliders to see how easing and stagger actually feel. AI can generate React components, but you still need a sandbox to understand how props flow, when state re-renders, and what hooks actually do. AI can write SQL queries, but you still need a query environment to see what JOINs return, how aggregations group rows, and whether your WHERE clause does what you think it does. AI can generate Express routes and MongoDB queries, but you still need to test them with real requests to understand the request-response cycle.

The shift happening right now is from **memorising code** to **understanding behaviour** — and playgrounds are built for behaviour-based learning. Every lesson here runs real code, gives you immediate visual feedback, and lets you modify, break, and fix things in a safe environment. That is a skill AI cannot replace: knowing whether the output is actually correct.

### HTML Playground

The **HTML Playground** teaches the building blocks of every web page. 42 lessons across 13 chapters cover document structure, text elements, links and images, tables, forms, semantic HTML, accessibility attributes, performance, and SEO essentials. Each lesson loads a working HTML example into the editor — change a tag, add an attribute, and the preview updates instantly. A collapsible concept panel explains what each element does and when to use it. Quick Check challenges test your understanding after key lessons.

### JavaScript Playground

The **JavaScript Playground** teaches the language layer that makes pages interactive. Work through 60 lessons across 25 chapters covering variables, types, operators, string and number methods, conditions, loops, functions, arrays, reduce, objects, debugging, try/catch, DOM selection, creating elements, rendering data, class toggles, click events, event delegation, form input, JSON, data transformation, setTimeout, Promises, async loading patterns, closures, this, bind/call/apply, classes, prototypes, modules, fetch, storage patterns, URLSearchParams, FormData, event loop ordering, debounce, throttle, Canvas, Web Workers, Drag and Drop, Clipboard, generators, regex, AbortController, observers, Proxy, performance measurement, safe rendering, tiny tests, and mini projects. Lessons run in a sandboxed preview with helper functions like write(), app, $(), and $$(), so you can edit code, click the result, inspect console output, and learn the browser APIs without setting up a project.

### Git Playground

The **Git Playground** teaches version control through 43 browser-safe lessons and an interactive Git terminal simulator. Practice git init, status, add, diff, commit, log, branches, switch, merge, merge conflicts, remotes, push, pull, GitHub-style feature branch workflow, restore, reset, revert, reflog, rebase, cherry-pick, stash, hooks, submodules, Git LFS, signed commits, and CI/CD triggers without installing Git or touching real files. Each command script shows terminal-style output plus repository state, making it useful for beginners learning Git commands online, developers preparing for GitHub collaboration, and anyone who wants to understand risky undo commands before using them in a real repository.

### PHP Playground

The **PHP Playground** teaches server-side PHP through 60 guided lessons and a browser-safe output simulator. Practice PHP tags, comments, variables, echo and print, data types, strings, numbers, casting, constants, operators, conditionals, loops, functions, arrays, superglobals, GET and POST forms, validation, sanitization, dates, files, cookies, sessions, filters, JSON, exceptions, classes, inheritance, interfaces, traits, namespaces, iterables, PDO/MySQL prepared statement flow, regex, AJAX-style JSON responses, Composer, strict types, password hashing, CSRF protection, file uploads, enums, attributes, dependency injection, PDO transactions, PHPUnit testing, Laravel/Symfony basics, deployment, and mini projects. It is useful for learners searching for a PHP tutorial for beginners, PHP forms practice, PHP OOP examples, WordPress PHP basics, Laravel preparation, or PHP and MySQL concepts without installing a local server.

### TypeScript Playground

The **TypeScript Playground** teaches typed JavaScript through 32 lessons across 10 chapters. Start with simple types, inference, any, unknown, arrays, tuples, object types, optional fields, readonly fields, enums, aliases, interfaces, unions, typed functions, casting, classes, access modifiers, generics, constraints, utility types, keyof, null safety, and type guards. Then move into pro topics like conditional types, mapped types, literal types, index signatures, async return types, tsconfig mental models, JavaScript migration, and real project best practices. It is built for learners who know some JavaScript and want to understand TypeScript before using it in React, Angular, Node.js, or Next.js projects.

### Python Playground

The **Python Playground** teaches beginner Python through a safe editable editor and visual code tracer instead of backend execution. Edit supported lesson patterns, get parser feedback when code moves outside the safe subset, run or step through the trace, and watch the highlighted source line update memory diffs, variables, call stack, and console output. Lessons cover variables, strings, numbers, booleans, print(), if/elif/else, loops, lists, dictionaries, function parameters, return values, mocked file input, API-style text, and JSON parsing. Validation challenges ask learners to change inputs to produce a target result, making it useful for first-time Python learners, classrooms, interview warm-ups, and concept review without requiring a Python install.

### CSS Playground

The **CSS Playground** introduces styling through a vertical split editor — CSS on top, HTML below — with a live preview pane. 53 lessons across 18 chapters cover selectors, the box model, typography, colours and backgrounds, flexbox, grid, borders, effects, transitions, animations, CSS variables, pseudo-elements, responsive design, container queries, subgrid, CSS nesting, cascade layers, logical properties, scroll-driven animations, blend modes, @property, and modern viewport units. A Format button prettifies your CSS, an error strip flags unclosed brackets, and a Remove CSS toggle lets you see the before/after effect of your stylesheet on the raw HTML.

### SCSS Playground

The **SCSS Playground** teaches Sass through 45 guided lessons with an SCSS editor, compiled CSS output, and live HTML preview. Start with comments, variables, nesting, the parent selector, nested properties, and partials. Then move into modern Sass modules with @use, @forward, aliases, configurable modules, mixins, @content, functions, @extend, placeholders, maps, lists, @each, @for, @if, interpolation, design tokens, CSS custom properties, theme maps, BEM, cascade layers, container queries, responsive mixins, fluid type, generated utilities, component APIs, folder structure, @import migration, and linting. It is useful for learners searching for a Sass tutorial, SCSS playground, Sass variables, SCSS nesting, Sass mixins, Sass maps, or modern Sass architecture before adding Dart Sass to a real project.

### Tailwind CSS Playground

The **Tailwind Playground** teaches utility-first CSS through 48 lessons across 15 chapters — from basic utilities and colour system through Flexbox, Grid, Responsive Design, Group & Peer modifiers, @apply and custom config, Component Patterns, Accessibility utilities, advanced variants, production patterns, and Tailwind v4 changes. The editor loads the Tailwind Play CDN so every utility class works without a build step. Examples include real component patterns: cards, navigation bars, forms, badges, and alert components.

### React Playground

The **React Playground** is a live JSX editor that transpiles React in the browser using Babel standalone. Write components, use hooks, and see updates instantly. 44 lessons across 19 chapters cover JSX syntax, props, useState, useEffect, lists, conditional rendering, event handling, forms, error boundaries, portals, keys, compound components, render props, Suspense, useTransition, testing, and reusable component patterns. The playground also works as a quick sandbox for prototyping React UI without spinning up a project. A dedicated GSAP in React chapter shows how to use GSAP animations inside components using useRef and useEffect with proper cleanup.

### Angular Playground

The **Angular Playground** teaches Angular from beginner to pro through 45 Angular-style lessons across 13 chapters. Start with components, interpolation, property binding, class and style binding, structural directives like *ngIf and *ngFor, event binding, input events, ngModel, and validation. Then move into component inputs, composition, services, dependency injection patterns, async loading states, route state, route params, route guards, pipes, standalone components, lifecycle hooks, signals, reactive forms, dynamic form arrays, RxJS streams and operators, lazy loading, change detection strategy, trackBy, component testing, service testing, production error handling, and feature architecture. It is built for learning Angular concepts quickly before moving the same mental model into a real Angular CLI project.

### GSAP Playground

The **GSAP Playground** teaches the industry-standard JavaScript animation library used by major brands, agencies, and award-winning websites. 55 lessons across 18 chapters cover gsap.to(), gsap.from(), gsap.fromTo(), easing, timelines, stagger, repeat and yoyo, callbacks, ScrollTrigger, keyframes, gsap.utils, responsive animation, reduced motion, official GSAP plugins, and real animation patterns including card reveal, hero entrance, pulsing loader, and animated counter. The preview pane includes a Replay button to restart animations instantly, a speed control (¼×, 1×, 2×) for studying timing, and a Markers toggle for visualising ScrollTrigger start and end points. GSAP and official plugin files load from the installed package — no CDN dependency, no network required.

### Vue.js Playground

The **Vue.js Playground** teaches Vue 3 through 40 structured lessons across 13 chapters using Vue running from CDN inside a sandboxed preview pane. The curriculum covers the Options API first — createApp, template interpolation, data reactivity, methods, all six core directives (v-bind, v-if, v-show, v-for, v-on, v-model), computed properties, watchers, class and style binding — before introducing the Composition API with ref(), reactive(), watchEffect(), and composables. A side-by-side picker lesson shows the same app written in both styles so learners can see exactly what changes. Component chapters cover props, emits, slots, and provide/inject for deep component communication. Advanced chapters include Teleport for modal rendering, custom directives, v-memo for performance, and defineAsyncComponent with Suspense. Four mini-project lessons — Todo App, Searchable Table, Theme Switcher, and Multi-step Form — put all the concepts together in complete working applications.

### SQL Playground

The **SQL Playground** teaches SQL through 35 structured lessons across 9 chapters using real PostgreSQL running in your browser via PGlite (WebAssembly). Chapters cover SELECT basics, filtering, sorting, aggregations, JOINs, subqueries, CTEs, window functions, and PostgreSQL-specific features like JSONB, date functions, and string functions. Every lesson has a multiple-choice Quick Check challenge and a write-your-own SQL task with automatic result validation. The Query Explainer runs EXPLAIN on any SELECT and shows a plain-English breakdown of what PostgreSQL actually does. A multi-tab editor, query history, data editor, and table preview on hover make it feel like a real SQL client — not a toy interpreter.

### MongoDB Playground

The **MongoDB Playground** teaches MongoDB through 32 structured lessons across 10 chapters using an in-browser JavaScript simulation of the MongoDB query engine. Chapters cover collections and documents, comparison operators ($gt, $lt, $in, $nin), logical operators ($and, $or, $nor, $not), projection (inclusion, exclusion, dot notation), sorting and pagination, array queries ($all, $elemMatch, $size), update operators ($set, $inc, $push, $pull, $addToSet), insert and delete operations, aggregation basics ($match, $group, $project), and advanced aggregation ($unwind, cross-collection queries). The playground simulates four realistic collections — employees, products, orders, and reviews — and every lesson creates a fresh database so write operations like insertOne and updateMany can be practised safely without corrupting the data.

### Express.js Playground

The **Express.js Playground** teaches Express.js backend development through 32 structured lessons across 10 chapters using a complete in-browser simulation of the Express.js routing and middleware engine. A built-in HTTP Client panel lets learners select the HTTP method, enter a request path, add a JSON body, and click Send to test their routes instantly. Chapters cover Hello World routing, HTTP methods (GET, POST, PUT, DELETE, full CRUD), route parameters (:id syntax and query strings), middleware (next(), chaining, body parsing with jsonParser()), request and response objects, REST API design (naming conventions, filtering, pagination), error handling (4-argument error middleware, catch-all 404 routes), Express Router (sub-applications and path prefix mounting), authentication (Bearer tokens, role-based access control), and two complete mini-projects — a Todo REST API and a Users API with auth and pagination. The playground includes SAMPLE_DB pre-loaded with users, posts, and products for realistic API lessons, and built-in middleware factories for cors(), logger(), urlencoded(), and authMiddleware(). No Node.js installation required.

### Why Structured Playgrounds Beat Video Tutorials

Watching a tutorial is passive. Writing code is active. These playgrounds keep you in the editor — reading a short concept explanation, applying it in working code, checking your understanding with a quick question, and moving to the next idea. Progress is saved in localStorage so you resume exactly where you left off. Chapters unlock confetti when completed, and the sidebar shows a green dot for every lesson you have finished — making it easy to see how far you have come and what is left.`,
    useCases: [
      { icon: 'LEARN', title: 'Absolute beginners learning HTML', desc: 'Start with the HTML Playground and work through the structured lesson path from document structure to semantic elements and forms. No setup, no confusion about file paths or editors — just open the browser and follow the curriculum.' },
      { icon: 'CODE', title: 'Beginners learning Python concepts', desc: 'Use the Python Playground to trace variables, if/else branches, loops, lists, dictionaries, functions, return values, and JSON parsing visually before installing Python locally.' },
      { icon: 'CODE', title: 'HTML learners adding interactivity', desc: 'Move into the JavaScript Playground to learn variables, functions, DOM selection, and click events with a real preview you can edit and interact with.' },
      { icon: 'SYNC', title: 'Developers learning Git and GitHub workflow', desc: 'Use the Git Playground to practice commits, branches, merge conflicts, push, pull, reset, revert, rebase, and GitHub-style collaboration in a safe browser simulator before running commands on real project files.' },
      { icon: 'CODE', title: 'Backend learners starting PHP', desc: 'Use the PHP Playground to learn 60 lessons covering variables, echo, arrays, forms, validation, sessions, JSON, OOP, PDO/MySQL, Composer, PHPUnit, Laravel basics, deployment, and security before installing PHP locally.' },
      { icon: 'DESIGN', title: 'Designers learning CSS, SCSS and Tailwind', desc: 'Use the CSS Playground to understand the box model, flexbox, and transitions, the SCSS Playground to learn Sass variables, mixins, modules, and tokens, then the Tailwind Playground to learn utility-first styling.' },
      { icon: 'CODE', title: 'JavaScript developers picking up React', desc: 'The React Playground introduces JSX and hooks through focused lessons without the overhead of a full project setup. Write a component, add state, pass props — all in the browser with immediate results.' },
      { icon: 'PEOPLE', title: 'Teachers and workshop instructors', desc: 'Load a lesson on a projected screen, walk through the concept, then live-edit the code and show the preview changing. The split-pane layout is designed for classroom use — concept on top, code below, preview on the right.' },
      { icon: 'LEARN', title: 'Filling gaps in existing knowledge', desc: 'Skip to the specific chapter that covers your gap — CSS Grid, Tailwind Group modifiers, React useEffect — without sitting through a full course. Each chapter is self-contained and takes 10–20 minutes.' },
      { icon: 'FLOW', title: 'Adding animation to web projects', desc: 'Use the GSAP Playground to learn tweens, timelines, stagger, and ScrollTrigger animations. Replay at ¼ speed to study easing, toggle markers to see ScrollTrigger boundaries, then copy the code into any project.' },
      { icon: 'COPY', title: 'Quick prototyping without project setup', desc: 'Use any playground as a scratch pad. Load a lesson close to what you need, edit the code to match your design, and copy the output into your project. Faster than remembering syntax from memory.' },
      { icon: 'DOC', title: 'Learning SQL and database queries', desc: 'Use the SQL Playground to learn SELECT, JOINs, CTEs, window functions, and PostgreSQL extras through 35 structured lessons with a real PostgreSQL engine in your browser. Write queries, see results instantly, and validate your understanding with built-in challenges.' },
      { icon: 'CODE', title: 'Learning MongoDB and NoSQL queries', desc: 'Use the MongoDB Playground to learn find(), aggregate(), update operators, and array queries through 32 structured lessons. The in-browser simulation supports the full MongoDB query surface — no installation needed.' },
      { icon: 'GLOBAL', title: 'Learning Express.js backend APIs', desc: 'Use the Express.js Playground to learn routing, middleware, REST API design, error handling, and authentication through 32 structured lessons with a built-in HTTP client. Write routes, send test requests, see JSON responses instantly — no Node.js installation needed.' },
    ],
    faqs: [
      {
        q: 'Do I need to install anything to use these playgrounds?',
        a: 'No. All 28 playgrounds run in the browser with zero setup. HTML, JavaScript, SVG, Git, PHP, TypeScript, CSS, SCSS, and Tailwind use the browser\'s native rendering engine, a local sandbox, or a browser-safe learning simulator. The SVG Playground renders your markup live in a sandboxed frame so CSS and SMIL animations run natively. The Git Playground uses a browser-safe terminal simulator. The PHP Playground uses a browser-safe output simulator for common PHP examples. The SCSS Playground uses a browser-safe Sass learning compiler for lesson patterns. The Python Playground uses a client-side visual tracer with editable safe inputs instead of backend execution. The Tailwind Playground loads the official Tailwind Play CDN. The React Playground uses Babel standalone to transpile JSX. The Vue.js Playground loads Vue 3 from CDN. The GSAP Playground loads GSAP and plugin files from the installed package. The SQL Playground runs real PostgreSQL via PGlite (WebAssembly). The Express.js Playground simulates Express routing and middleware in JavaScript. No Node.js, no npm, no terminal — just open the URL and start writing.',
      },
      {
        q: 'Is my progress saved between sessions?',
        a: 'Yes. Every playground saves your completed lessons and current position to localStorage automatically — no account required. When you return, it resumes at the exact lesson you left on. Quick Check challenge answers are also persisted — a completed challenge shows a green confirmation instead of repeating the question. Your progress survives browser restarts and is stored per device, not per browser session.',
      },
      {
        q: 'Which playground should I start with if I am a complete beginner?',
        a: 'Start with the HTML Playground — it covers document structure, text elements, links, images, tables, forms, and semantic HTML from the ground up with no prior knowledge required. Once you can read and write basic HTML confidently, use the JavaScript Playground to learn variables, functions, DOM selection, and events, then move to the CSS Playground to style elements. Add the Git Playground early once you start saving projects, because commits, branches, merge conflicts, and GitHub workflow are essential for real development. If you want backend or WordPress-style development, add the PHP Playground after HTML forms and before database-heavy work. After CSS, the Tailwind Playground shows you a faster utility-first approach to styling. Save the React Playground until you are comfortable with HTML structure and basic JavaScript concepts.',
      },
      {
        q: 'What is the difference between the CSS Playground and the Tailwind Playground?',
        a: 'The CSS Playground teaches standard CSS — you write property-value pairs like color: red and display: flex directly in a stylesheet. This is the foundation every web developer needs to understand. The Tailwind Playground teaches a utility-first approach where instead of writing CSS you apply pre-built classes like text-red-500 and flex directly to HTML elements. Both cover the same visual outcomes — layout, colour, spacing, typography — but through different workflows. Learn CSS first to understand what Tailwind is doing under the hood.',
      },
      {
        q: 'Can I use these playgrounds as a free sandbox for my own code?',
        a: 'Yes. Each playground works as an open editor beyond the structured lessons — you are not limited to lesson examples. Paste in your own HTML, modify class names, add new elements, and the preview updates instantly. Use Copy HTML or Download to save your work as a standalone file that includes the relevant CDN script tags. The Tailwind Playground supports the full JIT engine including arbitrary values like w-[327px]. The React Playground runs any JSX that works in Babel standalone without external package imports.',
      },
      {
        q: 'Does the Tailwind Playground support responsive design and dark mode?',
        a: 'Yes to both. The Tailwind Playground includes responsive preview buttons that switch the preview pane between 375px mobile, 768px tablet, and full-width desktop — so you can see how sm:, md:, and lg: breakpoint classes behave. It also includes a dark mode toggle that adds or removes the dark class from the preview\'s html element, activating all your dark: modifier classes instantly. You can preview both light and dark variants of the same component without changing any code.',
      },
      {
        q: 'How many lessons are in each playground?',
        a: 'HTML Playground: 42 lessons. JavaScript Playground: 60 lessons. Git Playground: 43 lessons. PHP Playground: 60 lessons. TypeScript Playground: 32 lessons. CSS Playground: 53 lessons. SCSS Playground: 45 lessons. Tailwind Playground: 48 lessons. React Playground: 44 lessons. Vue.js Playground: 40 lessons across 13 chapters including mini-projects. GSAP Playground: 55 lessons. SQL Playground: 35 lessons. MongoDB Playground: 32 lessons across 10 chapters covering CRUD, query operators, array queries, update operators, and aggregation pipeline. Express.js Playground: 32 lessons across 10 chapters covering routing, middleware, REST API design, error handling, authentication, and mini-projects. Python Playground: visual trace lessons for variables, control flow, loops, dictionaries, functions, and JSON. Redis Playground: visual Redis simulator. Together they cover HTML, CSS, SCSS, JavaScript, Git, PHP, TypeScript, Python, Tailwind, React, Vue 3, animation, SQL, MongoDB, and Express.js.',
      },
      {
        q: 'Are these playgrounds suitable for teaching a class or running a coding workshop?',
        a: 'Yes — the split-pane layout works well on a projected screen. Load a lesson, walk through the concept panel, then live-edit the HTML or CSS and show the preview changing in real time. The dark mode toggle and responsive preview buttons are particularly effective for demonstrating these features to an audience without switching browser tabs or apps. Students can follow along on their own laptops simultaneously since no install is needed — just share the URL.',
      },
    ],
    metadata: {
      title: 'Interactive Coding Playgrounds - Learn HTML, CSS, SCSS, JavaScript, TypeScript, Angular, React, Python, Express.js, SQL & SEO | webdevpuneet.com',
      description: 'Free browser-based coding playgrounds with live previews, visual traces, and structured lessons. Learn HTML, CSS, SCSS/Sass, JavaScript, Git, PHP, TypeScript, Angular, React, Vue, Python, Tailwind, GSAP, Express.js, SQL, APIs, databases, and SEO visually. No install, no setup.',
      keywords: ['learn html online', 'javascript playground', 'typescript playground', 'learn typescript online', 'angular playground online', 'learn angular online', 'python playground online', 'python visualizer', 'css playground', 'scss playground', 'sass playground', 'learn sass online', 'tailwind css playground', 'react playground online', 'gsap playground', 'express js playground', 'interactive coding lessons', 'learn python visually', 'learn css visually', 'html tutorial browser', 'javascript tutorial browser', 'typescript tutorial browser', 'angular tutorial browser', 'python tutorial browser', 'express.js tutorial browser', 'tailwind tutorial', 'react tutorial browser', 'learn to code free', 'coding playground no install', 'live html editor'],
    },
  },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(c => [c.slug, c]));
