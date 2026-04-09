# Builder Opportunity OS

## Purpose

Builder Opportunity OS is a local-first opportunity pipeline for a technical
builder. It evaluates and tracks:

- job opportunities
- freelance and consulting briefs
- side project ideas
- learning bets
- community or collaboration opportunities

The current profile is optimized for:

- Data Engineer
- Python Automation Engineer
- AI / LLMOps Engineer

## Sources of Truth

### User Layer

These files are personal and should be customized freely:

- `cv.md`
- `article-digest.md`
- `config/profile.yml`
- `modes/_profile.md`
- `portals.yml`
- `data/applications.md`
- `data/pipeline.md`
- `reports/*`
- `output/*`

### System Layer

These files define shared system logic:

- `modes/_shared.md`
- `modes/*.md`
- `templates/*`
- `*.mjs`
- `dashboard/*`
- `docs/*`

Rule: user-specific positioning belongs in `config/profile.yml`,
`modes/_profile.md`, and `article-digest.md`, not in `_shared.md`.

## Routing

Use these modes by intent:

| Intent | Mode |
|--------|------|
| raw opportunity text or URL | `auto-pipeline` |
| single role or brief evaluation | `oferta` |
| compare multiple options | `ofertas` |
| scan sources | `scan` |
| resume or PDF generation | `pdf` |
| live application help | `apply` |
| process inbox | `pipeline` |
| review tracked items | `tracker` |
| evaluate learning bet | `training` |
| evaluate side project | `project` |
| study patterns | `patterns` |

## Operating Principles

### Always

1. Read `config/profile.yml`, `modes/_profile.md`, and `cv.md` before making recommendations.
2. Treat the system as an opportunity filter, not a quantity engine.
3. Prefer opportunities that compound skills, proof, and revenue.
4. Update the tracker after each meaningful evaluation.
5. Keep outputs concrete and decision-oriented.
6. Generate artifacts that match the opportunity type:
   - jobs -> resume, cover letter, interview notes
   - freelance -> proposal, scoping notes, client DM
   - side project -> MVP plan, proof strategy
   - learning -> timeboxed roadmap and deliverables

### Never

1. Invent experience, numbers, clients, or outcomes.
2. Submit anything without user review.
3. Put user-specific strategy in auto-updatable system files.
4. Treat every opportunity like a full-time application.
5. Optimize for volume over signal.

## Opportunity Scoring

The default scoring model is builder-focused:

- Stack Fit and Skill Growth
- Comp or Revenue Potential
- Remote and Lifestyle Fit
- Impact and Portfolio Signal
- Delivery Speed or Time to Win
- Risk and Noise

Interpretation:

- `4.3+` -> move now
- `3.8-4.2` -> strong candidate, likely pursue
- `3.3-3.7` -> keep only with a clear reason
- `< 3.3` -> usually skip

## Onboarding Rules

Before serious use, make sure these files exist:

- `cv.md`
- `config/profile.yml`
- `modes/_profile.md`
- `portals.yml`
- `data/applications.md`
- `data/pipeline.md`

If missing, create them from the repo templates or defaults.

## Tracker Rules

Canonical statuses:

- `Evaluated`
- `Pursuing`
- `Proposed`
- `Applied`
- `Interviewing`
- `Won`
- `Parked`
- `Rejected`
- `SKIP`

Rules:

1. New evaluations should be written through tracker-addition TSV files when using the batch flow.
2. Existing status and notes can be updated directly in `data/applications.md`.
3. The notes field should capture why an opportunity is being pursued, parked, or skipped.

## Practical Guidance

- If the opportunity is a freelance brief, bias toward clarity, scope, risk, and speed to revenue.
- If the opportunity is a side project, bias toward fast MVP, demo value, and proof generation.
- If the opportunity is a learning bet, bias toward applied deliverables instead of passive completion.
- If the opportunity is a job post, still optimize for strong fit, tailored proof, and selective pursuit.
