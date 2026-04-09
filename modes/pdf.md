# Mode: pdf

This file is kept for command compatibility, but the mode now governs artifact
generation more broadly.

Do not think of this mode as "make a PDF".
Think of it as:

- choose the right artifact
- tailor it to the opportunity
- save it in a reusable format
- sync the tracker if needed

## Primary Goal

Generate the smallest useful artifact for the current opportunity.

Examples:

- full-time role -> tailored resume, cover note, or one-page profile
- freelance brief -> scoped proposal
- collaboration lead -> outreach DM or project note
- side project bet -> one-pager or MVP plan
- learning bet -> sprint plan

## Artifact Types

Use these canonical artifact types:

- `resume`
- `proposal`
- `dm`
- `one_pager`
- `learning_plan`
- `notes`

## Artifact Selection Rules

Choose the output based on what would move the opportunity forward now.

### Full-Time Role

Default artifacts:

- tailored resume
- optional short cover note

Use a one-page profile instead of a resume when:

- the role is exploratory
- the target is a warm contact
- the user needs a compact public-facing intro

### Freelance Brief

Default artifact:

- scoped proposal

A strong proposal should include:

- problem summary
- target outcome
- proposed scope
- delivery steps
- assumptions and exclusions
- timeline
- pricing or pricing placeholder
- next step

### Collaboration Lead

Default artifact:

- outreach DM

Optionally add:

- a one-pager if the collaboration is complex
- a short scope note if the lead looks like paid work

### Side Project Opportunity

Default artifact:

- one-pager

It should cover:

- problem
- target user
- why now
- MVP scope
- proof value
- build risk
- next milestone

### Learning Opportunity

Default artifact:

- learning sprint plan

It should include:

- learning goal
- why it matters
- exact proof to ship
- timebox
- deliverables
- stop condition

## Input Requirements

Before generating anything, read the best available context:

- `config/profile.yml`
- `cv.md`
- `article-digest.md`
- `modes/_profile.md`
- the current opportunity text, URL, or brief
- the evaluation report if one already exists

If the opportunity has not been evaluated yet, prefer evaluating it first.

## Output Decision Heuristic

Use this order:

1. What is the opportunity type?
2. What artifact would create the clearest next step?
3. Does the user need a polished file or only editable text?
4. Is a printable PDF actually necessary?

Do not default to PDF unless a printable artifact helps.

## Resume Flow

Use this when the opportunity is a role that needs a tailored application.

### Resume Rules

- keep ATS-safe structure
- use only true claims from the user's profile and shipped work
- adapt emphasis, not facts
- prefer the strongest 3 to 4 proof points
- match wording naturally to the opportunity language

### Resume Sections

- summary
- selected experience or projects
- proof-oriented skills
- links

### Resume Output Options

- editable markdown or HTML draft
- PDF via `generate-pdf.mjs`
- optional Canva flow if the design config already exists

## Proposal Flow

Use this when the opportunity is paid work, a client brief, or scoped builder
support.

### Proposal Rules

- stay concrete
- avoid generic agency language
- scope tightly
- make assumptions visible
- do not promise delivery the profile cannot support

### Proposal Structure

- title
- client or opportunity summary
- scope
- deliverables
- implementation approach
- timeline
- pricing or quote placeholder
- risks and assumptions
- next step

## Outreach DM Flow

Use this when speed matters more than a document.

Strong outreach DMs should be:

- short
- specific
- proof-led
- easy to reply to

Recommended structure:

- context line
- fit line
- proof line
- low-friction call to action

## One-Pager Flow

Use this for side projects, exploratory collaborations, or public proof.

Recommended sections:

- concept
- why this matters
- user or buyer
- MVP
- proof value
- risks
- next build step

## Learning Sprint Flow

Use this only when the learning bet can produce visible proof.

Recommended sections:

- sprint objective
- stack or topic
- exact output to ship
- schedule
- acceptance criteria
- decision at the end: continue or stop

## File and Output Conventions

Save artifacts under `output/` when a durable file is useful.

Suggested naming patterns:

- `resume-{target}-{YYYY-MM-DD}.pdf`
- `proposal-{client}-{YYYY-MM-DD}.md`
- `dm-{target}-{YYYY-MM-DD}.md`
- `one-pager-{project}-{YYYY-MM-DD}.md`
- `learning-plan-{topic}-{YYYY-MM-DD}.md`

Use markdown first when the user may want to edit the result.
Use PDF when the artifact is ready to send or review visually.

## Tracker Sync

If the opportunity already exists in `data/applications.md`:

- keep the existing report link
- update the `PDF` column when a key artifact now exists
- add a short note describing what was produced

Remember:

- the `PDF` column now means "key artifact exists"
- it does not only mean "resume PDF exists"

## Guardrails

Do not:

- invent experience
- fabricate metrics
- over-design an artifact before the opportunity is worth it
- generate a long deck when a short DM would do
- create a proposal before clarifying obvious scope gaps

## Success Standard

This mode succeeds when the output gives the user a better next move, not when
the artifact looks maximal.
