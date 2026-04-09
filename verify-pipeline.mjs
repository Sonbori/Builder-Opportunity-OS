#!/usr/bin/env node
/**
 * verify-pipeline.mjs
 *
 * Health check for the Builder Opportunity OS tracker.
 */

import { existsSync, readFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const APPS_FILE = existsSync(join(ROOT, 'data/applications.md'))
  ? join(ROOT, 'data/applications.md')
  : join(ROOT, 'applications.md');
const ADDITIONS_DIR = join(ROOT, 'batch/tracker-additions');

const CANONICAL_STATUSES = [
  'evaluated',
  'pursuing',
  'proposed',
  'applied',
  'interviewing',
  'won',
  'parked',
  'rejected',
  'skip',
];

const ALIASES = {
  reviewed: 'evaluated',
  scored: 'evaluated',
  contacted: 'pursuing',
  responded: 'pursuing',
  followup: 'pursuing',
  proposal_sent: 'proposed',
  quoted: 'proposed',
  scope_sent: 'proposed',
  submitted: 'applied',
  sent: 'applied',
  interview: 'interviewing',
  offer: 'won',
  accepted: 'won',
  closed_won: 'won',
  hold: 'parked',
  later: 'parked',
  backlog: 'parked',
  discarded: 'parked',
  lost: 'rejected',
  declined: 'rejected',
  no_fit: 'skip',
  no_apply: 'skip',
};

let errors = 0;
let warnings = 0;

function error(msg) {
  console.log(`ERROR ${msg}`);
  errors += 1;
}

function warn(msg) {
  console.log(`WARN  ${msg}`);
  warnings += 1;
}

function ok(msg) {
  console.log(`OK    ${msg}`);
}

if (!existsSync(APPS_FILE)) {
  console.log('No applications.md found yet. This is normal for a fresh setup.');
  process.exit(0);
}

const content = readFileSync(APPS_FILE, 'utf-8');
const lines = content.split('\n');
const entries = [];

for (const line of lines) {
  if (!line.startsWith('|')) continue;
  const parts = line.split('|').map((s) => s.trim());
  if (parts.length < 9) continue;
  const num = Number.parseInt(parts[1], 10);
  if (Number.isNaN(num)) continue;
  entries.push({
    num,
    date: parts[2],
    company: parts[3],
    role: parts[4],
    score: parts[5],
    status: parts[6],
    report: parts[8],
  });
}

for (const entry of entries) {
  const clean = entry.status.replace(/\*\*/g, '').trim().toLowerCase();
  if (!CANONICAL_STATUSES.includes(clean) && !ALIASES[clean]) {
    error(`#${entry.num}: non-canonical status "${entry.status}"`);
  }
  if (entry.status.includes('**')) {
    error(`#${entry.num}: status contains markdown formatting`);
  }
  if (!/^\d+\.?\d*\/5$/.test(entry.score) && entry.score !== 'N/A' && entry.score !== 'DUP') {
    error(`#${entry.num}: invalid score format "${entry.score}"`);
  }
}

const dedup = new Map();
for (const entry of entries) {
  const key = `${entry.company.toLowerCase()}::${entry.role.toLowerCase()}`;
  const existing = dedup.get(key) || [];
  existing.push(entry.num);
  dedup.set(key, existing);
}

for (const [key, nums] of dedup) {
  if (nums.length > 1) {
    warn(`possible duplicate ${key} -> ${nums.join(', ')}`);
  }
}

for (const entry of entries) {
  const match = entry.report.match(/\]\(([^)]+)\)/);
  if (!match) continue;
  const reportPath = join(ROOT, match[1]);
  if (!existsSync(reportPath)) {
    error(`#${entry.num}: missing report ${match[1]}`);
  }
}

if (existsSync(ADDITIONS_DIR)) {
  const tsvs = readdirSync(ADDITIONS_DIR).filter((file) => file.endsWith('.tsv'));
  if (tsvs.length > 0) {
    warn(`${tsvs.length} pending tracker TSV files still need merging`);
  } else {
    ok('No pending tracker TSV files');
  }
}

if (errors === 0) {
  ok(`Tracker check passed with ${warnings} warning(s)`);
} else {
  console.log(`FAILED with ${errors} error(s) and ${warnings} warning(s)`);
}

process.exit(errors > 0 ? 1 : 0);
