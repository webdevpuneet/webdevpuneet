'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { CHAPTERS, LESSONS, INIT_SQL } from './lessons';

/* ── Constants ──────────────────────────────────────────────────────────────── */
const LS_PROGRESS = 'fwd-sql-playground-progress';
const LS_POSITION = 'fwd-sql-playground-position';
const LS_HISTORY  = 'fwd-sql-playground-history';
const LS_TABS     = 'fwd-sql-playground-tabs';
const PGLITE_CDN  = 'https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js';
const LESSON_TAB_ID = 1;
const MAX_HISTORY = 20;

const SCHEMA_QUERY = `
  SELECT c.table_name, c.column_name, c.data_type
  FROM information_schema.columns c
  JOIN information_schema.tables t
    ON c.table_name = t.table_name AND c.table_schema = t.table_schema
  WHERE c.table_schema = 'public' AND t.table_type = 'BASE TABLE'
  ORDER BY c.table_name, c.ordinal_position;
`;

/* ── localStorage helpers ───────────────────────────────────────────────────── */
function readProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_PROGRESS) || '[]')); }
  catch { return new Set(); }
}
function saveProgress(s) { try { localStorage.setItem(LS_PROGRESS, JSON.stringify([...s])); } catch {} }
function readPosition() { try { return JSON.parse(localStorage.getItem(LS_POSITION) || '0'); } catch { return 0; } }
function savePosition(idx) { try { localStorage.setItem(LS_POSITION, String(idx)); } catch {} }
function readHistory() { try { return JSON.parse(localStorage.getItem(LS_HISTORY) || '[]'); } catch { return []; } }
function saveHistory(h) { try { localStorage.setItem(LS_HISTORY, JSON.stringify(h.slice(0, MAX_HISTORY))); } catch {} }
function readTabs() { try { return JSON.parse(localStorage.getItem(LS_TABS) || 'null'); } catch { return null; } }
function saveTabs(tabs, activeId) { try { localStorage.setItem(LS_TABS, JSON.stringify({ tabs, activeId })); } catch {} }

/* ── SQL syntax highlighter ─────────────────────────────────────────────────── */
const SQL_KW = new Set(['SELECT','FROM','WHERE','JOIN','INNER','LEFT','RIGHT','FULL','OUTER','CROSS','ON','AS','AND','OR','NOT','IN','BETWEEN','LIKE','ILIKE','IS','NULL','ORDER','BY','GROUP','HAVING','LIMIT','OFFSET','DISTINCT','ALL','INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','DROP','ALTER','ADD','COLUMN','WITH','RECURSIVE','UNION','EXCEPT','INTERSECT','CASE','WHEN','THEN','ELSE','END','EXISTS','ANY','SOME','PRIMARY','KEY','FOREIGN','REFERENCES','UNIQUE','DEFAULT','RETURNING','USING','NATURAL','ASC','DESC','NULLS','FIRST','LAST','TRUE','FALSE','SERIAL','BIGSERIAL']);
const SQL_FUNCS = new Set(['COUNT','SUM','AVG','MIN','MAX','ROUND','COALESCE','NULLIF','GREATEST','LEAST','ROW_NUMBER','RANK','DENSE_RANK','PERCENT_RANK','CUME_DIST','NTILE','LAG','LEAD','FIRST_VALUE','LAST_VALUE','NTH_VALUE','OVER','PARTITION','ROWS','RANGE','UNBOUNDED','PRECEDING','FOLLOWING','CURRENT','EXTRACT','DATE_TRUNC','AGE','NOW','CURRENT_DATE','CURRENT_TIMESTAMP','CURRENT_TIME','UPPER','LOWER','LENGTH','SUBSTRING','TRIM','REPLACE','SPLIT_PART','CONCAT','REPEAT','LPAD','RPAD','POSITION','REGEXP_REPLACE','CAST','TO_CHAR','TO_DATE','TO_TIMESTAMP','ARRAY_AGG','STRING_AGG','JSON_AGG','GENERATE_SERIES','UNNEST']);
const SQL_TYPES = new Set(['INTEGER','INT','BIGINT','SMALLINT','NUMERIC','DECIMAL','FLOAT','REAL','TEXT','VARCHAR','CHAR','BOOLEAN','BOOL','DATE','TIME','TIMESTAMP','TIMESTAMPTZ','INTERVAL','JSONB','JSON','UUID','BYTEA']);

