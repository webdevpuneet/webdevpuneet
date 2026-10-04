'use client';
import { useState, useRef, useEffect } from 'react';
import s from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0').toUpperCase()).join('');
}
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, sl, l = (max + min) / 2;
  if (max === min) { h = sl = 0; }
  else {
    const d = max - min;
    sl = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6;
    }
  }
  return `hsl(${Math.round(h*360)}, ${Math.round(sl*100)}%, ${Math.round(l*100)}%)`;
}

function medianCut(pixels, depth) {
  if (depth === 0 || pixels.length === 0) {
    const avg = pixels.reduce((acc, p) => [acc[0]+p[0], acc[1]+p[1], acc[2]+p[2]], [0,0,0])
      .map(v => Math.round(v / pixels.length));
    return [avg];
  }
  const ranges = [0,1,2].map(c => {
    const vals = pixels.map(p => p[c]);
    return Math.max(...vals) - Math.min(...vals);
  });
  const channel = ranges.indexOf(Math.max(...ranges));
  pixels.sort((a, b) => a[channel] - b[channel]);
  const mid = Math.floor(pixels.length / 2);
  return [...medianCut(pixels.slice(0, mid), depth - 1), ...medianCut(pixels.slice(mid), depth - 1)];
}

function extractPalette(canvas, count) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const data = ctx.getImageData(0, 0, width, height).data;
  const pixels = [];
  const step = Math.max(1, Math.floor((width * height) / 5000));
  for (let i = 0; i < data.length; i += 4 * step) {
    const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
    if (a > 128) pixels.push([r, g, b]);
  }
  const depth = Math.ceil(Math.log2(count));
  return medianCut(pixels, depth).slice(0, count);
}

const MAX_COLORS = 150;

export default function ImageColorPaletteTool() {
  const [colors, setColors]     = useState([]);
  const [imgSrc, setImgSrc]     = useState('');
  const [count, setCount]       = useState(12);
  const [copiedIdx, setCopied]  = useState(null);
  const [format, setFormat]     = useState('hex');
  const [dragging, setDragging] = useState(false);
  const canvasRef = useRef(null);
  const fileRef   = useRef(null);

  useEffect(() => {
    if (imgSrc && canvasRef.current) {
      setColors(extractPalette(canvasRef.current, count));
    }
  }, [count, imgSrc]);

  function processImage(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      const src = e.target.result;
      setImgSrc(src);
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const maxDim = 300;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        canvas.width  = Math.round(img.width  * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        setColors(extractPalette(canvas, count));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }

  function onFile(e) { processImage(e.target.files?.[0]); }
  function onDrop(e) { e.preventDefault(); setDragging(false); processImage(e.dataTransfer.files?.[0]); }

  function getFormatted([r, g, b]) {
    if (format === 'hex') return rgbToHex(r, g, b);
    if (format === 'rgb') return `rgb(${r}, ${g}, ${b})`;
    return rgbToHsl(r, g, b);
  }

  function copy(idx) {
    navigator.clipboard.writeText(getFormatted(colors[idx])).catch(() => {});
    setCopied(idx);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className={s.wrap}>
      <ImageToolsTopNav active="image-color-palette" />
      <PlaygroundTopAd />
      <div className={s.header}>
        <div className={s.titleRow}>
          <img src="/icons/image-color-palette.svg" alt="" width={28} height={28} className={s.logoIcon} />
          <span className={s.title}>Image Color <span className={s.accent}>Palette</span></span>
        </div>
        <span className={s.privacy}>Runs fully in your browser — no upload</span>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className={s.body}>
        {/* Drop zone */}
        <div
          className={`${s.dropZone} ${dragging ? s.dropping : ''}`}
          onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          {imgSrc
            ? <img src={imgSrc} className={s.preview} alt="Uploaded" />
            : <div className={s.dropPrompt}>
                <span className={s.dropIcon}>+</span>
                <span>Drop image here or click to upload</span>
                <span className={s.dropSub}>JPG, PNG, WebP, GIF</span>
              </div>
          }
          <input ref={fileRef} type="file" accept="image/*" className={s.hidden} onChange={onFile} />
        </div>

        {/* Palette */}
        {colors.length > 0 && (
          <div className={s.palette}>
            <div className={s.controls}>
              <label className={s.countLabel}>
                <span>Colors: <strong>{count}</strong></span>
                <input type="range" min="4" max={MAX_COLORS} value={count}
                  onChange={e => setCount(Number(e.target.value))} />
              </label>
              <div className={s.fmtTabs}>
                {['hex','rgb','hsl'].map(f => (
                  <button key={f} className={`${s.fmtTab} ${format===f?s.fmtActive:''}`}
                    onClick={() => setFormat(f)}>{f.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <div className={s.swatches}>
              {colors.map((rgb, i) => {
                const [r, g, b] = rgb;
                const isDark = (r*0.299 + g*0.587 + b*0.114) < 128;
                return (
                  <div key={i} className={s.swatch} onClick={() => copy(i)}>
                    <div className={s.swatchColor} style={{ background: rgbToHex(r, g, b) }}>
                      <span className={s.swatchCopy} style={{ color: isDark ? '#fff' : '#000' }}>
                        {copiedIdx === i ? '✓' : 'Copy'}
                      </span>
                    </div>
                    <div className={s.swatchVal}>{getFormatted(rgb)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
