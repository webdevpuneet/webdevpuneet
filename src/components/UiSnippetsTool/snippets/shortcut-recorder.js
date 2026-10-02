const shortcutRecorder = {
  id: 'shortcut-recorder',
  title: 'Shortcut Recorder',
  lastmod: '2026-07-18',
  category: 'forms',
  html: `<div class="sk-card">
  <h3>Keyboard shortcuts</h3>
  <ul class="sk-list" id="skList">
    <li class="sk-row" data-action="Save"><span>Save</span><button type="button" class="sk-field" data-combo="Ctrl+S"></button></li>
    <li class="sk-row" data-action="Command palette"><span>Command palette</span><button type="button" class="sk-field" data-combo="Ctrl+K"></button></li>
    <li class="sk-row" data-action="New item"><span>New item</span><button type="button" class="sk-field" data-combo=""></button></li>
  </ul>
  <p class="sk-hint" id="skHint">Click a shortcut, then press a key combination.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;padding:40px 20px}

.sk-card{background:#1e293b;border:1px solid #334155;border-radius:18px;padding:22px;width:100%;max-width:380px}
.sk-card h3{font-size:16px;font-weight:800;color:#f1f5f9;margin-bottom:14px}

.sk-list{list-style:none;display:flex;flex-direction:column;gap:8px}
.sk-row{display:flex;align-items:center;justify-content:space-between;gap:14px}
.sk-row>span{font-size:13.5px;font-weight:600;color:#cbd5e1}

.sk-field{min-width:128px;text-align:center;background:#0f172a;border:1px solid #334155;border-radius:9px;padding:7px 10px;font-family:inherit;font-size:12px;color:#94a3b8;cursor:pointer;transition:border-color .15s,box-shadow .15s}
.sk-field:hover{border-color:#475569}
.sk-field.sk-recording{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.25);color:#a5b4fc}
.sk-field.sk-dupe{border-color:#ef4444;box-shadow:0 0 0 3px rgba(239,68,68,.2)}
.sk-field .sk-kbd{display:inline-block;background:#334155;color:#e2e8f0;border-radius:5px;padding:2px 7px;font-size:11px;font-weight:700;margin:0 2px;font-family:ui-monospace,monospace}
.sk-field .sk-plus{color:#475569;margin:0 1px}

.sk-hint{margin-top:14px;font-size:12px;color:#64748b;min-height:18px}`,

  js: `var fields = Array.prototype.slice.call(document.querySelectorAll('.sk-field'));
var hint = document.getElementById('skHint');
var recording = null;
var MODS = ['Control', 'Alt', 'Shift', 'Meta'];
var PRETTY = { Control: 'Ctrl', Meta: navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Win', ' ': 'Space', ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→', Escape: 'Esc' };

function renderCombo(field) {
  var combo = field.getAttribute('data-combo');
  if (!combo) { field.textContent = field.classList.contains('sk-recording') ? 'Press keys…' : 'Not set'; return; }
  field.innerHTML = combo.split('+').map(function (k, i) {
    return (i ? '<span class="sk-plus">+</span>' : '') + '<span class="sk-kbd">' + k + '</span>';
  }).join('');
}

function isDuplicate(combo, self) {
  return fields.some(function (f) { return f !== self && f.getAttribute('data-combo') === combo && combo; });
}

function stop() {
  if (!recording) return;
  recording.classList.remove('sk-recording');
  renderCombo(recording);
  recording = null;
  hint.textContent = 'Click a shortcut, then press a key combination.';
}

function start(field) {
  stop();
  recording = field;
  field.classList.add('sk-recording');
  renderCombo(field);
  hint.textContent = 'Recording… press Esc to cancel.';
}

fields.forEach(function (field) {
  renderCombo(field);
  field.addEventListener('click', function () { recording === field ? stop() : start(field); });
});

document.addEventListener('keydown', function (e) {
  if (!recording) return;
  e.preventDefault();
  if (e.key === 'Escape') { stop(); return; }
  if (MODS.indexOf(e.key) > -1) return; // wait for a non-modifier key

  var parts = [];
  if (e.ctrlKey) parts.push('Ctrl');
  if (e.metaKey) parts.push(PRETTY.Meta);
  if (e.altKey) parts.push('Alt');
  if (e.shiftKey) parts.push('Shift');
  var key = PRETTY[e.key] || (e.key.length === 1 ? e.key.toUpperCase() : e.key);
  parts.push(key);
  var combo = parts.join('+');

  recording.setAttribute('data-combo', combo);
  var dupe = isDuplicate(combo, recording);
  recording.classList.toggle('sk-dupe', dupe);
  var field = recording;
  stop();
  field.classList.toggle('sk-dupe', dupe);
  renderCombo(field);
  hint.textContent = dupe ? 'That combination is already used.' : 'Saved ' + combo + '.';
});`,

  seo: {
    title: 'Shortcut Recorder — Capture Keyboard Hotkeys in a Field',
    description: `A keyboard shortcut recorder: click a field and press a combo to capture it as kbd chips, with duplicate detection. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Shortcut Recorder — Capture and Edit Keyboard Hotkeys with Conflict Detection',
      description: `A shortcut recorder lets users rebind a keyboard hotkey by simply pressing the combination they want — the control behind every "customise keyboard shortcuts" settings screen in editors, IDEs, and power-user apps. This snippet captures a live key chord, renders it as \`kbd\` chips, normalises modifiers per platform, and flags duplicates, in plain HTML, CSS, and vanilla JavaScript.

**Click to record, press to set**

Each shortcut is a button showing its current binding. Click it and it enters recording mode (a glowing focus ring and "Press keys…" prompt); the next key combination you press is captured and saved. Pressing \`Escape\` cancels without changing anything. Clicking the field again toggles recording off. This click-then-press flow is exactly how native preference panes capture shortcuts.

**Reading a chord correctly**

The trick to capturing chords is ignoring lone modifier presses. When \`keydown\` fires for \`Control\`, \`Shift\`, \`Alt\`, or \`Meta\` by itself, the recorder waits — a shortcut isn't complete until a non-modifier key arrives. When a real key lands, it reads the modifier flags (\`ctrlKey\`, \`metaKey\`, \`altKey\`, \`shiftKey\`) and assembles them in a consistent order, then appends the key. \`preventDefault()\` stops the browser acting on combos like Ctrl+S while you're recording.

**Platform-aware labels**

Modifiers are prettified for humans: \`Control\` becomes "Ctrl", and \`Meta\` becomes "Cmd" on macOS or "Win" elsewhere via a quick platform check. Special keys map to symbols — arrows to \`↑↓←→\`, \`Escape\` to "Esc", space to "Space" — and single character keys are upper-cased so "k" displays as "K". The result renders as individual \`kbd\` chips joined by \`+\`, the familiar way shortcuts appear in menus and docs.

**Duplicate detection**

After a binding is set, the recorder checks whether any other shortcut already uses the same combination and flags both with a red ring and a hint ("That combination is already used"). Catching conflicts at capture time is what separates a real shortcut editor from a text field — two actions bound to the same chord is a bug users can't diagnose themselves.

**Portable and minimal**

The captured value is a plain string like \`Ctrl+K\` stored in a data attribute, trivial to persist or feed into a hotkey library. The whole recorder is one keydown handler and a small render function with no dependencies — a clean reference for building keyboard-shortcut customisation into any settings screen.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A list of actions renders, each with its current shortcut.` },
      { title: 'Click a shortcut', text: `The field starts recording and prompts you to press keys.` },
      { title: 'Press a combination', text: `Hold modifiers and press a key — it captures as Ctrl+K style chips.` },
      { title: 'Cancel if needed', text: `Press Esc while recording to leave the binding unchanged.` },
      { title: 'Watch for conflicts', text: `A red ring warns when a combo is already used by another action.` },
      { title: 'Read the value', text: `Each field stores its combo string in data-combo — persist it as you like.` },
    ] },
    features: [
      { title: 'Click-to-record', text: `Click a field, press a combo — the native shortcut-capture flow.` },
      { title: 'Chord capture', text: `Waits for a non-modifier key, then reads all active modifiers.` },
      { title: 'Platform-aware labels', text: `Meta shows Cmd on macOS, Win elsewhere; arrows and Esc get symbols.` },
      { title: 'kbd chip rendering', text: `Shows the combo as individual key chips joined by +.` },
      { title: 'Duplicate detection', text: `Flags conflicts when two actions share a combination.` },
      { title: 'Esc to cancel', text: `Escape leaves the existing binding untouched.` },
      { title: 'preventDefault while recording', text: `Browser combos like Ctrl+S do not fire during capture.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no hotkey or keybinding dependency.` },
    ],
    useCases: [
      { title: 'Keyboard shortcut settings', text: 'Let users rebind hotkeys by clicking a field and pressing a combination, with each key shown as an individual chip in a [settings panel](/ui-snippets/settings-panel/).' },
      { title: 'Editor and IDE preferences', text: 'Customise commands in an editor or IDE preferences screen, detecting duplicates so two actions never share the very same key combination.' },
      { title: 'Power-user apps', text: 'Offer remappable actions beside a [command palette](/ui-snippets/command-palette/) and a [keyboard shortcuts](/ui-snippets/keyboard-shortcuts/) cheat sheet in power-user apps.' },
      { title: 'Accessibility customisation', text: 'Allow people to set combinations that suit their hands and assistive tools, with platform-aware labels showing Cmd on macOS and Win elsewhere.' },
      { title: 'Game key bindings', text: 'Capture control bindings in a game or tool, using a chord capture that waits for a non-modifier key before reading all active modifiers.' },
    ],
    faqs: [
      { q: 'How does it capture a key combination?', a: `On keydown while recording, it ignores presses that are only a modifier (Control, Shift, Alt, Meta) and waits for a real key. When one arrives, it reads ctrlKey/metaKey/altKey/shiftKey, assembles them in a fixed order, appends the key, and saves the result. It also calls preventDefault so the browser does not act on combos like Ctrl+S during capture.` },
      { q: 'Does it handle Mac vs Windows modifiers?', a: `Yes. The Meta key renders as "Cmd" on macOS and "Win" on other platforms via a navigator.platform check, and Control always shows as "Ctrl". You can extend the PRETTY map to localise further or to display the actual ⌘/⌥/⇧/⌃ glyphs if you prefer the macOS style.` },
      { q: 'How are conflicts detected?', a: `After a binding is set, the recorder scans the other fields for the same combo string. If it finds one, it adds a red ring to the field and shows a hint that the combination is already used. You decide the policy — warn only (as here), block the save, or swap the binding away from the other action.` },
      { q: 'What value do I store for each shortcut?', a: `A plain string such as "Ctrl+K" or "Cmd+Shift+P", held in the field's data-combo attribute. It is easy to persist to storage or a backend, render in menus, and feed into a hotkey matcher at runtime by comparing it against the same modifier flags on keydown.` },
      { q: 'How do I use this shortcut recorder in React, Vue, or Angular?', a: `Hold each binding in state and render the chips from it. Track a "recording" id in state, attach a window keydown listener while recording (in an effect that cleans up), and update the binding when a non-modifier key arrives. Compute the duplicate flag as derived state. Tailwind users replace the classes with utilities; the keydown logic is identical across frameworks.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out the modifier-key-then-real-key capture logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the keydown handler returns early when e.key is itself one of the MODS entries, or how the PRETTY lookup table normalizes both special keys and platform-specific Meta labeling into readable chips. The same assistant can help optimize it, for example checking whether attaching the keydown listener to the whole document rather than just the recording field could ever cause unexpected interference with other page shortcuts. It's also useful for extending the feature: ask it to persist bindings to localStorage so they survive a reload, support recording a second alternate combo per action, or reserve certain browser-critical combos like Ctrl+W from ever being assignable. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a keyboard shortcut recorder with duplicate detection in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- A list of actions, each with a button-like field that displays its currently bound key combination as individual small chip elements joined visually by a plus sign, or "Not set" when empty.
- Clicking a field must enter a recording mode (visually distinct via a focus-ring style and a placeholder like "Press keys…"), and clicking the currently-recording field again must exit recording mode without changing its binding.
- Attach a single document-level keydown listener that only acts when a field is actively recording. It must call preventDefault to stop the browser handling the combo, and must explicitly ignore keydown events where the pressed key is itself a bare modifier (Control, Alt, Shift, or Meta) — only a subsequent non-modifier key should complete and save the combo.
- When a real key arrives, read the modifier boolean flags from the event (ctrlKey, metaKey, altKey, shiftKey) and assemble them into the combo string in a fixed, consistent order followed by the key itself, rather than relying on key event order.
- Normalize special key names for display: the Meta key must render as "Cmd" on macOS and "Win" on other platforms (detected via navigator.platform), arrow keys must render as arrow glyphs, Escape must render as "Esc", and single printable characters must be upper-cased.
- Pressing Escape while recording must cancel and restore the previous binding unchanged, distinct from completing a combo.
- After saving a new combo, check every other field's stored combo for an exact match and, if found, visually flag both the newly recorded field and the conflicting one with a distinct warning style plus a text hint explaining the conflict.`,
    },
  },
};

export default shortcutRecorder;
