'use client';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { CHAPTERS } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const LS_PROGRESS_KEY = 'fwd-html-playground-progress';
const LS_POSITION_KEY = 'fwd-html-playground-position';

function readProgress() {
  try { return JSON.parse(localStorage.getItem(LS_PROGRESS_KEY) || '{}'); } catch { return {}; }
}
function saveProgress(p) {
  try { localStorage.setItem(LS_PROGRESS_KEY, JSON.stringify(p)); } catch {}
}
function readPosition() {
  try { return JSON.parse(localStorage.getItem(LS_POSITION_KEY) || 'null'); } catch { return null; }
}
function savePosition(chapterId, lessonId) {
  try { localStorage.setItem(LS_POSITION_KEY, JSON.stringify({ chapterId, lessonId })); } catch {}
}

// Flatten all lessons for prev/next navigation
const ALL_LESSONS = CHAPTERS.flatMap(ch => ch.lessons.map(l => ({ ...l, chapterId: ch.id, chapterTitle: ch.title })));

function buildIframeSrc(html) {
  const doc = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:system-ui,sans-serif;padding:20px;line-height:1.6;color:#1e293b}a{color:#6366f1}table{border-collapse:collapse}img{max-width:100%}input,button,select,textarea{font-family:inherit}</style></head><body>${html}</body></html>`;
  return `data:text/html;charset=utf-8,${encodeURIComponent(doc)}`;
}

/* ── Syntax highlighter ── */
function highlightHTML(raw) {
  const e = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  // Character-preserving: every input character is emitted exactly once (escaped)
  // and whitespace inside tags is kept verbatim, so the highlighted <pre> stays the
  // same length/layout as the textarea above it (no caret/selection drift).
  let result = ''; let i = 0; const n = raw.length;
  while (i < n) {
    if (raw[i] !== '<') {
      const next = raw.indexOf('<', i);
      const text = next === -1 ? raw.slice(i) : raw.slice(i, next);
      if (text) result += `<span class="hl-text">${e(text)}</span>`;
      i = next === -1 ? n : next; continue;
    }
    if (raw.startsWith('<!--', i)) {
      const ce = raw.indexOf('-->', i);
      const seg = ce === -1 ? raw.slice(i) : raw.slice(i, ce + 3);
      result += `<span class="hl-cm">${e(seg)}</span>`;
      i = ce === -1 ? n : ce + 3; continue;
    }
    const end = raw.indexOf('>', i);
    if (end === -1) { result += e(raw.slice(i)); break; }
    let p = i + 1;
    result += `<span class="hl-punct">&lt;</span>`;
    if (raw[p] === '/') { result += `<span class="hl-slash">/</span>`; p++; }
    let s = p; while (p < end && !/[\s/]/.test(raw[p])) p++;
    if (p > s) result += `<span class="hl-tag">${e(raw.slice(s, p))}</span>`;
    while (p < end) {
      const ch = raw[p];
      if (/\s/.test(ch)) { result += e(ch); p++; continue; }
      if (ch === '/')    { result += `<span class="hl-slash">/</span>`; p++; continue; }
      if (/[\w-]/.test(ch)) {
        let as = p; while (p < end && /[\w-]/.test(raw[p])) p++;
        result += `<span class="hl-attr">${e(raw.slice(as, p))}</span>`;
        if (raw[p] === '=') {
          result += `<span class="hl-eq">=</span>`; p++;
          const q = raw[p];
          if (q === '"' || q === "'") {
            let vs = p; p++; while (p < end && raw[p] !== q) p++; if (p < end) p++;
            result += `<span class="hl-val">${e(raw.slice(vs, p))}</span>`;
          } else {
            let vs = p; while (p < end && !/[\s>]/.test(raw[p])) p++;
            if (p > vs) result += `<span class="hl-val">${e(raw.slice(vs, p))}</span>`;
          }
        }
        continue;
      }
      result += e(ch); p++;
    }
    result += `<span class="hl-punct">&gt;</span>`;
    i = end + 1;
  }
  return result;
}

