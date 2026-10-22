'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import s from './styles.module.css';
import TextToolsTopNav from '@/components/TextToolsTopNav';

// ── Stop words ───────────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with','by',
  'from','is','are','was','were','be','been','being','have','has','had','do',
  'does','did','will','would','could','should','may','might','shall','can',
  'this','that','these','those','it','its','he','she','we','they','i','you',
  'me','him','her','us','them','my','your','his','our','their','what','which',
  'who','whom','how','when','where','why','not','no','so','if','as','up','out',
  'into','about','after','before','between','during','through','over','under',
  'again','further','then','once','here','there','just','because','while',
  'although','though','since','until','unless','rather','very','also','more',
  'most','other','some','such','any','all','both','each','every','few','own',
  'same','too','than','only','even','well','now','s','t','re','ve','ll','d',
  'don','doesn','didn','won','isn','aren','wasn','weren','hasn','haven','hadn',
  'its','it','i','a','b','c','d','e','f','g','h','j','k','l','m','n','o','p',
  'q','r','u','v','w','x','y','z',
]);

// ── Syllable estimator ───────────────────────────────────────────────────────
function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

// ── Flesch grade label ───────────────────────────────────────────────────────
function fleschGrade(score) {
  if (score >= 90) return { label: 'Very Easy', sub: '5th grade', color: '#22c55e' };
  if (score >= 80) return { label: 'Easy', sub: '6th grade', color: '#4ade80' };
  if (score >= 70) return { label: 'Fairly Easy', sub: '7th grade', color: '#86efac' };
  if (score >= 60) return { label: 'Standard', sub: '8th–9th grade', color: '#fbbf24' };
  if (score >= 50) return { label: 'Fairly Hard', sub: '10th–12th grade', color: '#fb923c' };
  if (score >= 30) return { label: 'Difficult', sub: 'College level', color: '#f87171' };
  return { label: 'Very Hard', sub: 'Professional', color: '#ef4444' };
}

// ── Time formatter ───────────────────────────────────────────────────────────
function formatTime(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const rem = seconds % 60;
  return rem > 0 ? `${m}m ${rem}s` : `${m}m`;
}

// ── Text analysis engine ─────────────────────────────────────────────────────
function analyzeText(text) {
  if (!text.trim()) return null;

  const wordMatches = text.match(/\b[a-zA-Z'']+\b/g) || [];
  const wordCount = wordMatches.length;
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 2);
  const sentenceCount = Math.max(sentences.length, wordCount > 0 ? 1 : 0);
  const paragraphs = text.split(/\n{2,}/).filter(p => p.trim().length > 0);
  const paragraphCount = Math.max(paragraphs.length, wordCount > 0 ? 1 : 0);
  const lines = text.split('\n').length;

  const readingSeconds = Math.max(1, Math.round((wordCount / 238) * 60));
  const speakingSeconds = Math.max(1, Math.round((wordCount / 130) * 60));

  const uniqueWords = new Set(wordMatches.map(w => w.toLowerCase())).size;
  const totalLetters = wordMatches.reduce((sum, w) => sum + w.replace(/[^a-zA-Z]/g, '').length, 0);
  const avgWordLength = wordCount > 0 ? (totalLetters / wordCount).toFixed(1) : '—';
  const avgSentenceLength = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : '—';

  // Flesch Reading Ease
  const totalSyllables = wordMatches.reduce((sum, w) => sum + countSyllables(w), 0);
  const ASL = sentenceCount > 0 ? wordCount / sentenceCount : 0;
  const ASW = wordCount > 0 ? totalSyllables / wordCount : 0;
  const fleschScore = wordCount < 3 ? null : Math.max(0, Math.min(100, Math.round(206.835 - 1.015 * ASL - 84.6 * ASW)));
  const grade = fleschScore !== null ? fleschGrade(fleschScore) : null;

  // Keyword density (top 12, no stop words, min 3 chars)
  const freq = {};
  for (const w of wordMatches) {
    const lower = w.toLowerCase().replace(/[^a-z]/g, '');
    if (lower.length < 3 || STOP_WORDS.has(lower)) continue;
    freq[lower] = (freq[lower] || 0) + 1;
  }
  const topKeywords = Object.entries(freq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 12)
    .map(([word, count]) => ({
      word,
      count,
      pct: wordCount > 0 ? ((count / wordCount) * 100).toFixed(1) : '0',
    }));
  const maxKwCount = topKeywords[0]?.count || 1;

  return {
    wordCount, charCount, charNoSpaces, sentenceCount, paragraphCount, lines,
    readingTime: formatTime(readingSeconds),
    speakingTime: formatTime(speakingSeconds),
    uniqueWords, avgWordLength, avgSentenceLength,
    fleschScore, grade, topKeywords, maxKwCount,
  };
}

