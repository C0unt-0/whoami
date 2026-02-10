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
<meta name="description" content="${personal.titles.map(t => h.escapeHtml(t)).join(' / ')} ${h.mdash()} ${h.escapeHtml(personal.firstName)} ${h.escapeHtml(personal.lastName)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Poiret+One&display=swap" rel="stylesheet">
<style>
/* ═══════════════════════════════════════════════════════════════
   ART DECO / GATSBY — cv-v6
   1920s glamour. Gold geometric patterns. Restrained luxury.
   ═══════════════════════════════════════════════════════════════ */

:root {
  --navy: #0d1b2a;
  --gold: #d4a843;
  --gold-dim: rgba(212, 168, 67, 0.25);
  --gold-faint: rgba(212, 168, 67, 0.08);
  --cream: #f8f3e6;
  --cream-dark: #f0e8d4;
  --warm-white: #fdfaf2;
  --charcoal: #1b1b1b;
  --charcoal-light: #3a3a3a;
  --charcoal-mid: #5a5a5a;
  --charcoal-faint: #8a8a7a;
  --display: 'Poiret One', 'Didot', 'Bodoni MT', serif;
  --serif: 'Cormorant Garamond', 'Garamond', 'Georgia', serif;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html { font-size: 10px; }

body {
  font-family: var(--serif);
  color: var(--charcoal);
  background: var(--cream);
  line-height: 1.65;
  max-width: 820px;
  margin: 0 auto;
  padding: 0 40px 40px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: var(--gold);
  text-decoration: none;
  transition: color 0.3s ease;
}
a:hover { color: var(--charcoal); }

/* ═══════ TOP DECORATIVE BORDER ═══════ */
.deco-border-top {
  position: relative;
  height: 40px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deco-border-top::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gold);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.deco-border-top::after {
  content: '';
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gold-dim);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.deco-corner-tl,
.deco-corner-tr,
.deco-corner-bl,
.deco-corner-br {
  position: absolute;
  width: 20px;
  height: 20px;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.deco-corner-tl {
  top: 0;
  left: 0;
  border-top: 3px solid var(--gold);
  border-left: 3px solid var(--gold);
}

.deco-corner-tr {
  top: 0;
  right: 0;
  border-top: 3px solid var(--gold);
  border-right: 3px solid var(--gold);
}

.deco-diamond-top {
  position: relative;
  z-index: 1;
  font-size: 14px;
  color: var(--gold);
  background: var(--cream);
  padding: 0 12px;
  letter-spacing: 4px;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

/* ═══════ HEADER ═══════ */
.header {
  text-align: center;
  padding: 24px 0 32px;
  margin-bottom: 40px;
  position: relative;
}

.header-frame {
  border: 1px solid var(--gold);
  padding: 28px 32px 24px;
  position: relative;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.header-frame::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 1px solid var(--gold-dim);
  pointer-events: none;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.name {
  font-family: var(--display);
  font-size: 52px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--charcoal);
  line-height: 1.1;
  margin-bottom: 6px;
}

.name-emphasis {
  color: var(--gold);
}

.tagline {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin: 16px 0 20px;
  flex-wrap: wrap;
}

.tagline span {
  font-family: var(--serif);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--charcoal-mid);
}

.tagline .sep {
  color: var(--gold);
  font-size: 8px;
  margin: 0 12px;
}

.contact {
  font-family: var(--serif);
  font-size: 10px;
  color: var(--charcoal-light);
  line-height: 2;
  letter-spacing: 0.04em;
}

.contact a {
  color: var(--charcoal-light);
  border-bottom: 1px solid var(--gold-dim);
}
.contact a:hover {
  color: var(--gold);
}

.contact-sep {
  color: var(--gold);
  margin: 0 8px;
  font-size: 8px;
}

.online-link {
  display: none;
  margin-top: 10px;
  font-family: var(--serif);
  font-size: 9px;
  color: var(--charcoal-faint);
  letter-spacing: 0.06em;
}
.online-link a {
  color: var(--charcoal-light);
  border-bottom: 1px solid var(--gold-dim);
}

/* ═══════ SECTION HEADERS ═══════ */
.section {
  margin-bottom: 44px;
}

.section-header {
  text-align: center;
  margin-bottom: 28px;
  position: relative;
  padding: 0 20px;
}

.section-header::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gold);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.section-title-wrap {
  display: inline-block;
  position: relative;
  z-index: 1;
  background: var(--cream);
  padding: 0 20px;
}

.section-num {
  display: block;
  font-family: var(--display);
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--gold);
  margin-bottom: 2px;
}

.section-title {
  font-family: var(--display);
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--charcoal);
  line-height: 1.3;
}

