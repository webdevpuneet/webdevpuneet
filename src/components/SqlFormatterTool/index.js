'use client';

import { useState, useMemo, useRef, useCallback, useEffect, forwardRef } from 'react';
import s from './styles.module.css';
import DevConvertersTopNav from '@/components/DevConvertersTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
// ── SQL keyword set ───────────────────────────────────────────────────────────
const KW = new Set([
  'SELECT','DISTINCT','TOP','FROM','WHERE','AND','OR','XOR','NOT','IN','EXISTS',
  'BETWEEN','LIKE','ILIKE','GLOB','REGEXP','SIMILAR','IS','NULL','JOIN','INNER',
  'LEFT','RIGHT','FULL','OUTER','CROSS','NATURAL','STRAIGHT_JOIN','ON','USING',
  'GROUP','ORDER','BY','HAVING','LIMIT','OFFSET','FETCH','ROWS','ONLY',
  'UNION','ALL','INTERSECT','EXCEPT','MINUS',
  'INSERT','INTO','VALUES','UPDATE','SET','DELETE','REPLACE','TRUNCATE',
  'MERGE','UPSERT','CONFLICT','NOTHING','EXCLUDED','DO',
  'CREATE','TABLE','VIEW','INDEX','UNIQUE','MATERIALIZED','RECURSIVE',
  'DROP','ALTER','ADD','COLUMN','MODIFY','RENAME','CHANGE','TO',
  'WITH','AS','CASE','WHEN','THEN','ELSE','END','IF','RETURNING','OUTPUT',
  'PRIMARY','KEY','FOREIGN','REFERENCES','CHECK','DEFAULT','CONSTRAINT',
  'AUTO_INCREMENT','AUTOINCREMENT','SERIAL','IDENTITY','GENERATED','ALWAYS',
  'ASC','DESC','NULLS','FIRST','LAST','OVER','PARTITION','WINDOW',
  'UNBOUNDED','PRECEDING','FOLLOWING','CURRENT','ROW','RANGE',
  'TRANSACTION','BEGIN','COMMIT','ROLLBACK','SAVEPOINT','RELEASE',
  'EXPLAIN','ANALYZE','VERBOSE','LATERAL','PIVOT','UNPIVOT',
  'TRUE','FALSE','UNKNOWN','NULL',
  'INT','INTEGER','BIGINT','SMALLINT','TINYINT','FLOAT','DOUBLE','REAL',
  'DECIMAL','NUMERIC','VARCHAR','CHAR','NVARCHAR','TEXT','BLOB','CLOB',
  'BOOLEAN','BOOL','DATE','TIME','DATETIME','TIMESTAMP','JSON','JSONB',
  'UUID','XML','BINARY','VARBINARY','BIT',
  'COUNT','SUM','AVG','MIN','MAX','COALESCE','NULLIF','IFNULL','NVL','IIF',
  'CAST','CONVERT','TRY_CAST','EXTRACT','DATE_PART','DATEPART',
  'ROW_NUMBER','RANK','DENSE_RANK','NTILE','PERCENT_RANK','CUME_DIST',
  'LEAD','LAG','FIRST_VALUE','LAST_VALUE',
  'NOW','GETDATE','CURRENT_DATE','CURRENT_TIME','CURRENT_TIMESTAMP',
  'CONCAT','LENGTH','LEN','TRIM','LTRIM','RTRIM','UPPER','LOWER','SUBSTR',
  'SUBSTRING','REPLACE','CHARINDEX','INSTR','POSITION','LOCATE',
  'ROUND','FLOOR','CEIL','CEILING','ABS','MOD','POWER','SQRT',
  'ISNULL','ISZERO','BETWEEN','CASE','DECODE',
  'FOR','IN','OUT','INOUT','VARIADIC','FUNCTION','PROCEDURE','LANGUAGE',
  'RETURNS','DECLARE','EXCEPTION','RAISE','PERFORM','LOOP','WHILE',
  'FOREACH','NOTICE','CALL','EXEC','EXECUTE',
  'GRANT','REVOKE','PRIVILEGES','ON','TO','WITH','OPTION',
  'DATABASE','SCHEMA','SEQUENCE','TRIGGER','EVENT','RULE','TYPE',
  'NOTNULL','NOLOCK','READUNCOMMITTED','ROWLOCK','TABLOCK','UPDLOCK',
]);

