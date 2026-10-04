'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import JsonToolsTopNav from '@/components/JsonToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const SAMPLE_DATA = [
  { id: 1, name: 'Alice Chen', role: 'Frontend Engineer', department: 'Engineering', salary: 135000, active: true, joined: '2021-03-15' },
  { id: 2, name: 'Bob Martinez', role: 'Product Designer', department: 'Design', salary: 115000, active: true, joined: '2020-07-01' },
  { id: 3, name: 'Carol White', role: 'Backend Engineer', department: 'Engineering', salary: 140000, active: false, joined: '2019-11-20' },
  { id: 4, name: 'David Kim', role: 'Data Scientist', department: 'Analytics', salary: 130000, active: true, joined: '2022-01-10' },
  { id: 5, name: 'Eva Rossi', role: 'DevOps Engineer', department: 'Infrastructure', salary: 125000, active: true, joined: '2021-09-05' },
];

function flattenShallow(obj) {
  if (typeof obj !== 'object' || obj === null) return { value: obj };
  return { ...obj };
}

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const HISTORY_KEY = 'jsontableviewer_history';
const MAX_HISTORY = 15;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

function persistHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {}
  return history;
}

export default function JsonTableViewerTool() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [allData, setAllData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [visibleCols, setVisibleCols] = useState(new Set());
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [nestedJson, setNestedJson] = useState(null);
  const [colDropOpen, setColDropOpen] = useState(false);
  const [copyDone, setCopyDone] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const historyIdRef = useRef(0);

  const parseJSON = useCallback((raw) => {
    if (!raw.trim()) { setError('Please paste some JSON first.'); return false; }
    let parsed;
    try { parsed = JSON.parse(raw); } catch (e) { setError('JSON parse error: ' + e.message); return false; }
    setError('');
    let arr = [];
    if (Array.isArray(parsed)) arr = parsed;
    else if (typeof parsed === 'object' && parsed !== null) {
      const arrKey = Object.keys(parsed).find(k => Array.isArray(parsed[k]));
      arr = arrKey ? parsed[arrKey] : [parsed];
    }
    if (arr.length === 0) { setError('No data rows found.'); return false; }
    const flattened = arr.map(flattenShallow);
    const colSet = new Set();
    flattened.forEach(row => Object.keys(row).forEach(k => colSet.add(k)));
    const cols = [...colSet];
    setAllData(flattened);
    setColumns(cols);
    setVisibleCols(new Set(cols));
    setSortCol(null); setSortDir('asc');
    setSearch(''); setPage(1);
    return true;
  }, []);

  useEffect(() => {
    const stored = loadHistory();
    setHistory(stored);
    historyIdRef.current = stored.reduce((maxId, entry) => Math.max(maxId, entry.id || 0), 0);
    const s = JSON.stringify(SAMPLE_DATA, null, 2);
    setInput(s);
    parseJSON(s);
  }, [parseJSON]);

  // Filtered + sorted data
  const filteredData = (() => {
    let data = [...allData];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(row => Object.values(row).some(v => {
        if (v === null || v === undefined) return false;
        if (typeof v === 'object') return JSON.stringify(v).toLowerCase().includes(q);
        return String(v).toLowerCase().includes(q);
      }));
    }
    if (sortCol) {
      data.sort((a, b) => {
        const av = a[sortCol]; const bv = b[sortCol];
        const aStr = av === null || av === undefined ? '' : typeof av === 'object' ? JSON.stringify(av) : String(av);
        const bStr = bv === null || bv === undefined ? '' : typeof bv === 'object' ? JSON.stringify(bv) : String(bv);
        const n = parseFloat(aStr) - parseFloat(bStr);
        const cmp = isNaN(n) ? aStr.localeCompare(bStr) : n;
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return data;
  })();

  const ps = pageSize === 0 ? filteredData.length || 1 : pageSize;
  const totalPages = Math.ceil(filteredData.length / ps);
  const pageData = filteredData.slice((page - 1) * ps, (page - 1) * ps + ps);
  const visibleColsList = columns.filter(c => visibleCols.has(c));

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
    setPage(1);
  };

  const saveHistoryEntry = useCallback((action, text) => {
    if (!text || !text.trim()) return;
    const entryText = text.trim();
    const entry = {
      id: ++historyIdRef.current,
      action,
      ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      rows: entryText.split('\n').length,
      chars: entryText.length,
      preview: entryText.replace(/\s+/g, ' ').trim().slice(0, 120),
      text: entryText,
    };
    setHistory(prev => persistHistory([entry, ...prev].slice(0, MAX_HISTORY)));
  }, []);

  const exportCSV = () => {
    const cols = visibleColsList;
    const rows = [cols.join(',')];
    filteredData.forEach(row => {
      rows.push(cols.map(col => {
        const v = row[col];
        if (v === null || v === undefined) return '';
        const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
        return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
      }).join(','));
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([rows.join('\n')], { type: 'text/csv' }));
    a.download = 'data.csv'; a.click();
  };

  const copyTable = () => {
    const cols = visibleColsList;
    const rows = [cols.join('\t')];
    filteredData.forEach(row => {
      rows.push(cols.map(col => {
        const v = row[col];
        if (v === null || v === undefined) return '';
        return typeof v === 'object' ? JSON.stringify(v) : String(v);
      }).join('\t'));
    });
    navigator.clipboard.writeText(rows.join('\n')).then(() => {
      setCopyDone(true); setTimeout(() => setCopyDone(false), 1500);
    });
  };

  const renderCell = (v) => {
    if (v === null || v === undefined) return <span className={styles.cellNull}>null</span>;
    if (typeof v === 'boolean') return <span className={styles.cellBool}>{String(v)}</span>;
    if (typeof v === 'number') return <span className={styles.cellNum}>{v}</span>;
    if (typeof v === 'object') {
      const preview = Array.isArray(v) ? `[…] ${v.length} items` : `{…} ${Object.keys(v).length} keys`;
      return <span className={styles.cellObj} onClick={() => setNestedJson(JSON.stringify(v, null, 2))}>{preview}</span>;
    }
    return <span className={styles.cellStr}>{String(v)}</span>;
  };

  const hasData = allData.length > 0;

  return (
    <div className={styles.wrap}>
      <JsonToolsTopNav active="json-table-viewer" />
      <PlaygroundTopAd />
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>⊞</div>
          <span>JSON <span className={styles.logoAccent}>Table Viewer</span></span>
        </div>
        <div className={styles.headerRight}>
          <button className={`${styles.btnSm} ${styles.historyTopBtn}`} onClick={() => setHistoryOpen(true)}>
            History{history.length ? ` (${history.length})` : ''}
          </button>
          <span className={styles.tag}>JSON → Table</span>
        </div>
      </header>

      {/* Input area */}
      <div className={styles.inputSection}>
        <div className={styles.inputHeader}>
          <span className={styles.inputLabel}>JSON Input</span>
          <div className={styles.inputActions}>
            <button className={styles.btnSm} onClick={() => { setInput(JSON.stringify(SAMPLE_DATA, null, 2)); parseJSON(JSON.stringify(SAMPLE_DATA)); }}>Sample</button>
            <button className={styles.btnSm} onClick={() => { setInput(''); setAllData([]); setColumns([]); setError(''); }}>Clear</button>
            <button className={styles.btnPrimary} onClick={() => { if (parseJSON(input)) saveHistoryEntry('Parse', input); }}>Parse →</button>
          </div>
        </div>
        <textarea
          className={`${styles.inputArea} ${error ? styles.inputError : ''}`}
          value={input}
          onChange={e => setInput(e.target.value)}
          onPaste={e => { const text = e.clipboardData.getData('text'); setTimeout(() => { setInput(text); if (parseJSON(text)) saveHistoryEntry('Paste', text); }, 0); }}
          onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); parseJSON(input); } }}
          placeholder='Paste JSON array here… or click Sample. Use Ctrl+Enter to parse.'
          spellCheck={false}
          rows={6}
        />
        {error && <div className={styles.errorMsg}>{error}</div>}
      </div>

      {hasData && (
        <>
          {/* Stats + toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.stats}>
              <span className={styles.stat}>Rows: <strong>{allData.length}</strong></span>
              <span className={styles.stat}>Cols: <strong>{columns.length}</strong></span>
              <span className={styles.stat}>Filtered: <strong>{filteredData.length}</strong></span>
            </div>
            <div className={styles.toolbarRight}>
              <input type="text" className={styles.searchInput} placeholder="Search…"
                value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
              <div className={styles.colToggleWrap}>
                <button className={styles.btnSm} onClick={() => setColDropOpen(o => !o)}>Columns ▾</button>
                {colDropOpen && (
                  <div className={styles.colDropdown}>
                    {columns.map(col => (
                      <label key={col} className={styles.colLabel}>
                        <input type="checkbox" checked={visibleCols.has(col)}
                          onChange={e => {
                            const next = new Set(visibleCols);
                            if (e.target.checked) next.add(col); else next.delete(col);
                            setVisibleCols(next);
                          }} />
                        {col}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <select className={styles.pageSizeSelect} value={pageSize} onChange={e => { setPageSize(parseInt(e.target.value)); setPage(1); }}>
                <option value="10">10 / page</option>
                <option value="25">25 / page</option>
                <option value="50">50 / page</option>
                <option value="100">100 / page</option>
                <option value="0">All</option>
              </select>
              <div className={styles.divider} />
              <button className={styles.btnSm} onClick={exportCSV}>↓ CSV</button>
              <button className={styles.btnSm} onClick={copyTable}>{copyDone ? '✓ Copied!' : 'TSV'}</button>
            </div>
          </div>

          {/* Table */}
          <div className={styles.tableWrap}>
            {pageData.length === 0 ? (
              <div className={styles.noResults}>∅ No matching rows found.</div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.rowNum}>#</th>
                    {visibleColsList.map(col => (
                      <th key={col}
                        className={sortCol === col ? (sortDir === 'asc' ? styles.sortedAsc : styles.sortedDesc) : ''}
                        onClick={() => handleSort(col)}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageData.map((row, i) => (
                    <tr key={i}>
                      <td className={styles.rowNum}>{(page - 1) * ps + i + 1}</td>
                      {visibleColsList.map(col => (
                        <td key={col}>{renderCell(row[col])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <span className={styles.pageInfo}>
                Showing {(page - 1) * ps + 1}–{Math.min(page * ps, filteredData.length)} of {filteredData.length} rows
              </span>
              <div className={styles.pageBtns}>
                <button className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(p => p - 1)}>←</button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(p => (
                  <button key={p} className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`} onClick={() => setPage(p)}>{p}</button>
                ))}
                {totalPages > 7 && <span className={styles.pageBtn}>…</span>}
                <button className={styles.pageBtn} disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>→</button>
              </div>
            </div>
          )}

        </>
      )}

      {/* Nested panel */}
      {historyOpen && (
        <div className={styles.historyOverlay} onClick={() => setHistoryOpen(false)}>
          <aside className={styles.historyPanel} onClick={e => e.stopPropagation()}>
            <div className={styles.historyPanelHead}>
              <span className={styles.historyPanelTitle}>History</span>
              <div className={styles.historyPanelActions}>
                <button className={`${styles.btnSm} ${styles.btnDanger}`} onClick={() => { setHistory([]); try { localStorage.setItem(HISTORY_KEY, JSON.stringify([])); } catch {} }} disabled={!history.length}>Clear</button>
                <button className={styles.btnSm} onClick={() => setHistoryOpen(false)}>Close</button>
              </div>
            </div>

            {history.length === 0 ? (
              <div className={styles.historyEmpty}>No history yet. Parse, paste, or upload JSON to save snapshots.</div>
            ) : (
              <div className={styles.historyList}>
                {history.map(entry => (
                  <button key={entry.id} className={styles.historyItem} onClick={() => { setInput(entry.text); parseJSON(entry.text); setHistoryOpen(false); }}>
                    <div className={styles.historyItemTop}>
                      <span className={styles.historyItemAction}>{entry.action}</span>
                      <span className={styles.historyItemTs}>{entry.ts}</span>
                    </div>
                    <div className={styles.historyItemMeta}>{entry.rows} lines · {entry.chars} chars</div>
                    <div className={styles.historyItemPreview}>{entry.preview}</div>
                  </button>
                ))}
              </div>
            )}
          </aside>
        </div>
      )}

      {nestedJson && (
        <div className={styles.nestedOverlay} onClick={() => setNestedJson(null)}>
          <div className={styles.nestedPanel} onClick={e => e.stopPropagation()}>
            <div className={styles.nestedHeader}>
              <span>Nested Value</span>
              <button className={styles.btnSm} onClick={() => setNestedJson(null)}>✕</button>
            </div>
            <pre className={styles.nestedPre}>{nestedJson}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
