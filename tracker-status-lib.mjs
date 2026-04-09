export const STATE_DEFS = [
  { id: 'evaluated', label: 'Evaluated', aliases: ['reviewed', 'scored'] },
  { id: 'pursuing', label: 'Pursuing', aliases: ['contacted', 'responded', 'followup', 'in_progress'] },
  { id: 'proposed', label: 'Proposed', aliases: ['proposal_sent', 'quoted', 'scope_sent'] },
  { id: 'applied', label: 'Applied', aliases: ['submitted', 'sent'] },
  { id: 'interviewing', label: 'Interviewing', aliases: ['interview', 'interview_process'] },
  { id: 'won', label: 'Won', aliases: ['offer', 'accepted', 'closed_won'] },
  { id: 'parked', label: 'Parked', aliases: ['hold', 'later', 'backlog', 'discarded'] },
  { id: 'rejected', label: 'Rejected', aliases: ['lost', 'declined'] },
  { id: 'skip', label: 'SKIP', aliases: ['skip', 'no_fit', 'no_apply'] },
];

const LABEL_MAP = new Map();
const ID_MAP = new Map();

for (const state of STATE_DEFS) {
  LABEL_MAP.set(state.label.toLowerCase(), state.label);
  ID_MAP.set(state.id, state.label);
  for (const alias of state.aliases) {
    LABEL_MAP.set(alias.toLowerCase(), state.label);
  }
}

export const CANONICAL_STATUS_LABELS = STATE_DEFS.map((state) => state.label);
export const CANONICAL_STATUS_KEYS = STATE_DEFS.map((state) => state.id);

const STATUS_PROGRESS = new Map([
  ['Evaluated', 0],
  ['Pursuing', 1],
  ['Proposed', 2],
  ['Applied', 3],
  ['Interviewing', 4],
  ['Won', 5],
  ['Parked', -1],
  ['Rejected', -2],
  ['SKIP', -3],
]);

export function normalizeStatus(raw, fallback = 'Evaluated') {
  const clean = String(raw ?? '')
    .replace(/\*\*/g, '')
    .trim()
    .replace(/\s+\d{4}-\d{2}-\d{2}.*$/, '')
    .toLowerCase();

  if (!clean) return fallback;
  return LABEL_MAP.get(clean) || fallback;
}

export function isCanonicalStatus(raw) {
  return CANONICAL_STATUS_LABELS.includes(String(raw ?? '').trim());
}

export function statusProgressValue(raw) {
  return STATUS_PROGRESS.get(normalizeStatus(raw)) ?? -99;
}

export function pickStrongerStatus(a, b) {
  const normA = normalizeStatus(a);
  const normB = normalizeStatus(b);
  return statusProgressValue(normB) > statusProgressValue(normA) ? normB : normA;
}

export function normalizeTrackerKey(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function parseScoreValue(raw) {
  const match = String(raw ?? '').replace(/\*\*/g, '').match(/(\d+\.?\d*)\/5/);
  return match ? Number.parseFloat(match[1]) : Number.NaN;
}

export function isValidScore(raw) {
  return /^(\d+\.?\d*\/5|N\/A|DUP)$/.test(String(raw ?? '').trim());
}
