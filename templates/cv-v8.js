'use strict';

const h = require('./helpers');

function render(data) {
  const { personal, experience, otherExperience, projects, education, interests, training, references } = data;

  /* Section accent colors — each section gets its own identity */
  const colors = {
    teal: '#00897b',
    coral: '#e85d47',
    slateBlue: '#5c6bc0',
    amber: '#f9a825',
  };

  /* Rotating color for project cards */
  const projColors = [colors.teal, colors.coral, colors.slateBlue, colors.amber];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${h.escapeHtml(personal.firstName)} ${h.escapeHtml(personal.lastName)} ${h.mdash()} CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,600;0,6..12,700;0,6..12,800;1,6..12,400&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
/* ================================================================
   INFOGRAPHIC CV — cv-v8
   Data visualization meets CV. Clean, colorful, information-dense.
   ================================================================ */

:root {
  --teal: ${colors.teal};
  --coral: ${colors.coral};
  --slate-blue: ${colors.slateBlue};
  --amber: ${colors.amber};
  --charcoal: #2d2d2d;
  --charcoal-light: #4a4a4a;
  --charcoal-faint: #777;
  --sidebar-bg: #f5f5f5;
  --white: #ffffff;
  --border: #e0e0e0;
  --border-light: #eeeeee;
  --heading: 'Nunito Sans', 'Helvetica Neue', Arial, sans-serif;
  --body: 'Source Sans 3', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html { font-size: 10px; }

body {
  font-family: var(--body);
  color: var(--charcoal);
  background: var(--white);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: var(--teal);
  text-decoration: none;
}
a:hover { text-decoration: underline; }

/* ================================================================
   TWO-COLUMN LAYOUT
   ================================================================ */
.cv-wrapper {
  display: grid;
  grid-template-columns: 33% 67%;
  max-width: 820px;
  margin: 0 auto;
  min-height: 100vh;
}

/* ================================================================
   LEFT SIDEBAR
   ================================================================ */
.sidebar {
  background: var(--sidebar-bg);
  padding: 40px 24px 32px;
  border-right: 1px solid var(--border);
}

/* --- Name block --- */
.name {
  font-family: var(--heading);
  font-size: 24px;
  font-weight: 800;
  color: var(--charcoal);
  line-height: 1.15;
  margin-bottom: 4px;
}
.name em {
  font-style: normal;
  color: var(--teal);
}

.titles {
  margin-top: 8px;
  margin-bottom: 20px;
}
.title-item {
  display: block;
  font-family: var(--body);
  font-size: 9.5px;
  font-weight: 600;
  color: var(--charcoal-light);
  letter-spacing: 0.04em;
  line-height: 1.7;
}

/* --- Contact info --- */
.contact-list {
  margin-bottom: 28px;
}
.contact-item {
  font-size: 9.5px;
  color: var(--charcoal-light);
  line-height: 2;
  display: flex;
  align-items: center;
  gap: 8px;
}
.contact-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  display: inline-block;
}
.contact-dot.teal { background: var(--teal); }
.contact-dot.coral { background: var(--coral); }
.contact-dot.blue { background: var(--slate-blue); }
.contact-dot.amber { background: var(--amber); }
.contact-item a {
  color: var(--charcoal-light);
}

.online-link {
  display: none;
  font-size: 9.5px;
  color: var(--charcoal-faint);
  margin-top: 2px;
  padding-left: 14px;
}
.online-link a { color: var(--teal); font-weight: 600; }

/* --- Sidebar section headers --- */
.side-section {
  margin-bottom: 24px;
}
.side-section:last-child { margin-bottom: 0; }

.section-head {
  margin-bottom: 12px;
}
.section-bar {
  width: 28px;
  height: 4px;
  border-radius: 2px;
  margin-bottom: 6px;
}
.section-bar.teal { background: var(--teal); }
.section-bar.coral { background: var(--coral); }
.section-bar.blue { background: var(--slate-blue); }
.section-bar.amber { background: var(--amber); }

.section-label {
  font-family: var(--heading);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--charcoal);
  padding-bottom: 5px;
  border-bottom: 1px solid var(--border);
}
.section-num {
  font-size: 9px;
  font-weight: 400;
  color: var(--charcoal-faint);
  margin-right: 6px;
}

