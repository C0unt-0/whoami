'use strict';

const h = require('./helpers');

function render(data) {
  const { personal, experience, otherExperience, projects, education, interests, training, references } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${h.escapeHtml(personal.firstName)} ${h.escapeHtml(personal.lastName)} ${h.mdash()} CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
/* ============================================ */
/* NEOBRUTALIST CV — LESS IS BORE              */
/* ============================================ */

:root {
  --bg: #fffef5;
  --black: #000000;
  --pink: #ff2d6b;
  --blue: #2d5bff;
  --white: #ffffff;
  --heading: 'Satoshi', 'Arial Black', 'Helvetica Neue', sans-serif;
  --body: 'Space Mono', 'Courier New', monospace;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html { font-size: 10px; }

body {
  font-family: var(--body);
  color: var(--black);
  background: var(--bg);
  line-height: 1.65;
  max-width: 820px;
  margin: 0 auto;
  padding: 48px 40px 32px;
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--black);
  text-decoration: none;
  border-bottom: 2px solid var(--pink);
  font-weight: 700;
}
a:hover {
  background: var(--pink);
  color: var(--white);
}

/* ============================================ */
/* HEADER                                       */
/* ============================================ */
.header {
  border: 4px solid var(--black);
  padding: 40px 36px 32px;
  margin-bottom: 48px;
  position: relative;
}

.header::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  height: 8px;
  background: var(--pink);
}

.name {
  font-family: var(--heading);
  font-size: 64px;
  font-weight: 900;
  line-height: 1.0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
  position: relative;
  display: inline-block;
}

.name-emphasis {
  color: var(--pink);
}

.name-underline {
  display: block;
  height: 6px;
  background: var(--pink);
  margin-bottom: 20px;
  width: 200px;
}

.tagline {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.tagline-pill {
  font-family: var(--body);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: 3px solid var(--black);
  padding: 6px 14px;
  background: var(--bg);
}

.tagline-pill:nth-child(even) {
  background: var(--black);
  color: var(--white);
}

.contact-box {
  border: 3px solid var(--black);
  padding: 14px 18px;
  font-size: 9px;
  line-height: 2;
  letter-spacing: 0.03em;
  background: var(--bg);
}

.contact-box a {
  border-bottom-width: 2px;
}

.contact-sep {
  font-weight: 700;
  margin: 0 8px;
  color: var(--pink);
}

.online-link {
  display: none;
  margin-top: 10px;
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* ============================================ */
/* SECTIONS                                     */
/* ============================================ */
.section {
  margin-bottom: 48px;
}

.section-header {
  position: relative;
  margin-bottom: 28px;
  padding-left: 70px;
}

.section-num {
  position: absolute;
  left: 0;
  top: -14px;
  font-family: var(--heading);
  font-size: 56px;
  font-weight: 900;
  color: var(--pink);
  line-height: 1;
  opacity: 0.25;
  user-select: none;
}

.section-title {
  font-family: var(--heading);
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding-bottom: 10px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 6px;
  background: var(--pink);
}

/* ============================================ */
/* EXPERIENCE                                   */
/* ============================================ */
.exp {
  border-left: 6px solid var(--black);
  padding: 16px 20px 16px 24px;
  margin-bottom: 20px;
  background: var(--bg);
}
.exp:last-child { margin-bottom: 0; }

.exp-dates {
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pink);
  margin-bottom: 2px;
}

.exp-company {
  font-family: var(--body);
  font-size: 9px;
  letter-spacing: 0.04em;
  color: var(--black);
  opacity: 0.6;
  margin-bottom: 4px;
}

.exp-role {
  font-family: var(--heading);
  font-size: 16px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.3;
  margin-bottom: 10px;
}

.exp-bullet {
  font-size: 9.5px;
  line-height: 1.7;
  padding-left: 18px;
  position: relative;
  margin-bottom: 3px;
}

.exp-bullet::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 8px;
  height: 8px;
  background: var(--black);
}

/* ============================================ */
/* PROJECTS                                     */
/* ============================================ */
.proj-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.proj {
  border: 4px solid var(--black);
  padding: 18px 20px;
}

.proj:nth-child(odd) {
  border-left: 8px solid var(--pink);
}

.proj:nth-child(even) {
  border-left: 8px solid var(--blue);
}

.proj-name {
  font-family: var(--heading);
  font-size: 15px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 2px;
}

.proj-org {
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--black);
  opacity: 0.5;
  margin-bottom: 10px;
}

.proj-bullet {
  font-size: 9.5px;
  line-height: 1.7;
  padding-left: 18px;
  position: relative;
  margin-bottom: 3px;
}

.proj-bullet::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 8px;
  height: 8px;
  background: var(--black);
}

