const httpStatusCodeReference = {
  id: 'http-status-code-reference',
  title: 'HTTP Status Code Reference',
  category: 'dev',
  html: `<div class="wrap">
  <div class="header">
    <h2>HTTP Status Codes</h2>
    <span class="count" id="result-count"></span>
  </div>

  <input type="text" id="search-input" placeholder="Search by code, name, or keyword (e.g. 404, redirect, auth)..." spellcheck="false" />

  <div class="filters" id="filters">
    <button class="filter-btn active" data-cat="all">All</button>
    <button class="filter-btn" data-cat="1">1xx Informational</button>
    <button class="filter-btn" data-cat="2">2xx Success</button>
    <button class="filter-btn" data-cat="3">3xx Redirection</button>
    <button class="filter-btn" data-cat="4">4xx Client Error</button>
    <button class="filter-btn" data-cat="5">5xx Server Error</button>
  </div>

  <div class="list" id="list"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 720px; margin: 0 auto; }

.header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 14px; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; }
.count { font-size: 12px; color: #94a3b8; font-weight: 600; }

#search-input {
  width: 100%; padding: 12px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px;
  font-size: 13.5px; font-family: inherit; color: #1e293b; margin-bottom: 12px;
}
#search-input:focus { outline: none; border-color: #6366f1; }

.filters { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
.filter-btn {
  padding: 6px 12px; border-radius: 999px; border: 1.5px solid #e2e8f0; background: #fff;
  font-size: 11.5px; font-weight: 700; color: #64748b; cursor: pointer; font-family: inherit;
}
.filter-btn.active { background: #1e293b; border-color: #1e293b; color: #fff; }

.list { display: flex; flex-direction: column; gap: 6px; max-height: 460px; overflow-y: auto; }

.row {
  display: flex; align-items: center; gap: 12px; padding: 11px 14px; background: #fff;
  border: 1px solid #e2e8f0; border-radius: 10px; cursor: pointer; transition: border-color 0.12s, box-shadow 0.12s;
}
.row:hover { border-color: #c7d2fe; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.row.copied { border-color: #4ade80; }

.code { font-family: "SF Mono", Consolas, monospace; font-weight: 800; font-size: 14px; width: 42px; flex-shrink: 0; }
.code.c1 { color: #0ea5e9; }
.code.c2 { color: #16a34a; }
.code.c3 { color: #d97706; }
.code.c4 { color: #dc2626; }
.code.c5 { color: #9333ea; }

.info { flex: 1; min-width: 0; }
.name { font-size: 13.5px; font-weight: 700; color: #1e293b; }
.desc { font-size: 12px; color: #64748b; margin-top: 2px; line-height: 1.4; }

.copy-hint { font-size: 10.5px; color: #cbd5e1; font-weight: 700; flex-shrink: 0; opacity: 0; transition: opacity 0.12s; }
.row:hover .copy-hint { opacity: 1; }
.row.copied .copy-hint { opacity: 1; color: #16a34a; }

.empty { text-align: center; padding: 30px; color: #94a3b8; font-size: 13px; }`,
  js: `const STATUS_CODES = [
  { code: 100, name: "Continue", desc: "The server has received the request headers and the client should proceed to send the request body." },
  { code: 101, name: "Switching Protocols", desc: "The requester asked the server to switch protocols, and the server has agreed (e.g. HTTP to WebSocket)." },
  { code: 103, name: "Early Hints", desc: "Used to return some response headers before the final HTTP message, typically for preloading resources." },
  { code: 200, name: "OK", desc: "The request succeeded. The meaning depends on the HTTP method used." },
  { code: 201, name: "Created", desc: "The request succeeded and a new resource was created, typically after a POST or PUT." },
  { code: 202, name: "Accepted", desc: "The request has been received but not yet acted upon; processing is not guaranteed to complete." },
  { code: 204, name: "No Content", desc: "The request succeeded but there is no content to return, often used after a DELETE." },
  { code: 206, name: "Partial Content", desc: "Used for range requests when the client asked for only part of a resource." },
  { code: 301, name: "Moved Permanently", desc: "The resource has been permanently moved to a new URL given in the Location header." },
  { code: 302, name: "Found", desc: "The resource temporarily resides at a different URL; the original URL should keep being used for future requests." },
  { code: 303, name: "See Other", desc: "The response can be found at a different URL and should be retrieved using a GET request." },
  { code: 304, name: "Not Modified", desc: "Used for caching: the resource has not changed since the version specified by request headers." },
  { code: 307, name: "Temporary Redirect", desc: "Like 302, but the request method and body must not be changed when reissuing the request." },
  { code: 308, name: "Permanent Redirect", desc: "Like 301, but the request method and body must not be changed when reissuing the request." },
  { code: 400, name: "Bad Request", desc: "The server cannot process the request due to a client error, such as malformed syntax." },
  { code: 401, name: "Unauthorized", desc: "Authentication is required and has failed or has not been provided." },
  { code: 403, name: "Forbidden", desc: "The server understood the request but refuses to authorize it, regardless of credentials." },
  { code: 404, name: "Not Found", desc: "The requested resource could not be found on the server." },
  { code: 405, name: "Method Not Allowed", desc: "The request method is known but not supported for the target resource." },
  { code: 406, name: "Not Acceptable", desc: "No content matching the criteria in the Accept headers could be produced." },
  { code: 407, name: "Proxy Authentication Required", desc: "The client must first authenticate itself with the proxy." },
  { code: 408, name: "Request Timeout", desc: "The server timed out waiting for the request from the client." },
  { code: 409, name: "Conflict", desc: "The request conflicts with the current state of the target resource, e.g. an edit conflict." },
  { code: 410, name: "Gone", desc: "The resource requested is no longer available and will not be available again." },
  { code: 411, name: "Length Required", desc: "The server refuses to accept the request without a defined Content-Length header." },
  { code: 412, name: "Precondition Failed", desc: "One or more conditions in the request headers evaluated to false on the server." },
  { code: 413, name: "Payload Too Large", desc: "The request entity is larger than the limits defined by the server." },
  { code: 414, name: "URI Too Long", desc: "The URI requested by the client is longer than the server is willing to interpret." },
  { code: 415, name: "Unsupported Media Type", desc: "The media format of the requested data is not supported by the server." },
  { code: 418, name: "I'm a teapot", desc: "A joke status code from the RFC 2324 Hyper Text Coffee Pot Control Protocol." },
  { code: 422, name: "Unprocessable Entity", desc: "The request was well-formed but contains semantic errors, common in REST APIs for validation failures." },
  { code: 425, name: "Too Early", desc: "The server is unwilling to risk processing a request that might be replayed." },
  { code: 429, name: "Too Many Requests", desc: "The user has sent too many requests in a given amount of time (rate limiting)." },
  { code: 431, name: "Request Header Fields Too Large", desc: "The server is unwilling to process the request because its header fields are too large." },
  { code: 500, name: "Internal Server Error", desc: "A generic error message when an unexpected condition was encountered on the server." },
  { code: 501, name: "Not Implemented", desc: "The server does not support the functionality required to fulfill the request." },
  { code: 502, name: "Bad Gateway", desc: "The server, acting as a gateway or proxy, received an invalid response from the upstream server." },
  { code: 503, name: "Service Unavailable", desc: "The server is not ready to handle the request, often due to maintenance or overload." },
  { code: 504, name: "Gateway Timeout", desc: "The server, acting as a gateway or proxy, did not receive a timely response from the upstream server." },
  { code: 505, name: "HTTP Version Not Supported", desc: "The HTTP version used in the request is not supported by the server." },
];

const listEl = document.getElementById('list');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const resultCount = document.getElementById('result-count');
let activeCat = 'all';

function categoryClass(code) {
  return 'c' + String(code)[0];
}

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = STATUS_CODES.filter(item => {
    const matchesCat = activeCat === 'all' || String(item.code)[0] === activeCat;
    const matchesQuery = !q ||
      String(item.code).includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  resultCount.textContent = filtered.length + ' of ' + STATUS_CODES.length;

  if (!filtered.length) {
    listEl.innerHTML = '<div class="empty">No status codes match your search.</div>';
    return;
  }

  listEl.innerHTML = filtered.map(item => {
    return '<div class="row" data-code="' + item.code + '" data-name="' + item.name + '">' +
      '<div class="code ' + categoryClass(item.code) + '">' + item.code + '</div>' +
      '<div class="info"><div class="name">' + item.name + '</div><div class="desc">' + item.desc + '</div></div>' +
      '<div class="copy-hint">Click to copy</div>' +
    '</div>';
  }).join('');
}

listEl.addEventListener('click', (e) => {
  const row = e.target.closest('.row');
  if (!row) return;
  const text = row.dataset.code + ' ' + row.dataset.name;
  const finish = () => {
    row.classList.add('copied');
    const hint = row.querySelector('.copy-hint');
    const original = hint.textContent;
    hint.textContent = 'Copied!';
    setTimeout(() => { row.classList.remove('copied'); hint.textContent = original; }, 1100);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(finish).catch(finish);
  } else {
    finish();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    render();
  });
});

searchInput.addEventListener('input', render);

render();`,

  seo: {
    title: 'HTTP Status Code Reference — Free HTML CSS JS Snippet',
    description: 'Searchable HTTP status code lookup table covering all 1xx-5xx codes with real RFC-accurate descriptions, category filters, and click-to-copy. Exports to React, Vue & Tailwind.',
    about: {
      title: 'HTTP Status Code Reference — Searchable 1xx-5xx Lookup Table with Click-to-Copy',
      description: `Every developer eventually forgets the exact difference between a 401 and a 403, or whether a 307 preserves the request method during a redirect while a 302 technically does not always guarantee it. This snippet is a self-contained, searchable reference table covering the full range of standard HTTP status codes from informational 1xx responses through server error 5xx responses, built entirely from a static JavaScript array with no network request and no external API — everything renders instantly and works offline.

**The data model**

The core of the tool is the \`STATUS_CODES\` array, where each entry is a plain object with \`code\`, \`name\`, and \`desc\` fields. Descriptions are written to be accurate and concise, summarizing the relevant RFC 9110 (and predecessor RFC 7231/2616) semantics in a sentence rather than reproducing the full specification text. Because it is just a JavaScript array, extending it with additional or custom status codes — a proprietary \`499 Client Closed Request\` used by some proxies, for instance — is a one-line addition.

**Live filtering by category and free text**

\`render()\` is the single function responsible for producing the visible list. It filters \`STATUS_CODES\` against two independent conditions: the active category filter (\`all\`, or one of \`1\` through \`5\` matching the first digit of the code) and a free-text query matched case-insensitively against the code number, the name, and the description. This means typing "redirect" surfaces every 3xx code even without knowing their numbers, while typing "404" or clicking the "4xx Client Error" filter narrows immediately. Both filters combine with logical AND, so a search term and a category filter can be applied simultaneously.

**Category color coding**

Each row's code number gets a CSS class derived from \`categoryClass()\`, which simply takes the first character of the status code and prefixes it with \`c\` (so 404 becomes \`.c4\`). This produces the familiar color convention seen in most HTTP tooling and browser dev tools — blue for informational, green for success, amber for redirection, red for client errors, and purple for server errors — giving an instant visual read of a code's category before even reading the number.

**Click-to-copy for pasting into code or documentation**

Clicking any row calls \`navigator.clipboard.writeText()\` with a formatted string like "404 Not Found", useful for pasting directly into a commit message, a code comment, or an API error response body. The button briefly shows a "Copied!" confirmation and a green border via the \`.copied\` class, then reverts after 1.1 seconds. A fallback path runs the same visual confirmation even if the Clipboard API is unavailable (for example in a restricted iframe), so the interaction never silently fails.

**Why this beats a static cheat sheet**

A printed or static HTML table of status codes requires scanning through potentially 40 rows to find the one you want. Combining a live text filter with category buttons turns that into a two-keystroke lookup: type part of what you remember (the number, a fragment of the name, or even a keyword from the description like "rate limit" for 429) and the matching rows are the only ones left. That single interaction — search-as-you-type against multiple fields at once — is the same pattern worth reusing for any reference table where users often remember only a fragment of what they are looking for.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Browse the full list', text: 'All standard HTTP status codes from 100 to 505 are listed by default, grouped visually by category color.' },
        { title: 'Search by code, name, or keyword', text: 'Type a number like 404, a name fragment like "redirect", or a concept like "rate limit" — the list filters live against all three fields.' },
        { title: 'Filter by category', text: 'Click 1xx, 2xx, 3xx, 4xx, or 5xx to narrow the list to just that class of response, combinable with the search box.' },
        { title: 'Click a row to copy it', text: 'Clicking any row copies "code name" (e.g. "429 Too Many Requests") to your clipboard for pasting into code or docs.' },
        { title: 'Add your own codes', text: 'In the JS panel, add an object with code, name, and desc to the STATUS_CODES array to include custom or proprietary codes.' },
        { title: 'Export in your format', text: 'Click HTML for a standalone file, JSX for a React component, or Tailwind for a React + Tailwind version.' },
      ],
    },
    features: [
      'Full 1xx-5xx status code coverage with concise, RFC-accurate descriptions',
      'Live multi-field search across code number, name, and description text',
      'Category filter buttons (1xx-5xx) combinable with the free-text search',
      'Color-coded status codes matching the convention used in browser dev tools',
      'Click-to-copy any row as "code name" via the Clipboard API with visual confirmation',
      'Graceful fallback when the Clipboard API is unavailable',
      'Result counter showing how many codes match the current filter',
      'Pure static JavaScript array — no network request, works fully offline',
      'Easily extendable with custom or proprietary status codes',
    ],
    useCases: [
      { icon: 'CODE', title: 'Debugging API integrations', desc: 'Quickly look up what a status code returned by a third-party API actually means without leaving your editor or opening a new browser tab to search.' },
      { icon: 'LEARN', title: 'Teaching HTTP fundamentals', desc: 'Use the category filters to walk through each class of response with students, showing concrete examples of when a server would use a 3xx redirect versus a 4xx client error.' },
      { icon: 'APP', title: 'Internal developer documentation', desc: 'Embed alongside an [API response inspector](/ui-snippets/api-response-inspector/) in an internal tools page so engineers have a fast reference while writing error handling code.' },
      { icon: 'FORM', title: 'Designing consistent API error responses', desc: 'Search by keyword to choose the most semantically correct status code for a new endpoint, e.g. searching "conflict" to confirm 409 is the right choice over a generic 400.' },
      { icon: 'DASH', title: 'Code review reference', desc: 'Quickly verify that a pull request is using the most appropriate status code for a given error condition instead of defaulting everything to 400 or 500.' },
      { icon: 'CODE', title: 'Related: Regex Tester', desc: 'See the [Regex Tester & Match Visualizer](/ui-snippets/regex-tester/) for a related developer utility worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Number Base Converter', desc: 'See the [Number Base Converter](/ui-snippets/number-base-converter/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: SHA Hash Generator', desc: 'See the [SHA Hash Generator](/ui-snippets/sha-hash-generator/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this fetch status code data from an API?', a: 'No. All status codes and their descriptions live in a static JavaScript array (STATUS_CODES) inside the snippet itself. There is no network request, so it works fully offline and loads instantly.' },
      { q: 'How does the search match multiple fields at once?', a: 'The render() function filters STATUS_CODES with a single condition that checks the lowercased query against String(item.code), item.name.toLowerCase(), and item.desc.toLowerCase(), so a match on any of the three fields includes that row.' },
      { q: 'Can I combine a category filter with a text search?', a: 'Yes. The category filter and the text search are two independent conditions combined with logical AND inside the same filter callback, so clicking "4xx Client Error" and then typing "auth" shows only client-error codes whose name or description mentions authentication or authorization.' },
      { q: 'What gets copied when I click a row?', a: 'Clicking a row copies a formatted string of the code and its name, such as "403 Forbidden", to your clipboard via navigator.clipboard.writeText(), useful for pasting directly into code comments or documentation.' },
      { q: 'Can I add custom or non-standard status codes?', a: 'Yes. Add a new object with code, name, and desc fields to the STATUS_CODES array in the JS panel. It automatically appears in the list, gets a category color based on its first digit, and becomes searchable.' },
      { q: 'Are the descriptions officially accurate?', a: 'The descriptions summarize the semantics defined by RFC 9110 and its predecessors (RFC 7231, RFC 2616) in plain language. For legally or contractually precise wording, always refer to the current RFC text directly.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to help extend the STATUS_CODES data set with less common but real-world codes you actually encounter, such as 226, 300, or vendor-specific extensions like Cloudflare's 520-527 range, complete with accurate descriptions. It is also a natural base for adding a "copy as JSON" button, grouping the list by category into collapsible sections instead of a flat list, or wiring the search box to also match against common aliases developers use informally, like "teapot" for 418.`,
      prompt: `Build a searchable HTTP status code reference tool in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A static JavaScript array of objects covering the standard 1xx through 5xx HTTP status codes, each with a numeric code, a short name, and a one-sentence RFC-accurate description.
- A text input that filters the visible list live on every keystroke, matching the query case-insensitively against the code number, the name, and the description text.
- A row of category filter buttons (All, 1xx, 2xx, 3xx, 4xx, 5xx) that narrow the list to codes whose first digit matches, combinable with the text search using logical AND.
- Color-code each status code by its first digit (e.g. blue for 1xx, green for 2xx, amber for 3xx, red for 4xx, purple for 5xx) to match common developer-tool conventions.
- Clicking any row copies a formatted "code name" string to the clipboard using the Clipboard API, with a brief visual "Copied!" confirmation, and a safe fallback if the Clipboard API is unavailable.
- Show a live count of how many codes currently match the applied filters.
- Do not make any network request — the entire code list must be a hardcoded JavaScript array.`,
    },
  },
};

export default httpStatusCodeReference;
