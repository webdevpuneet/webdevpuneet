'use client';

/* Brand kit shared by Social Post Templates and Email Templates: brand name, handle,
   website, logo, colours and fonts are set once (saved in this browser) and applied to
   any template. Each editor maps the kit onto its own fields via onApply. */

import { useCallback, useEffect, useRef, useState } from 'react';
import s from './styles.module.css';
import { parseHex } from '../OgImageGenerator/engine';
import FontPicker from '@/components/FontPicker';
import { fontLabel } from '@/lib/fonts';

export const BRAND_KEY = 'wdp-brand-kit-v1';
const EVENT = 'wdp-brand-kit-changed';

export const DEFAULT_KIT = {
  name: '',
  handle: '',
  website: '',
  logo: null,        // data URL (social posts embed it)
  logoDims: null,
  logoUrl: '',       // hosted https:// URL (emails need one)
  primary: '#6366f1',
  bg: '#ffffff',
  text: '#0f172a',
  headingFont: 'inter',
  bodyFont: 'inter',
  applyAllColors: false, // also apply background and text, not just the brand colour
  autoApply: false,      // apply to templates that haven't been edited yet
};

export function loadKit() {
  try {
    const saved = JSON.parse(localStorage.getItem(BRAND_KEY) || 'null');
    return saved ? { ...DEFAULT_KIT, ...saved } : null;
  } catch { return null; }
}
export function saveKit(kit) {
  try { localStorage.setItem(BRAND_KEY, JSON.stringify(kit)); }
  catch { try { localStorage.setItem(BRAND_KEY, JSON.stringify({ ...kit, logo: null, logoDims: null })); } catch { /* blocked */ } }
  window.dispatchEvent(new Event(EVENT));
}
export const kitIsSet = kit => !!kit && !!(kit.name || kit.handle || kit.logo || kit.logoUrl || kit.primary !== DEFAULT_KIT.primary);

/** The current kit, kept in sync across editors and tabs */
export function useBrandKit() {
  const [kit, setKitState] = useState(null);
  useEffect(() => {
    const sync = () => setKitState(loadKit());
    sync();
    const onStorage = e => { if (e.key === BRAND_KEY) sync(); };
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', onStorage);
    return () => { window.removeEventListener(EVENT, sync); window.removeEventListener('storage', onStorage); };
  }, []);
  const setKit = useCallback(next => { saveKit(next); setKitState(next); }, []);
  return [kit, setKit];
}

function readLogo(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      let w = img.naturalWidth || 400, h = img.naturalHeight || 400;
      const k = Math.min(1, 600 / Math.max(w, h));
      w = Math.round(w * k); h = Math.round(h * k);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve({ data: c.toDataURL('image/png'), dims: { w, h } });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image')); };
    img.src = url;
  });
}

function Color({ label, value, onChange }) {
  const rgb = parseHex(value);
  const six = rgb ? '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('') : '#000000';
  return (
    <label className={s.color}>
      <span className={s.swatch} style={{ background: six }}>
        <input type="color" value={six} onChange={e => onChange(e.target.value)} aria-label={`${label} colour`} />
      </span>
      <span className={s.colorText}><span>{label}</span><code>{six}</code></span>
    </label>
  );
}

/**
 * Brand kit section for an editor's left panel.
 * onApply(kit)        applies the kit to the current design
 * onSaveFrom()        returns kit values taken from the current design (colours, fonts, name, logo)
 * emailMode           shows the hosted-logo URL field and explains it
 */
