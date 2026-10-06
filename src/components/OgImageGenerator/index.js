'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import s from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';

/* ── Canvas size ─────────────────────────────────────────────────────────────── */
const W = 1200;
const H = 630;

/* ── Templates ───────────────────────────────────────────────────────────────── */
const TEMPLATES = [
  { id: 'clean',    label: 'Clean'    },
  { id: 'dark',     label: 'Dark'     },
  { id: 'gradient', label: 'Gradient' },
  { id: 'bold',     label: 'Bold'     },
  { id: 'split',    label: 'Split'    },
];

const FONTS = [
  { id: 'Inter, Arial, sans-serif',           label: 'Sans-serif'  },
  { id: 'Georgia, "Times New Roman", serif',  label: 'Serif'       },
  { id: '"Courier New", Courier, monospace',  label: 'Monospace'   },
  { id: 'Impact, "Arial Black", sans-serif',  label: 'Impact'      },
];

/* ── Text wrap ───────────────────────────────────────────────────────────────── */
function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(' ');
  let line = '';
  let lines = [];
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineH));
  return lines.length;
}

function measureLines(ctx, text, maxW) {
  const words = text.split(' ');
  let line = '';
  let count = 0;
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxW && line) { count++; line = word; }
    else line = test;
  }
  if (line) count++;
  return count;
}

