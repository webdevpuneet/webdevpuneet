'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { createDatabase, SAMPLE_DATA } from './mongo-engine';
import { CHAPTERS, LESSONS } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── Constants ─────────────────────────────────────────────────────────────── */
const LS_PROGRESS = 'fwd-mongo-playground-progress';
const LS_POSITION = 'fwd-mongo-playground-position';

function readProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_PROGRESS) || '[]')); }
  catch { return new Set(); }
}
function saveProgress(set) { try { localStorage.setItem(LS_PROGRESS, JSON.stringify([...set])); } catch {} }
function readPosition() { try { return JSON.parse(localStorage.getItem(LS_POSITION) || '0'); } catch { return 0; } }
function savePosition(idx) { try { localStorage.setItem(LS_POSITION, JSON.stringify(idx)); } catch {} }

/* ── Fake ObjectId ─────────────────────────────────────────────────────────── */
function fakeObjectId(val) {
  if (val !== undefined) return 'ObjectId("' + val + '")';
  return 'ObjectId("' + Math.random().toString(36).slice(2, 26) + '")';
}

/* ── Mongo syntax highlighter ──────────────────────────────────────────────── */
const MONGO_METHODS = new Set([
  'find','findOne','countDocuments','distinct','insertOne','insertMany',
  'updateOne','updateMany','replaceOne','deleteOne','deleteMany','aggregate',
  'sort','limit','skip','project','toArray','count','drop','getCollectionNames',
]);
const JS_KW = new Set([
  'var','let','const','return','function','if','else','for','while','do',
  'new','true','false','null','undefined','of','in','break','continue',
  'typeof','instanceof','throw','try','catch','finally','class','this',
]);
const COLLECTION_NAMES = new Set(['employees','products','orders','reviews']);

const esc = v => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function highlightMongo(code) {
  let out = '', i = 0;
  const n = code.length;
  while (i < n) {
    const c = code[i];
    if (/\s/.test(c)) { out += c; i++; continue; }
    // Comment
    if (c === '/' && code[i + 1] === '/') {
      let j = i; while (j < n && code[j] !== '\n') j++;
      out += '<span class="mg-cm">' + esc(code.slice(i, j)) + '</span>'; i = j; continue;
    }
    // String
    if (c === '"' || c === "'") {
      const q = c; let j = i + 1;
      while (j < n) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === q) { j++; break; }
        if (code[j] === '\n') break;
        j++;
      }
      out += '<span class="mg-str">' + esc(code.slice(i, j)) + '</span>'; i = j; continue;
    }
    // Template literal
    if (c === '`') {
      let j = i + 1;
      while (j < n) { if (code[j] === '\\') { j += 2; continue; } if (code[j] === '`') { j++; break; } j++; }
      out += '<span class="mg-str">' + esc(code.slice(i, j)) + '</span>'; i = j; continue;
    }
    // Number
    if (/[0-9]/.test(c) || (c === '-' && /[0-9]/.test(code[i + 1] || ''))) {
      let j = i; if (c === '-') j++;
      while (j < n && /[0-9._eExXa-fA-F]/.test(code[j])) j++;
      out += '<span class="mg-num">' + esc(code.slice(i, j)) + '</span>'; i = j; continue;
    }
    // Identifier / keyword
    if (/[a-zA-Z_$]/.test(c)) {
      let j = i; while (j < n && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (JS_KW.has(word)) out += '<span class="mg-kw">' + esc(word) + '</span>';
      else if (MONGO_METHODS.has(word)) out += '<span class="mg-kw">' + esc(word) + '</span>';
      else if (COLLECTION_NAMES.has(word)) out += '<span class="mg-col">' + esc(word) + '</span>';
      else if (word === 'db') out += '<span class="mg-col">' + esc(word) + '</span>';
      else out += esc(word);
      i = j; continue;
    }
    // $ operator names
    if (c === '$') {
      let j = i; while (j < n && /[a-zA-Z0-9_]/.test(code[j])) j++;
      out += '<span class="mg-op">' + esc(code.slice(i, j)) + '</span>'; i = j; continue;
    }
    // Brackets
    if ('{}[]()'.includes(c)) { out += '<span class="mg-br">' + esc(c) + '</span>'; i++; continue; }
    out += esc(c); i++;
  }
  return out;
}

