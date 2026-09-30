import ExpressPlaygroundTool from '@/components/ExpressPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Express.js Playground — Learn Express.js Visually, 38 Lessons Free | webdevpuneet.com',
  description: 'Learn Express.js online with 38 interactive lessons — routing, middleware, REST APIs, auth, validation, and security. Live API editor, free, no Node install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/express-playground/' },
  icons: { icon: '/icons/express-playground.svg', shortcut: '/icons/express-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/express-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Interactive Express.js Playground — Learn Backend APIs Visually in Your Browser',
    description: 'Write Express.js routes and send test HTTP requests instantly. 38 lessons across 11 chapters, beginner to pro — routing, middleware, REST APIs, error handling, auth, validation, security, rate limiting, and deployment. No Node.js install.',
    images: [{ url: 'https://webdevpuneet.com/images/express-playground.png', width: 1200, height: 630, alt: 'Interactive Express.js Playground' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Interactive Express.js Playground — Learn Backend APIs in Your Browser',
    description: 'Write Express routes, send test requests, see responses. 38 lessons, beginner to pro — routing, middleware, REST, error handling, auth, validation, security, deployment. No install needed.',
    images: ['https://webdevpuneet.com/images/express-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need Node.js installed to use the Express.js Playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The Express.js Playground runs entirely in your browser. It simulates the Express.js routing and middleware engine in JavaScript — there is no Node.js server, no npm install, no terminal. Open the page and start writing routes immediately. The engine handles route matching, middleware chains, request/response objects, and status codes just like the real Express.js framework.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Express.js simulation work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The playground includes a complete in-browser Express.js simulation engine. When you write app.get() or app.use(), routes and middleware are registered in memory. When you click Send, the engine builds a req and res object, runs all matching middleware in order, executes your route handler, and returns the captured response — status code, body, headers, and timing. The simulation supports route parameters (:id), query strings, request bodies, chained middleware, error handlers, and the Express Router.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Express.js topics are covered in the 38 lessons?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '38 lessons across 11 chapters, beginner to pro: Getting Started (hello world, response types, multiple routes), HTTP Methods (GET, POST, PUT, DELETE, full CRUD), Route Parameters (:id params, query strings, combined), Middleware (custom middleware, chaining, body parsing), Request & Response (req object, headers, status codes), REST API Design (naming, CRUD, filtering, pagination), Error Handling (404 catch-all, error middleware, try/catch), Express Router (mounting, multiple routers), Authentication (token check, protected routes, roles), Mini-Projects (complete Todo and Users APIs), and a pro Validation, Security & Production chapter (input validation with 400 responses, API-key auth, helmet-style security headers, rate limiting with 429, centralized error handling, and testing with Jest/Supertest plus a deployment checklist).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is middleware in Express.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Middleware is a function that runs between a request arriving and a response being sent. It has access to req, res, and a next function. Calling next() passes control to the next middleware or route handler. Middleware can parse request bodies (jsonParser), add CORS headers (cors), check authentication tokens, log requests, measure timing, or validate input. Express processes middleware in the order you define it with app.use().',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I test my Express routes in the playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the HTTP Client panel on the right side of the editor. Select the HTTP method (GET, POST, PUT, PATCH, DELETE), enter a path like /users or /users/1, add a JSON body for POST and PUT requests, and click Send. The response panel shows the status code (colour-coded green for 2xx, orange for 4xx, red for 5xx), the response body as formatted JSON, the timing, and response headers. Each lesson auto-fills the method and path from the TEST comment at the top of the code.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between GET and POST in Express.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GET requests retrieve data and have no body — they are safe to repeat without side effects. POST requests create new resources and send data in the request body. In Express, app.get() handles GET and app.post() handles POST on the same path independently. GET /users returns a list of users. POST /users creates a new user using the data in req.body. The distinction is foundational to RESTful API design.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Express Router in the playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The playground supports app.Router() which creates a mini Express application for grouping related routes. Define routes on the router with router.get(), router.post(), etc., then mount it on a path with app.use("/api", router). Routes in the router are automatically prefixed. Three lessons in the Express Router chapter cover router basics, mounting with path prefixes, and using multiple routers for different resource groups.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my progress saved between sessions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Completed lessons and your current position are saved automatically to localStorage. When you return, the playground resumes exactly where you left off. No account or login is required. Progress is stored per browser and device.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Express.js Playground',
  url: 'https://webdevpuneet.com/express-playground/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Interactive Express.js playground with live HTTP client and route simulation. 38 structured lessons across 11 chapters, beginner to pro — routing, middleware, REST API design, error handling, authentication, Express Router, mini-projects, plus input validation, security headers, rate limiting, centralized error handling, testing, and deployment. No Node.js install, runs entirely in the browser.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Express.js Playground', item: 'https://webdevpuneet.com/express-playground/' },
  ],
};

const seoData = {
  slug: 'express-playground',
  title: 'Express.js Playground — Learn Backend APIs, Routing & Middleware Visually',

  about: {
    title: 'Learn Express.js Without Installing Node.js — Write Routes, Send Requests, See Responses Instantly',
    description: `Express.js is the most widely-used Node.js web framework. It powers everything from startup APIs to enterprise microservices — yet learning it traditionally requires installing Node.js, setting up a project, and wiring together a server before writing a single route. This playground removes every setup barrier so you can focus entirely on understanding how Express works.

Open any lesson and the route code is already in the editor. The playground runs a complete in-browser simulation of the Express.js routing and middleware engine. Write app.get(), app.post(), app.use(), and app.Router() — the engine registers your routes, processes middleware chains, and handles the full request/response lifecycle exactly as Express does in a real Node.js server.

**How the HTTP Client works:** The right panel is a built-in HTTP client. Select the method (GET, POST, PUT, PATCH, DELETE), enter a path like /users or /users/42, add a JSON body for mutations, and click Send. The engine matches your request to a registered route, runs all middleware in sequence, executes the route handler, and returns the response — status code, body, and headers — in under 10ms. Every lesson auto-fills the method and path from a TEST comment in the code so the first thing you see when opening a lesson is a working example.

**The 38-lesson curriculum** starts from zero and builds all the way to production, beginner to pro. **Getting Started** introduces createExpress(), the app object, and basic response methods (res.json, res.send, res.sendStatus). **HTTP Methods** teaches GET, POST, PUT, DELETE, and how they map to CRUD operations. **Route Parameters** covers :id syntax, query strings (?key=value), and combining both for expressive URLs like /users/:id/posts?published=true. The final **Validation, Security & Production** chapter is where it reaches professional level: validating request bodies and returning 400s, protecting routes with an API key (401), setting helmet-style security headers, rate limiting with 429 responses, centralized error-handling middleware, and how to test with Jest + Supertest and ship to production with health checks, env config, and a process manager.

Express is worth learning because it is the most popular Node.js web framework and the "E" in the MERN/MEAN stack — the fastest way to turn JavaScript skills into real backend APIs. Its tiny, unopinionated core (routing + middleware) is the foundation that frameworks like NestJS build on, so the patterns you learn here transfer directly to professional Node.js backends.

**Middleware** is one of the most important Express concepts and gets four dedicated lessons. You learn what middleware is, how next() passes control forward, how to write factory functions that return configurable middleware, how to chain multiple middlewares on a single route, and how body-parsing middleware (jsonParser) enables req.body for POST requests.

**Request and Response** teaches every important property and method: req.method, req.path, req.query, req.params, req.body, req.headers, req.ip on the request side; res.status(), res.json(), res.send(), res.set(), res.redirect(), res.end() on the response side.

**REST API Design** covers the naming conventions that make APIs predictable: plural nouns as resource names, HTTP verbs as actions, nested resources for relationships, versioning with /api/v1, consistent response envelopes with meta and data, filtering and pagination via query parameters.

**Error Handling** teaches the Express error handler pattern — 4-argument middleware (err, req, res, next) — along with catch-all 404 routes and try/catch in route handlers. **Express Router** shows how to group related routes into modular routers and mount them on path prefixes for clean, scalable code organisation.

**Authentication** covers the Bearer token pattern, custom auth middleware, separating public and protected routes, and role-based access control with 401 vs 403 status codes.

The two **Mini-Projects** — a complete Todo REST API and a Users API with filtering, pagination, and authentication — put everything together in working applications you can test end-to-end with the HTTP client.`,
  },

  features: [
    'Complete in-browser Express.js simulation — route matching, middleware chains, req/res objects, no server needed — the same in-browser approach as the [Node.js playground](/nodejs-playground)',
    '38 structured lessons across 11 chapters, beginner to pro — from Hello World to validation, security headers, rate limiting, centralized errors, testing, and deployment; design mock endpoints first in the [REST API builder](/rest-api-builder-playground)',
    'Built-in HTTP Client panel — select method, enter path, add JSON body, click Send, see response — like a mini [API request tester](https://fwdtools.com/api-request-generator-tester) built into every lesson',
    'Live response panel with colour-coded status codes (2xx green, 4xx orange, 5xx red), body, timing, and headers',
    'Auto-fill HTTP client from lesson TEST comments — each lesson pre-fills the correct method and path',
    'Route parameter support — :id, :slug, nested routes like /users/:id/posts with req.params extraction',
    'Query string parsing — ?key=val becomes req.query, supporting filtering and pagination patterns',
    'Full middleware support — global app.use(), path-prefixed middleware, per-route middleware chains, next()',
    'Built-in middleware factories — jsonParser(), cors(), logger(), urlencoded(), authMiddleware()',
    'Express Router support — app.Router() creates mountable sub-applications with their own route tables',
    'Error handling middleware — 4-argument (err, req, res, next) pattern with next(err) forwarding',
    'SAMPLE_DB pre-loaded with users, posts, and products for realistic API lessons',
    'Syntax highlighting — keywords blue, Express methods teal, req/res cyan, app/router yellow-green, strings green',
    'Quick Check challenge on every lesson — collapsible multiple-choice with correct/wrong feedback',
    'Progress tracking — completed lessons and current position saved in localStorage between sessions',
    'Drag-to-resize split handle — adjust editor/client ratio from 20% to 80%',
    'Keyboard shortcut — Ctrl+Enter to run, Enter in path field to send, Tab for indentation in editor',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Choose a lesson from the sidebar',
        text: 'The left sidebar lists all 38 lessons organised into 11 chapters. Start at "Hello World" if you are new to Express.js, or jump to a pro chapter — Validation, Security & Production — that matches your level. Use the search box to find a specific topic like "router", "rate limit", or "validation" instantly.',
      },
      {
        title: 'Read the concept explanation',
        text: 'A collapsible panel above the editor explains the Express.js concept for that lesson. It describes what the API does, why you use it, and how it connects to real backend development patterns. Bold text highlights key terms and inline code marks Express methods and properties.',
      },
      {
        title: 'Edit the route code',
        text: 'The lesson\'s starter code is pre-loaded in the editor. Modify the routes, add middleware, change response values, or add new endpoints. Use Tab for indentation and Ctrl+Enter to run. The editor syntax-highlights Express methods, req/res variables, string literals, and JavaScript keywords.',
      },
      {
        title: 'Send a test request from the HTTP Client',
        text: 'The right panel shows the HTTP Client. The method and path are pre-filled from the lesson\'s TEST comment. Change the method to POST, PUT, or DELETE to test different operations. For POST and PUT, add a JSON body in the body textarea. Press Enter in the path field or click Send to execute the request.',
      },
      {
        title: 'Inspect the response and iterate',
        text: 'The response panel shows the status code (colour-coded), the formatted JSON body, timing in milliseconds, and response headers. If you see a 404, check your route path. If you see a 500, check the error bar below the editor. Click Reset to restore the lesson\'s original code and experiment freely.',
      },
    ],
  },

  useCases: [
    {
      icon: '▶',
      title: 'Frontend developers learning backend development',
      desc: 'Many React and Vue developers want to add a simple API to their projects but find Node.js and Express setup intimidating. This playground teaches Express incrementally — write a route, test it, understand it — without any server setup. The concepts you learn here transfer directly to a real Express project.',
    },
    {
      icon: '{}',
      title: 'Developers preparing for backend job interviews',
      desc: 'Backend interviews often include questions about REST API design, middleware patterns, HTTP status codes, authentication, validation, and rate limiting. The 38 lessons cover these exact topics with working code examples you can study and modify. The Quick Check challenges test the conceptual understanding interviewers probe.',
    },
    {
      icon: '◉',
      title: 'Students learning Node.js and web APIs',
      desc: 'University and bootcamp courses on web development often introduce Express.js as the first backend framework. This playground provides a zero-setup environment where students can follow along during lectures, experiment with examples, and test their understanding — all before installing anything on their machines.',
    },
    {
      icon: '⊞',
      title: 'Developers prototyping API structures',
      desc: 'When designing a new API, sketching out the route structure in the playground before writing production code helps validate the URL design, HTTP method choices, and response shapes. Test the API surface with the HTTP client to catch issues before building the real implementation.',
    },
    {
      icon: '∑',
      title: 'Teams onboarding engineers new to Express',
      desc: 'When a new team member joins who has not used Express before, the playground provides a structured self-guided curriculum. Cover middleware in the morning, REST API design in the afternoon. Progress is tracked in localStorage so team leads can suggest which chapters to focus on.',
    },
    {
      icon: '⚡',
      title: 'Quick reference for Express patterns',
      desc: 'Not sure how error middleware differs from normal middleware? Jump to the error handling chapter. Forgot the Express Router mounting syntax? The router lessons have working examples. The playground doubles as an interactive reference — faster than reading documentation and more memorable than a Stack Overflow answer.',
    },
  ],

  faqs: [
    { q: 'Do I need Node.js installed to use the Express.js Playground?', a: 'No. The playground runs entirely in your browser using a JavaScript simulation of Express.js. There is nothing to install — no Node.js, no npm, no terminal. Open the page and start writing routes immediately.' },
    { q: 'How does the Express.js simulation work?', a: 'An in-browser engine registers your routes and middleware, builds req/res objects for each test request, runs the middleware chain, and captures the response. It supports route parameters, query strings, body parsing, error handlers, and Express Router — all the core patterns from real Express.js.' },
    { q: 'What Express.js topics are covered?', a: '32 lessons across 10 chapters: Getting Started, HTTP Methods (GET/POST/PUT/DELETE), Route Parameters, Middleware, Request & Response, REST API Design (filtering, pagination), Error Handling, Express Router, Authentication (token auth, RBAC), and two Mini-Projects.' },
    { q: 'What is middleware in Express.js?', a: 'Middleware is a function with (req, res, next) that runs between a request and a response. It can modify req/res, send a response, or call next() to continue. app.use() registers global middleware. Built-in factories like jsonParser() and cors() are supported.' },
    { q: 'How do I test my routes in the playground?', a: 'Use the HTTP Client panel on the right. Select the method, enter a path (e.g. /users/1), add a JSON body for POST/PUT, and click Send. The response panel shows the status code, body, timing, and headers. Each lesson auto-fills the correct test method and path.' },
    { q: 'What is the difference between GET and POST?', a: 'GET retrieves data — no body, safe to repeat. POST creates a resource — sends data in req.body. In Express, app.get() and app.post() handle each separately on the same path. GET /users lists users; POST /users creates one.' },
    { q: 'Can I use Express Router in the playground?', a: 'Yes. app.Router() creates a mini Express app you can mount on a path prefix with app.use("/api", router). Routes defined on the router are automatically prefixed. Three lessons cover router basics, mounting, and using multiple routers for different resource groups.' },
    { q: 'Is my progress saved between sessions?', a: 'Yes. Completed lessons and your position are saved to localStorage automatically. When you return, the playground resumes exactly where you left off. No account required.' },
  ],
};

export default function ExpressPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ExpressPlaygroundTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
