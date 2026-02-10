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
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Karla:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
/* ═══════ MA (間) — THE BEAUTY OF EMPTY SPACE ═══════ */

:root {
  --washi: #fefcf8;
  --sumi: #2a2a2a;
  --sumi-light: #4a4a4a;
  --sumi-faint: #8a8a8a;
  --shu: #d4442a;
  --hairline: #d8d4ce;
  --serif: 'Cormorant Garamond', 'Garamond', 'Georgia', serif;
  --sans: 'Karla', 'Helvetica Neue', 'Arial', sans-serif;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html { font-size: 10px; }

body {
  font-family: var(--sans);
  color: var(--sumi);
  background: var(--washi);
  line-height: 1.7;
  max-width: 780px;
  margin: 0 auto;
  padding: 60px 48px 40px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: var(--sumi);
  text-decoration: none;
  border-bottom: 1px solid var(--hairline);
  transition: border-color 0.3s ease;
}
a:hover { border-bottom-color: var(--shu); }

/* ═══════ HEADER ═══════ */
.header {
  text-align: center;
  margin-bottom: 64px;
  padding-bottom: 48px;
}

.name {
  font-family: var(--serif);
  font-size: 42px;
  font-weight: 300;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--sumi);
  line-height: 1.2;
  margin-bottom: 20px;
}

.tagline {
  font-family: var(--sans);
  font-size: 8.5px;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--sumi-faint);
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 32px;
}

.tagline span:nth-child(2)::before,
.tagline span:nth-child(3)::before {
  content: '\\00B7';
  margin-right: 24px;
  color: var(--hairline);
}

.contact {
  font-size: 9.5px;
  color: var(--sumi-light);
  line-height: 2.2;
  letter-spacing: 0.04em;
}
.contact a {
  color: var(--sumi-light);
}

.print-link {
  display: none;
  margin-top: 12px;
  font-size: 8.5px;
  color: var(--sumi-faint);
  letter-spacing: 0.05em;
}
.print-link a {
  color: var(--sumi-light);
}

/* ═══════ SECTION DIVIDER ═══════ */
.section {
  margin-bottom: 56px;
}

.section-title {
  position: relative;
  font-family: var(--serif);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--sumi);
  margin-bottom: 36px;
  padding-bottom: 12px;
  padding-left: 16px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--shu);
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--hairline);
}

/* ═══════ EXPERIENCE ═══════ */
.exp {
  margin-bottom: 36px;
  padding-left: 0;
}
.exp:last-child { margin-bottom: 0; }

.exp-meta {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.exp-dates {
  font-size: 9px;
  color: var(--sumi-faint);
  letter-spacing: 0.08em;
  flex-shrink: 0;
}

.exp-company {
  font-size: 9.5px;
  color: var(--sumi-light);
  letter-spacing: 0.04em;
}

.exp-role {
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 500;
  color: var(--sumi);
  line-height: 1.4;
  margin-bottom: 8px;
}

.exp-bullets {
  padding-left: 0;
}

.exp-bullet {
  font-size: 9.5px;
  color: var(--sumi-light);
  line-height: 1.7;
  padding-left: 20px;
  position: relative;
  margin-bottom: 3px;
}

.exp-bullet::before {
  content: '\\2014';
  position: absolute;
  left: 0;
  color: var(--shu);
  font-size: 9px;
}

/* ═══════ PROJECTS ═══════ */
.proj {
  margin-bottom: 32px;
}
.proj:last-child { margin-bottom: 0; }

.proj-title {
  font-family: var(--serif);
  font-size: 14px;
  font-weight: 500;
  color: var(--sumi);
  line-height: 1.4;
  margin-bottom: 2px;
}

.proj-org {
  font-size: 9px;
  color: var(--sumi-faint);
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}

.proj-bullets {
  margin-bottom: 6px;
}

.proj-bullet {
  font-size: 9.5px;
  color: var(--sumi-light);
  line-height: 1.7;
  padding-left: 20px;
  position: relative;
  margin-bottom: 3px;
}

.proj-bullet::before {
  content: '\\2014';
  position: absolute;
  left: 0;
  color: var(--shu);
  font-size: 9px;
}

.proj-tags {
  font-size: 8.5px;
  color: var(--sumi-faint);
  letter-spacing: 0.03em;
  font-style: italic;
}

/* ═══════ EDUCATION ═══════ */
.edu-grid {
  display: flex;
  gap: 48px;
}

.edu-item {
  flex: 1;
}

.edu-degree {
  font-family: var(--serif);
  font-size: 14px;
  font-weight: 500;
  color: var(--sumi);
  line-height: 1.4;
}

.edu-ongoing {
  font-family: var(--sans);
  font-size: 7.5px;
  font-weight: 600;
  color: var(--shu);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-left: 6px;
}

.edu-school {
  font-size: 9.5px;
  color: var(--sumi-faint);
  margin-top: 2px;
  letter-spacing: 0.03em;
}

/* ═══════ INTERESTS ═══════ */
.interests {
  font-size: 10px;
  color: var(--sumi-light);
  letter-spacing: 0.04em;
  line-height: 2;
}

.interests .accent {
  color: var(--shu);
}

.interest-sep {
  color: var(--hairline);
  margin: 0 6px;
}

/* ═══════ TRAINING ═══════ */
.train-group {
  margin-bottom: 16px;
}
.train-group:last-child { margin-bottom: 0; }

.train-provider {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--sumi-faint);
  margin-bottom: 4px;
}