.section-ornament {
  display: block;
  margin-top: 4px;
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--gold);
  user-select: none;
}

/* ═══════ EXPERIENCE ═══════ */
.exp {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 0 20px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--gold-dim);
  break-inside: avoid;
}
.exp:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.exp-dates {
  font-family: var(--serif);
  font-size: 9px;
  font-weight: 500;
  color: var(--charcoal-faint);
  letter-spacing: 0.05em;
  padding-top: 3px;
  line-height: 1.5;
}

.exp-company {
  font-family: var(--serif);
  font-size: 9px;
  color: var(--charcoal-faint);
  font-style: italic;
  margin-top: 2px;
}

.exp-role {
  font-family: var(--serif);
  font-size: 15px;
  font-weight: 600;
  color: var(--charcoal);
  line-height: 1.35;
  margin-bottom: 6px;
}

.exp-bullets {
  margin-top: 4px;
}

.exp-bullet {
  font-family: var(--serif);
  font-size: 10px;
  color: var(--charcoal-light);
  line-height: 1.65;
  padding-left: 18px;
  position: relative;
  margin-top: 3px;
}

.exp-bullet::before {
  content: '\\25C6';
  position: absolute;
  left: 0;
  color: var(--gold);
  font-size: 5px;
  top: 5px;
}

/* ═══════ PROJECTS ═══════ */
.proj {
  margin-bottom: 16px;
  padding: 14px 18px;
  border: 1px solid var(--gold-dim);
  border-left: 2px solid var(--gold);
  background: var(--warm-white);
  break-inside: avoid;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}
.proj:last-child { margin-bottom: 0; }

.proj-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 6px;
}

.proj-name {
  font-family: var(--serif);
  font-size: 14px;
  font-weight: 600;
  color: var(--charcoal);
}

.proj-org {
  font-family: var(--serif);
  font-size: 9px;
  color: var(--charcoal-faint);
  font-style: italic;
  letter-spacing: 0.04em;
}

.proj-bullets {
  margin-bottom: 8px;
}

.proj-bullet {
  font-family: var(--serif);
  font-size: 10px;
  color: var(--charcoal-light);
  line-height: 1.65;
  padding-left: 18px;
  position: relative;
  margin-top: 3px;
}

.proj-bullet::before {
  content: '\\25C6';
  position: absolute;
  left: 0;
  color: var(--gold);
  font-size: 5px;
  top: 5px;
}

.proj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.proj-tag {
  font-family: var(--serif);
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0.08em;
  padding: 2px 8px;
  border: 1px solid var(--gold-dim);
  color: var(--charcoal-faint);
  font-style: italic;
}

/* ═══════ EDUCATION & INTERESTS SIDE BY SIDE ═══════ */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  break-inside: avoid;
}

.edu {
  margin-bottom: 12px;
}

.edu-degree {
  font-family: var(--serif);
  font-size: 14px;
  font-weight: 600;
  color: var(--charcoal);
  line-height: 1.35;
}

