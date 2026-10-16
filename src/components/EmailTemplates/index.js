'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from '../SocialPostTemplates/styles.module.css';
import e from './styles.module.css';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import { EMAIL_TEMPLATES, emailTemplateById, emailCategoryById, defaultEmailState, FONT_STACKS } from './templates/index.js';
import { previewImages, forceDark } from './templates/meta.js';
import { PALETTES, parseHex, onColor } from '../OgImageGenerator/engine';
import { dbPut } from '@/lib/uiSnippetsDb';

const LS_PREFIX = 'wdp-email-v1:';
const GMAIL_CLIP = 102 * 1024; // Gmail clips messages larger than ~102 KB
const fmtKB = n => `${(n / 1024).toFixed(1)} KB`;

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* Email preview in an iframe; grows to the email's height */
function EmailFrame({ html, width, scale = 1, interactive = true }) {
  const ref = useRef(null);
  const [h, setH] = useState(900);
  useEffect(() => {
    const frame = ref.current;
    if (!frame) return undefined;
    let ro;
    // Every srcDoc change loads a new document, so re-measure and re-observe on each load
    const measure = () => {
      const doc = frame.contentDocument;
      if (!doc?.documentElement) return;
      const fit = () => setH(Math.max(400, doc.documentElement.scrollHeight));
      fit();
      ro?.disconnect();
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(fit);
        ro.observe(doc.documentElement);
      }
    };
    frame.addEventListener('load', measure);
    return () => { frame.removeEventListener('load', measure); ro?.disconnect(); };
  }, []);
  return (
    <div style={{ width: width * scale, height: h * scale, overflow: 'hidden', flex: 'none' }}>
      <iframe
        ref={ref}
        title="Email preview"
        srcDoc={html}
        style={{ width, height: h, border: 0, display: 'block', transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: 'top left', pointerEvents: interactive ? 'auto' : 'none', background: 'transparent' }}
      />
    </div>
  );
}

