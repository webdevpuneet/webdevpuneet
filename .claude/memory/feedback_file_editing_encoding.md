---
name: feedback-file-editing-encoding
description: Never use PowerShell Set-Content or Get-Content -Raw for bulk file edits — use Python with explicit UTF-8 encoding to avoid corruption
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8d4305db-14dd-40fa-8ff0-b15ff5e349bb
---

Never use PowerShell `Set-Content`, `Get-Content -Raw`, or `-replace` for bulk edits to source files. PowerShell 5.1's default encoding (UTF-16 LE / Windows-1252) corrupts UTF-8 content — dashes become `â€"`, quotes become `â€œ`, etc.

**Why:** A bulk keyword-removal script using PowerShell `Set-Content` corrupted 186 source files. Required a `git checkout -- src/app/` to restore them all.

**How to apply:** For any bulk find-and-replace across multiple files, always use Python with explicit encoding:

```python
import os, re
pattern = re.compile(r'...', re.DOTALL)
for dirpath, _, files in os.walk(root):
    for fname in files:
        fpath = os.path.join(dirpath, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            original = f.read()
        cleaned = pattern.sub('', original)
        if cleaned != original:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(cleaned)
```

This applies to: removing metadata fields, renaming variables across files, any batch text transformation on .js/.ts/.css/.json files.
