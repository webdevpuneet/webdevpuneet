import GitPlaygroundTool from '@/components/GitPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Git Playground — Learn Git Visually, 43 Lessons Free | webdevpuneet.com',
  description: 'Learn Git online in a browser-based playground — init, commit, branch, merge conflicts, rebase, stash, and GitHub workflow. Free, no install needed.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/git-playground/' },
  icons: { icon: '/icons/git-playground.svg', shortcut: '/icons/git-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/git-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Git Playground - Learn Git Commands Online with 43 Interactive Lessons',
    description: 'Practice Git commands in a browser-safe terminal simulator. Learn staging, commits, branches, merge conflicts, remotes, GitHub workflow, undo, rebase, cherry-pick, hooks, LFS, and more.',
    images: [{ url: 'https://webdevpuneet.com/images/git-playground.png', width: 1200, height: 630, alt: 'Git Playground - 43 Interactive Lessons' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Git Playground - Learn Git Commands Online with 43 Interactive Lessons',
    description: 'Practice Git in your browser with guided lessons from git init to branches, merge conflicts, GitHub workflow, reset, revert, rebase, cherry-pick, hooks, and CI/CD.',
    images: ['https://webdevpuneet.com/images/git-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Do I need to install Git?', acceptedAnswer: { '@type': 'Answer', text: 'No. The Git Playground is a browser-based simulator. It teaches command flow and repository states without touching your real files or requiring Git installation.' } },
    { '@type': 'Question', name: 'Is this a real Git repository?', acceptedAnswer: { '@type': 'Answer', text: 'No. It is a teaching simulator that models common Git commands such as init, status, add, commit, branch, switch, merge, remote, push, pull, reset, revert, rebase, and cherry-pick. Use real Git locally for production work.' } },
    { '@type': 'Question', name: 'Does it cover GitHub workflow?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Lessons include clone, origin remotes, push, fetch, pull, remote branches, fork-style workflow, feature branches, and pull request preparation.' } },
    { '@type': 'Question', name: 'Can beginners use it?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The first lessons start with what Git tracks, version checks, configuration, init, status, staging, and commits before moving into branches, remotes, undo, and advanced commands.' } },
    { '@type': 'Question', name: 'Can I practice Git merge conflicts online?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Git Playground includes a merge conflict lesson that simulates two branches changing the same file differently, then shows Git stopping for conflict resolution.' } },
    { '@type': 'Question', name: 'Does it teach git reset, git revert, and git restore?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The undo and recovery chapter compares restore, unstage, reset, revert, amend, and reflog so learners understand which command is safe for each situation.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Git Playground',
  url: 'https://webdevpuneet.com/git-playground/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free interactive Git playground with 43 guided lessons and a browser-based terminal simulator for learning Git commands safely.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
  featureList: [
    '43 guided Git lessons across beginner to advanced topics',
    'Browser-safe Git terminal simulator',
    'Editable command scripts with instant output',
    'Lessons for init, status, add, commit, log, branches, merge conflicts, remotes, push, pull, undo, reset, revert, rebase, cherry-pick, hooks, submodules, LFS, signing, and CI/CD',
    'GitHub workflow practice for clone, origin, feature branches, push, pull, and pull request preparation',
    'Safe undo command practice for restore, reset, revert, amend, and reflog recovery',
    'Progress tracking via localStorage',
    'Share command snippets via URL',
    'No Git install, no terminal, no real filesystem changes',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Learn to Code', item: 'https://webdevpuneet.com/learn-to-code/' },
    { '@type': 'ListItem', position: 3, name: 'Git Playground', item: 'https://webdevpuneet.com/git-playground/' },
  ],
};