/* ── Confetti ── */
function launchConfetti() {
  const colors = ['#f97316','#fb923c','#fbbf24','#34d399','#60a5fa','#a78bfa'];
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden';
  document.body.appendChild(container);

  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * 100;
    const delay = Math.random() * 0.4;
    const size = 6 + Math.random() * 8;
    const duration = 1.2 + Math.random() * 0.8;
    el.style.cssText = `
      position:absolute;left:${x}%;top:-10px;
      width:${size}px;height:${size}px;
      background:${color};border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      animation:confettiFall ${duration}s ${delay}s ease-in forwards;
      transform:rotate(${Math.random()*360}deg);
    `;
    container.appendChild(el);
  }

  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes confettiFall {
        0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => document.body.removeChild(container), 2500);
}

/* ── Challenge widget ── */
function ChallengeWidget({ challenge, onCorrect }) {
  const [picked, setPicked] = useState(null);

  function pick(option) {
    if (picked) return;
    setPicked(option);
    if (option === challenge.answer) {
      setTimeout(() => onCorrect(), 600);
    }
  }

  return (
    <div className={s.challengeBox}>
      <div className={s.challengeHeader}>
        <span className={s.challengeIcon}>🎯</span>
        <span className={s.challengeTitle}>Quick Check</span>
      </div>
      <p className={s.challengePrompt}>{challenge.prompt}</p>
      <div className={s.challengeOptions}>
        {challenge.options.map(opt => {
          const isCorrect = opt === challenge.answer;
          const isPicked = opt === picked;
          return (
            <button
              key={opt}
              className={`${s.challengeOpt} ${isPicked ? (isCorrect ? s.challengeCorrect : s.challengeWrong) : ''}`}
              onClick={() => pick(opt)}
              disabled={!!picked}
            >
              {isPicked && isCorrect && '✓ '}
              {isPicked && !isCorrect && '✗ '}
              {opt}
            </button>
          );
        })}
      </div>
      {picked && (
        <p className={picked === challenge.answer ? s.challengeMsgRight : s.challengeMsgWrong}>
          {picked === challenge.answer ? '🎉 Correct! Well done.' : `Not quite — the answer is "${challenge.answer}".`}
        </p>
      )}
    </div>
  );
}

