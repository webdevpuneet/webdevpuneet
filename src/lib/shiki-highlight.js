import { createHighlighter } from 'shiki';

// Shared across every page that needs server-side syntax highlighting
// (the canonical snippet page and the /embed shell) so only one shiki
// WASM highlighter is created per build/server process.
let _highlighterPromise = null;
function getHighlighter() {
  if (!_highlighterPromise) {
    _highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: ['html', 'css', 'javascript', 'jsx', 'vue', 'typescript'],
    });
  }
  return _highlighterPromise;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function highlightCode(code, lang, theme = 'github-light') {
  try {
    const hl = await getHighlighter();
    return hl.codeToHtml(code, { lang, theme });
  } catch {
    // Fallback for oversized code or WASM errors
    return `<pre style="margin:0;padding:14px 16px;font-family:var(--font-mono,'Fira Code',monospace);font-size:12px;line-height:1.6;white-space:pre-wrap;word-break:break-all;">${escapeHtml(code)}</pre>`;
  }
}
