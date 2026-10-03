'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import styles from './styles.module.css';

const RATIOS = [
  { label: '16:9',   w: 16, h: 9,   desc: 'Widescreen / YouTube / TV' },
  { label: '9:16',   w: 9,  h: 16,  desc: 'Vertical / Reels / TikTok' },
  { label: '1:1',    w: 1,  h: 1,   desc: 'Square / Instagram / Twitter' },
  { label: '4:3',    w: 4,  h: 3,   desc: 'Classic / Presentation' },
  { label: '3:2',    w: 3,  h: 2,   desc: 'DSLR Photo / Print' },
  { label: '4:5',    w: 4,  h: 5,   desc: 'Instagram Portrait' },
  { label: '2:3',    w: 2,  h: 3,   desc: 'Portrait / Pinterest' },
  { label: '21:9',   w: 21, h: 9,   desc: 'Ultrawide / Cinema' },
  { label: '1.91:1', w: 1.91, h: 1, desc: 'OG Image / Facebook Link' },
];

const CROP_PRESETS = [
  { label: 'YouTube', w: 16, h: 9, size: '1280 x 720' },
  { label: 'Instagram Post', w: 4, h: 5, size: '1080 x 1350' },
  { label: 'Story / Reel', w: 9, h: 16, size: '1080 x 1920' },
  { label: 'Square', w: 1, h: 1, size: '1080 x 1080' },
  { label: 'OG Image', w: 1.91, h: 1, size: '1200 x 630' },
  { label: 'Pinterest', w: 2, h: 3, size: '1000 x 1500' },
];

const PLATFORMS = [
  { name: 'YouTube Thumbnail',    w: 1280, h: 720,  icon: '▶' },
  { name: 'Instagram Square',     w: 1080, h: 1080, icon: '◻' },
  { name: 'Instagram Portrait',   w: 1080, h: 1350, icon: '▯' },
  { name: 'Instagram Story',      w: 1080, h: 1920, icon: '▮' },
  { name: 'TikTok Video',         w: 1080, h: 1920, icon: '♪' },
  { name: 'Twitter / X Post',     w: 1200, h: 675,  icon: '𝕏' },
  { name: 'Twitter / X Header',   w: 1500, h: 500,  icon: '𝕏' },
  { name: 'LinkedIn Post',        w: 1200, h: 627,  icon: 'in' },
  { name: 'LinkedIn Cover',       w: 1584, h: 396,  icon: 'in' },
  { name: 'Facebook Post',        w: 1200, h: 630,  icon: 'f' },
  { name: 'Facebook Cover',       w: 820,  h: 312,  icon: 'f' },
  { name: 'Pinterest Pin',        w: 1000, h: 1500, icon: '𝐏' },
  { name: 'OG Image (SEO)',       w: 1200, h: 630,  icon: '◈' },
  { name: 'YouTube Channel Art',  w: 2560, h: 1440, icon: '▶' },
];

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

function simplifyRatio(w, h) {
  if (!w || !h) return { rw: w, rh: h };
  const wInt = Math.round(w * 1000);
  const hInt = Math.round(h * 1000);
  const d = gcd(wInt, hInt);
  return { rw: wInt / d, rh: hInt / d };
}

function fmt(n) {
  if (!n && n !== 0) return '';
  return Number.isInteger(n) ? String(n) : parseFloat(n.toFixed(2)).toString();
}

function closestRatio(decimal) {
  if (!decimal) return null;
  return RATIOS
    .map(r => ({
      ...r,
      decimal: r.w / r.h,
      diff: Math.abs(decimal - r.w / r.h),
    }))
    .sort((a, b) => a.diff - b.diff)[0];
}

const COMMON_SIZES = [320, 480, 640, 720, 768, 1024, 1080, 1280, 1366, 1440, 1920, 2560, 3840];

