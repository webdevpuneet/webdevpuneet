/* ---------------------------------------------------------------
   tools-registry.js — single source of truth for every tool

   To add a new tool:
     1. Add one entry to TOOLS below
     2. Drop the SVG icon in /public/icons/<slug>.svg
     3. Create src/app/<slug>/page.js  +  src/components/<Name>Tool/

   Fields
   ------
   slug      URL path segment  (/slug) and icon filename
   name      Full display name
   sub       Short subtitle shown in the sidebar
   desc      One-sentence description shown on the homepage card
   icon      Emoji / monospace glyph for the homepage card icon box
   accent    Hex colour for icon box border + glyph tint
   category  Sidebar accordion group (must match a CATEGORY_META id)
   extended  false ? always visible in accordion
             true  ? hidden until "More tools" is clicked in sidebar
   status    'development' | 'testing' | 'live'
             only 'live' tools are public/discoverable
   lastmod      ISO date string — used in sitemap.xml, update when tool changes
   hasUpdates   legacy flag; per-tool update pages were removed and update sitemap entries are no longer generated
   yearlyUpdate true ? tool contains hardcoded tax rates / thresholds / data that
                must be reviewed each April (or local tax year start). Use
                getYearlyUpdateTools() to list all tools needing attention.
--------------------------------------------------------------- */

export const CATEGORY_META = [
  { id: 'pdf',           label: 'PDF Tools'      },
  { id: 'css',           label: 'CSS Tools'      },
  { id: 'dev',           label: 'Dev Tools'      },
  { id: 'seo',           label: 'SEO Tools'      },
  { id: 'converters',    label: 'Converters'     },
  { id: 'design',        label: 'Design & SVG'   },
  { id: 'text',          label: 'Text & AI'      },
  { id: 'productivity',  label: 'Productivity'   },
  { id: 'learn',         label: 'Learn & Think'  },
];

