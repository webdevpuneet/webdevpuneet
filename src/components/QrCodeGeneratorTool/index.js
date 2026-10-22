'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import styles from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';

/* ─── QR Types ───────────────────────────────────────────────────────────── */
const QR_TYPES = [
  { id: 'url',   label: 'URL'   },
  { id: 'text',  label: 'Text'  },
  { id: 'wifi',  label: 'WiFi'  },
  { id: 'email', label: 'Email' },
  { id: 'sms',   label: 'SMS'   },
  { id: 'vcard', label: 'vCard' },
  { id: 'phone', label: 'Phone' },
];

/* ─── Style options ──────────────────────────────────────────────────────── */
const DOT_STYLES = [
  { id: 'square',          label: 'Square'   },
  { id: 'dots',            label: 'Dots'     },
  { id: 'rounded',         label: 'Rounded'  },
  { id: 'extra-rounded',   label: 'Soft'     },
  { id: 'classy',          label: 'Classy'   },
  { id: 'classy-rounded',  label: 'Classy+'  },
];

const CORNER_SQ_STYLES = [
  { id: 'square',        label: 'Square'  },
  { id: 'extra-rounded', label: 'Round'   },
  { id: 'dot',           label: 'Circle'  },
];

const CORNER_DOT_STYLES = [
  { id: 'square', label: 'Square' },
  { id: 'dot',    label: 'Dot'    },
];

const ERROR_LEVELS = [
  { id: 'L', desc: '7%'  },
  { id: 'M', desc: '15%' },
  { id: 'Q', desc: '25%' },
  { id: 'H', desc: '30%' },
];

const GRADIENT_TYPES = [
  { id: 'linear', label: 'Linear' },
  { id: 'radial', label: 'Radial' },
];

/* ─── Default field values per type ─────────────────────────────────────── */
const DEFAULT_FIELDS = {
  url:   { url: 'https://example.com' },
  text:  { text: 'Hello, World!' },
  wifi:  { ssid: '', password: '', encryption: 'WPA', hidden: false },
  email: { email: '', subject: '', body: '' },
  sms:   { phone: '', message: '' },
  vcard: { firstName: '', lastName: '', phone: '', email: '', org: '', title: '', website: '' },
  phone: { phone: '' },
};

/* ─── Build QR data string ───────────────────────────────────────────────── */
function buildQRData(type, fields) {
  switch (type) {
    case 'url':
      return fields.url || 'https://example.com';
    case 'text':
      return fields.text || 'Hello, World!';
    case 'wifi':
      return `WIFI:T:${fields.encryption || 'WPA'};S:${fields.ssid || ''};P:${fields.password || ''};H:${fields.hidden ? 'true' : 'false'};;`;
    case 'email': {
      const params = [];
      if (fields.subject) params.push(`subject=${encodeURIComponent(fields.subject)}`);
      if (fields.body)    params.push(`body=${encodeURIComponent(fields.body)}`);
      return `mailto:${fields.email || ''}${params.length ? '?' + params.join('&') : ''}`;
    }
    case 'sms':
      return `SMSTO:${fields.phone || ''}:${fields.message || ''}`;
    case 'vcard':
      return `BEGIN:VCARD\nVERSION:3.0\nFN:${fields.firstName || ''} ${fields.lastName || ''}\nN:${fields.lastName || ''};${fields.firstName || ''};;;\nTEL:${fields.phone || ''}\nEMAIL:${fields.email || ''}\nURL:${fields.website || ''}\nORG:${fields.org || ''}\nTITLE:${fields.title || ''}\nEND:VCARD`;
    case 'phone':
      return `tel:${fields.phone || ''}`;
    default:
      return 'https://example.com';
  }
}

