'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import s from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { CHAPTERS } from './lessons';
import { TW_CLASSES } from './tw-classes';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const LS_PROGRESS   = 'fwd-tw-playground-progress';
const LS_POSITION   = 'fwd-tw-playground-position';
const LS_CHALLENGES = 'fwd-tw-playground-challenges';

function readProgress()   { try { return new Set(JSON.parse(localStorage.getItem(LS_PROGRESS) || '[]')); } catch { return new Set(); } }
function saveProgress(s)  { try { localStorage.setItem(LS_PROGRESS, JSON.stringify([...s])); } catch {} }
function readPosition()   { try { return JSON.parse(localStorage.getItem(LS_POSITION) || '0'); } catch { return 0; } }
function savePosition(i)  { try { localStorage.setItem(LS_POSITION, JSON.stringify(i)); } catch {} }
function readChallenges() { try { return new Set(JSON.parse(localStorage.getItem(LS_CHALLENGES) || '[]')); } catch { return new Set(); } }
function saveChallenges(s){ try { localStorage.setItem(LS_CHALLENGES, JSON.stringify([...s])); } catch {} }

const ALL_LESSONS = CHAPTERS.flatMap(ch => ch.lessons.map(l => ({ ...l, chapterId: ch.id })));

// ── Confetti ──────────────────────────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#f43f5e', '#3b82f6'];
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden';
  document.body.appendChild(wrap);
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    const size = 6 + Math.random() * 8;
    el.style.cssText = `position:absolute;left:${Math.random()*100}%;top:-10px;width:${size}px;height:${size}px;background:${colors[i%colors.length]};border-radius:${Math.random()>.5?'50%':'2px'};animation:confettiFall ${1.2+Math.random()*.8}s ${Math.random()*.4}s ease-in forwards;`;
    wrap.appendChild(el);
  }
  setTimeout(() => document.body.removeChild(wrap), 2500);
}

// ── HTML highlighter (reused from HtmlPlaygroundTool) ─────────────────────────
function highlightHTML(raw) {
  const e = t => t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  // Character-preserving: every input character is emitted exactly once (escaped)
  // and whitespace inside tags is kept verbatim, so the highlighted <pre> stays the
  // same length/layout as the textarea above it (no caret/selection drift).
  let out = ''; let i = 0; const n = raw.length;
  while (i < n) {
    if (raw[i] !== '<') {
      const next = raw.indexOf('<', i);
      const text = next === -1 ? raw.slice(i) : raw.slice(i, next);
      if (text) out += `<span class="hl-text">${e(text)}</span>`;
      i = next === -1 ? n : next; continue;
    }
    if (raw.startsWith('<!--', i)) {
      const ce = raw.indexOf('-->', i);
      const seg = ce === -1 ? raw.slice(i) : raw.slice(i, ce + 3);
      out += `<span class="hl-cm">${e(seg)}</span>`;
      i = ce === -1 ? n : ce + 3; continue;
    }
    const end = raw.indexOf('>', i);
    if (end === -1) { out += e(raw.slice(i)); break; }
    let p = i + 1;
    out += '<span class="hl-punct">&lt;</span>';
    if (raw[p] === '/') { out += '<span class="hl-slash">/</span>'; p++; }
    let s = p; while (p < end && !/[\s/]/.test(raw[p])) p++;
    if (p > s) out += `<span class="hl-tag">${e(raw.slice(s, p))}</span>`;
    while (p < end) {
      const ch = raw[p];
      if (/\s/.test(ch)) { out += e(ch); p++; continue; }
      if (ch === '/')    { out += '<span class="hl-slash">/</span>'; p++; continue; }
      if (/[\w-]/.test(ch)) {
        let as = p; while (p < end && /[\w-]/.test(raw[p])) p++;
        out += `<span class="hl-attr">${e(raw.slice(as, p))}</span>`;
        if (raw[p] === '=') {
          out += '<span class="hl-eq">=</span>'; p++;
          const q = raw[p];
          if (q === '"' || q === "'") {
            let vs = p; p++; while (p < end && raw[p] !== q) p++; if (p < end) p++;
            out += `<span class="hl-val">${e(raw.slice(vs, p))}</span>`;
          } else {
            let vs = p; while (p < end && !/[\s>]/.test(raw[p])) p++;
            if (p > vs) out += `<span class="hl-val">${e(raw.slice(vs, p))}</span>`;
          }
        }
        continue;
      }
      out += e(ch); p++;
    }
    out += '<span class="hl-punct">&gt;</span>';
    i = end + 1;
  }
  return out;
}

