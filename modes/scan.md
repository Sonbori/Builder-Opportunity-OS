# Mode: scan

This mode collects new opportunities from configured sources and sends the
best candidates into `data/pipeline.md` for later evaluation.

The scanner is not job-board only.
It should watch:

- full-time roles
- freelance briefs
- side project leads
- collaboration opportunities
- learning bets with real ROI

## Inputs

Read `portals.yml`.

The current Builder Opportunity OS template expects these sections:

- `title_filter`
- `search_queries`
- `tracked_targets`
- `manual_sources`
- `learning_sources`

## Source Model

Use the following opportunity types when possible:

- `full_time`
- `freelance`
- `side_project`
- `collaboration`
- `learning`

Use the following channel labels when useful:

- `careers_page`
- `api`
- `web_search`
- `manual_board`
- `community`
- `watchlist`

## Scanner Goal

The goal is not to save every possible lead.
The goal is to capture opportunities that match Sonbori's builder profile:

- data engineering
- Python automation
- AI-assisted product execution
- fast-moving startup or operator environments

## Discovery Strategy

### Layer 1: Direct Targets

Check `tracked_targets` first.

These are the highest-signal sources because they already match one of the
user's target markets:

- specific companies
- freelance platforms
- communities
- recurring collaboration channels

Preferred behavior:

1. open `source_url`
2. extract visible opportunities or active briefs
3. keep only items that look current and actionable

### Layer 2: Structured Search

Run `search_queries` that are still enabled.

Use search to discover:

- new employers
- remote-friendly roles
- hidden ATS pages
- niche automation and AI briefs

Search results are discovery signals, not proof.
Any result found through search should be checked for liveness before it enters
the pipeline.

### Layer 3: Manual Boards

Review `manual_sources` for places that are noisy, gated, or hard to scrape.

Typical examples:

- Kmong
- client DMs
- community posts
- hackathon announcements
- operator Slack or Discord channels

Only add an item if the opportunity is concrete enough to act on.

### Layer 4: Learning Intake

Review `learning_sources` only for opportunities that can produce clear proof,
not for passive content collection.

Good examples:

- a short Airflow or Spark course that leads to a visible artifact
- a certification with hiring signal
- a workshop that leads to collaboration or demo output

## Filtering Rules

Use `title_filter` to score relevance quickly.

An item is a good scanner candidate when it:

- matches at least one strong positive keyword
- avoids obvious negative keywords
- supports the current target stack or market

Do not keep weak-fit opportunities just because they are available.

## Dedup Rules

Before adding anything new, deduplicate against:

- `data/scan-history.tsv`
- `data/pipeline.md`
- `data/applications.md`

Treat these as duplicates:

- same URL
- same client or company plus same role or brief
- same project or collaboration lead already being pursued

## Verification Rules

For search-derived URLs:

1. open the final page
2. confirm the opportunity still exists
3. confirm the page is not a dead redirect, placeholder, or expired listing

If the page is dead or ambiguous, do not add it to `pipeline.md`.
Log it as skipped in scan history instead.

For manual opportunities:

- keep the original source note
- add enough context so later evaluation does not lose the brief

## Pipeline Output Format

Add new scanner results to `data/pipeline.md` under `Pending`.

Preferred examples:

```md
- [ ] https://example.com/role | Vercel | Senior Data Engineer | full_time
- [ ] Kmong brief: automate store settlement workflow | Kmong | freelance
- [ ] Community lead: open-source analytics QA collaboration | GitHub | collaboration
- [ ] Learning sprint: Airflow production patterns workshop | Astronomer Academy | learning
```

Keep entries short but specific enough to evaluate later.

## Scan History Format

`data/scan-history.tsv` should capture all reviewed items, including skipped
ones.

Recommended columns:

```tsv
url_or_note	first_seen	source	title_or_brief	entity	type	status
```

Recommended statuses:

- `added`
- `skipped_dup`
- `skipped_noise`
- `skipped_dead`
- `skipped_misfit`

## Output Summary

At the end of a scan, report:

- how many sources were checked
- how many raw items were found
- how many were skipped
- how many were added to the pipeline
- the best few new items worth evaluating next

## Practical Standard

The scanner should create a high-quality inbox, not a large inbox.

If a lead is low-fit, stale, vague, or hard to act on, skip it and keep the
pipeline clean.