export default function AspectRatioCalculatorTool() {
  const [width, setWidth]   = useState('1920');
  const [height, setHeight] = useState('1080');
  const [scaleW, setScaleW] = useState('');
  const [scaleH, setScaleH] = useState('');
  const [activePreset, setActivePreset] = useState('16:9');
  const [tab, setTab] = useState('calculator'); // 'calculator' | 'platforms'
  const [copied, setCopied] = useState('');
  const [image, setImage] = useState(null);

  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const ratio = h ? w / h : 0;
  const { rw, rh } = simplifyRatio(w, h);
  const closest = useMemo(() => closestRatio(ratio), [ratio]);
  const exactPreset = closest && closest.diff < 0.01;

  useEffect(() => () => {
    if (image?.url) URL.revokeObjectURL(image.url);
  }, [image]);

  const applyRatio = useCallback((rw, rh, label) => {
    setActivePreset(label);
    const newH = fmt(Math.round(parseFloat(width) * rh / rw));
    setHeight(newH || '');
    setScaleW(''); setScaleH('');
  }, [width]);

  const applyPlatform = useCallback((pw, ph) => {
    setWidth(String(pw));
    setHeight(String(ph));
    setScaleW(''); setScaleH('');
    const { rw, rh } = simplifyRatio(pw, ph);
    const match = RATIOS.find(r => Math.abs(r.w / r.h - pw / ph) < 0.01);
    setActivePreset(match ? match.label : `${rw}:${rh}`);
  }, []);

  const onWidthChange = (val) => {
    setWidth(val);
    setActivePreset('');
    setScaleW('');
    setScaleH('');
  };

  const onHeightChange = (val) => {
    setHeight(val);
    setActivePreset('');
    setScaleW('');
    setScaleH('');
  };

  const onScaleWChange = (val) => {
    setScaleW(val);
    if (val && ratio) setScaleH(fmt(parseFloat(val) / ratio));
    else setScaleH('');
  };

  const onScaleHChange = (val) => {
    setScaleH(val);
    if (val && ratio) setScaleW(fmt(parseFloat(val) * ratio));
    else setScaleW('');
  };

  const onImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (image?.url) URL.revokeObjectURL(image.url);
      setImage({
        url,
        name: file.name,
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      setWidth(String(img.naturalWidth));
      setHeight(String(img.naturalHeight));
      setScaleW('');
      setScaleH('');
      const match = closestRatio(img.naturalWidth / img.naturalHeight);
      setActivePreset(match && match.diff < 0.01 ? match.label : '');
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
    event.target.value = '';
  };

  const clearImage = () => {
    if (image?.url) URL.revokeObjectURL(image.url);
    setImage(null);
  };

  const copy = (text, key) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 1500);
    });
  };

  const commonSizes = COMMON_SIZES.map(size => ({
    w: size, h: ratio ? Math.round(size / ratio) : '—'
  }));

  const ratioLabel = rw && rh ? `${rw}:${rh}` : '—';
  const decimalRatio = ratio ? parseFloat(ratio.toFixed(4)) : '—';

  return (
    <div className={styles.wrap}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M9 21V9"/>
            </svg>
          </div>
          Aspect Ratio <span className={styles.accent}>Calculator</span>
        </div>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === 'calculator' ? styles.tabActive : ''}`} onClick={() => setTab('calculator')}>Calculator</button>
          <button className={`${styles.tab} ${tab === 'platforms' ? styles.tabActive : ''}`} onClick={() => setTab('platforms')}>Social Sizes</button>
        </div>
      </div>

      {tab === 'calculator' ? (
        <div className={styles.body}>
          {/* Left: inputs */}
          <div className={styles.leftPanel}>

            {/* Ratio presets */}
            <div className={styles.section}>
              <div className={styles.sectionLabel}>Common Ratios</div>
              <div className={styles.presets}>
                {RATIOS.map(r => (
                  <button
                    key={r.label}
                    className={`${styles.preset} ${activePreset === r.label ? styles.presetActive : ''}`}
                    onClick={() => applyRatio(r.w, r.h, r.label)}
                    title={r.desc}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* W × H inputs */}
            <div className={styles.section}>
              <div className={styles.sectionLabel}>Dimensions</div>
              <div className={styles.dimRow}>
                <div className={styles.dimField}>
                  <label className={styles.dimLabel}>Width</label>
                  <input
                    className={styles.dimInput}
                    type="number"
                    value={width}
                    min="1"
                    onChange={e => onWidthChange(e.target.value)}
                  />
                  <span className={styles.dimUnit}>px</span>
                </div>
                <div className={styles.dimX}>×</div>
                <div className={styles.dimField}>
                  <label className={styles.dimLabel}>Height</label>
                  <input
                    className={styles.dimInput}
                    type="number"
                    value={height}
                    min="1"
                    onChange={e => onHeightChange(e.target.value)}
                  />
                  <span className={styles.dimUnit}>px</span>
                </div>
              </div>
            </div>

            {/* Scale */}
            <div className={styles.section}>
              <div className={styles.sectionLabel}>Scale to new size</div>
              <div className={styles.dimRow}>
                <div className={styles.dimField}>
                  <label className={styles.dimLabel}>New Width</label>
                  <input
                    className={styles.dimInput}
                    type="number"
                    value={scaleW}
                    min="1"
                    placeholder="—"
                    onChange={e => onScaleWChange(e.target.value)}
                  />
                  <span className={styles.dimUnit}>px</span>
                </div>
                <div className={styles.dimX}>→</div>
                <div className={styles.dimField}>
                  <label className={styles.dimLabel}>New Height</label>
                  <input
                    className={styles.dimInput}
                    type="number"
                    value={scaleH}
                    min="1"
                    placeholder="—"
                    onChange={e => onScaleHChange(e.target.value)}
                  />
                  <span className={styles.dimUnit}>px</span>
                </div>
              </div>
            </div>

            {/* Image upload */}
            <div className={styles.section}>
              <div className={styles.sectionLabel}>Image Ratio Detection</div>
              <label className={styles.uploadBox}>
                <input className={styles.fileInput} type="file" accept="image/*" onChange={onImageChange} />
                <span className={styles.uploadIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </span>
                <span>
                  <strong>{image ? 'Replace image' : 'Upload image'}</strong>
                  <small>{image ? image.name : 'Detect size and preview crops'}</small>
                </span>
              </label>
              {image && (
                <button className={styles.clearBtn} type="button" onClick={clearImage}>Remove image</button>
              )}
            </div>
          </div>

          {/* Right: results */}
          <div className={styles.rightPanel}>

            {/* Ratio result hero */}
            <div className={styles.ratioHero}>
              <div className={styles.ratioVisual}>
                {ratio > 0 && (
                  <div
                    className={styles.ratioBox}
                    style={{
                      width:  ratio >= 1 ? '100%' : `${ratio * 100}%`,
                      height: ratio >= 1 ? `${(1 / ratio) * 100}%` : '100%',
                    }}
                  />
                )}
              </div>
              <div className={styles.ratioInfo}>
                <div className={styles.ratioMain}>
                  <span className={styles.ratioValue}>{ratioLabel}</span>
                  <button className={styles.copyBtn} onClick={() => copy(ratioLabel, 'ratio')}>
                    {copied === 'ratio' ? '✓' : 'Copy'}
                  </button>
                </div>
                <div className={styles.ratioSub}>Decimal: <strong>{decimalRatio}</strong></div>
                <div className={styles.ratioSub}>Orientation: <strong>{w >= h ? 'Landscape' : 'Portrait'}{w === h ? ' (Square)' : ''}</strong></div>
                {closest && (
                  <div className={styles.closestResult}>
                    {exactPreset ? 'Matched ratio' : 'Closest standard'}: <strong>{closest.label}</strong>
                    <span>{closest.desc}</span>
                  </div>
                )}
                {image && (
                  <div className={styles.imageResult}>
                    Image: <strong>{image.width} x {image.height}px</strong>
                  </div>
                )}
                {scaleW && scaleH && (
                  <div className={styles.scaledResult}>
                    Scaled: <strong>{fmt(scaleW)} × {fmt(scaleH)} px</strong>
                    <button className={styles.copyBtn} onClick={() => copy(`${fmt(scaleW)}x${fmt(scaleH)}`, 'scaled')}>
                      {copied === 'scaled' ? '✓' : 'Copy'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {image && (
              <div className={styles.cropSection}>
                <div className={styles.cropHeader}>
                  <div>
                    <div className={styles.sectionLabel}>Crop Preview</div>
                    <p>See how this image will fill common social media ratios.</p>
                  </div>
                </div>
                <div className={styles.cropGrid}>
                  {CROP_PRESETS.map(preset => (
                    <button
                      key={preset.label}
                      className={styles.cropCard}
                      type="button"
                      onClick={() => applyRatio(preset.w, preset.h, `${preset.w}:${preset.h}`)}
                    >
                      <span className={styles.cropFrame} style={{ aspectRatio: `${preset.w} / ${preset.h}` }}>
                        <img src={image.url} alt="" />
                      </span>
                      <span className={styles.cropMeta}>
                        <strong>{preset.label}</strong>
                        <small>{preset.w}:{preset.h} · {preset.size}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Common sizes table */}
            <div className={styles.sizesSection}>
              <div className={styles.sectionLabel}>Common widths at this ratio</div>
              <div className={styles.sizesGrid}>
                {commonSizes.map(s => (
                  <button
                    key={s.w}
                    className={styles.sizeChip}
                    onClick={() => { setWidth(String(s.w)); setHeight(String(s.h)); setScaleW(''); setScaleH(''); }}
                  >
                    <span className={styles.sizeW}>{s.w}</span>
                    <span className={styles.sizeSep}>×</span>
                    <span className={styles.sizeH}>{s.h}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Platforms tab */
        <div className={styles.platformsBody}>
          <div className={styles.platformsGrid}>
            {PLATFORMS.map(p => {
              const { rw, rh } = simplifyRatio(p.w, p.h);
              return (
                <button
                  key={p.name}
                  className={styles.platformCard}
                  onClick={() => { applyPlatform(p.w, p.h); setTab('calculator'); }}
                >
                  <div className={styles.platformIcon}>{p.icon}</div>
                  <div className={styles.platformInfo}>
                    <div className={styles.platformName}>{p.name}</div>
                    <div className={styles.platformDims}>{p.w} × {p.h} px</div>
                    <div className={styles.platformRatio}>{rw}:{rh}</div>
                  </div>
                  <div className={styles.platformArrow}>→</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
