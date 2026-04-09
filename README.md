# Builder Opportunity OS

Builder Opportunity OS is a personal operating system for opportunities.
It helps a builder evaluate, prioritize, and track:

- full-time roles
- freelance automation work
- side project ideas
- learning bets
- collaboration opportunities

This repo started from `career-ops`, but it has been reworked into a
builder-first pipeline for data engineering, Python automation, and AI
systems work.

## Positioning

Instead of treating every opportunity like a job application, this system
uses one shared workflow:

1. capture the opportunity
2. score fit and upside
3. generate the right artifact
4. track next actions

That makes it useful for more than hiring:

- a freelance brief can become a proposal
- a job post can become a tailored resume
- a side project idea can become an MVP plan
- a course can become a timeboxed learning sprint

## Core Workflows

| Workflow | What it does |
|----------|---------------|
| `evaluate` | Score a role, client brief, or opportunity against your targets |
| `scan` | Search job boards, freelance sources, communities, and tracked targets for new leads |
| `pdf` | Generate a tailored resume or one-page profile |
| `project` | Decide whether a side project is worth building |
| `training` | Evaluate a course or certification by real ROI |
| `tracker` | Manage the full opportunity pipeline in one place |
| `batch` | Process multiple opportunities in parallel |

## Who This Repo Is Tuned For

The current default profile is tuned for:

- Data Engineer
- Python Automation Engineer
- AI / LLMOps Engineer
- freelance automation builder

## Quick Start

```bash
git clone https://github.com/Sonbori/Builder-Opportunity-OS.git
cd Builder-Opportunity-OS
npm install
npx playwright install chromium
```

Then review and customize:

```bash
config/profile.yml
modes/_profile.md
portals.yml
cv.md
```

`portals.yml` now acts as a multi-source intake config for roles, freelance
briefs, collaboration leads, and learning bets.

Useful checks:

```bash
npm run doctor
npm run verify
```

Optional dashboard:

```bash
cd dashboard
go build -o opportunity-dashboard .
./opportunity-dashboard --path ..
```

## Suggested Prompts

- `Evaluate this role and tell me if it is worth pursuing.`
- `Turn this freelance brief into a scoped proposal and tracker entry.`
- `Scan my configured sources for data engineering and automation opportunities.`
- `Compare these three opportunities and rank them by upside.`
- `Generate a tailored resume for this opportunity.`
- `Should I build this side project or skip it?`

## Status Model

The tracker uses a general opportunity lifecycle:

- `Evaluated`
- `Pursuing`
- `Proposed`
- `Applied`
- `Interviewing`
- `Won`
- `Parked`
- `Rejected`
- `SKIP`

## Planning Docs

- [Product Spec](docs/PRODUCT_SPEC.md)
- [Data Model](docs/DATA_MODEL.md)
- [Rebuild Roadmap](docs/REBUILD_ROADMAP.md)

## License

MIT
