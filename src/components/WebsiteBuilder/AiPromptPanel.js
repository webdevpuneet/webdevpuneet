'use client';

/* "AI prompt" button for a website template page: opens the template's AI prompt right under it, with Copy and
   Save to AI Prompts (the visitor's AI Prompt Studio library, IndexedDB; the module loads only on click). */
import { useEffect, useRef, useState } from 'react';
import st from '@/app/website-builder/templates/templates.module.css';

export default function AiPromptPanel({ prompt, title }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saveState, setSaveState] = useState(''); // '', 'saved', 'exists', 'error'
  const ref = useRef(null);
  // closes on a click outside it or Escape
  useEffect(() => {
    if (!open) return undefined;
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);
  if (!prompt) return null;
  const copy = () => { navigator.clipboard.writeText(prompt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }).catch(() => {}); };
  const save = async () => {
    try {
      const { saveFromPage } = await import('@/components/AiPromptStudioTool/storage');
      setSaveState(await saveFromPage(title, prompt));
    } catch { setSaveState('error'); }
    setTimeout(() => setSaveState(''), 2600);
  };
  const small = { padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border2)', background: 'var(--surface)', color: 'var(--text)', fontWeight: 700, fontSize: 13, cursor: 'pointer' };
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button type="button" className={`${st.btn} ${st.btnGhost} ${st.allBtn}`} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" /></svg>
        AI prompt
      </button>
      {open && (
        <div role="dialog" aria-label="AI prompt" style={{ position: 'absolute', left: 0, right: 0, top: 'calc(100% + 8px)', zIndex: 30, padding: 12, border: '1px solid var(--border2)', borderRadius: 12, background: 'var(--surface)', boxShadow: '0 16px 40px rgba(0,0,0,.22), 0 2px 8px rgba(0,0,0,.08)' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <button type="button" style={small} onClick={save} title="Keep this prompt in your AI Prompt Studio library">
              {saveState === 'saved' ? '✓ Saved' : saveState === 'exists' ? 'Already saved' : saveState === 'error' ? 'Storage blocked' : 'Save to AI Prompts'}
            </button>
            <button type="button" style={small} onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>
          </div>
          <pre style={{ margin: 0, maxHeight: 300, overflow: 'auto', whiteSpace: 'pre-wrap', fontSize: 12, lineHeight: 1.5, color: 'var(--text2)' }}>{prompt}</pre>
        </div>
      )}
    </div>
  );
}
