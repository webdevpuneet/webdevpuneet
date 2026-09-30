// Next.js Playground curriculum.
// Each lesson supplies the files it wants to teach with; anything it omits
// falls back to BASE_FILES so the preview always has a layout, CSS, and route.
// The page.jsx in every lesson renders for real in the browser iframe engine
// (React 18 UMD + Babel), so editing the code shows a live result.

export const BASE_LAYOUT = `export default function RootLayout({ children }) {
  return <div className="app-frame">{children}</div>;
}`;

export const BASE_CSS = `:root {
  color-scheme: light;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  background: #f5f7fb;
  color: #172033;
}

body { margin: 0; min-height: 100vh; }
a { color: #2563eb; }
button {
  border: 0;
  border-radius: 8px;
  background: #111827;
  color: white;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  padding: 9px 14px;
}

.app-frame { min-height: 100vh; padding: 28px; max-width: 880px; margin: 0 auto; }
h1 { font-size: 30px; line-height: 1.15; margin: 0 0 12px; }
.card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, .06);
  padding: 18px;
  margin: 10px 0;
}`;

export const BASE_ROUTE = `export async function GET() {
  return Response.json({
    message: 'Hello from a Next.js route handler',
    framework: 'Next.js',
    router: 'App Router'
  });
}`;

export const BASE_FILES = {
  'app/page.jsx': '',
  'app/layout.jsx': BASE_LAYOUT,
  'app/globals.css': BASE_CSS,
  'app/api/hello/route.js': BASE_ROUTE,
};

// L(id, chapter, title, concept, files, challenge?)
function L(id, chapter, title, concept, files, challenge) {
  return { id, chapter, title, concept, files, challenge };
}