// ── Build iframe srcdoc with Tailwind CDN ─────────────────────────────────────
function buildSrcdoc(html, dark) {
  return `<!DOCTYPE html>
<html class="${dark ? 'dark' : ''}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script src="https://cdn.tailwindcss.com"><\/script>
<script>tailwind.config = { darkMode: 'class' }<\/script>
</head>
<body>
${html}
</body>
</html>`;
}

// ── Challenge widget ──────────────────────────────────────────────────────────
function ChallengeWidget({ challenge, onCorrect }) {
  const [picked, setPicked] = useState(null);
  function pick(opt) {
    if (picked) return; setPicked(opt);
    if (opt === challenge.correct) setTimeout(onCorrect, 600);
  }
  return (
    <div className={s.challenge}>
      <div className={s.challengeHeader}><span>🎯</span><span className={s.challengeTitle}>Quick Check</span></div>
      <p className={s.challengeQ}>{challenge.question}</p>
      <div className={s.challengeOpts}>
        {challenge.options.map(opt => {
          const isCorrect = opt === challenge.correct;
          const isPicked  = opt === picked;
          return (
            <button key={opt}
              className={`${s.challengeBtn} ${isPicked ? (isCorrect ? s.challengeCorrect : s.challengeWrong) : ''}`}
              onClick={() => pick(opt)} disabled={!!picked}>
              {isPicked && isCorrect && '✓ '}{isPicked && !isCorrect && '✗ '}{opt}
            </button>
          );
        })}
      </div>
      {picked && (
        <p className={picked === challenge.correct ? s.challengeRight : s.challengeWrongMsg}>
          {picked === challenge.correct ? '🎉 Correct!' : `The answer is "${challenge.correct}".`}
        </p>
      )}
    </div>
  );
}

// ── Line numbers ──────────────────────────────────────────────────────────────
function LineNums({ count, scrollRef }) {
  return (
    <div className={s.lineNums} ref={scrollRef} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={s.lineNum}>{i + 1}</div>
      ))}
    </div>
  );
}

