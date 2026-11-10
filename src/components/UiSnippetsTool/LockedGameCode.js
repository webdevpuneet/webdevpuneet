'use client';

// Replaces the "Source Code" block on a game's snippet page (src/app/ui-snippets/[slug]/page.js) while the games are
// Patreon-only (LOCK_GAME_CODE in src/lib/patreon-settings.js). The page sends no code to the browser for a game, so
// nothing about it is in the static HTML. A supporter is pointed to the editor above, which shows the code once unlocked.

import { useEffect, useState } from 'react';
import SourceCodeTabs from './SourceCodeTabs';
import SnippetExportButton from './SnippetExportButton';
import { loadSnippet } from './loadSnippet';
import { usePremiumUnlocked, PremiumUnlockDialog } from '@/components/PremiumGate';

const esc = t => String(t || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const asPre = t => `<pre class="shiki" style="background:#0d1117;color:#e6edf3"><code>${esc(t)}</code></pre>`;

// A supporter gets the code in the page like on other snippets: fetched in the browser only after unlocking
function useUnlockedSnippet(id) {
  const unlocked = usePremiumUnlocked();
  const [sn, setSn] = useState(null);
  useEffect(() => {
    if (!unlocked || !id) return;
    let alive = true;
    loadSnippet(id).then(x => { if (alive) setSn(x); });
    return () => { alive = false; };
  }, [unlocked, id]);
  return { unlocked, sn: unlocked ? sn : null };
}

// The Export menu next to the "Source Code" title: appears for supporters once the game's code has loaded
export function GameExportButton({ id }) {
  const { sn } = useUnlockedSnippet(id);
  if (!sn) return null;
  return <SnippetExportButton id={id} title={sn.title} html={sn.html} css={sn.css} js={sn.js || ''} cdnUrls={sn.cdnUrls || []} />;
}

export default function LockedGameCode({ id }) {
  const [open, setOpen] = useState(false);
  const { unlocked, sn } = useUnlockedSnippet(id);
  // Colour highlighting with the same shiki theme as the other snippets, loaded in the browser only for supporters.
  // Plain dark blocks show first, then swap to the highlighted ones.
  const [hl, setHl] = useState(null);
  useEffect(() => {
    if (!sn) return;
    let alive = true;
    import('@/lib/shiki-highlight')
      .then(m => Promise.all([m.highlightCode(sn.html, 'html', 'github-dark'), m.highlightCode(sn.css, 'css', 'github-dark'), sn.js ? m.highlightCode(sn.js, 'javascript', 'github-dark') : '']))
      .then(r => { if (alive) setHl(r); })
      .catch(() => {});
    return () => { alive = false; };
  }, [sn]);
  if (unlocked && sn) {
    return <SourceCodeTabs html={sn.html} css={sn.css} js={sn.js || ''} htmlHl={hl ? hl[0] : asPre(sn.html)} cssHl={hl ? hl[1] : asPre(sn.css)} jsHl={hl ? hl[2] : asPre(sn.js)} cdnUrls={sn.cdnUrls || []} />;
  }
  const box = { padding: '20px 22px', border: '1px solid rgba(99,102,241,.35)', borderRadius: 16, background: 'rgba(99,102,241,.06)' };
  const h = { margin: '0 0 8px', fontSize: 22, fontWeight: 800, lineHeight: 1.25 };
  const p = { margin: '0 0 14px', lineHeight: 1.6 };
  const chip = { display: 'inline-block', padding: '5px 12px', borderRadius: 999, font: '600 13px system-ui' };
  return (
    <div style={box}>
      {unlocked ? (
        <>
          <h3 style={h}>Source code unlocked</h3>
          <p style={{ ...p, margin: 0 }}>Thanks for supporting the site: the HTML, CSS and JS of this game are in the code panels of the editor at the top of the page, with Copy, Export and Fork.</p>
        </>
      ) : (
        <>
          <h3 style={h}>Want the source code?</h3>
          <p style={p}>Play the game for free. Become a WebDevPuneet supporter to unlock the complete HTML, CSS and JavaScript source code, the exports (HTML, React, Vue, Angular, Tailwind) and Fork.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ ...chip, background: 'rgba(34,160,90,.15)', color: '#1f7a45' }}>Play free</span>
            <span style={{ ...chip, background: 'rgba(99,102,241,.16)', color: '#5b3fb0' }}>Source code: Patreon</span>
            <button type="button" onClick={() => setOpen(true)} style={{ border: 0, borderRadius: 10, background: '#6366f1', color: '#fff', font: '700 13px system-ui', padding: '9px 16px', cursor: 'pointer', marginLeft: 'auto' }}>Unlock with passcode</button>
          </div>
          <PremiumUnlockDialog open={open} onClose={() => setOpen(false)} />
        </>
      )}
    </div>
  );
}
