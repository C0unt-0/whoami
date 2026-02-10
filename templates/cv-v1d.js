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
<link href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@400;500;600;700;800;900&family=Archivo+Narrow:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
/* ========================================================
   BURNT ORANGE — SWISS / BAUHAUS VARIANT
   Charcoal + terracotta/burnt orange + warm white
   Desert architecture: adobe walls, terracotta tiles
   ======================================================== */

@page {
  size: A4;
  margin: 10mm 13mm;
}

:root {
  --charcoal: #2a2a2e;
  --orange: #c4632a;
  --warm-white: #faf8f5;
  --clay: #8b5e3c;
  --warm-gray: #6b6b70;
  --ref-bg: #f0ece6;
  --gray-light: #d9d4cd;
  --heading: 'Darker Grotesque', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --body: 'Archivo Narrow', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --col: 68px;
}

/* ═══════ RESET ═══════ */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 10px; }
body {
  font-family: var(--body);
  font-weight: 400;
  color: var(--charcoal);
  background: var(--warm-white);
  line-height: 1.5;
  max-width: 820px;
  margin: 0 auto;
  padding: 24px 28px 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a { color: var(--charcoal); text-decoration: none; }
a:hover { color: var(--orange); }

/* ═══════ HEADER ═══════ */
.header {
  position: relative;
  padding-bottom: 12px;
  margin-bottom: 16px;
}
.header-accent-bar {
  display: block;
  width: 100%;
  height: 6px;
  background: var(--orange);
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
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -3px;
  color: var(--charcoal);
  text-transform: uppercase;
}
.name em {
  font-style: normal;
  font-weight: 400;
  text-decoration: underline;
  text-decoration-color: var(--orange);
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
  background: var(--charcoal);
  color: var(--warm-white);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.tagline span + span {
  margin-left: 1px;
}
.tagline span:last-child {
  background: var(--orange);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.contact-block {
  text-align: right;
  font-family: var(--body);
  font-size: 9px;
  line-height: 1.9;
  color: var(--warm-gray);
  flex-shrink: 0;
}
.contact-block a {
  color: var(--charcoal);
  font-weight: 600;
}
.contact-label {
  font-family: var(--heading);
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--warm-gray);
  display: block;
  margin-bottom: 2px;
}
.header-rule {
  display: block;
  width: 100%;
  height: 3px;
  background: var(--charcoal);
  margin-top: 16px;
}
.online-link {
  display: none;
  font-family: var(--heading);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--warm-gray);
  margin-top: 3px;
}
.online-link a { color: var(--charcoal); font-weight: 700; }

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
  border-bottom: 4px solid var(--orange);
  padding-bottom: 4px;
  break-after: avoid;
}
.section-num {
  font-family: var(--heading);
  font-size: 38px;
  font-weight: 900;
  color: var(--clay);
  line-height: 1;
  letter-spacing: -2px;
  user-select: none;
  position: relative;
  top: 8px;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.section-title {
  font-family: var(--heading);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--charcoal);
  position: relative;
  top: -2px;
}
.section-header-alt .section-title {
  color: var(--warm-gray);
}
.section-header-alt {
  border-bottom-color: var(--warm-gray);
  border-bottom-width: 2px;
}

