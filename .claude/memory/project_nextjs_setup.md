---
name: Next.js Project Setup
description: Next.js 15 project initialized in root of c:\Projects\tools, replacing standalone HTML tools
type: project
---

Next.js 15 + React 19 project was initialized in the root of c:\Projects\tools (2026-04-02). The project uses App Router with JavaScript (no TypeScript).

**Why:** User wants all tools unified under a single Next.js app with shared header/footer/sidebar.

**How to apply:** All new tools should be added as new routes under `src/app/[tool-name]/page.js` with a corresponding React component in `src/components/`. Always update `src/components/Sidebar.js` TOOLS array and `DEVLOG.md` when adding a new tool.

Structure:
- `src/app/layout.js` — root layout with Header, Sidebar, Footer
- `src/components/Header.js` — AdSense (ca-pub-2762737943861458) script loaded here
- `src/components/Footer.js` — Google Analytics (UA-107386983-1) script loaded here
- `src/components/Sidebar.js` — tools nav, uses usePathname for active state
- CSS Modules per component, CSS variables in `globals.css`
- Tool components use 'use client' with React hooks
