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
<meta name="description" content="Senior Software Engineer · Security Engineer · AI & Automation — ${h.escapeHtml(p.firstName)} ${h.escapeHtml(p.lastName)}'s professional CV">
<meta name="theme-color" content="#0a0a0a">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
/* ═══════ CUSTOM PROPERTIES ═══════ */
:root {
  --bg: #060608;
  --bg-card: #0d0d14;
  --bg-card-hover: #131320;
  --green: #00ff88;
  --green-dim: rgba(0,255,136,.18);
  --green-glow: rgba(0,255,136,.4);
  --green-faint: rgba(0,255,136,.07);
  --cyan: #00e5ff;
  --red: #ff3c55;
  --red-dim: rgba(255,60,85,.18);
  --red-glow: rgba(255,60,85,.4);
  --red-faint: rgba(255,60,85,.07);
  --amber: #ff8a50;
  --text: #e0dfe8;
  --text-dim: #a8a6b8;
  --text-faint: #706e82;
  --border: #222235;
  --border-bright: #333348;
  --mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace;
  --sans: 'Space Grotesk', system-ui, sans-serif;
}

/* ═══════ RESET & BASE ═══════ */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: var(--green-dim) var(--bg); }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--green-dim); border-radius: 3px; }
body {
  font-family: var(--mono);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
a { color: var(--green); text-decoration: none; transition: all .25s ease; }
a:hover { color: #fff; text-shadow: 0 0 12px var(--green-glow); }
::selection { background: var(--green); color: var(--bg); }

/* ═══════ MATRIX CANVAS ═══════ */
#matrix-bg {
  position: fixed; inset: 0; z-index: 0;
  pointer-events: none; opacity: .35;
}

/* ═══════ SCANLINES ═══════ */
.scanlines {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent, transparent 2px,
    rgba(0,255,136,.008) 2px,
    rgba(0,255,136,.008) 4px
  );
}
.scanlines::after {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(4,4,12,.45));
}

/* ═══════ NOISE OVERLAY ═══════ */
.noise {
  position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat; background-size: 128px;
}

/* ═══════ PROGRESS BAR ═══════ */
#progress {
  position: fixed; top: 0; left: 0; height: 2px; z-index: 1000;
  background: linear-gradient(90deg, var(--green), var(--cyan));
  box-shadow: 0 0 10px var(--green-glow), 0 0 30px var(--green-glow);
  width: 0%; transition: width .15s linear;
}

/* ═══════ NAV ═══════ */
nav {
  position: fixed; top: 2px; left: 0; right: 0; z-index: 999;
  background: rgba(6,6,10,.92); backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
  padding: 0 20px; height: 44px;
  display: flex; align-items: center; gap: 4px;
  overflow-x: auto; -ms-overflow-style: none; scrollbar-width: none;
  transition: transform .3s ease;
}
nav::-webkit-scrollbar { display: none; }
nav.hidden { transform: translateY(-100%); }
.nav-label {
  font-size: 10px; color: var(--text-dim); letter-spacing: 3px;
  margin-right: 8px; white-space: nowrap; flex-shrink: 0;
}
.nav-link {
  font-size: 10px; padding: 7px 12px; white-space: nowrap;
  border: 1px solid transparent; border-radius: 2px;
  color: var(--text-dim); letter-spacing: 1px;
  transition: all .25s ease; flex-shrink: 0;
}
.nav-link:hover { color: var(--green); border-color: var(--green-dim); }
.nav-link.active { color: var(--green); border-color: var(--green); background: var(--green-faint); }

/* ═══════ MAIN LAYOUT ═══════ */
main {
  position: relative; z-index: 2;
  max-width: 900px; margin: 0 auto;
  padding: 64px 28px 80px;
}

/* ═══════ SECTIONS ═══════ */
section { margin-bottom: 64px; }

