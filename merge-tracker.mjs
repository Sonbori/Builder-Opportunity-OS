#!/usr/bin/env node
/**
 * merge-tracker.mjs
 *
 * Merge tracker TSV additions into the canonical applications table.
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  writeFileSync,
} from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  isValidScore,
  normalizeStatus,
  normalizeTrackerKey,
  parseScoreValue,
  pickStrongerStatus,
} from './tracker-status-lib.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const APPS_FILE = existsSync(join(ROOT, 'data/applications.md'))
  ? join(ROOT, 'data/applications.md')
  : join(ROOT, 'applications.md');
const ADDITIONS_DIR = join(ROOT, 'batch/tracker-additions');
const MERGED_DIR = join(ADDITIONS_DIR, 'merged');
const DRY_RUN = process.argv.includes('--dry-run');

function lineMatchesRow(line, row) {
  if (!line.startsWith('|')) return false;
  const parts = line.split('|').map((s) => s.trim());
  const num = Number.parseInt(parts[1], 10);
  const company = parts[3];
  const role = parts[4];
  const report = parts[8];

  return (
    num === row.num ||
    report === row.report ||
    `${normalizeTrackerKey(company)}::${normalizeTrackerKey(role)}` === row.key
  );
}

if (!existsSync(APPS_FILE)) {
  console.log('No applications.md found. Nothing to merge into.');
  process.exit(0);
}

if (!existsSync(ADDITIONS_DIR)) {
  console.log('No tracker-additions directory found.');
  process.exit(0);
}

const appLines = readFileSync(APPS_FILE, 'utf-8').split('\n');
const files = readdirSync(ADDITIONS_DIR).filter((file) => file.endsWith('.tsv'));

if (files.length === 0) {
  console.log('No pending tracker additions.');
  process.exit(0);
}

let maxNum = 0;
const existingRows = [];
for (const line of appLines) {
  if (!line.startsWith('|')) continue;
  const parts = line.split('|').map((s) => s.trim());
  const num = Number.parseInt(parts[1], 10);
  if (!Number.isNaN(num)) {
    maxNum = Math.max(maxNum, num);
    existingRows.push({
      num,
      date: parts[2],
      company: parts[3],
      role: parts[4],
      score: parts[5],
      status: parts[6],
      pdf: parts[7],
      report: parts[8],
      notes: parts[9] || '',
      key: `${normalizeTrackerKey(parts[3])}::${normalizeTrackerKey(parts[4])}`,
    });
  }
}

const additions = [];
for (const file of files.sort()) {
  const content = readFileSync(join(ADDITIONS_DIR, file), 'utf-8').trim();
  if (!content) continue;
  const parts = content.startsWith('|')
    ? content.split('|').map((part) => part.trim()).filter(Boolean)
    : content.split('\t').map((part) => part.trim());
  if (parts.length < 8) continue;

  const item = {
    num: Number.parseInt(parts[0], 10) || ++maxNum,
    date: parts[1],
    company: parts[2],
    role: parts[3],
    status: normalizeStatus(parts[4]),
    score: isValidScore(parts[5]) ? parts[5] : 'N/A',
    pdf: parts[6],
    report: parts[7],
    notes: parts[8] || '',
    file,
  };
  item.key = `${normalizeTrackerKey(item.company)}::${normalizeTrackerKey(item.role)}`;
  additions.push(item);
}

const insertAt = appLines.findIndex((line) => line.startsWith('|---'));
if (insertAt === -1) {
  console.error('Could not find table header in applications.md');
  process.exit(1);
}

const newLines = [];
let updated = 0;

for (const item of additions) {
  const duplicate = existingRows.find((row) =>
    row.report === item.report || row.key === item.key,
  );

  if (!duplicate) {
    newLines.push(`| ${item.num} | ${item.date} | ${item.company} | ${item.role} | ${item.score} | ${item.status} | ${item.pdf} | ${item.report} | ${item.notes} |`);
    continue;
  }

  const strongerStatus = pickStrongerStatus(duplicate.status, item.status);
  const oldScore = parseScoreValue(duplicate.score);
  const newScore = parseScoreValue(item.score);
  const strongerScore = Number.isNaN(oldScore)
    ? item.score
    : Number.isNaN(newScore)
      ? duplicate.score
      : newScore > oldScore
        ? item.score
        : duplicate.score;
  const nextNotes = [duplicate.notes, item.notes].filter(Boolean).join(' | ');

  const newLine = `| ${duplicate.num} | ${item.date || duplicate.date} | ${duplicate.company} | ${duplicate.role} | ${strongerScore} | ${strongerStatus} | ${item.pdf || duplicate.pdf} | ${duplicate.report || item.report} | ${nextNotes} |`;
  const lineIndex = appLines.findIndex((line) => lineMatchesRow(line, duplicate));
  if (lineIndex >= 0) {
    appLines[lineIndex] = newLine;
    updated += 1;
  }
}

if (!DRY_RUN) {
  appLines.splice(insertAt + 1, 0, ...newLines);
  writeFileSync(APPS_FILE, appLines.join('\n'));
  mkdirSync(MERGED_DIR, { recursive: true });
  for (const item of additions) {
    renameSync(join(ADDITIONS_DIR, item.file), join(MERGED_DIR, item.file));
  }
}

console.log(`Merged ${newLines.length} new tracker addition(s), updated ${updated} existing item(s)${DRY_RUN ? ' (dry-run)' : ''}`);
