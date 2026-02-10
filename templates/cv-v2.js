'use strict';

const h = require('./helpers');

function render(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${h.escapeHtml(data.personal.firstName)} ${h.escapeHtml(data.personal.lastName)} — CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,700&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&display=swap" rel="stylesheet">
<style>
/* ════════════════════════════════════════════════════════════
   THE BROADSHEET — Editorial CV
   ════════════════════════════════════════════════════════════ */

:root {
  --bg: #faf9f6;
  --ink: #1a1a1a;
  --ink-secondary: #666666;
  --gold: #b8953e;
  --gold-light: #d4b96a;
  --gold-faint: rgba(184, 149, 62, 0.08);
  --rule: #d0d0d0;
  --rule-light: #e8e6e2;
  --serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --sans: 'Source Sans 3', 'Source Sans Pro', -apple-system, sans-serif;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html { font-size: 10px; }

body {
  font-family: var(--sans);
  color: var(--ink);
  background: var(--bg);
  line-height: 1.55;
  max-width: 860px;
  margin: 0 auto;
  padding: 32px 40px 24px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a { color: var(--gold); text-decoration: none; }
a:hover { text-decoration: underline; }

/* ═══════ MASTHEAD ═══════ */
.masthead {
  text-align: center;
  padding-bottom: 16px;
  margin-bottom: 0;
  position: relative;
}

.masthead-rule-top {
  border: none;
  border-top: 2px solid var(--ink);
  margin-bottom: 4px;
}

.masthead-rule-thin {
  border: none;
  border-top: 0.5px solid var(--ink);
  margin-bottom: 14px;
}

.masthead-name {
  font-family: var(--serif);
  font-size: 58px;
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1;
  color: var(--ink);
  margin-bottom: 6px;
}

.masthead-name em {
  font-style: italic;
  font-weight: 400;
}

.masthead-tags {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 10px 0 12px;
}

.masthead-tag {
  font-family: var(--sans);
  font-size: 8.5px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--ink-secondary);
}

.masthead-tag::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background: var(--gold);
  margin-right: 8px;
  vertical-align: middle;
  position: relative;
  top: -0.5px;
}

.masthead-tag:first-child::before { display: none; }

.masthead-contact-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  padding: 8px 0;
  border-top: 0.5px solid var(--rule);
  border-bottom: 0.5px solid var(--rule);
  margin-top: 2px;
}

.masthead-contact-item {
  font-size: 9px;
  color: var(--ink-secondary);
  letter-spacing: 0.3px;
}

.masthead-contact-item a {
  color: var(--ink);
  font-weight: 500;
}

.masthead-contact-sep {
  color: var(--rule);
  font-size: 10px;
  line-height: 1;
  user-select: none;
}

.print-only-link {
  display: none;
}

/* ═══════ SECTION HEADERS (Newspaper Column Style) ═══════ */
.section-header {
  margin-top: 20px;
  margin-bottom: 12px;
  position: relative;
}

.section-header::before {
  content: '';
  display: block;
  border-top: 2px solid var(--ink);
  margin-bottom: 2px;
}

.section-header::after {
  content: '';
  display: block;
  border-top: 0.5px solid var(--ink);
  margin-top: 6px;
}

.section-header h2 {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--ink);
  padding: 4px 0 1px;
}

.section-header .section-subtitle {
  font-family: var(--sans);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  margin-top: 0;
}

/* ═══════ PULL QUOTE — Featured Role ═══════ */
.pull-quote {
  margin: 16px 0 10px;
  padding: 18px 28px;
  border-top: 3px solid var(--gold);
  border-bottom: 3px solid var(--gold);
  background: var(--gold-faint);
  position: relative;
  text-align: center;
}

.pull-quote-role {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 700;
  font-style: italic;
  color: var(--ink);
  line-height: 1.3;
  margin-bottom: 4px;
}

.pull-quote-meta {
  font-family: var(--sans);
  font-size: 10px;
  color: var(--ink-secondary);
  letter-spacing: 0.5px;
}

.pull-quote-meta strong {
  color: var(--gold);
  font-weight: 700;
}