/* ─── Build qr-code-styling options ─────────────────────────────────────── */
function buildQROpts({
  qrData, dotStyle, cornerSqStyle, cornerDotStyle,
  fgColor, bgColor, useGradient, fgColor2, gradientType,
  errorLevel, margin, logoDataUrl, logoSize, downloadSize,
}) {
  const dotsOptions = {
    color: fgColor,
    type: dotStyle,
    ...(useGradient ? {
      gradient: {
        type: gradientType,
        rotation: gradientType === 'linear' ? 45 : 0,
        colorStops: [
          { offset: 0, color: fgColor },
          { offset: 1, color: fgColor2 },
        ],
      },
    } : {}),
  };

  return {
    data: qrData || 'https://example.com',
    margin,
    qrOptions: { errorCorrectionLevel: errorLevel },
    dotsOptions,
    cornersSquareOptions: { type: cornerSqStyle, color: fgColor },
    cornersDotOptions:    { type: cornerDotStyle, color: fgColor },
    backgroundOptions:    { color: bgColor },
    image:        logoDataUrl || '',
    imageOptions: { imageSize: logoSize, margin: 5, crossOrigin: 'anonymous', hideBackgroundDots: true },
  };
}

const PREVIEW_SIZE = 300;

const STORAGE_KEY = 'wdp-qr-generator-v1';