export function BrandKitPanel({ onApply, onSaveFrom, emailMode = false, onToast }) {
  const [kit, setKit] = useBrandKit();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(DEFAULT_KIT);
  const fileRef = useRef(null);
  const set = (k, v) => setDraft(d => ({ ...d, [k]: v }));

  const startEdit = () => { setDraft({ ...DEFAULT_KIT, ...(kit || {}) }); setEditing(true); };
  const save = () => { setKit(draft); setEditing(false); onToast?.('Brand kit saved'); };
  const saveFromDesign = () => {
    const next = { ...DEFAULT_KIT, ...(kit || {}), ...onSaveFrom() };
    setKit(next);
    onToast?.('Saved this design’s brand to your kit');
  };
  const onLogo = async e => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    try { const { data, dims } = await readLogo(f); setDraft(d => ({ ...d, logo: data, logoDims: dims })); }
    catch (err) { onToast?.(err.message); }
  };

  return (
    <section className={s.kit}>
      <div className={s.head}>
        <h2 className={s.title}>Brand kit</h2>
        {kitIsSet(kit) && !editing && <button type="button" className={s.link} onClick={startEdit}>Edit</button>}
      </div>

      {!editing && !kitIsSet(kit) && (
        <div className={s.empty}>
          <p>Set your logo, colours, fonts and handle once, then apply them to any template in one click.</p>
          <div className={s.row}>
            <button type="button" className={s.primary} onClick={startEdit}>Set up brand kit</button>
            <button type="button" className={s.btn} onClick={saveFromDesign} title="Use this design's colours, fonts and logo">Use this design</button>
          </div>
        </div>
      )}

      {!editing && kitIsSet(kit) && (
        <>
          <div className={s.summary}>
            {kit.logo || kit.logoUrl
              ? <img className={s.logo} src={kit.logo || kit.logoUrl} alt="" />
              : <span className={s.logoEmpty} style={{ background: kit.primary }}>{(kit.name || 'B').slice(0, 1).toUpperCase()}</span>}
            <div className={s.meta}>
              <strong>{kit.name || 'Your brand'}</strong>
              <span>{[kit.handle, `${fontLabel(kit.headingFont)} / ${fontLabel(kit.bodyFont)}`].filter(Boolean).join(' · ')}</span>
            </div>
            <div className={s.swatches}>
              {[kit.primary, kit.bg, kit.text].map((c, i) => <span key={i} style={{ background: c }} />)}
            </div>
          </div>
          <div className={s.row}>
            <button type="button" className={s.primary} onClick={() => { onApply(kit); onToast?.('Brand kit applied'); }}>Apply to this design</button>
            <button type="button" className={s.btn} onClick={saveFromDesign} title="Replace the kit's colours and fonts with this design's">Save from design</button>
          </div>
          {kit.autoApply && <p className={s.hint}>Auto-apply is on: templates you haven&rsquo;t edited open in your brand.</p>}
        </>
      )}

      {editing && (
        <div className={s.form}>
          <div className={s.two}>
            <label className={s.field}><span>Brand name</span><input value={draft.name} onChange={e => set('name', e.target.value)} placeholder="Acme" /></label>
            <label className={s.field}><span>Handle</span><input value={draft.handle} onChange={e => set('handle', e.target.value)} placeholder="@acme" /></label>
          </div>
          <label className={s.field}><span>Website</span><input value={draft.website} onChange={e => set('website', e.target.value)} placeholder="https://acme.com" inputMode="url" /></label>
          <div className={s.field}>
            <span>Logo</span>
            <div className={s.row}>
              {draft.logo && <img className={s.logo} src={draft.logo} alt="" />}
              <button type="button" className={s.btn} onClick={() => fileRef.current?.click()}>{draft.logo ? 'Replace' : 'Upload logo'}</button>
              {draft.logo && <button type="button" className={s.btn} onClick={() => setDraft(d => ({ ...d, logo: null, logoDims: null }))}>Remove</button>}
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={onLogo} />
            </div>
          </div>
          <label className={s.field}>
            <span>Hosted logo URL {emailMode ? '' : '(for emails)'}</span>
            <input value={draft.logoUrl} onChange={e => set('logoUrl', e.target.value)} placeholder="https://acme.com/logo.png" inputMode="url" />
            <small>Emails can&rsquo;t embed uploads, so they use this hosted copy of your logo.</small>
          </label>
          <div className={s.colors}>
            <Color label="Brand" value={draft.primary} onChange={v => set('primary', v)} />
            <Color label="Background" value={draft.bg} onChange={v => set('bg', v)} />
            <Color label="Text" value={draft.text} onChange={v => set('text', v)} />
          </div>
          <div className={s.two}>
            {[['headingFont', 'Heading font'], ['bodyFont', 'Body font']].map(([k, l]) => (
              <label key={k} className={s.field}>
                <span>{l}</span>
                <FontPicker label={l} value={draft[k]} onChange={fid => set(k, fid)} allowCustom={!emailMode} />
              </label>
            ))}
          </div>
          <label className={s.check}><input type="checkbox" checked={draft.applyAllColors} onChange={e => set('applyAllColors', e.target.checked)} /> Also apply background and text colours (not just the brand colour)</label>
          <label className={s.check}><input type="checkbox" checked={draft.autoApply} onChange={e => set('autoApply', e.target.checked)} /> Apply automatically to templates I haven&rsquo;t edited</label>
          <div className={s.row}>
            <button type="button" className={s.primary} onClick={save}>Save kit</button>
            <button type="button" className={s.btn} onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </section>
  );
}
