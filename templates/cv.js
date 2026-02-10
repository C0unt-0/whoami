'use strict';

const h = require('./helpers');

function render(data) {
  const p = data.personal;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${h.escapeHtml(p.firstName)} ${h.escapeHtml(p.lastName)} — CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
<style>
:root {
  --ink: #0c0c14;
  --ink-mid: #2a2a3e;
  --ink-dim: #5c5c72;
  --ink-faint: #8a8a9e;
  --accent: #0a7a4a;
  --accent-bright: #00c96e;
  --signal: #c43040;
  --signal-dim: #d4606c;
  --surface: #ffffff;
  --surface-off: #f6f6f8;
  --surface-muted: #ededf0;
  --rule: #d0d0d8;
  --rule-dark: #1a1a2e;
  --mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace;
  --body: 'DM Sans', system-ui, -apple-system, sans-serif;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 10.5px; }
body {
  font-family: var(--body);
  color: var(--ink);
  line-height: 1.5;
  max-width: 820px;
  margin: 0 auto;
  padding: 28px 36px;
  background: var(--surface);
  -webkit-font-smoothing: antialiased;
}
a { color: var(--accent); text-decoration: none; }

/* ═══════ HEADER ═══════ */
.header {
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 3px solid var(--ink);
  position: relative;
}
.header::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 80px;
  height: 3px;
  background: var(--accent-bright);
}
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}
.name-block { flex: 1; }
.name {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -1px;
  line-height: 1;
  color: var(--ink);
}
.name em {
  font-style: italic;
  color: var(--accent);
}
.tagline {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
}
.tagline span {
  font-family: var(--mono);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 2px;
  padding: 3px 10px;
  background: var(--ink);
  color: var(--surface);
}
.tagline span:last-child {
  background: var(--signal);
}
.contact-block {
  text-align: right;
  font-size: 9.5px;
  color: var(--ink-mid);
  line-height: 1.8;
  flex-shrink: 0;
  padding-top: 2px;
}
.contact-block a { color: var(--accent); font-weight: 500; }
.contact-block .label {
  font-family: var(--mono);
  font-size: 7.5px;
  letter-spacing: 1.5px;
  color: var(--ink-faint);
  text-transform: uppercase;
}
.online-link {
  display: none;
  margin-top: 8px;
  font-family: var(--mono);
  font-size: 8px;
  color: var(--ink-dim);
  letter-spacing: 0.5px;
  padding: 4px 0;
  border-top: 1px dashed var(--rule);
}
.online-link a { color: var(--accent); font-weight: 600; }

/* ═══════ SECTION HEADERS ═══════ */
.section { margin-bottom: 16px; }
.section-title {
  font-family: var(--mono);
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 4px 10px;
  margin-bottom: 10px;
  background: var(--ink);
  color: var(--accent-bright);
  display: inline-block;
  position: relative;
}
.section-title::after {
  content: '';
  position: absolute;
  right: -30px;
  top: 50%;
  width: 24px;
  height: 1px;
  background: var(--rule);
}
.section-title.alt {
  color: var(--signal-dim);
}

/* ═══════ EXPERIENCE ═══════ */
.exp {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 108px 1fr;
  gap: 10px;
  padding-left: 10px;
  border-left: 2px solid var(--surface-muted);
  position: relative;
}
.exp::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 4px;
  width: 6px;
  height: 6px;
  background: var(--accent);
}
.exp:last-child { margin-bottom: 0; }
.exp-dates {
  font-family: var(--mono);
  font-size: 8px;
  color: var(--ink-dim);
  padding-top: 1px;
  line-height: 1.7;
  letter-spacing: 0.3px;
}
.exp-company {
  font-size: 8.5px;
  color: var(--ink-mid);
  font-weight: 500;
  margin-top: 1px;
}
.exp-role {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
}
.exp-bullets { margin-top: 3px; }
.exp-bullet {
  font-size: 9.5px;
  color: var(--ink-mid);
  line-height: 1.55;
  padding-left: 12px;
  position: relative;
  margin-top: 1.5px;
}
.exp-bullet::before {
  content: '\\25B8';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-size: 8px;
  top: 1px;
}

