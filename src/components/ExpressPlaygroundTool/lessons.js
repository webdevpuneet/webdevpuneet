/* ── Express.js Playground — Lessons & Chapters ──────────────────────────────
   32 lessons across 10 chapters.
   All code strings are plain JS — no template literal interpolation.
   Every code starts with // TEST: METHOD /path for HTTP client auto-fill.
   ──────────────────────────────────────────────────────────────────────────── */

export const CHAPTERS = [
  'Getting Started',
  'HTTP Methods',
  'Route Parameters',
  'Middleware',
  'Request & Response',
  'REST API Design',
  'Error Handling',
  'Express Router',
  'Authentication',
  'Mini-Projects',
  'Validation, Security & Production',
];

export const LESSONS = [

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 1: Getting Started
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'hello-express',
    chapter: 'Getting Started',
    title: 'Hello World',
    concept: 'Express.js is a minimal, unopinionated web framework for Node.js. It provides a thin layer of routing and middleware on top of Node\'s built-in HTTP module.\n\nIn this playground, `createExpress()` gives you an `app` object — exactly like calling `express()` in a real project. You define **routes** that map HTTP methods and paths to handler functions.\n\nEach handler receives a `req` (request) object and a `res` (response) object. Call `res.json()` to send a JSON response. The playground simulates the full request/response cycle in your browser — no Node.js installation needed.',
    code: '// TEST: GET /hello\nconst app = createExpress();\n\napp.get(\'/hello\', function(req, res) {\n  res.json({ message: \'Hello, Express!\' });\n});',
    challenge: {
      question: 'What does createExpress() return in this playground?',
      options: ['A Node.js HTTP server', 'An app object with routing methods', 'A database connection', 'A middleware function'],
      correct: 1,
    },
  },

  {
    id: 'send-responses',
    chapter: 'Getting Started',
    title: 'Sending Responses',
    concept: 'Express gives you several ways to send a response. `res.json(obj)` sends JSON data and sets `Content-Type: application/json`. `res.send(data)` sends a string or HTML. `res.sendStatus(code)` sends the status code as text (e.g. `204 No Content`).\n\nAlways call exactly one response method per request. Once you call `res.json()` or `res.send()`, the response is ended — calling a second method has no effect.\n\nTry changing the path in the HTTP client panel to `/json` or `/status` to test each route.',
    code: '// TEST: GET /text\nconst app = createExpress();\n\napp.get(\'/text\', function(req, res) {\n  res.send(\'Plain text response\');\n});\n\napp.get(\'/json\', function(req, res) {\n  res.json({ status: \'ok\', value: 42 });\n});\n\napp.get(\'/status\', function(req, res) {\n  res.sendStatus(204);\n});',
    challenge: {
      question: 'What HTTP header does res.json() automatically set?',
      options: ['Accept: application/json', 'Content-Type: application/json', 'X-JSON: true', 'Transfer-Encoding: json'],
      correct: 1,
    },
  },

  {
    id: 'multiple-routes',
    chapter: 'Getting Started',
    title: 'Multiple Routes',
    concept: 'You can define as many routes as you need on an Express app. Each route maps a specific path to a handler function. Express checks routes **in the order they are defined** — the first matching route wins.\n\nThink of routes as URL patterns. `/` is the root, `/about` is a separate endpoint, and each can return different data. In a real API you might have dozens of routes — one per resource or action.\n\nTry clicking the HTTP client and changing the path to `/about` or `/contact` to see each route respond.',
    code: '// TEST: GET /\nconst app = createExpress();\n\napp.get(\'/\', function(req, res) {\n  res.json({ message: \'Home page\', routes: [\'/\', \'/about\', \'/contact\'] });\n});\n\napp.get(\'/about\', function(req, res) {\n  res.json({ page: \'About\', description: \'Learn about Express.js\' });\n});\n\napp.get(\'/contact\', function(req, res) {\n  res.json({ email: \'hello@example.com\', phone: \'+1-555-0100\' });\n});',
    challenge: {
      question: 'If two routes match the same path, which one handles the request?',
      options: ['The last one defined', 'The first one defined', 'Both — Express calls both handlers', 'Express throws an error'],
      correct: 1,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 2: HTTP Methods
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'get-post',
    chapter: 'HTTP Methods',
    title: 'GET and POST',
    concept: '**GET** requests retrieve data. They have no request body and are safe to repeat. **POST** requests create new resources and carry data in the request body.\n\nIn Express, `app.get()` and `app.post()` handle each method separately — even if they share the same path. This is the foundation of RESTful API design: the same URL `/users` means "list users" as a GET and "create a user" as a POST.\n\nThe `req.body` object contains the parsed request body. In this playground, send JSON in the Body field of the HTTP client to test POST routes.',
    code: '// TEST: GET /users\nconst app = createExpress();\nconst users = [\n  { id: 1, name: \'Alice\' },\n  { id: 2, name: \'Bob\' },\n];\n\napp.get(\'/users\', function(req, res) {\n  res.json(users);\n});\n\napp.post(\'/users\', function(req, res) {\n  const newUser = { id: users.length + 1, name: req.body.name };\n  users.push(newUser);\n  res.status(201).json(newUser);\n});',
    challenge: {
      question: 'What HTTP status code should you return when a resource is successfully created?',
      options: ['200 OK', '201 Created', '204 No Content', '301 Moved Permanently'],
      correct: 1,
    },
  },

  {
    id: 'put-delete',
    chapter: 'HTTP Methods',
    title: 'PUT and DELETE',
    concept: '**PUT** replaces an existing resource entirely. **DELETE** removes it. Together with GET and POST, these four methods form the complete **CRUD** cycle: Create (POST), Read (GET), Update (PUT), Delete (DELETE).\n\nA `PUT /users/1` request should fully replace user 1 with the data in the request body. A `DELETE /users/1` request should remove user 1.\n\nBoth PUT and DELETE typically include a resource identifier in the URL path — like `:id` — to target a specific record.',
    code: '// TEST: DELETE /items/1\nconst app = createExpress();\nlet items = [\n  { id: 1, name: \'Widget\' },\n  { id: 2, name: \'Gadget\' },\n];\n\napp.get(\'/items\', function(req, res) {\n  res.json(items);\n});\n\napp.put(\'/items/:id\', function(req, res) {\n  const id = parseInt(req.params.id);\n  const idx = items.findIndex(function(i) { return i.id === id; });\n  if (idx === -1) return res.status(404).json({ error: \'Not found\' });\n  items[idx] = { id: id, name: req.body.name };\n  res.json(items[idx]);\n});\n\napp.delete(\'/items/:id\', function(req, res) {\n  const id = parseInt(req.params.id);\n  items = items.filter(function(i) { return i.id !== id; });\n  res.json({ deleted: id, remaining: items.length });\n});',
    challenge: {
      question: 'What does a PUT request do to an existing resource?',
      options: ['Partially updates it', 'Replaces it entirely', 'Duplicates it', 'Archives it'],
      correct: 1,
    },
  },

  {
    id: 'all-methods',
    chapter: 'HTTP Methods',
    title: 'Full CRUD on /items',
    concept: 'Putting it all together: a complete **CRUD API** for a resource uses four routes — one per HTTP method — all on the same base path.\n\nThis pattern is the basis of every REST API. Each HTTP verb has a specific semantic meaning: GET reads, POST creates, PUT replaces, DELETE removes. Clients know what to expect based on the verb alone, making APIs predictable and self-documenting.\n\nTry all four HTTP methods in the client panel. Use GET to list, POST to add (provide a body like `{"name":"NewItem"}`), PUT to update, and DELETE to remove.',
    code: '// TEST: GET /items\nconst app = createExpress();\nlet items = [\n  { id: 1, name: \'Laptop\', price: 999 },\n  { id: 2, name: \'Mouse\',  price: 29  },\n];\nlet nextId = 3;\n\napp.get(\'/items\', function(req, res) {\n  res.json({ count: items.length, items: items });\n});\n\napp.post(\'/items\', function(req, res) {\n  const item = { id: nextId++, name: req.body.name, price: req.body.price || 0 };\n  items.push(item);\n  res.status(201).json(item);\n});\n\napp.put(\'/items/:id\', function(req, res) {\n  const id = parseInt(req.params.id);\n  const idx = items.findIndex(function(x) { return x.id === id; });\n  if (idx === -1) return res.status(404).json({ error: \'Not found\' });\n  items[idx] = { id: id, name: req.body.name, price: req.body.price };\n  res.json(items[idx]);\n});\n\napp.delete(\'/items/:id\', function(req, res) {\n  const id = parseInt(req.params.id);\n  const before = items.length;\n  items = items.filter(function(x) { return x.id !== id; });\n  res.json({ success: items.length < before });\n});',
    challenge: {
      question: 'Which HTTP method is used to create a new resource?',
      options: ['GET', 'PUT', 'POST', 'PATCH'],
      correct: 2,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 3: Route Parameters
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'route-params',
    chapter: 'Route Parameters',
    title: 'Route Parameters (:id)',
    concept: '**Route parameters** capture dynamic values from the URL path. Define them with a colon prefix — `:id`, `:userId`, `:slug`. Express extracts their values into `req.params`.\n\nFor example, if the route is `/users/:id` and the request is `GET /users/42`, then `req.params.id === "42"`. Note that params are always **strings** — use `parseInt()` or `Number()` to convert to numbers when comparing.\n\nThis pattern is used everywhere: `/products/:sku`, `/posts/:slug`, `/orders/:orderId`. Route params make URLs descriptive and allow a single route handler to serve many different resources.',
    code: '// TEST: GET /users/2\nconst app = createExpress();\nconst users = [\n  { id: 1, name: \'Alice\', role: \'admin\' },\n  { id: 2, name: \'Bob\',   role: \'user\'  },\n  { id: 3, name: \'Carol\', role: \'user\'  },\n];\n\napp.get(\'/users\', function(req, res) {\n  res.json(users);\n});\n\napp.get(\'/users/:id\', function(req, res) {\n  const id = parseInt(req.params.id);\n  const user = users.find(function(u) { return u.id === id; });\n  if (!user) return res.status(404).json({ error: \'User not found\' });\n  res.json(user);\n});',
    challenge: {
      question: 'For route /posts/:slug, what is req.params.slug when requesting /posts/hello-world?',
      options: ['"slug"', '"hello-world"', '{ slug: true }', 'undefined'],
      correct: 1,
    },
  },

  {
    id: 'query-strings',
    chapter: 'Route Parameters',
    title: 'Query Strings',
    concept: '**Query strings** are key-value pairs appended to a URL after a `?`. For example: `/search?q=express&limit=10`. Express parses them automatically into `req.query`.\n\nQuery strings are used for optional filtering, searching, and pagination — things that modify how the data is retrieved but not which resource you are acting on. They are always optional and their values are always strings.\n\nTry the path `/products?category=electronics` to filter by category, or `/products?minPrice=100` to filter by price.',
    code: '// TEST: GET /products?category=electronics\nconst app = createExpress();\nconst products = [\n  { id: 1, name: \'Laptop\',  price: 999, category: \'electronics\' },\n  { id: 2, name: \'Chair\',   price: 299, category: \'furniture\'   },\n  { id: 3, name: \'Monitor\', price: 449, category: \'electronics\' },\n];\n\napp.get(\'/products\', function(req, res) {\n  let result = products;\n  if (req.query.category) {\n    result = result.filter(function(p) { return p.category === req.query.category; });\n  }\n  if (req.query.minPrice) {\n    result = result.filter(function(p) { return p.price >= parseInt(req.query.minPrice); });\n  }\n  res.json({ count: result.length, products: result });\n});',
    challenge: {
      question: 'For URL /search?q=express&page=2, what is req.query.page?',
      options: [2, '"2"', '{ page: 2 }', 'undefined'],
      correct: 1,
    },
  },

  {
    id: 'combined-params',
    chapter: 'Route Parameters',
    title: 'Params + Query Strings',
    concept: 'Route parameters and query strings work together. Route params identify **which resource** — `req.params.userId` tells you which user. Query strings control **how** the data is returned — `req.query.fields` might select specific fields.\n\nA common pattern: `GET /users/:id/posts?published=true` — get user 3\'s published posts. The `:id` param identifies the user, the `published` query param filters the results.\n\nCombining both lets you build expressive, RESTful URL structures that clearly communicate intent.',
    code: '// TEST: GET /users/1/posts?published=true\nconst app = createExpress();\nconst users = [\n  { id: 1, name: \'Alice\' },\n  { id: 2, name: \'Bob\' },\n];\nconst posts = [\n  { id: 1, userId: 1, title: \'Hello World\',     published: true  },\n  { id: 2, userId: 1, title: \'Draft Post\',       published: false },\n  { id: 3, userId: 2, title: \'Bob\'s First Post\', published: true  },\n];\n\napp.get(\'/users/:id\', function(req, res) {\n  const user = users.find(function(u) { return u.id === parseInt(req.params.id); });\n  if (!user) return res.status(404).json({ error: \'User not found\' });\n  res.json(user);\n});\n\napp.get(\'/users/:id/posts\', function(req, res) {\n  const userId = parseInt(req.params.id);\n  let result = posts.filter(function(p) { return p.userId === userId; });\n  if (req.query.published !== undefined) {\n    const pub = req.query.published === \'true\';\n    result = result.filter(function(p) { return p.published === pub; });\n  }\n  res.json({ userId: userId, posts: result });\n});',
    challenge: {
      question: 'Where do Express route parameters like :id end up in the request object?',
      options: ['req.query', 'req.params', 'req.body', 'req.path'],
      correct: 1,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 4: Middleware
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'middleware-basics',
    chapter: 'Middleware',
    title: 'What is Middleware?',
    concept: '**Middleware** is a function that runs between the request arriving and the response being sent. It has access to `req`, `res`, and a `next` function. Calling `next()` passes control to the next middleware or route handler in the chain.\n\nMiddleware can: modify `req` or `res`, end the request by sending a response, or call `next()` to continue. If a middleware does not call `next()` and does not send a response, the request hangs.\n\n`app.use()` registers middleware. Without a path, it runs for every request. Middleware runs in the order it is defined.',
    code: '// TEST: GET /hello\nconst app = createExpress();\n\napp.use(function(req, res, next) {\n  req.requestTime = new Date().toISOString();\n  next();\n});\n\napp.get(\'/hello\', function(req, res) {\n  res.json({\n    message: \'Hello!\',\n    receivedAt: req.requestTime,\n  });\n});\n\napp.get(\'/time\', function(req, res) {\n  res.json({ time: req.requestTime });\n});',
    challenge: {
      question: 'What happens if a middleware function does NOT call next() and does NOT send a response?',
      options: ['Express skips it and moves on', 'The request hangs with no response', 'Express throws a timeout error', 'The next middleware runs automatically'],
      correct: 1,
    },
  },

  {
    id: 'custom-middleware',
    chapter: 'Middleware',
    title: 'Writing Custom Middleware',
    concept: 'Custom middleware functions let you add reusable logic to your app. A **logger middleware** records each request. A **timer middleware** measures how long processing takes.\n\nThe pattern for reusable middleware is a factory function that returns a middleware function. This lets you configure the middleware with options: `app.use(logger({ format: \'combined\' }))`.\n\nIn this playground the built-in `logger()` and `cors()` exports follow this factory pattern — call them to get the middleware function.',
    code: '// TEST: GET /api/data\nconst app = createExpress();\n\nfunction requestTimer() {\n  return function(req, res, next) {\n    req.startTime = Date.now();\n    next();\n  };\n}\n\nfunction addRequestId() {\n  return function(req, res, next) {\n    req.id = \'req-\' + Math.random().toString(36).slice(2, 8);\n    next();\n  };\n}\n\napp.use(requestTimer());\napp.use(addRequestId());\n\napp.get(\'/api/data\', function(req, res) {\n  res.json({\n    requestId: req.id,\n    elapsed: (Date.now() - req.startTime) + \'ms\',\n    data: { value: 42 },\n  });\n});',
    challenge: {
      question: 'What is the benefit of using a factory function (function that returns middleware)?',
      options: ['It makes middleware async', 'It allows middleware to be configured with options', 'It runs middleware in parallel', 'It prevents next() from being called'],
      correct: 1,
    },
  },

  {
    id: 'middleware-chain',
    chapter: 'Middleware',
    title: 'Chaining Middleware',
    concept: 'Multiple middleware functions run in sequence — each must call `next()` to pass control forward. You can chain middleware on a specific route by passing multiple handlers: `app.get(\'/path\', mw1, mw2, handler)`.\n\nThis is useful for **guard middleware** — checks that must pass before the main handler runs. For example: authenticate the user, then check their role, then process the request.\n\nMiddleware can also add properties to `req` or `res.locals` to share data downstream.',
    code: '// TEST: GET /protected\nconst app = createExpress();\n\nfunction checkApiKey(req, res, next) {\n  if (req.headers[\'x-api-key\'] === \'secret123\') {\n    req.authenticated = true;\n    return next();\n  }\n  res.status(403).json({ error: \'Invalid API key\' });\n}\n\nfunction logAccess(req, res, next) {\n  res.locals.accessLog = \'accessed at \' + new Date().toISOString();\n  next();\n}\n\napp.get(\'/public\', function(req, res) {\n  res.json({ message: \'Anyone can see this\' });\n});\n\napp.get(\'/protected\', checkApiKey, logAccess, function(req, res) {\n  res.json({\n    message: \'Secret data\',\n    log: res.locals.accessLog,\n  });\n});',
    challenge: {
      question: 'In app.get("/route", mw1, mw2, handler), when does mw2 run?',
      options: ['Before mw1', 'After mw1 calls next()', 'In parallel with mw1', 'Only if handler calls next()'],
      correct: 1,
    },
  },

  {
    id: 'body-parsing',
    chapter: 'Middleware',
    title: 'Body Parsing',
    concept: 'When a client sends a POST or PUT request, the data travels in the **request body**. Express does not parse it automatically — you need body-parsing middleware.\n\n`jsonParser()` parses the request body as JSON and puts the result in `req.body`. This is equivalent to `express.json()` in real Express.\n\nAlways register the body parser **before** the routes that need `req.body`. Without it, `req.body` is `null`.',
    code: '// TEST: POST /messages\nconst app = createExpress();\nconst messages = [];\n\napp.use(jsonParser());\n\napp.get(\'/messages\', function(req, res) {\n  res.json(messages);\n});\n\napp.post(\'/messages\', function(req, res) {\n  if (!req.body || !req.body.text) {\n    return res.status(400).json({ error: \'text field is required\' });\n  }\n  const msg = {\n    id: messages.length + 1,\n    text: req.body.text,\n    author: req.body.author || \'Anonymous\',\n  };\n  messages.push(msg);\n  res.status(201).json(msg);\n});',
    challenge: {
      question: 'What does req.body contain if you forget to add jsonParser() middleware?',
      options: ['An empty object {}', 'The raw string of the body', 'null or undefined', 'It throws a parse error'],
      correct: 2,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 5: Request & Response
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'req-object',
    chapter: 'Request & Response',
    title: 'The Request Object',
    concept: 'The `req` object contains everything about the incoming request. Key properties:\n\n`req.method` — the HTTP verb (GET, POST, etc.). `req.path` — the URL path without query string. `req.query` — parsed query parameters. `req.params` — route parameters. `req.body` — parsed request body (requires body-parsing middleware). `req.headers` — request headers as lowercase keys. `req.ip` — client IP address.\n\nInspecting `req` is essential for debugging — log it to understand exactly what data the client sent.',
    code: '// TEST: GET /inspect?debug=true\nconst app = createExpress();\n\napp.get(\'/inspect\', function(req, res) {\n  res.json({\n    method:  req.method,\n    path:    req.path,\n    query:   req.query,\n    headers: req.headers,\n    ip:      req.ip,\n  });\n});\n\napp.post(\'/echo\', function(req, res) {\n  res.json({\n    method: req.method,\n    body:   req.body,\n  });\n});',
    challenge: {
      question: 'What does req.headers contain?',
      options: ['Only custom headers you added', 'All HTTP request headers as lowercase keys', 'The response headers', 'Query parameters in header format'],
      correct: 1,
    },
  },

  {
    id: 'res-headers',
    chapter: 'Request & Response',
    title: 'Setting Response Headers',
    concept: 'Response headers provide metadata to the client. Common headers: `Content-Type` (what kind of data), `Cache-Control` (caching rules), `X-Request-Id` (tracing), `ETag` (versioning).\n\nUse `res.set(key, value)` or `res.header(key, value)` to set headers. Chain `res.set()` before calling `res.json()` or `res.send()`.\n\nCustom headers typically use the `X-` prefix by convention. Headers are key to building production APIs — rate limit info, versioning, tracing IDs, and CORS are all communicated via headers.',
    code: '// TEST: GET /api/users\nconst app = createExpress();\nconst users = [\n  { id: 1, name: \'Alice\' },\n  { id: 2, name: \'Bob\'   },\n];\n\napp.use(cors());\n\napp.get(\'/api/users\', function(req, res) {\n  res\n    .set(\'X-Total-Count\', String(users.length))\n    .set(\'X-Api-Version\', \'1.0\')\n    .set(\'Cache-Control\', \'no-cache\')\n    .json(users);\n});\n\napp.get(\'/api/health\', function(req, res) {\n  res\n    .set(\'X-Health-Check\', \'pass\')\n    .json({ status: \'healthy\', uptime: 99.9 });\n});',
    challenge: {
      question: 'Which method sets a response header in Express?',
      options: ['req.set()', 'res.header()', 'res.append()', 'Both res.set() and res.header()'],
      correct: 3,
    },
  },

  {
    id: 'status-codes',
    chapter: 'Request & Response',
    title: 'HTTP Status Codes',
    concept: 'HTTP status codes communicate the result of a request. Key codes:\n\n**2xx Success:** 200 OK, 201 Created, 204 No Content\n**3xx Redirect:** 301 Permanent, 302 Temporary\n**4xx Client Error:** 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict\n**5xx Server Error:** 500 Internal Server Error, 503 Service Unavailable\n\nUse `res.status(code).json(data)` to set both status and body. Correct status codes make APIs self-documenting — clients can handle errors without reading the body.',
    code: '// TEST: GET /resource/1\nconst app = createExpress();\nconst items = [{ id: 1, name: \'Widget\' }];\n\napp.get(\'/resource/:id\', function(req, res) {\n  const id = parseInt(req.params.id);\n  const item = items.find(function(x) { return x.id === id; });\n  if (!item) return res.status(404).json({ error: \'Not found\' });\n  res.status(200).json(item);\n});\n\napp.post(\'/resource\', function(req, res) {\n  if (!req.body || !req.body.name) {\n    return res.status(400).json({ error: \'name is required\' });\n  }\n  const item = { id: items.length + 1, name: req.body.name };\n  items.push(item);\n  res.status(201).json(item);\n});\n\napp.delete(\'/resource/:id\', function(req, res) {\n  res.status(204).end();\n});',
    challenge: {
      question: 'Which status code means "the request was valid but the resource was not found"?',
      options: ['400', '401', '404', '500'],
      correct: 2,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 6: REST API Design
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'rest-conventions',
    chapter: 'REST API Design',
    title: 'REST Naming Conventions',
    concept: 'REST (Representational State Transfer) is an architectural style for APIs. Key conventions:\n\n**Noun-based URLs:** `/users`, `/posts`, `/products` — not `/getUsers` or `/createPost`. **Plural resource names:** `/users` not `/user`. **Nested resources:** `/users/:id/posts` for a user\'s posts. **HTTP verbs communicate actions:** GET, POST, PUT, DELETE.\n\nGood REST naming makes APIs predictable. A developer can guess `POST /products` creates a product and `DELETE /products/5` removes product 5 without reading docs.',
    code: '// TEST: GET /api/v1/articles\nconst app = createExpress();\nconst articles = [\n  { id: 1, title: \'Express Basics\',    author: \'Alice\', published: true  },\n  { id: 2, title: \'REST API Design\',   author: \'Bob\',   published: true  },\n  { id: 3, title: \'Advanced Routing\',  author: \'Alice\', published: false },\n];\n\napp.get(\'/api/v1/articles\', function(req, res) {\n  res.json({\n    meta: { total: articles.length, version: \'v1\' },\n    data: articles,\n  });\n});\n\napp.get(\'/api/v1/articles/:id\', function(req, res) {\n  const article = articles.find(function(a) { return a.id === parseInt(req.params.id); });\n  if (!article) return res.status(404).json({ error: \'Article not found\' });\n  res.json({ data: article });\n});\n\napp.get(\'/api/v1/authors/:author/articles\', function(req, res) {\n  const result = articles.filter(function(a) { return a.author === req.params.author; });\n  res.json({ author: req.params.author, articles: result });\n});',
    challenge: {
      question: 'Which URL follows REST conventions for updating a specific user?',
      options: ['/updateUser/5', '/users/update?id=5', '/users/5 (with PUT)', '/user-update/5'],
      correct: 2,
    },
  },

  {
    id: 'crud-api',
    chapter: 'REST API Design',
    title: 'Full CRUD with SAMPLE_DB',
    concept: 'Building a full CRUD API with real-looking data. `SAMPLE_DB` provides pre-populated users, posts, and products you can read and mutate.\n\nThe pattern: list all, get one, create, update, delete — five routes per resource. Each route returns consistent JSON structure with clear status codes.\n\nThis lesson uses `SAMPLE_DB.users` directly — mutations persist within a single test run. Click Send multiple times to see the state change.',
    code: '// TEST: GET /users\nconst app = createExpress();\nconst users = SAMPLE_DB.users;\n\napp.get(\'/users\', function(req, res) {\n  res.json({ count: users.length, users: users });\n});\n\napp.get(\'/users/:id\', function(req, res) {\n  const user = users.find(function(u) { return u.id === parseInt(req.params.id); });\n  if (!user) return res.status(404).json({ error: \'User not found\' });\n  res.json(user);\n});\n\napp.post(\'/users\', function(req, res) {\n  const user = {\n    id: Math.max.apply(null, users.map(function(u) { return u.id; })) + 1,\n    name:  req.body.name  || \'New User\',\n    email: req.body.email || \'user@example.com\',\n    role:  \'user\',\n    age:   req.body.age   || 25,\n  };\n  users.push(user);\n  res.status(201).json(user);\n});\n\napp.delete(\'/users/:id\', function(req, res) {\n  const id = parseInt(req.params.id);\n  const idx = users.findIndex(function(u) { return u.id === id; });\n  if (idx === -1) return res.status(404).json({ error: \'Not found\' });\n  users.splice(idx, 1);\n  res.json({ deleted: id });\n});',
    challenge: {
      question: 'What does SAMPLE_DB contain in this playground?',
      options: ['A real database connection', 'Pre-loaded in-memory data for users, posts, and products', 'An empty object you populate yourself', 'Data fetched from an API'],
      correct: 1,
    },
  },

  {
    id: 'filtering',
    chapter: 'REST API Design',
    title: 'Query Param Filtering',
    concept: 'Query parameters are ideal for **filtering** a collection without changing the URL structure. `GET /users?role=admin` returns only admins. `GET /products?category=electronics&minPrice=100` chains multiple filters.\n\nThe pattern: start with the full collection, then apply each filter if the query param is present. This keeps filtering optional — omitting the param returns all records.\n\nFiltering via query params keeps your URL structure clean and your API cacheable.',
    code: '// TEST: GET /users?role=admin\nconst app = createExpress();\nconst users = SAMPLE_DB.users;\nconst products = SAMPLE_DB.products;\n\napp.get(\'/users\', function(req, res) {\n  let result = users.slice();\n  if (req.query.role) {\n    result = result.filter(function(u) { return u.role === req.query.role; });\n  }\n  if (req.query.minAge) {\n    result = result.filter(function(u) { return u.age >= parseInt(req.query.minAge); });\n  }\n  res.json({ count: result.length, users: result });\n});\n\napp.get(\'/products\', function(req, res) {\n  let result = products.slice();\n  if (req.query.category) {\n    result = result.filter(function(p) { return p.category === req.query.category; });\n  }\n  if (req.query.maxPrice) {\n    result = result.filter(function(p) { return p.price <= parseFloat(req.query.maxPrice); });\n  }\n  res.json({ count: result.length, products: result });\n});',
    challenge: {
      question: 'If no query params are provided, what should a filtering endpoint return?',
      options: ['An empty array', 'A 400 error', 'All records (unfiltered)', 'The first 10 records only'],
      correct: 2,
    },
  },

  {
    id: 'pagination',
    chapter: 'REST API Design',
    title: 'Pagination',
    concept: '**Pagination** splits large result sets into pages. The standard pattern uses `?page=1&limit=10`. Page 1 returns items 0-9, page 2 returns items 10-19, and so on.\n\nCalculate the slice: `const start = (page - 1) * limit`. Include metadata — total count, current page, total pages — so clients know how many pages exist.\n\nAlways set a **default limit** and a **maximum limit** to prevent clients from requesting millions of records. Common defaults: limit=10, max limit=100.',
    code: '// TEST: GET /users?page=1&limit=2\nconst app = createExpress();\nconst users = SAMPLE_DB.users;\nconst posts = SAMPLE_DB.posts;\n\napp.get(\'/users\', function(req, res) {\n  const page  = Math.max(1, parseInt(req.query.page)  || 1);\n  const limit = Math.min(100, parseInt(req.query.limit) || 10);\n  const total = users.length;\n  const pages = Math.ceil(total / limit);\n  const start = (page - 1) * limit;\n  const data  = users.slice(start, start + limit);\n  res.json({\n    meta:  { total: total, page: page, pages: pages, limit: limit },\n    users: data,\n  });\n});\n\napp.get(\'/posts\', function(req, res) {\n  const page  = Math.max(1, parseInt(req.query.page)  || 1);\n  const limit = Math.min(50, parseInt(req.query.limit) || 5);\n  const start = (page - 1) * limit;\n  res.json({\n    meta:  { total: posts.length, page: page },\n    posts: posts.slice(start, start + limit),\n  });\n});',
    challenge: {
      question: 'For page=2, limit=5, what is the starting index into the array?',
      options: ['5', '10', '2', '6'],
      correct: 0,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 7: Error Handling
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: '404-handler',
    chapter: 'Error Handling',
    title: 'Catch-All 404 Route',
    concept: 'If no route matches an incoming request, Express returns a generic 404 response. You can customise this by adding a **catch-all middleware** at the end of all routes.\n\nPlace it last — after all other `app.get/post/etc` definitions. Since no route above it matched, this middleware handles everything that fell through.\n\nA good 404 response includes the method and path that was not found so clients can debug quickly.',
    code: '// TEST: GET /nonexistent\nconst app = createExpress();\n\napp.get(\'/\', function(req, res) {\n  res.json({ message: \'Welcome to the API\' });\n});\n\napp.get(\'/about\', function(req, res) {\n  res.json({ name: \'My API\', version: \'1.0.0\' });\n});\n\napp.use(function(req, res) {\n  res.status(404).json({\n    error:   \'Not Found\',\n    message: \'Cannot \' + req.method + \' \' + req.path,\n    hint:    \'Check the docs at /about\',\n  });\n});',
    challenge: {
      question: 'Where should you define a catch-all 404 middleware?',
      options: ['At the very top, before all routes', 'After all other routes and middleware', 'In a separate file only', 'It is added automatically by Express'],
      correct: 1,
    },
  },

  {
    id: 'error-middleware',
    chapter: 'Error Handling',
    title: 'Error Middleware (4 arguments)',
    concept: 'Express error-handling middleware has **four arguments**: `(err, req, res, next)`. The presence of four parameters tells Express this is an error handler — register it after normal routes.\n\nWhen any middleware calls `next(err)` with an error, Express skips all normal middleware and calls the first error handler it finds.\n\nCentralised error handling keeps your route handlers clean — they throw or call next(err), and one place formats all error responses consistently.',
    code: '// TEST: GET /divide/10/0\nconst app = createExpress();\n\napp.get(\'/divide/:a/:b\', function(req, res, next) {\n  const a = parseFloat(req.params.a);\n  const b = parseFloat(req.params.b);\n  if (b === 0) {\n    const err = new Error(\'Division by zero\');\n    err.status = 400;\n    return next(err);\n  }\n  res.json({ result: a / b });\n});\n\napp.get(\'/items/:id\', function(req, res, next) {\n  const id = parseInt(req.params.id);\n  if (id < 0) return next(new Error(\'ID must be positive\'));\n  res.json({ id: id, name: \'Item \' + id });\n});\n\napp.use(function(err, req, res, next) {\n  const status = err.status || 500;\n  res.status(status).json({\n    error: err.message,\n    path:  req.path,\n  });\n});',
    challenge: {
      question: 'How does Express know a middleware function is an error handler?',
      options: ['You pass true as the first argument', 'You call it with app.error() instead of app.use()', 'It has exactly 4 parameters (err, req, res, next)', 'You add it before normal routes'],
      correct: 2,
    },
  },

  {
    id: 'try-catch',
    chapter: 'Error Handling',
    title: 'Try/Catch in Route Handlers',
    concept: 'When route handlers perform operations that might throw — JSON parsing, array access, arithmetic — wrap them in try/catch. Catch the error and call `next(err)` to forward it to the error middleware.\n\nWithout try/catch, an uncaught error in a route handler crashes the middleware chain silently (or in Node.js, crashes the process). Always catch and forward errors explicitly.\n\nA helper pattern: wrap every async handler in a `wrapAsync` function that catches promise rejections automatically.',
    code: '// TEST: GET /parse?json={"name":"Alice"}\nconst app = createExpress();\n\napp.get(\'/parse\', function(req, res, next) {\n  try {\n    const raw = req.query.json;\n    if (!raw) throw new Error(\'json query param is required\');\n    const data = JSON.parse(raw);\n    res.json({ parsed: data, keys: Object.keys(data) });\n  } catch (err) {\n    next(err);\n  }\n});\n\napp.get(\'/risky/:n\', function(req, res, next) {\n  try {\n    const n = parseInt(req.params.n);\n    if (isNaN(n)) throw new Error(\'n must be a number\');\n    const result = Array.from({ length: n }, function(_, i) { return i * i; });\n    res.json({ squares: result });\n  } catch (err) {\n    next(err);\n  }\n});\n\napp.use(function(err, req, res, next) {\n  res.status(400).json({ error: err.message });\n});',
    challenge: {
      question: 'In a route handler catch block, how do you forward the error to Express error middleware?',
      options: ['throw err again', 'res.error(err)', 'next(err)', 'return false'],
      correct: 2,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 8: Express Router
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'router-basics',
    chapter: 'Express Router',
    title: 'Router Basics',
    concept: '`app.Router()` creates a mini-Express application with its own routes and middleware. Routers help organise large apps by grouping related routes together.\n\nA router has the same `.get()`, `.post()`, `.put()`, `.delete()`, and `.use()` methods as an `app`. Define routes on the router, then mount it on a path.\n\nThis separation keeps your code modular — each resource (users, products, orders) lives in its own router.',
    code: '// TEST: GET /users\nconst app = createExpress();\nconst usersRouter = app.Router();\n\nconst users = SAMPLE_DB.users;\n\nusersRouter.get(\'/\', function(req, res) {\n  res.json(users);\n});\n\nusersRouter.get(\'/:id\', function(req, res) {\n  const user = users.find(function(u) { return u.id === parseInt(req.params.id); });\n  if (!user) return res.status(404).json({ error: \'Not found\' });\n  res.json(user);\n});\n\nusersRouter.post(\'/\', function(req, res) {\n  const u = { id: users.length + 1, name: req.body.name || \'New\', role: \'user\', age: 0, email: \'\' };\n  users.push(u);\n  res.status(201).json(u);\n});\n\napp.use(\'/users\', usersRouter);',
    challenge: {
      question: 'What does app.Router() return?',
      options: ['A string path prefix', 'A mini Express application for grouping routes', 'A new HTTP server instance', 'An array of existing routes'],
      correct: 1,
    },
  },

  {
    id: 'router-mount',
    chapter: 'Express Router',
    title: 'Mounting Routers on Prefixes',
    concept: 'When you mount a router with `app.use(\'/api\', router)`, all routes defined on that router are automatically prefixed with `/api`.\n\nA router route `GET /users` becomes `GET /api/users`. A router route `GET /:id` becomes `GET /api/:id`. The router itself does not know about the prefix — it just defines relative paths.\n\nThis makes versioning easy: mount the same router at `/api/v1` and `/api/v2` with different behaviour, or swap the entire router for a new version.',
    code: '// TEST: GET /api/products\nconst app = createExpress();\nconst productsRouter = app.Router();\nconst products = SAMPLE_DB.products;\n\nproductsRouter.get(\'/\', function(req, res) {\n  let result = products;\n  if (req.query.category) {\n    result = products.filter(function(p) { return p.category === req.query.category; });\n  }\n  res.json({ count: result.length, products: result });\n});\n\nproductsRouter.get(\'/:id\', function(req, res) {\n  const p = products.find(function(x) { return x.id === parseInt(req.params.id); });\n  if (!p) return res.status(404).json({ error: \'Product not found\' });\n  res.json(p);\n});\n\napp.get(\'/\', function(req, res) {\n  res.json({ message: \'API root\', endpoints: [\'/api/products\'] });\n});\n\napp.use(\'/api/products\', productsRouter);',
    challenge: {
      question: 'If a router has GET / defined and is mounted at /api, what URL handles that route?',
      options: ['/api/', '/api/GET', '/ only', '/api (or /api/)'],
      correct: 3,
    },
  },

  {
    id: 'router-groups',
    chapter: 'Express Router',
    title: 'Multiple Routers',
    concept: 'Real Express apps use **multiple routers** — one per resource group. A `usersRouter` handles all `/users/*` routes. A `postsRouter` handles all `/posts/*` routes. Each is mounted on its prefix.\n\nThis keeps files small and focused. In a real project each router lives in its own file: `routes/users.js`, `routes/posts.js`. The main `app.js` just imports and mounts them.\n\nThis pattern scales from 5 routes to 500 routes while staying maintainable.',
    code: '// TEST: GET /users\nconst app = createExpress();\nconst usersRouter   = app.Router();\nconst postsRouter   = app.Router();\n\nconst users = SAMPLE_DB.users;\nconst posts = SAMPLE_DB.posts;\n\nusersRouter.get(\'/\', function(req, res) {\n  res.json({ resource: \'users\', count: users.length, data: users });\n});\nusersRouter.get(\'/:id\', function(req, res) {\n  const u = users.find(function(x) { return x.id === parseInt(req.params.id); });\n  res.json(u || { error: \'Not found\' });\n});\n\npostsRouter.get(\'/\', function(req, res) {\n  res.json({ resource: \'posts\', count: posts.length, data: posts });\n});\npostsRouter.get(\'/:id\', function(req, res) {\n  const p = posts.find(function(x) { return x.id === parseInt(req.params.id); });\n  res.json(p || { error: \'Not found\' });\n});\n\napp.use(\'/users\', usersRouter);\napp.use(\'/posts\', postsRouter);\n\napp.get(\'/\', function(req, res) {\n  res.json({ api: \'v1\', resources: [\'/users\', \'/posts\'] });\n});',
    challenge: {
      question: 'Why use multiple routers instead of defining all routes directly on app?',
      options: ['Routers are faster at matching routes', 'Routers keep related routes grouped and the codebase modular', 'Routers automatically add authentication', 'Express requires routers for POST routes'],
      correct: 1,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 9: Authentication
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'auth-middleware',
    chapter: 'Authentication',
    title: 'Token Check Middleware',
    concept: 'Token-based authentication is the standard for APIs. The client sends a token in the `Authorization` header: `Authorization: Bearer my-token`. The server validates the token on each request.\n\nThe built-in `authMiddleware(secret)` checks the Bearer token against a secret. You can also write your own check — the pattern is the same: validate the token, attach user info to `req`, call `next()` to continue or `res.status(401).json(...)` to reject.\n\nIn the HTTP client panel add header `Authorization: Bearer secret123` to test authenticated routes.',
    code: '// TEST: GET /profile\nconst app = createExpress();\n\nfunction requireToken(req, res, next) {\n  const auth = req.headers[\'authorization\'] || \'\';\n  const token = auth.replace(/^Bearer\\s+/i, \'\');\n  if (token !== \'mytoken123\') {\n    return res.status(401).json({ error: \'Invalid or missing token\' });\n  }\n  req.userId = 42;\n  next();\n}\n\napp.get(\'/public\', function(req, res) {\n  res.json({ message: \'Anyone can see this\' });\n});\n\napp.get(\'/profile\', requireToken, function(req, res) {\n  res.json({ userId: req.userId, message: \'Your private profile\' });\n});\n\napp.get(\'/dashboard\', requireToken, function(req, res) {\n  res.json({ userId: req.userId, stats: { logins: 42 } });\n});',
    challenge: {
      question: 'In the Authorization header format "Bearer abc123", what is the token?',
      options: ['Bearer', 'Bearer abc123', 'abc123', 'Authorization'],
      correct: 2,
    },
  },

  {
    id: 'protected-routes',
    chapter: 'Authentication',
    title: 'Public vs Protected Routes',
    concept: 'Most APIs have a mix of **public routes** (no auth needed) and **protected routes** (auth required). Login, registration, and docs are typically public. User data, admin actions, and mutations are protected.\n\nApply auth middleware selectively — only to the routes that need it. Do not use `app.use(auth)` for every route if some are public. Instead, apply auth per-route or group protected routes on a router and apply auth to that router.\n\nAlways put public routes before your auth middleware so they are not accidentally protected.',
    code: '// TEST: GET /api/me\nconst app = createExpress();\nconst users = SAMPLE_DB.users;\n\nfunction fakeAuth(req, res, next) {\n  const token = (req.headers[\'authorization\'] || \'\').replace(/^Bearer\\s*/i, \'\');\n  const user = users.find(function(u) { return u.id === parseInt(token); });\n  if (!user) return res.status(401).json({ error: \'Unauthorized\' });\n  req.user = user;\n  next();\n}\n\napp.get(\'/\', function(req, res) {\n  res.json({ message: \'Public home page\' });\n});\n\napp.get(\'/api/docs\', function(req, res) {\n  res.json({ endpoints: [\'/api/me\', \'/api/users\'] });\n});\n\napp.get(\'/api/me\', fakeAuth, function(req, res) {\n  res.json({ user: req.user });\n});\n\napp.get(\'/api/users\', fakeAuth, function(req, res) {\n  res.json(users);\n});',
    challenge: {
      question: 'What HTTP status code should you return when a user is not authenticated?',
      options: ['400', '403', '401', '404'],
      correct: 2,
    },
  },

  {
    id: 'role-check',
    chapter: 'Authentication',
    title: 'Role-Based Access Control',
    concept: '**Role-based access control (RBAC)** restricts routes to users with specific roles. An admin can access everything. A user can only access their own data. A moderator has partial access.\n\nImplement RBAC with middleware that checks `req.user.role` after authentication. Use the **authorize** pattern: authenticate first (who are you?), then authorize (are you allowed?).\n\nReturn **403 Forbidden** when the user is authenticated but lacks permission. 403 is different from 401 (not authenticated at all).',
    code: '// TEST: GET /admin/users\nconst app = createExpress();\nconst users = SAMPLE_DB.users;\n\nfunction fakeAuth(req, res, next) {\n  const id = parseInt((req.headers[\'authorization\'] || \'\').replace(/^Bearer\\s*/i, \'\'));\n  const user = users.find(function(u) { return u.id === id; });\n  if (!user) return res.status(401).json({ error: \'Unauthorized\' });\n  req.user = user;\n  next();\n}\n\nfunction requireRole(role) {\n  return function(req, res, next) {\n    if (req.user.role !== role) {\n      return res.status(403).json({ error: \'Forbidden — requires role: \' + role });\n    }\n    next();\n  };\n}\n\napp.get(\'/me\', fakeAuth, function(req, res) {\n  res.json({ user: req.user });\n});\n\napp.get(\'/admin/users\', fakeAuth, requireRole(\'admin\'), function(req, res) {\n  res.json({ message: \'Admin view\', users: users });\n});\n\napp.get(\'/admin/stats\', fakeAuth, requireRole(\'admin\'), function(req, res) {\n  res.json({ totalUsers: users.length, roles: [\'admin\', \'user\', \'moderator\'] });\n});',
    challenge: {
      question: 'What is the difference between 401 and 403 status codes?',
      options: ['401 is server error, 403 is client error', '401 means not authenticated, 403 means authenticated but not permitted', '403 is worse than 401', 'They mean the same thing'],
      correct: 1,
    },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     Chapter 10: Mini-Projects
  ────────────────────────────────────────────────────────────────────────── */
  {
    id: 'mini-todo-api',
    chapter: 'Mini-Projects',
    title: 'Todo REST API',
    concept: 'A complete Todo API demonstrates all the concepts together: routing, middleware, CRUD, status codes, and validation in a single coherent application.\n\nThis API handles the full lifecycle of todo items: list them all, create one, update it (mark complete/incomplete), and delete it. Each operation uses the correct HTTP method and status code.\n\nTry all four methods in the HTTP client — GET to list, POST with a body like `{"title":"Learn Express"}` to create, PUT to toggle complete, DELETE to remove.',
    code: '// TEST: GET /todos\nconst app = createExpress();\napp.use(jsonParser());\n\nlet todos = [\n  { id: 1, title: \'Buy groceries\',     completed: false },\n  { id: 2, title: \'Read Express docs\', completed: true  },\n];\nlet nextId = 3;\n\napp.get(\'/todos\', function(req, res) {\n  if (req.query.completed !== undefined) {\n    const done = req.query.completed === \'true\';\n    return res.json(todos.filter(function(t) { return t.completed === done; }));\n  }\n  res.json({ count: todos.length, todos: todos });\n});\n\napp.post(\'/todos\', function(req, res) {\n  if (!req.body || !req.body.title) {\n    return res.status(400).json({ error: \'title is required\' });\n  }\n  const todo = { id: nextId++, title: req.body.title, completed: false };\n  todos.push(todo);\n  res.status(201).json(todo);\n});\n\napp.put(\'/todos/:id\', function(req, res) {\n  const todo = todos.find(function(t) { return t.id === parseInt(req.params.id); });\n  if (!todo) return res.status(404).json({ error: \'Todo not found\' });\n  todo.completed = !todo.completed;\n  res.json(todo);\n});\n\napp.delete(\'/todos/:id\', function(req, res) {\n  const id = parseInt(req.params.id);\n  todos = todos.filter(function(t) { return t.id !== id; });\n  res.status(204).end();\n});',
    challenge: {
      question: 'What status code should DELETE /todos/:id return after successfully deleting?',
      options: ['200 OK', '201 Created', '204 No Content', '202 Accepted'],
      correct: 2,
    },
  },

  {
    id: 'mini-users-api',
    chapter: 'Mini-Projects',
    title: 'Users API with Auth',
    concept: 'The final mini-project combines all major concepts: CRUD routes, filtering, pagination, authentication, and role-based access control.\n\nPublic endpoints let anyone list and search users. Protected endpoints require authentication. Admin endpoints require the admin role.\n\nThis is the pattern used in real production APIs — public reads, authenticated writes, privileged admin operations. Use `Authorization: Bearer 1` to auth as user 1 (Alice, admin).',
    code: '// TEST: GET /users\nconst app = createExpress();\napp.use(jsonParser());\n\nconst users = SAMPLE_DB.users;\n\nfunction auth(req, res, next) {\n  const id = parseInt((req.headers[\'authorization\'] || \'\').replace(/^Bearer\\s*/i, \'\'));\n  const user = users.find(function(u) { return u.id === id; });\n  if (!user) return res.status(401).json({ error: \'Unauthorized\' });\n  req.user = user;\n  next();\n}\n\napp.get(\'/users\', function(req, res) {\n  let result = users.slice();\n  if (req.query.role) result = result.filter(function(u) { return u.role === req.query.role; });\n  const page  = parseInt(req.query.page)  || 1;\n  const limit = parseInt(req.query.limit) || 10;\n  const start = (page - 1) * limit;\n  res.json({\n    meta:  { total: result.length, page: page },\n    users: result.slice(start, start + limit),\n  });\n});\n\napp.get(\'/users/:id\', function(req, res) {\n  const u = users.find(function(x) { return x.id === parseInt(req.params.id); });\n  if (!u) return res.status(404).json({ error: \'Not found\' });\n  res.json(u);\n});\n\napp.get(\'/me\', auth, function(req, res) {\n  res.json({ profile: req.user });\n});\n\napp.get(\'/admin\', auth, function(req, res) {\n  if (req.user.role !== \'admin\') return res.status(403).json({ error: \'Admins only\' });\n  res.json({ message: \'Admin dashboard\', total: users.length, users: users });\n});',
    challenge: {
      question: 'In this mini-project, what does "Bearer 1" in the Authorization header represent?',
      options: ['The token string "1"', 'User with id=1 (Alice, admin)', 'Version 1 of the API', 'The first bearer in the list'],
      correct: 1,
    },
  },

  {
    id: 'mini-blog-api',
    chapter: 'Mini-Projects',
    title: 'Blog Posts API',
    concept: 'A blog API combining routers, filtering, pagination, and CRUD — all working together as a cohesive application. Posts can be listed, filtered by author or published status, retrieved by ID, created, and deleted.\n\nThis demonstrates how Express Router organises a medium-complexity API cleanly. The posts router handles all `/posts/*` routes. Public read endpoints need no auth. Write operations could be protected in a production app.\n\nTry GET /posts?published=true, GET /posts/1, and POST /posts with body `{"title":"My Post","userId":1}`.',
    code: '// TEST: GET /posts\nconst app = createExpress();\napp.use(jsonParser());\n\nconst postsRouter = app.Router();\nconst posts = SAMPLE_DB.posts;\nlet nextPostId = posts.length + 1;\n\npostsRouter.get(\'/\', function(req, res) {\n  let result = posts.slice();\n  if (req.query.published !== undefined) {\n    const pub = req.query.published === \'true\';\n    result = result.filter(function(p) { return p.published === pub; });\n  }\n  if (req.query.userId) {\n    result = result.filter(function(p) { return p.userId === parseInt(req.query.userId); });\n  }\n  const page  = parseInt(req.query.page)  || 1;\n  const limit = parseInt(req.query.limit) || 10;\n  const start = (page - 1) * limit;\n  res.json({\n    meta:  { total: result.length, page: page },\n    posts: result.slice(start, start + limit),\n  });\n});\n\npostsRouter.get(\'/:id\', function(req, res) {\n  const post = posts.find(function(p) { return p.id === parseInt(req.params.id); });\n  if (!post) return res.status(404).json({ error: \'Post not found\' });\n  res.json(post);\n});\n\npostsRouter.post(\'/\', function(req, res) {\n  if (!req.body.title) return res.status(400).json({ error: \'title required\' });\n  const post = { id: nextPostId++, title: req.body.title, userId: req.body.userId || 1, published: false, views: 0, tags: [] };\n  posts.push(post);\n  res.status(201).json(post);\n});\n\npostsRouter.delete(\'/:id\', function(req, res) {\n  const id = parseInt(req.params.id);\n  const idx = posts.findIndex(function(p) { return p.id === id; });\n  if (idx === -1) return res.status(404).json({ error: \'Not found\' });\n  posts.splice(idx, 1);\n  res.json({ deleted: id });\n});\n\napp.use(\'/posts\', postsRouter);\napp.get(\'/\', function(req, res) { res.json({ api: \'Blog API\', routes: [\'/posts\'] }); });',
    challenge: {
      question: 'What query would you use to list only published posts by user 1?',
      options: ['/posts/1', '/posts?published=true&userId=1', '/posts?user=1&status=published', '/posts/published/1'],
      correct: 1,
    },
  },

  /* ── Validation, Security & Production ── */
  {
    id: 'input-validation',
    chapter: 'Validation, Security & Production',
    title: 'Validate request input',
    concept: 'Never trust the client. Before using `req.body`, check that required fields are present and well-formed, and respond with **400 Bad Request** plus a clear list of errors when they are not.\n\nThis route validates a signup payload. Run it as-is (no body) to see it reject the request, then send a valid JSON body like `{"name":"Ada","email":"ada@x.com","password":"longpass1"}` to see it succeed. In real apps a library like `zod`, `joi`, or `express-validator` handles this declaratively.',
    code: `// TEST: POST /signup
const app = createExpress();
app.use(jsonParser());

app.post('/signup', function(req, res) {
  const body = req.body || {};
  const errors = [];
  if (!body.name) errors.push('name is required');
  if (!body.email || !body.email.includes('@')) errors.push('a valid email is required');
  if (!body.password || body.password.length < 8) errors.push('password must be at least 8 characters');

  if (errors.length) {
    return res.status(400).json({ errors });
  }
  res.status(201).json({ created: body.email });
});`,
    challenge: {
      question: 'What status code signals invalid client input?',
      options: ['400 Bad Request', '200 OK', '500 Internal Server Error', '301 Moved Permanently'],
      correct: 0,
    },
  },
  {
    id: 'api-key-auth',
    chapter: 'Validation, Security & Production',
    title: 'Protect routes with an API key',
    concept: 'A simple way to secure an API is to require a secret key in a request header. A middleware checks `req.headers` and rejects anything without a valid key with **401 Unauthorized**, before the route ever runs.\n\nRun it as-is (no key) to see the 401. In the HTTP client, add a header `x-api-key: secret123` to get through. In production the key lives in an environment variable, never in code, and you always serve over HTTPS.',
    code: `// TEST: GET /private
const app = createExpress();

// Gatekeeper middleware runs before the protected routes
app.use(function(req, res, next) {
  const key = req.headers['x-api-key'];
  if (key !== 'secret123') {
    return res.status(401).json({ error: 'Invalid or missing API key' });
  }
  next();
});

app.get('/private', function(req, res) {
  res.json({ data: 'top secret report' });
});`,
    challenge: {
      question: 'What status code means the request is not authenticated?',
      options: ['401 Unauthorized', '403 Forbidden', '404 Not Found', '200 OK'],
      correct: 0,
    },
  },
  {
    id: 'security-headers',
    chapter: 'Validation, Security & Production',
    title: 'Set security headers',
    concept: 'Browsers respect security headers that defend against common attacks. A middleware can set them on every response: `X-Content-Type-Options: nosniff` stops MIME sniffing, `X-Frame-Options: DENY` blocks clickjacking, and `Strict-Transport-Security` forces HTTPS.\n\nIn real projects the **helmet** package sets a sensible set of these for you with one line: `app.use(helmet())`. Run this and inspect the response headers.',
    code: `// TEST: GET /
const app = createExpress();

// Helmet-style security headers on every response
app.use(function(req, res, next) {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('Strict-Transport-Security', 'max-age=31536000');
  next();
});

app.get('/', function(req, res) {
  res.json({ ok: true, note: 'Open the Headers tab to see the security headers' });
});`,
    challenge: {
      question: 'Which package sets a bundle of security headers for Express?',
      options: ['helmet', 'morgan', 'nodemon', 'dotenv'],
      correct: 0,
    },
  },
  {
    id: 'rate-limiting',
    chapter: 'Validation, Security & Production',
    title: 'Rate limit requests',
    concept: 'Rate limiting protects an API from abuse and runaway clients by capping how many requests an IP can make in a window. A middleware counts requests and returns **429 Too Many Requests** once the limit is exceeded.\n\nThis models the idea with an in-memory counter; production uses `express-rate-limit` backed by Redis so the limit is shared across servers. Each run increments the count for this demo.',
    code: `// TEST: GET /api
const app = createExpress();

const hits = {};
const LIMIT = 5;

app.use(function(req, res, next) {
  const ip = req.ip || 'local';
  hits[ip] = (hits[ip] || 0) + 1;
  res.set('X-RateLimit-Limit', String(LIMIT));
  res.set('X-RateLimit-Remaining', String(Math.max(0, LIMIT - hits[ip])));
  if (hits[ip] > LIMIT) {
    return res.status(429).json({ error: 'Too many requests, slow down' });
  }
  next();
});

app.get('/api', function(req, res) {
  res.json({ ok: true, requestNumber: hits[req.ip || 'local'] });
});`,
    challenge: {
      question: 'What status code does a rate limiter return when the cap is exceeded?',
      options: ['429 Too Many Requests', '401 Unauthorized', '503 Service Unavailable', '402 Payment Required'],
      correct: 0,
    },
  },
  {
    id: 'central-error-handling',
    chapter: 'Validation, Security & Production',
    title: 'Centralized error handling',
    concept: 'Instead of formatting errors in every route, hand them to a single **error-handling middleware** — the special one with four arguments `(err, req, res, next)`, defined last. Routes call `next(err)` and the handler turns it into a clean JSON response with the right status.\n\nRun it against a missing user to see a 404 produced centrally. For async routes, wrap handlers so rejected promises also reach `next(err)` (the `express-async-errors` package automates this).',
    code: `// TEST: GET /user/999
const app = createExpress();
const users = SAMPLE_DB.users;

app.get('/user/:id', function(req, res, next) {
  const user = users.find(function(u) { return u.id === parseInt(req.params.id); });
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    return next(err);          // hand off to the error handler
  }
  res.json(user);
});

// Error-handling middleware — four args, defined LAST
app.use(function(err, req, res, next) {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message });
});`,
    challenge: {
      question: 'How does Express recognise an error-handling middleware?',
      options: ['It has four arguments (err, req, res, next)', 'It is named handleError', 'It returns a Promise', 'It is registered with app.error()'],
      correct: 0,
    },
  },
  {
    id: 'testing-deploy',
    chapter: 'Validation, Security & Production',
    title: 'Testing & going to production',
    concept: 'You test an Express API by sending it fake requests and asserting on the responses — no real server needed. The standard tools are **Jest** (the test runner) and **Supertest** (HTTP assertions): call `request(app).get("/health")`, then assert `res.status` is 200 and `res.body.status` is "ok".\n\nFor production: read config (the port, secrets) from `process.env`, add `helmet` and `compression`, run behind a reverse proxy (nginx) with a process manager (PM2), and expose a **health check** endpoint that load balancers ping. The route below is exactly that endpoint.',
    code: `// TEST: GET /health
const app = createExpress();

// Health check — load balancers and uptime monitors hit this
app.get('/health', function(req, res) {
  res.json({ status: 'ok', service: 'My API', version: '1.0.0' });
});

app.get('/', function(req, res) {
  res.json({ message: 'Production-ready API. See /health.' });
});`,
    challenge: {
      question: 'Which tools are standard for testing an Express API?',
      options: ['Jest + Supertest', 'Webpack + Babel', 'ESLint + Prettier', 'Docker + Kubernetes'],
      correct: 0,
    },
  },
];
