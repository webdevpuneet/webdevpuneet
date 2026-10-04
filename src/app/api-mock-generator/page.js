import ApiMockGenerator from '@/components/ApiMockGenerator';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'API Mock Generator — Free Fake REST API Builder with JSON Schema | webdevpuneet.com',
  description: 'Generate fake REST API endpoints with realistic mock JSON. Define GET/POST/PUT/DELETE routes and export as JSON Server db.json or Postman. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/api-mock-generator/' },
  icons: { icon: '/icons/api-mock-generator.svg', shortcut: '/icons/api-mock-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/api-mock-generator/',
    siteName: 'webdevpuneet.com',
    title: 'API Mock Generator — Free Fake REST API Builder with JSON Schema',
    description: 'Build fake REST API endpoints with realistic mock JSON. Auto-generate fake data, export as JSON Server or Postman collection. Free, no sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/api-mock-generator.png', width: 1200, height: 630, alt: 'API Mock Generator Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'API Mock Generator — Free Fake REST API Builder with JSON Schema',
    description: 'Build fake REST API endpoints with realistic mock JSON. Auto-generate fake data, export as JSON Server or Postman. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/api-mock-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an API mock generator and why do frontend developers use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An API mock generator creates fake REST API endpoints with realistic JSON responses without needing a real backend server. Frontend developers use mock APIs during development when the backend is not yet built, when the backend team works on a different sprint, or when testing UI components in isolation. With a mock API, developers can build and test the full frontend data flow — fetching, displaying, and submitting data — using predictable, controlled responses. Mock APIs also help QA teams test edge cases (empty states, error responses, pagination) without depending on backend state.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I create a fake REST API with this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Click "+ Add" in the sidebar to create a new endpoint. Select the HTTP method (GET, POST, PUT, PATCH, DELETE), type the path (e.g. /api/users or /api/products/:id), and choose the response status code. In the Response Body editor, paste or type the JSON you want the endpoint to return. Click "🎲 Generate fake data" to auto-fill the response with realistic values based on your field names — IDs become UUIDs, email fields get email addresses, name fields get person names, date fields get ISO timestamps, and so on. Add as many endpoints as you need, then export as a JSON Server db.json or a Postman collection.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is JSON Server and how do I use the exported db.json?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'JSON Server is a zero-configuration REST API server built on Node.js. It reads a db.json file and automatically creates full CRUD endpoints for each top-level key. To use the exported db.json: install JSON Server with npm install -g json-server, save the exported content as db.json, then run npx json-server --watch db.json --port 3000. This instantly creates a real local API at http://localhost:3000 with GET (list + by ID), POST, PUT, PATCH, and DELETE endpoints. Your frontend can make real fetch() or axios calls to it during development. No additional backend code needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the fake data generator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The fake data generator analyzes your JSON field names and existing values to determine what type of data each field should contain. Field names containing "id" get UUIDs. Fields named "email" get realistic email addresses. Fields containing "name" get person names (first name, last name, or full name). Fields with "phone" or "mobile" get phone numbers. Fields containing "url", "link", "avatar", or "image" get URLs. Date fields (created_at, updated_at, date, timestamp) get ISO 8601 timestamps. Boolean fields (active, enabled, verified, is_* prefixed) get true/false values. Number fields (count, total, price, amount, rating) get appropriate numeric ranges. Array fields are expanded to 2–5 items with the same schema applied to each item. Nested objects are recursively faked.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I export my mock API to Postman?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — click "Export Postman" to generate a Postman Collection v2.1 JSON file. Copy the output and import it into Postman: open Postman, click "Import" (top-left), paste the JSON, and click Import. All your endpoints appear as requests in a new collection with pre-filled headers (Content-Type: application/json) and example responses. Set the baseUrl collection variable to your local server URL (http://localhost:3000 for JSON Server). This lets you test your mock API directly from Postman alongside your real API.',
      },
    },
    {
      '@type': 'Question',
      name: 'What mock delay is for and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The mock delay simulates real-world network latency. Setting a delay of 500–2000ms helps you test your application\'s loading states, skeleton screens, and error boundaries in realistic conditions. A delay of 0ms means responses are instantaneous — unrealistic for production but useful for fast unit testing. A delay of 300–800ms simulates a typical API response time on a fast connection. A delay of 2000ms+ tests slow network scenarios and timeout handling. The delay value is included as an X-Mock-Delay header in the simulated response preview so you can document the intended latency alongside the endpoint definition.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I mock error responses like 404, 401, and 500?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Select the endpoint in the sidebar and change the Status Code dropdown to the error code you need: 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 409 (Conflict), 422 (Unprocessable Entity), or 500 (Internal Server Error). Then edit the Response Body to match the error structure your API uses — for example: {"error": "Not Found", "message": "User with ID 123 does not exist", "code": 404}. Add a separate endpoint for each error scenario. This lets your frontend handle error states without needing the backend to intentionally return errors.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between this mock generator and a real API?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool generates mock endpoint definitions and realistic JSON response data — it is a design and planning tool, not a running server. The "simulated response" preview shows what the endpoint would return, but your frontend application cannot make actual HTTP requests to it. To turn the mock definitions into a real running API, export as JSON Server and run it locally with npx json-server, or import into Postman Mock Servers, Mockoon, or WireMock. Use this tool during the design phase to define your API contract and generate test data, then use JSON Server or a similar tool during development.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'API Mock Generator',
  url: 'https://webdevpuneet.com/api-mock-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based API mock generator. Define REST endpoints, auto-generate fake JSON data based on field names, and export as JSON Server db.json or Postman collection.',
  featureList: [
    'Define GET, POST, PUT, PATCH, DELETE endpoints',
    'Editable JSON response body per endpoint',
    'Smart fake data generator — UUIDs, emails, names, dates, URLs, booleans, numbers',
    'Status code selector — 200, 201, 204, 400, 401, 403, 404, 409, 422, 500',
    'Mock delay setting per endpoint',
    'Simulated response preview with status pill',
    'Copy cURL command for each endpoint',
    'Export as JSON Server db.json',
    'Export as Postman Collection v2.1',
    '100% browser-based — no server, works offline',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'API Mock Generator', item: 'https://webdevpuneet.com/api-mock-generator/' },
  ],
};