/* ═══════ PROJECTS ═══════ */
.proj {
  margin-bottom: 8px;
  padding: 7px 10px 8px;
  border-left: 3px solid var(--accent);
  background: var(--surface-off);
  position: relative;
}
.proj:nth-child(odd) { border-left-color: var(--ink-mid); }
.proj-head { display: flex; align-items: baseline; gap: 6px; }
.proj-name {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--ink);
}
.proj-org {
  font-family: var(--mono);
  font-size: 8px;
  color: var(--ink-dim);
  letter-spacing: 0.5px;
}
.proj-bullets { margin-top: 3px; }
.proj-bullet {
  font-size: 9.5px;
  color: var(--ink-mid);
  line-height: 1.5;
  padding-left: 12px;
  position: relative;
  margin-top: 1.5px;
}
.proj-bullet::before {
  content: '\\25B8';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-size: 8px;
  top: 1px;
}
.proj-tags { display: flex; gap: 3px; margin-top: 5px; flex-wrap: wrap; }
.proj-tag {
  font-family: var(--mono);
  font-size: 7px;
  font-weight: 600;
  padding: 2px 6px;
  letter-spacing: 0.5px;
  border: 1px solid var(--rule);
  color: var(--accent);
  background: var(--surface);
}

/* ═══════ BOTTOM GRID ═══════ */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* ═══════ EDUCATION ═══════ */
.edu { margin-bottom: 7px; }
.edu-degree {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink);
}
.edu-ongoing {
  font-family: var(--mono);
  font-size: 7px;
  font-weight: 700;
  color: var(--signal);
  letter-spacing: 2px;
  margin-left: 4px;
  padding: 1px 5px;
  border: 1px solid var(--signal);
}
.edu-school {
  font-size: 9px;
  color: var(--ink-dim);
  margin-top: 1px;
}

/* ═══════ INTERESTS ═══════ */
.interest-list { display: flex; gap: 4px; flex-wrap: wrap; }
.interest-item {
  font-family: var(--mono);
  font-size: 8px;
  font-weight: 500;
  padding: 3px 8px;
  border: 1px solid var(--rule);
  color: var(--ink-mid);
  letter-spacing: 0.3px;
}
.interest-item.sec {
  border-color: var(--signal);
  color: var(--signal);
  font-weight: 600;
}

/* ═══════ TRAINING ═══════ */
.train-group { margin-bottom: 7px; }
.train-provider {
  font-family: var(--mono);
  font-size: 7.5px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--accent);
  padding-bottom: 3px;
  margin-bottom: 4px;
  border-bottom: 1px solid var(--surface-muted);
}
.train-list { display: flex; flex-wrap: wrap; gap: 3px; }
.train-item {
  font-size: 8.5px;
  padding: 2px 7px;
  border: 1px solid var(--rule);
  color: var(--ink-mid);
}

