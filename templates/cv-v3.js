'use strict';

const h = require('./helpers');

function render(data) {
  const firstName = h.escapeHtml(data.personal.firstName).toUpperCase();
  const lastName = h.escapeHtml(data.personal.lastName).toUpperCase();
  const email = h.escapeHtml(data.personal.email);
  const phone = h.escapeHtml(data.personal.phone);
  const githubUrl = h.escapeHtml(data.personal.github.url);
  const githubDisplay = h.escapeHtml(data.personal.github.display);
  const linkedinUrl = h.escapeHtml(data.personal.linkedin.url);
  const linkedinDisplay = h.escapeHtml(data.personal.linkedin.display);
  const websiteDisplay = h.escapeHtml(data.personal.website.display);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pubudu Nawarathna — CV // Terminal Output</title>
<meta name="description" content="Senior Software Engineer / Security Engineer / AI & Automation — Pubudu Nawarathna's classified terminal CV">
<meta name="theme-color" content="#0a0a12">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
/* ═══════════════════════════════════════════════════════════════
   CLASSIFIED TERMINAL OUTPUT — cv-v3
   Dark mode CV that prints on dark paper
   ═══════════════════════════════════════════════════════════════ */

:root {
  --bg: #0a0a12;
  --bg-card: #0f0f1a;
  --bg-card-hover: #141422;
  --green: #00ff88;
  --green-dim: rgba(0,255,136,.15);
  --green-glow: rgba(0,255,136,.35);
  --green-faint: rgba(0,255,136,.06);
  --red: #ff3c55;
  --red-dim: rgba(255,60,85,.15);
  --red-glow: rgba(255,60,85,.35);
  --red-faint: rgba(255,60,85,.06);
  --text: #c8c8d4;
  --text-dim: #8a8a9e;
  --text-faint: #4a4a5e;
  --border: #1e1e30;
  --border-bright: #2a2a40;
  --font: 'Fira Code', monospace;
}

/* ═══════ RESET ═══════ */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 10px; }

body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  line-height: 1.65;
  max-width: 820px;
  margin: 0 auto;
  padding: 24px 36px 24px 60px;
  -webkit-font-smoothing: antialiased;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  position: relative;
  counter-reset: line-counter;
}

a { color: var(--green); text-decoration: none; }
::selection { background: var(--green); color: var(--bg); }

