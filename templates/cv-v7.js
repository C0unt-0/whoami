'use strict';

const h = require('./helpers');

function render(data) {
  const { personal, experience, otherExperience, projects, education, interests, training, references } = data;

  const firstName = h.escapeHtml(personal.firstName);
  const lastName = h.escapeHtml(personal.lastName);
  const fullName = `${firstName} ${lastName}`;
  const email = h.escapeHtml(personal.email);
  const phone = h.escapeHtml(personal.phone);
  const githubUrl = h.escapeHtml(personal.github.url);
  const githubDisplay = h.escapeHtml(personal.github.display);
  const linkedinUrl = h.escapeHtml(personal.linkedin.url);
  const linkedinDisplay = h.escapeHtml(personal.linkedin.display);
  const websiteDisplay = h.escapeHtml(personal.website.display);
  const websiteUrl = personal.website.url.replace(/\/$/, '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${firstName} ${lastName} ${h.mdash()} CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">
<style>
/* ═══════════════════════════════════════════════════════════════
   BLUEPRINT / TECHNICAL DRAWING — cv-v7
   Engineering blueprint aesthetic. Dark blue background, white lines.
   ═══════════════════════════════════════════════════════════════ */

:root {
  --bp-bg: #1a3a5c;
  --bp-bg-deep: #142e4a;
  --bp-white: #ffffff;
  --bp-light: #c8ddf0;
  --bp-secondary: #6fa8dc;
  --bp-cyan: #00bcd4;
  --bp-grid: rgba(111,168,220,.1);
  --bp-grid-major: rgba(111,168,220,.18);
  --bp-border: rgba(255,255,255,.35);
  --bp-border-faint: rgba(255,255,255,.15);
  --bp-text-dim: rgba(255,255,255,.55);
  --mono: 'Share Tech Mono', 'Courier New', monospace;
}

/* ═══════ RESET ═══════ */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 10px; }

body {
  font-family: var(--mono);
  background: var(--bp-bg);
  color: var(--bp-white);
  line-height: 1.65;
  max-width: 820px;
  margin: 0 auto;
  padding: 40px 40px 30px;
  -webkit-font-smoothing: antialiased;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  position: relative;

  /* Graph paper grid */
  background-image:
    repeating-linear-gradient(0deg, var(--bp-grid) 0px, var(--bp-grid) 1px, transparent 1px, transparent 20px),
    repeating-linear-gradient(90deg, var(--bp-grid) 0px, var(--bp-grid) 1px, transparent 1px, transparent 20px),
    repeating-linear-gradient(0deg, var(--bp-grid-major) 0px, var(--bp-grid-major) 1px, transparent 1px, transparent 100px),
    repeating-linear-gradient(90deg, var(--bp-grid-major) 0px, var(--bp-grid-major) 1px, transparent 1px, transparent 100px);
  background-color: var(--bp-bg);
}

a { color: var(--bp-cyan); text-decoration: none; }
a:hover { text-decoration: underline; }
::selection { background: var(--bp-cyan); color: var(--bp-bg); }

/* ═══════ DRAWING BORDER ═══════ */
.drawing-border {
  border: 2px solid var(--bp-border);
  padding: 28px 32px 20px;
  position: relative;
  min-height: calc(100vh - 80px);
}

/* Outer thin border (double-line engineering drawing border) */
.drawing-border::before {
  content: '';
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border: 1px solid var(--bp-border-faint);
  pointer-events: none;
}

/* ═══════ CORNER CROP MARKS ═══════ */
.crop-tl, .crop-tr, .crop-bl, .crop-br {
  position: absolute;
  font-size: 16px;
  color: var(--bp-secondary);
  line-height: 1;
  opacity: 0.6;
  font-family: var(--mono);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.crop-tl { top: 4px; left: 6px; }
.crop-tr { top: 4px; right: 6px; }
.crop-bl { bottom: 4px; left: 6px; }
.crop-br { bottom: 4px; right: 6px; }

/* ═══════ REVISION ANNOTATION ═══════ */
.revision-mark {
  position: absolute;
  top: 8px;
  right: 40px;
  font-size: 7.5px;
  color: var(--bp-secondary);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.7;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ═══════ HEADER ═══════ */
.header {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--bp-border);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.bp-name {
  font-size: 32px;
  font-weight: 400;
  color: var(--bp-white);
  letter-spacing: 6px;
  text-transform: uppercase;
  line-height: 1.2;
  margin-bottom: 4px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.bp-name .emphasis {
  color: var(--bp-cyan);
}

.bp-tagline {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 16px;
}
.bp-tagline-item {
  font-size: 8.5px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--bp-secondary);
  padding: 3px 10px;
  border: 1px solid rgba(111,168,220,.3);
  position: relative;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Contact annotation box with corner marks */
.contact-box {
  position: relative;
  border: 1px solid var(--bp-border-faint);
  padding: 10px 16px;
  margin-top: 12px;
  display: inline-block;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Corner marks for contact box */
.contact-box::before {
  content: '+';
  position: absolute;
  top: -5px;
  left: -5px;
  font-size: 9px;
  color: var(--bp-secondary);
  line-height: 1;
}
.contact-box::after {
  content: '+';
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 9px;
  color: var(--bp-secondary);
  line-height: 1;
}
.contact-box-inner::before {
  content: '+';
  position: absolute;
  bottom: -5px;
  left: -5px;
  font-size: 9px;
  color: var(--bp-secondary);
  line-height: 1;
}
.contact-box-inner::after {
  content: '+';
  position: absolute;
  bottom: -5px;
  right: -5px;
  font-size: 9px;
  color: var(--bp-secondary);
  line-height: 1;
}

.contact-line {
  font-size: 9px;
  color: var(--bp-light);
  line-height: 1.9;
  letter-spacing: 0.5px;
}
.contact-line .label {
  color: var(--bp-text-dim);
  margin-right: 6px;
}
.contact-line a {
  color: var(--bp-cyan);
}

.online-link {
  display: none;
  margin-top: 6px;
  font-size: 8.5px;
  color: var(--bp-text-dim);
}
.online-link a {
  color: var(--bp-cyan);
}

/* ═══════ SECTION HEADERS ═══════ */
.bp-section {
  margin-bottom: 22px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.bp-section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.section-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid var(--bp-cyan);
  font-size: 10px;
  color: var(--bp-cyan);
  letter-spacing: 1px;
  flex-shrink: 0;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.section-label {
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--bp-white);
  white-space: nowrap;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Dimension line extending right */
.section-line {
  flex: 1;
  height: 0;
  border-top: 1px solid var(--bp-border-faint);
  position: relative;
}
.section-line::after {
  content: '';
  position: absolute;
  right: 0;
  top: -3px;
  width: 5px;
  height: 5px;
  border-top: 1px solid var(--bp-border-faint);
  border-right: 1px solid var(--bp-border-faint);
  transform: rotate(45deg);
}

/* ═══════ EXPERIENCE ═══════ */
.exp-entry {
  margin-bottom: 16px;
  padding: 12px 14px;
  border: 1px solid var(--bp-border-faint);
  position: relative;
  break-inside: avoid;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.exp-entry:last-child { margin-bottom: 0; }

/* Thin left accent */
.exp-entry::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--bp-cyan);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.exp-dates {
  font-size: 8px;
  color: var(--bp-cyan);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 2px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Revision-style date annotation */
.exp-dates::before {
  content: 'REV ';
  color: var(--bp-text-dim);
  font-size: 7px;
}

.exp-company {
  font-size: 9px;
  color: var(--bp-secondary);
  letter-spacing: 1px;
  margin-bottom: 2px;
}

.exp-role {
  font-size: 11px;
  color: var(--bp-white);
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.exp-bullet {
  font-size: 9px;
  color: var(--bp-light);
  line-height: 1.7;
  padding-left: 16px;
  position: relative;
  margin-bottom: 2px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.exp-bullet::before {
  content: '\\25B8';
  position: absolute;
  left: 0;
  color: var(--bp-cyan);
  font-size: 8px;
}

/* ═══════ PROJECTS ═══════ */
.proj-entry {
  margin-bottom: 12px;
  padding: 12px 14px;
  border: 1px solid rgba(0,188,212,.3);
  position: relative;
  break-inside: avoid;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.proj-entry:last-child { margin-bottom: 0; }

.proj-name {
  font-size: 11px;
  color: var(--bp-white);
  letter-spacing: 0.5px;
}
.proj-org {
  font-size: 8.5px;
  color: var(--bp-text-dim);
  letter-spacing: 0.5px;
  margin-left: 4px;
}

.proj-bullets {
  margin-top: 6px;
}
.proj-bullet {
  font-size: 9px;
  color: var(--bp-light);
  line-height: 1.7;
  padding-left: 16px;
  position: relative;
  margin-bottom: 2px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.proj-bullet::before {
  content: '\\25B8';
  position: absolute;
  left: 0;
  color: var(--bp-cyan);
  font-size: 8px;
}

.proj-tags {
  display: flex;
  gap: 5px;
  margin-top: 8px;
  flex-wrap: wrap;
}
.proj-tag {
  font-size: 7.5px;
  padding: 2px 7px;
  border: 1px solid rgba(0,188,212,.25);
  color: var(--bp-cyan);
  letter-spacing: 1px;
  text-transform: uppercase;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ═══════ EDUCATION & INTERESTS — SIDE BY SIDE ═══════ */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  break-inside: avoid;
}

.edu-entry {
  margin-bottom: 10px;
  padding: 8px 12px;
  border-left: 2px solid var(--bp-secondary);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.edu-degree {
  font-size: 10px;
  color: var(--bp-white);
  letter-spacing: 0.5px;
}
.edu-ongoing {
  font-size: 7px;
  color: var(--bp-cyan);
  letter-spacing: 2px;
  margin-left: 6px;
  border: 1px solid rgba(0,188,212,.3);
  padding: 1px 5px;
  vertical-align: middle;
}
.edu-school {
  font-size: 8.5px;
  color: var(--bp-text-dim);
  margin-top: 2px;
  letter-spacing: 0.3px;
}

.interest-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.interest-tag {
  font-size: 8.5px;
  padding: 3px 8px;
  border: 1px solid var(--bp-border-faint);
  color: var(--bp-light);
  letter-spacing: 0.5px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.interest-tag.sec {
  color: var(--bp-cyan);
  border-color: rgba(0,188,212,.3);
}

/* ═══════ TRAINING ═══════ */
.train-group {
  margin-bottom: 14px;
  break-inside: avoid;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.train-group:last-child { margin-bottom: 0; }

.train-provider {
  font-size: 8px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--bp-cyan);
  margin-bottom: 6px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.train-courses {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.train-course {
  font-size: 8px;
  padding: 3px 8px;
  border: 1px solid var(--bp-border-faint);
  color: var(--bp-light);
  line-height: 1.5;
  letter-spacing: 0.3px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ═══════ REFERENCES — SPEC BLOCKS ═══════ */
.ref-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.ref-card {
  padding: 10px 12px;
  border: 1px solid var(--bp-border-faint);
  position: relative;
  break-inside: avoid;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Top-left corner tick mark */
.ref-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-top: 2px solid var(--bp-cyan);
  border-left: 2px solid var(--bp-cyan);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
/* Bottom-right corner tick mark */
.ref-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-bottom: 2px solid var(--bp-cyan);
  border-right: 2px solid var(--bp-cyan);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.ref-spec-label {
  font-size: 7px;
  color: var(--bp-text-dim);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 4px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.ref-name {
  font-size: 10px;
  color: var(--bp-white);
  letter-spacing: 0.5px;
}
.ref-role {
  font-size: 8.5px;
  color: var(--bp-secondary);
  margin-top: 2px;
  line-height: 1.5;
}
.ref-loc {
  font-size: 7.5px;
  color: var(--bp-text-dim);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 2px;
}
.ref-email {
  font-size: 8px;
  color: var(--bp-cyan);
  margin-top: 5px;
  word-break: break-all;
}

/* ═══════ TITLE BLOCK FOOTER ═══════ */
.title-block {
  margin-top: 28px;
  border: 2px solid var(--bp-border);
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.tb-cell {
  padding: 8px 12px;
  border-right: 1px solid var(--bp-border-faint);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.tb-cell:last-child {
  border-right: none;
}

.tb-label {
  font-size: 6.5px;
  color: var(--bp-text-dim);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.tb-value {
  font-size: 9px;
  color: var(--bp-white);
  letter-spacing: 1px;
}
.tb-value.cyan {
  color: var(--bp-cyan);
}

/* ═══════ PRINT STYLES — KEEP DARK BLUEPRINT ═══════ */
@page {
  size: A4;
  margin: 10mm 12mm;
}

@media print {
  html {
    background: var(--bp-bg) !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    background: var(--bp-bg) !important;
    background-image:
      repeating-linear-gradient(0deg, var(--bp-grid) 0px, var(--bp-grid) 1px, transparent 1px, transparent 20px),
      repeating-linear-gradient(90deg, var(--bp-grid) 0px, var(--bp-grid) 1px, transparent 1px, transparent 20px),
      repeating-linear-gradient(0deg, var(--bp-grid-major) 0px, var(--bp-grid-major) 1px, transparent 1px, transparent 100px),
      repeating-linear-gradient(90deg, var(--bp-grid-major) 0px, var(--bp-grid-major) 1px, transparent 1px, transparent 100px) !important;
    background-color: var(--bp-bg) !important;
    color: var(--bp-white) !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    padding: 20px 28px;
    max-width: 100%;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .online-link {
    display: block;
  }

  .drawing-border {
    border-color: var(--bp-border) !important;
    padding: 20px 24px 16px;
  }

  .exp-entry { break-inside: avoid; }
  .proj-entry { break-inside: avoid; }
  .ref-card { break-inside: avoid; }
  .train-group { break-inside: avoid; }
  .two-col { break-inside: avoid; }
  .bp-section { break-inside: avoid; }

  .exp-entry::before {
    background: var(--bp-cyan) !important;
  }

  .title-block {
    border-color: var(--bp-border) !important;
  }

  a { text-decoration: none; }
  a[href]::after { content: none; }
}

/* ═══════ RESPONSIVE ═══════ */
@media (max-width: 700px) {
  body { padding: 20px 16px; }
  .drawing-border { padding: 16px 14px; }
  .two-col { grid-template-columns: 1fr; gap: 16px; }
  .ref-grid { grid-template-columns: 1fr; }
  .bp-name { font-size: 24px; letter-spacing: 3px; }
  .title-block { grid-template-columns: 1fr; }
  .tb-cell { border-right: none; border-bottom: 1px solid var(--bp-border-faint); }
  .tb-cell:last-child { border-bottom: none; }
}
</style>
</head>
<body>

<div class="drawing-border">

  <!-- CORNER CROP MARKS -->
  <span class="crop-tl">&#x250C;</span>
  <span class="crop-tr">&#x2510;</span>
  <span class="crop-bl">&#x2514;</span>
  <span class="crop-br">&#x2518;</span>

  <!-- REVISION ANNOTATION -->
  <div class="revision-mark">REVISION: 2026.02</div>

  <!-- ═══════ HEADER ═══════ -->
  <header class="header">
    <h1 class="bp-name">${firstName} ${personal.lastNameEmphasis ? `<span class="emphasis">${lastName}</span>` : lastName}</h1>
    <div class="bp-tagline">
${personal.titles.map(title => `      <span class="bp-tagline-item">${h.escapeHtml(title)}</span>`).join('\n')}
    </div>
    <div class="contact-box">
      <span class="contact-box-inner"></span>
      <div class="contact-line"><span class="label">EMAIL</span>${email}</div>
      <div class="contact-line"><span class="label">PHONE</span>${phone}</div>
      <div class="contact-line"><span class="label">GITHUB</span><a href="${githubUrl}">${githubDisplay}</a></div>
      <div class="contact-line"><span class="label">LINKEDIN</span><a href="${linkedinUrl}">${linkedinDisplay}</a></div>
    </div>
    <div class="online-link">
      <span class="label">WEB</span> <a href="${websiteUrl}">${websiteDisplay}</a>
    </div>
  </header>

  <!-- ═══════ 01 — WORK EXPERIENCE ═══════ -->
  <section class="bp-section">
    <div class="bp-section-header">
      <span class="section-num">01</span>
      <span class="section-label">WORK EXPERIENCE</span>
      <span class="section-line"></span>
    </div>

${experience.map(exp => `    <div class="exp-entry">
      <div class="exp-dates">${h.formatDates(exp.dates)}</div>
      <div class="exp-company">${h.escapeHtml(exp.company)}</div>
      <div class="exp-role">${h.formatRole(exp.role)}</div>
${exp.bullets.map(bullet => `      <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
    </div>`).join('\n\n')}
  </section>

  <!-- ═══════ 02 — OTHER EXPERIENCE ═══════ -->
  <section class="bp-section">
    <div class="bp-section-header">
      <span class="section-num">02</span>
      <span class="section-label">OTHER EXPERIENCE</span>
      <span class="section-line"></span>
    </div>

${otherExperience.map(exp => `    <div class="exp-entry">
      <div class="exp-dates">${h.formatDates(exp.dates)}</div>
      <div class="exp-company">${h.escapeHtml(exp.company)}</div>
      <div class="exp-role">${h.formatRole(exp.role)}</div>
${exp.bullets.map(bullet => `      <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
    </div>`).join('\n\n')}
  </section>

  <!-- ═══════ 03 — KEY PROJECTS ═══════ -->
  <section class="bp-section">
    <div class="bp-section-header">
      <span class="section-num">03</span>
      <span class="section-label">KEY PROJECTS</span>
      <span class="section-line"></span>
    </div>

${projects.map(proj => `    <div class="proj-entry">
      <div><span class="proj-name">${h.escapeHtml(proj.name)}</span><span class="proj-org">${h.mdash()} ${h.escapeHtml(proj.org)}</span></div>
      <div class="proj-bullets">
${proj.bullets.map(bullet => `        <div class="proj-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
      </div>
      <div class="proj-tags">
${proj.tags.map(tag => `        <span class="proj-tag">${h.escapeHtml(tag)}</span>`).join('\n')}
      </div>
    </div>`).join('\n\n')}
  </section>

  <!-- ═══════ 04/05 — EDUCATION & INTERESTS ═══════ -->
  <div class="two-col">
    <section class="bp-section">
      <div class="bp-section-header">
        <span class="section-num">04</span>
        <span class="section-label">EDUCATION</span>
        <span class="section-line"></span>
      </div>
${education.map(edu => `      <div class="edu-entry">
        <div class="edu-degree">${h.escapeHtml(edu.degree)}${edu.ongoing ? '<span class="edu-ongoing">ONGOING</span>' : ''}</div>
        <div class="edu-school">${h.escapeHtml(edu.school)}${edu.year ? ' ' + h.middot() + ' ' + h.escapeHtml(edu.year) : ''}</div>
      </div>`).join('\n')}
    </section>

    <section class="bp-section">
      <div class="bp-section-header">
        <span class="section-num">05</span>
        <span class="section-label">INTERESTS</span>
        <span class="section-line"></span>
      </div>
      <div class="interest-grid">
${interests.map(interest => `        <span class="interest-tag${interest.secondary ? ' sec' : ''}">${h.escapeHtml(interest.name)}</span>`).join('\n')}
      </div>
    </section>
  </div>

  <!-- ═══════ 06 — PROFESSIONAL TRAINING ═══════ -->
  <section class="bp-section">
    <div class="bp-section-header">
      <span class="section-num">06</span>
      <span class="section-label">PROFESSIONAL TRAINING</span>
      <span class="section-line"></span>
    </div>

${training.map(group => `    <div class="train-group">
      <div class="train-provider">${h.escapeHtml(group.provider)}</div>
      <div class="train-courses">
${group.courses.map(course => `        <span class="train-course">${h.formatCourse(course)}</span>`).join('\n')}
      </div>
    </div>`).join('\n\n')}
  </section>

  <!-- ═══════ 07 — REFERENCES ═══════ -->
  <section class="bp-section">
    <div class="bp-section-header">
      <span class="section-num">07</span>
      <span class="section-label">REFERENCES</span>
      <span class="section-line"></span>
    </div>

    <div class="ref-grid">
${references.map((ref, idx) => `      <div class="ref-card">
        <div class="ref-spec-label">SPEC ${String(idx + 1).padStart(2, '0')}</div>
        <div class="ref-name">${h.escapeHtml(ref.name)}</div>
        <div class="ref-role">${h.escapeHtml(ref.role)} ${h.middot()} ${h.escapeHtml(ref.company)}</div>
        <div class="ref-loc">${h.escapeHtml(ref.location)}</div>
        ${ref.email ? `<div class="ref-email">${h.escapeHtml(ref.email)}</div>` : ""}${ref.phone ? `<div class="ref-email">${h.escapeHtml(ref.phone)}</div>` : ""}
      </div>`).join('\n')}
    </div>
  </section>

  <!-- ═══════ TITLE BLOCK FOOTER ═══════ -->
  <footer class="title-block">
    <div class="tb-cell">
      <div class="tb-label">DRAWN BY</div>
      <div class="tb-value">${fullName.toUpperCase()}</div>
    </div>
    <div class="tb-cell">
      <div class="tb-label">DOCUMENT</div>
      <div class="tb-value">CURRICULUM VITAE</div>
    </div>
    <div class="tb-cell">
      <div class="tb-label">REVISION</div>
      <div class="tb-value cyan">2026.02</div>
    </div>
  </footer>

</div><!-- .drawing-border -->

</body>
</html>`;
}

module.exports = { render };