/* ═══════ REFERENCES ═══════ */
.ref-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.ref {
  padding: 8px 10px;
  border: 1px solid var(--rule);
  border-top: 2px solid var(--ink-mid);
  background: var(--surface-off);
}
.ref-name {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--ink);
}
.ref-role {
  font-size: 8.5px;
  color: var(--ink-dim);
  margin-top: 2px;
  line-height: 1.4;
}
.ref-loc {
  font-family: var(--mono);
  font-size: 7.5px;
  color: var(--ink-faint);
  margin-top: 1px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.ref-email {
  font-family: var(--mono);
  font-size: 8.5px;
  color: var(--accent);
  margin-top: 4px;
  word-break: break-all;
}

/* ═══════ FOOTER ═══════ */
.footer-bar {
  margin-top: 14px;
  padding-top: 8px;
  border-top: 1px solid var(--rule);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-sig {
  font-family: var(--mono);
  font-size: 7px;
  color: var(--ink-faint);
  letter-spacing: 2px;
}
.footer-hash {
  font-family: var(--mono);
  font-size: 7px;
  color: var(--ink-faint);
  letter-spacing: 1px;
}

/* ═══════ PRINT ═══════ */
@media print {
  html { font-size: 10.5px; }
  body { padding: 0; max-width: 100%; }
  .section { break-inside: avoid; }
  .exp { break-inside: avoid; }
  .proj { break-inside: avoid; }
  .ref { break-inside: avoid; }
  .grid-2 { break-inside: avoid; }
  .train-group { break-inside: avoid; }
  .online-link { display: block; }
  a { color: var(--accent); }
  a[href]::after { content: none; }
  .tagline span {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .section-title {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .exp::before {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .proj {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .ref {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .header::after {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .interest-item.sec {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .edu-ongoing {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
@page {
  size: A4;
  margin: 12mm 14mm;
}
</style>
</head>
<body>

<!-- HEADER -->
<div class="header">
  <div class="header-top">
    <div class="name-block">
      <div class="name">${h.escapeHtml(p.firstName)} <em>${h.escapeHtml(p.lastName)}</em></div>
      <div class="tagline">
${p.titles.map((t, i) => `        <span>${h.escapeHtml(t.toUpperCase())}</span>`).join('\n')}
      </div>
    </div>
    <div class="contact-block">
      <span class="label">Contact</span><br>
      ${h.escapeHtml(p.email)}<br>
      ${h.escapeHtml(p.phone)}<br>
      <a href="${h.escapeHtml(p.github.url)}">${h.escapeHtml(p.github.display)}</a><br>
      <a href="${h.escapeHtml(p.linkedin.url)}">${h.escapeHtml(p.linkedin.display)}</a>
    </div>
  </div>
  <div class="online-link">// interactive version &mdash; <a href="${h.escapeHtml(p.website.url)}">${h.escapeHtml(p.website.display)}</a></div>
</div>

<!-- WORK EXPERIENCE -->
<div class="section">
  <div class="section-title">Work Experience</div>

${data.experience.map(exp => `  <div class="exp">
    <div class="exp-dates">${h.formatDates(exp.dates)}<div class="exp-company">${h.escapeHtml(exp.company)}</div></div>
    <div>
      <div class="exp-role">${h.formatRole(exp.role)}</div>
      <div class="exp-bullets">
${exp.bullets.map(b => `        <div class="exp-bullet">${h.escapeHtml(b)}</div>`).join('\n')}
      </div>
    </div>
  </div>`).join('\n\n')}
</div>

<!-- OTHER EXPERIENCE -->
<div class="section">
  <div class="section-title alt">Other Experience</div>

${data.otherExperience.map(exp => `  <div class="exp">
    <div class="exp-dates">${h.formatDates(exp.dates)}<div class="exp-company">${h.escapeHtml(exp.company)}</div></div>
    <div>
      <div class="exp-role">${h.formatRole(exp.role)}</div>
      <div class="exp-bullets">
${exp.bullets.map(b => `        <div class="exp-bullet">${h.escapeHtml(b)}</div>`).join('\n')}
      </div>
    </div>
  </div>`).join('\n\n')}

</div>

<!-- PROJECTS -->
<div class="section">
  <div class="section-title">Key Projects</div>

${data.projects.map(proj => `  <div class="proj">
    <div class="proj-head"><span class="proj-name">${h.escapeHtml(proj.name)}</span><span class="proj-org">&mdash; ${h.escapeHtml(proj.org)}</span></div>
    <div class="proj-bullets">
${proj.bullets.map(b => `      <div class="proj-bullet">${h.escapeHtml(b)}</div>`).join('\n')}
    </div>
    <div class="proj-tags">${proj.tags.map(t => `<span class="proj-tag">${h.escapeHtml(t)}</span>`).join('')}</div>
  </div>`).join('\n\n')}
</div>

<!-- EDUCATION & INTERESTS -->
<div class="grid-2">
  <div class="section">
    <div class="section-title">Education</div>
${data.education.map(edu => `    <div class="edu">
      <div class="edu-degree">${h.escapeHtml(edu.degree)}${edu.ongoing ? ' <span class="edu-ongoing">ONGOING</span>' : ''}</div>
      <div class="edu-school">${h.escapeHtml(edu.school)}${edu.year ? ' &middot; ' + h.escapeHtml(edu.year) : ''}</div>
    </div>`).join('\n')}
  </div>

  <div class="section">
    <div class="section-title">Interests</div>
    <div class="interest-list">
${data.interests.map(int => `      <span class="interest-item${int.secondary ? ' sec' : ''}">${h.escapeHtml(int.name)}</span>`).join('\n')}
    </div>
  </div>
</div>

<!-- PROFESSIONAL TRAINING -->
<div class="section">
  <div class="section-title">Professional Training</div>

${data.training.map(group => `  <div class="train-group">
    <div class="train-provider">${h.escapeHtml(group.provider.toUpperCase())}</div>
    <div class="train-list">
${group.courses.map(c => `      <span class="train-item">${h.formatCourse(c)}</span>`).join('\n')}
    </div>
  </div>`).join('\n\n')}
</div>

<!-- REFERENCES -->
<div class="section">
  <div class="section-title">References</div>
  <div class="ref-grid">
${data.references.map(ref => `    <div class="ref">
      <div class="ref-name">${h.escapeHtml(ref.name)}</div>
      <div class="ref-role">${h.escapeHtml(ref.role)} &middot; ${h.escapeHtml(ref.company)}</div>
      <div class="ref-loc">${h.escapeHtml(ref.location)}</div>
      ${ref.email ? `<div class="ref-email">${h.escapeHtml(ref.email)}</div>` : ""}${ref.phone ? `<div class="ref-email">${h.escapeHtml(ref.phone)}</div>` : ""}
    </div>`).join('\n')}
  </div>
</div>

<!-- FOOTER -->
<div class="footer-bar">
  <div class="footer-sig">// END_TRANSMISSION</div>
  <div class="footer-hash">c0unt-0/whoami</div>
</div>

</body>
</html>
`;
}

module.exports = { render };