export const LESSONS = [
  /* ── App Router Basics ── */
  L('first-page', 'App Router Basics', 'Your First Page',
    'In the App Router, a `page.jsx` file inside the `app/` folder becomes a route. Whatever its **default export** returns is the UI for that route. This file is `app/page.jsx`, so it renders at `/`.',
    { 'app/page.jsx': `export default function Page() {
  return (
    <main>
      <h1>Hello, Next.js</h1>
      <p>This page lives in app/page.jsx and renders at the / route.</p>
    </main>
  );
}` },
    { question: 'What turns a file into a route in the App Router?', options: ['Naming it page.jsx inside the app folder', 'Adding a <route> tag', 'Registering it in next.config.js', 'Exporting a variable named path'], correct: 0 }),

  L('jsx-expressions', 'App Router Basics', 'JSX & Expressions',
    'JSX looks like HTML but lives in JavaScript. Curly braces `{}` embed any JS expression — variables, math, function calls. Note `className` instead of `class`.',
    { 'app/page.jsx': `export default function Page() {
  const name = 'developer';
  const year = new Date().getFullYear();
  return (
    <main className="card">
      <h1>Welcome, {name}</h1>
      <p>It is {year}. 2 + 2 = {2 + 2}.</p>
    </main>
  );
}` },
    { question: 'How do you embed a JavaScript value inside JSX?', options: ['With curly braces {value}', 'With double quotes "value"', 'With ${value}', 'With <%= value %>'], correct: 0 }),

  L('default-export', 'App Router Basics', 'The Default Export Is Your Route',
    'A route renders exactly one **default-exported** component. You can declare helper components in the same file, but only the default export is mounted as the page.',
    { 'app/page.jsx': `function Badge() {
  return <span className="card">App Router</span>;
}

export default function Page() {
  return (
    <main>
      <h1>Routing model</h1>
      <Badge />
    </main>
  );
}` }),

  /* ── Layouts ── */
  L('shared-layout', 'Layouts', 'Shared Layout',
    'A `layout.jsx` wraps every page in its folder. It receives a `children` prop — the page UI — and renders shared chrome like a header or nav around it. Edit the layout below and watch it wrap the page.',
    { 'app/layout.jsx': `export default function RootLayout({ children }) {
  return (
    <div className="app-frame">
      <header className="card"><strong>Acme</strong> · shared header</header>
      {children}
      <footer className="card">© Acme — shared footer</footer>
    </div>
  );
}`,
      'app/page.jsx': `export default function Page() {
  return <main><h1>Page content</h1><p>The header and footer come from layout.jsx.</p></main>;
}` },
    { question: 'What prop does a layout use to render the page inside it?', options: ['children', 'content', 'slot', 'page'], correct: 0 }),

  L('layout-composition', 'Layouts', 'Layout + Page Composition',
    'Layouts nest. A root layout can hold global structure while pages stay focused on their own content. The page never re-declares the shell — it just returns its piece.',
    { 'app/layout.jsx': `export default function RootLayout({ children }) {
  return (
    <div className="app-frame">
      <nav className="card">Home · Docs · Pricing</nav>
      <section>{children}</section>
    </div>
  );
}`,
      'app/page.jsx': `export default function Page() {
  return <main><h1>Docs</h1><p>Only the page changes between routes — the nav stays put.</p></main>;
}` }),

  /* ── Components & Props ── */
  L('components', 'Components & Props', 'Create a Component',
    'Components are functions that return JSX. Break UI into small reusable pieces and compose them. Component names must start with a **capital letter**.',
    { 'app/page.jsx': `function Hero() {
  return <h1>Build in components</h1>;
}

function Feature() {
  return <p className="card">Reusable, composable UI.</p>;
}

export default function Page() {
  return <main><Hero /><Feature /></main>;
}` }),

  L('props', 'Components & Props', 'Props',
    'Props pass data from a parent to a child component. They arrive as a single object argument; destructure the ones you need.',
    { 'app/page.jsx': `function Stat({ label, value }) {
  return <div className="card"><strong>{value}</strong> — {label}</div>;
}

export default function Page() {
  return (
    <main>
      <h1>Dashboard</h1>
      <Stat label="Deploys" value="28" />
      <Stat label="Errors" value="3" />
    </main>
  );
}` },
    { question: 'How does a child component receive data from its parent?', options: ['Through props passed as attributes', 'Through global variables', 'Through the URL', 'Through a config file'], correct: 0 }),

  L('lists-keys', 'Components & Props', 'Lists & Keys',
    'Render arrays with `.map()`. Each element needs a stable `key` so React can track items efficiently across re-renders.',
    { 'app/page.jsx': `const posts = ['Routing', 'Layouts', 'Server Components'];

export default function Page() {
  return (
    <main>
      <h1>Topics</h1>
      <ul>
        {posts.map((post) => (
          <li key={post}>{post}</li>
        ))}
      </ul>
    </main>
  );
}` },
    { question: 'Why does each item in a mapped list need a key?', options: ['So React can track items across re-renders', 'To style the list', 'To sort the array', 'Keys are optional and ignored'], correct: 0 }),

  L('conditional', 'Components & Props', 'Conditional Rendering',
    'Use a ternary or `&&` to show UI based on a condition. Change `isPro` below and watch the output switch.',
    { 'app/page.jsx': `export default function Page() {
  const isPro = true;
  return (
    <main>
      <h1>Account</h1>
      {isPro ? <p className="card">Pro features unlocked.</p> : <p>Upgrade to Pro.</p>}
    </main>
  );
}` }),

  /* ── Client Components & State ── */
  L('use-client-state', 'Client Components & State', "'use client' & useState",
    'Interactivity needs a **Client Component** — add `\'use client\'` at the top and import hooks. `useState` stores state that re-renders the UI when it changes.',
    { 'app/page.jsx': `'use client';

import { useState } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Add one</button>
    </main>
  );
}` },
    { question: 'What directive marks a component as interactive (client-side)?', options: ["'use client'", "'use state'", "'use browser'", "'client only'"], correct: 0 }),

  L('events', 'Client Components & State', 'Handling Events',
    'Event handlers are functions passed to props like `onClick` or `onChange`. They run in the browser, so the component must be a Client Component.',
    { 'app/page.jsx': `'use client';

import { useState } from 'react';

export default function Page() {
  const [msg, setMsg] = useState('Click a button');
  return (
    <main>
      <h1>{msg}</h1>
      <button onClick={() => setMsg('Saved!')}>Save</button>
      <button onClick={() => setMsg('Reset')}>Reset</button>
    </main>
  );
}` }),

  L('forms', 'Client Components & State', 'Controlled Inputs',
    'A controlled input ties its `value` to state and updates via `onChange`. State becomes the single source of truth for the field.',
    { 'app/page.jsx': `'use client';

import { useState } from 'react';

export default function Page() {
  const [name, setName] = useState('');
  return (
    <main>
      <h1>Hello {name || 'stranger'}</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
    </main>
  );
}` }),

  L('use-effect', 'Client Components & State', 'useEffect',
    '`useEffect` runs code after render — for fetching, timers, or subscriptions. The dependency array `[]` makes it run once on mount.',
    { 'app/page.jsx': `'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [now, setNow] = useState('');
  useEffect(() => {
    setNow(new Date().toLocaleTimeString());
  }, []);
  return <main><h1>Mounted at</h1><p className="card">{now || 'computing...'}</p></main>;
}` },
    { question: 'What does an empty dependency array [] mean for useEffect?', options: ['Run once after the first render', 'Run on every render', 'Never run', 'Run only on unmount'], correct: 0 }),

  /* ── Route Handlers (API) ── */
  L('route-handler', 'Route Handlers (API)', 'Your First Route Handler',
    'A `route.js` file exports HTTP methods like `GET`. It returns a `Response`. This one lives at `/api/hello` — edit it, then click **GET /api/hello** below to run it.',
    { 'app/api/hello/route.js': `export async function GET() {
  return Response.json({ ok: true, message: 'Edited route handler!' });
}`,
      'app/page.jsx': `export default function Page() {
  return <main><h1>Route handlers</h1><p>Use the GET /api/hello button to call the handler.</p></main>;
}` },
    { question: 'What does a Route Handler export to respond to a GET request?', options: ['A function named GET', 'A variable named get', 'A default component', 'An onRequest hook'], correct: 0 }),

  L('route-dynamic', 'Route Handlers (API)', 'Dynamic JSON Responses',
    'Route handlers run real JavaScript, so the response can be computed. Return any serialisable data with `Response.json(...)`.',
    { 'app/api/hello/route.js': `export async function GET() {
  const items = [1, 2, 3].map((n) => ({ id: n, label: 'Item ' + n }));
  return Response.json({ count: items.length, items });
}`,
      'app/page.jsx': `export default function Page() {
  return <main><h1>Computed API</h1><p>Click GET /api/hello to see the generated list.</p></main>;
}` }),

  L('fetch-in-component', 'Route Handlers (API)', 'Fetching in a Component',
    'A Client Component can `fetch` your route handler in `useEffect` and render the result. The preview wires `fetch(\'/api/hello\')` to your GET handler.',
    { 'app/api/hello/route.js': `export async function GET() {
  return Response.json({ user: 'Maya', plan: 'Pro' });
}`,
      'app/page.jsx': `'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/hello').then((r) => r.json()).then(setData);
  }, []);
  return (
    <main>
      <h1>From the API</h1>
      <pre className="card">{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
    </main>
  );
}` }),

  /* ── Styling ── */
  L('global-css', 'Styling', 'Global CSS',
    'Styles in `app/globals.css` apply everywhere. Edit the CSS file (switch to it in the editor) and the preview restyles instantly.',
    { 'app/globals.css': BASE_CSS + `

h1 { color: #7c3aed; }
.banner { background: #ede9fe; border-radius: 10px; padding: 16px; }`,
      'app/page.jsx': `export default function Page() {
  return <main><h1>Themed heading</h1><div className="banner">Styled by globals.css</div></main>;
}` }),

  L('class-names', 'Styling', 'Styling with Class Names',
    'Attach styles with `className` and define the rules in CSS. This keeps markup and styling separate and reusable.',
    { 'app/globals.css': BASE_CSS + `

.pill { display: inline-block; background: #dcfce7; color: #166534; border-radius: 999px; padding: 4px 12px; font-weight: 700; }`,
      'app/page.jsx': `export default function Page() {
  return <main><h1>Status</h1><span className="pill">Deployed</span></main>;
}` }),

  L('inline-styles', 'Styling', 'Inline Styles',
    'The `style` prop takes a JS object with camelCased properties. Good for one-off, dynamic values; use CSS classes for anything reused.',
    { 'app/page.jsx': `export default function Page() {
  const accent = '#2563eb';
  return (
    <main>
      <h1 style={{ color: accent, borderBottom: '3px solid ' + accent }}>Inline styled</h1>
    </main>
  );
}` }),

  /* ── Data & Rendering Patterns ── */
  L('loading-state', 'Data & Rendering Patterns', 'Loading State',
    'Show a placeholder while data is in flight. Track a `loading` boolean (or a null value) and swap the UI when the fetch resolves.',
    { 'app/api/hello/route.js': `export async function GET() {
  return Response.json({ title: 'Quarterly report', ready: true });
}`,
      'app/page.jsx': `'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/hello').then((r) => r.json()).then(setData);
  }, []);
  if (!data) return <main><h1>Loading…</h1></main>;
  return <main><h1>{data.title}</h1></main>;
}` }),

  L('error-handling', 'Data & Rendering Patterns', 'Error Handling',
    'Wrap fetches in `try/catch` (or `.catch`) and keep an `error` state so failures show a message instead of a blank screen.',
    { 'app/page.jsx': `'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [state, setState] = useState({ status: 'loading' });
  useEffect(() => {
    fetch('/api/hello')
      .then((r) => r.json())
      .then((data) => setState({ status: 'ok', data }))
      .catch((err) => setState({ status: 'error', message: err.message }));
  }, []);
  if (state.status === 'error') return <main><h1>Something went wrong</h1><p>{state.message}</p></main>;
  if (state.status === 'loading') return <main><h1>Loading…</h1></main>;
  return <main><h1>Loaded</h1><pre className="card">{JSON.stringify(state.data)}</pre></main>;
}` }),

  L('derived-ui', 'Data & Rendering Patterns', 'Derived UI from Data',
    'Transform fetched data into UI with `.map()`. The handler returns an array; the component renders one card per item.',
    { 'app/api/hello/route.js': `export async function GET() {
  return Response.json({ team: [
    { name: 'Ada', role: 'Lead' },
    { name: 'Lin', role: 'Design' },
    { name: 'Sam', role: 'Backend' }
  ]});
}`,
      'app/page.jsx': `'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [team, setTeam] = useState([]);
  useEffect(() => {
    fetch('/api/hello').then((r) => r.json()).then((d) => setTeam(d.team));
  }, []);
  return (
    <main>
      <h1>Team</h1>
      {team.map((m) => (
        <div key={m.name} className="card"><strong>{m.name}</strong> — {m.role}</div>
      ))}
    </main>
  );
}` }),

  /* ── Navigation ── */
  L('link', 'Navigation', 'The Link Component',
    '`next/link` enables client-side navigation between routes without a full reload. In this single-page preview the links render as anchors, but the concept is the same: prefer `<Link>` over `<a>` for internal routes.',
    { 'app/page.jsx': `import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <h1>Navigation</h1>
      <nav className="card">
        <Link href="/">Home</Link> · <Link href="/about">About</Link> · <Link href="/blog">Blog</Link>
      </nav>
    </main>
  );
}` },
    { question: 'Why use <Link> instead of <a> for internal navigation?', options: ['It enables fast client-side navigation', 'It is required by JSX', 'It styles links automatically', 'There is no difference'], correct: 0 }),

  L('section-nav', 'Navigation', 'In-Page Section Nav',
    'Anchor links (`href="#id"`) jump to sections on the same page — useful for long docs or landing pages alongside route-level navigation.',
    { 'app/page.jsx': `export default function Page() {
  return (
    <main>
      <nav className="card"><a href="#features">Features</a> · <a href="#pricing">Pricing</a></nav>
      <section id="features"><h1>Features</h1><p>Fast, file-based routing.</p></section>
      <section id="pricing"><h1>Pricing</h1><p>Free to start.</p></section>
    </main>
  );
}` }),

  /* ── Patterns & Project ── */
  L('reusable-card', 'Patterns & Project', 'Reusable Card Component',
    'Compose UI from small, prop-driven components. A `Card` that accepts `title` and `children` can be reused across the app.',
    { 'app/page.jsx': `function Card({ title, children }) {
  return <div className="card"><strong>{title}</strong><div>{children}</div></div>;
}

export default function Page() {
  return (
    <main>
      <h1>Reusable cards</h1>
      <Card title="Speed">Static-first rendering.</Card>
      <Card title="DX">File-based routing.</Card>
    </main>
  );
}` }),

  L('mini-project', 'Patterns & Project', 'Mini Project: Dashboard',
    'Put it together: a route handler returns metrics, a Client Component fetches them on mount, and reusable components render the dashboard. Edit any part and watch it update.',
    { 'app/api/hello/route.js': `export async function GET() {
  return Response.json({ metrics: [
    { label: 'Users', value: '12.4k' },
    { label: 'Revenue', value: '$48k' },
    { label: 'Uptime', value: '99.9%' }
  ]});
}`,
      'app/page.jsx': `'use client';

import { useEffect, useState } from 'react';

function Metric({ label, value }) {
  return <div className="card"><strong style={{ fontSize: 26 }}>{value}</strong><div>{label}</div></div>;
}

export default function Page() {
  const [metrics, setMetrics] = useState([]);
  useEffect(() => {
    fetch('/api/hello').then((r) => r.json()).then((d) => setMetrics(d.metrics));
  }, []);
  return (
    <main>
      <h1>Command center</h1>
      {metrics.length ? metrics.map((m) => <Metric key={m.label} {...m} />) : <p>Loading…</p>}
    </main>
  );
}` }),
];

