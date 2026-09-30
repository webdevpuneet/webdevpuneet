// A UI-snippet embed page (/ui-snippets/[slug]/embed/) is meant to be dropped
// into a third-party iframe (WordPress, etc.) showing only the live preview —
// the site's own chrome (sidebar, footer, right panel, nudges) must never render there.
export function isEmbedRoute(pathname) {
  return /^\/ui-snippets\/[^/]+\/embed\/?$/.test(pathname || '');
}