.pull-quote-desc {
  font-family: var(--sans);
  font-size: 9.5px;
  color: var(--ink-secondary);
  line-height: 1.6;
  margin-top: 8px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* ═══════ EXPERIENCE — 2-Column (date | content) ═══════ */
.exp-grid {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 0 16px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 0.5px solid var(--rule-light);
  break-inside: avoid;
}

.exp-grid:last-child { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }

.exp-date-col {
  font-family: var(--sans);
  font-size: 8.5px;
  font-weight: 600;
  color: var(--ink-secondary);
  letter-spacing: 0.3px;
  padding-top: 2px;
  line-height: 1.5;
}

.exp-date-range {
  color: var(--ink);
  font-weight: 700;
  font-size: 9px;
}

.exp-company {
  font-size: 8px;
  color: var(--ink-secondary);
  font-weight: 400;
  margin-top: 2px;
  line-height: 1.4;
}

.exp-content-col {}

.exp-role {
  font-family: var(--serif);
  font-size: 13.5px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
  margin-bottom: 4px;
}

.exp-bullets {
  margin: 0;
  padding: 0;
  list-style: none;
}

.exp-bullet {
  font-size: 9.5px;
  color: var(--ink-secondary);
  line-height: 1.55;
  padding-left: 14px;
  position: relative;
  margin-top: 2px;
}

.exp-bullet::before {
  content: '\\2014';
  position: absolute;
  left: 0;
  color: var(--gold);
  font-size: 9px;
  font-weight: 700;
}

/* ═══════ DROP CAP ═══════ */
.drop-cap::first-letter {
  font-family: var(--serif);
  font-size: 34px;
  font-weight: 900;
  float: left;
  line-height: 0.8;
  margin-right: 6px;
  margin-top: 4px;
  color: var(--gold);
}

/* ═══════ PROJECTS — 3-Column Grid ═══════ */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.proj-card {
  border-top: 2px solid var(--ink);
  padding-top: 8px;
  break-inside: avoid;
}

.proj-card:nth-child(even) {
  border-top-color: var(--gold);
}

.proj-name {
  font-family: var(--serif);
  font-size: 11.5px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
  margin-bottom: 1px;
}

.proj-org {
  font-family: var(--sans);
  font-size: 8px;
  font-weight: 600;
  color: var(--gold);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.proj-desc {
  font-size: 8.5px;
  color: var(--ink-secondary);
  line-height: 1.5;
  margin-bottom: 6px;
}

.proj-desc li {
  list-style: none;
  padding-left: 10px;
  position: relative;
  margin-top: 1.5px;
}

.proj-desc li::before {
  content: '\\2022';
  position: absolute;
  left: 0;
  color: var(--gold);
  font-size: 8px;
}

.proj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.proj-tag {
  font-family: var(--sans);
  font-size: 7px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 2px 5px;
  border: 0.5px solid var(--rule);
  color: var(--ink-secondary);
  background: transparent;
}

/* ═══════ EDUCATION & INTERESTS — Side by Side ═══════ */
.two-col-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  border-top: 0.5px solid var(--rule);
  padding-top: 12px;
  margin-top: 16px;
}

.edu-item {
  margin-bottom: 8px;
}

.edu-degree {
  font-family: var(--serif);
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
}

.edu-ongoing {
  font-family: var(--sans);
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--gold);
  border: 1px solid var(--gold);
  padding: 1px 5px;
  margin-left: 4px;
  vertical-align: middle;
}

.edu-school {
  font-size: 9px;
  color: var(--ink-secondary);
  margin-top: 1px;
}

.interest-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.interest-pill {
  font-family: var(--sans);
  font-size: 8.5px;
  font-weight: 500;
  padding: 4px 10px;
  border: 0.5px solid var(--rule);
  color: var(--ink-secondary);
  letter-spacing: 0.3px;
}

.interest-pill.highlight {
  border-color: var(--gold);
  color: var(--gold);
  font-weight: 700;
  background: var(--gold-faint);
}

/* ═══════ TRAINING — Magazine Columns ═══════ */
.training-columns {
  column-count: 3;
  column-gap: 20px;
  column-rule: 0.5px solid var(--rule-light);
}

.train-group {
  break-inside: avoid;
  margin-bottom: 10px;
}

.train-provider {
  font-family: var(--serif);
  font-size: 10px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: 0.5px;
  border-bottom: 0.5px solid var(--gold);
  padding-bottom: 3px;
  margin-bottom: 4px;
}

.train-list {
  list-style: none;
  padding: 0;
}

.train-item {
  font-size: 8px;
  color: var(--ink-secondary);
  line-height: 1.6;
  padding-left: 8px;
  position: relative;
}

.train-item::before {
  content: '\\203A';
  position: absolute;
  left: 0;
  color: var(--gold);
  font-weight: 700;
}

/* ═══════ REFERENCES — 3-Column Cards ═══════ */
.ref-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.ref-card {
  padding: 10px 12px;
  border-top: 2px solid var(--gold);
  background: rgba(184, 149, 62, 0.03);
  break-inside: avoid;
}

.ref-name {
  font-family: var(--serif);
  font-size: 11px;
  font-weight: 700;
  color: var(--ink);
}

.ref-role {
  font-size: 8.5px;
  color: var(--ink-secondary);
  margin-top: 2px;
  line-height: 1.4;
}

.ref-location {
  font-family: var(--sans);
  font-size: 7.5px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold);
  margin-top: 3px;
}

.ref-email {
  font-size: 8.5px;
  color: var(--ink-secondary);
  margin-top: 4px;
  word-break: break-all;
}