const DEFAULTS = {
  qrType:         'url',
  fields:         DEFAULT_FIELDS.url,
  fgColor:        '#000000',
  bgColor:        '#ffffff',
  useGradient:    false,
  fgColor2:       '#6366f1',
  gradientType:   'linear',
  dotStyle:       'square',
  cornerSqStyle:  'square',
  cornerDotStyle: 'square',
  errorLevel:     'H',
  margin:         10,
  downloadSize:   1024,
  logoSize:       0.3,
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function QrCodeGeneratorTool() {
  const qrContainerRef  = useRef(null);
  const qrInstanceRef   = useRef(null);
  const QRClassRef      = useRef(null);
  const hydrated        = useRef(false);
  const saveTimer       = useRef(null);

  const [qrType,         setQrType]         = useState(DEFAULTS.qrType);
  const [fields,         setFields]         = useState(DEFAULTS.fields);
  const [fgColor,        setFgColor]        = useState(DEFAULTS.fgColor);
  const [bgColor,        setBgColor]        = useState(DEFAULTS.bgColor);
  const [useGradient,    setUseGradient]    = useState(DEFAULTS.useGradient);
  const [fgColor2,       setFgColor2]       = useState(DEFAULTS.fgColor2);
  const [gradientType,   setGradientType]   = useState(DEFAULTS.gradientType);
  const [dotStyle,       setDotStyle]       = useState(DEFAULTS.dotStyle);
  const [cornerSqStyle,  setCornerSqStyle]  = useState(DEFAULTS.cornerSqStyle);
  const [cornerDotStyle, setCornerDotStyle] = useState(DEFAULTS.cornerDotStyle);
  const [errorLevel,     setErrorLevel]     = useState(DEFAULTS.errorLevel);
  const [margin,         setMargin]         = useState(DEFAULTS.margin);
  const [downloadSize,   setDownloadSize]   = useState(DEFAULTS.downloadSize);
  const [logoDataUrl,    setLogoDataUrl]    = useState(null);
  const [logoSize,       setLogoSize]       = useState(DEFAULTS.logoSize);
  const [downloading,    setDownloading]    = useState('');
  const [saveState,      setSaveState]      = useState('idle');

  const qrData = useMemo(() => buildQRData(qrType, fields), [qrType, fields]);

  const currentOpts = useCallback(() => buildQROpts({
    qrData, dotStyle, cornerSqStyle, cornerDotStyle,
    fgColor, bgColor, useGradient, fgColor2, gradientType,
    errorLevel, margin, logoDataUrl, logoSize, downloadSize,
  }), [qrData, dotStyle, cornerSqStyle, cornerDotStyle, fgColor, bgColor, useGradient, fgColor2, gradientType, errorLevel, margin, logoDataUrl, logoSize, downloadSize]);

  /* ── Restore from localStorage ──────────────────────────────────────── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.qrType)         setQrType(saved.qrType);
        if (saved.fields)         setFields(saved.fields);
        if (saved.fgColor)        setFgColor(saved.fgColor);
        if (saved.bgColor)        setBgColor(saved.bgColor);
        if (saved.useGradient     != null) setUseGradient(saved.useGradient);
        if (saved.fgColor2)       setFgColor2(saved.fgColor2);
        if (saved.gradientType)   setGradientType(saved.gradientType);
        if (saved.dotStyle)       setDotStyle(saved.dotStyle);
        if (saved.cornerSqStyle)  setCornerSqStyle(saved.cornerSqStyle);
        if (saved.cornerDotStyle) setCornerDotStyle(saved.cornerDotStyle);
        if (saved.errorLevel)     setErrorLevel(saved.errorLevel);
        if (saved.margin          != null) setMargin(saved.margin);
        if (saved.downloadSize)   setDownloadSize(saved.downloadSize);
        if (saved.logoSize)       setLogoSize(saved.logoSize);
      }
    } catch {}
    hydrated.current = true;
  }, []);

  /* ── Debounced save ──────────────────────────────────────────────────── */
  useEffect(() => {
    if (!hydrated.current) return;
    clearTimeout(saveTimer.current);
    setSaveState('saving');
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          qrType, fields, fgColor, bgColor, useGradient, fgColor2,
          gradientType, dotStyle, cornerSqStyle, cornerDotStyle,
          errorLevel, margin, downloadSize, logoSize,
        }));
        setSaveState('saved');
        setTimeout(() => setSaveState('idle'), 1500);
      } catch {}
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [qrType, fields, fgColor, bgColor, useGradient, fgColor2, gradientType, dotStyle, cornerSqStyle, cornerDotStyle, errorLevel, margin, downloadSize, logoSize]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Reset ───────────────────────────────────────────────────────────── */
  const handleReset = useCallback(() => {
    setQrType(DEFAULTS.qrType);
    setFields(DEFAULTS.fields);
    setFgColor(DEFAULTS.fgColor);
    setBgColor(DEFAULTS.bgColor);
    setUseGradient(DEFAULTS.useGradient);
    setFgColor2(DEFAULTS.fgColor2);
    setGradientType(DEFAULTS.gradientType);
    setDotStyle(DEFAULTS.dotStyle);
    setCornerSqStyle(DEFAULTS.cornerSqStyle);
    setCornerDotStyle(DEFAULTS.cornerDotStyle);
    setErrorLevel(DEFAULTS.errorLevel);
    setMargin(DEFAULTS.margin);
    setDownloadSize(DEFAULTS.downloadSize);
    setLogoSize(DEFAULTS.logoSize);
    setLogoDataUrl(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setSaveState('idle');
  }, []);

  /* ── Init qr-code-styling ────────────────────────────────────────────── */
  useEffect(() => {
    let cancelled = false;
    import('qr-code-styling').then(mod => {
      if (cancelled || !qrContainerRef.current) return;
      const QRCodeStyling = mod.default ?? mod;
      QRClassRef.current = QRCodeStyling;
      const instance = new QRCodeStyling({ width: PREVIEW_SIZE, height: PREVIEW_SIZE, ...currentOpts() });
      instance.append(qrContainerRef.current);
      qrInstanceRef.current = instance;
    });
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Update on option changes ────────────────────────────────────────── */
  useEffect(() => {
    if (!qrInstanceRef.current) return;
    qrInstanceRef.current.update({ width: PREVIEW_SIZE, height: PREVIEW_SIZE, ...currentOpts() });
  }, [currentOpts]);

  /* ── QR type change ──────────────────────────────────────────────────── */
  const handleTypeChange = useCallback((type) => {
    setQrType(type);
    setFields(DEFAULT_FIELDS[type]);
  }, []);

  const setField = useCallback((key, value) => {
    setFields(prev => ({ ...prev, [key]: value }));
  }, []);

  /* ── Logo upload ─────────────────────────────────────────────────────── */
  const handleLogoUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoDataUrl(ev.target.result);
    reader.readAsDataURL(file);
  }, []);

  /* ── Download ────────────────────────────────────────────────────────── */
  const download = useCallback(async (ext) => {
    if (!QRClassRef.current) return;
    setDownloading(ext);
    try {
      const instance = new QRClassRef.current({
        width: downloadSize,
        height: downloadSize,
        ...currentOpts(),
      });
      await instance.download({ name: 'qr-code', extension: ext });
    } finally {
      setDownloading('');
    }
  }, [downloadSize, currentOpts]);

  /* ── Form rendering ──────────────────────────────────────────────────── */
  const renderForm = () => {
    switch (qrType) {
      case 'url':
        return (
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>URL</label>
            <input className={styles.fieldInput} type="url" value={fields.url || ''} placeholder="https://example.com"
              onChange={e => setField('url', e.target.value)} />
          </div>
        );
      case 'text':
        return (
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>Text</label>
            <textarea className={styles.fieldTextarea} value={fields.text || ''} placeholder="Enter any text…"
              onChange={e => setField('text', e.target.value)} rows={4} />
          </div>
        );
      case 'wifi':
        return (
          <>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Network Name (SSID)</label>
              <input className={styles.fieldInput} value={fields.ssid || ''} placeholder="My WiFi Network"
                onChange={e => setField('ssid', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Password</label>
              <input className={styles.fieldInput} type="password" value={fields.password || ''} placeholder="••••••••"
                onChange={e => setField('password', e.target.value)} />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Encryption</label>
                <select className={styles.fieldSelect} value={fields.encryption || 'WPA'} onChange={e => setField('encryption', e.target.value)}>
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
              <label className={styles.toggleLabel}>
                <input type="checkbox" checked={fields.hidden || false} onChange={e => setField('hidden', e.target.checked)} />
                <span>Hidden</span>
              </label>
            </div>
          </>
        );
      case 'email':
        return (
          <>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>To</label>
              <input className={styles.fieldInput} type="email" value={fields.email || ''} placeholder="recipient@example.com"
                onChange={e => setField('email', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Subject</label>
              <input className={styles.fieldInput} value={fields.subject || ''} placeholder="Subject line"
                onChange={e => setField('subject', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Body</label>
              <textarea className={styles.fieldTextarea} value={fields.body || ''} placeholder="Email body…"
                onChange={e => setField('body', e.target.value)} rows={3} />
            </div>
          </>
        );
      case 'sms':
        return (
          <>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Phone Number</label>
              <input className={styles.fieldInput} type="tel" value={fields.phone || ''} placeholder="+1 555 000 0000"
                onChange={e => setField('phone', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Message</label>
              <textarea className={styles.fieldTextarea} value={fields.message || ''} placeholder="Your message…"
                onChange={e => setField('message', e.target.value)} rows={3} />
            </div>
          </>
        );
      case 'vcard':
        return (
          <>
            <div className={styles.formRow}>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>First Name</label>
                <input className={styles.fieldInput} value={fields.firstName || ''} placeholder="John"
                  onChange={e => setField('firstName', e.target.value)} />
              </div>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Last Name</label>
                <input className={styles.fieldInput} value={fields.lastName || ''} placeholder="Doe"
                  onChange={e => setField('lastName', e.target.value)} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Phone</label>
              <input className={styles.fieldInput} type="tel" value={fields.phone || ''} placeholder="+1 555 000 0000"
                onChange={e => setField('phone', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Email</label>
              <input className={styles.fieldInput} type="email" value={fields.email || ''} placeholder="john@example.com"
                onChange={e => setField('email', e.target.value)} />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Organization</label>
                <input className={styles.fieldInput} value={fields.org || ''} placeholder="Company"
                  onChange={e => setField('org', e.target.value)} />
              </div>
              <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.fieldLabel}>Title</label>
                <input className={styles.fieldInput} value={fields.title || ''} placeholder="Role"
                  onChange={e => setField('title', e.target.value)} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Website</label>
              <input className={styles.fieldInput} type="url" value={fields.website || ''} placeholder="https://"
                onChange={e => setField('website', e.target.value)} />
            </div>
          </>
        );
      case 'phone':
        return (
          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>Phone Number</label>
            <input className={styles.fieldInput} type="tel" value={fields.phone || ''} placeholder="+1 555 000 0000"
              onChange={e => setField('phone', e.target.value)} />
          </div>
        );
      default: return null;
    }
  };

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <div className={styles.wrap}>
      <ImageToolsTopNav active="qr-code-generator" />

      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="#818cf8"/>
              <rect x="10" y="1" width="5" height="5" rx="1" fill="#818cf8"/>
              <rect x="1" y="10" width="5" height="5" rx="1" fill="#818cf8"/>
              <rect x="7" y="7" width="2" height="2" fill="#818cf8" opacity="0.6"/>
              <rect x="10" y="10" width="2" height="2" fill="#818cf8" opacity="0.5"/>
              <rect x="13" y="10" width="2" height="2" fill="#818cf8" opacity="0.5"/>
              <rect x="10" y="13" width="2" height="2" fill="#818cf8" opacity="0.5"/>
              <rect x="13" y="13" width="2" height="2" fill="#818cf8" opacity="0.5"/>
            </svg>
          </div>
          QR Code Generator
        </div>

        {/* QR type tabs */}
        <div className={styles.typeTabs}>
          {QR_TYPES.map(t => (
            <button key={t.id}
              className={`${styles.typeTab} ${qrType === t.id ? styles.typeTabActive : ''}`}
              onClick={() => handleTypeChange(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className={styles.headerActions}>
          <span className={`${styles.saveIndicator} ${saveState === 'saving' ? styles.saveIndicatorSaving : saveState === 'saved' ? styles.saveIndicatorSaved : ''}`}>
            <span className={styles.saveDot} />
            {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved' : 'Auto-saved'}
          </span>
          <button className={styles.resetBtn} onClick={handleReset}>Reset</button>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className={styles.body}>

        {/* ── Left pane ─────────────────────────────────────────────── */}
        <aside className={styles.leftPane}>

          {/* Content form */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Content</div>
            {renderForm()}
          </div>

          {/* Dot style */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Dot Style</div>
            <div className={styles.styleGrid}>
              {DOT_STYLES.map(s => (
                <button key={s.id}
                  className={`${styles.styleBtn} ${dotStyle === s.id ? styles.styleBtnActive : ''}`}
                  onClick={() => setDotStyle(s.id)}
                >{s.label}</button>
              ))}
            </div>
          </div>

          {/* Eye style */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Eye Style</div>
            <div className={styles.eyeRow}>
              <div className={styles.eyeGroup}>
                <span className={styles.eyeLabel}>Outer</span>
                <div className={styles.styleGrid}>
                  {CORNER_SQ_STYLES.map(s => (
                    <button key={s.id}
                      className={`${styles.styleBtn} ${cornerSqStyle === s.id ? styles.styleBtnActive : ''}`}
                      onClick={() => setCornerSqStyle(s.id)}
                    >{s.label}</button>
                  ))}
                </div>
              </div>
              <div className={styles.eyeGroup}>
                <span className={styles.eyeLabel}>Inner</span>
                <div className={styles.styleGrid}>
                  {CORNER_DOT_STYLES.map(s => (
                    <button key={s.id}
                      className={`${styles.styleBtn} ${cornerDotStyle === s.id ? styles.styleBtnActive : ''}`}
                      onClick={() => setCornerDotStyle(s.id)}
                    >{s.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Colors</div>
            <div className={styles.colorRow}>
              <div className={styles.colorGroup}>
                <span className={styles.colorLabel}>Foreground</span>
                <input type="color" className={styles.colorInput} value={fgColor} onChange={e => setFgColor(e.target.value)} />
              </div>
              <div className={styles.colorGroup}>
                <span className={styles.colorLabel}>Background</span>
                <input type="color" className={styles.colorInput} value={bgColor} onChange={e => setBgColor(e.target.value)} />
              </div>
            </div>
            {/* Gradient toggle */}
            <label className={styles.gradientToggle}>
              <input type="checkbox" checked={useGradient} onChange={e => setUseGradient(e.target.checked)} />
              <span>Gradient on dots</span>
            </label>
            {useGradient && (
              <div className={styles.gradientControls}>
                <div className={styles.colorRow}>
                  <div className={styles.colorGroup}>
                    <span className={styles.colorLabel}>Color 1</span>
                    <input type="color" className={styles.colorInput} value={fgColor} onChange={e => setFgColor(e.target.value)} />
                  </div>
                  <div className={styles.colorGroup}>
                    <span className={styles.colorLabel}>Color 2</span>
                    <input type="color" className={styles.colorInput} value={fgColor2} onChange={e => setFgColor2(e.target.value)} />
                  </div>
                </div>
                <div className={styles.styleGrid}>
                  {GRADIENT_TYPES.map(g => (
                    <button key={g.id}
                      className={`${styles.styleBtn} ${gradientType === g.id ? styles.styleBtnActive : ''}`}
                      onClick={() => setGradientType(g.id)}
                    >{g.label}</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Settings</div>

            {/* Error correction */}
            <div className={styles.settingRow}>
              <span className={styles.settingLabel}>Error correction</span>
              <div className={styles.ecBtns}>
                {ERROR_LEVELS.map(l => (
                  <button key={l.id}
                    className={`${styles.ecBtn} ${errorLevel === l.id ? styles.ecBtnActive : ''}`}
                    onClick={() => setErrorLevel(l.id)}
                    title={`Recover up to ${l.desc} damage`}
                  >
                    {l.id}
                    <span className={styles.ecDesc}>{l.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Margin */}
            <div className={styles.sliderRow}>
              <span className={styles.sliderLabel}>Margin</span>
              <input type="range" min={0} max={32} step={2} value={margin}
                className={styles.slider} onChange={e => setMargin(Number(e.target.value))} />
              <span className={styles.sliderVal}>{margin}px</span>
            </div>

            {/* Download size */}
            <div className={styles.sliderRow}>
              <span className={styles.sliderLabel}>Export size</span>
              <input type="range" min={256} max={2048} step={256} value={downloadSize}
                className={styles.slider} onChange={e => setDownloadSize(Number(e.target.value))} />
              <span className={styles.sliderVal}>{downloadSize}px</span>
            </div>
          </div>

          {/* Logo */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Logo (optional)</div>
            <div className={styles.logoRow}>
              <label className={styles.logoUploadBtn}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                {logoDataUrl ? 'Change logo' : 'Upload logo'}
                <input type="file" accept="image/*" className={styles.logoFileInput} onChange={handleLogoUpload} />
              </label>
              {logoDataUrl && (
                <button className={styles.logoRemoveBtn} onClick={() => setLogoDataUrl(null)}>Remove</button>
              )}
            </div>
            {logoDataUrl && (
              <div className={styles.sliderRow}>
                <span className={styles.sliderLabel}>Logo size</span>
                <input type="range" min={0.1} max={0.4} step={0.05} value={logoSize}
                  className={styles.slider} onChange={e => setLogoSize(Number(e.target.value))} />
                <span className={styles.sliderVal}>{Math.round(logoSize * 100)}%</span>
              </div>
            )}
          </div>

        </aside>

        {/* ── Right pane ──────────────────────────────────────────────── */}
        <div className={styles.rightPane}>

          {/* QR preview */}
          <div className={styles.previewWrap}>
            <div className={styles.previewCanvas} ref={qrContainerRef} />
          </div>

          {/* Download controls */}
          <div className={styles.downloadBar}>
            <button
              className={`${styles.dlBtn} ${styles.dlBtnPrimary} ${downloading === 'png' ? styles.dlBtnLoading : ''}`}
              onClick={() => download('png')}
              disabled={!!downloading}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {downloading === 'png' ? 'Saving…' : 'Download PNG'}
            </button>
            <button
              className={`${styles.dlBtn} ${downloading === 'svg' ? styles.dlBtnLoading : ''}`}
              onClick={() => download('svg')}
              disabled={!!downloading}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {downloading === 'svg' ? 'Saving…' : 'Download SVG'}
            </button>
            <span className={styles.dlHint}>{downloadSize}×{downloadSize}px export</span>
          </div>

          {/* QR data preview */}
          <div className={styles.dataPreview}>
            <span className={styles.dataLabel}>QR data</span>
            <span className={styles.dataValue}>{qrData.length > 80 ? qrData.slice(0, 80) + '…' : qrData}</span>
          </div>

        </div>
      </div>
    </div>
  );
}
