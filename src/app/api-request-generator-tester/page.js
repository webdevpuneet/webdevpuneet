import ApiRequestGeneratorTool from '@/components/ApiRequestGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'API Request Tester & Code Generator — Free Postman Alternative | webdevpuneet.com',
  description: 'Test APIs in the browser — send requests, inspect responses, and generate code in 12 languages. Collections sync via GitHub Gist. Free, no install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/api-request-generator-tester/' },
  icons: { icon: '/icons/api-request-generator-tester.svg', shortcut: '/icons/api-request-generator-tester.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/api-request-generator-tester/',
    siteName: 'webdevpuneet.com',
    title: 'API Request Tester & Code Generator — Free Postman Alternative',
    description: 'Send API requests live in the browser. Generate code in 12 languages. Save collections and history — synced across devices via GitHub Gist. No install, no account.',
    images: [{ url: 'https://webdevpuneet.com/images/api-request-generator-tester.png', width: 1200, height: 800, alt: 'API Request Generator & Tester — Postman Alternative' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'API Request Tester & Code Generator — Free Postman Alternative',
    description: 'Test APIs live. Generate Fetch, Axios, Python, Go, cURL and 8 more. Collections and history sync across devices via GitHub Gist. Free, no install.',
    images: ['https://webdevpuneet.com/images/api-request-generator-tester.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I test a REST API online without installing Postman?',
      acceptedAnswer: { '@type': 'Answer', text: 'Open the tool in your browser, paste your API endpoint URL, select the HTTP method (GET, POST, PUT, etc.), add headers or body in the tabs below the URL bar, and click Send. The response appears instantly — status code, response time, body, and headers — with no install, no account, and no setup. Works on any device including Chromebooks and restricted work machines where installing desktop apps is blocked.' },
    },
    {
      '@type': 'Question',
      name: 'How do I save API requests and sync them across devices?',
      acceptedAnswer: { '@type': 'Answer', text: 'Click the "+ Save" button in the Collections panel on the left sidebar to name your request and assign it to a collection. Collections and request history are stored in your browser\'s IndexedDB — no account needed. To sync across devices, click the GitHub icon in the toolbar, paste a GitHub Personal Access Token with gist scope, and click Sync Now. The tool creates a private Gist and syncs automatically whenever you add or delete requests. Open the same tool on another device, enter the same token, and your collections and history appear instantly.' },
    },
    {
      '@type': 'Question',
      name: 'How does GitHub Gist sync work for collections and history?',
      acceptedAnswer: { '@type': 'Answer', text: 'GitHub Gist sync backs up your collections and request history to a private secret Gist on your GitHub account. To set it up: create a Personal Access Token at github.com/settings/tokens with the gist scope, paste it in the GitHub sync panel (GitHub icon in the toolbar), and click Sync Now. On first sync the tool either finds an existing backup Gist or creates a new one. Auto-sync triggers 5 seconds after any add or delete. Deletions propagate — if you delete a collection on one browser, it disappears on all others after sync. History clears propagate the same way.' },
    },
    {
      '@type': 'Question',
      name: 'How do I test an API that requires a Bearer token or API key?',
      acceptedAnswer: { '@type': 'Answer', text: 'Open the Auth tab in the request section. For Bearer token authentication, select Bearer Token and paste your JWT or token — it is added as Authorization: Bearer automatically. For API key authentication, select API Key, enter the header name (e.g. X-API-Key) and value, and choose whether it goes in a header or query parameter. For Basic Auth, select Basic Auth and enter username and password — they are base64-encoded automatically. All auth details are included in the generated code for every language.' },
    },
    {
      '@type': 'Question',
      name: 'I get a CORS error when testing my API. How do I fix it?',
      acceptedAnswer: { '@type': 'Answer', text: 'CORS errors happen when the API server does not include the Access-Control-Allow-Origin header, so the browser blocks the request. When this happens the tool shows a Retry with CORS Proxy button — click it to re-route the request through corsproxy.io, which adds the missing header so the response reaches your browser. Do not use the proxy with sensitive credentials. For production code, the real fix is to configure CORS headers on your API server. Note: cURL, Python, PHP, Ruby, Go, and C# generated code runs server-side and is never affected by CORS.' },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a cURL command to Python, JavaScript, Go, or another language?',
      acceptedAnswer: { '@type': 'Answer', text: 'Reconstruct the request in the tool: paste the URL, set the method, add -H headers in the Headers tab, add the -d body in the Body tab (select JSON for a JSON body), set up auth in the Auth tab. Then switch to the Code tab and select Python, Fetch, Axios, Go, Ruby, PHP, C#, or any other language to get the equivalent code. All 12 languages are available simultaneously — no manual translation needed.' },
    },
    {
      '@type': 'Question',
      name: 'How do I test a GraphQL API endpoint online?',
      acceptedAnswer: { '@type': 'Answer', text: 'In the Body tab, select GraphQL. Two fields appear: a Query editor for your GraphQL query and a Variables field for a JSON variables object. Enter your query (e.g. { user(id: "1") { name email } }) and variables, then click Send. The tool posts the standard {"query":"...","variables":{...}} JSON to your endpoint. Switch to any language tab in the Code section to get the implementation in Fetch, Axios, Python, Go, and more.' },
    },
    {
      '@type': 'Question',
      name: 'Can I generate code for a POST request with a JSON body?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Select POST from the method dropdown, enter your URL, open the Body tab, choose JSON, and type your payload. Code for all 12 languages generates instantly — JavaScript fetch with JSON.stringify(), Axios with the data field, Python requests with json={}, PHP curl_setopt with json_encode(), Go with bytes.Buffer, C# with StringContent. All generated code sets Content-Type: application/json automatically. Click Send to test the POST live before writing any code.' },
    },
    {
      '@type': 'Question',
      name: 'How do I use environment variables to test the same request against dev and production?',
      acceptedAnswer: { '@type': 'Answer', text: 'Open the Env tab and create two environments — dev and prod — using the + button. In each, add a BASE_URL variable with the respective value (e.g. https://dev-api.example.com and https://api.example.com). Use {{BASE_URL}} in your URL bar. Switch environments by clicking the tab name — every {{VAR}} in your URL, headers, and body substitutes automatically before code is generated or a request is sent.' },
    },
    {
      '@type': 'Question',
      name: 'How do I keep API keys out of generated code snippets?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use environment variables in the Env tab. Add a variable named API_KEY with your actual key value, then use {{API_KEY}} in your Auth field or URL. The generated code contains the {{API_KEY}} placeholder rather than the real value — replace it with process.env.API_KEY (Node.js), os.environ["API_KEY"] (Python), or your framework equivalent before committing. This prevents accidental exposure when sharing code or filing bug reports.' },
    },
    {
      '@type': 'Question',
      name: 'How do I compare two API responses to check if something changed?',
      acceptedAnswer: { '@type': 'Answer', text: 'After receiving a response, click Pin in the response action bar to save it as a baseline. Then change your request (different params, different environment, after a deploy) and click Send. Click Diff to open a side-by-side modal showing pinned and current responses — status codes, response times, sizes, and full bodies. Useful for confirming a deploy did not change the response shape.' },
    },
    {
      '@type': 'Question',
      name: 'How do I extract a specific field from a large JSON API response?',
      acceptedAnswer: { '@type': 'Answer', text: 'After receiving a JSON response, use the JSONPath filter input above the response body. Type a path like $.data.users[0].name or $.items[*] to extract a specific value or array. The result updates live as you type. Use $.key for an object key, $.arr[0] for the first element, $.arr[*] for all items. Clear the filter to return to the full response.' },
    },
    {
      '@type': 'Question',
      name: 'How do I import a Postman or Insomnia collection?',
      acceptedAnswer: { '@type': 'Answer', text: 'Click the Import button in the toolbar and select your exported .json file. The tool reads it locally — nothing is uploaded. For Postman, export as Collection v2.1. For Insomnia, export as v4 format. If the file has one request it loads immediately; for collections with multiple requests, a picker modal appears. All fields populate automatically: method, URL, headers, body, auth, and GraphQL query. Switch to any language tab to get the code.' },
    },
    {
      '@type': 'Question',
      name: 'How do I generate Jest or Pytest test boilerplate for an API endpoint?',
      acceptedAnswer: { '@type': 'Answer', text: 'Configure your request in the tool, then switch to the Code tab and select Jest (JavaScript) or Pytest (Python). The generated code is a complete test file with two test cases: one asserting a 200 status and a defined response body, and one testing 401/403 handling with an invalid token. Both are pre-filled with your actual URL, headers, and body. Copy the file into your test suite and add specific assertions based on the response shape you see in the Response panel.' },
    },
    {
      '@type': 'Question',
      name: 'How do I share an API request with a teammate?',
      acceptedAnswer: { '@type': 'Answer', text: 'Click the Share button in the toolbar. The tool encodes your entire request — method, URL, query params, headers, body, and auth settings — as a base64 string in the URL and copies the link to your clipboard. Anyone who opens the link has the full request pre-loaded. Useful for bug reports with a reproducible request, debugging with colleagues, or bookmarking endpoints you use frequently. Auth tokens are included in the link so only share with trusted recipients.' },
    },
    {
      '@type': 'Question',
      name: 'Is GitHub Gist truly private? Should I store real API keys in synced collections?',
      acceptedAnswer: { '@type': 'Answer', text: 'No — avoid storing real production API keys or tokens in collections that sync to Gist. GitHub "private" Gists are not encrypted — they are unlisted links. Anyone who has your Gist URL or Gist ID can read all your saved collections without needing a GitHub login. Never share your Gist URL, Gist ID, or Personal Access Token with anyone. Use environment variables with placeholder names ({{API_KEY}}) in saved requests and substitute real values locally. For maximum privacy, skip Gist sync and use the Export workspace option to transfer collections manually.' },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the API Request Generator & Tester',
  description: 'Test APIs live in the browser and generate HTTP request code in 12 languages.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Select HTTP method and enter URL', text: 'Click the method dropdown (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS). Paste your endpoint URL. For GET/HEAD, the body is auto-disabled. Set a Base URL in Settings if all endpoints share the same host.' },
    { '@type': 'HowToStep', position: 2, name: 'Configure the request', text: 'Open Params for query params, Headers for custom headers, Body for JSON/form/GraphQL payload, Auth for Bearer token/API key/Basic auth, Env for environment variables, Settings for timeout and base URL.' },
    { '@type': 'HowToStep', position: 3, name: 'Send and inspect the response', text: 'Click Send or press Ctrl+Enter. The Response panel shows status code, time, size, and syntax-highlighted body. Use JSONPath filter to extract specific fields. Check Headers and Cookies tabs for full response inspection.' },
    { '@type': 'HowToStep', position: 4, name: 'Save to collections', text: 'Click "+ Save" in the Collections sidebar to name the request and assign it to a collection. Click any saved request to restore it instantly. Collections are stored in IndexedDB — no account required.' },
    { '@type': 'HowToStep', position: 5, name: 'Sync across devices with GitHub Gist', text: 'Click the GitHub icon in the toolbar. Enter a Personal Access Token with gist scope. Click Sync Now — the tool creates a private Gist and syncs collections and history automatically on every change. Open the same tool on another device with the same token to access all your data.' },
    { '@type': 'HowToStep', position: 6, name: 'Copy generated code', text: 'Switch to the Code tab to copy the snippet in any of 12 languages: Fetch, Axios, XHR, Node.js, cURL, Python, PHP, Ruby, Go, C#, Jest, Pytest. The code is always in sync with your current request configuration.' },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'API Request Generator & Tester',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'API Testing',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Test APIs live in the browser and generate HTTP request code in 12 languages. Collections and history stored in IndexedDB and synced across devices via GitHub Gist. No install, no account required.',
  url: 'https://webdevpuneet.com/api-request-generator-tester/',
  screenshot: 'https://webdevpuneet.com/images/api-request-generator-tester.png',
  featureList: [
    'Live API testing — Send button fires real requests; response shows status, time, size, syntax-highlighted JSON',
    'Code generation in 12 languages: Fetch, Axios, XHR, Node.js, cURL, Python, PHP, Ruby, Go, C#, Jest, Pytest',
    'Collections sidebar — save, organise, and restore requests with one click; no account needed',
    'History sidebar — every sent request logged with date/time; click to restore',
    'GitHub Gist sync — backup and sync collections and history across devices automatically',
    'Deletion sync — deleted collections and history entries propagate to all synced browsers',
    'Shareable URL — encodes full request as base64 link for sharing or bookmarking',
    'JSONPath response filter — extract nested fields from JSON responses live',
    'Response diff — pin a response and compare side-by-side with the next one',
    'CORS proxy — one-click retry via corsproxy.io when the browser blocks a request',
    'GraphQL query and variables editor',
    'Environment variables with multi-environment support (dev/staging/prod)',
    'Request timeout configurable in milliseconds with clean abort message',
    'Base URL prefix for working with the same API host',
    'Export/import workspace as JSON (collections + history + environments)',
    'Postman Collection v2.1 and Insomnia v4 import',
    '7 HTTP methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
    '5 body types: JSON, Form Data, URL Encoded, Raw, GraphQL',
    '4 auth types: None, Bearer Token, Basic Auth, API Key',
    'Response tabs: Body, Headers, Cookies',
    'Copy and download response body',
    'IndexedDB storage for collections and history — more reliable than localStorage',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'API Request Generator & Tester', item: 'https://webdevpuneet.com/api-request-generator-tester/' },
  ],
};

