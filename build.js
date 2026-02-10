'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, 'cv-data.json');
const TEMPLATES_DIR = path.join(ROOT, 'templates');
const PDFS_DIR = path.join(ROOT, 'pdfs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const TEMPLATES = [
  { name: 'cv',    module: 'cv.js',    output: 'cv.html',    pdf: true },
  { name: 'cv-v1',  module: 'cv-v1.js',  output: 'cv-v1.html',  pdf: true },
  { name: 'cv-v1a', module: 'cv-v1a.js', output: 'cv-v1a.html', pdf: true },
  { name: 'cv-v1b', module: 'cv-v1b.js', output: 'cv-v1b.html', pdf: true },
  { name: 'cv-v1c', module: 'cv-v1c.js', output: 'cv-v1c.html', pdf: true },
  { name: 'cv-v1d', module: 'cv-v1d.js', output: 'cv-v1d.html', pdf: true },
  { name: 'cv-v1e', module: 'cv-v1e.js', output: 'cv-v1e.html', pdf: true },
  { name: 'cv-v1f', module: 'cv-v1f.js', output: 'cv-v1f.html', pdf: true },
  { name: 'cv-v1g', module: 'cv-v1g.js', output: 'cv-v1g.html', pdf: true },
  { name: 'cv-v1h', module: 'cv-v1h.js', output: 'cv-v1h.html', pdf: true },
  { name: 'cv-v1i', module: 'cv-v1i.js', output: 'cv-v1i.html', pdf: true },
  { name: 'cv-v1j', module: 'cv-v1j.js', output: 'cv-v1j.html', pdf: true },
  { name: 'cv-v1k', module: 'cv-v1k.js', output: 'cv-v1k.html', pdf: true },
  { name: 'cv-v1l', module: 'cv-v1l.js', output: 'cv-v1l.html', pdf: true },
  { name: 'cv-v1m', module: 'cv-v1m.js', output: 'cv-v1m.html', pdf: true },
  { name: 'cv-v1n', module: 'cv-v1n.js', output: 'cv-v1n.html', pdf: true },
  { name: 'cv-v2', module: 'cv-v2.js', output: 'cv-v2.html', pdf: true  },
  { name: 'cv-v5', module: 'cv-v5.js', output: 'cv-v5.html', pdf: true  },
  { name: 'cv-v6', module: 'cv-v6.js', output: 'cv-v6.html', pdf: true  },
  { name: 'cv-v7', module: 'cv-v7.js', output: 'cv-v7.html', pdf: true  },
  { name: 'cv-v8', module: 'cv-v8.js', output: 'cv-v8.html', pdf: true  },
  { name: 'cv-v9', module: 'cv-v9.js', output: 'cv-v9.html', pdf: true  },
  { name: 'cv-v3', module: 'cv-v3.js', output: 'cv-v3.html', pdf: true },
  { name: 'cv-v4', module: 'cv-v4.js', output: 'cv-v4.html', pdf: true },
  { name: 'index', module: 'index.js', output: 'index.html', pdf: false },
];

function loadData() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function buildHtml(templateFilter) {
  const data = loadData();
  const targets = templateFilter
    ? TEMPLATES.filter(t => t.name === templateFilter)
    : TEMPLATES;

  if (templateFilter && targets.length === 0) {
    console.error(`Unknown template: ${templateFilter}`);
    console.error(`Available: ${TEMPLATES.map(t => t.name).join(', ')}`);
    process.exit(1);
  }

  for (const t of targets) {
    const mod = require(path.join(TEMPLATES_DIR, t.module));
    const html = mod.render(data);
    const outPath = path.join(ROOT, t.output);
    fs.writeFileSync(outPath, html, 'utf-8');
    console.log(`  HTML  ${t.output}`);
  }

  return targets;
}

function buildPdfs(templateFilter) {
  if (!fs.existsSync(PDFS_DIR)) {
    fs.mkdirSync(PDFS_DIR, { recursive: true });
  }

  const targets = templateFilter
    ? TEMPLATES.filter(t => t.name === templateFilter && t.pdf)
    : TEMPLATES.filter(t => t.pdf);

  if (templateFilter && targets.length === 0) {
    console.log(`  SKIP  No PDF target for: ${templateFilter}`);
    return;
  }

  for (const t of targets) {
    const inputPath = path.join(ROOT, t.output);
    const outputPath = path.join(PDFS_DIR, t.name + '.pdf');
    const fileUrl = 'file://' + inputPath;

    try {
      execFileSync(CHROME_PATH, [
        '--headless',
        '--disable-gpu',
        '--no-pdf-header-footer',
        '--print-to-pdf=' + outputPath,
        fileUrl,
      ], { stdio: 'pipe', timeout: 30000 });
      console.log(`  PDF   pdfs/${t.name}.pdf`);
    } catch (err) {
      console.error(`  FAIL  pdfs/${t.name}.pdf — ${err.message.split('\n')[0]}`);
    }
  }
}

// --- CLI ---
const args = process.argv.slice(2);
const htmlOnly = args.includes('--html-only');
const pdfOnly = args.includes('--pdf-only');
const templateArg = args.find(a => a.startsWith('--template='));
const templateFilter = templateArg ? templateArg.split('=')[1] : null;

console.log('build.js — CV build system');
console.log('─'.repeat(40));

if (!pdfOnly) {
  console.log('\nGenerating HTML...');
  buildHtml(templateFilter);
}

if (!htmlOnly) {
  console.log('\nGenerating PDFs...');
  buildPdfs(templateFilter);
}

console.log('\nDone.');