/* ═══════ SECTION REVEAL ═══════ */
.reveal {
  opacity: 0; transform: translateY(24px);
  transition: opacity .6s ease, transform .6s ease;
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ═══════ SECTION HEADERS ═══════ */
.section-head {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 28px; padding-bottom: 10px;
}
.section-marker {
  width: 8px; height: 8px; background: var(--green);
  box-shadow: 0 0 8px var(--green-glow);
  flex-shrink: 0;
}
.section-marker.dim { background: var(--red); box-shadow: 0 0 8px var(--red-glow); }
.section-title {
  font-size: 11px; letter-spacing: 4px; color: var(--text-dim);
  text-transform: uppercase; white-space: nowrap;
}
.section-line {
  flex: 1; height: 1px;
  background: linear-gradient(to right, var(--border-bright), transparent);
}

/* ═══════ HEADER ═══════ */
#hero {
  padding-top: 40px; margin-bottom: 72px;
  border-bottom: 1px solid var(--green-dim);
  padding-bottom: 36px;
}
.hero-comment {
  font-size: 11px; color: var(--green); letter-spacing: 4px;
  margin-bottom: 10px; opacity: 0;
  animation: typeIn .8s ease .3s forwards;
}
.hero-name {
  font-family: var(--sans); font-size: clamp(28px, 8vw, 56px);
  font-weight: 400; line-height: 1.05; margin-bottom: 4px;
  color: #eeedf6;
}
.hero-name em {
  font-style: italic; color: var(--green);
  text-shadow: 0 0 40px var(--green-glow);
  position: relative;
}
.hero-name em::after {
  content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
  height: 2px; background: var(--green);
  box-shadow: 0 0 8px var(--green-glow);
  transform: scaleX(0); transform-origin: left;
  animation: lineGrow 1s ease 1.2s forwards;
}
.hero-cursor {
  display: inline-block; width: 3px; height: .8em;
  background: var(--green); margin-left: 4px;
  animation: blink 1s steps(1) infinite;
  vertical-align: baseline; position: relative; top: .05em;
}
.hero-tags {
  display: flex; gap: 6px; margin-top: 14px; flex-wrap: wrap;
  opacity: 0; animation: fadeUp .5s ease 1s forwards;
}
.hero-tag {
  font-size: 10px; padding: 5px 12px;
  border: 1px solid var(--green-dim); color: var(--green);
  letter-spacing: 2px; transition: all .3s ease;
}
.hero-tag:nth-child(3) { border-color: var(--red-dim); color: var(--red); }
.hero-tag:nth-child(3):hover {
  background: var(--red-faint); border-color: var(--red);
  box-shadow: 0 0 12px var(--red-faint);
}
.hero-tag:hover {
  background: var(--green-faint); border-color: var(--green);
  box-shadow: 0 0 12px var(--green-faint);
}
.hero-contact {
  margin-top: 20px; font-size: 12px; line-height: 2.2;
  color: var(--text-dim);
  opacity: 0; animation: fadeUp .5s ease 1.2s forwards;
}
.hero-contact .hl { color: var(--green); }

