/* ── Express.js In-Browser Simulation Engine ─────────────────────────────────
   Simulates Express.js routing and middleware entirely in the browser.
   No real Node.js server or HTTP connections — all logic runs in-memory.
   ──────────────────────────────────────────────────────────────────────────── */

/* ── Utilities ────────────────────────────────────────────────────────────── */

function deepClone(val) {
  if (val === null || typeof val !== 'object') return val;
  if (Array.isArray(val)) return val.map(deepClone);
  const out = {};
  for (const k of Object.keys(val)) out[k] = deepClone(val[k]);
  return out;
}

function parseQueryString(qs) {
  const out = {};
  if (!qs) return out;
  const pairs = qs.split('&');
  for (const pair of pairs) {
    const eq = pair.indexOf('=');
    if (eq === -1) {
      out[decodeURIComponent(pair)] = '';
    } else {
      const k = decodeURIComponent(pair.slice(0, eq));
      const v = decodeURIComponent(pair.slice(eq + 1));
      out[k] = v;
    }
  }
  return out;
}

/* ── Route matching ───────────────────────────────────────────────────────── */

function matchRoute(routePath, requestPath) {
  // Exact match or wildcard
  if (routePath === '*' || routePath === '/*') {
    return { matched: true, params: {} };
  }

  // Build regex from route path (handles :param segments)
  const keys = [];
  const regexStr = routePath
    .replace(/\//g, '\\/')
    .replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, (_, key) => {
      keys.push(key);
      return '([^\\/]+)';
    });

  const regex = new RegExp('^' + regexStr + '(?:\\/)?$');
  const match = requestPath.match(regex);
  if (!match) return { matched: false, params: {} };

  const params = {};
  keys.forEach((key, i) => { params[key] = decodeURIComponent(match[i + 1]); });
  return { matched: true, params };
}

function matchPrefix(mountPath, requestPath) {
  // For app.use('/prefix', ...) — match if requestPath starts with mountPath
  if (!mountPath || mountPath === '/') return { matched: true, rest: requestPath };
  const norm = mountPath.replace(/\/$/, '');
  if (requestPath === norm || requestPath.startsWith(norm + '/')) {
    return { matched: true, rest: requestPath.slice(norm.length) || '/' };
  }
  return { matched: false, rest: requestPath };
}

/* ── HTTP status text ─────────────────────────────────────────────────────── */

const STATUS_TEXT = {
  100: 'Continue', 101: 'Switching Protocols',
  200: 'OK', 201: 'Created', 202: 'Accepted', 204: 'No Content',
  301: 'Moved Permanently', 302: 'Found', 304: 'Not Modified',
  400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden',
  404: 'Not Found', 405: 'Method Not Allowed', 409: 'Conflict',
  410: 'Gone', 422: 'Unprocessable Entity', 429: 'Too Many Requests',
  500: 'Internal Server Error', 501: 'Not Implemented', 503: 'Service Unavailable',
};

function statusText(code) {
  return STATUS_TEXT[code] || 'Unknown';
}

/* ── Build Express App ────────────────────────────────────────────────────── */