/* --- Education timeline --- */
.edu-timeline {
  position: relative;
  padding-left: 18px;
}
.edu-timeline::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: var(--border);
  border-radius: 1px;
}
.edu-entry {
  position: relative;
  margin-bottom: 14px;
}
.edu-entry:last-child { margin-bottom: 0; }
.edu-entry::before {
  content: '';
  position: absolute;
  left: -18px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--white);
  border: 2px solid var(--amber);
  z-index: 1;
}
.edu-degree {
  font-family: var(--heading);
  font-size: 10.5px;
  font-weight: 700;
  color: var(--charcoal);
  line-height: 1.4;
}
.edu-ongoing {
  font-size: 7.5px;
  font-weight: 700;
  color: var(--coral);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-left: 4px;
  background: rgba(232, 93, 71, 0.1);
  padding: 1px 5px;
  border-radius: 3px;
}
.edu-school {
  font-size: 9px;
  color: var(--charcoal-faint);
  line-height: 1.5;
}

/* --- Interests as pills --- */
.interest-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.interest-pill {
  font-size: 8.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  background: var(--white);
  color: var(--teal);
  border: 1px solid rgba(0, 137, 123, 0.3);
  line-height: 1.5;
}
.interest-pill.sec {
  background: transparent;
  color: var(--charcoal-faint);
  border-color: var(--border);
  font-weight: 400;
}

/* --- Training compact --- */
.train-group {
  margin-bottom: 12px;
}
.train-group:last-child { margin-bottom: 0; }

.train-provider {
  font-family: var(--heading);
  font-size: 9px;
  font-weight: 700;
  color: var(--charcoal);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 3px;
}
.train-courses {
  font-size: 8.5px;
  color: var(--charcoal-faint);
  line-height: 1.7;
}
.train-sep {
  color: var(--border);
  margin: 0 3px;
}

/* ================================================================
   RIGHT MAIN AREA
   ================================================================ */
.main {
  padding: 40px 32px 32px;
}

/* --- Main section headers --- */
.main-section {
  margin-bottom: 32px;
}
.main-section:last-child { margin-bottom: 0; }

.main-section-head {
  margin-bottom: 18px;
}

/* ================================================================
   EXPERIENCE TIMELINE
   ================================================================ */
.exp-timeline {
  position: relative;
  padding-left: 22px;
}
.exp-timeline::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: var(--border);
  border-radius: 1px;
}

.exp-entry {
  position: relative;
  margin-bottom: 22px;
}
.exp-entry:last-child { margin-bottom: 0; }

.exp-entry::before {
  content: '';
  position: absolute;
  left: -22px;
  top: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--white);
  border: 2px solid var(--teal);
  z-index: 1;
}

/* Alternate dot colors for visual interest */
.exp-timeline.coral-line::before { background: rgba(232, 93, 71, 0.2); }
.exp-timeline.coral-line .exp-entry::before { border-color: var(--coral); }

.exp-date-badge {
  display: inline-block;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--white);
  background: var(--teal);
  padding: 2px 8px;
  border-radius: 3px;
  margin-bottom: 4px;
  line-height: 1.5;
}
.exp-timeline.coral-line .exp-date-badge {
  background: var(--coral);
}

.exp-company {
  font-family: var(--heading);
  font-size: 13px;
  font-weight: 700;
  color: var(--charcoal);
  line-height: 1.3;
}
.exp-role {
  font-size: 10px;
  color: var(--charcoal-light);
  margin-bottom: 6px;
  line-height: 1.5;
}

.exp-bullet {
  font-size: 9.5px;
  color: var(--charcoal-light);
  line-height: 1.65;
  padding-left: 14px;
  position: relative;
  margin-bottom: 2px;
}
.exp-bullet::before {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--teal);
  opacity: 0.4;
}
.exp-timeline.coral-line .exp-bullet::before {
  background: var(--coral);
}

/* ================================================================
   PROJECTS 2-COLUMN GRID
   ================================================================ */
.proj-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.proj-card {
  border: 1px solid var(--border-light);
  border-top: 3px solid var(--teal);
  padding: 14px 14px 12px;
  border-radius: 0 0 4px 4px;
  background: var(--white);
}
.proj-card:nth-child(4n+2) { border-top-color: var(--coral); }
.proj-card:nth-child(4n+3) { border-top-color: var(--slate-blue); }
.proj-card:nth-child(4n+4) { border-top-color: var(--amber); }

.proj-name {
  font-family: var(--heading);
  font-size: 11px;
  font-weight: 700;
  color: var(--charcoal);
  line-height: 1.3;
}
.proj-org {
  font-size: 8.5px;
  color: var(--charcoal-faint);
  margin-bottom: 6px;
  letter-spacing: 0.03em;
}

.proj-bullet {
  font-size: 9px;
  color: var(--charcoal-light);
  line-height: 1.6;
  padding-left: 12px;
  position: relative;
  margin-bottom: 2px;
}
.proj-bullet::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--charcoal-faint);
  opacity: 0.35;
}

