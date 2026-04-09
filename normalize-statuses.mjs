#!/usr/bin/env node
/**
 * normalize-statuses.mjs
 *
 * Normalize tracker statuses to the Builder Opportunity OS canonical set.
 */

import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const APPS_FILE = existsSync(join(ROOT, 'data/applications.md'))
  ? join(ROOT, 'data/applications.md')
  : join(ROOT, 'applications.md');
const DRY_RUN = process.argv.includes('--dry-run');

const MAP = {
  evaluated: 'Evaluated',
  reviewed: 'Evaluated',
  scored: 'Evaluated',
  pursuing: 'Pursuing',
  contacted: 'Pursuing',
  responded: 'Pursuing',
  followup: 'Pursuing',
  proposed: 'Proposed',
  proposal_sent: 'Proposed',
  quoted: 'Proposed',
  scope_sent: 'Proposed',
  applied: 'Applied',
  submitted: 'Applied',
  sent: 'Applied',
  interviewing: 'Interviewing',
  interview: 'Interviewing',
  won: 'Won',
  offer: 'Won',
  accepted: 'Won',
  closed_won: 'Won',
  parked: 'Parked',
  hold: 'Parked',
  later: 'Parked',
  backlog: 'Parked',
  discarded: 'Parked',
  rejected: 'Rejected',
  lost: 'Rejected',
  declined: 'Rejected',
  skip: 'SKIP',
  no_fit: 'SKIP',
  no_apply: 'SKIP',
};

if (!existsSync(APPS_FILE)) {
  console.log('No applications.md found. Nothing to normalize.');
  process.exit(0);
}

const lines = readFileSync(APPS_FILE, 'utf-8').split('\n');
let changes = 0;

for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i];
  if (!line.startsWith('|')) continue;
  const parts = line.split('|').map((s) => s.trim());
  if (parts.length < 9) continue;
  const num = Number.parseInt(parts[1], 10);
  if (Number.isNaN(num)) continue;

  const raw = parts[6].replace(/\*\*/g, '').trim();
  const key = raw.toLowerCase();
  const normalized = MAP[key];
  if (!normalized || normalized === raw) continue;

  parts[6] = normalized;
  lines[i] = `| ${parts.slice(1, -1).join(' | ')} |`;
  console.log(`#${num}: ${raw} -> ${normalized}`);
  changes += 1;
}

if (!DRY_RUN && changes > 0) {
  copyFileSync(APPS_FILE, `${APPS_FILE}.bak`);
  writeFileSync(APPS_FILE, lines.join('\n'));
}

console.log(`${changes} status value(s) normalized${DRY_RUN ? ' (dry-run)' : ''}`);
