'use client';
import { useState, useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import styles from './styles.module.css';

/* ── Shared localStorage keys (used by every tool) ──────────────────────── */
export const FWD_LS_TOKEN   = 'fwd_gist_token';
export const FWD_LS_ENC_KEY = 'fwd_gist_enc_key';

const DEBOUNCE_MS         = 5000;
const RESUME_THRESHOLD_MS = 60 * 1000;

/* ── AES-GCM helpers ─────────────────────────────────────────────────────── */
async function deriveKey(passphrase, salt) {
  const km = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 200000, hash: 'SHA-256' },
    km,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}
// Spreading every byte into String.fromCharCode(...) at once blows the call
// stack once a buffer is big enough (a large tool's encrypted payload can
// easily exceed the ~65k argument limit most engines enforce) — chunking
// keeps each call small regardless of how big the buffer gets.
function u8b64(b) {
  const bytes = new Uint8Array(b);
  const CHUNK = 8192;
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}
const b64u8 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));

async function encryptPayload(plaintext, passphrase) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv   = crypto.getRandomValues(new Uint8Array(12));
  const key  = await deriveKey(passphrase, salt);
  const ct   = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plaintext));
  return { encrypted: true, salt: u8b64(salt), iv: u8b64(iv), ciphertext: u8b64(ct) };
}

async function decryptPayload(obj, passphrase) {
  const key   = await deriveKey(passphrase, b64u8(obj.salt));
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64u8(obj.iv) }, key, b64u8(obj.ciphertext));
  return JSON.parse(new TextDecoder().decode(plain));
}

/* ── GitHub Gist API ─────────────────────────────────────────────────────── */
async function apiPush({ token, gistId, fileName, description, data, encPassphrase, savedAt }) {
  const headers     = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const payload     = { ...data, savedAt: savedAt || new Date().toISOString() };
  const plaintext   = JSON.stringify(payload, null, 2);
  const fileContent = encPassphrase
    ? JSON.stringify(await encryptPayload(plaintext, encPassphrase), null, 2)
    : plaintext;
  const body = JSON.stringify({
    description: description || 'webdevpuneet.com backup',
    public: false,
    files: { [fileName]: { content: fileContent } },
  });
  if (gistId) {
    const r = await fetch(`https://api.github.com/gists/${gistId}`, { method: 'PATCH', headers, body });
    if (!r.ok) throw new Error(`GitHub ${r.status}`);
    return gistId;
  }
  const r = await fetch('https://api.github.com/gists', { method: 'POST', headers, body });
  if (!r.ok) throw new Error(`GitHub ${r.status}`);
  return (await r.json()).id;
}

async function apiFetch({ token, gistId, fileName, encPassphrase }) {
  const r = await fetch(`https://api.github.com/gists/${gistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`GitHub ${r.status}`);
  const data = await r.json();
  const raw  = data.files?.[fileName]?.content;
  if (!raw) return null;
  const parsed = JSON.parse(raw);
  if (parsed.encrypted) {
    if (!encPassphrase) throw new Error('Gist is encrypted — enter your passphrase in sync settings');
    return await decryptPayload(parsed, encPassphrase);
  }
  return parsed;
}

async function apiFindExisting(token, fileName) {
  for (let page = 1; page <= 5; page++) {
    const r = await fetch(`https://api.github.com/gists?per_page=100&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) break;
    const list = await r.json();
    if (!list.length) break;
    const found = list.find(g => g.files?.[fileName]);
    if (found) return found.id;
    if (list.length < 100) break;
  }
  return '';
}

/* ── Component ───────────────────────────────────────────────────────────── */
/**
 * Drop-in GitHub Gist sync button for any FWD tool.
 *
 * Props:
 *   toolKey      — short prefix for per-tool localStorage keys, e.g. "tt"
 *   fileName     — Gist file name, e.g. "fwd-time-tracker.json"
 *   description  — Gist description shown on GitHub
 *   getLocalData — async () => plain object to push
 *   onPullData   — async (data) => restore pulled data into the tool
 *
 * Ref methods:
 *   forcePush(immediate = false) — debounced push; call after every save
 */