/* ── Going to Production ── */
LESSONS.push(
  L('dynamic-routes', 'Going to Production', 'Dynamic Routes',
    'A folder like `app/blog/[slug]/page.jsx` creates a **dynamic route**. The page receives a `params` object — `params.slug` holds the value from the URL. This single-page preview can\'t change URLs, so we model the param as a constant, but the rendering is exactly what a dynamic route does.',
    { 'app/page.jsx': `export default function Page() {
  // Real signature: export default function Page({ params }) { ... }
  const params = { slug: 'hello-world' }; // provided by the [slug] segment

  const post = {
    title: 'Hello World',
    body: 'This page was rendered for /blog/' + params.slug,
  };

  return (
    <main>
      <h1>{post.title}</h1>
      <p className="card">Route param <strong>slug</strong> = {params.slug}</p>
      <p>{post.body}</p>
    </main>
  );
}` },
    { question: 'How do you create a dynamic route segment in the App Router?', options: ['A folder named [param], e.g. [slug]', 'A file named dynamic.js', 'A query string', 'A route.config entry'], correct: 0 }),

  L('server-vs-client', 'Going to Production', 'Server vs Client Components',
    'In the App Router, components are **Server Components by default** — they render on the server, ship zero JavaScript, and can fetch data directly. Add `\'use client\'` to make a **Client Component** with interactivity (hooks, events). The pattern: keep most of the tree as Server Components and push `\'use client\'` down to the small interactive leaves.',
    { 'app/page.jsx': `'use client';

import { useState } from 'react';

// Server-style component: plain function, no hooks — ships no JS
function ProductInfo({ product }) {
  return (
    <div className="card">
      <h1>{product.name}</h1>
      <p>\${product.price}</p>
    </div>
  );
}

// Client component: interactivity needs state
function AddToCart() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>In cart: {count}</button>;
}

export default function Page() {
  return (
    <main>
      <ProductInfo product={{ name: 'Headphones', price: 149 }} />
      <AddToCart />
    </main>
  );
}` },
    { question: 'What makes a component a Client Component?', options: ["The 'use client' directive at the top", 'Importing React', 'Being in the app folder', 'Exporting metadata'], correct: 0 }),

  L('loading-streaming', 'Going to Production', 'Loading & Streaming',
    'A `loading.jsx` file shows instant UI while a Server Component streams in — no spinner wiring needed. Under the hood this uses React `<Suspense>`. Here we model the same behaviour with a loading state so you can see the pattern: show a placeholder, then swap in the data when it arrives.',
    { 'app/page.jsx': `'use client';

import { useEffect, useState } from 'react';

function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const t = setTimeout(() => setData({ users: 1280, revenue: '$48k' }), 700);
    return () => clearTimeout(t);
  }, []);

  if (!data) return <p className="card">Loading… (this is what loading.jsx renders)</p>;
  return (
    <div className="card">
      <h1>{data.users} users</h1>
      <p>Revenue: {data.revenue}</p>
    </div>
  );
}

export default function Page() {
  return <main><h1>Dashboard</h1><Dashboard /></main>;
}` }),

  L('caching-fetch', 'Going to Production', 'Data Fetching & Caching',
    'Next.js extends `fetch` with caching. By default fetches are cached; pass `{ cache: \'no-store\' }` for always-fresh data, or `{ next: { revalidate: 60 } }` to rebuild at most every 60 seconds (Incremental Static Regeneration). The component below fetches your route handler — edit `route.js` to change the cached payload.',
    { 'app/api/hello/route.js': `export async function GET() {
  return Response.json({ products: 128, cachedFor: '60s', revalidate: 60 });
}`,
      'app/page.jsx': `'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);
  // In a Server Component you would: const data = await fetch(url, { next: { revalidate: 60 } })
  useEffect(() => {
    fetch('/api/hello').then((r) => r.json()).then(setData);
  }, []);
  return (
    <main>
      <h1>Cached data</h1>
      <pre className="card">{data ? JSON.stringify(data, null, 2) : 'Loading…'}</pre>
    </main>
  );
}` },
    { question: 'How do you opt out of caching for a fetch in Next.js?', options: ["{ cache: 'no-store' }", '{ cache: true }', '{ revalidate: false }', 'fetch.nocache()'], correct: 0 }),

  L('metadata-seo', 'Going to Production', 'Metadata & SEO',
    'Export a `metadata` object (or an async `generateMetadata` function) from a page or layout and Next.js writes the `<title>`, description, and Open Graph tags into the document head — the foundation of SEO. The preview can\'t show the real head, so this lesson renders a search-result preview of the same metadata.',
    { 'app/page.jsx': `export const metadata = {
  title: 'Best Running Shoes 2026 — Acme',
  description: 'Hand-picked running shoes reviewed by experts.',
};

export default function Page() {
  const meta = {
    title: 'Best Running Shoes 2026 — Acme',
    url: 'acme.com › blog › running-shoes',
    description: 'Hand-picked running shoes reviewed by experts.',
  };
  return (
    <main>
      <h1>Metadata & SEO</h1>
      <div className="card">
        <div style={{ color: '#1a0dab', fontSize: 18 }}>{meta.title}</div>
        <div style={{ color: '#006621', fontSize: 13 }}>{meta.url}</div>
        <div style={{ color: '#545454', fontSize: 13 }}>{meta.description}</div>
      </div>
      <p>This is how your exported metadata appears in Google results.</p>
    </main>
  );
}` },
    { question: 'How does the App Router set the page title and meta tags?', options: ['By exporting a metadata object (or generateMetadata)', 'With a <head> tag in page.jsx', 'In next.config.js', 'They cannot be customized'], correct: 0 }),

  L('middleware-deploy', 'Going to Production', 'Middleware & Deploying',
    'A `middleware.js` at the project root runs **before a request is completed** — on the edge — so it can redirect, rewrite, or attach headers (auth checks, A/B tests, geolocation). To deploy, push to Vercel (or any Node host); environment variables live in `.env.local` and the host\'s dashboard. This page shows what middleware might attach to a request.',
    { 'app/page.jsx': `export default function Page() {
  // middleware.js runs before this page and can add headers, redirect, or rewrite.
  // Here is what it might have attached to the request:
  const fromMiddleware = { country: 'US', authed: true };

  return (
    <main>
      <h1>Middleware & Deploy</h1>
      <div className="card">middleware set <strong>x-country</strong> = {fromMiddleware.country}</div>
      <p>{fromMiddleware.authed
        ? 'Auth check passed — rendering the protected page.'
        : 'No session — middleware would redirect to /login.'}</p>
      <p>Ship it: push to Vercel, set env vars, and your route handlers run as serverless functions.</p>
    </main>
  );
}` },
    { question: 'Where does Next.js middleware run?', options: ['Before the request completes, on the edge', 'Only in the browser', 'After the page renders', 'Inside each component'], correct: 0 }),
);

export const CHAPTERS = [...new Set(LESSONS.map((lesson) => lesson.chapter))];
