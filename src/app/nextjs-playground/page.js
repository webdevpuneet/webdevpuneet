import NextjsPlaygroundTool from '@/components/NextjsPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/learn-to-code.png';

export const metadata = {
  title: 'Next.js Playground — 26 Interactive App Router Lessons Free | webdevpuneet.com',
  description: 'Learn Next.js free in your browser — 26 interactive App Router lessons with live preview: pages, layouts, server components, caching, and middleware. No install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/nextjs-playground/' },
  icons: { icon: '/icons/nextjs-playground.svg', shortcut: '/icons/nextjs-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/nextjs-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Next.js Playground — 26 Interactive App Router Lessons',
    description: 'A free, browser-based Next.js course: 26 lessons across 10 chapters, beginner to pro, with live preview, route handler testing, progress tracking, and ZIP export. No install required.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Next.js Playground Online — Interactive App Router Lessons' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Next.js Playground — 26 Interactive App Router Lessons',
    description: 'Learn Next.js App Router in the browser: pages, layouts, components, hooks, route handlers, styling. Live preview, progress, ZIP export. Free.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why should I learn and use Next.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Next.js is the most widely adopted React framework for production web apps. It gives you file-based routing (folders become routes with no router config), shared and nested layouts, Server and Client Components that ship less JavaScript, built-in API route handlers for full-stack code in one project, and rendering choices (SSR, SSG, ISR) you pick per page for speed and SEO. You also get automatic code splitting, image and font optimization, prefetching, middleware on the edge, and a fast developer experience with TypeScript support. Because it is built on React, your component skills carry straight over. This playground teaches those benefits hands-on across 26 lessons, from your first page to dynamic routes, caching, metadata, and deployment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I learn Next.js online without installing Node.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. This Next.js playground runs entirely in your browser. All 26 lessons transpile your JSX with Babel and render it through React inside a sandboxed iframe, so you can edit page.jsx, layout.jsx, globals.css, and a route handler and see a live result without installing Node.js, npm, or a dev server. It is built for learning and prototyping App Router patterns. When you want to build a real app, export the ZIP and run npm install plus npm run dev locally.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to know React before using the Next.js playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some React helps but is not required. The early chapters cover JSX, expressions, components, props, lists, and conditional rendering, and the Client Components chapter teaches useState, events, controlled inputs, and useEffect. If you want a deeper React foundation first, work through the React Playground for hooks and component patterns, then return here to learn how Next.js adds routing, layouts, and route handlers around them.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does the Next.js playground curriculum cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There are 26 lessons across 10 chapters, beginner to pro: App Router Basics (pages, JSX, the default export as a route), Layouts (shared and nested layouts), Components & Props (components, props, lists and keys, conditional rendering), Client Components & State (use client, useState, events, controlled inputs, useEffect), Route Handlers (GET, dynamic JSON, fetching in a component), Styling (global CSS, class names, inline styles), Data & Rendering Patterns (loading states, error handling, deriving UI from data), Navigation (Link, in-page section nav), Patterns & Project (reusable components and a mini dashboard), and a Going to Production chapter (dynamic routes, Server vs Client Components, loading & streaming, data fetching & caching, the Metadata/SEO API, and middleware & deploying).',
      },
    },
    {
      '@type': 'Question',
      name: 'Do the lessons run real code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every lesson executes for real in the browser. Edit any line of page.jsx and the live preview updates immediately, with the page mounted inside layout.jsx exactly as the App Router composes them. React hooks like useState and useEffect work, and route-handler lessons wire fetch("/api/hello") to your GET function so a page can call its own API. A console panel captures log, warning, and error output, and a runtime error strip surfaces problems near the preview.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this a full Next.js runtime in the browser?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The playground is a learning and prototyping environment, not the full framework. It does not run the Next.js compiler, the Server Components runtime, middleware, the image optimizer, or the production build pipeline. It focuses on the App Router files developers work with most — page, layout, CSS, and a route handler — so you can learn the model fast. Export the ZIP when you need real Next.js behavior.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I test a Next.js route handler online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Route Handlers chapter includes app/api/hello/route.js and a panel that runs GET /api/hello inside the preview sandbox. You can edit the returned JSON, test Response.json output, and see how a page fetches that route with useEffect — a common App Router page-to-route workflow you can practice without a backend server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download the playground as a Next.js project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Export ZIP creates a small Next.js project containing package.json, next.config.mjs, and the current app files. After downloading, unzip it, run npm install, then run npm run dev. The export turns a browser lesson or prototype into a normal local development workflow. Your progress and current files are also autosaved in your browser via localStorage and are never uploaded to a server.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between the React playground and the Next.js playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The React Playground focuses on components, JSX, and hooks in a single-file editor. The Next.js Playground teaches how App Router files relate to each other — page.jsx, layout.jsx, globals.css, and route.js — plus routing, layouts, route handlers, and data patterns. Use the React Playground to master hooks and component patterns, then use this Next.js Playground to learn project structure and route-level behavior.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Next.js Playground',
  url: 'https://webdevpuneet.com/nextjs-playground/',
  image: OG_IMAGE,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free interactive Next.js App Router course in the browser: 26 lessons across 10 chapters, beginner to pro, with live preview, route handler testing, progress tracking, and ZIP export.',
  featureList: [
    '26 interactive Next.js App Router lessons across 10 structured chapters, beginner to pro',
    'Going to Production chapter: dynamic routes, Server vs Client Components, loading & streaming, data fetching & caching, the Metadata/SEO API, and middleware & deploying',
    'Real in-browser execution via React and Babel — edit code and see a live preview',
    'Pages, layouts, components, props, lists, and conditional rendering lessons',
    'Client Components chapter: use client, useState, events, forms, and useEffect',
    'Route Handlers chapter with a working GET /api/hello tester',
    'Styling chapter for global CSS, class names, and inline styles',
    'Data and rendering patterns: loading states, error handling, and data-driven UI',
    'Collapsible concept panel, Quick Check questions, and progress tracking',
    'Console capture, runtime error strip, and responsive preview sizes',
    'Downloadable Next.js project ZIP with package.json and next.config.mjs',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to learn Next.js App Router online',
  description: 'Use the Next.js Playground to work through 26 interactive lessons, edit live code, test a route handler, and export a project ZIP.',
  step: [
    { '@type': 'HowToStep', name: 'Pick a chapter and lesson', text: 'Start at App Router Basics and follow the chapter-grouped lesson list.' },
    { '@type': 'HowToStep', name: 'Read the concept', text: 'Open the concept panel to understand the idea before editing.' },
    { '@type': 'HowToStep', name: 'Edit and watch the live preview', text: 'Change page.jsx, layout.jsx, globals.css, or route.js and see the preview update.' },
    { '@type': 'HowToStep', name: 'Test the route handler', text: 'Run GET /api/hello from the Route Handler panel.' },
    { '@type': 'HowToStep', name: 'Take the Quick Check and mark done', text: 'Answer the lesson question and track your progress.' },
    { '@type': 'HowToStep', name: 'Export the project', text: 'Download the Next.js project ZIP and continue locally.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'Next.js Playground', item: 'https://webdevpuneet.com/nextjs-playground/' },
  ],
};

const seoData = {
  slug: 'nextjs-playground',
  title: 'Next.js Playground — Learn the App Router with 26 Interactive Lessons',
  subtitle: 'A free, browser-based Next.js course, beginner to pro. Work through 26 lessons across 10 chapters — pages, layouts, components, hooks, route handlers, styling, dynamic routes, caching, metadata, and middleware — with live preview, progress tracking, and ZIP export. No install, no signup.',
  about: {
    title: 'Learn Next.js by Doing — Real App Router Code, Live in Your Browser',
    description: `Spinning up a Next.js project just to try one idea is slow: install packages, start a dev server, create folders, wire up global CSS, add an API route. This **Next.js playground** removes that friction and turns the wait into a structured course. It is now a complete, interactive curriculum — **26 lessons across 10 chapters, beginner to pro** — that runs real code in your browser, with nothing to install.

Every lesson executes for real. The playground transpiles your JSX with Babel and renders it through React 18 inside a sandboxed iframe, mounting your \`app/page.jsx\` inside \`app/layout.jsx\` exactly the way the App Router composes them. Edit any line and the live preview updates instantly. React hooks like \`useState\` and \`useEffect\` work, and route-handler lessons wire \`fetch('/api/hello')\` to your \`GET\` function so a page can call its own API — a real page-to-route workflow without a backend. A console panel captures \`log\`, \`warn\`, and \`error\` output, and a runtime error strip surfaces problems right next to the preview.

The 10 chapters move from first principles to production. **App Router Basics** covers how a \`page.jsx\` file becomes a route and how the default export renders the UI. **Layouts** shows shared and nested layouts via the \`children\` prop. **Components & Props** covers components, props, lists and keys, and conditional rendering. **Client Components & State** teaches \`'use client'\`, \`useState\`, events, controlled inputs, and \`useEffect\`. **Route Handlers** covers \`GET\`, dynamic JSON, and fetching in a component. **Styling** covers global CSS, class names, and inline styles. **Data & Rendering Patterns** covers loading states, error handling, and deriving UI from data. **Navigation** covers \`Link\` and in-page section nav. A **Patterns & Project** capstone ties it together with reusable components and a mini dashboard. Finally, **Going to Production** reaches pro level: dynamic routes (\`[slug]\` params), Server vs Client Components, loading & streaming, data fetching & caching (\`no-store\`, \`revalidate\`), the Metadata/SEO API, and middleware & deploying. Each lesson has a collapsible concept panel, a Quick Check question, and Mark Done progress tracking.

### Why Use Next.js?

Next.js is the most widely adopted React framework for production apps, and these lessons put its biggest benefits into practice:

**File-based routing.** Folders inside \`app/\` become routes automatically — no manual router configuration. Adding a page is as simple as adding a file.

**Layouts and nested layouts.** Shared UI like navbars and footers live in \`layout.jsx\` and persist across navigation without re-rendering, so pages stay focused on their own content.

**Server and Client Components.** Render on the server by default to ship less JavaScript and improve speed and SEO, and opt into client interactivity only where you need it with \`'use client'\`.

**Built-in route handlers.** API endpoints live right beside your pages in \`route.js\` files, so you can build full-stack features in a single codebase instead of running a separate backend.

**Rendering choices for speed and SEO.** Next.js supports server-side rendering, static generation, and incremental static regeneration, chosen per page, so content is fast and search-engine friendly.

**Built-in optimizations.** Automatic code splitting, image and font optimization, route prefetching, and smart caching come out of the box — performance wins you would otherwise hand-build.

**Built on React with great DX.** Your component and hook skills carry straight over, with first-class TypeScript support, fast refresh, and conventions that keep large projects organized. It is production-proven at scale and deploys easily to Vercel or any Node host.

This playground is a learning and prototyping environment, not the full framework. It does not run the Next.js compiler, the Server Components runtime, middleware, the image optimizer, or the production build pipeline. When a lesson sparks a real project, click **Export ZIP** for a \`package.json\` and \`next.config.mjs\` scaffold and continue with \`npm install\` and \`npm run dev\`.

New to the layers underneath Next.js? Pair this course with the [React Playground](/react-playground/) for hooks and component patterns, the [JavaScript Playground](/js-playground/) for browser fundamentals, the [CSS Playground](/css-playground/) for styling, and the [Tailwind Playground](/tailwind-playground/) for utility-first classes before configuring them in a real Next.js project.`,
  },
  features: [
    '26 interactive Next.js lessons grouped into 10 chapters, beginner to pro — from basics to dynamic routes, caching, metadata, and deployment',
    'Real in-browser execution — edit page.jsx and watch the live preview update instantly',
    'Page rendered through layout.jsx in a sandboxed iframe, matching App Router composition',
    'Client Components chapter covering use client, useState, events, controlled inputs, and useEffect',
    'Route Handlers chapter with a working GET /api/hello tester and page-to-route fetch demos',
    'Styling chapter for `app/globals.css`, class names, and inline styles against the live preview',
    'Data and rendering patterns: loading states, error handling, and deriving UI from fetched data',
    'Collapsible concept panel, Quick Check questions, progress bar, and Mark Done tracking',
    'Console capture, runtime error strip, and mobile, tablet, and full-width preview sizes',
    'Export ZIP creates a real Next.js project with `package.json` and `next.config.mjs`',
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Pick a chapter and start the first lesson', text: 'Open the chapter-grouped lesson list and begin at App Router Basics. Each lesson loads working starter code into the editor so you can learn by editing instead of staring at a blank file. This is a natural next step after components in the [React Playground](/react-playground/).' },
      { title: 'Read the concept, then edit the code', text: 'Open the concept panel for a short explanation of the idea, then change `app/page.jsx` and watch the live preview update. The page renders through `app/layout.jsx`, so you can see exactly how the App Router composes a route.' },
      { title: 'Style the result with globals.css', text: 'In the Styling chapter, switch to `app/globals.css` to test typography, layout, buttons, and cards. The preview applies CSS immediately — a smooth move from basic CSS practice in the [CSS Playground](/css-playground/) into a Next.js file structure.' },
      { title: 'Test a route handler', text: 'In the Route Handlers chapter, edit the JSON returned from `GET()` in `app/api/hello/route.js`, then click GET /api/hello. A lesson page also fetches `/api/hello` with useEffect so you can practice the page-to-route workflow.' },
      { title: 'Take the Quick Check and mark the lesson done', text: 'Answer the multiple-choice Quick Check to confirm the concept, then use Mark Done to advance. The progress bar tracks how far through the 26 lessons you are, saved in your browser.' },
      { title: 'Export when a prototype is worth keeping', text: 'Use Export ZIP to get a small Next.js project with `package.json` and `next.config.mjs`, then run `npm install` and `npm run dev` to continue locally. Move route handler ideas into real API testing with the [REST API Builder](/rest-api-builder-playground/).' },
    ],
  },
  useCases: [
    { icon: 'LEARN', title: 'Learn Next.js from scratch, no setup', desc: 'Follow 26 lessons across 10 chapters, beginner to pro, that run real code in the browser. Perfect for beginners who want to understand the App Router — through dynamic routes, caching, and deployment — without installing Node.js, configuring a project, or starting a dev server.' },
    { icon: 'CODE', title: 'Move from React to Next.js', desc: 'If hooks and JSX already make sense, this course shows the project conventions around them — routes, layouts, route handlers, and data patterns. Use it after the [React Playground](/react-playground/) to bridge components into full Next.js screens.' },
    { icon: 'API', title: 'Practice route handlers and data fetching', desc: 'Edit the GET route in `app/api/hello/route.js`, run it from the API panel, and fetch it from a component with useEffect. A focused way to learn how App Router pages talk to their own API before moving to the [REST API Builder](/rest-api-builder-playground/).' },
    { icon: 'NAV', title: 'Understand App Router file structure', desc: 'Separate tabs for page, layout, CSS, and route make the relationships easy to see. Great for teaching how `page.jsx`, `layout.jsx`, `globals.css`, and `route.js` work together while the preview updates on the same screen.' },
    { icon: 'PRO', title: 'See the real benefits of Next.js in action', desc: 'Lessons demonstrate file-based routing, shared layouts, client interactivity, route handlers, and styling — the production features that make Next.js the leading React framework — so the "why" is obvious, not abstract.' },
    { icon: 'EXPORT', title: 'Export a Next.js project from a lesson', desc: 'When an experiment is worth keeping, Export ZIP turns it into a clean local Next.js project with `package.json` and `next.config.mjs`, ready for `npm install` and `npm run dev` instead of loose copied snippets.' },
  ],
  faqs: faqSchema.mainEntity.map((item) => ({
    q: item.name,
    a: item.acceptedAnswer.text,
  })),
};

export default function NextjsPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <div className={styles.toolSection}>
        <NextjsPlaygroundTool />
      </div>
      <AdSlot />
      <IndexOnly><SeoSection {...seoData} noShare /></IndexOnly>
    </div>
  );
}
