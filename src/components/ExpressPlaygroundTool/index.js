'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { createExpressApp, jsonParser, cors, logger, urlencoded, authMiddleware } from './express-engine';
import { CHAPTERS, LESSONS } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── Constants ─────────────────────────────────────────────────────────────── */
const LS_PROGRESS = 'fwd-express-playground-progress';
const LS_POSITION = 'fwd-express-playground-position';

function readProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_PROGRESS) || '[]')); }
  catch { return new Set(); }
}
function saveProgress(set) { try { localStorage.setItem(LS_PROGRESS, JSON.stringify([...set])); } catch {} }
function readPosition() { try { return JSON.parse(localStorage.getItem(LS_POSITION) || '0'); } catch { return 0; } }
function savePosition(idx) { try { localStorage.setItem(LS_POSITION, JSON.stringify(idx)); } catch {} }

/* ── Parse TEST comment ────────────────────────────────────────────────────── */
function parseTestComment(code) {
  const m = code.match(/\/\/\s*TEST:\s*(\w+)\s+(\S+)/);
  if (m) return { method: m[1].toUpperCase(), path: m[2] };
  return { method: 'GET', path: '/' };
}

/* ── Express syntax highlighter ────────────────────────────────────────────── */
const EXPRESS_METHODS = new Set([
  'get', 'post', 'put', 'patch', 'delete', 'use', 'listen', 'Router',
  'json', 'send', 'sendStatus', 'redirect', 'status', 'set', 'header', 'end', 'type',
]);
const REQ_RES_NEXT = new Set(['req', 'res', 'next', 'err']);
const APP_ROUTER_WORDS = new Set(['app', 'router', 'Router']);
const JS_KW = new Set([
  'var', 'let', 'const', 'return', 'function', 'if', 'else', 'for', 'while',
  'new', 'true', 'false', 'null', 'undefined', 'of', 'in', 'break', 'continue',
  'typeof', 'instanceof', 'throw', 'try', 'catch', 'finally', 'class', 'this',
  'import', 'export', 'default', 'from', 'async', 'await',
]);