/* ═══════ EXPERIENCE GRID ═══════ */
.exp {
  display: grid;
  grid-template-columns: 112px 1fr;
  gap: 0 14px;
  margin-bottom: 7px;
  padding-bottom: 7px;
  border-bottom: 1px solid var(--gray-light);
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
  color: var(--charcoal);
  line-height: 1.5;
}
.exp-company {
  font-family: var(--body);
  font-size: 8.5px;
  color: var(--warm-gray);
  font-weight: 500;
  margin-top: 1px;
  line-height: 1.4;
}
.exp-role {
  font-family: var(--heading);
  font-size: 12.5px;
  font-weight: 800;
  color: var(--charcoal);
  line-height: 1.3;
  letter-spacing: -0.2px;
}
.exp-bullets { margin-top: 4px; }
.exp-bullet {
  font-size: 9.5px;
  color: #4a4a4e;
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
  background: var(--orange);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

/* ═══════ PROJECTS ═══════ */
.proj {
  margin-bottom: 6px;
  padding: 6px 10px 7px;
  border-left: 4px solid var(--charcoal);
  background: var(--warm-white);
  page-break-inside: avoid;
  break-inside: avoid;
}
.proj:nth-child(even) {
  border-left-color: var(--orange);
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
  color: var(--charcoal);
  letter-spacing: -0.1px;
}
.proj-org {
  font-family: var(--heading);
  font-size: 8px;
  font-weight: 600;
  color: var(--clay);
  letter-spacing: 0.5px;
}
.proj-bullets { margin-top: 4px; }
.proj-bullet {
  font-size: 9.5px;
  color: #4a4a4e;
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
  background: var(--charcoal);
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
  border: none;
  color: var(--warm-white);
  background: var(--orange);
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
  color: var(--charcoal);
}
.edu-ongoing {
  display: inline-block;
  font-family: var(--heading);
  font-size: 6.5px;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: var(--warm-white);
  background: var(--orange);
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
  color: var(--warm-gray);
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
  border: 1.5px solid var(--charcoal);
  color: var(--charcoal);
}
.interest-item.sec {
  border-color: var(--orange);
  color: var(--orange);
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
  color: var(--charcoal);
  padding-bottom: 4px;
  margin-bottom: 4px;
  border-bottom: 1.5px solid var(--charcoal);
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
  border: 1px solid var(--gray-light);
  color: #4a4a4e;
}

/* ═══════ REFERENCES ═══════ */
.ref-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.ref {
  padding: 7px 10px;
  border: none;
  border-top: 4px solid var(--orange);
  background: var(--ref-bg);
  page-break-inside: avoid;
  break-inside: avoid;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.ref-name {
  font-family: var(--heading);
  font-size: 10.5px;
  font-weight: 800;
  color: var(--charcoal);
}
.ref-role {
  font-family: var(--body);
  font-size: 8.5px;
  color: var(--warm-gray);
  margin-top: 2px;
  line-height: 1.4;
}
.ref-loc {
  font-family: var(--heading);
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--clay);
  margin-top: 3px;
}
.ref-email {
  font-family: var(--body);
  font-size: 8.5px;
  color: var(--charcoal);
  font-weight: 600;
  margin-top: 5px;
  word-break: break-all;
}

/* ═══════ FOOTER ═══════ */
.footer {
  margin-top: 12px;
  position: relative;
}
.footer-accent-bar {
  display: block;
  width: 100%;
  height: 4px;
  background: var(--orange);
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
  color: var(--warm-gray);
}
.footer-mark {
  font-family: var(--heading);
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--warm-gray);
}

/* ═══════ GEOMETRIC DIVIDER — STRIPED PATTERN ═══════ */
.geo-divider {
  display: flex;
  align-items: center;
  gap: 0;
  margin: 8px 0;
}
.geo-divider .bar-charcoal {
  flex: 1;
  height: 3px;
  background: var(--charcoal);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.geo-divider .bar-orange {
  flex: 1;
  height: 3px;
  background: var(--orange);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

/* ═══════ PRINT STYLES ═══════ */
@media print {
  html { font-size: 10px; }
  body {
    padding: 0;
    max-width: 100%;
    background: var(--warm-white);
  }
  .online-link { display: block; }
  .exp { break-inside: avoid; }
  .proj { break-inside: avoid; }
  .ref { break-inside: avoid; }
  .grid-2 { break-inside: avoid; }
  .train-group { break-inside: avoid; }
  a { color: var(--charcoal); }
  a[href]::after { content: none; }
  .header-accent-bar,
  .footer-accent-bar,
  .geo-divider .bar-charcoal,
  .geo-divider .bar-orange,
  .tagline span,
  .section-num,
  .edu-ongoing,
  .interest-item.sec,
  .proj,
  .proj-tag,
  .ref,
  .exp-bullet::before {
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
  <span class="header-accent-bar"></span>
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

<!-- GEOMETRIC DIVIDER — STRIPED PATTERN -->
<div class="geo-divider">
  <span class="bar-charcoal"></span>
  <span class="bar-orange"></span>
  <span class="bar-charcoal"></span>
  <span class="bar-orange"></span>
  <span class="bar-charcoal"></span>
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
  <span class="footer-accent-bar"></span>
  <div class="footer-content">
    <div class="footer-sig">${h.escapeHtml(personal.firstName)} ${h.escapeHtml(personal.lastName)} ${h.mdash()} Curriculum Vitae</div>
    <div class="footer-mark">c0unt-0/whoami</div>
  </div>
</div>

</body>
</html>`;
}

module.exports = { render };
