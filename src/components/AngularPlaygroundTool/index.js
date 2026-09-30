'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { CHAPTERS, LESSONS } from './lessons';
import s from './styles.module.css';

const LS_PROGRESS = 'fwd-angular-playground-progress';
const LS_POSITION = 'fwd-angular-playground-position';

function readProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_PROGRESS) || '[]')); }
  catch { return new Set(); }
}

function saveProgress(progress) {
  try { localStorage.setItem(LS_PROGRESS, JSON.stringify([...progress])); } catch {}
}

function readPosition() {
  try { return JSON.parse(localStorage.getItem(LS_POSITION) || '0'); }
  catch { return 0; }
}

function savePosition(index) {
  try { localStorage.setItem(LS_POSITION, JSON.stringify(index)); } catch {}
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlight(code) {
  const tokens = [];
  const mark = (cls, text) => {
    const key = `@@NG_TOKEN_${tokens.length}@@`;
    tokens.push(`<span class="${cls}">${escapeHtml(text)}</span>`);
    return key;
  };

  const escaped = escapeHtml(code)
    .replace(/(&lt;\/?)([a-zA-Z][\w-]*)/g, (_, open, tag) => `${open}${mark('ng-tag', tag)}`)
    .replace(/(\{\{[\s\S]*?\}\})/g, match => mark('ng-bind', match))
    .replace(/(\*ngIf|\*ngFor|\[\(ngModel\)\]|\[[^\]]+\]|\([^)]+\))/g, match => mark('ng-dir', match))
    .replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, match => mark('ng-str', match))
    .replace(/\b(component|const|let|return|async|await|this|true|false|null|function)\b/g, match => mark('ng-kw', match))
    .replace(/(\/\/.*)/g, match => mark('ng-cm', match));

  return escaped.replace(/@@NG_TOKEN_(\d+)@@/g, (_, idx) => tokens[Number(idx)]);
}

