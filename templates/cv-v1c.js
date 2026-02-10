'use strict';

const h = require('./helpers');

function render(data) {
  const { personal, experience, otherExperience, projects, education, interests, training, references } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${h.escapeHtml(personal.firstName)} ${h.escapeHtml(personal.lastName)} — CV</title>
<meta name="description" content="${personal.titles.join(', ')} \u2014 ${personal.firstName} ${personal.lastName}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Archivo+Narrow:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
/* ========================================================
   MIDNIGHT PURPLE — Swiss / Bauhaus Dark Mode
   Deep purple + gold + near-white
   ======================================================== */

@page {
  size: A4;
  margin: 10mm 13mm;
}

:root {
  --deep-purple: #1a0e2e;
  --royal-purple: #4a2d7a;
  --gold: #c9a84c;
  --near-white: #f8f6ff;
  --lavender: #b8a9d4;
  --card-bg: #251a3d;
  --border-subtle: #3a2860;
  --text-muted: #9a8bb8;
  --heading: 'Syne', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --body: 'Archivo Narrow', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --col: 68px;
}

/* ═══════ RESET ═══════ */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 10px; }
body {
  font-family: var(--body);
  font-weight: 400;
  color: var(--near-white);
  background: var(--deep-purple);
  line-height: 1.5;
  max-width: 820px;
  margin: 0 auto;
  padding: 24px 28px 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
a { color: var(--near-white); text-decoration: none; }
a:hover { color: var(--gold); }

/* ═══════ HEADER ═══════ */
.header {
  position: relative;
  padding-bottom: 12px;
  margin-bottom: 16px;
}
.header-gold-bar {
  display: block;
  width: 100%;
  height: 6px;
  background: var(--gold);
  margin-bottom: 14px;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}
.name-block { flex: 1; }
.name {
  font-family: var(--heading);
  font-size: 48px;
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -2px;
  color: var(--near-white);
  text-transform: uppercase;
}
.name em {
  font-style: normal;
  font-weight: 400;
  text-decoration: underline;
  text-decoration-color: var(--gold);
  text-underline-offset: 4px;
  text-decoration-thickness: 3px;
}
.tagline {
  display: flex;
  gap: 0;
  margin-top: 10px;
}
.tagline span {
  font-family: var(--heading);
  font-size: 7.5px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  padding: 4px 10px;
  background: var(--royal-purple);
  color: var(--near-white);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.tagline span + span {
  margin-left: 1px;
}
.tagline span:last-child {
  background: var(--gold);
  color: var(--deep-purple);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.contact-block {
  text-align: right;
  font-family: var(--body);
  font-size: 9px;
  line-height: 1.9;
  color: var(--lavender);
  flex-shrink: 0;
}
.contact-block a {
  color: var(--near-white);
  font-weight: 600;
}
.contact-label {
  font-family: var(--heading);
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 2px;
}
.header-rule {
  display: block;
  width: 100%;
  height: 3px;
  background: var(--gold);
  margin-top: 16px;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.online-link {
  display: none;
  font-family: var(--heading);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-top: 3px;
}
.online-link a { color: var(--gold); font-weight: 700; }

/* ═══════ SECTION SYSTEM ═══════ */
.section {
  margin-bottom: 12px;
  position: relative;
}
.section-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
  position: relative;
  border-bottom: 2px solid var(--gold);
  padding-bottom: 4px;
  break-after: avoid;
}
.section-num {
  font-family: var(--heading);
  font-size: 38px;
  font-weight: 800;
  color: var(--gold);
  line-height: 1;
  letter-spacing: -2px;
  user-select: none;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.section-title {
  font-family: var(--heading);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--near-white);
  position: relative;
  top: -2px;
}
.section-header-alt .section-title {
  color: var(--lavender);
}
.section-header-alt {
  border-bottom-color: var(--lavender);
}

/* ═══════ EXPERIENCE GRID ═══════ */
.exp {
  display: grid;
  grid-template-columns: 112px 1fr;
  gap: 0 14px;
  margin-bottom: 7px;
  padding-bottom: 7px;
  border-bottom: 1px solid var(--border-subtle);
  page-break-inside: avoid;
  break-inside: avoid;
}
.exp:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
.exp-left {
  padding-top: 1px;
}
.exp-dates {
  font-family: var(--heading);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--gold);
  line-height: 1.5;
}
.exp-company {
  font-family: var(--body);
  font-size: 8.5px;
  color: var(--lavender);
  font-weight: 500;
  margin-top: 1px;
  line-height: 1.4;
}
.exp-role {
  font-family: var(--heading);
  font-size: 12.5px;
  font-weight: 800;
  color: var(--near-white);
  line-height: 1.3;
  letter-spacing: -0.2px;
}
.exp-bullets { margin-top: 4px; }
.exp-bullet {
  font-size: 9.5px;
  color: var(--lavender);
  line-height: 1.55;
  padding-left: 12px;
  position: relative;
  margin-top: 2px;
}
.exp-bullet::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 4px;
  height: 4px;
  background: var(--gold);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

/* ═══════ PROJECTS ═══════ */
.proj {
  margin-bottom: 6px;
  padding: 6px 10px 7px;
  border-left: 4px solid var(--gold);
  background: var(--card-bg);
  page-break-inside: avoid;
  break-inside: avoid;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.proj-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.proj-name {
  font-family: var(--heading);
  font-size: 10.5px;
  font-weight: 800;
  color: var(--near-white);
  letter-spacing: -0.1px;
}
.proj-org {
  font-family: var(--heading);
  font-size: 8px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.5px;
}
.proj-bullets { margin-top: 4px; }
.proj-bullet {
  font-size: 9.5px;
  color: var(--lavender);
  line-height: 1.5;
  padding-left: 12px;
  position: relative;
  margin-top: 1.5px;
}
.proj-bullet::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 4px;
  height: 4px;
  background: var(--gold);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.proj-tags {
  display: flex;
  gap: 3px;
  margin-top: 6px;
  flex-wrap: wrap;
}
.proj-tag {
  font-family: var(--heading);
  font-size: 6.5px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 2px 7px;
  border: 1.5px solid var(--gold);
  color: var(--gold);
  background: transparent;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

/* ═══════ EDUCATION & INTERESTS — SIDE BY SIDE ═══════ */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.edu {
  margin-bottom: 8px;
  break-inside: avoid;
}
.edu-degree {
  font-family: var(--heading);
  font-size: 11.5px;
  font-weight: 800;
  color: var(--near-white);
}
.edu-ongoing {
  display: inline-block;
  font-family: var(--heading);
  font-size: 6.5px;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: var(--deep-purple);
  background: var(--gold);
  padding: 2px 7px 1px;
  margin-left: 4px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.edu-school {
  font-family: var(--body);
  font-size: 9px;
  color: var(--lavender);
  margin-top: 2px;
}
.interest-list {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.interest-item {
  font-family: var(--heading);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border: 1.5px solid var(--lavender);
  color: var(--lavender);
}
.interest-item.sec {
  border-color: var(--gold);
  color: var(--gold);
  font-weight: 700;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

/* ═══════ TRAINING ═══════ */
.train-group {
  margin-bottom: 5px;
  break-inside: avoid;
}
.train-provider {
  font-family: var(--heading);
  font-size: 7.5px;
  font-weight: 800;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  padding-bottom: 4px;
  margin-bottom: 4px;
  border-bottom: 1.5px solid var(--gold);
  display: inline-block;
}
.train-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}
.train-item {
  font-family: var(--body);
  font-size: 8.5px;
  padding: 2px 8px;
  border: 1px solid var(--border-subtle);
  color: var(--lavender);
}

/* ═══════ REFERENCES ═══════ */
.ref-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.ref {
  padding: 7px 10px;
  border: 1.5px solid var(--border-subtle);
  border-top: 4px solid var(--gold);
  background: var(--card-bg);
  page-break-inside: avoid;
  break-inside: avoid;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.ref-name {
  font-family: var(--heading);
  font-size: 10.5px;
  font-weight: 800;
  color: var(--near-white);
}
.ref-role {
  font-family: var(--body);
  font-size: 8.5px;
  color: var(--lavender);
  margin-top: 2px;
  line-height: 1.4;
}
.ref-loc {
  font-family: var(--heading);
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 3px;
}
.ref-email {
  font-family: var(--body);
  font-size: 8.5px;
  color: var(--gold);
  font-weight: 600;
  margin-top: 5px;
  word-break: break-all;
}

/* ═══════ FOOTER ═══════ */
.footer {
  margin-top: 12px;
  position: relative;
}
.footer-gold-bar {
  display: block;
  width: 100%;
  height: 4px;
  background: var(--gold);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
}
.footer-sig {
  font-family: var(--heading);
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
}
.footer-mark {
  font-family: var(--heading);
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-muted);
}

/* ═══════ GEOMETRIC DIVIDER ═══════ */
.geo-divider {
  display: flex;
  align-items: center;
  gap: 0;
  margin: 8px 0;
}
.geo-divider .bar-gold {
  flex: 1;
  height: 2px;
  background: var(--gold);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.geo-divider .diamond {
  width: 8px;
  height: 8px;
  background: var(--royal-purple);
  transform: rotate(45deg);
  margin: 0 4px;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

/* ═══════ PRINT STYLES ═══════ */
@media print {
  html { font-size: 10px; }
  body {
    padding: 0;
    max-width: 100%;
    background: var(--deep-purple);
    color: var(--near-white);
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  .online-link { display: block; }
  .exp { break-inside: avoid; }
  .proj { break-inside: avoid; }
  .ref { break-inside: avoid; }
  .grid-2 { break-inside: avoid; }
  .train-group { break-inside: avoid; }
  a { color: var(--near-white); }
  a[href]::after { content: none; }
  .header-gold-bar,
  .header-rule,
  .footer-gold-bar,
  .geo-divider .bar-gold,
  .geo-divider .diamond,
  .tagline span,
  .section-num,
  .edu-ongoing,
  .interest-item.sec,
  .proj,
  .proj-tag,
  .proj-bullet::before,
  .exp-bullet::before,
  .ref {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}
</style>
</head>
<body>

<!-- ════════════════════════════════════════════════
     HEADER
     ════════════════════════════════════════════════ -->
<div class="header">
  <span class="header-gold-bar"></span>
  <div class="header-content">
    <div class="name-block">
      <div class="name">${h.escapeHtml(personal.firstName)} ${personal.lastNameEmphasis ? `<em>${h.escapeHtml(personal.lastName)}</em>` : h.escapeHtml(personal.lastName)}</div>
      <div class="tagline">
${personal.titles.map((title, idx) => `        <span>${h.escapeHtml(title)}</span>`).join('\n')}
      </div>
    </div>
    <div class="contact-block">
      <span class="contact-label">Contact</span>
      ${h.escapeHtml(personal.email)}<br>
      ${h.escapeHtml(personal.phone)}<br>
      <a href="${h.escapeHtml(personal.github.url)}">${h.escapeHtml(personal.github.display)}</a><br>
      <a href="${h.escapeHtml(personal.linkedin.url)}">${h.escapeHtml(personal.linkedin.display)}</a>
      <div class="online-link"><a href="${h.escapeHtml(personal.website.url)}">${h.escapeHtml(personal.website.display)}</a></div>
    </div>
  </div>
  <span class="header-rule"></span>
</div>

<!-- ════════════════════════════════════════════════
     01 — WORK EXPERIENCE
     ════════════════════════════════════════════════ -->
<div class="section">
  <div class="section-header">
    <span class="section-num">01</span>
    <span class="section-title">Work Experience</span>
  </div>

${experience.map(exp => `  <div class="exp">
    <div class="exp-left">
      <div class="exp-dates">${h.formatDates(exp.dates)}</div>
      <div class="exp-company">${h.escapeHtml(exp.company)}</div>
    </div>
    <div>
      <div class="exp-role">${h.formatRole(exp.role)}</div>
      <div class="exp-bullets">
${exp.bullets.map(bullet => `        <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
      </div>
    </div>
  </div>`).join('\n\n')}
</div>

<!-- ════════════════════════════════════════════════
     02 — OTHER EXPERIENCE
     ════════════════════════════════════════════════ -->
<div class="section">
  <div class="section-header section-header-alt">
    <span class="section-num">02</span>
    <span class="section-title">Other Experience</span>
  </div>

${otherExperience.map(exp => `  <div class="exp">
    <div class="exp-left">
      <div class="exp-dates">${h.formatDates(exp.dates)}</div>
      <div class="exp-company">${h.escapeHtml(exp.company)}</div>
    </div>
    <div>
      <div class="exp-role">${h.formatRole(exp.role)}</div>
      <div class="exp-bullets">
${exp.bullets.map(bullet => `        <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
      </div>
    </div>
  </div>`).join('\n\n')}

</div>

<!-- ════════════════════════════════════════════════
     03 — KEY PROJECTS
     ════════════════════════════════════════════════ -->
<div class="section">
  <div class="section-header">
    <span class="section-num">03</span>
    <span class="section-title">Key Projects</span>
  </div>

${projects.map(proj => `  <div class="proj">
    <div class="proj-head">
      <span class="proj-name">${h.escapeHtml(proj.name)}</span>
      <span class="proj-org">${h.mdash()} ${h.escapeHtml(proj.org)}</span>
    </div>
    <div class="proj-bullets">
${proj.bullets.map(bullet => `      <div class="proj-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
    </div>
    <div class="proj-tags">
${proj.tags.map(tag => `      <span class="proj-tag">${h.escapeHtml(tag)}</span>`).join('\n')}
    </div>
  </div>`).join('\n\n')}
</div>

<!-- ════════════════════════════════════════════════
     04 / 05 — EDUCATION & INTERESTS (SIDE BY SIDE)
     ════════════════════════════════════════════════ -->
<div class="grid-2">
  <div class="section">
    <div class="section-header">
      <span class="section-num">04</span>
      <span class="section-title">Education</span>
    </div>
${education.map(edu => `    <div class="edu">
      <div class="edu-degree">${h.escapeHtml(edu.degree)}${edu.ongoing ? ' <span class="edu-ongoing">ONGOING</span>' : ''}</div>
      <div class="edu-school">${h.escapeHtml(edu.school)}${edu.year ? ` ${h.middot()} ${h.escapeHtml(edu.year)}` : ''}</div>
    </div>`).join('\n')}
  </div>

  <div class="section">
    <div class="section-header">
      <span class="section-num">05</span>
      <span class="section-title">Interests</span>
    </div>
    <div class="interest-list">
${interests.map(interest => `      <span class="interest-item${interest.secondary ? ' sec' : ''}">${h.escapeHtml(interest.name)}</span>`).join('\n')}
    </div>
  </div>
</div>

<!-- GEOMETRIC DIVIDER -->
<div class="geo-divider">
  <span class="bar-gold"></span>
  <span class="diamond"></span>
  <span class="bar-gold"></span>
  <span class="diamond"></span>
  <span class="bar-gold"></span>
</div>

<!-- ════════════════════════════════════════════════
     06 — PROFESSIONAL TRAINING
     ════════════════════════════════════════════════ -->
<div class="section">
  <div class="section-header">
    <span class="section-num">06</span>
    <span class="section-title">Professional Training</span>
  </div>

${training.map(group => `  <div class="train-group">
    <div class="train-provider">${h.escapeHtml(group.provider)}</div>
    <div class="train-list">
${group.courses.map(course => `      <span class="train-item">${h.formatCourse(course)}</span>`).join('\n')}
    </div>
  </div>`).join('\n\n')}
</div>

<!-- ════════════════════════════════════════════════
     07 — REFERENCES
     ════════════════════════════════════════════════ -->
<div class="section">
  <div class="section-header">
    <span class="section-num">07</span>
    <span class="section-title">References</span>
  </div>
  <div class="ref-grid">
${references.map(ref => `    <div class="ref">
      <div class="ref-name">${h.escapeHtml(ref.name)}</div>
      <div class="ref-role">${h.escapeHtml(ref.role)} ${h.middot()} ${h.escapeHtml(ref.company)}</div>
      <div class="ref-loc">${h.escapeHtml(ref.location)}</div>
      ${ref.email ? `<div class="ref-email">${h.escapeHtml(ref.email)}</div>` : ""}${ref.phone ? `<div class="ref-email">${h.escapeHtml(ref.phone)}</div>` : ""}
    </div>`).join('\n')}
  </div>
</div>

<!-- ════════════════════════════════════════════════
     FOOTER
     ════════════════════════════════════════════════ -->
<div class="footer">
  <span class="footer-gold-bar"></span>
  <div class="footer-content">
    <div class="footer-sig">${h.escapeHtml(personal.firstName)} ${h.escapeHtml(personal.lastName)} ${h.mdash()} Curriculum Vitae</div>
    <div class="footer-mark">c0unt-0/whoami</div>
  </div>
</div>

</body>
</html>`;
}

module.exports = { render };
