'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from '../ReactPlaygroundTool/styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { CHAPTERS, LESSONS } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const LS_PROGRESS = 'fwd-scss-playground-progress';
const LS_POSITION = 'fwd-scss-playground-position';

function readProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_PROGRESS) || '[]')); } catch { return new Set(); }
}

function saveProgress(set) {
  try { localStorage.setItem(LS_PROGRESS, JSON.stringify([...set])); } catch {}
}

function readPosition() {
  try { return JSON.parse(localStorage.getItem(LS_POSITION) || '0'); } catch { return 0; }
}

function savePosition(idx) {
  try { localStorage.setItem(LS_POSITION, JSON.stringify(idx)); } catch {}
}

const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function stripScssComments(input) {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, match => match)
    .split('\n')
    .filter(line => !line.trim().startsWith('//'))
    .map(line => line.replace(/\s+\/\/.*$/, ''))
    .join('\n');
}

function simpleCompileScss(input, lesson) {
  if (lesson?.css && input.trim() === lesson.scss.trim()) return lesson.css;

  let scss = stripScssComments(input);
  const variables = {};
  scss = scss.replace(/^\s*\$([\w-]+)\s*:\s*([^;]+);\s*$/gm, (_, name, value) => {
    variables[name] = value.replace(/\s*!default$/, '').trim();
    return '';
  });
  scss = scss.replace(/\$([\w-]+)/g, (_, name) => variables[name] ?? `$${name}`);

  const lines = scss.split('\n');
  const stack = [];
  const out = [];
  let current = null;

  function flush() {
    if (!current || !current.decls.length) return;
    out.push(`${current.selector} {\n${current.decls.map(d => `  ${d}`).join('\n')}\n}`);
    current = null;
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith('@use') || line.startsWith('@forward')) {
      flush();
      out.push(`/* ${line} */`);
      continue;
    }
    if (line.startsWith('@mixin') || line.startsWith('@function') || line.startsWith('@each') || line.startsWith('@for') || line.startsWith('@if')) {
      flush();
      out.push(`/* ${line} */`);
      continue;
    }
    if (line.includes('@include') || line.includes('@extend') || line === '@content;') continue;
    if (line.endsWith('{')) {
      flush();
      const selector = line.slice(0, -1).trim();
      const parent = stack[stack.length - 1] || '';
      const full = selector.startsWith('&')
        ? selector.replace(/&/g, parent)
        : parent && !selector.startsWith('@') ? `${parent} ${selector}` : selector;
      stack.push(full);
      current = { selector: full, decls: [] };
      continue;
    }
    if (line === '}') {
      flush();
      stack.pop();
      continue;
    }
    if (line.includes(':') && stack.length) {
      if (!current) current = { selector: stack[stack.length - 1], decls: [] };
      current.decls.push(line.endsWith(';') ? line : `${line};`);
    } else {
      flush();
      out.push(line);
    }
  }
  flush();
  return out.join('\n').trim() || '/* No compiled CSS output yet. */';
}

