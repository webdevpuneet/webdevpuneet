/** Fire this before every router.push inside UI Snippets to trigger the loading pill */
export function navStart() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('snippet-nav-start'));
  }
}