const esc = v => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function highlightExpress(code) {
  let out = '', i = 0;
  const n = code.length;
  while (i < n) {
    const c = code[i];
    if (/\s/.test(c)) { out += c; i++; continue; }
    // Line comment
    if (c === '/' && code[i + 1] === '/') {
      let j = i; while (j < n && code[j] !== '\n') j++;
      out += '<span class="ex-cm">' + esc(code.slice(i, j)) + '</span>'; i = j; continue;
    }
    // Regex literal (basic — after operator or keyword)
    // String single or double quote
    if (c === '"' || c === "'") {
      const q = c; let j = i + 1;
      while (j < n) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === q) { j++; break; }
        if (code[j] === '\n') break;
        j++;
      }
      out += '<span class="ex-str">' + esc(code.slice(i, j)) + '</span>'; i = j; continue;
    }
    // Template literal
    if (c === '`') {
      let j = i + 1;
      while (j < n) { if (code[j] === '\\') { j += 2; continue; } if (code[j] === '`') { j++; break; } j++; }
      out += '<span class="ex-str">' + esc(code.slice(i, j)) + '</span>'; i = j; continue;
    }
    // Number
    if (/[0-9]/.test(c) || (c === '-' && /[0-9]/.test(code[i + 1] || ''))) {
      let j = i; if (c === '-') j++;
      while (j < n && /[0-9._eExXa-fA-F]/.test(code[j])) j++;
      out += '<span class="ex-num">' + esc(code.slice(i, j)) + '</span>'; i = j; continue;
    }
    // Identifier / keyword
    if (/[a-zA-Z_$]/.test(c)) {
      let j = i; while (j < n && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (JS_KW.has(word)) {
        out += '<span class="ex-kw">' + esc(word) + '</span>';
      } else if (word === 'createExpress' || word === 'createExpressForUser') {
        out += '<span class="ex-app">' + esc(word) + '</span>';
      } else if (APP_ROUTER_WORDS.has(word)) {
        out += '<span class="ex-app">' + esc(word) + '</span>';
      } else if (EXPRESS_METHODS.has(word)) {
        out += '<span class="ex-meth">' + esc(word) + '</span>';
      } else if (REQ_RES_NEXT.has(word)) {
        out += '<span class="ex-rr">' + esc(word) + '</span>';
      } else if (word === 'jsonParser' || word === 'cors' || word === 'logger' || word === 'urlencoded' || word === 'authMiddleware') {
        out += '<span class="ex-meth">' + esc(word) + '</span>';
      } else if (word === 'SAMPLE_DB') {
        out += '<span class="ex-app">' + esc(word) + '</span>';
      } else {
        out += esc(word);
      }
      i = j; continue;
    }
    // $ operators
    if (c === '$') {
      let j = i; while (j < n && /[a-zA-Z0-9_]/.test(code[j])) j++;
      out += '<span class="ex-op">' + esc(code.slice(i, j)) + '</span>'; i = j; continue;
    }
    // Brackets
    if ('{}[]()'.includes(c)) { out += '<span class="ex-br">' + esc(c) + '</span>'; i++; continue; }
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

function StatusBadge({ status }) {
  let cls = s.statusBadge;
  if (status >= 200 && status < 300) cls += ' ' + s.statusGreen;
  else if (status >= 300 && status < 400) cls += ' ' + s.statusYellow;
  else if (status >= 400 && status < 500) cls += ' ' + s.statusOrange;
  else if (status >= 500) cls += ' ' + s.statusRed;

  const text = {
    200: '200 OK', 201: '201 Created', 204: '204 No Content',
    301: '301 Moved', 302: '302 Found',
    400: '400 Bad Request', 401: '401 Unauthorized', 403: '403 Forbidden',
    404: '404 Not Found', 409: '409 Conflict', 422: '422 Unprocessable',
    500: '500 Server Error', 503: '503 Unavailable',
  }[status] || String(status);

  return <span className={cls}>{text}</span>;
}

function ChallengeWidget({ challenge, lessonId }) {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState(null);

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

/* ── HTTP Client panel ─────────────────────────────────────────────────────── */
const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

function HttpClient({ method, setMethod, testPath, setTestPath, requestBody, setRequestBody, onSend, isRunning }) {
  const showBody = ['POST', 'PUT', 'PATCH'].includes(method);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isRunning) onSend();
  };

  return (
    <div className={s.httpClient}>
      <div className={s.httpClientHeader}>
        <span className={s.paneLabel}>HTTP Client</span>
      </div>
      <div className={s.httpClientRow}>
        <select
          className={s.methodSelect}
          value={method}
          onChange={e => setMethod(e.target.value)}
        >
          {HTTP_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <input
          className={s.pathInput}
          value={testPath}
          onChange={e => setTestPath(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="/hello"
          spellCheck={false}
          aria-label="Request path"
        />
        <button
          className={s.sendBtn}
          onClick={onSend}
          disabled={isRunning}
          title="Send request (Enter)"
        >
          {isRunning ? (
            <span className={s.spinner} />
          ) : (
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
          {isRunning ? 'Sending…' : 'Send'}
        </button>
      </div>
      {showBody && (
        <div className={s.bodyArea}>
          <div className={s.bodyLabel}>Body <span className={s.bodyHint}>(JSON)</span></div>
          <textarea
            className={s.bodyTextarea}
            value={requestBody}
            onChange={e => setRequestBody(e.target.value)}
            placeholder={'{\n  "key": "value"\n}'}
            spellCheck={false}
            rows={4}
          />
        </div>
      )}
    </div>
  );
}

/* ── Response panel ─────────────────────────────────────────────────────────── */
function ResponsePanel({ response, error }) {
  const bodyHtml = useMemo(() => {
    if (!response || response.body === null || response.body === undefined) return null;
    if (typeof response.body === 'object') return colorizeJson(response.body, 0);
    return esc(String(response.body));
  }, [response]);

  if (error) {
    return (
      <div className={s.responsePanel}>
        <div className={s.responsePanelHeader}>
          <span className={s.paneLabel}>Response</span>
        </div>
        <div className={s.responseError}>{error}</div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className={s.responsePanel}>
        <div className={s.responsePanelHeader}>
          <span className={s.paneLabel}>Response</span>
        </div>
        <div className={s.responseEmpty}>
          Press <kbd>Enter</kbd> in the path field or click <strong>Send</strong> to test your routes
        </div>
      </div>
    );
  }

  return (
    <div className={s.responsePanel}>
      <div className={s.responsePanelHeader}>
        <span className={s.paneLabel}>Response</span>
        <div className={s.responseMeta}>
          <StatusBadge status={response.status} />
          <span className={s.responseTiming}>{response.timing}ms</span>
        </div>
      </div>
      <div className={s.responseDivider} />
      <div className={s.responseBody}>
        {response.body === null || response.body === undefined ? (
          <span className={s.responseNoBody}>No body</span>
        ) : (
          <pre className={s.responseJson} dangerouslySetInnerHTML={{ __html: bodyHtml + '\n' }} />
        )}
      </div>
      {response.headers && Object.keys(response.headers).length > 0 && (
        <details className={s.responseHeaders}>
          <summary className={s.responseHeadersToggle}>Response Headers</summary>
          <div className={s.responseHeadersList}>
            {Object.entries(response.headers).filter(([, v]) => v !== undefined).map(([k, v]) => (
              <div key={k} className={s.responseHeaderRow}>
                <span className={s.headerKey}>{k}</span>
                <span className={s.headerVal}>{String(v)}</span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

/* ── Main component ────────────────────────────────────────────────────────── */
export default function ExpressPlaygroundTool() {
  /* ── Core state ── */
  const [activeIdx,    setActiveIdx]    = useState(0);
  const [code,         setCode]         = useState(LESSONS[0].code);
  const [response,     setResponse]     = useState(null);
  const [error,        setError]        = useState('');
  const [progress,     setProgress]     = useState(() => new Set());
  const [sidebarOpen,  setSidebarOpen]  = useState(true);
  const [conceptOpen,  setConceptOpen]  = useState(true);
  const [search,       setSearch]       = useState('');
  const [toast,        setToast]        = useState('');
  const [isMobile,     setIsMobile]     = useState(false);
  const [editorPct,    setEditorPct]    = useState(50);
  const [isDragging,   setIsDragging]   = useState(false);
  const [isRunning,    setIsRunning]    = useState(false);

  // HTTP Client state
  const initialTest = parseTestComment(LESSONS[0].code);
  const [method,       setMethod]       = useState(initialTest.method);
  const [testPath,     setTestPath]     = useState(initialTest.path);
  const [requestBody,  setRequestBody]  = useState('');

  /* ── Refs ── */
  const textareaRef  = useRef(null);
  const highlightRef = useRef(null);
  const lineNumsRef  = useRef(null);
  const workAreaRef  = useRef(null);
  const codeRef      = useRef(code);
  const methodRef    = useRef(method);
  const testPathRef  = useRef(testPath);
  const bodyRef      = useRef(requestBody);
  const dragging     = useRef(false);

  useEffect(() => { codeRef.current = code; }, [code]);
  useEffect(() => { methodRef.current = method; }, [method]);
  useEffect(() => { testPathRef.current = testPath; }, [testPath]);
  useEffect(() => { bodyRef.current = requestBody; }, [requestBody]);

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
      const lessonCode = LESSONS[pos].code;
      setActiveIdx(pos);
      setCode(lessonCode);
      codeRef.current = lessonCode;
      const test = parseTestComment(lessonCode);
      setMethod(test.method);
      setTestPath(test.path);
    }
  }, []);

  /* ── Run request ── */
  const runRequest = useCallback(() => {
    setIsRunning(true);
    setError('');

    // Use setTimeout to allow loading state to render
    setTimeout(() => {
      try {
        let capturedApp = null;

        function createExpressForUser() {
          const { app } = createExpressApp();
          capturedApp = app;
          return app;
        }

        // Build the function with user code
        // eslint-disable-next-line no-new-func
        const fn = new Function(
          'createExpress', 'SAMPLE_DB',
          'jsonParser', 'cors', 'logger', 'urlencoded', 'authMiddleware',
          codeRef.current + '\n//# sourceURL=express-playground.js'
        );

        // Get a fresh SAMPLE_DB
        const { SAMPLE_DB: db } = createExpressApp();

        fn(
          createExpressForUser,
          db,
          jsonParser, cors, logger, urlencoded, authMiddleware
        );

        if (!capturedApp) {
          throw new Error('Your code must call createExpress() to create an Express app.');
        }

        // Parse body
        let body = null;
        if (bodyRef.current && bodyRef.current.trim()) {
          try { body = JSON.parse(bodyRef.current); } catch { body = bodyRef.current; }
        }

        const result = capturedApp._handle(methodRef.current, testPathRef.current, body, {});
        setResponse(result);
        setError('');
      } catch (err) {
        setError(err.message || 'Execution failed');
        setResponse(null);
      }
      setIsRunning(false);
    }, 0);
  }, []);

  /* ── Select lesson ── */
  const selectLesson = useCallback((idx) => {
    const lessonCode = LESSONS[idx].code;
    const test = parseTestComment(lessonCode);
    setActiveIdx(idx);
    setCode(lessonCode);
    codeRef.current = lessonCode;
    setMethod(test.method);
    setTestPath(test.path);
    methodRef.current = test.method;
    testPathRef.current = test.path;
    setRequestBody('');
    bodyRef.current = '';
    setResponse(null);
    setError('');
    savePosition(idx);
  }, []);

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
    const lessonCode = lesson.code;
    setCode(lessonCode);
    codeRef.current = lessonCode;
    const test = parseTestComment(lessonCode);
    setMethod(test.method);
    setTestPath(test.path);
    methodRef.current = test.method;
    testPathRef.current = test.path;
    setResponse(null);
    setError('');
    showToast('Reset to lesson code');
  }, [lesson.code, showToast]);

  /* ── Copy code ── */
  const copyCode = useCallback(async () => {
    try { await navigator.clipboard.writeText(codeRef.current); showToast('Copied!'); }
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
      runRequest();
    }
  }, [runRequest]);

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
  const lineCount      = useMemo(() => code.split('\n').length, [code]);
  const highlighted    = useMemo(() => highlightExpress(code), [code]);
  const completedCount = progress.size;
  const isDone         = progress.has(lesson.id);

  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return LESSONS.filter(l => l.title.toLowerCase().includes(q) || l.chapter.toLowerCase().includes(q));
  }, [search]);

  /* ── Render ── */
  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="express-playground" />

      {/* Header */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/express-playground.svg" width={22} height={22} alt="" />
          <span className={s.headerTitle}>Express <span className={s.accent}>Playground</span></span>
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
              Express.js
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

          {/* Editor + HTTP Client/Response */}
          <div ref={workAreaRef} className={s.workArea}>

            {/* Editor pane */}
            <div className={s.editorPane} style={isMobile ? {} : { flex: '0 0 ' + editorPct + '%', minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Route Editor</span>
                <div className={s.paneActions}>
                  <button className={s.runBtn} onClick={runRequest} disabled={isRunning} title="Send request (Ctrl+Enter)">
                    {isRunning ? <span className={s.spinner} /> : (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                    {isRunning ? 'Running…' : 'Run'}
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
                    aria-label="Express.js route editor"
                  />
                </div>
              </div>
              {error && <div className={s.errorBar}>{error}</div>}
            </div>

            {/* Drag handle */}
            <div
              className={s.dragHandle + (isDragging ? ' ' + s.dragHandleActive : '')}
              onMouseDown={startDrag}
            />

            {/* Right pane: HTTP Client + Response */}
            <div className={s.rightPane} style={isMobile ? {} : { flex: '1 1 0', minWidth: 0 }}>
              <HttpClient
                method={method}
                setMethod={m => { setMethod(m); methodRef.current = m; }}
                testPath={testPath}
                setTestPath={p => { setTestPath(p); testPathRef.current = p; }}
                requestBody={requestBody}
                setRequestBody={b => { setRequestBody(b); bodyRef.current = b; }}
                onSend={runRequest}
                isRunning={isRunning}
              />
              <div className={s.rightPaneDivider} />
              <ResponsePanel response={response} error={error} />
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