.ref-email a { color: var(--ink); font-weight: 500; }

/* ═══════ FOOTER / DATELINE ═══════ */
.footer-dateline {
  margin-top: 20px;
  padding-top: 8px;
  border-top: 2px solid var(--ink);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.footer-dateline::before {
  content: '';
  display: block;
  position: relative;
}

.dateline-left {
  font-family: var(--serif);
  font-size: 8px;
  font-style: italic;
  color: var(--ink-secondary);
  letter-spacing: 0.3px;
}

.dateline-center {
  font-family: var(--sans);
  font-size: 7px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
}

.dateline-right {
  font-family: var(--sans);
  font-size: 7px;
  color: var(--ink-secondary);
  letter-spacing: 1px;
}

/* ═══════ UTILITY / HAIRLINE ═══════ */
.hairline {
  border: none;
  border-top: 0.5px solid var(--rule);
  margin: 12px 0;
}

/* ═══════ PRINT STYLES ═══════ */
@media print {
  html { font-size: 10px; }
  body {
    padding: 0;
    max-width: 100%;
    background: var(--bg);
  }

  .print-only-link {
    display: block;
    text-align: center;
    font-family: var(--sans);
    font-size: 8px;
    color: var(--ink-secondary);
    margin-top: 4px;
    letter-spacing: 0.5px;
  }
  .print-only-link a { color: var(--gold); font-weight: 600; }

  .exp-grid { break-inside: avoid; }
  .proj-card { break-inside: avoid; }
  .ref-card { break-inside: avoid; }
  .train-group { break-inside: avoid; }
  .two-col-split { break-inside: avoid; }

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  a { color: var(--gold); }
  a[href]::after { content: none; }
}

@page {
  size: A4;
  margin: 12mm 14mm;
}
</style>
</head>
<body>

<!-- ═══════════════════════════════════════════
     MASTHEAD
     ═══════════════════════════════════════════ -->
<header class="masthead">
  <hr class="masthead-rule-top">
  <hr class="masthead-rule-thin">

  <h1 class="masthead-name">${h.escapeHtml(data.personal.firstName)} <em>${h.escapeHtml(data.personal.lastName)}</em></h1>

  <div class="masthead-tags">
${data.personal.titles.map(title => `    <span class="masthead-tag">${h.escapeHtml(title)}</span>`).join('\n')}
  </div>

  <div class="masthead-contact-row">
    <span class="masthead-contact-item">${h.escapeHtml(data.personal.email)}</span>
    <span class="masthead-contact-sep">&middot;</span>
    <span class="masthead-contact-item">${h.escapeHtml(data.personal.phone)}</span>
    <span class="masthead-contact-sep">&middot;</span>
    <span class="masthead-contact-item"><a href="${h.escapeHtml(data.personal.github.url)}">${h.escapeHtml(data.personal.github.display)}</a></span>
    <span class="masthead-contact-sep">&middot;</span>
    <span class="masthead-contact-item"><a href="${h.escapeHtml(data.personal.linkedin.url)}">${h.escapeHtml(data.personal.linkedin.display)}</a></span>
  </div>

  <div class="print-only-link">
    Interactive version &mdash; <a href="${h.escapeHtml(data.personal.website.url)}">${h.escapeHtml(data.personal.website.display)}</a>
  </div>
</header>

<!-- ═══════════════════════════════════════════
     PULL QUOTE — Featured Current Role
     ═══════════════════════════════════════════ -->
<div class="pull-quote">
  <div class="pull-quote-role">&ldquo;${h.escapeHtml(data.pullQuote.role)}&rdquo;</div>
  <div class="pull-quote-meta"><strong>${h.escapeHtml(data.pullQuote.company)}</strong> &mdash; ${h.escapeHtml(data.pullQuote.dates)}</div>
  <div class="pull-quote-desc">${h.escapeHtml(data.pullQuote.description)}</div>
</div>

<!-- ═══════════════════════════════════════════
     WORK EXPERIENCE
     ═══════════════════════════════════════════ -->
<div class="section-header">
  <h2>Work Experience</h2>
  <span class="section-subtitle">Professional History</span>
</div>

${data.experience.map(exp => `<div class="exp-grid">
  <div class="exp-date-col">
    <div class="exp-date-range">${h.formatDates(exp.dates)}</div>
    <div class="exp-company">${h.escapeHtml(exp.company)}</div>
  </div>
  <div class="exp-content-col">
    <div class="exp-role">${h.formatRole(exp.role)}</div>
    <div class="exp-bullets">
${exp.bullets.map(bullet => `      <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
    </div>
  </div>
</div>`).join('\n\n')}

<!-- ═══════════════════════════════════════════
     OTHER EXPERIENCE
     ═══════════════════════════════════════════ -->
<div class="section-header">
  <h2>Other Experience</h2>
  <span class="section-subtitle">Earlier Career</span>
</div>

${data.otherExperience.map(exp => `<div class="exp-grid">
  <div class="exp-date-col">
    <div class="exp-date-range">${h.formatDates(exp.dates)}</div>
    <div class="exp-company">${h.escapeHtml(exp.company)}</div>
  </div>
  <div class="exp-content-col">
    <div class="exp-role">${h.formatRole(exp.role)}</div>
    <div class="exp-bullets">
${exp.bullets.map(bullet => `      <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
    </div>
  </div>
</div>`).join('\n\n')}


<!-- ═══════════════════════════════════════════
     PROJECTS — 3-Column Grid
     ═══════════════════════════════════════════ -->
<div class="section-header">
  <h2>Key Projects</h2>
  <span class="section-subtitle">Selected Work</span>
</div>

<div class="projects-grid">

${data.projects.map(proj => `  <div class="proj-card">
    <div class="proj-name">${h.escapeHtml(proj.name)}</div>
    <div class="proj-org">${h.escapeHtml(proj.org)}</div>
    <ul class="proj-desc">
${proj.bullets.map(bullet => `      <li>${h.escapeHtml(bullet)}</li>`).join('\n')}
    </ul>
    <div class="proj-tags">
      ${proj.tags.map(tag => `<span class="proj-tag">${h.escapeHtml(tag)}</span>`).join('')}
    </div>
  </div>`).join('\n\n')}

</div>

<!-- ═══════════════════════════════════════════
     EDUCATION & INTERESTS
     ═══════════════════════════════════════════ -->
<div class="two-col-split">
  <div>
    <div class="section-header" style="margin-top: 0;">
      <h2>Education</h2>
    </div>
${data.education.map(edu => `    <div class="edu-item">
      <div class="edu-degree">${h.escapeHtml(edu.degree)}${edu.ongoing ? ' <span class="edu-ongoing">ONGOING</span>' : ''}</div>
      <div class="edu-school">${h.escapeHtml(edu.school)}${edu.year ? ' &middot; ' + h.escapeHtml(edu.year) : ''}</div>
    </div>`).join('\n')}
  </div>

  <div>
    <div class="section-header" style="margin-top: 0;">
      <h2>Interests</h2>
    </div>
    <div class="interest-list">
${data.interests.map(interest => `      <span class="interest-pill${interest.secondary ? ' highlight' : ''}">${h.escapeHtml(interest.name)}</span>`).join('\n')}
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════
     PROFESSIONAL TRAINING — Magazine Columns
     ═══════════════════════════════════════════ -->
<div class="section-header">
  <h2>Professional Training</h2>
  <span class="section-subtitle">Certifications &amp; Courses</span>
</div>

<div class="training-columns">

${data.training.map(group => `  <div class="train-group">
    <div class="train-provider">${h.escapeHtml(group.provider)}</div>
    <div class="train-list">
${group.courses.map(course => {
  // Template-specific formatting: strip commas from specific Coursera courses
  let displayCourse = course;
  if (group.provider === 'Coursera') {
    displayCourse = course
      .replace('Cybersecurity Compliance Framework, Standards & Regulations', 'Cybersecurity Compliance Framework Standards & Regulations')
      .replace('Operating Systems: Overview, Administration, and Security', 'Operating Systems: Overview Administration and Security');
  }
  return `      <div class="train-item">${h.formatCourse(displayCourse)}</div>`;
}).join('\n')}
    </div>
  </div>`).join('\n\n')}

</div>

<!-- ═══════════════════════════════════════════
     REFERENCES
     ═══════════════════════════════════════════ -->
<div class="section-header">
  <h2>References</h2>
</div>

<div class="ref-grid">
${data.references.map(ref => `  <div class="ref-card">
    <div class="ref-name">${h.escapeHtml(ref.name)}</div>
    <div class="ref-role">${h.escapeHtml(ref.role)} &middot; ${h.escapeHtml(ref.company)}</div>
    <div class="ref-location">${h.escapeHtml(ref.location)}</div>
    ${ref.email ? `<div class="ref-email"><a href="mailto:${h.escapeHtml(ref.email)}">${h.escapeHtml(ref.email)}</a></div>` : ""}${ref.phone ? `<div class="ref-email">${h.escapeHtml(ref.phone)}</div>` : ""}
  </div>`).join('\n')}
</div>

<!-- ═══════════════════════════════════════════
     FOOTER DATELINE
     ═══════════════════════════════════════════ -->
<footer class="footer-dateline">
  <span class="dateline-left">${h.formatRole(data.footer.dateline)}</span>
  <span class="dateline-center">The Broadsheet</span>
  <span class="dateline-right">c0unt-0/whoami</span>
</footer>

</body>
</html>
`;
}

module.exports = { render };
