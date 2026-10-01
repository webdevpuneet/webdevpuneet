'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';

/* ── Constants ────────────────────────────────────────────────────────────── */
const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const METHOD_COLOR = {
  GET:    '#16a34a',
  POST:   '#2563eb',
  PUT:    '#d97706',
  PATCH:  '#7c3aed',
  DELETE: '#dc2626',
};

const STATUS_CHIPS = [200, 201, 400, 401, 404, 422, 500];

const STATUS_TEXT = {
  200: 'OK', 201: 'Created', 204: 'No Content',
  400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden',
  404: 'Not Found', 409: 'Conflict', 422: 'Unprocessable Entity',
  500: 'Internal Server Error',
};

/* ── ID generator ─────────────────────────────────────────────────────────── */
function newId() {
  return 'r' + Date.now() + Math.random().toString(36).slice(2, 7);
}

/* ── Default CRUD routes ──────────────────────────────────────────────────── */
const DEFAULT_ROUTES = [
  {
    id: 'r1', method: 'GET', path: '/users',
    description: 'Get all users',
    statusCode: 200,
    responseBody: '[\n  {"id":1,"name":"Alice Johnson","email":"alice@example.com","role":"admin"},\n  {"id":2,"name":"Bob Martinez","email":"bob@example.com","role":"user"}\n]',
    responseHeaders: '{"Content-Type":"application/json"}',
    authRequired: false, delay: 0,
  },
  {
    id: 'r2', method: 'GET', path: '/users/:id',
    description: 'Get user by ID',
    statusCode: 200,
    responseBody: '{"id":1,"name":"Alice Johnson","email":"alice@example.com","role":"admin"}',
    responseHeaders: '{"Content-Type":"application/json"}',
    authRequired: false, delay: 0,
  },
  {
    id: 'r3', method: 'POST', path: '/users',
    description: 'Create a new user',
    statusCode: 201,
    responseBody: '{"id":3,"name":"New User","email":"newuser@example.com","role":"user"}',
    responseHeaders: '{"Content-Type":"application/json"}',
    authRequired: true, delay: 0,
  },
  {
    id: 'r4', method: 'PUT', path: '/users/:id',
    description: 'Update user',
    statusCode: 200,
    responseBody: '{"id":1,"name":"Alice Updated","email":"alice@example.com","role":"admin"}',
    responseHeaders: '{"Content-Type":"application/json"}',
    authRequired: true, delay: 0,
  },
  {
    id: 'r5', method: 'DELETE', path: '/users/:id',
    description: 'Delete user',
    statusCode: 204,
    responseBody: '',
    responseHeaders: '{}',
    authRequired: true, delay: 0,
  },
];