.proj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
}
.proj-tag {
  font-size: 7.5px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 10px;
  line-height: 1.5;
}
.proj-card:nth-child(4n+1) .proj-tag {
  background: rgba(0, 137, 123, 0.1);
  color: var(--teal);
}
.proj-card:nth-child(4n+2) .proj-tag {
  background: rgba(232, 93, 71, 0.1);
  color: var(--coral);
}
.proj-card:nth-child(4n+3) .proj-tag {
  background: rgba(92, 107, 192, 0.1);
  color: var(--slate-blue);
}
.proj-card:nth-child(4n+4) .proj-tag {
  background: rgba(249, 168, 37, 0.15);
  color: #c68400;
}

/* ================================================================
   REFERENCES — full width bottom section
   ================================================================ */
.references-section {
  grid-column: 1 / -1;
  padding: 24px 32px 32px;
  background: var(--white);
  border-top: 1px solid var(--border);
}

.ref-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.ref-card {
  padding: 14px 16px;
  background: var(--sidebar-bg);
  border-radius: 6px;
  border-left: 3px solid var(--slate-blue);
}

.ref-name {
  font-family: var(--heading);
  font-size: 11.5px;
  font-weight: 700;
  color: var(--charcoal);
  line-height: 1.3;
}
.ref-role {
  font-size: 9px;
  color: var(--charcoal-light);
  margin-top: 2px;
  line-height: 1.5;
}
.ref-loc {
  font-size: 8px;
  font-weight: 600;
  color: var(--charcoal-faint);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 4px;
}
.ref-email {
  font-size: 8.5px;
  margin-top: 6px;
}
.ref-email a {
  color: var(--slate-blue);
}

/* ================================================================
   PRINT STYLES
   ================================================================ */
@page {
  size: A4;
  margin: 10mm 0 10mm 0;
}

@media print {
  html { font-size: 10px; }

  body {
    background: var(--white);
    max-width: 100%;
  }

  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .cv-wrapper {
    max-width: 100%;
    min-height: auto;
  }

  .sidebar {
    background: var(--sidebar-bg) !important;
  }

  .online-link { display: block; }

  .exp-date-badge {
    background: var(--teal) !important;
  }
  .exp-timeline.coral-line .exp-date-badge {
    background: var(--coral) !important;
  }

  .interest-pill {
    background: var(--white) !important;
  }
  .interest-pill.sec {
    background: transparent !important;
  }

  .ref-card {
    background: var(--sidebar-bg) !important;
  }

  /* break control */
  .exp-entry { break-inside: avoid; }
  .proj-card { break-inside: avoid; }
  .ref-card { break-inside: avoid; }
  .train-group { break-inside: avoid; }
  .edu-entry { break-inside: avoid; }
  .side-section { break-inside: avoid; }

  a { color: inherit; }
  a[href]::after { content: none; }
}
</style>
</head>
<body>

<div class="cv-wrapper">

<!-- ================================================================
     LEFT SIDEBAR
     ================================================================ -->
<aside class="sidebar">

  <!-- Name -->
  <div class="name">${h.escapeHtml(personal.firstName)}<br>${personal.lastNameEmphasis ? `<em>${h.escapeHtml(personal.lastName)}</em>` : h.escapeHtml(personal.lastName)}</div>
  <div class="titles">
${personal.titles.map(t => `    <span class="title-item">${h.escapeHtml(t)}</span>`).join('\n')}
  </div>

  <!-- Contact -->
  <div class="contact-list">
    <div class="contact-item"><span class="contact-dot teal"></span> ${h.escapeHtml(personal.email)}</div>
    <div class="contact-item"><span class="contact-dot coral"></span> ${h.escapeHtml(personal.phone)}</div>
    <div class="contact-item"><span class="contact-dot blue"></span> <a href="${h.escapeHtml(personal.github.url)}">${h.escapeHtml(personal.github.display)}</a></div>
    <div class="contact-item"><span class="contact-dot amber"></span> <a href="${h.escapeHtml(personal.linkedin.url)}">${h.escapeHtml(personal.linkedin.display)}</a></div>
    <div class="online-link"><a href="${h.escapeHtml(personal.website.url)}">${h.escapeHtml(personal.website.display)}</a></div>
  </div>

  <!-- 04 Education -->
  <div class="side-section">
    <div class="section-head">
      <div class="section-bar amber"></div>
      <div class="section-label"><span class="section-num">04</span>Education</div>
    </div>
    <div class="edu-timeline">