// ── Case converters ──────────────────────────────────────────────────────────
const CASE_OPS = [
  { label: 'lowercase',        fn: t => t.toLowerCase() },
  { label: 'UPPERCASE',        fn: t => t.toUpperCase() },
  { label: 'Title Case',       fn: t => t.replace(/\b\w/g, c => c.toUpperCase()) },
  {
    label: 'Sentence case',
    fn: t => t
      .toLowerCase()
      .replace(/(^|[.!?]\s+)([a-z])/g, (_, p, c) => p + c.toUpperCase()),
  },
  {
    label: 'camelCase',
    fn: t => t
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .trim()
      .split(/\s+/)
      .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(''),
  },
  {
    label: 'snake_case',
    fn: t => t.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''),
  },
  {
    label: 'kebab-case',
    fn: t => t.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  },
  {
    label: 'Strip Spaces',
    fn: t => t.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim(),
  },
  {
    label: 'Reverse Text',
    fn: t => t.split('').reverse().join(''),
  },
];

// ── Sample text ──────────────────────────────────────────────────────────────
const SAMPLE = `The quick brown fox jumps over the lazy dog. This classic pangram contains every letter of the English alphabet at least once. It has been used since the 19th century to test typewriters, keyboards, and fonts.

Writing quality matters enormously in professional communication. Clear, concise sentences help readers understand your message without confusion or ambiguity. Studies consistently show that shorter sentences improve comprehension significantly for most audiences.

This word counter analyzes your text in real time, counting words, sentences, paragraphs, and characters. It also calculates reading time, speaking time, and a Flesch readability score to help you improve your writing for any audience or platform.`;

const STORAGE_KEY = 'wdp-word-counter-v1';

