'use client';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import styles from './styles.module.css';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';

// ── Scoring Engine ──────────────────────────────────────────────────────────
const DIMENSIONS = [
  { key: 'role',        label: 'Role / Persona',  color: '#818cf8' },
  { key: 'task',        label: 'Task Clarity',    color: '#34d399' },
  { key: 'format',      label: 'Output Format',   color: '#60a5fa' },
  { key: 'context',     label: 'Context',         color: '#f59e0b' },
  { key: 'constraints', label: 'Constraints',     color: '#f472b6' },
  { key: 'examples',    label: 'Examples',        color: '#a78bfa' },
  { key: 'audience',    label: 'Audience',        color: '#38bdf8' },
  { key: 'tone',        label: 'Tone',            color: '#4ade80' },
];

// Quick-fix snippets appended when user clicks "Add" on a weak dimension
const DIM_FIXES = {
  role:        'You are an expert [role] with deep experience in [domain].\n\n',
  task:        'Write / Analyze / Create / Explain: ',
  format:      '\n\nFormat your response as a [numbered list / markdown / JSON / table].',
  context:     '\n\nContext: [describe your situation, goal, or why this matters].',
  constraints: '\n\nConstraints:\n- Must [requirement]\n- Avoid [what to exclude]\n- Limit to [length or scope]',
  examples:    '\n\nExample:\nInput: [sample input]\nExpected output: [what good output looks like]',
  audience:    '\n\nAudience: Write for non-technical readers / developers / beginners. [Describe their role, expertise level, and background knowledge.]',
  tone:        '\n\nTone: [formal / casual / technical / conversational / direct].',
};

// What to add for each weak dimension — shown as tooltip
const DIM_TIPS = {
  role:        'Add a role: "You are a senior [X] with expertise in [Y]."',
  task:        'Add a clear action verb: Write, Analyze, Create, Explain, List, Compare.',
  format:      'Specify output format: numbered list, JSON, markdown, table, or word count.',
  context:     'Add background: why you need this, what the situation is, what you already know.',
  constraints: 'Add limits: must/must not, avoid, only, maximum length, scope boundaries.',
  examples:    'Add an example input/output pair to show the model what good looks like.',
  audience:    'Specify who will read this: "for non-technical managers", "for senior engineers".',
  tone:        'Specify the voice: formal, casual, technical, conversational, authoritative.',
};