function buildExpressApp() {
  const _routes = [];      // { method, path, handlers }
  const _middlewares = []; // { path, handler } — path null = global

  function addRoute(method, path, handlers) {
    _routes.push({ method: method.toUpperCase(), path, handlers });
  }

  function addMiddleware(path, handlers) {
    for (const h of handlers) {
      _middlewares.push({ path, handler: h });
    }
  }

  /* ── Router factory ── */
  function createRouter(mountPath) {
    const routerRoutes = [];
    const routerMiddlewares = [];

    function routerMethod(method, path, ...handlers) {
      routerRoutes.push({ method: method.toUpperCase(), path, handlers, mountPath });
    }

    const router = {
      get:    (path, ...h) => routerMethod('GET',    path, ...h),
      post:   (path, ...h) => routerMethod('POST',   path, ...h),
      put:    (path, ...h) => routerMethod('PUT',    path, ...h),
      patch:  (path, ...h) => routerMethod('PATCH',  path, ...h),
      delete: (path, ...h) => routerMethod('DELETE', path, ...h),
      use:    (path, ...h) => {
        if (typeof path === 'function') {
          routerMiddlewares.push({ path: '/', handler: path });
          for (const fn of h) routerMiddlewares.push({ path: '/', handler: fn });
        } else {
          for (const fn of h) routerMiddlewares.push({ path, handler: fn });
        }
      },
      _routerRoutes: routerRoutes,
      _routerMiddlewares: routerMiddlewares,
    };

    return router;
  }

  const app = {
    _routes,
    _middlewares,

    get:    (path, ...handlers) => addRoute('GET',    path, handlers),
    post:   (path, ...handlers) => addRoute('POST',   path, handlers),
    put:    (path, ...handlers) => addRoute('PUT',    path, handlers),
    patch:  (path, ...handlers) => addRoute('PATCH',  path, handlers),
    delete: (path, ...handlers) => addRoute('DELETE', path, handlers),

    use: (pathOrHandler, ...rest) => {
      if (typeof pathOrHandler === 'function') {
        // global middleware
        addMiddleware(null, [pathOrHandler, ...rest]);
      } else if (typeof pathOrHandler === 'string') {
        const handlers = rest;
        // Check if any handler is a router
        const flatHandlers = [];
        for (const h of handlers) {
          if (h && h._routerRoutes) {
            // Mount router — pull routes/middlewares into app with prefix
            const prefix = pathOrHandler === '/' ? '' : pathOrHandler;
            for (const r of h._routerRoutes) {
              const fullPath = prefix + r.path;
              _routes.push({ method: r.method, path: fullPath, handlers: r.handlers });
            }
            for (const m of h._routerMiddlewares) {
              const fullPath = prefix + (m.path === '/' ? '' : m.path);
              _middlewares.push({ path: fullPath || '/', handler: m.handler });
            }
          } else if (typeof h === 'function') {
            flatHandlers.push(h);
          }
        }
        if (flatHandlers.length > 0) {
          addMiddleware(pathOrHandler, flatHandlers);
        }
      } else {
        // middleware object with no path (e.g. middleware factory result)
        addMiddleware(null, [pathOrHandler, ...rest].filter(x => typeof x === 'function'));
      }
    },

    Router: () => createRouter(null),

    listen: () => { /* no-op in browser simulation */ },

    _handle: (method, fullPath, body, requestHeaders) => {
      // Parse query string
      const qIdx = fullPath.indexOf('?');
      const pathname = qIdx === -1 ? fullPath : fullPath.slice(0, qIdx);
      const queryStr = qIdx === -1 ? '' : fullPath.slice(qIdx + 1);
      const query = parseQueryString(queryStr);

      const reqMethod = (method || 'GET').toUpperCase();

      // Build req
      const req = {
        method: reqMethod,
        path: pathname,
        url: fullPath,
        params: {},
        query,
        body: body || null,
        headers: Object.assign({
          'content-type': body ? 'application/json' : undefined,
          'user-agent': 'Express-Playground/1.0',
        }, requestHeaders || {}),
        ip: '127.0.0.1',
      };

      // Build res
      let _status = 200;
      let _body = null;
      let _ended = false;
      const _headers = { 'x-powered-by': 'Express' };

      const res = {
        locals: {},
        statusCode: 200,

        status(code) {
          _status = code;
          this.statusCode = code;
          return this;
        },

        set(key, val) {
          _headers[key.toLowerCase()] = val;
          return this;
        },

        header(key, val) {
          return this.set(key, val);
        },

        get(key) {
          return _headers[key.toLowerCase()];
        },

        json(data) {
          if (_ended) return;
          _headers['content-type'] = 'application/json';
          _body = data;
          _ended = true;
        },

        send(data) {
          if (_ended) return;
          if (data !== null && data !== undefined && typeof data === 'object') {
            _headers['content-type'] = 'application/json';
            _body = data;
          } else {
            _headers['content-type'] = 'text/html';
            _body = String(data === undefined ? '' : data);
          }
          _ended = true;
        },

        sendStatus(code) {
          _status = code;
          this.statusCode = code;
          _headers['content-type'] = 'text/plain';
          _body = statusText(code);
          _ended = true;
        },

        redirect(url) {
          _status = 302;
          _headers['location'] = url;
          _body = 'Redirecting to ' + url;
          _ended = true;
        },

        end(data) {
          if (_ended) return;
          _body = data || null;
          _ended = true;
        },

        type(t) {
          _headers['content-type'] = t;
          return this;
        },
      };

      // Find matching route
      let matchedRoute = null;
      let routeParams = {};
      for (const route of _routes) {
        if (route.method !== reqMethod) continue;
        const result = matchRoute(route.path, pathname);
        if (result.matched) {
          matchedRoute = route;
          routeParams = result.params;
          break;
        }
      }

      // Build middleware list
      const chain = [];

      // Global + path-prefix middlewares
      for (const mw of _middlewares) {
        if (mw.path === null || mw.path === undefined) {
          chain.push({ handler: mw.handler, params: {} });
        } else {
          const prefix = matchPrefix(mw.path, pathname);
          if (prefix.matched) {
            chain.push({ handler: mw.handler, params: {} });
          }
        }
      }

      // Route handlers
      if (matchedRoute) {
        req.params = routeParams;
        for (const h of matchedRoute.handlers) {
          chain.push({ handler: h, params: routeParams });
        }
      }

      // Execute chain
      let errorHandlers = [];
      let normalHandlers = [];
      for (const item of chain) {
        if (item.handler.length >= 4) errorHandlers.push(item);
        else normalHandlers.push(item);
      }

      const t0 = Date.now();
      let caught = null;

      const runChain = (handlers, idx, err) => {
        if (_ended) return;
        if (idx >= handlers.length) return;
        const item = handlers[idx];
        const next = (e) => {
          if (e) {
            caught = e;
            // Find error handlers
            const errIdx = chain.indexOf(item);
            for (let i = errIdx + 1; i < chain.length; i++) {
              if (chain[i].handler.length >= 4) {
                try {
                  chain[i].handler(e, req, res, (nextErr) => {
                    caught = nextErr || e;
                  });
                } catch (e2) {
                  caught = e2;
                }
                if (_ended) return;
              }
            }
            return;
          }
          runChain(handlers, idx + 1, null);
        };

        try {
          if (err && item.handler.length >= 4) {
            item.handler(err, req, res, next);
          } else if (!err && item.handler.length < 4) {
            item.handler(req, res, next);
          } else {
            runChain(handlers, idx + 1, err);
          }
        } catch (e) {
          caught = e;
          // Look for error middleware
          for (let i = idx + 1; i < chain.length; i++) {
            if (chain[i].handler.length >= 4) {
              try {
                chain[i].handler(e, req, res, () => {});
              } catch (e2) { caught = e2; }
              if (_ended) return;
              break;
            }
          }
        }
      };

      try {
        runChain(chain, 0, null);
      } catch (e) {
        caught = e;
      }

      const timing = Math.floor(Math.random() * 10) + 1;

      if (caught && !_ended) {
        return {
          status: 500,
          body: { error: caught.message || String(caught) },
          headers: { 'content-type': 'application/json' },
          timing,
        };
      }

      if (!_ended && !matchedRoute) {
        return {
          status: 404,
          body: { error: 'Cannot ' + reqMethod + ' ' + pathname },
          headers: { 'content-type': 'application/json' },
          timing,
        };
      }

      if (!_ended) {
        return {
          status: _status,
          body: null,
          headers: _headers,
          timing,
        };
      }

      return {
        status: _status,
        body: _body,
        headers: _headers,
        timing,
      };
    },
  };

  return app;
}

