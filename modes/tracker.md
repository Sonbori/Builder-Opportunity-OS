# Mode: tracker

This mode reads and manages `data/applications.md`, which now functions as the
main opportunity tracker.

## Tracker Format

```md
| # | Date | Company | Role | Score | Status | PDF | Report | Notes |
```

Interpretation:

- `Company` can mean employer, client, community, provider, or `Self`
- `Role` can mean role title, brief label, project label, or learning item
- `PDF` means a key artifact exists, not only a resume PDF

## Canonical Statuses

- `Evaluated`
- `Pursuing`
- `Proposed`
- `Applied`
- `Interviewing`
- `Won`
- `Parked`
- `Rejected`
- `SKIP`

## Meaning of Each Status

- `Evaluated` -> scored, no action taken yet
- `Pursuing` -> active next step in motion
- `Proposed` -> proposal, quote, or scoped pitch sent
- `Applied` -> formal application sent
- `Interviewing` -> active interview or evaluation process
- `Won` -> converted into a positive outcome
- `Parked` -> paused intentionally
- `Rejected` -> closed unsuccessfully
- `SKIP` -> intentionally not pursuing

## Tracker Responsibilities

When asked to view the tracker:

1. summarize total items
2. summarize counts by status
3. summarize average score
4. identify focus items:
   - `Pursuing`
   - `Proposed`
   - `Applied`
   - `Interviewing`
   - high-score `Evaluated`

When asked to update the tracker:

1. update the status only if the new state is clear
2. keep notes short and useful
3. preserve the report link

## Recommended Summary Output

Include:

- total opportunity count
- count by status
- average score
- top items that need action now

## Practical Rule

The tracker is not only a history log.
It is the operational view of what the user should do next.
