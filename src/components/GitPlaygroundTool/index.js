'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from '../ReactPlaygroundTool/styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import { CHAPTERS, LESSONS } from './lessons';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const LS_PROGRESS = 'fwd-git-playground-progress';
const LS_POSITION = 'fwd-git-playground-position';

function readProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(LS_PROGRESS) || '[]')); }
  catch { return new Set(); }
}

function saveProgress(set) {
  try { localStorage.setItem(LS_PROGRESS, JSON.stringify([...set])); } catch {}
}

function readPosition() {
  try { return JSON.parse(localStorage.getItem(LS_POSITION) || '0'); }
  catch { return 0; }
}

function savePosition(idx) {
  try { localStorage.setItem(LS_POSITION, JSON.stringify(idx)); } catch {}
}

const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function highlightShell(code) {
  return code.split('\n').map(line => {
    if (!line.trim()) return '';
    const commentStart = line.search(/\S/);
    if (line.slice(commentStart).startsWith('#')) return `<span class="rjx-cm">${esc(line)}</span>`;

    let out = '';
    let i = 0;
    while (i < line.length) {
      const char = line[i];

      if (/\s/.test(char)) {
        out += char;
        i += 1;
        continue;
      }

      if (char === '"' || char === "'") {
        const quote = char;
        let j = i + 1;
        while (j < line.length) {
          if (line[j] === '\\' && j + 1 < line.length) {
            j += 2;
            continue;
          }
          if (line[j] === quote) {
            j += 1;
            break;
          }
          j += 1;
        }
        out += `<span class="rjx-str">${esc(line.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      let j = i;
      while (j < line.length && !/\s/.test(line[j])) j += 1;
      const token = line.slice(i, j);
      const html = esc(token);
      if (/^(git|touch|edit|append|mkdir|ls|cat|rm)$/.test(token)) out += `<span class="rjx-kw">${html}</span>`;
      else if (/^--?[a-zA-Z0-9-]+$/.test(token)) out += `<span class="rjx-hook">${html}</span>`;
      else if (/^(HEAD~?\d*|HEAD|main|origin)$/.test(token)) out += `<span class="rjx-num">${html}</span>`;
      else out += html;
      i = j;
    }
    return out;
  }).join('\n');
}

function parseArgs(line) {
  const args = [];
  let current = '';
  let quote = null;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (quote) {
      if (char === '\\' && i + 1 < line.length) {
        const next = line[i + 1];
        current += next === 'n' ? '\n' : next;
        i += 1;
        continue;
      }
      if (char === quote) {
        quote = null;
      } else {
        current += char;
      }
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (/\s/.test(char)) {
      if (current) {
        args.push(current);
        current = '';
      }
      continue;
    }
    current += char;
  }
  if (current) args.push(current);
  return args;
}

function createRepo() {
  return {
    initialized: false,
    detached: false,
    currentBranch: 'main',
    branches: { main: null },
    commits: [],
    files: {},
    staged: {},
    remotes: {},
    stash: [],
    tags: {},
    config: {},
    reflog: [],
    conflicts: [],
    lfsPatterns: [],
    submodules: [],
    hooks: [],
    remoteBranches: [],
  };
}

function headCommit(repo) {
  const id = repo.branches[repo.currentBranch];
  return repo.commits.find(commit => commit.id === id) || null;
}

function snapshot(repo) {
  return headCommit(repo)?.files || {};
}

function short(id) {
  return id ? id.slice(0, 7) : '0000000';
}

function commitId(index) {
  return (index + 1).toString(16).padStart(7, '0') + 'a';
}

function changedFiles(repo, stagedOnly = false) {
  const base = snapshot(repo);
  if (stagedOnly) return Object.keys(repo.staged);
  const names = new Set([...Object.keys(base), ...Object.keys(repo.files)]);
  return [...names].filter(name => repo.files[name] !== base[name]);
}

function untrackedFiles(repo) {
  const base = snapshot(repo);
  return Object.keys(repo.files).filter(name => base[name] === undefined && repo.staged[name] === undefined && !isIgnored(repo, name));
}

function isIgnored(repo, file) {
  const ignore = repo.files['.gitignore'];
  if (!ignore) return false;
  return ignore.split(/\r?\n/).filter(Boolean).some(pattern => {
    if (pattern.endsWith('/')) return file.startsWith(pattern);
    if (pattern.startsWith('*')) return file.endsWith(pattern.slice(1));
    return file === pattern;
  });
}

function ensureRepo(repo, out) {
  if (repo.initialized) return true;
  out.push('fatal: not a git repository (run git init first)');
  return false;
}

function statusLines(repo) {
  const staged = changedFiles(repo, true);
  const changed = changedFiles(repo).filter(file => repo.staged[file] === undefined && !isIgnored(repo, file));
  const untracked = untrackedFiles(repo);
  const out = [
    `On branch ${repo.detached ? '(detached HEAD)' : repo.currentBranch}`,
  ];
  if (repo.conflicts.length) {
    out.push('You have unmerged paths.');
    repo.conflicts.forEach(file => out.push(`  both modified: ${file}`));
    return out;
  }
  if (!staged.length && !changed.length && !untracked.length) {
    out.push('nothing to commit, working tree clean');
    return out;
  }
  if (staged.length) {
    out.push('Changes to be committed:');
    staged.forEach(file => out.push(`  ${repo.staged[file] === null ? 'deleted' : 'modified'}: ${file}`));
  }
  if (changed.length) {
    out.push('Changes not staged for commit:');
    changed.forEach(file => out.push(`  modified: ${file}`));
  }
  if (untracked.length) {
    out.push('Untracked files:');
    untracked.forEach(file => out.push(`  ${file}`));
  }
  return out;
}

function runGit(repo, args, out) {
  const cmd = args[0];

  if (cmd === '--version') {
    out.push('git version 2.45.0');
    return;
  }

  if (cmd === 'help') {
    out.push(args[1] ? `help: git ${args[1]} - simulated quick reference opened` : 'common commands: init, status, add, commit, log, branch, switch, merge, remote, push, pull');
    return;
  }

  if (cmd === 'config') {
    const keyIndex = args.findIndex(arg => !arg.startsWith('-') && arg.includes('.'));
    if (keyIndex >= 0 && args[keyIndex + 1]) {
      repo.config[args[keyIndex]] = args[keyIndex + 1];
      out.push(`configured ${args[keyIndex]}=${args[keyIndex + 1]}`);
    } else if (args.includes('--list')) {
      const entries = Object.entries(repo.config);
      out.push(entries.length ? entries.map(([key, value]) => `${key}=${value}`).join('\n') : '(no config values set)');
    } else {
      out.push('usage: git config [--global] key value');
    }
    return;
  }

  if (cmd === 'clone') {
    const url = args[1] || 'https://github.com/example/repo.git';
    Object.assign(repo, createRepo(), {
      initialized: true,
      currentBranch: 'main',
      remotes: { origin: url },
      files: { 'README.md': '# Cloned project\n' },
      remoteBranches: ['origin/main', 'origin/feature/demo'],
    });
    const id = commitId(0);
    repo.commits.push({ id, message: 'Initial remote commit', files: { ...repo.files }, branch: 'main' });
    repo.branches.main = id;
    repo.reflog.push(`${short(id)} clone: from ${url}`);
    out.push(`Cloning into 'site'...`);
    out.push('remote: Enumerating objects: 12, done.');
    out.push(`origin set to ${url}`);
    return;
  }

  if (cmd === 'init') {
    repo.initialized = true;
    repo.currentBranch = 'main';
    repo.branches.main = repo.branches.main || null;
    out.push('Initialized empty Git repository on branch main');
    return;
  }

  if (!ensureRepo(repo, out)) return;

  if (cmd === 'status') {
    out.push(...statusLines(repo));
    return;
  }

  if (cmd === 'add') {
    const targets = args.slice(1);
    const addAll = targets.includes('.') || targets.includes('-A') || targets.length === 0;
    const files = addAll ? Object.keys(repo.files).filter(file => !isIgnored(repo, file)) : targets;
    files.forEach(file => {
      if (repo.files[file] !== undefined) repo.staged[file] = repo.files[file];
    });
    out.push(files.length ? `staged ${files.join(', ')}` : 'nothing matched');
    return;
  }

  if (cmd === 'diff') {
    const files = changedFiles(repo, args.includes('--staged'));
    if (!files.length) {
      out.push('No diff');
      return;
    }
    files.forEach(file => {
      const before = snapshot(repo)[file] || '';
      const after = args.includes('--staged') ? repo.staged[file] || '' : repo.files[file] || '';
      out.push(`diff --git a/${file} b/${file}`);
      out.push(`- ${before.split('\n')[0] || '(empty)'}`);
      out.push(`+ ${after.split('\n')[0] || '(empty)'}`);
    });
    return;
  }

  if (cmd === 'commit') {
    const amend = args.includes('--amend');
    const sign = args.includes('-S');
    const msgIndex = args.findIndex(arg => arg === '-m');
    const message = msgIndex >= 0 ? args[msgIndex + 1] : 'Update files';
    if (!Object.keys(repo.staged).length && !amend) {
      out.push('nothing to commit');
      return;
    }
    let files = { ...snapshot(repo) };
    Object.entries(repo.staged).forEach(([file, content]) => {
      if (content === null) delete files[file];
      else files[file] = content;
    });
    if (amend && repo.commits.length) {
      const last = headCommit(repo);
      last.message = message;
      last.files = files;
      repo.staged = {};
      repo.reflog.push(`${short(last.id)} commit (amend): ${message}`);
      out.push(`[${repo.currentBranch} ${short(last.id)}] ${message}${sign ? ' (signed)' : ''}`);
      return;
    }
    const id = commitId(repo.commits.length);
    repo.commits.push({ id, message, files, branch: repo.currentBranch, signed: sign });
    repo.branches[repo.currentBranch] = id;
    repo.files = { ...files };
    repo.staged = {};
    repo.reflog.push(`${short(id)} commit: ${message}`);
    out.push(`[${repo.currentBranch} ${short(id)}] ${message}${sign ? ' (signed)' : ''}`);
    return;
  }

  if (cmd === 'log') {
    if (!repo.commits.length) {
      out.push('No commits yet');
      return;
    }
    const commits = [...repo.commits].reverse();
    if (args.includes('--oneline')) {
      commits.forEach(commit => out.push(`${short(commit.id)} ${commit.message}`));
    } else if (args.includes('--show-signature')) {
      commits.forEach(commit => out.push(`commit ${commit.id}\nSignature: ${commit.signed ? 'Good simulated signature' : 'not signed'}\n    ${commit.message}`));
    } else {
      commits.forEach(commit => out.push(`commit ${commit.id}\nAuthor: ${repo.config['user.name'] || 'Learner'} <${repo.config['user.email'] || 'learner@example.com'}>\n\n    ${commit.message}`));
    }
    return;
  }

  if (cmd === 'show') {
    const ref = args[1] || 'HEAD';
    let commit = ref === 'HEAD' ? headCommit(repo) : repo.commits.find(item => item.id.startsWith(ref) || repo.tags[ref] === item.id || item.branch === ref);
    if (!commit && repo.branches[ref]) commit = repo.commits.find(item => item.id === repo.branches[ref]);
    out.push(commit ? `commit ${commit.id}\n    ${commit.message}\n\nFiles: ${Object.keys(commit.files).join(', ') || '(none)'}` : `fatal: ambiguous argument '${ref}'`);
    return;
  }

  if (cmd === 'branch') {
    if (args[1] === '-r') {
      out.push(repo.remoteBranches.length ? repo.remoteBranches.join('\n') : 'origin/main');
      return;
    }
    if (args[1] === '-d' && args[2]) {
      delete repo.branches[args[2]];
      out.push(`Deleted branch ${args[2]}`);
      return;
    }
    if (args[1]) {
      repo.branches[args[1]] = repo.branches[repo.currentBranch];
      out.push(`Created branch ${args[1]}`);
      return;
    }
    Object.keys(repo.branches).forEach(branch => out.push(`${branch === repo.currentBranch ? '*' : ' '} ${branch}`));
    return;
  }

  if (cmd === 'switch' || cmd === 'checkout') {
    const create = args.includes('-c') || args.includes('-b');
    const name = create ? args[args.findIndex(arg => arg === '-c' || arg === '-b') + 1] : args[1];
    if (!name) {
      out.push(`usage: git ${cmd} <branch>`);
      return;
    }
    if (name.startsWith('HEAD~')) {
      const steps = Number(name.slice(5) || '1');
      const idx = Math.max(0, repo.commits.length - 1 - steps);
      const commit = repo.commits[idx];
      if (commit) {
        repo.detached = true;
        repo.files = { ...commit.files };
        out.push(`HEAD is now at ${short(commit.id)} ${commit.message}`);
      }
      return;
    }
    if (create) {
      repo.branches[name] = repo.branches[repo.currentBranch];
      repo.currentBranch = name;
      repo.detached = false;
      out.push(`Switched to a new branch '${name}'`);
      return;
    }
    if (!repo.branches[name] && args[2]?.startsWith('origin/')) repo.branches[name] = repo.branches.main;
    if (!repo.branches[name] && name !== 'main') {
      out.push(`fatal: invalid reference: ${name}`);
      return;
    }
    repo.currentBranch = name;
    repo.detached = false;
    repo.files = { ...snapshot(repo) };
    out.push(`Switched to branch '${name}'`);
    return;
  }

  if (cmd === 'merge') {
    const branch = args[1];
    if (!repo.branches[branch]) {
      out.push(`merge: ${branch} - not something we can merge`);
      return;
    }
    const current = snapshot(repo);
    const incoming = repo.commits.find(commit => commit.id === repo.branches[branch])?.files || {};
    const conflict = Object.keys(incoming).find(file => current[file] !== undefined && current[file] !== incoming[file]);
    if (conflict) {
      repo.conflicts = [conflict];
      out.push(`CONFLICT (content): Merge conflict in ${conflict}`);
      out.push('Automatic merge failed; fix conflicts and then commit the result.');
      return;
    }
    repo.files = { ...current, ...incoming };
    Object.keys(incoming).forEach(file => { repo.staged[file] = incoming[file]; });
    runGit(repo, ['commit', '-m', `Merge branch '${branch}'`], out);
    return;
  }

  if (cmd === 'tag') {
    if (!args[1]) {
      out.push(Object.keys(repo.tags).join('\n') || '(no tags)');
      return;
    }
    const name = args[1] === '-a' ? args[2] : args[1];
    repo.tags[name] = repo.branches[repo.currentBranch];
    out.push(`Tagged ${short(repo.tags[name])} as ${name}`);
    return;
  }

  if (cmd === 'stash') {
    if (args[1] === 'list') {
      out.push(repo.stash.map((item, index) => `stash@{${index}}: ${item.message}`).join('\n') || '(no stash entries)');
      return;
    }
    if (args[1] === 'pop') {
      const item = repo.stash.shift();
      if (!item) out.push('No stash entries found.');
      else {
        repo.files = { ...repo.files, ...item.files };
        out.push('Applied stash@{0}');
      }
      return;
    }
    repo.stash.unshift({ message: `WIP on ${repo.currentBranch}`, files: { ...repo.files } });
    repo.files = { ...snapshot(repo) };
    repo.staged = {};
    out.push('Saved working directory and index state');
    return;
  }

  if (cmd === 'remote') {
    if (args[1] === 'add') {
      repo.remotes[args[2]] = args[3];
      out.push(`Added remote ${args[2]}`);
      return;
    }
    if (args[1] === '-v') {
      const remotes = Object.entries(repo.remotes);
      out.push(remotes.length ? remotes.map(([name, url]) => `${name}\t${url} (fetch)\n${name}\t${url} (push)`).join('\n') : '(no remotes)');
      return;
    }
  }

  if (cmd === 'push') {
    const remote = args.includes('-u') ? args[args.indexOf('-u') + 1] : (args[1] || 'origin');
    const branch = args.includes('-u') ? args[args.indexOf('-u') + 2] : (args[2] || repo.currentBranch);
    out.push(`Pushing ${repo.currentBranch} to ${remote}/${branch}`);
    out.push(`Branch '${branch}' set up to track '${remote}/${branch}'.`);
    if (!repo.remoteBranches.includes(`${remote}/${branch}`)) repo.remoteBranches.push(`${remote}/${branch}`);
    return;
  }

  if (cmd === 'fetch') {
    const remote = args[1] || 'origin';
    out.push(`Fetched updates from ${remote}`);
    if (!repo.remoteBranches.includes(`${remote}/main`)) repo.remoteBranches.push(`${remote}/main`);
    return;
  }

  if (cmd === 'pull') {
    const remote = args[1] || 'origin';
    const branch = args[2] || repo.currentBranch;
    out.push(`From ${remote}`);
    out.push(`Already up to date with ${remote}/${branch}.`);
    return;
  }

  if (cmd === 'restore') {
    const staged = args.includes('--staged');
    const file = args.find(arg => !arg.startsWith('-') && arg !== 'restore');
    if (!file) {
      out.push('usage: git restore [--staged] <file>');
      return;
    }
    if (staged) {
      delete repo.staged[file];
      out.push(`Unstaged ${file}`);
    } else {
      const base = snapshot(repo);
      if (base[file] === undefined) delete repo.files[file];
      else repo.files[file] = base[file];
      out.push(`Restored ${file}`);
    }
    return;
  }

  if (cmd === 'reset') {
    const mode = args.find(arg => arg.startsWith('--')) || '--mixed';
    const target = args[args.length - 1];
    if (target?.startsWith('HEAD~') && repo.commits.length > 1) {
      const steps = Number(target.slice(5) || '1');
      const idx = Math.max(0, repo.commits.length - 1 - steps);
      const commit = repo.commits[idx];
      repo.branches[repo.currentBranch] = commit.id;
      if (mode === '--hard') {
        repo.files = { ...commit.files };
        repo.staged = {};
      } else {
        repo.files = { ...headCommit(repo)?.files };
        if (mode === '--soft') Object.keys(repo.files).forEach(file => { repo.staged[file] = repo.files[file]; });
      }
      repo.reflog.push(`${short(commit.id)} reset: moving to ${target}`);
      out.push(`Reset ${mode} to ${short(commit.id)}`);
    } else {
      out.push('Nothing to reset in this simulation.');
    }
    return;
  }

  if (cmd === 'revert') {
    const last = headCommit(repo);
    if (!last) {
      out.push('nothing to revert');
      return;
    }
    repo.staged[`revert-${short(last.id)}.txt`] = `Reverted ${last.message}`;
    runGit(repo, ['commit', '-m', `Revert "${last.message}"`], out);
    return;
  }

  if (cmd === 'reflog') {
    out.push(repo.reflog.length ? [...repo.reflog].reverse().join('\n') : 'HEAD@{0}: repository created');
    return;
  }

  if (cmd === 'rebase') {
    const target = args[1] || 'main';
    out.push(`Successfully rebased ${repo.currentBranch} onto ${target}`);
    repo.reflog.push(`${short(repo.branches[repo.currentBranch])} rebase: ${target}`);
    return;
  }

  if (cmd === 'cherry-pick') {
    const ref = args[1];
    const commit = repo.commits.find(item => item.id.startsWith(ref) || item.branch === ref) || repo.commits.find(item => item.id === repo.branches[ref]);
    if (!commit) {
      out.push(`fatal: bad revision '${ref}'`);
      return;
    }
    repo.files = { ...repo.files, ...commit.files };
    Object.keys(commit.files).forEach(file => { repo.staged[file] = commit.files[file]; });
    runGit(repo, ['commit', '-m', `Cherry-pick ${commit.message}`], out);
    return;
  }

  if (cmd === 'mv') {
    const [from, to] = args.slice(1);
    if (repo.files[from] === undefined) {
      out.push(`fatal: bad source ${from}`);
      return;
    }
    repo.files[to] = repo.files[from];
    delete repo.files[from];
    repo.staged[from] = null;
    repo.staged[to] = repo.files[to];
    out.push(`renamed ${from} -> ${to}`);
    return;
  }

  if (cmd === 'rm') {
    const file = args[1];
    delete repo.files[file];
    repo.staged[file] = null;
    out.push(`rm '${file}'`);
    return;
  }

  if (cmd === 'lfs') {
    if (args[1] === 'install') out.push('Git LFS initialized.');
    if (args[1] === 'track') {
      repo.lfsPatterns.push(args[2]);
      repo.files['.gitattributes'] = `${args[2]} filter=lfs diff=lfs merge=lfs -text`;
      out.push(`Tracking ${args[2]}`);
    }
    return;
  }

  if (cmd === 'submodule') {
    if (args[1] === 'add') {
      repo.submodules.push({ url: args[2], path: args[3] });
      repo.files['.gitmodules'] = `[submodule "${args[3]}"]\n  path = ${args[3]}\n  url = ${args[2]}`;
      repo.files[args[3]] = `[submodule pointer: ${args[2]}]`;
      out.push(`Added submodule ${args[3]}`);
    }
    return;
  }

  out.push(`git: '${cmd}' is simulated as a no-op in this lesson`);
}

function simulateGit(script) {
  const repo = createRepo();
  const out = [];
  const lines = script.split(/\r?\n/);

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    out.push(`$ ${line}`);
    const args = parseArgs(line);
    const [cmd, ...rest] = args;
    if (cmd === 'git') {
      runGit(repo, rest, out);
    } else if (cmd === 'touch') {
      rest.forEach(file => { repo.files[file] = repo.files[file] || ''; });
      out.push(`created ${rest.join(', ')}`);
    } else if (cmd === 'edit') {
      const [file, content = ''] = rest;
      repo.files[file] = content;
      out.push(`edited ${file}`);
    } else if (cmd === 'append') {
      const [file, content = ''] = rest;
      repo.files[file] = `${repo.files[file] || ''}${content}`;
      out.push(`appended ${file}`);
    } else if (cmd === 'mkdir') {
      out.push(`created directory ${rest.join(', ')}`);
    } else if (cmd === 'ls') {
      out.push(Object.keys(repo.files).sort().join('\n') || '(empty)');
    } else if (cmd === 'cat') {
      const file = rest[0];
      out.push(repo.files[file] ?? `cat: ${file}: No such file`);
    } else if (cmd === 'rm') {
      rest.forEach(file => { delete repo.files[file]; });
      out.push(`removed ${rest.join(', ')}`);
    } else {
      out.push(`${cmd}: command not found in this Git playground`);
    }
    out.push('');
  }

  out.push('Repository state');
  out.push(`branch: ${repo.detached ? 'detached HEAD' : repo.currentBranch}`);
  out.push(`commits: ${repo.commits.length}`);
  out.push(`staged: ${Object.keys(repo.staged).length || 0}`);
  out.push(`files: ${Object.keys(repo.files).sort().join(', ') || '(none)'}`);
  return out.join('\n').trim();
}

function ChallengeWidget({ challenge }) {
  const [picked, setPicked] = useState(null);
  return (
    <div className={s.challenge}>
      <div className={s.challengeTitle}><span>Check</span></div>
      <div className={s.challengeQuestion}>{challenge.question}</div>
      <div className={s.challengeOptions}>
        {challenge.options.map((option, index) => {
          let cls = s.challengeBtn;
          if (picked !== null) {
            if (index === challenge.correct) cls += ' ' + s.challengeReveal;
            else if (index === picked) cls += ' ' + s.challengeWrong;
          }
          return (
            <button key={option} className={cls} onClick={() => picked === null && setPicked(index)}>
              {option}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <button className={s.challengeReset} onClick={() => setPicked(null)}>Try again</button>
      )}
    </div>
  );
}

function ConceptText({ text }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
        return part;
      })}
    </>
  );
}

function LineNums({ count, scrollRef }) {
  return (
    <div ref={scrollRef} className={s.lineNums} aria-hidden="true">
      {Array.from({ length: Math.max(count, 1) }, (_, i) => (
        <div key={i} className={s.lineNum}>{i + 1}</div>
      ))}
    </div>
  );
}

export default function GitPlaygroundTool() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [code, setCode] = useState(LESSONS[0].code);
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState(() => new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conceptOpen, setConceptOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState('');
  const [editorPct, setEditorPct] = useState(48);
  const [isDraggingHandle, setIsDraggingHandle] = useState(false);

  const lineNumsRef = useRef(null);
  const highlightRef = useRef(null);
  const workAreaRef = useRef(null);
  const isDragging = useRef(false);

  const lesson = LESSONS[activeIdx];
  const output = useMemo(() => simulateGit(code), [code]);
  const lineCount = useMemo(() => code.split('\n').length, [code]);
  const highlighted = useMemo(() => highlightShell(code), [code]);
  const completedCount = progress.size;
  const isDone = progress.has(lesson.id);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }, []);

  useEffect(() => {
    setProgress(readProgress());
    try {
      const urlCode = new URLSearchParams(window.location.search).get('c');
      if (urlCode) {
        setCode(decodeURIComponent(escape(atob(urlCode))));
        setHydrated(true);
        return;
      }
    } catch {}
    const saved = readPosition();
    if (saved > 0 && saved < LESSONS.length) {
      setActiveIdx(saved);
      setCode(LESSONS[saved].code);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
        setConceptOpen(false);
      }
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const selectLesson = useCallback((idx) => {
    setActiveIdx(idx);
    setCode(LESSONS[idx].code);
    savePosition(idx);
  }, []);

  const markDone = useCallback(() => {
    setProgress(prev => {
      const next = new Set(prev);
      if (next.has(lesson.id)) {
        const idx = LESSONS.findIndex(item => item.id === lesson.id);
        LESSONS.slice(idx).forEach(item => next.delete(item.id));
        showToast('Progress reset from here');
      } else {
        next.add(lesson.id);
        if (activeIdx < LESSONS.length - 1) selectLesson(activeIdx + 1);
        showToast('Lesson complete');
      }
      saveProgress(next);
      return next;
    });
  }, [activeIdx, lesson.id, selectLesson, showToast]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const el = event.target;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = code.slice(0, start) + '  ' + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2; });
    }
  }, [code]);

  const syncScroll = useCallback((event) => {
    if (lineNumsRef.current) lineNumsRef.current.scrollTop = event.target.scrollTop;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = event.target.scrollTop;
      highlightRef.current.scrollLeft = event.target.scrollLeft;
    }
  }, []);

  const copyCode = useCallback(async () => {
    try { await navigator.clipboard.writeText(code); showToast('Copied'); }
    catch { showToast('Copy failed'); }
  }, [code, showToast]);

  const resetCode = useCallback(() => {
    setCode(lesson.code);
    showToast('Commands reset');
  }, [lesson.code, showToast]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lesson.id}.sh`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded');
  }, [code, lesson.id, showToast]);

  const shareCode = useCallback(async () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(code)));
      const url = `${window.location.origin}/git-playground/?c=${encoded}`;
      await navigator.clipboard.writeText(url);
      showToast('Share link copied');
    } catch {
      showToast('Copy failed');
    }
  }, [code, showToast]);

  const copyOutput = useCallback(async () => {
    try { await navigator.clipboard.writeText(output); showToast('Output copied'); }
    catch { showToast('Copy failed'); }
  }, [output, showToast]);

  const startDrag = useCallback((event) => {
    event.preventDefault();
    if (!workAreaRef.current) return;
    isDragging.current = true;
    setIsDraggingHandle(true);
    const rect = workAreaRef.current.getBoundingClientRect();
    document.body.style.userSelect = 'none';

    const onMove = (moveEvent) => {
      if (!isDragging.current) return;
      const pct = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      setEditorPct(Math.max(32, Math.min(68, pct)));
    };
    const onUp = () => {
      isDragging.current = false;
      setIsDraggingHandle(false);
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  const filteredLessons = useMemo(() => {
    if (!search.trim()) return null;
    const query = search.toLowerCase();
    return LESSONS.filter(item => item.title.toLowerCase().includes(query) || item.chapter.toLowerCase().includes(query));
  }, [search]);

  if (!hydrated) return null;

  return (
    <div className={s.wrap}>
      <PlaygroundTopNav active="git-playground" />
      <header className={s.header}>
        <div className={s.headerLeft}>
          <img src="/icons/git-playground.svg" width={24} height={24} alt="" />
          <span className={s.headerTitle}>Git <span className={s.accent}>Playground</span></span>
          <span className={s.headerBreadcrumb}>{lesson.chapter} &rarr; {lesson.title}</span>
        </div>
        <div className={s.headerRight}>
          <span className={s.progressBadge}>{completedCount}/{LESSONS.length} lessons</span>
        </div>
      </header>

      <div className={s.body}>
        <aside className={sidebarOpen ? s.sidebar : s.sidebarHidden}>
          <div className={s.sidebarTop}>
            <div className={s.sidebarPill}>
              <span className={s.sidebarPillDot} />
              Git Playground
            </div>
            <button className={s.hideBtn} onClick={() => setSidebarOpen(false)} title="Hide sidebar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>

          <div className={s.searchWrap}>
            <input className={s.searchInput} value={search} onChange={event => setSearch(event.target.value)} placeholder="Search lessons..." />
          </div>

          <div className={s.progress}>
            <div className={s.progressLabel}>
              <span>Progress</span>
              <span>{completedCount} / {LESSONS.length}</span>
            </div>
            <div className={s.progressBar}>
              <div className={s.progressFill} style={{ width: `${(completedCount / LESSONS.length) * 100}%` }} />
            </div>
          </div>

          <div className={s.lessonList}>
            {filteredLessons ? (
              filteredLessons.length === 0
                ? <div style={{ padding: '12px', fontSize: 12, color: 'var(--text3)' }}>No lessons found</div>
                : filteredLessons.map(item => {
                    const idx = LESSONS.indexOf(item);
                    return (
                      <button
                        key={item.id}
                        className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`}
                        onClick={() => { selectLesson(idx); setSearch(''); }}
                      >
                        <span className={s.lessonDot} />{item.title}
                      </button>
                    );
                  })
            ) : (
              CHAPTERS.map(chapter => (
                <div key={chapter}>
                  <div className={s.chapterLabel}>{chapter}</div>
                  {LESSONS.filter(item => item.chapter === chapter).map(item => {
                    const idx = LESSONS.indexOf(item);
                    return (
                      <button
                        key={item.id}
                        className={`${s.lessonBtn} ${idx === activeIdx ? s.lessonBtnActive : ''} ${progress.has(item.id) ? s.lessonBtnDone : ''}`}
                        onClick={() => selectLesson(idx)}
                      >
                        <span className={s.lessonDot} />{item.title}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </aside>

        {!sidebarOpen && (
          <button className={s.reopenTab} onClick={() => setSidebarOpen(true)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            Lessons
          </button>
        )}

        <div className={s.main}>
          <PlaygroundTopAd />
          <div className={s.conceptPanel}>
            <div className={s.conceptHeader} onClick={() => setConceptOpen(open => !open)}>
              <div className={s.conceptTitle}>
                <span className={s.chapterTag}>{lesson.chapter}</span>
                {lesson.title}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${s.conceptChevron} ${conceptOpen ? s.conceptChevronOpen : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {conceptOpen && <div className={s.conceptBody}><ConceptText text={lesson.concept} /></div>}
          </div>

          <div ref={workAreaRef} className={s.workArea}>
            <div className={s.editorPane} style={isMobile ? {} : { flex: `0 0 ${editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Git commands</span>
                <div className={s.paneActions}>
                  <button className={s.iconBtn} onClick={resetCode} title="Reset commands">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                    </svg>
                    Reset
                  </button>
                  <button className={s.iconBtn} onClick={copyCode} title="Copy commands">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </button>
                  <button className={s.iconBtn} onClick={downloadCode} title="Download commands">
                    .sh
                  </button>
                  <button className={s.iconBtn} onClick={shareCode} title="Copy share link">
                    Share
                  </button>
                </div>
              </div>
              <div className={s.editorWrap}>
                <LineNums count={lineCount} scrollRef={lineNumsRef} />
                <div className={s.codeArea}>
                  <pre ref={highlightRef} className={s.highlight} aria-hidden="true" dangerouslySetInnerHTML={{ __html: highlighted + '\n' }} />
                  <textarea
                    className={s.editor}
                    value={code}
                    onChange={event => setCode(event.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={syncScroll}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                </div>
              </div>
            </div>

            <div className={`${s.dragHandle} ${isDraggingHandle ? s.dragHandleActive : ''}`} onMouseDown={startDrag} title="Drag to resize" />

            <div className={s.previewPane} style={isMobile ? {} : { flex: `0 0 ${100 - editorPct}%`, minWidth: 0 }}>
              <div className={s.paneHeader}>
                <span className={s.paneLabel}>Terminal output</span>
                <div className={s.paneActions}>
                  <button className={s.iconBtn} onClick={copyOutput} title="Copy output">
                    Copy output
                  </button>
                </div>
              </div>
              <pre className={s.previewFrame} style={{ margin: 0, padding: 14, overflow: 'auto', whiteSpace: 'pre-wrap', fontFamily: 'ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace', fontSize: 12, lineHeight: 1.5 }}>{output}</pre>
            </div>
          </div>

          {lesson.challenge && <ChallengeWidget key={lesson.id} challenge={lesson.challenge} />}

          <div className={s.navFooter}>
            <button className={s.navBtn} disabled={activeIdx === 0} onClick={() => selectLesson(activeIdx - 1)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </button>
            <div className={s.navCounter}>{activeIdx + 1} / {LESSONS.length}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className={`${s.doneBtn} ${isDone ? s.doneBtnComplete : ''}`} onClick={markDone}>
                {isDone ? 'Done' : 'Mark Done'}
              </button>
              <button className={s.navBtn} disabled={activeIdx === LESSONS.length - 1} onClick={() => selectLesson(activeIdx + 1)}>
                Next
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  );
}