/* ═══════ LINE NUMBERS — left margin ═══════ */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 48px;
  background: rgba(6,6,14,.6);
  border-right: 1px solid var(--border);
  z-index: 0;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.line-numbered {
  counter-increment: line-counter;
  position: relative;
}
.line-numbered::before {
  content: counter(line-counter);
  position: absolute;
  left: -48px;
  width: 38px;
  text-align: right;
  font-size: 8.5px;
  color: var(--text-faint);
  opacity: .45;
  font-family: var(--font);
  line-height: inherit;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ═══════ BOOT SEQUENCE HEADER ═══════ */
.boot-line {
  font-size: 9px;
  color: var(--text-faint);
  letter-spacing: 1px;
  margin-bottom: 2px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.boot-line .ok { color: var(--green); }
.boot-line .fail { color: var(--red); }

/* ═══════ HEADER / WHOAMI ═══════ */
.header {
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-bright);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.prompt {
  font-size: 10px;
  color: var(--text-faint);
  margin-bottom: 3px;
}
.prompt .path { color: var(--green); }
.prompt .cmd { color: var(--text); }

.whoami-name {
  font-size: 26px;
  font-weight: 700;
  color: #eeedf6;
  letter-spacing: 1px;
  line-height: 1.2;
  margin-bottom: 2px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.whoami-name .accent { color: var(--green); }

.header-tags {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
}
.header-tag {
  font-size: 9px;
  padding: 3px 8px;
  border: 1px solid var(--green-dim);
  color: var(--green);
  letter-spacing: 1.5px;
  background: var(--green-faint);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.header-tag.red {
  border-color: var(--red-dim);
  color: var(--red);
  background: var(--red-faint);
}

.contact-block {
  margin-top: 10px;
  font-size: 10px;
  color: var(--text-dim);
  line-height: 1.8;
}
.contact-block .key { color: var(--text-faint); }
.contact-block .val { color: var(--green); }
.contact-block a { color: var(--green); }

.print-url {
  display: none;
}

/* ═══════ SECTION HEADERS — shell comments ═══════ */
.section-header {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-faint);
  letter-spacing: 2px;
  margin-top: 18px;
  margin-bottom: 12px;
  padding: 4px 0;
  border-bottom: 1px solid var(--border);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.section-header .hash { color: var(--green); }
.section-header .bar { color: var(--border-bright); }

/* ═══════ EXPERIENCE — structured YAML output ═══════ */
.exp-entry {
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
  break-inside: avoid;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.exp-entry:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

.exp-meta-line {
  font-size: 9.5px;
  color: var(--text-faint);
  margin-bottom: 1px;
  line-height: 1.6;
}
.exp-meta-line .yaml-key { color: var(--text-dim); }
.exp-meta-line .yaml-val { color: var(--text); }
.exp-meta-line .yaml-val.highlight { color: #eeedf6; font-weight: 600; }
.exp-meta-line .yaml-val.date { color: var(--green); }
.exp-meta-line .yaml-val.org { color: var(--red); }

.exp-bullets {
  margin-top: 5px;
  padding-left: 16px;
}

.exp-bullet {
  font-size: 10px;
  color: var(--text-dim);
  margin-top: 3px;
  position: relative;
  padding-left: 16px;
  line-height: 1.6;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.exp-bullet::before {
  content: '\\2192';
  position: absolute;
  left: 0;
  color: var(--green);
  font-size: 10px;
}

/* ═══════ PROJECT CARDS — green left border glow ═══════ */
.proj-entry {
  margin-bottom: 12px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  border-left: 2px solid var(--green);
  box-shadow: -4px 0 12px rgba(0,255,136,.08), inset 1px 0 8px rgba(0,255,136,.03);
  break-inside: avoid;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.proj-name {
  font-size: 11px;
  font-weight: 600;
  color: #eeedf6;
}
.proj-org {
  font-size: 9.5px;
  color: var(--text-faint);
  margin-left: 4px;
}

.proj-bullets {
  margin-top: 5px;
}
.proj-bullet {
  font-size: 10px;
  color: var(--text-dim);
  margin-top: 3px;
  padding-left: 16px;
  position: relative;
  line-height: 1.6;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.proj-bullet::before {
  content: '\\2192';
  position: absolute;
  left: 0;
  color: var(--green);
  font-size: 10px;
}

.proj-tags {
  display: flex;
  gap: 5px;
  margin-top: 7px;
  flex-wrap: wrap;
}
.proj-tag {
  font-size: 8.5px;
  padding: 2px 7px;
  background: var(--green-faint);
  border: 1px solid var(--border-bright);
  color: var(--green);
  letter-spacing: .5px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ═══════ EDUCATION / INTERESTS GRID ═══════ */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.edu-entry {
  margin-bottom: 8px;
}
.edu-degree {
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
}
.edu-ongoing {
  font-size: 8px;
  color: var(--red);
  letter-spacing: 2px;
  font-weight: 700;
  margin-left: 4px;
}
.edu-school {
  font-size: 9.5px;
  color: var(--text-dim);
  margin-top: 1px;
}

.interest-grid {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
.interest-tag {
  font-size: 9.5px;
  padding: 4px 10px;
  border: 1px solid var(--border-bright);
  color: var(--text-dim);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.interest-tag.green {
  border-color: var(--green-dim);
  color: var(--green);
}
.interest-tag.red {
  border-color: var(--red-dim);
  color: var(--red);
}

/* ═══════ TRAINING — package install output ═══════ */
.training-group {
  margin-bottom: 12px;
  break-inside: avoid;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.training-provider {
  font-size: 10px;
  font-weight: 600;
  color: var(--green);
  letter-spacing: 1.5px;
  margin-bottom: 5px;
}
.training-provider .registry { color: var(--text-faint); font-weight: 400; }

.training-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.training-item {
  font-size: 9px;
  padding: 3px 8px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-dim);
  line-height: 1.5;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.training-item .ver { color: var(--green); font-size: 8px; }

/* ═══════ REFERENCES — config file entries ═══════ */
.ref-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}
.ref-card {
  padding: 10px 12px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  break-inside: avoid;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.ref-card .cfg-comment {
  font-size: 8px;
  color: var(--text-faint);
  margin-bottom: 4px;
  letter-spacing: 1px;
}
.ref-name {
  font-size: 11px;
  font-weight: 600;
  color: #eeedf6;
}
.ref-role {
  font-size: 9px;
  color: var(--text-dim);
  margin-top: 2px;
  line-height: 1.5;
}
.ref-loc {
  font-size: 8.5px;
  color: var(--text-faint);
  margin-top: 1px;
}
.ref-email {
  font-size: 9px;
  color: var(--green);
  margin-top: 5px;
  word-break: break-all;
}

/* ═══════ FOOTER ═══════ */
.footer {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
  font-size: 9px;
  color: var(--text-faint);
  letter-spacing: 1px;
  text-align: center;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.footer .code { color: var(--green); }

/* ═══════ PRINT STYLES — KEEP DARK ═══════ */
@page {
  size: A4;
  margin: 10mm 12mm;
}

@media print {
  /* Force dark background to print */
  html {
    background: var(--bg) !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    background: var(--bg) !important;
    color: var(--text) !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    padding: 0 24px 0 48px;
    max-width: 100%;
  }

  /* Force all backgrounds to print */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Line number gutter for print */
  body::before {
    position: absolute;
    background: rgba(6,6,14,.6);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Show print-only URL */
  .print-url {
    display: block;
    font-size: 9px;
    color: var(--text-faint);
    margin-top: 4px;
  }
  .print-url .val { color: var(--green); }

  /* Page break control */
  .exp-entry { break-inside: avoid; }
  .proj-entry { break-inside: avoid; }
  .ref-card { break-inside: avoid; }
  .training-group { break-inside: avoid; }
  .two-col { break-inside: avoid; }

  /* Keep the project card styling intact */
  .proj-entry {
    background: var(--bg-card) !important;
    border-left: 2px solid var(--green) !important;
    box-shadow: -4px 0 12px rgba(0,255,136,.08) !important;
  }

  .ref-card {
    background: var(--bg-card) !important;
  }

  .training-item {
    background: var(--bg-card) !important;
  }

  .header-tag {
    background: var(--green-faint) !important;
  }
  .header-tag.red {
    background: var(--red-faint) !important;
  }
}

/* ═══════ RESPONSIVE ═══════ */
@media (max-width: 700px) {
  body { padding: 16px 16px 16px 48px; }
  .two-col { grid-template-columns: 1fr; gap: 16px; }
  .ref-grid { grid-template-columns: 1fr; }
  .whoami-name { font-size: 22px; }
}

@media (max-width: 480px) {
  body { padding: 12px 12px 12px 40px; }
  body::before { width: 32px; }
  .line-numbered::before { left: -36px; width: 28px; font-size: 7.5px; }
  .whoami-name { font-size: 18px; }
  .header-tags { gap: 4px; }
  .header-tag { font-size: 8px; padding: 2px 6px; }
}
</style>
</head>
<body>

<!-- ═══════ BOOT SEQUENCE ═══════ -->
<div class="boot-line line-numbered"><span class="ok">[OK]</span> Loading kernel modules...</div>
<div class="boot-line line-numbered"><span class="ok">[OK]</span> Mounting /dev/career</div>
<div class="boot-line line-numbered"><span class="ok">[OK]</span> Initializing classified personnel record</div>
<div class="boot-line line-numbered">────────────────────────────────────────────────────</div>

<!-- ═══════ HEADER / WHOAMI ═══════ -->
<header class="header line-numbered">
  <div class="prompt"><span class="path">~/classified</span> $ <span class="cmd">whoami --verbose</span></div>
  <h1 class="whoami-name">${firstName} <span class="accent">${lastName}</span></h1>
  <div class="header-tags">
    <span class="header-tag">SENIOR_SOFTWARE_ENGINEER</span>
    <span class="header-tag">SECURITY_ENGINEER</span>
    <span class="header-tag red">AI_&amp;_AUTOMATION</span>
  </div>
  <div class="contact-block">
    <div><span class="key">email:</span> <span class="val">${email}</span></div>
    <div><span class="key">phone:</span> <span class="val">${phone}</span></div>
    <div><span class="key">github:</span> <a href="${githubUrl}">${githubDisplay}</a></div>
    <div><span class="key">linkedin:</span> <a href="${linkedinUrl}">${linkedinDisplay}</a></div>
  </div>
  <div class="print-url"><span class="key">web:</span> <span class="val">${websiteDisplay}</span></div>
</header>

<!-- ═══════ WORK EXPERIENCE ═══════ -->
<div class="section-header line-numbered"><span class="hash">#</span> <span class="bar">═══</span> WORK_EXPERIENCE <span class="bar">═══════════════════════════════</span></div>

${data.experience.map(exp => `<div class="exp-entry line-numbered">
  <div class="exp-meta-line"><span class="yaml-key">period:</span> <span class="yaml-val date">${h.formatDates(exp.dates)}</span></div>
  <div class="exp-meta-line"><span class="yaml-key">org:</span> <span class="yaml-val org">${h.escapeHtml(exp.company)}</span></div>
  <div class="exp-meta-line"><span class="yaml-key">role:</span> <span class="yaml-val highlight">${h.formatRole(exp.role)}</span></div>
  <div class="exp-bullets">
${exp.bullets.map(bullet => `    <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
  </div>
</div>`).join('\n\n')}

<!-- ═══════ OTHER EXPERIENCE ═══════ -->
<div class="section-header line-numbered"><span class="hash">#</span> <span class="bar">═══</span> OTHER_EXPERIENCE <span class="bar">═══════════════════════════</span></div>

${data.otherExperience.map(exp => `<div class="exp-entry line-numbered">
  <div class="exp-meta-line"><span class="yaml-key">period:</span> <span class="yaml-val date">${h.formatDates(exp.dates)}</span></div>
  <div class="exp-meta-line"><span class="yaml-key">org:</span> <span class="yaml-val org">${h.escapeHtml(exp.company)}</span></div>
  <div class="exp-meta-line"><span class="yaml-key">role:</span> <span class="yaml-val highlight">${h.formatRole(exp.role)}</span></div>
  <div class="exp-bullets">
${exp.bullets.map(bullet => `    <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
  </div>
</div>`).join('\n\n')}


<!-- ═══════ PROJECTS ═══════ -->
<div class="section-header line-numbered"><span class="hash">#</span> <span class="bar">═══</span> KEY_PROJECTS <span class="bar">═══════════════════════════════════</span></div>

${data.projects.map(proj => `<div class="proj-entry line-numbered">
  <div><span class="proj-name">${h.escapeHtml(proj.name)}</span><span class="proj-org">&mdash; ${h.escapeHtml(proj.org)}</span></div>
  <div class="proj-bullets">
${proj.bullets.map(bullet => `    <div class="proj-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
  </div>
  <div class="proj-tags">
${proj.tags.map(tag => `    <span class="proj-tag">[${h.escapeHtml(tag)}]</span>`).join('\n')}
  </div>
</div>`).join('\n\n')}

<!-- ═══════ EDUCATION & INTERESTS ═══════ -->
<div class="two-col">
  <div>
    <div class="section-header line-numbered"><span class="hash">#</span> <span class="bar">═══</span> EDUCATION <span class="bar">═══════════════</span></div>
${data.education.map(edu => `    <div class="edu-entry">
      <div class="edu-degree">${h.escapeHtml(edu.degree)}${edu.ongoing ? ' <span class="edu-ongoing">ONGOING</span>' : ''}</div>
      <div class="edu-school">${h.escapeHtml(edu.school)}${edu.year ? ' &middot; ' + h.escapeHtml(edu.year) : ''}</div>
    </div>`).join('\n')}
  </div>

  <div>
    <div class="section-header line-numbered"><span class="hash">#</span> <span class="bar">═══</span> INTERESTS <span class="bar">═══════════════</span></div>
    <div class="interest-grid">
${data.interests.map((interest, idx) => {
  let className = 'interest-tag';
  if ([0, 1, 2].includes(idx)) className = 'interest-tag green';
  else if ([3, 5].includes(idx)) className = 'interest-tag red';
  return `      <span class="${className}">${h.escapeHtml(interest.name)}</span>`;
}).join('\n')}
    </div>
  </div>
</div>

<!-- ═══════ PROFESSIONAL TRAINING ═══════ -->
<div class="section-header line-numbered"><span class="hash">#</span> <span class="bar">═══</span> PROFESSIONAL_TRAINING <span class="bar">══════════════════════</span></div>

${data.training.map(group => {
  const providerUpper = group.provider.toUpperCase().replace(/\s+/g, '_');
  return `<div class="training-group line-numbered">
  <div class="training-provider"><span class="registry">$</span> pip install --source <span>${providerUpper}</span></div>
  <div class="training-list">
${group.courses.map(course => {
  // Remove commas from specific Coursera courses
  let displayCourse = course;
  if (group.provider === 'Coursera') {
    if (course === 'Cybersecurity Compliance Framework, Standards & Regulations') {
      displayCourse = 'Cybersecurity Compliance Framework Standards & Regulations';
    } else if (course === 'Operating Systems: Overview, Administration, and Security') {
      displayCourse = 'Operating Systems: Overview Administration and Security';
    }
  }
  return `    <span class="training-item">${h.formatCourse(displayCourse)} <span class="ver">installed</span></span>`;
}).join('\n')}
  </div>
</div>`;
}).join('\n\n')}

<!-- ═══════ REFERENCES ═══════ -->
<div class="section-header line-numbered"><span class="hash">#</span> <span class="bar">═══</span> REFERENCES <span class="bar">═══════════════════════════════════</span></div>

<div class="ref-grid">
${data.references.map((ref, idx) => `  <div class="ref-card">
    <div class="cfg-comment"># [contact.${idx}]</div>
    <div class="ref-name">${h.escapeHtml(ref.name)}</div>
    <div class="ref-role">${h.escapeHtml(ref.role)} &middot; ${h.escapeHtml(ref.company)}</div>
    <div class="ref-loc">${h.escapeHtml(ref.location)}</div>
    ${ref.email ? `<div class="ref-email">${h.escapeHtml(ref.email)}</div>` : ""}${ref.phone ? `<div class="ref-email">${h.escapeHtml(ref.phone)}</div>` : ""}
  </div>`).join('\n')}
</div>

<!-- ═══════ FOOTER ═══════ -->
<div class="footer line-numbered">
  // EOF &mdash; process exited with code <span class="code">0</span>
</div>

</body>
</html>
`;
}

module.exports = { render };