function scorePrompt(text) {
  const t = text.toLowerCase();
  const len = text.trim().length;
  if (len < 5) return { total: 0, dims: Object.fromEntries(DIMENSIONS.map(d => [d.key, 0])) };

  const role = (() => {
    let s = 0;
    if (/\byou are\b|\bact as\b|\bas a\b|\byou're a\b|\byour role\b|\bpretend\b/.test(t)) s += 7;
    if (/\bexpert\b|\bspecialist\b|\bprofessional\b|\bsenior\b|\bwith \d+ years?\b/.test(t)) s += 3;
    return Math.min(10, s);
  })();

  const task = (() => {
    let s = 0;
    if (/\b(write|create|generate|analyze|analyse|summarize|summarise|explain|describe|list|compare|review|evaluate|design|build|draft|outline|translate|convert|extract|identify|suggest|recommend|improve|fix|debug|refactor|optimize|calculate|find|research|plan|give|show|help)\b/.test(t)) s += 6;
    if (len > 100) s += 2;
    if (len > 200) s += 2;
    return Math.min(10, s);
  })();

  const format = (() => {
    let s = 0;
    if (/\bmarkdown\b|\bjson\b|\bxml\b|\bhtml\b|\bcsv\b|\byaml\b/.test(t)) s += 4;
    if (/\blist\b|\bbullet\b|\bnumbered\b|\bsteps?\b|\btable\b/.test(t)) s += 3;
    if (/\b\d+ words?\b|\b\d+ sentences?\b|\bshort\b|\bbrief\b|\bdetailed\b|\bcomprehensive\b/.test(t)) s += 3;
    return Math.min(10, s);
  })();

  const context = (() => {
    let s = 0;
    if (/\bcontext\b|\bbackground\b|\bsituation\b|\bpurpose\b/.test(t)) s += 4;
    if (/\bi (am|need|want|have|work|am working)\b|\bwe (are|need|want|have)\b/.test(t)) s += 3;
    if (/\bbecause\b|\bsince\b|\bso that\b|\bin order to\b/.test(t)) s += 3;
    return Math.min(10, s);
  })();

  const constraints = (() => {
    let s = 0;
    if (/\bmust\b|\bshould not\b|\bdon't\b|\bdo not\b|\bwithout\b|\bavoid\b/.test(t)) s += 4;
    if (/\bonly\b|\bno more than\b|\bmaximum\b|\bminimum\b|\blimit\b|\bwithin\b/.test(t)) s += 3;
    if (/\bexclude\b|\bfocus on\b|\bstrictly\b|\bexclusively\b/.test(t)) s += 3;
    return Math.min(10, s);
  })();

  const examples = (() => {
    let s = 0;
    if (/\bfor example\b|\be\.g\b|\bsuch as\b|\bfor instance\b/.test(t)) s += 5;
    if (/\bexample:\b|\blike this\b|\bsample\b|\bfollowing format\b/.test(t)) s += 3;
    if ((text.match(/["'`][^"'`]{10,}["'`]/g) || []).length > 0) s += 2;
    return Math.min(10, s);
  })();

  const audience = (() => {
    let s = 0;
    if (/\bfor beginners?\b|\bfor (non-)?technical\b|\bfor experts?\b|\bfor developers?\b|\bfor (the )?(readers?|users?|audience)\b/.test(t)) s += 6;
    if (/\bwho (are|is|have)\b|\bwith no (experience|background|knowledge)\b|\bfamiliar with\b/.test(t)) s += 4;
    return Math.min(10, s);
  })();

  const tone = (() => {
    let s = 0;
    if (/\bformal\b|\bcasual\b|\bprofessional\b|\bfriendly\b|\bhumorous\b|\bserious\b|\bdirect\b/.test(t)) s += 5;
    if (/\btechnical\b|\bsimple\b|\bconversational\b|\bacademic\b|\bcreative\b/.test(t)) s += 3;
    if (/\bpersuasive\b|\bempathetic\b|\bauthoritative\b|\bencouraging\b/.test(t)) s += 2;
    return Math.min(10, s);
  })();

  const dims = { role, task, format, context, constraints, examples, audience, tone };
  const total = Math.round(Object.values(dims).reduce((a, b) => a + b, 0) / 8);
  return { total, dims };
}

// ── Anti-Pattern Detector ───────────────────────────────────────────────────
const ANTI_PATTERNS = [
  {
    id: 'too_short',
    label: 'Prompt too short',
    desc: 'Under 60 characters — add context, a role, constraints, or format requirements to get better results.',
    check: (t) => t.trim().length > 0 && t.trim().length < 60,
  },
  {
    id: 'vague',
    label: 'Vague language detected',
    desc: 'Words like "good", "nice", "something", "a bit" are ambiguous. Replace with specific, measurable terms.',
    check: (t) => /\b(good|nice|something|a bit|kind of|sort of|maybe|basically|stuff|things)\b/i.test(t),
  },
  {
    id: 'filler',
    label: 'Starts with filler words',
    desc: '"Please", "Can you", "Could you" add no meaning — lead with a strong action verb instead.',
    check: (t) => /^\s*(please|can you|could you|i want you to|kindly|would you|i need you to)/i.test(t),
  },
  {
    id: 'contradiction',
    label: 'Contradictory instructions',
    desc: 'Instructions like "concise but comprehensive" or "brief but detailed" conflict — pick one.',
    check: (t) => /(concise but (comprehensive|detailed|thorough))|(brief but (exhaustive|complete|thorough))|(short but (long|detailed|comprehensive))/i.test(t),
  },
  {
    id: 'no_verb',
    label: 'No clear action verb',
    desc: 'Add an explicit action: Write, Create, Explain, Analyze, List, Compare, Review, Generate.',
    check: (t) => t.trim().length > 30 && !/\b(write|create|generate|analyze|analyse|summarize|summarise|explain|describe|list|compare|review|evaluate|design|build|draft|outline|translate|convert|extract|identify|suggest|recommend|improve|fix|debug|refactor|optimize|calculate|find|research|plan|give|show|tell|help|make|provide)\b/i.test(t),
  },
  {
    id: 'no_format',
    label: 'No output format specified',
    desc: 'Tell the model how to format the output — bullet list, JSON, markdown, word count, numbered steps.',
    check: (t) => t.trim().length > 60 && !/\b(list|bullet|numbered|steps?|table|json|markdown|html|csv|paragraph|sentences?|words?|format|structure|outline|heading|section)\b/i.test(t),
  },
];

function detectAntiPatterns(text) {
  return ANTI_PATTERNS.filter(p => p.check(text));
}

// ── Auto-Improve ─────────────────────────────────────────────────────────────
function improvePrompt(text) {
  let t = text.trim();
  if (!t) return t;

  // Remove filler starts
  t = t.replace(/^(please |can you |could you |kindly |i want you to |would you |i need you to )/i, '');
  t = t.charAt(0).toUpperCase() + t.slice(1);

  // Add role if missing
  if (!/\byou are\b|\bact as\b|\byou're a\b/i.test(t)) {
    t = `You are a knowledgeable expert.\n\n${t}`;
  }

  // Add output format if missing
  if (!/\b(list|bullet|numbered|steps?|table|json|markdown|format|structure|outline|heading|section)\b/i.test(t)) {
    t += '\n\nFormat your response as a structured, numbered list with a clear heading for each section.';
  }

  // Add constraints if missing
  if (!/\b(must|should not|don't|do not|avoid|without|only|limit|maximum|minimum|focus on)\b/i.test(t)) {
    t += '\n\nBe specific and actionable — avoid generic advice. Focus only on what is directly asked.';
  }

  return t;
}

// ── Model Optimizer ─────────────────────────────────────────────────────────
function optimizeForModel(text, model) {
  if (!text.trim()) return '';
  const trimmed = text.trim();

  if (model === 'claude') {
    const hasRole = /\byou are\b|\bact as\b/i.test(trimmed);
    const fmtMatch = trimmed.match(/\b(json|markdown|bullet list|numbered list|table|html|csv|plain text|xml)\b/i);
    let out = '';
    if (hasRole) {
      const roleMatch = trimmed.match(/(you are[^.!?\n]+[.!?\n])/i);
      if (roleMatch) out += `<role>\n${roleMatch[1].trim()}\n</role>\n\n`;
    }
    out += `<instructions>\n${trimmed}\n</instructions>`;
    if (fmtMatch) out += `\n\n<output_format>\n${fmtMatch[0]}\n</output_format>`;
    return out;
  }

  if (model === 'chatgpt') {
    const hasRole = /\byou are\b|\bact as\b/i.test(trimmed);
    const prefix = hasRole ? '' : 'You are a knowledgeable and precise assistant.\n\n';
    const sentences = trimmed.split(/(?<=[.!?])\s+/);
    if (sentences.length >= 3) {
      return `${prefix}**Task:**\n${trimmed}\n\n**Instructions:**\n1. Read the task carefully before responding\n2. Structure your response clearly with headers if needed\n3. Be specific and actionable — avoid generic advice\n\n**Format:** Provide a well-organized, complete response.`;
    }
    return `${prefix}${trimmed}\n\nProvide a clear, structured, and actionable response.`;
  }

  if (model === 'gemini') {
    return `${trimmed}\n\nThink step by step before answering. Consider edge cases and alternative perspectives.\n\n**Output format:** Organize your response with clear sections and headers where appropriate. Begin with a concise summary (2-3 sentences), then elaborate with supporting details and specific examples.`;
  }

  return trimmed;
}

// ── Templates ───────────────────────────────────────────────────────────────
const TEMPLATES = [
  { id: 't1',  cat: 'Coding',   title: 'Code Review',          prompt: `You are a senior software engineer with 10+ years of experience reviewing production code.\n\nReview the following code and provide structured feedback:\n- Bugs and potential runtime errors (with line references)\n- Security vulnerabilities (injection, auth, data exposure)\n- Performance bottlenecks\n- Readability and maintainability issues\n- Better patterns or modern alternatives\n\nFormat each issue as: [Severity: Critical/High/Medium/Low] → Problem → Suggested fix\n\n[paste code here]` },
  { id: 't2',  cat: 'Coding',   title: 'Explain Code',         prompt: `Explain the following code to a developer who is new to this language or framework.\n\nCover:\n1. What the code does (2-3 sentences)\n2. How it works step by step\n3. Key concepts or patterns used\n4. Any gotchas, edge cases, or non-obvious behavior\n\nUse clear language, short paragraphs, and define any jargon you use.\n\n[paste code here]` },
  { id: 't3',  cat: 'Coding',   title: 'Debug Error',          prompt: `You are an expert debugger. I'm getting this error:\n\n[paste error message]\n\nRelevant code:\n\n[paste code]\n\nPlease:\n1. Explain the root cause of this error\n2. Show the corrected code with comments on what changed\n3. Explain why the fix works\n4. Mention any related issues to watch for` },
  { id: 't4',  cat: 'Coding',   title: 'Write Unit Tests',     prompt: `You are a QA engineer who writes thorough, readable unit tests.\n\nWrite tests for:\n\n[paste function/component]\n\nRequirements:\n- Cover: happy path, edge cases, error cases, boundary values\n- Test names follow "it should..." convention\n- Mock external dependencies properly\n- Each test verifies exactly one behavior\n- Framework: [Jest / Vitest / Pytest — specify]\n\nAdd a brief comment above each test group explaining what is being validated.` },
  { id: 't5',  cat: 'Coding',   title: 'Refactor Code',        prompt: `You are a senior engineer focused on clean, maintainable code.\n\nRefactor the following code to improve:\n- Readability (clear variable and function names)\n- Performance (eliminate redundant operations, early returns)\n- Structure (SOLID principles, separation of concerns)\n\nDo not change behavior or output. After the refactored code, explain each change in a bulleted list and why it is an improvement.\n\n[paste code]` },
  { id: 't6',  cat: 'Coding',   title: 'REST API Design',      prompt: `You are a backend architect specializing in RESTful API design.\n\nDesign a REST API for: [describe the feature or resource]\n\nInclude for each endpoint:\n- HTTP method + path\n- Request body schema (JSON)\n- Response schema with status codes\n- Error response format\n\nAlso cover:\n- Authentication approach (JWT / API key / OAuth)\n- Pagination strategy\n- Rate limiting recommendation\n\nFormat as a structured API reference document.` },
  { id: 't7',  cat: 'Writing',  title: 'Blog Post',            prompt: `You are an expert content writer who creates engaging, search-optimized articles.\n\nWrite a blog post about: [topic]\nTarget audience: [describe readers]\nTone: conversational but authoritative\nLength: approximately 800 words\n\nStructure:\n- Compelling H1 headline with target keyword\n- Hook opening (stat, question, or bold claim)\n- 3-4 H2 sections with practical content\n- Specific examples or data — avoid generic advice\n- Conclusion with one clear takeaway and call to action` },
  { id: 't8',  cat: 'Writing',  title: 'Professional Email',   prompt: `Write a professional email:\n\nSender: [name/role]\nRecipient: [name/role]\nPurpose: [what needs to be accomplished]\nKey points: [list them]\nTone: [formal/professional/casual]\n\nRequirements:\n- Subject line that gets opened\n- Body under 200 words\n- One clear call to action\n- Professional closing\n\nProvide 2 subject line options.` },
  { id: 't9',  cat: 'Writing',  title: 'Product Description',  prompt: `You are a conversion copywriter.\n\nWrite a product description for: [product name]\nKey features: [list 3-5]\nTarget customer: [describe them — their job, pain point]\nPrimary benefit: [the #1 value this delivers]\n\nFormat:\n- Benefit-focused headline (not feature-focused)\n- 2-sentence opening that addresses the customer's pain\n- 4-6 feature bullets framed as benefits\n- Closing with social proof or urgency\n\nAvoid "high quality", "best in class", or any filler superlatives.` },
  { id: 't10', cat: 'Writing',  title: 'LinkedIn Post',        prompt: `Write a LinkedIn post about: [topic / achievement / lesson learned]\n\nTone: professional but human — real, not corporate\nLength: 150-250 words\n\nStructure:\n- Strong first line (no "I'm excited to share")\n- Personal story or specific observation\n- Key insight or lesson\n- One actionable takeaway for the reader\n- Low-key call to action (question or comment invite)\n\nAvoid: buzzwords, excessive emojis, generic motivational language.` },
  { id: 't11', cat: 'Analysis', title: 'Competitive Analysis', prompt: `You are a business analyst with expertise in market research.\n\nAnalyze the competitive landscape for: [company or product] in [industry]\n\nProvide:\n1. Top 4-5 direct competitors with brief description\n2. Feature comparison table (key dimensions as rows, competitors as columns)\n3. Pricing comparison\n4. Market gaps and opportunities not addressed by current players\n5. Recommended differentiation strategy with rationale` },
  { id: 't12', cat: 'Analysis', title: 'Data Interpretation',  prompt: `Analyze the following data and extract actionable insights:\n\n[paste data or describe the dataset]\n\nProvide:\n1. Key trends and patterns (3-5 bullet points)\n2. Outliers or anomalies with possible explanations\n3. 2-3 concrete, actionable conclusions\n4. What additional data would strengthen or change this analysis\n5. Caveats or limitations in interpreting this dataset` },
  { id: 't13', cat: 'Analysis', title: 'SWOT Analysis',        prompt: `Perform a SWOT analysis for: [company / product / project]\n\nContext: [2-3 sentences of background]\n\n**Strengths** (internal positives): 4-6 specific items\n**Weaknesses** (internal negatives): 4-6 specific items\n**Opportunities** (external positives): 4-6 specific items\n**Threats** (external negatives): 4-6 specific items\n\nConclude with 2-3 strategic recommendations that leverage strengths to capture opportunities or mitigate threats.` },
  { id: 't14', cat: 'Analysis', title: 'Root Cause Analysis',  prompt: `You are a senior engineering or operations analyst.\n\nPerform a root cause analysis for: [describe the problem or incident]\n\nTimeline: [brief sequence of events]\n\nUse the 5-Whys method to trace the root cause, then provide:\n- Root cause statement\n- Contributing factors\n- Immediate fixes (stop the bleeding)\n- Long-term preventive measures\n- Metrics to monitor going forward\n\nFormat as a structured incident report.` },
  { id: 't15', cat: 'Creative', title: 'Story Opening',        prompt: `Write an opening scene for a [genre] story.\n\nSetting: [time period and place]\nMain character: [brief description]\nOpening situation: [what is happening as the story begins]\nMood/tone: [dark/hopeful/tense/whimsical — choose one]\n\nRequirements:\n- Hook in the first sentence\n- Show don't tell — sensory details only\n- Establish character voice through action and observation\n- End on tension or an unanswered question\n- Length: 250-350 words` },
  { id: 't16', cat: 'Creative', title: 'Character Profile',    prompt: `Create a detailed character profile for a [genre] story.\n\nInclude:\n**Identity:** Name, age, physical description (3-4 distinctive traits)\n**Background:** Origin in 2-3 sentences\n**Psychology:** Core motivation, greatest fear, fatal flaw, hidden strength\n**Role:** Relationship to protagonist, what they want from the story, how they change (arc)\n**Voice:** 3 lines of authentic dialogue that capture their personality\n\nMake the psychology feel internally consistent and human — avoid archetypes.` },
  { id: 't17', cat: 'Business', title: 'Executive Summary',    prompt: `Write an executive summary for: [project / proposal / report]\n\nAudience: [C-suite / investors / board]\nContext: [1-2 sentences on what this covers]\n\nInclude:\n- Problem statement (2 sentences, quantify if possible)\n- Proposed solution (3-4 sentences)\n- Key benefits with measurable impact\n- Investment and resources required\n- Timeline with key milestones\n- Ask or call to action\n\nLength: 250-350 words. Tone: confident, data-driven, no fluff.` },
  { id: 't18', cat: 'Business', title: 'Meeting Agenda',       prompt: `Create a structured meeting agenda:\n\nPurpose: [what needs to be decided or accomplished]\nDuration: [total minutes]\nAttendees: [roles]\nRequired outcome: [specific decision or deliverable]\n\nFormat:\n- Meeting objective (one sentence)\n- Pre-read materials\n- Time-boxed agenda items (item | owner | time | format: discuss/decide/inform)\n- The specific decision to be made\n- Next steps section\n- Parking lot for out-of-scope items` },
  { id: 't19', cat: 'Business', title: 'Job Description',      prompt: `Write a compelling job description for:\n\nRole: [title]\nTeam: [team name and approximate size]\nKey responsibilities: [list 4-6]\nRequired qualifications: [list 3-5]\nNice to have: [list 2-3]\nSalary: [include a range]\n\nRequirements:\n- Lead with what the person will do and own, not who the company is\n- Use inclusive language (avoid gendered terms)\n- Be specific about impact and ownership\n- Include 2-3 sentences on team culture and how this role fits` },
  { id: 't20', cat: 'SEO',      title: 'Meta Descriptions',    prompt: `Write meta descriptions for these pages.\n\nFor each:\n- Primary keyword: [keyword]\n- Page topic: [description]\n- Target audience: [who visits this page]\n\nRequirements:\n- 145-160 characters including spaces\n- Include the keyword naturally in the first 60 characters\n- Clear benefit or value proposition\n- Implicit call to action\n- Do not start with the brand name or "Welcome to"\n\nProvide 3 A/B test variations per page.` },
  { id: 't21', cat: 'SEO',      title: 'Article Outline',      prompt: `Create a comprehensive SEO content outline for: [target keyword]\n\nSearch intent: [informational/commercial/transactional]\nAudience: [describe them]\nContent gap: [what competitors are missing]\n\nProvide:\n- SEO-optimized H1 with keyword\n- Meta description (155 chars)\n- Introduction structure (hook + promise)\n- 6-8 H2 sections with H3 subsections\n- FAQ section (5 questions with concise answers)\n- Internal linking opportunities\n- Estimated word count per section\n- Total target word count` },
  { id: 't22', cat: 'Data',     title: 'SQL Query',            prompt: `You are a senior data analyst proficient in SQL.\n\nWrite a query that: [describe what data you need]\n\nDatabase:\n- Type: [PostgreSQL / MySQL / BigQuery — specify]\n- Tables: [list tables with key columns]\n- Scale: [approximate row count]\n\nRequirements:\n- Use CTEs for complex logic\n- Comment non-obvious joins or filters\n- Handle NULLs appropriately\n- Optimize for the stated scale\n\nAfter the query, explain the logic in plain English.` },
  { id: 't23', cat: 'Data',     title: 'Python Data Script',   prompt: `You are a Python data engineer.\n\nWrite a script that: [describe the task]\n\nInput: [data format — CSV, JSON, API response, etc.]\nOutput: [expected result]\nLibraries: [pandas, numpy, requests — specify]\n\nRequirements:\n- Type hints on all functions\n- Docstrings for each function\n- Error handling for: empty data, missing columns, type mismatches\n- Modular — one function per logical step\n- Usage example at the bottom with sample data` },
];

const TEMPLATE_CATS = ['All', ...new Set(TEMPLATES.map(t => t.cat))];

// ── Radar Chart ─────────────────────────────────────────────────────────────
function RadarChart({ score, scoreColor }) {
  const cx = 150, cy = 135, r = 70;
  const n = DIMENSIONS.length;
  const angles = DIMENSIONS.map((_, i) => (i / n) * 2 * Math.PI - Math.PI / 2);

  function pt(angle, ratio) {
    return [cx + ratio * r * Math.cos(angle), cy + ratio * r * Math.sin(angle)];
  }

  function polyPts(ratio) {
    return angles.map(a => pt(a, ratio).join(',')).join(' ');
  }

  function anchor(angle) {
    const c = Math.cos(angle);
    if (c > 0.3) return 'start';
    if (c < -0.3) return 'end';
    return 'middle';
  }

  function baseline(angle) {
    const s = Math.sin(angle);
    if (s > 0.3) return 'hanging';
    if (s < -0.3) return 'auto';
    return 'middle';
  }

  const dataPts = angles.map((a, i) => pt(a, Math.max(0.04, score.dims[DIMENSIONS[i].key] / 10)));
  const dataStr = dataPts.map(p => p.join(',')).join(' ');

  return (
    <svg viewBox="0 0 300 270" className={styles.radarSvg} overflow="visible">
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map(lvl => (
        <polygon key={lvl} points={polyPts(lvl)} fill="none"
          stroke="var(--border)"
          strokeWidth={lvl === 1 ? 1.5 : 1}
          strokeOpacity={lvl === 1 ? 0.55 : 0.28}
        />
      ))}
      {/* Axis lines */}
      {angles.map((a, i) => {
        const [x2, y2] = pt(a, 1);
        return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke="var(--border)" strokeWidth="1" strokeOpacity="0.35"/>;
      })}
      {/* Data polygon */}
      <polygon points={dataStr} fill={scoreColor + '20'} stroke={scoreColor} strokeWidth="2" strokeLinejoin="round"/>
      {/* Dimension dots */}
      {dataPts.map(([x, y], i) => {
        const val = score.dims[DIMENSIONS[i].key];
        return val > 0
          ? <circle key={i} cx={x} cy={y} r="3.5" fill={DIMENSIONS[i].color}/>
          : null;
      })}
      {/* Labels */}
      {angles.map((a, i) => {
        const [lx, ly] = pt(a, 1.42);
        const val = score.dims[DIMENSIONS[i].key];
        return (
          <text key={i} x={lx} y={ly}
            textAnchor={anchor(a)} dominantBaseline={baseline(a)}
            fontSize="9" fontWeight="500"
            fill={val > 0 ? DIMENSIONS[i].color + 'cc' : 'rgba(148,163,184,0.55)'}
          >
            {DIMENSIONS[i].label}
          </text>
        );
      })}
    </svg>
  );
}

// ── Sample Prompt ───────────────────────────────────────────────────────────
const SAMPLE_PROMPT = `You are a senior content strategist with 7 years of experience in B2B SaaS marketing.

Create a 90-day content calendar for a developer tools startup launching a new API product.

Target audience: For technical developers and engineering leads evaluating API solutions.

Tone: Professional and direct — avoid hype, focus on concrete value.

Format your response as a structured markdown table with columns: Week, Content Type, Topic, Target Keyword, Distribution Channel.

Context: We are a Series A company with a team of 3 marketers building organic traffic from scratch. We need high-ROI content like technical tutorials and comparison posts.

Constraints:
- Must be executable by a small team without external agencies
- Avoid generic marketing content — every piece must provide specific technical value
- Focus only on written content for now`;

// ── LocalStorage ────────────────────────────────────────────────────────────
const LS_KEY    = 'apt_saved_prompts';
const DRAFT_KEY = 'apt_draft_v1';

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
  catch { return []; }
}

// ── Component ───────────────────────────────────────────────────────────────
export default function AiPromptStudioTool() {
  const [prompt, setPrompt]                 = useState('');
  const [tab, setTab]                       = useState('analyze');
  const [templateCat, setTemplateCat]       = useState('All');
  const [templateSearch, setTemplateSearch] = useState('');
  const [libSearch, setLibSearch]           = useState('');
  const [saved, setSaved]                   = useState([]);
  const [saveTitle, setSaveTitle]           = useState('');
  const [showSaveForm, setShowSaveForm]     = useState(false);
  const [optimizeModel, setOptimizeModel]   = useState('claude');
  const [copied, setCopied]                 = useState(false);
  const [shared, setShared]                 = useState(false);
  const [optCopied, setOptCopied]           = useState(false);
  const [saveMsg, setSaveMsg]               = useState('');
  const [copiedId, setCopiedId]             = useState('');   // library item copy feedback
  const [improved, setImproved]             = useState(false);
  const [undoStack, setUndoStack]           = useState([]);   // undo last improve/clear
  const [saveState, setSaveState]           = useState('idle');

  const textareaRef = useRef(null);
  const hydrated    = useRef(false);
  const saveTimer   = useRef(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('p');
    if (p) {
      try { setPrompt(decodeURIComponent(atob(p))); } catch {}
    } else {
      try {
        const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
        setPrompt(d.prompt ?? SAMPLE_PROMPT);
        if (d.tab) setTab(d.tab);
        if (d.optimizeModel) setOptimizeModel(d.optimizeModel);
      } catch {
        setPrompt(SAMPLE_PROMPT);
      }
    }
    setSaved(loadSaved());
    hydrated.current = true;
  }, []);

  // Debounced draft save
  useEffect(() => {
    if (!hydrated.current) return;
    clearTimeout(saveTimer.current);
    setSaveState('saving');
    saveTimer.current = setTimeout(() => {
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ prompt, tab, optimizeModel })); } catch {}
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 1500);
    }, 600);
  }, [prompt, tab, optimizeModel]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === 'Enter') { e.preventDefault(); if (prompt.trim()) navigator.clipboard.writeText(prompt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }
      if (mod && e.key === 's')     { e.preventDefault(); if (prompt.trim()) { setShowSaveForm(true); setTimeout(() => document.querySelector('[data-save-input]')?.focus(), 50); } }
      if (mod && e.key === 'z' && undoStack.length) { e.preventDefault(); const prev = undoStack[undoStack.length - 1]; setUndoStack(s => s.slice(0, -1)); setPrompt(prev); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prompt, undoStack]);

  const score     = useMemo(() => scorePrompt(prompt), [prompt]);
  const issues    = useMemo(() => detectAntiPatterns(prompt), [prompt]);
  const optimized = useMemo(() => optimizeForModel(prompt, optimizeModel), [prompt, optimizeModel]);

  const tokenEstimate = Math.ceil(prompt.length / 4);
  const wordCount     = prompt.trim() ? prompt.trim().split(/\s+/).filter(Boolean).length : 0;

  const filteredTemplates = useMemo(() => TEMPLATES.filter(t =>
    (templateCat === 'All' || t.cat === templateCat) &&
    (!templateSearch || t.title.toLowerCase().includes(templateSearch.toLowerCase()) ||
     t.prompt.toLowerCase().includes(templateSearch.toLowerCase()))
  ), [templateCat, templateSearch]);

  const filteredSaved = useMemo(() => {
    if (!libSearch) return saved;
    const q = libSearch.toLowerCase();
    return saved.filter(s => s.title.toLowerCase().includes(q) || s.prompt.toLowerCase().includes(q));
  }, [saved, libSearch]);

  function copyText(text, setter) {
    navigator.clipboard.writeText(text).then(() => {
      setter(true);
      setTimeout(() => setter(false), 2000);
    });
  }

  function handleShare() {
    if (!prompt.trim()) return;
    const url = `${window.location.origin}${window.location.pathname}?p=${btoa(encodeURIComponent(prompt))}`;
    copyText(url, setShared);
  }

  function pushUndo(text) {
    setUndoStack(s => [...s.slice(-4), text]);
  }

  function handleClear() {
    if (!prompt.trim()) return;
    pushUndo(prompt);
    setPrompt('');
    textareaRef.current?.focus();
  }

  function handleImprove() {
    if (!prompt.trim()) return;
    pushUndo(prompt);
    setPrompt(improvePrompt(prompt));
    setImproved(true);
    setTimeout(() => setImproved(false), 2000);
    setTab('analyze');
  }

  function handleUndo() {
    if (!undoStack.length) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack(s => s.slice(0, -1));
    setPrompt(prev);
  }

  function appendDimFix(key) {
    const snippet = DIM_FIXES[key];
    if (!snippet) return;
    if (!prompt.trim()) {
      setPrompt(snippet);
    } else {
      setPrompt(p => p + snippet);
    }
    textareaRef.current?.focus();
  }

  function handleSave() {
    if (!prompt.trim()) return;
    const title = saveTitle.trim() || `Prompt ${new Date().toLocaleTimeString()}`;
    const entry = { id: Date.now().toString(), title, prompt, score: score.total, createdAt: new Date().toISOString() };
    const updated = [entry, ...saved];
    setSaved(updated);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
    setSaveTitle('');
    setShowSaveForm(false);
    setSaveMsg('Saved!');
    setTimeout(() => setSaveMsg(''), 2000);
  }

  function handleDelete(id) {
    const updated = saved.filter(s => s.id !== id);
    setSaved(updated);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
  }

  function handleLibCopy(id, text) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 2000);
    });
  }

  const scoreColor = score.total >= 7 ? '#4ade80' : score.total >= 4 ? '#f59e0b' : '#f87171';
  const scoreLabel = score.total >= 7 ? 'Strong' : score.total >= 4 ? 'Moderate' : 'Weak';
  const hasPrompt  = prompt.trim().length > 0;

  // Prompt length signal
  const lengthSignal = !hasPrompt ? null : prompt.length < 60 ? { label: 'Too short', color: '#f87171' } : prompt.length < 200 ? { label: 'Brief', color: '#f59e0b' } : prompt.length < 600 ? { label: 'Good', color: '#4ade80' } : { label: 'Long', color: '#60a5fa' };

  return (
    <div className={styles.wrap}>
      <PlaygroundTopNav active="ai-prompt-studio" />
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span>AI Prompt <span className={styles.accent}>Studio</span></span>
        </div>
        <div className={styles.headerMeta}>
          {hasPrompt && lengthSignal && (
            <span className={styles.lengthPill} style={{ color: lengthSignal.color, borderColor: lengthSignal.color }}>
              {lengthSignal.label}
            </span>
          )}
          <span className={styles.charCount}>
            {wordCount > 0 ? `${wordCount} words · ` : ''}{prompt.length} chars · ~{tokenEstimate} tokens
          </span>
          {saveState !== 'idle' && (
            <span className={`${styles.saveIndicator} ${saveState === 'saving' ? styles.saveIndicatorSaving : styles.saveIndicatorSaved}`}>
              <span className={styles.saveDot} />
              {saveState === 'saving' ? 'Saving…' : 'Saved'}
            </span>
          )}
          <span className={styles.shortcutHint}>Ctrl+Enter copy · Ctrl+S save · Ctrl+Z undo</span>
        </div>
      </div>

      {/* Main */}
      <div className={styles.main}>

        {/* ── Left: Editor ── */}
        <div className={styles.editorCol}>
          <div className={styles.editorHeader}>
            <span className={styles.editorLabel}>Prompt Editor</span>
            <div className={styles.editorActions}>
              {saveMsg && <span className={styles.savedMsg}>{saveMsg}</span>}
              {undoStack.length > 0 && (
                <button className={`${styles.btn} ${styles.btnGhost}`} onClick={handleUndo} title="Ctrl+Z">Undo</button>
              )}
              <button className={`${styles.btn} ${styles.btnGhost}`} onClick={handleClear} disabled={!hasPrompt}>Clear</button>
              <button
                className={`${styles.btn} ${styles.btnImprove}`}
                onClick={handleImprove}
                disabled={!hasPrompt}
                title="Auto-fix: removes filler, adds role/format/constraints"
              >
                {improved ? '✓ Improved!' : '✦ Improve'}
              </button>
              <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setShowSaveForm(v => !v)} disabled={!hasPrompt}>Save</button>
              <button className={`${styles.btn} ${styles.btnGhost}`} onClick={handleShare} disabled={!hasPrompt}>{shared ? 'Link copied!' : 'Share'}</button>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => copyText(prompt, setCopied)} disabled={!hasPrompt}>{copied ? 'Copied!' : 'Copy'}</button>
            </div>
          </div>

          {showSaveForm && (
            <div className={styles.saveForm}>
              <input
                data-save-input
                className={styles.saveInput}
                placeholder="Give this prompt a title (optional) — press Enter to save"
                value={saveTitle}
                onChange={e => setSaveTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                autoFocus
              />
              <div className={styles.saveFormBtns}>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSave}>Save to Library</button>
                <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setShowSaveForm(false)}>Cancel</button>
              </div>
            </div>
          )}

          <textarea
            ref={textareaRef}
            className={styles.editor}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder={`Write or paste your prompt here…\n\nExample — strong prompt:\n"You are a senior developer. Review the following Python code and list bugs by severity (Critical/High/Medium/Low). Format as a numbered list. Focus on security, performance, and correctness. Avoid style suggestions."\n\n← Load a template from the right panel, or click ✦ Improve to auto-fix your prompt.`}
            spellCheck={false}
          />

          {/* Score strip */}
          {hasPrompt && (
            <div className={styles.scoreStrip}>
              <div className={styles.scorePill} style={{ background: scoreColor + '18', borderColor: scoreColor + '55' }}>
                <span className={styles.scorePillNum} style={{ color: scoreColor }}>{score.total}</span>
                <span className={styles.scorePillSep} style={{ color: scoreColor + '80' }}>/10</span>
                <span className={styles.scorePillLabel} style={{ color: scoreColor }}>{scoreLabel}</span>
              </div>
              <div className={styles.dimDots}>
                {DIMENSIONS.map(d => (
                  <div key={d.key} className={styles.dimDot} title={`${d.label}: ${score.dims[d.key]}/10`}>
                    <div
                      className={styles.dimDotBall}
                      style={{
                        background: d.color,
                        opacity: score.dims[d.key] === 0 ? 0.12 : 0.2 + (score.dims[d.key] / 10) * 0.8,
                        boxShadow: score.dims[d.key] >= 7 ? `0 0 6px ${d.color}80` : 'none',
                      }}
                    />
                    <span className={styles.dimDotLabel}>{d.label.split(' ')[0].slice(0, 4)}</span>
                  </div>
                ))}
              </div>
              {issues.length > 0 ? (
                <div className={styles.issueCount}>⚠ {issues.length} issue{issues.length > 1 ? 's' : ''}</div>
              ) : score.total >= 6 ? (
                <div className={styles.issueGood}>✓ No issues</div>
              ) : null}
            </div>
          )}
        </div>

        {/* ── Right: Tabs ── */}
        <div className={styles.rightCol}>
          <div className={styles.tabs}>
            {[
              { id: 'analyze',   label: 'Analyze'  },
              { id: 'templates', label: 'Templates' },
              { id: 'optimize',  label: 'Optimize'  },
              { id: 'library',   label: 'Library'   },
            ].map(t => (
              <button
                key={t.id}
                className={`${styles.tabBtn} ${tab === t.id ? styles.tabActive : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
                {t.id === 'analyze' && hasPrompt && issues.length > 0 && (
                  <span className={styles.badgeWarn}>{issues.length}</span>
                )}
                {t.id === 'library' && saved.length > 0 && (
                  <span className={styles.badge}>{saved.length}</span>
                )}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>

            {/* Analyze */}
            {tab === 'analyze' && (
              <div className={styles.analyzeTab}>
                {!hasPrompt ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>◎</div>
                    <div className={styles.emptyTitle}>No prompt yet</div>
                    <div className={styles.emptyDesc}>Write a prompt in the editor to see a quality analysis across 8 dimensions.</div>
                  </div>
                ) : (
                  <>
                    <div className={styles.overallRow}>
                      <div className={styles.scoreGauge}>
                        <div className={styles.gaugeArc}>
                          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <circle cx="40" cy="40" r="32" stroke="var(--border)" strokeWidth="6" strokeLinecap="round"/>
                            <circle
                              cx="40" cy="40" r="32"
                              stroke={scoreColor}
                              strokeWidth="6"
                              strokeLinecap="round"
                              strokeDasharray="201.06"
                              strokeDashoffset={201.06 - (score.total / 10) * 201.06}
                              transform="rotate(-90 40 40)"
                              style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease' }}
                            />
                          </svg>
                          <div className={styles.gaugeCenter}>
                            <span className={styles.gaugeNum} style={{ color: scoreColor }}>{score.total}</span>
                            <span className={styles.gaugeOf}>/10</span>
                          </div>
                        </div>
                        <span className={styles.gaugeLabel} style={{ color: scoreColor }}>{scoreLabel}</span>
                      </div>
                      <div className={styles.overallInfo}>
                        <div className={styles.overallTitle}>Prompt Quality Score</div>
                        <div className={styles.overallSub}>
                          {score.total >= 7
                            ? 'Well-structured prompt — clear role, task, format, and constraints.'
                            : score.total >= 4
                            ? 'Decent start. Add a role, output format, or constraints to improve.'
                            : 'Needs work. Specify who should answer, what to produce, and how to format it.'}
                        </div>
                        {score.total < 7 && (
                          <button className={`${styles.btn} ${styles.btnImprove} ${styles.btnSmall}`} style={{ marginTop: 8 }} onClick={handleImprove}>
                            {improved ? '✓ Improved!' : '✦ Auto-improve prompt'}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className={styles.radarWrap}>
                      <RadarChart score={score} scoreColor={scoreColor} />
                    </div>

                    <div className={styles.sectionTitle}>Dimension Breakdown</div>
                    <div className={styles.dims}>
                      {DIMENSIONS.map(d => (
                        <div key={d.key} className={styles.dimRow}>
                          <span className={styles.dimLabel}>{d.label}</span>
                          <div className={styles.dimTrack}>
                            <div className={styles.dimFill} style={{ width: `${score.dims[d.key] * 10}%`, background: d.color }} />
                          </div>
                          <span className={styles.dimVal} style={{ color: d.color }}>{score.dims[d.key]}</span>
                          {score.dims[d.key] === 0 && (
                            <button
                              className={styles.addChip}
                              onClick={() => appendDimFix(d.key)}
                              title={DIM_TIPS[d.key]}
                            >+ Add</button>
                          )}
                        </div>
                      ))}
                    </div>

                    {issues.length > 0 && (
                      <>
                        <div className={styles.sectionTitle} style={{ marginTop: 20 }}>Issues Found</div>
                        <div className={styles.issues}>
                          {issues.map(p => (
                            <div key={p.id} className={styles.issue}>
                              <div className={styles.issueLabel}>⚠ {p.label}</div>
                              <div className={styles.issueDesc}>{p.desc}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {issues.length === 0 && score.total >= 6 && (
                      <div className={styles.allGood}>✓ No common anti-patterns detected</div>
                    )}

                    {/* Quick copy for model */}
                    <div className={styles.sectionTitle} style={{ marginTop: 20 }}>Quick Copy for Model</div>
                    <div className={styles.modelQuickRow}>
                      {['claude', 'chatgpt', 'gemini'].map(m => {
                        const label = m === 'claude' ? 'Claude' : m === 'chatgpt' ? 'ChatGPT' : 'Gemini';
                        return (
                          <button
                            key={m}
                            className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`}
                            onClick={() => navigator.clipboard.writeText(optimizeForModel(prompt, m))}
                            title={`Copy prompt optimized for ${label}`}
                          >Copy for {label}</button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Templates */}
            {tab === 'templates' && (
              <div className={styles.templatesTab}>
                <input
                  className={styles.searchInput}
                  placeholder="Search templates…"
                  value={templateSearch}
                  onChange={e => setTemplateSearch(e.target.value)}
                />
                <div className={styles.catFilter}>
                  {TEMPLATE_CATS.map(c => (
                    <button
                      key={c}
                      className={`${styles.catBtn} ${templateCat === c ? styles.catActive : ''}`}
                      onClick={() => setTemplateCat(c)}
                    >{c}</button>
                  ))}
                </div>
                <div className={styles.templateList}>
                  {filteredTemplates.map(t => (
                    <div key={t.id} className={styles.templateCard}>
                      <div className={styles.templateTop}>
                        <span className={styles.templateCat}>{t.cat}</span>
                        <span className={styles.templateTitle}>{t.title}</span>
                      </div>
                      <p className={styles.templatePreview}>{t.prompt.replace(/\n/g, ' ').slice(0, 110)}…</p>
                      <button
                        className={`${styles.btn} ${styles.btnSmall} ${styles.btnPrimary}`}
                        onClick={() => { setPrompt(t.prompt); setTab('analyze'); }}
                      >Use Template →</button>
                    </div>
                  ))}
                  {filteredTemplates.length === 0 && (
                    <div className={styles.emptyState}><div className={styles.emptyDesc}>No templates match your search.</div></div>
                  )}
                </div>
              </div>
            )}

            {/* Optimize */}
            {tab === 'optimize' && (
              <div className={styles.optimizeTab}>
                <div className={styles.modelPicker}>
                  {[
                    { id: 'claude',  label: 'Claude',  sub: 'XML tags + structured context blocks' },
                    { id: 'chatgpt', label: 'ChatGPT', sub: 'Persona prefix + numbered step framing' },
                    { id: 'gemini',  label: 'Gemini',  sub: 'Chain-of-thought + explicit output format' },
                  ].map(m => (
                    <button
                      key={m.id}
                      className={`${styles.modelBtn} ${optimizeModel === m.id ? styles.modelActive : ''}`}
                      onClick={() => setOptimizeModel(m.id)}
                    >
                      <span className={styles.modelName}>{m.label}</span>
                      <span className={styles.modelSub}>{m.sub}</span>
                    </button>
                  ))}
                </div>

                {!hasPrompt ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>⚙</div>
                    <div className={styles.emptyTitle}>No prompt to optimize</div>
                    <div className={styles.emptyDesc}>Write a prompt on the left, then select a model to see the optimized version.</div>
                  </div>
                ) : (
                  <>
                    <div className={styles.optimizeHeader}>
                      <span className={styles.optimizeLabel}>
                        Optimized for {optimizeModel === 'claude' ? 'Claude' : optimizeModel === 'chatgpt' ? 'ChatGPT' : 'Gemini'}
                      </span>
                      <button className={`${styles.btn} ${styles.btnSmall} ${styles.btnPrimary}`} onClick={() => copyText(optimized, setOptCopied)}>
                        {optCopied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className={styles.optimizeOutput}>{optimized}</pre>
                    <div className={styles.optimizeTip}>
                      {optimizeModel === 'claude' && '💡 Claude processes XML-tagged prompts with higher structural fidelity — <instructions> and <output_format> tags give it clear scope boundaries.'}
                      {optimizeModel === 'chatgpt' && '💡 ChatGPT responds well to explicit persona framing at the start and numbered instructions that define the expected approach.'}
                      {optimizeModel === 'gemini' && '💡 Gemini benefits from chain-of-thought priming ("Think step by step") and explicit output format declarations with headers.'}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Library */}
            {tab === 'library' && (
              <div className={styles.libraryTab}>
                <input
                  className={styles.searchInput}
                  placeholder="Search saved prompts…"
                  value={libSearch}
                  onChange={e => setLibSearch(e.target.value)}
                />
                {filteredSaved.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>◫</div>
                    <div className={styles.emptyTitle}>{saved.length === 0 ? 'Library is empty' : 'No results'}</div>
                    <div className={styles.emptyDesc}>
                      {saved.length === 0
                        ? 'Write a prompt and click Save (or Ctrl+S) to build your personal library. Saved prompts persist across sessions.'
                        : 'No saved prompts match your search.'}
                    </div>
                  </div>
                ) : (
                  <div className={styles.savedList}>
                    {filteredSaved.map(item => (
                      <div key={item.id} className={styles.savedCard}>
                        <div className={styles.savedTop}>
                          <span className={styles.savedTitle}>{item.title}</span>
                          <span
                            className={styles.savedScore}
                            style={{ color: item.score >= 7 ? '#4ade80' : item.score >= 4 ? '#f59e0b' : '#f87171' }}
                          >{item.score}/10</span>
                        </div>
                        <p className={styles.savedPreview}>{item.prompt.replace(/\n/g, ' ').slice(0, 100)}…</p>
                        <div className={styles.savedMeta}>
                          {new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className={styles.savedActions}>
                          <button
                            className={`${styles.btn} ${styles.btnSmall} ${styles.btnPrimary}`}
                            onClick={() => { setPrompt(item.prompt); setTab('analyze'); }}
                          >Load</button>
                          <button
                            className={`${styles.btn} ${styles.btnSmall} ${styles.btnGhost}`}
                            onClick={() => handleLibCopy(item.id, item.prompt)}
                          >{copiedId === item.id ? 'Copied!' : 'Copy'}</button>
                          <button
                            className={`${styles.btn} ${styles.btnSmall} ${styles.btnDanger}`}
                            onClick={() => handleDelete(item.id)}
                          >Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
