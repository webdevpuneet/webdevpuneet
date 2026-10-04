'use client';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import s from './styles.module.css';
import ApiToolsTopNav from '@/components/ApiToolsTopNav';
import GistSyncButton from '@/components/GistSyncButton';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── IndexedDB helpers ── */
const DB_NAME = 'fwd-api-tester';
const DB_VER  = 1;
const STORE   = 'store';

function openDB() {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = e => e.target.result.createObjectStore(STORE);
    req.onsuccess = e => res(e.target.result);
    req.onerror   = e => rej(e.target.error);
  });
}

async function idbGet(key) {
  try {
    const db = await openDB();
    return await new Promise((res, rej) => {
      const req = db.transaction(STORE).objectStore(STORE).get(key);
      req.onsuccess = e => res(e.target.result ?? null);
      req.onerror   = e => rej(e.target.error);
    });
  } catch { return null; }
}

async function idbSet(key, value) {
  try {
    const db = await openDB();
    await new Promise((res, rej) => {
      const req = db.transaction(STORE, 'readwrite').objectStore(STORE).put(value, key);
      req.onsuccess = () => res();
      req.onerror   = e => rej(e.target.error);
    });
  } catch {}
}

async function idbDel(key) {
  try {
    const db = await openDB();
    await new Promise((res, rej) => {
      const req = db.transaction(STORE, 'readwrite').objectStore(STORE).delete(key);
      req.onsuccess = () => res();
      req.onerror   = e => rej(e.target.error);
    });
  } catch {}
}

/* ── Deletion tracking for sync ── */
const LS_DELETED_COLS    = 'api_deleted_cols';     // { colId: isoTimestamp }
const LS_DELETED_REQS    = 'api_deleted_reqs';     // { reqId: isoTimestamp }
const LS_HISTORY_CLEARED = 'api_history_cleared';  // isoTimestamp of last clear

function getHistoryClearedAt() { try { return localStorage.getItem(LS_HISTORY_CLEARED) || ''; } catch { return ''; } }
function setHistoryClearedAt(ts) { try { localStorage.setItem(LS_HISTORY_CLEARED, ts); } catch {} }

function trackDeletedCol(colId) {
  try { const m = JSON.parse(localStorage.getItem(LS_DELETED_COLS) || '{}'); m[colId] = new Date().toISOString(); localStorage.setItem(LS_DELETED_COLS, JSON.stringify(m)); } catch {}
}
function trackDeletedReq(reqId) {
  try { const m = JSON.parse(localStorage.getItem(LS_DELETED_REQS) || '{}'); m[reqId] = new Date().toISOString(); localStorage.setItem(LS_DELETED_REQS, JSON.stringify(m)); } catch {}
}
function getDeletedCols() { try { return JSON.parse(localStorage.getItem(LS_DELETED_COLS) || '{}'); } catch { return {}; } }
function getDeletedReqs() { try { return JSON.parse(localStorage.getItem(LS_DELETED_REQS) || '{}'); } catch { return {}; } }
function saveDeletedCols(map) { try { localStorage.setItem(LS_DELETED_COLS, JSON.stringify(map)); } catch {} }
function saveDeletedReqs(map) { try { localStorage.setItem(LS_DELETED_REQS, JSON.stringify(map)); } catch {} }

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
const METHOD_COLOR = {
  GET: '#10b981', POST: '#3b82f6', PUT: '#f59e0b',
  PATCH: '#8b5cf6', DELETE: '#ef4444', HEAD: '#6b7280', OPTIONS: '#6b7280',
};
const LANGS = ['Fetch', 'Axios', 'XHR', 'Node.js', 'cURL', 'Python', 'PHP', 'Ruby', 'Go', 'C#', 'Jest', 'Pytest'];
const BODY_TYPES = ['none', 'json', 'form-data', 'url-encoded', 'raw', 'graphql'];
const AUTH_TYPES = ['none', 'bearer', 'basic', 'api-key'];
const REQ_TABS = ['Params', 'Headers', 'Body', 'Auth', 'Env', 'Settings'];

let _id = 0;
const uid = () => ++_id;
const newRow = (k = '', v = '') => ({ id: uid(), key: k, value: v, enabled: true });
const esc1 = x => String(x).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const escD = x => String(x).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const noBodyMethod = m => ['GET', 'HEAD', 'OPTIONS'].includes(m);

function applyEnv(str, envVars) {
  if (!str || !envVars.length) return str;
  return str.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const found = envVars.find(v => v.key.trim() === key.trim() && v.enabled);
    return found !== undefined ? found.value : match;
  });
}

function fmtJson(raw, depth) {
  try {
    const pad = '  '.repeat(depth);
    return JSON.stringify(JSON.parse(raw || '{}'), null, 2).replace(/\n/g, '\n' + pad);
  } catch { return raw || '{}'; }
}

function buildUrl(url, params) {
  const base = url.trim() || 'https://api.example.com/endpoint';
  const rows = params.filter(p => p.enabled && p.key.trim());
  if (!rows.length) return base;
  const qs = rows.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&');
  return base + (base.includes('?') ? '&' : '?') + qs;
}

function calcHeaders(headers, auth, bodyType) {
  const h = [];
  if (bodyType === 'json' || bodyType === 'graphql') h.push(['Content-Type', 'application/json']);
  if (bodyType === 'url-encoded') h.push(['Content-Type', 'application/x-www-form-urlencoded']);
  if (auth.type === 'bearer' && auth.token)
    h.push(['Authorization', `Bearer ${auth.token}`]);
  if (auth.type === 'basic') {
    try {
      const encoded = btoa(`${auth.user}:${auth.pass}`);
      h.push(['Authorization', `Basic ${encoded}`]);
    } catch {}
  }
  const custom = headers.filter(h => h.enabled && h.key.trim()).map(h => [h.key.trim(), h.value]);
  return [...h, ...custom];
}

/* ── JSONPath evaluator ── */
function jsonPath(data, expr) {
  if (!expr || !expr.trim() || expr.trim() === '$') return data;
  const clean = expr.trim().replace(/^\$\.?/, '');
  if (!clean) return data;
  const parts = [];
  let i = 0;
  let buf = '';
  while (i < clean.length) {
    if (clean[i] === '.' && i + 1 < clean.length && clean[i + 1] !== '[') {
      if (buf) { parts.push(buf); buf = ''; }
      i++;
    } else if (clean[i] === '[') {
      if (buf) { parts.push(buf); buf = ''; }
      i++;
      let idx = '';
      while (i < clean.length && clean[i] !== ']') { idx += clean[i]; i++; }
      i++;
      parts.push(idx === '*' ? { star: true } : { idx: isNaN(Number(idx)) ? idx : parseInt(idx, 10) });
    } else {
      buf += clean[i];
      i++;
    }
  }
  if (buf) parts.push(buf);
  let curr = data;
  for (const part of parts) {
    if (curr === null || curr === undefined) return undefined;
    if (typeof part === 'object' && part.star) return Array.isArray(curr) ? curr : Object.values(curr);
    if (typeof part === 'object' && 'idx' in part) curr = Array.isArray(curr) ? curr[part.idx] : undefined;
    else curr = curr[part];
  }
  return curr;
}

/* ── Postman / Insomnia import ── */
function walkPostmanItems(items, out) {
  for (const item of items) {
    if (item.item) { walkPostmanItems(item.item, out); continue; }
    if (item.request) out.push({ name: item.name || '', request: item.request });
  }
}

function convertPostmanRequest(name, req) {
  const method = (req.method || 'GET').toUpperCase();
  let url = '';
  if (req.url) {
    url = typeof req.url === 'string' ? req.url : (req.url.raw || req.url.host?.join('.') || '');
    url = url.replace(/\{\{([^}]+)\}\}/g, '{{$1}}');
  }
  const headers = (req.header || []).filter(h => !h.disabled).map(h => newRow(h.key || '', h.value || ''));
  let bodyType = 'none';
  let bodyJson = '{\n  "key": "value"\n}';
  let formRows = [newRow()];
  let bodyRaw = '';
  let gqlQuery = '';
  let gqlVars = '';
  if (req.body && !noBodyMethod(method)) {
    const b = req.body;
    if (b.mode === 'raw') {
      const lang = b.options?.raw?.language || 'text';
      if (lang === 'json') { bodyType = 'json'; bodyJson = b.raw || '{}'; }
      else if (lang === 'graphql') {
        bodyType = 'graphql';
        try { const gql = JSON.parse(b.raw || '{}'); gqlQuery = gql.query || ''; gqlVars = JSON.stringify(gql.variables || {}, null, 2); }
        catch { gqlQuery = b.raw; }
      } else { bodyType = 'raw'; bodyRaw = b.raw || ''; }
    } else if (b.mode === 'urlencoded') {
      bodyType = 'url-encoded';
      formRows = (b.urlencoded || []).filter(f => !f.disabled).map(f => newRow(f.key || '', f.value || ''));
    } else if (b.mode === 'formdata') {
      bodyType = 'form-data';
      formRows = (b.formdata || []).filter(f => !f.disabled && f.type !== 'file').map(f => newRow(f.key || '', f.value || ''));
    }
  }
  let auth = { type: 'none', token: '', user: '', pass: '', apiKeyName: 'X-API-Key', apiKeyValue: '', apiKeyIn: 'header' };
  if (req.auth) {
    const a = req.auth;
    const val = (arr, key) => (arr || []).find(x => x.key === key)?.value || '';
    if (a.type === 'bearer') auth = { ...auth, type: 'bearer', token: val(a.bearer, 'token') };
    else if (a.type === 'basic') auth = { ...auth, type: 'basic', user: val(a.basic, 'username'), pass: val(a.basic, 'password') };
    else if (a.type === 'apikey') auth = { ...auth, type: 'api-key', apiKeyName: val(a.apikey, 'key'), apiKeyValue: val(a.apikey, 'value'), apiKeyIn: val(a.apikey, 'in') === 'query' ? 'query' : 'header' };
  }
  return { method, url, params: [newRow()], headers: headers.length ? headers : [newRow()], bodyType, bodyJson, formRows: formRows.length ? formRows : [newRow()], bodyRaw, auth, gqlQuery, gqlVars };
}

function convertInsomniaRequest(res) {
  const method = (res.method || 'GET').toUpperCase();
  const url = res.url || '';
  const headers = (res.headers || []).map(h => newRow(h.name || '', h.value || ''));
  let bodyType = 'none';
  let bodyJson = '{\n  "key": "value"\n}';
  let formRows = [newRow()];
  let bodyRaw = '';
  const b = res.body;
  if (b && !noBodyMethod(method)) {
    if (b.mimeType === 'application/json') { bodyType = 'json'; bodyJson = b.text || '{}'; }
    else if (b.mimeType === 'application/x-www-form-urlencoded') {
      bodyType = 'url-encoded';
      formRows = (b.params || []).map(p => newRow(p.name || '', p.value || ''));
    } else if (b.mimeType === 'multipart/form-data') {
      bodyType = 'form-data';
      formRows = (b.params || []).map(p => newRow(p.name || '', p.value || ''));
    } else if (b.text) { bodyType = 'raw'; bodyRaw = b.text; }
  }
  let auth = { type: 'none', token: '', user: '', pass: '', apiKeyName: 'X-API-Key', apiKeyValue: '', apiKeyIn: 'header' };
  if (res.authentication) {
    const a = res.authentication;
    if (a.type === 'bearer') auth = { ...auth, type: 'bearer', token: a.token || '' };
    else if (a.type === 'basic') auth = { ...auth, type: 'basic', user: a.username || '', pass: a.password || '' };
    else if (a.type === 'apikey') auth = { ...auth, type: 'api-key', apiKeyName: a.key || 'X-API-Key', apiKeyValue: a.value || '', apiKeyIn: a.addTo === 'queryParams' ? 'query' : 'header' };
  }
  return { method, url, params: [newRow()], headers: headers.length ? headers : [newRow()], bodyType, bodyJson, formRows: formRows.length ? formRows : [newRow()], bodyRaw, auth, gqlQuery: '', gqlVars: '' };
}