function highlightScss(code) {
  return esc(code)
    .replace(/(\/\/.*)$/gm, '<span class="rjx-cm">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="rjx-cm">$1</span>')
    .replace(/(\$[\w-]+)/g, '<span class="rjx-num">$1</span>')
    .replace(/(@(?:use|forward|mixin|include|function|return|extend|each|for|if|else|media|container|layer|content))/g, '<span class="rjx-kw">$1</span>')
    .replace(/(#(?:[0-9a-fA-F]{3,8}))/g, '<span class="rjx-str">$1</span>');
}

function ConceptText({ text }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    return part;
  });
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

function ChallengeWidget({ challenge }) {
  const [picked, setPicked] = useState(null);
  if (!challenge) return null;
  return (
    <div className={s.challenge}>
      <div className={s.challengeTitle}><span>Check</span></div>
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
      {picked !== null && <button className={s.challengeReset} onClick={() => setPicked(null)}>Try again</button>}
    </div>
  );
}

export default function ScssPlaygroundTool() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scss, setScss] = useState(LESSONS[0].scss);
  const [html, setHtml] = useState(LESSONS[0].html);
  const [progress, setProgress] = useState(() => new Set());
  const [hydrated, setHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conceptOpen, setConceptOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [editorPct, setEditorPct] = useState(50);
  const [htmlPanelHeight, setHtmlPanelHeight] = useState(150);
  const [cssPanelHeight, setCssPanelHeight] = useState(240);
  const [toast, setToast] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isDraggingHandle, setIsDraggingHandle] = useState(false);
  const [isDraggingHtml, setIsDraggingHtml] = useState(false);
  const [isDraggingCss, setIsDraggingCss] = useState(false);

  const lineNumsRef = useRef(null);
  const highlightRef = useRef(null);
  const workAreaRef = useRef(null);
  const isDragging = useRef(false);
  const isDraggingHtmlRef = useRef(false);
  const isDraggingCssRef = useRef(false);

  const lesson = LESSONS[activeIdx];
  const compiledCss = useMemo(() => simpleCompileScss(scss, lesson), [scss, lesson]);
  const lineCount = useMemo(() => scss.split('\n').length, [scss]);
  const highlighted = useMemo(() => highlightScss(scss), [scss]);
  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);

  const previewDoc = useMemo(() => `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #f8fafc; color: #182033; }
.page { min-height: 100vh; padding: 32px; }
.hero { background: white; border: 1px solid #d8dee9; border-radius: 16px; padding: 28px; margin-bottom: 20px; }
.eyebrow { text-transform: uppercase; font-size: 12px; letter-spacing: .08em; color: #cf649a; font-weight: 700; }
.lead { max-width: 56ch; color: #526070; }
.button { display: inline-flex; align-items: center; text-decoration: none; margin-top: 8px; background: #182033; color: white; padding: 10px 14px; border-radius: 8px; font-weight: 700; }
.cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.card { background: white; border: 1px solid #d8dee9; border-radius: 12px; padding: 18px; }
${compiledCss}
</style>
</head>
<body>${html}</body>
</html>`, [compiledCss, html]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }, []);

  useEffect(() => {
    setProgress(readProgress());
    const saved = readPosition();
    if (saved > 0 && saved < LESSONS.length) {
      setActiveIdx(saved);
      setScss(LESSONS[saved].scss);
      setHtml(LESSONS[saved].html);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
        setConceptOpen(false);
      }
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const selectLesson = useCallback((idx) => {
    setActiveIdx(idx);
    setScss(LESSONS[idx].scss);
    setHtml(LESSONS[idx].html);
    savePosition(idx);
  }, []);

  const markDone = useCallback(() => {
    setProgress(prev => {
      const next = new Set(prev);
      if (next.has(lesson.id)) {
        const idx = LESSONS.findIndex(item => item.id === lesson.id);
        LESSONS.slice(idx).forEach(item => next.delete(item.id));
        showToast('Progress reset from here');
      } else {
        next.add(lesson.id);
        if (activeIdx < LESSONS.length - 1) selectLesson(activeIdx + 1);
        showToast('Lesson complete');
      }
      saveProgress(next);
      return next;
    });
  }, [activeIdx, lesson.id, selectLesson, showToast]);

  const syncScroll = useCallback((event) => {
    if (lineNumsRef.current) lineNumsRef.current.scrollTop = event.target.scrollTop;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = event.target.scrollTop;
      highlightRef.current.scrollLeft = event.target.scrollLeft;
    }
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    const el = event.target;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    setScss(prev => prev.slice(0, start) + '  ' + prev.slice(end));
    requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
  }, []);

  const copyScss = useCallback(async () => {
    try { await navigator.clipboard.writeText(scss); showToast('SCSS copied'); } catch { showToast('Copy failed'); }
  }, [scss, showToast]);

  const copyCss = useCallback(async () => {
    try { await navigator.clipboard.writeText(compiledCss); showToast('CSS copied'); } catch { showToast('Copy failed'); }
  }, [compiledCss, showToast]);

  const resetCode = useCallback(() => {
    setScss(lesson.scss);
    setHtml(lesson.html);
    showToast('Lesson reset');
  }, [lesson, showToast]);

  const downloadScss = useCallback(() => {
    const blob = new Blob([scss], { type: 'text/x-scss' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lesson.id}.scss`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded');
  }, [scss, lesson.id, showToast]);

  const shareCode = useCallback(async () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify({ scss, html }))));
      const url = `${window.location.origin}/scss-playground/?c=${encoded}`;
      await navigator.clipboard.writeText(url);
      showToast('Share link copied');
    } catch {
      showToast('Copy failed');
    }
  }, [scss, html, showToast]);

  useEffect(() => {
    try {
      const encoded = new URLSearchParams(window.location.search).get('c');
      if (!encoded) return;
      const payload = JSON.parse(decodeURIComponent(escape(atob(encoded))));
      if (payload.scss) setScss(payload.scss);
      if (payload.html) setHtml(payload.html);
    } catch {}
  }, []);

  const startDrag = useCallback((event) => {
    event.preventDefault();
    if (!workAreaRef.current) return;
    isDragging.current = true;
    setIsDraggingHandle(true);
    const rect = workAreaRef.current.getBoundingClientRect();
    document.body.style.userSelect = 'none';
    const onMove = (moveEvent) => {
      if (!isDragging.current) return;
      const pct = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      setEditorPct(Math.max(34, Math.min(66, pct)));
    };
    const onUp = () => {
      isDragging.current = false;
      setIsDraggingHandle(false);
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      window.removeEventListener('blur', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    window.addEventListener('blur', onUp);
  }, []);

  const startHtmlDrag = useCallback((event) => {
    event.preventDefault();
    isDraggingHtmlRef.current = true;
    setIsDraggingHtml(true);
    const startY = event.clientY;
    const startHeight = htmlPanelHeight;
    document.body.style.userSelect = 'none';

    const onMove = (moveEvent) => {
      if (!isDraggingHtmlRef.current) return;
      const delta = startY - moveEvent.clientY;
      setHtmlPanelHeight(Math.max(96, Math.min(320, startHeight + delta)));
    };
    const onUp = () => {
      isDraggingHtmlRef.current = false;
      setIsDraggingHtml(false);
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      window.removeEventListener('blur', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    window.addEventListener('blur', onUp);
  }, [htmlPanelHeight]);

  const startCssDrag = useCallback((event) => {
    event.preventDefault();
    isDraggingCssRef.current = true;
    setIsDraggingCss(true);
    const startY = event.clientY;
    const startHeight = cssPanelHeight;
    document.body.style.userSelect = 'none';

    const onMove = (moveEvent) => {
      if (!isDraggingCssRef.current) return;
      const delta = startY - moveEvent.clientY;
      setCssPanelHeight(Math.max(120, Math.min(420, startHeight + delta)));
    };
    const onUp = () => {
      isDraggingCssRef.current = false;
      setIsDraggingCss(false);
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      window.removeEventListener('blur', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    window.addEventListener('blur', onUp);
  }, [cssPanelHeight]);

  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const query = search.toLowerCase();
    return LESSONS.filter(item => item.title.toLowerCase().includes(query) || item.chapter.toLowerCase().includes(query));
  }, [search]);

  if (!hydrated) return null;

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="scss-playground" />
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/scss-playground.svg" width={24} height={24} alt="" />
          <span className={s.headerTitle}>SCSS <span className={s.accent}>Playground</span></span>
          <span className={s.headerBreadcrumb}>{lesson.chapter} &rarr; {lesson.title}</span>
        </div>
        <div className={s.headerRight}>
          <span className={s.progressBadge}>{completedCount}/{LESSONS.length} lessons</span>
        </div>
      </header>

      <div className={s.body}>
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <div className={s.sidebarPill}><span className={s.sidebarPillDot} />SCSS Playground</div>
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
          </div>
          <div className={s.searchWrap}>
            <input className={s.searchInput} value={search} onChange={event => setSearch(event.target.value)} placeholder="Search lessons..." />
          </div>
          <div className={s.progress}>
            <div className={s.progressLabel}><span>Progress</span><span>{completedCount} / {LESSONS.length}</span></div>
            <div className={s.progressBar}><div className={s.progressFill} style={{ width: `${(completedCount / LESSONS.length) * 100}%` }} /></div>
          </div>
          <div className={s.lessonList}>
            {filteredLessons ? (
              filteredLessons.length === 0
                ? <div style={{ padding: '12px', fontSize: 12, color: 'var(--text3)' }}>No lessons found</div>
                : filteredLessons.map(item => {
                    const idx = LESSONS.indexOf(item);
                    return (
                      <button key={item.id} className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`} onClick={() => { selectLesson(idx); setSearch(''); }}>
                        <span className={s.lessonDot} />{item.title}
                      </button>
                    );
                  })
            ) : CHAPTERS.map(chapter => (
              <div key={chapter}>
                <div className={s.chapterLabel}>{chapter}</div>
                {LESSONS.filter(item => item.chapter === chapter).map(item => {
                  const idx = LESSONS.indexOf(item);
                  return (
                    <button key={item.id} className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`} onClick={() => selectLesson(idx)}>
                      <span className={s.lessonDot} />{item.title}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {!sidebarOpen && (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            Lessons
          </button>
        )}

        <div className={s.main}>
          <PlaygroundTopAd />
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen(open => !open)}>
              <div className={s.conceptTitle}><span className={s.chapterTag}>{lesson.chapter}</span>{lesson.title}</div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${s.conceptChevron} ${conceptOpen ? s.conceptChevronOpen : ''}`}><polyline points="6 9 12 15 18 9" /></svg>
            </div>
            {conceptOpen && <div className={s.conceptBody}><ConceptText text={lesson.concept} /></div>}
          </div>

          <div ref={workAreaRef} className={s.workArea}>
            <div className={s.editorPane} style={isMobile ? {} : { flex: `0 0 ${editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>SCSS code</span>
                <div className={s.paneActions}>
                  <button className={s.iconBtn} onClick={resetCode}>Reset</button>
                  <button className={s.iconBtn} onClick={copyScss}>Copy</button>
                  <button className={s.iconBtn} onClick={downloadScss}>.scss</button>
                  <button className={s.iconBtn} onClick={shareCode}>Share</button>
                </div>
              </div>
              <div className={s.editorWrap}>
                <LineNums count={lineCount} scrollRef={lineNumsRef} />
                <div className={s.codeArea}>
                  <pre ref={highlightRef} className={s.highlight} aria-hidden="true" dangerouslySetInnerHTML={{ __html: highlighted + '\n' }} />
                  <textarea className={s.editor} value={scss} onChange={event => setScss(event.target.value)} onKeyDown={handleKeyDown} onScroll={syncScroll} spellCheck={false} />
                </div>
              </div>
              <div className={s.consolePanel} style={{ flex: `0 0 ${htmlPanelHeight}px`, maxHeight: 320, minHeight: 96 }}>
                <div
                  className={s.consoleHeader}
                  onMouseDown={startHtmlDrag}
                  title="Drag to resize HTML preview markup"
                  style={{ cursor: 'row-resize' }}
                >
                  <span className={s.consoleTitle}><span className={s.consoleDot} />HTML preview markup</span>
                </div>
                <textarea
                  value={html}
                  onChange={event => setHtml(event.target.value)}
                  spellCheck={false}
                  style={{ flex: 1, border: 0, resize: 'none', padding: 10, background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 11, outline: 'none' }}
                />
              </div>
            </div>

            {!isMobile && <div className={`${s.dragHandle} ${isDraggingHandle ? s.dragHandleActive : ''}`} onMouseDown={startDrag} />}

            <div className={s.previewPane}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Live preview</span>
                <div className={s.paneActions}>
                  <button className={s.iconBtn} onClick={copyCss}>Copy CSS</button>
                </div>
              </div>
              <iframe className={s.previewFrame} title="SCSS preview" srcDoc={previewDoc} sandbox="allow-same-origin" style={{ minHeight: 0 }} />
              <section style={{ flex: `0 0 ${cssPanelHeight}px`, minHeight: 120, maxHeight: 420, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg)' }}>
                <div
                  className={s.paneHeader}
                  onMouseDown={startCssDrag}
                  title="Drag to resize compiled CSS"
                  style={{ cursor: 'row-resize' }}
                >
                  <span className={s.paneLabel}>Compiled CSS - updates live</span>
                  <div className={s.paneActions}>
                    <button className={s.iconBtn} onClick={copyCss}>Copy CSS</button>
                  </div>
                </div>
                <pre style={{ margin: 0, padding: 14, overflow: 'auto', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.5, color: 'var(--text)', flex: 1 }}>{compiledCss}</pre>
              </section>
            </div>
          </div>

          <ChallengeWidget challenge={lesson.challenge} />

          <div className={s.navFooter}>
            <button className={s.navBtn} disabled={activeIdx === 0} onClick={() => selectLesson(activeIdx - 1)}>
              <span>&larr;</span> Previous
            </button>
            <div className={s.navCenter}>
              <div className={s.navCounter}>{activeIdx + 1} / {LESSONS.length}</div>
              <button className={`${s.doneBtn} ${isDone ? s.doneBtnActive : ''}`} onClick={markDone}>{isDone ? 'Done' : 'Mark Done'}</button>
            </div>
            <button className={s.navBtn} disabled={activeIdx === LESSONS.length - 1} onClick={() => selectLesson(activeIdx + 1)}>
              Next <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
      {(isDraggingHandle || isDraggingHtml || isDraggingCss) && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            cursor: (isDraggingHtml || isDraggingCss) ? 'row-resize' : 'col-resize',
            background: 'transparent',
          }}
        />
      )}
      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}
