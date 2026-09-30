---
name: Don't verify build after changes
description: User does not want build verification runs after every change
type: feedback
---

Do not run `npx next build` to verify after making changes. Just make the changes and report done.

**Why:** The user finds it unnecessary and slow — they will test themselves.

**How to apply:** Skip the build verification step entirely. Only run builds if the user explicitly asks.