// Top-level clause keywords → own line at base indent
const CLAUSE_KW = new Set([
  'SELECT','FROM','WHERE','ON','SET','RETURNING','OUTPUT','WITH',
  'JOIN','INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL JOIN','FULL OUTER JOIN',
  'LEFT OUTER JOIN','RIGHT OUTER JOIN','CROSS JOIN','NATURAL JOIN','STRAIGHT_JOIN',
  'GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET','FETCH',
  'UNION','UNION ALL','INTERSECT','EXCEPT','MINUS',
  'INSERT INTO','UPDATE','DELETE FROM','REPLACE INTO','TRUNCATE',
  'MERGE INTO','UPSERT INTO',
  'CREATE TABLE','CREATE VIEW','CREATE OR REPLACE VIEW','CREATE MATERIALIZED VIEW',
  'CREATE INDEX','CREATE UNIQUE INDEX',
  'DROP TABLE','DROP VIEW','DROP INDEX','DROP SCHEMA','DROP DATABASE',
  'ALTER TABLE',
  'VALUES',
]);

// Clauses whose comma-separated items each go on a new indented line
const COMMA_NEWLINE_CTX = new Set([
  'SELECT','SET','GROUP BY','ORDER BY','VALUES','RETURNING','OUTPUT',
]);

// Multi-word keywords to collapse (longest first)
const MULTI_KW = [
  ['FULL','OUTER','JOIN'],['LEFT','OUTER','JOIN'],['RIGHT','OUTER','JOIN'],
  ['CREATE','OR','REPLACE','VIEW'],['CREATE','MATERIALIZED','VIEW'],
  ['CREATE','UNIQUE','INDEX'],['CREATE','TABLE'],['CREATE','VIEW'],
  ['CREATE','INDEX'],['DROP','TABLE'],['DROP','VIEW'],['DROP','INDEX'],
  ['DROP','SCHEMA'],['DROP','DATABASE'],['ALTER','TABLE'],
  ['INSERT','INTO'],['REPLACE','INTO'],['DELETE','FROM'],
  ['MERGE','INTO'],['UPSERT','INTO'],['TRUNCATE','TABLE'],
  ['LEFT','JOIN'],['RIGHT','JOIN'],['INNER','JOIN'],['CROSS','JOIN'],
  ['NATURAL','JOIN'],['FULL','JOIN'],
  ['UNION','ALL'],['GROUP','BY'],['ORDER','BY'],['PARTITION','BY'],
  ['NOT','BETWEEN'],['NOT','EXISTS'],['NOT','LIKE'],['NOT','IN'],
  ['NOT','NULL'],['IS','NOT','NULL'],['IS','NULL'],
  ['NULLS','FIRST'],['NULLS','LAST'],
];

