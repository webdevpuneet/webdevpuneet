(() => {
  const TOOLS = [
    {
      slug: 'json-formatter',
      name: 'JSON Formatter',
      sub: 'Format & validate',
      url: '/tools/json-formatter/',
      icon: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="1" y="13" font-family="monospace" font-size="13" font-weight="700" fill="currentColor">{}</text>
      </svg>`,
    },
    {
      slug: 'flexbox-builder',
      name: 'Flexbox Builder',
      sub: 'Visual layout editor',
      url: '/tools/flexbox-builder/',
      icon: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="4" width="4" height="8" rx="1" fill="currentColor"/>
        <rect x="6" y="2" width="4" height="12" rx="1" fill="currentColor"/>
        <rect x="11" y="5" width="4" height="6" rx="1" fill="currentColor"/>
      </svg>`,
    },
    
  ];

  const mount = document.getElementById('tools-nav-mount');
  if (!mount) return;

  // Detect active tool from URL path
  const path = window.location.pathname;
  const activeTool = TOOLS.find(t => path.includes(t.slug));

  // Inject styles once
  if (!document.getElementById('tools-nav-style')) {
    const style = document.createElement('style');
    style.id = 'tools-nav-style';
    style.textContent = `
      .tnav {
        padding: 10px 12px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
      }
      .tnav-label {
        font-size: 9px;
        font-weight: 600;
        letter-spacing: .1em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.25);
        padding: 0 4px;
        margin-bottom: 6px;
      }
      .tnav-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .tnav-item a {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 7px 8px;
        border-radius: 7px;
        text-decoration: none;
        color: rgba(255,255,255,0.45);
        transition: background 0.15s, color 0.15s;
        font-size: 12.5px;
        font-weight: 500;
        line-height: 1;
      }
      .tnav-item a:hover {
        background: rgba(255,255,255,0.06);
        color: rgba(255,255,255,0.85);
      }
      .tnav-item a:hover .tnav-icon { color: rgba(255,255,255,0.7); }
      .tnav-item.active a {
        background: rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.92);
      }
      .tnav-icon {
        width: 26px; height: 26px;
        border-radius: 6px;
        background: rgba(255,255,255,0.07);
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        color: rgba(255,255,255,0.4);
        transition: color 0.15s;
      }
      .tnav-item.active .tnav-icon {
        background: rgba(255,255,255,0.1);
        color: rgba(255,255,255,0.8);
      }
      .tnav-icon svg { width: 13px; height: 13px; }
      .tnav-info { display: flex; flex-direction: column; gap: 2px; }
      .tnav-name { font-size: 12px; font-weight: 500; line-height: 1; }
      .tnav-sub  { font-size: 10px; color: rgba(255,255,255,0.3); line-height: 1; }
      .tnav-item.active .tnav-sub { color: rgba(255,255,255,0.45); }
    `;
    document.head.appendChild(style);
  }

  // Render nav
  mount.innerHTML = `
    <nav class="tnav">
      <div class="tnav-label">Tools</div>
      <ul class="tnav-list">
        ${TOOLS.map(t => `
          <li class="tnav-item${activeTool && activeTool.slug === t.slug ? ' active' : ''}">
            <a href="${t.url}">
              <span class="tnav-icon">${t.icon}</span>
              <span class="tnav-info">
                <span class="tnav-name">${t.name}</span>
                <span class="tnav-sub">${t.sub}</span>
              </span>
            </a>
          </li>
        `).join('')}
      </ul>
    </nav>
  `;
})();