function parseImportFile(json) {
  if (json.info?._postman_id || json.item) {
    const items = [];
    walkPostmanItems(json.item || [], items);
    return items.map(i => ({ name: i.name, converted: convertPostmanRequest(i.name, i.request) }));
  }
  if (json.__export_format === 4 || json.resources) {
    const resources = json.resources || [];
    const requests = resources.filter(r => r._type === 'request');
    return requests.map(r => ({ name: r.name || r.url || 'Request', converted: convertInsomniaRequest(r) }));
  }
  if (json._type === 'export') {
    const resources = json.resources || [];
    return resources.filter(r => r._type === 'request').map(r => ({ name: r.name || r.url || 'Request', converted: convertInsomniaRequest(r) }));
  }
  throw new Error('Unrecognized format. Import a Postman Collection v2.1 or Insomnia v4 export.');
}

/* ── Code generators ── */
function genFetch({ method, fullUrl, hdrs, bodyType, bodyJson, formRows, bodyRaw }) {
  const noBody = noBodyMethod(method) || bodyType === 'none';
  const useFormData = !noBody && bodyType === 'form-data' && formRows.length;
  const lines = [];
  if (useFormData) {
    lines.push('const formData = new FormData();');
    formRows.forEach(([k, v]) => lines.push(`formData.append('${esc1(k)}', '${esc1(v)}');`));
    lines.push('');
  }
  const hList = useFormData ? hdrs.filter(([k]) => k.toLowerCase() !== 'content-type') : hdrs;
  const opts = [`  method: '${method}',`];
  if (hList.length) { opts.push('  headers: {'); hList.forEach(([k, v]) => opts.push(`    '${esc1(k)}': '${esc1(v)}',`)); opts.push('  },'); }
  if (!noBody) {
    if (bodyType === 'json') opts.push(`  body: JSON.stringify(${fmtJson(bodyJson, 1)}),`);
    else if (bodyType === 'url-encoded' && formRows.length) { opts.push('  body: new URLSearchParams({'); formRows.forEach(([k, v]) => opts.push(`    '${esc1(k)}': '${esc1(v)}',`)); opts.push('  }).toString(),'); }
    else if (useFormData) opts.push('  body: formData,');
    else if (bodyType === 'raw' && bodyRaw) opts.push(`  body: \`${bodyRaw}\`,`);
  }
  lines.push(`const response = await fetch('${fullUrl}', {`, ...opts, '});', '', 'const data = await response.json();', 'console.log(data);');
  return lines.join('\n');
}

function genAxios({ method, fullUrl, hdrs, bodyType, bodyJson, formRows, bodyRaw }) {
  const noBody = noBodyMethod(method) || bodyType === 'none';
  const useFormData = !noBody && bodyType === 'form-data' && formRows.length;
  const lines = ["import axios from 'axios';", ''];
  if (useFormData) {
    lines.push('const formData = new FormData();');
    formRows.forEach(([k, v]) => lines.push(`formData.append('${esc1(k)}', '${esc1(v)}');`));
    lines.push('');
  }
  const hList = useFormData ? hdrs.filter(([k]) => k.toLowerCase() !== 'content-type') : hdrs;
  const cfg = [];
  if (hList.length) { cfg.push('  headers: {'); hList.forEach(([k, v]) => cfg.push(`    '${esc1(k)}': '${esc1(v)}',`)); cfg.push('  },'); }
  const m = method.toLowerCase();
  const base = `'${fullUrl}'`;
  if (noBody || bodyType === 'none') {
    if (cfg.length) { lines.push(`const { data } = await axios.${m}(`); lines.push(`  ${base},`); lines.push('  {'); cfg.forEach(l => lines.push('  ' + l)); lines.push('  },'); lines.push(');'); }
    else { lines.push(`const { data } = await axios.${m}(${base});`); }
  } else {
    let bodyArg = '';
    if (bodyType === 'json') bodyArg = fmtJson(bodyJson, 1);
    else if (bodyType === 'url-encoded' && formRows.length) bodyArg = 'new URLSearchParams(' + JSON.stringify(Object.fromEntries(formRows)) + ').toString()';
    else if (useFormData) bodyArg = 'formData';
    else if (bodyType === 'raw' && bodyRaw) bodyArg = `\`${bodyRaw}\``;
    else bodyArg = 'null';
    lines.push(`const { data } = await axios.${m}(`);
    lines.push(`  ${base},`);
    lines.push(`  ${bodyArg},`);
    if (cfg.length) { lines.push('  {'); cfg.forEach(l => lines.push('  ' + l)); lines.push('  },'); }
    lines.push(');');
  }
  lines.push('console.log(data);');
  return lines.join('\n');
}

function genXHR({ method, fullUrl, hdrs, bodyType, bodyJson, formRows, bodyRaw }) {
  const noBody = noBodyMethod(method) || bodyType === 'none';
  const lines = ['const xhr = new XMLHttpRequest();', `xhr.open('${method}', '${fullUrl}');`];
  hdrs.forEach(([k, v]) => lines.push(`xhr.setRequestHeader('${esc1(k)}', '${esc1(v)}');`));
  lines.push('', 'xhr.onload = function() {', '  if (xhr.status >= 200 && xhr.status < 300) {', '    const data = JSON.parse(xhr.responseText);', '    console.log(data);', '  }', '};', '', 'xhr.onerror = function() {', "  console.error('Request failed');", '};', '');
  const useFormData = !noBody && bodyType === 'form-data' && formRows.length;
  if (useFormData) {
    lines.push('const formData = new FormData();');
    formRows.forEach(([k, v]) => lines.push(`formData.append('${esc1(k)}', '${esc1(v)}');`));
    lines.push('xhr.send(formData);');
  } else if (!noBody && bodyType === 'json') {
    lines.push(`xhr.send(JSON.stringify(${fmtJson(bodyJson, 0)}));`);
  } else if (!noBody && bodyType === 'url-encoded' && formRows.length) {
    const qs = formRows.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
    lines.push(`xhr.send('${qs}');`);
  } else if (!noBody && bodyType === 'raw' && bodyRaw) {
    lines.push(`xhr.send(\`${bodyRaw}\`);`);
  } else {
    lines.push('xhr.send();');
  }
  return lines.join('\n');
}

function genNodeFetch({ method, fullUrl, hdrs, bodyType, bodyJson, formRows, bodyRaw }) {
  const noBody = noBodyMethod(method) || bodyType === 'none';
  const lines = ['// Node.js 18+ (native fetch)', ''];
  const useFormData = !noBody && bodyType === 'form-data' && formRows.length;
  if (useFormData) {
    lines.push('const formData = new FormData();');
    formRows.forEach(([k, v]) => lines.push(`formData.append('${esc1(k)}', '${esc1(v)}');`));
    lines.push('');
  }
  const hList = useFormData ? hdrs.filter(([k]) => k.toLowerCase() !== 'content-type') : hdrs;
  const opts = [`  method: '${method}',`];
  if (hList.length) { opts.push('  headers: {'); hList.forEach(([k, v]) => opts.push(`    '${esc1(k)}': '${esc1(v)}',`)); opts.push('  },'); }
  if (!noBody) {
    if (bodyType === 'json') opts.push(`  body: JSON.stringify(${fmtJson(bodyJson, 1)}),`);
    else if (bodyType === 'url-encoded' && formRows.length) { opts.push('  body: new URLSearchParams({'); formRows.forEach(([k, v]) => opts.push(`    '${esc1(k)}': '${esc1(v)}',`)); opts.push('  }).toString(),'); }
    else if (useFormData) opts.push('  body: formData,');
    else if (bodyType === 'raw' && bodyRaw) opts.push(`  body: \`${bodyRaw}\`,`);
  }
  lines.push(`const response = await fetch('${fullUrl}', {`, ...opts, '});', '', 'const data = await response.json();', 'console.log(data);');
  return lines.join('\n');
}

function genCurl({ method, fullUrl, hdrs, bodyType, bodyJson, formRows, bodyRaw }) {
  const noBody = noBodyMethod(method) || bodyType === 'none';
  const useFormData = !noBody && bodyType === 'form-data';
  const hList = useFormData ? hdrs.filter(([k]) => k.toLowerCase() !== 'content-type') : hdrs;
  const parts = [`curl -X ${method} '${fullUrl}'`];
  hList.forEach(([k, v]) => parts.push(`  -H '${esc1(k)}: ${esc1(v)}'`));
  if (!noBody) {
    if (bodyType === 'json') {
      try { parts.push(`  -d '${esc1(JSON.stringify(JSON.parse(bodyJson || '{}')))}' `); }
      catch { parts.push(`  -d '${esc1(bodyJson)}'`); }
    } else if (bodyType === 'url-encoded') {
      formRows.forEach(([k, v]) => parts.push(`  --data-urlencode '${esc1(k)}=${esc1(v)}'`));
    } else if (bodyType === 'form-data') {
      formRows.forEach(([k, v]) => parts.push(`  -F '${esc1(k)}=${esc1(v)}'`));
    } else if (bodyType === 'raw' && bodyRaw) {
      parts.push(`  --data-raw '${esc1(bodyRaw)}'`);
    }
  }
  return parts.join(' \\\n');
}

function genPython({ method, url, paramRows, hdrs, bodyType, bodyJson, formRows, bodyRaw }) {
  const noBody = noBodyMethod(method) || bodyType === 'none';
  const base = url.trim() || 'https://api.example.com/endpoint';
  const m = method.toLowerCase();
  const lines = ['import requests', ''];
  const useFormData = !noBody && bodyType === 'form-data';
  const hList = useFormData ? hdrs.filter(([k]) => k.toLowerCase() !== 'content-type') : hdrs;
  const kwargs = [];
  if (hList.length) { kwargs.push('    headers={'); hList.forEach(([k, v]) => kwargs.push(`        '${esc1(k)}': '${esc1(v)}',`)); kwargs.push('    },'); }
  if (paramRows.length && !url.includes('?')) { kwargs.push('    params={'); paramRows.forEach(([k, v]) => kwargs.push(`        '${esc1(k)}': '${esc1(v)}',`)); kwargs.push('    },'); }
  if (!noBody) {
    if (bodyType === 'json') {
      try {
        const py = JSON.stringify(JSON.parse(bodyJson || '{}'), null, 4)
          .replace(/\n/g, '\n    ')
          .replace(/: true\b/g, ': True').replace(/: false\b/g, ': False').replace(/: null\b/g, ': None');
        kwargs.push(`    json=${py},`);
      } catch { kwargs.push(`    json={},`); }
    } else if (bodyType === 'url-encoded' && formRows.length) {
      kwargs.push('    data={'); formRows.forEach(([k, v]) => kwargs.push(`        '${esc1(k)}': '${esc1(v)}',`)); kwargs.push('    },');
    } else if (bodyType === 'form-data' && formRows.length) {
      kwargs.push('    files={'); formRows.forEach(([k, v]) => kwargs.push(`        '${esc1(k)}': (None, '${esc1(v)}'),`)); kwargs.push('    },');
    } else if (bodyType === 'raw' && bodyRaw) {
      kwargs.push(`    data='${esc1(bodyRaw)}',`);
    }
  }
  if (kwargs.length) {
    lines.push(`response = requests.${m}(`); lines.push(`    '${base}',`); lines.push(...kwargs); lines.push(')');
  } else {
    lines.push(`response = requests.${m}('${base}')`);
  }
  lines.push('', 'data = response.json()', 'print(data)');
  return lines.join('\n');
}

