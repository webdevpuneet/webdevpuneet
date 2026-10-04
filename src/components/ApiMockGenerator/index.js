'use client';

import { useState, useCallback, useMemo } from 'react';
import s from './styles.module.css';
import ApiToolsTopNav from '@/components/ApiToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── Constants ───────────────────────────────────────────────────────────────── */
const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const METHOD_COLOR = {
  GET: '#10b981', POST: '#3b82f6', PUT: '#f59e0b',
  PATCH: '#8b5cf6', DELETE: '#ef4444',
};
const STATUS_CODES = [200, 201, 204, 400, 401, 403, 404, 409, 422, 500];
const STATUS_TEXT = {
  200: 'OK', 201: 'Created', 204: 'No Content',
  400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden',
  404: 'Not Found', 409: 'Conflict', 422: 'Unprocessable Entity', 500: 'Internal Server Error',
};

/* ── Faker ───────────────────────────────────────────────────────────────────── */
let _seq = 1;

const FIRST_NAMES = ['Alice','Bob','Charlie','Diana','Ethan','Fiona','George','Hannah','Ivan','Julia'];
const LAST_NAMES  = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Moore'];
const DOMAINS     = ['example.com','mail.dev','test.io','acme.com','corp.net'];
const LOREM_WORDS = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor'];

function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rndInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function rndFloat(min, max) { return parseFloat((Math.random() * (max - min) + min).toFixed(2)); }
function rndBool() { return Math.random() > 0.5; }
function rndUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
function rndDate() {
  const d = new Date(Date.now() - rndInt(0, 365 * 24 * 3600 * 1000));
  return d.toISOString();
}
function rndPhone() { return `+1-${rndInt(200,999)}-${rndInt(100,999)}-${rndInt(1000,9999)}`; }
function rndUrl()   { return `https://${rnd(DOMAINS)}/${rnd(LOREM_WORDS)}/${rndInt(1,999)}`; }
function rndLorem(words = 8) {
  return Array.from({ length: words }, () => rnd(LOREM_WORDS)).join(' ') + '.';
}
function rndColor() { return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0'); }
function rndName()  { return `${rnd(FIRST_NAMES)} ${rnd(LAST_NAMES)}`; }
function rndEmail() {
  const fn = rnd(FIRST_NAMES).toLowerCase();
  const ln = rnd(LAST_NAMES).toLowerCase();
  return `${fn}.${ln}@${rnd(DOMAINS)}`;
}
function rndSlug(k)  { return k.toLowerCase().replace(/[_\s]/g, '-') + '-' + rndInt(1,99); }
function rndStatus() { return rnd(['active','inactive','pending','verified']); }

function fakerForKey(key, val) {
  const k = key.toLowerCase();
  if (k === 'id' || k.endsWith('_id') || k.endsWith('id'))  return rndUuid();
  if (k.includes('email'))     return rndEmail();
  if (k.includes('phone') || k.includes('mobile')) return rndPhone();
  if (k.includes('url') || k.includes('link') || k.includes('avatar') || k.includes('image')) return rndUrl();
  if (k === 'name' || k.includes('full_name') || k.includes('fullname')) return rndName();
  if (k.includes('first') && k.includes('name')) return rnd(FIRST_NAMES);
  if (k.includes('last') && k.includes('name'))  return rnd(LAST_NAMES);
  if (k.includes('username') || k.includes('handle')) return rnd(FIRST_NAMES).toLowerCase() + rndInt(10,99);
  if (k.includes('title') || k.includes('heading')) return rndLorem(4).replace('.','');
  if (k.includes('description') || k.includes('content') || k.includes('body') || k.includes('message') || k.includes('text') || k.includes('note')) return rndLorem(12);
  if (k.includes('color') || k.includes('colour')) return rndColor();
  if (k.includes('slug') || k.includes('path') || k.includes('key')) return rndSlug(key);
  if (k.includes('status')) return rndStatus();
  if (k.includes('date') || k.includes('_at') || k.includes('time') || k.includes('timestamp')) return rndDate();
  if (k.includes('count') || k.includes('total') || k.includes('num') || k.includes('quantity') || k.includes('age') || k.includes('score') || k.includes('rank')) return rndInt(1, 999);
  if (k.includes('price') || k.includes('amount') || k.includes('cost') || k.includes('balance') || k.includes('salary')) return rndFloat(1, 9999);
  if (k.includes('rating') || k.includes('stars')) return rndFloat(1, 5);
  if (k === 'active' || k.includes('enabled') || k.includes('verified') || k.includes('is_') || k.startsWith('is') || k.startsWith('has') || k.startsWith('can')) return rndBool();
  // fallback by type
  if (typeof val === 'boolean') return rndBool();
  if (typeof val === 'number')  return Number.isInteger(val) ? rndInt(1,999) : rndFloat(1,999);
  if (typeof val === 'string')  return rndLorem(3).replace('.','');
  return null;
}

function fakeValue(key, val) {
  if (Array.isArray(val)) {
    const template = val[0];
    return Array.from({ length: rndInt(2, 5) }, () => fakeValue('item', template));
  }
  if (val && typeof val === 'object') {
    return fakeObject(val);
  }
  const faked = fakerForKey(key, val);
  return faked !== null ? faked : val;
}

function fakeObject(obj) {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    result[k] = fakeValue(k, v);
  }
  return result;
}