${education.map(edu => `      <div class="edu-entry">
        <div class="edu-degree">${h.escapeHtml(edu.degree)}${edu.ongoing ? '<span class="edu-ongoing">ONGOING</span>' : ''}</div>
        <div class="edu-school">${h.escapeHtml(edu.school)}${edu.year ? ` ${h.middot()} ${h.escapeHtml(edu.year)}` : ''}</div>
      </div>`).join('\n')}
    </div>
  </div>

  <!-- 05 Interests -->
  <div class="side-section">
    <div class="section-head">
      <div class="section-bar teal"></div>
      <div class="section-label"><span class="section-num">05</span>Interests</div>
    </div>
    <div class="interest-pills">
${interests.map(interest => `      <span class="interest-pill${interest.secondary ? ' sec' : ''}">${h.escapeHtml(interest.name)}</span>`).join('\n')}
    </div>
  </div>

  <!-- 06 Professional Training -->
  <div class="side-section">
    <div class="section-head">
      <div class="section-bar coral"></div>
      <div class="section-label"><span class="section-num">06</span>Training</div>
    </div>
${training.map(group => `    <div class="train-group">
      <div class="train-provider">${h.escapeHtml(group.provider)}</div>
      <div class="train-courses">${group.courses.map(c => h.formatCourse(c)).join(`<span class="train-sep">${h.middot()}</span>`)}</div>
    </div>`).join('\n')}
  </div>

</aside>

<!-- ================================================================
     RIGHT MAIN AREA
     ================================================================ -->
<main class="main">

  <!-- 01 Work Experience -->
  <div class="main-section">
    <div class="main-section-head">
      <div class="section-bar teal"></div>
      <div class="section-label"><span class="section-num">01</span>Work Experience</div>
    </div>
    <div class="exp-timeline">
${experience.map(exp => `      <div class="exp-entry">
        <div class="exp-date-badge">${h.formatDates(exp.dates)}</div>
        <div class="exp-company">${h.escapeHtml(exp.company)}</div>
        <div class="exp-role">${h.formatRole(exp.role)}</div>
${exp.bullets.map(b => `        <div class="exp-bullet">${h.escapeHtml(b)}</div>`).join('\n')}
      </div>`).join('\n\n')}
    </div>
  </div>

  <!-- 02 Other Experience -->
  <div class="main-section">
    <div class="main-section-head">
      <div class="section-bar coral"></div>
      <div class="section-label"><span class="section-num">02</span>Other Experience</div>
    </div>
    <div class="exp-timeline coral-line">
${otherExperience.map(exp => `      <div class="exp-entry">
        <div class="exp-date-badge">${h.formatDates(exp.dates)}</div>
        <div class="exp-company">${h.escapeHtml(exp.company)}</div>
        <div class="exp-role">${h.formatRole(exp.role)}</div>
${exp.bullets.map(b => `        <div class="exp-bullet">${h.escapeHtml(b)}</div>`).join('\n')}
      </div>`).join('\n\n')}
    </div>
  </div>

  <!-- 03 Key Projects -->
  <div class="main-section">
    <div class="main-section-head">
      <div class="section-bar blue"></div>
      <div class="section-label"><span class="section-num">03</span>Key Projects</div>
    </div>
    <div class="proj-grid">
${projects.map(proj => `      <div class="proj-card">
        <div class="proj-name">${h.escapeHtml(proj.name)}</div>
        <div class="proj-org">${h.escapeHtml(proj.org)}</div>
${proj.bullets.map(b => `        <div class="proj-bullet">${h.escapeHtml(b)}</div>`).join('\n')}
        <div class="proj-tags">
${proj.tags.map(t => `          <span class="proj-tag">${h.escapeHtml(t)}</span>`).join('\n')}
        </div>
      </div>`).join('\n\n')}
    </div>
  </div>

</main>

<!-- ================================================================
     REFERENCES — full width bottom
     ================================================================ -->
<section class="references-section">
  <div class="main-section-head">
    <div class="section-bar blue"></div>
    <div class="section-label"><span class="section-num">07</span>References</div>
  </div>
  <div class="ref-grid">
${references.map(ref => `    <div class="ref-card">
      <div class="ref-name">${h.escapeHtml(ref.name)}</div>
      <div class="ref-role">${h.escapeHtml(ref.role)} ${h.middot()} ${h.escapeHtml(ref.company)}</div>
      <div class="ref-loc">${h.escapeHtml(ref.location)}</div>
      ${ref.email ? `<div class="ref-email"><a href="mailto:${h.escapeHtml(ref.email)}">${h.escapeHtml(ref.email)}</a></div>` : ""}${ref.phone ? `<div class="ref-email">${h.escapeHtml(ref.phone)}</div>` : ""}
    </div>`).join('\n')}
  </div>
</section>

</div><!-- .cv-wrapper -->

</body>
</html>`;
}

module.exports = { render };