export const TOOLS = [
  {
    slug:     'sql-playground',
    name:     'SQL Playground',
    sub:      'Learn SQL — 35 lessons · PostgreSQL WASM',
    desc:     'Learn SQL through 35 structured lessons with real PostgreSQL in your browser. Challenges, query explainer, multi-tab editor, data editor, table previews, query history, and smart error hints.',
    icon:     '/icons/sql-playground.svg',
    accent:   '#336791',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-19',
    hasUpdates: false,
  },
  {
    slug:     'mongo-playground',
    name:     'MongoDB Playground',
    sub:      'Learn MongoDB — 32 lessons · Query simulator',
    desc:     'Learn MongoDB interactively with a live query editor and instant results. 32 lessons across 10 chapters — CRUD, query operators, array queries, update operators, aggregation pipeline, and more. No install, no server.',
    icon:     '/icons/mongo-playground.svg',
    accent:   '#00ed64',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-20',
    hasUpdates: false,
  },
  {
    slug:     'express-playground',
    name:     'Express.js Playground',
    sub:      'Learn Express — 32 lessons · API simulator',
    desc:     'Learn Express.js interactively with a live API editor and HTTP client. 32 lessons — routing, middleware, REST APIs, error handling, authentication, and mini-projects. No Node.js install.',
    icon:     '/icons/express-playground.svg',
    accent:   '#68a063',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-20',
    hasUpdates: false,
  },
  {
    slug:     'graphql-playground',
    name:     'GraphQL Playground',
    sub:      'In-browser executor · 12 lessons',
    desc:     'Learn GraphQL in your browser with a full in-browser executor. 12 lessons covering queries, mutations, variables, fragments, directives, introspection, and unions. No server or account needed.',
    icon:     '/icons/graphql-playground.svg',
    accent:   '#E10098',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-21',
    hasUpdates: false,
  },
  {
    slug:     'firebase-playground',
    name:     'Firebase Playground',
    sub:      'Firestore simulator · 23 lessons',
    desc:     'Learn Firebase Firestore in your browser with a full in-browser simulator. Add, read, update, delete, query documents, use subcollections, real-time listeners, and special values. No Firebase account needed.',
    icon:     '/icons/firebase-playground.svg',
    accent:   '#FF6D00',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-21',
    hasUpdates: false,
  },
  {
    slug:     'rest-api-builder-playground',
    name:     'REST API Builder Playground',
    sub:      'Mock routes · Test requests · Export Express.js',
    desc:     'Create mock REST API routes visually, test GET/POST/PUT/DELETE requests with a built-in HTTP client, and export working Express.js code. CRUD templates, auth simulation, status codes, headers. No backend required.',
    icon:     '/icons/rest-api-builder-playground.svg',
    accent:   '#2563eb',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-20',
    hasUpdates: false,
  },




  {
    slug:     'mind-map',
    name:     'Mind Map Studio',
    sub:      'IndexedDB mind maps',
    desc:     'Multi-map mind mapping studio with IndexedDB autosave, same-device tab sync, outline navigation, auto layout, collapsible branches, node metadata, presentation mode, GitHub Gist sync, and PNG/Markdown/JSON export.',
    icon:     '/icons/mind-map.svg',
    accent:   '#6366f1',
    category: 'learn',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-24',
    hasUpdates: false,
  },
  {
    slug:     'database-schema-designer',
    name:     'Database Schema Designer',
    sub:      'Templates · Indexes · SQL dialects',
    desc:     'Design database tables, fields, indexes, keys, and relationships visually. Start from SaaS, ecommerce, or CRM templates and export PostgreSQL, MySQL, SQLite, Prisma, Mongoose, and Firestore code.',
    icon:     '/icons/database-schema-designer.svg',
    accent:   '#14b8a6',
    category: 'learn',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-24',
    hasUpdates: false,
  },



  {
    slug:     'jquery-playground',
    name:     'jQuery Playground',
    sub:      '72 lessons · live preview',
    desc:     'Learn jQuery with 72 interactive lessons across 16 chapters — including Utilities, Deferred & Promises, and Plugin Basics. Live preview, syntax highlighting, progress tracking, console, and quick-check challenges.',
    icon:     '/icons/jquery-playground.svg',
    accent:   '#0769ad',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-06-03',
    hasUpdates: false,
  },
  {
    slug:     'bootstrap5-playground',
    name:     'Bootstrap 5 Playground',
    sub:      '50 lessons · live preview',
    desc:     'Learn Bootstrap 5 with 50 interactive lessons across 15 chapters — grid, forms with floating labels, modals, toasts, offcanvas, carousel, position utilities, and more. Native dark mode, auto-init JS components, live preview.',
    icon:     '/icons/bootstrap5-playground.svg',
    accent:   '#6f42c1',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-27',
    hasUpdates: false,
  },
  {
    slug:     'ai-prompt-studio',
    name:     'AI Prompt Studio',
    sub:      'Score, fix & optimize prompts',
    desc:     'Score your AI prompts across 8 quality dimensions, detect anti-patterns, optimize for ChatGPT, Claude & Gemini, use 23 expert templates, and save a personal prompt library. No API key needed.',
    icon:     '/icons/ai-prompt-studio.svg',
    accent:   '#818cf8',
    category: 'text',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-17',
    hasUpdates: false,
  },

  {
    slug:     'vue-playground',
    name:     'Vue.js Playground',
    sub:      '40 lessons · Composition API · Mini-Projects',
    desc:     'Learn Vue 3 interactively with 40 guided lessons across 13 chapters — Options API, Composition API, all six core directives, composables, slots, provide/inject, Teleport, custom directives, v-memo, async components, and 4 real mini-projects. Live preview, progress tracking, share via URL. No install.',
    icon:     '/icons/vue-playground.svg',
    accent:   '#42b883',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-06-03',
    hasUpdates: false,
  },
  {
    slug:     'ui-snippets',
    name:     'UI Snippets Library',
    sub:      'Copy-paste HTML, CSS & JS components',
    desc:     'Browse and copy 175+ ready-to-use UI snippets — 12 categories, all with 9+ snippets. Heroes, pricing, Gantt charts, Pomodoro timers, video heroes, editable tables, side drawers, and more. Live editor, export to HTML, JSX, or Tailwind. Free.',
    icon:     '/icons/ui-snippets.svg',
    accent:   '#6366f1',
    category: 'learn',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-30',
    hasUpdates: false,
  },
  {
    slug:     'html-playground',
    name:     'HTML Playground',
    sub:      '42 lessons · Click-based · Live preview',
    desc:     'Learn HTML interactively with 42 click-based lessons across 13 chapters — tags, forms, tables, semantic HTML, responsive images, native components (dialog, SVG, ARIA), performance hints, and SEO metadata. Live split-pane preview, no typing required, no install.',
    icon:     '/icons/html-playground.svg',
    accent:   '#f97316',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-27',
    hasUpdates: false,
  },
  {
    slug:     'js-playground',
    name:     'JavaScript Playground',
    sub:      '60 lessons · DOM · Async · Canvas',
    desc:     'Learn JavaScript interactively with 60 guided lessons across 25 chapters — from variables and functions through DOM, events, async/await, fetch, closures, classes, generators, Web Workers, Canvas, performance, security, and testing. Live editor, clickable DOM preview, console panel, progress tracking. No install.',
    icon:     '/icons/js-playground.svg',
    accent:   '#f7df1e',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-06-03',
    hasUpdates: false,
  },
  {
    slug:     'svg-playground',
    name:     'SVG Playground',
    sub:      '44 lessons · shapes · paths · animation',
    desc:     'Learn SVG interactively from beginner to pro with 44 guided lessons across 12 chapters — shapes, paths, viewBox, gradients, patterns, text, transforms, filters, clipping, masking, plus CSS and SMIL animation. Live editor, instant preview, transparency grid, animation replay, progress tracking. No install.',
    icon:     '/icons/svg-playground.svg',
    accent:   '#ff9800',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-07-24',
    hasUpdates: false,
  },
  {
    slug:     'git-playground',
    name:     'Git Playground',
    sub:      '43 lessons · Branches · GitHub workflow',
    desc:     'Learn Git interactively with 43 guided lessons and a browser-safe terminal simulator — init, status, add, commit, log, branches, merge conflicts, remotes, GitHub workflow, undo, reset, revert, rebase, cherry-pick, hooks, submodules, LFS, signed commits, and CI/CD. No install.',
    icon:     '/icons/git-playground.svg',
    accent:   '#f97316',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-27',
    hasUpdates: false,
  },
  {
    slug:     'typescript-playground',
    name:     'TypeScript Playground',
    sub:      'Learn TypeScript with live lessons',
    desc:     'Learn TypeScript interactively with 32 guided lessons across 10 chapters — basic types, inference, arrays, tuples, object types, aliases, interfaces, unions, functions, classes, generics, utility types, keyof, type guards, conditional types, mapped types, async patterns, tsconfig, migration, and best practices. No install, no setup.',
    icon:     '/icons/typescript-playground.svg',
    accent:   '#3178c6',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-06-03',
    hasUpdates: false,
  },
  {
    slug:     'tailwind-playground',
    name:     'Tailwind Playground',
    sub:      'Learn Tailwind CSS with a live editor',
    desc:     'Learn Tailwind CSS interactively with a live HTML editor and instant preview. 48 lessons across 15 chapters — utility classes, group/peer modifiers, arbitrary variants, has-* modifier, @layer, print styles, motion-safe, skeleton loading, dialog/popover patterns, Tailwind v4 changes, and accessibility. No install, no setup.',
    icon:     '/icons/tailwind-playground.svg',
    accent:   '#06b6d4',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-27',
    hasUpdates: false,
  },
  {
    slug:     'css-playground',
    name:     'CSS Playground',
    sub:      'Learn CSS with a live editor',
    desc:     'Learn CSS interactively with a live editor and instant preview. 53 lessons across 18 chapters — selectors, box model, flexbox, grid, animations, variables, responsive design, container queries, subgrid, CSS nesting, @layer, logical properties, scroll-driven animations, blend modes, @property, and modern units. No install, no setup.',
    icon:     '/icons/css-playground.svg',
    accent:   '#2563eb',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-17',
    hasUpdates: false,
  },
  {
    slug:     'scss-playground',
    name:     'SCSS Playground',
    sub:      '45 lessons · Sass modules · tokens',
    desc:     'Learn SCSS and Sass online with 45 guided lessons, a live HTML preview, and compiled CSS output — variables, nesting, @use, @forward, mixins, functions, maps, loops, design tokens, CSS variables, responsive mixins, cascade layers, container queries, architecture, and modern Sass patterns. No install.',
    icon:     '/icons/scss-playground.svg',
    accent:   '#cf649a',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-28',
    hasUpdates: true,
  },
  {
    slug:     'react-playground',
    name:     'React Playground',
    sub:      'Learn React with a live code editor',
    desc:     'Learn React interactively with a live code editor and instant preview. 44 lessons across 19 chapters — JSX, hooks, state, forms, error boundaries, portals, keys, compound components, render props, Suspense, useTransition, testing, GSAP in React, and more. JSX syntax highlighting, console panel, Quick Check challenges. No install, no setup.',
    icon:     '/icons/react-playground.svg',
    accent:   '#61dafb',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-06-03',
    hasUpdates: false,
  },
  {
    slug:     'angular-playground',
    name:     'Angular Playground',
    sub:      '45 lessons · Signals · RxJS · Testing',
    desc:     'Learn Angular interactively with 45 guided lessons across 13 chapters — templates, directives, components, services, routing, standalone components, signals, reactive forms, RxJS, lazy loading, change detection, testing, and feature architecture. Live preview, no Angular CLI, no install.',
    icon:     '/icons/angular-playground.svg',
    accent:   '#dd0031',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-06-03',
    hasUpdates: false,
  },
  {
    slug:     'nextjs-playground',
    name:     'Next.js Playground',
    sub:      'App Router sandbox',
    desc:     'Prototype Next.js App Router screens in your browser. Edit page.jsx, layout.jsx, globals.css, and a route handler with live preview, API testing, autosave, and ZIP export.',
    icon:     '/icons/nextjs-playground.svg',
    accent:   '#111827',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-20',
    hasUpdates: false,
  },
  {
    slug:     'nodejs-playground',
    name:     'Node.js Playground',
    sub:      'Visual event loop simulator',
    desc:     'Learn Node.js visually with a client-side event loop simulator for async/await, Promises, fs examples, and API examples. Simulated output, no backend execution.',
    icon:     '/icons/nodejs-playground.svg',
    accent:   '#68a063',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-20',
    hasUpdates: false,
  },
  {
    slug:     'php-playground',
    name:     'PHP Playground',
    sub:      '60 lessons · Forms · OOP · MySQL',
    desc:     'Learn PHP online with 60 guided lessons and a browser-safe simulator — syntax, variables, forms, validation, arrays, OOP, JSON APIs, PDO/MySQL, Composer, PHPUnit, Laravel basics, deployment, and security. No install.',
    icon:     '/icons/php-playground.svg',
    accent:   '#777bb4',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-27',
    hasUpdates: false,
  },
  {
    slug:     'python-playground',
    name:     'Python Playground',
    sub:      '18 lessons · visual code tracer',
    desc:     'Learn Python with 18 guided lessons across 8 chapters — variables, strings, numbers, booleans, while loops, list comprehensions, tuples, sets, dictionaries, functions, lambda, scope, classes, try/except, and JSON. Step-by-step visual tracer shows memory diffs, call stack, and output on every line.',
    icon:     '/icons/python-playground.svg',
    accent:   '#3776ab',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-05-27',
    hasUpdates: false,
  },
  {
    slug:     'gsap-playground',
    name:     'GSAP Playground',
    sub:      'Learn GSAP animation interactively',
    desc:     'Learn GSAP animation interactively with a live JavaScript editor and instant visual preview. 55 lessons across 18 chapters — gsap.to(), timelines, stagger, ScrollTrigger, keyframes, gsap.utils, matchMedia, reduced motion, official GSAP plugins, and real animation patterns. Replay button, progress saved locally. No install, no setup.',
    icon:     '/icons/gsap-playground.svg',
    accent:   '#88ce02',
    category: 'dev',
    extended: false,
    status:   'live',
    lastmod:  '2026-06-03',
    hasUpdates: false,
  },
];

export const TOOL_STATUS = Object.freeze({
  DEVELOPMENT: 'development',
  TESTING: 'testing',
  LIVE: 'live',
  SOON: 'soon',
});

export function isLiveTool(tool) {
  return tool?.status === TOOL_STATUS.LIVE;
}

export function getYearlyUpdateTools(tools = TOOLS) {
  return tools.filter(t => t?.yearlyUpdate === true);
}

export function uniqueTools(tools = TOOLS) {
  const seen = new Set();
  return tools.filter(tool => {
    if (!tool?.slug || seen.has(tool.slug)) return false;
    seen.add(tool.slug);
    return true;
  });
}

export const SEARCHABLE_TOOLS = uniqueTools(TOOLS);
export const LIVE_TOOLS = uniqueTools(TOOLS).filter(isLiveTool);