const SEO = {
  slug: 'api-mock-generator',
  title: 'API Mock Generator — Build Fake REST APIs with Realistic JSON for Frontend Development',

  about: {
    title: 'API Mock Generator — Free, Design Fake REST Endpoints with Auto-Generated JSON Data',
    description: 'Frontend development should not wait for the backend. This API mock generator lets you define your REST API contract — endpoints, methods, status codes, and response shapes — and immediately get realistic fake JSON to build against. No backend code, no running server, no sign-up required.\n\nDefine as many endpoints as your API needs. For each one, set the **HTTP method** (GET, POST, PUT, PATCH, DELETE), the **path** (e.g. `/api/users`, `/api/products/:id`), the **response status code**, and the **JSON response body**. Click **🎲 Generate fake data** and the tool recursively walks your JSON — objects, nested objects, and arrays alike — matching each key name against a chain of substring checks: keys ending in `id` become UUIDs, keys containing `email` become addresses built from a small pool of first and last names, keys containing `price`, `amount`, or `balance` become decimal numbers, keys starting with `is`, `has`, or `can` become booleans, and array values are expanded to 2–5 generated items using the first array entry as the shape template. Keys that match nothing fall back to a type-based guess — a string field gets a few lorem words, a number field gets a random integer or float depending on whether the existing value was one.\n\nThe **simulated response preview** shows exactly what the API would return — formatted JSON with a status code pill — giving you a clear picture of the endpoint contract. Copy the **cURL command** for any endpoint to share with teammates or paste into API testing tools.\n\n**Export as JSON Server** inspects every GET endpoint, takes the last non-parameter path segment as the resource name (`/api/users/:id` becomes `users`), and collects each endpoint\'s response body under that key to build a single `db.json` file. Run it with `npx json-server --watch db.json --port 3000` for a real local REST API your frontend can make actual `fetch()` calls to, with GET, POST, PUT, PATCH, and DELETE all working out of the box.\n\n**Export as Postman Collection** produces a v2.1 collection JSON with all your endpoints as request items, a `Content-Type: application/json` header pre-filled on each, an example response attached per endpoint using your configured status code and body, and a `baseUrl` collection variable defaulting to `http://localhost:3000` — import it into Postman in one click and every request is ready to send.\n\nEverything runs in your browser. Your API definitions are never sent to any server.',
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Browse and add endpoints', text: 'The sidebar shows your endpoint list — four example endpoints are pre-loaded. Click any endpoint to select and edit it. Click "+ Add" in the sidebar to create a new endpoint.' },
      { title: 'Configure the endpoint', text: 'For the selected endpoint, choose the HTTP method (GET, POST, PUT, PATCH, DELETE — color-coded by convention), type the API path (use :param for dynamic segments like /api/users/:id), select the response status code, and optionally set a delay in milliseconds to simulate network latency.' },
      { title: 'Edit the JSON response body', text: 'Edit the JSON response body directly in the text editor. A real-time invalid JSON warning badge appears if the JSON is malformed. Click "🎲 Generate fake data" to auto-populate the body with realistic values based on your field names — UUIDs, emails, names, dates, prices, and booleans are inferred from field name patterns.' },
      { title: 'Preview and copy the simulated response', text: 'The preview panel below shows the simulated response with a status pill and formatted JSON. Copy the response JSON with the "Copy" button, or copy a cURL command with "Copy cURL" to share the endpoint definition with teammates.' },
      { title: 'Export as JSON Server or Postman', text: 'When your endpoints are complete, click "Export JSON Server" to get a db.json file you can run with npx json-server --watch db.json --port 3000 for a real local API. Click "Export Postman" to get a Postman Collection v2.1 for direct Postman import with all endpoints and example responses.' },
    ],
  },

  features: [
    'Multi-endpoint management — sidebar lists all endpoints with method badge, path, and status indicator; add or remove endpoints freely',
    'HTTP method selector — GET (green), POST (blue), PUT (amber), PATCH (purple), DELETE (red); color-coded throughout the UI',
    'Dynamic path support — use :param segments like /api/users/:id for parameterized routes',
    'Full status code coverage — 200, 201, 204, 400, 401, 403, 404, 409, 422, 500 with status text shown',
    'Smart fake data generator — analyzes field names to produce UUIDs, emails, names, phone numbers, URLs, ISO dates, prices, ratings, booleans, lorem text, and colors; arrays expanded to 2–5 items recursively',
    'JSON validation — real-time invalid JSON warning badge on the body editor so you catch errors immediately',
    'Mock delay — set per-endpoint latency (ms) to test loading states and skeleton screens during frontend development',
    'Simulated response preview — formatted JSON with status pill and endpoint label; "Copy cURL" for sharing or testing',
    'Export JSON Server — generates db.json ready for npx json-server with a one-liner run command shown in the export panel',
    'Export Postman Collection — generates v2.1 collection with all endpoints, headers, example responses, and baseUrl variable for direct Postman import',
  ],

  useCases: [
    {
      icon: '◉',
      title: 'Build frontend UI before the backend API is ready',
      desc: 'When the backend team is still designing the database schema or building the API, frontend developers can use this tool to define the expected API contract and generate mock JSON. Build your React, Vue, or Angular components against the mock data structure. When the real API is ready, swap the mock URL for the production URL — if you designed the contract correctly, it just works. Use our [JSON to TypeScript](/json-to-typescript) converter to generate TypeScript interfaces from your mock JSON for type-safe frontend development.',
    },
    {
      icon: '⬡',
      title: 'Generate test data for unit and integration tests',
      desc: 'Click "🎲 Generate fake data" multiple times to produce varied test fixtures. Copy the JSON and paste it into your test files as mock API responses for `jest.mock()`, `msw` (Mock Service Worker) handlers, or `nock` intercepts. Each generation produces different random values — names, UUIDs, dates — giving you realistic varied test data without manually writing fixtures. For large datasets, put the schema in an array and the faker produces 2–5 items automatically. Combine with our [JSON Formatter](/json-formatter) to clean up and validate the test fixtures before committing.',
    },
    {
      icon: '⚡',
      title: 'Prototype and demo API-driven features quickly',
      desc: 'When presenting a proof-of-concept or demoing a feature to stakeholders, a mock API lets you show real data flowing through the UI without a live backend. Export as JSON Server and run it locally — your demo shows real HTTP requests, real loading states, and real data rendering. Generate realistic-looking names, emails, and prices that look believable in a client demo. The delay setting lets you add realistic latency to show the loading spinner and skeleton states that will appear in production.',
    },
    {
      icon: '▦',
      title: 'Design and document your API contract before implementation',
      desc: 'Use this tool as an API design interface — define all your endpoints, their methods, response shapes, and status codes before writing a single line of backend code. Export as Postman and share with the backend team as the agreed API contract. This reduces back-and-forth between teams and ensures the frontend and backend build to the same spec. The cURL copy button lets you share exact example requests with team members. Use our [API Request Generator](/api-request-generator-tester) to test against the real API once it\'s built.',
    },
    {
      icon: '△',
      title: 'Test error handling and edge cases in the frontend',
      desc: 'Add error endpoints (401, 403, 404, 500) alongside the happy-path endpoints. Set a 401 endpoint for an authentication failure scenario, a 404 for a resource not found, and a 500 for a server error. Test that your frontend displays the correct error messages, redirects to login on 401, and shows the error boundary on 500. Add a 200 endpoint with an empty array body to test the empty state. Set a 3000ms delay to test the request timeout UI. None of these edge cases require a real backend to test — design them all here.',
    },
    {
      icon: '⇄',
      title: 'Create Postman collections for API documentation and team sharing',
      desc: 'Export as a Postman Collection to document your API for the team. Import the collection into Postman, set the baseUrl variable to your staging server, and all endpoints are ready to run. New developers joining the project can import the collection and immediately have all API endpoints available without setting up individual requests. The collection includes example responses so developers can see expected output without making a live request. Share the collection JSON in your repository\'s docs folder for always-up-to-date API documentation.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function ApiMockGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ApiMockGenerator /></div>
      <IndexOnly><AdSlot />
      <SeoSection heading="Free API Mock Generator — Build Fake REST APIs with Realistic JSON for Frontend Development" {...SEO} /></IndexOnly>

    </div>
  );
}