.train-courses {
  font-size: 9px;
  color: var(--sumi-light);
  line-height: 1.9;
  letter-spacing: 0.02em;
}

.train-sep {
  color: var(--hairline);
  margin: 0 4px;
}

/* ═══════ REFERENCES ═══════ */
.ref-stack {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.ref {
  padding: 20px 0;
  border-top: 1px solid var(--hairline);
}
.ref:last-child {
  padding-bottom: 0;
}

.ref-name {
  font-family: var(--serif);
  font-size: 14px;
  font-weight: 500;
  color: var(--sumi);
  margin-bottom: 2px;
}

.ref-role {
  font-size: 9.5px;
  color: var(--sumi-light);
  line-height: 1.5;
  letter-spacing: 0.02em;
}

.ref-loc {
  font-size: 8.5px;
  color: var(--sumi-faint);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 2px;
}

.ref-email {
  font-size: 9px;
  color: var(--sumi-faint);
  margin-top: 4px;
  letter-spacing: 0.03em;
}
.ref-email a {
  color: var(--sumi-faint);
  border-bottom-color: transparent;
}
.ref-email a:hover {
  border-bottom-color: var(--shu);
}

/* ═══════ FOOTER ═══════ */
.footer {
  margin-top: 72px;
  padding-top: 24px;
  text-align: center;
  color: var(--hairline);
  font-size: 16px;
  letter-spacing: 0;
  line-height: 1;
}

/* ═══════ PRINT ═══════ */
@page {
  size: A4;
  margin: 16mm 20mm;
}

@media print {
  html { font-size: 10px; }

  body {
    padding: 0;
    max-width: 100%;
    background: #fff;
  }

  .header { margin-bottom: 48px; padding-bottom: 36px; }
  .section { margin-bottom: 40px; }
  .exp { margin-bottom: 28px; }
  .proj { margin-bottom: 24px; }

  .section { break-inside: avoid; }
  .exp { break-inside: avoid; }
  .proj { break-inside: avoid; }
  .ref { break-inside: avoid; }
  .edu-grid { break-inside: avoid; }
  .train-group { break-inside: avoid; }

  .print-link { display: block; }

  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  a { border-bottom: none; }
  a[href]::after { content: none; }

  .footer { margin-top: 48px; }
}
</style>
</head>
<body>

<!-- HEADER -->
<header class="header">
  <div class="name">${h.escapeHtml(personal.firstName)} ${h.escapeHtml(personal.lastName)}</div>
  <div class="tagline">
${personal.titles.map((title, i) => `    <span>${h.escapeHtml(title)}</span>`).join('\n')}
  </div>
  <div class="contact">
    ${h.escapeHtml(personal.email)} &nbsp;${h.middot()}&nbsp; ${h.escapeHtml(personal.phone)}<br>
    <a href="${h.escapeHtml(personal.github.url)}">${h.escapeHtml(personal.github.display)}</a> &nbsp;${h.middot()}&nbsp;
    <a href="${h.escapeHtml(personal.linkedin.url)}">${h.escapeHtml(personal.linkedin.display)}</a>
  </div>
  <div class="print-link">
    <a href="${personal.website.url.replace(/\/$/, '')}">${personal.website.display}</a>
  </div>
</header>

<!-- WORK EXPERIENCE -->
<section class="section">
  <div class="section-title">Work Experience</div>

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

<!-- OTHER EXPERIENCE -->
<section class="section">
  <div class="section-title">Other Experience</div>

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

<!-- PROJECTS -->
<section class="section">
  <div class="section-title">Projects</div>

${projects.map(proj => `  <div class="proj">
    <div class="proj-title">${h.escapeHtml(proj.name)}</div>
    <div class="proj-org">${h.escapeHtml(proj.org)}</div>
    <div class="proj-bullets">
${proj.bullets.map(bullet => `      <div class="proj-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
    </div>
    <div class="proj-tags">${proj.tags.map(t => h.escapeHtml(t)).join(', ')}</div>
  </div>`).join('\n\n')}
</section>

<!-- EDUCATION -->
<section class="section">
  <div class="section-title">Education</div>
  <div class="edu-grid">
    <div class="edu-item">
      <div class="edu-degree">${h.escapeHtml(education[0].degree)}<span class="edu-ongoing">ONGOING</span></div>
      <div class="edu-school">${h.escapeHtml(education[0].school)}</div>
    </div>
    <div class="edu-item">
      <div class="edu-degree">${h.escapeHtml(education[1].degree)}</div>
      <div class="edu-school">${h.escapeHtml(education[1].school)} ${h.middot()} ${h.escapeHtml(education[1].year)}</div>
    </div>
  </div>
</section>

<!-- INTERESTS -->
<section class="section">
  <div class="section-title">Interests</div>
  <div class="interests">
    ${interests.map((interest, i) => {
      const text = interest.secondary
        ? `<span class="accent">${h.escapeHtml(interest.name)}</span>`
        : h.escapeHtml(interest.name);
      return i < interests.length - 1
        ? text + '<span class="interest-sep">/</span>'
        : text;
    }).join('')}
  </div>
</section>

<!-- PROFESSIONAL TRAINING -->
<section class="section">
  <div class="section-title">Professional Training</div>

${training.map(group => {
    const coursesText = group.courses.map(course => {
      let c = course;
      if (group.provider === 'Coursera') {
        c = c
          .replace('Cybersecurity Compliance Framework, Standards & Regulations', 'Cybersecurity Compliance Framework Standards & Regulations')
          .replace('Operating Systems: Overview, Administration, and Security', 'Operating Systems: Overview Administration and Security');
      }
      return h.formatCourse(c);
    }).join(`<span class="train-sep">${h.middot()}</span>`);

    return `  <div class="train-group">
    <div class="train-provider">${h.escapeHtml(group.provider)}</div>
    <div class="train-courses">${coursesText}</div>
  </div>`;
  }).join('\n\n')}
</section>

<!-- REFERENCES -->
<section class="section">
  <div class="section-title">References</div>
  <div class="ref-stack">
${references.map(ref => `    <div class="ref">
      <div class="ref-name">${h.escapeHtml(ref.name)}</div>
      <div class="ref-role">${h.escapeHtml(ref.role)} ${h.middot()} ${h.escapeHtml(ref.company)}</div>
      <div class="ref-loc">${h.escapeHtml(ref.location)}</div>
      ${ref.email ? `<div class="ref-email"><a href="mailto:${h.escapeHtml(ref.email)}">${h.escapeHtml(ref.email)}</a></div>` : ""}${ref.phone ? `<div class="ref-email">${h.escapeHtml(ref.phone)}</div>` : ""}
    </div>`).join('\n')}
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">${h.middot()}</footer>

</body>
</html>`;
}

module.exports = { render };
