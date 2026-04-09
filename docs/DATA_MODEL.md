# Data Model

## Design Principle

The system should be centered on an `opportunity`, not on a job application.

That means:

- jobs are one subtype
- freelance briefs are one subtype
- project ideas are one subtype
- learning bets are one subtype
- collaborations are one subtype

## Core Entity

### `opportunity`

Minimum shape:

| Field | Type | Meaning |
|------|------|---------|
| `id` | string | Stable identifier |
| `date_added` | date | When the opportunity entered the system |
| `type` | enum | `full_time`, `freelance`, `side_project`, `learning`, `collaboration` |
| `source` | string | Where it came from |
| `title` | string | Role name, brief name, or project label |
| `organization` | string | Company, client, community, or self |
| `url` | string? | Source URL if available |
| `summary` | string | Short human-readable description |
| `score` | string | Final score like `4.2/5` |
| `status` | enum | Canonical lifecycle state |
| `next_action` | string | Concrete next move |
| `notes` | string | Why it matters or why it was skipped |

## Supporting Entities

### `score_breakdown`

Attached to each opportunity evaluation.

| Field | Type | Meaning |
|------|------|---------|
| `stack_fit_and_growth` | number | Fit plus upside |
| `comp_or_revenue` | number | Salary, fee, or revenue potential |
| `remote_fit` | number | Work-mode fit |
| `impact_and_signal` | number | Portfolio or career leverage |
| `speed_to_win` | number | How quickly this can convert |
| `risk` | number | Complexity, ambiguity, noise, or downside |
| `final_score` | number | Overall weighted score |

### `artifact`

Generated deliverables associated with an opportunity.

| Field | Type | Meaning |
|------|------|---------|
| `opportunity_id` | string | Parent ID |
| `artifact_type` | enum | `report`, `resume`, `proposal`, `dm`, `notes`, `plan` |
| `path` | string | File path |
| `status` | enum | `draft`, `ready`, `sent` |

### `next_action`

This can stay embedded in the tracker for now, but should eventually become
its own object when the system grows.

Possible values:

- apply
- send proposal
- follow up
- build MVP
- start timebox
- skip
- park for later

## File-Level Mapping

## Current Files

| File | Role |
|------|------|
| `data/applications.md` | Current flat tracker table |
| `data/pipeline.md` | Inbox of pending opportunity inputs |
| `reports/` | Evaluation reports |
| `output/` | Generated PDFs and other artifacts |
| `cv.md` | Resume source |
| `article-digest.md` | Proof source |
| `config/profile.yml` | User identity and priorities |
| `modes/_profile.md` | User framing rules |

## Proposed Evolution

### Stage 1: Keep markdown table, expand semantics

Keep `data/applications.md`, but interpret it as an opportunity tracker:

| Column | Meaning |
|--------|---------|
| `#` | human-readable sequence |
| `Date` | date added or last major action |
| `Company` | org, client, or context owner |
| `Role` | title or opportunity label |
| `Score` | final evaluation score |
| `Status` | canonical lifecycle |
| `PDF` | whether a key artifact exists |
| `Report` | link to main report |
| `Notes` | summary and next action |

### Stage 2: Add typed metadata to reports

Each report header should eventually include:

- `Type`
- `Source`
- `URL`
- `Archetype`
- `Final Score`
- `Next Action`

### Stage 3: Split tracker and artifacts more cleanly

Potential future files:

- `data/opportunities.jsonl`
- `data/actions.jsonl`
- `data/artifacts.jsonl`

This is not needed yet, but the current markdown structure should be designed
so migration is easy.

## Type-Specific Interpretation

### Full-time

- `Company` = employer
- `Role` = role title
- `Applied` and `Interviewing` are common

### Freelance

- `Company` = client or marketplace lead
- `Role` = project or brief title
- `Proposed` is common

### Side project

- `Company` = `Self` or collaboration owner
- `Role` = project name
- `Pursuing`, `Won`, `Parked`, and `SKIP` are common

### Learning

- `Company` = provider
- `Role` = course or certification
- `Pursuing`, `Won`, `Parked`, and `SKIP` are common

### Collaboration

- `Company` = person, team, or community
- `Role` = opportunity label
- `Pursuing` and `Parked` are common

## Canonical Status Semantics

| Status | Meaning |
|------|---------|
| `Evaluated` | scored, not yet acted on |
| `Pursuing` | actively moving toward the next step |
| `Proposed` | a proposal or outbound scope has been sent |
| `Applied` | a formal application has been sent |
| `Interviewing` | active evaluation loop with another party |
| `Won` | the opportunity converted |
| `Parked` | intentionally paused |
| `Rejected` | closed unsuccessfully |
| `SKIP` | intentionally declined |

## Migration Rule

When updating legacy logic:

1. replace job-specific assumptions with opportunity-type-aware logic
2. keep markdown compatibility where possible
3. treat `data/applications.md` as the canonical tracker until a new store exists