const esc = v => v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function highlightSQL(code) {
  let out = '', i = 0;
  const n = code.length;
  while (i < n) {
    const c = code[i];
    if (/\s/.test(c)) { out += c; i++; continue; }
    if (c === '-' && code[i+1] === '-') {
      let j = i; while (j < n && code[j] !== '\n') j++;
      out += `<span class="sql-cm">${esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    if (c === '/' && code[i+1] === '*') {
      const end = code.indexOf('*/', i+2); const j = end < 0 ? n : end + 2;
      out += `<span class="sql-cm">${esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    if (c === "'") {
      let j = i+1;
      while (j < n) { if (code[j] === "'" && code[j+1] === "'") { j += 2; continue; } if (code[j] === "'") { j++; break; } j++; }
      out += `<span class="sql-str">${esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    if (c === '"') {
      let j = i+1; while (j < n && code[j] !== '"') j++;
      out += `<span class="sql-id">${esc(code.slice(i, j+1))}</span>`; i = j+1; continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i; while (j < n && /[0-9._eExX]/.test(code[j])) j++;
      out += `<span class="sql-num">${esc(code.slice(i,j))}</span>`; i = j; continue;
    }
    if (/[a-zA-Z_]/.test(c)) {
      let j = i; while (j < n && /[a-zA-Z0-9_]/.test(code[j])) j++;
      const word = code.slice(i,j); const up = word.toUpperCase();
      if (SQL_KW.has(up)) out += `<span class="sql-kw">${esc(word)}</span>`;
      else if (SQL_FUNCS.has(up)) out += `<span class="sql-fn">${esc(word)}</span>`;
      else if (SQL_TYPES.has(up)) out += `<span class="sql-ty">${esc(word)}</span>`;
      else out += esc(word);
      i = j; continue;
    }
    if ('()[]'.includes(c)) out += `<span class="sql-br">${esc(c)}</span>`;
    else out += `<span class="sql-op">${esc(c)}</span>`;
    i++;
  }
  return out;
}

/* ── EXPLAIN parser ─────────────────────────────────────────────────────────── */
function parseExplainPlan(planText) {
  const lines = planText.split('\n');
  const seen = new Set();
  const out = [];
  for (const line of lines) {
    const t = line.replace(/^[\s\-\>]+/, '').trim();
    if (!t) continue;
    const add = (icon, text) => { const key = text.slice(0, 40); if (!seen.has(key)) { seen.add(key); out.push({ icon, text }); } };
    if (/^Seq Scan on (\w+)/.test(t)) {
      const [, tbl] = t.match(/^Seq Scan on (\w+)/);
      const rows = t.match(/rows=(\d+)/)?.[1];
      add('⟳', `Full table scan on "${tbl}"${rows ? ` — checks all ${rows} row(s)` : ''}`);
    } else if (/^Index(?: Only)? Scan/.test(t)) {
      const tbl = t.match(/on (\w+)/)?.[1];
      add('⚡', `Index lookup on "${tbl || 'table'}" — fast, skips unneeded rows`);
    } else if (/^Hash Join/.test(t)) {
      add('⊕', 'Hash join — builds a hash table for one side, probes it with the other');
    } else if (/^Nested Loop/.test(t)) {
      add('↻', 'Nested loop join — for each left row, scans matching rows on the right');
    } else if (/^Merge Join/.test(t)) {
      add('⇄', 'Merge join — merges two pre-sorted inputs efficiently');
    } else if (/^Sort/.test(t)) {
      const key = lines.find(l => l.includes('Sort Key:'))?.match(/Sort Key: (.+)/)?.[1]?.replace(/::[\w]+/g,'').trim();
      add('↕', `Sort results${key ? ` by: ${key}` : ''}`);
    } else if (/^(Partial |Finalize )?(Hash|Group)Aggregate/.test(t)) {
      add('Σ', 'GroupAggregate — groups rows and computes aggregate functions per group');
    } else if (/^Aggregate/.test(t)) {
      add('Σ', 'Aggregate — computes a single value over all rows (e.g. COUNT, SUM)');
    } else if (/^Limit/.test(t)) {
      add('⊟', 'Limit — caps the number of rows returned');
    } else if (/^WindowAgg/.test(t)) {
      add('▦', 'Window aggregate — computes window functions (ROW_NUMBER, RANK, SUM OVER…)');
    } else if (/^Recursive Union/.test(t)) {
      add('↺', 'Recursive Union — executes the recursive CTE until no new rows are produced');
    } else if (/^CTE Scan on (\w+)/.test(t)) {
      const [, name] = t.match(/^CTE Scan on (\w+)/);
      add('◎', `Reads from CTE "${name}"`);
    } else if (/^Subquery Scan/.test(t)) {
      add('⊂', 'Scans a subquery result as a derived table');
    } else if (/^Unique/.test(t)) {
      add('◇', 'Removes duplicate rows from sorted input (for DISTINCT)');
    } else if (t.includes('Filter:')) {
      const f = t.replace(/.*Filter:\s*/, '').replace(/::[\w]+/g,'').trim();
      add('▽', `Filter: ${f}`);
    }
  }
  return out.length ? out : [{ icon: '◉', text: 'Query plan generated successfully' }];
}

/* ── Error hints ────────────────────────────────────────────────────────────── */
function getErrorHint(msg) {
  if (!msg) return null;
  const m = msg.toLowerCase();
  if (m.includes('column') && m.includes('does not exist')) {
    const col = msg.match(/column "([^"]+)"/)?.[1];
    return `PostgreSQL column names are case-sensitive. "${col || 'column'}" was not found — check capitalisation or try lowercasing it.`;
  }
  if (m.includes('relation') && m.includes('does not exist')) {
    const tbl = msg.match(/relation "([^"]+)"/)?.[1];
    return `Table "${tbl || 'unknown'}" doesn't exist. Available tables: employees, departments, projects, assignments.`;
  }
  if (m.includes('syntax error at or near')) {
    const near = msg.match(/near "([^"]+)"/)?.[1];
    return `Syntax error${near ? ` near "${near}"` : ''}. Check for missing commas, unmatched parentheses, or misspelled keywords.`;
  }
  if (m.includes('operator does not exist')) {
    return 'Type mismatch — you may be comparing values of different types. Use CAST() or :: to convert, e.g. id::text.';
  }
  if (m.includes('aggregate functions are not allowed in where')) {
    return 'Aggregate functions (COUNT, AVG, etc.) cannot be used in WHERE. Use HAVING to filter aggregated values.';
  }
  if (m.includes('must appear in the group by clause')) {
    const col = msg.match(/"([^"]+)" must appear/)?.[1];
    return `"${col || 'column'}" must be in GROUP BY or wrapped in an aggregate function like COUNT() or SUM().`;
  }
  if (m.includes('division by zero')) {
    return 'Division by zero — use NULLIF(denominator, 0) to safely handle zero values.';
  }
  if (m.includes('invalid input syntax for type')) {
    return 'Invalid format — check that text values use single quotes and numbers don\'t have quotes.';
  }
  if (m.includes('null value in column') && m.includes('not-null')) {
    const col = msg.match(/column "([^"]+)"/)?.[1];
    return `Column "${col || 'unknown'}" does not allow NULL. Provide a value or use a DEFAULT.`;
  }
  return null;
}

/* ── Sub-components ─────────────────────────────────────────────────────────── */

function LineNums({ count, scrollRef }) {
  return (
    <div ref={scrollRef} className={s.lineNums} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={s.lineNum}>{i+1}</div>
      ))}
    </div>
  );
}