// ── Tokenizer ─────────────────────────────────────────────────────────────────
function tokenize(sql) {
  const toks = [];
  let i = 0;
  const n = sql.length;

  while (i < n) {
    const c = sql[i];

    // Block comment
    if (c === '/' && sql[i + 1] === '*') {
      const end = sql.indexOf('*/', i + 2);
      const v = end < 0 ? sql.slice(i) : sql.slice(i, end + 2);
      toks.push({ t: 'comment', v });
      i += v.length;
      continue;
    }

    // Line comment — or #
    if ((c === '-' && sql[i + 1] === '-') || c === '#') {
      const end = sql.indexOf('\n', i);
      const v = end < 0 ? sql.slice(i) : sql.slice(i, end);
      toks.push({ t: 'comment', v: v.trimEnd() });
      i += v.length;
      continue;
    }

    // Single-quoted string (handles '' escaping and backslash)
    if (c === "'") {
      let j = i + 1;
      while (j < n) {
        if (sql[j] === '\\') { j += 2; continue; }
        if (sql[j] === "'" && sql[j + 1] === "'") { j += 2; continue; }
        if (sql[j] === "'") { j++; break; }
        j++;
      }
      toks.push({ t: 'string', v: sql.slice(i, j) });
      i = j;
      continue;
    }

    // Dollar-quoted string (PostgreSQL) $$...$$
    if (c === '$') {
      const tagEnd = sql.indexOf('$', i + 1);
      if (tagEnd > i) {
        const tag = sql.slice(i, tagEnd + 1);
        const close = sql.indexOf(tag, tagEnd + 1);
        const v = close < 0 ? sql.slice(i) : sql.slice(i, close + tag.length);
        toks.push({ t: 'string', v });
        i += v.length;
        continue;
      }
    }

    // Quoted identifier: `backtick`, "double", [bracket]
    if (c === '`' || c === '"' || c === '[') {
      const close = c === '[' ? ']' : c;
      let j = i + 1;
      while (j < n && sql[j] !== close) { if (sql[j] === '\\') j++; j++; }
      if (j < n) j++;
      toks.push({ t: 'ident', v: sql.slice(i, j) });
      i = j;
      continue;
    }

    // Skip whitespace
    if (/\s/.test(c)) { i++; continue; }

    // Number (int, float, hex 0x, binary 0b)
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(sql[i + 1] || ''))) {
      let j = i;
      if (sql[i] === '0' && (sql[i + 1] === 'x' || sql[i + 1] === 'X')) j += 2;
      while (j < n && /[0-9a-fA-F._eExXbBoO]/.test(sql[j])) j++;
      toks.push({ t: 'number', v: sql.slice(i, j) });
      i = j;
      continue;
    }

    // Dot (qualified name)
    if (c === '.') { toks.push({ t: 'dot', v: '.' }); i++; continue; }

    // Punctuation
    if ('(),;'.includes(c)) { toks.push({ t: 'punct', v: c }); i++; continue; }

    // Operators (multi-char)
    if (/[=<>!|&+\-*/%^~:]/.test(c)) {
      let j = i;
      while (j < n && /[=<>!|&+\-*/%^~:]/.test(sql[j])) j++;
      toks.push({ t: 'op', v: sql.slice(i, j) });
      i = j;
      continue;
    }

    // Word (keyword or identifier)
    if (/[a-zA-Z_@#$]/.test(c)) {
      let j = i;
      while (j < n && /[a-zA-Z0-9_@#$]/.test(sql[j])) j++;
      const raw = sql.slice(i, j);
      const up = raw.toUpperCase();
      toks.push({ t: KW.has(up) ? 'kw' : 'word', v: raw, up });
      i = j;
      continue;
    }

    toks.push({ t: 'other', v: c });
    i++;
  }
  return toks;
}

// Collapse adjacent tokens into multi-word keywords
function collapseMulti(toks) {
  const out = [];
  let i = 0;
  while (i < toks.length) {
    let matched = false;
    for (const mw of MULTI_KW) {
      const slice = toks.slice(i, i + mw.length);
      if (slice.length === mw.length &&
          slice.every((t, j) => (t.t === 'kw' || t.t === 'word') && t.up === mw[j])) {
        out.push({ t: 'kw', v: slice.map(t => t.v).join(' '), up: mw.join(' ') });
        i += mw.length;
        matched = true;
        break;
      }
    }
    if (!matched) { out.push(toks[i]); i++; }
  }
  return out;
}

// ── Formatter ─────────────────────────────────────────────────────────────────
function formatSQL(sql, { tabSize = 2, kwCase = 'upper' } = {}) {
  if (!sql.trim()) return '';
  const IND = ' '.repeat(tabSize);
  const kw = (s) => {
    if (kwCase === 'upper') return s.toUpperCase();
    if (kwCase === 'lower') return s.toLowerCase();
    return s;
  };

  const toks = collapseMulti(tokenize(sql));
  const lines = [];
  let cur = '';
  let depth = 0;        // subquery nesting depth
  let ctx = null;       // current top-level clause
  const stack = [];     // 'sub' | 'par' | 'case'
  let afterClause = false;

  const ind = (extra = 0) => IND.repeat(Math.max(0, depth + extra));

  const commit = () => {
    const t = cur.replace(/\s+$/, '');
    if (t.trim()) lines.push(t);
    cur = '';
  };

  const appendSp = (v) => {
    if (!cur.trim()) { cur += v; return; }
    const last = cur[cur.length - 1];
    const noSpace = last === '(' || last === '.' || last === ' ' ||
                    v === ')' || v === ',' || v === '.' || v === ';' || v.startsWith(' ');
    if (!noSpace) cur += ' ';
    cur += v;
  };

  for (let i = 0; i < toks.length; i++) {
    const tok = toks[i];
    const up = tok.up || '';

    // ── Comment ──
    if (tok.t === 'comment') {
      commit();
      lines.push(ind() + tok.v);
      continue;
    }

    // ── Semicolon ──
    if (tok.t === 'punct' && tok.v === ';') {
      cur += ';';
      commit();
      lines.push('');
      depth = 0; ctx = null;
      stack.length = 0;
      continue;
    }

    // ── Top-level clause keyword ──
    if (tok.t === 'kw' && CLAUSE_KW.has(up)) {
      commit();
      ctx = up;
      afterClause = true;
      cur = ind() + kw(tok.v);
      continue;
    }

    // ── AND / OR in WHERE / HAVING / ON ──
    if (tok.t === 'kw' && (up === 'AND' || up === 'OR' || up === 'XOR') &&
        ctx && ['WHERE', 'HAVING', 'ON'].includes(ctx)) {
      commit();
      cur = ind() + '  ' + kw(tok.v);
      continue;
    }

    // ── CASE ──
    if (tok.t === 'kw' && up === 'CASE') {
      if (afterClause) { afterClause = false; cur += ' '; }
      appendSp(kw(tok.v));
      depth++;
      stack.push('case');
      continue;
    }

    // ── WHEN / ELSE inside CASE ──
    if (tok.t === 'kw' && (up === 'WHEN' || up === 'ELSE') &&
        stack[stack.length - 1] === 'case') {
      commit();
      cur = ind() + kw(tok.v);
      continue;
    }

    // ── END closing CASE ──
    if (tok.t === 'kw' && up === 'END' && stack[stack.length - 1] === 'case') {
      commit();
      depth = Math.max(0, depth - 1);
      stack.pop();
      cur = ind() + kw(tok.v);
      continue;
    }

    // ── Opening paren ──
    if (tok.t === 'punct' && tok.v === '(') {
      // peek past comments for next meaningful token
      const next = toks.slice(i + 1).find(t => t.t !== 'comment');
      const isSub = next && (next.up === 'SELECT' || next.up === 'WITH');
      if (afterClause) { afterClause = false; cur += ' '; }
      // No space before ( when preceded by a word/identifier (function call)
      const lastNonSpace = cur.trimEnd().slice(-1);
      if (/[a-zA-Z0-9_$]/.test(lastNonSpace)) cur += '(';
      else appendSp('(');
      if (isSub) {
        commit();
        depth++;
        stack.push('sub');
        ctx = null;
      } else {
        stack.push('par');
      }
      continue;
    }

    // ── Closing paren ──
    if (tok.t === 'punct' && tok.v === ')') {
      const pctx = stack.pop() || 'par';
      if (pctx === 'sub') {
        commit();
        depth = Math.max(0, depth - 1);
        cur = ind() + ')';
      } else {
        cur += ')';
      }
      continue;
    }

    // ── Comma ──
    if (tok.t === 'punct' && tok.v === ',') {
      const inColCtx = ctx && COMMA_NEWLINE_CTX.has(ctx);
      cur += ',';
      if (inColCtx) {
        commit();
        cur = ind(1);
      }
      afterClause = false;
      continue;
    }

    // ── Dot ── (no spaces)
    if (tok.t === 'dot') {
      cur += '.';
      continue;
    }

    // ── Operator ──
    if (tok.t === 'op') {
      if (afterClause) { afterClause = false; cur += ' '; }
      const last = cur[cur.length - 1];
      if (last && last !== ' ' && last !== '(') cur += ' ';
      cur += tok.v;
      if (tok.v !== '::') cur += ' '; // :: is PG cast, no trailing space needed
      continue;
    }

    // ── First item after clause keyword (SELECT, FROM, etc.) ──
    if (afterClause) {
      afterClause = false;
      // Items after SELECT/SET/VALUES etc. → new indented line
      if (ctx && COMMA_NEWLINE_CTX.has(ctx)) {
        commit();
        cur = ind(1);
      } else {
        cur += ' ';
      }
    }

    // ── Keyword (non-clause) ──
    if (tok.t === 'kw') { appendSp(kw(tok.v)); continue; }

    // ── Anything else ──
    appendSp(tok.v);
  }

  commit();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  return lines.join('\n');
}

// ── Minifier ──────────────────────────────────────────────────────────────────
function minifySQL(sql) {
  if (!sql.trim()) return '';
  const toks = tokenize(sql);
  const parts = [];
  for (const tok of toks) {
    if (tok.t === 'comment') continue; // strip comments
    if (tok.t === 'dot') { parts.push('.'); continue; }
    if (tok.t === 'punct' || tok.t === 'op') {
      const last = parts[parts.length - 1] || '';
      if (tok.t === 'op') {
        if (last && !last.endsWith(' ')) parts.push(' ');
        parts.push(tok.v + ' ');
      } else {
        if (tok.v === ',') parts.push(', ');
        else if (tok.v === '(') { if (last && !last.endsWith(' ') && last !== '(') parts.push(' '); parts.push('('); }
        else if (tok.v === ')') parts.push(')');
        else if (tok.v === ';') parts.push('; ');
        else parts.push(tok.v);
      }
      continue;
    }
    const last = parts[parts.length - 1] || '';
    if (last && !last.endsWith(' ') && last !== '(' && !last.endsWith('.') && tok.v !== '.' && tok.v !== ')') {
      parts.push(' ');
    }
    parts.push(tok.v);
  }
  return parts.join('').replace(/\s{2,}/g, ' ').replace(/\s+;/g, ';').trim();
}

// ── Syntax highlighter ────────────────────────────────────────────────────────
function highlightSQL(sql) {
  if (!sql) return '';
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const toks = tokenize(sql);

  return toks.map(tok => {
    const v = esc(tok.v);
    if (tok.t === 'comment')  return `<span class="sql-cm">${v}</span>`;
    if (tok.t === 'string')   return `<span class="sql-st">${v}</span>`;
    if (tok.t === 'number')   return `<span class="sql-nm">${v}</span>`;
    if (tok.t === 'ident')    return `<span class="sql-id">${v}</span>`;
    if (tok.t === 'op')       return `<span class="sql-op"> ${v} </span>`;
    if (tok.t === 'dot')      return '.';
    if (tok.t === 'punct') {
      if (tok.v === ',' || tok.v === ';') return `<span class="sql-pu">${v}</span>`;
      return `<span class="sql-br">${v}</span>`;
    }
    if (tok.t === 'kw') {
      const up = tok.up || tok.v.toUpperCase();
      if (CLAUSE_KW.has(up)) return `<span class="sql-cl">${v}</span>`;
      return `<span class="sql-kw">${v}</span>`;
    }
    return v;
  }).join(' ').replace(/\s+/g, ' ');
}

// Highlight pre-formatted SQL — walks char-by-char so whitespace is preserved exactly
function highlightFormatted(formatted) {
  if (!formatted) return '';
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return formatted.split('\n').map(line => {
    let out = '';
    let i = 0;
    const n = line.length;

    while (i < n) {
      const c = line[i];

      // Whitespace — emit as-is (preserves all formatter spacing)
      if (/\s/.test(c)) { out += c; i++; continue; }

      // Line comment
      if ((c === '-' && line[i + 1] === '-') || c === '#') {
        out += `<span class="sql-cm">${esc(line.slice(i))}</span>`;
        break;
      }

      // Single-quoted string
      if (c === "'") {
        let j = i + 1;
        while (j < n) {
          if (line[j] === '\\') { j += 2; continue; }
          if (line[j] === "'" && line[j + 1] === "'") { j += 2; continue; }
          if (line[j] === "'") { j++; break; }
          j++;
        }
        out += `<span class="sql-st">${esc(line.slice(i, j))}</span>`;
        i = j; continue;
      }

      // Quoted identifier: `backtick`, "double", [bracket]
      if (c === '`' || c === '"' || c === '[') {
        const close = c === '[' ? ']' : c;
        let j = i + 1;
        while (j < n && line[j] !== close) j++;
        if (j < n) j++;
        out += `<span class="sql-id">${esc(line.slice(i, j))}</span>`;
        i = j; continue;
      }

      // Number
      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(line[i + 1] || ''))) {
        let j = i;
        while (j < n && /[0-9a-fA-F._eExX]/.test(line[j])) j++;
        out += `<span class="sql-nm">${esc(line.slice(i, j))}</span>`;
        i = j; continue;
      }

      // Dot
      if (c === '.') { out += '.'; i++; continue; }

      // Punctuation
      if ('(),;'.includes(c)) {
        if (c === '(' || c === ')') out += `<span class="sql-br">${esc(c)}</span>`;
        else out += `<span class="sql-pu">${esc(c)}</span>`;
        i++; continue;
      }

      // Operator
      if (/[=<>!|&+\-*/%^~:]/.test(c)) {
        let j = i;
        while (j < n && /[=<>!|&+\-*/%^~:]/.test(line[j])) j++;
        out += `<span class="sql-op">${esc(line.slice(i, j))}</span>`;
        i = j; continue;
      }

      // Word — keyword or identifier
      if (/[a-zA-Z_@#$]/.test(c)) {
        let j = i;
        while (j < n && /[a-zA-Z0-9_@#$]/.test(line[j])) j++;
        const word = line.slice(i, j);
        const up = word.toUpperCase();
        if (KW.has(up)) {
          if (CLAUSE_KW.has(up)) out += `<span class="sql-cl">${esc(word)}</span>`;
          else out += `<span class="sql-kw">${esc(word)}</span>`;
        } else {
          out += esc(word);
        }
        i = j; continue;
      }

      out += esc(c); i++;
    }

    return out;
  }).join('\n');
}

// ── Stats ─────────────────────────────────────────────────────────────────────
function sqlStats(sql) {
  if (!sql.trim()) return { lines: 0, chars: 0, statements: 0, keywords: 0 };
  const lines = sql.split('\n').length;
  const chars = sql.length;
  const statements = (sql.match(/;/g) || []).length || 1;
  const toks = tokenize(sql);
  const keywords = toks.filter(t => t.t === 'kw').length;
  return { lines, chars, statements, keywords };
}

// ── History ───────────────────────────────────────────────────────────────────
const HIST_KEY = 'sql_formatter_history';
const MAX_HIST = 10;

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HIST_KEY) || '[]'); } catch { return []; }
}