/* ── Demo: Picker ── */
function PickerDemo({ demo, onHtmlChange }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (demo.options[active]) onHtmlChange(demo.options[active].html);
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset to first option when demo changes
  useEffect(() => {
    setActive(0);
    onHtmlChange(demo.options[0].html);
  }, [demo]); // eslint-disable-line react-hooks/exhaustive-deps

  // Arrow key navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(prev => Math.min(prev + 1, demo.options.length - 1));
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(prev => Math.max(prev - 1, 0));
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [demo.options.length]);

  return (
    <div className={s.demoWrap}>
      {demo.label && <p className={s.demoLabel}>{demo.label}</p>}
      <div className={s.pickerBtns}>
        {demo.options.map((opt, i) => (
          <button
            key={i}
            className={`${s.pickerBtn} ${active === i ? s.pickerBtnActive : ''}`}
            onClick={() => setActive(i)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className={s.keyboardHint}><kbd>←</kbd><kbd>→</kbd> to cycle options</p>
      {demo.options[active]?.note && (
        <div className={s.noteCallout}>
          <span className={s.noteIcon}>💡</span>
          <span>{demo.options[active].note}</span>
        </div>
      )}
    </div>
  );
}

/* ── Demo: Toggle ── */
function ToggleDemo({ demo, onHtmlChange }) {
  const [active, setActive] = useState([]);

  useEffect(() => {
    setActive([]);
  }, [demo]);

  useEffect(() => {
    let text = demo.base;
    active.forEach(i => {
      const t = demo.toggles[i];
      text = `${t.wrap[0]}${text}${t.wrap[1]}`;
    });
    onHtmlChange(`<p>${text}</p>`);
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize with base content
  useEffect(() => {
    onHtmlChange(`<p>${demo.base}</p>`);
  }, [demo]); // eslint-disable-line react-hooks/exhaustive-deps

  function toggle(i) {
    setActive(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  }

  return (
    <div className={s.demoWrap}>
      {demo.label && <p className={s.demoLabel}>{demo.label}</p>}
      <div className={s.toggleBtns}>
        {demo.toggles.map((t, i) => (
          <button
            key={i}
            className={`${s.toggleBtn} ${active.includes(i) ? s.toggleBtnActive : ''}`}
            onClick={() => toggle(i)}
          >
            {active.includes(i) ? '✓ ' : ''}{t.label}
            {t.note && <span className={s.toggleNote}>{t.note}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Demo: Sandbox ── */
function SandboxDemo({ demo, onHtmlChange }) {
  const [code, setCode] = useState(demo.defaultHtml || '');

  useEffect(() => {
    setCode(demo.defaultHtml || '');
    onHtmlChange(demo.defaultHtml || '');
  }, [demo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onHtmlChange(code);
  }, [code]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={s.demoWrap}>
      {demo.label && <p className={s.demoLabel}>{demo.label}</p>}
      <textarea
        className={s.sandboxTextarea}
        value={code}
        onChange={e => setCode(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}

/* ── Demo: Info (code display, no live preview) ── */
function InfoDemo({ demo }) {
  const [active, setActive] = useState(0);
  const opt = demo.options[active];
  return (
    <div className={s.demoWrap}>
      {demo.label && <p className={s.demoLabel}>{demo.label}</p>}
      <div className={s.pickerBtns}>
        {demo.options.map((o, i) => (
          <button key={i} className={`${s.pickerBtn} ${active === i ? s.pickerBtnActive : ''}`} onClick={() => setActive(i)}>
            {o.label}
          </button>
        ))}
      </div>
      <div className={s.infoBlock}>
        {opt.code && <pre className={s.infoCode}><code dangerouslySetInnerHTML={{ __html: highlightHTML(opt.code) }} /></pre>}
        {opt.desc && <p className={s.infoDesc}>{opt.desc}</p>}
        {opt.note && <div className={s.noteCallout}><span className={s.noteIcon}>💡</span><span>{opt.note}</span></div>}
      </div>
    </div>
  );
}

export default function HtmlPlaygroundTool() {
  const [activeChapterId, setActiveChapterId] = useState(CHAPTERS[0].id);
  const [activeLessonId,  setActiveLessonId]  = useState(CHAPTERS[0].lessons[0].id);
  const [progress,        setProgress]        = useState({});
  const [previewHtml,     setPreviewHtml]     = useState('');
  const [sidebarOpen,     setSidebarOpen]     = useState(true);
  const [copied,          setCopied]          = useState(false);
  const [changedLines,    setChangedLines]    = useState(new Set());
  const [splitPct,        setSplitPct]        = useState(50);
  const [challengeDone,   setChallengeDone]   = useState(false);
  const [challengeResult, setChallengeResult] = useState(null); // eslint-disable-line no-unused-vars
  const [search,          setSearch]          = useState('');

  const [outputHeight,    setOutputHeight]    = useState(300);
  // The HTML pane is editable: typing updates the preview directly. `edited` keeps
  // the pane on screen even if the user clears every line; `demoKey` remounts the
  // lesson demo so Reset brings back its generated code.
  const [edited,          setEdited]          = useState(false);
  const [demoKey,         setDemoKey]         = useState(0);
  const userEditRef       = useRef(false);
  const codeTextaRef      = useRef(null);
  const codeHighRef       = useRef(null);

  const prevHtmlRef       = useRef('');
  const splitDragging     = useRef(false);
  const heightDragging    = useRef(false);
  const splitContainerRef = useRef(null);

  const copyCode = useCallback(() => {
    if (!previewHtml) return;
    navigator.clipboard.writeText(previewHtml).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [previewHtml]);

  const onCodeChange = useCallback(e => {
    userEditRef.current = true;
    setEdited(true);
    setPreviewHtml(e.target.value);
  }, []);

  // Tab inserts two spaces instead of leaving the editor.
  const onCodeKeyDown = useCallback(e => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const ta = e.target;
    const start = ta.selectionStart;
    const next = ta.value.slice(0, start) + '  ' + ta.value.slice(ta.selectionEnd);
    userEditRef.current = true;
    setEdited(true);
    setPreviewHtml(next);
    requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 2; });
  }, []);

  const onCodeScroll = useCallback(() => {
    const ta = codeTextaRef.current, hi = codeHighRef.current;
    if (ta && hi) { hi.scrollTop = ta.scrollTop; hi.scrollLeft = ta.scrollLeft; }
  }, []);

  // Remount the demo so it pushes its own code again, discarding the user's edits.
  const resetCode = useCallback(() => {
    setEdited(false);
    setDemoKey(k => k + 1);
  }, []);

  useEffect(() => {
    setProgress(readProgress());
    const pos = readPosition();
    if (pos) {
      const chapter = CHAPTERS.find(ch => ch.id === pos.chapterId);
      const lesson   = chapter?.lessons.find(l => l.id === pos.lessonId);
      if (chapter && lesson) {
        setActiveChapterId(pos.chapterId);
        setActiveLessonId(pos.lessonId);
      }
    }
  }, []);

  // Diff lines when previewHtml changes
  useEffect(() => {
    // Typing in the HTML pane shouldn't flash every line it touches.
    if (userEditRef.current || !previewHtml || !prevHtmlRef.current) {
      userEditRef.current = false;
      prevHtmlRef.current = previewHtml;
      return;
    }
    const prevLines = prevHtmlRef.current.split('\n');
    const nextLines = previewHtml.split('\n');
    const changed = new Set();
    nextLines.forEach((line, i) => {
      if (line !== prevLines[i]) changed.add(i);
    });
    prevHtmlRef.current = previewHtml;
    if (changed.size > 0) {
      setChangedLines(changed);
      setTimeout(() => setChangedLines(new Set()), 800);
    }
  }, [previewHtml]);

  const activeChapter = CHAPTERS.find(ch => ch.id === activeChapterId) || CHAPTERS[0];
  const activeLesson  = ALL_LESSONS.find(l => l.id === activeLessonId) || ALL_LESSONS[0];

  const lessonIndex = ALL_LESSONS.findIndex(l => l.id === activeLessonId);
  const prevLesson  = ALL_LESSONS[lessonIndex - 1] || null;
  const nextLesson  = ALL_LESSONS[lessonIndex + 1] || null;

  const totalLessons   = ALL_LESSONS.length;
  const completedCount = Object.values(progress).filter(Boolean).length;

  const filteredChapters = search.trim()
    ? CHAPTERS.map(ch => ({
        ...ch,
        lessons: ch.lessons.filter(l =>
          l.title.toLowerCase().includes(search.toLowerCase()) ||
          ch.title.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(ch => ch.lessons.length > 0)
    : CHAPTERS;

  function selectLesson(chapterId, lessonId) {
    setActiveChapterId(chapterId);
    setActiveLessonId(lessonId);
    setPreviewHtml('');
    prevHtmlRef.current = '';
    setEdited(false);
    setChallengeDone(false);
    setChallengeResult(null);
    savePosition(chapterId, lessonId);

    // If clicking a completed lesson, reset progress from that lesson onwards
    const clickedIndex = ALL_LESSONS.findIndex(l => l.id === lessonId);
    const wasCompleted = progress[lessonId];

    let next;
    if (wasCompleted) {
      // Remove completion for this lesson and everything after it
      next = { ...progress };
      ALL_LESSONS.slice(clickedIndex).forEach(l => { delete next[l.id]; });
    } else {
      next = { ...progress, [lessonId]: true };
      // Check if this completion finishes a chapter
      const chapter = CHAPTERS.find(ch => ch.lessons.some(l => l.id === lessonId));
      if (chapter) {
        const wasComplete = chapter.lessons.every(l => progress[l.id]);
        const nowComplete = chapter.lessons.every(l => next[l.id]);
        if (!wasComplete && nowComplete) {
          setTimeout(() => launchConfetti(), 300);
        }
      }
    }

    setProgress(next);
    saveProgress(next);
  }

  function goLesson(lesson) {
    if (!lesson) return;
    selectLesson(lesson.chapterId, lesson.id);
  }

  // Split pane drag
  function onSplitMouseDown(e) {
    e.preventDefault();
    if (!splitContainerRef.current) return;
    splitDragging.current = true;
    const rect = splitContainerRef.current.getBoundingClientRect();
    document.body.style.userSelect = 'none';
    const iframes = splitContainerRef.current.querySelectorAll('iframe');
    iframes.forEach(f => { f.style.pointerEvents = 'none'; });

    function onMove(ev) {
      if (!splitDragging.current) return;
      const pct = Math.min(80, Math.max(20, ((ev.clientX - rect.left) / rect.width) * 100));
      setSplitPct(pct);
    }
    function onUp() {
      splitDragging.current = false;
      document.body.style.userSelect = '';
      iframes.forEach(f => { f.style.pointerEvents = ''; });
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  // Bottom-edge vertical resize
  function onHeightDragStart(e) {
    e.preventDefault();
    heightDragging.current = true;
    const startY = e.clientY;
    const startH = splitContainerRef.current?.offsetHeight ?? outputHeight;
    document.body.style.userSelect = 'none';
    const iframes = splitContainerRef.current?.querySelectorAll('iframe') ?? [];
    iframes.forEach(f => { f.style.pointerEvents = 'none'; });
    function onMove(ev) {
      if (!heightDragging.current) return;
      const next = Math.max(180, startH + (ev.clientY - startY));
      setOutputHeight(next);
    }
    function onUp() {
      heightDragging.current = false;
      document.body.style.userSelect = '';
      iframes.forEach(f => { f.style.pointerEvents = ''; });
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  const iframeSrc = useMemo(() => previewHtml ? buildIframeSrc(previewHtml) : '', [previewHtml]);

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="html-playground" />
      {/* ── Header ── */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/html-playground.svg" width={26} height={26} alt="" />
          <span className={s.headerTitle}>HTML <span className={s.accent}>Playground</span></span>
          <span className={s.lessonBreadcrumb}>{activeChapter.emoji} {activeChapter.title} &rarr; {activeLesson.title}</span>
        </div>
      </header>

      <div className={s.body}>
        {/* ── Sidebar ── */}
        {sidebarOpen && (
          <nav className={s.sidebar}>
            <div className={s.sidebarTopBar}>
              <span className={s.progressCount}>{completedCount}/{totalLessons} lessons</span>
              <button className={s.sidebarHideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
            </div>
            <div className={s.sidebarProgress}>
              <div className={s.progressLabel}>
                <span>Your progress</span>
              </div>
              <div className={s.progressBar} title={`${Math.round(completedCount / totalLessons * 100)}% complete`}>
                <div
                  className={s.progressFill}
                  style={{ width: `${Math.round(completedCount / totalLessons * 100)}%` }}
                />
              </div>
              <span className={s.progressText}>Click any lesson below to jump to it</span>
            </div>
            <div className={s.searchWrap}>
              <input
                className={s.searchInput}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search lessons…"
              />
            </div>
            {filteredChapters.map(ch => (
              <div key={ch.id} className={s.chapterGroup}>
                <div className={s.chapterTitle}>{ch.emoji} {ch.title}</div>
                {ch.lessons.map(lesson => {
                  const done   = progress[lesson.id];
                  const active = lesson.id === activeLessonId;
                  return (
                    <button
                      key={lesson.id}
                      className={`${s.lessonBtn} ${active ? s.lessonBtnActive : ''} ${done ? s.lessonBtnDone : ''}`}
                      onClick={() => selectLesson(ch.id, lesson.id)}
                    >
                      <span className={s.lessonDot}>{done ? '✓' : ''}</span>
                      {lesson.title}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        )}

        {/* ── Sidebar reopen tab ── */}
        {!sidebarOpen && (
          <button className={s.sidebarReopenTab} onClick={() => setSidebarOpen(true)} title="Show lessons sidebar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
            <span className={s.sidebarReopenLabel}>Lessons</span>
          </button>
        )}

        {/* ── Main content ── */}
        <main className={s.main}>
          <PlaygroundTopAd className={s.topAd} />
          <div key={activeLessonId} className={s.lessonContent}>
            {/* Concept */}
            <section className={s.conceptSection}>
              <h2 className={s.lessonTitle}>{activeLesson.title}</h2>
              <div className={s.conceptText}>
                {activeLesson.concept.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>

            {/* Interactive demo */}
            <section className={s.demoSection}>
              <div className={s.demoHeader}>
                <span className={s.demoSectionLabel}>Interactive Demo</span>
              </div>
              {activeLesson.demo.type === 'picker' && (
                <PickerDemo key={`${activeLessonId}-${demoKey}`} demo={activeLesson.demo} onHtmlChange={setPreviewHtml} />
              )}
              {activeLesson.demo.type === 'toggle' && (
                <ToggleDemo key={`${activeLessonId}-${demoKey}`} demo={activeLesson.demo} onHtmlChange={setPreviewHtml} />
              )}
              {activeLesson.demo.type === 'sandbox' && (
                <SandboxDemo key={`${activeLessonId}-${demoKey}`} demo={activeLesson.demo} onHtmlChange={setPreviewHtml} />
            )}
            {activeLesson.demo.type === 'info' && (
                <InfoDemo key={activeLessonId} demo={activeLesson.demo} />
              )}
            </section>

            {/* Preview + Code */}
            {(previewHtml || edited) && (
              <div className={s.outputWrap}>
              <section className={s.outputSection} ref={splitContainerRef} style={{ display: 'flex', gap: 0, height: outputHeight }}>
                <div className={s.previewPane} style={{ flex: `0 0 ${splitPct}%` }}>
                  <div className={s.paneLabel}>Preview</div>
                  <iframe
                    className={s.iframe}
                    src={iframeSrc}
                    title="Preview"
                    sandbox="allow-same-origin"
                  />
                </div>
                <div className={s.splitHandle} onMouseDown={onSplitMouseDown} title="Drag to resize">
                  <div className={s.splitHandleLine} />
                </div>
                <div className={s.codePane} style={{ flex: 1 }}>
                  <div className={s.paneLabel}>
                    HTML <span className={s.editHint}>editable</span>
                    <span className={s.paneBtns}>
                      {edited && (
                        <button className={s.copyBtn} onClick={resetCode} title="Discard your edits">Reset</button>
                      )}
                      <button className={`${s.copyBtn} ${copied ? s.copyBtnDone : ''}`} onClick={copyCode}>
                        {copied ? '✓ Copied' : 'Copy'}
                      </button>
                    </span>
                  </div>
                  {/* Highlighted lines underneath, a transparent textarea on top —
                      same font, padding and wrapping, so the caret lines up. */}
                  <div className={s.codeEditWrap}>
                    <pre ref={codeHighRef} className={s.codeBlock} aria-hidden="true">
                      {previewHtml.split('\n').map((line, i) => (
                        <div
                          key={i}
                          className={`${s.codeLine} ${changedLines.has(i) ? s.codeLineChanged : ''}`}
                          dangerouslySetInnerHTML={{ __html: highlightHTML(line) || '&nbsp;' }}
                        />
                      ))}
                    </pre>
                    <textarea
                      ref={codeTextaRef}
                      className={s.codeEditor}
                      value={previewHtml}
                      onChange={onCodeChange}
                      onKeyDown={onCodeKeyDown}
                      onScroll={onCodeScroll}
                      spellCheck={false}
                      autoCorrect="off"
                      autoCapitalize="off"
                      aria-label="HTML code — edit to update the preview"
                    />
                  </div>
                </div>
              </section>
              <div className={s.heightHandle} onMouseDown={onHeightDragStart} title="Drag to resize preview">
                <div className={s.heightHandleLine} />
              </div>
              </div>
            )}

            {/* Challenge widget */}
            {activeLesson.challenge && previewHtml && !challengeDone && (
              <ChallengeWidget
                key={activeLessonId}
                challenge={activeLesson.challenge}
                onCorrect={() => setChallengeDone(true)}
              />
            )}
            {challengeDone && (
              <div className={s.challengeDone}>✓ Challenge complete — move to the next lesson!</div>
            )}
          </div>

          {/* Nav */}
          <div className={s.lessonNav}>
            <button
              className={s.navBtn}
              onClick={() => goLesson(prevLesson)}
              disabled={!prevLesson}
            >
              &larr; {prevLesson ? prevLesson.title : 'Previous'}
            </button>
            <button
              className={`${s.navBtn} ${s.navBtnNext}`}
              onClick={() => goLesson(nextLesson)}
              disabled={!nextLesson}
            >
              {nextLesson ? nextLesson.title : 'All done!'} &rarr;
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
