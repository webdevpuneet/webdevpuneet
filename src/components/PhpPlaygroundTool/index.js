'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from '../ReactPlaygroundTool/styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { CHAPTERS, LESSONS } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const LS_PROGRESS = 'fwd-php-playground-progress';
const LS_POSITION = 'fwd-php-playground-position';

function readProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_PROGRESS) || '[]')); }
  catch { return new Set(); }
}

function saveProgress(set) {
  try { localStorage.setItem(LS_PROGRESS, JSON.stringify([...set])); } catch {}
}

function readPosition() {
  try { return JSON.parse(localStorage.getItem(LS_POSITION) || '0'); }
  catch { return 0; }
}

function savePosition(idx) {
  try { localStorage.setItem(LS_POSITION, JSON.stringify(idx)); } catch {}
}

const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const PHP_KEYWORDS = new Set([
  'class', 'function', 'public', 'private', 'protected', 'return', 'if', 'elseif', 'else',
  'switch', 'case', 'default', 'break', 'while', 'for', 'foreach', 'as', 'try', 'catch',
  'throw', 'new', 'extends', 'implements', 'interface', 'trait', 'use', 'namespace',
  'const', 'define', 'true', 'false', 'null', 'yield', 'abstract', 'final', 'static',
  'enum', 'case', 'readonly', 'declare', 'private',
]);