/* ── JSON colorizer ────────────────────────────────────────────────────────── */
function colorizeJson(val, indent) {
  if (indent === undefined) indent = 0;
  const pad = '  '.repeat(indent);
  const padIn = '  '.repeat(indent + 1);
  if (val === null) return '<span class="jnl">null</span>';
  if (typeof val === 'boolean') return '<span class="jb">' + val + '</span>';
  if (typeof val === 'number') return '<span class="jn">' + val + '</span>';
  if (typeof val === 'string') return '<span class="js">' + esc(JSON.stringify(val)) + '</span>';
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    const items = val.map(v => padIn + colorizeJson(v, indent + 1));
    return '[\n' + items.join(',\n') + '\n' + pad + ']';
  }
  if (typeof val === 'object') {
    const keys = Object.keys(val);
    if (keys.length === 0) return '{}';
    const items = keys.map(k => padIn + '<span class="jk">' + esc(JSON.stringify(k)) + '</span>: ' + colorizeJson(val[k], indent + 1));
    return '{\n' + items.join(',\n') + '\n' + pad + '}';
  }
  return esc(String(val));
}

/* ── Sub-components ────────────────────────────────────────────────────────── */

function ConceptText({ text }) {
  const paragraphs = text.split('\n\n');
  return (
    <>
      {paragraphs.map((para, pi) => {
        const parts = para.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
        return (
          <p key={pi}>
            {parts.map((part, i) => {
              if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
              if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
              return part;
            })}
          </p>
        );
      })}
    </>
  );
}

function LineNums({ count, scrollRef }) {
  return (
    <div ref={scrollRef} className={s.lineNums} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={s.lineNum}>{i + 1}</div>
      ))}
    </div>
  );
}