function phpVal(v, d = 0) {
  if (v === null) return 'null';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  const pad = '    '.repeat(d + 1);
  const out = '    '.repeat(d);
  if (Array.isArray(v)) {
    if (!v.length) return '[]';
    return `[\n${v.map(i => pad + phpVal(i, d + 1) + ',').join('\n')}\n${out}]`;
  }
  const entries = Object.entries(v).map(([k, val]) => `${pad}'${k}' => ${phpVal(val, d + 1)},`);
  return `[\n${entries.join('\n')}\n${out}]`;
}

function genPHP({ method, fullUrl, hdrs, bodyType, bodyJson, formRows, bodyRaw }) {
  const noBody = noBodyMethod(method) || bodyType === 'none';
  const useFormData = !noBody && bodyType === 'form-data';
  const hList = useFormData ? hdrs.filter(([k]) => k.toLowerCase() !== 'content-type') : hdrs;
  const lines = ['<?php', ''];
  lines.push('$ch = curl_init();');
  lines.push(`curl_setopt($ch, CURLOPT_URL, '${esc1(fullUrl)}');`);
  lines.push('curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);');
  if (method !== 'GET') lines.push(`curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${method}');`);
  if (hList.length) {
    lines.push('curl_setopt($ch, CURLOPT_HTTPHEADER, [');
    hList.forEach(([k, v]) => lines.push(`    '${esc1(k)}: ${esc1(v)}',`));
    lines.push(']);');
  }
  if (!noBody) {
    if (bodyType === 'json') {
      try { lines.push(`curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(${phpVal(JSON.parse(bodyJson || '{}'))}));`); }
      catch { lines.push(`curl_setopt($ch, CURLOPT_POSTFIELDS, '${esc1(bodyJson)}');`); }
    } else if (bodyType === 'url-encoded' && formRows.length) {
      lines.push('curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([');
      formRows.forEach(([k, v]) => lines.push(`    '${esc1(k)}' => '${esc1(v)}',`));
      lines.push(']));');
    } else if (bodyType === 'form-data' && formRows.length) {
      lines.push('curl_setopt($ch, CURLOPT_POSTFIELDS, [');
      formRows.forEach(([k, v]) => lines.push(`    '${esc1(k)}' => '${esc1(v)}',`));
      lines.push(']);');
    } else if (bodyType === 'raw' && bodyRaw) {
      lines.push(`curl_setopt($ch, CURLOPT_POSTFIELDS, '${esc1(bodyRaw)}');`);
    }
  }
  lines.push('', '$response = curl_exec($ch);', 'curl_close($ch);', '', '$data = json_decode($response, true);', 'print_r($data);');
  return lines.join('\n');
}

function genRuby({ method, url, paramRows, hdrs, bodyType, bodyJson, formRows, bodyRaw }) {
  const noBody = noBodyMethod(method) || bodyType === 'none';
  const base = url.trim() || 'https://api.example.com/endpoint';
  const m = method.charAt(0) + method.slice(1).toLowerCase();
  const lines = ["require 'net/http'", "require 'json'", "require 'uri'", ''];
  let uriStr = base;
  if (paramRows.length && !base.includes('?')) {
    uriStr += '?' + paramRows.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
  }
  lines.push(`uri = URI('${uriStr}')`, 'http = Net::HTTP.new(uri.host, uri.port)', "http.use_ssl = uri.scheme == 'https'", '');
  lines.push(`request = Net::HTTP::${m}.new(uri.request_uri)`);
  const useFormData = !noBody && bodyType === 'form-data';
  const hList = useFormData ? hdrs.filter(([k]) => k.toLowerCase() !== 'content-type') : hdrs;
  hList.forEach(([k, v]) => lines.push(`request['${esc1(k)}'] = '${esc1(v)}'`));
  if (!noBody) {
    if (bodyType === 'json') {
      try { lines.push('', `request.body = '${esc1(JSON.stringify(JSON.parse(bodyJson || '{}')))}'`); }
      catch { lines.push(`request.body = '${esc1(bodyJson)}'`); }
    } else if ((bodyType === 'url-encoded' || bodyType === 'form-data') && formRows.length) {
      lines.push('request.set_form_data({');
      formRows.forEach(([k, v]) => lines.push(`  '${esc1(k)}' => '${esc1(v)}',`));
      lines.push('})');
    } else if (bodyType === 'raw' && bodyRaw) {
      lines.push(`request.body = '${esc1(bodyRaw)}'`);
    }
  }
  lines.push('', 'response = http.request(request)', 'data = JSON.parse(response.body)', 'puts data');
  return lines.join('\n');
}

function genGo({ method, fullUrl, hdrs, bodyType, bodyJson, formRows, bodyRaw }) {
  const noBody = noBodyMethod(method) || bodyType === 'none';
  const lines = ['package main', ''];
  const imports = new Set(['fmt', 'io', 'net/http']);
  const body = [];
  let bodyArg = 'nil';
  const useFormData = !noBody && bodyType === 'form-data' && formRows.length;
  if (!noBody) {
    if (bodyType === 'json') {
      imports.add('bytes');
      try { body.push(`reqBody := []byte(\`${JSON.stringify(JSON.parse(bodyJson || '{}'))}\`)`); }
      catch { body.push(`reqBody := []byte(\`${bodyJson}\`)`); }
      bodyArg = 'bytes.NewBuffer(reqBody)';
    } else if (bodyType === 'url-encoded' && formRows.length) {
      imports.add('net/url'); imports.add('strings');
      body.push('params := url.Values{}');
      formRows.forEach(([k, v]) => body.push(`params.Set("${escD(k)}", "${escD(v)}")`));
      bodyArg = 'strings.NewReader(params.Encode())';
    } else if (useFormData) {
      imports.add('bytes'); imports.add('mime/multipart');
      body.push('var buf bytes.Buffer', 'mw := multipart.NewWriter(&buf)');
      formRows.forEach(([k, v]) => body.push(`mw.WriteField("${escD(k)}", "${escD(v)}")`));
      body.push('mw.Close()');
      bodyArg = '&buf';
    } else if (bodyType === 'raw' && bodyRaw) {
      imports.add('strings');
      bodyArg = `strings.NewReader("${escD(bodyRaw)}")`;
    }
  }
  lines.push('import (');
  [...imports].sort().forEach(i => lines.push(`\t"${i}"`));
  lines.push(')', '', 'func main() {');
  body.forEach(l => lines.push('\t' + l));
  if (body.length) lines.push('');
  lines.push(`\treq, _ := http.NewRequest("${method}", "${escD(fullUrl)}", ${bodyArg})`);
  const hList = useFormData ? hdrs.filter(([k]) => k.toLowerCase() !== 'content-type') : hdrs;
  hList.forEach(([k, v]) => lines.push(`\treq.Header.Set("${escD(k)}", "${escD(v)}")`));
  if (useFormData) lines.push('\treq.Header.Set("Content-Type", mw.FormDataContentType())');
  lines.push('', '\tclient := &http.Client{}', '\tresp, _ := client.Do(req)', '\tdefer resp.Body.Close()', '', '\trespBody, _ := io.ReadAll(resp.Body)', '\tfmt.Println(string(respBody))', '}');
  return lines.join('\n');
}

function genCSharp({ method, fullUrl, hdrs, bodyType, bodyJson, formRows, bodyRaw }) {
  const noBody = noBodyMethod(method) || bodyType === 'none';
  const useFormData = !noBody && bodyType === 'form-data';
  const lines = ['using System.Net.Http;', 'using System.Net.Http.Headers;'];
  if (!noBody && bodyType === 'json') lines.push('using System.Text;');
  lines.push('using System.Text.Json;', '', 'var client = new HttpClient();');
  const hList = useFormData ? hdrs.filter(([k]) => k.toLowerCase() !== 'content-type') : hdrs;
  hList.forEach(([k, v]) => {
    if (k.toLowerCase() === 'authorization') {
      const [scheme, ...rest] = v.split(' ');
      lines.push(`client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("${escD(scheme)}", "${escD(rest.join(' '))}");`);
    } else {
      lines.push(`client.DefaultRequestHeaders.Add("${escD(k)}", "${escD(v)}");`);
    }
  });
  if (!noBody) {
    lines.push('');
    if (bodyType === 'json') {
      lines.push('var content = new StringContent(');
      lines.push(`    JsonSerializer.Serialize(${fmtJson(bodyJson, 1)}),`);
      lines.push('    System.Text.Encoding.UTF8,', '    "application/json"', ');');
    } else if (bodyType === 'url-encoded' && formRows.length) {
      lines.push('var content = new FormUrlEncodedContent(new Dictionary<string, string> {');
      formRows.forEach(([k, v]) => lines.push(`    { "${escD(k)}", "${escD(v)}" },`));
      lines.push('});');
    } else if (bodyType === 'form-data' && formRows.length) {
      lines.push('var content = new MultipartFormDataContent();');
      formRows.forEach(([k, v]) => lines.push(`content.Add(new StringContent("${escD(v)}"), "${escD(k)}");`));
    } else if (bodyType === 'raw' && bodyRaw) {
      lines.push(`var content = new StringContent("${escD(bodyRaw)}");`);
    }
    lines.push('');
    const m = method.charAt(0) + method.slice(1).toLowerCase();
    if (method === 'DELETE' || method === 'HEAD') {
      lines.push(`var request = new HttpRequestMessage(HttpMethod.${m}, "${escD(fullUrl)}") { Content = content };`);
      lines.push('var response = await client.SendAsync(request);');
    } else {
      const asyncMethod = method === 'GET' ? 'GetAsync' : `${m}Async`;
      lines.push(`var response = await client.${asyncMethod}("${escD(fullUrl)}", content);`);
    }
  } else {
    lines.push('');
    if (method === 'HEAD') {
      lines.push(`var request = new HttpRequestMessage(HttpMethod.Head, "${escD(fullUrl)}");`, 'var response = await client.SendAsync(request);');
    } else {
      const asyncMethod = method === 'GET' ? 'GetAsync' : method === 'DELETE' ? 'DeleteAsync' : 'SendAsync';
      if (asyncMethod === 'SendAsync') {
        lines.push(`var request = new HttpRequestMessage(HttpMethod.${method.charAt(0) + method.slice(1).toLowerCase()}, "${escD(fullUrl)}");`, 'var response = await client.SendAsync(request);');
      } else {
        lines.push(`var response = await client.${asyncMethod}("${escD(fullUrl)}");`);
      }
    }
  }
  lines.push('var result = await response.Content.ReadAsStringAsync();', 'Console.WriteLine(result);');
  return lines.join('\n');
}

