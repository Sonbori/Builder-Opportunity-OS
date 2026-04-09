# Mode: evaluate

Use this mode when the user wants a deep evaluation of a single opportunity.

The input may be:

- job post
- freelance brief
- project idea
- course or certification
- collaboration lead

## Output Structure

Always produce these sections:

## 0. Opportunity Classification

Identify:

- Opportunity type
- Source
- Primary archetype
- Secondary archetype if relevant
- Recommended artifact
- One-line summary

## A. Opportunity Snapshot

Summarize the opportunity in a compact table:

- organization or client
- title or label
- type
- source
- urgency
- work mode
- estimated upside
- main unknowns

## B. Fit and Proof

Map the opportunity to the user's profile.

Include:

- strongest reasons it fits
- strongest reasons it does not fit
- relevant proof points from `cv.md` and `article-digest.md`
- missing proof or gaps

For each major gap, say whether it is:

- blocker
- manageable
- minor

## C. Score Breakdown

Score all six shared dimensions from `_shared.md` and show:

| Dimension | Score | Why |
|-----------|-------|-----|
| Stack Fit and Skill Growth | X/5 | ... |
| Comp or Revenue Potential | X/5 | ... |
| Remote and Lifestyle Fit | X/5 | ... |
| Impact and Portfolio Signal | X/5 | ... |
| Speed to Win | X/5 | ... |
| Risk and Noise | X/5 | ... |
| Final Score | X/5 | weighted summary |

## D. Pursue / Park / Skip Decision

Give one decision:

- `Pursue`
- `Park`
- `Skip`

Then explain:

1. Why
2. What would change the answer
3. What the user should not overestimate

## E. Best Artifact

Recommend the next artifact and why.

Examples:

- tailored resume
- cover letter
- freelance proposal
- project one-pager
- learning sprint plan
- outreach DM

If useful, include a short change plan for the artifact.

## F. Next Action

End with one concrete next action, such as:

- apply
- draft proposal
- ask follow-up questions
- build MVP outline
- start a 2-week study sprint
- park and revisit later

## Type-specific Guidance

### If the input is a full-time role

Pay extra attention to:

- role fit
- team and growth path
- comp
- location fit
- interview leverage

Recommended outputs often include:

- resume changes
- cover letter
- interview note

### If the input is a freelance brief

Pay extra attention to:

- scope clarity
- deliverables
- client quality
- budget realism
- risk of unclear ownership

Recommended outputs often include:

- proposal
- scoping note
- clarifying questions

### If the input is a side project

Pay extra attention to:

- MVP speed
- demo value
- proof of skill
- strategic reuse
- likelihood the user will finish it

Recommended outputs often include:

- build vs skip recommendation
- MVP milestones
- proof strategy

### If the input is a learning bet

Pay extra attention to:

- applied value
- proof generated
- opportunity cost
- direct relevance to target roles

Recommended outputs often include:

- timebox
- weekly sprint plan
- deliverable checklist

### If the input is a collaboration lead

Pay extra attention to:

- relationship leverage
- visibility
- credibility of the other side
- future option value

Recommended outputs often include:

- outreach note
- opportunity memo
- follow-up plan

## Report Persistence

When the user wants the result stored, save a report in:

`reports/{###}-{slug}-{YYYY-MM-DD}.md`

The report header should eventually include:

- `Type`
- `Source`
- `URL` if available
- `Archetype`
- `Final Score`
- `Next Action`
