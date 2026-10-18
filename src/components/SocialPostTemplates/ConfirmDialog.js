'use client';

/* Small confirm modal (instead of the browser's confirm()): Escape or a click outside
   cancels, Enter confirms. `danger` styles the confirm button red. */

import { useEffect, useRef } from 'react';
import b from './bulk.module.css';

export default function ConfirmDialog({ title, message, okLabel = 'OK', cancelLabel = 'Cancel', danger = false, onOk, onCancel }) {
  const okRef = useRef(null);
  useEffect(() => {
    okRef.current?.focus();
    const onKey = e => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);
  return (
    <div className={b.overlay} onMouseDown={e => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className={`${b.dialog} ${b.confirm}`} role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-msg">
        <h2 id="confirm-title" className={b.confirmTitle}>{title}</h2>
        <p id="confirm-msg" className={b.lead}>{message}</p>
        <div className={b.confirmActions}>
          <button type="button" className={b.btn} onClick={onCancel}>{cancelLabel}</button>
          <button ref={okRef} type="button" className={danger ? b.danger : b.primary} onClick={onOk}>{okLabel}</button>
        </div>
      </div>
    </div>
  );
}