function genJest({ method, fullUrl, hdrs, bodyType, bodyJson, formRows }) {
  const noBody = noBodyMethod(method) || bodyType === 'none';
  const m = method.toLowerCase();
  const lines = ["import axios from 'axios';", ''];
  if (hdrs.length) {
    lines.push('const headers = {');
    hdrs.forEach(([k, v]) => lines.push(`  '${esc1(k)}': '${esc1(v)}',`));
    lines.push('};', '');
  }
  lines.push(`describe('${method} ${fullUrl}', () => {`);
  lines.push("  it('returns 200 for a valid request', async () => {");
  if (!noBody && bodyType === 'json') {
    lines.push(`    const body = ${fmtJson(bodyJson, 2)};`, '');
  } else if (!noBody && (bodyType === 'url-encoded' || bodyType === 'form-data') && formRows.length) {
    lines.push('    const body = {');
    formRows.forEach(([k, v]) => lines.push(`      '${esc1(k)}': '${esc1(v)}',`));
    lines.push('    };', '');
  }
  const cfgArg = hdrs.length ? `, { headers }` : '';
  if (noBody) {
    lines.push(`    const response = await axios.${m}('${fullUrl}'${cfgArg});`);
  } else {
    lines.push(`    const response = await axios.${m}('${fullUrl}', body${cfgArg});`);
  }
  lines.push(
    '', '    expect(response.status).toBe(200);',
    '    expect(response.data).toBeDefined();',
    '    // expect(response.data.id).toBeDefined();',
    '    // expect(response.data.items).toHaveLength(1);',
    '  });', '',
    "  it('handles auth errors', async () => {",
    "    const badCfg = { headers: { Authorization: 'Bearer invalid' } };",
    '    await expect(',
    noBody
      ? `      axios.${m}('${fullUrl}', badCfg),`
      : `      axios.${m}('${fullUrl}', {}, badCfg),`,
    "    ).rejects.toHaveProperty('response.status');",
    '  });',
    '});',
  );
  return lines.join('\n');
}

function genPytest({ method, fullUrl, hdrs, bodyType, bodyJson, formRows, bodyRaw }) {
  const noBody = noBodyMethod(method) || bodyType === 'none';
  const m = method.toLowerCase();
  const cls = 'Test' + method.charAt(0) + method.slice(1).toLowerCase();
  const lines = ['import pytest', 'import requests', '', ''];
  lines.push(`class ${cls}:`);
  lines.push(`    BASE_URL = '${fullUrl}'`);
  if (hdrs.length) {
    lines.push('    HEADERS = {');
    hdrs.forEach(([k, v]) => lines.push(`        '${esc1(k)}': '${esc1(v)}',`));
    lines.push('    }');
  } else {
    lines.push('    HEADERS = {}');
  }
  lines.push('');
  lines.push('    def test_successful_response(self):');
  const kwargs = ['headers=self.HEADERS'];
  if (!noBody) {
    if (bodyType === 'json') {
      try {
        const py = JSON.stringify(JSON.parse(bodyJson || '{}'), null, 4)
          .replace(/\n/g, '\n        ')
          .replace(/: true\b/g, ': True').replace(/: false\b/g, ': False').replace(/: null\b/g, ': None');
        lines.push(`        body = ${py}`);
      } catch { lines.push('        body = {}'); }
      kwargs.push('json=body');
    } else if (bodyType === 'url-encoded' && formRows.length) {
      lines.push('        body = {');
      formRows.forEach(([k, v]) => lines.push(`            '${esc1(k)}': '${esc1(v)}',`));
      lines.push('        }');
      kwargs.push('data=body');
    } else if (bodyType === 'form-data' && formRows.length) {
      lines.push('        files = {');
      formRows.forEach(([k, v]) => lines.push(`            '${esc1(k)}': (None, '${esc1(v)}'),`));
      lines.push('        }');
      kwargs.push('files=files');
    } else if (bodyType === 'raw' && bodyRaw) {
      lines.push(`        body = '${esc1(bodyRaw)}'`);
      kwargs.push('data=body');
    }
  }
  lines.push(`        response = requests.${m}(`);
  lines.push(`            self.BASE_URL,`);
  kwargs.forEach(kw => lines.push(`            ${kw},`));
  lines.push('        )');
  lines.push('', '        assert response.status_code == 200');
  lines.push('        data = response.json()');
  lines.push('        assert data is not None');
  lines.push('        # assert "id" in data');
  lines.push('        # assert data["name"] == "expected"');
  lines.push('');
  lines.push('    def test_unauthorized_returns_401(self):');
  lines.push(`        response = requests.${m}(`);
  lines.push(`            self.BASE_URL,`);
  lines.push("            headers={'Authorization': 'Bearer invalid'},");
  lines.push('        )');
  lines.push('        assert response.status_code in [401, 403]');
  return lines.join('\n');
}

function generateCode(lang, d) {
  try {
    switch (lang) {
      case 'Fetch':   return genFetch(d);
      case 'Axios':   return genAxios(d);
      case 'XHR':     return genXHR(d);
      case 'Node.js': return genNodeFetch(d);
      case 'cURL':    return genCurl(d);
      case 'Python':  return genPython(d);
      case 'PHP':     return genPHP(d);
      case 'Ruby':    return genRuby(d);
      case 'Go':      return genGo(d);
      case 'C#':      return genCSharp(d);
      case 'Jest':    return genJest(d);
      case 'Pytest':  return genPytest(d);
      default:        return '';
    }
  } catch (e) {
    return `// Error generating code:\n// ${e.message}`;
  }
}

/* ── Sub-components ── */

function KVEditor({ rows, onChange }) {
  const update = (id, field, val) => onChange(rows.map(r => r.id === id ? { ...r, [field]: val } : r));
  const remove = id => {
    const next = rows.filter(r => r.id !== id);
    onChange(next.length ? next : [newRow()]);
  };
  return (
    <div className={s.kvEditor}>
      {rows.map(row => (
        <div key={row.id} className={s.kvRow}>
          <input type="checkbox" checked={row.enabled} onChange={e => update(row.id, 'enabled', e.target.checked)} className={s.kvCheck} />
          <input className={s.kvKey} value={row.key} onChange={e => update(row.id, 'key', e.target.value)} placeholder="Key" />
          <span className={s.kvColon}>:</span>
          <input className={s.kvVal} value={row.value} onChange={e => update(row.id, 'value', e.target.value)} placeholder="Value" />
          <button className={s.kvDel} onClick={() => remove(row.id)} title="Remove">×</button>
        </div>
      ))}
      <button className={s.kvAdd} onClick={() => onChange([...rows, newRow()])}>+ Add</button>
    </div>
  );
}

function BodyPanel({ bodyType, setBodyType, bodyJson, setBodyJson, formRows, setFormRows, bodyRaw, setBodyRaw, gqlQuery, setGqlQuery, gqlVars, setGqlVars }) {
  return (
    <div className={s.bodyPanel}>
      <div className={s.bodyTypeTabs}>
        {BODY_TYPES.map(t => (
          <button key={t} className={`${s.bodyTypeBtn} ${bodyType === t ? s.bodyTypeBtnActive : ''}`} onClick={() => setBodyType(t)}>
            {t}
          </button>
        ))}
      </div>
      {bodyType === 'json' && (
        <textarea className={s.codeInput} value={bodyJson} onChange={e => setBodyJson(e.target.value)} placeholder={'{\n  "key": "value"\n}'} spellCheck={false} />
      )}
      {(bodyType === 'form-data' || bodyType === 'url-encoded') && (
        <KVEditor rows={formRows} onChange={setFormRows} />
      )}
      {bodyType === 'raw' && (
        <textarea className={s.codeInput} value={bodyRaw} onChange={e => setBodyRaw(e.target.value)} placeholder="Raw request body..." spellCheck={false} />
      )}
      {bodyType === 'graphql' && (
        <div className={s.gqlPanel}>
          <label className={s.fieldLabel}>Query</label>
          <textarea className={s.codeInput} value={gqlQuery} onChange={e => setGqlQuery(e.target.value)} placeholder={'{\n  user(id: "1") {\n    name\n    email\n  }\n}'} spellCheck={false} style={{ minHeight: 120 }} />
          <label className={s.fieldLabel} style={{ marginTop: 6 }}>Variables (JSON)</label>
          <textarea className={s.codeInput} value={gqlVars} onChange={e => setGqlVars(e.target.value)} placeholder={'{\n  "id": "1"\n}'} spellCheck={false} style={{ minHeight: 70 }} />
        </div>
      )}
      {bodyType === 'none' && (
        <div className={s.bodyNone}>No body will be sent with this request.</div>
      )}
    </div>
  );
}