/* ═══════ EXPERIENCE CARDS ═══════ */
.exp-item {
  display: grid; grid-template-columns: 140px 1fr; gap: 20px;
  margin-bottom: 28px; padding-bottom: 28px;
  border-bottom: 1px solid var(--border);
  transition: all .3s ease;
}
.exp-item:last-child { border-bottom: none; margin-bottom: 0; }
.exp-item:hover { padding-left: 4px; }
.exp-item:hover .exp-role { color: #f4f3ff; }
.exp-meta { font-size: 11px; color: var(--text-dim); line-height: 1.8; }
.exp-company { font-size: 11px; color: var(--text-dim); margin-top: 4px; }
.exp-location { font-size: 10px; color: #807e92; margin-top: 2px; }
.exp-role {
  font-family: var(--sans); font-size: 15px; font-weight: 600;
  color: var(--text); transition: color .3s ease;
  line-height: 1.3;
}
.exp-bullets { margin-top: 10px; }
.exp-bullet {
  font-size: 12px; color: var(--text-dim); margin-top: 6px;
  padding-left: 18px; position: relative; line-height: 1.7;
}
.exp-bullet::before {
  content: '\\2192'; position: absolute; left: 0;
  color: var(--green); font-size: 12px;
}

/* ═══════ PROJECT CARDS ═══════ */
.proj-item {
  margin-bottom: 20px; padding: 20px; padding-bottom: 22px;
  border: 1px solid var(--border); background: var(--bg-card);
  transition: all .35s ease; position: relative; overflow: hidden;
}
.proj-item::before {
  content: ''; position: absolute; top: 0; left: 0;
  width: 0; height: 2px; background: var(--green);
  transition: width .4s ease;
}
.proj-item:hover::before { width: 100%; }
.proj-item:hover {
  border-color: var(--border-bright); background: var(--bg-card-hover);
  transform: translateX(4px);
  box-shadow: -4px 0 0 var(--green), 0 0 20px var(--green-faint);
}
.proj-name {
  font-family: var(--sans); font-size: 14px; font-weight: 600;
  color: var(--text);
}
.proj-org { font-size: 11px; color: #807e92; margin-left: 6px; }
.proj-desc {
  font-size: 12px; color: var(--text-dim); margin-top: 8px; line-height: 1.7;
}
.proj-bullets { margin-top: 10px; }
.proj-bullet {
  font-size: 12px; color: var(--text-dim); margin-top: 5px;
  padding-left: 16px; position: relative; line-height: 1.7;
}
.proj-bullet::before {
  content: '\\2192'; position: absolute; left: 0;
  color: var(--green); font-size: 12px;
}
.proj-tags { display: flex; gap: 6px; margin-top: 14px; flex-wrap: wrap; }
.proj-tag {
  font-size: 9px; padding: 4px 10px;
  background: var(--green-faint); border: 1px solid var(--border-bright);
  color: var(--green); letter-spacing: 1px;
  transition: all .25s ease;
}
.proj-tag:hover {
  background: var(--green-dim); border-color: var(--green);
  box-shadow: 0 0 8px var(--green-faint);
}

/* ═══════ BOTTOM GRID ═══════ */
.bottom-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 32px;
}

/* ═══════ EDUCATION ═══════ */
.edu-item { margin-bottom: 14px; }
.edu-degree {
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  color: var(--text);
}
.edu-ongoing {
  font-size: 9px; color: var(--red); letter-spacing: 2px;
  margin-left: 6px; font-weight: 700;
  text-shadow: 0 0 8px var(--red-glow);
}
.edu-school { font-size: 11px; color: var(--text-dim); margin-top: 3px; }

/* ═══════ INTERESTS ═══════ */
.interest-grid { display: flex; gap: 8px; flex-wrap: wrap; }
.interest-tag {
  font-size: 11px; padding: 6px 14px;
  border: 1px solid var(--border-bright);
  color: var(--text-dim); transition: all .3s ease;
}
.interest-tag:nth-child(odd) {
  border-color: var(--green-dim); color: var(--green);
}
.interest-tag:nth-child(4),
.interest-tag:nth-child(6) {
  border-color: var(--red-dim); color: var(--red);
}
.interest-tag:hover {
  border-color: var(--green); color: var(--green);
  background: var(--green-faint);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--green-faint);
}
.interest-tag:nth-child(4):hover,
.interest-tag:nth-child(6):hover {
  border-color: var(--red); color: var(--red);
  background: var(--red-faint);
  box-shadow: 0 4px 12px var(--red-faint);
}

/* ═══════ TRAINING ═══════ */
.training-group { margin-bottom: 22px; }
.training-provider {
  font-size: 11px; font-weight: 600; color: var(--green);
  letter-spacing: 2px; margin-bottom: 10px;
  padding-bottom: 6px; border-bottom: 1px solid var(--border);
}
.training-list { display: flex; flex-wrap: wrap; gap: 6px; }
.training-item {
  font-size: 10px; padding: 5px 12px;
  border: 1px solid var(--border); background: var(--bg-card);
  color: var(--text-dim); transition: all .25s ease;
  line-height: 1.5;
}
.training-item:hover {
  border-color: var(--green-dim); color: var(--green);
  background: var(--green-faint);
}
.training-item:nth-child(3n):hover {
  border-color: var(--red-dim); color: var(--red);
  background: var(--red-faint);
}

/* ═══════ REFERENCES ═══════ */
.ref-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
}
.ref-card {
  padding: 18px; border: 1px solid var(--border);
  background: var(--bg-card); transition: all .3s ease;
}
.ref-card:hover {
  border-color: var(--red-dim); background: var(--bg-card-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,.3), 0 0 12px var(--red-faint);
}
.ref-name {
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  color: var(--text);
}
.ref-role { font-size: 10px; color: var(--text-dim); margin-top: 4px; line-height: 1.5; }
.ref-loc { font-size: 10px; color: #807e92; margin-top: 2px; }
.ref-email {
  font-size: 10px; color: var(--green); margin-top: 10px;
  word-break: break-all;
}

/* ═══════ FOOTER ═══════ */
footer {
  text-align: center; padding: 40px 0 56px;
  font-size: 10px; color: var(--text-faint); letter-spacing: 2px;
}
footer .blink {
  display: inline-block;
  animation: blink 1s steps(1) infinite;
}

/* ═══════ GLITCH EFFECT ═══════ */
.glitch {
  position: relative;
  animation: glitchShift 8s ease infinite;
}
.glitch::before, .glitch::after {
  content: attr(data-text);
  position: absolute; top: 0; left: 0; right: 0;
  overflow: hidden; clip-path: inset(0); opacity: 0;
}
.glitch::before {
  color: var(--cyan);
  animation: glitchTop 3s ease-in-out infinite;
}
.glitch::after {
  color: var(--red);
  animation: glitchBottom 3s ease-in-out infinite;
}

/* ═══════ ANIMATIONS ═══════ */
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes typeIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes lineGrow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@keyframes glitchShift {
  0%, 92%, 100% { transform: translateX(0); }
  93% { transform: translateX(-2px); }
  94% { transform: translateX(2px); }
  95% { transform: translateX(-1px); }
  96% { transform: translateX(0); }
}
@keyframes glitchTop {
  0%, 89%, 100% { clip-path: inset(0 0 100% 0); opacity: 0; }
  90% { clip-path: inset(10% 0 60% 0); opacity: .8; transform: translateX(-3px); }
  91% { clip-path: inset(40% 0 20% 0); opacity: .8; transform: translateX(3px); }
  92% { clip-path: inset(0 0 100% 0); opacity: 0; transform: translateX(0); }
}
@keyframes glitchBottom {
  0%, 91%, 100% { clip-path: inset(100% 0 0 0); opacity: 0; }
  92% { clip-path: inset(60% 0 10% 0); opacity: .6; transform: translateX(2px); }
  93% { clip-path: inset(20% 0 40% 0); opacity: .6; transform: translateX(-2px); }
  94% { clip-path: inset(100% 0 0 0); opacity: 0; transform: translateX(0); }
}
@keyframes stagger { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

/* ═══════ RESPONSIVE ═══════ */

/* Tablet landscape / small desktop */
@media (max-width: 860px) {
  .ref-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
}

/* Tablet / large mobile */
@media (max-width: 768px) {
  main { padding: 56px 20px 64px; }
  section { margin-bottom: 56px; }
  #hero { margin-bottom: 60px; }
  .bottom-grid { grid-template-columns: 1fr; gap: 40px; }
  .ref-grid { grid-template-columns: 1fr; }
  .exp-item { grid-template-columns: 1fr; gap: 6px; }
  .exp-meta {
    display: flex; gap: 10px; align-items: baseline; flex-wrap: wrap;
    padding-bottom: 4px; border-bottom: 1px solid var(--border);
    margin-bottom: 4px;
  }
  nav { padding: 0 14px; gap: 2px; }
  .nav-link { padding: 8px 10px; font-size: 10px; }
}

/* Mobile */
@media (max-width: 540px) {
  main { padding: 52px 16px 56px; }
  section { margin-bottom: 48px; }
  #hero { padding-top: 32px; margin-bottom: 48px; padding-bottom: 28px; }
  .hero-comment { font-size: 10px; letter-spacing: 3px; }
  .hero-tags { gap: 5px; margin-top: 12px; }
  .hero-tag { font-size: 9px; padding: 5px 10px; letter-spacing: 1px; }
  .hero-contact { font-size: 11px; line-height: 2; }
  .section-head { margin-bottom: 22px; }
  .section-title { font-size: 10px; letter-spacing: 3px; }
  .exp-item { margin-bottom: 24px; padding-bottom: 24px; }
  .exp-role { font-size: 14px; }
  .exp-bullet { font-size: 11px; margin-top: 5px; }
  .exp-bullet::before { font-size: 11px; }
  .proj-item { padding: 16px; margin-bottom: 16px; }
  .proj-name { font-size: 13px; }
  .proj-bullet { font-size: 11px; }
  .proj-bullet::before { font-size: 11px; }
  .proj-tag { font-size: 9px; padding: 4px 9px; }
  .training-item { font-size: 10px; padding: 5px 10px; }
  .training-list { gap: 5px; }
  .ref-card { padding: 16px; }
  nav { padding: 0 10px; height: 42px; }
  .nav-label { font-size: 9px; margin-right: 4px; letter-spacing: 2px; }
  .nav-link { padding: 7px 8px; font-size: 9px; letter-spacing: 0; }
}

/* Small mobile */
@media (max-width: 380px) {
  main { padding: 48px 14px 48px; }
  .hero-tag { font-size: 8px; padding: 4px 8px; }
  .hero-contact { font-size: 10px; }
  .exp-role { font-size: 13px; }
  .exp-meta { font-size: 10px; }
  .exp-bullet { font-size: 11px; line-height: 1.6; }
  .proj-item { padding: 14px; }
  .proj-name { font-size: 12px; }
  .proj-bullet { font-size: 10px; }
  .training-item { font-size: 9px; padding: 4px 8px; }
  .interest-tag { font-size: 10px; padding: 5px 10px; }
  .edu-degree { font-size: 12px; }
  .ref-name { font-size: 12px; }
  .ref-role { font-size: 9px; }
  .ref-email { font-size: 9px; }
  nav { height: 40px; }
  .nav-link { padding: 6px 6px; font-size: 8px; }
  .nav-label { display: none; }
}

/* ═══════ PRINT STYLES ═══════ */
@media print {
  :root {
    --bg: #fff; --bg-card: #fff; --bg-card-hover: #fff;
    --green: #1a8a5a; --green-dim: #ddd; --green-glow: transparent; --green-faint: #f5f5f5;
    --cyan: #1a8a5a; --red: #c44; --red-dim: #fdd; --red-glow: transparent; --red-faint: #fff5f5; --amber: #c44;
    --text: #1a1a1a; --text-dim: #555; --text-faint: #999;
    --border: #ddd; --border-bright: #ccc;
  }
  body { background: #fff; color: #1a1a1a; }
  #matrix-bg, .scanlines, .noise, #progress, nav { display: none !important; }
  main { padding: 0; max-width: 100%; }
  #hero { padding-top: 0; }
  .hero-comment, .hero-tags, .hero-name, .hero-contact,
  .reveal { opacity: 1 !important; transform: none !important; animation: none !important; }
  .hero-name em { text-shadow: none; }
  .hero-name em::after { display: none; }
  .hero-cursor { display: none; }
  .glitch::before, .glitch::after { display: none; }
  .proj-item, .ref-card, .training-item { border: 1px solid #ddd; }
  a { color: #1a8a5a; }
  section { break-inside: avoid; }
  .exp-item { break-inside: avoid; }
}
</style>
</head>
<body>

<!-- Background layers -->
<canvas id="matrix-bg" aria-hidden="true"></canvas>
<div class="scanlines" aria-hidden="true"></div>
<div class="noise" aria-hidden="true"></div>
<div id="progress" aria-hidden="true"></div>

<!-- Navigation -->
<nav id="navbar" role="navigation" aria-label="Section navigation">
  <span class="nav-label">CV //</span>
  <a href="#hero" class="nav-link active">INIT</a>
  <a href="#experience" class="nav-link">WORK</a>
  <a href="#other-experience" class="nav-link">OTHER</a>
  <a href="#projects" class="nav-link">PROJECTS</a>
  <a href="#education" class="nav-link">EDU</a>
  <a href="#training" class="nav-link">TRAINING</a>
  <a href="#interests" class="nav-link">INTERESTS</a>
  <a href="#references" class="nav-link">REFS</a>
</nav>

<main>
  <!-- ═══════ HERO ═══════ -->
  <header id="hero" class="reveal visible">
    <div class="hero-comment">// CURRICULUM VITAE</div>
    <h1 class="hero-name glitch" data-text="${h.escapeHtml(p.firstName)} ${h.escapeHtml(p.lastName)}">
      ${h.escapeHtml(p.firstName)} <em>${h.escapeHtml(p.lastName)}</em><span class="hero-cursor"></span>
    </h1>
    <div class="hero-tags">
      <span class="hero-tag">SENIOR_SOFTWARE_ENG</span>
      <span class="hero-tag">SECURITY_ENG</span>
      <span class="hero-tag">AI_&amp;_AUTOMATION</span>
    </div>
    <div class="hero-contact">
      <span class="hl">${h.escapeHtml(p.email)}</span><br>
      ${h.escapeHtml(p.phone)}<br>
      <a href="${h.escapeHtml(p.github.url)}" class="hl" target="_blank" rel="noopener">${h.escapeHtml(p.github.display)}</a><br>
      <a href="${h.escapeHtml(p.linkedin.url)}" class="hl" target="_blank" rel="noopener">${h.escapeHtml(p.linkedin.display)}</a>
    </div>
  </header>

  <!-- ═══════ WORK EXPERIENCE ═══════ -->
  <section id="experience" class="reveal">
    <div class="section-head">
      <div class="section-marker"></div>
      <span class="section-title">WORK_EXPERIENCE</span>
      <div class="section-line"></div>
    </div>

${data.experience.map((exp, idx) => `    <div class="exp-item">
      <div class="exp-meta">
        <div>${h.formatDates(exp.dates)}</div>
        <div class="exp-company">${h.escapeHtml(exp.company)}</div>${exp.location ? `
        <div class="exp-location">${h.escapeHtml(exp.location)}</div>` : ''}
      </div>
      <div>
        <div class="exp-role">${h.formatRole(exp.role)}</div>
        <div class="exp-bullets">
${exp.bullets.map(bullet => `          <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
        </div>
      </div>
    </div>`).join('\n\n')}
  </section>

  <!-- ═══════ OTHER WORK EXPERIENCE ═══════ -->
  <section id="other-experience" class="reveal">
    <div class="section-head">
      <div class="section-marker dim"></div>
      <span class="section-title">OTHER_EXPERIENCE</span>
      <div class="section-line"></div>
    </div>

${data.otherExperience.map((exp, idx) => `    <div class="exp-item">
      <div class="exp-meta">
        <div>${h.formatDates(exp.dates)}</div>
        <div class="exp-company">${h.escapeHtml(exp.company)}</div>
      </div>
      <div>
        <div class="exp-role">${h.escapeHtml(exp.role)}</div>
        <div class="exp-bullets">
${exp.bullets.map(bullet => `          <div class="exp-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
        </div>
      </div>
    </div>`).join('\n\n')}

  </section>

  <!-- ═══════ PROJECTS ═══════ -->
  <section id="projects" class="reveal">
    <div class="section-head">
      <div class="section-marker"></div>
      <span class="section-title">KEY_PROJECTS</span>
      <div class="section-line"></div>
    </div>

${data.projects.map(proj => {
  const allBullets = proj.indexBulletOrder || [...proj.bullets, ...(proj.extendedBullets || [])];
  return `    <div class="proj-item">
      <span class="proj-name">${h.escapeHtml(proj.name)}</span>
      <span class="proj-org">&mdash; ${h.escapeHtml(proj.org)}</span>
      <div class="proj-bullets">
${allBullets.map(bullet => `        <div class="proj-bullet">${h.escapeHtml(bullet)}</div>`).join('\n')}
      </div>
      <div class="proj-tags">
${proj.tags.map(tag => `        <span class="proj-tag">${h.escapeHtml(tag)}</span>`).join('\n')}
      </div>
    </div>`;
}).join('\n\n')}
  </section>

  <!-- ═══════ EDUCATION & INTERESTS ═══════ -->
  <div class="bottom-grid">
    <section id="education" class="reveal">
      <div class="section-head">
        <div class="section-marker"></div>
        <span class="section-title">EDUCATION</span>
        <div class="section-line"></div>
      </div>
${data.education.map(edu => `      <div class="edu-item">
        <div class="edu-degree">${h.escapeHtml(edu.degree)}${edu.ongoing ? ' <span class="edu-ongoing">ONGOING</span>' : ''}</div>
        <div class="edu-school">${h.escapeHtml(edu.school)}${edu.year ? ' &middot; ' + h.escapeHtml(edu.year) : ''}</div>
      </div>`).join('\n')}
    </section>

    <section id="interests" class="reveal">
      <div class="section-head">
        <div class="section-marker"></div>
        <span class="section-title">INTERESTS</span>
        <div class="section-line"></div>
      </div>
      <div class="interest-grid">
${data.interests.map(interest => `        <span class="interest-tag">${h.escapeHtml(interest.name)}</span>`).join('\n')}
      </div>
    </section>
  </div>

  <!-- ═══════ PROFESSIONAL TRAINING ═══════ -->
  <section id="training" class="reveal">
    <div class="section-head">
      <div class="section-marker"></div>
      <span class="section-title">PROFESSIONAL_TRAINING</span>
      <div class="section-line"></div>
    </div>

${data.training.map(group => {
  const providerDisplay = group.provider.toUpperCase() === 'LINKEDIN LEARNING'
    ? 'LYNDA.COM / LINKEDIN LEARNING'
    : group.provider.toUpperCase();
  return `    <div class="training-group">
      <div class="training-provider">${providerDisplay}</div>
      <div class="training-list">
${group.courses.map(course => `        <span class="training-item">${h.formatCourse(course)}</span>`).join('\n')}
      </div>
    </div>`;
}).join('\n\n')}
  </section>

  <!-- ═══════ REFERENCES ═══════ -->
  <section id="references" class="reveal">
    <div class="section-head">
      <div class="section-marker"></div>
      <span class="section-title">REFERENCES</span>
      <div class="section-line"></div>
    </div>
    <div class="ref-grid">
${data.references.map(ref => `      <div class="ref-card">
        <div class="ref-name">${h.escapeHtml(ref.name)}</div>
        <div class="ref-role">${h.escapeHtml(ref.role)} &middot; ${h.escapeHtml(ref.company)}</div>
        <div class="ref-loc">${h.escapeHtml(ref.location)}</div>
        ${ref.email ? `<div class="ref-email">${h.escapeHtml(ref.email)}</div>` : ""}${ref.phone ? `<div class="ref-email">${h.escapeHtml(ref.phone)}</div>` : ""}
      </div>`).join('\n')}
    </div>
  </section>

  <!-- ═══════ FOOTER ═══════ -->
  <footer>
    <div>// END_OF_FILE <span class="blink">_</span></div>
  </footer>
</main>

<script>
/* ═══════ MATRIX RAIN ═══════ */
(function() {
  const canvas = document.getElementById('matrix-bg');
  const ctx = canvas.getContext('2d');
  let cols, drops;
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01'.split('');
  const fontSize = 14;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * -100 | 0);
  }

  function draw() {
    ctx.fillStyle = 'rgba(6,6,8,.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,255,136,.12)';
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < cols; i++) {
      const ch = chars[Math.random() * chars.length | 0];
      ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > .975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
})();

/* ═══════ SCROLL PROGRESS ═══════ */
const progress = document.getElementById('progress');
window.addEventListener('scroll', function() {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
}, { passive: true });

/* ═══════ NAV ACTIVE STATE ═══════ */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section, #hero');
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;

  // Hide/show nav
  if (scrollY > lastScroll && scrollY > 100) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  lastScroll = scrollY;

  // Active section
  let current = '';
  sections.forEach(function(sec) {
    if (scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(function(link) {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ═══════ SECTION REVEAL ON SCROLL ═══════ */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Stagger children
      const items = entry.target.querySelectorAll('.exp-item, .proj-item, .ref-card, .edu-item, .interest-tag, .training-group');
      items.forEach(function(item, i) {
        item.style.animation = 'stagger .5s ease ' + (i * .07) + 's both';
      });
    }
  });
}, { threshold: .1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(function(el) { revealObserver.observe(el); });

/* ═══════ SMOOTH SCROLL NAV CLICKS ═══════ */
navLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
</script>

</body>
</html>
`;
}

module.exports = { render };
