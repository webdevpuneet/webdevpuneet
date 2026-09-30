// Single source of truth for the public UI-snippet count shown across the site
// (hero stats, SEO copy, nudges, cross-links, tool header). Update this one number
// when snippets are added or removed.
//
// It lives in its own tiny module on purpose: importing the full snippets array
// (src/components/UiSnippetsTool/snippets.js) just to read `.length` would bundle
// every snippet's HTML/CSS/JS into pages that only need the number. A dev-time
// check in that file warns if this constant drifts from the real count.
export const SNIPPET_COUNT = 2063;