function AuthPanel({ auth, setAuth }) {
  const upd = (k, v) => setAuth(a => ({ ...a, [k]: v }));
  return (
    <div className={s.authPanel}>
      <div className={s.authTypeTabs}>
        {AUTH_TYPES.map(t => (
          <button key={t} className={`${s.authTypeBtn} ${auth.type === t ? s.authTypeBtnActive : ''}`} onClick={() => upd('type', t)}>
            {t === 'none' ? 'None' : t === 'bearer' ? 'Bearer Token' : t === 'basic' ? 'Basic Auth' : 'API Key'}
          </button>
        ))}
      </div>
      {auth.type === 'bearer' && (
        <div className={s.authFields}>
          <label className={s.fieldLabel}>Token</label>
          <input className={s.input} value={auth.token} onChange={e => upd('token', e.target.value)} placeholder="your-bearer-token" />
          <p className={s.authHint}>Added as <code>Authorization: Bearer &lt;token&gt;</code></p>
        </div>
      )}
      {auth.type === 'basic' && (
        <div className={s.authFields}>
          <label className={s.fieldLabel}>Username</label>
          <input className={s.input} value={auth.user} onChange={e => upd('user', e.target.value)} placeholder="username" />
          <label className={s.fieldLabel} style={{ marginTop: 8 }}>Password</label>
          <input type="password" className={s.input} value={auth.pass} onChange={e => upd('pass', e.target.value)} placeholder="password" autoComplete="new-password" />
          <p className={s.authHint}>Base64-encoded and added as <code>Authorization: Basic &lt;encoded&gt;</code></p>
        </div>
      )}
      {auth.type === 'api-key' && (
        <div className={s.authFields}>
          <label className={s.fieldLabel}>Key Name</label>
          <input className={s.input} value={auth.apiKeyName} onChange={e => upd('apiKeyName', e.target.value)} placeholder="X-API-Key" />
          <label className={s.fieldLabel} style={{ marginTop: 8 }}>Key Value</label>
          <input className={s.input} value={auth.apiKeyValue} onChange={e => upd('apiKeyValue', e.target.value)} placeholder="your-api-key-value" />
          <div className={s.apiKeyLoc}>
            <label className={s.fieldLabel}>Add to</label>
            <div className={s.locBtns}>
              <button className={`${s.locBtn} ${auth.apiKeyIn === 'header' ? s.locBtnActive : ''}`} onClick={() => upd('apiKeyIn', 'header')}>Header</button>
              <button className={`${s.locBtn} ${auth.apiKeyIn === 'query' ? s.locBtnActive : ''}`} onClick={() => upd('apiKeyIn', 'query')}>Query Param</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EnvPanel({ envs, setEnvs, activeEnvId, setActiveEnvId }) {
  const activeEnv = envs.find(e => e.id === activeEnvId) || envs[0];
  const addEnv = () => {
    const id = 'env-' + uid();
    setEnvs(prev => [...prev, { id, name: 'new env', vars: [newRow()] }]);
    setActiveEnvId(id);
  };
  const removeEnv = (id, e) => {
    e.stopPropagation();
    const next = envs.filter(e => e.id !== id);
    if (!next.length) {
      const nid = 'env-' + uid();
      setEnvs([{ id: nid, name: 'dev', vars: [newRow()] }]);
      setActiveEnvId(nid);
    } else {
      setEnvs(next);
      if (activeEnvId === id) setActiveEnvId(next[0].id);
    }
  };
  const updateName = (id, name) => setEnvs(prev => prev.map(e => e.id === id ? { ...e, name } : e));
  const updateVars = (id, vars) => setEnvs(prev => prev.map(e => e.id === id ? { ...e, vars } : e));
  return (
    <div className={s.envPanel}>
      <div className={s.envTabRow}>
        {envs.map(env => (
          <button key={env.id} className={`${s.envTab} ${env.id === activeEnvId ? s.envTabActive : ''}`} onClick={() => setActiveEnvId(env.id)}>
            {env.name}
            {envs.length > 1 && <span className={s.envTabRemove} onClick={ev => removeEnv(env.id, ev)}>×</span>}
          </button>
        ))}
        <button className={s.envAddBtn} onClick={addEnv} title="Add environment">+</button>
      </div>
      {activeEnv && (
        <>
          <input className={s.envNameInput} value={activeEnv.name} onChange={e => updateName(activeEnv.id, e.target.value)} placeholder="Environment name" />
          <p className={s.envHint}>Use <code>{'{{VAR_NAME}}'}</code> in URLs, headers, or body values</p>
          <KVEditor rows={activeEnv.vars} onChange={vars => updateVars(activeEnv.id, vars)} />
        </>
      )}
    </div>
  );
}

function SettingsPanel({ baseUrl, setBaseUrl, reqTimeout, setReqTimeout, followRedirects, setFollowRedirects, onExport }) {
  return (
    <div className={s.settingsPanel}>
      <div className={s.settingsGroup}>
        <label className={s.fieldLabel}>Base URL Prefix</label>
        <input
          className={s.input}
          value={baseUrl}
          onChange={e => setBaseUrl(e.target.value)}
          placeholder="https://api.example.com/v1"
          spellCheck={false}
        />
        <p className={s.envHint}>Prepended to URLs that don&apos;t start with <code>http</code></p>
      </div>
      <div className={s.settingsGroup}>
        <label className={s.fieldLabel}>Request Timeout (ms)</label>
        <div className={s.settingsRow}>
          <input
            type="number"
            className={s.input}
            value={reqTimeout}
            onChange={e => setReqTimeout(Math.max(500, parseInt(e.target.value) || 30000))}
            min={500}
            max={300000}
            step={1000}
            style={{ maxWidth: 120 }}
          />
          <span className={s.settingsUnit}>ms</span>
        </div>
        <p className={s.envHint}>Request is aborted after this duration</p>
      </div>
      <div className={s.settingsGroup}>
        <label className={s.fieldLabel}>Follow Redirects</label>
        <div className={s.settingsRow}>
          <button className={`${s.locBtn} ${followRedirects ? s.locBtnActive : ''}`} onClick={() => setFollowRedirects(true)}>Yes (follow)</button>
          <button className={`${s.locBtn} ${!followRedirects ? s.locBtnActive : ''}`} onClick={() => setFollowRedirects(false)}>No (manual)</button>
        </div>
        <p className={s.envHint}>When disabled, 3xx responses are returned as-is</p>
      </div>
      <div className={s.settingsGroup}>
        <label className={s.fieldLabel}>Export Workspace</label>
        <button className={s.exportBtn} onClick={onExport}>⬇ Download workspace JSON</button>
        <p className={s.envHint}>Saves environments, history, and collections to a file</p>
      </div>
    </div>
  );
}

function HistoryPanel({ history, onRestore, onClear, onClose }) {
  return (
    <div className={s.historyOverlay} onClick={onClose}>
      <div className={s.historyPanel} onClick={e => e.stopPropagation()}>
        <div className={s.historyHeader}>
          <span className={s.historyTitle}>Request History</span>
          <div className={s.historyHeaderActions}>
            {history.length > 0 && <button className={s.historyClearBtn} onClick={onClear}>Clear all</button>}
            <button className={s.historyCloseBtn} onClick={onClose}>×</button>
          </div>
        </div>
        {history.length === 0
          ? <div className={s.historyEmpty}>No saved requests yet.</div>
          : <div className={s.historyList}>
              {history.map((item, i) => (
                <div key={i} className={s.historyItem} onClick={() => { onRestore(item); onClose(); }}>
                  <span className={s.historyMethod} style={{ color: METHOD_COLOR[item.method] || '#6b7280' }}>{item.method}</span>
                  <span className={s.historyUrl}>{item.url || 'https://api.example.com/endpoint'}</span>
                  <span className={s.historyTime}>{item.savedAt}</span>
                </div>
              ))}
            </div>
        }
      </div>
    </div>
  );
}

function ImportModal({ requests, onSelect, onClose }) {
  return (
    <div className={s.historyOverlay} onClick={onClose}>
      <div className={s.historyPanel} onClick={e => e.stopPropagation()}>
        <div className={s.historyHeader}>
          <span className={s.historyTitle}>Select Request to Import</span>
          <button className={s.historyCloseBtn} onClick={onClose}>×</button>
        </div>
        <div className={s.historyList}>
          {requests.map((r, i) => (
            <div key={i} className={s.historyItem} onClick={() => { onSelect(r.converted); onClose(); }}>
              <span className={s.historyMethod} style={{ color: METHOD_COLOR[r.converted.method] || '#6b7280' }}>{r.converted.method}</span>
              <span className={s.historyUrl}>{r.name}</span>
              <span className={s.historyTime}>{r.converted.url || ''}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SaveRequestModal({ collections, onSave, onClose }) {
  const [name, setName] = useState('');
  const [colId, setColId] = useState(collections[0]?.id || '__new__');
  const [newColName, setNewColName] = useState('');
  const isNew = colId === '__new__';
  return (
    <div className={s.historyOverlay} onClick={onClose}>
      <div className={s.historyPanel} style={{ maxHeight: 'auto' }} onClick={e => e.stopPropagation()}>
        <div className={s.historyHeader}>
          <span className={s.historyTitle}>Save Request</span>
          <button className={s.historyCloseBtn} onClick={onClose}>×</button>
        </div>
        <div className={s.saveModalBody}>
          <label className={s.fieldLabel}>Request Name</label>
          <input
            className={s.input}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Get User by ID"
            autoFocus
            onKeyDown={e => { if (e.key === 'Enter' && name.trim()) { onSave(name.trim(), isNew ? (newColName.trim() || 'My Collection') : colId, isNew); onClose(); } }}
          />
          <label className={s.fieldLabel} style={{ marginTop: 12 }}>Collection</label>
          <select className={s.input} value={colId} onChange={e => setColId(e.target.value)}>
            {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            <option value="__new__">+ New collection…</option>
          </select>
          {isNew && (
            <input
              className={s.input}
              style={{ marginTop: 6 }}
              value={newColName}
              onChange={e => setNewColName(e.target.value)}
              placeholder="Collection name"
            />
          )}
          <div className={s.saveModalActions}>
            <button className={s.cancelBtn} onClick={onClose}>Cancel</button>
            <button
              className={s.saveBtn}
              disabled={!name.trim()}
              onClick={() => { onSave(name.trim(), isNew ? (newColName.trim() || 'My Collection') : colId, isNew); onClose(); }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CollectionInlineGroup({ col, onLoad, onDelete, onDeleteCollection }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className={s.colHeader} onClick={() => setOpen(v => !v)}>
        <span className={s.colArrow}>{open ? '▾' : '▸'}</span>
        <span className={s.colName}>{col.name}</span>
        <span className={s.colCount}>{col.requests.length}</span>
        <button className={s.colDelBtn} onClick={e => { e.stopPropagation(); onDeleteCollection(col.id); }} title="Delete collection">×</button>
      </div>
      {open && col.requests.map(req => (
        <div key={req.id} className={s.colReqItem} onClick={() => onLoad(req)}>
          <span className={s.historyMethod} style={{ color: METHOD_COLOR[req.method] || '#6b7280' }}>{req.method}</span>
          <span className={s.colReqName}>{req.name}</span>
          <button className={s.colDelBtn} onClick={e => { e.stopPropagation(); onDelete(col.id, req.id); }} title="Remove">×</button>
        </div>
      ))}
    </div>
  );
}

function CollectionsPanel({ collections, onLoad, onDelete, onDeleteCollection, onImportWorkspace, onClose }) {
  const [openCol, setOpenCol] = useState(collections[0]?.id || null);
  const importRef = useRef(null);
  return (
    <div className={s.historyOverlay} onClick={onClose}>
      <div className={s.collectionsPanel} onClick={e => e.stopPropagation()}>
        <div className={s.historyHeader}>
          <span className={s.historyTitle}>Collections</span>
          <div className={s.historyHeaderActions}>
            <button className={s.headerBtn} onClick={() => importRef.current?.click()}>↑ Import workspace</button>
            <input ref={importRef} type="file" accept=".json" style={{ display: 'none' }} onChange={onImportWorkspace} />
            <button className={s.historyCloseBtn} onClick={onClose}>×</button>
          </div>
        </div>
        {collections.length === 0
          ? <div className={s.historyEmpty}>No collections yet. Use &quot;Save&quot; to save a request.</div>
          : <div className={s.historyList}>
              {collections.map(col => (
                <div key={col.id}>
                  <div className={s.colHeader} onClick={() => setOpenCol(openCol === col.id ? null : col.id)}>
                    <span className={s.colArrow}>{openCol === col.id ? '▾' : '▸'}</span>
                    <span className={s.colName}>{col.name}</span>
                    <span className={s.colCount}>{col.requests.length}</span>
                    <button
                      className={s.colDelBtn}
                      onClick={e => { e.stopPropagation(); onDeleteCollection(col.id); }}
                      title="Delete collection"
                    >×</button>
                  </div>
                  {openCol === col.id && col.requests.map(req => (
                    <div key={req.id} className={s.colReqItem} onClick={() => { onLoad(req); onClose(); }}>
                      <span className={s.historyMethod} style={{ color: METHOD_COLOR[req.method] || '#6b7280' }}>{req.method}</span>
                      <span className={s.colReqName}>{req.name}</span>
                      <span className={s.historyTime}>{req.url || ''}</span>
                      <button
                        className={s.colDelBtn}
                        onClick={e => { e.stopPropagation(); onDelete(col.id, req.id); }}
                        title="Remove"
                      >×</button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
        }
      </div>
    </div>
  );
}

function DiffModal({ pinned, current, onClose }) {
  const statusClass = r => !r ? '' : r.status < 300 ? s.statusOk : r.status < 400 ? s.statusWarn : s.statusErr;
  return (
    <div className={s.historyOverlay} onClick={onClose}>
      <div className={s.diffPanel} onClick={e => e.stopPropagation()}>
        <div className={s.historyHeader}>
          <span className={s.historyTitle}>Response Diff — Pinned vs Current</span>
          <button className={s.historyCloseBtn} onClick={onClose}>×</button>
        </div>
        <div className={s.diffBody}>
          {[{ label: 'Pinned', res: pinned }, { label: 'Current', res: current }].map(({ label, res }) => (
            <div key={label} className={s.diffCol}>
              <div className={s.diffColHeader}>
                <span className={s.diffColLabel}>{label}</span>
                {res && <span className={`${s.statusBadge} ${statusClass(res)}`}>{res.status} {res.statusText}</span>}
                {res && <span className={s.resMeta}>{res.time} ms · {res.size > 1024 ? `${(res.size / 1024).toFixed(1)} KB` : `${res.size} B`}</span>}
              </div>
              {res
                ? <pre className={s.diffCode}>{res.body || '(empty)'}</pre>
                : <div className={s.historyEmpty}>No response</div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function highlightJson(str) {
  const dark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  const COLORS = dark
    ? { key: '#60a5fa', str: '#4ade80', bool: '#c084fc', nil: '#94a3b8', num: '#fb923c' }
    : { key: '#0550ae', str: '#b45309', bool: '#7c3aed', nil: '#6b7280', num: '#1d4ed8' };
  const escaped = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escaped.replace(
    /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let color;
      if (/^"/.test(match)) color = /:$/.test(match) ? COLORS.key : COLORS.str;
      else if (/true|false/.test(match)) color = COLORS.bool;
      else if (/null/.test(match)) color = COLORS.nil;
      else color = COLORS.num;
      return `<span style="color:${color}">${match}</span>`;
    }
  );
}

function ResponsePanel({ response, responseError, sending, useCorsProxy, setUseCorsProxy, onRetry, pinnedResponse, onPin, onDiff }) {
  const [resTab, setResTab] = useState('body');
  const [jsonFilter, setJsonFilter] = useState('');
  const [copiedRes, setCopiedRes] = useState(false);

  const filteredBody = useMemo(() => {
    if (!response?.isJson || !jsonFilter.trim()) return null;
    try {
      const parsed = JSON.parse(response.body);
      const result = jsonPath(parsed, jsonFilter);
      return result === undefined ? '(no match)' : JSON.stringify(result, null, 2);
    } catch { return null; }
  }, [response, jsonFilter]);

  const displayBody = filteredBody !== null ? filteredBody : (response?.body || '');
  const isJson = filteredBody !== null ? true : response?.isJson;

  const handleCopyResponse = () => {
    if (!response) return;
    navigator.clipboard.writeText(response.body || '').then(() => {
      setCopiedRes(true);
      setTimeout(() => setCopiedRes(false), 1800);
    });
  };

  const handleDownload = () => {
    if (!response) return;
    const ext = response.isJson ? 'json' : 'txt';
    const blob = new Blob([response.body || ''], { type: response.isJson ? 'application/json' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `response.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const cookies = useMemo(() => {
    if (!response) return [];
    const raw = response.headers['set-cookie'] || response.headers['Set-Cookie'] || '';
    if (!raw) return [];
    return raw.split(',').map(c => c.trim()).filter(Boolean);
  }, [response]);

  if (sending) {
    return (
      <div className={s.resPanel}>
        <div className={s.resSending}><span className={s.resSpinner} /> Sending request…</div>
      </div>
    );
  }

  if (responseError) {
    const isCors = responseError === 'cors';
    return (
      <div className={s.resPanel}>
        <div className={s.resError}>
          <div className={s.resErrorTitle}>{isCors ? 'CORS Blocked' : 'Request Failed'}</div>
          <p className={s.resErrorMsg}>
            {isCors
              ? "The browser blocked this request due to the API's CORS policy."
              : responseError}
          </p>
          {isCors && (
            <>
              <button className={s.retryCorsBtn} onClick={() => onRetry(true)}>Retry with CORS Proxy</button>
              <p className={s.corsProxyNote}>Routes through corsproxy.io — do not use with sensitive credentials.</p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className={s.resPanel}>
        <div className={s.resEmpty}>
          Enter a URL and press <strong>Send</strong> to test your request in the browser.
        </div>
      </div>
    );
  }

  const statusClass = response.status < 300 ? s.statusOk : response.status < 400 ? s.statusWarn : s.statusErr;
  const sizeStr = response.size > 1024 ? `${(response.size / 1024).toFixed(1)} KB` : `${response.size} B`;

  return (
    <div className={s.resPanel}>
      {useCorsProxy && (
        <div className={s.corsProxyBanner}>
          Routed via CORS proxy
          <button className={s.corsProxyDisable} onClick={() => setUseCorsProxy(false)}>Disable</button>
        </div>
      )}
      <div className={s.resStatusBar}>
        <span className={`${s.statusBadge} ${statusClass}`}>{response.status} {response.statusText}</span>
        <span className={s.resMeta}>{response.time} ms</span>
        <span className={s.resMeta}>{sizeStr}</span>
        <div className={s.resActions}>
          <button className={`${s.resActionBtn} ${copiedRes ? s.resActionBtnOk : ''}`} onClick={handleCopyResponse} title="Copy response body">
            {copiedRes ? '✓' : '⎘'} Copy
          </button>
          <button className={s.resActionBtn} onClick={handleDownload} title="Download response">⬇ Save</button>
          <button
            className={`${s.resActionBtn} ${pinnedResponse ? s.resActionBtnPinned : ''}`}
            onClick={pinnedResponse ? onDiff : onPin}
            title={pinnedResponse ? 'Compare with pinned' : 'Pin for diff'}
          >
            {pinnedResponse ? '⇄ Diff' : '📌 Pin'}
          </button>
        </div>
      </div>

      <div className={s.resTabBar}>
        <button className={`${s.resTab} ${resTab === 'body' ? s.resTabActive : ''}`} onClick={() => setResTab('body')}>
          Body
        </button>
        <button className={`${s.resTab} ${resTab === 'headers' ? s.resTabActive : ''}`} onClick={() => setResTab('headers')}>
          Headers <span className={s.resHeadersCount}>{Object.keys(response.headers).length}</span>
        </button>
        <button className={`${s.resTab} ${resTab === 'cookies' ? s.resTabActive : ''}`} onClick={() => setResTab('cookies')}>
          Cookies {cookies.length > 0 && <span className={s.resHeadersCount}>{cookies.length}</span>}
        </button>
      </div>

      {resTab === 'body' && (
        <>
          {response.isJson && (
            <div className={s.jsonFilterBar}>
              <span className={s.jsonFilterLabel}>$.</span>
              <input
                className={s.jsonFilterInput}
                value={jsonFilter}
                onChange={e => setJsonFilter(e.target.value)}
                placeholder="data.users[0].name"
                spellCheck={false}
              />
              {jsonFilter && <button className={s.jsonFilterClear} onClick={() => setJsonFilter('')}>×</button>}
            </div>
          )}
          <div className={s.resBody}>
            {isJson
              ? <pre
                  className={`${s.resCode} ${s.resCodeLn}`}
                  dangerouslySetInnerHTML={{
                    __html: highlightJson(displayBody)
                      .split('\n')
                      .map(l => `<span class="${s.lnLine}">${l}</span>`)
                      .join(''),
                  }}
                />
              : <pre className={`${s.resCode} ${s.resCodeLn}`}>
                  {(displayBody || '(empty body)').split('\n').map((line, i) => (
                    <span key={i} className={s.lnLine}>{line}</span>
                  ))}
                </pre>
            }
          </div>
        </>
      )}

      {resTab === 'headers' && (
        <div className={s.resBody}>
          <div className={s.resHeaders}>
            {Object.entries(response.headers).map(([k, v]) => (
              <div key={k} className={s.resHeaderRow}>
                <span className={s.resHeaderKey}>{k}</span>
                <span className={s.resHeaderVal}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {resTab === 'cookies' && (
        <div className={s.resBody}>
          {cookies.length === 0
            ? <div className={s.cookiesEmpty}>
                <p>No <code>Set-Cookie</code> headers visible.</p>
                <p>Browsers restrict access to Set-Cookie headers from JavaScript for security. Cookies may still have been set — check DevTools &gt; Application &gt; Cookies.</p>
              </div>
            : <div className={s.resHeaders}>
                {cookies.map((c, i) => (
                  <div key={i} className={s.resHeaderRow}>
                    <span className={s.resHeaderKey}>Cookie {i + 1}</span>
                    <span className={s.resHeaderVal}>{c}</span>
                  </div>
                ))}
              </div>
          }
        </div>
      )}
    </div>
  );
}

/* ── Main Component ── */

export default function ApiRequestGeneratorTool() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [params, setParams] = useState([newRow()]);
  const [headers, setHeaders] = useState([newRow()]);
  const [bodyType, setBodyType] = useState('none');
  const [bodyJson, setBodyJson] = useState('{\n  "key": "value"\n}');
  const [formRows, setFormRows] = useState([newRow()]);
  const [bodyRaw, setBodyRaw] = useState('');
  const [gqlQuery, setGqlQuery] = useState('{\n  user(id: "1") {\n    name\n    email\n  }\n}');
  const [gqlVars, setGqlVars] = useState('{\n  "id": "1"\n}');
  const [auth, setAuth] = useState({ type: 'none', token: '', user: '', pass: '', apiKeyName: 'X-API-Key', apiKeyValue: '', apiKeyIn: 'header' });
  const [reqTab, setReqTab] = useState('Params');
  const [langTab, setLangTab] = useState('Fetch');
  const [copied, setCopied] = useState(false);

  // Settings
  const [baseUrl, setBaseUrl] = useState('');
  const [reqTimeout, setReqTimeout] = useState(30000);
  const [followRedirects, setFollowRedirects] = useState(true);

  // API test runner
  const [sending, setSending] = useState(false);
  const [response, setResponse] = useState(null);
  const [responseError, setResponseError] = useState('');
  const [useCorsProxy, setUseCorsProxy] = useState(false);
  const [rightView, setRightView] = useState('code');
  const [pinnedResponse, setPinnedResponse] = useState(null);
  const [diffOpen, setDiffOpen] = useState(false);

  // Env vars
  const [envs, setEnvs] = useState(() => [{ id: 'env-1', name: 'dev', vars: [newRow()] }]);
  const [activeEnvId, setActiveEnvId] = useState('env-1');

  // History
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Collections
  const [collections, setCollections] = useState([]);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [saveReqOpen, setSaveReqOpen] = useState(false);

  // Share
  const [sharedCopied, setSharedCopied] = useState(false);

  const syncRef     = useRef(null);

  // Import
  const [importModal, setImportModal] = useState(null);
  const [importError, setImportError] = useState('');
  const importRef = useRef(null);
  const historyDebounce = useRef(null);
  const collectionsDebounce = useRef(null);
  const mColor = METHOD_COLOR[method] || '#6b7280';

  const saveHistoryIdb    = useCallback((data) => {
    clearTimeout(historyDebounce.current);
    historyDebounce.current = setTimeout(() => idbSet('api-gen-history', data), 600);
  }, []);

  const saveCollectionsIdb = useCallback((data) => {
    clearTimeout(collectionsDebounce.current);
    collectionsDebounce.current = setTimeout(() => idbSet('api-gen-collections', data), 600);
  }, []);

  // Load from localStorage on mount (avoids hydration mismatch)
  useEffect(() => {
    idbGet('api-gen-history').then(v => { if (Array.isArray(v)) setHistory(v); });
    idbGet('api-gen-collections').then(v => { if (Array.isArray(v)) setCollections(v); });

    // Load shared request from URL
    const searchParams = new URLSearchParams(window.location.search);
    const req = searchParams.get('req');
    if (req) {
      try {
        const st = JSON.parse(decodeURIComponent(escape(atob(req))));
        applyState(st);
      } catch {}
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const activeEnvVars = useMemo(() => {
    const env = envs.find(e => e.id === activeEnvId) || envs[0];
    return env ? env.vars.filter(v => v.enabled && v.key.trim()) : [];
  }, [envs, activeEnvId]);

  const genData = useMemo(() => {
    const paramRows = params.filter(p => p.enabled && p.key.trim()).map(p => [p.key.trim(), p.value]);
    const filtFormRows = formRows.filter(r => r.enabled && r.key.trim()).map(r => [r.key.trim(), r.value]);

    const resolvedUrl = applyEnv(url, activeEnvVars);
    const resolvedHeaders = headers.map(h => ({ ...h, value: applyEnv(h.value, activeEnvVars) }));
    const resolvedBodyJson = applyEnv(bodyJson, activeEnvVars);
    const resolvedBodyRaw = applyEnv(bodyRaw, activeEnvVars);

    // Apply base URL prefix
    let effectiveUrl = resolvedUrl;
    if (baseUrl.trim() && resolvedUrl && !resolvedUrl.startsWith('http')) {
      effectiveUrl = baseUrl.replace(/\/$/, '') + '/' + resolvedUrl.replace(/^\//, '');
    }

    let effectiveBodyType = bodyType;
    let effectiveBodyJson = resolvedBodyJson;
    if (bodyType === 'graphql') {
      effectiveBodyType = 'json';
      try {
        const vars = JSON.parse(gqlVars || '{}');
        effectiveBodyJson = JSON.stringify({ query: gqlQuery, variables: vars }, null, 2);
      } catch {
        effectiveBodyJson = JSON.stringify({ query: gqlQuery, variables: {} }, null, 2);
      }
    }

    const allParams = auth.type === 'api-key' && auth.apiKeyIn === 'query' && auth.apiKeyValue
      ? [...params, { id: 'ak', key: auth.apiKeyName || 'api_key', value: auth.apiKeyValue, enabled: true }]
      : params;
    const finalUrl = buildUrl(effectiveUrl, allParams);
    const effHeaders = calcHeaders(resolvedHeaders, auth, bodyType);

    return {
      method, url: effectiveUrl,
      paramRows,
      fullUrl: finalUrl,
      hdrs: effHeaders,
      bodyType: effectiveBodyType,
      bodyJson: effectiveBodyJson,
      formRows: filtFormRows,
      bodyRaw: resolvedBodyRaw,
      auth,
    };
  }, [method, url, params, headers, bodyType, bodyJson, formRows, bodyRaw, auth, gqlQuery, gqlVars, activeEnvVars, baseUrl]);

  const code = useMemo(() => generateCode(langTab, genData), [langTab, genData]);
  const curlCode = useMemo(() => genCurl(genData), [genData]);

  async function getLocalData() {
    const collections = await idbGet('api-gen-collections') || [];
    const history = await idbGet('api-gen-history') || [];
    return { collections, history, deletedCols: getDeletedCols(), deletedReqs: getDeletedReqs(), historyClearedAt: getHistoryClearedAt() };
  }

  async function onPullData(remote) {
    const remoteCollections = remote.collections || [];
    const remoteHistory = remote.history || [];
    await idbSet('api-gen-collections', remoteCollections);
    await idbSet('api-gen-history', remoteHistory);
    setCollections(remoteCollections);
    setHistory(remoteHistory);
  }

  const saveToHistory = (snapshot) => {
    const now = new Date();
    const savedAt = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · ' +
      now.toLocaleDateString([], { month: 'short', day: 'numeric' });
    const entry = { ...snapshot, savedAt };
    setHistory(prev => {
      const filtered = prev.filter(h => !(h.method === snapshot.method && h.url === snapshot.url));
      const next = [entry, ...filtered].slice(0, 30);
      saveHistoryIdb(next);
      return next;
    });
  };

  const applyState = (st) => {
    setMethod(st.method || 'GET');
    setUrl(st.url || '');
    setParams(st.params?.length ? st.params : [newRow()]);
    setHeaders(st.headers?.length ? st.headers : [newRow()]);
    setBodyType(st.bodyType || 'none');
    setBodyJson(st.bodyJson || '{\n  "key": "value"\n}');
    setFormRows(st.formRows?.length ? st.formRows : [newRow()]);
    setBodyRaw(st.bodyRaw || '');
    setAuth(st.auth || { type: 'none', token: '', user: '', pass: '', apiKeyName: 'X-API-Key', apiKeyValue: '', apiKeyIn: 'header' });
    setGqlQuery(st.gqlQuery || '{\n  user(id: "1") {\n    name\n    email\n  }\n}');
    setGqlVars(st.gqlVars || '{\n  "id": "1"\n}');
  };

  const currentSnapshot = () => ({ method, url, params, headers, bodyType, bodyJson, formRows, bodyRaw, auth, gqlQuery, gqlVars });

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      saveToHistory(currentSnapshot());
    });
  };

  const handleShare = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(currentSnapshot()))));
      const shareUrl = `${window.location.origin}${window.location.pathname}?req=${encoded}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setSharedCopied(true);
        setTimeout(() => setSharedCopied(false), 2500);
      });
    } catch {}
  };

  const handleSend = async (forceProxy = false) => {
    const proxyActive = forceProxy || useCorsProxy;
    const targetUrl = proxyActive
      ? `https://corsproxy.io/?${encodeURIComponent(genData.fullUrl)}`
      : genData.fullUrl;

    setSending(true);
    setResponseError('');
    setRightView('response');
    const t0 = Date.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), reqTimeout);

    try {
      const opts = {
        method: genData.method,
        signal: controller.signal,
        redirect: followRedirects ? 'follow' : 'manual',
      };
      const noBody = noBodyMethod(genData.method) || genData.bodyType === 'none';

      const filteredHdrs = genData.hdrs.filter(([k]) =>
        noBody || genData.bodyType !== 'form-data' || k.toLowerCase() !== 'content-type'
      );
      if (filteredHdrs.length) opts.headers = Object.fromEntries(filteredHdrs);

      if (!noBody) {
        if (genData.bodyType === 'json') {
          opts.body = genData.bodyJson;
        } else if (genData.bodyType === 'url-encoded' && genData.formRows.length) {
          opts.body = genData.formRows.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
        } else if (genData.bodyType === 'form-data' && genData.formRows.length) {
          const fd = new FormData();
          genData.formRows.forEach(([k, v]) => fd.append(k, v));
          opts.body = fd;
        } else if (genData.bodyType === 'raw' && genData.bodyRaw) {
          opts.body = genData.bodyRaw;
        }
      }

      const res = await fetch(targetUrl, opts);
      clearTimeout(timer);
      const elapsed = Date.now() - t0;

      const resHeaders = {};
      res.headers.forEach((v, k) => { resHeaders[k] = v; });

      const ct = res.headers.get('content-type') || '';
      const isJson = ct.includes('json');
      let body = '';
      if (res.type === 'opaqueredirect') {
        body = `(redirect to ${res.url || 'unknown'} — follow redirects is disabled)`;
      } else if (isJson) {
        try { body = JSON.stringify(await res.json(), null, 2); }
        catch { body = await res.text(); }
      } else {
        body = await res.text();
      }

      const size = new Blob([body]).size;
      setResponse({ status: res.status || 302, statusText: res.statusText || 'Redirect', headers: resHeaders, body, time: elapsed, ok: res.ok, size, isJson });
      if (forceProxy) setUseCorsProxy(true);
      saveToHistory(currentSnapshot());
    } catch (err) {
      clearTimeout(timer);
      if (err.name === 'AbortError') {
        setResponseError(`Request timed out after ${reqTimeout}ms`);
      } else {
        const isCors = err instanceof TypeError &&
          (err.message.includes('fetch') || err.message.includes('Failed') || err.message.includes('NetworkError'));
        setResponseError(isCors && !proxyActive ? 'cors' : (err.message || 'Request failed'));
      }
      setResponse(null);
    } finally {
      setSending(false);
    }
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    setImportError('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        const requests = parseImportFile(json);
        if (requests.length === 1) {
          applyState(requests[0].converted);
        } else {
          setImportModal(requests);
        }
      } catch (err) {
        setImportError(err.message);
        setTimeout(() => setImportError(''), 4000);
      }
    };
    reader.readAsText(file);
  };

  const handleSaveRequest = (name, colIdOrName, isNewCol) => {
    const reqId = 'req-' + uid();
    const entry = { id: reqId, name, ...currentSnapshot() };
    setCollections(prev => {
      let next;
      if (isNewCol) {
        const colId = 'col-' + uid();
        next = [...prev, { id: colId, name: colIdOrName, requests: [entry] }];
      } else {
        next = prev.map(c => c.id === colIdOrName ? { ...c, requests: [...c.requests, entry] } : c);
      }
      saveCollectionsIdb(next);
      return next;
    });
  };

  const handleDeleteFromCollection = (colId, reqId) => {
    trackDeletedReq(reqId);
    setCollections(prev => {
      const next = prev.map(c => c.id === colId ? { ...c, requests: c.requests.filter(r => r.id !== reqId) } : c).filter(c => c.requests.length > 0);
      saveCollectionsIdb(next);
      return next;
    });
  };

  const handleDeleteCollection = (colId) => {
    trackDeletedCol(colId);
    setCollections(prev => {
      const next = prev.filter(c => c.id !== colId);
      saveCollectionsIdb(next);
      return next;
    });
  };

  const handleExportWorkspace = () => {
    const workspace = { version: 1, exportedAt: new Date().toISOString(), collections, history, environments: envs };
    const blob = new Blob([JSON.stringify(workspace, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'api-workspace.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportWorkspace = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.version === 1 && data.collections) {
          if (data.collections?.length) {
            setCollections(data.collections);
            saveCollectionsIdb(data.collections);
          }
          if (data.environments?.length) {
            setEnvs(data.environments);
            setActiveEnvId(data.environments[0]?.id || 'env-1');
          }
          if (data.history?.length) {
            setHistory(data.history);
            saveHistoryIdb(data.history);
          }
        } else {
          const requests = parseImportFile(data);
          if (requests.length === 1) applyState(requests[0].converted);
          else setImportModal(requests);
        }
      } catch (err) {
        setImportError(err.message);
        setTimeout(() => setImportError(''), 4000);
      }
    };
    reader.readAsText(file);
  };

  const paramCount = params.filter(p => p.key.trim()).length;
  const headerCount = headers.filter(h => h.key.trim()).length;
  const hasBody = bodyType !== 'none' && !noBodyMethod(method);
  const hasAuth = auth.type !== 'none';

  return (
    <div className={s.wrap}>
      <ApiToolsTopNav active="api-request-generator-tester" />
      <PlaygroundTopAd />
      {/* ── Header ── */}
      <div className={s.header}>
        <span className={s.logo}>
          <span className={s.logoIcon} style={{ borderColor: `${mColor}44`, background: `${mColor}15` }}>
            <span style={{ color: mColor, fontSize: 15, fontWeight: 800 }}>⇄</span>
          </span>
          <span>API Request <span className={s.accent}>Generator & Tester</span></span>
        </span>
        <div className={s.urlBar}>
          <select
            className={s.methodSelect}
            value={method}
            onChange={e => { setMethod(e.target.value); if (noBodyMethod(e.target.value)) setBodyType('none'); }}
            style={{ color: mColor, borderColor: `${mColor}55`, background: `${mColor}12` }}
          >
            {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <input
            className={s.urlInput}
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder={baseUrl ? `${baseUrl}/endpoint` : 'https://api.example.com/endpoint'}
            spellCheck={false}
            onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSend(); }}
          />
          <button
            className={`${s.sendBtn} ${sending ? s.sendBtnBusy : ''}`}
            onClick={() => handleSend()}
            disabled={sending}
            title="Send request (Ctrl+Enter)"
          >
            {sending ? '…' : 'Send'}
          </button>
        </div>
        <div className={s.headerActions}>
          <button className={`${s.headerBtn} ${sharedCopied ? s.headerBtnOk : ''}`} onClick={handleShare} title="Copy shareable link">
            {sharedCopied ? '✓ Copied!' : '⇡ Share'}
          </button>
          <button className={s.headerBtn} onClick={() => importRef.current?.click()} title="Import Postman or Insomnia collection">↑ Import</button>
          <input ref={importRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />

          <GistSyncButton ref={syncRef} toolKey="ar" fileName="fwd-api-requests.json" description="webdevpuneet.com — API Request Generator" getLocalData={getLocalData} onPullData={onPullData} />
        </div>
        <div className={s.headerBadges}>
          {importError && <span className={s.importError}>{importError}</span>}
          {hasBody && <span className={s.badge} style={{ color: '#f59e0b', borderColor: '#f59e0b44' }}>body</span>}
          {hasAuth && <span className={s.badge} style={{ color: '#10b981', borderColor: '#10b98144' }}>auth</span>}
          {baseUrl && <span className={s.badge} style={{ color: '#8b5cf6', borderColor: '#8b5cf644' }}>base url</span>}

        </div>
      </div>

      {/* ── Body ── */}
      <div className={s.body}>
        {/* Left panel — Collections + History */}
        <div className={s.leftPanel}>

          {/* Collections */}
          <div className={s.historyInline}>
            <div className={s.historyInlineHeader}>
              <span className={s.historyInlineTitle}>Collections</span>
              <button className={s.historyClearBtn} onClick={() => setSaveReqOpen(true)}>+ Save</button>
            </div>
            <div className={s.historyInlineList}>
              {collections.length === 0
                ? <div className={s.historyEmpty}>No collections yet. Save a request to start.</div>
                : collections.map(col => (
                    <CollectionInlineGroup
                      key={col.id}
                      col={col}
                      onLoad={req => applyState(req)}
                      onDelete={(colId, reqId) => {
                        trackDeletedReq(reqId);
                        setCollections(prev => {
                          const next = prev.map(c => c.id === colId ? { ...c, requests: c.requests.filter(r => r.id !== reqId) } : c).filter(c => c.requests.length > 0);
                          saveCollectionsIdb(next);
                          return next;
                        });
                      }}
                      onDeleteCollection={colId => {
                        trackDeletedCol(colId);
                        setCollections(prev => {
                          const next = prev.filter(c => c.id !== colId);
                          saveCollectionsIdb(next);
                          return next;
                        });
                      }}
                    />
                  ))
              }
            </div>
          </div>

          {/* History */}
          <div className={s.historyInline}>
            <div className={s.historyInlineHeader}>
              <span className={s.historyInlineTitle}>History</span>
              {history.length > 0 && (
                <button className={s.historyClearBtn} onClick={() => { setHistory([]); idbDel('api-gen-history'); setHistoryClearedAt(new Date().toISOString()); }}>Clear</button>
              )}
            </div>
            <div className={s.historyInlineList}>
              {history.length === 0
                ? <div className={s.historyEmpty}>No history yet.</div>
                : history.map((item, i) => (
                    <div key={i} className={s.historyInlineItem} onClick={() => applyState(item)}>
                      <div className={s.historyInlineTop}>
                        <span className={s.historyMethod} style={{ color: METHOD_COLOR[item.method] || '#6b7280' }}>{item.method}</span>
                        <span className={s.historyInlineDate}>{item.savedAt}</span>
                      </div>
                      <div className={s.historyInlineUrl}>{item.url || '—'}</div>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className={s.rightPanel}>
          {/* Request tabs — Params / Headers / Body / Auth / Env / Settings */}
          <div className={s.reqTabBar}>
            {REQ_TABS.map(tab => {
              const cnt = tab === 'Params' ? paramCount : tab === 'Headers' ? headerCount : 0;
              const active = tab === 'Body' ? hasBody : tab === 'Auth' ? hasAuth : tab === 'Settings' ? (!!baseUrl || reqTimeout !== 30000 || !followRedirects) : false;
              return (
                <button
                  key={tab}
                  className={`${s.reqTab} ${reqTab === tab ? s.reqTabActive : ''}`}
                  onClick={() => setReqTab(tab)}
                >
                  {tab}
                  {cnt > 0 && <span className={s.tabBadge}>{cnt}</span>}
                  {active && <span className={s.tabDot} />}
                </button>
              );
            })}
          </div>
          <div className={s.reqTabContent}>
            {reqTab === 'Params' && <KVEditor rows={params} onChange={setParams} />}
            {reqTab === 'Headers' && <KVEditor rows={headers} onChange={setHeaders} />}
            {reqTab === 'Body' && (
              <BodyPanel
                bodyType={bodyType} setBodyType={setBodyType}
                bodyJson={bodyJson} setBodyJson={setBodyJson}
                formRows={formRows} setFormRows={setFormRows}
                bodyRaw={bodyRaw} setBodyRaw={setBodyRaw}
                gqlQuery={gqlQuery} setGqlQuery={setGqlQuery}
                gqlVars={gqlVars} setGqlVars={setGqlVars}
              />
            )}
            {reqTab === 'Auth' && <AuthPanel auth={auth} setAuth={setAuth} />}
            {reqTab === 'Env' && <EnvPanel envs={envs} setEnvs={setEnvs} activeEnvId={activeEnvId} setActiveEnvId={setActiveEnvId} />}
            {reqTab === 'Settings' && (
              <SettingsPanel
                baseUrl={baseUrl} setBaseUrl={setBaseUrl}
                reqTimeout={reqTimeout} setReqTimeout={setReqTimeout}
                followRedirects={followRedirects} setFollowRedirects={setFollowRedirects}
                onExport={handleExportWorkspace}
              />
            )}
          </div>

          <div className={s.rightViewBar}>
            <button className={`${s.rightViewBtn} ${rightView === 'code' ? s.rightViewBtnActive : ''}`} onClick={() => setRightView('code')}>
              Code
            </button>
            <button className={`${s.rightViewBtn} ${rightView === 'response' ? s.rightViewBtnActive : ''}`} onClick={() => setRightView('response')}>
              Response
              {sending && <span className={s.statusDotSending} />}
              {!sending && response && <span className={`${s.statusDot} ${response.ok ? s.statusDotOk : s.statusDotErr}`} />}
            </button>
            {pinnedResponse && (
              <span className={s.pinnedBadge} title="Response pinned for diff" onClick={() => setPinnedResponse(null)}>
                📌 Pinned · clear
              </span>
            )}
          </div>
          {rightView === 'code' ? (
            <>
              <div className={s.langTabBar}>
                {LANGS.map(lang => (
                  <button key={lang} className={`${s.langTab} ${langTab === lang ? s.langTabActive : ''}`} onClick={() => setLangTab(lang)}>
                    {lang}
                  </button>
                ))}
                <button className={`${s.langTabCopyBtn} ${copied ? s.copyOk : ''}`} onClick={handleCopy}>
                  {copied ? '✓ Copied' : '⎘ Copy'}
                </button>
              </div>
              <div className={s.codeWrap}>
                <pre
                  className={`${s.code} ${s.codeLn}`}
                  dangerouslySetInnerHTML={{
                    __html: code
                      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                      .split('\n')
                      .map(l => `<span class="${s.lnLine}">${l}</span>`)
                      .join(''),
                  }}
                />
              </div>
              <div className={s.codeFooter}>
                <span className={s.langLabel}>{langTab}</span>
                <div className={s.codeFooterActions}>
                  <button className={`${s.copyBtn} ${copied ? s.copyOk : ''}`} onClick={handleCopy}>
                    {copied ? '✓ Copied' : '⎘ Copy'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <ResponsePanel
              response={response}
              responseError={responseError}
              sending={sending}
              useCorsProxy={useCorsProxy}
              setUseCorsProxy={setUseCorsProxy}
              onRetry={handleSend}
              pinnedResponse={pinnedResponse}
              onPin={() => response && setPinnedResponse(response)}
              onDiff={() => setDiffOpen(true)}
            />
          )}
        </div>
      </div>

      {/* ── Overlays ── */}
      {historyOpen && (
        <HistoryPanel
          history={history}
          onRestore={applyState}
          onClear={() => { setHistory([]); idbDel('api-gen-history'); setHistoryClearedAt(new Date().toISOString()); }}
          onClose={() => setHistoryOpen(false)}
        />
      )}
      {importModal && (
        <ImportModal requests={importModal} onSelect={applyState} onClose={() => setImportModal(null)} />
      )}
      {saveReqOpen && (
        <SaveRequestModal collections={collections} onSave={handleSaveRequest} onClose={() => setSaveReqOpen(false)} />
      )}
      {collectionsOpen && (
        <CollectionsPanel
          collections={collections}
          onLoad={applyState}
          onDelete={handleDeleteFromCollection}
          onDeleteCollection={handleDeleteCollection}
          onImportWorkspace={handleImportWorkspace}
          onClose={() => setCollectionsOpen(false)}
        />
      )}
      {diffOpen && pinnedResponse && (
        <DiffModal pinned={pinnedResponse} current={response} onClose={() => setDiffOpen(false)} />
      )}
    </div>
  );
}
