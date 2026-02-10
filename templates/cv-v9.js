'use strict';

const h = require('./helpers');

function render(data) {
  const { personal, experience, otherExperience, projects, education, interests, training, references } = data;

  const firstName = h.escapeHtml(personal.firstName);
  const lastName = h.escapeHtml(personal.lastName);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${firstName} ${lastName} ${h.mdash()} CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
/* ================================================================
   RETROWAVE / SYNTHWAVE — cv-v9
   80s retro-futurism. Neon on dark. Chrome text. Sunset gradient.
   ================================================================ */

:root {
  --bg: #0a0015;
  --bg-card: #1a0533;
  --neon-magenta: #ff2a6d;
  --neon-cyan: #05d9e8;
  --sunset-orange: #ff6b35;
  --chrome: #d1d1e0;
  --chrome-bright: #eeeef6;
  --deep-purple: #1a0533;
  --purple-mid: #2d0a4e;
  --text: #c8c0d8;
  --text-dim: #8a80a0;
  --text-faint: #5a5070;
  --border: #2a1548;
  --heading: 'Orbitron', sans-serif;
  --body: 'Rajdhani', sans-serif;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 10px; }

body {
  font-family: var(--body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  max-width: 820px;
  margin: 0 auto;
  padding: 40px 40px 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  position: relative;
  overflow-x: hidden;
}

/* Subtle scan lines overlay */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  pointer-events: none;
  z-index: 100;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Perspective grid at the bottom */
body::after {
  content: '';
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 180px;
  background:
    linear-gradient(to bottom, var(--bg) 0%, transparent 30%),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 58px,
      rgba(5, 217, 232, 0.07) 58px,
      rgba(5, 217, 232, 0.07) 60px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 28px,
      rgba(5, 217, 232, 0.07) 28px,
      rgba(5, 217, 232, 0.07) 30px
    );
  pointer-events: none;
  z-index: 0;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

a { color: var(--neon-cyan); text-decoration: none; }
a:hover { text-shadow: 0 0 8px rgba(5, 217, 232, 0.6); }

::selection { background: var(--neon-magenta); color: var(--bg); }

/* ═══════ HEADER ═══════ */
.header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border);
  position: relative;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.name {
  font-family: var(--heading);
  font-size: 38px;
  font-weight: 900;
  letter-spacing: 4px;
  text-transform: uppercase;
  line-height: 1.15;
  margin-bottom: 4px;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #d1d1e0 25%,
    #a0a0c0 50%,
    #d1d1e0 75%,
    #ffffff 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.name-emphasis {
  color: var(--chrome-bright);
}

.tagline {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 16px 0 20px;
  flex-wrap: wrap;
}

.tagline-pill {
  font-family: var(--heading);
  font-size: 7.5px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 14px;
  border: 1px solid var(--neon-magenta);
  color: var(--neon-magenta);
  background: rgba(255, 42, 109, 0.06);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.tagline-pill:nth-child(even) {
  border-color: var(--neon-cyan);
  color: var(--neon-cyan);
  background: rgba(5, 217, 232, 0.06);
}

.contact {
  font-family: var(--body);
  font-size: 10.5px;
  font-weight: 500;
  color: var(--neon-cyan);
  letter-spacing: 0.5px;
  line-height: 2;
}

.contact a {
  color: var(--neon-cyan);
}

.contact .sep {
  color: var(--text-faint);
  margin: 0 6px;
}

.online-link {
  display: none;
  margin-top: 10px;
  font-family: var(--body);
  font-size: 9.5px;
  color: var(--text-dim);
  letter-spacing: 0.5px;
}
.online-link a {
  color: var(--neon-cyan);
}

/* ═══════ SECTION HEADERS ═══════ */
.section {
  margin-bottom: 36px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.section-title {
  font-family: var(--heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--neon-magenta);
  text-shadow:
    0 0 7px rgba(255, 42, 109, 0.5),
    0 0 20px rgba(255, 42, 109, 0.2);
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 42, 109, 0.3);
  position: relative;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.section-num {
  font-family: var(--heading);
  font-size: 11px;
  font-weight: 600;
  color: var(--neon-cyan);
  margin-right: 10px;
  text-shadow: 0 0 8px rgba(5, 217, 232, 0.4);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ═══════ EXPERIENCE ═══════ */
.exp {
  margin-bottom: 18px;
  padding: 14px 16px;
  background: var(--bg-card);
  border-left: 2px solid var(--neon-cyan);
  box-shadow: -3px 0 12px rgba(5, 217, 232, 0.08);
  break-inside: avoid;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.exp:last-child { margin-bottom: 0; }

.exp-dates {
  font-family: var(--heading);
  font-size: 8px;
  font-weight: 500;
  color: var(--neon-cyan);
  letter-spacing: 1.5px;
  text-shadow: 0 0 6px rgba(5, 217, 232, 0.3);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.exp-company {
  font-family: var(--body);
  font-size: 9.5px;
  font-weight: 500;
  color: var(--text-dim);
  letter-spacing: 0.5px;
  margin-left: 10px;
}

.exp-meta {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.exp-role {
  font-family: var(--body);
  font-size: 14px;
  font-weight: 700;
  color: var(--neon-magenta);
  text-shadow: 0 0 8px rgba(255, 42, 109, 0.25);
  line-height: 1.3;
  margin-bottom: 6px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.exp-bullets {
  padding-left: 0;
}

.exp-bullet {
  font-family: var(--body);
  font-size: 10px;
  font-weight: 400;
  color: var(--text);
  line-height: 1.6;
  padding-left: 18px;
  position: relative;
  margin-bottom: 2px;
}

.exp-bullet::before {
  content: '\\25B8';
  position: absolute;
  left: 0;
  color: var(--neon-cyan);
  font-size: 9px;
}

/* ═══════ PROJECTS ═══════ */
.proj-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.proj {
  padding: 12px 14px;
  background: var(--bg-card);
  border-top: 2px solid var(--neon-magenta);
  break-inside: avoid;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.proj:nth-child(even) {
  border-top-color: var(--neon-cyan);
}

.proj-name {
  font-family: var(--heading);
  font-size: 10px;
  font-weight: 700;
  color: var(--chrome-bright);
  letter-spacing: 1px;
  margin-bottom: 1px;
}

.proj-org {
  font-family: var(--body);
  font-size: 9px;
  font-weight: 500;
  color: var(--text-dim);
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.proj-bullets {
  margin-bottom: 8px;
}

.proj-bullet {
  font-family: var(--body);
  font-size: 9.5px;
  font-weight: 400;
  color: var(--text);
  line-height: 1.55;
  padding-left: 14px;
  position: relative;
  margin-bottom: 1px;
}

.proj-bullet::before {
  content: '\\25B8';
  position: absolute;
  left: 0;
  color: var(--neon-magenta);
  font-size: 8px;
}

.proj:nth-child(even) .proj-bullet::before {
  color: var(--neon-cyan);
}

.proj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.proj-tag {
  font-family: var(--heading);
  font-size: 7px;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 3px 8px;
  border: 1px solid var(--neon-magenta);
  color: var(--neon-magenta);
  background: rgba(255, 42, 109, 0.05);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.proj:nth-child(even) .proj-tag {
  border-color: var(--neon-cyan);
  color: var(--neon-cyan);
  background: rgba(5, 217, 232, 0.05);
}

/* ═══════ EDUCATION & INTERESTS — Side by Side ═══════ */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.edu-item {
  margin-bottom: 10px;
}

.edu-degree {
  font-family: var(--body);
  font-size: 12px;
  font-weight: 700;
  color: var(--chrome-bright);
  line-height: 1.35;
}

.edu-ongoing {
  font-family: var(--heading);
  font-size: 7px;
  font-weight: 700;
  color: var(--neon-cyan);
  letter-spacing: 2px;
  border: 1px solid var(--neon-cyan);
  padding: 2px 6px;
  margin-left: 6px;
  vertical-align: middle;
  text-shadow: 0 0 6px rgba(5, 217, 232, 0.4);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.edu-school {
  font-family: var(--body);
  font-size: 9.5px;
  font-weight: 500;
  color: var(--text-dim);
  margin-top: 2px;
}

.interest-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.interest-tag {
  font-family: var(--body);
  font-size: 9.5px;
  font-weight: 500;
  padding: 4px 12px;
  border: 1px solid var(--neon-cyan);
  color: var(--neon-cyan);
  background: rgba(5, 217, 232, 0.04);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.interest-tag:nth-child(even) {
  border-color: var(--neon-magenta);
  color: var(--neon-magenta);
  background: rgba(255, 42, 109, 0.04);
}

.interest-tag.sec {
  color: var(--text-dim);
  border-color: var(--text-faint);
  background: transparent;
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
  font-family: var(--heading);
  font-size: 9px;
  font-weight: 600;
  color: var(--neon-magenta);
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 0 6px rgba(255, 42, 109, 0.35);
  margin-bottom: 6px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.train-courses {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.train-item {
  font-family: var(--body);
  font-size: 9px;
  font-weight: 400;
  padding: 3px 10px;
  border: 1px solid var(--purple-mid);
  color: var(--text);
  background: rgba(26, 5, 51, 0.5);
  line-height: 1.5;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ═══════ REFERENCES ═══════ */
.ref-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.ref-card {
  padding: 12px 14px;
  background: var(--bg-card);
  border-top: 2px solid var(--neon-magenta);
  break-inside: avoid;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.ref-card:nth-child(even) {
  border-top-color: var(--neon-cyan);
}

.ref-name {
  font-family: var(--heading);
  font-size: 9.5px;
  font-weight: 700;
  color: var(--chrome-bright);
  letter-spacing: 0.5px;
  margin-bottom: 3px;
}

.ref-role {
  font-family: var(--body);
  font-size: 9.5px;
  font-weight: 500;
  color: var(--text);
  line-height: 1.4;
}

.ref-loc {
  font-family: var(--heading);
  font-size: 7px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-top: 3px;
}

.ref-email {
  font-family: var(--body);
  font-size: 9px;
  font-weight: 400;
  color: var(--neon-cyan);
  margin-top: 5px;
  word-break: break-all;
}
.ref-email a {
  color: var(--neon-cyan);
}

/* ═══════ FOOTER ═══════ */
.footer {
  margin-top: 36px;
  padding-top: 16px;
  text-align: center;
  position: relative;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--neon-magenta) 0%,
    var(--neon-cyan) 50%,
    var(--sunset-orange) 100%
  );
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.footer-text {
  font-family: var(--heading);
  font-size: 7.5px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-faint);
}

/* ═══════ PRINT ═══════ */
@page {
  size: A4;
  margin: 12mm 14mm;
}

@media print {
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
    padding: 0 28px;
    max-width: 100%;
  }

  /* Keep dark theme backgrounds */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body::before { display: none; }
  body::after { display: none; }

  .online-link { display: block; }

  .exp { background: var(--bg-card) !important; }
  .proj { background: var(--bg-card) !important; }
  .ref-card { background: var(--bg-card) !important; }
  .train-item { background: rgba(26, 5, 51, 0.5) !important; }
  .tagline-pill { background: rgba(255, 42, 109, 0.06) !important; }
  .tagline-pill:nth-child(even) { background: rgba(5, 217, 232, 0.06) !important; }

  .section { break-inside: avoid; }
  .exp { break-inside: avoid; }
  .proj { break-inside: avoid; }
  .ref-card { break-inside: avoid; }
  .train-group { break-inside: avoid; }
  .two-col { break-inside: avoid; }

  a { text-decoration: none; }
  a[href]::after { content: none; }
}

/* ═══════ RESPONSIVE ═══════ */
@media (max-width: 700px) {
  body { padding: 20px 16px; }
  .name { font-size: 26px; letter-spacing: 2px; }
  .proj-grid { grid-template-columns: 1fr; }
  .two-col { grid-template-columns: 1fr; gap: 16px; }
  .ref-grid { grid-template-columns: 1fr; }
}
</style>
</head>
<body>

<!-- ═══════ HEADER ═══════ -->
<header class="header">
  <h1 class="name">${firstName}${personal.lastNameEmphasis ? ' <span class="name-emphasis">' + lastName + '</span>' : ' ' + lastName}</h1>
  <div class="tagline">
${personal.titles.map(title => `    <span class="tagline-pill">${h.escapeHtml(title)}</span>`).join('\n')}
  </div>
  <div class="contact">
    ${h.escapeHtml(personal.email)}<span class="sep">${h.middot()}</span>${h.escapeHtml(personal.phone)}<br>
    <a href="${h.escapeHtml(personal.github.url)}">${h.escapeHtml(personal.github.display)}</a><span class="sep">${h.middot()}</span><a href="${h.escapeHtml(personal.linkedin.url)}">${h.escapeHtml(personal.linkedin.display)}</a>
  </div>
  <div class="online-link">
    <a href="${h.escapeHtml(personal.website.url)}">${h.escapeHtml(personal.website.display)}</a>
  </div>
</header>

<!-- ═══════ 01 — WORK EXPERIENCE ═══════ -->
<section class="section">
  <div class="section-title"><span class="section-num">01</span>Work Experience</div>

${experience.map(exp => `  <div class="exp">
    <div class="exp-meta">
      <span class="exp-dates">${h.formatDates(exp.dates)}</span>
      <span class="exp-company">${h.escapeHtml(exp.company)}</span>
    </div>
    <div class="exp-role">${h.formatRole(exp.role)}</div>
    <div class="exp-bullets">
${exp.bullets.map(bullet => `      <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
    </div>
  </div>`).join('\n\n')}
</section>

<!-- ═══════ 02 — OTHER EXPERIENCE ═══════ -->
<section class="section">
  <div class="section-title"><span class="section-num">02</span>Other Experience</div>

${otherExperience.map(exp => `  <div class="exp">
    <div class="exp-meta">
      <span class="exp-dates">${h.formatDates(exp.dates)}</span>
      <span class="exp-company">${h.escapeHtml(exp.company)}</span>
    </div>
    <div class="exp-role">${h.formatRole(exp.role)}</div>
    <div class="exp-bullets">
${exp.bullets.map(bullet => `      <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
    </div>
  </div>`).join('\n\n')}
</section>

<!-- ═══════ 03 — KEY PROJECTS ═══════ -->
<section class="section">
  <div class="section-title"><span class="section-num">03</span>Key Projects</div>

  <div class="proj-grid">
${projects.map(proj => `    <div class="proj">
      <div class="proj-name">${h.escapeHtml(proj.name)}</div>
      <div class="proj-org">${h.escapeHtml(proj.org)}</div>
      <div class="proj-bullets">
${proj.bullets.map(bullet => `        <div class="proj-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
      </div>
      <div class="proj-tags">
${proj.tags.map(tag => `        <span class="proj-tag">${h.escapeHtml(tag)}</span>`).join('\n')}
      </div>
    </div>`).join('\n\n')}
  </div>
</section>

<!-- ═══════ 04/05 — EDUCATION & INTERESTS ═══════ -->
<section class="section">
  <div class="two-col">
    <div>
      <div class="section-title"><span class="section-num">04</span>Education</div>
${education.map(edu => `      <div class="edu-item">
        <div class="edu-degree">${h.escapeHtml(edu.degree)}${edu.ongoing ? ' <span class="edu-ongoing">ONGOING</span>' : ''}</div>
        <div class="edu-school">${h.escapeHtml(edu.school)}${edu.year ? ' ' + h.middot() + ' ' + h.escapeHtml(edu.year) : ''}</div>
      </div>`).join('\n')}
    </div>

    <div>
      <div class="section-title"><span class="section-num">05</span>Interests</div>
      <div class="interest-grid">
${interests.map(interest => `        <span class="interest-tag${interest.secondary ? ' sec' : ''}">${h.escapeHtml(interest.name)}</span>`).join('\n')}
      </div>
    </div>
  </div>
</section>

<!-- ═══════ 06 — PROFESSIONAL TRAINING ═══════ -->
<section class="section">
  <div class="section-title"><span class="section-num">06</span>Professional Training</div>

${training.map(group => `  <div class="train-group">
    <div class="train-provider">${h.escapeHtml(group.provider)}</div>
    <div class="train-courses">
${group.courses.map(course => {
    let displayCourse = course;
    if (group.provider === 'Coursera') {
      displayCourse = course
        .replace('Cybersecurity Compliance Framework, Standards & Regulations', 'Cybersecurity Compliance Framework Standards & Regulations')
        .replace('Operating Systems: Overview, Administration, and Security', 'Operating Systems: Overview Administration and Security');
    }
    return `      <span class="train-item">${h.formatCourse(displayCourse)}</span>`;
  }).join('\n')}
    </div>
  </div>`).join('\n\n')}
</section>

<!-- ═══════ 07 — REFERENCES ═══════ -->
<section class="section">
  <div class="section-title"><span class="section-num">07</span>References</div>

  <div class="ref-grid">
${references.map(ref => `    <div class="ref-card">
      <div class="ref-name">${h.escapeHtml(ref.name)}</div>
      <div class="ref-role">${h.escapeHtml(ref.role)} ${h.middot()} ${h.escapeHtml(ref.company)}</div>
      <div class="ref-loc">${h.escapeHtml(ref.location)}</div>
      ${ref.email ? `<div class="ref-email"><a href="mailto:${h.escapeHtml(ref.email)}">${h.escapeHtml(ref.email)}</a></div>` : ""}${ref.phone ? `<div class="ref-email">${h.escapeHtml(ref.phone)}</div>` : ""}
    </div>`).join('\n')}
  </div>
</section>

<!-- ═══════ FOOTER ═══════ -->
<footer class="footer">
  <span class="footer-text">${h.middot()} retrowave ${h.middot()}</span>
</footer>

</body>
</html>`;
}

module.exports = { render };
