# Product Specification

## Product Name

Builder Opportunity OS

## One-line Definition

A personal operating system that helps a technical builder collect,
evaluate, prioritize, and execute on opportunities across jobs,
freelance work, projects, learning, and collaborations.

## Problem

Most career tools assume every opportunity is a job application.
That breaks down for a builder whose real opportunity surface includes:

- full-time roles
- freelance automation briefs
- side project bets
- learning paths
- community and collaboration leads

The user does not need more volume. The user needs a system that answers:

1. Is this opportunity worth my time?
2. Why does it fit or not fit me?
3. What should I generate next?
4. What is the next action?

## Primary User

The current primary user is Sonbori:

- rapid builder
- targeting Data Engineer, Python Automation Engineer, and AI / LLMOps roles
- interested in both full-time and freelance opportunities
- values skill growth, speed, signal, and practical outcomes
- works in Korean and English contexts

## Product Goals

1. Unify multiple opportunity types under one pipeline.
2. Turn raw opportunities into clear decisions.
3. Generate the right artifact for the opportunity type.
4. Keep a compact source of truth for next actions and status.
5. Help the user spend time on high-upside work only.

## Non-Goals

1. Mass-apply automation.
2. Blind proposal blasting.
3. A hosted SaaS product.
4. Replacing human judgment.
5. Being a CRM for other people.

## Opportunity Types

### 1. Full-time role

Examples:

- hiring page
- JD text
- recruiter outreach

Main outputs:

- evaluation report
- tailored resume
- cover letter
- interview notes

### 2. Freelance brief

Examples:

- Kmong lead
- client request
- automation project inquiry

Main outputs:

- fit report
- scoped proposal
- delivery plan
- follow-up DM

### 3. Side project bet

Examples:

- product idea
- portfolio project concept
- experiment worth building

Main outputs:

- build vs skip decision
- MVP scope
- proof strategy
- milestone plan

### 4. Learning bet

Examples:

- course
- certificate
- study roadmap

Main outputs:

- ROI evaluation
- timebox recommendation
- weekly sprint plan
- required deliverables

### 5. Collaboration lead

Examples:

- open source contribution
- hackathon
- community event
- founder or builder outreach

Main outputs:

- opportunity memo
- outreach draft
- expected upside
- next action

## Core Product Loop

```text
capture -> classify -> score -> generate artifact -> track next action
```

### Capture

Input can be:

- URL
- pasted text
- freeform note
- manually created tracker item

### Classify

The system should classify:

- opportunity type
- source
- likely archetype
- urgency

### Score

Every opportunity should be scored on a shared base model:

- stack fit and skill growth
- comp or revenue potential
- remote or lifestyle fit
- impact and portfolio signal
- speed to win
- risk and noise

Each opportunity type may add a type-specific lens.

### Generate Artifact

The system should produce the smallest useful artifact:

- resume
- proposal
- one-pager
- learning plan
- DM

### Track Next Action

Every scored item should end with one explicit next action.

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

## Success Criteria

The product is working when:

1. A new opportunity can be added in under 2 minutes.
2. The system can explain why to pursue or skip it.
3. The generated artifact matches the opportunity type.
4. The tracker makes the next step obvious.
5. The user trusts the system enough to use it weekly.

## Current Build Focus

The immediate reconstruction focus is:

1. product language and architecture
2. opportunity-centric data model
3. mode and prompt redesign
4. tracker and dashboard alignment
