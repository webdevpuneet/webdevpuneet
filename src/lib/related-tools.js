import { LIVE_TOOLS } from './tools-registry.js';
/* Central map of related tools for internal linking in SeoSection.
   Each exported key is normalized to 8 related slugs. */

const RAW_RELATED_TOOLS = {

  // ── Security & Encoding ───────────────────────────────────────────────────
  'uuid-generator':          ['password-generator', 'hash-generator', 'jwt-decoder', 'base64-encoder-decoder', 'json-to-typescript', 'api-request-generator-tester', 'timestamp-converter', 'regex-tester'],
  'password-generator':      ['uuid-generator', 'hash-generator', 'base64-encoder-decoder', 'jwt-decoder', 'url-encoder-decoder', 'regex-tester', 'qr-code-generator', 'code-screenshot-generator'],
  'hash-generator':          ['uuid-generator', 'password-generator', 'base64-encoder-decoder', 'jwt-decoder', 'url-encoder-decoder', 'regex-tester', 'json-formatter', 'diff-checker'],
  'base64-encoder-decoder':  ['image-to-base64', 'hash-generator', 'jwt-decoder', 'url-encoder-decoder', 'password-generator', 'image-compressor', 'regex-tester', 'json-formatter'],
  'url-encoder-decoder':     ['base64-encoder-decoder', 'hash-generator', 'jwt-decoder', 'password-generator', 'regex-tester', 'json-formatter', 'meta-tag-generator', 'diff-checker'],
  'jwt-decoder':             ['base64-encoder-decoder', 'hash-generator', 'password-generator', 'url-encoder-decoder', 'timestamp-converter', 'api-request-generator-tester', 'json-formatter', 'regex-tester'],

  // ── JSON / Data formats ───────────────────────────────────────────────────
  'json-formatter':          ['json-to-typescript', 'json-table-viewer', 'json-dashboard-generator', 'yaml-json-converter', 'csv-json-converter', 'sql-formatter', 'diff-checker', 'jwt-decoder'],
  'json-table-viewer':       ['sql-playground', 'json-formatter', 'json-to-typescript', 'json-dashboard-generator', 'csv-json-converter', 'yaml-json-converter', 'sql-formatter', 'diff-checker'],
  'json-dashboard-generator':['api-request-generator-tester', 'json-formatter', 'json-to-typescript', 'json-table-viewer', 'csv-json-converter', 'sql-formatter', 'yaml-json-converter', 'diff-checker'],
  'yaml-json-converter':     ['json-formatter', 'json-to-typescript', 'csv-json-converter', 'json-dashboard-generator', 'json-table-viewer', 'sql-formatter', 'diff-checker', 'api-request-generator-tester'],
  'csv-json-converter':      ['json-formatter', 'json-to-typescript', 'json-table-viewer', 'json-dashboard-generator', 'yaml-json-converter', 'sql-formatter', 'diff-checker', 'api-request-generator-tester'],
  'json-to-typescript':      ['json-formatter', 'yaml-json-converter', 'json-table-viewer', 'api-request-generator-tester', 'csv-json-converter', 'diff-checker', 'jwt-decoder', 'regex-tester'],
  'sql-playground':          ['mongo-playground', 'php-playground', 'nodejs-playground', 'express-playground', 'database-schema-designer', 'json-table-viewer', 'csv-json-converter', 'sql-formatter'],
  'mongo-playground':        ['express-playground', 'nodejs-playground', 'sql-playground', 'firebase-playground', 'graphql-playground', 'rest-api-builder-playground', 'json-formatter', 'api-request-generator-tester'],
  'express-playground':      ['nodejs-playground', 'rest-api-builder-playground', 'mongo-playground', 'graphql-playground', 'redis-playground', 'firebase-playground', 'api-request-generator-tester', 'json-formatter'],
  'rest-api-builder-playground':        ['express-playground', 'nodejs-playground', 'api-request-generator-tester', 'api-mock-generator', 'graphql-playground', 'mongo-playground', 'json-formatter', 'nextjs-playground'],
  'sql-formatter':           ['sql-playground', 'json-formatter', 'csv-json-converter', 'json-table-viewer', 'diff-checker', 'regex-tester', 'api-request-generator-tester', 'code-screenshot-generator'],
  'api-request-generator-tester': ['api-mock-generator', 'json-to-typescript', 'json-dashboard-generator', 'json-formatter', 'jwt-decoder', 'base64-encoder-decoder', 'url-encoder-decoder', 'timestamp-converter'],
  'timestamp-converter':     ['cron-expression-builder', 'jwt-decoder', 'sql-formatter', 'json-formatter', 'api-request-generator-tester', 'regex-tester', 'diff-checker', 'code-screenshot-generator'],
  'cron-expression-builder': ['timestamp-converter', 'regex-tester', 'api-request-generator-tester', 'json-formatter', 'daily-focus-log', 'mini-kanban', 'diff-checker', 'code-screenshot-generator'],

  // ── Code & Text tools ─────────────────────────────────────────────────────
  'markdown-editor':         ['markdown-to-html', 'html-to-markdown', 'diff-checker', 'word-counter', 'html-formatter', 'code-screenshot-generator', 'ai-prompt-studio', 'lorem-ipsum-generator'],
  'notepad':                 ['markdown-editor', 'word-counter', 'daily-focus-log', 'mini-kanban', 'bookmark-keeper', 'daily-diary', 'diff-checker', 'html-to-markdown'],
  'diff-checker':            ['json-formatter', 'javascript-minifier', 'sql-formatter', 'word-counter', 'html-formatter', 'regex-tester', 'code-screenshot-generator', 'css-minifier-beautifier'],
  'regex-tester':            ['diff-checker', 'word-counter', 'sql-formatter', 'url-encoder-decoder', 'json-formatter', 'jwt-decoder', 'hash-generator', 'password-generator'],
  'code-screenshot-generator':['diff-checker', 'javascript-minifier', 'sql-formatter', 'json-formatter', 'html-formatter', 'word-counter', 'ai-prompt-studio', 'markdown-editor'],
  'word-counter':            ['text-case-converter', 'diff-checker', 'meta-tag-generator', 'ai-prompt-studio', 'lorem-ipsum-generator', 'regex-tester', 'markdown-editor', 'markdown-to-html'],
  'lorem-ipsum-generator':   ['word-counter', 'markdown-to-html', 'diff-checker', 'html-formatter', 'meta-tag-generator', 'responsive-preview-tool', 'font-pairing-tool', 'code-screenshot-generator'],
  'api-mock-generator':      ['api-request-generator-tester', 'json-formatter', 'json-to-typescript', 'json-dashboard-generator', 'yaml-json-converter', 'regex-tester', 'jwt-decoder', 'hash-generator'],
  'svg-to-png':              ['image-to-svg', 'favicon-generator', 'image-compressor', 'image-to-base64', 'og-image-generator', 'animated-svg-icons', 'svg-animation-generator', 'color-palette-generator'],
  'text-case-converter':     ['word-counter', 'json-to-typescript', 'regex-tester', 'diff-checker', 'lorem-ipsum-generator', 'markdown-editor', 'html-formatter', 'sql-formatter'],
  'og-image-generator':      ['aspect-ratio-calculator', 'meta-tag-generator', 'favicon-generator', 'color-palette-generator', 'gradient-generator', 'color-contrast-checker', 'font-pairing-tool', 'image-compressor'],
  'html-to-markdown':        ['markdown-to-html', 'markdown-editor', 'html-formatter', 'diff-checker', 'word-counter', 'html-to-jsx-converter', 'lorem-ipsum-generator', 'meta-tag-generator'],
  'markdown-to-html':        ['html-to-markdown', 'markdown-editor', 'html-formatter', 'diff-checker', 'word-counter', 'html-to-jsx-converter', 'css-minifier-beautifier', 'lorem-ipsum-generator'],
  'pomodoro-timer':           ['time-tracker', 'daily-focus-log', 'mini-kanban', 'word-counter', 'ai-prompt-studio', 'cron-expression-builder', 'timestamp-converter', 'markdown-editor'],
  'color-contrast-checker':  ['color-picker', 'color-palette-generator', 'gradient-generator', 'css-filter-generator', 'glassmorphism-generator', 'font-pairing-tool', 'box-shadow-generator', 'meta-tag-generator'],
  'ai-prompt-studio':        ['word-counter', 'diff-checker', 'code-screenshot-generator', 'markdown-editor', 'meta-tag-generator', 'daily-focus-log', 'mini-kanban', 'regex-tester'],

  // ── Finance & Calculators ─────────────────────────────────────────────────
  'loan-payoff-calculator':        ['credit-card-payoff-calculator', 'budget-planner', 'mortgage-calculator', 'emi-calculator', 'compound-interest-calculator', 'paycheck-calculator', 'salary-to-hourly-calculator', 'inflation-calculator'],
  'inflation-calculator':          ['compound-interest-calculator', 'monthly-investment-calculator', 'mortgage-calculator', 'rent-vs-buy-calculator', 'loan-payoff-calculator', 'credit-card-payoff-calculator', 'paycheck-calculator', 'salary-to-hourly-calculator'],
  'credit-card-payoff-calculator': ['budget-planner', 'mortgage-calculator', 'emi-calculator', 'paycheck-calculator', 'compound-interest-calculator', 'salary-to-hourly-calculator', 'uk-take-home-calculator', 'rent-vs-buy-calculator'],
  'australia-take-home-calculator': ['gst-calculator', 'canada-take-home-calculator', 'uk-take-home-calculator', 'paycheck-calculator', 'salary-to-hourly-calculator', 'budget-planner', 'mortgage-calculator', 'compound-interest-calculator'],
  'date-calculator':     ['timestamp-converter', 'unit-converter', 'tip-calculator', 'retirement-calculator', 'compound-interest-calculator', 'mortgage-calculator', 'budget-planner', 'salary-to-hourly-calculator'],
  'number-base-converter': ['html-entity-encoder', 'base64-encoder-decoder', 'url-encoder-decoder', 'timestamp-converter', 'regex-tester', 'jwt-decoder', 'diff-checker', 'line-utilities'],
  'html-entity-encoder': ['base64-encoder-decoder', 'url-encoder-decoder', 'number-base-converter', 'jwt-decoder', 'diff-checker', 'regex-tester', 'html-formatter', 'line-utilities'],
  'line-utilities':      ['diff-checker', 'word-counter', 'html-entity-encoder', 'base64-encoder-decoder', 'url-encoder-decoder', 'number-base-converter', 'regex-tester', 'html-formatter'],
  'unit-converter':              ['tip-calculator', 'gst-calculator', 'vat-calculator-uk', 'emi-calculator', 'salary-to-hourly-calculator', 'mortgage-calculator', 'compound-interest-calculator', 'budget-planner'],
  'gst-calculator':              ['vat-calculator-uk', 'unit-converter', 'emi-calculator', 'tip-calculator', 'salary-to-hourly-calculator', 'freelance-invoice-generator', 'paycheck-calculator', 'compound-interest-calculator'],
  'vat-calculator-uk':           ['gst-calculator', 'uk-take-home-calculator', 'salary-to-hourly-calculator', 'freelance-invoice-generator', 'paycheck-calculator', 'mortgage-calculator', 'compound-interest-calculator', 'tip-calculator'],
  'salary-to-hourly-calculator': ['canada-take-home-calculator', 'budget-planner', 'paycheck-calculator', 'uk-take-home-calculator', 'tip-calculator', 'compound-interest-calculator', 'monthly-investment-calculator', 'mortgage-calculator'],
  'tip-calculator':          ['salary-to-hourly-calculator', 'paycheck-calculator', 'uk-take-home-calculator', 'mortgage-calculator', 'compound-interest-calculator', 'monthly-investment-calculator', 'freelance-invoice-generator'],
  'uk-take-home-calculator': ['australia-take-home-calculator', 'canada-take-home-calculator', 'vat-calculator-uk', 'salary-to-hourly-calculator', 'credit-card-payoff-calculator', 'loan-payoff-calculator', 'tip-calculator', 'paycheck-calculator'],
  'canada-take-home-calculator': ['australia-take-home-calculator', 'paycheck-calculator', 'uk-take-home-calculator', 'salary-to-hourly-calculator', 'budget-planner', 'retirement-calculator', 'net-worth-calculator', 'compound-interest-calculator'],
  'paycheck-calculator':     ['canada-take-home-calculator', 'retirement-calculator', 'budget-planner', 'credit-card-payoff-calculator', 'salary-to-hourly-calculator', 'tip-calculator', 'uk-take-home-calculator', 'compound-interest-calculator'],
  'budget-planner':          ['net-worth-calculator', 'retirement-calculator', 'paycheck-calculator', 'salary-to-hourly-calculator', 'credit-card-payoff-calculator', 'loan-payoff-calculator', 'compound-interest-calculator', 'monthly-investment-calculator'],
  'net-worth-calculator':    ['budget-planner', 'retirement-calculator', 'compound-interest-calculator', 'monthly-investment-calculator', 'credit-card-payoff-calculator', 'loan-payoff-calculator', 'mortgage-calculator', 'paycheck-calculator'],
  'retirement-calculator':   ['net-worth-calculator', 'compound-interest-calculator', 'paycheck-calculator', 'budget-planner', 'monthly-investment-calculator', 'inflation-calculator', 'salary-to-hourly-calculator', 'sip-calculator'],
  'compound-interest-calculator': ['retirement-calculator', 'budget-planner', 'inflation-calculator', 'credit-card-payoff-calculator', 'paycheck-calculator', 'monthly-investment-calculator', 'sip-calculator', 'emi-calculator'],
  'monthly-investment-calculator': ['retirement-calculator', 'budget-planner', 'inflation-calculator', 'loan-payoff-calculator', 'credit-card-payoff-calculator', 'paycheck-calculator', 'compound-interest-calculator', 'sip-calculator'],
  'emi-calculator':          ['loan-payoff-calculator', 'credit-card-payoff-calculator', 'mortgage-calculator', 'rent-vs-buy-calculator', 'compound-interest-calculator', 'monthly-investment-calculator', 'salary-to-hourly-calculator', 'sip-calculator'],
  'youtube-thumbnail-downloader': ['image-compressor', 'image-editor', 'og-image-generator', 'favicon-generator', 'qr-code-generator', 'image-to-base64', 'image-to-svg', 'svg-to-png'],
  'image-editor':            ['image-background-remover', 'relight-photo', 'image-compressor', 'image-to-svg', 'image-to-base64', 'image-to-text-converter', 'svg-to-png', 'favicon-generator'],

  // ── Productivity ──────────────────────────────────────────────────────────
  'pdf-password-protector':['pdf-unlock', 'pdf-watermark', 'pdf-merger', 'pdf-splitter', 'pdf-compressor', 'pdf-page-organizer', 'password-generator', 'hash-generator'],
  'pdf-to-word':             ['pdf-ocr', 'pdf-splitter', 'pdf-page-organizer', 'pdf-to-images', 'pdf-compressor', 'pdf-merger', 'pdf-metadata', 'html-to-pdf'],
  'pdf-ocr':                 ['pdf-to-word', 'pdf-to-images', 'pdf-splitter', 'pdf-page-organizer', 'pdf-compressor', 'image-to-text-converter', 'images-to-pdf', 'pdf-merger'],
  'pdf-watermark':           ['pdf-to-word', 'pdf-ocr', 'pdf-password-protector', 'pdf-page-organizer', 'pdf-compressor', 'pdf-splitter', 'pdf-merger', 'pdf-to-images'],
  'pdf-page-organizer':      ['pdf-ocr', 'pdf-watermark', 'pdf-splitter', 'pdf-merger', 'pdf-compressor', 'pdf-to-images', 'images-to-pdf', 'image-compressor'],
  'pdf-compressor':          ['pdf-ocr', 'pdf-watermark', 'pdf-page-organizer', 'pdf-to-images', 'images-to-pdf', 'pdf-splitter', 'pdf-merger', 'image-compressor'],
  'images-to-pdf':           ['pdf-watermark', 'pdf-page-organizer', 'pdf-compressor', 'pdf-to-images', 'pdf-splitter', 'pdf-merger', 'image-compressor', 'image-to-base64'],
  'pdf-to-images':           ['pdf-ocr', 'pdf-watermark', 'pdf-page-organizer', 'pdf-compressor', 'images-to-pdf', 'pdf-splitter', 'pdf-merger', 'image-compressor'],
  'html-to-pdf':             ['pdf-merger', 'pdf-metadata', 'markdown-editor', 'word-counter', 'resume-builder', 'freelance-invoice-generator', 'diff-checker', 'code-screenshot-generator'],
  'pdf-metadata':            ['pdf-merger', 'pdf-splitter', 'pdf-unlock', 'pdf-watermark', 'pdf-compressor', 'resume-builder', 'freelance-invoice-generator', 'word-counter'],
  'pdf-unlock':              ['pdf-password-protector', 'pdf-splitter', 'pdf-merger', 'pdf-watermark', 'pdf-compressor', 'resume-builder', 'hash-generator', 'password-generator'],
  'pdf-splitter':            ['pdf-password-protector', 'pdf-unlock', 'pdf-watermark', 'pdf-page-organizer', 'pdf-compressor', 'pdf-to-images', 'images-to-pdf', 'pdf-merger'],
  'pdf-merger':              ['pdf-password-protector', 'pdf-unlock', 'pdf-watermark', 'pdf-page-organizer', 'pdf-compressor', 'pdf-to-images', 'images-to-pdf', 'pdf-splitter'],
  'resume-builder':          ['pdf-merger', 'freelance-invoice-generator', 'word-counter', 'markdown-editor', 'font-pairing-tool', 'color-palette-generator', 'ai-prompt-studio', 'lorem-ipsum-generator'],
  'freelance-invoice-generator': ['time-tracker', 'local-invoice-tracker', 'freelance-expense-tracker', 'resume-builder', 'pdf-merger', 'html-to-pdf', 'milestone-payment-tracker', 'freelance-dashboard'],
  'sip-calculator':         ['retirement-calculator', 'budget-planner', 'compound-interest-calculator', 'monthly-investment-calculator', 'inflation-calculator', 'loan-payoff-calculator', 'emi-calculator', 'mortgage-calculator'],
  'mortgage-calculator':    ['net-worth-calculator', 'loan-payoff-calculator', 'credit-card-payoff-calculator', 'emi-calculator', 'rent-vs-buy-calculator', 'compound-interest-calculator', 'inflation-calculator', 'paycheck-calculator'],
  'rent-vs-buy-calculator': ['mortgage-calculator', 'loan-payoff-calculator', 'credit-card-payoff-calculator', 'inflation-calculator', 'compound-interest-calculator', 'emi-calculator', 'sip-calculator', 'paycheck-calculator'],
  'daily-focus-log':         ['time-tracker', 'pomodoro-timer', 'mini-kanban', 'ai-prompt-studio', 'cron-expression-builder', 'timestamp-converter', 'word-counter', 'code-screenshot-generator'],
  'time-tracker':            ['freelance-invoice-generator', 'freelance-dashboard', 'daily-focus-log', 'mini-kanban', 'pomodoro-timer', 'budget-planner', 'salary-to-hourly-calculator', 'csv-json-converter'],
  'mini-kanban':             ['time-tracker', 'pomodoro-timer', 'daily-focus-log', 'ai-prompt-studio', 'cron-expression-builder', 'timestamp-converter', 'word-counter', 'code-screenshot-generator'],

  // ── HTML / CSS code ───────────────────────────────────────────────────────
  'html-formatter':          ['javascript-minifier', 'html-to-jsx-converter', 'css-minifier-beautifier', 'tailwind-formatter', 'css-to-tailwind', 'diff-checker', 'json-formatter', 'code-screenshot-generator'],
  'javascript-minifier':     ['html-formatter', 'css-minifier-beautifier', 'css-autoprefixer', 'diff-checker', 'code-screenshot-generator', 'html-to-jsx-converter', 'regex-tester', 'json-formatter'],
  'html-to-jsx-converter':   ['html-formatter', 'javascript-minifier', 'css-to-tailwind', 'tailwind-formatter', 'diff-checker', 'tailwind-to-css', 'css-minifier-beautifier', 'json-formatter'],
  'css-autoprefixer':        ['css-minifier-beautifier', 'css-to-tailwind', 'tailwind-to-css', 'tailwind-formatter', 'css-grid-builder', 'flexbox-builder', 'css-media-queries-generator', 'responsive-preview-tool'],
  'css-minifier-beautifier': ['javascript-minifier', 'css-autoprefixer', 'css-to-tailwind', 'tailwind-to-css', 'html-formatter', 'tailwind-formatter', 'html-to-jsx-converter', 'diff-checker'],
  'tailwind-formatter':      ['css-to-tailwind', 'tailwind-to-css', 'css-autoprefixer', 'flexbox-builder', 'css-grid-builder', 'css-minifier-beautifier', 'html-formatter', 'rem-px-converter'],
  'css-to-tailwind':         ['tailwind-to-css', 'tailwind-formatter', 'css-autoprefixer', 'flexbox-builder', 'css-grid-builder', 'css-minifier-beautifier', 'html-to-jsx-converter', 'responsive-preview-tool'],
  'tailwind-to-css':         ['css-to-tailwind', 'tailwind-formatter', 'css-autoprefixer', 'flexbox-builder', 'css-minifier-beautifier', 'css-grid-builder', 'html-to-jsx-converter', 'rem-px-converter'],

  // ── Layout & Responsive ───────────────────────────────────────────────────
  'flexbox-builder':         ['ui-snippets', 'css-grid-builder', 'carousel-builder', 'css-to-tailwind', 'tailwind-to-css', 'rem-px-converter', 'css-media-queries-generator', 'responsive-preview-tool'],
  'css-grid-builder':        ['ui-snippets', 'flexbox-builder', 'carousel-builder', 'css-to-tailwind', 'tailwind-to-css', 'rem-px-converter', 'css-media-queries-generator', 'responsive-preview-tool'],
  'navbar-builder':          ['ui-snippets', 'flexbox-builder', 'css-grid-builder', 'responsive-preview-tool', 'css-to-tailwind', 'css-button-generator', 'glassmorphism-generator', 'html-to-jsx-converter'],
  'responsive-preview-tool': ['ui-snippets', 'aspect-ratio-calculator', 'css-media-queries-generator', 'flexbox-builder', 'css-grid-builder', 'css-clamp-generator', 'rem-px-converter', 'tailwind-formatter'],
  'css-media-queries-generator': ['css-autoprefixer', 'responsive-preview-tool', 'rem-px-converter', 'css-clamp-generator', 'flexbox-builder', 'css-grid-builder', 'tailwind-formatter', 'css-to-tailwind'],
  'aspect-ratio-calculator': ['rem-px-converter', 'css-clamp-generator', 'responsive-preview-tool', 'image-compressor', 'og-image-generator', 'favicon-generator', 'css-media-queries-generator', 'image-editor'],
  'rem-px-converter':        ['aspect-ratio-calculator', 'css-clamp-generator', 'css-media-queries-generator', 'flexbox-builder', 'css-grid-builder', 'responsive-preview-tool', 'tailwind-formatter', 'font-pairing-tool'],
  'css-clamp-generator':     ['rem-px-converter', 'css-media-queries-generator', 'flexbox-builder', 'css-grid-builder', 'responsive-preview-tool', 'font-pairing-tool', 'tailwind-formatter', 'css-to-tailwind'],

  // ── UI Components ─────────────────────────────────────────────────────────
  'carousel-builder':        ['css-animation-generator', 'css-easing-generator', 'flexbox-builder', 'css-grid-builder', 'responsive-preview-tool', 'css-to-tailwind', 'tailwind-formatter', 'css-button-generator'],
  'css-button-generator':    ['ui-snippets', 'toggle-switch-generator', 'glassmorphism-generator', 'box-shadow-generator', 'gradient-generator', 'css-animation-generator', 'color-picker', 'css-to-tailwind'],
  'toggle-switch-generator': ['ui-snippets', 'css-button-generator', 'glassmorphism-generator', 'box-shadow-generator', 'css-animation-generator', 'css-to-tailwind', 'color-picker', 'flexbox-builder'],

  // ── Animation & Motion ────────────────────────────────────────────────────
  'css-animation-generator': ['ui-snippets', 'css-easing-generator', 'css-loader-generator', 'css-transform-generator', 'svg-animation-generator', 'carousel-builder', 'css-clip-path-generator', 'css-filter-generator'],
  'css-easing-generator':    ['css-animation-generator', 'css-loader-generator', 'css-transform-generator', 'carousel-builder', 'svg-animation-generator', 'css-filter-generator', 'css-button-generator', 'box-shadow-generator'],
  'css-loader-generator':    ['css-animation-generator', 'css-easing-generator', 'css-transform-generator', 'css-shape-generator', 'svg-animation-generator', 'animated-svg-icons', 'css-filter-generator', 'glassmorphism-generator'],
  'css-transform-generator': ['css-animation-generator', 'css-easing-generator', 'css-filter-generator', 'glassmorphism-generator', 'css-clip-path-generator', 'box-shadow-generator', 'css-loader-generator', 'gradient-generator'],
  'svg-animation-generator': ['svg-playground', 'svg-motion-studio', 'animated-svg-icons', 'css-animation-generator', 'css-easing-generator', 'css-loader-generator', 'image-to-svg', 'css-clip-path-generator'],
  'svg-motion-studio':       ['svg-playground', 'svg-animation-generator', 'animated-svg-icons', 'image-to-svg', 'css-animation-generator', 'css-easing-generator', 'css-transform-generator', 'color-palette-generator'],
  'animated-svg-icons':      ['svg-motion-studio', 'svg-animation-generator', 'css-animation-generator', 'image-to-svg', 'css-loader-generator', 'css-transform-generator', 'css-clip-path-generator', 'image-to-base64'],
  'svg-wave-generator':      ['css-clip-path-generator', 'css-shape-generator', 'gradient-generator', 'mesh-gradient-generator', 'image-to-svg', 'svg-animation-generator', 'color-palette-generator', 'glassmorphism-generator'],

  // ── Visual Effects & CSS ──────────────────────────────────────────────────
  'gradient-generator':      ['ui-snippets', 'mesh-gradient-generator', 'glassmorphism-generator', 'color-palette-generator', 'color-picker', 'box-shadow-generator', 'css-filter-generator', 'css-animation-generator'],
  'mesh-gradient-generator': ['gradient-generator', 'glassmorphism-generator', 'color-palette-generator', 'color-picker', 'box-shadow-generator', 'css-filter-generator', 'css-clip-path-generator', 'css-animation-generator'],
  'glassmorphism-generator': ['ui-snippets', 'box-shadow-generator', 'gradient-generator', 'css-filter-generator', 'css-button-generator', 'toggle-switch-generator', 'css-clip-path-generator', 'color-picker'],
  'box-shadow-generator':    ['ui-snippets', 'glassmorphism-generator', 'css-button-generator', 'gradient-generator', 'css-filter-generator', 'color-picker', 'css-clip-path-generator', 'css-transform-generator'],
  'css-filter-generator':    ['css-transform-generator', 'css-clip-path-generator', 'glassmorphism-generator', 'box-shadow-generator', 'gradient-generator', 'mesh-gradient-generator', 'color-picker', 'css-animation-generator'],
  'css-clip-path-generator': ['css-shape-generator', 'glassmorphism-generator', 'css-filter-generator', 'css-transform-generator', 'box-shadow-generator', 'gradient-generator', 'css-animation-generator', 'color-picker'],
  'css-shape-generator':     ['css-clip-path-generator', 'css-loader-generator', 'css-animation-generator', 'css-transform-generator', 'css-filter-generator', 'box-shadow-generator', 'glassmorphism-generator', 'gradient-generator'],

  // ── Color & Typography ────────────────────────────────────────────────────
  'color-picker':            ['color-contrast-checker', 'color-palette-generator', 'gradient-generator', 'glassmorphism-generator', 'mesh-gradient-generator', 'box-shadow-generator', 'css-filter-generator', 'font-pairing-tool'],
  'color-palette-generator': ['color-contrast-checker', 'color-picker', 'gradient-generator', 'mesh-gradient-generator', 'font-pairing-tool', 'glassmorphism-generator', 'box-shadow-generator', 'css-filter-generator'],
  'font-pairing-tool':       ['color-palette-generator', 'css-clamp-generator', 'rem-px-converter', 'word-counter', 'color-picker', 'gradient-generator', 'meta-tag-generator', 'mesh-gradient-generator'],

  // ── Image tools ───────────────────────────────────────────────────────────
  'image-background-remover': ['image-editor', 'relight-photo', 'image-compressor', 'image-to-base64', 'image-to-svg', 'favicon-generator', 'og-image-generator', 'image-color-palette'],
  'relight-photo':           ['image-editor', 'image-compressor', 'og-image-generator', 'css-filter-generator', 'image-color-palette', 'color-picker', 'color-palette-generator', 'code-screenshot-generator'],
  'image-compressor':        ['pdf-compressor', 'images-to-pdf', 'image-to-base64', 'image-to-svg', 'image-to-text-converter', 'favicon-generator', 'qr-code-generator', 'color-picker'],
  'favicon-generator':       ['svg-to-png', 'image-compressor', 'image-to-base64', 'image-to-svg', 'meta-tag-generator', 'og-image-generator', 'color-palette-generator', 'qr-code-generator'],
  'image-to-svg':            ['svg-to-png', 'image-compressor', 'image-to-base64', 'image-to-text-converter', 'animated-svg-icons', 'svg-animation-generator', 'favicon-generator', 'css-clip-path-generator'],
  'image-to-base64':         ['images-to-pdf', 'image-compressor', 'image-to-svg', 'image-to-text-converter', 'base64-encoder-decoder', 'favicon-generator', 'qr-code-generator', 'animated-svg-icons'],
  'image-to-text-converter': ['image-to-base64', 'image-compressor', 'image-to-svg', 'word-counter', 'diff-checker', 'ai-prompt-studio', 'meta-tag-generator', 'regex-tester'],
  'qr-code-generator':       ['image-to-base64', 'image-compressor', 'favicon-generator', 'url-encoder-decoder', 'color-picker', 'color-palette-generator', 'meta-tag-generator', 'password-generator'],

  // ── SEO & Web ─────────────────────────────────────────────────────────────
  'meta-tag-generator':      ['seo-checker', 'schema-markup-generator', 'robots-txt-generator', 'sitemap-generator', 'hreflang-tag-generator', 'htaccess-redirect-generator', 'og-image-generator', 'favicon-generator'],
  'seo-checker':             ['meta-tag-generator', 'schema-markup-generator', 'sitemap-generator', 'robots-txt-generator', 'hreflang-tag-generator', 'llms-txt-generator', 'og-image-generator', 'security-headers-generator'],
  'robots-txt-generator':    ['sitemap-generator', 'meta-tag-generator', 'llms-txt-generator', 'htaccess-redirect-generator', 'schema-markup-generator', 'favicon-generator', 'og-image-generator', 'url-encoder-decoder'],
  'sitemap-generator':       ['robots-txt-generator', 'llms-txt-generator', 'meta-tag-generator', 'hreflang-tag-generator', 'schema-markup-generator', 'htaccess-redirect-generator', 'url-encoder-decoder', 'html-formatter'],
  'htaccess-redirect-generator': ['security-headers-generator', 'robots-txt-generator', 'sitemap-generator', 'meta-tag-generator', 'url-encoder-decoder', 'html-formatter', 'regex-tester', 'diff-checker'],
  'schema-markup-generator': ['meta-tag-generator', 'hreflang-tag-generator', 'sitemap-generator', 'robots-txt-generator', 'llms-txt-generator', 'og-image-generator', 'favicon-generator', 'html-formatter'],
  'hreflang-tag-generator':  ['schema-markup-generator', 'meta-tag-generator', 'sitemap-generator', 'robots-txt-generator', 'url-encoder-decoder', 'html-formatter', 'diff-checker', 'responsive-preview-tool'],
  'security-headers-generator': ['htaccess-redirect-generator', 'meta-tag-generator', 'robots-txt-generator', 'hash-generator', 'jwt-decoder', 'password-generator', 'url-encoder-decoder', 'api-request-generator-tester'],
  'llms-txt-generator':      ['sitemap-generator', 'robots-txt-generator', 'schema-markup-generator', 'meta-tag-generator', 'markdown-editor', 'markdown-to-html', 'word-counter', 'ai-prompt-studio'],

  // ── Developer tools (new) ────────────────────────────────────────────────
  'binary-hex-ascii':        ['number-base-converter', 'html-entity-encoder', 'hash-generator', 'base64-encoder-decoder', 'url-encoder-decoder', 'jwt-decoder', 'regex-tester', 'diff-checker'],
  'json-schema-generator':   ['json-formatter', 'json-to-typescript', 'yaml-json-converter', 'csv-json-converter', 'api-mock-generator', 'api-request-generator-tester', 'diff-checker', 'regex-tester'],
  'html-table-generator':    ['markdown-table-generator', 'json-table-viewer', 'csv-json-converter', 'html-formatter', 'markdown-to-html', 'diff-checker', 'json-formatter', 'word-counter'],
  'markdown-table-generator':['html-table-generator', 'json-table-viewer', 'markdown-editor', 'markdown-to-html', 'csv-json-converter', 'diff-checker', 'word-counter', 'html-formatter'],
  'xml-formatter':           ['json-formatter', 'html-formatter', 'yaml-json-converter', 'diff-checker', 'html-entity-encoder', 'regex-tester', 'api-request-generator-tester', 'code-screenshot-generator'],
  'image-color-palette':     ['color-picker', 'color-palette-generator', 'color-contrast-checker', 'gradient-generator', 'mesh-gradient-generator', 'image-editor', 'image-compressor', 'font-pairing-tool'],
  'reading-time-calculator': ['word-counter', 'ai-prompt-studio', 'diff-checker', 'text-case-converter', 'lorem-ipsum-generator', 'markdown-editor', 'meta-tag-generator', 'markdown-to-html'],

  // ── Freelancer tools (new) ────────────────────────────────────────────────
  'freelance-rate-calculator':    ['salary-to-hourly-calculator', 'budget-planner', 'paycheck-calculator', 'freelance-invoice-generator', 'time-tracker', 'working-days-calculator', 'compound-interest-calculator', 'freelance-dashboard'],
  'working-days-calculator':      ['date-calculator', 'timestamp-converter', 'pomodoro-timer', 'time-tracker', 'freelance-rate-calculator', 'freelance-availability-planner', 'daily-focus-log', 'mini-kanban'],
  'proposal-builder':             ['contract-template-manager', 'scope-creep-tracker', 'client-crm', 'follow-up-reminder-board', 'local-invoice-tracker', 'milestone-payment-tracker', 'freelance-rate-calculator', 'freelance-dashboard'],
  'contract-template-manager':    ['proposal-builder', 'scope-creep-tracker', 'client-crm', 'freelance-invoice-generator', 'local-invoice-tracker', 'client-portal-lite', 'follow-up-reminder-board', 'freelance-dashboard'],
  'scope-creep-tracker':          ['proposal-builder', 'contract-template-manager', 'client-crm', 'follow-up-reminder-board', 'local-invoice-tracker', 'milestone-payment-tracker', 'retainer-tracker', 'freelance-dashboard'],
  'follow-up-reminder-board':     ['client-crm', 'proposal-builder', 'local-invoice-tracker', 'scope-creep-tracker', 'retainer-tracker', 'milestone-payment-tracker', 'contract-template-manager', 'freelance-dashboard'],
  'local-invoice-tracker':        ['freelance-invoice-generator', 'freelance-expense-tracker', 'milestone-payment-tracker', 'retainer-tracker', 'client-crm', 'proposal-builder', 'time-tracker', 'budget-planner'],
  'freelance-expense-tracker':    ['local-invoice-tracker', 'budget-planner', 'freelance-invoice-generator', 'freelance-rate-calculator', 'paycheck-calculator', 'salary-to-hourly-calculator', 'time-tracker', 'milestone-payment-tracker'],
  'retainer-tracker':             ['local-invoice-tracker', 'freelance-expense-tracker', 'milestone-payment-tracker', 'time-tracker', 'client-crm', 'freelance-availability-planner', 'budget-planner', 'freelance-invoice-generator'],
  'freelance-availability-planner':['retainer-tracker', 'client-crm', 'milestone-payment-tracker', 'scope-creep-tracker', 'working-days-calculator', 'mini-kanban', 'time-tracker', 'freelance-dashboard'],
  'milestone-payment-tracker':    ['local-invoice-tracker', 'retainer-tracker', 'freelance-expense-tracker', 'client-crm', 'proposal-builder', 'scope-creep-tracker', 'budget-planner', 'freelance-invoice-generator'],
  'client-crm':                   ['proposal-builder', 'follow-up-reminder-board', 'client-portal-lite', 'scope-creep-tracker', 'retainer-tracker', 'milestone-payment-tracker', 'freelance-dashboard', 'local-invoice-tracker'],
  'client-intake-form-builder':   ['client-crm', 'client-portal-lite', 'proposal-builder', 'contract-template-manager', 'meta-tag-generator', 'schema-markup-generator', 'follow-up-reminder-board', 'freelance-dashboard'],
  'client-portal-lite':           ['client-crm', 'client-intake-form-builder', 'scope-creep-tracker', 'proposal-builder', 'milestone-payment-tracker', 'contract-template-manager', 'follow-up-reminder-board', 'freelance-dashboard'],

  // ── Playground / learning tools ──────────────────────────────────────────
  'ui-snippets':             ['css-playground', 'html-playground', 'js-playground', 'css-animation-generator', 'flexbox-builder', 'css-grid-builder', 'glassmorphism-generator', 'responsive-preview-tool'],
  'html-playground':         ['ui-snippets', 'css-playground', 'js-playground', 'scss-playground', 'tailwind-playground', 'bootstrap5-playground', 'react-playground', 'html-to-jsx-converter'],
  'css-playground':          ['ui-snippets', 'scss-playground', 'tailwind-playground', 'html-playground', 'css-grid-builder', 'flexbox-builder', 'css-animation-generator', 'css-minifier-beautifier'],
  'scss-playground':         ['ui-snippets', 'css-playground', 'tailwind-playground', 'bootstrap5-playground', 'css-minifier-beautifier', 'css-autoprefixer', 'css-to-tailwind', 'css-grid-builder'],
  'tailwind-playground':     ['ui-snippets', 'css-playground', 'scss-playground', 'nextjs-playground', 'react-playground', 'html-playground', 'css-to-tailwind', 'tailwind-to-css'],
  'bootstrap5-playground':   ['ui-snippets', 'html-playground', 'css-playground', 'js-playground', 'jquery-playground', 'responsive-preview-tool', 'flexbox-builder', 'css-grid-builder'],
  'jquery-playground':       ['ui-snippets', 'js-playground', 'html-playground', 'css-playground', 'bootstrap5-playground', 'api-request-generator-tester', 'css-animation-generator', 'code-screenshot-generator'],
  'js-playground':           ['ui-snippets', 'typescript-playground', 'html-playground', 'css-playground', 'jquery-playground', 'nodejs-playground', 'react-playground', 'gsap-playground'],
  'typescript-playground':   ['js-playground', 'react-playground', 'nextjs-playground', 'angular-playground', 'vue-playground', 'nodejs-playground', 'json-to-typescript', 'api-request-generator-tester'],
  'react-playground':        ['typescript-playground', 'nextjs-playground', 'js-playground', 'vue-playground', 'angular-playground', 'tailwind-playground', 'css-playground', 'gsap-playground'],
  'vue-playground':          ['js-playground', 'typescript-playground', 'react-playground', 'angular-playground', 'nextjs-playground', 'tailwind-playground', 'css-playground', 'html-playground'],
  'angular-playground':      ['typescript-playground', 'js-playground', 'react-playground', 'vue-playground', 'nextjs-playground', 'html-playground', 'css-playground', 'tailwind-playground'],
  'nextjs-playground':       ['react-playground', 'typescript-playground', 'nodejs-playground', 'tailwind-playground', 'rest-api-builder-playground', 'seo-checker', 'js-playground', 'api-request-generator-tester'],
  'nodejs-playground':       ['express-playground', 'js-playground', 'typescript-playground', 'mongo-playground', 'redis-playground', 'rest-api-builder-playground', 'git-playground', 'api-request-generator-tester'],
  'php-playground':          ['sql-playground', 'html-playground', 'js-playground', 'git-playground', 'rest-api-builder-playground', 'api-request-generator-tester', 'json-formatter', 'database-schema-designer'],
  'python-playground':       ['js-playground', 'sql-playground', 'git-playground', 'json-formatter', 'api-request-generator-tester', 'regex-tester', 'ai-prompt-studio', 'code-screenshot-generator'],
  'git-playground':          ['js-playground', 'nodejs-playground', 'php-playground', 'python-playground', 'typescript-playground', 'nextjs-playground', 'express-playground', 'rest-api-builder-playground'],
  'graphql-playground':      ['rest-api-builder-playground', 'express-playground', 'nodejs-playground', 'mongo-playground', 'api-request-generator-tester', 'json-formatter', 'json-schema-generator', 'typescript-playground'],
  'firebase-playground':     ['js-playground', 'react-playground', 'nextjs-playground', 'nodejs-playground', 'mongo-playground', 'api-request-generator-tester', 'json-formatter', 'database-schema-designer'],
  'redis-playground':        ['nodejs-playground', 'express-playground', 'mongo-playground', 'rest-api-builder-playground', 'api-request-generator-tester', 'json-formatter', 'timestamp-converter', 'cron-expression-builder'],
  'gsap-playground':         ['js-playground', 'svg-playground', 'css-animation-generator', 'react-playground', 'css-playground', 'svg-motion-studio', 'svg-animation-generator', 'code-screenshot-generator'],
  'svg-playground':          ['html-playground', 'css-playground', 'gsap-playground', 'css-animation-generator', 'svg-animation-generator', 'svg-motion-studio', 'ui-snippets', 'js-playground'],
  'mind-map':                ['daily-focus-log', 'mini-kanban', 'ai-prompt-studio', 'notepad', 'markdown-editor', 'bookmark-keeper', 'database-schema-designer', 'code-screenshot-generator'],
  'database-schema-designer':['sql-playground', 'mongo-playground', 'php-playground', 'nodejs-playground', 'json-schema-generator', 'graphql-playground', 'api-mock-generator', 'rest-api-builder-playground'],

  // ── Missing entries ───────────────────────────────────────────────────────
  'bookmark-keeper':         ['daily-diary', 'daily-focus-log', 'mini-kanban', 'freelance-dashboard', 'pomodoro-timer', 'diff-checker', 'markdown-editor', 'word-counter'],
  'daily-diary':             ['bookmark-keeper', 'daily-focus-log', 'mini-kanban', 'freelance-dashboard', 'pomodoro-timer', 'word-counter', 'markdown-editor', 'ai-prompt-studio'],
  'freelance-dashboard':     ['time-tracker', 'daily-focus-log', 'mini-kanban', 'freelance-invoice-generator', 'resume-builder', 'pomodoro-timer', 'ai-prompt-studio', 'budget-planner'],
  'fd-calculator':           ['sip-calculator', 'compound-interest-calculator', 'retirement-calculator', 'monthly-investment-calculator', 'budget-planner', 'net-worth-calculator', 'inflation-calculator', 'emi-calculator'],

};

