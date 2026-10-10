'use client';

import { forkToMyCode } from '@/lib/fork-to-mycode';
import s from './styles.module.css';

// "Fork to My Code" button shared by the CSS generators. `getSnippet` is called on click and
// returns { name, html, css, js?, cdnUrls? } for the current settings.
export default function ForkToMyCodeButton({ getSnippet, className = '', label = 'Fork to My Code' }) {
  return (
    <button
      type="button"
      className={`${s.btn} ${className}`}
      onClick={() => forkToMyCode(getSnippet())}
      title="Open the result in My Code as an editable HTML + CSS snippet"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="5" r="2.5" /><circle cx="18" cy="5" r="2.5" /><circle cx="12" cy="19" r="2.5" />
        <path d="M6 7.5v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" /><line x1="12" y1="11.5" x2="12" y2="16.5" />
      </svg>
      {label}
    </button>
  );
}