.proj-tags {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.proj-tag {
  font-family: var(--body);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: var(--black);
  color: var(--white);
  padding: 4px 10px;
}

/* ============================================ */
/* EDUCATION & INTERESTS GRID                   */
/* ============================================ */
.dual-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.dual-section {
  border: 4px solid var(--black);
  padding: 24px 20px;
}

.dual-section-header {
  position: relative;
  margin-bottom: 20px;
  padding-left: 54px;
}

.dual-section-num {
  position: absolute;
  left: 0;
  top: -10px;
  font-family: var(--heading);
  font-size: 44px;
  font-weight: 900;
  color: var(--blue);
  line-height: 1;
  opacity: 0.25;
  user-select: none;
}

.dual-section-title {
  font-family: var(--heading);
  font-size: 16px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding-bottom: 8px;
  position: relative;
  display: inline-block;
}

.dual-section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4px;
  background: var(--pink);
}

/* Education items */
.edu-item {
  margin-bottom: 16px;
}
.edu-item:last-child { margin-bottom: 0; }

.edu-degree {
  font-family: var(--heading);
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1.3;
}

.edu-ongoing {
  display: inline-block;
  font-family: var(--body);
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: var(--pink);
  color: var(--white);
  padding: 2px 8px;
  margin-left: 6px;
  vertical-align: middle;
}

.edu-school {
  font-size: 9px;
  color: var(--black);
  opacity: 0.55;
  letter-spacing: 0.03em;
  margin-top: 2px;
}

/* Interest tags */
.interest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.interest-tag {
  font-family: var(--body);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 6px 12px;
  background: var(--black);
  color: var(--white);
}

.interest-tag:nth-child(3n+2) {
  background: var(--pink);
  color: var(--white);
}

.interest-tag.sec {
  background: var(--bg);
  color: var(--black);
  border: 3px solid var(--black);
  padding: 3px 9px;
}

/* ============================================ */
/* TRAINING                                     */
/* ============================================ */
.train-group {
  margin-bottom: 18px;
  border-left: 4px solid var(--black);
  padding-left: 16px;
}
.train-group:last-child { margin-bottom: 0; }

.train-provider {
  font-family: var(--heading);
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 4px;
}

.train-courses {
  font-size: 8.5px;
  line-height: 2;
  letter-spacing: 0.02em;
}

.train-sep {
  color: var(--pink);
  font-weight: 700;
  margin: 0 6px;
}

/* ============================================ */
/* REFERENCES                                   */
/* ============================================ */
.ref-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.ref {
  border: 4px solid var(--black);
  border-top: 6px solid var(--pink);
  padding: 18px 16px;
}

.ref-name {
  font-family: var(--heading);
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.ref-role {
  font-size: 9px;
  line-height: 1.5;
  letter-spacing: 0.02em;
  margin-bottom: 2px;
}

.ref-loc {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--black);
  opacity: 0.45;
  margin-top: 6px;
}

.ref-email {
  font-size: 8.5px;
  margin-top: 6px;
  letter-spacing: 0.02em;
}

.ref-email a {
  border-bottom: 2px solid var(--pink);
  font-weight: 700;
}

/* ============================================ */
/* FOOTER                                       */
/* ============================================ */
.footer {
  margin-top: 48px;
  position: relative;
  padding-top: 20px;
  text-align: center;
  font-family: var(--heading);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--black);
  opacity: 0.3;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--black);
}

.footer::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--pink);
}

/* ============================================ */
/* PRINT                                        */
/* ============================================ */
@page {
  size: A4;
  margin: 14mm 16mm;
}

@media print {
  html { font-size: 9.5px; }

  body {
    padding: 0;
    max-width: 100%;
    background: #fff;
  }

  .header { margin-bottom: 36px; padding: 28px 28px 24px; }
  .name { font-size: 52px; }
  .section { margin-bottom: 36px; }
  .exp { margin-bottom: 14px; }
  .dual-grid { gap: 16px; }
  .ref-grid { gap: 12px; }

  .section { break-inside: avoid; }
  .exp { break-inside: avoid; }
  .proj { break-inside: avoid; }
  .ref { break-inside: avoid; }
  .dual-section { break-inside: avoid; }
  .train-group { break-inside: avoid; }

  .online-link { display: block; }

  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  a { border-bottom: none; }
  a[href]::after { content: none; }

  .footer { margin-top: 36px; }
}
</style>
</head>
<body>

<!-- ============ HEADER ============ -->
<header class="header">
  <div class="name">${h.escapeHtml(personal.firstName)} ${personal.lastNameEmphasis ? `<span class="name-emphasis">${h.escapeHtml(personal.lastName)}</span>` : h.escapeHtml(personal.lastName)}</div>
  <div class="name-underline"></div>
  <div class="tagline">
${personal.titles.map(title => `    <span class="tagline-pill">${h.escapeHtml(title)}</span>`).join('\n')}
  </div>
  <div class="contact-box">
    ${h.escapeHtml(personal.email)}<span class="contact-sep">//</span>${h.escapeHtml(personal.phone)}<br>
    <a href="${h.escapeHtml(personal.github.url)}">${h.escapeHtml(personal.github.display)}</a><span class="contact-sep">//</span><a href="${h.escapeHtml(personal.linkedin.url)}">${h.escapeHtml(personal.linkedin.display)}</a>
  </div>
  <div class="online-link">
    ${h.mdash()} <a href="${h.escapeHtml(personal.website.url)}">${h.escapeHtml(personal.website.display)}</a> ${h.mdash()}
  </div>
