'use client';

import { useState, useCallback, useRef } from 'react';
import s from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';

// ── Languages ─────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: 'eng', label: 'English' },
  { code: 'spa', label: 'Spanish' },
  { code: 'fra', label: 'French' },
  { code: 'deu', label: 'German' },
  { code: 'ita', label: 'Italian' },
  { code: 'por', label: 'Portuguese' },
  { code: 'rus', label: 'Russian' },
  { code: 'chi_sim', label: 'Chinese (Simplified)' },
  { code: 'chi_tra', label: 'Chinese (Traditional)' },
  { code: 'jpn', label: 'Japanese' },
  { code: 'kor', label: 'Korean' },
  { code: 'ara', label: 'Arabic' },
  { code: 'hin', label: 'Hindi' },
  { code: 'nld', label: 'Dutch' },
  { code: 'pol', label: 'Polish' },
  { code: 'tur', label: 'Turkish' },
];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

// Map Tesseract logger status → { pct, label }
function parseProgress(m) {
  switch (m.status) {
    case 'loading tesseract core':       return { pct: 5  + Math.round(m.progress * 15), label: 'Loading OCR engine…' };
    case 'initializing tesseract':       return { pct: 20 + Math.round(m.progress * 10), label: 'Initializing…' };
    case 'loading language traineddata': return { pct: 30 + Math.round(m.progress * 20), label: 'Loading language data…' };
    case 'initializing api':             return { pct: 50 + Math.round(m.progress * 5),  label: 'Preparing…' };
    case 'recognizing text':             return { pct: 55 + Math.round(m.progress * 44), label: 'Recognizing text…' };
    default: return null;
  }
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ImageToTextTool() {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl,  setImageUrl]  = useState('');
  const [imageInfo, setImageInfo] = useState(null);
  const [lang,      setLang]      = useState('eng');
  const [phase,     setPhase]     = useState('idle');  // idle | loading | done | error
  const [progress,  setProgress]  = useState(0);
  const [progLabel, setProgLabel] = useState('');
  const [text,      setText]      = useState('');
  const [confidence, setConfidence] = useState(null);
  const [isDrag,    setIsDrag]    = useState(false);
  const [toast,     setToast]     = useState('');

  const fileInputRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  }, []);

  const loadImage = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast('Please select an image file'); return; }
    const url = URL.createObjectURL(file);
    setImageUrl(prev => { if (prev) URL.revokeObjectURL(prev); return url; });
    setImageFile(file);
    setText('');
    setConfidence(null);
    setPhase('idle');
    setProgress(0);
    const img = new Image();
    img.onload = () => setImageInfo({ name: file.name, size: file.size, w: img.naturalWidth, h: img.naturalHeight });
    img.src = url;
  }, [showToast]);

  const handleFileChange = (e) => { if (e.target.files[0]) loadImage(e.target.files[0]); e.target.value = ''; };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDrag(false);
    loadImage(e.dataTransfer.files[0]);
  }, [loadImage]);

  const handlePaste = useCallback((e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) { loadImage(item.getAsFile()); break; }
    }
  }, [loadImage]);

  const recognize = async () => {
    if (!imageFile || phase === 'loading') return;
    setPhase('loading');
    setProgress(5);
    setProgLabel('Loading OCR engine…');
    setText('');
    setConfidence(null);
    try {
      const { default: Tesseract } = await import('tesseract.js');
      const result = await Tesseract.recognize(imageFile, lang, {
        logger: (m) => {
          const p = parseProgress(m);
          if (p) { setProgress(p.pct); setProgLabel(p.label); }
        },
      });
      setText(result.data.text.trim());
      setConfidence(Math.round(result.data.confidence));
      setPhase('done');
      setProgress(100);
    } catch (err) {
      setPhase('error');
      console.error('OCR error:', err);
    }
  };

  const copyText = async () => {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); showToast('Copied!'); }
    catch { showToast('Copy failed'); }
  };

  const downloadText = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `${imageInfo?.name?.replace(/\.[^.]+$/, '') || 'extracted'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded');
  };

  const clear = () => {
    setImageUrl(prev => { if (prev) URL.revokeObjectURL(prev); return ''; });
    setImageFile(null);
    setImageInfo(null);
    setText('');
    setConfidence(null);
    setPhase('idle');
    setProgress(0);
  };

  const wordCount = text ? (text.match(/\b\w+\b/g)?.length ?? 0) : 0;
  const confColor = confidence === null ? '' : confidence >= 80 ? '#4ade80' : confidence >= 55 ? '#fbbf24' : '#f87171';

  return (
    <div className={s.wrap} onPaste={handlePaste}>
      <ImageToolsTopNav active="image-to-text-converter" />
      <PlaygroundTopAd />

      {/* ── Header ── */}
      <div className={s.header}>
        <div className={s.logo}>
          <div className={s.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="2" width="9" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
              <circle cx="3.5" cy="4.5" r="0.9" fill="currentColor" opacity="0.7"/>
              <polyline points="1 8 3.5 5.5 5.5 7 7 6 10 8" stroke="currentColor" strokeWidth="1.1"/>
              <line x1="12" y1="3" x2="15" y2="3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="12" y1="6" x2="15" y2="6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="12" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="1"  y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
              <line x1="1"  y1="14.5" x2="11" y2="14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
            </svg>
          </div>
          <span>Image to <span className={s.accent}>Text</span></span>
        </div>
        <div className={s.headerMid}>
          <span className={s.hint}>OCR · extract text from any image · 16 languages · 100% private</span>
        </div>
        <div className={s.headerActions}>
          <label className={s.langLabel}>
            <span className={s.langLabelText}>Language</span>
            <select className={s.sel} value={lang} onChange={e => setLang(e.target.value)}>
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </label>
          <button
            className={s.btnPrimary}
            onClick={recognize}
            disabled={!imageFile || phase === 'loading'}
          >
            {phase === 'loading' ? 'Recognizing…' : 'Extract Text'}
          </button>
          <button className={s.btn} onClick={() => fileInputRef.current?.click()}>Upload</button>
          <button className={`${s.btn} ${s.btnDanger}`} onClick={clear} disabled={!imageFile}>Clear</button>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
      </div>

      {/* ── Body ── */}
      <div className={s.body}>

        {/* Left — image pane */}
        <div
          className={`${s.imagePane} ${isDrag ? s.dragOver : ''} ${!imageFile ? s.imagePaneEmpty : ''}`}
          onDragOver={e => { e.preventDefault(); setIsDrag(true); }}
          onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget)) setIsDrag(false); }}
          onDrop={handleDrop}
          onClick={() => !imageFile && fileInputRef.current?.click()}
        >
          {imageUrl ? (
            <div className={s.previewWrap}>
              <img src={imageUrl} className={s.preview} alt="Uploaded image for OCR" />

              {/* Progress overlay */}
              {phase === 'loading' && (
                <div className={s.progressOverlay}>
                  <div className={s.progressBox}>
                    <div className={s.progressLabel}>{progLabel}</div>
                    <div className={s.progressTrack}>
                      <div className={s.progressFill} style={{ width: `${progress}%` }} />
                    </div>
                    <div className={s.progressPct}>{progress}%</div>
                  </div>
                </div>
              )}

              {/* Image info */}
              {imageInfo && phase !== 'loading' && (
                <div className={s.imageInfo}>
                  <span className={s.infoItem}>{imageInfo.name}</span>
                  <span className={s.infoDot} />
                  <span className={s.infoItem}>{imageInfo.w}×{imageInfo.h}</span>
                  <span className={s.infoDot} />
                  <span className={s.infoItem}>{formatBytes(imageInfo.size)}</span>
                </div>
              )}
            </div>
          ) : (
            <div className={s.dropZone}>
              <div className={s.dropIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2.5"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <p className={s.dropTitle}>Drop image here</p>
              <p className={s.dropSub}>or <span className={s.dropLink} onClick={() => fileInputRef.current?.click()}>click to upload</span> · or <kbd className={s.kbd}>Ctrl+V</kbd> to paste</p>
              <p className={s.dropFormats}>JPEG · PNG · WebP · BMP · GIF · TIFF</p>
            </div>
          )}
        </div>

        {/* Right — text pane */}
        <div className={s.textPane}>
          <div className={s.textHead}>
            <span className={s.paneLabel}>EXTRACTED TEXT</span>
            {confidence !== null && (
              <span className={s.confidence} style={{ color: confColor }}>
                {confidence}% confidence
              </span>
            )}
            <div className={s.textActions}>
              <button className={s.btn} onClick={copyText} disabled={!text}>Copy</button>
              <button className={s.btn} onClick={downloadText} disabled={!text}>Download .txt</button>
            </div>
          </div>

          {phase === 'error' ? (
            <div className={s.errorState}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p>Recognition failed.</p>
              <p className={s.errorHint}>Try a higher-resolution image or check the language setting.</p>
            </div>
          ) : (
            <textarea
              className={s.outputArea}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={
                phase === 'loading'
                  ? 'Recognizing text…'
                  : 'Extracted text will appear here.\n\nLoad an image and click "Extract Text" to begin.\nThe result is editable — clean it up before copying.'
              }
              readOnly={phase === 'loading'}
              spellCheck
            />
          )}

          {text && (
            <div className={s.textStats}>
              <span>{wordCount.toLocaleString()} words</span>
              <span className={s.statDot} />
              <span>{text.length.toLocaleString()} chars</span>
              {confidence !== null && (
                <>
                  <span className={s.statDot} />
                  <span style={{ color: confColor }}>OCR confidence: {confidence}%</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}