/* ── Draw templates ──────────────────────────────────────────────────────────── */
function drawCanvas(canvas, opts) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const { template, title, description, site, font, bg1, bg2, textColor, accentColor, logoImg } = opts;

  const pad = 80;
  const contentW = W - pad * 2;

  if (template === 'clean') {
    // White/light background
    ctx.fillStyle = bg1;
    ctx.fillRect(0, 0, W, H);
    // Accent bar top
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 0, W, 8);
    // Title
    ctx.fillStyle = textColor;
    ctx.font = `bold 72px ${font}`;
    const titleLines = measureLines(ctx, title, contentW);
    const titleH = titleLines * 84;
    const startY = (H - titleH - (description ? 60 : 0) - 60) / 2 + 84;
    wrapText(ctx, title, pad, startY, contentW, 84);
    // Description
    if (description) {
      ctx.font = `400 32px ${font}`;
      ctx.fillStyle = textColor + 'cc';
      wrapText(ctx, description, pad, startY + titleH + 12, contentW, 44);
    }
    // Site name
    ctx.font = `600 26px ${font}`;
    ctx.fillStyle = accentColor;
    ctx.fillText(site, pad, H - 44);
    // Logo
    if (logoImg) { ctx.drawImage(logoImg, W - pad - 64, H - 44 - 32, 64, 64); }

  } else if (template === 'dark') {
    ctx.fillStyle = bg1;
    ctx.fillRect(0, 0, W, H);
    // Accent left bar
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 0, 8, H);
    // Title
    ctx.fillStyle = textColor;
    ctx.font = `bold 68px ${font}`;
    const titleLines = measureLines(ctx, title, contentW - 8);
    const titleH = titleLines * 80;
    const descH = description ? measureLines(ctx, description, contentW - 8) * 44 + 16 : 0;
    const totalH = titleH + descH + 60;
    const startY = (H - totalH) / 2 + 80;
    wrapText(ctx, title, pad + 8, startY, contentW - 8, 80);
    if (description) {
      ctx.font = `400 30px ${font}`;
      ctx.fillStyle = textColor + 'aa';
      wrapText(ctx, description, pad + 8, startY + titleH + 16, contentW - 8, 44);
    }
    // Site
    ctx.font = `600 24px ${font}`;
    ctx.fillStyle = accentColor;
    ctx.fillText(site, pad + 8, H - 44);
    if (logoImg) { ctx.drawImage(logoImg, W - pad - 60, H - 44 - 30, 60, 60); }

  } else if (template === 'gradient') {
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, bg1);
    grad.addColorStop(1, bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    // Centered text
    ctx.textAlign = 'center';
    ctx.fillStyle = textColor;
    ctx.font = `bold 72px ${font}`;
    const titleLines = measureLines(ctx, title, contentW);
    const titleH = titleLines * 84;
    const descH = description ? measureLines(ctx, description, contentW - 80) * 44 + 20 : 0;
    const startY = (H - titleH - descH - 50) / 2 + 84;
    wrapText(ctx, title, W / 2, startY, contentW, 84);
    if (description) {
      ctx.font = `400 30px ${font}`;
      ctx.fillStyle = textColor + 'cc';
      wrapText(ctx, description, W / 2, startY + titleH + 20, contentW - 80, 44);
    }
    ctx.font = `600 24px ${font}`;
    ctx.fillStyle = textColor + 'aa';
    ctx.fillText(site, W / 2, H - 44);
    ctx.textAlign = 'left';
    if (logoImg) { ctx.drawImage(logoImg, W / 2 - 30, H - 44 - 30 - 44, 60, 60); }

  } else if (template === 'bold') {
    ctx.fillStyle = bg1;
    ctx.fillRect(0, 0, W, H);
    // Big accent blob
    ctx.fillStyle = accentColor + '22';
    ctx.beginPath();
    ctx.arc(W - 100, -100, 400, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = accentColor + '11';
    ctx.beginPath();
    ctx.arc(-60, H + 60, 300, 0, Math.PI * 2);
    ctx.fill();
    // Title — large
    ctx.fillStyle = textColor;
    ctx.font = `900 80px ${font}`;
    const titleLines = measureLines(ctx, title, contentW);
    const titleH = titleLines * 92;
    const startY = (H - titleH - (description ? 56 : 0) - 50) / 2 + 92;
    wrapText(ctx, title, pad, startY, contentW, 92);
    if (description) {
      ctx.font = `400 30px ${font}`;
      ctx.fillStyle = textColor + 'bb';
      wrapText(ctx, description, pad, startY + titleH + 12, contentW, 44);
    }
    ctx.fillStyle = accentColor;
    ctx.fillRect(pad, H - 56, 48, 4);
    ctx.font = `700 24px ${font}`;
    ctx.fillStyle = accentColor;
    ctx.fillText(site, pad, H - 40);
    if (logoImg) { ctx.drawImage(logoImg, W - pad - 60, H - 56 - 30, 60, 60); }

  } else if (template === 'split') {
    // Left panel
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 0, W * 0.42, H);
    // Right panel
    ctx.fillStyle = bg1;
    ctx.fillRect(W * 0.42, 0, W * 0.58, H);
    // Left: site + logo stacked
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 36px ${font}`;
    ctx.fillText(site, (W * 0.42) / 2, H / 2 - 20);
    if (logoImg) {
      ctx.drawImage(logoImg, (W * 0.42) / 2 - 48, H / 2 - 120, 96, 96);
    } else {
      ctx.font = `900 80px ${font}`;
      ctx.fillStyle = '#ffffff44';
      ctx.fillText('OG', (W * 0.42) / 2, H / 2 + 70);
    }
    // Right: title + description
    ctx.textAlign = 'left';
    const rPad = 60;
    const rX = W * 0.42 + rPad;
    const rW = W * 0.58 - rPad * 2;
    ctx.fillStyle = textColor;
    ctx.font = `bold 58px ${font}`;
    const titleLines = measureLines(ctx, title, rW);
    const titleH = titleLines * 70;
    const descH = description ? measureLines(ctx, description, rW) * 42 + 16 : 0;
    const startY = (H - titleH - descH) / 2 + 70;
    wrapText(ctx, title, rX, startY, rW, 70);
    if (description) {
      ctx.font = `400 28px ${font}`;
      ctx.fillStyle = textColor + 'bb';
      wrapText(ctx, description, rX, startY + titleH + 16, rW, 42);
    }
  }
}

/* ── Default state ───────────────────────────────────────────────────────────── */
const DEFAULTS = {
  template:    'clean',
  title:       'Your Open Graph Title',
  description: 'A short description that appears in link previews on Twitter, Facebook, LinkedIn, and Slack.',
  site:        'yoursite.com',
  font:        'Inter, Arial, sans-serif',
  bg1:         '#ffffff',
  bg2:         '#6366f1',
  textColor:   '#0f172a',
  accentColor: '#6366f1',
};

/* ── Component ───────────────────────────────────────────────────────────────── */
export default function OgImageGenerator() {
  const canvasRef = useRef(null);
  const fileRef   = useRef(null);

  const [opts, setOpts]     = useState(DEFAULTS);
  const [logoImg, setLogoImg] = useState(null);
  const [copied, setCopied] = useState(false);

  const set = useCallback((key, val) => setOpts(prev => ({ ...prev, [key]: val })), []);

  /* ── Render on any change ────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawCanvas(canvas, { ...opts, logoImg });
  }, [opts, logoImg]);

  /* ── Logo upload ─────────────────────────────────────────────────────────── */
  const onLogoUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => setLogoImg(img);
    img.src = URL.createObjectURL(file);
  }, []);

  /* ── Download ────────────────────────────────────────────────────────────── */
  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = 'og-image.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  }, []);

  /* ── Copy to clipboard ───────────────────────────────────────────────────── */
  const copyImage = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* Clipboard API unavailable — fall back to download */
        download();
      }
    }, 'image/png');
  }, [download]);

  const showGrad   = opts.template === 'gradient';
  const showSplit  = opts.template === 'split';

  return (
    <div className={s.wrap}>
      <ImageToolsTopNav active="og-image-generator" />
      <PlaygroundTopAd />
      {/* Header */}
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>OG</span>
          OG Image Generator
        </div>
        <div className={s.headerActions}>
          <button className={`${s.actionBtn} ${copied ? s.actionBtnDone : ''}`} onClick={copyImage}>
            {copied ? '✓ Copied' : 'Copy Image'}
          </button>
          <button className={s.downloadBtn} onClick={download}>
            ↓ Download PNG
          </button>
        </div>
      </div>

      <div className={s.body}>
        {/* ── Controls ── */}
        <div className={s.controls}>

          {/* Template */}
          <div className={s.section}>
            <div className={s.sectionTitle}>Template</div>
            <div className={s.templateGrid}>
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  className={`${s.templateBtn} ${opts.template === t.id ? s.templateBtnActive : ''}`}
                  onClick={() => set('template', t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className={s.section}>
            <div className={s.sectionTitle}>Content</div>
            <div className={s.field}>
              <label className={s.label}>Title</label>
              <input className={s.input} value={opts.title} onChange={e => set('title', e.target.value)} placeholder="Page title" maxLength={120} />
            </div>
            <div className={s.field}>
              <label className={s.label}>Description</label>
              <textarea className={s.textarea} value={opts.description} onChange={e => set('description', e.target.value)} placeholder="Short description…" rows={2} maxLength={200} />
            </div>
            <div className={s.field}>
              <label className={s.label}>Site name / URL</label>
              <input className={s.input} value={opts.site} onChange={e => set('site', e.target.value)} placeholder="yoursite.com" maxLength={60} />
            </div>
          </div>

          {/* Style */}
          <div className={s.section}>
            <div className={s.sectionTitle}>Style</div>

            <div className={s.field}>
              <label className={s.label}>Font</label>
              <select className={s.select} value={opts.font} onChange={e => set('font', e.target.value)}>
                {FONTS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
              </select>
            </div>

            <div className={s.colorRow}>
              <div className={s.colorField}>
                <label className={s.label}>{showSplit ? 'Background' : showGrad ? 'Grad start' : 'Background'}</label>
                <div className={s.colorInput}>
                  <span className={s.colorSwatch} style={{ background: opts.bg1 }} />
                  <input type="color" className={s.colorPicker} value={opts.bg1} onChange={e => set('bg1', e.target.value)} />
                  <input className={s.hexInput} value={opts.bg1} onChange={e => set('bg1', e.target.value)} maxLength={7} />
                </div>
              </div>

              {showGrad && (
                <div className={s.colorField}>
                  <label className={s.label}>Grad end</label>
                  <div className={s.colorInput}>
                    <span className={s.colorSwatch} style={{ background: opts.bg2 }} />
                    <input type="color" className={s.colorPicker} value={opts.bg2} onChange={e => set('bg2', e.target.value)} />
                    <input className={s.hexInput} value={opts.bg2} onChange={e => set('bg2', e.target.value)} maxLength={7} />
                  </div>
                </div>
              )}

              {!showGrad && (
                <div className={s.colorField}>
                  <label className={s.label}>Accent</label>
                  <div className={s.colorInput}>
                    <span className={s.colorSwatch} style={{ background: opts.accentColor }} />
                    <input type="color" className={s.colorPicker} value={opts.accentColor} onChange={e => set('accentColor', e.target.value)} />
                    <input className={s.hexInput} value={opts.accentColor} onChange={e => set('accentColor', e.target.value)} maxLength={7} />
                  </div>
                </div>
              )}
            </div>

            <div className={s.colorRow}>
              <div className={s.colorField}>
                <label className={s.label}>Text color</label>
                <div className={s.colorInput}>
                  <span className={s.colorSwatch} style={{ background: opts.textColor }} />
                  <input type="color" className={s.colorPicker} value={opts.textColor} onChange={e => set('textColor', e.target.value)} />
                  <input className={s.hexInput} value={opts.textColor} onChange={e => set('textColor', e.target.value)} maxLength={7} />
                </div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className={s.section}>
            <div className={s.sectionTitle}>Logo / Icon</div>
            <input ref={fileRef} type="file" accept="image/*" className={s.fileInput} onChange={onLogoUpload} />
            <div className={s.logoRow}>
              <button className={s.uploadBtn} onClick={() => fileRef.current?.click()}>
                Upload image
              </button>
              {logoImg && (
                <button className={s.clearLogoBtn} onClick={() => setLogoImg(null)}>Remove</button>
              )}
            </div>
          </div>

          {/* Size info */}
          <div className={s.sizeInfo}>
            1200 × 630 px · PNG · Twitter, Facebook, LinkedIn, Slack
          </div>
        </div>

        {/* ── Preview ── */}
        <div className={s.preview}>
          <div className={s.previewLabel}>Preview (scaled)</div>
          <div className={s.canvasWrap}>
            <canvas ref={canvasRef} width={W} height={H} className={s.canvas} />
          </div>
          <div className={s.previewMeta}>
            Standard OG image size · 1.91:1 ratio · Recommended: &lt; 8 MB
          </div>
        </div>
      </div>
    </div>
  );
}