/* ── Built-in middleware factories ────────────────────────────────────────── */

export function jsonParser() {
  return function jsonParserMiddleware(req, res, next) {
    if (req.body && typeof req.body === 'string') {
      try { req.body = JSON.parse(req.body); } catch (_) {}
    }
    next();
  };
}

export function urlencoded() {
  return function urlencodedMiddleware(req, res, next) {
    if (req.body && typeof req.body === 'string') {
      req.body = parseQueryString(req.body);
    }
    next();
  };
}

export function cors() {
  return function corsMiddleware(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
  };
}

export function logger() {
  return function loggerMiddleware(req, res, next) {
    const ts = new Date().toISOString();
    if (typeof console !== 'undefined') {
      console.log('[' + ts + '] ' + req.method + ' ' + req.path);
    }
    next();
  };
}

export function authMiddleware(secret) {
  return function authCheck(req, res, next) {
    const auth = req.headers['authorization'] || req.headers['Authorization'] || '';
    const token = auth.replace(/^Bearer\s+/i, '');
    if (!token || (secret && token !== secret)) {
      res.status(401).json({ error: 'Unauthorized — provide a valid Bearer token' });
      return;
    }
    req.token = token;
    next();
  };
}

/* ── Sample DB ────────────────────────────────────────────────────────────── */

export const SAMPLE_DB = {
  users: [
    { id: 1, name: 'Alice Johnson',  email: 'alice@example.com',  role: 'admin',     age: 32 },
    { id: 2, name: 'Bob Martinez',   email: 'bob@example.com',    role: 'user',      age: 28 },
    { id: 3, name: 'Carol White',    email: 'carol@example.com',  role: 'user',      age: 35 },
    { id: 4, name: 'David Kim',      email: 'david@example.com',  role: 'moderator', age: 29 },
    { id: 5, name: 'Eva Patel',      email: 'eva@example.com',    role: 'user',      age: 24 },
  ],
  posts: [
    { id: 1, title: 'Getting Started with Express', userId: 1, published: true,  views: 1240, tags: ['express', 'node']       },
    { id: 2, title: 'REST API Best Practices',      userId: 1, published: true,  views: 890,  tags: ['api', 'rest']           },
    { id: 3, title: 'Middleware Explained',          userId: 2, published: false, views: 0,    tags: ['express', 'middleware'] },
    { id: 4, title: 'Authentication with JWT',       userId: 3, published: true,  views: 2100, tags: ['auth', 'jwt']          },
    { id: 5, title: 'Error Handling Patterns',       userId: 2, published: true,  views: 670,  tags: ['error', 'express']     },
  ],
  products: [
    { id: 1, name: 'Laptop Pro',                   price: 1299, category: 'electronics', stock: 15,  rating: 4.7 },
    { id: 2, name: 'Wireless Mouse',                price: 49,   category: 'electronics', stock: 200, rating: 4.3 },
    { id: 3, name: 'Standing Desk',                 price: 599,  category: 'furniture',   stock: 8,   rating: 4.6 },
    { id: 4, name: 'Coffee Maker',                  price: 89,   category: 'kitchen',     stock: 45,  rating: 4.1 },
    { id: 5, name: 'Noise Cancelling Headphones',   price: 299,  category: 'electronics', stock: 30,  rating: 4.8 },
  ],
};

/* ── createExpressApp ─────────────────────────────────────────────────────── */

export function createExpressApp() {
  const app = buildExpressApp();
  return { app, SAMPLE_DB: deepClone(SAMPLE_DB) };
}