</header>

<!-- ============ 01 WORK EXPERIENCE ============ -->
<section class="section">
  <div class="section-header">
    <span class="section-num">01</span>
    <div class="section-title">Work Experience</div>
  </div>

${experience.map(exp => `  <div class="exp">
    <div class="exp-dates">${h.formatDates(exp.dates)}</div>
    <div class="exp-company">${h.escapeHtml(exp.company)}</div>
    <div class="exp-role">${h.formatRole(exp.role)}</div>
${exp.bullets.map(bullet => `    <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
  </div>`).join('\n\n')}
</section>

<!-- ============ 02 OTHER EXPERIENCE ============ -->
<section class="section">
  <div class="section-header">
    <span class="section-num">02</span>
    <div class="section-title">Other Experience</div>
  </div>

${otherExperience.map(exp => `  <div class="exp">
    <div class="exp-dates">${h.formatDates(exp.dates)}</div>
    <div class="exp-company">${h.escapeHtml(exp.company)}</div>
    <div class="exp-role">${h.formatRole(exp.role)}</div>
${exp.bullets.map(bullet => `    <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
  </div>`).join('\n\n')}
</section>

<!-- ============ 03 KEY PROJECTS ============ -->
<section class="section">
  <div class="section-header">
    <span class="section-num">03</span>
    <div class="section-title">Key Projects</div>
  </div>

  <div class="proj-grid">
${projects.map(proj => `    <div class="proj">
      <div class="proj-name">${h.escapeHtml(proj.name)}</div>
      <div class="proj-org">${h.escapeHtml(proj.org)}</div>
${proj.bullets.map(bullet => `      <div class="proj-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
      <div class="proj-tags">
${proj.tags.map(t => `        <span class="proj-tag">${h.escapeHtml(t)}</span>`).join('\n')}
      </div>
    </div>`).join('\n\n')}
  </div>
</section>

<!-- ============ 04/05 EDUCATION & INTERESTS ============ -->
<div class="dual-grid">
  <div class="dual-section">
    <div class="dual-section-header">
      <span class="dual-section-num">04</span>
      <div class="dual-section-title">Education</div>
    </div>
${education.map(edu => `    <div class="edu-item">
      <div class="edu-degree">${h.escapeHtml(edu.degree)}${edu.ongoing ? '<span class="edu-ongoing">Ongoing</span>' : ''}</div>
      <div class="edu-school">${h.escapeHtml(edu.school)}${edu.year ? ` ${h.middot()} ${h.escapeHtml(edu.year)}` : ''}</div>
    </div>`).join('\n')}
  </div>

  <div class="dual-section">
    <div class="dual-section-header">
      <span class="dual-section-num">05</span>
      <div class="dual-section-title">Interests</div>
    </div>
    <div class="interest-tags">
${interests.map(interest => `      <span class="interest-tag${interest.secondary ? ' sec' : ''}">${h.escapeHtml(interest.name)}</span>`).join('\n')}
    </div>
  </div>
</div>

<!-- ============ 06 PROFESSIONAL TRAINING ============ -->
<section class="section" style="margin-top: 48px;">
  <div class="section-header">
    <span class="section-num">06</span>
    <div class="section-title">Professional Training</div>
  </div>

${training.map(group => `  <div class="train-group">
    <div class="train-provider">${h.escapeHtml(group.provider)}</div>
    <div class="train-courses">${group.courses.map(course => h.formatCourse(course)).join(`<span class="train-sep">${h.middot()}</span>`)}</div>
  </div>`).join('\n\n')}
</section>

<!-- ============ 07 REFERENCES ============ -->
<section class="section">
  <div class="section-header">
    <span class="section-num">07</span>
    <div class="section-title">References</div>
  </div>

  <div class="ref-grid">
${references.map(ref => `    <div class="ref">
      <div class="ref-name">${h.escapeHtml(ref.name)}</div>
      <div class="ref-role">${h.escapeHtml(ref.role)} ${h.middot()} ${h.escapeHtml(ref.company)}</div>
      <div class="ref-loc">${h.escapeHtml(ref.location)}</div>
      ${ref.email ? `<div class="ref-email"><a href="mailto:${h.escapeHtml(ref.email)}">${h.escapeHtml(ref.email)}</a></div>` : ""}${ref.phone ? `<div class="ref-email">${h.escapeHtml(ref.phone)}</div>` : ""}
    </div>`).join('\n')}
  </div>
</section>

<!-- ============ FOOTER ============ -->
<footer class="footer">${h.middot()} ${h.middot()} ${h.middot()}</footer>

</body>
</html>`;
}

module.exports = { render };