function generateFakeData(jsonStr) {
  try {
    const parsed = JSON.parse(jsonStr);
    return JSON.stringify(fakeValue('root', parsed), null, 2);
  } catch { return jsonStr; }
}

/* ── ID counter ──────────────────────────────────────────────────────────────── */
let _eid = 0;
const eid = () => String(++_eid);

/* ── Default endpoints ───────────────────────────────────────────────────────── */
const DEFAULTS = [
  {
    id: eid(), method: 'GET', path: '/api/users', status: 200, delay: 0,
    body: JSON.stringify([{ id: '00000000-0000-0000-0000-000000000000', name: 'Alice Smith', email: 'alice@example.com', role: 'admin', active: true, created_at: '2024-01-01T00:00:00.000Z' }], null, 2),
  },
  {
    id: eid(), method: 'GET', path: '/api/users/:id', status: 200, delay: 0,
    body: JSON.stringify({ id: '00000000-0000-0000-0000-000000000000', name: 'Alice Smith', email: 'alice@example.com', role: 'admin', active: true, created_at: '2024-01-01T00:00:00.000Z' }, null, 2),
  },
  {
    id: eid(), method: 'POST', path: '/api/users', status: 201, delay: 0,
    body: JSON.stringify({ id: '00000000-0000-0000-0000-000000000000', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', active: true, created_at: '2024-01-01T00:00:00.000Z' }, null, 2),
  },
  {
    id: eid(), method: 'DELETE', path: '/api/users/:id', status: 204, delay: 0,
    body: '',
  },
];

/* ── Export formatters ───────────────────────────────────────────────────────── */
function toJsonServer(endpoints) {
  const db = {};
  for (const ep of endpoints) {
    if (ep.method !== 'GET' || !ep.body.trim()) continue;
    const resource = ep.path.split('/').filter(Boolean).pop()?.replace(/:[^/]+/, '').replace(/\//g, '') || 'items';
    try {
      const data = JSON.parse(ep.body);
      if (!db[resource]) db[resource] = Array.isArray(data) ? data : [data];
    } catch { /* skip */ }
  }
  return JSON.stringify(db, null, 2);
}

function toPostman(endpoints) {
  const items = endpoints.map(ep => ({
    name: `${ep.method} ${ep.path}`,
    request: {
      method: ep.method,
      header: [{ key: 'Content-Type', value: 'application/json' }],
      url: { raw: `{{baseUrl}}${ep.path}`, host: ['{{baseUrl}}'], path: ep.path.split('/').filter(Boolean) },
      body: ['GET','DELETE'].includes(ep.method) ? undefined : { mode: 'raw', raw: ep.body, options: { raw: { language: 'json' } } },
    },
    response: [{
      name: `${ep.status} ${STATUS_TEXT[ep.status] || ''}`,
      status: STATUS_TEXT[ep.status] || '',
      code: ep.status,
      header: [{ key: 'Content-Type', value: 'application/json' }],
      body: ep.body,
    }],
  }));
  return JSON.stringify({
    info: { name: 'API Mock', schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json' },
    item: items,
    variable: [{ key: 'baseUrl', value: 'http://localhost:3000' }],
  }, null, 2);
}

/* ── Component ───────────────────────────────────────────────────────────────── */
export default function ApiMockGenerator() {
  const [endpoints, setEndpoints] = useState(DEFAULTS);
  const [selectedId, setSelectedId] = useState(DEFAULTS[0].id);
  const [copied, setCopied] = useState('');
  const [exportModal, setExportModal] = useState(''); // '' | 'json-server' | 'postman'

  const selected = useMemo(() => endpoints.find(e => e.id === selectedId) ?? endpoints[0], [endpoints, selectedId]);

  /* ── Endpoint CRUD ───────────────────────────────────────────────────────── */
  const addEndpoint = useCallback(() => {
    const ep = { id: eid(), method: 'GET', path: '/api/resource', status: 200, delay: 0, body: JSON.stringify({ id: '', name: '' }, null, 2) };
    setEndpoints(prev => [...prev, ep]);
    setSelectedId(ep.id);
  }, []);

  const removeEndpoint = useCallback((id) => {
    setEndpoints(prev => {
      const next = prev.filter(e => e.id !== id);
      if (selectedId === id && next.length) setSelectedId(next[0].id);
      return next;
    });
  }, [selectedId]);

  const updateEndpoint = useCallback((id, patch) => {
    setEndpoints(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e));
  }, []);

  /* ── Generate fake data ──────────────────────────────────────────────────── */
  const generateFake = useCallback(() => {
    if (!selected) return;
    const faked = generateFakeData(selected.body);
    updateEndpoint(selected.id, { body: faked });
  }, [selected, updateEndpoint]);

  /* ── Copy ────────────────────────────────────────────────────────────────── */
  const copy = useCallback(async (text, key) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 1800);
  }, []);

  /* ── Export content ──────────────────────────────────────────────────────── */
  const exportContent = useMemo(() => {
    if (exportModal === 'json-server') return toJsonServer(endpoints);
    if (exportModal === 'postman')     return toPostman(endpoints);
    return '';
  }, [exportModal, endpoints]);

  /* ── JSON validity ───────────────────────────────────────────────────────── */
  const bodyValid = useMemo(() => {
    if (!selected?.body.trim()) return true;
    try { JSON.parse(selected.body); return true; } catch { return false; }
  }, [selected?.body]);

  if (!selected) return null;

  return (
    <div className={s.wrap}>
      <ApiToolsTopNav active="api-mock-generator" />
      <PlaygroundTopAd />
      {/* Header */}
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>{'{}'}</span>
          API Mock Generator
        </div>
        <div className={s.headerActions}>
          <button className={s.exportBtn} onClick={() => setExportModal('json-server')}>Export JSON Server</button>
          <button className={s.exportBtn} onClick={() => setExportModal('postman')}>Export Postman</button>
        </div>
      </div>

      <div className={s.body}>
        {/* ── Sidebar: endpoint list ── */}
        <div className={s.sidebar}>
          <div className={s.sidebarHeader}>
            <span className={s.sidebarTitle}>Endpoints</span>
            <button className={s.addBtn} onClick={addEndpoint}>＋ Add</button>
          </div>
          <div className={s.endpointList}>
            {endpoints.map(ep => (
              <div
                key={ep.id}
                className={`${s.endpointItem} ${ep.id === selectedId ? s.endpointItemActive : ''}`}
                onClick={() => setSelectedId(ep.id)}
              >
                <span className={s.methodBadge} style={{ background: METHOD_COLOR[ep.method] + '22', color: METHOD_COLOR[ep.method] }}>
                  {ep.method}
                </span>
                <span className={s.endpointPath}>{ep.path}</span>
                <span className={`${s.statusDot} ${ep.status < 300 ? s.statusGreen : ep.status < 500 ? s.statusYellow : s.statusRed}`} />
                <button className={s.removeBtn} onClick={e => { e.stopPropagation(); removeEndpoint(ep.id); }} title="Remove">✕</button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Editor panel ── */}
        <div className={s.editor}>
          {/* Endpoint config */}
          <div className={s.configBar}>
            <select
              className={s.methodSelect}
              value={selected.method}
              onChange={e => updateEndpoint(selected.id, { method: e.target.value })}
              style={{ color: METHOD_COLOR[selected.method], borderColor: METHOD_COLOR[selected.method] + '66' }}
            >
              {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>

            <input
              className={s.pathInput}
              value={selected.path}
              onChange={e => updateEndpoint(selected.id, { path: e.target.value })}
              placeholder="/api/resource"
              spellCheck={false}
            />

            <select
              className={s.statusSelect}
              value={selected.status}
              onChange={e => updateEndpoint(selected.id, { status: Number(e.target.value) })}
            >
              {STATUS_CODES.map(c => <option key={c} value={c}>{c} {STATUS_TEXT[c]}</option>)}
            </select>

            <div className={s.delayWrap}>
              <span className={s.delayLabel}>Delay</span>
              <input
                type="number" min={0} max={5000} step={100}
                className={s.delayInput}
                value={selected.delay}
                onChange={e => updateEndpoint(selected.id, { delay: Number(e.target.value) })}
              />
              <span className={s.delayUnit}>ms</span>
            </div>
          </div>

          {/* Response headers preview */}
          <div className={s.headersPreview}>
            <span className={s.headerChip}>Content-Type: application/json</span>
            <span className={s.headerChip}>Status: {selected.status} {STATUS_TEXT[selected.status]}</span>
            {selected.delay > 0 && <span className={s.headerChip}>X-Mock-Delay: {selected.delay}ms</span>}
          </div>

          {/* Body editor */}
          <div className={s.bodyHeader}>
            <span className={s.bodyLabel}>Response Body (JSON)</span>
            <div className={s.bodyActions}>
              {!bodyValid && <span className={s.invalidBadge}>⚠ Invalid JSON</span>}
              <button className={s.fakeBtn} onClick={generateFake} disabled={!selected.body.trim()}>
                🎲 Generate fake data
              </button>
              <button
                className={`${s.copyBodyBtn} ${copied === 'body' ? s.copyBodyBtnDone : ''}`}
                onClick={() => copy(selected.body, 'body')}
                disabled={!selected.body.trim()}
              >{copied === 'body' ? '✓ Copied' : 'Copy'}</button>
            </div>
          </div>

          <textarea
            className={`${s.bodyEditor} ${!bodyValid && selected.body ? s.bodyEditorInvalid : ''}`}
            value={selected.body}
            onChange={e => updateEndpoint(selected.id, { body: e.target.value })}
            placeholder={'{\n  "id": "uuid",\n  "name": "John Doe"\n}'}
            spellCheck={false}
          />

          {/* Response preview */}
          <div className={s.previewPanel}>
            <div className={s.previewPanelHeader}>
              <span className={s.previewPanelTitle}>
                <span className={`${s.statusPill} ${selected.status < 300 ? s.statusPillGreen : selected.status < 500 ? s.statusPillYellow : s.statusPillRed}`}>
                  {selected.status}
                </span>
                Simulated response · {selected.method} {selected.path}
              </span>
              <button
                className={`${s.copyBodyBtn} ${copied === 'curl' ? s.copyBodyBtnDone : ''}`}
                onClick={() => copy(`curl -X ${selected.method} http://localhost:3000${selected.path} -H "Content-Type: application/json"`, 'curl')}
              >{copied === 'curl' ? '✓ Copied' : 'Copy cURL'}</button>
            </div>
            <pre className={s.previewCode}>
              {selected.body.trim()
                ? (bodyValid
                    ? JSON.stringify(JSON.parse(selected.body), null, 2)
                    : selected.body)
                : '(empty response)'}
            </pre>
          </div>
        </div>
      </div>

      {/* Export modal */}
      {exportModal && (
        <div className={s.modalOverlay} onClick={() => setExportModal('')}>
          <div className={s.modal} onClick={e => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <span className={s.modalTitle}>
                {exportModal === 'json-server' ? 'JSON Server (db.json)' : 'Postman Collection'}
              </span>
              <div className={s.modalActions}>
                <button
                  className={`${s.copyBodyBtn} ${copied === 'export' ? s.copyBodyBtnDone : ''}`}
                  onClick={() => copy(exportContent, 'export')}
                >{copied === 'export' ? '✓ Copied' : 'Copy'}</button>
                <button className={s.modalClose} onClick={() => setExportModal('')}>✕</button>
              </div>
            </div>
            <pre className={s.modalCode}>{exportContent}</pre>
            {exportModal === 'json-server' && (
              <div className={s.modalTip}>
                💡 Run with: <code>npx json-server --watch db.json --port 3000</code>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