function ResultsTable({ fields, rows }) {
  const MAX_ROWS = 500;
  const displayRows = rows.slice(0, MAX_ROWS);
  return (
    <div className={s.tableWrap}>
      <table className={s.table}>
        <thead><tr>{fields.map(f => <th key={f.name}>{f.name}</th>)}</tr></thead>
        <tbody>
          {displayRows.map((row, ri) => (
            <tr key={ri}>
              {fields.map(f => {
                const val = row[f.name];
                const isNull = val === null || val === undefined;
                return (
                  <td key={f.name} className={isNull ? s.cellNull : ''}>
                    {isNull ? 'NULL' : typeof val === 'object' ? JSON.stringify(val) : String(val)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > MAX_ROWS && <div className={s.tableMore}>Showing first {MAX_ROWS} of {rows.length} rows</div>}
    </div>
  );
}

function ChallengeWidget({ challenge, picked, onPick, onReset }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={s.challenge}>
      <button className={`${s.challengeToggle} ${open ? s.challengeToggleOpen : ''}`} onClick={() => setOpen(v => !v)}>
        <span className={s.challengeBadge}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
          </svg>
          Quick Check
        </span>
        <span className={s.challengeQ}>{challenge.question}</span>
        <span className={s.challengeCta}>{open ? 'Hide' : 'Answer →'}</span>
      </button>
      {open && (
        <div className={s.challengeBody}>
          <div className={s.challengeOpts}>
            {challenge.options.map((opt, i) => {
              let cls = s.challengeBtn;
              if (picked !== null) {
                if (i === challenge.correct) cls += ' ' + s.challengeCorrect;
                else if (i === picked) cls += ' ' + s.challengeWrong;
              }
              return (
                <button key={i} className={cls} onClick={() => picked === null && onPick(i)}>
                  <span className={s.challengeOptLetter}>{String.fromCharCode(65 + i)}</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className={picked === challenge.correct ? s.challengeFeedbackOk : s.challengeFeedbackBad}>
              {picked === challenge.correct
                ? '✓ Correct!'
                : `✗ Not quite. The answer is: "${challenge.options[challenge.correct]}"`}
              <button className={s.challengeRetry} onClick={onReset}>Try again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TaskWidget({ task, db }) {
  const [sql, setSql] = useState('');
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);

  const check = async () => {
    if (!db || !sql.trim()) return;
    setRunning(true); setResult(null);
    try {
      const allResults = await db.exec(sql);
      const withFields = allResults.filter(r => r.fields?.length > 0);
      const last = withFields[withFields.length - 1] || allResults[allResults.length - 1] || {};
      const { fields = [], rows = [] } = last;
      const isCorrect = task.check({ fields, rows });
      setResult(isCorrect ? 'correct' : 'wrong');
      setFeedback(isCorrect ? 'Correct! Your query produces the expected result.' : 'Not quite — check your query and try again.');
    } catch (err) {
      setResult('wrong');
      setFeedback(`Error: ${err.message}`);
    } finally { setRunning(false); }
  };

  return (
    <div className={s.taskWidget}>
      <div className={s.taskHeader}>
        <span className={s.taskBadge}>Challenge</span>
        <span className={s.taskPrompt}>{task.prompt}</span>
      </div>
      <textarea
        className={s.taskEditor}
        value={sql}
        onChange={e => setSql(e.target.value)}
        onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); check(); } }}
        placeholder="Write your SQL here and press Ctrl+Enter or click Check…"
        spellCheck={false}
      />
      <div className={s.taskActions}>
        <button className={s.runBtn} onClick={check} disabled={running || !sql.trim()}>
          {running ? 'Checking…' : 'Check Answer'}
        </button>
        <button className={s.iconBtn} onClick={() => setShowHint(v => !v)}>
          {showHint ? 'Hide hint' : 'Show hint'}
        </button>
        {result && (
          <button className={s.iconBtn} onClick={() => { setResult(null); setFeedback(''); setSql(''); setShowHint(false); }}>
            Reset
          </button>
        )}
      </div>
      {showHint && <div className={s.taskHint}><strong>Hint:</strong> <code>{task.hint}</code></div>}
      {feedback && (
        <div className={result === 'correct' ? s.taskSuccess : s.taskError}>{feedback}</div>
      )}
    </div>
  );
}

function ExplainPanel({ lines, onClose }) {
  return (
    <div className={s.explainPanel}>
      <div className={s.explainHeader}>
        <span className={s.explainTitle}>Query Plan</span>
        <button className={s.iconBtn} onClick={onClose}>✕ Close</button>
      </div>
      <div className={s.explainBody}>
        {lines.map((l, i) => (
          <div key={i} className={s.explainRow}>
            <span className={s.explainIcon}>{l.icon}</span>
            <span className={s.explainText}>{l.text}</span>
          </div>
        ))}
        <div className={s.explainNote}>
          EXPLAIN shows what PostgreSQL plans to do — actual execution may differ.
        </div>
      </div>
    </div>
  );
}

function HistoryDropdown({ history, onSelect, onClose, anchorRef }) {
  const [pos, setPos] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (!anchorRef?.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const dropW = 380;
    let left = rect.left;
    if (left + dropW > window.innerWidth - 8) left = window.innerWidth - dropW - 8;
    if (left < 8) left = 8;
    setPos({ top: rect.bottom + 4, left });
  }, [anchorRef]);
  const style = { top: pos.top, left: pos.left };
  if (!history.length) return (
    <div className={s.historyDropdown} style={style}>
      <div className={s.historyEmpty}>No history yet — run some queries first.</div>
    </div>
  );
  return (
    <div className={s.historyDropdown} style={style}>
      <div className={s.historyHeader}>
        Recent Queries
        <button className={s.iconBtn} onClick={onClose}>✕</button>
      </div>
      <div className={s.historyList}>
        {history.map((entry, i) => (
          <button key={i} className={s.historyItem} onClick={() => { onSelect(entry.sql); onClose(); }}>
            <span className={s.historyTime}>{entry.time}</span>
            <span className={s.historySql}>{entry.sql.replace(/\s+/g, ' ').trim().slice(0, 80)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TablePreviewPopover({ table, fields, rows, onClose }) {
  return (
    <div className={s.previewPopover}>
      <div className={s.previewHeader}>
        <span className={s.previewTitle}>{table}</span>
        <button className={s.iconBtn} onClick={onClose}>✕</button>
      </div>
      <div className={s.previewTableWrap}>
        <table className={s.previewTable}>
          <thead><tr>{fields.map(f => <th key={f.name}>{f.name}</th>)}</tr></thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {fields.map(f => {
                  const v = row[f.name];
                  return (
                    <td key={f.name} className={v == null ? s.cellNull : ''}>
                      {v == null ? 'NULL' : typeof v === 'object' ? JSON.stringify(v) : String(v)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.previewNote}>First 5 rows</div>
    </div>
  );
}

function DataEditor({ schema, db, onClose }) {
  const tables = Object.keys(schema);
  const [table, setTable] = useState(tables[0] || '');
  const [fields, setFields] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [addMode, setAddMode] = useState(false);
  const [newValues, setNewValues] = useState({});
  const [msg, setMsg] = useState('');

  const load = useCallback(async (tbl) => {
    if (!db || !tbl) return;
    setLoading(true); setEditId(null); setAddMode(false); setMsg('');
    try {
      const res = await db.query(`SELECT * FROM ${tbl} LIMIT 100`);
      setFields(res.fields); setRows(res.rows);
    } catch (e) { setMsg(e.message); }
    finally { setLoading(false); }
  }, [db]);

  useEffect(() => { load(table); }, [table, load]);

  const saveEdit = async () => {
    if (!editId) return;
    const setClauses = fields.filter(f => f.name !== 'id').map(f => `${f.name} = ${editValues[f.name] === '' ? 'NULL' : `'${String(editValues[f.name]).replace(/'/g, "''")}'`}`).join(', ');
    try {
      await db.exec(`UPDATE ${table} SET ${setClauses} WHERE id = ${editId}`);
      setMsg('Row updated.'); setEditId(null); load(table);
    } catch (e) { setMsg(e.message); }
  };

  const deleteRow = async (id) => {
    try {
      await db.exec(`DELETE FROM ${table} WHERE id = ${id}`);
      setMsg('Row deleted.'); load(table);
    } catch (e) { setMsg(e.message); }
  };

  const insertRow = async () => {
    const writableFields = fields.filter(f => f.name !== 'id');
    const cols = writableFields.map(f => f.name).join(', ');
    const vals = writableFields.map(f => newValues[f.name] === '' || newValues[f.name] == null ? 'NULL' : `'${String(newValues[f.name]).replace(/'/g, "''")}'`).join(', ');
    try {
      await db.exec(`INSERT INTO ${table} (${cols}) VALUES (${vals})`);
      setMsg('Row inserted.'); setAddMode(false); setNewValues({}); load(table);
    } catch (e) { setMsg(e.message); }
  };

  const hasId = fields.some(f => f.name === 'id');

  return (
    <div className={s.dataEditor}>
      <div className={s.dataHeader}>
        <div className={s.dataHeaderLeft}>
          <span className={s.dataTitle}>Data Editor</span>
          <select className={s.dataTableSelect} value={table} onChange={e => setTable(e.target.value)}>
            {tables.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className={s.paneActions}>
          {hasId && <button className={s.iconBtn} onClick={() => { setAddMode(true); setNewValues({}); }}>+ Add row</button>}
          <button className={s.iconBtn} onClick={onClose}>✕ Close</button>
        </div>
      </div>
      {msg && <div className={s.dataMsg}>{msg}</div>}
      {loading ? (
        <div className={s.emptyState}><span className={s.spinner}/> Loading…</div>
      ) : (
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                {fields.map(f => <th key={f.name}>{f.name}<span className={s.dataType}>{f.dataTypeID}</span></th>)}
                {hasId && <th style={{ width: 90 }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {addMode && (
                <tr className={s.dataEditRow}>
                  {fields.filter(f => f.name !== 'id').map(f => (
                    <td key={f.name} colSpan={f.name === fields[fields.length-1]?.name ? 1 : 1}>
                      <input className={s.dataInput} value={newValues[f.name] || ''} onChange={e => setNewValues(v => ({...v, [f.name]: e.target.value}))} placeholder={f.name}/>
                    </td>
                  ))}
                  <td>
                    <button className={s.dataSaveBtn} onClick={insertRow}>Save</button>
                    <button className={s.dataCancelBtn} onClick={() => setAddMode(false)}>✕</button>
                  </td>
                </tr>
              )}
              {rows.map((row, ri) => (
                editId === row.id ? (
                  <tr key={ri} className={s.dataEditRow}>
                    {fields.map(f => (
                      <td key={f.name}>
                        {f.name === 'id'
                          ? <span className={s.cellNull}>{row.id}</span>
                          : <input className={s.dataInput} value={editValues[f.name] ?? ''} onChange={e => setEditValues(v => ({...v, [f.name]: e.target.value}))}/>}
                      </td>
                    ))}
                    <td>
                      <button className={s.dataSaveBtn} onClick={saveEdit}>Save</button>
                      <button className={s.dataCancelBtn} onClick={() => setEditId(null)}>✕</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={ri}>
                    {fields.map(f => {
                      const v = row[f.name];
                      return <td key={f.name} className={v == null ? s.cellNull : ''}>{v == null ? 'NULL' : typeof v === 'object' ? JSON.stringify(v) : String(v)}</td>;
                    })}
                    {hasId && (
                      <td>
                        <button className={s.dataEditBtn} onClick={() => { setEditId(row.id); setEditValues({...row}); }}>Edit</button>
                        <button className={s.dataDelBtn} onClick={() => { if (confirm('Delete this row?')) deleteRow(row.id); }}>Del</button>
                      </td>
                    )}
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function SchemaExplorer({ schema, open, onToggle, db }) {
  const tables = Object.keys(schema);
  const [preview, setPreview] = useState(null); // { table, fields, rows }
  const [previewPos, setPreviewPos] = useState({ top: 0, left: 0 });
  const hoverTimeout = useRef(null);

  const handleMouseEnter = useCallback(async (e, tbl) => {
    if (!db) return;
    const rect = e.currentTarget.getBoundingClientRect();
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(async () => {
      try {
        const res = await db.query(`SELECT * FROM ${tbl} LIMIT 5`);
        setPreview({ table: tbl, fields: res.fields, rows: res.rows });
        setPreviewPos({ top: rect.top, left: rect.right + 8 });
      } catch {}
    }, 300);
  }, [db]);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hoverTimeout.current);
  }, []);

  return (
    <div className={s.schemaWrap}>
      <button className={s.schemaToggle} onClick={onToggle}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
        <span>Schema Explorer</span>
        <span className={s.schemaBadge}>{tables.length} tables</span>
      </button>
      {open && (
        <div className={s.schemaTables}>
          {tables.map(tbl => (
            <div key={tbl} className={s.schemaTable}>
              <div
                className={s.schemaTableName}
                onMouseEnter={e => handleMouseEnter(e, tbl)}
                onMouseLeave={handleMouseLeave}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
                </svg>
                {tbl}
                <span className={s.schemaPreviewHint}>hover</span>
              </div>
              {schema[tbl].map(col => (
                <div key={col.name} className={s.schemaCol}>
                  <span className={s.schemaColName}>{col.name}</span>
                  <span className={s.schemaColType}>{col.type}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {preview && (
        <div className={s.previewOverlay} style={{ top: previewPos.top, left: previewPos.left }}
          onMouseEnter={() => clearTimeout(hoverTimeout.current)}
          onMouseLeave={() => setPreview(null)}>
          <TablePreviewPopover
            table={preview.table}
            fields={preview.fields}
            rows={preview.rows}
            onClose={() => setPreview(null)}
          />
        </div>
      )}
    </div>
  );
}

function ConceptText({ text }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1,-1)}</code>;
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2,-2)}</strong>;
        return part;
      })}
    </>
  );
}

/* ── Main component ─────────────────────────────────────────────────────────── */
export default function SqlPlaygroundTool() {
  /* ── Core state ── */
  const [activeIdx,     setActiveIdx]     = useState(0);
  const [dbStatus,      setDbStatus]      = useState('loading');
  const [schema,        setSchema]        = useState({});

  /* ── Tabs ── */
  const [tabs,          setTabs]          = useState([{ id: LESSON_TAB_ID, label: 'Lesson', sql: LESSONS[0].sql }]);
  const [activeTabId,   setActiveTabId]   = useState(LESSON_TAB_ID);
  const nextTabId = useRef(2);

  /* ── Results ── */
  const [results,       setResults]       = useState(null);
  const [resultMsg,     setResultMsg]     = useState('');
  const [error,         setError]         = useState('');
  const [running,       setRunning]       = useState(false);
  const [execTime,      setExecTime]      = useState(null);

  /* ── Features ── */
  const [explainLines,  setExplainLines]  = useState(null);
  const [showExplain,   setShowExplain]   = useState(false);
  const [history,       setHistory]       = useState([]);
  const [showHistory,   setShowHistory]   = useState(false);
  const [challengePick, setChallengePick] = useState(null);
  const [showTask,      setShowTask]      = useState(false);
  const [dataEditorOpen,setDataEditorOpen]= useState(false);
  const [resultsTab,    setResultsTab]    = useState('results'); // 'results' | 'explain'

  /* ── UI state ── */
  const [sidebarOpen,   setSidebarOpen]   = useState(true);
  const [conceptOpen,   setConceptOpen]   = useState(true);
  const [schemaOpen,    setSchemaOpen]    = useState(true);
  const [progress,      setProgress]      = useState(() => new Set());
  const [toast,         setToast]         = useState('');
  const [editorPct,     setEditorPct]     = useState(55);
  const [isDragging,    setIsDragging]    = useState(false);
  const [isMobile,      setIsMobile]      = useState(false);
  const [search,        setSearch]        = useState('');

  /* ── Refs ── */
  const dbRef          = useRef(null);
  const textareaRef    = useRef(null);
  const highlightRef   = useRef(null);
  const lineNumsRef    = useRef(null);
  const workAreaRef    = useRef(null);
  const historyWrapRef = useRef(null);
  const dragging       = useRef(false);

  const lesson = LESSONS[activeIdx];

  /* ── Active tab helpers ── */
  const activeSql = tabs.find(t => t.id === activeTabId)?.sql ?? '';
  const activeSqlRef = useRef(activeSql);
  useEffect(() => { activeSqlRef.current = activeSql; }, [activeSql]);

  const updateActiveSql = useCallback((sql) => {
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, sql } : t));
  }, [activeTabId]);

  /* ── Click outside history dropdown ── */
  useEffect(() => {
    if (!showHistory) return;
    const handler = (e) => {
      if (historyWrapRef.current && !historyWrapRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showHistory]);

  /* ── Toast ── */
  const showToast = useCallback((msg) => {
    setToast(msg); setTimeout(() => setToast(''), 2000);
  }, []);

  /* ── Mobile ── */
  useEffect(() => {
    const check = () => {
      const m = window.innerWidth < 768;
      setIsMobile(m);
      if (m) { setSidebarOpen(false); setSchemaOpen(false); }
    };
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Restore progress, history, position, tabs ── */
  useEffect(() => {
    setProgress(readProgress());
    setHistory(readHistory());

    const savedPos = readPosition();
    const lessonSql = savedPos > 0 && savedPos < LESSONS.length ? LESSONS[savedPos].sql : LESSONS[0].sql;
    if (savedPos > 0 && savedPos < LESSONS.length) setActiveIdx(savedPos);

    // Restore saved tabs (user query tabs)
    const savedTabs = readTabs();
    if (savedTabs?.tabs?.length) {
      // Always update the lesson tab SQL to match the restored position
      const merged = savedTabs.tabs.map(t =>
        t.id === LESSON_TAB_ID ? { ...t, sql: lessonSql } : t
      );
      setTabs(merged);
      if (merged.find(t => t.id === savedTabs.activeId)) setActiveTabId(savedTabs.activeId);
      // activeSqlRef = whichever tab is active
      const active = merged.find(t => t.id === savedTabs.activeId) ?? merged[0];
      activeSqlRef.current = active.sql;
      nextTabId.current = Math.max(...savedTabs.tabs.map(t => t.id)) + 1;
    } else {
      setTabs(prev => prev.map(t => t.id === LESSON_TAB_ID ? { ...t, sql: lessonSql } : t));
      activeSqlRef.current = lessonSql;
    }
  }, []);

  /* ── Core execution (works with any db instance, no state guards) ── */
  const executeQuery = useCallback(async (db, sql) => {
    setRunning(true); setError(''); setResults(null); setResultMsg('');
    setShowExplain(false); setExplainLines(null); setResultsTab('results');
    const start = performance.now();
    try {
      const allResults = await db.exec(sql);
      const elapsed = performance.now() - start;
      setExecTime(elapsed);
      const entry = { sql: sql.trim(), time: new Date().toLocaleTimeString() };
      setHistory(prev => {
        const next = [entry, ...prev.filter(h => h.sql !== entry.sql)].slice(0, MAX_HISTORY);
        saveHistory(next); return next;
      });
      const withFields = allResults.filter(r => r.fields?.length > 0);
      if (withFields.length > 0) {
        const last = withFields[withFields.length - 1];
        setResults({ fields: last.fields, rows: last.rows });
      } else {
        const last = allResults[allResults.length - 1];
        setResultMsg(`Query OK${last?.affectedRows != null ? ` — ${last.affectedRows} row(s) affected` : ''}`);
      }
    } catch (err) {
      setExecTime(performance.now() - start);
      setError(err.message || 'Query failed');
    } finally { setRunning(false); }
  }, []);

  /* ── Run query (public, guards against unready DB) ── */
  const runQuery = useCallback(async (sqlOverride) => {
    if (!dbRef.current || dbStatus !== 'ready') return;
    await executeQuery(dbRef.current, sqlOverride ?? activeSqlRef.current);
  }, [dbStatus, executeQuery]);

  /* ── Persist tabs ── */
  useEffect(() => { saveTabs(tabs, activeTabId); }, [tabs, activeTabId]);

  /* ── Load PGlite ── */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setDbStatus('loading');
        const mod = await import(/* webpackIgnore: true */ PGLITE_CDN);
        const PGlite = mod.PGlite || mod.default?.PGlite;
        if (!PGlite) throw new Error('PGlite not found');
        const db = new PGlite();
        await db.exec(INIT_SQL);
        if (cancelled) return;
        dbRef.current = db;
        setDbStatus('ready');
        const res = await db.query(SCHEMA_QUERY);
        const map = {};
        for (const row of res.rows) {
          if (!map[row.table_name]) map[row.table_name] = [];
          map[row.table_name].push({ name: row.column_name, type: row.data_type });
        }
        if (!cancelled) {
          setSchema(map);
          await executeQuery(db, activeSqlRef.current);
        }
      } catch { if (!cancelled) setDbStatus('error'); }
    })();
    return () => { cancelled = true; };
  }, [executeQuery]);

  /* ── Run EXPLAIN ── */
  const runExplain = useCallback(async () => {
    if (!dbRef.current || dbStatus !== 'ready') return;
    const sql = activeSqlRef.current.trim();
    if (!sql.toUpperCase().startsWith('SELECT') && !sql.toUpperCase().startsWith('WITH')) {
      showToast('EXPLAIN works with SELECT queries'); return;
    }
    try {
      const res = await dbRef.current.query(`EXPLAIN ${sql}`);
      const planText = res.rows.map(r => Object.values(r)[0]).join('\n');
      setExplainLines(parseExplainPlan(planText));
      setShowExplain(true); setResultsTab('explain');
    } catch (err) {
      showToast('Explain failed: ' + err.message);
    }
  }, [dbStatus, showToast]);

  /* ── Tab management ── */
  const addTab = useCallback(() => {
    const id = nextTabId.current++;
    setTabs(prev => [...prev, { id, label: `Query ${id}`, sql: '' }]);
    setActiveTabId(id);
  }, []);

  const closeTab = useCallback((id) => {
    if (id === LESSON_TAB_ID) return;
    setTabs(prev => {
      const remaining = prev.filter(t => t.id !== id);
      if (activeTabId === id) setActiveTabId(remaining[remaining.length - 1].id);
      return remaining;
    });
  }, [activeTabId]);

  /* ── Keyboard shortcuts ── */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target; const start = el.selectionStart; const end = el.selectionEnd;
      const next = activeSql.slice(0, start) + '  ' + activeSql.slice(end);
      updateActiveSql(next);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault(); runQuery(activeSqlRef.current); showToast('Running…');
    }
  }, [activeSql, updateActiveSql, runQuery, showToast]);

  /* ── Scroll sync ── */
  const syncScroll = useCallback((e) => {
    if (lineNumsRef.current) lineNumsRef.current.scrollTop = e.target.scrollTop;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  }, []);

  /* ── Vertical drag ── */
  const startDrag = useCallback((e) => {
    e.preventDefault();
    if (!workAreaRef.current) return;
    dragging.current = true; setIsDragging(true);
    document.body.style.userSelect = 'none';
    const rect = workAreaRef.current.getBoundingClientRect();
    const onMove = (ev) => {
      if (!dragging.current) return;
      setEditorPct(Math.max(20, Math.min(80, ((ev.clientY - rect.top) / rect.height) * 100)));
    };
    const onUp = () => {
      dragging.current = false; setIsDragging(false);
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  /* ── Select lesson ── */
  const selectLesson = useCallback((idx) => {
    setActiveIdx(idx);
    const sql = LESSONS[idx].sql;
    setTabs(prev => prev.map(t => t.id === LESSON_TAB_ID ? { ...t, sql, label: 'Lesson' } : t));
    setActiveTabId(LESSON_TAB_ID);
    activeSqlRef.current = sql;
    setResults(null); setResultMsg(''); setError(''); setExecTime(null);
    setExplainLines(null); setShowExplain(false); setResultsTab('results');
    setChallengePick(null); setShowTask(false);
    savePosition(idx);
    if (dbRef.current) runQuery(sql);
  }, [runQuery]);

  /* ── Mark done ── */
  const markDone = useCallback(() => {
    setProgress(prev => {
      const next = new Set(prev);
      if (next.has(lesson.id)) {
        const idx = LESSONS.findIndex(l => l.id === lesson.id);
        LESSONS.slice(idx).forEach(l => next.delete(l.id));
        showToast('Progress reset from here');
      } else {
        next.add(lesson.id);
        if (activeIdx < LESSONS.length - 1) selectLesson(activeIdx + 1);
        showToast('Lesson complete!');
      }
      saveProgress(next); return next;
    });
  }, [lesson.id, activeIdx, selectLesson, showToast]);

  /* ── Copy / Reset ── */
  const copySql = useCallback(async () => {
    try { await navigator.clipboard.writeText(activeSqlRef.current); showToast('Copied'); }
    catch { showToast('Copy failed'); }
  }, [showToast]);

  const resetSql = useCallback(() => {
    const sql = lesson.sql;
    updateActiveSql(sql); activeSqlRef.current = sql; showToast('Reset');
  }, [lesson.sql, updateActiveSql, showToast]);

  /* ── Export CSV ── */
  const exportCsv = useCallback(() => {
    if (!results) return;
    const header = results.fields.map(f => f.name).join(',');
    const rows = results.rows.map(row =>
      results.fields.map(f => {
        const v = row[f.name];
        if (v == null) return '';
        const str = typeof v === 'object' ? JSON.stringify(v) : String(v);
        return /[,"\n]/.test(str) ? `"${str.replace(/"/g,'""')}"` : str;
      }).join(',')
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'results.csv'; a.click();
    URL.revokeObjectURL(url); showToast('Downloaded CSV');
  }, [results, showToast]);

  /* ── Computed ── */
  const lineCount   = useMemo(() => activeSql.split('\n').length, [activeSql]);
  const highlighted = useMemo(() => highlightSQL(activeSql), [activeSql]);
  const errorHint   = useMemo(() => getErrorHint(error), [error]);

  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return LESSONS.filter(l => l.title.toLowerCase().includes(q) || l.chapter.toLowerCase().includes(q));
  }, [search]);

  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);

  /* ── Render ── */
  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="sql-playground" />

      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/sql-playground.svg" width={22} height={22} alt=""/>
          <span className={s.headerTitle}>SQL <span className={s.accent}>Playground</span></span>
          <span className={s.headerCrumb}>{lesson.chapter} → {lesson.title}</span>
        </div>
        <div className={s.headerRight}>
          <span className={dbStatus === 'ready' ? s.dbBadgeReady : dbStatus === 'error' ? s.dbBadgeError : s.dbBadgeLoading}>
            {dbStatus === 'ready' ? 'PostgreSQL ready' : dbStatus === 'error' ? 'DB error' : 'Loading…'}
          </span>
          <span className={s.progressBadge}>{completedCount}/{LESSONS.length}</span>
        </div>
      </header>

      {/* Body */}
      <div className={s.body}>

        {/* Sidebar */}
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <div className={s.sidebarPill}><span className={s.sidebarDot}/>SQL Playground</div>
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
          </div>
          <div className={s.searchWrap}>
            <input className={s.searchInput} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search lessons…"/>
          </div>
          <div className={s.progressSection}>
            <div className={s.progressLabel}><span>Progress</span><span>{completedCount}/{LESSONS.length}</span></div>
            <div className={s.progressBar}><div className={s.progressFill} style={{ width: `${(completedCount/LESSONS.length)*100}%`}}/></div>
          </div>
          <div className={s.lessonList}>
            {filteredLessons ? (
              filteredLessons.length === 0
                ? <div className={s.noResults}>No lessons found</div>
                : filteredLessons.map(l => {
                    const idx = LESSONS.indexOf(l);
                    return (
                      <button key={l.id} className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(l.id) ? s.lessonBtnDone : ''}`} onClick={() => selectLesson(idx)}>
                        <span className={s.lessonDot}/>{l.title}
                      </button>
                    );
                  })
            ) : (
              CHAPTERS.map(ch => (
                <div key={ch}>
                  <div className={s.chapterLabel}>{ch}</div>
                  {LESSONS.filter(l => l.chapter === ch).map(l => {
                    const idx = LESSONS.indexOf(l);
                    return (
                      <button key={l.id} className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(l.id) ? s.lessonBtnDone : ''}`} onClick={() => selectLesson(idx)}>
                        <span className={s.lessonDot}/>{l.title}
                        {l.challenge && <span className={s.lessonHasChallenge} title="Has challenge">●</span>}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
          <SchemaExplorer schema={schema} open={schemaOpen} onToggle={() => setSchemaOpen(v => !v)} db={dbRef.current}/>
        </aside>

        {!sidebarOpen && (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            Lessons
          </button>
        )}

        {/* Main */}
        <div className={s.main}>

          {/* Concept panel */}
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen(v => !v)}>
              <div className={s.conceptTitle}>
                <span className={s.chapterTag}>{lesson.chapter}</span>
                {lesson.title}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`${s.conceptChevron} ${conceptOpen ? s.conceptChevronOpen : ''}`}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            {conceptOpen && (
              <div className={s.conceptBody}>
                {lesson.concept.split('\n\n').map((p, i) => <p key={i}><ConceptText text={p}/></p>)}
              </div>
            )}
          </div>

          {/* Challenge */}
          {lesson.challenge && (
            <ChallengeWidget
              challenge={lesson.challenge}
              picked={challengePick}
              onPick={setChallengePick}
              onReset={() => setChallengePick(null)}
            />
          )}

          {/* Tab bar */}
          <div className={s.tabBar}>
            {tabs.map(tab => (
              <div key={tab.id} className={`${s.tab} ${tab.id === activeTabId ? s.tabActive : ''}`}>
                <button className={s.tabLabel} onClick={() => {
                  setActiveTabId(tab.id);
                  const tabSql = tab.sql.trim();
                  if (tabSql && dbRef.current) {
                    activeSqlRef.current = tab.sql;
                    executeQuery(dbRef.current, tab.sql);
                  }
                }}>{tab.label}</button>
                {tab.id !== LESSON_TAB_ID && (
                  <button className={s.tabClose} onClick={() => closeTab(tab.id)}>✕</button>
                )}
              </div>
            ))}
            <button className={s.tabAdd} onClick={addTab} title="New query tab">+</button>
          </div>

          {/* Editor + Results split */}
          <div ref={workAreaRef} className={s.workArea}>

            {/* Editor */}
            <div className={s.editorPane} style={isMobile ? {} : { flex: `0 0 ${editorPct}%` }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>SQL Editor</span>
                <div className={s.paneActions}>
                  <button className={s.runBtn} onClick={() => runQuery()} disabled={dbStatus !== 'ready' || running} title="Run (Ctrl+Enter)">
                    {running ? <span className={s.spinner}/> : <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
                    {running ? 'Running…' : 'Run'}
                  </button>
                  <button className={s.iconBtn} onClick={runExplain} disabled={dbStatus !== 'ready'} title="Explain query plan">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>
                    Explain
                  </button>
                  <div className={s.historyWrap} ref={historyWrapRef}>
                    <button className={s.iconBtn} onClick={() => setShowHistory(v => !v)} title="Query history">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                      History
                    </button>
                    {showHistory && (
                      <HistoryDropdown
                        history={history}
                        onSelect={sql => { updateActiveSql(sql); activeSqlRef.current = sql; }}
                        onClose={() => setShowHistory(false)}
                        anchorRef={historyWrapRef}
                      />
                    )}
                  </div>
                  <button className={s.iconBtn} onClick={resetSql} title="Reset to lesson SQL">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                    Reset
                  </button>
                  <button className={s.iconBtn} onClick={copySql}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    Copy
                  </button>
                  <span className={s.hintKey}>Ctrl+Enter</span>
                </div>
              </div>
              <div className={s.editorWrap}>
                <LineNums count={lineCount} scrollRef={lineNumsRef}/>
                <div className={s.codeArea}>
                  <pre ref={highlightRef} className={s.highlight} aria-hidden="true" dangerouslySetInnerHTML={{ __html: highlighted + '\n' }}/>
                  <textarea
                    ref={textareaRef}
                    className={s.editor}
                    value={activeSql}
                    onChange={e => updateActiveSql(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={syncScroll}
                    spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off"
                  />
                </div>
              </div>
            </div>

            {/* Drag handle */}
            <div className={`${s.dragHandle} ${isDragging ? s.dragHandleActive : ''}`} onMouseDown={startDrag}/>

            {/* Results pane */}
            <div className={s.resultsPane} style={isMobile ? {} : { flex: `0 0 ${100 - editorPct - 0.5}%` }}>
              <div className={s.paneHeader}>
                <div className={s.resultsTabs}>
                  <button className={`${s.resultsTabBtn} ${resultsTab === 'results' ? s.resultsTabActive : ''}`} onClick={() => setResultsTab('results')}>
                    Results
                    {results && <span className={s.rowCount}>{results.rows.length}</span>}
                  </button>
                  {showExplain && (
                    <button className={`${s.resultsTabBtn} ${resultsTab === 'explain' ? s.resultsTabActive : ''}`} onClick={() => setResultsTab('explain')}>
                      Query Plan
                    </button>
                  )}
                  {execTime != null && <span className={s.execTime}>{execTime < 1000 ? `${execTime.toFixed(0)}ms` : `${(execTime/1000).toFixed(2)}s`}</span>}
                </div>
                <div className={s.paneActions}>
                  {lesson.task && (
                    <button className={`${s.iconBtn} ${showTask ? s.iconBtnActive : ''}`} onClick={() => setShowTask(v => !v)} title="Show challenge task">
                      Challenge
                    </button>
                  )}
                  <button className={`${s.iconBtn} ${dataEditorOpen ? s.iconBtnActive : ''}`} onClick={() => setDataEditorOpen(v => !v)} title="Data editor" disabled={dbStatus !== 'ready'}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="9" x2="9" y2="21"/></svg>
                    Data
                  </button>
                  {results && (
                    <button className={s.iconBtn} onClick={exportCsv}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      CSV
                    </button>
                  )}
                </div>
              </div>

              <div className={s.resultsBody}>
                {dataEditorOpen ? (
                  <DataEditor schema={schema} db={dbRef.current} onClose={() => setDataEditorOpen(false)}/>
                ) : showTask && lesson.task ? (
                  <TaskWidget task={lesson.task} db={dbRef.current}/>
                ) : resultsTab === 'explain' && explainLines ? (
                  <ExplainPanel lines={explainLines} onClose={() => { setShowExplain(false); setResultsTab('results'); }}/>
                ) : (
                  <>
                    {dbStatus === 'loading' && <div className={s.emptyState}><span className={s.spinner}/> Loading PostgreSQL engine…</div>}
                    {dbStatus === 'error'   && <div className={s.emptyState} style={{ color: 'var(--err)' }}>Failed to load PostgreSQL engine. Check your connection and reload.</div>}
                    {dbStatus === 'ready' && !results && !error && !resultMsg && (
                      <div className={s.emptyState}>Press <kbd>Ctrl+Enter</kbd> or click <strong>Run</strong> to execute the query</div>
                    )}
                    {error && (
                      <div>
                        <div className={s.errorMsg}>{error}</div>
                        {errorHint && <div className={s.errorHint}>💡 {errorHint}</div>}
                      </div>
                    )}
                    {resultMsg && <div className={s.successMsg}>{resultMsg}</div>}
                    {results && <ResultsTable fields={results.fields} rows={results.rows}/>}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Nav footer */}
          <div className={s.navFooter}>
            <button className={s.navBtn} disabled={activeIdx === 0} onClick={() => selectLesson(activeIdx - 1)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              Previous
            </button>
            <div className={s.navCounter}>{activeIdx + 1} / {LESSONS.length}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className={`${s.doneBtn} ${isDone ? s.doneBtnComplete : ''}`} onClick={markDone}>
                {isDone ? '✓ Done' : 'Mark Done'}
              </button>
              <button className={s.navBtn} disabled={activeIdx === LESSONS.length - 1} onClick={() => selectLesson(activeIdx + 1)}>
                Next
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}