const seoData = {
  slug: 'git-playground',
  title: 'Git Playground - Learn Git Commands Online, Visually, and Safely',
  subtitle: 'Practice Git in your browser with 43 guided lessons, instant terminal output, repository-state feedback, GitHub workflow examples, merge conflict practice, and safe undo lessons. No install, no account, no real files changed.',
  about: {
    title: 'Learn Git Online with a Safe, Visual Git Terminal Simulator',
    description: `If you are searching for a Git tutorial that lets you actually practice commands, this Git Playground is built for that exact intent. Most Git lessons show a command, explain it once, and move on. But Git only starts to make sense when you can see what changed after each command: which files are untracked, which changes are staged, what the latest commit points to, which branch is active, and what happens when a merge cannot complete automatically.

This free Git Playground gives you an editable command script on the left and simulated terminal output on the right. Type commands like git init, git status, git add, git commit, git branch, git switch, git merge, git remote, git push, git pull, git reset, git revert, git rebase, and git cherry-pick. The simulator runs the command flow in the browser and prints command-style output plus a repository summary, so you can understand the result without installing Git or risking a real project.

The curriculum starts where beginners actually start: what Git tracks, how to check your Git version, how to configure your name and email, how to initialize a repository, and how to read git status. Then it moves through the core daily workflow: edit files, stage selected changes, review diffs, commit snapshots, write useful commit messages, amend the last commit, and inspect history with git log and git show. These lessons answer beginner searches like "how to use git add", "what is git status", "how to commit in git", and "what is the staging area".

Once the basics are clear, the playground focuses on the places where people usually get stuck. The branching chapter teaches git branch, git switch, feature branches, fast-forward merges, merge conflicts, and branch cleanup. The merge conflict lesson intentionally changes the same file on two branches so you can see why Git stops and asks for a human decision. That makes searches like "git merge conflict example", "how to resolve git conflict", and "git branch tutorial" practical instead of abstract.

The GitHub workflow lessons cover the commands developers use on real teams: git clone, git remote add origin, git remote -v, git push -u origin main, git fetch, git pull, remote branches, feature branches, fork-style contribution, and pull request preparation. You will see how local Git history connects to hosted repositories without needing a GitHub account for the lesson.

The undo and recovery section is designed for high-intent searches because these commands are easy to misuse. You can compare git restore, git restore --staged, git reset --soft, git reset --hard, git revert, git commit --amend, and git reflog in a safe environment. The goal is not just to memorize commands, but to understand which one preserves history, which one rewrites history, and which one can discard work.

Advanced lessons go beyond beginner Git tutorials: rebase, cherry-pick, hooks, submodules, Git LFS, signed commits, and CI/CD triggers. These lessons help bridge the gap between "I can commit code" and "I can work confidently in a professional repository".

The examples are inspired by common Git learning paths, including the W3Schools Git tutorial structure, but the explanations, simulator behavior, and lesson flow are original to webdevpuneet.com. Use it as a Git commands practice environment, a beginner Git tutorial, a GitHub workflow trainer, or a safe refresher before running a risky command in your real repo.`,
  },
  features: [
    '43 guided Git lessons from beginner commands to professional workflows — part of the same no-install series as the [JavaScript](/js-playground) and [SQL](/sql-playground) playgrounds',
    'Interactive Git command editor with instant simulated terminal output',
    'Repository state summary after every run: branch, commits, staged changes, and files',
    'Beginner Git basics: git version, config, init, status, add, diff, commit, log, show, checkout, and tags',
    'Branching and merging: branch, switch, fast-forward merge, merge conflicts, and branch deletion',
    'GitHub workflow practice: clone, origin, remote -v, push, fetch, pull, remote branches, fork workflow, and pull request preparation',
    'Safe undo lessons: restore, unstage, reset, revert, commit amend, and reflog recovery',
    'Advanced Git: rebase, cherry-pick, hooks, submodules, Git LFS, signed commits, and CI/CD triggers',
    'Daily workflow lessons for .gitignore, stash, git mv, git rm, and small focused commits',
    'Quick Check questions for important Git concepts',
    'Progress saved locally in the browser with no account',
    'Share and download Git command snippets',
    'No Git install, no terminal, no real filesystem changes',
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Start with the Git basics', text: 'Begin with What Git Tracks, Version Check, Configure Identity, Initialize a Repo, Working Tree, Stage Files, and Create a Commit. These lessons build the mental model behind the working tree, staging area, and commit history.' },
      { title: 'Run and edit command scripts', text: 'Each lesson loads a short Git command script. Change filenames, commit messages, branch names, remote names, or command order. The terminal output updates instantly from the browser simulator.' },
      { title: 'Read the repository state after every run', text: 'The output ends with a repository summary showing the current branch, commit count, staged changes, and files. Use this state summary to connect each command with its effect.' },
      { title: 'Practice branches and merge conflicts', text: 'Move into the Branches chapter to create feature branches, switch between them, merge them, and trigger a simulated conflict. This is the fastest way to understand why conflicts happen.' },
      { title: 'Learn GitHub workflow commands', text: 'Use the Remotes and GitHub Workflow chapters to practice clone, remote add origin, push, fetch, pull, remote branches, feature branches, and pull request preparation.' },
      { title: 'Use undo lessons before touching a real repo', text: 'Before running reset, revert, restore, amend, or reflog commands in a production repository, practice the lesson version here and compare what each command changes.' },
      { title: 'Mark lessons done and resume later', text: 'Use Mark Done to track progress. Completion and current lesson position are saved locally in your browser.' },
    ],
  },
  useCases: [
    { icon: 'GIT', title: 'Learn Git before using it on real files', desc: 'Practice commands in a safe browser simulator before running reset, merge, revert, rebase, or cherry-pick on a real repository. This is useful for beginners who are nervous about breaking project history.' },
    { icon: 'CMD', title: 'Practice Git commands online without installing anything', desc: 'Use the page as an online Git command practice tool. Edit git init, status, add, commit, branch, switch, merge, remote, push, pull, and log examples and see realistic terminal-style output. GitHub Actions cron schedules pair well with the [cron expression builder](https://fwdtools.com/cron-expression-builder).' },
    { icon: 'BR', title: 'Understand branches and merge conflicts', desc: 'See how feature branches, fast-forward merges, conflicting file edits, and branch cleanup fit together. The merge conflict lesson makes the conflict state visible instead of hiding it behind theory.' },
    { icon: 'GH', title: 'Prepare for GitHub collaboration', desc: 'Practice clone, origin, remote -v, push -u, fetch, pull, remote branches, fork workflow, feature branches, and pull request preparation before joining a team repository.' },
    { icon: 'UNDO', title: 'Learn undo commands safely', desc: 'Compare restore, unstage, reset, revert, amend, and reflog without risking project history. This helps answer the common question: should I use git reset or git revert?' },
    { icon: 'PRO', title: 'Move from beginner Git to professional workflow', desc: 'After the basics, work through rebase, cherry-pick, hooks, submodules, Git LFS, signed commits, and CI/CD triggers so Git feels useful in real development work.' },
  ],
  faqs: [
    { q: 'Do I need to install Git to use this Git Playground?', a: 'No. This is a browser-based Git simulator for learning command flow and repository states. It does not require Git, GitHub, Node.js, VS Code, a terminal, or a local project folder.' },
    { q: 'Does this run real Git commands?', a: 'No. It simulates common Git commands safely in JavaScript. That means you can practice risky commands like reset, revert, merge, rebase, and cherry-pick without changing real files. Use real Git locally when working on production repositories.' },
    { q: 'Is this Git tutorial good for beginners?', a: 'Yes. The first chapters explain what Git tracks, how git status works, how to stage files, how to commit, how to read history, and how branches work. Later chapters move into remotes, GitHub workflow, undo commands, and advanced Git.' },
    { q: 'Can I practice Git merge conflicts online?', a: 'Yes. The merge conflict lesson creates two branches that edit the same file differently. The simulator then shows Git stopping with a conflict, which helps you understand why conflicts happen and what resolution means.' },
    { q: 'Does it teach GitHub workflow?', a: 'Yes. It covers clone, origin, remote -v, push, fetch, pull, remote branches, fork-style workflow, feature branches, and pull request preparation.' },
    { q: 'What is the difference between git reset and git revert?', a: 'The undo chapter demonstrates the difference safely. In general, reset moves branch history and can discard or unstage work depending on the mode. Revert creates a new commit that undoes an earlier commit, which is safer on shared branches.' },
    { q: 'Does it cover git stash?', a: 'Yes. The daily workflow chapter includes stash, stash list, and stash pop so you can see how temporary unfinished work is saved and restored.' },
    { q: 'Does it cover advanced Git commands?', a: 'Yes. Advanced lessons include rebase, cherry-pick, hooks, submodules, Git LFS, signed commits, and CI/CD triggers.' },
    { q: 'Will my commands or progress be uploaded?', a: 'No. Lesson progress is saved locally in your browser. Share links encode the current command script in the URL; the simulator does not upload your commands to a server.' },
    { q: 'Can I use this as a Git cheat sheet?', a: 'Yes. The lesson list works like a guided Git cheat sheet: basics, commits, history, branches, remotes, GitHub workflow, undo, recovery, and advanced commands are grouped by task.' },
  ],
  links: [
    { label: 'JavaScript Playground', href: '/js-playground/', desc: 'Learn the language used to build browser tooling and interactive apps.' },
    { label: 'TypeScript Playground', href: '/typescript-playground/', desc: 'Add types to your JavaScript knowledge after you are comfortable with Git workflow.' },
    { label: 'Node.js Playground', href: '/nodejs-playground/', desc: 'Understand event loop behavior before building backend tools.' },
    { label: 'Express.js Playground', href: '/express-playground/', desc: 'Practice API routes after you understand Git and JavaScript basics.' },
    { label: 'React Playground', href: '/react-playground/', desc: 'Learn component development and use Git workflow to manage UI changes.' },
    { label: 'Git tutorial reference', href: 'https://www.w3schools.com/git/default.asp', desc: 'External Git tutorial path used as a topic reference.' },
  ],
};

export default function GitPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <GitPlaygroundTool />
      </div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