const RELATED_GROUPS = [
  [
    'html-playground',
    'css-playground',
    'scss-playground',
    'tailwind-playground',
    'bootstrap5-playground',
    'jquery-playground',
    'js-playground',
    'typescript-playground',
    'react-playground',
    'vue-playground',
    'angular-playground',
    'nextjs-playground',
    'gsap-playground',
  ],
  [
    'nodejs-playground',
    'express-playground',
    'rest-api-builder-playground',
    'graphql-playground',
    'firebase-playground',
    'redis-playground',
    'mongo-playground',
    'sql-playground',
    'php-playground',
    'python-playground',
    'database-schema-designer',
    'api-request-generator-tester',
    'api-mock-generator',
  ],
  [
    'freelance-dashboard',
    'freelance-invoice-generator',
    'freelance-rate-calculator',
    'proposal-builder',
    'contract-template-manager',
    'client-crm',
    'client-intake-form-builder',
    'client-portal-lite',
    'scope-creep-tracker',
    'follow-up-reminder-board',
    'local-invoice-tracker',
    'freelance-expense-tracker',
    'retainer-tracker',
    'freelance-availability-planner',
    'milestone-payment-tracker',
    'time-tracker',
    'working-days-calculator',
  ],
  [
    'seo-checker',
    'meta-tag-generator',
    'schema-markup-generator',
    'sitemap-generator',
    'robots-txt-generator',
    'hreflang-tag-generator',
    'llms-txt-generator',
    'htaccess-redirect-generator',
    'security-headers-generator',
    'og-image-generator',
    'favicon-generator',
  ],
  [
    'pdf-merger',
    'pdf-splitter',
    'pdf-page-organizer',
    'pdf-compressor',
    'pdf-to-word',
    'pdf-ocr',
    'pdf-watermark',
    'pdf-password-protector',
    'pdf-unlock',
    'pdf-to-images',
    'images-to-pdf',
    'html-to-pdf',
    'pdf-metadata',
  ],
  [
    'css-minifier-beautifier',
    'css-autoprefixer',
    'css-to-tailwind',
    'tailwind-to-css',
    'tailwind-formatter',
    'flexbox-builder',
    'css-grid-builder',
    'responsive-preview-tool',
    'css-media-queries-generator',
    'css-clamp-generator',
    'rem-px-converter',
    'css-button-generator',
    'toggle-switch-generator',
  ],
  [
    'gradient-generator',
    'mesh-gradient-generator',
    'glassmorphism-generator',
    'box-shadow-generator',
    'css-filter-generator',
    'css-clip-path-generator',
    'css-shape-generator',
    'css-animation-generator',
    'css-easing-generator',
    'css-loader-generator',
    'css-transform-generator',
    'svg-motion-studio',
    'svg-animation-generator',
    'animated-svg-icons',
    'svg-wave-generator',
  ],
  [
    'json-formatter',
    'json-to-typescript',
    'json-schema-generator',
    'json-table-viewer',
    'json-dashboard-generator',
    'yaml-json-converter',
    'csv-json-converter',
    'xml-formatter',
    'sql-formatter',
    'diff-checker',
    'regex-tester',
  ],
  [
    'image-editor',
    'image-background-remover',
    'relight-photo',
    'image-compressor',
    'image-to-svg',
    'image-to-base64',
    'image-to-text-converter',
    'image-color-palette',
    'svg-to-png',
    'qr-code-generator',
  ],
  [
    'budget-planner',
    'net-worth-calculator',
    'retirement-calculator',
    'compound-interest-calculator',
    'monthly-investment-calculator',
    'sip-calculator',
    'fd-calculator',
    'emi-calculator',
    'mortgage-calculator',
    'rent-vs-buy-calculator',
    'loan-payoff-calculator',
    'credit-card-payoff-calculator',
    'paycheck-calculator',
    'salary-to-hourly-calculator',
  ],
  [
    'daily-focus-log',
    'mini-kanban',
    'pomodoro-timer',
    'notepad',
    'daily-diary',
    'bookmark-keeper',
    'mind-map',
    'markdown-editor',
    'word-counter',
    'reading-time-calculator',
    'ai-prompt-studio',
  ],
];