function DocCard({ doc }) {
  const html = useMemo(() => colorizeJson(doc, 0), [doc]);
  return (
    <div className={s.docCard}>
      <pre className={s.docJson} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

function DocsPanel({ docs, execTime }) {
  const MAX_DISPLAY = 20;
  const display = docs.slice(0, MAX_DISPLAY);
  return (
    <div className={s.docsArea}>
      {execTime != null && docs.length > 0 && (
        <div style={{ fontSize: 11, color: 'var(--text3)', paddingBottom: 2 }}>
          {docs.length} document{docs.length !== 1 ? 's' : ''} &nbsp;·&nbsp; {execTime.toFixed(1)}ms
        </div>
      )}
      {display.map((doc, i) => <DocCard key={i} doc={doc} />)}
      {docs.length > MAX_DISPLAY && (
        <div className={s.showingMore}>Showing first {MAX_DISPLAY} of {docs.length} documents</div>
      )}
    </div>
  );
}

function PreviewSection({ title, docs }) {
  if (!Array.isArray(docs) || docs.length === 0) return null;
  return (
    <div className={s.previewSection}>
      <div className={s.previewTitle}>{title}</div>
      {docs.map((doc, i) => <DocCard key={i} doc={doc} />)}
    </div>
  );
}

function OperationPanel({ result, execTime }) {
  const preview = result && result._preview;
  return (
    <div className={s.docsArea}>
      {execTime != null && <div style={{ fontSize: 11, color: 'var(--text3)', paddingBottom: 2 }}>{execTime.toFixed(1)}ms</div>}
      <PreviewSection title="Inserted documents" docs={preview && preview.inserted} />
      <PreviewSection title="Before update" docs={preview && preview.before} />
      <PreviewSection title="After update" docs={preview && preview.after} />
      <PreviewSection title="Deleted documents" docs={preview && preview.deleted} />
      <PreviewSection title="Operation result" docs={[result]} />
    </div>
  );
}

function CollectionsPanel({ onInsert }) {
  const names = ['employees', 'products', 'orders', 'reviews'];
  const counts = useMemo(() => {
    const obj = {};
    for (const n of names) obj[n] = SAMPLE_DATA[n].length;
    return obj;
  }, []);
  return (
    <div className={s.collectionsArea}>
      <div style={{ fontSize: 11, color: 'var(--text3)', paddingBottom: 4 }}>Click a collection to insert a find() query</div>
      {names.map(name => (
        <div key={name} className={s.collectionRow} onClick={() => onInsert('db.' + name + '.find()')}>
          <span className={s.collectionName}>db.{name}</span>
          <span className={s.collectionCount}>{counts[name]} docs</span>
        </div>
      ))}
    </div>
  );
}

function ChallengeWidget({ challenge, lessonId }) {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState(null);

  // Reset when lesson changes
  useEffect(() => { setOpen(false); setPicked(null); }, [lessonId]);

  return (
    <div className={s.challenge}>
      <div className={s.challengeTitle} onClick={() => setOpen(v => !v)}>
        <span className={s.challengeTitleLabel}>Quick Check</span>
        <span className={s.challengeQuestion}>{challenge.question}</span>
        <svg className={s.challengeChevron + (open ? ' ' + s.challengeChevronOpen : '')} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && (
        <>
          <div className={s.challengeOptions}>
            {challenge.options.map((opt, i) => {
              let cls = s.challengeBtn;
              if (picked !== null) {
                if (i === challenge.correct) cls += ' ' + s.challengeReveal;
                else if (i === picked) cls += ' ' + s.challengeWrong;
              }
              return (
                <button key={i} className={cls} onClick={() => picked === null && setPicked(i)}>
                  <span style={{ fontWeight: 700, flexShrink: 0, color: 'var(--text3)', fontSize: 11 }}>{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <button className={s.challengeReset} onClick={() => setPicked(null)}>Try again</button>
          )}
        </>
      )}
    </div>
  );
}

/* ── Main component ────────────────────────────────────────────────────────── */
export default function MongoPlaygroundTool() {
  /* ── Core state ── */
  const [activeIdx,   setActiveIdx]   = useState(0);
  const [code,        setCode]        = useState(LESSONS[0].code);
  const [results,     setResults]     = useState(null);
  const [resultType,  setResultType]  = useState(null); // 'docs' | 'operation' | 'count' | 'multi' | 'error' | null
  const [error,       setError]       = useState('');
  const [execTime,    setExecTime]    = useState(null);
  const [progress,    setProgress]    = useState(() => new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conceptOpen, setConceptOpen] = useState(true);
  const [search,      setSearch]      = useState('');
  const [activeTab,   setActiveTab]   = useState('results');
  const [toast,       setToast]       = useState('');
  const [editorPct,   setEditorPct]   = useState(50);
  const [isDragging,  setIsDragging]  = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);

  /* ── Refs ── */
  const dbRef        = useRef(null);
  const textareaRef  = useRef(null);
  const highlightRef = useRef(null);
  const lineNumsRef  = useRef(null);
  const workAreaRef  = useRef(null);
  const codeRef      = useRef(code);
  const dragging     = useRef(false);

  useEffect(() => { codeRef.current = code; }, [code]);

  const lesson = LESSONS[activeIdx];

  /* ── Toast helper ── */
  const showToast = useCallback((msg) => {
    setToast(msg); setTimeout(() => setToast(''), 2000);
  }, []);

  /* ── Mobile detection ── */
  useEffect(() => {
    const check = () => {
      const m = window.innerWidth < 768;
      setIsMobile(m);
      if (m) setSidebarOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Restore progress & position ── */
  useEffect(() => {
    setProgress(readProgress());
    const pos = readPosition();
    if (pos > 0 && pos < LESSONS.length) {
      setActiveIdx(pos);
      setCode(LESSONS[pos].code);
      codeRef.current = LESSONS[pos].code;
    }
  }, []);

  /* ── Run query ── */
  const runQuery = useCallback((codeOverride) => {
    const src = codeOverride !== undefined ? codeOverride : codeRef.current;
    const db = createDatabase();
    dbRef.current = db;
    const t0 = performance.now();
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('db', 'ObjectId', src + '\n//# sourceURL=mongo-playground.js');
      const raw = fn(db, fakeObjectId);
      const elapsed = performance.now() - t0;
      setExecTime(elapsed);
      setError('');

      if (raw === null || raw === undefined) {
        setResults({ type: 'null', value: raw });
        setResultType('operation');
        return;
      }
      // Cursor
      if (raw && typeof raw.toArray === 'function') {
        const arr = raw.toArray();
        setResults(arr);
        setResultType('docs');
        return;
      }
      // Array
      if (Array.isArray(raw)) {
        setResults(raw);
        setResultType('docs');
        return;
      }
      // Operation result (acknowledged)
      if (typeof raw === 'object' && raw !== null && 'acknowledged' in raw) {
        setResults(raw);
        setResultType('operation');
        return;
      }
      // Number (countDocuments, etc.)
      if (typeof raw === 'number') {
        setResults(raw);
        setResultType('count');
        return;
      }
      // Plain object with multiple keys (multi-query result)
      if (typeof raw === 'object' && raw !== null) {
        setResults(raw);
        setResultType('multi');
        return;
      }
      // Anything else
      setResults(raw);
      setResultType('operation');
    } catch (err) {
      const elapsed = performance.now() - t0;
      setExecTime(elapsed);
      setError(err.message || 'Execution failed');
      setResults(null);
      setResultType('error');
    }
  }, []);

  /* ── Run initial query on mount ── */
  useEffect(() => {
    runQuery(codeRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Select lesson ── */
  const selectLesson = useCallback((idx) => {
    const lessonCode = LESSONS[idx].code;
    setActiveIdx(idx);
    setCode(lessonCode);
    codeRef.current = lessonCode;
    setResults(null);
    setResultType(null);
    setError('');
    setExecTime(null);
    setActiveTab('results');
    savePosition(idx);
    // Run with a fresh db
    setTimeout(() => runQuery(lessonCode), 0);
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
      saveProgress(next);
      return next;
    });
  }, [lesson.id, activeIdx, selectLesson, showToast]);

  /* ── Reset code ── */
  const resetCode = useCallback(() => {
    setCode(lesson.code);
    codeRef.current = lesson.code;
    showToast('Reset to lesson code');
    runQuery(lesson.code);
  }, [lesson.code, runQuery, showToast]);

  /* ── Copy code ── */
  const copyCode = useCallback(async () => {
    try { await navigator.clipboard.writeText(codeRef.current); showToast('Copied'); }
    catch { showToast('Copy failed'); }
  }, [showToast]);

  /* ── Keyboard handler ── */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = codeRef.current.slice(0, start) + '  ' + codeRef.current.slice(end);
      setCode(next);
      codeRef.current = next;
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runQuery();
    }
  }, [runQuery]);

  /* ── Scroll sync ── */
  const syncScroll = useCallback((e) => {
    if (lineNumsRef.current) lineNumsRef.current.scrollTop = e.target.scrollTop;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  }, []);

  /* ── Drag handle ── */
  const startDrag = useCallback((e) => {
    e.preventDefault();
    if (!workAreaRef.current) return;
    dragging.current = true;
    setIsDragging(true);
    document.body.style.userSelect = 'none';
    const rect = workAreaRef.current.getBoundingClientRect();
    const onMove = (ev) => {
      if (!dragging.current) return;
      setEditorPct(Math.max(20, Math.min(80, ((ev.clientX - rect.left) / rect.width) * 100)));
    };
    const onUp = () => {
      dragging.current = false;
      setIsDragging(false);
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  /* ── Computed ── */
  const lineCount   = useMemo(() => code.split('\n').length, [code]);
  const highlighted = useMemo(() => highlightMongo(code), [code]);
  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);

  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return LESSONS.filter(l => l.title.toLowerCase().includes(q) || l.chapter.toLowerCase().includes(q));
  }, [search]);

  /* ── Render results panel body ── */
  function renderResultsBody() {
    if (error) {
      return (
        <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
          <div className={s.errorMsg}>{error}</div>
        </div>
      );
    }
    if (results === null && !error) {
      return (
        <div className={s.emptyState}>
          Press <kbd>Ctrl+Enter</kbd> or click <strong>Run</strong> to execute the query
        </div>
      );
    }
    if (activeTab === 'collections') {
      return <CollectionsPanel onInsert={(q) => { setCode(q); codeRef.current = q; runQuery(q); }} />;
    }
    if (resultType === 'docs') {
      const docs = Array.isArray(results) ? results : [];
      if (docs.length === 0) {
        return <div className={s.emptyState}>No documents matched — try adjusting your filter.</div>;
      }
      return <DocsPanel docs={docs} execTime={execTime} />;
    }
    if (resultType === 'count') {
      return (
        <div className={s.resultSingle}>
          <div className={s.resultCard}>
            <strong style={{ fontSize: 28, display: 'block', color: '#00ed64', marginBottom: 4 }}>{results}</strong>
            document{results !== 1 ? 's' : ''} matched
          </div>
        </div>
      );
    }
    if (resultType === 'operation' || resultType === 'multi') {
      return <OperationPanel result={results} execTime={execTime} />;
    }
    return <div className={s.emptyState}>No results</div>;
  }

  /* ── Render ── */
  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="mongo-playground" />

      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/mongo-playground.svg" width={22} height={22} alt="" />
          <span className={s.headerTitle}>Mongo <span className={s.accent}>Playground</span></span>
          <span className={s.headerBreadcrumb}>{lesson.chapter} &rarr; {lesson.title}</span>
        </div>
        <div className={s.headerRight}>
          <span className={s.progressBadge}>{completedCount}/{LESSONS.length}</span>
        </div>
      </header>

      {/* Body */}
      <div className={s.body}>

        {/* Sidebar */}
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <div className={s.sidebarPill}>
              <span className={s.sidebarPillDot} />
              MongoDB
            </div>
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>
          <div className={s.searchWrap}>
            <input
              className={s.searchInput}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search lessons…"
            />
          </div>
          <div className={s.progress}>
            <div className={s.progressLabel}>
              <span>Progress</span>
              <span>{completedCount}/{LESSONS.length}</span>
            </div>
            <div className={s.progressBar}>
              <div className={s.progressFill} style={{ width: (completedCount / LESSONS.length * 100) + '%' }} />
            </div>
          </div>
          <div className={s.lessonList}>
            {filteredLessons ? (
              filteredLessons.length === 0
                ? <div className={s.noResults}>No lessons found</div>
                : filteredLessons.map(l => {
                    const idx = LESSONS.indexOf(l);
                    return (
                      <button
                        key={l.id}
                        className={s.lessonBtn + (idx === activeIdx ? ' ' + s.lessonBtnActive : '') + (progress.has(l.id) ? ' ' + s.lessonBtnDone : '')}
                        onClick={() => selectLesson(idx)}
                      >
                        <span className={s.lessonDot} />
                        {l.title}
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
                      <button
                        key={l.id}
                        className={s.lessonBtn + (idx === activeIdx ? ' ' + s.lessonBtnActive : '') + (progress.has(l.id) ? ' ' + s.lessonBtnDone : '')}
                        onClick={() => selectLesson(idx)}
                      >
                        <span className={s.lessonDot} />
                        {l.title}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </aside>

        {!sidebarOpen && (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            Lessons
          </button>
        )}

        {/* Main */}
        <div className={s.main}>
          <PlaygroundTopAd />

          {/* Concept panel */}
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen(v => !v)}>
              <div className={s.conceptTitle}>
                <span className={s.chapterTag}>{lesson.chapter}</span>
                {lesson.title}
              </div>
              <svg
                className={s.conceptChevron + (conceptOpen ? ' ' + s.conceptChevronOpen : '')}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {conceptOpen && (
              <div className={s.conceptBody}>
                <ConceptText text={lesson.concept} />
              </div>
            )}
          </div>

          {/* Challenge */}
          {lesson.challenge && (
            <ChallengeWidget key={lesson.id} challenge={lesson.challenge} lessonId={lesson.id} />
          )}

          {/* Editor + Results */}
          <div ref={workAreaRef} className={s.workArea}>

            {/* Editor pane */}
            <div className={s.editorPane} style={isMobile ? {} : { flex: '0 0 ' + editorPct + '%', minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Query Editor</span>
                <div className={s.paneActions}>
                  <button className={s.runBtn} onClick={() => runQuery()} title="Run (Ctrl+Enter)">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Run
                  </button>
                  <button className={s.iconBtn} onClick={resetCode} title="Reset to lesson code">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                    </svg>
                    Reset
                  </button>
                  <button className={s.iconBtn} onClick={copyCode}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </button>
                  <span className={s.hintKey}>Ctrl+Enter</span>
                </div>
              </div>
              <div className={s.editorWrap}>
                <LineNums count={lineCount} scrollRef={lineNumsRef} />
                <div className={s.codeArea}>
                  <pre
                    ref={highlightRef}
                    className={s.highlight}
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: highlighted + '\n' }}
                  />
                  <textarea
                    ref={textareaRef}
                    className={s.editor}
                    value={code}
                    onChange={e => { setCode(e.target.value); codeRef.current = e.target.value; }}
                    onKeyDown={handleKeyDown}
                    onScroll={syncScroll}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    aria-label="MongoDB query editor"
                  />
                </div>
              </div>
              {error && (
                <div className={s.errorBar}>{error}</div>
              )}
            </div>

            {/* Drag handle */}
            <div
              className={s.dragHandle + (isDragging ? ' ' + s.dragHandleActive : '')}
              onMouseDown={startDrag}
            />

            {/* Results pane */}
            <div className={s.resultsPane} style={isMobile ? {} : { flex: '1 1 0', minWidth: 0 }}>
              <div className={s.paneHeader}>
                <div className={s.resultsTabs}>
                  <button
                    className={s.resultsTab + (activeTab === 'results' ? ' ' + s.resultsTabActive : '')}
                    onClick={() => setActiveTab('results')}
                  >
                    Results
                    {resultType === 'docs' && Array.isArray(results) && results.length > 0 && (
                      <span className={s.rowCountBadge}>{results.length}</span>
                    )}
                  </button>
                  <button
                    className={s.resultsTab + (activeTab === 'collections' ? ' ' + s.resultsTabActive : '')}
                    onClick={() => setActiveTab('collections')}
                  >
                    Collections
                  </button>
                  {execTime != null && (
                    <span className={s.execTime}>{execTime.toFixed(1)}ms</span>
                  )}
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
                {activeTab === 'collections'
                  ? <CollectionsPanel onInsert={(q) => { setCode(q); codeRef.current = q; setActiveTab('results'); runQuery(q); }} />
                  : renderResultsBody()
                }
              </div>
            </div>

          </div>

          {/* Nav footer */}
          <div className={s.navFooter}>
            <button
              className={s.navBtn}
              disabled={activeIdx === 0}
              onClick={() => selectLesson(activeIdx - 1)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className={s.navCounter}>{activeIdx + 1} / {LESSONS.length}</span>
              <button
                className={s.doneBtn + (isDone ? ' ' + s.doneBtnComplete : '')}
                onClick={markDone}
              >
                {isDone ? '✓ Done' : 'Mark Done'}
              </button>
            </div>
            <button
              className={s.navBtn}
              disabled={activeIdx === LESSONS.length - 1}
              onClick={() => selectLesson(activeIdx + 1)}
            >
              Next
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}
