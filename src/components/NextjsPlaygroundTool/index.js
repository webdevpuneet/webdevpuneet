'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import JSZip from 'jszip';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { LESSONS, CHAPTERS, BASE_FILES } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import PlaygroundSidebarTitle from '@/components/PlaygroundSidebarTitle';
const PROGRESS_KEY = 'fwd-nextjs-playground-progress';
const POSITION_KEY = 'fwd-nextjs-playground-position';

const FILE_LABELS = {
  'app/page.jsx': 'Page',
  'app/layout.jsx': 'Layout',
  'app/globals.css': 'CSS',
  'app/api/hello/route.js': 'API Route',
};

function lessonFiles(lesson) {
  return { ...BASE_FILES, ...lesson.files };
}

/* ── Which files a lesson actually teaches (so we open the right tab) ── */
function primaryFile(lesson) {
  const keys = Object.keys(lesson.files);
  if (keys.includes('app/page.jsx')) return 'app/page.jsx';
  return keys[0] || 'app/page.jsx';
}

function decodeState(raw) {
  return JSON.parse(decodeURIComponent(escape(atob(raw))));
}

function stripImports(code) {
  return code
    .replace(/^\s*['"]use client['"];?\s*$/gm, '')
    .replace(/^\s*['"]use server['"];?\s*$/gm, '')
    .replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^\s*import\s+['"][^'"]+['"];?\s*$/gm, '');
}

function transformComponent(code, fallbackName) {
  let cleaned = stripImports(code);
  cleaned = cleaned.replace(/export\s+const\s+metadata\s*=\s*{[\s\S]*?};?\s*/g, '');
  cleaned = cleaned.replace(/export\s+default\s+function\s+[A-Za-z0-9_$]*/g, `function ${fallbackName}`);
  cleaned = cleaned.replace(/export\s+default\s+function\s*/g, `function ${fallbackName}`);
  cleaned = cleaned.replace(/export\s+default\s+([A-Za-z0-9_$]+);?/g, `const ${fallbackName} = $1;`);
  cleaned = cleaned.replace(/^\s*export\s+/gm, '');
  return cleaned;
}

function transformRoute(code) {
  return stripImports(code)
    .replace(/export\s+async\s+function\s+GET/g, 'async function GET')
    .replace(/export\s+function\s+GET/g, 'function GET')
    .replace(/^\s*export\s+/gm, '');
}

function safeScript(value) {
  return String(value).replace(/<\/script/gi, '<\\/script');
}

function safeStyle(value) {
  return String(value).replace(/<\/style/gi, '<\\/style');
}

function buildSrcDoc(files, routePath) {
  const pageCode = transformComponent(files['app/page.jsx'] || '', 'Page');
  const layoutCode = transformComponent(files['app/layout.jsx'] || '', 'RootLayout');
  const routeCode = transformRoute(files['app/api/hello/route.js'] || '');
  const css = files['app/globals.css'] || '';

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>${safeStyle(css)}</style>
</head>
<body>
  <div id="root"></div>
  <script>
    window.addEventListener('error', function (event) {
      parent.postMessage({ source: 'nextjs-playground', type: 'error', message: event.message }, '*');
    });
    window.addEventListener('unhandledrejection', function (event) {
      parent.postMessage({ source: 'nextjs-playground', type: 'error', message: event.reason && event.reason.message ? event.reason.message : String(event.reason) }, '*');
    });

    ['log', 'warn', 'error'].forEach(function (level) {
      var original = console[level].bind(console);
      console[level] = function () {
        var args = Array.prototype.slice.call(arguments);
        parent.postMessage({ source: 'nextjs-playground', type: 'console', level: level, args: args.map(function (item) {
          try { return typeof item === 'string' ? item : JSON.stringify(item); }
          catch (_) { return String(item); }
        }) }, '*');
        original.apply(console, args);
      };
    });
  <\/script>
  <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.development.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"><\/script>
  <script src="https://unpkg.com/@babel/standalone@7.25.9/babel.min.js"><\/script>
  <script type="text/babel" data-presets="env,react">
    const { useCallback, useEffect, useMemo, useRef, useState } = React;
    const process = { env: { NODE_ENV: 'development' } };
    const NextResponse = { json: (data, init) => Response.json(data, init) };

    if (!Response.json) {
      Response.json = function (data, init) {
        const headers = new Headers((init && init.headers) || {});
        headers.set('content-type', 'application/json');
        return new Response(JSON.stringify(data), { ...(init || {}), headers });
      };
    }

    function Link({ href, children, ...props }) {
      return <a href={href} onClick={(event) => event.preventDefault()} {...props}>{children}</a>;
    }

    function Image(props) {
      return <img {...props} />;
    }

    ${safeScript(routeCode)}

    const originalFetch = window.fetch.bind(window);
    window.fetch = async function (input, init) {
      const rawUrl = typeof input === 'string' ? input : input.url;
      const url = new URL(rawUrl, 'https://nextjs-playground.local');
      if (url.pathname === '${routePath}' && typeof GET === 'function') {
        return GET(new Request(url.href, { method: 'GET', ...(init || {}) }));
      }
      return originalFetch(input, init);
    };

    window.addEventListener('message', async function (event) {
      if (!event.data || event.data.source !== 'nextjs-playground' || event.data.type !== 'test-api') return;
      try {
        const response = await window.fetch(event.data.path || '${routePath}');
        const body = await response.text();
        parent.postMessage({ source: 'nextjs-playground', type: 'api-result', status: response.status, body }, '*');
      } catch (error) {
        parent.postMessage({ source: 'nextjs-playground', type: 'api-result', status: 500, body: error.message }, '*');
      }
    });

    class PreviewErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { error: null };
      }
      static getDerivedStateFromError(error) {
        return { error };
      }
      componentDidCatch(error) {
        parent.postMessage({ source: 'nextjs-playground', type: 'error', message: error.message }, '*');
      }
      render() {
        if (this.state.error) {
          return <pre style={{ margin: 20, padding: 16, color: '#b91c1c', background: '#fee2e2', borderRadius: 8 }}>{this.state.error.message}</pre>;
        }
        return this.props.children;
      }
    }

    try {
      ${safeScript(layoutCode)}
      ${safeScript(pageCode)}

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
        <PreviewErrorBoundary>
          <RootLayout>
            <Page />
          </RootLayout>
        </PreviewErrorBoundary>
      );
      parent.postMessage({ source: 'nextjs-playground', type: 'ready' }, '*');
    } catch (error) {
      parent.postMessage({ source: 'nextjs-playground', type: 'error', message: error.message }, '*');
      document.getElementById('root').innerHTML = '<pre style="margin:20px;padding:16px;color:#b91c1c;background:#fee2e2;border-radius:8px;white-space:pre-wrap">' + error.message + '</pre>';
    }
  <\/script>
</body>
</html>`;
}

function lineCount(value) {
  return Math.max(1, String(value).split('\n').length);
}

function ConceptText({ text }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
        return part;
      })}
    </>
  );
}

function ChallengeWidget({ challenge }) {
  const [picked, setPicked] = useState(null);
  return (
    <div className={s.challenge}>
      <div className={s.challengeTitle}><span>Quick check</span></div>
      <div className={s.challengeQuestion}>{challenge.question}</div>
      <div className={s.challengeOptions}>
        {challenge.options.map((option, index) => {
          let cls = s.challengeBtn;
          if (picked !== null) {
            if (index === challenge.correct) cls += ' ' + s.challengeReveal;
            else if (index === picked) cls += ' ' + s.challengeWrong;
          }
          return (
            <button key={option} className={cls} onClick={() => picked === null && setPicked(index)}>
              {option}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <button className={s.challengeReset} onClick={() => setPicked(null)}>Try again</button>
      )}
    </div>
  );
}

export default function NextjsPlaygroundTool() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [files, setFiles] = useState(() => lessonFiles(LESSONS[0]));
  const [activeFile, setActiveFile] = useState(() => primaryFile(LESSONS[0]));
  const [previewSize, setPreviewSize] = useState('full');
  const [logs, setLogs] = useState([]);
  const [apiResult, setApiResult] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState(() => new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conceptOpen, setConceptOpen] = useState(true);
  const [search, setSearch] = useState('');
  const iframeRef = useRef(null);
  const toastTimer = useRef(null);

  const lesson = LESSONS[activeIdx];
  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      if (savedProgress) setProgress(new Set(JSON.parse(savedProgress)));
      const savedPos = parseInt(localStorage.getItem(POSITION_KEY) || '0', 10);
      if (savedPos > 0 && savedPos < LESSONS.length) {
        setActiveIdx(savedPos);
        setFiles(lessonFiles(LESSONS[savedPos]));
        setActiveFile(primaryFile(LESSONS[savedPos]));
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    function onMessage(event) {
      if (!event.data || event.data.source !== 'nextjs-playground') return;
      if (event.data.type === 'console') {
        setLogs((current) => [
          ...current.slice(-49),
          { level: event.data.level, text: event.data.args.join(' ') },
        ]);
      }
      if (event.data.type === 'error') setError(event.data.message);
      if (event.data.type === 'ready') setError('');
      if (event.data.type === 'api-result') {
        setApiResult(`HTTP ${event.data.status}\n${event.data.body}`);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(''), 1800);
  }, []);

  const srcDoc = useMemo(() => buildSrcDoc(files, '/api/hello'), [files]);

  const selectLesson = useCallback((idx) => {
    setActiveIdx(idx);
    setFiles(lessonFiles(LESSONS[idx]));
    setActiveFile(primaryFile(LESSONS[idx]));
    setLogs([]);
    setApiResult('');
    setError('');
    try { localStorage.setItem(POSITION_KEY, String(idx)); } catch {}
  }, []);

  const updateActiveFile = (value) => {
    setFiles((current) => ({ ...current, [activeFile]: value }));
  };

  const resetLesson = () => {
    setFiles(lessonFiles(lesson));
    setActiveFile(primaryFile(lesson));
    showToast('Lesson code reset');
  };

  const markDone = useCallback(() => {
    setProgress((prev) => {
      const next = new Set(prev);
      if (next.has(lesson.id)) {
        next.delete(lesson.id);
        showToast('Marked not done');
      } else {
        next.add(lesson.id);
        showToast('Lesson complete');
        if (activeIdx < LESSONS.length - 1) selectLesson(activeIdx + 1);
      }
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }, [activeIdx, lesson.id, selectLesson, showToast]);

  const copyFile = async () => {
    await navigator.clipboard.writeText(files[activeFile] || '');
    showToast('Current file copied');
  };

  const downloadProject = async () => {
    const zip = new JSZip();
    zip.file('package.json', JSON.stringify({
      scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
      dependencies: { next: 'latest', react: 'latest', 'react-dom': 'latest' },
      devDependencies: {},
    }, null, 2));
    zip.file('next.config.mjs', 'const nextConfig = {};\n\nexport default nextConfig;\n');
    Object.entries(files).forEach(([path, value]) => zip.file(path, value));
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nextjs-playground.zip';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Project zip downloaded');
  };

  const testApi = () => {
    setApiResult('Running GET /api/hello...');
    iframeRef.current?.contentWindow?.postMessage({
      source: 'nextjs-playground',
      type: 'test-api',
      path: '/api/hello',
    }, '*');
  };

  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const query = search.toLowerCase();
    return LESSONS.filter((item) => item.title.toLowerCase().includes(query) || item.chapter.toLowerCase().includes(query));
  }, [search]);

  const previewWidth = previewSize === 'mobile' ? 390 : previewSize === 'tablet' ? 768 : '100%';

  if (!hydrated) return null;

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="nextjs-playground" />
      <div className={s.body}>
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <PlaygroundSidebarTitle slug="nextjs-playground" name="Next.js Playground" standalone>
<div className={s.headerActions}><button onClick={downloadProject}>Export ZIP</button></div>
</PlaygroundSidebarTitle>
          <div className={s.searchWrap}>
            <input className={s.searchInput} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search lessons..." />
          </div>

          <div className={s.progress}>
            <div className={s.progressLabel}>
              <span>Progress</span>
              <span>{completedCount} / {LESSONS.length}</span>
            </div>
            <div className={s.progressBar}>
              <div className={s.progressFill} style={{ width: `${(completedCount / LESSONS.length) * 100}%` }} />
            </div>
          </div>

          <div className={s.lessonList}>
            {filteredLessons ? (
              filteredLessons.length === 0
                ? <div className={s.noResults}>No lessons found</div>
                : filteredLessons.map((item) => {
                    const idx = LESSONS.indexOf(item);
                    return (
                      <button
                        key={item.id}
                        className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`}
                        onClick={() => { selectLesson(idx); setSearch(''); }}
                      >
                        <span className={s.lessonDot} />{item.title}
                      </button>
                    );
                  })
            ) : (
              CHAPTERS.map((chapter) => (
                <div key={chapter}>
                  <div className={s.chapterLabel}>{chapter}</div>
                  {LESSONS.filter((item) => item.chapter === chapter).map((item) => {
                    const idx = LESSONS.indexOf(item);
                    return (
                      <button
                        key={item.id}
                        className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`}
                        onClick={() => selectLesson(idx)}
                      >
                        <span className={s.lessonDot} />{item.title}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </aside>

        <div className={s.mainCol}>
          <PlaygroundTopAd />
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen((open) => !open)}>
              <div className={s.conceptTitle}>
                <span className={s.chapterTag}>{lesson.chapter}</span>
                {lesson.title}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${s.conceptChevron} ${conceptOpen ? s.conceptChevronOpen : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {conceptOpen && <div className={s.conceptBody}><ConceptText text={lesson.concept} /></div>}
          </div>

          <div className={s.workspace}>
            <section className={s.editorPane}>
              <div className={s.panelHeader}>
                <div className={s.fileTabs}>
                  {Object.keys(FILE_LABELS).map((path) => (
                    <button
                      key={path}
                      className={`${s.fileTab} ${activeFile === path ? s.fileTabActive : ''}`}
                      onClick={() => setActiveFile(path)}
                      title={path}
                    >
                      {FILE_LABELS[path]}
                    </button>
                  ))}
                </div>
                <div className={s.panelActions}>
                  <button onClick={copyFile}>Copy</button>
                  <button onClick={resetLesson}>Reset</button>
                </div>
              </div>

              <div className={s.editorShell}>
                <div className={s.lineNums} aria-hidden="true">
                  {Array.from({ length: lineCount(files[activeFile] || '') }, (_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </div>
                <textarea
                  className={s.editor}
                  spellCheck="false"
                  value={files[activeFile] || ''}
                  onChange={(event) => updateActiveFile(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Tab') {
                      event.preventDefault();
                      const target = event.currentTarget;
                      const start = target.selectionStart;
                      const end = target.selectionEnd;
                      const next = `${target.value.slice(0, start)}  ${target.value.slice(end)}`;
                      updateActiveFile(next);
                      requestAnimationFrame(() => {
                        target.selectionStart = start + 2;
                        target.selectionEnd = start + 2;
                      });
                    }
                  }}
                />
              </div>
            </section>

            <section className={s.previewPane}>
              <div className={s.panelHeader}>
                <div>
                  <span className={s.panelLabel}>Preview</span>
                  <strong>Live app</strong>
                </div>
                <div className={s.panelActions}>
                  {['mobile', 'tablet', 'full'].map((size) => (
                    <button
                      key={size}
                      className={previewSize === size ? s.activeAction : ''}
                      onClick={() => setPreviewSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {error && <div className={s.errorBar}>{error}</div>}
              <div className={s.previewCanvas}>
                <iframe
                  ref={iframeRef}
                  title="Next.js playground preview"
                  sandbox="allow-scripts"
                  srcDoc={srcDoc}
                  style={{ width: previewWidth }}
                />
              </div>

              <div className={s.lowerPanels}>
                <div className={s.apiPanel}>
                  <div className={s.miniHeader}>
                    <strong>Route Handler</strong>
                    <button onClick={testApi}>GET /api/hello</button>
                  </div>
                  <pre>{apiResult || 'Click GET /api/hello to run the route handler in the preview sandbox.'}</pre>
                </div>

                <div className={s.consolePanel}>
                  <div className={s.miniHeader}>
                    <strong>Console</strong>
                    <button onClick={() => setLogs([])}>Clear</button>
                  </div>
                  <pre>{logs.length ? logs.map((log) => `[${log.level}] ${log.text}`).join('\n') : 'Console output appears here.'}</pre>
                </div>
              </div>
            </section>
          </div>

          {lesson.challenge && <ChallengeWidget key={lesson.id} challenge={lesson.challenge} />}

          <div className={s.navFooter}>
            <button className={s.navBtn} disabled={activeIdx === 0} onClick={() => selectLesson(activeIdx - 1)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </button>
            <div className={s.navCounter}>{activeIdx + 1} / {LESSONS.length}</div>
            <div className={s.navRight}>
              <button className={`${s.doneBtn} ${isDone ? s.doneBtnComplete : ''}`} onClick={markDone}>
                {isDone ? 'Done ✓' : 'Mark Done'}
              </button>
              <button className={s.navBtn} disabled={activeIdx === LESSONS.length - 1} onClick={() => selectLesson(activeIdx + 1)}>
                Next
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}
