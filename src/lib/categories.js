/* Central definition for category cluster pages.
   Each category page lives at /<slug>/ and lists tools from multiple
   registry categories — allowing one tool to appear in several clusters. */

import { LIVE_TOOLS, CATEGORY_META } from './tools-registry.js';

// /tools/ lists every live tool (the UI Snippets library has its own tab), grouped in
// the registry's category order.
const CATEGORY_ORDER = new Map(CATEGORY_META.map((c, i) => [c.id, i]));
const ALL_TOOL_SLUGS = LIVE_TOOLS
  .filter(t => t.slug !== 'ui-snippets')
  .slice()
  .sort((a, b) => (CATEGORY_ORDER.get(a.category) ?? 99) - (CATEGORY_ORDER.get(b.category) ?? 99))
  .map(t => t.slug);

export const CATEGORIES = [







  {
    slug:        'learn-to-code',
    name:        'Learn to Code',
    headline:    'Learn to Code Free — Interactive Playgrounds for HTML, CSS, JavaScript, React & More',
    tagline:     '25 browser-based coding playgrounds — frontend, backend and databases — with live preview and structured lessons. No install, no signup — open any playground and start immediately.',
    accent:      '#6366f1',
    icon:        '🎓',
    toolSlugs: [
      'ui-snippets',
      'html-playground',
      'js-playground',
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
      'svg-playground', 'git-playground', 'python-playground', 'nodejs-playground', 'php-playground', 'sql-playground', 'mongo-playground', 'express-playground', 'graphql-playground', 'firebase-playground', 'rest-api-builder-playground', 'redis-playground'],
    related: ['css-tools', 'developer-tools', 'design-tools'],
    about: `Learning to code is easier when you can see the result of every change instantly. These interactive playgrounds cover the frontend stack — HTML, CSS, SCSS/Sass, JavaScript, TypeScript, jQuery, Bootstrap 5, Tailwind CSS, React, Vue.js, Angular, Next.js, GSAP, and SVG — each with a structured curriculum of lessons, a live editor, or an instant preview. No Node.js, no terminal, no build step. Open the browser and start writing.

### Why Playgrounds Matter More in the Age of AI

AI tools like ChatGPT, GitHub Copilot, and Claude can generate code in seconds. But AI increases the need for interactive learning environments — not the other way around.

People no longer need to memorise syntax. But they still need to **understand what code does**, experiment visually, debug AI-generated output, tweak results quickly, learn concepts interactively, and compare variations in real time. That is exactly where playgrounds become essential.

Consider how this plays out across tools: AI can generate Tailwind classes, but you still need a live preview to understand spacing and layout. AI can generate GSAP animations, but you still need timeline controls and sliders to see how easing and stagger actually feel. AI can generate React components, but you still need a sandbox to understand how props flow, when state re-renders, and what hooks actually do.

The shift happening right now is from **memorising code** to **understanding behaviour** — and playgrounds are built for behaviour-based learning. Every lesson here runs real code, gives you immediate visual feedback, and lets you modify, break, and fix things in a safe environment. That is a skill AI cannot replace: knowing whether the output is actually correct.

### HTML Playground

The **HTML Playground** teaches the building blocks of every web page. 42 lessons across 13 chapters cover document structure, text elements, links and images, tables, forms, semantic HTML, accessibility attributes, performance, and SEO essentials. Each lesson loads a working HTML example into the editor — change a tag, add an attribute, and the preview updates instantly. A collapsible concept panel explains what each element does and when to use it. Quick Check challenges test your understanding after key lessons.

### JavaScript Playground

The **JavaScript Playground** teaches the language layer that makes pages interactive. Work through 60 lessons across 25 chapters covering variables, types, operators, string and number methods, conditions, loops, functions, arrays, reduce, objects, debugging, try/catch, DOM selection, creating elements, rendering data, class toggles, click events, event delegation, form input, JSON, data transformation, setTimeout, Promises, async loading patterns, closures, this, bind/call/apply, classes, prototypes, modules, fetch, storage patterns, URLSearchParams, FormData, event loop ordering, debounce, throttle, Canvas, Web Workers, Drag and Drop, Clipboard, generators, regex, AbortController, observers, Proxy, performance measurement, safe rendering, tiny tests, and mini projects. Lessons run in a sandboxed preview with helper functions like write(), app, $(), and $$(), so you can edit code, click the result, inspect console output, and learn the browser APIs without setting up a project.

### TypeScript Playground

The **TypeScript Playground** teaches typed JavaScript through 32 lessons across 10 chapters. Start with simple types, inference, any, unknown, arrays, tuples, object types, optional fields, readonly fields, enums, aliases, interfaces, unions, typed functions, casting, classes, access modifiers, generics, constraints, utility types, keyof, null safety, and type guards. Then move into pro topics like conditional types, mapped types, literal types, index signatures, async return types, tsconfig mental models, JavaScript migration, and real project best practices. It is built for learners who know some JavaScript and want to understand TypeScript before using it in React, Angular, Node.js, or Next.js projects.

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

### Why Structured Playgrounds Beat Video Tutorials

Watching a tutorial is passive. Writing code is active. These playgrounds keep you in the editor — reading a short concept explanation, applying it in working code, checking your understanding with a quick question, and moving to the next idea. Progress is saved in localStorage so you resume exactly where you left off. Chapters unlock confetti when completed, and the sidebar shows a green dot for every lesson you have finished — making it easy to see how far you have come and what is left.`,
    useCases: [
      { icon: 'LEARN', title: 'Absolute beginners learning HTML', desc: 'Start with the HTML Playground and work through the structured lesson path from document structure to semantic elements and forms. No setup, no confusion about file paths or editors — just open the browser and follow the curriculum.' },
      { icon: 'CODE', title: 'HTML learners adding interactivity', desc: 'Move into the JavaScript Playground to learn variables, functions, DOM selection, and click events with a real preview you can edit and interact with.' },
      { icon: 'DESIGN', title: 'Designers learning CSS, SCSS and Tailwind', desc: 'Use the CSS Playground to understand the box model, flexbox, and transitions, the SCSS Playground to learn Sass variables, mixins, modules, and tokens, then the Tailwind Playground to learn utility-first styling.' },
      { icon: 'CODE', title: 'JavaScript developers picking up React', desc: 'The React Playground introduces JSX and hooks through focused lessons without the overhead of a full project setup. Write a component, add state, pass props — all in the browser with immediate results.' },
      { icon: 'PEOPLE', title: 'Teachers and workshop instructors', desc: 'Load a lesson on a projected screen, walk through the concept, then live-edit the code and show the preview changing. The split-pane layout is designed for classroom use — concept on top, code below, preview on the right.' },
      { icon: 'LEARN', title: 'Filling gaps in existing knowledge', desc: 'Skip to the specific chapter that covers your gap — CSS Grid, Tailwind Group modifiers, React useEffect — without sitting through a full course. Each chapter is self-contained and takes 10–20 minutes.' },
      { icon: 'FLOW', title: 'Adding animation to web projects', desc: 'Use the GSAP Playground to learn tweens, timelines, stagger, and ScrollTrigger animations. Replay at ¼ speed to study easing, toggle markers to see ScrollTrigger boundaries, then copy the code into any project.' },
      { icon: 'COPY', title: 'Quick prototyping without project setup', desc: 'Use any playground as a scratch pad. Load a lesson close to what you need, edit the code to match your design, and copy the output into your project. Faster than remembering syntax from memory.' },
    ],
    faqs: [
      {
        q: 'Do I need to install anything to use these playgrounds?',
        a: 'No. All 25 playgrounds run in the browser with zero setup. HTML, JavaScript, SVG, TypeScript, CSS, SCSS, and Tailwind use the browser\'s native rendering engine, a local sandbox, or a browser-safe learning compiler. The SVG Playground renders your markup live in a sandboxed frame so CSS and SMIL animations run natively. The SCSS Playground uses a browser-safe Sass learning compiler for lesson patterns. The Tailwind Playground loads the official Tailwind Play CDN. The React Playground uses Babel standalone to transpile JSX. The Vue.js Playground loads Vue 3 from CDN. The GSAP Playground loads GSAP and plugin files from the installed package. No Node.js, no npm, no terminal — just open the URL and start writing.',
      },
      {
        q: 'Is my progress saved between sessions?',
        a: 'Yes. Every playground saves your completed lessons and current position to localStorage automatically — no account required. When you return, it resumes at the exact lesson you left on. Quick Check challenge answers are also persisted — a completed challenge shows a green confirmation instead of repeating the question. Your progress survives browser restarts and is stored per device, not per browser session.',
      },
      {
        q: 'Which playground should I start with if I am a complete beginner?',
        a: 'Start with the HTML Playground — it covers document structure, text elements, links, images, tables, forms, and semantic HTML from the ground up with no prior knowledge required. Once you can read and write basic HTML confidently, use the JavaScript Playground to learn variables, functions, DOM selection, and events, then move to the CSS Playground to style elements. After CSS, the Tailwind Playground shows you a faster utility-first approach to styling. Save the React Playground until you are comfortable with HTML structure and basic JavaScript concepts.',
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
        a: 'HTML Playground: 42 lessons. JavaScript Playground: 60 lessons. TypeScript Playground: 32 lessons. CSS Playground: 53 lessons. SCSS Playground: 45 lessons. Tailwind Playground: 48 lessons. React Playground: 44 lessons. Vue.js Playground: 40 lessons across 13 chapters including mini-projects. GSAP Playground: 55 lessons. Together they cover HTML, CSS, SCSS, JavaScript, TypeScript, jQuery, Bootstrap 5, Tailwind, React, Vue 3, Angular, Next.js, SVG, and animation.',
      },
      {
        q: 'Are these playgrounds suitable for teaching a class or running a coding workshop?',
        a: 'Yes — the split-pane layout works well on a projected screen. Load a lesson, walk through the concept panel, then live-edit the HTML or CSS and show the preview changing in real time. The dark mode toggle and responsive preview buttons are particularly effective for demonstrating these features to an audience without switching browser tabs or apps. Students can follow along on their own laptops simultaneously since no install is needed — just share the URL.',
      },
    ],
    metadata: {
      title: 'Interactive Coding Playgrounds - Learn HTML, CSS, SCSS, JavaScript, TypeScript, Angular, React, Vue & Next.js | webdevpuneet.com',
      description: 'Free browser-based frontend coding playgrounds with live previews and structured lessons. Learn HTML, CSS, SCSS/Sass, JavaScript, TypeScript, Angular, React, Vue, Next.js, Tailwind, Bootstrap, GSAP, and SVG visually. No install, no setup.',
      keywords: ['learn html online', 'javascript playground', 'typescript playground', 'learn typescript online', 'angular playground online', 'learn angular online', 'css playground', 'scss playground', 'sass playground', 'learn sass online', 'tailwind css playground', 'react playground online', 'gsap playground', 'interactive coding lessons', 'learn css visually', 'html tutorial browser', 'javascript tutorial browser', 'typescript tutorial browser', 'angular tutorial browser', 'tailwind tutorial', 'react tutorial browser', 'learn to code free', 'coding playground no install', 'live html editor'],
    },
  },
  // ── CSS tools hub (moved from fwdtools 2026-10-01) ──
  {
    slug:        'css-tools',
    name:        'CSS Tools',
    headline:    'Free Online CSS Tools & Generators',
    tagline:     'Build layouts, generate animations, create effects, and convert CSS — all with live preview, instant copy, and zero sign-up.',
    accent:      '#818cf8',
    icon:        '🎨',
    toolSlugs: [
      // layout builders — most commonly needed
      'flexbox-builder', 'css-grid-builder',
      // visual effects — high search volume
      'gradient-generator', 'box-shadow-generator', 'glassmorphism-generator',
      // animation
      'css-animation-generator',
      // color
      'color-palette-generator', 'color-picker', 'color-contrast-checker',
      // tailwind converters — popular workflow
      'css-to-tailwind', 'tailwind-to-css',
      // utilities
      'css-autoprefixer', 'css-minifier-beautifier', 'css-clamp-generator', 'css-media-queries-generator', 'rem-px-converter',
      // components
      'css-button-generator', 'navbar-builder', 'carousel-builder',
      // less common generators
      'mesh-gradient-generator', 'css-clip-path-generator', 'css-loader-generator',
      'css-transform-generator', 'css-filter-generator',
      'css-easing-generator', 'css-shape-generator', 'toggle-switch-generator',
      // SVG, typography and responsive
      'svg-animation-generator', 'svg-motion-studio', 'font-pairing-tool', 'responsive-preview-tool',
      'css-to-tailwind', 'tailwind-to-css',
      'css-to-tailwind', 'tailwind-to-css',
    ],
    related: ['design-tools', 'developer-tools'],
    about: `Writing CSS by hand is slow — especially when iterating on shadow layers, gradient stops, animation timing functions, or grid template areas. These free CSS generators let you adjust visual controls, see a live preview, and copy production-ready CSS — or export to Tailwind, SCSS, or React inline styles — in seconds.

### Layout Builders

The **Flexbox Builder** is the most complete free Flexbox tool available. Control every flex property on the container — flex-direction, justify-content, align-items, align-content, flex-wrap, and gap — and configure flex-grow, flex-shrink, flex-basis, align-self, and order on individual child elements. The live preview responds to every control change. Export as plain CSS, SCSS, Tailwind utility classes, or React inline styles.

The **CSS Grid Builder** lets you drag to create named grid template areas, set column and row sizes (fr units, px, %, auto, minmax), and generate the full CSS Grid layout. Export as CSS, Tailwind config, React component, or an HTML template with named areas pre-filled.

### Visual Effect Generators

The **Box Shadow Generator** is a multi-layer shadow studio — stack multiple shadows with independent offset, blur, spread, color, opacity, and inset controls. Includes neumorphism presets. The **Gradient Generator** supports linear, radial, and conic gradients with a colour-stop editor — export as CSS, Tailwind, or SVG. The **Mesh Gradient Generator** creates organic fluid gradients with draggable blob anchors, exportable as SVG, CSS, or PNG.

The **Glassmorphism Generator** builds frosted-glass card effects. Upload a custom background image to preview the effect against your actual content, then adjust blur, transparency, saturation, border, and shadow. The **CSS Animation Generator** produces @keyframes CSS with 79 presets and full timing controls. The **CSS Easing Generator** provides a Bézier curve editor with a live motion preview.

### Utility and Conversion Tools

The **CSS Clamp() Generator** creates a complete fluid typography scale using the CSS clamp() function — font sizes that scale smoothly between viewport breakpoints without JavaScript. The **CSS Autoprefixer** adds vendor prefixes with PostCSS Autoprefixer, Browserslist presets, rejected browsers, CSS Grid modes, and Flexbox prefix controls. The **CSS Minifier / Beautifier** compresses or prettifies CSS and shows before/after file size. **CSS to Tailwind** and **Tailwind to CSS** converters handle arbitrary-value syntax. The **Color Contrast Checker** verifies WCAG 2.1 AA and AAA compliance for any foreground/background pair and suggests the nearest passing color when a pair fails. The **Media Queries Generator** supports Bootstrap, Tailwind, and MUI breakpoints with dark mode, reduced motion, and retina query options.

### Why Use Browser-Based CSS Tools

Every tool in this collection runs entirely in your browser — no sign-up, no server, no data sent anywhere. The live preview updates as you drag sliders or change values, making it fast to iterate without writing code manually. The generated CSS is production-ready and works in all modern browsers. Whether you are a beginner experimenting with box shadows or a professional building a design system, these tools remove the friction between an idea and working CSS code. Export formats include plain CSS, Tailwind utility classes, SCSS variables, and React inline style objects — so the output fits directly into whatever stack you use.`,
    useCases: [
      { icon: '📐', title: 'Build Flexbox and Grid layouts', desc: 'Use the visual Flexbox Builder and CSS Grid Builder to configure complex layouts without writing syntax from memory. Export as plain CSS, Tailwind classes, SCSS, or a React component.' },
      { icon: '✨', title: 'Add glassmorphism card effects', desc: 'Configure blur radius, transparency, border, and shadow for a frosted-glass card UI against your actual background image. The output is a single CSS block ready to apply to any element.' },
      { icon: '🌈', title: 'Generate gradients for backgrounds', desc: 'Create linear, radial, conic, and mesh gradients with a colour-stop editor and live preview. Export as a CSS background property, SVG, or Tailwind gradient class for direct use in your project.' },
      { icon: '🎞️', title: 'Prototype CSS animations', desc: 'Build keyframe animations and loader spinners with 79 presets, full timing controls, and a live preview. Export as a complete @keyframes CSS block with configurable duration, delay, and iteration count.' },
      { icon: '🔄', title: 'Convert between CSS and Tailwind', desc: 'Paste existing CSS to get equivalent Tailwind utility classes, or paste Tailwind to see the underlying CSS. Handles arbitrary-value syntax and is useful when migrating between styling systems.' },
      { icon: '📱', title: 'Generate fluid responsive typography', desc: 'Use the CSS Clamp Generator to produce font sizes that scale smoothly between viewport breakpoints using the clamp() function — no breakpoint media queries or JavaScript required.' },
    ],
    faqs: [
      {
        q: 'Can I export the generated CSS directly to Tailwind?',
        a: 'Yes. Most visual generators include a Tailwind export tab alongside plain CSS and SCSS. The Flexbox Builder, CSS Grid Builder, Box Shadow Generator, Gradient Generator, CSS Animation Generator, CSS Transform Generator, and Glassmorphism Generator all output Tailwind utility classes. The dedicated CSS → Tailwind converter handles arbitrary-value classes for values outside Tailwind\'s default scale.',
      },
      {
        q: 'How does the Flexbox Builder help me learn CSS Flexbox?',
        a: 'Every control in the Flexbox Builder maps to a real CSS property. As you click options the live code panel updates instantly, so you see the exact CSS declaration that produces each layout change. You can experiment with align-items vs align-content, or flex-grow vs flex-basis, and see the visual difference and the corresponding CSS at the same time — making it both a generator and a learning tool.',
      },
      {
        q: 'What is the CSS Clamp() Generator used for?',
        a: 'The CSS clamp() function creates responsive values — most commonly font sizes — that scale fluidly between a minimum and maximum without JavaScript or breakpoint media queries. The generator builds a complete type scale (xs through 4xl) using clamp(), with configurable min and max viewport widths and a scale ratio. You get a set of CSS custom property declarations ready to drop into any project.',
      },
      {
        q: 'Does the Glassmorphism Generator support custom backgrounds?',
        a: 'Yes. Upload any image as the background so you can preview the frosted-glass effect against your actual content — not a generic placeholder. Adjust blur, transparency, saturation, border opacity, and shadow with live feedback. Export as CSS, Tailwind classes, or React inline styles. The generated CSS uses backdrop-filter, supported in all modern browsers.',
      },
      {
        q: 'Is there a tool for generating CSS media queries?',
        a: 'Yes — the Media Queries Generator supports Bootstrap 5, Tailwind CSS, and MUI breakpoints out of the box. Add dark mode (@media prefers-color-scheme: dark), reduced motion, print, and HiDPI / Retina queries. Export as CSS, SCSS mixins, Tailwind configuration, or JavaScript breakpoint constant strings.',
      },
      {
        q: 'What does the CSS Minifier do to my stylesheet?',
        a: 'The CSS Minifier removes whitespace, comments, and redundant semicolons to reduce file size for production — showing before and after byte count and percentage saved. The Beautifier (same tool, other direction) takes minified or poorly-formatted CSS and reformats it with consistent indentation and line breaks for readability.',
      },
      {
        q: 'Can the Color Contrast Checker help me meet WCAG accessibility standards?',
        a: 'Yes. It tests any foreground and background color pair against WCAG 2.1 contrast ratio requirements: AA requires 4.5:1 for normal text and 3:1 for large text; AAA requires 7:1 and 4.5:1 respectively. If the pair fails, the tool suggests the nearest passing color variant so you can adjust your palette while keeping your design intent.',
      },
      {
        q: 'How does the CSS Grid Builder handle named template areas?',
        a: 'The CSS Grid Builder lets you draw a grid by clicking and dragging cells, then assign a name to each region. Named regions map directly to the CSS grid-template-areas property. The output includes both grid-template-areas for the container and grid-area for each named child — ready to paste into your stylesheet or use as a React component.',
      },
    ],
    metadata: {
      title: 'Online CSS Tools & Generators — Free Flexbox, Grid, Animations & More | webdevpuneet.com',
      description: 'Free CSS generators with live preview: Flexbox Builder, CSS Grid Builder, CSS Autoprefixer, Box Shadow, Gradient, Animation, Glassmorphism, CSS to Tailwind, and more.',
      keywords: ['css tools online free', 'css generator', 'css autoprefixer online', 'postcss autoprefixer', 'browserslist css prefixes', 'flexbox builder online', 'css grid builder', 'box shadow generator', 'gradient generator css', 'css animation generator', 'glassmorphism generator', 'mesh gradient generator', 'css to tailwind converter', 'tailwind to css', 'css clamp generator', 'css minifier online', 'css clip path generator', 'color contrast checker wcag'],
    },
  },
  // ── All tools hub: every live tool, so a new tool shows up here without editing this list ──
  {
    slug:        'tools',
    name:        'All Tools',
    headline:    'All Free Developer Tools, Generators & Playgrounds',
    tagline:     'Every tool on webdevpuneet.com in one place — CSS generators, converters, dev utilities and interactive coding playgrounds. Free, private and right in your browser.',
    accent:      '#6366f1',
    icon:        '🧰',
    toolSlugs:   ALL_TOOL_SLUGS,
    related:     ['css-tools', 'learn-to-code'],
    about: `Front-end work is full of small jobs that shouldn't need a new npm package, a desktop app or an account: tuning a box shadow, building a grid layout, formatting a JSON response, converting HTML to JSX, testing an API, or learning how a React hook behaves. This page collects every free developer tool on webdevpuneet.com — more than 80 of them — in one searchable directory, grouped by what they help you do.

Type into the search box above the grid to filter by name or description, or browse the groups below. Every card opens a working tool straight away — no sign-up, no install and no usage limit.

### CSS Generators and Layout Builders

The largest group is visual CSS tooling. The **Flexbox Builder** and **CSS Grid Builder** let you configure layouts with clicks instead of memorised syntax, with a live preview and copy-ready code. For visual effects there is a **Gradient Generator**, **Mesh Gradient Generator**, **Box Shadow Generator**, **Glassmorphism Generator**, **CSS Clip-path Generator**, **CSS Filter Generator**, **CSS Transform Generator** and **CSS Shape Generator**. Motion is covered by the **CSS Animation Generator**, **CSS Easing Generator** and **CSS Loader Generator**, and components by the **CSS Button Generator**, **Toggle Switch Generator**, **Navbar Builder** and **Carousel Builder**.

Utility tools round it out: the **CSS Clamp() Generator** for fluid typography, **Media Queries Generator**, **CSS Autoprefixer**, **CSS Minifier / Beautifier**, **REM ↔ PX Converter**, and the **CSS → Tailwind** and **Tailwind → CSS** converters. For colour, use the **Color Picker**, **Color Palette Generator** and the **Color Contrast Checker** for WCAG AA and AAA compliance. The CSS Tools page lists just this group.

### Interactive Coding Playgrounds

The playgrounds are structured, lesson-based editors with a live preview — learn by changing real code rather than watching a video. Front-end playgrounds cover **HTML**, **CSS**, **SCSS**, **JavaScript**, **TypeScript**, **Tailwind CSS**, **Bootstrap 5**, **jQuery**, **React**, **Vue.js**, **Angular**, **Next.js**, **GSAP** and **SVG**. Back-end and data playgrounds cover **Node.js**, **Express.js**, **Python**, **PHP**, **SQL**, **MongoDB**, **Redis**, **GraphQL**, **Firebase**, **Git** and a **REST API Builder**. Lesson progress is saved in your browser, so you can close the tab and pick up exactly where you left off. The Learn to Code page lists just the playgrounds.

### Code Formatters, Validators and Data Tools

For everyday clean-up and inspection there is a **JSON Formatter**, **XML Formatter / Validator**, **SQL Formatter**, **HTML Formatter**, **Tailwind Formatter** and **JavaScript Minifier**. Working with data is easier with the **JSON Schema Generator**, **JSON Table Viewer** and **JSON Dashboard Generator**, while the **Diff Checker** compares two blocks of text or code side by side. Smaller helpers include the **HTML Entity Encoder**, **UUID / ULID / NanoID** generator, **HTML Table Generator** and **Markdown Table Generator**.

### API and Back-End Helpers

The **API Request Generator & Tester** builds HTTP request code in many languages and sends test requests from your browser, and the **API Mock Generator** produces realistic mock data and endpoints for prototyping a front end before the real API exists.

### Converters

Convert between the formats you meet every day: **HTML → JSX**, **JSON → TypeScript**, **HTML to Markdown**, **Markdown to HTML**, **Image to Base64**, **Image to SVG** and **SVG to PNG**.

### Design, SVG and Writing Tools

Design helpers include the **SVG Wave Generator**, **SVG Animation Generator**, **SVG Motion Studio**, **Animated SVG Icons**, **Font Pairing Tool**, **Image Color Palette Extractor**, **Aspect Ratio Calculator**, **Responsive Preview** and **Code Screenshot** for sharing good-looking code images. For writing there is a **Markdown Editor**, a **Lorem Ipsum Generator** and **AI Prompt Studio** for building structured prompts.

### Free, Private and Built for the Browser

These tools do their work in your browser, so what you paste — CSS, JSON, SQL, HTML or an image — is processed on your own device rather than uploaded to a server. The exception is by design: the API tester sends the requests you ask it to send. There is no account to create, no trial that expires and no daily limit. Because nothing needs installing, they also work on a locked-down work laptop, a borrowed machine or a Chromebook.

### Which Tool Should You Use?

If you are styling something, start with the CSS generators. If you are learning a language or framework, open its playground and follow the lessons in order. If you are debugging or tidying data, reach for the formatters, validators and converters. And if you are not sure, type what you want to do into the search box — it matches tool names and descriptions.`,
    useCases: [
      { icon: '🔎', title: 'Find the right tool in seconds', desc: 'Type what you need — "shadow", "json", "tailwind", "sql" — into the search box and the grid filters every tool by name and description instantly.' },
      { icon: '🎨', title: 'Generate production-ready CSS', desc: 'Build gradients, shadows, glassmorphism, clip-paths, animations and full Flexbox or Grid layouts with a live preview, then copy CSS — or a Tailwind, SCSS or React version — straight into your project.' },
      { icon: '🎓', title: 'Learn a language or framework', desc: 'Work through structured lessons for HTML, CSS, JavaScript, TypeScript, React, Vue, Angular, Python, SQL and more in a live editor. Progress is saved in your browser — no course sign-up.' },
      { icon: '🧹', title: 'Format and validate code', desc: 'Paste messy JSON, XML, SQL or HTML and get it indented, validated and readable in one click — handy when inspecting an API response or a log file.' },
      { icon: '🔁', title: 'Convert between formats', desc: 'Turn HTML into JSX for a React component, JSON into TypeScript interfaces, Markdown into HTML, CSS into Tailwind classes, or an image into Base64 — without writing a throwaway script.' },
      { icon: '🔌', title: 'Prototype and test APIs', desc: 'Generate request code in your language of choice, send test calls from the browser, and mock endpoints and data so front-end work isn\'t blocked waiting on the back end.' },
      { icon: '♿', title: 'Check accessibility', desc: 'Test text and background colour pairs against WCAG AA and AAA contrast ratios with the Color Contrast Checker before a design ships.' },
      { icon: '💻', title: 'Work on any machine', desc: 'Nothing to install means the same tools work on a locked-down office laptop, a borrowed computer or a Chromebook — open the page and get on with it.' },
    ],
    faqs: [
      {
        q: 'Are all of these developer tools free?',
        a: 'Yes. Every tool on webdevpuneet.com is completely free, with no sign-up, no account, no trial period and no usage limit. Open any tool and use it as often as you like.',
      },
      {
        q: 'Is my code or data uploaded to a server?',
        a: 'No. The tools process your input in your browser, so code, JSON, CSS and images you paste stay on your device. The one deliberate exception is the API Request Tester, which sends the HTTP requests you ask it to send. Playground progress and saved settings are kept in your browser\'s local storage.',
      },
      {
        q: 'Do I need to install anything or create an account?',
        a: 'No. Every tool runs in a modern browser such as Chrome, Edge, Firefox or Safari. Some playgrounds load a library like React, Vue or Tailwind from a CDN when they open, but there is nothing for you to install and no account to create.',
      },
      {
        q: 'How many tools are there?',
        a: 'More than 80, and the list grows as new tools are added — this page always shows every live tool. They cover CSS generators, interactive coding playgrounds, code formatters and validators, converters, API helpers, and design, SVG and writing tools.',
      },
      {
        q: 'What is the difference between All Tools, CSS Tools and Learn to Code?',
        a: 'All Tools lists every tool on the site. CSS Tools is a focused page with only the CSS generators, layout builders and CSS utilities. Learn to Code shows only the interactive, lesson-based coding playgrounds. Use the tabs above the grid to switch between them.',
      },
      {
        q: 'Can I use the generated code in commercial projects?',
        a: 'Yes. Code you generate or write with these tools is yours to use in personal and commercial projects, with no attribution required.',
      },
      {
        q: 'Do the tools work on mobile?',
        a: 'Most tools work on phones and tablets, but the generators and playgrounds are designed for a larger screen, where the controls, editor and live preview fit side by side. For longer sessions a laptop or desktop is the better experience.',
      },
      {
        q: 'Which tool should a beginner start with?',
        a: 'Start with the HTML Playground, then the CSS Playground and JavaScript Playground — each teaches through short lessons with a live preview. Once you are styling real pages, the Flexbox Builder and CSS Grid Builder are the quickest way to understand layout by seeing every property change the result.',
      },
    ],
    metadata: {
      title: 'All Free Developer Tools & Generators | webdevpuneet.com',
      description: '80+ free developer tools in one place: CSS generators, coding playgrounds, JSON & code formatters, converters and API helpers. In-browser, no sign-up.',
      keywords: ['free developer tools', 'online developer tools', 'web developer tools online', 'free css generators', 'online code formatter', 'json formatter online', 'coding playgrounds online', 'html to jsx converter', 'api request tester online', 'free web dev tools no signup', 'browser based developer tools', 'front end developer tools'],
    },
  },
  // ── Image tools hub (moved from fwdtools 2026-10-06) ──
  {
    slug:        'image-tools',
    name:        'Image Tools',
    headline:    'Free Online Image Tools — No Upload Needed',
    tagline:     'Edit, compress, convert, trace and generate images — resize, remove backgrounds, relight photos, make favicons and OG images, all processed in your browser with no file uploads.',
    accent:      '#10b981',
    icon:        '🖼️',
    toolSlugs: [
      // most-searched image tasks
      'image-editor', 'image-compressor', 'image-background-remover', 'relight-photo', 'favicon-generator',
      // generation
      'og-image-generator', 'code-screenshot-generator',
      // format conversion
      'image-to-svg', 'svg-to-png', 'image-to-base64',
      // OCR and color
      'image-to-text-converter', 'image-color-palette',
    ],
    related: ['tools', 'css-tools', 'learn-to-code'],
    about: `Image editing and conversion come up constantly in web development, design and content work — but most online tools upload your images to a remote server to process them. Every tool in this collection processes your images locally in your browser, using the Canvas API, FileReader and WebAssembly libraries. Your files never leave your device, there is no sign-up, and nothing is watermarked.

### Edit, Crop and Resize Images

The **Image Editor** is a full browser-based editor: resize to exact pixels or social-media presets, crop with an aspect-ratio lock, rotate and flip, add text overlays and watermarks, fill a background color, compress with quality control and convert between formats. The **Image Compressor** is built for batches — drop several PNG, JPEG, WebP or AVIF files at once, compress or convert them in parallel, and compare before and after with a live split slider before you download.

### Remove Backgrounds and Relight Photos

The **Image Background Remover** makes a transparent PNG or WebP locally: remove a white background, pick a color to remove, or use a magic-wand selection with tolerance and edge feather, with zoom and pan for precise work. **Relight Photo** adds draggable studio, neon, sunset and product lights to an existing photo, lets you adjust ambient brightness and shadows, and exports PNG, JPEG or WebP with a before/after preview.

### Convert Between Formats

**Image to SVG** traces PNG, JPEG and WebP images into scalable vector paths with adjustable color and detail settings. **SVG to PNG** rasterizes vectors at any scale or pixel size for app icons, email headers and retina displays. **Image to Base64** turns any image into a Data URI, an HTML img tag or a CSS background-image ready to embed without an extra file request.

### Text, Color and Social Images

The **Image to Text Converter** uses Tesseract.js — a WebAssembly build of the Tesseract OCR engine — to extract editable text from photos, screenshots and scans in 16 languages, with no cloud API key. The **Image Color Palette Extractor** pulls the dominant colors out of any image. The **OG Image Generator** creates 1200×630 Open Graph images, which noticeably improve click-through when a link is shared on Twitter, LinkedIn or Slack, and the **Favicon Generator** produces the complete set of favicon assets — eight PNG sizes, a multi-size favicon.ico, the Apple Touch Icon, Android Chrome icons and site.webmanifest — in one ZIP. **Code Screenshot** turns a snippet into a shareable image with themed window frames and gradient backgrounds.

### Why Use These Image Tools?

Because all processing uses the browser's Canvas API and WebAssembly, there is no upload time, no server queue and no file-size limit set by a remote service. That matters for client photos, proprietary product images, medical scans and personal documents that should never leave your machine. Open a tool, drop your file, adjust the settings and download — the whole workflow happens in one browser tab, and the tools keep working offline once the page has loaded.`,
    useCases: [
      { icon: '🗜️', title: 'Compress images for web performance', desc: 'Reduce JPEG, PNG, WebP and AVIF file sizes before uploading to a CMS or CDN. The split-slider comparison shows quality against file size side by side before you download.' },
      { icon: '✂️', title: 'Resize and crop for social media', desc: 'Use the Image Editor presets to resize and crop photos to exact social-media dimensions, add a text overlay or watermark, and export in the format you need.' },
      { icon: '🪄', title: 'Cut out a product photo', desc: 'Remove a white or solid background with the Image Background Remover, then relight the product with studio or neon lights for a clean, consistent catalog look.' },
      { icon: '🔵', title: 'Trace logos and icons to SVG', desc: 'Convert a PNG or JPEG logo into scalable SVG paths for design tools and CSS, or rasterize an SVG to PNG at the exact size an app store or email client wants.' },
      { icon: '📱', title: 'Generate every favicon size', desc: 'Upload one image and get the full favicon set in a ZIP — PNG sizes, a multi-size .ico, Apple Touch and Android Chrome icons, and site.webmanifest — with no Photoshop.' },
      { icon: '👁️', title: 'Extract text from screenshots', desc: 'Pull editable text out of scanned documents, screenshots and photos with OCR in 16 languages, then copy it straight into your notes or a spreadsheet.' },
    ],
    faqs: [
      {
        q: 'Are my images uploaded to any server?',
        a: 'No. All image tools use the browser\'s FileReader and Canvas APIs and local JavaScript and WebAssembly libraries. Your images are read from disk into browser memory, processed locally and downloaded back to your computer. No image data is transmitted to a server at any point, so the tools are safe for confidential or proprietary images.',
      },
      {
        q: 'What image formats does the Image Compressor support?',
        a: 'It accepts JPEG, PNG and WebP and can output PNG, JPEG, WebP or AVIF. Set a quality level from 1 to 100, optionally resize to custom pixel dimensions, and compress several files in parallel. A live split slider lets you compare before and after side by side at full zoom before you download.',
      },
      {
        q: 'How do I remove the background from an image?',
        a: 'Open the Image Background Remover, drop in your image and choose a mode: white or light background, a picked color, or a magic-wand selection with adjustable tolerance and edge feather. You can zoom and pan to refine the result, preview it on different backgrounds, and export a transparent PNG or WebP. It works best on simple, evenly colored backgrounds.',
      },
      {
        q: 'What does Relight Photo do?',
        a: 'Relight Photo lets you place draggable lights on a photo — studio, neon, sunset, product or dramatic presets — and adjust ambient brightness and shadows, with a before and after preview. The result is rendered locally and exported as PNG, JPEG or WebP, so your photo is never uploaded.',
      },
      {
        q: 'How does Image to SVG vectorisation work?',
        a: 'Image to SVG traces a raster image into scalable vector paths. Choose full color, greyscale or black and white, then adjust the number of colors, smoothing and detail threshold. The output is clean SVG markup you can use in design tools, CSS backgrounds or HTML.',
      },
      {
        q: 'What sizes does the Favicon Generator produce?',
        a: 'It produces 16, 32, 48, 64, 96, 128, 192 and 512 pixel PNG files, a multi-size favicon.ico, a 180×180 Apple Touch Icon, 192 and 512 pixel Android Chrome icons and a site.webmanifest file, all in one ZIP ready to upload to your web server root.',
      },
      {
        q: 'How accurate is the Image to Text (OCR) conversion?',
        a: 'The converter uses Tesseract.js, a WebAssembly port of the Tesseract OCR engine. Accuracy is highest for high-resolution images with clear fonts and good contrast. For best results increase contrast, remove background noise and use scans of about 300 DPI. Handwriting and decorative fonts are less accurate.',
      },
      {
        q: 'What is an OG image and why do I need one?',
        a: 'An Open Graph image is the thumbnail shown when your link is shared on Twitter, LinkedIn, Slack, Discord or Facebook. Without one, platforms show a generic placeholder. The OG Image Generator creates a correctly sized 1200×630 PNG that you reference in your page\'s og:image meta tag, which improves click-through when the link is shared.',
      },
    ],
    metadata: {
      title: 'Free Online Image Tools — Compress, Convert & Edit',
      description: '12 free image tools in your browser: editor, compressor, background remover, image to SVG, Base64, OCR, favicon and OG image generators. No upload, no sign-up.',
      keywords: ['free image tools online', 'online image editor', 'image compressor online', 'remove image background free', 'image to svg converter', 'image to base64', 'svg to png converter', 'favicon generator online', 'og image generator', 'image to text ocr', 'relight photo online', 'image converter online free'],
    },
  },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(c => [c.slug, c]));