const seoData = {
  slug: 'api-request-generator-tester',
  title: 'API Request Tester & Code Generator — Free Postman Alternative',
  sections: [
    {
      type: '2col',
      left: {
        type: 'text',
        label: 'About this tool',
        heading: 'Test APIs Live and Generate Code in 12 Languages — No Install, No Account',
        text: `You need to hit an API endpoint right now — see what it returns, verify a header is set, confirm a POST with JSON is accepted. Opening Postman means finding the window, maybe logging in, clicking through a workspace. Reaching for the terminal means typing a full curl command and squinting at raw output. You just want to send a request and see the response.\n\nThat is what this tool is for. Paste the URL, pick the method, add headers and body in the tabs below the URL bar, click **Send**. The response appears in under a second — HTTP status, response time, body size, and the full JSON highlighted with colour-coded keys, values, arrays, and booleans. No install. No account. No workspace setup.\n\nBeyond quick testing, the tool solves the most common translation problem: **API docs give you cURL, you need Python, Go, or Axios**. Configure your request once and every language tab updates instantly — **12 outputs in parallel**: JavaScript Fetch, Axios, XMLHttpRequest, Node.js 18+, cURL, Python requests, PHP cURL, Ruby net/http, Go net/http, C# HttpClient, Jest tests, and Pytest tests.\n\n**The left sidebar works like Postman's.** Collections at the top — save any request with a name and folder, click to restore. Request history below — every request you send is logged with the date and time, click any entry to reload it instantly. Both are stored in IndexedDB, which survives browser restarts reliably.\n\n**Cross-device sync via GitHub Gist.** Click the GitHub icon in the toolbar, paste a Personal Access Token with \`gist\` scope, and click Sync Now. The tool creates a private secret Gist and syncs automatically — 5 seconds after any collection add, delete, or history update. Open the tool on a second device with the same token and your entire workspace appears. Deletions propagate: if you delete a collection on one browser, it disappears on all others after the next sync. History clears propagate the same way, so cleared history never comes back from another device.\n\n**When the JSON response is 500 lines deep**, use the **JSONPath filter** above the response body to pull out exactly what you need. Type \`$.data.users[0].email\` to see only that value. Use \`$.items[*]\` to get every array element. The filter runs live — no button press needed.\n\n**When you need to verify a deploy didn't break an API**, pin the before-deploy response with the **📌 Pin** button. Deploy, send the same request, click **⇄ Diff** — a side-by-side modal shows exactly what changed in the body, status code, and timing.\n\n**When a colleague needs to reproduce your request**, click **⇡ Share** to copy a link that encodes the entire request — URL, method, headers, body, auth — as a URL parameter. Anyone who opens it has the full request pre-loaded.\n\n**For recurring API work**, save requests to named **collections** in the left sidebar. Create dev, staging, and prod **environments** with \`{{API_KEY}}\` and \`{{BASE_URL}}\` variables that swap automatically. Set a **Base URL** in Settings so you type only the path for each request. **Export your full workspace** as a JSON file to back it up or share with a teammate.\n\nAll requests go directly from your browser to the API. Nothing passes through the tool's servers except when you explicitly use the CORS proxy. Your tokens, passwords, and API keys stay on your device.`,
      },
      right: {
        type: 'features',
        heading: 'Features',
        items: [
          '**Live API testing** — Send button fires real requests; response shows status, time, size, syntax-highlighted JSON body',
          '**12 language outputs** — Fetch, Axios, XHR, Node.js (18+), cURL, Python requests, PHP cURL, Ruby net/http, Go net/http, C# HttpClient, Jest, Pytest',
          '**Collections sidebar** — save named requests in folders, restore with one click, stored in IndexedDB',
          '**History sidebar** — every sent request logged with date/time; click to restore instantly',
          '**GitHub Gist sync** — backup and sync collections + history across devices; deletions propagate to all browsers',
          '**Shareable URL** — encodes method, URL, headers, body, and auth as a [base64](https://fwdtools.com/base64-encoder-decoder/) link',
          '**JSONPath filter** — type `$.data.items[0]` to extract nested fields live from the response body',
          '**Response diff** — pin a response, send another, compare side-by-side with status, time, and full body',
          '**Copy & download response** — clipboard copy or .json/.txt download; paste into [JSON Dashboard Generator](/json-dashboard-generator) to visualise as charts',
          '**Response tabs** — Body, Headers, Cookies for full inspection',
          '**CORS proxy** — one-click retry via corsproxy.io when the browser blocks a request',
          '**GraphQL support** — dedicated query + variables editor; serialised to standard HTTP POST',
          '**Environment variables** — `{{VAR}}` substitution in URL, headers, and body with multi-env support',
          '**Request timeout** — configurable ms limit with AbortController and clean error message',
          '**Base URL prefix** — set once in Settings, type only the path per request',
          '**Export / import workspace** — full backup of collections, history, and environments as one JSON file',
          '**Postman & Insomnia import** — Collection v2.1 and Insomnia v4 format',
          '**7 HTTP methods** — GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
          '**5 body types** — JSON, form-data, url-encoded, raw, GraphQL',
          '**4 auth types** — None, Bearer Token, Basic Auth, API Key (header or query param)',
        ],
      },
    },
    {
      type: 'steps',
      heading: 'How to Use',
      items: [
        { title: 'Select HTTP method and enter the URL', text: 'Click the method dropdown and select GET, POST, PUT, PATCH, DELETE, HEAD, or OPTIONS. Paste your endpoint URL into the URL bar. If all your endpoints share the same host, open Settings and set a Base URL prefix — then type only the path (like /users) for each request.' },
        { title: 'Configure your request', text: 'Use the tabs above the response area: Params for query string parameters (with per-row enable/disable), Headers for custom headers, Body for JSON/form/raw/GraphQL payload (Content-Type injected automatically), Auth for Bearer token, Basic Auth, or API Key, Env for environment variable sets, Settings for timeout and redirect options.' },
        { title: 'Send and inspect the response', text: 'Click Send or press Ctrl+Enter. The Response panel shows the status code, response time, and body size. Use the JSONPath filter to drill into specific fields. Check the Headers tab for response headers and Cookies for Set-Cookie values. Copy the body or download it with the action buttons.' },
        { title: 'Save to collections', text: 'Click "+ Save" in the Collections panel on the left sidebar to name the current request and assign it to a collection (new or existing). Click any saved request to restore it instantly. To delete: click × on the request or × on the collection name. All data stored in IndexedDB — no account needed.' },
        { title: 'Set up GitHub Gist sync (optional)', text: 'Click the GitHub icon in the toolbar. Create a Personal Access Token at github.com/settings/tokens with gist scope and paste it in. Click Save settings, then Sync Now. The tool finds or creates a private Gist and syncs automatically 5 seconds after any change. On another device, enter the same token and your collections and history appear.' },
        { title: 'Keep your Gist private — never store real credentials in it', text: 'GitHub private Gists are not truly encrypted — they are unlisted links. Anyone who has your Gist URL or Gist ID can read the full contents without logging in. Never share your Gist URL, Gist ID, or Personal Access Token with anyone. Do not save real API keys, Bearer tokens, or production credentials in collections that sync to Gist — use placeholder values or environment variables instead. For maximum privacy, skip Gist sync and use Export workspace to transfer collections manually.' },
        { title: 'Use environment variables (optional)', text: 'Open the Env tab to add key-value pairs like BASE_URL and API_KEY. Create multiple environments (dev, staging, prod) with the + button. Use {{VAR_NAME}} in the URL, headers, or body — values substitute automatically when you generate code or send a request.' },
        { title: 'Compare responses with diff (optional)', text: 'Click Pin to save the current response as a baseline. Change your request or environment, send again, then click Diff to open a side-by-side comparison — status, size, response time, and full body. Useful for regression testing after a deploy.' },
        { title: 'Copy the generated code', text: 'Switch to the Code tab and select any of the 12 languages. The Jest and Pytest tabs generate complete test files pre-filled with your URL, headers, and body. Export the full workspace from Settings to back up everything as a JSON file.' },
      ],
    },
    {
      type: 'cards',
      heading: 'Common Use Cases',
      columns: 3,
      items: [
        { icon: 'API', title: 'Test an API without installing anything', desc: 'Paste the URL, add headers, click Send. Works on Chromebooks, locked-down work laptops, or any borrowed machine — no install, no account, instant results. No endpoint yet? Spin up a fake one with the [API mock generator](/api-mock-generator).' },
        { icon: 'CODE', title: 'Convert cURL to Python, Go, JS, or any language', desc: 'API docs give you cURL. You need Python requests, Go net/http, or Axios. Reconstruct the request and all 12 language tabs update instantly — ready to paste into your project.' },
        { icon: 'SYNC', title: 'Sync API collections across devices', desc: 'Save requests to collections and sync them across all your machines via GitHub Gist. Deletions propagate — clear history on one browser and it clears everywhere after the next sync.' },
        { icon: 'APP', title: 'Test a GraphQL endpoint online', desc: 'Paste your GraphQL endpoint, write the query and variables in the dedicated editor, click Send. See the response live and get working code for Fetch, Axios, Python, Go, and more.' },
        { icon: 'GLOBAL', title: 'Test against dev and production with one click', desc: 'Create dev and prod environments with {{BASE_URL}} and {{API_KEY}} variables. Switch environments with one click — all placeholders in URL, headers, and body update automatically.' },
        { icon: 'CHART', title: 'Check if a deploy changed an API response', desc: 'Pin the before-deploy response, deploy your change, send the same request, click Diff. A side-by-side modal shows exactly what changed — body, status, and response time.' },
        { icon: 'EXPORT', title: 'Already using Postman but want code generation', desc: 'Import your Postman Collection v2.1 or Insomnia v4 export. All fields load automatically. Switch to any language tab to get production code — something Postman does not generate.' },
        { icon: 'PRO', title: 'Write API test boilerplate without starting from scratch', desc: 'Once you have a working request, switch to Jest or Pytest to get a complete test file — happy path and auth error cases — pre-filled with your URL, headers, and body.' },
        { icon: 'WRITE', title: 'Share a request with a teammate for debugging', desc: 'Click Share to copy a link encoding the full request in the URL. Your teammate opens it and the request is pre-loaded — no need to paste curl commands into Slack.' },
      ],
    },
    {
      type: 'table',
      heading: 'All 12 Supported Languages — Libraries and Install Commands',
      columns: ['Language', 'Library / Client', 'Install', 'Best For'],
      rows: [
        ['JavaScript (Fetch)', 'Built-in browser API', 'None', 'Frontend apps, React, Vue, browser scripts'],
        ['JavaScript (Axios)', 'axios', '`npm install axios`', 'React, Vue, Node.js with interceptors and retries'],
        ['XMLHttpRequest', 'Built-in browser API', 'None', 'Legacy browsers, IE11 support, progress events'],
        ['Node.js', 'Built-in (Node 18+)', 'None', 'Server-side JS, Next.js API routes, Express'],
        ['cURL', 'CLI tool', 'Built-in on macOS/Linux', 'Terminal testing, shell scripts, CI/CD pipelines'],
        ['Python', 'requests', '`pip install requests`', 'Scripts, data pipelines, Django/Flask backends'],
        ['PHP', 'cURL (libcurl)', 'Built-in', 'WordPress, Laravel, legacy PHP backends'],
        ['Ruby', 'net/http', 'Built-in', 'Rails backends, Ruby scripts'],
        ['Go', 'net/http', 'Built-in (standard library)', 'Go microservices, CLI tools'],
        ['C#', 'HttpClient (.NET)', 'Built-in (.NET 2.2+)', '.NET APIs, ASP.NET Core, Blazor backends'],
        ['Jest', 'axios + jest', '`npm install jest axios`', 'JavaScript API integration tests'],
        ['Pytest', 'requests + pytest', '`pip install pytest requests`', 'Python API integration tests'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      heading: 'Your API Keys Never Leave Your Browser',
      text: `All requests fire directly from your browser to the target API — the tool's servers are never involved in normal operation. Your Bearer tokens, Basic Auth credentials, and API keys exist only in your browser tab's memory and are never logged, stored remotely, or transmitted anywhere other than the API endpoint you specify.\n\nCollections and request history are stored in your browser's IndexedDB — they stay on your device. GitHub Gist sync is entirely optional: when enabled, data is pushed to your own private Gist on your GitHub account via the GitHub API. The tool never sees your Gist data.\n\nWhen you use the CORS proxy, requests are routed through corsproxy.io. Avoid using the proxy with sensitive production credentials and prefer server-side code (Node.js, Python, Go) for authenticated requests in production environments.`,
    },
    {
      type: 'text',
      heading: 'A Lightweight Postman and Insomnia Alternative — No Install Required',
      text: `If you search "postman alternative no install" or "rest client browser free", you have probably hit one of two walls: Postman now requires an account and pushes toward paid plans, and Insomnia had a controversial forced-cloud-sync change that drove many developers away. Both require a desktop install that is blocked on many corporate machines.\n\nThis tool requires nothing. Open it in a tab and you are testing APIs in seconds. Requests go from your machine directly to the API — nothing is routed through the tool's servers in normal operation.\n\n**What you get for free with no account:**\n\n- Live API testing with syntax-highlighted JSON responses, response time, and body size\n- Code generation in 12 languages — the thing Postman doesn't do well\n- Postman-style left sidebar with Collections and History, stored in IndexedDB\n- GitHub Gist sync for cross-device access — collections and history follow you everywhere, deletions propagate\n- Environment variables for dev/staging/prod credential swapping\n- Shareable request links that encode the entire request in a URL parameter\n- Response diff — compare before/after responses side-by-side\n- JSONPath filtering to extract specific fields from deep nested JSON\n- Workspace export/import as plain JSON — no cloud account required\n- CORS proxy via corsproxy.io for APIs that block browser requests\n- Postman Collection v2.1 and Insomnia v4 import\n\n**The one thing this tool does that Postman doesn't:** the moment you have a working request, switch to Fetch, Python, Go, C#, or any other language and copy ready-to-run production code — no translation, no boilerplate, no documentation to reference. That is the feature developers come back for every day.`,
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      items: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
    },
  ],
};

export default function ApiRequestGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <div className={styles.page}>
        <div className={styles.toolSection}>
          <ApiRequestGeneratorTool />
        </div>
        <IndexOnly><AdSlot />
        <SeoSection {...seoData} /></IndexOnly>
      </div>
    </>
  );
}
