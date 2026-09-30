import RestApiBuilderTool from '@/components/RestApiBuilderTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'REST API Builder Playground — Mock, Test & Export Express | webdevpuneet.com',
  description: 'Build mock REST API routes visually, test them with a built-in HTTP client, and export working Express.js code. Free, no backend or install needed.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/rest-api-builder-playground/' },
  icons: { icon: '/icons/rest-api-builder-playground.svg', shortcut: '/icons/rest-api-builder-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/rest-api-builder-playground/',
    siteName: 'webdevpuneet.com',
    title: 'REST API Builder Playground — Create Mock API Routes, Test Requests & Export Express.js Code',
    description: 'Build mock REST API routes visually, test GET/POST/PUT/DELETE requests with a built-in HTTP client, and export working Express.js code. CRUD templates, auth simulation, no backend required.',
    images: [{ url: 'https://webdevpuneet.com/images/rest-api-builder-playground.png', width: 1200, height: 630, alt: 'REST API Builder Playground' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'REST API Builder Playground — Build, Test & Export Mock API Routes Visually',
    description: 'Create mock GET/POST/PUT/DELETE routes, test with a built-in HTTP client, export Express.js code. CRUD templates, auth simulation. Free, no backend required.',
    images: ['https://webdevpuneet.com/images/rest-api-builder-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need Node.js or a server to use the REST API Builder Playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The REST API Builder Playground runs entirely in your browser. You create and test mock API routes without any Node.js installation, server, or backend. When you click Send in the HTTP client, the tool matches your request against your defined routes in-browser and returns the mock response instantly. The tool also exports working Express.js code you can run locally when you are ready to move to a real server.',
      },
    },
    {
      '@type': 'Question',
      name: 'What can I build with the REST API Builder Playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can build any REST API structure: user management systems, blog APIs, e-commerce product APIs, authentication flows, and more. Each route has a method (GET, POST, PUT, PATCH, DELETE), path (including :param wildcards), status code, mock response body (JSON), response headers, optional auth requirement, and simulated response delay. Five CRUD templates — Users, Posts, Products, Blog API, and Auth API — give you a complete starting point instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I test my API routes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Switch to the HTTP Client tab. Select your HTTP method (GET, POST, PUT, PATCH, DELETE), type the path (e.g. /users/1), add an Authorization token if the route requires auth, and click Send. For POST, PUT, and PATCH requests, a request body textarea appears for your JSON payload. The response panel shows the matched status code with color coding (green for 2xx, orange for 4xx, red for 5xx), response timing, the matched route, response headers, and the full JSON body.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a route parameter like :id?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A route parameter is a variable segment in a URL path, prefixed with a colon. For example, /users/:id matches /users/1, /users/42, or /users/alice — any value works in that position. The REST API Builder uses the same :param syntax as Express.js. When testing, replace :id with an actual value like /users/1. Parameters are extracted automatically during route matching, following the same wildcard logic as real Express route handlers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I export the code to use in a real project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Export Code tab generates complete, working Express.js code for all your routes. The output includes require statements, express.json() middleware, an auth middleware function (if any routes require auth), and individual app.get(), app.post(), etc. route handlers with your mock response bodies. Copy the code or download it, then run it locally with Node.js: npm install express && node server.js. You also get a JSON Config export for backup and import.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are CRUD templates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CRUD templates are pre-built sets of routes covering the four standard database operations: Create, Read, Update, and Delete. The builder includes five templates: Users CRUD (5 routes for user management), Posts CRUD (5 routes for blog posts), Products CRUD (5 routes for e-commerce), Blog API (posts with slug, categories, and tags), and Auth API (login, register, logout, profile, token refresh). Loading a template replaces your current routes after confirmation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my API configuration saved between visits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Your routes are automatically saved to localStorage in your browser every time you make a change. When you return to the playground, your routes are restored exactly as you left them — including all route details, response bodies, headers, and settings. No account or login is required. Data stays in your browser and is never uploaded to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from the Express.js Playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The REST API Builder is a utility tool for building and prototyping API structures visually. You define routes through a form interface, test them with an HTTP client, and export Express.js code — no code writing required. The Express.js Playground is a lesson-based learning environment with 32 guided lessons where you write actual Express.js code to learn the framework. Use this tool when you want to prototype or mock an API; use the Express.js Playground when you want to learn how Express.js works.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'REST API Builder Playground',
  url: 'https://webdevpuneet.com/rest-api-builder-playground/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Visual REST API builder for creating mock GET/POST/PUT/DELETE routes, testing requests with a built-in HTTP client, and exporting working Express.js code. CRUD templates, auth simulation, response delay, localStorage persistence. No backend required.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'REST API Builder Playground', item: 'https://webdevpuneet.com/rest-api-builder-playground/' },
  ],
};

const seoData = {
  slug: 'rest-api-builder-playground',
  title: 'REST API Builder Playground — Build, Test & Export Mock API Routes Visually',

  about: {
    title: 'REST API Builder Playground — Design Routes Visually, Test Requests Instantly, Export Express.js Code',
    description: `REST APIs are the backbone of modern web development. Every frontend app — whether built with React, Vue, or plain JavaScript — needs an API to fetch data, submit forms, authenticate users, and manage resources. But building a backend API from scratch takes time, and using a real backend for frontend prototyping means waiting for it to be ready, dealing with CORS issues, and managing server state during development. The REST API Builder solves all of this.

This tool lets you create a complete collection of mock API routes using a visual interface — no code required. Define each route's HTTP method, URL path, response status code, JSON response body, headers, auth requirements, and simulated delay. Then test every route using the built-in HTTP client. When your API design is finalized, export working Express.js code with a single click.

**How routes work:** Each route is a combination of an HTTP method and a URL path. GET /users returns a list of users. POST /users creates one. GET /users/:id retrieves a specific user by their ID — the :id portion is a route parameter that matches any value, so /users/1, /users/42, and /users/alice all match. You can define as many routes as your API needs, with full control over what each one returns.

**The built-in HTTP client** lets you test your routes without leaving the tool. Select the method, type the path (replacing :id with a real value like 1), add an Authorization token if the route requires authentication, and click Send. The tool matches your request against all defined routes, applies the auth check if needed, simulates the configured delay, and returns the mock response — with a color-coded status badge, response timing, matched route indicator, response headers, and syntax-highlighted JSON body.

**Auth simulation** is built in. Mark any route as auth-required, and the HTTP client will return a 401 Unauthorized response if you try to test it without providing an Authorization token. This lets you design and test protected endpoints — login flows, profile endpoints, admin-only routes — exactly as they would behave in a real API.

**CRUD templates** give you a complete starting API in one click. Load Users CRUD for a five-route user management API, Posts CRUD for a blog-style API, Products CRUD for e-commerce, Blog API for a full content platform with categories and tags, or Auth API for a complete authentication system with login, register, logout, profile, and token refresh endpoints.

**Export to Express.js** generates production-ready server code. The output includes all your routes with proper middleware, a requireAuth function for protected routes, response delay handling, and an app.listen() call. Save the file, run npm install express && node server.js, and your mock API becomes a real running server — ready to swap in for production code.

All data is saved automatically to your browser's localStorage. Return to the tool anytime and your routes are exactly where you left them. No account, no sign-up, no data ever leaves your browser.`,
  },

  features: [
    'Visual route builder — define method, path, status code, response body, and headers through a clean form interface; graduate to real route code in the [Express playground](/express-playground)',
    'Five CRUD templates — Users, Posts, Products, Blog API, and Auth API with pre-built realistic routes; generate richer fake payloads with the [API mock generator](https://fwdtools.com/api-mock-generator)',
    'Built-in HTTP Client — test GET/POST/PUT/PATCH/DELETE requests against your mock routes with one click — or use the standalone [API request tester](https://fwdtools.com/api-request-generator-tester) against live APIs',
    'Route parameter matching — :id and :slug wildcards work exactly like Express.js, matching any value in that path position',
    'Auth simulation — mark routes as auth-required; HTTP client returns 401 when no token is provided',
    'Authorization token input — add a Bearer token to test protected routes without setting up a real auth system',
    'Color-coded status badges — 2xx green, 4xx orange, 5xx red for instant response readability',
    'Response timing display — see simulated response time including configured delays',
    'Simulated response delay — configure 0–2000ms delay per route to test loading states and async UI',
    'Format JSON button — automatically formats and indents your response body JSON with one click',
    'Export to Express.js — generates complete, runnable Express.js server code for all routes',
    'Export to JSON Config — save and download your full route configuration for backup or sharing',
    'localStorage persistence — your routes are saved automatically and restored on every visit',
    'No backend required — everything runs in your browser, no Node.js or server setup needed',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Start with a template or add your first route',
        text: 'Click "Load Template" to instantly load a complete CRUD API — choose from Users, Posts, Products, Blog API, or Auth API. Or click "+ Add Route" to start from scratch with a blank GET route. The sidebar shows all your routes with method badges, paths, and status codes at a glance.',
      },
      {
        title: 'Configure the route in the editor',
        text: 'Click any route in the sidebar to open it in the editor. Select the HTTP method (GET, POST, PUT, PATCH, DELETE) using the colored pill buttons. Type the path — use :id or :slug for route parameters that match any value. Set the status code using the number input or click a quick-select chip (200, 201, 400, 401, 404, 422, 500). Paste or type your mock JSON response in the Response Body textarea and click Format JSON to clean it up.',
      },
      {
        title: 'Set auth and delay options',
        text: 'Toggle "Auth Required" if this route should reject requests without an Authorization header. Drag the Delay slider to add a simulated response delay of up to 2000ms — useful for testing loading spinners and async UI states. Click Save Route to commit your changes.',
      },
      {
        title: 'Test routes with the HTTP Client',
        text: 'Switch to the HTTP Client tab. The method and path auto-fill from your selected route. Replace any :id parameters with real values like /users/1. Add an Authorization token if testing a protected route. Click Send — the response panel shows the status code, timing, matched route, response headers, and syntax-highlighted JSON body. A "no matching route" warning appears if your request path does not match any route.',
      },
      {
        title: 'Export your Express.js server code',
        text: 'Switch to the Export Code tab. Choose Express.js to see the complete, runnable server code with all your routes, auth middleware, and delays configured. Click Copy All Code and paste it into a server.js file. Run npm install express && node server.js to turn your mock API into a real running Express server. Or choose JSON Config to download your route configuration as a backup.',
      },
    ],
  },

  useCases: [
    {
      icon: '▶',
      title: 'Frontend developers prototyping without a backend',
      desc: 'When the backend is not ready or you are building a demo, the REST API Builder gives you a complete mock API to develop against. Define the endpoints your frontend needs, set realistic response shapes, and test the full data flow — all without spinning up a server or waiting for a backend team.',
    },
    {
      icon: '{}',
      title: 'Designing and documenting API structures',
      desc: 'Before writing backend code, use the builder to sketch out your API design. Define routes, decide on status codes, shape the response JSON, and test the URL structure. The exported Express.js code and JSON config serve as living documentation that the whole team can review and iterate on.',
    },
    {
      icon: '◉',
      title: 'Learning REST API design patterns',
      desc: 'The CRUD templates demonstrate the standard REST resource patterns — plural nouns as paths, HTTP verbs as actions, :id parameters for specific resources, 201 for creation, 204 for deletion. Load a template and explore how a complete REST API is structured before building one from scratch.',
    },
    {
      icon: '⊞',
      title: 'Testing frontend error handling and loading states',
      desc: 'Set a route to return 400, 404, or 500 to test how your frontend handles errors. Add a 1500ms delay to test loading spinners and skeleton screens. Mark a route as auth-required to test your 401 handling logic. The REST API Builder gives you full control over mock responses that are difficult to reproduce with a real backend.',
    },
    {
      icon: '∑',
      title: 'Generating Express.js server boilerplate',
      desc: 'Use the builder as an Express.js code generator. Design your API visually, then click Export to get complete, working server code with all routes, middleware, and auth handling. It is faster than writing the boilerplate by hand and produces code that is immediately runnable with Node.js.',
    },
    {
      icon: '⚡',
      title: 'API demos and presentations',
      desc: 'The builder loads with a complete Users CRUD API pre-configured, making it impressive on first view for demos and presentations. Show stakeholders what an API looks like, test requests live in the HTTP client, and export the code to prove it works. The tool requires no setup, so demos always work.',
    },
  ],

  faqs: [
    { q: 'Do I need Node.js or a server to use the REST API Builder Playground?', a: 'No. Everything runs in your browser. Create and test mock routes without any Node.js or server setup. The HTTP client simulates requests in-browser and matches them against your defined routes. Export the Express.js code when you want a real running server.' },
    { q: 'What can I build with the REST API Builder Playground?', a: 'Any REST API structure — user management, blog APIs, e-commerce products, authentication flows, and more. Use the five CRUD templates (Users, Posts, Products, Blog API, Auth API) as starting points, or build from scratch with full control over methods, paths, status codes, and response bodies.' },
    { q: 'How do I test my API routes?', a: 'Use the HTTP Client tab. Select the method, type the path (replacing :id with a real value), add an auth token if needed, and click Send. The response panel shows the status code, timing, matched route, headers, and JSON body. Color-coded: 2xx green, 4xx orange, 5xx red.' },
    { q: 'What is a route parameter like :id?', a: ':id is a wildcard segment that matches any value in that URL position. /users/:id matches /users/1, /users/42, or /users/alice. The same :param syntax as Express.js. Replace :id with a real value when testing in the HTTP client.' },
    { q: 'Can I export the code to use in a real project?', a: 'Yes. Export Code generates complete Express.js server code for all your routes, including auth middleware and delay handling. Copy it, paste into server.js, run npm install express && node server.js. You also get a JSON Config export for backup and import.' },
    { q: 'What are CRUD templates?', a: 'Pre-built route sets covering Create, Read, Update, and Delete operations. Five templates: Users CRUD (5 routes), Posts CRUD (5 routes), Products CRUD (5 routes), Blog API (posts, categories, tags), and Auth API (login, register, logout, profile, token refresh). Loading a template replaces your current routes after confirmation.' },
    { q: 'Is my API configuration saved between visits?', a: 'Yes. Routes are auto-saved to localStorage every time you make a change. Return anytime and find your routes exactly as you left them. No account required. Your data never leaves your browser.' },
    { q: 'How is this different from the Express.js Playground?', a: 'The REST API Builder Playground is a visual utility for prototyping and building API structures without writing code. The Express.js Playground is a lesson-based learning environment with 32 guided lessons for learning Express.js by writing code. Use this playground to prototype; use the Express.js Playground to learn.' },
  ],
};

export default function RestApiBuilderPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><RestApiBuilderTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