// ── Concept text ──────────────────────────────────────────────────────────────
function ConceptText({ text }) {
  return (
    <div className={s.conceptText}>
      {text.split('\n\n').map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p
          .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
          .replace(/`([^`]+)`/g,'<code>$1</code>') }} />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TailwindPlaygroundTool() {
  const [activeIdx,     setActiveIdx]     = useState(0);
  const [htmlCode,      setHtmlCode]      = useState(ALL_LESSONS[0].html);
  const [srcDoc,        setSrcDoc]        = useState('');
  const [progress,      setProgress]      = useState(new Set());
  const [challenges,    setChallenges]    = useState(new Set());
  const [sidebarOpen,   setSidebarOpen]   = useState(true);
  const [conceptOpen,   setConceptOpen]   = useState(true);
  const [isMobile,      setIsMobile]      = useState(false);
  const [editorPct,     setEditorPct]     = useState(45);
  const [previewWidth,  setPreviewWidth]  = useState(null);
  const [toast,         setToast]         = useState('');
  const [search,        setSearch]        = useState('');
  const [acSuggestions, setAcSuggestions] = useState([]);
  const [acIndex,       setAcIndex]       = useState(0);
  const [acPos,         setAcPos]         = useState({ top: 0, left: 0 });

  const debounceRef  = useRef(null);
  const isDragging   = useRef(false);
  const workAreaRef  = useRef(null);
  const textareaRef  = useRef(null);
  const acRef        = useRef(null);
  const highlightRef = useRef(null);
  const lineNumsRef  = useRef(null);
  const htmlCodeRef  = useRef(ALL_LESSONS[0].html);

  const lesson     = ALL_LESSONS[activeIdx];
  const prevLesson = ALL_LESSONS[activeIdx - 1] || null;
  const nextLesson = ALL_LESSONS[activeIdx + 1] || null;

  // ── Hydration ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const prog = readProgress();
    const chal = readChallenges();
    const pos  = Math.min(readPosition(), ALL_LESSONS.length - 1);
    setProgress(prog);
    setChallenges(chal);
    loadLesson(pos, prog, false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Mobile detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => { const m = window.innerWidth < 768; setIsMobile(m); if (m) setSidebarOpen(false); };
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Preview update ────────────────────────────────────────────────────────
  function queuePreview(html, dark) {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSrcDoc(buildSrcdoc(html, dark)), 200);
  }
  function immediatePreview(html, dark) {
    clearTimeout(debounceRef.current);
    setSrcDoc(buildSrcdoc(html, dark));
  }


  // ── Load lesson ───────────────────────────────────────────────────────────
  function loadLesson(idx, prog, markCurrent = true) {
    const l = ALL_LESSONS[idx];
    htmlCodeRef.current = l.html;
    setHtmlCode(l.html);
    setActiveIdx(idx);
    savePosition(idx);
    if (markCurrent) {
      const next = new Set(prog ?? progress);
      next.add(l.id);
      const chapter = CHAPTERS.find(ch => ch.lessons.some(x => x.id === l.id));
      if (chapter) {
        const wasComplete = chapter.lessons.every(x => progress.has(x.id));
        const nowComplete = chapter.lessons.every(x => next.has(x.id));
        if (!wasComplete && nowComplete) setTimeout(() => launchConfetti(), 300);
      }
      setProgress(next); saveProgress(next);
    }
    immediatePreview(l.html, false);
  }

  // ── Editor change ─────────────────────────────────────────────────────────
  function onHtmlChange(e) {
    const val = e.target.value;
    htmlCodeRef.current = val;
    setHtmlCode(val);
    syncScroll();
    queuePreview(val, false);
    const ta = e.target;
    requestAnimationFrame(() => updateSuggestions(ta));
  }

  function handleKeyDown(e) {
    if (acSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setAcIndex(i => (i + 1) % acSuggestions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setAcIndex(i => (i - 1 + acSuggestions.length) % acSuggestions.length);
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        applySuggestion(acSuggestions[acIndex]);
        return;
      }
      if (e.key === 'Escape') {
        setAcSuggestions([]);
        return;
      }
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target;
      const start = ta.selectionStart; const end = ta.selectionEnd;
      const newVal = ta.value.slice(0, start) + '  ' + ta.value.slice(end);
      htmlCodeRef.current = newVal;
      setHtmlCode(newVal);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 2; });
    }
  }

  function syncScroll() {
    if (!textareaRef.current) return;
    const t = textareaRef.current.scrollTop; const l = textareaRef.current.scrollLeft;
    if (highlightRef.current) { highlightRef.current.scrollTop = t; highlightRef.current.scrollLeft = l; }
    if (lineNumsRef.current)  { lineNumsRef.current.scrollTop = t; }
  }

  // ── Autocomplete ─────────────────────────────────────────────────────────
  function getCaretScreenPos(ta) {
    try {
      const cs = window.getComputedStyle(ta);
      const mirror = document.createElement('div');
      mirror.style.cssText = [
        'position:fixed', 'top:0', 'left:0', 'visibility:hidden', 'pointer-events:none',
        'white-space:pre-wrap', 'word-break:break-word', 'overflow:hidden',
        `font:${cs.font}`, `padding:${cs.padding}`,
        `width:${ta.offsetWidth}px`, `line-height:${cs.lineHeight}`,
      ].join(';');
      document.body.appendChild(mirror);

      const before = ta.value.slice(0, ta.selectionStart);
      const text   = document.createTextNode(before);
      const caret  = document.createElement('span');
      caret.textContent = '|';
      mirror.appendChild(text);
      mirror.appendChild(caret);

      const taRect    = ta.getBoundingClientRect();
      const caretRect = caret.getBoundingClientRect();
      document.body.removeChild(mirror);

      // Return fixed-position coords (screen space, accounting for scroll)
      return {
        top:  taRect.top  + (caretRect.top  - 0) - ta.scrollTop  + parseFloat(cs.paddingTop)  + parseFloat(cs.lineHeight || 18),
        left: taRect.left + (caretRect.left - 0) - ta.scrollLeft + parseFloat(cs.paddingLeft),
      };
    } catch {
      const r = ta.getBoundingClientRect();
      return { top: r.top + 30, left: r.left + 8 };
    }
  }

  function getCurrentWord(ta) {
    const full   = ta.value;
    const cursor = ta.selectionStart;
    const before = full.slice(0, cursor);

    // Walk backwards from cursor to find if we're inside class="..."
    // Find the most recent opening quote that belongs to a class= attribute
    let quotePos = -1;
    for (let i = cursor - 1; i >= 0; i--) {
      const ch = full[i];
      if (ch === '"') {
        // Check if preceded (with optional whitespace) by class=
        const prefix = full.slice(Math.max(0, i - 20), i);
        if (/class\s*=\s*$/.test(prefix)) { quotePos = i; break; }
        // It's a different attribute's quote — we're not in a class value
        break;
      }
      // If we hit a tag open or close, stop
      if (ch === '<' || ch === '>') break;
    }
    if (quotePos === -1) return null;

    const insideClass = before.slice(quotePos + 1);
    // Get the partial word being typed (after the last whitespace)
    const lastSpace = Math.max(
      insideClass.lastIndexOf(' '),
      insideClass.lastIndexOf('\n'),
      insideClass.lastIndexOf('\t')
    );
    return insideClass.slice(lastSpace + 1);
  }

  function updateSuggestions(ta) {
    const word = getCurrentWord(ta);
    if (!word || word.length < 1) { setAcSuggestions([]); return; }
    const lower = word.toLowerCase();
    const matches = TW_CLASSES.filter(c => c.startsWith(lower) && c !== lower).slice(0, 8);
    setAcSuggestions(matches);
    setAcIndex(0);
    if (matches.length > 0) setAcPos(getCaretScreenPos(ta));
  }

  function applySuggestion(suggestion) {
    const ta = textareaRef.current;
    if (!ta) return;
    const word = getCurrentWord(ta);
    if (word === null) return;
    const cursor = ta.selectionStart;
    const before = ta.value.slice(0, cursor - word.length) + suggestion;
    const after  = ta.value.slice(cursor);
    const newVal = before + after;
    htmlCodeRef.current = newVal;
    setHtmlCode(newVal);
    setAcSuggestions([]);
    queuePreview(newVal, false);
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = before.length;
      ta.focus();
    });
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  const resetLesson = useCallback(() => {
    const l = ALL_LESSONS[activeIdx];
    htmlCodeRef.current = l.html;
    setHtmlCode(l.html);
    immediatePreview(l.html, false);
    showToast('Reset to defaults');
  }, [activeIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  const copyHtml = useCallback(() => {
    navigator.clipboard.writeText(htmlCodeRef.current).catch(() => {});
    showToast('HTML copied!');
  }, []);

  const download = useCallback(() => {
    const full = buildSrcdoc(htmlCodeRef.current, false);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([full], { type: 'text/html' }));
    a.download = `${lesson.id}.html`;
    a.click(); URL.revokeObjectURL(a.href);
    showToast('Downloaded!');
  }, [lesson]); // eslint-disable-line react-hooks/exhaustive-deps

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 1800); }

  const markChallengeComplete = useCallback((lessonId) => {
    setChallenges(prev => { const next = new Set(prev); next.add(lessonId); saveChallenges(next); return next; });
  }, []);

  // ── Drag handle (horizontal) ──────────────────────────────────────────────
  function onDragStart(e) {
    e.preventDefault();
    if (!workAreaRef.current) return;
    isDragging.current = true;
    const rect = workAreaRef.current.getBoundingClientRect();
    document.body.style.userSelect = 'none';
    const iframes = workAreaRef.current.querySelectorAll('iframe');
    iframes.forEach(f => { f.style.pointerEvents = 'none'; });
    function onMove(ev) {
      if (!isDragging.current) return;
      const pct = Math.min(75, Math.max(25, ((ev.clientX - rect.left) / rect.width) * 100));
      setEditorPct(pct);
    }
    function onUp() {
      isDragging.current = false;
      document.body.style.userSelect = '';
      iframes.forEach(f => { f.style.pointerEvents = ''; });
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  // ── Filtered sidebar ──────────────────────────────────────────────────────
  const filteredChapters = useMemo(() => {
    if (!search.trim()) return CHAPTERS;
    const q = search.toLowerCase();
    return CHAPTERS.map(ch => ({ ...ch, lessons: ch.lessons.filter(l => l.title.toLowerCase().includes(q) || ch.title.toLowerCase().includes(q)) })).filter(ch => ch.lessons.length > 0);
  }, [search]);

  // ── Derived ───────────────────────────────────────────────────────────────
  const totalLessons   = ALL_LESSONS.length;
  const completedCount = progress.size;
  const lineCount      = (htmlCode.match(/\n/g) || []).length + 1;
  const highlighted    = useMemo(() => highlightHTML(htmlCode), [htmlCode]);
  const challengeDone  = challenges.has(lesson.id);
  const chapter        = CHAPTERS.find(ch => ch.lessons.some(l => l.id === lesson.id));

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="tailwind-playground" />

      {/* ── Header ── */}
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/tailwind-playground.svg" width="20" height="20" alt="" />
          <span className={s.headerTitle}>Tailwind Playground</span>
          {!isMobile && chapter && (
            <span className={s.breadcrumb}>{chapter.emoji} {chapter.title} / {lesson.title}</span>
          )}
        </div>
      </header>

      {/* ── Body ── */}
      <div className={s.body}>

        {/* ── Sidebar ── */}
        {sidebarOpen && (
          <aside className={`${s.sidebar} ${isMobile ? s.sidebarOverlay : ''}`}>
            <div className={s.sidebarTopBar}>
              <span className={s.progressCount}>{completedCount}/{totalLessons} lessons</span>
              <button className={s.sidebarHideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
            </div>
            <div className={s.sidebarProgress}>
              <div className={s.progressLabel}>Your progress</div>
              <div className={s.progressBar2}><div className={s.progressFill2} style={{ width: `${(completedCount/totalLessons)*100}%` }} /></div>
              <span className={s.progressHint}>Click any lesson below to jump to it</span>
            </div>
            <div className={s.searchWrap}>
              <input className={s.searchInput} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search lessons…" />
            </div>
            <div className={s.sidebarScroll}>
              {filteredChapters.map(ch => (
                <div key={ch.id} className={s.chapter}>
                  <div className={s.chapterTitle}>{ch.emoji} {ch.title}</div>
                  {ch.lessons.map(l => {
                    const globalIdx = ALL_LESSONS.findIndex(x => x.id === l.id);
                    const isActive  = globalIdx === activeIdx;
                    const isDone    = progress.has(l.id);
                    return (
                      <button key={l.id}
                        className={`${s.lessonBtn} ${isActive ? s.lessonBtnActive : ''} ${isDone ? s.lessonBtnDone : ''}`}
                        onClick={() => { loadLesson(globalIdx, progress); if (isMobile) setSidebarOpen(false); }}>
                        <span className={s.lessonDot}
                          title={isDone ? 'Mark incomplete' : 'Mark complete'}
                          onClick={e => {
                            e.stopPropagation();
                            const next = new Set(progress);
                            if (next.has(l.id)) next.delete(l.id); else next.add(l.id);
                            setProgress(next); saveProgress(next);
                          }}>{isDone ? '✓' : ''}</span>
                        <span className={s.lessonLabel}>{l.title}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* ── Reopen tab ── */}
        {!sidebarOpen && (
          <button className={s.sidebarReopenTab} onClick={() => setSidebarOpen(true)} title="Show lessons">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            <span className={s.sidebarReopenLabel}>Lessons</span>
          </button>
        )}

        {/* ── Main ── */}
        <div className={s.main}>
          <PlaygroundTopAd />

          {/* ── Concept strip ── */}
          <div className={s.conceptStrip}>
            <button className={s.conceptToggle} onClick={() => setConceptOpen(p => !p)}>
              <span className={s.lessonTitle}>{lesson.title}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ transform: conceptOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {conceptOpen && (
              <div className={s.conceptBody}>
                <ConceptText text={lesson.concept} />
                {lesson.challenge && !challengeDone && (
                  <ChallengeWidget challenge={lesson.challenge} onCorrect={() => markChallengeComplete(lesson.id)} />
                )}
                {challengeDone && <p className={s.challengeDoneMsg}>✓ Challenge complete!</p>}
              </div>
            )}
          </div>

          {/* ── Work area ── */}
          <div className={s.workArea} ref={workAreaRef}>

            {/* ── Editor pane ── */}
            <div className={s.editorPane} style={isMobile ? {} : { width: `${editorPct}%` }}>
              <div className={s.editorHeader}>
                <span className={s.editorLabel}>HTML</span>
                <div className={s.editorBtns}>
                  <button className={s.editorBtn} onClick={copyHtml} title="Copy HTML">Copy</button>
                  <button className={s.editorBtn} onClick={resetLesson} title="Reset">Reset</button>
                </div>
              </div>
              <div className={s.editorWrap}>
                <LineNums count={lineCount} scrollRef={lineNumsRef} />
                <div className={s.codeArea}>
                  <pre ref={highlightRef} className={s.highlight} aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: highlighted + '\n' }} />
                  <textarea ref={textareaRef} className={s.editor}
                    value={htmlCode} onChange={onHtmlChange}
                    onKeyDown={handleKeyDown} onScroll={syncScroll}
                    onBlur={() => setTimeout(() => setAcSuggestions([]), 150)}
                    spellCheck={false} autoCorrect="off" autoCapitalize="off" />
                </div>
              </div>
            </div>

            {/* ── Drag handle ── */}
            {!isMobile && <div className={s.dragHandle} onMouseDown={onDragStart} title="Drag to resize" />}

            {/* ── Preview pane ── */}
            <div className={s.previewPane} style={isMobile ? {} : { width: `${100 - editorPct}%` }}>
              <div className={s.previewHeader}>
                <span className={s.previewLabel}>Preview</span>
                <div className={s.previewSizes}>
                  <button className={`${s.sizeBtn} ${previewWidth===375?s.sizeBtnActive:''}`} onClick={() => setPreviewWidth(w => w===375?null:375)} title="Mobile (375px)">
                    {/* Phone */}
                    <svg width="12" height="14" viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="1" width="16" height="26" rx="3"/>
                      <line x1="10" y1="24" x2="14" y2="24"/>
                    </svg>
                    <span>375</span>
                  </button>
                  <button className={`${s.sizeBtn} ${previewWidth===768?s.sizeBtnActive:''}`} onClick={() => setPreviewWidth(w => w===768?null:768)} title="Tablet (768px)">
                    {/* Tablet */}
                    <svg width="13" height="14" viewBox="0 0 26 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="1" width="22" height="26" rx="3"/>
                      <line x1="11" y1="24" x2="15" y2="24"/>
                    </svg>
                    <span>768</span>
                  </button>
                  <button className={`${s.sizeBtn} ${previewWidth===null?s.sizeBtnActive:''}`} onClick={() => setPreviewWidth(null)} title="Full width">
                    {/* Desktop monitor */}
                    <svg width="15" height="14" viewBox="0 0 30 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="1" width="28" height="18" rx="2"/>
                      <line x1="10" y1="22" x2="20" y2="22"/>
                      <line x1="15" y1="19" x2="15" y2="22"/>
                    </svg>
                    <span>Full</span>
                  </button>
                </div>
<button className={s.refreshBtn} onClick={() => immediatePreview(htmlCodeRef.current, false)} title="Refresh">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
                  </svg>
                </button>
                <button className={s.downloadBtn} onClick={download} title="Download HTML" style={{ display:'flex', alignItems:'center', gap:'3px' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  .html
                </button>
              </div>
              <div className={s.previewContent}>
                <iframe key={activeIdx} className={s.preview} srcDoc={srcDoc}
                  sandbox="allow-scripts" title="Tailwind Preview"
                  style={previewWidth ? { width: `${previewWidth}px`, maxWidth: '100%' } : {}} />
              </div>
            </div>
          </div>

          {/* ── Nav bar ── */}
          <div className={s.navBar}>
            <button className={s.navBtn} onClick={() => prevLesson && loadLesson(activeIdx-1, progress)} disabled={!prevLesson}>← Prev</button>
            <span className={s.navCounter}>{activeIdx+1} / {totalLessons}</span>
            <button className={s.navBtn} onClick={() => nextLesson && loadLesson(activeIdx+1, progress)} disabled={!nextLesson}>Next →</button>
          </div>
        </div>
      </div>

      {toast && <div className={s.toast}>{toast}</div>}

      {acSuggestions.length > 0 && (
        <div
          ref={acRef}
          className={s.acDropdown}
          style={{ position: 'fixed', top: acPos.top, left: acPos.left, zIndex: 9999 }}
        >
          {acSuggestions.map((cls, i) => (
            <div
              key={cls}
              className={`${s.acItem} ${i === acIndex ? s.acItemActive : ''}`}
              onMouseDown={e => { e.preventDefault(); applySuggestion(cls); }}
            >
              {cls}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