function buildSrcDoc(code, dark) {
  const safeCode = JSON.stringify(code).replace(/<\//g, '<\\/');
  const themeVars = dark
    ? { bg: '#0e0f11', surface: '#16181d', text: '#e8eaf0', text2: '#a6adbb', border: 'rgba(255,255,255,.12)' }
    : { bg: '#f8fafc', surface: '#ffffff', text: '#111827', text2: '#4b5563', border: '#d8dee9' };

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    :root { color-scheme: ${dark ? 'dark' : 'light'}; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 16px;
      background: ${themeVars.bg};
      color: ${themeVars.text};
      font: 14px/1.55 system-ui, -apple-system, Segoe UI, sans-serif;
    }
    #app { min-height: calc(100vh - 32px); }
    h1, h2, h3 { margin: 0 0 10px; line-height: 1.2; }
    p { margin: 8px 0; color: ${themeVars.text2}; }
    button {
      margin: 4px 5px 4px 0;
      padding: 7px 10px;
      border: 1px solid ${themeVars.border};
      border-radius: 6px;
      background: ${themeVars.surface};
      color: ${themeVars.text};
      cursor: pointer;
      font: inherit;
    }
    button:hover { border-color: #dd0031; }
    button:disabled { opacity: .48; cursor: not-allowed; }
    input {
      margin: 4px 8px 4px 0;
      padding: 7px 9px;
      border: 1px solid ${themeVars.border};
      border-radius: 6px;
      background: ${themeVars.surface};
      color: ${themeVars.text};
      font: inherit;
    }
    label { display: block; margin: 8px 0; font-weight: 600; }
    ul { margin: 8px 0 0; padding-left: 20px; }
    li { margin: 6px 0; }
    nav { margin-bottom: 12px; }
    pre {
      white-space: pre-wrap;
      padding: 10px;
      border: 1px solid ${themeVars.border};
      border-radius: 7px;
      background: ${themeVars.surface};
    }
    .card {
      display: flex;
      flex-direction: column;
      gap: 3px;
      max-width: 280px;
      margin: 8px 0;
      padding: 12px;
      border: 1px solid ${themeVars.border};
      border-radius: 8px;
      background: ${themeVars.surface};
    }
    .active {
      border-color: #dd0031 !important;
      background: ${dark ? 'rgba(221,0,49,.14)' : 'rgba(221,0,49,.08)'};
    }
  </style>
</head>
<body>
  <div id="app"></div>
  <script>
    const source = ${safeCode};
    const parentLog = (level, args) => {
      try {
        parent.postMessage({ type: 'ng-log', level, message: args.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join(' ') }, '*');
      } catch {}
    };
    ['log','warn','error'].forEach(level => {
      const original = console[level].bind(console);
      console[level] = (...args) => { original(...args); parentLog(level, args); };
    });

    let component = {};
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    function extractParts(input) {
      const match = input.match(/<script>([\\s\\S]*?)<\\/script>/i);
      return {
        template: match ? input.replace(match[0], '') : input,
        script: match ? match[1] : ''
      };
    }

    function evaluate(expr, scope = {}) {
      try {
        const keys = Object.keys(scope);
        const values = Object.values(scope);
        return Function(...keys, 'component', 'with(component){ return (' + expr + '); }')(...values, component);
      } catch (error) {
        return '';
      }
    }

    function applyPipes(value, pipeText) {
      if (!pipeText) return value;
      return pipeText.split('|').slice(1).reduce((current, pipe) => {
        const name = pipe.trim();
        if (name === 'uppercase') return String(current).toUpperCase();
        if (name === 'lowercase') return String(current).toLowerCase();
        if (name === 'json') return JSON.stringify(current, null, 2);
        if (name === 'currency') return '$' + Number(current || 0).toLocaleString();
        return current;
      }, value);
    }

    function interpolate(text, scope = {}) {
      return text.replace(/\\{\\{([\\s\\S]*?)\\}\\}/g, (_, raw) => {
        const parts = raw.split('|');
        const value = evaluate(parts[0].trim(), scope);
        return applyPipes(value, raw);
      });
    }

    function parseFor(value) {
      const match = value.match(/^\\s*let\\s+(\\w+)\\s+of\\s+(.+?)\\s*$/);
      return match ? { item: match[1], list: match[2] } : null;
    }

    function cssPropertyName(prop) {
      const dashed = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      return dashed.replace(/(border|background|outline|text|font|boxshadow)color$/, '$1-color');
    }

    function bindElement(el, scope = {}) {
      if (el.tagName && el.tagName.toLowerCase() === 'router-outlet') {
        el.innerHTML = interpolate(component.routes?.[component.route] || '', scope);
      }

      Array.from(el.attributes || []).forEach(attr => {
        const name = attr.name;
        const value = attr.value;
        if (name.startsWith('[') && name.endsWith(']')) {
          const prop = name.slice(1, -1);
          const result = evaluate(value, scope);
          if (prop.startsWith('class.')) el.classList.toggle(prop.slice(6), Boolean(result));
          else if (prop.startsWith('style.')) el.style.setProperty(cssPropertyName(prop.slice(6)), result ?? '');
          else if (prop.startsWith('attr.')) {
            if (result === false || result === null || result === undefined) el.removeAttribute(prop.slice(5));
            else el.setAttribute(prop.slice(5), result);
          }
          else if (prop in el) el[prop] = result;
          else el.setAttribute(prop, result);
          el.removeAttribute(name);
        }
        if (name.startsWith('(') && name.endsWith(')')) {
          const eventParts = name.slice(1, -1).split('.');
          const eventName = eventParts[0];
          const keyFilter = eventParts[1];
          el.addEventListener(eventName, async event => {
            if (keyFilter && String(event.key || '').toLowerCase() !== keyFilter.toLowerCase()) return;
            const call = value.replace(/\\(\\s*\\)/, '(event)');
            const result = evaluate(call, { ...scope, event, $event: event });
            if (result && typeof result.then === 'function') await result;
            render();
          });
          el.removeAttribute(name);
        }
        if (name === '[(ngmodel)]' || name === '[(ngModel)]') {
          const path = value.trim();
          const current = evaluate(path, scope);
          if (el.type === 'checkbox') el.checked = Boolean(current);
          else el.value = current ?? '';
          el.addEventListener('input', () => {
            Function(...Object.keys(scope), 'component', 'value', 'with(component){ ' + path + ' = value; }')(...Object.values(scope), component, el.type === 'checkbox' ? el.checked : el.value);
            render();
          });
          el.removeAttribute(name);
        }
      });

      Array.from(el.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) child.textContent = interpolate(child.textContent, scope);
        else if (child.nodeType === Node.ELEMENT_NODE) bindElement(child, scope);
      });
    }

    function expandDirectives(root, scope = {}) {
      root.querySelectorAll('[\\\\*ngif]').forEach(el => {
        if (!evaluate(el.getAttribute('*ngIf') || el.getAttribute('*ngif'), scope)) el.remove();
        else el.removeAttribute('*ngIf');
      });

      root.querySelectorAll('[\\\\*ngfor]').forEach(el => {
        const parsed = parseFor(el.getAttribute('*ngFor') || el.getAttribute('*ngfor'));
        if (!parsed) return;
        const list = evaluate(parsed.list, scope) || [];
        const parentNode = el.parentNode;
        list.forEach((item, index) => {
          const clone = el.cloneNode(true);
          clone.removeAttribute('*ngFor');
          clone.removeAttribute('*ngfor');
          parentNode.insertBefore(clone, el);
          expandDirectives(clone, { ...scope, [parsed.item]: item, index });
          bindElement(clone, { ...scope, [parsed.item]: item, index });
        });
        el.remove();
      });
    }

    function expandComponents(root, scope = {}) {
      const defs = component.components || {};
      Object.entries(defs).forEach(([tag, template]) => {
        root.querySelectorAll(tag).forEach(host => {
          const childScope = { ...scope };
          Array.from(host.attributes).forEach(attr => {
            if (attr.name.startsWith('[') && attr.name.endsWith(']')) childScope[attr.name.slice(1, -1)] = evaluate(attr.value, scope);
          });
          const wrap = document.createElement('div');
          wrap.innerHTML = template;
          expandDirectives(wrap, childScope);
          bindElement(wrap, childScope);
          host.replaceWith(...Array.from(wrap.childNodes));
        });
      });
    }

    function render() {
      try {
        parent.postMessage({ type: 'ng-clear' }, '*');
        const app = document.getElementById('app');
        const { template, script } = extractParts(source);
        if (!window.__initialized) {
          Function('delay', script + '\\n; window.component = component;')(delay);
          component = window.component || {};
          Object.keys(component).forEach(key => {
            if (typeof component[key] === 'function') component[key] = component[key].bind(component);
          });
          window.__initialized = true;
        }
        app.innerHTML = template;
        expandDirectives(app);
        expandComponents(app);
        bindElement(app);
      } catch (error) {
        parent.postMessage({ type: 'ng-error', message: error.message }, '*');
        document.getElementById('app').innerHTML = '<pre>' + error.message + '</pre>';
      }
    }

    render();
  </script>
</body>
</html>`;
}

function formatConcept(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={idx}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={idx}>{part.slice(1, -1)}</code>;
    return part;
  });
}

function Challenge({ challenge }) {
  const [choice, setChoice] = useState(null);
  if (!challenge) return null;
  return (
    <div className={s.challenge}>
      <div className={s.challengeTitle}>Quick Check</div>
      <p>{challenge.question}</p>
      <div className={s.challengeOptions}>
        {challenge.options.map((option, idx) => {
          const picked = choice === idx;
          const correct = choice !== null && idx === challenge.correct;
          const wrong = picked && idx !== challenge.correct;
          return (
            <button
              key={option}
              className={`${s.challengeBtn} ${correct ? s.correct : ''} ${wrong ? s.wrong : ''}`}
              onClick={() => setChoice(idx)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AngularPlaygroundTool() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [code, setCode] = useState(LESSONS[0].code);
  const [srcDoc, setSrcDoc] = useState('');
  const [progress, setProgress] = useState(new Set());
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conceptOpen, setConceptOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState('');
  const [logs, setLogs] = useState([]);
  const [showConsole, setShowConsole] = useState(false);
  const [error, setError] = useState('');
  const [split, setSplit] = useState(50);
  const workRef = useRef(null);
  const dragRef = useRef(false);
  const debounceRef = useRef(null);
  const current = LESSONS[lessonIndex];

  useEffect(() => {
    setProgress(readProgress());
    const idx = readPosition();
    if (idx > 0 && idx < LESSONS.length) {
      setLessonIndex(idx);
      setCode(LESSONS[idx].code);
    }
  }, []);

  useEffect(() => {
    const update = () => setDark(document.documentElement.getAttribute('data-theme') === 'dark');
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const listener = event => {
      if (!event.data) return;
      if (event.data.type === 'ng-clear') { setLogs([]); setError(''); }
      if (event.data.type === 'ng-error') setError(event.data.message);
      if (event.data.type === 'ng-log') setLogs(prev => [...prev, event.data].slice(-30));
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  const run = useCallback((value = code) => {
    clearTimeout(debounceRef.current);
    setSrcDoc(buildSrcDoc(value, dark));
  }, [code, dark]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => run(code), 350);
    return () => clearTimeout(debounceRef.current);
  }, [code, run]);

  useEffect(() => { run(code); }, [dark, run, code]);

  const showToast = useCallback(message => {
    setToast(message);
    setTimeout(() => setToast(''), 1800);
  }, []);

  const selectLesson = useCallback(index => {
    setLessonIndex(index);
    setCode(LESSONS[index].code);
    setLogs([]);
    setError('');
    savePosition(index);
    setQuery('');
  }, []);

  const markDone = useCallback(() => {
    setProgress(prev => {
      const next = new Set(prev);
      next.add(current.id);
      saveProgress(next);
      if (lessonIndex < LESSONS.length - 1) selectLesson(lessonIndex + 1);
      showToast('Lesson marked done');
      return next;
    });
  }, [current.id, lessonIndex, selectLesson, showToast]);

  const reset = useCallback(() => {
    setCode(current.code);
    run(current.code);
    showToast('Code reset');
  }, [current.code, run, showToast]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      showToast('Copied');
    } catch {
      showToast('Copy failed');
    }
  }, [code, showToast]);

  const download = useCallback(() => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${current.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded');
  }, [code, current.id, showToast]);

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return LESSONS.filter(lesson => lesson.title.toLowerCase().includes(q) || lesson.chapter.toLowerCase().includes(q));
  }, [query]);

  const highlighted = useMemo(() => highlight(code), [code]);

  function onKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      const el = event.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      setCode(code.slice(0, start) + '  ' + code.slice(end));
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      run(code);
      showToast('Running');
    }
  }

  function startDrag(event) {
    if (!workRef.current) return;
    dragRef.current = true;
    const rect = workRef.current.getBoundingClientRect();
    const move = e => {
      if (!dragRef.current) return;
      setSplit(Math.max(28, Math.min(72, ((e.clientX - rect.left) / rect.width) * 100)));
    };
    const up = () => {
      dragRef.current = false;
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  const doneCount = progress.size;

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="angular-playground" />
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/angular-playground.svg" width="24" height="24" alt="" />
          <span className={s.title}>Angular <b>Playground</b></span>
          <span className={s.breadcrumb}>{current.chapter} - {current.title}</span>
        </div>
        <span className={s.progressBadge}>{doneCount}/{LESSONS.length} lessons</span>
      </header>

      <div className={s.body}>
        {sidebarOpen ? (
          <aside className={s.sidebar}>
            <div className={s.sidebarTop}>
              <span><i />Angular Playground</span>
              <button onClick={() => setSidebarOpen(false)} aria-label="Hide lessons">&lt;</button>
            </div>
            <input className={s.search} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search lessons..." />
            <div className={s.progress}>
              <div><span>Progress</span><span>{doneCount} / {LESSONS.length}</span></div>
              <em><i style={{ width: `${(doneCount / LESSONS.length) * 100}%` }} /></em>
            </div>
            <div className={s.lessonList}>
              {filtered ? (
                filtered.map(lesson => {
                  const index = LESSONS.indexOf(lesson);
                  return (
                    <button key={lesson.id} className={`${s.lessonBtn} ${index === lessonIndex ? s.activeLesson : ''}`} onClick={() => selectLesson(index)}>
                      <i className={progress.has(lesson.id) ? s.doneDot : ''} />{lesson.title}
                    </button>
                  );
                })
              ) : (
                CHAPTERS.map(chapter => (
                  <div key={chapter}>
                    <div className={s.chapter}>{chapter}</div>
                    {LESSONS.filter(lesson => lesson.chapter === chapter).map(lesson => {
                      const index = LESSONS.indexOf(lesson);
                      return (
                        <button key={lesson.id} className={`${s.lessonBtn} ${index === lessonIndex ? s.activeLesson : ''}`} onClick={() => selectLesson(index)}>
                          <i className={progress.has(lesson.id) ? s.doneDot : ''} />{lesson.title}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </aside>
        ) : (
          <button className={s.reopen} onClick={() => setSidebarOpen(true)}>Lessons</button>
        )}

        <main className={s.main}>
          <section className={s.concept}>
            <button className={s.conceptHeader} onClick={() => setConceptOpen(open => !open)}>
              <span><b>{current.chapter}</b>{current.title}</span>
              <span>{conceptOpen ? 'Hide' : 'Show'}</span>
            </button>
            {conceptOpen && <p>{formatConcept(current.concept)}</p>}
          </section>

          <div className={s.work} ref={workRef}>
            <section className={s.editorPane} style={{ flexBasis: `${split}%` }}>
              <div className={s.paneHeader}>
                <span>Editor</span>
                <div>
                  <button onClick={reset}>Reset</button>
                  <button onClick={copy}>Copy</button>
                  <button onClick={download}>.html</button>
                </div>
              </div>
              <div className={s.editorWrap}>
                <pre dangerouslySetInnerHTML={{ __html: highlighted + '\n' }} />
                <textarea value={code} onChange={e => setCode(e.target.value)} onKeyDown={onKeyDown} spellCheck={false} />
              </div>
              {error && <div className={s.error}>{error}</div>}
            </section>
            <button className={s.drag} onMouseDown={startDrag} aria-label="Resize panes" />
            <section className={s.previewPane} style={{ flexBasis: `${100 - split}%` }}>
              <div className={s.paneHeader}>
                <span>Preview</span>
                <div>
                  <button onClick={() => run(code)}>Refresh</button>
                </div>
              </div>
              <iframe className={s.preview} srcDoc={srcDoc} sandbox="allow-scripts" title="Angular preview" />
              <div className={s.consolePanel}>
                <div className={s.consoleHeader} onClick={() => setShowConsole(v => !v)} style={{ cursor: 'pointer' }}>
                  <div className={s.consoleTitle}>
                    <span className={s.consoleDot} />
                    Console{logs.length > 0 && <span style={{ marginLeft: 5, background: 'var(--accent)', color: '#fff', borderRadius: 999, fontSize: 10, padding: '1px 6px', fontWeight: 700 }}>{logs.length}</span>}
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transform: showConsole ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                {showConsole && (
                  <div className={s.consoleLogs}>
                    {logs.length === 0
                      ? <div className={s.consoleEmpty}>No output — use console.log() in your code</div>
                      : logs.map((log, idx) => (
                          <div key={idx} className={`${s.consoleRow} ${log.level === 'warn' ? s.consoleRowWarn : log.level === 'error' ? s.consoleRowError : s.consoleRowLog}`}>
                            <span className={s.consoleIcon}>{log.level === 'warn' ? '⚠' : log.level === 'error' ? '✕' : '›'}</span>
                            <span className={s.consoleMsg}>{log.message}</span>
                          </div>
                        ))
                    }
                  </div>
                )}
              </div>
            </section>
          </div>

          <Challenge key={current.id} challenge={current.challenge} />

          <nav className={s.navFooter}>
            <button disabled={lessonIndex === 0} onClick={() => selectLesson(lessonIndex - 1)}>Previous</button>
            <span>{lessonIndex + 1} / {LESSONS.length}</span>
            <div>
              <button className={s.doneBtn} onClick={markDone}>{progress.has(current.id) ? 'Done' : 'Mark Done'}</button>
              <button disabled={lessonIndex === LESSONS.length - 1} onClick={() => selectLesson(lessonIndex + 1)}>Next</button>
            </div>
          </nav>
        </main>
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}
