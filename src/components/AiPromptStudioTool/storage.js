/* The AI Prompt Studio library, kept in this browser's IndexedDB database `wdp-ai-prompts` (a design store, see
   src/lib/design-store.js). Each saved prompt is one record: { id, name (the title), tpl: 'prompt',
   state: { prompt, score }, created, updated }. Older prompts that were kept in localStorage (`apt_saved_prompts`)
   are moved over the first time the library loads, and the old key is removed once they are safely in IndexedDB. */
import { makeDesignStore } from '@/lib/design-store';

export const promptStore = makeDesignStore('wdp-ai-prompts');
const LEGACY_KEY = 'apt_saved_prompts';

/* Where a saved prompt came from, shown as a tag in the library: the tool or kind of page it was saved on */
export const SOURCE_TAGS = [
  { id: 'ui-snippet', label: 'UI Snippet', tint: '#6366f1' },
  { id: 'social-post', label: 'Social Post', tint: '#ec4899' },
  { id: 'website-template', label: 'Website Template', tint: '#0ea5e9' },
  { id: 'website-section', label: 'Website Section', tint: '#10b981' },
  { id: 'email', label: 'Email Template', tint: '#f59e0b' },
  { id: 'tool', label: 'Tool', tint: '#64748b' },
  { id: 'own', label: 'Own prompt', tint: '#8b5cf6' },
];
export const tagById = id => SOURCE_TAGS.find(t => t.id === id) || null;
/** The tag for the page being read, from its address */
export const tagForPath = path => {
  const p = path || '';
  if (/^\/ui-snippets\//.test(p)) return 'ui-snippet';
  if (/^\/social-post-templates\//.test(p)) return 'social-post';
  if (/^\/website-section-templates\//.test(p)) return 'website-section';
  if (/^\/website-builder\//.test(p)) return 'website-template';
  if (/^\/email-templates\//.test(p)) return 'email';
  return 'tool';
};

const toEntry = d => ({ id: d.id, title: d.name, prompt: d.state?.prompt || '', score: d.state?.score ?? null, tag: d.state?.tag || null, createdAt: d.created });
const legacy = () => { try { return JSON.parse(localStorage.getItem(LEGACY_KEY) || '[]'); } catch { return []; } };

/** Newest first, in the shape the studio uses: { id, title, prompt, score, createdAt } */
export async function loadPrompts() {
  try {
    const old = legacy();
    if (old.length) {
      const have = new Set((await promptStore.listDesigns()).map(d => d.id));
      // oldest first, so the newest ends up with the latest "updated" time and stays on top
      for (const e of [...old].reverse()) {
        if (!have.has(e.id)) await promptStore.saveDesign({ id: e.id, name: e.title, tpl: 'prompt', state: { prompt: e.prompt, score: e.score, tag: 'own' }, created: e.createdAt });
      }
      localStorage.removeItem(LEGACY_KEY);
    }
    return (await promptStore.listDesigns()).map(toEntry);
  } catch {
    return legacy(); // storage trouble: whatever is still in localStorage
  }
}

export async function savePrompt({ title, prompt, score, tag = 'own' }) {
  const rec = await promptStore.saveDesign({ name: title, tpl: 'prompt', state: { prompt, score, tag } });
  return toEntry(rec);
}

export const deletePrompt = id => promptStore.deleteDesign(id);

export async function getPrompt(id) {
  try { const d = await promptStore.getDesign(id); return d ? toEntry(d) : null; } catch { return null; }
}

/** Save a prompt from another page ("Save to AI Prompts"). Returns 'saved', or 'exists' when the same text is already
    in the library. The score is worked out when the studio opens the library, so it is left empty here. */
export async function saveFromPage(title, prompt) {
  const text = String(prompt || '').trim();
  if (!text) return 'empty';
  const all = await promptStore.listDesigns();
  if (all.some(d => (d.state?.prompt || '').trim() === text)) return 'exists';
  await promptStore.saveDesign({ name: String(title || 'Saved prompt').slice(0, 120), tpl: 'prompt', state: { prompt: text, score: null, tag: tagForPath(typeof location !== 'undefined' ? location.pathname : '') } });
  return 'saved';
}

/** The name of the page being read, for a saved prompt's title */
export const pageTitle = () => {
  try { return (document.querySelector('h1')?.textContent || document.title.split(/\s[-\u2014|]\s/)[0] || '').trim(); } catch { return ''; }
};