const GistSyncButton = forwardRef(function GistSyncButton(
  { toolKey, fileName, description, getLocalData, onPullData },
  ref,
) {
  const lsIdKey  = `${toolKey}_gist_id`;
  const lsModKey = `${toolKey}_last_modified`;

  const [token,       setToken]       = useState('');
  const [gistId,      setGistId]      = useState('');
  const [encKey,      setEncKey]      = useState('');
  const [tokenInput,  setTokenInput]  = useState('');
  const [gistIdInput, setGistIdInput] = useState('');
  const [encKeyInput, setEncKeyInput] = useState('');
  const [showEncKey,  setShowEncKey]  = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [syncing,     setSyncing]     = useState(false);
  const [pushing,     setPushing]     = useState(false);
  const [syncMsg,     setSyncMsg]     = useState('');
  const [lastSynced,  setLastSynced]  = useState(null);

  const popRef      = useRef(null);
  const debounceRef = useRef(null);
  const hiddenSince = useRef(null);
  const syncingRef  = useRef(false); // avoid re-entrant syncs

  /* ── Load credentials on mount + silent sync ── */
  useEffect(() => {
    try {
      const t = localStorage.getItem(FWD_LS_TOKEN) || '';
      const g = localStorage.getItem(lsIdKey) || '';
      const e = localStorage.getItem(FWD_LS_ENC_KEY) || '';
      if (t) { setToken(t); setTokenInput(t); }
      if (g) { setGistId(g); setGistIdInput(g); }
      if (e) { setEncKey(e); setEncKeyInput(e); }
      if (t && g) doSyncNow(t, g, e || undefined, true);
    } catch {}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Close popover on outside click ── */
  useEffect(() => {
    if (!showPopover) return;
    const h = e => { if (popRef.current && !popRef.current.contains(e.target)) setShowPopover(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [showPopover]);

  /* ── Resume sync after standby / long tab absence ── */
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) { hiddenSince.current = Date.now(); return; }
      const hiddenMs = hiddenSince.current ? Date.now() - hiddenSince.current : Infinity;
      hiddenSince.current = null;
      if (hiddenMs >= RESUME_THRESHOLD_MS) {
        try {
          const t = localStorage.getItem(FWD_LS_TOKEN) || '';
          const g = localStorage.getItem(lsIdKey) || '';
          const e = localStorage.getItem(FWD_LS_ENC_KEY) || '';
          if (t && g) doSyncNow(t, g, e || undefined, true);
        } catch {}
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Core sync: compare timestamps, pull or push ── */
  async function doSyncNow(t, g, e, silent = false) {
    if (syncingRef.current || !t) return;
    syncingRef.current = true;
    setSyncing(true);
    if (!silent) setSyncMsg('Syncing…');

    try {
      let resolvedId = g?.trim() || '';
      if (!resolvedId) {
        if (!silent) setSyncMsg('Looking for existing Gist…');
        resolvedId = await apiFindExisting(t, fileName);
      }

      if (!resolvedId) {
        if (!silent) setSyncMsg('Creating private Gist…');
        const now = new Date().toISOString();
        const localData = await getLocalData();
        const newId = await apiPush({ token: t, gistId: '', fileName, description, data: localData, encPassphrase: e, savedAt: now });
        persist(t, newId, now);
        setSyncMsg(silent ? '' : `✓ Gist created${e ? ' 🔒' : ''}`);
        if (!silent) setTimeout(() => setSyncMsg(''), 4000);
        return;
      }

      if (!silent) setSyncMsg('Checking Gist…');
      const remote = await apiFetch({ token: t, gistId: resolvedId, fileName, encPassphrase: e });

      if (remote === null) {
        // File missing from gist or gist was deleted — push to existing ID first, create only if truly gone
        if (!silent) setSyncMsg('Pushing to Gist…');
        const now = new Date().toISOString();
        const localData = await getLocalData();
        let newId;
        try {
          newId = await apiPush({ token: t, gistId: resolvedId, fileName, description, data: localData, encPassphrase: e, savedAt: now });
        } catch {
          if (!silent) setSyncMsg('Gist not found — creating new…');
          newId = await apiPush({ token: t, gistId: '', fileName, description, data: localData, encPassphrase: e, savedAt: now });
        }
        persist(t, newId, now);
        setSyncMsg(silent ? '' : `✓ Synced${e ? ' 🔒' : ''}`);
        if (!silent) setTimeout(() => setSyncMsg(''), 4000);
        return;
      }

      const localMod  = localStorage.getItem(lsModKey) || '';
      const remoteMod = remote.savedAt || '';

      if (localMod && remoteMod && localMod === remoteMod) {
        persist(t, resolvedId, localMod);
        setSyncMsg(silent ? '' : '✓ Already in sync');
        if (!silent) setTimeout(() => setSyncMsg(''), 4000);
        return;
      }

      const remoteNewer = remoteMod > localMod;
      if (remoteNewer) {
        if (!silent) setSyncMsg('Pulling from Gist…');
        await onPullData(remote);
        try { localStorage.setItem(lsModKey, remoteMod); } catch {}
      } else {
        if (!silent) setSyncMsg('Pushing to Gist…');
        const now = new Date().toISOString();
        const localData = await getLocalData();
        await apiPush({ token: t, gistId: resolvedId, fileName, description, data: localData, encPassphrase: e, savedAt: now });
        try { localStorage.setItem(lsModKey, now); } catch {}
      }

      persist(t, resolvedId, null);
      const synced = new Date();
      setLastSynced(synced);
      const label = remoteNewer ? '↓ Pulled from Gist' : '↑ Pushed to Gist';
      setSyncMsg(silent ? '' : `✓ ${label} at ${synced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}${e ? ' 🔒' : ''}`);
      if (!silent) setTimeout(() => setSyncMsg(''), 4000);
    } catch (err) {
      setSyncMsg(`Sync failed: ${err.message}`);
      setTimeout(() => setSyncMsg(''), 5000);
    } finally {
      setSyncing(false);
      syncingRef.current = false;
    }
  }

  function persist(t, g, mod) {
    try {
      if (t) localStorage.setItem(FWD_LS_TOKEN, t);
      if (g) { localStorage.setItem(lsIdKey, g); setGistId(g); setGistIdInput(g); }
      if (mod) localStorage.setItem(lsModKey, mod);
    } catch {}
    setToken(t); setTokenInput(t);
    setLastSynced(new Date());
  }

  /* ── Force push (debounced) — exposed via ref ── */
  const doPushNow = useCallback(async () => {
    const t = localStorage.getItem(FWD_LS_TOKEN) || '';
    const g = localStorage.getItem(lsIdKey) || '';
    const e = localStorage.getItem(FWD_LS_ENC_KEY) || '';
    if (!t || !g) return;
    const now = new Date().toISOString();
    try { localStorage.setItem(lsModKey, now); } catch {}
    setPushing(true);
    try {
      const localData = await getLocalData();
      await apiPush({ token: t, gistId: g, fileName, description, data: localData, encPassphrase: e || undefined, savedAt: now });
      setLastSynced(new Date());
    } catch {}
    finally { setPushing(false); }
  }, [fileName, description, getLocalData, lsIdKey, lsModKey]);

  const forcePush = useCallback((immediate = false) => {
    clearTimeout(debounceRef.current);
    if (immediate) doPushNow();
    else debounceRef.current = setTimeout(doPushNow, DEBOUNCE_MS);
  }, [doPushNow]);

  useImperativeHandle(ref, () => ({ forcePush }), [forcePush]);

  /* ── Save settings ── */
  async function saveSettings() {
    const t = tokenInput.trim();
    const g = gistIdInput.trim() || gistId;
    const e = encKeyInput.trim();
    const prevEnc = encKey;
    setToken(t); setGistId(g); setGistIdInput(g); setEncKey(e);
    try {
      if (t) localStorage.setItem(FWD_LS_TOKEN, t);
      if (g) localStorage.setItem(lsIdKey, g);
      if (e) localStorage.setItem(FWD_LS_ENC_KEY, e);
      else localStorage.removeItem(FWD_LS_ENC_KEY);
    } catch {}

    if (t) {
      clearTimeout(debounceRef.current);
      const now = new Date().toISOString();
      try { localStorage.setItem(lsModKey, now); } catch {}
      setPushing(true);
      
      try {
        let resolvedId = g;
        if (!resolvedId) {
          setSyncMsg('Looking for existing Gist…');
          resolvedId = await apiFindExisting(t, fileName);
        }

        // If Gist exists, force download first
        if (resolvedId) {
          setSyncMsg('Force downloading from Gist…');
          const remote = await apiFetch({ token: t, gistId: resolvedId, fileName, encPassphrase: e || undefined });
          if (remote !== null) {
            await onPullData(remote);
            const remoteMod = remote.savedAt || new Date().toISOString();
            try { localStorage.setItem(lsModKey, remoteMod); } catch {}
          }
        }

        // Then force upload local data
        setSyncMsg(resolvedId ? 'Uploading to Gist…' : 'Creating new Gist…');
        const localData = await getLocalData();
        const newId = await apiPush({ token: t, gistId: resolvedId, fileName, description, data: localData, encPassphrase: e || undefined, savedAt: now });
        persist(t, newId, now);
        
        let successMsg = '✓ Settings saved and synced';
        if (e !== prevEnc) {
          successMsg = e ? '✓ Re-encrypted and pushed 🔒' : '✓ Encryption removed — pushed';
        }
        setSyncMsg(successMsg);
        setTimeout(() => setSyncMsg(''), 4000);
      } catch (err) {
        setSyncMsg(`Save/Sync failed: ${err.message}`);
        setTimeout(() => setSyncMsg(''), 5000);
      } finally {
        setPushing(false);
      }
    } else {
      setSyncMsg('✓ Settings saved locally');
      setTimeout(() => setSyncMsg(''), 4000);
    }
  }

  const isActive = !!token;
  const isBusy   = syncing || pushing;

  return (
    <div className={styles.wrap} ref={popRef}>
      {isActive && (
        <button
          className={`${styles.iconBtn} ${isBusy ? styles.iconBtnBusy : ''}`}
          onClick={() => doSyncNow(token, gistId, encKey || undefined, false)}
          disabled={isBusy}
          title={lastSynced ? `Last synced ${lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Sync now'}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={isBusy ? { animation: 'gistSpin 0.8s linear infinite' } : undefined}>
            <path d="M4.5 9A8 8 0 0 1 19 8"/><path d="M19.5 15A8 8 0 0 1 5 16"/>
            <path d="M19 5v4h-4"/><path d="M5 19v-4h4"/>
          </svg>
        </button>
      )}

      {isBusy && <span className={styles.statusMsg}>⟳</span>}
      {!isBusy && lastSynced && !showPopover && (
        <span className={styles.statusMsg}>✓ {lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      )}

      <button
        className={`${styles.iconBtn} ${showPopover ? styles.iconBtnActive : ''} ${isActive ? styles.iconBtnOn : ''} ${pushing ? styles.iconBtnBusy : ''}`}
        onClick={() => setShowPopover(v => !v)}
        title="GitHub Gist sync settings"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={pushing ? { animation: 'gistSpin 0.8s linear infinite' } : undefined}>
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      </button>

      {showPopover && (
        <div className={styles.popover}>
          <div className={styles.popHead}>
            <span className={styles.popTitle}>GitHub Gist Sync</span>
            <span className={styles.popSub}>optional</span>
          </div>
          <p className={styles.popDesc}>
            Sync to a private GitHub Gist. Text and metadata only — files stay local.
            Data merges on every device, nothing is deleted.
          </p>
          <div className={styles.popSteps}>
            <span>1. <a href="https://github.com/settings/tokens/new?scopes=gist&description=FWD+Tools" target="_blank" rel="noopener" className={styles.popLink}>Create a token</a> with <code>gist</code> scope</span>
            <span>2. Paste it below and click Save</span>
            <span>3. Click Sync Now — first sync creates the Gist</span>
          </div>
          <div className={styles.popFields}>
            <label className={styles.popLabel}>GitHub token</label>
            <input className={styles.popInput} type="text" placeholder="ghp_xxxxxxxxxxxx" value={tokenInput} onChange={e => setTokenInput(e.target.value)} />

            <label className={styles.popLabel}>
              Gist ID <span className={styles.popLabelSub}>(leave blank to create new)</span>
            </label>
            <input className={styles.popInput} placeholder="Paste existing Gist ID" value={gistIdInput} onChange={e => setGistIdInput(e.target.value)} />
            {gistId && (
              <a href={`https://gist.github.com/${gistId}`} target="_blank" rel="noopener" className={styles.popViewLink}>View Gist ↗</a>
            )}

            <label className={styles.popLabel} style={{ marginTop: 10 }}>
              Encryption passphrase <span className={styles.popLabelSub}>(optional — AES-GCM)</span>
            </label>
            <div className={styles.encRow}>
              <input
                className={styles.popInput}
                type={showEncKey ? 'text' : 'password'}
                placeholder="Leave blank for no encryption"
                value={encKeyInput}
                onChange={e => setEncKeyInput(e.target.value)}
                style={{ paddingRight: 30 }}
              />
              <button type="button" className={styles.encToggle} onClick={() => setShowEncKey(v => !v)} title={showEncKey ? 'Hide' : 'Show'}>
                {showEncKey
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
            {encKeyInput && encKeyInput !== encKey && (
              <p className={styles.popHint}>Save settings to apply the new passphrase.</p>
            )}
            {encKey && (
              <p className={styles.popHintGreen}>🔒 Gist is encrypted. Keep this passphrase safe — you need it to decrypt on any device.</p>
            )}
          </div>

          <div className={styles.popActions}>
            <button className={styles.popSaveBtn} onClick={saveSettings} disabled={pushing}>Save settings</button>
            <button
              className={styles.popSyncBtn}
              onClick={() => doSyncNow(tokenInput.trim() || token, gistIdInput.trim() || gistId, encKeyInput.trim() || undefined, false)}
              disabled={isBusy || (!tokenInput.trim() && !token)}
            >
              {isBusy ? 'Syncing…' : 'Sync Now'}
            </button>
          </div>

          {syncMsg && (
            <p className={`${styles.popMsg} ${syncMsg.startsWith('✓') ? styles.popMsgOk : syncMsg.includes('failed') || syncMsg.includes('Failed') ? styles.popMsgErr : ''}`}>
              {syncMsg}
            </p>
          )}
          {lastSynced && !syncMsg && (
            <p className={styles.popLast}>Last synced {lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          )}
        </div>
      )}
    </div>
  );
});

export default GistSyncButton;
