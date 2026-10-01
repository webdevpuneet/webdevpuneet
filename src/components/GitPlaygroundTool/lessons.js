export const LESSONS = [
  {
    id: 'what-is-git',
    chapter: 'Start Here',
    title: 'What Git Tracks',
    concept: 'Git stores snapshots of your project over time. The key idea is simple: you edit files in the working tree, stage selected changes, then commit a named snapshot. This playground simulates that workflow safely in the browser.',
    code: `git --version
git init
git status`,
    challenge: {
      question: 'What does a Git commit represent?',
      options: ['A saved snapshot of staged changes', 'A folder on GitHub', 'Only the latest file you edited', 'A command history line'],
      correct: 0,
    },
  },
  {
    id: 'install-version',
    chapter: 'Start Here',
    title: 'Version Check',
    concept: 'A real machine needs Git installed before commands work. `git --version` confirms the command is available. This simulator always returns a modern Git version so you can focus on the command flow.',
    code: `git --version
git help
git help status`,
  },
  {
    id: 'configure-identity',
    chapter: 'Start Here',
    title: 'Configure Identity',
    concept: 'Git records an author name and email on commits. In real projects, configure these once with `--global`. Repositories can also override identity locally.',
    code: `git config --global user.name "Puneet Sharma"
git config --global user.email "puneet@example.com"
git config --list`,
    challenge: {
      question: 'Why configure user.name and user.email?',
      options: ['So commits have an author identity', 'So Git can create folders', 'So branches merge automatically', 'So Git ignores files'],
      correct: 0,
    },
  },
  {
    id: 'init-repository',
    chapter: 'Start Here',
    title: 'Initialize a Repo',
    concept: '`git init` turns the current folder into a repository by creating Git metadata. After that, Git can compare your working files against the last committed snapshot.',
    code: `git init
touch README.md
git status`,
  },
  {
    id: 'working-tree',
    chapter: 'Files and Staging',
    title: 'Working Tree',
    concept: 'The working tree is the set of files you can see and edit. Git calls new files untracked until you stage them with `git add`.',
    code: `git init
edit index.html "<h1>Hello Git</h1>"
edit styles.css "body { font-family: system-ui; }"
git status`,
  },
  {
    id: 'git-add',
    chapter: 'Files and Staging',
    title: 'Stage Files',
    concept: '`git add` moves selected changes into the staging area. Staging lets you decide exactly what goes into the next commit.',
    code: `git init
edit index.html "<h1>Hello Git</h1>"
git status
git add index.html
git status`,
    challenge: {
      question: 'Which command stages a file for the next commit?',
      options: ['git add index.html', 'git save index.html', 'git stage --commit index.html', 'git upload index.html'],
      correct: 0,
    },
  },
  {
    id: 'add-all',
    chapter: 'Files and Staging',
    title: 'Stage Everything',
    concept: '`git add .` stages current-folder changes. `git add -A` stages all changes, including deletions. Use broad staging when you intentionally want one commit to include every current change.',
    code: `git init
edit index.html "<h1>Home</h1>"
edit app.js "console.log('ready')"
git add .
git status`,
  },
  {
    id: 'diff',
    chapter: 'Files and Staging',
    title: 'See Diffs',
    concept: '`git diff` shows unstaged edits. `git diff --staged` shows what is currently staged for commit. Checking diffs before committing prevents accidental changes.',
    code: `git init
edit README.md "Project v1"
git add README.md
git commit -m "Add readme"
edit README.md "Project v2"
git diff
git add README.md
git diff --staged`,
  },
  {
    id: 'commit',
    chapter: 'Commits',
    title: 'Create a Commit',
    concept: '`git commit -m "message"` saves staged changes with a message. Good commit messages describe the outcome, not every keystroke.',
    code: `git init
edit README.md "# Git Playground"
git add README.md
git commit -m "Add project readme"
git status`,
    challenge: {
      question: 'Can Git commit unstaged changes by default?',
      options: ['No, only staged changes are committed', 'Yes, Git commits all edits automatically', 'Only if the file is HTML', 'Only on the main branch'],
      correct: 0,
    },
  },
  {
    id: 'multiple-commits',
    chapter: 'Commits',
    title: 'Small Commits',
    concept: 'Small focused commits are easier to review, revert, and understand. Stage and commit one logical change at a time.',
    code: `git init
edit README.md "# App"
git add README.md
git commit -m "Add readme"
edit index.html "<main>Home</main>"
git add index.html
git commit -m "Add home page"
git log --oneline`,
  },
  {
    id: 'commit-amend',
    chapter: 'Commits',
    title: 'Amend Last Commit',
    concept: '`git commit --amend` replaces the latest commit with a corrected version. Use it before pushing when you forgot a small change or want to improve the message.',
    code: `git init
edit README.md "Git app"
git add README.md
git commit -m "Add docs"
edit README.md "Git app\\nUsage notes"
git add README.md
git commit --amend -m "Add readme with usage notes"
git log --oneline`,
  },
  {
    id: 'log',
    chapter: 'History',
    title: 'Read History',
    concept: '`git log` shows commit history. `--oneline` is compact and useful for finding commit ids for checkout, revert, reset, cherry-pick, and debugging.',
    code: `git init
edit README.md "Start"
git add README.md
git commit -m "Initial commit"
edit README.md "Start\\nMore details"
git add README.md
git commit -m "Expand docs"
git log
git log --oneline`,
  },
  {
    id: 'show',
    chapter: 'History',
    title: 'Show a Commit',
    concept: '`git show` inspects a commit. It is useful when you need to know exactly what changed before you revert or cherry-pick something.',
    code: `git init
edit README.md "v1"
git add README.md
git commit -m "Add readme"
edit README.md "v2"
git add README.md
git commit -m "Update readme"
git show HEAD`,
  },
  {
    id: 'checkout-old',
    chapter: 'History',
    title: 'Inspect Old Versions',
    concept: '`git checkout <commit>` can inspect an old snapshot. In modern Git, `switch` is preferred for branches and `restore` is preferred for files, but checkout still appears in many tutorials and projects.',
    code: `git init
edit app.js "console.log('v1')"
git add app.js
git commit -m "Version one"
edit app.js "console.log('v2')"
git add app.js
git commit -m "Version two"
git checkout HEAD~1
git status`,
  },
  {
    id: 'tags',
    chapter: 'History',
    title: 'Tags and Releases',
    concept: 'Tags name important commits, usually releases. Lightweight tags are simple labels. Annotated tags include a message and are better for public releases.',
    code: `git init
edit package.json "{ \\"version\\": \\"1.0.0\\" }"
git add package.json
git commit -m "Release 1.0.0"
git tag v1.0.0
git tag
git show v1.0.0`,
  },
  {
    id: 'create-branch',
    chapter: 'Branches',
    title: 'Create Branches',
    concept: 'A branch is a movable pointer to a commit. Branches let you work on a feature without disturbing `main`.',
    code: `git init
edit README.md "Main line"
git add README.md
git commit -m "Initial commit"
git branch feature/login
git branch`,
    challenge: {
      question: 'What is a Git branch?',
      options: ['A pointer to a commit line of work', 'A copy of GitHub', 'A hidden staging area', 'A commit message template'],
      correct: 0,
    },
  },
  {
    id: 'switch-branch',
    chapter: 'Branches',
    title: 'Switch Branches',
    concept: '`git switch branch-name` moves your working tree to another branch. `git switch -c name` creates and switches in one command.',
    code: `git init
edit README.md "Main"
git add README.md
git commit -m "Initial commit"
git switch -c feature/header
edit header.html "<header>Logo</header>"
git add header.html
git commit -m "Add header"
git branch`,
  },
  {
    id: 'merge-fast-forward',
    chapter: 'Branches',
    title: 'Fast-Forward Merge',
    concept: 'A fast-forward merge happens when the target branch has no new commits of its own. Git can simply move the branch pointer forward.',
    code: `git init
edit README.md "Main"
git add README.md
git commit -m "Initial commit"
git switch -c feature/footer
edit footer.html "<footer>Contact</footer>"
git add footer.html
git commit -m "Add footer"
git switch main
git merge feature/footer
git log --oneline`,
  },
  {
    id: 'merge-conflict',
    chapter: 'Branches',
    title: 'Merge Conflict',
    concept: 'A conflict happens when two branches change the same lines differently. Git stops and asks you to choose the final content, then stage and commit the resolved file.',
    code: `git init
edit README.md "Title: Main"
git add README.md
git commit -m "Initial title"
git switch -c feature/title
edit README.md "Title: Feature"
git add README.md
git commit -m "Change title on feature"
git switch main
edit README.md "Title: Main updated"
git add README.md
git commit -m "Change title on main"
git merge feature/title
git status`,
  },
  {
    id: 'delete-branch',
    chapter: 'Branches',
    title: 'Delete Branches',
    concept: 'After a branch has been merged, delete it to keep the branch list readable. Use `git branch -d name` for safe deletion.',
    code: `git init
edit README.md "Main"
git add README.md
git commit -m "Initial commit"
git switch -c cleanup
edit cleanup.txt "temporary"
git add cleanup.txt
git commit -m "Add cleanup note"
git switch main
git merge cleanup
git branch -d cleanup
git branch`,
  },
  {
    id: 'gitignore',
    chapter: 'Daily Workflow',
    title: '.gitignore',
    concept: 'A `.gitignore` file tells Git which generated or private files to ignore. Common examples: `node_modules/`, `.env`, build output, logs, and OS files.',
    code: `git init
edit .gitignore "node_modules/\\n.env\\ndist/"
edit .env "SECRET=demo"
edit app.js "console.log('safe file')"
git status
git add .
git status`,
    challenge: {
      question: 'Which file should usually be ignored?',
      options: ['.env with secrets', 'README.md', 'src/index.js', 'package.json'],
      correct: 0,
    },
  },
  {
    id: 'stash',
    chapter: 'Daily Workflow',
    title: 'Stash Work',
    concept: '`git stash` temporarily shelves uncommitted changes. Use it when you need to switch tasks without committing unfinished work.',
    code: `git init
edit app.js "console.log('v1')"
git add app.js
git commit -m "Add app"
edit app.js "console.log('unfinished')"
git status
git stash
git status
git stash list
git stash pop`,
  },
  {
    id: 'move-remove',
    chapter: 'Daily Workflow',
    title: 'Move and Remove',
    concept: '`git mv` stages a rename. `git rm` stages a tracked file deletion. You can also move files manually, then stage the result.',
    code: `git init
edit old-name.txt "content"
git add old-name.txt
git commit -m "Add file"
git mv old-name.txt new-name.txt
git status
git commit -m "Rename file"
git rm new-name.txt
git status`,
  },
  {
    id: 'clone',
    chapter: 'Remotes',
    title: 'Clone a Repository',
    concept: '`git clone <url>` copies an existing remote repository to your machine and sets `origin` automatically. This simulator creates a sample repo so you can see the shape.',
    code: `git clone https://github.com/example/site.git
git remote -v
git status`,
  },
  {
    id: 'remote-origin',
    chapter: 'Remotes',
    title: 'Add Origin',
    concept: 'A remote is a named URL for another copy of the repository. `origin` is the common default name for the main remote.',
    code: `git init
edit README.md "# Website"
git add README.md
git commit -m "Initial commit"
git remote add origin https://github.com/example/website.git
git remote -v`,
  },
  {
    id: 'push',
    chapter: 'Remotes',
    title: 'Push Changes',
    concept: '`git push` uploads local commits to a remote branch. `-u origin main` sets the upstream so future pushes can use just `git push`.',
    code: `git init
edit README.md "# Website"
git add README.md
git commit -m "Initial commit"
git remote add origin https://github.com/example/website.git
git push -u origin main`,
    challenge: {
      question: 'What does git push do?',
      options: ['Uploads local commits to a remote', 'Downloads remote commits only', 'Deletes the current branch', 'Stages every file'],
      correct: 0,
    },
  },
  {
    id: 'fetch-pull',
    chapter: 'Remotes',
    title: 'Fetch and Pull',
    concept: '`git fetch` downloads remote information without changing your working branch. `git pull` fetches and then merges or rebases into the current branch.',
    code: `git init
edit README.md "Local"
git add README.md
git commit -m "Initial commit"
git remote add origin https://github.com/example/website.git
git fetch origin
git pull origin main`,
  },
  {
    id: 'remote-branches',
    chapter: 'Remotes',
    title: 'Remote Branches',
    concept: 'Remote-tracking branches like `origin/main` show what Git last fetched from a remote. Create a local branch from them when you need to work on that line.',
    code: `git clone https://github.com/example/site.git
git branch -r
git switch -c feature/search origin/main
git branch`,
  },
  {
    id: 'fork-pr-workflow',
    chapter: 'GitHub Workflow',
    title: 'Fork and Pull Request',
    concept: 'On hosted platforms, a common open-source workflow is fork, clone your fork, create a branch, push it, then open a pull request. Git handles local history; the platform handles review.',
    code: `git clone https://github.com/yourname/project.git
git switch -c fix-navbar
edit navbar.css ".nav { gap: 12px; }"
git add navbar.css
git commit -m "Fix navbar spacing"
git push -u origin fix-navbar`,
  },
  {
    id: 'collaboration-sync',
    chapter: 'GitHub Workflow',
    title: 'Sync Before Work',
    concept: 'Before starting work, update your local branch from the remote. This reduces avoidable conflicts and keeps your feature branch based on recent code.',
    code: `git clone https://github.com/example/site.git
git switch main
git pull origin main
git switch -c feature/pricing
git status`,
  },
  {
    id: 'restore-file',
    chapter: 'Undo and Recovery',
    title: 'Restore a File',
    concept: '`git restore file` discards unstaged edits in a file. `git restore --staged file` removes it from staging without deleting your working changes.',
    code: `git init
edit README.md "Clean"
git add README.md
git commit -m "Add readme"
edit README.md "Broken draft"
git diff
git restore README.md
git status`,
  },
  {
    id: 'unstage',
    chapter: 'Undo and Recovery',
    title: 'Unstage Changes',
    concept: 'If you staged too much, use `git restore --staged file` to move a file back out of the staging area while keeping the edit.',
    code: `git init
edit README.md "Draft"
git add README.md
git status
git restore --staged README.md
git status`,
  },
  {
    id: 'reset',
    chapter: 'Undo and Recovery',
    title: 'Reset Commits',
    concept: '`git reset` moves the current branch pointer. `--soft` keeps changes staged, `--mixed` keeps changes unstaged, and `--hard` discards them. Be careful with shared history.',
    code: `git init
edit README.md "v1"
git add README.md
git commit -m "Version one"
edit README.md "v2"
git add README.md
git commit -m "Version two"
git reset --soft HEAD~1
git status`,
  },
  {
    id: 'revert',
    chapter: 'Undo and Recovery',
    title: 'Revert Safely',
    concept: '`git revert` creates a new commit that undoes another commit. It is safer than rewriting history after commits have been pushed.',
    code: `git init
edit config.txt "feature=true"
git add config.txt
git commit -m "Enable feature"
git revert HEAD
git log --oneline`,
    challenge: {
      question: 'Why is revert safer on shared branches?',
      options: ['It adds a new undo commit instead of rewriting history', 'It deletes every branch', 'It ignores staged files', 'It requires no commit history'],
      correct: 0,
    },
  },
  {
    id: 'reflog',
    chapter: 'Undo and Recovery',
    title: 'Recover with Reflog',
    concept: '`git reflog` records where branch tips and HEAD have been. When you reset or checkout the wrong thing, reflog often helps you find the lost commit.',
    code: `git init
edit README.md "v1"
git add README.md
git commit -m "Version one"
edit README.md "v2"
git add README.md
git commit -m "Version two"
git reset --hard HEAD~1
git reflog`,
  },
  {
    id: 'rebase',
    chapter: 'Advanced Git',
    title: 'Rebase a Branch',
    concept: '`git rebase main` replays your branch commits on top of `main`. It can make history linear, but avoid rebasing public commits that teammates already pulled.',
    code: `git init
edit README.md "base"
git add README.md
git commit -m "Base commit"
git switch -c feature/cards
edit cards.js "export const cards = []"
git add cards.js
git commit -m "Add cards module"
git switch main
edit README.md "base updated"
git add README.md
git commit -m "Update docs"
git switch feature/cards
git rebase main
git log --oneline`,
  },
  {
    id: 'cherry-pick',
    chapter: 'Advanced Git',
    title: 'Cherry Pick',
    concept: '`git cherry-pick <commit>` copies one commit onto the current branch. It is useful when one fix from another branch is needed without merging the whole branch.',
    code: `git init
edit README.md "base"
git add README.md
git commit -m "Base commit"
git switch -c hotfix
edit fix.txt "critical fix"
git add fix.txt
git commit -m "Fix production issue"
git switch main
git cherry-pick hotfix
git log --oneline`,
  },
  {
    id: 'hooks',
    chapter: 'Advanced Git',
    title: 'Hooks',
    concept: 'Git hooks run scripts at specific points such as before a commit or before a push. Teams use hooks to run formatting, linting, tests, or commit message checks.',
    code: `git init
edit .git/hooks/pre-commit "npm test"
git status
edit app.js "console.log('checked')"
git add app.js
git commit -m "Add checked app"`,
  },
  {
    id: 'submodules',
    chapter: 'Advanced Git',
    title: 'Submodules',
    concept: 'A submodule pins another Git repository inside your project. It is powerful for shared dependencies but adds workflow complexity, so use it only when a normal package dependency is not enough.',
    code: `git init
git submodule add https://github.com/example/theme.git themes/default
git status
git add .gitmodules themes/default
git commit -m "Add theme submodule"`,
  },
  {
    id: 'lfs',
    chapter: 'Advanced Git',
    title: 'Large Files',
    concept: 'Git is optimized for source code, not huge binary files. Git LFS stores large file contents separately while Git tracks pointer files.',
    code: `git init
git lfs install
git lfs track "*.psd"
edit design.psd "[large binary placeholder]"
git add .gitattributes design.psd
git commit -m "Track design file with LFS"`,
  },
  {
    id: 'signed-commits',
    chapter: 'Advanced Git',
    title: 'Signed Commits',
    concept: 'Signed commits prove that a commit was created by someone with a specific signing key. Hosted platforms can display verified badges for signed commits.',
    code: `git init
git config user.signingkey ABCD1234
edit README.md "Signed history"
git add README.md
git commit -S -m "Add signed readme"
git log --show-signature`,
  },
  {
    id: 'ci-cd',
    chapter: 'Advanced Git',
    title: 'CI/CD Trigger',
    concept: 'Git itself does not deploy apps, but platforms often trigger CI/CD from pushes and pull requests. The Git habit is: commit a focused change, push it, let automation test it.',
    code: `git init
mkdir .github
mkdir .github/workflows
edit .github/workflows/test.yml "name: Test\\non: [push]\\njobs: {}"
git add .github/workflows/test.yml
git commit -m "Add CI workflow"
git remote add origin https://github.com/example/site.git
git push -u origin main`,
  },
  {
    id: 'daily-cheatsheet',
    chapter: 'Practice',
    title: 'Daily Cheat Sheet',
    concept: 'Most daily Git work is a short loop: sync, branch, edit, stage, commit, push. Master that loop first, then add rebase, cherry-pick, reflog, and hooks when you need them.',
    code: `git clone https://github.com/example/site.git
git pull origin main
git switch -c feature/contact-form
edit contact.html "<form>Contact</form>"
git add contact.html
git commit -m "Add contact form"
git push -u origin feature/contact-form`,
  },
];

export const CHAPTERS = [...new Set(LESSONS.map(lesson => lesson.chapter))];
