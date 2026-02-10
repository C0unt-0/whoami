'use strict';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function ndash() { return '&ndash;'; }
function mdash() { return '&mdash;'; }
function middot() { return '&middot;'; }

/** Convert "Oct 2024 – Present" to "Oct 2024 &ndash; Present" */
function formatDates(str) {
  return escapeHtml(str).replace(/&amp;ndash;/g, '&ndash;').replace(/\u2013/g, '&ndash;').replace(/ – /g, ' &ndash; ');
}

/** Convert "Security Engineer — Freelance" to use &mdash; */
function formatRole(str) {
  return escapeHtml(str).replace(/\u2014/g, '&mdash;').replace(/ — /g, ' &mdash; ');
}

/** Render an array of strings as div bullet items */
function bulletList(items, className) {
  if (!items || !items.length) return '';
  return items.map(b => `<div class="${className}">${escapeHtml(b)}</div>`).join('\n        ');
}

/** Render tech tags as spans */
function tagList(tags, className) {
  if (!tags || !tags.length) return '';
  return tags.map(t => `<span class="${className}">${escapeHtml(t)}</span>`).join('');
}

/** Render tech tags with a specific wrapper format */
function tagListWrapped(tags, className, prefix, suffix) {
  if (!tags || !tags.length) return '';
  return tags.map(t => `<span class="${className}">${prefix || ''}${escapeHtml(t)}${suffix || ''}</span>`).join('\n      ');
}

/** Format training course name: escape HTML, then restore · → &middot; and — → &mdash; */
function formatCourse(str) {
  return escapeHtml(str)
    .replace(/\u00B7/g, '&middot;')
    .replace(/\u2014/g, '&mdash;');
}

module.exports = {
  escapeHtml,
  ndash,
  mdash,
  middot,
  formatCourse,
  formatDates,
  formatRole,
  bulletList,
  tagList,
  tagListWrapped,
};
