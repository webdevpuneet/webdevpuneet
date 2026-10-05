/* Fork & Edit → My Code. Opens /ui-snippets/mycode/ in a new tab with a snippet
   ({ name, html, css, js, cdnUrls }) — the same hand-off demos/assets/demo.js uses:

     #fork=ls:<token>   the snippet is stashed in localStorage under uis_fork_<token>
     #fork=<base64url>  the snippet itself, when storage is unavailable

   Nothing is sent to a server. */
const FORK_PREFIX = 'uis_fork_';

function b64url(str) {
  return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function forkToMyCode({ name, html = '', css = '', js = '', cdnUrls = [] }) {
  const payload = { v: 1, name, html, css, js, cdnUrls };
  const base = `${window.location.origin}/ui-snippets/mycode/`;
  let url = null;
  try {
    const token = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    localStorage.setItem(FORK_PREFIX + token, JSON.stringify({ t: Date.now(), payload }));
    if (localStorage.getItem(FORK_PREFIX + token)) url = `${base}#fork=ls:${token}`;
  } catch { /* storage unavailable: fall back to the self-contained link */ }
  if (!url) url = `${base}#fork=${b64url(JSON.stringify(payload))}`;
  window.open(url, '_blank', 'noopener');
}

export { b64url };
