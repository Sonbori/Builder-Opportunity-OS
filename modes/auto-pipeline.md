# Mode: auto-pipeline

Use this mode when the user pastes an opportunity without specifying a
sub-command.

The goal is to move from raw input to a decision and the right artifact with
minimal extra prompting.

## Step 0. Capture the Opportunity

If the input is a URL:

1. Try Playwright first for live rendered pages.
2. Fall back to WebFetch for static content.
3. Use WebSearch only as a last resort for missing context.

If the input is pasted text:

- use it directly

If the input is too thin to evaluate:

- ask only for the minimum missing context

## Step 1. Classify

Determine:

- opportunity type
- source
- likely archetype
- likely artifact type

## Step 2. Evaluate

Run the full `evaluate` mode from `modes/oferta.md`.

## Step 3. Save the Main Report

If the user is using the system operationally, save the evaluation report in
`reports/`.

## Step 4. Generate the Best Artifact

Choose the smallest useful next artifact based on type:

- full-time -> tailored resume or cover letter
- freelance -> proposal or scoping note
- side project -> one-pager or MVP plan
- learning -> sprint plan
- collaboration -> outreach note

Do not default to PDF for every opportunity.

## Step 5. Update the Tracker

Add or update the item in `data/applications.md` with:

- date
- organization
- title
- final score
- status
- report path
- notes with next action

Suggested default statuses:

- strong candidate, not yet acted on -> `Evaluated`
- actively moving -> `Pursuing`
- proposal sent -> `Proposed`
- formal application sent -> `Applied`

## Step 6. Summarize

End with:

1. final score
2. pursue / park / skip
3. recommended artifact
4. exact next action

## Failure Handling

If one step fails:

- keep the pipeline moving where possible
- mark missing output clearly
- do not pretend a later step was completed
