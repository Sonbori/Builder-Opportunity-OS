# Mode: pipeline

This mode processes pending items from `data/pipeline.md`.

Think of `pipeline.md` as an inbox for opportunities that need structured
evaluation later.

## Inbox Format

Use lightweight checklist items, for example:

```md
## Pending
- [ ] https://example.com/opportunity
- [ ] Freelance brief from Kmong client about ecommerce automation
- [ ] Side project idea: AI-assisted analytics QA tool

## Processed
- [x] #012 | Vercel | Data Engineer | 4.4/5 | Pursue
```

## Workflow

1. Read all `- [ ]` items under `Pending`.
2. For each item:
   - identify whether it is a URL, text brief, or idea
   - run the `auto-pipeline` flow
   - store the report if appropriate
   - update the tracker
3. Move the item into `Processed` with a short summary.

## Processing Rule

Use the opportunity type to decide what success looks like:

- role -> evaluated and possibly resume-ready
- freelance -> evaluated and possibly proposal-ready
- project idea -> evaluated and scoped
- learning -> evaluated and timeboxed
- collaboration -> evaluated and next-step-ready

## Output Summary

After processing a batch, show a compact summary table:

| # | Organization | Title | Type | Score | Status | Next Action |
|---|--------------|-------|------|-------|--------|-------------|

## Parallelism

If there are several independent items, parallel processing is allowed for
evaluation work. Avoid parallel Playwright-heavy actions if it risks instability.

## Sync Check

Before processing a serious batch, it is reasonable to run:

```bash
node cv-sync-check.mjs
```

Warn the user if the profile, proof, and resume context appear out of sync.