/* ── Templates ────────────────────────────────────────────────────────────── */
const TEMPLATES = {
  'Users CRUD': DEFAULT_ROUTES.map(r => ({ ...r, id: newId() })),
  'Posts CRUD': [
    { id: newId(), method: 'GET',    path: '/posts',      description: 'Get all posts',   statusCode: 200, responseBody: '[\n  {"id":1,"title":"Hello World","body":"Lorem ipsum","authorId":1,"published":true},\n  {"id":2,"title":"Getting Started","body":"Dolor sit amet","authorId":2,"published":false}\n]', responseHeaders: '{"Content-Type":"application/json"}', authRequired: false, delay: 0 },
    { id: newId(), method: 'GET',    path: '/posts/:id',  description: 'Get post by ID',  statusCode: 200, responseBody: '{"id":1,"title":"Hello World","body":"Lorem ipsum dolor sit amet","authorId":1,"published":true,"tags":["news","tutorial"]}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: false, delay: 0 },
    { id: newId(), method: 'POST',   path: '/posts',      description: 'Create a post',   statusCode: 201, responseBody: '{"id":3,"title":"New Post","body":"Post content here","authorId":1,"published":false}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: true, delay: 0 },
    { id: newId(), method: 'PUT',    path: '/posts/:id',  description: 'Update a post',   statusCode: 200, responseBody: '{"id":1,"title":"Updated Title","body":"Updated content","authorId":1,"published":true}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: true, delay: 0 },
    { id: newId(), method: 'DELETE', path: '/posts/:id',  description: 'Delete a post',   statusCode: 204, responseBody: '', responseHeaders: '{}', authRequired: true, delay: 0 },
  ],
  'Products CRUD': [
    { id: newId(), method: 'GET',    path: '/products',     description: 'Get all products', statusCode: 200, responseBody: '[\n  {"id":1,"name":"Laptop Pro","price":1299.99,"stock":42,"category":"electronics"},\n  {"id":2,"name":"Wireless Mouse","price":49.99,"stock":150,"category":"accessories"}\n]', responseHeaders: '{"Content-Type":"application/json"}', authRequired: false, delay: 0 },
    { id: newId(), method: 'GET',    path: '/products/:id', description: 'Get product by ID', statusCode: 200, responseBody: '{"id":1,"name":"Laptop Pro","price":1299.99,"stock":42,"category":"electronics","description":"High-performance laptop"}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: false, delay: 0 },
    { id: newId(), method: 'POST',   path: '/products',     description: 'Create a product', statusCode: 201, responseBody: '{"id":3,"name":"New Product","price":0,"stock":0,"category":"uncategorized"}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: true, delay: 0 },
    { id: newId(), method: 'PUT',    path: '/products/:id', description: 'Update a product', statusCode: 200, responseBody: '{"id":1,"name":"Laptop Pro Updated","price":1199.99,"stock":38,"category":"electronics"}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: true, delay: 0 },
    { id: newId(), method: 'DELETE', path: '/products/:id', description: 'Delete a product', statusCode: 204, responseBody: '', responseHeaders: '{}', authRequired: true, delay: 0 },
  ],
  'Blog API': [
    { id: newId(), method: 'GET',  path: '/posts',        description: 'Get all blog posts', statusCode: 200, responseBody: '[\n  {"id":1,"title":"Getting Started with REST","slug":"getting-started-rest","excerpt":"Learn REST API basics","publishedAt":"2026-01-15T10:00:00Z"}\n]', responseHeaders: '{"Content-Type":"application/json"}', authRequired: false, delay: 0 },
    { id: newId(), method: 'GET',  path: '/posts/:slug',  description: 'Get post by slug',   statusCode: 200, responseBody: '{"id":1,"title":"Getting Started with REST","slug":"getting-started-rest","content":"Full content here...","author":{"id":1,"name":"Alice"},"tags":["api","rest"],"publishedAt":"2026-01-15T10:00:00Z"}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: false, delay: 0 },
    { id: newId(), method: 'POST', path: '/posts',        description: 'Create a blog post', statusCode: 201, responseBody: '{"id":2,"title":"New Post","slug":"new-post","content":"","published":false}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: true, delay: 0 },
    { id: newId(), method: 'GET',  path: '/categories',   description: 'List categories',    statusCode: 200, responseBody: '[{"id":1,"name":"Technology","slug":"technology","postCount":12},{"id":2,"name":"Design","slug":"design","postCount":8}]', responseHeaders: '{"Content-Type":"application/json"}', authRequired: false, delay: 0 },
    { id: newId(), method: 'GET',  path: '/tags',         description: 'List tags',          statusCode: 200, responseBody: '[{"id":1,"name":"REST","slug":"rest"},{"id":2,"name":"API","slug":"api"},{"id":3,"name":"JavaScript","slug":"javascript"}]', responseHeaders: '{"Content-Type":"application/json"}', authRequired: false, delay: 0 },
  ],
  'Auth API': [
    { id: newId(), method: 'POST', path: '/auth/login',    description: 'User login',         statusCode: 200, responseBody: '{"token":"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.mock_token","expiresIn":3600,"user":{"id":1,"name":"Alice Johnson","email":"alice@example.com"}}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: false, delay: 0 },
    { id: newId(), method: 'POST', path: '/auth/register', description: 'User registration',  statusCode: 201, responseBody: '{"id":3,"name":"New User","email":"newuser@example.com","createdAt":"2026-05-20T10:00:00Z"}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: false, delay: 0 },
    { id: newId(), method: 'POST', path: '/auth/logout',   description: 'User logout',        statusCode: 200, responseBody: '{"message":"Logged out successfully"}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: true, delay: 0 },
    { id: newId(), method: 'GET',  path: '/auth/me',       description: 'Get current user',   statusCode: 200, responseBody: '{"id":1,"name":"Alice Johnson","email":"alice@example.com","role":"admin","createdAt":"2026-01-01T00:00:00Z"}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: true, delay: 0 },
    { id: newId(), method: 'POST', path: '/auth/refresh',  description: 'Refresh auth token', statusCode: 200, responseBody: '{"token":"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.new_mock_token","expiresIn":3600}', responseHeaders: '{"Content-Type":"application/json"}', authRequired: true, delay: 0 },
  ],
};

/* ── Route matching ───────────────────────────────────────────────────────── */
function matchRoute(routePath, testPath) {
  const routeParts = routePath.split('/');
  const testParts = testPath.split('/');
  if (routeParts.length !== testParts.length) return { match: false, params: {} };
  const params = {};
  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      params[routeParts[i].slice(1)] = testParts[i];
    } else if (routeParts[i] !== testParts[i]) {
      return { match: false, params: {} };
    }
  }
  return { match: true, params };
}

/* ── Express code generator ───────────────────────────────────────────────── */
function generateExpressCode(routes) {
  const hasAuth = routes.some(r => r.authRequired);
  const lines = [
    `const express = require('express');`,
    `const app = express();`,
    `app.use(express.json());`,
    ``,
  ];

  if (hasAuth) {
    lines.push(
      `// Auth middleware`,
      `function requireAuth(req, res, next) {`,
      `  const token = req.headers.authorization;`,
      `  if (!token) return res.status(401).json({ error: 'Unauthorized' });`,
      `  next();`,
      `}`,
      ``,
    );
  }

  for (const route of routes) {
    const methodLower = route.method.toLowerCase();
    const authLabel = route.authRequired ? ' [AUTH REQUIRED]' : '';
    const comment = `// ${route.method} ${route.path}${route.description ? ` — ${route.description}` : ''}${authLabel}`;
    lines.push(comment);

    let bodyStr = '';
    if (route.responseBody && route.responseBody.trim()) {
      try {
        const parsed = JSON.parse(route.responseBody);
        bodyStr = JSON.stringify(parsed);
      } catch {
        bodyStr = JSON.stringify(route.responseBody);
      }
    }

    const middleware = route.authRequired ? `requireAuth, ` : '';

    if (route.statusCode === 204 || !route.responseBody.trim()) {
      lines.push(`app.${methodLower}('${route.path}', ${middleware}(req, res) => {`);
      lines.push(`  res.status(${route.statusCode}).end();`);
    } else {
      lines.push(`app.${methodLower}('${route.path}', ${middleware}(req, res) => {`);
      if (route.delay > 0) {
        lines.push(`  setTimeout(() => {`);
        lines.push(`    res.status(${route.statusCode}).json(${bodyStr});`);
        lines.push(`  }, ${route.delay});`);
      } else {
        lines.push(`  res.status(${route.statusCode}).json(${bodyStr});`);
      }
    }
    lines.push(`});`);
    lines.push(``);
  }

  lines.push(`app.listen(3000, () => console.log('Server running on port 3000'));`);
  return lines.join('\n');
}

/* ── JSON colorizer ───────────────────────────────────────────────────────── */
function colorizeJson(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      match => {
        if (/^"/.test(match)) {
          if (/:$/.test(match)) return `<span style="color:#60a5fa">${match}</span>`;
          return `<span style="color:#86efac">${match}</span>`;
        }
        if (/true|false/.test(match)) return `<span style="color:#fbbf24">${match}</span>`;
        if (/null/.test(match)) return `<span style="color:#f87171">${match}</span>`;
        return `<span style="color:#c4b5fd">${match}</span>`;
      },
    );
}

/* ── Status colour helper ─────────────────────────────────────────────────── */
function statusColor(code) {
  if (code >= 200 && code < 300) return '#16a34a';
  if (code >= 300 && code < 400) return '#2563eb';
  if (code >= 400 && code < 500) return '#d97706';
  return '#dc2626';
}

/* ── Storage ──────────────────────────────────────────────────────────────── */
const LS_KEY_ROUTES = 'fwd-rest-api-builder-routes';
const LS_KEY_SEL    = 'fwd-rest-api-builder-selected';

/* ── Main component ───────────────────────────────────────────────────────── */
export default function RestApiBuilderTool() {
  const [routes, setRoutes] = useState(DEFAULT_ROUTES);
  const [selectedId, setSelectedId] = useState(DEFAULT_ROUTES[0].id);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY_ROUTES);
      const saved = raw ? JSON.parse(raw) : null;
      if (saved && saved.length) setRoutes(saved);
      const sel = localStorage.getItem(LS_KEY_SEL);
      if (sel) setSelectedId(sel);
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  const [activePanel, setActivePanel] = useState('editor'); // 'editor' | 'test' | 'export'
  const [testPath, setTestPath]         = useState('');
  const [testMethod, setTestMethod]     = useState('GET');
  const [testBody, setTestBody]         = useState('');
  const [testToken, setTestToken]       = useState('');
  const [testResponse, setTestResponse] = useState(null);
  const [isTesting, setIsTesting]       = useState(false);
  const [headersOpen, setHeadersOpen]   = useState(false);
  const [toast, setToast]               = useState('');
  const [exportLang, setExportLang]     = useState('express'); // 'express' | 'json'
  const [templateOpen, setTemplateOpen] = useState(false);
  const templateRef = useRef(null);

  /* ── Derived ────────────────────────────────────────────────────────────── */
  const selected = useMemo(
    () => routes.find(r => r.id === selectedId) ?? routes[0],
    [routes, selectedId],
  );

  /* ── Persist (only after client hydration to avoid overwriting saved state) ── */
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(LS_KEY_ROUTES, JSON.stringify(routes)); } catch { /* ignore */ }
  }, [routes, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(LS_KEY_SEL, selectedId); } catch { /* ignore */ }
  }, [selectedId, hydrated]);

  /* ── Auto-fill test from selected route ─────────────────────────────────── */
  useEffect(() => {
    if (selected) {
      setTestMethod(selected.method);
      setTestPath(selected.path.replace(/:([a-z_]+)/gi, '1'));
    }
  }, [selected?.id]);

  /* ── Close template dropdown on outside click ───────────────────────────── */
  useEffect(() => {
    const handler = (e) => {
      if (templateRef.current && !templateRef.current.contains(e.target)) {
        setTemplateOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── Toast helper ───────────────────────────────────────────────────────── */
  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  }, []);

  /* ── Route mutations ────────────────────────────────────────────────────── */
  const addRoute = useCallback(() => {
    const route = {
      id: newId(), method: 'GET', path: '/new-route',
      description: 'New route',
      statusCode: 200,
      responseBody: '{"message":"OK"}',
      responseHeaders: '{"Content-Type":"application/json"}',
      authRequired: false, delay: 0,
    };
    setRoutes(prev => [...prev, route]);
    setSelectedId(route.id);
    setActivePanel('editor');
  }, []);

  const deleteRoute = useCallback((id) => {
    setRoutes(prev => {
      const next = prev.filter(r => r.id !== id);
      if (selectedId === id && next.length) setSelectedId(next[0].id);
      return next;
    });
  }, [selectedId]);

  const updateRoute = useCallback((id, patch) => {
    setRoutes(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
  }, []);

  const saveRoute = useCallback((patch) => {
    if (!selected) return;
    updateRoute(selected.id, patch);
    showToast('Route saved');
  }, [selected, updateRoute, showToast]);

  /* ── Load template ──────────────────────────────────────────────────────── */
  const loadTemplate = useCallback((name) => {
    const tpl = TEMPLATES[name];
    if (!tpl) return;
    const proceed = routes.length === 0 || window.confirm(`Replace all ${routes.length} route(s) with the "${name}" template?`);
    if (!proceed) return;
    const newRoutes = tpl.map(r => ({ ...r, id: newId() }));
    setRoutes(newRoutes);
    setSelectedId(newRoutes[0].id);
    setTemplateOpen(false);
    setActivePanel('editor');
    showToast(`Loaded: ${name}`);
  }, [routes.length, showToast]);

  /* ── Format JSON ────────────────────────────────────────────────────────── */
  const formatJson = useCallback(() => {
    if (!selected) return;
    try {
      const formatted = JSON.stringify(JSON.parse(selected.responseBody), null, 2);
      updateRoute(selected.id, { responseBody: formatted });
      showToast('JSON formatted');
    } catch {
      showToast('Invalid JSON — cannot format');
    }
  }, [selected, updateRoute, showToast]);

  /* ── HTTP Client test ───────────────────────────────────────────────────── */
  const handleTest = useCallback(async () => {
    if (!testPath.trim()) { showToast('Enter a path to test'); return; }
    setIsTesting(true);
    setTestResponse(null);

    // Strip query string for matching
    const basePath = testPath.split('?')[0];

    // Find matching route
    let matched = null;
    let params = {};
    for (const route of routes) {
      if (route.method !== testMethod) continue;
      const result = matchRoute(route.path, basePath);
      if (result.match) { matched = route; params = result.params; break; }
    }

    if (!matched) {
      setIsTesting(false);
      setTestResponse({
        status: 404,
        body: { error: `Cannot ${testMethod} ${basePath} — no matching route found` },
        headers: { 'Content-Type': 'application/json' },
        time: Math.round(Math.random() * 8 + 2),
        routeMatch: null,
        params: {},
        noMatch: true,
      });
      return;
    }

    // Auth check
    if (matched.authRequired && !testToken.trim()) {
      setIsTesting(false);
      setTestResponse({
        status: 401,
        body: { error: 'Unauthorized — this route requires an Authorization token' },
        headers: { 'Content-Type': 'application/json' },
        time: Math.round(Math.random() * 5 + 1),
        routeMatch: matched.path,
        params,
        noMatch: false,
        authFailed: true,
      });
      return;
    }

    // Simulate delay
    const fakeMs = Math.round(Math.random() * 15 + 5);
    const totalDelay = matched.delay + fakeMs;

    await new Promise(r => setTimeout(r, Math.min(totalDelay, 2500)));

    // Parse response
    let body = null;
    if (matched.responseBody && matched.responseBody.trim()) {
      try { body = JSON.parse(matched.responseBody); }
      catch { body = matched.responseBody; }
    }

    let headers = {};
    try { headers = JSON.parse(matched.responseHeaders || '{}'); } catch { /* ignore */ }

    setIsTesting(false);
    setTestResponse({
      status: matched.statusCode,
      body,
      headers,
      time: totalDelay,
      routeMatch: matched.path,
      params,
      delay: matched.delay > 0 ? matched.delay : 0,
      noMatch: false,
      authFailed: false,
    });
  }, [routes, testMethod, testPath, testToken, showToast]);

  /* ── Copy helper ────────────────────────────────────────────────────────── */
  const copy = useCallback(async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`Copied: ${label}`);
    } catch {
      showToast('Copy failed');
    }
  }, [showToast]);

  /* ── Download helper ────────────────────────────────────────────────────── */
  const download = useCallback((text, filename) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }, []);

  /* ── Export content ─────────────────────────────────────────────────────── */
  const expressCode = useMemo(() => generateExpressCode(routes), [routes]);
  const jsonConfig = useMemo(() => JSON.stringify(routes, null, 2), [routes]);

  /* ── Editor state (local edits before save) ─────────────────────────────── */
  const [editState, setEditState] = useState(null);

  // Reset edit state when selected route changes
  useEffect(() => {
    setEditState(null);
  }, [selectedId]);

  const edit = editState ?? selected ?? {};

  const setEdit = useCallback((patch) => {
    setEditState(prev => ({ ...(prev ?? selected), ...patch }));
  }, [selected]);

  /* ── Render ─────────────────────────────────────────────────────────────── */
  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="rest-api-builder-playground" />
      {/* ── Header ── */}
      <div className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/rest-api-builder-playground.svg" alt="" className={s.headerIcon} />
          <span className={s.headerTitle}>REST API Builder</span>
          <span className={s.headerSub}>Mock routes · Test requests · Export Express.js</span>
        </div>
        <div className={s.headerRight}>
          <span className={s.routeCount}>{routes.length} route{routes.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className={s.body}>
        {/* ── Sidebar ── */}
        <div className={s.sidebar}>
          <div className={s.sidebarHeader}>
            <button className={s.addBtn} onClick={addRoute}>+ Add Route</button>
            <div className={s.templateWrap} ref={templateRef}>
              <button className={s.templateBtn} onClick={() => setTemplateOpen(v => !v)}>
                Load Template ▾
              </button>
              {templateOpen && (
                <div className={s.templateDropdown}>
                  {Object.keys(TEMPLATES).map(name => (
                    <button key={name} className={s.templateItem} onClick={() => loadTemplate(name)}>
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={s.routeList}>
            {routes.map(route => (
              <div
                key={route.id}
                className={`${s.routeItem} ${route.id === selectedId ? s.routeItemActive : ''}`}
                onClick={() => { setSelectedId(route.id); setActivePanel('editor'); }}
              >
                <span
                  className={s.methodBadge}
                  style={{ background: METHOD_COLOR[route.method] + '22', color: METHOD_COLOR[route.method] }}
                >
                  {route.method}
                </span>
                <span className={s.routePath}>{route.path}</span>
                <span
                  className={s.routeStatus}
                  style={{ color: statusColor(route.statusCode) }}
                >
                  {route.statusCode}
                </span>
                <button
                  className={s.routeDeleteBtn}
                  onClick={e => { e.stopPropagation(); deleteRoute(route.id); }}
                  title="Delete route"
                >
                  ✕
                </button>
              </div>
            ))}
            {routes.length === 0 && (
              <div className={s.emptyRoutes}>No routes yet. Click "+ Add Route" to start.</div>
            )}
          </div>
        </div>

        {/* ── Main ── */}
        <div className={s.main}>
          {/* ── Tab bar ── */}
          <div className={s.tabBar}>
            {[
              { id: 'editor', label: 'Route Editor' },
              { id: 'test',   label: 'HTTP Client' },
              { id: 'export', label: 'Export Code' },
            ].map(tab => (
              <button
                key={tab.id}
                className={`${s.tab} ${activePanel === tab.id ? s.tabActive : ''}`}
                onClick={() => setActivePanel(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Editor panel ── */}
          {activePanel === 'editor' && selected && (
            <div className={s.editor}>
              {/* Method selector */}
              <div className={s.editorSection}>
                <div className={s.label}>HTTP Method</div>
                <div className={s.methodSelector}>
                  {METHODS.map(m => (
                    <button
                      key={m}
                      className={`${s.methodBtn} ${(edit.method ?? selected.method) === m ? s.methodBtnActive : ''}`}
                      style={
                        (edit.method ?? selected.method) === m
                          ? { background: METHOD_COLOR[m], color: '#fff', borderColor: METHOD_COLOR[m] }
                          : { borderColor: METHOD_COLOR[m] + '66', color: METHOD_COLOR[m] }
                      }
                      onClick={() => setEdit({ method: m })}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Path */}
              <div className={s.editorSection}>
                <div className={s.label}>Path</div>
                <input
                  className={s.pathInput}
                  value={edit.path ?? selected.path}
                  onChange={e => setEdit({ path: e.target.value })}
                  placeholder="/users/:id"
                  spellCheck={false}
                />
              </div>

              {/* Description */}
              <div className={s.editorSection}>
                <div className={s.label}>Description</div>
                <input
                  className={s.descInput}
                  value={edit.description ?? selected.description}
                  onChange={e => setEdit({ description: e.target.value })}
                  placeholder="What does this route do?"
                />
              </div>

              {/* Status code */}
              <div className={s.editorSection}>
                <div className={s.label}>Status Code</div>
                <div className={s.statusRow}>
                  <input
                    type="number"
                    className={s.statusInput}
                    value={edit.statusCode ?? selected.statusCode}
                    onChange={e => setEdit({ statusCode: Number(e.target.value) })}
                    min={100} max={599}
                  />
                  <div className={s.statusChips}>
                    {STATUS_CHIPS.map(code => (
                      <button
                        key={code}
                        className={`${s.statusChip} ${(edit.statusCode ?? selected.statusCode) === code ? s.statusChipActive : ''}`}
                        style={
                          (edit.statusCode ?? selected.statusCode) === code
                            ? { background: statusColor(code), color: '#fff', borderColor: statusColor(code) }
                            : { borderColor: statusColor(code) + '55', color: statusColor(code) }
                        }
                        onClick={() => setEdit({ statusCode: code })}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Response body */}
              <div className={s.editorSection}>
                <div className={s.labelRow}>
                  <div className={s.label}>Mock Response (JSON)</div>
                  <button className={s.formatBtn} onClick={formatJson}>Format JSON</button>
                </div>
                <textarea
                  className={s.bodyArea}
                  value={edit.responseBody ?? selected.responseBody}
                  onChange={e => setEdit({ responseBody: e.target.value })}
                  placeholder={'{\n  "id": 1,\n  "name": "Alice"\n}'}
                  rows={8}
                  spellCheck={false}
                />
              </div>

              {/* Response headers */}
              <div className={s.editorSection}>
                <div className={s.label}>Response Headers (JSON object)</div>
                <textarea
                  className={s.headersArea}
                  value={edit.responseHeaders ?? selected.responseHeaders}
                  onChange={e => setEdit({ responseHeaders: e.target.value })}
                  placeholder='{"Content-Type": "application/json"}'
                  rows={3}
                  spellCheck={false}
                />
              </div>

              {/* Options */}
              <div className={s.editorSection}>
                <div className={s.optionsRow}>
                  <label className={s.authToggle}>
                    <input
                      type="checkbox"
                      checked={edit.authRequired ?? selected.authRequired}
                      onChange={e => setEdit({ authRequired: e.target.checked })}
                    />
                    <span>Auth Required</span>
                  </label>
                  <label className={s.delayLabel}>
                    <span>Delay:</span>
                    <input
                      type="range"
                      min={0} max={2000} step={100}
                      className={s.delayRange}
                      value={edit.delay ?? selected.delay}
                      onChange={e => setEdit({ delay: Number(e.target.value) })}
                    />
                    <span className={s.delayValue}>{edit.delay ?? selected.delay}ms</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className={s.editorActions}>
                <button
                  className={s.saveBtn}
                  onClick={() => {
                    if (editState) {
                      updateRoute(selected.id, editState);
                      setEditState(null);
                      showToast('Route saved');
                    } else {
                      showToast('No changes to save');
                    }
                  }}
                >
                  Save Route
                </button>
                <button
                  className={s.deleteBtn}
                  onClick={() => {
                    if (window.confirm(`Delete route "${selected.path}"?`)) {
                      deleteRoute(selected.id);
                    }
                  }}
                >
                  Delete Route
                </button>
              </div>
            </div>
          )}

          {activePanel === 'editor' && !selected && (
            <div className={s.emptyPanel}>No route selected. Add a route to get started.</div>
          )}

          {/* ── HTTP Client ── */}
          {activePanel === 'test' && (
            <div className={s.httpClient}>
              <div className={s.httpClientTitle}>Test Your API</div>
              <div className={s.httpClientSub}>Simulate requests against your defined routes</div>

              <div className={s.httpClientTop}>
                <select
                  className={s.methodSelect}
                  value={testMethod}
                  onChange={e => setTestMethod(e.target.value)}
                  style={{ color: METHOD_COLOR[testMethod] }}
                >
                  {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <input
                  className={s.pathField}
                  value={testPath}
                  onChange={e => setTestPath(e.target.value)}
                  placeholder="/users/1"
                  spellCheck={false}
                  onKeyDown={e => { if (e.key === 'Enter') handleTest(); }}
                />
                <input
                  className={s.tokenInput}
                  value={testToken}
                  onChange={e => setTestToken(e.target.value)}
                  placeholder="Auth token (optional)"
                />
                <button
                  className={s.sendBtn}
                  onClick={handleTest}
                  disabled={isTesting}
                >
                  {isTesting ? '...' : '▶ Send'}
                </button>
              </div>

              {/* Request body */}
              {['POST', 'PUT', 'PATCH'].includes(testMethod) && (
                <div className={s.editorSection}>
                  <div className={s.label}>Request Body (JSON)</div>
                  <textarea
                    className={s.requestBody}
                    value={testBody}
                    onChange={e => setTestBody(e.target.value)}
                    placeholder={'{\n  "name": "Alice",\n  "email": "alice@example.com"\n}'}
                    rows={5}
                    spellCheck={false}
                  />
                </div>
              )}

              {/* Response */}
              <div className={s.responseArea}>
                {!testResponse && !isTesting && (
                  <div className={s.responseEmpty}>
                    <div className={s.responseEmptyIcon}>▶</div>
                    <div>Click Send to test a route</div>
                    <div className={s.responseEmptySub}>
                      {routes.length} route{routes.length !== 1 ? 's' : ''} available to match against
                    </div>
                  </div>
                )}
                {isTesting && (
                  <div className={s.responseEmpty}>
                    <div className={s.spinner} />
                    <div>Sending request…</div>
                  </div>
                )}
                {testResponse && !isTesting && (
                  <div>
                    {/* Status bar */}
                    <div className={s.responseMeta}>
                      <span
                        className={s.responseBadge}
                        style={{ background: statusColor(testResponse.status) }}
                      >
                        {testResponse.status} {STATUS_TEXT[testResponse.status] || ''}
                      </span>
                      <span className={s.responseTime}>{testResponse.time}ms</span>
                      {testResponse.routeMatch && (
                        <span className={s.responseRoute}>matched: {testResponse.routeMatch}</span>
                      )}
                      {testResponse.delay > 0 && (
                        <span className={s.responseDelay}>simulated delay: {testResponse.delay}ms</span>
                      )}
                    </div>

                    {/* Headers */}
                    {Object.keys(testResponse.headers).length > 0 && (
                      <div className={s.responseHeadersWrap}>
                        <button
                          className={s.headersToggle}
                          onClick={() => setHeadersOpen(v => !v)}
                        >
                          {headersOpen ? '▾' : '▸'} Response Headers ({Object.keys(testResponse.headers).length})
                        </button>
                        {headersOpen && (
                          <div className={s.responseHeaders}>
                            {Object.entries(testResponse.headers).map(([k, v]) => (
                              <div key={k} className={s.headerRow}>
                                <span className={s.headerKey}>{k}:</span>
                                <span className={s.headerVal}>{String(v)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Body */}
                    <div className={s.responseBodyWrap}>
                      <div className={s.responsBodyLabel}>Response Body</div>
                      {testResponse.body !== null && testResponse.body !== undefined ? (
                        <pre
                          className={s.responseBody}
                          dangerouslySetInnerHTML={{
                            __html: colorizeJson(JSON.stringify(testResponse.body, null, 2)),
                          }}
                        />
                      ) : (
                        <div className={s.responseEmpty} style={{ padding: '16px' }}>
                          (empty body)
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Export panel ── */}
          {activePanel === 'export' && (
            <div className={s.exportPanel}>
              <div className={s.exportToggle}>
                <button
                  className={`${s.exportToggleBtn} ${exportLang === 'express' ? s.exportToggleBtnActive : ''}`}
                  onClick={() => setExportLang('express')}
                >
                  Express.js
                </button>
                <button
                  className={`${s.exportToggleBtn} ${exportLang === 'json' ? s.exportToggleBtnActive : ''}`}
                  onClick={() => setExportLang('json')}
                >
                  JSON Config
                </button>
              </div>

              {exportLang === 'express' && (
                <div>
                  <div className={s.exportActions}>
                    <div className={s.exportInfo}>
                      Express.js server for {routes.length} route{routes.length !== 1 ? 's' : ''}
                    </div>
                    <button className={s.copyBtn} onClick={() => copy(expressCode, 'Express.js code')}>
                      Copy All Code
                    </button>
                  </div>
                  <pre className={s.exportCode}>{expressCode}</pre>
                  <div className={s.exportTip}>
                    Run with: <code>npm install express &amp;&amp; node server.js</code>
                  </div>
                </div>
              )}

              {exportLang === 'json' && (
                <div>
                  <div className={s.exportActions}>
                    <div className={s.exportInfo}>
                      JSON config — {routes.length} route{routes.length !== 1 ? 's' : ''}
                    </div>
                    <button className={s.copyBtn} onClick={() => copy(jsonConfig, 'JSON config')}>
                      Copy
                    </button>
                    <button className={s.copyBtn} onClick={() => download(jsonConfig, 'api-routes.json')}>
                      Download
                    </button>
                  </div>
                  <pre
                    className={s.exportCode}
                    dangerouslySetInnerHTML={{ __html: colorizeJson(jsonConfig) }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Toast ── */}
      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}