// ── Main component ───────────────────────────────────────────────────────────
export default function WordCounterTool() {
  const [text, setText]           = useState('');
  const [toast, setToast]         = useState('');
  const [saveState, setSaveState] = useState('idle'); // 'idle' | 'saving' | 'saved'
  const hydrated  = useRef(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setText(saved);
    } catch {}
    hydrated.current = true;
  }, []);

  const stats = useMemo(() => analyzeText(text), [text]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }, []);

  const saveToStorage = useCallback((value) => {
    if (!hydrated.current) return;
    setSaveState('saving');
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        if (value) localStorage.setItem(STORAGE_KEY, value);
        else localStorage.removeItem(STORAGE_KEY);
        setSaveState('saved');
        setTimeout(() => setSaveState('idle'), 1500);
      } catch { setSaveState('idle'); }
    }, 600);
  }, []);

  const handleChange = useCallback((value) => {
    setText(value);
    saveToStorage(value);
  }, [saveToStorage]);

  const applyCase = useCallback((fn) => {
    setText(prev => {
      const next = fn(prev);
      saveToStorage(next);
      return next;
    });
    showToast('Applied');
  }, [showToast, saveToStorage]);

  const copyText = async () => {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); showToast('Copied!'); }
    catch { showToast('Copy failed'); }
  };

  const pasteText = async () => {
    try {
      const t = await navigator.clipboard.readText();
      handleChange(t);
      showToast('Pasted');
    }
    catch { showToast('Clipboard access denied'); }
  };

  const clearText = () => {
    setText('');
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setSaveState('idle');
    showToast('Cleared');
  };

  return (
    <div className={s.wrap}>
      <TextToolsTopNav active="word-counter" />

      {/* ── Header ── */}
      <div className={s.header}>
        <div className={s.logo}>
          <div className={s.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1.5" width="14" height="2" rx="1" fill="currentColor"/>
              <rect x="1" y="5.5" width="10" height="2" rx="1" fill="currentColor" opacity="0.75"/>
              <rect x="1" y="9.5" width="12" height="2" rx="1" fill="currentColor" opacity="0.5"/>
              <rect x="1" y="13" width="7" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
          <span>Word <span className={s.accent}>Counter</span></span>
        </div>
        <div className={s.headerMid}>
          <span className={s.hint}>Live counts · readability · keyword density · case converter</span>
        </div>
        <div className={s.headerActions}>
          <span className={`${s.saveIndicator} ${saveState === 'saved' ? s.saveIndicatorSaved : saveState === 'saving' ? s.saveIndicatorSaving : ''}`}>
            <span className={s.saveDot} />
            {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved' : 'Auto-save'}
          </span>
          <button className={s.btn} onClick={() => { handleChange(SAMPLE); showToast('Sample loaded'); }}>Sample</button>
          <button className={s.btn} onClick={pasteText}>Paste</button>
          <button className={s.btn} onClick={copyText} disabled={!text}>Copy</button>
          <button className={`${s.btn} ${s.btnDanger}`} onClick={clearText} disabled={!text}>Clear</button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className={s.body}>

        {/* Left — editor */}
        <div className={s.editorPane}>
          <textarea
            className={s.textarea}
            value={text}
            onChange={e => handleChange(e.target.value)}
            placeholder={"Paste or type your text here…\n\nWord count, character count, reading time, Flesch readability score, and keyword density update live as you type."}
            spellCheck
            autoComplete="off"
          />
          {/* Case converter bar */}
          <div className={s.casebar}>
            <span className={s.caseLabel}>Convert:</span>
            {CASE_OPS.map(op => (
              <button
                key={op.label}
                className={s.caseBtn}
                onClick={() => applyCase(op.fn)}
                disabled={!text}
                title={`Apply ${op.label}`}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right — stats */}
        <div className={s.statsPane}>
          {!stats ? (
            <div className={s.empty}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <p>Type or paste text to see live analysis</p>
            </div>
          ) : (
            <>
              {/* Counts */}
              <section className={s.group}>
                <div className={s.groupTitle}>Counts</div>
                <div className={s.grid3}>
                  <StatCard label="Words" value={stats.wordCount.toLocaleString()} accent />
                  <StatCard label="Characters" value={stats.charCount.toLocaleString()} />
                  <StatCard label="No Spaces" value={stats.charNoSpaces.toLocaleString()} />
                  <StatCard label="Sentences" value={stats.sentenceCount.toLocaleString()} />
                  <StatCard label="Paragraphs" value={stats.paragraphCount.toLocaleString()} />
                  <StatCard label="Lines" value={stats.lines.toLocaleString()} />
                  <StatCard label="Unique Words" value={stats.uniqueWords.toLocaleString()} />
                  <StatCard label="Avg Word Len" value={stats.avgWordLength} sub="letters" />
                  <StatCard label="Avg Sent Len" value={stats.avgSentenceLength} sub="words" />
                </div>
              </section>

              {/* Time */}
              <section className={s.group}>
                <div className={s.groupTitle}>Time Estimates</div>
                <div className={s.grid2}>
                  <StatCard label="Reading Time" value={stats.readingTime} sub="@ 238 wpm" accent />
                  <StatCard label="Speaking Time" value={stats.speakingTime} sub="@ 130 wpm" />
                </div>
              </section>

              {/* Readability */}
              {stats.fleschScore !== null && (
                <section className={s.group}>
                  <div className={s.groupTitle}>Readability — Flesch Reading Ease</div>
                  <div className={s.readCard}>
                    <div className={s.readScore} style={{ color: stats.grade.color }}>
                      {stats.fleschScore}
                    </div>
                    <div className={s.readRight}>
                      <div className={s.readLabel} style={{ color: stats.grade.color }}>
                        {stats.grade.label}
                      </div>
                      <div className={s.readSub}>{stats.grade.sub}</div>
                      <div className={s.readBarWrap}>
                        <div
                          className={s.readBarFill}
                          style={{ width: `${stats.fleschScore}%`, background: stats.grade.color }}
                        />
                      </div>
                      <div className={s.readHint}>0 = hardest · 100 = easiest</div>
                    </div>
                  </div>
                </section>
              )}

              {/* Keywords */}
              {stats.topKeywords.length > 0 && (
                <section className={s.group}>
                  <div className={s.groupTitle}>Top Keywords</div>
                  <div className={s.kwList}>
                    {stats.topKeywords.map(({ word, count, pct }) => (
                      <div key={word} className={s.kwRow}>
                        <span className={s.kwWord}>{word}</span>
                        <div className={s.kwBarWrap}>
                          <div
                            className={s.kwBarFill}
                            style={{ width: `${(count / stats.maxKwCount) * 100}%` }}
                          />
                        </div>
                        <span className={s.kwCount}>{count}×</span>
                        <span className={s.kwPct}>{pct}%</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}

// ── StatCard sub-component ───────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div className={s.statCard}>
      <div className={`${s.statValue} ${accent ? s.statValueAccent : ''}`}>{value}</div>
      <div className={s.statLabel}>{label}</div>
      {sub && <div className={s.statSub}>{sub}</div>}
    </div>
  );
}