function saveToHistory(sql, existing) {
  if (!sql.trim()) return existing;
  const entry = {
    id: Date.now(),
    date: new Date().toISOString(),
    preview: sql.trim().slice(0, 80).replace(/\s+/g, ' '),
    sql,
  };
  const updated = [entry, ...existing.filter(e => e.sql !== sql)].slice(0, MAX_HIST);
  try { localStorage.setItem(HIST_KEY, JSON.stringify(updated)); } catch {}
  return updated;
}

function relativeTime(iso) {
  const mins = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ── Sample SQL ────────────────────────────────────────────────────────────────
const SAMPLE = `-- E-commerce order analytics query
SELECT
o.order_id,
u.username,
u.email,
COUNT(oi.product_id) AS item_count,
SUM(oi.quantity * p.price) AS order_total,
o.created_at,
CASE WHEN o.status = 'shipped' THEN 'In Transit' WHEN o.status = 'delivered' THEN 'Complete' ELSE 'Pending' END AS status_label
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
WHERE o.created_at >= '2024-01-01' AND o.created_at < '2025-01-01' AND o.status != 'cancelled'
GROUP BY o.order_id, u.username, u.email, o.created_at, o.status
HAVING SUM(oi.quantity * p.price) > 50
ORDER BY order_total DESC, o.created_at DESC
LIMIT 100;`;

// ── Main component ────────────────────────────────────────────────────────────
export default function SqlFormatterTool() {
  const [input, setInput]       = useState('');
  const [output, setOutput]     = useState('');
  const [mode, setMode]         = useState('format');   // 'format' | 'minify'
  const [kwCase, setKwCase]     = useState('upper');    // 'upper' | 'lower' | 'preserve'
  const [tabSize, setTabSize]   = useState(2);
  const [dialect, setDialect]   = useState('sql');      // display only (tokenizer is universal)
  const [toast, setToast]       = useState('');
  const [histOpen, setHistOpen] = useState(false);
  const [history, setHistory]   = useState([]);
  const [isDrag, setIsDrag]     = useState(false);
  const fileRef = useRef(null);
  const debounceRef = useRef(null);
  const inputLineRef = useRef(null);
  const outputLineRef = useRef(null);

  const syncInputScroll = useCallback((e) => {
    if (inputLineRef.current) inputLineRef.current.scrollTop = e.target.scrollTop;
  }, []);
  const syncOutputScroll = useCallback((e) => {
    if (outputLineRef.current) outputLineRef.current.scrollTop = e.target.scrollTop;
  }, []);

  useEffect(() => { setHistory(loadHistory()); }, []);

  // Auto-format on input/option change
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!input.trim()) { setOutput(''); return; }
    debounceRef.current = setTimeout(() => {
      try {
        const result = mode === 'minify'
          ? minifySQL(input)
          : formatSQL(input, { tabSize, kwCase });
        setOutput(result);
      } catch {
        setOutput(input);
      }
    }, 120);
  }, [input, mode, kwCase, tabSize]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  }, []);

  const runFormat = () => {
    if (!input.trim()) return;
    const result = formatSQL(input, { tabSize, kwCase });
    setOutput(result);
    setHistory(prev => saveToHistory(input, prev));
    showToast('Formatted');
  };

  const runMinify = () => {
    if (!input.trim()) return;
    const result = minifySQL(input);
    setOutput(result);
    showToast('Minified');
  };

  const copyOutput = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); showToast('Copied!'); }
    catch { showToast('Copy failed'); }
  };

  const copyInput = async () => {
    if (!input) return;
    try { await navigator.clipboard.writeText(input); showToast('Copied input'); }
    catch { showToast('Copy failed'); }
  };

  const download = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'query.sql'; a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded query.sql');
  };

  const loadSample = () => {
    setInput(SAMPLE);
    showToast('Sample loaded');
  };

  const pasteInput = async () => {
    try { const t = await navigator.clipboard.readText(); setInput(t); showToast('Pasted'); }
    catch { showToast('Clipboard access denied'); }
  };

  const clearAll = () => { setInput(''); setOutput(''); showToast('Cleared'); };

  const handleFile = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => { setInput(e.target.result); showToast(`${file.name} loaded`); };
    reader.readAsText(file);
  }, [showToast]);

  const stats = useMemo(() => sqlStats(output || input), [output, input]);
  const inStats = useMemo(() => ({
    lines: input ? input.split('\n').length : 0,
    chars: input.length,
  }), [input]);

  const highlighted = useMemo(() => {
    if (!output) return '';
    return highlightFormatted(output);
  }, [output]);

  // Line count for output
  const outLineCount = useMemo(() => output ? output.split('\n').length : 0, [output]);

  return (
    <div className={s.wrap}>
      <DevConvertersTopNav active="sql-formatter" />
      <PlaygroundTopAd />
      {/* ── Header ── */}
      <div className={s.header}>
        <div className={s.logo}>
          <div className={s.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <ellipse cx="8" cy="4" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 4v4c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 8v4c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V8" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <span>SQL <span className={s.accent}>Formatter</span></span>
        </div>

        <div className={s.sep} />

        {/* Options */}
        <div className={s.opts}>
          <label className={s.optLabel}>Dialect
            <select className={s.sel} value={dialect} onChange={e => setDialect(e.target.value)}>
              <option value="sql">Generic SQL</option>
              <option value="mysql">MySQL</option>
              <option value="postgres">PostgreSQL</option>
              <option value="sqlite">SQLite</option>
              <option value="mssql">SQL Server</option>
            </select>
          </label>
          <label className={s.optLabel}>Keywords
            <select className={s.sel} value={kwCase} onChange={e => setKwCase(e.target.value)}>
              <option value="upper">UPPERCASE</option>
              <option value="lower">lowercase</option>
              <option value="preserve">Preserve</option>
            </select>
          </label>
          <label className={s.optLabel}>Indent
            <select className={s.sel} value={tabSize} onChange={e => setTabSize(Number(e.target.value))}>
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>Tab (8)</option>
            </select>
          </label>
        </div>

        <div className={s.sep} />

        {/* Actions */}
        <div className={s.actions}>
          <button className={s.btnPrimary} onClick={runFormat} disabled={!input.trim()}>Format</button>
          <button className={s.btn} onClick={runMinify} disabled={!input.trim()}>Minify</button>
          <div className={s.sep} />
          <button className={s.btn} onClick={loadSample}>Sample</button>
          <button className={s.btn} onClick={pasteInput}>Paste</button>
          <button className={s.btn} onClick={() => fileRef.current?.click()}>Upload</button>
          <button className={s.btn} onClick={copyOutput} disabled={!output}>Copy</button>
          <button className={s.btn} onClick={download} disabled={!output}>Download</button>
          <button className={`${s.btn} ${histOpen ? s.btnActive : ''}`}
            onClick={() => setHistOpen(o => !o)}>
            History{history.length > 0 && <span className={s.badge}>{history.length}</span>}
          </button>
          <button className={`${s.btn} ${s.btnDanger}`} onClick={clearAll} disabled={!input && !output}>Clear</button>
        </div>
        <input ref={fileRef} type="file" accept=".sql,.txt" style={{ display: 'none' }}
          onChange={e => { handleFile(e.target.files[0]); e.target.value = ''; }} />
      </div>

      {/* ── Panels ── */}
      <div className={s.panels}
        onDragOver={e => { e.preventDefault(); setIsDrag(true); }}
        onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget)) setIsDrag(false); }}
        onDrop={e => { e.preventDefault(); setIsDrag(false); handleFile(e.dataTransfer.files[0]); }}>

        {isDrag && (
          <div className={s.dropOverlay}>
            <div className={s.dropInner}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Drop .sql file here
            </div>
          </div>
        )}

        {/* Input panel */}
        <div className={s.panel}>
          <div className={s.panelHead}>
            <span className={s.panelLabel}>INPUT</span>
            <div className={s.panelMeta}>
              {inStats.lines > 0 && <span>{inStats.lines} lines · {inStats.chars} chars</span>}
            </div>
            <button className={s.iconBtn} onClick={copyInput} disabled={!input} title="Copy input">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </button>
          </div>
          <div className={s.editorWrap}>
            <LineNums ref={inputLineRef} count={inStats.lines || 1} />
            <textarea
              className={s.textarea}
              value={input}
              onChange={e => setInput(e.target.value)}
              onScroll={syncInputScroll}
              placeholder={"Paste your SQL query here…\n\nSupports SELECT, INSERT, UPDATE, DELETE,\nCREATE, ALTER, multi-statement, subqueries,\nCASE/WHEN, window functions, and comments."}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Output panel */}
        <div className={s.panel}>
          <div className={s.panelHead}>
            <span className={s.panelLabel}>OUTPUT</span>
            <div className={s.panelMeta}>
              {output && <span>{outLineCount} lines · {output.length} chars</span>}
            </div>
            <button className={s.iconBtn} onClick={copyOutput} disabled={!output} title="Copy output">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </button>
          </div>
          <div className={s.outputWrap}>
            {output ? (
              <>
                <LineNums ref={outputLineRef} count={outLineCount} />
                <div className={s.outputScroll} onScroll={syncOutputScroll}>
                  <pre
                    className={s.output}
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                </div>
              </>
            ) : (
              <div className={s.empty}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.3">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
                  <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"/>
                </svg>
                <p>Formatted SQL appears here</p>
                <p className={s.emptyHint}>Auto-formats as you type · or press Format</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Status bar ── */}
      <div className={s.statusBar}>
        <span className={s.statItem}>
          <span className={s.statDot} style={{ background: output ? '#60a5fa' : '#50556a' }} />
          {output ? 'Ready' : 'Paste SQL to begin'}
        </span>
        {output && <>
          <span className={s.statDiv} />
          <span className={s.statItem}>{stats.statements} {stats.statements === 1 ? 'statement' : 'statements'}</span>
          <span className={s.statDiv} />
          <span className={s.statItem}>{stats.keywords} keywords</span>
          <span className={s.statDiv} />
          <span className={s.statItem}>{outLineCount} lines</span>
        </>}
        <div style={{ flex: 1 }} />
        <span className={s.statItem} style={{ opacity: 0.5 }}>dialect: {dialect}</span>
      </div>

      {/* ── History panel ── */}
      {histOpen && (
        <div className={s.histOverlay} onClick={() => setHistOpen(false)}>
          <div className={s.histPanel} onClick={e => e.stopPropagation()}>
            <div className={s.histHead}>
              <span className={s.histTitle}>History</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {history.length > 0 && (
                  <button className={s.btn} onClick={() => {
                    setHistory([]);
                    try { localStorage.removeItem(HIST_KEY); } catch {}
                    showToast('History cleared');
                  }}>Clear</button>
                )}
                <button className={s.btn} onClick={() => setHistOpen(false)}>Close</button>
              </div>
            </div>
            {history.length === 0
              ? <div className={s.histEmpty}>No history yet — queries auto-save after formatting.</div>
              : <div className={s.histList}>
                  {history.map(e => (
                    <button key={e.id} className={s.histItem}
                      onClick={() => { setInput(e.sql); setHistOpen(false); showToast('Restored'); }}>
                      <div className={s.histTime}>{relativeTime(e.date)}</div>
                      <div className={s.histPreview}>{e.preview}</div>
                    </button>
                  ))}
                </div>
            }
          </div>
        </div>
      )}

      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}

// ── Line numbers sub-component ────────────────────────────────────────────────
const LineNums = forwardRef(function LineNums({ count }, ref) {
  return (
    <div ref={ref} className={s.lineNums} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={s.lineNum}>{i + 1}</div>
      ))}
    </div>
  );
});