.edu-ongoing {
  display: inline-block;
  font-family: var(--serif);
  font-size: 7px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  border: 1px solid var(--gold);
  padding: 1px 6px;
  margin-left: 6px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.edu-school {
  font-family: var(--serif);
  font-size: 10px;
  color: var(--charcoal-faint);
  font-style: italic;
  margin-top: 2px;
}

.interest-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.interest-tag {
  font-family: var(--serif);
  font-size: 9px;
  font-weight: 500;
  padding: 4px 12px;
  border: 1px solid var(--gold-dim);
  color: var(--charcoal-light);
  letter-spacing: 0.04em;
}

.interest-tag.sec {
  border-color: var(--gold);
  color: var(--gold);
  font-weight: 600;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

/* ═══════ TRAINING ═══════ */
.train-group {
  margin-bottom: 16px;
  break-inside: avoid;
}
.train-group:last-child { margin-bottom: 0; }

.train-provider {
  font-family: var(--serif);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 6px;
  font-variant: small-caps;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.train-courses {
  font-family: var(--serif);
  font-size: 9.5px;
  color: var(--charcoal-light);
  line-height: 1.9;
  letter-spacing: 0.02em;
}

.train-sep {
  color: var(--gold);
  margin: 0 5px;
  font-size: 8px;
}

/* ═══════ REFERENCES ═══════ */
.ref-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.ref {
  text-align: center;
  padding: 16px 14px;
  border-top: 2px solid var(--gold);
  background: var(--warm-white);
  break-inside: avoid;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.ref-name {
  font-family: var(--serif);
  font-size: 13px;
  font-weight: 600;
  color: var(--charcoal);
  margin-bottom: 4px;
}

.ref-role {
  font-family: var(--serif);
  font-size: 9px;
  color: var(--charcoal-light);
  line-height: 1.5;
  font-style: italic;
}

.ref-loc {
  font-family: var(--serif);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--charcoal-faint);
  margin-top: 4px;
}

.ref-email {
  font-family: var(--serif);
  font-size: 9px;
  color: var(--charcoal-faint);
  margin-top: 6px;
  word-break: break-all;
}
.ref-email a {
  color: var(--charcoal-faint);
  border-bottom: 1px solid var(--gold-dim);
}
.ref-email a:hover {
  color: var(--gold);
}

/* ═══════ FOOTER ═══════ */
.footer {
  margin-top: 48px;
  text-align: center;
}

.footer-ornament {
  color: var(--gold);
  font-size: 10px;
  letter-spacing: 3px;
  margin-bottom: 12px;
  user-select: none;
}

.footer-text {
  font-family: var(--display);
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--charcoal-faint);
}

/* ═══════ BOTTOM DECORATIVE BORDER ═══════ */
.deco-border-bottom {
  position: relative;
  height: 32px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deco-border-bottom::before {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gold);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.deco-border-bottom::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gold-dim);
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.deco-corner-bl {
  bottom: 0;
  left: 0;
  border-bottom: 3px solid var(--gold);
  border-left: 3px solid var(--gold);
}

.deco-corner-br {
  bottom: 0;
  right: 0;
  border-bottom: 3px solid var(--gold);
  border-right: 3px solid var(--gold);
}

.deco-diamond-bottom {
  position: relative;
  z-index: 1;
  font-size: 14px;
  color: var(--gold);
  background: var(--cream);
  padding: 0 12px;
  letter-spacing: 4px;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

/* ═══════ PRINT ═══════ */
@page {
  size: A4;
  margin: 14mm 18mm;
}

@media print {
  html { font-size: 10px; }

  body {
    padding: 0;
    max-width: 100%;
    background: var(--cream);
  }

  .online-link { display: block; }

  .header { margin-bottom: 32px; padding: 16px 0 24px; }
  .section { margin-bottom: 32px; }
  .exp { margin-bottom: 18px; padding-bottom: 18px; }
  .proj { margin-bottom: 12px; }

  .section { break-inside: avoid; }
  .exp { break-inside: avoid; }
  .proj { break-inside: avoid; }
  .ref { break-inside: avoid; }
  .two-col { break-inside: avoid; }
  .train-group { break-inside: avoid; }

  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  a { border-bottom: none; }
  a[href]::after { content: none; }

  .footer { margin-top: 32px; }

  .proj {
    background: var(--warm-white) !important;
    border-left: 2px solid var(--gold) !important;
  }

  .ref {
    background: var(--warm-white) !important;
    border-top: 2px solid var(--gold) !important;
  }

  .deco-border-top,
  .deco-border-bottom {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  .header-frame {
    border-color: var(--gold) !important;
  }

  .header-frame::before {
    border-color: var(--gold-dim) !important;
  }
}

/* ═══════ RESPONSIVE ═══════ */
@media (max-width: 700px) {
  body { padding: 0 20px 24px; }
  .name { font-size: 36px; letter-spacing: 0.15em; }
  .two-col { grid-template-columns: 1fr; gap: 24px; }
  .ref-grid { grid-template-columns: 1fr; }
  .exp { grid-template-columns: 1fr; gap: 4px; }
  .header-frame { padding: 20px 16px; }
}
</style>
</head>
<body>

<!-- ═══════ TOP DECORATIVE BORDER ═══════ -->
<div class="deco-border-top">
  <span class="deco-corner-tl"></span>
  <span class="deco-corner-tr"></span>
  <span class="deco-diamond-top">&#9670; &#9670; &#9670;</span>
</div>

<!-- ═══════ HEADER ═══════ -->
<header class="header">
  <div class="header-frame">
    <h1 class="name">${h.escapeHtml(personal.firstName)} ${personal.lastNameEmphasis ? `<span class="name-emphasis">${h.escapeHtml(personal.lastName)}</span>` : h.escapeHtml(personal.lastName)}</h1>
    <div class="tagline">
${personal.titles.map((title, i) => {
  const span = `      <span>${h.escapeHtml(title)}</span>`;
  return i < personal.titles.length - 1
    ? span + `\n      <span class="sep">&#9670;</span>`
    : span;
}).join('\n')}
    </div>
    <div class="contact">
      ${h.escapeHtml(personal.email)}<span class="contact-sep">&#9670;</span>${h.escapeHtml(personal.phone)}<br>
      <a href="${h.escapeHtml(personal.github.url)}">${h.escapeHtml(personal.github.display)}</a><span class="contact-sep">&#9670;</span><a href="${h.escapeHtml(personal.linkedin.url)}">${h.escapeHtml(personal.linkedin.display)}</a>
    </div>
    <div class="online-link">
      <a href="${h.escapeHtml(personal.website.url)}">${h.escapeHtml(personal.website.display)}</a>
    </div>
  </div>
</header>

<!-- ═══════ 01 — WORK EXPERIENCE ═══════ -->
<section class="section">
  <div class="section-header">
    <span class="section-title-wrap">
      <span class="section-num">01</span>
      <span class="section-title">Work Experience</span>
      <span class="section-ornament">&#9552;&#9552;&#9552; &#9670; &#9552;&#9552;&#9552;</span>
    </span>
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
</section>

<!-- ═══════ 02 — OTHER EXPERIENCE ═══════ -->
<section class="section">
  <div class="section-header">
    <span class="section-title-wrap">
      <span class="section-num">02</span>
      <span class="section-title">Other Experience</span>
      <span class="section-ornament">&#9552;&#9552;&#9552; &#9670; &#9552;&#9552;&#9552;</span>
    </span>
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
</section>

<!-- ═══════ 03 — KEY PROJECTS ═══════ -->
<section class="section">
  <div class="section-header">
    <span class="section-title-wrap">
      <span class="section-num">03</span>
      <span class="section-title">Key Projects</span>
      <span class="section-ornament">&#9552;&#9552;&#9552; &#9670; &#9552;&#9552;&#9552;</span>
    </span>
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
</section>

<!-- ═══════ 04 / 05 — EDUCATION & INTERESTS ═══════ -->
<div class="two-col">
  <section class="section">
    <div class="section-header">
      <span class="section-title-wrap">
        <span class="section-num">04</span>
        <span class="section-title">Education</span>
        <span class="section-ornament">&#9552; &#9670; &#9552;</span>
      </span>
    </div>
${education.map(edu => `    <div class="edu">
      <div class="edu-degree">${h.escapeHtml(edu.degree)}${edu.ongoing ? ' <span class="edu-ongoing">Ongoing</span>' : ''}</div>
      <div class="edu-school">${h.escapeHtml(edu.school)}${edu.year ? ` ${h.middot()} ${h.escapeHtml(edu.year)}` : ''}</div>
    </div>`).join('\n')}
  </section>

  <section class="section">
    <div class="section-header">
      <span class="section-title-wrap">
        <span class="section-num">05</span>
        <span class="section-title">Interests</span>
        <span class="section-ornament">&#9552; &#9670; &#9552;</span>
      </span>
    </div>
    <div class="interest-list">
${interests.map(interest => `      <span class="interest-tag${interest.secondary ? ' sec' : ''}">${h.escapeHtml(interest.name)}</span>`).join('\n')}
    </div>
  </section>
</div>

<!-- ═══════ 06 — PROFESSIONAL TRAINING ═══════ -->
<section class="section">
  <div class="section-header">
    <span class="section-title-wrap">
      <span class="section-num">06</span>
      <span class="section-title">Professional Training</span>
      <span class="section-ornament">&#9552;&#9552;&#9552; &#9670; &#9552;&#9552;&#9552;</span>
    </span>
  </div>

${training.map(group => {
    const coursesText = group.courses.map(course => h.formatCourse(course)).join(`<span class="train-sep">${h.middot()}</span>`);
    return `  <div class="train-group">
    <div class="train-provider">${h.escapeHtml(group.provider)}</div>
    <div class="train-courses">${coursesText}</div>
  </div>`;
  }).join('\n\n')}
</section>

<!-- ═══════ 07 — REFERENCES ═══════ -->
<section class="section">
  <div class="section-header">
    <span class="section-title-wrap">
      <span class="section-num">07</span>
      <span class="section-title">References</span>
      <span class="section-ornament">&#9552;&#9552;&#9552; &#9670; &#9552;&#9552;&#9552;</span>
    </span>
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

<!-- ═══════ FOOTER ═══════ -->
<footer class="footer">
  <div class="footer-ornament">&#9552;&#9552;&#9552;&#9552; &#9670; &#9552;&#9552;&#9552;&#9552;</div>
  <div class="footer-text">${h.escapeHtml(personal.firstName)} ${h.escapeHtml(personal.lastName)} ${h.mdash()} Curriculum Vitae</div>
</footer>

<!-- ═══════ BOTTOM DECORATIVE BORDER ═══════ -->
<div class="deco-border-bottom">
  <span class="deco-corner-bl"></span>
  <span class="deco-corner-br"></span>
  <span class="deco-diamond-bottom">&#9670; &#9670; &#9670;</span>
</div>

</body>
</html>`;
}

module.exports = { render };