const RELATED_FILLER_POOL = [
  'json-formatter',
  'word-counter',
  'code-screenshot-generator',
  'timestamp-converter',
  'cron-expression-builder',
  'diff-checker',
  'color-picker',
  'qr-code-generator',
  'password-generator',
  'regex-tester',
  'markdown-editor',
  'html-formatter',
  'css-minifier-beautifier',
  'image-compressor',
  'svg-to-png',
  'meta-tag-generator',
];

// webdevpuneet.com carries only a subset of the fwdtools registry — skip any
// related slug that is not a live tool here so strips fill with valid links.
const LIVE_SLUGS = new Set(LIVE_TOOLS.map(t => t.slug));

function normalizeRelatedTools(slug, relatedSlugs) {
  const seen = new Set();
  const normalized = [];
  const topicFallbacks = RELATED_GROUPS
    .filter(group => group.includes(slug))
    .flat();
  const candidates = [...(relatedSlugs || []), ...topicFallbacks, ...RELATED_FILLER_POOL];

  for (const candidate of candidates) {
    if (
      candidate === slug ||
      seen.has(candidate) ||
      !LIVE_SLUGS.has(candidate)
    ) {
      continue;
    }

    seen.add(candidate);
    normalized.push(candidate);
    if (normalized.length === 8) break;
  }

  return normalized;
}

export const RELATED_TOOLS = Object.fromEntries(
  Object.entries(RAW_RELATED_TOOLS).map(([slug, relatedSlugs]) => [
    slug,
    normalizeRelatedTools(slug, relatedSlugs),
  ])
);