/* ── Gallery ─────────────────────────────────────────────────────────────────── */
function GalleryCard({ t }) {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  const [origin, setOrigin] = useState('');
  useEffect(() => {
    setOrigin(window.location.origin);
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const html = useMemo(() => previewImages(t.build(defaultEmailState(t)), origin), [t, origin]);
  return (
    <a className={s.card} href={`/email-templates/${t.id}/`}>
      <div ref={ref} className={e.cardPreview}>
        {w > 0 && origin && <EmailFrame html={html} width={640} scale={w / 640} interactive={false} />}
      </div>
      <div className={s.cardBody}>
        <span className={s.cardCat}>{emailCategoryById(t.category)?.label}</span>
        <h3 className={s.cardTitle}>{t.name}</h3>
        <span className={s.cardMeta}>v{t.version} · Responsive · Dark mode</span>
      </div>
    </a>
  );
}

export function EmailTemplateGallery({ excludeId = null }) {
  const list = EMAIL_TEMPLATES.filter(t => t.id !== excludeId);
  return (
    <div className={s.gallery} data-spt-gallery>
      <div className={s.grid}>
        {list.map(t => <GalleryCard key={t.id} t={t} />)}
        <div className={e.soon}>
          <strong>More templates coming</strong>
          <span>Password reset, order confirmation, newsletter, receipts and more are on the way.</span>
        </div>
      </div>
    </div>
  );
}

export function EmailGalleryPage() {
  return (
    <div className={s.galleryPage}>
      <PlaygroundTopAd />
      <header className={s.galleryHead}>
        <h1 className={s.galleryH1}>Email Templates</h1>
        <p className={s.galleryLead}>
          Free responsive HTML email templates that work in Gmail, Outlook and Apple Mail, with dark mode built in.
          Edit them in your browser, preview desktop, mobile and dark mode, then copy the HTML or fork it into My Code.
        </p>
      </header>
      <EmailTemplateGallery />
    </div>
  );
}

/* Read-only live preview of a template's default design (About section on its page) */
export function EmailShot({ id }) {
  const t = emailTemplateById(id);
  const ref = useRef(null);
  const [w, setW] = useState(0);
  const [origin, setOrigin] = useState('');
  useEffect(() => {
    setOrigin(window.location.origin);
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setW(Math.min(640, el.clientWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const html = useMemo(() => previewImages(t.build(defaultEmailState(t)), origin), [t, origin]);
  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {w > 0 && origin && <EmailFrame html={html} width={640} scale={w / 640} interactive={false} />}
    </div>
  );
}

/* ── Editor ──────────────────────────────────────────────────────────────────── */
function ColorField({ label, value, onChange }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => { setDraft(value); }, [value]);
  const rgb = parseHex(value);
  const six = rgb ? '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('') : '#000000';
  return (
    <div className={s.colorField}>
      <label className={s.label}>{label}</label>
      <div className={s.colorInput}>
        <span className={s.colorSwatch} style={{ background: six }} />
        <input type="color" className={s.colorPicker} value={six} onChange={ev => onChange(ev.target.value)} aria-label={`${label} colour picker`} />
        <input
          className={s.hexInput}
          value={draft}
          maxLength={7}
          spellCheck={false}
          aria-label={`${label} hex value`}
          onChange={ev => { const v = ev.target.value.trim(); setDraft(v); if (parseHex(v)) onChange(v.startsWith('#') ? v : `#${v}`); }}
          onBlur={() => setDraft(value)}
        />
      </div>
    </div>
  );
}

export function EmailTemplateEditor({ id }) {
  const t = emailTemplateById(id);
  const [state, setState] = useState(() => defaultEmailState(t));
  const [hydrated, setHydrated] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [dark, setDark] = useState(false);
  const [view, setView] = useState('preview');
  const [toast, setToast] = useState('');
  const [busy, setBusy] = useState('');
  const [origin, setOrigin] = useState('');
  const [open, setOpen] = useState(() => new Set(['inbox', 'main']));
  const flash = useCallback(msg => { setToast(msg); setTimeout(() => setToast(''), 2600); }, []);

  useEffect(() => { setOrigin(window.location.origin); }, []);

  /* Restore / autosave */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_PREFIX + t.id) || 'null');
      if (saved) {
        const d = defaultEmailState(t);
        const pick = (src, def) => ({ ...def, ...Object.fromEntries(Object.entries(src || {}).filter(([k]) => k in def)) });
        setState({ fields: pick(saved.fields, d.fields), toggles: pick(saved.toggles, d.toggles), vars: pick(saved.vars, d.vars), fonts: pick(saved.fonts, d.fonts) });
      }
    } catch { /* storage blocked */ }
    hist.current.skip = true;
    setHydrated(true);
  }, [t]);
  useEffect(() => {
    if (!hydrated) return undefined;
    const tm = setTimeout(() => { try { localStorage.setItem(LS_PREFIX + t.id, JSON.stringify(state)); } catch { /* full */ } }, 500);
    return () => clearTimeout(tm);
  }, [state, hydrated, t.id]);

  /* Undo / redo */
  const hist = useRef({ past: [], future: [], committed: null, skip: false, timer: null });
  const [, setHistTick] = useState(0);
  const stateRef = useRef(state);
  stateRef.current = state;
  useEffect(() => {
    const h = hist.current;
    if (!hydrated || h.skip || h.committed === null) { h.skip = false; h.committed = state; return undefined; }
    clearTimeout(h.timer);
    h.timer = setTimeout(() => {
      if (h.committed === state) return;
      h.past.push(h.committed);
      if (h.past.length > 80) h.past.shift();
      h.future = [];
      h.committed = state;
      setHistTick(n => n + 1);
    }, 450);
    return () => clearTimeout(h.timer);
  }, [state, hydrated]);
  const undo = useCallback(() => {
    const h = hist.current;
    clearTimeout(h.timer);
    const cur = stateRef.current;
    if (h.committed !== cur) { h.past.push(h.committed); h.future = []; h.committed = cur; }
    if (!h.past.length) return;
    h.future.push(h.committed);
    const prev = h.past.pop();
    h.committed = prev;
    h.skip = true;
    setState(prev);
    setHistTick(n => n + 1);
  }, []);
  const redo = useCallback(() => {
    const h = hist.current;
    if (!h.future.length) return;
    h.past.push(h.committed);
    const next = h.future.pop();
    h.committed = next;
    h.skip = true;
    setState(next);
    setHistTick(n => n + 1);
  }, []);
  useEffect(() => {
    const onKey = ev => {
      if (!(ev.ctrlKey || ev.metaKey)) return;
      const el = ev.target;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(el?.tagName) || el?.isContentEditable) return;
      const k = ev.key.toLowerCase();
      if (k === 'z' && !ev.shiftKey) { ev.preventDefault(); undo(); }
      else if ((k === 'z' && ev.shiftKey) || k === 'y') { ev.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo]);
  const canUndo = hist.current.past.length > 0 || (hist.current.committed !== null && hist.current.committed !== state);
  const canRedo = hist.current.future.length > 0;

  /* Output */
  const html = useMemo(() => t.build(state), [t, state]);
  const text = useMemo(() => t.text(state), [t, state]);
  const bytes = useMemo(() => new Blob([html]).size, [html]);
  const previewHtml = useMemo(() => previewImages(dark ? forceDark(html) : html, origin), [html, dark, origin]);

  const setField = (key, val) => setState(p => ({ ...p, fields: { ...p.fields, [key]: val } }));
  const setToggle = (key, val) => setState(p => ({ ...p, toggles: { ...p.toggles, [key]: val } }));
  const setVar = (key, val) => setState(p => ({ ...p, vars: { ...p.vars, [key]: val } }));
  // Palettes set the brand colour and a readable button text colour for it
  const applyPalette = p => setState(prev => ({ ...prev, vars: { ...prev.vars, brand: p.accentColor, btnText: onColor(p.accentColor) } }));
  const toggleGroup = gid => setOpen(prev => { const n = new Set(prev); if (n.has(gid)) n.delete(gid); else n.add(gid); return n; });

  /* Pre-send checks */
  const f = state.fields;
  const checks = [];
  if (bytes > GMAIL_CLIP) checks.push({ level: 'bad', text: `The email is ${fmtKB(bytes)}. Gmail clips messages over 102 KB and hides the rest, including your unsubscribe link.` });
  else if (bytes > 80 * 1024) checks.push({ level: 'warn', text: `The email is ${fmtKB(bytes)}, close to Gmail’s 102 KB clipping limit.` });
  ['logoUrl', 'heroUrl'].forEach(k => {
    const v = String(f[k] || '').trim();
    if (!v || (k === 'heroUrl' && !state.toggles.showHero)) return;
    if (!/^https:\/\//i.test(v)) checks.push({ level: 'bad', text: `${t.fields.find(x => x.key === k)?.label.replace(/ \(optional\)/i, '')} must be a full https:// URL. Email clients can’t load local or relative images.` });
  });
  if (state.toggles.showHero && f.heroUrl && !String(f.heroAlt || '').trim()) checks.push({ level: 'warn', text: 'Add alt text to the hero image. Many people read email with images off.' });
  if (!String(f.unsubscribeUrl || '').trim()) checks.push({ level: 'bad', text: 'Add an unsubscribe link. US CAN-SPAM and Gmail/Yahoo sender rules require one in marketing email.' });
  if (!String(f.address || '').trim()) checks.push({ level: 'bad', text: 'Add your postal address. US CAN-SPAM requires a valid physical address in commercial email.' });
  const placeholders = t.fields.filter(x => x.type === 'url' && /yoursite\.com|yourbrand/i.test(String(f[x.key] || ''))).map(x => x.label.replace(/ \(optional\)/i, '').replace(/ URL$/, ''));
  if (placeholders.length) checks.push({ level: 'warn', text: `Replace the placeholder links: ${placeholders.join(', ')}.` });
  if ((f.subject || '').length > 60) checks.push({ level: 'warn', text: `The subject is ${f.subject.length} characters. Phones show about 35 to 60, so lead with the important words.` });
  const ph = (f.preheader || '').length;
  if (ph && (ph < 35 || ph > 140)) checks.push({ level: 'warn', text: `The preheader is ${ph} characters. 40 to 130 fills the inbox preview without being cut off.` });

  /* Actions */
  const copy = async (str, what) => {
    try { await navigator.clipboard.writeText(str); flash(`${what} copied`); }
    catch { flash('Copy blocked by the browser, so use the download button instead'); }
  };
  const forkToMyCode = async () => {
    setBusy('fork');
    try {
      // The whole email document goes into the HTML panel as-is (head styles, Outlook
      // conditional comments and all), so the fork is exactly what you would send.
      // CSS and JS stay empty, and My Code opens with those panels collapsed.
      const now = new Date().toISOString();
      const rid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `em-${Date.now().toString(36)}`;
      await dbPut({ id: rid, name: `${t.name} (email)`, tags: ['email'], cdnUrls: [], html, css: '', js: '', createdAt: now, updatedAt: now });
      flash('Forked to My Code. Opening it…');
      window.location.href = `/ui-snippets/mycode/?id=${rid}`;
    } catch (err) { flash(`Couldn't save to My Code: ${err.message}`); setBusy(''); }
  };

  const cat = emailCategoryById(t.category);
  const frameW = device === 'mobile' ? 390 : 680;
  const avatar = (f.fromName || f.brandName || 'A').trim()[0]?.toUpperCase() || 'A';

  return (
    <div className={s.wrap}>
      <div className={s.body}>
        <aside className={s.controls}>
          <div className={s.panelHead}>
            <a href="/email-templates/" className={s.back}>← All email templates</a>
            <div className={s.titleRow}>
              <h1 className={s.title}>{t.name}</h1>
              <span className={s.version}>v{t.version}</span>
            </div>
            <div className={s.headActions}>
              <button type="button" className={s.primaryBtn} onClick={() => copy(html, 'Email HTML')}>Copy HTML</button>
              <button type="button" className={s.btn} onClick={forkToMyCode} disabled={!!busy} title="Save an editable copy of the code in My Code">
                {busy === 'fork' ? 'Forking…' : 'Fork to My Code'}
              </button>
            </div>
            <div className={s.miniRow}>
              <button type="button" className={s.miniBtn} onClick={() => saveBlob(new Blob([html], { type: 'text/html' }), `${t.id}-email.html`)}>Download .html</button>
              <button type="button" className={s.miniBtn} onClick={() => copy(text, 'Plain-text version')}>Copy plain text</button>
              <button type="button" className={s.miniBtn} onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">↶ Undo</button>
              <button type="button" className={s.miniBtn} onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)">↷ Redo</button>
              <button type="button" className={s.miniBtn} onClick={() => setState(defaultEmailState(t))} title="Back to the original (undo brings your edits back)">Reset</button>
            </div>
          </div>

          {t.groups.map(g => {
            const fields = t.fields.filter(x => x.group === g.id);
            const isOpen = open.has(g.id);
            const enabled = !g.toggle || state.toggles[g.toggle];
            return (
              <section key={g.id} className={s.section}>
                <div className={e.groupHead}>
                  <button type="button" className={e.groupBtn} onClick={() => toggleGroup(g.id)} aria-expanded={isOpen}>
                    <span className={`${e.chev} ${isOpen ? e.chevOpen : ''}`}>›</span>
                    <h2 className={s.sectionTitle}>{g.label}</h2>
                  </button>
                  {g.toggle && (
                    <label className={e.switch} title={enabled ? 'Shown in the email' : 'Hidden from the email'}>
                      <input type="checkbox" checked={!!state.toggles[g.toggle]} onChange={ev => setToggle(g.toggle, ev.target.checked)} />
                      <span />
                    </label>
                  )}
                </div>
                {isOpen && (
                  <div className={`${e.groupBody} ${enabled ? '' : e.groupOff}`}>
                    {fields.map(fd => (
                      <div key={fd.key} className={s.field}>
                        <label className={s.label} htmlFor={`em-${fd.key}`}>{fd.label}</label>
                        {fd.type === 'textarea'
                          ? <textarea id={`em-${fd.key}`} className={s.textarea} rows={3} value={f[fd.key] ?? ''} onChange={ev => setField(fd.key, ev.target.value)} />
                          : <input id={`em-${fd.key}`} className={s.input} type={fd.type === 'number' ? 'number' : 'text'} inputMode={fd.type === 'url' ? 'url' : undefined} value={f[fd.key] ?? ''} onChange={ev => setField(fd.key, ev.target.value)} spellCheck={fd.type !== 'url'} />}
                        {fd.hint && <span className={s.hint}>{fd.hint}</span>}
                        {fd.key === 'subject' && <span className={s.hint}>{(f.subject || '').length} characters (aim for under 60)</span>}
                        {fd.key === 'preheader' && <span className={s.hint}>{(f.preheader || '').length} characters (aim for 40 to 130)</span>}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Colours</h2>
            <div className={s.palettes}>
              {PALETTES.map(p => (
                <button key={p.name} type="button" className={s.palette} title={`${p.name} accent`} aria-label={`${p.name} accent`} onClick={() => applyPalette(p)}>
                  <span style={{ background: p.accentColor }} /><span style={{ background: p.bg1 }} />
                </button>
              ))}
            </div>
            <p className={s.hint}>Light mode</p>
            <div className={s.colorGrid}>
              {t.vars.filter(v => v.group === 'light').map(v => <ColorField key={v.key} label={v.label} value={state.vars[v.key]} onChange={val => setVar(v.key, val)} />)}
            </div>
            <p className={s.hint}>Dark mode (Apple Mail, iOS Mail, Outlook.com)</p>
            <div className={s.colorGrid}>
              {t.vars.filter(v => v.group === 'dark').map(v => <ColorField key={v.key} label={v.label} value={state.vars[v.key]} onChange={val => setVar(v.key, val)} />)}
            </div>
          </section>

          <section className={s.section}>
            <h2 className={s.sectionTitle}>Fonts</h2>
            <div className={s.twoCol}>
              {['heading', 'body'].map(k => (
                <div key={k} className={s.field}>
                  <label className={s.label} htmlFor={`emf-${k}`}>{k === 'heading' ? 'Headings' : 'Body text'}</label>
                  <select id={`emf-${k}`} className={s.select} value={state.fonts[k]} onChange={ev => setState(p => ({ ...p, fonts: { ...p.fonts, [k]: ev.target.value } }))}>
                    {FONT_STACKS.map(fs => <option key={fs.id} value={fs.id}>{fs.label}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <p className={s.hint}>Web fonts show in Apple Mail and iOS Mail. Gmail and Outlook use the fallback after the arrow.</p>
          </section>
        </aside>

        <div className={s.main}>
          <PlaygroundTopAd />
          <div className={s.toolbar}>
            <div className={e.toolbarLeft}>
              <div className={s.seg} role="radiogroup" aria-label="View">
                {[['preview', 'Preview'], ['html', 'HTML'], ['text', 'Plain text']].map(([v, l]) => (
                  <button key={v} type="button" role="radio" aria-checked={view === v} className={`${s.segBtn} ${view === v ? s.segBtnActive : ''}`} onClick={() => setView(v)}>{l}</button>
                ))}
              </div>
              {view === 'preview' && (
                <>
                  <div className={s.seg} role="radiogroup" aria-label="Device">
                    {[['desktop', 'Desktop'], ['mobile', 'Mobile']].map(([v, l]) => (
                      <button key={v} type="button" role="radio" aria-checked={device === v} className={`${s.segBtn} ${device === v ? s.segBtnActive : ''}`} onClick={() => setDevice(v)}>{l}</button>
                    ))}
                  </div>
                  <label className={s.check}><input type="checkbox" checked={dark} onChange={ev => setDark(ev.target.checked)} /> Dark mode</label>
                </>
              )}
            </div>
            <div className={s.meta}>
              <a className={s.metaCat} href="/email-templates/">{cat?.label}</a>
              <span className={bytes > GMAIL_CLIP ? e.over : ''}>{fmtKB(bytes)} / 102 KB</span>
            </div>
          </div>

          <div className={e.stage}>
            {view === 'preview' && (
              <>
                <div className={e.inbox} style={{ width: frameW }} aria-label="Inbox preview">
                  <span className={e.avatar}>{avatar}</span>
                  <div className={e.inboxText}>
                    <div className={e.inboxTop}><strong>{f.fromName || f.brandName}</strong><span>9:41 AM</span></div>
                    <div className={e.inboxSubject}>{f.subject || '(no subject)'}</div>
                    <div className={e.inboxPre}>{f.preheader}</div>
                  </div>
                </div>
                <div className={`${e.device} ${device === 'mobile' ? e.deviceMobile : ''}`} style={{ width: frameW }}>
                  {origin && <EmailFrame key={`${device}-${dark}`} html={previewHtml} width={frameW} />}
                </div>
              </>
            )}
            {view !== 'preview' && (
              <div className={e.codeWrap}>
                <button type="button" className={e.codeCopy} onClick={() => copy(view === 'html' ? html : text, view === 'html' ? 'Email HTML' : 'Plain-text version')}>Copy</button>
                <pre className={e.code}><code>{view === 'html' ? html : text}</code></pre>
              </div>
            )}
          </div>

          <ul className={e.checks}>
            {checks.length === 0
              ? <li className={e.good}>✓ Ready to send: under Gmail&rsquo;s clipping limit, images hosted, alt text, unsubscribe link and address all set.</li>
              : checks.map(c => <li key={c.text} className={c.level === 'bad' ? e.bad : e.warn}>{c.text}</li>)}
          </ul>
        </div>
      </div>
      {toast && <div className={s.toast} role="status">{toast}</div>}
    </div>
  );
}