function highlightPHP(code) {
  let out = '';
  let i = 0;
  while (i < code.length) {
    const char = code[i];
    if (/\s/.test(char)) { out += char; i += 1; continue; }
    if (code.startsWith('<?php', i) || code.startsWith('?>', i)) {
      const tag = code.startsWith('<?php', i) ? '<?php' : '?>';
      out += `<span class="rjx-hook">${esc(tag)}</span>`;
      i += tag.length;
      continue;
    }
    if (code.startsWith('//', i) || code.startsWith('#', i)) {
      let j = i;
      while (j < code.length && code[j] !== '\n') j += 1;
      out += `<span class="rjx-cm">${esc(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (code.startsWith('/*', i)) {
      const end = code.indexOf('*/', i + 2);
      const j = end < 0 ? code.length : end + 2;
      out += `<span class="rjx-cm">${esc(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (char === '"' || char === "'") {
      const quote = char;
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === '\\' && j + 1 < code.length) { j += 2; continue; }
        if (code[j] === quote) { j += 1; break; }
        j += 1;
      }
      out += `<span class="rjx-str">${esc(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (char === '$') {
      let j = i + 1;
      while (j < code.length && /[a-zA-Z0-9_]/.test(code[j])) j += 1;
      out += `<span class="rjx-num">${esc(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (/[0-9]/.test(char)) {
      let j = i;
      while (j < code.length && /[0-9.]/.test(code[j])) j += 1;
      out += `<span class="rjx-num">${esc(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    if (/[a-zA-Z_]/.test(char)) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_]/.test(code[j])) j += 1;
      const word = code.slice(i, j);
      if (PHP_KEYWORDS.has(word)) out += `<span class="rjx-kw">${esc(word)}</span>`;
      else out += esc(word);
      i = j;
      continue;
    }
    out += esc(char);
    i += 1;
  }
  return out;
}

function decodePhpString(value) {
  if (!value) return '';
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'");
  }
  return trimmed;
}

function stripPhp(code) {
  return code.replace(/<\?php/g, '').replace(/\?>/g, '');
}

function formatOutput(output, needsRuntime = false) {
  const visible = Array.isArray(output) ? output.filter(Boolean).join('\n') : String(output || '').trim();
  const note = needsRuntime
    ? 'PHP runs on a server, so this browser preview cannot execute your edits. Static text and HTML are shown above; load the lesson example to see its verified output, or run this file with PHP locally to test your own logic.'
    : 'This is a browser-safe PHP learning environment. It shows verified output for each lesson example but does not run a real PHP server, filesystem, or database.';
  return [
    'Simulated PHP output',
    '--------------------',
    visible || (needsRuntime ? '(your edited code was not executed — see note below)' : '(no visible output)'),
    '',
    'Runtime note',
    '------------',
    note,
  ].join('\n');
}

function inferOutput(code, expectedCode, expectedOutput) {
  // The lesson's unedited example has a verified, hand-checked output.
  if (expectedOutput && code.trim() === expectedCode.trim()) return formatOutput(expectedOutput);

  // Once the learner edits the code we cannot run it: PHP executes on a server,
  // not in the browser. We only show output we can derive truthfully — plain
  // string literals echoed out, and static HTML — and never fabricate computed
  // values. Anything dynamic is left to the runtime note instead of guessing.
  const php = stripPhp(code);
  const output = [];
  let sawDynamic = false;

  const echoRegex = /\b(?:echo|print)\s+([^;]+);/g;
  let match;
  while ((match = echoRegex.exec(php))) {
    const expr = match[1].trim();
    const literalParts = [...expr.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g)];
    const withoutStrings = expr.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, '');
    const isPureLiteral = literalParts.length > 0 && /^[\s.]*$/.test(withoutStrings);
    if (isPureLiteral) {
      output.push(literalParts.map(part => decodePhpString(part[0])).join(''));
    } else {
      sawDynamic = true;
    }
  }

  // Static HTML outside <?php ?> renders verbatim — no runtime needed.
  const htmlOnly = code.replace(/<\?php[\s\S]*?\?>/g, '').trim();
  if (htmlOnly) output.push(htmlOnly.replace(/<[^>]+>/g, '').trim());

  // Variables, math, function calls, loops, classes — these would need a real
  // PHP runtime, so we say so honestly rather than inventing a plausible result.
  const needsRuntime = sawDynamic || /\$[a-zA-Z_]|var_dump|print_r|\bfunction\b|\bforeach\b|\bfor\b|\bwhile\b|\bclass\b|json_encode|\bnew\b/.test(php);

  return formatOutput(output.filter(Boolean), needsRuntime);
}

function ChallengeWidget({ challenge }) {
  const [picked, setPicked] = useState(null);
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
      {picked !== null && (
        <button className={s.challengeReset} onClick={() => setPicked(null)}>Try again</button>
      )}
    </div>
  );
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

function LineNums({ count, scrollRef }) {
  return (
    <div ref={scrollRef} className={s.lineNums} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={s.lineNum}>{i + 1}</div>
      ))}
    </div>
  );
}

export default function PhpPlaygroundTool() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [code, setCode] = useState(LESSONS[0].code);
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState(() => new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conceptOpen, setConceptOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState('');
  const [editorPct, setEditorPct] = useState(50);
  const [isDraggingHandle, setIsDraggingHandle] = useState(false);

  const lineNumsRef = useRef(null);
  const highlightRef = useRef(null);
  const workAreaRef = useRef(null);
  const isDragging = useRef(false);

  const lesson = LESSONS[activeIdx];
  const output = useMemo(() => inferOutput(code, lesson.code, lesson.expectedOutput), [code, lesson.code, lesson.expectedOutput]);
  const lineCount = useMemo(() => code.split('\n').length, [code]);
  const highlighted = useMemo(() => highlightPHP(code), [code]);
  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }, []);

  useEffect(() => {
    setProgress(readProgress());
    try {
      const urlCode = new URLSearchParams(window.location.search).get('c');
      if (urlCode) {
        setCode(decodeURIComponent(escape(atob(urlCode))));
        setHydrated(true);
        return;
      }
    } catch {}
    const saved = readPosition();
    if (saved > 0 && saved < LESSONS.length) {
      setActiveIdx(saved);
      setCode(LESSONS[saved].code);
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
    setCode(LESSONS[idx].code);
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

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const el = event.target;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = code.slice(0, start) + '  ' + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
    }
  }, [code]);

  const syncScroll = useCallback((event) => {
    if (lineNumsRef.current) lineNumsRef.current.scrollTop = event.target.scrollTop;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = event.target.scrollTop;
      highlightRef.current.scrollLeft = event.target.scrollLeft;
    }
  }, []);

  const copyCode = useCallback(async () => {
    try { await navigator.clipboard.writeText(code); showToast('Copied'); }
    catch { showToast('Copy failed'); }
  }, [code, showToast]);

  const resetCode = useCallback(() => {
    setCode(lesson.code);
    showToast('Code reset');
  }, [lesson.code, showToast]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/x-php' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lesson.id}.php`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded');
  }, [code, lesson.id, showToast]);

  const shareCode = useCallback(async () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(code)));
      const url = `${window.location.origin}/php-playground/?c=${encoded}`;
      await navigator.clipboard.writeText(url);
      showToast('Share link copied');
    } catch {
      showToast('Copy failed');
    }
  }, [code, showToast]);

  const copyOutput = useCallback(async () => {
    try { await navigator.clipboard.writeText(output); showToast('Output copied'); }
    catch { showToast('Copy failed'); }
  }, [output, showToast]);

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
      setEditorPct(Math.max(32, Math.min(68, pct)));
    };
    const onUp = () => {
      isDragging.current = false;
      setIsDraggingHandle(false);
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const query = search.toLowerCase();
    return LESSONS.filter(item => item.title.toLowerCase().includes(query) || item.chapter.toLowerCase().includes(query));
  }, [search]);

  if (!hydrated) return null;

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="php-playground" />
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/php-playground.svg" width={24} height={24} alt="" />
          <span className={s.headerTitle}>PHP <span className={s.accent}>Playground</span></span>
          <span className={s.headerBreadcrumb}>{lesson.chapter} &rarr; {lesson.title}</span>
        </div>
        <div className={s.headerRight}>
          <span className={s.progressBadge}>{completedCount}/{LESSONS.length} lessons</span>
        </div>
      </header>

      <div className={s.body}>
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <div className={s.sidebarPill}>
              <span className={s.sidebarPillDot} />
              PHP Playground
            </div>
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>

          <div className={s.searchWrap}>
            <input className={s.searchInput} value={search} onChange={event => setSearch(event.target.value)} placeholder="Search lessons..." />
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
                ? <div style={{ padding: '12px', fontSize: 12, color: 'var(--text3)' }}>No lessons found</div>
                : filteredLessons.map(item => {
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
              CHAPTERS.map(chapter => (
                <div key={chapter}>
                  <div className={s.chapterLabel}>{chapter}</div>
                  {LESSONS.filter(item => item.chapter === chapter).map(item => {
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

        {!sidebarOpen && (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            Lessons
          </button>
        )}

        <div className={s.main}>
          <PlaygroundTopAd />
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen(open => !open)}>
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

          <div ref={workAreaRef} className={s.workArea}>
            <div className={s.editorPane} style={isMobile ? {} : { flex: `0 0 ${editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>PHP code</span>
                <div className={s.paneActions}>
                  <button className={s.iconBtn} onClick={resetCode} title="Reset code">Reset</button>
                  <button className={s.iconBtn} onClick={copyCode} title="Copy PHP">Copy</button>
                  <button className={s.iconBtn} onClick={downloadCode} title="Download PHP">.php</button>
                  <button className={s.iconBtn} onClick={shareCode} title="Copy share link">Share</button>
                </div>
              </div>
              <div className={s.editorWrap}>
                <LineNums count={lineCount} scrollRef={lineNumsRef} />
                <div className={s.codeArea}>
                  <pre ref={highlightRef} className={s.highlight} aria-hidden="true" dangerouslySetInnerHTML={{ __html: highlighted + '\n' }} />
                  <textarea
                    className={s.editor}
                    value={code}
                    onChange={event => setCode(event.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={syncScroll}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </div>
              </div>
            </div>

            <div className={`${s.dragHandle} ${isDraggingHandle ? s.dragHandleActive : ''}`} onMouseDown={startDrag} title="Drag to resize" />

            <div className={s.previewPane} style={isMobile ? {} : { flex: `0 0 ${100 - editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Simulated output</span>
                <div className={s.paneActions}>
                  <button className={s.iconBtn} onClick={copyOutput} title="Copy output">Copy output</button>
                </div>
              </div>
              <pre className={s.previewFrame} style={{ margin: 0, padding: 14, overflow: 'auto', whiteSpace: 'pre-wrap', fontFamily: 'ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace', fontSize: 12, lineHeight: 1.5 }}>{output}</pre>
            </div>
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
            <div style={{ display: 'flex', gap: 6 }}>
              <button className={`${s.doneBtn} ${isDone ? s.doneBtnComplete : ''}`} onClick={markDone}>
                {isDone ? 'Done' : 'Mark Done'}
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
