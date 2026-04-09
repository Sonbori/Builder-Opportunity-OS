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

const ROOT = dirname(fileURLToPath(import.meta.url));
const APPS_FILE = existsSync(join(ROOT, 'data/applications.md'))
  ? join(ROOT, 'data/applications.md')
  : join(ROOT, 'applications.md');
const ADDITIONS_DIR = join(ROOT, 'batch/tracker-additions');
const MERGED_DIR = join(ADDITIONS_DIR, 'merged');
const DRY_RUN = process.argv.includes('--dry-run');

const STATUS_MAP = {
  reviewed: 'Evaluated',
  scored: 'Evaluated',
  evaluated: 'Evaluated',
  contacted: 'Pursuing',
  responded: 'Pursuing',
  followup: 'Pursuing',
  pursuing: 'Pursuing',
  proposal_sent: 'Proposed',
  quoted: 'Proposed',
  scope_sent: 'Proposed',
  proposed: 'Proposed',
  submitted: 'Applied',
  sent: 'Applied',
  applied: 'Applied',
  interview: 'Interviewing',
  interviewing: 'Interviewing',
  offer: 'Won',
  accepted: 'Won',
  won: 'Won',
  hold: 'Parked',
  later: 'Parked',
  backlog: 'Parked',
  discarded: 'Parked',
  parked: 'Parked',
  lost: 'Rejected',
  declined: 'Rejected',
  rejected: 'Rejected',
  skip: 'SKIP',
  no_fit: 'SKIP',
  no_apply: 'SKIP',
};

function normalizeStatus(raw) {
  const key = raw.replace(/\*\*/g, '').trim().toLowerCase();
  return STATUS_MAP[key] || 'Evaluated';
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
for (const line of appLines) {
  if (!line.startsWith('|')) continue;
  const parts = line.split('|').map((s) => s.trim());
  const num = Number.parseInt(parts[1], 10);
  if (!Number.isNaN(num)) {
    maxNum = Math.max(maxNum, num);
  }
}

const additions = [];
for (const file of files.sort()) {
  const content = readFileSync(join(ADDITIONS_DIR, file), 'utf-8').trim();
  if (!content) continue;
  const parts = content.split('\t');
  if (parts.length < 8) continue;
  additions.push({
    num: Number.parseInt(parts[0], 10) || ++maxNum,
    date: parts[1],
    company: parts[2],
    role: parts[3],
    status: normalizeStatus(parts[4]),
    score: parts[5],
    pdf: parts[6],
    report: parts[7],
    notes: parts[8] || '',
    file,
  });
}

const insertAt = appLines.findIndex((line) => line.startsWith('|---'));
if (insertAt === -1) {
  console.error('Could not find table header in applications.md');
  process.exit(1);
}

const newLines = additions.map((item) =>
  `| ${item.num} | ${item.date} | ${item.company} | ${item.role} | ${item.score} | ${item.status} | ${item.pdf} | ${item.report} | ${item.notes} |`,
);

if (!DRY_RUN) {
  appLines.splice(insertAt + 1, 0, ...newLines);
  writeFileSync(APPS_FILE, appLines.join('\n'));
  mkdirSync(MERGED_DIR, { recursive: true });
  for (const item of additions) {
    renameSync(join(ADDITIONS_DIR, item.file), join(MERGED_DIR, item.file));
  }
}

console.log(`Merged ${additions.length} tracker addition(s)${DRY_RUN ? ' (dry-run)' : ''}`);
