# Rebuild Roadmap

## Goal

Rebuild Builder Opportunity OS so it becomes a genuinely Sonbori-shaped
project rather than a renamed derivative workflow.

## Strategy

The rebuild will be phased. We are not trying to replace every inherited file
at once. We are replacing the deepest product assumptions first.

## Phase 1: Product Foundation

Status: in progress

Deliverables:

- product specification
- opportunity-centric data model
- rebuild roadmap

Completion criteria:

- the project can be explained without saying "job search tool"
- the tracker is defined as an opportunity tracker
- the status model is no longer job-only

## Phase 2: Prompt and Mode Redesign

Focus:

- `modes/_shared.md`
- `modes/oferta.md`
- `modes/auto-pipeline.md`
- `modes/pipeline.md`
- `modes/scan.md`
- `modes/tracker.md`

Goals:

- remove hardcoded JD-only and role-only assumptions
- support multiple opportunity types
- define type-specific outputs and next actions

Completion criteria:

- every core mode speaks in terms of opportunities
- the system can evaluate jobs, freelance briefs, and project bets using
  different logic on top of a shared score model

## Phase 3: User Layer Hardening

Focus:

- `config/profile.yml`
- `modes/_profile.md`
- `cv.md`
- `article-digest.md`
- `portals.yml`

Goals:

- replace placeholders with real profile data
- add real links and proof
- configure market-specific sources

Completion criteria:

- the system is usable with real Sonbori data
- the profile is credible without placeholders

## Phase 4: Tracker and Script Refactor

Focus:

- `merge-tracker.mjs`
- `normalize-statuses.mjs`
- `verify-pipeline.mjs`
- any helper scripts that still assume applications only

Goals:

- align scripts with the new status model
- make tracker semantics opportunity-first
- keep backward compatibility only where it is useful

Completion criteria:

- tracker scripts operate cleanly on the new lifecycle
- verification checks opportunity semantics, not only application semantics

## Phase 5: Scanner Reconstruction

Focus:

- `templates/portals.example.yml`
- `portals.yml`
- `modes/scan.md`

Goals:

- prioritize Korean market sources and global remote sources
- define how freelance briefs and collaboration leads enter the inbox
- reduce dependence on the original source list

Completion criteria:

- scanner sources match Sonbori's actual target market
- opportunity intake is broader than ATS job pages

## Phase 6: Artifact Layer Expansion

Focus:

- `modes/pdf.md`
- proposal generation workflow
- DM templates
- project one-pager outputs
- learning sprint plan outputs

Goals:

- produce the right artifact for each opportunity type
- stop treating PDF generation as the only primary output

Completion criteria:

- the system can output at least:
  - resume
  - proposal
  - outreach draft
  - project plan
  - learning sprint plan

## Phase 7: Dashboard Rewrite

Focus:

- `dashboard/internal/data/career.go`
- `dashboard/internal/ui/screens/pipeline.go`
- surrounding dashboard models

Goals:

- show opportunity type, not only company-role rows
- improve filters for:
  - focus
  - pursuing
  - proposed
  - applied
  - interviewing
  - won
  - parked
  - skip

Completion criteria:

- the dashboard vocabulary is fully opportunity-first
- the dashboard can display mixed opportunity types cleanly

## Phase 8: Attribution and Identity Cleanup

Focus:

- README attribution wording
- license positioning
- historical notes if needed

Goals:

- be transparent about origins where necessary
- make the live product identity unmistakably Sonbori's

Completion criteria:

- the repository can clearly explain what was inherited and what has been
  rebuilt

## Priority Order

1. phase 2
2. phase 3
3. phase 4
4. phase 5
5. phase 6
6. phase 7
7. phase 8

## Immediate Next Build Slice

The next implementation slice should be:

1. rewrite `modes/_shared.md`
2. rewrite `modes/oferta.md`
3. rewrite `modes/auto-pipeline.md`
4. rewrite `modes/pipeline.md`
5. rewrite `modes/tracker.md`

Reason:

These files define the product behavior more than any other layer.
Once they change, the system will start thinking like Builder Opportunity OS
instead of like a renamed job-search template.
