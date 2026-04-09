#!/usr/bin/env node
/**
 * normalize-statuses.mjs
 *
 * Normalize tracker statuses to the Builder Opportunity OS canonical set.
 */

import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { normalizeStatus } from './tracker-status-lib.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const APPS_FILE = existsSync(join(ROOT, 'data/applications.md'))
  ? join(ROOT, 'data/applications.md')
  : join(ROOT, 'applications.md');
const DRY_RUN = process.argv.includes('--dry-run');

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
  const normalized = normalizeStatus(raw);
  if (normalized === raw) continue;

  parts[6] = normalized;
  parts[5] = parts[5].replace(/\*\*/g, '').trim();
  lines[i] = `| ${parts.slice(1, -1).join(' | ')} |`;
  console.log(`#${num}: ${raw} -> ${normalized}`);
  changes += 1;
}

if (!DRY_RUN && changes > 0) {
  copyFileSync(APPS_FILE, `${APPS_FILE}.bak`);
  writeFileSync(APPS_FILE, lines.join('\n'));
}

console.log(`${changes} status value(s) normalized${DRY_RUN ? ' (dry-run)' : ''}`);
