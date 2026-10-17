/* Fork to My Code in a new tab. The tab is opened during the click, because pop-up
   blockers stop tabs opened after an await, and is pointed at the fork once it is saved.
   If the browser blocks it anyway, the current tab navigates instead. */
export function openForkTab() {
  const tab = window.open('about:blank', '_blank');
  if (tab) {
    try { tab.document.title = 'Opening My Code…'; tab.document.body.innerHTML = '<p style="font:15px system-ui,sans-serif;padding:24px;color:#475569">Saving your fork to My Code…</p>'; } catch { /* cross-origin quirks */ }
  }
  return {
    go(id) {
      const url = `/ui-snippets/mycode/?id=${id}`;
      if (tab && !tab.closed) tab.location.href = url;
      else window.location.href = url;
    },
    cancel() { if (tab && !tab.closed) tab.close(); },
  };
}
